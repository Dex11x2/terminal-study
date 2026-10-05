// تكملة تاب nginx: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/nginx/01.js (شرح حقول الدرس في أوله)
MORE("nginx", [
    {
      t: "متقدم",
      l: 3,
      n: "WebSockets، والتبديل بين نسختين، والحماية بباسورد، واللوجات، و HTTP/2 و 3",
      items: [
        {
          cmd: "WebSockets",
          title: "Socket.io و Next.js HMR",
          desc: "الـ WebSocket بيبدأ كطلب HTTP عادي وبعدين «يترقّى» لاتصال دائم. Nginx محتاج يمرر headers الترقية ويرفع timeout، وإلا الاتصال بيتقطع بعد ٦٠ ثانية. الـ [[map]] بيخلي نفس الـ location يخدم HTTP عادي و WebSocket.",
          example: R`map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

server {
    location /socket.io/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host $host;
        proxy_read_timeout 3600s;
    }
}`,
          try: R`الـ map في http block. اختبر بـ [[npx wscat -c "wss://example.com/socket.io/?EIO=4&transport=websocket"]].`,
          flag: "script",
          deep: {
            why: "Socket.io شغال على localhost وبيقع على السيرفر. أو Next.js dev ورا Nginx والـ HMR مش بيشتغل. WebSocket محتاج Nginx يفهم إن الاتصال ده مش HTTP عادي.",
            how: R`الـ WebSocket بيبدأ بطلب GET فيه [[Upgrade: websocket]] و [[Connection: Upgrade]]. لو السيرفر وافق (101 Switching Protocols)، الاتصال بيتحوّل لقناة دائمة في الاتجاهين.

Nginx افتراضيًا بيشيل الـ headers دي (hop-by-hop). [[proxy_set_header Upgrade $http_upgrade]] و [[Connection $connection_upgrade]] بيمرروهم. و [[proxy_http_version 1.1]] لازمة (الترقية مش موجودة في 1.0).

الـ [[map]]: بيحسب متغير [[$connection_upgrade]] من [[$http_upgrade]]: لو الطلب فيه Upgrade، القيمة upgrade. لو فاضي (طلب HTTP عادي)، القيمة close. فنفس الـ location بيخدم الاتنين صح. الـ map في http block.

[[proxy_read_timeout 3600s]]: WebSocket مفتوح من غير بيانات ممكن دقايق. الافتراضي 60s بيقطعه. ساعة، أو Socket.io بيبعت ping كل ٢٥ ثانية فالافتراضي ممكن يكفي، بس ارفعه.

لو الـ WebSocket على مسار خاص ([[/socket.io/]] أو [[/ws]])، location له بس. لو على كل الموقع (Next.js)، حط الإعدادات في [[location /]].

اختبار: [[wscat]] أو في DevTools تاب Network فلتر WS.`,
            when: "Socket.io، و Next.js dev ورا proxy، وأي real-time.",
            mistakes: "نسيان http_version 1.1. و timeout الافتراضي فالاتصال يقع كل دقيقة والعميل يعيد الاتصال باستمرار."
          },
          lines: [
            "متغير: لو الطلب فيه Upgrade...",
            "...قيمته upgrade...",
            "...وإلا close (طلب HTTP عادي).",
            "قفلة.",
            "الموقع.",
            "مسار Socket.io.",
            "للتطبيق.",
            "لازمة للترقية.",
            "مرر header الترقية.",
            "و Connection من الـ map.",
            "الدومين.",
            "متقطعش الاتصال الصامت قبل ساعة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[npx wscat -c "wss://example.com/socket.io/?EIO=4&transport=websocket"]] المفروض يطبع [[Connected (press CTRL+C to quit)]] وبعدها رسالة من Socket.io بتبدأ بـ [[0]] زي [[< 0{"sid":"...","upgrades":[],"pingInterval":25000,...}]]. ولو كتبت [[40]] بيرد [[40{"sid":...}]] (اتصال بالـ namespace الرئيسي)، وكل شوية هتلاقي [[< 2]] (ping).

جربت نفس الإعداد بسيرفر [[ws]] عادي ورا Nginx: مع الـ headers الاتصال فتح ورد عليا، ومن غيرهم السيرفر رد [[426]] لأن [[Upgrade]] ماوصلوش.

الأغلاط الشائعة: [[error: Unexpected server response: 400]] أو [[426]] أو [[502]]: [[Upgrade]] و [[Connection]] مش متبعتين، أو نسيت [[proxy_http_version 1.1]]. والاتصال بيفتح ويقفل بعد ٦٠ ثانية بالظبط: [[proxy_read_timeout]] لسه الافتراضي.`
        },
        {
          cmd: "blue-green",
          title: "نسختين ورا Nginx وتبديل من غير downtime",
          desc: "النسخة الجديدة على بورت تاني (3001)، تتأكد إنها شغالة، وبعدين تغيّر upstream وتعمل reload: صفر طلبات فاشلة. ولو فيه مشكلة ترجع بنفس الطريقة. [[backup]] بيخلي سيرفر احتياطي يستقبل بس لو الأساسي وقع.",
          example: R`upstream app {
    server 127.0.0.1:3000 max_fails=3 fail_timeout=10s;
    server 127.0.0.1:3001 backup;
}

# deploy.sh (part)
docker compose up -d app_green
sleep 5 && curl -fsS http://127.0.0.1:3001/health
sudo sed -i 's/127.0.0.1:3000 max_fails/127.0.0.1:3001 max_fails/; s/127.0.0.1:3001 backup/127.0.0.1:3000 backup/' /etc/nginx/conf.d/upstream.conf
sudo nginx -t && sudo systemctl reload nginx`,
          try: R`شغّل [[while true; do curl -s -o /dev/null -w "%{http_code} " https://example.com; sleep 0.2; done]] وانت بتبدّل: كله 200.`,
          flag: "script",
          deep: {
            why: "[[docker compose up]] بيوقف القديم ويشغّل الجديد: ثواني الموقع فيها 502. لعميل بيدفع، أو API بتاعة موبايل، الثواني دي شكاوى. Blue-green بيخلي التبديل لحظي ومن غير أي طلب فاشل.",
            how: R`نسختين من التطبيق: blue على 3000 (الحالية) و green على 3001. الـ upstream بيشاور على blue، و green [[backup]] (بيستقبل بس لو blue وقع، وده bonus).

الـ deploy: شغّل النسخة الجديدة على green (compose بخدمتين، أو container باسم تاني). استنى تقوم و health check عليها مباشرة على 3001. لو نجحت: بدّل الأدوار في ملف upstream (الـ sed بيبدّل الرقمين)، و [[nginx -t]] و [[reload]]. من اللحظة دي الطلبات الجديدة على green، والقديمة بتخلص على blue. مفيش طلب ضاع.

لو حصلت مشكلة بعد التبديل: نفس الـ sed بالعكس و reload. rollback في ثانية.

[[max_fails=3 fail_timeout=10s]]: لو السيرفر فشل ٣ مرات في ١٠ ثواني، Nginx يعتبره واقع ١٠ ثواني ويروح للـ backup. حماية إضافية.

قاعدة البيانات مشتركة بين الاتنين، فالـ migration لازم تبقى متوافقة مع النسختين (قاعدة الخطوتين).

للنسخ الأبسط: [[docker compose up -d --no-deps --scale app=2 --no-recreate app]] و Nginx على الاتنين، بس التحكم أقل.`,
            when: "لما الـ downtime بيفرق: مواقع عليها دفع، و APIs.",
            mistakes: "تبدّل قبل الـ health check. و migration كاسرة والنسختين شغالين."
          },
          lines: [
            "المجموعة.",
            "blue: الحالي، ويتعتبر واقع بعد ٣ فشل في ١٠ ثواني.",
            "green: احتياطي بيستقبل بس لو blue وقع.",
            "قفلة.",
            "شغّل النسخة الجديدة على green.",
            "استنى واتأكد إنها بترد مباشرة.",
            "بدّل الأدوار في ملف upstream.",
            "اختبر وطبّق: التبديل لحظي."
          ],
          sol: R`اللوب المفروض يطبع [[200 200 200 ...]] طول وقت التبديل من غير ولا [[502]]. ده لأن [[sleep 5 && curl -fsS .../health]] اتأكد إن النسخة الجديدة شغالة قبل ما تبدّل، و [[reload]] مش بيقطع الطلبات الشغالة.

وبعد التبديل [[grep server /etc/nginx/conf.d/upstream.conf]] بيوري [[127.0.0.1:3001 max_fails=3 fail_timeout=10s]] و [[127.0.0.1:3000 backup]]: القديمة بقت احتياطي، وتقدر ترجعلها بنفس الـ sed بالعكس.

لو ظهرت 502: غالبًا النسخة الجديدة لسه بتقوم والـ health كان بيرد قبل ما كل حاجة تجهز، أو وقّفت القديمة قبل الـ reload. والغلط الشائع: الـ sed مش لاقي النص بالظبط (مسافة زيادة مثلًا) فمابيغيّرش حاجة ومابيطلعش error؛ اتأكد بـ [[grep]] بعده.`
        },
        {
          cmd: "basic auth",
          title: "staging بباسورد",
          desc: "موقع staging مش المفروض جوجل ولا العملاء يشوفوه. [[auth_basic]] بيطلب يوزر وباسورد من المتصفح قبل أي حاجة. الباسوردات في ملف بـ [[htpasswd]]. ومسار الـ webhook بيتستثنى عشان البوابة توصله.",
          example: R`sudo apt install -y apache2-utils
sudo htpasswd -c /etc/nginx/.htpasswd dev
server {
    server_name staging.example.com;
    auth_basic "Staging";
    auth_basic_user_file /etc/nginx/.htpasswd;
    location /webhooks/ {
        auth_basic off;
        proxy_pass http://127.0.0.1:3000;
    }
    location / { proxy_pass http://127.0.0.1:3000; }
}`,
          try: "افتح staging في المتصفح: نافذة يوزر وباسورد. و [[curl -u dev:pass https://staging.example.com]] من الترمنال.",
          flag: "script",
          deep: {
            why: "staging عليه بيانات تجريبية وميزات لسه، ولينكه ممكن يتشارك. جوجل بيفهرسه، والعميل يفتحه بالغلط ويفتكره الإنتاج. باسورد بسيط بيقفل ده كله.",
            how: R`[[htpasswd]] (من apache2-utils) بيعمل ملف فيه يوزر وباسورد مشفّر. [[-c]] بيعمل الملف (أول مرة بس، بعدها من غيرها يضيف يوزرز).

[[auth_basic "Staging"]]: بيشغّل الحماية، والنص بيظهر في نافذة المتصفح. [[auth_basic_user_file]] الملف. المتصفح بيطلب يوزر وباسورد وبيبعتهم في header [[Authorization: Basic base64]] مع كل طلب.

[[auth_basic off]] في location الـ webhooks: Paymob مش هتقدر تدخل باسورد. أي مسار بتوصله خدمة خارجية يتستثنى.

الباسورد بيتبعت base64 (مش تشفير)، فلازم https. على http أي حد على الشبكة يقراه.

من curl: [[-u user:pass]]. من الكود (اختبارات E2E): الـ URL بصيغة [[https://user:pass@staging.example.com]].

بدائل: Cloudflare Access (تسجيل دخول بجوجل، أقوى وأريح)، أو IP allowlist بـ [[allow IP; deny all;]] لو IP الفريق ثابت.`,
            when: "كل staging و preview. وأدوات داخلية (Metabase، Adminer) لو مش عليها auth بتاعها.",
            mistakes: "basic auth على http. وتنسى تستثني webhooks فبوابة الدفع تفشل على staging وتفتكر المشكلة في الكود."
          },
          lines: [
            "أداة htpasswd.",
            "اعمل الملف بيوزر dev (-c أول مرة بس).",
            "الموقع.",
            "staging.",
            "شغّل الحماية بالنص ده.",
            "ملف الباسوردات.",
            "الـ webhooks...",
            "...من غير باسورد (البوابة مش هتدخله).",
            "للتطبيق.",
            "قفلة.",
            "الباقي محمي.",
            "قفلة."
          ],
          sol: R`المتصفح بيفتح نافذة فيها [[Staging]] بتطلب username و password. و Cancel بيطلّع [[401 Authorization Required]].

من الترمنال: [[curl -u dev:pass https://staging.example.com]] بيرجع الصفحة عادي. ومن غير [[-u]] أو بباسورد غلط: [[401]] ومعاه header [[WWW-Authenticate: Basic realm="Staging"]]. و [[/webhooks/]] بيرد من غير باسورد لأن [[auth_basic off]]. جربت التلات حالات.

الغلط الشائع: [[500 Internal Server Error]] و [[error.log]] فيه [[open() "/etc/nginx/.htpasswd" failed (13: Permission denied)]] أو [[No such file]]: الملف مش موجود أو [[www-data]] مش قادر يقراه. ولو الباسورد صح وبيرفض، اتأكد إنك استخدمت [[-c]] مرة واحدة بس (المرة التانية بتمسح اليوزرز القدام).`
        },
        {
          cmd: "htpasswd -B و $remote_user",
          title: "يوزر لكل واحد في الفريق، والتطبيق يعرف مين دخل",
          desc: "بدل باسورد واحد للفريق كله، كل واحد ليه يوزر في نفس الملف، فتقدر تشيل واحد لوحده. [[-B]] بيخزن الباسورد bcrypt، و [[-i]] بياخده من stdin بدل سطر الأوامر. و [[$remote_user]] اسم اليوزر اللي دخل، تبعته للتطبيق في header عشان يفلتر البيانات عليه.",
          example: R`sudo htpasswd -cB /etc/nginx/.htpasswd-dashboard sara
PASS="$(openssl rand -base64 12 | tr -d '/+=')"
printf '%s\n' "$PASS" | sudo htpasswd -iB /etc/nginx/.htpasswd-dashboard omar
echo "omar: $PASS"
location /dashboard/ {
    auth_basic "team";
    auth_basic_user_file /etc/nginx/.htpasswd-dashboard;
    proxy_pass http://127.0.0.1:8080;
    proxy_set_header X-Dash-User $remote_user;
}`,
          try: "ضيف يوزرين، وبعدين [[sudo htpasswd -D /etc/nginx/.htpasswd-dashboard omar]] وجرّب تدخل بيه: مرفوض فورًا من غير reload.",
          flag: "script",
          deep: {
            why: "باسورد مشترك معناه إن أول ما حد يسيب الشغل لازم تغيّره للكل. ولوحة داخلية غالبًا محتاجة تعرف مين اللي فاتح عشان تعرضله بياناته هو بس. يوزر لكل واحد بيحل الاتنين من غير ما تبني نظام login.",
            how: R`[[htpasswd -B file user]]: يسألك الباسورد مرتين ويضيف (أو يغيّر) اليوزر ده بس. [[-B]] يعني bcrypt، أقوى من الافتراضي (apr1 MD5). و [[-c]] بيعمل الملف من الأول، يعني لو استخدمتها تاني بتمسح كل اليوزرز التانيين.

ليه [[-i]] مش [[-b]]؟ [[htpasswd -bB file omar Secret123]] بيحط الباسورد في سطر الأوامر، وأي يوزر على السيرفر يشوفه في [[ps aux]] وقت التشغيل، وبيتسجل في [[~/.bash_history]]. [[-i]] بيقرا الباسورد من stdin، فمبيظهرش في أي حتة من دول.

[[openssl rand -base64 12]] بيولّد باسورد عشوائي، و [[tr -d]] بيشيل الرموز اللي بتلخبط لما حد يكتبها.

Nginx بيقرا ملف اليوزرز مع كل طلب، فإضافة أو مسح يوزر بيسري فورًا من غير reload.

[[$remote_user]]: بعد ما الدخول ينجح، فيه اسم اليوزر. [[proxy_set_header X-Dash-User $remote_user]] بيبعته للتطبيق، وبيكتب فوق أي header بنفس الاسم الزائر بعته بنفسه. بس ده آمن بشرط إن التطبيق بيسمع على 127.0.0.1 بس. لو بورت 8080 مفتوح للنت، أي حد يكلّمه مباشرة ويبعت [[X-Dash-User: admin]].`,
            when: "لوحات داخلية لفريق صغير (٥ لـ ٣٠ واحد) من غير نظام حسابات. لو أكتر أو محتاج صلاحيات، اعمل login حقيقي في التطبيق.",
            mistakes: R`في مشروع حقيقي سكربت توليد الباسوردات كان بيستخدم [[htpasswd -bB]] جوه لوب، فكل باسورد بيبان في [[ps]] لأي يوزر على السيرفر. وكان بيحط كود الموظف جوه استعلام SQL مباشرة من غير فحص (لو اتبعت كباراميتر فيه علامة ' يبقى SQL injection)، والحل فحص regex زي [[^[a-z0-9]+$]] قبل أي استخدام. وكان بيعمل [[nginx -t && reload]] من غير ما يطبع حاجة لو الاختبار فشل. وكمان: الباسوردات المطبوعة على الشاشة بتفضل في scrollback الترمنال، فابعتها لأصحابها وامسح الشاشة.`
          },
          lines: [
            "اعمل الملف وضيف sara (هيسألك الباسورد مرتين)، bcrypt. [[-c]] أول مرة بس، لأنها بتمسح أي ملف موجود.",
            "ولّد باسورد عشوائي من غير رموز ملخبطة.",
            "ضيف omar والباسورد جاي من stdin (مش ظاهر في ps).",
            "اطبعه مرة واحدة عشان تبعته له.",
            "اللوحة.",
            "اطلب دخول.",
            "ملف اليوزرز.",
            "للتطبيق (على 127.0.0.1 بس).",
            "ابعت اسم اللي دخل للتطبيق.",
            "قفلة."
          ],
          sol: R`بعد إضافة sara و omar: [[curl -u omar:PASS .../dashboard/]] بيعدّي، والتطبيق بيستلم [[X-Dash-User: omar]]. جربتها: الـ backend شاف [[user: "omar"]] ومع sara شاف [[sara]].

بعد [[sudo htpasswd -D /etc/nginx/.htpasswd-dashboard omar]] (بيطبع [[Deleting password for user omar]])، نفس الطلب بيرجع [[401]] على طول من غير reload، و [[error.log]] فيه [[user "omar" was not found in "/etc/nginx/.htpasswd-dashboard"]]. ده لأن Nginx بيقرا الملف مع كل طلب.

الغلط الشائع: أول أمر [[htpasswd -B]] على ملف لسه مش موجود بيطلع [[cannot modify file ...; use '-c' to create it]]. أول يوزر بس بـ [[-cB]]، والباقي من غير [[-c]]. والمتصفح بيفضل حافظ omar لحد ما تقفله، فاختبر بـ curl أو incognito.`,
          solCode: R`sudo htpasswd -cB /etc/nginx/.htpasswd-dashboard sara
PASS="$(openssl rand -base64 12 | tr -d '/+=')"
printf '%s\n' "$PASS" | sudo htpasswd -iB /etc/nginx/.htpasswd-dashboard omar
curl -s -o /dev/null -w "%{http_code}\n" -u "omar:$PASS" https://example.com/dashboard/
sudo htpasswd -D /etc/nginx/.htpasswd-dashboard omar
curl -s -o /dev/null -w "%{http_code}\n" -u "omar:$PASS" https://example.com/dashboard/`
        },
        {
          cmd: "لوجات مخصصة",
          title: "log_format JSON والفلترة",
          desc: "اللوج الافتراضي نص صعب تحليله. [[log_format]] بصيغة JSON بيخلي [[jq]] يشتغل عليه مباشرة، وتضيف حقول زي وقت الرد ووقت التطبيق. و [[access_log off]] للـ health checks عشان ميتملاش بطلبات المراقبة.",
          example: R`log_format json escape=json '{"time":"$time_iso8601","ip":"$remote_addr","method":"$request_method","uri":"$request_uri","status":$status,"bytes":$body_bytes_sent,"rt":$request_time,"upstream":"$upstream_response_time","ua":"$http_user_agent"}';

server {
    access_log /var/log/nginx/example.json json;
    location = /health { access_log off; proxy_pass http://127.0.0.1:3000; }
}`,
          try: "[[tail -f /var/log/nginx/example.json | jq 'select(.status >= 500)']]: الأخطاء لايف بس. و [[jq -s 'sort_by(.rt) | reverse | .[0:5]']] أبطأ ٥ طلبات.",
          flag: "script",
          deep: {
            why: "اللوج الافتراضي بيقول مين طلب إيه ورجع إيه. مش بيقول قد إيه أخد، ولا التطبيق كان بطيء ولا Nginx. و awk على النص بيتكسر مع أي مسافة زيادة. JSON بيحل الاتنين.",
            how: R`[[log_format json escape=json '...']]: بيعرّف صيغة اسمها json. [[escape=json]] بيهرب علامات التنصيص في القيم (user agent فيه علامات). كل حقل متغير Nginx:

[[$time_iso8601]] الوقت بصيغة قياسية. [[$request_time]] الوقت الكلي من أول byte طلب لآخر byte رد. [[$upstream_response_time]] الوقت اللي التطبيق أخده. الفرق بينهم هو Nginx والشبكة مع الزائر. لو الاتنين كبار: التطبيق. لو request_time بس: الزائر بطيء أو الرد كبير.

[[$status]] و [[$body_bytes_sent]] أرقام من غير علامات تنصيص عشان jq يعاملهم كأرقام.

[[access_log /path json]]: استخدم الصيغة لموقع معين. وممكن تخلي الصيغة الافتراضية في http block.

[[access_log off]] على /health: المراقبة بتطلبه كل ١٠ ثواني، ٨٦٤٠ سطر يوميًا من غير قيمة.

بعدها jq: [[select(.status >= 500)]] الأخطاء، [[sort_by(.rt)]] الأبطأ، [[group_by(.uri)]] الأكتر طلبًا. وأدوات زي GoAccess بتعمل dashboard من اللوج.

logrotate بيلف الملف يوميًا لوحده (ملف في /etc/logrotate.d/nginx).`,
            when: "من أول موقع إنتاج. الحقلين بتوع الوقت هما اللي بيفرقوا في التشخيص.",
            mistakes: "escape=json ناقص فسطر فيه علامة تنصيص يكسر الـ JSON. و $upstream_response_time ممكن يبقى «-» للردود من الكاش، فـ jq يشتكي (عشان كده بين علامات تنصيص)."
          },
          lines: [
            "صيغة JSON: الوقت، والـ IP، والطلب، والـ status، والحجم، ووقت الرد الكلي، ووقت التطبيق، والمتصفح. escape=json يهرب علامات التنصيص.",
            "الموقع.",
            "استخدم الصيغة في ملف خاص.",
            "health من غير لوج.",
            "قفلة."
          ],
          sol: R`[[tail -f ... | jq 'select(.status >= 500)']] بيفضل ساكت لحد ما يحصل خطأ، وبعدين يطبع object زي [[{"time":"2026-09-30T04:58:29+00:00","ip":"...","uri":"/api/x","status":503,"rt":0.000,...}]]. جربتها على لوج فيه طلبات اتعملها rate limit وطلّع الـ 503 بس.

و [[jq -s 'sort_by(.rt) | reverse | .[0:5]']] بيطبع array فيها أبطأ ٥ طلبات بالـ [[rt]] بتاعها (بالثواني)، وده أسرع طريقة تلاقي الـ endpoint البطيء.

الأغلاط الشائعة: jq يطلع [[parse error]]: فيه سطور قديمة بصيغة اللوج العادي في نفس الملف، أو [[escape=json]] ناقص فـ user agent فيه علامة [["]] بوّظ السطر. و [[.status >= 500]] مابيطلعش حاجة لو status مكتوب بين علامات تنصيص في log_format فبقى نص؛ سيبه من غير تنصيص زي المثال.`
        },
        {
          cmd: "HTTP/2 و HTTP/3",
          title: "أسرع من غير تغيير في التطبيق",
          desc: "HTTP/2 بيبعت كذا ملف على اتصال واحد، مفعّل بكلمة. HTTP/3 (QUIC على UDP) أسرع على الموبايل والشبكات الضعيفة، ومحتاج Nginx 1.25+ وفتح UDP 443. والـ ssl settings من certbot كويسة، بس [[ssl_session_cache]] بيسرّع الاتصالات المتكررة.",
          example: R`server {
    listen 443 ssl;
    listen 443 quic reuseport;
    http2 on;
    http3 on;
    add_header Alt-Svc 'h3=":443"; ma=86400' always;

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 1d;
}`,
          try: "[[sudo ufw allow 443/udp]] لـ HTTP/3. وفي DevTools عمود Protocol في Network: h2 أو h3.",
          flag: "script",
          deep: {
            why: "HTTP/1.1 بيفتح ٦ اتصالات ويطلب الملفات واحد واحد. HTTP/2 اتصال واحد بيبعت الكل مع بعض. HTTP/3 نفس الفكرة على UDP فبيتحمل الشبكات الضعيفة والتنقل بين واي فاي وداتا. الفرق محسوس على الموبايل، والتطبيق مش محتاج يتغير.",
            how: R`[[http2 on]] (الصيغة الجديدة، القديمة كانت listen 443 ssl http2): يشغّل HTTP/2 على كل الـ listens اللي ssl. المتصفح بيتفاوض عليه في TLS (ALPN) لوحده. محتاج https.

HTTP/3: [[listen 443 quic reuseport]] بيسمع على UDP 443 كمان. [[http3 on]]. و [[Alt-Svc]] header بيقول للمتصفح «فيه h3 على نفس البورت، جرّبه المرة الجاية». أول زيارة h2، والتانية h3. [[reuseport]] بيسمح لكل worker يسمع. ولازم [[ufw allow 443/udp]]، ونسخة Nginx 1.25+ (أوبونتو 24.04 فيها 1.24 بس، فمحتاج repo nginx.org الرسمي أو توزيعة أحدث زي Debian 13). [[nginx -V | grep http_v3]] يتأكد.

الـ ssl: certbot بيكتب المسارات والإعدادات. [[ssl_protocols TLSv1.2 TLSv1.3]]: الأقدم ضعيف. [[ssl_session_cache shared:SSL:10m]]: بيحفظ جلسات TLS (١٠ ميجا حوالي ٤٠ ألف جلسة) فالزائر الراجع بيتخطى نص المصافحة. [[ssl_session_timeout 1d]].

متحطش [[ssl_stapling on]] مع شهادات Let's Encrypt: وقفت OCSP خالص في 2025، فالإعداد ملوش لازمة وبيطلع تحذير «no OCSP responder URL» في nginx -t.

اختبار: DevTools ثم Network ثم عمود Protocol (كليك يمين على العناوين لو مش ظاهر): h2 أو h3. وSSL Labs بيقيّم الإعدادات.`,
            when: "http2 على كل سيرفر فورًا. http3 لو نسختك بتدعمه وجمهورك موبايل.",
            mistakes: "http3 من غير فتح UDP فالـ Alt-Svc بيوعد بحاجة مش موجودة والمتصفح يرجع h2 بعد محاولة فاشلة (أبطأ). والصيغة القديمة listen ... http2 في Nginx جديد بتطلع تحذير. والعكس: [[http2 on]] على 1.24 (أوبونتو 24.04) بيطلع unknown directive، فهناك استخدم listen 443 ssl http2. و [[reuseport]] يتكتب مرة واحدة بس لكل بورت على السيرفر كله، لو كررته في بلوك تاني -t بيرفض (duplicate listen options)."
          },
          lines: [
            "الموقع.",
            "https.",
            "و UDP 443 لـ HTTP/3.",
            "شغّل HTTP/2.",
            "شغّل HTTP/3.",
            "قول للمتصفح إن h3 متاح.",
            "الشهادة.",
            "المفتاح.",
            "TLS 1.2 و 1.3 بس.",
            "كاش الجلسات: الزائر الراجع أسرع.",
            "لمدة يوم.",
            "قفلة."
          ],
          sol: R`[[sudo ufw allow 443/udp]] بيطبع [[Rule added]] و [[Rule added (v6)]]. وفي DevTools عمود Protocol: أول تحميل [[h2]]، وبعد ريفريش (بعد ما المتصفح شاف [[Alt-Svc]]) الطلبات بتبقى [[h3]]. و [[curl -sI https://example.com]] بيطبع [[HTTP/2 200]] (جربت ده).

لو h3 ماظهرش خالص: [[nginx -V 2>&1 | grep -o with-http_v3_module]] مابيطلّعش حاجة يبقى نسختك مش بتدعمه، أو UDP 443 مقفول في firewall بتاع مزود السيرفر كمان مش ufw بس.

الغلط الشائع: [[nginx -t]] يطلع [[unknown directive "http2"]]. ده حصل معايا على Nginx 1.24 بتاع أوبونتو 24.04: [[http2 on]] محتاج 1.25.1 أو أحدث. على 1.24 استخدم الصيغة القديمة [[listen 443 ssl http2;]] وشيل سطور quic و http3، أو سطّب Nginx من repo nginx.org.`
        },
        {
          cmd: "IP الزائر ورا Cloudflare",
          title: "set_real_ip_from و CF-Connecting-IP",
          desc: "لما Cloudflare قدام السيرفر، كل الطلبات بتوصل من IPs بتاعة Cloudflare: اللوج، و rate limiting، و fail2ban، و ufw deny كلهم بيشتغلوا على IP غلط. موديول [[realip]] بيخلي Nginx يصدّق header [[CF-Connecting-IP]] بس لو الطلب جاي فعلًا من رينجات Cloudflare، ويحط IP الزائر الحقيقي في [[$remote_addr]].",
          example: R`{ for f in ips-v4 ips-v6; do curl -s https://www.cloudflare.com/$f; echo; done; } | grep . | sed 's/.*/set_real_ip_from &;/' | sudo tee /etc/nginx/conf.d/cloudflare-realip.conf
echo 'real_ip_header CF-Connecting-IP;' | sudo tee -a /etc/nginx/conf.d/cloudflare-realip.conf
nginx -V 2>&1 | grep -o with-http_realip_module
sudo nginx -t && sudo systemctl reload nginx
sudo tail -5 /var/log/nginx/access.log | awk '{print $1}'`,
          try: "افتح الموقع من موبايلك على الداتا، وقارن أول عمود في access.log بـ IP اللي بيقوله ifconfig.me قبل الإعداد وبعده.",
          deep: {
            why: "من غير الإعداد ده، أول زائر يعمل ضغط فـ rate limiting بيقفل Cloudflare نفسها، يعني كل الزوار. و fail2ban ممكن يحظر Cloudflare فالموقع يقع للكل.",
            how: R`[[set_real_ip_from]]: الرينجات اللي بتثق فيها. Nginx مش هيقرا الـ header إلا لو الطلب جاي منها، فمحدش يقدر يزوّر IP بإنه يبعت الـ header بنفسه. القائمة الرسمية على cloudflare.com/ips، والأمر الأول بيولّد الملف منها (IPv4 و IPv6).

[[real_ip_header CF-Connecting-IP]]: الـ header اللي Cloudflare بتحط فيه IP الزائر. بعدها [[$remote_addr]] و [[$binary_remote_addr]] بيبقوا الزائر في كل حاجة: اللوج و limit_req و allow/deny.

الملف في conf.d فبيتطبق على http كله. والتطبيق بياخد الـ IP الصح من X-Real-IP لأنه مبني على $remote_addr.

لو بتستخدم Cloudflare Tunnel، الطلبات جاية من cloudflared على السيرفر نفسه: [[set_real_ip_from 127.0.0.1;]].`,
            when: "أول ما تحط Cloudflare بـ proxy (السحابة البرتقالي) قدام أي موقع.",
            mistakes: "[[set_real_ip_from 0.0.0.0/0]] أو [[real_ip_header X-Forwarded-For]] من غير رينجات: أي حد يزوّر IP ويعدّي الحظر. ونسيان تحديث القائمة لما Cloudflare تضيف رينج (cron شهري بنفس الأمر)."
          },
          lines: [
            "هات رينجات Cloudflare الرسمية (IPv4 و IPv6) وحوّل كل سطر لـ set_real_ip_from في ملف conf.d.",
            "خد IP الزائر من CF-Connecting-IP (بس من الرينجات دي).",
            "موديول realip مبني في نسختك؟",
            "اختبر وطبّق.",
            "آخر IPs في اللوج: المفروض زوار حقيقيين مش رينجات Cloudflare."
          ],
          sol: R`قبل الإعداد: أول عمود في [[access.log]] بيبقى IP من رينجات Cloudflare (زي [[172.68.x.x]] أو [[162.158.x.x]] أو IPv6 بيبدأ بـ [[2a06:98c0]])، ومش هو اللي ifconfig.me بيقوله على موبايلك.

بعد الإعداد و reload: العمود ده بقى هو نفسه IP موبايلك. جربت الفكرة محليًا: [[set_real_ip_from 127.0.0.1]] و [[CF-Connecting-IP: 41.33.10.20]]، فاللوج سجّل [[41.33.10.20]] بدل 127.0.0.1.

الغلط الشائع: [[nginx -V | grep realip]] مابيطلّعش حاجة (نسخة من غير الموديول)، فـ [[nginx -t]] يقول [[unknown directive "set_real_ip_from"]]. أو ملف الـ IPs فاضي لأن curl فشل؛ افتحه وبص. وعلى الداتا في الموبايل ممكن تلاقي IP شركة الاتصالات مش IP ثابت، وده طبيعي.`
        },
        {
          cmd: "تشخيص Nginx",
          title: "كل error ورسالته في اللوج",
          desc: "كل status له سطر مميز في error.log: 403 غالبًا صلاحيات أو directory بدون index، و 404 المسار في root غلط، و 413 حجم الرفع، و 502 التطبيق مش بيرد، و 504 بطيء. و [[error_log debug]] مؤقتًا بيوريك كل قرار Nginx خده للطلب.",
          example: R`sudo tail -50 /var/log/nginx/error.log
sudo grep -c " 502 " /var/log/nginx/access.log
curl -sI -H "Host: example.com" http://127.0.0.1/ | head -1
sudo -u www-data ls -la /var/www/example.com/html/
sudo nginx -T | grep -B3 -A10 "server_name example.com"
sudo sed -i 's/error_log .*/error_log \/var\/log\/nginx\/error.log debug;/' /etc/nginx/nginx.conf && sudo nginx -s reload`,
          try: "403 على موقع static: الأمر الرابع بيجرّب القراية كيوزر Nginx (www-data). لو Permission denied، ده السبب.",
          deep: {
            why: "Nginx بيقول بالظبط ليه رفض أو فشل، في error.log. المشكلة إن الناس بتشوف الـ status في المتصفح وتخمّن بدل ما تقرا السطر.",
            how: R`الرسايل الشائعة في error.log وحلها:

[[open() failed (13: Permission denied)]]: 403، Nginx (www-data) مش قادر يقرا الملف أو يدخل فولدر في الطريق. الأمر الرابع بيجرّب كـ www-data بالظبط. الحل chmod على الفولدرات (755) والملفات (644)، أو chown.

[[directory index of ... is forbidden]]: 403، الطلب على فولدر ومفيش index.html فيه.

[[open() failed (2: No such file)]]: 404، الـ root غلط أو الملف مش هناك. [[nginx -T]] يوريك الـ root الفعلي للبلوك.

[[client intended to send too large body]]: 413.

[[connect() failed (111: Connection refused) while connecting to upstream]]: 502، التطبيق واقع أو بورت غلط.

[[upstream timed out]]: 504.

[[conflicting server name]] عند -t: نفس server_name في بلوكين.

[[curl -H "Host: example.com" http://127.0.0.1]]: بيختبر بلوك معين من على السيرفر متجاهلًا DNS.

[[error_log ... debug]] مؤقتًا: كل قرار (أنهي location اتاختار، وأنهي ملف اتجرّب). ضخم، شغّله دقيقة وارجّعه لـ warn.

و [[grep -c " 502 "]] يعدّ 502 في access.log: بتحصل كتير ولا مرة واحدة؟`,
            when: "أي status غير متوقع. أول حاجة error.log.",
            mistakes: "تعدّل صلاحيات لـ 777 عشان 403 يروح. وتسيب debug شغال فاللوج يملى الديسك في ساعات."
          },
          lines: [
            "آخر ٥٠ خطأ: الرسالة بتقول السبب.",
            "كام 502 في اللوج.",
            "اختبر بلوك معين من على السيرفر.",
            "جرّب القراية كيوزر Nginx: Permission denied = 403.",
            "الإعدادات الفعلية للبلوك ده.",
            "شغّل debug مؤقتًا (رجّعه warn بعدين)."
          ],
          sol: R`لو المشكلة صلاحيات، [[sudo -u www-data ls -la /var/www/example.com/html/]] بيطبع [[ls: cannot access '/var/www/example.com/html/': Permission denied]] (أو [[cannot open directory]]). و [[error.log]] فيه سطر زي [[open() "/var/www/example.com/html/index.html" failed (13: Permission denied)]] أو [[stat() ... failed (13: Permission denied)]]. جربتها بموقع في فولدر مقفول وطلعت نفس الرسالة بالظبط.

الحل: كل فولدر في المسار محتاج [[x]] للآخرين، والملفات [[r]]: [[sudo chmod o+x /var /var/www /var/www/example.com]] و [[sudo chmod -R o+rX /var/www/example.com/html]]. وأداة [[namei -l /var/www/example.com/html/index.html]] بتوري صلاحيات كل فولدر في المسار.

لو [[ls]] اشتغل عادي والمشكلة لسه 403: غالبًا مفيش [[index.html]] ومفيش [[autoindex]]، واللوج بيقول [[directory index of ... is forbidden]]. والغلط الشائع: [[chmod 777]] على كل حاجة؛ مش محتاج، و [[o+rX]] كفاية.`
        }
      ]
    },
    {
      t: "Nginx جوه Docker والشهادات",
      l: 3,
      n: "شهادات بـ webroot، و DNS بتاع Docker، وتعديل config مشترك بين كذا مشروع من غير ما توقّع حد",
      items: [
        {
          cmd: "acme-challenge",
          title: "مسار تحقق Let's Encrypt يفضل شغال على بورت 80",
          desc: "لما certbot يشتغل بطريقة webroot، Let's Encrypt بتطلب ملف من [[/.well-known/acme-challenge/]] على بورت 80. البلوك ده بيقدّم المسار ده من فولدر ثابت، وكل الباقي يتحوّل لـ https. ولازم يفضل موجود بعد SSL كمان، لأن التجديد كل شهرين بيعدّي من نفس الطريق.",
          example: R`server {
    listen 80;
    server_name example.com www.example.com;
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://example.com$request_uri; }
}`,
          try: "حط ملف تجربة: [[echo ok | sudo tee /var/www/certbot/.well-known/acme-challenge/test]] واطلب [[curl http://example.com/.well-known/acme-challenge/test]]: لازم يرد ok مش 301.",
          flag: "script",
          deep: {
            why: "Nginx جوه Docker معناه إن [[certbot --nginx]] مينفعش (certbot مش شايف ملفات Nginx ولا يقدر يعمله reload). webroot بيحل ده: certbot يكتب ملف التحدي في فولدر، و Nginx يقدمه، من غير ما حد يوقف الموقع.",
            how: R`certbot بيكتب ملف باسم عشوائي في [[/var/www/certbot/.well-known/acme-challenge/]]، و Let's Encrypt بتطلب [[http://example.com/.well-known/acme-challenge/NAME]]. لو رجع المحتوى الصح، يبقى انت مسيطر على الدومين.

في compose نفس الفولدر راكب في الاتنين: [[./certbot/www:/var/www/certbot]] في container الـ Nginx وفي container الـ certbot، و [[./certbot/conf:/etc/letsencrypt]] للشهادات (في Nginx بـ [[:ro]]).

مشكلة البيضة والفرخة: الإعداد الكامل فيه [[ssl_certificate]] بيشاور على ملف لسه مش موجود، فـ Nginx يرفض يقوم خالص ([[cannot load certificate]]). ولو Nginx مش قايم مفيش حد يرد على التحدي. الحل على مرحلتين: شغّل Nginx بإعداد HTTP بس (البلوك ده)، خد الشهادة، وبعدين حط الإعداد الكامل بالـ 443. الأمر نفسه في تاب VPS (certbot --webroot).

الترتيب جوه البلوك مش مهم: [[/.well-known/acme-challenge/]] بادئة أطول من [[/]] فبتكسب لوحدها.`,
            when: "أي Nginx جوه Docker، أو أي سيرفر عايز تجدد فيه الشهادة من غير ما توقف الموقع.",
            mistakes: "في مشروع حقيقي سكربت أول شهادة كان بيشغّل Nginx بالإعداد الكامل اللي بيشاور على شهادة لسه مش موجودة، فـ Nginx يقع ومحدش يرد على التحدي. ومسح بلوك الـ acme بعد ما SSL اشتغل «لأنه خلص»، فالتجديد يفشل بعد شهرين. وفولدر مختلف في الاتنين (certbot بيكتب في مكان و Nginx بيقرا من مكان تاني) فالتحدي يرجع 404."
          },
          lines: [
            "بلوك بورت 80.",
            "http.",
            "الدومين بالـ www ومن غيرها.",
            "ملفات التحدي من الفولدر المشترك مع certbot.",
            "أي حاجة تانية تروح https على دومين واحد.",
            "قفلة."
          ],
          sol: R`[[curl http://example.com/.well-known/acme-challenge/test]] بيطبع [[ok]]، والـ status [[200]] مش 301. جربتها: المسار ده رجّع [[ok]]، وأي مسار تاني على نفس الـ server رجّع [[301]] و [[Location: https://...]].

ده معناه إن [[location /.well-known/acme-challenge/]] أطول prefix فبيكسب قبل [[location /]]، و [[root /var/www/certbot]] بيضيف المسار كله على الـ root، فالملف لازم يبقى في [[/var/www/certbot/.well-known/acme-challenge/test]].

الأغلاط الشائعة: [[301]]: فيه [[return 301]] على مستوى الـ server (بره أي location)، وده بيتنفذ قبل الـ locations. و [[404]]: استخدمت [[alias]] بمسار غلط أو الملف في [[/var/www/certbot/test]]. ولو نفس الأمر من بره السيرفر مش شغال ومن جوه شغال، البورت 80 مقفول في الـ firewall.`
        },
        {
          cmd: "resolver 127.0.0.11",
          title: "اسم الـ container يتسأل عنه مع كل طلب",
          desc: "[[proxy_pass http://myapp-app:3000]] بيحوّل الاسم لـ IP مرة واحدة وقت ما Nginx يقوم. لو الـ container اتبنى من جديد وخد IP تاني، Nginx يفضل يكلم القديم ويرجع 502 لحد reload. [[resolver 127.0.0.11]] (الـ DNS بتاع Docker) مع العنوان في متغير بيخلي Nginx يسأل من جديد كل شوية.",
          example: R`resolver 127.0.0.11 valid=10s ipv6=off;
server {
    listen 80;
    server_name example.com;
    location / {
        set $app_upstream http://myapp-app:3000;
        proxy_pass $app_upstream;
    }
}`,
          try: "اعمل [[docker compose up -d --force-recreate app]] وانت عامل [[curl]] في لوب على الموقع: من غير الـ resolver هتشوف 502 لحد ما تعمل reload، ومعاه بيرجع لوحده في ثواني.",
          flag: "script",
          deep: {
            why: "على سيرفر فيه Nginx واحد مشترك قدام كذا مشروع، كل deploy لأي مشروع بيعيد إنشاء الـ container بتاعه. من غير الإعداد ده لازم تفتكر تعمل reload للـ Nginx المشترك بعد كل deploy، ولو container مشروع واحد واقع Nginx كله ميقومش.",
            how: R`اسم ثابت في [[proxy_pass]] بيتحل مرة واحدة وقت القراية. ده بيعمل مشكلتين: IP قديم بعد إعادة الإنشاء (502)، ولو الـ container مش شغال وقت ما Nginx يقوم أو يعمل reload، بيرفض الإعداد كله بـ [[host not found in upstream]]، فكل المواقع اللي على نفس الـ Nginx تقع.

لما العنوان يبقى متغير ([[set $app_upstream]])، Nginx مش بيحلّه وقت القراية. بيحلّه وقت الطلب عن طريق [[resolver]]. و [[127.0.0.11]] عنوان ثابت للـ DNS الداخلي بتاع Docker، موجود في أي network انت عاملها (زي network الـ compose)، مش في الـ bridge الافتراضي.

[[valid=10s]]: خزّن الإجابة ١٠ ثواني بس. [[ipv6=off]]: متسألش عن AAAA (الشبكة غالبًا IPv4 بس).

فرق مهم: مع المتغير، الـ URI بيتبعت زي ما هو ومفيش استبدال للبادئة، فلو كنت بتعتمد على [[proxy_pass http://app:3000/;]] (بشرطة في الآخر) عشان تشيل جزء من المسار، هتحتاج [[rewrite]] بدلها.

و [[upstream {}]] مبيعملش ده في النسخ القديمة. من Nginx 1.27.3 فيه [[server app:3000 resolve;]] جوه upstream، بس طريقة المتغير شغالة في أي نسخة.`,
            when: "Nginx جوه Docker بيعمل proxy لـ containers تانية بالاسم، خصوصًا لو مشترك بين كذا مشروع.",
            mistakes: "متغير في proxy_pass من غير سطر [[resolver]]: كل طلب يرجع 502 وفي اللوج [[no resolver defined]]. واستخدام [[resolver 8.8.8.8]]: ده DNS عام ميعرفش أسامي الـ containers. وتفتكر إن [[docker compose restart]] بيحافظ على الـ IP، هو غالبًا بيحافظ عليه، بس [[up -d]] بعد build بيعمل container جديد بـ IP جديد."
          },
          lines: [
            "اسأل DNS بتاع Docker، وخزّن الإجابة ١٠ ثواني.",
            "الموقع.",
            "http.",
            "الدومين.",
            "كل الطلبات.",
            "العنوان في متغير، فمبيتحلّش وقت القراية.",
            "Nginx يسأل عن الاسم وقت الطلب.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`من غير الـ resolver: بعد [[--force-recreate]] الـ container بياخد IP جديد، و Nginx لسه ماسك القديم، فاللوب بيطبع [[502]] على طول، و [[docker logs nginx]] فيه [[connect() failed (111: Connection refused) while connecting to upstream ... upstream: "http://172.20.0.2:80/"]]. بعد [[nginx -s reload]] بيرجع 200.

مع الـ resolver والمتغير: فيه 502 لثواني قليلة (لحد ما الـ container الجديد يقوم ويخلص [[valid=10s]])، وبعدين 200 لوحده من غير reload. جربت الاتنين جنب بعض: القديم فضل 502 لحد الـ reload، والجديد رجع لوحده.

الغلط الشائع: تحط [[resolver]] وتسيب [[proxy_pass http://myapp-app:3000;]] مباشرة من غير متغير؛ كده Nginx بيحل الاسم مرة واحدة وقت التشغيل بس والـ resolver مالوش أثر. و [[127.0.0.11]] بيشتغل جوه شبكات Docker اللي انت عاملها بس، مش على Nginx مسطّب على السيرفر.`
        },
        {
          cmd: "nginx -t في container مؤقت",
          title: "جرّب الإعداد الجديد بنفس النسخة قبل ما تلمس الحقيقي",
          desc: "على Nginx شغال جوه Docker، غلطة في الملف معناها إن الـ container يقع مع أول restart. قبل ما تكتب فوق الملف الحقيقي، شغّل container مؤقت من نفس الـ image وعلى نفس الشبكة، راكب فيه الملف الجديد، واعمل [[nginx -t]]. لو فشل، الملف الحقيقي متلمسش.",
          example: R`IMAGE="$(docker inspect nginx --format '{{.Config.Image}}')"
docker run --rm --network proxy-net \
  -v "$PWD/nginx.conf.new:/etc/nginx/nginx.conf:ro" \
  -v /srv/certbot/conf:/etc/letsencrypt:ro \
  "$IMAGE" nginx -t`,
          try: "اعمل نسخة من الإعداد، ضيف فيها غلطة (امسح ; من سطر)، وجرّبها بالأمر ده. الخطأ يطلع بالسطر، والموقع الحقيقي شغال عادي.",
          deep: {
            why: "[[docker exec nginx nginx -t]] بيختبر الملف اللي الـ container شايفه دلوقتي، يعني لازم تكون كتبت فوق الحقيقي الأول. لو فيه غلطة ونسيت ترجّع، أول restart للسيرفر ياخد كل المواقع معاه. الاختبار في container مؤقت بيفصل التجربة عن الإنتاج.",
            how: R`[[docker inspect ... '{{.Config.Image}}']]: اسم الـ image اللي الـ Nginx الحقيقي شغال بيها بالظبط. نفس النسخة مهم: [[http2 on]] مثلًا بيعدّي على 1.25 ويرفضه 1.24.

[[--network proxy-net]]: نفس الشبكة، لأن [[nginx -t]] بيحاول يحل أسامي الـ upstreams الثابتة. من غير الشبكة هيفشل بـ [[host not found]] والإعداد سليم.

[[-v .../letsencrypt:ro]]: [[nginx -t]] بيفتح ملفات الشهادات فعلًا، فلازم تبقى موجودة وإلا يفشل بـ [[cannot load certificate]].

[[--rm]]: الـ container بيتمسح لوحده بعد الاختبار.

لو عدّى، تكتب الملف الجديد مكان القديم وتعمل [[docker exec nginx nginx -s reload]]. الدرس اللي بعده بيجمع ده كله في سكربت.`,
            when: "قبل أي تعديل على Nginx مشترك جوه Docker، خصوصًا من سكربت deploy.",
            mistakes: "تختبر بـ [[nginx:latest]] بدل الـ image الشغالة فيعدّي عندك ويفشل في الحقيقي. وتنسى الشبكة أو الشهادات فتاخد فشل كاذب وتفتكر الإعداد بايظ."
          },
          lines: [
            "اسم الـ image اللي Nginx الحقيقي شغال بيها.",
            "container مؤقت على نفس الشبكة (بيتمسح بعد ما يخلص).",
            "راكب فيه الملف الجديد مكان nginx.conf.",
            "والشهادات عشان -t بيفتحها فعلًا.",
            "اختبر بس، من غير ما تشغّل حاجة."
          ],
          sol: R`الأمر بيطبع الخطأ باسم الملف ورقم السطر، زي:

[[nginx: [emerg] invalid number of arguments in "gzip_comp_level" directive in /etc/nginx/nginx.conf:13]] وبعدها [[nginx: configuration file /etc/nginx/nginx.conf test failed]] والـ exit code 1. (جربت نفس الغلطة: شلت [[;]] من آخر سطر gzip_comp_level.) وأحيانًا حسب مكان الـ [[;]] الرسالة بتبقى [[unexpected "}"]] أو [[directive ... is not terminated by ";"]] والسطر اللي بعده.

وفي نفس الوقت [[curl]] على الموقع الحقيقي بيرجع 200 عادي، لأن الـ container المؤقت ماعملش أي حاجة غير الاختبار واتمسح.

الغلط الشائع: [[host not found in upstream "myapp:3000"]]: الـ container المؤقت مش على نفس شبكة Docker ([[--network]] ناقص أو اسمها غلط). أو [[cannot load certificate]]: نسيت mount بتاع الشهادات. دول مش أخطاء في ملفك، دول ناقص في بيئة الاختبار.`
        },
        {
          cmd: "بلوك managed",
          title: "تحط جزء مشروعك في config مشترك وتغيّره بأمان",
          desc: "سيرفر عليه Nginx واحد لكذا مشروع، وكل مشروع ليه جزء في نفس الملف. السكربت ده بيحط جزء مشروعك بين علامتين ([[# >>> myapp]] و [[# <<< myapp]])، فكل deploy يشيل القديم ويحط الجديد من غير ما يلمس الباقي. قبلها باك أب، واختبار في container مؤقت، وبعدها reload.",
          example: R`#!/bin/bash
set -euo pipefail
SNIPPET="$__{1:?usage: nginx-apply.sh snippet.conf}"
CONF=/srv/shared/nginx/nginx.conf
BEGIN="# >>> myapp (managed)"; END="# <<< myapp"
cp "$CONF" "$CONF.bak.$(date +%Y%m%d%H%M%S)"
TMP="$(mktemp)"; cp "$CONF" "$TMP"
start=$(grep -n -F "$BEGIN" "$TMP" | head -1 | cut -d: -f1 || true)
end=$(grep -n -F "$END" "$TMP" | tail -1 | cut -d: -f1 || true)
if [ -n "$start" ] && [ -n "$end" ]; then sed -i "$__{start},$__{end}d" "$TMP"
elif [ -n "$start$end" ]; then echo "one marker is missing, fix by hand"; exit 1; fi
last=$(grep -n '^}' "$TMP" | tail -1 | cut -d: -f1)
{ head -n $((last - 1)) "$TMP"; echo "$BEGIN"; cat "$SNIPPET"; echo "$END"; echo "}"; } > "$TMP.new"
IMAGE="$(docker inspect nginx --format '{{.Config.Image}}')"
docker run --rm --network proxy-net -v "$TMP.new:/etc/nginx/nginx.conf:ro" -v /srv/certbot/conf:/etc/letsencrypt:ro "$IMAGE" nginx -t \
  || { echo "test failed, $CONF unchanged"; exit 1; }
cat "$TMP.new" > "$CONF"
rm -f "$TMP" "$TMP.new"
docker exec nginx nginx -s reload`,
          try: "على سيرفر التجربة: شغّل السكربت مرتين ورا بعض بنفس الـ snippet، و [[grep -c '>>> myapp' nginx.conf]] لازم يفضل 1 مش 2.",
          flag: "script",
          deep: {
            why: "لما مشروعين بيشاركوا Nginx واحد، أي تعديل يدوي على الملف ممكن يبوّظ المشروع التاني. العلامات بتخلي كل مشروع يعرف حدوده بالظبط، والسكربت بيعمل التعديل بنفس الطريقة كل مرة.",
            how: R`الباك أب بتاريخ في الاسم، وكل الشغل على نسخة مؤقتة ([[mktemp]])، فالملف الحقيقي مبيتلمسش غير في آخر سطرين.

[[grep -n -F]]: رقم السطر اللي فيه العلامة ([[-F]] نص حرفي مش regex). لو العلامتين موجودين، [[sed -i "start,endd"]] بيمسح من الأولى للتانية. لو واحدة بس موجودة، حد عدّل بإيده، فالسكربت يقف بدل ما يضيف بلوك مكرر.

[[grep -n '^}' | tail -1]]: آخر قوس في أول السطر، وده بيفترض إنه قفلة [[http {}]]. [[head -n $((last - 1))]] كل اللي قبله، وبعدين العلامة والـ snippet والعلامة والقوس.

الاختبار في container مؤقت بنفس الـ image والشبكة والشهادات (الدرس اللي قبله). لو فشل، [[exit 1]] والملف زي ما هو.

ليه [[cat "$TMP.new" > "$CONF"]] مش [[mv]]؟ الملف راكب في الـ container كـ bind mount لملف واحد، والـ mount مربوط بالـ inode (رقم الملف على الديسك). [[mv]] و [[sed -i]] بيعملوا ملف جديد بـ inode جديد، فالـ container يفضل شايف القديم، والـ reload يقرا الإعداد القديم وانت فاكر إنك طبّقت. [[cat >]] بيكتب جوه نفس الملف فالـ container يشوف التغيير.`,
            when: "أي config مشترك بين أكتر من مشروع، أو أي ملف بيعدّله سكربت deploy بدل إنسان.",
            mistakes: "في مشروع حقيقي السكربت كان بيفترض إن آخر [[}]] في الملف قفلة [[http {}]]، فلو فيه [[stream {}]] بعده البلوك يتحط في المكان الغلط. وكان لو علامة النهاية اتمسحت يدوي بيضيف بلوك مكرر (النسخة دي بتقف). وملفات [[.bak]] بتتراكم من غير تنضيف ([[find -name '*.bak.*' -mtime +30 -delete]]). والأهم: مشروع بيعدّل ملف يملكه مشروع تاني بيربطهم ببعض، فالأنضف [[include /etc/nginx/conf.d/*.conf]] وكل مشروع ملف لوحده."
          },
          lines: [
            "وقّف عند أي غلطة أو متغير مش معرّف.",
            "ملف الـ snippet من أول باراميتر، وإلا اطبع طريقة الاستخدام.",
            "الملف المشترك.",
            "علامتين البداية والنهاية.",
            "باك أب بالتاريخ.",
            "اشتغل على نسخة مؤقتة.",
            "رقم سطر علامة البداية (أو فاضي).",
            "رقم سطر علامة النهاية.",
            "لو الاتنين موجودين: امسح البلوك القديم.",
            "لو واحدة بس: حد عدّل بإيده، اقف.",
            "آخر قوس في أول السطر (قفلة http).",
            "اللي قبله، والبلوك الجديد بين العلامتين، والقوس.",
            "الـ image الشغالة.",
            "اختبر في container مؤقت، ومعاه الشهادات عشان [[-t]] بيفتحها...",
            "...ولو فشل اقف والملف الحقيقي زي ما هو.",
            "اكتب جوه نفس الملف (نفس الـ inode) عشان الـ container يشوفه.",
            "امسح الملفات المؤقتة.",
            "طبّق من غير قطع."
          ],
          sol: R`المرتين بيطبعوا إن [[nginx -t]] نجح ([[test is successful]])، و [[grep -c '>>> myapp' nginx.conf]] بيطبع [[1]] بعد الأولى وبعد التانية. ده لأن السكربت بيمسح البلوك القديم من [[BEGIN]] لـ [[END]] قبل ما يحط الجديد. جربته مرتين على نسخة تجربة وفضل 1، والملف فيه البلوك مرة واحدة قبل آخر [[}]].

وكمان هتلاقي ملفين باك أب [[nginx.conf.bak.*]]. ولو جرّبت snippet فيه غلطة، [[nginx -t]] بيفشل والسكربت بيطبع [[test failed, ... unchanged]] والملف الأصلي زي ما هو (جربتها برضه).

الغلط الشائع: العدد يطلع 2 لو حد عدّل الملف بإيده ومسح سطر [[# <<< myapp]]؛ ساعتها السكربت بيقف بـ [[one marker is missing]] بدل ما يبوّظ. وخلّي بالك إن السكربت بيفترض إن آخر [[}]] في أول السطر هو قفلة http.`
        },
        {
          cmd: "Caddy",
          title: "بديل بيطلع SSL ويجدده لوحده",
          desc: "Caddy سيرفر زي Nginx، بس بيطلع شهادة Let's Encrypt ويجددها لوحده لأي دومين تكتبه، من غير certbot ولا cron ولا مرحلتين. الإعداد أقصر بكتير. مناسب لمشروع جديد صغير، و Nginx أحسن لو عندك إعدادات معقدة أو شغال عليه أصلًا.",
          example: R`bot.example.com {
    handle /webhook/* {
        reverse_proxy app:8080
    }
    handle {
        respond "not found" 404
    }
}
admin.example.com {
    basic_auth {
        admin PASTE_HASH_HERE
    }
    reverse_proxy n8n:5678
}`,
          try: "على سيرفر التجربة بدومين فرعي: [[docker run -d -p 80:80 -p 443:443 -v caddy_data:/data -v $PWD/Caddyfile:/etc/caddy/Caddyfile caddy]] وافتح الدومين بـ https على طول.",
          flag: "script",
          deep: {
            why: "نص إعداد Nginx في مشروع صغير بيروح على SSL: بلوك acme، وشهادة على مرحلتين، وcontainer لـ certbot، وتجديد، وreload. Caddy بيعمل ده كله من اسم الدومين بس.",
            how: R`أي بلوك يبدأ باسم دومين، Caddy بيفهم إنه محتاج HTTPS: يطلب الشهادة، ويحوّل http لـ https، ويجدد قبل الانتهاء. الشرط زي certbot: الدومين بيشاور على السيرفر، وبورت 80 و 443 مفتوحين.

[[handle /webhook/*]]: المسار ده بس يروح للتطبيق. [[handle]] من غير مسار: أي حاجة تانية ترجع 404. كده البوت مكشوف منه الـ webhook بس، مش التطبيق كله.

[[basic_auth]]: زي auth_basic في Nginx. الـ hash بتطلعه بـ [[caddy hash-password]] (bcrypt). في النسخ القديمة اسمها [[basicauth]].

[[reverse_proxy n8n:5678]]: بالاسم جوه شبكة Docker، والـ headers زي X-Forwarded-For بتتبعت لوحدها.

وتقدر تكتب [[{$BOT_HOST}]] بدل الدومين، و Caddy ياخده من متغيرات البيئة.`,
            when: "مشروع جديد على سيرفر فاضي، أو أدوات داخلية (n8n، لوحات) محتاجة HTTPS بسرعة.",
            mistakes: "تنسى volume لـ [[/data]]: الشهادات بتضيع مع كل إعادة إنشاء، و Caddy يطلب جديدة كل مرة لحد ما يخبط في حد Let's Encrypt (٥ شهادات لنفس الدومينات في الأسبوع). وتشغّل Caddy و Nginx مع بعض على نفس السيرفر، والاتنين عايزين بورت 80 و 443."
          },
          lines: [
            "دومين البوت (Caddy يطلع شهادته لوحده).",
            "مسار الـ webhook بس...",
            "...يروح للتطبيق.",
            "قفلة.",
            "أي حاجة تانية...",
            "...404.",
            "قفلة.",
            "قفلة.",
            "دومين اللوحة.",
            "باسورد.",
            "يوزر admin والـ hash من caddy hash-password.",
            "قفلة.",
            "للوحة.",
            "قفلة."
          ],
          sol: R`بعد [[docker run -d -p 80:80 -p 443:443 ... caddy]]، [[docker logs]] بتاعه بيوري إنه بيطلب الشهادة: سطور فيها [[obtaining certificate]] وبعدين [[certificate obtained successfully]] للدومين. وفتح [[https://bot.example.com/webhook/x]] بيروح للتطبيق، وأي مسار تاني بيرجع [[not found]] بـ 404، و [[http://]] بيتحول [[https://]] لوحده.

ماجربتهاش هنا (محتاجة دومين بيشاور على السيرفر). والتطبيق [[app:8080]] لازم يبقى على نفس شبكة Docker بتاعة Caddy، وإلا هتاخد [[502]] واللوج يقول [[dial tcp: lookup app]].

الأغلاط الشائعة: الشهادة مش بتطلع: DNS لسه مش بيشاور على السيرفر، أو 80 و 443 مقفولين، أو فيه Nginx تاني ماسك البورتات ([[address already in use]]). ونسيان [[-v caddy_data:/data]] بيخلّي Caddy يطلب شهادة جديدة مع كل تشغيل، فتخبط rate limit بتاع Let's Encrypt.`
        }
      ]
    }
]);

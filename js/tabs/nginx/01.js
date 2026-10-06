// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("nginx", {
  label: "nginx",
  prompt: "deploy@vps:~$ ",
  lab: R`sudo nginx -t
sudo nginx -T | grep -E "server_name|listen"
sudo systemctl reload nginx`,
  labText: "جرّب على سيرفر التجربة أو جوه WSL أو Docker (docker run -p 8080:80 nginx). كل ملف إعدادات: احفظه في sites-available، اربطه، nginx -t، وبعدين reload.",
  levels: {
    "1": ["البداية", "الملفات والهيكل، وموقع static، و SPA، و reverse proxy كامل، والأوامر"],
    "2": ["المتوسط", "ضغط وكاش وتحويلات وكذا موقع و location matching و rate limiting و headers وحدود"],
    "3": [
      "المتقدم",
      "WebSockets، والتبديل بدون downtime، وحماية staging، ولوجات JSON، و HTTP/3، والتشخيص، و Nginx جوه Docker والشهادات"
    ]
  },
  categories: [
    {
      t: "الهيكل والملفات",
      l: 1,
      n: "Nginx بيقرا ملف واحد بيسحب ملفات، وكل موقع server block",
      items: [
        {
          cmd: "الملفات",
          title: "nginx.conf و sites-enabled",
          desc: "[[/etc/nginx/nginx.conf]] الملف الرئيسي، وفي آخره [[include]] بيسحب [[conf.d/*.conf]] و [[sites-enabled/*]]. كل موقع ملف في sites-available واختصار في sites-enabled. و [[nginx -T]] بيطبع كل الإعدادات بعد الدمج.",
          example: R`sudo nginx -t
sudo nginx -T | grep -E "server_name|listen|root|proxy_pass"
ls -la /etc/nginx/sites-enabled/
grep include /etc/nginx/nginx.conf
sudo systemctl reload nginx
sudo tail -f /var/log/nginx/error.log`,
          try: "اقرا [[nginx.conf]] من أوله: worker_processes، و events، و http، ودوّر على سطور include في الآخر.",
          deep: {
            why: "قبل ما تعدّل أي حاجة لازم تعرف Nginx بيقرا منين. ملف واحد بيسحب ملفات، والـ include هو اللي بيربطهم.",
            how: R`[[nginx.conf]] فيه ٣ مستويات: الأعلى (main) فيه [[worker_processes]] (عدد العمليات، auto = عدد الأنوية) و [[error_log]]. [[events]] فيه [[worker_connections]] (اتصالات لكل عملية). و [[http]] فيه كل حاجة عن HTTP: اللوج، gzip، وفي آخره سطور [[include]] بتسحب [[conf.d/*.conf]] و [[sites-enabled/*]].

الترتيب مهم: الإعداد في [[http]] بينطبق على كل المواقع، وفي [[server]] على موقع، وفي [[location]] على مسار. والأضيق بيكسب.

[[sites-available]] فيه كل الملفات، و [[sites-enabled]] فيه symlinks للشغالة بس (تاب VPS). [[conf.d]] لإعدادات مش مرتبطة بموقع (upstream، rate limit zones، log formats).

[[nginx -t]] بيقرا كل حاجة ويقولك سليم ولا فيه غلطة وفي أنهي ملف وسطر. [[-T]] نفسه بس بيطبع الإعدادات كاملة بعد الدمج، وده أحسن طريقة تعرف إيه اللي فعلًا شغال (الـ grep بيطلّع المهم).

[[reload]] بيشغّل workers جداد بالإعدادات الجديدة والقدام بيخلصوا طلباتهم وبيقفلوا: صفر انقطاع.`,
            when: "قبل أي تعديل: [[-T]] تشوف الحالة. وبعده [[-t]] وبعدين reload.",
            mistakes: "تعدّل ملف في sites-available مش مربوط في sites-enabled. وإعداد في location بيلغي نفس الإعداد في server (زي add_header) من غير ما تعرف."
          },
          teach: R`## الفكرة: ملف واحد بيسحب الباقي

الأوامر الـ ٦ دي كلها بتجاوب على سؤال واحد: «Nginx شغال بأنهي إعدادات، وجايبها منين؟». جربتها كلها على أوبونتو 24.04 جوه Docker بعد [[apt install nginx]] (النسخة [[nginx/1.24.0]]). الكونتينر مفيهوش systemd، فبدل [[systemctl reload nginx]] استخدمت [[nginx -s reload]]، وده نفس الشغل بالظبط.

---

## ١. قبل الأوامر: شكل nginx.conf من جوه

ده [[/etc/nginx/nginx.conf]] بتاع أوبونتو بعد ما شلت التعليقات والسطور الفاضية:

~~~text /etc/nginx/nginx.conf
user www-data;
worker_processes auto;
pid /run/nginx.pid;
error_log /var/log/nginx/error.log;
include /etc/nginx/modules-enabled/*.conf;
events {
	worker_connections 768;
}
http {
	sendfile on;
	tcp_nopush on;
	types_hash_max_size 2048;
	include /etc/nginx/mime.types;
	default_type application/octet-stream;
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
	ssl_prefer_server_ciphers on;
	access_log /var/log/nginx/access.log;
	gzip on;
	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*;
}
~~~

### القاعدة الوحيدة في الكتابة

كل سطر اسمه **directive** (أمر إعداد): اسم، وبعده قيمة أو أكتر، وفي الآخر [[;]]. والأوامر اللي جواها أوامر تانية اسمها **block** وبتتقفل بـ [[{ }]]. نسيان [[;]] هو أشهر غلطة في Nginx كله.

### الـ ٣ مستويات

| المستوى | أمثلة | معناه |
|---|---|---|
| main (بره أي أقواس) | [[user www-data]] و [[worker_processes auto]] | إعدادات البرنامج نفسه |
| [[events { }]] | [[worker_connections 768]] | كل worker يمسك لحد 768 اتصال في نفس الوقت |
| [[http { }]] | [[gzip on]] و [[access_log]] و [[include]] | كل حاجة تخص HTTP والمواقع |

- [[user www-data]]: الـ workers بيشتغلوا باليوزر ده، مش root. عشان كده لازم [[www-data]] يقدر يقرا ملفات موقعك.
- [[worker_processes auto]]: worker لكل core. على جهاز فيه 16 logical processor، [[ps -o pid,user,cmd -C nginx]] طلّع process واحد [[master]] شغال بـ root و 16 [[worker process]] شغالين بـ [[www-data]]. الـ master بيقرا الإعدادات ويدير، والـ workers هما اللي بيردوا على الطلبات.
- [[include]]: «حط محتوى الملف ده هنا كأنه مكتوب في المكان ده». وده اللي بيربط الملفات ببعض.

---

## ٢. [[sudo nginx -t]]

[[sudo]] لأن Nginx محتاج يقرا ملفات root بس اللي يقدر يقراها (الشهادات مثلًا). و [[-t]] من test: اقرا كل الإعدادات واتأكد إنها سليمة، **من غير** ما تغيّر حاجة في Nginx الشغال.

~~~text الناتج
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
~~~

السطر الأول: الصيغة سليمة. التاني: الاختبار كله نجح (الملفات المذكورة موجودة، والأسامي بتتحل). ولو فيه غلطة، بيقولك الملف ورقم السطر. جربت ملف فيه [[server { listen 80 }]] (ناقص [[;]]):

~~~text الناتج
[emerg] unexpected "}" in /etc/nginx/sites-enabled/bad:1
nginx: configuration file /etc/nginx/nginx.conf test failed
~~~

[[emerg]] (من emergency) أخطر مستوى في اللوج: Nginx مش هيقبل الإعدادات دي.

---

## ٣. [[sudo nginx -T | grep -E "server_name|listen|root|proxy_pass"]]

### [[nginx -T]] لوحده

[[-T]] الكابيتال = [[-t]] + اطبع كل الإعدادات بعد ما تسحب كل الـ includes. وقبل كل ملف بيكتب سطر بيقولك اسمه:

~~~text الناتج (السطور اللي بتبدأ بـ # configuration file بس)
# configuration file /etc/nginx/nginx.conf:
# configuration file /etc/nginx/mime.types:
# configuration file /etc/nginx/sites-enabled/default:
~~~

فبتعرف كل إعداد جاي من أنهي ملف. على أوبونتو جديد الناتج كله حوالي 330 سطر، فمحتاجين نفلتر.

### [[| grep -E "..."]]

[[|]] (pipe) بيبعت ناتج الأمر اللي قبله للأمر اللي بعده. و [[grep]] بيطبع السطور اللي فيها كلمة معينة، و [[-E]] (extended regex) بيخلّي [[|]] جوه الكلام معناها «أو». يعني: اطبع أي سطر فيه server_name أو listen أو root أو proxy_pass.

~~~text الناتج على أوبونتو جديد (مختصر)
	listen 80 default_server;
	listen [::]:80 default_server;
	# listen 443 ssl default_server;
	root /var/www/html;
	server_name _;
#	listen 80;
#	server_name example.com;
~~~

السطور اللي بتبدأ بـ [[#]] تعليقات: [[-T]] بيطبع الملفات زي ما هي، و grep بيدوّر في النص، فبيمسكها هي كمان. الشغال فعلًا هو اللي من غير [[#]]: موقع واحد ([[default]]) بيسمع على 80 لـ IPv4 و IPv6 ([[[::]:80]])، والفولدر بتاعه [[/var/www/html]].

---

## ٤. [[ls -la /etc/nginx/sites-enabled/]]

[[-l]] تفاصيل لكل ملف، و [[-a]] حتى المخفي:

~~~text الناتج
lrwxrwxrwx 1 root root   34 Oct  6 12:40 default -> /etc/nginx/sites-available/default
~~~

أول حرف [[l]] يعني link (اختصار، symlink)، والسهم [[->]] بيقولك بيشاور على فين. يعني الملف الحقيقي في sites-available، وده مجرد اختصار ليه. تشيل الاختصار، الموقع يقفل والملف لسه موجود.

---

## ٥. [[grep include /etc/nginx/nginx.conf]]

~~~text الناتج
include /etc/nginx/modules-enabled/*.conf;
	include /etc/nginx/mime.types;
	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*;
~~~

| السطر | بيسحب إيه |
|---|---|
| [[modules-enabled/*.conf]] | modules إضافية (بره http، في main) |
| [[mime.types]] | جدول الامتدادات: [[.css]] نوعها [[text/css]]، وهكذا |
| [[conf.d/*.conf]] | أي ملف آخره [[.conf]]: إعدادات عامة (upstream، zones) |
| [[sites-enabled/*]] | **كل** ملف، أي اسم: مواقعك |

[[*]] معناها «أي اسم». والتلاتة الأخيرين جوه [[http { }]]، فأي ملف في الفولدرات دي كأنه مكتوب جوه http. عشان كده ملف الموقع بيبدأ بـ [[server {]] على طول من غير [[http]].

---

## ٦. [[sudo systemctl reload nginx]]

[[systemctl]] بيتحكم في الخدمات على لينكس، و [[reload]] بيقول لـ Nginx «اقرا الإعدادات تاني». الـ master بيشغّل workers جداد بالإعدادات الجديدة، والقدام بيكمّلوا الطلبات اللي في إيدهم ويقفلوا. في الكونتينر [[nginx -s reload]] طبع:

~~~text الناتج
[notice] 2680#2680: signal process started
~~~

يعني الإشارة اتبعتت للـ master. ([[2680#2680]] رقم الـ process.)

---

## ٧. [[sudo tail -f /var/log/nginx/error.log]]

[[tail]] بيطبع آخر سطور الملف، و [[-f]] (follow) بيفضل فاتح ويطبع أي سطر جديد أول ما يتكتب. تقفله بـ [[Ctrl+C]]. ده سطر حقيقي ظهر لما شلت صلاحية فولدر موقع:

~~~text سطر من error.log
2026/10/06 12:41:07 [crit] 2738#2738: *7 stat() "/var/www/example.com/html/" failed (13: Permission denied), client: 127.0.0.1, server: example.com, request: "GET / HTTP/1.1", host: "example.com"
~~~

بيقولك كل حاجة: المستوى ([[crit]])، والملف اللي فشل، والسبب ([[Permission denied]])، والزائر، وأنهي server block، والطلب نفسه.

---

## الخلاصة

| الأمر | بيجاوب على |
|---|---|
| [[nginx -t]] | الإعدادات سليمة؟ |
| [[nginx -T]] و grep | إيه الشغال فعلًا وجاي منين؟ |
| [[ls -la sites-enabled]] | أنهي مواقع متفعّلة؟ |
| [[grep include nginx.conf]] | nginx.conf بيسحب إيه؟ |
| [[systemctl reload nginx]] | طبّق من غير قطع |
| [[tail -f error.log]] | إيه اللي بيبوظ دلوقتي؟ |`,
          lines: [
            "الإعدادات سليمة؟",
            "الإعدادات النهائية بعد الدمج، مفلترة على المهم.",
            "المواقع الشغالة (symlinks).",
            "إيه اللي nginx.conf بيسحبه.",
            "طبّق من غير قطع.",
            "تابع الأخطاء."
          ],
          sol: R`على أوبونتو [[/etc/nginx/nginx.conf]] بيبدأ بـ [[user www-data;]] و [[worker_processes auto;]] (worker لكل core)، وبعدين [[include /etc/nginx/modules-enabled/*.conf;]]، وبعدين بلوك [[events { worker_connections 768; }]]، وبعدين [[http {]] الكبير فيه [[sendfile]] و [[include /etc/nginx/mime.types;]] وإعدادات اللوج و gzip.

وفي آخر بلوك http هتلاقي السطرين المهمين: [[include /etc/nginx/conf.d/*.conf;]] و [[include /etc/nginx/sites-enabled/*;]]. يعني أي ملف في الفولدرين دول بيتحط كأنه مكتوب جوه http، وده مكان مواقعك. و [[ls -la /etc/nginx/sites-enabled/]] بيوري links زي [[default -> /etc/nginx/sites-available/default]].

الغلط الشائع: تكتب [[server {}]] في nginx.conf بره بلوك http فيطلع [["server" directive is not allowed here]]. أو تعدّل ملف في sites-available وتنسى الـ link في sites-enabled، فمايتقريش. [[sudo nginx -T]] بيوريك الإعداد النهائي كله متجمع.`
        },
        {
          cmd: "موقع static",
          title: "HTML و CSS من فولدر",
          desc: "أبسط server block: بيسمع على 80، لدومين معين، وبيقدم ملفات من فولدر. [[try_files]] بيدوّر على الملف، وبعدين فولدر بنفس الاسم، وبعدين 404. ده كل اللي محتاجه لموقع HTML أو ناتج build.",
          example: R`server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/example.com/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}`,
          try: R`اعمل الفولدر وفيه index.html، وفعّل الملف، و [[curl -H "Host: example.com" http://127.0.0.1]].`,
          flag: "script",
          deep: {
            why: "موقع تعريفي، أو documentation، أو ناتج build لموقع static. مفيش تطبيق، Nginx بيقدم الملفات مباشرة، وده أسرع حاجة ممكنة.",
            how: R`[[listen 80]]: البورت. [[server_name]]: الدومينات اللي البلوك ده بيرد عليها (بيقارن بـ Host header). [[root]]: الفولدر اللي المسارات بتتحسب منه: طلب [[/about.html]] بيدوّر على [[/var/www/example.com/html/about.html]].

[[index]]: لما الطلب على فولدر ([[/]] أو [[/docs/]])، الملف اللي يتقدم.

[[try_files $uri $uri/ =404]]: جرّب بالترتيب: الملف بالمسار ده، وبعدين فولدر بالمسار ده (فيبقى index)، ولو مفيش 404. من غيرها Nginx بيتصرف افتراضيًا شبه كده بس try_files أوضح وبتمنع بعض السلوكيات الغريبة.

[[$uri]] متغير: المسار المطلوب بعد التنضيف (من غير query string).

الصلاحيات: Nginx بيشتغل كيوزر [[www-data]]، ولازم يقدر يقرا الملفات ويدخل كل فولدر في الطريق (x على الفولدرات). أشهر سبب 403.

و [[alias]] بديل root في location لما المسار في الـ URL مختلف عن الفولدر: [[location /assets/ { alias /var/www/static/; }]].`,
            when: "أي موقع من غير backend. و landing pages.",
            mistakes: "[[root]] جوه location بيتضاف عليه مسار الـ location (root /var/www + /static/ = /var/www/static/)، لو مش عايز كده استخدم alias. وصلاحيات الفولدر."
          },
          teach: R`## الفكرة: «لو حد طلب الدومين ده، قدّمله ملفات من الفولدر ده»

المثال ده ملف موقع كامل، بيتحفظ في [[/etc/nginx/sites-available/example.com]]. جربته على أوبونتو 24.04 جوه Docker بنفس خطوات الـ solCode، والطلبات كلها بـ curl من جوه الكونتينر.

~~~text /etc/nginx/sites-available/example.com
server {
    listen 80;
    server_name example.com www.example.com;
    root /var/www/example.com/html;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
~~~

---

## ١. [[server { ... }]]

**server block** = موقع واحد. كل اللي جوه القوسين إعدادات الموقع ده بس. والملف بيبدأ بـ [[server]] على طول لأن nginx.conf بيسحبه جوه [[http { }]] (درس الملفات).

## ٢. [[listen 80;]]

البورت اللي البلوك بيستنى عليه. 80 هو بورت HTTP العادي، يعني لما تكتب [[http://example.com]] المتصفح بيروح 80 من غير ما تكتبه.

## ٣. [[server_name example.com www.example.com;]]

الدومينات اللي البلوك ده بيرد عليها، مفصولة بمسافة. Nginx بيعرفها من header اسمه [[Host]] المتصفح بيبعته مع كل طلب. فلو عندك ٣ مواقع كلهم على بورت 80، الـ Host هو اللي بيفرّق.

## ٤. [[root /var/www/example.com/html;]]

الفولدر اللي المسارات بتتحسب منه. Nginx بيلزق مسار الطلب في آخره:

| الطلب | الملف اللي بيدوّر عليه |
|---|---|
| [[/about.html]] | [[/var/www/example.com/html/about.html]] |
| [[/img/logo.png]] | [[/var/www/example.com/html/img/logo.png]] |
| [[/]] | الفولدر نفسه، فبيروح لـ [[index]] |

## ٥. [[index index.html;]]

لما الطلب على فولدر (آخره [[/]])، قدّم الملف ده منه. [[/]] بيبقى [[index.html]]، و [[/docs/]] بيبقى [[docs/index.html]].

## ٦. [[location / { ... }]]

**location** = قواعد لمجموعة مسارات. و [[/]] بادئة كل المسارات، فده بلوك «كل الطلبات». (لما يبقى فيه كذا location، درس location matching بيشرح مين بيكسب.)

## ٧. [[try_files $uri $uri/ =404;]]

«جرّب الحاجات دي بالترتيب، وأول واحدة تنفع خلاص»:

1. [[$uri]]: متغير فيه مسار الطلب (من غير [[?x=1]]). لو فيه **ملف** بالاسم ده، قدّمه.
2. [[$uri/]]: لو فيه **فولدر** بالاسم ده، اتعامل معاه كفولدر (فيقدّم الـ index).
3. [[=404]]: لو مفيش لا ده ولا ده، رد بـ 404.

[[$]] قبل أي اسم في Nginx معناها متغير، و [[=]] قبل رقم معناها «رد بالكود ده».

---

## التجربة: الـ solCode سطر سطر

~~~bash
sudo mkdir -p /var/www/example.com/html
echo '<h1>example</h1>' | sudo tee /var/www/example.com/html/index.html
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
curl -H "Host: example.com" http://127.0.0.1
~~~

| السطر | بيعمل إيه |
|---|---|
| [[mkdir -p]] | يعمل الفولدر وكل الفولدرات اللي قبله لو مش موجودة |
| [[echo ... sudo tee FILE]] | يكتب السطر في الملف. [[tee]] بدل [[>]] لأن [[sudo echo > file]] الـ [[>]] بيتنفذ بصلاحياتك انت مش root |
| [[ln -s SRC DIR/]] | اختصار للملف في sites-enabled، وده اللي بيفعّل الموقع |
| [[nginx -t && reload]] | [[&&]]: الـ reload يحصل بس لو الاختبار نجح |
| [[curl -H "Host: example.com"]] | اطلب من السيرفر نفسه ([[127.0.0.1]]) وقوله إنك عايز example.com، من غير دومين حقيقي |

## الناتج: كل الحالات اللي جربتها

| الطلب | الرد |
|---|---|
| [[/]] بـ Host example.com | [[<h1>example</h1>]] |
| [[/about.html]] بـ Host www.example.com | محتوى about.html (نفس البلوك، الاسم التاني) |
| [[/docs]] (فولدر من غير [[/]]) | [[301 Moved Permanently]] و [[Location: http://example.com/docs/]] |
| [[/docs/]] | [[docs/index.html]] |
| [[/nope]] | [[404 Not Found]] |
| [[/]] من غير Host | [[<title>Welcome to nginx!</title>]] (الموقع الـ default رد) |

سطر [[/docs]] مهم: لما [[$uri/]] لقى فولدر والطلب ناقصه [[/]] في الآخر، Nginx بيحوّل الزائر للمسار بالشرطة عشان الروابط النسبية جوه الصفحة تشتغل صح.

### تجربة الصلاحيات

قفلت الفولدر بـ [[chmod 700 /var/www/example.com]] (صاحبه بس، و [[www-data]] مش صاحبه). الطلب رجع [[404 Not Found]]، وفي error.log:

~~~text error.log
[crit] stat() "/var/www/example.com/html/" failed (13: Permission denied)
~~~

يعني الملف موجود بس Nginx مش قادر يوصله. عشان كده لو شفت 404 أو 403 على ملف انت متأكد إنه موجود، بص في error.log قبل أي حاجة.

---

## الخلاصة

~~~text
listen        على أنهي بورت
server_name   لأنهي دومين (من Host header)
root          الملفات منين
index         لو الطلب فولدر، أنهي ملف
try_files     ملف؟ فولدر؟ وإلا 404
~~~`,
          lines: [
            "بداية بلوك موقع.",
            "http.",
            "الدومينات اللي البلوك ده بيرد عليها.",
            "الفولدر اللي المسارات بتتحسب منه.",
            "الملف الافتراضي للفولدرات.",
            "لكل الطلبات.",
            "جرّب الملف، وبعدين فولدر، وإلا 404.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[curl -H "Host: example.com" http://127.0.0.1]] بيرجّع محتوى [[index.html]] بتاعك (جربتها ورجّع [[<h1>example</h1>]]). الـ [[Host]] header هو اللي بيخلّي Nginx يختار الـ server block ده من غير ما يبقى عندك دومين حقيقي.

الترتيب: [[sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/]] وبعدين [[sudo nginx -t]] ([[syntax is ok]] و [[test is successful]]) وبعدين [[sudo systemctl reload nginx]].

لو رجّع صفحة [[Welcome to nginx!]] يبقى الـ default هو اللي رد: الملف مش متفعّل أو [[server_name]] مكتوب غلط. ولو 403 أو 404 وفي [[error.log]] تلاقي [[(13: Permission denied)]]، يبقى يوزر Nginx ([[www-data]]) مش قادر يوصل للفولدر: كل فولدر في المسار محتاج [[x]] للآخرين (درس تشخيص Nginx).`,
          solCode: R`sudo mkdir -p /var/www/example.com/html
echo '<h1>example</h1>' | sudo tee /var/www/example.com/html/index.html
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
curl -H "Host: example.com" http://127.0.0.1`
        },
        {
          cmd: "SPA",
          title: "React و Vue: كل المسارات لـ index.html",
          desc: "تطبيق React مبني فولدر فيه index.html و JS. المسارات زي [[/dashboard]] بيتعامل معاها JavaScript، مش ملفات. لو المستخدم عمل ريفريش عليها Nginx بيدوّر على ملف اسمه dashboard ويرجّع 404. الحل آخر خيار في try_files يبقى index.html.",
          example: R`server {
    listen 80;
    server_name app.example.com;
    root /var/www/app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
    }
}`,
          try: "افتح [[app.example.com/dashboard]] مباشرة (مش من الصفحة الرئيسية) واتأكد إنه بيفتح بدل 404.",
          flag: "script",
          deep: {
            why: "React Router بيتعامل مع [[/dashboard]] في المتصفح. بس الريفريش أو اللينك المباشر بيطلبه من Nginx، اللي مش لاقي ملف بالاسم ده. 404 على كل صفحة غير الرئيسية أشهر مشكلة في نشر SPAs.",
            how: R`الحل في آخر عنصر في [[try_files]]: [[/index.html]] بدل [[=404]]. يعني: لو مفيش ملف ولا فولدر بالمسار، قدّم index.html. المتصفح بيحمّله، و JavaScript بيقرا الـ URL ويعرض الصفحة الصح.

بس ده لازم يبقى للمسارات اللي مش ملفات بس. ملف JS مش موجود المفروض يرجع 404 مش index.html (وإلا المتصفح يحاول ينفّذ HTML كـ JavaScript ويطلع «Unexpected token <»، نفس الـ error اللي في تاب المتصفح). عشان كده [[$uri]] الأول: الملفات الموجودة بتتقدم، والباقي index.html.

[[location /api/]] قبلها بيوجّه الـ API للتطبيق، فطلب [[/api/users]] مش بيوصل لـ try_files. الترتيب مش مهم هنا لأن [[/api/]] بادئة أطول من [[/]] (شرح location matching).

الفرق بين [[proxy_pass http://127.0.0.1:3000;]] و [[proxy_pass http://127.0.0.1:3000/;]] (بشرطة في الآخر): من غيرها المسار بيتبعت كامل [[/api/users]]، ومعاها بيتشال جزء الـ location ويبقى [[/users]]. اختار حسب التطبيق.

Next.js مش SPA بالمعنى ده (فيه سيرفر)، بتعمله proxy عادي. Vite و CRA و Vue CLI هم اللي محتاجين ده.`,
            when: "أي React أو Vue أو Angular مبني static.",
            mistakes: "[[try_files $uri /index.html]] من غير [[$uri/]] فمسار فولدر يرجع index الرئيسي. وكاش index.html طويل فالمستخدمين يفضلوا على نسخة قديمة بتشاور على JS اتمسح."
          },
          teach: R`## الفكرة: أي مسار مش ملف، رجّع index.html

تطبيق React أو Vue بعد [[npm run build]] بيبقى فولدر فيه [[index.html]] وفولدر [[assets/]] فيه JS و CSS. صفحات زي [[/dashboard]] مش ملفات: JavaScript هو اللي بيرسمها بعد ما الصفحة تحمّل. فالمطلوب من Nginx: قدّم الملفات الموجودة، وأي حاجة تانية رجّع فيها index.html.

جربته على أوبونتو 24.04 جوه Docker. التطبيق في التجربة كان كونتينر تاني اسمه [[ngx01-be]] على بورت 3000، فكتبت [[proxy_pass http://ngx01-be:3000;]] بدل [[127.0.0.1:3000]]، وده الفرق الوحيد.

~~~text /etc/nginx/sites-available/app
server {
    listen 80;
    server_name app.example.com;
    root /var/www/app/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:3000;
    }
}
~~~

[[listen]] و [[server_name]] و [[root]] و [[index]] نفس درس الموقع الـ static. [[root]] هنا فولدر الـ build ([[dist]] في Vite، و [[build]] في Create React App).

---

## ١. [[try_files $uri $uri/ /index.html;]]

نفس سطر الموقع الـ static بالظبط، الفرق في آخر خيار: بدل [[=404]] بقى [[/index.html]]. يعني لو مفيش ملف ولا فولدر بالاسم، Nginx بيقدّم [[/index.html]] (من نفس الـ root) والـ status بيفضل [[200]].

ده اللي طلع لما طلبت كل مسار بـ [[curl -s -w "%{http_code} %{content_type}"]] ([[-w]] بيطبع معلومات عن الرد بعده: الكود والنوع):

| الطلب | الكود والنوع | المحتوى |
|---|---|---|
| [[/]] | [[200 text/html]] | index.html |
| [[/dashboard]] | [[200 text/html]] | index.html |
| [[/users/42]] | [[200 text/html]] | index.html |
| [[/assets/app.js]] | [[200 application/javascript]] | الملف الحقيقي |
| [[/assets/missing.js]] | [[200 text/html]] | index.html (!) |
| [[/api/users]] | [[200 application/json]] | رد التطبيق |

ولما رجّعت آخر خيار [[=404]]، [[/dashboard]] طلع [[404]]: ده بالظبط اللي بيحصل للناس لما يرفعوا React من غير السطر ده ويعملوا ريفريش.

### خد بالك من سطر [[/assets/missing.js]]

ملف JS مش موجود رجع HTML بـ 200. المتصفح هيحاول ينفّذ HTML كأنه JavaScript ويطلع [[Unexpected token '<']]. عشان كده درس [[location ^~ /downloads/]] بيعمل بلوك منفصل للفولدرات اللي لازم ترجع 404 حقيقي.

---

## ٢. [[location /api/ { proxy_pass ...; }]]

أي طلب أوله [[/api/]] بيروح للتطبيق بدل الملفات. **proxy_pass** = «ابعت الطلب ده لسيرفر تاني وهات رده للزائر». و [[/api/]] بيكسب على [[/]] لأنه بادئة أطول (درس location matching)، فطلبات الـ API مش بتوصل لـ try_files أصلًا.

### الشرطة في آخر proxy_pass

التطبيق في التجربة بيرجع المسار اللي وصله، فقارنت:

| السطر | [[/api/users]] وصل للتطبيق كـ |
|---|---|
| [[proxy_pass http://ngx01-be:3000;]] | [[/api/users]] (كامل) |
| [[proxy_pass http://ngx01-be:3000/;]] | [[/users]] (اتشال [[/api/]]) |

القاعدة: لو بعد البورت فيه مسار (حتى لو [[/]] بس)، Nginx بيشيل جزء الـ location ويحط المسار ده مكانه. اختار حسب التطبيق: Express عامل routes بـ [[/api/...]]؟ من غير شرطة.

### حاجة لاحظتها في رد التطبيق

التطبيق شاف [[host: "ngx01-be:3000"]] و [[connection: "close"]]: [[proxy_pass]] لوحده مش بيبعت الدومين الأصلي ولا بيسيب الاتصال مفتوح. ده اللي درس reverse proxy بعمق بيصلّحه.

---

## الخلاصة

| السطر | ليه |
|---|---|
| [[try_files $uri ...]] | الملفات الحقيقية (JS و CSS والصور) تتقدم زي ما هي |
| [[... /index.html]] | أي مسار تاني يفتح التطبيق، و React Router يكمّل |
| [[location /api/]] | الـ API يروح للتطبيق بدل index.html |`,
          lines: [
            "بداية.",
            "http.",
            "الدومين.",
            "ناتج الـ build.",
            "الملف الافتراضي.",
            "كل الطلبات.",
            "الملف لو موجود، وإلا فولدر، وإلا index.html (وJavaScript يتصرف).",
            "قفلة.",
            "مسارات الـ API.",
            "للتطبيق.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[app.example.com/dashboard]] مباشرة بيفتح التطبيق بدل 404، و [[curl -s -o /dev/null -w "%{http_code}" -H "Host: app.example.com" http://127.0.0.1/dashboard]] بيطبع [[200]] والمحتوى هو [[index.html]]. الـ router في React هو اللي بيقرا [[/dashboard]] ويعرض الصفحة.

ده شغل [[try_files $uri $uri/ /index.html]]: مفيش ملف اسمه dashboard، فـ Nginx بيرجع index.html. ومن غير السطر ده بيرجع [[404 Not Found]] من Nginx نفسه.

الغلط الشائع: [[/api/users]] كمان بيرجع HTML بدل JSON، يعني بلوك [[/api/]] مش شغال أو مكتوب بعد حاجة بتاخده. أو ملف JS مش موجود بيرجع HTML بـ 200، فالمتصفح يطلع [[Unexpected token '<']]. عشان كده ملفات [[/assets/]] الأحسن ترجع 404 حقيقي.`
        },
        {
          cmd: "reverse proxy بعمق",
          title: "upstream و keepalive و headers",
          desc: "الشكل الكامل للـ proxy: [[upstream]] بيسمّي الباك إند ويسمح بأكتر من سيرفر و keepalive. والـ headers بتوصّل للتطبيق IP الزائر الحقيقي والبروتوكول، وإلا كل الطلبات هتبان من 127.0.0.1.",
          example: R`upstream api {
    server 127.0.0.1:3000;
    keepalive 32;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://api;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}`,
          try: "في Express حط [[app.set('trust proxy', 1)]] وبعدين [[req.ip]] هيطلع IP الزائر بدل 127.0.0.1.",
          flag: "script",
          deep: {
            why: "الشكل البسيط في تاب VPS شغال. الشكل ده بيضيف أداء (keepalive)، وبيخلي التطبيق يعرف الزائر الحقيقي، وبيمهّد لأكتر من سيرفر.",
            how: R`[[upstream api]] بيعرّف مجموعة سيرفرات باسم. سطر [[server]] لكل واحد. لو أكتر من واحد، Nginx بيوزّع عليهم (round-robin افتراضيًا). [[keepalive 32]] بيحتفظ بـ ٣٢ اتصال مفتوح للتطبيق ويعيد استخدامهم بدل ما يفتح اتصال TCP لكل طلب: أسرع بوضوح تحت الضغط.

الـ keepalive محتاج [[proxy_http_version 1.1]] و [[proxy_set_header Connection ""]] (فاضي)، وإلا Nginx بيبعت Connection: close ويقفل كل مرة.

الـ headers: [[Host $host]] الدومين اللي الزائر كتبه (التطبيق محتاجه لروابط كاملة). [[X-Real-IP]] و [[X-Forwarded-For]] IP الزائر (من غيرهم req.ip دايمًا 127.0.0.1، فالـ rate limiting واللوج في التطبيق بيبقوا مالهمش معنى). [[X-Forwarded-Proto]] http ولا https (التطبيق محتاجه لـ secure cookies والتحويلات).

والتطبيق لازم يثق في الـ headers دي: Express [[trust proxy]]، Next.js بيقراها لوحده، Django [[SECURE_PROXY_SSL_HEADER]].

[[proxy_pass http://api]] بالاسم بدل العنوان.`,
            when: "كل تطبيق ورا Nginx. الـ keepalive لما يبقى فيه ضغط.",
            mistakes: R`trust proxy على Express من غير Nginx قدامه فأي حد يزوّر IP. ونسيان Connection "" فالـ keepalive مبيشتغلش.`
          },
          teach: R`## الفكرة: Nginx واقف في النص، فلازم يحكي للتطبيق مين اللي جاي

في الـ reverse proxy الزائر بيكلّم Nginx، و Nginx بيفتح طلب **جديد** للتطبيق. فالتطبيق من غير مساعدة شايف إن كل الطلبات جاية من Nginx نفسه. المثال بيحل ده بـ headers، وبيوفّر وقت بإنه يسيب الاتصالات بالتطبيق مفتوحة.

### إزاي اتجرّب

أوبونتو 24.04 جوه Docker فيه Nginx، وكونتينر تاني [[ngx01-be]] فيه سيرفر Node صغير على 3000 بيرجّع JSON فيه الـ headers اللي وصلته ورقم البورت اللي الاتصال جاي منه. فالسطر الوحيد اللي اتغيّر: [[server ngx01-be:3000;]] بدل [[127.0.0.1:3000]].

~~~text /etc/nginx/sites-available/api
upstream api {
    server 127.0.0.1:3000;
    keepalive 32;
}

server {
    listen 80;
    server_name api.example.com;

    location / {
        proxy_pass http://api;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
~~~

---

## ١. بلوك [[upstream api { }]]

**upstream** = اسم لمجموعة سيرفرات التطبيق. بيتكتب بره [[server]] (جوه http).

- [[server 127.0.0.1:3000;]]: عنوان نسخة من التطبيق. لو كتبت سطرين، Nginx بيوزّع الطلبات عليهم بالدور (round-robin).
- [[keepalive 32;]]: سيب لحد ٣٢ اتصال فاضي مفتوحين مع التطبيق (لكل worker)، واستخدمهم تاني بدل ما تفتح اتصال TCP جديد كل طلب.

و [[proxy_pass http://api;]] بيستخدم الاسم ده بدل العنوان.

## ٢. الـ keepalive محتاج سطرين معاه

- [[proxy_http_version 1.1;]]: Nginx افتراضيًا بيكلّم التطبيق بـ HTTP/1.0، اللي بيقفل الاتصال بعد كل طلب. 1.1 بيسمح يفضل مفتوح.
- [[proxy_set_header Connection "";]]: [[proxy_set_header]] بيحط header في الطلب اللي رايح للتطبيق. هنا بيفضّي [[Connection]]، لأن Nginx لوحده بيبعت [[Connection: close]].

### اتأكدت إزاي إن الاتصال بيتعاد؟

شغّلت Nginx بـ worker واحد (عشان كل الطلبات تعدي من نفس الـ worker)، وبعت ٥ طلبات، وبصيت على البورت اللي التطبيق شايف الاتصال جاي منه:

| | البورتات في الـ ٥ طلبات |
|---|---|
| بالسطرين | [[48934]] خمس مرات: اتصال واحد اتعاد |
| من غيرهم | [[48938]] و [[48952]] و [[48968]] و [[48970]] و [[48974]]: اتصال جديد كل مرة، والتطبيق شاف [[connection: "close"]] |

---

## ٣. الـ headers الأربعة

### [[Host $host]]

[[$host]] الدومين اللي الزائر طلبه. من غير السطر ده، التطبيق بيشوف اسم الـ upstream. جربت [[proxy_pass]] لوحده والتطبيق شاف [[host: "ngx01-be:3000"]]. ومعاه شاف [[host: "api.example.com"]]. التطبيق محتاجه لما يبني روابط كاملة أو يفرّق بين دومينات.

### [[X-Real-IP $remote_addr]]

[[$remote_addr]] الـ IP اللي فاتح الاتصال مع Nginx، يعني الزائر. بنبعته في header اسمه [[X-Real-IP]].

### [[X-Forwarded-For $proxy_add_x_forwarded_for]]

نفس الفكرة بالـ header القياسي. [[$proxy_add_x_forwarded_for]] = قيمة [[X-Forwarded-For]] اللي جت مع الطلب (لو فيه) + فاصلة + [[$remote_addr]]. يعني بيضيف على القايمة. جربت أبعت [[X-Forwarded-For: 1.2.3.4]] بإيدي، والتطبيق استلم:

~~~text الناتج
"xff":"1.2.3.4, 127.0.0.1"
~~~

اللي على اليمين بس هو اللي Nginx شافه بنفسه. اللي على الشمال الزائر كتبه، وممكن يكون مزوّر. وده سبب الرقم [[1]] في Express تحت.

### [[X-Forwarded-Proto $scheme]]

[[$scheme]] = [[http]] أو [[https]] حسب ما الزائر جه بيه. التطبيق نفسه دايمًا بيستقبل http من Nginx، فده الطريق الوحيد إنه يعرف إن الزائر كان على https (للـ cookies الـ secure والتحويلات).

### كل الحاجات مع بعض في رد التطبيق

~~~text الناتج (مختصر)
{"url":"/users","host":"api.example.com","xri":"127.0.0.1","xff":"127.0.0.1","proto":"http","conn":null}
~~~

[[127.0.0.1]] هنا لأن curl كان شغال جوه كونتينر Nginx نفسه. على سيرفر حقيقي هتلاقي IP الزائر.

---

## ٤. الـ solCode: Express يصدّق الـ headers

~~~text server.js
const express = require("express");
const app = express();
app.set("trust proxy", 1);
app.get("/ip", (req, res) => res.json({ ip: req.ip, protocol: req.protocol }));
app.listen(3000);
~~~

| السطر | معناه |
|---|---|
| [[require("express")]] و [[express()]] | حمّل Express واعمل تطبيق |
| [[app.set("trust proxy", 1)]] | صدّق proxy **واحد** قدامي: خد آخر IP في [[X-Forwarded-For]] |
| [[app.get("/ip", ...)]] | لما حد يطلب [[/ip]]، رد بـ JSON |
| [[req.ip]] و [[req.protocol]] | IP الزائر والبروتوكول، بعد ما Express يقرا الـ headers |
| [[app.listen(3000)]] | اسمع على 3000 |

شغّلته ورا Nginx وطلبت من كونتينر تالت IP بتاعه [[172.18.0.3]]:

| | [[req.ip]] |
|---|---|
| من غير [[trust proxy]] | [[::ffff:172.18.0.2]] (ده Nginx) |
| مع [[trust proxy 1]] | [[172.18.0.3]] (الزائر الحقيقي) |
| مع [[trust proxy 1]] والزائر باعت [[X-Forwarded-For: 6.6.6.6]] | لسه الحقيقي، لأن Express بياخد آخر واحد بس |

([[::ffff:]] قدام الـ IP معناها IPv4 مكتوب بصيغة IPv6، ونفس العنوان.)

---

## الخلاصة

| الجزء | من غيره |
|---|---|
| [[upstream]] و [[keepalive]] | اتصال TCP جديد لكل طلب |
| [[proxy_http_version 1.1]] و [[Connection ""]] | الـ keepalive مبيشتغلش |
| [[Host]] | التطبيق شايف اسم الـ upstream |
| [[X-Real-IP]] و [[X-Forwarded-For]] | كل الزوار IP واحد |
| [[X-Forwarded-Proto]] | التطبيق فاكر كله http |
| [[trust proxy 1]] | Express بيتجاهل الـ headers دي |`,
          lines: [
            "مجموعة سيرفرات باسم api.",
            "التطبيق.",
            "احتفظ بـ ٣٢ اتصال مفتوح للتطبيق.",
            "قفلة.",
            "بداية الموقع.",
            "http.",
            "الدومين.",
            "كل الطلبات.",
            "للمجموعة بالاسم.",
            "لازمة للـ keepalive.",
            "Connection فاضي عشان الاتصال يفضل مفتوح.",
            "الدومين اللي الزائر كتبه.",
            "IP الزائر الحقيقي.",
            "نفسه بالشكل القياسي (بيتراكم لو فيه proxies).",
            "http ولا https.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`من غير [[trust proxy]]: [[req.ip]] بيطلع [[127.0.0.1]] (أو [[::ffff:127.0.0.1]]) لكل الزوار، لأن اللي بيكلّم Express فعلًا هو Nginx. ومعاه: [[req.ip]] بيطلع IP الزائر الحقيقي من [[X-Forwarded-For]]، و [[req.protocol]] بيطلع [[https]] لو [[X-Forwarded-Proto]] بيقول كده.

جربتها بسيرفرين Express ورا Nginx: الطلب من [[127.0.0.2]] ظهر [[127.0.0.1]] في اللي من غير trust proxy، و [[127.0.0.2]] في اللي معاه.

الغلط الشائع: [[app.set('trust proxy', true)]] بدل 1، فأي زائر يقدر يبعت [[X-Forwarded-For]] مزوّر ويغيّر IP بتاعه (ويعدّي rate limit). والرقم 1 معناه «ثق في proxy واحد قدامي». ولو نسيت [[proxy_set_header Host $host]] التطبيق هيشوف Host بـ [[127.0.0.1:3000]] (جربتها) والروابط اللي بيولّدها تبوظ.`,
          solCode: R`const express = require("express");
const app = express();
app.set("trust proxy", 1);
app.get("/ip", (req, res) => res.json({ ip: req.ip, protocol: req.protocol }));
app.listen(3000);`
        },
        {
          cmd: "الأوامر",
          title: "test و reload و signals",
          desc: "[[-t]] اختبار، و [[-T]] اختبار وطباعة كل الإعدادات، و [[reload]] قراية جديدة من غير قطع، و [[-s reopen]] بعد لف اللوجات. و [[-V]] بيوريك النسخة والـ modules المبنية (مهم لـ brotli و http3).",
          example: R`sudo nginx -t
sudo nginx -T > /tmp/nginx-full.conf
sudo systemctl reload nginx
sudo nginx -s reopen
nginx -V 2>&1 | tr ' ' '\n' | grep -E "version|with-http_v2|with-http_v3|brotli"
sudo tail -F /var/log/nginx/access.log`,
          try: "قارن [[reload]] بـ [[restart]] وانت عامل [[curl]] في لوب: reload مفيش أي طلب فاشل.",
          deep: {
            why: "٥ أوامر بتتعامل بيهم مع Nginx كل مرة، وواحد فيهم (reload) هو الفرق بين تحديث سلس وموقع بيقع ثانية.",
            how: R`[[nginx -t]]: يقرا الإعدادات كلها ويتأكد من الصيغة والملفات المشار إليها. مش بيغيّر حاجة. لو قال ok، الـ reload آمن.

[[nginx -T]]: نفسه وبيطبع الإعدادات النهائية بعد كل الـ includes. احفظه في ملف لما تشخّص أو تبعت لحد.

[[systemctl reload nginx]] أو [[nginx -s reload]]: workers جداد بالإعدادات الجديدة، والقدام بيخلصوا اللي في إيدهم. لو الإعدادات فيها غلطة، reload بيفشل والقديم يفضل شغال (عكس restart اللي ممكن يسيبك من غير Nginx).

[[nginx -s reopen]]: بعد لف اللوجات (logrotate بيعمله لوحده). Nginx بيفضل كاتب في الملف القديم لحد ما يتقاله يفتح الجديد.

[[nginx -V]]: النسخة وكل الـ modules والـ flags اللي اتبنى بيها. [[with-http_v2_module]] و [[http_v3]] و brotli لو موجودين. الناتج على stderr عشان كده [[2>&1]].

[[tail -F]] (كابيتال) بيتابع اللوج حتى بعد ما يتلف.`,
            when: "t قبل كل reload. T للتشخيص. V قبل ما تعتمد على module.",
            mistakes: "restart بدل reload. و -t بيستخدم صلاحيات اليوزر فممكن يقول ok وفيه ملف Nginx نفسه مش قادر يقراه (شهادة بصلاحيات غلط)."
          },
          teach: R`## الفكرة: ٦ أوامر، كل واحد ليه وقت

كلها اتجربت على أوبونتو 24.04 جوه Docker (Nginx 1.24.0). الكونتينر مفيهوش systemd، فـ [[systemctl reload nginx]] اتجرب بمعادله [[nginx -s reload]]، و restart اتجرب بـ [[nginx -s stop]] وبعده [[nginx]].

---

## ١. [[sudo nginx -t]]

[[-t]] (test): اقرا الإعدادات وافحصها ومتغيّرش حاجة. لما تكون سليمة:

~~~text الناتج
nginx: the configuration file /etc/nginx/nginx.conf syntax is ok
nginx: configuration file /etc/nginx/nginx.conf test is successful
~~~

وهو مش بيفحص الصيغة بس. لما مسحت كونتينر التطبيق اللي ملف الموقع بيشاور عليه بالاسم، نفس الأمر قال:

~~~text الناتج
[emerg] host not found in upstream "ngx01-ex" in /etc/nginx/sites-enabled/api:5
nginx: configuration file /etc/nginx/nginx.conf test failed
~~~

يعني بيحاول يحل الأسامي كمان، وبيقولك الملف والسطر ([[api:5]]).

---

## ٢. [[sudo nginx -T > /tmp/nginx-full.conf]]

[[-T]]: الاختبار + طباعة كل الإعدادات بعد الـ includes. و [[>]] بيحوّل الطباعة لملف بدل الشاشة. الملف طلع 330 سطر، وفيه علامة قبل كل ملف اتسحب:

~~~text grep "^# configuration file" /tmp/nginx-full.conf
# configuration file /etc/nginx/nginx.conf:
# configuration file /etc/nginx/mime.types:
# configuration file /etc/nginx/sites-enabled/api:
# configuration file /etc/nginx/sites-enabled/app:
# configuration file /etc/nginx/sites-enabled/default:
# configuration file /etc/nginx/sites-enabled/example.com:
~~~

ملف واحد تقدر تفتحه أو تبعته لحد يساعدك. خد بالك إن سطرين «syntax is ok» مش بيروحوا الملف: دول بيتطبعوا على stderr، و [[>]] بيحوّل stdout بس.

---

## ٣. [[sudo systemctl reload nginx]]

الـ master بيقرا الإعدادات من الأول. لو سليمة: workers جداد، والقدام بيكمّلوا الطلبات اللي في إيدهم ويقفلوا. لو فيها غلطة: الـ reload بيفشل والإعدادات القديمة تفضل شغالة:

~~~text reload بملف ناقص ;
[emerg] unexpected "}" in /etc/nginx/sites-enabled/bad:1
~~~

### reload ضد restart

شغّلت curl في لوب (٤٠ طلب، كل واحد بعد التاني بـ 0.05 ثانية)، وفي النص مرة reload ومرة stop و start:

~~~text reload
200 200 200 200 200 200 200 200 200 200 ... 200   (الـ ٤٠ كلهم 200)
~~~

~~~text stop ثم start
200 200 200 200 200 200 200 200 000 000 000 000 000 000 000 000 000 000 000 000 000 000 000 000 000 200 200 ...
~~~

[[000]] معناها curl ماوصلش لأي رد (الاتصال اترفض). ١٧ طلب ضاعوا في الثانية اللي Nginx كان واقف فيها.

---

## ٤. [[sudo nginx -s reopen]]

[[-s]] (signal) بيبعت أمر لـ Nginx الشغال، و [[reopen]]: اقفل ملفات اللوج وافتحها من جديد. ليه؟ جربت أعمل اللي logrotate بيعمله، أغيّر اسم اللوج:

~~~bash
mv access.log access.log.1
curl -s -o /dev/null http://127.0.0.1/
ls
~~~

~~~text الناتج
access.log.1
error.log
~~~

مفيش [[access.log]] جديد! Nginx ماسك الملف نفسه مش اسمه، فكمّل يكتب في [[access.log.1]]. بعد [[nginx -s reopen]] وطلب كمان:

~~~text الناتج
-rw-r--r-- 1 www-data root   85 ... access.log
-rw-r--r-- 1 www-data root 5610 ... access.log.1
~~~

ملف جديد فيه سطر واحد (85 byte). على السيرفر logrotate بيعمل الخطوة دي لوحده بعد اللف.

---

## ٥. [[nginx -V 2>&1 | tr ' ' '\n' | grep -E "..."]]

نفكّه حتة حتة:

| الحتة | بتعمل إيه |
|---|---|
| [[nginx -V]] | الكابيتال: النسخة + كل الخيارات اللي Nginx اتبنى بيها (سطر طويل جدًا) |
| [[2>&1]] | [[-V]] بيطبع على stderr (القناة 2)، و ده بيوديها لـ stdout (القناة 1) عشان الـ pipe ياخدها |
| [[tr ' ' '\n']] | [[tr]] (translate) بيبدّل كل مسافة بسطر جديد، فكل خيار يبقى في سطر لوحده |
| [[grep -E "version|...|brotli"]] | سيب السطور اللي فيها الكلمات دي بس |

النتيجة على صورتين مختلفتين:

| | أوبونتو 24.04 | [[nginx:alpine]] |
|---|---|---|
| النسخة | 1.24.0 | 1.31.6 |
| [[--with-http_v2_module]] | موجود | موجود |
| [[--with-http_v3_module]] | مش موجود | موجود |
| brotli | مش موجود | مش موجود |

ملحوظة: سطر [[version]] بيطلع [[version:]] لوحده، لأن [[tr]] قسم [[nginx version: nginx/1.24.0]] على المسافات والرقم بقى في سطر لوحده. لو عايز النسخة بس: [[nginx -v]] (صغيرة).

---

## ٦. [[sudo tail -F /var/log/nginx/access.log]]

[[-F]] الكابيتال = [[-f]] (تابع السطور الجديدة) + لو الملف اتشال واتعمل واحد جديد بنفس الاسم، افتحه. فبعد اللف اللي فوق، [[-f]] كان هيفضل باصص على [[access.log.1]] القديم، و [[-F]] بيكمّل مع الجديد. وده سطر من اللوج:

~~~text access.log
127.0.0.1 - - [06/Oct/2026:12:43:19 +0000] "GET / HTTP/1.1" 200 615 "-" "curl/8.5.0"
~~~

IP الزائر، والوقت، والطلب، والـ status ([[200]])، وحجم الرد ([[615]] byte)، والـ referrer ([[-]] يعني مفيش)، والبرنامج اللي طلب.

---

## الخلاصة

| الأمر | امتى |
|---|---|
| [[nginx -t]] | قبل كل reload |
| [[nginx -T > file]] | لما تشخّص أو تبعت الإعدادات لحد |
| [[systemctl reload nginx]] | تطبيق التعديل، من غير قطع |
| [[nginx -s reopen]] | بعد لف اللوجات |
| [[nginx -V]] | قبل ما تعتمد على module (http3، brotli) |
| [[tail -F]] | متابعة لوج بيتلف |`,
          lines: [
            "اختبر.",
            "الإعدادات الكاملة في ملف (للتشخيص).",
            "طبّق من غير قطع.",
            "افتح ملفات اللوج من جديد (بعد لفّها).",
            "النسخة والـ modules: HTTP/2 و 3 و brotli موجودين؟",
            "تابع اللوج حتى لو اتلف."
          ],
          sol: R`مع [[reload]] وسط لوب curl: كل الطلبات بترجع [[200]]. جربتها بـ 60 طلب وكلهم 200. ده لأن reload بيشغّل workers جديدة بالإعداد الجديد، والقديمة بتكمل الطلبات اللي معاها وبعدين تقفل.

مع [[restart]] (أو stop وبعدين start) هتلاقي شوية طلبات فاشلة: curl بيطبع [[000]] ([[Connection refused]]). عندي 17 من 60 فشلوا في الثانية اللي Nginx كان واقف فيها.

الغلط الشائع: [[reload]] بإعداد فيه غلطة: الـ reload بيفشل و Nginx يفضل شغال بالقديم، فتفتكر التعديل اتطبق وهو لأ. عشان كده دايمًا [[nginx -t && systemctl reload nginx]]. و [[restart]] بإعداد غلط أخطر: Nginx مايقومش خالص.`,
          solCode: R`while true; do curl -s -o /dev/null -w "%{http_code} " http://127.0.0.1/; sleep 0.1; done
# في ترمنال تاني:
sudo nginx -t && sudo systemctl reload nginx
sudo systemctl restart nginx`
        }
      ]
    }
  ]
});

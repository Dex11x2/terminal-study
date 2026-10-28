// تكملة تاب docker: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/docker/01.js (شرح حقول الدرس في أوله)
MORE("docker", [
    {
      t: "كذا موقع على سيرفر واحد",
      l: 3,
      time: R`حوالي ٣ ساعات`,
      goal: [
        R`تحط nginx واحد قدام كذا موقع، كل موقع بدومينه، وموقع واقع مايوقعش الباقي.`,
        R`تخلي مشروعين منفصلين يتكلموا على شبكة واحدة، من غير ما واحد فيهم يملكها.`,
        R`تعرف ليه اسم خدمة عادي زي [[app]] ممكن يبعت زوار موقع لموقع تاني.`,
        R`تفتح البورت للي محتاجه بس، وتفرّق بين اللي بيتحط في الصورة وقت البناء واللي بيتقري وقت التشغيل.`,
        R`تخلي الباك إند يستنى الداتابيز لحد ما تبقى جاهزة فعلًا.`,
      ],
      use: {
        prog: R`أي مشروع بيكبر بيبقى فيه أكتر من كونتينر: موقع، وAPI، وداتابيز، وproxy قدامهم. والدروس دي هي الأخطاء اللي بتحصل في التوصيل بينهم.`,
        net: R`ده النيتورك بتاع الويب في أصغر صورة: DNS داخلي، وreverse proxy بيوزّع بالـ Host، وبورتات بتتربط على واجهات معينة. نفس المفاهيم اللي في تاب الشبكات، بس بتجربها في دقيقة.`,
        cs: R`الـ Host header هو اللي بيخلي IP واحد يخدم ألف دومين (virtual hosting). والـ DNS اللي بيرجّع أكتر من عنوان لنفس الاسم هو أبسط load balancing — وهو نفسه اللي بيعمل الباج في درس ٣.`,
        work: R`السيرفر الواحد اللي عليه كذا مشروع هو الوضع الطبيعي في الشغل الصغير والمتوسط. والمواقف دي حصلت فعلًا في مشاريع حقيقية — الدروس مبنية عليها بأسماء متألفة.`,
      },
      lab: R`mkdir -p ~/lab/sites/shop/edge ~/lab/sites/blog && cd ~/lab/sites`,
      projects: [
        { t: R`سيرفرك على جهازك`, what: R`ابني المعمل كامل: [[shop]] و [[blog]] ورا [[edge]] واحد، والشبكة معمولة لوحدها. وضيف موقع تالت من فولدر تالت من غير ما تعمل restart لـ nginx. من درس ١ و ٢ و ٤.` },
        { t: R`اكسر وصلّح`, what: R`سمّي خدمتين في مشروعين مختلفين نفس الاسم، وابعت ٢٠ طلب وعدّ كام واحد راح غلط. وبعدين صلّحها بطريقتين: اسم مميز، و [[aliases]] صريحة. من درس ٣.` },
        { t: R`راجع compose بتاعك`, what: R`افتح أي [[compose.yml]] عندك وحط علامة على كل [[ports:]] من غير [[127.0.0.1]]. لكل واحد اسأل: «مين المفروض يوصل هنا من بره؟». من درس ٥.` },
        { t: R`فرّق البناء عن التشغيل`, what: R`في مشروع فرونت إند عندك، اعرف أنهي متغيرات بتتحط في الـ bundle وقت البناء. غيّر واحد في [[.env]] من غير build وشوف بنفسك إنه ما اتغيّرش. من درس ٦.` },
      ],
      n: R`الدروس دي مبنية على مواقف حصلت فعلًا في مشاريع حقيقية — بس بأسماء متألفة: [[shop]] و [[blog]] و [[edge]]. وكل أمر فيها اتشغّل على Docker 29.6 والناتج منسوخ من التشغيل، بما فيه الأخطاء`,
      items: [
        {
          cmd: "nginx واحد قدام موقعين",
          title: "موقع مش موجود وقّع الاتنين",
          learn: R`توزّع الطلبات على مواقع مختلفة بالـ Host، وتخلي nginx يدوّر على الاسم وقت الطلب.`,
          out: R`موقع واقف بيرجّع 502 لوحده، والباقي شغال.`,
          use: {
            net: R`[[server_name]] بيختار الكتلة من الـ Host اللي في الطلب. فـ IP واحد وبورت واحد بيخدموا كذا دومين.`,
            prog: R`الإعداد الشائع ([[proxy_pass http://blog:3000]]) بيخلي nginx يدوّر على الاسم **مرة واحدة** وهو بيقوم. ولو الاسم مش موجود ساعتها، nginx مبيقومش خالص.`,
            work: R`«ضفت موقع جديد، والقديم وقع» — ده سببها في أغلب المرات.`,
          },
          desc: R`عندك موقعين، [[shop]] و [[blog]]، وعايزهم على نفس السيرفر وورا nginx واحد. كل واحد على دومين.

**nginx بيفرّق بينهم بالـ Host.** المتصفح بيبعت في كل طلب اسم الدومين اللي طالبه، و [[server_name]] بيختار الكتلة المناسبة. فالسيرفر واحد، والبورت واحد، والمواقع كتير.

**والمفاجأة:** شغّلت مشروع [[shop]] الأول، و [[blog]] لسه ماقامش. فـ nginx **رفض يقوم خالص**:

[[nginx: [emerg] host not found in upstream "blog"]]

يعني [[shop]] كمان بقى واقع — بسبب موقع تاني لسه ماتعملش.

**ولاحظ:** [[docker compose ps]] قال [[running]] في الأول، وبعد ٣ ثواني بقى [[Exited (1)]]. فـ «Started» في الـ compose مش معناها «شغّال».

**السبب:** لما تكتب [[proxy_pass http://blog:3000;]]، nginx بيدوّر على [[blog]] في الـ DNS **وهو بيقوم**، مرة واحدة. ولو ملقاهوش، بيرفض الإعداد كله.

**الإصلاح سطرين:**

[[resolver 127.0.0.11 valid=10s ipv6=off;]] — ده الـ DNS الداخلي بتاع Docker.

و [[set $up http://blog:3000; proxy_pass $up;]] — لما الـ proxy_pass يبقى متغير، nginx بيدوّر على الاسم **وقت الطلب**.

**بعد الإصلاح:**

| الطلب | النتيجة |
|---|---|
| [[shop.localhost]] | [[shop]] رد |
| [[blog.localhost]] | **502** — والـ log: [[blog could not be resolved]] |

موقع واحد واقف، والتاني شغّال. ولما [[blog]] قام بعدها، اشتغل **من غير restart لـ nginx**.`,
          example: R`# shop/edge/sites.conf — nginx واحد قدام موقعين
# resolver = الـ DNS الداخلي بتاع Docker. ومع متغير في proxy_pass،
# nginx بيدوّر على الاسم وقت الطلب، مش وقت ما بيقوم.
resolver 127.0.0.11 valid=10s ipv6=off;

server {
    listen 80;
    server_name shop.localhost;
    location / { set $up http://shop:3000; proxy_pass $up; proxy_set_header Host $host; }
}

server {
    listen 80;
    server_name blog.localhost;
    location / { set $up http://blog:3000; proxy_pass $up; proxy_set_header Host $host; }
}`,
          lines: [
            R`[[127.0.0.11]] عنوان ثابت للـ DNS جوه أي شبكة Docker معمولة بإيدك. و [[valid=10s]] يعني الإجابة تتنسي بعد ١٠ ثواني.`,
            R`كتلة للموقع الأول.`,
            R`بيسمع على 80 **جوه الكونتينر**. والربط بالجهاز في الـ compose.`,
            R`[[server_name]]: الكتلة دي للطلبات اللي الـ Host بتاعها [[shop.localhost]].`,
            R`**المتغير هو الإصلاح.** و [[proxy_set_header Host $host]] بيعدّي الدومين الأصلي للموقع.`,
            R`قفلة.`,
            R`كتلة الموقع التاني.`,
            R`نفس البورت — والفرق كله في الـ Host.`,
            R`[[blog.localhost]].`,
            R`[[blog]] هنا اسم الخدمة في مشروع تاني. ولو مش موجود، الطلب ده بس اللي بيرجّع 502.`,
            R`قفلة.`,
          ],
          try: R`شغّل [[shop]] لوحده بالإعداد القديم ([[proxy_pass http://blog:3000;]] من غير متغير)، وشوف [[docker compose logs edge]]. وبعدين حط الـ resolver والمتغير، وابعت [[curl -H "Host: blog.localhost" http://127.0.0.1:8080/]] قبل وبعد ما [[blog]] يقوم.`,
          mac: ["both", R`نفس الحاجة. وفي curl، [[*.localhost]] بتروح للجهاز نفسه، بس [[-H "Host: ..."]] بتشتغل في كل الحالات حتى لو الدومين مش متعرّف.`],
          deep: {
            why: R`nginx بيفضّل يرفض الإعداد كله بدل ما يشتغل نص شغلانة. وده كويس في سيرفر بموقع واحد، ووحش في سيرفر عليه مواقع مستقلة عن بعض.`,
            how: R`**إزاي nginx بيختار الكتلة؟** بيقارن الـ Host اللي في الطلب بالـ [[server_name]] في كل الكتل اللي على نفس البورت. ولو مفيش ولا واحدة مطابقة، بيروح للكتلة **الافتراضية** — اللي هي أول واحدة، أو اللي عليها [[default_server]].

ودي مصيدة تانية: لو حد فتح السيرفر بالـ IP مباشرة، أو بدومين انت مش عامله، هيشوف أول موقع في الملف. فالأحسن كتلة افتراضية صريحة بترفض:

~~~nginx
server {
    listen 80 default_server;
    return 444;      # nginx بيقفل الاتصال من غير رد
}
~~~

**والـ resolver ليه تمن:** الاسم بيتدوّر عليه كل [[valid]] ثانية، و [[proxy_pass]] بمتغير مبيستخدمش [[upstream]] block، فمفيش [[keepalive]] للاتصالات مع الموقع. في موقع صغير الفرق مش محسوس. وفي ضغط عالي، فيه حلول تانية (nginx Plus، أو [[resolve]] في upstream في nginx الأحدث، أو Traefik/Caddy اللي بيعرفوا Docker لوحدهم — شوف درس [[nginx-proxy]] في نفس التاب).

**و [[proxy_set_header Host $host]] مهمة:** من غيرها nginx بيبعت للموقع [[Host: blog:3000]]، والموقع ممكن يبني روابط غلط أو يرفض الطلب. في الاختبار، الموقع رجّع [[host=shop.localhost]] — يعني الدومين الأصلي وصل.

**و [[X-Forwarded-For]]:** الموقع بيشوف الطلب جاي من nginx ([[from=172.18.0.3]] في الاختبار)، مش من الزائر. فلو محتاج IP الزائر، nginx بيبعته في الـ header ده، والموقع لازم **يثق** في الـ header من nginx بس (في Express: [[trust proxy]]).`,
            when: R`أي سيرفر عليه أكتر من موقع ورا proxy واحد، وخصوصًا لو المواقع بتقوم وتقع مستقلة عن بعض.`,
            mistakes: R`[[proxy_pass http://name:port]] ثابتة لمواقع مش دايمًا شغالة. أو تنسى [[proxy_set_header Host]]. أو مفيش [[default_server]] فالـ IP بيفتح أول موقع. أو تصدّق «Started» في compose من غير ما تبص على الـ logs.`
          },
          teach: R`## موقعين، سيرفر واحد، nginx واحد

~~~text
                    ┌──────────── edge-net ────────────┐
المتصفح ── :8080 ──→│ edge (nginx) ──→ shop:3000        │
                    │              └──→ blog:3000        │
                    └──────────────────────────────────┘
~~~

**nginx بيفرّق بينهم بالـ Host.** المتصفح بيبعت في كل طلب اسم الدومين اللي طالبه، و [[server_name]] بيختار الكتلة.

---

## ١. الإعداد الأول — اللي الكل بيكتبه

~~~nginx edge/sites.conf (النسخة الأولى)
server {
    listen 80;
    server_name shop.localhost;
    location / { proxy_pass http://shop:3000; }
}
server {
    listen 80;
    server_name blog.localhost;
    location / { proxy_pass http://blog:3000; }
}
~~~

شغّلت مشروع [[shop]] لوحده — [[blog]] لسه ماقامش:

~~~bash
cd shop && docker compose up -d
docker compose ps -a
~~~

~~~text اتشغّل فعلًا · Docker 29.6
edge  running  Up 3 seconds          <-- في الأول
shop  running  Up 3 seconds

edge  exited   Exited (1) 9 seconds ago   <-- بعد ٣ ثواني
shop  running  Up 14 seconds
~~~

~~~text docker compose logs edge
nginx: [emerg] host not found in upstream "blog" in /etc/nginx/conf.d/default.conf:16
~~~

**nginx ماقامش خالص.** يعني [[shop]] كمان واقع، بسبب موقع **تاني** لسه ماتعملش.

> و«Started» في compose **مش** معناها «شغّال». بص على الـ logs.

---

## ٢. ليه؟

[[proxy_pass http://blog:3000;]] → nginx بيدوّر على [[blog]] في الـ DNS **وهو بيقوم**، مرة واحدة. ملقاهوش؟ بيرفض الإعداد كله.

---

## ٣. الإصلاح: دوّر وقت الطلب

~~~nginx edge/sites.conf
resolver 127.0.0.11 valid=10s ipv6=off;

server {
    listen 80;
    server_name shop.localhost;
    location / { set $up http://shop:3000; proxy_pass $up; proxy_set_header Host $host; }
}
server {
    listen 80;
    server_name blog.localhost;
    location / { set $up http://blog:3000; proxy_pass $up; proxy_set_header Host $host; }
}
~~~

| السطر | بيعمل إيه |
|---|---|
| [[resolver 127.0.0.11]] | الـ DNS الداخلي بتاع Docker |
| [[valid=10s]] | الإجابة تتنسي بعد ١٠ ثواني |
| [[set $up ...; proxy_pass $up;]] | **متغير** = الاسم بيتدوّر عليه وقت الطلب |

~~~bash
docker compose up -d edge
curl -s -H "Host: shop.localhost" http://127.0.0.1:8080/
curl -s -o /dev/null -w "%{http_code}\n" -H "Host: blog.localhost" http://127.0.0.1:8080/
~~~

~~~text اتشغّل فعلًا
shop | container=5df6a981b493 | host=shop.localhost | from=::ffff:172.18.0.3
502
~~~

~~~text docker compose logs edge
[error] blog could not be resolved (2: Server failure), server: blog.localhost
~~~

**موقع واحد واقف، والتاني شغّال.** وده المطلوب.

---

## ٤. ولما [[blog]] قام

~~~bash
cd ../blog && docker compose up -d
curl -s -H "Host: blog.localhost" http://127.0.0.1:8080/
~~~

~~~text اتشغّل فعلًا
blog | container=795c0c253ee2 | host=blog.localhost | from=::ffff:172.18.0.3
~~~

**من غير restart لـ nginx.** لأنه بيسأل عن الاسم كل مرة.

---

## ٥. اللي بيوصل للموقع

| الحقل | القيمة | معناه |
|---|---|---|
| [[host]] | [[shop.localhost]] | الدومين الأصلي وصل — بفضل [[proxy_set_header Host]] |
| [[from]] | [[172.18.0.3]] | الطلب جاي من **nginx**، مش من الزائر |

فلو محتاج IP الزائر، nginx بيبعته في [[X-Forwarded-For]]، والموقع **يثق** في الـ header ده من nginx بس.

---

## ٦. ومصيدة: الكتلة الافتراضية

لو حد فتح السيرفر **بالـ IP**، أو بدومين مش عندك، nginx بيعرض **أول كتلة في الملف**.

~~~nginx الأحسن: ارفض صراحة
server {
    listen 80 default_server;
    return 444;      # يقفل الاتصال من غير رد
}
~~~

~~~text اتشغّل فعلًا
curl http://127.0.0.1:3301/                         ->  exit 52 (Empty reply from server)
curl -H "Host: shop.localhost" http://127.0.0.1:3301/  ->  shop
~~~

---

## الخلاصة

- [[server_name]] + Host = سيرفر واحد لمواقع كتير.
- [[proxy_pass]] ثابتة → nginx مبيقومش لو موقع واحد ناقص.
- [[resolver 127.0.0.11]] + متغير → 502 للناقص بس.
- [[proxy_set_header Host $host]] دايمًا.
- «Started» مش «شغّال» — الـ logs.`,
          sol: R`الخطأ والإصلاح، والاتنين اتشغّلوا على Docker 29.6.1 (nginx:alpine، node:22-slim).`,
          solCode: R`# قبل: proxy_pass http://blog:3000;   و blog مش شغّال
docker compose ps -a
#   edge  exited  Exited (1) 9 seconds ago
#   shop  running
docker compose logs edge
#   nginx: [emerg] host not found in upstream "blog" in /etc/nginx/conf.d/default.conf:16

# بعد: resolver 127.0.0.11 + set $up ...; proxy_pass $up;
curl -s -H "Host: shop.localhost" http://127.0.0.1:8080/
#   shop | container=5df6a981b493 | host=shop.localhost | from=::ffff:172.18.0.3
curl -s -o /dev/null -w "%{http_code}\n" -H "Host: blog.localhost" http://127.0.0.1:8080/
#   502
#   [error] blog could not be resolved (2: Server failure)

# blog قام، ومن غير restart لـ nginx:
#   blog | container=795c0c253ee2 | host=blog.localhost | from=::ffff:172.18.0.3`
        },

        {
          cmd: "مشروعين على شبكة واحدة",
          title: "كل موقع في فولدره، والاتنين على نفس الشبكة",
          learn: R`تخلي مشروع compose يدخل على شبكة مشروع تاني بـ [[external]].`,
          out: R`كل موقع بيتعمله deploy لوحده، والـ proxy بيوصل للكل.`,
          use: {
            net: R`الكونتينرات بتكلّم بعض بالاسم **بس لو على نفس الشبكة**. ومشروعين compose كل واحد بيعمل شبكة لنفسه افتراضيًا، فمش بيشوفوا بعض.`,
            work: R`الوضع العادي: كل موقع في repo لوحده، وبيتعمله deploy لوحده، وكلهم ورا proxy واحد على نفس السيرفر.`,
            prog: R`[[external: true]] معناها «الشبكة دي مش بتاعتي، أنا بس بستخدمها». فـ compose مبيعملهاش ومبيمسحهاش.`,
          },
          desc: R`في الدرس اللي فات، [[blog]] كان في فولدر لوحده. وده مقصود: كل موقع ليه repo و [[compose.yml]] و deploy لوحده.

**بس compose بيعمل لكل مشروع شبكة خاصة بيه.** فـ [[shop_default]] و [[blog_default]] شبكتين منفصلتين، والكونتينرات اللي على واحدة مبتشوفش التانية. و nginx (اللي في [[shop]]) مش هيلاقي [[blog]].

**الحل:** المشروعين يتفقوا على شبكة **باسم ثابت**.

في [[shop]] (اللي فيه nginx):

[[networks: { edge: { name: edge-net } }]]

[[name:]] بتلغي الاسم التلقائي ([[shop_edge]]) وبتخليه [[edge-net]] بالظبط.

وفي [[blog]]:

[[networks: { edge: { external: true, name: edge-net } }]]

[[external: true]] معناها: «الشبكة دي موجودة، متعملهاش ومتمسحهاش. أنا بس هدخل عليها».

**والنتيجة من الاختبار:**

[[docker network inspect edge-net]] بيقول إن عليها تلات كونتينرات من مشروعين:

| الكونتينر | المشروع | IP |
|---|---|---|
| [[shop-edge-1]] | shop | [[172.18.0.3]] |
| [[shop-shop-1]] | shop | [[172.18.0.2]] |
| [[blog-blog-1]] | blog | [[172.18.0.4]] |

و [[blog.localhost]] رد على طول، من غير ما نلمس nginx.

**وفيه سؤال لسه مفتوح:** الشبكة دي «بتاعة» [[shop]]. يعني لو [[shop]] اتقفل، إيه اللي بيحصل لـ [[blog]]؟ ده درس ٤ — والإجابة مش اللي هتتوقعها.`,
          example: R`# blog/compose.yml — مشروع تاني، بيدخل على شبكة موجودة
services:
  blog:
    image: node:22-slim
    working_dir: /app
    volumes: ["./server.js:/app/server.js:ro"]
    command: ["node", "server.js"]
    environment: { SITE_NAME: blog }
    networks: [edge]

networks:
  edge:
    external: true          # موجودة، متعملهاش ومتمسحهاش
    name: edge-net          # الاسم الحقيقي على Docker`,
          lines: [
            R`الخدمات.`,
            R`اسم الخدمة — وده بيبقى **اسم DNS** على كل شبكة الكونتينر عليها. (افتكره في الدرس الجاي.)`,
            R`صورة Node جاهزة. في الحقيقة هتبقى صورتك.`,
            R`فولدر الشغل جوه الكونتينر.`,
            R`الكود من جهازك، للقراية بس ([[:ro]]).`,
            R`التشغيل.`,
            R`المتغير اللي الموقع بيقول بيه اسمه.`,
            R`الخدمة على الشبكة اللي اسمها [[edge]] **في الملف ده**.`,
            R`تعريف الشبكات.`,
            R`[[edge]] هنا اسم محلي للملف.`,
            R`**[[external: true]]**: compose مش هيعملها ولا هيمسحها.`,
            R`و [[name:]] هو الاسم الحقيقي اللي Docker عارفه.`,
          ],
          try: R`شغّل [[shop]] و [[blog]] من فولدرين مختلفين، وبعدين [[docker network inspect edge-net --format '{{range .Containers}}{{.Name}} {{.IPv4Address}}{{"\n"}}{{end}}']]. وجرّب تشيل [[external]] و [[name]] من [[blog]] وشغّله تاني — [[blog.localhost]] هيرجع 502 لأنه بقى على شبكة لوحده.`,
          mac: ["both", R`نفس الحاجة في الأنظمة التلاتة. الشبكات دي جوه Docker، مالهاش علاقة بشبكة جهازك.`],
          deep: {
            why: R`العزل بين المشاريع هو الافتراضي في compose، وده كويس. والشبكة المشتركة استثناء مقصود، فلازم يتكتب صريح.`,
            how: R`**الأسماء التلقائية في compose:**

| اللي في الملف | الاسم الحقيقي |
|---|---|
| مشروع [[shop]]، من غير [[networks:]] | [[shop_default]] |
| [[networks: { edge: {} }]] | [[shop_edge]] |
| [[networks: { edge: { name: edge-net } }]] | [[edge-net]] |

واسم المشروع جاي من اسم الفولدر، أو من [[-p]]، أو من [[name:]] في أول الملف. فلو حد نقل الفولدر أو سمّاه باسم تاني، الشبكة بتتغيّر — وعشان كده [[name:]] الصريح أأمن للشبكات المشتركة.

**وكونتينر ممكن يبقى على أكتر من شبكة.** الشائع:

~~~yaml
services:
  api:
    networks: [edge, internal]     # edge للـ proxy، و internal للداتابيز
  db:
    networks: [internal]           # الداتابيز مش على edge خالص
~~~

كده nginx يوصل للـ API، بس **مايقدرش** يوصل للداتابيز — ولا أي موقع تاني على [[edge]]. والعزل ده مجاني.

**و [[internal: true]]** على شبكة بيمنعها من الإنترنت خالص — مفيدة للداتابيز.

**ومين يوصل لمين:**

| من | لـ | يوصل؟ |
|---|---|---|
| [[edge]] (nginx) | [[blog]] | أيوه — نفس الشبكة |
| [[blog]] | [[shop]] | **أيوه برضه** — نفس الشبكة |
| [[blog]] | داتابيز [[shop]] على [[internal]] | لأ |

النقطة التانية مهمة: كل حاجة على الشبكة المشتركة تقدر تكلّم كل حاجة عليها. فحط عليها اللي nginx محتاجه بس.`,
            when: R`أي مشروعين منفصلين محتاجين يتكلموا: proxy ومواقع، أو مواقع وخدمة مشتركة (Redis، أو monitoring).`,
            mistakes: R`تنسى [[name:]] فالشبكة اسمها بيعتمد على الفولدر. أو تحط الداتابيز على الشبكة المشتركة. أو تفتكر إن مشروعين compose بيشوفوا بعض تلقائي.`
          },
          teach: R`## compose بيعمل لكل مشروع شبكة لوحده

~~~text
shop_default:  shop-edge-1, shop-shop-1
blog_default:  blog-blog-1               <-- nginx مش شايفه
~~~

العزل ده **الافتراضي**، وده كويس. بس الـ proxy محتاج يوصل للكل.

---

## ١. الحل: شبكة باسم ثابت

~~~yaml shop/compose.yml — صاحب الشبكة
services:
  shop:
    networks: [edge]
  edge:
    image: nginx:alpine
    ports: ["8080:80"]
    networks: [edge]

networks:
  edge:
    name: edge-net          # <-- مش shop_edge
~~~

~~~yaml blog/compose.yml — بيدخل عليها
services:
  blog:
    networks: [edge]

networks:
  edge:
    external: true          # <-- موجودة، متعملهاش ومتمسحهاش
    name: edge-net
~~~

---

## ٢. والأسماء التلقائية

| اللي في الملف | الاسم الحقيقي |
|---|---|
| من غير [[networks:]] | [[shop_default]] |
| [[edge: {}]] | [[shop_edge]] |
| [[edge: { name: edge-net }]] | **[[edge-net]]** |

اسم المشروع جاي من **اسم الفولدر**. فلو حد سمّاه باسم تاني، الشبكة بتتغيّر. و [[name:]] الصريح بيقفل الباب ده.

---

## ٣. الاختبار

~~~bash
cd shop && docker compose up -d
cd ../blog && docker compose up -d
docker network inspect edge-net --format '{{range .Containers}}{{.Name}} {{.IPv4Address}}{{"\n"}}{{end}}'
~~~

~~~text اتشغّل فعلًا · Docker 29.6
shop-edge-1 172.18.0.3/16
shop-shop-1 172.18.0.2/16
blog-blog-1 172.18.0.4/16
~~~

تلات كونتينرات، من **مشروعين**، على شبكة واحدة.

~~~text curl -H "Host: blog.localhost" http://127.0.0.1:8080/
blog | container=795c0c253ee2 | host=blog.localhost | from=::ffff:172.18.0.3
~~~

---

## ٤. وكل حاجة على الشبكة بتشوف كل حاجة

| من | لـ | يوصل؟ |
|---|---|---|
| nginx | [[blog]] | أيوه |
| [[blog]] | [[shop]] | **أيوه برضه** |

فحط على الشبكة المشتركة **اللي nginx محتاجه بس**:

~~~yaml
services:
  api:
    networks: [edge, internal]     # nginx يوصل للـ API
  db:
    networks: [internal]           # والداتابيز مش على edge خالص

networks:
  edge:     { external: true, name: edge-net }
  internal: { internal: true }     # ومن غير إنترنت كمان
~~~

---

## ٥. والسؤال اللي لسه مفتوح

الشبكة **بتاعة** [[shop]]. لو [[shop]] اتقفل، [[blog]] يحصله إيه؟

→ درس ٤. والإجابة مش اللي هتتوقعها.

---

## الخلاصة

- كل مشروع compose ليه شبكة لوحده افتراضيًا.
- [[name:]] = اسم ثابت مش مربوط بالفولدر.
- [[external: true]] = «مش بتاعتي».
- الشبكة المشتركة للي nginx محتاجه بس — والداتابيز على [[internal]].`,
          sol: R`المشروعين من فولدرين، والشبكة اللي جمعتهم — اتشغّلوا على Docker 29.6.1.`,
          solCode: R`# shop/compose.yml
networks:
  edge: { name: edge-net }

# blog/compose.yml
networks:
  edge: { external: true, name: edge-net }

# اتشغّل فعلًا:
# docker network inspect edge-net --format '{{range .Containers}}{{.Name}} {{.IPv4Address}}{{"\n"}}{{end}}'
#   shop-edge-1 172.18.0.3/16
#   shop-shop-1 172.18.0.2/16
#   blog-blog-1 172.18.0.4/16
# curl -H "Host: blog.localhost" http://127.0.0.1:8080/
#   blog | container=795c0c253ee2 | host=blog.localhost | from=::ffff:172.18.0.3`
        },

        {
          cmd: "الاسم اللي اتكرر",
          title: "٧ من ١٠ زوار راحوا للموقع الغلط",
          learn: R`تعرف إن اسم الخدمة بيبقى اسم DNS على الشبكة، وإيه اللي بيحصل لما يتكرر.`,
          out: R`أسماء خدمات مميزة على أي شبكة مشتركة.`,
          use: {
            net: R`DNS بيرجّع أكتر من عنوان لنفس الاسم = توزيع حمل (round-robin). وده مقصود لما تعمل [[scale]] لنفس الخدمة، وكارثة لما خدمتين مختلفتين بنفس الاسم.`,
            work: R`الباج ده مبيبانش في التطوير لأن كل مشروع لوحده. بيظهر يوم ما تحط المشروع التاني على نفس السيرفر — والزوار هم اللي بيكتشفوه.`,
            prog: R`[[app]] و [[web]] و [[api]] أسماء بيختارها الكل. وعلى شبكة مشتركة، الاحتمال إن اتنين يختاروها مش صغير.`,
          },
          desc: R`دي حصلت فعلًا في مشروع حقيقي: موقعين على نفس السيرفر، والـ proxy بتاع الأول بيبعت لـ [[app:3000]]. والموقع التاني اتعمل بنفس القالب، فاسم خدمته **برضه** [[app]].

**أعدت تمثيلها في المعمل:**

- [[shop]]: الخدمة اسمها [[app]]، و nginx بيبعت [[shop.localhost]] لـ [[http://app:3000]].
- [[blog]]: الخدمة اسمها **[[app]] برضه**، بس عليها [[container_name: blog-app]]، و nginx بيبعت [[blog.localhost]] لـ [[blog-app]].

**ابعت ١٠ طلبات لـ [[shop.localhost]]:**

| رد | العدد |
|---|---|
| [[blog]] | **٧** |
| [[shop]] | ٣ |

**٧ من ١٠ زوار** المتجر شافوا المدونة.

**ليه؟** كل كونتينر بياخد اسم خدمته كاسم DNS على كل شبكة هو عليها. حتى لو [[container_name]] مختلف:

| الكونتينر | أسماؤه على [[edge-net]] |
|---|---|
| [[shop-app-1]] | [[shop-app-1]]، **[[app]]**، [[9ae91d8e2c05]] |
| [[blog-app]] | [[blog-app]]، **[[app]]**، [[a5df1eb02f48]] |

فالاسم [[app]] على الشبكة دي ليه **عنوانين**: [[172.18.0.2]] و [[172.18.0.4]]. و nginx بياخد واحد منهم كل مرة.

**والإصلاح:** اسم خدمة مميز في [[blog]] ([[blog:]] بدل [[app:]]). وبعد ما الـ DNS cache بتاع nginx خلص ([[valid=10s]])، **١٠ من ١٠** رجعوا [[shop]]، والاسم [[app]] بقى ليه عنوان واحد.`,
          example: R`# shop/compose.yml (مختصر)
services:
  app:                         # <-- اسم الخدمة = اسم DNS على الشبكة
    image: node:22-slim
    networks: [edge]

# blog/compose.yml (مختصر) — مشروع تاني خالص
services:
  app:                         # <-- نفس الاسم
    image: node:22-slim
    container_name: blog-app   # الاسم ده مختلف، بس مش كفاية
    networks: [edge]

# 10 طلبات لـ shop.localhost:
#    7 blog
#    3 shop`,
          lines: [
            R`مشروع [[shop]].`,
            R`**اسم الخدمة [[app]].** وده مش اسم في الملف بس — ده اسم بيتسجّل في الـ DNS.`,
            R`الصورة.`,
            R`على الشبكة المشتركة.`,
            R`مشروع [[blog]]، فولدر تاني وفريق تاني ممكن.`,
            R`**نفس الاسم.** اتعمل من نفس القالب.`,
            R`الصورة.`,
            R`[[container_name]] مختلف — وده اللي بيخلي الناس تفتكر إن مفيش تعارض.`,
            R`ونفس الشبكة.`,
          ],
          try: R`أعد التجربة: الخدمتين اسمهم [[app]]، وابعت ٢٠ طلب لـ [[shop.localhost]] وعدّ. وبعدين شوف [[docker run --rm --network edge-net node:22-slim getent ahostsv4 app]] — هتلاقي عنوانين. وصلّحها، واستنى ١٠ ثواني، وعدّ تاني.`,
          mac: ["both", R`نفس الحاجة في الأنظمة التلاتة. وعلى ويندوز في Git Bash، الـ [[for]] loop بتاعة العدّ شغالة زي ما هي.`],
          deep: {
            why: R`Docker بيسجّل اسم الخدمة كـ alias عشان [[docker compose up --scale app=3]] يشتغل: تلات نسخ بنفس الاسم، والـ DNS بيوزّع عليهم. والميزة دي نفسها هي اللي بتعمل الباج لما المشروعين مختلفين.`,
            how: R`**الأسماء اللي كونتينر بياخدها على شبكة compose:**

~~~bash
docker inspect blog-app --format '{{range $k,$v := .NetworkSettings.Networks}}{{$v.DNSNames}}{{end}}'
# [blog-app app a5df1eb02f48]
~~~

| الاسم | جاي منين |
|---|---|
| [[blog-app]] | [[container_name]] (أو الاسم التلقائي [[blog-app-1]]) |
| **[[app]]** | **اسم الخدمة** |
| [[a5df1eb02f48]] | أول ١٢ حرف من الـ id |

**والاسم ده بيتسجّل على كل شبكة الكونتينر عليها.** فلو [[blog]] على [[blog_default]] و [[edge-net]]، الاسم [[app]] موجود على الاتنين. ومشكلة التعارض على [[edge-net]] بس، لأنها مشتركة.

**ليه ٧ و ٣ مش ٥ و ٥؟** nginx بيسأل الـ DNS كل ١٠ ثواني. والـ DNS بتاع Docker بيرجّع العناوين بترتيب عشوائي. والـ ١٠ طلبات اتبعتوا في أقل من ثانية، فاتوزعوا حسب الإجابة اللي nginx كان واخدها. التوزيع مش مضمون — اللي مضمون إن **فيه** زوار رايحين غلط.

**تلات طرق للإصلاح:**

| الطريقة | إزاي |
|---|---|
| اسم خدمة مميز | [[blog:]] بدل [[app:]] — **الأبسط والأوضح** |
| nginx يستخدم [[container_name]] | [[proxy_pass http://shop-app:3000]] — بس الاسم المكرر لسه موجود |
| [[aliases]] على الشبكة المشتركة | الخدمة تاخد اسم مميز على [[edge]] بس |

~~~yaml الطريقة التالتة
services:
  app:
    networks:
      edge:
        aliases: [shop-app]     # nginx بيستخدم الاسم ده
~~~

بس خد بالك: [[aliases]] **بتضيف** اسم، مش بتشيل [[app]]. جرّبتها: الكونتينر بقت أسماؤه [[[vshop-app-1 app shop-app 4e56c07958dd]]] — [[app]] لسه موجود. فالتعارض لسه قائم لو حد استخدم [[app]] على [[edge]].

**والقاعدة اللي بتمنع الباج من أصله:** على أي شبكة مشتركة، اسم الخدمة فيه اسم المشروع: [[shop-web]] و [[blog-web]]، مش [[web]] و [[web]].`,
            when: R`قبل ما تحط أي مشروع جديد على شبكة مشتركة. افحص الأسماء اللي عليها.`,
            mistakes: R`تفتكر إن [[container_name]] المختلف كفاية. أو تستخدم [[app]] و [[web]] على شبكة مشتركة. أو تختبر كل موقع لوحده فمتشوفش التعارض. أو تصلّح وتختبر على طول قبل ما الـ DNS cache يخلص.`
          },
          teach: R`## دي حصلت في مشروع حقيقي

موقعين على نفس السيرفر. الـ proxy بتاع الأول بيبعت لـ [[app:3000]]. والموقع التاني اتعمل من نفس القالب، فاسم خدمته **برضه** [[app]].

أعدت تمثيلها في المعمل بأسماء متألفة.

---

## ١. الإعداد

~~~yaml shop/compose.yml
services:
  app:                         # <-- اسم الخدمة
    image: node:22-slim
    environment: { SITE_NAME: shop }
    networks: [edge]
  edge:
    image: nginx:alpine
    ports: ["8080:80"]
    networks: [edge]
~~~

~~~yaml blog/compose.yml — مشروع تاني خالص
services:
  app:                         # <-- نفس الاسم
    image: node:22-slim
    container_name: blog-app   # مختلف، بس مش كفاية
    environment: { SITE_NAME: blog }
    networks: [edge]
~~~

~~~nginx
server { server_name shop.localhost; location / { set $up http://app:3000;      proxy_pass $up; } }
server { server_name blog.localhost; location / { set $up http://blog-app:3000; proxy_pass $up; } }
~~~

---

## ٢. ١٠ طلبات للمتجر

~~~bash
for i in $(seq 1 10); do
  curl -s -H "Host: shop.localhost" http://127.0.0.1:8080/ | cut -d'|' -f1
done | sort | uniq -c
~~~

~~~text اتشغّل فعلًا · Docker 29.6
      7 blog
      3 shop
~~~

**٧ من ١٠ زوار المتجر شافوا المدونة.**

---

## ٣. ليه؟

~~~bash
docker run --rm --network edge-net node:22-slim getent ahostsv4 app | awk '{print $1}' | sort -u
~~~

~~~text اتشغّل فعلًا
172.18.0.2
172.18.0.4
~~~

**الاسم [[app]] ليه عنوانين.**

~~~bash
docker inspect blog-app --format '{{range $k,$v := .NetworkSettings.Networks}}{{$v.DNSNames}}{{end}}'
~~~

~~~text اتشغّل فعلًا
shop-app-1: [shop-app-1 app 9ae91d8e2c05]
blog-app:   [blog-app app a5df1eb02f48]
~~~

| الاسم | جاي منين |
|---|---|
| [[blog-app]] | [[container_name]] |
| **[[app]]** | **اسم الخدمة** — ودايمًا بيتسجّل |
| [[a5df1eb02f48]] | الـ id |

> Docker بيعمل كده عشان [[--scale app=3]] يشتغل: تلات نسخ بنفس الاسم، والـ DNS بيوزّع. **نفس الميزة هي اللي عملت الباج.**

---

## ٤. ليه ٧ و ٣ مش ٥ و ٥؟

nginx بيسأل الـ DNS كل [[valid=10s]]. والـ DNS بتاع Docker بيرجّع العناوين بترتيب عشوائي. والتوزيع **مش مضمون**.

اللي مضمون: **فيه** زوار رايحين غلط.

---

## ٥. الإصلاح

~~~yaml blog/compose.yml
services:
  blog:                        # <-- اسم مميز
    container_name: blog-app
~~~

~~~text بعد ما استنيت ١٢ ثانية (الـ cache بتاع nginx ١٠) · اتشغّل فعلًا
     10 shop

getent ahostsv4 app:
172.18.0.2
~~~

> **لو اختبرت على طول بعد الإصلاح**، ممكن تلاقي الباج لسه موجود — nginx لسه فاكر العنوانين. استنى الـ [[valid]].

---

## ٦. تلات طرق، وواحدة أحسن

| الطريقة | |
|---|---|
| **اسم خدمة مميز** | الأبسط والأوضح |
| nginx يستخدم [[container_name]] | يشتغل، بس [[app]] المكرر لسه موجود |
| [[aliases]] على [[edge]] | بتضيف اسم، **مش بتشيل** [[app]] |

**والقاعدة:** على أي شبكة مشتركة، اسم الخدمة فيه اسم المشروع.

~~~text
✗  web, web, api, api
✓  shop-web, blog-web, shop-api
~~~

---

## الخلاصة

- اسم الخدمة = اسم DNS على **كل** شبكة الكونتينر عليها.
- [[container_name]] المختلف مش بيمنع التعارض.
- اسم مكرر = توزيع عشوائي بين خدمتين مختلفتين.
- الباج مبيبانش وكل مشروع لوحده.
- بعد الإصلاح، استنى الـ DNS cache.`,
          sol: R`التعارض والإصلاح، اتشغّلوا على Docker 29.6.1. الأسماء متألفة، والموقف من مشروع حقيقي.`,
          solCode: R`# الخدمتين اسمهم app، على edge-net
for i in $(seq 1 10); do curl -s -H "Host: shop.localhost" http://127.0.0.1:8080/ | cut -d'|' -f1; done | sort | uniq -c
#       7 blog
#       3 shop

docker run --rm --network edge-net node:22-slim getent ahostsv4 app | awk '{print $1}' | sort -u
#   172.18.0.2
#   172.18.0.4

# DNSNames:
#   shop-app-1: [shop-app-1 app 9ae91d8e2c05]
#   blog-app:   [blog-app app a5df1eb02f48]

# بعد ما الخدمة في blog بقت اسمها blog، واستنيت 12 ثانية:
#      10 shop
#   getent ahostsv4 app  ->  172.18.0.2`
        },

        {
          cmd: "الشبكة ملك مين؟",
          title: "صاحب الشبكة قفل، والتاني مش عارف يقوم",
          learn: R`تعرف إيه اللي بيحصل للشبكة المشتركة لما المشروع اللي عاملها يقف، وتخليها ملك السيرفر.`,
          out: R`أي مشروع يقف أو يقوم من غير ما يأثر على الباقي.`,
          use: {
            work: R`«عملت down للمشروع الأول عشان أحدّثه، والتاني مش راضي يقوم» — في سيرفر عليه كذا مشروع، ده بيحصل.`,
            net: R`الشبكة المشتركة بنية تحتية، زي الـ proxy. والبنية التحتية متبقاش جزء من مشروع ممكن يتمسح.`,
            prog: R`[[docker compose down]] بيمسح الشبكات اللي المشروع عاملها. والمشروع التاني اللي عليها [[external]] مبيتحسبش.`,
          },
          desc: R`في الدرس اللي فات، [[shop]] هو اللي بيعمل [[edge-net]]، و [[blog]] بيدخل عليها كـ [[external]]. جرّبت أقفلهم بترتيبات مختلفة، وده اللي حصل:

**١. [[shop]] قفل، و [[blog]] لسه شغال:**

[[Network edge-net  Resource is still in use]]

compose حاول يمسح الشبكة ومقدرش، لأن [[blog]] عليها. والشبكة **فضلت**. (نتيجة مش متوقعة: كنت متوقع إنها تتمسح وتقطع [[blog]].)

**٢. وبعدين [[blog]] قفل:** الشبكة **لسه موجودة**. لأن [[blog]] شايفها [[external]]، فمش بيمسحها. يعني دلوقتي شبكة مالهاش صاحب.

**٣. [[shop]] رجع:** قام عادي على الشبكة الموجودة.

**٤. الاتنين قفلوا، و [[blog]] حاول يقوم الأول:**

[[network edge-net declared as external, but could not be found]]

ودي اللي بتوقّع. [[shop]] لما قفل وهو آخر واحد عليها، مسحها. و [[blog]] مش هيقوم لحد ما [[shop]] يقوم الأول. **والـ exit code [[1]]** — فلو ده في سكربت deploy، السكربت هيقف.

**الإصلاح: الشبكة ملك السيرفر، مش ملك مشروع.**

[[docker network create edge-net]]

مرة واحدة على السيرفر. والمشروعين **الاتنين** يقولوا [[external: true]]. وبعدها:

[[shop]] قفل ← الشبكة فضلت ← [[blog]] اتعمله restart وقام عادي.

**وكلمة عن التنضيف:** [[docker network prune]] و [[docker system prune]] بيمسحوا **أي** شبكة مفيش عليها كونتينر شغال — مش بتاعة مشروع معين. فلو الشبكة المشتركة فاضية لحظتها (كل المواقع واقفة للتحديث مثلًا)، بتروح. ده من وثائق Docker، وماشغّلتهوش لأنه بيأثر على كل اللي على الجهاز. على سيرفر عليه كذا مشروع، نضّف بـ [[docker compose down]] لكل مشروع لوحده بدل الـ prune العام.`,
          example: R`# ١) صاحب الشبكة قفل، والتاني لسه عليها
cd shop && docker compose down
#    Network edge-net  Resource is still in use

# ٢) الاتنين قفلوا، والتاني حاول يقوم الأول
cd ../blog && docker compose up -d
#    network edge-net declared as external, but could not be found   (exit 1)

# ٣) الإصلاح: الشبكة ملك السيرفر، مش ملك مشروع
docker network create edge-net
# وفي compose.yml بتاع المشروعين الاتنين:
#   networks:
#     edge: { external: true, name: edge-net }`,
          lines: [
            R`**[[shop]] قفل.** compose حاول يمسح الشبكة اللي عاملها، ومقدرش لأن [[blog]] عليها.`,
            R`**والعكس:** الاتنين واقفين، والشبكة اتمسحت مع آخر [[down]] لـ [[shop]]، و [[blog]] مش لاقيها.`,
            R`**الإصلاح:** شبكة بتتعمل مرة واحدة على السيرفر، ومالهاش مشروع يمسحها.`,
          ],
          try: R`اعمل الأربع ترتيبات بنفسك: (shop down وblog شغال)، (blog down بعدها)، (shop up)، (الاتنين down وblog up لوحده). وبعد كل خطوة [[docker network ls --filter name=edge-net]]. وبعدين اعمل الشبكة بإيدك وأعد الترتيبات.`,
          mac: ["both", R`نفس الحاجة في الأنظمة التلاتة. وعلى سيرفر لينكس، حط [[docker network create edge-net]] في سكربت تجهيز السيرفر، مع [[|| true]] عشان ميفشلش لو الشبكة موجودة.`],
          deep: {
            why: R`اللي بيعمل حاجة هو اللي بيمسحها. فلو شبكة مشتركة بيعملها مشروع واحد، عمرها مربوط بعمره. والبنية التحتية المفروض عمرها أطول من أي مشروع عليها.`,
            how: R`**الأربع حالات اللي جرّبتها:**

| الحالة | النتيجة |
|---|---|
| [[shop]] down، و [[blog]] عليها | [[Resource is still in use]] — الشبكة فضلت |
| [[blog]] down بعدها | الشبكة **لسه موجودة** — مالهاش صاحب دلوقتي |
| [[shop]] up على شبكة موجودة | قام عادي |
| الاتنين down، و [[blog]] up | **[[declared as external, but could not be found]]** — exit 1 |

**ليه compose «عارف» إن الشبكة بتاعته؟** بالـ labels:

~~~bash
docker network inspect edge-net --format '{{json .Labels}}'
~~~

الشبكة اللي compose عاملها عليها [[com.docker.compose.project=shop]]. والشبكة اللي اتعملت بـ [[docker network create]] مفيش عليها labels، فمحدش يعتبرها بتاعته.

**وفي سكربت تجهيز السيرفر:**

~~~bash
docker network inspect edge-net >/dev/null 2>&1 || docker network create edge-net
~~~

سطر واحد، بيعمل الشبكة لو مش موجودة، ومبيعملش حاجة لو موجودة. وحطه **قبل** أي [[compose up]].

**والـ proxy نفسه؟** نفس المنطق. لو nginx جوه مشروع [[shop]]، فـ [[docker compose down]] في [[shop]] بيوقّع **كل** المواقع. فالأنضف: nginx يبقى مشروع لوحده ([[edge/compose.yml]])، وكل المواقع مشاريع تانية. ودي البنية اللي بتستخدمها أدوات زي Traefik و nginx-proxy.

~~~text
/srv/edge/compose.yml    nginx + certbot، external: edge-net
/srv/shop/compose.yml    الموقع، external: edge-net
/srv/blog/compose.yml    الموقع، external: edge-net
~~~

**و prune على سيرفر مشترك:** [[docker system prune -f]] بيمسح كل الكونتينرات الواقفة، والشبكات اللي مش مستخدمة، والصور اللي مالهاش tag — **لكل المشاريع** (من وثائق Docker، [[docker system prune --help]]). فسكربت deploy لمشروع واحد فيه [[system prune]] بيلمس حاجات مش بتاعته. الأأمن:

| بدل | استخدم |
|---|---|
| [[docker system prune -f]] | [[docker compose down]] للمشروع ده |
| [[docker image prune -f]] | [[docker image prune -f --filter label=com.docker.compose.project=shop]] |`,
            when: R`أي شبكة أو volume أو proxy بيستخدمه أكتر من مشروع على نفس السيرفر.`,
            mistakes: R`الشبكة المشتركة بيعملها مشروع من المشاريع. أو nginx جوه مشروع موقع. أو [[docker system prune]] في سكربت deploy على سيرفر مشترك. أو تقرا [[$?]] بعد [[| tail]] فتفتكر إن الأمر نجح.`
          },
          teach: R`## مين بيعمل الشبكة؟

في الدرس اللي فات: [[shop]] بيعمل [[edge-net]]، و [[blog]] بيدخل عليها [[external]].

**جرّبت أقفلهم بترتيبات مختلفة.**

---

## ١. [[shop]] قفل، و [[blog]] لسه شغال

~~~bash
cd shop && docker compose down
~~~

~~~text اتشغّل فعلًا · Docker 29.6
Container shop-app-1  Removed
Network edge-net  Removing
Network edge-net  Resource is still in use
~~~

**الشبكة فضلت.** compose مقدرش يمسحها لأن [[blog]] عليها.

> كنت متوقع العكس: إنها تتمسح وتقطع [[blog]]. Docker مبيمسحش شبكة عليها كونتينر.

---

## ٢. [[blog]] قفل بعدها

~~~text
docker network ls --filter name=edge-net
edge-net          <-- لسه موجودة، ومالهاش صاحب
~~~

[[blog]] شايفها [[external]]، فمش بيمسحها.

---

## ٣. الحالة اللي بتوقّع

الاتنين واقفين، و [[shop]] (آخر واحد عليها) مسحها. و [[blog]] قام الأول:

~~~bash
cd blog && docker compose up -d
echo $?
~~~

~~~text اتشغّل فعلًا
network edge-net declared as external, but could not be found
1
~~~

**[[blog]] مش هيقوم لحد ما [[shop]] يقوم.** والـ exit [[1]] بيوقّف أي سكربت deploy.

> **مصيدة اتعلمتها هنا:** أول مرة كتبت [[docker compose up -d 2>&1 | tail -2; echo $?]] وطلع [[0]]. ده الـ exit بتاع [[tail]] مش docker. لو عايز كود الأمر، متحطوش في pipe.

---

## ٤. الإصلاح: الشبكة ملك **السيرفر**

~~~bash
docker network create edge-net
~~~

~~~yaml المشروعين الاتنين
networks:
  edge: { external: true, name: edge-net }
~~~

~~~text اتشغّل فعلًا
shop down  ->  الشبكة: edge-net    (فضلت)
blog restart  ->  blog running
~~~

### وفي سكربت تجهيز السيرفر

~~~bash
docker network inspect edge-net >/dev/null 2>&1 || docker network create edge-net
~~~

بيعملها لو مش موجودة، ومبيعملش حاجة لو موجودة.

---

## ٥. ونفس المنطق للـ proxy نفسه

لو nginx جوه مشروع [[shop]]، فـ [[compose down]] لـ [[shop]] بيوقّع **كل المواقع**.

~~~text الأنضف
/srv/edge/compose.yml    nginx،  external: edge-net
/srv/shop/compose.yml    الموقع، external: edge-net
/srv/blog/compose.yml    الموقع، external: edge-net
~~~

---

## ٦. و prune على سيرفر مشترك

| الأمر | بيمسح |
|---|---|
| [[docker network prune]] | **أي** شبكة مفيش عليها كونتينر |
| [[docker system prune -f]] | الكونتينرات الواقفة، والشبكات الفاضية، والصور من غير tag — **لكل المشاريع** |

> ده من وثائق Docker ([[docker system prune --help]]). **ماشغّلتهوش** لأنه بيأثر على كل اللي على الجهاز.

فلو كل المواقع واقفة لحظتها للتحديث، الشبكة المشتركة **بتروح**.

| بدل | استخدم |
|---|---|
| [[docker system prune -f]] | [[docker compose down]] للمشروع ده |
| [[docker image prune -f]] | نفسه مع [[--filter label=com.docker.compose.project=shop]] |

---

## الخلاصة

- اللي بيعمل الشبكة هو اللي بيمسحها.
- شبكة عليها كونتينر **مبتتمسحش** — بس بتفضل من غير صاحب.
- [[external]] ناقصة = المشروع مش هيقوم (exit 1).
- البنية المشتركة ([[edge-net]] و nginx) **بره** المشاريع.
- prune العام على سيرفر مشترك بيلمس كل المشاريع.`,
          sol: R`الأربع ترتيبات والإصلاح اتشغّلوا على Docker 29.6.1. سلوك [[prune]] من وثائق Docker، ومااتشغّلش.`,
          solCode: R`cd shop && docker compose down         # و blog لسه عليها
#   Network edge-net  Resource is still in use
#   (الشبكة فضلت)

cd ../blog && docker compose down      # الشبكة لسه موجودة، من غير صاحب

# الاتنين واقفين، وshop مسحها وهو آخر واحد:
cd ../blog && docker compose up -d; echo $?
#   network edge-net declared as external, but could not be found
#   1

# الإصلاح:
docker network create edge-net
# المشروعين: networks: { edge: { external: true, name: edge-net } }
cd ../shop && docker compose down
#   الشبكة: edge-net   (فضلت)
cd ../blog && docker compose restart
#   blog running`
        },

        {
          cmd: "البورت المفتوح للدنيا",
          title: "0.0.0.0 و 127.0.0.1 و expose — ومين يوصل لكل واحد",
          learn: R`تربط البورت على الواجهة الصح، وتعرف مين يقدر يوصل له.`,
          out: R`الحاجات اللي ورا nginx مبتتوصلش غير من خلاله.`,
          use: {
            net: R`[[0.0.0.0]] = كل الواجهات: الـ Wi-Fi، والإيثرنت، والـ IP العام. و [[127.0.0.1]] = الجهاز نفسه بس. والفرق ده هو الفرق بين «ورا nginx» و «مفتوح للإنترنت».`,
            work: R`API عليه rate limit و CORS في nginx، ومربوط برضه على [[5000:5000]] — يعني أي حد يقدر يكلّمه مباشرة ويعدّي كل ده.`,
            prog: R`[[ports: ["5000:5000"]]] هو الشكل اللي في كل مثال على النت. وهو الأخطر.`,
          },
          desc: R`تلات طرق تقول بيها لـ Docker «البورت ده»:

| الطريقة | معناها |
|---|---|
| [[-p 3101:80]] | اربط على **كل** واجهات الجهاز |
| [[-p 127.0.0.1:3102:80]] | اربط على الجهاز نفسه بس |
| [[--expose 80]] (أو [[expose:]]) | **مفيش ربط خالص** — للتوثيق، والكونتينرات التانية على نفس الشبكة بتوصل له عادي |

**جرّبتهم:** شغّلت nginx بالتلات طرق، وجرّبت أوصل لكل واحد من عنوانين: [[127.0.0.1]]، و IP الجهاز على الشبكة المحلية (كأني جهاز تاني على نفس الشبكة):

| البورت | من [[127.0.0.1]] | من IP الجهاز على الشبكة |
|---|---|---|
| [[3101]] ([[0.0.0.0]]) | 200 | **200** |
| [[3102]] ([[127.0.0.1]]) | 200 | **مفيش رد** |
| [[--expose]] | مفيش بورت على الجهاز أصلًا | — |

و [[docker ps]] بيقولها صريح:

[[p-all    0.0.0.0:3101->80/tcp, [::]:3101->80/tcp]]

[[p-local  127.0.0.1:3102->80/tcp]]

[[p-none   80/tcp]]

**ولاحظ [[[::]:3101]]** — الربط على كل واجهات IPv6 كمان. فلو السيرفر عنده IPv6 عام، البورت مفتوح عليه برضه.

**فالقاعدة:**

| الخدمة | الربط |
|---|---|
| nginx (الباب) | [[80:80]] و [[443:443]] — ده المقصود |
| موقع أو API ورا nginx | **مفيش [[ports:]] خالص** — nginx بيوصل له على الشبكة |
| محتاج تكلّمه من السيرفر للتشخيص | [[127.0.0.1:5001:3000]] |
| داتابيز | **مفيش [[ports:]]** — ولو لازم، [[127.0.0.1]] |

**وعلى سيرفر لينكس فيه مصيدة أكبر:** Docker بيكتب قواعد [[iptables]] بنفسه للبورتات المربوطة، وده بيعدّي قواعد [[ufw]]. فممكن [[ufw]] يقول البورت مقفول، وهو مفتوح. ده من وثائق Docker («Docker and ufw»)، ومااتجرّبش هنا لأن الجهاز ويندوز.`,
          example: R`docker run -d --name p-all   -p 3101:80           nginx:alpine
docker run -d --name p-local -p 127.0.0.1:3102:80 nginx:alpine
docker run -d --name p-none  --expose 80          nginx:alpine
docker ps --filter name=p- --format "{{.Names}}  {{.Ports}}"
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3101/
curl -s -o /dev/null -w "%{http_code}\n" http://192.168.1.20:3101/
curl -s -o /dev/null -w "%{http_code}\n" http://192.168.1.20:3102/
docker rm -f p-all p-local p-none`,
          lines: [
            R`**[[3101:80]]** = [[0.0.0.0:3101]] — كل الواجهات.`,
            R`**[[127.0.0.1:3102:80]]** = الجهاز نفسه بس.`,
            R`**[[--expose]]** = مفيش ربط بالجهاز خالص.`,
            R`[[docker ps]] بيوريك كل واحد مربوط على إيه.`,
            R`من الجهاز نفسه: [[200]].`,
            R`من IP الجهاز على الشبكة (حط IP جهازك بدل [[192.168.1.20]]): [[200]] — **مفتوح لأي جهاز على الشبكة**.`,
            R`نفس الكلام على البورت المربوط على [[127.0.0.1]]: **مفيش رد**.`,
            R`تنضيف.`,
          ],
          try: R`افتح أي [[compose.yml]] عندك وعدّ الـ [[ports:]] اللي مش على [[127.0.0.1]]. لكل واحد اسأل «مين المفروض يوصل له من بره؟». ولو الإجابة «nginx بس»، شيل [[ports:]] خالص. وبعدين [[docker ps --format "{{.Names}}  {{.Ports}}"]] على السيرفر وشوف إيه اللي على [[0.0.0.0]] فعلًا.`,
          mac: ["diff", R`على لينكس: Docker بيعدّي [[ufw]] للبورتات المربوطة (وثائق Docker، «Docker and ufw»)، فمتعتمدش على [[ufw]] لوحده — اربط على [[127.0.0.1]] أو متربطش. وعلى الماك وويندوز (Docker Desktop) البورت بيتربط على الجهاز نفسه، وجدار الحماية بتاع النظام ممكن يسأل أول مرة. وعلى ويندوز: [[curl]] في Windows PowerShell 5.1 اختصار لـ [[Invoke-WebRequest]] — اكتب [[curl.exe]].`],
          deep: {
            why: R`كل بورت مربوط على [[0.0.0.0]] هو باب. و nginx بيحط على الباب الرئيسي rate limit و TLS و CORS و logs. والبورت التاني المفتوح باب جانبي من غير أي حاجة من دول.`,
            how: R`**إزاي تعرف IP جهازك:**

~~~bash
# Linux (and WSL):
hostname -I
# Windows (PowerShell):
Get-NetIPAddress -AddressFamily IPv4 | Select-Object InterfaceAlias, IPAddress
# Mac:
ipconfig getifaddr en0
~~~

**[[expose]] مش أمان، هو توثيق.** الكونتينرات على نفس الشبكة بتوصل لأي بورت شغال جوه كونتينر تاني، سواء [[expose]] مكتوبة أو لأ. اللي بيمنع الوصول من **بره** هو غياب [[ports:]]. واللي بيمنع الوصول من كونتينرات تانية هو إنها **مش على نفس الشبكة**.

| عايز تمنع | الأداة |
|---|---|
| الإنترنت | مفيش [[ports:]] (أو [[127.0.0.1]]) |
| كونتينرات مشاريع تانية | شبكة منفصلة ([[internal]]) |
| الكونتينر يخرج للإنترنت | [[internal: true]] على الشبكة |

**والصيغة الطويلة في compose أوضح:**

~~~yaml
ports:
  - target: 3000
    published: 5001
    host_ip: 127.0.0.1
~~~

**وفي ملف compose حقيقي:**

~~~yaml
services:
  web:
    expose: ["3000"]                   # توثيق: nginx بيوصل على 3000
    ports: ["127.0.0.1:5001:3000"]     # وللتشخيص من السيرفر بس
    networks: [edge]
~~~

وده بيخليك تعمل [[curl http://127.0.0.1:5001]] من السيرفر نفسه وانت بتشخّص، من غير ما حد بره يقدر.

**ولو محتاج توصل لحاجة على [[127.0.0.1]] من جهازك انت؟** نفق SSH:

~~~bash
ssh -L 5001:127.0.0.1:5001 user@server
# دلوقتي http://localhost:5001 على جهازك = 127.0.0.1:5001 على السيرفر
~~~

ونفس الفكرة للداتابيز: متفتحش [[5432]] للدنيا عشان تفتحها من DBeaver — افتح نفق.`,
            when: R`كل سطر [[ports:]] بتكتبه. والسؤال: «مين المفروض يوصل هنا من بره؟».`,
            mistakes: R`[[5000:5000]] لخدمة ورا nginx. أو [[5432:5432]] للداتابيز «عشان أفتحها من جهازي». أو تفتكر [[expose]] بتقفل حاجة. أو تعتمد على [[ufw]] على لينكس. أو تنسى إن [[0.0.0.0]] معاها [[[::]]] (IPv6).`
          },
          teach: R`## تلات طرق تقول بيها «البورت ده»

| الطريقة | معناها |
|---|---|
| [[-p 3101:80]] | كل واجهات الجهاز |
| [[-p 127.0.0.1:3102:80]] | الجهاز نفسه بس |
| [[--expose 80]] | **مفيش ربط** — توثيق |

---

## ١. جرّبتهم

~~~bash
docker run -d --name p-all   -p 3101:80           nginx:alpine
docker run -d --name p-local -p 127.0.0.1:3102:80 nginx:alpine
docker run -d --name p-none  --expose 80          nginx:alpine
docker ps --filter name=p- --format "{{.Names}}  {{.Ports}}"
~~~

~~~text اتشغّل فعلًا · Docker 29.6
p-none   80/tcp
p-local  127.0.0.1:3102->80/tcp
p-all    0.0.0.0:3101->80/tcp, [::]:3101->80/tcp
~~~

> **[[[::]:3101]]** = كل واجهات **IPv6** كمان. لو السيرفر عنده IPv6 عام، مفتوح عليه.

---

## ٢. مين يوصل؟

جرّبت من [[127.0.0.1]]، ومن IP الجهاز على الشبكة المحلية — كأني جهاز تاني:

~~~bash
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3101/
curl -s -o /dev/null -w "%{http_code}\n" http://<IP-جهازك>:3101/
curl -s -o /dev/null -w "%{http_code}\n" http://<IP-جهازك>:3102/
~~~

~~~text اتشغّل فعلًا
3101  من 127.0.0.1     -> 200
3101  من IP الجهاز     -> 200          <-- أي جهاز على الشبكة
3102  من 127.0.0.1     -> 200
3102  من IP الجهاز     -> مفيش رد      <-- الجهاز نفسه بس
~~~

---

## ٣. القاعدة

| الخدمة | الربط |
|---|---|
| nginx (الباب) | [[80:80]] و [[443:443]] |
| موقع أو API ورا nginx | **مفيش [[ports:]] خالص** |
| محتاج تشخّص من السيرفر | [[127.0.0.1:5001:3000]] |
| داتابيز | **مفيش [[ports:]]** |

~~~yaml
services:
  web:
    expose: ["3000"]                   # توثيق: nginx بيوصل على 3000
    ports: ["127.0.0.1:5001:3000"]     # وللتشخيص من السيرفر بس
    networks: [edge]
~~~

---

## ٤. [[expose]] مش قفل

الكونتينرات على نفس الشبكة بتوصل لأي بورت شغال، **سواء [[expose]] مكتوبة أو لأ**.

| عايز تمنع | الأداة |
|---|---|
| الإنترنت | مفيش [[ports:]] |
| كونتينرات تانية | شبكة منفصلة |
| الخروج للإنترنت | [[internal: true]] |

---

## ٥. ولو محتاج توصل من جهازك لحاجة على [[127.0.0.1]]؟

~~~bash نفق SSH
ssh -L 5001:127.0.0.1:5001 user@server
# دلوقتي http://localhost:5001 على جهازك = 127.0.0.1:5001 على السيرفر
~~~

نفس الفكرة للداتابيز. **متفتحش [[5432]] للدنيا عشان DBeaver** — افتح نفق.

---

## ٦. ومصيدة لينكس

Docker بيكتب قواعد [[iptables]] بنفسه، وده **بيعدّي [[ufw]]**. فممكن [[ufw status]] يقول البورت مقفول، وهو مفتوح.

> ده من وثائق Docker («Docker and ufw»)، ومااتجرّبش هنا لأن الجهاز ويندوز. الحل: متعتمدش على [[ufw]] لوحده — اربط على [[127.0.0.1]] أو متربطش.

---

## الخلاصة

- [[5000:5000]] = مفتوح لكل حد يوصل للسيرفر — IPv4 و IPv6.
- [[127.0.0.1:5000:5000]] = السيرفر نفسه بس.
- ورا nginx؟ **مفيش [[ports:]]**.
- [[expose]] توثيق، مش قفل.
- على لينكس، [[ufw]] مش كفاية.`,
          sol: R`التلات طرق اتشغّلوا على Docker 29.6.1 (ويندوز)، واتجرّبوا من [[127.0.0.1]] ومن IP الجهاز على الشبكة. سلوك [[ufw]] من وثائق Docker.`,
          solCode: R`docker ps --filter name=p- --format "{{.Names}}  {{.Ports}}"
#   p-none   80/tcp
#   p-local  127.0.0.1:3102->80/tcp
#   p-all    0.0.0.0:3101->80/tcp, [::]:3101->80/tcp

# من 127.0.0.1:
#   3101 -> 200     3102 -> 200
# من IP الجهاز على الشبكة المحلية:
#   3101 -> 200     3102 -> مفيش رد

# القاعدة في compose:
#   nginx:        ports: ["80:80", "443:443"]
#   موقع ورا nginx: من غير ports
#   للتشخيص:      ports: ["127.0.0.1:5001:3000"]`
        },

        {
          cmd: "وقت البناء ووقت التشغيل",
          title: "غيّرت المتغير، والموقع لسه بيكلّم السيرفر القديم",
          learn: R`تفرّق بين [[ARG]] اللي بيتحط في الصورة و [[ENV]] اللي بيتقري وقت التشغيل، وتعدّي الأسرار للبناء من غير ما تفضل في الصورة.`,
          out: R`تعرف أنهي تغيير محتاج build وأنهي محتاج restart بس.`,
          use: {
            prog: R`أي فرونت إند (React و Vite و Next.js) بيحط متغيرات زي عنوان الـ API **جوه ملفات الـ JavaScript** وقت البناء. فـ [[.env]] على السيرفر مبيأثرش عليها.`,
            work: R`«غيّرت عنوان الـ API في [[.env]] وعملت restart ولسه بيكلّم القديم» — ده بيحصل في كل فريق مرة على الأقل.`,
            cs: R`المتصفح مبيشوفش متغيرات السيرفر. الكود اللي بيوصله نص ثابت، وأي قيمة فيه اتكتبت وقت ما اتعمل.`,
          },
          desc: R`ده حصل في مشروع Next.js حقيقي: متغيرات [[NEXT_PUBLIC_*]] بتتحط في الـ bundle **وقت البناء**. فلازم تتعدّى كـ [[build args]]، وتغييرها في [[.env]] لوحده مبيعملش حاجة.

**أعدت تمثيلها في أصغر صورة:** موقع ثابت على nginx، وعنوان الـ API بيتكتب في [[config.js]] وقت البناء:

[[ARG PUBLIC_API_URL]] و [[RUN echo "window.API_URL = '$PUBLIC_API_URL';" > .../config.js]]

بنيته بـ [[api-v1]]، وشغّلته بـ [[-e PUBLIC_API_URL=https://api-v2.example.test]]:

| السؤال | الإجابة |
|---|---|
| [[docker exec bake printenv PUBLIC_API_URL]] | **[[api-v2]]** |
| [[curl .../config.js]] (اللي المتصفح بياخده) | **[[api-v1]]** |

**الكونتينر شايف v2، والمتصفح بياخد v1.** لأن الملف اتكتب وقت البناء، والمتغير وقت التشغيل مبيلمسوش. وبعد build تاني بـ [[--build-arg]] الجديد بس، بقى [[api-v2]].

| اتعدّى كـ | بيتحط فين | تغييره محتاج |
|---|---|---|
| [[ARG]] / [[--build-arg]] | **جوه ملفات الصورة** | build جديد |
| [[ENV]] / [[-e]] / [[env_file]] | في بيئة العملية | restart بس |

**والمصيدة التانية: [[ARG]] باين.** [[docker history]] بيطلّع القيمة لأي حد معاه الصورة:

[[RUN |1 PUBLIC_API_URL=https://api-v2.example.test /bin/sh -c echo ...]]

عنوان API عام مش مشكلة. بس الناس بتعدّي **أسرار** بنفس الطريقة: توكن لـ npm خاص، أو مفتاح API محتاجينه وقت البناء. والسر ده بيفضل في الصورة.

**البديل للأسرار: [[--mount=type=secret]]**. جرّبته بتوكن متألف:

| | النتيجة |
|---|---|
| وقت البناء | السر موجود ([[طول السر: 22]]) |
| [[docker history]] | **٠** ظهور |
| ملفات الصورة | **٠** ملفات فيها السر |
| [[/run/secrets]] بعد البناء | مش موجود |`,
          example: R`# Dockerfile — الإعداد بيتكتب جوه الملفات وقت البناء
FROM nginx:alpine
ARG PUBLIC_API_URL=http://localhost:4000
RUN echo "window.API_URL = '$PUBLIC_API_URL';" > /usr/share/nginx/html/config.js

# ابنيها بـ v1، وشغّلها بمتغير v2
docker build -t bake-demo --build-arg PUBLIC_API_URL=https://api-v1.example.test .
docker run -d --name bake -p 127.0.0.1:3201:80 -e PUBLIC_API_URL=https://api-v2.example.test bake-demo
docker exec bake printenv PUBLIC_API_URL
curl -s http://127.0.0.1:3201/config.js
docker history bake-demo --no-trunc --format "{{.CreatedBy}}"`,
          lines: [
            R`صورة nginx للموقع الثابت.`,
            R`[[ARG]] = متغير **وقت البناء بس**. وليه قيمة افتراضية.`,
            R`**بيتكتب في ملف.** بعد السطر ده، القيمة بقت جزء من الصورة.`,
            R`البناء بـ [[api-v1]].`,
            R`التشغيل بمتغير [[api-v2]]. وده اللي الناس بتعمله لما تغيّر [[.env]].`,
            R`الكونتينر شايف: [[https://api-v2.example.test]].`,
            R`والمتصفح بياخد: [[window.API_URL = 'https://api-v1.example.test';]] — **القديم**.`,
            R`و [[ARG]] باين في التاريخ لأي حد معاه الصورة.`,
          ],
          try: R`في مشروع فرونت إند عندك، ابني صورة، وبعدين غيّر عنوان الـ API في [[.env]] واعمل restart من غير build. افتح DevTools ← Network وشوف الطلبات رايحة فين. وبعدين [[docker history <صورتك> --no-trunc]] ودوّر على أي قيمة مش المفروض تبان.`,
          mac: ["both", R`نفس الحاجة. و [[--mount=type=secret]] محتاج BuildKit، وده الافتراضي في Docker Desktop وفي Docker 23 وأحدث على لينكس. وعلى ويندوز في Git Bash: اكتب [[MSYS_NO_PATHCONV=1]] قبل [[docker run ... cat /built.txt]]، وإلا Git Bash بيحوّل [[/built.txt]] لمسار ويندوز.`],
          deep: {
            why: R`الصورة بتتبني مرة وبتشتغل في أماكن كتير. فأي حاجة بتتكتب في الملفات وقت البناء بقت ثابتة في كل الأماكن دي، وأي حاجة اتعدّت كـ ARG بقت جزء من تاريخها.`,
            how: R`**الأسرار وقت البناء — الطريقة الصح:**

~~~dockerfile
# syntax=docker/dockerfile:1
FROM alpine:3.20
RUN --mount=type=secret,id=api_token \
    echo "طول السر: $(wc -c < /run/secrets/api_token)" > /built.txt
~~~

~~~bash
docker build -t secret-demo --secret id=api_token,src=token.txt .
docker run --rm secret-demo cat /built.txt
docker history secret-demo --no-trunc --format "{{.CreatedBy}}" | grep -c sk_test
~~~

~~~text اتشغّل فعلًا · Docker 29.6
طول السر: 22
0
~~~

السر بيتركّب كملف في [[/run/secrets/api_token]] **طول الـ RUN ده بس**، وبعدها مبيبقاش موجود. والاستخدام الأشهر: [[npm ci]] بتوكن registry خاص:

~~~dockerfile
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci
~~~

**مصيدة في الاختبار:** أول مرة دوّرت على السر بـ [[grep -r sk_test /]] جوه الكونتينر، فلقيت match في [[/proc/kallsyms]] — كلمة [[cpumask_test]] من الكيرنل. ده مش السر. دوّر على **القيمة كاملة** وفي فولدرات الصورة بس ([[/usr]] و [[/etc]] و [[/app]])، مش [[/proc]] و [[/sys]].

**والحل للفرونت إند اللي عايزه يتغيّر من غير build:** متكتبش الإعداد في الـ bundle. خلي nginx (أو سكربت صغير وقت التشغيل) يكتب [[config.js]] من المتغيرات وهو بيقوم:

~~~bash
# في entrypoint قبل nginx
echo "window.API_URL = '$PUBLIC_API_URL';" > /usr/share/nginx/html/config.js
exec nginx -g 'daemon off;'
~~~

والصفحة بتحمّل [[config.js]] قبل الـ bundle. كده نفس الصورة بتشتغل في staging و production بعناوين مختلفة. صورة nginx الرسمية بتدعم ده كمان: أي ملف في [[/etc/nginx/templates/*.template]] بيتعمله [[envsubst]] وقت التشغيل.

**وفي Next.js تحديدًا:** [[NEXT_PUBLIC_*]] بتتحط وقت البناء (من وثائق Next.js). والمتغيرات من غير [[NEXT_PUBLIC_]] بتتقري على السيرفر وقت التشغيل. فاسأل لكل متغير: «المتصفح محتاجه؟». لو أيوه، build arg ومش سر. لو لأ، [[env_file]] وقت التشغيل.`,
            when: R`أي فرونت إند في صورة Docker. وأي [[ARG]] بتكتبه — اسأل «القيمة دي ينفع تبان؟».`,
            mistakes: R`تغيّر [[.env]] وتعمل restart وتستنى الفرونت يتغيّر. أو تعدّي توكن كـ [[ARG]]. أو تفتكر [[ENV]] في الـ Dockerfile سري (هو كمان في الصورة). أو تحط سر في [[NEXT_PUBLIC_*]] — ده بيوصل للمتصفح حرفيًا.`
          },
          teach: R`## الموقف

مشروع فرونت إند حقيقي: عنوان الـ API بيتحط في الـ bundle **وقت البناء**. حد غيّره في [[.env]] على السيرفر، وعمل restart، والموقع لسه بيكلّم القديم.

أعدت تمثيله في أصغر صورة.

---

## ١. الصورة

~~~dockerfile Dockerfile
FROM nginx:alpine
ARG PUBLIC_API_URL=http://localhost:4000
RUN echo "window.API_URL = '$PUBLIC_API_URL';" > /usr/share/nginx/html/config.js
~~~

[[ARG]] = متغير **وقت البناء بس**. و [[RUN]] بيكتبه في ملف — فبقى جزء من الصورة.

---

## ٢. ابنيها بـ v1، وشغّلها بـ v2

~~~bash
docker build -t bake-demo --build-arg PUBLIC_API_URL=https://api-v1.example.test .
docker run -d --name bake -p 127.0.0.1:3201:80 -e PUBLIC_API_URL=https://api-v2.example.test bake-demo
docker exec bake printenv PUBLIC_API_URL
curl -s http://127.0.0.1:3201/config.js
~~~

~~~text اتشغّل فعلًا · Docker 29.6
https://api-v2.example.test                        <-- الكونتينر
window.API_URL = 'https://api-v1.example.test';    <-- اللي المتصفح بياخده
~~~

**الكونتينر شايف v2، والمتصفح بياخد v1.**

~~~text بعد build تاني بـ --build-arg PUBLIC_API_URL=https://api-v2.example.test
window.API_URL = 'https://api-v2.example.test';
~~~

---

## ٣. الفرق

| اتعدّى كـ | بيتحط فين | تغييره محتاج |
|---|---|---|
| [[ARG]] / [[--build-arg]] | **جوه ملفات الصورة** | build |
| [[ENV]] / [[-e]] / [[env_file]] | بيئة العملية | restart |

> المتصفح **مبيشوفش** متغيرات السيرفر. الكود اللي بيوصله نص ثابت، وأي قيمة فيه اتكتبت وقت ما اتعمل.

---

## ٤. والمصيدة التانية: [[ARG]] باين

~~~bash
docker history bake-demo --no-trunc --format "{{.CreatedBy}}"
~~~

~~~text اتشغّل فعلًا
RUN |1 PUBLIC_API_URL=https://api-v2.example.test /bin/sh -c echo "window.API_URL = ...
~~~

**أي حد معاه الصورة يشوف القيمة.** عنوان API عام؟ مفيش مشكلة. **توكن؟ مشكلة كبيرة.**

---

## ٥. الأسرار وقت البناء: [[--mount=type=secret]]

~~~dockerfile Dockerfile.secret
# syntax=docker/dockerfile:1
FROM alpine:3.20
RUN --mount=type=secret,id=api_token \
    echo "طول السر: $(wc -c < /run/secrets/api_token)" > /built.txt
~~~

~~~bash
docker build -t secret-demo --secret id=api_token,src=token.txt -f Dockerfile.secret .
docker run --rm secret-demo cat /built.txt
docker history secret-demo --no-trunc --format "{{.CreatedBy}}" | grep -c sk_test
docker run --rm secret-demo sh -c 'ls /run/secrets'
~~~

~~~text اتشغّل فعلًا (بتوكن متألف sk_test_not_a_real_key)
طول السر: 22                               <-- كان موجود وقت البناء
0                                          <-- مش في الـ history
ls: /run/secrets: No such file or directory  <-- ومش في الصورة
~~~

والاستخدام الأشهر:

~~~dockerfile
RUN --mount=type=secret,id=npmrc,target=/root/.npmrc npm ci
~~~

> **مصيدة اتعلمتها وأنا بختبر:** أول مرة دوّرت بـ [[grep -r sk_test /]] فلقيت match في [[/proc/kallsyms]] — كلمة [[cpumask_test]] من الكيرنل. دوّر على **القيمة كاملة**، وفي فولدرات الصورة بس.

---

## ٦. وعايز الفرونت يتغيّر من غير build؟

متكتبش الإعداد في الـ bundle. اكتبه **وقت التشغيل**:

~~~bash entrypoint قبل nginx
echo "window.API_URL = '$PUBLIC_API_URL';" > /usr/share/nginx/html/config.js
exec nginx -g 'daemon off;'
~~~

والصفحة بتحمّل [[config.js]] قبل الـ bundle. **نفس الصورة** في staging و production.

> صورة nginx الرسمية بتعمل ده لوحدها: أي ملف في [[/etc/nginx/templates/*.template]] بيتعمله [[envsubst]] وقت التشغيل.

---

## ٧. والسؤال لكل متغير

~~~text
المتصفح محتاجه؟
  أيوه  ->  build arg (أو config.js وقت التشغيل) — ومش سر أبدًا
  لأ    ->  env_file وقت التشغيل
~~~

في Next.js: [[NEXT_PUBLIC_*]] = المتصفح محتاجه = وقت البناء (من وثائق Next.js).

---

## الخلاصة

- [[ARG]] بيتكتب في الصورة، و [[ENV]] بيتقري وقت التشغيل.
- الفرونت إند: تغيير [[.env]] من غير build **مبيعملش حاجة**.
- [[ARG]] باين في [[docker history]].
- أسرار البناء: [[--mount=type=secret]].
- عايز صورة واحدة لكذا بيئة؟ [[config.js]] وقت التشغيل.`,
          sol: R`الـ ARG والـ ENV والـ history والسر، كلهم اتشغّلوا على Docker 29.6.1 بقيم متألفة. سلوك Next.js من وثائقه.`,
          solCode: R`docker build -t bake-demo --build-arg PUBLIC_API_URL=https://api-v1.example.test .
docker run -d --name bake -p 127.0.0.1:3201:80 -e PUBLIC_API_URL=https://api-v2.example.test bake-demo
docker exec bake printenv PUBLIC_API_URL
#   https://api-v2.example.test
curl -s http://127.0.0.1:3201/config.js
#   window.API_URL = 'https://api-v1.example.test';     <-- القديم

docker history bake-demo --no-trunc --format "{{.CreatedBy}}"
#   RUN |1 PUBLIC_API_URL=https://api-v2.example.test /bin/sh -c echo ...

# السر بـ --mount=type=secret:
#   طول السر: 22
#   في الـ history: 0
#   /run/secrets بعد البناء: No such file or directory`
        },

        {
          cmd: "الباك إند قام قبل الداتابيز",
          title: "depends_on بيستنى الكونتينر يبدأ، مش يبقى جاهز",
          learn: R`تخلي خدمة تستنى الداتابيز لحد ما ترد فعلًا، بـ healthcheck و [[service_healthy]].`,
          out: R`الباك إند بيقوم مرة واحدة ويلاقي الداتابيز جاهزة، من غير crash ولا restart loop.`,
          use: {
            prog: R`أغلب الباك إند بيتصل بالداتابيز مرة وهو بيقوم، ولو فشل بيقع. و [[depends_on]] لوحدها مبتمنعش ده.`,
            work: R`«بعد ما السيرفر عمل restart، الـ API مقامش لوحده» — لأن الداتابيز أخدت ٥ ثواني والـ API استنى صفر.`,
            net: R`«البورت مفتوح» و «الخدمة جاهزة» حاجتين مختلفتين. والـ healthcheck بيسأل السؤال التاني.`,
          },
          desc: R`ده كان في مشروع حقيقي فيه Mongo وباك إند: [[depends_on: { mongo: { condition: service_healthy } }]]. وده هو الصح. وعشان تعرف ليه، شوف اللي بيحصل من غيره.

**أعدت تمثيله بـ Postgres:** خدمة [[api]] بتتصل بالداتابيز مرة واحدة وهي بتقوم (زي أغلب الباك إند)، و [[depends_on: [db]]] بس:

[[api  exited  Exited (2) 6 seconds ago]]

[[psql: error: connection to server at "db" (172.20.0.2), port 5432 failed: Connection refused]]

**الـ API وقع.** لأن [[depends_on]] بالشكل ده بتستنى الكونتينر **يبدأ**، مش يبقى **جاهز**. والـ Postgres بياخد ثواني يجهّز نفسه.

ولاحظ إن [[db]] اتحلّت لـ IP عادي ([[172.20.0.2]]) — الشبكة شغالة، والاسم معروف. اللي مكانش موجود هو حد بيسمع على البورت.

**والإصلاح جزئين:**

**١. healthcheck على الداتابيز** — سؤال حقيقي «انت جاهز؟»:

[[test: ["CMD-SHELL", "pg_isready -U postgres -h 127.0.0.1"]]]

**٢. [[condition: service_healthy]]** على الخدمة اللي بتستنى.

**النتيجة:**

| الخطوة | |
|---|---|
| [[ready-db-1 Started]] | الداتابيز بدأت |
| [[ready-db-1 Waiting]] | compose بيستنى |
| [[ready-db-1 Healthy]] | الـ healthcheck عدّى |
| [[ready-api-1 Started]] | **دلوقتي بس** الـ API بدأ |

استنى **٧ ثواني**، والـ API اتصل من أول مرة: [[api: اتصلت بالداتابيز]].

**وليه [[-h 127.0.0.1]] في [[pg_isready]]؟** صورة Postgres الرسمية، وهي بتجهّز الداتابيز أول مرة، بتشغّل سيرفر مؤقت **من غير TCP** ([[listen_addresses='']] في [[docker-entrypoint.sh]] — شفتها في الصورة نفسها). و [[pg_isready]] من غير [[-h]] بيسأل على الـ socket، فممكن يقول «جاهز» للسيرفر المؤقت. بـ [[-h 127.0.0.1]] بيسأل على TCP، زي ما الـ API هيسأل. **وبكل صراحة:** جرّبت من غير [[-h]] تلات مرات والـ API اتصل في التلاتة — التهيئة على داتابيز فاضية سريعة، فالسباق ما حصلش. الـ [[-h]] احتياط ليه سبب واضح، مش باج شفته بعيني.`,
          example: R`services:
  db:
    image: postgres:16-alpine
    environment: { POSTGRES_PASSWORD: dev }
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -h 127.0.0.1"]
      interval: 2s
      timeout: 3s
      retries: 15
      start_period: 5s

  api:
    image: postgres:16-alpine
    environment: { PGPASSWORD: dev }
    command: ["sh", "-c", "psql -h db -U postgres -tAc 'select 1' && echo 'api: اتصلت بالداتابيز' && sleep infinity"]
    depends_on:
      db:
        condition: service_healthy`,
          lines: [
            R`الخدمات.`,
            R`الداتابيز.`,
            R`Postgres 16 على alpine.`,
            R`كلمة سر للتجربة — في الحقيقة من [[env_file]].`,
            R`**الـ healthcheck**: Docker بيشغّل الأمر ده جوه الكونتينر كل شوية.`,
            R`[[pg_isready]] بيسأل «بتقبل اتصالات؟». و [[-h 127.0.0.1]] عشان يسأل على TCP زي الـ API بالظبط.`,
            R`كل ثانيتين.`,
            R`لو الأمر أخد أكتر من ٣ ثواني، يتحسب فشل.`,
            R`١٥ فشل ورا بعض = [[unhealthy]].`,
            R`أول ٥ ثواني الفشل مبيتحسبش — وقت التهيئة.`,
            R`الخدمة اللي بتستنى. هنا [[psql]] بيمثّل باك إند بيتصل مرة وهو بيقوم.`,
            R`نفس الصورة عشان فيها [[psql]].`,
            R`كلمة السر.`,
            R`**اتصال واحد.** لو فشل، [[&&]] بتوقف والكونتينر بيخرج — زي الباك إند اللي بيقع.`,
            R`**الاستنى.**`,
            R`على [[db]].`,
            R`**[[service_healthy]]**: مش «بدأ» — «الـ healthcheck عدّى».`,
          ],
          try: R`شغّل الملف ده من غير الـ healthcheck و [[condition]] ([[depends_on: [db]]] بس)، وبص على [[docker compose ps -a]] و [[docker compose logs api]]. وبعدين رجّعهم وقيس الوقت. وجرّب [[docker compose ps]] وقت الانتظار — هتشوف [[(health: starting)]].`,
          mac: ["both", R`نفس الحاجة في الأنظمة التلاتة. وفي Git Bash على ويندوز، الأوامر شغالة زي ما هي.`],
          deep: {
            why: R`الكونتينر بيبدأ في ميلي ثانية، والداتابيز بتجهز في ثواني. والفرق ده بيعدّي في التطوير لأنك بتشغّل الداتابيز الأول وتستنى بنفسك، وبيظهر أول مرة السيرفر يعمل restart والكل يقوم سوا.`,
            how: R`**التلات أشكال لـ [[depends_on]]:**

| الشرط | بيستنى |
|---|---|
| [[depends_on: [db]]] | الكونتينر **يبدأ** |
| [[condition: service_healthy]] | الـ healthcheck **يعدّي** |
| [[condition: service_completed_successfully]] | الخدمة **تخلص** بـ exit 0 — للـ migrations |

**والتالتة مفيدة جدًا:**

~~~yaml
services:
  migrate:
    image: my-api
    command: ["npm", "run", "migrate"]
    depends_on: { db: { condition: service_healthy } }
  api:
    image: my-api
    depends_on:
      migrate: { condition: service_completed_successfully }
~~~

الداتابيز جاهزة ← الـ migrations اتعملت ← الـ API قام. بالترتيب، ومن غير سكربت.

**healthchecks لداتابيزات تانية:**

| الداتابيز | الأمر |
|---|---|
| Postgres | [[pg_isready -U postgres -h 127.0.0.1]] |
| MySQL | [[mysqladmin ping -h 127.0.0.1]] |
| Mongo | [[mongosh --quiet --eval "db.adminCommand('ping').ok"]] |
| Redis | [[redis-cli ping]] |

(شوف درس «healthchecks جاهزة» في نفس التاب للتفاصيل.)

**و [[service_healthy]] مش بديل إن الباك إند يعيد المحاولة.** هي بتحمي **وقت القيام** بس. لو الداتابيز وقعت بعد ساعة، الباك إند لازم يعيد الاتصال لوحده. فالاتنين مع بعض:

| | بيحمي من |
|---|---|
| [[service_healthy]] | القيام قبل الداتابيز |
| إعادة الاتصال في الكود | الداتابيز وقعت ورجعت |
| [[restart: unless-stopped]] | الباك إند نفسه وقع |

**ومصيدة [[restart: always]] من غير healthcheck:** الـ API بيقع، Docker بيقوّمه، بيقع تاني... وده بيبان في الـ logs كأنه شغّال. لو [[docker compose ps]] بيقول [[Restarting]] أو [[Up 2 seconds]] كل مرة تبص، ده هو.

**ولاحظ الـ IP في رسالة الخطأ:** [[connection to server at "db" (172.20.0.2)]]. يعني الاسم اتحلّ، والشبكة شغالة. والمشكلة **مش** نيتورك — مفيش حد بيسمع على البورت لسه. ورسالة [[Connection refused]] بالذات معناها كده: وصلت للجهاز، والبورت مقفول. ولو كانت مشكلة شبكة، كنت هتشوف [[could not translate host name]] أو timeout.`,
            when: R`أي خدمة بتعتمد على داتابيز أو cache أو أي حاجة محتاجة وقت عشان تجهز.`,
            mistakes: R`[[depends_on]] من غير [[condition]] وتفتكرها بتستنى. أو healthcheck بيسأل على الـ socket بدل TCP. أو [[service_healthy]] من غير إعادة اتصال في الكود. أو [[restart: always]] بيخبّي crash loop.`
          },
          teach: R`## الموقف

مشروع فيه داتابيز وباك إند. الباك إند بيتصل بالداتابيز **مرة واحدة** وهو بيقوم، ولو فشل بيقع. وده الطبيعي في أغلب الكود.

---

## ١. من غير healthcheck

~~~yaml compose.yml
services:
  db:
    image: postgres:16-alpine
    environment: { POSTGRES_PASSWORD: dev }
  api:
    image: postgres:16-alpine
    environment: { PGPASSWORD: dev }
    command: ["sh", "-c", "psql -h db -U postgres -tAc 'select 1' && echo 'api: اتصلت' && sleep infinity"]
    depends_on: [db]
~~~

~~~text اتشغّل فعلًا · Docker 29.6
api  exited   Exited (2) 6 seconds ago
db   running  Up 6 seconds

psql: error: connection to server at "db" (172.20.0.2), port 5432 failed: Connection refused
~~~

**الـ API وقع.** [[depends_on]] بالشكل ده بتستنى الكونتينر **يبدأ**، مش يبقى **جاهز**.

---

## ٢. اقرا رسالة الخطأ كويس

[[connection to server at "db" (172.20.0.2)]]

| الجزء | معناه |
|---|---|
| [[(172.20.0.2)]] | الاسم **اتحلّ** — الشبكة شغالة |
| [[Connection refused]] | وصلت للجهاز، **والبورت مقفول** |

فالمشكلة **مش نيتورك**. مفيش حد بيسمع لسه.

> لو كانت مشكلة شبكة: [[could not translate host name]] أو timeout.

---

## ٣. الإصلاح

~~~yaml compose.yml
services:
  db:
    image: postgres:16-alpine
    environment: { POSTGRES_PASSWORD: dev }
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -h 127.0.0.1"]
      interval: 2s
      timeout: 3s
      retries: 15
      start_period: 5s
  api:
    # ...
    depends_on:
      db:
        condition: service_healthy
~~~

~~~text اتشغّل فعلًا
Container ready-db-1  Started
Container ready-db-1  Waiting
Container ready-db-1  Healthy
Container ready-api-1 Started
استنى: 7 ثانية

api  running  Up 1 second
db   running  Up 7 seconds (healthy)

api-1  | 1
api-1  | api: اتصلت بالداتابيز
~~~

**٧ ثواني استنى، والـ API اتصل من أول مرة.**

---

## ٤. ليه [[-h 127.0.0.1]]؟

صورة Postgres، وهي بتجهّز الداتابيز أول مرة، بتشغّل سيرفر مؤقت **من غير TCP**:

~~~bash
docker run --rm --entrypoint sh postgres:16-alpine -c "grep -n listen_addresses /usr/local/bin/docker-entrypoint.sh"
~~~

~~~text اتشغّل فعلًا
292:	set -- "$@" -c listen_addresses='' -p "$__{PGPORT:-5432}"
~~~

[[pg_isready]] من غير [[-h]] بيسأل على الـ socket، فممكن يقول «جاهز» للسيرفر **المؤقت**. وبـ [[-h 127.0.0.1]] بيسأل على TCP — زي الـ API بالظبط.

> **بكل صراحة:** جرّبت من غير [[-h]] تلات مرات، والـ API اتصل في التلاتة. التهيئة على داتابيز فاضية سريعة، فالسباق ما حصلش قدامي. الـ [[-h]] **احتياط ليه سبب واضح في الكود**، مش باج شفته بعيني.

---

## ٥. التلات أشكال لـ [[depends_on]]

| الشرط | بيستنى |
|---|---|
| [[depends_on: [db]]] | الكونتينر **يبدأ** |
| [[service_healthy]] | الـ healthcheck **يعدّي** |
| [[service_completed_successfully]] | الخدمة **تخلص** بـ exit 0 |

~~~yaml التالتة للـ migrations
services:
  migrate:
    command: ["npm", "run", "migrate"]
    depends_on: { db: { condition: service_healthy } }
  api:
    depends_on:
      migrate: { condition: service_completed_successfully }
~~~

الداتابيز جاهزة ← الـ migrations اتعملت ← الـ API قام. **بالترتيب، من غير سكربت.**

---

## ٦. و [[service_healthy]] بتحمي القيام بس

| | بيحمي من |
|---|---|
| [[service_healthy]] | القيام قبل الداتابيز |
| إعادة الاتصال في الكود | الداتابيز وقعت بعد ساعة |
| [[restart: unless-stopped]] | الباك إند نفسه وقع |

**محتاج التلاتة.**

> ومصيدة [[restart: always]] من غير healthcheck: الـ API بيقع ويقوم ويقع. لو [[docker compose ps]] بيقول [[Up 2 seconds]] كل مرة تبص — ده crash loop.

---

## الخلاصة

- [[depends_on]] لوحدها = «بدأ»، مش «جاهز».
- healthcheck حقيقي + [[service_healthy]].
- [[pg_isready -h 127.0.0.1]]: اسأل على TCP زي الـ API.
- [[Connection refused]] بعد IP = البورت مقفول، مش نيتورك.
- migrations: [[service_completed_successfully]].
- والكود يعيد الاتصال برضه.`,
          sol: R`الوقوع والإصلاح، والسطر من [[docker-entrypoint.sh]]، كلهم اتشغّلوا على Docker 29.6.1 (postgres:16-alpine).`,
          solCode: R`# من غير healthcheck (depends_on: [db] بس):
#   api  exited  Exited (2) 6 seconds ago
#   psql: error: connection to server at "db" (172.20.0.2), port 5432 failed: Connection refused

# مع healthcheck + condition: service_healthy:
#   Container ready-db-1  Waiting
#   Container ready-db-1  Healthy
#   Container ready-api-1 Started
#   استنى: 7 ثانية
#   api-1 | api: اتصلت بالداتابيز

# ليه -h 127.0.0.1:
docker run --rm --entrypoint sh postgres:16-alpine -c "grep -n listen_addresses /usr/local/bin/docker-entrypoint.sh"
#   292:	set -- "$@" -c listen_addresses='' -p "$__{PGPORT:-5432}"
# (ومن غير -h: 3 تجارب، والـ API اتصل في التلاتة — احتياط مش باج اتشاف)`
        }
      ]
    }
]);

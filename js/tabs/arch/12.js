// تكملة تاب arch: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/arch/01.js (شرح حقول الدرس في أوله)
MORE("arch", [
    {
      t: "scaling والتكلفة والتسليم",
      l: 3,
      n: "المستخدمين زادوا: تكبّر بأنهي ترتيب، والفاتورة الشهرية جاية منين، وإزاي تسلّم مشروع حد تاني يقدر يشغّله",
      items: [
        {
          cmd: "scaling path",
          title: "المستخدمين زادوا ١٠ أضعاف: تعمل إيه بالترتيب",
          desc: R`قيس الأول وشوف فين عنق الزجاجة. بعدين صلّح الكود (indexes، و N+1، وكاش). بعدين كبّر السيرفر (vertical). وبعدين شغّل كذا نسخة ورا load balancer (horizontal).

الـ horizontal شرطه إن التطبيق يكون stateless: مفيش أي حاجة مهمة جوه الـ process. الـ sessions في القاعدة أو Redis، والملفات في S3، والـ cron في الـ queue، والـ sockets بـ Redis adapter، والـ rate limit والكاش في Redis.`,
          example: R`services:
  api:
    image: ghcr.io/you/myapp-api:1.4.0
    deploy:
      replicas: 3
    environment:
      REDIS_URL: redis://redis:6379
  worker:
    image: ghcr.io/you/myapp-api:1.4.0
    command: ["node", "dist/worker.js"]
  redis:
    image: redis:8-alpine`,
          try: R`شغّل ٣ نسخ من الـ api ورا Nginx (upstream على [[api:3000]]). سجّل دخول، وارفع صورة، وافتح socket، وشغّل الـ jobs. أي حاجة بتبوظ لما الطلب يروح لنسخة تانية، تبقى state لسه جوه الـ process. طلّعها.`,
          flag: "script",
          deep: {
            why: "أول رد فعل لما الموقع يبطأ «نكبّر السيرفر» أو «Kubernetes». بس لو المشكلة index ناقص، ١٠ سيرفرات هيضربوا القاعدة ١٠ أضعاف، وهتبقى أوحش. والترتيب الصح بيوفر فلوس ووقت.",
            how: R`١. قيس: الـ traces في Sentry، واستعلامات pg_stat_statements، و CPU والرام للسيرفر والقاعدة، و load test بـ k6 بشكل الترافيك المتوقع.

٢. صلّح الكود. ده غالبًا أكبر مكسب: index واحد، أو include بدل loop، أو كاش لصفحة الكورس.

٣. vertical: سيرفر أكبر. من غير أي تغيير في الكود، وبسعر معقول، بس ليه سقف، ولو وقع كل حاجة بتقع.

٤. افصل القاعدة على سيرفر لوحدها أو managed، عشان التطبيق والقاعدة ميتخانقوش على نفس الرام.

٥. horizontal: نسخ كتير ورا Nginx أو load balancer. وهنا شرط الـ stateless. [[replicas: 3]] في compose بيشغّل ٣ نسخ من غير ports ثابتة، و Nginx بيوصلهم بالاسم. وفي الـ deploy، النسخ بتتبدل واحدة واحدة، فالإغلاق النضيف لازم (تاب «Node و npm»).

٦. الشغل التقيل في workers منفصلة، بتكبّرها لوحدها. والـ worker هنا نفس الـ image بس بيشغّل ملف تاني.

٧. CDN للملفات والصفحات العامة.

٨. القاعدة نفسها: pooling، و read replicas، وده الدرس الجاي.

والـ socket.io على كذا نسخة محتاج Redis adapter عشان النسخ تكلّم بعض، و sticky sessions في الـ load balancer (نفس المستخدم يروح لنفس النسخة) وإلا هيطلع 400. والـ autoscaling والـ managed containers في تاب «Cloud و DevOps».`,
            when: "لما القياس يقول. مش قبل أول مستخدم. بس خلي التطبيق stateless من أول يوم، لأنه مش بيكلّف حاجة في الأول وبيوفر وجع كبير بعدين.",
            mistakes: R`في مشاريع حقيقية، ٣ حاجات كانت هتبوظ أول ما تبقى نسختين. rate limiter في الذاكرة، فكل نسخة بتعد لوحدها والحد بيتضاعف. و pub/sub للشات في الذاكرة (ومكتوب في الكود «سيرفر واحد بس»). و node-cron جوه السيرفر، فكل job هتشتغل مرتين. وكمان الملفات المرفوعة في فولدر uploads على السيرفر نفسه، فمع نسختين نص الصور يرجع 404. ومن الغلطات كمان: Kubernetes لمشروع فيه ١٠٠ مستخدم. أو تكبّر سيرفرات التطبيق والمشكلة في القاعدة.`
          },
          teach: R`## ملف compose فيه ٣ نسخ من الـ API، و worker، و Redis

المثال هو آخر خطوة في الترتيب (horizontal): نفس الـ image بيشتغل ٣ نسخ، و Nginx (في الـ solCode) بيوزّع عليهم، وكل الـ state المشتركة في Redis. جربناه بـ Docker Compose (Docker Desktop، ويندوز 11): بدل الـ image بتاعة المشروع (مش موجودة هنا) شغّلنا [[node:22-alpine]] بسيرفر صغير بيرد باسم الـ container، و [[nginx:alpine]] بالـ [[nginx.conf]] بتاع الـ solCode (من غير جزء الـ socket.io) على [[localhost:6040]].

---

## ١. compose سطر سطر

### [[services:]] ثم [[api:]]

[[services]] الخدمات اللي compose بيشغّلها، وكل واحدة ليها اسم. الاسم ده هو كمان اسمها على شبكة Docker: أي container تاني بيوصلها بـ [[api]].

### [[image: ghcr.io/you/myapp-api:1.4.0]]

- [[ghcr.io]]: GitHub Container Registry.
- [[:1.4.0]]: tag بنسخة. مش [[latest]]، عشان النسخ التلاتة يبقوا نفس الكود بالظبط، وعشان الـ rollback يبقى «رجّع للـ tag اللي قبله».

### [[deploy:]] ثم [[replicas: 3]]

٣ containers من نفس الخدمة. ومفيش [[ports]] للـ api: لو كتبت [[3000:3000]] التلاتة هيتخانقوا على نفس البورت. Nginx هو اللي ليه port برّه.

~~~text الناتج (docker compose ps)
teach-arch0506-scale-api-1 running
teach-arch0506-scale-api-2 running
teach-arch0506-scale-api-3 running
teach-arch0506-scale-nginx-1 running
~~~

### [[environment:]] ثم [[REDIS_URL: redis://redis:6379]]

متغيرات البيئة. [[redis://redis:6379]]: البروتوكول، واسم الخدمة [[redis]] (Docker DNS بيحوّله لـ IP)، والبورت. أي state مشتركة (الـ rate limit، والكاش، والـ queues، والـ socket adapter) هناك، مش في ذاكرة نسخة.

### [[worker:]] و [[command: ["node", "dist/worker.js"]]]

نفس الـ image، بس [[command]] بيغيّر الأمر اللي بيشتغل: ملف الـ worker بدل السيرفر. فبيتكبّر لوحده ([[--scale worker=2]]) من غير ما يزوّد نسخ الـ API.

### [[redis:]] و [[image: redis:8-alpine]]

[[alpine]] نسخة صغيرة من الـ image.

---

## ٢. الـ solCode: Nginx قدامهم

- [[upstream api { server api:3000; }]]: مجموعة اسمها [[api]] فيها عنوان واحد، بس الاسم ده Docker DNS بيرجّع له ٣ IPs:

~~~text الناتج (nslookup api من جوه container الـ nginx)
Name:	api   Address: 172.22.0.2
Name:	api   Address: 172.22.0.3
Name:	api   Address: 172.22.0.4
~~~

  و Nginx بيحوّل الاسم ده مرة واحدة وقت ما يشتغل، ويحط التلاتة في المجموعة.
- [[proxy_pass http://api;]]: ابعت الطلب للمجموعة.
- [[proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;]]: ضيف IP الزائر في الـ header، عشان التطبيق يعرف مين الزائر (في التجربة السيرفر طبع [[xff=172.22.0.1]]، وده IP بوابة Docker لأننا بنطلب من الويندوز نفسه).
- location الـ [[/socket.io/]]: [[Upgrade]] و [[Connection "upgrade"]] عشان WebSocket (درس «load balancer»).

### أول تجربة: كل الطلبات راحت لنسخة واحدة

~~~text الناتج (٦ طلبات بـ curl ورا بعض)
a2202bc8bad1
a2202bc8bad1
a2202bc8bad1
a2202bc8bad1
a2202bc8bad1
a2202bc8bad1
~~~

السبب: [[nginx:alpine]] بيشغّل [[worker_processes auto]]، يعني worker لكل core (١٦ هنا)، وكل worker عنده عداد round-robin لوحده. كل طلب جديد بيقع على worker لسه بادئ، فبياخد أول نسخة. بعد ٦٠ طلب التوزيع كان ٤٣ و ١٩ و ١٩. الحل سطر في الـ upstream:

~~~text nginx.conf
upstream api {
  zone api 64k;
  server api:3000;
}
~~~

[[zone api 64k]]: ذاكرة مشتركة بين الـ workers (٦٤ كيلو) فيها حالة المجموعة، فالعداد بقى واحد:

~~~text الناتج
f063b87ba944
a3786b5b3131
ce875dd5870e
f063b87ba944
a3786b5b3131
ce875dd5870e
60 req, zone:  20 api-1 / 20 api-2 / 20 api-3
~~~

### [[docker compose up -d --scale api=3]]

[[--scale]] بيغيّر العدد من سطر الأوامر. وجربنا نزوّد لـ ٤ والـ Nginx شغال: النسخة الرابعة مخدتش ولا طلب، لأن Nginx حوّل الاسم وقت التشغيل بس. بعد [[nginx -s reload]] الـ ٤ اتوزعوا ٢ و ٢ و ٢ و ٢. عشان كده الـ solCode فيه سطر الـ reload.

### [[docker compose logs -f api]]

لوجات كل النسخ مع بعض، وقبل كل سطر اسم النسخة ([[api-1 |]])، فتشوف التوزيع بعينك. [[-f]] = follow (يفضل يطبع الجديد).

---

## الخلاصة

| السطر | ليه |
|---|---|
| [[image: ...:1.4.0]] | كل النسخ نفس الكود، والـ rollback بالـ tag |
| [[replicas: 3]] من غير ports | Nginx بس اللي برّه |
| [[REDIS_URL]] | الـ state المشتركة برّه الـ process |
| [[worker]] بـ [[command]] | نفس الـ image، بيكبر لوحده |
| [[server api:3000]] | الاسم = ٣ IPs وقت تشغيل Nginx |
| [[zone api 64k]] | توزيع متساوي بين workers الـ Nginx |
| [[nginx -s reload]] | بعد ما تغيّر عدد النسخ |

وقبل كل ده: قيس، وصلّح الكود، وكبّر السيرفر. الـ horizontal آخر خطوة، وشرطها إن التطبيق stateless.`,
          lines: [
            "الخدمات:",
            "الـ API.",
            "image متعملها tag بنسخة، مش latest.",
            "إعدادات التشغيل:",
            "٣ نسخ. Nginx بيوزّع عليهم بالاسم api.",
            "المتغيرات:",
            "كل الـ state المشتركة في Redis، مش في الذاكرة.",
            "الـ worker.",
            "نفس الـ image...",
            "...بس بيشغّل ملف الـ worker، وبيكبر لوحده.",
            "Redis: للـ queues، والكاش، والـ rate limit، والـ socket adapter.",
            "image صغيرة."
          ],
          sol: R`الحاجات اللي هتبوظ لما الطلب يروح لنسخة تانية، بالترتيب اللي غالبًا هتقابله:

١. الـ rate limit: [[express-rate-limit]] بيخزن في الذاكرة افتراضيًا، فمع ٣ نسخ الحد الحقيقي بقى ٦٠ مش ٢٠. الحل store في Redis. ٢. الـ socket.io: الإشعار بيوصل بس لو المستخدم متصل بنفس النسخة اللي عملت [[notify]]، والـ polling ممكن يرجع [[Session ID unknown]] من غير sticky sessions. الحل Redis adapter، و [[ip_hash]] في Nginx أو websocket بس. ٣. الملفات: لو فيه أي حاجة بتتحفظ على الديسك المحلي، النسخة التانية مش شايفاها. الحل S3 أو R2. ٤. الـ cron جوه الـ API بيشتغل ٣ مرات. الحل job scheduler في الـ worker.

الـ login نفسه غالبًا مش هيبوظ: الـ JWT متوقّع بنفس السر في التلاتة، والـ refresh session في القاعدة. لو بيبوظ، يبقى السر مختلف بين النسخ، أو فيه كاش في متغير في الذاكرة. وأي state فضلت جوه الـ process بعد التجربة دي، هي اللي هتوقعك يوم الترافيك الحقيقي.`,
          solCode: R`# nginx.conf
upstream api {
  zone api 64k;      # حالة التوزيع مشتركة بين workers الـ Nginx
  server api:3000;   # الاسم بيتحوّل لـ IPs الـ 3 replicas وقت تشغيل Nginx
}
server {
  listen 80;
  location /socket.io/ {
    proxy_pass http://api;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
  location / {
    proxy_pass http://api;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}

# docker compose up -d --scale api=3
# لو غيّرت العدد بعدين: docker compose exec nginx nginx -s reload
# docker compose logs -f api   # شوف الطلبات بتتوزع على api-1 و api-2 و api-3`
        },
        {
          cmd: "scaling القاعدة",
          title: "القاعدة بقت هي عنق الزجاجة",
          desc: R`لما التطبيق بقى نسخ كتير، القاعدة بتبقى المكان اللي كله بيضرب فيه. الترتيب: استعلامات و indexes الأول، وبعدين connection pooling، وبعدين قاعدة أكبر، وبعدين read replicas للقراية، وبعدين تقسيم الجداول الكبيرة. وفي Prisma فيه extension بيوزّع القراية على الـ replicas والكتابة على الـ primary لوحده.`,
          example: R`import { PrismaClient } from "./generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { readReplicas } from "@prisma/extension-read-replicas";

const primary = new PrismaClient({ adapter: new PrismaPg({ connectionString: config.DATABASE_URL }) });
const replica = new PrismaClient({ adapter: new PrismaPg({ connectionString: config.DATABASE_REPLICA_URL }) });
export const db = primary.$extends(readReplicas({ replicas: [replica] }));

const courses = await db.course.findMany({ where: { published: true } });
const fresh = await db.$primary().order.findUnique({ where: { id: orderId } });`,
          try: R`اعمل replica بـ Docker (فيه images جاهزة بـ streaming replication)، أو استخدم قاعدة مُدارة فيها replica. وقّف الـ replication شوية، واعمل طلب ودفعة، واقرا حالة الطلب مرة من الـ replica ومرة بـ [[$primary()]]. هتشوف الـ lag بعينك.`,
          flag: "script",
          deep: {
            why: "التطبيق بيتكبّر بسهولة: نسخة زيادة. أما القاعدة فصعبة، لأن فيه مصدر واحد للحقيقة. وكل اتصال جديد بيها ليه تمن في الرام، فكتر النسخ ممكن يوقّعها حتى لو الاستعلامات سريعة.",
            how: R`الـ connections: كل اتصال بـ PostgreSQL بيبقى process على السيرفر وبياكل رام. والافتراضي حوالي ١٠٠ اتصال. لو عندك ١٠ نسخ، وكل واحدة فيها pool بـ ١٠، يبقى خلصوا. والـ serverless أسوأ، لأن كل function ممكن تفتح اتصال. الحل pooler زي PgBouncer بوضع transaction، أو الـ pooler بتاع المزوّد (Supabase عندها واحد)، وحد للـ pool في كل نسخة.

الـ read replicas: نسخة من القاعدة بتستقبل التغييرات من الـ primary باستمرار، وبتخدم القراية بس. بس النسخ بيبقى متأخر شوية، ملّي ثواني أو ثواني (replication lag). فلو الطالب دفع وفتح «كورساتي» في نفس اللحظة، والقراية راحت للـ replica، ممكن ميلاقيش الكورس. عشان كده القراية اللي بعد كتابة على طول ([[read-your-writes]]) بتروح للـ primary بـ [[$primary()]].

في Prisma 7 كل client محتاج driver adapter ([[@prisma/adapter-pg]])، والـ client نفسه بيتولّد في المسار اللي بتحدده في الـ schema. والـ extension بيبعت أي قراية للـ replica، وأي كتابة أو transaction للـ primary لوحده.

وبعد كده: تقسيم الجداول الكبيرة بالتاريخ (partitioning)، زي اللوجات والأحداث بالشهر. وأرشفة الداتا القديمة. والـ sharding (كل مجموعة عملاء على قاعدة) آخر حل خالص، لأنه بيعقّد كل حاجة.`,
            when: "لما القاعدة تبقى هي اللي CPU بتاعها عالي، أو الاتصالات قربت تخلص. والـ pooling بدري لو شغال serverless.",
            mistakes: R`إنك تبعت كل القراية للـ replica، بما فيها اللي بعد كتابة على طول، فالمستخدم يشوف داتا قديمة ويفتكر إن الدفع فشل. أو serverless من غير pooler، فالاتصالات تخلص. أو تكبّر القاعدة كل شهر بدل ما تصلّح index ناقص.`
          },
          teach: R`## client واحد بيوزّع لوحده: القراية للـ replica، والكتابة للـ primary

المثال بيعمل اتصالين (primary و replica)، ويركّب عليهم extension بيختار لكل query تروح فين. جربناه بـ Prisma 7.10 و [[@prisma/extension-read-replicas]] 0.5 على PostgreSQL 18 حقيقي: primary في Docker، و replica اتعملت بـ [[pg_basebackup -R]] وبتاخد التغييرات بـ streaming replication (ويندوز 11، Node 24).

---

## ١. الـ imports

- [[PrismaClient]] من [[./generated/prisma/client.js]]: في Prisma 7 الـ client بيتولّد جوه مشروعك في المسار اللي في [[output]] بتاع الـ schema، مش في [[node_modules]].
- [[PrismaPg]] من [[@prisma/adapter-pg]]: driver adapter، يعني Prisma بيكلّم PostgreSQL عن طريق مكتبة [[pg]]. في Prisma 7 ده إجباري.
- [[readReplicas]]: الـ extension.

## ٢. [[const primary = new PrismaClient({ adapter: new PrismaPg({ connectionString: config.DATABASE_URL }) });]]

من جوه لبرة: [[new PrismaPg({ connectionString })]] adapter بعنوان القاعدة، و [[new PrismaClient({ adapter })]] الـ client فوقه. ده الـ primary اللي بيستقبل الكتابة.

## ٣. [[const replica = new PrismaClient({ ... config.DATABASE_REPLICA_URL ... });]]

نفس الشكل بعنوان الـ replica. والـ replica قاعدة read-only:

~~~text الناتج
replica in recovery: true
~~~

[[pg_is_in_recovery()]] بـ [[true]] = بتطبّق WAL جاي من الـ primary ومبتقبلش كتابة.

## ٤. [[export const db = primary.$extends(readReplicas({ replicas: [replica] }));]]

[[$extends]] بيرجّع client جديد. [[replicas]] array، فممكن تحط كذا replica والـ extension بيختار واحدة عشوائي لكل قراية. القاعدة اللي بيمشي بيها: [[findMany]] و [[findUnique]] و [[count]] وأي قراية → replica. و [[create]] و [[update]] و [[$transaction]] والـ SQL الخام → primary:

~~~text الناتج
db.$queryRaw on replica? false | db.$primary() on replica? false
courses from replica: 1
~~~

---

## ٥. [[const courses = await db.course.findMany({ where: { published: true } });]]

قراية عادية، راحت للـ replica. تأخير ثانية في قايمة الكورسات محدش هيلاحظه.

## ٦. [[const fresh = await db.$primary().order.findUnique({ where: { id: orderId } });]]

[[$primary()]] بيرجّع client بيكلّم الـ primary بس. ليه؟ التجربة: وقّفنا تطبيق التغييرات على الـ replica، وعملنا طلب واتدفع:

~~~text الناتج
pause: {"pg_wal_replay_pause":""} paused: true
replica findUnique(new order): null
primary findUnique(new order): PAID
lag: PostgresInterval { seconds: 13, milliseconds: 308.408 }
after resume, replica: PAID
~~~

- [[pg_wal_replay_pause()]] على الـ replica: بتفضل تستقبل الـ WAL بس متطبقهوش، فده replication lag بإيدنا.
- [[db.order.findUnique]] (رايح للـ replica): [[null]]. الطالب دفع، والصفحة بتقوله «مفيش طلب».
- [[db.$primary()]]: [[PAID]].
- [[now() - pg_last_xact_replay_timestamp()]]: من إمتى آخر transaction اتطبقت. خلي بالك إن الرقم ده بيكبر كمان لو الـ primary مفيهوش كتابة خالص، فمش مقياس دقيق في الأوقات الهادية. الأدق [[replay_lag]] في [[pg_stat_replication]] على الـ primary.
- بعد [[pg_wal_replay_resume()]] الـ replica لحقت في أقل من ثانية.

---

## الخلاصة

| السطر | بيعمل إيه |
|---|---|
| [[primary]] | client للكتابة |
| [[replica]] | client لنسخة read-only |
| [[readReplicas({ replicas: [replica] })]] | القراية للـ replica والكتابة للـ primary لوحده |
| [[db.course.findMany]] | replica: قديم ثانية عادي |
| [[db.$primary().order.findUnique]] | بعد الدفع على طول: لازم primary |

وقبل الـ replicas: indexes، وحد للـ pool في كل نسخة، و pooler (PgBouncer) لو عندك نسخ كتير أو serverless.`,
          lines: [
            "الـ client المتولّد من الـ schema (Prisma 7).",
            "الـ driver adapter بتاع PostgreSQL.",
            "extension توزيع القراية.",
            "client للـ primary، اللي بيستقبل الكتابة.",
            "client للـ replica.",
            "client واحد بيوزّع لوحده: القراية للـ replica، والكتابة للـ primary.",
            "قراية عادية، بتروح للـ replica.",
            "قراية بعد دفع على طول، لازم من الـ primary عشان الـ lag."
          ],
          sol: R`الطريقة الأسهل عشان توقف الـ replication من غير ما تكسر حاجة: على الـ replica نفسها [[SELECT pg_wal_replay_pause();]]. الـ replica بتفضل تستقبل التغييرات بس مبتطبقهاش. تتأكد بـ [[SELECT pg_is_wal_replay_paused();]] (ترجع t)، وترجّعها بـ [[pg_wal_replay_resume()]].

وهي واقفة، اعمل طلب وادفعه. [[db.order.findUnique]] (بيروح للـ replica) هيرجّع [[null]] للطلب الجديد، أو [[PENDING]] لطلب قديم اتدفع. و [[db.$primary().order.findUnique]] هيرجّع [[PAID]]. وعلى الـ replica [[SELECT now() - pg_last_xact_replay_timestamp();]] بتقولك الـ lag بالثواني، وهيفضل يزيد طول ما هي واقفة. أول ما تعمل resume، الاتنين يتطابقوا في أقل من ثانية.

ده بالظبط سبب إن صفحة «بعد الدفع» و [[GET /orders/:id]] وأي قراية بعد كتابة لنفس المستخدم لازم تبقى [[$primary()]]. ولو الطلب اتعمل ورجع [[null]] من الـ replica في الوضع العادي من غير pause، يبقى الـ lag عندك كبير أصلًا، وده محتاج مراقبة.`,
          solCode: R`-- على الـ replica
SELECT pg_wal_replay_pause();
SELECT pg_is_wal_replay_paused();                    -- t
SELECT now() - pg_last_xact_replay_timestamp() AS lag;

-- بعد التجربة
SELECT pg_wal_replay_resume();`
        },
        {
          cmd: "التكلفة",
          title: "المشروع بيكلّف كام في الشهر، وليه",
          desc: R`كل قرار في المعمارية ليه سعر شهري. فيه تكاليف ثابتة (السيرفر، والقاعدة)، وتكاليف بتزيد مع الاستخدام (الباندويث، والتخزين، وعمولة الدفع، والإيميلات، ونداءات الـ AI). اعمل جدول قبل الإطلاق، وحط تنبيه ميزانية على كل حساب سحابي.

الأرقام في المثال تقريبية للتوضيح بس. الأسعار بتتغير، وراجع صفحة كل مزوّد.`,
          example: R`السيرفر (VPS للـ api والـ worker)        ثابت: من 10 لـ 50 دولار حسب المزوّد والحجم
PostgreSQL مُدارة بباك أب تلقائي           ثابت: من حوالي 15 دولار، وبيزيد مع الحجم
Redis                                    صغير، أو على نفس السيرفر في الأول
الفيديو والصور (تخزين + CDN)             متغير: بالـ GB المتخزن والـ GB اللي بيتفرج
الإيميل                                  مجاني لحد معين، وبعدين بعدد الإيميلات
Sentry و PostHog والـ uptime              الخطط المجانية كفاية في الأول
بوابة الدفع                              متغير: نسبة من كل عملية + مبلغ ثابت`,
          try: R`اعمل الجدول ده لمشروعك بأسعار حقيقية من صفحات المزوّدين. احسب التكلفة لـ ١٠٠ طالب، و ١٠٠٠، و ١٠٠٠٠، واقسمها على عدد الطلاب. بعدين قارنها بسعر الكورس بعد ما تشيل عمولة البوابة.`,
          flag: "script",
          deep: {
            why: "مشاريع كتير بتنجح في الاستخدام وتخسر فلوس، لأن التكلفة بتكبر أسرع من الإيراد. وأكبر فواتير الصدمة بتيجي من حاجة محدش حسبها: باندويث فيديو، أو لوجات، أو staging منسي شغال.",
            how: R`في منصة كورسات، أكبر تكلفة متغيرة هي الفيديو. ساعة فيديو 720p ممكن توصل لحوالي جيجا. يعني ١٠٠٠ طالب بيتفرجوا ١٠ ساعات في الشهر معناها حوالي ١٠ تيرا باندويث. لو المزوّد بيحاسب على خروج الداتا (egress) بالجيجا، الرقم ده لوحده ممكن يبقى أكبر من كل الباقي. عشان كده خدمات الفيديو المتخصصة، أو التخزين اللي مبيحاسبش على الـ egress، بتفرق جدًا. وده قرار معمارية، مش قرار محاسبة.

فكّر في unit economics: التكلفة لكل طالب نشط في الشهر، قصاد الإيراد منه بعد عمولة البوابة. لو الرقم الأول بيقرب من التاني، الـ scaling هيخسّرك.

حاجات بتتنسي: الـ staging شغال ٢٤ ساعة بنفس حجم الإنتاج. واللوجات والـ traces بتتحاسب بالحجم. ونداءات الـ AI بالتوكن، ومع كل مستخدم (تاب «الذكاء الاصطناعي»). والخطط المجانية ليها حدود، وبعضها بيوقف المشروع لو مفيش نشاط فترة.

تنبيه الميزانية على كل حساب سحابي (مثلًا عند ٥٠٪ و ١٠٠٪) بياخد دقيقتين، وبيمنع فاتورة بالآلاف من bug في loop.`,
            when: "قبل ما تختار المزوّدين، وقبل الإطلاق، وكل شهر بص على الفاتورة وقارنها بعدد المستخدمين.",
            mistakes: "إنك تعرض الفيديو mp4 مباشرة من VPS أو من bucket من غير CDN. أو مفيش تنبيه ميزانية. أو تشترك في خدمات مُدارة غالية قبل ما تحتاجها. أو تنسى عمولة البوابة وانت بتسعّر. أو تسيب بيئات تجربة شغالة شهور."
          },
          teach: R`## جدول بند بند: ثابت ولا بيزيد مع الاستخدام

المثال جدول تكاليف لمنصة الكورسات، كل سطر بند. المهم فيه مش الأرقام (بتتغير، وراجعها من صفحة كل مزوّد)، المهم تفرّق بين اللي ثابت واللي بيكبر مع المستخدمين. الحسابات اللي تحت شغّلناها بـ Node 24 عشان نتأكد منها.

---

## البنود سطر سطر

| البند | نوعه | بيكبر مع إيه |
|---|---|---|
| السيرفر (VPS للـ api والـ worker) | ثابت | بيقفز لما تحتاج نسخ أكتر |
| PostgreSQL مُدارة بباك أب تلقائي | ثابت | حجم الداتا. واللي بتدفع فيه فعلًا الباك أب و PITR |
| Redis | صغير | غالبًا على نفس السيرفر في الأول |
| الفيديو والصور (تخزين + CDN) | متغير | الـ GB المتخزن، والـ GB اللي بيتفرج |
| الإيميل | مجاني لحد معين | عدد الإيميلات |
| Sentry و PostHog والـ uptime | خطط مجانية | الأحداث والجلسات بعد حد معين |
| بوابة الدفع | نسبة + مبلغ ثابت | عدد العمليات وقيمتها، مش عدد الطلاب |

---

## أخطر بند: الفيديو

~~~text الناتج
video: 1000 students*10h*1GB = 10000 GB = 10 TB
~~~

ساعة 720p ممكن توصل لحوالي جيجا. ١٠٠٠ طالب × ١٠ ساعات في الشهر = ١٠ تيرا خروج داتا (egress) في الشهر. لو المزوّد بيحاسب على الـ egress بالجيجا، البند ده لوحده ممكن يبقى أكبر من كل الباقي. عشان كده اختيار خدمة فيديو أو تخزين من غير egress قرار معمارية.

## عمولة البوابة

~~~text الناتج
gateway: 500 EGP - 3% - 3 EGP = 482
~~~

كورس بـ ٥٠٠ جنيه، وعمولة ٣٪ ومبلغ ثابت ٣ جنيه (أرقام للتوضيح): يفضلك ٤٨٢. ده الرقم اللي تقارنه بتكلفة الطالب.

## unit economics

التكلفة لكل طالب نشط في الشهر = (الثابت ÷ عدد الطلاب) + المتغير لكل طالب. الثابت بيتقسم على ناس أكتر فبيصغر، والمتغير (الفيديو) بيفضل زي ما هو للطالب. لو المتغير لوحده قرب من الإيراد بعد العمولة، كل طالب جديد بيخسّرك.

---

## الخلاصة

- اكتب الجدول قبل ما تختار المزوّدين.
- فرّق بين الثابت والمتغير، واحسب لـ ١٠٠ و ١٠٠٠ و ١٠٠٠٠ طالب.
- الفيديو والـ egress أول حاجة تحسبها في منصة كورسات.
- العمولة تتشال من السعر قبل أي مقارنة.
- تنبيه ميزانية على كل حساب سحابي (عند ٥٠٪ و ١٠٠٪).`,
          lines: [
            "الحوسبة: ثابتة، وبتكبر لما تحتاج نسخ أكتر.",
            "القاعدة: الباك أب التلقائي و PITR هما اللي بتدفع فيهم.",
            "Redis: غالبًا رخيص في الأول.",
            "أخطر بند متغير في منصة فيديو: الباندويث.",
            "بيزيد مع عدد المستخدمين والإشعارات.",
            "أدوات المراقبة ليها خطط مجانية معقولة في البداية.",
            "العمولة بتتشال من كل عملية، فحطها في التسعير."
          ],
          sol: R`الشكل المتوقع: التكلفة الكلية بتزيد، بس التكلفة لكل طالب بتقل كتير. مثال بأرقام تقريبية (حط أسعار مزودينك الحقيقية): عند ١٠٠ طالب، السيرفر والقاعدة ثابتين حوالي ٣٠ لـ ٦٠ دولار في الشهر، يعني نص دولار تقريبًا لكل طالب. عند ١٠٠٠ نفس السيرفر غالبًا كفاية، فالطالب بسنتات. عند ١٠٠٠٠ البند اللي بيكبر هو الفيديو (التخزين والـ bandwidth)، وده اللي هيحدد التكلفة.

عمولة البوابة بند مختلف: نسبة من كل عملية (مع مبلغ ثابت ساعات)، فهي بتكبر مع المبيعات مش مع عدد الطلاب. اطرحها من سعر الكورس الأول. مثلًا كورس بـ ٥٠٠ جنيه وعمولة حوالي ٣٪ وجنيهات ثابتة، يفضلك حوالي ٤٨٠. قارن ده بتكلفة الطالب الشهرية مضروبة في عدد الشهور اللي بيتفرج فيها.

الغلطة الأشهر إن الفيديو يتحسب ثابت. طالب واحد بيتفرج على ١٠ ساعات بجودة عالية ممكن يسحب أكتر من ١٠ جيجا. والتانية إن الخطط المجانية (Sentry و PostHog والإيميل) تتحسب مجانية للأبد. حط الحد اللي بعده بتدفع، واحسب إمتى هتوصله.`
        },
        {
          cmd: "التوثيق والتسليم",
          title: "مشروع حد تاني يقدر يشغّله من غيرك",
          desc: R`المشروع اللي بيشتغل بس وانت موجود مش مشروع خلصان. التسليم معناه ٣ حاجات. أولًا حد جديد يشغّل المشروع على جهازه في ربع ساعة من الـ README. تانيًا يعرف يعمل deploy ويتصرف في المشاكل المشهورة من الـ runbook. تالتًا الحسابات والمفاتيح بقت باسم صاحب المشروع، مش باسمك.`,
          example: R`# myapp
## تشغيل على جهازك
pnpm i && cp apps/api/.env.example apps/api/.env && docker compose up -d db redis && pnpm dev
## المعمارية
web (Next.js) بيكلّم api (Express)، و api بيكلّم PostgreSQL، و worker بياخد jobs من Redis. الرسمة في docs/architecture.md
## النشر
merge على main، و CI بيعمل deploy على staging لوحده. الإنتاج: tag بيبدأ بـ v، وبعدين موافقة
## لما حاجة تقع
docs/runbook.md: الدفع مش بيتفعّل، الديسك مليان، الإيميلات مش بتوصل، ترجّع نسخة قديمة
## الحسابات والمفاتيح
مين صاحب الدومين و Paymob والسحابة والإيميل، والمفاتيح في password manager الشركة، مش هنا`,
          try: R`ادّي الـ repo لحد (أو لنفسك على جهاز تاني) من غير أي كلام. سجّل كل سؤال سأله، وكل خطوة وقف فيها. كل واحدة منهم سطر ناقص في الـ README.`,
          flag: "script",
          deep: {
            why: "المطوّر اللي بيمشي من المشروع بياخد معاه نص المعرفة. والعميل اللي استلم كود من غير توثيق هيدفع لمطوّر جديد أسبوعين عشان يفهم. والحسابات اللي على إيميلك الشخصي بتخلي العميل رهينة ليك، حتى لو مش قصدك.",
            how: R`حزمة التسليم فيها:
[[README.md]]: التشغيل على الجهاز، والسكربتات، والمعمارية في فقرة.
[[.env.example]]: كامل ومطابق للكود، ولازم يتفحص (config.ts هو الحقيقة).
[[docs/architecture.md]]: رسمة، والـ ERD، ومين بيكلّم مين.
[[docs/adr/]]: القرارات المهمة وسببها.
[[docs/runbook.md]]: لكل مشكلة مشهورة، إزاي تعرفها (الـ alert أو اللوج) وخطوات حلها.
توثيق الـ API: OpenAPI أو collection في Postman.
قايمة بالمشاكل المعروفة والديون التقنية، بصراحة.
فيديو قصير بيمشي على الكود.

والحسابات: الدومين، والـ DNS، والسيرفر، والقاعدة، وحساب التاجر في بوابة الدفع (باسم الشركة القانوني)، ومزوّد الإيميل، و OAuth app بتاع جوجل، ومتاجر التطبيقات. كل ده ينتقل لصاحب المشروع. وبعد التسليم، صلاحياتك تتشال أو تتقلل، والأسرار تتغير.

والتوثيق يعيش في الـ repo جنب الكود، ويتحدّث في نفس الـ PR اللي بيغيّر الحاجة (بند في الـ definition of done). التوثيق القديم الغلط أسوأ من مفيش توثيق، لأنه بيودّي في حتة غلط وانت واثق.`,
            when: "من أول يوم، مش آخر أسبوع. الـ README بيتكتب مع الـ skeleton، والـ runbook مع أول مشكلة في الإنتاج.",
            mistakes: R`في مشروع حقيقي، [[.env.example]] كان فيه اسم متغير غير اللي الكود بيقراه، ومفيش ولا متغير لبوابة الدفع الأساسية. أي حد جديد مش هيعرف يشغّل الدفع. وفي مشروع تاني، جذر المشروع كان فيه حوالي ٤٠ ملف FIX و REPORT محدش بيقراهم. مكانهم runbook واحد و ADRs قليلة. ومن الغلطات كمان: حسابات باسم المطوّر، أو أسرار في الـ README.`
          },
          teach: R`## README فيه ٥ عناوين: كل واحد بيجاوب سؤال هيتسأل

المثال README مختصر لمشروع حقيقي. الهدف إن حد جديد يشغّل المشروع ويعمل deploy ويعرف يتصرف من غير ما يكلمك. هنمشي عليه عنوان عنوان. ده توثيق، فمفيش ناتج غير سطر التشغيل اللي بنشرح فيه [[&&]] (جربناه في bash).

---

## ١. [[# myapp]] و [[## ...]]

[[#]] عنوان كبير و [[##]] عنوان أصغر في Markdown. GitHub بيعرض الـ README.md في صفحة الـ repo.

## ٢. «تشغيل على جهازك»: [[pnpm i && cp apps/api/.env.example apps/api/.env && docker compose up -d db redis && pnpm dev]]

أربع أوامر متوصلين بـ [[&&]]: كل واحد بيشتغل بس لو اللي قبله نجح (exit code صفر):

~~~bash
false && echo "never"; echo "exit=$?"; true && echo "runs"
~~~

~~~text الناتج
exit=1
runs
~~~

- [[pnpm i]]: سطّب الـ dependencies لكل الـ monorepo.
- [[cp apps/api/.env.example apps/api/.env]]: انسخ ملف الإعدادات المثال لملف حقيقي. [[.env.example]] في git (من غير أسرار)، و [[.env]] لأ.
- [[docker compose up -d db redis]]: شغّل خدمتين بس من ملف compose في الخلفية ([[-d]] = detached).
- [[pnpm dev]]: شغّل التطوير.

لو [[pnpm i]] فشل، الباقي مش هيشتغل، فاللي بيقرا يشوف أول error مش آخر واحد.

## ٣. «المعمارية»

سطرين: web (Next.js) بيكلّم api (Express)، والـ api بيكلّم PostgreSQL، والـ worker بياخد jobs من Redis. والتفاصيل في [[docs/architecture.md]].

## ٤. «النشر»

merge على main = deploy على staging لوحده. والإنتاج: tag بيبدأ بـ [[v]] ([[v1.4.0]]) وبعدين موافقة. اللي جديد يعرف إن الـ merge مش بيوصل للعملاء على طول.

## ٥. «لما حاجة تقع»

[[docs/runbook.md]]: لكل مشكلة مشهورة (الدفع مش بيتفعّل، الديسك مليان، الإيميلات مش بتوصل، ترجّع نسخة قديمة) إزاي تعرفها وخطوات حلها.

## ٦. «الحسابات والمفاتيح»

مين صاحب الدومين وبوابة الدفع والسحابة والإيميل، والمفاتيح فين (password manager الشركة). **عمر المفاتيح نفسها ما تتكتب في الـ README.**

---

## الخلاصة

| العنوان | السؤال اللي بيجاوبه |
|---|---|
| تشغيل على جهازك | «أشغّله إزاي؟» في أمر واحد |
| المعمارية | «مين بيكلّم مين؟» |
| النشر | «الكود بيوصل للإنتاج إزاي؟» |
| لما حاجة تقع | «الساعة ٢ بالليل، أعمل إيه؟» |
| الحسابات | «مين صاحب إيه، والمفاتيح فين؟» |

والاختبار الحقيقي: حد جديد يشغّل من الـ README بس، وكل سؤال سأله سطر ناقص.`,
          lines: [
            "أمر واحد: سطّب، وانسخ الإعدادات، وشغّل القاعدة و Redis، وشغّل التطوير.",
            "المعمارية في سطرين، والتفاصيل في ملف.",
            "النشر: staging لوحده، والإنتاج بـ tag وموافقة.",
            "المشاكل المشهورة وحلها في الـ runbook.",
            "الحسابات ملك مين، والمفاتيح فين. عمرها ما تتكتب هنا."
          ],
          sol: R`النتيجة الطبيعية لأول مرة: ٥ لـ ١٠ أسئلة. أشهرها: «نسخة Node كام؟» (حط [[.nvmrc]] أو [[engines]])، و «pnpm مش موجود» (اكتب [[corepack enable]])، و «الـ migrations مش شغالة» (سطر [[pnpm db:migrate]] ناقص)، و «مفيش داتا» (سطر الـ seed ناقص)، و «متغير X مش موجود» يعني [[.env.example]] ناقص، و «أعمل login بإيه؟» (يوزر تجربة في الـ seed).

كل سؤال من دول سطر في الـ README، والهدف إن حد جديد يشغّل المشروع في أقل من ١٥ دقيقة من غير ما يكلمك. ولو وقف في حاجة محتاجة حساب خارجي (Paymob، أو S3)، اكتب إزاي يشتغل من غيرها على جهازه: مثلًا وضع fake للبوابة، أو MinIO بدل S3.

علامة إنك خلصت: تكرر التجربة مع حد تاني (أو في container فاضي بـ [[git clone]] جديد)، ويشغّل من غير ولا سؤال.`
        }
      ]
    },
    {
      t: "مفاهيم الأنظمة الموزعة",
      l: 3,
      n: "الكلمات اللي بتتقال في أي system design: consistency و read-your-writes، و CAP و PACELC، و sharding و consistent hashing، و load balancers",
      items: [
        {
          cmd: "consistency و read-your-writes",
          title: "strong ولا eventual consistency، و «المستخدم لازم يشوف اللي كتبه»",
          desc: R`strong consistency معناها إن أي قراية بعد كتابة بتشوف الكتابة دي، من أي مكان. و eventual consistency معناها إن النسخ هتتفق «في الآخر»، بس ممكن قراية تشوف قيمة قديمة لفترة قصيرة. قاعدة PostgreSQL واحدة strong. وأول ما تضيف replica، أو كاش، أو search index، أو CDN، بقى عندك نسخ، والنسخ دي eventual.

المشكلة اللي بتبان للمستخدم: كتب تعليق وعمل refresh ومش لاقيه، لأن القراية راحت لـ replica متأخرة. الحل اسمه read-your-writes: المستخدم ده بالذات يقرا من الـ primary لفترة قصيرة بعد ما يكتب، والباقي يقرا من الـ replicas عادي.`,
          example: R`const STICKY_MS = 5000;

export function readYourWrites(req, res, next) {
  const lastWrite = Number(req.cookies.lw) || 0;
  req.reader = Date.now() - lastWrite < STICKY_MS ? db.$primary() : db;
  if (!["GET", "HEAD"].includes(req.method)) {
    res.cookie("lw", String(Date.now()), { httpOnly: true, secure: true, sameSite: "lax", maxAge: STICKY_MS });
  }
  next();
}

router.get("/courses/:id/comments", readYourWrites, async (req, res) => {
  res.json({ data: await req.reader.comment.findMany({ where: { courseId: req.params.id }, orderBy: { id: "desc" }, take: 20 }) });
});`,
          try: R`ارجع لدرس «scaling القاعدة» (فيه [[readReplicas]] و [[$primary()]]). ضيف الـ middleware ده، وتخيل replica متأخرة ٣ ثواني: اكتب جدول بـ ٤ أعمدة (الطلب، ومن مين، ويروح فين، ويشوف الجديد؟) لـ: الشخص اللي كتب بعد ثانية، وشخص تاني بعد ثانية، ونفس الشخص من موبايله بعد ثانية، ونفس الشخص بعد ١٠ ثواني.`,
          flag: "script",
          deep: {
            why: "أغلب الأنظمة الكبيرة eventual في أجزاء منها، ده مش عيب، ده تمن الـ scale. بس المستخدم مش مهتم بالمصطلح، مهتم إن «الحاجة اللي عملتها اختفت». والانترفيوز بتسأل: «أنهي أجزاء في تصميمك محتاجة strong وأنهي ينفع eventual؟» وده السؤال اللي بيفرّق.",
            how: R`strong بتيجي بتمن: كل كتابة لازم تستنى إن كل النسخ (أو أغلبها) تأكد، أو كل قراية تروح لمكان واحد. ده latency أعلى وأضعف لو جزء من الشبكة وقع. eventual أسرع وأرخص، بس لازم الكود والمنتج يستحملوا قراية قديمة.

قرر لكل داتا لوحدها. الرصيد، والمخزون، وحالة الدفع، والصلاحيات: strong (من الـ primary، وغالبًا جوه transaction). عدد المشاهدات، واللايكات، والتوصيات، ونتايج البحث: eventual عادي، وتأخير ثانية أو دقيقة محدش هيلاحظه.

ضمانات بين الاتنين ليها أسامي: read-your-writes (انت تشوف اللي كتبته)، و monotonic reads (متشوفش حاجة وبعدين تختفي لما تعمل refresh، يعني متتنقلش لـ replica أقدم)، و causal consistency (الرد ميظهرش قبل التعليق اللي بيرد عليه).

الـ middleware: cookie [[lw]] بوقت آخر كتابة، وأي قراية في الـ ٥ ثواني اللي بعدها تروح للـ primary. الرقم أكبر من الـ lag المعتاد بتاع الـ replica (قيسه بـ [[pg_stat_replication]] أو مقياس المزوّد). العيب إن الـ cookie مربوطة بالمتصفح: نفس الشخص من موبايله مش هيشوفها. البديل تخزين وقت آخر كتابة لكل مستخدم في Redis. وفيه طريقة أدق: تخزن الـ LSN (موقع الكتابة في الـ WAL) وتتأكد إن الـ replica عدّته.

والكاش نفس الموضوع: بعد التعديل امسح الكاش (درس «طبقات الكاش»)، أو ارجع النتيجة الجديدة للمستخدم من الـ response نفسه، والواجهة تحدّث الـ state (optimistic update) بدل ما تعمل refetch.`,
            when: "أول ما يبقى عندك replica، أو كاش بـ TTL، أو search index منفصل، أو أكتر من region. وفي الانترفيو كل ما ترسم نسختين من أي داتا.",
            mistakes: R`تقرا الرصيد أو حالة الطلب من replica قبل ما تقرر حاجة. أو تفتكر إن eventual يعني «ممكن تضيع». لأ، معناها «هتوصل متأخر». أو تحط كل حاجة على الـ primary عشان تريّح دماغك، فالـ replicas مالهاش لازمة. وفي الانترفيو: متقولش «هستخدم strong consistency في كل حاجة» من غير ما تقول التمن.`
          },
          teach: R`## middleware بيختار: القراية دي من الـ primary ولا من الـ replica

اللي لسه كاتب حاجة (في آخر ٥ ثواني) بيقرا من الـ primary، والباقي من الـ replica. والطريقة: cookie اسمها [[lw]] (last write) فيها وقت آخر كتابة. جربناه بـ Express 5 و cookie-parser و Prisma 7 بالـ [[readReplicas]] من درس «scaling القاعدة»، على primary و replica حقيقيين (PostgreSQL 18 في Docker، ويندوز 11، Node 24)، ووقّفنا الـ replica بـ [[pg_wal_replay_pause()]] عشان نعمل lag بإيدنا. وضفنا route [[POST]] للتعليقات عليه نفس الـ middleware.

---

## ١. [[const STICKY_MS = 5000;]]

٥٠٠٠ ملّي = ٥ ثواني. لازم يبقى أكبر من الـ lag المعتاد بتاع الـ replica.

## ٢. [[export function readYourWrites(req, res, next) {]]

middleware: بياخد الطلب والرد و [[next]] (كمّل للي بعدي).

### [[const lastWrite = Number(req.cookies.lw) || 0;]]

- [[req.cookies]]: cookie-parser بيحوّل header الـ Cookie لـ object.
- [[Number(...)]]: الـ cookie نص. ولو مش موجودة [[Number(undefined)]] = [[NaN]].
- [[|| 0]]: [[NaN]] قيمة falsy، فبتبقى صفر (يعني «مكتبش أبدًا»).

### [[req.reader = Date.now() - lastWrite < STICKY_MS ? db.$primary() : db;]]

- [[Date.now() - lastWrite]]: عدّى كام ملّي من آخر كتابة.
- [[? :]]: لو أقل من ٥ ثواني [[db.$primary()]]، غير كده [[db]] (اللي بيبعت القراية للـ replica).
- [[req.reader]]: بنحط المصدر على الطلب، والـ routes بتستخدمه.

> النسخة الأولى من المثال كانت [[req.read]]. الاسم ده محجوز: الطلب في Node stream، و [[req.read]] هي الدالة اللي Node بيقرا بيها الـ body. لما كتبنا عليها، أول [[POST]] وقّع السيرفر كله:
>
> ~~~text الناتج
> TypeError: stream.read is not a function
>     at resume_ (node:internal/streams/readable:1264:12)
> ~~~
>
> عشان كده [[req.reader]]. ومتحطش على [[req]] أي اسم موجود في Node أو Express ([[read]] و [[body]] و [[params]] و [[query]]...).

### [[if (!["GET", "HEAD"].includes(req.method)) { res.cookie("lw", String(Date.now()), { ... }); }]]

- الطلب كتابة ([[POST]] و [[PATCH]] و [[DELETE]])؟ سجّل وقتها في cookie.
- [[httpOnly: true]]: JavaScript في الصفحة ميشوفهاش.
- [[secure: true]]: HTTPS بس.
- [[sameSite: "lax"]]: متتبعتش مع طلبات من مواقع تانية (غير لينك عادي).
- [[maxAge: STICKY_MS]]: المتصفح يمسحها بعد ٥ ثواني.

~~~text الناتج (رد الـ POST)
Set-Cookie: lw=1791466864057; Max-Age=5; Path=/; Expires=Thu, 08 Oct 2026 13:41:09 GMT; HttpOnly; Secure; SameSite=Lax
~~~

[[Max-Age=5]] بالثواني (Express حوّل الملّي). والرقم وقت الكتابة بالملّي.

### [[next();]]

كمّل للـ route.

---

## ٣. الـ route: [[await req.reader.comment.findMany({ where: { courseId: req.params.id }, orderBy: { id: "desc" }, take: 20 })]]

آخر ٢٠ تعليق، من المصدر اللي اتختار.

~~~text الناتج (الـ replica واقفة)
same browser (cookie):  {"data":[{"id":10,"courseId":"c1","body":"تعليق جديد"}]}
other user (no cookie): {"data":[]}
same browser after 6s:  {"data":[]}
after resume, no cookie: {"data":[{"id":10,"courseId":"c1","body":"تعليق جديد"}]}
~~~

- اللي كتب شاف تعليقه فورًا (primary).
- حد تاني مش شايفه (replica متأخرة): ده eventual، ومقبول.
- بعد ٦ ثواني الـ cookie خلصت فرجع للـ replica. في التجربة الـ replica كانت لسه واقفة، فمشافوش. في الواقع الـ lag أقل من ثانية فهيشوفه. ولو الـ lag عدّى الـ ٥ ثواني في الزحمة، الحالة دي هي اللي هتفشل.
- بعد ما الـ replica كمّلت، الكل شايفه.

---

## الخلاصة

| مين بيقرا | الـ cookie | يروح فين | يشوف الجديد؟ |
|---|---|---|---|
| اللي كتب، نفس المتصفح، بعد ثانية | موجودة | primary | أيوه |
| حد تاني | مفيش | replica | لما الـ replica تلحق |
| اللي كتب من موبايله | مفيش (مربوطة بالمتصفح) | replica | لما تلحق (الحل: Redis بالـ userId) |
| اللي كتب بعد ٥ ثواني | خلصت | replica | لو الـ lag أقل من ٥ ثواني |`,
          lines: [
            "المدة اللي المستخدم يقرا فيها من الـ primary بعد ما يكتب.",
            "middleware بيختار مصدر القراية لكل طلب.",
            "إمتى آخر مرة الشخص ده كتب (من cookie).",
            "كتب من قريب؟ اقرا من الـ primary. غير كده من الـ replicas.",
            "الطلب ده كتابة (POST و PATCH و DELETE)؟",
            "سجّل وقتها في cookie بتعيش نفس المدة.",
            "قفلة.",
            "كمّل.",
            "قفلة.",
            "route قراية بيستخدم المصدر اللي اتختار.",
            "التعليقات. اللي لسه كاتب هيشوف تعليقه.",
            "قفلة."
          ],
          sol: R`الجدول المتوقع: (١) نفس الشخص بعد ثانية، من نفس المتصفح → الـ cookie موجودة → primary → يشوف تعليقه. (٢) شخص تاني بعد ثانية → مفيش cookie → replica → ممكن ميشوفوش، وده مقبول. (٣) نفس الشخص من موبايله بعد ثانية → الـ cookie على المتصفح التاني → replica → ممكن ميشوفوش، ودي الحالة اللي الـ cookie مبتغطيهاش (الحل Redis بالـ userId). (٤) نفس الشخص بعد ١٠ ثواني → الـ cookie خلصت → replica → يشوفه، لأن الـ lag (٣ ثواني) عدّى.

لو الـ lag وصل ١٠ ثواني في الزحمة، الحالة (٤) هتفشل. عشان كده الـ STICKY_MS بيتظبط على الـ lag الحقيقي، مع مراقبة وتنبيه لو الـ lag عدّى رقم معين.`
        },
        {
          cmd: "CAP و PACELC",
          title: "CAP و PACELC بكلام بسيط",
          desc: R`CAP بتقول: لما الشبكة تتقطع بين نسختين من الداتا (Partition)، لازم تختار: يا ترفض الطلبات عشان متقولش حاجة غلط (Consistency)، يا ترد بالداتا اللي عندك حتى لو قديمة (Availability). مينفعش الاتنين في نفس اللحظة. والتقطيع ده هيحصل، فالسؤال الحقيقي: لما يحصل، هتختار إيه؟

PACELC بتكمّل: وحتى لو الشبكة سليمة (Else)، فيه اختيار تاني كل يوم: Latency ولا Consistency. تستنى النسخ كلها تأكد (أبطأ وأدق)، ولا ترد بسرعة وتزامن بعدين.`,
          example: R`الموقف: قاعدتين في القاهرة وفرانكفورت، والشبكة بينهم وقعت دقيقتين
CP (اختيار الـ consistency): فرانكفورت ترفض الكتابة لحد ما الاتصال يرجع. الحجز والدفع والرصيد لازم كده
AP (اختيار الـ availability): الاتنين يكتبوا، ولما الشبكة ترجع تحل التعارض. سلة المشتريات واللايكات ينفع كده
PACELC في الأيام العادية: PostgreSQL بـ synchronous replica يستنى النسخة (EC)، والـ async replica بترد على طول (EL)
أمثلة: PostgreSQL قاعدة واحدة = CP عمليًا. DynamoDB و Cassandra = AP/EL افتراضيًا، وفيها خيار قراية strong
حل التعارض في AP: آخر كتابة تكسب (last-write-wins)، أو دمج (CRDT)، أو تسأل المستخدم
في الانترفيو: متقولش «هختار CA». الـ partition مش اختيار، هي بتحصل`,
          try: "خد منصة الكورسات، واكتب لكل جزء اختيارك لو الشبكة اتقطعت بين region مصر و region أوروبا: الدفع وتفعيل الكورس، وتقدم الطالب في الدروس، والتعليقات، وعدد المشاهدات، وتغيير الباسورد. واكتب جنب كل واحد: المستخدم هيشوف إيه وقت التقطيع؟",
          flag: "script",
          deep: {
            why: "CAP أشهر كلمة في أسئلة system design، وأكتر كلمة بتتقال غلط. المحاور مش عايز التعريف، عايز يشوفك بتربطها بقرار: «في الجزء ده هختار أرفض، وفي الجزء ده هختار أرد بقديم، وده السبب».",
            how: R`الـ C في CAP معناها linearizability: كل الناس بيشوفوا نفس آخر قيمة، كأن فيه نسخة واحدة. مش الـ C بتاعة ACID (القيود والقواعد جوه القاعدة). دي فرقة بتتسأل.

والـ A معناها إن كل نسخة شغالة لازم ترد (بنجاح) على أي طلب. مش «uptime ٩٩.٩٩٪».

ليه «CA» مش اختيار؟ لأن أي نظام على أكتر من جهاز ممكن الشبكة بينهم تقع. نظام على جهاز واحد مفيهوش partition أصلًا، بس ده مش موزّع. فالاختيار الفعلي CP ولا AP، ووقت التقطيع بس.

PACELC أهم في الشغل اليومي، لأن التقطيع نادر، بس الـ latency كل طلب. مثال: replica في region تاني. لو كل كتابة بتستنى تأكيده (synchronous)، كل كتابة زادت ٥٠ ملّي ثانية أو أكتر. لو مش بتستنى (async)، سريعة، بس لو الـ primary وقع ممكن آخر كام كتابة تضيع. وده بالظبط اختيار EC ولا EL.

القاعدة العملية: الحاجات اللي غلطها بيتحوّل فلوس أو صلاحيات → CP و EC. والحاجات اللي غلطها بيتحوّل رقم قديم شوية → AP و EL. ونفس المنتج فيه الاتنين.

وحل التعارضات في AP: last-write-wins أبسط حاجة، بس بتضيّع كتابات (لو اتنين عدّلوا في نفس الوقت، واحد بيروح). الـ CRDTs (زي عداد بيتجمع، أو set بيتدمج) بتدمج من غير ما تضيّع، وده اللي بيخلي Google Docs و Figma شغالين أوفلاين وبعدين يتدمجوا.`,
            when: "أول ما تصمم حاجة على أكتر من region، أو تختار قاعدة NoSQL موزّعة، أو تتسأل في انترفيو «لو الشبكة وقعت بين الـ data centers، إيه اللي بيحصل؟».",
            mistakes: R`«اخترت CA». أو إنك تقول CAP وتعرّف C كـ ACID consistency. أو إنك تقول «النظام بتاعي AP» على النظام كله، مع إن الدفع جواه لازم CP. أو تفتكر إن eventual consistency معناها داتا بتضيع. أو تنسى الـ PACELC خالص، مع إن الـ latency هي اللي بتفرق كل يوم.`
          },
          teach: R`## الفكرة: نسختين من الداتا، ولازم تختار وقت ما يبطّلوا يكلّموا بعض

المثال ٧ سطور، كل سطر حتة من الإجابة. هنمشي عليهم سطر سطر، وفي النص هنشوف اختيار PACELC بعينينا على PostgreSQL 18 حقيقي: primary و replica بـ streaming replication في Docker (ويندوز 11)، ووقّفنا الـ replica بـ [[docker pause]] عشان نمثّل إن الشبكة بينهم اتقطعت.

---

## ١. الموقف

قاعدتين في القاهرة وفرانكفورت، والشبكة بينهم وقعت دقيقتين. ده الـ **P** (Partition). كل نسخة شغالة، بس مش عارفة التانية بتعمل إيه.

## ٢. CP: ترفض الكتابة

فرانكفورت ترفض لحد ما الاتصال يرجع. الـ **C** (Consistency) هنا معناها: كل الناس بيشوفوا نفس آخر قيمة كأنها نسخة واحدة (linearizability)، مش الـ C بتاعة ACID. التمن: جزء من المستخدمين بياخدوا error. ده الصح للحجز والدفع والرصيد: «جرّب كمان شوية» أحسن من إن نفس الكرسي يتباع مرتين.

## ٣. AP: الاتنين يكتبوا

الـ **A** (Availability): كل نسخة شغالة بترد بنجاح. الاتنين بيقبلوا كتابة، ولما الشبكة ترجع لازم يتحل التعارض. ده مناسب للسلة واللايكات: أسوأ حاجة رقم قديم شوية.

## ٤. PACELC: الأيام العادية

**P**artition → **A** أو **C**، **E**lse (الشبكة سليمة) → **L**atency أو **C**onsistency. التقطيع نادر، بس الاختيار التاني بيحصل مع كل كتابة. جربناه:

### synchronous replica (EC)

[[synchronous_standby_names = '*']] على الـ primary: أي commit يستنى لحد ما الـ replica تأكد إنها كتبت الـ WAL.

~~~text الناتج
 walreceiver      | sync
INSERT 0 1
Time: 4.717 ms
~~~

[[pg_stat_replication]] بيقول الـ replica [[sync]]، والكتابة خدت ٤.٧ ملّي (الاتنين على نفس الجهاز، فالانتظار صغير. بين القاهرة وفرانكفورت كل commit هيستنى رحلة شبكة).

### الـ replica وقعت والنسخة sync

[[docker pause]] للـ replica، وبعدين نفس الـ INSERT:

~~~text الناتج
INSERT 0 1
Time: 65206.786 ms (01:05.207)
WARNING:  canceling wait for synchronous replication due to user request
DETAIL:  The transaction has already committed locally, but might not have been replicated to the standby.
~~~

- الـ primary فضل مستني **دقيقة كاملة** لحد ما لغينا الانتظار بإيدنا ([[pg_cancel_backend]] من session تانية). حتى [[statement_timeout = '3s']] مأثّرش على الانتظار ده. ده CP بالظبط: مفيش رد بنجاح من غير ما النسختين يتفقوا.
- والـ DETAIL مهم: الصف اتكتب محليًا قبل الانتظار، فلما الانتظار اتلغى بقى موجود في الـ primary ومش في الـ replica. في الإنتاج، لو الـ primary وقع في اللحظة دي ممكن الصف يضيع.

### async (EL)

[[SET synchronous_commit = local]]: متستناش الـ replica.

~~~text الناتج
INSERT 0 1
Time: 4.042 ms
~~~

والـ replica لسه واقفة: الكتابة نجحت على طول، والـ replica هتلحق لما ترجع. ده الافتراضي في PostgreSQL (من غير [[synchronous_standby_names]]).

## ٥. أمثلة

- PostgreSQL بقاعدة واحدة: مفيش نسخ تتقطع، فعمليًا CP.
- DynamoDB و Cassandra: افتراضيًا AP و EL، وفيهم قراية strong بتمن أعلى في الـ latency.

## ٦. حل التعارض في AP

- last-write-wins: آخر كتابة بالوقت تكسب. أبسط حاجة، بس كتابة بتضيع.
- CRDT: أنواع داتا بتتدمج من غير ما تضيّع (عداد بيتجمع، أو set بيتضم، أو «أكبر قيمة» لتقدم الطالب).
- تسأل المستخدم: زي «conflicted copy».

## ٧. CA مش اختيار

نظام على أكتر من جهاز الشبكة بينهم ممكن تقع. فالاختيار الحقيقي CP أو AP وقت ما ده يحصل، و EL أو EC باقي الوقت.

---

## الخلاصة

| الحالة | الاختيار | في PostgreSQL | المستخدم بيشوف |
|---|---|---|---|
| تقطيع، فلوس وحجز | CP | sync replica: الكتابة بتستنى | «جرّب كمان شوية» |
| تقطيع، لايكات وعدادات | AP | كل region يكتب ويتدمج بعدين | رقم قديم شوية |
| يوم عادي، دقة | EC | [[synchronous_standby_names]] | كل كتابة أبطأ |
| يوم عادي، سرعة | EL | async (الافتراضي) | آخر كتابات ممكن تضيع لو الـ primary وقع |`,
          lines: [
            "الموقف: نسختين، والشبكة بينهم وقعت.",
            "CP: ترفض بدل ما تقول حاجة غلط. للفلوس والحجز.",
            "AP: ترد وتكتب، وتصلّح بعدين. للحاجات اللي تستحمل.",
            "PACELC: حتى من غير تقطيع، تستنى النسخ (أدق) ولا ترد على طول (أسرع).",
            "أمثلة مشهورة لكل ناحية.",
            "لو اخترت AP، لازم تقول هتحل التعارض إزاي.",
            "الغلطة اللي بتتسأل: CA مش اختيار في نظام موزّع."
          ],
          sol: R`إجابة معقولة: الدفع وتفعيل الكورس → CP: region أوروبا يرفض أو يحوّل للـ region الأساسي، والمستخدم يشوف «الدفع مش متاح دلوقتي، جرّب بعد دقايق» بدل ما يدفع مرتين. تقدم الطالب → AP: يتسجّل محليًا ويتدمج بعدين بأكبر قيمة (التقدم مبيرجعش لورا، ده CRDT بسيط اسمه max). التعليقات → AP: تظهر لأهل الـ region ده الأول وبعدين للكل. عدد المشاهدات → AP: عدّادات في كل region وبتتجمع. تغيير الباسورد → CP: لازم يوصل للكل، وإلا الباسورد القديم يفضل شغال في region تاني.

المستخدم في CP بيشوف رسالة خطأ واضحة. وفي AP بيشوف داتا ناقصة شوية. لو كتبت «كله CP» أو «كله AP»، ارجع لكل سطر واسأل: الغلط هنا تمنه إيه؟`
        },
        {
          cmd: "sharding و consistent hashing",
          title: "sharding: تقسيم الداتا على قواعد، و consistent hashing",
          desc: R`الـ sharding معناه إن الداتا بتتقسم على كذا قاعدة، وكل قاعدة (shard) عليها جزء. بيتعمل لما قاعدة واحدة (حتى أكبر واحدة) مبقتش مستحملة الكتابة أو الحجم. ده آخر خطوة في درس «scaling القاعدة»، مش أولها.

التقسيم بيحتاج مفتاح (shard key). ٣ طرق مشهورة: hash للمفتاح، أو ranges (من كذا لكذا)، أو tenant (كل عميل أو مجموعة عملاء على shard). و consistent hashing طريقة بتوزّع المفاتيح على الـ shards، ولما تضيف shard جديد جزء صغير بس من الداتا يتنقل.`,
          example: R`import crypto from "node:crypto";
class HashRing {
  constructor(nodes, vnodes = 100) { this.points = []; nodes.forEach((n) => this.add(n, vnodes)); }
  hash(s) { return crypto.createHash("md5").update(s).digest().readUInt32BE(0); }
  add(node, vnodes = 100) {
    for (let i = 0; i < vnodes; i++) this.points.push({ h: this.hash($__bt$__{node}#$__{i}$__bt), node });
    this.points.sort((a, b) => a.h - b.h);
  }
  get(key) {
    const h = this.hash(key);
    let lo = 0, hi = this.points.length;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (this.points[mid].h < h) lo = mid + 1; else hi = mid; }
    return this.points[lo % this.points.length].node;
  }
}
const ring = new HashRing(["db-a", "db-b", "db-c"]);
const shard = ring.get(tenantId);`,
          try: R`حط ١٠٠٠٠ مفتاح ([[tenant-0]] لـ [[tenant-9999]]) على [[HashRing]] بـ ٣ shards، واحفظ كل مفتاح راح فين. ضيف shard رابع وعد كام مفتاح اتنقل. وبعدين كرر نفس الكلام بـ [[hash(key) % 3]] وبعدين [[% 4]]. قارن النسبتين.`,
          flag: "script",
          deep: {
            why: "الـ sharding هو الطريقة الوحيدة للكتابة إنها تكبر أفقيًا بعد حدود جهاز واحد. بس بيعقّد كل حاجة: joins بين shards، و transactions بين shards، والتقارير، والـ migrations. عشان كده بيتسأل في الانترفيو: عايزين يعرفوا إنك عارف إزاي، وإمتى متعملوش.",
            how: R`hash sharding: [[shard = hash(key) % N]]. توزيع متساوي، بس لو N اتغيرت (زودت shard) أغلب المفاتيح بتتنقل (في التجربة حوالي ٧٥٪ من ٣ لـ ٤). ده معناه نقل تقريبًا كل الداتا.

consistent hashing بيحل ده: المفاتيح والـ shards كلهم نقط على دايرة (أرقام الـ hash)، وكل مفتاح بيروح لأول shard بعده على الدايرة. لما تضيف shard، بياخد المفاتيح اللي قبله بس، يعني حوالي 1/N (في التجربة ٢٥٪ من ٣ لـ ٤). والـ virtual nodes (كل shard ليه ١٠٠ نقطة مش واحدة) بتخلي التوزيع متساوي، وبتخلي الـ shard الجديد ياخد حتة صغيرة من كل واحد بدل ما ياخد كتير من جار واحد. Cassandra و DynamoDB والـ caches الموزعة بتستخدم الفكرة دي.

range sharding: [[users A-M]] على shard و [[N-Z]] على تاني، أو بالتاريخ. الـ range queries سهلة ([[WHERE createdAt BETWEEN]] بتروح shard واحد). بس فيه hot spots: كل الكتابة الجديدة بتروح لآخر range.

tenant sharding: كل tenant (أو مجموعة tenants صغيرة) على shard. ده الأنسب لـ SaaS: كل queries العميل على shard واحد، فالـ joins والـ transactions شغالة عادي، والعميل الكبير ممكن ياخد shard لوحده. محتاج جدول صغير (directory) بيقول كل tenant فين، بدل hash، عشان تقدر تنقل عميل معين.

اختيار المفتاح أهم قرار: لازم يكون موجود في أغلب الـ queries (وإلا كل query بيسأل كل الـ shards، scatter-gather)، وتوزيعه متساوي (مش كله عند عميل واحد). والـ ids لازم تبقى فريدة على كل الـ shards (UUID أو Snowflake، مش auto-increment).

قبل الـ sharding اعمل: indexes، و replicas للقراية، وكاش، وقاعدة أكبر، و partitioning جوه نفس القاعدة (PostgreSQL declarative partitioning)، وأرشفة. ولو لازم، أدوات زي Citus لـ PostgreSQL بتعمل sharding من غير ما تعيد كتابة التطبيق.`,
            when: "لما قاعدة واحدة (بعد كل التحسينات والـ replicas) مش مستحملة الكتابة أو الحجم، أو العملاء محتاجين عزل أو داتا في بلد معين. في منتج جديد: تقريبًا أبدًا في أول سنة.",
            mistakes: R`sharding بدري «عشان نبقى جاهزين». أو shard key مش موجود في أغلب الـ queries. أو [[hash % N]] من غير خطة لما N يتغير. أو auto-increment ids على كل shard فتتكرر. أو تنسى إن الـ unique constraint على مستوى shard واحد بس (الإيميل unique في shard، مش في النظام كله). وفي الانترفيو: «إزاي تعمل resharding من غير توقف؟» (كتابة مزدوجة، ونسخ الداتا القديمة، وبعدين تحويل القراية، زي expand/contract).`
          },
          teach: R`## دايرة: كل shard ليه ١٠٠ نقطة، وكل مفتاح بيروح لأول نقطة بعده

[[HashRing]] بيحوّل أي نص لرقم، وبيحط الـ shards كنقط على دايرة أرقام، وأي مفتاح ([[tenantId]]) بيروح لأول نقطة بعد الرقم بتاعه. جربنا الكلاس زي ما هو بـ Node 24 (ويندوز 11) على ١٠٠٠٠ مفتاح ([[tenant-0]] لـ [[tenant-9999]]).

## ٠. [[import crypto from "node:crypto";]]

مكتبة الـ hash اللي جاية مع Node. السطر ده مكانش في النسخة الأولى من المثال، ومن غيره في ملف [[.mjs]] اسم [[crypto]] بيشاور على Web Crypto (الـ global اللي في المتصفح و Node)، ودي مفيهاش [[createHash]]:

~~~text الناتج (من غير الـ import)
TypeError: crypto.createHash is not a function
~~~

---

## ١. [[hash(s) { return crypto.createHash("md5").update(s).digest().readUInt32BE(0); }]]

من جوه لبرة:

1. [[crypto.createHash("md5")]]: آلة hash من نوع MD5. هنا مش للأمان، لأن كل اللي محتاجينه أرقام متوزعة بالتساوي.
2. [[.update(s)]]: ادّيها النص.
3. [[.digest()]]: الناتج ١٦ byte في Buffer.
4. [[.readUInt32BE(0)]]: اقرا أول ٤ bytes كرقم موجب ٣٢ bit (UInt32)، و BE = Big Endian يعني أول byte هو الأكبر. والرقم بيطلع من 0 لـ 2³²-1، حوالي ٤.٣ مليار.

~~~text الناتج
hash('tenant-42') = 3193582502
~~~

نفس النص بيدّي نفس الرقم دايمًا، على أي سيرفر. ده اللي بيخلي كل السيرفرات تتفق المفتاح ده على أنهي shard من غير ما تسأل حد.

---

## ٢. [[constructor(nodes, vnodes = 100)]] و [[add(node, vnodes = 100)]]

- [[this.points = []]]: النقط اللي على الدايرة.
- [[nodes.forEach((n) => this.add(n, vnodes))]]: ضيف كل shard.
- جوه [[add]]: [[for]] بيلف ١٠٠ مرة، وكل مرة [[this.hash($__bt$__{node}#$__{i}$__bt)]]، يعني [[db-a#0]] و [[db-a#1]] لحد [[db-a#99]]. ١٠٠ اسم مختلف = ١٠٠ رقم مختلف = ١٠٠ نقطة لنفس الـ shard. دي الـ **virtual nodes**.
- [[this.points.sort((a, b) => a.h - b.h)]]: رتّب النقط بالرقم، عشان نقدر نعمل بحث ثنائي. ([[a.h - b.h]] سالب يعني a الأول.)

~~~text الناتج (٣ shards)
points: 300 first 3: [{"h":12132831,"node":"db-c"},{"h":42012512,"node":"db-a"},{"h":67082814,"node":"db-b"}]
~~~

٣٠٠ نقطة، والـ shards متلخبطين على الدايرة، وده المطلوب.

---

## ٣. [[get(key)]]: البحث الثنائي

~~~javascript
let lo = 0, hi = this.points.length;
while (lo < hi) { const mid = (lo + hi) >> 1; if (this.points[mid].h < h) lo = mid + 1; else hi = mid; }
return this.points[lo % this.points.length].node;
~~~

- [[lo]] و [[hi]] حدود المكان اللي بندوّر فيه.
- [[(lo + hi) >> 1]]: [[>>]] shift لليمين بـ bit واحد = قسمة على ٢ من غير كسور ([[(7 + 10) >> 1]] = 8).
- لو النقطة اللي في النص أصغر من رقم المفتاح، الإجابة يمينها ([[lo = mid + 1]])، غير كده هي أو شمالها ([[hi = mid]]).
- في الآخر [[lo]] = أول نقطة رقمها أكبر من أو يساوي رقم المفتاح. ٣٠٠ نقطة محتاجة حوالي ٩ مقارنات بس.
- [[lo % this.points.length]]: لو المفتاح أكبر من آخر نقطة، [[lo]] بيبقى ٣٠٠، و [[300 % 300 = 0]]، فيلف لأول نقطة. ده اللي بيخليها «دايرة».

~~~text الناتج
ring.get('tenant-42') = db-b
~~~

---

## ٤. التجربة: ضيف shard رابع

### بالدايرة (١٠٠ نقطة لكل shard)

~~~text الناتج
vnodes=100 3 shards: {"db-a":3187,"db-b":3198,"db-c":3615}
vnodes=100 4 shards: {"db-a":2008,"db-b":2781,"db-c":2667,"db-d":2544} moved: 2544 25.4%
   moves: {"db-a->db-d":1179,"db-b->db-d":417,"db-c->db-d":948}
~~~

- التوزيع على ٣ قريب من التلت لكل واحد (٣١٨٧ و ٣١٩٨ و ٣٦١٥).
- اللي اتنقل ٢٥.٤٪، قريب من الربع: الـ shard الجديد خد حتته من الدايرة وبس.
- **كل** اللي اتنقل راح لـ [[db-d]]. مفيش مفتاح اتنقل بين القدام. وده المهم: نقل داتا أقل، ومن كل الـ shards القديمة (مش بالظبط بالتساوي: ١١٧٩ و ٤١٧ و ٩٤٨).

### بـ [[hash(key) % N]]

~~~text الناتج
modulo %3 -> {"0":3311,"1":3332,"2":3357}  %4 -> {"0":2542,"1":2459,"2":2474,"3":2525} moved: 7504 75.0%
~~~

[[%]] باقي القسمة. التوزيع متساوي جدًا، بس لما N اتغيرت من ٣ لـ ٤، ٧٥٪ من المفاتيح غيّرت مكانها، لأن باقي القسمة على ٣ وعلى ٤ بيتفقوا في ربع الأرقام بس. يعني إضافة shard = نقل تلات أرباع الداتا.

### من غير virtual nodes ([[vnodes = 1]])

~~~text الناتج
vnodes=1 3 shards: {"db-a":8931,"db-b":917,"db-c":152}
vnodes=1 4 shards: {"db-a":2969,"db-b":917,"db-c":152,"db-d":5962} moved: 5962 59.6%
~~~

٣ نقط بس على الدايرة، والمسافات بينهم عشوائية، فـ [[db-a]] خد ٨٩٪. والـ shard الجديد وقع جنب [[db-a]] فخد منه هو بس. الـ ١٠٠ نقطة بتقسّم الدايرة لحتت صغيرة كتير، فالتوزيع بيقرب من المتساوي.

---

## ٥. آخر سطرين

- [[const ring = new HashRing(["db-a", "db-b", "db-c"]);]]: الدايرة بتتعمل مرة واحدة وقت تشغيل التطبيق.
- [[const shard = ring.get(tenantId);]]: مع كل طلب: الـ tenant ده داتاه على أنهي قاعدة. بعدها بتختار الـ connection pool بتاع القاعدة دي.

---

## الخلاصة

| الطريقة | إضافة shard رابع نقلت | التوزيع |
|---|---|---|
| [[hash % N]] | ٧٥٪ | متساوي جدًا |
| دايرة بـ ١٠٠ vnode | ٢٥٪، وكله للـ shard الجديد | قريب من المتساوي |
| دايرة بنقطة واحدة | ٦٠٪ | واحد خد ٨٩٪ |

والأهم من الكود: اختار shard key موجود في أغلب الـ queries، وأجّل الـ sharding لحد ما كل حاجة تانية تخلص.`,
          lines: [
            "مكتبة الـ hash بتاعة Node. من غيرها، في ملف ESM اسم crypto بيشاور على Web Crypto اللي مفيهوش createHash.",
            "دايرة الـ hash.",
            "بتبدأ بالـ nodes، وكل واحد ليه ١٠٠ نقطة.",
            "hash رقمي من 0 لـ 4 مليار.",
            "إضافة node:",
            "١٠٠ نقطة بأسماء مختلفة لنفس الـ node على الدايرة.",
            "رتّب النقط.",
            "قفلة.",
            "المفتاح ده يروح فين؟",
            "الـ hash بتاعه.",
            "بحث ثنائي...",
            "...على أول نقطة بعده على الدايرة.",
            "ولو عدّى آخر نقطة، يلف لأول واحدة.",
            "قفلة.",
            "قفلة.",
            "دايرة بـ ٣ قواعد.",
            "الـ tenant ده على أنهي قاعدة."
          ],
          sol: R`النتيجة الفعلية على ١٠٠٠٠ مفتاح: consistent hashing من ٣ لـ ٤ shards نقل حوالي ٢٥٪ من المفاتيح (قريب من 1/4، وده المتوقع لأن الـ shard الجديد بياخد ربع الدايرة). و [[% 3]] ثم [[% 4]] نقل حوالي ٧٥٪.

يعني مع modulo، إضافة shard معناها نقل تلات أرباع الداتا، ومع الدايرة ربعها بس، وكله رايح للـ shard الجديد ومن كل الـ shards القديمة (بسبب الـ virtual nodes، بس مش بالظبط بالتساوي: في التجربة ١١٧٩ و ٤١٧ و ٩٤٨ مفتاح).

لو قلّلت [[vnodes]] لـ 1، هتلاقي التوزيع مش متساوي خالص (في التجربة shard واحد خد ٨٩٪)، وده ليه الـ virtual nodes موجودة.`
        },
        {
          cmd: "load balancer",
          title: "الـ load balancer: round-robin و least-connections، و L4 ولا L7",
          desc: R`الـ load balancer بيوزّع الطلبات على كذا نسخة من التطبيق، وبيشيل النسخة اللي وقعت من التوزيع (health checks). ده اللي بيخلي الـ scaling الأفقي ممكن.

خوارزميات التوزيع: round-robin (بالدور، الافتراضي)، و least-connections (للنسخة اللي عندها أقل طلبات شغالة دلوقتي)، و hash (نفس العميل لنفس النسخة). ونوعين حسب هو فاهم إيه: L4 بيشوف TCP بس (IP و port)، و L7 بيفهم HTTP (الـ path، والـ headers، والـ cookies).`,
          example: R`upstream api {
    least_conn;
    zone api 64k;
    server 10.0.0.11:3000 max_fails=3 fail_timeout=10s;
    server 10.0.0.12:3000 max_fails=3 fail_timeout=10s;
    server 10.0.0.13:3000 backup;
    keepalive 32;
}
server {
    listen 443 ssl;
    server_name api.myapp.com;
    location /socket.io/ {
        proxy_pass http://api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
    location / {
        proxy_pass http://api;
        proxy_http_version 1.1;
        proxy_set_header Connection "";
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_next_upstream error timeout http_502 http_503;
    }
}`,
          try: R`شغّل ٣ نسخ من API صغير على ports مختلفة، كل واحدة بترد باسمها بعد ٥٠ ملّي ثانية، ما عدا واحدة «عيانة» بترد بعد ٢ ثانية. حطهم ورا Nginx مرة بالافتراضي (round-robin) ومرة بـ [[least_conn]]. ابعت ٣٠ طلب، طلب كل ٣٠ ملّي ثانية من غير ما تستنى الرد، وعد كل نسخة خدت كام، واحسب متوسط وقت الرد. وبعدين وقّف نسخة وشوف إيه اللي بيحصل للطلبات.`,
          flag: "script",
          deep: {
            why: "من غير load balancer، التطبيق نسخة واحدة: لو وقعت أو اتعملها deploy، الموقع وقع. ومعاه، تقدر تزوّد نسخ، وتعمل deploy نسخة نسخة من غير توقف، وتشيل النسخة العيانة لوحدها. وفي الانترفيو، هو أول مربع بيترسم بعد الـ client.",
            how: R`round-robin ممتاز لو كل الطلبات شبه بعض في الوقت. بس لو فيه طلبات تقيلة (تقرير، أو رفع ملف)، نسخة ممكن يتجمع عليها تقيل وهي بتاخد نفس الدور. least-connections بيبص على الشغل الفعلي دلوقتي، فبيوزّع أحسن مع طلبات مختلفة المدة. والـ hash ([[ip_hash]] أو hash على cookie) بيخلي نفس العميل يروح لنفس النسخة (sticky sessions)، ودي محتاجها مع WebSocket أحيانًا، بس بتبوّظ التوزيع. الأحسن إن التطبيق يبقى stateless (الجلسات في القاعدة أو Redis، و socket.io بـ Redis adapter) ومتحتاجش sticky.

L4 (TCP): أسرع وأرخص، بيعدّي أي بروتوكول (قواعد بيانات، أو gRPC، أو TLS زي ما هو). مبيعرفش الـ path ولا الـ headers. أمثلة: AWS NLB، و HAProxy في mode tcp، و Nginx stream.

L7 (HTTP): بيفك الـ TLS، وبيقدر يوجّه [[/api]] لخدمة و [[/]] لخدمة، ويضيف headers ([[X-Forwarded-For]])، ويعيد الطلب على نسخة تانية لو الأولى رجعت 502، ويعمل rate limit وكاش. أمثلة: Nginx، و AWS ALB، و Cloudflare، و Caddy، و Traefik.

الـ health checks: Nginx المفتوح بيعمل passive (لو [[max_fails]] طلبات فشلت، يشيل النسخة [[fail_timeout]]). والـ active checks (يسأل [[/health]] كل شوية) في Nginx Plus أو HAProxy أو الـ load balancers المُدارة. ولازم [[/health]] يبقى خفيف (درس «health و uptime»).

[[proxy_next_upstream]]: لو النسخة وقعت أثناء الطلب، Nginx يجرب التانية. خلي بالك: ده آمن للـ GET. و Nginx افتراضيًا مش بيعيد POST بعد ما يكون بعته للنسخة إلا لو ضفت [[non_idempotent]]، وده مقصود، لأن الدفع ممكن يتعمل مرتين. (لو الاتصال نفسه اترفض قبل ما الطلب يتبعت، بيعيده عادي، لأنه أكيد متنفذش.)

[[keepalive]] مع [[Connection ""]] بيخلي Nginx يعيد استخدام الاتصالات للـ upstream بدل ما يفتح TCP جديد مع كل طلب. و WebSocket محتاج [[Upgrade]] و [[Connection "upgrade"]] في location لوحده. وحتى الـ load balancer نفسه ممكن يقع، فالمُدار (ALB) بيبقى أكتر من جهاز ورا DNS واحد، أو اتنين Nginx بـ IP عائم.`,
            when: "أول ما يبقى عندك أكتر من نسخة من التطبيق، أو محتاج deploy من غير توقف. وعلى PaaS زي Render و Railway و Fly فيه load balancer جاهز، بس لازم تعرف هو بيعمل إيه.",
            mistakes: R`sticky sessions عشان الجلسة في ذاكرة النسخة. أو [[/health]] تقيل بيسأل كل حاجة فالنسخ تطلع وتدخل. أو إعادة POST على نسخة تانية بعد timeout. أو تنسى [[X-Forwarded-For]] و [[trust proxy]] فكل الطلبات جاية من IP الـ load balancer. أو WebSocket من غير Upgrade headers فيفضل يعمل polling. وفي الانترفيو: «L4 ولا L7 لـ API عادي؟» L7، لأنك محتاج routing بالـ path و retries و headers، وL4 لما البروتوكول مش HTTP أو محتاج أقل latency.`
          },
          teach: R`## Nginx قدام ٣ نسخ: مين ياخد الطلب، وإيه اللي يحصل لو واحدة وقعت

الإعداد جزئين: [[upstream]] (المجموعة وطريقة التوزيع) و [[server]] (اللي بيستقبل من الإنترنت ويبعت للمجموعة). جربناه بـ [[nginx:alpine]] على شبكة Docker (Docker Desktop، ويندوز 11)، و ٣ نسخ Node صغيرة على ports [[7001]] و [[7002]] و [[7003]]: كل واحدة بترد باسمها بعد ٥٠ ملّي، ما عدا [[7003]] «عيانة» بترد بعد ٢ ثانية (زي الـ [[try]]). و client بيبعت ٣٠ طلب، طلب كل ٣٠ ملّي من غير ما يستنى. الفرق عن المثال: [[listen 80]] من غير SSL (مفيش شهادة هنا)، والتلات نسخ عادية مش واحدة [[backup]].

---

## ١. [[upstream api { ... }]]

مجموعة اسمها [[api]]. [[proxy_pass http://api]] بعدين بيشاور عليها بالاسم ده.

### [[least_conn;]]

ابعت للنسخة اللي عندها أقل اتصالات مفتوحة دلوقتي. من غيره الافتراضي round-robin (بالدور).

### [[zone api 64k;]]

Nginx بيشغّل كذا worker process ([[worker_processes auto]] = واحد لكل core، يعني ١٦ هنا). من غير [[zone]]، كل worker عنده عداداته لوحده، فـ least_conn مبيشوفش الاتصالات اللي في الـ workers التانية. [[zone]] بيحط حالة المجموعة في ذاكرة مشتركة (٦٤ كيلو كفاية). السطر ده مكانش في النسخة الأولى من المثال، والتجربة بينت ليه لازم:

~~~text الناتج (٣٠ طلب)
round-robin           {"b7001":10,"b7002":10,"b7003":10} avg ms: 709
least_conn + zone     {"b7001":14,"b7002":15,"b7003":1}  avg ms: 122
least_conn من غير zone {"b7001":10,"b7002":10,"b7003":10} avg ms: 708
~~~

- round-robin: تلت الطلبات راحت للعيانة واستنت ٢ ثانية، فالمتوسط حوالي ٧٠٠.
- least_conn مع zone: العيانة فضل عليها اتصال مفتوح، فاتشافت «مشغولة»، وخدت طلب واحد بس. المتوسط ١٢٢.
- least_conn من غير zone: نفس round-robin بالظبط، لأن كل worker شايف صفر اتصالات عند الكل.

### [[server 10.0.0.11:3000 max_fails=3 fail_timeout=10s;]]

- [[10.0.0.11:3000]]: IP خاص والبورت.
- [[max_fails=3]]: لو ٣ محاولات فشلت...
- [[fail_timeout=10s]]: ...جوه ١٠ ثواني، النسخة تتشال ١٠ ثواني، وبعدين Nginx يجرّبها تاني. ده الـ passive health check.

### [[server 10.0.0.13:3000 backup;]]

احتياطي: مبياخدش طلبات غير لو كل اللي فوقه واقعين.

### [[keepalive 32;]]

خلي لحد ٣٢ اتصال فاضي مفتوحين لكل worker مع النسخ، بدل TCP جديد لكل طلب.

---

## ٢. [[server { listen 443 ssl; server_name api.myapp.com; ... }]]

- [[listen 443 ssl]]: HTTPS (الشهادة في سطور [[ssl_certificate]] اللي مش في المثال، وتفاصيلها في تاب «Nginx»).
- [[server_name]]: الدومين.

### [[location /socket.io/ { ... }]]

- [[proxy_http_version 1.1]]: الـ upgrade لـ WebSocket محتاج HTTP/1.1.
- [[proxy_set_header Upgrade $http_upgrade;]] و [[Connection "upgrade"]]: مرّر طلب «حوّل الاتصال WebSocket». [[$http_upgrade]] قيمة header الـ Upgrade اللي جه من المتصفح.

### [[location / { ... }]]

- [[proxy_http_version 1.1]] و [[proxy_set_header Connection "";]]: امسح header الـ Connection (اللي ممكن يقول close) عشان الـ [[keepalive]] يشتغل.
- [[X-Forwarded-For $proxy_add_x_forwarded_for]]: ضيف IP الزائر للـ header، والتطبيق يقراه بـ [[trust proxy]].
- [[proxy_next_upstream error timeout http_502 http_503;]]: لو النسخة رجعت error في الاتصال، أو timeout، أو 502 أو 503، جرّب اللي بعدها.

---

## ٣. نسخة وقعت

### [[7003]] واقفة (الاتصال بيترفض)

~~~text الناتج
GET  {"b7001":16,"b7002":14} avg ms: 57
POST {"b7001":16,"b7002":14} avg ms: 58
[error] connect() failed (111: Connection refused) while connecting to upstream
~~~

ولا طلب فشل: Nginx سجّل الـ error وجرّب نسخة تانية. والـ POST كمان اتعاد، لأن الاتصال اترفض قبل ما الطلب يتبعت، فأكيد متنفذش.

### [[7003]] بتقفل الاتصال بعد ما تستلم الطلب

~~~text الناتج
POST {"502":3,"b7001":14,"b7002":13} avg ms: 51
[error] upstream prematurely closed connection while reading response header from upstream
~~~

هنا الطلب وصل للنسخة، و Nginx مش عارف اتنفذ ولا لأ، فمبيعيدش الـ POST (إلا لو ضفت [[non_idempotent]]) ويرجع 502. أول ٣ بس، وبعدها [[max_fails=3]] شالها. والـ GET في نفس الحالة اتعاد عادي.

---

## الخلاصة

| السطر | اللي شفناه |
|---|---|
| [[least_conn]] + [[zone]] | العيانة خدت ١ من ٣٠، والمتوسط من ٧٠٩ لـ ١٢٢ ملّي |
| [[least_conn]] من غير [[zone]] | زي round-robin بالظبط |
| [[max_fails]] / [[fail_timeout]] | بعد ٣ فشل، النسخة اتشالت |
| [[proxy_next_upstream]] | الـ GET دايمًا اتعاد، والـ POST بس لو متبعتش |
| [[keepalive]] + [[Connection ""]] | اتصالات بتتعاد استخدامها |
| [[Upgrade]] في location لوحده | WebSocket |`,
          lines: [
            "مجموعة نسخ التطبيق.",
            "وزّع على النسخة اللي عندها أقل طلبات شغالة.",
            "ذاكرة مشتركة بين workers الـ Nginx، عشان كلهم يشوفوا نفس العدادات (من غيرها least_conn بيبقى زي round-robin).",
            "نسخة، ولو فشلت ٣ مرات تتشال ١٠ ثواني.",
            "نسخة تانية بنفس الإعداد.",
            "نسخة احتياطي، مبتاخدش طلبات غير لو الباقي وقع.",
            "خلي ٣٢ اتصال مفتوحين للنسخ بدل اتصال جديد كل طلب.",
            "قفلة.",
            "الـ server اللي بيستقبل من الإنترنت.",
            "HTTPS.",
            "الدومين.",
            "مسار الـ WebSocket:",
            "ابعت للمجموعة.",
            "HTTP 1.1 لازم للـ upgrade.",
            "مرّر طلب الـ upgrade...",
            "...وخلي الاتصال يتحول WebSocket.",
            "قفلة.",
            "باقي الطلبات:",
            "ابعت للمجموعة.",
            "HTTP 1.1 عشان الـ keepalive.",
            "امسح Connection عشان الاتصال يفضل مفتوح.",
            "IP العميل الحقيقي للتطبيق.",
            "لو النسخة وقعت أو رجعت 502 أو 503، جرّب التانية (مش للـ POST افتراضيًا).",
            "قفلة.",
            "قفلة."
          ],
          sol: R`النتيجة في تجربة فعلية: round-robin وزّع ١٠ و ١٠ و ١٠ بالظبط، ومتوسط الرد حوالي ٧٠٠ ملّي ثانية، لأن تلت الطلبات راحت للنسخة العيانة واستنت ٢ ثانية. و [[least_conn]] بعت للنسخة العيانة طلب واحد بس و ١٥ و ١٤ للباقيين، ومتوسط الرد نزل لحوالي ١٢٠. السبب: النسخة العيانة فضل عليها اتصالات مفتوحة، فـ least_conn شافها «مشغولة» وبعت لغيرها.

خلي بالك: لو بعت الـ ٣٠ طلب في نفس اللحظة بـ [[Promise.all]]، الاتنين هيوزّعوا ١٠ و ١٠ و ١٠، لأن لحظة التوزيع كل النسخ عندها صفر اتصالات. الفرق بيبان بس لما الطلبات بتوصل على فترات، وده الواقع.

لما توقف نسخة: الطلبات اللي كانت رايحة لها بتفشل بـ [[connect() failed (111: Connection refused)]] في لوج Nginx، و [[proxy_next_upstream]] بيعيدها على نسخة تانية، فالـ GET بيعدّي (في التجربة الـ ٣٠ اتوزعوا ١٦ و ١٤ من غير ولا error). والنسخة بتتشال فترة وبعدين Nginx يجرّبها تاني. والـ POST كمان بيتعاد في الحالة دي، لأن الاتصال اترفض قبل ما الطلب يتبعت أصلًا. الـ POST بيرجع 502 لما النسخة تقع **بعد** ما استلمت الطلب (جربناها بنسخة بتقفل الاتصال: أول ٣ POST رجعوا 502، وبعدها النسخة اتشالت بسبب [[max_fails=3]])، لأن Nginx مش عارف الطلب اتنفذ ولا لأ.`
        }
      ]
    }
]);

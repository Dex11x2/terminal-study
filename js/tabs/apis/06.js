// تكملة تاب apis: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/apis/01.js (شرح حقول الدرس في أوله)
MORE("apis", [
    {
      t: "WebSockets على أكتر من سيرفر",
      l: 2,
      n: "socket.io شغال على سيرفر واحد. مع اتنين محتاج Redis بينهم، و load balancer بيودّي العميل لنفس السيرفر، وطريقة تكشف الاتصالات الميتة",
      items: [
        {
          cmd: "Redis adapter",
          title: "إشعار يوصل حتى لو المستخدم متصل بسيرفر تاني",
          desc: R`كل سيرفر socket.io عارف الاتصالات اللي عنده بس. لو المستخدم متصل بسيرفر ١، والطلب اللي عمل الإشعار راح لسيرفر ٢، [[io.to("user:42").emit()]] على سيرفر ٢ مش هيلاقي حد.

الـ Redis adapter بيحل ده: كل [[emit]] لـ room بيتنشر في Redis (pub/sub)، وكل السيرفرات مشتركة، وكل واحد بيوصّله للاتصالات اللي عنده. الكود بتاعك نفسه مبيتغيرش.`,
          example: R`import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
const pubClient = createClient({ url: config.REDIS_URL });
const subClient = pubClient.duplicate();
await Promise.all([pubClient.connect(), subClient.connect()]);
export const io = new Server(httpServer, {
  adapter: createAdapter(pubClient, subClient),
  cors: { origin: config.WEB_ORIGIN, credentials: true },
});
io.use(verifySocketToken);
io.on("connection", (socket) => socket.join($__btuser:$__{socket.data.userId}$__bt));
export const notify = (userId: string, n: unknown) => io.to($__btuser:$__{userId}$__bt).emit("notification", n);`,
          try: R`شغّل نسختين من السيرفر على بورتين (3001 و 3002) بنفس Redis. وصّل عميل على 3001، ونادي [[notify]] من endpoint تجربة على 3002: لازم الإشعار يوصل. وبعدين شيل الـ adapter وكرر: مش هيوصل. وجرّب [[(await io.in("user:42").fetchSockets()).length]] من 3002.`,
          flag: "script",
          deep: {
            why: "أول ما تشغّل نسختين من الـ API (عشان الضغط، أو عشان deploy من غير downtime)، نص الإشعارات بتضيع بهدوء: بتوصل للي حظه إنه على نفس السيرفر. ومفيش error في أي حتة. الـ adapter بيخلي الـ rooms «موجودة» على مستوى الـ cluster كله.",
            how: R`الـ adapter محتاج اتصالين بـ Redis: واحد بينشر ([[pub]]) وواحد مشترك ([[sub]])، لأن الاتصال اللي بيعمل SUBSCRIBE في Redis مبيقدرش يعمل أوامر تانية. [[duplicate()]] بيعمل اتصال تاني بنفس الإعدادات.

لما تعمل [[io.to(room).emit()]]: السيرفر بيبعت لاتصالاته المحلية في الـ room، وبينشر الرسالة في Redis. السيرفرات التانية بتستقبلها وتبعتها لاتصالاتها في نفس الـ room. [[socket.join]] نفسه محلي (كل سيرفر عارف مين عنده في أنهي room)، والـ adapter بيوزّع الـ broadcasts بس.

وفيه عمليات بتسأل كل السيرفرات: [[io.in(room).fetchSockets()]] بترجع الاتصالات من كل الـ cluster، و [[io.in(room).disconnectSockets()]] بيقفلهم (مفيد في logout)، و [[serverSideEmit]] لرسالة بين السيرفرات نفسها. دي بتستنى رد من كل سيرفر، فمتستخدمهاش في كل request.

Redis pub/sub مبيخزّنش: لو سيرفر كان بيعمل restart لحظة الـ emit، الرسالة دي ضاعت عليه. عشان كده الإشعار بيتحفظ في القاعدة الأول، والـ socket للسرعة بس (زي درس [[socket.io]] في تاب «بناء مشروع كامل»). وفيه adapter تاني مبني على Redis Streams بيقدر يكمّل بعد انقطاع قصير، ومعاه ميزة [[connectionStateRecovery]] في socket.io اللي بترجّع الرسايل اللي فاتت العميل لو فصل ثواني. الـ pub/sub adapter العادي مبيدعمهاش.

ونفس الفكرة لـ SSE أو WebSocket من غير socket.io: كل سيرفر بيعمل SUBSCRIBE على قناة في Redis، وأي publish بيوصل للكل.`,
            when: "أول ما يبقى عندك أكتر من process بيخدم الـ sockets: أكتر من container، أو PM2 cluster mode، أو deploy بيشغّل الجديد جنب القديم.",
            mistakes: R`تستخدم نفس اتصال Redis للـ pub والـ sub. وتفتكر إن الـ adapter لوحده كفاية من غير sticky sessions (الدرس الجاي). وتعتمد على الـ emit كأنه مضمون وتنسى تحفظ في القاعدة. وتنادي [[fetchSockets()]] في كل request فتعمل ضغط على كل السيرفرات. وسؤال انترفيو: «عندك chat app على ٣ سيرفرات، رسالة من يوزر على الأول لازم توصل ليوزر على التالت، إزاي؟»، والإجابة pub/sub مشترك (Redis adapter) و sticky sessions.`
          },
          teach: R`## الفكرة: الـ rooms بقت على مستوى كل السيرفرات

كل سيرفر socket.io عنده قايمة بالاتصالات اللي **عنده هو**. المثال بيضيف Redis في النص: أي [[emit]] لـ room بيتنشر في Redis، وكل السيرفرات مشتركة، وكل واحد بيوصّله لاتصالاته. الكود اللي بيعمل [[notify]] مبيتغيرش.

اتجرّب على ويندوز 11: socket.io 4.8.4 و [[@socket.io/redis-adapter]] 8.3.0 و [[redis]] (node-redis) 6.3.0 على Node 24.19. Redis 8 في Docker ([[docker run --rm -d --name teach-apis02-redis -p 6009:6379 redis:8-alpine]])، يعني [[REDIS_URL]] = [[redis://localhost:6009]]. نسختين من نفس السيرفر على ٦٠٠٥ و ٦٠٠٦ (مكان 3001 و 3002 في التجربة)، وفي كل واحد routes تجربة: [[/test/notify/42]] بينادي [[notify]]، و [[/test/count/42]] بيعمل [[fetchSockets]]. و [[verifySocketToken]] بيقبل توكن [[tok-42]] بس ويحط [[socket.data.userId = "42"]]. العميل [[socket.io-client]] 4.8.4 من Node.

---

## ١. الـ imports

~~~ts
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
~~~

| المكتبة | بتعمل إيه |
|---|---|
| [[socket.io]] | سيرفر الـ sockets |
| [[@socket.io/redis-adapter]] | الحتة اللي بتخلي الـ broadcasts تعدّي على Redis |
| [[redis]] | العميل الرسمي لـ Redis في Node |

## ٢. اتصالين بـ Redis

~~~ts
const pubClient = createClient({ url: config.REDIS_URL });
const subClient = pubClient.duplicate();
await Promise.all([pubClient.connect(), subClient.connect()]);
~~~

- [[pubClient]]: بيعمل [[PUBLISH]] (ينشر).
- [[subClient]]: بيعمل [[SUBSCRIBE]] (يسمع). في Redis، الاتصال اللي اشترك بيدخل «وضع الاشتراك» ومبيقدرش يعمل أوامر عادية، فلازم اتصال منفصل.
- [[duplicate()]]: اتصال تاني بنفس الإعدادات (نفس الـ URL).
- [[Promise.all([...])]]: افتح الاتنين مع بعض واستنى لحد ما الاتنين يخلصوا. و [[await]] هنا top-level (برا أي دالة)، وده شغال في ES modules بس (ملف [[.mjs]] أو [[.mts]] أو [[type: module]]). جربناه في ملف [[.ts]] في مشروع CommonJS والـ build وقع بـ [[Top-level await is currently not supported with the "cjs" output format]].

بعد التشغيل، Redis شايف ٤ اتصالات (٢ لكل سيرفر):

~~~text الناتج (redis-cli CLIENT LIST، أعمدة مختارة)
id=13 sub=0 psub=0 cmd=publish
id=14 sub=3 psub=1 cmd=subscribe
id=15 sub=3 psub=1 cmd=subscribe
id=16 sub=0 psub=0 cmd=publish
~~~

[[sub]] عدد القنوات اللي الاتصال مشترك فيها، و [[psub]] عدد الـ patterns (اشتراك بنمط زي [[socket.io#/#*]]).

## ٣. السيرفر بالـ adapter

~~~ts
export const io = new Server(httpServer, {
  adapter: createAdapter(pubClient, subClient),
  cors: { origin: config.WEB_ORIGIN, credentials: true },
});
~~~

- [[httpServer]]: سيرفر HTTP العادي، و socket.io بيركب عليه.
- [[adapter]]: المكان اللي socket.io بيسأله «مين في الـ room دي؟ وابعت لهم». الافتراضي في الذاكرة. ده بيضيف Redis.
- [[cors]]: الواجهة بس ([[WEB_ORIGIN]]) تقدر تتصل من المتصفح، و [[credentials: true]] تبعت الكوكيز.

## ٤. الـ auth والـ room

~~~ts
io.use(verifySocketToken);
io.on("connection", (socket) => socket.join($__btuser:$__{socket.data.userId}$__bt));
~~~

- [[io.use]]: middleware بيشتغل مرة قبل ما الاتصال يتقبل. لو نادى [[next(new Error(...))]] الاتصال بيترفض:

~~~text الناتج (عميل بتوكن غلط)
connect_error: unauthorized
~~~

- [[connection]]: اتصال جديد اتقبل.
- [[socket.join(room)]]: دخّل الاتصال ده room اسمه [[user:42]]. أي جهاز للمستخدم ٤٢ بيدخل نفس الـ room.

~~~text الناتج (log سيرفر ٦٠٠٥)
6005 connected HHB_AfxlOD3dg4i2AAAA rooms: [ 'HHB_AfxlOD3dg4i2AAAA' ]
6005 rooms now: [ 'HHB_AfxlOD3dg4i2AAAA', 'user:42' ]
~~~

كل socket بيبقى في room باسم الـ id بتاعه لوحده من الأول، و [[join]] زوّد [[user:42]]. والـ join ده **محلي**: سيرفر ٦٠٠٦ مش عارف عنه حاجة.

## ٥. [[notify]]

~~~ts
export const notify = (userId: string, n: unknown) => io.to($__btuser:$__{userId}$__bt).emit("notification", n);
~~~

[[io.to(room).emit(event, data)]]: ابعت حدث اسمه [[notification]] لكل اللي في الـ room. مع الـ adapter ده بيعمل حاجتين: بيبعت لاتصالاته المحلية، **وبينشر** في Redis. راقبنا Redis بـ [[MONITOR]] وقت ما نادينا notify على ٦٠٠٦:

~~~text الناتج (redis-cli MONITOR، مقصوص)
"PUBLISH" "socket.io#/#user:42#" "\x93\xa65IC-AE\x83\xa4type\x02\xa4data\x92\xacnotification\x81\xa4text\xafhello from 6006..."
~~~

القناة اسمها [[socket.io#/#user:42#]]: [[/]] الـ namespace الافتراضي، وبعدها اسم الـ room. والرسالة مضغوطة بـ msgpack (شكل binary)، بس تقدر تشوف جواها [[notification]] و [[hello from 6006]]. سيرفر ٦٠٠٥ مشترك في [[socket.io#/#*]]، فوصلته، وبعتها للعميل اللي عنده.

---

## ٦. التجربة: العميل على ٦٠٠٥ والإشعار من ٦٠٠٦

~~~bash
node client.mjs 6005
curl -s localhost:6006/test/notify/42
curl -s localhost:6006/test/count/42
curl -s localhost:6005/test/count/42
~~~

### بالـ adapter

~~~text الناتج
notified via 6006
fetchSockets on 6006: 1
fetchSockets on 6005: 1

client connected to 6005 id HHB_AfxlOD3dg4i2AAAA transport websocket
notification: {"text":"hello from 6006"}
~~~

الإشعار عدّى من سيرفر للتاني. و [[fetchSockets()]] على ٦٠٠٦ رجّعت 1 مع إن الاتصال مش عنده: الـ adapter سأل كل السيرفرات عن طريق قنوات [[socket.io-request#/#]] و [[socket.io-response#/#]] (اللي ظهروا في [[PUBSUB CHANNELS]])، واستنى ردهم.

### من غير الـ adapter (نفس الكود من غير سطر [[adapter]])

~~~text الناتج
notified via 6006
fetchSockets on 6006: 0
fetchSockets on 6005: 1
notified via 6005

client connected to 6005 id 3EbGyDxj-NgLUu7-AAAA transport websocket
notification: {"text":"hello from 6005"}
~~~

إشعار ٦٠٠٦ **ضاع**: ولا error ولا تحذير. اللي وصل بس اللي اتبعت من نفس السيرفر. وده بالظبط شكل المشكلة في الإنتاج: «الإشعارات بتوصل ساعات».

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[pubClient]] + [[subClient = duplicate()]] | اتصال الاشتراك مبيعملش أوامر تانية |
| [[adapter: createAdapter(pub, sub)]] | كل broadcast لـ room يعدّي على Redis |
| [[socket.join("user:42")]] | محلي، على السيرفر اللي الاتصال عليه |
| [[io.to(room).emit(...)]] | من أي سيرفر، بيوصل للـ room على كل السيرفرات |
| [[fetchSockets()]] | بيسأل كل السيرفرات ويستنى، فمتستخدمهاش في كل request |

- من غير الـ adapter مفيش error: الرسالة بتضيع بهدوء.
- Redis pub/sub مبيخزّنش: السيرفر اللي كان واقع لحظة النشر فاتته الرسالة. الإشعار نفسه يتحفظ في القاعدة.
- الـ adapter مش بديل لـ sticky sessions (الدرس الجاي): الاتنين مع بعض.`,
          lines: [
            "سيرفر socket.io.",
            "الـ adapter الرسمي لـ Redis.",
            "عميل Redis الرسمي (node-redis).",
            "اتصال للنشر.",
            "اتصال تاني للاشتراك (الاتصال اللي بيعمل SUBSCRIBE مبيعملش أوامر تانية).",
            "افتح الاتنين قبل ما السيرفر يبدأ.",
            "السيرفر...",
            "...بالـ adapter: أي emit لـ room بيعدّي على Redis لكل السيرفرات.",
            "CORS للواجهة بس.",
            "قفلة.",
            "تحقق من التوكن قبل أي اتصال (زي درس socket.io في «بناء مشروع كامل»).",
            "كل اتصال يدخل room المستخدم بتاعه، على السيرفر اللي هو عليه.",
            "notify من أي سيرفر بتوصل لكل أجهزة المستخدم، على أي سيرفر."
          ],
          sol: R`مع الـ adapter: العميل المتصل على 3001 بيستقبل الإشعار اللي اتبعت من 3002، و [[fetchSockets()]] على 3002 بترجع 1 (الاتصال موجود على السيرفر التاني بس الـ adapter سأله).

من غير الـ adapter: الإشعار مش بيوصل خالص، و [[fetchSockets()]] على 3002 بترجع 0. ومفيش أي error، وده بالظبط اللي بيحصل في الإنتاج لما حد ينسى الـ adapter.

لو العميل مش بيعرف يتصل أصلًا وانت ورا load balancer، دي مشكلة sticky sessions، الدرس الجاي. وعشان تتأكد إن الاتنين شايفين نفس Redis: [[redis-cli PUBSUB CHANNELS]] لازم يطلّع قنوات بتبدأ بـ [[socket.io]].`
        },
        {
          cmd: "sticky sessions",
          title: "خلّي نفس العميل يروح لنفس السيرفر",
          desc: R`socket.io بيبدأ الاتصال بـ HTTP long-polling (كذا طلب ورا بعض) وبعدين يرقّيه لـ WebSocket. الطلبات دي كلها لازم تروح لنفس السيرفر، لأن الـ session بتاعة الاتصال متخزنة في ذاكرته. لو الـ load balancer وزّعها round-robin، التاني هيقول «مين انت؟» ويرد 400.

الحل: sticky sessions، يعني الـ load balancer يودّي نفس العميل لنفس السيرفر (بالـ IP أو بكوكي). والبديل إن العميل يبدأ WebSocket على طول من غير polling.`,
          example: R`upstream api {
    hash $remote_addr consistent;
    server 10.0.0.11:3000;
    server 10.0.0.12:3000;
}
map $http_upgrade $connection_upgrade { default upgrade; "" close; }
server {
    listen 443 ssl;
    server_name api.example.com;
    location /socket.io/ {
        proxy_pass http://api;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header Host $host;
        proxy_read_timeout 60s;
    }
}`,
          try: R`حط سيرفرين socket.io (بالـ Redis adapter) ورا Nginx مرة بـ [[hash $remote_addr]] ومرة من غيره (round-robin). وصّل عميل بالإعدادات الافتراضية في الحالتين، وشوف الـ transport اللي وصل له ([[socket.io.engine.transport.name]]) أو الـ error.`,
          flag: "script",
          deep: {
            why: "ده أشهر سبب لـ «الـ sockets شغالة على جهازي ووقعت في الإنتاج». على جهازك سيرفر واحد، وفي الإنتاج اتنين ورا load balancer، والـ handshake بيتقسم بينهم.",
            how: R`الـ handshake بتاع socket.io (Engine.IO): أول طلب GET بيرجّع [[sid]] (session id)، وبعدين العميل بيعمل طلبات polling بالـ sid ده، وبيجرّب يفتح WebSocket بيه. السيرفر اللي عمل الـ sid بس هو اللي يعرفه. لو طلب راح لسيرفر تاني: 400 ورسالة [[Session ID unknown]]، وفي العميل [[xhr post error]].

[[hash $remote_addr consistent]] في Nginx بيوزّع حسب IP العميل، و [[consistent]] (ketama) بيخلي إضافة أو شيل سيرفر يحرّك جزء صغير بس من العملاء. [[ip_hash]] قديم وبيشتغل برضه. العيب: كل الناس اللي ورا نفس الـ NAT (شركة أو شبكة موبايل) بيروحوا لنفس السيرفر، والتوزيع بيبقى مش متساوي. ولو فيه Cloudflare أو load balancer قدام Nginx، [[$remote_addr]] هيبقى الـ IP بتاعهم، فلازم الـ IP الحقيقي (تاب «Nginx»، درس [[IP الزائر ورا Cloudflare]]).

في load balancers السحابة (زي AWS ALB) فيه sticky بكوكي، وده أدق من الـ IP.

البديل من غير sticky: [[io(url, { transports: ["websocket"] })]] في العميل. الاتصال طلب واحد بيترقى على طول، فمفيش طلبات تتوزع. العيب إنك خسرت الـ fallback لـ polling لو شبكة ما بتمنع WebSocket (نادر دلوقتي بس بيحصل في شبكات شركات).

الـ Upgrade و Connection headers: Nginx بيشيلهم افتراضيًا، فلازم تمررهم عشان الترقية لـ WebSocket تحصل (تاب «Nginx»، درس [[WebSockets]]). و [[proxy_read_timeout]] لازم يبقى أكبر من الـ ping interval (socket.io بيبعت ping كل ٢٥ ثانية افتراضيًا)، وإلا Nginx يقفل الاتصال الساكت.

sticky sessions مش بديل للـ Redis adapter: الـ sticky بيخلي اتصال عميل واحد يفضل على سيرفر واحد، والـ adapter بيخلي السيرفرات توصّل لبعض. محتاج الاتنين.`,
            when: "أي socket.io ورا أكتر من سيرفر، أو PM2 cluster mode (اللي عنده مكتبة [[@socket.io/sticky]] للحالة دي)، أو أي حاجة بتعمل handshake على كذا طلب.",
            mistakes: R`round-robin عادي وتلوم socket.io. و hash بالـ IP ورا Cloudflare فكل الناس على سيرفر واحد. و [[proxy_read_timeout]] أقل من الـ ping interval فالاتصال يقطع كل شوية. ونسيان headers الـ Upgrade فكل الاتصالات تفضل polling (شغالة بس تقيلة جدًا على السيرفر).`
          },
          teach: R`## الفكرة: الـ handshake كذا طلب، ولازم كلهم لنفس السيرفر

المثال config لـ Nginx قدام سيرفرين socket.io. حاجتين بيعملهم: [[hash $remote_addr]] بيودّي كل عميل لنفس السيرفر دايمًا، وheaders الـ [[Upgrade]] و [[Connection]] بيعدّوا طلب الترقية لـ WebSocket.

اتجرّب على ويندوز 11: [[nginx:alpine]] في Docker (اسم الـ container [[teach-apis02-nginx]]، بورت ٦٠٠٧ على الجهاز)، وقدامه نسختين socket.io 4.8.4 بالـ Redis adapter من الدرس اللي فات على ٦٠٠٥ و ٦٠٠٦ (من جوه الـ container اسمهم [[host.docker.internal:6005]] و [[:6006]] بدل [[10.0.0.11:3000]] و [[10.0.0.12:3000]]). و [[listen 80]] بدل [[listen 443 ssl]]، لأن الـ config زي ما هو ناقصه سطور الشهادة: [[nginx -t]] عليه بيقول [[no "ssl_certificate" is defined for the "listen ... ssl" directive]] (السطور دي في تاب «Nginx»). وزوّدنا [[log_format]] بيطبع [[$upstream_addr]]، يعني كل طلب راح لأنهي سيرفر. العميل [[socket.io-client]] 4.8.4 من Node بالإعدادات الافتراضية.

---

## ١. ليه أصلًا؟ شكل الـ handshake

العميل بالإعدادات الافتراضية بيبدأ بـ HTTP long-polling. أول طلب بيرجّع [[sid]]:

~~~bash
curl -s "localhost:6007/socket.io/?EIO=4&transport=polling"
~~~

~~~text الناتج
0{"sid":"wmO0kP5rSNu74ht4AAAF","upgrades":["websocket"],"pingInterval":25000,"pingTimeout":20000,"maxPayload":1000000}
~~~

- [[EIO=4]]: نسخة بروتوكول Engine.IO (الطبقة اللي تحت socket.io).
- الـ [[0]] في الأول نوع الرسالة: «open».
- [[sid]]: session id. **السيرفر اللي عمله بس هو اللي يعرفه** (في ذاكرته).
- [[upgrades]]: ينفع تترقى لـ websocket. و [[pingInterval]] ٢٥ ثانية، و [[pingTimeout]] ٢٠ (درس الـ heartbeat).

وبعدها كل طلب بيبعت [[&sid=...]]. لو راح للسيرفر التاني:

~~~text الناتج
{"code":1,"message":"Session ID unknown"}  -> 400
~~~

---

## ٢. الـ config سطر سطر

~~~nginx
upstream api {
    hash $remote_addr consistent;
    server 10.0.0.11:3000;
    server 10.0.0.12:3000;
}
~~~

- [[upstream api]]: مجموعة سيرفرات اسمها [[api]].
- [[hash $remote_addr]]: احسب hash من IP العميل ([[$remote_addr]])، واختار السيرفر منه. نفس الـ IP = نفس السيرفر دايمًا.
- [[consistent]]: طريقة hash (ketama) لما تضيف أو تشيل سيرفر، جزء صغير بس من العملاء بيتنقل.
- من غير سطر [[hash]]، الافتراضي round-robin: كل طلب للي عليه الدور.

~~~nginx
map $http_upgrade $connection_upgrade { default upgrade; "" close; }
~~~

[[map]] بيعمل متغير جديد من متغير موجود:

| [[$http_upgrade]] (header [[Upgrade]] في الطلب) | [[$connection_upgrade]] |
|---|---|
| فاضي [[""]] (طلب عادي) | [[close]] |
| أي قيمة تانية (زي [[websocket]]) | [[upgrade]] |

~~~nginx
server {
    listen 443 ssl;
    server_name api.example.com;
    location /socket.io/ {
        proxy_pass http://api;
~~~

- [[location /socket.io/]]: المسار الافتراضي لـ socket.io.
- [[proxy_pass http://api]]: ابعت للمجموعة (والـ hash بيختار مين).

~~~nginx
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;
~~~

- Nginx بيكلم السيرفرات بـ HTTP/1.0 افتراضيًا، والترقية لـ WebSocket محتاجة 1.1.
- [[Upgrade]] و [[Connection]] headers «hop-by-hop»: Nginx **بيشيلهم** وهو بيعدّي الطلب. السطرين دول بيرجّعوهم.

~~~nginx
        proxy_set_header Host $host;
        proxy_read_timeout 60s;
~~~

- [[Host]]: الدومين الأصلي بدل اسم الـ upstream.
- [[proxy_read_timeout 60s]]: لو السيرفر مبعتش حاجة ٦٠ ثانية، Nginx يقفل. أكبر من ping socket.io (٢٥ ثانية) فالاتصال الشغال مبيتقفلش.

---

## ٣. التجربة

### بالـ hash

~~~text الناتج (العميل)
upgraded to websocket
connect, transport: websocket
final transport: websocket
~~~

~~~text الناتج (log الـ Nginx)
GET 200 up=192.168.65.254:6005 200
POST 200 up=192.168.65.254:6005 200
GET 200 up=192.168.65.254:6005 200
GET 101 up=192.168.65.254:6005 101
~~~

كل الطلبات لـ ٦٠٠٥: handshake ([[GET]])، وبعت رسالة الـ connect ([[POST]])، و poll، وفي الآخر [[101 Switching Protocols]]: الترقية لـ WebSocket نجحت. (هنا كل الطلبات جاية من نفس الـ IP، فكلها لنفس السيرفر.)

### round-robin: مفاجأة

شلنا سطر الـ hash، والعميل... **اتصل عادي**، وكل الطلبات راحت لـ ٦٠٠٥ برضه. السبب: Nginx شغال بكذا worker process، وكل worker عنده عدّاد round-robin **لوحده** بيبدأ من أول سيرفر. والطلبات الأربعة اتوزعت على workers مختلفة، فكل واحد اختار ٦٠٠٥. يعني الـ bug ممكن ميبانش في تجربة صغيرة ويظهر تحت ضغط.

لما زوّدنا [[zone api 64k;]] جوه الـ upstream (ذاكرة مشتركة بين الـ workers، فالعدّاد بقى واحد):

~~~text الناتج (العميل)
connect_error: xhr post error 400 400
disconnect: transport error 400
final transport: (not connected)
~~~

~~~text الناتج (log الـ Nginx)
GET 200 up=192.168.65.254:6005 200
POST 400 up=192.168.65.254:6006 400
GET 400 up=192.168.65.254:6006 400
~~~

الـ handshake على ٦٠٠٥، والـ [[POST]] اللي بعده راح ٦٠٠٦ اللي ميعرفش الـ sid: 400، والعميل وقع بـ [[xhr post error]].

### round-robin + [[transports: ["websocket"]]]

~~~text الناتج (العميل)
connect, transport: websocket
~~~

~~~text الناتج (log الـ Nginx)
GET 101 up=192.168.65.254:6006 101
~~~

طلب واحد بيترقى على طول، فمفيش حاجة تتوزع. ده بيأكد إن المشكلة في توزيع طلبات الـ polling، مش في socket.io.

---

## الخلاصة

| السطر | ليه |
|---|---|
| [[hash $remote_addr consistent]] | نفس العميل لنفس السيرفر (sticky) |
| [[map $http_upgrade $connection_upgrade]] | [[Connection: upgrade]] لطلبات الترقية بس |
| [[proxy_http_version 1.1]] | الترقية محتاجة 1.1 |
| [[proxy_set_header Upgrade / Connection]] | Nginx بيشيلهم افتراضيًا |
| [[proxy_read_timeout 60s]] | أكبر من ping الـ ٢٥ ثانية |

- [[Session ID unknown]] و [[xhr post error 400]] = الطلبات اتوزعت على سيرفرات مختلفة.
- [[$remote_addr]] ورا Cloudflare أو load balancer = IP بتاعهم، فكل الناس على سيرفر واحد.
- sticky للاتصال الواحد، والـ Redis adapter للتواصل بين السيرفرات: محتاج الاتنين.`,
          lines: [
            "مجموعة السيرفرات اللي بتشغّل الـ API.",
            "sticky: وزّع حسب IP العميل، فنفس العميل دايمًا لنفس السيرفر. و consistent بيقلل اللخبطة لما تضيف سيرفر.",
            "السيرفر الأول.",
            "السيرفر التاني.",
            "قفلة.",
            "لو الطلب فيه Upgrade خلي Connection = upgrade، ولو مفيش = close.",
            "السيرفر.",
            "HTTPS.",
            "الدومين.",
            "مسار socket.io الافتراضي.",
            "ودّيه للمجموعة (بالـ hash).",
            "HTTP/1.1: لازم عشان الترقية لـ WebSocket.",
            "مرر طلب الترقية.",
            "ومعاه Connection.",
            "الـ Host الأصلي.",
            "أكبر من ping socket.io (٢٥ ثانية)، عشان Nginx ميقفلش الاتصال الساكت.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`بالـ hash: العميل بيتصل ويترقى، و [[transport.name]] بيطلع [[websocket]].

بالـ round-robin: العميل بيفشل بـ [[connect_error]] ورسالة زي [[xhr post error 400]] (أو [[xhr poll error]])، ولو بصيت على رد السيرفر هتلاقي [[Session ID unknown]]. السبب إن أول طلب polling راح لسيرفر، والتاني راح للتاني اللي مايعرفش الـ sid.

ولو ضفت [[transports: ["websocket"]]] في العميل، هيشتغل حتى مع round-robin، لأن مفيش غير طلب واحد بيتوزع. ده بيأكد إن المشكلة في توزيع طلبات الـ handshake، مش في socket.io نفسه.

ولو round-robin اشتغل معاك عادي في التجربة: كل worker في Nginx عنده عدّاد round-robin لوحده بيبدأ من أول سيرفر، فالطلبات القليلة ممكن كلها تروح للأول بالصدفة. زوّد [[zone api 64k;]] جوه الـ upstream (عدّاد مشترك بين الـ workers) وهتشوف الـ 400.`
        },
        {
          cmd: "heartbeat و ping",
          title: "اكتشف الاتصال الميت قبل ما يتراكم",
          desc: R`لما موبايل يدخل نفق أو اللابتوب يقفل، الاتصال بيموت من غير ما يبعت «باي». السيرفر شايفه مفتوح، وبيفضل ماسك ذاكرة و file descriptor ليه، وأي رسالة ليه بتروح في الفاضي.

الحل heartbeat: السيرفر يبعت ping كل فترة، ولو مجاش pong قبل الـ ping اللي بعده، يقفل الاتصال بإيده. socket.io بيعمل ده لوحده ([[pingInterval]] و [[pingTimeout]])، ومع مكتبة [[ws]] الخام بتكتبه انت زي المثال.`,
          example: R`import { WebSocketServer, type WebSocket } from "ws";
const wss = new WebSocketServer({ server: httpServer, maxPayload: 64 * 1024 });
const alive = new WeakMap<WebSocket, boolean>();
wss.on("connection", (ws) => {
  alive.set(ws, true);
  ws.on("pong", () => alive.set(ws, true));
  ws.on("error", (err) => log.warn({ err }, "ws error"));
});
const interval = setInterval(() => {
  for (const ws of wss.clients) {
    if (!alive.get(ws)) { ws.terminate(); continue; }
    alive.set(ws, false);
    ws.ping();
  }
}, 30_000);
wss.on("close", () => clearInterval(interval));`,
          try: R`خلي الـ interval ثانية للتجربة. وصّل عميلين بمكتبة [[ws]]: واحد عادي، والتاني بـ [[new WebSocket(url, { autoPong: false })]] (مبيردش على الـ ping، كأنه اتصال ميت). بعد ٣ ثواني اطبع [[wss.clients.size]].`,
          flag: "script",
          deep: {
            why: "TCP لوحده ممكن يفضل «مفتوح» ساعات على اتصال طرفه التاني اختفى، لأن مفيش حد بيبعت حاجة. في سيرفر عليه آلاف المستخدمين على موبايل، الاتصالات الميتة دي بتتراكم لحد ما الذاكرة أو حد الـ file descriptors يخلص.",
            how: R`بروتوكول WebSocket نفسه فيه frames اسمها ping و pong، والمتصفح والمكتبات بيردوا على الـ ping تلقائيًا من غير كود منك. فالسيرفر: كل ٣٠ ثانية بيبعت ping لكل اتصال، وبيعلّمه «مستني رد». لو المرة الجاية لقاه لسه مستني، يبقى ميت، و [[terminate()]] بيقفل الـ socket فورًا من غير ما يستنى handshake الإغلاق (اللي مش هييجي).

الـ WeakMap: بتربط الحالة بالـ socket من غير ما تمنع الـ garbage collector يشيله بعد ما يتقفل. وفيه ناس بيحطوا [[ws.isAlive]] على الـ object نفسه، ودي الطريقة اللي في README مكتبة ws، والاتنين شغالين.

ناحية العميل: المتصفح مش بيقدر يبعت ping frames من JavaScript. فلو العميل محتاج يعرف إن السيرفر مات (مش العكس)، بتبعت رسالة عادية زي [[{"type":"ping"}]] والسيرفر يرد، ولو مجاش رد في وقت معين يقفل ويعيد الاتصال. socket.io بيعمل ده في الاتجاهين، وبيعيد الاتصال لوحده بـ backoff (بيزيد وقت الانتظار بين المحاولات، ومعاه عشوائية عشان آلاف العملاء ميرجعوش في نفس اللحظة بعد restart).

socket.io: [[pingInterval]] (افتراضي ٢٥ ثانية) و [[pingTimeout]] (افتراضي ٢٠ ثانية). اللي بيحدد إمتى الاتصال يعتبر ميت هو مجموعهم تقريبًا. ولازم يبقوا أقل من الـ idle timeout في أي proxy أو load balancer في النص، وإلا الـ proxy هو اللي هيقفل.

[[maxPayload]] حاجة تانية بس مهمة: أقصى حجم رسالة. من غيره أي حد يبعت رسالة ضخمة تاكل الذاكرة.

وبعد الـ reconnect: العميل رجع، بس فاتته رسايل. يا تبعتله اللي فاته من القاعدة (زي Last-Event-ID في SSE)، يا يعمل refetch للبيانات. الـ socket نفسه مش مخزن.`,
            when: "أي سيرفر WebSocket بمكتبة ws أو uWebSockets. ومع socket.io تظبط الأرقام بس بما يناسب الـ proxy اللي قدامك.",
            mistakes: R`مفيش heartbeat خالص، والذاكرة بتكبر ببطء لحد ما السيرفر يقع بعد أسبوع. و [[ws.close()]] بدل [[terminate()]] مع اتصال ميت (بيستنى رد مش هييجي). والـ interval أكبر من timeout الـ proxy. وتنسى [[clearInterval]] لما السيرفر يقفل (في الاختبارات بيعلّق الـ process). وتعيد الاتصال من العميل فورًا من غير backoff، فبعد كل deploy آلاف العملاء بيضربوا السيرفر في نفس الثانية.`
          },
          teach: R`## الفكرة: اسأل كل اتصال «انت عايش؟» كل شوية

السيرفر بيلف على كل الاتصالات كل ٣٠ ثانية. اللي رد على الـ ping اللي فات: علّمه «مستني رد» وابعتله ping جديد. واللي مردش: ميت، اقفله. يعني الاتصال الميت بيعيش دورتين بالكتير.

اتجرّب على ويندوز 11: مكتبة [[ws]] 8.22.0 على Node 24.19، في script واحد فيه السيرفر (بورت ٦٠٠٨) وعميلين من نفس المكتبة: [[good]] عادي، و [[dead]] بـ [[autoPong: false]] (مبيردش على الـ ping، كأنه موبايل دخل نفق). الـ interval ثانية بدل ٣٠ عشان التجربة، وزوّدنا [[console.log]] في الـ interval ولما الاتصالات تتقفل.

---

## ١. الـ import والسيرفر

~~~ts
import { WebSocketServer, type WebSocket } from "ws";
const wss = new WebSocketServer({ server: httpServer, maxPayload: 64 * 1024 });
~~~

- [[type WebSocket]] جوه الأقواس: بنجيب **النوع** بس (للـ WeakMap تحت)، ومبيطلعش في الـ JavaScript النهائي.
- [[server: httpServer]]: اركب على سيرفر HTTP موجود، فالـ WebSocket والـ API على نفس البورت. الترقية بتيجي كطلب HTTP عادي فيه [[Upgrade: websocket]].
- [[maxPayload: 64 * 1024]]: أقصى حجم لرسالة واحدة = ٦٥٥٣٦ بايت (64KB). الافتراضي في ws ١٠٠ ميجا.

جربنا العميل الكويس يبعت رسالة 70KB:

~~~text الناتج
warn: ws error Max payload size exceeded
3.8s good closed, code 1009 ""
~~~

السيرفر قفل الاتصال بكود [[1009]] (Message Too Big)، و [[error]] listener سجّل السبب.

## ٢. حالة كل اتصال

~~~ts
const alive = new WeakMap<WebSocket, boolean>();
~~~

[[WeakMap]] زي [[Map]]: key ← value. الفرق إن الـ key لازم object، ولو الـ object ده مبقاش مستخدم في أي حتة تانية، الـ garbage collector يشيله ويشيل قيمته من الـ WeakMap لوحده. فالاتصال اللي اتقفل مش هيفضل محجوز في الذاكرة بسبب الـ map دي.

## ٣. كل اتصال جديد

~~~ts
wss.on("connection", (ws) => {
  alive.set(ws, true);
  ws.on("pong", () => alive.set(ws, true));
  ws.on("error", (err) => log.warn({ err }, "ws error"));
});
~~~

- أول ما يتصل: عايش.
- [[pong]]: frame الرد على الـ ping. المتصفح والمكتبات بيبعتوه **لوحدهم** من غير كود. لما يوصل: عايش تاني.
- [[error]]: لو مفيش listener للـ error، Node بيرمي الخطأ ويقع الـ process كله. [[log.warn({ err }, ...)]] شكل pino (أول argument object، والتاني رسالة).

## ٤. الـ interval

~~~ts
const interval = setInterval(() => {
  for (const ws of wss.clients) {
    if (!alive.get(ws)) { ws.terminate(); continue; }
    alive.set(ws, false);
    ws.ping();
  }
}, 30_000);
~~~

- [[wss.clients]]: [[Set]] فيه كل الاتصالات المفتوحة (المكتبة بتديره لوحدها).
- [[!alive.get(ws)]]: لو مردش من الدورة اللي فاتت ← [[terminate()]]: اقفل الـ socket فورًا. ([[close()]] بيبعت close frame ويستنى الطرف التاني يرد، والطرف الميت مش هيرد.) و [[continue]]: روح للاتصال اللي بعده.
- غير كده: علّمه [[false]] («مستني رد»)، **وبعدين** ابعت [[ping()]]. الترتيب مهم: لو الـ pong رجع، الـ listener هيرجّعه [[true]] قبل الدورة الجاية.

~~~ts
wss.on("close", () => clearInterval(interval));
~~~

السيرفر نفسه اتقفل ([[wss.close()]]): وقّف الـ interval، وإلا الـ process مش هيخلص (في الاختبارات بيفضل معلّق).

---

## ٥. التجربة ثانية بثانية

~~~text الناتج
1.0s tick, clients: 2
1.0s good got ping (auto pong)
1.0s dead got ping (no pong)
2.0s tick, clients: 2
2.0s terminate dead client
2.0s good got ping (auto pong)
2.0s dead closed, code 1006 ""
3.0s tick, clients: 1
3.0s good got ping (auto pong)
3.5s clients left: 1
~~~

| الوقت | اللي حصل |
|---|---|
| 1.0s | الدورة الأولى: الاتنين [[true]]، فاتعلّموا [[false]] واتبعتلهم ping. [[good]] رد pong لوحده فرجع [[true]]. [[dead]] مردش |
| 2.0s | الدورة التانية: [[dead]] لسه [[false]] ← [[terminate]]. [[good]] ping تاني |
| 3.5s | [[wss.clients.size]] = 1 |

- العميل الميت شاف كود [[1006]]: «اتقفل من غير close frame». ده الكود اللي بتشوفه لما الاتصال بيتقطع فجأة.
- الاتصال الميت بيتكشف بين دورة ودورتين (هنا ثانيتين، وفي الإنتاج بين ٣٠ و ٦٠ ثانية).

---

## ٦. مع socket.io

مش محتاج الكود ده: socket.io بيعمل نفس الحكاية بـ [[pingInterval]] (افتراضي ٢٥٠٠٠) و [[pingTimeout]] (افتراضي ٢٠٠٠٠)، وظهروا في الـ handshake في الدرس اللي فات:

~~~text الناتج (handshake بتاع socket.io)
"pingInterval":25000,"pingTimeout":20000,"maxPayload":1000000
~~~

وفي socket.io الـ [[maxPayload]] الافتراضي ١٠٠٠٠٠٠ بايت (حوالي 1MB، اسمه [[maxHttpBufferSize]] في إعدادات السيرفر).

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[maxPayload]] | رسالة ضخمة ← [[1009]] بدل ما تاكل الذاكرة |
| [[WeakMap]] | الحالة بتتشال مع الاتصال |
| [[on("pong")]] ← [[true]] | رد = عايش |
| [[false]] ثم [[ping()]] | «مستني رد» |
| [[terminate()]] مش [[close()]] | الميت مش هيرد على close handshake |
| [[on("error")]] | خطأ اتصال ميوقّعش الـ process |
| [[clearInterval]] على [[close]] | الـ process يقدر يخلص |

- الـ interval لازم أقل من الـ idle timeout بتاع أي proxy في النص.
- كود [[1006]] عند العميل = اتقطع من غير close frame.`,
          lines: [
            "مكتبة ws الخام (من غير socket.io).",
            "سيرفر WebSocket على نفس سيرفر HTTP، وأقصى رسالة 64KB.",
            "حالة كل اتصال: رد على آخر ping ولا لأ.",
            "اتصال جديد:",
            "اعتبره حي.",
            "لما يرد pong، علّمه حي تاني.",
            "سجّل أي error بدل ما يوقّع الـ process.",
            "قفلة.",
            "كل ٣٠ ثانية:",
            "لكل اتصال...",
            "...لو مردش على الـ ping اللي فات: ميت، اقفله فورًا وكمّل.",
            "علّمه «مستني رد».",
            "وابعتله ping (المتصفح بيرد pong لوحده).",
            "قفلة.",
            "قفلة.",
            "لو السيرفر اتقفل، وقّف الـ interval."
          ],
          sol: R`بعد ٣ ثواني [[wss.clients.size]] بيطلع 1. العميل اللي بـ [[autoPong: false]] اتقفل عند تاني دورة (الأولى علّمته «مستني»، والتانية لقته لسه مستني فعمل terminate)، وكود الإغلاق عنده 1006 (اتقفل من غير handshake).

لو لقيت الاتنين لسه موجودين: يا الـ pong listener بيعلّم الاتصال حي حتى من غير رد (مثلًا بتعمل [[alive.set(ws, true)]] قبل الـ ping)، يا الـ interval مبيشتغلش. ولو الاتنين اتقفلوا: غالبًا بتعلّم «مستني» بعد الـ ping بدل قبله، أو ناسي الـ pong listener.`,
          solCode: R`const wss = new WebSocketServer({ port: 8080 });
// ... نفس الكود بـ interval ثانية واحدة
const good = new WebSocket("ws://localhost:8080");
const dead = new WebSocket("ws://localhost:8080", { autoPong: false });
setTimeout(() => console.log("clients left:", wss.clients.size), 3500);
// clients left: 1`
        }
      ]
    }
]);

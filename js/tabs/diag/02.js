// تكملة تاب diag: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/diag/01.js (شرح حقول الدرس في أوله)
MORE("diag", [
    {
      t: "السيرفر: أعطال شائعة",
      l: 2,
      n: "كل عطل ليه رسالة مميزة، والرسالة بتقولك تبدأ منين",
      items: [
        {
          cmd: "502 Bad Gateway",
          title: "Nginx شغال والتطبيق وراه مش بيرد",
          desc: "502 معناها Nginx استقبل الطلب وحاول يوصّله للتطبيق على 127.0.0.1:3000 ومحدش رد. يعني الطبقات اللي قبل Nginx سليمة، والمشكلة في التطبيق: واقع، أو بيسمع على بورت تاني، أو لسه بيقوم.",
          example: R`sudo tail -20 /var/log/nginx/error.log
curl -sI http://127.0.0.1:3000/health
docker compose ps
docker compose logs --tail 50 api
sudo ss -tlnp | grep 3000
grep proxy_pass /etc/nginx/sites-enabled/*`,
          try: "أول أمر هيطبع «connect() failed (111: Connection refused) while connecting to upstream». الرقم اللي بعد upstream هو البورت اللي Nginx بيحاول عليه. قارنه باللي التطبيق بيسمع عليه.",
          deep: {
            why: "502 أكتر error هتشوفه على VPS، ورسالته دقيقة: «انا Nginx شغال، بس اللي وراي مش بيرد». ده بيحذف نص الاحتمالات فورًا.",
            how: R`Nginx بيسجّل في error.log بالظبط إيه اللي حصل: [[connect() failed (111: Connection refused) while connecting to upstream, upstream: "http://127.0.0.1:3000/"]]. الرقم 111 يعني مفيش حد بيسمع على البورت ده.

[[curl 127.0.0.1:3000/health]] من السيرفر بيختبر التطبيق مباشرة. لو رد، التطبيق شغال والمشكلة إن Nginx بيطلب بورت مختلف (شوف proxy_pass). لو مردّش، التطبيق واقع.

[[docker compose ps]]: الحالة. Exited أو Restarting يعني وقع. [[logs --tail 50]] السبب.

[[ss -tlnp | grep 3000]]: مين بيسمع على 3000 فعلًا. لو فاضي، التطبيق مش بيسمع (ممكن بيسمع على 127.0.0.1 جوه الـ container وبورت compose مش مربوط).

الحالة الخبيثة: التطبيق لسه بيقوم (بياخد ٣٠ ثانية) و 502 مؤقت. ومعاه إن Docker بيربط البورت على IPv4 بس و Nginx بيحاول على [[localhost]] اللي بيتحوّل لـ IPv6 أحيانًا. الحل: [[127.0.0.1]] في proxy_pass مش localhost.`,
            when: "أي 502. وبعد كل deploy لحظات.",
            mistakes: "تعمل restart لـ Nginx. نادرًا ما تكون المشكلة فيه في 502 (ولو proxy_pass غلط، restart مش هيصلّحه برضه). وتنسى تشوف error.log اللي فيه الإجابة."
          },
          teach: R`## الفكرة: Nginx شغال، واللي وراه مش بيرد

502 معناها Nginx استلم الطلب، وحاول يوصّله للتطبيق على [[proxy_pass]]، والتطبيق مردّش. فالـ DNS والشبكة والفايروول و Nginx نفسه كلهم سليمين، ودوّر في التطبيق بس.

عملت الـ 502 بطريقتين في معمل: سيرفر Ubuntu 24.04 بـ systemd جوه Docker عليه Nginx بيعمل [[proxy_pass http://127.0.0.1:3000]] لتطبيق Python. ولأوامر [[docker compose]] عملت مشروع Compose صغير على Docker Desktop: خدمة [[api]] (Node 22) وخدمة [[db]] (Postgres 16)، وأسامي الـ containers فيه [[diag01-api]] و [[diag01-pg]].

---

## ١. [[sudo tail -20 /var/log/nginx/error.log]]: الإجابة مكتوبة هنا

[[tail -20]] آخر ٢٠ سطر من الملف. وقّفت التطبيق وطلبت الصفحة:

~~~text الطلب
HTTP/1.1 502 Bad Gateway
~~~

~~~text آخر سطر في error.log
2026/10/06 12:51:29 [error] 857#857: *17 connect() failed (111: Connection refused) while connecting to upstream, client: 127.0.0.1, server: example.com, request: "HEAD / HTTP/1.1", upstream: "http://127.0.0.1:3000/", host: "example.com"
~~~

نفكّه:

| الحتة | معناها |
|---|---|
| [[error]] بين القوسين | مستوى الرسالة |
| [[857#857]] | رقم عملية Nginx (worker) |
| [[*17]] | رقم الاتصال |
| [[connect() failed]] | Nginx حاول يتصل بالتطبيق وفشل |
| [[(111: Connection refused)]] | ١١١ رقم الخطأ في لينكس: مفيش حد سامع على البورت |
| [[upstream]] | الـ upstream هو اللي ورا Nginx (التطبيق) |
| [[upstream: "http://127.0.0.1:3000/"]] | العنوان اللي حاول عليه بالظبط |

لو شفت [[(110: Connection timed out)]] بدل 111، التطبيق موجود بس مش بيرد خالص (معلّق).

---

## ٢. [[curl -sI http://127.0.0.1:3000/health]]

اطلب التطبيق مباشرة من غير Nginx. والتطبيق واقف:

~~~text الناتج (من غير -s عشان يبان الخطأ)
curl: (7) Failed to connect to 127.0.0.1 port 3000 after 0 ms: Couldn't connect to server
~~~

[[(7)]] رقم خطأ curl معناه «معرفتش أتصل». و [[-s]] بتخبي الرسالة دي، فممكن متشوفش حاجة خالص؛ لو حصل كده، [[echo $?]] بعدها هيطبع [[7]].

---

## ٣. [[docker compose ps]]: فخ مهم

وقّفت [[api]] في مشروع Compose وشغّلت:

~~~text الناتج
NAME        IMAGE         COMMAND                  SERVICE   CREATED          STATUS          PORTS
diag01-pg   postgres:16   "docker-entrypoint.s…"   db        24 seconds ago   Up 23 seconds   5432/tcp
~~~

[[api]] **مش موجود في القايمة أصلًا**، لأن [[docker compose ps]] بيعرض الشغال بس. زوّد [[-a]] (all):

~~~text docker compose ps -a
NAME         IMAGE          ...   STATUS                      PORTS
diag01-api   node:22-slim   ...   Exited (137) 1 second ago
diag01-pg    postgres:16    ...   Up 23 seconds               5432/tcp
~~~

[[Exited (137)]] يعني وقف، و 137 معناها اتقتل بـ SIGKILL (هنا لأن [[docker stop]] استنى ١٠ ثواني والبرنامج مقفلش لوحده). ولو [[Restarting]] يبقى بيقع ويقوم (درس «الـ container بيقع ويقوم»).

---

## ٤. [[docker compose logs --tail 50 api]]

آخر ٥٠ سطر من لوج خدمة [[api]]. كل سطر قدامه اسم الـ container:

~~~text الناتج
diag01-api  | api listening on 0.0.0.0:3000
~~~

هنا مفيش error لأني أنا اللي وقفته. في الحقيقة هتلاقي سبب الوقوع (exception، متغير ناقص) في آخر السطور.

---

## ٥. [[sudo ss -tlnp | grep 3000]]

مين سامع على 3000 فعلًا؟ والتطبيق واقف: ولا سطر، و [[grep]] خرج بـ 1.

الحالة الأخبث: التطبيق **شغال بس على بورت تاني**. شغّلته على 3001 بالغلط:

~~~text Nginx لسه بيقول
HTTP/1.1 502 Bad Gateway
... upstream: "http://127.0.0.1:3000/" ...
~~~

~~~text ss -tlnp | grep -E "300[01]"
LISTEN 0  5  0.0.0.0:3001  0.0.0.0:*  users:(("python3",pid=954,fd=3))
~~~

Nginx بيخبط على 3000 والتطبيق قاعد على 3001. ده بيبان بس لو قارنت.

---

## ٦. [[grep proxy_pass /etc/nginx/sites-enabled/*]]

[[*]] كل الملفات في الفولدر. بيطلّع كل سطر [[proxy_pass]]:

~~~text الناتج
        proxy_pass http://127.0.0.1:3000;
    location / { proxy_pass http://127.0.0.1:3000; }
~~~

قارن البورت ده باللي في [[ss]]. لو مختلفين، صلّح واحد منهم.

---

## حالة كمان: التطبيق سامع على 127.0.0.1 **جوه** الـ container

جوه Docker، [[127.0.0.1]] معناها الـ container نفسه، مش السيرفر. شغّلت [[api]] بـ [[HOST=127.0.0.1]]:

~~~text docker compose ps (البورت باين مربوط)
diag01-api   node:22-slim   ...   Up 2 seconds   127.0.0.1:3300->3000/tcp
~~~

~~~text curl -sS -I http://127.0.0.1:3300/health
curl: (52) Empty reply from server
~~~

~~~text من جوه الـ container نفسه
inside: 200
~~~

Docker بيوصّل الطلب لكارت الـ container، والتطبيق مش سامع على الكارت ده، سامع على الـ loopback بتاعه بس. الحل: التطبيق يسمع على [[0.0.0.0]]. وجرّبت Nginx على نفس شبكة Docker بيعمل [[proxy_pass http://diag01-api:3000]]: طلع 502 بنفس رسالة [[(111: Connection refused)]] اللي فوق. يعني الـ container شغال و [[ps]] بيقول Up، والطلب بيترفض.

---

## الجدول

| الأمر | سؤاله | الإجابة اللي بتحل |
|---|---|---|
| [[tail error.log]] | Nginx حاول على إيه وليه فشل | [[111]] مفيش حد، [[110]] معلّق |
| [[curl 127.0.0.1:3000]] | التطبيق بيرد من غير Nginx؟ | رد = المشكلة في proxy_pass |
| [[compose ps -a]] | الـ container شغال؟ | Exited أو Restarting |
| [[compose logs api]] | ليه وقع | آخر سطور |
| [[ss -tlnp]] مع grep | سامع على أنهي بورت | قارن بـ proxy_pass |
| [[grep proxy_pass]] | Nginx بيبعت لفين | قارن بـ ss |

## الخلاصة

- 502 = Nginx سليم. متعملوش restart.
- [[error.log]] فيه البورت اللي Nginx حاول عليه. قارنه باللي في [[ss]].
- [[docker compose ps]] من غير [[-a]] بيخبي الواقفين.
- جوه container التطبيق لازم يسمع على [[0.0.0.0]].`,
          lines: [
            "آخر أخطاء Nginx: هتلاقي connect() failed والبورت اللي حاول عليه.",
            "التطبيق بيرد مباشرة؟",
            "حالة الـ containers.",
            "آخر ٥٠ سطر من التطبيق.",
            "مين بيسمع على 3000 فعلًا؟",
            "Nginx بيوجّه لأنهي بورت؟ قارنه باللي فوق."
          ],
          sol: R`أول أمر [[tail /var/log/nginx/error.log]] هو المفتاح: في حالة 502 هتلاقي سطر زي:

[[connect() failed (111: Connection refused) while connecting to upstream, ... upstream: "http://127.0.0.1:3000/"]]

الرقم بعد [[upstream]] (هنا 3000) هو البورت اللي Nginx بيحاول يكلّمه. قارنه باللي التطبيق سامع عليه فعلًا من [[ss -tlnp | grep 3000]]: لو التطبيق واقع (مفيش حاجة على 3000) أو سامع على بورت تاني، ده سبب الـ 502.

[[curl -sI http://127.0.0.1:3000/health]] من على السيرفر بيأكد: لو رجع [[Connection refused]] يبقى التطبيق مش شغال (شوف [[docker compose logs api]])، لو رجع 200 يبقى التطبيق تمام والمشكلة في [[proxy_pass]] في Nginx (بورت غلط أو [[127.0.0.1]] مكتوب [[localhost]] والتطبيق على IPv4 بس). 502 دايمًا معناها «Nginx واقف بس اللي وراه مش بيرد».`
        },
        {
          cmd: "504 Gateway Timeout",
          title: "التطبيق بيرد بس ببطء شديد",
          desc: "504 يعني Nginx وصّل الطلب، والتطبيق مردّش في المهلة (60 ثانية افتراضيًا). التطبيق شغال بس حاجة معلّقة: استعلام بطيء، أو اتصال بخدمة خارجية معلّق، أو المعالج مشغول بالكامل.",
          example: R`curl -o /dev/null -s -w "%{http_code} %{time_total}s\n" http://127.0.0.1:3000/api/orders
docker stats --no-stream
docker exec db psql -U postgres -c "SELECT pid, now()-query_start AS age, state, left(query,60) FROM pg_stat_activity WHERE state <> 'idle' ORDER BY age DESC LIMIT 5;"
docker compose logs --since 5m api | grep -iE "timeout|slow|ECONNREFUSED"
grep -E "proxy_read_timeout|proxy_connect_timeout" /etc/nginx/sites-enabled/*`,
          try: "اطلب نفس الصفحة مباشرة من التطبيق بأول أمر: لو أخدت ٧٠ ثانية، المشكلة في التطبيق أو القاعدة مش في Nginx.",
          deep: {
            why: "504 أخطر من 502 لأن التطبيق «شغال». حاجة جواه بتاخد وقت أطول من مهلة Nginx، وغالبًا استعلام أو اتصال خارجي.",
            how: R`الأمر الأول بيطلب الـ endpoint البطيء مباشرة من التطبيق ويطبع الوقت. لو ٦٠+ ثانية، المشكلة في التطبيق مش Nginx، وانت عارف أنهي endpoint.

[[docker stats]]: لو المعالج 100٪ أو الرام على الحد، التطبيق مخنوق ومش قادر يرد.

الاستعلام على pg_stat_activity بيوريك الاستعلامات الشغالة دلوقتي ومدتها. استعلام من ٤ دقايق = المتهم. غالبًا JOIN من غير index أو lock.

[[grep timeout]] في اللوج: اتصال بخدمة خارجية (بوابة دفع، API) معلّق. الكود لازم يحط timeout على كل اتصال خارجي (٥ لـ ١٠ ثواني)، وإلا طلب واحد معلّق بيعلّق الكل.

[[proxy_read_timeout]] في Nginx: الافتراضي 60 ثانية. رفعه بيخبّي المشكلة مش بيحلها، إلا لو الـ endpoint فعلًا محتاج وقت (تقرير كبير)، وساعتها الأصح background job.`,
            when: "504 على endpoints معينة. وبطء عام قبل ما يوصل لـ 504.",
            mistakes: "ترفع proxy_read_timeout لـ 300 وخلاص. الطلبات هتفضل بطيئة والاتصالات هتتراكم."
          },
          teach: R`## الفكرة: التطبيق شغال، بس بيتأخر أكتر من صبر Nginx

Nginx بيستنى رد التطبيق ٦٠ ثانية (القيمة الافتراضية لـ [[proxy_read_timeout]]). لو الرد متأخر عن كده، Nginx بيقطع ويرجّع 504. الأوامر بتدوّر على «مين اللي مأخّره».

جرّبت ده بجد: تطبيق Node في Compose ([[diag01-api]]) فيه endpoint اسمه [[/api/orders]] بياخد ٧٠ ثانية، وقدامه Nginx على سيرفر Ubuntu 24.04 تجريبي، و Postgres 16 ([[diag01-pg]]) شغّلت فيه استعلام بياخد ٤ دقايق.

~~~text من Nginx (اتشغّل على السيرفر التجريبي)
504 60.058274s
~~~

~~~text error.log في نفس اللحظة
[error] 1017#1017: *25 upstream timed out (110: Connection timed out) while reading response header from upstream, ... upstream: "http://172.22.0.3:3000/api/orders" ...
~~~

لاحظ: [[60.05]] ثانية بالظبط، و [[while reading response header]] يعني «اتصلت بالتطبيق، وقعدت مستني الرد لحد ما زهقت». (قارن بـ 502 اللي كان [[while connecting]]: هناك ماعرفش يتصل أصلًا.)

---

## ١. [[curl -o /dev/null -s -w "%{http_code} %{time_total}s\n" http://127.0.0.1:3000/api/orders]]

اطلب نفس الـ endpoint من التطبيق مباشرة، من غير Nginx، وقيس الوقت.

- [[-o /dev/null]] ارمي محتوى الرد، احنا عايزين الأرقام بس.
- [[-s]] من غير شريط تقدم.
- [[-w "..."]] (write-out) بعد ما تخلص اطبع النص ده. [[%{http_code}]] الـ status، و [[%{time_total}]] الوقت الكلي بالثواني، و [[\n]] سطر جديد.

~~~text الناتج (من التطبيق مباشرة)
200 70.015413s
~~~

التطبيق رد فعلًا بـ 200، بس بعد ٧٠ ثانية. يعني Nginx مش غلطان: هو قطع عند ٦٠. المشكلة في التطبيق، وانت عرفت أنهي endpoint.

---

## ٢. [[docker stats --no-stream]]

[[docker stats]] بيعرض استهلاك كل container لايف. [[--no-stream]] لقطة واحدة واخرج.

~~~text الناتج (أثناء الطلب البطيء)
NAME         CPU %     MEM USAGE / LIMIT     MEM %
diag01-api   0.00%     10.51MiB / 15.33GiB   0.07%
diag01-pg    0.00%     34.64MiB / 15.33GiB   0.22%
~~~

المعالج صفر والرام قليلة. يعني التطبيق مش «مخنوق»، هو **مستني** حاجة (استعلام، أو خدمة خارجية، أو [[sleep]]). لو كان CPU قريب من 100٪، كنا هنروح لدرس «المعالج 100٪».

---

## ٣. الاستعلامات الشغالة دلوقتي

~~~bash
docker exec db psql -U postgres -c "SELECT pid, now()-query_start AS age, state, left(query,60) FROM pg_stat_activity WHERE state <> 'idle' ORDER BY age DESC LIMIT 5;"
~~~

نفكّه:

| الحتة | معناها |
|---|---|
| [[docker exec db psql -U postgres -c "..."]] | شغّل [[psql]] جوه container القاعدة بيوزر [[postgres]]، ونفّذ الاستعلام ده واخرج |
| [[pg_stat_activity]] | جدول جاهز في Postgres: صف لكل اتصال بالقاعدة |
| [[pid]] | رقم العملية (بتحتاجه لو هتلغي الاستعلام) |
| [[now()-query_start AS age]] | الوقت دلوقتي ناقص وقت بداية الاستعلام = بقاله قد إيه |
| [[state]] | [[active]] شغال، [[idle]] فاضي، [[idle in transaction]] فاتح transaction ومش بيعمل حاجة |
| [[left(query,60)]] | أول ٦٠ حرف من الاستعلام |
| [[WHERE state <> 'idle']] | استبعد الفاضيين ([[<>]] يعني «لا يساوي») |
| [[ORDER BY age DESC LIMIT 5]] | الأقدم الأول، وأول ٥ بس |

في المعمل (اليوزر عندي اسمه [[app]] فكتبت [[-U app -d app]]):

~~~text الناتج
 pid |       age       | state  |                             left
-----+-----------------+--------+--------------------------------------------------------------
  78 | 00:01:18.621527 | active | SELECT pg_sleep(240), count(*) FROM pg_class;
  89 | 00:00:00        | active | SELECT pid, now()-query_start AS age, state, left(query,60)
(2 rows)
~~~

الصف الأول هو المتهم: شغال من دقيقة و١٨ ثانية. التاني هو استعلامنا احنا (عمره صفر). لو عايز توقف المتهم: [[SELECT pg_cancel_backend(78);]].

---

## ٤. [[docker compose logs --since 5m api | grep -iE "timeout|slow|ECONNREFUSED"]]

[[--since 5m]] لوج آخر ٥ دقايق بس. [[grep -i]] من غير فرق كابيتال وسمول، و [[-E]] عشان [[|]] تبقى «أو».

ضفت للتطبيق endpoint بيكلّم «بوابة دفع» مش بترد، مع مهلة ٥ ثواني ([[AbortSignal.timeout(5000)]]):

~~~text الناتج
diag01-api  | payment gateway error: TimeoutError The operation was aborted due to timeout
~~~

والطلب نفسه رجع في ٥ ثواني بالظبط ([[502 5.007151s]])، مش ٦٠. ده الفرق اللي المهلة بتعمله: من غيرها كان الطلب هيفضل معلّق لحد ما Nginx يقطعه بـ 504، وكل الطلبات اللي زيه بتتراكم.

---

## ٥. [[grep -E "proxy_read_timeout|proxy_connect_timeout" /etc/nginx/sites-enabled/*]]

~~~text الناتج
        proxy_read_timeout 60s;
~~~

| الإعداد | معناه | الافتراضي |
|---|---|---|
| [[proxy_connect_timeout]] | أقصى وقت عشان يتصل بالتطبيق | 60s |
| [[proxy_read_timeout]] | أقصى وقت بين قرايتين من رد التطبيق | 60s |

لو مطلعش حاجة، يبقى شغال بالافتراضي (60s). رفعه بيخلي الـ 504 تختفي بس الطلب لسه بطيء والمستخدم لسه مستني.

---

## الجدول

| الأمر | لو طلع كده | يبقى |
|---|---|---|
| [[curl -w]] على التطبيق مباشرة | أكتر من ٦٠ ثانية | التطبيق البطيء، مش Nginx |
| [[docker stats]] | CPU قليل | التطبيق مستني حاجة |
| [[docker stats]] | CPU قريب 100٪ | التطبيق مخنوق |
| [[pg_stat_activity]] | استعلام عمره دقايق | ده المتهم |
| [[logs]] مع grep | timeout لخدمة خارجية | حط مهلة على كل اتصال خارجي |

## الخلاصة

- 504 = التطبيق رد متأخر. 502 = مردّش خالص.
- قيس الـ endpoint مباشرة بـ [[curl -w]] قبل أي حاجة.
- الحل تصليح البطء (index، مهلة، background job)، مش رفع [[proxy_read_timeout]].`,
          lines: [
            "اطلب الـ endpoint مباشرة من التطبيق وقيس الوقت.",
            "المعالج والرام لكل container.",
            "الاستعلامات الشغالة دلوقتي ومدتها: أطولها المتهم.",
            "اتصالات خارجية معلّقة في اللوج.",
            "مهلة Nginx الحالية (الافتراضي 60 ثانية)."
          ],
          sol: R`الفرق عن 502: هنا التطبيق بيرد بس ببطء. أول أمر [[curl -w "%{http_code} %{time_total}s"]] مباشرة على التطبيق ([[127.0.0.1:3000]]) هو الفيصل: لو أخد ٧٠ ثانية ورجع أخيرًا، يبقى التطبيق أو القاعدة بطيئين، مش Nginx. Nginx بيقطع الاتصال بعد [[proxy_read_timeout]] (٦٠ ثانية افتراضي) ويرمي 504.

[[pg_stat_activity]] بيوريك الاستعلامات الشغالة وعمرها ([[age]]): لو فيه query قاعد دقيقة، ده اللي بيعطّل. غالبًا استعلام من غير index أو lock. [[docker stats]] بيوريك لو التطبيق أو القاعدة بياكلوا CPU.

الحل مش إنك تزوّد [[proxy_read_timeout]] (ده بيخبّي المشكلة)، الحل تصلّح الاستعلام البطيء أو تضيف index أو تعمل الشغل التقيل في background job. زوّد الـ timeout بس لو العملية بطيئة بطبيعتها (رفع ملف كبير، تقرير). راجع «تاب SQL و Prisma» للـ indexes.`
        },
        {
          cmd: "500 من التطبيق",
          title: "الكود نفسه وقع في طلب معين",
          desc: "500 بيطلع من التطبيق نفسه (مش Nginx). exception في الكود: متغير بيئة ناقص، أو حقل null، أو migration متطبقتش. اللوج بتاع التطبيق فيه الـ stack trace، وده اللي بيقولك السطر.",
          example: R`docker compose logs --since 10m api | grep -A 15 -iE "error|exception"
curl -s -X POST http://127.0.0.1:3000/api/login -H "Content-Type: application/json" -d '{}' -i | head -5
docker exec api env | grep -E "DATABASE_URL|JWT_SECRET|NODE_ENV" | sed 's/=.*/=***/'
npx prisma migrate status
git log --oneline -5`,
          try: "اقرا الـ stack trace من تحت لفوق: أول سطر فيه مسار ملف من مشروعك (مش node_modules) هو مكان المشكلة.",
          deep: {
            why: "500 معناه exception في كودك. والخبر الكويس: الـ stack trace بيقولك الملف والسطر. الخبر الوحش: لازم تلاقيه في اللوج الصح.",
            how: R`[[grep -A 15 error]] بيطبع الـ error و ١٥ سطر بعده، وده الـ stack trace. اقراه من تحت لفوق: السطور اللي فيها [[node_modules]] تخطاها، أول سطر فيه مسار من [[src/]] أو [[dist/]] هو مكان المشكلة.

أشهر الأسباب بعد deploy: متغير بيئة ناقص على السيرفر (كان في .env بتاعك مش في .env بتاع السيرفر)، أو migration اتنسيت، أو مكتبة جديدة اتضافت والـ image متبنتش.

[[curl -X POST ... -d '{}']]: إعادة إنتاج المشكلة بطلب فاضي. لو 500 مع body فاضي، الكود مش بيتعامل مع input ناقص.

الأمر التالت بيعرض أسامي المتغيرات المهمة وبيخبّي قيمها (الـ sed بيستبدل اللي بعد =). لو واحد مش موجود، لقيت السبب.

[[prisma migrate status]]: لو فيه migration pending، الكود بيطلب عمود مش موجود.

[[git log]]: إيه اللي اتغير في آخر deploy. غالبًا المشكلة في آخر commit.`,
            when: "أي 500. وبعد deploy على طول.",
            mistakes: "تدوّر في الكود من غير stack trace. وتعمل console.log وتعيد deploy بدل ما تقرا اللوج الموجود."
          },
          teach: R`## الفكرة: 500 جاية من كودك، والسبب مكتوب في لوجه

Nginx في الحالة دي سليم وبيوصّل الرد زي ما هو. التطبيق هو اللي رمى exception ورجّع 500، واللوج بتاعه فيه الـ stack trace: الملف والسطر. شغلك تلاقيه وتقراه صح.

عملت ده في معمل: تطبيق Node 22 في Docker Compose (الـ container اسمه [[diag01-api]])، فيه route [[POST /api/login]] بيعمل [[input.email.toLowerCase()]] من غير ما يتأكد إن [[email]] موجود. ومعاه Postgres 16 و Prisma 6.

---

## ١. [[docker compose logs --since 10m api | grep -A 15 -iE "error|exception"]]

- [[logs --since 10m api]] لوج خدمة [[api]] في آخر ١٠ دقايق.
- [[grep -iE "error|exception"]] السطور اللي فيها error أو exception، من غير فرق في الحروف الكبيرة.
- [[-A 15]] (After) واطبع كمان ١٥ سطر **بعد** كل سطر لقيته، لأن الـ stack trace بييجي تحت سطر الـ error.

~~~text الناتج
diag01-api  | TypeError: Cannot read properties of undefined (reading 'toLowerCase')
diag01-api  |     at login (/app/src/auth.js:2:29)
diag01-api  |     at Server.<anonymous> (/app/src/server.js:14:74)
diag01-api  |     at process.processTicksAndRejections (node:internal/process/task_queues:103:5)
~~~

### إزاي تقرا الـ stack trace

| السطر | معناه |
|---|---|
| [[TypeError: Cannot read properties of undefined (reading 'toLowerCase')]] | نوع الغلطة ورسالتها: حاولت تقرا [[toLowerCase]] من حاجة [[undefined]] |
| [[at login (/app/src/auth.js:2:29)]] | حصلت جوه function [[login]]، في ملف [[auth.js]]، سطر 2، حرف 29 |
| [[at Server.<anonymous> (/app/src/server.js:14:74)]] | واللي نادى [[login]] كان سطر 14 في [[server.js]] |
| [[at process.processTicksAndRejections (node:internal/...)]] | جوه Node نفسه، تجاهله |

كل سطر [[at]] هو حد نادى اللي فوقه. دوّر على أول سطر فيه مسار من مشروعك (مش [[node:internal]] ولا [[node_modules]]): هنا [[auth.js:2]]، وده فعلًا السطر:

~~~text src/auth.js
const email = input.email.toLowerCase();
~~~

[[input.email]] مش موجود، فبقى [[undefined]]، و [[undefined.toLowerCase()]] بيقع.

> لاحظ إن اللوج ده كان فيه كمان أخطاء قديمة من مرات تشغيل سابقة لنفس الـ container (الـ restart مش بيمسح اللوج). عشان كده [[--since]] مهم: يركّز على الوقت اللي حصلت فيه المشكلة.

---

## ٢. [[curl -s -X POST http://127.0.0.1:3000/api/login -H "Content-Type: application/json" -d '{}' -i | head -5]]

أعد إنتاج المشكلة بإيدك:

- [[-X POST]] نوع الطلب POST.
- [[-H "Content-Type: application/json"]] header بيقول إن الـ body JSON.
- [[-d '{}']] الـ body: object فاضي، يعني طلب ناقص عمدًا.
- [[-i]] اطبع الـ headers مع الرد، عشان تشوف الـ status.
- [[| head -5]] أول ٥ سطور.

~~~text الناتج
HTTP/1.1 500 Internal Server Error
Content-Type: application/json
Date: Tue, 06 Oct 2026 12:57:17 GMT
Connection: keep-alive
Keep-Alive: timeout=5
~~~

طلب ناقص طلّع 500. يعني الكود مش بيتحقق من الـ input. الطلب الناقص المفروض يرجع 400 برسالة واضحة.

---

## ٣. [[docker exec api env | grep -E "DATABASE_URL|JWT_SECRET|NODE_ENV" | sed 's/=.*/=***/']]

- [[docker exec api env]] اطبع متغيرات البيئة جوه الـ container زي ما التطبيق شايفها فعلًا.
- [[grep -E]] خلي المتغيرات المهمة بس.
- [[sed 's/=.*/=***/']] [[s]] يعني substitute (استبدل): [[=.*]] يعني «علامة = وكل اللي بعدها»، يتبدل بـ = وبعدها ٣ نجوم. كده الأسامي تبان والقيم تستخبى.

~~~text الناتج
NODE_ENV=***
DATABASE_URL=***
JWT_SECRET=***
~~~

التلاتة موجودين. لو واحد ناقص مش هيطلع سطره خالص، وده السبب. ومن غير الـ [[sed]]، الباسورد كانت هتظهر كاملة في الترمنال (جرّبت وطلعت [[postgres://app:S3cret...]])، فمتشيلوش وانت بتشارك الشاشة.

---

## ٤. [[npx prisma migrate status]]

بيقارن فولدر [[prisma/migrations]] بجدول المايجريشنز في القاعدة. عملت migration جديدة بتضيف عمود [[lastLogin]] ومطبقتهاش:

~~~text الناتج
2 migrations found in prisma/migrations
Following migration have not yet been applied:
20261005090000_add_last_login

To apply migrations in development run prisma migrate dev.
To apply migrations in production run prisma migrate deploy.
~~~

والأمر خرج بـ [[exit=1]]. يعني الكود الجديد هيطلب عمود [[lastLogin]] والقاعدة معندهاش، وأي طلب بيستخدمه هيرجع 500. على السيرفر الحل [[npx prisma migrate deploy]] (مش [[dev]]).

---

## ٥. [[git log --oneline -5]]

[[--oneline]] كل commit في سطر: أول ٧ حروف من الـ hash والرسالة. و [[-5]] آخر ٥.

~~~text الناتج (repo تجريبي)
5e3925e Track lastLogin
ebc4db5 Normalize email on login
71fb84f Add login route
471c031 Add orders endpoint
e0fafee Initial API
~~~

الـ 500 في الـ login، وفيه commit اسمه «Normalize email on login». غالبًا ده اللي ضاف [[toLowerCase]]. [[git show ebc4db5]] بيوريك التغيير.

---

## الجدول

| الأمر | بيكشف |
|---|---|
| [[logs ... grep -A 15]] | الـ stack trace: الملف والسطر |
| [[curl -X POST -d '{}']] | المشكلة بتتكرر؟ ومع أي input |
| [[env]] مع grep و sed | متغير ناقص (من غير ما تكشف الأسرار) |
| [[prisma migrate status]] | migration متطبقتش |
| [[git log --oneline]] | إيه اللي اتغيّر في آخر deploy |

## الخلاصة

- 500 = افتح لوج التطبيق، مش لوج Nginx.
- اقرا الـ stack trace لحد أول سطر من مشروعك.
- استخدم [[--since]] عشان متتلخبطش بأخطاء قديمة.`,
          lines: [
            "الـ errors مع ١٥ سطر بعد كل واحد (الـ stack trace).",
            "أعد إنتاج المشكلة بطلب فاضي وشوف الرد.",
            "المتغيرات المهمة موجودة؟ (القيم مخفية).",
            "فيه migration لسه متطبقتش؟",
            "إيه اللي اتغير في آخر deploy."
          ],
          sol: R`500 معناها الكود نفسه رمى exception. [[docker compose logs --since 10m api | grep -A 15 -iE "error|exception"]] بيطلّع الـ stack trace. اقراه من تحت لفوق: أول سطر فيه مسار من مشروعك (مش [[node_modules]]) هو مكان المشكلة الحقيقي، اللي فوقه غالبًا كود المكتبات.

جرّب تعيد المشكلة بـ [[curl -X POST .../api/login -d '{}']] (body ناقص عمدًا): كتير من الـ 500 بتيجي من مدخل غير متوقع (null، حقل ناقص) الكود ماتعاملش معاه. لو الـ 500 اتحوّلت لـ 400 برسالة واضحة بعد ما تضيف validation، يبقى ده كان السبب.

الأسباب الشائعة اللي الأوامر دي بتكشفها: [[env | grep DATABASE_URL]] فاضي أو غلط (متغير بيئة ناقص بعد deploy)، [[prisma migrate status]] بيقول فيه migration مش متطبّق (الكود بيطلب عمود لسه مش موجود)، أو [[git log]] بيوريك آخر commit كسر حاجة. الفكرة: 500 = بص في لوج التطبيق، مش في Nginx.`
        },
        {
          cmd: "الديسك اتملى",
          title: "No space left on device",
          desc: "كل حاجة بتبوظ مرة واحدة: القاعدة مش بتكتب، واللوجات بتفشل، وحتى ssh ممكن يتعب. المتهمين بالترتيب: لوجات Docker، وصور Docker القديمة، ولوجات النظام، وباك أب متراكم.",
          example: R`df -h
sudo du -xh --max-depth=1 / 2>/dev/null | sort -rh | head
docker system df
sudo du -sh /var/lib/docker/containers/*/*-json.log | sort -rh | head -5
sudo journalctl --disk-usage
docker system prune -f && sudo journalctl --vacuum-time=7d`,
          try: "لوج container واحد ممكن يبقى جيجابايت. بعد ما تنضّف، حط حد في compose: logging max-size 10m.",
          flag: "danger",
          deep: {
            why: "الديسك المليان بيبوّظ كل حاجة بطريقة غريبة: قاعدة البيانات بتطلع errors مش مفهومة، والتطبيق بيقع، و apt بيفشل. وأول علامة غالبًا «No space left on device» في لوج عشوائي.",
            how: R`[[df -h]]: أنهي partition مليان. لو [[/]] على 100٪، كل حاجة بتتأثر.

[[du -xh --max-depth=1 /]]: أكبر الفولدرات في الجذر. [[-x]] يفضل على نفس الـ filesystem. بعدين تدخل الأكبر وتكرر. أو [[ncdu]] لو متسطب.

[[docker system df]]: Docker غالبًا المتهم الأول: صور قديمة من كل build، وbuild cache.

لوجات الـ containers: كل container بيكتب لوجه في ملف JSON بيكبر للأبد لو مفيش حد. الأمر الرابع بيوريك أكبرهم. لوج واحد ممكن ٥ جيجا.

[[journalctl --disk-usage]]: لوجات النظام.

التنضيف: [[docker system prune]] للصور والكاش (خد بالك: بيمسح كمان أي container واقف)، و [[journalctl --vacuum-time=7d]] للوجات القديمة. لوج container بيتفضّى بـ [[truncate -s 0]] (مش rm، لأن الـ container فاتحه).

وبعد التنضيف، الوقاية: [[logging: options: max-size: "10m", max-file: "3"]] في compose، و cron أسبوعي للـ prune.`,
            when: "errors غريبة في كذا خدمة مرة واحدة. ومراقبة: تنبيه على 80٪.",
            mistakes: "تمسح ملف لوج مفتوح بـ rm والمساحة متتحررش. truncate. وتمسح volumes Docker وانت مش متأكد فيها إيه."
          },
          teach: R`## الفكرة: مين اللي ملا الديسك؟ دوّر من فوق لتحت

الأوامر بتمشي زي ما بتدوّر في دولاب: أنهي رف مليان ([[df]])، وبعدين أنهي درج جواه ([[du]])، وبعدين المتهمين المعتادين (Docker واللوجات). الناتج من معمل: سيرفر Ubuntu 24.04 بـ systemd جوه Docker، عليه Docker Engine تاني جواه (عشان أوصل لملفات لوج الـ containers من غير ما ألمس Docker بتاعي)، وديسك صغير ٥٠ ميجا على [[/data]] ملّيته باك أب.

---

## العَرَض

~~~text محاولة كتابة على الديسك المليان
bash: line 1: echo: write error: No space left on device
dd: error writing '/data/x': No space left on device
~~~

نفس الرسالة دي هتطلع من Postgres أو Nginx أو apt، كل واحد بطريقته. أول ما تشوف [[No space left on device]] في أي لوج، روح للأوامر دي.

---

## ١. [[df -h]]

[[df]] (disk free) بيعرض كل partition: حجمه والمستخدم والفاضي. [[-h]] (human) بالـ M و G بدل البايتات.

~~~text الناتج
Filesystem      Size  Used Avail Use% Mounted on
tmpfs            50M   50M     0 100% /data
~~~

| العمود | معناه |
|---|---|
| [[Size]] | الحجم الكلي |
| [[Used]] | المستخدم |
| [[Avail]] | الفاضي فعلًا |
| [[Use%]] | النسبة. ١٠٠٪ = مفيش مكان |
| [[Mounted on]] | الفولدر اللي الـ partition ده متركّب عليه |

هنا [[/data]] مليان. على سيرفر حقيقي غالبًا هيبقى [[/]] نفسه.

---

## ٢. [[sudo du -xh --max-depth=1 / 2>/dev/null | sort -rh | head]]

[[du]] (disk usage) بيحسب حجم الفولدرات:

- [[-x]] متخرجش من الـ partition ده (متحسبش ديسكات تانية متركّبة جواه).
- [[-h]] أحجام مقروءة.
- [[--max-depth=1]] الفولدرات اللي تحت [[/]] مباشرة بس، مش كل الشجرة.
- [[2>/dev/null]] ارمي رسايل [[Permission denied]] وما شابه.
- [[sort -rh]] رتّب بالحجم ([[-h]] فاهم إن 1G أكبر من 900M)، و [[-r]] الأكبر الأول.
- [[head]] أول ١٠.

على الديسك الصغير:

~~~text du -xh --max-depth=1 /data | sort -rh
50M	/data/backups
50M	/data
0	/data/uploads
~~~

[[/data]] نفسه ٥٠ ميجا، كلهم في [[backups]]. بعد كده تدخل جوه وتكرر: [[du -xh --max-depth=1 /data/backups]]. وعلى [[/]] في نفس المعمل:

~~~text الناتج (أول السطور)
641M	/
565M	/usr
72M	/var
~~~

ولاحظ إن [[/var/lib/docker]] مظهرش خالص، مع إنه فيه أكتر من نص جيجا: في المعمل ده كان على partition لوحده، و [[-x]] بيقف عند حدود الـ partition. لو حاجة مش باينة، شوف [[df -h]] تاني.

---

## ٣. [[docker system df]]

ملخص Docker: الـ images والـ containers والـ volumes والـ build cache، وقد إيه منهم ممكن يتمسح ([[RECLAIMABLE]]).

~~~text الناتج
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          1         1         12.63MB   12.63MB (100%)
Containers      2         1         0B        0B
Local Volumes   0         0         0B        0B
Build Cache     0         0         0B        0B
~~~

كل حاجة صغيرة. بس استنى: في نفس اللحظة كان فيه لوج container حجمه **542 ميجا**، و [[docker system df]] مبيحسبش لوجات الـ containers. عشان كده الأمر الجاي.

---

## ٤. [[sudo du -sh /var/lib/docker/containers/*/*-json.log | sort -rh | head -5]]

Docker بيحفظ لوج كل container (كل اللي البرنامج بيطبعه) في ملف JSON في [[/var/lib/docker/containers/<id>/<id>-json.log]]، والملف ده **بيكبر للأبد** لو محطّتش حد. [[-s]] في [[du]] يعني «إجمالي لكل ملف» بدل التفاصيل، والـ [[*]] في المسار بتمسك كل الـ containers.

شغّلت container بيطبع سطر لوج في loop لمدة ٦ ثواني بس:

~~~text الناتج (المسار مقصوص)
542M	/var/lib/docker/containers/dae8fc7563...-json.log
0	/var/lib/docker/containers/d69c19dab7...-json.log
~~~

٥٤٢ ميجا في ثواني. تطبيق بيطبع debug كتير لمدة شهر ممكن يعمل عشرات الجيجا. ولمعرفة الـ id ده لمين: [[docker ps -a --no-trunc]] أو [[docker ps --format "{{.ID}} {{.Names}}"]]:

~~~text الناتج
d69c19dab74c quiet
dae8fc756318 chatty
~~~

### التفضية الآمنة

~~~bash
sudo truncate -s 0 /var/lib/docker/containers/dae8*/dae8*-json.log
~~~

[[truncate -s 0]] بيخلي حجم الملف صفر وهو لسه موجود ومفتوح. بعدها [[du]] قال [[0]]. متستخدمش [[rm]]: Docker فاتح الملف، فالمساحة مش هترجع (الدرس الجاي).

---

## ٥. [[sudo journalctl --disk-usage]]

لوجات systemd (اللوج المركزي بتاع النظام والخدمات):

~~~text الناتج
Archived and active journals take up 8.0M in the file system.
~~~

٨ ميجا، مش هو. على سيرفرات قديمة ممكن يبقى ٤ جيجا.

---

## ٦. التنضيف: [[docker system prune -f && sudo journalctl --vacuum-time=7d]]

### [[journalctl --vacuum-time=7d]]

امسح أرشيف اللوجات الأقدم من ٧ أيام:

~~~text الناتج
Vacuuming done, freed 0B of archived journals from /var/log/journal/a955a9b7d0c64728b380bb1830571a79.
Vacuuming done, freed 0B of archived journals from /run/log/journal.
~~~

[[freed 0B]] لأن السيرفر التجريبي عمره دقايق. ([[--vacuum-size=200M]] بديل بالحجم.)

### [[docker system prune -f]]

ده **مشغّلتهوش** لأنه بيمسح فعلًا. من الـ docs: بيمسح الـ containers الواقفة، والـ networks اللي محدش بيستخدمها، والـ images المتعلقة (dangling)، والـ build cache. و [[-f]] (force) من غير ما يسألك. مش بيمسح الـ volumes إلا لو زوّدت [[--volumes]]، ومش بيمسح images ليها اسم إلا مع [[-a]]. خد بالك من «الـ containers الواقفة»: لو عندك container واقف قصدًا وفيه حاجة، هيروح. عشان كده الـ flag بتاع الدرس danger.

---

## الوقاية

في [[compose.yaml]] لكل خدمة:

~~~text compose.yaml
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
~~~

يعني كل container بالكتير ٣ ملفات × ١٠ ميجا.

## الجدول

| الأمر | سؤاله |
|---|---|
| [[df -h]] | أنهي partition مليان؟ |
| [[du -xh --max-depth=1]] | أنهي فولدر الأكبر؟ |
| [[docker system df]] | images و cache (من غير اللوجات!) |
| [[du -sh .../*-json.log]] | لوج container متضخم؟ |
| [[journalctl --disk-usage]] | لوجات النظام قد إيه؟ |
| [[truncate -s 0]] و [[--vacuum-time]] | فضّي من غير ما تكسر حاجة |

## الخلاصة

- [[df]] بيقولك فين، [[du]] بيقولك مين.
- لوجات الـ containers مش باينة في [[docker system df]]، دوّر عليها بنفسك.
- [[truncate]] مش [[rm]]، وحط [[max-size]] من أول يوم.`,
          lines: [
            "أنهي partition مليان.",
            "أكبر الفولدرات في الجذر.",
            "Docker واكل قد إيه.",
            "أكبر ٥ لوجات containers.",
            "لوجات النظام.",
            "نضّف Docker ولوجات أقدم من أسبوع."
          ],
          sol: R`[[df -h]] بيوريك أي partition على 100٪ (عمود [[Use%]]). [[du -xh --max-depth=1 /]] بيرتّب الفولدرات بالحجم، والمعتاد إن أكبر واحد يكون [[/var]] (بسبب لوجات وDocker). [[docker system df]] بيفصّل: images وcontainers وvolumes وbuild cache.

المتهم الأشهر: لوجات Docker. [[du -sh /var/lib/docker/containers/*/*-json.log]] بيوريك لوج كل container، وممكن تلاقي واحد بجيجابايت لو التطبيق بيطبع كتير ومفيش حد للوج. [[journalctl --disk-usage]] بيوريك حجم لوج systemd.

[[docker system prune -f]] بيمسح الـ images والـ containers الميتة (آمن)، و [[journalctl --vacuum-time=7d]] بيسيب أسبوع لوج بس. بعد ما تفضّي، امنع التكرار: في [[compose.yaml]] حط [[logging: { driver: json-file, options: { max-size: "10m", max-file: "3" } }]] لكل service. ملحوظة: احذر [[docker system prune -a --volumes]] لأنه بيمسح الـ volumes وفيها الداتا. (flag بتاعه danger لأنه بيمسح.)`
        },
        {
          cmd: "فيه مساحة ولسه No space",
          title: "df -i والملفات الممسوحة المفتوحة",
          desc: "[[df -h]] بيقول ٤٠٪ والسيرفر بيقول No space left on device. سببين: الـ inodes خلصت (كل ملف بياخد inode، وملايين ملفات صغيرة زي cache أو sessions بتخلّصها قبل المساحة)، أو ملف كبير اتمسح بـ rm وعملية لسه فاتحاه فالمساحة متحررتش. [[df -i]] بيكشف الأولى، و [[lsof +L1]] التانية.",
          example: R`df -h / && df -i /
sudo du -x --inodes --max-depth=2 / 2>/dev/null | sort -rn | head
sudo find /tmp /var/tmp -xdev -type f | wc -l
sudo lsof -nP +L1 2>/dev/null | awk 'NR==1 || $7 > 100000000'
docker compose restart api && df -h /`,
          try: "لو IUse% في df -i على 100٪، الأمر التاني بيوريك أنهي فولدر فيه ملايين ملفات. ولو lsof طلّع ملف (deleted) كبير، ريستارت العملية اللي فاتحاه بيرجّع المساحة.",
          deep: {
            why: "الديسك مليان من غير ما df -h يقول كده. بتضيّع ساعة تدوّر على ملف كبير مش موجود.",
            how: R`[[df -i]]: الـ inodes، وده عدد الملفات المسموح بيه على الـ filesystem. لو IUse% 100٪، مفيش ملف جديد يتعمل مهما كانت المساحة فاضية.

[[du --inodes]]: زي du بس بيعد ملفات مش حجم. المتهمين: cache تطبيق بيعمل ملف لكل طلب، أو sessions، أو mail queue، أو node_modules كتير.

[[lsof +L1]]: ملفات اتمسحت (NLINK 0) وعملية لسه فاتحاها. لوج اتمسح بـ rm وهو مفتوح: المساحة محجوزة لحد ما العملية تقفله. العمود السابع الحجم، والـ awk بيعرض اللي أكبر من ١٠٠ ميجا.

الحل: للـ inodes امسح الملفات الصغيرة (find -delete على الفولدر المتهم) وصلّح اللي بيعملها. للمفتوح: ريستارت العملية، أو [[nginx -s reopen]] لو Nginx.`,
            when: "No space و df -h فيه مساحة. أو du و df مش متفقين.",
            mistakes: "تمسح لوج مفتوح بـ rm بدل truncate، فالمساحة متتحررش. وتدوّر بـ du على ملف مالوش مسار أصلًا."
          },
          teach: R`## الفكرة: «مليان» ليها معنيين تانيين غير المساحة

الديسك بيقول [[No space left on device]] في حالتين و [[df -h]] شايف مساحة فاضية:

1. **الـ inodes خلصت.** كل ملف (حتى لو حجمه بايت واحد) بياخد «خانة» اسمها inode، وعدد الخانات محدود. ملايين ملفات صغيرة بتخلّص الخانات قبل المساحة.
2. **ملف اتمسح وبرنامج لسه فاتحه.** [[rm]] بيشيل الاسم بس. طول ما فيه برنامج ماسك الملف، المساحة محجوزة.

عملت الحالتين في معمل: سيرفر Ubuntu 24.04 بـ systemd جوه Docker، وديسك تجريبي على [[/data2]] حجمه ٥٠٠ ميجا ومسموح فيه بـ ٢٠٠٠ inode بس (عشان يخلص بسرعة).

---

## الحالة الأولى: الـ inodes

عملت ملفات sessions صغيرة في loop لحد ما وقف:

~~~text الناتج
failed at 1996
bash: line 1: /data2/tmp/new.txt: No space left on device
~~~

### ١. [[df -h / && df -i /]]

[[&&]] يعني نفّذ التاني لو الأول نجح. والأمرين على نفس الديسك:

~~~text الناتج
Filesystem      Size  Used Avail Use% Mounted on
tmpfs           500M  7.8M  493M   2% /data2
Filesystem     Inodes IUsed IFree IUse% Mounted on
tmpfs            2000  2000     0  100% /data2
~~~

[[df -h]] بيقول ٢٪ بس، و [[df -i]] (i = inodes) بيقول ١٠٠٪. الأعمدة:

| العمود | معناه |
|---|---|
| [[Inodes]] | عدد الخانات الكلي |
| [[IUsed]] | المستخدم (ملف أو فولدر = واحد) |
| [[IFree]] | الفاضي |
| [[IUse%]] | النسبة: ١٠٠٪ = مفيش ملف جديد هيتعمل |

على سيرفر عادي (ext4) العدد بيتحدد وقت تجهيز الديسك، تقريبًا inode لكل ١٦ كيلو، فديسك ٢٥ جيجا فيه حوالي مليون ونص.

### ٢. [[sudo du -x --inodes --max-depth=2 / 2>/dev/null | sort -rn | head]]

نفس [[du]] بتاع الدرس اللي فات، بس [[--inodes]] بيعدّ **ملفات** مش حجم. و [[sort -rn]] ترتيب أرقام ([[-n]]) من الكبير ([[-r]]).

~~~text الناتج (على /data2)
2000	/data2
1998	/data2/app
1997	/data2/app/cache
1	/data2/tmp
~~~

[[/data2/app/cache]] فيه تقريبًا كل الملفات. ادخل جواه وكرر لحد ما توصل للفولدر المتهم ([[cache/sessions]]).

### ٣. [[sudo find /tmp /var/tmp -xdev -type f | wc -l]]

[[find]] بيلف على الملفات، [[-xdev]] زي [[-x]] متخرجش للديسكات التانية، [[-type f]] ملفات بس (من غير فولدرات)، و [[wc -l]] بيعد السطور = عدد الملفات. على [[/data2]]:

~~~text الناتج
1995
~~~

[[/tmp]] و [[/var/tmp]] متهمين معتادين لأن برامج كتير بتسيب فيهم ملفات مؤقتة.

الحل: امسح الملفات المتهمة ([[find /path -type f -mtime +7 -delete]] للأقدم من أسبوع مثلًا)، وصلّح البرنامج اللي بيعملها.

---

## الحالة التانية: ملف ممسوح ومفتوح

شغّلت برنامج Python كتب لوج ٣٠٠ ميجا وفضل فاتحه، ومسحت اللوج بـ [[rm]]:

~~~text قبل rm
tmpfs           500M  287M  214M  58% /data2
~~~

~~~text بعد rm
$ ls -la /data2/log
total 0
$ du -sh /data2
0	/data2
$ df -h /data2
tmpfs           500M  287M  214M  58% /data2
~~~

[[du]] بيقول صفر (مفيش ملفات باسم)، و [[df]] لسه بيقول ٢٨٧ ميجا مستخدمة. لما [[du]] و [[df]] يختلفوا كده، ده العَرَض.

### ٤. [[sudo lsof -nP +L1 2>/dev/null | awk 'NR==1 || $7 > 100000000']]

[[lsof]] (list open files) بيعرض الملفات المفتوحة ومين فاتحها:

- [[-n]] متحوّلش الـ IPs لأسامي، و [[-P]] متحوّلش البورتات لأسامي (أسرع).
- [[+L1]] الملفات اللي عدد أساميها (links) أقل من ١، يعني صفر = ممسوحة.
- [[awk 'NR==1 || $7 > 100000000']]: [[NR==1]] (رقم السطر = ١) سيب سطر العناوين، [[||]] أو، [[$7 > 100000000]] العمود السابع (الحجم بالبايت) أكبر من ١٠٠ مليون (حوالي ١٠٠ ميجا).

~~~text الناتج
COMMAND  PID USER   FD   TYPE DEVICE  SIZE/OFF NLINK NODE NAME
python3 2730 root    3w   REG   0,98 300000000     0 2002 /data2/log/app.log (deleted)
~~~

| العمود | القيمة | معناها |
|---|---|---|
| [[COMMAND]] و [[PID]] | python3 و 2730 | مين ماسك الملف |
| [[FD]] | [[3w]] | الملف رقم ٣ عنده، مفتوح للكتابة (w) |
| [[SIZE/OFF]] | 300000000 | الحجم: ٣٠٠ مليون بايت |
| [[NLINK]] | 0 | مالوش ولا اسم: اتمسح |
| [[NAME]] | [[(deleted)]] | الاسم القديم وجنبه إنه ممسوح |

### ٥. [[docker compose restart api && df -h /]]

الحل إن البرنامج يقفل الملف، وأسهل طريقة ريستارت. في المعمل البرنامج مش container، فقفلته بـ [[kill 2730]]:

~~~text df -h /data2 بعدها
tmpfs           500M     0  500M   0% /data2
~~~

الـ ٢٨٧ ميجا رجعوا في لحظة. ولو البرنامج Nginx، [[sudo nginx -s reopen]] بيخليه يقفل ويفتح ملفات اللوج من غير ريستارت.

---

## الجدول

| العَرَض | الأمر | الحل |
|---|---|---|
| [[df -h]] فاضي و [[df -i]] ١٠٠٪ | [[du --inodes]] | امسح الملفات الصغيرة وصلّح مصدرها |
| [[df]] أكبر بكتير من [[du]] | [[lsof +L1]] | ريستارت اللي ماسك الملف |

## الخلاصة

- [[df -i]] أول ما [[df -h]] يكدب.
- [[du]] بيعد الأسامي، [[df]] بيعد المساحة الحقيقية. الفرق بينهم = ملفات ممسوحة مفتوحة.
- فضّي اللوج بـ [[truncate -s 0]] مش [[rm]]، وساعتها الحالة التانية مش هتحصل.`,
          lines: [
            "المساحة والـ inodes: IUse% 100٪ = خلصت الملفات مش المساحة.",
            "أنهي فولدر فيه أكتر عدد ملفات.",
            "عدد الملفات في tmp (متهم معتاد).",
            "ملفات ممسوحة لسه مفتوحة وأكبر من ١٠٠ ميجا.",
            "ريستارت العملية اللي فاتحاها واتأكد إن المساحة رجعت."
          ],
          sol: R`الحيرة دي ليها سببين. الأول: الـ inodes خلصت مش المساحة. [[df -h /]] بيقول فيه مساحة، بس [[df -i /]] بيوريك عمود [[IUse%]] على 100٪. كل ملف بياخد inode واحد بغض النظر عن حجمه، فملايين الملفات الصغيرة (session files، cache، لوجات صغيرة كتير) بتخلّص الـ inodes والمساحة لسه فاضية. [[du --inodes]] بيلاقي الفولدر اللي فيه العدد الرهيب.

السبب التاني: ملف اتمسح وهو لسه مفتوح. [[lsof -nP +L1]] بيوريك الملفات اللي [[NLINK=0]] يعني اتمسحت بس عملية لسه ماسكاها، فالمساحة مش بترجع. جربت الأمر ده وطلّع مثلًا [[/memfd:... (deleted)]]. لو لقيت لوج كبير [[(deleted)]] ماسكه process، عمل [[restart]] للعملية بيقفل الـ handle والمساحة ترجع فورًا.

الفكرة اللي كتير بيقعوا فيها: يمسحوا لوج كبير بـ [[rm]] والتطبيق لسه كاتب فيه، فالمساحة ماترجعش لحد restart. الصح: [[truncate -s 0 file.log]] أو [[: > file.log]] بدل [[rm]].`
        },
        {
          cmd: "المعالج 100٪",
          title: "السيرفر بطيء وكل حاجة بتزحف",
          desc: "عملية واحدة بتاكل المعالج: build شغال على الإنتاج، أو loop لا نهائي في الكود، أو بوت بيضرب الموقع، أو cron بيشتغل كل دقيقة بدل كل يوم. htop بيقولك مين، وبعدين بتفهم ليه.",
          example: R`uptime
top -bn1 | head -15
docker stats --no-stream
ps aux --sort=-%cpu | head -5
sudo tail -100 /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -5
crontab -l`,
          try: "الـ load average في uptime: لو أكبر من عدد الأنوية (nproc) السيرفر مشغول أكتر من طاقته. قارن.",
          deep: {
            why: "السيرفر بطيء وكل طلب بياخد ثواني. حد بياكل المعالج. السؤال مين، وبعدين ليه.",
            how: R`[[uptime]]: الـ load average التلات أرقام (١ و ٥ و ١٥ دقيقة). قارنهم بعدد الأنوية. 4.0 على ٢ أنوية يعني ضعف الطاقة، والانتظار طويل.

[[top -bn1]]: لقطة واحدة (batch mode) بدل الشاشة التفاعلية، مرتبة بالمعالج. أول عملية هي المتهم.

[[docker stats]]: لو المتهم container، أنهي واحد.

[[ps --sort=-%cpu]]: نفس المعلومة بتفاصيل الأمر الكامل.

المتهمين المعتادين: build شغال على الإنتاج (npm run build بياكل كل الأنوية)، أو loop في الكود (endpoint بيلف على مليون صف)، أو بوت بيضرب الموقع (الأمر الخامس بيوريك أكتر IP في آخر ١٠٠ طلب)، أو cron بيشتغل كل دقيقة بالغلط ([[* * * * *]] بدل [[0 * * * *]])، أو تعدين عملات لو السيرفر متخترق (عملية باسم غريب من يوزر غريب).

الإسعاف: [[kill]] للعملية أو [[docker stop]]. والحل حسب السبب: build في CI، وحدود CPU للـ containers، و rate limiting للبوتات.`,
            when: "الموقع بطيء. load average عالي في المراقبة.",
            mistakes: "ريستارت للسيرفر كله. لو السبب cron أو بوت هيرجع بعد دقيقة، وضيّعت الدليل."
          },
          teach: R`## الفكرة: الأول «مين»، وبعدين «ليه»

السيرفر بطيء لأن حاجة واكلة المعالج. الأوامر الأربعة الأولى بتلاقي **مين** (أنهي عملية أو container)، والأخيرين بيدوّروا على **ليه** (زوار كتير؟ مهمة مجدولة؟).

عملت الحمل ده في معمل: سيرفر Ubuntu 24.04 بـ systemd جوه Docker، شغّلت فيه loop لا نهائي في الـ shell، و container تاني بيعمل نفس الحاجة (على Docker Engine جوه السيرفر)، و cron بيشتغل كل دقيقة، وبعت ١٠٠ طلب لـ Nginx من جهازين.

---

## ١. [[uptime]]

~~~text الناتج
 13:07:18 up  6:31,  0 user,  load average: 2.04, 1.66, 1.16
~~~

| الحتة | معناها |
|---|---|
| [[13:07:18]] | الساعة دلوقتي |
| [[up 6:31]] | شغال من ٦ ساعات و٣١ دقيقة من غير ريستارت (في المعمل ده عمر الماكينة اللي Docker شغال عليها، لأن الـ containers بتشارك نفس الكيرنل) |
| [[0 user]] | عدد اللي داخلين بترمنال |
| [[2.04, 1.66, 1.16]] | الـ load average: متوسط آخر دقيقة، و٥ دقايق، و١٥ دقيقة |

### يعني إيه load؟

تقريبًا: عدد العمليات اللي **شغالة أو مستنية دورها** على المعالج في المتوسط. لو عندك ٢ cores والـ load = 2، المعالج مليان بالظبط. لو 4، فيه عمليتين دايمًا مستنيين، وكل حاجة بتتأخر.

فالرقم لوحده ملوش معنى. قارنه بعدد الأنوية:

~~~bash
nproc
~~~

~~~text الناتج
16
~~~

load ٢ على ١٦ نواة = حوالي ١٢٪ من الطاقة، يعني السيرفر مرتاح رغم إن فيه عمليتين واكلين نواتين بالكامل. على VPS بنواتين، نفس الـ ٢ كانت هتبقى ١٠٠٪. والترتيب بيقولك الاتجاه: ١ دقيقة (2.04) أكبر من ١٥ دقيقة (1.16) يعني الحمل **بيزيد**.

---

## ٢. [[top -bn1 | head -15]]

[[top]] عادةً شاشة تفاعلية بتتحدّث. [[-b]] (batch) اطبع نص عادي ينفع تعمله pipe، و [[-n1]] لقطة واحدة واخرج. و [[head -15]] أول ١٥ سطر (الملخص وأعلى العمليات).

~~~text الناتج
top - 13:07:19 up  6:31,  0 user,  load average: 2.04, 1.66, 1.16
Tasks:  21 total,   3 running,  18 sleeping,   0 stopped,   0 zombie
%Cpu(s): 13.0 us,  7.7 sy,  0.0 ni, 75.7 id,  0.0 wa,  0.0 hi,  3.6 si,  0.0 st
MiB Mem :  15698.2 total,   6435.2 free,   1385.7 used,   8190.0 buff/cache
MiB Swap:   4096.0 total,   4095.2 free,      0.8 used.  14312.5 avail Mem

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND
   2800 root      20   0    1644    896    896 R 100.0   0.0   0:52.02 sh
   2814 root      20   0    2804   1664   1664 R 100.0   0.0   0:51.98 sh
      1 root      20   0   21340  12032   9600 S   0.0   0.1   0:00.97 systemd
~~~

سطر [[%Cpu(s)]] بيقسّم وقت المعالج: [[us]] (user) برامج عادية، [[sy]] (system) الكيرنل، [[id]] (idle) فاضي، [[wa]] (wait) مستني الديسك، [[st]] (steal) الـ hypervisor واخده منك (لو عالي على VPS، الجيران بياكلوا معالجك).

وفي الجدول: [[%CPU 100.0]] يعني نواة كاملة. ممكن تشوف ٢٠٠٪ أو أكتر لو العملية بتستخدم كذا نواة. و [[S]] الحالة: [[R]] شغالة، [[S]] نايمة. و [[TIME+]] وقت معالج استهلكته من ساعة ما بدأت.

المتهمين: عمليتين [[sh]] رقم 2800 و 2814. بس [[sh]] بس مش كفاية، محتاجين الأمر كامل.

---

## ٣. [[docker stats --no-stream]]

~~~text الناتج
CONTAINER ID   NAME      CPU %     MEM USAGE / LIMIT   MEM %     NET I/O         BLOCK I/O   PIDS
412452d2cb4a   burner    99.28%    356KiB / 15.33GiB   0.00%     726B / 126B     0B / 0B     1
d69c19dab74c   quiet     0.00%     352KiB / 15.33GiB   0.00%     1.49kB / 126B   0B / 0B     1
~~~

واحدة من العمليتين جوه container اسمه [[burner]]. ده بيقولك تعمل [[docker logs burner]] أو [[docker stop burner]] بدل ما تدوّر على PID.

---

## ٤. [[ps aux --sort=-%cpu | head -5]]

[[ps aux]] كل العمليات بتفاصيلها: [[a]] كل اليوزرز، [[u]] بأعمدة اليوزر والاستهلاك، [[x]] حتى اللي ملهاش ترمنال (الخدمات). و [[--sort=-%cpu]] رتّب بالمعالج، و [[-]] يعني من الكبير.

~~~text الناتج
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root        2814 99.9  0.0   2804  1664 ?        R    13:06   0:54 sh -c while :; do :; done
root        2800 99.8  0.0   1644   896 ?        Rs   13:06   0:54 sh -c while :; do :; done
root        2262 11.0  0.5 2870116 91820 ?       Ssl  13:04   0:20 /usr/bin/dockerd -H fd:// ...
~~~

دلوقتي باين الأمر كامل: [[while :; do :; done]] loop مبيعملش حاجة غير إنه يلف. و [[START 13:06]] بدأ امتى، ودي معلومة مهمة: هل بدأ مع آخر deploy؟ مع ميعاد cron؟

---

## ٥. أكتر IPs في آخر ١٠٠ طلب

~~~bash
sudo tail -100 /var/log/nginx/access.log | awk '{print $1}' | sort | uniq -c | sort -rn | head -5
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[tail -100 access.log]] | آخر ١٠٠ طلب |
| [[awk '{print $1}']] | العمود الأول من كل سطر، وهو IP الزائر |
| [[sort]] | رتّب عشان المتشابهين يبقوا جنب بعض |
| [[uniq -c]] | اجمع المتكرر واكتب عدده قدامه ([[-c]] = count). لازم [[sort]] قبله، لأنه بيجمع المتجاورين بس |
| [[sort -rn]] | رتّب بالعدد من الكبير |
| [[head -5]] | أكبر ٥ |

~~~text الناتج
     85 172.20.0.3
     15 127.0.0.1
~~~

IP واحد عامل ٨٥٪ من الطلبات. لو ده IP غريب وبيطلب مسارات زي [[/wp-login.php]]، روح لدرس «بوت بيضرب الموقع».

---

## ٦. [[crontab -l]]

~~~text الناتج
* * * * * /usr/bin/python3 /opt/report.py >> /var/log/report.log 2>&1
~~~

الخمس خانات: دقيقة، ساعة، يوم في الشهر، شهر، يوم في الأسبوع. [[*]] يعني «كل». فالسطر ده **كل دقيقة**. لو التقرير تقيل وبياخد أكتر من دقيقة، النسخ بتتراكم فوق بعض. غالبًا المقصود كان [[0 * * * *]] (أول كل ساعة) أو [[0 3 * * *]] (الساعة ٣ الفجر).

---

## الجدول

| الأمر | بيجاوب |
|---|---|
| [[uptime]] مع [[nproc]] | السيرفر فعلًا فوق طاقته؟ |
| [[top -bn1]] | أنهي PID واكل المعالج |
| [[docker stats]] | أنهي container |
| [[ps aux --sort=-%cpu]] | الأمر الكامل وبدأ امتى |
| [[access.log]] مع awk و uniq | زوار كتير من مكان واحد؟ |
| [[crontab -l]] | مهمة بتتكرر أكتر من اللازم؟ |

## الخلاصة

- load يتقارن بـ [[nproc]]، مش لوحده.
- [[%CPU]] 100 = نواة واحدة كاملة.
- متعملش ريستارت للسيرفر قبل ما تعرف مين، وإلا الدليل هيضيع والمشكلة هترجع.`,
          lines: [
            "الـ load average: قارنه بعدد الأنوية.",
            "لقطة من top مرتبة بالمعالج.",
            "لو المتهم container، أنهي واحد.",
            "أعلى ٥ عمليات بالأمر الكامل.",
            "أكتر IPs في آخر ١٠٠ طلب (بوت؟).",
            "مهمة cron بتشتغل كل دقيقة بالغلط؟"
          ],
          sol: R`[[uptime]] بيطلّع [[load average: 1.32, 1.84, 1.75]] (آخر ١ و٥ و١٥ دقيقة). قارن الأرقام دي بعدد الأنوية من [[nproc]]: عندي [[nproc]] = 4 وload = 1.3، يعني السيرفر مرتاح. لو الـ load أكبر من عدد الأنوية باستمرار، فيه عمليات مستنية دورها على المعالج والسيرفر بيزحف.

[[top -bn1 | head -15]] و [[ps aux --sort=-%cpu | head -5]] بيوريّوك أنهي عملية آكلة المعالج. لو Node أو Python واخدة 100٪+ باستمرار، غالبًا loop أو عملية تقيلة أو bot بيضربك.

آخر أمر ([[access.log | awk print $1 | uniq -c | sort]]) بيربط بالسبب الخارجي: لو IP واحد عامل آلاف الطلبات، ده اللي رافع المعالج (شوف درس البوت). و [[crontab -l]] بيكشف لو فيه مهمة مجدولة تقيلة اشتغلت في نفس التوقيت. الفكرة: load عالي = دوّر على العملية الأول، بعدين على مصدرها.`
        },
        {
          cmd: "الرام خلصت",
          title: "Killed أو exit code 137",
          desc: "لينكس لما الرام تخلص بيقتل أكبر عملية (OOM killer). التطبيق بيختفي فجأة من غير error في لوجاته. المكان الوحيد اللي بيسجّل ده لوج الكيرنل. والحل غالبًا حد للـ container، أو swap، أو رام أكبر.",
          example: R`free -h
sudo dmesg -T | grep -i "out of memory" | tail -5
sudo journalctl -k --since "1 hour ago" | grep -i oom
docker inspect --format '{{.State.OOMKilled}} {{.State.ExitCode}}' api
ps aux --sort=-%mem | head -5
swapon --show`,
          try: "لو dmesg فيه «Out of memory: Killed process 1234 (node)»، ده الدليل. رقم anon-rss في نفس السطر هو الرام اللي كانت واخداها وقت ما اتقتلت (docker stats بيوريك دلوقتي بس).",
          deep: {
            why: "أغرب عطل: التطبيق اختفى من غير error. لأن اللي قتله النظام نفسه مش الكود، فمفيش stack trace في لوج التطبيق.",
            how: R`لينكس لما الرام والـ swap يخلصوا بيشغّل OOM killer: بيختار العملية اللي هتحرر أكبر مساحة (غالبًا تطبيقك أو القاعدة) ويقتلها بـ SIGKILL. العملية مش بتعرف حاجة، بتختفي.

الدليل الوحيد في لوج الكيرنل: [[dmesg]] أو [[journalctl -k]]. السطر بيقول [[Out of memory: Killed process 1234 (node) total-vm:... anon-rss:...]]، والرقم anon-rss هو الرام اللي كانت واخداها.

جوه Docker: [[OOMKilled: true]] و exit code 137 لو الـ container عدّى حد الرام بتاعه (memory limit). لو السيرفر كله خلص رام، الكيرنل بيقتل من غير ما Docker يسجّل OOMKilled.

[[free -h]]: [[available]] هو الرقم المهم، مش free.

[[ps --sort=-%mem]]: مين واكل الرام دلوقتي.

[[swapon --show]]: فيه swap؟ سيرفر من غير swap بيقتل فورًا، معاه بيبطأ الأول وبيديك وقت.

الحلول بالترتيب: swap (٢ جيجا، شرحناه في VPS)، وحد رام لكل container عشان container واحد ميوقعش الباقي، ورام أكبر لو الاستهلاك الطبيعي قريب من الحد، وتصليح الـ leak لو التطبيق بيكبر مع الوقت.`,
            when: "التطبيق بيقع من غير error في لوجه. Exited (137). بطء شديد فجأة.",
            mistakes: "تدوّر في لوج التطبيق على سبب مش هتلاقيه. وتشغّل build على سيرفر ١ جيجا من غير swap."
          },
          teach: R`## الفكرة: اللي قتل التطبيق هو الكيرنل، فدوّر في لوج الكيرنل

لما الرام تخلص، لينكس بيشغّل حاجة اسمها **OOM killer** (Out Of Memory): بيختار عملية ويقتلها فورًا بإشارة SIGKILL، اللي مبتتمسكش ولا بتتأجل. التطبيق ملحقش يكتب ولا سطر error، فلوجه نضيف. الدليل الوحيد عند الكيرنل.

عملت ده في معمل: سيرفر Ubuntu 24.04 بـ systemd جوه Docker، وعليه Docker Engine تاني، شغّلت فيه container اسمه [[api]] بحد رام ٢٠ ميجا ([[--memory=20m --memory-swap=20m]]) وجواه shell بيضاعف string لحد ما الرام تخلص.

~~~text اللي ظهر في الترمنال
starting
exit=137
~~~

[[starting]] وبعدها مفيش أي حاجة. لا error ولا stack trace. و [[docker logs api]] بعدها طلّع نفس الكلمة بس.

---

## ١. [[free -h]]

~~~text الناتج
               total        used        free      shared  buff/cache   available
Mem:            15Gi       1.8Gi       5.9Gi        71Mi       8.0Gi        13Gi
Swap:          4.0Gi       796Ki       4.0Gi
~~~

| العمود | معناه |
|---|---|
| [[total]] | الرام كلها |
| [[used]] | مستخدمة فعلًا من البرامج |
| [[free]] | فاضية خالص ومش مستخدمة في أي حاجة |
| [[buff/cache]] | لينكس مستخدمها cache للملفات، وبيرجّعها أول ما برنامج يحتاج |
| [[available]] | **ده الرقم المهم**: قد إيه متاح لبرنامج جديد = free + الجزء اللي ينفع يتاخد من الـ cache |

[[free]] ٥.٩ بس [[available]] ١٣. لو بصيت على [[free]] بس هتفتكر الرام قربت تخلص وهي مش كده. (الأرقام دي للماكينة كلها: الـ container شايف رام الماكينة اللي Docker شغال عليها.)

---

## ٢. [[sudo dmesg -T | grep -i "out of memory" | tail -5]]

[[dmesg]] بيطبع رسايل الكيرنل. [[-T]] الوقت بشكل مقروء بدل «ثواني من ساعة ما الجهاز قام». و [[grep -i]] من غير فرق في الحروف.

~~~text الناتج
[Tue Oct  6 13:08:26 2026] Memory cgroup out of memory: Killed process 514879 (sh) total-vm:42612kB, anon-rss:19840kB, file-rss:0kB, shmem-rss:896kB, UID:0 pgtables:92kB oom_score_adj:0
~~~

نفكّه:

| الحتة | معناها |
|---|---|
| [[Memory cgroup out of memory]] | اللي خلص هو **حد** مجموعة (cgroup)، يعني حد الـ container، مش رام السيرفر كله. لو السيرفر كله خلص هتلاقي [[Out of memory:]] من غير [[Memory cgroup]] |
| [[Killed process 514879 (sh)]] | قتل العملية دي، واسمها [[sh]] |
| [[total-vm:42612kB]] | الذاكرة اللي العملية «حاجزاها» نظريًا (٤٢ ميجا) |
| [[anon-rss:19840kB]] | الرام اللي كانت مستخدماها فعلًا وقت القتل: حوالي ٢٠ ميجا = الحد بالظبط |
| [[oom_score_adj:0]] | تعديل على أولوية القتل (سالب = احميها، موجب = اقتلها الأول) |

[[anon-rss]] هو أهم رقم: الاستهلاك **لحظة الموت**. [[docker stats]] بعدها مش هيقولك ده.

---

## ٣. [[sudo journalctl -k --since "1 hour ago" | grep -i oom]]

[[-k]] (kernel) رسايل الكيرنل من journald، و [[--since "1 hour ago"]] آخر ساعة. ميزته عن [[dmesg]] إنه بيفضل بعد ريستارت (لو الـ journal محفوظ على الديسك)، و [[dmesg]] بيتمسح.

~~~text الناتج (مقصوص)
Oct 06 13:08:27 srv kernel: oom-kill:constraint=CONSTRAINT_MEMCG,...,task=sh,pid=514879,uid=0
Oct 06 13:08:27 srv kernel: Memory cgroup out of memory: Killed process 514879 (sh) total-vm:42612kB, anon-rss:19840kB, ...
~~~

[[CONSTRAINT_MEMCG]] تأكيد تاني إن السبب حد الـ container.

---

## ٤. [[docker inspect --format '{{.State.OOMKilled}} {{.State.ExitCode}}' api]]

[[docker inspect]] بيطبع كل معلومات الـ container (JSON طويل). [[--format]] بيختار خانات: [[{{.State.OOMKilled}}]] هل اتقتل بسبب الرام، و [[{{.State.ExitCode}}]] رقم الخروج.

~~~text الناتج
true 137
~~~

### ليه ١٣٧؟

لما عملية تموت بإشارة، رقم الخروج = ١٢٨ + رقم الإشارة. SIGKILL رقمها ٩، فـ ١٢٨ + ٩ = **١٣٧**. ولو شفت ١٤٣ = ١٢٨ + ١٥ (SIGTERM، يعني حد طلب منها تقفل بأدب).

> [[OOMKilled]] خانة بيملاها Docker للـ container بس. لو العملية اللي اتقتلت مش في container (خدمة systemd أو pm2)، أو مش متأكد من الرقم، [[dmesg]] هو المرجع.

---

## ٥. [[ps aux --sort=-%mem | head -5]]

نفس [[ps aux]] بتاع درس المعالج، مترتب بالرام:

~~~text الناتج
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
root        2262  8.0  0.5 2870116 92076 ?       Ssl  13:04   0:20 /usr/bin/dockerd -H fd:// ...
root        2236  0.3  0.3 2681132 60368 ?       Ssl  13:04   0:00 /usr/bin/containerd
root         986  0.0  0.1 100320 19200 ?        Ss   12:51   0:00 /usr/bin/python3 /opt/app.py
~~~

[[RSS]] (Resident Set Size) الرام الفعلية بالكيلوبايت (٩٢٠٧٦ ≈ ٩٠ ميجا). [[VSZ]] الذاكرة الافتراضية المحجوزة، وغالبًا أكبر بكتير ومش مهمة. ده «دلوقتي»، مش وقت الموت.

---

## ٦. [[swapon --show]]

~~~text الناتج
NAME     TYPE      SIZE USED PRIO
/dev/sdc partition   4G 796K   -2
~~~

فيه swap ٤ جيجا. لو الأمر مطبعش حاجة خالص، يبقى مفيش swap، وده معناه إن السيرفر أول ما الرام تخلص بيقتل على طول من غير ما يبطّأ الأول.

---

## الجدول

| الأمر | بيجاوب |
|---|---|
| [[free -h]] | المتاح فعلًا ([[available]]) |
| [[dmesg -T]] مع grep | الكيرنل قتل مين، وكان واكل قد إيه |
| [[journalctl -k]] | نفس الكلام، ومحفوظ بعد الريستارت |
| [[docker inspect]] OOMKilled و ExitCode | الـ container عدّى حده؟ ([[true 137]]) |
| [[ps aux --sort=-%mem]] | مين واكل الرام دلوقتي |
| [[swapon --show]] | فيه swap؟ |

## الخلاصة

- تطبيق اختفى من غير error + exit 137 = غالبًا رام.
- الدليل في [[dmesg]] و [[journalctl -k]]، مش في لوج التطبيق.
- [[Memory cgroup out of memory]] = حد الـ container. [[Out of memory]] لوحدها = السيرفر كله.`,
          lines: [
            "الرام: بص على available.",
            "لوج الكيرنل: هل قتل عملية بسبب الذاكرة؟",
            "نفس السؤال من journalctl.",
            "الـ container اتقتل بسبب حد الرام بتاعه؟",
            "أعلى ٥ عمليات في الرام دلوقتي.",
            "فيه swap؟"
          ],
          sol: R`لما عملية تتقتل بسبب الرام، exit code بيبقى [[137]] (يعني 128+9، السيجنال SIGKILL). جربتها: شغّلت container بـ [[--memory=20m]] وخلّيته ياكل رام، و [[docker inspect --format '{{.State.OOMKilled}} {{.State.ExitCode}}']] رجّع [[true 137]] بالظبط.

الدليل القاطع في [[dmesg -T | grep -i "out of memory"]]. جربته وطلع سطر حقيقي:

[[Memory cgroup out of memory: Killed process 8371 (node) total-vm:745328kB, anon-rss:64320kB, ...]]

[[anon-rss]] هو الرام اللي كانت العملية واخداها وقت ما اتقتلت (هنا ٦٤ ميجا لأن الحد كان صغير). ده مهم لأن [[docker stats]] بيوريك الاستهلاك دلوقتي بس، مش وقت الموت. [[free -h]] بيوريك الرام الكلية والمتاحة، و [[swapon --show]] بيوريك لو فيه swap. الحل: زوّد رام السيرفر، أو حط [[mem_limit]] معقول للـ container، أو دوّر على memory leak في التطبيق. exit 137 دايمًا = رام.`
        },
        {
          cmd: "مش قادر أعمل SSH",
          title: "Connection refused أو timed out أو Permission denied",
          desc: "تلات رسايل، تلات أسباب. timed out: الفايروول أو السيرفر واقع. refused: السيرفر شغال بس sshd واقع أو على بورت تاني. Permission denied (publickey): المفتاح غلط أو صلاحياته أو اليوزر غلط. وفي كل الحالات console شركة الاستضافة هو الباب الخلفي.",
          example: R`ssh -v deploy@203.0.113.10 2>&1 | grep -iE "connect|denied|offering|identity"
nc -zv -w 5 203.0.113.10 22
ssh -i ~/.ssh/id_ed25519 deploy@203.0.113.10
ls -l ~/.ssh/id_ed25519
ssh -p 2222 deploy@203.0.113.10
ping -c 2 203.0.113.10`,
          try: "[[-v]] بيطبع كل خطوة: هتشوف «Offering public key» وبعدها القبول أو الرفض. لو مفيش offering، ssh مش لاقي المفتاح أصلًا.",
          deep: {
            why: "SSH هو الباب. لو اتقفل، كل التشخيص التاني مستحيل. الرسالة بتقولك السبب، والـ console بتاعة الاستضافة هو الباب الخلفي دايمًا.",
            how: R`[[ssh -v]] بيطبع كل خطوة: الاتصال، وتبادل المفاتيح، و«Offering public key: ~/.ssh/id_ed25519»، وبعدين القبول أو «Permission denied». الـ grep بيفلتر على السطور المهمة.

«Connection timed out»: الطلب موصلش. [[nc -zv 22]] بيأكد. الأسباب: السيرفر واقف (لوحة الاستضافة)، أو ufw قفل 22 (عملت [[ufw enable]] قبل [[allow OpenSSH]])، أو fail2ban حظرك بعد محاولات فاشلة، أو الـ IP اتغير.

«Connection refused»: السيرفر شغال بس sshd واقف أو على بورت تاني. [[-p 2222]] لو غيّرت البورت ونسيت.

«Permission denied (publickey)»: وصلت و sshd رفض المفتاح. الأسباب: بتدخل بيوزر غلط (root بعد ما قفلته)، أو المفتاح مش موجود في authorized_keys بتاع اليوزر ده، أو صلاحيات المفتاح على جهازك ([[ls -l]] لازم 600)، أو صلاحيات .ssh على السيرفر (700 للفولدر و 600 للملف).

الـ console من لوحة الاستضافة (Hostinger عندها) بتدخلك من غير شبكة: تصلّح ufw أو sshd_config أو authorized_keys منها.`,
            when: "أي فشل SSH. وقبل ما تقفل أي جلسة بعد تعديل sshd أو ufw.",
            mistakes: "تعدّل sshd_config وتعمل restart وتقفل الترمنال قبل ما تجرّب من نافذة تانية. ده أشهر سبب للانقفال."
          },
          teach: R`## الفكرة: ٣ رسايل، ٣ أماكن مختلفة

SSH بيفشل في واحدة من مرحلتين: **الاتصال** (الشبكة والبورت)، أو **الدخول** (المفتاح واليوزر). الرسالة بتقولك أنهي مرحلة، والأوامر بتأكد.

جرّبت كل حالة بجد: سيرفر Ubuntu 24.04 بـ systemd جوه Docker ([[srv]] على [[172.20.0.2]]) عليه OpenSSH ويوزر [[deploy]] والدخول بالمفتاح بس، و container تاني بيلعب دور جهازك (شغال بيوزر root، فالمسارات تحت [[/root/.ssh]]، وعندك هتبقى [[~/.ssh]]).

| الرسالة | المرحلة | معناها |
|---|---|---|
| [[Connection timed out]] | الاتصال | محدش رد: فايروول أو السيرفر واقف أو IP غلط |
| [[Connection refused]] | الاتصال | السيرفر رد: مفيش SSH على البورت ده |
| [[Permission denied (publickey)]] | الدخول | وصلت لـ SSH، ورفض المفتاح |

---

## ١. [[ssh -v deploy@IP 2>&1 | grep -iE "connect|denied|offering|identity"]]

- [[-v]] (verbose) اطبع كل خطوة بتحصل. الرسايل دي بتطلع على stderr.
- [[2>&1]] ودّي stderr لنفس مكان stdout، عشان الـ [[grep]] يشوفها (من غيرها الـ grep مش هيلاقي حاجة).
- [[grep -iE "..."]] خلي السطور المهمة بس.

### والدخول ناجح

~~~text الناتج (مقصوص)
debug1: Connecting to srv [172.20.0.2] port 22.
debug1: Connection established.
debug1: identity file /root/.ssh/id_rsa type -1
...
debug1: identity file /root/.ssh/id_ed25519 type 3
...
debug1: Offering public key: /root/.ssh/id_ed25519 ED25519 SHA256:ErOoF948d3gx...
Authenticated to srv ([172.20.0.2]:22) using "publickey".
~~~

اقراه بالترتيب:

| السطر | معناه |
|---|---|
| [[Connecting to ... port 22]] | بيحاول يتصل |
| [[Connection established]] | الاتصال نجح: الشبكة والبورت تمام |
| [[identity file ... type -1]] | دوّر على مفتاح بالاسم ده وملقاهوش ([[-1]] = مش موجود) |
| [[identity file .../id_ed25519 type 3]] | لقى المفتاح ده |
| [[Offering public key]] | عرضه على السيرفر |
| [[Authenticated ... using "publickey"]] | السيرفر قبله |

### بيوزر غلط (root، والسيرفر قافل دخول root)

~~~text الناتج (من أول Offering)
debug1: Offering public key: /root/.ssh/id_ed25519 ED25519 SHA256:ErOoF948d3gx...
debug1: Authentications that can continue: publickey
debug1: Trying private key: /root/.ssh/id_ed25519_sk
...
debug1: No more authentication methods to try.
root@srv: Permission denied (publickey).
~~~

عرض المفتاح، والسيرفر رد بـ [[Authentications that can continue: publickey]] يعني «مش ده، جرّب حاجة تانية». جرّب الباقي وخلص. المفتاح سليم، بس مش مسموح لـ [[root]]. (ملحوظة: رسالة «Server refused our key» بتاعة PuTTY على ويندوز، مش OpenSSH.)

### من غير مفتاح خالص

شلت المفتاح من مكانه:

~~~text الناتج
debug1: Connection established.
debug1: identity file /root/.ssh/id_ed25519 type -1
...
deploy@srv: Permission denied (publickey).
~~~

مفيش ولا سطر [[Offering]]. يعني ssh ملقاش مفتاح يعرضه أصلًا. الحل [[-i]] (الأمر التالت).

---

## ٢. [[nc -zv -w 5 IP 22]]

بيفصل «الشبكة» عن «المفتاح»:

~~~text البورت مفتوح
Connection to srv (172.20.0.2) 22 port [tcp/ssh] succeeded!
~~~

لو نجح والـ ssh بيقول Permission denied، المشكلة مش شبكة خالص.

---

## ٣. [[ssh -i ~/.ssh/id_ed25519 deploy@IP]]

[[-i]] (identity) حدد المفتاح بإيدك. مفيد لو المفتاح اسمه مش من الأسامي اللي ssh بيدوّر عليها لوحده (زي [[~/.ssh/myserver]])، أو عندك مفاتيح كتير.

---

## ٤. [[ls -l ~/.ssh/id_ed25519]]

غيّرت صلاحيات المفتاح لـ 644 (أي حد على الجهاز يقدر يقراه):

~~~text الناتج
-rw-r--r-- 1 root root 399 Oct  6 13:09 /root/.ssh/id_ed25519
~~~

~~~text ssh بعدها
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
Permissions 0644 for '/root/.ssh/id_ed25519' are too open.
It is required that your private key files are NOT accessible by others.
This private key will be ignored.
Load key "/root/.ssh/id_ed25519": bad permissions
deploy@srv: Permission denied (publickey).
~~~

اقرا [[-rw-r--r--]]: أول حرف نوع الملف ([[-]] ملف عادي)، وبعدين ٣ مجموعات كل واحدة ٣ حروف: صاحب الملف [[rw-]] (قراية وكتابة)، المجموعة [[r--]] (قراية)، الباقي [[r--]] (قراية). المفتاح الخاص لازم صاحبه بس اللي يقراه:

~~~bash
chmod 600 ~/.ssh/id_ed25519
~~~

~~~text الناتج
-rw------- 1 root root 399 Oct  6 13:09 /root/.ssh/id_ed25519
~~~

600 = [[rw-]] لصاحبه و [[---]] للباقيين. ونفس القاعدة على السيرفر: [[~/.ssh]] لازم 700 و [[authorized_keys]] لازم 600، وإلا sshd بيتجاهلهم.

> على ويندوز الصلاحيات مش بالأرقام دي، ولو OpenSSH اشتكى من صلاحيات المفتاح، الحل من خصائص الملف (Security) إن يوزرك بس اللي ليه صلاحية.

---

## ٥. [[ssh -p 2222 deploy@IP]]

[[-p]] بورت غير 22. جرّبته مرتين:

~~~text الفايروول قافل 2222 (مع -o ConnectTimeout=5)
ssh: connect to host srv port 2222: Connection timed out
~~~

~~~text الفايروول سامح بيه بس مفيش SSH عليه
ssh: connect to host srv port 2222: Connection refused
~~~

[[-o ConnectTimeout=5]] بيخلي ssh يستسلم بعد ٥ ثواني. من غيره في المعمل فضل مستني أكتر من دقيقتين. ورقم الخروج في كل حالات الفشل [[255]]، فمش هيفرق بينهم: اقرا الرسالة.

---

## ٦. [[ping -c 2 IP]]

~~~text الناتج
2 packets transmitted, 2 received, 0% packet loss, time 1019ms
~~~

السيرفر حي. لو مردّش ولا [[nc]] نجح، افتح لوحة الاستضافة: السيرفر واقف؟ والـ console بتاعها بيدخلك من غير شبكة.

---

## الجدول

| شفت إيه | السبب | الحل |
|---|---|---|
| timed out | فايروول، أو السيرفر واقف، أو IP غلط | لوحة الاستضافة والـ console |
| refused | sshd واقف أو على بورت تاني | [[-p]] بالبورت الصح، أو شغّل sshd من الـ console |
| denied ومفيش Offering | مفيش مفتاح | [[-i]] |
| denied بعد Offering | المفتاح مش مسموح لليوزر ده | اليوزر الصح، أو ضيف المفتاح لـ [[authorized_keys]] |
| [[UNPROTECTED PRIVATE KEY]] | صلاحيات المفتاح مفتوحة | [[chmod 600]] |

## الخلاصة

- اقرا الرسالة: timeout و refused مشاكل اتصال، denied مشكلة دخول.
- [[ssh -v]] و [[2>&1]] بيوروك المفتاح اتعرض ولا لأ.
- متقفلش الترمنال بعد تعديل sshd أو ufw قبل ما تجرّب من نافذة تانية.`,
          lines: [
            "كل خطوات الاتصال، مفلترة على المهم: وصلت؟ عرض مفتاح؟ اترفض؟",
            "بورت 22 بيرد؟ (timeout فايروول، refused sshd واقف).",
            "حدد المفتاح صراحة.",
            "صلاحيات المفتاح لازم 600.",
            "لو غيّرت البورت.",
            "السيرفر شغال أصلًا؟"
          ],
          sol: R`[[ssh -v]] بيطبع كل خطوة، والرسايل بتفرّق بين ٣ أعطال مختلفة تمامًا:

[[Connection refused]] على بورت 22: السيرفر رد بس مفيش SSH سامع (الخدمة واقعة، أو البورت اتغير لـ 2222). [[Connection timed out]]: مفيش رد خالص، فايروول بيمنع أو IP غلط. [[Permission denied (publickey)]]: وصلت لـ SSH بس المفتاح مش مقبول.

[[nc -zv -w 5 ...22]] بيفصل الشبكة عن المصادقة: لو نجح يبقى البورت مفتوح والمشكلة في المفتاح؛ لو فشل يبقى شبكة/فايروول. في [[-v]] دوّر على [[Offering public key]]: لو مش موجودة، ssh مش لاقي مفتاح أصلًا (حدّده بـ [[-i ~/.ssh/id_ed25519]]). لو موجودة واتبعها [[Authentications that can continue: publickey]] وبعدين [[Permission denied]]، يبقى السيرفر رفض المفتاح: مش في [[authorized_keys]] بتاع اليوزر ده، أو اليوزر غلط. (رسالة «Server refused our key» بتاعة PuTTY مش OpenSSH.)

سبب خفي شائع: صلاحيات المفتاح. [[ls -l ~/.ssh/id_ed25519]] لازم يكون [[600]]، لو أوسع (زي 644) ssh بيطبع [[WARNING: UNPROTECTED PRIVATE KEY FILE!]] و [[This private key will be ignored]] وبعدين [[Permission denied (publickey)]]. راجع «تاب ssh config». (اتجربت الحالات دي على سيرفر OpenSSH في container أوبونتو 24.04.)`
        },
        {
          cmd: "قاعدة البيانات مش بترد",
          title: "ECONNREFUSED أو too many connections",
          desc: "التطبيق بيقول مش قادر يوصل للقاعدة. إما القاعدة واقعة، أو الاتصالات خلصت، أو DATABASE_URL فيه localhost بدل اسم الخدمة، أو الديسك اتملى فالقاعدة رفضت تكتب.",
          example: R`docker compose ps db
docker compose logs --tail 30 db
docker exec api nc -zv db 5432
docker exec db psql -U postgres -c "SELECT count(*), state FROM pg_stat_activity GROUP BY state;"
docker exec api sh -c 'echo $DATABASE_URL' | sed 's/:[^:@]*@/:***@/'
docker exec db psql -U postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = 'idle in transaction' AND now() - state_change > interval '5 minutes';"`,
          try: "لو الاتصالات idle كتير، التطبيق بيفتح ومش بيقفل. الأمر الأخير إسعاف، والحل الحقيقي pooling أو إصلاح الكود.",
          flag: "danger",
          deep: {
            why: "التطبيق شغال ومش عارف يوصل للقاعدة. الرسالة في لوج التطبيق بتفرق: ECONNREFUSED غير too many connections غير timeout.",
            how: R`[[compose ps db]]: القاعدة شغالة أصلًا؟ ولو healthcheck موجود، healthy؟

[[logs db]]: Postgres بيسجّل ليه مبيقبلش: [[FATAL: sorry, too many clients already]]، أو [[could not write to file: No space left]]، أو [[database system is starting up]] بعد وقوع (recovery بياخد وقت).

[[nc -zv db 5432]] من جوه التطبيق: الشبكة بين الـ containers سليمة؟ لو refused والقاعدة شغالة، مش على نفس الشبكة أو الاسم غلط.

[[pg_stat_activity GROUP BY state]]: لو المجموع قريب من max_connections (100)، خلصت. ولو [[idle in transaction]] كتير، التطبيق بيفتح transactions ومش بيقفلها (bug أو اتصالات اتقطعت).

الأمر الخامس بيعرض DATABASE_URL بالباسورد مخفي: [[localhost]] جوه container غلط، لازم [[db]].

الأمر الأخير إسعاف: يقفل الاتصالات المعلّقة أكتر من ٥ دقايق. بيرجّع الموقع فورًا، بس لو السبب في الكود هيرجع. الحل الدائم pooling وإصلاح الكود.`,
            when: "ECONNREFUSED، too many connections، أو timeouts في الاستعلامات.",
            mistakes: "ترفع max_connections. وتعمل restart للقاعدة وفيها transactions شغالة."
          },
          teach: R`## الفكرة: رسالة الخطأ بتفرق بين ٣ أعطال

«مش قادر أوصل للقاعدة» ليها كذا شكل، وكل شكل ليه سبب:

| الرسالة في لوج التطبيق | السبب |
|---|---|
| [[ECONNREFUSED 127.0.0.1:5432]] | التطبيق بيدوّر على القاعدة في المكان الغلط ([[localhost]] جوه container) أو القاعدة لسه بتقوم |
| [[ENOTFOUND db]] | اسم [[db]] مش موجود على الشبكة: الـ container واقف أو على شبكة تانية |
| [[sorry, too many clients already]] | القاعدة شغالة، بس كل الاتصالات مشغولة |

جرّبت التلاتة: مشروع Docker Compose فيه [[api]] (Node 22، الـ container اسمه [[diag01-api]]) و [[db]] (Postgres 16، اسمه [[diag01-pg]]) بـ [[max_connections=10]] بس عشان يخلص بسرعة، وفتحت اتصالات بتعمل [[BEGIN]] وتسكت.

---

## ١. [[docker compose ps db]]

~~~text والقاعدة شغالة
NAME        IMAGE         COMMAND                  SERVICE   CREATED          STATUS          PORTS
diag01-pg   postgres:16   "docker-entrypoint.s…"   db        21 minutes ago   Up 21 minutes   5432/tcp
~~~

وقّفتها وشغّلت [[docker compose ps -a db]] (الـ [[-a]] عشان يبان الواقف):

~~~text الناتج
diag01-pg   postgres:16   ...   Exited (0) Less than a second ago
~~~

لو عندك healthcheck هتشوف [[(healthy)]] أو [[(unhealthy)]] جنب [[Up]].

---

## ٢. [[docker compose logs --tail 30 db]]

Postgres بيكتب سبب الرفض في لوجه:

~~~text الناتج (آخر السطور وقت الزحمة)
diag01-pg  | 2026-10-06 13:13:03.607 UTC [230] FATAL:  remaining connection slots are reserved for roles with the SUPERUSER attribute
diag01-pg  | 2026-10-06 13:13:15.531 UTC [278] FATAL:  sorry, too many clients already
~~~

| الحتة | معناها |
|---|---|
| الرقم بين القوسين المربعين ([[230]]) | رقم العملية اللي اتعملت للاتصال ده |
| [[FATAL]] | الاتصال اترفض واتقفل |
| [[remaining connection slots are reserved...]] | آخر ٣ أماكن (افتراضيًا) محجوزة للسوبر يوزر، فاليوزر العادي اترفض |
| [[sorry, too many clients already]] | حتى أماكن السوبر يوزر خلصت |

وبعد ما رجّعتها:

~~~text الناتج
diag01-pg  | ... LOG:  database system was shut down at 2026-10-06 13:13:42 UTC
diag01-pg  | ... LOG:  database system is ready to accept connections
~~~

[[ready to accept connections]] = جاهزة. لو شفت [[the database system is starting up]] يبقى لسه بتقوم (ممكن تاخد وقت بعد وقوع مفاجئ).

---

## ٣. [[docker exec api nc -zv db 5432]]

من جوه container التطبيق: [[db]] بيوصل؟ (الـ image بتاعة Node مفيهاش [[nc]]، فجرّبت من container تاني على نفس الشبكة.)

~~~text والقاعدة شغالة
Connection to db (172.22.0.2) 5432 port [tcp/postgresql] succeeded!
~~~

~~~text والقاعدة واقفة
nc: getaddrinfo for host "db" port 5432: No address associated with hostname
~~~

لاحظ: مش refused. لما الـ container يقف، Docker بيشيل اسمه من الـ DNS بتاع الشبكة، فالاسم نفسه مش بيتحل. والتطبيق بيقول نفس الكلام بطريقته:

~~~text من Node جوه api
ENOTFOUND getaddrinfo ENOTFOUND db
~~~

ولو التطبيق متظبط على [[localhost]] بدل [[db]]:

~~~text من Node جوه api
ECONNREFUSED connect ECONNREFUSED 127.0.0.1:5432
~~~

جوه الـ container، [[localhost]] هو الـ container نفسه، ومفيش Postgres جواه.

---

## ٤. الاتصالات بحالتها

~~~bash
docker exec db psql -U postgres -c "SELECT count(*), state FROM pg_stat_activity GROUP BY state;"
~~~

[[pg_stat_activity]] صف لكل اتصال. [[GROUP BY state]] اجمعهم حسب الحالة، و [[count(*)]] عد كل مجموعة. (اليوزر في المعمل اسمه [[app]].)

~~~text الناتج وقت الزحمة
 count |        state
-------+---------------------
     5 |
     1 | active
     9 | idle in transaction
(3 rows)
~~~

| الحالة | معناها |
|---|---|
| فاضية | عمليات Postgres الداخلية (background workers)، مش اتصالات تطبيق |
| [[active]] | بينفّذ استعلام دلوقتي (ده استعلامنا احنا) |
| [[idle]] | متصل وفاضي، عادي في الـ pool |
| [[idle in transaction]] | فتح [[BEGIN]] ولا عمل [[COMMIT]] ولا [[ROLLBACK]]، وقاعد ماسك الاتصال (وممكن ماسك locks) |

٩ [[idle in transaction]] + ١ active = ١٠ = [[max_connections]]. القاعدة سليمة، والتطبيق هو اللي ماسك كل الأماكن ومش بيسيبها.

---

## ٥. [[docker exec api sh -c 'echo $DATABASE_URL' | sed 's/:[^:@]*@/:***@/']]

- [[sh -c '...']] الـ [[$DATABASE_URL]] لازم يتفك **جوه** الـ container، فبنبعته لـ shell هناك بين علامتين [[' ']] عشان الـ shell بتاعك ميفكوش الأول (عندك المتغير ده مش موجود أو بقيمة تانية).
- [[sed 's/:[^:@]*@/:***@/']] بيدوّر على [[:]] وبعدها أي حروف مش [[:]] ولا [[@]]، وبعدها [[@]]، يعني الباسورد بالظبط، ويحط مكانها نجوم.

~~~text الناتج
postgres://app:***@db:5432/app
~~~

اقراها: [[postgres://يوزر:باسورد@هوست:بورت/قاعدة]]. الهوست [[db]] صح. لو لقيت [[localhost]] أو [[127.0.0.1]] هنا، ده سبب الـ ECONNREFUSED.

---

## ٦. الإسعاف: [[pg_terminate_backend]]

~~~bash
docker exec db psql -U postgres -c "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = 'idle in transaction' AND now() - state_change > interval '5 minutes';"
~~~

- [[pg_terminate_backend(pid)]] اقفل الاتصال ده (وأي transaction مفتوحة فيه بتترجع rollback).
- [[state_change]] امتى الاتصال دخل حالته الحالية، فـ [[now() - state_change]] بقاله قد إيه ساكت.
- [[interval '5 minutes']] أكتر من ٥ دقايق، عشان متقطعش حاجة لسه شغالة.

### فخ حصل فعلًا

أول ما جرّبته والقاعدة مليانة:

~~~text الناتج
psql: error: ... FATAL:  sorry, too many clients already
~~~

الإسعاف نفسه محتاج اتصال! قفلت اتصال واحد بإيدي، وبعدين شغّلته (بـ [[interval '5 seconds']] لأن اتصالات المعمل عمرها ثواني):

~~~text الناتج
 pg_terminate_backend
----------------------
 t
 t
 ...
(9 rows)
~~~

٩ مرات [[t]] (true) = ٩ اتصالات اتقفلت. والعدّ بعدها:

~~~text الناتج
 count | state
-------+--------
     5 |
     1 | active
~~~

عشان كده Postgres حاجز أماكن للسوبر يوزر ([[superuser_reserved_connections]]): خلي التطبيق يتصل بيوزر عادي، فلما يخلّص أماكنه يفضل لك مكان تدخل منه.

---

## الجدول

| الأمر | بيكشف |
|---|---|
| [[compose ps db]] | القاعدة شغالة؟ healthy؟ |
| [[compose logs db]] | ليه بترفض: too many clients، no space، starting up |
| [[nc -zv db 5432]] | الاسم بيتحل والبورت بيرد؟ |
| [[pg_stat_activity GROUP BY state]] | مين ماسك الاتصالات |
| [[echo $DATABASE_URL]] مع sed | التطبيق بيتصل بـ [[db]] ولا [[localhost]] |
| [[pg_terminate_backend]] | إسعاف: فك الاتصالات المعلّقة |

## الخلاصة

- ENOTFOUND = الاسم أو الشبكة. ECONNREFUSED = المكان غلط أو لسه بتقوم. too many clients = شغالة ومليانة.
- [[idle in transaction]] كتير = bug في الكود (transaction مش بتتقفل).
- التطبيق يتصل بيوزر مش سوبر يوزر، عشان يفضل لك باب للإسعاف.`,
          lines: [
            "القاعدة شغالة و healthy؟",
            "Postgres بيقول إيه (too many connections؟ no space؟ starting up؟).",
            "من جوه التطبيق: القاعدة بترد على البورت؟",
            "الاتصالات بحالتها: قريبة من الحد؟ idle in transaction كتير؟",
            "الـ URL اللي التطبيق بيستخدمه (باسورد مخفي): localhost ولا db؟",
            "إسعاف: اقفل الاتصالات المعلّقة أكتر من ٥ دقايق."
          ],
          sol: R`جربت [[pg_stat_activity]] على Postgres حقيقي:

[[SELECT count(*), state FROM pg_stat_activity GROUP BY state;]] رجّع مثلًا صف [[active]] وصف [[idle]] وصفوف بحالة فاضية (دي background workers). لو لقيت عدد كبير من [[idle in transaction]]، ده اللي بيستنزف الاتصالات: التطبيق فتح transaction ومقفلوش.

[[docker exec api nc -zv db 5432]] بيتأكد إن التطبيق شايف القاعدة على الشبكة. [[sorry, too many clients already]] (الرسالة الحقيقية لـ too many connections) معناها وصلت لحد [[max_connections]] (١٠٠ افتراضي): كل instance من التطبيق بيفتح pool، ولو مفيش pooling صح بتخلص بسرعة. الأمر الأخير ([[pg_terminate_backend]] للـ idle in transaction القديمة) إسعاف بيرجّع الاتصالات فورًا.

الحل الحقيقي مش الإسعاف: استخدم connection pool (PgBouncer أو pool في Prisma/التطبيق)، وتأكد إن الكود بيعمل [[commit]]/[[rollback]] دايمًا. [[ECONNREFUSED]] أو [[ENOTFOUND db]] معناها التطبيق مش واصل للقاعدة خالص: واقعة (في Compose الـ container الواقف اسمه بيختفي فبتطلع ENOTFOUND)، أو العنوان غلط زي [[localhost]] جوه container (ECONNREFUSED). شوف [[compose logs db]]. ده مختلف عن [[too many clients]] (شغالة بس مليانة). flag danger لأن [[pg_terminate_backend]] بيقطع اتصالات.`
        },
        {
          cmd: "الـ container بيقع ويقوم",
          title: "Restarting في docker ps",
          desc: "crash loop: التطبيق بيقوم، يقع في أول ثانية، Docker يرجّعه، ويقع تاني. السبب في أول سطور اللوج: متغير ناقص، أو بورت مشغول، أو القاعدة لسه مش جاهزة، أو الكود فيه syntax error من deploy ناقص.",
          example: R`docker compose ps
docker compose logs --tail 40 api
docker inspect --format '{{.State.ExitCode}} {{.RestartCount}} {{.State.FinishedAt}}' api
docker compose run --rm api node -e "require('./dist/server.js')"
docker compose config | grep -A5 "environment"
docker compose up api`,
          try: "الأمر قبل الأخير بيشغّل الـ image بأمر مختلف عن CMD عشان تشوف الـ error كامل من غير ما Docker يرجّعه. والأخير من غير -d عشان تشوف اللوج لايف.",
          deep: {
            why: "restart policy بتعمل شغلها: بترجّع الـ container. بس لو بيقع في أول ثانية، بيفضل في loop، والحالة Restarting بتضللك إنه «شغال».",
            how: R`[[compose ps]]: Restarting أو Up أقل من دقيقة باستمرار.

[[logs --tail 40]]: اللوج بيتكرر مع كل محاولة، فأول سطور المحاولة الأخيرة فيها الـ error. غالبًا: [[Error: Cannot find module]] (build ناقص)، أو [[EADDRINUSE]] (نسختين)، أو [[ECONNREFUSED]] للقاعدة (قام قبلها)، أو [[SyntaxError]] (كود مكسور)، أو متغير undefined.

[[inspect]]: ExitCode (1 error في الكود، 137 رام، 127 أمر مش موجود)، و RestartCount عدد المحاولات، و FinishedAt آخر وقوع.

[[compose run --rm api node -e ...]]: بيشغّل container مؤقت من نفس الـ image بأمر مختلف، فتشوف الـ error كامل من غير ما Docker يرجّعه. و [[run --rm api sh]] يدخّلك جوه تفحص الملفات.

[[config | grep environment]]: المتغيرات اللي Compose هيبعتها فعلًا، بعد قراية .env.

[[up api]] من غير -d: بيشغّل ويطبع اللوج لايف في الترمنال، وCtrl+C يوقفه. أوضح طريقة تشوف تسلسل الأحداث.`,
            when: "Restarting في ps. الموقع بيشتغل ثانية ويقع.",
            mistakes: "تشيل restart policy عشان «يبطل يقع». هيفضل واقع بس من غير loop. اقرا اللوج."
          },
          teach: R`## الفكرة: Docker بيرجّعه، وهو بيقع تاني، والسبب في أول سطر

الـ restart policy ([[restart: unless-stopped]]) معناها «لو وقع، شغّله تاني». لو التطبيق بيقع في أول ثانية، Docker بيفضل يرجّعه ويستنى شوية أطول كل مرة، والحالة بتبقى [[Restarting]]. الأوامر بتجيب **سبب** الوقوع، وبتشغّل الـ image بطريقة تخليك تشوف الـ error براحتك.

عملت الـ loop ده في مشروع Compose تجريبي: خدمة [[api]] (Node 22، الـ container اسمه [[diag01-api]]) بتقفل نفسها لو [[DATABASE_URL]] مش موجود، وشغّلتها والمتغير فاضي.

---

## ١. [[docker compose ps]]

~~~text الناتج
NAME         IMAGE          ...   SERVICE   CREATED          STATUS                         PORTS
diag01-api   node:22-slim   ...   api       24 seconds ago   Restarting (1) 3 seconds ago
diag01-pg    postgres:16    ...   db        23 minutes ago   Up About a minute              5432/tcp
~~~

[[Restarting (1) 3 seconds ago]]: بيعيد التشغيل دلوقتي، وآخر مرة خرج بكود [[1]] من ٣ ثواني. ولاحظ إن عمود [[PORTS]] فاضي، لأنه مش شغال فعلًا. وممكن تلحقه في لحظة [[Up 1 second]]، فبص أكتر من مرة.

---

## ٢. [[docker compose logs --tail 40 api]]

~~~text الناتج
diag01-api  | Error: DATABASE_URL is not defined
diag01-api  | Error: DATABASE_URL is not defined
diag01-api  | Error: DATABASE_URL is not defined
diag01-api  | Error: DATABASE_URL is not defined
...
~~~

نفس السطر متكرر، سطر لكل محاولة. اللوج **مش بيتمسح** مع الـ restart (نفس الـ container بيتشغّل تاني)، فبتشوف كل المحاولات ورا بعض. الـ error نفسه واضح: متغير البيئة ناقص.

أشهر الرسايل اللي هتشوفها هنا:

| الرسالة | السبب |
|---|---|
| [[Error: Cannot find module './dist/server.js']] | الـ build مطلعش الملف، أو المسار غلط |
| [[EADDRINUSE]] | البورت مستخدم (نسختين من نفس التطبيق) |
| [[ECONNREFUSED]] لـ 5432 | التطبيق قام قبل القاعدة وبيقع بدل ما يستنى |
| [[SyntaxError]] | ملف كود مكسور (deploy ناقص أو merge غلط) |
| [[... is not defined]] | متغير بيئة ناقص |

---

## ٣. [[docker inspect --format '{{.State.ExitCode}} {{.RestartCount}} {{.State.FinishedAt}}' api]]

تلات خانات من معلومات الـ container (اللي عندي اسمه [[diag01-api]]):

~~~text الناتج
1 7 2026-10-06T13:15:29.222604873Z
~~~

| الخانة | القيمة | معناها |
|---|---|---|
| [[ExitCode]] | 1 | آخر مرة خرج بكود ١: البرنامج نفسه قرر يخرج بخطأ |
| [[RestartCount]] | 7 | Docker رجّعه ٧ مرات في حوالي ٢٤ ثانية |
| [[FinishedAt]] | ...13:15:29... | آخر وقوع امتى (بتوقيت UTC، الـ Z في الآخر) |

أكواد الخروج المشهورة: [[1]] خطأ من التطبيق، [[127]] الأمر نفسه مش موجود (غلط في [[command]] أو الملف مش في الـ image)، [[137]] اتقتل (غالبًا رام، شوف درس «الرام خلصت»)، [[0]] خرج بنجاح (يعني البرنامج خلص شغله وقفل، وده برضه غلط لسيرفر المفروض يفضل شغال).

وبعد ما صلّحته وعملت recreate:

~~~text الناتج
0 0 0001-01-01T00:00:00Z
~~~

[[RestartCount]] رجع صفر لأنه container جديد، و [[FinishedAt]] بالتاريخ ده يعني «لسه موقعش ولا مرة».

---

## ٤. [[docker compose run --rm api node -e "require('./dist/server.js')"]]

[[compose run]] بيعمل container **جديد مؤقت** من نفس الخدمة (نفس الـ image والـ environment والـ volumes)، بس بالأمر اللي انت كاتبه بدل [[command]] بتاعها، ومن غير restart policy. [[--rm]] امسحه لما يخلص. و [[node -e "..."]] نفّذ الكود ده: هنا [[require]] لملف السيرفر، وفي مشروعي الملف [[./src/server.js]]:

~~~text الناتج
 Container diag01-pg Running
 Container diag01-api-run-eb9265515692 Creating
 Container diag01-api-run-eb9265515692 Created
Error: DATABASE_URL is not defined

rc=1
~~~

نفس الـ error، مرة واحدة، قدامك، من غير loop. ولو عايز تدخل تلف جوه نفس البيئة:

~~~bash
docker compose run --rm api sh -c 'ls src; node --version'
~~~

~~~text الناتج
auth.js
server.js
v22.23.3
~~~

كده اتأكدت إن الملفات موجودة ونسخة Node صح. ([[run --rm api sh]] من غير [[-c]] بيفتحلك shell تفاعلي.)

---

## ٥. [[docker compose config | grep -A5 "environment"]]

[[compose config]] بيطبع الـ compose.yaml **بعد** ما يقرا [[.env]] ويعوّض كل [[$VAR]]، يعني اللي Docker هيشغّله فعلًا. و [[grep -A5]] كل سطر [[environment]] و٥ سطور بعده:

~~~text الناتج
    environment:
      DATABASE_URL: ""
      HOST: 0.0.0.0
      JWT_SECRET: dev-secret-123
      NODE_ENV: production
      SLOW_MS: "0"
--
    environment:
      POSTGRES_DB: app
      POSTGRES_PASSWORD: S3cretPass
~~~

[[DATABASE_URL: ""]] فاضي. ده السبب: المتغير متعرّف في compose.yaml بس القيمة جاية من [[.env]] أو من الـ shell، ومش موجودة هناك. [[--]] الفاصل اللي grep بيحطه بين النتايج.

> خد بالك: الأمر ده بيطبع الأسرار زي ما هي ([[POSTGRES_PASSWORD]] فوق). متلزقش ناتجه في شات أو issue من غير ما تخفيها.

---

## ٦. [[docker compose up api]] (من غير [[-d]])

[[-d]] (detached) معناها «اشتغل في الخلفية». من غيرها، Compose بيربط الترمنال باللوج ويطبع لايف لحد ما تدوس Ctrl+C:

~~~text الناتج
 Container diag01-pg Running
Attaching to diag01-api
diag01-api  | Error: DATABASE_URL is not defined
diag01-api  | Error: DATABASE_URL is not defined
...
~~~

بتشوف تسلسل الأحداث لحظة بلحظة: إمتى بيقوم، وإمتى بيقع. وبعد ما تصلّح، شغّل [[up -d]] تاني.

---

## الجدول

| الأمر | بيدّيك |
|---|---|
| [[compose ps]] | [[Restarting (كود)]] أو Up لثواني |
| [[compose logs --tail 40]] | الـ error، متكرر مع كل محاولة |
| [[inspect]] ExitCode و RestartCount | نوع الوقوع وعدد المحاولات |
| [[compose run --rm api ...]] | الـ error مرة واحدة، أو shell جوه نفس البيئة |
| [[compose config]] | المتغيرات الحقيقية بعد [[.env]] |
| [[compose up]] من غير [[-d]] | اللوج لايف |

## الخلاصة

- Restarting = بيقع فورًا. السبب في اللوج، مش في الـ restart policy.
- [[ExitCode]] بيصنّف: 1 كود، 127 أمر مش موجود، 137 اتقتل.
- [[compose run --rm]] بيوقف الـ loop عشان تشوف الـ error براحتك.`,
          lines: [
            "الحالة: Restarting أو Up لثواني باستمرار.",
            "الـ error في أول سطور آخر محاولة.",
            "رقم الخروج وعدد المحاولات وآخر وقوع.",
            "شغّل الـ image بأمر مختلف عشان تشوف الـ error كامل من غير loop.",
            "المتغيرات اللي Compose هيبعتها فعلًا.",
            "شغّل في المقدمة وشوف اللوج لايف."
          ],
          sol: R`[[docker compose ps]] بيوريك حالة [[Restarting]] أو [[Up X seconds]] بتتصفّر كل شوية. اللوج مش بيتمسح مع الـ restart (نفس الـ container بيتشغّل تاني)، بس بيتكرر مع كل محاولة فممكن تتوه فيه، والـ container مش بيفضل شغال كفاية عشان تدخله. [[docker inspect --format '{{.State.ExitCode}} {{.RestartCount}}']] بيوريك بأي كود بيموت وكام مرة: exit [[137]] رام، [[1]] أو [[255]] خطأ في التطبيق، [[127]] أمر مش موجود.

الحيلة المهمة: [[docker compose run --rm api node -e "require('./dist/server.js')"]] بيشغّل نفس الـ image بأمر مختلف عن الـ CMD، فبتشوف الـ error الكامل مطبوع قدامك من غير ما Docker يقتل الـ container ويعيده قبل ما تقراه. أو [[docker compose up api]] (من غير [[-d]]) بيخليك تشوف اللوج لايف لحظة الكراش.

الأسباب الشائعة: متغير بيئة ناقص ([[compose config | grep environment]])، القاعدة لسه مش جاهزة والتطبيق بيموت بدل ما يستنى (محتاج retry أو [[depends_on]] بـ healthcheck)، أو خطأ في الكود وقت الإقلاع. الـ [[RestartCount]] العالي مع [[FinishedAt]] قريب = بيموت فورًا عند البدء، فركّز على أول ثواني من اللوج.`
        }
      ]
    }
]);

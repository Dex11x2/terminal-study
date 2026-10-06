// تكملة تاب vps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vps/01.js (شرح حقول الدرس في أوله)
MORE("vps", [
    {
      t: "Docker على السيرفر",
      l: 2,
      n: "",
      items: [
        {
          cmd: "تسطيب Docker",
          title: "السكربت الرسمي",
          desc: "السكربت الرسمي بيسطّب Docker و compose، وده مناسب للتجربة. على سيرفر إنتاج Docker نفسها بتنصح بطريقة الـ apt repository من docs.docker.com/engine/install/ubuntu. إضافة يوزرك لجروب docker بتخليك تشغّله من غير sudo، وبعدها لازم تخرج وتدخل تاني. خد بالك إن الجروب ده عمليًا صلاحيات root.",
          example: R`curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker deploy
docker run --rm hello-world`,
          try: "سطّبه على سيرفر التجربة وشغّل hello-world من غير sudo.",
          deep: {
            why: "Docker بيخليك تشغّل تطبيقك جوه «كونتينر» فيه كل حاجة محتاجها (النسخة الصح من Node والمكتبات)، فيشتغل على السيرفر بالظبط زي ما اشتغل عندك.",
            how: R`السكربت الرسمي [[get.docker.com]] بيعرف نوع السيرفر، ويضيف مستودع Docker الرسمي لـ apt، ويسطّب أحدث نسخة ومعاها [[docker compose]]. والـ [[| sh]] معناها «نزّل السكربت وشغّله على طول». ده مقبول لسيرفر تجربة لأنه من Docker نفسها، بس على الإنتاج Docker بتنصح تضيف الـ apt repository بإيدك (الخطوات في docs.docker.com) عشان تعرف بالظبط اتسطّب إيه.

البرنامج اللي بيدير الكونتينرات بيشتغل كـ root. عشان تستخدمه من غير sudo، بتضيف يوزرك لجروب اسمه docker. بس خد بالك: أي حد في الجروب ده يقدر يعمل كونتينر يوصل لكل ملفات السيرفر، فهو عمليًا عنده صلاحيات root. عشان كده ضيف بس اليوزرز اللي تثق فيهم.

وتغيير الجروبات مش بيتطبق على الجلسة المفتوحة، لازم تخرج وتدخل تاني. و [[hello-world]] كونتينر صغير بيطبع رسالة ويقفل، و [[--rm]] بيمسحه بعد ما يخلص.`,
            when: "مرة واحدة على السيرفر، لو هتشغّل تطبيقاتك بـ Docker.",
            mistakes: "تضيف نفسك للجروب وتجرّب على طول في نفس الجلسة، فتلاقي «permission denied». اخرج وادخل. وتسطيب Docker من [[apt install docker.io]] القديمة، وتلاقي compose ناقص أو قديم."
          },
          teach: R`## ٣ سطور: سطّب، ادّي صلاحية، جرّب

اتجرّب على كونتينر [[ubuntu:24.04]] فيه systemd شغال كسيرفر (Docker جوه Docker، بصلاحيات privileged)، وفيه يوزر [[deploy]].

---

## ١. [[curl -fsSL https://get.docker.com | sh]]

| الحتة | معناها |
|---|---|
| [[curl -fsSL URL]] | نزّل الصفحة: [[-f]] افشل لو فيه error، [[-s]] من غير شريط، [[-S]] بس اطبع الأخطاء، [[-L]] تابع التحويلات |
| [[|]] | ابعت اللي اتنزل للأمر اللي بعدي |
| [[sh]] | الشيل: نفّذ اللي جالك كسكربت |

يعني نزّل سكربت Docker الرسمي (٨١٣ سطر) وشغّله على طول. وانت root فمش محتاج sudo؛ كيوزر عادي: [[| sudo sh]].

### السكربت بيعمل إيه؟

السكربت بيقبل [[--dry-run]]: اطبع الخطوات من غير ما تنفّذها. نزّلته في ملف وجربت:

~~~text sh get-docker.sh --dry-run (آخره)
apt-get -qq update >/dev/null
DEBIAN_FRONTEND=noninteractive apt-get -y -qq install ca-certificates curl >/dev/null
install -m 0755 -d /etc/apt/keyrings
curl -fsSL "https://download.docker.com/linux/ubuntu/gpg" -o /etc/apt/keyrings/docker.asc
chmod a+r /etc/apt/keyrings/docker.asc
echo "deb [arch=amd64 signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu noble stable" > /etc/apt/sources.list.d/docker.list
apt-get -qq update >/dev/null
DEBIAN_FRONTEND=noninteractive apt-get -y -qq install docker-ce docker-ce-cli containerd.io docker-compose-plugin docker-ce-rootless-extras docker-buildx-plugin docker-model-plugin >/dev/null
~~~

نفس فكرة NodeSource: مفتاح توقيع، وملف مستودع Docker الرسمي، وبعدين [[apt install]] للباكدجات: [[docker-ce]] (المحرك نفسه، ce = Community Edition)، و [[docker-ce-cli]] (الأمر [[docker]])، و [[containerd.io]] (اللي بيشغّل الكونتينرات فعلًا)، و [[docker-compose-plugin]] (أمر [[docker compose]]). وعلى السيرفر الحقيقي هو ده بالظبط اللي docs.docker.com بتقولك تعمله بإيدك.

> في المحاكاة السكربت طبع كمان [[WSL DETECTED]] واستنى ٢٠ ثانية، لأن الكونتينر شغال على WSL. على VPS مش هتشوف ده.

وفي الآخر بيطبع النسخ وتحذير مهم:

~~~text الناتج (آخره)
WARNING: Access to the remote API on a privileged Docker daemon is equivalent
         to root access on the host.
~~~

والنتيجة:

~~~text الناتج
$ systemctl is-active docker
active
$ docker --version
Docker version 29.8.2, build 7fc2dff
$ docker compose version
Docker Compose version v5.6.0
~~~

---

## ٢. [[sudo usermod -aG docker deploy]]

نفس أمر درس adduser: ضيف ([[-a]]) deploy لجروب ([[-G]]) اسمه [[docker]] (السكربت عمل الجروب ده).

~~~text groups deploy
deploy : deploy docker
~~~

### ليه الجروب ده؟

محرك Docker شغال كـ root، وبيستقبل الأوامر من ملف خاص اسمه [[/var/run/docker.sock]] (socket). والملف ده مسموح بس لـ root وجروب [[docker]]. يوزر مش في الجروب:

~~~text الناتج
permission denied while trying to connect to the docker API at unix:///var/run/docker.sock
~~~

وده نفس اللي هتشوفه لو ضفت نفسك للجروب وجربت في **نفس** الجلسة: الجروبات بتتقرا وقت الدخول بس. اخرج من ssh وادخل تاني (أو [[newgrp docker]]).

> أي حد في جروب docker يقدر يشغّل كونتينر راكب فيه [[/]] بتاع السيرفر كله، يعني عمليًا root. ضيف بس اليوزر اللي بيعمل deploy.

---

## ٣. [[docker run --rm hello-world]]

| الحتة | معناها |
|---|---|
| [[docker run]] | اعمل كونتينر من image وشغّله |
| [[--rm]] | امسحه أول ما يخلص |
| [[hello-world]] | image صغيرة جدًا من Docker للتجربة |

ك deploy، من غير sudo، بعد دخول جديد:

~~~text الناتج
Unable to find image 'hello-world:latest' locally
latest: Pulling from library/hello-world
Status: Downloaded newer image for hello-world:latest

Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
...
~~~

[[Unable to find image locally]] مش غلط: الـ image مش عندك، فبينزّلها من Docker Hub ([[Pulling]]). و [[:latest]] هو الـ tag الافتراضي لو مكتبتش نسخة. والمرة الجاية مش هينزّل تاني.

---

## الخلاصة

~~~text
curl -fsSL https://get.docker.com | sh    سطّب Docker و compose (للتجربة؛ للإنتاج الـ apt repo بإيدك)
sudo usermod -aG docker deploy            docker من غير sudo (= صلاحيات root)
exit ثم ssh تاني                          عشان الجروب يتطبق
docker run --rm hello-world               Hello from Docker!
~~~`,
          lines: [
            "نزّل سكربت التسطيب الرسمي ([[-fsSL]]: اسكت، وافشل لو فيه error، وتابع التحويلات) وشغّله بـ sh.",
            "ضيف deploy لجروب docker. وبعدها لازم تخرج وتدخل تاني.",
            "جرّب كونتينر تجربة، وامسحه بعد ما يخلص ([[--rm]])."
          ],
          sol: R`[[docker run --rm hello-world]] من غير sudo بيطبع [[Hello from Docker!]] و [[This message shows that your installation appears to be working correctly.]]، وبعدها شرح للخطوات اللي حصلت. جربت ده.

ده بيشتغل من غير sudo لأن deploy بقى في جروب docker. و [[groups]] بيوري [[docker]] في القايمة.

الغلط الشائع: [[permission denied while trying to connect to the docker API at unix:///var/run/docker.sock]]: الـ usermod اتعمل بس الجلسة قديمة. اخرج من SSH وادخل تاني (أو [[newgrp docker]]). وافتكر إن جروب docker = صلاحيات root عمليًا، فمتضفش له غير اليوزر اللي بيعمل deploy.`
        },
        {
          cmd: "docker ps / logs / exec",
          title: "اعرف إيه اللي شغال وادخل جواه",
          desc: "[[ps -a]] حتى الكونتينرات الواقفة، [[logs -f --tail]] متابعة لايف، [[exec -it]] تدخل جوه الكونتينر (استخدم sh لو bash مش موجود جواه)، و [[stats]] استهلاك كل كونتينر.",
          example: R`docker ps
docker ps -a
docker logs -f --tail 100 api
docker exec -it api sh
docker stats`,
          try: "شغّل [[docker run -d --name web -p 8080:80 nginx]]، ادخل جواه، واعرض لوجاته.",
          deep: {
            why: "تطبيقك جوه كونتينر: عايز تعرف هو شغال؟ طلع error إيه؟ وتدخل جواه تشوف حاجة. دول الأوامر اليومية.",
            how: R`أي كونتينر عنده حالة: شغال أو واقف. [[docker ps]] بيعرض الشغال بس، و [[-a]] حتى اللي وقف. ولو تطبيقك مش ظاهر في [[ps]] وظاهر في [[ps -a]] بحالة «Exited»، يبقى قام ووقع.

وأي حاجة التطبيق بيطبعها (console.log والأخطاء) Docker بيمسكها. و [[docker logs]] بيعرضها، و [[-f]] بيتابع لايف، و [[--tail 100]] آخر ١٠٠ سطر بس بدل التاريخ كله. ودي أول حاجة تعملها لو الكونتينر وقع: الـ logs هتقولك ليه.

[[docker exec -it api sh]] بيفتحلك ترمنال جوه الكونتينر. [[-i]] يخليه يستقبل كلامك، و [[-t]] يعمله ترمنال. و [[sh]] لأن كتير من الصور الصغيرة مفيهاش bash. جوه الكونتينر إنت في دنيا تانية: ملفات التطبيق وبس.

و [[docker stats]] زي htop للكونتينرات.`,
            when: "كل ما حاجة تبوظ: [[ps -a]] تعرف الحالة، و [[logs]] تعرف السبب.",
            mistakes: "إنك تعدّل ملفات جوه الكونتينر بـ exec وتفتكر التعديل هيفضل. أول ما الكونتينر يتعمل من جديد، أي تعديل جواه بيروح. التعديلات الدايمة في الكود نفسه أو في volumes."
          },
          teach: R`## ٥ أسئلة لـ Docker

مين شغال؟ مين وقع؟ بيقول إيه؟ جواه إيه؟ واكل قد إيه؟ اتجرّب على سيرفر تجربة (كونتينر [[ubuntu:24.04]] فيه Docker [[29.8.2]]). المثال بيستخدم اسم [[api]]؛ أنا شغّلت كونتينر [[web]] من image [[nginx]] (زي الـ try)، وكونتينر [[oops]] بيطبع سطر ويقع عمدًا، فحط [[web]] مكان [[api]] في الأوامر.

~~~bash
docker run -d --name web -p 8080:80 nginx
docker run --name oops alpine sh -c "echo starting; exit 3"
~~~

---

## ١. [[docker ps]]

ps من process status: الكونتينرات **الشغالة**:

~~~text الناتج
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS          PORTS                                     NAMES
4bf0459aaacb   nginx     "/docker-entrypoint.…"   12 seconds ago   Up 11 seconds   0.0.0.0:8080->80/tcp, [::]:8080->80/tcp   web
~~~

| العمود | معناه |
|---|---|
| [[CONTAINER ID]] | رقم مميز (أوله بس). تقدر تستخدمه بدل الاسم |
| [[IMAGE]] | اتعمل من أنهي image |
| [[COMMAND]] | الأمر اللي شغال جواه ([[…]] يعني مقصوص) |
| [[STATUS]] | [[Up 11 seconds]]: شغال من ١١ ثانية |
| [[PORTS]] | [[0.0.0.0:8080->80/tcp]]: بورت 8080 على السيرفر (كل الـ IPs) رايح لـ 80 جوه الكونتينر. و [[[::]]] نفس الكلام لـ IPv6 |
| [[NAMES]] | الاسم اللي اديته بـ [[--name]] |

[[oops]] مش ظاهر، لأنه مش شغال.

---

## ٢. [[docker ps -a]]

[[-a]] من all: حتى الواقفة:

~~~text الناتج
CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS                     PORTS                  NAMES
77d0dcb13f94   alpine    "sh -c 'echo startin…"   2 seconds ago    Exited (3) 2 seconds ago                          oops
4bf0459aaacb   nginx     "/docker-entrypoint.…"   12 seconds ago   Up 11 seconds              0.0.0.0:8080->80/tcp   web
~~~

[[Exited (3)]] يعني وقف، و [[3]] الـ exit code: الرقم اللي البرنامج خرج بيه. [[0]] يعني خلص تمام، وأي رقم تاني يعني غلط. وده بالظبط شكل تطبيقك لو قام ووقع: موجود في [[ps -a]] ومش في [[ps]].

---

## ٣. [[docker logs -f --tail 100 api]]

| الحتة | معناها |
|---|---|
| [[logs]] | كل اللي البرنامج طبعه (stdout و stderr) من ساعة ما الكونتينر اتعمل |
| [[--tail 100]] | آخر ١٠٠ سطر بس |
| [[-f]] | follow: افضل اطبع الجديد لايف (Ctrl+C تخرج، والكونتينر مش بيتأثر) |

~~~text docker logs web (أوله)
/docker-entrypoint.sh: /docker-entrypoint.d/ is not empty, will attempt to perform configuration
/docker-entrypoint.sh: Looking for shell scripts in /docker-entrypoint.d/
...
~~~

وبعد [[curl localhost:8080]]:

~~~text docker logs --tail 5 web
172.17.0.1 - - [06/Oct/2026:12:29:32 +0000] "GET / HTTP/1.1" 200 896 "-" "curl/8.5.0" "-"
2026/10/06 12:29:21 [notice] 1#1: start worker process 41
...
~~~

السطر ده نفس شكل access.log بتاع Nginx. و [[172.17.0.1]] عنوان السيرفر على شبكة Docker الداخلية. والكونتينر اللي وقع:

~~~text docker logs oops
starting
~~~

آخر حاجة طبعها قبل ما يقع: هنا هتلاقي الـ error بتاع تطبيقك. ولو الاسم غلط: [[Error response from daemon: No such container: api]].

---

## ٤. [[docker exec -it api sh]]

| الحتة | معناها |
|---|---|
| [[exec]] | شغّل أمر **جوه** كونتينر شغال |
| [[-i]] | interactive: ابعتله اللي بتكتبه |
| [[-t]] | tty: اعمله ترمنال (prompt وألوان) |
| [[sh]] | الأمر: شيل |

جوه انت في دنيا تانية:

~~~text أوامر جوه web
# whoami
root
# hostname
4bf0459aaacb
# ls /usr/share/nginx/html
50x.html  index.html
# cat /etc/os-release | head -1
PRETTY_NAME="Debian GNU/Linux 13 (trixie)"
~~~

اسم الجهاز هو الـ ID، والنظام Debian مش أوبونتو، والملفات ملفات الـ image. [[exit]] تخرج والكونتينر فاضل شغال.

ليه [[sh]] مش [[bash]]؟ صور alpine الصغيرة مفيهاش bash:

~~~text docker exec -it tiny bash  (alpine)
OCI runtime exec failed: exec failed: unable to start container process: exec: "bash": executable file not found in $PATH
~~~

---

## ٥. [[docker stats]]

زي htop للكونتينرات، بيتحدث كل ثانية (Ctrl+C تخرج). بـ [[--no-stream]] بيطبع مرة واحدة:

~~~text الناتج
CONTAINER ID   NAME      CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           BLOCK I/O     PIDS
e7b284109713   tiny      0.00%     348KiB / 15.33GiB     0.00%     516B / 126B       0B / 0B       1
4bf0459aaacb   web       0.00%     13.32MiB / 15.33GiB   0.08%     1.52kB / 1.64kB   0B / 12.3kB   17
~~~

[[MEM USAGE / LIMIT]] الرام المستخدمة / المسموح (من غير limit = رام السيرفر كله)، و [[NET I/O]] داخل/خارج على الشبكة، و [[BLOCK I/O]] قراية/كتابة على الديسك، و [[PIDS]] عدد العمليات جواه.

---

## الخلاصة

~~~text
docker ps                    مين شغال
docker ps -a                 وكمان مين وقع (Exited + الكود)
docker logs -f --tail 100 X  بيقول إيه (السبب لو وقع)
docker exec -it X sh         ادخل جواه (exit تخرج)
docker stats                 واكل قد إيه
~~~`,
          lines: [
            "الكونتينرات الشغالة.",
            "كل الكونتينرات حتى الواقفة.",
            "لوجات كونتينر api: آخر ١٠٠ سطر، وتابع اللي جاي ([[-f]]).",
            "افتح ترمنال sh جوه كونتينر api ([[-it]]: تفاعلي وترمنال). اخرج بـ exit.",
            "استهلاك كل كونتينر لايف. Ctrl+C للخروج."
          ],
          sol: R`[[docker ps]] بيوري [[web]] و [[0.0.0.0:8080->80/tcp]] و [[Up ...]]. و [[docker exec -it web sh]] بيدخلك [[/ #]] جوه (أو [[#]] في صورة nginx العادية debian)، و [[exit]] بيخرجك والـ container شغال.

و [[docker logs web]] بيوري سطور الـ entrypoint ([[/docker-entrypoint.sh: Configuration complete; ready for start up]])، وبعد ما تفتح [[http://IP:8080]] أو [[curl localhost:8080]] هتلاقي سطر [[GET / HTTP/1.1" 200]]. جربت نفس الخطوات.

الغلط الشائع: [[docker logs api]] من المثال يطلع [[No such container: api]] لأن الاسم في التجربة [[web]]. و [[exec -it web bash]] ممكن يطلع [[executable file not found]] في صور alpine؛ استخدم [[sh]]. ولو فتحت 8080 من بره ومش شغال، ufw مش السبب (Docker بيعدّيه)؛ غالبًا firewall المزود.`
        },
        {
          cmd: "docker compose",
          title: "شغّل المشروع كله",
          desc: R`[[docker compose]] بيشغّل كل خدمات المشروع (التطبيق وقاعدة البيانات و Redis مثلًا) اللي متوصفة في ملف [[compose.yml]] أو [[docker-compose.yml]] بأمر واحد، من الفولدر اللي فيه الملف. [[up]] بيعمل الكونتينرات ويشغّلها، و [[-d]] (detached) يخليها تشتغل في الخلفية ويرجعلك الترمنال، و [[--build]] يبني صورة تطبيقك من الكود الحالي قبل التشغيل.

[[ps]] بتعرض حالة كل خدمة، و [[logs -f api]] بتتابع لوجات خدمة اسمها api لايف (Ctrl+C للخروج). للتحديث لصور جاهزة من Docker Hub: [[pull]] ينزّل الأحدث، وبعدين [[up -d]] يعيد عمل اللي اتغير بس. و [[down]] بيوقف ويمسح الكونتينرات والشبكة، والبيانات اللي في الـ volumes بتفضل.

خد بالك من [[down -v]]: الـ [[-v]] بتمسح الـ volumes، يعني قاعدة البيانات نفسها.`,
          example: R`docker compose up -d --build
docker compose ps
docker compose logs -f api
docker compose pull && docker compose up -d
docker compose down`,
          try: "اعمل compose فيه nginx و redis وشغّله.",
          deep: {
            why: "تطبيقك غالبًا مش كونتينر واحد: API، وقاعدة بيانات، وربما Redis. تشغيلهم واحد واحد بأوامر طويلة متعب وسهل تغلط فيه. compose بيوصفهم كلهم في ملف واحد، ويشغّلهم بأمر واحد.",
            how: R`ملف [[docker-compose.yml]] بيوصف كل خدمة: الصورة أو إزاي تتبني، والبورتات، والمتغيرات، والـ volumes (أماكن تخزين بتفضل حتى لو الكونتينر اتمسح، زي داتا قاعدة البيانات).

[[up]] بيقرا الملف ويشغّل كل حاجة، ويعمل شبكة داخلية بينهم عشان يكلّموا بعض بالأسامي. يعني الـ API بتوصل لقاعدة البيانات على العنوان [[db]] بدل IP. و [[-d]] في الخلفية. و [[--build]] يبني صورة التطبيق من الكود الحالي قبل التشغيل، ودي لازمة لما تعدّل الكود.

والأهم إن [[up]] ذكي: لو شغّلته تاني، بيعيد عمل الكونتينرات اللي اتغيرت بس، والباقي بيسيبه شغال.

[[down]] بيقفل كل حاجة ويمسح الكونتينرات والشبكة، بس الـ volumes (يعني الداتا) بتفضل.`,
            when: "كل تحديث للموقع: [[git pull]] وبعدين [[docker compose up -d --build]]. ولما تنقل المشروع لسيرفر جديد: الملف ده وخلاص.",
            mistakes: "[[docker compose down -v]]: الـ [[-v]] دي بتمسح الـ volumes، يعني قاعدة البيانات كلها. ونسيان [[--build]] بعد تعديل الكود، فتفضل النسخة القديمة شغالة وتستغرب."
          },
          teach: R`## ملف واحد يوصف المشروع، و ٥ أوامر تديره

كل أوامر [[docker compose]] بتقرا ملف [[compose.yml]] (أو [[docker-compose.yml]]) من **الفولدر اللي انت فيه**. اتجرّب على سيرفر تجربة (كونتينر [[ubuntu:24.04]] فيه Docker [[29.8.2]] و Compose [[v5.6.0]])، بملف الـ solCode: خدمة [[web]] من [[nginx:alpine]] وخدمة [[redis]]:

~~~text compose.yml
services:
  web:
    image: nginx:alpine
    ports: ["127.0.0.1:8080:80"]
  redis:
    image: redis:7-alpine
~~~

[[services]] الخدمات، وكل خدمة ليها اسم ([[web]] و [[redis]]) وتحتها إعداداتها بمسافات (spaces مش tabs). [[image]] اتعمل من أنهي image، و [[ports]] بورت السيرفر:بورت الكونتينر، و [[127.0.0.1:]] قبلهم يعني من جوه السيرفر بس (درس ufw).

---

## ١. [[docker compose up -d --build]]

| الحتة | معناها |
|---|---|
| [[up]] | اعمل اللي ناقص وشغّله |
| [[-d]] | detached: في الخلفية ورجّعلي الترمنال |
| [[--build]] | الخدمات اللي فيها [[build:]] (تطبيقك) ابني الـ image بتاعتها من الكود الحالي الأول |

~~~text الناتج (مختصر)
 Network demo_default Created
 Container demo-web-1 Created
 Container demo-redis-1 Created
 Container demo-web-1 Started
 Container demo-redis-1 Started
~~~

compose عمل **شبكة** للمشروع ([[demo_default]]: اسم الفولدر + [[_default]])، وكونتينر لكل خدمة اسمه [[المشروع-الخدمة-رقم]]. وعلى الشبكة دي الخدمات بتوصل لبعض **بالاسم**:

~~~text docker compose exec web ping -c1 redis
PING redis (172.18.0.3): 56 data bytes
64 bytes from 172.18.0.3: seq=0 ttl=64 time=0.189 ms
~~~

عشان كده تطبيقك يكتب [[redis://redis:6379]] أو [[db:5432]] بدل IP.

### ليه [[--build]] مهمة؟

جربت خدمة [[api]] بـ [[build: .]] (Dockerfile بيطبع [[api v1 started]])، وغيّرت v1 لـ v2 في الكود:

~~~text الناتج
$ docker compose up -d            (من غير --build)
 Container demo2-api-1 Running
api-1  | api v1 started            النسخة القديمة لسه شغالة
$ docker compose up -d --build
 Container demo2-api-1 Recreated
api-1  | api v2 started
~~~

من غير [[--build]] compose شايف إن الـ image موجودة فمش بيبنيها تاني.

---

## ٢. [[docker compose ps]]

~~~text الناتج
NAME           IMAGE            COMMAND                  SERVICE   CREATED                  STATUS                  PORTS
demo-redis-1   redis:7-alpine   "docker-entrypoint.s…"   redis     Less than a second ago   Up Less than a second   6379/tcp
demo-web-1     nginx:alpine     "/docker-entrypoint.…"   web       Less than a second ago   Up Less than a second   127.0.0.1:8080->80/tcp
~~~

زي [[docker ps]] بس لكونتينرات المشروع ده بس، وفيه عمود [[SERVICE]]. و [[6379/tcp]] من غير سهم يعني البورت مفتوح جوه الشبكة بس، مش منشور على السيرفر.

ونتأكد إنهم شغالين فعلًا:

~~~text الناتج
$ curl -s localhost:8080 | head -4
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
$ docker compose exec redis redis-cli ping
PONG
~~~

[[compose exec redis ...]] زي [[docker exec]] بس بتكتب اسم الخدمة.

---

## ٣. [[docker compose logs -f api]]

لوجات خدمة واحدة (أو كلهم لو مكتبتش اسم)، وكل سطر قبله اسم الخدمة:

~~~text docker compose logs redis (آخره)
redis-1  | 1:M 06 Oct 2026 12:30:54.778 * Server initialized
redis-1  | 1:M 06 Oct 2026 12:30:54.778 * Ready to accept connections tcp
~~~

[[-f]] تابع لايف، و Ctrl+C تخرج.

---

## ٤. [[docker compose pull && docker compose up -d]]

[[pull]] نزّل أحدث نسخة من كل image (للخدمات اللي من [[image:]] مش [[build:]]):

~~~text الناتج
 Image redis:7-alpine Pulled
 Image nginx:alpine Pulled
~~~

و [[&&]] لو نجح، [[up -d]]. والمهم إن [[up]] بيعيد عمل **اللي اتغير بس**: لو مفيش جديد هتلاقي [[Running]] ومحدش بيتلمس.

---

## ٥. [[docker compose down]]

~~~text الناتج
 Container demo-redis-1 Stopped
 Container demo-redis-1 Removed
 Container demo-web-1 Stopped
 Container demo-web-1 Removed
 Network demo_default Removed
~~~

وقف ومسح الكونتينرات والشبكة. الـ images والـ volumes (البيانات) فاضلين. أما [[down -v]] فبيمسح الـ volumes كمان، يعني قاعدة البيانات.

ولو كتبت أي أمر compose برّه فولدر المشروع:

~~~text الناتج
no configuration file provided: not found
~~~

---

## الخلاصة

~~~text
docker compose up -d --build        ابني تطبيقك وشغّل كل حاجة
docker compose ps                   حالة كل خدمة
docker compose logs -f اسم          لوجات خدمة
docker compose pull && ... up -d    حدّث الصور الجاهزة
docker compose down                 وقّف وامسح (البيانات بتفضل)
docker compose down -v              وامسح البيانات كمان (خطر)
~~~`,
          lines: [
            "ابني الصور من الكود ([[--build]]) وشغّل كل حاجة في الخلفية ([[-d]]).",
            "حالة كل خدمة في المشروع.",
            "تابع لوجات خدمة api بس.",
            "نزّل أحدث نسخ للصور الجاهزة، وبعدين طبّقها.",
            "اقفل كل حاجة وامسح الكونتينرات (الداتا بتفضل)."
          ],
          sol: R`[[docker compose ps]] بيوري خدمتين [[Up]]: nginx بالبورت المنشور و redis من غير بورت. و [[curl localhost:8080]] بيرجع صفحة nginx، و [[docker compose exec redis redis-cli ping]] بيرد [[PONG]].

ملف بسيط كفاية: خدمة [[web]] بـ [[image: nginx:alpine]] و [[ports: ["127.0.0.1:8080:80"]]]، وخدمة [[redis]] بـ [[image: redis:7-alpine]]. وتقدر تتأكد إن الاتنين على نفس الشبكة: [[docker compose exec web ping -c1 redis]].

الغلط الشائع: [[no configuration file provided: not found]]: انت مش في الفولدر اللي فيه [[compose.yml]]. و [[yaml: line X]]: مسافات غلط (لازم spaces مش tabs).`,
          solCode: R`cat > compose.yml <<'EOF2'
services:
  web:
    image: nginx:alpine
    ports: ["127.0.0.1:8080:80"]
  redis:
    image: redis:7-alpine
EOF2
docker compose up -d
docker compose ps
curl -s localhost:8080 | head -4
docker compose exec redis redis-cli ping`
        },
        {
          cmd: "تنضيف Docker",
          title: "أكبر سبب إن الديسك يتملى",
          desc: "الصور القديمة بتتراكم مع كل build. [[system prune]] بيمسح الكونتينرات الواقفة والصور اللي مش مستخدمة. متضيفش [[--volumes]] إلا لو متأكد، لأنها بتمسح بيانات قواعد البيانات.",
          example: R`docker system df
docker image prune -a
docker system prune`,
          try: "اعرف Docker واخد كام من الديسك قبل وبعد التنضيف.",
          flag: "danger",
          deep: {
            why: "كل ما تعمل build جديد، الصورة القديمة بتفضل على الديسك. بعد شهور ممكن تلاقي Docker واكل عشرات الجيجا، والسيرفر يقع بـ «No space left».",
            how: R`Docker بيحتفظ بـ ٤ حاجات: الصور (images)، والكونتينرات، والـ volumes (الداتا)، والـ build cache (أجزاء بيحتفظ بيها عشان الـ build الجاي يبقى أسرع).

[[docker system df]] بيوريك كل نوع واكل قد إيه، وقد إيه منه ممكن يتمسح (RECLAIMABLE).

[[image prune]] من غير حاجة بيمسح الصور «المعلّقة» بس (dangling)، ودي النسخ القديمة اللي ملهاش اسم. ومع [[-a]] بيمسح أي صورة مش مستخدمة في كونتينر شغال، وده أكتر بكتير.

[[system prune]] بيمسح الكونتينرات الواقفة، والشبكات مش مستخدمة، والصور المعلّقة، والـ cache. ومش بيمسح الـ volumes غير لو ضفت [[--volumes]]، وده عن قصد لأن فيها بياناتك.`,
            when: "كل كام أسبوع، أو لما الديسك يقرّب يتملى. وممكن تحطه في cron.",
            mistakes: "[[--volumes]] من غير ما تكون متأكد: ممكن يمسح داتا قاعدة بيانات لو الكونتينر بتاعها واقف ساعتها. و [[prune -a]] وانت محتاج صورة قديمة ترجعلها."
          },
          teach: R`## اعرف الأول، وبعدين امسح

[[prune]] يعني «قلّم»: امسح اللي مش مستخدم. اتجرّب على Docker معزول جوه سيرفر تجربة (كونتينر [[ubuntu:24.04]] فيه Docker [[29.8.2]] لوحده)، مش على Docker الجهاز، لأن الأوامر دي بتمسح من الجهاز كله. كان عليه صور من الدروس اللي فاتت، و build لتطبيق اتعمل ٣ مرات، وكونتينر واقف.

---

## ١. [[docker system df]]

df زي أمر لينكس (disk free): Docker واكل قد إيه:

~~~text الناتج
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          6         1         395.6MB   382.5MB (96%)
Containers      1         0         4.096kB   4.096kB (100%)
Local Volumes   1         0         89B       89B (100%)
Build Cache     3         0         3.862MB   12.29kB
~~~

| العمود | معناه |
|---|---|
| [[TYPE]] | النوع: الصور، والكونتينرات، والـ volumes (البيانات)، والـ build cache |
| [[TOTAL]] | العدد |
| [[ACTIVE]] | المستخدم في كونتينر موجود |
| [[SIZE]] | الحجم |
| [[RECLAIMABLE]] | ممكن يترجع لو مسحت اللي مش مستخدم |

هنا ٩٦٪ من الصور مش مستخدمة. على سيرفر بيعمل build بقاله شهور الأرقام دي بتبقى جيجات.

---

## ٢. [[docker image prune -a]]

| | يمسح |
|---|---|
| [[docker image prune]] | الصور الـ **dangling** بس: نسخ قديمة ملهاش اسم ولا tag (بتظهر [[<none>]]) |
| [[docker image prune -a]] | **أي** صورة مفيش كونتينر (شغال أو واقف) معمول منها |

بيسأل الأول:

~~~text الناتج (مختصر)
WARNING! This will remove all images without at least one container associated to them.
Are you sure you want to continue? [y/N] y
Deleted Images:
untagged: demo2-api:latest
deleted: sha256:70189589f799...
untagged: nginx:alpine
deleted: sha256:df221db836e1...
...
Total reclaimed space: 382.6MB
~~~

[[[y/N]]]: الـ N كبيرة يعني Enter لوحده = لأ. [[untagged]] شال الاسم، و [[deleted]] مسح الطبقات (layers) نفسها. و [[alpine]] **متمسحتش**، لأن فيه كونتينر واقف معمول منها. وكل اللي اتمسح هيتنزّل تاني لوحده لو احتجته ([[docker compose pull]])، بس صورة تطبيقك هتحتاج build.

---

## ٣. [[docker system prune]]

~~~text الناتج
WARNING! This will remove:
  - all stopped containers
  - all networks not used by at least one container
  - all dangling images
  - unused build cache

Are you sure you want to continue? [y/N] y
Deleted Containers:
2b6722486c08...

Deleted build cache objects:
souqk4zdru4bd2kgl6pvptz96
wz0fh48jp27e8h7m2xq4dr0pb

Total reclaimed space: 16.38kB
~~~

التحذير بيقولك بالظبط هيمسح إيه: الكونتينرات الواقفة (حتى لو موقّفها عن قصد)، والشبكات الفاضية، والصور المعلّقة، والـ build cache. ولاحظ إن الـ volumes **مش** في اللستة: بياناتك أمان إلا لو ضفت [[--volumes]].

~~~text docker system df بعد
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          1         0         13.03MB   13.02MB (99%)
Containers      0         0         0B        0B
Local Volumes   1         0         89B       89B (100%)
Build Cache     1         0         3.85MB    0B
~~~

من ٣٩٥ ميجا لـ ١٣. والـ volume لسه موجود.

---

## الخلاصة

~~~text
docker system df              مين واكل قد إيه
docker image prune            النسخ المعلّقة بس
docker image prune -a         كل صورة مش مستخدمة
docker system prune           كونتينرات واقفة + شبكات + معلّقة + cache
docker builder prune          الـ build cache بس
--volumes                     متضيفهاش: بتمسح البيانات
~~~

> على جهازك اللي فيه مشاريع تانية، الأوامر دي بتمسح حاجات كل المشاريع، مش مشروع واحد.`,
          lines: [
            "Docker واكل قد إيه، ومنه قد إيه ممكن يتمسح.",
            "امسح كل الصور اللي مش مستخدمة ([[-a]] all). هيسألك تأكيد.",
            "امسح الكونتينرات الواقفة والصور المعلّقة والـ cache."
          ],
          sol: R`[[docker system df]] قبل بيطبع جدول [[TYPE TOTAL ACTIVE SIZE RECLAIMABLE]]، وعلى سيرفر بقاله شهور بيعمل build هتلاقي [[Images]] و [[Build Cache]] بالجيجات، و RECLAIMABLE كبير.

بعد [[docker image prune -a]] (بيسأل [[Are you sure you want to continue? [y/N]]]) بيطبع الـ images اللي اتمسحت وفي الآخر [[Total reclaimed space: 3.2GB]] مثلًا. و [[system df]] بعدها بيوري الأرقام قلّت، و [[df -h /]] بيوري المساحة الفاضية زادت.

الغلط الشائع: [[docker system prune]] بيمسح الـ containers الواقفة، فلو فيه container موقّفه عن قصد هيتمسح. و [[Build Cache]] مش بيتمسح بـ image prune؛ محتاج [[docker builder prune]]. وماتستخدمش [[--volumes]] إلا لو متأكد.`
        }
      ]
    },
    {
      t: "pm2",
      l: 2,
      n: "لو بتشغّل Node من غير Docker",
      items: [
        {
          cmd: "pm2",
          title: "خلّي تطبيق Node شغال دايمًا",
          desc: "بيعيد تشغيل التطبيق لو وقع. لو Node متسطّب بـ nvm اكتب [[npm install -g pm2]] من غير sudo. [[pm2 startup]] بيطبعلك أمر، انسخه ونفّذه، وبعدين [[pm2 save]] عشان التطبيقات تقوم لوحدها مع ريستارت السيرفر.",
          example: R`sudo npm install -g pm2
pm2 start server.js --name api
pm2 start npm --name web -- start
pm2 list
pm2 logs api
pm2 restart api
pm2 startup
pm2 save`,
          try: "شغّل تطبيق، اعمل reboot للسيرفر، واتأكد إنه قام لوحده.",
          deep: {
            why: "لو بتشغّل Node من غير Docker، محتاج حاجة تخلي التطبيق شغال دايمًا: لو وقع يقوم، ولو السيرفر عمل ريستارت يقوم معاه، وتعرف تشوف لوجاته.",
            how: R`pm2 «مدير عمليات» لتطبيقات Node. لما تعمل [[pm2 start]]، مش انت اللي بتشغّل التطبيق، pm2 هو اللي بيشغّله ويفضل مراقبه. لو التطبيق وقع بسبب error، pm2 بيلاحظ ويشغّله تاني في ثانية.

و [[--name]] بيدّيه اسم تتعامل بيه بدل الرقم. و [[pm2 start npm --name web -- start]] بيشغّل [[npm start]]، والـ [[--]] معناها «اللي بعدي ابعته لـ npm مش لـ pm2».

و pm2 بيجمع لوجات كل تطبيق، و [[pm2 logs api]] بيعرضها.

والجزء اللي ناس كتير بتنساه: pm2 نفسه لازم يقوم مع السيرفر. [[pm2 startup]] بيطبعلك أمر (فيه sudo) تنسخه وتنفّذه، وده بيعمل خدمة systemd لـ pm2. وبعدين [[pm2 save]] بيحفظ لستة التطبيقات الشغالة دلوقتي، عشان pm2 يشغّلها كلها بعد الريستارت.`,
            when: "تطبيقات Node على السيرفر من غير Docker.",
            mistakes: "تنسى [[pm2 startup]] أو [[pm2 save]]، والسيرفر يعمل ريستارت والموقع ميرجعش. ولو ضفت تطبيق جديد لازم [[pm2 save]] تاني."
          },
          teach: R`## pm2 هو اللي بيشغّل تطبيقك ويفضل يراقبه

pm2 برنامج بيعيش في الخلفية (daemon)، وانت بتقوله «شغّلّي ده». لو التطبيق وقع بيشغّله تاني، وبيحفظ لوجاته، ومع [[startup]] و [[save]] بيرجّع كل حاجة بعد ريستارت السيرفر. اتجرّب على سيرفر تجربة (كونتينر [[ubuntu:24.04]] فيه systemd و Node [[24.21.0]] و pm2 [[7.0.4]])، كيوزر [[deploy]]. و [[server.js]] تطبيق صغير على بورت 3000 بيقع لو حد فتح [[/crash]]، و [[package.json]] فيه [[start]] بيشغّل تطبيق تاني على 4000. والريستارت اتعمل بإعادة تشغيل الكونتينر.

---

## ١. [[sudo npm install -g pm2]]

[[-g]] global: سطّبه للجهاز كله كأمر ([[pm2]])، مش جوه مشروع. و [[sudo]] لأن المكان ده ([[/usr/lib/node_modules]]) ملك root لما Node يبقى من apt. (لو Node من nvm، من غير sudo.)

---

## ٢. [[pm2 start server.js --name api]]

أول أمر pm2 بيطبع لوجو كبير وبعده:

~~~text الناتج
[PM2] Spawning PM2 daemon with pm2_home=/home/deploy/.pm2
[PM2] PM2 Successfully daemonized
[PM2] Starting /home/deploy/server.js in fork_mode (1 instance)
[PM2] Done.
~~~

[[daemonized]] يعني pm2 نفسه بقى شغال في الخلفية، وبيتحفظ كل حاجته في [[~/.pm2]]. و [[fork_mode]] نسخة واحدة من التطبيق (عكس [[cluster]] اللي بيشغّل كذا نسخة). و [[--name api]] اسم تستخدمه بدل الرقم.

---

## ٣. [[pm2 start npm --name web -- start]]

هنا pm2 بيشغّل برنامج [[npm]] نفسه. والـ [[--]] حد فاصل: اللي قبلها لـ pm2 ([[--name web]])، واللي بعدها يتبعت لـ npm. فالنتيجة [[npm start]]:

~~~text الناتج
[PM2] Starting /usr/bin/npm in fork_mode (1 instance)
[PM2] Done.
~~~

---

## ٤. [[pm2 list]]

~~~text الناتج (أعمدة مختارة)
│ id │ name   │ mode    │ pid      │ uptime │ ↺    │ status    │ mem      │ user     │
│ 0  │ api    │ fork    │ 5248     │ 2s     │ 1    │ online    │ 65.2mb   │ deploy   │
│ 2  │ web    │ fork    │ 5224     │ 4s     │ 0    │ online    │ 76.3mb   │ deploy   │
~~~

| العمود | معناه |
|---|---|
| [[id]] | رقم التطبيق في pm2 |
| [[pid]] | رقم العملية في لينكس |
| [[uptime]] | شغال من إمتى |
| [[↺]] | **اتعمله restart كام مرة**. لو بيزيد لوحده يبقى التطبيق بيقع |
| [[status]] | [[online]] شغال، [[errored]] وقع ومش قادر يقوم، [[stopped]] انت وقفته |

الـ [[↺ 1]] قدام api لأني فتحت [[/crash]]: التطبيق وقع، و pm2 شغّله تاني في أقل من ثانية، فـ [[uptime]] رجع [[2s]].

---

## ٥. [[pm2 logs api]]

بيعرض آخر اللوجات ويفضل يتابع (Ctrl+C تخرج). بـ [[--lines 5 --nostream]] بيطبع ويخرج:

~~~text الناتج
/home/deploy/.pm2/logs/api-error.log last 5 lines:
0|api      | boom: crashing on purpose

/home/deploy/.pm2/logs/api-out.log last 5 lines:
0|api      | api listening on 3000
0|api      | GET /
0|api      | api listening on 3000
~~~

ملفين: [[-out.log]] لـ [[console.log]]، و [[-error.log]] لـ [[console.error]]. وهنا شايف سبب الوقعة، وبعدها [[listening]] تاني (الـ restart).

---

## ٦. [[pm2 restart api]]

~~~text الناتج
[PM2] Applying action restartProcessId on app [api](ids: [ 0 ])
[PM2] [api](0) ✓
~~~

بتعمله بعد ما تحدّث الكود ([[git pull]])، عشان Node بيقرا الكود مرة واحدة وهو بيبدأ.

---

## ٧. [[pm2 startup]]

pm2 نفسه لازم يقوم مع السيرفر. الأمر ده كيوزر عادي مش بيعمل حاجة، بيطبعلك أمر:

~~~text الناتج
[PM2] Init System found: systemd
[PM2] To setup the Startup Script, copy/paste the following command:
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u deploy --hp /home/deploy
~~~

انسخه زي ما هو ونفّذه. [[-u deploy]] اليوزر اللي pm2 هيشتغل بيه، و [[--hp]] (home path) فولدره. والنتيجة خدمة systemd:

~~~text الناتج
[PM2] Writing init configuration in /etc/systemd/system/pm2-deploy.service
Created symlink /etc/systemd/system/multi-user.target.wants/pm2-deploy.service → /etc/systemd/system/pm2-deploy.service.
[PM2] [v] Command successfully executed.
~~~

---

## ٨. [[pm2 save]]

~~~text الناتج
[PM2] Saving current process list...
[PM2] Successfully saved in /home/deploy/.pm2/dump.pm2
~~~

[[dump.pm2]] صورة من اللستة **دلوقتي**. الخدمة بتشغّل اللي فيها بعد الريستارت. أي تطبيق تضيفه بعد كده محتاج [[pm2 save]] تاني.

### الاختبار: ريستارت

بعد ما السيرفر قام (من غير ما أكتب أي start):

~~~text pm2 list
│ 0  │ api    │ fork    │ 283      │ 11s    │ 0    │ online    │ 64.9mb   │ deploy   │
│ 1  │ web    │ fork    │ 287      │ 11s    │ 0    │ online    │ 76.1mb   │ deploy   │
~~~

[[uptime 11s]] يعني قاموا مع السيرفر، و [[systemctl is-active pm2-deploy]] طبع [[active]].

---

## الخلاصة

~~~text
pm2 start ملف --name اسم          شغّل ملف JS
pm2 start npm --name اسم -- start  شغّل npm start
pm2 list                           الحالة (↺ = وقع كام مرة)
pm2 logs اسم                       اللوجات
pm2 restart اسم                    بعد تحديث الكود
pm2 startup ثم نفّذ السطر اللي طبعه  pm2 يقوم مع السيرفر (مرة واحدة)
pm2 save                           احفظ اللستة (بعد كل تغيير)
~~~`,
          lines: [
            "سطّب pm2 على الجهاز كله ([[-g]] global).",
            "شغّل server.js وسمّيه api.",
            "شغّل [[npm start]] وسمّيه web. اللي بعد [[--]] بيتبعت لـ npm.",
            "اعرض كل التطبيقات وحالتها.",
            "اعرض لوجات api.",
            "اعمل ريستارت لـ api (بعد ما تحدّث الكود).",
            "هيطبعلك أمر فيه sudo، انسخه ونفّذه عشان pm2 يقوم مع السيرفر.",
            "احفظ لستة التطبيقات الشغالة دلوقتي عشان ترجع بعد الريستارت."
          ],
          sol: R`[[pm2 list]] بيوري جدول فيه [[api]] و [[status]] [[online]] و [[↺]] (عدد مرات الـ restart) و [[mem]]. و [[pm2 startup]] كيوزر عادي بيطبع سطر [[sudo env PATH=$PATH:/usr/bin ... pm2 startup systemd -u deploy --hp /home/deploy]]: انسخه وشغّله. و [[pm2 save]] بيطبع [[Successfully saved in /home/deploy/.pm2/dump.pm2]].

بعد [[sudo reboot]] والدخول تاني، [[pm2 list]] بيوري [[api]] [[online]] بـ uptime قليل، من غير ما تعمل start.

جربت كل الخطوات (start و list و startup و save) على كونتينر أوبونتو بـ systemd، وبعد ما عملت restart للكونتينر كريستارت للسيرفر، [[pm2 list]] طلّع الاتنين [[online]] لوحدهم. الغلط الشائع: [[pm2 list]] بعد الـ reboot فاضي: نسيت [[pm2 save]] بعد آخر start، أو شغلت [[pm2 startup]] ونسيت تنفّذ السطر اللي طبعه. أو عملت startup بـ root والتطبيق شغال بـ deploy، فالقايمة اتحفظت عند يوزر تاني.`
        }
      ]
    }
]);

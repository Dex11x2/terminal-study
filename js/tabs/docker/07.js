// تكملة تاب docker: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/docker/01.js (شرح حقول الدرس في أوله)
MORE("docker", [
    {
      t: "توصل للأمر بنفسك في docker",
      l: 2,
      time: R`حوالي ساعة`,
      goal: [
        R`تلاقي أمر docker اللي محتاجه من [[--help]] نفسه، مش من جوجل.`,
        R`تسأل docker عن أي تفصيلة في أي صورة أو كونتينر بـ [[inspect --format]].`,
        R`تجرّب [[compose]] من غير ما يشغّل حاجة.`,
        R`تقرا سبب وقوع كونتينر في تلات أوامر.`,
      ],
      use: {
        prog: R`[[docker inspect]] بيرجّع JSON كامل عن أي حاجة، و [[--format]] بتفلتره بـ Go templates. يعني docker بيدّيك API محلي عن حالته — ومنه بتبني أي أداة مراقبة.`,
        net: R`على سيرفر، سبب وقوع الكونتينر بيبقى في تلات أماكن: كود الخروج، واللوج، وحالة الـ health. وتعرف تقراهم في ثانية بدل ما تخمّن.`,
        cs: R`تقسيم CLI لأوامر مجمّعة ([[docker image ls]] بدل [[docker images]]) هو نفس تطوّر أي واجهة بتكبر: من قايمة مسطّحة لشجرة.`,
      },
      lab: R`mkdir -p ~/lab/dlab && cd ~/lab/dlab`,
      projects: [
        { t: R`تقرير عن صورك`, what: R`سكربت بيلف على [[docker image ls -q]] وبيطلّع لكل صورة: الحجم، وعدد الطبقات، والمستخدم اللي بتشتغل بيه، وفيها HEALTHCHECK ولا لأ — كله من [[inspect --format]]. من درس ٢.` },
        { t: R`مين واقع ومن امتى`, what: R`[[docker ps -a --filter "status=exited" --format]] مع [[inspect]] عشان تطلّع جدول: الاسم، والكود، وآخر ٣ سطور من اللوج. من دروس ٢ و ٤.` },
        { t: R`alias للمعاينة`, what: R`[[alias dcu='docker compose --dry-run up -d']] — تشوف هيعمل إيه قبل ما يعمله، زي ما عملنا مع git. من درس ٣.` },
      ],
      n: R`docker فيه عشرات الأوامر وكل واحد فيه عشرات الخيارات. القسم ده مش بيحفّظك حاجة — بيوريك تدوّر إزاي، وتسأل إزاي، وتجرّب إزاي من غير ما تشغّل`,
      items: [
        {
          cmd: "docker --help والأوامر المجمّعة",
          title: "شجرة مش قايمة: docker <مجموعة> --help",
          learn: R`تعرف إن أوامر docker مقسومة لمجموعات، وتوصل لأي أمر في خطوتين.`,
          out: R`تلاقي الخيار اللي محتاجه من غير ما تخرج من الترمنال.`,
          use: {
            prog: R`الشكل القديم ([[docker images]]) والجديد ([[docker image ls]]) موجودين سوا للتوافق. وفهم ده بيخليك تقرا أي توثيق قديم من غير لخبطة.`,
            work: R`[[docker container --help]] بتوريك ٢٠ حاجة تقدر تعملها بكونتينر، نصهم متعرفش عنهم حاجة.`,
          },
          desc: R`docker بدأ بقايمة أوامر مسطّحة: [[docker images]] و [[docker ps]] و [[docker rmi]]. ولما كبر، بقت القايمة مش مقروءة، فاتعمل تقسيم لمجموعات:

[[docker image ls]] و [[docker image rm]] و [[docker image inspect]].
[[docker container ls]] و [[docker container rm]] و [[docker container logs]].
[[docker network]] و [[docker volume]] و [[docker system]].

والأوامر القديمة لسه شغالة كاختصارات: [[docker ps]] هي [[docker container ls]]، و [[docker images]] هي [[docker image ls]]. فلو قريت توثيق قديم، ده السبب.

و [[docker --help]] بتعرض المجموعات دي تحت [[Management Commands]]، وجنب بعضها نجمة — دي بتعني إن الأمر ده **إضافة (plugin)** مش جزء من docker نفسه، زي [[compose]] و [[buildx]].

والدورة: [[docker --help]] تدّيك المجموعة، و [[docker <مجموعة> --help]] تدّيك الأوامر، و [[docker <مجموعة> <أمر> --help]] تدّيك الخيارات. تلات خطوات، وكلها في الترمنال.`,
          example: R`# المجموعات
docker --help

# الأوامر جوه مجموعة
docker image --help
docker container --help

# وخيارات أمر بعينه
docker image prune --help

# والقديم والجديد نفس الحاجة
docker ps        # = docker container ls
docker images    # = docker image ls`,
          lines: [
            R`بتعرض المجموعات تحت [[Management Commands]]. والنجمة جنب الاسم معناها إضافة مش جزء من docker.`,
            R`أوامر الصور.`,
            R`أوامر الكونتينرات — فيها حاجات كتير متعرفش عنها.`,
            R`خيارات أمر واحد.`,
            R`الشكل القديم، لسه شغال.`,
            R`ونفسه بالشكل الجديد.`,
          ],
          try: R`شغّل [[docker --help]] وعدّ المجموعات. وبعدين [[docker container --help]] وشوف كام أمر فيها وانت عارف كام. وبعدين [[docker image prune --help]] واقرا خيارات الفلترة.`,
          mac: ["both", R`نفس الحاجة على الماك ولينكس. الفرق الوحيد إن Docker Desktop على ويندوز والماك بيضيف إضافات ([[desktop]] و [[extension]]) مش موجودة في docker على لينكس.`],
          deep: {
            why: R`الأداة اللي فيها ١٠٠ أمر محتاجة شجرة مش قايمة. والتقسيم ده بيخليك تلاقي الأمر من اسمه: «عايز أعمل حاجة بصورة» → [[docker image --help]].`,
            how: R`الشكل الجديد اتضاف في Docker 1.13 (٢٠١٧)، والقديم اتساب للتوافق. ومفيش نية يتشال.

وفيه فرق بسيط بينهم أحيانًا: [[docker rm]] هي [[docker container rm]]، و [[docker rmi]] هي [[docker image rm]]. فالقديم كان بيستخدم حروف للتفرقة، والجديد بيستخدم المجموعة.

النجمة [[*]] جنب الأمر في [[docker --help]] معناها إنه **CLI plugin**: برنامج منفصل اسمه [[docker-xxx]] في مجلد الإضافات. [[compose]] و [[buildx]] الاتنين كده. وعشان كده [[docker compose]] (بمسافة) غير [[docker-compose]] (بشرطة، النسخة القديمة بـ Python).

وتشوف الإضافات المتسطبة: [[docker plugin ls]] للـ plugins بتاعة الـ engine، و [[ls ~/.docker/cli-plugins]] للـ CLI.

و [[docker system]] مجموعة مهمة بيتنساها الناس: [[docker system df]] (المساحة) و [[docker system events]] (كل حاجة بتحصل لحظيًا) و [[docker system info]].`,
            when: R`أول ما تحتاج خيار مش فاكره. وقبل ما تدوّر في النت.`,
            mistakes: R`تدوّر على أمر قديم في توثيق جديد (أو العكس). أو تفتكر إن [[docker-compose]] بالشرطة هي نفس [[docker compose]] بالمسافة. أو تنسى إن [[docker system df]] موجودة وتدوّر على المساحة بإيدك.`
          },
          teach: R`## من قايمة لشجرة

~~~text القديم (لسه شغال)
docker ps        docker images        docker rmi
~~~

~~~text الجديد
docker container ls    docker image ls    docker image rm
~~~

نفس الحاجة. التقسيم اتعمل لما القايمة بقت مش مقروءة.

---

## ١. المجموعات

~~~bash Docker 29.6
docker --help
~~~

~~~text جزء من الناتج (اتشغّل فعلًا)
Management Commands:
  builder     Manage builds
  buildx*     Docker Buildx
  compose*    Docker Compose
  container   Manage containers
  context     Manage contexts
  image       Manage images
  network     Manage networks
  system      Manage Docker
  volume      Manage volumes
~~~

**النجمة [[*]] معناها إضافة (CLI plugin)** — برنامج منفصل، مش جزء من docker نفسه. [[compose]] و [[buildx]] الاتنين كده.

> وعشان كده [[docker compose]] (بمسافة) غير [[docker-compose]] (بشرطة — النسخة القديمة بـ Python).

---

## ٢. الدورة: تلات خطوات

~~~text
docker --help                      →  المجموعات
docker image --help                →  أوامر المجموعة
docker image prune --help          →  خيارات الأمر
~~~

كلها في الترمنال، ومفيش ولا بحث.

---

## ٣. المجموعة اللي بيتنساها الناس

~~~bash
docker system df
~~~

~~~text الناتج (اتشغّل فعلًا)
TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
Images          16        3         6.577GB   4.95GB (75%)
Containers      3         1         40.96kB   24.58kB (60%)
Local Volumes   47        4         1.706GB   1.317GB (77%)
Build Cache     320       0         17.29GB   15.58GB
~~~

**١٧ جيجا كاش بناء.** ودي مش حاجة حد بيبص عليها لحد ما القرص يمتلي.

| الأمر | بيعمل إيه |
|---|---|
| [[docker system df]] | المساحة، **قراية بس** |
| [[docker system df -v]] | تفصيل لكل صورة وفوليوم |
| [[docker system events]] | كل حاجة بتحصل، لحظيًا |
| [[docker system info]] | إعدادات الـ engine |

> و [[docker system prune]] بتمسح. **متشغّلهاش قبل ما تبص على [[df]]** وتعرف هتخسر إيه — خصوصًا [[-a]] و [[--volumes]].

---

## ٤. القديم والجديد

| القديم | الجديد |
|---|---|
| [[docker ps]] | [[docker container ls]] |
| [[docker images]] | [[docker image ls]] |
| [[docker rm]] | [[docker container rm]] |
| [[docker rmi]] | [[docker image rm]] |
| [[docker logs]] | [[docker container logs]] |

القديم أقصر في الكتابة، والجديد أوضح في السكربتات. والاتنين هيفضلوا.

---

## الخلاصة

- الأوامر شجرة: [[docker <مجموعة> <أمر>]].
- النجمة = إضافة مش جزء من docker.
- [[--help]] على تلات مستويات.
- [[docker system df]] قبل أي تنضيف.
- [[docker compose]] بمسافة، مش بشرطة.`,
          sol: R`[[docker system df]] بناتجها الحقيقي من جهاز شغّال — ودي أول حاجة تشوفها قبل أي تنضيف.`,
          solCode: R`docker system df

# الناتج (اتشغّل فعلًا على Docker 29.6.1):
# TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE
# Images          16        3         6.577GB   4.95GB (75%)
# Containers      3         1         40.96kB   24.58kB (60%)
# Local Volumes   47        4         1.706GB   1.317GB (77%)
# Build Cache     320       0         17.29GB   15.58GB`
        },

        {
          cmd: "docker inspect --format",
          title: "اسأل docker عن أي تفصيلة",
          learn: R`تطلّع أي معلومة عن صورة أو كونتينر بـ Go template بدل ما تقرا JSON كامل.`,
          out: R`سطر واحد بيدّيك الحالة أو الكود أو المتغيرات، جاهز للسكربت.`,
          use: {
            prog: R`[[inspect]] بيرجّع نفس الـ JSON اللي الـ API بيرجّعه. فأي حاجة تقدر تعملها في أداة مراقبة، تقدر تجرّبها هنا الأول.`,
            net: R`على سيرفر، [[inspect --format]] هي اللي بتدّيك الإجابة في سطر بدل ١٠٠ سطر JSON.`,
            cs: R`Go templates لغة قوالب صغيرة: متغيرات وتكرار وشروط. وهي نفسها اللي في [[kubectl -o go-template]] و [[helm]].`,
          },
          desc: R`[[docker inspect <حاجة>]] بترجّع **كل** اللي docker يعرفه عنها، كـ JSON. وده بيبقى مئة سطر أحيانًا.

و [[--format]] بتخليك تاخد اللي انت عايزه بس، بلغة قوالب Go:

[[{{.State.Status}}]] بتاخد مفتاح جوه مفتاح.
[[{{json .Config.Env}}]] بتطبع الجزء ده كـ JSON.
[[{{len .RootFS.Layers}}]] بتعد.
[[{{range ...}}...{{end}}]] بتلف على قايمة.
[[{{index .State.Health.Log 0}}]] بتاخد عنصر برقمه.

وتقدر تحط نص عادي بينهم، فالناتج بيطلع جاهز للقراية:

[[docker inspect x --format 'الحالة: {{.State.Status}} | الكود: {{.State.ExitCode}}']]

وأهم حاجة: دي نفس البيانات اللي الـ Docker API بيرجّعها. يعني لما تتعلمها هنا، بتبقى عارف شكل البيانات في أي أداة بتتكلم مع docker.

وعشان تعرف المفاتيح الموجودة: شغّل [[docker inspect <حاجة>]] من غير [[--format]] مرة واحدة واقرا، أو [[docker inspect x --format '{{json .}}']] وحطها في [[jq]].`,
          example: R`# معلومات عن صورة
docker image inspect node:22-slim --format '{{.Id}} | {{.Os}}/{{.Architecture}} | layers={{len .RootFS.Layers}}'

# متغيرات البيئة جواها
docker image inspect node:22-slim --format '{{json .Config.Env}}'

# حالة كونتينر وسبب وقوعه
docker inspect boom --format 'الحالة: {{.State.Status}} | الكود: {{.State.ExitCode}} | الخطأ: [{{.State.Error}}]'

# وحالة الـ health
docker inspect notes-test --format '{{.State.Health.Status}} | فحوصات: {{len .State.Health.Log}}'`,
          lines: [
            R`تلات حاجات في سطر: الهاش، والنظام والمعمارية، وعدد الطبقات.`,
            R`[[json]] بتطبع الجزء كـ JSON بدل ما تفرده.`,
            R`[[.State]] فيه كل حاجة عن الكونتينر الشغّال أو الواقع.`,
            R`[[.State.Health]] موجود بس لو الصورة فيها [[HEALTHCHECK]].`,
          ],
          try: R`شغّل [[docker image inspect node:22-slim]] من غير [[--format]] واقرا المفاتيح. وبعدين جرّب تطلّع [[.Config.Cmd]] و [[.Config.WorkingDir]] و [[.Created]].`,
          mac: ["both", R`[[inspect]] و [[--format]] شغالين زي ما هم.`],
          deep: {
            why: R`الـ JSON الكامل مش بيتقري. و [[grep]] عليه بيكسر مع أول تغيير في الشكل. والقالب بيسأل عن المفتاح نفسه، فمبيتأثرش بالترتيب ولا بالمسافات.`,
            how: R`[[--format]] بتستخدم [[text/template]] بتاعة Go. والنقطة [[.]] هي الكائن الحالي.

الدوال اللي هتستخدمها:

| الدالة | بتعمل إيه |
|---|---|
| [[json]] | تطبع الجزء كـ JSON |
| [[len]] | تعد عناصر قايمة أو مفاتيح |
| [[index x 0]] | عنصر برقمه |
| [[range]] | لوب على قايمة |
| [[printf]] | زي printf |
| [[upper]] / [[lower]] | حروف |

والشرط: [[{{if .State.Running}}شغال{{else}}واقف{{end}}]].

وفيه فخ: لو المفتاح مش موجود، القالب بيفشل برسالة زي [[can't evaluate field X]]. وده بيحصل كتير مع [[.State.Health]] — لأنه موجود بس لو الصورة فيها [[HEALTHCHECK]]. والحل: [[{{if .State.Health}}...{{end}}]].

ولو عايز تفلتر أعقد، استخدم [[--format '{{json .}}']] وحطها في [[jq]]. و [[jq]] أقوى بكتير، بس [[--format]] موجودة في أي مكان من غير تسطيب.

و [[docker ps --format]] بتاخد قوالب كمان، بس بمفاتيح مختلفة (أبسط): [[{{.Names}}]] و [[{{.Status}}]] و [[{{.Image}}]]. ودي بتشتغل على الجدول مش على الـ JSON الكامل.

و [[--format 'table {{.Names}}\t{{.Status}}']] بتعمل جدول بعناوين.`,
            when: R`أي سكربت بيسأل docker عن حالة. وأي مرة الـ JSON الكامل أطول من اللي محتاجه.`,
            mistakes: R`تعمل [[grep]] على ناتج [[inspect]] بدل [[--format]]. أو تسأل عن [[.State.Health]] في صورة مفيهاش [[HEALTHCHECK]] فيفشل. أو تخلط بين مفاتيح [[docker inspect]] (الـ JSON الكامل) ومفاتيح [[docker ps --format]] (المبسّطة).`
          },
          teach: R`## المشكلة: JSON بمية سطر

~~~bash
docker image inspect node:22-slim
~~~

مية سطر، وانت عايز حاجة واحدة.

---

## ١. القالب

~~~bash Docker 29.6
docker image inspect node:22-slim --format '{{.Id}} | {{.Os}}/{{.Architecture}} | layers={{len .RootFS.Layers}}'
~~~

~~~text الناتج (اتشغّل فعلًا)
sha256:c3de60bf2f9dd0ac6370e6117950ff62d6e339527e7472301c9c78a017978392 | linux/amd64 | layers=5
~~~

النقطة [[.]] هي الكائن، وبعدها المفاتيح. والنص اللي بينهم بيتطبع زي ما هو.

---

## ٢. الدوال

~~~bash
docker image inspect node:22-slim --format '{{json .Config.Env}}'
~~~

~~~text الناتج (اتشغّل فعلًا)
["PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin","NODE_VERSION=22.23.3","YARN_VERSION=1.22.22"]
~~~

| الدالة | بتعمل إيه |
|---|---|
| [[json]] | تطبع الجزء كـ JSON |
| [[len]] | تعد |
| [[index x 0]] | عنصر برقمه |
| [[range]] | لوب |
| [[printf]] | زي printf |

~~~bash range
docker image inspect node:22-slim --format '{{range .RootFS.Layers}}{{println .}}{{end}}'
~~~

~~~text الناتج (اتشغّل فعلًا، أول ٣)
sha256:e58989146fcec76699871403b9897b5c014af1ccd85f5a9300a215e7975525d7
sha256:4990a62cab1587a2ed690c9d4f41675b9216d68120e99033d664b558662e90c8
sha256:3714bbaf32038e259cddcddea09e13fc9aaa1a86a644274a6c6e263b00972240
~~~

---

## ٣. على كونتينر: [[.State]]

~~~bash
docker inspect boom --format 'الحالة: {{.State.Status}} | الكود: {{.State.ExitCode}} | الخطأ: [{{.State.Error}}]'
~~~

~~~text الناتج (اتشغّل فعلًا)
الحالة: exited | الكود: 1 | الخطأ: []
~~~

[[.State.Error]] فاضي هنا لأن البرنامج اشتغل وخرج بكود ١ — مش docker اللي فشل. لو docker نفسه مقدرش يشغّله، الرسالة بتبقى هنا.

---

## ٤. و [[.State.Health]]

~~~bash
docker inspect notes-test --format '{{.State.Health.Status}} | فحوصات: {{len .State.Health.Log}}'
~~~

~~~text الناتج (اتشغّل فعلًا)
healthy | فحوصات: 2
~~~

> **فخ:** [[.State.Health]] موجود **بس لو الصورة فيها [[HEALTHCHECK]]**. غير كده القالب بيفشل بـ [[can't evaluate field Health]]. والحل: [[{{if .State.Health}}...{{end}}]].

---

## ٥. [[docker ps --format]] مفاتيحها مختلفة

~~~bash
docker ps --format '{{.Names}}  {{.Status}}'
~~~

~~~text الناتج (اتشغّل فعلًا)
notes-test  Up 24 seconds (healthy)
~~~

دي بتشتغل على **الجدول** مش على الـ JSON، فمفاتيحها أبسط: [[.Names]] و [[.Status]] و [[.Image]] و [[.Ports]].

~~~bash وبجدول بعناوين
docker ps --format 'table {{.Names}}\t{{.Status}}'
~~~

---

## ٦. ولو محتاج أقوى

~~~bash
docker inspect x --format '{{json .}}' | jq '.State'
~~~

[[jq]] أقوى بكتير. بس [[--format]] موجودة في أي مكان من غير تسطيب — وعلى سيرفر مش بتاعك، دي اللي معاك.

---

## الخلاصة

- [[--format]] بدل [[grep]] على JSON.
- [[json]] و [[len]] و [[index]] و [[range]] هم اللي هتستخدمهم.
- [[.State]] للكونتينر، و [[.Config]] للصورة.
- [[.State.Health]] موجود بس مع [[HEALTHCHECK]] — لفّه في [[if]].
- مفاتيح [[docker ps --format]] غير مفاتيح [[inspect]].`,
          sol: R`تلات قوالب بناتجهم الحقيقي: على صورة، وعلى كونتينر واقع، وعلى كونتينر سليم.`,
          solCode: R`docker image inspect node:22-slim --format '{{.Id}} | {{.Os}}/{{.Architecture}} | layers={{len .RootFS.Layers}}'
# sha256:c3de60bf2f9d... | linux/amd64 | layers=5

docker inspect boom --format 'الحالة: {{.State.Status}} | الكود: {{.State.ExitCode}} | الخطأ: [{{.State.Error}}]'
# الحالة: exited | الكود: 1 | الخطأ: []

docker inspect notes-test --format '{{.State.Health.Status}} | فحوصات: {{len .State.Health.Log}}'
# healthy | فحوصات: 2

# (اتشغّلوا فعلًا على Docker 29.6.1)`
        },

        {
          cmd: "المعاينة في docker",
          title: "compose --dry-run و config، وإيه اللي ملهوش معاينة",
          learn: R`تشوف compose هيعمل إيه قبل ما يعمله، وتعرف أنهي أوامر مالهاش معاينة.`,
          out: R`تجرّب ملف compose جديد من غير ما تشغّل ولا كونتينر.`,
          use: {
            prog: R`[[compose config]] بتوريك الملف **بعد** ما الـ variables اتفكّت والـ overrides اتدمجت. ودي بتكشف أغلب أخطاء الإعدادات.`,
            net: R`على سيرفر، [[--dry-run]] بتقولك هيوقّف أنهي كونتينرات ويشغّل أنهي شبكات — قبل ما الموقع يقع.`,
            work: R`ملف compose فيه variable غلط بيفشل بعد ما يكون وقّف حاجة شغالة. والمعاينة بتكشفه قبلها.`,
          },
          desc: R`docker مش كل أوامره ليها وضع معاينة. والصريح أحسن: دي اللي موجودة فعلًا.

**[[docker compose --dry-run]]** — دي الأقوى. بتطبع كل خطوة كان هيعملها: الشبكات، والكونتينرات، والترتيب — **من غير ما تعمل حاجة**. جرّبتها وبعدها [[docker compose ps]] طلعت فاضية وعدد الشبكات صفر.

**[[docker compose config]]** — بتطبع الملف **بعد المعالجة**: المتغيرات اتفكّت، والملفات الإضافية اتدمجت، والقيم الافتراضية اتحطت. ودي اللي بتكشف «ليه الـ port غلط» و «ليه المتغير فاضي».

**[[docker system df]]** — قبل أي تنضيف. مش معاينة بالمعنى الحرفي، بس بتقولك هتخسر إيه.

**[[docker build]] بـ [[--progress=plain]]** — بتوريك كل خطوة وناتجها بدل الشكل المختصر. مفيدة لما الـ build يفشل ومش فاهم فين.

وفيه حاجة لازم تتقال: **[[docker system prune]] و [[docker volume prune]] مالهمش [[--dry-run]]**. و [[prune]] بتمسح من غير رجعة. فالطريقة الوحيدة الآمنة إنك تبص على [[df]] الأول، وتستخدم الفلاتر ([[--filter "until=24h"]])، ومتستخدمش [[-a]] ولا [[--volumes]] إلا وانت عارف.`,
          example: R`# الملف بعد ما المتغيرات اتفكّت
docker compose config

# هيعمل إيه؟ من غير ما يعمل
docker compose --dry-run up -d

# واتأكد إن مفيش حاجة اتعملت
docker compose ps -a
docker network ls --filter name=dlab

# وقبل أي تنضيف
docker system df`,
          lines: [
            R`بتطبع الملف النهائي: المتغيرات مفكوكة والقيم الافتراضية متحطة.`,
            R`بتطبع كل خطوة كان هيعملها.`,
            R`المفروض فاضي.`,
            R`والشبكة مش موجودة.`,
            R`المساحة اللي هتتحرر، قبل ما تمسح.`,
          ],
          try: R`اعمل ملف [[compose.yaml]] فيه متغير [[$__{PORT:-3000}]]، وشغّل [[docker compose config]] وشوف القيمة اللي اتحطت. وبعدين [[docker compose --dry-run up -d]] وبعدها [[docker compose ps -a]] للتأكد إن مفيش حاجة اتعملت.`,
          mac: ["both", R`[[--dry-run]] و [[config]] شغالين زي ما هم. و [[docker system df]] بتعد مساحة الـ VM على الماك وويندوز (Docker Desktop)، مش مساحة القرص مباشرة.`],
          deep: {
            why: R`[[compose up]] بيوقّف وبيشغّل حاجات بالترتيب. ولو فشل في النص، تبقى في حالة نصها قديم ونصها جديد. والمعاينة بتكشف ده قبل ما يحصل.`,
            how: R`[[--dry-run]] في compose بتعمل كل الحسابات: بتقرا الملف، وبتحل المتغيرات، وبتقارن بالحالة الحالية، وبتحسب اللي محتاج يتعمل — وبعدين بتطبع بدل ما تنفّذ. وعشان كده ناتجها شكله زي الناتج الحقيقي بالظبط.

[[compose config]] بتعمل أربع حاجات:

- بتفك متغيرات البيئة ومن [[.env]].
- بتدمج ملفات الـ override ([[compose.override.yaml]] و [[-f]] المتعددة).
- بتحط القيم الافتراضية.
- وبتتحقق من الشكل: لو فيه مفتاح غلط بتزعق.

و [[docker compose config --services]] بتطلّع أسماء الخدمات بس، و [[--images]] الصور.

**وعن [[prune]]:** الأوامر دي مالهاش [[--dry-run]] لحد النسخة دي. والبدايل:

| بدل | استخدم |
|---|---|
| [[prune]] أعمى | [[docker system df -v]] الأول |
| [[prune -a]] | [[prune --filter "until=24h"]] |
| [[volume prune]] | [[docker volume ls -f dangling=true]] الأول |

و [[docker volume prune]] أخطر واحدة فيهم: الفوليومات فيها بيانات، والبيانات دي مش في أي مكان تاني.

[[--progress=plain]] في [[build]] بتلغي الشكل التفاعلي وبتطبع كل سطر. مفيدة في CI وفي تشخيص فشل البناء.`,
            when: R`أي [[compose up]] على حاجة شغالة. وأي تعديل في ملف compose.`,
            mistakes: R`تشغّل [[prune -a --volumes]] عشان المساحة وتخسر بيانات. أو تنسى [[compose config]] وتفضل تدوّر ليه المتغير فاضي. أو تفتكر إن [[--dry-run]] بتبني الصورة كمان — دي بتعاين التشغيل مش البناء.`
          },
          teach: R`## اللي ليه معاينة، واللي لأ

| الأمر | المعاينة |
|---|---|
| [[docker compose up]] | **[[--dry-run]]** |
| ملف compose | **[[compose config]]** |
| [[docker build]] | [[--progress=plain]] (مش معاينة، بس بتوضّح) |
| [[docker system prune]] | **مفيش** — بص على [[df]] الأول |
| [[docker volume prune]] | **مفيش** — وده أخطرهم |

---

## ١. [[compose config]]: الملف بعد المعالجة

~~~bash Docker Compose v5.3
docker compose config
~~~

~~~text الناتج (اتشغّل فعلًا)
name: dlab
services:
  api:
    build:
      context: C:\Users\...\dlab
      dockerfile: Dockerfile
    environment:
      NODE_ENV: production
      PORT: "3000"
    healthcheck:
      test:
        - CMD
        - node
        - -e
        - fetch('http://127.0.0.1:3000/health')...
      timeout: 3s
      interval: 10s
      retries: 3
~~~

بتعمل أربع حاجات:

- تفك متغيرات البيئة ومن [[.env]].
- تدمج ملفات الـ override.
- تحط القيم الافتراضية.
- وتتحقق من الشكل.

**لاحظ [[PORT: "3000"]]** — اتحوّلت لنص. ودي بالظبط نوع الحاجة اللي بتكتشفها من [[config]] ومش بتكتشفها من قراية الملف.

---

## ٢. [[--dry-run]]: الخطوات من غير تنفيذ

~~~bash
docker compose --dry-run up -d
~~~

~~~text الناتج (اتشغّل فعلًا)
 Network dlab_default Creating
 Network dlab_default Created
 Container dlab-api-1 Creating
 Container dlab-api-1 Created
 Container dlab-api-1 Starting
 Container dlab-api-1 Started
~~~

شكله زي الناتج الحقيقي بالظبط. وبعده:

~~~text اتشغّل فعلًا
$ docker compose ps -a
NAME      IMAGE     COMMAND   SERVICE   CREATED   STATUS    PORTS
(فاضي)

$ docker network ls --filter name=dlab | wc -l
0
~~~

**مفيش ولا حاجة اتعملت.**

> بتعمل كل الحسابات — بتقرا الملف، وبتحل المتغيرات، وبتقارن بالحالة الحالية — وبعدين بتطبع بدل ما تنفّذ.

---

## ٣. وبعدها التشغيل الحقيقي

~~~text اتشغّل فعلًا
$ docker compose up -d
 Container dlab-api-1 Created
 Container dlab-api-1 Starting
 Container dlab-api-1 Started

$ docker compose ps
api  Up 12 seconds (healthy)

$ curl -s http://127.0.0.1:3099/
{"app":"notes-api","notes":0}
~~~

---

## ٤. و [[prune]]: مفيش معاينة

**[[docker system prune]] و [[docker volume prune]] مالهمش [[--dry-run]].** وبيمسحوا من غير رجعة.

| بدل | استخدم |
|---|---|
| [[prune]] أعمى | [[docker system df -v]] الأول |
| [[prune -a]] | [[prune --filter "until=24h"]] |
| [[volume prune]] | [[docker volume ls -f dangling=true]] الأول |

> **[[docker volume prune]] أخطرهم.** الفوليومات فيها بيانات — قواعد بيانات، ورفعات مستخدمين. واللي فيها مش موجود في أي مكان تاني.

---

## ٥. ولما الـ build يفشل

~~~bash
docker build --progress=plain -t app .
~~~

بتلغي الشكل المختصر وبتطبع كل سطر من كل خطوة. مفيدة لما [[RUN]] تفشل ومش شايف ليه.

---

## الخلاصة

- [[compose config]] قبل أي تعديل في الملف.
- [[compose --dry-run]] قبل أي [[up]] على حاجة شغالة.
- [[prune]] مفيهاش معاينة — [[df]] الأول، وفلاتر بدل [[-a]].
- [[volume prune]] أخطر أمر في docker.
- [[--progress=plain]] لتشخيص البناء.`,
          sol: R`[[--dry-run]] وناتجها، والدليل إن مفيش حاجة اتعملت بعدها.`,
          solCode: R`docker compose --dry-run up -d
#  Network dlab_default Creating
#  Network dlab_default Created
#  Container dlab-api-1 Creating
#  Container dlab-api-1 Created
#  Container dlab-api-1 Starting
#  Container dlab-api-1 Started

docker compose ps -a
# NAME      IMAGE     COMMAND   SERVICE   CREATED   STATUS    PORTS
# (فاضي)

docker network ls --filter name=dlab | wc -l
# 0

# (اتشغّل فعلًا على Docker Compose v5.3.0)`
        },

        {
          cmd: "لما الكونتينر يقع",
          title: "الكود واللوج والحالة: تلات أوامر",
          learn: R`تعرف سبب وقوع كونتينر من كود الخروج واللوج وحالة docker.`,
          out: R`تشخّص في ثانية بدل ما تخمّن.`,
          use: {
            prog: R`[[docker run]] بيرجّع كود خروج الكونتينر نفسه. يعني تقدر تحط docker في سلسلة [[&&]] زي أي أمر.`,
            net: R`الكونتينر اللي بيقع ويرجع ([[restart: always]]) بيخفي السبب. واللوج و [[.State]] هما اللي بيقولوا.`,
            cs: R`كود الخروج بيعدّي من البرنامج للكونتينر لـ docker للشيل بتاعك. سلسلة كاملة، وأي حلقة فيها بتخبّيه (زي الأنبوبة).`,
          },
          desc: R`الكونتينر وقع. تلات مصادر بيقولوا ليه:

**كود الخروج.** [[docker run]] بيرجّع **كود خروج البرنامج اللي جوه الكونتينر**. جرّبت برنامج بيخرج بـ ٧، و [[docker run]] رجّعت ٧. يعني تقدر تحط docker في [[&&]] و [[||]] زي أي أمر.

**اللوج.** [[docker logs <اسم>]] بيطلّع اللي البرنامج كتبه على الشاشة. و [[--tail N]] لآخر سطور، و [[-f]] للمتابعة، و [[--since 10m]] لفترة.

**الحالة.** [[docker inspect --format '{{.State.ExitCode}}']] بتدّيك الكود حتى بعد ما تقفل الترمنال. و [[.State.Error]] بتدّيك خطأ **docker نفسه** لو مقدرش يشغّل أصلًا.

والفرق بين الاتنين الأخيرين مهم: [[.State.ExitCode]] معناه «البرنامج اشتغل وخرج بالكود ده». و [[.State.Error]] معناه «docker مقدرش يشغّله أصلًا» — ملف مش موجود، أو صلاحيات، أو صورة مكسورة.

وفيه فخ بيخبّي الكود: **الأنبوبة**. لو كتبت [[docker run ... | tail]]، كود الخروج بيبقى بتاع [[tail]] مش بتاع docker. نفس درس [[pipefail]] في bash بالظبط.`,
          example: R`# كود الخروج بيعدّي من الكونتينر
docker run --rm node:22-slim node -e "process.exit(7)"
echo "الكود: $?"

# والأنبوبة بتخبّيه
docker run --rm node:22-slim node -e "process.exit(7)" | cat
echo "مع أنبوبة: $?"

# إلا بـ pipefail
set -o pipefail
docker run --rm node:22-slim node -e "process.exit(7)" | cat
echo "بـ pipefail: $?"

# وبعد ما الكونتينر يقع
docker inspect boom --format 'الحالة: {{.State.Status}} | الكود: {{.State.ExitCode}}'
docker logs --tail 2 boom`,
          lines: [
            R`برنامج بيخرج بـ ٧.`,
            R`و docker بيرجّعه زي ما هو.`,
            R`نفس الأمر، بس في أنبوبة.`,
            R`والكود بقى بتاع [[cat]].`,
            R`الحل.`,
            R`نفس الأمر.`,
            R`والكود رجع ٧.`,
            R`الحالة والكود، حتى بعد ما الكونتينر يقف.`,
            R`وآخر سطرين من اللوج.`,
          ],
          try: R`شغّل كونتينر بيرمي error، وجرّب الأربع حاجات: كود [[docker run]]، ونفسه في أنبوبة، و [[docker logs]]، و [[inspect --format '{{.State.ExitCode}}']].`,
          mac: ["both", R`كل ده شغال زي ما هو. و [[set -o pipefail]] موجودة في bash و zsh على الماك.`],
          deep: {
            why: R`الكونتينر اللي بيقع من غير ما تعرف ليه بتفضل تشغّله وتشوفه بيقع. والتلات مصادر دي بيدّوا الإجابة في ثانية.`,
            how: R`أكواد الخروج اللي ليها معنى خاص في docker:

| الكود | معناه |
|---|---|
| [[0]] | خلص عادي |
| [[1]]-[[124]] | كود البرنامج نفسه |
| [[125]] | **docker نفسه** فشل (خيار غلط) |
| [[126]] | الأمر موجود بس مش قابل للتنفيذ |
| [[127]] | الأمر مش موجود |
| [[137]] | اتقتل بـ SIGKILL — **غالبًا OOM** |
| [[143]] | اتقتل بـ SIGTERM |

[[137]] هو [[128 + 9]]، و [[143]] هو [[128 + 15]]. والـ [[137]] بالذات معناه في أغلب الحالات إن الكونتينر عدّى حد الذاكرة. وتتأكد بـ [[docker inspect x --format '{{.State.OOMKilled}}']].

[[docker logs]] بيقرا من ملف على القرص (مع الـ driver الافتراضي [[json-file]])، فبيشتغل حتى بعد ما الكونتينر يقف. وبيضيع لما تعمل [[docker rm]].

وخياراته: [[--tail N]] و [[-f]] و [[--since 10m]] و [[--until]] و [[-t]] (يحط وقت لكل سطر).

ولو الكونتينر بيقع ويرجع بسبب [[restart: always]]، [[docker logs]] بيدّيك لوج **التشغيلة الحالية بس**. والحل [[docker events --filter container=x]] أو تشوف [[.State.RestartCount]].

و [[.State.Error]] بتبقى مليانة لما docker نفسه فشل: [[exec format error]] (معمارية غلط) أو [[no such file or directory]] (الـ CMD مش موجود). ودي حالات بتلخبط الناس لأن اللوج بيبقى فاضي.`,
            when: R`أول ما كونتينر يقع. والتلاتة مع بعض، مش واحد منهم.`,
            mistakes: R`تحط [[docker run]] في أنبوبة وتخسر الكود. أو تنسى إن [[137]] معناها OOM وتدوّر في الكود. أو تعمل [[docker rm]] قبل ما تقرا اللوج. أو تقرا اللوج وتنسى [[.State.Error]] لما يبقى فاضي.`
          },
          teach: R`## تلات مصادر، مش واحد

| المصدر | بيقول إيه |
|---|---|
| كود الخروج | البرنامج خرج بكام |
| [[docker logs]] | البرنامج كتب إيه |
| [[.State.Error]] | **docker** فشل في إيه |

---

## ١. الكود بيعدّي من الكونتينر

~~~bash Docker 29.6
docker run --rm node:22-slim node -e "process.exit(7)"
echo "الكود: $?"
~~~

~~~text الناتج (اتشغّل فعلًا)
docker run بيرجّع كود الكونتينر: 7
~~~

يعني تقدر تحط docker في سلسلة زي أي أمر:

~~~bash
docker run --rm app npm test && docker build -t app:prod .
~~~

---

## ٢. والأنبوبة بتخبّيه

~~~text اتشغّل فعلًا
docker run ... | cat        →  0     (الكود بتاع cat)
set -o pipefail             →  7     (الصح)
~~~

نفس درس [[pipefail]] في bash بالظبط. وده بيحصل كتير لأن الناس بتحط [[| tail]] أو [[| grep]] على ناتج docker.

---

## ٣. الأكواد اللي ليها معنى

| الكود | معناه |
|---|---|
| [[125]] | **docker نفسه** فشل (خيار غلط) |
| [[126]] | الأمر مش قابل للتنفيذ |
| [[127]] | الأمر مش موجود |
| [[137]] | SIGKILL — **غالبًا نفدت الذاكرة** |
| [[143]] | SIGTERM (إيقاف عادي) |

[[137]] = [[128 + 9]]، و [[143]] = [[128 + 15]].

~~~bash تتأكد من الـ OOM إزاي
docker inspect x --format '{{.State.OOMKilled}}'
~~~

---

## ٤. اللوج

~~~bash
docker logs --tail 2 boom
~~~

~~~text الناتج (اتشغّل فعلًا)

Node.js v22.23.3
~~~

| الخيار | بيعمل إيه |
|---|---|
| [[--tail N]] | آخر N سطر |
| [[-f]] | يتابع |
| [[--since 10m]] | آخر ١٠ دقايق |
| [[-t]] | يحط وقت لكل سطر |

> اللوج بيتخزّن في ملف على القرص، فبيشتغل بعد ما الكونتينر يقف. **وبيضيع مع [[docker rm]]** — فاقراه قبل ما تمسح.

---

## ٥. والحالة

~~~bash
docker inspect boom --format 'الحالة: {{.State.Status}} | الكود: {{.State.ExitCode}} | الخطأ: [{{.State.Error}}]'
~~~

~~~text الناتج (اتشغّل فعلًا)
الحالة: exited | الكود: 1 | الخطأ: []
~~~

**[[.State.Error]] فاضي** — وده مهم: معناه إن البرنامج **اشتغل** وخرج بكود ١. مش docker اللي فشل.

| | معناه |
|---|---|
| [[ExitCode]] مش صفر و [[Error]] فاضي | البرنامج اشتغل وفشل → **اقرا اللوج** |
| [[Error]] مليان | docker مقدرش يشغّله → **اللوج هيبقى فاضي** |

التانية بتلخبط الناس: بيدوّروا في اللوج وهو فاضي أصلًا. أمثلة: [[exec format error]] (معمارية غلط) و [[no such file or directory]] (الـ CMD مش موجود).

---

## ٦. والكونتينر اللي بيقع ويرجع

مع [[restart: always]]، [[docker logs]] بيدّيك **التشغيلة الحالية بس**.

~~~bash
docker inspect x --format '{{.State.RestartCount}}'
docker events --filter container=x
~~~

---

## الخلاصة

- [[docker run]] بيرجّع كود الكونتينر — استخدمه في [[&&]].
- الأنبوبة بتخبّيه؛ [[set -o pipefail]].
- [[137]] = نفدت الذاكرة، غالبًا.
- اقرا اللوج **قبل** [[docker rm]].
- [[Error]] فاضي = البرنامج فشل؛ [[Error]] مليان = docker فشل واللوج هيبقى فاضي.`,
          sol: R`الكود بيعدّي، والأنبوبة بتخبّيه، و [[pipefail]] بترجّعه — بناتجهم الحقيقي.`,
          solCode: R`docker run --rm node:22-slim node -e "process.exit(7)" >/dev/null 2>&1; echo $?
# 7

docker run --rm node:22-slim node -e "process.exit(7)" 2>/dev/null | cat; echo $?
# 0        <-- الأنبوبة خبّته

bash -c 'set -o pipefail; docker run --rm node:22-slim node -e "process.exit(7)" 2>/dev/null | cat; echo $?'
# 7        <-- رجع

docker inspect boom --format 'الحالة: {{.State.Status}} | الكود: {{.State.ExitCode}} | الخطأ: [{{.State.Error}}]'
# الحالة: exited | الكود: 1 | الخطأ: []

# (اتشغّلوا فعلًا على Docker 29.6.1)`
        }
      ]
    }
]);

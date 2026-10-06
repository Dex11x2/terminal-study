// تكملة تاب gha: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/gha/01.js (شرح حقول الدرس في أوله)
MORE("gha", [
    {
      t: "الديبلوي",
      l: 3,
      n: "من push على main لموقع شغال على السيرفر، بشكل أوتوماتيك وقابل للرجوع",
      items: [
        {
          cmd: "build و push image",
          title: "ghcr.io مع كل push",
          desc: "الـ CI بيبني Docker image ويرفعها على GitHub Container Registry بـ tag هو الـ commit SHA (فريد) وكمان latest. الـ GITHUB_TOKEN كفاية للرفع. والسيرفر بعدين بيعمل pull بس.",
          example: R`name: Build
on:
  push:
    branches: [main]
permissions:
  contents: read
  packages: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - run: echo "IMAGE=ghcr.io/$__{GITHUB_REPOSITORY,,}" >> "$GITHUB_ENV"
      - uses: docker/setup-buildx-action@v4
      - uses: docker/login-action@v4
        with:
          registry: ghcr.io
          username: $__{{ github.actor }}
          password: $__{{ secrets.GITHUB_TOKEN }}
      - uses: docker/build-push-action@v7
        with:
          push: true
          tags: |
            $__{{ env.IMAGE }}:$__{{ github.sha }}
            $__{{ env.IMAGE }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max`,
          try: "بعد أول run، افتح Packages في الـ repo وشوف الـ image بالـ tags. على السيرفر: [[docker pull ghcr.io/user/repo:latest]].",
          flag: "script",
          deep: {
            why: "الـ build على السيرفر بياكل موارده وممكن يفشل على الإنتاج. في CI: بيتبني في مكان معزول، ويترفع كـ image جاهزة، والسيرفر بيعمل pull بس.",
            how: R`[[permissions: packages: write]] عشان GITHUB_TOKEN يقدر يرفع على ghcr.io. والـ login بـ [[github.actor]] (اسم اللي شغّل الـ run) والتوكن.

[[docker/build-push-action]] بيعمل build و push في خطوة واحدة، وبيستخدم BuildKit.

الـ tags: [[github.sha]] الـ commit كامل، فكل build ليه tag فريد للأبد، وده اللي بيخلي rollback ممكن. و [[latest]] للراحة. والاسم من [[github.repository]] فبيبقى [[ghcr.io/user/repo]].

[[cache-from/to: type=gha]]: كاش طبقات Docker في كاش GitHub Actions. من غيره كل build من الصفر (npm ci في الـ image كل مرة). معاه، تعديل في الكود بيعيد آخر طبقات بس. [[mode=max]] بيحفظ كل الطبقات حتى الوسيطة في multi-stage.

الـ image بتظهر في Packages بتاع الـ repo، وبتبقى private افتراضيًا. السيرفر محتاج [[docker login ghcr.io]] بـ token فيه read:packages.

و [[docker/metadata-action]] بيولّد tags و labels أذكى (من tags Git، والـ branch).`,
            when: "أي مشروع بيتعمله deploy بـ Docker.",
            mistakes: "push بـ latest بس فمفيش rollback. واسم الـ repo فيه حروف كبيرة فـ docker يرفض الـ tag (repository name must be lowercase): صغّره بـ [[${GITHUB_REPOSITORY,,}]] أو استخدم docker/metadata-action. ونسيان cache فكل build ٥ دقايق."
          },
          teach: R`## الفكرة: الـ CI بيبني الـ image ويرفعها، والسيرفر بيعمل pull بس

بدل ما السيرفر يبني الـ Docker image بنفسه (وياكل موارده وممكن يفشل على الإنتاج)، الـ workflow بيبنيها على runner، ويرفعها على **ghcr.io** (GitHub Container Registry: مخزن images تبع GitHub). كل image بتاخد اسم (tag) هو رقم الـ commit، فكل نسخة اتبنت محفوظة وتقدر ترجعلها.

---

## ١. الحدث والصلاحيات

~~~text
name: Build
on:
  push:
    branches: [main]
permissions:
  contents: read
  packages: write
~~~

- كل push على main يبني.
- [[packages: write]]: من غيرها [[GITHUB_TOKEN]] مش هيقدر يرفع على ghcr.io. و [[contents: read]] للـ checkout.

---

## ٢. اسم الـ image بحروف صغيرة

~~~text
      - run: echo "IMAGE=ghcr.io/$__{GITHUB_REPOSITORY,,}" >> "$GITHUB_ENV"
~~~

- [[GITHUB_REPOSITORY]] متغير جاهز فيه [[user/repo]].
- [[,,]] في bash: حوّل كل الحروف لـ small. ليه؟ Docker بيرفض أي اسم image فيه حرف كبير، واسم اليوزر أو الـ repo ممكن يبقى فيه.
- [[>> "$GITHUB_ENV"]]: خلّي [[IMAGE]] متغير للـ steps الجاية.

جربناها في Ubuntu 24.04 باسم فيه حروف كبيرة:

~~~bash
GITHUB_REPOSITORY=Ali-Dev/My-App
echo "IMAGE=ghcr.io/$__{GITHUB_REPOSITORY,,}"
~~~

~~~text الناتج
IMAGE=ghcr.io/ali-dev/my-app
~~~

---

## ٣. ٣ actions من Docker

~~~text
      - uses: docker/setup-buildx-action@v4
      - uses: docker/login-action@v4
        with:
          registry: ghcr.io
          username: $__{{ github.actor }}
          password: $__{{ secrets.GITHUB_TOKEN }}
~~~

- [[setup-buildx-action]]: بيجهّز **Buildx** (نسخة متطوّرة من [[docker build]] مبنية على BuildKit). محتاجينها عشان كاش [[type=gha]] تحت.
- [[login-action]]: زي [[docker login]]. [[registry: ghcr.io]] على أنهي مخزن، و [[github.actor]] اسم اللي شغّل الـ run، والباسورد هو [[GITHUB_TOKEN]] نفسه (كفاية لـ ghcr لأن [[packages: write]] موجودة).

---

## ٤. [[build-push-action]]: ابني وارفع

~~~text
      - uses: docker/build-push-action@v7
        with:
          push: true
          tags: |
            $__{{ env.IMAGE }}:$__{{ github.sha }}
            $__{{ env.IMAGE }}:latest
          cache-from: type=gha
          cache-to: type=gha,mode=max
~~~

| الإعداد | معناه |
|---|---|
| [[push: true]] | بعد البناء ارفع. من غيرها بيبني بس |
| [[tags:]] | قايمة أسامي، سطر لكل اسم (نص متعدد السطور زي [[run:]]) |
| [[$__{{ env.IMAGE }}]] | المتغير اللي عملناه فوق (من [[GITHUB_ENV]]) |
| [[:$__{{ github.sha }}]] | رقم الـ commit كامل: اسم فريد للنسخة دي للأبد |
| [[:latest]] | اسم بيتنقل دايمًا لآخر نسخة |
| [[cache-from: type=gha]] | هات طبقات الـ image من كاش GitHub Actions |
| [[cache-to: type=gha,mode=max]] | احفظ الطبقات، و [[mode=max]] كلها حتى الوسيطة (في multi-stage) |

فالـ image الواحدة بتترفع باسمين، زي:

~~~text
ghcr.io/ali-dev/my-app:561defa636917144b95232b736838869ea7acb71
ghcr.io/ali-dev/my-app:latest
~~~

الكاش ليه فايدة كبيرة: الـ Dockerfile بيتبني طبقة طبقة، ولو اتغيّر سطر في الكود بس، الطبقات اللي قبله (زي [[npm ci]]) بتيجي من الكاش.

> الرفع على ghcr.io محتاج GitHub نفسه، فالخطوات دي من الـ docs بتاعة الـ actions، والملف عدّى [[actionlint]].

---

## الخلاصة

| الخطوة | ليه |
|---|---|
| [[permissions: packages: write]] | التوكن يقدر يرفع |
| [[$__{GITHUB_REPOSITORY,,}]] | Docker عايز حروف صغيرة |
| [[setup-buildx]] ثم [[login]] ثم [[build-push]] | جهّز، ادخل، ابني وارفع |
| tag بالـ [[github.sha]] | كل نسخة ليها اسم، فالـ rollback ممكن |
| [[type=gha]] | كاش الطبقات بين الـ runs |`,
          lines: [
            "الاسم.",
            "الأحداث.",
            "push...",
            "...على main.",
            "الصلاحيات.",
            "قراية الكود.",
            "رفع packages.",
            "المهام.",
            "build.",
            "ماكينة.",
            "الخطوات.",
            "الكود.",
            "اسم الصورة بحروف صغيرة (docker بيرفض الكبيرة، والـ repository ممكن يكون فيه حروف كبيرة).",
            "جهّز buildx (لازم عشان كاش type=gha).",
            "سجّل دخول على registry.",
            "إعداداته.",
            "ghcr.io.",
            "اليوزر: اللي شغّل الـ run.",
            "التوكن الجاهز (كفاية لـ ghcr).",
            "ابني وارفع في خطوة.",
            "إعداداته.",
            "ارفع فعلًا.",
            "الأسامي.",
            "tag بالـ commit (فريد للأبد).",
            "و latest.",
            "اقرا كاش الطبقات من GitHub.",
            "واكتبه، بكل الطبقات."
          ],
          sol: R`بعد أول run ناجح، في صفحة الـ repo على اليمين قسم [[Packages]] فيه اسم الـ image. بتفتحه تلاقي tag [[latest]] و tag بالـ sha الكامل للـ commit، ومعاهم أمر [[docker pull ghcr.io/user/repo:latest]].

على السيرفر: لو الـ package عامة الـ pull بينزل على طول. لو private (الافتراضي للـ repo الخاص) هتاخد [[unauthorized]] أو [[denied]]. الحل تعمل login مرة على السيرفر بـ personal access token فيه صلاحية [[read:packages]]: [[echo "$TOKEN" | docker login ghcr.io -u USER --password-stdin]].

أخطاء في الـ workflow نفسه: [[denied: installation not allowed to Create organization package]] أو [[permission_denied: write_package]] يعني [[packages: write]] ناقصة. و [[repository name must be lowercase]] لو اسم اليوزر فيه حروف كبيرة ونسيت [[,,]] في [[$__{GITHUB_REPOSITORY,,}]].`
        },
        {
          cmd: "deploy عبر SSH",
          title: "الـ runner يدخل السيرفر ويحدّث",
          desc: "بعد الـ build، job تاني بيدخل السيرفر بـ SSH بمفتاح خاص محفوظ في secrets، ويعمل pull للـ image الجديدة ويعيد التشغيل. المفتاح ده مخصوص للـ deploy بس، على يوزر deploy، ومش المفتاح الشخصي بتاعك.",
          example: R`  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: webfactory/ssh-agent@v0.10.0
        with:
          ssh-private-key: $__{{ secrets.DEPLOY_SSH_KEY }}
      - run: echo "$__{{ secrets.DEPLOY_KNOWN_HOSTS }}" >> ~/.ssh/known_hosts
      - run: |
          ssh deploy@$__{{ secrets.DEPLOY_HOST }} << 'EOF'
            set -e
            cd /var/www/myapp
            docker compose pull
            docker compose up -d
            docker image prune -f
            sleep 5
            curl -fsS http://127.0.0.1:3000/health
          EOF`,
          try: "اعمل مفتاح جديد [[ssh-keygen -t ed25519 -f deploy_key]]، حط العام في authorized_keys بتاع deploy على السيرفر، والخاص في secret اسمه DEPLOY_SSH_KEY.",
          flag: "script",
          deep: {
            why: "آخر خطوة: السيرفر ياخد الـ image الجديدة ويشغّلها. الـ runner بيدخل السيرفر بـ SSH وينفّذ نفس الأوامر اللي كنت بتكتبها بإيدك.",
            how: R`[[environment: production]] بيربط الـ job بـ environment (للموافقات والـ secrets الخاصة).

[[webfactory/ssh-agent]] بياخد المفتاح الخاص من secret ويحمّله في ssh-agent على الـ runner، فأي ssh بعده بيستخدمه. المفتاح لازم يبقى مخصوص للـ deploy: [[ssh-keygen -t ed25519 -f deploy_key]] من غير passphrase، العام على السيرفر في [[~deploy/.ssh/authorized_keys]]، والخاص كامل (بالسطور BEGIN و END) في secret.

[[ssh-keyscan]] بيضيف بصمة السيرفر لـ known_hosts، وإلا ssh هيفشل على طول بـ Host key verification failed (مفيش terminal يسألك فيه). والأسلم تحط سطر known_hosts نفسه في secret اسمه DEPLOY_KNOWN_HOSTS (جبته من جهازك وقارنت البصمة مرة بإيدك)، لأن ssh-keyscan جوه الـ workflow بيصدّق أي حد يرد. و [[-H]] بيخبّي اسم السيرفر في الملف.

الـ heredoc [['EOF']] بعلامات تنصيص عشان المتغيرات تتفك على السيرفر مش على الـ runner. وجواه: [[set -e]] عشان أي فشل يوقف، و pull و up، و prune، وبعدين health check: لو التطبيق مردّش بـ 200، الـ step تفشل والـ deploy يتعلّم أحمر.

والسيرفر محتاج يقدر يعمل pull من ghcr: [[docker login ghcr.io]] مرة واحدة بـ token قراية.

بديل: [[appleboy/ssh-action]] بيعمل نفس الحاجة بـ inputs بدل الأوامر.`,
            when: "بعد build و push. وعلى main بس بـ if أو environment مقيّد.",
            mistakes: "المفتاح الشخصي بتاعك في secret. ونسيان known_hosts فالـ job يفشل بـ Host key verification failed. وحساب deploy عليه sudo من غير داعي."
          },
          teach: R`## الفكرة: الـ runner يعمل اللي كنت بتعمله بإيدك على السيرفر

كنت بتدخل السيرفر بـ [[ssh]] وتكتب [[docker compose pull]] و [[up -d]]. الـ job ده بيعمل نفس الكلام: معاه مفتاح SSH مخصوص (في secret)، بيدخل بيه، وينفّذ الأوامر، ويتأكد إن التطبيق رد. المثال job واحد بيتحط تحت [[jobs:]] جنب job الـ build.

---

## ١. رأس الـ job

~~~text
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
~~~

- [[needs: build]]: بعد ما الـ image تتبني وتترفع.
- [[environment: production]]: اربط الـ job بـ environment اسمه production (ليه secrets خاصة وممكن موافقة قبل ما يشتغل، درس «environments و approval»).

---

## ٢. المفتاح

~~~text
      - uses: webfactory/ssh-agent@v0.10.0
        with:
          ssh-private-key: $__{{ secrets.DEPLOY_SSH_KEY }}
~~~

[[ssh-agent]] برنامج بيشيل المفاتيح في الذاكرة، وأي [[ssh]] بعده بيستخدمها لوحده. الـ action دي بتشغّله وتحط فيه المفتاح الخاص من الـ secret. (من الـ docs بتاعتها.)

والمفتاح ده بتعمله مرة على جهازك. جربنا في Docker على Ubuntu 24.04:

~~~bash
ssh-keygen -t ed25519 -f deploy_key -N "" -C "github-actions-deploy"
~~~

~~~text الناتج
Generating public/private ed25519 key pair.
Your identification has been saved in deploy_key
Your public key has been saved in deploy_key.pub
~~~

| الجزء | معناه |
|---|---|
| [[-t ed25519]] | نوع المفتاح: حديث وصغير |
| [[-f deploy_key]] | اسم الملف. بيعمل [[deploy_key]] (الخاص) و [[deploy_key.pub]] (العام) |
| [[-N ""]] | من غير passphrase، لأن مفيش حد هيكتبها في CI |
| [[-C "..."]] | تعليق في آخر المفتاح العام، عشان تعرفه على السيرفر |

الخاص بيبدأ بـ [[-----BEGIN OPENSSH PRIVATE KEY-----]] وده اللي في الـ secret. العام بيبدأ بـ [[ssh-ed25519 AAAA...]] وده اللي في [[authorized_keys]] على السيرفر.

---

## ٣. بصمة السيرفر

~~~text
      - run: echo "$__{{ secrets.DEPLOY_KNOWN_HOSTS }}" >> ~/.ssh/known_hosts
~~~

أول مرة [[ssh]] يدخل سيرفر بيسألك «تثق في البصمة دي؟». في CI مفيش حد يجاوب، فبيقفل. جربنا الدخول من غير [[known_hosts]]:

~~~text الناتج
Host key verification failed.
~~~

الحل إن البصمة تبقى جاهزة في [[~/.ssh/known_hosts]] قبل الدخول. جبتها مرة من جهازك بـ [[ssh-keyscan -H SERVER]] واتأكدت منها، وحطيتها secret. و [[-H]] بيكتب اسم السيرفر hashed، فالسطر بيبدأ بـ [[|1|...]] بدل الـ IP.

---

## ٤. الأوامر على السيرفر

~~~text
      - run: |
          ssh deploy@$__{{ secrets.DEPLOY_HOST }} << 'EOF'
            set -e
            cd /var/www/myapp
            docker compose pull
            docker compose up -d
            docker image prune -f
            sleep 5
            curl -fsS http://127.0.0.1:3000/health
          EOF
~~~

### [[ssh deploy@HOST << 'EOF' ... EOF]]

[[<<]] اسمها **heredoc**: السطور اللي بعدها لحد [[EOF]] بتتبعت كـ input للأمر، و [[ssh]] بيشغّلها على السيرفر. والعلامات حوالين [[EOF]] بتفرق جامد. جربناها في bash:

~~~bash
WHERE=runner
bash << 'EOF'
echo "WHERE=[$WHERE]"
EOF
bash << EOF
echo "WHERE=[$WHERE]"
EOF
~~~

~~~text الناتج
WHERE=[]
WHERE=[runner]
~~~

مع [[' ']] النص بيتبعت زي ما هو، والمتغيرات بتتفك **على السيرفر**. من غيرها، bash على الـ runner بيفكّها الأول. والـ deploy عايز الأولى.

### جوه الـ heredoc

| السطر | ليه |
|---|---|
| [[set -e]] | أي أمر يفشل، وقّف (من غيرها السكربت بيكمّل بعد الغلط) |
| [[cd /var/www/myapp]] | فولدر الـ compose على السيرفر |
| [[docker compose pull]] | نزّل الـ images الجديدة |
| [[docker compose up -d]] | شغّل الـ containers اللي الـ image بتاعتها اتغيّرت |
| [[docker image prune -f]] | امسح الـ images القديمة اللي محدش بيستخدمها، و [[-f]] من غير سؤال |
| [[sleep 5]] | استنى التطبيق يقوم |
| [[curl -fsS .../health]] | اسأل التطبيق |

[[curl -fsS]]: [[-f]] افشل لو الرد 400 أو أكتر، و [[-s]] من غير شريط تحميل، و [[-S]] بس اطبع الـ error لو حصل. جربناه:

~~~text الناتج: صفحة مش موجودة
curl: (22) The requested URL returned error: 404
~~~

~~~text الناتج: التطبيق مش شغال
curl: (7) Failed to connect to 127.0.0.1 port 3000 after 0 ms: Couldn't connect to server
~~~

في الحالتين [[curl]] رجع رقم مش صفر، فـ [[set -e]] وقّف، و [[ssh]] رجّع نفس الرقم، والـ step فشلت والـ deploy اتعلّم أحمر. ده المطلوب: تعرف من CI مش من المستخدمين.

> الـ deploy الكامل محتاج سيرفر حقيقي، فمتجرّبش من أوله لآخره هنا. اللي اتجرّب: عمل المفتاح، والدخول بيه، ورسايل الأخطاء، والـ heredoc، و [[curl]].

---

## ٥. الحل: تجهيز المفتاح مرة واحدة

~~~bash
ssh-keygen -t ed25519 -f deploy_key -N "" -C "github-actions-deploy"
ssh-copy-id -i deploy_key.pub deploy@SERVER
ssh -i deploy_key deploy@SERVER 'echo ok'
gh secret set DEPLOY_SSH_KEY < deploy_key
ssh-keyscan -H SERVER | gh secret set DEPLOY_KNOWN_HOSTS
rm deploy_key
~~~

1. [[ssh-keygen]]: المفتاحين (شرحناه فوق).
2. [[ssh-copy-id -i deploy_key.pub deploy@SERVER]]: بيدخل السيرفر (بالباسورد أو بمفتاحك انت) ويضيف المفتاح العام في [[~/.ssh/authorized_keys]] بتاع يوزر [[deploy]] بالصلاحيات الصح.
3. [[ssh -i deploy_key ... 'echo ok']]: جرّب المفتاح الجديد بنفسك قبل CI. [[-i]] أنهي مفتاح، و [[echo ok]] أمر بسيط يتنفّذ على السيرفر.
4. [[gh secret set ... < deploy_key]]: المفتاح الخاص كله يبقى secret.
5. [[ssh-keyscan -H SERVER | gh secret set ...]]: هات بصمة السيرفر وابعتها على طول secret من غير ملف.
6. [[rm deploy_key]]: النسخة الوحيدة اللي محتاجها بقت في GitHub.

جربنا الخطوات ١ و ٢ و ٣ في container فيه سيرفر SSH ويوزر [[deploy]] (المفتاح العام اتحط في [[authorized_keys]] بإيدنا بدل [[ssh-copy-id]]، ونفس النتيجة):

~~~text الناتج
ok
~~~

اتطبعت من غير ما يسأل على باسورد، يعني المفتاح شغال. وجربنا الغلطات المشهورة:

| اللي حصل | الرسالة |
|---|---|
| حطيت الـ .pub مكان الخاص | [[Load key "...": error in libcrypto]] وبعدها [[Permission denied (publickey,password).]] |
| المفتاح اتلزق ناقص | نفس الرسالتين |
| مفيش [[known_hosts]] | [[Host key verification failed.]] |

خطوات [[gh secret set]] بتكتب على GitHub، فمتجرّبتش هنا.

---

## الخلاصة

| الجزء | دوره |
|---|---|
| [[ssh-keygen -t ed25519 -N ""]] | مفتاح مخصوص للـ deploy |
| [[webfactory/ssh-agent]] | المفتاح الخاص من secret للـ ssh |
| [[known_hosts]] من secret | [[ssh]] ميقفش يسأل |
| [[<< 'EOF']] | الأوامر تتنفّذ على السيرفر زي ما هي |
| [[set -e]] و [[curl -f]] | أي فشل يفشّل الـ deploy |`,
          lines: [
            "job الديبلوي.",
            "بعد build.",
            "ماكينة.",
            "مربوط بـ environment (موافقات و secrets خاصة).",
            "الخطوات.",
            "حمّل مفتاح SSH في الـ agent.",
            "إعداداته.",
            "المفتاح الخاص من secret.",
            "بصمة السيرفر من secret (جبتها وتأكدت منها مرة من جهازك).",
            "أوامر متعددة الأسطر.",
            "ادخل السيرفر ونفّذ اللي جوه EOF (بعلامات تنصيص: المتغيرات تتفك على السيرفر).",
            "أي فشل يوقف.",
            "فولدر المشروع.",
            "نزّل الصور الجديدة.",
            "شغّل.",
            "نضّف القديم.",
            "استنى التطبيق يقوم.",
            "health check: لو مش 200 الـ deploy يفشل.",
            "نهاية الأوامر."
          ],
          sol: R`[[ssh-keygen -t ed25519 -f deploy_key -N ""]] بيعمل ملفين: [[deploy_key]] (الخاص) و [[deploy_key.pub]] (العام). العام يتحط سطر في [[/home/deploy/.ssh/authorized_keys]] على السيرفر، والخاص كله (من [[-----BEGIN OPENSSH PRIVATE KEY-----]] لـ [[-----END ...]]) في secret [[DEPLOY_SSH_KEY]]. و [[DEPLOY_KNOWN_HOSTS]] بتاخده من [[ssh-keyscan -H SERVER_IP]].

جرّب المفتاح من جهازك قبل ما تحطه في CI: [[ssh -i deploy_key deploy@SERVER 'echo ok']] لازم يطبع [[ok]] من غير ما يسأل باسورد. ولما الـ workflow يشتغل، آخر حاجة في اللوج هتبقى رد [[curl]] من [[/health]].

أخطاء شائعة: [[Permission denied (publickey)]] يعني حطيت الـ .pub في الـ secret بدل الخاص، أو صلاحيات [[~/.ssh]] على السيرفر مش 700 و authorized_keys مش 600. و [[Host key verification failed]] يعني [[DEPLOY_KNOWN_HOSTS]] فاضي أو لـ IP تاني. و [[Load key ... invalid format]] (أو [[error in libcrypto]] على Ubuntu 24.04) يعني المفتاح اتلزق ناقص أو اللي اتحط هو الـ .pub. وامسح [[deploy_key]] من جهازك بعد ما تحطه في GitHub.`,
          solCode: R`ssh-keygen -t ed25519 -f deploy_key -N "" -C "github-actions-deploy"
ssh-copy-id -i deploy_key.pub deploy@SERVER
ssh -i deploy_key deploy@SERVER 'echo ok'
gh secret set DEPLOY_SSH_KEY < deploy_key
ssh-keyscan -H SERVER | gh secret set DEPLOY_KNOWN_HOSTS
rm deploy_key`
        },
        {
          cmd: "نشر ملفات بـ scp",
          title: "ملفات للتحميل على السيرفر، بالترتيب الصح",
          desc: "مش كل deploy image. أحيانًا الناتج ملف: APK، أو zip تحديث، ومعاه [[latest.json]] بيقول للتطبيق إن فيه نسخة جديدة. الـ runner يرفعهم بـ scp، والترتيب مهم: الملفات الأول، و latest.json آخر حاجة. وفي الآخر curl يتأكد إن رابط التحميل بيرجّع 200.",
          example: R`- name: Upload to server
  env:
    SSH_KEY: $__{{ secrets.DEPLOY_SSH_KEY }}
    KNOWN_HOSTS: $__{{ secrets.DEPLOY_KNOWN_HOSTS }}
  run: |
    install -m 700 -d ~/.ssh
    printf '%s\n' "$SSH_KEY" > ~/.ssh/deploy_key && chmod 600 ~/.ssh/deploy_key
    printf '%s\n' "$KNOWN_HOSTS" >> ~/.ssh/known_hosts
    D=/opt/myapp/downloads
    scp -i ~/.ssh/deploy_key myapp.apk bundle.zip "deploy@203.0.113.10:$D/tmp/"
    ssh -i ~/.ssh/deploy_key deploy@203.0.113.10 "mv $D/tmp/myapp.apk $D/tmp/bundle.zip $D/"
    scp -i ~/.ssh/deploy_key latest.json "deploy@203.0.113.10:$D/"
- name: Check download link
  run: |
    CODE=$(curl -sSL -o /dev/null -w '%{http_code}' https://example.com/downloads/myapp.apk)
    [ "$CODE" = "200" ] || { echo "::error::download returned HTTP $CODE"; exit 1; }`,
          try: "على سيرفر التجربة اعمل فولدر downloads/tmp، وارفع ملف بالطريقة دي، وافتح الرابط من الموبايل وانت بتعمل الرفع التاني وشوف إنه مش بيقطع.",
          flag: "script",
          deep: {
            why: "التطبيق بيسأل latest.json كل شوية: «فيه نسخة جديدة؟». لو latest.json اترفع قبل الـ APK، أي حد يسأل في الثواني دي هيتقاله «نزّل» وينزّل ملف قديم أو نص ملف. والـ build الأخضر مش معناه إن الرابط شغال فعلًا.",
            how: R`المفتاح من secret لملف بصلاحية 600 (ssh بيرفض مفتاح مقروء لغيرك). و known_hosts من secret فيه بصمة السيرفر اللي اتأكدت منها بإيدك مرة.

الرفع على خطوتين: [[scp]] لفولدر [[tmp/]] جنب الفولدر الحقيقي، وبعدين [[mv]] على السيرفر. الـ mv جوه نفس الـ filesystem لحظي (atomic): اللي بينزّل دلوقتي بياخد القديم كامل، واللي بعده بياخد الجديد كامل. أما scp على نفس الاسم مباشرة بيكتب فوق الملف وهو بيتنزّل.

latest.json آخر حاجة: لحد ما يترفع، التطبيق شايف النسخة القديمة وملفاتها لسه موجودة. أول ما يترفع، الملفات الجديدة موجودة بالفعل.

الفحص في الآخر: [[curl -sSL -o /dev/null -w '%{http_code}']] بيطبع الـ status بس بعد ما يتبع أي redirect. لو nginx مش شايف الفولدر (volume مش متركّب مثلًا)، هترجع 404 والـ run يتعلّم أحمر بدل ما تعرف من المستخدمين.`,
            when: "توزيع APK أو برنامج exe من سيرفرك، وتحديثات OTA، وأي ملفات static بيتعملها deploy من CI.",
            mistakes: R`في مشروع حقيقي كان الـ workflow بيعمل [[ssh-keyscan]] وقت التشغيل ويصدّق أي بصمة ترد (لو حد في النص، الـ runner هيبعتله الملفات). خزّن known_hosts في secret. وكان بيختار الـ APK بـ [[find ... | head -1]]، ولو فيه debug و release الاتنين ممكن ياخد الغلط: حدد المسار بالظبط. وكان بيرفع الـ APK على نفس الاسم مباشرة، فحد بينزّل وقت الرفع خد ملف بايظ. ولما فولدر downloads اتضاف لـ compose بعد ما الـ container شغال، nginx مشافهوش لحد [[docker compose up -d --force-recreate]]، والفحص بالـ 200 هو اللي بيمسك ده.`
          },
          teach: R`## الفكرة: ارفع لفولدر جنبه، وبعدين انقل مرة واحدة

الناتج هنا ملفات (APK و zip) مش image. والمشكلة إن ناس بتنزّل من الرابط **وانت بترفع**. فبنرفع لفولدر [[tmp/]]، وبعدين [[mv]] بينقلهم في لحظة، وآخر حاجة [[latest.json]] اللي بيقول للتطبيق «فيه جديد». وفي الآخر نتأكد إن الرابط شغال فعلًا.

الـ step دي كلها اتجرّبت هنا: في container واحد Ubuntu 24.04 فيه سيرفر SSH ويوزر [[deploy]]، ويوزر تاني [[runner]] بيلعب دور الـ runner، و [[127.0.0.1]] مكان [[203.0.113.10]] (و [[203.0.113.10]] أصلًا IP محجوز للأمثلة في الشرح).

---

## ١. المفتاح والبصمة من الـ secrets

~~~text
  env:
    SSH_KEY: $__{{ secrets.DEPLOY_SSH_KEY }}
    KNOWN_HOSTS: $__{{ secrets.DEPLOY_KNOWN_HOSTS }}
  run: |
    install -m 700 -d ~/.ssh
    printf '%s\n' "$SSH_KEY" > ~/.ssh/deploy_key && chmod 600 ~/.ssh/deploy_key
    printf '%s\n' "$KNOWN_HOSTS" >> ~/.ssh/known_hosts
~~~

- [[install -m 700 -d ~/.ssh]]: اعمل الفولدر ([[-d]]) بصلاحية [[700]] (انت بس تقرا وتكتب وتدخل) في أمر واحد.
- [[printf '%s\n' "$SSH_KEY"]]: اطبع المتغير زي ما هو وبعده سطر جديد. أأمن من [[echo]] مع النصوص اللي فيها [[-]] أو [[\]]، والمفتاح لازم يخلص بسطر جديد.
- [[chmod 600]]: الملف تقراه وتكتبه انت بس.

ليه الصلاحيات؟ [[ssh]] بيرفض مفتاح غيرك يقدر يقراه. جربنا نفس المفتاح بصلاحية [[644]]:

~~~text الناتج
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@         WARNING: UNPROTECTED PRIVATE KEY FILE!          @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
~~~

ومع [[600]]: [[ls -ld]] طلّع [[drwx------ /home/runner/.ssh]] و [[-rw------- /home/runner/.ssh/deploy_key]].

---

## ٢. الرفع على ٣ خطوات

~~~text
    D=/opt/myapp/downloads
    scp -i ~/.ssh/deploy_key myapp.apk bundle.zip "deploy@203.0.113.10:$D/tmp/"
    ssh -i ~/.ssh/deploy_key deploy@203.0.113.10 "mv $D/tmp/myapp.apk $D/tmp/bundle.zip $D/"
    scp -i ~/.ssh/deploy_key latest.json "deploy@203.0.113.10:$D/"
~~~

- [[D=...]]: متغير للمسار عشان ميتكتبش ٥ مرات.
- [[scp]] (secure copy): نسخ ملفات بـ SSH. الشكل [[scp ملفات يوزر@سيرفر:مسار]]. و [[-i]] أنهي مفتاح.
- [[ssh ... "mv ..."]]: نفّذ [[mv]] على السيرفر. العلامات [[" "]] هنا بتخلي [[$D]] يتفك على الـ runner قبل ما الأمر يتبعت، وده مقصود لأن [[D]] متعرّف على الـ runner.
- [[latest.json]] آخر حاجة، مباشرة في مكانه.

بعد التشغيل، [[ls -l]] على السيرفر:

~~~text الناتج
-rw-rw-r-- bundle.zip
-rw-rw-r-- latest.json
-rw-rw-r-- myapp.apk
drwxrwxr-x tmp
~~~

### ليه [[mv]] لحظي؟

[[mv]] جوه نفس الـ filesystem مش بينسخ بايتات، بيغيّر الاسم بس يشاور على الملف الجديد في خطوة واحدة. اللي كان بينزّل الملف القديم بيكمّل عليه للآخر (لينكس بيسيبه لحد ما يتقفل)، واللي يبدأ بعدها ياخد الجديد كامل. عشان كده [[tmp/]] **جوه** فولدر الـ downloads، مش في [[/tmp]] على ديسك تاني (هناك [[mv]] بيبقى نسخ ومسح).

---

## ٣. الفحص: الرابط بيرجّع 200؟

~~~text
- name: Check download link
  run: |
    CODE=$(curl -sSL -o /dev/null -w '%{http_code}' https://example.com/downloads/myapp.apk)
    [ "$CODE" = "200" ] || { echo "::error::download returned HTTP $CODE"; exit 1; }
~~~

| الجزء | معناه |
|---|---|
| [[-s]] و [[-S]] | من غير شريط تحميل، بس اطبع الـ error |
| [[-L]] | لو فيه redirect، اتبعه |
| [[-o /dev/null]] | ارمي الملف نفسه، مش محتاجينه |
| [[-w '%{http_code}']] | اطبع رقم الحالة بس |
| [[CODE=$( )]] | خزّن الرقم في متغير |
| السطر التاني | [[[ "$CODE" = "200" ]]] اختبار، ولو طلع غلط يتنفّذ اللي جوه [[{ ...; }]] |

جربنا على [[example.com]] الحقيقي: مرة الصفحة الرئيسية، ومرة رابط الـ APK (مش موجود هناك)، وبعدها سطر الفحص:

~~~text الناتج
200
404
::error::download returned HTTP 404
~~~

ولو السيرفر مش موجود خالص، [[curl]] بيطبع [[000]] (مفيش رد أصلًا).

---

## الخلاصة

| الخطوة | ليه |
|---|---|
| [[install -m 700]] و [[chmod 600]] | ssh بيرفض مفتاح مكشوف |
| [[scp]] لـ [[tmp/]] ثم [[mv]] | محدش ينزّل نص ملف |
| [[latest.json]] آخر حاجة | التطبيق ميشاورش على ملف لسه مترفعش |
| [[curl -w '%{http_code}']] | الـ build الأخضر = رابط شغال فعلًا |`,
          lines: [
            "step الرفع.",
            "متغيراتها.",
            "مفتاح الـ deploy من secret.",
            "بصمة السيرفر من secret.",
            "أوامر.",
            "فولدر ssh بالصلاحية الصح.",
            "اكتب المفتاح لملف واقفله عليك.",
            "ضيف بصمة السيرفر.",
            "مسار التحميلات على السيرفر.",
            "ارفع الملفات لفولدر مؤقت الأول.",
            "انقلهم لمكانهم مرة واحدة (لحظي).",
            "وآخر حاجة latest.json.",
            "step الفحص.",
            "أوامر.",
            "اطلب رابط التحميل واطبع الـ status بس.",
            "لو مش 200، رسالة حمرا وافشل."
          ],
          sol: R`التحميل اللي شغال على الموبايل بيكمّل للآخر حتى لو الرفع التاني خلص في نصه، والملف اللي نزل سليم (النسخة القديمة كاملة). وأي تحميل يبدأ بعد الـ [[mv]] بياخد النسخة الجديدة.

السبب إن [[mv]] جوه نفس الـ filesystem مجرد rename، بيغيّر الاسم يشاور على الملف الجديد مرة واحدة. والتحميل القديم فاتح الملف القديم، ولينكس بيسيبه موجود لحد ما آخر حد يقفله. لو كنت عملت [[scp]] مباشرة فوق الملف، المستخدم كان ممكن ياخد ملف نصه قديم ونصه جديد، أو ملف ناقص.

عشان كده الشرط إن [[tmp/]] يكون جوه نفس الفولدر (نفس الـ filesystem). لو [[tmp]] في [[/tmp]] على partition تانية، الـ [[mv]] بيبقى copy و delete ومش ذري. وآخر step ([[Check download link]]) لازم تطبع 200؛ لو طلّعت [[404]] اتأكد إن Nginx بيخدم الفولدر ده وإن الصلاحيات تسمح له يقرا.`
        },
        {
          cmd: "environments و approval",
          title: "الإنتاج محتاج موافقة",
          desc: "Environment في GitHub (Settings ثم Environments) ليه secrets خاصة به، وممكن يطلب موافقة شخص قبل ما الـ job يشتغل، ويحدد branches معينة. فالـ deploy لـ staging أوتوماتيك، وللإنتاج بيستنى ضغطة Approve.",
          example: R`  deploy-staging:
    needs: build
    environment: staging
    runs-on: ubuntu-latest
    steps:
      - run: echo "deploy to $__{{ vars.DEPLOY_HOST }}"
  deploy-prod:
    needs: deploy-staging
    environment:
      name: production
      url: https://example.com
    runs-on: ubuntu-latest
    steps:
      - run: echo "deploy to $__{{ vars.DEPLOY_HOST }}"`,
          try: "اعمل environment اسمه production بـ required reviewer هو انت. الـ run هيقف مستني موافقتك قبل deploy-prod.",
          flag: "script",
          deep: {
            why: "الـ deploy لـ staging مع كل push كويس. للإنتاج، عايز حد يبص قبل ما يحصل، أو على الأقل تكون انت اللي ضغطت.",
            how: R`Environment كائن في GitHub (Settings ثم Environments) ليه: secrets و variables خاصة به (نفس الاسم DEPLOY_HOST بقيمة مختلفة في staging والإنتاج)، وقواعد حماية: [[Required reviewers]] لازم شخص يوافق، و [[Wait timer]] انتظار دقايق، و [[Deployment branches]] من main بس.

الـ job بـ [[environment: production]] بيقف مستني الموافقة (إيميل وإشعار لليوزرز المحددين)، وبعد Approve بيكمّل. ولو رفض، بيتلغي.

[[url]] بيظهر كلينك في صفحة الـ run وفي تاب Deployments، فبتشوف إيه آخر نسخة على كل بيئة ومين عملها إمتى.

[[vars.DEPLOY_HOST]] بتاخد قيمة الـ environment الحالي لوحدها.

الترتيب في المثال: staging أوتوماتيك، وبعده production بـ needs، فالإنتاج مش بيبدأ غير بعد staging ينجح، وبعدين الموافقة.

الموافقات (Required reviewers و Wait timer) متاحة في الـ repos العامة مجانًا. في الـ repos الخاصة محتاجة GitHub Enterprise، و Pro أو Team بيدّوك environments و secrets و deployment branches بس.`,
            when: "أي مشروع له إنتاج حقيقي وعميل.",
            mistakes: "نفس الـ secrets على مستوى الـ repo للبيئتين، فتعمل deploy لـ staging على سيرفر الإنتاج بالغلط."
          },
          teach: R`## الفكرة: نفس الـ job، بس كل بيئة ليها إعداداتها وقواعدها

**Environment** في GitHub (Settings ثم Environments) مكان باسم، زي [[staging]] و [[production]]، وكل واحد ليه:
- secrets و variables خاصة بيه (نفس الاسم، قيمة مختلفة).
- قواعد حماية: شخص لازم يوافق، أو مدة انتظار، أو branches معينة بس.

والـ job بيقول «أنا تبع البيئة دي» بسطر واحد: [[environment:]].

---

## ١. staging: أوتوماتيك

~~~text
  deploy-staging:
    needs: build
    environment: staging
    runs-on: ubuntu-latest
    steps:
      - run: echo "deploy to $__{{ vars.DEPLOY_HOST }}"
~~~

- [[environment: staging]]: الـ job ده بياخد secrets و variables بيئة staging، ويمشي على قواعدها (هنا مفيش قواعد، فبيشتغل على طول).
- [[vars.DEPLOY_HOST]]: **variable** (قيمة مش سرية، بتتكتب في Settings) اسمها [[DEPLOY_HOST]]. لو البيئة فيها واحدة بالاسم ده بتكسب على اللي على مستوى الـ repo.

---

## ٢. production: بموافقة

~~~text
  deploy-prod:
    needs: deploy-staging
    environment:
      name: production
      url: https://example.com
    runs-on: ubuntu-latest
    steps:
      - run: echo "deploy to $__{{ vars.DEPLOY_HOST }}"
~~~

- [[needs: deploy-staging]]: الإنتاج مبيبدأش غير بعد ما staging ينجح.
- [[environment:]] هنا مكتوبة بالشكل الطويل: [[name]] اسم البيئة، و [[url]] رابط بيظهر جنب الـ job في صفحة الـ run وفي صفحة Deployments.
- نفس السطر [[vars.DEPLOY_HOST]] بالظبط، بس هياخد قيمة بيئة production.

---

## ٣. شكله وهو شغال

اتشغّل هنا بـ [[act]]، و act مبيعرفش environments: بيدّي كل الـ jobs نفس الـ variables، ومبيستناش موافقة. فاديناه [[--var DEPLOY_HOST=staging.example.com]]:

~~~text الناتج
[wf.yml/build]   | built
[wf.yml/deploy-staging]   | deploy to staging.example.com
[wf.yml/deploy-staging] 🏁  Job succeeded
[wf.yml/deploy-prod   ]   | deploy to staging.example.com
[wf.yml/deploy-prod   ] 🏁  Job succeeded
~~~

اللي يتشاف هنا: الترتيب ([[build]] ثم staging ثم prod بسبب [[needs]])، و [[vars.DEPLOY_HOST]] بيتقري. وطبع نفس القيمة مرتين لأن act مفيهوش بيئات.

وعلى GitHub نفسه (من الـ docs)، لو عملت في كل بيئة variable اسمها [[DEPLOY_HOST]] وحطيت على production قاعدة **Required reviewers**:

| الـ job | اللي بيحصل |
|---|---|
| [[deploy-staging]] | بيطبع قيمة staging ويخلص |
| [[deploy-prod]] | بيقف بحالة **Waiting**، وفيه زرار Review deployments |
| بعد Approve and deploy | بيكمّل ويطبع قيمة production، ورابط [[https://example.com]] بيظهر جنبه |
| لو محدش وافق ٣٠ يوم | بيفشل لوحده |

---

## الخلاصة

| السطر | معناه |
|---|---|
| [[environment: اسم]] | الـ job تبع البيئة دي: secrets و vars وقواعد |
| [[environment: { name, url }]] | نفس الكلام ومعاه رابط يظهر في الصفحة |
| [[vars.NAME]] | قيمة مش سرية، والبيئة بتكسب على الـ repo |
| [[needs]] بين البيئات | الإنتاج بعد ما staging ينجح |

> الموافقات على repo خاص مش متاحة في كل الخطط (التفاصيل في «بيحصل إيه من جوه؟»).`,
          lines: [
            "deploy لـ staging.",
            "بعد build.",
            "environment اسمه staging.",
            "ماكينة.",
            "الخطوات.",
            "variable من الـ environment ده.",
            "deploy للإنتاج.",
            "بعد staging ينجح.",
            "environment...",
            "...اسمه production (بيستنى الموافقة لو مضبوطة).",
            "الـ URL يظهر في Deployments.",
            "ماكينة.",
            "الخطوات.",
            "نفس الـ variable بقيمة الإنتاج."
          ],
          sol: R`الـ run بيعدّي build و deploy-staging، وبعدين بيقف: الـ job [[deploy-prod]] بيبان بساعة وحالة [[Waiting]]، وفوق شريط أصفر مكتوب فيه إن الـ deployment مستني review وزرار [[Review deployments]]. بتدوس عليه، تعلّم على production، تكتب تعليق لو عايز، وتدوس [[Approve and deploy]]. ساعتها الـ job يكمّل، ويظهر رابط [[https://example.com]] جنب الـ job، وفي صفحة الـ repo قسم Deployments بيسجّل مين وافق وامتى.

[[vars.DEPLOY_HOST]] بتاخد القيمة من الـ environment نفسه، فلو عملت variable بنفس الاسم في staging و production هتلاقي كل job طبع قيمة مختلفة. ولو طبع [[deploy to ]] فاضي يبقى الـ variable مش متعرف في الـ environment ده.

لو الـ run ما وقفش: اسم الـ environment في الـ workflow لازم يطابق اللي في Settings. وخلي بالك إن الـ required reviewers على repo خاص مش متاحة في كل الخطط؛ لو الخيار مش ظاهر عندك، جرّب على repo public. وبعد ٣٠ يوم من غير موافقة الـ job بيفشل لوحده.`
        },
        {
          cmd: "deploy على tag",
          title: "إصدارات بأرقام",
          desc: "بدل كل push، الإنتاج بيتعمل لما تعمل tag زي v1.2.0. الـ image بتاخد نفس الرقم، والـ rollback إنك تعمل deploy للـ tag اللي قبله. و GitHub Release بيتعمل لوحده بالتغييرات.",
          example: R`on:
  push:
    tags: ['v*']
jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      packages: write
    steps:
      - uses: actions/checkout@v7
      - run: echo "VERSION=$__{GITHUB_REF_NAME}" >> "$GITHUB_ENV"
      - run: IMAGE=ghcr.io/$__{GITHUB_REPOSITORY,,}:$VERSION && echo "$__{{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u $__{{ github.actor }} --password-stdin && docker build -t "$IMAGE" . && docker push "$IMAGE"
      - uses: softprops/action-gh-release@v3
        with:
          generate_release_notes: true`,
          try: "[[git tag v1.0.0 && git push --tags]] وشوف الـ workflow بيشتغل والـ Release بيتعمل.",
          flag: "script",
          deep: {
            why: "deploy مع كل push على main معناه كل commit إنتاج. بالـ tags، بتقرر انت إمتى، والنسخة ليها رقم تقوله للعميل وترجعله.",
            how: R`[[on: push: tags: ['v*'] ]]: الـ workflow بيشتغل بس لما tag يبدأ بـ v يتعمله push. [[git tag v1.2.0 && git push --tags]].

[[GITHUB_REF_NAME]] فيه اسم الـ tag. الـ [[>> $GITHUB_ENV]] بيعمل متغير بيئة متاح لكل الـ steps اللي بعدها (الشكل الحديث بدل [[::set-env]] القديم، والـ outputs بقت [[$GITHUB_OUTPUT]] بدل set-output).

الـ image بتاخد رقم النسخة كـ tag: [[ghcr.io/user/repo:v1.2.0]].

[[softprops/action-gh-release]] بيعمل GitHub Release للـ tag ده، و [[generate_release_notes]] بيكتب التغييرات من عناوين الـ PRs اللي اتدمجت من آخر tag. تقدر تضيف [[files:]] ترفق ملفات.

[[permissions: contents: write]] لازمة عشان يعمل Release.

الترقيم semver: v1.2.3، patch لإصلاح، minor لميزة، major لتغيير كاسر. و [[npm version minor]] بيعمل الـ tag والـ commit لوحده.

وممكن تجمع الاتنين: CI على كل push، و deploy لـ staging على main، وللإنتاج على tags.`,
            when: "لما المشروع يبقى له عملاء ونسخ.",
            mistakes: "tag على commit مش على main. و tags مش بتترفع مع push العادي، لازم [[--tags]] أو [[push origin v1.2.0]]. وفي مشروع حقيقي كان الـ Release بيتنشر على tag ثابت اسمه [[app-latest]] بيتحرّك مع كل build، فكل نسخة بتمسح اللي قبلها ومفيش تاريخ ترجعله. الـ tag الثابت ينفع كلينك «آخر نسخة»، بس انشر كمان كل نسخة على tag برقمها."
          },
          teach: R`## الفكرة: الإنتاج بيتحرك لما انت تقول، والنسخة ليها رقم

بدل ما كل push على main يروح الإنتاج، بتعمل **tag** (اسم ثابت على commit معين) زي [[v1.2.0]]. الـ workflow ده بيشتغل على الـ tags بس، وبيبني image بنفس الرقم، ويعمل صفحة Release على GitHub.

---

## ١. الحدث: tags بس

~~~text
on:
  push:
    tags: ['v*']
~~~

[[tags:]] تحت [[push]] بدل [[branches]]: اشتغل لما tag يتعمله push، و [[v*]] يعني اسمه بيبدأ بـ v (و [[*]] أي حاجة بعدها). فـ [[v1.2.0]] تشغّله، و [[1.2.0]] لأ. والعلامات [[' ']] لازمة عشان [[*]].

وانت بتعمل الـ tag من جهازك:

~~~bash
git tag v1.2.0
git push --tags
~~~

([[git push]] العادي مبيرفعش الـ tags، محتاج [[--tags]].)

---

## ٢. الصلاحيات على الـ job

~~~text
jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      packages: write
~~~

[[permissions]] ممكن تتكتب على job بدل الملف كله. [[contents: write]] عشان يعمل Release، و [[packages: write]] عشان يرفع الـ image.

---

## ٣. رقم النسخة من اسم الـ tag

~~~text
      - run: echo "VERSION=$__{GITHUB_REF_NAME}" >> "$GITHUB_ENV"
~~~

[[GITHUB_REF_NAME]] متغير جاهز: في push على branch بيبقى اسمها، وفي push على tag بيبقى اسم الـ tag. اتشغّل بـ [[act]] كأنه push لـ tag [[v1.2.0]]، وزوّدنا سطر بيطبع:

~~~text الناتج
| ghcr.io/nektos/act:v1.2.0 ref=refs/tags/v1.2.0 type=tag
~~~

- [[VERSION]] بقى [[v1.2.0]].
- [[GITHUB_REF]] الشكل الكامل [[refs/tags/v1.2.0]]، و [[GITHUB_REF_TYPE]] = [[tag]].
- [[nektos/act]] ده اسم الـ repo اللي act بيحطه لما ميلاقيش remote. على GitHub هيبقى [[user/repo]] بتاعك.

---

## ٤. السطر الطويل: login و build و push

~~~text
      - run: IMAGE=ghcr.io/$__{GITHUB_REPOSITORY,,}:$VERSION && echo "$__{{ secrets.GITHUB_TOKEN }}" | docker login ghcr.io -u $__{{ github.actor }} --password-stdin && docker build -t "$IMAGE" . && docker push "$IMAGE"
~~~

٤ أوامر مربوطة بـ [[&&]] (كل واحد بيشتغل بس لو اللي قبله نجح). بالترتيب:

### الخطوة ١: [[IMAGE=ghcr.io/$__{GITHUB_REPOSITORY,,}:$VERSION]]

اسم الـ image: [[,,]] بتصغّر الحروف (Docker بيرفض الكبيرة)، وبعد [[:]] رقم النسخة. فيطلع زي [[ghcr.io/ali-dev/my-app:v1.2.0]].

### الخطوة ٢: [[echo "TOKEN" | docker login ghcr.io -u USER --password-stdin]]

[[--password-stdin]]: خد الباسورد من الـ pipe مش من الأمر نفسه، عشان ميظهرش في قايمة العمليات. والباسورد هنا [[GITHUB_TOKEN]].

### الخطوة ٣: [[docker build -t "$IMAGE" .]]

ابني من [[Dockerfile]] اللي في الفولدر الحالي ([[.]])، و [[-t]] اديها الاسم ده. العلامات حوالين [[$IMAGE]] اتضافت في المثال بعد ما [[actionlint]] (عن طريق shellcheck) نبّه إن المتغير من غيرها ممكن يتقسم.

### الخطوة ٤: [[docker push "$IMAGE"]]

ارفعها على ghcr.io.

---

## ٥. GitHub Release

~~~text
      - uses: softprops/action-gh-release@v3
        with:
          generate_release_notes: true
~~~

action بتعمل صفحة Release للـ tag ده في الـ repo. [[generate_release_notes: true]]: GitHub يكتب التغييرات لوحده من الـ PRs اللي اتدمجت من آخر tag. (الرفع والـ Release محتاجين GitHub نفسه، فمن الـ docs.)

---

## الخلاصة

| الجزء | معناه |
|---|---|
| [[on: push: tags: ['v*']]] | اشتغل على tags بتبدأ بـ v بس |
| [[GITHUB_REF_NAME]] | اسم الـ tag، بيبقى رقم النسخة |
| [[docker login --password-stdin]] | دخول من غير ما الباسورد يظهر |
| [[build -t "$IMAGE"]] و [[push]] | image بنفس رقم النسخة |
| [[action-gh-release]] | صفحة Release بالتغييرات |
| [[contents: write]] | لازم للـ Release |`,
          lines: [
            "الأحداث.",
            "push...",
            "...لـ tags بتبدأ بـ v.",
            "المهام.",
            "release.",
            "ماكينة.",
            "صلاحيات.",
            "كتابة (لعمل Release).",
            "رفع packages.",
            "الخطوات.",
            "الكود.",
            "متغير VERSION من اسم الـ tag، متاح للـ steps الجاية.",
            "سجّل دخول ghcr، وابني الصورة برقم النسخة (بحروف صغيرة)، وارفعها.",
            "اعمل GitHub Release.",
            "إعداداته.",
            "اكتب التغييرات من الـ PRs لوحده."
          ],
          sol: R`بعد [[git tag v1.0.0 && git push --tags]]، تاب Actions فيه run والـ branch مكتوب مكانها [[v1.0.0]]. لما يخلص: صفحة Releases فيها [[v1.0.0]] بـ release notes متولدة من الـ PRs والـ commits من آخر tag، و Packages فيه الـ image بتاج [[v1.0.0]].

أخطاء شائعة: الـ workflow ما اشتغلش خالص لأن الـ tag اسمه [[1.0.0]] من غير [[v]] والفلتر [[v*]]، أو الملف مش موجود في الـ commit اللي عليه الـ tag. و [[Resource not accessible by integration]] من الـ release action يعني ناقص [[contents: write]]. و [[docker build]] يفشل بـ [[failed to read dockerfile]] لو مفيش Dockerfile في الـ root.

ولو عايز تمسح الـ tag وتعيده: [[git tag -d v1.0.0 && git push origin :refs/tags/v1.0.0]]، وامسح الـ Release من الواجهة. بس الأحسن تعمل [[v1.0.1]] بدل ما تعيد كتابة tag حد ممكن يكون نزّله.`
        },
        {
          cmd: "rollback من Actions",
          title: "ارجع لنسخة بضغطة",
          desc: R`لما نسخة جديدة تبوّظ الموقع، عايز ترجع للي قبلها في دقيقة من غير ما تفتح ترمنال. الـ workflow ده بيشتغل بإيدك من زرار Run workflow ([[workflow_dispatch]])، وبيطلب منك [[tag]]: رقم النسخة (زي [[v1.1.0]] أو commit sha) اللي عايز ترجعلها، و [[required: true]] يعني مش هيشتغل من غيره.

الـ job بيحمّل مفتاح SSH من الـ secrets بـ [[webfactory/ssh-agent]]، ويضيف بصمة السيرفر لـ [[known_hosts]] عشان SSH يثق فيه، وبعدين يدخل السيرفر وينفّذ [[docker compose up -d --no-build]] مع [[IMAGE_TAG]] بالنسخة اللي اخترتها. [[--no-build]] عشان يستخدم الصورة الجاهزة من الـ registry ومايبنيش. و [[environment: production]] بيطبّق قواعد الحماية بتاعة بيئة الإنتاج (زي موافقة حد قبل التشغيل).

شرطه إن compose على السيرفر يكون مكتوب فيه [[image: ...:$__{IMAGE_TAG:-latest}]]. والـ rollback بيرجّع الكود بس: لو آخر deploy غيّر في قاعدة البيانات بشكل كاسر، الكود القديم ممكن ميشتغلش.`,
          example: R`name: Rollback
on:
  workflow_dispatch:
    inputs:
      tag:
        description: 'Image tag to deploy (e.g. v1.1.0 or a commit sha)'
        required: true
jobs:
  rollback:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: webfactory/ssh-agent@v0.10.0
        with:
          ssh-private-key: $__{{ secrets.DEPLOY_SSH_KEY }}
      - run: echo "$__{{ secrets.DEPLOY_KNOWN_HOSTS }}" >> ~/.ssh/known_hosts
      - run: |
          ssh deploy@$__{{ secrets.DEPLOY_HOST }} "cd /var/www/myapp && IMAGE_TAG=$__{{ inputs.tag }} docker compose up -d --no-build"`,
          try: "في compose على السيرفر خلّي الصورة [[image: ghcr.io/user/repo:${IMAGE_TAG:-latest}]]. جرّب rollback لنسخة قديمة على staging.",
          flag: "script",
          deep: {
            why: "الإنتاج وقع بعد deploy الساعة ١١ بالليل وانت بره. من الموبايل، تفتح GitHub، Actions، Rollback، تكتب النسخة، Run. دقيقة.",
            how: R`[[workflow_dispatch]] بـ input اسمه tag: بيظهر كحقل نص في زرار Run workflow. [[required: true]] مش هيشتغل من غيره.

الـ job بيعمل نفس اللي في deploy: يحمّل المفتاح، ويضيف known_hosts، ويدخل السيرفر.

الحيلة في compose على السيرفر: [[image: ghcr.io/user/repo:$__{IMAGE_TAG:-latest}]]. الشكل ده بيقرا متغير بيئة IMAGE_TAG، ولو مش موجود latest. الأمر بيمرر [[IMAGE_TAG=v1.1.0]] قبل docker compose، فـ compose بيشغّل النسخة دي. و [[--no-build]] عشان ميحاولش يبني.

[[inputs.tag]] بيوصل قيمة الحقل. وعشان ده بيدخل في أمر شيل، الأصح تحطه في env وتستخدمه كمتغير بدل ما تلزقه مباشرة (حماية من injection).

الـ rollback بيرجّع الكود بس. لو الـ deploy الأخير عمل migration كاسرة، الكود القديم مش هيشتغل، وده سبب قاعدة الخطوتين في PostgreSQL.

وممكن نفس الـ workflow يبقى deploy عادي: input بـ default هو الـ sha الحالي.`,
            when: "موجود في كل مشروع قبل أول deploy إنتاج. ومتجرّب على staging.",
            mistakes: "rollback عمرك ما جرّبته. وتكتشف إن compose على السيرفر بـ tag ثابت مش متغير."
          },
          teach: R`## الفكرة: زرار بيقول للسيرفر «شغّل النسخة دي»

النسخة الجديدة بوّظت الموقع. الـ workflow ده بيشتغل بإيدك من Run workflow، بيسألك على رقم نسخة قديمة، ويدخل السيرفر يشغّلها. الحيلة كلها في سطر واحد في ملف compose على السيرفر.

---

## ١. الحقل اللي بيتسأل

~~~text
name: Rollback
on:
  workflow_dispatch:
    inputs:
      tag:
        description: 'Image tag to deploy (e.g. v1.1.0 or a commit sha)'
        required: true
~~~

- [[workflow_dispatch]] من غير أي حدث تاني: الـ workflow ده مبيشتغلش لوحده خالص.
- [[inputs: tag:]] حقل اسمه [[tag]]. من غير [[type]] بيبقى نص.
- [[description]] الكلام اللي بيظهر جنب الحقل.
- [[required: true]]: زرار التشغيل مش هيقبل الحقل فاضي.

ومن الترمنال نفس الكلام: [[gh workflow run rollback.yml -f tag=v1.1.0]].

---

## ٢. الـ job

~~~text
jobs:
  rollback:
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: webfactory/ssh-agent@v0.10.0
        with:
          ssh-private-key: $__{{ secrets.DEPLOY_SSH_KEY }}
      - run: echo "$__{{ secrets.DEPLOY_KNOWN_HOSTS }}" >> ~/.ssh/known_hosts
~~~

نفس أول الـ deploy بالظبط: [[environment: production]] (قواعد وموافقة الإنتاج)، والمفتاح في الـ agent، وبصمة السيرفر في [[known_hosts]]. التفاصيل في درس «deploy عبر SSH».

---

## ٣. السطر اللي بيعمل الـ rollback

~~~text
      - run: |
          ssh deploy@$__{{ secrets.DEPLOY_HOST }} "cd /var/www/myapp && IMAGE_TAG=$__{{ inputs.tag }} docker compose up -d --no-build"
~~~

اللي بيتبعت للسيرفر (لو كتبت [[v1.1.0]]):

~~~bash
cd /var/www/myapp && IMAGE_TAG=v1.1.0 docker compose up -d --no-build
~~~

- [[IMAGE_TAG=v1.1.0 docker compose ...]]: متغير قبل الأمر على نفس السطر بيبقى موجود للأمر ده بس.
- [[up -d]]: شغّل في الخلفية، وأي container الـ image بتاعته اتغيّرت يتعمل من جديد.
- [[--no-build]]: متحاولش تبني حتى لو فيه [[build:]] في الملف، استخدم الـ image الجاهزة.

---

## ٤. الشرط: compose على السيرفر بيقرا [[IMAGE_TAG]]

~~~text compose.yaml على السيرفر
services:
  api:
    image: ghcr.io/user/repo:$__{IMAGE_TAG:-latest}
~~~

[[$__{IMAGE_TAG:-latest}]] يعني: قيمة [[IMAGE_TAG]]، ولو مش موجودة أو فاضية خد [[latest]]. جربناه بـ [[docker compose config]] (بيطبع الملف بعد ما المتغيرات تتفك، من غير ما يشغّل حاجة):

~~~bash
docker compose config | grep image
IMAGE_TAG=v1.1.0 docker compose config | grep image
~~~

~~~text الناتج
    image: ghcr.io/user/repo:latest
    image: ghcr.io/user/repo:v1.1.0
~~~

نفس الملف، ونسخة مختلفة حسب المتغير. ولو compose فيه [[:latest]] ثابت، الـ rollback ده ملوش أي تأثير.

> لاحظ: [[docker compose up -d]] عادي بعد كده (من غير المتغير) هيرجّع [[latest]]. يعني الـ rollback لحد الـ deploy الجاي.

---

## ٥. حتة أمان

[[$__{{ inputs.tag }}]] بيتحط في الأمر **كنص** قبل ما bash يشوفه. لو حد كتب في الحقل [[v1; rm -rf ~]]، ده هيتنفّذ على السيرفر. الأأمن: تحطه في [[env:]] وتتأكد من شكله قبل الاستخدام، زي:

~~~text
      - env:
          TAG: $__{{ inputs.tag }}
        run: |
          [[ "$TAG" =~ ^[A-Za-z0-9._-]+$ ]] || { echo "::error::bad tag"; exit 1; }
          ssh deploy@$__{{ secrets.DEPLOY_HOST }} "cd /var/www/myapp && IMAGE_TAG=$TAG docker compose up -d --no-build"
~~~

[[=~]] في bash بيقارن بـ regex: حروف وأرقام و [[.]] و [[_]] و [[-]] بس.

الشكل ده عدّى [[actionlint]]، واتشغّل بـ [[act]] مرتين (بـ [[echo ssh]] بدل [[ssh]] عشان مفيش سيرفر):

~~~text الناتج: tag=v1.1.0
| ssh deploy@*** cd /var/www/myapp && IMAGE_TAG=v1.1.0 docker compose up -d --no-build
🏁  Job succeeded
~~~

~~~text الناتج: tag=v1; rm -rf ~
❗  ::error::bad tag
🏁  Job failed
~~~

و [[***]] مكان الـ host لأنه secret.

---

## الخلاصة

| الجزء | دوره |
|---|---|
| [[workflow_dispatch]] بـ [[required]] input | زرار يسأل على النسخة |
| [[IMAGE_TAG=... docker compose up -d --no-build]] | شغّل النسخة دي من الـ registry |
| [[$__{IMAGE_TAG:-latest}]] في compose | من غيره مفيش rollback |
| [[env:]] + فحص الشكل | الحقل ميبقاش باب لأوامر |`,
          lines: [
            "الاسم.",
            "الأحداث.",
            "تشغيل يدوي...",
            "...بمدخلات.",
            "المدخل: النسخة.",
            "وصفه في الواجهة.",
            "إجباري.",
            "المهام.",
            "rollback.",
            "ماكينة.",
            "environment الإنتاج.",
            "الخطوات.",
            "المفتاح.",
            "إعداداته.",
            "من secret.",
            "بصمة السيرفر من secret.",
            "أوامر.",
            "على السيرفر: شغّل compose بالنسخة المطلوبة من غير build."
          ],
          sol: R`شغّل الـ workflow من [[Run workflow]] واكتب tag قديم زي [[v1.0.0]]. على السيرفر اتأكد: [[docker compose ps]] أو [[docker inspect --format '{{.Config.Image}}' myapp-api-1]] لازم يطلّع [[ghcr.io/user/repo:v1.0.0]]. والموقع يرجع يرد بالنسخة القديمة.

ولأن الـ compose فيه [[$__{IMAGE_TAG:-latest}]]، تشغيل [[docker compose up -d]] عادي من غير المتغير بيرجّع [[latest]] تاني. ودا تحذير: الـ rollback ده مؤقت لحد الـ deploy الجاي، مش تثبيت.

أخطاء شائعة: [[manifest unknown]] أو [[not found]] يعني الـ tag ده متعملوش push أصلًا في ghcr (اتأكد من صفحة Packages). و [[unauthorized]] يعني السيرفر مش عامل login لـ ghcr. وخلي بالك إن حط [[$__{{ inputs.tag }}]] جوه الـ shell مباشرة بيسمح لأي حد يقدر يشغّل الـ workflow يحقن أوامر؛ الأأمن تعدّيه كـ env وتتأكد إنه بشكل [[v1.2.3]] أو sha قبل ما تستخدمه.`
        },
        {
          cmd: "schedule",
          title: "مهام دورية من GitHub",
          desc: "cron بس على سيرفرات GitHub: فحص إن الموقع شغال كل ٥ دقايق، أو اختبار إن الباك أب بيرجع أسبوعيًا، أو تحديث dependencies. من غير سيرفر إضافي، ولو الفحص فشل بيجيلك إيميل.",
          example: R`name: Uptime
on:
  schedule:
    - cron: '*/10 * * * *'
  workflow_dispatch:
jobs:
  check:
    runs-on: ubuntu-latest
    steps:
      - run: |
          code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 https://example.com/health)
          echo "status=$code"
          test "$code" = "200"
      - if: failure()
        run: |
          curl -s -X POST "https://api.telegram.org/bot$__{{ secrets.TG_TOKEN }}/sendMessage" -d chat_id=$__{{ secrets.TG_CHAT }} -d text="example.com is DOWN"`,
          try: "اعمل بوت Telegram (BotFather)، وحط التوكن و chat id في secrets، وشوف الرسالة بتوصلك لما الفحص يفشل.",
          flag: "script",
          deep: {
            why: "مراقبة الموقع محتاجة سيرفر تاني بيسأله كل شوية. GitHub بيديك ده مجانًا: cron بيشتغل على سيرفراتهم ويبلّغك لو الفحص فشل.",
            how: R`[[schedule]] بصيغة cron (UTC). [[*/10]] كل ١٠ دقايق. الحد الأدنى ٥ دقايق، وبيتأخر دقايق أحيانًا في الذروة. و [[workflow_dispatch]] كمان عشان تجرّبه بإيدك.

الـ step بتطلب الموقع بـ curl: [[-o /dev/null]] ارمي الصفحة، و [[-w '%{http_code}']] اطبع الـ status بس، و [[--max-time 15]] متستناش أكتر. وبعدين [[test "$code" = "200"]]: لو مش 200، بيرجع 1 والـ step تفشل.

[[if: failure()]] على الـ step اللي بعدها: بتشتغل بس لو اللي قبلها فشلت. وبتبعت رسالة Telegram بـ API البوت. أو Slack webhook، أو إيميل (GitHub بيبعت إيميل لوحده لأي workflow فاشل على main، بس ده لكل فشل).

استخدامات تانية للـ schedule: اختبار الباك أب أسبوعيًا (ينزّل آخر dump ويرجّعه في service postgres ويعد الصفوف)، وفحص انتهاء الشهادة، و [[npm audit]] يومي، وتنضيف artifacts.

في الـ repos العامة، الـ workflows المجدولة بتتوقف لوحدها لو الـ repo مفيهوش نشاط ٦٠ يوم، و GitHub بيبعت إيميل قبلها.`,
            when: "فحص uptime لكل موقع إنتاج. واختبار الباك أب أسبوعيًا.",
            mistakes: "كل دقيقة (مش مسموح، الحد ٥). وتعتمد عليه كمراقبة وحيدة: لو GitHub نفسه واقع مش هتعرف، فخدمة زي UptimeRobot كمان."
          },
          teach: R`## الفكرة: cron على سيرفرات GitHub

الـ workflow ده مالوش علاقة بالكود: كل ١٠ دقايق بيطلب صفحة [[/health]] من الموقع، ولو مردّتش 200 بيبعتلك رسالة Telegram. مراقبة مجانية من غير سيرفر تاني.

---

## ١. الميعاد

~~~text
name: Uptime
on:
  schedule:
    - cron: '*/10 * * * *'
  workflow_dispatch:
~~~

- [[*/10]] في خانة الدقيقة: «كل ١٠ دقايق» (0 و 10 و 20...). والـ ٤ نجوم الباقيين: أي ساعة، أي يوم، أي شهر، أي يوم في الأسبوع. (شرح الخانات الخمسة في درس «المفاهيم».)
- بتوقيت UTC، وأقل فترة GitHub بيقبلها ٥ دقايق، وممكن يتأخر دقايق وقت الزحمة (من الـ docs).
- [[workflow_dispatch:]] زرار تشغيل بإيدك، عشان تجرّبه دلوقتي من غير ما تستنى.

---

## ٢. الفحص

~~~text
      - run: |
          code=$(curl -s -o /dev/null -w '%{http_code}' --max-time 15 https://example.com/health)
          echo "status=$code"
          test "$code" = "200"
~~~

### السطر الأول من جوه لبرة

| الجزء | معناه |
|---|---|
| [[curl URL]] | اطلب الصفحة |
| [[-s]] | silent: من غير شريط التحميل |
| [[-o /dev/null]] | محتوى الصفحة ارميه. [[/dev/null]] «ملف» أي حاجة تتكتب فيه بتختفي |
| [[-w '%{http_code}']] | بعد ما تخلص اطبع رقم الحالة بس (200، 404، 500...) |
| [[--max-time 15]] | لو مخلصش في ١٥ ثانية اقفل |
| [[code=$( ... )]] | الرقم اللي اتطبع يتحط في متغير [[code]] |

### السطرين التانيين

- [[echo "status=$code"]]: يظهر في اللوج عشان تعرف حصل إيه.
- [[test "$code" = "200"]]: [[test]] بيرجع 0 لو الكلام صح و 1 لو غلط. ولأنه آخر أمر في الـ step، نتيجته هي نتيجة الـ step: مش 200 يبقى الـ step فشلت.

جربنا الـ curl ده في Docker على Ubuntu 24.04 على ٣ حالات:

~~~text الناتج
200     ← https://example.com/
404     ← https://example.com/downloads/myapp.apk
000     ← https://no-such-host.invalid/   (exit code 6)
~~~

(العلامة [[←]] والرابط مكتوبين للتوضيح، [[curl]] بيطبع الرقم بس.) [[000]] معناها مفيش رد خالص: الـ domain مش موجود أو الاتصال مقطوع، وساعتها [[curl]] نفسه بيرجع رقم مش صفر (6 = مقدرش يلاقي الـ host). وفي الحالتين التانيين [[test]] هيفشل، وده المطلوب.

---

## ٣. التنبيه

~~~text
      - if: failure()
        run: |
          curl -s -X POST "https://api.telegram.org/bot$__{{ secrets.TG_TOKEN }}/sendMessage" -d chat_id=$__{{ secrets.TG_CHAT }} -d text="example.com is DOWN"
~~~

- [[if: failure()]]: الـ step دي بتشتغل بس لو اللي قبلها فشلت.
- [[-X POST]]: نوع الطلب POST (بيبعت بيانات) بدل GET.
- الرابط: [[https://api.telegram.org/bot<التوكن>/sendMessage]]، وده API بوتات Telegram لإرسال رسالة. التوكن بتاخده من BotFather وبيتحط secret.
- [[-d chat_id=...]] و [[-d text=...]]: البيانات اللي بتتبعت. [[chat_id]] رقم المحادثة اللي الرسالة توصلها.

(إرسال الرسالة محتاج بوت حقيقي، فمكتوب من docs بتاعة Telegram Bot API.)

---

## الخلاصة

| الجزء | دوره |
|---|---|
| [[schedule: cron: '*/10 * * * *']] | كل ١٠ دقايق، بتوقيت UTC |
| [[workflow_dispatch]] | تجرّبه بإيدك |
| [[curl -s -o /dev/null -w '%{http_code}']] | رقم الحالة بس |
| [[test "$code" = "200"]] | يفشّل الـ step لو مش 200 |
| [[if: failure()]] | ابعت التنبيه بس لما الفحص يفشل |`,
          lines: [
            "الاسم.",
            "الأحداث.",
            "مجدول...",
            "...كل ١٠ دقايق (UTC).",
            "ويدوي للتجربة.",
            "المهام.",
            "الفحص.",
            "ماكينة.",
            "الخطوات.",
            "أوامر.",
            "اطلب الموقع: ارمي الصفحة، اطبع الـ status بس، مهلة ١٥ ثانية.",
            "اطبعه في اللوج.",
            "لو مش 200، افشل.",
            "لو الفحص فشل...",
            "...أوامر.",
            "...ابعت رسالة Telegram بالبوت."
          ],
          sol: R`الإعداد: من BotFather خد التوكن، ابعت أي رسالة للبوت، وافتح [[https://api.telegram.org/botTOKEN/getUpdates]] هتلاقي [[chat":{"id":123456789]]، ودا الـ [[TG_CHAT]]. حط الاتنين secrets.

عشان تجرّب الفشل من غير ما تستنى الموقع يقع: غيّر الـ URL مؤقتًا لحاجة بترجع 404 أو domain مش موجود، وشغّل الـ workflow بـ [[Run workflow]]. هتشوف في اللوج [[status=404]] (أو [[status=000]] لو مفيش اتصال)، والـ step تفشل، والـ step اللي بعدها تشتغل بسبب [[if: failure()]]، وتوصلك رسالة [[example.com is DOWN]].

خلي بالك: الـ cron في GitHub بيتأخر أحيانًا دقايق كتير وقت الزحمة، وأقل فترة ٥ دقايق، وبيشتغل على الـ default branch بس. وفي الـ repo الـ public لو مفيش نشاط ٦٠ يوم الـ schedule بيتوقف لوحده. ولو الرسالة ما وصلتش: جرّب الـ curl بتاع Telegram من جهازك الأول، غالبًا الـ chat id غلط أو ما بعتّش للبوت رسالة قبل كده.`
        },
        {
          cmd: "debugging",
          title: "لما الـ workflow نفسه بايظ",
          desc: "YAML غلط، أو step بتشتغل عندك ومش في CI. [[act]] بيشغّل الـ workflow على جهازك بـ Docker. و [[ACTIONS_STEP_DEBUG]] بيطلّع لوج تفصيلي. و tmate بيفتحلك SSH على الـ runner نفسه تشوف بعينك.",
          example: R`gh workflow view ci.yml --yaml | head -20
npx -y yaml-lint .github/workflows/ci.yml
act push --job test
act -l
gh secret set ACTIONS_STEP_DEBUG --body true
gh run view 1234567890 --log | grep -i "##\[debug\]" | head`,
          try: "ضيف step [[- uses: mxschmitt/action-tmate@v3]] مؤقتًا بعد الـ step الفاشلة، وادخل الـ runner بـ SSH من اللوج، وجرّب الأمر بإيدك.",
          deep: {
            why: "الـ workflow بيفشل في مكان مش مفهوم، أو YAML مش بيتقبل، أو step بتشتغل عندك ومش هناك. الـ push والانتظار ٣ دقايق لكل تجربة مضيّعة وقت.",
            how: R`[[gh workflow view --yaml]] بيوريك الملف زي ما GitHub قراه. [[yaml-lint]] بيمسك أخطاء المسافات قبل الـ push.

[[act]] (nektos/act): بيشغّل الـ workflow على جهازك في Docker بيحاكي الـ runner. [[act push --job test]] بيشغّل job test كأنه push. [[-l]] يعرض الـ jobs. مش مطابق ١٠٠٪ (بعض الـ actions والـ services بتختلف)، بس بيمسك معظم المشاكل في ثواني.

[[ACTIONS_STEP_DEBUG=true]] كـ secret أو variable بيخلي كل الـ actions تطبع لوج تفصيلي (السطور بـ [[##[debug] ]]). و [[ACTIONS_RUNNER_DEBUG]] للـ runner نفسه.

tmate: step [[mxschmitt/action-tmate]] بتوقف الـ run وتطبع أمر ssh في اللوج، تدخل بيه الـ runner نفسه وتشوف الملفات وتجرّب الأوامر بإيدك. أقوى أداة لما الفرق بين جهازك والـ runner مش واضح. شيلها بعد ما تخلص.

وحيلة بسيطة: step فيها [[run: env | sort]] و [[run: ls -la]] تشوف البيئة والملفات.`,
            when: "workflow جديد قبل أول push (act و lint). وفشل مش مفهوم (debug و tmate).",
            mistakes: "تسيب tmate في الـ workflow فكل run يعلّق مستنيك. و ACTIONS_STEP_DEBUG مفعّل دايمًا فاللوج يبقى ضخم."
          },
          teach: R`## الفكرة: متعملش push وتستنى ٣ دقايق عشان تعرف إن فيه مسافة غلط

كل أمر في المثال بيجاوب سؤال مختلف:

| السؤال | الأمر |
|---|---|
| GitHub شايف الملف إزاي؟ | [[gh workflow view --yaml]] |
| الـ YAML نفسه سليم؟ | [[yaml-lint]] (و [[actionlint]] أحسن) |
| الـ workflow بيشتغل؟ من غير push | [[act]] |
| الـ action بتعمل إيه من جوه؟ | [[ACTIONS_STEP_DEBUG]] |
| الـ runner فيه إيه بالظبط؟ | tmate (في الحل) |

---

## ١. [[gh workflow view ci.yml --yaml | head -20]]

[[workflow view]] بيعرض workflow، و [[--yaml]] الملف نفسه زي ما هو على GitHub (على الـ default branch)، و [[| head -20]] أول ٢٠ سطر بس. ده على الـ repo بتاع الموقع ده نفسه (ملفه اسمه [[check.yml]]):

~~~text الناتج
check - check.yml
ID: 370269859

name: check

on:
  push:
  pull_request:

jobs:
  check:
    runs-on: ubuntu-latest
~~~

أول سطرين: الاسم، والملف، ورقم الـ workflow. وبعدهم الملف. مفيد لما تشك إن اللي على GitHub مش اللي عندك.

---

## ٢. [[npx -y yaml-lint .github/workflows/ci.yml]]

- [[npx]] بيشغّل أداة من npm من غير ما تسطّبها في المشروع، و [[-y]] من غير ما يسألك «أنزّلها؟».
- [[yaml-lint]] بيفحص إن الملف YAML صح.

جربناه في container [[node:22-slim]] على ملف سليم، وعلى ملف [[runs-on]] فيه بمسافة ناقصة:

~~~text الناتج: سليم
✔ YAML Lint successful.
~~~

~~~text الناتج: مسافة غلط
 ERROR  YAML Lint failed for 1 file
/w/bad.yml
 ERROR  bad indentation of a mapping entry (5:10)
~~~

[[(5:10)]] السطر 5، العمود 10. وعلى نفس الملف الغلط، [[actionlint]] قال:

~~~text الناتج
bad.yml:5:9: could not parse as YAML: mapping values are not allowed in this context [syntax-check]
~~~

الفرق: [[yaml-lint]] بيعرف YAML بس. [[actionlint]] كمان بيعرف قواعد GitHub Actions: job في [[needs]] مش موجود، أو expression غلط، وبيشغّل shellcheck على سكربتات [[run]]. (كل workflow في التاب ده اتفحص بيه.)

---

## ٣. [[act]]: شغّل الـ workflow على جهازك

[[act]] (من nektos) بيقرا [[.github/workflows]] ويشغّل كل job في container Docker على جهازك. كل نواتج «act» في دروس التاب ده جت منه.

### [[act -l]]

[[-l]] (list): اعرض الـ jobs من غير ما تشغّل. على ملف درس «jobs متوازية»:

~~~text الناتج
Stage  Job ID     Job name   Workflow name  Workflow file  Events
0      lint       lint       t15.yml        t15.yml        push
0      typecheck  typecheck  t15.yml        t15.yml        push
0      test       test       t15.yml        t15.yml        push
1      ok         ok         t15.yml        t15.yml        push
~~~

[[Stage]] الترتيب: كل الـ 0 مع بعض، والـ 1 بعدهم (بسبب [[needs]]). و [[Events]] الأحداث اللي بتشغّله.

### [[act push --job test]]

[[push]]: تخيّل إن الحدث push. [[--job test]] (أو [[-j]]): شغّل الـ job ده بس. الناتج بيبقى زي اللي في درس «ci.yml»: كل step بـ [[⭐ Run]] وبعدها [[✅ Success]] أو [[❌ Failure]]، وفي الآخر [[🏁 Job succeeded]].

حدوده اللي قابلناها فعلًا في التاب ده: مبيشغّلش ويندوز ولا ماك، ومفيهوش environments ولا موافقات، وسيرفر الـ artifacts بتاعه أقدم من [[upload-artifact@v7]]. يعني بيمسك أغلب المشاكل، مش كلها.

---

## ٤. [[gh secret set ACTIONS_STEP_DEBUG --body true]]

- [[gh secret set NAME --body VALUE]]: اعمل secret بالقيمة دي مباشرة (بدل ما تقراها من ملف).
- [[ACTIONS_STEP_DEBUG]] اسم خاص: لما يبقى [[true]]، كل الـ actions بتطبع سطور زيادة بتبدأ بـ [[##[debug]]] (من الـ docs).

ده بيكتب في إعدادات الـ repo، فمتجرّبش هنا. وامسحه بعد ما تخلص بـ [[gh secret delete ACTIONS_STEP_DEBUG]] عشان اللوج ميفضلش ضخم.

---

## ٥. [[gh run view ID --log | grep -i "##\[debug\]" | head]]

- [[--log]]: اللوج كله (مش الفاشل بس).
- [[grep -i "##\[debug\]"]]: السطور اللي فيها [[##[debug]]]. الـ [[\]] قبل [[[]] و [[]]] لأن الأقواس المربعة ليها معنى في grep (مجموعة حروف)، فبنقوله «أقصد القوس نفسه». و [[-i]] من غير فرق بين capital و small.
- [[| head]]: أول ١٠ سطور.

---

## ٦. الحل: tmate تدخل الـ runner بنفسك

~~~text
- uses: mxschmitt/action-tmate@v3
  if: failure()
  with:
    limit-access-to-actor: true
  timeout-minutes: 30
~~~

- [[mxschmitt/action-tmate@v3]]: action بتشغّل **tmate** (برنامج بيشارك ترمنال عن طريق سيرفر وسيط) على الـ runner، وتطبع في اللوج أمر [[ssh]] تدخل بيه، والـ run بيفضل مستني.
- [[if: failure()]]: متشتغلش غير لو خطوة قبلها فشلت، فالـ runs الناجحة مبتقفش.
- [[limit-access-to-actor: true]]: محدش يدخل غير صاحب الـ run، بمفتاح الـ SSH المسجّل في حسابه على GitHub. من غيرها، أي حد شاف اللوج (والـ repo العام لوجه مفتوح) يقدر يدخل الماكينة اللي فيها الـ secrets.
- [[timeout-minutes: 30]]: لو نسيت، الخطوة تتقفل بعد نص ساعة بدل ما تاكل رصيدك ساعات.

ده محتاج runner حقيقي على GitHub، فمن الـ docs بتاعة الـ action. وشيل الخطوة بعد ما تخلص.

---

## الخلاصة

| الأداة | بتمسك إيه | محتاجة GitHub؟ |
|---|---|---|
| [[actionlint]] / [[yaml-lint]] | مسافات وأخطاء في الملف | لأ |
| [[act]] | الـ jobs بتشتغل فعلًا | لأ (Docker بس) |
| [[gh workflow view --yaml]] | الملف اللي GitHub شايفه | آه |
| [[ACTIONS_STEP_DEBUG]] | تفاصيل الـ actions | آه |
| tmate | تدخل الـ runner بنفسك | آه |`,
          lines: [
            "الملف زي ما GitHub قراه.",
            "افحص YAML قبل الـ push.",
            "شغّل job test على جهازك كأنه push.",
            "الـ jobs المتاحة محليًا.",
            "فعّل اللوج التفصيلي لكل الـ actions.",
            "سطور الـ debug في اللوج."
          ],
          sol: R`بعد الـ step الفاشلة، الـ tmate step بتطبع في اللوج كل كام ثانية سطرين: [[SSH: ssh XXXXXXXX@nyc1.tmate.io]] و [[Web shell: https://tmate.io/t/XXXXXXXX]]. انسخ الـ ssh من اللوج وشغّله من ترمنالك: هتلاقي نفسك جوه الـ runner في فولدر الـ repo، وتقدر تشغّل [[npm test]] أو تبص على الملفات بنفسك.

عشان الـ workflow يكمّل: [[touch continue]] جوه الجلسة (أو اقفل الجلسة حسب الإعداد)، وإلا هيفضل لحد timeout الـ job.

تحذيرات لازم تعرفها: على repo public اللوج مفتوح لأي حد، فأي حد يقدر ياخد الرابط ويدخل الـ runner بالـ secrets بتاعتك. استخدم [[limit-access-to-actor: true]] عشان مفتاح الـ SSH بتاعك المسجّل في GitHub بس يدخل، وحط [[if: failure()]] عشان يشتغل لما حاجة تفشل بس، وامسح الـ step بعد ما تخلص. والغلط الشائع إنك تنساها فكل run فاشل يفضل مستني ساعات ويصرف دقايق Actions.`,
          solCode: R`- uses: mxschmitt/action-tmate@v3
  if: failure()
  with:
    limit-access-to-actor: true
  timeout-minutes: 30`
        }
      ]
    }
]);

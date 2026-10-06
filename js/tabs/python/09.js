// تكملة تاب python: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/python/01.js (شرح حقول الدرس في أوله)
MORE("python", [
    {
      t: "Python على السيرفر",
      l: 3,
      n: "صورة Docker خفيفة، و uvicorn ورا nginx، والاختبارات جوه compose",
      items: [
        {
          cmd: "uvicorn --proxy-headers",
          title: "FastAPI في الإنتاج ورا nginx",
          desc: "في الإنتاج uvicorn بيشتغل جوه container ورا nginx. [[--host 0.0.0.0]] عشان يبقى باين بره الـ container، و [[--proxy-headers]] (شغال افتراضيًا، وكتابته توضيح) مع [[--forwarded-allow-ips]] عشان يصدّق الـ headers اللي nginx بيبعتها ويعرف IP المستخدم الحقيقي وإن الطلب كان https. ومن غير [[--reload]].",
          example: R`uvicorn app.main:app --host 0.0.0.0 --port 8080 --proxy-headers --forwarded-allow-ips "*"
uvicorn app.main:app --host 0.0.0.0 --port 8080 --workers 2 --proxy-headers --forwarded-allow-ips "*"
# Linux (and WSL):
ss -tlnp | grep 8080
# Windows (PowerShell):
Get-NetTCPConnection -LocalPort 8080 -State Listen`,
          try: "اعمل endpoint بيرجّع [[request.client.host]] و [[request.url.scheme]]، واطلبه من ورا nginx مرة بـ [[--forwarded-allow-ips \"*\"]] ومرة من غيرها وقارن.",
          deep: {
            why: "من غير الإعدادات دي: كل الطلبات شكلها جاية من IP بتاع nginx (فالـ rate limit بيقفل على الكل مرة واحدة)، والـ redirects بتطلع [[http://]] والموقع https.",
            how: R`[[--host 0.0.0.0]]: جوه الـ container، [[127.0.0.1]] معناها الـ container نفسه بس، فـ nginx (في container تاني) مش هيوصل.

nginx بيبعت [[X-Forwarded-For]] (IP المستخدم) و [[X-Forwarded-Proto]] (https). [[--proxy-headers]] بيخلي uvicorn يستخدمهم، فـ [[request.client.host]] يبقى IP المستخدم، والـ URLs اللي FastAPI بيولّدها تبقى https. وهو شغال افتراضيًا أصلًا ([[--no-proxy-headers]] يقفله)، بس بيصدّق بس اللي في [[--forwarded-allow-ips]].

[[--forwarded-allow-ips]]: مين مسموحله يبعت الـ headers دي. الافتراضي 127.0.0.1 (و ::1) بس، و nginx في container تاني ليه IP تاني فبيتجاهل. [[*]] معناها صدّق أي حد، ودي آمنة بس لو البورت ده مش مفتوح للإنترنت (nginx هو الوحيد اللي يوصله، زي [[expose]] في compose أو [[127.0.0.1:8080:8080]]).

[[--workers 2]] عمليتين منفصلتين، كل واحدة بذاكرتها. لتطبيق async، عدد قليل كفاية.

[[ss -tlnp]] بيتأكد إنه سامع على [[0.0.0.0:8080]] مش [[127.0.0.1:8080]].`,
            when: "أي FastAPI في الإنتاج ورا nginx أو أي reverse proxy.",
            mistakes: R`[[--forwarded-allow-ips "*"]] والبورت منشور على [[0.0.0.0:8080]] في compose: أي حد يكلّم البورت مباشرة ويبعت [[X-Forwarded-For]] مزيف ويعدّي الـ rate limit أو الـ allowlist. و [[--host 127.0.0.1]] جوه container فيطلع 502 من nginx. وعلى ويندوز [[--forwarded-allow-ips "*"]] من PowerShell أو cmd: الـ [[*]] بتتحوّل لأسماء الملفات اللي في الفولدر (click بيعمل glob على ويندوز)، فـ uvicorn ميصدّقش الـ headers من غير أي error. اكتبها [[--forwarded-allow-ips="*"]] (جربتها بـ uvicorn 0.54.0).`
          },
          teach: R`## الأوامر دي بتعمل إيه؟

بتشغّل تطبيق FastAPI بـ uvicorn بالإعدادات اللي تناسب الإنتاج ورا nginx، وبعدين بتتأكد إنه سامع على العنوان الصح. هنفك أول سطر flag بـ flag، وبعدين التاني، وبعدين أوامر الفحص.

---

## ١. السطر الأول حتة حتة

~~~bash
uvicorn app.main:app --host 0.0.0.0 --port 8080 --proxy-headers --forwarded-allow-ips "*"
~~~

### [[uvicorn]]

**ASGI server**: البرنامج اللي بيستقبل طلبات HTTP ويسلّمها لتطبيق FastAPI. FastAPI نفسه مش بيسمع على بورت، uvicorn هو اللي بيعمل كده.

### [[app.main:app]]

| الحتة | معناها |
|---|---|
| [[app.main]] | الموديول: ملف [[app/main.py]] (النقطة = فولدر) |
| [[:]] | فاصل |
| [[app]] | اسم المتغير جوه الملف: [[app = FastAPI()]] |

### [[--host 0.0.0.0]]

العنوان اللي uvicorn هيسمع عليه:

| القيمة | مين يقدر يوصل |
|---|---|
| [[127.0.0.1]] (الافتراضي) | الجهاز نفسه بس. جوه container = الـ container نفسه بس |
| [[0.0.0.0]] | كل الواجهات: nginx من container تاني يقدر يوصل |

جربت [[--host 127.0.0.1]] في container وطلبت من الـ IP بتاع الـ container ([[172.17.0.3]]): [[curl]] فشل بـ exit 7 (couldn't connect). ده بالظبط اللي بيطلّع 502 من nginx.

### [[--port 8080]]

البورت. أي رقم فوق 1024 مش محتاج صلاحيات root.

### [[--proxy-headers]]

nginx لما بيوصّل طلب، الـ IP اللي uvicorn شايفه هو IP بتاع **nginx**، والطلب عنده http عادي حتى لو المستخدم فتح https. فـ nginx بيضيف headers فيها الحقيقة:

| الـ header | فيه إيه |
|---|---|
| [[X-Forwarded-For]] | IP المستخدم الحقيقي |
| [[X-Forwarded-Proto]] | [[https]] أو [[http]] زي ما المستخدم طلب |

[[--proxy-headers]] بيقول لـ uvicorn «استخدم الـ headers دي». وده شغال افتراضيًا أصلًا ([[--no-proxy-headers]] يقفله)، والـ help بيقول:

~~~text uvicorn --help (uvicorn 0.54.0)
  --proxy-headers / --no-proxy-headers
                                  Enable/Disable X-Forwarded-Proto,
                                  X-Forwarded-For to populate url scheme and
                                  remote address info.
~~~

### [[--forwarded-allow-ips "*"]]

بس uvicorn مش بيصدّق أي حد يبعت الـ headers دي، وإلا أي حد يكتب [[X-Forwarded-For]] مزيف. بيصدّق بس الطلبات اللي جاية من IPs في اللستة دي. الافتراضي [[127.0.0.1]] بس. و [[*]] = صدّق أي حد، وده آمن **بس** لو البورت مش مفتوح للنت (nginx بس اللي يوصله). والعلامات [[""]] عشان bash ميحوّلش [[*]] لأسماء الملفات.

---

## ٢. التجربة: بـ [[*]] ومن غيرها

عملت التطبيق اللي في الحل ([[/whoami]] بيرجّع [[request.client.host]] و [[request.url.scheme]])، وشغّلته في [[python:3.13-slim]] على Docker (FastAPI 0.142.2 و uvicorn 0.54.0)، وطلبت من IP الـ container على شبكة Docker، زي ما nginx في container تاني بيعمل، ومعايا الـ headers:

~~~bash
curl -H "X-Forwarded-For: 203.0.113.7" -H "X-Forwarded-Proto: https" http://172.17.0.3:8080/whoami
~~~

| التشغيل | الناتج |
|---|---|
| بـ [[--forwarded-allow-ips "*"]] | [[{"client":"203.0.113.7","scheme":"https"}]] |
| من غيرها | [[{"client":"172.17.0.3","scheme":"http"}]] |
| من غيرها، والطلب من [[127.0.0.1]] | [[{"client":"203.0.113.7","scheme":"https"}]] |

السطر التالت: الافتراضي بيثق في [[127.0.0.1]]، فلو nginx على نفس الجهاز مش هتلاحظ فرق. ([[203.0.113.7]] عنوان محجوز للأمثلة.)

---

## ٣. السطر التاني: [[--workers 2]]

~~~bash
uvicorn app.main:app --host 0.0.0.0 --port 8080 --workers 2 --proxy-headers --forwarded-allow-ips "*"
~~~

نفس الكلام، بس uvicorn بيشغّل **عمليتين** (processes) بيردّوا على الطلبات، وعملية أب بتراقبهم. ده من الـ log:

~~~text الناتج
INFO:     Uvicorn running on http://0.0.0.0:8080 (Press CTRL+C to quit)
INFO:     Started parent process [587]
INFO:     Started server process [590]
INFO:     Started server process [591]
~~~

كل worker ليه ذاكرته، فمفيش متغيرات مشتركة بينهم (cache في dict مثلًا هيبقى نسختين). و [[--workers]] مبيشتغلش مع [[--reload]].

---

## ٤. الفحص على لينكس: [[ss -tlnp | grep 8080]]

[[ss]] (socket statistics) بيعرض الاتصالات والبورتات:

| الـ flag | معناه |
|---|---|
| [[-t]] | TCP بس |
| [[-l]] | listening: اللي مستني اتصالات |
| [[-n]] | أرقام، من غير ما يحوّل البورت لاسم ([[8080]] مش [[http-alt]]) |
| [[-p]] | اسم البرنامج و PID بتاعه |

و [[| grep 8080]] يسيب السطر اللي فيه 8080 بس. ([[ss]] جاي من باكدج [[iproute2]]، ومش موجود في [[python:3.13-slim]]، سطّبته جوه الـ container.)

~~~text الناتج (مع --workers 2)
LISTEN 0      2048         0.0.0.0:8080      0.0.0.0:*    users:(("python3.13",pid=591,fd=3),("python3.13",pid=590,fd=3),("uvicorn",pid=587,fd=3))
~~~

- [[0.0.0.0:8080]]: سامع على كل الواجهات. ده المطلوب.
- [[2048]]: أقصى عدد اتصالات مستنية في الطابور (backlog).
- [[users:]]: التلات عمليات (الأب والـ 2 workers) شايلين نفس الـ socket.

ومع [[--host 127.0.0.1]] السطر كان [[127.0.0.1:8080]]: يعني محدش من بره يوصل.

---

## ٥. الفحص على ويندوز: [[Get-NetTCPConnection]]

~~~powershell
Get-NetTCPConnection -LocalPort 8080 -State Listen
~~~

[[-LocalPort 8080]] البورت على جهازك، و [[-State Listen]] اللي سامع بس. جربته في PowerShell 7 و 5.1 وuvicorn شغال بـ Python 3.14:

~~~text الناتج
LocalAddress LocalPort  State OwningProcess
------------ ---------  ----- -------------
0.0.0.0           8080 Listen         48216
~~~

[[LocalAddress]] نفس معنى عمود العنوان في [[ss]]، و [[OwningProcess]] الـ PID. ولو مفيش حد سامع، بيطلع error طويل أوله [[No matching MSFT_NetTCPConnection objects found]].

### فخ على ويندوز: [[*]] بتتحوّل لأسماء ملفات

uvicorn مبني على مكتبة **click**، و click على ويندوز بتعمل glob للـ arguments بنفسها (لأن cmd و PowerShell مش بيعملوا كده زي bash). فـ [[--forwarded-allow-ips "*"]] اتحوّلت لاسم الفولدر اللي جنبي:

| الشكل (في PowerShell) | الناتج من [[127.0.0.1]] |
|---|---|
| [[--forwarded-allow-ips "*"]] | [[{"client":"127.0.0.1","scheme":"http"}]]: الـ headers اتجاهلت من غير أي error |
| [[--forwarded-allow-ips="*"]] | [[{"client":"203.0.113.7","scheme":"https"}]] |

ولما كان في الفولدر حاجتين، uvicorn وقف بـ [[Error: Got unexpected extra argument]]، ونفس الكلام حصل من cmd. على ويندوز اكتبها بـ [[=]] ملزوقة. (في Docker ولينكس الشكلين شغالين.)

---

## الخلاصة

| الـ flag | من غيره |
|---|---|
| [[--host 0.0.0.0]] | nginx في container تاني يطلع 502 |
| [[--proxy-headers]] (افتراضي) | — |
| [[--forwarded-allow-ips]] | IP البروكسي بدل المستخدم، و http بدل https |
| [[--workers 2]] | عملية واحدة |
| من غير [[--reload]] | — ده للتطوير بس |

وفحص سريع بعد أي deploy: [[ss -tlnp]] أو [[Get-NetTCPConnection]] لازم يقول [[0.0.0.0:8080]].`,
          lines: [
            "شغّل على كل الواجهات، وصدّق headers الـ proxy.",
            "نفس الكلام بعمليتين.",
            "اتأكد إنه سامع على 0.0.0.0.",
            "نفس السؤال على ويندوز: مين سامع على 8080 وعلى أنهي عنوان."
          ],
          sol: R`جربتها في container بـ endpoint بيرجّع [[{"client": ..., "scheme": ...}]] وبعت الطلب بـ [[X-Forwarded-For: 203.0.113.7]] و [[X-Forwarded-Proto: https]] زي ما nginx بيعمل:

مع [[--forwarded-allow-ips "*"]]: [[{"client":"203.0.113.7","scheme":"https"}]]، يعني IP المستخدم الحقيقي و https.
من غيرها، والطلب جاي من IP الـ container نفسه على شبكة Docker مش من 127.0.0.1 (زي nginx في container تاني): [[{"client":"172.17.0.3","scheme":"http"}]]، يعني IP البروكسي و http، و uvicorn تجاهل الـ headers.

و [[ss -tlnp | grep 8080]] بيطبع سطر زي [[LISTEN 0  5  0.0.0.0:8080  0.0.0.0:*  users:(("python3",pid=5145,fd=3))]].

المفاجأة: لو nginx على نفس الجهاز وبيكلّم [[127.0.0.1:8080]] مش هتلاقي فرق، لأن uvicorn بيثق في [[127.0.0.1]] افتراضيًا. وده خطر لو البورت مفتوح للنت ومعاك [[*]]: أي حد يقدر يزوّر [[X-Forwarded-For]]، فخلي البورت على 127.0.0.1 أو شبكة Docker داخلية.`,
          solCode: R`from fastapi import FastAPI, Request

app = FastAPI()

@app.get("/whoami")
def whoami(request: Request):
    return {"client": request.client.host, "scheme": request.url.scheme}`
        },
        {
          cmd: "Dockerfile",
          title: "صورة Python خفيفة وآمنة",
          desc: "صورة [[python:3.12-slim]] صغيرة، و [[PYTHONUNBUFFERED=1]] عشان اللوج يطلع على طول في docker logs، و [[pip --no-cache-dir]] من غير كاش جوه الصورة، والتطبيق بيشتغل بيوزر عادي مش root.",
          example: R`FROM python:3.12-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PIP_DISABLE_PIP_VERSION_CHECK=1
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN useradd -m -u 10001 app
COPY --chown=app:app . .
USER app
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD curl -fsS http://127.0.0.1:8080/health || exit 1
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080", "--proxy-headers", "--forwarded-allow-ips", "*"]`,
          try: "ابني الصورة وشوف حجمها بـ [[docker images]]. وبعدين [[docker compose exec app whoami]] المفروض يقول app مش root.",
          flag: "script",
          deep: {
            why: "صورة Python الكاملة حوالي جيجا، واللوج مش بيظهر، والتطبيق بيشتغل root. لو حد لقى ثغرة في الكود، هيبقى root جوه الـ container.",
            how: R`[[slim]] دبيان متقلّص (حوالي ١٥٠ ميجا بدل جيجا). alpine أصغر بس بـ musl، ومكتبات زي numpy و pandas و asyncpg ساعات بتتبني من الصفر عليها (دقايق طويلة)، فـ slim أأمن.

[[PYTHONUNBUFFERED=1]]: Python بيخزّن الـ print لما مش شايف ترمنال، فاللوج بيتأخر أو يضيع لو الـ container وقع. ده بيطلّعه فورًا. [[PYTHONDONTWRITEBYTECODE]] من غير ملفات .pyc.

[[--no-install-recommends]] و [[rm -rf /var/lib/apt/lists/*]] في نفس الـ RUN: من غير الحاجات الإضافية وقوايم apt. و curl عشان الـ HEALTHCHECK.

الترتيب: requirements.txt الأول و pip install، وبعدين الكود. تعديل في الكود بيعيد آخر طبقات بس، والمكتبات من الكاش.

[[useradd -u 10001]] يوزر عادي، و [[COPY --chown]] بينسخ الملفات ملكه من غير طبقة chown تانية تكرر حجم الملفات. [[USER app]] من هنا ورايح كل حاجة بتشتغل بيه.

[[CMD]] بصيغة JSON (exec form) عشان uvicorn ياخد SIGTERM مباشرة ويقفل بهدوء مع [[docker stop]].

وملف [[.dockerignore]] جنبه لازم: [[.venv]] و [[__pycache__]] و [[.env]] و [[.git]].`,
            when: "أي خدمة Python هتشتغل في Docker.",
            mistakes: R`[[COPY . .]] قبل pip install: أي تعديل في الكود بيعيد تسطيب كل المكتبات. ومن غير .dockerignore الـ [[.venv]] بتاعك (ولو من ويندوز كمان) بيتنسخ جوه الصورة ويلخبط. ومن غير PYTHONUNBUFFERED تلاقي [[docker logs]] فاضي وتفتكر التطبيق مش شغال.`
          },
          teach: R`## الملف ده بيعمل إيه؟

**Dockerfile** وصفة بتقول لـ Docker يبني **image** إزاي: كل سطر **instruction**، وأغلبهم بيعملوا **layer** (طبقة) فوق اللي قبلها. الملف ده بيبني صورة لتطبيق FastAPI: صغيرة، واللوج بيظهر على طول، والتطبيق شغال بيوزر عادي مش root. هنمشي سطر سطر.

---

## ١. [[FROM python:3.12-slim]]

نقطة البداية: صورة جاهزة فيها Debian و Python 3.12.

| الـ tag | فيه إيه |
|---|---|
| [[python:3.12]] | Debian كامل وأدوات build: كبيرة جدًا |
| [[python:3.12-slim]] | Debian متقلّص + Python: الاختيار العادي |
| [[python:3.12-alpine]] | أصغر، بس على musl بدل glibc، ومكتبات كتير بتتبني من الصفر عليها |

على Docker Desktop هنا [[docker images]] بيقول [[python:3.12-slim]] حجمها [[179MB]] (ورقم Docker Desktop بيعد الطبقات المفكوكة).

---

## ٢. [[ENV]]

~~~dockerfile
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1 PIP_DISABLE_PIP_VERSION_CHECK=1
~~~

[[ENV]] بيحط متغيرات بيئة في الصورة، وكل حاجة بتشتغل بعد كده (في البناء والتشغيل) بتشوفها:

| المتغير | بيعمل إيه |
|---|---|
| [[PYTHONDONTWRITEBYTECODE=1]] | Python ميكتبش ملفات [[.pyc]] (cache للكود المترجم) جنب الكود |
| [[PYTHONUNBUFFERED=1]] | [[print]] واللوج يطلعوا فورًا |
| [[PIP_DISABLE_PIP_VERSION_CHECK=1]] | pip ميسألش النت عن إصدار جديد ويطبع تحذير |

ليه [[PYTHONUNBUFFERED]] مهم؟ Python لما يحس إن الناتج مش رايح لترمنال (وده حال أي container)، بيجمّع الـ output في **buffer** ويطبعه دفعة واحدة. فـ [[docker logs]] يفضل فاضي، ولو الـ container وقع اللي في الـ buffer بيضيع. جوه الصورة المبنية [[os.environ["PYTHONUNBUFFERED"] ]] طلع [[1]].

---

## ٣. [[RUN apt-get ...]]

~~~dockerfile
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*
~~~

| الحتة | معناها |
|---|---|
| [[RUN]] | نفّذ أمر shell وقت البناء، والنتيجة layer |
| [[apt-get update]] | نزّل قوايم الباكدجات (الصورة مفيهاش قوايم) |
| [[install -y]] | سطّب من غير ما يسأل Y/N |
| [[--no-install-recommends]] | الباكدج بس، من غير «المقترحات» |
| [[curl]] | محتاجينه للـ HEALTHCHECK تحت |
| [[\]] | السطر مكمّل في اللي بعده |
| [[rm -rf /var/lib/apt/lists/*]] | امسح القوايم اللي نزلت |

ليه كله في [[RUN]] واحد؟ كل layer بتتحفظ زي ما هي. لو المسح في [[RUN]] تاني، القوايم هتفضل جوه الـ layer الأولانية والصورة متصغرش. [[docker history]] على الصورة اللي بنيتها قال إن الـ layer دي [[13.5MB]].

---

## ٤. [[WORKDIR]] و requirements

~~~dockerfile
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
~~~

- [[WORKDIR /app]] يعمل [[/app]] لو مش موجود، ويخليه الفولدر الحالي لكل اللي بعده.
- [[COPY requirements.txt .]] ينسخ الملف ده **بس** من جهازك لـ [[.]] (يعني [[/app]]).
- [[pip install -r]] يسطّب اللي في الملف، و [[--no-cache-dir]] من غير ما pip يحفظ نسخة من التحميلات جوه الصورة.

### ليه requirements لوحده الأول؟

Docker عنده **build cache**: لو الـ instruction والملفات اللي داخلة فيها متغيرتش، بيستخدم الـ layer القديمة. فلو غيّرت سطر في الكود بس، [[requirements.txt]] زي ما هو، فالـ pip install (أتقل خطوة) بيتاخد من الكاش في ثانية. لو كان [[COPY . .]] قبله، أي تعديل في أي ملف كان هيعيد تسطيب كل المكتبات.

---

## ٥. اليوزر

~~~dockerfile
RUN useradd -m -u 10001 app
COPY --chown=app:app . .
USER app
~~~

- [[useradd -m -u 10001 app]]: يوزر اسمه [[app]]، و [[-m]] يعمله home، و [[-u 10001]] رقمه (UID). رقم عالي عشان ميتلخبطش مع يوزرات موجودة على السيرفر.
- [[COPY --chown=app:app . .]]: انسخ كل الكود، والملفات ملك [[app]] (يوزر:جروب). من غير [[--chown]] كانت هتبقى ملك root، و [[RUN chown]] منفصل كان هيعمل layer تانية فيها نسخة من كل الملفات.
- [[USER app]]: من هنا ورايح (ومنها التطبيق نفسه) كله بيشتغل بـ [[app]].

جوه الـ container:

~~~text الناتج
$ docker compose exec app whoami
app
$ docker compose exec app id
uid=10001(app) gid=10001(app) groups=10001(app)
~~~

> وخلي بالك: [[WORKDIR /app]] عمل الفولدر نفسه ملك root ([[drwxr-xr-x 1 root root ... /app]])، فـ [[touch /app/x.txt]] طلع [[Permission denied]]. الملفات اللي جوه ملك app، بس ملف جديد في [[/app]] لأ.

---

## ٦. [[EXPOSE]] و [[HEALTHCHECK]]

~~~dockerfile
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD curl -fsS http://127.0.0.1:8080/health || exit 1
~~~

- [[EXPOSE 8080]] **توثيق**: بيقول التطبيق بيسمع على 8080، بس مبيفتحش بورت على جهازك. اللي بيفتح هو [[-p]] أو [[ports:]] في compose.
- [[HEALTHCHECK]]: Docker بيشغّل الأمر ده كل [[30s]] جوه الـ container، ولو أخد أكتر من [[3s]] يتحسب فشل.
- [[curl -fsS]]: [[-f]] يفشل (exit غير صفر) لو الرد 4xx أو 5xx، و [[-s]] ساكت من غير شريط تقدم، و [[-S]] بس يطبع الأخطاء.
- [[|| exit 1]]: لو curl فشل، اخرج بـ 1 = unhealthy.

بعد حوالي 45 ثانية [[docker compose ps]] قال:

~~~text الناتج
py04test-app-1 Up 45 seconds (healthy)
~~~

---

## ٧. [[CMD]]

~~~dockerfile
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080", "--proxy-headers", "--forwarded-allow-ips", "*"]
~~~

الأمر اللي بيشتغل لما الـ container يقوم. مكتوب **JSON array** (اسمه exec form):

| الشكل | اللي بيحصل |
|---|---|
| [[CMD ["uvicorn", ...] ]] | uvicorn نفسه هو PID 1، وبياخد SIGTERM من [[docker stop]] ويقفل بهدوء |
| [[CMD uvicorn ...]] | بيتشغّل جوه [[/bin/sh -c]]، والـ shell هو اللي بياخد الإشارة |

و [[*]] هنا آمنة من الـ glob: مفيش shell، والـ arguments بتوصل لـ uvicorn زي ما هي. (درس «uvicorn --proxy-headers» بيشرح الـ flags.)

---

## ٨. البناء والحجم

بنيتها بـ app فيه [[/health]] و requirements فيها [[fastapi==0.115.5]] و [[uvicorn[standard]==0.32.1]] (ومعاهم pytest و httpx للدرس اللي بعده)، و [[.dockerignore]] فيه [[.venv]] و [[__pycache__]] و [[.env]] و [[.git]]:

~~~bash
docker build -t py04test-app .
docker images py04test-app
~~~

~~~text الناتج
py04test-app 259MB
~~~

و [[docker history]] بيوري كل layer وحجمها (مختصر، الأحدث فوق):

~~~text الناتج
0B      CMD ["uvicorn" "app.main:app" ...
0B      HEALTHCHECK ...
0B      USER app
61.4kB  COPY --chown=app:app . .
69.6kB  RUN useradd -m -u 10001 app
48.8MB  RUN pip install --no-cache-dir -r requirements.txt
12.3kB  COPY requirements.txt .
13.5MB  RUN apt-get update && apt-get install ...
0B      ENV PYTHONDONTWRITEBYTECODE=1 ...
~~~

[[ENV]] و [[USER]] و [[CMD]] صفر: إعدادات بس. والتقيل المكتبات (48.8MB) و curl (13.5MB). والكود نفسه 61KB: لو لقيته ميجات كتير، غالبًا [[.dockerignore]] ناقص و [[.venv]] أو [[.git]] اتنسخوا.

---

## الخلاصة

| السطر | ليه |
|---|---|
| [[slim]] | صغيرة ومتوافقة |
| [[PYTHONUNBUFFERED=1]] | [[docker logs]] يبان فورًا |
| [[apt]] + [[rm]] في [[RUN]] واحد | الـ layer متشيلش قوايم |
| requirements قبل الكود | الكاش يوفّر الـ pip install |
| [[useradd]] + [[--chown]] + [[USER]] | مش root |
| [[HEALTHCHECK]] | [[(healthy)]] في [[docker ps]] |
| [[CMD]] JSON | [[docker stop]] يقفل بهدوء |`,
          lines: [
            "صورة Python صغيرة.",
            "لوج فوري، ومن غير .pyc، ومن غير رسالة تحديث pip.",
            "curl بس، من غير الإضافات...",
            "...وامسح قوايم apt في نفس الطبقة.",
            "فولدر التطبيق.",
            "المكتبات الأول (عشان الكاش).",
            "سطّبها من غير كاش pip.",
            "يوزر عادي.",
            "انسخ الكود ملك اليوزر ده.",
            "شغّل بيه مش root.",
            "البورت (توثيق).",
            "فحص صحة كل ٣٠ ثانية.",
            "شغّل uvicorn للإنتاج."
          ],
          sol: R`بنيتها بـ requirements فيه [[fastapi==0.115.5]] و [[uvicorn[standard]==0.32.1]] و app فيه [[/health]]: [[docker images]] طلّع الصورة [[262MB]]، والـ base [[python:3.12-slim]] لوحدها [[191MB]] (ده رقم Docker Desktop، وبيعد الطبقات المضغوطة والمفكوكة مع بعض؛ المضغوط اللي بينزل من النت حوالي 46 ميجا بس). لو طلعت قرب الجيجا، غالبًا نسيت [[.dockerignore]] فـ [[.venv]] و [[.git]] اتنسخوا جوه الصورة، أو استخدمت [[python:3.12]] مش slim.

[[docker compose exec app whoami]] طبع [[app]]. لو طبع [[root]] يبقى سطر [[USER app]] مش موجود أو الـ service بيستخدم صورة قديمة (اعمل [[docker compose up -d --build]]). وبعد حوالي 40 ثانية [[docker ps]] ورّاني [[Up 49 seconds (healthy)]]. لو [[(unhealthy)]] شوف [[docker inspect --format '{{json .State.Health}}' <id>]]: غالبًا مفيش route اسمه [[/health]].

وخد بالك: [[WORKDIR /app]] بيعمل الفولدر ملك root، و [[COPY --chown]] بيغيّر الملفات اللي جواه بس، فالتطبيق مايقدرش يعمل ملف جديد في [[/app]] نفسه. اللي يكتب ملفات يكتبها في volume أو فولدر انت عامله وعامل له chown.`
        },
        {
          cmd: "docker compose run --rm --no-deps",
          title: "الاختبارات جوه الـ container",
          desc: "[[docker compose run --rm app pytest]] بيعمل container مؤقت من نفس الصورة بنفس الإعدادات، ويشغّل الاختبارات، ويتمسح. [[--no-deps]] من غير ما يقوّم القاعدة والخدمات التانية. و [[exec -T]] يشغّل أمر جوه container شغال فعلًا.",
          example: R`docker compose run --rm --no-deps app python -m pytest -q
docker compose run --rm app python -m pytest -q -x
docker compose exec -T app python -m app.seed data/foods.csv
docker compose exec -T app python -m app.backlog --dry-run
docker compose run --rm -e LOG_LEVEL=debug app python -m app.check`,
          try: "شغّل الاختبارات بـ run --rm --no-deps، وبعدين [[docker ps -a]] واتأكد إنه مفيش containers فاضلة.",
          deep: {
            why: "الاختبارات على جهازك محتاجة venv متفعّل ونسخة Python معيّنة. جوه الـ container هي نفس Python ونفس المكتبات اللي في الإنتاج بالظبط.",
            how: R`[[run]] بيعمل container جديد من تعريف الخدمة (الصورة والـ env والـ volumes)، بس بيشغّل الأمر اللي كتبته بدل الـ CMD. [[--rm]] يمسحه لما يخلص.

[[--no-deps]]: من غيرها compose بيقوّم كل اللي في [[depends_on]] (postgres مثلًا) الأول. لاختبارات الوحدات اللي مش محتاجة قاعدة، ده وقت على الفاضي. لاختبارات الـ integration شيله.

[[exec]] بيدخل container شغال فعلًا. [[-T]] من غير terminal: خليها في السكربتات والـ Makefile و CI. Compose v5 بيكتشف لوحده لو مفيش terminal (جربت [[echo hi | docker compose exec app cat]] من غير [[-T]] واشتغل)، بس الإصدارات القديمة كانت بتقع بـ [[the input device is not a TTY]]، و [[-T]] بتضمن نفس السلوك في كل مكان.

[[-e]] بيزوّد متغير بيئة للتشغيل ده بس.

الصورة لازم يبقى فيها فولدر tests. لو الـ .dockerignore بيستبعده عشان الإنتاج، اعمل bind mount في compose للتطوير.

ومش هتحتاج venv على جهازك خالص، لأن الـ container هو البيئة.`,
            when: "مشروع شغال بـ compose. وفي CI عشان يختبر نفس الصورة اللي هتنزل.",
            mistakes: R`[[run]] من غير [[--rm]]: containers واقفة بتتراكم ([[docker ps -a]]). و [[exec]] من غير [[-T]] في CI. والأخطر: اختبارات بتمسح وتعمل بيانات تتشغّل بـ exec على سيرفر الإنتاج فتمسح بيانات حقيقية. في مشروع حقيقي أمر [[make test]] كان بيشغّل pytest على الجهاز ومحتاج venv متفعّل، فكان بيفشل عند أي حد جديد لحد ما اتنقل جوه compose.`
          },
          teach: R`## الأوامر دي بتعمل إيه؟

بتشغّل أوامر Python (الاختبارات وسكربتات المشروع) **جوه** نفس الصورة اللي هتنزل الإنتاج، بدل venv على جهازك. وفيه طريقتين: [[run]] يعمل container جديد مؤقت، و [[exec]] يدخل container شغال فعلًا.

جربت الأوامر الخمسة على مشروع تجربة: الصورة بتاعة درس Dockerfile، و [[compose.yaml]] فيه service اسمها [[app]] ومعاها [[db]] (postgres) في [[depends_on]]، وفولدر [[tests]] فيه اختبار لـ [[/health]]، وموديولات صغيرة [[app/seed.py]] و [[app/backlog.py]] و [[app/check.py]] بتطبع اللي وصلها. (Docker Compose v5.3.0.)

---

## ١. السطر الأول حتة حتة

~~~bash
docker compose run --rm --no-deps app python -m pytest -q
~~~

| الحتة | معناها |
|---|---|
| [[docker compose]] | اشتغل على المشروع اللي في [[compose.yaml]] في الفولدر ده |
| [[run]] | اعمل container **جديد** من تعريف الـ service: نفس الصورة والـ env والـ volumes والشبكة |
| [[--rm]] | امسحه أول ما يخلص |
| [[--no-deps]] | متقوّمش الـ services اللي في [[depends_on]] |
| [[app]] | اسم الـ service |
| [[python -m pytest -q]] | الأمر، بدل الـ [[CMD]] بتاع الصورة |

- [[python -m pytest]] بدل [[pytest]] لوحده: [[-m]] بيشغّل الموديول، وبيحط الفولدر الحالي ([[/app]]) في مسار الـ imports، فـ [[from app.main import app]] جوه الاختبار يلاقي الكود.
- [[-q]] (quiet): ناتج مختصر.

~~~text الناتج (آخر سطر)
1 passed, 3 warnings in 0.36s
~~~

والـ exit code بتاع الأمر كله هو بتاع pytest: طلع [[0]]. ده اللي CI بيبص عليه.

### التحذير اللي ظهر

~~~text الناتج
PytestCacheWarning: could not create cache path /app/.pytest_cache/v/cache/stepwise: [Errno 13] Permission denied
~~~

الاختبار عدّى، بس pytest عايز يكتب فولدر [[.pytest_cache]] في [[/app]]، و [[/app]] ملك root والصورة شغالة بيوزر [[app]]. [[-p no:cacheprovider]] بيقفل الـ plugin ده، وبعدها التحذير ده اختفى (فضل تحذير deprecation من مكتبة تانية ملوش علاقة).

---

## ٢. السطر التاني: مع الـ deps

~~~bash
docker compose run --rm app python -m pytest -q -x
~~~

من غير [[--no-deps]]، compose قوّم [[db]] الأول وبعدين شغّل الاختبارات. بعدها [[docker ps -a]]:

~~~text الناتج
py04test-db-1 Up 2 seconds
~~~

- الـ container المؤقت اتمسح ([[--rm]])، بس **الـ db فضلت شغالة**. [[--rm]] بيمسح الـ container بتاع الأمر بس، مش الـ deps. ([[docker compose down]] هو اللي بيقفل الكل.)
- [[-x]] (exitfirst): أول اختبار يفشل، pytest يقف.

| | [[--no-deps]] | من غيرها |
|---|---|---|
| بيقوّم الـ db | لأ | آه |
| أسرع | آه | لأ |
| لاختبارات محتاجة قاعدة | هتفشل بـ connection refused | تمام |

---

## ٣. [[exec -T]]: جوه container شغال

~~~bash
docker compose exec -T app python -m app.seed data/foods.csv
docker compose exec -T app python -m app.backlog --dry-run
~~~

[[exec]] مش بيعمل container، بيشغّل الأمر جوه [[app]] اللي قايم فعلًا (لازم [[docker compose up -d]] قبلها، وإلا [[service "app" is not running]]):

~~~text الناتج
seed got ['data/foods.csv']
backlog args ['--dry-run']
~~~

- [[python -m app.seed]] يشغّل [[app/seed.py]]. الـ arguments اللي بعده بتوصله في [[sys.argv]] زي ما هي. (الأسماء دي من مشروع، في مشروعك هتبقى موديولاتك.)
- [[-T]]: من غير **TTY** (terminal). الأوامر التفاعلية محتاجة TTY، بس السكربتات و CI والـ pipes لأ. جربت [[echo hi | docker compose exec app cat]] من غير [[-T]] وطبع [[hi]]: Compose v5 بيكتشف لوحده إن مفيش terminal. بس [[docker exec -it]] في نفس الموقف طلع [[cannot attach stdin to a TTY-enabled container because stdin is not a terminal]]، والإصدارات القديمة من compose كانت بتقع بـ [[the input device is not a TTY]]. فـ [[-T]] في السكربتات بتخليها شغالة في كل الحالات.

---

## ٤. [[-e]]: متغير لمرة واحدة

~~~bash
docker compose run --rm -e LOG_LEVEL=debug app python -m app.check
~~~

~~~text الناتج
LOG_LEVEL = debug
~~~

[[-e NAME=value]] بيزوّد (أو يغيّر) متغير بيئة للـ container ده بس، من غير ما تلمس [[compose.yaml]] أو [[.env]].

---

## ٥. [[run]] ولا [[exec]]؟ ومن غير [[--rm]]؟

| | [[run]] | [[exec]] |
|---|---|---|
| container جديد؟ | آه | لأ، الشغال |
| محتاج الـ service قايمة؟ | لأ | آه |
| بيقوّم الـ deps | آه، إلا مع [[--no-deps]] | — |
| بيفضل بعدها؟ | لو من غير [[--rm]] | — |

جربت [[docker compose run --no-deps app true]] من غير [[--rm]]، و [[docker ps -a]] لقى:

~~~text الناتج
py04test-app-run-87854770e536 Exited (0) Less than a second ago
~~~

ده اللي بيتراكم: كل [[run]] من غير [[--rm]] يسيب واحد زيه. امسحه باسمه: [[docker rm py04test-app-run-87854770e536]].

---

## الخلاصة

| الأمر | استخدمه لـ |
|---|---|
| [[run --rm --no-deps app python -m pytest -q]] | unit tests بسرعة |
| [[run --rm app python -m pytest -q -x]] | اختبارات محتاجة الـ db |
| [[exec -T app python -m ...]] | سكربت جوه التطبيق الشغال |
| [[run --rm -e VAR=x app ...]] | تشغيل بإعداد مختلف مرة واحدة |

ومتشغّلش سكربتات بتمسح أو تعمل بيانات بـ [[exec]] على سيرفر الإنتاج إلا وانت عارف إنها قاعدة الإنتاج الحقيقية.`,
          lines: [
            "الاختبارات في container مؤقت، من غير ما تقوّم القاعدة.",
            "الاختبارات مع القاعدة والخدمات التانية.",
            "شغّل سكربت جوه الـ container الشغال (من غير terminal). app.seed هنا اسم موديول في مشروعك.",
            "سكربت تاني في وضع العرض بس.",
            "تشغيل بمتغير بيئة إضافي."
          ],
          sol: R`جربتها على الصورة بتاعة درس Dockerfile، ومعاها service اسمها db (postgres) في [[depends_on]]، وفولدر tests فيه اختبار لـ [[/health]]. الأمر الأول طبع ناتج pytest العادي، [[1 passed]]، والـ exit code بتاعه هو بتاع pytest (0 لو كله نجح). [[--no-deps]] معناها إنه مابيشغّلش الـ db ولا أي service في [[depends_on]]، فلو اختباراتك محتاجة قاعدة بيانات هتفشل بـ connection refused، وساعتها شيل [[--no-deps]].

ومع الـ Dockerfile ده طلع تحذير [[PytestCacheWarning: could not create cache path /app/.pytest_cache ... Permission denied]]: الاختبارات عدّت، بس pytest مش قادر يكتب الكاش لأن [[/app]] ملك root والتطبيق شغال بيوزر app. [[python -m pytest -q -p no:cacheprovider]] بيشيله.

و [[exec -T app python -m app.seed data/foods.csv]] و [[-e LOG_LEVEL=debug]] اشتغلوا على موديولات تجربة عملتها بنفس الأسماء: الأول وصّل [[data/foods.csv]] للسكربت، والتاني السكربت شاف [[LOG_LEVEL = debug]].

[[docker ps -a]] بعدها مورّانيش أي container من نوع [[project-app-run-a1b2c3]]، لأن [[--rm]] مسحه، ومورّانيش الـ db كمان بسبب [[--no-deps]]. لو لقيت واحد [[Exited]] يبقى شغّلت مرة من غير [[--rm]]، امسحه بـ [[docker rm]] أو [[docker container prune]].`
        }
      ]
    }
]);

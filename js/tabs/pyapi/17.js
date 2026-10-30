// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "httpx و Redis والشغل في الخلفية",
      l: 3,
      time: R`حوالي ٥ ساعات (ساعة لكل درس، وساعة للمشاريع الصغيرة)`,
      goal: [
        R`تكلّم API خارجي بـ client واحد مشترك، و timeout صريح لكل نوع، و retry بـ backoff للأخطاء المؤقتة بس، وتختبره من غير نت بـ [[httpx.MockTransport]].`,
        R`تعمل cache-aside بـ Redis بـ TTL، وتمسح المفتاح لما الداتا تتغير، وتمنع الـ stampede بـ lock، والتطبيق يكمّل لو Redis وقع.`,
        R`تحدد عدد الطلبات لكل مستخدم بعداد في Redis يشتغل مع كل الـ workers، وتعرف عيب الـ fixed window وإمتى تحتاج sliding window.`,
        R`تفرّق بين شغل ينفع يضيع (BackgroundTasks) وشغل لازم يحصل (queue و worker)، وتعرف حدود BackgroundTasks بالقياس.`,
      ],
      use: {
        prog: R`أي API حقيقي بيكلّم خدمات تانية (دفع، شحن، SMS) وبيحتاج cache وحماية من الإغراق. الوحدة دي هي الفرق بين API بيشتغل على جهازك و API بيستحمل الإنتاج.`,
        work: R`أشهر أعطال الإنتاج هنا: خدمة خارجية بطيئة من غير timeout بتوقّف الـ API كله، و cache من غير TTL، و login من غير rate limit، وإيميل ضاع في deploy. كل واحدة منهم ليها درس وقياس.`,
        cs: R`الـ connection pooling و keep-alive (TCP و TLS handshake)، و exponential backoff، والـ hash tables في Redis، والـ atomic operations ([[INCR]] و [[SET NX]])، و at-most-once مقابل at-least-once.`,
      },
      lab: R`docker run -d --rm --name redis -p 6379:6379 redis:7-alpine
python -m venv .venv && source .venv/bin/activate   # ويندوز: .\.venv\Scripts\Activate.ps1
pip install "fastapi[standard]" redis pytest`,
      projects: [
        { lvl: 'صغير', t: R`client بيقيس نفسه`, what: R`سكربت بيعمل ٢٠٠ طلب لسيرفر FastAPI محلي مرة بـ client واحد ومرة بـ client جديد لكل طلب، ويطبع الوقت لكل طلب. من درس «httpx.AsyncClient».`, done: R`السكربت بيطبع سطرين فيهم عدد الطلبات والوقت الكلي والمتوسط، والـ client المشترك أسرع بفرق واضح (عندنا على ويندوز ١.٤ms مقابل ٢٣٠ms)، وكاتب في تعليق ليه.` },
        { lvl: 'صغير', t: R`عداد زيارات بـ TTL`, what: R`endpoint [[/visits]] بيعمل [[INCR]] على مفتاح لكل يوم ([[visits:2026-10-30]]) بعمر ٤٨ ساعة، ويرجّع العدد. من درسي «redis cache» و «redis rate limit».`, done: R`كل طلب بيزوّد العدد واحد، و [[TTL]] على المفتاح موجب (مش [[-1]])، ولو Redis واقف الـ endpoint بيرجّع 503 برسالة مش 500.` },
        { lvl: 'متوسط', t: R`proxy لـ API بطيء`, what: R`endpoint بيجيب سعر صرف من API خارجي (اعمله FastAPI تاني بيستنى ثانية) عبر client مشترك بـ timeout و retry، ويحفظ الرد في Redis ٥ دقايق بـ lock ضد الـ stampede. من أول درسين.`, done: R`أول طلب حوالي ثانية والتاني أقل من ١٠ ملّي ثانية، و ١٠٠ طلب مع بعض على cache فاضي بيعملوا نداء واحد بس للـ API الخارجي (عدّاد في السيرفر التاني بيأكد)، ولو الخارجي واقع الرد 502.` },
        { lvl: 'متوسط', t: R`login محمي`, what: R`[[/auth/login]] و [[/auth/otp]] بحدود مختلفة ([[rate_limit(5)]] و [[rate_limit(3, 300)]]) بالـ IP، والـ client بتاع Redis في الـ lifespan، و ٤ اختبارات بـ TestClient. من درس «redis rate limit».`, done: R`الاختبارات بتعدّي مرتين ورا بعض (مفيش [[Event loop is closed]])، والطلب السادس على login بيرجّع 429 ومعاه [[Retry-After]] رقم بين ١ و ٦٠، والـ OTP بيقفل بعد ٣.` },
        { lvl: 'كبير', t: R`خدمة تسجيل متينة`, what: R`[[POST /signup]] بيحفظ اليوزر، وبيبعت إيميل الترحيب من BackgroundTasks، وبيكتب «إيميل التأكيد» (المهم) في قايمة في Redis ([[LPUSH]]) بيسحب منها worker منفصل ([[BRPOP]]) ويعيد لحد ٣ مرات بـ backoff. ومعاه rate limit و لوج JSON. من الوحدة كلها ومن وحدة Dependencies.`, done: R`لو قفلت الـ API بـ [[kill -9]] بعد الطلب، إيميل التأكيد لسه بيتبعت لما الـ worker يشتغل. ولو الـ worker فشل مرتين ونجح التالتة اللوج فيه ٣ سطور بالمحاولات. والـ endpoint بيرجّع 429 بعد الحد، والمشروع فيه اختبارات بتعدّي مرتين ورا بعض.`, ext: R`بدّل القايمة بمكتبة queue حقيقية زي arq أو Celery (درس Celery و ARQ في التاب ده)، وزوّد dead-letter list للمهام اللي فشلت ٣ مرات، و endpoint بيعرض عددها.` },
        { lvl: 'فكرة', t: R`gateway لخدماتك`, what: R`خدمة صغيرة قدام ٢ أو ٣ APIs خارجية بتستخدمها (طقس، صرف، شحن): client واحد لكل واحدة بـ timeout مختلف، و cache لكل نوع رد بـ TTL مختلف، و rate limit لكل API key. انت اللي بتختار الخدمات والحدود.`, done: R`كل خدمة ليها timeout و TTL مكتوبين في الإعدادات مش في الكود، والـ gateway بيرجّع 502 برسالة واضحة لو خدمة واقعة من غير ما الباقي يتأثر، وفيه README بأرقام القياس قبل وبعد الـ cache.`, ext: R`زوّد circuit breaker (لو خدمة فشلت ٥ مرات ورا بعض متكلّمهاش ٣٠ ثانية)، و metrics بعدد الـ hits والـ misses، ولوحة بسيطة بتعرضها.` },
      ],
      n: "تكلّم APIs تانية صح، و cache و rate limit بـ Redis، وشغل بعد الرد أو في worker",
      items: [
        {
          cmd: "httpx.AsyncClient",
          title: "تكلّم API خارجي من جوه الـ API بتاعك",
          desc: R`[[httpx.AsyncClient]] واحد مشترك للتطبيق كله (يتعمل في الـ lifespan)، مش client جديد مع كل request: بيعيد استخدام الاتصالات (keep-alive)، وده فرق كبير في السرعة. وحدد timeout دايمًا، و [[raise_for_status()]] عشان الـ 4xx و 5xx تبقى exceptions.

وللمحاولة تاني عند فشل مؤقت: retry بـ backoff (مكتبة tenacity، أو loop بسيطة)، بس للطلبات الآمنة (GET، أو اللي فيها idempotency key).

ملحوظة 2026: httpx نفسه نشاطه قلّ، و Pydantic بقت بتصون استكمال ليه اسمه [[httpx2]] بنفس الـ API بالظبط (الفرق [[import httpx2]])، و Starlette الحديث بيفضّله للـ TestClient. و [[fastapi[standard]]] 0.162 بيسطّب الاتنين ([[httpx 0.28.1]] و [[httpx2 2.16.0]] عندنا)، والأمثلة هنا بـ httpx لأنه الأشهر في المشاريع الموجودة، والنقل غالبًا تغيير اسم الـ import بس.`,
          example: R`import asyncio
from contextlib import asynccontextmanager
import httpx
from fastapi import FastAPI, HTTPException, Request
@asynccontextmanager
async def lifespan(app: FastAPI):
    async with httpx.AsyncClient(
        base_url="https://api.payments.example",
        timeout=httpx.Timeout(5.0, connect=2.0),
        limits=httpx.Limits(max_connections=50, max_keepalive_connections=20),
        headers={"User-Agent": "shop-api/1.0"},
    ) as client:
        app.state.http = client
        yield
app = FastAPI(lifespan=lifespan)
async def get_json(client: httpx.AsyncClient, url: str, tries: int = 3) -> dict:
    for attempt in range(tries):
        try:
            r = await client.get(url)
            r.raise_for_status()
            return r.json()
        except (httpx.TransportError, httpx.HTTPStatusError) as e:
            retryable = isinstance(e, httpx.TransportError) or e.response.status_code == 429 or e.response.status_code >= 500
            if not retryable or attempt == tries - 1:
                raise
            await asyncio.sleep(0.2 * 2**attempt)
    raise RuntimeError("unreachable")
@app.get("/payments/{pid}")
async def payment(pid: str, request: Request):
    try:
        return await get_json(request.app.state.http, f"/v1/payments/{pid}")
    except httpx.HTTPError:
        raise HTTPException(502, "payment provider unavailable")`,
          try: R`خلّي الـ [[base_url]] يبقى [[https://httpbin.org]] واطلب [[/status/503]] وشوف الـ retries في اللوج (شغّل [[logging.basicConfig(level=logging.INFO)]]، و httpx بيسجّل كل طلب). وبعدين [[/delay/10]] وشوف الـ timeout.`,
          flag: "script",
          deep: {
            why: R`الـ API بتاعك بيعتمد على خدمات تانية: دفع، وشحن، و SMS، و AI. لو واحدة بطيئة أو واقعة ومفيش timeout، الطلبات عندك بتتراكم لحد ما الـ API كله يقف. ولو كل request بيعمل client جديد، كل طلب بيعمل TCP و TLS handshake من الأول.`,
            how: R`[[AsyncClient]] جواه connection pool: [[max_connections]] أقصى اتصالات مفتوحة، و [[max_keepalive_connections]] اللي بيفضلوا مفتوحين للطلب الجاي. و [[async with]] بيقفل كل الاتصالات لما التطبيق يقفل.

[[httpx.Timeout(5.0, connect=2.0)]]: ٥ ثواني لكل حاجة (read و write و pool)، و ٢ للاتصال. والـ timeout الافتراضي في httpx ٥ ثواني (عكس [[requests]] اللي ملوش timeout خالص)، بس اكتبه صريح عشان تفكّر فيه.

[[raise_for_status()]] بيرمي [[HTTPStatusError]] لأي 4xx أو 5xx، و [[TransportError]] للمشاكل قبل الرد (timeout، واتصال اتقطع)، و [[HTTPError]] الأب للاتنين.

الـ retry: exponential backoff (0.2 وبعدين 0.4 وبعدين 0.8)، وبس للأخطاء المؤقتة (شبكة و 5xx و 429)، مش 400 أو 404. ومع 429 احترم header الـ [[Retry-After]] لو موجود. ومتعملش retry لـ POST بيدفع فلوس إلا لو الـ API بيدعم idempotency key (تاب «APIs متقدمة»). ومكتبة tenacity بتعمل ده بـ decorator.

ورد الخدمة الخارجية يتفحص بـ Pydantic ([[Payment.model_validate(r.json())]]) زي أي داتا جاية من برّه. وفي الاختبارات، [[httpx.MockTransport]] أو مكتبة respx بتبدّل الـ API الحقيقي.`,
            when: R`أي نداء لـ API تاني من جوه تطبيق async. وفي السكربتات الـ sync العادية، [[httpx.Client]] بنفس الـ API من غير await.`,
            mistakes: R`[[requests]] جوه [[async def]]. و [[async with httpx.AsyncClient() as c:]] جوه كل route (مفيش إعادة استخدام للاتصالات). ومفيش timeout، أو timeout ٦٠ ثانية. و retry من غير حد أو من غير backoff (بتضرب خدمة واقعة أصلًا). وترجّع خطأ الخدمة الخارجية للعميل زي ما هو بدل 502.`
          },
          teach: R`## المثال بيعمل إيه؟

الـ API بتاعك بيكلّم API تاني (مزوّد دفع). بيعمل **client واحد** للتطبيق كله في الـ lifespan، ودالة [[get_json]] بتعيد المحاولة لو الفشل مؤقت، و route بيحوّل أي فشل من المزوّد لـ 502.

اتشغّل فعلًا بـ httpx 0.28 و FastAPI 0.142 على ويندوز. بدل [[https://api.payments.example]] (مش موجود) عملت FastAPI صغير تاني على بورت تاني يقلّد المزوّد: [[/v1/payments/{pid}]] بيرجّع دفع، و [[/status/{code}]] بيرجّع الكود اللي تطلبه، و [[/delay/{n}]] بيستنى n ثانية. وحطيت [[logging.basicConfig(level=logging.INFO)]] عشان httpx بيسجّل كل طلب.

---

## ١. الـ imports

~~~python
import asyncio
from contextlib import asynccontextmanager
import httpx
from fastapi import FastAPI, HTTPException, Request
~~~

[[httpx]] مكتبة HTTP فيها نسخة sync ([[httpx.Client]]) ونسخة async ([[httpx.AsyncClient]]) بنفس الـ API. و [[asyncio]] عشان [[asyncio.sleep]] بين المحاولات.

---

## ٢. الـ client في الـ lifespan

~~~python
@asynccontextmanager
async def lifespan(app: FastAPI):
    async with httpx.AsyncClient(
        base_url="https://api.payments.example",
        timeout=httpx.Timeout(5.0, connect=2.0),
        limits=httpx.Limits(max_connections=50, max_keepalive_connections=20),
        headers={"User-Agent": "shop-api/1.0"},
    ) as client:
        app.state.http = client
        yield
app = FastAPI(lifespan=lifespan)
~~~

| الإعداد | معناه |
|---|---|
| [[base_url]] | أي طلب بمسار نسبي ([[/v1/payments/x]]) بيتلزق عليه |
| [[httpx.Timeout(5.0, connect=2.0)]] | ٥ ثواني لكل حاجة، و ٢ بس لفتح الاتصال |
| [[max_connections=50]] | أقصى اتصالات مفتوحة في نفس الوقت |
| [[max_keepalive_connections=20]] | كام اتصال يفضل مفتوح فاضي مستني الطلب الجاي (keep-alive) |
| [[headers]] | headers بتتبعت مع كل طلب |

و [[httpx.Timeout(5.0, connect=2.0)]] لو طبعته:

~~~text الناتج
Timeout(connect=2.0, read=5.0, write=5.0, pool=5.0)
~~~

أربع timeouts: [[connect]] (فتح الاتصال)، و [[read]] (استنى بيانات من الرد)، و [[write]] (بعت الطلب)، و [[pool]] (استنى اتصال فاضي من الـ pool). والافتراضي من غير ما تكتب حاجة [[Timeout(timeout=5.0)]] لكلهم.

و [[async with ... as client]] حوالين الـ [[yield]]: الـ client بيعيش طول عمر التطبيق، ولما يقفل كل الاتصالات تتقفل. ليه مش client جديد في كل طلب؟ كل client جديد = اتصال TCP جديد + TLS handshake جديد، والـ client المشترك بيعيد استخدام الاتصال المفتوح.

---

## ٣. [[get_json]]: retry بـ backoff

~~~python
async def get_json(client: httpx.AsyncClient, url: str, tries: int = 3) -> dict:
    for attempt in range(tries):
        try:
            r = await client.get(url)
            r.raise_for_status()
            return r.json()
        except (httpx.TransportError, httpx.HTTPStatusError) as e:
            retryable = isinstance(e, httpx.TransportError) or e.response.status_code == 429 or e.response.status_code >= 500
            if not retryable or attempt == tries - 1:
                raise
            await asyncio.sleep(0.2 * 2**attempt)
    raise RuntimeError("unreachable")
~~~

### سطر سطر

- [[for attempt in range(tries)]]: [[attempt]] هتبقى 0 و 1 و 2.
- [[await client.get(url)]]: الطلب. [[url]] نسبي، فبيتلزق على [[base_url]].
- [[r.raise_for_status()]]: لو الكود 4xx أو 5xx ارمي [[HTTPStatusError]]. من غيره httpx بيعتبر 500 رد عادي.
- [[return r.json()]]: نجح؟ حوّل الـ body لـ dict وارجع، والـ loop تقف.
- [[except (A, B) as e]]: امسك أي واحد من النوعين، و [[e]] هو الخطأ.

### شجرة أخطاء httpx

~~~text
HTTPError
├── HTTPStatusError      الرد وصل بس كوده 4xx أو 5xx  (فيه e.response)
└── RequestError
    └── TransportError   الرد موصلش أصلًا
        └── TimeoutException
            └── ReadTimeout و ConnectTimeout ...
~~~

(طبعت الـ [[__mro__]] بتاع [[ReadTimeout]] و [[HTTPStatusError]] وده الترتيب اللي طلع.)

### [[retryable]]

يستاهل نعيد لو: مشكلة شبكة ([[TransportError]]، ومفيش [[e.response]] أصلًا)، أو 429 (Too Many Requests)، أو 5xx (المشكلة عندهم ومؤقتة غالبًا). و [[or]] بتقف عند أول [[True]]، فـ [[e.response]] مبيتقريش لو الخطأ [[TransportError]].

- [[if not retryable or attempt == tries - 1: raise]]: مش مؤقت (زي 404)، أو دي آخر محاولة؟ [[raise]] من غير حاجة بيرمي **نفس** الخطأ تاني.
- [[0.2 * 2**attempt]]: [[**]] أُس. فالانتظار 0.2 بعد الأولى، و 0.4 بعد التانية. ده exponential backoff: كل مرة ضعف اللي قبلها، عشان متضربش خدمة واقعة.
- [[raise RuntimeError("unreachable")]]: مش هنوصله أبدًا (آخر محاولة يا بترجع يا بترمي)، بس من غيره أدوات زي mypy هتقول إن الدالة ممكن ترجع [[None]].

---

## ٤. الـ route

~~~python
@app.get("/payments/{pid}")
async def payment(pid: str, request: Request):
    try:
        return await get_json(request.app.state.http, f"/v1/payments/{pid}")
    except httpx.HTTPError:
        raise HTTPException(502, "payment provider unavailable")
~~~

- [[request.app.state.http]]: الـ client المشترك.
- [[except httpx.HTTPError]]: الأب، فبيمسك الاتنين.
- [[502 Bad Gateway]]: «أنا شغال، بس الخدمة اللي ورايا ردّت غلط». مش 500 (bug عندي) ولا 4xx (غلطة العميل).

---

## ٥. نجرّب

### طلب ناجح

~~~text curl -i localhost:8000/payments/pay_123
HTTP/1.1 200 OK
{"id":"pay_123","status":"paid","amount_cents":4500}
~~~

### المزوّد بيرجّع 503

عملت route تجربة بينادي [[get_json]] على [[/status/503]]. لوج السيرفر:

~~~text الناتج
12:30:09,577 INFO:httpx:HTTP Request: GET http://localhost:5873/status/503 "HTTP/1.1 503 Service Unavailable"
12:30:09,800 INFO:httpx:HTTP Request: GET http://localhost:5873/status/503 "HTTP/1.1 503 Service Unavailable"
12:30:10,222 INFO:httpx:HTTP Request: GET http://localhost:5873/status/503 "HTTP/1.1 503 Service Unavailable"
final error: HTTPStatusError("Server error '503 Service Unavailable' for url 'http://localhost:5873/status/503' ...")
~~~

٣ محاولات، بينهم ٠.٢٢ ثانية وبعدين ٠.٤٢ (الـ backoff + وقت الطلب). والعميل خد [[502]] و [[{"detail":"payment provider unavailable"}]].

### المزوّد بيرجّع 404

~~~text الناتج
12:30:10,316 INFO:httpx:HTTP Request: GET http://localhost:5873/status/404 "HTTP/1.1 404 Not Found"
final error: HTTPStatusError("Client error '404 Not Found' for url ...")
~~~

طلب **واحد** بس: 404 مش مؤقت، وإعادته مش هتغيّر حاجة.

### المزوّد بطيء ([[/delay/10]])

~~~text curl -o /dev/null -w "%{http_code} in %{time_total}s\n" ...
502 in 16.185686s
~~~

- [[-o /dev/null]]: ارمي الـ body. و [[-w]]: اطبع بعد ما يخلص الكود والوقت.
- كل محاولة وقفت بعد ٥ ثواني بـ [[ReadTimeout]]، وده [[TransportError]] فبيتعاد. ٣ × ٥ + 0.6 backoff + وقت فتح اتصال جديد بعد كل timeout ≈ ١٦ ثانية.
- يعني الـ retry **بيضرب** الـ timeout في عدد المحاولات. لو عندك حد أقصى لوقت الرد، احسبه على كده.

---

## ٦. client واحد ولا client لكل طلب؟ بالأرقام

اتشغّل فعلًا (httpx 0.28.1، نفس المزوّد المحلي): ٢٠٠ طلب ورا بعض، مرة بـ client واحد ومرة بـ [[async with httpx.AsyncClient() as c:]] جوه الـ loop.

~~~text الناتج (ويندوز، Python 3.14)
shared: 200 requests in 0.28s = 1.4ms each
fresh: 200 requests in 45.99s = 230.0ms each
~~~

~~~text الناتج (لينكس، python:3.13-slim في Docker)
shared: 200 requests in 0.46s = 2.3ms each
fresh: 200 requests in 2.08s = 10.4ms each
~~~

الفرق على ويندوز ١٦٠ مرة، وده كان مفاجأة. قسنا عمل الـ client نفسه من غير أي طلب:

~~~text الناتج
AsyncClient() x10 233.2 ms each     (ويندوز)
AsyncClient() x10 12.2 ms each      (لينكس)
~~~

يعني أغلب الوقت مش في الشبكة: كل [[AsyncClient()]] بيبني SSL context ويحمّل شهادات الـ CA كلها، **حتى لو الطلب [[http://]]** من غير TLS. وده بيحصل قبل أي اتصال. ولو الخدمة [[https]] حقيقية، هتدفع فوقه TCP handshake و TLS handshake مع كل طلب. فالـ client المشترك مش «تحسين صغير»، ده فرق بين API بيرد في ملّي ثانية و API بيرد في ربع ثانية.

---

## ٧. الـ timeouts الأربعة بالتجربة

~~~python
async with httpx.AsyncClient(limits=httpx.Limits(max_connections=1), timeout=httpx.Timeout(5.0, pool=0.2)) as c:
    res = await asyncio.gather(c.get(".../delay/1"), c.get(".../delay/1"), return_exceptions=True)
~~~

- [[max_connections=1]]: اتصال واحد بس مسموح. فالطلب التاني لازم يستنى الأول يخلص.
- [[pool=0.2]]: أقصى انتظار لاتصال فاضي من الـ pool ٠.٢ ثانية.
- [[return_exceptions=True]]: [[gather]] يرجّع الـ exception كقيمة بدل ما يرمي، عشان نشوف الاتنين.

~~~text الناتج
[200, 'PoolTimeout']
~~~

الطلب التاني مستناش ثانية، وقع بعد ٠.٢ بـ [[PoolTimeout]]. ده اللي بيحصل في الإنتاج لما [[max_connections]] صغير والخدمة بطيئة: الطلبات بتقع عندك قبل ما توصل للخدمة أصلًا. والحالات التانية:

| الـ exception | اتجرّب إزاي | معناه |
|---|---|---|
| [[ReadTimeout]] | [[timeout=1.0]] على [[/delay/3]] | الاتصال اتفتح والطلب اتبعت، بس الرد متأخر أكتر من [[read]] |
| [[ConnectError('All connection attempts failed')]] | بورت مفيش عليه سيرفر | مفيش حد بيسمع، أو الـ host غلط |
| [[PoolTimeout]] | [[max_connections=1]] وطلبين مع بعض | كل الاتصالات مشغولة، والانتظار عدّى [[pool]] |

و [[isinstance(ReadTimeout(...), httpx.TransportError)]] طلعت [[True]]، فالـ [[get_json]] بتاعتنا بتعيدها.

> **مفاجأة ويندوز:** [[ConnectError]] على بورت مقفول على [[127.0.0.1]] أخدت **٢.٠٧ ثانية** مش لحظة، لأن ويندوز بيعيد محاولة الاتصال قبل ما يستسلم. على لينكس بترجع فورًا. فلو بتختبر «الخدمة واقعة» على ويندوز، الوقت المقاس مش هو وقت الإنتاج.

---

## ٨. retry جوه الـ transport: للاتصال بس

httpx فيه retry جاهز:

~~~python
transport = httpx.AsyncHTTPTransport(retries=2)
client = httpx.AsyncClient(transport=transport)
~~~

جربناه على حالتين:

~~~text الناتج
retries 0  ConnectError بعد 2.07 s
retries 2  ConnectError بعد 6.62 s      (٣ محاولات اتصال)
503 with transport retries -> status 503  (طلب واحد، مفيش retry)
~~~

[[retries]] بيعيد **فتح الاتصال** بس ([[ConnectError]] و [[ConnectTimeout]])، ومش بيلمس 503 ولا 429 ولا [[ReadTimeout]]. ده مقصود: إعادة طلب اتبعت فعلًا ممكن تدفع مرتين. فالـ [[get_json]] بتاعتنا لسه لازمة للـ 5xx، أو مكتبة [[tenacity]]:

~~~python
from tenacity import retry, retry_if_exception, stop_after_attempt, wait_exponential
@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=0.2), retry=retry_if_exception(is_retryable), reraise=True)
async def get_json(client, url): ...
~~~

[[stop_after_attempt(3)]] = ٣ محاولات، و [[wait_exponential(multiplier=0.2)]] = انتظار بيتضاعف، و [[retry_if_exception(is_retryable)]] = دالة بتاعتك بتقرر (نفس شرط [[retryable]] اللي فوق)، و [[reraise=True]] = آخر خطأ يترمي زي ما هو بدل [[RetryError]]. اتجرّب بـ tenacity 9.2.1 على [[MockTransport]] (القسم الجاي) بـ [[get_json]] جسمها ٣ سطور ([[get]] و [[raise_for_status]] و [[json]]): مع [[503, 503, 200]] رجّعت [[{'ok': True}]] بعد ٣ طلبات، ومع 503 على طول رمت [[HTTPStatusError]] بعد ٣ طلبات بالظبط.

### [[Retry-After]] مع 429

لو الخدمة رجّعت 429 ومعاها [[Retry-After: 2]]، استنى الرقم ده بدل الـ backoff بتاعك: [[int(e.response.headers.get("Retry-After", 0))]]. الخدمة بتقولك بالظبط إمتى ترجع، وتجاهله بيخلّيها تقفلك أطول.

---

## ٩. تختبر [[get_json]] من غير نت: [[MockTransport]]

~~~python
def client_with(codes):
    calls = []
    def handler(request: httpx.Request) -> httpx.Response:
        calls.append(request.url.path)
        code = codes[len(calls) - 1]
        return httpx.Response(code, json={"ok": True} if code == 200 else {"err": code})
    return httpx.AsyncClient(transport=httpx.MockTransport(handler), base_url="https://pay.test"), calls
def test_retries_then_ok():
    c, calls = client_with([503, 503, 200])
    assert asyncio.run(get_json(c, "/v1/p")) == {"ok": True}
    assert len(calls) == 3
def test_404_no_retry():
    c, calls = client_with([404, 200, 200])
    with pytest.raises(httpx.HTTPStatusError):
        asyncio.run(get_json(c, "/v1/p"))
    assert calls == ["/v1/p"]
~~~

- [[httpx.MockTransport(handler)]]: بدل ما الـ client يفتح اتصال، بينادي [[handler]] بالطلب وياخد منها الرد. مفيش شبكة خالص.
- [[codes]]: لستة الأكواد اللي هترجع بالترتيب، فتقدر تمثّل «فشل مرتين ونجح التالتة».
- [[calls]]: بنسجّل كل طلب وصل، عشان نتأكد من **عدد المحاولات** مش النتيجة بس.

~~~text الناتج: pytest -q
2 passed in 0.63s
~~~

(الاختبار بياخد ٠.٦ ثانية لأن الـ backoff الحقيقي بيستنى 0.2 و 0.4. في مشروع كبير خلّي الانتظار باراميتر وادّيله صفر في الاختبار.) ومكتبة [[respx]] بتعمل نفس الحاجة بشكل أقصر لو عندك طلبات كتير.

---

## السطور كلها

| الكود | بيعمل إيه |
|---|---|
| [[httpx.AsyncClient(...)]] في الـ lifespan | client واحد، اتصالات بتتعاد |
| [[httpx.Timeout(5.0, connect=2.0)]] | حدود وقت صريحة |
| [[r.raise_for_status()]] | 4xx و 5xx = exception |
| [[TransportError]] أو 429 أو 5xx | يتعاد |
| [[0.2 * 2**attempt]] | 0.2 ثم 0.4 |
| [[except httpx.HTTPError]] ← 502 | خطأ الخدمة الخارجية مش خطأك |

## الخلاصة

- client واحد للتطبيق، و timeout مكتوب صريح.
- [[raise_for_status()]] وإلا الـ 500 بتاعتهم هتعدّي كأنها نجاح.
- أعد المحاولة للأخطاء المؤقتة بس، وبـ backoff، وبحد.
- فشل الخدمة اللي وراك = 502 للعميل، مش تفاصيل خطأهم.`,
          lines: [
            R`[[asyncio]] عشان [[asyncio.sleep]] بين المحاولات. لازم [[asyncio.sleep]] مش [[time.sleep]]: التانية بتوقّف الـ event loop كله، فكل الطلبات التانية تستنى الـ backoff بتاعك.`,
            R`[[asynccontextmanager]] بيحوّل دالة async فيها [[yield]] لـ context manager، وده الشكل اللي FastAPI عايزه في [[lifespan]]: اللي قبل [[yield]] وقت التشغيل، واللي بعده وقت الإيقاف.`,
            R`مكتبة [[httpx]]: فيها [[Client]] (sync) و [[AsyncClient]] (async) بنفس الـ API تقريبًا. [[requests]] مفيهاش نسخة async، فجوه [[async def]] كانت هتقفل الـ loop.`,
            R`[[HTTPException]] عشان نرجّع 502 للعميل، و [[Request]] عشان الـ route يوصل لـ [[request.app.state]] اللي فيه الـ client المشترك.`,
            R`الـ decorator ده هو اللي بيخلّي [[async with ... as client: yield]] تحت يشتغل كـ «افتح قبل التشغيل، واقفل بعد الإيقاف».`,
            R`[[lifespan]] FastAPI بيناديها **مرة واحدة** لما التطبيق يقوم، مش مع كل طلب. فأي حاجة غالية (client، pool، اتصال قاعدة) مكانها هنا.`,
            R`client واحد للتطبيق كله. عمله مكلّف (قسناه: ٢٣٣ ملّي ثانية على ويندوز و ١٢ على لينكس، عشان SSL context والشهادات)، فلو اتعمل مع كل طلب الـ API كله هيبطأ. و [[async with]] بيضمن إنه يتقفل.`,
            R`[[base_url]]: أي طلب بمسار نسبي زي [[/v1/payments/x]] بيتلزق عليه. كده عنوان المزوّد في مكان واحد، وفي الاختبار أو الـ staging بتغيّره من غير ما تلمس الكود.`,
            R`[[Timeout(5.0, connect=2.0)]]: ٥ ثواني لـ [[read]] و [[write]] و [[pool]]، و ٢ بس لفتح الاتصال (لو الخدمة مش بترد على الاتصال أصلًا، مفيش داعي تستنى ٥). اطبعه هتلاقي الأربعة.`,
            R`[[max_connections=50]] أقصى اتصالات مفتوحة مع بعض، و [[max_keepalive_connections=20]] كام واحد يفضل مفتوح فاضي للطلب الجاي. لو الـ ٥٠ مشغولين الطلب الـ ٥١ بيستنى، ولو عدّى [[pool]] بيقع بـ [[PoolTimeout]].`,
            R`headers بتتبعت مع كل طلب. [[User-Agent]] باسم خدمتك بيخلّي فريق المزوّد يلاقي طلباتك في اللوج بتاعهم لو حصلت مشكلة. والتوكن بتاع المزوّد بيتحط هنا كمان، من الإعدادات مش مكتوب في الكود.`,
            R`[[) as client:]] بيقفل نداء [[AsyncClient(...)]] ويسمّي الـ client. ولما الـ [[async with]] يخلص (التطبيق بيقفل)، كل الاتصالات المفتوحة بتتقفل نضيف.`,
            R`[[app.state]] مكان تحط فيه أي حاجة تخص التطبيق كله. الـ routes بتوصله من [[request.app.state.http]]، والاسم [[http]] انت اللي بتختاره.`,
            R`[[yield]]: هنا التطبيق شغال وبيستقبل طلبات، والـ [[async with]] لسه مفتوح. أول ما uvicorn يقفل، التنفيذ بيكمّل بعد السطر ده فالـ client يتقفل.`,
            R`[[FastAPI(lifespan=lifespan)]] بيربط الدالة بالتطبيق. من غيرها الـ [[lifespan]] متتناديش، و [[request.app.state.http]] يرمي [[AttributeError]] مع أول طلب.`,
            R`دالة GET بـ retry، بتاخد الـ client من برّه (مش بتعمل واحد)، فتقدر تختبرها بـ [[MockTransport]]. و [[tries: int = 3]] قابلة للتغيير لكل نداء.`,
            R`[[attempt]] بتبقى 0 و 1 و 2. رقم المحاولة ده بنستخدمه في حسبة الانتظار وفي «دي آخر واحدة؟».`,
            R`كل محاولة جوه [[try]] عشان الخطأ ميطلعش برّه الدالة إلا لو احنا قررنا كده.`,
            R`[[await client.get(url)]]: الطلب. المسار نسبي فبيتلزق على [[base_url]]. و [[await]] بيسيب الـ loop يخدم طلبات تانية لحد ما الرد يوصل.`,
            R`من غير [[raise_for_status()]]، httpx بيعتبر 500 و 404 ردود عادية والكود يكمّل يقرا [[r.json()]] من صفحة خطأ. السطر ده بيحوّل أي 4xx أو 5xx لـ [[HTTPStatusError]].`,
            R`نجح؟ حوّل الـ body من JSON لـ dict وارجع، والـ loop تقف. ولو المزوّد رجّع نص مش JSON، [[r.json()]] هيرمي [[JSONDecodeError]] (مش متمسوك هنا، فهيوصل للـ route كـ 500).`,
            R`امسك نوعين بس: [[TransportError]] (الرد موصلش: timeout أو اتصال اتقطع) و [[HTTPStatusError]] (الرد وصل بكود خطأ). أي خطأ تاني (bug في كودك) يعدّي زي ما هو.`,
            R`يستاهل نعيد؟ مشكلة شبكة آه، و 429 (زحمة) آه، و 5xx (المشكلة عندهم) آه. و 400 و 404 لأ: الطلب نفسه غلط وإعادته هتجيب نفس النتيجة. و [[or]] بيقف عند أول [[True]] فـ [[e.response]] مبيتقريش مع [[TransportError]] (اللي مالوش [[response]]).`,
            R`مش مؤقت، أو دي المحاولة الأخيرة ([[tries - 1]] = 2)؟ يبقى مفيش فايدة من الانتظار.`,
            R`[[raise]] من غير اسم بيرمي **نفس** الخطأ بنفس الـ traceback، فاللي فوق يعرف السبب الحقيقي (404 ولا timeout) بدل خطأ عام جديد.`,
            R`exponential backoff: [[0.2 * 2**0]] = 0.2، وبعدين 0.4. كل مرة ضعف اللي قبلها، عشان لو الخدمة واقعة من زحمة متضربهاش أكتر. و [[**]] معناها أُس.`,
            R`مش هنوصل هنا أبدًا (آخر محاولة يا بترجع يا بترمي)، بس من غيره mypy و pyright بيقولوا إن الدالة ممكن ترجع [[None]] مع إن نوعها [[dict]].`,
            R`route بيرد على [[GET /payments/pay_123]]، و [[{pid}]] بيتبعت للدالة كـ string.`,
            R`[[request: Request]] عشان نوصل للـ client المشترك. الدالة [[async def]] لأن كل اللي جواها [[await]]، فمبتقفلش الـ loop.`,
            R`[[try]] حوالين النداء عشان أي فشل من المزوّد يتحوّل لرد مفهوم بدل 500 و traceback.`,
            R`[[f"/v1/payments/{pid}"]] مسار نسبي، و [[get_json]] هي اللي بتعمل الـ retry. لو نجحت، الـ dict بيترجع للعميل JSON على طول.`,
            R`[[httpx.HTTPError]] الأب لـ [[HTTPStatusError]] و [[TransportError]]، فسطر واحد بيمسك أي فشل بعد ما المحاولات خلصت.`,
            R`502 Bad Gateway معناها «أنا شغال، بس الخدمة اللي ورايا فشلت». مش 500 (bug عندك) ولا 4xx (غلطة العميل)، ومش بنرجّع رسالة المزوّد زي ما هي عشان ممكن تكون فيها تفاصيل داخلية.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص فوق، اكتب أسماء الـ timeouts الأربعة في httpx وكل واحد بيحسب انتظار إيه. وبعدين اطبع [[httpx.Timeout(5.0, connect=2.0)]] و [[httpx.AsyncClient().timeout]].`, done: R`ورقتك فيها connect و read و write و pool بمعنى صح لكل واحد، والطباعة طلعت [[Timeout(connect=2.0, read=5.0, write=5.0, pool=5.0)]] و [[Timeout(timeout=5.0)]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** بـ [[get_json]] زي ما هي و [[tries=3]]، اكتب كام طلب هيتبعت لو المزوّد رجّع على طول: 503، و 404، و 429، و 400. وبعدين اتأكد بـ [[MockTransport]] بعدّاد طلبات.`, done: R`توقعاتك ٣ و ١ و ٣ و ١، والعدّاد في الـ handler طلع نفس الأرقام، والحالات اللي فيها ٣ أخدت حوالي ٠.٦ ثانية (0.2 + 0.4).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** route فيه [[async with httpx.AsyncClient() as c: r = await c.get(URL)]] جوه الدالة نفسها ومفيش [[raise_for_status]]. لما المزوّد بيرجّع 500 الـ API بيرجّع 200 وفيه صفحة الخطأ، وكل طلب بطيء. صلّحه بالـ lifespan و [[raise_for_status]] و 502.`, done: R`بعد التصليح: ٢٠٠ طلب ورا بعض أسرع بفرق واضح (قيسه قبل وبعد بـ [[time.perf_counter]])، والمزوّد لما يرجّع 500 الـ route بيرجّع 502 و [[{"detail": "payment provider unavailable"}]].` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** اختبارين لـ [[get_json]] بـ [[MockTransport]]: واحد الـ handler فيه بيرمي [[httpx.ConnectError("down", request=request)]] أول مرة ويرجّع 200 التانية، وواحد بيرجّع 429 على طول.`, done: R`[[pytest -q]] بيطبع [[2 passed]]، والأول بيأكد إن عدد الطلبات ٢ والنتيجة الـ dict، والتاني بيأكد إن [[HTTPStatusError]] اترمى بعد ٣ طلبات بالظبط وإن [[e.response.status_code == 429]].` },
            { lvl: 'تحدي', t: R`**ابني:** خلّي [[get_json]] تحترم [[Retry-After]]: لو 429 ومعاه الـ header، استنى عدد الثواني ده بدل الـ backoff (وبحد أقصى ١٠ ثواني عشان سيرفر بايظ ميوقّفكش ساعة).`, done: R`مع [[MockTransport]] بيرجّع 429 و [[Retry-After: 1]] وبعدين 200، النداء بياخد ثانية أو أكتر بشوية (قسته)، ومع [[Retry-After: 999]] الانتظار ١٠ ثواني بس، ومن غير الـ header بيرجع للـ backoff العادي.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** شغّل FastAPI صغير على بورت محلي، وقيس ٢٠٠ طلب بـ client واحد مقابل client لكل طلب، على جهازك وجوه [[docker run --rm python:3.13-slim]] لو عندك Docker.`, done: R`عندك ٤ أرقام (اتنين لكل نظام)، والـ client المشترك أسرع في الاتنين، وكاتب في سطر إن معظم الفرق من عمل الـ client نفسه (قيس [[httpx.AsyncClient()]] لوحده ١٠ مرات).` },
          ],
          sol: R`مع [[/status/503]] هتشوف في اللوج ٣ سطور [[INFO:httpx:HTTP Request: GET https://httpbin.org/status/503 "HTTP/1.1 503 Service Unavailable"]]، بينهم 0.2 ثانية وبعدين 0.4 (الـ backoff)، وبعد التالتة الـ [[raise]] بيطلّع [[HTTPStatusError: Server error '503 Service Unavailable']] والـ route بيحوّلها [[502]] و [[payment provider unavailable]]. وجرّب كمان [[/status/404]]: طلب واحد بس ومفيش retry، لأن 404 غلط عندك مش عند السيرفر، وإعادته مش هتغيّر حاجة.

و [[/delay/10]] مع [[Timeout(5.0)]]: كل محاولة بتقف بعد ٥ ثواني بـ [[ReadTimeout]]، والـ [[ReadTimeout]] نوع من [[TransportError]] فبيتعاد، فالطلب كله بياخد حوالي ١٦ ثانية (٣ × ٥ + 0.6 backoff، وشوية لفتح اتصال جديد بعد كل timeout؛ في تجربتنا ١٦.٢) قبل الـ 502. خد بالك: الـ retry بيضرب الـ timeout في عدد المحاولات، فلو عندك حد أقصى لوقت الرد، احسبه على كده. ولو httpbin.org مش متاح عندك، اعمل FastAPI صغير فيه [[/status/{code}]] بيرجع [[Response(status_code=code)]] و [[/delay/{n}]] بـ [[asyncio.sleep]]، والنتيجة هتبقى هي هي.`
        },
        {
          cmd: "redis cache",
          title: "cache بـ Redis: تحفظ النتيجة وصلاحيتها تنتهي لوحدها",
          desc: R`[[redis.asyncio]] (من مكتبة [[redis]]) النسخة async من الـ client. والـ pattern الأشهر cache-aside: دوّر في Redis، لو موجود رجّعه، لو مش موجود هاته من القاعدة وحطه في Redis بـ TTL ([[ex=60]]). وأول ما الداتا تتغير امسح المفتاح.

والـ client يتعمل مرة في الـ lifespan زي أي مورد مشترك. وتشغيل Redis نفسه في تاب Docker، وتصميم طبقات الكاش في تاب «بناء مشروع كامل».`,
          example: R`import redis.asyncio as redis
from pydantic import BaseModel, TypeAdapter
class Product(BaseModel):
    id: int
    name: str
    price_cents: int
Products = TypeAdapter(list[Product])
r = redis.from_url("redis://localhost:6379/0", decode_responses=True)
async def load_products_from_db(category: str) -> list[Product]:
    return [Product(id=1, name="Tea", price_cents=1500)]
async def products_by_category(category: str) -> list[Product]:
    key = f"products:v1:{category}"
    cached = await r.get(key)
    if cached is not None:
        return Products.validate_json(cached)
    items = await load_products_from_db(category)
    await r.set(key, Products.dump_json(items), ex=60)
    return items
async def on_product_changed(category: str) -> None:
    await r.delete(f"products:v1:{category}")`,
          try: R`شغّل Redis ([[docker run -d -p 6379:6379 redis:8]])، ونادي الدالة مرتين وقيس الوقت. وبعدين من [[redis-cli]]: [[GET products:v1:tea]] و [[TTL products:v1:tea]]، وشوف العداد بينزل.`,
          flag: "script",
          deep: {
            why: "نفس الـ query التقيلة (قايمة منتجات، إحصائيات) بتتنفذ ألف مرة في الدقيقة ونتيجتها واحدة. Redis بيرجّعها من الذاكرة في أقل من ملّي ثانية، والقاعدة ترتاح للكتابة وللحاجات اللي لازم تبقى طازة.",
            how: R`[[from_url]] بيعمل client جواه connection pool، و [[decode_responses=True]] بيرجّع strings بدل bytes. و [[set(key, value, ex=60)]] بيحط المفتاح بعمر ٦٠ ثانية، و Redis بيمسحه لوحده. والقفل في آخر الـ lifespan بـ [[await r.aclose()]].

cache-aside يعني التطبيق هو اللي بيقرر يقرا ويكتب في الـ cache. والمشكلتين الكبار: invalidation (الداتا اتغيرت والـ cache لسه قديم: امسح المفتاح عند التعديل، والـ TTL شبكة أمان)، و stampede (المفتاح انتهى و ١٠٠٠ request راحوا للقاعدة مع بعض: TTL فيه عشوائية بسيطة، أو lock بـ [[SET key val NX EX 10]] عشان واحد بس يحسب).

[[v1]] في اسم المفتاح: لو شكل الموديل اتغير، غيّرها لـ v2، والمفاتيح القديمة تموت لوحدها بالـ TTL بدل ما تقع في الـ parsing.

و [[TypeAdapter]] بيعمل الـ JSON في Rust في الاتجاهين، أسرع من [[json.dumps]]، وبيفحص وهو بيقرا.

و [[@lru_cache]] في الذاكرة مش بديل: كل worker وكل container ليه نسخته، ومحدش يعرف يمسحها لما الداتا تتغير.`,
            when: "داتا بتتقري كتير وبتتغير قليل، ومقبول تبقى قديمة ثواني: كتالوج، وإعدادات، وصفحات عامة، وردود APIs خارجية. ومش للداتا اللي لازم تبقى دقيقة لحظيًا (رصيد، مخزون وقت الشراء).",
            mistakes: R`cache من غير TTL (بيكبر للأبد، والداتا القديمة عايشة). ومفتاح مشترك بين المستخدمين ([[products:list]]) لرد فيه حاجات خاصة بكل واحد. و cache لـ ORM objects بـ pickle. ونسيان إن Redis ممكن يقع: الـ cache لازم يبقى اختياري (لو Redis مش متاح، روح للقاعدة).`
          },
          teach: R`## المثال بيعمل إيه؟

دالة [[products_by_category]] بتجيب منتجات فئة. أول مرة بتجيبها من القاعدة وتحفظها في Redis لمدة ٦٠ ثانية، والمرات اللي بعدها بترجّعها من Redis على طول. ولما منتج يتغير، دالة تانية بتمسح المفتاح. ده pattern اسمه **cache-aside**.

اتشغّل فعلًا بـ redis-py 8.1 (المكتبة اسمها [[redis]]) و Pydantic 2.13 على ويندوز، على Redis 8 في Docker ([[docker run -d --rm --name redis -p 6379:6379 redis:8-alpine]])، والدوال اتنادت من [[asyncio.run]].

---

## ١. الـ imports والموديل

~~~python
import redis.asyncio as redis
from pydantic import BaseModel, TypeAdapter
class Product(BaseModel):
    id: int
    name: str
    price_cents: int
Products = TypeAdapter(list[Product])
~~~

- [[import redis.asyncio as redis]]: مكتبة [[redis]] فيها نسخة sync ونسخة async. بناخد الـ async ونسمّيها [[redis]] بـ [[as]].
- [[TypeAdapter(list[Product])]]: [[BaseModel]] بيفحص object واحد، لكن احنا عايزين **list** من المنتجات. [[TypeAdapter]] بيدّيك نفس قدرات Pydantic لأي نوع: [[validate_json]] (من JSON لـ objects مع الفحص) و [[dump_json]] (من objects لـ JSON). وبيتعمل **مرة واحدة** برّه الدوال لأن بناؤه فيه شغل.

---

## ٢. الـ client

~~~python
r = redis.from_url("redis://localhost:6379/0", decode_responses=True)
~~~

- [[redis://localhost:6379/0]]: السيرفر، والبورت الافتراضي 6379، و [[/0]] رقم القاعدة (Redis فيه قواعد مترقمة من 0، والافتراضي 0).
- [[from_url]] مبيتصلش فورًا: بيعمل client جواه connection pool، وأول اتصال مع أول أمر.
- [[decode_responses=True]]: رجّع [[str]] بدل [[bytes]]. جربت من غيرها: [[GET]] رجع [[b'[{"id":1,...}]']] (الـ [[b]] قبل الـ string معناها bytes).

في التطبيق ده بيتعمل في الـ lifespan، ويتقفل بعد الـ yield بـ [[await r.aclose()]].

---

## ٣. [[load_products_from_db]]

~~~python
async def load_products_from_db(category: str) -> list[Product]:
    return [Product(id=1, name="Tea", price_cents=1500)]
~~~

قاعدة وهمية بترجّع منتج واحد. في الحقيقة هنا query بـ asyncpg أو SQLAlchemy.

---

## ٤. [[products_by_category]]: الـ cache-aside

~~~python
async def products_by_category(category: str) -> list[Product]:
    key = f"products:v1:{category}"
    cached = await r.get(key)
    if cached is not None:
        return Products.validate_json(cached)
    items = await load_products_from_db(category)
    await r.set(key, Products.dump_json(items), ex=60)
    return items
~~~

1. **المفتاح**: [[products:v1:tea]]. الـ [[:]] مجرد عرف في Redis لتقسيم الأسماء. و [[v1]] نسخة شكل الداتا: لو غيّرت الموديل، خليها [[v2]] والمفاتيح القديمة تموت لوحدها بالـ TTL بدل ما الـ parsing يقع عليها.
2. [[await r.get(key)]]: هات القيمة، أو [[None]] لو المفتاح مش موجود (أو انتهى).
3. **موجود (cache hit)**: [[Products.validate_json(cached)]] يحوّل النص لـ list من [[Product]] ويرجع، من غير ما يلمس القاعدة.
4. **مش موجود (cache miss)**: هات من القاعدة.
5. [[Products.dump_json(items)]]: حوّل الـ list لـ JSON:

~~~text الناتج
b'[{"id":1,"name":"Tea","price_cents":1500}]'
~~~

JSON مضغوط من غير مسافات، وبيرجع bytes، و Redis بيقبلها عادي.

6. [[r.set(key, value, ex=60)]]: خزّن، و [[ex]] = expire بالثواني. بعد ٦٠ ثانية Redis نفسه بيمسح المفتاح.

---

## ٥. [[on_product_changed]]

~~~python
async def on_product_changed(category: str) -> None:
    await r.delete(f"products:v1:{category}")
~~~

لما منتج يتعدّل، امسح المفتاح، فأول طلب بعدها يروح للقاعدة ويجيب الجديد. ده اسمه invalidation. والـ TTL شبكة أمان لو نسيت تمسح في مكان.

---

## ٦. نجرّب

عشان الفرق يبان، خليت الدالة الوهمية تعمل [[await asyncio.sleep(0.3)]] كأنها query بطيئة، وناديت مرتين:

~~~text الناتج
call 1: 315.1ms [Product(id=1, name='Tea', price_cents=1500)]
call 2: 0.8ms [Product(id=1, name='Tea', price_cents=1500)]
~~~

الأولى ٣٠٠ ملّي ثانية القاعدة + شوية لأول اتصال بـ Redis. التانية أقل من ملّي ثانية: رحلة لـ Redis بس.

### من [[redis-cli]]

على ويندوز [[redis-cli]] مش متسطّب، فشغّله من جوه الـ container: [[docker exec -it redis redis-cli]].

~~~text الناتج
127.0.0.1:6379> GET products:v1:tea
"[{\"id\":1,\"name\":\"Tea\",\"price_cents\":1500}]"
127.0.0.1:6379> TTL products:v1:tea
(integer) 59
~~~

وبعد ثانيتين [[TTL]] بقى [[57]]. معاني رقم [[TTL]]:

| الرقم | معناه |
|---|---|
| موجب | فاضل كام ثانية |
| [[-1]] | المفتاح موجود **من غير** expire، هيعيش للأبد (جربت [[SET forever x]] وطلع [[-1]]) |
| [[-2]] | المفتاح مش موجود (بعد [[DEL]] طلع [[-2]]) |

لو لقيت [[-1]] على مفتاح cache، يبقى اتكتب من غير [[ex]]، ودي أشهر غلطة.

---

## ٧. الـ stampede: ١٠٠ طلب على مفتاح فاضي

اتشغّل فعلًا تاني على Redis 7.4.12 ([[docker run -d --rm -p 6491:6379 redis:7-alpine]]) بنفس الكود، وعدّاد [[DB_CALLS]] بيزيد مع كل نداء للقاعدة. ١٠٠ نداء مع بعض بـ [[asyncio.gather]] والمفتاح مش موجود:

~~~text الناتج
naive: 100 concurrent misses -> DB calls: 100
~~~

الـ ١٠٠ سألوا Redis في نفس اللحظة، والـ ١٠٠ لقوه فاضي، والـ ١٠٠ راحوا للقاعدة. ده الـ **cache stampede**: بيحصل كل ما مفتاح عليه زحمة ينتهي، والقاعدة بتاخد ضربة ١٠٠ مرة الطبيعي في ثانية. الحل lock: واحد بس يحسب، والباقي يستنى النتيجة.

~~~python
async def with_lock(category: str) -> list[Product]:
    key = f"products:v1:{category}"
    for _ in range(50):
        cached = await r.get(key)
        if cached is not None:
            return Products.validate_json(cached)
        if await r.set(f"lock:{key}", "1", nx=True, ex=10):
            try:
                items = await load_products_from_db(category)
                await r.set(key, Products.dump_json(items), ex=60 + random.randint(0, 10))
                return items
            finally:
                await r.delete(f"lock:{key}")
        await asyncio.sleep(0.05)
    return await load_products_from_db(category)
~~~

- [[set(..., nx=True, ex=10)]]: [[NX]] = «اكتب بس لو المفتاح **مش** موجود». Redis بينفّذ الأوامر واحد واحد، فواحد بس من الـ ١٠٠ بياخد [[True]]، والباقي [[None]]. و [[ex=10]] عشان لو اللي ماسك الـ lock وقع، الـ lock يموت لوحده بعد ١٠ ثواني ومحدش يفضل مستني للأبد.
- اللي أخد الـ lock: بيجيب من القاعدة ويكتب في الـ cache، و [[finally]] بتمسح الـ lock حتى لو القاعدة رمت.
- الباقي: يستنوا [[0.05]] ويدوّروا تاني، ٥٠ مرة بالكتير (يعني ٢.٥ ثانية). ولو لسه مفيش، يروحوا للقاعدة بنفسهم بدل ما يفشلوا.
- [[60 + random.randint(0, 10)]]: **jitter**. لو ١٠٠٠ مفتاح اتكتبوا في نفس الثانية بـ TTL ٦٠ بالظبط، هيموتوا كلهم في نفس الثانية ويعملوا stampede جماعي. العشوائية بتفرّقهم.

~~~text الناتج
lock: 100 concurrent misses -> DB calls: 1 in 0.41s
ttl with jitter 70
~~~

نداء واحد للقاعدة بدل ١٠٠، والـ ١٠٠ خلصوا في ٠.٤١ ثانية (٠.٣ القاعدة + لفة أو اتنين انتظار).

---

## ٨. Redis وقع: الـ cache لازم يبقى اختياري

قفلنا Redis وناديت [[r.get]] على بورت مفيش عليه حاجة:

~~~text الناتج (ويندوز، من غير timeout)
ConnectionError | Error 22 connecting to localhost:6499. The remote computer refused the network connection. | 4.08 s
~~~

**٤ ثواني** لكل طلب قبل ما يقع (ويندوز بيعيد محاولة الاتصال، و [[localhost]] بيتجرّب على IPv6 و IPv4). يعني لو الـ cache وقع، كل طلب في الـ API بيبطأ ٤ ثواني وبعدين يرجّع 500، مع إن القاعدة شغالة. الحل: timeout قصير، وامسك الخطأ وروح للقاعدة:

~~~python
r = redis.from_url(URL, decode_responses=True, socket_connect_timeout=0.5, socket_timeout=0.5)
async def get_cached():
    try:
        v = await r.get("k")
        if v is not None:
            return v
    except RedisError as e:
        log.warning("cache down, using DB: %r", e)
        return await load()
    ...
~~~

- [[socket_connect_timeout]] أقصى وقت لفتح الاتصال، و [[socket_timeout]] أقصى وقت لأي أمر. من غيرهم مفيش حد.
- [[RedisError]] (من [[redis.exceptions]]) الأب لكل أخطاء المكتبة: [[ConnectionError]] و [[TimeoutError]] وغيرهم.

~~~text الناتج
WARNING cache down, using DB: network:TimeoutError
from-db 0.51s
~~~

نص ثانية وبعدين القاعدة، والطلب نجح. والخطأ بقى [[redis.exceptions.TimeoutError]] (رسالته [[Timeout connecting to server]]) مش [[ConnectionError]]: الـ timeout بتاعنا خلص قبل ما ويندوز يرفض. و [[%r]] في redis-py 8.1 بيطبع الشكل المختصر [[network:TimeoutError]] ده مش الرسالة، فلو عايز الرسالة في اللوج استخدم [[%s]]. ده اسمه **fail open** للـ cache: الـ cache وقع، فالتطبيق أبطأ بس شغال.

---

## ٩. فخ: client على مستوى الـ module مع أكتر من event loop

الـ client هنا متعمل برّه أي دالة. ده بيشتغل في سكربت بـ [[asyncio.run]] واحد، ومع uvicorn (loop واحد طول عمر الـ worker). بس جربنا نفس الشكل في تطبيق FastAPI واختبرناه بـ [[TestClient]] مرتين (كل [[with TestClient(app)]] بيعمل event loop جديد):

~~~text الناتج
round 1 [200, 200, 200, 200] ...
round 2 FAILED: RuntimeError Event loop is closed
~~~

الاتصالات اللي في الـ pool اتعملت على الـ loop الأول، والـ loop ده اتقفل. الاختبار التاني حاول يستخدمها فوقع. ونفس الحاجة لو ناديت [[asyncio.run(r.flushdb())]] قبل الـ TestClient. الحل في أي تطبيق: الـ client يتعمل **جوه الـ lifespan** ويتحط في [[app.state]] (زي درس «redis rate limit» بعد كده)، فكل loop بياخد client جديد.

---

## ١٠. أشكال تانية للـ cache

| الشكل | بيشتغل إزاي | إمتى |
|---|---|---|
| cache-aside (اللي في الدرس) | التطبيق يدوّر، ولو مش موجود يجيب ويكتب | الأشهر، والـ cache اختياري ولو وقع التطبيق شغال |
| write-through | مع كل كتابة في القاعدة اكتب في الـ cache كمان | الداتا بتتقري فورًا بعد ما تتكتب، ومش عايز أول قراية تبقى miss |
| invalidate on write | مع كل كتابة امسح المفتاح (زي [[on_product_changed]]) | أبسط وأأمن من write-through، لأن مفيش خطر تكتب في الـ cache قيمة غلط |
| TTL بس | مفيش مسح، القيمة تقدم لحد ما تموت | داتا مقبول تبقى قديمة دقايق (إحصائيات، أسعار صرف) |

وأي مفتاح فيه بيانات يوزر لازم يبقى فيه الـ user id ([[cart:v1:42]])، وإلا يوزر يشوف داتا يوزر تاني.

---

## السطور كلها

| الخطوة | الكود |
|---|---|
| المفتاح | [[f"products:v1:{category}"]] |
| دوّر | [[await r.get(key)]] |
| لقيته | [[Products.validate_json(cached)]] |
| ملقيتوش | هات من القاعدة، و [[r.set(key, Products.dump_json(items), ex=60)]] |
| الداتا اتغيرت | [[await r.delete(key)]] |

## الخلاصة

- cache-aside: دوّر، لو مش موجود هات وخزّن بـ TTL.
- أي مفتاح cache لازم يبقى ليه [[ex]]، وامسحه أول ما الداتا تتغير.
- [[decode_responses=True]] عشان ترجع strings.
- [[TypeAdapter]] للـ lists، ويتعمل مرة واحدة.
- الـ cache اختياري: لو Redis وقع، التطبيق المفروض يروح للقاعدة مش يقع.`,
          lines: [
            R`مكتبة [[redis]] (اسمها redis-py) فيها نسخة sync ونسخة async. [[redis.asyncio]] هي الـ async، وبنسمّيها [[redis]] بـ [[as]] عشان الكود يبقى أقصر. المكتبة القديمة [[aioredis]] اتدمجت فيها ومبقتش بتتصان.`,
            R`[[BaseModel]] للموديل، و [[TypeAdapter]] عشان نفحص ونحوّل **list** من الموديلات من وإلى JSON، لأن [[BaseModel]] لوحده بيتعامل مع object واحد.`,
            R`موديل المنتج. أي داتا راجعة من الـ cache بتتفحص بيه، فلو حد كتب في Redis قيمة بايظة، هتطلع [[ValidationError]] واضحة بدل حقل ناقص في نص الكود.`,
            R`[[id: int]]: رقم المنتج، و Pydantic بيرفض أي حاجة مش رقم أو مش ممكن تتحوّل لرقم.`,
            R`[[name: str]]: اسم المنتج كنص.`,
            R`[[price_cents: int]]: السعر بالقروش كرقم صحيح، عشان الـ float بيعمل أخطاء تقريب في الفلوس ([[0.1 + 0.2]] مش [[0.3]]).`,
            R`[[TypeAdapter(list[Product])]] بيبني قواعد الفحص مرة واحدة، فبيتعمل برّه الدوال. لو اتعمل جوه الدالة، كل نداء هيدفع تمن بناؤه من الأول.`,
            R`[[from_url]] بيعمل client جواه connection pool، ومبيتصلش غير مع أول أمر. و [[decode_responses=True]] عشان [[get]] يرجّع [[str]] مش [[bytes]]. في تطبيق FastAPI الـ client ده مكانه الـ lifespan (شوف فخ «Event loop is closed» في الشرح).`,
            R`القاعدة الوهمية: في الحقيقة هنا query بـ asyncpg أو SQLAlchemy. احنا عايزينها بطيئة عشان الفرق يبان، فالتجربة بتضيف [[await asyncio.sleep(0.3)]].`,
            R`بترجّع لستة فيها منتج واحد ثابت، كأن القاعدة ردّت.`,
            R`الدالة اللي الـ routes بتناديها. اللي بينادي مبيعرفش الداتا جت من Redis ولا من القاعدة، وده المطلوب: الـ cache تفصيلة داخلية.`,
            R`المفتاح [[products:v1:tea]]: نوع الداتا، ونسخة شكلها ([[v1]])، والفئة. لو غيّرت الموديل خلّيها [[v2]]، والمفاتيح القديمة تموت بالـ TTL بدل ما تقع في الـ parsing. ولو الرد خاص بيوزر، الـ user id لازم يبقى في المفتاح.`,
            R`[[await r.get(key)]] بيرجّع النص المتخزّن، أو [[None]] لو المفتاح مش موجود أو الـ TTL خلص.`,
            R`[[is not None]] هو السؤال الصريح «المفتاح موجود؟». لستة فاضية بتتخزّن كنص [["[]"]] وده نص مش فاضي فبيعدّي في الحالتين، بس لو خزّنت في يوم نص فاضي [[""]]، [[if cached:]] هيعتبره miss ويروح للقاعدة كل مرة.`,
            R`cache hit: [[validate_json]] بيحوّل النص لـ list من [[Product]] ويفحصه في خطوة واحدة (في Rust)، وبنرجع من غير ما نلمس القاعدة خالص.`,
            R`cache miss: هات من القاعدة. لو ١٠٠ طلب وصلوا هنا مع بعض، الـ ١٠٠ هيروحوا للقاعدة (اتقاس في الشرح)، والحل lock بـ [[SET NX]].`,
            R`[[dump_json]] بيحوّل الـ list لـ JSON (bytes) و Redis بيقبلها. و [[ex=60]] = المفتاح يموت بعد ٦٠ ثانية لوحده. من غير [[ex]] المفتاح بيعيش للأبد و [[TTL]] بيرجّع [[-1]].`,
            R`بنرجّع الـ objects اللي جت من القاعدة، فاللي بينادي بياخد نفس النوع في الحالتين.`,
            R`بتتنادى من الكود اللي بيعدّل منتج (الـ route بتاع التعديل أو الـ admin)، بعد الـ commit مش قبله، وإلا طلب في النص يقرا القديم ويكتبه في الـ cache تاني.`,
            R`[[delete]] بيمسح المفتاح، فأول طلب بعدها miss ويجيب الجديد. ده الـ invalidation، والـ TTL شبكة أمان لو نسيت تمسح في مكان.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من [[redis-cli]] اعمل [[SET a 1 EX 30]] و [[SET b 1]] و [[DEL c]]، وبعدين [[TTL]] على الـ ٣، واكتب قبلها توقّعك لكل رقم.`, done: R`الأرقام طلعت موجب (٣٠ أو أقل) و [[-1]] و [[-2]]، وتعرف تقول كل واحد معناه إيه، وإن [[-1]] على مفتاح cache = bug.` },
            { lvl: 'سريع', t: R`**صلّح الكود البايظ:** زميلك كتب [[key = "products:v1"]] من غير الفئة، وخلّى [[load_products_from_db]] ترجّع منتج باسم الفئة اللي اتبعتت. نادي [[products_by_category("tea")]] وبعدين [[("coffee")]] واشرح اللي حصل، وصلّحه.`, done: R`قبل التصليح النداء التاني رجّع منتج «tea» لطلب «coffee» (القيمة جت من نفس المفتاح)، وبعد التصليح كل فئة ليها مفتاح وبترجّع منتجها، و [[SCAN 0 MATCH products:*]] بيوري مفتاحين.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** ١٠٠ نداء مع بعض بـ [[asyncio.gather]] على مفتاح فاضي، مرة بالدالة العادية ومرة بنسخة الـ lock ([[SET NX EX]]).`, done: R`العدّاد: ١٠٠ نداء للقاعدة من غير lock، و ١ مع الـ lock، والـ ١٠٠ رجّعوا نفس النتيجة، والـ lock مش موجود في Redis بعد ما خلصوا ([[EXISTS lock:...]] = 0).` },
            { lvl: 'تطبيق', t: R`**ابني:** خلّي [[products_by_category]] تكمّل لو Redis واقف: timeout نص ثانية، و [[RedisError]] بيتسجّل warning والداتا تيجي من القاعدة.`, done: R`مع [[docker stop]] للـ Redis: النداء بيرجّع المنتجات في أقل من ثانية، وفي اللوج سطر warning واحد، ومفيش traceback. ولما Redis يرجع، النداء التاني hit تاني.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** اختبار pytest بيتأكد إن [[on_product_changed("tea")]] بتخلّي النداء الجاي يروح للقاعدة: نادي، عدّل الداتا الوهمية، نادي (لسه القديم)، امسح، نادي (الجديد).`, done: R`الاختبار بيعدّي، وفيه ٣ assertions على القيمة و ٣ على عدّاد القاعدة (١ ثم ١ ثم ٢)، وبيمسح مفاتيحه في الأول عشان يعدّي لو اتشغّل مرتين ورا بعض.` },
          ],
          sol: R`النداء الأول بيروح للقاعدة ويكتب في Redis، والتاني بيرجع من Redis. عشان الفرق يبان، خلّي [[load_products_from_db]] تعمل [[await asyncio.sleep(0.3)]] كأنها query بطيئة: في تجربتنا الأول أخد حوالي [[301ms]] والتاني [[0.3ms]]. بالـ fake اللي في المثال زي ما هو، الاتنين أقل من ملّي ثانية ومش هتحس بفرق.

و [[GET products:v1:tea]] في [[redis-cli]] بيرجع [[[{"id":1,"name":"Tea","price_cents":1500}]]] (JSON مضغوط من [[dump_json]])، و [[TTL products:v1:tea]] بيبدأ من [[60]] وبعد ثانيتين [[58]]، ولما يوصل للصفر المفتاح بيتمسح و [[TTL]] بيرجع [[-2]] (مش موجود). ولو [[TTL]] رجع [[-1]] يبقى المفتاح اتكتب من غير [[ex]] وهيفضل للأبد، ودي أشهر غلطة في الـ cache. ولو الدالة رجعت [[bytes]] بدل [[str]]، انت نسيت [[decode_responses=True]].`
        },
        {
          cmd: "redis rate limit",
          title: "تحدد عدد الطلبات لكل مستخدم في الدقيقة",
          desc: R`أبسط rate limit (fixed window): مفتاح لكل مستخدم ولكل دقيقة، و [[INCR]] مع كل طلب، و [[EXPIRE]] عشان يموت لوحده. لو العدد عدّى الحد: 429 مع [[Retry-After]]. ولأن العداد في Redis، الحد بيتطبق على كل الـ workers والـ containers مع بعض.

وتعمله dependency، فتحطه على الـ routes الحساسة (login و OTP والبحث) بحدود مختلفة.`,
          example: R`import time
from contextlib import asynccontextmanager
import redis.asyncio as redis
from fastapi import Depends, FastAPI, HTTPException, Request
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.redis = redis.from_url("redis://localhost:6379/0")
    yield
    await app.state.redis.aclose()
app = FastAPI(lifespan=lifespan)
def rate_limit(limit: int, window: int = 60):
    async def dep(request: Request) -> None:
        r = request.app.state.redis
        who = request.client.host if request.client else "unknown"
        bucket = int(time.time() // window)
        key = f"rl:{request.url.path}:{who}:{bucket}"
        async with r.pipeline(transaction=True) as pipe:
            count, _ = await pipe.incr(key).expire(key, window).execute()
        if count > limit:
            retry = window - int(time.time()) % window
            raise HTTPException(429, "Too many requests", headers={"Retry-After": str(retry)})
    return dep
@app.post("/auth/login", dependencies=[Depends(rate_limit(5))])
async def login():
    return {"ok": True}`,
          try: R`ابعت ٧ طلبات ورا بعض: [[for i in $(seq 7); do curl -s -o /dev/null -w "%{http_code}\n" -X POST localhost:8000/auth/login; done]] وشوف آخر اتنين 429. وبص على المفاتيح في [[redis-cli]] بـ [[SCAN 0 MATCH rl:*]].`,
          flag: "script",
          deep: {
            why: R`من غير rate limit، أي حد يجرّب مليون باسورد على [[/auth/login]]، أو يبعت ألف OTP ويخلّص رصيد الـ SMS، أو سكربت يسحب الكتالوج كله. والعداد في ذاكرة الـ process مبيشتغلش مع كذا worker: كل واحد عنده عداد لوحده.`,
            how: R`المفتاح فيه رقم النافذة ([[time // 60]])، فكل دقيقة مفتاح جديد. و [[INCR]] atomic في Redis: طلبين في نفس اللحظة مستحيل ياخدوا نفس الرقم. و [[pipeline(transaction=True)]] بيبعت [[INCR]] و [[EXPIRE]] في رحلة واحدة جوه [[MULTI]] و [[EXEC]]، فمفيش مفتاح يفضل من غير expire لو حاجة وقعت بينهم.

والـ fixed window عيبه إن الحد ممكن يتضاعف على حدود الدقيقة (٥ في آخر ثانية و ٥ في أول ثانية بعدها). لو محتاج دقة: sliding window بـ sorted set، أو token bucket بـ Lua script. ومكتبات زي [[limits]] و [[slowapi]] بتعمل ده جاهز.

المفتاح بالـ IP للـ routes اللي قبل الـ login، وبالـ user id بعده. وورا nginx الـ IP لازم ييجي من [[X-Forwarded-For]] بشكل آمن ([[--proxy-headers]] و [[--forwarded-allow-ips]] في تاب Python)، وإلا كل الناس ليهم نفس الـ IP ويتقفلوا مع بعض. ولو فيه rate limit في nginx كمان ([[limit_req]] في تاب Nginx)، ده خط أول، وده للحدود الذكية حسب المستخدم. والفكرة العامة في تاب «الأمان».`,
            when: "login و register و OTP و reset password والبحث والـ endpoints الغالية (AI، تصدير)، و APIs عامة ليها API keys.",
            mistakes: R`عداد في dict في الذاكرة. و [[INCR]] من غير [[EXPIRE]] (المفتاح بيعيش للأبد والمستخدم متقفل للأبد). و IP بتاع nginx لكل الناس. و 429 من غير [[Retry-After]]. وإنك متقررش مسبقًا تعمل إيه لو Redis وقع: تعدّي الطلبات (fail open) ولا ترفضها (fail closed).`
          },
          teach: R`## المثال بيعمل إيه؟

dependency بتعدّ طلبات كل IP على كل مسار في كل دقيقة، في Redis. لو العدد عدّى الحد، بترجّع 429 ومعاها كام ثانية يستنى. وحطيناها على [[/auth/login]] بحد ٥ في الدقيقة.

اتشغّل فعلًا بـ redis-py 8.1 و FastAPI 0.142 على ويندوز، على Redis 8 في Docker، والطلبات بـ curl من Git Bash وبـ PowerShell. واتعاد بـ FastAPI 0.162 و Redis 7.4.12 ([[redis:7-alpine]]) بـ [[TestClient]].

> **اتصلح في المثال:** النسخة القديمة كانت عاملة [[r = redis.from_url(...)]] على مستوى الـ module. شغالة مع uvicorn، لكن في الاختبارات أول [[with TestClient(app)]] عدّى والتاني وقع بـ [[RuntimeError: Event loop is closed]]، لأن اتصالات الـ pool متربطة بالـ event loop اللي اتقفل. دلوقتي الـ client بيتعمل في الـ lifespan، فكل loop ليه client: الجولتين عدّوا.

---

## ١. البداية: الـ client في الـ lifespan

~~~python
import time
from contextlib import asynccontextmanager
import redis.asyncio as redis
from fastapi import Depends, FastAPI, HTTPException, Request
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.redis = redis.from_url("redis://localhost:6379/0")
    yield
    await app.state.redis.aclose()
app = FastAPI(lifespan=lifespan)
~~~

[[time]] عشان الوقت الحالي. والـ client بيتعمل مع التطبيق ويتقفل بـ [[aclose()]] بعد الـ [[yield]]، ومن غير [[decode_responses]] لأننا هنقرا أرقام بس (و [[INCR]] بيرجّع int على طول). وجوه الـ dependency: [[r = request.app.state.redis]].

---

## ٢. [[rate_limit]]: factory

~~~python
def rate_limit(limit: int, window: int = 60):
    async def dep(request: Request) -> None:
        ...
    return dep
~~~

نفس فكرة [[require_role]] في درس الـ auth: [[rate_limit(5)]] بيرجّع dependency فاكرة إن الحد ٥ والنافذة ٦٠ ثانية. فتقدر تعمل [[rate_limit(3, 300)]] لـ OTP و [[rate_limit(30)]] للبحث بنفس الكود.

---

## ٣. جوه [[dep]]: المفتاح

~~~python
who = request.client.host if request.client else "unknown"
bucket = int(time.time() // window)
key = f"rl:{request.url.path}:{who}:{bucket}"
~~~

- [[request.client.host]]: IP اللي بعت الطلب. و [[request.client]] ممكن يبقى [[None]] في حالات نادرة، فالـ [[if ... else "unknown"]] بيحمي من [[AttributeError]]. (في الـ TestClient الـ host بيبقى [[testclient]].)
- [[time.time()]]: الثواني من أول 1970 (Unix time)، زي [[1791365550.3]].
- [[// window]]: قسمة صحيحة على ٦٠. كل الثواني في نفس الدقيقة بتدّي نفس الرقم، فده **رقم الدقيقة** من أول 1970.
- [[int(...)]]: الـ [[//]] على float بيرجّع float ([[29856092.0]])، فبنحوّله int عشان المفتاح ميبقاش فيه [[.0]].
- المفتاح: [[rl:/auth/login:127.0.0.1:29856092]]. وأول ما الدقيقة تتغير، المفتاح بيتغير، والعداد يبدأ من الصفر.

---

## ٤. العدّ: [[pipeline]]

~~~python
async with r.pipeline(transaction=True) as pipe:
    count, _ = await pipe.incr(key).expire(key, window).execute()
~~~

- [[r.pipeline()]]: بيجمّع كذا أمر ويبعتهم في **رحلة واحدة** لـ Redis بدل رحلة لكل أمر.
- [[transaction=True]]: ويلفهم في [[MULTI]] و [[EXEC]]، فبيتنفذوا ورا بعض من غير ما أمر من client تاني يدخل في النص.
- [[pipe.incr(key)]]: زوّد العداد 1 (ولو المفتاح مش موجود، Redis بيعتبره 0 فيبقى 1). [[INCR]] atomic: طلبين في نفس اللحظة مستحيل ياخدوا نفس الرقم.
- [[.expire(key, window)]]: المفتاح يموت بعد ٦٠ ثانية.
- [[.execute()]]: ابعت. بيرجّع list بنتيجة كل أمر: [[[6, True]]].
- [[count, _ = ...]]: فك الليستة. الـ [[_]] اسم متعارف عليه لقيمة مش هنستخدمها (نتيجة الـ expire).

شغّلت [[MONITOR]] في [[redis-cli]] (بيطبع كل أمر بيوصل للسيرفر) وبعت طلب:

~~~text الناتج
"MULTI"
"INCRBY" "rl:/auth/login:testclient:29856092" "1"
"EXPIRE" "rl:/auth/login:testclient:29856092" "60"
"EXEC"
~~~

[[incr]] في redis-py بيبعت [[INCRBY key 1]]، وهو هو.

---

## ٥. الحد و [[Retry-After]]

~~~python
if count > limit:
    retry = window - int(time.time()) % window
    raise HTTPException(429, "Too many requests", headers={"Retry-After": str(retry)})
~~~

- [[%]] باقي القسمة: [[int(time.time()) % 60]] = الثانية الحالية جوه الدقيقة. لو احنا في الثانية 30، الباقي [[60 - 30 = 30]] ثانية على الدقيقة الجاية.
- [[429 Too Many Requests]] و header [[Retry-After]] بعدد الثواني. و [[str(...)]] لأن قيم الـ headers نصوص.
- لو العدد في الحد، الدالة بترجع [[None]] من غير حاجة، والـ route يشتغل.

---

## ٦. الـ route

~~~python
@app.post("/auth/login", dependencies=[Depends(rate_limit(5))])
async def login():
    return {"ok": True}
~~~

[[dependencies=[...]]] لأن الـ route مش محتاج قيمة من الـ dependency، محتاج الفحص بس. و [[rate_limit(5)]] بقوسين صح: ده النداء اللي بيعمل الـ dependency.

---

## ٧. نجرّب

~~~bash
for i in $(seq 7); do curl -s -o /dev/null -w "%{http_code}\n" -X POST localhost:8000/auth/login; done
~~~

- [[$(seq 7)]]: الأرقام من 1 لـ 7، فالـ loop بتلف ٧ مرات.
- [[-s]] من غير progress، و [[-o /dev/null]] ارمي الـ body، و [[-w "%{http_code}\n"]] اطبع الكود بس.

~~~text الناتج
200
200
200
200
200
429
429
~~~

وطلب كمان بـ [[-i]] (كان في الثانية 30 من الدقيقة):

~~~text الناتج
HTTP/1.1 429 Too Many Requests
retry-after: 30
content-type: application/json

{"detail":"Too many requests"}
~~~

ومن PowerShell نفس الفكرة:

~~~powershell
1..3 | ForEach-Object { try { (Invoke-WebRequest -Method Post http://localhost:8000/auth/login).StatusCode } catch { [int]$_.Exception.Response.StatusCode } }
~~~

~~~text الناتج (pwsh 7، بعد ما الحد اتعدّى)
429
429
429
~~~

[[1..3]] الأرقام من 1 لـ 3، و [[ForEach-Object]] بينفّذ البلوك لكل واحد. و [[Invoke-WebRequest]] بيرمي error مع الـ 429 فبنمسكه ونطبع الكود.

### المفتاح في Redis

~~~text redis-cli
127.0.0.1:6379> SCAN 0 MATCH rl:*
1) "0"
2) 1) "rl:/auth/login:127.0.0.1:29856092"
127.0.0.1:6379> GET rl:/auth/login:127.0.0.1:29856092
"8"
127.0.0.1:6379> TTL rl:/auth/login:127.0.0.1:29856092
(integer) 59
~~~

- [[SCAN 0 MATCH rl:*]]: دوّر على المفاتيح اللي بتبدأ بـ [[rl:]]، من الـ cursor 0. الرد: cursor جديد ([[0]] = خلصت) والمفاتيح. (و [[KEYS rl:*]] بتعمل نفس الحاجة بس بتقفل Redis لحد ما تلف على كل المفاتيح، فمتستخدمهاش على الإنتاج.)
- [[29856092]] رقم الدقيقة: [[int(time.time() // 60)]] في نفس اللحظة طلع نفس الرقم.
- [[8]]: ٧ في الـ loop + الطلب بـ [[-i]]. وحتى الطلبات المرفوضة بتتعد.
- [[TTL]] 59 مش أقل: كل طلب بيعمل [[EXPIRE]] من جديد، فالمفتاح بيعيش ٦٠ ثانية بعد آخر طلب. مش مشكلة، لأن الدقيقة الجاية ليها مفتاح جديد أصلًا.

---

## ٨. ضعف الحد على حدود الدقيقة: بالتجربة

عملنا نسخة من الـ fixed window بتاخد الوقت كباراميتر ([[now]]) عشان نتحكم فيه، وبعتنا ١٠ طلبات: ٥ في الثانية ٥٩ من دقيقة، و ٥ في أول ثانية من الدقيقة اللي بعدها. والحد ٥:

~~~text الناتج
fixed 10 of 10 allowed within 1.4 s
sliding 5 of 10 allowed within 1.4 s
~~~

الـ fixed window عدّى **١٠** في ١.٤ ثانية، ضعف الحد: كل دقيقة ليها عداد لوحدها، والطلبات اتقسمت على عدادين. ده مش مشكلة لـ login (١٠ محاولات بدل ٥ مش كارثة)، بس مشكلة لو الحد بيحمي حاجة بتتدفع (SMS أو AI).

### الـ sliding window بـ sorted set

~~~python
async def sliding(who, now, limit=5, window=60):
    key = f"rl:slide:{who}"
    async with r.pipeline(transaction=True) as p:
        p.zremrangebyscore(key, 0, now - window)
        p.zadd(key, {uuid.uuid4().hex: now})
        p.zcard(key)
        p.expire(key, window)
        _, _, count, _ = await p.execute()
    return count <= limit
~~~

- الـ **sorted set** في Redis: عناصر فريدة، وكل عنصر ليه رقم (score) والترتيب بيه. هنا كل طلب عنصر، والـ score وقته.
- [[zremrangebyscore(key, 0, now - window)]]: امسح الطلبات اللي أقدم من ٦٠ ثانية من **دلوقتي** (مش من أول الدقيقة).
- [[zadd(key, {uuid: now})]]: ضيف الطلب ده. الـ [[uuid4().hex]] اسم فريد، عشان طلبين في نفس الملّي ثانية ميبقوش عنصر واحد.
- [[zcard(key)]]: عدد الطلبات في آخر ٦٠ ثانية.
- [[_, _, count, _]]: [[execute]] بيرجّع نتيجة الأربع أوامر، واحنا عايزين التالتة بس.

التمن: ذاكرة أكتر (عنصر لكل طلب بدل رقم واحد)، و ٤ أوامر بدل ٢. ومكتبة [[limits]] بتعمل الـ sliding و token bucket جاهزين لو مش عايز تكتبهم.

---

## ٩. لو Redis وقع؟

قرار لازم تاخده قبل ما يحصل:

| الاختيار | بيحصل إيه | يناسب |
|---|---|---|
| fail open | امسك [[RedisError]] وعدّي الطلب، وسجّل warning | البحث والـ endpoints العادية: الأحسن تشتغل من غير حماية دقايق من إنها تقع |
| fail closed | امسك [[RedisError]] وارجع 503 | OTP والـ endpoints اللي بتصرف فلوس: من غير عداد ممكن حد يبعت ألف SMS |

وفي الحالتين حط [[socket_connect_timeout]] و [[socket_timeout]] على الـ client (درس «redis cache»: من غيرهم الطلب استنى ٤ ثواني على ويندوز قبل ما يقع).

---

## السطور كلها

| الكود | بيعمل إيه |
|---|---|
| [[app.state.redis]] من الـ lifespan | client لكل تطبيق و event loop، مش global على مستوى الـ module |
| [[int(time.time() // window)]] | رقم النافذة الحالية، بيتغير كل دقيقة |
| [[f"rl:{path}:{who}:{bucket}"]] | مفتاح لكل مسار و IP ونافذة |
| [[pipe.incr(key).expire(key, window).execute()]] | زوّد العداد وحط له عمر، الاتنين جوه MULTI و EXEC |
| [[count > limit]] | عدّى الحد: ارجع 429 |
| [[window - int(time.time()) % window]] | ثواني لحد النافذة الجاية، وهي قيمة [[Retry-After]] |

## الخلاصة

- العداد في Redis عشان يبقى واحد لكل الـ workers والـ containers، والـ client في الـ lifespan.
- [[INCR]] و [[EXPIRE]] مع بعض دايمًا، وإلا المستخدم يتقفل للأبد.
- الـ fixed window ممكن يعدّي ضعف الحد على حدود دقيقتين (اتقاس: ١٠ من ١٠)، والـ sliding window بيقفل عند الحد بالظبط.
- ورا proxy، [[request.client.host]] هو IP الـ proxy: ظبط [[--proxy-headers]] قبل ما تعتمد عليه.
- قرّر قبلها: لو Redis وقع، fail open ولا fail closed.`,
          lines: [
            R`[[time]] عشان [[time.time()]] (الثواني من أول 1970)، ومنها بنحسب رقم الدقيقة الحالية والثواني الباقية فيها.`,
            R`[[asynccontextmanager]] عشان نكتب الـ lifespan كدالة فيها [[yield]]: الـ client يتعمل قبلها ويتقفل بعدها.`,
            R`الـ client الـ async من redis-py. لو استخدمت النسخة الـ sync جوه [[async def]]، كل أمر Redis هيوقّف الـ event loop لحد ما يرجع.`,
            R`[[Depends]] عشان نركّب الفحص على الـ route، و [[HTTPException]] للـ 429، و [[Request]] عشان نعرف IP العميل والمسار ونوصل لـ [[app.state]].`,
            R`الـ decorator اللي بيحوّل [[lifespan]] لـ context manager يفهمه FastAPI.`,
            R`[[lifespan]] بتتنادى مرة لكل تشغيل تطبيق (ومرة لكل [[with TestClient(app)]] في الاختبارات)، فالـ client بيتربط بالـ event loop الصح كل مرة.`,
            R`الـ client هنا مش على مستوى الـ module. اتجرّب: الـ client الـ global وقع في تاني [[TestClient]] بـ [[Event loop is closed]]، ومن الـ lifespan الجولتين عدّوا.`,
            R`[[yield]]: التطبيق شغال هنا وبيستقبل طلبات.`,
            R`بعد الإيقاف: [[aclose()]] بيقفل كل اتصالات الـ pool بنضافة بدل ما تتساب للـ garbage collector ويطلع warnings.`,
            R`التطبيق، والـ lifespan مربوطة بيه. من غير [[lifespan=lifespan]] الـ [[app.state.redis]] مش هيتعمل وأول طلب يرمي [[AttributeError]].`,
            R`factory: دالة بتاخد الحد وطول النافذة وترجّع dependency جاهزة. كده [[rate_limit(5)]] لـ login و [[rate_limit(3, 300)]] لـ OTP بنفس الكود.`,
            R`الـ dependency الحقيقية اللي FastAPI بيناديها مع كل طلب. بتشوف [[limit]] و [[window]] من الدالة اللي برّه (closure).`,
            R`الـ client من [[app.state]]، نفس الـ object لكل الطلبات في الـ worker ده، وجواه pool اتصالات.`,
            R`مين؟ IP العميل. [[request.client]] ممكن يبقى [[None]] في حالات نادرة فبنحط [["unknown"]]. وبعد الـ login الأحسن الـ user id، لأن ناس كتير ممكن يبقوا ورا IP واحد (شركة أو موبايل).`,
            R`[[time.time() // window]] قسمة صحيحة، فكل الثواني في نفس الدقيقة بتدّي نفس الرقم. و [[int]] عشان الناتج float ([[29856092.0]]) ومش عايزين [[.0]] في المفتاح.`,
            R`مفتاح لكل مسار و IP ودقيقة، زي [[rl:/auth/login:127.0.0.1:29856092]]. أول ما الدقيقة تتغير المفتاح يتغير، فالعداد يبدأ من صفر لوحده.`,
            R`[[pipeline(transaction=True)]] بيجمّع الأوامر ويبعتهم في رحلة واحدة جوه [[MULTI]] و [[EXEC]]، فمفيش أمر من client تاني يدخل بينهم، ولو الاتصال وقع مفيش مفتاح يفضل من غير عمر.`,
            R`[[incr]] بيزوّد العداد ويرجّع الرقم الجديد (atomic: طلبين مع بعض مستحيل ياخدوا نفس الرقم)، و [[expire]] بيدّيه عمر ٦٠ ثانية. و [[execute()]] بيرجّع [[[6, True]]]، و [[_]] لنتيجة الـ expire اللي مش محتاجينها.`,
            R`عدّى الحد؟ بـ [[>]] مش [[>=]]: الطلب الخامس عداده ٥ ولسه مسموح، والسادس ٦ فيترفض.`,
            R`[[%]] باقي القسمة: [[int(time.time()) % 60]] الثانية الحالية جوه الدقيقة، فالباقي على الدقيقة الجاية [[60 - ده]].`,
            R`429 Too Many Requests، و header [[Retry-After]] بعدد الثواني كنص (قيم الـ headers لازم strings). العميل المحترم بيستنى الرقم ده بدل ما يكرر على طول.`,
            R`الـ factory بترجّع الدالة نفسها من غير ما تناديها، و FastAPI هو اللي بيناديها مع كل طلب.`,
            R`[[dependencies=[Depends(rate_limit(5))]]] لأن الـ route مش محتاج قيمة من الفحص، محتاجه يحصل وبس. و [[rate_limit(5)]] بقوسين صح هنا: النداء ده بيعمل الـ dependency وقت تعريف الـ route.`,
            R`الـ route بيتنفّذ بس لو الفحص عدّى. لو الـ dependency رمت 429، الدالة دي متتناديش خالص.`,
            R`الرد العادي. في التطبيق الحقيقي هنا فحص الباسورد وعمل التوكن (درس «auth dependency»).`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** الحد ٥ والنافذة ٦٠. يوزر بعت ٣ طلبات في الثانية ١٠، و ٣ في الثانية ٥٠، و ٣ في الثانية ٦٥ (الدقيقة اللي بعدها). اكتب أنهي طلبات هترجع 429، وقيمة [[Retry-After]] لأول 429.`, done: R`إجابتك: آخر طلب في الثانية ٥٠ بس هو اللي 429 (العداد ٦)، و [[Retry-After: 10]]، والتلاتة في الثانية ٦٥ عدّوا (مفتاح جديد). ولو جربتها بنسخة الوقت كباراميتر طلعت نفس الحاجة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** نسخة فيها [[count = await r.incr(key)]] و [[if count == 1: await r.expire(key, window)]] من غير pipeline. اشرح إيه اللي يحصل لو الـ worker وقع بين السطرين، ومثّلها برمي exception بين السطرين.`, done: R`بعد الـ exception [[TTL]] على المفتاح بيرجّع [[-1]] (عايش للأبد)، فاليوزر ده هيتقفل للأبد بعد ٥ طلبات. وبعد التصليح بالـ pipeline التجربة نفسها مبتسيبش مفتاح من غير عمر.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** اختبار بـ TestClient بيبعت ٦ طلبات ويتأكد إن آخر واحد 429 وفيه [[Retry-After]] رقم بين 1 و 60، واختبار تاني بنفس الملف بيبعت طلب واحد ويتأكد إنه 200.`, done: R`الاتنين بيعدّوا مع بعض ومرتين ورا بعض (كل اختبار بيمسح مفاتيح [[rl:*]] في أوله)، ومفيش [[Event loop is closed]] لأن الـ client من الـ lifespan.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** اكتب الـ sliding window بـ sorted set، وابعت ١٠ طلبات على حدود دقيقتين للنسختين (الوقت باراميتر).`, done: R`الـ fixed عدّى ١٠ من ١٠ والـ sliding ٥ من ١٠، و [[ZCARD]] على مفتاح الـ sliding بعد كده ١٠ (المرفوضة بتتسجّل برضه)، وكاتب إمتى الفرق ده يستاهل الذاكرة الزيادة.` },
            { lvl: 'تحدي', t: R`**ابني:** خلّي [[rate_limit]] تاخد [[key_func]] ([[lambda request: request.client.host]] افتراضيًا)، وباراميتر [[fail_open: bool]]، واستخدمها على [[/search]] بـ fail open وعلى [[/otp]] بـ fail closed.`, done: R`مع Redis واقف: [[/search]] بيرجّع 200 وفي اللوج warning، و [[/otp]] بيرجّع 503، والاتنين في أقل من ثانية (فيه [[socket_timeout]]). ومع Redis شغال الحدود شغالة زي الأول.` },
          ],
          sol: R`الناتج: خمس [[200]] وبعدين [[429]] و [[429]]. ولو جربت [[curl -i]] على طلب زيادة هتشوف [[HTTP/1.1 429 Too Many Requests]] و [[retry-after: 11]] مثلًا (الثواني الباقية على الدقيقة) و [[{"detail":"Too many requests"}]].

و [[SCAN 0 MATCH rl:*]] بيرجع cursor ([[0]] يعني خلص) ومفتاح زي [[rl:/auth/login:127.0.0.1:29845334]]: الـ path، والـ IP، ورقم الدقيقة من أول 1970. و [[GET]] عليه بيطلّع [[7]]. لو لقيت الطلب السادس رجع 200، غالبًا الدقيقة خلصت في النص والعداد بدأ من جديد: ده عيب الـ fixed window، ممكن حد يبعت ١٠ في ثانيتين على حدود دقيقتين. ولو السيرفر ورا Nginx أو load balancer، [[request.client.host]] هيبقى IP الـ proxy للكل، فالكل هيتقفل مع بعض، لازم تقرا [[X-Forwarded-For]] من proxy بتثق فيه.`
        },
        {
          cmd: "BackgroundTasks",
          title: "شغل بعد ما الرد يتبعت: إيميل، لوج، webhook",
          desc: R`[[BackgroundTasks]] بيخلّيك تضيف دالة تشتغل بعد ما الرد يوصل للعميل: [[tasks.add_task(send_email, to, body)]]. فالعميل مش بيستنى الإيميل يتبعت.

بس هي بتشتغل جوه نفس الـ process: لو السيرفر اتعمله restart أو وقع، الشغل ضاع، ومفيش retry. فهي للحاجات الخفيفة اللي لو ضاعت مش مشكلة. والشغل المهم أو التقيل (فواتير، معالجة صور، تقارير) مكانه queue و worker منفصل: arq أو Celery أو Dramatiq أو taskiq.`,
          example: R`import asyncio
import logging
from fastapi import BackgroundTasks, FastAPI
from pydantic import BaseModel, EmailStr
log = logging.getLogger("app")
app = FastAPI()
class Signup(BaseModel):
    email: EmailStr
async def send_welcome(email: str) -> None:
    try:
        await asyncio.sleep(1)
        log.info("welcome sent to %s", email)
    except Exception:
        log.exception("welcome email failed for %s", email)
def audit(event: str, email: str) -> None:
    log.info("audit %s %s", event, email)
@app.post("/signup", status_code=201)
async def signup(data: Signup, tasks: BackgroundTasks):
    tasks.add_task(send_welcome, data.email)
    tasks.add_task(audit, "signup", data.email)
    return {"ok": True}
# شغل مهم: queue و worker بـ arq (بيتخزن في Redis وبيتعاد لو فشل)
# pool = await arq.create_pool(RedisSettings())
# await pool.enqueue_job("generate_invoice", order_id)`,
          try: R`خلّي [[send_welcome]] تستنى ٥ ثواني، وابعت [[curl -w "%{time_total}\n" -X POST localhost:8000/signup -H "Content-Type: application/json" -d '{"email": "a@example.com"}']]: الرد هيرجع فورًا، واللوج هيظهر بعد ٥ ثواني. وبعدين اقفل السيرفر بالقوة في النص (Ctrl+C مرتين، أو [[kill -9]] للـ PID) وشوف الإيميل ضاع. (الـ restart العادي uvicorn بيستنى فيه الـ tasks تخلص، بس الـ crash أو الـ SIGKILL بعد مهلة الـ deploy بيضيّعها.)`,
          flag: "script",
          deep: {
            why: "التسجيل بياخد ٣ ثواني لأن الـ route مستني SMTP يرد، والمستخدم مش محتاج يستنى الإيميل عشان يشوف «تم». بس لو حطيت شغل مهم في BackgroundTasks، أول deploy هيضيّع طلبات من غير ما حد يعرف.",
            how: R`الـ tasks بتتنفذ بالترتيب بعد ما الـ response يتبعت، في نفس الـ event loop (لو [[async def]]) أو في threadpool (لو [[def]]). ولو واحدة رمت exception، اللي بعدها مش هتشتغل، فحط try/except جواها.

و [[BackgroundTasks]] ينفع ييجي في dependency كمان، و FastAPI بيجمعهم كلهم.

ومهم: متستخدمش حاجة من الـ request في الـ task (الاتصال من dependency بـ yield، أو الـ session): ممكن تكون اتقفلت. ابعت القيم اللي محتاجها (الإيميل، الـ id)، والـ task تفتح اللي محتاجاه بنفسها.

الـ worker والـ queue: الطلب بيتكتب في Redis أو RabbitMQ، و process منفصلة (container تاني) بتسحب وتنفّذ، ولو فشلت بتعيد، ولو السيرفر وقع الطلب لسه في الـ queue. و arq بسيط و async ومبني على Redis، و Celery الأقدم والأكبر. وفي الـ outbox pattern (درس transactions)، الـ worker بيقرا من جدول في القاعدة بدل queue. والفكرة كاملة في «background jobs» في تاب «بناء مشروع كامل».`,
            when: "BackgroundTasks: لوج، و analytics، وإيميل «أهلًا» مش حرج، و invalidate cache. و queue: أي حاجة لازم تحصل (فواتير، webhooks للعملاء)، أو تقيلة (صور، PDF، AI)، أو محتاجة retry أو جدولة.",
            mistakes: R`معالجة فيديو في BackgroundTasks (بتاكل CPU الـ API نفسه). وتبعت الـ db session للـ task. وتفتكر إن الـ task بتتعاد لو فشلت. وحسبة CPU تقيلة في task [[async def]]: بتقفل الـ loop بعد الرد، والطلبات الجاية هي اللي تستنى.`
          },
          teach: R`## المثال بيعمل إيه؟

route تسجيل بيرد على العميل فورًا بـ 201، وبعد ما الرد يتبعت بيشغّل شغلتين في الخلفية: «إيميل ترحيب» (هنا sleep بيقلّده) وسطر audit في اللوج. وفي الآخر تعليق بيوري الطريقة الصح للشغل المهم: queue في Redis و worker منفصل (arq).

اتشغّل فعلًا بـ FastAPI 0.142 على ويندوز، والطلبات بـ curl من Git Bash. و [[EmailStr]] محتاج مكتبة [[email-validator]]: [[pip install "pydantic[email]"]] (و [[fastapi[standard]]] بيسطّبها).

---

## ١. البداية

~~~python
import asyncio
import logging
from fastapi import BackgroundTasks, FastAPI
from pydantic import BaseModel, EmailStr
log = logging.getLogger("app")
app = FastAPI()
class Signup(BaseModel):
    email: EmailStr
~~~

- [[BackgroundTasks]]: نوع، لما تكتبه في باراميترات الـ route FastAPI بيدّيك object تضيف فيه tasks.
- [[EmailStr]]: string لازم يبقى إيميل صح. جربت [[{"email": "not-an-email"}]]:

~~~text الناتج
{"detail":[{"type":"value_error","loc":["body","email"],"msg":"value is not a valid email address: An email address must have an @-sign.",...}]}
~~~

### خد بالك: اللوج

لو شغّلت المثال زي ما هو، سطور [[log.info]] **مش هتظهر خالص** (جربتها: مفيش ولا سطر). uvicorn بيظبط الـ loggers بتاعته بس، والـ logger بتاعك من غير إعداد بيطبع WARNING وأعلى بس. فضيف بعد الـ imports:

~~~python
logging.basicConfig(level=logging.INFO)
~~~

---

## ٢. [[send_welcome]]: async task

~~~python
async def send_welcome(email: str) -> None:
    try:
        await asyncio.sleep(1)
        log.info("welcome sent to %s", email)
    except Exception:
        log.exception("welcome email failed for %s", email)
~~~

- [[asyncio.sleep(1)]]: بيقلّد الاتصال بسيرفر الإيميل (SMTP أو API).
- الـ [[try/except]] هنا مهم: الـ task بتشتغل **بعد** الرد، فلو رمت exception مفيش عميل يشوفه، والـ tasks اللي بعدها مش هتشتغل. فامسك وسجّل بنفسك.
- [[log.exception]]: يسجّل الرسالة ومعاها الـ traceback.

---

## ٣. [[audit]]: sync task

~~~python
def audit(event: str, email: str) -> None:
    log.info("audit %s %s", event, email)
~~~

[[def]] عادية. FastAPI بيشغّلها في threadpool عشان متقفلش الـ event loop، نفس قاعدة الـ routes.

---

## ٤. الـ route

~~~python
@app.post("/signup", status_code=201)
async def signup(data: Signup, tasks: BackgroundTasks):
    tasks.add_task(send_welcome, data.email)
    tasks.add_task(audit, "signup", data.email)
    return {"ok": True}
~~~

- [[data: Signup]]: الـ body بيتفحص.
- [[tasks: BackgroundTasks]]: FastAPI بيعمل object جديد لكل طلب.
- [[tasks.add_task(send_welcome, data.email)]]: الدالة **من غير ما تناديها** (من غير [[()]])، وبعدها الباراميترات اللي هتتبعتلها. كده FastAPI هو اللي هيناديها بعدين: [[send_welcome("a@example.com")]].
- [[tasks.add_task(audit, "signup", data.email)]]: باراميترين.
- [[return]]: الرد بيتبعت، **وبعدها** الـ tasks بتشتغل بالترتيب.

ولاحظ إننا بعتنا [[data.email]] (string)، مش session قاعدة ولا اتصال من dependency. الحاجات دي ممكن تكون اتقفلت لما الـ task تشتغل.

---

## ٥. نجرّب (بـ [[basicConfig]]، والـ sleep بقى ٥ ثواني)

~~~bash
curl -w "\n%{time_total}\n" -X POST localhost:8000/signup -H "Content-Type: application/json" -d '{"email": "a@example.com"}'
~~~

- [[-H "Content-Type: application/json"]]: بنقول إن الـ body JSON.
- [[-d '...']]: الـ body (و [[-d]] بيخلّي الـ method POST لوحده، و [[-X POST]] للوضوح).
- [[-w "\n%{time_total}\n"]]: اطبع الوقت الكلي بعد الرد.

~~~text الناتج
{"ok":true}
0.007469
~~~

الرد أخد ٧ ملّي ثانية، مع إن الإيميل بياخد ٥ ثواني. ولوج السيرفر (الطلب اتبعت 12:34:27):

~~~text الناتج
INFO:     127.0.0.1:54436 - "POST /signup HTTP/1.1" 201 Created
2026-10-07 12:34:32,774 INFO:app:welcome sent to a@example.com
2026-10-07 12:34:32,799 INFO:app:audit signup a@example.com
~~~

- سطر الـ 201 الأول، وبعد ٥ ثواني الإيميل.
- الـ audit جه **بعد** الإيميل مش معاه: الـ tasks بتشتغل ورا بعض، كل واحدة مستنية اللي قبلها.

### السيرفر وقع في النص

بعت طلب لـ [[b@example.com]] وقفلت البروسيس بالقوة ([[taskkill /PID <pid> /F]] على ويندوز، أو [[kill -9 <pid>]] على لينكس) بعد ثانية:

~~~text الناتج
{"ok":true} 201
~~~

العميل خد 201، و [[welcome sent to b@example.com]] **عمرها ما ظهرت**، ومفيش أي أثر إنها كانت موجودة. الـ task كانت عايشة في ذاكرة البروسيس بس.

---

## ٦. الشغل المهم: queue

~~~python
# pool = await arq.create_pool(RedisSettings())
# await pool.enqueue_job("generate_invoice", order_id)
~~~

التعليقين دول من مكتبة arq (من الـ docs، مش متشغّلين هنا): [[enqueue_job]] بيكتب الشغلانة في Redis، و worker منفصل ([[arq worker.WorkerSettings]] في container تاني) بيسحبها وينفّذها، ولو فشلت يعيدها. ولو السيرفر وقع، الشغلانة لسه في Redis.

| | BackgroundTasks | queue (arq و Celery) |
|---|---|---|
| بيشتغل فين | نفس بروسيس الـ API | worker منفصل |
| لو السيرفر وقع | الشغل ضاع | لسه في الـ queue |
| retry | مفيش | موجود |
| يناسب | لوج، إيميل مش حرج، مسح cache | فواتير، webhooks، صور، تقارير |

والـ queue الحقيقية (arq و Celery، والـ retry والجدولة) ليها درس لوحدها: «Celery و ARQ» في التاب ده.

---

## ٧. حدود BackgroundTasks بالقياس

اتشغّل فعلًا بـ FastAPI 0.162 و uvicorn 0.54 على ويندوز، بتطبيق فيه ٣ routes.

### task رمت exception: اللي بعدها مش بتشتغل

~~~python
async def boom(email: str) -> None:
    raise ValueError(f"smtp down for {email}")
@app.post("/raise")
async def r1(tasks: BackgroundTasks):
    tasks.add_task(boom, "a@example.com")
    tasks.add_task(audit, "signup", "a@example.com")
    return {"ok": True}
~~~

~~~text الناتج: لوج uvicorn (مختصر)
INFO:     127.0.0.1:64318 - "POST /raise HTTP/1.1" 200 OK
ERROR:    Exception in ASGI application
Traceback (most recent call last):
ValueError: smtp down for a@example.com
~~~

- العميل خد **200** عادي: الرد اتبعت قبل ما الـ task تشتغل، فمحدش هيعرف إن الإيميل فشل غير من اللوج.
- سطر [[audit signup]] **عمره ما ظهر**: أول task رمت، فالـ tasks اللي بعدها اتلغت. عشان كده [[send_welcome]] في المثال جواها [[try/except]].
- uvicorn سجّلها [[Exception in ASGI application]] مع traceback، بس من غير أي إشارة إن ده كان background task. فاكتب لوج بتاعك جوه الـ task.

### الـ [[def]] بتشتغل في thread

~~~text الناتج
INFO app: audit order b@example.com thread=AnyIO worker thread
~~~

[[threading.current_thread().name]] جوه [[audit]] طلع [[AnyIO worker thread]]: الـ task الـ sync بتتبعت للـ threadpool (نفس الـ ٤٠ thread بتوع الـ [[def]] routes)، فمبتقفلش الـ loop. و ١٠٠ task sync بطيئة ممكن تاكل الـ ٤٠ thread وتبطّأ الـ [[def]] routes.

### حسبة CPU في task [[async def]]

task [[async def]] بتعمل [[sum(i*i for i in range(3_000_000))]]، وبعد ٥٠ ملّي ثانية من الطلب بعتنا [[GET /health]]:

~~~text الناتج
cpu task 0.33s
{"ok":true} health 0.236468s
~~~

[[/health]] (اللي مفيهاش أي شغل) استنت ٠.٢٤ ثانية: الـ task شغالة **على الـ event loop** بعد الرد، وطول ما هي بتحسب محدش بيتخدم. الحسبة التقيلة مكانها [[ProcessPoolExecutor]] (درس «workers و GIL») أو worker منفصل.

| الحد | اتقاس إزاي | الحل |
|---|---|---|
| مفيش retry ولا تخزين | [[kill -9]] في النص، والإيميل ضاع | queue (درس «Celery و ARQ») |
| task رمت = الباقي اتلغى | [[boom]] قبل [[audit]]، و audit مظهرتش | [[try/except]] جوه كل task |
| العميل مبيعرفش بالفشل | 200 مع إن الـ task وقعت | لوج، أو حالة في القاعدة العميل يسأل عليها |
| [[async def]] تقيلة بتقفل الـ loop | [[/health]] استنت 0.24s | [[def]] (thread) للـ I/O الـ sync، و process للـ CPU |

---

## السطور كلها

| الكود | بيعمل إيه |
|---|---|
| [[tasks: BackgroundTasks]] | object للـ tasks بتاعة الطلب ده |
| [[tasks.add_task(fn, arg1, arg2)]] | شغّل [[fn(arg1, arg2)]] بعد الرد |
| [[async def]] task | في الـ event loop |
| [[def]] task | في threadpool |
| [[try/except]] جوه الـ task | محدش غيرك هيشوف الخطأ |

## الخلاصة

- العميل مبيستناش الـ tasks، بس الـ tasks بتستنى بعض.
- ابعت للـ task قيم، مش objects من الطلب.
- لو ضياع الشغلانة مشكلة، مكانها queue مش BackgroundTasks.
- وظبط الـ logging ([[basicConfig]]) وإلا [[log.info]] مش هيبان.`,
          lines: [
            R`[[asyncio]] عشان [[asyncio.sleep]] اللي بيقلّد انتظار سيرفر الإيميل من غير ما يوقّف الـ event loop.`,
            R`[[logging]] لأن الـ task بتشتغل بعد الرد، فاللوج هو المكان الوحيد اللي هتعرف منه إنها نجحت أو فشلت. وخد بالك: من غير [[logging.basicConfig(level=logging.INFO)]] سطور [[info]] مش بتظهر خالص.`,
            R`[[BackgroundTasks]]: نوع، لما تكتبه في باراميترات الـ route FastAPI بيدّيك object جديد لكل طلب تضيف فيه شغل يتعمل بعد الرد.`,
            R`[[EmailStr]] بيفحص إن النص شكله إيميل، ومحتاج [[pip install "pydantic[email]"]] (و [[fastapi[standard]]] بيسطّبها). من غيرها import الموديل نفسه بيرمي [[ImportError]].`,
            R`logger باسم [[app]]. الاسم ده بيظهر في كل سطر ([[INFO:app:...]])، فتفرّق رسايلك عن رسايل uvicorn.`,
            R`التطبيق. مفيش lifespan هنا لأن مفيش موارد مشتركة.`,
            R`موديل الـ body. FastAPI بيفحصه قبل ما الـ route يشتغل، فلو الإيميل بايظ بيرجّع 422 والـ tasks متتضافش أصلًا.`,
            R`حقل واحد إجباري. [[{"email": "not-an-email"}]] بيرجّع 422 برسالة [[An email address must have an @-sign]].`,
            R`الـ task نفسها، دالة [[async def]] عادية. FastAPI بيناديها على الـ event loop بعد ما الرد يتبعت.`,
            R`[[try]] حوالين الشغل كله: لو الـ task رمت، العميل مش هيعرف (خد 201 خلاص)، **والـ tasks اللي بعدها في نفس الطلب مش هتشتغل** (اتقاس: [[audit]] اتلغت بعد task رمت).`,
            R`[[asyncio.sleep(1)]] بيقلّد الاتصال بـ SMTP أو API إيميل. في الحقيقة هنا [[await]] لمكتبة async، مش [[smtplib]] الـ sync (اللي كانت هتقفل الـ loop).`,
            R`سطر نجاح بالإيميل، بـ [[%s]] مش f-string عشان الـ formatting يحصل بس لو السطر هيتطبع.`,
            R`[[except Exception]] بيمسك أي خطأ عادي (ومش بيمسك [[KeyboardInterrupt]] و [[CancelledError]]، وده المطلوب عشان الـ shutdown يفضل شغال).`,
            R`[[log.exception]] بيسجّل الرسالة **ومعاها الـ traceback** كامل، ولازم تتنادى جوه [[except]]. ده اللي هيقولك بعدين ليه الإيميل ماوصلش.`,
            R`task بـ [[def]] عادية: FastAPI بيشغّلها في threadpool (اتقاس: الـ thread اسمه [[AnyIO worker thread]])، فلو جواها مكتبة sync مش هتقفل الـ loop.`,
            R`سطر audit بالحدث والإيميل. في الحقيقة ممكن يبقى INSERT في جدول audit، بس بما إنه في BackgroundTasks، ضياعه مقبول.`,
            R`[[status_code=201]] عشان ده إنشاء (Created). والـ route مش هيستنى أي task قبل ما يرد.`,
            R`[[tasks: BackgroundTasks]]: FastAPI بيشوف النوع ويدّيك object الطلب ده. مش محتاج [[Depends]].`,
            R`[[add_task(fn, *args)]]: الدالة **من غير أقواس**، وبعدها الباراميترات. بنبعت [[data.email]] (نص) مش session ولا اتصال من dependency، لأن دول ممكن يكونوا اتقفلوا لما الـ task تشتغل.`,
            R`task تانية بباراميترين. بتشتغل **بعد** الأولى ما تخلص، مش معاها: اتقاس إن الـ audit ظهر بعد الإيميل بـ ٢٥ ملّي ثانية.`,
            R`الرد بيتبعت للعميل فورًا (اتقاس: ٧ ملّي ثانية مع إن الإيميل ٥ ثواني)، والـ tasks بتبدأ بعده بالترتيب.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب من الذاكرة ٤ فروق بين BackgroundTasks و queue (زي arq) من ناحية: بيشتغل فين، ولو السيرفر وقع، والـ retry، وإيه اللي يناسب كل واحد. وبعدين قارن بالجدول في الدرس.`, done: R`الأربع خانات صح، ومعاك مثالين لكل واحد من شغلك أو مشروع متخيّل (مثلًا: مسح cache لـ BackgroundTasks، وفاتورة لـ queue).` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** route بيضيف ٣ tasks بالترتيب: [[a]] (بتطبع وتستنى ثانية)، و [[b]] (بترمي [[ValueError]])، و [[c]] (بتطبع). اكتب الرد اللي العميل هياخده، وأنهي سطور هتظهر في اللوج وبأنهي ترتيب، وبعدين شغّلها بـ uvicorn.`, done: R`العميل خد 200 فورًا، واللوج فيه سطر [[a]] وبعده بثانية [[Exception in ASGI application]] بـ [[ValueError]]، وسطر [[c]] مظهرش خالص.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** route بيعمل [[tasks.add_task(send_receipt, db_session, order)]] و [[send_receipt]] بتعمل query بالـ session. اشرح ليه ده خطر لو الـ session جاية من dependency بـ [[yield]]، وغيّره يبعت [[order.id]] بس والـ task تفتح session بنفسها.`, done: R`الكود الجديد مفيهوش أي object من الطلب في [[add_task]] (قيم بسيطة بس)، والـ task بتفتح وتقفل الـ session جواها بـ [[async with]]، وشغّلتها ٣ مرات ورا بعض من غير errors.` },
            { lvl: 'تطبيق', t: R`**قيس:** ضيف task [[async def]] بتعمل حسبة CPU (ثلث ثانية)، وابعت [[/health]] بعد الطلب بـ ٥٠ ملّي ثانية. وبعدين خلّي الحسبة تتبعت لـ [[ProcessPoolExecutor]] من جوه الـ task وقيس تاني.`, done: R`عندك رقمين: [[/health]] استنت مئات الملّي ثواني في الأول (عندنا 0.24s)، وبعد الـ executor رجعت لأقل من ٢٠ ملّي ثانية.` },
            { lvl: 'تحدي', t: R`**ابني:** route [[POST /orders]] بيحفظ الطلب، وبيضيف task «إيميل تأكيد» بتكتب في جدول [[outbox]] حالة [[pending]] **قبل** ما ترد، والـ task بتبعت وتحدّث الحالة لـ [[sent]]. وسكربت صغير بيدوّر على [[pending]] أقدم من دقيقة ويبعتهم تاني.`, done: R`لو قفلت السيرفر بـ [[kill -9]] (أو [[taskkill /F]]) بعد الطلب، الصف لسه [[pending]]، والسكربت لما يشتغل بيبعته ويحوّله [[sent]]، ومفيش إيميل بيتبعت مرتين لو شغّلت السكربت مرتين.` },
          ],
          sol: R`الأول ضيف [[logging.basicConfig(level=logging.INFO)]] بعد الـ imports: من غيره سطور [[log.info]] مش هتظهر خالص، لأن uvicorn مبيظبطش الـ logger بتاعك، والإعداد الاحتياطي في Python بيطبع WARNING وأعلى بس. [[curl]] بيطبع [[{"ok":true}]] و [[time_total]] حوالي [[0.007]] ثانية، ولوج السيرفر بيطبع [[POST /signup HTTP/1.1" 201 Created]] على طول، وبعد ٥ ثواني [[welcome sent to a@example.com]] وبعده على طول [[audit signup a@example.com]]. لاحظ إن الـ audit استنى الإيميل يخلص: الـ tasks بتشتغل ورا بعض بالترتيب، مش مع بعض.

ولو بعت طلب تاني وعملت [[kill -9]] للسيرفر قبل الخمس ثواني: الـ curl خد 201، بس [[welcome sent to b@example.com]] عمرها ما هتظهر، ومفيش أي أثر إنها كانت موجودة. ده الفرق بين BackgroundTasks و queue زي arq: الـ task عايشة في ذاكرة البروسيس بس. فلو ضياعها مشكلة (فاتورة، دفع، إيميل تأكيد) لازم تتكتب في Redis أو القاعدة الأول.`
        }
      ]
    }
]);

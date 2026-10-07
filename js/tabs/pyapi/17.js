// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "httpx و Redis والشغل في الخلفية",
      l: 3,
      n: "تكلّم APIs تانية صح، و cache و rate limit بـ Redis، وشغل بعد الرد أو في worker",
      items: [
        {
          cmd: "httpx.AsyncClient",
          title: "تكلّم API خارجي من جوه الـ API بتاعك",
          desc: R`[[httpx.AsyncClient]] واحد مشترك للتطبيق كله (يتعمل في الـ lifespan)، مش client جديد مع كل request: بيعيد استخدام الاتصالات (keep-alive)، وده فرق كبير في السرعة. وحدد timeout دايمًا، و [[raise_for_status()]] عشان الـ 4xx و 5xx تبقى exceptions.

وللمحاولة تاني عند فشل مؤقت: retry بـ backoff (مكتبة tenacity، أو loop بسيطة)، بس للطلبات الآمنة (GET، أو اللي فيها idempotency key).

ملحوظة 2026: httpx نفسه نشاطه قلّ، و Pydantic بقت بتصون استكمال ليه اسمه [[httpx2]] بنفس الـ API بالظبط (الفرق [[import httpx2]])، و Starlette الحديث بيفضّله للـ TestClient. الأمثلة هنا بـ httpx لأنه لسه اللي [[fastapi[standard]]] بيسطّبه، والنقل غالبًا تغيير اسم الـ import بس.`,
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
            "لـ sleep في الـ backoff.",
            "الـ lifespan.",
            "httpx.",
            "FastAPI.",
            "lifespan.",
            "بيتنادى مرة.",
            "client واحد للتطبيق كله...",
            "...كل الطلبات تبدأ بالـ URL ده.",
            "٥ ثواني عمومًا، و ٢ للاتصال.",
            "حدود الـ pool.",
            "headers لكل طلب.",
            "والـ client هيتقفل لما التطبيق يقفل.",
            "خزّنه في app.state.",
            "التطبيق شغال هنا.",
            "التطبيق.",
            "GET بـ retry.",
            "لحد ٣ محاولات.",
            "حاول.",
            "الطلب (المسار بيتضاف على base_url).",
            "4xx أو 5xx يبقى exception.",
            "نجح.",
            "مشكلة شبكة أو رد خطأ.",
            "يستاهل نعيد؟ الشبكة و 5xx و 429 آه، وباقي الـ 4xx لأ.",
            "مش مؤقت، أو دي آخر محاولة؟",
            "ارمي نفس الخطأ.",
            "استنى 0.2 وبعدين 0.4 قبل المحاولة الجاية.",
            "عشان mypy: مش هنوصل هنا.",
            "route.",
            "بياخد الـ request عشان يوصل للـ client.",
            "حاول.",
            "رجّع رد الخدمة.",
            "الخدمة فشلت.",
            "502: المشكلة في خدمة ورانا، مش عندنا ولا عند العميل."
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
            "الـ client الـ async من مكتبة redis.",
            "الموديل، و TypeAdapter للـ JSON.",
            "موديل.",
            "حقل.",
            "حقل.",
            "حقل.",
            "adapter لليستة منتجات، يتعمل مرة واحدة.",
            "client جواه pool (في التطبيق: في الـ lifespan).",
            "القاعدة (وهمية هنا).",
            "رجّع.",
            "الدالة اللي بالـ cache.",
            "المفتاح: نوع الداتا ونسختها والفئة.",
            "دوّر في Redis.",
            "موجود؟",
            "حوّله من JSON لموديلات وارجع، من غير ما تلمس القاعدة.",
            "مش موجود: هاته من القاعدة.",
            "خزّنه JSON لمدة ٦٠ ثانية.",
            "رجّع.",
            "لما منتج يتغير.",
            "امسح المفتاح، والطلب الجاي يجيب الجديد."
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
import redis.asyncio as redis
from fastapi import Depends, FastAPI, HTTPException, Request
r = redis.from_url("redis://localhost:6379/0")
app = FastAPI()
def rate_limit(limit: int, window: int = 60):
    async def dep(request: Request) -> None:
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

اتشغّل فعلًا بـ redis-py 8.1 و FastAPI 0.142 على ويندوز، على Redis 8 في Docker، والطلبات بـ curl من Git Bash وبـ PowerShell.

---

## ١. البداية

~~~python
import time
import redis.asyncio as redis
from fastapi import Depends, FastAPI, HTTPException, Request
r = redis.from_url("redis://localhost:6379/0")
app = FastAPI()
~~~

[[time]] عشان الوقت الحالي، والـ client من غير [[decode_responses]] لأننا هنقرا أرقام بس (و [[INCR]] بيرجّع int على طول).

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

## السطور كلها

| الكود | بيعمل إيه |
|---|---|
| [[int(time.time() // window)]] | رقم النافذة الحالية |
| [[f"rl:{path}:{who}:{bucket}"]] | مفتاح لكل مسار و IP ونافذة |
| [[pipe.incr(key).expire(key, window).execute()]] | زوّد وحط عمر، في MULTI و EXEC |
| [[count > limit]] | 429 |
| [[window - int(time.time()) % window]] | ثواني لحد النافذة الجاية = [[Retry-After]] |

## الخلاصة

- العداد في Redis عشان يبقى واحد لكل الـ workers والـ containers.
- [[INCR]] و [[EXPIRE]] مع بعض دايمًا، وإلا المستخدم يتقفل للأبد.
- الـ fixed window ممكن يعدّي ضعف الحد على حدود دقيقتين.
- ورا proxy، [[request.client.host]] هو IP الـ proxy: ظبط [[--proxy-headers]] قبل ما تعتمد عليه.`,
          lines: [
            "للوقت.",
            "Redis async.",
            "FastAPI.",
            "client (في التطبيق: في الـ lifespan).",
            "التطبيق.",
            "factory: الحد وطول النافذة بالثواني.",
            "الـ dependency الحقيقية.",
            "مين؟ الـ IP هنا، أو الـ user id بعد الـ login.",
            "رقم النافذة الحالية: بيتغير كل دقيقة.",
            "مفتاح لكل مسار ومستخدم ونافذة.",
            "أوامر في رحلة واحدة جوه MULTI و EXEC.",
            "زوّد العداد، وحط له عمر، وخد الناتج.",
            "عدّى الحد؟",
            "فاضل كام ثانية للنافذة الجاية.",
            R`429، و [[Retry-After]] بيقول للعميل يستنى قد إيه.`,
            "رجّع الـ dependency.",
            "٥ محاولات login في الدقيقة لكل IP.",
            "الـ route.",
            "رجّع."
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
            "لـ sleep.",
            "logging.",
            "BackgroundTasks.",
            "الموديل.",
            "logger.",
            "التطبيق.",
            "الـ body.",
            "حقل.",
            "الشغل اللي هيحصل بعد الرد.",
            "أي خطأ هنا مش هيوصل للعميل، فلازم تمسكه بنفسك.",
            "كأنه اتصال بـ SMTP.",
            "لوج.",
            "امسك.",
            "سجّل الخطأ كامل.",
            "task sync: بتشتغل في threadpool.",
            "لوج.",
            "route.",
            "FastAPI بيدّيك object الـ tasks.",
            "ضيف task بالباراميترات (قيم، مش objects من الـ request).",
            "تانية، بتشتغل بعد الأولى.",
            "الرد بيتبعت فورًا، والـ tasks بعده."
          ],
          sol: R`الأول ضيف [[logging.basicConfig(level=logging.INFO)]] بعد الـ imports: من غيره سطور [[log.info]] مش هتظهر خالص، لأن uvicorn مبيظبطش الـ logger بتاعك، والإعداد الاحتياطي في Python بيطبع WARNING وأعلى بس. [[curl]] بيطبع [[{"ok":true}]] و [[time_total]] حوالي [[0.007]] ثانية، ولوج السيرفر بيطبع [[POST /signup HTTP/1.1" 201 Created]] على طول، وبعد ٥ ثواني [[welcome sent to a@example.com]] وبعده على طول [[audit signup a@example.com]]. لاحظ إن الـ audit استنى الإيميل يخلص: الـ tasks بتشتغل ورا بعض بالترتيب، مش مع بعض.

ولو بعت طلب تاني وعملت [[kill -9]] للسيرفر قبل الخمس ثواني: الـ curl خد 201، بس [[welcome sent to b@example.com]] عمرها ما هتظهر، ومفيش أي أثر إنها كانت موجودة. ده الفرق بين BackgroundTasks و queue زي arq: الـ task عايشة في ذاكرة البروسيس بس. فلو ضياعها مشكلة (فاتورة، دفع، إيميل تأكيد) لازم تتكتب في Redis أو القاعدة الأول.`
        }
      ]
    }
]);

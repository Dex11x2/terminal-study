// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "Dependencies",
      l: 2,
      n: "Depends بيجهّز اللي الـ route محتاجه (اتصال، مستخدم، إعدادات) قبل ما يشتغل، ويقفله بعد ما يخلص",
      items: [
        {
          cmd: "Depends و Annotated",
          title: "تجهّز حاجة لكل route من غير ما تكررها",
          desc: R`الـ dependency دالة FastAPI بيناديها قبل الـ route ويبعت ناتجها كباراميتر. بتاخد باراميترات زي الـ route بالظبط (query و headers وغيرها)، وممكن تعتمد على dependencies تانية.

والطريقة الحديثة: [[Annotated[Type, Depends(fn)]]] وتسمّيه مرة ([[CurrentUser]] و [[Conn]] و [[PageDep]])، وبعدين أي route يكتب [[user: CurrentUser]] وخلاص.`,
          example: R`from typing import Annotated
from fastapi import Depends, FastAPI, Header, HTTPException, Query
from pydantic import BaseModel
app = FastAPI()
class Page(BaseModel):
    limit: int
    offset: int
def pagination(page: Annotated[int, Query(ge=1)] = 1, size: Annotated[int, Query(ge=1, le=100)] = 20) -> Page:
    return Page(limit=size, offset=(page - 1) * size)
PageDep = Annotated[Page, Depends(pagination)]
async def tenant_id(x_tenant_id: Annotated[str, Header()]) -> str:
    if not x_tenant_id.isalnum():
        raise HTTPException(400, "bad tenant")
    return x_tenant_id
TenantDep = Annotated[str, Depends(tenant_id)]
@app.get("/orders")
async def list_orders(page: PageDep, tenant: TenantDep):
    return {"tenant": tenant, "limit": page.limit, "offset": page.offset}
@app.get("/products")
async def list_products(page: PageDep):
    return {"limit": page.limit, "offset": page.offset}`,
          try: R`اطلب [[/orders?page=3]] من غير header [[X-Tenant-Id]] وشوف الـ 422، وبعدين بيه ([[curl -H "X-Tenant-Id: acme" "localhost:8000/orders?page=3"]]). وافتح [[/docs]] وشوف باراميترات الـ dependency ظهرت على الـ route.`,
          flag: "script",
          deep: {
            why: "كل route محتاج نفس الحاجات: اتصال بالقاعدة، والمستخدم الحالي، والإعدادات، والـ pagination. من غير dependencies بتنسخ نفس ٥ سطور في كل route، وأول ما تغيّر حاجة تنسى مكان. وكمان الـ dependency injection بيخلّي الاختبار سهل: تبدّل الـ dependency بنسخة وهمية.",
            how: R`FastAPI بيقرا الـ signature، ويلاقي [[Depends(fn)]]، فيقرا signature الـ fn هي كمان، ويبني شجرة. ومع كل request بيحل الشجرة من تحت لفوق: ينادي كل dependency، ويبعت نواتجها.

الـ cache: لو نفس الـ dependency مطلوبة في كذا مكان في نفس الـ request (الـ route واتنين dependencies تانيين)، بتتنادى مرة واحدة والناتج بيتشارك. و [[Depends(fn, use_cache=False)]] لو عايزها كل مرة.

باراميترات الـ dependency بتظهر في التوثيق وبتتفحص زي باراميترات الـ route بالظبط، و [[HTTPException]] منها بيوقف الـ request قبل ما الـ route يشتغل. و [[x_tenant_id]] بيتقري من header اسمه [[x-tenant-id]] (الـ _ بتتحوّل -).

[[def]] ولا [[async def]]: نفس قاعدة الـ routes، والـ [[def]] بتشتغل في threadpool.

والـ class ينفع يبقى dependency ([[Depends(Pagination)]] بينادي الـ constructor)، والـ Pydantic model كمان.`,
            when: "أي حاجة بتتكرر في أكتر من route: auth، واتصال القاعدة، والإعدادات، والـ pagination، و tenant، و rate limit، و feature flags.",
            mistakes: R`[[Depends(get_db())]] بالقوسين: كده بتنادي الدالة مرة وقت التعريف وتبعت ناتجها. اكتب اسمها بس. و [[page: Page = Depends(pagination)]] في كل route بدل ما تعمل النوع مرة بـ Annotated. و dependency تقيلة (query على القاعدة) على كل الـ routes وهي لازمة لبعضهم بس.`
          },
          teach: R`## المثال بيعمل إيه؟

فيه dependencies اتنين: واحدة بتحوّل [[page]] و [[size]] من الـ query لـ [[limit]] و [[offset]]، وواحدة بتقرا header اسمه [[X-Tenant-Id]] وتتأكد منه. وبعدين routes اتنين بيستخدموهم من غير ما يكرروا ولا سطر. كل الناتج هنا من تشغيل حقيقي: FastAPI 0.142 و Python 3.14 على ويندوز، والسيرفر بـ [[uvicorn main:app --port 8000]] (أو [[fastapi dev]])، والطلبات بـ [[curl]] من Git Bash ومن PowerShell.

---

## ١. الـ imports

~~~python
from typing import Annotated
from fastapi import Depends, FastAPI, Header, HTTPException, Query
from pydantic import BaseModel
~~~

| الاسم | بتاع إيه |
|---|---|
| [[Annotated]] | بيلزق «معلومة زيادة» على نوع: [[Annotated[int, Query(ge=1)]]] يعني «int، ومعاه إن مصدره الـ query وأقل قيمة 1» |
| [[Depends]] | بيقول لـ FastAPI: «القيمة دي متجيش من الطلب، نادي الدالة دي وهات ناتجها» |
| [[Header]] | الباراميتر ده جاي من header في الطلب، مش من الـ query |
| [[Query]] | الباراميتر جاي من الـ query string ([[?page=3]])، ومعاه قيود زي [[ge]] و [[le]] |
| [[HTTPException]] | exception لو اترمى بيوقف الطلب ويرجّع كود ورسالة |
| [[BaseModel]] | من Pydantic: class بحقول ليها أنواع |

---

## ٢. موديل النتيجة: [[Page]]

~~~python
class Page(BaseModel):
    limit: int
    offset: int
~~~

صندوق فيه رقمين: [[limit]] (هات كام صف) و [[offset]] (اتخطى كام صف من الأول). دول اللي الـ SQL محتاجهم ([[LIMIT 20 OFFSET 40]]). عملناه موديل بدل tuple عشان الـ route يكتب [[page.limit]] باسم واضح.

---

## ٣. أول dependency: [[pagination]]

~~~python
def pagination(page: Annotated[int, Query(ge=1)] = 1, size: Annotated[int, Query(ge=1, le=100)] = 20) -> Page:
    return Page(limit=size, offset=(page - 1) * size)
~~~

دالة عادية خالص، مفيهاش أي حاجة خاصة بـ FastAPI غير الـ annotations:

- [[page: Annotated[int, Query(ge=1)] = 1]]: باراميتر اسمه [[page]] جاي من الـ query، لازم يبقى رقم صحيح، و [[ge=1]] (greater than or equal) يعني أقل حاجة 1. و [[= 1]] القيمة لو مبعتهوش، فهو اختياري.
- [[size]]: نفس الكلام، و [[le=100]] (less than or equal) عشان محدش يطلب مليون صف مرة واحدة.
- [[-> Page]]: بترجع [[Page]].
- [[(page - 1) * size]]: الصفحة 1 تبدأ من 0، والصفحة 3 بحجم 20 تبدأ من [[(3 - 1) * 20 = 40]].

### ليه [[def]] مش [[async def]]؟

مفيش فيها أي انتظار (لا قاعدة ولا شبكة)، فمش محتاجة [[await]]. وFastAPI بيشغّل الـ [[def]] في threadpool، وده مش مشكلة لحسبة صغيرة زي دي. نفس قاعدة الـ routes بالظبط.

---

## ٤. النوع اللي بيتكتب مرة: [[PageDep]]

~~~python
PageDep = Annotated[Page, Depends(pagination)]
~~~

ده مش نداء، ده **اسم لنوع**. بيقول: «النوع [[Page]]، وقيمته بتيجي من نداء [[pagination]]». ولاحظ إن [[Depends(pagination)]] من غير قوسين بعد [[pagination]]: احنا بنديله الدالة نفسها عشان هو اللي يناديها مع كل طلب. لو كتبت [[Depends(pagination())]]، Python هينادي الدالة **مرة واحدة دلوقتي** وقت تحميل الملف، ويدّي [[Depends]] ناتجها (object من [[Page]]) بدل الدالة. جربتها، والتطبيق وقع وهو بيتحمّل، أول ما الـ route اتسجّل:

~~~text الناتج
TypeError: Page(limit=20, offset=0) is not a callable object
~~~

يعني FastAPI استلم [[Page]] جاهز مكان الدالة، ومش عارف يناديه.

---

## ٥. تاني dependency: [[tenant_id]]

~~~python
async def tenant_id(x_tenant_id: Annotated[str, Header()]) -> str:
    if not x_tenant_id.isalnum():
        raise HTTPException(400, "bad tenant")
    return x_tenant_id
TenantDep = Annotated[str, Depends(tenant_id)]
~~~

- [[Header()]]: القيمة جاية من header. واسم الـ header بيتحسب من اسم الباراميتر: الـ [[_]] بتبقى [[-]]، فـ [[x_tenant_id]] بيقرا [[x-tenant-id]]. وأسماء الـ headers في HTTP مش حساسة لحالة الحروف، فـ [[X-Tenant-Id]] هو هو. (ليه مكتبناش الاسم بشرطة؟ لأن Python مبيقبلش [[-]] في اسم متغير.)
- مفيش [[= ...]] يبقى الـ header **إجباري**: لو مش موجود FastAPI بيرجّع 422 قبل ما الدالة تشتغل أصلًا.
- [[.isalnum()]]: دالة string بترجع [[True]] لو كل الحروف حروف أو أرقام. فـ [[acme]] تعدّي و [[ac-me]] لأ.
- [[raise HTTPException(400, "bad tenant")]]: لو اترمى من جوه dependency، الـ route **مش بيشتغل خالص**، والعميل بياخد 400.
- [[return x_tenant_id]]: اللي بترجّعه الـ dependency هو اللي بيوصل للـ route.

---

## ٦. الـ routes

~~~python
@app.get("/orders")
async def list_orders(page: PageDep, tenant: TenantDep):
    return {"tenant": tenant, "limit": page.limit, "offset": page.offset}
@app.get("/products")
async def list_products(page: PageDep):
    return {"limit": page.limit, "offset": page.offset}
~~~

[[page: PageDep]] معناها: «قبل ما تشغّلني، نادي [[pagination]] وحط ناتجها في [[page]]». والـ route نفسه مكتوبش فيه [[Query]] ولا [[Header]] ولا قيود: كل ده جوه الـ dependencies. و [[/products]] بياخد نفس الـ pagination بكلمة واحدة.

### الطلب ماشي إزاي؟

1. طلب [[GET /orders?page=3]] وصل.
2. FastAPI بيبص على باراميترات [[list_orders]]، يلاقي [[PageDep]] و [[TenantDep]].
3. بينادي [[pagination(page=3, size=20)]] → [[Page(limit=20, offset=40)]].
4. بينادي [[tenant_id(x_tenant_id="acme")]] → [[acme]].
5. لو أي واحدة فيهم رمت exception، يوقف ويرد. لو لأ، بينادي [[list_orders(page=..., tenant="acme")]].

---

## ٧. نجرّب

### من غير الـ header

~~~bash
curl -i "localhost:8000/orders?page=3"
~~~

~~~text الناتج
HTTP/1.1 422 Unprocessable Content
content-type: application/json

{"detail":[{"type":"missing","loc":["header","x-tenant-id"],"msg":"Field required","input":null}]}
~~~

- [[-i]] بيطبع الـ status والـ headers قبل الـ body.
- [[422]]: الطلب مش مطابق للمطلوب. و [[loc]] بيقول المكان بالظبط: [[header]] اسمه [[x-tenant-id]]، و [[missing]] يعني مش موجود.

### بالـ header

~~~bash
curl -H "X-Tenant-Id: acme" "localhost:8000/orders?page=3"
~~~

~~~text الناتج
{"tenant":"acme","limit":20,"offset":40}
~~~

[[-H]] بيضيف header. والـ 40 جاية من [[(3 - 1) * 20]].

### tenant فيه شرطة

~~~bash
curl -i -H "X-Tenant-Id: ac-me" "localhost:8000/orders"
~~~

~~~text الناتج
HTTP/1.1 400 Bad Request

{"detail":"bad tenant"}
~~~

ده الـ [[HTTPException]] اللي جوه الـ dependency.

### القيود على الـ pagination

~~~text /products?page=0
{"detail":[{"type":"greater_than_equal","loc":["query","page"],"msg":"Input should be greater than or equal to 1","input":"0","ctx":{"ge":1}}]}
~~~

~~~text /products?size=500
{"detail":[{"type":"less_than_equal","loc":["query","size"],"msg":"Input should be less than or equal to 100","input":"500","ctx":{"le":100}}]}
~~~

~~~text /products (من غير حاجة)
{"limit":20,"offset":0}
~~~

القيود اتطبقت على [[/products]] كمان، مع إن الـ route ده مكتوبش فيه ولا قيد.

### من PowerShell

~~~powershell
Invoke-RestMethod "http://localhost:8000/orders?page=3" -Headers @{"X-Tenant-Id"="acme"}
~~~

~~~text الناتج (pwsh 7 و Windows PowerShell 5.1 نفس الشكل)
tenant limit offset
------ ----- ------
acme      20     40
~~~

[[Invoke-RestMethod]] بيحوّل الـ JSON لـ object ويعرضه جدول. و [[-Headers @{...}]] جدول (hashtable) بالـ headers. ولو عايز الـ JSON زي ما هو: [[curl.exe -H "X-Tenant-Id: acme" "localhost:8000/orders?page=3"]] (بـ [[.exe]]، لأن [[curl]] لوحدها في Windows PowerShell 5.1 اسم تاني لـ [[Invoke-WebRequest]]).

---

## ٨. الـ dependencies في [[/docs]]

لو قريت الـ OpenAPI اللي FastAPI بيولّده ([[/openapi.json]])، باراميترات [[/orders]]:

~~~text باراميترات /orders في openapi.json
page          query   مش إجباري
size          query   مش إجباري
x-tenant-id   header  إجباري
~~~

مع إن الـ route مكتوب فيه [[page]] و [[tenant]] بس. FastAPI بيفك الشجرة ويضيف باراميترات كل dependency للـ route، فالتوثيق والفحص بيتعملوا لوحدهم.

---

## ٩. الـ cache جوه نفس الطلب

لو نفس الـ dependency مطلوبة في كذا مكان في نفس الطلب (في الـ route وفي dependency تانية)، FastAPI بيناديها **مرة واحدة**. جربتها بعداد: route طالب [[dep]] مباشرة وطالب dependency تانية معتمدة على [[dep]]، والناتج كان [[{'a': 1, 'b': 1, 'calls': 1}]]: الدالة اتنادت مرة واحدة. ولو عايزها كل مرة: [[Depends(dep, use_cache=False)]].

---

## السطور كلها

| الكود | بيعمل إيه |
|---|---|
| [[def pagination(page: ..., size: ...)]] | dependency: باراميتراتها بتتقري من الطلب زي الـ route |
| [[Annotated[Page, Depends(pagination)]]] | نوع معناه «نادي pagination وهات ناتجها» |
| [[Header()]] | اقرا من header، و [[_]] تبقى [[-]] |
| [[raise HTTPException]] جوه dependency | الطلب بيقف قبل الـ route |
| [[page: PageDep]] في الـ route | القيمة جاهزة، من غير تكرار |

## الخلاصة

- الـ dependency دالة عادية، و FastAPI بيقرا باراميتراتها من الطلب وبيناديها قبل الـ route.
- اعمل النوع مرة بـ [[Annotated]] وسمّيه ([[PageDep]])، والـ routes تكتب اسمه بس.
- [[Depends(fn)]] من غير قوسين بعد [[fn]].
- الأخطاء من الـ dependency بتوقف الطلب، والقيود والتوثيق بيتنقلوا للـ route لوحدهم.`,
          lines: [
            "Annotated.",
            "Depends، و Header لقراية الـ headers.",
            "موديل للنتيجة.",
            "التطبيق.",
            "شكل الـ pagination.",
            "حقل.",
            "حقل.",
            "dependency: باراميتراتها query عادية بقيود.",
            "حوّلهم لـ limit و offset.",
            "نوع بالـ dependency بتاعته، تكتبه مرة واحدة.",
            R`dependency بتقرا header [[X-Tenant-Id]].`,
            "فحص.",
            "بيوقف الـ request قبل الـ route.",
            "رجّع القيمة.",
            "نوع تاني.",
            "route.",
            "باراميترين، كل واحد جاي من dependency.",
            "استخدمهم.",
            "route تاني بنفس الـ pagination.",
            "سطر واحد.",
            "رجّع."
          ],
          sol: R`من غير الـ header: 422 و [[{"detail": [{"type": "missing", "loc": ["header", "x-tenant-id"], "msg": "Field required", "input": null}]}]]. لاحظ إن FastAPI حوّل [[x_tenant_id]] لـ [[x-tenant-id]] لوحده (الـ underscore بقى شرطة). وبالـ header: [[{"tenant": "acme", "limit": 20, "offset": 40}]]، لأن الصفحة 3 بحجم 20 تبدأ من 40. ولو بعت [[X-Tenant-Id: ac-me]] هتاخد [[400]] و [[bad tenant]] من الـ HTTPException اللي جوه الـ dependency.

وفي [[/docs]] هتلاقي على [[/orders]] تلات باراميترات: [[page]] و [[size]] (query) و [[x-tenant-id]] (header)، مع إن الـ route نفسه مكتوب فيه [[page]] و [[tenant]] بس. FastAPI بيفك الـ dependencies ويضيف باراميتراتها للـ route، وده اللي بيخلي الـ pagination تتكتب مرة وتتوثق في كل مكان.`
        },
        {
          cmd: "dependency بـ yield",
          title: "تفتح اتصال قبل الـ route وتقفله بعده",
          desc: R`لو الـ dependency فيها [[yield]]، اللي قبل الـ yield بيشتغل قبل الـ route، والقيمة اللي بتتعمل لها yield بتروح للـ route، واللي بعد الـ yield (التنضيف) بيشتغل بعد ما الـ route يخلص. ده المكان الطبيعي لـ: خد اتصال من الـ pool، وابدأ transaction، و commit أو rollback، ورجّع الاتصال.

والحاجات المشتركة بين كل الطلبات (الـ pool نفسه، و HTTP client) مكانها الـ [[lifespan]]: بتتعمل مرة لما التطبيق يقوم وتتقفل لما يقفل.`,
          example: R`from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from typing import Annotated
import asyncpg
from fastapi import Depends, FastAPI, Request
@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    app.state.pool = await asyncpg.create_pool("postgresql://app:secret@localhost/shop", min_size=2, max_size=10)
    yield
    await app.state.pool.close()
app = FastAPI(lifespan=lifespan)
async def get_conn(request: Request) -> AsyncIterator[asyncpg.Connection]:
    async with request.app.state.pool.acquire() as conn:
        async with conn.transaction():
            yield conn
Conn = Annotated[asyncpg.Connection, Depends(get_conn, scope="function")]
@app.post("/orders")
async def create_order(conn: Conn):
    order_id = await conn.fetchval("INSERT INTO orders DEFAULT VALUES RETURNING id")
    await conn.execute("INSERT INTO order_events (order_id, kind) VALUES ($1, 'created')", order_id)
    return {"id": order_id}`,
          try: R`ضيف [[raise HTTPException(400)]] بعد أول INSERT وشوف إن مفيش صف اتحط (rollback). وبعدين اطبع حاجة بعد الـ [[yield]] مرة بـ [[scope="function"]] ومرة من غيرها، وشوف بتتطبع قبل الرد ولا بعده.`,
          flag: "script",
          deep: {
            why: "اتصال بيتاخد من الـ pool ومبيرجعش لأن exception حصل في النص: بعد ١٠ أخطاء الـ pool خلص والـ API واقف. و transaction نصها اتنفذ بتسيب داتا بايظة. الـ dependency بـ yield بتضمن التنضيف في كل الحالات، في مكان واحد.",
            how: R`FastAPI بيشغّل الـ dependency لحد الـ yield، ويدّي القيمة للـ route. ولو الـ route رمى exception (حتى [[HTTPException]])، بيترمي جوه الـ dependency عند الـ yield: [[async with conn.transaction()]] بيشوفه فيعمل rollback. ولو مفيش exception بيعمل commit.

التوقيت: الافتراضي ([[scope="request"]]) إن اللي بعد الـ yield بيشتغل بعد ما الرد يتبعت للعميل. يعني الـ commit بيحصل بعد ما العميل خد 200، ولو فشل العميل مش هيعرف. و [[Depends(get_conn, scope="function")]] (FastAPI الحديث) بيخلي التنضيف يشتغل أول ما الـ route يخلص وقبل الرد، فالـ commit الفاشل يبقى 500 زي ما المفروض. (الـ StreamingResponse محتاج العكس: الاتصال مفتوح لحد ما الـ stream يخلص، فسيبها request.)

ولو عملت [[try/except]] حوالين الـ yield، لازم ترمي الـ exception تاني بعد ما تتعامل معاه ([[raise]])، وإلا FastAPI ميعرفش إن حصل خطأ.

والـ [[lifespan]]: [[@asynccontextmanager]] (درس [[with و context managers]]) بيتنادى مرة: اللي قبل الـ yield وقت ما التطبيق يقوم (قبل أي request)، واللي بعده وقت ما يقفل (SIGTERM من [[docker stop]]). و [[app.state]] مكان تحط فيه الحاجات المشتركة وتوصلها من [[request.app.state]]. و [[@app.on_event("startup")]] القديمة deprecated.`,
            when: "أي مورد ليه فتح وقفل لكل request: اتصال DB، و session، و transaction، و lock. والموارد المشتركة طول عمر التطبيق (pool، و httpx client، و Redis، وموديل AI): lifespan.",
            mistakes: R`تعمل [[asyncpg.connect()]] جديد مع كل request (بطيء، وبيخلّص اتصالات Postgres). و [[except Exception: pass]] حوالين الـ yield. وتستخدم الاتصال في BackgroundTask (بعد الرد، الاتصال ممكن يكون رجع للـ pool). و pool على مستوى الـ module بيتعمل وقت الـ import قبل ما يبقى فيه event loop.`
          },
          teach: R`## المثال بيعمل إيه؟

حاجتين بيتفتحوا ويتقفلوا: **الـ pool** (مجموعة اتصالات بـ Postgres) بيتفتح مرة لما التطبيق يقوم ويتقفل لما يقفل، و**اتصال واحد جواه transaction** بيتاخد لكل طلب ويرجع بعده. والـ route بياخد الاتصال جاهز ويعمل INSERT في جدولين: يا الاتنين يتحفظوا، يا ولا واحد.

كل الناتج هنا من تشغيل حقيقي: FastAPI 0.142 و asyncpg 0.32 على ويندوز، و Postgres 18 في Docker ([[docker run --rm -e POSTGRES_USER=app -e POSTGRES_PASSWORD=secret -e POSTGRES_DB=shop -p 5432:5432 postgres:18]])، والجدولين:

~~~sql
CREATE TABLE orders (id serial PRIMARY KEY, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE order_events (id serial PRIMARY KEY, order_id int NOT NULL REFERENCES orders(id), kind text NOT NULL);
~~~

---

## ١. الـ imports

~~~python
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from typing import Annotated
import asyncpg
from fastapi import Depends, FastAPI, Request
~~~

| الاسم | بتاع إيه |
|---|---|
| [[AsyncIterator]] | نوع الرجوع لدالة [[async def]] فيها [[yield]] (async generator) |
| [[asynccontextmanager]] | decorator بيحوّل async generator لحاجة تتكتب بعد [[async with]] |
| [[asyncpg]] | درايفر Postgres async (درس asyncpg تحت) |
| [[Request]] | الطلب نفسه، ومنه نوصل للتطبيق [[request.app]] |

---

## ٢. الـ lifespan: مرة واحدة مع عمر التطبيق

~~~python
@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    app.state.pool = await asyncpg.create_pool("postgresql://app:secret@localhost/shop", min_size=2, max_size=10)
    yield
    await app.state.pool.close()
app = FastAPI(lifespan=lifespan)
~~~

الدالة متقسمة نصين عند الـ [[yield]]:

| الجزء | بيشتغل إمتى |
|---|---|
| قبل [[yield]] | مرة واحدة لما السيرفر يقوم، **قبل** أول طلب |
| [[yield]] | التطبيق شغال وبيستقبل طلبات طول ما هو واقف هنا |
| بعد [[yield]] | مرة واحدة لما السيرفر يقفل (Ctrl+C أو SIGTERM من [[docker stop]]) |

### فك الـ URL

~~~text postgresql://app:secret@localhost/shop
postgresql://   نوع القاعدة
app             اسم المستخدم
secret          الباسورد
localhost       السيرفر (والبورت الافتراضي 5432)
shop            اسم القاعدة
~~~

في مشروع حقيقي الـ URL ده جاي من الإعدادات (درس pydantic-settings)، مش مكتوب في الكود.

- [[min_size=2]]: افتح اتصالين على طول. [[max_size=10]]: متفتحش أكتر من ١٠ حتى لو الطلبات كتير، والطلب الحادي عشر يستنى.
- [[app.state]]: مكان فاضي على التطبيق تحط فيه أي حاجة مشتركة. حطينا فيه الـ pool عشان أي طلب يوصله.
- [[FastAPI(lifespan=lifespan)]]: كده FastAPI عارف يشغّل الدالة دي مع عمره.

في التجربة، أول سطر في اللوج بعد ما السيرفر قام كان [[pool ready]] (طبعته بعد [[create_pool]]) وقبل أي طلب.

---

## ٣. الـ dependency بـ [[yield]]: لكل طلب

~~~python
async def get_conn(request: Request) -> AsyncIterator[asyncpg.Connection]:
    async with request.app.state.pool.acquire() as conn:
        async with conn.transaction():
            yield conn
~~~

نفكّها من برة لجوه:

1. [[request.app.state.pool]]: الـ pool اللي اتعمل في الـ lifespan.
2. [[.acquire()]]: خد اتصال فاضي منه. و [[async with ... as conn]] معناها: لما البلوك يخلص (بأي طريقة، حتى لو exception)، **رجّع الاتصال للـ pool**.
3. [[conn.transaction()]]: ابعت [[BEGIN]] لـ Postgres. ولما البلوك يخلص: لو مفيش exception يبعت [[COMMIT]]، ولو فيه exception يبعت [[ROLLBACK]].
4. [[yield conn]]: هنا الدالة **بتقف**، والـ [[conn]] بيروح للـ route. والـ route بيشتغل وهي واقفة هنا. ولما الـ route يخلص، الدالة بتكمّل من بعد الـ yield، فالبلوكين بيتقفلوا بالترتيب: commit أو rollback، وبعدين الاتصال يرجع.

ولو الـ route رمى exception، FastAPI بيرميه **جوه** الـ dependency عند سطر الـ [[yield]]، فـ [[conn.transaction()]] بيشوفه ويعمل rollback.

---

## ٤. النوع: [[Conn]] و [[scope="function"]]

~~~python
Conn = Annotated[asyncpg.Connection, Depends(get_conn, scope="function")]
~~~

زي الدرس اللي فات: اسم لنوع، والقيمة جاية من [[get_conn]]. الجديد [[scope]]، وده بيحدد **إمتى** الجزء اللي بعد الـ yield يشتغل:

| [[scope]] | التنضيف (الـ commit) بيحصل إمتى |
|---|---|
| [[request]] (الافتراضي) | بعد ما الرد يتبعت للعميل |
| [[function]] | أول ما الـ route يخلص، وقبل ما الرد يطلع |

جربت الاتنين بطباعة في 3 أماكن: آخر الـ route، وبعد بلوك الـ transaction في الـ dependency، وفي middleware بعد ما الرد يجهز.

~~~text scope="function"
endpoint returning
after transaction (commit/rollback done)
response ready in middleware
INFO:     127.0.0.1:61566 - "POST /orders HTTP/1.1" 200 OK
~~~

~~~text scope="request" (الافتراضي)
endpoint returning
response ready in middleware
INFO:     127.0.0.1:65202 - "POST /orders HTTP/1.1" 200 OK
after transaction (commit/rollback done)
~~~

في الافتراضي، الـ 200 اتبعت **قبل** الـ commit. يعني لو الـ commit فشل، العميل فاكر إن الطلب اتعمل وهو متعملش. عشان كده الـ transaction مع [[scope="function"]]. (الـ [[scope]] اتضاف في FastAPI 0.121، فلو ظهر [[TypeError]] عنده يبقى نسختك أقدم.)

---

## ٥. الـ route

~~~python
@app.post("/orders")
async def create_order(conn: Conn):
    order_id = await conn.fetchval("INSERT INTO orders DEFAULT VALUES RETURNING id")
    await conn.execute("INSERT INTO order_events (order_id, kind) VALUES ($1, 'created')", order_id)
    return {"id": order_id}
~~~

- [[conn: Conn]]: الاتصال جاهز، وجواه transaction مفتوحة.
- [[INSERT INTO orders DEFAULT VALUES]]: صف جديد كل أعمدته بقيمها الافتراضية (الـ id من الـ serial، والوقت من [[now()]]).
- [[RETURNING id]]: رجّعلي الـ id اللي اتعمل. و [[fetchval]] بتاخد أول قيمة من أول صف.
- [[$1]]: مكان قيمة، والقيمة ([[order_id]]) بتتبعت منفصلة عن الـ SQL.
- الـ INSERT التاني في **نفس** الاتصال، فهو في نفس الـ transaction.

~~~bash
curl -i -X POST localhost:8000/orders
~~~

~~~text الناتج
HTTP/1.1 200 OK
content-type: application/json

{"id":1}
~~~

---

## ٦. التجربة: exception في النص

ضفت [[raise HTTPException(400)]] بعد أول INSERT (ومحتاج [[HTTPException]] في الـ import):

~~~text الناتج
HTTP/1.1 400 Bad Request

{"detail":"Bad Request"}
~~~

وبعدين طلب عادي، والجدول:

~~~text SELECT o.id, e.kind FROM orders o LEFT JOIN order_events e ON e.order_id = o.id
 id |  kind
----+---------
  1 | created
  2 | created
  3 | created
  5 | created
~~~

- الطلب الفاشل أخد [[id]] 4، والـ INSERT بتاعه اتشال بالـ rollback، فـ 4 مش موجود.
- الطلب اللي بعده أخد 5 مش 4: الـ sequence (العداد اللي ورا [[serial]]) **مبيرجعش** مع الـ rollback. فالفجوات في الـ ids طبيعية.
- ولاحظ إن [[after transaction]] متطبعتش في الطلب الفاشل: الـ exception عدّى من البلوك، فالسطر اللي بعده متنفذش.

---

## السطور كلها

| الكود | بيعمل إيه |
|---|---|
| [[lifespan]] قبل [[yield]] | اعمل الـ pool مرة لما التطبيق يقوم |
| [[lifespan]] بعد [[yield]] | اقفله مرة لما التطبيق يقفل |
| [[pool.acquire()]] | خد اتصال، ويرجع لوحده |
| [[conn.transaction()]] | BEGIN، و COMMIT أو ROLLBACK حسب النتيجة |
| [[yield conn]] | الـ route بيشتغل هنا |
| [[scope="function"]] | الـ commit قبل الرد |

## الخلاصة

- الموارد المشتركة (pool، client) في الـ lifespan، والموارد اللي لكل طلب في dependency بـ [[yield]].
- اللي بعد الـ [[yield]] بيشتغل دايمًا، والـ exception بيوصله فيعمل rollback.
- الـ transaction في dependency خليها [[scope="function"]] عشان العميل ميخدش 200 قبل الـ commit.
- الـ ids مش متتالية بعد rollback، ومتعتمدش عليها.`,
          lines: [
            "نوع الرجوع للـ generators الـ async.",
            "decorator الـ lifespan.",
            "Annotated.",
            "درايفر Postgres async (المستوى ٣).",
            "Request عشان نوصل لـ app.state.",
            "بيحوّل الـ generator لـ context manager.",
            "بيتنادى مرة واحدة مع التطبيق.",
            "الـ pool بيتعمل وقت ما التطبيق يقوم (والـ URL من الإعدادات في الحقيقة).",
            "هنا التطبيق بيستقبل requests.",
            "وقت القفل: اقفل كل الاتصالات.",
            "اربط الـ lifespan بالتطبيق.",
            "dependency لكل request.",
            "خد اتصال من الـ pool، وهيرجع لوحده.",
            "transaction: commit لو الـ route نجح، و rollback لو رمى.",
            "الـ route بيشتغل هنا.",
            R`[[scope="function"]]: التنضيف (والـ commit) يحصل قبل ما الرد يتبعت.`,
            "route.",
            "بياخد الاتصال جاهز.",
            "INSERT ويرجّع الـ id.",
            "INSERT تاني في نفس الـ transaction: الاتنين يا يتنفذوا يا لأ.",
            "رجّع."
          ],
          sol: R`مع [[raise HTTPException(400)]] بعد أول INSERT، الرد [[400]] و [[{"detail": "Bad Request"}]]، و [[SELECT * FROM orders]] مش هيلاقي الصف. الـ exception عدّى من الـ [[yield]] جوه [[conn.transaction()]] فعمل rollback. بس لاحظ إن الطلب اللي بعده هياخد [[id]] 2 مش 1: الـ sequence مبيرجعش في الـ rollback، فالفجوات في الـ ids طبيعية ومتعتمدش إنها متتالية.

وعشان تشوف التوقيت، اطبع حاجة بعد الـ [[async with conn.transaction()]] واطبع حاجة في middleware بعد [[call_next]]. مع [[scope="function"]] الترتيب: [[endpoint returning]] وبعدين طباعة الـ dependency (الـ commit حصل) وبعدين [[response ready in middleware]]، يعني الـ commit خلص قبل الرد. من غير [[scope]] (الافتراضي [[request]]) الطباعة بتاعة الـ dependency بتيجي بعد ما الرد اتجهّز، يعني العميل ممكن ياخد 200 والـ commit لسه مخلصش أو يفشل. عشان كده الـ transaction مع [[scope="function"]]. ولو ظهر [[TypeError]] عند [[scope]]، نسخة FastAPI عندك قديمة (الـ scope اتضاف في 0.121)، فحدّثها.`
        },
        {
          cmd: "auth dependency",
          title: "تجيب المستخدم من التوكن وتحمي الـ routes",
          desc: R`[[OAuth2PasswordBearer]] (أو [[HTTPBearer]]) بيقرا [[Authorization: Bearer <token>]] من الـ header ويرجّع 401 لو مش موجود. وفوقه dependency بتاعتك بتفك التوكن وتجيب المستخدم: [[CurrentUser]]. وفوقها dependency للصلاحيات: [[require_role("admin")]].

أي route محتاج مستخدم يكتب [[user: CurrentUser]]، وأي router محمي كله بـ [[dependencies=[Depends(...)]]].`,
          example: R`from typing import Annotated
import jwt
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
SECRET = "change-me"
oauth2 = OAuth2PasswordBearer(tokenUrl="/auth/token")
app = FastAPI()
class User(BaseModel):
    id: int
    role: str
async def current_user(token: Annotated[str, Depends(oauth2)]) -> User:
    try:
        payload = jwt.decode(token, SECRET, algorithms=["HS256"])
    except jwt.InvalidTokenError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "invalid token", headers={"WWW-Authenticate": "Bearer"})
    return User(id=int(payload["sub"]), role=payload.get("role", "user"))
CurrentUser = Annotated[User, Depends(current_user)]
def require_role(role: str):
    async def checker(user: CurrentUser) -> User:
        if user.role != role:
            raise HTTPException(status.HTTP_403_FORBIDDEN, "forbidden")
        return user
    return checker
@app.get("/me")
async def me(user: CurrentUser):
    return user
@app.delete("/users/{user_id}", dependencies=[Depends(require_role("admin"))])
async def delete_user(user_id: int):
    return {"deleted": user_id}`,
          try: R`اعمل توكن للتجربة: [[python -c "import jwt; print(jwt.encode({'sub': '1', 'role': 'admin'}, 'change-me', algorithm='HS256'))"]]، وجرّبه بـ [[curl -H "Authorization: Bearer <التوكن>" localhost:8000/me]] (زرار Authorize في [[/docs]] مع OAuth2PasswordBearer بيطلب username و password ويبعتهم لـ [[tokenUrl]]، فمينفعش تلزق فيه توكن؛ لو عايز تلزقه من /docs استخدم [[HTTPBearer]]). وبعدين غيّر حرف في التوكن، واعمل واحد بـ role عادي وجرّب الـ DELETE.`,
          flag: "script",
          deep: {
            why: "الـ auth أكتر كود بيتكرر، وأخطر كود لو اتنسى في route. لما يبقى نوع في الـ signature، نسيانه بيبان بالعين في الـ code review، والـ router كله يتقفل بسطر.",
            how: R`[[OAuth2PasswordBearer(tokenUrl=...)]] بيعمل حاجتين: dependency بتقرا الـ header وترجّع التوكن (أو 401)، وبيعرّف الـ security scheme في OpenAPI فيظهر زرار Authorize في [[/docs]]. و [[tokenUrl]] مسار الـ login بتاعك اللي بيدّي توكن (بياخد [[OAuth2PasswordRequestForm]]).

[[jwt.decode]] (مكتبة PyJWT) بيتأكد من التوقيع، ومن [[exp]] لو موجود. ولازم تحدد [[algorithms]] صريح. والـ 401 معناها «مش عارف انت مين»، و 403 «عارف، بس مش مسموحلك».

[[require_role("admin")]] factory: دالة بترجع dependency، فتقدر تعمل [[require_role("editor")]] كمان. ولأنها معتمدة على [[CurrentUser]]، والـ dependencies بتتعمل cache في نفس الـ request، التوكن بيتفك مرة واحدة حتى لو الـ route طالب الاتنين.

والباسوردات: خزّن hash بس، بـ Argon2 (مكتبة [[pwdlib]] اللي توثيق FastAPI بيستخدمها) أو bcrypt، والتحقق تقيل فخليه في [[def]] أو [[to_thread]]. وتفاصيل access و refresh tokens في تاب «بناء مشروع كامل»، والمصادقة السليمة في تاب «الأمان».`,
            when: R`أي API فيه مستخدمين. التوكن لـ APIs و mobile؛ ولو الـ frontend على نفس الدومين، cookie بـ [[HttpOnly]] غالبًا أأمن (FastAPI بيقراها بـ [[Cookie()]] أو [[APIKeyCookie]]).`,
            mistakes: R`السر مكتوب في الكود ([[SECRET = "..."]]): مكانه الإعدادات بـ [[SecretStr]]. و [[jwt.decode(..., options={"verify_signature": False})]]. وتوكن من غير [[exp]]. و [[if user.role != "admin"]] جوه كل route بدل dependency. و 401 من غير header الـ [[WWW-Authenticate]].`
          },
          teach: R`## المثال بيعمل إيه؟

تلات طبقات dependencies فوق بعض: الأولى ([[oauth2]]) بتطلّع التوكن من الـ header، والتانية ([[current_user]]) بتفك التوكن وتطلّع المستخدم، والتالتة ([[require_role]]) بتتأكد إن دوره مسموح. وكل route بياخد الطبقة اللي محتاجها بس. كل الناتج هنا من تشغيل حقيقي: FastAPI 0.142 و PyJWT 2.15 على ويندوز، والطلبات بـ [[curl]] من Git Bash.

---

## ١. الـ imports والسر

~~~python
from typing import Annotated
import jwt
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
SECRET = "change-me"
~~~

- [[import jwt]]: مكتبة **PyJWT** (بتتسطّب بـ [[pip install pyjwt]]، والـ import اسمه [[jwt]]). JWT = JSON Web Token.
- [[status]]: أسماء للأكواد: [[status.HTTP_401_UNAUTHORIZED]] هي هي 401، بس الاسم بيقول معناها.
- [[OAuth2PasswordBearer]]: dependency جاهزة من FastAPI بتقرا التوكن.
- [[SECRET]]: المفتاح اللي بيتوقّع بيه التوكن. هنا مكتوب للتجربة، وفي الحقيقة مكانه الإعدادات وطويل وعشوائي.

### التوكن ده شكله إيه؟

اعمل توكن للتجربة:

~~~bash
python -c "import jwt; print(jwt.encode({'sub': '1', 'role': 'admin'}, 'change-me', algorithm='HS256'))"
~~~

~~~text الناتج
InsecureKeyLengthWarning: The HMAC key is 9 bytes long, which is below the minimum recommended length of 32 bytes for SHA256. See RFC 7518 Section 3.2.
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImFkbWluIn0.3au3PsZ9Pg9Ihh9TimkwfZ-Oav46_ABBO_nkYTyrb7E
~~~

التحذير لأن [[change-me]] ٩ bytes بس، والمطلوب ٣٢ على الأقل لـ HS256. والتوكن ٣ أجزاء بينهم نقط:

| الجزء | فيه إيه |
|---|---|
| [[eyJhbGciOi...]] | الـ header: [[{"alg":"HS256","typ":"JWT"}]] |
| [[eyJzdWIiOi...]] | الـ payload: [[{"sub":"1","role":"admin"}]] |
| [[3au3PsZ9...]] | التوقيع: HMAC-SHA256 للجزئين الأولانيين بالسر |

الجزئين الأولانيين **مش متشفرين**، دول base64 بس، وأي حد يقدر يقراهم (فكّيت الـ payload وطلع [[{"sub":"1","role":"admin"}]]). فمتحطش فيه باسورد. الأمان كله في التوقيع: محدش يقدر يغيّر حرف من غير ما التوقيع يبوظ، لأنه معهوش السر. و [[sub]] (subject) الاسم المعياري لـ id المستخدم، و HS256 = HMAC بـ SHA-256.

---

## ٢. [[oauth2 = OAuth2PasswordBearer(tokenUrl="/auth/token")]]

ده object بيتستخدم كـ dependency. لما يتنادى بيعمل كده:

1. يقرا header الـ [[Authorization]].
2. لو مش موجود، أو مش بادئ بـ [[Bearer]]: يرمي **401** و [[{"detail": "Not authenticated"}]].
3. لو موجود: يرجّع اللي بعد [[Bearer ]] (التوكن نفسه، string).

و [[tokenUrl]] مش بيعمل route: ده بس بيتكتب في الـ OpenAPI عشان زرار Authorize في [[/docs]] يعرف يبعت username و password فين. في التجربة الـ schema طلعت:

~~~text components.securitySchemes في openapi.json
{'OAuth2PasswordBearer': {'type': 'oauth2', 'flows': {'password': {'scopes': {}, 'tokenUrl': '/auth/token'}}}}
~~~

---

## ٣. [[User]] و [[current_user]]

~~~python
class User(BaseModel):
    id: int
    role: str
async def current_user(token: Annotated[str, Depends(oauth2)]) -> User:
    try:
        payload = jwt.decode(token, SECRET, algorithms=["HS256"])
    except jwt.InvalidTokenError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "invalid token", headers={"WWW-Authenticate": "Bearer"})
    return User(id=int(payload["sub"]), role=payload.get("role", "user"))
CurrentUser = Annotated[User, Depends(current_user)]
~~~

- [[token: Annotated[str, Depends(oauth2)]]]: **dependency معتمدة على dependency**. FastAPI بينادي [[oauth2]] الأول، وناتجه (التوكن) يدخل هنا.
- [[jwt.decode(token, SECRET, algorithms=["HS256"])]]: بيحسب التوقيع تاني بالسر ويقارنه، وبيتأكد من [[exp]] (وقت الانتهاء) لو موجود، ويرجّع الـ payload كـ dict. و [[algorithms]] لازم تتحدد صريح: من غيرها حد ممكن يبعت توكن بخوارزمية تانية.
- [[jwt.InvalidTokenError]]: الأب لكل أخطاء التوكن (توقيع غلط، منتهي، شكله بايظ)، فـ [[except]] واحد يمسكهم كلهم.
- [[headers={"WWW-Authenticate": "Bearer"}]]: المعيار بيقول الـ 401 لازم يقول للعميل «أنا عايز توكن من نوع Bearer».
- [[int(payload["sub"])]]: الـ [[sub]] string في التوكن، فبنحوّله رقم. و [[payload.get("role", "user")]]: لو مفيش role، اعتبره [[user]].
- [[CurrentUser]]: الاسم اللي كل الـ routes هتستخدمه.

---

## ٤. [[require_role]]: دالة بترجع dependency

~~~python
def require_role(role: str):
    async def checker(user: CurrentUser) -> User:
        if user.role != role:
            raise HTTPException(status.HTTP_403_FORBIDDEN, "forbidden")
        return user
    return checker
~~~

ده اسمه **factory**: [[require_role("admin")]] مش بتعمل الفحص، بتعمل **دالة جديدة** ([[checker]]) فاكرة إن [[role]] = [[admin]] (ده closure)، وترجعها. فتقدر تعمل [[require_role("editor")]] بنفس الكود.

و [[checker]] نفسها dependency معتمدة على [[CurrentUser]]، فالشجرة:

~~~text
checker  ←  current_user  ←  oauth2  ←  header Authorization
~~~

ولأن FastAPI بيعمل cache للـ dependency في نفس الطلب، لو الـ route طالب [[CurrentUser]] و [[require_role]] مع بعض، التوكن بيتفك مرة واحدة.

---

## ٥. الـ routes

~~~python
@app.get("/me")
async def me(user: CurrentUser):
    return user
@app.delete("/users/{user_id}", dependencies=[Depends(require_role("admin"))])
async def delete_user(user_id: int):
    return {"deleted": user_id}
~~~

- [[/me]]: محتاج المستخدم نفسه، فبياخده باراميتر.
- [[dependencies=[...]]] في الـ decorator: الـ dependency **بتشتغل** بس قيمتها مش بتتبعت للدالة. مناسبة لما محتاج الفحص بس. وهنا [[require_role("admin")]] بقوسين صح، لأنها factory: النداء ده بيرجّع الدالة اللي FastAPI هيناديها.

---

## ٦. نجرّب كل الحالات

~~~bash
curl -H "Authorization: Bearer <التوكن>" localhost:8000/me
~~~

| الحالة | الكود | الـ body |
|---|---|---|
| توكن الأدمن على [[/me]] | 200 | [[{"id":1,"role":"admin"}]] |
| من غير header خالص | 401 | [[{"detail":"Not authenticated"}]] (من [[oauth2]] نفسه) |
| آخر حرف في التوقيع اتغيّر | 401 | [[{"detail":"invalid token"}]] |
| توكن [[exp]] بتاعه عدّى | 401 | [[{"detail":"invalid token"}]] |
| [[Authorization: Basic abc]] | 401 | مش Bearer، فـ [[oauth2]] رفضه |
| توكن من غير role على الـ DELETE | 403 | [[{"detail":"forbidden"}]] |
| توكن الأدمن على [[DELETE /users/5]] | 200 | [[{"deleted":5}]] |

والـ 401 مع التوكن الغلط شكله كامل:

~~~text الناتج
HTTP/1.1 401 Unauthorized
www-authenticate: Bearer
content-type: application/json

{"detail":"invalid token"}
~~~

والفرق: **401** = «مش عارف إنت مين» (مفيش توكن أو بايظ)، و **403** = «عارفك، بس مش مسموحلك». ولاحظ إن الـ 403 مفيهاش [[www-authenticate]]، لأن تسجيل الدخول تاني مش هيحل حاجة.

---

## السطور كلها

| الكود | بيعمل إيه |
|---|---|
| [[OAuth2PasswordBearer(tokenUrl=...)]] | يطلّع التوكن من الـ header أو 401، ويظهر Authorize في /docs |
| [[jwt.decode(..., algorithms=["HS256"])]] | يتأكد من التوقيع والانتهاء ويرجّع الـ payload |
| [[except jwt.InvalidTokenError]] | أي توكن بايظ = 401 |
| [[CurrentUser]] | المستخدم جاهز لأي route |
| [[require_role("admin")]] | factory بترجع dependency بتفحص الدور = 403 |
| [[dependencies=[Depends(...)]]] | شغّل الفحص من غير ما تاخد القيمة |

## الخلاصة

- الـ JWT مقروء لأي حد، ومحمي من التعديل بس. السر هو كل الأمان، فخليه طويل وفي الإعدادات.
- اعمل الـ auth طبقات: توكن ← مستخدم ← صلاحية، وكل route ياخد اللي محتاجه.
- 401 مع [[WWW-Authenticate]] لما مش عارف المستخدم، و 403 لما عارفه ومش مسموحله.`,
          lines: [
            "Annotated.",
            "PyJWT.",
            R`الأدوات، و [[status]] لأسماء الأكواد.`,
            "بيقرا Bearer token من الـ header.",
            "الموديل.",
            "للتجربة بس: السر مكانه الإعدادات.",
            "مسار الـ login اللي بيدّي التوكن، وبيظهر زرار Authorize في /docs.",
            "التطبيق.",
            "المستخدم.",
            "حقل.",
            "حقل.",
            "dependency فوق dependency: بتاخد التوكن من oauth2.",
            "نحاول نفكه.",
            "بيتأكد من التوقيع والانتهاء، والخوارزمية محددة.",
            "توكن بايظ أو منتهي.",
            "401 مع الـ header اللي المعيار طالبه.",
            "المستخدم من الـ payload (في مشروع حقيقي: من القاعدة أو الـ cache).",
            "النوع اللي كل الـ routes هتستخدمه.",
            "factory: بترجع dependency حسب الدور.",
            "الـ dependency الحقيقية، ومعتمدة على CurrentUser.",
            "الدور غلط؟",
            "403: عارفينك بس مش مسموحلك.",
            "رجّع المستخدم لو حد محتاجه.",
            "رجّع الدالة.",
            "route لأي مستخدم مسجّل.",
            "من غير توكن: 401 قبل ما الدالة تشتغل.",
            "رجّع.",
            "للأدمن بس، والـ route مش محتاج قيمة الـ dependency.",
            "الدالة.",
            "رجّع."
          ],
          sol: R`[[jwt.encode]] بيطبع توكن من ٣ أجزاء بينهم نقط، زي [[eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwicm9sZSI6ImFkbWluIn0.3au3...]]، ومعاه تحذير [[InsecureKeyLengthWarning: The HMAC key is 9 bytes long]] من نسخ PyJWT الجديدة، لأن [[change-me]] أقصر من 32 byte. في الإنتاج السر يبقى طويل وعشوائي. و [[/me]] بالتوكن ده بترجع [[{"id": 1, "role": "admin"}]].

لو غيّرت حرف في الجزء التالت (التوقيع): [[401]] و [[{"detail": "invalid token"}]] ومعاها header [[WWW-Authenticate: Bearer]]. ومن غير header خالص: [[401]] و [[{"detail": "Not authenticated"}]] من [[OAuth2PasswordBearer]] نفسه قبل ما دالتك تشتغل. وتوكن من غير [[role]] على الـ DELETE: [[403]] و [[{"detail": "forbidden"}]]، وبتوكن الأدمن: [[{"deleted": 5}]]. الفرق اللي بيتسأل في الانترفيو: 401 يعني «مش عارف إنت مين»، و 403 يعني «عارفك بس مش مسموحلك». ولو غيّرت حرف في الجزء التاني (الـ payload) هتاخد 401 برضه، لأن التوقيع مبقاش مطابق.`
        },
        {
          cmd: "dependency_overrides",
          title: "تختبر الـ API وتبدّل القاعدة والمستخدم بنسخ وهمية",
          desc: R`[[TestClient]] بيبعت requests لتطبيقك من غير سيرفر: [[client.get("/me")]] ويرجّع response تفحصه. و [[app.dependency_overrides[real] = fake]] بيبدّل أي dependency بواحدة تانية في الاختبارات: مستخدم وهمي بدل التوكن، وقاعدة اختبار، وإعدادات test.

pytest نفسه والـ fixtures و pytest.ini في تاب Python. هنا الحتة الخاصة بـ FastAPI.`,
          example: R`import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.deps import User, current_user
@pytest.fixture
def client():
    app.dependency_overrides[current_user] = lambda: User(id=1, role="admin")
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()
def test_me(client: TestClient):
    r = client.get("/me")
    assert r.status_code == 200
    assert r.json() == {"id": 1, "role": "admin"}
def test_validation(client: TestClient):
    r = client.get("/items/abc")
    assert r.status_code == 422
    assert r.json()["detail"][0]["loc"] == ["path", "item_id"]`,
          try: R`اكتب اختبار لـ DELETE بمستخدم role عادي ([[User(id=2, role="user")]]) وتأكد إنه 403. وبعدين شيل الـ [[with]] واستخدم [[TestClient(app)]] بس، وشوف الـ lifespan اشتغل ولا لأ (اطبع حاجة فيه).`,
          flag: "script",
          deep: {
            why: "من غير overrides، كل اختبار محتاج توكن حقيقي، وقاعدة شغالة، و Redis، و API خارجي. الاختبارات بتبقى بطيئة وهشة، فمحدش بيكتبها. والـ DI بتاع FastAPI معمول عشان تبدّل أي حاجة من برّه من غير ما تلمس كود الـ routes.",
            how: R`[[dependency_overrides]] dict على التطبيق: المفتاح الدالة الأصلية (نفس الـ object، مش اسمها)، والقيمة البديلة. FastAPI بيبص فيه قبل ما يحل أي dependency. والبديلة ممكن تاخد باراميترات أو dependencies هي كمان، أو تبقى generator بـ yield (اتصال بقاعدة اختبار جوه transaction تعمله rollback في الآخر، فكل اختبار يبدأ نضيف).

[[TestClient]] مبني على httpx (أو httpx2 لو متسطّب، ودي النسخة اللي Starlette الحديث بيفضّلها): نفس الـ API ([[get]] و [[post(json=...)]] و [[headers]]). ولما تستخدمه بـ [[with]]، الـ lifespan بيشتغل (الـ pool بيتعمل ويتقفل)، ومن غير with لأ.

ولو الاختبارات نفسها async (عايز تعمل await على حاجة تانية جوه الاختبار)، استخدم [[httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test")]] مع pytest-asyncio أو anyio. والـ ASGITransport مبيشغّلش الـ lifespan، فلو محتاجه شغّله بنفسك.

و [[.clear()]] في آخر الـ fixture مهم، وإلا الـ override يفضل لباقي الاختبارات.`,
            when: "كل تطبيق FastAPI. override للـ auth في أغلب الاختبارات، وقاعدة اختبار حقيقية (Postgres في Docker) لاختبارات الـ integration بدل mocks للـ SQL.",
            mistakes: R`override بمفتاح غلط (دالة تانية بنفس الاسم من module تاني، أو [[Depends(...)]] بدل الدالة). ونسيان [[clear()]]. و [[TestClient(app)]] من غير with وتستغرب إن [[app.state.pool]] مش موجود. واختبارات بتكلّم API خارجي حقيقي.`
          },
          teach: R`## المثال بيعمل إيه؟

ملف اختبارات pytest لتطبيق FastAPI. فيه fixture بيبدّل الـ dependency بتاعة المستخدم ([[current_user]] من الدرس اللي فات) بمستخدم وهمي أدمن، وبعدين اختبارين: واحد لـ [[/me]] من غير توكن خالص، وواحد بيتأكد إن الـ 422 بتطلع للـ id الغلط.

اتشغّل فعلًا بـ pytest 9.1 و FastAPI 0.142 على ويندوز، على مشروع شكله كده:

~~~text شكل المشروع
app/__init__.py
app/deps.py        User و current_user و require_role (الدرس اللي فات)
app/main.py        التطبيق: /me و /items/{item_id} و DELETE /users/{user_id}، و lifespan بيطبع
tests/__init__.py
tests/test_api.py  الاختبارات (المثال)
~~~

و [[app/main.py]] فيه route زي [[@app.get("/items/{item_id}")]] بـ [[item_id: int]]، عشان اختبار الـ 422.

---

## ١. الـ imports

~~~python
import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.deps import User, current_user
~~~

- [[pytest]]: أداة الاختبارات (تفاصيلها في تاب Python). أي دالة اسمها بيبدأ بـ [[test_]] في ملف اسمه بيبدأ بـ [[test_]] بتتشغّل لوحدها.
- [[TestClient]]: بيبعت طلبات HTTP لتطبيقك **من غير سيرفر**: بينادي التطبيق مباشرة في نفس الـ process.
- [[app]]: التطبيق الحقيقي.
- [[current_user]]: **نفس الدالة** اللي الـ routes بتستخدمها. ده مهم جدًا: الـ override بيتعرّف بالـ object نفسه، مش بالاسم.

---

## ٢. الـ fixture

~~~python
@pytest.fixture
def client():
    app.dependency_overrides[current_user] = lambda: User(id=1, role="admin")
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()
~~~

### [[@pytest.fixture]]

دالة بتجهّز حاجة للاختبار. أي اختبار يكتب باراميتر اسمه [[client]]، pytest بينادي الـ fixture ويدّيله الناتج. و [[yield]] هنا نفس فكرة الـ dependency بـ yield: اللي قبله تجهيز، واللي بعده تنضيف بعد الاختبار.

### [[app.dependency_overrides[current_user] = lambda: User(id=1, role="admin")]]

- [[app.dependency_overrides]]: dict على التطبيق. المفتاح الـ dependency الأصلية، والقيمة البديلة.
- [[lambda: User(...)]]: دالة صغيرة من غير اسم ومن غير باراميترات، بترجع مستخدم جاهز. يعني بقت dependency مش محتاجة توكن.
- FastAPI قبل ما ينادي أي dependency بيبص في الـ dict ده الأول. فأي مكان في الشجرة طالب [[current_user]] (الـ route مباشرة، أو [[require_role]] جواها) هياخد المستخدم ده، و [[oauth2]] مش هيتنادى أصلًا.

### [[with TestClient(app) as c:]]

الـ [[with]] بتشغّل الـ **lifespan**: اللي قبل الـ yield فيه أول ما تدخل، واللي بعده لما تخرج. جربتها بـ lifespan بيطبع، وشغّلت [[pytest -v -s]] ([[-s]] عشان الـ print يظهر):

~~~text الناتج
tests/test_api.py::test_me LIFESPAN START
PASSEDLIFESPAN STOP

tests/test_api.py::test_validation LIFESPAN START
PASSEDLIFESPAN STOP
~~~

كل اختبار ليه lifespan كامل، لأن الـ fixture بيتعمل من جديد مع كل اختبار. ومن غير [[with]] (يعني [[c = TestClient(app)]] بس) مفيش ولا سطر [[LIFESPAN]]، فأي حاجة الـ lifespan بيعملها ([[app.state.pool]]) مش هتبقى موجودة.

### [[app.dependency_overrides.clear()]]

بعد الاختبار امسح الـ dict. الـ [[app]] object واحد لكل الاختبارات، فلو نسيت، الاختبار اللي بعده هيلاقي المستخدم الوهمي لسه موجود.

---

## ٣. الاختبار الأول: [[test_me]]

~~~python
def test_me(client: TestClient):
    r = client.get("/me")
    assert r.status_code == 200
    assert r.json() == {"id": 1, "role": "admin"}
~~~

- [[client: TestClient]]: pytest شاف الاسم [[client]] فنادى الـ fixture.
- [[client.get("/me")]]: طلب GET من غير أي header. و [[r]] هو الرد: [[r.status_code]] الكود، و [[r.json()]] الـ body بعد ما يتحوّل dict.
- [[assert]]: لو الشرط غلط، الاختبار يفشل ويطبع القيمتين.

وده شكل الفشل لو شلت الـ override (جربتها): الطلب راح لـ [[oauth2]] الحقيقي ومفيش توكن.

~~~text الناتج
>           assert r.status_code == 200
E           assert 401 == 200
FAILED tests/test_fail.py::test_me_no_override - assert 401 == 200
~~~

---

## ٤. الاختبار التاني: [[test_validation]]

~~~python
def test_validation(client: TestClient):
    r = client.get("/items/abc")
    assert r.status_code == 422
    assert r.json()["detail"][0]["loc"] == ["path", "item_id"]
~~~

[[abc]] مش رقم، فـ FastAPI بيرجّع 422 قبل ما الـ route يشتغل. والـ body شكله [[{"detail": [{"type": "int_parsing", "loc": ["path", "item_id"], ...}]}]]، فـ [[["detail"][0]["loc"]]] بيوصل لمكان أول خطأ: في الـ path، اسمه [[item_id]].

---

## ٥. النتيجة

~~~text pytest -v
tests/test_api.py::test_me PASSED
tests/test_api.py::test_validation PASSED
...
StarletteDeprecationWarning: Using $__bthttpx$__bt with $__btstarlette.testclient$__bt is deprecated; install $__bthttpx2$__bt instead.
~~~

التحذير ده من Starlette 1.7: الـ TestClient بقى عايز مكتبة [[httpx2]] (الاستكمال اللي Pydantic بتصونه لـ httpx). لو سطّبتها ([[pip install httpx2]]) التحذير بيختفي، والاختبارات نفسها مش بتتغير.

---

## ٦. الحل (اختبار الـ 403)

نفس الـ fixture بمستخدم دوره [[user]]، و [[as_user.delete("/users/5")]]: الـ override وصل لـ [[current_user]] اللي جوه [[require_role]]، فالفحص اشتغل على المستخدم الوهمي ورجّع [[403]] و [[{"detail": "forbidden"}]]، والاختبار عدّى. وكمان جربت [[TestClient(app)]] من غير with ومن غير override على [[/me]]: [[401]]، ومفيش [[LIFESPAN START]].

---

## السطور كلها

| الكود | بيعمل إيه |
|---|---|
| [[TestClient(app)]] | يكلّم التطبيق من غير سيرفر |
| [[with TestClient(app) as c]] | ويشغّل الـ lifespan كمان |
| [[app.dependency_overrides[dep] = fake]] | بدّل الـ dependency في أي مكان في الشجرة |
| [[.clear()]] | رجّع كل حاجة زي ما كانت |
| [[r.status_code]] و [[r.json()]] | افحص الرد |

## الخلاصة

- المفتاح في [[dependency_overrides]] لازم يبقى نفس الـ object اللي الـ routes بتستخدمه.
- [[with]] = الـ lifespan بيشتغل. من غيرها مفيش pool ولا clients.
- امسح الـ overrides بعد كل اختبار، والأحسن جوه الـ fixture نفسه بعد الـ [[yield]].`,
          lines: [
            "pytest (تفاصيله في تاب Python).",
            "client بيكلّم التطبيق من غير سيرفر.",
            "التطبيق.",
            "الـ dependency اللي هنبدّلها، ونفس الـ object بالظبط.",
            "fixture بيتشارك بين الاختبارات.",
            "الـ fixture.",
            "أي route محتاج current_user هياخد المستخدم ده من غير توكن.",
            R`[[with]] بتشغّل الـ lifespan.`,
            "ادّي الـ client للاختبار.",
            "بعد الاختبار: شيل الـ overrides.",
            "اختبار.",
            "request.",
            "الكود.",
            "الـ JSON.",
            "اختبار الفحص.",
            "id مش رقم.",
            "422.",
            "مكان الخطأ بالظبط."
          ],
          sol: R`الاختبار بيعمل override لـ [[current_user]] بمستخدم عادي، ويتأكد من [[status_code == 403]] و [[{"detail": "forbidden"}]]. ولو [[require_role]] بيعتمد على [[current_user]] جواه، الـ override بيوصل له كمان لأن FastAPI بيستبدل الـ dependency في أي مكان في الشجرة. ولو الاختبار رجع 401 يبقى عملت override لحاجة غير اللي الـ route بيستخدمها فعلًا (مثلًا نسخة اتعملت import من مكان تاني)، لازم نفس الـ object بالظبط.

ولو ضفت [[print("LIFESPAN START")]] في الـ lifespan وشغّلت بـ [[pytest -s]]: مع [[with TestClient(app) as c]] هتشوف [[LIFESPAN START]] وبعدين [[LIFESPAN STOP]]، ومن غير [[with]] مش هتشوف حاجة، والـ lifespan مش هيشتغل خالص. يعني لو الـ lifespan بيعمل pool لقاعدة البيانات، الـ endpoints هتقع بـ [[AttributeError]] على [[app.state.pool]]. ومتنساش [[dependency_overrides.clear()]] وإلا الـ override هيفضل موجود في الاختبارات اللي بعده.`,
          solCode: R`import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.deps import User, current_user
@pytest.fixture
def as_user():
    app.dependency_overrides[current_user] = lambda: User(id=2, role="user")
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()
def test_delete_forbidden_for_normal_user(as_user: TestClient):
    r = as_user.delete("/users/5")
    assert r.status_code == 403
    assert r.json() == {"detail": "forbidden"}`
        }
      ]
    },
    {
      t: "الأخطاء والـ middleware",
      l: 2,
      n: "HTTPException، و exceptions بتاعتك تتحوّل لردود، وشكل واحد لكل الأخطاء، و CORS و middleware",
      items: [
        {
          cmd: "HTTPException",
          title: "ترجّع 404 أو 409 برسالة",
          desc: R`[[raise HTTPException(status_code=404, detail="...")]] بيوقف الـ route ويرجّع الرد ده. والـ detail ممكن يبقى string أو dict أو list. ولأنها raise مش return، تقدر ترميها من أي حتة: من الـ route، أو dependency، أو دالة بتتنادى جوه.

والأكواد اللي هتستخدمها: 400 طلب غلط، و 401 مش مسجّل، و 403 مش مسموح، و 404 مش موجود، و 409 تعارض (إيميل مستخدم)، و 422 الداتا مش صح (FastAPI بيرجّعها لوحده)، و 429 طلبات كتير، و 500 bug عندك.`,
          example: R`from fastapi import FastAPI, HTTPException, status
app = FastAPI()
USERS = {1: {"id": 1, "email": "sara@example.com"}}
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    user = USERS.get(user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user
@app.post("/users", status_code=201)
async def create_user(email: str):
    if any(u["email"] == email for u in USERS.values()):
        raise HTTPException(409, detail={"code": "EMAIL_TAKEN", "message": "الإيميل ده مستخدم"})
    new_id = max(USERS) + 1
    USERS[new_id] = {"id": new_id, "email": email}
    return USERS[new_id]
@app.delete("/users/{user_id}", status_code=204)
async def delete_user(user_id: int) -> None:
    USERS.pop(user_id, None)`,
          try: R`اطلب [[/users/99]] واقرا شكل الرد ([[{"detail": "User not found"}]]). وبعدين [[curl -i -X POST "localhost:8000/users?email=sara@example.com"]] وشوف الـ 409 والـ detail اللي هو dict.`,
          flag: "script",
          deep: {
            why: "العميل (موبايل أو frontend) بيقرر يعمل إيه من الكود: 401 يروح للـ login، و 404 صفحة «مش موجود»، و 409 رسالة تحت حقل الإيميل. لو كل حاجة 200 أو 500، الـ frontend مش هيعرف يتصرف.",
            how: R`[[HTTPException]] exception عادي بيحمل status و detail و headers. و FastAPI عنده handler جاهز ليه بيرجّع [[{"detail": ...}]] بالكود ده. ولأنه exception، بيعدّي على الـ dependencies اللي فيها yield (فالـ transaction بيعمل rollback).

الـ detail بيظهر للعميل زي ما هو: متحطش فيه stack trace أو SQL أو بيانات داخلية. و detail كـ dict فيه [[code]] ثابت (زي [["EMAIL_TAKEN"]]) أحسن من رسالة بس: الـ frontend يعتمد على الكود، والرسالة تتغير براحتك.

والـ 404 مقابل 403: لو المستخدم بيطلب order مش بتاعه، ناس كتير بترجّع 404 مش 403، عشان متأكدش إن الـ order ده موجود أصلًا.

و [[status_code=204]] (No Content) للـ DELETE: FastAPI مبيبعتش body. وتفاصيل اختيار الأكواد في تاب «APIs متقدمة».`,
            when: "في الـ routes والـ dependencies. أما في طبقة الـ services فالأحسن exceptions بتاعتك (الدرس الجاي)، عشان المنطق ميعرفش حاجة عن HTTP.",
            mistakes: R`[[return {"error": "not found"}]] بكود 200. و [[raise HTTPException(500, str(e))]] فتسرّب رسالة القاعدة للعميل. و [[except Exception]] حوالين الـ route كله بيبلع الـ HTTPException نفسها ويحوّلها 500.`
          },
          teach: R`## المثال بيعمل إيه؟

API صغير لمستخدمين متخزنين في dict: تجيب مستخدم (أو 404)، وتعمل مستخدم (201، أو 409 لو الإيميل مستخدم)، وتمسح مستخدم (204). الفكرة إن كل حالة ليها **كود** مختلف، والعميل يقرر يعمل إيه من الكود. اتشغّل فعلًا بـ FastAPI 0.142 على ويندوز، والطلبات بـ [[curl -i]] من Git Bash وبـ PowerShell.

---

## ١. البداية

~~~python
from fastapi import FastAPI, HTTPException, status
app = FastAPI()
USERS = {1: {"id": 1, "email": "sara@example.com"}}
~~~

- [[HTTPException]]: exception لو اترمى من أي حتة في الطلب، FastAPI بيحوّله رد بالكود والرسالة.
- [[status]]: أسماء للأكواد ([[status.HTTP_404_NOT_FOUND]] = 404) عشان الكود يتقري.
- [[USERS]]: «قاعدة بيانات» في الذاكرة: dict المفتاح فيه الـ id. بيتمسح لما السيرفر يقفل، وده كفاية للتجربة.

---

## ٢. GET: [[404]]

~~~python
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    user = USERS.get(user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user
~~~

- [[USERS.get(user_id)]]: [[.get]] على dict بترجع القيمة، أو [[None]] لو المفتاح مش موجود (عكس [[USERS[user_id]]] اللي بترمي [[KeyError]]).
- [[raise]] مش [[return]]: الـ raise بيوقف الدالة فورًا، والسطر اللي بعده مش بيتنفذ.

~~~bash
curl -i localhost:8000/users/99
~~~

~~~text الناتج
HTTP/1.1 404 Not Found
content-length: 27
content-type: application/json

{"detail":"User not found"}
~~~

- [[-i]] (include) بيطبع سطر الـ status والـ headers. من غيره هتشوف الـ body بس ومش هتعرف الكود.
- الـ [[detail]] اللي كتبته اتحط جوه مفتاح اسمه [[detail]]: ده الشكل الثابت بتاع FastAPI.
- و [[/users/1]] بترجع [[200 OK]] و [[{"id":1,"email":"sara@example.com"}]].

---

## ٣. POST: [[201]] و [[409]]

~~~python
@app.post("/users", status_code=201)
async def create_user(email: str):
    if any(u["email"] == email for u in USERS.values()):
        raise HTTPException(409, detail={"code": "EMAIL_TAKEN", "message": "الإيميل ده مستخدم"})
    new_id = max(USERS) + 1
    USERS[new_id] = {"id": new_id, "email": email}
    return USERS[new_id]
~~~

- [[status_code=201]]: كود النجاح الافتراضي للـ route ده بدل 200. و 201 Created معناها «اتعمل حاجة جديدة».
- [[email: str]]: مش في الـ path، فـ FastAPI بيعتبره query ([[?email=...]]). ده للتبسيط، وفي الحقيقة body بموديل.
- [[any(... for u in USERS.values())]]: [[USERS.values()]] كل المستخدمين، والـ generator بيسأل لكل واحد «إيميله زي ده؟»، و [[any]] بترجع [[True]] أول ما تلاقي واحد.
- [[HTTPException(409, detail={...})]]: أول باراميتر هو الـ [[status_code]]، والـ [[detail]] هنا dict مش string. أي حاجة تتحوّل JSON تنفع.
- [[max(USERS) + 1]]: [[max]] على dict بيشتغل على المفاتيح، فأكبر id + 1.

~~~bash
curl -i -X POST "localhost:8000/users?email=sara@example.com"
~~~

~~~text الناتج
HTTP/1.1 409 Conflict
content-type: application/json

{"detail":{"code":"EMAIL_TAKEN","message":"الإيميل ده مستخدم"}}
~~~

[[-X POST]] بيغيّر الـ method. و [[code]] الثابت ده اللي الـ frontend يعمل عليه [[if]]، والـ [[message]] يعرضها للمستخدم. ولإيميل جديد:

~~~text الناتج
HTTP/1.1 201 Created

{"id":2,"email":"omar@example.com"}
~~~

---

## ٤. DELETE: [[204]]

~~~python
@app.delete("/users/{user_id}", status_code=204)
async def delete_user(user_id: int) -> None:
    USERS.pop(user_id, None)
~~~

- [[204 No Content]]: «تم، ومفيش حاجة أرجعهالك». FastAPI مبيبعتش body خالص.
- [[USERS.pop(user_id, None)]]: امسح المفتاح، والـ [[None]] قيمة افتراضية عشان ميرميش [[KeyError]] لو مش موجود.

~~~text DELETE /users/2 (مرتين)
HTTP/1.1 204 No Content
HTTP/1.1 204 No Content
~~~

المرة التانية برضه 204: الـ DELETE المتكرر بيوصل لنفس النتيجة (المستخدم مش موجود)، وده اسمه idempotent.

---

## ٥. الغلطة المشهورة: [[return]] بدل [[raise]]

جربت route بيعمل [[return HTTPException(404, "x")]]:

~~~text الناتج
HTTP/1.1 200 OK

{"status_code":404,"detail":"x","headers":null}
~~~

الـ exception اتعامل كأنه داتا عادية واتحوّل JSON، بكود 200. العميل هيفتكر إن كل حاجة تمام.

---

## ٦. من PowerShell

[[Invoke-RestMethod]] بيرمي error مع أي كود 4xx أو 5xx، فلازم [[try/catch]] عشان تشوف الرد:

~~~powershell
try { Invoke-RestMethod http://localhost:8000/users/99 } catch { [int]$_.Exception.Response.StatusCode; $_.ErrorDetails.Message }
~~~

~~~text الناتج (Windows PowerShell 5.1)
404
{"detail":"User not found"}
~~~

- [[$_]] جوه [[catch]] هو الخطأ، و [[.Exception.Response.StatusCode]] الكود، و [[[int]]] بيحوّله رقم.
- [[.ErrorDetails.Message]] الـ body.

وفي pwsh 7 فيه طريقة أسهل من غير try:

~~~powershell
$r = Invoke-WebRequest http://localhost:8000/users/99 -SkipHttpErrorCheck; $r.StatusCode; $r.Content
~~~

~~~text الناتج (pwsh 7)
404
{"detail":"User not found"}
~~~

[[-SkipHttpErrorCheck]] (موجود في pwsh 7 بس) بيقوله «متعتبرش 404 خطأ، رجّعلي الرد وخلاص».

---

## السطور كلها

| الكود | النتيجة |
|---|---|
| [[raise HTTPException(404, "...")]] | 404 و [[{"detail": "..."}]] |
| [[raise HTTPException(409, detail={...})]] | 409 والـ dict جوه [[detail]] |
| [[status_code=201]] في الـ decorator | كود النجاح للـ route |
| [[status_code=204]] | نجاح من غير body |
| [[return HTTPException(...)]] | غلط: 200 والـ exception متحوّل JSON |

## الخلاصة

- [[raise]] مش [[return]]، وتقدر ترميها من أي حتة جوه الطلب (route أو dependency أو دالة بتتنادى).
- الـ [[detail]] بيوصل للعميل زي ما هو: متحطش فيه تفاصيل داخلية، وحط [[code]] ثابت لو الـ frontend هيتصرف على أساسه.
- جرّب دايمًا بـ [[curl -i]] عشان تشوف الكود مش الـ body بس.`,
          lines: [
            "HTTPException، و status لأسماء الأكواد.",
            "التطبيق.",
            "داتا وهمية.",
            "route.",
            "الدالة.",
            R`[[get]] بترجع None لو مش موجود.`,
            "مش موجود؟",
            "وقّف الـ route وارجع 404.",
            "موجود.",
            "إنشاء، والنجاح 201.",
            "email هنا query للتبسيط؛ في الحقيقة body model.",
            "الإيميل مستخدم؟",
            "409 بـ detail فيه code ثابت يعتمد عليه الـ frontend.",
            "id جديد.",
            "احفظ.",
            "رجّع.",
            "حذف، والنجاح 204 من غير body.",
            "مبترجعش حاجة.",
            "احذف لو موجود، ومتعترضش لو مش موجود (DELETE متكرر بيدّي نفس النتيجة)."
          ],
          sol: R`[[/users/99]] بترجع [[404 Not Found]] و [[{"detail":"User not found"}]]: FastAPI بيحط اللي في [[detail]] جوه مفتاح اسمه [[detail]] دايمًا.

و [[curl -i -X POST "localhost:8000/users?email=sara@example.com"]] بيطبع [[HTTP/1.1 409 Conflict]] والـ headers، وبعدين [[{"detail":{"code":"EMAIL_TAKEN","message":"الإيميل ده مستخدم"}}]]. الـ [[detail]] ممكن يبقى أي حاجة تتحوّل JSON، فالـ dict بيدّي الـ frontend [[code]] ثابت يعمل عليه if، ورسالة يعرضها. ولو شلت [[-i]] مش هتشوف الـ status، وده سبب إنك تستخدمه دايمًا وإنت بتجرّب. ولو كتبت [[return HTTPException(...)]] بدل [[raise]] هتاخد 200 والـ exception نفسه متحوّل JSON، ودي غلطة مشهورة.`
        },
        {
          cmd: "exception handlers",
          title: "exceptions بتاعتك تتحوّل لردود، وشكل واحد لكل الأخطاء",
          desc: R`[[@app.exception_handler(MyError)]] بيحوّل أي exception من نوعك لـ response، فالـ service يرمي [[NotFoundError]] من غير ما يعرف حاجة عن HTTP، والـ handler يحوّله 404. وتقدر تعيد تعريف handler الـ 422 ([[RequestValidationError]]) عشان كل الأخطاء تطلع بنفس الشكل.

و handler لـ [[Exception]] نفسها آخر خط: يسجّل الخطأ كامل في اللوج، ويرجّع 500 برسالة عامة ورقم للتتبع.`,
          example: R`import logging
import uuid
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
log = logging.getLogger("app")
app = FastAPI()
class AppError(Exception):
    status = 400
    code = "APP_ERROR"
    def __init__(self, message: str):
        self.message = message
class NotFoundError(AppError):
    status, code = 404, "NOT_FOUND"
@app.exception_handler(AppError)
async def app_error(request: Request, exc: AppError):
    return JSONResponse({"error": {"code": exc.code, "message": exc.message}}, status_code=exc.status)
@app.exception_handler(RequestValidationError)
async def validation_error(request: Request, exc: RequestValidationError):
    fields = [{"field": ".".join(map(str, e["loc"][1:])), "message": e["msg"]} for e in exc.errors()]
    return JSONResponse({"error": {"code": "VALIDATION", "fields": fields}}, status_code=422)
@app.exception_handler(Exception)
async def unhandled(request: Request, exc: Exception):
    ref = uuid.uuid4().hex[:8]
    log.exception("unhandled error ref=%s path=%s", ref, request.url.path)
    return JSONResponse({"error": {"code": "INTERNAL", "ref": ref}}, status_code=500)
@app.get("/orders/{order_id}")
async def get_order(order_id: int):
    raise NotFoundError(f"order {order_id} not found")`,
          try: R`اطلب [[/orders/5]] و [[/orders/abc]] وقارن الشكلين: نفس الـ [[error.code]] كمفتاح. وبعدين ضيف route بيعمل [[1 / 0]] وشوف الـ ref في الرد وفي اللوج.`,
          flag: "script",
          deep: {
            why: "الـ frontend محتاج يتعامل مع الأخطاء بطريقة واحدة. لو الـ 422 ليه شكل، و HTTPException شكل، والـ 500 نص، كل شاشة هتكتب parsing مختلف. والـ services اللي بترمي HTTPException مربوطة بـ HTTP ومينفعش تستخدمها من CLI أو worker.",
            how: R`لما exception يطلع من الـ route ومحدش مسكه، Starlette بيدوّر على handler لنوعه أو لأقرب parent في الوراثة. عشان كده handler واحد لـ [[AppError]] بيغطي [[NotFoundError]] و [[ConflictError]] وأي حاجة بتورث منه.

[[RequestValidationError]] هو اللي FastAPI بيرميه لما الـ request مش مطابق. و [[exc.errors()]] نفس ليستة Pydantic ([[loc]] و [[msg]] و [[type]])، و [[loc[0]]] بيبقى [[body]] أو [[query]] أو [[path]]، عشان كده شلناه بـ [[[1:]]].

handler الـ [[Exception]] بيشتغل في ServerErrorMiddleware (آخر طبقة)، ورده بيتبعت، وبعدين الـ exception بيتسجّل من السيرفر كمان. و [[log.exception]] بيكتب الـ traceback كامل. والـ ref بيربط الرد اللي المستخدم شافه بالسطر في اللوج؛ وفي مشروع أكبر خليه نفس الـ request id اللي في الـ middleware (الدرس الجاي). وشكل الأخطاء الموحّد القياسي (problem+json) في تاب «APIs متقدمة».

ولو عايز تكمّل على السلوك الافتراضي: [[from fastapi.exception_handlers import http_exception_handler]] وناديه من الـ handler بتاعك.`,
            when: "أي مشروع فيه frontend أو عملاء خارجيين: شكل واحد للأخطاء من أول يوم، و exceptions بتاعتك في الـ services.",
            mistakes: R`handler لـ [[Exception]] بيرجّع [[str(exc)]] للعميل. وتنسى تسجّل الخطأ في handler الـ 500 فيضيع. و handler على HTTPException بتاعة FastAPI بس: سجّله على [[starlette.exceptions.HTTPException]] عشان يمسك الاتنين (الـ 404 بتاعة route مش موجود جاية من Starlette).`
          },
          teach: R`## المثال بيعمل إيه؟

بيخلّي **كل** أخطاء الـ API تطلع بشكل واحد: [[{"error": {"code": ..., ...}}]]. تلات handlers: واحد لأخطاء الـ business بتاعتك ([[AppError]] وولاده)، وواحد بيعيد كتابة الـ 422 بتاعة FastAPI، وواحد آخر خط لأي exception محدش مسكه (500). اتشغّل فعلًا بـ FastAPI 0.142 و uvicorn على ويندوز، والطلبات بـ [[curl -i]].

---

## ١. الـ imports والـ logger

~~~python
import logging
import uuid
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
log = logging.getLogger("app")
app = FastAPI()
~~~

| الاسم | بتاع إيه |
|---|---|
| [[logging]] | مكتبة اللوج الرسمية في Python |
| [[uuid]] | بيعمل ids عشوائية (UUID = Universally Unique Identifier) |
| [[RequestValidationError]] | الـ exception اللي FastAPI بيرميه لما الطلب مش مطابق (الـ 422) |
| [[JSONResponse]] | رد بتبنيه بإيدك: body و status و headers |
| [[logging.getLogger("app")]] | logger باسم [[app]]؛ الاسم بيظهر في اللوج وبيخلّيك تظبط مستواه لوحده |

---

## ٢. الـ exceptions بتاعتك

~~~python
class AppError(Exception):
    status = 400
    code = "APP_ERROR"
    def __init__(self, message: str):
        self.message = message
class NotFoundError(AppError):
    status, code = 404, "NOT_FOUND"
~~~

- [[class AppError(Exception)]]: exception جديد بيورث من [[Exception]]، يعني ينفع يترمي ويتمسك.
- [[status]] و [[code]]: **class attributes**، قيم مشتركة لكل الـ objects من النوع ده. الافتراضي 400 و [[APP_ERROR]].
- [[__init__]]: الـ constructor. بيشيل الرسالة في [[self.message]].
- [[NotFoundError(AppError)]]: ابن بيغيّر [[status]] و [[code]] بس، والباقي (الـ constructor) بيورثه. و [[status, code = 404, "NOT_FOUND"]] تعيين لاتنين في سطر واحد (tuple unpacking).

ليه مش [[HTTPException]] على طول؟ لأن كود الـ services (اللي بيجيب order من القاعدة) ميعرفش حاجة عن HTTP. ممكن نفس الكود يشتغل من CLI أو worker، وهناك مفيش 404. فهو يرمي [[NotFoundError]]، والـ handler بس هو اللي يقرر إنها 404.

---

## ٣. handler الـ [[AppError]]

~~~python
@app.exception_handler(AppError)
async def app_error(request: Request, exc: AppError):
    return JSONResponse({"error": {"code": exc.code, "message": exc.message}}, status_code=exc.status)
~~~

- [[@app.exception_handler(AppError)]]: «لو [[AppError]] (أو أي ابن ليه) طلع من أي route ومحدش مسكه، ابعته للدالة دي».
- الدالة بتاخد حاجتين: الطلب، والـ exception نفسه ([[exc]]).
- [[JSONResponse(body, status_code=...)]]: الـ body الأول، والكود جاي من الـ exception نفسه، فـ [[NotFoundError]] بيطلع 404 من غير ما الـ handler يعرف أنواعه.

~~~python
@app.get("/orders/{order_id}")
async def get_order(order_id: int):
    raise NotFoundError(f"order {order_id} not found")
~~~

~~~bash
curl -i localhost:8000/orders/5
~~~

~~~text الناتج
HTTP/1.1 404 Not Found
content-type: application/json

{"error":{"code":"NOT_FOUND","message":"order 5 not found"}}
~~~

ولو رميت [[AppError("generic")]] نفسه، الناتج [[400]] و [[{"error":{"code":"APP_ERROR","message":"generic"}}]]: نفس الـ handler، بالقيم الافتراضية.

---

## ٤. handler الـ 422

~~~python
@app.exception_handler(RequestValidationError)
async def validation_error(request: Request, exc: RequestValidationError):
    fields = [{"field": ".".join(map(str, e["loc"][1:])), "message": e["msg"]} for e in exc.errors()]
    return JSONResponse({"error": {"code": "VALIDATION", "fields": fields}}, status_code=422)
~~~

السطر الطويل ده list comprehension. نفكّه من جوه لبرة، على خطأ واحد من [[exc.errors()]] لطلب [[/orders/abc]]:

~~~text e = عنصر واحد من exc.errors()
{"type": "int_parsing", "loc": ("path", "order_id"), "msg": "Input should be a valid integer, unable to parse string as an integer", "input": "abc"}
~~~

| الخطوة | الكود | الناتج |
|---|---|---|
| ١ | [[e["loc"]]] | [[("path", "order_id")]]: المصدر، وبعده اسم الحقل |
| ٢ | [[[1:]]] | [[("order_id",)]]: شيل أول عنصر ([[path]] أو [[query]] أو [[body]]) |
| ٣ | [[map(str, ...)]] | حوّل كل عنصر string (الـ loc ممكن يبقى فيه أرقام، زي index في list: [[items.0.price]]) |
| ٤ | [[".".join(...)]] | الصقهم بنقطة: [[order_id]] |
| ٥ | [[e["msg"]]] | الرسالة |
| ٦ | [[for e in exc.errors()]] | لكل خطأ في الطلب (ممكن يبقوا كذا) |

~~~text curl -i localhost:8000/orders/abc
HTTP/1.1 422 Unprocessable Content

{"error":{"code":"VALIDATION","fields":[{"field":"order_id","message":"Input should be a valid integer, unable to parse string as an integer"}]}}
~~~

قارنه بالـ 422 الافتراضية ([[{"detail":[{"type":...,"loc":["path","order_id"],...}]}]]): دلوقتي تحت [[error.code]] زي الباقي.

---

## ٥. آخر خط: [[Exception]]

~~~python
@app.exception_handler(Exception)
async def unhandled(request: Request, exc: Exception):
    ref = uuid.uuid4().hex[:8]
    log.exception("unhandled error ref=%s path=%s", ref, request.url.path)
    return JSONResponse({"error": {"code": "INTERNAL", "ref": ref}}, status_code=500)
~~~

- [[uuid.uuid4()]]: id عشوائي، و [[.hex]] شكله ٣٢ حرف hex من غير شرط، و [[[:8]]] أول ٨ بس. كفاية للتتبع وسهل المستخدم يقراه.
- [[log.exception(...)]]: بيسجّل الرسالة **ومعاها الـ traceback كامل** (لازم يتنادى جوه except أو handler). و [[%s]] أماكن القيم، والـ logging بيملاهم بنفسه.
- [[request.url.path]]: المسار اللي حصل فيه الخطأ.
- الرد فيه الـ ref بس، من غير أي تفاصيل.

جربت route فيه [[return 1 / 0]]:

~~~text الرد
HTTP/1.1 500 Internal Server Error

{"error":{"code":"INTERNAL","ref":"650b9611"}}
~~~

~~~text لوج السيرفر (مختصر)
unhandled error ref=650b9611 path=/boom
Traceback (most recent call last):
  ...
  File "...main.py", line 32, in boom
    return 1 / 0
ZeroDivisionError: division by zero
ERROR:    Exception in ASGI application
Traceback (most recent call last):
  ...
ZeroDivisionError: division by zero
~~~

- نفس الـ ref في الرد وفي اللوج: المستخدم يبعتلك [[650b9611]]، تدوّر عليه تلاقي الـ traceback.
- السطر طلع من غير [[ERROR:app:]] قدامه، لأن uvicorn بيظبط الـ loggers بتاعته بس، والـ logger بتاعك بيستخدم الإعداد الاحتياطي اللي بيطبع الرسالة بس. لو حطيت [[logging.basicConfig()]] في أول التطبيق (جربتها) بيبقى [[ERROR:app:unhandled error ref=57111ded path=/boom]].
- الـ traceback ظهر **مرتين**: مرة من [[log.exception]]، ومرة [[Exception in ASGI application]] من uvicorn. ده لأن handler الـ [[Exception]] بيشتغل في آخر طبقة (ServerErrorMiddleware)، وبعد ما يبعت الرد بيرمي الـ exception تاني للسيرفر. طبيعي.

---

## ٦. الـ 404 بتاعة route مش موجود

~~~text curl -i localhost:8000/missing
HTTP/1.1 404 Not Found

{"detail":"Not Found"}
~~~

دي لسه بالشكل القديم: جاية من Starlette كـ [[HTTPException]]، ومش [[AppError]]. لو عايزها موحّدة، اعمل handler على [[starlette.exceptions.HTTPException]] (بيمسك بتاعة FastAPI كمان لأنها بتورث منها).

---

## السطور كلها

| الـ handler | بيمسك | الكود |
|---|---|---|
| [[AppError]] | أخطاء الـ business وولادها | من [[exc.status]] |
| [[RequestValidationError]] | الطلب مش مطابق | 422 |
| [[Exception]] | أي حاجة تانية | 500 مع ref |

## الخلاصة

- الـ services ترمي exceptions بتاعتك، والـ handlers هي اللي تعرف HTTP.
- handler واحد على الأب بيغطي كل الولاد.
- الـ 500 للعميل فيها ref بس، والتفاصيل كلها في اللوج بنفس الـ ref.`,
          lines: [
            "logging.",
            "لرقم التتبع.",
            "FastAPI و Request.",
            "exception الـ 422.",
            "رد JSON بكود.",
            "logger باسم.",
            "التطبيق.",
            "الأب لكل أخطاء التطبيق.",
            "الكود الافتراضي.",
            "code ثابت للـ frontend.",
            "constructor.",
            "الرسالة.",
            "نوع مخصوص.",
            "بيغيّر الكود والـ code بس.",
            "أي AppError أو ابن ليه يوصل هنا.",
            "الـ handler بياخد الـ request والـ exception.",
            "شكل موحّد.",
            "بدّل شكل الـ 422 الافتراضي.",
            "الـ handler.",
            "حوّل الأخطاء لـ field و message، من غير body أو query في أول الـ loc.",
            "نفس الشكل.",
            "آخر خط: أي حاجة محدش مسكها.",
            "الـ handler.",
            "رقم قصير للتتبع.",
            "سجّل الـ traceback كامل في اللوج، مش في الرد.",
            "رسالة عامة ورقم.",
            "route.",
            "الدالة.",
            "بترمي خطأ business، والـ handler بيحوّله 404."
          ],
          sol: R`[[/orders/5]] بترجع [[404]] و [[{"error": {"code": "NOT_FOUND", "message": "order 5 not found"}}]]، و [[/orders/abc]] بترجع [[422]] و [[{"error": {"code": "VALIDATION", "fields": [{"field": "order_id", "message": "Input should be a valid integer, unable to parse string as an integer"}]}}]]. الاتنين تحت [[error.code]]، فالـ frontend يعمل parse بطريقة واحدة. و [[loc[1:]]] شالت [[path]] من أول الـ loc عشان الاسم يبقى [[order_id]] بس.

والـ route اللي فيه [[1 / 0]] بيرجع [[500]] و [[{"error": {"code": "INTERNAL", "ref": "44f9e7b5"}}]] (الـ ref عشوائي)، وفي اللوج [[unhandled error ref=44f9e7b5 path=/boom]] ومعاه traceback الـ [[ZeroDivisionError]] (السطر بيطلع كده من غير مستوى ولا اسم logger لأن uvicorn مبيظبطش الـ root logger؛ ولو عامل [[logging.basicConfig()]] في أول التطبيق هيبقى [[ERROR:app:unhandled error ref=44f9e7b5 path=/boom]]). نفس الـ ref في الاتنين، فلما مستخدم يبعتلك الـ ref تلاقي الخطأ في اللوج على طول، من غير ما تسرّب تفاصيل للعميل. وخد بالك إن تحت uvicorn هتلاقي الـ traceback مرتين: مرة من الـ [[log.exception]] بتاعك، ومرة [[Exception in ASGI application]]، لأن Starlette بيرمي الخطأ تاني للسيرفر بعد ما الـ handler بتاعك يرد. ده طبيعي ومش معناه إن الـ handler مشتغلش.`
        },
        {
          cmd: "CORS و middleware",
          title: "تسمح لـ frontend على دومين تاني، وتعمل كود يلف كل request",
          desc: R`المتصفح بيمنع الـ JavaScript إنه يقرا رد API على origin تاني، إلا لو الـ API قال إنه موافق. و [[CORSMiddleware]] بيقول ده: [[allow_origins]] بالدومينات المسموحة بالظبط.

والـ middleware عمومًا كود بيلف كل request: قبل ما يوصل للـ route وبعد ما الرد يطلع. أمثلة: request id، وقياس الوقت، و headers أمان.`,
          example: R`import time
import uuid
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://shop.example.com", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)
@app.middleware("http")
async def timing(request: Request, call_next):
    request_id = request.headers.get("x-request-id") or uuid.uuid4().hex
    start = time.perf_counter()
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    response.headers["Server-Timing"] = f"app;dur={(time.perf_counter() - start) * 1000:.1f}"
    return response`,
          try: R`من console صفحة على دومين تاني اعمل [[fetch("http://localhost:8000/health")]] قبل وبعد ما تضيف الدومين في [[allow_origins]]، واقرا رسالة CORS في الـ console. وشوف [[X-Request-ID]] في الرد بـ [[curl -i]].`,
          flag: "script",
          deep: {
            why: R`أول مرة تربط React بالـ API: كل حاجة شغالة في Postman، والمتصفح بيقول blocked by CORS policy. والحل مش [[allow_origins=["*"]]] وخلاص. والـ middleware بيحل الحاجات اللي لازم تحصل لكل request من غير ما تفتكرها في كل route.`,
            how: R`CORS قاعدة في المتصفح بس (curl و Postman مبيهتموش). ولما الطلب «مش بسيط» (فيه [[Authorization]] أو JSON أو PATCH)، المتصفح بيبعت الأول [[OPTIONS]] (preflight) يسأل، والـ middleware بيرد بالمسموح، وبعدين المتصفح يبعت الطلب الحقيقي. و [[allow_credentials=True]] (للـ cookies) لازم معاها الدومينات بالاسم. وخلي الدومينات جاية من الإعدادات، مش مكتوبة في الكود.

الـ middleware بيتنفذ على شكل بصلة: آخر واحد اتضاف هو أول واحد بيشوف الـ request، وآخر واحد بيشوف الـ response. و [[call_next(request)]] بيعدّي الطلب للي جوه ويستنى الرد.

[[@app.middleware("http")]] سهل، بس مبني على BaseHTTPMiddleware اللي فيه مشاكل مع الـ streaming و contextvars. فللحاجات الحساسة للأداء اكتب pure ASGI middleware. و [[GZipMiddleware]] بيضغط الردود الكبيرة (لو nginx مش عامل ده).

والـ middleware بيلف كل الطلبات (حتى الـ 404)، أما الـ dependency فعلى routes معينة وليها وصول للـ DI. فالـ auth مكانها dependency غالبًا، والـ request id والتوقيت و CORS مكانهم middleware.`,
            when: R`CORS لما الـ frontend على origin تاني (حتى [[localhost:5173]] و [[localhost:8000]] origins مختلفة). و middleware للحاجات اللي بتخص كل request: ids ولوج وتوقيت و headers.`,
            mistakes: R`[[allow_origins=["*"]]] مع [[allow_credentials=True]]: Starlette بيرجّع origin الطالب نفسه لما فيه cookies، فعمليًا أي موقع يقدر يكلّم الـ API بـ cookies المستخدم. ونسيان [[http://localhost:5173]] في التطوير. و CORS مضاف في nginx وفي FastAPI الاتنين فالـ header يتكرر والمتصفح يرفض. وتقرا [[await request.body()]] في middleware على كل request: بيحمّل الـ body كله في الذاكرة (حتى الـ uploads الكبيرة)، ولو في pure ASGI middleware استهلكت الـ receive بنفسك، الـ route مش هيلاقي body.`
          },
          teach: R`## المثال بيعمل إيه؟

بيلف التطبيق بتلات طبقات middleware: **CORS** (يقول للمتصفح مين من المواقع مسموحله يقرا الردود)، و **GZip** (يضغط الردود الكبيرة)، و middleware بإيدك بيحط على كل رد [[X-Request-ID]] ووقت التنفيذ. اتشغّل فعلًا بـ FastAPI 0.142 (Starlette 1.7) على ويندوز، مع route زيادة [[@app.get("/health")]] بيرجّع [[{"ok": true}]] عشان نجرّب عليه، والطلبات بـ [[curl -i]] من Git Bash.

---

## ١. الـ imports

~~~python
import time
import uuid
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
~~~

- [[time]]: هنستخدم [[perf_counter()]] لقياس المدة.
- [[uuid]]: لعمل request id عشوائي.
- [[CORSMiddleware]] و [[GZipMiddleware]]: جاهزين (هما بتوع Starlette، و FastAPI بيعيد تصديرهم).

---

## ٢. CORS

~~~python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://shop.example.com", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)
~~~

### يعني إيه origin؟

الـ origin = البروتوكول + الدومين + البورت. فـ [[http://localhost:5173]] (Vite) و [[http://localhost:8000]] (الـ API) **origins مختلفة** عشان البورت مختلف. والمتصفح بيمنع JavaScript في صفحة من origin إنه يقرا رد من origin تاني، إلا لو الرد فيه header بيقول «مسموح». CORS = Cross-Origin Resource Sharing.

| الإعداد | معناه |
|---|---|
| [[allow_origins]] | الـ origins المسموحة بالظبط، من غير [[/]] في الآخر |
| [[allow_credentials=True]] | مسموح الطلب ييجي بـ cookies ([[fetch(url, {credentials: "include"})]]) |
| [[allow_methods]] | الـ methods المسموحة في الـ preflight |
| [[allow_headers]] | الـ headers اللي الصفحة مسموحلها تبعتها |

### نجرّب: origin مسموح وorigin لأ

المتصفح بيبعت header اسمه [[Origin]] لوحده. بـ curl بنبعته بإيدنا:

~~~bash
curl -i -H "Origin: http://localhost:5173" localhost:8000/health
curl -i -H "Origin: https://evil.example" localhost:8000/health
~~~

~~~text الناتج (headers الـ CORS بس)
== Origin: http://localhost:5173
HTTP/1.1 200 OK
access-control-allow-credentials: true
access-control-allow-origin: http://localhost:5173
vary: Origin

== Origin: https://evil.example
HTTP/1.1 200 OK
access-control-allow-credentials: true
vary: Origin
~~~

لاحظ: الاتنين **200** والـ body اتبعت. الفرق إن التاني مفيهوش [[access-control-allow-origin]]، فالمتصفح هو اللي هيمنع الـ JavaScript يقراه ويكتب في الـ console رسالة [[blocked by CORS policy]]. يعني CORS مش حماية للسيرفر، ده قاعدة في المتصفح بتحمي المستخدم. و [[vary: Origin]] بيقول لأي cache في النص «الرد ده بيختلف حسب الـ Origin».

### الـ preflight: [[OPTIONS]]

لو الطلب «مش بسيط» (PATCH، أو فيه [[Authorization]]، أو JSON)، المتصفح بيسأل الأول بطلب [[OPTIONS]]:

~~~bash
curl -i -X OPTIONS -H "Origin: http://localhost:5173" -H "Access-Control-Request-Method: PATCH" -H "Access-Control-Request-Headers: authorization,content-type" localhost:8000/health
~~~

~~~text الناتج
HTTP/1.1 200 OK
access-control-allow-methods: GET, POST, PATCH, DELETE
access-control-max-age: 600
access-control-allow-headers: Accept, Accept-Language, Authorization, Content-Language, Content-Type
access-control-allow-credentials: true
access-control-allow-origin: http://localhost:5173

OK
~~~

- الـ middleware رد بنفسه، والـ route **مااتنداش** (مفيش route لـ OPTIONS أصلًا).
- [[access-control-max-age: 600]]: المتصفح يفتكر الإجابة دي ٦٠٠ ثانية (١٠ دقايق) من غير ما يسأل تاني.
- [[allow-headers]] فيه زيادة على اللي كتبناه ([[Accept]] وغيرها): دي headers «آمنة» Starlette بيضيفها دايمًا.

ولو الـ origin مش مسموح: [[400 Bad Request]] و [[Disallowed CORS origin]]. ولو header مش في القايمة ([[x-api-key]]): [[400]] و [[Disallowed CORS headers]]. والمتصفح ساعتها مش هيبعت الطلب الحقيقي خالص.

---

## ٣. GZip

~~~python
app.add_middleware(GZipMiddleware, minimum_size=1000)
~~~

لو العميل قال إنه بيفهم gzip ([[Accept-Encoding: gzip]]، والمتصفحات بتقوله دايمًا) والرد أكبر من ١٠٠٠ byte، بيتضغط. جربت route بيرجّع ٥٠٠٠ حرف [[x]]:

~~~text الناتج
من غير Accept-Encoding:  5011 bytes
بـ Accept-Encoding: gzip:  content-encoding: gzip   content-length: 55
~~~

٥٠١١ بقوا ٥٥ لأن الداتا كلها حرف واحد متكرر. JSON حقيقي بيتضغط أقل بس برضه كتير. والردود الصغيرة ([[{"ok":true}]]، ١١ byte) مبتتضغطش، لأن الضغط هيكبّرها.

---

## ٤. middleware بإيدك

~~~python
@app.middleware("http")
async def timing(request: Request, call_next):
    request_id = request.headers.get("x-request-id") or uuid.uuid4().hex
    start = time.perf_counter()
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    response.headers["Server-Timing"] = f"app;dur={(time.perf_counter() - start) * 1000:.1f}"
    return response
~~~

الدالة متقسمة نصين حوالين [[await call_next(request)]]:

1. **قبل**: [[request.headers.get("x-request-id")]] بيشوف لو حد قبلنا (nginx أو الـ frontend) بعت id، و [[or uuid.uuid4().hex]] يعني لو مفيش ([[None]])، اعمل واحد جديد ٣٢ حرف hex. و [[start]] بداية العداد.
2. [[call_next(request)]]: عدّي الطلب للطبقة اللي جوه (لحد الـ route) واستنى الرد.
3. **بعد**: ضيف headers على الرد. و [[(time.perf_counter() - start) * 1000]] المدة بالملّي ثانية، و [[:.1f]] رقم عشري واحد.

~~~bash
curl -i localhost:8000/health
~~~

~~~text الناتج
HTTP/1.1 200 OK
content-length: 11
content-type: application/json
vary: Origin
x-request-id: d2206da5fc604f3db2fd81f5860fb2cc
server-timing: app;dur=1.3

{"ok":true}
~~~

ولو بعت id بنفسك:

~~~text curl -i -H "X-Request-ID: abc123" localhost:8000/health
x-request-id: abc123
server-timing: app;dur=0.5
~~~

[[Server-Timing]] header معياري، والمتصفح بيعرضه في DevTools في تاب Network ثم Timing.

---

## ٥. الترتيب: البصلة

كل [[add_middleware]] (و [[@app.middleware]]) بيلف اللي قبله من برّه. فآخر واحد اتضاف هو أول واحد بيشوف الطلب:

~~~text الطلب داخل ←  timing  ←  GZip  ←  CORS  ←  الـ route
الرد طالع   →  timing  →  GZip  →  CORS  →  ...
~~~

ودليل ده من التجربة: رد الـ preflight اللي CORS رد عليه بنفسه كان فيه [[x-request-id]] و [[server-timing]]، لأن [[timing]] برّه CORS فشاف رده.

---

## السطور كلها

| الكود | بيعمل إيه |
|---|---|
| [[CORSMiddleware(allow_origins=[...])]] | يضيف [[access-control-allow-origin]] للـ origins المسموحة ويرد على الـ preflight |
| [[GZipMiddleware(minimum_size=1000)]] | يضغط الردود الأكبر من ١٠٠٠ byte |
| [[@app.middleware("http")]] | دالة بتلف كل طلب |
| [[await call_next(request)]] | عدّي للي جوه وهات الرد |
| [[response.headers[...] = ...]] | عدّل الرد قبل ما يطلع |

## الخلاصة

- CORS قاعدة في المتصفح: السيرفر بيرد عادي، والمتصفح هو اللي بيمنع القراية. و curl عمره ما هيوريك خطأ CORS.
- اكتب الـ origins بالاسم، خصوصًا مع [[allow_credentials=True]].
- الـ middleware لكل الطلبات (ids، توقيت، ضغط، CORS)، والـ dependencies لـ routes معينة (auth، DB).`,
          lines: [
            "للتوقيت.",
            "للـ request id.",
            "FastAPI و Request.",
            "CORS جاهز.",
            "ضغط gzip جاهز.",
            "التطبيق.",
            "ضيف middleware بإعداداته.",
            "CORS.",
            "الـ origins المسموحة بالظبط (من الإعدادات في الحقيقة).",
            R`اسمح بالـ cookies (fetch بـ [[credentials: "include"]])؛ أما header الـ Authorization فبيتسمح بيه من allow_headers.`,
            "الـ methods المسموحة.",
            "الـ headers المسموحة.",
            "قفلة.",
            "اضغط الردود اللي أكبر من 1000 byte.",
            "middleware بدالة.",
            "بياخد الـ request ودالة بتعدّيه للي جوه.",
            "خد الـ id من اللي قبلك (nginx) أو اعمل واحد.",
            "ابدأ العداد.",
            "عدّي الطلب واستنى الرد.",
            "رجّع الـ id في الرد، عشان العميل يقولهولك لما يشتكي.",
            "الوقت، وبيظهر في DevTools في تاب Timing.",
            "رجّع الرد."
          ],
          sol: R`قبل ما تضيف الدومين، الـ console هيطبع حاجة زي: [[Access to fetch at 'http://localhost:8000/health' from origin 'https://example.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.]] و [[fetch]] بيرمي [[TypeError: Failed to fetch]]. والمهم: لو بصيت في لوج السيرفر هتلاقي الطلب وصل ورجع [[200]]. الـ CORS مش بيمنع الطلب، بيمنع JavaScript إنه يقرا الرد. وبعد ما تضيف الدومين، الرد بيبقى فيه [[access-control-allow-origin: https://example.com]] والـ fetch بينجح. (Chrome الجديد ممكن كمان يسألك إذن «local network access» لما صفحة من الإنترنت تكلم localhost، وده غير الـ CORS.)

و [[curl -i localhost:8000/health]] هيطلع فيه [[x-request-id: 8cd8b4e4...]] (32 حرف hex عشوائي) و [[server-timing: app;dur=0.6]]. ولو بعت [[-H "X-Request-ID: abc123"]] هيرجعلك [[abc123]] نفسه، ودي الفكرة: الـ id يمشي مع الطلب من الـ frontend أو الـ proxy لحد اللوج. و [[curl]] مبيعملش CORS خالص، فلو جرّبت منه هيشتغل في كل الحالات.`
        }
      ]
    },
    {
      t: "قاعدة البيانات",
      l: 3,
      n: "asyncpg بـ pool و SQL صريح، و transactions، و SQLAlchemy async لو عايز ORM، و Alembic للـ migrations",
      items: [
        {
          cmd: "asyncpg",
          title: "تكلّم Postgres بـ asyncpg: pool و $1 و fetch",
          desc: R`asyncpg أسرع درايفر Postgres لـ Python async، وبتكتب بيه SQL عادي. الباراميترات بـ [[$1]] و [[$2]] مش f-string، والدوال: [[fetch]] (صفوف)، و [[fetchrow]] (صف أو None)، و [[fetchval]] (قيمة واحدة)، و [[execute]] (من غير نتيجة)، و [[executemany]] (نفس الأمر لكذا صف).

والـ pool بيتعمل مرة في الـ lifespan، وكل request بياخد اتصال ويرجّعه (درس dependency بـ yield). والـ SQL نفسه والـ indexes في تاب PostgreSQL وتاب «SQL و Prisma».`,
          example: R`import asyncpg
from pydantic import BaseModel
class Product(BaseModel):
    id: int
    name: str
    price_cents: int
async def demo(dsn: str) -> None:
    pool = await asyncpg.create_pool(dsn, min_size=2, max_size=10, command_timeout=10)
    async with pool.acquire() as conn:
        rows = await conn.fetch("SELECT id, name, price_cents FROM products WHERE price_cents < $1 ORDER BY id LIMIT $2", 5000, 20)
        products = [Product(**dict(r)) for r in rows]
        row = await conn.fetchrow("SELECT id, name, price_cents FROM products WHERE id = $1", 7)
        count = await conn.fetchval("SELECT count(*) FROM products")
        await conn.execute("UPDATE products SET price_cents = $1 WHERE id = $2", 4500, 7)
        await conn.executemany("INSERT INTO tags (product_id, tag) VALUES ($1, $2)", [(7, "hot"), (7, "new")])
        ids = await conn.fetch("SELECT id FROM products WHERE id = ANY($1::int[])", [1, 2, 3])
    await pool.close()`,
          try: R`شغّل Postgres في Docker (تاب Docker)، واعمل جدول products فيه كام صف، وجرّب كل دالة في المثال. وبعدين اكتب query بـ f-string زي [[f"... WHERE name = '{name}'"]] وجرّب [[name = "x' OR '1'='1"]]، وشوف ليه الـ [[$1]] مش اختيارية.`,
          flag: "script",
          deep: {
            why: R`الـ ORM مش إجباري. asyncpg بيديك SQL كامل (CTEs و window functions و [[ON CONFLICT]] و [[RETURNING]]) وأداء أعلى من أي حاجة تانية في Python، ومفيش طبقة سحرية بتولّد queries مش شايفها. ومشاريع حقيقية كتير ماشية بـ asyncpg و SQL في ملفات repository.`,
            how: R`[[create_pool]] بيفتح [[min_size]] اتصالات ويكبر لحد [[max_size]]، و [[pool.acquire()]] بيستنى لو كل الاتصالات مشغولة. وخلي [[max_size]] × عدد الـ workers × عدد الـ containers أقل من [[max_connections]] بتاع Postgres (الافتراضي 100).

asyncpg بيستخدم البروتوكول الثنائي و prepared statements: الـ query والقيم بيتبعتوا منفصلين، فمفيش SQL injection أصلًا، والـ statements المتكررة بتتعمل cache. عشان كده مع PgBouncer في وضع transaction لازم [[statement_cache_size=0]].

الـ [[Record]] اللي بيرجع بيتقري بالاسم [[r["name"]]] أو بالـ index، و [[dict(r)]] بيحوّله dict تبعته لـ Pydantic. والأنواع بتتحوّل لوحدها: [[timestamptz]] لـ datetime، و [[numeric]] لـ Decimal، و [[uuid]] لـ UUID، و [[jsonb]] لـ string (إلا لو عملت codec بـ [[set_type_codec]]).

وأي list بتتبعت كـ Postgres array: [[= ANY($1::int[])]] بدل ما تبني [[IN (1, 2, 3)]] بإيدك.`,
            when: "لما عايز SQL صريح وأداء عالي، أو الـ queries معقدة. ولو الفريق متعود على ORM والـ CRUD كتير: SQLAlchemy (بعد درسين).",
            mistakes: R`f-string في SQL (injection). و [[asyncpg.connect()]] مع كل request بدل pool. و [[%s]] أو [[?]] (دي بتاعة psycopg و sqlite)؛ asyncpg بيقبل [[$1]] بس. ونسيان [[command_timeout]] فـ query معلّقة تمسك اتصال للأبد. و [[fetch]] من غير LIMIT على جدول فيه مليون صف.`
          },
          teach: R`## المثال بيعمل إيه؟

دالة تجربة بتفتح pool لـ Postgres، وتاخد منه اتصال، وتجرّب عليه دوال asyncpg الخمسة واحدة واحدة: صفوف، وصف واحد، وقيمة واحدة، وأمر من غير نتيجة، ونفس الأمر لكذا صف. وفي الآخر تقفل الـ pool.

اتشغّل فعلًا بـ asyncpg 0.32 و Python 3.14 على ويندوز، على Postgres 18 في Docker، بالـ DSN [[postgresql://app:secret@localhost:5432/shop]] ونداء [[asyncio.run(demo(dsn))]] في آخر الملف. والجداول:

~~~sql
CREATE TABLE products (id serial PRIMARY KEY, name text NOT NULL, price_cents int NOT NULL);
INSERT INTO products (name, price_cents) SELECT 'p' || g, g * 700 FROM generate_series(1, 10) g;
CREATE TABLE tags (product_id int REFERENCES products(id), tag text);
~~~

يعني ١٠ منتجات: [[p1]] بـ 700، و [[p2]] بـ 1400، ... لحد [[p10]] بـ 7000. و [[generate_series(1, 10)]] بيطلّع الأرقام من 1 لـ 10، و [[||]] بيلزق نصوص.

---

## ١. الموديل

~~~python
import asyncpg
from pydantic import BaseModel
class Product(BaseModel):
    id: int
    name: str
    price_cents: int
~~~

السعر بالقروش [[int]] مش [[float]]: [[0.1 + 0.2]] في float مش بالظبط [[0.3]]، والفلوس متستحملش ده.

---

## ٢. الـ pool

~~~python
pool = await asyncpg.create_pool(dsn, min_size=2, max_size=10, command_timeout=10)
~~~

- [[dsn]] (Data Source Name): الـ URL بتاع القاعدة، [[postgresql://user:password@host:port/db]].
- [[min_size=2]]: افتح اتصالين على طول. في التجربة [[pool.get_size()]] رجّع [[2]].
- [[max_size=10]]: أقصى عدد. لو العشرة مشغولين، [[acquire()]] بيستنى.
- [[command_timeout=10]]: أي query تاخد أكتر من ١٠ ثواني تتلغي بـ [[TimeoutError]] بدل ما تمسك الاتصال للأبد.

---

## ٣. [[acquire]]

~~~python
async with pool.acquire() as conn:
~~~

خد اتصال، و [[async with]] بترجّعه للـ pool أول ما البلوك يخلص، حتى لو حصل exception.

---

## ٤. [[fetch]]: صفوف

~~~python
rows = await conn.fetch("SELECT id, name, price_cents FROM products WHERE price_cents < $1 ORDER BY id LIMIT $2", 5000, 20)
~~~

- [[$1]] و [[$2]]: **أماكن** القيم في الـ SQL، والقيم نفسها ([[5000]] و [[20]]) بتتبعت بعد الـ SQL بالترتيب. asyncpg بيبعت الاتنين لـ Postgres **منفصلين**.
- بيرجّع list من [[Record]]:

~~~text الناتج
[<Record id=1 name='p1' price_cents=700>, <Record id=2 name='p2' price_cents=1400>, ...]
len = 7
~~~

٧ صفوف لأن الأسعار الأقل من 5000 هي 700 لحد 4900.

~~~python
products = [Product(**dict(r)) for r in rows]
~~~

نفكّه من جوه لبرة لصف واحد:

| الخطوة | الكود | الناتج |
|---|---|---|
| ١ | [[r]] | [[<Record id=1 name='p1' price_cents=700>]] |
| ٢ | [[dict(r)]] | [[{'id': 1, 'name': 'p1', 'price_cents': 700}]] |
| ٣ | [[**]] | فك الـ dict لباراميترات بالاسم: [[Product(id=1, name='p1', price_cents=700)]] |
| ٤ | [[[... for r in rows]]] | نفس الكلام لكل صف |

والـ [[Record]] ممكن يتقري بالاسم [[r["name"]]] أو بالرقم [[r[1]]]، والاتنين طلعوا [[p1]].

---

## ٥. [[fetchrow]] و [[fetchval]]

~~~python
row = await conn.fetchrow("SELECT id, name, price_cents FROM products WHERE id = $1", 7)
count = await conn.fetchval("SELECT count(*) FROM products")
~~~

~~~text الناتج
fetchrow: <Record id=7 name='p7' price_cents=4900>
fetchrow (id = 999): None
fetchval: 10   (نوعه int)
~~~

- [[fetchrow]]: أول صف بس، أو [[None]] لو مفيش. فلازم [[if row is None]] قبل ما تستخدمه.
- [[fetchval]]: أول عمود من أول صف. مناسب لـ [[count(*)]] و [[RETURNING id]].

---

## ٦. [[execute]] و [[executemany]]

~~~python
await conn.execute("UPDATE products SET price_cents = $1 WHERE id = $2", 4500, 7)
await conn.executemany("INSERT INTO tags (product_id, tag) VALUES ($1, $2)", [(7, "hot"), (7, "new")])
~~~

~~~text الناتج
execute: 'UPDATE 1'
executemany: None
~~~

- [[execute]] بيرجّع **حالة الأمر** كـ string، زي اللي [[psql]] بيطبعه: [[UPDATE 1]] يعني صف واحد اتعدّل. لو [[UPDATE 0]] يبقى مفيش منتج بالـ id ده.
- [[executemany]]: نفس الـ SQL لكل tuple في الـ list، وبيرجّع [[None]].

---

## ٧. list كـ array: [[ANY]]

~~~python
ids = await conn.fetch("SELECT id FROM products WHERE id = ANY($1::int[])", [1, 2, 3])
~~~

~~~text الناتج
[<Record id=1>, <Record id=2>, <Record id=3>]
~~~

- [[[1, 2, 3]]] list في Python، asyncpg بيبعتها **Postgres array**.
- [[$1::int[]]]: الـ [[::]] في Postgres تحويل نوع (cast)، و [[int[]]] array من int.
- [[id = ANY(array)]]: الـ id يساوي أي عنصر فيها. بديل [[IN (1, 2, 3)]] من غير ما تبني الـ SQL بإيدك حسب طول الليستة.

---

## ٨. ليه [[$1]] مش اختيارية

~~~python
name = "x' OR '1'='1"
await conn.fetch(f"SELECT id FROM products WHERE name = '{name}'")
await conn.fetch("SELECT id FROM products WHERE name = $1", name)
~~~

~~~text الناتج
f-string: 10 صفوف
$1:       0 صفوف
~~~

الـ f-string بتلزق القيمة جوه الـ SQL، فالـ query بقت:

~~~text
SELECT id FROM products WHERE name = 'x' OR '1'='1'
~~~

و [['1'='1']] صح دايمًا، فرجع الجدول كله. ده SQL injection. أما مع [[$1]]، القيمة بتوصل لـ Postgres كداتا بس: بيدوّر على منتج اسمه حرفيًا [[x' OR '1'='1]]، ومفيش.

---

## ٩. asyncpg صارم

~~~text الناتج
fetch("... WHERE id = $1", "7")  →  DataError: invalid input for query argument $1: '7' ('str' object cannot be interpreted as an integer)
fetch("... WHERE id = %s", 7)    →  PostgresSyntaxError: syntax error at or near "%"
~~~

- الـ string [["7"]] مش بتتحوّل رقم لوحدها: حوّل القيم قبلها (وده شغل Pydantic في الـ route).
- [[%s]] بتاعة psycopg، و [[?]] بتاعة sqlite. asyncpg بيعرف [[$1]] بس.

---

## السطور كلها

| الدالة | بترجّع | امتى |
|---|---|---|
| [[fetch]] | list من Record | صفوف كتير |
| [[fetchrow]] | Record أو None | صف واحد |
| [[fetchval]] | قيمة واحدة | count، RETURNING id |
| [[execute]] | string زي [[UPDATE 1]] | INSERT أو UPDATE أو DELETE |
| [[executemany]] | None | نفس الأمر لكذا صف |

## الخلاصة

- pool واحد للتطبيق، و [[acquire]] لكل شغلانة.
- القيم دايمًا بـ [[$1]] و [[$2]]، مش f-string ولا [[%s]].
- [[dict(record)]] وبعدين Pydantic لو عايز موديل.
- list في Python = array في Postgres: [[= ANY($1::int[])]].`,
          lines: [
            "الدرايفر.",
            "موديل للنتيجة.",
            "شكل المنتج.",
            "حقل.",
            "حقل.",
            "السعر بالقروش int.",
            "دالة للتجربة (في التطبيق: الـ pool في الـ lifespan).",
            "pool: من ٢ لـ ١٠ اتصالات، وأي query أكتر من ١٠ ثواني تتلغي.",
            "خد اتصال، ويرجع للـ pool لوحده.",
            R`صفوف: الباراميترات [[$1]] و [[$2]] بتتبعت منفصلة عن الـ SQL.`,
            "كل Record لـ dict وبعدين لـ Pydantic.",
            "صف واحد أو None.",
            "قيمة واحدة.",
            R`أمر من غير نتيجة، وبيرجع string زي [[UPDATE 1]].`,
            "نفس الأمر لكذا صف.",
            "list بتتبعت كـ Postgres array.",
            "اقفل الـ pool (في التطبيق: بعد الـ yield في الـ lifespan)."
          ],
          sol: R`على جدول فيه ١٠ منتجات بأسعار من 700 لـ 7000: [[fetch]] بيرجع list من [[Record]] زي [[<Record id=1 name='p1' price_cents=700>]]، و [[fetchrow]] بيرجع Record واحد أو [[None]] لو مفيش، و [[fetchval]] قيمة واحدة ([[10]])، و [[execute]] بيرجع حالة الأمر كـ string ([[UPDATE 1]])، و [[executemany]] بيرجع [[None]]، و [[ANY($1::int[])]] مع list Python بيرجع التلاتة.

والـ f-string مع [[name = "x' OR '1'='1"]] بيرجع الـ ١٠ صفوف كلهم، لأن الـ query بقت [[WHERE name = 'x' OR '1'='1']] والشرط بقى صح دايمًا (SQL injection). ونفس الكلام بـ [[$1]] بيرجع ٠ صفوف: القيمة بتتبعت لـ Postgres منفصلة عن الـ SQL، فمهما كان فيها مبتبقاش كود. ولاحظ إن asyncpg صارم في الأنواع: [[fetch("... WHERE id = $1", "7")]] بترمي [[DataError: invalid input for query argument $1: '7' ('str' object cannot be interpreted as an integer)]]، فحوّل القيم قبلها (وده دور Pydantic).`
        },
        {
          cmd: "transactions",
          title: "كذا عملية يا تتنفذ كلها يا ولا واحدة",
          desc: R`[[async with conn.transaction():]] بيبدأ transaction: لو البلوك خلص عادي بيعمل commit، ولو حصل exception بيعمل rollback. وأي خطوتين مرتبطين (خصم من المخزون وإنشاء طلب) لازم يبقوا في transaction واحدة.

وللحاجات اللي ممكن تحصل من طلبين في نفس اللحظة (آخر قطعة في المخزون): UPDATE بشرط، أو [[SELECT ... FOR UPDATE]]، عشان متبيعش نفس القطعة مرتين.`,
          example: R`import json
import asyncpg
class OutOfStock(Exception):
    pass
async def place_order(conn: asyncpg.Connection, user_id: int, product_id: int, qty: int) -> int:
    async with conn.transaction():
        left = await conn.fetchval(
            "UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING stock",
            qty, product_id,
        )
        if left is None:
            raise OutOfStock(product_id)
        order_id = await conn.fetchval(
            "INSERT INTO orders (user_id, product_id, qty) VALUES ($1, $2, $3) RETURNING id",
            user_id, product_id, qty,
        )
        await conn.execute(
            "INSERT INTO outbox (topic, payload) VALUES ('order.created', $1::jsonb)",
            json.dumps({"order_id": order_id}),
        )
    return order_id`,
          try: R`افتح اتنين [[psql]] وجرّب نفس الـ UPDATE على نفس المنتج من الاتنين جوه [[BEGIN]] من غير COMMIT: التاني هيستنى الأول. وبعدين في Python ارمي exception بعد أول INSERT، واتأكد إن المخزون منقصش.`,
          flag: "script",
          deep: {
            why: "من غير transaction: المخزون نقص والطلب متعملش لأن الـ INSERT فشل، أو طلبين في نفس اللحظة شافوا «فاضل قطعة» والاتنين اشتروا. دي bugs بتظهر تحت الضغط بس، وبتكلّف فلوس حقيقية.",
            how: R`[[conn.transaction()]] بيبعت [[BEGIN]]، والخروج من البلوك [[COMMIT]] أو [[ROLLBACK]]. ولو اتنادت جوه transaction تانية، بتعمل [[SAVEPOINT]] (nested).

الـ UPDATE بالشرط ([[WHERE stock >= $1]]) atomic: Postgres بيقفل الصف، فمن طلبين مع بعض واحد بس هيلاقي المخزون كفاية، والتاني [[RETURNING]] مش هيرجّع حاجة (None). وده أبسط وأسرع من [[SELECT ... FOR UPDATE]] وبعدين UPDATE.

الـ outbox: بدل ما تبعت إيميل أو event جوه الـ transaction (لو الإرسال نجح والـ commit فشل، تبقى بعت عن حاجة محصلتش)، بتكتب الـ event في جدول [[outbox]] في نفس الـ transaction، و worker منفصل يقرا ويبعت. كده الـ event موجود لو وبس لو الطلب اتعمل.

والـ isolation الافتراضي [[READ COMMITTED]]. وممكن [[conn.transaction(isolation="serializable")]] بس ساعتها لازم تعيد المحاولة لو Postgres رمى serialization error. وتفاصيل الـ isolation والـ locks في تاب «SQL و Prisma» وتاب PostgreSQL.`,
            when: "أي عملية كتابة فيها أكتر من statement، أو قراية بعدها كتابة على نفس الداتا. وخلي الـ transaction قصيرة: متعملش HTTP call جواها.",
            mistakes: R`transaction بتستنى API خارجي (الـ locks والاتصال محجوزين ثواني). و SELECT المخزون، تحسب في Python، وبعدين UPDATE بالرقم ([[SET stock = 4]]): race condition. وتمسك الـ exception جوه البلوك وتبلعه، فالـ commit يحصل على نص شغل.`
          },
          teach: R`## المثال بيعمل إيه؟

دالة [[place_order]] بتعمل طلب شراء في ٣ خطوات: تنقّص المخزون، وتعمل صف في [[orders]]، وتكتب event في جدول [[outbox]]. التلاتة جوه transaction واحدة: يا يتنفذوا كلهم، يا ولا واحد. والمخزون بيتنقص بطريقة آمنة حتى لو اتنين بيشتروا آخر قطعة في نفس اللحظة.

اتشغّل فعلًا بـ asyncpg 0.32 على ويندوز، على Postgres 18 في Docker، بجدول [[products]] فيه عمود [[stock]]، و [[orders (id serial, user_id, product_id, qty)]]، و:

~~~sql
CREATE TABLE outbox (id bigserial PRIMARY KEY, topic text NOT NULL, payload jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
~~~

---

## ١. البداية

~~~python
import json
import asyncpg
class OutOfStock(Exception):
    pass
~~~

- [[json]]: عشان نحوّل الـ payload لنص JSON.
- [[OutOfStock]]: exception بتاعنا. [[pass]] يعني «مفيش حاجة زيادة»، الاسم لوحده كفاية عشان نمسكه.

---

## ٢. [[async with conn.transaction():]]

~~~python
async def place_order(conn: asyncpg.Connection, user_id: int, product_id: int, qty: int) -> int:
    async with conn.transaction():
        ...
    return order_id
~~~

| اللحظة | asyncpg بيبعت لـ Postgres |
|---|---|
| الدخول في البلوك | [[BEGIN]] |
| البلوك خلص عادي | [[COMMIT]]: كل اللي جوه يتحفظ |
| exception طلع من البلوك | [[ROLLBACK]]: كل اللي جوه يتلغي، والـ exception يكمّل لبرّه |

والدالة بتاخد [[conn]] جاهز (من الـ dependency بتاعة درس «dependency بـ yield» مثلًا)، ومبتفتحش اتصال بنفسها.

---

## ٣. الخطوة ١: تنقيص المخزون بشرط

~~~python
left = await conn.fetchval(
    "UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING stock",
    qty, product_id,
)
if left is None:
    raise OutOfStock(product_id)
~~~

نفك الـ SQL:

| الحتة | معناها |
|---|---|
| [[SET stock = stock - $1]] | الحساب بيحصل **جوه Postgres** على القيمة الحالية، مش رقم حسبناه في Python |
| [[WHERE id = $2]] | المنتج ده |
| [[AND stock >= $1]] | بس لو المخزون كفاية. لو مش كفاية، مفيش صف يتعدّل |
| [[RETURNING stock]] | رجّعلي المخزون بعد التعديل |

و [[$1]] مستخدمة مرتين (الكمية في الطرح وفي الشرط)، والقيم بالترتيب: [[qty]] بعدين [[product_id]].

- لو اتعدّل صف: [[fetchval]] بترجع المخزون الباقي.
- لو مفيش صف (المخزون مش كفاية): مفيش حاجة ترجع، فـ [[fetchval]] بترجع [[None]]، فبنرمي [[OutOfStock]]، والـ transaction تعمل rollback.

ليه مش SELECT الأول وبعدين UPDATE؟ لأن بين الاتنين طلب تاني ممكن يقرا نفس الرقم. الـ UPDATE بالشرط خطوة واحدة: Postgres بيقفل الصف وهو بيعدّله.

---

## ٤. الخطوة ٢ و ٣: الطلب والـ outbox

~~~python
order_id = await conn.fetchval(
    "INSERT INTO orders (user_id, product_id, qty) VALUES ($1, $2, $3) RETURNING id",
    user_id, product_id, qty,
)
await conn.execute(
    "INSERT INTO outbox (topic, payload) VALUES ('order.created', $1::jsonb)",
    json.dumps({"order_id": order_id}),
)
~~~

- [[RETURNING id]] مع [[fetchval]]: الـ id الجديد.
- [[json.dumps({...})]]: dict لـ string JSON، و [[$1::jsonb]] بيقول لـ Postgres «النص ده حوّله jsonb». (asyncpg من غير codec بيتعامل مع jsonb كـ string.)
- الـ outbox: بدل ما نبعت إيميل أو event لنظام تاني **هنا** (ولو الـ commit فشل بعدها نبقى بعتنا عن طلب مش موجود)، بنكتب «فيه event» في جدول جوه نفس الـ transaction. و worker منفصل يقرا الجدول ويبعت. فالـ event موجود لو وبس لو الطلب اتحفظ.

---

## ٥. نجرّب

### طلب عادي (مخزون المنتج 1 كان 10، والكمية 3)

~~~text الناتج
order: 6
stock p1: 7
outbox: [<Record id=1 topic='order.created' payload='{"order_id": 6}'>]
~~~

### كمية أكبر من المخزون (50)

~~~text الناتج
OutOfStock: OutOfStock(1)
~~~

### exception بعد أول INSERT

ضفت [[raise RuntimeError("boom after insert")]] بعد INSERT الـ orders:

~~~text الناتج
RuntimeError: boom after insert
stock p1 after fail: 7
orders: [<Record id=6 user_id=42 product_id=1 qty=3>]
next order: 8
~~~

- المخزون لسه 7: الـ UPDATE اتلغى مع الـ INSERT.
- مفيش طلب جديد في [[orders]] غير 6.
- الطلب اللي بعده أخد 8 مش 7: الـ id رقم 7 اتاخد من الـ sequence في المحاولة الفاشلة، والـ sequence مبيرجعش.

### اتنين بيشتروا آخر قطعة مع بعض

منتج مخزونه 1، واتنين [[place_order]] بـ [[asyncio.gather]] على اتصالين مختلفين:

~~~text الناتج
race: [9, 'OutOfStock']
~~~

واحد بس نجح. التاني استنى قفل الصف، وبعد ما الأول عمل commit لقى [[stock = 0]]، فالشرط [[stock >= 1]] فشل.

---

## ٦. القفل بعينك: جلستين [[psql]]

~~~sql
-- الجلسة الأولى
BEGIN;
UPDATE products SET stock = stock - 1 WHERE id = 4;
-- (من غير COMMIT)

-- الجلسة التانية
UPDATE products SET stock = stock - 1 WHERE id = 4 RETURNING stock;
~~~

التانية بتفضل واقفة من غير ما تطبع حاجة لحد ما الأولى تعمل [[COMMIT]] أو [[ROLLBACK]]. جربتها والأولى بتعمل commit بعد ٣ ثواني: التانية خلصت بعد حوالي ٢.٨ ثانية (بدأت بعد نص ثانية)، وطبعت:

~~~text الناتج
 stock
-------
     8
(1 row)

UPDATE 1
~~~

المخزون كان 10، وكل جلسة نقّصت 1، فالنتيجة 8 مش 9: التانية اشتغلت على القيمة **بعد** commit الأولى. ونفس التجربة بـ اتصالين asyncpg: التاني فضل مستني ([[done() = False]] بعد ثانيتين) لحد الـ COMMIT.

---

## السطور كلها

| الخطوة | الكود | لو فشلت |
|---|---|---|
| BEGIN | [[async with conn.transaction()]] | |
| ١ | [[UPDATE ... WHERE stock >= $1 RETURNING stock]] | [[None]] ← [[OutOfStock]] ← rollback |
| ٢ | [[INSERT INTO orders ... RETURNING id]] | exception ← rollback |
| ٣ | [[INSERT INTO outbox ...]] | exception ← rollback |
| COMMIT | آخر البلوك | |

## الخلاصة

- أي كتابتين مرتبطين = transaction واحدة. والـ exception جوه البلوك = rollback للكل.
- نقّص المخزون في SQL بشرط ([[stock = stock - $1 WHERE stock >= $1]])، مش تقرا وتحسب في Python.
- الإيميلات والـ events من جوه transaction تتكتب في outbox، مش تتبعت.
- الـ transaction قصيرة: متعملش فيها HTTP call.`,
          lines: [
            "لـ JSON الـ event.",
            "الدرايفر.",
            "exception بتاعك.",
            "فاضي.",
            "دالة بتاخد اتصال (من الـ dependency).",
            "BEGIN، و COMMIT أو ROLLBACK حسب البلوك.",
            "UPDATE بشرط...",
            "...ينقص بس لو المخزون كفاية، ويرجّع الباقي.",
            R`الباراميترات، و [[$1]] اتستخدمت مرتين.`,
            "قفلة.",
            "مفيش صف اتعدّل = المخزون مش كفاية.",
            "exception = rollback لكل حاجة.",
            "اعمل الطلب...",
            "...ورجّع الـ id.",
            "القيم.",
            "قفلة.",
            "event في نفس الـ transaction (outbox)...",
            "...worker هيقراه ويبعته بعدين.",
            "الـ payload كـ JSON.",
            "قفلة.",
            "هنا الـ commit حصل."
          ],
          sol: R`في الـ psql التاني، الـ UPDATE هيفضل واقف من غير ما يطبع حاجة لحد ما تعمل [[COMMIT]] (أو [[ROLLBACK]]) في الأول. Postgres عامل row lock على الصف. ولما الأول يعمل commit، التاني بيكمّل على القيمة الجديدة: لو المخزون كان 10 وكل واحد نقّص 1 هتلاقي [[8]] مش [[9]]. ده اللي بيخلي [[stock = stock - $1 WHERE stock >= $1]] آمن من غير ما تقرا الأول وتكتب بعدين.

وفي Python لو رميت exception بعد أول INSERT: المخزون هيفضل زي ما هو وجدول orders مفيهوش صف، لأن [[async with conn.transaction()]] عمل rollback للـ UPDATE والـ INSERT مع بعض. الطلب اللي بعده هياخد id أكبر بواحد (الـ sequence مبترجعش). ولو لقيت المخزون نقص، غالبًا الـ UPDATE كان برّه الـ [[async with]]، أو استخدمت connection تاني غير اللي فتح الـ transaction.`
        },
        {
          cmd: "SQLAlchemy async",
          title: "ORM بـ SQLAlchemy 2 وهو async",
          desc: R`SQLAlchemy 2 بيدّيك models بـ type hints ([[Mapped[int]]] و [[mapped_column]])، و queries بـ [[select()]]، ويشتغل async فوق asyncpg: [[create_async_engine("postgresql+asyncpg://...")]] و [[AsyncSession]].

الـ session بتتعمل لكل request في dependency بـ yield، والـ engine مرة واحدة. و [[expire_on_commit=False]] مهمة في async.

التسطيب: [[pip install "sqlalchemy[asyncio]" asyncpg]]، مش [[pip install sqlalchemy]] بس. من SQLAlchemy 2.1 مكتبة [[greenlet]] مبقتش بتتسطّب لوحدها، والجزء الـ async محتاجها، فمن غير الـ extra ده أول استخدام async هيرمي [[ImportError]] إن [[greenlet]] مش متسطّبة.`,
          example: R`from datetime import datetime
from typing import Annotated
from fastapi import Depends
from sqlalchemy import ForeignKey, func, select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, selectinload
class Base(DeclarativeBase):
    pass
class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
class Order(Base):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    total_cents: Mapped[int]
    user: Mapped[User] = relationship()
engine = create_async_engine("postgresql+asyncpg://app:secret@localhost/shop", pool_size=10)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)
async def get_session():
    async with SessionLocal() as session:
        yield session
SessionDep = Annotated[AsyncSession, Depends(get_session)]
async def recent_orders(session: AsyncSession, user_id: int) -> list[Order]:
    stmt = select(Order).where(Order.user_id == user_id).options(selectinload(Order.user)).order_by(Order.id.desc()).limit(20)
    return list(await session.scalars(stmt))
async def create_user(session: AsyncSession, email: str) -> User:
    user = User(email=email)
    session.add(user)
    await session.commit()
    return user`,
          try: R`شيل [[selectinload(Order.user)]] وجرّب تقرا [[order.user.email]] بعد الـ query: هيطلع [[MissingGreenlet]]. ده الـ lazy loading اللي async مبيسمحش بيه. وبعدين اعمل الـ engine بـ [[echo=True]] وشوف الـ SQL اللي اتولّد.`,
          flag: "script",
          deep: {
            why: "لما الـ CRUD كتير والعلاقات متشعبة، كتابة SQL لكل حاجة بتتقل. و SQLAlchemy أشهر ORM في Python، ونسخة 2 نضّفت الـ API وبقت typed وبتشتغل async. وهتقابلها في أغلب مشاريع FastAPI.",
            how: R`[[DeclarativeBase]] أساس الـ models، و [[Mapped[T]]] النوع (و [[Mapped[str | None]]] يبقى nullable)، و [[mapped_column]] للإعدادات.

الـ engine جواه pool الاتصالات، وإنشاؤه مبيفتحش اتصال فورًا، فعادي يبقى على مستوى الـ module، وفي آخر الـ lifespan [[await engine.dispose()]]. والـ session وحدة شغل لكل request: بتتابع الـ objects اللي اتضافت أو اتعدّلت، و [[commit]] بيكتبهم.

[[expire_on_commit=False]]: الافتراضي إن بعد commit كل الـ attributes بتتمسح وتتقري تاني من القاعدة أول ما تلمسها. وفي async ده محتاج await، والـ attribute access مينفعش يعمل await، فبيطلع [[MissingGreenlet]]. ونفس السبب بيخلي الـ lazy loading للعلاقات ممنوع: حمّلها مقدمًا بـ [[selectinload]] (query تانية بـ IN) أو [[joinedload]] (JOIN)، أو استخدم [[AsyncAttrs]] و [[await obj.awaitable_attrs.user]].

[[session.scalars(stmt)]] بيرجع الـ objects نفسها، و [[session.execute(stmt)]] بيرجع صفوف. و [[session.get(User, 5)]] بالـ primary key. وتقدر تحوّل الناتج لـ Pydantic بـ [[from_attributes]].

والـ migrations مش شغل SQLAlchemy نفسه: [[Base.metadata.create_all]] للتجربة بس، و Alembic للحقيقي (الدرس الجاي). وفيه كمان SQLModel (من صاحب FastAPI) مبني على SQLAlchemy و Pydantic مع بعض.`,
            when: R`CRUD كتير وعلاقات، وفريق متعود على ORM. وتقدر تخلط: ORM للعادي، و [[text()]] أو asyncpg مباشرة للـ queries التقيلة.`,
            mistakes: R`N+1: loop على طلبات وكل واحد يعمل query لمستخدمه (في async بيطلع error، وده أحسن من sync اللي بيبطّأ في صمت). و session واحدة مشتركة بين requests. و [[create_engine]] الـ sync جوه تطبيق async. ونسيان [[await session.commit()]] فمفيش حاجة اتحفظت.`
          },
          teach: R`## المثال بيعمل إيه؟

بيعرّف جدولين كـ classes ([[User]] و [[Order]])، ويعمل engine (اتصال + pool) و مصنع sessions، و dependency بتدّي كل طلب session، ودالتين: واحدة بتجيب آخر طلبات مستخدم ومعاها صاحبها، وواحدة بتعمل مستخدم. يعني ORM (Object-Relational Mapping): بتتعامل مع objects في Python، و SQLAlchemy بيكتب الـ SQL.

اتشغّل فعلًا بـ SQLAlchemy 2.1.3 و asyncpg 0.32 و Python 3.14 على ويندوز، على Postgres 18 في Docker. عملت الجداول بـ [[Base.metadata.create_all]] (للتجربة بس)، ومستخدم [[sara@example.com]] وطلبين ليه، وناديت الدوال من [[asyncio.run]].

---

## ١. الـ imports

~~~python
from datetime import datetime
from typing import Annotated
from fastapi import Depends
from sqlalchemy import ForeignKey, func, select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, selectinload
~~~

| الاسم | بتاع إيه |
|---|---|
| [[ForeignKey]] | عمود بيشاور على عمود في جدول تاني |
| [[func]] | دوال SQL: [[func.now()]] = [[now()]] في Postgres |
| [[select]] | يبني SELECT |
| [[create_async_engine]] و [[AsyncSession]] و [[async_sessionmaker]] | النسخ الـ async من الـ engine والـ session ومصنعها |
| [[DeclarativeBase]] و [[Mapped]] و [[mapped_column]] | تعريف الـ models |
| [[relationship]] و [[selectinload]] | العلاقات وتحميلها |

---

## ٢. الـ models

~~~python
class Base(DeclarativeBase):
    pass
class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
~~~

- [[Base]]: أب كل الـ models. فاضي، بس هو اللي بيجمع كل الجداول في [[Base.metadata]].
- [[__tablename__]]: اسم الجدول في القاعدة.
- [[Mapped[int]]]: «العمود ده نوعه int، ومش null». ولو [[Mapped[str | None]]] يبقى nullable. الـ type hint نفسه هو اللي بيحدد النوع.
- [[mapped_column(primary_key=True)]]: primary key، وفي Postgres بيبقى بيزيد لوحده.
- [[unique=True]]: مفيش إيميلين زي بعض.
- [[server_default=func.now()]]: القاعدة نفسها اللي تحط الوقت لو مبعتناهوش.

~~~python
class Order(Base):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    total_cents: Mapped[int]
    user: Mapped[User] = relationship()
~~~

- [[ForeignKey("users.id")]]: [[user_id]] لازم يبقى id موجود في [[users]].
- [[total_cents: Mapped[int]]] من غير [[mapped_column]]: الـ annotation لوحدها كفاية لعمود عادي.
- [[user: Mapped[User] = relationship()]]: **مش عمود**. ده attribute بيجيب الـ [[User]] اللي [[user_id]] بيشاور عليه، فتكتب [[order.user.email]].

---

## ٣. الـ engine والـ sessions

~~~python
engine = create_async_engine("postgresql+asyncpg://app:secret@localhost/shop", pool_size=10)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)
~~~

- [[postgresql+asyncpg://]]: القاعدة Postgres، والدرايفر asyncpg. باقي الـ URL زي أي DSN.
- [[pool_size=10]]: الـ engine جواه pool. وإنشاؤه **مبيفتحش اتصال**، أول اتصال بيتفتح مع أول query، فعادي يبقى على مستوى الـ module.
- [[async_sessionmaker]]: مصنع، كل ما تناديه [[SessionLocal()]] يدّيك session جديدة.
- [[expire_on_commit=False]]: من غيرها، بعد [[commit]] كل الـ attributes بتتمسح وتتقري من القاعدة أول ما تلمسها. وقراية attribute مينفعش فيها [[await]]، فبيطلع error. جربتها بمصنع من غير الإعداد ده: [[u.email]] بعد commit رمت [[MissingGreenlet]].

---

## ٤. الـ dependency

~~~python
async def get_session():
    async with SessionLocal() as session:
        yield session
SessionDep = Annotated[AsyncSession, Depends(get_session)]
~~~

نفس فكرة درس «dependency بـ yield»: session لكل طلب، و [[async with]] بتقفلها بعد الـ route (وأي transaction مفتوحة مااتعملهاش commit بتتعمل لها rollback). والـ route يكتب [[session: SessionDep]].

---

## ٥. [[recent_orders]]: السطر الطويل

~~~python
stmt = select(Order).where(Order.user_id == user_id).options(selectinload(Order.user)).order_by(Order.id.desc()).limit(20)
return list(await session.scalars(stmt))
~~~

كل حتة بترجّع statement جديد، فبتتسلسل بالنقط:

| الحتة | الـ SQL |
|---|---|
| [[select(Order)]] | [[SELECT orders.id, orders.user_id, orders.total_cents FROM orders]] |
| [[.where(Order.user_id == user_id)]] | [[WHERE orders.user_id = $1]]: الـ [[==]] هنا مش بيرجّع True أو False، بيبني شرط SQL |
| [[.options(selectinload(Order.user))]] | بعد ما تجيب الطلبات، هات أصحابها في query تانية |
| [[.order_by(Order.id.desc())]] | [[ORDER BY orders.id DESC]] |
| [[.limit(20)]] | [[LIMIT $2]] |

- [[session.scalars(stmt)]]: نفّذ، ورجّع أول عمود من كل صف، وهو هنا الـ [[Order]] object نفسه. ومحتاج [[await]] لأنه بيكلّم القاعدة.
- [[list(...)]]: حوّل النتيجة لـ list عادية.

### الـ SQL الحقيقي

لو عملت الـ engine بـ [[echo=True]]، SQLAlchemy بيطبع كل query:

~~~text الناتج
BEGIN (implicit)
SELECT orders.id, orders.user_id, orders.total_cents
FROM orders
WHERE orders.user_id = $1::INTEGER ORDER BY orders.id DESC
 LIMIT $2::INTEGER
[generated in 0.00017s] (1, 20)
SELECT users.id, users.email, users.created_at
FROM users
WHERE users.id IN ($1::INTEGER)
[generated in 0.00022s] (1,)
[(2, 3200), (1, 1500)]
email: sara@example.com
ROLLBACK
~~~

- query للطلبات، وبعدها **query واحدة** للمستخدمين بـ [[IN]]، مهما كان عدد الطلبات. ده اللي بيمنع مشكلة N+1 (query لكل طلب).
- [[BEGIN (implicit)]]: الـ session فتحت transaction لوحدها مع أول query.
- [[ROLLBACK]] في الآخر: الـ session اتقفلت من غير commit. عادي لأننا قرينا بس.

### من غير [[selectinload]]

~~~text الناتج
[(2, 3200), (1, 1500)]
MissingGreenlet: greenlet_spawn has not been called; can't call await_() here. Was IO attempted in an unexpected place?
~~~

الطلبات جت، بس [[orders[0].user.email]] وقعت. الـ [[user]] متحمّلش، فـ SQLAlchemy حاول يجيبه وقت ما قريت الـ attribute (ده اسمه lazy loading)، وده محتاج query، و async مينفعش يعمل query من غير [[await]]. فحمّل العلاقات مقدمًا دايمًا.

---

## ٦. [[create_user]]

~~~python
user = User(email=email)
session.add(user)
await session.commit()
return user
~~~

- [[User(email=email)]]: object في الذاكرة بس، لسه مالوش id.
- [[session.add(user)]]: الـ session بقت متابعاه. لسه مفيش SQL.
- [[await session.commit()]]: دلوقتي بس الـ SQL بيتبعت:

~~~text الناتج (echo=True)
BEGIN (implicit)
INSERT INTO users (email) VALUES ($1::VARCHAR) RETURNING users.id, users.created_at
[generated in 0.00020s] ('omar@example.com',)
COMMIT
after commit, expire_on_commit=False: 2 2026-10-07 09:27:02.559845
~~~

الـ [[id]] و [[created_at]] القاعدة هي اللي عملتهم، و SQLAlchemy جابهم بـ [[RETURNING]] وحطهم في الـ object، فـ [[user.id]] بقى 2 من غير query زيادة.

---

## ٧. التسطيب

~~~bash
pip install "sqlalchemy[asyncio]" asyncpg
~~~

الـ [[[asyncio]]] بيسطّب [[greenlet]] (الحتة اللي SQLAlchemy بيستخدمها عشان يشغّل كوده الـ sync جوه async). في SQLAlchemy 2.1 الـ greenlet مبقاش بيتسطّب لوحده: الـ metadata بتاعة الحزمة بتقول [[greenlet>=1; extra == "asyncio"]].

---

## السطور كلها

| الكود | بيعمل إيه |
|---|---|
| [[class X(Base)]] و [[Mapped[T]]] | جدول وأعمدته |
| [[relationship()]] | attribute بيجيب الصف المرتبط |
| [[create_async_engine(...)]] | الاتصال والـ pool، مرة واحدة |
| [[async_sessionmaker(..., expire_on_commit=False)]] | مصنع sessions مناسب لـ async |
| [[select(...).where(...).options(selectinload(...))]] | query وتحميل العلاقة مقدمًا |
| [[await session.scalars(stmt)]] | نفّذ ورجّع objects |
| [[session.add]] ثم [[await session.commit()]] | INSERT فعلي |

## الخلاصة

- في async مفيش lazy loading: [[selectinload]] أو [[joinedload]] لكل علاقة هتقراها.
- [[expire_on_commit=False]] وإلا قراية أي attribute بعد commit هتقع.
- [[echo=True]] وإنت بتطوّر عشان تشوف الـ SQL الحقيقي.
- [[create_all]] للتجربة، و Alembic للحقيقي (الدرس الجاي).`,
          lines: [
            "datetime.",
            "Annotated.",
            "Depends.",
            "أدوات الـ SQL.",
            "الحتت الـ async.",
            "الـ models والعلاقات والتحميل المسبق.",
            "أساس كل الـ models.",
            "فاضي.",
            "model للمستخدمين.",
            "اسم الجدول.",
            "primary key.",
            "string ومفيش اتنين زي بعض.",
            "القاعدة بتحط الوقت لوحدها.",
            "model للطلبات.",
            "اسم الجدول.",
            "primary key.",
            "foreign key.",
            "annotation لوحدها كفاية: عمود int مش null.",
            "علاقة: الطلب بيشاور على صاحبه.",
            "engine بدرايفر asyncpg، وجواه pool.",
            "مصنع sessions، ومبيمسحش الـ attributes بعد commit.",
            "dependency: session لكل request.",
            "افتحها، وهتتقفل لوحدها.",
            "ادّيها للـ route.",
            "النوع للـ routes.",
            "دالة repository.",
            "select بشرط، وحمّل المستخدم مقدمًا (مفيش lazy loading في async)، ورتّب، و LIMIT.",
            "نفّذ ورجّع الـ objects.",
            "إنشاء.",
            "object جديد.",
            "ضيفه للـ session.",
            "INSERT و COMMIT، والـ id و created_at بيرجعوا بـ RETURNING.",
            "رجّع."
          ],
          sol: R`من غير [[selectinload]]، [[order.user.email]] بترمي [[MissingGreenlet: greenlet_spawn has not been called; can't call await_() here. Was IO attempted in an unexpected place?]]. الـ [[user]] متحمّلش، فـ SQLAlchemy حاول يعمل query وإنت بتقرا attribute عادي من غير [[await]]، وده مينفعش في async. الحل تحمّله مقدمًا بـ [[selectinload]]، أو [[await session.refresh(order, ["user"])]]، أو [[lazy="raise"]] على الـ relationship عشان الغلطة تبان بدري.

ومع [[echo=True]] هتشوف [[SELECT orders.id, orders.user_id, orders.total_cents FROM orders WHERE orders.user_id = $1::INTEGER ORDER BY orders.id DESC LIMIT $2::INTEGER]]، وبعدها query تانية من [[selectinload]]: [[SELECT users.id, users.email, users.created_at FROM users WHERE users.id IN ($1::INTEGER)]]، يعني ٢ queries مهما كان عدد الطلبات، مش N+1. ولو ظهر [[ImportError: The SQLAlchemy asyncio module requires that the Python 'greenlet' library is installed]]، سطّب [[pip install "sqlalchemy[asyncio]" asyncpg]]: من SQLAlchemy 2.1 الـ greenlet مبقاش بيتسطّب لوحده.`
        },
        {
          cmd: "alembic",
          title: "تغيّر شكل الجداول بـ migrations بتتعمل commit",
          desc: R`Alembic أداة الـ migrations لـ SQLAlchemy: كل تغيير في الجداول ملف Python فيه [[upgrade()]] و [[downgrade()]]، بيتعمله commit مع الكود، ويتطبق على كل بيئة بنفس الترتيب. و [[--autogenerate]] بيقارن الـ models بالقاعدة ويكتب الـ migration، وانت تراجعه.

ولو مش بتستخدم SQLAlchemy (asyncpg و SQL بس)، نفس الفكرة بملفات SQL وسكربت (تاب PostgreSQL فيه «سكربت migrations»)، أو Alembic نفسه بـ [[op.execute("...")]].`,
          example: R`pip install alembic
alembic init -t async migrations
alembic revision --autogenerate -m "add orders.total_cents"
alembic upgrade head
alembic current
alembic history --verbose
alembic downgrade -1
alembic upgrade head --sql > upgrade.sql`,
          try: R`اعمل [[alembic init -t async migrations]]، وفي [[migrations/env.py]] خلّي [[target_metadata = Base.metadata]] والـ URL جاي من الإعدادات. ضيف عمود للـ model، واعمل autogenerate، وافتح الملف اللي اتعمل واقراه قبل [[upgrade]].`,
          deep: {
            why: R`[[create_all]] بيعمل الجداول لو مش موجودة بس، ومبيعدّلش جدول موجود. ومن غير migrations، كل تغيير بيتعمل بإيدك على السيرفر، ومحدش عارف القاعدة في الإنتاج شكلها إيه.`,
            how: R`[[alembic init -t async]] بيعمل [[alembic.ini]] وفولدر فيه [[env.py]] جاهز لـ engine async. في [[env.py]] بتربط [[target_metadata]] بـ [[Base.metadata]] عشان autogenerate يعرف الـ models، وتقرا الـ URL من الإعدادات بدل ما يتكتب في alembic.ini.

كل migration ليه [[revision]] و [[down_revision]]، فالملفات سلسلة. و Alembic بيسجّل آخر واحد اتطبق في جدول [[alembic_version]]، و [[upgrade head]] بيطبق كل اللي بعده بالترتيب.

autogenerate بيلقط الجداول والأعمدة والـ indexes والـ foreign keys، بس مش كل حاجة: تغيير اسم عمود بيطلع drop و add (والداتا تضيع!)، وبعض تغييرات الأنواع والـ constraints بتفوته. عشان كده الملف لازم يتقري ويتعدّل قبل ما يتعمله commit.

[[--sql]] (offline mode) بيطلّع الـ SQL من غير ما ينفّذه، تراجعه أو تديه للـ DBA.

وفي الديبلوي: [[alembic upgrade head]] خطوة قبل ما الـ containers الجديدة تقوم (job منفصل أو أمر في الـ entrypoint)، مش جوه التطبيق وكل worker بيحاول يعملها. والتغييرات الكاسرة (مسح عمود بيستخدمه الكود القديم) بتتعمل على مرحلتين: expand وبعدين contract. التفاصيل في «تغييرات آمنة في الإنتاج» في تاب PostgreSQL.`,
            when: "أي مشروع فيه قاعدة بيانات هتعيش أكتر من أسبوع.",
            mistakes: R`تعدّل migration اتطبق خلاص على الإنتاج بدل ما تعمل واحد جديد. وتعمل commit لـ autogenerate من غير ما تقراه (الـ rename بقى drop). واتنين في الفريق عملوا migration من نفس النقطة فبقى فيه اتنين head ([[alembic heads]]، والحل [[alembic merge]]). و [[downgrade]] على الإنتاج بيمسح داتا.`
          },
          teach: R`## المثال بيعمل إيه؟

٨ أوامر هي دورة حياة الـ migrations كلها: تسطّب Alembic، وتعمل فولدر الـ migrations، وتولّد migration من الفرق بين الـ models والقاعدة، وتطبّقه، وتشوف القاعدة واقفة فين، وتشوف السلسلة، وترجع خطوة، وتطلّع الـ SQL من غير ما تنفّذه.

اتشغّل فعلًا بـ Alembic 1.20 و SQLAlchemy 2.1 على ويندوز (Git Bash، ونفس الأوامر في PowerShell)، على Postgres 18 في Docker، بمشروع فيه [[app/models.py]] (نفس [[User]] و [[Order]] بتوع الدرس اللي فات، و [[Order]] لسه من غير [[total_cents]]).

---

## ١. [[pip install alembic]] و [[alembic init -t async migrations]]

- [[init]]: اعمل هيكل الـ migrations.
- [[-t async]]: [[-t]] = template، و [[async]] قالب بيستخدم [[async_engine_from_config]]، عشان الـ URL بتاعنا فيه [[+asyncpg]].
- [[migrations]]: اسم الفولدر (ممكن أي اسم).

~~~text الناتج (مختصر)
Creating directory ...\migrations ...  done
Creating directory ...\migrations\versions ...  done
Generating ...\alembic.ini ...  done
Generating ...\migrations\env.py ...  done
Generating ...\migrations\README ...  done
Generating ...\migrations\script.py.mako ...  done
Please edit configuration/connection/logging settings in ...\alembic.ini before proceeding.
~~~

| الملف | فيه إيه |
|---|---|
| [[alembic.ini]] | إعدادات: مكان الفولدر، واللوج، و [[sqlalchemy.url]] (فيه placeholder: [[driver://user:pass@localhost/dbname]]) |
| [[migrations/env.py]] | الكود اللي بيشتغل مع كل أمر: بيوصل للقاعدة ويشغّل الـ migrations |
| [[migrations/script.py.mako]] | القالب اللي كل migration جديد بيتعمل منه |
| [[migrations/versions/]] | الـ migrations نفسها، ملف لكل تغيير |

### تعديل [[env.py]]

فيه سطر [[target_metadata = None]]. غيّرناه كده:

~~~python
import os
from app.models import Base
target_metadata = Base.metadata
config.set_main_option("sqlalchemy.url", os.environ["DATABASE_URL"])
~~~

- [[Base.metadata]]: وصف كل الجداول اللي في الـ models. من غيره الـ autogenerate ميعرفش الـ models شكلها إيه.
- [[config.set_main_option(...)]]: بيحط الـ URL من environment variable بدل ما يتكتب في [[alembic.ini]] اللي بيتعمله commit (الباسورد مكانه مش الـ git). في مشروعك ممكن تاخده من [[settings.database_url]].

~~~bash
export DATABASE_URL="postgresql+asyncpg://app:secret@localhost:5432/shop"
~~~

وفي PowerShell: [[$env:DATABASE_URL = "postgresql+asyncpg://..."]].

---

## ٢. [[alembic revision --autogenerate -m "..."]]

أول مرة (القاعدة فاضية) عملت migration اسمه [[init]]، وطبّقته. وبعدين ضفت للـ model:

~~~python
total_cents: Mapped[int] = mapped_column(server_default="0")
~~~

~~~bash
alembic revision --autogenerate -m "add orders.total_cents"
~~~

- [[revision]]: اعمل ملف migration جديد.
- [[--autogenerate]]: اتصل بالقاعدة، وقارنها بـ [[Base.metadata]]، واكتب الفرق.
- [[-m]]: وصف، وبيدخل في اسم الملف.

~~~text الناتج (مختصر)
INFO  [alembic.ddl.postgresql] Detected sequence named 'orders_id_seq' as owned by integer column 'orders(id)', assuming SERIAL and omitting
INFO  [alembic.autogenerate.compare.tables] Detected added column 'orders.total_cents'
Generating ...\migrations\versions\b281c5a76622_add_orders_total_cents.py ...  done
~~~

سطر الـ sequence معلومة بس: Alembic فهم إن الـ id serial ومش هيعمل له حاجة. والمهم [[Detected added column]]. والملف اللي اتعمل:

~~~python
revision: str = 'b281c5a76622'
down_revision: Union[str, Sequence[str], None] = '67b46188e741'
def upgrade() -> None:
    op.add_column('orders', sa.Column('total_cents', sa.Integer(), server_default='0', nullable=False))
def downgrade() -> None:
    op.drop_column('orders', 'total_cents')
~~~

- [[revision]]: id الـ migration ده (عشوائي، ١٢ حرف hex).
- [[down_revision]]: الـ migration اللي قبله ([[init]]). كده الملفات بتعمل سلسلة.
- [[upgrade()]]: التغيير. [[op.add_column]] = [[ALTER TABLE orders ADD COLUMN ...]].
- [[downgrade()]]: العكس.
- [[server_default='0']]: مهم: الجدول فيه صفوف، والعمود [[NOT NULL]]، فالصفوف القديمة لازم تاخد قيمة. من غيره الـ upgrade كان هيفشل.

**اقرا الملف قبل ما تطبّقه.** جربت أعمل جدول [[legacy_stuff]] في القاعدة بإيدي (مش في الـ models) وعملت autogenerate:

~~~text الناتج
INFO  [alembic.autogenerate.compare.tables] Detected removed table 'legacy_stuff'
~~~

يعني الملف كان هيبقى فيه [[op.drop_table('legacy_stuff')]]، والجدول وداتاه يروحوا. وتغيير اسم عمود بيطلع drop و add (الداتا تضيع) مش rename.

---

## ٣. [[alembic upgrade head]]

[[head]] = آخر migration في السلسلة. بيطبّق كل اللي لسه متطبقش، بالترتيب:

~~~text الناتج
INFO  [alembic.runtime.migration] Context impl PostgresqlImpl.
INFO  [alembic.runtime.migration] Will assume transactional DDL.
INFO  [alembic.runtime.migration] Running upgrade 67b46188e741 -> b281c5a76622, add orders.total_cents
~~~

- [[transactional DDL]]: Postgres بيسمح بـ [[ALTER TABLE]] جوه transaction، فلو migration وقع في النص كله يرجع.
- الصف اللي كان موجود في [[orders]] بقى [[total_cents = 0]] من الـ [[server_default]].

Alembic بيسجّل هو واقف فين في جدول اسمه [[alembic_version]]:

~~~text SELECT * FROM alembic_version
 version_num
--------------
 b281c5a76622
~~~

---

## ٤. [[alembic current]] و [[alembic history --verbose]]

~~~text alembic current
b281c5a76622 (head)
~~~

القاعدة على [[b281c5a76622]]، و [[(head)]] يعني ده آخر واحد. لو لقيته من غير [[(head)]] يبقى فيه migrations لسه متطبقتش.

~~~text alembic history --verbose (مختصر)
Rev: b281c5a76622 (head)
Parent: 67b46188e741
    add orders.total_cents

Rev: 67b46188e741
Parent: <base>
    init
~~~

[[<base>]] = البداية (قاعدة فاضية).

---

## ٥. [[alembic downgrade -1]]

[[-1]] = خطوة واحدة لورا. بينفّذ [[downgrade()]] بتاع آخر migration:

~~~text الناتج
INFO  [alembic.runtime.migration] Running downgrade b281c5a76622 -> 67b46188e741, add orders.total_cents
~~~

و [[alembic current]] بقى [[67b46188e741]] من غير [[(head)]]. وعمود [[total_cents]] اتمسح **بالداتا اللي فيه**. عشان كده downgrade على الإنتاج نادر جدًا: الأسلم migration جديد بيصلّح.

---

## ٦. [[alembic upgrade head --sql > upgrade.sql]]

[[--sql]] = offline mode: اطبع الـ SQL ومتنفّذوش. و [[>]] بيحوّل الطباعة لملف. وسطور [[INFO]] بتطلع على stderr فمش بتدخل الملف.

بس خد بالك: في الـ offline mode Alembic **مش بيكلّم القاعدة**، فميعرفش هي واقفة فين، فبيطلّع السلسلة كلها من الأول ([[CREATE TABLE alembic_version]] و [[CREATE TABLE users]] ...). لو عايز الجديد بس، حدد البداية والنهاية بـ [[:]]:

~~~bash
alembic upgrade 67b46188e741:head --sql
~~~

~~~text الناتج
BEGIN;
-- Running upgrade 67b46188e741 -> b281c5a76622
ALTER TABLE orders ADD COLUMN total_cents INTEGER DEFAULT '0' NOT NULL;
UPDATE alembic_version SET version_num='b281c5a76622' WHERE alembic_version.version_num = '67b46188e741';
COMMIT;
~~~

ده بالظبط اللي [[upgrade]] هيعمله، تراجعه أو تديه للـ DBA.

> في Windows PowerShell 5.1، الـ [[>]] بيكتب الملف UTF-16 (جربتها: [[file]] قال [[UTF-16, little-endian]])، و [[psql]] مش هيعرف يقراه. في pwsh 7 بيطلع UTF-8 عادي (جربتها، والملف طلع نص عادي). فاعمل الأمر ده من pwsh 7 أو Git Bash أو cmd.

---

## السطور كلها

| الأمر | بيعمل إيه |
|---|---|
| [[alembic init -t async migrations]] | هيكل الـ migrations بقالب async |
| [[alembic revision --autogenerate -m "..."]] | ملف migration من الفرق (مسودة، اقراها) |
| [[alembic upgrade head]] | طبّق كل اللي ناقص |
| [[alembic current]] | القاعدة على أنهي revision |
| [[alembic history --verbose]] | السلسلة كلها |
| [[alembic downgrade -1]] | ارجع خطوة (بيمسح داتا) |
| [[alembic upgrade A:B --sql]] | الـ SQL من A لـ B من غير تنفيذ |

## الخلاصة

- كل تغيير في الجداول = ملف migration بيتعمله commit مع الكود.
- الـ autogenerate بيكتب مسودة: اقراها، خصوصًا [[drop_table]] و [[drop_column]].
- عمود [[NOT NULL]] جديد على جدول فيه داتا محتاج [[server_default]].
- [[alembic upgrade head]] خطوة في الـ deploy قبل ما الكود الجديد يقوم.`,
          lines: [
            "سطّب Alembic.",
            "اعمل فولدر migrations بقالب async.",
            "قارن الـ models بالقاعدة واكتب migration جديد (واقراه!).",
            "طبّق كل الـ migrations اللي لسه متطبقتش.",
            "القاعدة واقفة على أنهي revision.",
            "السلسلة كلها بالتفصيل.",
            "ارجع خطوة (بحذر: ممكن يمسح داتا).",
            "اطبع الـ SQL من غير ما تنفّذه، للمراجعة."
          ],
          sol: R`[[alembic init -t async migrations]] بيعمل [[alembic.ini]] وفولدر [[migrations/]] فيه [[env.py]] و [[versions/]]. وفي [[env.py]] بتحط [[from app.models import Base]] و [[target_metadata = Base.metadata]] و [[config.set_main_option("sqlalchemy.url", settings.database_url)]]. بعد ما تضيف [[total_cents: Mapped[int] = mapped_column(server_default="0")]]، الـ autogenerate بيطبع [[Detected added column 'orders.total_cents']] ويعمل ملف في [[versions/]] فيه [[revision]] و [[down_revision]] (اللي قبله)، و [[upgrade()]] فيها [[op.add_column('orders', sa.Column('total_cents', sa.Integer(), server_default='0', nullable=False))]]، و [[downgrade()]] فيها [[op.drop_column]]. وبعد [[upgrade head]]، [[alembic current]] بيطبع الـ revision ومعاه [[(head)]].

ليه تقراه قبل [[upgrade]]؟ لو القاعدة فيها جداول مش في الـ models، الـ autogenerate هيكتب [[Detected removed table]] ويحط [[op.drop_table]] في الملف، وفي تجربتنا ده حصل فعلًا. وكمان تغيير اسم عمود بيطلع drop و add (يعني البيانات تضيع)، مش rename. ولو ضفت عمود NOT NULL من غير [[server_default]] على جدول فيه صفوف، الـ upgrade هيفشل. الملف اللي اتولّد مسودة، مش حاجة تشغّلها من غير ما تبص فيها.`
        }
      ]
    },
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

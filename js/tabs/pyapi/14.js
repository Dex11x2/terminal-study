// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "Dependencies",
      l: 2,
      time: R`حوالي ٥ ساعات`,
      goal: [
        R`تكتب dependency مرة وتستخدمها في كل route بـ [[Annotated[T, Depends(f)]]]، وتعرف إمتى دالة وإمتى class.`,
        R`تفتح حاجة لكل طلب وتقفلها بعده بـ [[yield]] (اتصال قاعدة، transaction)، وحاجة مرة واحدة مع عمر التطبيق بالـ lifespan.`,
        R`تحمي routes بـ dependency للـ auth (401 و 403) و API key، من غير ما تكرر الفحص في كل دالة.`,
        R`تختبر التطبيق بـ [[TestClient]] و [[httpx.AsyncClient]]، وتبدّل أي dependency بـ [[dependency_overrides]] من غير ما تلمس الكود.`,
      ],
      use: {
        prog: R`الـ dependencies هي الطريقة اللي FastAPI بيوصّل بيها كل حاجة مشتركة: القاعدة، والمستخدم الحالي، والإعدادات، والـ pagination.`,
        work: R`أي feature جديدة بتبدأ بسؤال «محتاجة dependency إيه؟». ولما حد يقول «الاختبار محتاج قاعدة حقيقية» الإجابة غالبًا override.`,
        cs: R`ده dependency injection: الدالة بتقول هي محتاجة إيه، والـ framework هو اللي بيجيبه. فالكود ميعرفش جاي منين، وده اللي بيخليه يتختبر.`,
      },
      lab: R`cd shop-api && .venv/Scripts/activate && pip install pyjwt && mkdir -p tests && python -m pytest -q`,
      projects: [
        { lvl: 'صغير', t: R`pagination مشتركة`, what: R`dependency [[Paging]] (class بـ [[page]] و [[size]] و [[le=100]]) بترجّع [[limit]] و [[offset]]، واستخدمها في ٣ routes. من درس «Depends و Annotated».`, done: R`الـ ٣ routes بتقبل [[?page=3&size=10]] وبترجّع [[offset: 20]]، و [[size=500]] بترجع 422 في التلاتة، والقيد مكتوب في مكان واحد بس في الكود.` },
        { lvl: 'صغير', t: R`مفتاح API للـ webhooks`, what: R`route [[POST /webhooks/payments]] محمي بـ [[APIKeyHeader(name="X-API-Key")]]، والمفتاح جاي من [[Settings]] كـ [[SecretStr]]، والمقارنة بـ [[secrets.compare_digest]].`, done: R`من غير header بيرجع 401، ومفتاح غلط 403، والصح 200. وزرار Authorize في [[/docs]] فيه خانة [[X-API-Key]]، والمفتاح مش مكتوب في أي ملف في الـ repo.` },
        { lvl: 'متوسط', t: R`API ملاحظات لكل مستخدم`, what: R`كمّل API الملاحظات بتاع الوحدة الأولى: [[CurrentUser]] dependency (توكن من [[/auth/token]] تجريبي)، وكل مستخدم بيشوف ملاحظاته بس، والأدمن بس اللي يمسح أي ملاحظة بـ [[require_role("admin")]]. التوكنات الحقيقية والـ refresh في «JWT و refresh token».`, done: R`مستخدم بيعمل GET على ملاحظة مستخدم تاني بياخد 404 (مش 403، عشان ميعرفش إنها موجودة)، ومن غير توكن 401 ومعاه header [[WWW-Authenticate: Bearer]]، والأدمن بيمسح بـ 204، وكل ده في اختبارات بـ [[dependency_overrides]] من غير توكنات حقيقية.` },
        { lvl: 'متوسط', t: R`اختبارات من غير شبكة`, what: R`التطبيق بيكلّم API خارجي للطقس بـ dependency [[get_weather_client]]. اكتب الاختبارات كلها بـ override بيرجّع client وهمي، ومنها حالة الـ API الخارجي واقع.`, done: R`[[pytest]] بيعدّي والنت مقفول، وفيه اختبار للحالة اللي الـ client الوهمي بيرمي فيها exception والرد 503 برسالة مفهومة، و [[dependency_overrides]] بتتمسح بعد كل اختبار (اختبار تاني بيتأكد إنها فاضية).` },
        { lvl: 'كبير', t: R`API متعدد العملاء (multi-tenant)`, what: R`كل طلب فيه header [[X-Tenant-Id]]، و dependency بتتأكد إنه موجود في list العملاء وإن المستخدم الحالي تبعه. الـ routers كلها عليها الـ dependency دي، و dependency بـ [[yield]] بتفتح «جلسة» لكل طلب وتسجّل في اللوج [[commit]] أو [[rollback]] ووقت الطلب. والإعدادات من [[Settings]] في الـ lifespan.`, done: R`٢٠ اختبار على الأقل بـ [[TestClient]] و [[httpx.AsyncClient]]: tenant ناقص 400، و tenant مش بتاع المستخدم 403، و exception في نص الـ route بيطلّع [[rollback]] في اللوج، والطلب السليم [[commit]]. والاختبارات مش محتاجة [[.env]] ولا نت، وبتعدّي مرتين ورا بعض وبأي ترتيب ([[pytest -p no:randomly]] مش محتاجه).`, ext: R`بعد قسم قاعدة البيانات: الجلسة تبقى SQLAlchemy حقيقية، وكل tenant بـ [[schema]] أو عمود [[tenant_id]] بفلتر إجباري.` },
        { lvl: 'فكرة', t: R`dependency بتحل مشكلة عندك`, what: R`دوّر في مشروع عندك على حاجة بتتكرر في أول كل route (فحص، أو قراية header، أو فتح حاجة وقفلها) وحوّلها dependency. انت اللي بتختار.`, done: R`الكود اللي اتكرر اتمسح من كل الـ routes، والـ dependency ليها اختبار لوحدها، وفيه override واحد على الأقل في الاختبارات.`, ext: R`اعملها package صغيرة تستخدمها في كل مشاريع FastAPI بتاعتك.` },
      ],
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب من الذاكرة الفرق بين [[Annotated[Page, Depends(pagination)]]] و [[page: Page = Depends(pagination)]]، وإيه اللي بيحصل لو نفس الـ dependency اتطلبت مرتين في نفس الطلب.`, done: R`كتبت إن الاتنين شغالين والأولى هي الموصى بيها (النوع ظاهر والـ default حر)، وإن FastAPI بيناديها مرة واحدة في الطلب، وجربت بعداد وطلع [[{'a': 1, 'b': 1, 'd': 2}]] لما التالتة [[use_cache=False]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[GET /orders?page=0]] من غير header [[X-Tenant-Id]]. كام خطأ في الرد؟ وإيه الـ [[loc]] بتاع كل واحد؟ وهل [[tenant_id]] اتنادت؟`, done: R`جرّبت: 422 فيها خطأين، [[["query", "page"]]] و [[["header", "x-tenant-id"]]]، والدالة [[tenant_id]] نفسها **ماتنادتش** لأن الباراميتر بتاعها نفسه ناقص، و FastAPI بيجمع أخطاء كل الـ dependencies مع بعض.` },
            { lvl: 'تطبيق', t: R`**refactor:** خد ٣ routes كل واحد فيه [[page: int = 1, size: int = 20]] و [[offset = (page - 1) * size]]، وحوّلهم لـ class dependency: [[class Paging]] بـ [[__init__(self, page, size)]] و [[Annotated[Paging, Depends()]]].`, done: R`[[Depends()]] من غير argument اشتغل لأن النوع نفسه هو الـ dependency، و [[?page=3&size=10]] رجعت [[{"limit":10,"offset":20}]] في التلاتة، والسطور المتكررة اتمسحت، و [[/docs]] لسه بيعرض [[page]] و [[size]].` },
            { lvl: 'تطبيق', t: R`**ابني:** dependency [[get_locale]] بتقرا [[Accept-Language]] وترجّع [[ar]] أو [[en]] (الـ default [[en]])، و route [[/greeting]] بيرجّع «أهلًا» أو «Hello» حسبها.`, done: R`[[curl -H "Accept-Language: ar-EG,ar;q=0.9"]] بيرجّع «أهلًا»، ومن غير header «Hello»، و [[fr]] «Hello»، و [[/docs]] بيعرض الـ header كباراميتر اختياري.` },
            { lvl: 'تحدي', t: R`**اشرحها:** اكتب في ٥ سطور الترتيب اللي FastAPI بيحل بيه الشجرة بتاعة [[list_orders]]. وبعدين توقّع: [[?page=0]] و header [[X-Tenant-Id: a-b]] مع بعض، الرد 422 ولا 400؟ وهل [[tenant_id]] اتنادت؟`, done: R`جرّبت وطلع **400** [[bad tenant]] و [[tenant_id]] اتنادت، مع إن [[page]] غلط. وكتبت السبب: الـ dependency اللي باراميتراتها هي سليمة بتتنادى حتى لو باراميتر تاني في الطلب فشل، ولو رمت [[HTTPException]] ده اللي بيرجع. ومن غير الـ header خالص الرد 422 فيه الخطأين و [[tenant_id]] ماتنادتش. فمتحطش كتابة في القاعدة جوه dependency بتشتغل بدري.` },
          ],
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

---

## اتشغّل فعلًا: class كـ dependency و API key

### الـ class نفسه dependency

أي حاجة ينفع تتنادى تنفع تبقى dependency، والـ class بيتنادى (بيعمل object). فـ [[__init__]] بيبقى زي باراميترات الدالة بالظبط. اتجرب على FastAPI 0.162:

~~~python
class Paging:
    def __init__(self, page: int = 1, size: int = 20):
        self.limit, self.offset = size, (page - 1) * size
@app.get("/p")
async def p(pg: Annotated[Paging, Depends()]):
    return {"limit": pg.limit, "offset": pg.offset}
~~~

~~~text الناتج: GET /p?page=3&size=10
{'limit': 10, 'offset': 20}
~~~

[[Depends()]] من غير argument معناها «الـ dependency هي النوع نفسه»، فمش محتاج تكتب [[Paging]] مرتين.

### [[APIKeyHeader]]: مفتاح ثابت في header

للخدمات اللي بتكلّم بعض (webhook من بوابة دفع مثلًا) مفيش مستخدم بيعمل login، فيه مفتاح ثابت:

~~~python
api_key = APIKeyHeader(name="X-API-Key")
async def require_key(key: Annotated[str, Security(api_key)]):
    if key != "k-123": raise HTTPException(403, "bad key")
    return key
@app.get("/k", dependencies=[Depends(require_key)])
async def k(): return {"ok": True}
~~~

~~~text الناتج
من غير header         → 401 {"detail":"Not authenticated"}
X-API-Key: nope       → 403 {"detail":"bad key"}
X-API-Key: k-123      → 200 {"ok":true}
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[APIKeyHeader(name=...)]] | بتقرا الـ header ده، ولو مش موجود بترد 401 لوحدها، وبتضيف خانة للمفتاح في زرار Authorize في [[/docs]] |
| [[Security(api_key)]] | زي [[Depends]] بالظبط، بس بيعلّم في OpenAPI إنها حماية |
| [[key != "k-123"]] | للتجربة بس. في الحقيقة المفتاح من [[Settings]] كـ [[SecretStr]]، والمقارنة بـ [[secrets.compare_digest]] عشان متتقاسش بالوقت |

> FastAPI القديم كان بيرد **403** لما الـ header ناقص. في 0.162 اللي اتجرب، الرد 401، وده المعيار الصح («مش متعرّف عليك»).

## الخلاصة

- الـ dependency دالة عادية، و FastAPI بيقرا باراميتراتها من الطلب وبيناديها قبل الـ route.
- اعمل النوع مرة بـ [[Annotated]] وسمّيه ([[PageDep]])، والـ routes تكتب اسمه بس.
- [[Depends(fn)]] من غير قوسين بعد [[fn]].
- الأخطاء من الـ dependency بتوقف الطلب، والقيود والتوثيق بيتنقلوا للـ route لوحدهم.`,
          lines: [
            R`[[Annotated]] بيلزق [[Depends(...)]] جنب النوع، فالنوع الحقيقي يفضل ظاهر للمحرر و mypy، والـ dependency معلومة زيادة لـ FastAPI.`,
            R`[[Depends]] بيقول «القيمة دي نتيجة دالة»، و [[Header]] لقراية header، و [[HTTPException]] عشان الـ dependency توقف الطلب، و [[Query]] لقيود الـ query جوه الـ dependency.`,
            R`[[BaseModel]] عشان نتيجة الـ pagination تبقى object بحقول ليها أسماء ([[page.limit]]) بدل tuple.`,
            R`التطبيق. الـ dependencies مش بتتسجّل عليه، بتتكتب في الـ routes اللي محتاجاها.`,
            R`شكل نتيجة الـ pagination: اللي القاعدة محتاجاه فعلًا، مش اللي العميل بعته.`,
            R`[[limit]] كام صف في الصفحة: هيبقى [[LIMIT]] في SQL.`,
            R`[[offset]] كام صف نعدّي: هيبقى [[OFFSET]] في SQL، والحساب بتاعه جوه الـ dependency مش في كل route.`,
            R`الـ dependency نفسها دالة عادية. باراميتراتها بتتقري من الطلب زي أي route، فـ [[page]] و [[size]] query بقيودهم، وبيظهروا في [[/docs]] تحت كل route بيستخدمها.`,
            R`بتحوّل رقم الصفحة لـ offset: الصفحة ٣ بحجم ١٠ يبقى [[offset=20]]. الحساب في مكان واحد، فلو اتغيّر بيتغيّر لكل الـ routes.`,
            R`[[PageDep]] نوع جاهز: [[Page]] ومعاه طريقة جيبه. أي route يكتب [[page: PageDep]] وخلاص، ومفيش تكرار لـ [[Depends(pagination)]].`,
            R`dependency تانية بتقرا header: [[x_tenant_id]] مع [[Header()]] بيتقري من [[X-Tenant-Id]] (الـ [[_]] بتبقى [[-]]). ومن غير default يبقى إجباري، فغيابه 422.`,
            R`فحص زيادة على القيمة: حروف وأرقام بس. [[isalnum()]] بترجّع [[False]] لو فيه شرطة أو مسافة.`,
            R`[[HTTPException]] جوه dependency بيوقف الطلب كله برد 400، والـ route **مبيشتغلش**. ده اللي بيخلي الـ dependency تنفع للفحص والصلاحيات.`,
            R`لو الفحص عدّى بترجّع القيمة، وهي اللي هتوصل للـ route في الباراميتر.`,
            R`نوع جاهز تاني للـ tenant، نفس فكرة [[PageDep]].`,
            R`route الطلبات على [[/orders]].`,
            R`باراميترين، كل واحد جاي من dependency. FastAPI بيناديهم قبل الدالة، ولو أي واحد رمى exception الدالة مبتتناداش.`,
            R`بيستخدم القيم الجاهزة: [[tenant]] نص اتفحص، و [[page.limit]] و [[page.offset]] اتحسبوا.`,
            R`route تاني على [[/products]] بنفس الـ pagination من غير ما يكتب ولا قيد.`,
            R`سطر واحد بيجيب الـ pagination كاملة بقيودها، وده كل فايدة الـ dependency: تتكتب مرة وتتستخدم في كل مكان.`,
            R`بيرجّع الـ limit والـ offset، و [[?page=3&size=10]] بترجع [[{"limit":10,"offset":20}]].`,
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب لكل حاجة تتحط فين (lifespan ولا dependency بـ yield): pool القاعدة، و transaction، و [[httpx.AsyncClient]] واحد للتطبيق، وتحميل موديل ML تقيل، و lock على ملف لطلب واحد.`, done: R`الـ pool والـ client والموديل في الـ lifespan (مرة واحدة)، والـ transaction والـ lock في dependency بـ yield (لكل طلب)، وكتبت جنب كل واحد السبب في سطر.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** dependency بتضيف لـ list: [[open]] قبل [[yield]]، و [[commit]] بعده، و [[rollback]] في [[except]]، و [[close]] في [[finally]]. طلب سليم وبعده طلب بيرمي [[HTTPException(409)]] من الـ route. إيه الـ list؟`, done: R`كتبت توقّعك وبعدين شغّلت: [[['open', 'commit', 'close', 'open', 'rollback:HTTPException', 'close']]]، يعني الـ exception بتاع الـ route وصل للـ dependency، وحتى الـ HTTPException بتعمل rollback.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** dependency فيها [[except Exception: log.error("x")]] من غير [[raise]] بعد [[yield]]. اعمل route بيرمي [[HTTPException(404)]] وشوف الرد بقى إيه، وصلّحه.`, done: R`من غير [[raise]] الـ exception اتبلع والرد بقى 500 [[Internal Server Error]] بدل 404 (اتجرب على 0.162)، وبعد [[raise]] رجع 404 والـ rollback لسه بيحصل.` },
            { lvl: 'تطبيق', t: R`**ابني:** lifespan بيعمل [[httpx.AsyncClient(timeout=5)]] واحد ويحطه في [[app.state.http]]، و dependency بترجّعه، و route [[/rates]] بيستخدمه. وفي الـ shutdown [[await client.aclose()]].`, done: R`مع [[with TestClient(app)]] الـ route بيشتغل، ومن غير [[with]] بيقع بـ [[AttributeError]] على [[app.state.http]]، والـ client اتعمل مرة واحدة بس (اطبعت [[id(client)]] في طلبين وطلع نفس الرقم).` },
            { lvl: 'تحدي', t: R`**قيس:** route بيعمل [[asyncpg.connect()]] جديد مع كل طلب مقابل route بياخد من الـ pool. ابعت ٢٠٠ طلب لكل واحد بـ [[httpx.AsyncClient]] و [[asyncio.gather]] وقيس الوقت الكلي، على Postgres في Docker.`, done: R`عندك رقمين حقيقيين (ثواني) مكتوبين، والـ pool أسرع بفرق واضح، وكتبت السبب: كل اتصال جديد فيه TCP و TLS (لو موجود) و authentication، والـ pool بيعملهم مرة. واتأكدت إن مفيش [[too many connections]] في الحالتين.` },
          ],
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

---

## اتشغّل فعلًا: الـ exception بيوصل للـ dependency

السؤال اللي بيلخبط: لو الـ route رمى exception، اللي بعد [[yield]] بيشوفه؟ جربنا بـ dependency بتسجّل كل خطوة، و [[httpx.AsyncClient]] (FastAPI 0.162):

~~~python
log = []
async def get_db():
    log.append("open")
    try:
        yield "db"
        log.append("commit")
    except Exception as e:
        log.append(f"rollback:{type(e).__name__}")
        raise
    finally:
        log.append("close")
@app.post("/ok")
async def ok(db: Annotated[str, Depends(get_db)]): return {"db": db}
@app.post("/boom")
async def boom(db: Annotated[str, Depends(get_db)]): raise HTTPException(409, "conflict")
~~~

~~~text الناتج: POST /ok ثم POST /boom
['open', 'commit', 'close', 'open', 'rollback:HTTPException', 'close']
~~~

| الخطوة | معناها |
|---|---|
| [[open]] ثم [[commit]] ثم [[close]] | الطلب السليم: الكود بعد [[yield]] كمّل عادي |
| [[rollback:HTTPException]] | الـ exception بتاع الـ route اترمى **عند الـ [[yield]]** جوه الـ dependency، فالـ [[except]] مسكه |
| [[raise]] في الـ [[except]] | لازم ترميه تاني. لو بلعته، FastAPI مش هيعرف يرد 409 |
| [[close]] في [[finally]] | بيحصل في الحالتين، وده مكان رجوع الاتصال للـ pool |

يعني حتى [[HTTPException]] (اللي هي رد عادي مش crash) بتعمل rollback. لو عايز رد 4xx ومعاه commit، اعمل commit بنفسك قبل ما ترمي.

## الخلاصة

- الموارد المشتركة (pool، client) في الـ lifespan، والموارد اللي لكل طلب في dependency بـ [[yield]].
- اللي بعد الـ [[yield]] بيشتغل دايمًا، والـ exception بيوصله فيعمل rollback.
- الـ transaction في dependency خليها [[scope="function"]] عشان العميل ميخدش 200 قبل الـ commit.
- الـ ids مش متتالية بعد rollback، ومتعتمدش عليها.`,
          lines: [
            R`[[AsyncIterator]] نوع الرجوع لأي دالة [[async]] فيها [[yield]]، عشان المحرر و mypy يفهموا إنها generator مش دالة بترجع قيمة.`,
            R`[[asynccontextmanager]] بيحوّل generator فيه [[yield]] واحد لـ context manager: اللي قبل [[yield]] «افتح»، واللي بعده «اقفل». ده الشكل اللي FastAPI عايزه للـ lifespan.`,
            R`[[Annotated]] عشان نعمل النوع [[Conn]] تحت ونكتبه مرة.`,
            R`[[asyncpg]] درايفر Postgres الـ async (درس «asyncpg» في قسم قاعدة البيانات). أي حاجة ليها فتح وقفل بتنفع هنا: Redis و httpx كمان.`,
            R`[[Request]] عشان الـ dependency توصل لـ [[request.app.state]] اللي الـ lifespan حط فيه الـ pool.`,
            R`بيحوّل [[lifespan]] اللي تحته لـ async context manager، و FastAPI هيدخله وهو بيقوم ويخرج منه وهو بيقفل.`,
            R`الـ lifespan بياخد التطبيق نفسه، وبيتنادى **مرة واحدة** في عمر الـ process، مش مع كل طلب.`,
            R`بيعمل pool اتصالات وقت ما التطبيق يقوم ويحطه في [[app.state]]. لو القاعدة واقعة، التطبيق يقع وهو بيقوم بدل أول طلب. والـ URL في الحقيقة من [[Settings]] مش مكتوب في الكود.`,
            R`[[yield]] هنا التطبيق شغال وبيستقبل طلبات. كل اللي قبله startup وكل اللي بعده shutdown.`,
            R`بعد Ctrl+C أو [[SIGTERM]] من Docker: بيقفل كل الاتصالات بأدب، فالقاعدة متفضلش شايلة اتصالات ميتة.`,
            R`بيربط الـ lifespan بالتطبيق. من غير [[lifespan=]] الدالة اللي فوق عمرها ما هتتنادى، و [[app.state.pool]] مش هيبقى موجود.`,
            R`dependency لكل طلب: generator فيه [[yield]]، فـ FastAPI هيشغّل اللي قبل [[yield]] قبل الـ route، واللي بعده بعد الـ route.`,
            R`بياخد اتصال من الـ pool، و [[async with]] بيرجّعه للـ pool لوحده حتى لو حصل exception. من غير [[async with]] أي exception بيضيّع اتصال من الـ pool.`,
            R`بيفتح transaction: لو البلوك خلص عادي [[COMMIT]]، ولو exception عدّى منه [[ROLLBACK]]. والـ exception اللي بيترمي في الـ route بيوصل هنا فعلًا (اتجرب تحت).`,
            R`بيدّي الاتصال للـ route. الـ route بيشتغل وهو هنا متوقف، وبعد ما يخلص الكود بيكمّل من بعد [[yield]] (يقفل الـ transaction ويرجّع الاتصال).`,
            R`[[scope="function"]] (FastAPI 0.121+) بيخلي اللي بعد [[yield]] يحصل **قبل** ما الرد يتبعت، فالعميل مياخدش 200 والـ COMMIT لسه موقعش. الـ default بيقفل بعد الرد.`,
            R`route بيعمل طلب جديد بـ POST.`,
            R`بياخد الاتصال جاهز، والـ route ميعرفش حاجة عن الـ pool ولا الـ transaction. في الاختبار ممكن يتبدّل بـ override.`,
            R`[[INSERT ... RETURNING id]] بيعمل الطلب ويرجّع الـ id في رحلة واحدة للقاعدة، و [[fetchval]] بياخد أول قيمة من أول صف.`,
            R`INSERT تاني في **نفس** الـ transaction بـ [[$1]] (باراميتر، مش f-string). لو ده وقع، الطلب الأول بيترجع كمان، فمفيش طلب من غير event.`,
            R`بيرجّع الـ id. لو [[scope="function"]]، الـ COMMIT حصل قبل ما الـ JSON ده يوصل للعميل.`,
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب الكود والـ header لكل حالة من غير ما تبص: من غير [[Authorization]]، وتوكن توقيعه غلط، وتوكن منتهي، ومستخدم [[role=user]] على [[DELETE /users/5]].`, done: R`الأربعة: 401 (من [[oauth2]] و [[Not authenticated]])، و 401 [[invalid token]]، و 401 [[invalid token]]، و 403 [[forbidden]]، والتلاتة الأولانيين معاهم [[WWW-Authenticate: Bearer]]. وطابقوا اللي في «نجرّب كل الحالات».` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** خد توكن سليم وغيّر حرف واحد في الجزء التاني (الـ payload) بإيدك. هيرجع إيه [[/me]]؟ وبعدين فك الـ payload بـ [[base64]] من غير السر: تقدر تقراه؟`, done: R`الطلب رجع 401 لأن التوقيع مبقاش مطابق، وفك الـ base64 طلّع [[{"sub":"1","role":"admin"}]] من غير أي سر، فكتبت إن الـ JWT متوقّع مش متشفّر ومتحطش فيه أسرار.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[jwt.decode(token, SECRET)]] من غير [[algorithms]]، و [[except Exception: return None]]. شغّله وشوف اللي بيحصل في PyJWT 2، وصلّح الاتنين.`, done: R`من غير [[algorithms]] PyJWT 2 بيرمي [[DecodeError]] بـ [[It is required that you pass in a value for the "algorithms" argument]]، و [[return None]] كان هيخلي المستخدم [[None]] يوصل للـ route. بعد التصليح: [[algorithms=["HS256"]]] و [[raise HTTPException(401)]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[require_any_role(*roles)]] factory بتقبل أكتر من دور، و route [[/reports]] لـ [[admin]] و [[accountant]] بس، و [[/me/orders]] لأي مستخدم.`, done: R`محاسب بياخد 200 على [[/reports]]، و [[user]] بياخد 403، ومن غير توكن 401، والتلاتة في اختبارات بـ [[dependency_overrides[current_user]]] من غير ما تعمل توكن خالص.` },
            { lvl: 'تحدي', t: R`**اشرحها:** زميلك عايز يحط الدور في التوكن ويثق فيه من غير ما يرجع للقاعدة. اكتب ٥ سطور: إيه اللي بيحصل لما الأدمن يتشال من الأدمنية والتوكن لسه صالح ساعة؟ وإيه الحلول؟`, done: R`الشرح فيه إن التوكن بيفضل admin لحد [[exp]]، والحلول: توكن قصير (١٥ دقيقة) مع refresh، أو قراية الدور من القاعدة أو cache في [[current_user]]، أو نسخة للتوكنات في القاعدة بتتزوّد لما الصلاحيات تتغيّر. ومكتوب إن التفاصيل في «JWT و refresh token».` },
          ],
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
| [[eyJhbGciOi...]] | الـ header بـ base64، فيه نوع التوقيع: [[{"alg":"HS256","typ":"JWT"}]] |
| [[eyJzdWIiOi...]] | الـ payload بـ base64، ودي الداتا اللي أي حد يقدر يقراها: [[{"sub":"1","role":"admin"}]] |
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

---

## اتشغّل فعلًا: الدرس ده بيفحص، مش بيعمل توكنات

الدرس ده عن **الـ dependency** اللي بتفحص التوكن وتطلّع المستخدم. الحاجات اللي حواليها ليها دروس لوحدها في وحدة الأمان، فمتكررهاش هنا:

| محتاج | فين |
|---|---|
| تعمل [[/auth/token]] نفسه، وتوكن قصير ومعاه refresh token، وتلغي توكن | «JWT و refresh token» |
| تخزّن الباسورد ([[argon2]] و [[bcrypt]]) وتقارنه | «تشفير الباسورد» |
| مفتاح ثابت بين خدمتين بدل مستخدم | [[APIKeyHeader]] في درس «Depends و Annotated» |
| تبدّل [[current_user]] في الاختبار | درس «dependency_overrides» |

واتجربت كل حالات الفحص بـ PyJWT 2 على FastAPI 0.162 (الجدول في «نجرّب كل الحالات» فوق).

## الخلاصة

- الـ JWT مقروء لأي حد، ومحمي من التعديل بس. السر هو كل الأمان، فخليه طويل وفي الإعدادات.
- اعمل الـ auth طبقات: توكن ← مستخدم ← صلاحية، وكل route ياخد اللي محتاجه.
- 401 مع [[WWW-Authenticate]] لما مش عارف المستخدم، و 403 لما عارفه ومش مسموحله.`,
          lines: [
            R`[[Annotated]] عشان نعمل النوع [[CurrentUser]] اللي كل الـ routes هتكتبه.`,
            R`[[jwt]] هي مكتبة PyJWT ([[pip install pyjwt]])، مش مكتبة [[jwt]] تانية بنفس الاسم. بنستخدم منها [[decode]] بس، وعمل التوكنات والـ refresh في «JWT و refresh token».`,
            R`[[Depends]] للشجرة، و [[HTTPException]] للـ 401 و 403، و [[status]] عشان نكتب [[HTTP_401_UNAUTHORIZED]] بدل الرقم.`,
            R`[[OAuth2PasswordBearer]] dependency جاهزة بتقرا [[Authorization: Bearer <token>]] وترجّع التوكن نص. لو الـ header ناقص بترد 401 لوحدها.`,
            R`[[BaseModel]] لموديل [[User]] اللي هيوصل للـ routes.`,
            R`للتجربة بس: السر هنا مكتوب ٩ bytes، و PyJWT بيحذّر إن HS256 محتاج ٣٢ على الأقل. في الحقيقة من [[Settings]] كـ [[SecretStr]] ومولّد بـ [[secrets.token_urlsafe(32)]].`,
            R`[[tokenUrl]] مسار الـ login اللي بيدّي التوكن، وبيستخدمه زرار Authorize في [[/docs]] عشان تعمل login من الصفحة. الـ object ده نفسه dependency.`,
            R`التطبيق. الـ dependencies اللي تحت مش متسجّلة عليه، كل route بيطلب اللي محتاجه.`,
            R`موديل المستخدم اللي الـ routes هتستلمه: [[id]] و [[role]] بس، مش كل اللي في القاعدة.`,
            R`[[id]] رقم المستخدم، جاي من [[sub]] في التوكن بعد ما يتحوّل [[int]].`,
            R`[[role]] الدور ([[user]] أو [[admin]]). [[require_role]] تحت بتقارن بيه.`,
            R`dependency فوق dependency: [[current_user]] محتاجة التوكن، فـ FastAPI بينادي [[oauth2]] الأول. لو التوكن ناقص الـ 401 بتطلع من [[oauth2]] قبل ما الدالة دي تشتغل.`,
            R`بنحاول نفك التوكن جوه [[try]]، عشان أي غلط فيه يبقى 401 مش 500.`,
            R`[[decode]] بيتأكد من التوقيع بالسر، ومن [[exp]] لو موجود. و [[algorithms=["HS256"]]] **لازم** تتكتب: من غيرها حد ممكن يبعت توكن بـ [[alg: none]].`,
            R`[[InvalidTokenError]] الأب لكل أخطاء التوكن: توقيع غلط، ومنتهي ([[ExpiredSignatureError]])، وشكل بايظ. exception واحد بيمسكهم كلهم.`,
            R`401 ومعاه header [[WWW-Authenticate: Bearer]] اللي معيار HTTP بيطلبه مع 401، عشان العميل يعرف نوع الـ auth المطلوب.`,
            R`بيبني المستخدم من الـ payload، و [[get("role", "user")]] لو الدور مش موجود. في مشروع حقيقي بتجيبه من القاعدة عشان المستخدم المحظور يتمنع حتى لو توكنه لسه صالح.`,
            R`النوع اللي كل الـ routes بتكتبه: [[user: CurrentUser]]، ومن غير ما حد يكتب [[Depends(current_user)]] تاني.`,
            R`factory: دالة بتاخد الدور وترجّع dependency جديدة. ده الطريقة اللي بتدّي بيها باراميتر لـ dependency من غير ما ييجي من الطلب.`,
            R`الـ dependency الحقيقية جوه، ومعتمدة على [[CurrentUser]]. فالترتيب: التوكن، وبعدين المستخدم، وبعدين الدور.`,
            R`بيقارن دور المستخدم بالدور المطلوب اللي اتحفظ في الـ closure من [[require_role("admin")]].`,
            R`403 مش 401: احنا عارفين هو مين، بس مش مسموحله. 401 يعني «سجّل دخول»، و 403 يعني «سجّلت، بس لأ».`,
            R`بترجّع المستخدم، عشان لو route حب يستخدم [[Depends(require_role("admin"))]] كباراميتر ياخد المستخدم كمان.`,
            R`الـ factory بترجّع الدالة نفسها (من غير ما تناديها)، و FastAPI هو اللي هيناديها مع كل طلب.`,
            R`route لأي مستخدم مسجّل على [[/me]].`,
            R`[[user: CurrentUser]]: من غير توكن الرد 401 قبل ما الدالة تشتغل. والدالة متأكدة إن [[user]] موجود دايمًا.`,
            R`بيرجّع المستخدم نفسه، و FastAPI بيحوّله JSON [[{"id":1,"role":"admin"}]].`,
            R`[[dependencies=[...]]] في الـ decorator: الفحص بيشتغل وقيمته مبتتبعتش للدالة. مناسب لأن [[delete_user]] مش محتاجة تعرف مين الأدمن.`,
            R`الدالة بتاخد [[user_id]] من المسار بس، والصلاحية اتفحصت قبلها.`,
            R`بيرجّع الـ id اللي «اتمسح». في الحقيقة 204 من غير body (درس «HTTPException»).`,
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب ٣ أسباب الاختبار يعدّي لوحده ويقع مع الباقي، ليها علاقة بالدرس ده.`, done: R`كتبت: نسيان [[dependency_overrides.clear()]]، و [[lru_cache]] على [[get_settings]] شايل إعدادات اختبار قبله، و داتا متخزنة في dict في الذاكرة من اختبار قبله. وجربت الأول: اختبار من غير override بقى ياخد 200 بدل 401 لما شلت [[clear()]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[app.dependency_overrides[Depends(current_user)] = fake]]. الاختبار هيعدّي؟ وإيه الكود اللي هيرجع من [[/me]]؟`, done: R`جرّبت: الـ override مااشتغلش و [[/me]] رجعت 401، لأن المفتاح لازم الدالة [[current_user]] نفسها مش [[Depends(...)]]. وصلّحتها وبقت 200.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار async:** نفس الاختبارات بـ [[httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test")]] و [[@pytest.mark.anyio]]، ومعاها override لـ [[get_settings]] بـ [[Settings(env="test", feature_x=True)]].`, done: R`[[pytest -q]] بيطبع [[passed]] للاختبارات الـ async، و [[/flag]] رجعت [[{"env": "test", "x": True}]] من غير ما تلمس البيئة، و fixture [[anyio_backend]] بترجّع [["asyncio"]].` },
            { lvl: 'تطبيق', t: R`**ابني:** fixture اسمها [[as_user(role)]] (factory fixture) بترجّع client بيتعامل كمستخدم بالدور ده، واستخدمها في ٣ اختبارات: [[admin]] و [[user]] ومن غير override.`, done: R`الاختبارات التلاتة بيعدّوا: الأدمن بيمسح بـ 200، والـ user بياخد 403، ومن غير override 401، وبعد كل واحد [[app.dependency_overrides == {}]] (اختبار رابع بيتأكد).` },
            { lvl: 'تحدي', t: R`**صلّح الكود البايظ:** اختبار بيعمل [[c = TestClient(app)]] (من غير [[with]]) و lifespan بيعمل [[app.state.pool]]، والـ route بيستخدمه. شغّله واقرا الخطأ، وصلّحه، واكتب ليه الـ override لوحده مش كفاية.`, done: R`الخطأ [[AttributeError: 'State' object has no attribute 'pool']]، والتصليح [[with TestClient(app) as c]]، أو override للـ dependency اللي بتجيب الـ pool نفسها فالاختبار ميحتاجش الـ pool خالص. وكتبت إن الـ override بيبدّل الـ dependency بس، والـ lifespan حاجة تانية.` },
          ],
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
| [[r.status_code]] و [[r.json()]] | افحص كود الرد والـ body بعد ما يتحوّل dict، وقارنهم بـ [[assert]] |

---

## اتشغّل فعلًا: اختبار async و override للإعدادات

لو الاختبار نفسه محتاج [[await]] (يكلّم القاعدة قبل الطلب مثلًا)، [[TestClient]] مش مناسب لأنه sync. [[httpx.AsyncClient]] بيكلّم التطبيق في الذاكرة بـ [[ASGITransport]]. اتجرب على FastAPI 0.162 و httpx 0.28 و pytest 9.2 (الـ plugin بتاع [[anyio]] جاي مع Starlette):

~~~python
import httpx, pytest
from app2 import Settings, app, get_settings
@pytest.fixture
def settings_override():
    app.dependency_overrides[get_settings] = lambda: Settings(env="test", feature_x=True)
    yield
    app.dependency_overrides.clear()
@pytest.fixture
def anyio_backend(): return "asyncio"
@pytest.mark.anyio
async def test_flag(settings_override):
    transport = httpx.ASGITransport(app=app)
    async with httpx.AsyncClient(transport=transport, base_url="http://test") as c:
        r = await c.get("/flag")
    assert r.json() == {"env": "test", "x": True}
~~~

~~~text الناتج
..                                                                       [100%]
2 passed in 0.49s
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[ASGITransport(app=app)]] | بدل الشبكة: الطلب بيروح للـ object [[app]] مباشرة |
| [[base_url="http://test"]] | لازم URL كامل، بس مش مهم إيه هو لأنه مش بيخرج برّه |
| [[@pytest.mark.anyio]] | بيخلي pytest يشغّل الاختبار الـ async في event loop |
| [[anyio_backend]] | بيختار [[asyncio]] بدل trio |
| override لـ [[get_settings]] | الإعدادات بقت [[test]] من غير ما الاختبار يلمس البيئة ولا [[.env]] ولا [[lru_cache]] |

> [[ASGITransport]] مش بيشغّل الـ lifespan. لو التطبيق محتاجه في الاختبار async، شغّل [[TestClient]] بـ [[with]]، أو مكتبة [[asgi-lifespan]] (من الـ docs، ماتجربتش هنا).

## الخلاصة

- المفتاح في [[dependency_overrides]] لازم يبقى نفس الـ object اللي الـ routes بتستخدمه.
- [[with]] = الـ lifespan بيشتغل. من غيرها مفيش pool ولا clients.
- امسح الـ overrides بعد كل اختبار، والأحسن جوه الـ fixture نفسه بعد الـ [[yield]].`,
          lines: [
            R`[[pytest]] بيلاقي الاختبارات ويشغّلها، ومنه [[@pytest.fixture]] (التفاصيل في تاب Python).`,
            R`[[TestClient]] بيكلّم التطبيق في نفس الـ process من غير سيرفر ولا port، وبيرجّع ردود شبه [[requests]].`,
            R`بنعمل import للتطبيق الحقيقي نفسه، مش نسخة، فالاختبار بيمشي على نفس الـ routes والـ middleware.`,
            R`[[current_user]] نفسها هي **المفتاح** في الـ dict. لازم نفس الـ object بالظبط: دالة بنفس الاسم من ملف تاني مش هتنفع.`,
            R`fixture: دالة pytest بيناديها قبل أي اختبار طالبها بالاسم، وبيدّيله اللي بترجّعه (أو بتعمله [[yield]]).`,
            R`الـ fixture اسمه [[client]]، فأي اختبار فيه باراميتر [[client]] هياخده.`,
            R`أي مكان في الشجرة محتاج [[current_user]] (route أو dependency زي [[require_role]]) هياخد المستخدم ده بدلها، من غير توكن ولا JWT.`,
            R`[[with]] بيشغّل الـ lifespan (startup قبل الاختبار و shutdown بعده)، وبيخلي كل الطلبات في event loop واحد. من غيره [[app.state]] فاضي، والاتصالات الـ async ممكن تقع بـ [[Event loop is closed]] (اتجرب في قسم قاعدة البيانات).`,
            R`بيدّي الـ client للاختبار. الكود اللي بعد [[yield]] بيشتغل بعد الاختبار، حتى لو الاختبار وقع.`,
            R`بيشيل كل الـ overrides. من غيره الـ override بيفضل في الاختبارات اللي بعده، فاختبار بيعدّي لوحده ويقع مع الباقي.`,
            R`اختبار: اسمه بيبدأ بـ [[test_]] فـ pytest بيلاقيه، وباراميتره [[client]] فبياخد الـ fixture.`,
            R`طلب GET على [[/me]] من غير أي header. لولا الـ override كان رجع 401.`,
            R`بيتأكد من الكود. لو وقع، pytest بيطبع القيمتين: اللي جه (401 مثلًا) واللي كنا مستنيينه.`,
            R`بيقارن الـ JSON كله مرة واحدة، فلو حقل زيادة ظهر (زي باسورد) الاختبار يقع.`,
            R`اختبار تاني للفحص التلقائي، بنفس الـ fixture.`,
            R`[[abc]] مش رقم، فـ FastAPI لازم يرد 422 من غير ما الدالة تشتغل.`,
            R`بيتأكد إنها 422 مش 500 ولا 404.`,
            R`بيتأكد من المكان بالظبط: [[["path", "item_id"]]]. ده بيمسك لو حد غيّر اسم الباراميتر أو خلّاه query بالغلط.`,
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
    }
]);

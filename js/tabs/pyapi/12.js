// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "أول API",
      l: 2,
      n: "fastapi dev، و path و query و body، والرد بنوعه، وتقسيم الـ routes على ملفات",
      items: [
        {
          cmd: "fastapi dev",
          title: "أول API بـ FastAPI وتشغّله",
          desc: R`[[pip install "fastapi[standard]"]] بيسطّب FastAPI ومعاه uvicorn و CLI اسمه [[fastapi]]. و [[fastapi dev main.py]] بيشغّل مع reload للتطوير على 127.0.0.1، و [[fastapi run]] للإنتاج على 0.0.0.0 من غير reload. وأول ما يشتغل، [[/docs]] فيها Swagger UI تجرّب منها كل endpoint.

والأحسن تكتب مكان التطبيق مرة في [[pyproject.toml]] تحت [[[tool.fastapi]]]: [[entrypoint = "app.main:app"]]، فـ [[fastapi dev]] يشتغل من غير مسار. و uvicorn نفسه وخياراته في الإنتاج ورا nginx في تاب Python.`,
          example: R`from fastapi import FastAPI
app = FastAPI(title="Shop API", version="1.0.0")
@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "أهلًا"}
@app.get("/health", tags=["ops"])
async def health() -> dict[str, bool]:
    return {"ok": True}
# في الترمنال:
# fastapi dev main.py              ← http://127.0.0.1:8000/docs
# fastapi run main.py --workers 2`,
          try: R`اكتب الملف ده في [[main.py]]، وشغّله بـ [[fastapi dev main.py]]، وافتح [[http://127.0.0.1:8000/docs]] وجرّب الـ endpoints من هناك. وبعدين افتح [[/openapi.json]] وشوف الوصف اللي اتولّد من الكود. وغيّر الرسالة واحفظ وشوف الـ reload.`,
          flag: "script",
          deep: {
            why: "FastAPI بيبني على الأنواع: من نفس الكود بيطلع الفحص والتحويل والتوثيق. مفيش ملف swagger تكتبه بإيدك ويبعد عن الكود مع الوقت، ومفيش validation تكتبها يدوي لكل حقل.",
            how: R`FastAPI مبني على Starlette (الـ web: routing و requests و middleware) و Pydantic (الفحص والـ JSON). وهو تطبيق ASGI، يعني محتاج سيرفر ASGI يشغّله: uvicorn.

[[@app.get("/health")]] بيسجّل الدالة كـ handler لـ GET على المسار ده. والدالة بترجع dict أو list أو Pydantic model، و FastAPI بيحوّلها JSON. ونوع الرجوع ([[-> dict[str, bool]]]) بيستخدمه للتوثيق ولفحص وتحويل الرد (درس response model).

[[fastapi dev]] جواه [[uvicorn --reload]] على 127.0.0.1. و [[fastapi run]] بيشغّل uvicorn على 0.0.0.0:8000 من غير reload، و [[--workers N]] لأكتر من process. والاتنين بيدوّروا على التطبيق في [[main.py]] أو [[app/main.py]] وأماكن مشهورة زيهم لو مدتلوش مسار، أو في [[entrypoint]] من pyproject.

[[/docs]] (Swagger UI) و [[/redoc]] و [[/openapi.json]] بيتولدوا لوحدهم. وفي الإنتاج ممكن تقفلهم: [[FastAPI(docs_url=None, redoc_url=None, openapi_url=None)]].

و [[fastapi[standard]]] بيجيب uvicorn و httpx (للـ TestClient) و python-multipart (للـ forms) و email-validator و pydantic-settings وغيرهم. من غير [[[standard]]] بتاخد FastAPI لوحده.`,
            when: R`أي API جديد بـ Python. [[fastapi dev]] على جهازك، و [[fastapi run]] أو uvicorn مباشرة في Docker (تاب Python فيه الـ Dockerfile والإعدادات ورا nginx).`,
            mistakes: R`[[fastapi dev]] في الإنتاج (reload، وعلى 127.0.0.1 فمن برّه الـ container مش هيوصل). وملف اسمه [[fastapi.py]] في المشروع. و [[pip install fastapi]] من غير [[[standard]]] وتستغرب إن أمر [[fastapi]] بيطلعلك رسالة «please install fastapi[standard]» بدل ما يشغّل. وتسيب [[/docs]] مفتوحة في الإنتاج لـ API داخلي.`
          },
          teach: R`## المثال بيعمل إيه؟

أصغر API حقيقي: تطبيق فيه endpoint على [[/]] بيرجّع رسالة، و endpoint على [[/health]] بيقول «أنا شغال». وبعدين بنشغّله بأمر [[fastapi]]. اتجرب بـ FastAPI 0.142 (من [[pip install "fastapi[standard]"]]) و Python 3.14 على ويندوز، والطلبات بـ [[curl]] من Git Bash.

---

## ١. [[from fastapi import FastAPI]]

بنجيب الكلاس [[FastAPI]] من المكتبة. منه بنعمل التطبيق.

## ٢. [[app = FastAPI(title="Shop API", version="1.0.0")]]

- [[app]] الـ object اللي هيستقبل كل الطلبات. الاسم [[app]] مهم: أمر [[fastapi]] بيدوّر على متغير بالاسم ده.
- [[title]] و [[version]] مش بيأثروا على الشغل، بيظهروا في صفحة التوثيق [[/docs]] وفي [[/openapi.json]].

---

## ٣. أول endpoint

~~~python
@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "أهلًا"}
~~~

| الحتة | معناها |
|---|---|
| [[@]] | decorator: بيلف الدالة اللي تحته ويسجّلها في مكان |
| [[app.get("/")]] | «لو جالك طلب **GET** على المسار [[/]]، نادي الدالة دي». وفيه [[app.post]] و [[app.put]] و [[app.patch]] و [[app.delete]] لباقي الـ methods |
| [[async def root()]] | الـ handler. اسمه مش مهم للـ URL، بس بيظهر في التوثيق |
| [[-> dict[str, str]]] | نوع الرجوع: dict مفاتيحه وقيمه strings. FastAPI بيستخدمه للتوثيق ولفحص الرد |
| [[return {...}]] | FastAPI بيحوّل الـ dict لـ JSON ويبعته بـ [[content-type: application/json]] |

## ٤. التاني بـ [[tags]]

~~~python
@app.get("/health", tags=["ops"])
async def health() -> dict[str, bool]:
    return {"ok": True}
~~~

[[tags=["ops"]]] بيحط الـ endpoint ده في مجموعة اسمها ops في [[/docs]]. و [[True]] بتاعة Python بتطلع [[true]] في JSON.

---

## ٥. التشغيل: [[fastapi dev main.py]]

احفظ الكود في [[main.py]] وفي نفس الفولدر:

~~~bash
fastapi dev main.py
~~~

~~~text الناتج (أهم السطور)
 ⚡️ Starting FastAPI in development mode
 🐍 Using import string: main:app
 🌐 Server started at http://127.0.0.1:8000
    Documentation at http://127.0.0.1:8000/docs
INFO:     Will watch for changes in these directories: [...]
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process [27640] using WatchFiles
INFO:     Started server process [8072]
INFO:     Application startup complete.
~~~

| السطر | معناه |
|---|---|
| [[main:app]] | «import string»: الملف [[main]] (من غير .py) وجواه المتغير [[app]] |
| [[127.0.0.1:8000]] | العنوان: جهازك بس (localhost)، والـ port الافتراضي 8000 |
| [[Uvicorn running]] | السيرفر الحقيقي اسمه **uvicorn**؛ أمر [[fastapi]] بيشغّله لك |
| [[reloader process]] و [[WatchFiles]] | process بتراقب ملفاتك، وأول ما تحفظ بتعيد تشغيل السيرفر |
| [[server process]] | الـ process اللي بترد على الطلبات فعلًا |

ولما غيّرنا الرسالة وحفظنا:

~~~text الناتج
WARNING:  WatchFiles detected changes in 'main.py'. Reloading...
~~~

وبعدها على طول [[curl]] رجّع الرسالة الجديدة من غير ما نعيد التشغيل. و Ctrl+C بيقفل السيرفر.

---

## ٦. نكلّمه

~~~bash
curl -i localhost:8000/
curl localhost:8000/health
~~~

[[-i]] بيطبع الـ headers قبل الـ body:

~~~text الناتج
HTTP/1.1 200 OK
server: uvicorn
content-length: 24
content-type: application/json

{"message":"أهلًا"}
{"ok":true}
~~~

[[content-length: 24]] عدد الـ bytes مش الحروف: كل حرف عربي ٢ byte في UTF-8. ولو طلبت حاجة مش موجودة أو method غلط، FastAPI بيرد لوحده:

~~~text الناتج
GET /nothing    → 404 {"detail":"Not Found"}
POST /health    → 405 {"detail":"Method Not Allowed"}   (ومعاه header: allow: GET)
~~~

---

## ٧. التوثيق اللي اتعمل لوحده

| المسار | فيه إيه |
|---|---|
| [[/docs]] | Swagger UI: صفحة تجرّب منها كل endpoint (Try it out ثم Execute) |
| [[/redoc]] | نفس التوثيق بشكل للقراية |
| [[/openapi.json]] | الوصف الخام (OpenAPI 3.1) اللي الصفحتين مبنيين عليه |

ده جزء من [[/openapi.json]] الحقيقي:

~~~text الناتج (مختصر)
"openapi": "3.1.0",
"info": {"title": "Shop API", "version": "1.0.0"},
"/health": {
  "get": {
    "tags": ["ops"],
    "summary": "Health",
    "operationId": "health_health_get",
    "responses": {"200": {... "schema": {"additionalProperties": {"type": "boolean"}, "type": "object"}}}
~~~

- [[summary]] اتعمل من اسم الدالة ([[health]] → [[Health]]).
- [[operationId]] اسم فريد لكل endpoint (اسم الدالة + المسار + الـ method)، والأدوات اللي بتولّد client من الـ API بتستخدمه.
- الـ schema جت من [[-> dict[str, bool]]]: object كل قيمه boolean.

وصفحة [[/docs]] نفسها HTML صغيرة بتحمّل Swagger UI من الـ CDN وبتقراله [[/openapi.json]]، وعنوانها [[Shop API - Swagger UI]] من الـ title.

---

## ٨. [[fastapi run main.py --workers 2]]

للإنتاج:

~~~text الناتج (أهم السطور)
 ⚡️ Starting FastAPI in production mode
 🌐 Server started at http://0.0.0.0:8000
INFO:     Started parent process [10980]
INFO:     Started server process [11256]
INFO:     Started server process [49712]
~~~

| | [[fastapi dev]] | [[fastapi run]] |
|---|---|---|
| العنوان | [[127.0.0.1]] (جهازك بس) | [[0.0.0.0]] (كل الشبكات: لازم في Docker) |
| reload | أيوه | لأ |
| [[--workers 2]] | - | ٢ process كل واحدة نسخة من التطبيق، و parent بيديرهم |

## ٩. من غير مسار: [[pyproject.toml]]

~~~toml
[tool.fastapi]
entrypoint = "app.main:app"
~~~

جربناها بملف في [[app/main.py]] و [[fastapi run]] من غير أي مسار، وطبع [[Using import string: app.main:app]].

> لو سطّبت [[pip install fastapi]] من غير [[[standard]]]، أمر [[fastapi]] بيقع بـ [[RuntimeError: To use the fastapi command, please install "fastapi[standard]"]] (جربناها في venv تاني).

## الخلاصة

- [[@app.get(path)]] فوق دالة = endpoint، والدالة بترجّع dict بيبقى JSON.
- [[fastapi dev]] للتطوير (reload و 127.0.0.1)، و [[fastapi run]] للإنتاج (0.0.0.0 من غير reload).
- [[/docs]] و [[/openapi.json]] ببلاش من الكود نفسه.`,
          lines: [
            "الكلاس الأساسي.",
            "التطبيق، والعنوان والنسخة بيظهروا في /docs.",
            "الدالة اللي تحت بترد على GET /.",
            "دالة async ونوع الرجوع مكتوب.",
            "dict بيتحوّل JSON لوحده.",
            R`route تاني، و [[tags]] بتجمّعه في مجموعة في /docs.`,
            "الدالة.",
            "الرد."
          ],
          sol: R`الترمنال هيطبع [[Server started at http://127.0.0.1:8000]] و [[Documentation at http://127.0.0.1:8000/docs]]. في [[/docs]] هتلاقي الـ endpoints الاتنين، و [[/health]] تحت قسم [[ops]] (من [[tags]]) والتاني تحت [[default]]. اضغط Try it out وبعدين Execute، وهتشوف [[{"message": "أهلًا"}]] و [[{"ok": true}]].

[[/openapi.json]] هو الوصف الخام: فيه [[info]] بالـ [[title]] و [[version]] اللي كتبتهم، و [[paths]] فيها [[/]] و [[/health]]، وكل واحد عنده [[operationId]] و [[summary]] اتولّدوا من اسم الدالة، و schema للرد من نوع الرجوع ([[dict[str, bool]]] بقت object قيمه boolean). ولما تحفظ تعديل هتشوف [[WatchFiles detected changes in 'main.py'. Reloading...]] والرد الجديد يظهر من غير ما تعيد التشغيل. لو مفيش reload، غالبًا شغّلت [[fastapi run]] (للإنتاج، من غير reload) بدل [[dev]].`
        },
        {
          cmd: "path و query",
          title: "تاخد قيم من المسار ومن ?page=2 بأنواعها",
          desc: R`أي حاجة في المسار بين [[{}]] بتبقى path parameter: [[@app.get("/items/{item_id}")]] و [[item_id: int]]. وأي باراميتر في الدالة مش في المسار ومش model بيبقى query parameter: [[page: int = 1]] يعني [[?page=2]].

FastAPI بيحوّل للنوع ويفحص: [[/items/abc]] بيرجع 422 برسالة واضحة من غير ما تكتب حاجة. والقيود الزيادة بـ [[Annotated]]: [[Annotated[int, Query(ge=1, le=100)]]].`,
          example: R`from typing import Annotated, Literal
from fastapi import FastAPI, Path, Query
from pydantic import BaseModel, Field
app = FastAPI()
@app.get("/items/{item_id}")
async def get_item(item_id: Annotated[int, Path(ge=1)]):
    return {"item_id": item_id}
@app.get("/items")
async def list_items(
    q: Annotated[str | None, Query(max_length=50)] = None,
    page: Annotated[int, Query(ge=1)] = 1,
    size: Annotated[int, Query(ge=1, le=100)] = 20,
    tags: Annotated[list[str] | None, Query()] = None,
    sort: Literal["new", "price"] = "new",
):
    return {"q": q, "page": page, "size": size, "tags": tags, "sort": sort}
class Filters(BaseModel):
    min_price: float = Field(0, ge=0)
    in_stock: bool = True
@app.get("/products")
async def products(filters: Annotated[Filters, Query()]):
    return filters`,
          try: R`جرّب في المتصفح: [[/items/0]] و [[/items/abc]] و [[/items?size=500]] و [[/items?tags=a&tags=b&sort=old]] و [[/products?min_price=-1]]، واقرا كل رد 422. وبعدين افتح [[/docs]] وشوف القيود ظهرت في التوثيق.`,
          flag: "script",
          deep: {
            why: R`من غير FastAPI بتكتب لكل endpoint: اقرا الـ query، حوّل لـ int، لو فشل ارجع 400، اتأكد إنه أكبر من صفر... و FastAPI بيعمل ده كله من النوع، وبيكتب التوثيق كمان.`,
            how: R`FastAPI بيقرا signature الدالة وقت ما التطبيق يقوم ويقرر مصدر كل باراميتر: اسمه في المسار؟ path. نوعه Pydantic model؟ body. غير كده؟ query. ومع كل request بيجمع القيم ويفحصها بـ Pydantic.

[[Annotated[type, metadata]]] الطريقة الموصى بيها: النوع الحقيقي الأول، والـ metadata ([[Query]] و [[Path]] و [[Depends]]) بعده، والـ default بـ [[=]] عادي. والقديمة [[page: int = Query(1, ge=1)]] لسه شغالة بس مش مفضلة.

القيود: [[ge]] و [[le]] و [[gt]] و [[lt]] للأرقام، و [[min_length]] و [[max_length]] و [[pattern]] للنصوص. و [[list[str]]] في query بيقبل نفس الاسم كذا مرة ([[?tags=a&tags=b]]). و [[Literal]] بيقبل قيم محددة بس. والـ bool بيقبل [[true]] و [[1]] و [[yes]] و [[on]].

ولو الـ query params كتير، اعملهم Pydantic model و [[Annotated[Filters, Query()]]] (FastAPI 0.115+)، ولو عايز ترفض أي باراميتر زيادة: [[model_config = {"extra": "forbid"}]] في الموديل.

وترتيب الـ routes مهم: [[/users/me]] لازم يتعرّف قبل [[/users/{user_id}]]، وإلا "me" هتتقري كـ user_id وترجع 422.`,
            when: R`path للي بيحدد resource ([[/orders/42]]). و query للفلترة والترتيب والـ pagination والبحث. ولو داتا كتير أو حساسة: body (الدرس الجاي).`,
            mistakes: R`[[item_id: str]] والـ id في القاعدة int، فالفحص مش بيحصل. و pagination من غير [[le]] على [[size]]: حد يطلب [[?size=1000000]] ويوقّع القاعدة. وتحط باسورد أو توكن في query (بيتسجل في لوج nginx وفي الـ history).`
          },
          teach: R`## المثال بيعمل إيه؟

٣ endpoints بتاخد قيم من الـ URL: [[/items/{item_id}]] بياخد رقم من **المسار** نفسه، و [[/items]] بياخد فلاتر من **الـ query string** (اللي بعد [[?]])، و [[/products]] بيجمع الفلاتر في موديل Pydantic. FastAPI بيحوّل كل قيمة لنوعها ويفحصها، ولو غلط بيرجع 422 لوحده. اتجرب بـ FastAPI 0.142 و Python 3.14 على ويندوز، بـ [[curl]] من Git Bash و [[Invoke-RestMethod]] من PowerShell (كل الردود اللي تحت حقيقية).

---

## ١. أجزاء الـ URL

~~~text
http://localhost:8000/items/42?page=2&tags=a&tags=b
                     └─ path ─┘ └──── query string ───┘
~~~

- **path**: [[/items/42]]. الـ [[42]] هنا جزء من المسار.
- **query string**: كل اللي بعد [[?]]، أزواج [[name=value]] بينهم [[&]].

---

## ٢. الـ imports

~~~python
from typing import Annotated, Literal
from fastapi import FastAPI, Path, Query
from pydantic import BaseModel, Field
~~~

| الاسم | بيعمل إيه |
|---|---|
| [[Annotated[T, x]]] | «النوع T، ومعاه معلومة زيادة x». Python بيشوفه T عادي، و FastAPI بيقرا x |
| [[Literal["new", "price"]]] | النوع ده بيقبل القيم دي بالظبط بس |
| [[Path(...)]] و [[Query(...)]] | المعلومة الزيادة: القيمة دي من المسار / من الـ query، وعليها القيود دي |
| [[BaseModel]] و [[Field]] | موديل Pydantic وقيود حقوله (قسم Pydantic) |

---

## ٣. path parameter

~~~python
@app.get("/items/{item_id}")
async def get_item(item_id: Annotated[int, Path(ge=1)]):
    return {"item_id": item_id}
~~~

- [[{item_id}]] في المسار: «الحتة دي متغيرة، سمّيها item_id». ولازم يبقى فيه باراميتر في الدالة **بنفس الاسم**.
- [[int]]: الـ URL كله نص، فـ FastAPI بيحوّل [["5"]] لـ [[5]].
- [[Path(ge=1)]]: [[ge]] = greater than or equal، يعني ١ أو أكتر.

~~~text الناتج
/items/5    → 200 {"item_id":5}
/items/0    → 422 {"detail":[{"type":"greater_than_equal","loc":["path","item_id"],"msg":"Input should be greater than or equal to 1","input":"0","ctx":{"ge":1}}]}
/items/abc  → 422 {"detail":[{"type":"int_parsing","loc":["path","item_id"],"msg":"Input should be a valid integer, unable to parse string as an integer","input":"abc"}]}
~~~

لاحظ [[5]] رجعت رقم مش [["5"]]: اتحوّلت.

### نقرا رد الـ 422

| الخانة | معناها |
|---|---|
| [[type]] | نوع الغلط بكود ثابت ([[int_parsing]] و [[greater_than_equal]]) تقدر تعتمد عليه في الكود |
| [[loc]] | المكان: [[["path", "item_id"]]] يعني «في المسار، الباراميتر item_id» |
| [[msg]] | رسالة للبني آدمين |
| [[input]] | القيمة اللي اتبعتت (لاحظ إنها string: [["0"]]) |
| [[ctx]] | تفاصيل القيد: [[{"ge":1}]] |

422 معناها Unprocessable Content: «الطلب وصل وفهمته، بس الداتا مش مقبولة».

---

## ٤. query parameters

~~~python
@app.get("/items")
async def list_items(
    q: Annotated[str | None, Query(max_length=50)] = None,
    page: Annotated[int, Query(ge=1)] = 1,
    size: Annotated[int, Query(ge=1, le=100)] = 20,
    tags: Annotated[list[str] | None, Query()] = None,
    sort: Literal["new", "price"] = "new",
):
~~~

القاعدة: أي باراميتر **مش موجود في المسار** ونوعه بسيط = query parameter.

| الباراميتر | النوع والقيد | الـ default |
|---|---|---|
| [[q]] | نص أو مفيش ([[str | None]])، أقصاه ٥٠ حرف | [[None]]: اختياري |
| [[page]] | رقم ≥ 1 | 1 |
| [[size]] | رقم من 1 لـ 100 ([[le]] = less than or equal) | 20 |
| [[tags]] | list نصوص: نفس الاسم يتكرر | [[None]] |
| [[sort]] | [["new"]] أو [["price"]] بس | [["new"]] |

[[= 1]] بعد الـ Annotated هو الـ default: لو مبعتهوش، القيمة دي. ولو مفيش default خالص، يبقى إجباري. و [[Query()]] على [[tags]] لازمة: من غيرها FastAPI هيفتكر الـ list body.

~~~text الناتج
/items                          → {"q":null,"page":1,"size":20,"tags":null,"sort":"new"}
/items?q=tea&page=2&size=10     → {"q":"tea","page":2,"size":10,"tags":null,"sort":"new"}
/items?tags=a&tags=b            → {...,"tags":["a","b"],...}
/items?tags=a,b                 → {...,"tags":["a,b"],...}
/items?size=500                 → 422 loc ["query","size"]  "Input should be less than or equal to 100"
/items?tags=a&tags=b&sort=old   → 422 loc ["query","sort"]  "Input should be 'new' or 'price'"
/items?page=0&size=0            → 422 فيه خطأين: page و size
~~~

- [[None]] بتاعة Python بقت [[null]] في JSON.
- الـ list بتتبعت بتكرار الاسم، مش بفاصلة: [[tags=a,b]] بقت عنصر واحد [["a,b"]].
- لو فيه كذا غلط، FastAPI بيرجّعهم **كلهم** مرة واحدة.

---

## ٥. الفلاتر كموديل

~~~python
class Filters(BaseModel):
    min_price: float = Field(0, ge=0)
    in_stock: bool = True
@app.get("/products")
async def products(filters: Annotated[Filters, Query()]):
    return filters
~~~

- [[Field(0, ge=0)]]: أول argument الـ default (0)، و [[ge=0]] مش سالب.
- [[Annotated[Filters, Query()]]]: موديل بس من الـ **query** مش الـ body (من FastAPI 0.115). من غير [[Query()]] أي باراميتر نوعه موديل بيتقري من الـ body.
- [[return filters]]: الموديل نفسه بيتحوّل JSON.

~~~text الناتج
/products                                → {"min_price":0.0,"in_stock":true}
/products?min_price=5&in_stock=no        → {"min_price":5.0,"in_stock":false}
/products?min_price=-1                   → 422 loc ["query","min_price"]  "Input should be greater than or equal to 0"
/products?min_price=abc&in_stock=maybe   → 422 خطأين: float_parsing و bool_parsing
~~~

[[in_stock=no]] بقت [[false]]: الـ bool بيقبل [[true/false]] و [[1/0]] و [[yes/no]] و [[on/off]]، و [[maybe]] لأ.

---

## ٦. من PowerShell

~~~powershell
Invoke-RestMethod "http://localhost:8000/items?tags=a&tags=b&page=2"
~~~

~~~text الناتج
q    :
page : 2
size : 20
tags : {a, b}
sort : new
~~~

[[Invoke-RestMethod]] بيحوّل الـ JSON لـ object ويعرضه كجدول. والـ URL **لازم بين علامات تنصيص**، لأن [[&]] ليها معنى في PowerShell. ولما الرد 422 بيرمي خطأ:

~~~text الناتج في Windows PowerShell 5.1
The remote server returned an error: (422) Unprocessable Content.
~~~

والـ body موجود في [[$_.ErrorDetails.Message]] جوه [[catch]]. وفي PowerShell 7 تقدر تقوله ميرميش: [[Invoke-RestMethod URL -SkipHttpErrorCheck -StatusCodeVariable sc]]، فبيرجّع الـ JSON عادي و [[$sc]] فيها [[422]].

---

## ٧. القيود في [[/docs]]

نفس القيود بتطلع في [[/openapi.json]] (وبالتالي في [[/docs]]):

~~~text الناتج (مختصر)
item_id  in: path   required: true   integer, minimum 1
size     in: query  integer, minimum 1, maximum 100, default 20
sort     in: query  enum ["new", "price"], default "new"
tags     in: query  array of string أو null
~~~

## الخلاصة

| عايز | اكتب |
|---|---|
| قيمة من المسار | [[{name}]] في المسار + باراميتر بنفس الاسم |
| قيمة من [[?x=]] | باراميتر مش في المسار |
| اختياري | default ([[= None]] أو قيمة) |
| قيود | [[Annotated[int, Query(ge=1, le=100)]]] |
| list | [[list[str]]] + [[Query()]]، وتتبعت [[?t=a&t=b]] |
| قيم محددة | [[Literal[...]]] |

- 422 + [[loc]] بيقولك الغلط فين بالظبط (path ولا query، وأنهي اسم).
- حط [[le]] على أي [[size]] أو [[limit]] عشان محدش يطلب مليون صف.`,
          lines: [
            R`[[Annotated]] للـ metadata، و [[Literal]] لقيم محددة.`,
            R`[[Path]] و [[Query]] بيحطوا قيود.`,
            "لموديل الفلاتر.",
            "التطبيق.",
            R`[[{item_id}]] في المسار.`,
            "int ولازم 1 أو أكتر، وإلا 422.",
            "رجّع.",
            "route للقايمة.",
            "كل باراميتر مش في المسار يبقى query.",
            "اختياري، وأقصاه 50 حرف.",
            "رقم الصفحة، على الأقل 1.",
            "حجم الصفحة، بين 1 و 100.",
            R`list: [[?tags=a&tags=b]].`,
            "قيمة من الاتنين دول بس.",
            "قفلة الباراميترات.",
            "رجّع كل حاجة عشان تشوف القيم اتحوّلت لإيه.",
            "موديل للفلاتر.",
            "رقم مش سالب، و default صفر.",
            "bool: بيقبل true و false و 1 و 0.",
            "route بفلاتر كتير.",
            "الموديل كله من الـ query (FastAPI 0.115+).",
            "Pydantic model بيتحوّل JSON لوحده."
          ],
          sol: R`كل الردود 422 وفيها [[detail]] بـ [[loc]] و [[msg]]: [[/items/0]] بترجع [[["path", "item_id"]]] و [[Input should be greater than or equal to 1]]، و [[/items/abc]] بترجع [[Input should be a valid integer, unable to parse string as an integer]]، و [[/items?size=500]] بترجع [[["query", "size"]]] و [[Input should be less than or equal to 100]]. وفي [[/items?tags=a&tags=b&sort=old]] الغلط في [[sort]] بس: [[Input should be 'new' or 'price']]، والـ tags سليمة، ولو شلت [[sort=old]] هترجع 200 و [[tags: ["a", "b"]]]. و [[/products?min_price=-1]] بترجع [[["query", "min_price"]]] و [[Input should be greater than or equal to 0]].

أول عنصر في [[loc]] بيقولك الغلط جه منين ([[path]] ولا [[query]] ولا [[body]])، والتاني اسم الحقل. وفي [[/docs]] هتلاقي القيود ([[minimum]] و [[maximum]] و [[maxLength]] وقيم الـ enum) مكتوبة جنب كل باراميتر. ولو [[?tags=a,b]] رجعت [[["a,b"]]] فده طبيعي: الـ list في الـ query بتتكرر ([[tags=a&tags=b]]) مش بفاصلة.`
        },
        {
          cmd: "request body",
          title: "تستقبل JSON في POST وتتحقق منه",
          desc: R`لو باراميتر الدالة نوعه Pydantic model، FastAPI بيقرا الـ body كـ JSON، ويفحصه بالموديل، ويديك object جاهز. أي حقل ناقص أو نوعه غلط = 422 تلقائي، ومفيش سطر من كودك بيشتغل أصلًا.

و [[status_code=201]] في الـ decorator للـ create. والـ PATCH بموديل كل حقوله اختيارية، و [[model_dump(exclude_unset=True)]] عشان تعدّل اللي اتبعت بس.`,
          example: R`from fastapi import FastAPI, status
from pydantic import BaseModel, Field
app = FastAPI()
class ProductIn(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    price: float = Field(gt=0)
    tags: list[str] = []
class ProductPatch(BaseModel):
    name: str | None = Field(default=None, min_length=2)
    price: float | None = Field(default=None, gt=0)
DB: dict[int, dict] = {}
@app.post("/products", status_code=status.HTTP_201_CREATED)
async def create_product(product: ProductIn):
    new_id = len(DB) + 1
    DB[new_id] = product.model_dump()
    return {"id": new_id, **DB[new_id]}
@app.patch("/products/{product_id}")
async def update_product(product_id: int, patch: ProductPatch):
    DB[product_id].update(patch.model_dump(exclude_unset=True))
    return DB[product_id]`,
          try: R`من [[/docs]] ابعت [[{"name": "x", "price": -5}]] واقرا الـ 422: فيها خطأين بالمكان بالظبط ([[loc]]). وبعدين ابعت [[{"name": "Tea", "price": "12.5"}]] وشوف السعر اتحوّل float. وجرّب PATCH بـ [[{"price": 20}]] بس.`,
          flag: "script",
          deep: {
            why: R`الـ body هو المكان اللي المستخدم بيبعت فيه أي حاجة. لو قريته كـ dict وحطيته في القاعدة، حد هيبعت [[price: -100]] أو [["role": "admin"]]. الموديل بيحدد بالظبط إيه المسموح وشكله.`,
            how: R`FastAPI بيقرا الـ body مرة، ويفحصه بالموديل، ولو فشل بيرجع 422 فيه ليستة [[detail]] لكل خطأ: [[loc]] (المكان: [[["body", "price"]]]) و [[msg]] و [[type]].

الحقول الزيادة اللي مش في الموديل بتتشال بهدوء افتراضيًا (مبتوصلكش). ولو عايز ترفضها: [[model_config = ConfigDict(extra="forbid")]].

و Pydantic في الوضع العادي (lax) بيحوّل الحاجات المنطقية: [["12.5"]] لـ float، و [["true"]] لـ bool. ولو عايز صارم: [[strict=True]].

والـ default الـ mutable ([[tags: list[str] = []]]) آمن في Pydantic عكس الدوال العادية: Pydantic بيعمل نسخة لكل object.

[[exclude_unset=True]] بيرجّع الحقول اللي العميل بعتها فعلًا بس، فتقدر تفرّق بين «مبعتش price» و «بعت price: null». ودي أساس PATCH صح.

ولو محتاج قيمة واحدة بسيطة في الـ body من غير موديل: [[Annotated[int, Body()]]]. والملفات بـ [[UploadFile]] والـ forms بـ [[Form()]] (محتاجين python-multipart، وموجود في standard).`,
            when: R`أي POST أو PUT أو PATCH. موديل منفصل للإنشاء ([[ProductIn]]) وللتعديل ([[ProductPatch]]) وللرد ([[ProductOut]]، الدرس الجاي)، حتى لو شبه بعض.`,
            mistakes: R`موديل واحد للإنشاء والرد وفيه [[id]] و [[password]]. و [[update(patch.model_dump())]] من غير [[exclude_unset]] فكل الحقول اللي مبعتتش تبقى None. و [[async def create(data: dict)]]: كده مفيش أي فحص.`
          },
          teach: R`## المثال بيعمل إيه؟

endpoint بيعمل منتج جديد من JSON جاي في الـ **body** (POST)، و endpoint بيعدّل منتج موجود بالحقول اللي اتبعتت بس (PATCH). الشكل المسموح متوصوف في موديلين Pydantic، و FastAPI بيفحص قبل ما كودك يشتغل. والتخزين dict في الذاكرة بيتمسح لما السيرفر يقفل. اتجرب بـ FastAPI 0.142 و Python 3.14 على ويندوز، بـ [[curl]] من Git Bash و [[Invoke-RestMethod]] من PowerShell.

---

## ١. الـ imports

~~~python
from fastapi import FastAPI, status
from pydantic import BaseModel, Field
~~~

[[status]] فيه أسماء لأكواد HTTP عشان متكتبش أرقام: [[status.HTTP_201_CREATED]] هو [[201]].

---

## ٢. موديل الإنشاء

~~~python
class ProductIn(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    price: float = Field(gt=0)
    tags: list[str] = []
~~~

| الحقل | معناه |
|---|---|
| [[class ProductIn(BaseModel)]] | موديل: كل سطر تحته حقل بنوعه |
| [[name: str = Field(...)]] | نص، طوله من ٢ لـ ١٠٠. ومفيش default، فـ**إجباري** |
| [[price: float = Field(gt=0)]] | رقم عشري، [[gt]] = greater than: أكبر من صفر |
| [[tags: list[str] = []]] | list نصوص، اختياري، والـ default list فاضية |

الـ [[[]]] كـ default في دالة عادية غلطة مشهورة (نفس الـ list بتتشارك)، لكن في Pydantic آمن: كل object بياخد نسخة جديدة.

## ٣. موديل التعديل

~~~python
class ProductPatch(BaseModel):
    name: str | None = Field(default=None, min_length=2)
    price: float | None = Field(default=None, gt=0)
~~~

كل حقل [[X | None]] و default [[None]]: يعني اختياري. ولو اتبعت، القيود لسه بتتطبق.

## ٤. «قاعدة البيانات»

~~~python
DB: dict[int, dict] = {}
~~~

dict مفتاحه رقم (الـ id) وقيمته dict (المنتج). للتجربة بس.

---

## ٥. POST: [[create_product]]

~~~python
@app.post("/products", status_code=status.HTTP_201_CREATED)
async def create_product(product: ProductIn):
    new_id = len(DB) + 1
    DB[new_id] = product.model_dump()
    return {"id": new_id, **DB[new_id]}
~~~

| السطر | بيعمل إيه |
|---|---|
| [[@app.post(...)]] | الدالة دي لطلبات **POST** على [[/products]] |
| [[status_code=201]] | كود الرد لو نجح: 201 Created بدل 200 |
| [[product: ProductIn]] | النوع موديل، فـ FastAPI بيقرا **الـ body** كـ JSON ويفحصه بيه ويديك object |
| [[len(DB) + 1]] | id جديد (للتجربة) |
| [[product.model_dump()]] | الموديل لـ dict عادي |
| [[{"id": new_id, **DB[new_id]}]] | dict جديد: [[id]] و بعده [[**]] بتفرد مفاتيح المنتج جواه |

### نبعت داتا سليمة

~~~bash
curl -X POST localhost:8000/products -H "Content-Type: application/json" -d '{"name": "Tea", "price": "12.5"}'
~~~

- [[-X POST]]: الـ method.
- [[-H "Content-Type: application/json"]]: header بيقول «الـ body ده JSON».
- [[-d '...']]: الـ body نفسه، بين [[']] عشان الـ [["]] اللي جواه.

~~~text الناتج (201)
{"id":1,"name":"Tea","price":12.5,"tags":[]}
~~~

[["12.5"]] كان string واتحوّل [[12.5]] رقم: Pydantic في الوضع العادي (lax) بيحوّل اللي ليه معنى. و [[tags]] مبعتتش فخدت [[[]]].

### نبعت داتا غلط

~~~bash
curl -X POST localhost:8000/products -H "Content-Type: application/json" -d '{"name": "x", "price": -5}'
~~~

~~~text الناتج (422)
{"detail":[
  {"type":"string_too_short","loc":["body","name"],"msg":"String should have at least 2 characters","input":"x","ctx":{"min_length":2}},
  {"type":"greater_than","loc":["body","price"],"msg":"Input should be greater than 0","input":-5,"ctx":{"gt":0.0}}
]}
~~~

خطأين مع بعض، وكل واحد [[loc]] بتاعه بيبدأ بـ [["body"]]. ودالتك **مااشتغلتش أصلًا**. وحالات تانية جربناها:

| اللي اتبعت | الرد |
|---|---|
| حقل زيادة [["role": "admin"]] | 201، والحقل **اتشال بهدوء** (مش في الرد ولا في DB) |
| JSON بايظ [[{"name": "Cake"]] | 422 [[json_invalid]] و [[JSON decode error]] |
| من غير body خالص | 422 [[missing]] و [[loc: ["body"]]] |

---

## ٦. PATCH: [[update_product]]

~~~python
@app.patch("/products/{product_id}")
async def update_product(product_id: int, patch: ProductPatch):
    DB[product_id].update(patch.model_dump(exclude_unset=True))
    return DB[product_id]
~~~

- [[product_id: int]]: من المسار (اسمه في [[{}]]).
- [[patch: ProductPatch]]: موديل، فمن الـ body.
- [[dict.update(other)]]: بيكتب مفاتيح [[other]] فوق الـ dict.
- [[exclude_unset=True]]: هات **الحقول اللي العميل بعتها بس**.

الفرق ده كله، جربناه على [[{"price": 20}]]:

~~~text الناتج
patch.model_dump()                    → {'name': None, 'price': 20.0}
patch.model_dump(exclude_unset=True)  → {'price': 20.0}
~~~

من غير [[exclude_unset]] الاسم كان هيتمسح ويبقى [[None]]. والرد الحقيقي:

~~~text الناتج (200)
{"name":"Tea","price":20.0,"tags":[]}
~~~

### حاجتين اتعلمناهم من التجربة

- [[{"name": null}]] **عدّت** وخلّت الاسم [[null]]، لأن [[str | None]] بيقبل None، والقيد [[min_length]] مبيتطبقش على None. لو مش عايز ده، افحصه بنفسك أو شيل [[| None]] من النوع واستخدم default تاني.
- PATCH على [[/products/99]] (مش موجود) رجّع **500** [[Internal Server Error]]: [[DB[99]]] رمى [[KeyError]]. الصح [[HTTPException(status_code=404)]] (قسم الأخطاء).

---

## ٧. من PowerShell

~~~powershell
$body = @{ name = "Juice"; price = 15 } | ConvertTo-Json
Invoke-RestMethod http://localhost:8000/products -Method Post -ContentType "application/json" -Body $body
~~~

- [[@{ ... }]]: hashtable (زي dict).
- [[| ConvertTo-Json]]: حوّله نص JSON: [[{"name": "Juice", "price": 15}]].
- [[-Method Post]] و [[-ContentType]] و [[-Body]]: نفس [[-X]] و [[-H]] و [[-d]] في curl.

~~~text الناتج (PowerShell 7)
id name  price tags
-- ----  ----- ----
 4 Juice 15.00 {}
~~~

([[4]] لأننا كنا عاملين ٣ منتجات قبلها.) وفي Windows PowerShell 5.1 نفس الأمر اشتغل.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| body بشكل معين | باراميتر نوعه موديل Pydantic |
| حقل إجباري | من غير default |
| اختياري | [[X | None = None]] أو default |
| 201 للإنشاء | [[status_code=status.HTTP_201_CREATED]] |
| PATCH صح | [[model_dump(exclude_unset=True)]] |

- 422 قبل كودك، وفيها كل الأخطاء مع بعض.
- الحقول الزيادة بتتشال بهدوء افتراضيًا ([[extra="forbid"]] لو عايز ترفضها).
- موديل للإنشاء وموديل للتعديل، حتى لو شبه بعض.`,
          lines: [
            R`[[status]] فيه أسماء لأكواد HTTP.`,
            "الموديل والقيود.",
            "التطبيق.",
            "شكل الـ body المسموح في الإنشاء.",
            "string بين 2 و 100 حرف.",
            "رقم أكبر من صفر.",
            "اختياري، و default فاضي (آمن في Pydantic).",
            "موديل للتعديل: كل حاجة اختيارية.",
            "اختياري، بس لو اتبعت لازم حرفين على الأقل.",
            "نفس الفكرة.",
            "قاعدة بيانات وهمية في الذاكرة للتجربة.",
            "POST، والرد 201 Created.",
            "باراميتر نوعه موديل: يبقى الـ body.",
            "id جديد.",
            R`[[model_dump]] بيحوّل الموديل لـ dict.`,
            "رجّع الـ id مع البيانات.",
            "PATCH على منتج.",
            "path و body مع بعض.",
            "عدّل الحقول اللي اتبعتت بس.",
            "رجّع بعد التعديل."
          ],
          sol: R`[[{"name": "x", "price": -5}]] بترجع 422 وفيها خطأين: [[loc: ["body", "name"]]] بـ [[String should have at least 2 characters]]، و [[loc: ["body", "price"]]] بـ [[Input should be greater than 0]]. Pydantic بيجمع كل الأخطاء مرة واحدة مش بيقف عند أول واحد، ودي ميزة للـ frontend.

[[{"name": "Tea", "price": "12.5"}]] بترجع 201 و [[{"id": 1, "name": "Tea", "price": 12.5, "tags": []}]]: الـ string اتحوّل لـ float (الوضع العادي lax مش strict). والـ PATCH بـ [[{"price": 20}]] بترجع [[{"name": "Tea", "price": 20.0, "tags": []}]]: الاسم فضل زي ما هو بفضل [[exclude_unset=True]]. من غيرها [[patch.model_dump()]] كانت هترجع [[{"name": None, "price": 20.0}]] وتمسح الاسم. ولو عملت PATCH على id مش موجود هتاخد 500 من [[KeyError]]، والصح [[HTTPException(404)]].`
        },
        {
          cmd: "response model",
          title: "تحدد شكل الرد، وتضمن إن الباسورد مايطلعش",
          desc: R`نوع الرجوع بتاع الدالة ([[-> UserOut]]) بيقول لـ FastAPI شكل الرد: بيفحصه، وبيشيل أي حقل مش في الموديل، وبيوثّقه في [[/docs]]. فلو رجّعت object فيه [[password_hash]] والموديل مفيهوش، مش هيطلع للعميل.

ولو الدالة بترجع حاجة مختلفة عن الموديل (dict أو ORM object)، استخدم [[response_model=UserOut]] في الـ decorator بدل نوع الرجوع. ولما يبقى فيه response model، FastAPI بيعمل الـ JSON بـ Pydantic مباشرة (في Rust)، وده أسرع كمان.`,
          example: R`from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
app = FastAPI()
class UserOut(BaseModel):
    id: int
    email: EmailStr
    name: str
class UserInDB(UserOut):
    password_hash: str
class UserRow:
    def __init__(self, id: int, email: str, name: str, password_hash: str):
        self.id, self.email, self.name, self.password_hash = id, email, name, password_hash
@app.get("/users/{user_id}")
async def get_user(user_id: int) -> UserOut:
    return UserInDB(id=user_id, email="sara@example.com", name="Sara", password_hash="$argon2id$...")
@app.get("/users", response_model=list[UserOut])
async def list_users():
    return [UserRow(1, "sara@example.com", "Sara", "$argon2id$...")]`,
          try: R`افتح [[/users/1]] وشوف الرد مفيهوش [[password_hash]]. وبعدين غيّر نوع الرجوع لـ [[-> UserInDB]] وشوف طلع. وجرّب ترجّع email غلط زي [["x"]] من الدالة: هيطلع 500 مش 422، لأن الغلط عندك انت مش عند العميل.`,
          flag: "script",
          deep: {
            why: "أشهر تسريب بيانات في APIs: endpoint بيرجّع الـ object من القاعدة زي ما هو، وفيه password_hash أو توكنات أو حقول داخلية. الـ response model قايمة بيضا: اللي مش مكتوب فيها مبيطلعش.",
            how: R`FastAPI بياخد اللي الدالة رجّعته ويفحصه بالـ response model (وبيقرا الـ attributes من أي object، مش dict بس)، وبعدين يحوّله JSON. الحقول الزيادة بتتشال، والناقصة أو الغلط بترمي [[ResponseValidationError]] (يعني 500): ده bug عندك.

نوع الرجوع ولا [[response_model]]؟ لو الدالة بترجّع نفس النوع: اكتبه نوع رجوع، والمحرر و mypy هيفهموه. لو بترجع حاجة تانية (ORM object أو dict) والرد موديل: [[response_model]]، لأنك لو كتبت [[-> UserOut]] ورجّعت UserRow، mypy هيعترض. ولو الاتنين موجودين، [[response_model]] بيكسب.

ولما تعمل [[UserOut.model_validate(row)]] بنفسك على object مش dict، محتاج [[model_config = ConfigDict(from_attributes=True)]] (اسمها القديم [[orm_mode]] في v1).

خيارات مفيدة: [[response_model_exclude_none=True]] يشيل الحقول اللي None. ووجود response model بيخلي FastAPI يطلّع الـ JSON من Pydantic مباشرة، فـ [[ORJSONResponse]] بقت deprecated ومش محتاجها.

ولو رجّعت [[Response]] أو [[RedirectResponse]] مباشرة، FastAPI بيعدّيها زي ما هي من غير فحص.`,
            when: R`كل endpoint بيرجّع داتا من القاعدة. اعمل عيلة موديلات: [[UserBase]] (المشترك)، و [[UserCreate]] (فيه password)، و [[UserOut]] (فيه id ومفيهوش password)، و [[UserInDB]] (فيه الـ hash).`,
            mistakes: R`ترجّع [[dict(row)]] من غير response model. و [[response_model=User]] والموديل فيه password لأنه نفس موديل الإدخال. و [[-> dict]] كنوع رجوع وتفتكر كده متوثّق (مفيش شكل). وتستخدم [[response_model_exclude]] كحماية بدل موديل منفصل.`
          },
          teach: R`## المثال بيعمل إيه؟

endpoint بيرجّع مستخدم **داخلي** فيه [[password_hash]]، بس اللي بيوصل للعميل [[id]] و [[email]] و [[name]] بس، لأن الـ response model بيقول كده. و endpoint تاني بيرجّع objects عادية (زي صفوف ORM) و FastAPI بيبني منها الرد. اتجرب بـ FastAPI 0.142 و Python 3.14 على ويندوز، بـ [[curl]] و PowerShell 7.

---

## ١. الـ imports

~~~python
from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
~~~

[[EmailStr]] نوع جاهز: string لازم يبقى إيميل سليم. بيحتاج مكتبة [[email-validator]]، وهي جاية مع [[fastapi[standard]]].

---

## ٢. عيلة الموديلات

~~~python
class UserOut(BaseModel):
    id: int
    email: EmailStr
    name: str
class UserInDB(UserOut):
    password_hash: str
~~~

- [[UserOut]]: **الشكل اللي مسموح يطلع**. قايمة بيضا: اللي مش مكتوب هنا مبيطلعش.
- [[class UserInDB(UserOut)]]: بيورث كل حقول [[UserOut]] ويزوّد [[password_hash]]. ده اللي جوه السيستم.

## ٣. object عادي زي صف من القاعدة

~~~python
class UserRow:
    def __init__(self, id: int, email: str, name: str, password_hash: str):
        self.id, self.email, self.name, self.password_hash = id, email, name, password_hash
~~~

class عادي مش Pydantic، زي اللي بيرجع من ORM (SQLAlchemy مثلًا). [[__init__]] الـ constructor، والسطر التالت بيحط ٤ قيم في ٤ attributes مرة واحدة (tuple unpacking).

---

## ٤. نوع الرجوع هو الـ response model

~~~python
@app.get("/users/{user_id}")
async def get_user(user_id: int) -> UserOut:
    return UserInDB(id=user_id, email="sara@example.com", name="Sara", password_hash="$argon2id$...")
~~~

الدالة بترجّع [[UserInDB]] (فيه الـ hash)، بس نوع الرجوع [[-> UserOut]]. FastAPI بياخد اللي رجع، ويعدّيه على [[UserOut]]، وأي حقل مش فيه بيتشال:

~~~bash
curl localhost:8000/users/1
~~~

~~~text الناتج
{"id":1,"email":"sara@example.com","name":"Sara"}
~~~

مفيش [[password_hash]]. و [[$argon2id$...]] شكل hash بخوارزمية argon2 (القيمة هنا وهمية).

## ٥. [[response_model=]] في الـ decorator

~~~python
@app.get("/users", response_model=list[UserOut])
async def list_users():
    return [UserRow(1, "sara@example.com", "Sara", "$argon2id$...")]
~~~

هنا الدالة بترجّع list من [[UserRow]]، مش [[UserOut]]. لو كتبت [[-> list[UserOut]]] المحرر و mypy هيعترضوا (النوع مش مطابق)، فبنحط الموديل في [[response_model]] والدالة من غير نوع رجوع. FastAPI بيقرا [[row.id]] و [[row.email]] و [[row.name]] من كل object ويبني [[UserOut]]:

~~~text الناتج
[{"id":1,"email":"sara@example.com","name":"Sara"}]
~~~

ومن PowerShell 7:

~~~powershell
Invoke-RestMethod http://localhost:8000/users | Format-Table
~~~

~~~text الناتج
id email            name
-- -----            ----
 1 sara@example.com Sara
~~~

---

## ٦. في [[/openapi.json]]

الاتنين اتوثّقوا بنفس الموديل:

~~~text الناتج (مختصر)
/users/{user_id}  200 → {"$ref": "#/components/schemas/UserOut"}
/users            200 → {"type": "array", "items": {"$ref": "#/components/schemas/UserOut"}}
UserOut: required ["id", "email", "name"], email: {"type": "string", "format": "email"}
~~~

[[$ref]] يعني «الشكل متعرّف تحت في [[components]]»، فـ [[/docs]] بتعرض الموديل مرة واحدة. و [[password_hash]] مش موجود في التوثيق أصلًا.

---

## ٧. التجارب

### نوع الرجوع [[-> UserInDB]]

~~~text الناتج
{"id":1,"email":"sara@example.com","name":"Sara","password_hash":"$argon2id$..."}
~~~

ده بالظبط التسريب اللي الـ response model بيمنعه.

### email غلط من السيرفر

جربنا طريقتين، والاتنين **500** مش 422:

| الطريقة | اللي في الترمنال |
|---|---|
| [[return {"id": 1, "email": "x", "name": "Sara"}]] | [[ResponseValidationError]] و [[loc: ('response', 'email')]] و [[value is not a valid email address: An email address must have an @-sign.]] |
| [[return UserInDB(..., email="x", ...)]] | [[ValidationError: 1 validation error for UserInDB]]: وقع جوه دالتك قبل ما توصل لـ FastAPI |

ليه 500؟ 422 معناها «العميل بعت غلط»، وهنا العميل مبعتش حاجة: السيرفر هو اللي طلّع داتا مخالفة للعقد، فده bug عندك.

---

## الخلاصة

| الموقف | اكتب |
|---|---|
| الدالة بترجّع نفس الموديل أو ابنه | [[-> UserOut]] |
| بترجّع ORM object أو dict | [[response_model=UserOut]] |
| list | [[list[UserOut]]] |

- الـ response model **قايمة بيضا**: أي حقل مش فيه بيتشال، وده اللي بيحمي الباسورد.
- اعمل موديل منفصل للرد ([[UserOut]]) وللداخل ([[UserInDB]]).
- رد مش مطابق = 500 (bug عندك)، مش 422.`,
          lines: [
            "FastAPI.",
            R`[[EmailStr]] بيفحص الإيميل (محتاج email-validator، وموجود في standard).`,
            "التطبيق.",
            "شكل الرد: اللي هنا بس اللي هيطلع.",
            "حقل.",
            "حقل.",
            "حقل.",
            "موديل داخلي: كل حقول الرد وزيادة.",
            "الحقل اللي مينفعش يطلع.",
            "زي صف راجع من ORM: object عادي مش dict.",
            "constructor.",
            "خزّن القيم كـ attributes.",
            "route.",
            "نوع الرجوع هو الـ response model.",
            R`بنرجّع الموديل الداخلي، و FastAPI بيشيل [[password_hash]].`,
            R`هنا الدالة بترجّع objects مش UserOut، فالموديل في [[response_model]].`,
            "الدالة.",
            "FastAPI بيقرا الـ attributes من كل object ويبني منها UserOut."
          ],
          sol: R`[[/users/1]] بترجع [[{"id": 1, "email": "sara@example.com", "name": "Sara"}]] بس، مع إن الدالة رجّعت [[UserInDB]] فيه الـ hash. FastAPI بيعدّي الناتج على [[UserOut]] وبيشيل أي حقل مش فيه. ولما تغيّر لـ [[-> UserInDB]] هيظهر [[password_hash]] في الرد، وده بالظبط التسريب اللي الـ response model بيمنعه.

ولو رجّعت [[email="x"]]: العميل بياخد [[500 Internal Server Error]] في الحالتين، بس الخطأ في الترمنال بيفرق. لو رجّعت dict ([[return {"id": user_id, "email": "x", "name": "Sara"}]])، FastAPI بيفحصه وهو طالع: [[ResponseValidationError]] مع [[loc: ('response', 'email')]] و [[value is not a valid email address: An email address must have an @-sign.]]. ولو كتبتها جوه [[UserInDB(...)]] زي المثال، الخطأ بيقع جوه دالتك قبل ما توصل لـ FastAPI: [[ValidationError: 1 validation error for UserInDB]]. الـ 422 معناها «العميل بعت حاجة غلط»، لكن هنا العميل مبعتش حاجة، السيرفر هو اللي طلّع بيانات مش مطابقة للعقد، فده bug عندك. ولو ظهر خطأ إن [[EmailStr]] محتاج [[email-validator]]، سطّب [[pip install "pydantic[email]"]] (بتيجي أصلًا مع [[fastapi[standard]]]).`
        },
        {
          cmd: "APIRouter",
          title: "تقسّم الـ API على ملفات",
          desc: R`بدل ما كل الـ routes في [[main.py]]، كل مجموعة في ملف ليها [[APIRouter]] بـ [[prefix]] و [[tags]]، و [[main.py]] بيجمعهم بـ [[app.include_router]]. والـ router ينفع ياخد dependencies تتطبق على كل routes بتاعته (زي auth على كل [[/admin]]).`,
          example: R`# app/routers/orders.py
from fastapi import APIRouter, Depends
from app.deps import require_user
router = APIRouter(prefix="/orders", tags=["orders"], dependencies=[Depends(require_user)])
@router.get("/")
async def list_orders():
    return []
@router.get("/{order_id}")
async def get_order(order_id: int):
    return {"id": order_id}
# app/main.py
from fastapi import FastAPI
from app.routers import orders, users
app = FastAPI()
app.include_router(users.router)
app.include_router(orders.router, prefix="/api/v1")`,
          try: R`قسّم التطبيق بتاعك لـ [[users.py]] و [[orders.py]]، وافتح [[/docs]]: هتلاقي كل مجموعة تحت الـ tag بتاعها. وبعدين اطبع المسارات كلها: [[print(list(app.openapi()["paths"]))]].`,
          flag: "script",
          deep: {
            why: R`بعد ٢٠ endpoint، [[main.py]] بقى ٨٠٠ سطر وكل الفريق بيعدّل فيه، والـ conflicts في كل merge. الـ routers بتقسّم الكود حسب الـ domain.`,
            how: R`[[APIRouter]] زي app مصغّر: بتسجّل عليه routes بنفس الـ decorators. و [[include_router]] بيربط الـ router بالتطبيق (من FastAPI 0.137 مبقاش بينسخ الـ routes، والربط live: أي route تضيفه للـ router بعد الـ include بيشتغل برضه) ويركّب الـ prefixes: [[/api/v1]] + [[/orders]] + [[/{order_id}]].

[[dependencies=[Depends(...)]]] على الـ router بتشتغل قبل كل route فيه، وقيمتها مبتتبعتش للدالة (للفحص بس، زي auth). ونفس الخيار موجود على [[include_router]] وعلى الـ decorator.

شكل مشروع متوسط: [[app/main.py]] (التطبيق والـ lifespan والـ routers)، و [[app/config.py]] (الإعدادات)، و [[app/deps.py]] (الـ dependencies المشتركة)، و [[app/routers/]] (الـ HTTP)، و [[app/services/]] أو [[app/repositories/]] (المنطق والـ SQL)، و [[app/schemas.py]] (موديلات Pydantic). والـ routers رفيعة: تقرا الـ request وتنادي service وترجّع.

والـ versioning بالـ prefix ([[/api/v1]]) أبسط طريقة، وتفاصيله وتصميم الـ URLs في تاب «APIs متقدمة».`,
            when: "من أول ما يبقى عندك أكتر من resource واحد.",
            mistakes: R`circular import: [[routers/users.py]] بيعمل import من [[main.py]] (عشان [[app]]) و [[main.py]] بيعمل import من الـ router. الـ router مش محتاج [[app]] أصلًا. و [[prefix="/orders/"]] بشرطة في الآخر: FastAPI بيرمي [[AssertionError]] («A path prefix must not end with '/'») والتطبيق مش هيقوم أصلًا، فاكتبها [[/orders]] من غير شرطة. والـ SQL والمنطق كله جوه دوال الـ routes.`
          },
          teach: R`## المثال بيعمل إيه؟

بيقسّم الـ API على ملفات: ملف [[app/routers/orders.py]] فيه routes الطلبات على [[APIRouter]] خاص بيها (ومحمية بـ dependency)، و [[app/main.py]] بيعمل التطبيق ويركّب فيه الـ routers. المثال فيه ملفين في صندوق واحد، كل واحد بيبدأ بتعليق فيه اسمه. اتجرب بـ FastAPI 0.142 و Python 3.14 على ويندوز.

---

## ١. شكل المشروع

~~~text
project/
  app/
    __init__.py
    main.py
    deps.py
    routers/
      __init__.py
      orders.py
      users.py
~~~

- [[__init__.py]] (ممكن يبقى فاضي) بيخلي الفولدر **package**، فتقدر تكتب [[from app.routers import orders]].
- [[deps.py]] مش في المثال: فيه [[require_user]]. للتجربة كتبنا نسخة بسيطة بتقرا header اسمه [[X-User]] ولو مش موجود ترجع 401 (الـ auth الحقيقي في قسم الـ dependencies).
- [[users.py]] نفس شكل [[orders.py]] بـ [[prefix="/users"]] و [[tags=["users"]]].

---

## ٢. [[app/routers/orders.py]]

~~~python
from fastapi import APIRouter, Depends
from app.deps import require_user
router = APIRouter(prefix="/orders", tags=["orders"], dependencies=[Depends(require_user)])
~~~

[[APIRouter]] زي [[FastAPI()]] صغير: تسجّل عليه routes بنفس الـ decorators، بس هو لوحده مبيشتغلش، لازم يتركّب في app.

| الـ argument | معناه |
|---|---|
| [[prefix="/orders"]] | يتحط قبل مسار كل route في الملف. **من غير** [[/]] في الآخر |
| [[tags=["orders"]]] | كل الـ routes تبقى في مجموعة orders في [[/docs]] |
| [[dependencies=[Depends(require_user)]]] | قبل أي route هنا، نادي [[require_user]]. لو رمت (401 مثلًا)، الـ route مبيشتغلش. وقيمتها مبتتبعتش للدالة: للفحص بس |

~~~python
@router.get("/")
async def list_orders():
    return []
@router.get("/{order_id}")
async def get_order(order_id: int):
    return {"id": order_id}
~~~

[[@router.get]] مش [[@app.get]]: الـ route بيتسجّل على الـ router. المسار هنا [[/]] و [[/{order_id}]]، والـ prefix بيتضاف بعدين.

> لو كتبت [[APIRouter(prefix="/orders/")]] بشرطة في الآخر، التطبيق مش هيقوم: [[AssertionError: A path prefix must not end with '/', as the routes will start with '/']] (جربناها).

---

## ٣. [[app/main.py]]

~~~python
from fastapi import FastAPI
from app.routers import orders, users
app = FastAPI()
app.include_router(users.router)
app.include_router(orders.router, prefix="/api/v1")
~~~

- [[from app.routers import orders, users]]: بيجيب الـ modules، وكل واحد جواه متغير اسمه [[router]].
- [[app.include_router(users.router)]]: ركّب routes المستخدمين في التطبيق.
- [[prefix="/api/v1"]] هنا: prefix **زيادة** بيتحط قبل prefix الـ router نفسه.

### المسارات النهائية

نفس الأمر اللي في التجربة:

~~~python
print(list(app.openapi()["paths"]))
~~~

~~~text الناتج
['/users/', '/users/{user_id}', '/api/v1/orders/', '/api/v1/orders/{order_id}']
~~~

| الـ include | الـ router | الـ route | النهائي |
|---|---|---|---|
| (مفيش) | [[/users]] | [[/]] | [[/users/]] |
| [[/api/v1]] | [[/orders]] | [[/{order_id}]] | [[/api/v1/orders/{order_id}]] |

[[app.openapi()]] بيرجّع الـ OpenAPI كـ dict، و [[["paths"]]] فيه كل المسارات كمفاتيح.

---

## ٤. نجرّبه

شغّلناه من الفولدر اللي **فوق** [[app]] (بـ [[fastapi run]]، و [[fastapi dev app/main.py]] نفس الكلام ومعاه reload):

~~~bash
fastapi run app/main.py
~~~

~~~text الناتج
Using import string: app.main:app
~~~

وبعدين:

~~~bash
curl localhost:8000/users/
curl localhost:8000/api/v1/orders/
curl -H "X-User: sara" localhost:8000/api/v1/orders/42
curl -i -H "X-User: sara" localhost:8000/api/v1/orders
curl localhost:8000/orders/
~~~

~~~text الناتج
[{"id":1,"name":"Sara"}]                      200
{"detail":"login first"}                      401  ← الـ dependency وقفته
{"id":42}                                     200
HTTP/1.1 307 Temporary Redirect               ← من غير / في الآخر
{"detail":"Not Found"}                        404  ← /orders لوحدها مش موجودة
~~~

- [[-H "X-User: sara"]] بيضيف header، فالـ dependency عدّت.
- [[/api/v1/orders]] من غير شرطة: الـ route متسجّل [[/api/v1/orders/]]، فـ FastAPI بيرد 307 بـ [[location]] للمسار بالشرطة. ([[curl]] مبيتبعش الـ redirect إلا بـ [[-L]].)
- [[/orders/]] لوحدها 404: الـ orders بقت تحت [[/api/v1]] بس.

ومن PowerShell 7 الـ header بيتبعت بـ hashtable:

~~~powershell
Invoke-RestMethod http://localhost:8000/api/v1/orders/42 -Headers @{ "X-User" = "sara" }
~~~

~~~text الناتج
id
--
42
~~~

---

## ٥. الربط live

في FastAPI الحديث (0.137+، واتجربت على 0.142)، [[include_router]] مش بينسخ الـ routes، بيربط. جربنا نضيف route للـ router **بعد** الـ include:

~~~python
@users.router.get("/extra/stats")
async def late(): return {"late": True}
~~~

و [[/users/extra/stats]] رجّعت [[{'late': True}]]. بس خد بالك من الترتيب: لما سمّيناه [[/late]] بس، [[/users/{user_id}]] المتسجّل قبله مسك الطلب ورجّع 422 (لأن "late" مش int). الـ routes بتتجرب **بترتيب التسجيل**.

---

## الخلاصة

| الحاجة | فين |
|---|---|
| routes مجموعة | ملف فيه [[router = APIRouter(prefix=..., tags=[...])]] |
| auth على كل الملف | [[dependencies=[Depends(...)]]] على الـ router |
| التجميع | [[app.include_router(x.router, prefix=...)]] في main |
| versioning | [[prefix="/api/v1"]] في الـ include |

- المسار النهائي = prefix الـ include + prefix الـ router + مسار الـ route.
- الـ prefix من غير [[/]] في الآخر، و [[@router.get("/")]] بيدّي مسار بشرطة.
- الـ router مش محتاج يعمل import لـ [[app]] (ده بيعمل circular import).
- شغّل من فوق [[app]]، ومتنساش [[__init__.py]].`,
          lines: [
            "Router و Depends.",
            "dependency بتتأكد إن فيه مستخدم (قسم الـ dependencies).",
            R`كل routes الملف تحت [[/orders]]، في مجموعة orders، ومحمية.`,
            R`GET [[/orders/]].`,
            "الدالة.",
            "رجّع.",
            R`GET [[/orders/{order_id}]].`,
            "الدالة.",
            "رجّع.",
            "في main: FastAPI.",
            "الـ modules اللي فيها routers.",
            "التطبيق.",
            "ضيف routes المستخدمين.",
            R`ضيف routes الطلبات تحت [[/api/v1]]: المسار النهائي [[/api/v1/orders/]].`
          ],
          sol: R`في [[/docs]] هتلاقي قسمين: [[users]] و [[orders]]، كل واحد تحت الـ tag اللي في الـ [[APIRouter]] بتاعه. والمسارات، لو الـ users router فيه [[prefix="/users"]] وعنده [[/]] و [[/{user_id}]]: [[['/users/', '/users/{user_id}', '/api/v1/orders/', '/api/v1/orders/{order_id}']]].

لاحظ إن prefix الـ [[include_router]] بيتحط قبل prefix الـ router نفسه، فبقت [[/api/v1/orders/]]. ولاحظ الـ slash في الآخر: [[@router.get("/")]] مع prefix بتدّي [[/orders/]]، ولو طلبت [[/orders]] من غير slash FastAPI بيرد بـ 307 redirect. ولو ظهر [[ModuleNotFoundError: No module named 'app']]، شغّل من الفولدر اللي فوق [[app]] ([[fastapi dev app/main.py]]) ومتنساش [[__init__.py]] في [[app]] و [[app/routers]].`
        }
      ]
    }
]);

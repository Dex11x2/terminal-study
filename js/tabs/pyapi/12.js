// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "أول API",
      l: 2,
      time: R`حوالي ٦ ساعات`,
      goal: [
        R`تعمل API بـ FastAPI وتشغّله بـ [[fastapi dev]] للتطوير و [[fastapi run]] للإنتاج، وتجرّبه من [[/docs]] ومن [[curl]] ومن اختبار [[TestClient]].`,
        R`تعرف كل قيمة جاية منين: من المسار، ولا الـ query، ولا الـ body، ولا header، وتحط عليها قيود بـ [[Annotated]].`,
        R`تقرا رد الـ 422 وتعرف منه الغلط فين بالظبط ([[loc]] و [[type]] و [[msg]]).`,
        R`تتحكم في الرد: شكله بـ response model، وكوده (200 و 201 و 204 و 404)، والـ headers بتاعته.`,
        R`تقسّم API كبير على ملفات بـ [[APIRouter]] من غير circular imports.`,
      ],
      use: {
        prog: R`أي frontend (React أو موبايل) محتاج backend بيرجّع JSON. الوحدة دي بتديك الـ backend ده بالفحص والتوثيق من نفس الكود.`,
        work: R`أغلب شغل الـ backend اليومي: endpoint جديد، وفلتر جديد في الـ query، وحقل جديد في الـ body، وتصليح رد بيسرّب حقل مكانش المفروض يطلع.`,
        net: R`كل endpoint هنا هو HTTP عادي: method ومسار و headers و body وكود رد. اللي بتتعلمه هنا بيتنقل لأي framework تاني (Express و Django و Go).`,
      },
      lab: R`mkdir shop-api && cd shop-api && python -m venv .venv && .venv/Scripts/activate && pip install "fastapi[standard]" pytest`,
      projects: [
        { lvl: 'صغير', t: R`endpoint صحة ونسخة`, what: R`API فيه [[GET /health]] بيرجّع [[{"ok": true}]] و [[GET /version]] بيرجّع اسم التطبيق ونسخته من [[FastAPI(title=..., version=...)]] (اقراهم من [[app.title]] و [[app.version]]). ومعاه ملف [[test_main.py]] بـ [[TestClient]]. من درس «fastapi dev».`, done: R`[[pytest -q]] بيطبع [[3 passed]] على الأقل: [[/health]] بـ 200، و [[/version]] بنفس النسخة اللي في الكود، و [[POST /health]] بـ 405. ولما تغيّر النسخة في [[FastAPI()]] بس، الاختبار والـ [[/openapi.json]] بيتغيّروا مع بعض من غير ما تعدّل في مكان تاني.` },
        { lvl: 'صغير', t: R`محوّل وحدات`, what: R`[[GET /convert?value=10&unit=km&to=mi]]: [[value]] رقم موجب، و [[unit]] و [[to]] من [[Literal["km", "mi", "m"]]]، والرد فيه القيمة الجديدة مقرّبة لرقمين. من درس «path و query».`, done: R`[[?value=10&unit=km&to=mi]] بيرجّع [[6.21]]، و [[?value=-1]] و [[?unit=ft]] كل واحد بيرجّع 422 والـ [[loc]] فيه اسم الباراميتر الغلط، و [[/docs]] بيعرض الـ enum والـ minimum من غير ما تكتب توثيق.` },
        { lvl: 'متوسط', t: R`API ملاحظات في الذاكرة`, what: R`CRUD كامل لملاحظات: [[POST /notes]] (201)، و [[GET /notes]] بـ [[?q=]] للبحث و [[?page=&size=]]، و [[GET /notes/{id}]]، و [[PATCH /notes/{id}]] بـ [[exclude_unset]]، و [[DELETE /notes/{id}]] (204). موديل [[NoteIn]] و [[NotePatch]] و [[NoteOut]]، والـ 404 بـ [[response.status_code]]. من دروس الوحدة كلها.`, done: R`ملف اختبارات بيعمل ملاحظة، ويعدّل عنوانها بس ويتأكد إن النص زي ما هو، ويحذفها ويتأكد إن [[GET]] بعدها 404، ويبعت [[title]] فاضي ويتأكد إن الـ 422 فيها [[["body", "title"]]]. و [[size=500]] بترجع 422.` },
        { lvl: 'متوسط', t: R`مختصر روابط من غير قاعدة`, what: R`[[POST /links]] بياخد [[{"url": "https://..."}]] (نوع [[HttpUrl]] من Pydantic) ويرجّع [[code]] من ٦ حروف، و [[GET /{code}]] بيرجّع [[RedirectResponse]] بـ 307 للرابط، و [[GET /links/{code}/stats]] بعدد مرات الفتح. والـ router في ملف لوحده.`, done: R`رابط من غير [[https://]] أو [[ftp://...]] بيرجع 422، و [[curl -i]] على الكود بيطبع [[307]] و [[location]] صح، والعداد بيزيد مع كل فتحة، و [[/docs]] فيها tag اسمه [[links]].` },
        { lvl: 'كبير', t: R`API حجز قاعات`, what: R`مشروع مقسّم: [[app/main.py]] و [[app/routers/rooms.py]] و [[app/routers/bookings.py]] و [[app/schemas.py]]. القاعات ليها سعة، والحجز فيه [[room_id]] و [[start]] و [[end]] و [[guests]]. الحجز بيترفض لو القاعة مش موجودة (404) أو العدد أكبر من السعة أو الوقت متداخل مع حجز تاني (409)، والقوايم بـ pagination مقفولة بـ [[le=100]]. من الوحدة دي كلها، والتداخل من مسائل تاب Python.`, done: R`[[pytest]] فيه ١٠ اختبارات على الأقل: حجز سليم 201، وتداخل 409، ووقت نهاية قبل البداية 422، وقاعة مش موجودة 404، وعدد أكبر من السعة 422 أو 409 (وانت كاتب ليه اخترت ده)، و [[response model]] مبيطلّعش حقول داخلية. والمسارات كلها تحت [[/api/v1]]، و [[fastapi run]] بيقوم من فوق [[app]] من غير [[ModuleNotFoundError]]، والاختبارات بتعدّي لو اتشغّلت مرتين ورا بعض.`, ext: R`زوّد إلغاء الحجز ([[DELETE]] بـ 204)، و [[GET /rooms/{id}/free?date=]] بيرجّع الأوقات الفاضية، و header [[Location]] في رد الإنشاء. ولما توصل لقسم قاعدة البيانات انقل التخزين لـ Postgres.` },
        { lvl: 'فكرة', t: R`API لحاجة بتعملها بإيدك`, what: R`اختار حاجة بتسجّلها في ورقة أو Excel (مصاريف، تمرين، كتب، مواعيد دكتور) واعملها API: انت اللي بتقرر الـ resources والمسارات والفلاتر والقيود.`, done: R`فيه ٣ resources على الأقل، وكل واحد ليه موديل إدخال وموديل رد، و [[/docs]] مفهومة لحد ميعرفش المشروع، وفيه اختبار لكل endpoint.`, ext: R`اعمل لها صفحة React بسيطة (تاب React)، وبعدين ارفعها على VPS ورا nginx (تاب Python فيه [[fastapi run]] في Docker).` },
      ],
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
          practice: [
            { lvl: 'سريع', t: R`**دوّر بنفسك:** من غير ما ترجع للدرس، اعرف من [[fastapi dev --help]] إزاي تشغّل على port 9000 وعلى كل الشبكات، وإيه الفرق في الـ default بين [[dev]] و [[run]] في [[--host]] و [[--reload]].`, done: R`شغّلت [[fastapi dev main.py --port 9000]] وفتحت [[http://127.0.0.1:9000/docs]]، وكتبت إن [[dev]] الـ host بتاعه [[127.0.0.1]] والـ reload شغال، و [[run]] الـ host [[0.0.0.0]] من غير reload.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** على تطبيق الدرس، اكتب الكود والـ body المتوقع لـ: [[GET /Health]]، و [[GET /health/]] (بشرطة)، و [[GET /health?x=1]]، و [[POST /health]]. وبعدين جرّبهم بـ [[curl -i]].`, done: R`طابقت ورقتك: [[/Health]] بترجع 404 [[{"detail":"Not Found"}]]، و [[/health/]] بترجع 307 و [[location]] من غير الشرطة، و [[?x=1]] بترجع 200 عادي (الـ query الزيادة بتتجاهل)، و POST بترجع 405 و [[allow: GET]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** زميلك سمّى ملفه [[fastapi.py]] وجواه [[from fastapi import FastAPI]] و [[app = FastAPI()]]. جرّب [[python fastapi.py]] و [[fastapi dev fastapi.py]]، واقرا الخطأين، وصلّحها.`, done: R`شفت الخطأين بنصهم: [[python fastapi.py]] بيطبع [[ImportError: cannot import name 'FastAPI' from 'fastapi' (consider renaming ...fastapi.py if it has the same name as a library you intended to import)]] (ملفك غطّى على المكتبة)، و [[fastapi dev]] بيطبع [[Could not find FastAPI app in module]]. غيّرت الاسم لـ [[main.py]] ومسحت [[__pycache__]]، والسيرفر قام وطبع [[Using import string: main:app]].` },
            { lvl: 'تطبيق', t: R`**ابني endpoint:** [[GET /time]] بيرجّع الوقت دلوقتي بصيغة ISO ومنطقة القاهرة ([[zoneinfo]] من تاب Python)، في tag اسمه [[ops]]، ونوع رجوعه مكتوب.`, done: R`[[curl localhost:8000/time]] بيرجّع حاجة زي [[{"now":"2026-10-30T14:05:00+03:00"}]] بالـ offset الصح، و [[/docs]] بتعرضه تحت ops جنب [[/health]]، و [[/openapi.json]] فيه [[operationId]] بتاعه.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** ملف [[test_main.py]] بـ [[TestClient]] بيختبر التلات حالات: [[/]] بيرجّع الرسالة و [[content-length]] بـ [[24]]، و [[POST /health]] 405، و [[/nothing]] 404. وبعدين غيّر الرسالة في الكود وشوف أنهي اختبار وقع وليه.`, done: R`[[pytest -q]] بيطبع [[3 passed]]، ولما غيّرت الرسالة وقع اختبارين بالظبط (الـ body والـ [[content-length]])، وفهمت إن الطول بيتغيّر لأن كل حرف عربي ٢ byte.` },
          ],
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

- [[app]] الـ object اللي هيستقبل كل الطلبات. أمر [[fastapi]] بيدوّر على متغير اسمه [[app]] الأول، وبعدين [[api]]، وبعدين أي object من نوع FastAPI في الملف (اتجرب تحت في «توصل بنفسك»)، فخليه [[app]] عشان محدش يتلخبط.
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

---

## اتشغّل فعلًا: أول اختبار بـ [[TestClient]]

[[/docs]] كويسة وانت بتجرّب بإيدك، بس مش هتفتكر تجرّب كل حاجة بعد كل تعديل. [[TestClient]] بيكلّم التطبيق **من غير سيرفر**: بيبعت الطلب للـ object [[app]] مباشرة جوه نفس الـ process. اتجرب على FastAPI 0.162 و pytest 9.2 و Python 3.14 على ويندوز (الـ TestClient محتاج [[httpx]]، وهو جاي مع [[fastapi[standard]]]).

~~~python
from fastapi.testclient import TestClient
from main import app
client = TestClient(app)
def test_root():
    r = client.get("/")
    assert r.status_code == 200
    assert r.json() == {"message": "أهلًا"}
    assert r.headers["content-length"] == "24"
def test_health_wrong_method():
    r = client.post("/health")
    assert r.status_code == 405
    assert r.headers["allow"] == "GET"
def test_missing():
    r = client.get("/nothing")
    assert r.status_code == 404
    assert r.json() == {"detail": "Not Found"}
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[from main import app]] | بيعمل import للتطبيق نفسه من [[main.py]]، فلازم تشغّل pytest من نفس الفولدر |
| [[TestClient(app)]] | client شبه [[requests]]: [[get]] و [[post]] و [[put]] و [[delete]]، بس بيكلّم الـ app في الذاكرة |
| [[def test_...]] | أي دالة اسمها بيبدأ بـ [[test_]] في ملف اسمه [[test_*.py]] pytest بيلاقيها لوحده |
| [[r.status_code]] | كود الرد كرقم، فبتقارنه بـ [[==]] مع 200 أو 404 |
| [[r.json()]] | الـ body بعد ما يتحوّل من JSON لـ dict، فبتقارن الشكل كله مرة واحدة |
| [[r.headers["allow"]]] | الـ headers مش حساسة لحالة الحروف، فـ [[Allow]] و [[allow]] واحد |

~~~bash
python -m pytest -q
~~~

~~~text الناتج
...                                                                      [100%]
3 passed in 0.51s
~~~

كل نقطة اختبار عدّى. ولو اختبار وقع، pytest بيطبع الـ [[assert]] اللي وقع والقيمتين (اللي جت واللي كنت مستنيها).

## توصل بنفسك: [[fastapi --help]]

مش محتاج تحفظ الخيارات. [[fastapi --help]] بيطبع الأوامر: [[dev]] و [[run]]، ومعاهم أوامر FastAPI Cloud ([[login]] و [[deploy]] و [[cloud]]). و [[fastapi dev --help]] بيطبع خيارات التشغيل، وأهمها على الجهاز ده:

| الخيار | بيعمل إيه |
|---|---|
| [[--host]] | العنوان اللي السيرفر بيسمع عليه. [[127.0.0.1]] جهازك بس، و [[0.0.0.0]] أي حد على الشبكة يقدر يوصل |
| [[--port]] | رقم الـ port لو 8000 مشغول ببرنامج تاني، زي [[--port 9000]] |
| [[--reload]] و [[--no-reload]] | يعيد تشغيل السيرفر لوحده لما تحفظ ملف، أو يقفل الميزة دي |
| [[--app]] | اسم متغير التطبيق لو مش [[app]] ولا [[api]] |
| [[--entrypoint]] أو [[-e]] | المكان كامل زي [[app.main:app]] بدل مسار الملف |
| [[--proxy-headers]] | يصدّق [[X-Forwarded-For]] من nginx عشان يعرف IP العميل الحقيقي |

> اتجرب: لو المتغير اسمه [[server]]، الأمر لقاه برضه وطبع [[Using import string: main:server]] (بيدوّر على [[app]] ثم [[api]] ثم أي object من نوع FastAPI). ولو مفيش FastAPI خالص في الملف بيطبع [[Could not find FastAPI app in module, try using --app]].

## الخلاصة

- [[@app.get(path)]] فوق دالة = endpoint، والدالة بترجّع dict بيبقى JSON.
- [[fastapi dev]] للتطوير (reload و 127.0.0.1)، و [[fastapi run]] للإنتاج (0.0.0.0 من غير reload).
- [[/docs]] و [[/openapi.json]] ببلاش من الكود نفسه.`,
          lines: [
            R`بنجيب الكلاس [[FastAPI]] من المكتبة. كل التطبيق هيبقى object واحد من الكلاس ده، ومن غير السطر ده مفيش حاجة تستقبل الطلبات.`,
            R`بنعمل التطبيق نفسه في متغير [[app]]. أمر [[fastapi]] بيدوّر على [[app]] الأول وبعدين [[api]] وبعدين أي object من نوع FastAPI في الملف. و [[title]] و [[version]] مش بيغيّروا الشغل: بيظهروا في [[/docs]] و [[/openapi.json]].`,
            R`decorator بيسجّل الدالة اللي تحته كـ handler لطلبات **GET** على المسار [[/]] بالظبط. المسار حساس لحالة الحروف، فـ [[/Health]] غير [[/health]] وبترجع 404.`,
            R`الـ handler: دالة [[async]] اسمها مش مهم للـ URL، بس بيبقى [[summary]] و [[operationId]] في التوثيق. ونوع الرجوع [[dict[str, str]]] بيدخل في الـ schema اللي في [[/openapi.json]].`,
            R`أي dict أو list بترجّعه، FastAPI بيحوّله JSON ويبعته بـ [[content-type: application/json]] وكود 200. الحرف العربي بيتبعت UTF-8، فـ [[content-length]] بيعدّ bytes مش حروف.`,
            R`route تاني على [[/health]]، و [[tags=["ops"]]] بتحطه في مجموعة اسمها ops في [[/docs]]. ده الـ endpoint اللي Docker أو الـ load balancer بيسأله كل شوية «انت عايش؟».`,
            R`الـ handler بتاع [[/health]]. نوع الرجوع [[dict[str, bool]]] بيقول إن كل قيمة true أو false، و [[/openapi.json]] بيكتبها [[additionalProperties: boolean]].`,
            R`بيرجّع [[{"ok": True}]]، و [[True]] بتاعة Python بتطلع [[true]] في JSON. لو بعتّ POST على نفس المسار هترجع 405 ومعاها header [[allow: GET]].`,
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، اكتب لكل باراميتر هيتقري منين (path ولا query ولا body): [[def f(user_id: int, q: str, item: ItemIn, page: int = 1)]] على المسار [[/users/{user_id}/items]].`, done: R`[[user_id]] path (اسمه في [[{}]])، و [[q]] و [[page]] query (نوعهم بسيط ومش في المسار)، و [[item]] body (نوعه موديل)، و [[q]] إجباري لأن ملوش default، واتأكدت من [[/docs]] اللي بيكتب جنب كل واحد [[in: path]] أو [[in: query]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** فيه route [[/users/{user_id}]] بـ [[user_id: int]] متسجّل **قبل** [[/users/me]]. إيه اللي هيرجع من [[GET /users/me]]؟ و [[GET /search?q=tea&page=2&page=3]] لو [[page: int]]؟ و [[?q=a+b]]؟`, done: R`جرّبت: [[/users/me]] رجعت 422 [[int_parsing]] و [[input: "me"]] (الأول اتسجّل يكسب)، وصلّحتها بتسجيل [[/users/me]] الأول. و [[page=2&page=3]] رجعت [[3]] (آخر واحدة بتكسب)، و [[q=a+b]] بقت [["a b"]] بمسافة، و [[a%2Bb]] بس هي اللي بتدّي [["a+b"]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[@app.get("/products")]] و [[async def products(limit: int = 20)]]. حد طلب [[?limit=100000]] والقاعدة وقفت. وفيه [[/orders/{id}]] و [[id: str]] والـ id في القاعدة رقم. صلّح الاتنين.`, done: R`[[?limit=100000]] بقت ترجع 422 فيها [[less_than_equal]] بعد [[Annotated[int, Query(ge=1, le=100)]]]، و [[/orders/abc]] بقت 422 بدل ما توصل للقاعدة، و [[/orders/5]] لسه 200.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ابعت بحث عربي: [[/search?q=شاي]] من المتصفح ومن [[curl]] ومن [[Invoke-RestMethod]]، ورجّع في الرد [[len(q)]]. شوف الـ URL اتبعت إزاي في كل واحد.`, done: R`الرد في التلاتة [[{"q":"شاي","len":3}]]، وشفت إن الـ URL اتبعت [[%D8%B4%D8%A7%D9%8A]] (كل حرف عربي ٢ byte، وكل byte بـ [[%]] ورقمين hex)، و FastAPI فكّها لوحده.` },
            { lvl: 'تحدي', t: R`**ابني endpoint:** [[GET /books]] بفلاتر موديل: [[author]] اختياري، و [[year_from]] و [[year_to]] من 1900 لـ 2100، و [[sort]] من [[Literal["title", "year"]]]، و [[model_config = {"extra": "forbid"}]]. واكتب اختبار [[TestClient]] لـ ٤ حالات.`, done: R`الاختبار بيعدّي على: من غير فلاتر 200، و [[year_from=1800]] 422 والـ [[loc]] [[["query", "year_from"]]]، و [[?color=red]] 422 [[extra_forbidden]]، و [[sort=price]] 422. و [[/docs]] بيعرض الفلاتر كباراميترات query منفصلة.` },
          ],
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
| [[ctx]] | تفاصيل القيد اللي اتكسر: [[{"ge":1}]]، والـ frontend يقدر يبني منها رسالته هو بالعربي |

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

---

## اتشغّل فعلًا: حالات طرفية في الـ query والمسار

جربناهم كلهم بـ [[TestClient]] على FastAPI 0.162، على تطبيق فيه [[/users/{user_id}]] متسجّل قبل [[/users/me]]، و [[/search]] بـ [[q: Annotated[str, Query(min_length=2)]]] (من غير default، يعني إجباري) و [[page: int = 1]]:

~~~text الناتج
/users/me                      → 422 int_parsing  "input":"me"   ← الـ route الأولاني مسك الطلب
/users/7                       → 200 {"id":7}
/search                        → 422 {"type":"missing","loc":["query","q"],"msg":"Field required","input":null}
/search?q=%D8%B4%D8%A7%D9%8A   → 200 {"q":"شاي","len":3,"page":1}
/search?q=a+b                  → 200 {"q":"a b",...}             ← الـ + في الـ query = مسافة
/search?q=a%2Bb                → 200 {"q":"a+b",...}
/search?q=tea&page=            → 422 int_parsing  "input":""     ← فاضي مش بيبقى الـ default
/search?q=tea&page=2&page=3    → 200 {"page":3}                  ← آخر قيمة بتكسب
/search?q=tea&extra=1          → 200                             ← الباراميتر الزيادة بيتجاهل
~~~

| الحالة | ليه حصل كده | تعمل إيه |
|---|---|---|
| [[/users/me]] بترجع 422 | الـ routes بتتجرب بترتيب التسجيل، والأول قبل أي نص في مكان [[{user_id}]] | سجّل المسارات الثابتة ([[/users/me]]) قبل اللي فيها متغير |
| [[missing]] و [[input: null]] | باراميتر من غير default يبقى إجباري، والـ [[loc]] بيقول اسمه | حط default لو اختياري، أو سيبه إجباري ووثّقه |
| العربي جه [[%D8%B4...]] | الـ URL مينفعش فيه غير حروف ASCII، فالمتصفح و curl بيعملوا percent-encoding | ولا حاجة: FastAPI بيفك الترميز لوحده و [[len]] بيعدّ ٣ حروف |
| [[+]] بقت مسافة | ده معيار الـ forms القديم في الـ query string | لو القيمة فيها [[+]] حقيقية (رقم تليفون دولي) ابعتها [[%2B]] |
| [[page=]] فاضية بـ 422 | الباراميتر **اتبعت** بنص فاضي، والنص الفاضي مش رقم، فالـ default مش بيتطبق | الـ frontend ميبعتش الباراميتر خالص لو مفيش قيمة |
| [[page=2&page=3]] بـ 3 | النوع [[int]] مش list، فـ FastAPI بياخد آخر قيمة | لو عايز كل القيم خلّي النوع [[list[int]]] |
| [[extra=1]] اتجاهل | الـ query الزيادة مش بتترفض افتراضيًا | موديل فلاتر بـ [[extra="forbid"]] لو عايز ترفضها |

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
            R`[[Annotated]] بيلزق معلومة زيادة جنب النوع (القيد وجاي منين)، و [[Literal]] نوع بيقبل قيم محددة بالاسم بس. الاتنين من [[typing]] في Python نفسها مش من FastAPI.`,
            R`[[Path]] و [[Query]] هما المعلومة الزيادة اللي جوه [[Annotated]]: بيقولوا لـ FastAPI «القيمة دي من المسار» أو «من الـ query»، وعليها قيود زي [[ge]] و [[max_length]].`,
            R`[[BaseModel]] و [[Field]] عشان نجمّع الفلاتر في موديل واحد في آخر المثال، بدل ١٠ باراميترات في الدالة.`,
            R`التطبيق. كل الـ routes اللي تحت بتتسجّل عليه بالـ decorators.`,
            R`المسار فيه [[{item_id}]]: الحتة دي متغيرة، واسمها لازم يطابق اسم باراميتر في الدالة، وإلا FastAPI هيعتبر الباراميتر query.`,
            R`[[int]] بيخلي FastAPI يحوّل النص [["5"]] لرقم، و [[Path(ge=1)]] بيرفض صفر والسالب بـ 422 فيها [[greater_than_equal]] قبل ما الدالة تشتغل.`,
            R`بيرجّع الرقم بعد التحويل، فهتشوف [[5]] من غير علامات تنصيص في الرد، وده دليل إن التحويل حصل.`,
            R`route تاني على [[/items]] من غير أي [[{}]]، فكل الباراميترات اللي تحت هتيجي من الـ query string (اللي بعد [[?]]).`,
            R`الدالة بتاخد ٥ باراميترات، كل واحد في سطر عشان القيود تتقري. القاعدة: مش في المسار ونوعه بسيط يبقى query.`,
            R`نص بحث اختياري: [[str | None]] و default [[None]]، و [[max_length=50]] بيمنع حد يبعت بحث طوله ١٠ آلاف حرف يتقل القاعدة.`,
            R`رقم الصفحة: default 1 لو مبعتهوش، و [[ge=1]] بيرفض [[page=0]]. ولو بعت [[page=]] فاضية بيرجع 422 [[int_parsing]] مش 1.`,
            R`حجم الصفحة بين 1 و 100. الـ [[le=100]] هو اللي بيحمي القاعدة من [[?size=1000000]]، ومتسيبش أي limit من غير حد أقصى.`,
            R`list نصوص: الاسم بيتكرر [[?tags=a&tags=b]] فتبقى [[["a", "b"]]]. و [[Query()]] هنا لازمة، لأن من غيرها FastAPI هيفتكر الـ list جاية في الـ body.`,
            R`[[Literal["new", "price"]]] بيقبل الكلمتين دول بس، و [[sort=old]] بيرجع 422 برسالة فيها القيم المسموحة، و [[/docs]] بيعرضها كقايمة.`,
            R`قفلة الباراميترات وبداية جسم الدالة.`,
            R`بيرجّع كل القيم زي ما FastAPI حوّلها، عشان تشوف بعينك [[None]] بقت [[null]] و [[page]] بقت رقم.`,
            R`موديل Pydantic للفلاتر: لما الفلاتر تكتر، تكتبها مرة هنا وتستخدمها في كذا endpoint.`,
            R`سعر أقل حد مش سالب: أول argument في [[Field(0, ...)]] هو الـ default، و [[ge=0]] بيرفض [[-1]] بـ 422.`,
            R`bool بـ default [[True]]. من الـ query بيقبل [[true/false]] و [[1/0]] و [[yes/no]] و [[on/off]]، وأي كلمة تانية زي [[maybe]] بترجع 422.`,
            R`route تالت بيستخدم الموديل كله كفلاتر.`,
            R`[[Annotated[Filters, Query()]]]: الموديل ده من الـ **query** مش من الـ body. من غير [[Query()]] أي باراميتر نوعه موديل FastAPI بيدوّر عليه في الـ body (من FastAPI 0.115).`,
            R`بيرجّع الموديل نفسه، و FastAPI بيحوّله JSON: [[{"min_price":0.0,"in_stock":true}]] لو مبعتش حاجة.`,
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
    price: float = Field(gt=0, allow_inf_nan=False)
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب من الذاكرة الفرق بين [[model_dump()]] و [[model_dump(exclude_unset=True)]] على [[ProductPatch(price=20)]]، وإيه اللي بيحصل للحقل الزيادة [["role": "admin"]] في الـ body.`, done: R`شغّلت السطرين في Python وطلعوا [[{'name': None, 'price': 20.0}]] و [[{'price': 20.0}]]، وبعتّ [[role]] في POST والرد 201 من غيره ومش موجود في [[DB]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب الكود والـ body المتوقع لـ ٤ طلبات على [[POST /products]]: الـ JSON صح بس من غير header [[Content-Type]]، و list [[[{...}]]] بدل object، و [[{"name": "Tea", "price": true}]]، و [[{"name": "  ", "price": 5}]].`, done: R`جرّبت بـ [[TestClient]] أو [[curl]]: الأولى والتانية 422 [[model_attributes_type]] و [[loc: ["body"]]]، والتالتة 201 والسعر [[1.0]] (الـ bool بقى رقم في الوضع lax)، والرابعة 201 والاسم مسافتين (القيد على الطول مش على المحتوى). وكتبت هتصلّح الأخيرة إزاي.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** شيل [[allow_inf_nan=False]] من السعر، وابعت [[{"name": "Tea", "price": Infinity}]] بـ [[curl]] و header JSON. شوف الرد وشوف [[DB]]، وبعدين رجّعها.`, done: R`من غيرها الرد 500 والمنتج **اتحفظ** في [[DB]] بسعر [[inf]] (الفحص عدّى والرد هو اللي وقع)، ومعاها المنتج مبيتحفظش خالص. وكتبت ليه [[gt=0]] لوحده مش كفاية ([[inf > 0]] صح).` },
            { lvl: 'تطبيق', t: R`**ابني endpoint:** [[PUT /shops/{shop_id}/products/{pid}?notify=yes]] بياخد body منتج و header [[X-Request-ID]] اختياري، ويرجّعهم كلهم. وبعدين [[POST /orders]] بـ body فيه [[product]] و [[qty]] منفصلين ([[Body(gt=0)]] للـ qty).`, done: R`الرد الأول [[{"shop":3,"pid":9,"product":{...},"notify":true,"rid":"abc"}]]، والتاني بيقبل [[{"product": {...}, "qty": 2}]] وبيرفض [[qty: 0]] بـ 422 والـ [[loc]] [[["body", "qty"]]].` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** ٦ اختبارات [[TestClient]] لـ POST و PATCH: سليم 201، واسم قصير وسعر سالب مع بعض (خطأين في رد واحد)، و JSON بايظ [[json_invalid]]، و PATCH بالسعر بس والاسم فضل، و PATCH بـ [[{"name": null}]]، و PATCH على id مش موجود.`, done: R`الستة بيعدّوا، والأخير مكتوب كـ [[TestClient(app, raise_server_exceptions=False)]] ومستني 500، وجنبه تعليق إنه هيتصلّح لـ 404 في درس «HTTPException». واختبار الـ null بيأكد إن الاسم بقى [[None]] وكاتب جنبه ليه.` },
          ],
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
    price: float = Field(gt=0, allow_inf_nan=False)
    tags: list[str] = []
~~~

| الحقل | معناه |
|---|---|
| [[class ProductIn(BaseModel)]] | موديل: كل سطر تحته حقل بنوعه |
| [[name: str = Field(...)]] | نص، طوله من ٢ لـ ١٠٠. ومفيش default، فـ**إجباري** |
| [[price: float = Field(gt=0, allow_inf_nan=False)]] | رقم عشري، [[gt]] = greater than: أكبر من صفر. و [[allow_inf_nan=False]] بيرفض اللانهاية و NaN (الباج اللي اتشرح في «اتشغّل فعلًا» تحت) |
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
| JSON بايظ [[{"name": "Cake"]] | 422 [[json_invalid]] و [[JSON decode error]]، والـ [[loc]] بقى [[["body", 15]]]: رقم الحرف اللي الـ parser وقف عنده، و [[ctx]] فيه [[Expecting ',' delimiter]] |
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

---

## اتشغّل فعلًا: path و query و body و header في طلب واحد

FastAPI بيعرف كل باراميتر جاي منين من **النوع والاسم**. جربنا الكل في endpoint واحد على FastAPI 0.162:

~~~python
@app.put("/shops/{shop_id}/products/{pid}")
async def put(shop_id: int, pid: int, product: ProductIn, notify: bool = False,
              x_request_id: Annotated[str | None, Header()] = None):
    return {"shop": shop_id, "pid": pid, "product": product, "notify": notify, "rid": x_request_id}
~~~

~~~text الناتج: PUT /shops/3/products/9?notify=yes  و header X-Request-ID: abc
200 {"shop":3,"pid":9,"product":{"name":"Tea","price":12.0},"notify":true,"rid":"abc"}
~~~

| الباراميتر | جه منين | ليه |
|---|---|---|
| [[shop_id]] و [[pid]] | المسار | اسمهم موجود بين [[{}]] في الـ URL |
| [[product: ProductIn]] | الـ body | نوعه موديل Pydantic |
| [[notify: bool]] | الـ query | نوع بسيط ومش في المسار |
| [[x_request_id]] مع [[Header()]] | الـ headers | [[Header()]] بيقول كده، و FastAPI بيحوّل [[_]] لـ [[-]] فبيدوّر على [[x-request-id]] |

### [[Body(embed=True)]] وأكتر من حاجة في الـ body

| الكود | الـ body اللي بيتقبل |
|---|---|
| [[product: ProductIn]] لوحده | الموديل نفسه: [[{"name": "Tea", "price": 12}]] |
| [[product: Annotated[ProductIn, Body(embed=True)]]] | ملفوف باسمه: [[{"product": {"name": "Tea", "price": 12}}]]. والشكل الأول بيرجع 422 [[missing]] و [[loc: ["body", "product"]]] |
| [[product: ProductIn]] و [[qty: Annotated[int, Body(gt=0)]]] | كل واحد باسمه: [[{"product": {...}, "qty": 2}]] |

### الحاجات اللي بتكسر الـ body

| اللي اتبعت | الرد |
|---|---|
| JSON صح بس [[Content-Type: text/plain]] أو من غير header خالص | 422 [[model_attributes_type]] و [[loc: ["body"]]]: FastAPI مقراش الـ body كـ JSON، فوصل نص للموديل |
| list [[[{"name": "Tea", "price": 12}]]] بدل object | 422 نفس النوع: الموديل محتاج object |
| [[{"price": true}]] | 201 والسعر [[1.0]]: الوضع lax بيحوّل الـ bool لرقم ([[strict=True]] بيمنعه) |
| [[{"name": "  "}]] | 201: [[min_length]] بيعدّ المسافات حروف. [[str_strip_whitespace]] في الموديل بيحلها (قسم Pydantic) |
| [[{"name": "🍵"}]] | 422 [[string_too_short]]: الإيموجي حرف واحد |

### الباج اللي كان في المثال: [[Infinity]]

النسخة القديمة من المثال كانت [[price: float = Field(gt=0)]]. JSON المعيار مفيهوش [[Infinity]]، بس Python بتقبلها وهي بتقرا، و Pydantic بيقبل [["inf"]] و [[1e400]] (رقم أكبر من أي float). و [[inf > 0]] صح، فالفحص عدّى:

~~~text الناتج (بـ TestClient و Content-Type: application/json)
{"name": "Tea", "price": Infinity}   → 500 Internal Server Error
{"name": "Tea", "price": "inf"}      → 500
{"name": "Tea", "price": 1e400}      → 500
DB بعدها: [inf, inf, inf]           ← المنتجات اتحفظت فعلًا
ValueError: Out of range float values are not JSON compliant: inf
~~~

يعني الدالة اشتغلت وحفظت، وبعدين FastAPI مقدرش يكتب [[inf]] في رد JSON فوقع. العميل شاف 500 وفاكر إن مفيش حاجة اتحفظت، فهيبعت تاني. التصليح في المثال: [[Field(gt=0, allow_inf_nan=False)]]، وبعدها [["inf"]] بترجع 422 [[finite_number]] و [[Input should be a finite number]] والدالة مبتشتغلش. لكن [[Infinity]] الخام في الـ JSON لسه بترجع 500 حتى مع الإعداد ده، لأن رد الـ 422 الافتراضي فيه [[input]] (القيمة نفسها) ومينفعش يتكتب JSON. الحل الكامل handler للـ 422 مبيرجّعش [[input]] (درس «exception handlers»). وفي الفلوس الأحسن أصلًا [[price_cents: int]].

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
            R`[[FastAPI]] للتطبيق، و [[status]] فيه أسماء أكواد HTTP زي [[HTTP_201_CREATED]] عشان الكود يتقري من غير ما تحفظ الأرقام.`,
            R`[[BaseModel]] بيوصف شكل الـ body، و [[Field]] بيحط قيود على كل حقل (الطول، وأكبر من، وأصغر من).`,
            R`التطبيق، وكل الـ routes اللي تحت بتتسجّل عليه.`,
            R`موديل الإنشاء: ده بالظبط الشكل المسموح يتبعت في POST. أي حقل مش هنا بيتشال من غير ما يوصلك.`,
            R`[[name]] نص طوله من ٢ لـ ١٠٠ حرف، ومفيش default فهو **إجباري**. الطول بيتعدّ بالحروف، فـ [["شا"]] تعدّي، وإيموجي واحد ([["🍵"]]) يترفض لأنه حرف واحد.`,
            R`السعر رقم أكبر من صفر، و [[allow_inf_nan=False]] بيرفض [[Infinity]] و [["inf"]] و [[NaN]]. من غيره [[Infinity]] بتعدّي من [[gt=0]] وتتحفظ، وبعدين الرد يقع 500 (اتجرب، تحت).`,
            R`list نصوص اختيارية بـ default فاضية. الـ [[[]]] كـ default غلطة في دالة Python عادية، بس آمن في Pydantic لأنه بيعمل نسخة جديدة لكل object.`,
            R`موديل التعديل منفصل: في PATCH العميل بيبعت الحقول اللي عايز يغيّرها بس، فكل حقل هنا اختياري.`,
            R`اختياري ([[str | None]] و default [[None]])، ولو اتبعت فعلًا لازم يبقى حرفين على الأقل. بس [[null]] صريحة بتعدّي، لأن القيد مبيتطبقش على [[None]].`,
            R`نفس فكرة الاسم للسعر: اختياري، ولو اتبعت لازم يبقى أكبر من صفر.`,
            R`«قاعدة بيانات» في الذاكرة: dict مفتاحه الـ id وقيمته المنتج كـ dict. بتتمسح لما السيرفر يقفل أو يعمل reload، فهي للتجربة بس.`,
            R`POST على [[/products]]، و [[status_code=201]] بيخلي النجاح يرجع 201 Created بدل 200، وده اللي الـ frontend والمعيار مستنيينه للإنشاء.`,
            R`الباراميتر نوعه موديل، فـ FastAPI بيقرا الـ body كـ JSON ويفحصه بـ [[ProductIn]]. لو فيه غلط بيرجع 422 والدالة **مبتشتغلش أصلًا**.`,
            R`id جديد بـ [[len(DB) + 1]]: للتجربة بس. لو اتمسح منتج الرقم هيتكرر، والقاعدة الحقيقية بتعمل الـ id بنفسها.`,
            R`[[model_dump()]] بيحوّل الموديل لـ dict عادي عشان نخزّنه. الحقول الزيادة اللي العميل بعتها مش موجودة فيه أصلًا.`,
            R`بيرجّع dict جديد: [[id]] الأول، و [[**DB[new_id]]] بتفرد مفاتيح المنتج جواه، فالرد [[{"id":1,"name":"Tea",...}]].`,
            R`PATCH على منتج واحد: المسار فيه [[{product_id}]] عشان نعرف أنهي منتج.`,
            R`باراميترين: [[product_id]] من المسار (اسمه في [[{}]])، و [[patch]] من الـ body (نوعه موديل). FastAPI بيفرّق لوحده.`,
            R`[[exclude_unset=True]] بيرجّع الحقول اللي اتبعتت بس، و [[update]] بيكتبها فوق القديم. من غيره [[{"price": 20}]] كانت هتمسح الاسم وتخليه [[None]]. ولو الـ id مش موجود [[DB[product_id]]] بترمي [[KeyError]] = 500.`,
            R`بيرجّع المنتج بعد التعديل، فالعميل يشوف الشكل النهائي من غير ما يعمل GET تاني.`,
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** امتى تكتب [[-> UserOut]] وامتى [[response_model=UserOut]]؟ وإيه اللي بيحصل للعميل لو الدالة رجّعت إيميل بايظ؟ اكتب الإجابة في ٣ سطور.`, done: R`كتبت: نوع رجوع لما الدالة بترجّع نفس الموديل أو ابنه، و [[response_model]] لما بترجّع ORM object أو dict، والإيميل البايظ بيدّي 500 مش 422 لأنه غلط السيرفر. وجربت الحالة التالتة وشفت [[ResponseValidationError]] في الترمنال.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** endpoint [[@app.delete("/items/{id}", status_code=204)]] جواه [[return {"deleted": id}]]. إيه اللي هيوصل للعميل؟ و [[response_model_exclude_none=True]] على رد فيه [[note: None]]؟`, done: R`جرّبت: الـ DELETE رجع 204 و body فاضي خالص ([[b'']]) والـ dict اتجاهل، والتاني رجع الرد من غير مفتاح [[note]] خالص، مش [[null]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** endpoint [[@app.get("/me")]] بيرجّع [[user.__dict__]] من غير response model، وفيه [[password_hash]] و [[reset_token]]. صلّحه من غير ما تمسح الحقول من الـ object.`, done: R`الرد بقى فيه [[id]] و [[email]] و [[name]] بس بعد [[-> UserOut]] أو [[response_model]]، و [[/openapi.json]] بقى فيه schema للرد بدل [[{}]]، والـ object نفسه لسه فيه الحقلين (اطبعته في اللوج واتأكدت).` },
            { lvl: 'تطبيق', t: R`**ابني endpoint:** [[PUT /items/{id}]] بيعمل «upsert»: لو موجود يعدّله ويرجع 200، ولو مش موجود يعمله ويرجع 201 ومعاه header [[Location: /items/{id}]]، باستخدام باراميتر [[response: Response]].`, done: R`[[curl -i -X PUT .../items/1]] (موجود) بيطبع 200 من غير [[location]]، و [[.../items/2]] (جديد) بيطبع 201 و [[location: /items/2]]، والـ body في الحالتين بشكل [[ItemOut]].` },
            { lvl: 'تحدي', t: R`**اشرحها واختبرها:** اعمل [[responses={404: {"description": "Item not found"}}]] على GET، وافتح [[/openapi.json]] واعرف الأكواد اللي اتوثّقت. وبعدين اكتب اختبار بيمشي على [[app.openapi()["paths"]]] ويتأكد إن مفيش أي schema رد فيها [[password_hash]].`, done: R`[[list(responses)]] طلعت [[['200', '404', '422']]] (الـ 422 FastAPI بيضيفها لوحده لأي endpoint فيه باراميترات)، والاختبار بيعدّي، ولما غيّرت نوع رجوع لـ [[UserInDB]] وقع.` },
          ],
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
| [[return {"id": 1, "email": "x", "name": "Sara"}]] | FastAPI فحص الـ dict وهو طالع ورمى [[ResponseValidationError]] و [[loc: ('response', 'email')]] و [[value is not a valid email address: An email address must have an @-sign.]] |
| [[return UserInDB(..., email="x", ...)]] | [[ValidationError: 1 validation error for UserInDB]]: وقع جوه دالتك قبل ما توصل لـ FastAPI |

ليه 500؟ 422 معناها «العميل بعت غلط»، وهنا العميل مبعتش حاجة: السيرفر هو اللي طلّع داتا مخالفة للعقد، فده bug عندك.

---

---

## اتشغّل فعلًا: كود الرد والـ headers

الـ decorator بيحدد كود **النجاح** الثابت ([[status_code=201]])، بس ساعات الكود بيتحدد جوه الدالة. باراميتر نوعه [[Response]] بيدّيك الرد قبل ما يتبعت، تغيّر كوده وتضيف headers، والـ response model لسه شغال على الـ body. اتجرب على FastAPI 0.162:

~~~python
@app.put("/items/{item_id}", response_model=ItemOut)
async def upsert(item_id: int, response: Response):
    if item_id in DB:
        return DB[item_id]
    DB[item_id] = {"id": item_id, "name": "New"}
    response.status_code = status.HTTP_201_CREATED
    response.headers["Location"] = f"/items/{item_id}"
    return DB[item_id]
~~~

~~~text الناتج
PUT /items/1  (موجود)  → 200  location: None      {"id":1,"name":"Tea","note":null}
PUT /items/2  (جديد)   → 201  location: /items/2  {"id":2,"name":"New","note":null}
~~~

| السطر | بيعمل إيه |
|---|---|
| [[response: Response]] | FastAPI بيشوف النوع [[Response]] فبيدّيك object الرد بدل ما يدوّر على باراميتر في الطلب |
| [[response.status_code = 201]] | بيغيّر كود الرد ده بس، والـ default اللي في الـ decorator (200) للباقي |
| [[response.headers["Location"]]] | header بيقول الحاجة الجديدة اتعملت فين، والعميل يقدر يعمل GET عليه |
| [[return DB[item_id]]] | الـ body لسه بيعدّي على [[ItemOut]]، فـ [[note]] ظهرت [[null]] لأنها في الموديل |

### خيارات الـ decorator اللي بتغيّر الرد

| الخيار | جربنا | النتيجة |
|---|---|---|
| [[response_model_exclude_unset=True]] | الصف مفيهوش [[note]] أصلًا | [[{"id":1,"name":"Tea"}]]: الحقل اللي متحطش مبيظهرش |
| [[response_model_exclude_none=True]] | رجّعنا [[note: None]] صريحة | [[{"id":5,"name":"x"}]]: أي حقل قيمته None بيتشال |
| [[status_code=204]] ورجّعنا dict | [[return {"deleted": 2}]] | 204 و body فاضي [[b'']]: الـ 204 معناها «مفيش محتوى» فاللي رجعته بيتجاهل |
| [[responses={404: {...}}]] | فتحنا [[/openapi.json]] | الأكواد الموثّقة [[['200', '404', '422']]]: الـ 404 بوصفك، والـ 422 FastAPI بيضيفها لوحده |

### الأكواد اللي هتستخدمها في 90٪ من الوقت

| الكود | إمتى |
|---|---|
| 200 OK | قراية أو تعديل نجح ورجّعت الشكل الجديد |
| 201 Created | POST عمل حاجة جديدة، ويفضّل معاه [[Location]] |
| 204 No Content | DELETE نجح، أو تعديل مش محتاج يرجّع حاجة |
| 400 Bad Request | الطلب مفهوم بس مخالف لقاعدة عندك (مش فحص شكل) |
| 401 و 403 | مش مسجّل دخول، أو مسجّل بس مش مسموحله (قسم الـ dependencies) |
| 404 Not Found | الـ resource مش موجود |
| 409 Conflict | تعارض: إيميل مستخدم، أو حجز متداخل |
| 422 Unprocessable Content | FastAPI بيرجّعها لوحده لما الشكل أو النوع غلط |
| 500 | bug عندك، زي رد مش مطابق للـ response model |

ورمي 404 و 409 بشكل صح بـ [[HTTPException]] في قسم «الأخطاء والـ middleware».

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
            R`[[FastAPI]] بس، لأن الـ response model مش محتاج import: هو مجرد نوع رجوع أو argument في الـ decorator.`,
            R`[[BaseModel]] للموديلات، و [[EmailStr]] نوع جاهز بيرفض أي نص مش إيميل. محتاج مكتبة [[email-validator]]، وهي جاية مع [[fastapi[standard]]].`,
            R`التطبيق، وعليه الـ routes الاتنين اللي تحت.`,
            R`[[UserOut]] هو **الشكل المسموح يطلع** للعميل: قايمة بيضا. أي حقل مش مكتوب هنا مش هيظهر في الرد مهما الدالة رجّعت.`,
            R`[[id]] رقم إجباري. لو اللي رجع من الدالة مفيهوش id، FastAPI بيرمي [[ResponseValidationError]] والعميل ياخد 500.`,
            R`الإيميل بيتفحص **وهو طالع** كمان: لو القاعدة فيها إيميل بايظ، الرد بيقع 500 بدل ما يطلّع داتا مخالفة للعقد اللي في [[/docs]].`,
            R`الاسم نص إجباري. ولو عايز حقل اختياري في الرد تكتبه [[str | None = None]].`,
            R`[[UserInDB]] بيورث كل حقول [[UserOut]] ويزوّد عليها. ده الشكل اللي جوه السيستم وبيتعامل مع القاعدة.`,
            R`[[password_hash]]: الحقل اللي **ممنوع** يطلع. موجود في [[UserInDB]] بس، فالـ response model هيشيله.`,
            R`class عادي مش Pydantic، زي الصف اللي بيرجع من SQLAlchemy: object بـ attributes مش dict.`,
            R`الـ constructor بياخد ٤ قيم، منهم [[password_hash]] عشان نثبت إنه مش هيطلع حتى من object عادي.`,
            R`بيحط القيم الأربعة في أربع attributes في سطر واحد (tuple unpacking). FastAPI هيقرا [[row.id]] و [[row.email]] و [[row.name]] منها بعدين.`,
            R`GET على مستخدم واحد، و [[user_id]] من المسار.`,
            R`[[-> UserOut]]: نوع الرجوع هو الـ response model. FastAPI بيستخدمه للفحص والتنضيف والتوثيق، والمحرر و mypy بيفهموه كمان.`,
            R`بيرجّع [[UserInDB]] كامل بالـ hash، و FastAPI بيعدّيه على [[UserOut]] فالرد [[{"id":1,"email":...,"name":"Sara"}]] من غير [[password_hash]]. و [[$argon2id$...]] شكل hash وهمي («تشفير الباسورد» في وحدة الأمان).`,
            R`هنا الدالة بترجّع objects عادية مش [[UserOut]]، فلو كتبنا نوع رجوع mypy هيعترض. عشان كده الموديل في [[response_model=list[UserOut]]] والدالة من غير نوع رجوع.`,
            R`الدالة من غير نوع رجوع، لأن [[response_model]] هو اللي بيحدد شكل الرد. ولو الاتنين موجودين [[response_model]] بيكسب.`,
            R`بيرجّع list فيها object واحد. FastAPI بيقرا الـ attributes من كل object ويبني [[UserOut]]، والـ hash بيتشال من كل عنصر.`,
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** prefix الـ include [[/api/v2]]، والـ router [[/invoices]]، والـ route [[/{id}/pdf]]. اكتب المسار النهائي، وإيه اللي هيحصل لو الـ prefix بتاع الـ router [[/invoices/]].`, done: R`كتبت [[/api/v2/invoices/{id}/pdf]]، وجربت الشرطة وشفت [[AssertionError: A path prefix must not end with '/']] والتطبيق مقامش، و [[print(list(app.openapi()["paths"]))]] بعد التصليح طبع المسار اللي كتبته.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** router بـ [[dependencies=[Depends(require_user)]]] و [[include_router(..., dependencies=[Depends(audit)])]]، والاتنين بيضيفوا اسمهم لـ list. طلب من غير header: إيه اللي في الـ list؟ وإيه الكود؟`, done: R`جرّبت: الـ list [[['audit', 'user']]] (الـ include الأول)، والكود 401 [[login first]]، يعني [[audit]] اشتغل حتى لطلب اترفض. وكتبت ده مهم ليه لو [[audit]] بيكتب في القاعدة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[app/routers/users.py]] فيه [[from app.main import app]] عشان يستخدم [[app.state]]، و [[main.py]] بيعمل import للـ router. شغّل واقرا الخطأ وصلّحه.`, done: R`شفت [[ImportError]] فيه [[partially initialized module]] (circular import)، وشلت الـ import وبقيت توصل للـ state من [[request.app.state]] جوه الـ route، والتطبيق قام.` },
            { lvl: 'تطبيق', t: R`**ابني:** router جوه router: [[shops = APIRouter(prefix="/shops/{shop_id}")]] وجواه [[items = APIRouter(prefix="/items")]] بـ [[shops.include_router(items)]]، والـ route بتاع العنصر بياخد [[shop_id]] و [[item_id]].`, done: R`[[list(app.openapi()["paths"])]] فيها [[/api/v1/shops/{shop_id}/items/{item_id}]]، و [[GET /api/v1/shops/3/items/9]] بيرجّع [[{"shop":3,"item":9}]]: الـ [[shop_id]] اللي في prefix الأب وصل لدالة الابن.` },
            { lvl: 'تحدي', t: R`**refactor:** خد [[main.py]] فيه ١٠ routes لمنتجات وطلبات ومستخدمين وقسّمه لـ [[app/routers/]] و [[app/schemas.py]] و [[app/deps.py]] من غير ما يتغيّر ولا مسار.`, done: R`قبل وبعد طبعت [[sorted(app.openapi()["paths"])]] والقايمتين متطابقين حرف بحرف، والاختبارات القديمة عدّت من غير تعديل، و [[main.py]] بقى أقل من ٢٠ سطر.` },
          ],
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

---

## اتشغّل فعلًا: router جوه router وترتيب الـ dependencies

الـ router ممكن يتركّب جوه router تاني، والـ prefix بتاع الأب ممكن يبقى فيه متغير. اتجرب على FastAPI 0.162:

~~~python
items = APIRouter(prefix="/items", tags=["items"])
@items.get("/{item_id}")
async def get_item(shop_id: int, item_id: int):
    return {"shop": shop_id, "item": item_id}
shops = APIRouter(prefix="/shops/{shop_id}", dependencies=[Depends(require_user)])
shops.include_router(items)
app = FastAPI()
app.include_router(shops, prefix="/api/v1", dependencies=[Depends(audit)])
~~~

~~~text الناتج
['/api/v1/shops/{shop_id}/items/{item_id}']
GET /api/v1/shops/3/items/9  و X-User: sara  → 200 {"shop":3,"item":9}   calls: ['audit', 'user']
GET /api/v1/shops/3/items/9  من غير header   → 401 {"detail":"login first"}   calls: ['audit', 'user']
~~~

| اللي شفناه | معناه |
|---|---|
| [[shop_id]] وصل لـ [[get_item]] | متغير في prefix الأب بيبقى path parameter عادي لكل routes الابن |
| [[audit]] اتنادى قبل [[user]] | الـ dependencies من برّه لجوه: الـ include، وبعدين الـ router، وبعدين الـ route نفسه |
| [[audit]] اشتغل في الـ 401 كمان | كل اللي قبل الـ dependency اللي رفضت بيكون اشتغل خلاص، فمتحطش كتابة في القاعدة في dependency بتشتغل قبل الـ auth |

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
            R`[[APIRouter]] مجموعة routes بتتسجّل لوحدها وبعدين تتركّب في التطبيق، و [[Depends]] عشان نحط فحص على الملف كله.`,
            R`[[require_user]] dependency بتتأكد إن فيه مستخدم (بنكتبها في [[app/deps.py]] وبتتشرح في قسم «Dependencies»). الـ import من [[app.deps]] مش من [[main]]، وده اللي بيمنع الـ circular import.`,
            R`الـ router: كل الـ routes هنا مسارها بيبدأ بـ [[/orders]]، وفي مجموعة orders في [[/docs]]، و [[require_user]] بتتنادى قبل أي واحد فيهم. والـ prefix **من غير** شرطة في الآخر وإلا التطبيق مش هيقوم.`,
            R`[[@router.get]] مش [[@app.get]]: بيتسجّل على الـ router. المسار [[/]] + الـ prefix = [[/orders/]] بشرطة، فـ [[/orders]] من غيرها بترجع 307.`,
            R`الـ handler بتاع قايمة الطلبات. مش محتاج باراميتر للمستخدم لأن الـ dependency في الـ router للفحص بس وقيمتها مش بتتبعت.`,
            R`بيرجّع list فاضية كمثال. في مشروع حقيقي هنا بتنادي service أو repository، والـ router نفسه بيفضل رفيع.`,
            R`GET على طلب واحد: المسار النهائي هيبقى [[/api/v1/orders/{order_id}]] بعد ما الـ prefixes تتركّب.`,
            R`[[order_id: int]] من المسار، فـ [[/orders/abc]] بترجع 422 قبل ما الدالة تشتغل.`,
            R`بيرجّع الـ id اللي اتحوّل رقم، عشان تتأكد من الـ prefix والتحويل من [[curl]].`,
            R`في ملف [[app/main.py]]: الكلاس [[FastAPI]] للتطبيق اللي هيجمع كل الـ routers.`,
            R`بيعمل import للـ modules نفسها، وكل واحد جواه متغير اسمه [[router]]. لازم [[__init__.py]] في [[app]] و [[app/routers]]، وتشغّل من الفولدر اللي فوق [[app]].`,
            R`التطبيق الوحيد في المشروع. الـ routers مبيعرفوش عنه حاجة، وده اللي بيخليهم قابلين للاختبار لوحدهم.`,
            R`بيركّب routes المستخدمين بالـ prefix بتاعهم بس ([[/users]])، فالمسارات [[/users/]] و [[/users/{user_id}]].`,
            R`بيركّب الطلبات تحت prefix زيادة: [[/api/v1]] + [[/orders]] + [[/{order_id}]]. والـ dependencies اللي على الـ include بتتنادى قبل اللي على الـ router (اتجرب تحت).`,
          ],
          sol: R`في [[/docs]] هتلاقي قسمين: [[users]] و [[orders]]، كل واحد تحت الـ tag اللي في الـ [[APIRouter]] بتاعه. والمسارات، لو الـ users router فيه [[prefix="/users"]] وعنده [[/]] و [[/{user_id}]]: [[['/users/', '/users/{user_id}', '/api/v1/orders/', '/api/v1/orders/{order_id}']]].

لاحظ إن prefix الـ [[include_router]] بيتحط قبل prefix الـ router نفسه، فبقت [[/api/v1/orders/]]. ولاحظ الـ slash في الآخر: [[@router.get("/")]] مع prefix بتدّي [[/orders/]]، ولو طلبت [[/orders]] من غير slash FastAPI بيرد بـ 307 redirect. ولو ظهر [[ModuleNotFoundError: No module named 'app']]، شغّل من الفولدر اللي فوق [[app]] ([[fastapi dev app/main.py]]) ومتنساش [[__init__.py]] في [[app]] و [[app/routers]].`
        }
      ]
    }
]);

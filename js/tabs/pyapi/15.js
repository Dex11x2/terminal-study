// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
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
    }
]);

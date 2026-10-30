// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "الأخطاء والـ middleware",
      l: 2,
      time: R`حوالي ٤ ساعات`,
      goal: [
        R`ترجّع الأخطاء بالكود الصح (400 و 401 و 403 و 404 و 409 و 429) و body ثابت الشكل يعتمد عليه الـ frontend.`,
        R`تمسك أخطاء التطبيق والـ 422 والـ crash في handlers، فكل خطأ يطلع بنفس الشكل، والـ traceback يروح اللوج مش العميل.`,
        R`تظبط CORS صح للـ frontend، وتعرف ليه المتصفح بيقول «CORS error» وهو في الحقيقة 500.`,
        R`تكتب middleware لكل طلب (request id، وتوقيت) وتعرف ترتيب البصلة بيأثر على مين يشوف إيه.`,
      ],
      use: {
        prog: R`الـ frontend بيعرض رسالة الخطأ للمستخدم، فلازم يعرف يقراها: [[code]] ثابت و [[fields]] لكل خانة، مش نص بيتغيّر.`,
        work: R`أول سؤال لما مستخدم يشتكي: «إيه الـ request id؟». و [[log.exception]] بالـ id ده بيوصلك للسطر اللي وقع في ثواني.`,
        net: R`CORS قاعدة في المتصفح مش في السيرفر، والـ preflight طلب [[OPTIONS]] حقيقي ممكن nginx يرد عليه أو يرفضه قبل التطبيق.`,
      },
      lab: R`cd shop-api && .venv/Scripts/activate && fastapi dev app/main.py`,
      projects: [
        { lvl: 'صغير', t: R`أخطاء API الملاحظات`, what: R`خلّي API الملاحظات يرجّع 404 بـ [[HTTPException]] بدل الـ [[KeyError]]، و 409 لو عنوان الملاحظة متكرر بـ [[detail={"code": "TITLE_TAKEN", ...}]]، و DELETE بـ 204. من درس «HTTPException».`, done: R`مفيش ولا مسار بيرجّع 500 على id مش موجود (اختبار لكل method)، والـ 409 فيها [[code]] ثابت، و DELETE مرتين ورا بعض بترجع 204 في المرتين.` },
        { lvl: 'صغير', t: R`request id في كل رد`, what: R`middleware بياخد [[X-Request-ID]] من الطلب أو يعمل واحد، ويرجّعه في الرد، ويحطه في كل سطر لوج للطلب ده. من درس «CORS و middleware».`, done: R`[[curl -i]] بيطبع [[x-request-id]] في كل رد، ولو بعتّ [[X-Request-ID: abc]] بيرجع [[abc]] نفسه، وسطور اللوج بتاعة الطلب فيها نفس الـ id.` },
        { lvl: 'متوسط', t: R`شكل خطأ واحد للـ API كله`, what: R`handlers لـ [[AppError]] وأبناءه، و [[RequestValidationError]] (من غير [[input]])، و [[StarletteHTTPException]] (عشان 404 و 405 بتاعة الـ routes)، و [[Exception]]. الشكل كله [[{"error": {"code", "message", "fields"?, "ref"?}}]]. من درس «exception handlers».`, done: R`اختبارات بتتأكد إن ٦ حالات (مسار مش موجود، و method غلط، و 422، و AppError، و crash، و [[Infinity]] في الـ body) كلها بنفس الشكل، والـ crash بيطلّع [[ref]] وموجود في اللوج بنفس الرقم ومعاه الـ traceback، ومفيش traceback في الرد.` },
        { lvl: 'متوسط', t: R`CORS لـ frontend حقيقي`, what: R`صفحة React (أو HTML فيها [[fetch]]) على [[localhost:5173]] بتكلّم الـ API على 8000 بـ [[credentials: "include"]] و header [[Authorization]]. الـ origins من [[Settings]].`, done: R`الصفحة بتشتغل من 5173، ومن origin تاني ([[localhost:3000]]) الـ console بيقول [[blocked by CORS policy]]، و [[curl -X OPTIONS]] بيأكد إن الـ preflight بيرجع 200 للأول و 400 للتاني، ومفيش [[*]] في الإعدادات.` },
        { lvl: 'كبير', t: R`API متين للإنتاج`, what: R`خد API الحجوزات أو الملاحظات وزوّد عليه: handlers الأخطاء الموحّدة، و middleware للـ request id والتوقيت، ولوج JSON سطر لكل طلب (method ومسار وكود ووقت و id)، و CORS من الإعدادات، و GZip، و [[/health]] مستثنى من اللوج. والـ crash بيرجع 500 بشكل الـ API نفسه (مش النص [[Internal Server Error]]). من الوحدات اللي فاتت كلها.`, done: R`اختبارات للأخطاء كلها بتعدّي، و ١٠٠ طلب بـ [[httpx]] بيطلّعوا ١٠٠ سطر لوج JSON كل واحد بيتقري بـ [[json.loads]]، والـ crash بيطلّع سطر [[ERROR]] فيه الـ traceback والـ id، والرد فيه [[ref]] بنفس الـ id. والتطبيق بيقوم ويقفل مرتين ورا بعض من غير تحذيرات.`, ext: R`زوّد شكل [[application/problem+json]] (RFC 9457)، وابعت الأخطاء لـ Sentry أو اللي في درس «observability»، و rate limit بـ 429 و [[Retry-After]] (قسم Redis).` },
        { lvl: 'فكرة', t: R`كتالوج أخطاء للـ frontend`, what: R`اعمل صفحة أو ملف فيه كل [[code]] بيرجّعه الـ API: معناه، وإمتى بيحصل، والرسالة المقترحة للمستخدم بالعربي. انت بتختار الشكل.`, done: R`كل [[code]] في الكود موجود في الكتالوج (سكربت بيدوّر بـ regex على [[code="...]] ويقارن)، والـ frontend بيعرض رسالة الكتالوج بدل [[message]] الخام.`, ext: R`ولّد الكتالوج من الكود نفسه، وحطه في [[/docs]] بـ [[responses=]] على كل endpoint.` },
      ],
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب الكود الصح لكل موقف: إيميل مستخدم، وطلب على حاجة مش موجودة، وتوكن ناقص، ومستخدم عادي على صفحة أدمن، وطلبات كتير في الدقيقة، وكوبون منتهي.`, done: R`كتبت 409 و 404 و 401 و 403 و 429 و 400 (أو 422 لو اخترت إنه فحص داتا، ومكتوب ليه)، وقارنت بجدول الأكواد في درس «response model».` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[return HTTPException(404, "x")]] بدل [[raise]]. إيه الكود والـ body؟ و [[raise HTTPException(429, "slow down", headers={"Retry-After": "30"})]]؟`, done: R`الأولى رجعت 200 والـ exception نفسه متحوّل JSON (فيه [[status_code]] و [[detail]] و [[headers]])، والتانية رجعت 429 و header [[retry-after: 30]] و [[{"detail":"slow down"}]]. وطابقوا ورقتك.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[PATCH /products/{id}]] في درس «request body» بيرجّع 500 على id مش موجود. صلّحه بـ 404، وخلّي الـ [[detail]] فيه الـ id.`, done: R`[[PATCH /products/99]] بقت 404 و [[{"detail":"product 99 not found"}]]، والاختبار اللي كان مستني 500 اتعدّل لـ 404 وبيعدّي، والـ PATCH السليم لسه 200.` },
            { lvl: 'تطبيق', t: R`**ابني endpoint:** [[POST /coupons/{code}/redeem]]: 404 لو مش موجود، و 410 Gone لو منتهي، و 409 لو اتستخدم قبل كده، و 200 فيه الخصم. والـ detail في الكل [[{"code": ..., "message": ...}]].`, done: R`أربع اختبارات [[TestClient]] للأربع حالات بالأكواد دي بالظبط، و [[r.json()["detail"]["code"]]] ثابت في كل واحدة، والاستخدام التاني لنفس الكوبون بيرجع 409.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** لكل route في التطبيق، اختبار بيبعت id مش موجود (99999) ويتأكد إن مفيش 500. خلّيه يلف على [[app.routes]] أوتوماتيك بدل ما تكتب route route.`, done: R`الاختبار بيلاقي كل route فيه [[{...id}]] في المسار من [[route.path]] و [[route.methods]]، وبيبعت لكل واحد، وبيفشل باسم الـ route لو رجع 500. ولما رجّعت [[DB[id]]] في route واحد الاختبار مسكه.` },
          ],
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
| [[raise HTTPException(404, "...")]] | الدالة بتقف والرد 404 و [[{"detail": "..."}]]، من غير ما تكتب [[JSONResponse]] |
| [[raise HTTPException(409, detail={...})]] | 409 والـ dict جوه [[detail]] |
| [[status_code=201]] في الـ decorator | كود النجاح للـ route |
| [[status_code=204]] | نجاح من غير body |
| [[return HTTPException(...)]] | غلط: 200 والـ exception متحوّل JSON |

---

## اتشغّل فعلًا: headers مع الخطأ، والـ 405 اللي بييجي لوحده

اتجرب على FastAPI 0.162 بـ [[TestClient]]:

~~~python
@app.get("/limited")
async def limited():
    raise HTTPException(429, "slow down", headers={"Retry-After": "30"})
~~~

~~~text الناتج
GET /limited     → 429  retry-after: 30   {"detail":"slow down"}
DELETE /limited  → 405  allow: GET        {"detail":"Method Not Allowed"}
GET /nope        → 404                    {"detail":"Not Found"}
~~~

| الحالة | مين رد | تعمل إيه |
|---|---|---|
| [[headers={"Retry-After": "30"}]] | انت، و FastAPI حط الـ header في الرد | استخدمه مع 429 (امتى يجرّب تاني)، ومع 401 ([[WWW-Authenticate]])، ومع 503 |
| 405 و [[allow: GET]] | Starlette لوحده: المسار موجود بس الـ method لأ | متكتبش route لـ DELETE عشان ترجع 405، ده بيحصل لوحده |
| 404 لمسار مش موجود | Starlette، مش [[HTTPException]] بتاعة FastAPI | handler على [[starlette.exceptions.HTTPException]] لو عايز شكلها موحّد (الدرس الجاي) |

### [[detail]] ينفع يبقى إيه؟

أي حاجة تتحوّل JSON: نص، أو dict، أو list. الـ frontend بيبني على الشكل ده، فاختار شكل واحد للتطبيق كله ومتغيّروش: نص لأخطاء بسيطة، أو dict فيه [[code]] ثابت و [[message]]. وفي الدرس الجاي بنوحّد الشكل لكل الأخطاء من مكان واحد.

## الخلاصة

- [[raise]] مش [[return]]، وتقدر ترميها من أي حتة جوه الطلب (route أو dependency أو دالة بتتنادى).
- الـ [[detail]] بيوصل للعميل زي ما هو: متحطش فيه تفاصيل داخلية، وحط [[code]] ثابت لو الـ frontend هيتصرف على أساسه.
- جرّب دايمًا بـ [[curl -i]] عشان تشوف الكود مش الـ body بس.`,
          lines: [
            R`[[HTTPException]] الـ exception اللي FastAPI بيحوّله رد بالكود والـ detail، و [[status]] فيه أسماء الأكواد زي [[HTTP_404_NOT_FOUND]].`,
            R`التطبيق، والـ routes التلاتة تحت عليه.`,
            R`«قاعدة» في الذاكرة فيها مستخدم واحد id بتاعه 1. المفتاح رقم، فـ [[USERS.get(1)]] بتلاقيه و [[USERS.get("1")]] لأ.`,
            R`GET على مستخدم واحد، و [[{user_id}]] في المسار.`,
            R`[[user_id: int]] من المسار، فـ [[/users/abc]] بترجع 422 قبل ما نوصل للـ 404.`,
            R`[[dict.get]] بترجّع [[None]] لو المفتاح مش موجود، بدل [[USERS[user_id]]] اللي بترمي [[KeyError]] وتبقى 500.`,
            R`مش موجود؟ هنا بنقرر الكود بنفسنا بدل ما نسيب Python يرمي.`,
            R`[[raise]] (مش [[return]]) بيوقف الدالة فورًا، و FastAPI بيرد 404 و [[{"detail":"User not found"}]]. ولو كتبت [[return]] بالغلط الرد بيبقى 200 (اتشرح فوق).`,
            R`لو موجود بيرجّعه عادي بـ 200.`,
            R`POST للإنشاء، و [[status_code=201]] كود النجاح بس. الأخطاء اللي بنرميها جوه بتغطي عليه.`,
            R`[[email]] هنا query عشان المثال يفضل قصير. في الحقيقة body بموديل فيه [[EmailStr]] (درس «request body»).`,
            R`[[any]] بتلف على كل المستخدمين وترجّع [[True]] أول ما تلاقي نفس الإيميل. على dict صغير ده كويس، وفي القاعدة ده [[UNIQUE]] constraint.`,
            R`409 Conflict: الطلب سليم بس متعارض مع حاجة موجودة. و [[detail]] dict فيه [[code]] ثابت ([[EMAIL_TAKEN]]) يعتمد عليه الـ frontend، و [[message]] للعرض.`,
            R`id جديد: أكبر مفتاح موجود زائد واحد. [[max]] على dict بترجّع أكبر **مفتاح**، ولو الـ dict فاضي بترمي [[ValueError]].`,
            R`بنخزّن المستخدم الجديد بالـ id بتاعه.`,
            R`بيرجّعه، والكود 201 من الـ decorator.`,
            R`DELETE، و 204 No Content: نجاح من غير body، وأي حاجة ترجعها الدالة بتتجاهل.`,
            R`[[-> None]]: الدالة مبترجعش حاجة، وده بيتماشى مع 204 في التوثيق.`,
            R`[[pop(key, None)]] بيمسح لو موجود ومش بيرمي لو مش موجود، فـ DELETE مرتين بيرجّع 204 في المرتين (idempotent: نفس النتيجة مهما اتكرر).`,
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** فيه handler لـ [[AppError]] وواحد لـ [[Exception]]، واترمى [[NotFoundError]]. مين بيمسكه؟ ولو اترمى [[KeyError]]؟ ولو المسار مش موجود خالص؟`, done: R`كتبت: [[NotFoundError]] بيروح لـ [[AppError]] (الأخص)، و [[KeyError]] لـ [[Exception]] (500 بـ ref)، والمسار المش موجود مبيروحش لأي واحد فيهم لأنه [[StarletteHTTPException]]، وجربت التلاتة.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** مع handler الـ 422 بتاع الدرس، ابعت [[{"address": {}}]] لموديل فيه [[address: Address]] و [[Address.city]] إجباري، وابعت [[?page=abc]]. اكتب [[field]] بتاع كل خطأ.`, done: R`طلع [[address.city]] للأول و [[page]] للتاني (أول عنصر في الـ loc اتشال)، والرد 422 بشكل [[{"error":{"code":"VALIDATION","fields":[...]}}]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** handler الـ crash فيه [[return JSONResponse({"error": str(exc), "trace": traceback.format_exc()}, 500)]]. اعرف المشكلتين وصلّحهم.`, done: R`كتبت إن الـ traceback بيكشف مسارات وكود (وممكن داتا) للعميل، و [[str(exc)]] ممكن يبقى فيه SQL أو إيميل. بقى [[log.exception]] بالـ ref، والرد فيه [[code]] و [[ref]] بس، واختبار بيتأكد إن كلمة [[Traceback]] مش في الرد.` },
            { lvl: 'تطبيق', t: R`**ابني:** handler على [[StarletteHTTPException]] بيرجّع شكل [[application/problem+json]] (RFC 9457): [[type]] و [[title]] و [[status]] و [[instance]]، ومن غير ما يضيّع الـ headers ([[Retry-After]] و [[allow]]).`, done: R`[[GET /nope]] بيرجع 404 بـ [[content-type: application/problem+json]]، و [[DELETE]] على route GET بيرجع 405 ومعاه [[allow: GET]]، و 429 معاه [[retry-after]]: الـ handler بيمرر [[exc.headers]].` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** اختبارات لـ [[{"price": Infinity}]] في الـ body: مرة بـ 422 الافتراضي ومرة بالـ handler بتاع الدرس، والموديل فيه [[allow_inf_nan=False]] في الاتنين. وبعدين اختبار تالت لـ crash بيتأكد إن الـ ref اللي في الرد هو اللي في اللوج ([[caplog]]).`, done: R`الأول بيستنى 500 (رد الـ 422 الافتراضي فيه [[input]] ومينفعش يتكتب JSON)، والتاني 422 نضيف فيه [[finite_number]]، والتالت بيلاقي نفس الـ ref في [[caplog.text]] ومعاه [[ZeroDivisionError]].` },
          ],
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

---

## اتشغّل فعلًا: شكل واحد لكل الأخطاء، والـ crash اللي بيهرب من الـ middleware

### handler على [[StarletteHTTPException]] بشكل RFC 9457

[[application/problem+json]] شكل معياري للأخطاء (RFC 9457): [[type]] و [[title]] و [[status]] و [[instance]]. الـ handler على [[starlette.exceptions.HTTPException]] بيمسك بتاعة FastAPI كمان وبيمسك 404 و 405 اللي Starlette بيرميهم. اتجرب على FastAPI 0.162:

~~~python
@app.exception_handler(StarletteHTTPException)
async def http_error(request: Request, exc: StarletteHTTPException):
    return JSONResponse({"type": "about:blank", "title": exc.detail, "status": exc.status_code, "instance": request.url.path},
                        status_code=exc.status_code, headers=exc.headers, media_type="application/problem+json")
~~~

~~~text الناتج
GET /nope        → 404  application/problem+json              {"type":"about:blank","title":"Not Found","status":404,"instance":"/nope"}
DELETE /limited  → 405  application/problem+json  allow: GET  {"type":"about:blank","title":"Method Not Allowed","status":405,...}
GET /limited     → 429  application/problem+json  retry-after: 30  {"type":"about:blank","title":"slow down","status":429,...}
~~~

[[headers=exc.headers]] هي اللي حافظت على [[allow]] و [[retry-after]]. من غيرها الـ handler بيضيّعهم في صمت.

### الـ crash بيطلع برّه الـ middleware

نفس التطبيق فيه middleware بيحط [[Server-Timing]]، و route فيه [[1 / 0]]، **من غير** handler لـ [[Exception]]:

~~~text الناتج
GET /nope     → 404  فيه Server-Timing
GET /limited  → 429  فيه Server-Timing
GET /crash    → 500  text/plain; charset=utf-8   "Internal Server Error"   مفيش Server-Timing
~~~

الـ 500 بيترد من [[ServerErrorMiddleware]]، ودي **أبرّه** طبقة في البصلة، برّه أي middleware انت ضفته. فالرد ده مفيهوش أي header من بتوعك. والأخطر: مفيش CORS headers، فالمتصفح بيقول «CORS error» والمطوّر بيدوّر في إعدادات CORS والمشكلة bug عادي (اتجرب في الدرس الجاي). والـ handler على [[Exception]] بيشتغل في نفس المكان، فبيدّيك شكل JSON بس برضه من غير headers الـ middleware.

### [[Infinity]] في الـ body

في درس «request body»، [[{"price": Infinity}]] كانت بترجع 500 حتى مع [[allow_inf_nan=False]]، لأن الـ 422 الافتراضي فيه [[input]]. مع handler الدرس ده (اللي بيرجّع [[field]] و [[message]] بس):

~~~text الناتج
422 {"error":{"code":"VALIDATION","fields":[{"field":"price","message":"Input should be a finite number"}]}}
~~~

متحطش [[input]] في رد الـ 422 بتاعك: ممكن يبقى قيمة مينفعش تتكتب JSON، أو باسورد المستخدم بعته في حقل غلط.

## الخلاصة

- الـ services ترمي exceptions بتاعتك، والـ handlers هي اللي تعرف HTTP.
- handler واحد على الأب بيغطي كل الولاد.
- الـ 500 للعميل فيها ref بس، والتفاصيل كلها في اللوج بنفس الـ ref.`,
          lines: [
            R`[[logging]] عشان الـ crash يتسجّل بالـ traceback كامل في اللوج، مش في الرد.`,
            R`[[uuid]] عشان نعمل رقم تتبع قصير لكل crash، يتكتب في اللوج ويرجع للعميل.`,
            R`[[Request]] بيوصل للـ handler عشان يعرف المسار والـ headers، و [[FastAPI]] للتطبيق.`,
            R`[[RequestValidationError]] الـ exception اللي FastAPI بيرميه قبل الـ 422. لو عملتله handler، انت اللي بتقرر شكل الـ 422.`,
            R`[[JSONResponse]] رد JSON بكود و headers انت محددهم، لأن الـ handler بيرجّع رد كامل مش dict.`,
            R`logger باسم [[app]] بدل الـ root، عشان تتحكم في مستواه ومكانه من إعدادات اللوج من غير ما تأثر على مكتبات تانية.`,
            R`التطبيق، والـ handlers بتتسجّل عليه بـ [[exception_handler]].`,
            R`الأب لكل أخطاء الـ business. الكود بتاعك يرمي [[NotFoundError]] من غير ما يعرف حاجة عن HTTP، والـ handler يترجمه.`,
            R`كود HTTP الافتراضي لأي [[AppError]]: 400. الأبناء بيغيّروه.`,
            R`[[code]] نص ثابت للـ frontend ([[APP_ERROR]] و [[NOT_FOUND]])، عشان الرسالة تتغيّر أو تتترجم من غير ما الـ frontend يبوظ.`,
            R`constructor بياخد رسالة للبني آدمين.`,
            R`بنخزّن الرسالة على الـ exception عشان الـ handler يقراها.`,
            R`نوع مخصوص للـ 404. ممكن تزوّد [[ConflictError]] (409) و [[ForbiddenError]] (403) بنفس الطريقة.`,
            R`بيغيّر الكود والـ code بس على مستوى الـ class، والـ constructor والـ handler زي ما هم.`,
            R`[[exception_handler(AppError)]]: أي [[AppError]] **أو ابن ليه** بيترمي من أي route أو dependency بيوصل هنا.`,
            R`الـ handler بياخد الطلب والـ exception، ولازم يرجّع [[Response]].`,
            R`شكل موحّد [[{"error": {"code", "message"}}]] بالكود اللي في الـ exception. كل أخطاء الـ business بقت شبه بعض.`,
            R`handler تاني بيبدّل شكل الـ 422 الافتراضي بتاع FastAPI بنفس الشكل الموحّد.`,
            R`الـ handler بياخد [[RequestValidationError]]، و [[exc.errors()]] فيها نفس الـ list اللي كانت هتطلع في [[detail]].`,
            R`لكل خطأ: [[field]] من [[loc]] من غير أول عنصر ([[body]] أو [[query]])، فـ [[("body", "address", "city")]] تبقى [[address.city]]. و [[map(str, ...)]] عشان الـ loc ممكن يبقى فيه أرقام (index في list). ومفيش [[input]]، فـ [[Infinity]] في الـ body مبقتش بتوقّع الرد 500 (اتجرب تحت).`,
            R`نفس الشكل الموحّد بكود 422 و [[code: "VALIDATION"]] و [[fields]].`,
            R`آخر خط: أي exception محدش مسكه (bug). لازم يبقى آخر handler فكرة، لأن الأخص بيكسب.`,
            R`الـ handler بتاع الـ crash.`,
            R`رقم قصير ٨ حروف من [[uuid4]]: كفاية عشان تلاقي السطر في اللوج، وقصير المستخدم يقراه في التليفون.`,
            R`[[log.exception]] بيسجّل الرسالة **ومعاها الـ traceback** كامل، والـ ref والمسار عشان تلاقيه. الـ traceback مكانه اللوج بس، لأن فيه أسماء ملفات وأحيانًا داتا.`,
            R`رد 500 عام فيه الـ ref بس. خد بالك: الرد ده بيتبعت من برّه الـ middleware بتاعك، فـ headers زي CORS و [[X-Request-ID]] مبتبقاش فيه (اتجرب في الدرس الجاي).`,
            R`route تجريبي بيرمي خطأ business.`,
            R`[[order_id]] من المسار ونوعه [[int]]، فـ [[/orders/abc]] بترجع 422 بالشكل الموحّد بتاع الـ handler اللي فوق.`,
            R`بيرمي [[NotFoundError]] من غير ما يعرف حاجة عن HTTP، والـ handler حوّله 404 و [[{"error":{"code":"NOT_FOUND",...}}]].`,
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** CORS بيحمي مين؟ السيرفر ولا المستخدم؟ وليه [[curl]] بيشتغل عادي والمتصفح لأ؟ جاوب في ٣ سطور.`, done: R`كتبت إن CORS قاعدة في المتصفح بتحمي المستخدم من موقع تاني بيقرا ردود API بـ cookies بتاعته، وإن السيرفر بيرد عادي (200) والمتصفح هو اللي بيخبي الرد عن الـ JavaScript، و curl مش متصفح فمبيطبقش القاعدة. وجربت [[curl -H "Origin: https://evil.example"]] وشفت 200 من غير [[access-control-allow-origin]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[allow_origins=["*"]]] و [[allow_credentials=True]]. طلب من [[Origin: https://evil.example]] ومعاه cookie: إيه قيمة [[access-control-allow-origin]]؟ و [[access-control-allow-credentials]]؟`, done: R`جرّبت: [[access-control-allow-origin: https://evil.example]] (مش [[*]])، و [[access-control-allow-credentials: true]]، يعني أي موقع يقدر يقرا ردود الـ API بـ cookies المستخدم. ورجّعت القايمة لـ origins محددة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الـ frontend بيقول «CORS error» على [[GET /report]] بس، وباقي الـ routes شغالة. الـ route فيه [[1 / 0]] بالغلط. اعرف إزاي توصل للسبب من غير ما تلمس إعدادات CORS.`, done: R`[[curl -i -H "Origin: http://localhost:5173" localhost:8000/report]] طلّع 500 ومفيش [[access-control-allow-origin]]، ولوج السيرفر فيه [[ZeroDivisionError]]. صلّحت الـ bug والـ «CORS error» اختفى، وكتبت ليه الـ 500 مفيهوش CORS headers.` },
            { lvl: 'تطبيق', t: R`**ابني:** middleware بيرفض أي body أكبر من ١ ميجا بـ 413 قبل ما يتقري، من header [[Content-Length]]، ومن غير ما يقرا [[request.body()]].`, done: R`[[curl -X POST -H "Content-Length: 2000000"]] بيرجع 413 والـ route مبيتناداش (عداد فيه صفر)، و body صغير بيعدّي 200، وكتبت ليه [[await request.body()]] في الـ middleware فكرة وحشة (بيحمّل الـ body كله في الذاكرة).` },
            { lvl: 'تحدي', t: R`**قيس:** route بيرجّع JSON حقيقي (٥٠٠ منتج بأسماء وأوصاف). قيس حجم الرد بـ gzip ومن غيره، ووقت الرد ١٠٠ مرة في الحالتين بـ [[time.perf_counter]].`, done: R`عندك ٤ أرقام حقيقية: الحجمين بالـ bytes (من [[content-length]]) ومتوسط الوقتين، والنسبة مكتوبة، وكتبت إمتى الضغط مش مستاهل (ردود صغيرة، أو nginx بيضغط أصلًا).` },
          ],
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

---

## اتشغّل فعلًا: [[*]] مع credentials، والـ 500 اللي مفيهوش CORS

### [[allow_origins=["*"]]] و [[allow_credentials=True]]

المتصفح نفسه بيرفض [[access-control-allow-origin: *]] مع credentials. فـ Starlette بيعمل حاجة تانية: بيرجّع الـ origin اللي طلب **زي ما هو**. اتجرب على Starlette 1.10 (FastAPI 0.162):

~~~python
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
~~~

~~~text الناتج
OPTIONS /x  Origin: https://evil.example  → 200
  access-control-allow-origin: https://evil.example
  access-control-allow-credentials: true
  access-control-allow-headers: authorization
GET /x  Origin: https://evil.example  Cookie: s=1  → 200
  access-control-allow-origin: https://evil.example
  access-control-allow-credentials: true
  vary: Origin
~~~

يعني أي موقع على النت يقدر يعمل [[fetch]] بـ cookies المستخدم ويقرا الرد. ده نفس اللي في [[mistakes]] فوق، بس بالناتج الحقيقي. القايمة لازم تبقى origins محددة.

### الـ 500 مفيهوش CORS headers

~~~text الناتج (allow_origins=["http://localhost:5173"]، والطلب من نفس الـ origin)
GET /crash  (فيه 1 / 0)             → 500  access-control-allow-origin: None
GET /nf     (HTTPException 404)     → 404  access-control-allow-origin: http://localhost:5173
~~~

الـ [[HTTPException]] بتتحوّل رد **جوه** البصلة فبتعدّي على CORS، والـ crash بيترد من [[ServerErrorMiddleware]] اللي برّه كل حاجة. فالمتصفح بيشوف رد من غير [[access-control-allow-origin]] ويكتب [[blocked by CORS policy]]، والسبب الحقيقي [[ZeroDivisionError]] في لوج السيرفر. أول ما تشوف «CORS error» على route واحد بس: افتح لوج السيرفر قبل إعدادات CORS.

## الخلاصة

- CORS قاعدة في المتصفح: السيرفر بيرد عادي، والمتصفح هو اللي بيمنع القراية. و curl عمره ما هيوريك خطأ CORS.
- اكتب الـ origins بالاسم، خصوصًا مع [[allow_credentials=True]].
- الـ middleware لكل الطلبات (ids، توقيت، ضغط، CORS)، والـ dependencies لـ routes معينة (auth، DB).`,
          lines: [
            R`[[time]] عشان [[perf_counter()]]: ساعة دقيقة مبتتأثرش بتغيير ساعة الجهاز، فمناسبة لقياس مدة.`,
            R`[[uuid]] عشان نعمل request id لو الطلب جه من غيره.`,
            R`[[Request]] للـ middleware بتاعنا عشان يقرا الـ headers، و [[FastAPI]] للتطبيق.`,
            R`[[CORSMiddleware]] جاهز من Starlette: بيرد على الـ preflight ([[OPTIONS]]) وبيضيف headers الـ [[access-control-*]] للردود.`,
            R`[[GZipMiddleware]] بيضغط الردود الكبيرة لو العميل قال إنه بيفهم gzip.`,
            R`التطبيق. الـ middleware بيتضاف عليه بعد ما يتعمل، وقبل ما أول طلب يوصل.`,
            R`[[add_middleware]] بيلف التطبيق بطبقة. كل واحد بيتضاف بيبقى **برّه** اللي قبله، فآخر واحد هو أول واحد بيشوف الطلب.`,
            R`أول argument الـ class نفسه (مش object)، والباقي إعداداته.`,
            R`الـ origins المسموحة بالظبط (protocol ودومين و port). [[http://localhost:5173]] غير [[http://127.0.0.1:5173]]. والقايمة من [[Settings]] في الحقيقة، ومتكتبش [[*]] مع credentials (اتجرب تحت).`,
            R`بيسمح للمتصفح يبعت الـ cookies لما الـ JavaScript يعمل [[fetch]] بـ [[credentials: "include"]]. أما [[Authorization]] header فبيتسمح بيه من [[allow_headers]] مش من هنا.`,
            R`الـ methods اللي الـ preflight هيوافق عليها. GET و POST البسيطين مش محتاجين preflight أصلًا، بس PATCH و DELETE محتاجين.`,
            R`الـ headers اللي الـ JavaScript مسموحله يبعتها. أي header تاني ([[X-API-Key]] مثلًا) الـ preflight بيرفضه بـ 400 [[Disallowed CORS headers]].`,
            R`قفلة إعدادات CORS.`,
            R`بيضغط أي رد أكبر من 1000 byte. الأصغر مبيتضغطش لأن الضغط بيكبّره.`,
            R`decorator بيعمل middleware من دالة: بتتنادى مع كل طلب HTTP، حتى الـ 404 والـ preflight.`,
            R`[[call_next]] دالة بتعدّي الطلب لكل اللي جوه (middleware تاني ثم الـ route) وترجّع الرد. اللي قبلها بيحصل قبل الـ route، واللي بعدها بعده.`,
            R`بياخد الـ id من [[X-Request-ID]] لو nginx أو الـ frontend بعته، وإلا بيعمل واحد جديد. كده الطلب الواحد ليه نفس الـ id في كل السيستم.`,
            R`بيبدأ العداد قبل ما الطلب يدخل.`,
            R`بيعدّي الطلب ويستنى الرد. لو الـ route وقع بـ exception، اللي تحت السطر ده **مش هيشتغل** والرد 500 مش هيبقى فيه الـ headers دي.`,
            R`بيرجّع الـ id في الرد، عشان المستخدم أو الـ frontend يقولهولك لما يشتكي وتدوّر بيه في اللوج.`,
            R`[[Server-Timing]] header معياري بالمدة بالـ ms ([[:.1f]] رقم عشري واحد)، و DevTools بيعرضه في تاب Network ثم Timing.`,
            R`بيرجّع الرد للطبقة اللي برّه. لو نسيت [[return]] الطلب بيقع.`,
          ],
          sol: R`قبل ما تضيف الدومين، الـ console هيطبع حاجة زي: [[Access to fetch at 'http://localhost:8000/health' from origin 'https://example.com' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.]] و [[fetch]] بيرمي [[TypeError: Failed to fetch]]. والمهم: لو بصيت في لوج السيرفر هتلاقي الطلب وصل ورجع [[200]]. الـ CORS مش بيمنع الطلب، بيمنع JavaScript إنه يقرا الرد. وبعد ما تضيف الدومين، الرد بيبقى فيه [[access-control-allow-origin: https://example.com]] والـ fetch بينجح. (Chrome الجديد ممكن كمان يسألك إذن «local network access» لما صفحة من الإنترنت تكلم localhost، وده غير الـ CORS.)

و [[curl -i localhost:8000/health]] هيطلع فيه [[x-request-id: 8cd8b4e4...]] (32 حرف hex عشوائي) و [[server-timing: app;dur=0.6]]. ولو بعت [[-H "X-Request-ID: abc123"]] هيرجعلك [[abc123]] نفسه، ودي الفكرة: الـ id يمشي مع الطلب من الـ frontend أو الـ proxy لحد اللوج. و [[curl]] مبيعملش CORS خالص، فلو جرّبت منه هيشتغل في كل الحالات.`
        }
      ]
    }
]);

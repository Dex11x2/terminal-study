// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "FastAPI في الإنتاج: auth وملفات و realtime وشغل في الخلفية",
      l: 3,
      time: R`حوالي ١٢ ساعة (٦ دروس، كل واحد ساعتين بالتجربة والتمارين)`,
      goal: [
        R`تخزّن الباسوردات بـ Argon2 صح: hash بطيء، و salt، و rehash لما تغيّر الإعدادات، ومن غير ما الـ login يفضح مين متسجّل.`,
        R`تبني auth بـ access و refresh tokens: مدة قصيرة، و rotation، و denylist للـ logout، و 401 حقيقية بالـ header الصح.`,
        R`تستقبل ملفات من غير ما حد يرفعلك exe باسم png أو يكتب برّه فولدر الرفع أو يملا الديسك.`,
        R`تعمل chat بـ WebSocket فيه rooms و auth، وتختبره بـ pytest وبـ client حقيقي.`,
        R`تبعت الشغل التقيل لـ queue (ARQ أو Celery) بـ retries و idempotency، وتعرف إمتى BackgroundTasks مش كفاية.`,
        R`تعرف السيرفر بيعمل إيه وهو شغال: لوج JSON بـ request id، و metrics على [[/metrics]]، و health و readiness.`,
      ],
      use: {
        prog: R`دي الحاجات اللي بتفرق بين API شغال على جهازك وAPI شغال عند ناس بتدفع: الأمان، والملفات، والتحديث اللحظي، والشغل اللي ميستناش، والمراقبة.`,
        work: R`أغلب مشاكل الإنتاج في FastAPI مش في الـ routes: باسورد متخزّن غلط، أو توكن عايش شهر، أو رفع ملف ملا الديسك، أو إيميل اتبعت مرتين، أو سيرفر واقع ومحدش عارف من إمتى.`,
        cs: R`الوحدة فيها أفكار أساسية: دوال الـ hash البطيئة عن قصد، والتوقيع الرقمي (HMAC)، و magic bytes، والـ pub/sub، و at-least-once delivery، و histograms.`,
      },
      lab: R`python -m venv .venv && . .venv/bin/activate   # ويندوز: .venv\Scripts\activate
pip install "fastapi[standard]" pwdlib[argon2] pyjwt websockets arq celery redis prometheus-client pytest
docker run -d --rm --name lab-redis -p 6390:6379 redis:7-alpine`,
      projects: [
        { lvl: 'صغير', t: R`سكربت يقيس الـ hash على سيرفرك`, what: R`[[bench_hash.py]] بيجرّب Argon2 بـ ٣ إعدادات ([[time_cost]] و [[memory_cost]]) ويطبع وقت الـ hash والذاكرة اللي هياخدها كل login، ويقترح أقوى إعداد تحت ٢٥٠ms. من درس «تشفير الباسورد».`, done: R`بيطبع جدول ٣ صفوف فيه الإعداد والوقت المتوسط لـ ٥ مرات، وبيختار إعداد واحد، والإعداد ده لما تحطه في [[Argon2Hasher]] الـ login الحقيقي بياخد نفس الرقم تقريبًا (فرق أقل من ٢٠٪).` },
        { lvl: 'صغير', t: R`endpoint رفع صورة البروفايل`, what: R`[[POST /me/avatar]] بيقبل png أو jpg لحد ٢ ميجا، ويحفظها باسم عشوائي، ويرجّع رابطها. من درس «رفع ملفات».`, done: R`exe متسمّي [[cat.png]] بيرجع 415، وملف ٣ ميجا بيرجع 413 قبل ما يترفع كله، واسم فيه [[../]] مبيغيّرش مكان الحفظ، والصورة بترجع بـ [[GET]] بنفس الـ bytes.` },
        { lvl: 'متوسط', t: R`auth service كامل`, what: R`register و login و refresh و logout و [[/me]]: Argon2 بـ [[verify_and_update]]، و access ١٥ دقيقة، و refresh في cookie [[HttpOnly]] بـ rotation و reuse detection، والـ denylist والـ refresh store في Redis بدل الـ dict. من درسين «تشفير الباسورد» و «JWT و refresh token».`, done: R`ملف [[test_auth.py]] فيه ١٠ اختبارات على الأقل بتعدّي: باسورد غلط 401 بنفس وقت يوزر مش موجود تقريبًا، وتوكن منتهي 401 فيه [[WWW-Authenticate]]، و refresh اتستخدم مرتين بيقفل العيلة كلها، و logout بيخلي التوكن 401، وإعادة تشغيل السيرفر مبتخرّجش حد (لأن الحالة في Redis).` },
        { lvl: 'متوسط', t: R`فواتير في الخلفية`, what: R`[[POST /orders/{id}/invoice]] بيرجع 202 على طول، و worker بـ ARQ بيعمل PDF ويبعته، بـ retries و idempotency key، و [[GET /jobs/{id}]] بيقول الحالة. من درس «Celery و ARQ».`, done: R`١٠ طلبات لنفس الأوردر بتطلّع فاتورة واحدة بس، و worker بيقع ١٠ مرات في النص (بـ [[FAIL_RATE=0.5]]) والفواتير كلها بتخلص في الآخر، والـ API بيرد في أقل من ٥٠ms حتى والـ worker واقف.` },
        { lvl: 'كبير', t: R`تطبيق chat للفرق`, what: R`auth الوحدة دي + rooms بـ WebSocket + رفع مرفقات + إشعار بالإيميل في الخلفية لما حد يتعمله mention وهو مش online + لوج JSON و metrics. الـ broadcast بـ Redis pub/sub عشان يشتغل على أكتر من worker. من كل دروس الوحدة، ومعاها «redis cache» و «SQLAlchemy async» و «dependency_overrides».`, done: R`pytest فيه اختبارات لكل جزء (auth و rooms ورفع وqueue) وبيعدّي مرتين ورا بعض. واتنين متصلين بـ uvicorn مختلفين (بورتين) شايفين رسايل بعض. و [[/metrics]] فيه عدد الرسايل وعدد الاتصالات المفتوحة دلوقتي، و [[/health/ready]] بيرجع 503 لما توقف Redis. وكل سطر لوج فيه [[request_id]] أو [[user]].`, ext: R`زوّد presence («مين online»)، و typing indicator، وتاريخ الرسايل بـ pagination، و rate limit على الرسايل، وانشره ورا Nginx بـ [[proxy_set_header Upgrade]].` },
        { lvl: 'فكرة', t: R`لوحة صحة لخدماتك`, what: R`خدمة صغيرة بتنادي [[/health/ready]] و [[/metrics]] لكل API عندك كل ٣٠ ثانية، وتعرض أحمر وأخضر، ومعدل الـ 5xx في آخر ٥ دقايق، و p95 للوقت من الـ histogram. انت اللي تختار تبنيها إزاي (FastAPI + صفحة، أو Prometheus + Grafana).`, done: R`بتعرض ٣ خدمات على الأقل، ولما توقف واحدة بتبقى حمرا في أقل من دقيقة، والـ p95 اللي بتحسبه قريب من اللي [[histogram_quantile]] بيطلّعه.`, ext: R`تنبيه على تيليجرام أو إيميل لما خدمة تفضل حمرا ٣ مرات ورا بعض (والتنبيه نفسه job في ARQ)، وصفحة status عامة.` },
      ],
      n: R`الوحدة دي بتكمّل اللي اتعمل في «أول API» و «Dependencies» و «httpx و Redis والشغل في الخلفية»: نفس FastAPI، بس بالحاجات اللي محتاجها قبل ما ناس حقيقية تستخدمه`,
      items: [
        {
          cmd: "تشفير الباسورد",
          title: "تخزّن الباسورد بـ argon2 أو bcrypt (pwdlib) وتتحقق منه صح",
          learn: R`تعمل hash للباسورد بـ Argon2 بـ pwdlib، وتتحقق منه من غير ما الـ login يفضح الإيميلات، وتحدّث الـ hash القديم لوحده.`,
          out: R`register و login بيقيسوا ٥٠ms ثابتة سواء اليوزر موجود ولا لأ، و hash بيتحدّث لوحده لما تقوّي الإعدادات.`,
          use: {
            prog: R`أي تطبيق فيه حسابات. والـ hash ده آخر خط دفاع لما قاعدة البيانات تتسرّب، وده بيحصل أكتر ما تتخيّل.`,
            work: R`في الـ code review أول سؤال على أي login: الباسورد بيتخزّن بإيه، والـ endpoint [[def]] ولا [[async def]]، والرد واحد في كل الحالات ولا لأ.`,
          },
          desc: R`الباسورد **عمره ما يتخزّن زي ما هو** ولا بـ hash سريع زي SHA-256. بيتخزّن بـ hash **بطيء عن قصد** وفيه salt: Argon2id (الأحسن دلوقتي) أو bcrypt. والمكتبة الحالية [[pwdlib]] (هي اللي توثيق FastAPI بيستخدمها)، لأن [[passlib]] آخر نسخة ليها من ٢٠٢٠ وبتقع مع bcrypt 5.

الـ API كله تلات دوال:
• [[hasher.hash(password)]] بترجّع نص زي [[$argon2id$v=19$m=65536,t=3,p=4$salt$hash]]: الخوارزمية وإعداداتها والـ salt جوه النص نفسه.
• [[hasher.verify(password, stored)]] بترجّع [[True]] أو [[False]]، والمقارنة جواها timing-safe.
• [[hasher.verify_and_update(password, stored)]] بترجّع [[(ok, new_hash)]]: لو الـ hash القديم معمول بإعدادات أضعف من الحالية، [[new_hash]] بيبقى hash جديد تخزّنه مكانه.

وفي الـ login تلات حاجات بتفرق: رسالة واحدة لكل الأخطاء، و verify على **hash وهمي** لما الإيميل مش موجود عشان الوقت يبقى واحد، والـ endpoint [[def]] مش [[async def]] لأن الـ hash بياخد ٥٠ms CPU وبيقفل الـ event loop.

قبله: «auth dependency» (اللي بيستخدم التوكن)، وبعده «JWT و refresh token» (اللي بيطلّع التوكن بعد ما الباسورد يتأكد).`,
          example: R`from typing import Annotated
from fastapi import FastAPI, Form, HTTPException
from pwdlib import PasswordHash
from pwdlib.hashers.argon2 import Argon2Hasher

hasher = PasswordHash((Argon2Hasher(),))
DUMMY_HASH = hasher.hash("dummy-password-for-timing")
users: dict[str, str] = {}
app = FastAPI()

@app.post("/register", status_code=201)
def register(email: Annotated[str, Form()], password: Annotated[str, Form(min_length=8, max_length=128)]):
    key = email.strip().lower()
    if key in users:
        raise HTTPException(409, "email already registered")
    users[key] = hasher.hash(password)
    return {"email": key}

@app.post("/login")
def login(email: Annotated[str, Form()], password: Annotated[str, Form()]):
    key = email.strip().lower()
    stored = users.get(key)
    ok, new_hash = hasher.verify_and_update(password, stored or DUMMY_HASH)
    if stored is None or not ok:
        raise HTTPException(401, "wrong email or password")
    if new_hash:
        users[key] = new_hash
    return {"ok": True}`,
          lines: [
            R`[[Annotated]] بيخلينا نكتب النوع ومعاه معلومة زيادة لـ FastAPI (هنا: «الحقل ده جاي من form»). نفس الأسلوب اللي في درس «Depends و Annotated».`,
            R`[[Form]] بيقول لـ FastAPI يقرا الحقل من body نوعه form (زي فورم HTML)، ومحتاج مكتبة [[python-multipart]] متسطّبة، ومن غيرها FastAPI بيرمي error وقت التشغيل بيقولك سطّبها. و [[HTTPException]] عشان نرجّع 409 و 401.`,
            R`[[PasswordHash]] هو الكائن اللي بنعمل بيه hash و verify. بياخد لستة hashers: الأول بيتستخدم للـ hash الجديد، والباقيين بيتقبلوا في الـ verify بس (مفيد لما تنقل من bcrypt لـ Argon2).`,
            R`[[Argon2Hasher]] بيستخدم مكتبة [[argon2-cffi]] (بتتسطّب مع [[pip install "pwdlib[argon2]"]]). من غير الـ extra ده الـ import بيقع بـ [[ModuleNotFoundError]].`,
            R`hasher واحد للتطبيق كله، فيه Argon2 بالإعدادات الافتراضية ([[m=65536,t=3,p=4]] يعني ٦٤ ميجا ذاكرة و ٣ لفّات و ٤ threads). لاحظ الفصلة في [[(Argon2Hasher(),)]]: من غيرها ده مش tuple. و [[PasswordHash.recommended()]] بيعمل نفس الحاجة بالظبط.`,
            R`hash لباسورد وهمي بيتحسب **مرة واحدة** وقت التشغيل. بنستخدمه في الـ login لما الإيميل مش موجود، عشان نعمل verify حقيقي ياخد نفس الوقت (٥٠ms) بدل ما نرجع في ٤ms ونفضح إن الإيميل ده مش متسجّل.`,
            R`قاعدة بيانات وهمية: الإيميل ومعاه الـ hash بس. في الحقيقة دي جدول [[users]] فيه عمود [[password_hash]] نوعه [[text]]، لأن الـ hash طوله ٩٧ حرف ويطول لو غيّرت الإعدادات.`,
            R`التطبيق نفسه. ومن غير [[app]] متعرّف هنا مش هتقدر تكتب [[@app.post]] تحت، و [[fastapi dev main.py]] بيدوّر على متغير بالاسم ده.`,
            R`route التسجيل، و [[status_code=201]] لأن فيه حاجة اتعملت جديدة (Created) مش مجرد 200.`,
            R`[[min_length=8]] بيرفض الباسورد القصير بـ 422 قبل ما الدالة تشتغل، و [[max_length=128]] مهم برضه: من غيره حد يبعت باسورد ١٠ ميجا ويخلي السيرفر يعمله hash. والدالة [[def]] مش [[async def]] عن قصد: FastAPI بيشغّلها في threadpool فالـ hash مبيوقّفش باقي الطلبات (اتقاس تحت).`,
            R`بنوحّد الإيميل: [[strip]] بتشيل المسافات من الأول والآخر، و [[lower]] بتصغّر الحروف، فـ [[Mona@Example.com]] و [[mona@example.com ]] يبقوا حساب واحد. من غير السطر ده نفس الشخص يقدر يعمل حسابين.`,
            R`لو الإيميل متسجّل قبل كده...`,
            R`نرجّع 409 Conflict. في تطبيق فيه خصوصية عالية، ممكن ترجّع 201 ورسالة «شوف إيميلك» في الحالتين عشان محدش يعرف الإيميل متسجّل ولا لأ.`,
            R`[[hasher.hash]] بيعمل salt عشوائي ١٦ byte لوحده ويحسب Argon2، ويرجّع نص فيه كل حاجة. **مفيش** حاجة اسمها «فك» الـ hash: علشان كده بنسميه hash مش تشفير.`,
            R`بنرجّع الإيميل بس. عمر الـ hash ما يرجع في أي response، ولا يتكتب في اللوج.`,
            R`route الدخول، و [[POST]] مش [[GET]] عشان الباسورد ميتكتبش في الـ URL ولا في لوج السيرفر ولا في history المتصفح.`,
            R`[[def]] برضه، لنفس السبب: [[verify]] بياخد نفس وقت [[hash]] تقريبًا.`,
            R`نفس توحيد الإيميل اللي في التسجيل. لو نسيته هنا، اللي اتسجّل بحروف كبيرة مش هيعرف يدخل.`,
            R`[[users.get]] بترجّع [[None]] لو الإيميل مش موجود بدل ما ترمي [[KeyError]].`,
            R`أهم سطر: [[stored or DUMMY_HASH]] معناها «لو مفيش hash استخدم الوهمي»، فالـ verify بيشتغل دايمًا وبياخد نفس الوقت. و [[verify_and_update]] بترجّع اتنين: [[ok]] (الباسورد صح؟) و [[new_hash]] (hash جديد لو الإعدادات اتغيّرت، أو [[None]]).`,
            R`بنرفض لو الإيميل مش موجود **أو** الباسورد غلط، في شرط واحد. [[stored is None]] لازم تتشيّك هنا لأن الباسورد ممكن بالصدفة يكون هو [[dummy-password-for-timing]] فالـ verify على الوهمي يرجع [[True]].`,
            R`نفس الرسالة ونفس الكود (401) في الحالتين. لو قلت «الإيميل مش موجود» في حالة و «الباسورد غلط» في التانية، أي حد يقدر يعرف مين متسجّل عندك.`,
            R`لو [[verify_and_update]] رجّعت hash جديد (يعني القديم معمول بإعدادات أضعف أو بخوارزمية قديمة زي bcrypt)...`,
            R`...نخزّنه مكان القديم. ده الوقت الوحيد اللي معانا فيه الباسورد الأصلي، فهو الوقت الوحيد اللي نقدر نعمل فيه hash جديد. اليوزرز بيتنقلوا للإعدادات الجديدة واحد واحد وهما بيدخلوا.`,
            R`الدخول نجح. في الحقيقة هنا بترجّع توكن، وده الدرس الجاي «JWT و refresh token».`,
          ],
          teach: R`## المثال بيعمل إيه؟

register و login بيخزّنوا الباسورد كـ Argon2 hash، وبيتحققوا منه في وقت ثابت سواء الإيميل موجود ولا لأ، وبيحدّثوا الـ hash القديم لوحده. كل الناتج هنا من تشغيل حقيقي على ويندوز 11: Python 3.12، و FastAPI 0.162، و pwdlib 0.3.1، و argon2-cffi 25.1، و bcrypt 5.0، و passlib 1.7.4، في venv لوحده.

---

## ١. ليه مش الباسورد زي ما هو، ولا SHA-256؟

لو قاعدة البيانات اتسرّبت (backup متساب، أو SQL injection، أو موظف)، اللي فيها هو اللي بيوصل للمهاجم:

| المخزّن | المهاجم بيعمل إيه |
|---|---|
| الباسورد نفسه | بيدخل بيه على طول، وعلى أي موقع تاني الشخص مستخدم فيه نفس الباسورد |
| [[sha256(password)]] | بيجرّب ملايين الباسوردات في الثانية لحد ما واحد يطابق، وبيلاقي الباسوردات الشائعة في دقايق |
| Argon2 بـ salt | كل تخمينة بتاخد ٥٠ms و ٦٤ ميجا ذاكرة، وكل يوزر محتاج شغل لوحده بسبب الـ salt |

وقسناها:

~~~python
import hashlib, time
from pwdlib import PasswordHash
ph = PasswordHash.recommended()
# بنقيس متوسط ٥ مرات Argon2 و ١٠٠٠٠٠ مرة SHA-256
~~~

~~~text الناتج (اتشغّل فعلًا)
argon2 hash ms 55.0
argon2 verify ms 54.1
bcrypt12 hash ms 218.7
sha256 us 0.854
~~~

SHA-256 بياخد **0.85 ميكروثانية** و Argon2 بياخد **55 ملي ثانية**: يعني Argon2 أبطأ حوالي ٦٥,٠٠٠ مرة. على core واحد ده يعني حوالي ١,٢ مليون تخمينة في الثانية لـ SHA-256، مقابل ١٨ تخمينة في الثانية لـ Argon2. ولليوزر اللي بيدخل ٥٥ms مش هيحس بيها.

و bcrypt بـ [[rounds=12]] أخد ٢١٩ms على نفس الجهاز. والـ rounds هنا أُس: كل +1 بيضاعف الوقت.

---

## ٢. pwdlib ولا passlib؟

[[passlib]] كانت المكتبة المشهورة، وفي دروس ومقالات كتير لسه. بس آخر نسخة ليها 1.7.4 من ٢٠٢٠، ومع [[bcrypt]] 5.0 (النسخة الحالية) بتقع في أول [[hash]]:

~~~python
from passlib.context import CryptContext
ctx = CryptContext(schemes=["bcrypt"], deprecated="auto")
print(ctx.hash("s3cret-Pass"))
~~~

~~~text الناتج (اتشغّل فعلًا)
(trapped) error reading bcrypt version
Traceback (most recent call last):
  ...
AttributeError: module 'bcrypt' has no attribute '__about__'
  ...
ValueError: password cannot be longer than 72 bytes, truncate manually if necessary (e.g. my_password[:72])
~~~

الباسورد قصير، بس passlib بيعمل اختبار داخلي بباسورد طويل عشان يكشف باج قديم في bcrypt، و bcrypt 5 بقى بيرفض أي حاجة أطول من ٧٢ byte بـ [[ValueError]] بدل ما يقصّها ساكت. و passlib مع Argon2 لسه شغالة، بس بتطلّع [[DeprecationWarning]] على Python 3.12 و 3.14.

علشان كده المشاريع الجديدة بتستخدم [[pwdlib]]: مكتبة صغيرة متصانة، ونفس الفكرة (لستة hashers، و verify_and_update). ولو عندك مشروع على passlib، اثبّت [[bcrypt<5]] لحد ما تنقل، أو انقل لـ pwdlib مع [[BcryptHasher]] في اللستة عشان الـ hashes القديمة تفضل شغالة.

---

## ٣. الـ hash ده فيه إيه؟

~~~text الناتج (اتشغّل فعلًا)
$argon2id$v=19$m=65536,t=3,p=4$KOxPGg/e7JvKmbB2Av03dQ$CkaAQM2FtRE5SAo8DRNCOTPoiRT+SCg/Fe8VNTWiyxQ
97
~~~

| الجزء | معناه |
|---|---|
| [[argon2id]] | النوع: id بيجمع مقاومة هجمات الـ GPU وهجمات الـ side-channel، وهو اللي OWASP بتنصح بيه |
| [[v=19]] | نسخة الخوارزمية (0x13) |
| [[m=65536]] | الذاكرة بالـ KiB: ٦٤ ميجا لكل hash. ده اللي بيخلي الـ GPU مبيعرفش يجرّب آلاف في نفس الوقت |
| [[t=3]] | عدد اللفّات على الذاكرة دي. أكتر = أبطأ |
| [[p=4]] | عدد الـ lanes اللي بتشتغل بالتوازي |
| [[KOxPGg...]] | الـ salt: ١٦ byte عشوائي بـ base64، مختلف في كل hash |
| [[CkaAQM...]] | الناتج نفسه |

عشان الـ salt جوه النص، [[verify]] مش محتاج أي حاجة غير الباسورد والنص ده. ونفس الباسورد مرتين بيطلّع نصين مختلفين:

~~~text الناتج (اتشغّل فعلًا)
>>> ph.hash("s3cret-Pass") == ph.hash("s3cret-Pass")
False
~~~

وده معناه إن اتنين عندهم نفس الباسورد مبيبانش في القاعدة، وإن الـ rainbow tables (جداول hashes متحسوبة قبل كده) مبتنفعش.

### خد بالك من الذاكرة

[[m=65536]] يعني كل login بياخد ٦٤ ميجا **وهو شغال**. الـ threadpool بتاع FastAPI فيه ٤٠ thread افتراضيًا، فلو ٤٠ login جم مع بعض ممكن توصل ٢.٥ جيجا (ده حساب من الإعداد، مش قياس). على سيرفر صغير قلل [[memory_cost]] وزوّد [[time_cost]]، أو حط rate limit على الـ login (درس «redis rate limit»). والحد الأدنى اللي OWASP بتقوله لـ Argon2id: ١٩ ميجا و [[t=2]] و [[p=1]] (من الوثائق).

---

## ٤. نشغّل المثال

~~~bash
pip install fastapi "pwdlib[argon2]" python-multipart httpx
~~~

وبـ [[TestClient]] (درس «dependency_overrides» بيشرحه):

~~~python
c = TestClient(main.app)
c.post("/register", data={"email": "Mona@Example.com", "password": "s3cret-Pass"})
c.post("/register", data={"email": "mona@example.com", "password": "other-pass"})
c.post("/register", data={"email": "x@example.com", "password": "short"})
~~~

~~~text الناتج (اتشغّل فعلًا)
201 {'email': 'mona@example.com'}
409 {'detail': 'email already registered'}
422 String should have at least 8 characters
$argon2id$v=19$m=65536,t=3,p=4
~~~

التاني اترفض رغم إن الحروف مختلفة، لأن [[strip().lower()]] وحّدهم. والتالت اترفض قبل ما الدالة تشتغل أصلًا بسبب [[min_length=8]].

### مفاجأة: warning من TestClient

~~~text الناتج (اتشغّل فعلًا)
StarletteDeprecationWarning: Using $__bthttpx$__bt with $__btstarlette.testclient$__bt is deprecated; install $__bthttpx2$__bt instead.
~~~

Starlette 1.10 بيقترح [[httpx2]] للـ TestClient. ده warning بس، والاختبارات شغالة.

---

## ٥. الـ login مبيفضحش مين متسجّل

~~~text الناتج (اتشغّل فعلًا: المثال زي ما هو)
200 {'ok': True} 50ms
401 {'detail': 'wrong email or password'} 47ms
401 {'detail': 'wrong email or password'} 49ms
~~~

الصح، والباسورد الغلط، والإيميل اللي مش موجود: نفس الوقت تقريبًا ونفس الرسالة. وجرّبنا نفس الـ login **من غير** [[DUMMY_HASH]] (يعني [[if not stored or not verify(...)]]، الشكل اللي في دروس كتير)، ومتوسط ١٠ طلبات:

~~~text الناتج (اتشغّل فعلًا: الوسيط من ١٠ طلبات)
median mona@example.com 55.6ms
median nobody@example.com 4.3ms
~~~

الفرق ٥٠ms، وده باين حتى على النت. مهاجم معاه لستة إيميلات يقدر يعرف مين عنده حساب عندك من الوقت بس، حتى لو الرسالة واحدة.

---

## ٦. rehash لما تغيّر الإعدادات

بعد سنة السيرفرات بقت أسرع وعايز تقوّي الإعدادات. الـ hashes القديمة متخزنة بالإعدادات القديمة، ومعندكش الباسوردات تعمل hash جديد. الحل: [[verify_and_update]] بتعمله وقت الـ login:

~~~python
main.hasher = PasswordHash((Argon2Hasher(time_cost=4, memory_cost=131072),))
c.post("/login", data={"email": "mona@example.com", "password": "s3cret-Pass"})
~~~

~~~text الناتج (اتشغّل فعلًا)
200
m=65536,t=3,p=4 -> m=131072,t=4,p=4
~~~

ولو بتنقل من bcrypt، حط الاتنين في اللستة، و Argon2 الأول:

~~~python
strong = PasswordHash((Argon2Hasher(time_cost=4, memory_cost=131072), BcryptHasher()))
ok, new = strong.verify_and_update("s3cret-Pass", bcrypt_hash)
~~~

~~~text الناتج (اتشغّل فعلًا)
from bcrypt: True $argon2id$v=19$m=131072,t=4,p=
again: True None
~~~

أول مرة الـ bcrypt hash اتقبل ورجع بداله Argon2. والمرة التانية على الـ hash الجديد [[new]] بقى [[None]] لأنه بالإعدادات الحالية خلاص.

---

## ٧. ليه [[def]] مش [[async def]]؟

الـ hash شغل CPU بحت، مفيهوش [[await]]. لو حطيته في [[async def]]، بيقفل الـ event loop ٥٠ms، وكل الطلبات التانية بتستنى. قسناها على uvicorn: ١٠ logins مع بعض، وبعد ٥٠ms طلب [[/ping]] صغير:

~~~text الناتج (اتشغّل فعلًا: ٣ مرات لكل واحد)
/login 10 logins + ping: 519ms total, ping waited 12ms
/login-async 10 logins + ping: 795ms total, ping waited 660ms
/login 10 logins + ping: 394ms total, ping waited 11ms
/login-async 10 logins + ping: 594ms total, ping waited 484ms
/login 10 logins + ping: 423ms total, ping waited 13ms
/login-async 10 logins + ping: 591ms total, ping waited 485ms
~~~

بـ [[def]] الـ ping استنى ١٢ms. بـ [[async def]] استنى نص ثانية، لأنه كان مستني الـ logins اللي قبله تخلص واحد واحد. ولو الـ endpoint لازم يبقى async (عشان بيعمل [[await]] على القاعدة)، اعمل [[await anyio.to_thread.run_sync(hasher.verify, password, stored)]]. التفاصيل في درس «blocking في async».

---

## ٨. المقارنة الـ timing-safe

[[verify]] بتقارن جوه argon2-cffi في وقت ثابت. بس فيه حاجات تانية بتقارنها انت: توكن «نسيت الباسورد»، و API key، و توقيع webhook. ودول **متقارنهمش بـ [[==]]**، لأن [[==]] بيقف عند أول حرف مختلف، فنظريًا الوقت بيقول المهاجم كام حرف صح. استخدم [[hmac.compare_digest]]:

~~~python
import hashlib, hmac, secrets
token = secrets.token_urlsafe(32)                 # اللي بيتبعت في الإيميل
stored = hashlib.sha256(token.encode()).hexdigest()  # اللي بيتخزن
def check(given: str) -> bool:
    return hmac.compare_digest(hashlib.sha256(given.encode()).hexdigest(), stored)
~~~

~~~text الناتج (اتشغّل فعلًا)
43 BkSQ-Iiq5F...
True False
first char differs: == 36.4ns  compare_digest 78.5ns
last char differs: == 37.6ns  compare_digest 79.1ns
TypeError: comparing strings with non-ASCII characters is not supported
~~~

تلات حاجات من الناتج ده:

- هنا SHA-256 **مناسب**، عكس الباسورد: التوكن ٣٢ byte عشوائي (٢٥٦ bit)، فالتخمين مستحيل مهما كانت الـ hash سريعة. الـ hash البطيء محتاجينه للباسورد بس لأن البشر بيختاروا باسوردات ضعيفة.
- على ٦٤ حرف في Python، فرق [[==]] بين «أول حرف مختلف» و «آخر حرف مختلف» مكانش باين في قياسنا (٣٦ و ٣٧ نانوثانية). ده مش معناه إن [[==]] آمن: المهاجم بيقيس ملايين المرات على نت أهدى، و [[compare_digest]] بيضمن الوقت الثابت بدل ما تعتمد على الحظ.
- [[compare_digest]] بيرفض نصوص فيها حروف مش ASCII بـ [[TypeError]]. لو ممكن يبقى فيه عربي، قارن [[.encode()]] للاتنين (bytes).

---

## ٩. فخ bcrypt: ٧٢ byte

~~~text الناتج (اتشغّل فعلًا: bcrypt 5.0)
ValueError password cannot be longer than 72 bytes, truncate manually if necessary (e.g. my_password[:72])
~~~

bcrypt بيشوف أول ٧٢ byte بس. النسخ القديمة كانت بتقص ساكت (فباسوردين أول ٧٢ byte فيهم زي بعض كانوا بيتقبلوا الاتنين)، و 5.0 بقى بيرمي error. والحرف العربي ٢ byte في UTF-8، فباسورد عربي ٤٠ حرف بيعدّي الحد. Argon2 مالوش الحد ده، وده سبب تاني تختاره. ولو لازم bcrypt، حط [[max_length]] صغير أو اعمل pre-hash بـ HMAC (من الوثائق، ماتجرّبش هنا).

---

## «توصل للإجابة بنفسك»

~~~bash
python -c "from pwdlib import PasswordHash; help(PasswordHash.verify_and_update)"
python -c "from pwdlib.hashers.argon2 import Argon2Hasher; help(Argon2Hasher.__init__)"
pip show pwdlib argon2-cffi
~~~

الأولاني بيوريك إن الدالة بترجّع [[tuple[bool, str | None]]]، والتاني بيوريك أسماء الإعدادات ([[time_cost]] و [[memory_cost]] و [[parallelism]]) وقيمها الافتراضية. ولو [[verify]] رمت [[UnknownHashError: This hash can't be identified]]، يبقى العمود فيه حاجة مش hash (غالبًا باسورد متخزّن plain من نسخة قديمة) أو hash من خوارزمية مش في اللستة.

---

## الخلاصة

| الحاجة | الصح | الغلط |
|---|---|---|
| التخزين | [[hasher.hash]] بـ Argon2id | الباسورد نفسه، أو md5 أو sha256 من غير salt وبطء |
| المكتبة | [[pwdlib]] | [[passlib]] مع bcrypt 5 (بتقع) |
| الـ login | رسالة واحدة، و verify على [[DUMMY_HASH]] | «الإيميل مش موجود» أو رجوع أسرع |
| نوع الـ endpoint | [[def]] أو [[to_thread]] | [[async def]] بيقفل الـ loop نص ثانية |
| تقوية الإعدادات | [[verify_and_update]] وتخزين [[new_hash]] | تجبر الكل يغيّر الباسورد |
| مقارنة توكن | [[hmac.compare_digest]] على bytes | [[==]] |
| الطول | [[max_length=128]] | مفيش حد، أو bcrypt بباسورد عربي طويل |`,
          try: R`سطّب [[pip install fastapi "pwdlib[argon2]" python-multipart httpx]]، واحفظ المثال [[main.py]]، وشغّله بـ [[fastapi dev main.py]]. سجّل بـ [[curl -i -d "email=Mona@Example.com&password=s3cret-Pass" localhost:8000/register]]، وبعدين ادخل بالباسورد الصح، والغلط، وبإيميل مش موجود، وقيس الوقت بـ [[curl -o /dev/null -s -w "%{time_total}\n" ...]] (على ويندوز في PowerShell: [[Measure-Command { curl.exe ... }]]). وبعدين امسح [[or DUMMY_HASH]] وخلّي الشرط [[if not stored or not hasher.verify(password, stored)]] وقيس تاني.`,
          practice: [
            { lvl: 'سريع', t: R`**راجع:** من غير ما تبص فوق، اكتب على ورقة معنى كل جزء في [[$argon2id$v=19$m=65536,t=3,p=4$KOxPGg/e7JvKmbB2Av03dQ$CkaAQM2FtRE5SAo8DRNCOTPoiRT+SCg/Fe8VNTWiyxQ]]، وإيه اللي هيتغيّر فيه لو عملت hash لنفس الباسورد تاني، وإيه اللي هيتغيّر لو [[memory_cost=131072]].`, done: R`كتبت ٧ أجزاء صح (النوع والنسخة و m و t و p والـ salt والناتج)، وعرفت إن الـ salt والناتج بس اللي بيتغيّروا في الـ hash التاني، و [[m=131072]] في الحالة التالتة، وطابقت ده بتشغيل فعلي.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[ok, new = PasswordHash((Argon2Hasher(), BcryptHasher())).verify_and_update(pw, h)]]. توقّع [[ok]] و [[new]] في ٤ حالات: [[h]] bcrypt والباسورد صح، و bcrypt والباسورد غلط، و Argon2 بالإعدادات الافتراضية والباسورد صح، و Argon2 بـ [[t=2]] والباسورد صح. وبعدين شغّل.`, done: R`الأربعة طابقوا: [[True]] و hash Argon2 جديد، و [[False]] و [[None]]، و [[True]] و [[None]]، و [[True]] و hash جديد بـ [[t=3]]. وتقدر تقول ليه الحالة التانية مبترجّعش hash (مفيش باسورد صح نعمله hash).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الـ login ده فيه ٤ مشاكل أمان. لاقيهم وصلّحهم من غير ما تغيّر شكل الرد الناجح: [[async def login(email: str = Form(), password: str = Form()):]] وجواها [[user = users.get(email)]] و [[if not user: raise HTTPException(404, "no such user")]] و [[if hashlib.sha256(password.encode()).hexdigest() != user: raise HTTPException(401, "wrong password")]].`, done: R`لقيت الأربعة: [[async def]] مع شغل CPU، و 404 برسالة بتفضح، و SHA-256 سريع ومن غير salt، و [[!=]] مش timing-safe (وكمان مفيش توحيد للإيميل). وبعد التصليح الثلاث حالات بيرجعوا 401 بنفس الرسالة وبفرق وقت أقل من ١٠ms.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** [[test_passwords.py]] بـ pytest و TestClient على المثال: التسجيل بحروف كبيرة والدخول بصغيرة، وباسورد ٧ حروف بيرجع 422، وباسورد ١٢٩ حرف بيرجع 422، وباسورد عربي [[كلمةسر١٢٣٤]] بيشتغل، والـ hash المتخزّن بيبدأ بـ [[$argon2id$]] ومش فيه الباسورد.`, done: R`٥ اختبارات خضرا بـ [[pytest -q]]، ولما تشيل [[.lower()]] من الـ login اختبار الحروف بيفشل، ولما تشيل [[max_length]] اختبار الـ ١٢٩ بيفشل.` },
            { lvl: 'تحدي', t: R`**هاجم ودافع:** اكتب [[enum_attack.py]] بيبعت login لـ ٢٠ إيميل (٣ منهم متسجّلين) بباسورد غلط، ويقيس الوسيط لـ ٥ مرات لكل إيميل، ويطبع الإيميلات اللي «شكلها متسجّلة». شغّله على نسخة من غير [[DUMMY_HASH]]، وبعدين على المثال.`, done: R`على النسخة البايظة السكربت بيطلّع الـ ٣ إيميلات بالظبط (فرق حوالي ٥٠ms)، وعلى المثال مبيقدرش يفرّق (كل الأوقات في نطاق ١٠ms من بعض) وبيطلّع صفر أو إيميلات غلط.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** على جهازك قيس [[hash]] بـ ٤ إعدادات: الافتراضي، و [[time_cost=2, memory_cost=19456, parallelism=1]] (أقل حاجة OWASP بتقولها)، و [[time_cost=6]]، و bcrypt [[rounds=12]]. وبعدين شغّل ٢٠ login مع بعض على uvicorn بأتقل إعداد وشوف الذاكرة في Task Manager أو [[htop]].`, done: R`عندك جدول ٤ صفوف بالوقت المتوسط بتاع ٥ مرات، واخترت إعداد بين ٥٠ و ٢٥٠ms وكتبت ليه، وكتبت أقصى ذاكرة شفتها وقت الـ ٢٠ login وقارنتها بـ [[20 × memory_cost]].` },
          ],
          deep: {
            why: R`الباسوردات بتتسرّب: backup على S3 مفتوح، أو SQL injection في endpoint قديم، أو لابتوب موظف. والناس بتستخدم نفس الباسورد في كل حتة، فتسريبك بيبقى مفتاح حساباتهم في البنك والإيميل. الـ hash البطيء مبيمنعش التسريب، بس بيخلي اللي اتسرّب مالوش قيمة تقريبًا: ١٨ تخمينة في الثانية بدل مليون.`,
            how: R`**Argon2id** بيملا مساحة ذاكرة ([[m]] KiB) ببيانات معتمدة على الباسورد والـ salt، ويلف عليها [[t]] مرات بترتيب صعب يتوقّع. الذاكرة هي السر: الـ GPU فيه آلاف cores بس ذاكرة قليلة لكل core، فمبيقدرش يجرّب آلاف الباسوردات مع بعض زي ما بيعمل مع SHA-256.

**الـ salt** ١٦ byte عشوائي لكل hash، متخزّن جوه النص. بيمنع الـ rainbow tables، وبيخلي المهاجم يشتغل على كل يوزر لوحده.

**[[verify]]** بيقرا الإعدادات والـ salt من النص المتخزّن، ويحسب Argon2 للباسورد اللي جه بنفس الإعدادات، ويقارن في وقت ثابت. علشان كده الإعدادات القديمة بتفضل شغالة بعد ما تغيّرها.

**[[verify_and_update]]** بيعمل verify، ولو نجح وشاف إن الـ hash مش بالـ hasher الأول في اللستة أو بإعدادات مختلفة عن الحالية ([[check_needs_rehash]])، بيعمل hash جديد ويرجّعه.

**التوقيت:** [[def]] بيتنفذ في threadpool (٤٠ thread افتراضيًا في anyio)، فالـ event loop بيفضل فاضي. و [[DUMMY_HASH]] بيخلي مسار «اليوزر مش موجود» يعمل نفس الشغل بالظبط. و [[hmac.compare_digest]] بيقارن كل الـ bytes دايمًا حتى لو أول واحد مختلف.

**pepper** (اختياري): سر في الإعدادات (مش في القاعدة) بيتعمل بيه HMAC للباسورد قبل الـ hash، فلو القاعدة اتسرّبت من غير السر، الـ hashes متتجرّبش أصلًا. العيب إنك لو ضيّعت السر كل الباسوردات بتبوظ (من الوثائق، ماتجرّبش هنا).`,
            when: R`أي حساب بباسورد. ولو تقدر متخزّنش باسوردات خالص (login بـ Google أو magic link أو passkeys)، ده أحسن، بس لسه هتحتاج [[compare_digest]] للتوكنات. و bcrypt مقبول لو النظام القديم عليه، بس المشاريع الجديدة Argon2id. ولما تقوّي الإعدادات، [[verify_and_update]] بينقل الناس لوحدهم، والناس اللي مدخلتش من سنة ممكن تجبرهم على reset.`,
            mistakes: R`[[hashlib.sha256(password)]] أو md5 للباسورد، حتى مع salt: سريعين أوي. و [[passlib]] مع [[bcrypt]] 5 (بيقع بـ [[ValueError]] في أول hash). و [[async def]] للـ login (اتقاس: الطلبات التانية استنت نص ثانية). و «الإيميل مش موجود» في رسالة و «الباسورد غلط» في التانية، أو رجوع أسرع للإيميل اللي مش موجود. و [[==]] لمقارنة توكن أو API key. ومفيش [[max_length]] فحد يبعت باسورد ١٠ ميجا. وتسجيل الباسورد في اللوج بالغلط (logging للـ form كله، أو exception فيها الـ locals). وعمود [[varchar(60)]] للـ hash: Argon2 طوله ٩٧ ويطول مع الإعدادات.`
          },
          sol: R`[[register]] بيرجع [[HTTP/1.1 201 Created]] و [[{"email":"mona@example.com"}]] (اتوحّد). الـ login الصح [[200]] و [[{"ok":true}]]، والباسورد الغلط والإيميل اللي مش موجود الاتنين [[401]] و [[{"detail":"wrong email or password"}]]. والوقت في تجربتنا (TestClient) ٥٠ و ٤٧ و ٤٩ms: نفس الرقم تقريبًا.

بعد ما تشيل [[DUMMY_HASH]]: الباسورد الغلط لإيميل موجود بقى حوالي ٥٥ms، والإيميل اللي مش موجود ٤ms (الوسيط من ١٠ طلبات). الفرق ده هو الثغرة. ولو [[curl]] بيطلع رقم أكبر في أول طلب، ده لأن أول طلب بيفتح الاتصال والـ threadpool؛ قيس كذا مرة وخد الوسيط.`,
          solCode: R`import statistics, time
from fastapi.testclient import TestClient
import main

c = TestClient(main.app)
c.post("/register", data={"email": "mona@example.com", "password": "s3cret-Pass"})
for email in ["mona@example.com", "nobody@example.com"]:
    times = []
    for _ in range(10):
        start = time.perf_counter()
        c.post("/login", data={"email": email, "password": "wrong-pass"})
        times.append((time.perf_counter() - start) * 1000)
    print(email, f"{statistics.median(times):.1f}ms")`
        },
        {
          cmd: "JWT و refresh token",
          title: "access token قصير و refresh token بـ rotation و denylist، و 401 حقيقية",
          learn: R`تطلّع access token لـ ١٥ دقيقة و refresh token في cookie [[HttpOnly]]، وتلف الـ refresh مع كل استخدام، وتكشف لو اتسرق، وتلغي التوكن في الـ logout.`,
          out: R`auth كامل بـ login و refresh و logout و [[/me]]، وكل رفض فيه 401 و [[WWW-Authenticate: Bearer]] وسبب واضح.`,
          use: {
            prog: R`أي API بيتكلّم معاه frontend أو موبايل. الـ JWT بيخلي السيرفر يعرف انت مين من غير ما يسأل القاعدة في كل طلب.`,
            work: R`أشهر سؤال في الانترفيو والـ review: «لو التوكن اتسرق؟». الإجابة هي الدرس ده: عمر قصير، و refresh بيلف، و reuse detection، و denylist.`,
          },
          desc: R`**الـ access token** JWT قصير العمر (١٥ دقيقة) بيتبعت مع كل طلب في [[Authorization: Bearer ...]]. والسيرفر بيتأكد منه بالتوقيع بس، من غير قاعدة بيانات. **الـ refresh token** عمره طويل (أسبوعين)، ومهمته الوحيدة إنه يجيب access جديد من [[/auth/refresh]]، ومكانه cookie [[HttpOnly]] على مسار [[/auth]] بس، فالـ JavaScript مبيشوفوش.

وأربع قواعد بتخلي ده آمن:
• **rotation:** كل refresh بيتستخدم مرة واحدة ويطلع بداله واحد جديد.
• **reuse detection:** لو refresh قديم اتستخدم تاني، يبقى حد سرقه، فبنقفل «العيلة» كلها (كل التوكنات اللي طلعت من نفس الـ login).
• **denylist:** الـ logout بيحط [[jti]] (رقم التوكن) في لستة لحد ما يخلص.
• **[[algorithms=["HS256"]]] صريح** في [[jwt.decode]]: من غيره PyJWT بيرفض يشتغل، وده اللي بيقفل هجمة [[alg: none]].

[[OAuth2PasswordBearer]] بيقرا الـ header ويرجّع 401 لو مش موجود، و [[OAuth2PasswordRequestForm]] بيقرا username و password من form. وكل 401 لازم يبقى معاها header [[WWW-Authenticate: Bearer]].

ده بيكمّل درس «auth dependency» (اللي فيه أساس [[current_user]] والـ roles) ودرس «تشفير الباسورد» (اللي بيتأكد من الباسورد قبل ما التوكن يطلع).`,
          example: R`import secrets, time, uuid
from typing import Annotated
import jwt
from fastapi import Cookie, Depends, FastAPI, HTTPException, Response
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pwdlib import PasswordHash

SECRET = secrets.token_urlsafe(32)
ACCESS_TTL, REFRESH_TTL = 15 * 60, 14 * 24 * 3600
hasher = PasswordHash.recommended()
USERS = {"mona": {"id": "1", "hash": hasher.hash("s3cret-Pass")}}
refresh_store: dict[str, dict] = {}
denylist: dict[str, int] = {}
oauth2 = OAuth2PasswordBearer(tokenUrl="/auth/login")
app = FastAPI()

def make_token(sub: str, kind: str, ttl: int, **extra) -> tuple[str, str]:
    jti, now = uuid.uuid4().hex, int(time.time())
    claims = {"sub": sub, "type": kind, "jti": jti, "iat": now, "exp": now + ttl, **extra}
    return jwt.encode(claims, SECRET, algorithm="HS256"), jti

def unauthorized(msg: str) -> HTTPException:
    return HTTPException(401, msg, headers={"WWW-Authenticate": "Bearer"})

def issue_pair(user_id: str, family: str, response: Response) -> dict:
    access, _ = make_token(user_id, "access", ACCESS_TTL)
    refresh, jti = make_token(user_id, "refresh", REFRESH_TTL, fam=family)
    refresh_store[jti] = {"user": user_id, "family": family, "used": False}
    response.set_cookie("refresh_token", refresh, max_age=REFRESH_TTL, httponly=True, secure=True, samesite="strict", path="/auth")
    return {"access_token": access, "token_type": "bearer", "expires_in": ACCESS_TTL}

@app.post("/auth/login")
def login(form: Annotated[OAuth2PasswordRequestForm, Depends()], response: Response):
    user = USERS.get(form.username)
    if not user or not hasher.verify(form.password, user["hash"]):
        raise unauthorized("wrong username or password")
    return issue_pair(user["id"], uuid.uuid4().hex, response)

@app.post("/auth/refresh")
def refresh(response: Response, refresh_token: Annotated[str | None, Cookie()] = None):
    if not refresh_token:
        raise unauthorized("no refresh token")
    try:
        claims = jwt.decode(refresh_token, SECRET, algorithms=["HS256"])
    except jwt.InvalidTokenError as e:
        raise unauthorized(f"bad refresh token: {e}")
    record = refresh_store.get(claims["jti"])
    if claims.get("type") != "refresh" or record is None:
        raise unauthorized("refresh token revoked")
    if record["used"]:
        for r in refresh_store.values():
            if r["family"] == record["family"]:
                r["used"] = True
        raise unauthorized("refresh token reused, all sessions in this family revoked")
    record["used"] = True
    return issue_pair(claims["sub"], record["family"], response)

def current_user(token: Annotated[str, Depends(oauth2)]) -> str:
    try:
        claims = jwt.decode(token, SECRET, algorithms=["HS256"], options={"require": ["exp", "sub", "jti"]})
    except jwt.ExpiredSignatureError:
        raise unauthorized("token expired")
    except jwt.InvalidTokenError as e:
        raise unauthorized(f"invalid token: {e}")
    if claims.get("type") != "access" or claims["jti"] in denylist:
        raise unauthorized("token revoked")
    return claims["sub"]

@app.get("/me")
def me(user_id: Annotated[str, Depends(current_user)]):
    return {"user_id": user_id}

@app.post("/auth/logout", status_code=204)
def logout(response: Response, token: Annotated[str, Depends(oauth2)], refresh_token: Annotated[str | None, Cookie()] = None):
    no_exp = {"verify_exp": False}
    try:
        claims = jwt.decode(token, SECRET, algorithms=["HS256"], options=no_exp)
        denylist.setdefault(claims["jti"], claims["exp"])
        if refresh_token:
            refresh_store.pop(jwt.decode(refresh_token, SECRET, algorithms=["HS256"], options=no_exp)["jti"], None)
    except jwt.InvalidTokenError:
        raise unauthorized("invalid token")
    response.delete_cookie("refresh_token", path="/auth")`,
          lines: [
            R`[[secrets]] لعمل سر عشوائي آمن، و [[time]] للوقت الحالي بالثواني (الـ JWT بيستخدم Unix time)، و [[uuid]] لعمل رقم فريد لكل توكن.`,
            R`[[Annotated]] عشان نكتب النوع ومعاه الـ dependency في مكان واحد.`,
            R`مكتبة PyJWT ([[pip install pyjwt]]، والـ import اسمه [[jwt]]). خد بالك: فيه مكتبة اسمها [[jwt]] بس على PyPI ودي حاجة تانية خالص، ولو سطّبتها بالغلط [[jwt.encode]] مش هيبقى موجود.`,
            R`[[Cookie]] بيقرا قيمة من الـ cookies، و [[Response]] بيدّينا الـ response عشان نحط فيه cookie، والباقي اتشرح في دروس «Depends و Annotated» و «HTTPException».`,
            R`[[OAuth2PasswordBearer]] dependency بتقرا [[Authorization: Bearer]]، و [[OAuth2PasswordRequestForm]] بتقرا [[username]] و [[password]] من form بالشكل اللي معيار OAuth2 بيقوله (وده اللي زرار Authorize في [[/docs]] بيبعته).`,
            R`[[PasswordHash]] من درس «تشفير الباسورد»، عشان الـ login يتأكد من الباسورد.`,
            R`مفتاح التوقيع: ٣٢ byte عشوائي (٤٣ حرف base64). هنا بيتعمل جديد كل تشغيل، فكل التوكنات بتبوظ لما السيرفر يعيد. في الحقيقة بيتقري من الإعدادات بـ [[SecretStr]] (درس «pydantic-settings»)، وأقل من ٣٢ byte PyJWT بيطلّع [[InsecureKeyLengthWarning]].`,
            R`عمر التوكنين بالثواني: الـ access ١٥ دقيقة (لو اتسرق، الضرر ١٥ دقيقة بس)، والـ refresh ١٤ يوم (اليوزر ميدخلش الباسورد كل شوية).`,
            R`[[recommended()]] = Argon2 بالإعدادات الافتراضية، نفس الدرس اللي فات.`,
            R`يوزر واحد للتجربة. الـ hash بيتحسب وقت التشغيل، فالتشغيل بياخد ٥٠ms زيادة.`,
            R`مكان الـ refresh tokens اللي طلعت: المفتاح [[jti]]، والقيمة اليوزر والعيلة وهل اتستخدم. ده اللي بيخلي الـ refresh «stateful» ونقدر نلغيه. في الإنتاج ده Redis أو جدول، عشان يعيش بعد restart ويتشارك بين الـ workers.`,
            R`الـ denylist: [[jti]] بتاع كل access token اتعمله logout، والقيمة [[exp]] بتاعه عشان نمسحه لما يخلص (في Redis: [[SET jti 1 EXAT exp]] فبيتمسح لوحده).`,
            R`[[tokenUrl]] مش بيعمل route، ده بيتكتب في OpenAPI بس عشان [[/docs]] يعرف يبعت الـ login فين. ولما الـ header مش موجود الـ dependency دي بترجّع 401 و [[{"detail":"Not authenticated"}]] لوحدها.`,
            R`التطبيق نفسه، وكل الـ routes اللي تحت بتتسجّل عليه بالـ decorators.`,
            R`دالة واحدة بتعمل الاتنين. [[kind]] بيبقى [["access"]] أو [["refresh"]]، و [[**extra]] لأي claims زيادة (العيلة في الـ refresh). وبترجّع التوكن ومعاه الـ [[jti]] عشان نخزّنه.`,
            R`[[uuid4().hex]] ٣٢ حرف hex عشوائي، رقم فريد لكل توكن. و [[int(time.time())]] الوقت دلوقتي بالثواني من ١٩٧٠، لأن [[exp]] و [[iat]] في JWT لازم أرقام صحيحة بالثواني.`,
            R`الـ claims: [[sub]] (subject = رقم اليوزر، **string** مش رقم: PyJWT 2.10 وأحدث بيرفض [[sub]] رقم)، و [[type]] عشان الـ refresh ميتستخدمش كـ access، و [[jti]] (JWT ID) للإلغاء، و [[iat]] (issued at)، و [[exp]] (expiry) اللي [[jwt.decode]] بيتأكد منه لوحده.`,
            R`[[jwt.encode]] بيعمل الـ header و الـ payload بـ base64 ويوقّعهم بـ HMAC-SHA256 بالسر. الناتج ٣ أجزاء بينهم نقط. والـ payload **مقروء لأي حد** (base64 بس مش تشفير)، فمتحطش فيه حاجة سرية.`,
            R`دالة صغيرة بتعمل 401 موحّدة، عشان كل الرفض يبقى شكله واحد.`,
            R`[[WWW-Authenticate: Bearer]] مطلوب في 401 حسب معيار HTTP (RFC 6750)، وبيقول للـ client «محتاج Bearer token». من غيره بعض الـ clients والـ proxies بيتعاملوا مع الرد غلط.`,
            R`بتطلّع الاتنين مع بعض وتحط الـ refresh في cookie. [[family]] رقم بيتعمل مرة واحدة في الـ login، وبيتنقل لكل refresh بيطلع بعده، فكل الـ session دي عيلة واحدة.`,
            R`access جديد، والـ [[jti]] بتاعه مش محتاجينه هنا ([[_]] = «مش هستخدمه»).`,
            R`refresh جديد بنفس العيلة في claim اسمه [[fam]].`,
            R`نسجّله في الـ store: لسه متستخدمش. من غير السطر ده [[/auth/refresh]] هيرفضه كأنه ملغي.`,
            R`الـ cookie: [[httponly=True]] الـ JavaScript مبيقدرش يقراه (فـ XSS مبيسرقوش)، و [[secure=True]] بيتبعت على HTTPS بس، و [[samesite="strict"]] مبيتبعتش من موقع تاني (حماية CSRF)، و [[path="/auth"]] بيتبعت مع [[/auth/...]] بس مش مع كل طلب. و [[max_age]] بالثواني نفس عمر التوكن.`,
            R`الرد بالشكل اللي OAuth2 بيقوله: [[access_token]] و [[token_type]] لازم [[bearer]]، و [[expires_in]] عشان الـ frontend يعرف يجدد قبل ما يخلص. الـ refresh مش في الـ body، هو في الـ cookie بس.`,
            R`route الـ login. الـ path لازم يطابق [[tokenUrl]] اللي فوق، ولا زرار Authorize في [[/docs]] هيبعت لمكان مش موجود ويطلّع 404.`,
            R`[[Depends()]] من غير argument معناها «اعمل instance من الكلاس ده واملاه من الطلب». و [[response: Response]] FastAPI بيدّيك الـ response اللي هيتبعت عشان تحط فيه cookie.`,
            R`نجيب اليوزر بالاسم. [[form.username]] بيبقى الإيميل في أغلب التطبيقات، بس الاسم في المعيار [[username]].`,
            R`نتأكد من الباسورد. هنا مفيش [[DUMMY_HASH]] للاختصار؛ في الحقيقة استخدم نسخة الدرس اللي فات.`,
            R`رسالة واحدة للحالتين، ومعاها header الـ [[WWW-Authenticate]].`,
            R`عيلة جديدة لكل login: [[uuid4().hex]]. لو اليوزر داخل من موبايل ولابتوب، كل واحد عيلة لوحده، فلو واحد اتسرق مش بنخرّج التاني.`,
            R`route التجديد. الـ frontend بيناديه لما الـ access يخلص (أو قبلها بشوية).`,
            R`[[Cookie()]] بيقرا cookie اسمه زي اسم المتغير بالظبط: [[refresh_token]]. و [[= None]] عشان لو مش موجود نرجّع 401 بتاعتنا بدل 422 بتاعة FastAPI.`,
            R`مفيش cookie: يبقى اليوزر مش داخل، أو الـ cookie اتبعت على مسار تاني، أو على HTTP والـ [[secure]] منعه.`,
            R`401 برسالة بتقول السبب بالظبط، عشان الـ frontend يعرف إن الحل إنه يودّي اليوزر لصفحة الـ login.`,
            R`[[jwt.decode]] بيرمي exception لأي مشكلة في التوكن، فبنلفه بـ [[try]] عشان نحوّلها 401 بدل ما توصل للـ client كـ 500.`,
            R`بيتأكد من التوقيع ومن [[exp]]. و [[algorithms=["HS256"]]] **لازم**: ده بيقول «اقبل HS256 بس»، فتوكن [[alg: none]] أو [[RS256]] بيترفض. ومن غير الـ argument خالص PyJWT بيرمي [[DecodeError]] (اتجرّب تحت).`,
            R`[[InvalidTokenError]] الأب لكل أخطاء PyJWT: توقيع غلط، أو منتهي، أو شكله بايظ، أو algorithm مش مسموح.`,
            R`بنرجّع السبب من PyJWT في الرسالة عشان التجربة تبان. في الإنتاج ممكن تخليها «invalid token» وتكتب السبب في اللوج بس.`,
            R`نجيب الـ refresh من الـ store بالـ [[jti]] بتاعه.`,
            R`مش refresh (حد بعت access في الـ cookie)، أو مش في الـ store (اتعمله logout، أو السيرفر اتعاد والـ store في الذاكرة).`,
            R`401: التوكن صحيح التوقيع بس ملغي أو مش من النوع الصح. ده الفرق بين JWT لوحده (مينفعش يتلغي) و JWT معاه state على السيرفر.`,
            R`**reuse detection:** الـ refresh ده اتستخدم قبل كده. اليوزر الحقيقي عمره ما هيبعته تاني لأنه خد واحد جديد، يبقى حد معاه نسخة قديمة.`,
            R`بنلف على كل الـ refresh tokens المتخزّنة، عشان نلاقي كل اللي طالع من نفس الـ login...`,
            R`...ونختار اللي العيلة بتاعته زي عيلة التوكن اللي اتستخدم تاني (نفس الـ login ونفس الجهاز)...`,
            R`...ونعلّمها مستخدمة. كده اللص واليوزر الحقيقي الاتنين هيترفضوا في الـ refresh الجاي، واليوزر يدخل بالباسورد تاني. ده أحسن من إن اللص يفضل جوه أسبوعين.`,
            R`401 بالسبب. في الإنتاج دي لحظة تكتب فيها لوج تحذير وممكن تبعت إيميل لليوزر.`,
            R`**rotation:** بنعلّم ده مستخدم قبل ما نطلّع الجديد، فمينفعش يتستخدم تاني. (لو طلبين refresh جم مع بعض من نفس المتصفح، التاني هيتقفل كأنه سرقة؛ اتشرح في teach.)`,
            R`توكنين جداد بنفس العيلة، والـ cookie الجديد بيكتب فوق القديم في المتصفح.`,
            R`الـ dependency اللي أي route محمي بيستخدمها. [[Depends(oauth2)]] بتدّيها التوكن من الـ header أو بترجّع 401 قبل ما تشتغل.`,
            R`نفك التوكن جوه [[try]]، عشان كل نوع خطأ يتحوّل لـ 401 بالرسالة المناسبة ليه.`,
            R`[[options={"require": [...]}]] بيرفض أي توكن ناقصه [[exp]] أو [[sub]] أو [[jti]]. من غيره توكن من غير [[exp]] بيعيش للأبد، وتوكن من غير [[jti]] مينفعش يتلغي.`,
            R`[[ExpiredSignatureError]] لوحده الأول عشان نقول «expired» بالظبط، فالـ frontend يعرف إن الحل refresh مش login. لازم يبقى قبل [[InvalidTokenError]] لأنه نوع منه.`,
            R`401 برسالة «token expired»، فالـ frontend ينادي [[/auth/refresh]] ويعيد الطلب بالتوكن الجديد بدل ما يخرّج اليوزر.`,
            R`أي مشكلة تانية من PyJWT: توقيع غلط، أو شكل بايظ، أو algorithm مش مسموح، أو claim ناقص.`,
            R`401 ومعاها سبب PyJWT في الرسالة (زي [[Signature verification failed]]) عشان التجربة تبان.`,
            R`حتى لو التوقيع سليم: لازم يكون access مش refresh، ومش في الـ denylist. من غير شرط [[type]] الـ refresh token (اللي عمره أسبوعين) كان هينفع يتستخدم كـ access.`,
            R`401 برسالة «token revoked»: التوكن سليم بس مش مسموح يتستخدم هنا تاني.`,
            R`بنرجّع رقم اليوزر. في الحقيقة هنا بتجيب اليوزر من القاعدة أو بترجّع الـ claims، زي درس «auth dependency».`,
            R`route محمي بيرجّع بيانات اليوزر الحالي، وده أول route الـ frontend بيناديه بعد الـ login عشان يعرف هو مين.`,
            R`أي route فيه [[Depends(current_user)]] محمي. ولو عايز تحمي router كامل: [[APIRouter(dependencies=[Depends(current_user)])]].`,
            R`بيرجّع رقم اليوزر اللي طلع من التوكن. في تطبيق حقيقي هنا بترجّع الاسم والإيميل من القاعدة بـ [[response_model]].`,
            R`الـ logout، و 204 = «تمام ومفيش body».`,
            R`بياخد الـ access من الـ header (لازم تكون داخل عشان تخرج)، والـ refresh من الـ cookie لو موجود.`,
            R`[[verify_exp: False]] معناها «اتأكد من التوقيع بس متهمّش لو منتهي». لأن اللي عايز يعمل logout بتوكن خلص لسه لازم نمسحله الـ refresh. من غيرها التوكن المنتهي كان بيرمي exception ويرجّع 500 (حصل في أول نسخة من المثال).`,
            R`[[try]] حوالين الاتنين: توكن بايظ أو مزوّر يرجّع 401 مش 500.`,
            R`بنفك الـ access. التوقيع لسه بيتأكد منه، فمحدش يقدر يعمل logout لحد تاني.`,
            R`نحطه في الـ denylist ومعاه [[exp]] بتاعه، عشان نعرف نمسحه إمتى: بعد الوقت ده مفيش داعي، لأنه هيترفض كـ expired لوحده. و [[setdefault]] بتضيفه لو مش موجود، فـ logout مرتين بنفس التوكن مبيغيّرش حاجة.`,
            R`لو المتصفح بعت الـ refresh cookie مع الطلب (مسار [[/auth/logout]] تحت [[/auth]] فبيتبعت)...`,
            R`...نشيله من الـ store خالص، فميطلّعش access جديد. [[pop(..., None)]] مبترميش لو مش موجود.`,
            R`التوكن مش JWT أصلًا أو توقيعه غلط...`,
            R`...نرجّع 401 بدل ما الـ exception يطلع للـ client كـ 500 ويتكتب traceback في اللوج.`,
            R`بيبعت [[Set-Cookie]] بنفس الاسم و [[Max-Age=0]] فالمتصفح يمسحه. **لازم نفس الـ [[path]]** اللي اتعمل بيه، ولا المتصفح هيعتبره cookie تاني ويسيب القديم.`,
          ],
          teach: R`## المثال بيعمل إيه؟

auth كامل: login بيطلّع access في الـ body و refresh في cookie، و [[/auth/refresh]] بيلف الـ refresh ويكشف السرقة، و [[/me]] محمي، و logout بيلغي. كل الناتج من تشغيل حقيقي: FastAPI 0.162 و PyJWT 2.15.1 و pwdlib 0.3.1 على ويندوز، بـ [[curl]] على uvicorn وبـ [[TestClient]].

---

## ١. ليه اتنين توكن مش واحد؟

| | access token | refresh token |
|---|---|---|
| العمر | ١٥ دقيقة | ١٤ يوم |
| بيتبعت فين | مع كل طلب في [[Authorization]] | لـ [[/auth/refresh]] بس، في cookie |
| السيرفر بيتأكد منه إزاي | التوقيع بس (من غير قاعدة) | التوقيع + الـ store |
| لو اتسرق | الضرر ١٥ دقيقة | الـ rotation بتكشفه وتقفل الـ session |
| الـ JavaScript بيشوفه؟ | أيوه (في الذاكرة) | لأ ([[HttpOnly]]) |

توكن واحد عمره طويل = لو اتسرق، اللص جوه شهر ومفيش طريقة توقفه غير إنك تغيّر السر (وده بيخرّج الكل). وتوكن واحد عمره قصير = اليوزر بيدخل الباسورد كل ربع ساعة. الاتنين مع بعض بيدّوا الأمان والراحة.

---

## ٢. من غير توكن

~~~bash
curl -s -i http://127.0.0.1:8071/me
~~~

~~~text الناتج (اتشغّل فعلًا)
HTTP/1.1 401 Unauthorized
date: Fri, 30 Oct 2026 03:35:58 GMT
server: uvicorn
www-authenticate: Bearer
content-length: 30
content-type: application/json

{"detail":"Not authenticated"}
~~~

ده [[OAuth2PasswordBearer]] نفسه، قبل ما [[current_user]] تشتغل. والـ header [[www-authenticate: Bearer]] جه لوحده.

---

## ٣. الـ login

~~~bash
curl -s -i -c jar.txt -d "username=mona&password=s3cret-Pass" http://127.0.0.1:8071/auth/login
~~~

[[-d]] بيبعت form (POST لوحده)، و [[-c jar.txt]] بيحفظ الـ cookies في ملف زي المتصفح.

~~~text الناتج (اتشغّل فعلًا، التوكنات متقصّرة)
HTTP/1.1 200 OK
content-type: application/json
set-cookie: refresh_token=eyJhbGciOiJIUzI1NiIs...ZilPBdbZ7-E; HttpOnly; Max-Age=1209600; Path=/auth; SameSite=strict; Secure

{"access_token":"eyJhbGciOiJIUzI1NiIs...dbZ7-E","token_type":"bearer","expires_in":900}
~~~

[[Max-Age=1209600]] = ١٤ × ٢٤ × ٣٦٠٠ ثانية. ولو فكّيت الـ payload (الجزء التاني) بـ base64:

~~~text الناتج (اتشغّل فعلًا)
{'sub': '1', 'type': 'access', 'jti': '2c1b2a5dcba64c01ae5256ea2fe33334', 'iat': 1793330700, 'exp': 1793331600}
~~~

[[exp - iat = 900]]: ربع ساعة بالظبط. وأي حد معاه التوكن يقدر يقرا ده، بس محدش يقدر يغيّره (الجزء التالت).

### ليه curl بعت cookie فيها Secure على http؟

[[Secure]] معناه HTTPS بس، والتجربة على [[http://127.0.0.1]]. curl والمتصفحات الحديثة بيعتبروا localhost «آمن» استثناء، فالـ cookie اتبعتت. على دومين حقيقي بـ http مش هتتبعت خالص، وده بيبان كـ [[no refresh token]].

---

## ٤. refresh و rotation وكشف السرقة

~~~text الناتج (اتشغّل فعلًا: TestClient على https://testserver)
D 200 {'user_id': '1'}
E 200 ['access_token', 'token_type', 'expires_in']
rotated: True
F 401 {'detail': 'refresh token reused, all sessions in this family revoked'}
G 401 {'detail': 'refresh token reused, all sessions in this family revoked'}
~~~

- **D:** [[/me]] بالـ access شغال.
- **E:** refresh نجح، و [[rotated: True]] معناها الـ cookie اتغيّر.
- **F:** حد بعت الـ refresh **القديم** (كأنه لص معاه نسخة): اترفض، والعيلة كلها اتقفلت.
- **G:** اليوزر الحقيقي بالـ refresh **الجديد**: اترفض هو كمان. ده مقصود: احنا مش عارفين مين فيهم اللص، فالاتنين يدخلوا بالباسورد، واللص معهوش باسورد.

وبـ curl على uvicorn: الـ refresh الأول بـ [[-b jar.txt]] رجع 200، وبعدين بعتنا نفس الـ cookie بإيدنا:

~~~text الناتج (اتشغّل فعلًا)
HTTP/1.1 401 Unauthorized
{"detail":"refresh token reused, all sessions in this family revoked"}
~~~

### فخ: تابين بيعملوا refresh مع بعض

لو التطبيق مفتوح في تابين والـ access خلص، الاتنين ممكن ينادوا [[/auth/refresh]] في نفس اللحظة بنفس الـ cookie. التاني هيتقفل كأنه سرقة. الحلول المعروفة: الـ frontend يعمل refresh واحد بس ويشاركه بين التابات (BroadcastChannel أو lock)، أو السيرفر يقبل نفس الـ refresh لـ ثانيتين بعد أول استخدام (grace period). ده من التصميم، ماتجرّبش في متصفح هنا.

---

## ٥. الهجمات اللي المثال بيقفلها

~~~text الناتج (اتشغّل فعلًا)
H 401 {'detail': 'invalid token: The specified alg value is not allowed'}
I 401 {'detail': 'token expired'}
  401 {'detail': 'invalid token: Signature verification failed'}
  401 {'detail': 'invalid token: Signature verification failed'}
  401 {'detail': 'invalid token: Token is missing the "jti" claim'}
K 401 {'detail': 'token revoked'}
  401 {'detail': 'Not authenticated'}
~~~

| السطر | الهجمة | ليه اترفضت |
|---|---|---|
| H | توكن header بتاعه [[{"alg":"none"}]] ومن غير توقيع | [[algorithms=["HS256"]]] مش فيها none |
| I | توكن [[exp]] بتاعه عدّى | [[jwt.decode]] بيشيّك [[exp]] لوحده |
| التالت | غيّرنا [[sub]] لـ 2 في الـ payload وسبنا التوقيع | التوقيع اتحسب على الـ payload القديم |
| الرابع | توكن متوقّع بسر تاني | السر غلط = توقيع غلط |
| الخامس | توكن من غير [[jti]] | [[options={"require": [...]}]] |
| K | الـ refresh token في [[Authorization]] | شرط [[type == "access"]] |
| الأخير | [[Authorization: Token abc]] | مش [[Bearer]]، فـ OAuth2PasswordBearer رفضه |

و [[alg: none]] هجمة حقيقية حصلت في مكتبات قديمة: المكتبة كانت بتقرا الـ algorithm من التوكن نفسه وتصدّقه. ولو حد غيّر آخر حرفين في التوقيع بس، PyJWT ساعات بيقول [[Invalid crypto padding]] بدل [[Signature verification failed]] (لأن الـ base64 نفسه بقى بايظ). الاتنين 401.

### من غير [[algorithms]]

~~~text الناتج (اتشغّل فعلًا)
N DecodeError It is required that you pass in a value for the "algorithms" argument when calling decode().
O 1
~~~

PyJWT 2 بيرفض يشتغل من غير ما تقول. و **O** هو [[jwt.decode(token, options={"verify_signature": False})]]: بيقرا الـ payload من غير أي تأكيد. ده للـ debugging بس، ولو لقيته في كود auth يبقى أي حد يقدر يبقى أي حد.

---

## ٦. logout و denylist

~~~text الناتج (اتشغّل فعلًا)
L 204 refresh_token=""; expires=Fri, 30 Oct 2026 03:25:00 GMT; Max-Age=0; Path=/auth; SameSite=lax
M 401 {'detail': 'token revoked'}
expired logout 204 True
garbage logout 401 {'detail': 'invalid token'}
~~~

- **L:** الـ logout بعت [[Max-Age=0]] بنفس الـ path فالمتصفح بيمسح الـ cookie.
- **M:** نفس الـ access اللي لسه فاضله ١٤ دقيقة بقى مرفوض، لأن الـ [[jti]] بتاعه في الـ denylist.
- **expired logout:** logout بتوكن منتهي نجح، بفضل [[verify_exp: False]]. أول نسخة من المثال كان فيها [[jwt.decode]] عادي هنا، فالتوكن المنتهي كان بيطلّع 500.

### الـ denylist مش بتكبر للأبد

كل [[jti]] متخزّن معاه [[exp]]. في Redis: [[SET deny:jti 1 EXAT exp]] فبيتمسح لوحده لما التوكن يخلص. وده سبب تاني الـ access يبقى قصير: الـ denylist بتفضل صغيرة. والتمن: كل طلب محمي بقى بيسأل Redis (أقل من ملي ثانية، درس «redis cache»). لو مش عايز ده، سيب الـ denylist، والـ logout يمسح الـ refresh بس، والـ access يعيش لحد ما يخلص (أقصى حاجة ١٥ دقيقة).

---

## ٧. التوكن يتخزن فين في الـ frontend؟

| المكان | XSS (كود JS غريب على صفحتك) | CSRF (موقع تاني بيبعت طلب باسمك) |
|---|---|---|
| [[localStorage]] | بيقراه ويبعته لأي حتة | مش مشكلة، المتصفح مبيبعتوش لوحده |
| متغير في الذاكرة | أصعب (لازم يشتغل وانت فاتح الصفحة) | مش مشكلة |
| cookie [[HttpOnly]] | مبيقدرش يقراه | محتاج [[SameSite]] أو CSRF token |

الشكل اللي في المثال هو الشائع: الـ access في الذاكرة (بيضيع لما الصفحة تتقفل، و [[/auth/refresh]] بيجيب واحد جديد)، والـ refresh في cookie [[HttpOnly]] و [[SameSite=strict]] و [[Path=/auth]]. ومن الـ frontend: [[fetch("/auth/refresh", { method: "POST", credentials: "include" })]]، و [[credentials: "include"]] لازم لو الـ API على دومين تاني (ومعاها CORS بـ [[allow_credentials=True]] و origin محدد، درس «CORS و middleware»). ده من الوثائق، ماتجرّبش في متصفح هنا.

---

## «توصل للإجابة بنفسك»

~~~bash
python -c "import jwt; help(jwt.decode)"
python -c "import jwt, inspect; print([n for n, c in inspect.getmembers(jwt.exceptions, inspect.isclass) if issubclass(c, jwt.InvalidTokenError)])"
~~~

التاني بيطبع كل أنواع الأخطاء اللي [[except jwt.InvalidTokenError]] بيمسكها ([[ExpiredSignatureError]] و [[ImmatureSignatureError]] و [[InvalidAudienceError]] و [[MissingRequiredClaimError]]...). ولو عايز تشوف جوه أي توكن من غير كود: الجزء التاني بـ base64، أو [[jwt.decode(t, options={"verify_signature": False})]] في REPL.

---

## الخلاصة

| الحاجة | الصح | الغلط |
|---|---|---|
| عمر الـ access | ١٥ دقيقة | يوم أو شهر |
| الـ refresh | cookie [[HttpOnly]] [[Secure]] [[SameSite]] [[Path=/auth]] | [[localStorage]] |
| بعد كل refresh | الـ refresh القديم مستخدم، وواحد جديد | نفس الـ refresh أسبوعين |
| refresh قديم رجع | اقفل العيلة كلها | اقبله |
| [[jwt.decode]] | [[algorithms=["HS256"]]] و [[require]] | من غير algorithms، أو [[verify_signature: False]] |
| [[sub]] | string | رقم (PyJWT الجديد بيرفضه) |
| 401 | معاها [[WWW-Authenticate: Bearer]] | 403 أو 500 أو من غير الـ header |
| السر | ٣٢ byte أو أكتر من الإعدادات | [["change-me"]] في الكود |`,
          try: R`سطّب [[pip install fastapi uvicorn pyjwt "pwdlib[argon2]" python-multipart]]، وشغّل المثال بـ [[uvicorn main:app --port 8000]]. اعمل login بـ [[curl -i -c jar.txt -d "username=mona&password=s3cret-Pass" localhost:8000/auth/login]]، وانسخ الـ access وجرّب [[/me]] بـ [[-H "Authorization: Bearer <التوكن>"]]. بعدين [[curl -i -b jar.txt -c jar.txt -X POST localhost:8000/auth/refresh]] مرتين، وبعدين ابعت الـ refresh القديم بإيدك ([[-H "Cookie: refresh_token=<القديم>"]]). وفي الآخر اعمل logout وجرّب [[/me]] بنفس الـ access.`,
          practice: [
            { lvl: 'سريع', t: R`**راجع:** املا جدول من ٣ أعمدة (access و refresh و الـ denylist) فيه: العمر، ومكان التخزين، والـ claims اللي جواه، وإيه اللي بيحصل لو اتسرق، وإيه اللي بيمسحه. من غير ما تبص على الدرس.`, done: R`الجدول فيه ١٥ خانة، وكل خانة مطابقة للمثال (مثلًا: الـ denylist بيتمسح منه الـ [[jti]] لما [[exp]] يعدّي، والـ refresh فيه [[fam]]).` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** إيه الرد (الكود والـ detail) في كل حالة: [[/me]] من غير header، و [[/me]] بـ [[Authorization: bearer <access>]] (حرف b صغير)، و [[/me]] بالـ refresh token، و [[/auth/refresh]] من غير cookie، و [[/auth/refresh]] بـ access token في الـ cookie. وبعدين جرّب.`, done: R`الخمسة طابقوا. والتانية بالذات: [[OAuth2PasswordBearer]] بيقبل [[bearer]] بأي حالة حروف (بيقارن بعد [[lower()]])، فرجعت 200؛ لو توقعت 401 شغّلتها وعرفت ليه.` },
            { lvl: 'تطبيق', t: R`**اشرحها:** اكتب لزميل في ٥ سطور ليه G في الدرس (اليوزر الحقيقي بالـ refresh الجديد) اترفض، وليه ده الصح، وإيه اللي كان هيحصل لو قفلنا الـ refresh القديم بس.`, done: R`الشرح فيه: السيرفر مش عارف مين اللص، واللص ممكن يكون هو اللي عمل refresh الأول ومعاه الجديد، وقفل القديم بس كان هيسيب اللص جوه ١٤ يوم.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** في الـ decode ده ٣ مشاكل: [[payload = jwt.decode(token, SECRET, algorithms=jwt.get_unverified_header(token)["alg"])]] و [[if payload["exp"] < time.time(): raise unauthorized("expired")]] و [[return payload["user_id"]]]، والتوكن بيتعمل بـ [[{"user_id": 1, "exp": ...}]] من غير [[type]] ولا [[jti]].`, done: R`لقيت التلاتة: الـ algorithm جاي من التوكن نفسه (المهاجم بيختاره)، والـ exp بيتشيّك بإيدك بعد ما decode عمله (مكرر، ومش بيمسك الحالة لو [[exp]] مش موجود)، ومفيش [[type]] فالـ refresh ينفع كـ access ومفيش [[jti]] فمفيش logout. والتصليح بيعدّي اختبار [[alg: none]] بـ 401.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** [[test_tokens.py]] فيه ٨ اختبارات بـ TestClient على [[base_url="https://testserver"]]: login غلط 401، و [[/me]] 200، و refresh بيغيّر الـ cookie، و reuse بيقفل العيلة، و logout، وتوكن منتهي (اعمله بـ [[jwt.encode]] و [[exp]] في الماضي)، و [[alg: none]]، وتوكن متوقّع بسر تاني. وكل 401 فيها [[www-authenticate]].`, done: R`الـ ٨ خضر. ولما تشيل [[algorithms=["HS256"]]] من [[current_user]] اختبارات كتير بتقع بـ 500 ([[DecodeError]] مش متمسوك)، ولما تشيل سطر [[record["used"] = True]] اختبار الـ reuse بيفشل.` },
            { lvl: 'تحدي', t: R`**ابني حاجة:** انقل [[refresh_store]] و [[denylist]] لـ Redis ([[docker run --rm -p 6390:6379 redis:7-alpine]]): الـ refresh [[HSET]] بـ TTL ١٤ يوم، والعيلة [[SADD]] فيها كل الـ jti، والـ denylist [[SET ... EXAT exp]]. وشغّل السيرفر بـ [[--workers 2]] والسر ثابت من env.`, done: R`login على worker و refresh على التاني بيشتغل، و restart للسيرفر مبيخرّجش حد، و [[TTL deny:<jti>]] في [[redis-cli]] بيطلع أقل من ٩٠٠، وبعد ما الـ access يخلص المفتاح بيختفي لوحده. والـ reuse detection لسه بيقفل العيلة.` },
          ],
          deep: {
            why: R`HTTP مالوش ذاكرة: كل طلب لازم يقول هو مين. الـ session القديمة (رقم في cookie والسيرفر بيدوّر عليه في القاعدة) شغالة كويس، بس محتاجة قاعدة مشتركة في كل طلب، وصعبة مع موبايل و APIs بين خدمات. الـ JWT بيحط «انت مين» جوه التوكن نفسه متوقّع، فأي خدمة معاها السر تتأكد في ميكروثانية. والتمن إن التوكن مينفعش يتلغي قبل ما يخلص، وعلشان كده الـ access قصير والـ refresh بـ state.`,
            how: R`**التوقيع (HS256):** [[HMAC-SHA256(secret, base64(header) + "." + base64(payload))]]. أي تغيير في حرف من الـ header أو الـ payload بيغيّر التوقيع، ومن غير السر مينفعش تحسبه. و [[jwt.decode]] بيحسبه تاني ويقارن (timing-safe)، وبعدين يشيّك [[exp]] و [[nbf]] و [[iat]] بـ [[leeway]] صفر افتراضيًا (لو ساعات السيرفرات مختلفة شوية، [[leeway=10]]).

**RS256 / ES256:** بدل سر واحد، مفتاح خاص بيوقّع ومفتاح عام بيتأكد. مفيد لما خدمات تانية محتاجة تتأكد من غير ما يبقى معاها القدرة توقّع (والـ JWKS endpoint بينشر المفاتيح العامة). Auth0 و Keycloak بيستخدموه. [[algorithms]] برضه لازم تتحدد صريح، عشان مهاجم ميبعتش HS256 موقّع بالمفتاح العام كسر.

**الـ rotation والعيلة:** كل refresh بيطلّع refresh جديد بنفس [[fam]]. الـ store بيقول اللي اتستخدم. استخدام تاني = نسخة اتسرقت، فالعيلة كلها بتتقفل. ده اللي OAuth 2.0 Security BCP بيسميه refresh token rotation مع reuse detection.

**[[OAuth2PasswordBearer]]** بيعمل [[authorization.split(" ")]] ويقارن [[scheme.lower() == "bearer"]]، فـ [[bearer]] بحرف صغير بيعدّي. و [[auto_error=False]] بيخليه يرجّع [[None]] بدل 401، مفيد للـ routes اللي شغالة للزوار واليوزرز.

**claims تانية مفيدة:** [[aud]] (التوكن ده لأنهي خدمة، و [[jwt.decode(..., audience="orders-api")]])، و [[iss]] (مين طلّعه). من غيرهم، توكن طالع لخدمة ممكن يتقبل في خدمة تانية بنفس السر.`,
            when: R`JWT access + refresh: SPA أو موبايل بيكلّم API، أو أكتر من خدمة محتاجة تعرف اليوزر. وsession عادية في cookie (Django و Flask بيعملوها لوحدهم): موقع واحد على دومين واحد بيرندر صفحات، وهنا أبسط وأسهل في الإلغاء (درس «Django auth»). وبين الخدمات من غير يوزر: client credentials أو API keys بـ [[compare_digest]]. ولو مش عايز تبني ده خالص: Auth0 أو Keycloak أو Supabase Auth، وانت بتعمل verify بس.`,
            mistakes: R`access عمره يوم أو شهر. و [[jwt.decode]] من غير [[algorithms]] أو بالـ algorithm اللي جوه التوكن. و [[verify_signature: False]] في كود حقيقي. وسر قصير زي [["secret"]] (PyJWT بيطلّع [[InsecureKeyLengthWarning]] تحت ٣٢ byte، والسر القصير بيتخمّن offline من أي توكن). والـ refresh في [[localStorage]]. ومفيش [[type]] فالـ refresh ينفع access. و [[sub]] رقم ([[jwt.decode]] في PyJWT الجديد بيرمي [[InvalidSubjectError: Subject must be a string]]). وباسورد أو بيانات حساسة في الـ payload (مقروء). و 403 بدل 401 للتوكن البايظ. و [[delete_cookie]] من غير نفس [[path]] فالـ cookie مبيتمسحش. والـ store في dict مع أكتر من worker (كل worker عنده نسخة).`
          },
          sol: R`أول [[/me]] بالـ access بيرجع [[{"user_id":"1"}]]. أول refresh بيرجع 200 و [[set-cookie]] جديد، والتاني (بنفس الـ jar بعد ما اتحدّث) 200 برضه. لما تبعت الـ refresh **القديم** بإيدك: [[HTTP/1.1 401 Unauthorized]] و [[{"detail":"refresh token reused, all sessions in this family revoked"}]]، وبعدها حتى الـ refresh الأحدث بيترفض بنفس الرسالة. وبعد الـ logout: [[HTTP/1.1 204 No Content]] و [[set-cookie: refresh_token=""; ... Max-Age=0; Path=/auth]]، و [[/me]] بنفس الـ access بقى [[{"detail":"token revoked"}]].

خد بالك إن [[-c jar.txt]] لازم مع [[-b]] في الـ refresh عشان curl يحفظ الـ cookie الجديد، وإلا هيبعت القديم تاني وهيتقفل كأنه سرقة (حصل في تجربتنا).`,
          solCode: R`curl -s -i -c jar.txt -d "username=mona&password=s3cret-Pass" localhost:8000/auth/login
cp jar.txt old.txt
curl -s -b jar.txt -c jar.txt -X POST localhost:8000/auth/refresh
curl -s -b old.txt -X POST localhost:8000/auth/refresh
curl -s -b jar.txt -c jar.txt -X POST localhost:8000/auth/refresh`
        },
        {
          cmd: "رفع ملفات",
          title: "UploadFile بحد للحجم، ونوع من الـ bytes مش من الـ header، واسم عشوائي، وترجّعه بأمان",
          learn: R`تستقبل ملف بـ [[UploadFile]] وتحدد حجمه قبل ما يترفع كله، وتعرف نوعه من أول bytes، وتحفظه باسم عشوائي، وترجّعه بـ [[FileResponse]].`,
          out: R`endpoint رفع بيرفض exe باسم png بـ 415، و ٤٠ ميجا بـ 413 في صفر ثانية، و [[../../etc/passwd]] مبيأثرش على مكان الحفظ.`,
          use: {
            prog: R`صور بروفايل، وفواتير PDF، ومرفقات chat، و CSV للاستيراد: أي تطبيق حقيقي بيستقبل ملفات.`,
            work: R`الرفع من أكتر الأماكن اللي بيدخل منها الهجوم: ملف بيتنفّذ، أو مسار بيكتب برّه الفولدر، أو ملف عملاق بيملا الديسك. والـ review بيسأل عن الأربعة.`,
          },
          desc: R`[[file: UploadFile]] في الـ endpoint بيستقبل ملف من form نوعه [[multipart/form-data]] (محتاج [[python-multipart]]). و [[UploadFile]] فيه [[filename]] و [[content_type]] و [[await file.read(n)]]، والملف نفسه متخزّن في [[SpooledTemporaryFile]]: في الذاكرة لحد ١ ميجا، وبعدها على الديسك.

وأربع قواعد:
• **الحجم:** FastAPI بيقرا الـ form **كله** قبل ما الـ endpoint أو أي dependency تشتغل، فالحد اللي جوه الـ endpoint بييجي متأخر. الحد الحقيقي في middleware بيبص على [[Content-Length]] قبل ما الـ body يتقري (أو في Nginx بـ [[client_max_body_size]])، والعدّ جوه الـ endpoint للطلبات اللي من غير [[Content-Length]].
• **النوع:** [[file.content_type]] و [[file.filename]] جايين من الـ client، يعني أي حد يكتب فيهم أي حاجة. النوع الحقيقي من أول bytes (magic bytes): PNG بيبدأ بـ [[\x89PNG]]، و JPEG بـ [[\xff\xd8\xff]]، و PDF بـ [[%PDF-]].
• **الاسم:** متستخدمش [[filename]] في المسار أبدًا. اسم عشوائي بـ [[uuid4]] وامتداد من النوع اللي اكتشفته.
• **الرجوع:** [[FileResponse]] بيبعت الملف على أجزاء (ومعاه Range)، و [[X-Content-Type-Options: nosniff]] عشان المتصفح ميخمّنش نوع تاني، والـ id بيتشيّك بـ regex قبل ما يتحط في مسار.

وللملفات الكبيرة جدًا (فيديو)، [[request.stream()]] بيقرا الـ body chunk chunk من غير multipart خالص.

قبله: «request body» و «pathlib». وبعده: درس «Celery و ARQ» لو الملف محتاج معالجة تقيلة (تصغير صورة، أو قراية PDF).`,
          example: R`import re, uuid
from pathlib import Path
from typing import Annotated
import anyio
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.responses import FileResponse, JSONResponse

UPLOAD_DIR = Path("uploads").resolve()
UPLOAD_DIR.mkdir(exist_ok=True)
MAX_BYTES = 5 * 1024 * 1024
SIGNATURES = {b"\x89PNG\r\n\x1a\n": ("png", "image/png"), b"\xff\xd8\xff": ("jpg", "image/jpeg"), b"%PDF-": ("pdf", "application/pdf")}
MIME_BY_EXT = dict(SIGNATURES.values())

class BodyLimit:
    def __init__(self, app, max_bytes: int):
        self.app, self.max_bytes = app, max_bytes
    async def __call__(self, scope, receive, send):
        length = dict(scope.get("headers", [])).get(b"content-length")
        if scope["type"] == "http" and length and int(length) > self.max_bytes:
            return await JSONResponse({"detail": "request too large"}, status_code=413)(scope, receive, send)
        await self.app(scope, receive, send)

app = FastAPI()
app.add_middleware(BodyLimit, max_bytes=MAX_BYTES + 64 * 1024)

def sniff(head: bytes) -> tuple[str, str] | None:
    return next((kind for magic, kind in SIGNATURES.items() if head.startswith(magic)), None)

@app.post("/files", status_code=201)
async def upload(file: Annotated[UploadFile, File()]):
    head = await file.read(16)
    kind = sniff(head)
    if kind is None:
        raise HTTPException(415, f"only png, jpg or pdf (the header said {file.content_type})")
    file_id = f"{uuid.uuid4().hex}.{kind[0]}"
    tmp, size = UPLOAD_DIR / f"{file_id}.part", len(head)
    async with await anyio.open_file(tmp, "wb") as out:
        await out.write(head)
        while (chunk := await file.read(64 * 1024)) and size <= MAX_BYTES:
            size += len(chunk)
            await out.write(chunk)
    if size > MAX_BYTES:
        tmp.unlink()
        raise HTTPException(413, f"file too large, max {MAX_BYTES // 2**20} MB")
    tmp.rename(UPLOAD_DIR / file_id)
    return {"id": file_id, "type": kind[1], "size": size, "original_name": file.filename}

@app.get("/files/{file_id}")
def download(file_id: str):
    path = UPLOAD_DIR / file_id
    if not re.fullmatch(r"[0-9a-f]{32}\.(png|jpg|pdf)", file_id) or not path.is_file():
        raise HTTPException(404, "not found")
    return FileResponse(path, media_type=MIME_BY_EXT[path.suffix.lstrip(".")], filename=f"file{path.suffix}", headers={"X-Content-Type-Options": "nosniff"})`,
          lines: [
            R`[[re]] عشان نتأكد من شكل الـ id في الـ download، و [[uuid]] عشان نعمل اسم عشوائي لكل ملف.`,
            R`[[Path]] من درس «pathlib»: المسارات بـ [[/]] بدل ما نلزق نصوص، وده بيشتغل على ويندوز ولينكس.`,
            R`[[Annotated]] عشان نقول إن الـ parameter ده ملف جاي من الـ form.`,
            R`[[anyio]] متسطّب مع FastAPI أصلًا (Starlette معتمد عليه). [[anyio.open_file]] بيكتب على الديسك في thread تاني، فالكتابة مبتوقّفش الـ event loop، ومن غير ما نسطّب [[aiofiles]].`,
            R`[[File]] بيقول «الـ parameter ده ملف من [[multipart/form-data]]»، و [[UploadFile]] النوع اللي فيه الملف واسمه ونوعه. والاتنين محتاجين [[python-multipart]]، ومن غيرها FastAPI بيرمي [[RuntimeError]] وقت التشغيل.`,
            R`[[FileResponse]] بيبعت ملف من الديسك على أجزاء، و [[JSONResponse]] بنستخدمه في الـ middleware عشان نرد قبل ما FastAPI يشتغل.`,
            R`فولدر الرفع كمسار كامل. [[resolve()]] بيحوّله absolute، فمش هيتغيّر لو الـ working directory اتغيّر. والفولدر ده **برّه** فولدر الـ static والكود، عشان ملف مرفوع ميتنفذش ولا يتخدم كأنه جزء من الموقع.`,
            R`[[exist_ok=True]] = متعملش error لو الفولدر موجود. من غيرها التشغيل التاني بيقع بـ [[FileExistsError]].`,
            R`الحد: ٥ ميجا بالـ bytes. [[1024 * 1024]] = ميجا (MiB). مكتوبة كضرب عشان تتقري.`,
            R`الـ magic bytes: أول bytes في كل نوع، ومعاها الامتداد والـ MIME type اللي هنستخدمهم. PNG دايمًا ٨ bytes دول، و JPEG بيبدأ بـ [[FF D8 FF]]، و PDF بـ [[%PDF-]]. و [[b"..."]] يعني bytes مش نص، و [[\x89]] byte قيمته 0x89.`,
            R`عكسنا الجدول: من الامتداد للـ MIME، عشان الـ download يعرف يبعت أنهي [[Content-Type]]. [[SIGNATURES.values()]] أزواج [[("png", "image/png")]]، و [[dict]] على أزواج بيعمل dict.`,
            R`middleware بسيط (ASGI خام، مش [[@app.middleware]]) بيرفض الطلب الكبير **قبل** ما أي byte من الـ body يتقري.`,
            R`بياخد التطبيق اللي بعده والحد. ده الشكل اللي [[app.add_middleware]] بيستناه: أول argument التطبيق، والباقي keyword arguments.`,
            R`بنحفظ التطبيق والحد في الكائن عشان [[__call__]] تستخدمهم مع كل طلب. السطر بيعمل الاتنين مرة واحدة بالـ tuple unpacking.`,
            R`أي طلب بيعدّي على [[__call__]] بـ [[scope]] (معلومات الطلب) و [[receive]] (بيقرا الـ body) و [[send]] (بيبعت الرد). احنا مش بننادي [[receive]] خالص قبل الفحص، فالـ body مبيتقريش.`,
            R`الـ headers في ASGI لستة أزواج bytes بأسامي صغيرة، فبنعملها dict وندوّر على [[b"content-length"]]. و [[scope.get("headers", [])]] عشان scope الـ lifespan مفيهوش headers.`,
            R`لو طلب HTTP وفيه [[Content-Length]] أكبر من الحد...`,
            R`...بنبعت 413 (Content Too Large) على طول ونخرج، والتطبيق نفسه مبيشتغلش. اتقاس تحت: الرد طلع بعد 0.00 ثانية، والحد جوه dependency طلع بعد 2.07 ثانية (بعد ما الـ ٤٠ ميجا اترفعوا كلهم).`,
            R`الطلب العادي بيكمل للتطبيق زي ما هو.`,
            R`التطبيق نفسه. الـ middleware بيتضاف عليه في السطر الجاي، فبيلفه من برّه وبيشوف كل طلب قبله.`,
            R`بنركّب الـ middleware بحد أكبر من الملف بـ ٦٤ KB، لأن [[Content-Length]] بيحسب الـ body كله: الملف وحدود الـ multipart والـ headers بتاعة كل part. لو الحد بالظبط ٥ ميجا، ملف ٥ ميجا بالظبط هيترفض.`,
            R`بتاخد أول bytes وترجّع [[(ext, mime)]] أو [[None]]. النوع مكتوب صريح ([[tuple[str, str] | None]]) عشان mypy يمسك لو نسيت تشيّك على [[None]].`,
            R`[[next]] بيرجّع أول نتيجة من الـ generator أو [[None]] لو مفيش. و [[startswith]] بيقارن أول bytes بكل توقيع. ده نفس اللي أمر [[file]] في لينكس بيعمله (بشكل أبسط بكتير).`,
            R`route الرفع، و 201 لأن فيه ملف جديد اتعمل.`,
            R`[[async def]] هنا صح لأن كل حاجة جوه [[await]] (القراية والكتابة). و [[File()]] بيقول للـ OpenAPI إن ده file input، فـ [[/docs]] بيطلّع زرار «Choose File».`,
            R`أول ١٦ byte بس. [[read(n)]] بيقرا لحد [[n]] byte من مكان المؤشر، والمؤشر بيتحرك، فالقراية الجاية بتكمّل من بعدهم.`,
            R`نعرف النوع من الـ bytes، مش من [[content_type]] ولا الامتداد.`,
            R`مش png ولا jpg ولا pdf (أو الملف فاضي: [[b""]] مش بيبدأ بأي توقيع)...`,
            R`...415 Unsupported Media Type. وبنكتب الـ [[content_type]] اللي الـ client قاله، عشان يبان إنه ممكن يكون كدب: في التجربة exe قال [[image/png]].`,
            R`الاسم: ٣٢ حرف hex عشوائي والامتداد من النوع الحقيقي. [[kind[0]]] هو الامتداد. اسم الـ client مبيدخلش في المسار خالص، فـ [[../../etc/passwd]] أو اسم عربي بمسافات أو [[CON.png]] (اسم محجوز على ويندوز) مبيفرقوش.`,
            R`بنكتب في [[.part]] الأول، وبعدين نغيّر الاسم في الآخر. لو حاجة وقعت في النص، الملف الناقص ميتخدمش كأنه كامل. و [[size]] بيبدأ بالـ ١٦ اللي قريناهم.`,
            R`[[await anyio.open_file(...)]] بيفتح الملف (الـ [[await]] الأولى للفتح نفسه)، و [[async with]] بيقفله في الآخر حتى لو فيه exception. و [[wb]] = كتابة bytes.`,
            R`نكتب الـ ١٦ byte اللي قريناهم للفحص، ولا الملف هيبقى ناقص أوله.`,
            R`نقرا ٦٤ KB كل مرة لحد ما الملف يخلص ([[read]] بيرجّع [[b""]] وده False) أو الحجم يعدّي الحد. [[:=]] (walrus) بيحفظ القيمة ويشيّكها في نفس السطر. والقراية على أجزاء بتخلي الذاكرة ثابتة مهما كان الملف كبير.`,
            R`نعدّ الـ bytes بنفسنا. ده الحد الحقيقي للطلبات اللي من غير [[Content-Length]] (chunked) أو اللي بتكدب فيه.`,
            R`نكتب الجزء. بـ [[anyio]] الكتابة في thread، والـ loop فاضي يخدم طلبات تانية.`,
            R`بعد الـ loop: لو الحجم عدّى (يعني اللوب وقف بسبب الحد مش بسبب نهاية الملف)...`,
            R`...نمسح الملف الناقص، ولا الديسك هيتملي بملفات [[.part]].`,
            R`413 برسالة فيها الحد. [[2**20]] = 1048576 = ميجا، و [[//]] قسمة صحيحة فبيطلع [[5]].`,
            R`كله تمام: نغيّر الاسم للنهائي. [[rename]] على نفس الديسك عملية واحدة (atomic)، فمحدش يشوف الملف وهو نص مكتوب.`,
            R`بنرجّع الـ id والنوع الحقيقي والحجم والاسم الأصلي. الاسم الأصلي ينفع يتخزّن في القاعدة ويتعرض لليوزر، بس عمره ما يبقى جزء من مسار.`,
            R`route التنزيل. [[{file_id}]] بييجي من الـ URL، يعني أي حد يكتب فيه أي حاجة، وعلشان كده بيتفحص قبل ما يلمس الديسك.`,
            R`[[def]] عادي، لأن [[is_file]] و [[FileResponse]] مش محتاجين [[await]] هنا.`,
            R`المسار. لسه منتأكدناش إن الـ id سليم، بس [[Path]] لوحده مش بيقرا حاجة من الديسك، فمفيش خطر في السطر ده نفسه.`,
            R`[[re.fullmatch]] لازم الـ id **كله** يطابق: ٣٢ hex ونقطة وامتداد من التلاتة. أي [[..]] أو [[/]] أو [[\]] أو اسم زي [[main.py]] بيترفض قبل ما يتلمس الديسك. و [[is_file]] بيتأكد إنه موجود وإنه ملف مش فولدر.`,
            R`404 للاتنين، عشان محدش يعرف الفرق بين «شكله غلط» و «مش موجود».`,
            R`[[media_type]] من الامتداد اللي احنا حطيناه (مش من اللي اترفع). و [[filename=]] بيعمل [[Content-Disposition: attachment]] فالمتصفح بينزّله بدل ما يفتحه في الصفحة، و [[nosniff]] بيمنع المتصفح يخمّن إنه HTML ويشغّل script جواه. وبيدعم [[Range]] لوحده (اتجرّب: 206).`,
          ],
          teach: R`## المثال بيعمل إيه؟

endpoint بيستقبل png أو jpg أو pdf لحد ٥ ميجا، بيعرف نوعه من أول bytes، وبيحفظه باسم عشوائي، و endpoint تاني بيرجّعه. كل الناتج هنا من تشغيل حقيقي على ويندوز: FastAPI 0.162 و Starlette 1.10 و python-multipart 0.0.32، بـ TestClient وبـ uvicorn و httpx.

---

## ١. التجربة الأساسية

~~~python
c = TestClient(main.app)
png = b"\x89PNG\r\n\x1a\n" + os.urandom(2000)
r = c.post("/files", files={"file": ("صورة البروفايل.png", png, "image/png")})
~~~

[[files={"file": (name, bytes, type)}]] بيخلي httpx يبني [[multipart/form-data]]: اسم الحقل [[file]] لازم يطابق اسم الـ parameter.

~~~text الناتج (اتشغّل فعلًا)
A 201 {'id': '3edf187ac04f4ad0baf5b59829bea983.png', 'type': 'image/png', 'size': 2008, 'original_name': 'صورة البروفايل.png'}
B 201 {'id': 'cbf3193f8be043cb9fc0de450e3db2ed.png', 'type': 'image/png', 'size': 2008, 'original_name': '../../etc/passwd'}
C 415 {'detail': 'only png, jpg or pdf (the header said image/png)'}
~~~

- **A:** الاسم العربي بمسافة اتحفظ كـ [[original_name]] بس، والملف على الديسك اسمه hex.
- **B:** اسم بيحاول يطلع برّه الفولدر ([[../../etc/passwd]]). اتحفظ عادي في [[uploads]] باسم عشوائي، لأن الاسم ده مبيدخلش في المسار. لو كان الكود [[UPLOAD_DIR / file.filename]]، كان هيكتب في [[etc/passwd]] جنب الكود (على لينكس لو السيرفر شغال بصلاحيات كفاية، في [[/etc]] نفسها).
- **C:** ملف أوله [[MZ]] (شكل exe على ويندوز) والـ client قال [[image/png]]. اترفض لأننا مصدّقناش الـ header.

### الحالات الطرفية

~~~text الناتج (اتشغّل فعلًا)
D 413 {'detail': 'request too large'}
D2 exactly 5MB 201 5242880
D3 5MB+1 413 {'detail': 'file too large, max 5 MB'}
D4 empty 415 {'detail': 'only png, jpg or pdf (the header said image/png)'}
E 422 Field required ['body', 'file']
~~~

- **D:** ٦ ميجا: الـ middleware رفضه من الـ [[Content-Length]].
- **D2 و D3:** ٥ ميجا بالظبط اتقبل، وbyte واحد زيادة اترفض. ده عدّاد الـ endpoint، لأن الـ ٦٤ KB الزيادة في الـ middleware عدّوه.
- **D4:** ملف فاضي = مفيش magic bytes = 415.
- **E:** form من غير ملف = 422 من FastAPI نفسه.

---

## ٢. ليه الحد مش جوه الـ endpoint بس؟

FastAPI بيقرا الـ form كله ([[await request.form()]]) قبل ما يحل الـ dependencies ويشغّل الـ endpoint (في [[fastapi/routing.py]]: الـ form في سطر 455 والـ dependencies في 511 في النسخة دي). يعني ملف ٢ جيجا هيترفع كله ويتكتب في temp file على الديسك، وبعدين الكود بتاعك يقول «كبير».

قسناها: client بيرفع ٤٠ ميجا ببطء (١ ميجا كل 0.05 ثانية)، والسيرفر بيطبع إمتى بعت الرد:

~~~text الناتج (اتشغّل فعلًا: الحد في dependency بتقرا Content-Length)
/files -> 413 after 2.07s
~~~

~~~text الناتج (اتشغّل فعلًا: الحد في BodyLimit اللي في المثال)
/files -> 413 after 0.00s
~~~

على localhost الفرق ثانيتين. على نت ٢ ميجابت، ملف ٢ جيجا = ساعتين ونص من الـ bandwidth والديسك قبل الرفض. وفي الإنتاج، Nginx قدام التطبيق بـ [[client_max_body_size 6m;]] بيعمل نفس الحاجة قبل ما الطلب يوصل Python أصلًا (درس في تاب Nginx).

### والـ temp file

[[UploadFile]] متخزّن في [[SpooledTemporaryFile(max_size=1MB)]]: أول ميجا في الذاكرة، وبعدها بيتنقل لـ temp على الديسك (في [[starlette/formparsers.py]]: [[spool_max_size = 1024 * 1024]]). فـ ١٠٠ رفع مع بعض كل واحد ٥٠ ميجا = ٥ جيجا في فولدر الـ temp. وده سبب تاني للحد في الأول.

وفيه حدود تانية في Starlette للحقول **اللي مش ملفات**: [[max_part_size]] ١ ميجا للحقل، و [[max_files]] و [[max_fields]] ١٠٠٠، فلو حد بعت حقل نص ٢ ميجا بيرجع 400.

---

## ٣. التنزيل

~~~text الناتج (اتشغّل فعلًا)
F 200 image/png attachment; filename="file.png" nosniff 2008
F2 206 bytes 0-7/2008 b'\x89PNG\r\n\x1a\n'
G 404 {'detail': 'Not Found'}
H 404 {'detail': 'not found'}
I 404 {'detail': 'not found'}
~~~

- **F:** النوع صح، و [[attachment]] (بينزل مش بيتفتح)، و [[nosniff]].
- **F2:** [[Range: bytes=0-7]] رجّع 206 و أول ٨ bytes بس. ده اللي بيخلي الفيديو يتقدّم ويتأخر، والتحميل يكمّل بعد ما النت يقطع. [[FileResponse]] بيعمله لوحده.
- **G:** [[/files/..%2Fmain.py]]: الـ [[%2F]] اتفك لـ [[/]] فالمسار بقى مختلف ومطابقش أي route (404 بتاعة FastAPI بحرف N كبير).
- **H:** شكله سليم بس مش موجود.
- **I:** [[main.py]] اترفض من الـ regex قبل ما يتلمس الديسك.

### ليه [[nosniff]] و [[attachment]]؟

لو حد رفع ملف HTML أو SVG فيه [[<script>]] واتخدم من نفس الدومين بتاعك كـ [[text/html]]، الـ script بيشتغل بـ cookies اليوزرز (stored XSS). احنا بنرفض أي نوع غير التلاتة، وبنبعت النوع اللي احنا عارفينه، و [[nosniff]] بيمنع المتصفح يخمّن غيره، و [[attachment]] بيخليه ينزل. والأحسن كمان: خدم الملفات من دومين تاني (زي [[files.example-cdn.com]]) أو من S3 بروابط موقّعة.

---

## ٤. ملفات كبيرة جدًا: [[request.stream()]]

للفيديو أو backups، multipart نفسه عبء: لازم يتفك ويتكتب temp. الأبسط إن الـ client يبعت الـ bytes في الـ body على طول (زي [[curl -T]]):

~~~python
@app.put("/raw")
async def raw_upload(request: Request):
    file_id, size = f"{uuid.uuid4().hex}.bin", 0
    async with await anyio.open_file(UPLOAD_DIR / file_id, "wb") as out:
        async for chunk in request.stream():
            size += len(chunk)
            await out.write(chunk)
    return {"id": file_id, "size": size}
~~~

~~~text الناتج (اتشغّل فعلًا: ١٠٠ ميجا من httpx على uvicorn)
200 104857600 0.41s
~~~

[[request.stream()]] بيدّيك الـ chunks وهي جاية من الشبكة، ومفيش temp file، والذاكرة ثابتة. (في الإنتاج حط نفس عدّاد الحجم اللي في المثال، وفحص النوع على أول chunk.) والأحسن لأي حاجة فوق ١٠٠ ميجا: presigned URL، يعني الـ API يدّي الـ client رابط موقّع يرفع عليه لـ S3 على طول، والملف ميعدّيش على سيرفرك خالص (من الوثائق، ماتجرّبش هنا).

---

## ٥. اللي الـ magic bytes مبتعملوش

الـ magic bytes بتقول «الملف بيبدأ زي PNG»، مش «الملف PNG سليم ومفيهوش حاجة». ملف ممكن يبدأ بـ [[\x89PNG]] وبعدها أي حاجة. للصور: افتحها بـ Pillow ([[Image.open(f).verify()]]) واحفظ نسخة جديدة منها (ده بيشيل الـ metadata زي مكان التصوير GPS كمان). وللملفات اللي بيفتحها ناس تانية: antivirus زي ClamAV في job في الخلفية. ده من الوثائق، ماتجرّبش هنا.

---

## «توصل للإجابة بنفسك»

~~~bash
python -c "from fastapi import UploadFile; help(UploadFile)"
python -c "import starlette.formparsers as f, inspect; print(inspect.getsource(f.MultiPartParser)[:600])"
~~~

الأولاني بيوريك [[read]] و [[seek]] و [[size]] و [[headers]]. والتاني بيوريك [[spool_max_size]] و [[max_part_size]] من الكود نفسه، عشان الأرقام بتتغيّر بين النسخ. ولو شفت [[RuntimeError: Form data requires "python-multipart" to be installed.]] يبقى ناقصك [[pip install python-multipart]].

---

## الخلاصة

| الحاجة | الصح | الغلط |
|---|---|---|
| الحد | middleware على [[Content-Length]] + عدّاد في الـ loop + Nginx | [[len(await file.read())]] بعد ما كله اترفع |
| النوع | magic bytes | [[file.content_type]] أو الامتداد |
| الاسم | [[uuid4().hex]] + امتداد من النوع | [[file.filename]] في المسار |
| الكتابة | على أجزاء في [[.part]] وبعدين [[rename]] | [[await file.read()]] كله في الذاكرة |
| مكان الحفظ | فولدر برّه الكود والـ static | [[static/uploads]] بيتخدم زي ما هو |
| الرجوع | [[FileResponse]] + regex على الـ id + [[nosniff]] | [[open(user_path)]] |
| ملفات ضخمة | [[request.stream()]] أو presigned URL | multipart لـ ٢ جيجا |`,
          try: R`سطّب [[pip install fastapi uvicorn python-multipart]]، وشغّل المثال بـ [[uvicorn main:app]]. ارفع صورة حقيقية بـ [[curl -i -F "file=@photo.png" localhost:8000/files]] ([[-F]] = multipart، و [[@]] = اقرا من ملف). وبعدين غيّر امتداد ملف txt لـ png وارفعه، وارفع ملف أكبر من ٥ ميجا، وجرّب [[-F "file=@photo.png;filename=../../x.png"]]. ونزّل الصورة بـ [[curl -i localhost:8000/files/<id>]] و [[curl -H "Range: bytes=0-7" ...]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** توقّع الكود والرد لكل واحد قبل ما تشغّل: ملف [[a.pdf]] أوله [[%PDF-1.7]] والـ client قال [[image/png]]، وملف [[x.jpg]] أوله [[GIF89a]]، وملف png حجمه ٥ ميجا + ٣٠ KB، و [[GET /files/ABCDEF...]] (٣٢ حرف hex كبير)، و [[GET /files/<id>.PNG]] بامتداد كبير.`, done: R`الخمسة طابقوا: الأول 201 بنوع [[application/pdf]] وامتداد [[pdf]] (الـ header اتجاهل)، والتاني 415، والتالت 413 من الـ loop مش من الـ middleware، والرابع والخامس 404 من الـ regex (حروف كبيرة مش في [[0-9a-f]]).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الـ endpoint ده فيه ٥ مشاكل: [[async def up(file: UploadFile):]] وجواه [[data = await file.read()]] و [[if len(data) > 5_000_000: raise HTTPException(413)]] و [[if not file.content_type.startswith("image/"): raise HTTPException(415)]] و [[open(f"static/uploads/{file.filename}", "wb").write(data)]].`, done: R`لقيت الخمسة (الملف كله في الذاكرة، والحد بعد الرفع، والنوع من الـ header، و [[filename]] في المسار، والحفظ في فولدر بيتخدم، وكمان [[open]] من غير [[with]] و sync في [[async def]])، والتصليح بيعدّي نفس اختبارات A لحد I في الدرس.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** [[test_upload.py]] بـ pytest و [[tmp_path]] (اعمل [[monkeypatch.setattr(main, "UPLOAD_DIR", tmp_path)]]): png سليم 201 والملف موجود بنفس الـ bytes، و exe باسم png 415، و ٥ ميجا بالظبط 201، و ٥ ميجا + 1 = 413 ومفيش ملفات [[.part]] فاضلة، واسم فيه [[../]] الملف جوه [[tmp_path]]، والتنزيل بيرجّع نفس الـ bytes و [[nosniff]].`, done: R`٦ اختبارات خضرا، وبتعدّي مرتين ورا بعض (كل مرة [[tmp_path]] جديد)، ولما تمسح سطر [[tmp.unlink()]] اختبار الـ [[.part]] بيفشل.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** على uvicorn ارفع ملف ٢٠٠ ميجا بتلات طرق، وقيس الوقت وأعلى ذاكرة للعملية (Task Manager أو [[ps -o rss]]): endpoint بـ [[await file.read()]] مرة واحدة، والمثال، و [[PUT /raw]] بـ [[request.stream()]].`, done: R`عندك جدول ٣ صفوف بالوقت والذاكرة، والأولى ذاكرتها زادت أكتر من ٢٠٠ ميجا، والتانية والتالتة زيادتهم أقل من ٢٠ ميجا، وكتبت ليه التالتة أسرع (مفيش temp file ولا multipart parsing).` },
          ],
          deep: {
            why: R`أي حاجة اليوزر بيبعتها ممكن تبقى هجوم، والملف أخطرها لأنه بيتكتب على الديسك وممكن يتخدم لناس تانية. أشهر المشاكل الحقيقية: path traversal (ملف بيكتب فوق كود السيرفر)، و stored XSS (HTML أو SVG مرفوع بيتفتح من دومينك)، و الديسك اللي بيتملي (DoS)، و ملف تنفيذي باسم صورة.`,
            how: R`**[[multipart/form-data]]**: الـ body مقسوم لأجزاء بينهم boundary (نص عشوائي في الـ [[Content-Type]])، وكل جزء ليه headers ([[Content-Disposition: form-data; name="file"; filename="x.png"]] و [[Content-Type]]) وبعدين الـ bytes. [[python-multipart]] بيفك ده وهو جاي، و Starlette بيكتب أجزاء الملفات في [[SpooledTemporaryFile]] وأجزاء الحقول في الذاكرة (لحد [[max_part_size]]).

**الترتيب في FastAPI:** [[request.form()]] بيتقري كله، وبعدين الـ dependencies، وبعدين الـ endpoint. علشان كده أي فحص جوه FastAPI بييجي بعد الرفع، والـ ASGI middleware (أو الـ proxy) هو المكان الوحيد اللي يشوف الـ headers قبل الـ body.

**[[UploadFile.read(n)]]** async wrapper على الـ temp file: لو الملف في الذاكرة بيقرا على طول، ولو على الديسك بيقرا في threadpool. و [[file.file]] هو الـ [[SpooledTemporaryFile]] نفسه، تستخدمه في [[def]] endpoint بـ [[shutil.copyfileobj(file.file, out)]].

**[[FileResponse]]** بيعمل [[stat]] للملف (الحجم و [[last-modified]] و [[etag]])، وبيبعته chunks، وبيرد على [[Range]] بـ 206. (الـ 304 لـ [[If-None-Match]] بيعمله [[StaticFiles]] مش [[FileResponse]] في Starlette 1.10، فلو محتاجه شيّك بنفسك.)

**المسار:** [[re.fullmatch]] على الـ id أقوى من محاولة تنضيف الاسم ([[replace("..", "")]] بيتعدّى بـ [[....//]]). ولو لازم تقبل مسارات من اليوزر: [[(base / p).resolve().is_relative_to(base)]].`,
            when: R`[[UploadFile]] للملفات لحد عشرات الميجا من فورم أو موبايل. و [[request.stream()]] للملفات الكبيرة اللي بتتبعت raw. و presigned URL لـ S3 أو R2 لأي حاجة فوق ١٠٠ ميجا، أو لما عندك سيرفرات كتير (الملف في مكان واحد مشترك بدل ديسك كل سيرفر). والمعالجة التقيلة (تصغير، أو OCR، أو فحص فيروسات) في worker (درس «Celery و ARQ»)، والـ endpoint يرجّع 202.`,
            mistakes: R`[[UPLOAD_DIR / file.filename]] (path traversal، و اسمين زي بعض بيكتبوا فوق بعض). والثقة في [[file.content_type]] أو الامتداد. و [[await file.read()]] من غير حد (ملف ٢ جيجا في الذاكرة). والحد جوه الـ endpoint بس (اتقاس: 2.07 ثانية بعد الرفع كله). والحفظ في [[static/]] اللي بيتخدم زي ما هو. ونسيان [[python-multipart]] ([[RuntimeError]] أول ما الـ route يتسجل). والكتابة بـ [[open()]] عادي جوه [[async def]] (بتوقّف الـ loop). و [[FileResponse(user_supplied_path)]] من غير فحص. وملفات [[.part]] بتفضل لما الطلب يقع في النص.`
          },
          sol: R`الصورة الحقيقية: [[HTTP/1.1 201 Created]] و [[{"id":"<32 hex>.png","type":"image/png","size":...,"original_name":"photo.png"}]]. الـ txt اللي امتداده png: [[415]] و [[{"detail":"only png, jpg or pdf (the header said image/png)"}]] (curl بيخمّن الـ type من الامتداد، فقال png). الملف الكبير: [[413]] و [[{"detail":"request too large"}]] قبل ما curl يخلص رفع. و [[filename=../../x.png]]: [[201]] و [[original_name]] فيها [[../../x.png]] والملف في [[uploads/]] باسم hex. والتنزيل: [[content-type: image/png]] و [[content-disposition: attachment; filename="file.png"]] و [[x-content-type-options: nosniff]]، والـ Range: [[HTTP/1.1 206 Partial Content]] و [[content-range: bytes 0-7/...]].`,
          solCode: R`curl -i -F "file=@photo.png" localhost:8000/files
cp notes.txt fake.png && curl -i -F "file=@fake.png" localhost:8000/files
curl -i -F "file=@photo.png;filename=../../x.png" localhost:8000/files
curl -s -H "Range: bytes=0-7" localhost:8000/files/<id> | xxd`
        },
        {
          cmd: "WebSocket في FastAPI",
          title: "chat بـ rooms و auth على الاتصال، وفصل من غير ما السيرفر يقع، و client واختبار حقيقيين",
          learn: R`تعمل endpoint WebSocket فيه rooms و broadcast، وترفض الاتصال من غير توكن، وتتعامل مع الفصل والرسايل البايظة، وتختبره بـ pytest وبـ [[websockets]].`,
          out: R`chat شغال: اتنين في نفس الـ room شايفين رسايل بعض في نص ملي ثانية، والـ room التاني مبيشوفش، والاتصال من غير توكن بيترفض.`,
          use: {
            prog: R`chat، وإشعارات لحظية، وحالة طلب بتتحدث، ولوحة أسعار، وألعاب. أي حاجة السيرفر محتاج يبعتها من غير ما الـ client يسأل.`,
            work: R`أول ما الـ WebSocket يتنشر على أكتر من worker بيبوظ: كل worker عنده rooms لوحده. والحل (Redis pub/sub) جزء من الدرس ده.`,
          },
          desc: R`WebSocket اتصال واحد بيفضل مفتوح، والطرفين يبعتوا فيه في أي وقت. بيبدأ كطلب HTTP عادي فيه [[Upgrade: websocket]]، والسيرفر لو وافق بيرد 101 ويتحول الاتصال. في FastAPI: [[@app.websocket("/ws/{room}")]] ودالة بتاخد [[ws: WebSocket]].

الخطوات:
• **auth قبل [[accept]]:** المتصفح مبيقدرش يبعت header [[Authorization]] في WebSocket، فالتوكن بييجي في الـ query ([[?token=]]) أو في cookie أو في أول رسالة. لو غلط: [[raise WebSocketException(code=1008)]] قبل [[accept()]]، والـ client بيشوف رفض HTTP 403.
• **[[await ws.accept()]]** وبعدين نحطه في الـ room.
• **لوب** بـ [[receive_text]] أو [[receive_json]]، و [[send_json]] لكل اللي في الـ room.
• **الفصل:** لما الـ client يقفل، [[receive]] بترمي [[WebSocketDisconnect]]. نمسكها ونشيله من الـ room في [[finally]].
• **الرسايل البايظة:** [[receive_json]] على نص مش JSON بترمي [[JSONDecodeError]] وبتقفل الاتصال وتسيبه في الـ room. نقرا نص ونفكه بنفسنا.

والـ rooms هنا في الذاكرة، فبتشتغل على worker واحد. مع أكتر من worker، كل رسالة بتتبعت على Redis pub/sub وكل worker يوزعها على اللي عنده (في الشرح، اتجرّب على عمليتين).

قبله: «async def و await» و «auth dependency». وفي تاب Nginx: [[proxy_set_header Upgrade]] عشان الـ WebSocket يعدّي من الـ proxy.`,
          example: R`import json
from collections import defaultdict
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, WebSocketException, status

TOKENS = {"tok-mona": "mona", "tok-omar": "omar"}
app = FastAPI()

class Rooms:
    def __init__(self):
        self.rooms: defaultdict[str, set] = defaultdict(set)

    async def join(self, room: str, ws: WebSocket):
        await ws.accept()
        self.rooms[room].add(ws)

    def leave(self, room: str, ws: WebSocket):
        self.rooms[room].discard(ws)
        if not self.rooms[room]:
            del self.rooms[room]

    async def broadcast(self, room: str, message: dict):
        for ws in list(self.rooms.get(room, ())):
            try:
                await ws.send_json(message)
            except Exception:
                self.leave(room, ws)

rooms = Rooms()

@app.websocket("/ws/{room}")
async def chat(ws: WebSocket, room: str, token: str | None = None):
    user = TOKENS.get(token or "")
    if user is None:
        raise WebSocketException(code=status.WS_1008_POLICY_VIOLATION, reason="bad token")
    await rooms.join(room, ws)
    await rooms.broadcast(room, {"type": "joined", "user": user})
    try:
        while True:
            raw = await ws.receive_text()
            try:
                text = str(json.loads(raw).get("text", "")).strip()[:500]
            except (ValueError, AttributeError):
                await ws.send_json({"type": "error", "detail": "send JSON like {\"text\": \"...\"}"})
                continue
            if text:
                await rooms.broadcast(room, {"type": "message", "user": user, "text": text})
    except WebSocketDisconnect:
        pass
    finally:
        rooms.leave(room, ws)
        await rooms.broadcast(room, {"type": "left", "user": user})`,
          lines: [
            R`[[json]] عشان نفك الرسالة بنفسنا ونمسك النص اللي مش JSON، بدل [[receive_json]] اللي بتقع.`,
            R`[[defaultdict(set)]] dict بيعمل [[set]] فاضي لوحده لأي مفتاح جديد، فمش محتاجين [[if room not in rooms]] قبل كل إضافة.`,
            R`[[WebSocket]] الاتصال نفسه، و [[WebSocketDisconnect]] الـ exception اللي بيترمي لما الـ client يقفل، و [[WebSocketException]] عشان نرفض الاتصال بكود، و [[status]] فيه أسماء أكواد الإغلاق.`,
            R`توكنات وهمية للتجربة. في الحقيقة هنا [[jwt.decode]] زي درس «JWT و refresh token»، بنفس السر ونفس الفحص.`,
            R`التطبيق، والـ WebSocket route بيتسجل عليه زي أي route.`,
            R`كلاس بيمسك مين في أنهي room. كائن واحد منه للعملية كلها.`,
            R`الـ constructor بيعمل الدفتر الفاضي.`,
            R`اسم الـ room ومعاه [[set]] الاتصالات اللي فيه. [[set]] عشان الإضافة والمسح بسرعة ومفيش تكرار. والنوع [[defaultdict[str, set]]] عشان المحرر و mypy يعرفوا الشكل.`,
            R`الدخول للـ room: بنقبل الاتصال ونضيفه.`,
            R`[[accept()]] بيبعت رد الـ handshake (101 Switching Protocols). قبله مينفعش تبعت ولا تستقبل، وأي [[send_json]] بيرمي [[RuntimeError]]. و**قبله** المكان الوحيد اللي ترفض فيه برفض HTTP.`,
            R`نضيف الاتصال لـ set الـ room. لو الـ room مش موجود، [[defaultdict]] بيعمله.`,
            R`الخروج من الـ room. مش [[async]] لأنها مبتبعتش حاجة.`,
            R`[[discard]] بتشيله لو موجود ومبترميش لو مش موجود (عكس [[remove]] اللي بترمي [[KeyError]]). ده مهم لأن [[leave]] ممكن تتنادى مرتين لنفس الاتصال: من [[broadcast]] لما الإرسال يفشل، ومن [[finally]].`,
            R`لو الـ room فضي...`,
            R`...نمسحه من الـ dict، ولا الـ dict هيفضل يكبر بأسامي rooms محدش فيها (تسريب ذاكرة بطيء). الاختبار بيتأكد إن [[rooms.rooms == {}]] في الآخر.`,
            R`بتبعت الرسالة لكل اللي في الـ room.`,
            R`[[list(...)]] نسخة من الـ set قبل اللف، لأن [[leave]] جوه اللوب ممكن تشيل عنصر، وتعديل set وانت بتلف عليها بيرمي [[RuntimeError: Set changed size during iteration]]. و [[.get(room, ())]] بترجّع tuple فاضي لو الـ room مش موجود بدل ما [[defaultdict]] يعمله.`,
            R`كل إرسال لوحده في [[try]]...`,
            R`[[send_json]] بيعمل [[json.dumps]] ويبعت كـ text frame. الحروف العربي بتتبعت عادي.`,
            R`لو الإرسال فشل (الاتصال مات من غير ما يقفل كويس، زي نت قطع)...`,
            R`...نشيله من الـ room ونكمّل على الباقيين. من غير الـ [[try]] ده، اتصال واحد ميت كان هيوقف الـ broadcast لكل اللي بعده.`,
            R`الكائن الوحيد للتطبيق. موجود في ذاكرة العملية دي بس، وده سبب إن [[--workers 2]] بيقسّم الناس (اتجرّب في الشرح).`,
            R`route WebSocket. [[{room}]] path parameter زي أي route عادي.`,
            R`[[token: str | None = None]] بيتقري من الـ query: [[/ws/general?token=...]]. FastAPI بيعمل نفس الـ validation والـ dependencies في WebSocket زي HTTP.`,
            R`[[token or ""]] عشان [[TOKENS.get(None)]] تشتغل وترجّع [[None]].`,
            R`توكن غلط أو مش موجود...`,
            R`...نرفض **قبل** [[accept]]. كود 1008 = Policy Violation. في TestClient بيبان كـ [[WebSocketDisconnect]] بكود 1008، وفي client حقيقي على uvicorn بيبان كـ رفض HTTP 403 (اتجرّب الاتنين)، لأن الاتصال لسه متحوّلش.`,
            R`مسموح: نقبل وندخله الـ room.`,
            R`نقول لكل اللي في الـ room (وهو منهم) إنه دخل.`,
            R`كل اللوب في [[try]] عشان [[finally]] تشتغل مهما الاتصال خلص إزاي.`,
            R`لوب لحد ما الـ client يقفل. [[while True]] هنا مش بيستهلك CPU، لأن [[await]] اللي جواه بيستنى رسالة.`,
            R`[[receive_text]] بيستنى رسالة نصية. لو الـ client قفل بيرمي [[WebSocketDisconnect]]. ولو بعت binary frame، [[receive_text]] بيرمي [[KeyError]] (لو عايز الاتنين استخدم [[receive()]]).`,
            R`[[try]] تاني للرسالة نفسها، عشان رسالة بايظة متقفلش الاتصال.`,
            R`[[json.loads]] بيفك، و [[.get("text", "")]] بياخد النص أو فاضي، و [[str()]] لو حد بعت رقم، و [[strip]] بتشيل المسافات، و [[[:500]]] بتقص لـ ٥٠٠ حرف عشان محدش يبعت رسالة ١٠ ميجا لكل اللي في الـ room.`,
            R`[[ValueError]] لو مش JSON ([[JSONDecodeError]] نوع منه)، و [[AttributeError]] لو JSON بس مش object (زي [[[1, 2]]] أو [[5]]، مفيهمش [[.get]]).`,
            R`نرد على المرسل بس برسالة خطأ واضحة.`,
            R`ونكمّل اللوب: الاتصال لسه شغال. من غير الـ try ده الاتصال كان بيقفل والـ client بيشوف [[no close frame received or sent]] والـ socket بيفضل في الـ room (اتجرّب).`,
            R`رسالة فاضية بعد الـ strip منبعتهاش.`,
            R`نبعتها لكل اللي في الـ room ومعاها اسم المرسل. المرسل بيستلمها هو كمان، فالـ frontend بيعرضها لما ترجع (كده الكل بيشوف نفس الترتيب).`,
            R`الـ client قفل (أو النت قطع وuvicorn عرف).`,
            R`مفيش حاجة نعملها هنا، الشغل كله في [[finally]].`,
            R`[[finally]] بتشتغل في كل الحالات: فصل عادي، أو exception مش متوقع، أو السيرفر بيقفل.`,
            R`نشيله من الـ room.`,
            R`ونقول للباقيين إنه خرج. لو الـ room فضي، [[broadcast]] على room مش موجود مبتعملش حاجة.`,
          ],
          teach: R`## المثال بيعمل إيه؟

chat فيه rooms: كل واحد بيتصل بـ [[/ws/<room>?token=...]]، واللي يبعته بيوصل لكل اللي في نفس الـ room. كل الناتج من تشغيل حقيقي على ويندوز: FastAPI 0.162 و uvicorn 0.54 و websockets 17.3 و pytest 9.2، و Redis 7.4 في Docker للجزء الأخير.

---

## ١. الـ handshake

WebSocket بيبدأ كطلب HTTP:

~~~text الطلب والرد (من المعيار RFC 6455)
GET /ws/general?token=tok-mona HTTP/1.1
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==

HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Sec-WebSocket-Accept: s3pPLMBiTxaQ9kYGzzhZRbK+xOo=
~~~

بعد الـ 101 مفيش HTTP: frames صغيرة في الاتجاهين على نفس الاتصال. وده اللي [[accept()]] بيبعته. وفي لوج uvicorn:

~~~text لوج uvicorn (اتشغّل فعلًا)
INFO:     127.0.0.1:53953 - "WebSocket /ws/general?token=tok-mona" [accepted]
INFO:     connection open
INFO:     127.0.0.1:52981 - "WebSocket /ws/x?token=nope" 403
INFO:     connection rejected (403 Forbidden)
~~~

### خد بالك: التوكن في اللوج

السطر الأول فيه [[token=tok-mona]] زي ما هو. أي توكن في الـ query بيتكتب في access log بتاع uvicorn و Nginx وأي proxy. الحلول: توكن قصير العمر مخصوص للـ WebSocket (يطلع من endpoint HTTP محمي وعمره ٣٠ ثانية)، أو cookie [[HttpOnly]] على نفس الدومين (FastAPI بيقراها بـ [[Cookie()]] في الـ WebSocket)، أو [[accept()]] وبعدين أول رسالة لازم تبقى التوكن في خلال ثانيتين.

---

## ٢. client حقيقي

~~~python
import asyncio, json, websockets
URL = "ws://127.0.0.1:8031/ws/general?token="
async def main():
    async with websockets.connect(URL + "tok-mona") as mona:
        print("mona got:", await mona.recv())
        async with websockets.connect(URL + "tok-omar") as omar:
            print("mona got:", await mona.recv())
            print("omar got:", await omar.recv())
            await omar.send(json.dumps({"text": "الاجتماع الساعة ٣"}))
            print("mona got:", await mona.recv())
            print("omar got:", await omar.recv())
            await omar.send("hello?")
            print("omar got:", await omar.recv())
        print("mona got:", await mona.recv())
asyncio.run(main())
~~~

~~~text الناتج (اتشغّل فعلًا)
mona got: {"type":"joined","user":"mona"}
mona got: {"type":"joined","user":"omar"}
omar got: {"type":"joined","user":"omar"}
mona got: {"type":"message","user":"omar","text":"الاجتماع الساعة ٣"} (0.5ms)
omar got: {"type":"message","user":"omar","text":"الاجتماع الساعة ٣"}
omar got: {"type":"error","detail":"send JSON like {\"text\": \"...\"}"}
mona got: {"type":"left","user":"omar"}
1000 round trips: 308ms
~~~

- الرسالة وصلت لمنى في نص ملي ثانية على localhost.
- [["hello?"]] مش JSON، فعمر بس اللي جاله error، والاتصال فضل شغال.
- لما [[async with]] بتاع عمر خلص (قفل الاتصال)، منى جالها [[left]].
- ١٠٠٠ رسالة رايح جاي في ٣٠٨ms (وفي تشغيل تاني ٢٨٥ms): حوالي 0.3ms للرسالة. نفس الحاجة بـ HTTP كانت هتبقى طلب كامل بـ headers لكل رسالة.

---

## ٣. الغلطة اللي بتقع: [[receive_json]]

أول نسخة من المثال كانت [[data = await ws.receive_json()]]. والـ client بعت [["not json"]]:

~~~text الناتج (اتشغّل فعلًا: client بـ websockets)
{"type":"joined","user":"mona"}
closed: None no close frame received or sent
~~~

~~~text لوج uvicorn
ERROR:    Exception in ASGI application
    raise JSONDecodeError("Expecting value", s, err.value) from None
json.decoder.JSONDecodeError: Expecting value: line 1 column 1 (char 0)
~~~

الـ exception طلع من الدالة، فالاتصال اتقطع من غير close frame، والأسوأ: [[except WebSocketDisconnect]] متمسكتش، فالـ socket الميت فضل في [[rooms]]. اتصال واحد بيبعت حاجة غلط = تسريب. علشان كده المثال بيقرا نص ويفكه في [[try]]، و [[leave]] في [[finally]].

---

## ٤. الاختبار بـ pytest

[[TestClient]] فيه [[websocket_connect]] بيشتغل من غير سيرفر:

~~~python
def test_bad_token_is_rejected():
    with pytest.raises(WebSocketDisconnect) as e:
        with client.websocket_connect("/ws/general?token=nope"):
            pass
    assert e.value.code == 1008

def test_broadcast_in_room_only():
    with client.websocket_connect("/ws/general?token=tok-mona") as mona, \
         client.websocket_connect("/ws/other?token=tok-omar") as outsider:
        assert mona.receive_json() == {"type": "joined", "user": "mona"}
        assert outsider.receive_json() == {"type": "joined", "user": "omar"}
        with client.websocket_connect("/ws/general?token=tok-omar") as omar:
            assert mona.receive_json() == {"type": "joined", "user": "omar"}
            assert omar.receive_json() == {"type": "joined", "user": "omar"}
            omar.send_json({"text": "  ازيك يا منى  "})
            assert mona.receive_json() == {"type": "message", "user": "omar", "text": "ازيك يا منى"}
            assert omar.receive_json()["text"] == "ازيك يا منى"
        assert mona.receive_json() == {"type": "left", "user": "omar"}
        outsider.send_json({"text": "ping"})
        assert outsider.receive_json()["text"] == "ping"
    assert rooms.rooms == {}

def test_bad_json_gets_an_error_not_a_crash():
    with client.websocket_connect("/ws/x?token=tok-mona") as ws:
        ws.receive_json()
        ws.send_text("not json")
        assert ws.receive_json()["type"] == "error"
        ws.send_text("[1, 2]")
        assert ws.receive_json()["type"] == "error"
        ws.send_json({"text": "still here"})
        assert ws.receive_json()["text"] == "still here"
~~~

~~~text الناتج (اتشغّل فعلًا)
...                                                                      [100%]
3 passed in 0.52s
~~~

الاختبار التاني بيتأكد من ٤ حاجات مع بعض: الرسالة وصلت للـ room الصح، و [[outsider]] في room تاني مجالوش حاجة (أول رسالة بعد الـ joined بتاعه هي الـ ping بتاعه هو)، والمسافات اتشالت، والـ dict فضي في الآخر. وخد بالك إن نفس رفض التوكن بيبان **1008** في TestClient و **403** في client حقيقي.

---

## ٥. أكتر من worker: Redis pub/sub

[[uvicorn main:app --workers 2]] = عمليتين، وكل واحدة عندها [[rooms]] لوحدها. جرّبنا: منى على سيرفر بورت 8053 وعمر على 8054 (نفس الكود، عمليتين):

~~~text الناتج (اتشغّل فعلًا)
a got: {"type":"message","user":"mona","text":"from worker 1"}
b got nothing after 1s
~~~

عمر في نفس الـ room ومجالوش حاجة. الحل: كل worker بيبعت الرسالة لـ Redis، وكل worker مشترك في Redis وبيوزّع اللي جاله على الناس اللي عنده:

~~~python
r = aioredis.Redis(port=6390)

async def relay():
    pubsub = r.pubsub()
    await pubsub.psubscribe("room:*")
    async for msg in pubsub.listen():
        if msg["type"] == "pmessage":
            room = msg["channel"].decode().removeprefix("room:")
            await rooms.broadcast(room, json.loads(msg["data"]))

# في الـ lifespan: asyncio.create_task(relay())
# وفي الـ endpoint بدل rooms.broadcast(...):
await r.publish(f"room:{room}", json.dumps({"text": text}))
~~~

~~~text الناتج (اتشغّل فعلًا: عمليتين على 8051 و 8052 و Redis في Docker)
b (other process) got: {"text":"from worker 1"}
a got: {"text":"from worker 1"}
~~~

[[psubscribe("room:*")]] = اشترك في كل القنوات اللي بتبدأ بـ [[room:]]. و pub/sub في Redis «fire and forget»: لو worker كان واقف وقت الرسالة، مش هتوصله بعدين. لو محتاج تاريخ الرسايل، خزّنها في القاعدة أو Redis Streams.

---

## ٦. حاجات الإنتاج

| الحاجة | ليه |
|---|---|
| Nginx: [[proxy_set_header Upgrade $http_upgrade;]] و [[Connection "upgrade"]] | من غيرهم الـ proxy بيبعت طلب HTTP عادي والـ handshake بيفشل |
| [[proxy_read_timeout]] أطول من ٦٠ ثانية | Nginx بيقفل الاتصال الساكت بعد ٦٠ ثانية افتراضيًا |
| ping/pong | uvicorn بيبعت ping كل ٢٠ ثانية ([[--ws-ping-interval]]) ويقفل لو مفيش pong في ٢٠ ([[--ws-ping-timeout]]) |
| فحص [[Origin]] | المتصفح بيبعت cookies مع WebSocket من أي موقع، فلو بتعتمد على cookie لازم تتأكد إن [[ws.headers["origin"]]] دومينك |
| reconnect في الـ client | النت بيقطع؛ الـ client يعيد بعد ١ و ٢ و ٤ ثواني |
| حد للرسايل | [[[:500]]] في المثال، و [[--ws-max-size]] في uvicorn (١٦ ميجا افتراضيًا) |

الأرقام دي من [[uvicorn --help]] و وثائق Nginx، والـ Nginx ماتجرّبش هنا.

---

## «توصل للإجابة بنفسك»

~~~bash
uvicorn --help | grep -i ws
python -c "from fastapi import status; print([n for n in dir(status) if n.startswith('WS_')])"
python -c "from starlette.websockets import WebSocket; help(WebSocket.receive_text)"
~~~

التاني بيطبع كل أكواد الإغلاق ([[WS_1000_NORMAL_CLOSURE]] و [[WS_1008_POLICY_VIOLATION]] و [[WS_1011_INTERNAL_ERROR]]...). ولو الـ client شاف [[InvalidStatus: server rejected WebSocket connection: HTTP 403]] يبقى اترفض قبل [[accept]] (توكن، أو route مش موجود، أو Origin).

---

## الخلاصة

| الحاجة | الصح | الغلط |
|---|---|---|
| الـ auth | قبل [[accept]]، و [[WebSocketException(1008)]] | بعد [[accept]] أو مفيش |
| الرسالة | [[receive_text]] + [[json.loads]] في [[try]] | [[receive_json]] (بتقع وتسيب الـ socket) |
| الفصل | [[leave]] في [[finally]] | في [[except WebSocketDisconnect]] بس |
| الـ broadcast | نسخة [[list()]] و [[try]] لكل إرسال | لف على الـ set نفسها، وواحد ميت يوقف الكل |
| أكتر من worker | Redis pub/sub | [[rooms]] في الذاكرة |
| التوكن | قصير ومخصوص، أو cookie | التوكن الأساسي في الـ URL (بيتكتب في اللوج) |`,
          try: R`سطّب [[pip install fastapi uvicorn websockets pytest httpx]]، واحفظ المثال [[main.py]] وشغّله بـ [[uvicorn main:app --port 8031]]. افتح ترمنالين واكتب في كل واحد [[python -m websockets "ws://127.0.0.1:8031/ws/general?token=tok-mona"]] (والتاني [[tok-omar]]). ابعت [[{"text": "ازيك"}]] من واحد وشوفه في التاني، وابعت [[hello]] من غير JSON، واقفل واحد بـ [[Ctrl+C]]. وبعدين جرّب [[?token=nope]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** منى ثم عمر دخلوا [[/ws/a]]، وسارة دخلت [[/ws/b]]. عمر بعت [[{"text": "  "}]] وبعدين [[{"text": 42}]] وبعدين قفل. اكتب بالترتيب كل رسالة كل واحد فيهم هيستلمها من أول ما دخل. وبعدين شغّلها بـ TestClient.`, done: R`الترتيب طابق: منى [[joined mona]] و [[joined omar]] و [[message "42"]] و [[left omar]]، وعمر [[joined omar]] و [[message "42"]]، وسارة [[joined sara]] بس. والفاضية متبعتتش لأي حد، و [[42]] بقت [["42"]] بسبب [[str()]].` },
            { lvl: 'تطبيق', t: R`**ابني حاجة:** زوّد على المثال: [[{"type": "who"}]] بيرجّع للمرسل بس لستة الأسامي اللي في الـ room، ورسالة خاصة [[{"to": "omar", "text": "..."}]] بتوصل لعمر بس في نفس الـ room، و [[typing]] بيتبعت لكل الـ room ما عدا المرسل.`, done: R`اختبار pytest لكل واحدة بيعدّي: [[who]] بيرجّع [[["mona", "omar"]]] مترتبة، والخاصة مبتوصلش لطرف تالت في نفس الـ room، و [[typing]] مبيرجعش للمرسل. والاختبارات القديمة لسه خضرا.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** شغّل النسخة دي وشوف إيه اللي بيبوظ: [[await ws.accept()]] قبل فحص التوكن، و [[data = await ws.receive_json()]]، و [[for c in rooms[room]: await c.send_json(msg)]]، و [[rooms[room].remove(ws)]] جوه [[except WebSocketDisconnect]] بس. اعمل اختبار يوقّع كل مشكلة قبل ما تصلّحها.`, done: R`٤ اختبارات حمرا قبل التصليح (توكن غلط بيتقبل، و نص مش JSON بيقطع الاتصال ويسيب الـ socket، واتصال ميت بيوقف الإرسال للباقيين، و [[remove]] بترمي [[KeyError]] لو اتنادت مرتين)، وخضرا بعده.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** شغّل المثال على worker واحد، واعمل سكربت بيفتح ٢٠٠ اتصال في نفس الـ room بـ [[websockets]]، وكل واحد بيبعت رسالة واحدة. قيس الوقت لحد ما كل الـ ٢٠٠ يستلموا الـ ٢٠٠ رسالة (٤٠,٠٠٠ استلام)، وبعدين بدّل [[for ws in ...: await ws.send_json]] بـ [[asyncio.gather]] على كل الإرسالات وقيس تاني.`, done: R`عندك رقمين، وكتبت الفرق بالنسبة، وكتبت عيب [[gather]] (لو client بطيء، هل بيأخر الباقيين ولا لأ) وإزاي اتأكدت منه بـ client بيعمل [[sleep]] قبل كل [[recv]].` },
          ],
          deep: {
            why: R`HTTP عادي الـ client بيسأل والسيرفر بيرد. لو عايز تعرف رسالة جديدة جات، لازم تسأل كل شوية (polling): طلبات كتير فاضية، وتأخير لحد السؤال الجاي. WebSocket بيخلي السيرفر يبعت أول ما الحاجة تحصل، على اتصال واحد مفتوح، بـ frames صغيرة (٢ لـ ١٤ byte header بدل مئات في HTTP).`,
            how: R`**الـ handshake:** طلب GET فيه [[Upgrade: websocket]] و [[Sec-WebSocket-Key]] عشوائي، والسيرفر بيرد 101 و [[Sec-WebSocket-Accept]] = SHA-1 للمفتاح + ثابت من المعيار بـ base64 (بيثبت إن السيرفر فاهم WebSocket فعلًا). بعدها نفس الـ TCP بيشيل frames: text أو binary أو ping أو pong أو close.

**في ASGI:** uvicorn بيدّي التطبيق scope نوعه [[websocket]]، والتطبيق بيستقبل [[websocket.connect]] ويرد [[websocket.accept]] أو [[websocket.close]]. لو close قبل accept، uvicorn بيرد HTTP 403 (علشان كده 403 في الـ client الحقيقي). و Starlette بيحوّل [[websocket.disconnect]] لـ [[WebSocketDisconnect]] بالكود.

**الـ event loop:** كل اتصال coroutine واقفة على [[await receive]]، فآلاف الاتصالات المفتوحة الساكتة بتاخد ذاكرة بس مش CPU. بس أي كود sync تقيل جوه أي واحدة بيوقّف الكل (درس «blocking في async»).

**أكواد الإغلاق:** 1000 طبيعي، و 1001 السيرفر بيقفل، و 1008 policy (auth)، و 1011 خطأ داخلي، و 1006 مش كود بيتبعت: ده معناه الاتصال اتقطع من غير close frame (اللي حصل مع [[receive_json]]).

**Redis pub/sub:** [[PUBLISH]] بيوصّل للمشتركين **دلوقتي** بس، مفيش تخزين. علشان كده بيتستخدم للتوزيع بين الـ workers، والتاريخ مكانه القاعدة.`,
            when: R`WebSocket: لما الاتجاهين بيبعتوا كتير (chat، ألعاب، تحرير مشترك). و Server-Sent Events ([[StreamingResponse]] بـ [[text/event-stream]]): لما السيرفر بس اللي بيبعت (إشعارات، تقدّم job، أسعار)، أبسط وبيعدّي من أي proxy وبيعمل reconnect لوحده في المتصفح. و polling كل ٣٠ ثانية: لو التحديث مش مستعجل، أبسط حاجة. والـ rooms في الذاكرة: worker واحد بس؛ أكتر من كده Redis pub/sub أو خدمة زي Pusher أو Ably.`,
            mistakes: R`auth بعد [[accept]] أو مفيش auth خالص (أي حد يدخل أي room). و [[receive_json]] من غير حماية (اتجرّب: الاتصال بيتقطع والـ socket بيفضل). والمسح في [[except WebSocketDisconnect]] بس مش [[finally]]. واللف على الـ set نفسها وهي بتتغيّر. وrooms في الذاكرة مع [[--workers 4]] (الناس متقسمين ومحدش عارف ليه). والتوكن الأساسي في الـ URL (بيتسجل في اللوج). ونسيان [[proxy_set_header Upgrade]] في Nginx (الاتصال بيفشل بـ 400 أو 426). ونسيان فحص [[Origin]] لما الـ auth بالـ cookie (Cross-Site WebSocket Hijacking). ورسايل من غير حد للحجم.`
          },
          sol: R`الترمنالين بيشوفوا [[{"type":"joined","user":"mona"}]] و [[{"type":"joined","user":"omar"}]]، والرسالة بتوصل للاتنين [[{"type":"message","user":"mona","text":"ازيك"}]]. و [[hello]] بيرجع للمرسل بس [[{"type":"error",...}]]. ولما تقفل واحد بـ Ctrl+C التاني بيشوف [[{"type":"left",...}]]. و [[?token=nope]]: [[python -m websockets]] بيطبع [[Failed to connect to ws://127.0.0.1:8031/ws/general?token=nope: server rejected WebSocket connection: HTTP 403.]] (websockets 17.3)، وفي client بالكود الاستثناء اسمه [[InvalidStatus]].

ولو الترمنال على ويندوز بيطبع العربي علامات استفهام، شغّل [[chcp 65001]] الأول أو استخدم Windows Terminal.`,
          solCode: R`python -m websockets "ws://127.0.0.1:8031/ws/general?token=tok-mona"
python -m websockets "ws://127.0.0.1:8031/ws/general?token=tok-omar"
python -m websockets "ws://127.0.0.1:8031/ws/general?token=nope"`
        },
        {
          cmd: "Celery و ARQ",
          title: "queue حقيقي بـ Redis: worker لوحده، و retries، و idempotency، ومراقبة، وقياس من الأول للآخر",
          learn: R`تبعت شغل من FastAPI لـ worker منفصل بـ ARQ (أو Celery)، بـ retries و backoff، ومن غير ما نفس الشغل يتعمل مرتين، وتعرف حالته وتراقب الـ worker.`,
          out: R`API بيرد 202 في ٤ms، و worker بيبعت الفاتورة ويعيد ٥ مرات لو فشل، وطلبين لنفس الأوردر بيطلّعوا فاتورة واحدة.`,
          use: {
            prog: R`إيميلات، و PDF، وتصغير صور، و webhooks لخدمات تانية، وتقارير: أي حاجة بتاخد أكتر من ثانية أو ممكن تفشل وتتعاد.`,
            work: R`«العميل اتخصم منه مرتين» و «الإيميل ماوصلش ومحدش عارف» أشهر مشاكل الشغل في الخلفية. والاتنين حلهم في الدرس ده: idempotency و retries ومراقبة.`,
          },
          desc: R`[[BackgroundTasks]] (درسه في «httpx و Redis والشغل في الخلفية») بيشغّل الشغل **جوه نفس العملية** بعد الرد. لو السيرفر وقع أو اتعمله deploy، الشغل بيضيع، ومفيش retry ولا حد يعرف. الـ **queue** بيحل ده: الـ API بيكتب «اعمل كذا» في Redis ويرجع على طول، و **worker** (عملية تانية، أو جهاز تاني) بيسحب ويشتغل، ولو فشل بيعيد.

اختيارين مشهورين:
• **ARQ:** async بالكامل زي FastAPI، صغير، Redis بس. الـ task [[async def f(ctx, ...)]]، والـ worker [[arq tasks.WorkerSettings]]، والـ API [[await pool.enqueue_job("f", ...)]].
• **Celery:** الأقدم والأكبر: Redis أو RabbitMQ، و retries و schedules و routing و Flower للمراقبة. الـ task [[@app.task]] sync، والـ worker [[celery -A app worker]]، والـ API [[f.delay(...)]].

وأربع حاجات لازم في أي queue:
• **retries بـ backoff:** فشل مؤقت (السيرفر التاني واقف) يتعاد بعد ٠.٥ و ١ و ١.٥ ثانية مثلًا، مش على طول.
• **idempotency:** الـ queue بيوصّل **مرة على الأقل** (at-least-once)، يعني الـ job ممكن يتنفذ مرتين. فالـ task نفسها لازم تبقى آمنة لو اتعادت: مفتاح [[invoice:sent:{id}]] بيتشيّك الأول.
• **[[_job_id]] ثابت:** طلبين لنفس الأوردر = job واحد.
• **مراقبة:** حالة كل job، و health check للـ worker، وعدد الفاشل.`,
          example: R`# tasks.py (الـ worker)
import asyncio, logging, os, random
from arq import Retry
from arq.connections import RedisSettings

log = logging.getLogger("tasks")
REDIS = RedisSettings(host="localhost", port=6390)

async def send_invoice(ctx, order_id: int) -> str:
    redis, attempt = ctx["redis"], ctx["job_try"]
    done_key = f"invoice:sent:{order_id}"
    if await redis.exists(done_key):
        return "already sent"
    if random.random() < ctx["fail_rate"]:
        log.warning("order %s: mail server down, try %s", order_id, attempt)
        raise Retry(defer=attempt * 0.5)
    await asyncio.sleep(0.2)
    await redis.set(done_key, "1", ex=7 * 24 * 3600)
    return f"invoice for order {order_id} sent on try {attempt}"

async def startup(ctx):
    ctx["fail_rate"] = float(os.environ.get("FAIL_RATE", "0"))

class WorkerSettings:
    functions = [send_invoice]
    on_startup = startup
    redis_settings = REDIS
    max_tries = 5
    job_timeout = 30
    keep_result = 3600
    health_check_interval = 10

# api.py (FastAPI)
from contextlib import asynccontextmanager
from arq import create_pool
from arq.jobs import Job
from fastapi import FastAPI, HTTPException, Request
from tasks import REDIS

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.arq = await create_pool(REDIS)
    yield
    await app.state.arq.aclose()

app = FastAPI(lifespan=lifespan)

@app.post("/orders/{order_id}/invoice", status_code=202)
async def queue_invoice(order_id: int, request: Request):
    job = await request.app.state.arq.enqueue_job("send_invoice", order_id, _job_id=f"invoice-{order_id}")
    if job is None:
        return {"job_id": f"invoice-{order_id}", "queued": False}
    return {"job_id": job.job_id, "queued": True}

@app.get("/jobs/{job_id}")
async def job_status(job_id: str, request: Request):
    job = Job(job_id, request.app.state.arq)
    status = await job.status()
    if status.value == "not_found":
        raise HTTPException(404, "no such job")
    info = await job.result_info()
    if info is None:
        return {"status": status.value}
    return {"status": status.value, "success": info.success, "result": str(info.result), "tries": info.job_try}`,
          lines: [
            R`[[asyncio]] للـ sleep اللي بيمثّل إرسال الإيميل، و [[logging]] للوج الـ worker، و [[os]] لقراية [[FAIL_RATE]] من الـ environment، و [[random]] عشان نمثّل سيرفر إيميل بيفشل أحيانًا.`,
            R`[[Retry]] exception بترميه من الـ task عشان تقول لـ ARQ «أعد المحاولة بعد شوية». أي exception تاني برضه بيتعاد، بس [[Retry]] بيخليك تحدد الوقت.`,
            R`[[RedisSettings]] بيوصف الاتصال بـ Redis (host و port و password و database).`,
            R`logger باسم [[tasks]]. الـ worker بيطبع رسايله في نفس الترمنال (اتشاف في التجربة: [[order 201: mail server down, try 1]]).`,
            R`إعدادات Redis في مكان واحد، والـ API والـ worker الاتنين بيستوردوها، فمستحيل واحد يكتب في Redis والتاني يقرا من Redis تاني. البورت 6390 عشان Docker في التجربة؛ الافتراضي 6379. في الإنتاج من env.`,
            R`الـ task: [[async def]] وأول argument دايمًا [[ctx]] (dict من ARQ)، وبعده الـ arguments اللي اتبعتت مع [[enqueue_job]]. الـ arguments بتتخزن في Redis بـ pickle، فابعت أرقام ونصوص (الـ id) مش objects كاملة.`,
            R`[[ctx["redis"]]] اتصال Redis جاهز من ARQ نفسه، و [[ctx["job_try"]]] رقم المحاولة (١ للأولى).`,
            R`مفتاح الـ idempotency: «الفاتورة دي اتبعتت». اسمه فيه الـ id، فكل أوردر ليه مفتاح.`,
            R`لو المفتاح موجود، يبقى الشغل ده اتعمل قبل كده (job اتعاد بعد ما خلص، أو job تاني لنفس الأوردر)...`,
            R`...نرجع من غير ما نبعت تاني. ده اللي بيمنع «العميل جاله الإيميل مرتين» لما الـ worker يقع بعد الإرسال وقبل ما ARQ يسجل إن الـ job خلص.`,
            R`تمثيل الفشل: لو رقم عشوائي أقل من [[fail_rate]] نعتبر سيرفر الإيميل واقع. [[FAIL_RATE=0.6]] = ٦٠٪ من المحاولات بتفشل.`,
            R`لوج تحذير بالأوردر ورقم المحاولة. [[%s]] بدل f-string عشان logging يبني النص بس لو المستوى هيتطبع.`,
            R`[[Retry(defer=...)]]: أعد بعد ٠.٥ ثانية في المحاولة الأولى، و ١ في التانية، و ١.٥ في التالتة... (backoff خطي). اتشاف في اللوج: [[retrying job in 0.50s]] و [[1.00s]] و [[1.50s]].`,
            R`الشغل نفسه (إرسال الإيميل) بياخد ٠.٢ ثانية. في الحقيقة هنا [[await client.post(...)]] لخدمة الإيميل (درس «httpx.AsyncClient»).`,
            R`بعد ما الإرسال نجح، نكتب المفتاح لمدة أسبوع ([[ex]] بالثواني). لازم **بعد** الإرسال مش قبله: لو كتبناه قبل والإرسال فشل، المحاولة الجاية هتلاقيه وترجع «already sent» والإيميل عمره ما يتبعت.`,
            R`اللي الـ task بترجّعه بيتخزن كنتيجة الـ job، والـ API بيقراها.`,
            R`[[on_startup]] بيتنادى مرة لما الـ worker يبدأ، وبياخد نفس [[ctx]]. هنا بنحط الحاجات المشتركة (اتصال القاعدة، و httpx client) عشان كل task متفتحش اتصال جديد.`,
            R`[[FAIL_RATE]] من الـ environment، و [["0"]] لو مش موجود (يعني مفيش فشل). [[float()]] لأن الـ env دايمًا نص.`,
            R`كلاس الإعدادات: الأمر [[arq tasks.WorkerSettings]] بيقراه. مش لازم يورث من حاجة.`,
            R`لستة الدوال اللي الـ worker يعرف ينفّذها. لو الـ API بعت اسم مش في اللستة، الـ job بيفشل بـ [[function 'x' not found]].`,
            R`الدالة [[startup]] اللي فوق، من غير قوسين: بنديها لـ ARQ وهو اللي بيناديها مرة واحدة أول ما الـ worker يبدأ.`,
            R`نفس [[REDIS]] اللي الـ API بيستخدمها، عشان الـ worker يسحب من نفس الـ queue اللي الـ API بيكتب فيها.`,
            R`[[max_tries = 5]]: بعد ٥ محاولات الـ job بيفشل نهائي. الافتراضي ٥ برضه، بس مكتوب عشان يبان. اتشاف: [[max retries 5 exceeded]].`,
            R`[[job_timeout = 30]]: لو الـ task أخدت أكتر من ٣٠ ثانية بتتلغي ([[asyncio.TimeoutError]]) وبتتحسب محاولة فاشلة. الافتراضي ٣٠٠ ثانية، وده كتير لإيميل.`,
            R`[[keep_result = 3600]]: النتيجة بتفضل في Redis ساعة. وخد بالك: طول ما النتيجة موجودة، [[enqueue_job]] بنفس الـ [[_job_id]] بيرجّع [[None]] (اتجرّب). يعني مينفعش تبعت نفس الفاتورة تاني قبل ساعة، وده غالبًا اللي انت عايزه.`,
            R`الـ worker بيكتب سطر صحة في Redis كل ١٠ ثواني، و [[arq --check tasks.WorkerSettings]] بيقراه (للـ Docker healthcheck).`,
            R`[[asynccontextmanager]] عشان الـ lifespan (يفتح الـ pool مرة لما التطبيق يبدأ ويقفله لما يقفل).`,
            R`[[create_pool]] بيعمل اتصال Redis فيه [[enqueue_job]].`,
            R`[[Job]] بيمثّل job بالـ id بتاعه، عشان نسأل عن حالته ونتيجته.`,
            R`[[Request]] عشان نوصل لـ [[request.app.state]].`,
            R`نفس إعدادات Redis من [[tasks.py]]. الـ API بيستورد الإعدادات بس، مش الـ task نفسها: هو بيبعت اسمها كنص.`,
            R`decorator بيحوّل الدالة اللي بـ [[yield]] لـ context manager.`,
            R`الـ lifespan بياخد التطبيق.`,
            R`pool واحد للتطبيق كله في [[app.state]]. لو عملت pool جوه كل طلب، كل طلب هيفتح اتصال Redis جديد (بطيء، والاتصالات بتخلص).`,
            R`كل اللي قبل [[yield]] بيحصل وقت التشغيل، واللي بعده وقت القفل.`,
            R`نقفل اتصال Redis بنظافة لما التطبيق يقفل، ولا ممكن يطلع warning إن فيه اتصال اتساب مفتوح.`,
            R`التطبيق، و [[lifespan=lifespan]] بيقول لـ FastAPI يشغّل الدالة دي وقت التشغيل والإيقاف.`,
            R`202 Accepted = «استلمت الطلب وهيتعمل»، مش «اتعمل». ده الرد الصح لأي شغل بيتبعت لـ queue.`,
            R`الـ endpoint بياخد الأوردر.`,
            R`[[enqueue_job]] بياخد اسم الدالة كنص والـ arguments. و [[_job_id]] (بـ underscore عشان ميتلخبطش مع arguments الدالة) بيخلي الـ id ثابت لكل أوردر: لو job بنفس الـ id موجود (مستني، أو شغال، أو خلص ونتيجته لسه محفوظة)، [[enqueue_job]] بيرجّع [[None]]. ورجع في ٤ لـ ٦٠ms في التجربة (الأول أبطأ عشان أول اتصال).`,
            R`[[None]] = الـ job موجود قبل كده...`,
            R`...نرجّع نفس الـ id و [[queued: False]]، فالـ client يقدر يسأل عن حالته عادي. ده اللي خلّى «POST again» يرجع [[queued: False]].`,
            R`job جديد اتحط في الـ queue.`,
            R`endpoint الحالة: الـ frontend بيناديه كل ثانية أو اتنين لحد ما الحالة تبقى [[complete]].`,
            R`بياخد الـ id من الـ URL.`,
            R`نعمل [[Job]] بالـ id ونفس الـ pool.`,
            R`[[status()]] بترجّع enum: [[queued]] أو [[deferred]] (مستني retry) أو [[in_progress]] أو [[complete]] أو [[not_found]].`,
            R`[[not_found]]: مفيش job بالـ id ده، أو النتيجة عدّت [[keep_result]] واتمسحت...`,
            R`...404 برسالة «no such job»، فالـ client يعرف إن الـ id غلط أو قديم ومحتاج يبعت الطلب من الأول.`,
            R`[[result_info()]] بترجّع النتيجة ومعاها [[success]] و [[job_try]] ووقت البداية والنهاية، أو [[None]] لو لسه مخلصش.`,
            R`لسه شغال أو مستني...`,
            R`...نرجّع الحالة بس ([[queued]] أو [[in_progress]] أو [[deferred]])، من غير نتيجة لسه.`,
            R`**[[success]] مهم:** [[status]] بيبقى [[complete]] حتى لو الـ job **فشل** بعد ٥ محاولات (اتجرّب). أول نسخة من الـ endpoint كانت بترجّع [[result]] بس، والفاشل طلع [[{"status": "complete", "result": {}}]]. و [[str(info.result)]] لأن النتيجة في الفشل exception ومينفعش تتحول JSON.`,
          ],
          teach: R`## المثال بيعمل إيه؟

[[POST /orders/{id}/invoice]] بيحط job في Redis ويرد 202، و worker بـ ARQ (عملية لوحدها) بيبعت الفاتورة ويعيد لو فشل، و [[GET /jobs/{id}]] بيقول الحالة. كل الناتج من تشغيل حقيقي على ويندوز: arq 0.28.0 و celery 5.6.3 و redis-py 5.3.1، و Redis 7.4.12 في [[docker run --rm -p 6390:6379 redis:7-alpine]].

---

## ١. إمتى [[BackgroundTasks]] مش كفاية؟

| السؤال | BackgroundTasks | queue (ARQ / Celery) |
|---|---|---|
| السيرفر وقع أو اتعمله deploy في النص | الشغل ضاع (اتجرّب في درس «BackgroundTasks») | الـ job لسه في Redis، وworker تاني بياخده |
| فشل مؤقت | عليك تكتب retry بإيدك | [[Retry]] أو [[autoretry_for]] |
| شغل CPU تقيل (PDF، صور) | بياكل CPU نفس السيرفر اللي بيرد على الناس | worker على جهاز تاني، وتزوّد workers براحتك |
| «الإيميل اتبعت؟» | محدش يعرف | [[GET /jobs/{id}]] و health check |
| ميعاد (كل يوم الساعة ٣) | مينفعش | [[cron_jobs]] في ARQ أو [[beat]] في Celery |

القاعدة: لو الشغل صغير (أقل من ثانية) وضياعه مش مشكلة (لوج، أو cache)، [[BackgroundTasks]] كفاية. غير كده queue.

---

## ٢. التشغيل

تلات ترمنالات:

~~~bash
docker run --rm --name lab-redis -p 6390:6379 redis:7-alpine
arq tasks.WorkerSettings
uvicorn api:app --port 8041
~~~

وسكربت بيبعت POST مرتين لنفس الأوردر، وبعدين يسأل كل 50ms لحد ما يخلص:

~~~text الناتج (اتشغّل فعلًا)
POST 202 {'job_id': 'invoice-101', 'queued': True} 53ms
POST again 202 {'job_id': 'invoice-101', 'queued': False}
GET {'status': 'complete', 'result': 'invoice for order 101 sent on try 1', 'tries': 1} end to end 622ms
~~~

~~~text لوج الـ worker
05:29:52: Starting worker for 1 functions: send_invoice
05:29:52: redis_version=7.4.12 mem_usage=1.01M clients_connected=1 db_keys=0
05:29:57:   0.34s → invoice-101:send_invoice(101)
05:29:57:   0.21s ← invoice-101:send_invoice ● 'invoice for order 101 sent on try 1'
~~~

- [[0.34s →]]: الـ job استنى ٠.٣٤ ثانية في الـ queue قبل ما الـ worker ياخده.
- [[0.21s ←]]: الشغل نفسه أخد ٠.٢١ (الـ sleep بتاع ٠.٢).
- الـ POST التاني مطلّعش job تاني: نفس [[_job_id]].

---

## ٣. القياس من الأول للآخر

| الحالة | من الـ POST لحد النتيجة |
|---|---|
| ARQ بالإعدادات الافتراضية (٤ أوردرات) | 622 و 603 و 515 و 511ms |
| ARQ بـ [[poll_delay = 0.05]] | 306 و 263 و 204ms |
| Celery (worker [[--pool=solo]]) | 294 و 205 و 205ms |

الشغل نفسه ٢٠٠ms في الكل. الفرق كله في **الانتظار في الـ queue**: ARQ بيسأل Redis «فيه حاجة؟» كل [[poll_delay]] (نص ثانية افتراضيًا)، فالـ job بيستنى لحد ٥٠٠ms. و Celery بيستخدم [[BRPOP]] (Redis بيصحّيه أول ما حاجة توصل). لو التأخير ده مهم، قلل [[poll_delay]] في [[WorkerSettings]] (كل poll طلب Redis صغير). وكمان رقم الـ GET بيتضمن الـ polling بتاعنا كل 50ms.

والـ API نفسه: [[enqueue_job]] بياخد ٤ لـ ٦ms بعد أول طلب (الأول ٥٣ لأنه بيفتح الاتصال). يعني اليوزر بياخد 202 في ملي ثواني مهما كان الشغل تقيل.

---

## ٤. retries

شغّلنا الـ worker بـ [[FAIL_RATE=0.6]] (٦٠٪ فشل) وبعتنا ٣ أوردرات:

~~~text لوج الـ worker (اتشغّل فعلًا، متقصّر)
05:30:17:   0.04s → invoice-201:send_invoice(201)
order 201: mail server down, try 1
05:30:17:   0.00s ↻ invoice-201:send_invoice retrying job in 0.50s
05:30:18:   0.56s → invoice-201:send_invoice(201) try=2
order 201: mail server down, try 2
05:30:18:   0.00s ↻ invoice-201:send_invoice retrying job in 1.00s
...
05:30:23:   5.16s → invoice-201:send_invoice(201) try=5
05:30:23:   0.21s ← invoice-201:send_invoice ● 'invoice for order 201 sent on try 5'
...
05:30:28:   0.00s ↻ invoice-202:send_invoice retrying job in 2.50s
05:30:31:   7.87s ! invoice-202:send_invoice max retries 5 exceeded
05:30:24: recording health: Oct-30 05:30:24 j_complete=1 j_failed=0 j_retried=5 j_ongoing=1 queued=1
~~~

~~~text الناتج من الـ API (اتشغّل فعلًا: النسخة الأولى من الـ endpoint)
GET {'status': 'complete', 'result': 'invoice for order 201 sent on try 5', 'tries': 5} end to end 5466ms
GET {'status': 'complete', 'result': {}, 'tries': 6} end to end 7935ms
GET {'status': 'complete', 'result': 'invoice for order 203 sent on try 1', 'tries': 1} end to end 698ms
~~~

- ٢٠١ نجح في المحاولة الخامسة بعد ٥.٥ ثانية (٠.٥ + ١ + ١.٥ + ٢ ثواني انتظار).
- ٢٠٢ فشل الخمسة، و**الـ status لسه [[complete]]** والنتيجة [[{}]]. لما سألنا Redis مباشرة: [[success=False]] و [[JobExecutionFailed('max 5 retries exceeded')]] و [[job_try=6]]. علشان كده المثال بيرجّع [[success]] و [[str(result)]].

ودي النسخة النهائية مع [[FAIL_RATE=0.5]]:

~~~text الناتج (اتشغّل فعلًا: المثال زي ما هو)
GET {'status': 'complete', 'success': True, 'result': 'invoice for order 602 sent on try 2', 'tries': 2} end to end 1006ms
~~~

### إيه اللي يتعاد وإيه اللي لأ؟

الفشل المؤقت (timeout، أو 503، أو connection refused) يتعاد. والفشل الدائم (إيميل مش صالح، أو 400 من الخدمة، أو الأوردر اتمسح) **ميتعادش**: ارجع نتيجة فيها السبب، أو ارمي exception بعد ما تكتب لوج. إعادة حاجة مش هتنجح بتاكل وقت الـ worker وبتأخر الباقيين.

---

## ٥. idempotency: مرة على الأقل، مش مرة بالظبط

ARQ (زي Celery بـ [[acks_late]]) بيوصّل **at-least-once**: لو الـ worker اتقفل بعد ما بعت الإيميل وقبل ما يسجل إن الـ job خلص، الـ job هيتعاد. ده من وثائق ARQ، ماتجرّبش إننا نقتل الـ worker في النص. علشان كده الـ task نفسها بتشيّك [[invoice:sent:{id}]] الأول:

~~~text الناتج (اتشغّل فعلًا: Celery، نفس الأوردر مرتين)
301 65721f82 invoice for order 301 sent on try 1 enqueue 80ms, end to end 294ms
301 71e3f1e7 already sent enqueue 1ms, end to end 4ms
~~~

وفي ARQ، الـ [[_job_id]] بيمنع التكرار قبل ما يوصل الـ worker أصلًا:

~~~text الناتج (اتشغّل فعلًا: نفس الأوردر بعد ما خلص)
POST 202 {'job_id': 'invoice-601', 'queued': False} 41ms
GET {'status': 'complete', 'success': True, 'result': 'invoice for order 701 sent on try 1', 'tries': 1} end to end 56ms
~~~

الطبقتين مع بعض: [[_job_id]] بيقفل الطلبات المكررة من الـ API، ومفتاح Redis بيقفل الإعادة جوه الـ worker. ولو الشغل بيخصم فلوس، الخدمة التانية نفسها لازم تقبل idempotency key (Stripe و Paymob بيقبلوا header زي [[Idempotency-Key]]).

---

## ٦. المراقبة

~~~bash
arq --check tasks.WorkerSettings
~~~

~~~text الناتج (اتشغّل فعلًا)
05:30:51: Health check successful: b'Oct-30 05:30:44 j_complete=2 j_failed=1 j_retried=9 j_ongoing=0 queued=0'
exit=0
~~~

[[--check]] بيقرا سطر الصحة اللي الـ worker بيكتبه كل [[health_check_interval]]، ويخرج بـ 0 لو موجود و 1 لو لأ. حطه في [[HEALTHCHECK]] في Dockerfile. و [[queued=0]] مهم: لو بيكبر ومبيقلش، الـ workers مش ملاحقين.

وفي Celery:

~~~text الناتج (اتشغّل فعلًا)
$ celery -A celery_app inspect ping
        pong

1 node online.
~~~

و Flower ([[pip install flower]] و [[celery -A celery_app flower]]) بيعمل صفحة فيها كل task وحالتها ووقتها (من الوثائق، ماتجرّبش هنا). ولأي queue: اعمل metric لعدد الـ jobs المستنية والفاشلة في [[/metrics]] (درس «observability»)، وتنبيه لما الفاشل يزيد.

---

## ٧. نفس الحاجة بـ Celery

~~~python
import os, random, time
import redis
from celery import Celery

app = Celery("shop", broker="redis://localhost:6390/1", backend="redis://localhost:6390/2")
app.conf.update(task_acks_late=True, task_reject_on_worker_lost=True, worker_prefetch_multiplier=1, result_expires=3600)
r = redis.Redis(port=6390, db=3)

class MailDown(Exception):
    pass

@app.task(bind=True, autoretry_for=(MailDown,), retry_backoff=1, retry_backoff_max=30, retry_jitter=False, max_retries=4)
def send_invoice(self, order_id: int) -> str:
    done_key = f"invoice:sent:{order_id}"
    if r.exists(done_key):
        return "already sent"
    if random.random() < float(os.environ.get("FAIL_RATE", "0")):
        raise MailDown(f"mail server down, try {self.request.retries + 1}")
    time.sleep(0.2)
    r.set(done_key, "1", ex=7 * 24 * 3600)
    return f"invoice for order {order_id} sent on try {self.request.retries + 1}"
~~~

~~~bash
celery -A celery_app worker --pool=solo --loglevel=INFO
~~~

~~~text لوج الـ worker (اتشغّل فعلًا: FAIL_RATE=0.7، متقصّر)
Task celery_app.send_invoice[22e64dea-...] retry: Retry in 1s: MailDown('mail server down, try 1')
Task celery_app.send_invoice[22e64dea-...] retry: Retry in 2s: MailDown('mail server down, try 2')
Task celery_app.send_invoice[22e64dea-...] retry: Retry in 4s: MailDown('mail server down, try 3')
Task celery_app.send_invoice[22e64dea-...] retry: Retry in 8s: MailDown('mail server down, try 4')
Task celery_app.send_invoice[22e64dea-...] succeeded in 0.204s: 'invoice for order 401 sent on try 5'
Task celery_app.send_invoice[cc56eb2b-...] raised unexpected: MailDown('mail server down, try 5')
~~~

| الإعداد | معناه |
|---|---|
| [[autoretry_for=(MailDown,)]] | أعد لوحدك لو الـ exception ده اترمى، من غير [[self.retry()]] بإيدك |
| [[retry_backoff=1]] و [[retry_jitter=False]] | 1 و 2 و 4 و 8 ثواني (أُسّي). الـ jitter (عشوائية) بيتساب [[True]] في الإنتاج عشان كل الـ tasks الفاشلة متعيدش في نفس اللحظة |
| [[max_retries=4]] | ٤ إعادات = ٥ محاولات، وبعدها [[FAILURE]] |
| [[task_acks_late=True]] | الـ task بتتشال من الـ queue بعد ما تخلص مش أول ما تبدأ، فلو الـ worker وقع بتتعاد (at-least-once) |
| [[worker_prefetch_multiplier=1]] | الـ worker مبيحجزش tasks كتير قدامه، فالشغل بيتوزع على الـ workers بالعدل |
| [[--pool=solo]] | **لازم على ويندوز**: الـ pool الافتراضي (prefork) مش مدعوم هناك. على لينكس شيله |

وخد بالك: [[send_invoice.delay(id)]] **sync** (بيكلم Redis من غير [[await]]). جوه [[async def]] endpoint بياخد ١ms عادة (٧٠–٨٠ في أول اتصال)، وده مقبول، بس لو Redis بطيء بيقفل الـ loop. ARQ مالوش المشكلة دي لأن [[enqueue_job]] بـ [[await]].

---

## ٨. ARQ ولا Celery؟

| | ARQ | Celery |
|---|---|---|
| الأسلوب | async، والـ task [[async def]] | sync (فيه دعم async محدود) |
| الـ broker | Redis بس | Redis أو RabbitMQ أو SQS |
| الحجم | مكتبة صغيرة، تقراها في ساعة | كبير، وإعدادات كتير |
| المراقبة | [[--check]] و [[result_info]] | Flower و [[inspect]] و events |
| مواعيد | [[cron_jobs]] | Celery beat |
| workflows (task بعد task) | بإيدك | [[chain]] و [[group]] و [[chord]] |
| بيناسب | FastAPI و شغل I/O (إيميل، HTTP) | فرق كبيرة، وشغل CPU، و Django |

وفيه بدايل حديثة (Dramatiq و Taskiq و SAQ)، ونفس الأفكار: queue و retries و idempotency ومراقبة.

---

## «توصل للإجابة بنفسك»

~~~bash
arq --help
python -c "from arq.worker import Worker; help(Worker.__init__)"
celery -A celery_app inspect --help
celery -A celery_app report
~~~

[[help(Worker.__init__)]] بيوريك كل إعداد ينفع يتحط في [[WorkerSettings]] وقيمته الافتراضية ([[poll_delay=0.5]] و [[max_jobs=10]] و [[job_timeout=300]]...). ولو الـ job فضل [[queued]] للأبد: الـ worker مش شغال، أو بيقرا Redis تاني (بورت أو database مختلف)، أو اسم الدالة مش في [[functions]].

---

## الخلاصة

| الحاجة | الصح | الغلط |
|---|---|---|
| شغل مهم أو تقيل | queue + worker | [[BackgroundTasks]] |
| الرد | 202 و job id | 200 وكأنه خلص |
| الـ task | آمنة لو اتعادت (مفتاح بعد النجاح) | بتبعت تاني كل إعادة |
| نفس الطلب مرتين | [[_job_id]] ثابت | job جديد كل مرة |
| retries | backoff وحد أقصى، ومؤقت بس | على طول وللأبد، أو حتى للفشل الدائم |
| الحالة | [[success]] مع [[status]] | [[status == "complete"]] = نجح |
| المراقبة | [[arq --check]] أو Flower ومقياس للـ queue | مفيش |
| ويندوز و Celery | [[--pool=solo]] | الافتراضي (مبيشتغلش) |`,
          try: R`شغّل Redis بـ [[docker run --rm --name lab-redis -p 6390:6379 redis:7-alpine]]، وسطّب [[pip install fastapi uvicorn arq httpx]]، واحفظ الجزئين [[tasks.py]] و [[api.py]] في نفس الفولدر. شغّل [[arq tasks.WorkerSettings]] في ترمنال و [[uvicorn api:app]] في التاني. ابعت [[curl -i -X POST localhost:8000/orders/1/invoice]] مرتين، و [[curl localhost:8000/jobs/invoice-1]]. وبعدين اقفل الـ worker، وابعت أوردر ٢، واسأل عن حالته، وشغّل الـ worker تاني. وفي الآخر شغّل الـ worker بـ [[FAIL_RATE=0.8]] (في PowerShell: [[$env:FAIL_RATE="0.8"]]) وشوف اللوج.`,
          practice: [
            { lvl: 'سريع', t: R`**اشرحها:** اكتب لزميل في ٥ سطور ليه الـ task بتكتب [[invoice:sent:{id}]] **بعد** الإرسال مش قبله، وإيه اللي بيحصل في الحالتين لو الـ worker وقع بين الإرسال وكتابة المفتاح.`, done: R`الشرح فيه السيناريوهين: بعد = ممكن الإيميل يتبعت مرتين في حالة نادرة (الوقوع في اللحظة دي بالظبط)، وقبل = ممكن الإيميل عمره ما يتبعت والـ job يقول «already sent». وعرفت ليه الأولى أهون للإيميل، وإن الفلوس محتاجة idempotency key عند الخدمة نفسها.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** اقفل الـ worker، وابعت ٢٠ أوردر مختلف وكل واحد مرتين، وشوف [[curl localhost:8000/jobs/invoice-5]] بيقول إيه. شغّل ٣ workers مع بعض ([[arq tasks.WorkerSettings]] في ٣ ترمنالات) بـ [[FAIL_RATE=0.5]]، ولما يخلصوا اعد المفاتيح بـ [[docker exec lab-redis redis-cli --scan --pattern "invoice:sent:*"]].`, done: R`والـ worker مقفول: الحالة [[queued]] والـ API رد 202 في أقل من ٥٠ms. وبعد التشغيل: بالظبط ٢٠ مفتاح [[invoice:sent:*]]، وكل الـ ٢٠ job [[success: True]] (أو اللي فشل الخمس محاولات [[success: False]] ومفتاحه مش موجود)، ومفيش أوردر اتبعت مرتين في لوج الـ workers.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** الـ task دي فيها ٤ مشاكل: [[async def charge(ctx, order: dict):]] وجواها [[await ctx["redis"].set(f"paid:{order['id']}", 1)]] وبعدها [[resp = requests.post(PAY_URL, json=order)]] و [[if resp.status_code != 200: raise Retry(defer=0)]]، والـ API بيعمل [[enqueue_job("charge", order_dict)]] من غير [[_job_id]].`, done: R`لقيت الأربعة: الـ object كله في الـ job بدل الـ id (بيتخزن قديم)، والمفتاح قبل الدفع، و [[requests]] sync جوه [[async def]] (بيوقف الـ worker كله)، و [[defer=0]] مع إعادة حتى لـ 400 (فشل دائم). وكمان مفيش [[_job_id]] فضغطتين = خصم مرتين. والتصليح بيعدّي محاكاة «اضغط الزرار ٣ مرات» بخصم واحد.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** قيس من الـ POST للنتيجة لـ ٢٠ job بتلات إعدادات: ARQ الافتراضي، و ARQ بـ [[poll_delay = 0.05]]، و Celery. وبعدين ابعت الـ ٢٠ مع بعض بـ [[asyncio.gather]] وقيس الوقت الكلي لحد ما آخر واحد يخلص، مرة بـ [[max_jobs=1]] ومرة بالافتراضي (١٠).`, done: R`جدول فيه الوسيط والأقصى لكل إعداد، والـ ARQ الافتراضي وسيطه أعلى بحوالي ٢٥٠–٤٠٠ms من التانيين، و [[max_jobs=1]] الكلي حوالي ٢٠ × ٠.٢ = ٤ ثواني والافتراضي أقل من ثانية، وكتبت ليه.` },
          ],
          deep: {
            why: R`الـ request لازم يرد بسرعة: اليوزر مستني، والـ load balancer عنده timeout، والـ worker بتاع uvicorn محجوز. أي شغل بطيء أو ممكن يفشل (خدمة تانية واقعة) مكانه برّه الـ request. والـ queue بيدّيك حاجتين مش موجودين في BackgroundTasks: الشغل بيعيش لو السيرفر وقع، وتقدر تزوّد workers من غير ما تزوّد سيرفرات API.`,
            how: R`**ARQ جوه Redis:** [[enqueue_job]] بيعمل [[SET arq:job:<id>]] (الدالة والـ arguments بـ pickle) و [[ZADD arq:queue <score> <id>]] (الـ score = وقت التنفيذ بالملي ثانية، فـ [[_defer_by]] والـ retry بيحطوا وقت في المستقبل). الـ worker كل [[poll_delay]] بيعمل [[ZRANGEBYSCORE]] للي وقتهم جه، وبياخد lock بـ [[arq:in-progress:<id>]] عشان worker تاني مياخدهوش، وبعد ما يخلص بيكتب [[arq:result:<id>]] لمدة [[keep_result]] ويشيله من الـ queue. ولو الـ worker مات، الـ lock بيخلص والـ job بيرجع (at-least-once). شفنا المفاتيح دي في [[redis.keys("*")]]: [[arq:result:invoice-101]] و [[arq:queue:health-check]].

**Celery جوه Redis:** الـ task بتتحط في list اسمها [[celery]] بـ [[LPUSH]]، والـ worker بيستنى بـ [[BRPOP]] (فمفيش polling). ومع [[acks_late]] الـ task بتتحجز في [[unacked]] لحد ما تخلص. والنتيجة في الـ backend ([[celery-task-meta-<id>]]).

**الـ backoff:** خطي ([[attempt * 0.5]]) أو أُسّي ([[2 ** attempt]]، اللي Celery بيعمله). والأُسّي مع jitter أحسن لما خدمة بترجع بعد ما تقع، عشان آلاف الـ retries متضربهاش في نفس الثانية.

**الـ idempotency:** إما مفتاح بعد النجاح (الأبسط)، أو [[SET key 1 NX]] كـ lock قبل الشغل ومعاه TTL قصير (لو الشغل نفسه مينفعش يتعمل مرتين بالتوازي)، أو constraint في القاعدة ([[UNIQUE(order_id)]] في جدول الفواتير).`,
            when: R`queue: إيميلات، و webhooks خارجة، و PDF وصور، وتقارير، واستيراد ملفات، وأي حاجة بتكلم خدمة ممكن تقع. ARQ لو التطبيق FastAPI والشغل I/O. Celery لو عندك Django، أو workflows معقدة، أو محتاج RabbitMQ، أو فريق متعوّد عليه. ومش محتاج queue خالص: لو الشغل أقل من ثانية وضياعه مش مشكلة ([[BackgroundTasks]])، أو لو هو جزء من الرد نفسه (اليوزر مستني النتيجة).`,
            mistakes: R`task مش idempotent ([[acks_late]] أو crash = تتنفذ مرتين). والمفتاح قبل الشغل. وتبعت objects كاملة في الـ job بدل الـ id (البيانات بتبقى قديمة، و pickle بيقع مع objects فيها اتصالات). و [[requests]] أو [[time.sleep]] جوه task بتاعة ARQ (بتوقف كل الـ jobs التانية في نفس الـ worker، لأن [[max_jobs=10]] شغالين على نفس الـ loop). و [[status == "complete"]] معناها نجح (اتجرّب: الفاشل برضه complete). و retry للفشل الدائم. و Celery على ويندوز من غير [[--pool=solo]]. و worker ومحدش بيراقبه (الـ queue بيكبر أيام محدش واخد باله). و [[job_timeout]] الافتراضي ٣٠٠ ثانية لشغل المفروض ياخد ثانية.`
          },
          sol: R`أول POST: [[HTTP/1.1 202 Accepted]] و [[{"job_id":"invoice-1","queued":true}]]، والتاني [[{"job_id":"invoice-1","queued":false}]]. والـ GET بعد ثانية: [[{"status":"complete","success":true,"result":"invoice for order 1 sent on try 1","tries":1}]]. والـ worker مقفول: أوردر ٢ بيرجع 202 عادي، والحالة [[{"status":"queued"}]]، وأول ما الـ worker يشتغل بيطبع [[→ invoice-2:send_invoice(2)]] والحالة بتبقى [[complete]]. ده اللي BackgroundTasks مبيعرفش يعمله. و job مش موجود: [[404]] و [[{"detail":"no such job"}]].

مع [[FAIL_RATE=0.8]] هتشوف [[retrying job in 0.50s]] و [[1.00s]] و [[1.50s]]، وأوردرات كتير هتوصل [[max retries 5 exceeded]] والـ GET يقول [[success: false]] و [[result: "max 5 retries exceeded"]].`,
          solCode: R`curl -i -X POST localhost:8000/orders/1/invoice
curl -i -X POST localhost:8000/orders/1/invoice
curl -s localhost:8000/jobs/invoice-1
curl -s localhost:8000/jobs/nothing-here
arq --check tasks.WorkerSettings`
        },
        {
          cmd: "observability",
          title: "لوج JSON بـ request id، و Prometheus على /metrics، و OpenTelemetry، و health و readiness",
          learn: R`تخلي كل سطر لوج JSON فيه [[request_id]]، وتطلّع metrics لـ Prometheus بعدد الطلبات ووقتها، وتفرّق بين live و ready، وتعرف OpenTelemetry بيعمل إيه.`,
          out: R`API كل طلب فيه سطر لوج JSON بالوقت والـ status، و [[/metrics]] فيه counter و histogram بالـ route، و [[/health/ready]] بيرجع 503 لما Redis يقع.`,
          use: {
            prog: R`لما حاجة تبوظ الساعة ٣ الفجر، اللوج والـ metrics هما الحاجة الوحيدة اللي تقولك إيه اللي حصل. من غيرهم بتخمّن.`,
            work: R`«اليوزر بيقول فيه error» ← بيدّيك الـ request id من الـ response ← تدوّر عليه في اللوج ← تلاقي الـ traceback. ده الشغل اليومي في أي فريق backend.`,
          },
          desc: R`**observability** = تعرف السيرفر بيعمل إيه من برّه وهو شغال، من غير ما تفتح الكود. ليها تلات حاجات:
• **لوج منظم:** كل سطر JSON فيه الوقت والمستوى والرسالة و [[request_id]]، فتقدر تدوّر وتفلتر في Loki أو ELK أو CloudWatch. والـ request id بييجي من header [[X-Request-ID]] (لو الـ proxy بعته) أو بيتعمل جديد، وبيرجع في الـ response، وبيتحط في [[ContextVar]] عشان كل لوج في نفس الطلب يشوفه من غير ما تبعته لكل دالة.
• **metrics:** أرقام بتتجمّع: [[Counter]] (عدد الطلبات لكل route و status) و [[Histogram]] (توزيع الوقت). [[prometheus_client]] بيطلّعهم كنص على [[/metrics]]، و Prometheus بيسحبهم كل ١٥ ثانية. والـ label هو الـ **route template** ([[/orders/{order_id}]]) مش المسار نفسه، ولا هيبقى عندك مليون سلسلة.
• **traces:** طلب واحد بيعدّي على كذا خدمة؛ OpenTelemetry بيدّي كل خطوة span بوقتها، وكلهم بنفس [[trace_id]] اللي بيتنقل في header [[traceparent]].

ومعاهم health checks:
• **[[/health/live]]:** العملية شغالة؟ بيرجع 200 دايمًا. لو مردّش، الـ orchestrator يعيد تشغيلها.
• **[[/health/ready]]:** جاهز ياخد طلبات؟ بيشيّك Redis والقاعدة، و 503 لو حاجة واقعة، فالـ load balancer يبطّل يبعتله من غير ما يعيد تشغيله.

ده بيكمّل درس «logging و profiling» (أساس [[logging]]) و «CORS و middleware» (الـ middleware نفسه).`,
          example: R`import json, logging, os, re, sys, time, uuid
from contextlib import asynccontextmanager
from contextvars import ContextVar
import redis.asyncio as aioredis
from fastapi import FastAPI, Request, Response
from fastapi.responses import JSONResponse
from prometheus_client import CONTENT_TYPE_LATEST, Counter, Histogram, generate_latest

request_id: ContextVar[str] = ContextVar("request_id", default="-")

class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        entry = {"ts": self.formatTime(record, "%Y-%m-%dT%H:%M:%S"), "level": record.levelname, "logger": record.name, "msg": record.getMessage(), "request_id": request_id.get()}
        entry.update(getattr(record, "extra_fields", {}))
        if record.exc_info:
            entry["exc"] = self.formatException(record.exc_info)
        return json.dumps(entry, ensure_ascii=False)

handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(JsonFormatter())
logging.basicConfig(level=logging.INFO, handlers=[handler], force=True)
log = logging.getLogger("api")

REQUESTS = Counter("http_requests_total", "HTTP requests", ["method", "route", "status"])
LATENCY = Histogram("http_request_duration_seconds", "Request time", ["method", "route"], buckets=(0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5))

@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.redis = aioredis.Redis(port=int(os.environ.get("REDIS_PORT", "6390")), socket_timeout=0.5)
    yield
    await app.state.redis.aclose()

app = FastAPI(lifespan=lifespan)

@app.middleware("http")
async def observe(request: Request, call_next):
    rid = request.headers.get("x-request-id", "")
    if not re.fullmatch(r"[A-Za-z0-9_-]{1,64}", rid):
        rid = uuid.uuid4().hex[:12]
    token = request_id.set(rid)
    start = time.perf_counter()
    status = 500
    try:
        response = await call_next(request)
        status = response.status_code
        response.headers["X-Request-ID"] = rid
        return response
    except Exception:
        log.exception("unhandled error")
        return JSONResponse({"detail": "internal error", "request_id": rid}, status_code=500, headers={"X-Request-ID": rid})
    finally:
        elapsed = time.perf_counter() - start
        route = getattr(request.scope.get("route"), "path", "unmatched")
        if route != "/metrics":
            REQUESTS.labels(request.method, route, str(status)).inc()
            LATENCY.labels(request.method, route).observe(elapsed)
            log.info("request done", extra={"extra_fields": {"method": request.method, "route": route, "status": status, "ms": round(elapsed * 1000, 1)}})
        request_id.reset(token)

@app.get("/orders/{order_id}")
async def get_order(order_id: int):
    log.info("loading order", extra={"extra_fields": {"order_id": order_id}})
    if order_id == 13:
        raise RuntimeError("db row is corrupted")
    return {"id": order_id}

@app.get("/metrics")
def metrics():
    return Response(generate_latest(), media_type=CONTENT_TYPE_LATEST)

@app.get("/health/live")
def live():
    return {"status": "ok"}

@app.get("/health/ready")
async def ready(request: Request):
    try:
        await request.app.state.redis.ping()
    except Exception as e:
        return JSONResponse({"status": "not ready", "redis": type(e).__name__}, status_code=503)
    return {"status": "ready", "redis": "ok"}`,
          lines: [
            R`[[json]] للوج، و [[logging]] المكتبة الأساسية، و [[os]] للـ env، و [[re]] لفحص الـ request id، و [[sys]] لـ stdout، و [[time]] للقياس، و [[uuid]] لعمل id جديد.`,
            R`[[asynccontextmanager]] للـ lifespan اللي بيفتح اتصال Redis.`,
            R`[[ContextVar]] متغير قيمته مختلفة لكل طلب (لكل async task). من غيره كان لازم نبعت الـ request id لكل دالة كـ argument.`,
            R`Redis async ([[pip install redis]]). بنستخدمه في الـ readiness check بس.`,
            R`[[Response]] عشان [[/metrics]] بيرجع نص مش JSON.`,
            R`[[JSONResponse]] للـ 500 و الـ 503 اللي بنعملهم بإيدنا.`,
            R`من [[prometheus_client]]: [[Counter]] و [[Histogram]] أنواع الـ metrics، و [[generate_latest]] بيطلّع كل الـ metrics كنص، و [[CONTENT_TYPE_LATEST]] الـ content type اللي Prometheus مستنيه.`,
            R`المتغير نفسه، و [[default="-"]] للوج اللي برّه أي طلب (التشغيل، أو مكتبات تانية زي httpx)، فبيطلع [["request_id": "-"]] بدل error.`,
            R`formatter بيحوّل كل سجل لوج لسطر JSON واحد. نفس فكرة درس «logging و profiling» بس الشكل JSON.`,
            R`[[format]] بيتنادى لكل سطر لوج وبيرجّع النص اللي هيتكتب.`,
            R`الحقول الثابتة: الوقت بصيغة ISO، والمستوى، واسم الـ logger، والرسالة ([[getMessage]] بيطبّق الـ [[%s]] لو فيه)، والـ request id من الـ ContextVar.`,
            R`الحقول الزيادة اللي بتتبعت بـ [[extra={"extra_fields": {...}}]]. [[getattr(..., {})]] عشان السجلات اللي مفيهاش [[extra_fields]] (لوج المكتبات) متقعش. اسم واحد ثابت عشان منلفش على كل خصائص الـ record.`,
            R`لو السجل جاي من [[log.exception]] (فيه exception)...`,
            R`...نحط الـ traceback كله كنص في حقل [[exc]]. جوه JSON بيبقى سطر واحد بـ [[\n]]، فأدوات اللوج بتعتبره سجل واحد مش ٣٠ سطر متقطعين.`,
            R`[[ensure_ascii=False]] عشان العربي يتكتب حروف زي ما هو، مش أكواد (backslash وبعدها u وأربع أرقام hex لكل حرف) زي ما [[json.dumps]] بيعمل افتراضيًا، فاللوج يتقري. والناتج سطر واحد لكل سجل.`,
            R`handler بيكتب على stdout. في Docker و Kubernetes اللوج مكانه stdout، والمنصة هي اللي بتجمعه، مش ملف جوه الـ container.`,
            R`نربط الـ formatter بتاعنا بالـ handler.`,
            R`[[force=True]] بيشيل أي handlers اتعملت قبل كده (uvicorn بيعمل بتوعه) عشان كل لوج يطلع بشكلنا. وده بيغطي لوج المكتبات كمان (شفنا سطر httpx بنفس الشكل).`,
            R`logger التطبيق باسم [[api]]، وده اللي بيظهر في حقل [[logger]] في كل سطر JSON.`,
            R`[[Counter]] رقم بيزيد بس، باسم ووصف وأسماء الـ labels. [[_total]] في الآخر عرف Prometheus للـ counters. كل تركيبة labels ([[GET]] و [[/orders/{order_id}]] و [[200]]) سلسلة لوحدها.`,
            R`[[Histogram]] بيعدّ كام طلب وقع في كل bucket (أقل من ١٠ms، أقل من ٥٠ms...)، ومعاه المجموع والعدد. منه Prometheus بيحسب p95 و p99. الـ buckets هنا مختارة لـ API (من ١٠ms لـ ٢.٥ ثانية)؛ الافتراضي من 5ms لـ 10 ثواني.`,
            R`decorator الـ lifespan: بيحوّل الدالة اللي تحت لـ context manager.`,
            R`الـ lifespan بيستقبل التطبيق نفسه، عشان نحط الاتصال في [[app.state]].`,
            R`اتصال Redis بيتعمل **جوه** الـ lifespan مش وقت الـ import. أول نسخة كانت [[redis = aioredis.Redis(...)]] برّه، وفي TestClient تاني طلب لـ [[/health/ready]] رجع 503 بـ [[RuntimeError]] لأن الاتصال اتربط بـ event loop قديم (اتجرّب). و [[socket_timeout=0.5]] عشان الـ ready ميستناش دقيقة لو Redis مش بيرد.`,
            R`[[yield]] = هنا التطبيق شغال وبيرد على الطلبات، واللي بعده بيتنفذ وقت الإيقاف.`,
            R`نقفل الاتصال وقت الإيقاف.`,
            R`التطبيق، و [[lifespan=lifespan]] بيقول لـ FastAPI يشغّل الدالة دي وقت التشغيل والإيقاف.`,
            R`middleware HTTP: بيلف كل طلب. نفس شكل درس «CORS و middleware».`,
            R`[[call_next]] بيشغّل باقي التطبيق ويرجّع الـ response.`,
            R`الـ request id من الـ header لو الـ client أو الـ proxy (Nginx أو load balancer) بعته، عشان نفس الـ id يمشي في كل الخدمات.`,
            R`بس **لازم نتأكد من شكله**: حروف وأرقام و [[_]] و [[-]]، ٦٤ حرف بالكتير. من غير ده حد يبعت [[X-Request-ID]] فيه علامات تنصيص وسطور جديدة ويكتب سطور لوج مزوّرة (log injection)، أو ١٠ ميجا. اتجرّب: [[x" , "level": "ADMIN]] اتشال واتعمل بداله id جديد.`,
            R`id جديد: أول ١٢ حرف من uuid4، كفاية تفرّق بين الطلبات وقصيرة تتقري بالتليفون من اليوزر.`,
            R`[[set]] بيرجّع token نرجّع بيه القيمة القديمة في الآخر. كل اللوج من هنا لحد الـ reset بيشوف الـ id ده.`,
            R`بداية القياس. [[perf_counter]] ساعة للقياس (مش وقت الحيطة)، مبتتأثرش لو ساعة الجهاز اتغيّرت.`,
            R`[[status]] بيبدأ 500 عشان لو حصل exception، الـ metric يتسجل 500.`,
            R`الـ [[try]] بيمسك أي exception من التطبيق.`,
            R`[[call_next]] بيشغّل باقي الـ middlewares والـ endpoint ويرجّع الـ response.`,
            R`كود الرد للـ metric واللوج.`,
            R`بنرجّع الـ id في الـ response، فاليوزر أو الـ frontend يقدر يبعته للدعم الفني.`,
            R`الـ response زي ما هو.`,
            R`exception محدش مسكه في الـ endpoint...`,
            R`[[log.exception]] = لوج بمستوى ERROR ومعاه الـ traceback (لازم يتنادى جوه [[except]]).`,
            R`بنرجّع 500 بنفسنا وفيه الـ request id في الـ body والـ header. أول نسخة كانت [[raise]]، والـ 500 اللي Starlette بيعمله وقتها طلع **من غير** [[X-Request-ID]] (اتجرّب)، فاليوزر مكانش معاه حاجة يدّيها للدعم. ومش بنرجّع تفاصيل الـ exception: دي في اللوج بس.`,
            R`[[finally]] بيشتغل في الحالتين: نجاح أو exception.`,
            R`الوقت بالثواني (Prometheus بيستخدم الثواني).`,
            R`**الـ route template** مش المسار: [[request.scope["route"]]] هو الـ route اللي طابق، و [[.path]] فيه [[/orders/{order_id}]]. لو استخدمنا [[request.url.path]]، كل order id هيبقى سلسلة لوحده (مليون أوردر = مليون سلسلة، و Prometheus بيقع). ولو مفيش route طابق (404)، [[getattr(None, "path", "unmatched")]] بيرجّع [[unmatched]].`,
            R`منحسبش [[/metrics]] نفسه، لأن Prometheus بيناديه كل ١٥ ثانية وهيبوّظ الأرقام.`,
            R`[[labels(...)]] بيجيب السلسلة دي (أو يعملها)، و [[inc()]] بيزوّد واحد. الـ status كنص لأن الـ labels نصوص.`,
            R`[[observe]] بيحط الوقت في الـ bucket المناسب.`,
            R`سطر لوج واحد لكل طلب فيه الـ method والـ route والـ status والوقت بالملي ثانية. ده الـ access log بتاعك بشكل JSON، فتقدر تعمل [[uvicorn --no-access-log]] وتعتمد عليه.`,
            R`نرجّع الـ ContextVar لقيمته القديمة. في ASGI كل طلب في task لوحده فالقيمة مش هتعدّي لطلب تاني، بس الـ reset بيخلي الكود صح حتى لو اتنادى في مكان مش task جديد.`,
            R`route تجربة بيمثّل endpoint حقيقي بيجيب أوردر من القاعدة.`,
            R`بياخد رقم الأوردر من الـ path، و FastAPI بيرجّع 422 لو مش رقم.`,
            R`لوج عادي جوه الـ endpoint، ومعاه [[order_id]]. مش بنبعت الـ request id، والـ formatter بيجيبه لوحده من الـ ContextVar (شفناه في الناتج: نفس [[req-abc]] في السطرين).`,
            R`أوردر ١٣ بيمثّل باج حقيقي...`,
            R`...exception مش متمسوك، عشان نشوف شكل الـ 500 واللوج.`,
            R`أي أوردر تاني بيرجع عادي.`,
            R`route الـ metrics: Prometheus بيناديه كل [[scrape_interval]] (١٥ ثانية عادة).`,
            R`[[def]] عادي لأن [[generate_latest]] sync وسريع.`,
            R`[[generate_latest()]] بيرجّع bytes فيها كل الـ metrics المسجلة (بتاعتنا ومعاها metrics Python نفسه زي GC)، بالـ content type [[text/plain; version=1.0.0]]. وفي الإنتاج اقفل [[/metrics]] على الشبكة الداخلية أو بـ auth، لأنه بيكشف أسماء الـ routes والأرقام.`,
            R`liveness: العملية حية وبترد؟ ده بس اللي بيتسأل هنا.`,
            R`[[def]] بسيطة من غير أي I/O، فبترد حتى لو كل حاجة حواليها واقعة.`,
            R`200 دايمًا، **من غير** ما تشيّك Redis أو القاعدة. لو Redis وقع وخليت الـ live يفشل، Kubernetes هيعيد تشغيل كل الـ pods مع بعض، ودا مش هيصلّح Redis.`,
            R`readiness: جاهز ياخد طلبات؟`,
            R`[[async]] لأن الـ ping بـ [[await]].`,
            R`نحاول نكلّم Redis جوه [[try]]، عشان الفشل يبقى 503 مش 500.`,
            R`[[PING]] لـ Redis، بالـ timeout بتاع 0.5 ثانية.`,
            R`أي مشكلة (connection refused، أو timeout)...`,
            R`...503 ومعاها اسم المشكلة. على بورت مفيهوش Redis طلعت [[TimeoutError]] (اتجرّب على ويندوز). اسم الـ exception بس، مش الرسالة، عشان منكشفش عناوين داخلية.`,
            R`كله تمام: 200 ومعاه حالة كل dependency، عشان اللي بيقرا يعرف اتشيّك على إيه.`,
          ],
          teach: R`## المثال بيعمل إيه؟

middleware بيدّي كل طلب id، ويكتب سطر لوج JSON، ويحدّث counter و histogram. و [[/metrics]] بيطلّعهم لـ Prometheus، و [[/health/live]] و [[/health/ready]] للـ orchestrator. كل الناتج من تشغيل حقيقي على ويندوز: FastAPI 0.162، و prometheus-client 0.26.0، و redis-py 5.3.1 مع Redis 7.4 في Docker، و opentelemetry-sdk 1.45.2 مع opentelemetry-instrumentation-fastapi 0.66b2.

---

## ١. التلات حاجات

| | بيجاوب على | مثال | بيتخزن في |
|---|---|---|---|
| logs | إيه اللي حصل في الطلب ده بالظبط؟ | [[{"msg": "unhandled error", "request_id": "fc77..."}]] | Loki أو ELK أو CloudWatch |
| metrics | كام؟ وأد إيه؟ ومن إمتى؟ | ٢٪ من الطلبات 5xx في آخر ٥ دقايق، و p95 = ٣٠٠ms | Prometheus |
| traces | الطلب ده الوقت راح فين بين الخدمات؟ | ٢٨٠ms من ٣٠٠ في query واحدة | Jaeger أو Tempo |

الـ metrics بتقولك **فيه** مشكلة (التنبيه)، والـ traces بتقولك **فين**، واللوج بيقولك **ليه**.

---

## ٢. اللوج JSON

~~~python
with TestClient(main.app, raise_server_exceptions=False) as c:
    c.get("/orders/7", headers={"X-Request-ID": "req-abc"})
    c.get("/orders/13")
~~~

[[with TestClient(...)]] بيشغّل الـ lifespan (من غيرها [[app.state.redis]] مش موجود).

~~~text الناتج (اتشغّل فعلًا)
{"ts": "2026-10-30T05:33:59", "level": "INFO", "logger": "api", "msg": "loading order", "request_id": "req-abc", "order_id": 7}
{"ts": "2026-10-30T05:33:59", "level": "INFO", "logger": "api", "msg": "request done", "request_id": "req-abc", "method": "GET", "route": "/orders/{order_id}", "status": 200, "ms": 1.3}
A 200 req-abc
~~~

السطرين فيهم نفس الـ [[request_id]]: الأولاني من جوه الـ endpoint والتاني من الـ middleware، والـ endpoint مبعتش الـ id لحد. وفي Loki مثلًا: [[{app="api"} | json | request_id="req-abc"]] بيجيب كل حاجة حصلت في الطلب ده.

### الـ 500

~~~text الناتج (اتشغّل فعلًا، الـ traceback متقصّر)
{"ts": "...", "level": "INFO", "logger": "api", "msg": "loading order", "request_id": "fc77d69a176a", "order_id": 13}
{"ts": "...", "level": "ERROR", "logger": "api", "msg": "unhandled error", "request_id": "fc77d69a176a", "exc": "Traceback (most recent call last):\n ... RuntimeError: db row is corrupted"}
C 500 {"detail":"internal error","request_id":"fc77d69a176a"} fc77d69a176a
~~~

اليوزر شاف [[internal error]] والـ id بس، واللوج فيه الـ traceback بنفس الـ id. وأول نسخة كانت بتعمل [[raise]] في الـ [[except]]:

~~~text الناتج (اتشغّل فعلًا: أول نسخة)
C 500 Internal Server Error None
~~~

[[None]] = مفيش [[X-Request-ID]] في الرد، لأن الـ 500 دي Starlette هو اللي عملها برّه الـ middleware بتاعنا. يعني أهم رد محتاج فيه الـ id هو الوحيد اللي مكانش فيه.

### log injection

~~~text الناتج (اتشغّل فعلًا)
>>> c.get("/health/live", headers={"X-Request-ID": 'x" , "level": "ADMIN'})
{"ts": "...", "level": "INFO", "logger": "api", "msg": "request done", "request_id": "1bbe62b4139b", ...}
~~~

الـ id اللي فيه علامات تنصيص اترفض من الـ regex واتعمل بداله جديد. ([[json.dumps]] كان هيعمل escape للتنصيص أصلًا، بس formatters تانية زي النص العادي مبتعملش، والطول من غير حد مشكلة برضه.)

---

## ٣. [[/metrics]]

~~~text الناتج (اتشغّل فعلًا: بعد طلب 200 وطلب 500 على /orders)
# HELP http_requests_total HTTP requests
# TYPE http_requests_total counter
http_requests_total{method="GET",route="/orders/{order_id}",status="200"} 1.0
http_requests_total{method="GET",route="/orders/{order_id}",status="500"} 1.0
http_requests_total{method="GET",route="unmatched",status="404"} 1.0
# HELP http_request_duration_seconds Request time
# TYPE http_request_duration_seconds histogram
http_request_duration_seconds_bucket{le="0.01",method="GET",route="/orders/{order_id}"} 2.0
http_request_duration_seconds_bucket{le="0.05",method="GET",route="/orders/{order_id}"} 2.0
...
http_request_duration_seconds_bucket{le="+Inf",method="GET",route="/orders/{order_id}"} 2.0
http_request_duration_seconds_count{method="GET",route="/orders/{order_id}"} 2.0
http_request_duration_seconds_sum{method="GET",route="/orders/{order_id}"} 0.004422500001965091
http_requests_created{method="GET",route="/orders/{order_id}",status="200"} 1.793331239173405e+09
~~~

| السطر | معناه |
|---|---|
| [[http_requests_total{...status="500"} 1.0]] | طلب واحد رجع 500 على الـ route ده من أول ما العملية اشتغلت |
| [[route="unmatched"]] | الـ 404 كلها في سلسلة واحدة، مهما كان المسار اللي اتكتب |
| [[_bucket{le="0.01"} 2.0]] | الطلبين خلصوا في أقل من ١٠ms. الـ buckets **تراكمية**: كل bucket فيه اللي قبله |
| [[_count]] و [[_sum]] | العدد والمجموع (٤.٤ ملي ثانية للاتنين)، والمتوسط = sum / count |
| [[_created]] | وقت ما السلسلة اتعملت (Unix time). بيطلع لوحده؛ لو مش عايزه [[prometheus_client.disable_created_metrics()]] |

وفي Prometheus (من الوثائق، Prometheus نفسه ماتشغّلش هنا):

~~~text PromQL
rate(http_requests_total{status=~"5.."}[5m])
histogram_quantile(0.95, sum by (le, route) (rate(http_request_duration_seconds_bucket[5m])))
~~~

الأول: عدد الـ 5xx في الثانية في آخر ٥ دقايق. والتاني: p95 لكل route. والـ counter بيرجع صفر لما العملية تعيد تشغيل، و [[rate]] بتتعامل مع ده لوحدها، فمتقراش الرقم الخام.

### خد بالك: أكتر من worker

[[uvicorn --workers 4]] = ٤ عمليات، وكل واحدة عندها counters لوحدها. Prometheus بيسحب من [[/metrics]] فبيوصل لواحدة عشوائية كل مرة والأرقام بتتنطط. الحل: [[PROMETHEUS_MULTIPROC_DIR]] و [[MultiProcessCollector]] (الـ workers بيكتبوا في ملفات وأي واحد يجمعهم)، أو worker واحد لكل container و Prometheus يسحب من كل container. من وثائق prometheus-client، ماتجرّبش هنا.

---

## ٤. live و ready

~~~text الناتج (اتشغّل فعلًا)
E {'status': 'ok'} 200 {'status': 'ready', 'redis': 'ok'}
503 {'status': 'not ready', 'redis': 'TimeoutError'}
~~~

التاني بـ [[REDIS_PORT=6399]] (بورت مفيهوش حاجة). وفي Kubernetes (من الوثائق):

| الـ probe | بيشاور على | لو فشل |
|---|---|---|
| liveness | [[/health/live]] | يعيد تشغيل الـ container |
| readiness | [[/health/ready]] | يشيله من الـ load balancer لحد ما يرجع، من غير restart |
| startup | [[/health/live]] | يستنى التشغيل الأول (migrations مثلًا) قبل ما الـ liveness يبدأ |

وفي Docker Compose: [[healthcheck: test: ["CMD", "curl", "-f", "http://localhost:8000/health/ready"]]] و [[depends_on: condition: service_healthy]].

### مفاجأة: اتصال Redis وقت الـ import

أول نسخة كانت [[redis = aioredis.Redis(...)]] في أول الملف، و [[TestClient(app)]] من غير [[with]]:

~~~text الناتج (اتشغّل فعلًا: أول نسخة)
E {'status': 'ok'} 200 {'status': 'not ready', 'redis': 'RuntimeError'}
~~~

أول [[/health/ready]] رجع 200، والتاني 503 رغم إن Redis شغال. TestClient من غير [[with]] بيعمل event loop جديد لكل طلب، والاتصال كان اتربط بالـ loop الأولاني. في uvicorn مكانتش هتبان (loop واحد)، بس الاختبار كان بيقول «Redis واقع». الحل: الاتصال في الـ lifespan، و [[with TestClient(app)]].

---

## ٥. التكلفة

٢٠٠٠ طلب ورا بعض على [[/health/live]] بـ httpx على uvicorn:

~~~text الناتج (اتشغّل فعلًا: مرتين)
8061 2.543 ms/request
8062 2.218 ms/request
8061 2.365 ms/request
8062 2.232 ms/request
~~~

8061 المثال (middleware ولوج JSON لـ stdout و metrics)، و 8062 نفس الـ route من غير أي حاجة. الفرق ٠.١٣ لـ ٠.٣ ملي ثانية للطلب. لو ده كتير عندك: [[@app.middleware("http")]] (BaseHTTPMiddleware) أبطأ من pure ASGI middleware زي [[BodyLimit]] في درس «رفع ملفات»، واللوج لـ stdout sync.

---

## ٦. OpenTelemetry: tracing

~~~python
from opentelemetry import trace
from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor
from opentelemetry.sdk.resources import Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.sdk.trace.export import ConsoleSpanExporter, SimpleSpanProcessor

provider = TracerProvider(resource=Resource.create({"service.name": "orders-api"}))
provider.add_span_processor(SimpleSpanProcessor(ConsoleSpanExporter()))
trace.set_tracer_provider(provider)
tracer = trace.get_tracer("orders")

@app.get("/orders/{order_id}")
async def get_order(order_id: int):
    with tracer.start_as_current_span("load order from db") as span:
        span.set_attribute("order.id", order_id)
    return {"id": order_id}

FastAPIInstrumentor.instrument_app(app)
~~~

وبعتنا طلب ومعاه [[traceparent]] كأنه جاي من خدمة تانية (الـ console exporter بشكل مختصر):

~~~text الناتج (اتشغّل فعلًا)
load order from db | trace=4bf92f3577b34da6a3ce929d0e0e4736 span=8f7527be6935fb61 parent=16cfebabedf1c09b | 0.0ms {'order.id': 7}
GET /orders/{order_id} | trace=4bf92f3577b34da6a3ce929d0e0e4736 span=16cfebabedf1c09b parent=00f067aa0ba902b7 | 2.5ms {'http.route': '/orders/{order_id}', 'http.status_code': 200, ...}
~~~

- كل الـ spans بنفس [[trace_id]] اللي جه في الـ header ([[4bf92f...]])، فـ Jaeger بيعرضهم مع spans الخدمة اللي بعتت.
- الـ span بتاعنا ([[load order from db]]) أبوه span الطلب ([[16cfeb...]])، وأبو الطلب هو الـ span في الخدمة التانية ([[00f067...]]).
- [[FastAPIInstrumentor]] عمل span الطلب لوحده بالـ route والـ status، ومعاه spans صغيرة لكل [[http send]].

في الإنتاج بدل [[ConsoleSpanExporter]]: [[OTLPSpanExporter]] لـ OpenTelemetry Collector، و [[BatchSpanProcessor]] بدل [[Simple]] (بيبعت على دفعات في الخلفية)، و sampling (مثلًا ١٠٪ من الطلبات). وفيه instrumentors جاهزة لـ httpx و SQLAlchemy و Redis، فالـ query والـ HTTP اللي طالع بيبقوا spans لوحدهم. ده overview: الـ Collector و Jaeger ماتشغّلوش هنا. و [[trace_id]] ينفع يتحط في اللوج كمان (بدل أو مع [[request_id]]).

---

## «توصل للإجابة بنفسك»

~~~bash
python -c "import prometheus_client; help(prometheus_client.Histogram)"
curl -s localhost:8000/metrics | grep -v "^#" | head
opentelemetry-bootstrap -a requirements
~~~

الأولاني بيوريك الـ buckets الافتراضية و [[time()]] كـ decorator. والتاني بيوريك الأرقام من غير الشرح. والتالت (بيجي مع [[opentelemetry-instrumentation]]) بيطبع الـ instrumentors المناسبة للمكتبات المتسطبة عندك. ولو [[/metrics]] بيطلع فاضي من metrics بتاعتك: الـ module اللي فيه [[Counter]] متعملوش import، أو الـ labels لسه متنادتش ولا مرة.

---

## الخلاصة

| الحاجة | الصح | الغلط |
|---|---|---|
| اللوج | JSON سطر واحد على stdout، و [[request_id]] من ContextVar | [[print]]، ونص حر، والـ id بيتبعت بإيدك |
| [[X-Request-ID]] | من الـ header بعد regex، أو جديد، وبيرجع في كل رد حتى 500 | من الـ header زي ما هو، أو مش في الـ 500 |
| label الـ route | [[scope["route"].path]] | [[request.url.path]] (مليون سلسلة) |
| [[/metrics]] | مش بيعدّ نفسه، ومقفول على الشبكة الداخلية | مفتوح للنت |
| live | 200 دايمًا | بيشيّك Redis (restart للكل لما Redis يقع) |
| ready | بيشيّك الـ dependencies بـ timeout قصير، و 503 | مفيش timeout، أو 200 دايمًا |
| أكتر من worker | multiprocess mode أو worker لكل container | counters كل عملية لوحدها |
| traces | OpenTelemetry و [[traceparent]] | timestamps في اللوج وتجميعها بإيدك |`,
          try: R`سطّب [[pip install fastapi uvicorn prometheus-client redis]]، وشغّل Redis ([[docker run --rm -p 6390:6379 redis:7-alpine]])، والمثال بـ [[uvicorn main:app --no-access-log]]. ابعت [[curl -i localhost:8000/orders/7]] و [[curl -i -H "X-Request-ID: test-1" localhost:8000/orders/13]] و [[curl localhost:8000/nope]]، وشوف اللوج في ترمنال uvicorn. وبعدين [[curl localhost:8000/metrics | grep http_]]. وفي الآخر وقّف Redis وجرّب [[curl -i localhost:8000/health/ready]] و [[/health/live]].`,
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** بعد ٣ طلبات على [[/orders/1]] و [[/orders/2]] و [[/orders/13]]، وطلب على [[/nope]]، وطلبين على [[/metrics]]: اكتب قيمة كل سلسلة [[http_requests_total]] هتطلع، وقيمة [[http_request_duration_seconds_count]] لـ [[/orders/{order_id}]]. وبعدين اتأكد.`, done: R`طابقت: [[status="200"]] = 2 و [[status="500"]] = 1 للـ orders، و [[unmatched]] 404 = 1، ومفيش سلسلة لـ [[/metrics]]، و [[_count]] = 3. ولو توقعت ٣ سلاسل للـ orders بدل ٢ (واحدة لكل id)، عرفت ليه الـ route template بيجمعهم.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** شغّل المثال ٥ دقايق وسكربت بيبعت طلبات عشوائية (٩٠٪ أوردرات عادية، و ٥٪ أوردر ١٣، و ٥٪ مسارات غلط)، ووجّه اللوج لملف [[uvicorn main:app > app.log]]. اكتب [[summarize.py]] بيقرا الملف سطر سطر بـ [[json.loads]]، ويطلع: عدد الطلبات لكل status، و p50 و p95 للـ [[ms]]، وكل [[request_id]] فيه ERROR ومعاه آخر سطر في الـ traceback.`, done: R`السكربت بيطبع ٣ أقسام، ونسبة الـ 500 قريبة من ٥٪، وكل request id في قسم الأخطاء موجود في سطر [[request done]] بـ [[status: 500]]، وبيتجاهل السطور اللي مش JSON (لوج uvicorn لو موجود) من غير ما يقع.` },
            { lvl: 'تطبيق', t: R`**ابني حاجة:** زوّد على المثال: [[Gauge]] اسمه [[http_requests_in_progress]] بيزيد أول الطلب ويقل في [[finally]]، و [[/health/ready]] بيشيّك القاعدة كمان (أو sqlite بـ [[SELECT 1]] في thread)، ويرجّع وقت كل check بالملي ثانية، ويقطع أي check بعد ثانية بـ [[asyncio.wait_for]].`, done: R`١٠ طلبات بطيئة مع بعض ([[asyncio.sleep(2)]] في route تجربة) بتخلي [[http_requests_in_progress]] = 10 وبعدها 0. والـ ready بيرجع [[{"redis": {"ok": true, "ms": ...}, "db": {...}}]]، ولو خليت الـ check ينام ٥ ثواني الرد بيرجع 503 بعد ثانية واحدة بالظبط تقريبًا.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** [[test_observability.py]]: الـ request id اللي بتبعته بيرجع، والـ id البايظ (فيه مسافة أو ١٠٠ حرف) بيتبدل بواحد ١٢ حرف hex، والـ 500 فيه الـ id في الـ header والـ body، و [[/metrics]] بعد طلبين على [[/orders/5]] و [[/orders/6]] فيه سلسلة واحدة قيمتها 2، والـ ready بـ [[REDIS_PORT=6399]] بيرجع 503. واستخدم [[caplog]] عشان تتأكد إن سطر الـ ERROR فيه نفس الـ id.`, done: R`٥ اختبارات خضرا، ولما ترجّع [[raise]] في الـ except اختبار الـ 500 بيفشل، ولما تبدّل [[scope["route"].path]] بـ [[request.url.path]] اختبار الـ metrics بيلاقي سلسلتين بدل واحدة.` },
          ],
          deep: {
            why: R`على جهازك بتشوف الـ traceback في الترمنال. في الإنتاج فيه ٤ نسخ من السيرفر، وآلاف الطلبات في الدقيقة، واليوزر بيقولك «مش شغال» من غير تفاصيل. من غير لوج بـ id مشترك مش هتلاقي الطلب بتاعه، ومن غير metrics مش هتعرف إن الـ 500 بدأت من آخر deploy، ومن غير readiness الـ load balancer هيفضل يبعت لنسخة مش قادرة توصل للقاعدة.`,
            how: R`**[[ContextVar]]:** كل async task ليها نسخة من الـ context. uvicorn بيشغّل كل طلب في task، فـ [[request_id.set]] في الـ middleware بيبان لكل كود في نفس الطلب (حتى [[def]] endpoints، لأن [[run_in_threadpool]] بينسخ الـ context للـ thread)، ومبيبانش في طلب تاني.

**prometheus_client:** الـ metrics في ذاكرة العملية. [[labels()]] بيرجّع child لكل تركيبة، و [[inc]] و [[observe]] thread-safe. والـ histogram بيخزّن عدّاد لكل bucket مش كل القيم، فالذاكرة ثابتة مهما كانت الطلبات، والتمن إن p95 تقريبي (بيتحسب بالتقريب جوه الـ bucket). و Prometheus هو اللي بيسحب (pull) كل [[scrape_interval]]، ولو العملية قصيرة (cron job) فيه [[Pushgateway]].

**الـ cardinality:** كل تركيبة labels = سلسلة زمنية لوحدها في Prometheus. ٣ methods × ٥٠ route × ١٠ status = ١٥٠٠ سلسلة، تمام. لو حطيت [[user_id]] أو المسار الخام، بقوا ملايين والـ Prometheus بيقع. القاعدة: labels قيمها محدودة ومعروفة.

**traceparent (W3C):** [[00-<trace_id 32 hex>-<parent span 16 hex>-<flags>]]. أي خدمة بتستقبله بتعمل spans تحت نفس الـ trace، وبتبعته في أي طلب طالع (الـ instrumentor بتاع httpx بيعمله لوحده).

**live مقابل ready:** live = «اقتلني وشغّلني تاني لو مش برد»، ready = «متبعتليش دلوقتي». الـ live اللي بيشيّك dependencies بيعمل restart loop لكل النسخ لما dependency واحدة تقع.`,
            when: R`أي API هيتنشر لناس. أقل حاجة من أول يوم: لوج JSON بـ request id، و health و ready. وأول ما يبقى فيه أكتر من نسخة أو ترافيك حقيقي: metrics وتنبيهات (5xx أكتر من ١٪، و p95 أكتر من ثانية). و traces لما يبقى عندك أكتر من خدمة بيكلموا بعض، أو طلب بطيء ومش عارف الوقت بيروح فين. ولو بتستخدم منصة جاهزة (Sentry للأخطاء، أو Datadog أو Grafana Cloud)، الأفكار نفسها والـ SDK بيعمل أغلب الشغل.`,
            mistakes: R`[[print]] بدل [[logging]]. ولوج نص حر مينفعش يتفلتر. و [[X-Request-ID]] من الـ client من غير فحص (log injection). و 500 من غير request id (اتجرّب: [[raise]] جوه الـ middleware بيطلّع رد من غير الـ header). و [[request.url.path]] كـ label (cardinality). و [[user_id]] أو [[email]] كـ label. و [[/metrics]] مفتوح للنت. و live بيشيّك القاعدة. و ready من غير timeout (الـ probe بيستنى دقيقة). واتصال Redis وقت الـ import (اتجرّب: 503 كداب في TestClient). و counters مع [[--workers]] من غير multiprocess mode. وتسجيل الباسوردات أو التوكنات في اللوج (لوج الـ headers كلها أو الـ body). و [[log.error(str(e))]] بدل [[log.exception]] (الـ traceback بيضيع).`
          },
          sol: R`اللوج في ترمنال uvicorn: سطرين JSON لكل طلب ([[loading order]] و [[request done]]) بنفس الـ [[request_id]]. و [[/orders/13]] بـ [[X-Request-ID: test-1]]: الرد [[HTTP/1.1 500 Internal Server Error]] و [[x-request-id: test-1]] و [[{"detail":"internal error","request_id":"test-1"}]]، واللوج فيه [["level": "ERROR"]] و [["request_id": "test-1"]] و [["exc": "Traceback ... RuntimeError: db row is corrupted"]]. و [[/nope]]: 404 وسطر لوج بـ [["route": "unmatched"]].

و [[/metrics | grep http_]] بيطلّع [[http_requests_total{method="GET",route="/orders/{order_id}",status="200"} 1.0]] و [[status="500"]] و [[route="unmatched"]] والـ buckets. ولما توقف Redis: [[/health/ready]] بيرجع [[HTTP/1.1 503 Service Unavailable]] و [[{"status":"not ready","redis":"ConnectionError"}]] أو [[TimeoutError]] حسب النظام (عندنا على ويندوز مع بورت فاضي طلعت [[TimeoutError]])، و [[/health/live]] لسه [[200]] و [[{"status":"ok"}]].`,
          solCode: R`curl -i localhost:8000/orders/7
curl -i -H "X-Request-ID: test-1" localhost:8000/orders/13
curl -s localhost:8000/metrics | grep http_
docker stop lab-redis
curl -i localhost:8000/health/ready
curl -i localhost:8000/health/live`
        },
      ],
    }
]);

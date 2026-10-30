// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "الأداء والإنتاج",
      l: 3,
      time: R`حوالي ٥ ساعات (ساعة ونص لكل درس، والباقي للمشاريع)`,
      goal: [
        R`تختار عدد الـ workers بالقياس مش بالتخمين، وتبعت الحسبة التقيلة لـ process تانية من غير ما الـ event loop يقف.`,
        R`تشغّل FastAPI ورا gunicorn بـ [[uvicorn-worker]] لما محتاج إعادة تشغيل للـ worker المعلّق، وتعرف إمتى uvicorn لوحده كفاية.`,
        R`تطلّع لوج JSON سطر لكل حدث، وتلاقي الدالة اللي واكلة الوقت بـ [[cProfile]] و [[py-spy]]، وتثبت التحسين برقم قبل وبعد.`,
        R`تبني image لـ FastAPI صغيرة وآمنة (يوزر مش root، و CMD بشكل exec)، وفيها health check و readiness، وبتقفل بنضافة مع [[docker stop]].`,
      ],
      use: {
        prog: R`الكود اللي شغال على جهازك محتاج ٣ حاجات عشان يعيش في الإنتاج: عدد processes صح، ولوج تقدر تدوّر فيه، و container بيقوم ويقفل صح. الوحدة دي هي التلاتة.`,
        work: R`أسئلة كل يوم في الشغل: «ليه الـ API بطيء؟» (قيس)، «ليه الـ deploy بياخد ١٠ ثواني ويقطع طلبات؟» (CMD بشكل shell)، «ليه الـ container مكتوب healthy والقاعدة واقعة؟» (liveness مش readiness).`,
        cs: R`الـ GIL و processes مقابل threads، والـ sampling profilers، والـ signals (SIGTERM و SIGKILL) و PID 1 في الـ containers، والـ pre-fork model بتاع gunicorn.`,
      },
      lab: R`python -m venv .venv && source .venv/bin/activate   # ويندوز: .\.venv\Scripts\Activate.ps1
pip install "fastapi[standard]" py-spy
docker pull python:3.13-slim`,
      projects: [
        { lvl: 'صغير', t: R`مين رد عليا؟`, what: R`endpoint بيرجّع [[os.getpid()]]، وشغّله بـ [[fastapi run --workers 4]]، وسكربت بيبعت ٢٠ طلب ويعدّ الطلبات لكل PID. من درس «workers و GIL».`, done: R`السكربت بيطبع جدول فيه ٢ أو أكتر من الـ PIDs وعدد الطلبات لكل واحد، والمجموع ٢٠، وكاتب ليه التوزيع مش متساوي بالظبط.` },
        { lvl: 'صغير', t: R`لوج JSON لمشروعك`, what: R`حط [[JsonFormatter]] في أي مشروع FastAPI عندك، وخلّي كل route يسجّل سطر فيه المسار والوقت بالملّي ثانية. من درس «logging و profiling».`, done: R`كل سطر في الـ stdout بيتقري بـ [[json.loads]] من غير error (اتأكد بسكربت بيقرا اللوج)، والـ traceback جوه مفتاح [[exc]] في نفس السطر.` },
        { lvl: 'متوسط', t: R`صيّاد البطء`, what: R`خد سكربت تقرير عندك (أو اكتب واحد بـ ٢٠٠ ألف صف)، وشغّله بـ [[cProfile]]، وحسّن أبطأ دالة، وقيس قبل وبعد. من درس «logging و profiling».`, done: R`عندك جدول فيه الوقت قبل وبعد (٣ مرات لكل واحد)، والناتج نفسه مطابق قبل وبعد (assert)، وملف SVG من [[py-spy record]] قبل التحسين.` },
        { lvl: 'متوسط', t: R`image بتقفل صح`, what: R`Dockerfile لتطبيق FastAPI بيوزر مش root و [[HEALTHCHECK]] و CMD بشكل exec، ونسخة تانية بشكل shell للمقارنة. من درس «FastAPI في Docker».`, done: R`[[docker stop]] على النسخة الصح أقل من ٣ ثواني ولوج الـ shutdown ظاهر، وعلى نسخة الـ shell حوالي ١٠ ثواني ومفيش لوج shutdown، و [[docker ps]] بيقول [[(healthy)]] و [[docker exec ... id]] مش root.` },
        { lvl: 'كبير', t: R`API تقارير جاهز للإنتاج`, what: R`FastAPI فيه [[/report]] بيحسب تقرير تقيل في [[ProcessPoolExecutor]] من الـ lifespan، و [[/health]] و [[/ready]] (بيفحص Redis)، ولوج JSON، و Dockerfile، و [[compose.yaml]] فيه الـ API و Redis، والـ API بيستنى Redis يبقى healthy. من الوحدة دي ووحدة httpx و Redis.`, done: R`[[docker compose up]] بيقوم والـ API [[healthy]]، و [[/health]] بيرد في أقل من ٢٠ ملّي ثانية **وهو** [[/report]] شغال، و [[/ready]] بيرجّع 503 لما توقّف Redis و 200 لما يرجع، و [[docker compose down]] بيقفل في أقل من ٥ ثواني، وفيه اختبار بـ TestClient لـ [[/ready]] بـ [[dependency_overrides]] أو client مزيّف.`, ext: R`زوّد [[--workers]] بقيمة من env، و metrics بعدد الطلبات ووقتها (درس الـ observability في التاب)، وشغّله ورا Nginx.` },
        { lvl: 'فكرة', t: R`لوحة صحة لخدماتك`, what: R`خدمة صغيرة بتنادي [[/ready]] بتاع كل خدمة عندك كل ١٠ ثواني بـ httpx (client واحد و timeout قصير)، وبتحفظ آخر ١٠٠ نتيجة، وبتعرض صفحة فيها كل خدمة ولونها ووقت ردها. انت اللي بتختار الخدمات والحدود.`, done: R`الخدمة الواقعة بتبان حمرا في أقل من ٣٠ ثانية، والبطيئة (أكتر من ثانية) صفرا، والصفحة نفسها بتفضل ترد لو كل الخدمات واقعة، وفيه لوج JSON لكل تغيير في الحالة.`, ext: R`إشعار (webhook أو إيميل) لما خدمة تفضل حمرا دقيقتين، وتاريخ يومي لنسبة الـ uptime.` },
      ],
      n: "workers والـ GIL والحسابات التقيلة، و logging منظم، وتقيس قبل ما تحسّن، و FastAPI في Docker",
      items: [
        {
          cmd: "workers و GIL",
          title: "كام worker، وليه Python مبيستخدمش كل الـ cores في process واحد",
          desc: R`الـ GIL قفل في CPython بيخلي thread واحد بس ينفّذ كود Python في نفس اللحظة جوه الـ process. للـ I/O مش مشكلة (async أو threads بيسيبوه وهم مستنيين)، بس الحسابات التقيلة مبتستفيدش من cores زيادة جوه process واحد.

عشان كده في الإنتاج بتشغّل كذا process: [[fastapi run --workers 4]] (أو [[uvicorn --workers]]، أو كذا container). والحسبة التقيلة جوه request: [[ProcessPoolExecutor]] أو worker منفصل.`,
          example: R`import asyncio
import os
from concurrent.futures import ProcessPoolExecutor
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
def heavy_report(n: int) -> int:
    return sum(i * i for i in range(n))
@asynccontextmanager
async def lifespan(app: FastAPI):
    with ProcessPoolExecutor(max_workers=2) as pool:
        app.state.cpu = pool
        yield
app = FastAPI(lifespan=lifespan)
@app.get("/report")
async def report(request: Request, n: int = 10_000_000):
    loop = asyncio.get_running_loop()
    result = await loop.run_in_executor(request.app.state.cpu, heavy_report, n)
    return {"result": result, "pid": os.getpid()}
# في الترمنال:
# fastapi run app/main.py --workers 4
# python3.14t -c "import sys; print(sys._is_gil_enabled())"`,
          try: R`نادي [[heavy_report(n)]] مباشرة جوه الـ route من غير الـ executor، وافتح أي endpoint تاني في نفس الوقت: هيستنى. وبعدين بالـ executor. وجرّب [[--workers 1]] و [[--workers 4]] مع أداة زي [[hey]] أو [[wrk]]، وقارن الـ requests/sec.`,
          flag: "script",
          deep: {
            why: "API بيعمل حسبة تقيلة (تقرير، resize، تشفير) على سيرفر ٤ cores بـ worker واحد: core واحد ١٠٠٪ والتلاتة فاضيين، وكل الطلبات مستنية. وسؤال الـ GIL من أشهر أسئلة انترفيو Python.",
            how: R`الـ GIL (Global Interpreter Lock) بيحمي الـ reference counting وبيانات الـ interpreter من إن threads تبوّظها. والـ threads بتسيبه وهي مستنية I/O أو وهي جوه مكتبات C زي numpy و hashlib، فشغل الـ I/O ماشي كويس بالـ threads أو الـ async.

كل worker process لوحده: interpreter وذاكرة و GIL خاصين بيه، وكلهم بيسمعوا على نفس البورت. ونقطة بداية: عدد الـ cores، وبعدين قيس. وكل worker ليه الـ pool بتاعه، فاتصالات القاعدة بتتضرب في عدد الـ workers. وفي Kubernetes الأشهر worker واحد لكل container وتكبّر بعدد الـ pods (تاب «Cloud و DevOps»).

[[ProcessPoolExecutor]] بيشغّل الدالة في process تانية: الـ arguments والناتج بيتعملهم pickle ويتنقلوا، فالدالة لازم تبقى على مستوى الـ module، والداتا متبقاش ضخمة.

Python 3.13 جاب نسخة free-threaded تجريبية ([[python3.13t]])، و 3.14 بقت مدعومة رسميًا (PEP 779)، بس لسه build منفصل مش الافتراضي، ومش كل المكتبات جاهزة ليها. و 3.14 كمان فيها [[concurrent.interpreters]]: كذا interpreter في process واحد، كل واحد بـ GIL خاص بيه. الاتنين اتجاه المستقبل، بس الإنتاج النهارده لسه workers و processes.`,
            when: "workers = عدد الـ cores كبداية على VM. حسبة CPU أقل من ثانية ونادرة: ProcessPool. أكتر أو كتير: queue و workers منفصلين. والأهم: قيس الأول (الدرس الجاي).",
            mistakes: R`[[--workers 16]] على سيرفر ٢ cores (تبديل كتير وذاكرة ×16). و [[--reload]] مع [[--workers]]. وتفتكر إن الـ threads في Python بتسرّع الحسابات. وحالة في الذاكرة (dict للـ sessions أو الـ rate limit) مع كذا worker: كل واحد شايف نسخة مختلفة، فالحالة المشتركة مكانها Redis.`
          },
          teach: R`## المثال بيعمل إيه؟

تطبيق FastAPI فيه route واحد [[/report]] بيعمل حسبة CPU تقيلة (مجموع مربعات ١٠ مليون رقم). الحسبة مش بتتعمل جوه الـ route نفسه، بتتبعت لـ **process تانية** من pool جاهز، عشان الـ event loop يفضل فاضي يرد على باقي الطلبات. وفي الآخر بنشغّل التطبيق بـ ٤ workers، يعني ٤ نسخ منه في ٤ processes. اتجرب على ويندوز (Python 3.14 و FastAPI 0.142 في venv)، والمقارنة بين worker و ٤ workers على لينكس في [[docker run --rm --cpus 4 python:3.13-slim]].

قبل الكود، ٣ كلمات:

| الكلمة | يعني |
|---|---|
| process | برنامج شغال ليه ذاكرته لوحده. ليه رقم اسمه PID (Process ID) |
| thread | خيط تنفيذ جوه process، والـ threads اللي في نفس الـ process بيشاركوا نفس الذاكرة |
| GIL | Global Interpreter Lock: قفل جوه CPython، الـ thread اللي ماسكه بس هو اللي ينفّذ كود Python |

فـ ٤ threads في process واحد بيعملوا حسبة Python: واحد بس شغال في كل لحظة. لكن ٤ processes: كل واحدة ليها GIL بتاعها، فالـ ٤ يشتغلوا على ٤ cores مع بعض.

---

## ١. الـ imports

~~~python
import asyncio
import os
from concurrent.futures import ProcessPoolExecutor
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
~~~

- [[asyncio]]: عشان نوصل للـ event loop الحالي.
- [[os]]: عشان [[os.getpid()]] اللي بترجع رقم الـ process اللي رد، فنعرف أنهي worker خدم الطلب.
- [[ProcessPoolExecutor]] من [[concurrent.futures]]: «pool» (مجموعة) processes جاهزة، تبعتلها دالة وتاخد ناتجها.
- [[asynccontextmanager]]: بيحوّل دالة async فيها [[yield]] لـ context manager، وده شكل الـ lifespan في FastAPI.
- [[Request]]: الطلب نفسه، ومنه نوصل للتطبيق ([[request.app]]).

---

## ٢. الحسبة التقيلة: [[heavy_report]]

~~~python
def heavy_report(n: int) -> int:
    return sum(i * i for i in range(n))
~~~

[[range(n)]] بيدّي الأرقام من 0 لـ n-1، و [[i * i for i in ...]] generator بيطلّع مربع كل رقم، و [[sum]] بيجمعهم. كل ده كود Python خالص، مفيش فيه أي انتظار (I/O)، يعني CPU ١٠٠٪ لحد ما يخلص، وطول ما هو شغال ماسك الـ GIL.

ليه [[def]] عادية مش [[async def]]؟ لأنها هتتنادى في process تانية، ومفيهاش حاجة تستناها أصلًا. وليه على مستوى الـ module (مش جوه دالة تانية)؟ لأن الـ process التانية بتستلم اسم الدالة بـ **pickle** (طريقة Python تحوّل object لـ bytes يتبعتوا)، وبتدوّر عليها بالاسم في الـ module بتاعها. دالة جوه دالة أو lambda مش هتتلاقي.

~~~text الناتج: heavy_report(10_000_000)
333333283333335000000
~~~

الحسبة دي أخدت حوالي ثانية على الجهاز اللي جربنا عليه.

---

## ٣. الـ pool بيتعمل مرة مع التطبيق: [[lifespan]]

~~~python
@asynccontextmanager
async def lifespan(app: FastAPI):
    with ProcessPoolExecutor(max_workers=2) as pool:
        app.state.cpu = pool
        yield
app = FastAPI(lifespan=lifespan)
~~~

- [[lifespan]] دالة FastAPI بيناديها مرة لما التطبيق يقوم: اللي **قبل** [[yield]] بيتنفّذ وقت التشغيل، واللي **بعده** وقت الإيقاف.
- [[ProcessPoolExecutor(max_workers=2)]]: pool فيه لحد ٢ processes. يعني في نفس اللحظة حسبتين بس بالكتير لكل worker، والباقي بيستنى دوره.
- [[with ... as pool]]: لما الـ [[with]] يخلص (التطبيق بيقفل)، الـ pool بيتقفل ويستنى الـ processes بتاعته تخلص. فمفيش processes يتيمة.
- [[app.state.cpu = pool]]: [[app.state]] مكان تحط فيه أي حاجة تخص التطبيق كله. سمّيناها [[cpu]]، والاسم انت اللي بتختاره.
- [[yield]]: هنا التطبيق بيشتغل ويستقبل طلبات، والـ [[with]] لسه مفتوح.
- [[FastAPI(lifespan=lifespan)]]: بنقول لـ FastAPI يستخدم الدالة دي.

ليه مش نعمل pool جديد مع كل طلب؟ لأن تشغيل process جديدة غالي (على ويندوز بيتعمل **spawn**: Python جديد بيقوم ويعمل import للـ module من الأول). مرة واحدة وتعيش طول عمر التطبيق.

---

## ٤. الـ route: [[run_in_executor]]

~~~python
@app.get("/report")
async def report(request: Request, n: int = 10_000_000):
    loop = asyncio.get_running_loop()
    result = await loop.run_in_executor(request.app.state.cpu, heavy_report, n)
    return {"result": result, "pid": os.getpid()}
~~~

- [[@app.get("/report")]]: الدالة دي بترد على [[GET /report]].
- [[n: int = 10_000_000]]: query parameter اختياري ([[?n=1000]])، والـ [[_]] جوه الرقم بس للقراية: [[10_000_000]] هي ١٠ مليون.
- [[asyncio.get_running_loop()]]: الـ event loop اللي FastAPI شغال عليه دلوقتي.
- [[loop.run_in_executor(pool, fn, arg)]]: «شغّل [[fn(arg)]] في الـ pool ده، وادّيني حاجة أعملها [[await]]». لاحظ إننا بنبعت [[heavy_report]] **من غير أقواس**، يعني الدالة نفسها مش ناتجها، و [[n]] لوحده بعدها.
- [[await]]: الـ route بيقف هنا ويسيب الـ loop يخدم طلبات تانية لحد ما الـ process التانية ترجع الناتج.
- [[request.app.state.cpu]]: نفس الـ pool اللي حطيناه في الـ lifespan.

~~~text الناتج: curl.exe -s "http://127.0.0.1:5875/report"
{"result":333333283333335000000,"pid":36416}
~~~

---

## ٥. التشغيل بـ ٤ workers

~~~powershell
fastapi run app/main.py --workers 4
~~~

[[fastapi run]] وضع الإنتاج (من غير reload)، و [[--workers 4]] معناها: process أب بيشغّل ٤ processes تانيين، كل واحدة فيها نسخة كاملة من التطبيق (والـ lifespan بيتنادى ٤ مرات، يعني ٤ pools). جربناه على ويندوز ببورت [[--port 5875]]:

~~~text الناتج (مختصر)
INFO:     Uvicorn running on http://0.0.0.0:5875 (Press CTRL+C to quit)
INFO:     Started parent process [17844]
INFO:     Started server process [44164]
INFO:     Started server process [14780]
INFO:     Started server process [36416]
INFO:     Started server process [34448]
~~~

الأب ([[17844]]) مبيردش على طلبات، شغله يراقب الـ ٤ ويشغّل بداله لو واحد وقع. وبعتنا ٦ طلبات صغيرة ([[?n=1000]]):

~~~text الناتج
{"result":332833500,"pid":36416}
{"result":332833500,"pid":34448}
{"result":332833500,"pid":14780}
{"result":332833500,"pid":44164}
{"result":332833500,"pid":36416}
{"result":332833500,"pid":44164}
~~~

٤ PIDs مختلفة: كل طلب راح لـ worker، وكلهم بيسمعوا على نفس البورت. و [[--workers]] مينفعش مع [[--reload]]: [[fastapi run --help]] بيقول عليهم «Mutually exclusive».

---

## ٦. التجربة: من غير executor الـ API كله بيقف

حطينا route تاني [[/blocking]] بينادي [[heavy_report(n)]] مباشرة جوه [[async def]]، و [[/health]] بيرجّع [[{"ok": true}]] بس، وشغلنا worker واحد. وسكربت بيبعت الطلب التقيل، وبعد 0.1 ثانية يقيس [[/health]] بياخد قد إيه (ويندوز، Python 3.14):

~~~text الناتج
/health alone: 2ms
/blocking: total 0.87s, /health during it 767ms
/report: total 0.81s, /health during it 2ms
~~~

- **[[/blocking]]**: الحسبة ماسكة الـ event loop، و [[/health]] (اللي مفيهاش أي شغل) استنت 767ms لحد ما الحسبة خلصت. على سيرفر حقيقي ده معناه إن **كل** المستخدمين مستنيين.
- **[[/report]]**: الحسبة في process تانية، والـ loop فاضي، فـ [[/health]] ردت في 2ms زي ما هي لوحدها.

---

## ٧. worker واحد مقابل ٤

على لينكس في container محدود بـ ٤ cores ([[--cpus 4]])، ٨ «مستخدمين» كل واحد بيبعت ٦ طلبات ورا بعض ([[?n=3000000]]):

~~~text الناتج
nproc=16
workers=1
/blocking: 48 requests (8 at a time) in 9.21s = 5.2 req/s, worker PIDs: 1
/report: 48 requests (8 at a time) in 5.83s = 8.2 req/s, worker PIDs: 1
workers=4
/blocking: 48 requests (8 at a time) in 3.31s = 14.5 req/s, worker PIDs: 4
/report: 48 requests (8 at a time) in 6.05s = 7.9 req/s, worker PIDs: 2
~~~

نقرا الأرقام:

- [[nproc=16]] مع إن الـ container مسموحله ٤ cores بس: [[nproc]] بيعد cores الجهاز مش الحد اللي اتحط على الـ container. فلو حسبت الـ workers من [[nproc]] جوه container ممكن تزوّد.
- **[[/blocking]]**: من 5.2 لـ 14.5 req/s، تقريبًا ٣ أضعاف، والـ ٤ PIDs اشتغلوا. ده بالظبط اللي الـ workers معمولين له: كل worker ماسك core.
- **[[/report]]** مع ٤ workers متحسّنش (8.2 → 7.9)، وطلباته راحت لـ ٢ workers بس. ليه؟ الـ worker اللي الـ loop بتاعه فاضي بيلحق يقبل الاتصالات الجديدة قبل التانيين، فالطلبات اتجمعت عند worker أو اتنين، وكل واحد عنده pool من ٢ processes بس. يعني التوازي الحقيقي = الـ workers اللي جالهم شغل × [[max_workers]]، مش الـ workers × [[max_workers]] على الورق.

الأرقام عندك هتختلف، والدرس: **قيس على الحمل بتاعك** قبل ما تقرر العدد.

---

## ٨. Python من غير GIL: [[python3.14t]]

~~~text
python3.14t -c "import sys; print(sys._is_gil_enabled())"
~~~

[[3.14t]]: الـ [[t]] من free-**t**hreaded، build تاني لـ Python الـ GIL فيه مقفول. و [[-c]] بيشغّل السطر اللي بعده. و [[sys._is_gil_enabled()]] بترجع الـ GIL شغال ولا لأ (الـ [[_]] في أولها معناها إنها مش API ثابت). على ويندوز:

~~~text الناتج
python3.14t                 →  False
python (3.14 العادي)        →  True
python3.14t -X gil=1        →  True
~~~

السطر الأخير: [[-X gil=1]] بيرجّع الـ GIL حتى في الـ build الحر. وحسب الـ docs الرسمية، لو عملت import لمكتبة C مش معلنة إنها آمنة من غير GIL، Python بيشغّله تاني لوحده وبيطبع [[RuntimeWarning]]. عشان كده الإنتاج النهارده لسه workers.

---

## ٩. gunicorn قدام uvicorn: إمتى وإزاي

[[fastapi run --workers]] و [[uvicorn --workers]] بيعملوا process أب بيشغّل الـ workers ويرجّع أي واحد يقع. gunicorn بيضيف حاجة مهمة: **بيقتل الـ worker المعلّق**. اتشغّل فعلًا في [[python:3.13-slim]] (gunicorn 26.2.0 و uvicorn 0.54.0 و uvicorn-worker 0.4.0)، على تطبيق فيه route [[/stuck]] بيعمل [[time.sleep(40)]] جوه [[async def]] (الغلطة اللي بتقفل الـ loop):

~~~bash
pip install gunicorn uvicorn-worker
gunicorn main:app -k uvicorn_worker.UvicornWorker -w 2 -b 0.0.0.0:8000 --timeout 10 --graceful-timeout 5
~~~

| الجزء | معناه |
|---|---|
| [[main:app]] | الموديول [[main.py]] والمتغير [[app]] جواه |
| [[-k uvicorn_worker.UvicornWorker]] | نوع الـ worker: uvicorn جوه gunicorn عشان يفهم ASGI (gunicorn لوحده WSGI بس) |
| [[-w 2]] | عدد الـ workers، نفس فكرة [[--workers]] |
| [[-b 0.0.0.0:8000]] | العنوان والبورت (bind). [[0.0.0.0]] عشان يتوصل من برّه الـ container |
| [[--timeout 10]] | لو worker مبعتش «أنا عايش» للأب ١٠ ثواني، الأب يقتله ويشغّل بداله |
| [[--graceful-timeout 5]] | لما بيقفل، يدّي الـ worker ٥ ثواني يخلّص طلباته قبل ما يقتله |

~~~text الناتج (مختصر)
[14] [INFO] Using worker: uvicorn_worker.UvicornWorker
[16] [INFO] Booting worker with pid: 16
[17] [INFO] Booting worker with pid: 17
[14] [CRITICAL] WORKER TIMEOUT (pid:17)
[14] [WARNING] Worker (pid:17) was sent SIGABRT!
[24] [INFO] Booting worker with pid: 24
~~~

العميل اللي طلب [[/stuck]] خد [[RemoteDisconnected]] بعد ٨ ثواني، والـ worker المعلّق اتقتل واتعمل بداله [[24]] لوحده. من غير gunicorn، الـ worker ده كان هيفضل واقف ٤٠ ثانية وكل الطلبات اللي جاتله معاه. (الـ worker بيبعت «أنا عايش» من الـ event loop نفسه، فلما الـ loop يتقفل، النبض بيقف، وده اللي gunicorn بيلقطه.)

> **اتغيّر:** الطريقة القديمة [[-k uvicorn.workers.UvicornWorker]] لسه بتشتغل في uvicorn 0.54، بس [[import uvicorn.workers]] بيطبع: [[DeprecationWarning: The $__bt uvicorn.workers$__bt module is deprecated. Please use $__bt uvicorn-worker$__bt package instead.]] فالجديد [[pip install uvicorn-worker]] و [[-k uvicorn_worker.UvicornWorker]] (بـ underscore).

| | [[fastapi run --workers]] / [[uvicorn --workers]] | gunicorn + [[uvicorn-worker]] |
|---|---|---|
| بيشغّل كذا worker | آه | آه |
| بيرجّع worker وقع | آه | آه |
| بيقتل worker معلّق ([[--timeout]]) | لأ | آه |
| [[--max-requests]] (إعادة تشغيل كل N طلب ضد تسريب الذاكرة) | لأ | آه |
| على ويندوز | آه | لأ (gunicorn لينكس وماك بس) |
| في Kubernetes بـ worker واحد لكل pod | الأبسط | مش لازم غالبًا: الـ orchestrator هو اللي بيرجّع الـ pod |

---

## الخلاصة

| الحالة | الحل |
|---|---|
| طلبات كتير بتستنى I/O (قاعدة، API تاني) | [[async def]] و [[await]]، worker واحد بيشيل كتير |
| حسبة CPU جوه request | [[run_in_executor]] على [[ProcessPoolExecutor]] متعمل في الـ lifespan |
| السيرفر فيه كذا core | [[--workers]] ≈ عدد الـ cores، وقيس |
| حالة مشتركة بين الـ workers | برّه الـ process: Redis أو القاعدة |

- الـ GIL بيمنع threads **process واحدة** تحسب Python مع بعض، مش processes مختلفة.
- كل worker نسخة كاملة: ذاكرته، والـ lifespan بتاعه، والـ pool بتاعه، واتصالات القاعدة بتاعته.
- [[nproc]] جوه container ممكن يكدب عليك.`,
          lines: [
            R`[[asyncio]] عشان [[get_running_loop()]]: محتاجين الـ event loop الحالي عشان نسلّمه شغل يتعمل في مكان تاني ونعمل [[await]] على نتيجته.`,
            R`[[os]] عشان [[os.getpid()]] اللي بترجّع رقم الـ process. في الرد بيوريك أنهي worker خدم الطلب، فتشوف الـ workers بعينك.`,
            R`[[ProcessPoolExecutor]]: مجموعة processes جاهزة تبعتلها دالة وتاخد ناتجها. كل process ليها interpreter و GIL لوحدها، فالحسبة مش بتنافس الـ event loop على الـ GIL.`,
            R`[[asynccontextmanager]] عشان الـ lifespan: الـ pool يتعمل مرة مع التطبيق ويتقفل معاه، مش مع كل طلب (تشغيل process على ويندوز غالي: spawn بيعيد import للملف).`,
            R`[[Request]] عشان الـ route يوصل لـ [[request.app.state.cpu]] اللي فيه الـ pool.`,
            R`حسبة CPU خالصة من غير أي انتظار. على مستوى الـ module (مش جوه دالة تانية ولا lambda)، لأن الـ process التانية بتلاقيها بالاسم بعد pickle، والدالة الداخلية بترمي [[PicklingError]].`,
            R`مجموع مربعات ١٠ مليون رقم بكود Python، حوالي ثانية. طول ما هي شغالة ماسكة الـ GIL، فلو اتنادت في الـ worker نفسه كل الطلبات التانية هتستنى.`,
            R`الـ decorator اللي بيحوّل الدالة اللي تحت لـ context manager يفهمه FastAPI.`,
            R`[[lifespan]] بتتنادى مرة لكل worker. فمع [[--workers 4]] فيه ٤ pools، كل واحد فيه processes بعدد [[max_workers]]، فاحسب الإجمالي على عدد الـ cores.`,
            R`[[max_workers=2]]: حسبتين بالكتير مع بعض في الـ worker ده، والتالتة بتستنى دورها. و [[with]] بيستنى الـ processes تخلص ويقفلها لما التطبيق يقفل، فمفيش processes يتيمة.`,
            R`[[app.state.cpu]]: نخزّن الـ pool في مكان الـ routes توصله. الاسم [[cpu]] اختيارنا.`,
            R`[[yield]]: التطبيق شغال ويستقبل طلبات، والـ [[with]] لسه مفتوح.`,
            R`[[FastAPI(lifespan=lifespan)]] بيربط الدالة بالتطبيق، ومن غيرها [[app.state.cpu]] مش موجود و [[/report]] يرمي [[AttributeError]].`,
            R`[[GET /report]]. لاحظ إن مفيش أي [[await]] على الحسبة نفسها في الـ worker: الحسبة كلها هتحصل برّه.`,
            R`[[async def]] عشان نقدر نعمل [[await]] على نتيجة الـ executor. و [[n: int = 10_000_000]] query parameter اختياري، والـ [[_]] جوه الرقم للقراية بس.`,
            R`[[get_running_loop()]] بترجّع الـ loop اللي FastAPI شغال عليه دلوقتي (ولازم تتنادى من جوه دالة async شغالة).`,
            R`[[run_in_executor(pool, heavy_report, n)]]: «شغّل [[heavy_report(n)]] في الـ pool وادّيني حاجة أستناها». الدالة من غير أقواس، والـ argument بعدها. والـ [[await]] بيسيب الـ loop فاضي: اتقاس إن [[/health]] ردت في 2ms وقت الحسبة، مقابل 767ms من غير executor.`,
            R`الرد فيه الناتج والـ PID بتاع الـ worker (مش بتاع process الحسبة). مع [[--workers 4]] هتشوف ٤ PIDs مختلفة على طلبات كتير.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب في ٣ سطور الفرق بين process و thread والـ GIL، وبعدين جاوب: ٤ threads بيحسبوا Python في process واحد، كام واحد بيشتغل في نفس اللحظة؟ و ٤ processes؟`, done: R`إجابتك: thread واحد في كل لحظة، و ٤ processes ممكن ٤ مع بعض على ٤ cores، والسبب إن كل process ليها GIL. ومعاك رقم من درس «الـ GIL» بيثبت ده.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[fastapi run --workers 3]] و [[ProcessPoolExecutor(max_workers=2)]] في الـ lifespan. كام process Python هيبقى شغال على السيرفر بعد أول طلب لـ [[/report]] في كل worker؟ (فكّر في الأب، والـ workers، والـ pools).`, done: R`توقّعك ١ أب + ٣ workers + ٣ × ٢ processes حسبة = ١٠، وعدّيتهم بـ [[ps aux | grep python]] أو Task Manager (على ويندوز ممكن تلاقي processes زيادة للـ launcher بتاع الـ venv، واكتب ليه).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** نسخة فيها [[heavy_report]] متعرّفة جوه [[report]] نفسها (closure) وبتتبعت لـ [[run_in_executor]]. شغّلها وانسخ الخطأ، وصلّحها.`, done: R`الخطأ فيه [[PicklingError]] أو [[Can't pickle local object]] (اكتب النص الحقيقي اللي طلع عندك)، وبعد ما رجّعت الدالة لمستوى الـ module الـ route بيرجّع الناتج الصح.` },
            { lvl: 'تطبيق', t: R`**قيس:** route [[/blocking]] بينادي الحسبة مباشرة، و [[/health]] فاضي. سكربت بيبعت الطلب التقيل وبعد ٠.١ ثانية يقيس [[/health]]، مرة لـ [[/blocking]] ومرة لـ [[/report]].`, done: R`عندك رقمين: [[/health]] استنت تقريبًا وقت الحسبة كله مع [[/blocking]]، ورجعت في ملّي ثواني مع [[/report]]، وكاتبين في جدول بنفس شكل الدرس.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** في [[docker run --rm --cpus 2 python:3.13-slim]] شغّل التطبيق مرة بـ uvicorn و [[--workers 2]] ومرة بـ gunicorn و [[-k uvicorn_worker.UvicornWorker -w 2 --timeout 5]]، وفي الاتنين ابعت طلب لـ route فيه [[time.sleep(30)]] جوه [[async def]]، وبعده طلبات عادية.`, done: R`مع gunicorn اللوج فيه [[WORKER TIMEOUT]] و [[Booting worker]] جديد في حوالي ٥ ثواني، ومع uvicorn مفيش، والطلبات اللي راحت للـ worker المعلّق استنت. وكاتب سطر: إمتى gunicorn يستاهل.` },
          ],
          sol: R`لما [[heavy_report]] تتنادى مباشرة جوه [[async def]] وتفتح [[/health]] في نفس الوقت: [[/health]] هتستنى لحد ما التقرير يخلص (في تجربتنا 0.45 ثانية بدل بضع ملّي ثانية)، لأن الحساب ماسك الـ event loop. ومع [[run_in_executor]] بالـ ProcessPoolExecutor، [[/health]] بترجع في حوالي [[8ms]]: الحساب بقى في بروسيس تاني والـ loop فاضي.

ومع [[hey]] أو [[wrk]] على route تقيل، [[--workers 4]] المفروض يدّيك requests/sec قريبة من ٤ أضعاف [[--workers 1]] لو عندك ٤ cores فاضية. و [[os.getpid()]] في الرد هيوريك ٤ PIDs مختلفة بدل واحد. ولو الفرق طلع صغير (في container محدود عندنا الزيادة كانت من 6.4 لـ 7.4 req/s بس)، يبقى الـ cores الحقيقية أقل من اللي [[nproc]] بيقوله، أو أداة الـ load نفسها بتاكل CPU على نفس الجهاز. القاعدة: workers ≈ عدد الـ cores، ومش أكتر، لأن كل worker بروسيس ليه ذاكرته.`
        },
        {
          cmd: "logging و profiling",
          title: "لوج منظم بدل print، وتقيس الوقت بيروح فين",
          desc: R`[[logging]] بدل [[print]]: كل رسالة ليها level ([[DEBUG]] و [[INFO]] و [[WARNING]] و [[ERROR]])، واسم الـ module، والوقت، وتقدر تطلّعها JSON عشان أدوات اللوج تفهمها. و [[log = logging.getLogger(__name__)]] في أول كل ملف.

وقبل ما تحسّن أي حاجة، قيس: [[time.perf_counter()]] حوالين الحتة المشكوك فيها، و [[cProfile]] للسكربتات، و [[py-spy]] لـ process شغال فعلًا في الإنتاج من غير ما توقفه.`,
          example: R`import json
import logging
import sys
import time
class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        data = {"ts": self.formatTime(record), "level": record.levelname, "logger": record.name, "msg": record.getMessage()}
        if record.exc_info:
            data["exc"] = self.formatException(record.exc_info)
        return json.dumps(data, ensure_ascii=False)
handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(JsonFormatter())
logging.basicConfig(level=logging.INFO, handlers=[handler])
log = logging.getLogger(__name__)
start = time.perf_counter()
log.info("order created id=%s total=%s", 42, 1500)
log.debug("مش هيظهر: الـ level بتاعنا INFO")
try:
    1 / 0
except ZeroDivisionError:
    log.exception("report failed")
log.info("took %.1fms", (time.perf_counter() - start) * 1000)
# في الترمنال:
# python -m cProfile -s cumtime scripts/report.py | head -30
# py-spy top --pid 1234
# py-spy dump --pid 1234`,
          try: R`شغّل المثال وشوف الـ JSON، وبعدين غيّر الـ level لـ [[DEBUG]]. وعلى تطبيق FastAPI شغال، سطّب [[pip install py-spy]] وشغّل [[py-spy top --pid]] بالـ PID بتاع uvicorn وانت بتبعت طلبات، وشوف أنهي دالة واخدة الوقت.`,
          flag: "script",
          deep: {
            why: R`[[print]] في الإنتاج: مفيش وقت، ولا level، ولا طريقة تفلتر، والـ traceback بيضيع. ولما الـ API يبطأ، التخمين («أكيد القاعدة») غلط نص الوقت: القياس بيوريك إن الوقت رايح في serialization، أو في N+1، أو في استدعاء خارجي.`,
            how: R`الـ logging فيه loggers (بأسماء بالنقط زي [[app.routers.orders]])، و handlers (بيكتبوا فين: stdout أو ملف)، و formatters (الشكل). و [[basicConfig]] بيجهّز الـ root logger مرة واحدة أول ما التطبيق يقوم. وفي Docker اكتب على stdout بس، والـ platform يجمعها (تاب Docker).

[[log.info("id=%s", x)]] بالـ [[%s]] مش f-string: الـ formatting بيحصل بس لو الرسالة هتتطبع فعلًا، وأدوات زي Sentry بتجمّع الرسايل اللي ليها نفس القالب. و [[log.exception]] جوه except بيكتب الـ traceback كامل.

و uvicorn ليه loggers خاصة ([[uvicorn.error]] و [[uvicorn.access]])، وتظبطها بـ [[--log-config]]، أو [[--no-access-log]] لو nginx بيعمل access log.

[[cProfile]] بيسجّل كل نداء دالة ووقته، و [[-s cumtime]] بيرتّب بالوقت الكلي. بيبطّأ التشغيل، فهو للتجربة المحلية. أما [[py-spy]] فـ sampling profiler بيقرا ذاكرة الـ process من برّه: مبيبطّأش، ومش محتاج تغيّر كود، و [[dump]] بيوريك كل thread واقف فين دلوقتي (مفيد لما حاجة معلّقة). وفي Docker محتاج [[--cap-add SYS_PTRACE]]. و 3.14 ضاف [[python -m pdb -p PID]] تعمل debug لـ process شغال، و [[python -m asyncio ps PID]] للـ tasks.

وللإنتاج: metrics (Prometheus) و Sentry، في تاب «Cloud و DevOps»، واللوج المنظم في «structured logs» في تاب «بناء مشروع كامل».`,
            when: "الـ logging من أول سطر في أي خدمة. والقياس قبل أي optimization، ولما endpoint معين يبطأ.",
            mistakes: R`[[print]] في الإنتاج. و [[log.info(f"...")]] في loop سخن. وتسجّل باسوردات أو توكنات أو body كامل فيه بيانات شخصية. و [[logging.basicConfig]] في كذا ملف (أول واحد بس اللي بيشتغل). وتحسّن حاجة من غير ما تقيس قبل وبعد.`
          },
          teach: R`## المثال بيعمل إيه؟

جزئين: الأول بيجهّز [[logging]] يطلّع كل رسالة **سطر JSON** على stdout، ويكتب ٣ رسايل (معلومة، و debug مش هيظهر، و error ومعاه الـ traceback)، ويقيس الوقت بـ [[time.perf_counter()]]. والتاني ٣ أوامر ترمنال بيقيسوا **الوقت بيروح فين**: [[cProfile]] لسكربت، و [[py-spy]] لـ process شغال. الجزء الأول اتجرب على ويندوز (Python 3.14)، والأوامر على لينكس في [[docker run --rm --cap-add SYS_PTRACE python:3.13-slim]].

---

## ١. الـ imports

~~~python
import json
import logging
import sys
import time
~~~

[[json]] عشان نحوّل الرسالة لـ JSON، و [[logging]] مكتبة اللوج الجاهزة في Python، و [[sys]] عشان [[sys.stdout]] (الشاشة أو اللي بيستقبل ناتج البرنامج)، و [[time]] للقياس.

---

## ٢. الـ formatter: شكل الرسالة

~~~python
class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        data = {"ts": self.formatTime(record), "level": record.levelname, "logger": record.name, "msg": record.getMessage()}
        if record.exc_info:
            data["exc"] = self.formatException(record.exc_info)
        return json.dumps(data, ensure_ascii=False)
~~~

الـ logging فيه ٣ أدوار:

| الدور | شغله | في المثال |
|---|---|---|
| logger | انت بتكلّمه: [[log.info(...)]] | [[log]] |
| handler | الرسالة تروح فين | [[StreamHandler(sys.stdout)]] |
| formatter | شكلها إيه | [[JsonFormatter]] |

- [[class JsonFormatter(logging.Formatter)]]: class بيورث من الـ formatter الأصلي، وبنغيّر دالة واحدة بس: [[format]].
- [[record]]: كل رسالة بتوصل كـ [[LogRecord]]، object فيه كل حاجة عنها.
- [[self.formatTime(record)]]: الوقت كنص ([[2026-10-07 12:28:08,166]]، والـ [[,166]] ملّي ثانية).
- [[record.levelname]]: الـ level كاسم ([[INFO]]).
- [[record.name]]: اسم الـ logger.
- [[record.getMessage()]]: الرسالة **بعد** ما الـ [[%s]] تتملي بالقيم.
- [[record.exc_info]]: لو الرسالة جاية من [[log.exception]] بيبقى فيها معلومات الـ exception، وإلا [[None]]. و [[formatException]] بيحوّلها لنص الـ traceback.
- [[json.dumps(data, ensure_ascii=False)]]: الـ dict يبقى نص JSON في سطر واحد. و [[ensure_ascii=False]] عشان العربي يفضل حروف مش [[\u0645...]].

---

## ٣. الربط: handler و [[basicConfig]]

~~~python
handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(JsonFormatter())
logging.basicConfig(level=logging.INFO, handlers=[handler])
log = logging.getLogger(__name__)
~~~

- [[StreamHandler(sys.stdout)]]: اكتب على stdout. الافتراضي بتاعه stderr، وفي Docker الاتنين بيتجمعوا، بس stdout أوضح.
- [[setFormatter]]: الـ handler ده يستخدم الشكل بتاعنا.
- [[basicConfig]]: بيجهّز الـ **root logger** (الأب اللي كل الـ loggers بتوصله). [[level=logging.INFO]] يعني [[INFO]] وفوقها بس. والترتيب: [[DEBUG]] < [[INFO]] < [[WARNING]] < [[ERROR]] < [[CRITICAL]]. و [[basicConfig]] بيشتغل **أول مرة بس**، وأي نداء بعد كده مبيعملش حاجة (إلا بـ [[force=True]]).
- [[getLogger(__name__)]]: [[__name__]] اسم الـ module الحالي. هنا [[__main__]] لأننا شغلنا الملف مباشرة، وفي مشروع هيبقى زي [[app.routers.orders]]، فتعرف الرسالة جاية منين.

---

## ٤. الرسايل

~~~python
start = time.perf_counter()
log.info("order created id=%s total=%s", 42, 1500)
log.debug("مش هيظهر: الـ level بتاعنا INFO")
~~~

[[time.perf_counter()]] ساعة دقيقة جدًا للقياس بس (الرقم نفسه ملوش معنى، الفرق بين رقمين هو المهم). و [[%s]] مكان قيمة: الـ logging بيملاها بـ [[42]] و [[1500]] **بس لو** الرسالة هتتكتب فعلًا. أما [[f"..."]] بيتحسب دايمًا حتى لو الـ level هيرميها. و [[debug]] أقل من [[INFO]] فمش هتظهر.

~~~python
try:
    1 / 0
except ZeroDivisionError:
    log.exception("report failed")
log.info("took %.1fms", (time.perf_counter() - start) * 1000)
~~~

[[log.exception]] زي [[log.error]] بالظبط، بس بتضيف الـ traceback بتاع الـ exception اللي بنمسكه دلوقتي، فلازم تتنادى جوه [[except]]. و [[%.1f]] رقم عشري بخانة واحدة، و [[* 1000]] من ثواني لملّي ثانية.

~~~text الناتج (ويندوز، اختصرنا المسار)
{"ts": "2026-10-07 12:28:08,166", "level": "INFO", "logger": "__main__", "msg": "order created id=42 total=1500"}
{"ts": "2026-10-07 12:28:08,167", "level": "ERROR", "logger": "__main__", "msg": "report failed", "exc": "Traceback (most recent call last):\n  File \"C:\\Users\\ali\\...\\log_demo.py\", line 19, in <module>\n    1 / 0\n    ~~^~~\nZeroDivisionError: division by zero"}
{"ts": "2026-10-07 12:28:08,167", "level": "INFO", "logger": "__main__", "msg": "took 0.8ms"}
~~~

لاحظ إن الـ traceback كله جوه [[exc]] في **نفس السطر**: الـ [[\n]] بقت حرفين جوه نص JSON مش سطر جديد. وده المطلوب، لأن أدوات اللوج (Loki و CloudWatch) بتعتبر كل سطر حدث لوحده. ولما غيّرنا لـ [[level=logging.DEBUG]] ظهر سطر زيادة:

~~~text الناتج
{"ts": "2026-10-07 12:28:08,341", "level": "DEBUG", "logger": "__main__", "msg": "مش هيظهر: الـ level بتاعنا INFO"}
~~~

---

## ٥. [[python -m cProfile -s cumtime scripts/report.py | head -30]]

[[cProfile]] **profiler**: بيسجّل كل نداء دالة ووقته. [[-m]] شغّله كموديول، و [[-s cumtime]] (sort by cumulative time) رتّب بالوقت الكلي، و [[| head -30]] أول ٣٠ سطر بس (لينكس وماك). جربناه على سكربت فيه [[load_orders]] بتعمل ٢٠٠ ألف طلب، و [[slow_tax]] بتحسب الضريبة بـ loop ملوش لازمة:

~~~text الناتج (لينكس، مختصر)
         10803633 function calls (10603508 primitive calls) in 2.542 seconds

   Ordered by: cumulative time

   ncalls  tottime  percall  cumtime  percall filename:lineno(function)
        1    0.000    0.000    2.297    2.297 report.py:6(build_report)
   200000    0.114    0.000    2.201    0.000 report.py:4(slow_tax)
 10200000    0.981    0.000    0.981    0.000 report.py:5(<genexpr>)
        1    0.222    0.222    0.222    0.222 report.py:2(load_orders)
~~~

| العمود | يعني |
|---|---|
| [[ncalls]] | اتنادت كام مرة |
| [[tottime]] | الوقت **جوه** الدالة نفسها، من غير الدوال اللي بتناديها |
| [[cumtime]] | الوقت الكلي بما فيه اللي بتناديه |
| [[percall]] | الوقت ÷ عدد النداءات |

القراية: [[slow_tax]] اتنادت ٢٠٠ ألف مرة وواكلة 2.2 من 2.5 ثانية، و [[load_orders]] 0.22 بس. يعني لو هتحسّن حاجة، حسّن [[slow_tax]]، مش تحميل الداتا. ده بالظبط «قيس قبل ما تخمّن».

> [[cProfile]] نفسه بيبطّأ البرنامج (بيسجّل كل نداء)، فالأرقام أكبر من الحقيقة. النسب هي المهمة.

---

## ٦. [[py-spy top --pid 1234]]

[[py-spy]] أداة برّه Python ([[pip install py-spy]]) بتقرا ذاكرة process شغال كل شوية (**sampling**)، من غير ما توقفه ولا تغيّر كوده. [[--pid]] رقم الـ process. شغلنا uvicorn فيه route [[def]] بيعمل حسبة تقيلة، وبعتنا طلبات، و [[top]] عرض جدول بيتحدث زي أمر [[top]]:

~~~text الناتج (لينكس)
Collecting samples from '/usr/local/bin/python3.13 /usr/local/bin/uvicorn app.main:app --port 5879' (python v3.13.16)
Total Samples 400
GIL: 82.00%, Active: 82.00%, Threads: 2

  %Own   %Total  OwnTime  TotalTime  Function (filename)
 42.00%  81.00%    2.00s     3.76s   heavy_report (main.py)
 39.00%  39.00%    1.76s     1.76s   <genexpr> (main.py)
  1.00%   1.00%   0.010s    0.010s   sleep (asyncio/tasks.py)
  0.00%  81.00%   0.000s     3.76s   report (main.py)
~~~

- [[%Own]] و [[OwnTime]]: زي [[tottime]]، الوقت جوه الدالة نفسها.
- [[%Total]] و [[TotalTime]]: زي [[cumtime]].
- [[GIL: 82.00%]]: نسبة العينات اللي كان فيها thread ماسك الـ GIL. قريبة من ١٠٠٪ = البروسيس بيحسب، مش مستني.

---

## ٧. [[py-spy dump --pid 1234]]

[[dump]] صورة واحدة: كل thread واقف فين **دلوقتي**، من تحت لفوق:

~~~text الناتج (لينكس، مختصر)
Thread 13 (idle): "MainThread"
    select (selectors.py:452)
    _run_once (asyncio/base_events.py:2023)
    run_forever (asyncio/base_events.py:684)
Thread 18 (active+gil): "AnyIO worker thread"
    <genexpr> (main.py:4)
    heavy_report (main.py:4)
    report (main.py:7)
~~~

- الـ [[MainThread]] [[idle]] واقف في [[select]]: ده الـ event loop مستني طلبات. طبيعي.
- [[AnyIO worker thread]] [[active+gil]]: ده thread من الـ threadpool اللي FastAPI بيشغّل فيه الـ [[def]] routes، وماسك الـ GIL وبيحسب في [[main.py]] سطر ٤.

ولما السيرفر «معلّق» ومش عارف ليه، [[dump]] بيقولك في ثانية: واقف على query، ولا lock، ولا loop مبيخلصش.

> في Docker لازم [[--cap-add SYS_PTRACE]]، وإلا [[py-spy]] مش هيقدر يقرا ذاكرة الـ process. وعلى لينكس والماك برّه Docker غالبًا محتاج [[sudo]].

---

## ٨. الدورة كاملة: قيس، صلّح، قيس تاني

اتشغّل فعلًا على ويندوز (Python 3.14.3) بسكربت [[report.py]] شبه اللي فوق: ٢٠٠ ألف طلب، و [[slow_tax]] بتحسب الضريبة بـ loop من ٥٠ لفة ملهاش لازمة، و [[fast_tax]] بتحسبها في عملية واحدة:

~~~python
def slow_tax(total):
    return sum(total * 0.14 / 50 for _ in range(50))
def fast_tax(total):
    return total * 0.14
def build_report(orders, tax):
    return round(sum(tax(o["total"]) for o in orders))
~~~

- [[slow_tax]]: بتقسم الضريبة ٥٠ حتة وتجمعهم. نفس الناتج، بس ٥٠ عملية بدل واحدة، وكل لفة generator فيه نداء دالة.
- [[build_report(orders, tax)]]: بتاخد دالة الضريبة كباراميتر، فنقدر نقيس النسختين بنفس الكود.
- [[round(...)]]: عشان نقارن الناتج بين النسختين من غير فرق الكسور الصغيرة في الـ float.

### ١. القياس من غير profiler

~~~text الناتج: python report.py (مرتين)، و python report.py --fast (مرتين)
slow_tax 698600000 0.778s
slow_tax 698600000 0.780s
fast_tax 698600000 0.016s
fast_tax 698600000 0.016s
~~~

نفس الناتج بالظبط ([[698600000]])، والوقت من ٠.٧٨ لـ ٠.٠١٦: **٤٨ مرة**. والتشغيل مرتين عشان تتأكد إن الرقم ثابت مش صدفة.

### ٢. الـ profiler بيكبّر الوقت

~~~text الناتج: python -m cProfile -s cumtime report.py (مختصر)
slow_tax 698600000 2.024s
         10800011 function calls (10600011 primitive calls) in 2.069 seconds
   200000    0.086    0.000    1.952    0.000 report.py:4(slow_tax)
 10200000    0.932    0.000    0.932    0.000 report.py:5(<genexpr>)
        1    0.045    0.045    0.045    0.045 report.py:2(load_orders)
~~~

نفس الكود أخد **٢.٠٢** ثانية تحت [[cProfile]] بدل ٠.٧٨: الـ profiler بيسجّل ١٠ مليون نداء، وده بيكلّف. فالأرقام المطلقة تحت الـ profiler مش هي الحقيقة، **النسب** هي اللي بتقولك فين المشكلة: [[slow_tax]] واخدة ٩٤٪ من الوقت، و [[load_orders]] ٢٪.

القاعدة: الـ profiler يقولك **فين**، والقياس العادي ([[perf_counter]] أو [[timeit]]) يقولك **قد إيه** قبل وبعد.

### ٣. [[py-spy]] على ويندوز

اتشغّل فعلًا: py-spy 0.4.2 على Python 3.14.3 على ويندوز، من غير صلاحيات أدمن، على سكربت بيلف في [[heavy()]] للأبد:

~~~text الناتج: py-spy dump --pid 30852
Process 30852: ...\.venv\Scripts\python.exe spin.py
Python v3.14.3 (...\pythoncore-3.14-64\python.exe)

Thread 26988 (active+gil)
    <genexpr> (spin.py:4)
    heavy (spin.py:4)
    main (spin.py:6)
    <module> (spin.py:7)
~~~

~~~text الناتج: py-spy record --pid 30852 --duration 3 -o flame.svg
py-spy> Sampling process 100 times a second for 3 seconds. Press Control-C to exit.
py-spy> Wrote flamegraph data to 'flame.svg'. Samples: 299 Errors: 0
~~~

- [[record]]: بيجمع عينات مدة ([[--duration 3]] = ٣ ثواني) ويكتبها **flamegraph** ([[-o flame.svg]]): صورة تفتحها في المتصفح، كل دالة مستطيل عرضه = نسبة الوقت فيها، واللي فوقه هي اللي نادتها.
- [[100 times a second]]: ١٠٠ عينة في الثانية، فـ ٣ ثواني ≈ ٣٠٠ عينة ([[Samples: 299]]).
- الـ PID: على ويندوز [[python.exe]] بتاع الـ venv launcher، و py-spy لقى الـ interpreter الحقيقي لوحده (السطر التاني).

---

## الخلاصة

| الأداة | إمتى | بتبطّأ؟ |
|---|---|---|
| [[time.perf_counter()]] | حتة كود واحدة مشكوك فيها | لأ |
| [[cProfile]] | سكربت أو اختبار محلي، عايز كل الدوال | أيوه |
| [[py-spy top]] | process شغال في الإنتاج، مين واكل الوقت | لأ |
| [[py-spy dump]] | process معلّق، واقف فين | لأ |

- [[getLogger(__name__)]] في كل ملف، و [[basicConfig]] مرة واحدة في نقطة البداية.
- [[%s]] في رسايل اللوج مش f-string، و [[log.exception]] جوه [[except]] بس.
- سطر JSON واحد لكل رسالة، حتى الـ traceback.`,
          lines: [
            R`[[json]] عشان [[json.dumps]] يحوّل كل رسالة لسطر JSON. أدوات اللوج (Loki و CloudWatch و ELK) بتفهم JSON وتقدر تفلتر بأي مفتاح ([[level]] أو [[logger]]).`,
            R`[[logging]] المكتبة الجاهزة في Python: levels و loggers بأسماء و handlers بيكتبوا في أماكن مختلفة. [[print]] مفيهوش ولا واحدة منهم.`,
            R`[[sys]] عشان [[sys.stdout]]. الـ [[StreamHandler]] من غير باراميتر بيكتب على stderr، واحنا عايزين stdout صريح.`,
            R`[[time]] عشان [[perf_counter()]]: ساعة دقيقة للقياس بس. الرقم نفسه ملوش معنى، الفرق بين قراءتين هو الوقت.`,
            R`class بيورث من [[logging.Formatter]] الأصلي، فبياخد كل دواله ([[formatTime]] و [[formatException]]) وبنغيّر واحدة بس.`,
            R`[[format(record)]] بتتنادى مرة لكل رسالة هتتكتب. [[record]] هو [[LogRecord]]: object فيه الرسالة والـ level والوقت واسم الملف والسطر ومعلومات الـ exception.`,
            R`الـ dict بأربع مفاتيح: [[formatTime]] الوقت كنص بالملّي ثانية، و [[levelname]] زي [[INFO]]، و [[name]] اسم الـ logger، و [[getMessage()]] الرسالة **بعد** ما الـ [[%s]] تتملي بالقيم.`,
            R`[[exc_info]] فيها حاجة بس لو الرسالة جاية من [[log.exception]] أو [[exc_info=True]]، وإلا [[None]] فالشرط بيتخطى.`,
            R`[[formatException]] بيحوّل الـ exception لنص الـ traceback كامل، وبيتحط في مفتاح [[exc]]. جوه JSON الـ [[\n]] بتبقى حرفين، فالـ traceback كله في **نفس السطر** والأداة تعتبره حدث واحد.`,
            R`[[ensure_ascii=False]] عشان العربي يفضل حروف عربي في اللوج بدل [[م]] وأخواتها اللي محدش يعرف يقراها.`,
            R`handler بيكتب على stdout. في Docker و Kubernetes اكتب على stdout بس ومن غير ملفات: الـ platform بيجمع ناتج الـ container لوحده.`,
            R`اربط الـ handler بالشكل بتاعنا. من غير السطر ده هيكتب بالشكل الافتراضي ([[INFO:__main__:...]]).`,
            R`[[basicConfig]] بيجهّز الـ root logger مرة واحدة: [[INFO]] وفوق، والـ handler بتاعنا. وبيشتغل **أول مرة بس**: نداء تاني في ملف تاني مبيعملش حاجة إلا بـ [[force=True]]، فمكانه نقطة بداية التطبيق.`,
            R`[[getLogger(__name__)]] logger باسم الـ module ([[__main__]] هنا، و [[app.routers.orders]] في مشروع)، فتعرف كل سطر جاي منين، وتقدر تعلّي أو توطّي level موديول واحد بس.`,
            R`ابدأ القياس قبل الشغل اللي عايز تعرف وقته.`,
            R`[[%s]] مش f-string: الـ formatting بيحصل بس لو الرسالة هتتكتب، وأدوات زي Sentry بتجمّع الرسايل اللي ليها نفس القالب ([[order created id=%s]]) حتى لو القيم مختلفة.`,
            R`[[debug]] أقل من [[INFO]] فبتترمي من غير ما تتكتب. لما تغيّر الـ level لـ [[DEBUG]] تظهر، من غير ما تلمس السطر ده.`,
            R`[[try]] حوالين كود هيرمي، عشان نشوف شكل الـ traceback في JSON.`,
            R`القسمة على صفر بترمي [[ZeroDivisionError: division by zero]] على طول، فدي أسهل طريقة نعمل بيها خطأ حقيقي عشان نشوف الـ traceback.`,
            R`[[except ZeroDivisionError]] بيمسك النوع ده بس، وأي خطأ تاني يعدّي.`,
            R`[[log.exception]] = [[log.error]] + الـ traceback الحالي، فلازم تكون جوه [[except]]. برّه [[except]] هتكتب [[NoneType: None]] مكان الـ traceback.`,
            R`[[%.1f]] رقم عشري بخانة واحدة، و [[* 1000]] من ثواني لملّي ثانية. اتقاس: [[took 0.8ms]] للتلات رسايل.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** رتّب الـ levels من الأقل للأعلى، وقول مع [[level=logging.WARNING]] أنهي من دول هيتكتب: [[log.debug]] و [[log.info]] و [[log.warning]] و [[log.exception]] (جوه except).`, done: R`الترتيب DEBUG ثم INFO ثم WARNING ثم ERROR ثم CRITICAL، وشغّلت ٤ سطور واتكتب اتنين بس: الـ warning والـ exception (ومعاه traceback).` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ملفين: [[a.py]] فيه [[logging.basicConfig(level=logging.WARNING)]]، و [[main.py]] بيعمل [[import a]] وبعدها [[logging.basicConfig(level=logging.INFO)]] و [[log.info("hi")]]. هيطبع [[hi]]؟ وبعدين جرّب [[force=True]].`, done: R`مش هيطبع (أول [[basicConfig]] هو اللي كسب، والتاني اتجاهل)، ومع [[force=True]] بيطبع [[INFO:__main__:hi]] أو بالشكل بتاعك، وكاتب ليه.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية الشكل:** سكربت بيكتب ٥٠٠ سطر لوج JSON (طلبات بمسارات وأوقات عشوائية، و ٢٪ منها ERROR بـ traceback)، وسكربت تاني بيقرا الملف ويطلّع: عدد كل level، وأبطأ ٣ مسارات بمتوسط الوقت.`, done: R`كل سطر بيتقري بـ [[json.loads]] (مفيش سطر بايظ حتى سطور الـ traceback)، والملخص بيطبع العدد الصح للـ ERROR (قارنه بالعدد اللي السكربت الأول كتبه).` },
            { lvl: 'تطبيق', t: R`**قيس وصلّح:** خد دالة بطيئة عندك أو [[slow_tax]] من الدرس، وشغّل [[cProfile]]، وحدد الدالة من [[cumtime]]، وصلّحها، وقيس بـ [[perf_counter]] قبل وبعد ٣ مرات.`, done: R`عندك ٦ أرقام، والتحسين ثابت في التلات مرات، والناتج قبل وبعد متساوي بـ [[assert]]، وكاتب نسبة الدالة من الوقت الكلي في [[cProfile]].` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من [[py-spy record --help]] لاقي الخيار اللي بيضيف الـ threads الواقفة (idle) للـ flamegraph، والخيار اللي بيغيّر الشكل لـ speedscope، وطلّع flamegraph لتطبيق FastAPI شغال وانت بتبعتله طلبات على route تقيل.`, done: R`عندك ملف SVG (أو JSON لـ speedscope) والدالة التقيلة بتاعتك أعرض مستطيل فيه، وكاتب أسماء الخيارين اللي لقيتهم من الـ help بنصها.` },
          ],
          sol: R`هتشوف ٣ سطور JSON: [[{"ts": "2026-...", "level": "INFO", "logger": "__main__", "msg": "order created id=42 total=1500"}]]، وبعدين سطر [[ERROR]] فيه مفتاح [[exc]] جواه الـ traceback كله كـ string واحد ([[ZeroDivisionError: division by zero]] في آخره)، وبعدين [[took 3.9ms]] أو قريب منها. سطر الـ debug مش موجود. ولما تغيّر لـ [[DEBUG]] هيظهر سطر زيادة بـ [[level: DEBUG]]. الـ traceback في سطر واحد هو المطلوب: أدوات زي Loki أو CloudWatch بتعتبر كل سطر حدث لوحده.

و [[py-spy top --pid]] بيعرض جدول زي [[top]] بالدوال اللي واخدة أكتر وقت، ولو بتبعت طلبات على route تقيل هتلاقي الدالة بتاعتك (مثلًا [[heavy_report (main.py:6)]]) فوق. و [[py-spy dump --pid]] بيطبع الـ stack الحالي لكل thread، ومفيد جدًا لما السيرفر معلّق ومش عارف واقف فين. ولو قالك [[Permission denied]]، شغّله بـ [[sudo]] (على Linux و macOS محتاج صلاحية تقرا ذاكرة بروسيس تاني). وخد بالك: الـ PID الصح هو بتاع الـ worker، مش بتاع الـ reloader في [[fastapi dev]].`
        },
        {
          cmd: "FastAPI في Docker",
          title: "Dockerfile لـ FastAPI: يوزر مش root، و health و readiness، ويقفل بنضافة",
          learn: R`تبني image لتطبيق FastAPI، وتفرّق بين liveness و readiness، وتخلّي [[docker stop]] يقفل التطبيق بنضافة في ثواني مش ١٠.`,
          out: R`Dockerfile جاهز تنسخه لأي مشروع، و endpoints [[/health]] و [[/ready]]، وتعرف ليه CMD لازم يتكتب بشكل JSON.`,
          use: {
            prog: R`أغلب الـ deploy النهارده containers (Docker و Kubernetes و Cloud Run و ECS)، والـ Dockerfile بتاع الـ API هو أول حاجة بيطلبها أي فريق.`,
            work: R`أشهر عطلين في الـ deploy: [[docker stop]] بياخد ١٠ ثواني ويقطع الطلبات (CMD بشكل shell)، والـ container [[healthy]] والقاعدة واقعة (health check بيقول «عايش» بس). الاتنين اتقاسوا هنا.`,
          },
          desc: R`الـ image بتاعة FastAPI بتتبني من [[python:3.13-slim]]: نسطّب الـ requirements الأول (عشان الـ cache)، وبعدين ننسخ الكود، ونشغّل بيوزر مش root، و [[CMD]] بشكل JSON ([[exec form]]) عشان uvicorn يبقى PID 1 ويستلم SIGTERM. و [[HEALTHCHECK]] بينادي [[/health]].

وفيه نوعين فحص: **liveness** ([[/health]]): «البروسيس عايش ويرد»، وده لو فشل الـ container يتعمله restart. و **readiness** ([[/ready]]): «أقدر أخدم طلبات دلوقتي؟» (القاعدة و Redis شغالين)، ولو فشل الـ load balancer يبطّل يبعتله من غير restart. وتشغيل Docker نفسه وأوامره في تاب Docker.`,
          example: R`# app/main.py:
import os
from contextlib import asynccontextmanager
import redis.asyncio as redis
from fastapi import FastAPI, Request, Response
@asynccontextmanager
async def lifespan(app: FastAPI):
    app.state.redis = redis.from_url(os.environ.get("REDIS_URL", "redis://redis:6379/0"), socket_connect_timeout=1, socket_timeout=1)
    yield
    await app.state.redis.aclose()
app = FastAPI(lifespan=lifespan)
@app.get("/health")
async def health():
    return {"status": "ok"}
@app.get("/ready")
async def ready(request: Request, response: Response):
    try:
        await request.app.state.redis.ping()
    except Exception as e:
        response.status_code = 503
        return {"status": "not ready", "redis": type(e).__name__}
    return {"status": "ready"}
# Dockerfile:
FROM python:3.13-slim
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app ./app
RUN useradd --create-home appuser
USER appuser
EXPOSE 8000
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 CMD ["python", "-c", "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health', timeout=2)"]
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2", "--proxy-headers"]
# في الترمنال:
# docker build -t shop-api .
# docker run -d --name api -p 8000:8000 shop-api
# docker ps
# docker stop api`,
          try: R`ابني الـ image وشغّلها، وافتح [[/health]] و [[/ready]] (المفروض [[/ready]] يرجّع 503 لو مفيش Redis). وبعدين شغّل Redis على نفس الـ network باسم [[redis]] وشوف [[/ready]] يبقى 200. وأخيرًا قيس [[docker stop]] بـ [[time]] مرة بالـ CMD ده، ومرة بعد ما تغيّره لـ [[CMD uvicorn app.main:app --host 0.0.0.0 --port 8000]] (من غير أقواس).`,
          flag: "script",
          deep: {
            why: R`الكود اللي شغال على جهازك بـ [[fastapi dev]] مش هو اللي هيشتغل في الإنتاج. الـ container بيحدد: مين بيستلم إشارة الإيقاف، وبأنهي يوزر الكود شغال لو حد اخترقه، والـ orchestrator هيعرف منين إن التطبيق جاهز. كل ده بيتكتب في ١٢ سطر Dockerfile، وغلطة في سطر منهم بتبان بس في أول deploy.`,
            how: R`**ترتيب الطبقات:** كل سطر في الـ Dockerfile طبقة متخزّنة. [[COPY requirements.txt]] و [[pip install]] قبل [[COPY app]]، فلما تغيّر الكود بس، Docker بيعيد استخدام طبقة الـ pip (ثواني بدل دقيقة).

**[[ENV]]:** [[PYTHONDONTWRITEBYTECODE=1]] مفيش ملفات [[.pyc]] جوه الـ image، و [[PYTHONUNBUFFERED=1]] اللوج بيطلع على طول من غير buffer (من غيره ممكن آخر سطور قبل crash متظهرش في [[docker logs]]).

**PID 1 والإشارات:** [[docker stop]] بيبعت SIGTERM للـ PID 1، ويستنى ١٠ ثواني، وبعدين SIGKILL. بـ [[CMD ["uvicorn", ...]]] (exec form) uvicorn نفسه PID 1، فبيستلم SIGTERM ويقفل بنضافة (الـ lifespan بعد الـ yield بيشتغل). بـ [[CMD uvicorn ...]] (shell form) الـ PID 1 هو [[/bin/sh -c]]، وده مبيبعتش الإشارة لـ uvicorn، فبعد ١٠ ثواني الكل بيتقتل. اتقاس: ٢.٩ ثانية مقابل ١٠.٥.

**اليوزر:** [[python:3.13-slim]] بيشتغل root افتراضيًا. [[useradd]] و [[USER appuser]] بيخلّوا الكود يشتغل بـ uid 1000، فلو حد لقى ثغرة مش هيبقى root جوه الـ container.

**[[HEALTHCHECK]]:** Docker بينفّذ الأمر كل [[--interval]]، ولو فشل [[--retries]] مرات ورا بعض الحالة بتبقى [[unhealthy]]. و [[--start-period]] مهلة في الأول للتطبيق يقوم. الـ slim image مفيهاش [[curl]]، فالفحص بـ Python نفسه ([[urllib.request]])، وأي exception (اتصال اترفض أو 500) بيخلّي كود الخروج ١ = فشل.

**liveness و readiness:** [[/health]] متلمسش القاعدة: لو القاعدة وقعت و [[/health]] فشل، Kubernetes هيعمل restart لكل الـ pods، وده مش هيصلّح القاعدة وهيزوّد الضغط عليها لما ترجع. [[/ready]] هو اللي بيفحص الاعتماديات، ولو فشل الـ pod بيطلع من الـ load balancer لحد ما يرجع. و [[socket_timeout=1]] عشان [[/ready]] نفسه ميعلّقش.

**[[--proxy-headers]]:** ورا Nginx أو load balancer، uvicorn بيقرا [[X-Forwarded-For]] و [[X-Forwarded-Proto]] عشان [[request.client.host]] يبقى IP العميل الحقيقي. وبيصدّقهم بس من العناوين في [[--forwarded-allow-ips]] (الافتراضي [[127.0.0.1]])، ففي Docker غالبًا محتاج تحط IP الـ proxy أو [["*"]] لو الـ container مش مكشوف غير للـ proxy.`,
            when: R`أي FastAPI رايح سيرفر أو cloud. على VM لوحدها: [[--workers]] بعدد الـ cores. في Kubernetes: worker واحد لكل pod غالبًا وتكبّر بعدد الـ pods، والـ probes بتاعة Kubernetes ([[livenessProbe]] و [[readinessProbe]]) بتنادي نفس الـ endpoints دي بدل [[HEALTHCHECK]] (Kubernetes بيتجاهل [[HEALTHCHECK]]).`,
            mistakes: R`[[CMD]] بشكل shell (التطبيق ميعرفش إنه بيتقفل، والطلبات بتتقطع بعد ١٠ ثواني). و [[COPY . .]] قبل [[pip install]] (كل تغيير في الكود بيعيد تسطيب كل حاجة). ومفيش [[.dockerignore]] (الـ [[.venv]] و [[.env]] بأسراره بيتنسخوا جوه الـ image). و [[/health]] بيفحص القاعدة (restart لكل حاجة لما القاعدة تقع). و [[--reload]] أو [[fastapi dev]] في الـ image. والتشغيل بـ root. و [[HEALTHCHECK CMD curl ...]] على slim image مفيهاش curl، فالـ container [[unhealthy]] على طول وانت مش فاهم ليه.`
          },
          teach: R`## المثال بيعمل إيه؟

تطبيق FastAPI صغير فيه [[/health]] (البروسيس عايش) و [[/ready]] (Redis بيرد)، و Dockerfile بيبنيه في image بيوزر عادي، وفيها health check، و CMD بيخلّي uvicorn يستلم إشارة الإيقاف.

اتشغّل فعلًا بـ Docker 29.6 على ويندوز، والـ image من [[python:3.13-slim]] بـ FastAPI 0.162 و uvicorn 0.54 و redis-py 8.1، و Redis 7.4.12 ([[redis:7-alpine]]).

---

## ١. الملفات

~~~text الفولدرات
shop-api/
  app/
    __init__.py
    main.py
  requirements.txt
  .dockerignore
  Dockerfile
~~~

~~~text requirements.txt
fastapi==0.162.0
uvicorn[standard]==0.54.0
redis==8.1.0
~~~

- نسخ ثابتة ([[==]]) عشان الـ image تتبني بنفس الحاجة النهارده وبعد شهر. (لو بتستخدم uv، [[uv export --frozen]] بيطلّع الملف ده من الـ lock، درس «uv و pyproject.toml».)
- [[uvicorn[standard]]] بيجيب [[uvloop]] و [[httptools]] (أسرع على لينكس).

~~~text .dockerignore
.venv
__pycache__
*.pyc
.git
.env
tests
~~~

[[.dockerignore]] زي [[.gitignore]] بس للـ [[docker build]]: الحاجات دي مش بتتبعت لـ Docker أصلًا. أهمهم [[.env]] (أسرار) و [[.venv]] (مئات الميجا ومش شغالة على لينكس لو اتعملت على ويندوز).

---

## ٢. [[/health]] و [[/ready]]

~~~python
@app.get("/health")
async def health():
    return {"status": "ok"}
@app.get("/ready")
async def ready(request: Request, response: Response):
    try:
        await request.app.state.redis.ping()
    except Exception as e:
        response.status_code = 503
        return {"status": "not ready", "redis": type(e).__name__}
    return {"status": "ready"}
~~~

- [[/health]] مبيلمسش أي حاجة برّه: لو رد، يبقى البروسيس عايش والـ event loop مش متقفل.
- [[response: Response]]: FastAPI بيدّيك الرد قبل ما يتبعت، فتغيّر الـ status من غير ما تبني [[JSONResponse]] بإيدك. و [[503 Service Unavailable]] = «مش جاهز دلوقتي، جرّب بعدين».
- [[type(e).__name__]] اسم الخطأ بس ([[TimeoutError]])، مش الرسالة كاملة: الـ endpoint ده ممكن يبقى مكشوف، ومش عايز تطلّع أسماء hosts أو باسوردات من رسالة الخطأ.

---

## ٣. الـ Dockerfile سطر سطر

| السطر | بيعمل إيه | لو مش موجود |
|---|---|---|
| [[FROM python:3.13-slim]] | Debian صغير فيه Python. ١٧٨ ميجا | [[python:3.13]] الكامل حوالي ١ جيجا |
| [[ENV PYTHONUNBUFFERED=1]] | اللوج يطلع فورًا | آخر سطور قبل crash ممكن تضيع |
| [[WORKDIR /app]] | الفولدر اللي كل اللي بعده بيشتغل فيه، وبيتعمل لوحده | الملفات تتنسخ في [[/]] وسط ملفات النظام |
| [[COPY requirements.txt .]] ثم [[RUN pip install]] | الاعتماديات في طبقة لوحدها | أي تغيير في الكود يعيد [[pip install]] كله |
| [[--no-cache-dir]] | pip ميحتفظش بنسخة من اللي نزّله | الـ image أكبر بالـ cache ده |
| [[COPY app ./app]] | الكود، بعد الاعتماديات | — |
| [[RUN useradd]] و [[USER appuser]] | الكود يشتغل uid 1000 | root جوه الـ container |
| [[EXPOSE 8000]] | توثيق للبورت، مش بيفتحه | مفيش فرق في التشغيل، بس اللي بيقرا ميعرفش البورت |
| [[HEALTHCHECK ...]] | Docker يفحص [[/health]] كل ١٠ ثواني | [[docker ps]] مبيقولش healthy ولا unhealthy |
| [[CMD ["uvicorn", ...]]] | uvicorn هو PID 1 | بشكل shell: [[/bin/sh]] هو PID 1 |

~~~text الناتج: docker build -t p4-shop-api . و docker images
p4-shop-api 241MB
~~~

يعني ٦٣ ميجا فوق الـ slim: FastAPI و uvicorn وأخواتهم.

---

## ٤. التشغيل والفحص

~~~text الناتج
$ curl localhost:8610/health
{"status":"ok"}
$ curl -w " %{http_code}" localhost:8610/ready
{"status":"not ready","redis":"TimeoutError"} 503
$ docker ps --format '{{.Status}}'
Up 5 seconds (healthy)
$ docker exec p4api id
uid=1000(appuser) gid=1000(appuser) groups=1000(appuser)
~~~

- [[/ready]] 503 لأن مفيش Redis على الـ network، و [[/health]] 200. ده بالظبط الفرق: البروسيس سليم، بس مش جاهز يخدم.
- [[(healthy)]]: الـ [[HEALTHCHECK]] عدّى. و [[docker inspect --format '{{json .State.Health.Log}}']] بيوريك آخر الفحوص ووقت كل واحد وكود خروجه ([[0]]).
- [[id]]: الكود شغال باليوزر العادي.

وصلنا Redis للـ network باسم [[redis]] ([[docker network connect --alias redis p4net p4redis]]):

~~~text الناتج
{"status":"ready"} 200
~~~

وفصلناه تاني: رجع [[503]] من غير restart ومن غير ما [[/health]] يتأثر.

### جوه الـ container

~~~text الناتج: cmdline لكل process
1 /usr/local/bin/python3.13 /usr/local/bin/uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 2 --proxy-headers
7 ... from multiprocessing.resource_tracker import main;main(6)
8 ... from multiprocessing.spawn import spawn_main; ... --multiprocessing-fork
9 ... from multiprocessing.spawn import spawn_main; ... --multiprocessing-fork
~~~

PID 1 هو uvicorn الأب، و 8 و 9 الـ workers. (الـ slim image مفيهاش [[ps]]، فقرينا [[/proc/*/cmdline]].)

---

## ٥. exec form ولا shell form: [[docker stop]] بالأرقام

~~~text الناتج
CMD ["uvicorn", ...]               docker stop: 2.9s
CMD uvicorn app.main:app ...       docker stop: 10.5s
~~~

وجوه نسخة الـ shell form:

~~~text الناتج
1 /bin/sh -c uvicorn app.main:app --host 0.0.0.0 --port 8000
~~~

PID 1 بقى [[/bin/sh]]، و SIGTERM وصله هو، وهو مبيبعتهوش لـ uvicorn. فـ Docker استنى الـ ١٠ ثواني كاملين وبعت SIGKILL: أي طلب كان شغال اتقطع، والـ lifespan بعد الـ [[yield]] عمره ما اشتغل. ولوج نسخة الـ exec form وقت الـ stop:

~~~text الناتج: docker logs (آخر سطور)
INFO:     Waiting for application shutdown.
INFO:     Application shutdown complete.
INFO:     Finished server process [8]
INFO:     Waiting for child process [9]
INFO:     Stopping parent process [1]
~~~

كل worker قفل الـ lifespan بتاعه ([[aclose()]] للـ Redis)، والأب قفل في الآخر.

---

## ٦. بدايل للـ CMD

| الأمر | إمتى |
|---|---|
| [[CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]]] | worker واحد، في Kubernetes غالبًا |
| [[CMD ["fastapi", "run", "app/main.py", "--port", "8000", "--workers", "2"]]] | نفس الشيء، محتاج [[fastapi[standard]]] في الـ requirements |
| [[CMD ["gunicorn", "app.main:app", "-k", "uvicorn_worker.UvicornWorker", "-w", "2", "-b", "0.0.0.0:8000"]]] | محتاج قتل الـ worker المعلّق ([[--timeout]])، درس «workers و GIL» |

---

## الخلاصة

- الاعتماديات قبل الكود في الـ Dockerfile، و [[.dockerignore]] فيه [[.env]] و [[.venv]].
- يوزر مش root، و [[CMD]] بشكل JSON عشان SIGTERM يوصل لـ uvicorn (٢.٩ ثانية مقابل ١٠.٥).
- [[/health]] = عايش (من غير اعتماديات)، و [[/ready]] = جاهز (بيفحص القاعدة و Redis بـ timeout قصير).
- الـ slim مفيهاش curl: الـ health check بـ Python.`,
          lines: [
            R`[[os]] عشان [[os.environ.get]]: عنوان Redis جاي من متغير بيئة، فنفس الـ image تشتغل على جهازك وفي الإنتاج بعناوين مختلفة من غير ما تتبني تاني.`,
            R`[[asynccontextmanager]] للـ lifespan: الـ client يتعمل مع كل worker ويتقفل لما uvicorn يستلم SIGTERM.`,
            R`الـ client الـ async بتاع Redis، عشان [[/ready]] تعمل [[ping]] من غير ما توقّف الـ event loop.`,
            R`[[Response]] عشان [[/ready]] تغيّر الـ status لـ 503 من غير ما تبني رد بإيدها، و [[Request]] عشان توصل لـ [[app.state]].`,
            R`الـ decorator اللي بيحوّل [[lifespan]] لـ context manager يفهمه FastAPI.`,
            R`[[lifespan]] بتتنادى مرة لكل worker. مع [[--workers 2]] فيه client لكل worker.`,
            R`[[REDIS_URL]] من البيئة، والافتراضي [[redis://redis:6379/0]]: [[redis]] اسم الـ service في Docker Compose أو اسم الـ container على نفس الـ network. و [[socket_connect_timeout=1]] و [[socket_timeout=1]] عشان لو Redis واقع [[/ready]] ترد في ثانية بدل ما تعلّق (من غيرهم اتقاس ٤ ثواني على ويندوز).`,
            R`[[yield]]: التطبيق شغال هنا.`,
            R`بعد الإيقاف: قفل اتصالات Redis. السطر ده بيشتغل بس لو uvicorn استلم SIGTERM فعلًا، يعني مع CMD بشكل exec. مع shell form اتقاس إنه مبيتنفّذش أصلًا.`,
            R`التطبيق، مربوط بالـ lifespan.`,
            R`[[GET /health]] = liveness: «البروسيس عايش والـ loop بيرد». ده اللي الـ [[HEALTHCHECK]] بيناديه.`,
            R`[[async def]] من غير أي I/O، فبترد في ملّي ثانية. لو الـ event loop متقفل بحسبة أو [[time.sleep]]، حتى دي مش هترد، وده بالظبط اللي عايزين نعرفه.`,
            R`رد ثابت. **مفيش** فحص قاعدة ولا Redis هنا: لو القاعدة وقعت مش عايزين restart لكل الـ containers، ده مش هيصلّحها.`,
            R`[[GET /ready]] = readiness: «أقدر أخدم طلبات حقيقية دلوقتي؟». الـ load balancer أو Kubernetes بيسأله قبل ما يبعت ترافيك.`,
            R`[[response: Response]] هو الرد اللي FastAPI هيبعته، فنقدر نغيّر الـ status بتاعه. و [[request]] عشان الـ client في [[app.state]].`,
            R`[[try]] حوالين الفحص، عشان أي فشل يبقى 503 مفهوم بدل 500 وtraceback.`,
            R`[[ping()]] أخف أمر في Redis: بيرجّع [[True]] لو السيرفر بيرد. في مشروع فيه قاعدة، هنا كمان [[SELECT 1]] بـ timeout قصير.`,
            R`[[except Exception]] هنا مقبول لأننا عايزين **أي** فشل (DNS، timeout، اتصال اترفض) يبقى «مش جاهز». اتقاس: من غير Redis على الـ network الخطأ طلع [[TimeoutError]].`,
            R`503 Service Unavailable: «مش جاهز دلوقتي، جرّب بعدين». الـ load balancer بيبطّل يبعتله، ومفيش restart.`,
            R`الرد فيه اسم الخطأ بس ([[type(e).__name__]]) مش رسالته، عشان رسالة الخطأ ممكن يبقى فيها hosts أو باسوردات من الـ URL.`,
            R`كل الاعتماديات ردّت: 200. اتقاس: أول ما Redis اتوصل للـ network الرد بقى [[{"status":"ready"}]] من غير restart.`,
            R`[[FROM]] الـ image الأساسية: Debian صغير وفيه Python 3.13 (١٧٨ ميجا). النسخة الكاملة [[python:3.13]] فيها compilers وأدوات بتكبّرها لحوالي جيجا، ومحتاجها بس لو مكتبة محتاجة تتبني من الـ source.`,
            R`[[PYTHONDONTWRITEBYTECODE=1]] Python ميكتبش [[.pyc]] (ملهاش لازمة في container بيتبني مرة)، و [[PYTHONUNBUFFERED=1]] الـ print واللوج يطلعوا فورًا في [[docker logs]] بدل ما يستنوا buffer يتملي.`,
            R`[[WORKDIR /app]] بيعمل الفولدر لو مش موجود، وكل [[COPY]] و [[RUN]] و [[CMD]] بعده بيشتغل منه. فـ [[app.main:app]] في الـ CMD بيتلاقي جوه [[/app/app/main.py]].`,
            R`ننسخ ملف الـ requirements **لوحده** الأول. Docker بيعمل cache لكل طبقة، فطول ما الملف ده متغيرش، الطبقة اللي بعده (التسطيب) بتتاخد من الـ cache.`,
            R`التسطيب. [[--no-cache-dir]] عشان pip ميسيبش نسخة من اللي نزّله جوه الـ image. ولأنه قبل [[COPY app]]، تعديل في الكود مش بيعيد التسطيب.`,
            R`الكود نفسه بعد الاعتماديات. [[.dockerignore]] بيمنع [[.venv]] و [[.env]] و [[__pycache__]] يدخلوا هنا.`,
            R`يوزر عادي ([[--create-home]] بيعمله فولدر home). الـ slim image بتشتغل root افتراضيًا، فلو حد لقى ثغرة في الكود هيبقى root جوه الـ container.`,
            R`من هنا ورايح كل حاجة (بما فيها الـ CMD) بتشتغل باليوزر ده. اتقاس: [[docker exec ... id]] طلّع [[uid=1000(appuser)]]. وخد بالك إن البورتات تحت 1024 محتاجة root، فبنستخدم 8000.`,
            R`[[EXPOSE]] توثيق بس: بيقول إن التطبيق بيسمع على 8000، ومش بيفتح البورت. اللي بيفتحه [[-p 8000:8000]] في [[docker run]].`,
            R`[[HEALTHCHECK]]: كل ١٠ ثواني ([[--interval]]) بيشغّل Python يفتح [[/health]] بحد ثانيتين، ولو اتصال اترفض أو رد 500، [[urlopen]] بيرمي فكود الخروج ١. بعد ٣ فشل ورا بعض ([[--retries]]) الحالة [[unhealthy]]، و [[--start-period=5s]] مهلة للتطبيق يقوم. بـ Python مش curl لأن الـ slim مفيهاش curl.`,
            R`[[CMD]] بشكل JSON (exec form): uvicorn نفسه PID 1 فبيستلم SIGTERM من [[docker stop]] ويقفل بنضافة (اتقاس ٢.٩ ثانية، مقابل ١٠.٥ بشكل shell). و [[--host 0.0.0.0]] لازم: [[127.0.0.1]] جوه الـ container مش بيتوصل من برّه. و [[--workers 2]] على VM، و [[--proxy-headers]] عشان IP العميل الحقيقي ورا Nginx.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، اكتب الفرق بين liveness و readiness في سطرين، وإيه اللي يحصل في Kubernetes لو كل واحد فيهم فشل، وأنهي واحد المفروض يفحص القاعدة.`, done: R`liveness فشل = restart للـ container، و readiness فشل = يطلع من الـ load balancer من غير restart، والقاعدة في readiness بس، ومعاك سبب ليه مش في liveness.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** Dockerfile فيه [[COPY . .]] وبعده [[RUN pip install -r requirements.txt]]. غيّرت سطر في [[main.py]] وعملت build تاني. أنهي خطوات هتتعاد؟ وبعدين اعكس الترتيب وقيس الـ build التاني في الحالتين بـ [[time]].`, done: R`في الترتيب الغلط الـ pip اتعاد (الوقت عشرات الثواني)، وفي الصح الـ build التاني أخد ثواني وفيه [[CACHED]] قدام خطوة الـ pip.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** Dockerfile فيه [[HEALTHCHECK CMD curl -f http://localhost:8000/health]] على [[python:3.13-slim]] و [[CMD fastapi dev app/main.py]]. شغّله وشوف [[docker ps]] بعد دقيقة، واقرا [[.State.Health.Log]]، وصلّح الاتنين.`, done: R`قبل التصليح الحالة [[unhealthy]] واللوج فيه [[curl: not found]] (أو نص الخطأ اللي طلعلك بالظبط)، وبعد التصليح [[(healthy)]] والـ CMD بشكل JSON ومن غير [[dev]] (مفيش reload في الإنتاج).` },
            { lvl: 'تطبيق', t: R`**قيس:** نفس الـ image مرة بـ CMD بشكل exec ومرة بشكل shell، و [[time docker stop]] لكل واحدة، واقرا آخر ٥ سطور من [[docker logs]] في الاتنين.`, done: R`عندك رقمين قريبين من ٣ و ١٠ ثواني، ولوج الـ exec فيه [[Application shutdown complete]] ولوج الـ shell مفيهوش، وكاتب السبب (PID 1).` },
            { lvl: 'تحدي', t: R`**ابني:** [[compose.yaml]] فيه [[api]] و [[redis]]، و [[depends_on]] بـ [[condition: service_healthy]] و Redis ليه healthcheck بـ [[redis-cli ping]]، والـ API بياخد [[REDIS_URL]] من [[environment]].`, done: R`[[docker compose up -d]] بيستنى Redis يبقى healthy قبل ما يشغّل الـ API، و [[curl localhost:8000/ready]] بيرجّع 200، و [[docker compose stop redis]] بيخلّيه 503 في أقل من ثانيتين، و [[docker compose down]] بيقفل في أقل من ٥ ثواني.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** اختبارين بـ TestClient لـ [[/ready]] من غير Redis حقيقي: بعد الـ startup بدّل [[app.state.redis]] بـ object فيه [[async def ping]] بترجّع [[True]] مرة وبترمي [[ConnectionError]] مرة، و [[async def aclose]] فاضية (الـ lifespan بيناديها وقت الإيقاف، ومن غيرها الاختبار يقع في الآخر بـ [[AttributeError]]).`, done: R`الاتنين بيعدّوا: واحد 200 و [[{"status": "ready"}]]، والتاني 503 و [[{"status": "not ready", "redis": "ConnectionError"}]]، ومن غير ما Redis يكون شغال على الجهاز.` },
          ],
          sol: R`[[/health]] بيرجّع [[{"status":"ok"}]] على طول، و [[/ready]] من غير Redis [[{"status":"not ready","redis":"TimeoutError"}]] بـ 503 (في تجربتنا، لأن [[redis]] مش موجود على الـ network، والـ timeout ثانية). وبعد [[docker network create]] و Redis باسم [[redis]] على نفس الـ network، [[/ready]] بقى [[{"status":"ready"}]] و 200، و [[docker ps]] بيقول [[Up ... (healthy)]].

و [[time docker stop]]: بالـ CMD بشكل JSON حوالي ٣ ثواني (عندنا ٢.٩) ولوج الـ shutdown ظاهر في [[docker logs]]، وبشكل shell حوالي ١٠ ثواني ونص (عندنا ١٠.٥) ومفيش ولا سطر shutdown: الـ PID 1 بقى [[/bin/sh -c ...]]، والـ shell مبيبعتش SIGTERM لـ uvicorn، فـ Docker استنى مهلته (١٠ ثواني) وبعت SIGKILL.`
        }
      ]
    }
]);

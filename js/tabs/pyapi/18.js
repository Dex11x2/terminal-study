// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "الأداء والإنتاج",
      l: 3,
      n: "workers والـ GIL والحسابات التقيلة، و logging منظم، وتقيس قبل ما تحسّن",
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
            "asyncio.",
            "لـ PID.",
            "pool من processes.",
            "الـ lifespan.",
            "FastAPI.",
            "حسبة CPU خالصة: الـ GIL بيمنعها تستفيد من threads.",
            "ملايين العمليات بـ Python.",
            "lifespan.",
            "بيتنادى مرة.",
            "processes جاهزة للحسابات، وبتتقفل مع التطبيق.",
            "خزّنها.",
            "التطبيق شغال.",
            "التطبيق.",
            "route.",
            "async، والحسبة مش هتقفل الـ loop.",
            "الـ loop الحالي.",
            "ابعت الحسبة لـ process تانية واستنى من غير ما تقفل حد.",
            "الـ PID بيوريك أنهي worker اللي رد."
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
            "JSON.",
            "logging.",
            "stdout.",
            "التوقيت.",
            "formatter بيطلّع كل رسالة JSON في سطر.",
            "الدالة اللي بتتنادى لكل رسالة.",
            "الوقت والـ level واسم الـ logger والرسالة.",
            "فيه exception؟",
            "ضيف الـ traceback.",
            "سطر JSON، والعربي يفضل عربي.",
            "اكتب على stdout (Docker بيجمعه).",
            "بالشكل ده.",
            "جهّز الـ root logger مرة واحدة: INFO وفوق.",
            "logger باسم الـ module.",
            "ابدأ القياس.",
            R`[[%s]] مش f-string: الـ formatting بيحصل بس لو الرسالة هتتطبع.`,
            "أقل من INFO: مش هيتطبع.",
            "كود هيرمي.",
            "قسمة على صفر.",
            "امسك.",
            "ERROR ومعاه الـ traceback كامل.",
            "الوقت بالملّي ثانية."
          ],
          sol: R`هتشوف ٣ سطور JSON: [[{"ts": "2026-...", "level": "INFO", "logger": "__main__", "msg": "order created id=42 total=1500"}]]، وبعدين سطر [[ERROR]] فيه مفتاح [[exc]] جواه الـ traceback كله كـ string واحد ([[ZeroDivisionError: division by zero]] في آخره)، وبعدين [[took 3.9ms]] أو قريب منها. سطر الـ debug مش موجود. ولما تغيّر لـ [[DEBUG]] هيظهر سطر زيادة بـ [[level: DEBUG]]. الـ traceback في سطر واحد هو المطلوب: أدوات زي Loki أو CloudWatch بتعتبر كل سطر حدث لوحده.

و [[py-spy top --pid]] بيعرض جدول زي [[top]] بالدوال اللي واخدة أكتر وقت، ولو بتبعت طلبات على route تقيل هتلاقي الدالة بتاعتك (مثلًا [[heavy_report (main.py:6)]]) فوق. و [[py-spy dump --pid]] بيطبع الـ stack الحالي لكل thread، ومفيد جدًا لما السيرفر معلّق ومش عارف واقف فين. ولو قالك [[Permission denied]]، شغّله بـ [[sudo]] (على Linux و macOS محتاج صلاحية تقرا ذاكرة بروسيس تاني). وخد بالك: الـ PID الصح هو بتاع الـ worker، مش بتاع الـ reloader في [[fastapi dev]].`
        }
      ]
    }
]);

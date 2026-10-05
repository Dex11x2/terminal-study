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
    },
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "الأسئلة اللي بتتكرر في انترفيوهات Python و FastAPI، بإجابة تقولها بصوتك في دقيقة، والأسئلة اللي بتيجي بعدها",
      items: [
        {
          cmd: "الـ default بيتحسب مرة",
          title: "ليه def f(items=[]) غلطة؟ (Mutable default argument)",
          desc: R`الـ default بيتحسب مرة واحدة وقت تعريف الدالة، مش مع كل نداء. فلو الـ default list أو dict، كل النداءات اللي مبعتتش قيمة بتشارك نفس الـ object، وأي [[append]] بيفضل للنداء اللي بعده. الحل: [[None]] كـ default وتعمل list جديدة جوه الدالة. ونفس المشكلة مع [[datetime.now()]] كـ default: الوقت بيتثبّت على لحظة تحميل الـ module. وفي dataclass الحل [[field(default_factory=list)]]، وفي Pydantic الـ default بيتنسخ لكل object فمش مشكلة.`,
          example: R`def add(item, items=[]):
    items.append(item)
    return items
add(1); print(add(2))    # [1, 2] مش [2]
def add_ok(item, items: list | None = None):
    items = [] if items is None else items
    items.append(item)
    return items`,
          try: R`اطبع [[add.__defaults__]] بعد كل نداء، وشوف الـ list اللي متخزنة في الدالة نفسها بتكبر.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم إن الدوال objects، وإن التعريف نفسه كود بيتنفذ، والفرق بين mutable و immutable.",
            how: R`الـ [[def]] statement بيتنفذ مرة: بيعمل function object ويحسب الـ defaults ويخزّنها في [[__defaults__]]. وكل نداء من غير الباراميتر بياخد نفس الـ object ده. ومع الـ immutable (int و str و None و tuple) مفيش مشكلة لأن محدش يقدر يعدّله. والـ linters بتمسكها (ruff: B006).`,
            when: R`«طب ينفع تستغلها عن قصد كـ cache؟» (بتشتغل، بس [[functools.cache]] أوضح)، و «إيه الفرق في dataclass و Pydantic؟»، و «ليه [[datetime.now()]] كـ default غلط برضه؟».`,
            mistakes: R`«الـ list بتتصفّر مع كل نداء». و «دي bug في Python». ومش عارف ليه [[None]] هو الحل.`
          },
          lines: [
            "الـ list دي اتعملت مرة واحدة وقت التعريف.",
            "بتتعدّل مكانها.",
            "بترجع نفس الـ object.",
            "النداء التاني شاف اللي ضافه الأول.",
            "None ثابت ومبيتعدلش.",
            "list جديدة لكل نداء.",
            "آمن.",
            "رجّع."
          ],
          sol: R`الناتج: قبل أي نداء [[([],)]]، وبعد [[add(1)]] بقت [[([1],)]]، وبعد [[add(2)]] بقت [[([1, 2],)]]. و [[add(3, [])]] مش بتغيّرها، لأن إنت بعت list بتاعتك. و [[add.__defaults__[0] is add(4)]] بترجع [[True]]: الـ list اللي بترجعلك هي نفس الـ object المتخزن جوه الدالة.

الإجابة اللي بتتقال في الانترفيو: الـ default بيتحسب مرة واحدة لما سطر [[def]] يتنفّذ، ويتخزن في [[__defaults__]]، فكل النداءات بتشارك نفس الـ list. عشان كده الـ default المتغير (list أو dict أو set) بيبقى [[None]]، وتعمل الجديد جوه الدالة. ونفس الفخ مع [[datetime.now()]] كـ default: هيفضل وقت تعريف الدالة للأبد.`
        },
        {
          cmd: "الـ GIL",
          title: "إيه هو الـ GIL وبيأثر على إيه؟ (What is the GIL?)",
          desc: R`الـ GIL قفل في CPython بيسمح لـ thread واحد بس ينفّذ Python bytecode في نفس اللحظة جوه الـ process. موجود عشان يحمي الـ reference counting ويخلّي الـ interpreter بسيط وسريع في الـ thread الواحد. تأثيره: الـ threads مبتسرّعش الحسابات المكتوبة بـ Python، بس بتنفع جدًا في الـ I/O لأن الـ thread بيسيب الـ GIL وهو مستني، ومكتبات C زي numpy بتسيبه كمان. فللـ I/O: async أو threads، وللـ CPU: processes (multiprocessing أو كذا worker) أو مكتبة C. و Python 3.14 فيها build رسمي من غير GIL (free-threaded، [[python3.14t]]) بس لسه مش الافتراضي.`,
          example: R`import threading, time
def count(n: int) -> None:
    while n:
        n -= 1
start = time.perf_counter()
threads = [threading.Thread(target=count, args=(20_000_000,)) for _ in range(2)]
for t in threads: t.start()
for t in threads: t.join()
print(f"{time.perf_counter() - start:.2f}s")  # تقريبًا نفس وقت ما تعدّهم ورا بعض`,
          try: R`قارن الوقت ده بنداء [[count]] مرتين ورا بعض، وبعدين بـ [[ProcessPoolExecutor]]، ولو عندك [[python3.14t]] جرّبه عليه.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم ليه Python بيتصرف كده في الـ concurrency، وإنك بتختار الأداة الصح: threads ولا async ولا processes.",
            how: R`CPython بيعد الـ references لكل object (reference counting)، ومن غير قفل، threads بتعدّل العدد مع بعض كانت هتبوّظ الذاكرة. والـ GIL حل بسيط: قفل واحد كبير. والـ thread بيسيبه كل فترة ([[sys.getswitchinterval()]]، يعني 5ms) وعند أي I/O. والـ GIL مش بيحمي كودك انت: [[x += 1]] من threads كتير لسه race condition ومحتاج [[threading.Lock]]. والـ free-threaded build (PEP 703، ورسمي في 3.14 بـ PEP 779) بيستخدم locks أصغر، وأبطأ شوية في الـ thread الواحد.`,
            when: "«الفرق بين threading و multiprocessing و asyncio؟»، و «ليه FastAPI سريع مع وجود الـ GIL؟» (لأن الشغل I/O)، و «الـ GIL بيحميني من race conditions؟» (لأ)، و «إيه اللي اتغير في 3.13 و 3.14؟».",
            mistakes: "«Python مبيعرفش يعمل multithreading». و «الـ GIL بيخلي الكود thread-safe». و «async بيستخدم كذا core»."
          },
          lines: [
            "threading و time.",
            "حسبة CPU خالصة.",
            "loop.",
            "Python bytecode: محتاج الـ GIL.",
            "ابدأ القياس.",
            "threadين.",
            "ابدأهم.",
            "استناهم.",
            "مفيش تسريع: واحد بس بيشتغل في كل لحظة."
          ],
          sol: R`الأرقام بتختلف حسب الجهاز، بس الشكل ثابت: عدّ مرتين ورا بعض وعدّهم في threadين بياخدوا نفس الوقت تقريبًا (عندنا [[1.13s]] و [[1.14s]])، لأن الـ GIL بيسمح لـ thread واحد بس ينفّذ Python bytecode في نفس اللحظة. مع [[ProcessPoolExecutor(2)]] الوقت بيقرب من النص (عندنا [[0.77s]] على container محدود، وعلى جهاز فيه cores فاضية بيقرب أكتر من النص)، لأن كل بروسيس ليه interpreter و GIL بتوعه.

وعلى [[python3.14t]] (free-threaded، و [[sys._is_gil_enabled()]] بيرجع [[False]]) الـ threads بقت أسرع من الترتيب فعلًا (عندنا [[0.41s]] مقابل [[0.65s]]). الإجابة في الانترفيو: الـ GIL بيمنع التوازي في كود CPU بـ threads، بس مش بيأثر على I/O لأن الـ thread بيسيب الـ GIL وهو مستني. فللـ CPU استخدم processes أو مكتبة بتسيب الـ GIL (زي numpy) أو free-threaded build، وللـ I/O الـ threads أو async كفاية. ولو الـ threads عندك طلعت أبطأ بشكل واضح من الترتيب، ده بسبب التبديل بين الـ threads على الـ GIL، وده طبيعي.`,
          solCode: R`import threading
import time
from concurrent.futures import ProcessPoolExecutor
def count(n: int) -> None:
    while n:
        n -= 1
if __name__ == "__main__":
    N = 20_000_000
    start = time.perf_counter()
    count(N)
    count(N)
    print(f"ورا بعض: {time.perf_counter() - start:.2f}s")
    start = time.perf_counter()
    threads = [threading.Thread(target=count, args=(N,)) for _ in range(2)]
    for t in threads:
        t.start()
    for t in threads:
        t.join()
    print(f"threads: {time.perf_counter() - start:.2f}s")
    start = time.perf_counter()
    with ProcessPoolExecutor(2) as pool:
        list(pool.map(count, [N, N]))
    print(f"processes: {time.perf_counter() - start:.2f}s")`
        },
        {
          cmd: "list و tuple و set و dict",
          title: "إمتى list وإمتى tuple وإمتى set وإمتى dict؟ (Choosing a data structure)",
          desc: R`الـ list مرتبة وبتتعدّل، للي هتلف عليه أو تضيف عليه، والبحث فيها O(n). والـ tuple مرتبة ومبتتعدّلش، للقيم الثابتة المرتبطة ببعض ولما دالة ترجع كذا قيمة، و hashable فتنفع مفتاح. والـ set من غير تكرار ومن غير ترتيب، للعضوية ([[in]] بـ O(1)) وشيل التكرار وعمليات المجموعات. والـ dict مفتاح لقيمة، O(1) للبحث بالمفتاح، ومرتب بترتيب الإضافة من 3.7. والسبب إن set و dict سريعين إنهم hash tables، وده نفسه سبب إن المفاتيح لازم تبقى hashable.`,
          example: R`ids_list = list(range(100_000))
ids_set = set(ids_list)
99_999 in ids_list   # O(n): بيلف على الكل
99_999 in ids_set    # O(1): hash مباشرة
point = (30.0, 31.2)
cache = {point: "Cairo"}`,
          try: R`قيس الفرق بـ [[python -m timeit -s "l=list(range(100000)); s=set(l)" "99999 in l"]] ونفس الأمر مع [[s]].`,
          flag: "script",
          deep: {
            why: "بيختبر إنك بتفكر في الـ complexity مش في الـ syntax، وده بيفرق في أي endpoint بيعالج داتا كتير.",
            how: R`الـ hash table: [[hash(key)]] بيحدد الخانة، والتصادمات بتتحل بـ open addressing، فالمتوسط O(1) وأسوأ حالة O(n). والـ dict بيكبر لما يتملى (بيعيد التوزيع)، فالإضافة O(1) في المتوسط. والـ tuple أخف من الـ list في الذاكرة وبتتعمل أسرع. وفيه كمان [[deque]] للإضافة والشيل من الناحيتين بـ O(1)، و [[heapq]] لأصغر عنصر.`,
            when: R`«الـ dict بيشتغل إزاي من جوه؟»، و «ليه list مينفعش تبقى مفتاح؟»، و «أسرع طريقة تشيل التكرار وتحافظ على الترتيب؟» ([[dict.fromkeys]])، و «الـ complexity بتاع [[list.insert(0, x)]]؟» (O(n)).`,
            mistakes: R`«tuple عشان أسرع» من غير ما تعرف ليه. و «الـ dict مش مرتب». و [[in]] على list جوه loop وتستغرب البطء.`
          },
          lines: [
            "list فيها 100 ألف عنصر.",
            "نفس العناصر في set.",
            "بيقارن عنصر عنصر لحد الآخر.",
            "بيحسب الـ hash ويروح للخانة على طول.",
            "tuple: ثابتة و hashable.",
            "فتنفع مفتاح في dict."
          ],
          sol: R`عندنا: [[99999 in l]] أخدت [[461 usec per loop]]، و [[99999 in s]] أخدت [[21.7 nsec per loop]]، يعني الـ set أسرع بحوالي ٢٠ ألف مرة هنا. الأرقام عندك هتختلف بس النسبة قريبة.

الـ list بتلف عنصر عنصر لحد ما تلاقيه، و 99999 آخر عنصر فده أسوأ حالة (O(n)). الـ set بتحسب الـ hash وتروح للمكان على طول (O(1) في المتوسط). ولو جربت [[0 in l]] هتلاقيها سريعة جدًا ([[12.7 nsec]])، لأنها أول عنصر، فالقياس لازم يبقى على أسوأ حالة. والخلاصة للانترفيو: لو هتسأل «موجود ولا لأ» كتير، حوّل لـ set مرة واحدة الأول. بس التحويل نفسه O(n)، فلسؤال واحد بس مش هيفرق.`
        },
        {
          cmd: "generator مقابل list",
          title: "إيه الفرق بين generator و list؟ وإمتى تستخدمه؟ (Generators vs lists)",
          desc: R`الـ list بتحسب كل العناصر وتخزّنها في الذاكرة مرة واحدة. والـ generator بيحسب عنصر عنصر لما حد يطلبه (lazy)، فالذاكرة ثابتة مهما كان العدد، بس مينفعش تلف عليه غير مرة واحدة، ومفيهوش [[len]] ولا index. بستخدمه مع الداتا الكبيرة أو الـ stream (ملف لوج، صفوف قاعدة)، وفي pipelines من خطوات، ومع [[sum]] و [[any]]. والـ [[yield]] نفسه أساس [[@contextmanager]] والـ dependencies والـ lifespan في FastAPI.`,
          example: R`import sys
squares_list = [i * i for i in range(1_000_000)]
squares_gen = (i * i for i in range(1_000_000))
print(sys.getsizeof(squares_list), sys.getsizeof(squares_gen))   # حوالي 8MB مقابل أقل من 1KB
print(sum(squares_gen))
print(sum(squares_gen))   # 0: اتستهلك`,
          try: R`اعمل generator بيقرا ملف ويفلتر السطور اللي فيها ERROR، وحط فوقه [[itertools.islice]] يطلّع أول ١٠ بس. اتأكد إن الملف مش بيتقري كله.`,
          flag: "script",
          deep: {
            why: "بيختبر فهمك للذاكرة والـ lazy evaluation، وبيفتح أسئلة عن yield والـ iterators.",
            how: R`أي object فيه [[__iter__]] و [[__next__]] هو iterator، والـ generator أسهل طريقة تعمل واحد. و [[yield from]] بيفوّض لـ generator تاني. و [[send()]] بيبعت قيمة جوه الـ generator (وده كان أساس الـ coroutines قبل async و await). و [[range]] مش generator: ده sequence lazy بيدعم [[len]] والـ index وتلف عليه أكتر من مرة.`,
            when: R`«اكتب generator بيقرا ملف ضخم»، و «الفرق بين [[return]] و [[yield]]؟»، و «يعني إيه iterator protocol؟»، و «الـ dependency اللي فيها yield في FastAPI بتشتغل إزاي؟».`,
            mistakes: "«الـ generator أسرع دايمًا» (للداتا الصغيرة الـ list غالبًا أسرع). و «range ده generator». ونسيان إنه بيتستهلك مرة واحدة."
          },
          lines: [
            "لقياس الحجم.",
            "list: المليون رقم في الذاكرة.",
            "generator: ولا رقم اتحسب لسه.",
            "الفرق في الذاكرة ضخم.",
            "بيحسب ويجمع واحد واحد.",
            "المرة التانية فاضي."
          ],
          sol: R`الفكرة إنك تركّب generators فوق بعض: واحد بيقرا السطور، وواحد بيفلتر، و [[islice(..., 10)]] بياخد أول ١٠ ويقف. عشان تتأكد إن الملف مش بيتقري كله، عِد السطور اللي اتقرت فعلًا. على ملف مليون سطر فيه ERROR كل ألف سطر، الناتج [[10 lines_read: 10000]]: قرا لحد الـ ERROR العاشر ووقف، مش المليون.

لو [[lines_read]] طلع 1000000، يبقى في مكان حوّلت لـ list: [[f.readlines()]] أو [[list(...)]] أو [[[l for l in f if ...]]] بأقواس مربعة. وخد بالك إن الملف بيفضل مفتوح لحد ما الـ generator يتقفل أو يتمسح، فلو هتوقف بدري في كود طويل العمر، اقفله صراحة أو خلّي الـ [[with]] برّه.`,
          solCode: R`from itertools import islice
lines_read = 0
def read_lines(path: str):
    global lines_read
    with open(path, encoding="utf-8") as f:
        for line in f:
            lines_read += 1
            yield line.rstrip("\n")
def errors(lines):
    return (l for l in lines if "ERROR" in l)
first10 = list(islice(errors(read_lines("app.log")), 10))
print(len(first10), "lines_read:", lines_read)`
        },
        {
          cmd: "decorator بإيدك",
          title: "اكتبلي decorator يقيس وقت أي دالة (Write a decorator)",
          desc: R`الـ decorator دالة بتاخد دالة وترجع دالة تلفها. بكتب [[wrapper(*args, **kwargs)]] عشان يقبل أي باراميترات، وبحط [[@functools.wraps(fn)]] عشان الاسم والـ signature يفضلوا (و FastAPI بيقرا الـ signature)، وبنادي الأصلية جوه try و finally عشان الوقت يتسجّل حتى لو رمت. ولو الدالة async، الـ wrapper لازم يبقى async ويعمل await. و [[@x]] فوق الدالة هي بالظبط [[f = x(f)]].`,
          example: R`import functools, time
def timed(fn):
    @functools.wraps(fn)
    async def wrapper(*args, **kwargs):
        start = time.perf_counter()
        try:
            return await fn(*args, **kwargs)
        finally:
            print(fn.__name__, f"{(time.perf_counter() - start) * 1000:.1f}ms")
    return wrapper`,
          try: R`خلّيه يشتغل مع الدوال الـ sync والـ async الاتنين: افحص بـ [[inspect.iscoroutinefunction(fn)]] ورجّع الـ wrapper المناسب.`,
          flag: "script",
          deep: {
            why: "بيختبر الـ closures، والدوال كـ objects، و *args و **kwargs في سؤال واحد، وبيوريك هتكتب كود قابل لإعادة الاستخدام ولا لأ.",
            how: R`الـ closure: [[wrapper]] بيفتكر [[fn]] من الـ scope اللي اتعمل فيه. والـ decorator اللي بياخد باراميتر ([[@retry(3)]]) ٣ طبقات: دالة بترجع decorator. ولما يبقى فيه كذا decorator، بيتطبقوا من تحت لفوق. وفي FastAPI، decorator على route لازم يحافظ على الـ signature وإلا الباراميترات مش هتتقري صح، وغالبًا dependency أنضف.`,
            when: R`«decorator بباراميترات؟»، و «ترتيب كذا decorator؟»، و «class decorator؟»، و «wraps بتعمل إيه بالظبط؟» ([[__name__]] و [[__doc__]] و [[__wrapped__]]).`,
            mistakes: R`نسيان [[return]]. ونسيان [[wraps]]. و wrapper sync لدالة async (بيرجع coroutine مش القيمة، والوقت المقاس صفر).`
          },
          lines: [
            "الأدوات.",
            "بياخد الدالة.",
            "حافظ على الاسم والـ signature.",
            "async عشان الدالة الأصلية async.",
            "ابدأ.",
            "try...",
            "...نادي الأصلية ورجّع ناتجها.",
            "في كل الأحوال...",
            "...اطبع الوقت.",
            "رجّع الـ wrapper."
          ],
          sol: R`الحل: جوه الـ decorator اسأل [[inspect.iscoroutinefunction(fn)]]، لو True رجّع wrapper [[async def]] بيعمل [[await fn(...)]]، ولو False رجّع wrapper عادي. الناتج مع الكود تحت: [[slow_sum 24.9ms]] وبعده [[499999500000]]، وبعدين [[fetch 102.0ms]] و [[done]]. و [[inspect.iscoroutinefunction(fetch)]] بعد الـ decorator لسه [[True]]، وده مهم لأن FastAPI بيسأل نفس السؤال عشان يقرر يشغّل الدالة على الـ loop ولا في threadpool.

الغلطة لو استخدمت الـ async wrapper بتاع المثال على دالة sync: [[f()]] مبترجعش 1، بترجع [[<coroutine object f at 0x...>]] ومعاها [[RuntimeWarning: coroutine 'f' was never awaited]]، ولو عملتلها await هترمي [[TypeError: object int can't be used in 'await' expression]]. ولو عملت wrapper sync على دالة async، التوقيت هيطلع صفر تقريبًا لأنه بيقيس عمل الـ coroutine مش تشغيلها.`,
          solCode: R`import asyncio
import functools
import inspect
import time
def timed(fn):
    if inspect.iscoroutinefunction(fn):
        @functools.wraps(fn)
        async def async_wrapper(*args, **kwargs):
            start = time.perf_counter()
            try:
                return await fn(*args, **kwargs)
            finally:
                print(fn.__name__, f"{(time.perf_counter() - start) * 1000:.1f}ms")
        return async_wrapper
    @functools.wraps(fn)
    def sync_wrapper(*args, **kwargs):
        start = time.perf_counter()
        try:
            return fn(*args, **kwargs)
        finally:
            print(fn.__name__, f"{(time.perf_counter() - start) * 1000:.1f}ms")
    return sync_wrapper
@timed
def slow_sum(n: int) -> int:
    return sum(range(n))
@timed
async def fetch() -> str:
    await asyncio.sleep(0.1)
    return "done"
print(slow_sum(1_000_000))
print(asyncio.run(fetch()))`
        },
        {
          cmd: "Depends بيعمل إيه",
          title: "الـ dependency injection في FastAPI بيشتغل إزاي، وليه مفيد؟ (FastAPI dependencies)",
          desc: R`الـ route بيعلن هو محتاج إيه في الـ signature ([[user: CurrentUser]] و [[conn: Conn]])، و FastAPI بيبني شجرة الـ dependencies من الـ signatures ويحلها مع كل request: ينادي كل واحدة مرة (فيه cache جوه الـ request)، ويبعت النواتج. والـ dependency ممكن تقرا query و headers، وتعتمد على dependencies تانية، وترمي HTTPException توقف الطلب، أو تعمل yield عشان تنضّف بعد الـ request. الفايدة: الكود المشترك (auth و DB و pagination) في مكان واحد، والتوثيق بيتولد منه، وفي الاختبارات [[dependency_overrides]] بيبدّل أي حاجة من غير mocks.`,
          example: R`async def get_db(request: Request):
    async with request.app.state.pool.acquire() as conn:
        yield conn
DB = Annotated[asyncpg.Connection, Depends(get_db)]
@app.get("/me")
async def me(user: CurrentUser, db: DB):
    return await db.fetchrow("SELECT id, email FROM users WHERE id = $1", user.id)
app.dependency_overrides[get_db] = fake_db`,
          try: R`ارسم شجرة الـ dependencies لـ route عندك فيه auth و DB و pagination، وحدد مين بيتنادى الأول، ومين بيتقفل الأول.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم أهم فكرة في FastAPI، مش بس بتكتب routes. وبيفتح أسئلة عن الاختبارات ودورة حياة الـ request.",
            how: R`FastAPI بيحلل الـ signatures مرة وقت ما التطبيق يقوم (مش مع كل request)، ويعمل لكل route قايمة dependencies مترتبة. والـ dependencies اللي فيها yield بتتقفل بالعكس (آخر واحدة اتفتحت أول واحدة تتقفل)، والافتراضي بعد ما الرد يتبعت، و [[scope="function"]] قبله. واللي بـ [[def]] بتشتغل في threadpool. والفرق عن الـ middleware: الـ dependency على routes معينة وبترجع قيمة للـ route، والـ middleware على كل الطلبات ومفيش قيمة.`,
            when: R`«الفرق بين dependency و middleware؟»، و «dependency بتتنادى كام مرة لو اتطلبت مرتين؟» (مرة، إلا لو [[use_cache=False]])، و «إزاي تختبر route محمي؟»، و «الكود اللي بعد yield بيشتغل إمتى؟».`,
            mistakes: R`«Depends بيعمل singleton» (لأ، لكل request). و [[Depends(get_db())]] بالقوسين. وتعمل الـ pool نفسه جوه dependency بتتنادى مع كل request بدل الـ lifespan.`
          },
          lines: [
            "dependency بـ yield.",
            "خد اتصال من الـ pool.",
            "ادّيه للـ route، وبعد الـ request يرجع للـ pool.",
            "نوع قابل لإعادة الاستخدام.",
            "route.",
            "بيعلن هو محتاج إيه بس.",
            "استخدمهم.",
            "في الاختبارات: بدّلها."
          ],
          sol: R`إجابة نموذجية لـ route زي [[GET /orders]] فيه [[user: CurrentUser]] و [[db: DB]] و [[page: PageDep]]، و [[CurrentUser]] نفسها معتمدة على [[oauth2]] (التوكن من الـ header) و [[DB]]:

الشجرة: [[list_orders]] تحتها [[current_user]] (وتحتها [[oauth2]] و [[get_db]])، و [[get_db]]، و [[pagination]] (تحتها query params). الترتيب: FastAPI بيحل الأعمق الأول، فـ [[oauth2]] بيقرا الـ header، و [[get_db]] بيعمل [[acquire]] ويوقف عند الـ [[yield]]، وبعدين [[current_user]] بيستخدمهم، و [[pagination]] في أي وقت لأنها مستقلة، والـ route في الآخر. و [[get_db]] بيتنادى مرة واحدة بس مع إن اتنين طالبينه، لأن FastAPI بيعمل cache للنتيجة جوه نفس الطلب (إلا لو [[use_cache=False]]).

والقفل عكس الفتح (زي stack): اللي عمل yield الأخير بيكمّل الأول، فالـ connection بيرجع للـ pool بعد ما كل اللي فوقه خلص. ولو أي dependency رمت HTTPException (مثلًا التوكن غلط)، الـ route مش بيتنادى أصلًا، والـ dependencies اللي عملت yield بتتقفل برضه. النقطة اللي بتميزك في الانترفيو: [[dependency_overrides[get_db]]] بيبدّل العقدة دي في الشجرة كلها، فالاختبار ميلمسش قاعدة حقيقية.`
        },
        {
          cmd: "Pydantic v2 عمل إيه",
          title: "Pydantic بيعمل إيه في FastAPI؟ وإيه اللي اتغير في v2؟ (Pydantic in FastAPI)",
          desc: R`Pydantic بيفحص ويحوّل الداتا وقت التشغيل من الـ type hints: الـ body والـ query والإعدادات بتتفحص وتتحوّل لـ objects مضمونة، والرد بيتفلتر بالـ response model، و JSON Schema بيطلع للـ docs. و v2 اتعاد كتابة الـ core بتاعه بـ Rust (pydantic-core) فبقى أسرع بكتير، والـ API اتغير: [[model_dump]] و [[model_validate]] بدل [[dict]] و [[parse_obj]]، و [[field_validator]] بدل [[validator]]، و [[ConfigDict]] بدل [[class Config]]، و [[from_attributes]] بدل [[orm_mode]]. و FastAPI الحديث بيخلّي Pydantic يعمل JSON الرد مباشرة في Rust، ومبقاش بيدعم v1 خالص.`,
          example: R`class User(BaseModel):
    model_config = ConfigDict(from_attributes=True, extra="forbid")
    id: int
    email: EmailStr
user = User.model_validate({"id": "5", "email": "a@example.com"})
user.model_dump(mode="json")   # {'id': 5, 'email': 'a@example.com'}`,
          try: R`حوّل موديل مكتوب بـ v1 (من مثال قديم على النت مثلًا) لـ v2، وشغّله بـ [[python -W error::DeprecationWarning]] عشان أي حاجة قديمة فاتتك تبقى error.`,
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم ليه FastAPI بيفحص من غير ما تكتب كود فحص، وإنك متابع التغييرات ومش بتكتب v1.",
            how: R`الوضع الافتراضي lax: [["5"]] بيبقى 5، و [[strict]] بيمنع التحويل. والـ validation بيحصل وقت الإنشاء بس (إلا لو [[validate_assignment]]). و [[model_construct]] بيعمل object من غير فحص (للداتا الموثوقة بس). وفي FastAPI: الـ 422 من فشل فحص الطلب، والـ 500 ([[ResponseValidationError]]) من فشل فحص الرد.`,
            when: R`«الفرق بين dataclass و BaseModel؟» (الفحص)، و «إزاي تعمل validation بين حقلين؟» ([[model_validator]])، و «Pydantic بيبطّأ؟»، و «إزاي ترفض الحقول الزيادة؟».`,
            mistakes: "«Pydantic بيعمل type hints بس». وأمثلة v1. و «الـ response model للتوثيق بس» (ده بيفلتر الداتا كمان)."
          },
          lines: [
            "موديل.",
            "إعدادات v2: يقرا من objects، ويرفض الزيادة.",
            "حقل.",
            "بيفحص الإيميل.",
            R`[["5"]] اتحوّل 5 (lax mode).`,
            "dict بأنواع JSON."
          ],
          sol: R`موديل v1 نموذجي فيه [[class Config: orm_mode = True]] و [[@validator("email")]] و [[User.parse_obj(...)]] و [[u.dict()]] و [[u.json()]]. ولو شغّلته على Pydantic 2 عادي هيشتغل، بس مع تحذيرات [[PydanticDeprecatedSince20]] لكل واحدة: «The parse_obj method is deprecated; use model_validate instead» ونفس الكلام لـ [[dict]] و [[json]] و [[@validator]] و [[class Config]]، و [[orm_mode]] بيطلع تحذير إنه اتسمّى [[from_attributes]]. ومع [[python -W error::DeprecationWarning]] أول واحد بيبقى exception والبرنامج يقف عنده، لأن [[PydanticDeprecatedSince20]] نوع من [[DeprecationWarning]]. فبتصلّح وتشغّل تاني لحد ما يعدّي.

التحويل: [[class Config]] بقت [[model_config = ConfigDict(from_attributes=True)]]، و [[@validator]] بقت [[@field_validator]] ومعاها [[@classmethod]]، و [[parse_obj]] بقت [[model_validate]]، و [[dict()]] بقت [[model_dump()]]، و [[json()]] بقت [[model_dump_json()]]. الناتج بعد التحويل: [[{'id': 5, 'email': 'a@x.com'} {"id":5,"email":"a@x.com"}]] من غير ولا تحذير.`,
          solCode: R`from pydantic import BaseModel, ConfigDict, field_validator
class User(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    email: str
    @field_validator("email")
    @classmethod
    def lower(cls, v: str) -> str:
        return v.lower()
u = User.model_validate({"id": "5", "email": "A@X.com"})
print(u.model_dump(), u.model_dump_json())`
        },
        {
          cmd: "async مش أسرع",
          title: "async def ولا def في FastAPI؟ وإمتى async بيفرق؟ (async in FastAPI)",
          desc: R`async مبيخليش الكود أسرع، بيخلّي الانتظار ميقفلش حد: thread واحد (الـ event loop) بيخدم آلاف الطلبات طالما كل I/O بـ await. وفي FastAPI، الـ [[async def]] بتشتغل على الـ loop، فلازم كل حاجة جواها async (asyncpg و httpx و redis.asyncio)، وأي نداء sync جواها ([[requests]] و [[time.sleep]]) بيقفل الـ API كله. والـ [[def]] العادية FastAPI بيشغّلها في threadpool (حوالي ٤٠ thread)، فآمنة مع المكتبات الـ sync بس محدودة العدد. والحسابات التقيلة لا ده ولا ده: process أو worker منفصل، بسبب الـ GIL.`,
          example: R`@app.get("/a")
async def a(db: DB):
    return await db.fetchval("SELECT 1")
@app.get("/b")
def b():
    return requests.get("https://example.com", timeout=5).status_code
@app.get("/c")
async def c():
    return requests.get("https://example.com", timeout=5).status_code  # غلط: بيقفل الـ loop`,
          try: R`اعمل load test بسيط ([[hey -n 200 -c 50]]) على الـ ٣ routes وقارن الأوقات.`,
          flag: "script",
          deep: {
            why: "أهم سؤال عملي في FastAPI، وبيكشف إذا كنت فاهم الـ event loop ولا بتحط async على كل حاجة.",
            how: R`AnyIO هو اللي بيشغّل الـ def في threads، وتقدر تكبّر الحد بتاعه لو محتاج. والـ dependencies نفس القاعدة. ولو مضطر تنادي حاجة sync من async: [[await asyncio.to_thread(fn)]] أو [[run_in_threadpool]]. وعشان تكتشف الـ blocking: [[PYTHONASYNCIODEBUG=1]] بيحذّر من أي خطوة أخدت أكتر من 100ms.`,
            when: "«إيه اللي يحصل لو حطيت time.sleep في async def؟»، و «إزاي تنادي مكتبة sync من async؟»، و «ليه FastAPI سريع؟»، و «الفرق بين concurrency و parallelism؟».",
            mistakes: "«async دايمًا أسرع». و «def في FastAPI بتقفل السيرفر». و «async بيستخدم كل الـ cores»."
          },
          lines: [
            "route.",
            "async، والاتصال جاي من dependency.",
            "كل I/O بـ await: صح.",
            "route.",
            "def عادية: بتشتغل في thread.",
            "sync جوه def: صح.",
            "route.",
            "async...",
            "...وجواها sync: كل الطلبات هتستنى."
          ],
          sol: R`النتيجة المتوقعة (جربناها بـ ٢٠٠ طلب و ٥٠ مع بعض، مع خدمة خارجية بترد في 0.2 ثانية بدل example.com): [[/a]] الأسرع (عندنا حوالي 430 req/s)، لأن الـ query بتـ await والـ loop بيخدم غيرها. [[/b]] كويسة (حوالي 160 req/s، الـ ٢٠٠ في 1.5 ثانية)، لأن [[def]] بتروح للـ threadpool (٤٠ thread افتراضيًا)، فـ ٤٠ طلب بيستنوا مع بعض. و [[/c]] كارثة: حوالي 5 req/s، والـ ٢٠٠ أخدوا ٤١ ثانية، يعني ٢٠٠ × 0.2 ورا بعض، لأن [[requests]] blocking جوه [[async def]] فبيقفل الـ loop كله.

الدرس: [[async def]] مش بتخلي الكود أسرع لوحدها، بتخليه أسرع لو كل الـ I/O جواها [[await]]. [[/b]] المكتوبة [[def]] عادية أحسن من [[/c]] بـ ٣٠ مرة، مع إن الاتنين نفس الكود. ولو [[/c]] طلعت عندك قريبة من [[/b]]، اتأكد إن الـ load tool بيبعت فعلًا ٥٠ مع بعض ([[-c 50]]).`
        }
      ]
    }
]);

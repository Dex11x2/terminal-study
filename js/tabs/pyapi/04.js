// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "async و await",
      l: 2,
      n: "event loop واحد بيخدم آلاف الطلبات طالما محدش بيقفله، و gather و TaskGroup، و def ولا async def في FastAPI",
      items: [
        {
          cmd: "async def و await",
          title: "async بيخلّي الكود أسرع؟ بيعمل إيه بالظبط",
          desc: R`[[async def]] بتعمل coroutine: دالة ممكن توقف في نص شغلها عند [[await]] وتسيب البرنامج يعمل حاجة تانية لحد ما اللي مستنياه يخلص (رد من قاعدة بيانات أو API). والـ event loop هو اللي بيبدّل بينهم، في thread واحد.

async مبيخليش الحسابات أسرع. بيخلّي الانتظار ميضيّعش وقت: وانت مستني رد القاعدة ١٠٠ms، نفس العملية تخدم طلبات تانية. عشان كده مناسب جدًا لـ APIs، لأن أغلب وقتها انتظار I/O.`,
          example: R`import asyncio
import time
async def fetch_user(uid: int) -> dict:
    await asyncio.sleep(1)
    return {"id": uid}
async def main() -> None:
    start = time.perf_counter()
    a = await fetch_user(1)
    b = await fetch_user(2)
    print(f"واحدة ورا التانية: {time.perf_counter() - start:.1f}s")   # 2.0s
    start = time.perf_counter()
    a, b = await asyncio.gather(fetch_user(1), fetch_user(2))
    print(f"مع بعض: {time.perf_counter() - start:.1f}s")            # 1.0s
    coro = fetch_user(3)
    print(type(coro))
    await coro
asyncio.run(main())`,
          try: R`شغّل المثال، وبعدين غيّر [[asyncio.sleep(1)]] لـ [[time.sleep(1)]] جوه [[fetch_user]] وشغّل تاني: الـ gather بقى ٢ ثانية. ده «blocking the event loop»، ودي أهم غلطة في async.`,
          flag: "script",
          deep: {
            why: "API بيخدم ١٠٠٠ مستخدم، وكل request بيستنى القاعدة و API خارجي. بالـ threads محتاج thread لكل طلب (ذاكرة وتبديل). بالـ async، thread واحد بيخدمهم كلهم، لأن ولا واحد فيهم بيشتغل فعلًا وهو مستني.",
            how: R`نداء [[fetch_user(3)]] مبيشغّلش حاجة: بيرجع coroutine object. اللي بيشغّله إنه يتعمله [[await]] أو يتحوّل لـ task. ولو نسيت الـ await، Python بيطبع [[RuntimeWarning: coroutine ... was never awaited]] والكود مبيتنفّذش.

[[await]] نقطة تسليم: الـ coroutine بيقول للـ event loop «أنا مستني، شغّل غيري». الـ loop بيراقب الـ sockets (epoll على لينكس)، وأول ما الرد يوصل يكمّل الـ coroutine من نفس المكان. ده cooperative multitasking: محدش بيقاطع حد، كل واحد بيسلّم بإرادته عند await. فلو coroutine عمل حاجة طويلة من غير await (حسبة تقيلة، [[time.sleep]]، [[requests.get]])، الـ loop كله واقف والطلبات التانية كلها مستنية.

[[asyncio.run(main())]] بيعمل event loop ويشغّل main لحد ما تخلص ويقفله. في FastAPI مش هتكتبه: uvicorn هو اللي عامل الـ loop.

وأي دالة بتعمل [[await]] لازم تبقى [[async def]]، فالـ async بينتشر لفوق (function coloring). والمكتبات لازم تبقى async هي كمان: [[httpx]] مش [[requests]]، و [[asyncpg]] مش [[psycopg2]]، و [[redis.asyncio]].`,
            when: "APIs وأي حاجة فيها انتظار شبكة كتير: قواعد بيانات، APIs خارجية، websockets. مش للحسابات التقيلة (دي processes، في المستوى ٣).",
            mistakes: R`تنسى [[await]] فترجع coroutine بدل الداتا ([[TypeError: 'coroutine' object is not subscriptable]]). و [[time.sleep]] أو [[requests]] جوه [[async def]]. و [[await]] ورا بعض لحاجات مستقلة وتستغرب إن async مش أسرع: الـ await لوحده بيستنى، والتوازي محتاج gather أو TaskGroup.`
          },
          lines: [
            "مكتبة async الأساسية.",
            "للقياس.",
            "coroutine: دالة ممكن توقف عند await.",
            "انتظار ثانية من غير ما يقفل الـ loop (زي رد قاعدة بيانات).",
            "رجّع الداتا.",
            "الدالة الرئيسية.",
            "ابدأ العداد.",
            "استنى الأولى تخلص...",
            "...وبعدين ابدأ التانية.",
            R`ثانيتين: [[await]] ورا بعض مبيعملش توازي.`,
            "عداد جديد.",
            R`[[gather]] بيشغّلهم مع بعض ويستنى الاتنين.`,
            "ثانية واحدة بس: الانتظارين حصلوا في نفس الوقت.",
            "النداء من غير await مبيشغّلش حاجة...",
            R`...بيطبع [[<class 'coroutine'>]].`,
            "دلوقتي بس اشتغل.",
            "اعمل event loop وشغّل main. في FastAPI، uvicorn بيعمل ده."
          ],
          sol: R`بالمثال زي ما هو: [[واحدة ورا التانية: 2.0s]] و [[مع بعض: 1.0s]] و [[<class 'coroutine'>]]. وبعد ما تحط [[time.sleep(1)]]: الاتنين بقوا [[2.0s]].

السبب: [[await asyncio.sleep(1)]] بيقول للـ event loop «أنا مستني، شغّل حد تاني»، فالطلبين بيستنوا مع بعض. أما [[time.sleep(1)]] فبيوقف الـ thread كله، والـ event loop عايش في الـ thread ده، فمفيش حد تاني يشتغل، والـ gather بيبقى واحدة ورا التانية. ولاحظ إن [[fetch_user(3)]] لوحدها مبتشغلش حاجة، بترجع coroutine بس، ولو نسيت [[await]] هتاخد تحذير [[RuntimeWarning: coroutine 'fetch_user' was never awaited]].`
        },
        {
          cmd: "gather و TaskGroup",
          title: "تشغّل كذا حاجة async مع بعض وتحط لها timeout",
          desc: R`[[asyncio.gather(a(), b())]] بيشغّلهم مع بعض ويرجّع النتايج بنفس الترتيب. و [[asyncio.TaskGroup]] (3.11+) الأحدث والأأمن: لو واحدة فشلت، الباقي بيتلغي وكل الأخطاء بتطلع مع بعض. و [[asyncio.timeout(2)]] بيلغي اللي جواه لو أخد أكتر من ثانيتين.

و [[asyncio.Semaphore(10)]] بيحدد أقصى عدد شغال في نفس الوقت، عشان متبعتش ١٠٠٠ طلب مرة واحدة لـ API خارجي.`,
          example: R`import asyncio
async def get_price(sku: str) -> float:
    await asyncio.sleep(0.5)
    if sku == "bad":
        raise ValueError(sku)
    return 10.0
async def main() -> None:
    prices = await asyncio.gather(get_price("a"), get_price("b"))
    results = await asyncio.gather(get_price("a"), get_price("bad"), return_exceptions=True)
    async with asyncio.TaskGroup() as tg:
        t1 = tg.create_task(get_price("a"))
        t2 = tg.create_task(get_price("b"))
    print(t1.result() + t2.result())
    try:
        async with asyncio.timeout(0.2):
            await get_price("slow")
    except TimeoutError:
        print("اتلغت بعد 0.2 ثانية")
    sem = asyncio.Semaphore(10)
    async def limited(sku: str) -> float:
        async with sem:
            return await get_price(sku)
    many = await asyncio.gather(*(limited(f"sku{i}") for i in range(100)))
asyncio.run(main())`,
          try: R`في الـ TaskGroup خلّي [[t2]] ينادي [[get_price("bad")]]، واقرا الـ [[ExceptionGroup]] اللي طلع، وامسكه بـ [[except* ValueError]]. وبعدين احسب الـ ١٠٠ طلب بياخدوا قد إيه مع [[Semaphore(10)]] ومع [[Semaphore(50)]].`,
          flag: "script",
          deep: {
            why: "endpoint واحد محتاج بيانات المستخدم وطلباته وإشعاراته من ٣ أماكن. ورا بعض = مجموع الأوقات، ومع بعض = أطولهم بس. ومن غير timeout، API خارجي واقع بيخلّي الطلبات عندك متعلقة لحد ما كل حاجة تقف.",
            how: R`[[gather]] بيحوّل كل coroutine لـ task ويستناهم. لو واحدة رمت، الـ exception بيطلع من gather على طول، بس الباقي بيفضل شغال في الخلفية (مش بيتلغي). و [[return_exceptions=True]] بيرجّع الأخطاء كقيم في الليستة بدل ما يرميها.

[[TaskGroup]] يعني structured concurrency: مفيش task بيعيش بعد البلوك. لو واحدة فشلت، الباقي بيتلغي، والأخطاء بتطلع في [[ExceptionGroup]] تمسكه بـ [[except*]]. ونتيجة كل task بـ [[t.result()]] بعد البلوك.

[[asyncio.timeout]] (3.11+) بيلغي الـ task (بيرمي [[CancelledError]] جواها عند أقرب await)، وبرّه البلوك بيتحوّل لـ [[TimeoutError]]. والطريقة القديمة [[asyncio.wait_for(coro, 2)]] لسه موجودة.

[[asyncio.create_task]] لوحدها بتبدأ task في الخلفية، بس لازم تحتفظ بمرجع ليها (في set مثلًا)، وإلا ممكن تتمسح من الذاكرة قبل ما تخلص، ولو رمت محدش هيعرف.

وفي 3.14 فيه [[python -m asyncio ps PID]] و [[python -m asyncio pstree PID]]: بيوروك الـ tasks الشغالة في process شغال، مفيد لما حاجة معلّقة.`,
            when: R`أي كذا عملية I/O مستقلة عن بعض: TaskGroup لو كلهم لازم ينجحوا، و gather بـ [[return_exceptions]] لو عايز اللي نجح. و timeout حوالين أي نداء لحاجة برّه. و Semaphore لما العدد كبير.`,
            mistakes: R`[[gather]] على ١٠ آلاف طلب مرة واحدة: الـ API الخارجي يعملك rate limit أو الاتصالات تخلص. و [[create_task]] من غير ما تحتفظ بيها ولا تستناها. وتمسك [[CancelledError]] وتبلعه: الـ task مش هيتلغي والـ timeout مش هيشتغل (لو مسكته، ارميه تاني). ومفيش timeout خالص.`
          },
          lines: [
            "asyncio.",
            "دالة بتجيب سعر منتج.",
            "كأنها طلب شبكة.",
            "لو المنتج بايظ...",
            "...ارمي.",
            "السعر.",
            "الرئيسية.",
            "الاتنين مع بعض، والنتايج بنفس الترتيب: نص ثانية بس.",
            "واحدة بتفشل: الخطأ بيرجع كقيمة في الليستة بدل ما يترمي.",
            "مجموعة tasks: البلوك مبيخلصش غير لما كلهم يخلصوا.",
            "ابدأ task...",
            "...وتانية معاها.",
            "النتايج متاحة بعد البلوك.",
            "هنمسك الـ timeout.",
            "أي حاجة جوه البلوك ده ليها 0.2 ثانية.",
            "بتاخد 0.5، فهتتلغي.",
            R`[[asyncio.timeout]] بيرمي [[TimeoutError]] العادي.`,
            "جوه الـ except.",
            "أقصى ١٠ في نفس الوقت.",
            "wrapper بيستنى دوره.",
            R`[[async with sem]]: لو فيه ١٠ شغالين، استنى.`,
            "نادي الأصلية.",
            "١٠٠ طلب، بس ١٠ بس في نفس الوقت: حوالي ٥ ثواني.",
            "شغّل."
          ],
          sol: R`لما [[t2]] ينادي [[get_price("bad")]]، الـ TaskGroup بيلغي باقي الـ tasks ويرمي [[ExceptionGroup: unhandled errors in a TaskGroup (1 sub-exception)]]، وجواه الـ [[ValueError: bad]] الأصلي. وبـ [[except* ValueError as eg]] بتمسكه، و [[eg.exceptions]] فيها [[(ValueError('bad'),)]]. لو كتبت [[except ValueError]] العادية مش هتمسكه، لأن اللي طلع [[ExceptionGroup]] مش [[ValueError]].

والـ ١٠٠ طلب كل واحد نص ثانية: مع [[Semaphore(10)]] حوالي [[5.0s]] (١٠ دفعات × 0.5)، ومع [[Semaphore(50)]] حوالي [[1.0s]] (دفعتين). القاعدة: الوقت ≈ (عدد الطلبات ÷ الحد) × وقت الطلب. والحد مش عشان السرعة، عشان متكسرش الـ API أو قاعدة البيانات اللي بتكلمها.`,
          solCode: R`import asyncio
import time
async def get_price(sku: str) -> float:
    await asyncio.sleep(0.5)
    if sku == "bad":
        raise ValueError(sku)
    return 10.0
async def main() -> None:
    try:
        async with asyncio.TaskGroup() as tg:
            t1 = tg.create_task(get_price("a"))
            t2 = tg.create_task(get_price("bad"))
    except* ValueError as eg:
        print("caught:", eg.exceptions)
    for n in (10, 50):
        sem = asyncio.Semaphore(n)
        async def limited(sku: str) -> float:
            async with sem:
                return await get_price(sku)
        start = time.perf_counter()
        await asyncio.gather(*(limited(f"sku{i}") for i in range(100)))
        print(n, f"{time.perf_counter() - start:.1f}s")
asyncio.run(main())`
        },
        {
          cmd: "blocking في async",
          title: "إيه اللي بيقفل الـ event loop، وتعمل إيه لو مضطر",
          desc: R`أي كود جوه [[async def]] بيشتغل من غير [[await]] لفترة طويلة بيقفل الـ event loop، وساعتها كل الطلبات التانية واقفة مستنية. أشهر الأمثلة: [[time.sleep]]، و [[requests.get]]، و [[psycopg2]]، وقراية ملفات كبيرة، وحسابات تقيلة (resize صورة، hash للباسورد).

لو مضطر تستخدم مكتبة sync: [[await asyncio.to_thread(fn, arg)]] بيشغّلها في thread جنب الـ loop. ولو حسبة CPU تقيلة بـ Python: process تانية.`,
          example: R`import asyncio
import hashlib
import os
import time
import requests
import httpx
async def bad() -> str:
    time.sleep(1)
    return requests.get("https://example.com", timeout=5).text
async def good() -> str:
    await asyncio.sleep(1)
    async with httpx.AsyncClient(timeout=5) as client:
        r = await client.get("https://example.com")
    return r.text
def hash_password(pw: str) -> bytes:
    salt = os.urandom(16)
    return salt + hashlib.scrypt(pw.encode(), salt=salt, n=2**14, r=8, p=1)
async def register(pw: str) -> bytes:
    return await asyncio.to_thread(hash_password, pw)
asyncio.run(register("secret"))`,
          try: R`في FastAPI اعمل endpoint [[async def]] على [[/slow]] فيه [[time.sleep(5)]]، وابعتله طلبين في نفس الوقت: [[seq 2 | xargs -P2 -I{} curl -s localhost:8000/slow]] (أو افتح [[/slow?a=1]] و [[/slow?a=2]] في تابين، لأن المتصفح بيأجّل طلبين على نفس الـ URL بالظبط لحد ما الأول يخلص): التاني هيستنى ١٠ ثواني. غيّرها لـ [[await asyncio.sleep(5)]] وجرّب تاني. وبعدين شغّل بـ [[PYTHONASYNCIODEBUG=1]] وشوف asyncio بيحذّرك من الخطوات البطيئة.`,
          flag: "script",
          deep: {
            why: R`ده أخطر bug في تطبيقات async، ومبيظهرش وانت بتجرّب لوحدك: مع مستخدم واحد كل حاجة سريعة. مع ٥٠ مستخدم، endpoint واحد فيه [[requests.get]] بياخد ٢ ثانية بيخلّي الـ API كله يستنى، حتى [[/health]]، والـ load balancer يفتكر السيرفر واقع.`,
            how: R`الـ event loop thread واحد، والـ coroutine بيسلّمه بس عند [[await]] لحاجة async بجد. [[time.sleep(1)]] مش await، فالـ thread نايم ثانية كاملة ومحدش غيره بيشتغل.

[[asyncio.to_thread]] (3.9+) بيبعت الدالة لـ thread pool ويرجّع حاجة تقدر تعمل لها await. وده بيشتغل كويس للـ I/O الـ sync (مكتبة قديمة)، وللحاجات اللي بتسيب الـ GIL (hashlib و bcrypt و numpy غالبًا). بس كود Python تقيل (loop فيه ملايين العمليات) مش هيستفيد من thread بسبب الـ GIL: محتاج [[ProcessPoolExecutor]] أو worker منفصل (المستوى ٣).

وفي FastAPI فيه حل أبسط: لو الـ route كله sync، اكتبه [[def]] عادي، و FastAPI بيشغّله في threadpool لوحده (الدرس الجاي).

[[PYTHONASYNCIODEBUG=1]] (أو [[python -X dev]]) بيشغّل debug mode في asyncio، وبيطبع تحذير لأي خطوة أخدت أكتر من 100ms وهي قافلة الـ loop.`,
            when: R`كل ما تكتب [[async def]]، اسأل على كل سطر فيه I/O: ليه [[await]]؟ لو لأ، يا إما مكتبة async، يا إما [[to_thread]]، يا إما خلّي الـ route [[def]].`,
            mistakes: R`[[requests]] جوه [[async def]] (أشهر واحدة). و SDK بتاع خدمة خارجية شكله عادي وجواه sync. و [[open().read()]] لملف ضخم. وتفتكر إن [[to_thread]] بيحل الحسابات التقيلة المكتوبة بـ Python.`
          },
          lines: [
            "asyncio.",
            "للـ hashing.",
            "لـ salt عشوائي.",
            "sleep العادي.",
            "مكتبة HTTP sync.",
            "مكتبة HTTP async.",
            "دالة async...",
            R`...بس [[time.sleep]] بيقفل الـ loop ثانية كاملة.`,
            R`و [[requests]] sync: الـ loop واقف لحد ما الرد ييجي.`,
            "النسخة الصح.",
            R`[[asyncio.sleep]] بيسلّم الـ loop.`,
            "client async.",
            R`[[await]]: الـ loop بيخدم غيرك وانت مستني.`,
            "رجّع النص.",
            "حسبة تقيلة sync (hash للباسورد).",
            "salt عشوائي لكل باسورد.",
            "scrypt بياخد وقت عن قصد، والـ salt بيتخزن مع الـ hash عشان تقدر تتحقق وقت الـ login.",
            "دالة async محتاجة تستخدمها.",
            R`[[to_thread]]: الحسبة في thread جنب الـ loop، والـ loop فاضي لغيرك.`,
            "شغّل للتجربة."
          ],
          sol: R`مع [[time.sleep(5)]] جوه [[async def]]: الطلب الأول بيرجع بعد ٥ ثواني والتاني بعد ١٠، يعني الأمر كله بياخد حوالي ١٠ ثواني. الـ sleep وقّف الـ event loop، فالسيرفر مقدرش حتى يستقبل الطلب التاني لحد ما الأول يخلص. ومع [[await asyncio.sleep(5)]] الاتنين بيرجعوا مع بعض بعد ٥ ثواني.

ومع [[PYTHONASYNCIODEBUG=1 fastapi dev main.py]] هتلاقي في لوج السيرفر سطر زي [[Executing <Task finished name='Task-3' coro=<RequestResponseCycle.run_asgi() ...> took 5.002 seconds]]: asyncio بيحذّرك من أي خطوة خدت أكتر من 0.1 ثانية من غير ما ترجع للـ loop. لو التاني رجع بعد ٥ ثواني بس مع [[time.sleep]]، اتأكد إن الدالة [[async def]] فعلًا: لو [[def]] عادية FastAPI بيشغّلها في threadpool ومش هتشوف المشكلة.`
        },
        {
          cmd: "def ولا async def",
          title: "في FastAPI: تكتب الـ route def ولا async def؟",
          desc: R`FastAPI بيقبل الاتنين وبيتعامل معاهم بشكل مختلف. [[async def]] بتشتغل على الـ event loop مباشرة، فلازم كل I/O جواها يبقى async بـ [[await]]. و [[def]] العادية FastAPI بيشغّلها في threadpool (زي [[to_thread]])، فمش هتقفل الـ loop حتى لو جواها مكتبة sync.

القاعدة: لو بتستخدم مكتبات async (asyncpg و httpx و redis.asyncio): [[async def]]. لو مكتبة sync (psycopg2، requests، SDK قديم): [[def]]. ولو مش متأكد ومفيش await: [[def]] أأمن.`,
          example: R`import time
import httpx
from fastapi import FastAPI
app = FastAPI()
@app.get("/async-ok")
async def async_ok():
    async with httpx.AsyncClient() as client:
        r = await client.get("https://example.com")
    return {"status": r.status_code}
@app.get("/sync-ok")
def sync_ok():
    time.sleep(1)
    return {"ok": True}
@app.get("/broken")
async def broken():
    time.sleep(1)
    return {"ok": "بس الـ API كله وقف ثانية"}`,
          try: R`شغّل المثال بـ [[fastapi dev]]، وابعت ٢٠ طلب مع بعض على [[/broken]] ([[seq 20 | xargs -P20 -I{} curl -s localhost:8000/broken]]): هياخدوا حوالي ٢٠ ثانية. وعلى [[/sync-ok]]: حوالي ثانية.`,
          flag: "script",
          deep: {
            why: "ده من أكتر الأسئلة في انترفيوهات FastAPI، والغلط فيه هو اللي بيخلي API «سريع» في التجربة يقع تحت الضغط.",
            how: R`FastAPI (عن طريق Starlette و AnyIO) بيبص على الدالة: لو coroutine function بيعمل لها await على الـ loop. لو دالة عادية بيشغّلها بـ [[run_in_threadpool]]، والـ threadpool الافتراضي فيه ٤٠ thread، فأقصى ٤٠ طلب sync في نفس اللحظة والباقي بيستنى دوره.

ونفس القاعدة على الـ dependencies: dependency بـ [[def]] بتشتغل في thread، و [[async def]] على الـ loop.

[[async def]] أخف لما كل حاجة async (مفيش تكلفة threads)، وبيستحمل آلاف الطلبات المتزامنة. و [[def]] أبسط وآمنة مع أي مكتبة، بس محدودة بعدد الـ threads.

المشكلة الحقيقية الخلط جوه نفس الـ route: [[async def]] فيها نداء sync واحد. ولو مضطر، [[await asyncio.to_thread(...)]] أو [[run_in_threadpool]] من [[fastapi.concurrency]].`,
            when: R`مشروع جديد: مكتبات async و [[async def]]. كود قديم أو مكتبة sync بس: [[def]]. endpoint بيعمل حسبة CPU تقيلة: لا ده ولا ده، ابعتها لـ worker.`,
            mistakes: R`[[async def]] في كل حتة «عشان أسرع» وجواها [[requests]] و SQLAlchemy sync. و [[def]] وجواها [[asyncio.run(...)]] عشان تنادي حاجة async (بيعمل loop جديد، وبيقع مع objects مربوطة بالـ loop الأصلي زي الـ pool). وتفتكر إن [[def]] معناها «بطيء».`
          },
          lines: [
            "sleep الـ sync.",
            "HTTP client async.",
            "FastAPI.",
            "التطبيق.",
            "route.",
            "async def، وكل I/O جواها بـ await.",
            "client async.",
            "الـ loop بيخدم غيرك وانت مستني.",
            "رجّع.",
            "route تاني.",
            R`[[def]] عادية: FastAPI بيشغّلها في thread لوحدها.`,
            "sync، بس في thread فمش بيقفل حد.",
            "رجّع.",
            "route تالت.",
            "async def...",
            "...وجواها sync: الـ loop كله وقف، وكل الطلبات التانية مستنية.",
            "رجّع."
          ],
          sol: R`الـ ٢٠ طلب على [[/broken]] بياخدوا حوالي ٢٠ ثانية (في تجربتنا 20.06s)، وعلى [[/sync-ok]] حوالي ثانية (1.15s). الاتنين فيهم نفس [[time.sleep(1)]]، والفرق كله في كلمة [[async]].

[[/broken]] مكتوبة [[async def]]، فـ FastAPI بيشغّلها على الـ event loop مباشرة، و [[time.sleep]] بيوقفه، فالطلبات بتتنفذ واحد ورا التاني. [[/sync-ok]] مكتوبة [[def]] عادية، فـ FastAPI بيبعتها للـ threadpool (حوالي ٤٠ thread افتراضيًا)، فالعشرين بيناموا مع بعض. القاعدة: لو جوه الدالة كود blocking (مكتبة مش async) اكتبها [[def]]، ولو كل حاجة فيها [[await]] اكتبها [[async def]]. ولو لقيت [[/sync-ok]] أخدت أكتر من ثانية بكتير، اتأكد إن الطلبات فعلًا اتبعتت مع بعض ([[-P20]]).`
        },
        {
          cmd: "ThreadPoolExecutor و ProcessPoolExecutor",
          title: "threads لمكتبة sync، و processes لحسبة CPU تقيلة",
          desc: R`[[concurrent.futures]] بيدّيك نوعين pool بنفس الواجهة: [[ThreadPoolExecutor]] لشغل بيستنى I/O بمكتبة sync (requests، SDK قديم، ملفات)، و [[ProcessPoolExecutor]] لحسابات CPU بـ Python، لأن الـ GIL بيمنع الـ threads تحسب في نفس الوقت (درس «workers و GIL»). و [[pool.map]] بترجع النتايج بالترتيب، و [[submit]] مع [[as_completed]] بترجعها أول ما كل واحدة تخلص.

وجوه كود async: [[await asyncio.to_thread(fn, ...)]] بيبعت دالة sync لـ thread (درس «blocking في async»)، و [[await loop.run_in_executor(process_pool, fn, ...)]] للحسبة التقيلة.`,
          example: R`import asyncio
import time
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor, as_completed
def fetch_sync(url: str) -> str:
    time.sleep(1)
    return f"{url}: 200"
def count_primes(limit: int) -> int:
    return sum(1 for n in range(2, limit) if all(n % d for d in range(2, int(n**0.5) + 1)))
def main() -> None:
    urls = [f"https://api.example.com/items/{i}" for i in range(8)]
    start = time.perf_counter()
    with ThreadPoolExecutor(max_workers=8) as pool:
        futures = {pool.submit(fetch_sync, u): u for u in urls}
        for fut in as_completed(futures):
            print(fut.result())
    print(f"threads: {time.perf_counter() - start:.1f}s")        # ~1.0s مش 8
    start = time.perf_counter()
    with ProcessPoolExecutor() as pool:
        results = list(pool.map(count_primes, [500_000] * 4))
    print(results[0], f"processes: {time.perf_counter() - start:.1f}s")   # 41538، وأسرع ~3x على ٤ cores
async def handler() -> list[str]:
    one = await asyncio.to_thread(fetch_sync, "https://legacy-sdk")
    loop = asyncio.get_running_loop()
    with ProcessPoolExecutor(max_workers=2) as pool:
        primes = await loop.run_in_executor(pool, count_primes, 100_000)
    return [one, str(primes)]
if __name__ == "__main__":
    main()
    print(asyncio.run(handler()))`,
          try: R`قيس ٥ حالات بنفس الدالتين اللي في المثال، ٤ مهام كل مرة و [[max_workers=4]]: الحسبة CPU بالترتيب، وبـ threads، وبـ processes، والـ I/O بالترتيب، وبـ threads. اكتب قبل ما تشغّل توقّعك لكل رقم.`,
          sol: R`على جهاز ٤ cores طلعت الأرقام تقريبًا: [[CPU serial 4.3s]]، و [[CPU threads 4.5s]] (مفيش أي تحسن، وأحيانًا أبطأ شوية)، و [[CPU processes 1.4s]]، و [[I/O serial 4.0s]]، و [[I/O threads 1.0s]]. أرقامك هتختلف حسب الجهاز، بس الشكل لازم يبقى كده.

التفسير: الـ threads بتسيب الـ GIL وهي نايمة أو مستنية شبكة، فالـ ٤ انتظارات بيحصلوا مع بعض. لكن حسبة Python الخالصة محتاجة الـ GIL طول الوقت، فالـ threads بتستنى بعض. والـ processes كل واحدة ليها interpreter و GIL، فبتستخدم الـ ٤ cores، بس مش ×4 بالظبط بسبب تكلفة تشغيل الـ processes ونقل الداتا (pickle). ولازم [[if __name__ == "__main__":]] حوالين الكود اللي بيعمل الـ ProcessPool: على ماك وويندوز (وعلى لينكس من 3.14 كمان) الـ processes الجديدة بتعمل import للملف من الأول، ومن غير الحماية دي هتحاول تعمل pool جوه pool. وفي Python 3.14 free-threaded ([[python3.14t]]) الـ threads ممكن تسرّع الـ CPU كمان، بس ده لسه build منفصل.`,
          solCode: R`import time
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor
def count_primes(limit: int) -> int:
    return sum(1 for n in range(2, limit) if all(n % d for d in range(2, int(n**0.5) + 1)))
def fetch_sync(url: str) -> str:
    time.sleep(1)
    return f"{url}: 200"
def bench(label, fn, jobs, executor=None):
    start = time.perf_counter()
    if executor is None:
        results = [fn(j) for j in jobs]
    else:
        with executor(max_workers=4) as pool:
            results = list(pool.map(fn, jobs))
    print(f"{label:<22}{time.perf_counter() - start:5.1f}s")
    return results
if __name__ == "__main__":
    cpu_jobs = [500_000] * 4
    io_jobs = [f"https://x/{i}" for i in range(4)]
    bench("CPU serial", count_primes, cpu_jobs)
    bench("CPU threads", count_primes, cpu_jobs, ThreadPoolExecutor)
    bench("CPU processes", count_primes, cpu_jobs, ProcessPoolExecutor)
    bench("I/O serial", fetch_sync, io_jobs)
    bench("I/O threads", fetch_sync, io_jobs, ThreadPoolExecutor)`,
          flag: "script",
          deep: {
            why: R`سكربت بيجيب ٥٠٠ صفحة من API بـ requests: بالترتيب ٥٠٠ ثانية، وبـ ٢٠ thread حوالي ٢٥. وسكربت بيعمل resize لألف صورة أو يحسب تقرير: الـ threads مش هتفرق والـ processes هتقسم الوقت على عدد الـ cores. ومعرفة أنهي واحدة تستخدم إمتى سؤال انترفيو Python ثابت بعد سؤال الـ GIL.`,
            how: R`[[with ThreadPoolExecutor(max_workers=8) as pool:]] بيعمل الـ threads، وفي آخر البلوك بيستنى كل المهام تخلص ويقفلهم. [[submit(fn, arg)]] بترجع [[Future]]، و [[fut.result()]] بتستنى الناتج وبترمي الـ exception لو الدالة رمت. و [[as_completed(futures)]] بيطلّعهم بترتيب الخلوص، مفيد لـ progress. و [[pool.map(fn, items)]] أبسط، والنتايج بترتيب الـ input، بس أول exception بيترمي وانت بتلف.

الافتراضي لـ threads [[min(32, os.cpu_count() + 4)]]، وللـ processes عدد الـ cores. وللـ I/O ممكن تزوّد الـ threads (٢٠ أو ٥٠)، بس افتكر إن الطرف التاني عنده rate limit.

ProcessPool بينقل الدالة والباراميترات والناتج بـ pickle، فالدالة لازم تبقى على مستوى الـ module (مش lambda ولا دالة جوه دالة)، والداتا الكبيرة بتاخد وقت في النقل. ومن 3.14 طريقة البداية الافتراضية على لينكس بقت [[forkserver]] بدل [[fork]]، فالحماية بـ [[__main__]] بقت لازمة في كل مكان.

جوه async: [[asyncio.to_thread]] بيستخدم الـ thread pool الافتراضي بتاع الـ loop. و [[loop.run_in_executor(pool, fn, *args)]] لأي executor، ومبيقبلش keyword arguments، فاستخدم [[functools.partial]] (درس «functools»). وفي FastAPI اعمل الـ ProcessPool مرة واحدة في الـ lifespan (المثال في درس «workers و GIL») مش مع كل request زي المثال هنا.`,
            when: R`ThreadPool: سكربت أو كود sync بيعمل I/O كتير بمكتبة sync. ولو الكود async أصلًا: [[asyncio.gather]] مع مكتبة async أحسن من threads. ProcessPool: حسبة Python تقيلة تتقسم لمهام مستقلة. ولو الشغل طويل أو كتير في API: queue و worker منفصل (تاب «بناء مشروع كامل»، درس «background jobs»).`,
            mistakes: R`threads لحسبة CPU وتستغرب إنها مسرّعتش. و ProcessPool لمهام صغيرة جدًا (النقل أغلى من الحسبة). و lambda في ProcessPool ([[Can't pickle]]). ونسيان [[if __name__ == "__main__":]]. وتنسى [[fut.result()]] فالـ exceptions تضيع في صمت. و ProcessPool جديد مع كل request.`
          },
          lines: [
            "asyncio.",
            "للوقت.",
            "الـ pools و as_completed.",
            R`دالة sync بتستنى (زي [[requests.get]]).`,
            "انتظار ثانية.",
            "رجّع.",
            "حسبة CPU خالصة بـ Python.",
            "عدّ الأعداد الأولية لحد limit.",
            "الدالة الرئيسية.",
            "٨ روابط.",
            "ابدأ العداد.",
            "٨ threads.",
            R`[[submit]] لكل رابط، والـ dict بيربط كل Future برابطه.`,
            "أول ما كل واحدة تخلص.",
            R`[[result()]] الناتج (أو الـ exception لو رمت).`,
            "حوالي ثانية مش ٨: الانتظارات حصلت مع بعض.",
            "عداد جديد.",
            "processes بعدد الـ cores.",
            R`[[map]]: ٤ حسابات موزعة على الـ processes، والنتايج بالترتيب.`,
            "أسرع بكتير من threads أو بالترتيب.",
            "جوه كود async.",
            R`[[to_thread]]: الدالة الـ sync في thread، والـ loop فاضي.`,
            "الـ loop الحالي.",
            "pool صغير (في FastAPI يتعمل مرة في الـ lifespan).",
            R`[[run_in_executor]]: الحسبة في process تانية من غير ما تقفل الـ loop.`,
            "رجّع.",
            R`لازم مع ProcessPool: الـ processes الجديدة بتعمل import للملف.`,
            "الجزء الـ sync.",
            "الجزء الـ async."
          ]
        }
      ]
    },
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

ولو رجّعت [[email="x"]]: العميل بياخد [[500 Internal Server Error]]، وفي الترمنال هتشوف [[ResponseValidationError]] مع [[loc: ('response', 'email')]] و [[value is not a valid email address: An email address must have an @-sign.]]. الـ 422 معناها «العميل بعت حاجة غلط»، لكن هنا العميل مبعتش حاجة، السيرفر هو اللي طلّع بيانات مش مطابقة للعقد، فده bug عندك. ولو ظهر خطأ إن [[EmailStr]] محتاج [[email-validator]]، سطّب [[pip install "pydantic[email]"]] (بتيجي أصلًا مع [[fastapi[standard]]]).`
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
    },
    {
      t: "Pydantic v2",
      l: 2,
      n: "موديلات بتفحص وتحوّل الداتا وقت التشغيل، و validators بتاعتك، والإعدادات من env",
      items: [
        {
          cmd: "BaseModel و Field",
          title: "موديل بيفحص الداتا بجد وقت التشغيل",
          desc: R`Pydantic بيعمل اللي Zod بيعمله في TypeScript: موديل بتوصف فيه الشكل بالـ type hints، ولما تعمل منه object بيفحص ويحوّل، ولو فيه غلط بيرمي [[ValidationError]] فيه كل المشاكل مع بعض. ومن نفس الموديل بيطلع JSON Schema (اللي FastAPI بيستخدمه للتوثيق).

[[Field(...)]] للقيود والـ defaults، و [[Annotated]] عشان تعمل نوع بقيوده وتستخدمه في كذا مكان. والنسخة الحالية Pydantic v2 (الـ core بتاعها مكتوب بـ Rust)، و FastAPI الحديث مبيقبلش v1 خالص.`,
          example: R`from datetime import date
from typing import Annotated, Literal
from pydantic import BaseModel, ConfigDict, Field, ValidationError
Price = Annotated[float, Field(gt=0, le=1_000_000)]
class Address(BaseModel):
    city: str
    street: str | None = None
class Customer(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)
    name: str = Field(min_length=2)
    phone: str = Field(pattern=r"^01[0125]\d{8}$")
    tier: Literal["free", "pro"] = "free"
    birthday: date | None = None
    budget: Price = 100
    address: Address
c = Customer(name="  Sara ", phone="01012345678", birthday="1999-05-01", address={"city": "Cairo"})
print(c.name, c.birthday.year, c.address.city)
try:
    Customer(name="S", phone="123", address={}, role="admin")
except ValidationError as e:
    print(e.error_count())
    print(e.errors()[0]["loc"], e.errors()[0]["msg"])`,
          try: R`اطبع [[e.errors()]] كله وشوف كل خطأ فيه [[loc]] و [[msg]] و [[type]]. وبعدين اطبع [[Customer.model_json_schema()]]: ده اللي بيظهر في [[/docs]]. وجرّب [[budget="50"]] مرة، ومرة مع [[ConfigDict(strict=True)]].`,
          flag: "script",
          deep: {
            why: "الـ type hints العادية مبتفحصش حاجة، و Pydantic هو اللي بيخليها حقيقية: أي داتا جاية من برّه (request، API خارجي، ملف، env، ناتج AI) بتعدّي على الموديل، وجوه الكود بتتعامل مع objects مضمونة الشكل.",
            how: R`الموديل class بيورث من [[BaseModel]]، والـ annotations هي الحقول. ووقت الإنشاء، pydantic-core (Rust) بيفحص كل حقل ويحوّل. في الوضع الافتراضي (lax) بيحوّل الحاجات المنطقية: [["1999-05-01"]] لـ date، و [["100"]] لـ float، و dict لموديل متداخل. و [[strict=True]] بيمنع التحويل.

الحقل من غير default إجباري، و [[X | None = None]] اختياري. (ولو كتبت [[X | None]] من غير default، يبقى إجباري بس مسموح يبقى null.)

[[model_config = ConfigDict(...)]] إعدادات الموديل (كانت [[class Config]] في v1): [[extra="forbid"]] بيرفض الحقول الزيادة (الافتراضي [[ignore]] بيشيلها بهدوء)، و [[str_strip_whitespace]] بيشيل المسافات، و [[frozen=True]] بيمنع التعديل.

[[Annotated[float, Field(...)]]] بيعمل نوع بقيوده (Price) تستخدمه في أي موديل. وفيه أنواع جاهزة: [[EmailStr]] و [[HttpUrl]] و [[SecretStr]] (مبيطبعش قيمته في اللوج) و [[PositiveInt]].

والـ ValidationError بيجمع كل الأخطاء مش أول واحد بس، وكل خطأ فيه [[loc]] (المسار، زي [[('address', 'city')]]).`,
            when: "كل حدود التطبيق: request و response و env و APIs خارجية وملفات JSON ورسايل queue. وجوه الكود بين دوالك: dataclass، أو نفس الموديل لو جاهز.",
            mistakes: R`أمثلة v1 في مشروع v2 ([[class Config]] و [[.dict()]] و [[@validator]] و [[orm_mode]]): بعضها شغال بتحذير وبعضها اتشال. و [[float]] للفلوس (استخدم [[Decimal]] و Pydantic بيدعمه، أو قروش int). وتفتكر إن [[extra]] الافتراضي بيرفض الزيادة.`
          },
          lines: [
            "نوع التاريخ.",
            R`[[Annotated]] و [[Literal]].`,
            "الموديل، والإعدادات، والقيود، والخطأ.",
            "نوع بقيوده، تستخدمه في كذا موديل.",
            "موديل متداخل.",
            "إجباري.",
            "اختياري.",
            "الموديل الأساسي.",
            "ارفض الحقول الزيادة، وشيل المسافات من النصوص.",
            "حرفين على الأقل (بعد شيل المسافات).",
            "رقم موبايل مصري بـ regex.",
            "قيمة من اتنين، والافتراضي free.",
            "تاريخ اختياري: الـ string بيتحوّل date.",
            "النوع اللي عملناه فوق.",
            "موديل جوه موديل: الـ dict بيتحوّل Address.",
            "داتا سليمة: كل حاجة اتحوّلت.",
            R`[[Sara]] من غير مسافات، و [[1999]] لأن birthday بقت date.`,
            "داتا غلط.",
            "٤ مشاكل: اسم قصير، وموبايل غلط، و city ناقصة، و role زيادة.",
            "امسك الخطأ.",
            "كل الأخطاء اتجمعت: 4.",
            "كل خطأ فيه مكانه ورسالته."
          ],
          sol: R`[[e.errors()]] فيها ٤ أخطاء، كل واحد dict فيه [[type]] و [[loc]] و [[msg]] (و [[input]] و [[url]]): [[string_too_short ('name',)]]، و [[string_pattern_mismatch ('phone',)]]، و [[missing ('address', 'city')]] (الـ loc بيوصل لجوه الموديل المتداخل)، و [[extra_forbidden ('role',)]] (بسبب [[extra="forbid"]]). والـ [[type]] ثابت ومناسب للكود (تترجم منه الرسائل مثلًا)، والـ [[msg]] للبني آدمين.

[[model_json_schema()]] بيرجع JSON Schema فيه [[required: ['name', 'phone', 'address']]]، و [[phone]] جواه [[pattern]]، و [[budget]] جواه [[exclusiveMinimum: 0]] و [[maximum: 1000000]]، و [[Address]] في [[$defs]]. و [[budget="50"]] بيعدّي ويبقى [[50.0]] (float)، لكن مع [[strict=True]] بيترفض: [[float_type]] و [[Input should be a valid number]]. الـ strict مفيد لما البيانات جاية من كود تاني مش من JSON أو فورم.`
        },
        {
          cmd: "model_dump و model_validate",
          title: "من موديل لـ dict و JSON، ومن ORM لموديل",
          desc: R`في Pydantic v2 كل الـ methods بتبدأ بـ [[model_]]: [[model_dump()]] لـ dict، و [[model_dump_json()]] لـ JSON string، و [[model_validate(data)]] من dict أو object، و [[model_validate_json(raw)]] من JSON string على طول (أسرع من [[json.loads]] وبعدين validate)، و [[model_copy(update=...)]] لنسخة معدّلة.

ولو عايز تفحص حاجة مش موديل ([[list[Item]]] مثلًا): [[TypeAdapter]].`,
          example: R`from datetime import datetime
from pydantic import BaseModel, ConfigDict, TypeAdapter
class Item(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    note: str | None = None
    created_at: datetime
item = Item.model_validate({"id": 1, "name": "Tea", "created_at": "2026-01-10T09:00:00Z"})
print(item.model_dump())
print(item.model_dump(mode="json", exclude_none=True))
print(item.model_dump_json(include={"id", "name"}))
raw = '{"id": 2, "name": "Coffee", "created_at": "2026-01-10T10:00:00Z"}'
item2 = Item.model_validate_json(raw)
renamed = item.model_copy(update={"name": "Green tea"})
items = TypeAdapter(list[Item]).validate_python([{"id": 3, "name": "Cake", "created_at": "2026-01-10T11:00:00Z"}])
class Row:
    id, name, note, created_at = 4, "Juice", None, datetime(2026, 1, 1)
from_orm = Item.model_validate(Row())`,
          try: R`قارن [[item.model_dump()]] بـ [[item.model_dump(mode="json")]] واطبع نوع [[created_at]] في الاتنين. وبعدين جرّب [[Item.model_validate(Row())]] من غير [[from_attributes]] واقرا الخطأ.`,
          flag: "script",
          deep: {
            why: "الموديل بيتنقل بين طبقات كتير: من JSON جاي، لـ dict تحطه في القاعدة، لـ JSON راجع، أو لـ Redis. لازم تعرف تحوّل في كل اتجاه من غير ما تخسر الفحص. والأسماء اتغيرت بين v1 و v2، فأمثلة النت القديمة بتلخبط.",
            how: R`جدول التحويل من v1: [[.dict()]] بقت [[model_dump()]]، و [[.json()]] بقت [[model_dump_json()]]، و [[parse_obj]] بقت [[model_validate]]، و [[parse_raw]] بقت [[model_validate_json]]، و [[.copy()]] بقت [[model_copy()]]، و [[orm_mode]] بقت [[from_attributes]]، و [[schema()]] بقت [[model_json_schema()]]. والقديمة بعضها لسه موجود بـ DeprecationWarning.

[[model_dump()]] الافتراضي (mode python) بيسيب الـ datetime و Decimal و UUID objects زي ما هي. و [[mode="json"]] بيحوّلها لأنواع JSON (strings و numbers)، ودي اللي محتاجها لو هتبعت الـ dict لـ [[json.dumps]] أو Redis. و [[exclude_unset]] و [[exclude_none]] و [[include]] و [[exclude]] و [[by_alias]] للتحكم.

[[model_validate_json]] بيعمل parse و validate في خطوة واحدة جوه Rust: أسرع وبياكل ذاكرة أقل.

[[from_attributes=True]] بيخلي [[model_validate]] يقرا attributes من أي object (زي صف SQLAlchemy). و Record بتاع asyncpg حوّله [[dict(record)]] الأول.

[[TypeAdapter]] بيعمل validate و dump و JSON schema لأي نوع: [[list[Item]]] و [[dict[str, int]]] و [[int | None]]. اعمله مرة على مستوى الـ module، مش جوه loop، لأن بناؤه مكلف.

و [[model_copy(update=...)]] مبيفحصش القيم الجديدة: لو محتاج فحص، اعمل [[model_validate]] على dict جديد.`,
            when: R`[[model_dump(exclude_unset=True)]] للـ PATCH. و [[mode="json"]] قبل أي تخزين كـ JSON. و [[model_validate_json]] لما القيمة جاية string (Redis، queue، ملف). و [[from_attributes]] مع الـ ORMs.`,
            mistakes: R`[[json.dumps(item.model_dump())]] فيطلع [[TypeError: Object of type datetime is not JSON serializable]]: استخدم [[model_dump_json()]] أو [[mode="json"]]. و [[TypeAdapter(...)]] جوه دالة بتتنادى مع كل request. و [[dict(item)]] بدل [[model_dump]] (سطحي: الموديلات المتداخلة بتفضل objects).`
          },
          lines: [
            "datetime.",
            "الموديل، والإعدادات، و TypeAdapter.",
            "موديل.",
            "يقبل objects بـ attributes مش dicts بس.",
            "حقل.",
            "حقل.",
            "اختياري.",
            "بيتحوّل من string لـ datetime.",
            R`من dict: فحص وتحويل (كانت [[parse_obj]] في v1).`,
            R`dict، و [[created_at]] لسه datetime object.`,
            "dict كله أنواع JSON (التاريخ بقى string)، ومن غير الحقول اللي None.",
            "JSON string بحقول معينة بس.",
            "JSON جاي string (من Redis مثلًا).",
            "parse و validate في خطوة واحدة جوه Rust.",
            "نسخة بتعديل، والأصل زي ما هو.",
            "فحص ليستة موديلات من غير ما تعمل موديل wrapper.",
            "object عادي زي صف من ORM.",
            "attributes.",
            R`[[from_attributes]] خلّاه يقرا الـ attributes.`
          ],
          sol: R`[[model_dump()]] بيرجع [[created_at]] كـ [[datetime]] حقيقي ([[datetime.datetime(2026, 1, 10, 9, 0, tzinfo=TzInfo(0))]] ونوعه [[<class 'datetime.datetime'>]])، و [[model_dump(mode="json")]] بيرجعه string: [[2026-01-10T09:00:00Z]] ونوعه [[<class 'str'>]]. الأول لو هتكمّل شغل في Python، والتاني لو هتبعته لحاجة مبتفهمش غير JSON (Redis أو [[json.dumps]]).

ومن غير [[from_attributes]]: [[Input should be a valid dictionary or instance of Item [type=model_type, input_value=<__main__.Row object at 0x...>, input_type=Row]]]. Pydantic افتراضيًا بيقبل dict أو object من نفس الموديل بس، و [[from_attributes=True]] بيخليه يقرا [[obj.id]] و [[obj.name]]، ودي اللي بتحتاجها مع صفوف SQLAlchemy.`
        },
        {
          cmd: "field_validator و model_validator",
          title: "قواعد فحص بتاعتك: حقل لوحده أو حقول مع بعض",
          desc: R`لو القيود الجاهزة مش كفاية: [[@field_validator("field")]] دالة بتفحص أو تعدّل حقل واحد، و [[@model_validator(mode="after")]] بتفحص الموديل كله بعد ما كل حقل اتفحص (زي «تاريخ النهاية بعد البداية»). ارمي [[ValueError]] برسالة، و Pydantic بيحوّلها لخطأ في الـ ValidationError في المكان الصح.

و [[@computed_field]] حقل محسوب بيظهر في [[model_dump]] وفي الـ JSON.`,
          example: R`from datetime import date
from typing import Self
from pydantic import BaseModel, computed_field, field_validator, model_validator
class Booking(BaseModel):
    email: str
    start: date
    end: date
    guests: int
    @field_validator("email")
    @classmethod
    def normalize_email(cls, v: str) -> str:
        v = v.strip().lower()
        if not v.endswith("@company.com"):
            raise ValueError("لازم إيميل الشركة")
        return v
    @model_validator(mode="after")
    def check_dates(self) -> Self:
        if self.end <= self.start:
            raise ValueError("end لازم بعد start")
        return self
    @computed_field
    @property
    def nights(self) -> int:
        return (self.end - self.start).days
b = Booking(email=" Sara@Company.com ", start="2026-03-01", end="2026-03-04", guests=2)
print(b.model_dump())`,
          try: R`ابعت [[end]] قبل [[start]] واقرا مكان الخطأ في [[e.errors()]] (هيبقى على الموديل كله مش على حقل). وبعدين ضيف [[@field_validator("guests")]] بيرفض أكتر من 6، وقارنه بإنك تكتب [[Field(le=6)]] (الأبسط دايمًا أحسن).`,
          flag: "script",
          deep: {
            why: "قواعد الـ business الحقيقية مش دايمًا «رقم أكبر من صفر»: إيميل من دومين معين، تاريخين مرتبطين، حقل إجباري لو حقل تاني اتبعت. لو فحصتها جوه الـ route هتتكرر وتتنسى. في الموديل بتتطبّق في كل حتة وبتطلع 422 بنفس الشكل.",
            how: R`[[field_validator]] الافتراضي [[mode="after"]]: بيشتغل بعد ما Pydantic حوّل القيمة للنوع، فـ [[v]] مضمون str. و [[mode="before"]] بيشتغل على القيمة الخام قبل التحويل (مفيد لو هتحوّل [["a,b,c"]] لـ list). ولازم [[@classmethod]] تحته، ولازم ترجّع القيمة حتى لو معدّلتهاش.

[[model_validator(mode="after")]] بياخد [[self]] بعد ما كل الحقول اتفحصت، ولازم يرجّع [[self]]. و [[mode="before"]] بياخد الداتا الخام (غالبًا dict).

ارمي [[ValueError]] (أو [[PydanticCustomError]] لو عايز type خاص بيك). ومتستخدمش [[assert]] للفحص، لأنها بتتشال لو Python اشتغل بـ [[-O]].

وفيه طريقة أخف بـ Annotated: [[Annotated[str, AfterValidator(fn)]]] بتعمل نوع ومعاه الـ validator بتاعه وتستخدمه في كذا موديل.

[[@computed_field]] فوق [[@property]] بيضيف الحقل للـ dump والـ JSON schema، بس مبيتقبلش كـ input.

والـ validators بتشتغل وقت الإنشاء بس. لو عدّلت حقل بعدها ([[b.guests = 100]]) مفيش فحص، إلا لو [[validate_assignment=True]] في الـ config.`,
            when: "قاعدة بتخص الداتا نفسها (شكلها وعلاقة الحقول ببعض). أما اللي محتاج قاعدة بيانات («الإيميل متسجل قبل كده؟») فمكانه الـ service أو dependency، مش الـ validator.",
            mistakes: R`تنسى [[return v]] أو [[return self]]. و [[@validator]] و [[@root_validator]] بتوع v1. و validator بيعمل query على القاعدة (sync، وجوه تطبيق async، ومش مكانه). و validator لحاجة [[Field]] بيعملها أصلًا ([[ge]] و [[max_length]] و [[pattern]]).`
          },
          lines: [
            "date.",
            R`[[Self]] لنوع الرجوع (3.11+).`,
            "الـ decorators.",
            "موديل حجز.",
            "حقل.",
            "بيتحوّل date.",
            "نفس الكلام.",
            "حقل.",
            "validator على حقل email.",
            "لازم يبقى classmethod.",
            R`[[v]] القيمة بعد ما اتحوّلت str.`,
            "نضّفها.",
            "قاعدة بتاعتك.",
            R`[[ValueError]] بيبقى خطأ عادي في الـ 422.`,
            "رجّع القيمة (المعدّلة).",
            "validator على الموديل كله بعد فحص كل الحقول.",
            R`بياخد [[self]].`,
            "قاعدة بين حقلين.",
            "ارمي.",
            "لازم ترجّع self.",
            "حقل محسوب بيظهر في الـ dump والـ JSON.",
            "property عادية.",
            "عدد الليالي.",
            "الحسبة.",
            "الإيميل هيتنضّف، والتواريخ هتتحوّل.",
            R`فيه [[nights: 3]]، والإيميل [[sara@company.com]].`
          ],
          sol: R`لما [[end]] قبل [[start]]: [[e.errors()]] فيها خطأ واحد بـ [[loc: ()]] (tuple فاضي، يعني على الموديل كله)، و [[type: 'value_error']]، و [[msg: 'Value error, end لازم بعد start']]. Pydantic بيضيف [[Value error, ]] قبل رسالتك، فخد بالك لو بتعرض الرسالة للمستخدم. ولو عايز الخطأ يتربط بحقل معين، اعمل الفحص في field validator.

الـ [[@field_validator("guests")]] بيطلّع [[loc: ('guests',)]] و [[Value error, max 6 guests]]، و [[Field(le=6)]] بيطلّع [[less_than_equal]] و [[Input should be less than or equal to 6]] ومعاه [[ctx: {'le': 6}]]، وبيظهر كـ [[maximum]] في [[/docs]]. فـ [[Field(le=6)]] أقصر وأوضح وموثّق، والـ validator خليه للمنطق اللي Field ميعرفش يعبّر عنه.`,
          solCode: R`from pydantic import BaseModel, Field, field_validator
class WithValidator(BaseModel):
    guests: int
    @field_validator("guests")
    @classmethod
    def max_guests(cls, v: int) -> int:
        if v > 6:
            raise ValueError("max 6 guests")
        return v
class WithField(BaseModel):
    guests: int = Field(le=6)`
        },
        {
          cmd: "pydantic-settings",
          title: "الإعدادات من env و .env بأنواعها",
          desc: R`[[pydantic-settings]] (مكتبة منفصلة عن Pydantic، و [[fastapi[standard]]] الحديث بيسطّبها معاه) فيها [[BaseSettings]]: موديل بيملّي حقوله من متغيرات البيئة ومن ملف [[.env]]، ويفحصها ويحوّلها. لو [[DATABASE_URL]] ناقص وانت بتنادي [[get_settings()]] مرة وقت الـ startup (في الـ lifespan)، التطبيق يقع وهو بيقوم برسالة واضحة، مش بعد ساعة في أول request.

واعمل الإعدادات مرة واحدة ([[@lru_cache]] على دالة)، واستخدمها كـ dependency عشان تعرف تغيّرها في الاختبارات.`,
          example: R`from functools import lru_cache
from typing import Annotated, Literal
from fastapi import Depends, FastAPI
from pydantic import PostgresDsn, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict
class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")
    env: Literal["dev", "test", "prod"] = "dev"
    database_url: PostgresDsn
    redis_url: str = "redis://localhost:6379/0"
    jwt_secret: SecretStr
    cors_origins: list[str] = ["http://localhost:5173"]
    db_pool_size: int = 10
@lru_cache
def get_settings() -> Settings:
    return Settings()
SettingsDep = Annotated[Settings, Depends(get_settings)]
app = FastAPI()
@app.get("/info")
async def info(settings: SettingsDep):
    return {"env": settings.env, "pool": settings.db_pool_size}
# .env:
# DATABASE_URL=postgresql://app:secret@localhost:5432/shop
# JWT_SECRET=change-me-please-32-chars-minimum
# CORS_ORIGINS=["https://shop.example.com"]`,
          try: R`شغّل التطبيق من غير [[.env]] وافتح [[/info]]: هيرجع 500، واقرا الخطأ في الترمنال: فيه اسم كل متغير ناقص. (ولو عايزه يقع وهو بيقوم، نادي [[get_settings()]] في الـ lifespan.) وبعدين اطبع [[settings.jwt_secret]] و [[settings.jwt_secret.get_secret_value()]] وقارن. وجرّب [[DB_POOL_SIZE=abc]].`,
          flag: "script",
          deep: {
            why: R`[[os.environ["DB_URL"]]] متفرقة في ٢٠ ملف: متغير ناقص يظهر بعد الديبلوي في أول request بيحتاجه، و [["10"]] string بيتقارن برقم، والسر بيطلع في اللوج. BaseSettings بيجمع الإعدادات في مكان واحد مفحوص، وأول ما تتقري بيطلع خطأ واحد فيه كل المتغيرات الناقصة (ولو ناديت get_settings() في الـ lifespan، ده بيحصل وقت الـ startup).`,
            how: R`كل حقل بيدوّر على متغير بيئة بنفس الاسم، من غير حساسية لحالة الحروف افتراضيًا: [[database_url]] بياخد [[DATABASE_URL]]. والأولوية: الـ arguments اللي بتديها لـ [[Settings()]]، وبعدين متغيرات البيئة، وبعدين [[.env]]، وبعدين الـ default. يعني متغير البيئة الحقيقي على السيرفر بيكسب على [[.env]].

الأنواع المعقدة ([[list]] و [[dict]] والموديلات) بتتقري كـ JSON من المتغير. و [[env_prefix="APP_"]] لو عايز كل المتغيرات تبدأ ببادئة. و [[env_nested_delimiter="__"]] للموديلات المتداخلة ([[DB__HOST]]).

[[SecretStr]] بيطبع [[**********]] في اللوج والـ repr، والقيمة الحقيقية بـ [[get_secret_value()]]. و [[PostgresDsn]] بيفحص الـ URL، ولما تبعته لـ asyncpg اعمل [[str(settings.database_url)]].

[[@lru_cache]] بيخلي [[Settings()]] يتعمل مرة واحدة (مش مع كل request يقرا .env). ولأن الإعدادات dependency، في الاختبارات تقدر تعمل [[app.dependency_overrides[get_settings] = lambda: Settings(env="test", ...)]].

و [[.env]] في [[.gitignore]] دايمًا، ومعاه [[.env.example]] فيه الأسماء من غير قيم. وفي Docker الـ env بييجي من compose أو secrets (تاب Docker).`,
            when: R`أي تطبيق، من أول يوم، قبل ما تكتب أول [[os.environ]].`,
            mistakes: R`[[Settings()]] على مستوى الـ module في ملف بيتعمله import في الاختبارات، فالاختبارات تقع لو مفيش .env. و [[.env]] في Git. و [[print(settings)]] وفيه سر من غير [[SecretStr]]. و [[from pydantic import BaseSettings]] (ده v1؛ في v2 اتنقلت لمكتبة منفصلة).`
          },
          lines: [
            "cache لدالة الإعدادات.",
            "للـ dependency وللقيم المحددة.",
            "FastAPI.",
            R`[[PostgresDsn]] بيفحص الـ URL، و [[SecretStr]] بيخبي القيمة في الطباعة.`,
            "مكتبة pydantic-settings.",
            "موديل إعدادات.",
            R`اقرا [[.env]] كمان، وتجاهل المتغيرات اللي ملهاش حقل.`,
            R`واحدة من ٣ قيم، من [[ENV]].`,
            "إجباري: ملوش default، ولو ناقص أول ما الإعدادات تتقري بيطلع خطأ باسمه.",
            "ليه default.",
            "سر: مبيطبعش.",
            "list بتتقري JSON من المتغير.",
            R`[["10"]] في env بيبقى int 10.`,
            "مرة واحدة بس.",
            "الدالة اللي بتعمل الإعدادات.",
            "بتقرا env و .env وتفحص.",
            "نوع جاهز للـ dependency (القسم الجاي).",
            "التطبيق.",
            "route.",
            "الإعدادات جت كـ dependency: سهل تغيّرها في الاختبار.",
            "استخدمها."
          ],
          sol: R`من غير [[.env]]، [[/info]] بترجع [[500 Internal Server Error]]، والترمنال فيه [[2 validation errors for Settings]] وتحتها [[database_url Field required]] و [[jwt_secret Field required]]. التطبيق قام عادي لأن [[get_settings()]] مبتتناداش غير مع أول طلب، وده سبب إنك تناديها في الـ lifespan: الأحسن السيرفر يرفض يقوم بدل ما يقوم ويقع مع أول مستخدم.

بعد ما تعمل [[.env]]: [[print(settings.jwt_secret)]] بيطبع [[**********]] و [[repr]] بيطبع [[SecretStr('**********')]]، و [[get_secret_value()]] بس هي اللي بترجع القيمة الحقيقية، فلو اللوج طبع الـ settings كلها السر مش هيتسرّب. و [[CORS_ORIGINS=["https://shop.example.com"]]] بيتقري كـ JSON ويبقى list. و [[DB_POOL_SIZE=abc]] بيطلّع [[db_pool_size Input should be a valid integer, unable to parse string as an integer]]. ومتغيرات البيئة الحقيقية بتكسب على [[.env]].`
        }
      ]
    }
]);

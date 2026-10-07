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
          teach: R`## المثال بيعمل إيه؟

بيعمل دالة async بتقلّد طلب لقاعدة بيانات بياخد ثانية، وبيناديها مرتين بطريقتين: مرة واحدة ورا التانية (ثانيتين)، ومرة مع بعض بـ [[gather]] (ثانية واحدة). وفي الآخر بيوريك إن نداء الدالة من غير [[await]] مبيشغّلش حاجة. كل الناتج هنا من تشغيل حقيقي بـ Python 3.14 على ويندوز ([[python main.py]] في venv)، ونفس الأرقام بتطلع على لينكس.

---

## ١. الـ imports

~~~python
import asyncio
import time
~~~

- [[asyncio]] المكتبة الرسمية للـ async في Python: فيها الـ event loop و [[sleep]] و [[gather]] و [[run]].
- [[time]] هنستخدم منها [[perf_counter()]] بس، عشان نقيس الوقت.

---

## ٢. الدالة: [[async def fetch_user]]

~~~python
async def fetch_user(uid: int) -> dict:
    await asyncio.sleep(1)
    return {"id": uid}
~~~

| الحتة | معناها |
|---|---|
| [[async def]] | دالة من نوع **coroutine function**: لما تناديها مبتشتغلش على طول، بترجعلك coroutine (شغلانة جاهزة تتنفّذ) |
| [[uid: int]] و [[-> dict]] | type hints: بتاخد رقم وبترجع dict (Python مبيفحصهمش، دول للقارئ وللمحرر) |
| [[await]] | «استنى الحاجة دي تخلص، **وسيب الـ event loop يشغّل غيري** في الوقت ده» |
| [[asyncio.sleep(1)]] | انتظار ثانية بطريقة async: بتقلّد رد شبكة أو قاعدة بيانات |
| [[return {"id": uid}]] | الناتج اللي هيرجع للي عمل [[await]] |

### يعني إيه event loop؟

برنامج صغير جوه asyncio شغال في **thread واحد**، عنده لستة شغلانات (coroutines). بيشغّل واحدة، ولما توصل لـ [[await]] على حاجة لسه مخلصتش، بتسلّمه الدور، فيشغّل اللي بعدها. ولما الحاجة اللي كانت مستنياها تخلص، بيرجّعها تكمّل من نفس السطر. محدش بيقاطع حد: كل واحد بيسلّم بإرادته عند [[await]].

---

## ٣. واحدة ورا التانية

~~~python
start = time.perf_counter()
a = await fetch_user(1)
b = await fetch_user(2)
print(f"واحدة ورا التانية: {time.perf_counter() - start:.1f}s")
~~~

- [[time.perf_counter()]] ساعة دقيقة بالثواني، مش وقت حقيقي (ساعة الحيطة). قيمتها لوحدها ملهاش معنى، الفرق بين قراءتين هو المدة.
- [[await fetch_user(1)]] بيستنى الأولى **لحد ما تخلص**، وبعدين بس السطر اللي بعده يبدأ التانية. يعني [[await]] لوحده مش توازي.
- [[:.1f]] جوه الـ f-string: اطبع الرقم float بخانة عشرية واحدة.

~~~text الناتج
واحدة ورا التانية: 2.0s
~~~

ثانية + ثانية = ٢.

---

## ٤. مع بعض: [[asyncio.gather]]

~~~python
a, b = await asyncio.gather(fetch_user(1), fetch_user(2))
~~~

نفكّه من جوه لبرة:

1. [[fetch_user(1)]] و [[fetch_user(2)]]: نداءين من غير await، فبيرجعوا **coroutine objects** لسه متشغلتش.
2. [[asyncio.gather(...)]]: بياخدهم، ويحوّل كل واحد لـ task (يعني يسجّله في الـ event loop عشان يبدأ)، ويرجّع حاجة تقدر تستناها.
3. [[await]]: استنى لحد ما **الاتنين** يخلصوا. الأولى بتوصل لـ [[sleep]] وتسلّم، فالتانية تبدأ وتوصل لـ [[sleep]] برضه، فالانتظارين بيحصلوا في نفس الوقت.
4. [[a, b =]]: gather بيرجّع list بالنتايج **بنفس ترتيب** اللي اديته، فبنفكّها في متغيرين.

~~~text الناتج
مع بعض: 1.0s
~~~

---

## ٥. النداء من غير [[await]]

~~~python
coro = fetch_user(3)
print(type(coro))
await coro
~~~

~~~text الناتج
<class 'coroutine'>
~~~

[[fetch_user(3)]] مبيشغّلش ولا سطر من الدالة: بيرجّع object نوعه [[coroutine]]. السطر اللي بعده بيطبع نوعه، وبعدين [[await coro]] هو اللي بيشغّله فعلًا. ولو نسيت الـ await خالص (جربتها):

~~~text الناتج
RuntimeWarning: coroutine 'fetch_user' was never awaited
...
TypeError: 'coroutine' object is not subscriptable
~~~

التحذير معناه إن الدالة عمرها ما اشتغلت، و [[TypeError]] طلع لما حاولنا نعمل [[u["id"]]] على coroutine بدل dict.

---

## ٦. [[asyncio.run(main())]]

[[main()]] نفسها coroutine، ومحدش يقدر يعمل لها [[await]] من بره أي دالة async. [[asyncio.run]] بيعمل event loop جديد، ويشغّل [[main]] لحد ما تخلص، ويقفل الـ loop. ده بيتكتب **مرة واحدة** في آخر السكربت. في FastAPI مش هتكتبه: uvicorn هو اللي عامل الـ loop وبيعمل await للـ routes بتاعتك.

---

## ٧. التجربة: [[time.sleep]] بدل [[asyncio.sleep]]

لو غيّرت السطر لـ [[time.sleep(1)]] (من غير await):

~~~text الناتج
واحدة ورا التانية: 2.0s
مع بعض: 2.0s
~~~

[[time.sleep]] بينيّم الـ **thread كله**، والـ event loop عايش في الـ thread ده، فمحدش تاني يشتغل. الـ gather بقى واحدة ورا التانية. ده اسمه «blocking the event loop» (الدرس بعد الجاي).

---

## السطور كلها

| الكود | بيعمل إيه |
|---|---|
| [[async def f()]] | دالة لما تتنادى بترجع coroutine |
| [[await x]] | استنى x، وسيب الـ loop يشغّل غيرك |
| [[await f(); await g()]] | واحدة ورا التانية: مجموع الأوقات |
| [[await asyncio.gather(f(), g())]] | مع بعض: أطولهم بس، والنتايج بالترتيب |
| [[asyncio.run(main())]] | اعمل loop وشغّل main (مرة في السكربت) |

## الخلاصة

- async مبيسرّعش الحسبة، بيخلّي **الانتظار** يحصل مع بعض.
- [[await]] ورا [[await]] = بالترتيب. التوازي محتاج [[gather]] أو TaskGroup.
- نداء دالة async من غير [[await]] = مفيش حاجة اشتغلت.
- أي حاجة blocking ([[time.sleep]] و [[requests]]) جوه [[async def]] بتوقف الكل.`,
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
          teach: R`## المثال بيعمل إيه؟

دالة واحدة [[get_price]] بتقلّد طلب شبكة بياخد نص ثانية (وبترمي خطأ لو المنتج اسمه [[bad]])، وبنشغّلها بـ ٥ طرق: [[gather]] عادي، و [[gather]] بيرجّع الأخطاء كقيم، و [[TaskGroup]]، و [[timeout]]، و [[Semaphore]] يحدد العدد. الناتج من تشغيل حقيقي بـ Python 3.14 على ويندوز (ضفنا [[print]] وقياس وقت عشان نشوف كل خطوة).

---

## ١. الدالة اللي هنشغّلها

~~~python
async def get_price(sku: str) -> float:
    await asyncio.sleep(0.5)
    if sku == "bad":
        raise ValueError(sku)
    return 10.0
~~~

[[sku]] (Stock Keeping Unit) يعني كود المنتج. الدالة بتستنى نص ثانية بـ [[await]] (فبتسلّم الـ event loop لغيرها)، ولو الكود [[bad]] بترمي [[ValueError]]، غير كده بترجّع [[10.0]].

---

## ٢. [[gather]] العادي

~~~python
prices = await asyncio.gather(get_price("a"), get_price("b"))
~~~

~~~text الناتج
prices [10.0, 10.0] 0.5s
~~~

الاتنين اشتغلوا مع بعض، فالوقت نص ثانية مش ثانية، والنتايج list **بنفس ترتيب** اللي اديته. ولو واحدة منهم رمت (جربناها بـ [[get_price("bad")]])، الـ exception بيطلع من [[await]] على طول:

~~~text الناتج
gather raised ValueError('bad')
~~~

بس الـ tasks التانية **مبتتلغيش**: بتفضل شغالة في الخلفية ومحدش مستني نتيجتها.

---

## ٣. [[return_exceptions=True]]

~~~python
results = await asyncio.gather(get_price("a"), get_price("bad"), return_exceptions=True)
~~~

~~~text الناتج
results [10.0, ValueError('bad')]
~~~

بدل ما يرمي، الخطأ بيترجع **كقيمة** في مكانه في الليستة. فانت بتلف على النتايج وتشوف: [[isinstance(r, Exception)]]؟ ده فشل. ده مفيد لما عايز اللي نجح ومش فارق معاك اللي وقع.

---

## ٤. [[TaskGroup]]

~~~python
async with asyncio.TaskGroup() as tg:
    t1 = tg.create_task(get_price("a"))
    t2 = tg.create_task(get_price("b"))
print(t1.result() + t2.result())
~~~

| الحتة | معناها |
|---|---|
| [[async with]] | زي [[with]] بس للـ async: الدخول والخروج من البلوك فيهم await |
| [[asyncio.TaskGroup()]] | مجموعة tasks (من Python 3.11) |
| [[as tg]] | اسم المجموعة جوه البلوك |
| [[tg.create_task(coro)]] | ابدأ الـ coroutine دي كـ task **دلوقتي**، ورجّعلي الـ Task object |
| آخر البلوك | الخروج من [[async with]] بيستنى لحد ما **كل** الـ tasks تخلص |
| [[t1.result()]] | نتيجة الـ task بعد ما خلصت |

بعد البلوك، [[t1]] طبعناه:

~~~text الناتج
<Task finished name='Task-6' coro=<get_price() done, ...> result=10.0>
20.0
~~~

[[finished]] و [[result=10.0]]: خلصت ونتيجتها جاهزة، و [[10.0 + 10.0 = 20.0]].

### لو واحدة فشلت (التجربة)

لو [[t2]] نادى [[get_price("bad")]]، الـ TaskGroup بيلغي الباقي وبيرمي **[[ExceptionGroup]]**: exception شايل جواه لستة exceptions (عشان ممكن أكتر من task تفشل مع بعض):

~~~text الناتج من غير ما نمسكه
ExceptionGroup: unhandled errors in a TaskGroup (1 sub-exception)
+-+---------------- 1 ----------------
  | ValueError: bad
~~~

و [[except ValueError]] العادية **مش هتمسكه**، لأن اللي طالع نوعه ExceptionGroup. اللي بيمسكه [[except*]] (بنجمة):

~~~python
except* ValueError as eg:
    print("caught:", eg.exceptions)
~~~

~~~text الناتج
caught: (ValueError('bad'),)
~~~

[[except* ValueError]] معناها «طلّع من الجروب كل الـ ValueError»، و [[eg.exceptions]] tuple فيها اللي اتمسك.

---

## ٥. [[asyncio.timeout(0.2)]]

~~~python
try:
    async with asyncio.timeout(0.2):
        await get_price("slow")
except TimeoutError:
    print("اتلغت بعد 0.2 ثانية")
~~~

[[get_price]] محتاجة 0.5 ثانية، والبلوك مسموحله 0.2 بس. بعد 0.2، asyncio بيلغي الـ task اللي جوه (بيرمي فيها [[CancelledError]] عند الـ await اللي واقفة عليه)، وعند الخروج من البلوك بيحوّله لـ [[TimeoutError]] العادي اللي بنمسكه:

~~~text الناتج
اتلغت بعد 0.2 ثانية
~~~

---

## ٦. [[Semaphore]]: حد أقصى للي شغال

~~~python
sem = asyncio.Semaphore(10)
async def limited(sku: str) -> float:
    async with sem:
        return await get_price(sku)
many = await asyncio.gather(*(limited(f"sku{i}") for i in range(100)))
~~~

نفكّه:

1. [[asyncio.Semaphore(10)]]: عدّاد فيه ١٠ «تصاريح».
2. [[async with sem:]]: خد تصريح قبل ما تدخل. لو الـ ١٠ مع ناس تانية، استنى (بـ await، فمش بيقفل الـ loop). ولما تخرج من البلوك التصريح بيرجع.
3. [[limited]] دالة جوه دالة: نفس [[get_price]] بس ملفوفة بالتصريح.
4. [[(limited(f"sku{i}") for i in range(100))]]: generator expression بيعمل ١٠٠ coroutine.
5. [[*(...)]]: النجمة بتفرد الـ ١٠٠ كـ arguments منفصلة لـ [[gather]] (هو بياخد coroutines مش list).

~~~text الناتج
100 [10.0, 10.0, 10.0] 5.1s
~~~

ليه ٥ ثواني؟ ١٠٠ طلب ÷ ١٠ في المرة = ١٠ دفعات، كل دفعة نص ثانية = ٥ ثواني. والـ 0.1 الزيادة تكلفة الـ loop نفسه.

### التجربة: ١٠ ولا ٥٠

الـ solCode بيجرب الرقمين:

~~~text الناتج
10 5.1s
50 1.0s
~~~

مع ٥٠: دفعتين × نص ثانية = ثانية. القاعدة: الوقت ≈ (عدد الطلبات ÷ الحد) × وقت الطلب. والحد مش للسرعة، ده عشان متغرّقش الـ API أو القاعدة اللي بتكلمها.

---

## الطرق كلها

| الطريقة | لو واحدة فشلت | امتى |
|---|---|---|
| [[gather(a(), b())]] | الخطأ يطلع، والباقي يكمّل في الخلفية | كلهم مهمين وعايز النتايج بالترتيب |
| [[gather(..., return_exceptions=True)]] | الخطأ يرجع كقيمة | عايز اللي نجح |
| [[TaskGroup]] | الباقي يتلغي، و [[ExceptionGroup]] يطلع | لازم كلهم ينجحوا (الأأمن) |
| [[timeout(s)]] | [[TimeoutError]] بعد s ثانية | حوالين أي نداء لحاجة برّه |
| [[Semaphore(n)]] | مش بيأثر | عدد كبير وعايز أقصى n في نفس الوقت |

## الخلاصة

- [[gather]] و [[TaskGroup]] الاتنين بيشغّلوا مع بعض، والفرق في الفشل: TaskGroup بيلغي الباقي ويرمي ExceptionGroup.
- [[ExceptionGroup]] بيتمسك بـ [[except*]] مش [[except]].
- أي نداء لخدمة بره يتحط حواليه [[timeout]].
- [[Semaphore]] بيحدد التوازي، والوقت ≈ (العدد ÷ الحد) × وقت الطلب.`,
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
          teach: R`## المثال بيعمل إيه؟

بيقارن دالتين async بيعملوا نفس الشغلانة (يستنوا ثانية ويجيبوا صفحة من النت): [[bad]] بأدوات sync بتقفل الـ event loop، و [[good]] بأدوات async بتسيبه. وبعدين بيوريك الحل لما تكون **مضطر** لكود sync تقيل (hash باسورد): [[asyncio.to_thread]]. اتشغّل بـ Python 3.14 على ويندوز، ومعاه FastAPI 0.142 للتجربة.

---

## ١. الـ imports

~~~python
import asyncio
import hashlib
import os
import time
import requests
import httpx
~~~

| المكتبة | هنستخدمها في إيه |
|---|---|
| [[hashlib]] | فيها [[scrypt]]: hash للباسورد بطيء عن قصد |
| [[os]] | [[os.urandom(16)]]: ١٦ byte عشوائية للـ salt |
| [[time]] | [[time.sleep]]: sleep **sync** |
| [[requests]] | مكتبة HTTP **sync** (مشهورة، بس بتقفل الـ thread وهي مستنية) |
| [[httpx]] | مكتبة HTTP فيها نسخة **async** ([[AsyncClient]]) |

[[requests]] و [[httpx]] مش جوه Python، بيتسطّبوا بـ [[pip install requests httpx]].

---

## ٢. [[bad()]]: async بالاسم بس

~~~python
async def bad() -> str:
    time.sleep(1)
    return requests.get("https://example.com", timeout=5).text
~~~

- [[time.sleep(1)]]: مفيش [[await]]، فالـ thread بينام ثانية كاملة. والـ event loop عايش في الـ thread ده، فطول الثانية دي **مفيش أي coroutine تاني بيشتغل**.
- [[requests.get(url, timeout=5)]]: بيبعت GET ويستنى الرد، برضه من غير await. [[timeout=5]] أقصى انتظار ٥ ثواني، و [[.text]] الـ body كنص.

كلمة [[async]] قدام الدالة مبتخليش اللي جواها async. اللي بيسلّم الـ loop هو [[await]] على حاجة async بجد.

## ٣. [[good()]]: النسخة الصح

~~~python
async def good() -> str:
    await asyncio.sleep(1)
    async with httpx.AsyncClient(timeout=5) as client:
        r = await client.get("https://example.com")
    return r.text
~~~

- [[await asyncio.sleep(1)]]: نفس الثانية، بس الـ loop فاضي يخدم غيرك فيها.
- [[async with httpx.AsyncClient(timeout=5) as client:]]: افتح client (فيه connection pool)، وأول ما البلوك يخلص يتقفل لوحده. [[async with]] لأن الفتح والقفل نفسهم فيهم await.
- [[r = await client.get(...)]]: نفس الطلب، بس وانت مستني الرد الـ loop شغّال.

### نشوف الفرق بعينينا

شغّلنا كل دالة جنب coroutine تاني بيطبع [[tick]] كل 0.2 ثانية (بـ [[gather]]):

~~~text الناتج مع bad
tick 1.71
tick 1.92
...
bad 577 2.73s
~~~

~~~text الناتج مع good
tick 0.0
tick 0.2
tick 0.41
...
good 577 1.81s
~~~

مع [[bad]] أول [[tick]] اتأخر لحد 1.71 ثانية: الـ ticker كان جاهز من الأول، بس الـ loop كان متقفل في [[time.sleep]] و [[requests]]. مع [[good]] بدأ في 0.0 وكمّل عادي. و [[577]] طول الصفحة اللي رجعت (نفس الصفحة في الاتنين).

---

## ٤. الحسبة التقيلة: [[hash_password]]

~~~python
def hash_password(pw: str) -> bytes:
    salt = os.urandom(16)
    return salt + hashlib.scrypt(pw.encode(), salt=salt, n=2**14, r=8, p=1)
~~~

| الحتة | معناها |
|---|---|
| [[def]] (مش async) | دالة sync عادية |
| [[os.urandom(16)]] | salt: ١٦ byte عشوائية مختلفة لكل باسورد، عشان باسوردين زي بعض ميطلعش ليهم نفس الـ hash |
| [[pw.encode()]] | الـ str لـ bytes (الـ hash بيشتغل على bytes) |
| [[n=2**14]] | مقدار الشغل (16384). كل ما يكبر الـ hash أبطأ وأصعب في التخمين |
| [[r=8, p=1]] | حجم البلوك وعدد المرات المتوازية، القيم الشائعة |
| [[salt + ...]] | بنلزق الـ salt قدام الـ hash عشان وقت الـ login نعرف نحسبه تاني |

الناتج [[bytes]] طوله ٨٠: ١٦ للـ salt و ٦٤ للـ hash (الطول الافتراضي لـ scrypt). والحسبة خدت حوالي 0.08 ثانية على الجهاز ده، وده وقت الـ loop كان هيتقفل فيه لو ناديناها مباشرة جوه [[async def]].

## ٥. [[asyncio.to_thread]]

~~~python
async def register(pw: str) -> bytes:
    return await asyncio.to_thread(hash_password, pw)
asyncio.run(register("secret"))
~~~

[[asyncio.to_thread(fn, arg)]] بيبعت [[fn(arg)]] تتنفّذ في thread تاني (من thread pool جاهز)، ويرجّعلك حاجة تعمل لها [[await]]. الـ loop فاضي لغيرك لحد ما الـ thread يخلص. لاحظ إنك بتدّيله **الدالة نفسها** ([[hash_password]] من غير أقواس) والـ arguments بعدها، مش [[hash_password(pw)]]، وإلا هتتنفّذ هنا قبل ما توصل للـ thread.

---

## ٦. التجربة في FastAPI

~~~python
@app.get("/slow")
async def slow():
    time.sleep(5)
    return {"ok": True}
~~~

وبعتنا طلبين مع بعض من Git Bash:

~~~bash
seq 2 | xargs -P2 -I{} curl -s localhost:8000/slow
~~~

- [[seq 2]] بيطبع 1 و 2 (سطرين).
- [[xargs -P2]] بيشغّل الأمر اللي بعده مرة لكل سطر، و [[-P2]] يعني اتنين في نفس الوقت. و [[-I{}]] مكان السطر (مش مستخدم هنا، بس بيخلي كل سطر نداء منفصل).

قسنا كل طلب بـ [[curl -w " %{time_total}s"]]:

~~~text مع time.sleep(5)
{"ok":true} 5.006010s
{"ok":true} 9.995280s
~~~

~~~text مع await asyncio.sleep(5)
{"ok":true} 5.020322s
{"ok":true} 5.019615s
~~~

الطلب التاني في الأولى استنى الأول يخلص بالكامل. ولما شغّلنا السيرفر بـ [[PYTHONASYNCIODEBUG=1]] (على PowerShell: [[$env:PYTHONASYNCIODEBUG="1"]] قبل [[fastapi dev main.py]])، asyncio كتب في اللوج:

~~~text الناتج (مختصر)
Executing <Task finished name='Task-6' coro=<RequestResponseCycle.run_asgi() done, ...> result=None ...> took 5.004 seconds
~~~

يعني «الخطوة دي فضلت ماسكة الـ loop ٥ ثواني». الـ debug mode بيطبع السطر ده لأي خطوة أكتر من 0.1 ثانية.

---

## إيه اللي بيقفل وإيه الحل

| بيقفل الـ loop | الحل |
|---|---|
| [[time.sleep]] | [[await asyncio.sleep]] |
| [[requests.get]] | [[httpx.AsyncClient]] |
| [[psycopg2]] | [[asyncpg]] |
| مكتبة sync مفيش بديل ليها | [[await asyncio.to_thread(fn, ...)]] أو خلّي الـ route [[def]] |
| حسبة Python تقيلة (loops) | process تانية (درس ThreadPoolExecutor و ProcessPoolExecutor) |

## الخلاصة

- [[async def]] مش ضمان: أي سطر من غير [[await]] بياخد وقت بيوقف **كل** الطلبات.
- اسأل على كل I/O جوه [[async def]]: فيه [[await]]؟
- [[to_thread]] بتاخد الدالة والـ arguments منفصلين.
- [[PYTHONASYNCIODEBUG=1]] بيفضح الخطوات اللي ماسكة الـ loop.`,
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
          teach: R`## المثال بيعمل إيه؟

تطبيق FastAPI فيه ٣ routes: واحد [[async def]] صح (كل I/O فيه بـ await)، وواحد [[def]] عادي فيه sleep (صح برضه)، وواحد [[async def]] فيه sleep sync (غلط). الفكرة: FastAPI بيشغّل النوعين بطريقتين مختلفتين، والكلمة دي بتفرق تحت الضغط. اتشغّل بـ FastAPI 0.142 و Python 3.14 على ويندوز، والطلبات من Git Bash ومن PowerShell 7.

---

## ١. التجهيز

~~~python
import time
import httpx
from fastapi import FastAPI
app = FastAPI()
~~~

- [[time]] عشان [[time.sleep]] (sync)، و [[httpx]] عشان HTTP async.
- [[from fastapi import FastAPI]]: الكلاس الأساسي، و [[app = FastAPI()]] التطبيق اللي هنسجّل عليه الـ routes. الاسم [[app]] هو اللي [[fastapi dev]] بيدوّر عليه.

---

## ٢. [[/async-ok]]: async def والكل بـ await

~~~python
@app.get("/async-ok")
async def async_ok():
    async with httpx.AsyncClient() as client:
        r = await client.get("https://example.com")
    return {"status": r.status_code}
~~~

- [[@app.get("/async-ok")]]: decorator بيقول «لو جالك GET على المسار ده، نادي الدالة اللي تحتي».
- [[async def]]: FastAPI بيعمل لها [[await]] **على الـ event loop مباشرة** (نفس الـ thread اللي بيستقبل كل الطلبات).
- جواها كل انتظار بـ [[await]]، فوانت مستني example.com الـ loop بيخدم طلبات تانية.
- [[r.status_code]]: كود الرد (200 يعني تمام).

~~~bash
curl -s localhost:8000/async-ok
~~~

~~~text الناتج
{"status":200}
~~~

## ٣. [[/sync-ok]]: def عادية

~~~python
@app.get("/sync-ok")
def sync_ok():
    time.sleep(1)
    return {"ok": True}
~~~

دالة [[def]] من غير async. FastAPI (عن طريق Starlette و AnyIO) بيشوف إنها مش coroutine، فبيشغّلها في **threadpool**: thread منفصل من مجموعة جاهزة. [[time.sleep(1)]] بينيّم الـ thread ده بس، والـ loop فاضي. و [[True]] في Python بتطلع [[true]] في JSON.

## ٤. [[/broken]]: async def وجواها sync

~~~python
@app.get("/broken")
async def broken():
    time.sleep(1)
    return {"ok": "بس الـ API كله وقف ثانية"}
~~~

[[async def]]، فـ FastAPI بيشغّلها على الـ loop مباشرة، و [[time.sleep(1)]] بيوقف الـ loop نفسه. الطلب ده بيرد عادي ([[200 OK]])، المشكلة في **كل الطلبات التانية** في الثانية دي.

---

## ٥. التجربة: ٢٠ طلب مع بعض

~~~bash
seq 20 | xargs -P20 -I{} curl -s localhost:8000/broken
~~~

[[seq 20]] بيطبع ٢٠ سطر، و [[xargs -P20]] بيشغّل [[curl]] مرة لكل سطر، ٢٠ في نفس الوقت. قسنا الوقت بـ [[time]] قدام الأمر:

~~~text الناتج
/broken  (20 طلب):  real 0m20.168s
/sync-ok (20 طلب):  real 0m1.760s
~~~

وعلى ويندوز في PowerShell 7 ([[-Parallel]] مش موجود في Windows PowerShell 5.1):

~~~powershell
Measure-Command { 1..20 | ForEach-Object -Parallel { curl.exe -s localhost:8000/broken } -ThrottleLimit 20 }
~~~

[[1..20]] أرقام من ١ لـ ٢٠، و [[ForEach-Object -Parallel]] بيشغّل البلوك لكل رقم بالتوازي، و [[-ThrottleLimit 20]] أقصى ٢٠ مع بعض، و [[Measure-Command]] بيقيس الوقت. طلعت [[20.33]] ثانية لـ [[/broken]] و [[1.69]] لـ [[/sync-ok]]. ([[curl.exe]] بالـ exe عشان في Windows PowerShell 5.1 كلمة [[curl]] لوحدها اسم مستعار لـ [[Invoke-WebRequest]].)

### نقرا الأرقام

- [[/broken]]: ٢٠ × ثانية = ٢٠ ثانية. كل طلب قفل الـ loop ثانية، فاتنفّذوا واحد ورا التاني.
- [[/sync-ok]]: الـ ٢٠ ناموا مع بعض في ٢٠ thread، فخلصوا في ثانية وشوية (الزيادة وقت تشغيل [[curl]] نفسه).

### حد الـ threadpool: ٤٠

الـ threadpool الافتراضي في AnyIO فيه **٤٠** thread (اتأكدنا: [[anyio.to_thread.current_default_thread_limiter().total_tokens]] طبع [[40]]). جربنا ٥٠ طلب على [[/sync-ok]]:

~~~text الناتج
real 0m2.834s
~~~

حوالي ثانيتين: ٤٠ في الدفعة الأولى، والـ ١٠ الباقيين استنوا thread يفضى. يعني [[def]] آمنة بس مش بلا حدود.

---

## إمتى أنهي واحدة

| الدالة | FastAPI بيشغّلها فين | جواها | النتيجة |
|---|---|---|---|
| [[async def]] | على الـ event loop | كل I/O بـ [[await]] | الأخف، بتستحمل آلاف الطلبات |
| [[def]] | في threadpool (٤٠) | مكتبات sync | آمنة، محدودة بعدد الـ threads |
| [[async def]] | على الـ event loop | نداء sync واحد | الـ API كله بيقف |

## الخلاصة

- [[async def]] = لازم كل حاجة جواها async.
- مكتبة sync (requests و psycopg2 و SDK قديم) = اكتب الـ route [[def]].
- مش متأكد ومفيش [[await]]؟ [[def]] أأمن.
- نفس القاعدة على الـ dependencies.`,
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
          teach: R`## المثال بيعمل إيه؟

عنده نوعين شغل: [[fetch_sync]] بتستنى (زي طلب شبكة بمكتبة sync)، و [[count_primes]] بتحسب (CPU خالص). بيشغّل الانتظار على **threads** والحسبة على **processes**، وفي الآخر بيعمل نفس الحاجتين من جوه كود async. الناتج من تشغيل حقيقي بـ Python 3.14 على ويندوز، جهاز فيه ١٦ logical processor.

---

## ١. الـ imports

~~~python
import asyncio
import time
from concurrent.futures import ProcessPoolExecutor, ThreadPoolExecutor, as_completed
~~~

[[concurrent.futures]] مكتبة جوه Python فيها نوعين **pool** (مجموعة workers جاهزة بتاخد منها شغل) بنفس الواجهة:

| الاسم | بيشغّل الشغل في | مناسب لـ |
|---|---|---|
| [[ThreadPoolExecutor]] | threads جوه نفس الـ process | انتظار I/O بمكتبة sync |
| [[ProcessPoolExecutor]] | processes منفصلة، كل واحدة Python لوحدها | حسبة CPU بـ Python |
| [[as_completed]] | دالة | بتطلّعلك النتايج أول ما كل واحدة تخلص |

---

## ٢. الدالتين

~~~python
def fetch_sync(url: str) -> str:
    time.sleep(1)
    return f"{url}: 200"
~~~

بتقلّد [[requests.get]]: ثانية انتظار، وبترجّع نص.

~~~python
def count_primes(limit: int) -> int:
    return sum(1 for n in range(2, limit) if all(n % d for d in range(2, int(n**0.5) + 1)))
~~~

نفكّها من جوه لبرة:

1. [[int(n**0.5) + 1]]: [[**]] أُس، و [[0.5]] يعني جذر تربيعي. كفاية نجرّب القواسم لحد جذر الرقم.
2. [[n % d]]: باقي القسمة. لو صفر يبقى [[d]] بيقسم [[n]].
3. [[all(n % d for d in ...)]]: [[True]] لو **كل** البواقي مش صفر، يعني [[n]] أولي. (صفر في Python بيتحسب False.)
4. [[1 for n in range(2, limit) if ...]]: [[1]] لكل رقم أولي.
5. [[sum(...)]]: اجمع الآحاد = عدد الأعداد الأولية.

حسبة Python خالصة، مفيهاش أي انتظار. [[count_primes(500_000)]] طلّعت [[41538]] (و [[_]] في [[500_000]] مجرد فاصل للقراية).

---

## ٣. الـ threads للانتظار

~~~python
urls = [f"https://api.example.com/items/{i}" for i in range(8)]
with ThreadPoolExecutor(max_workers=8) as pool:
    futures = {pool.submit(fetch_sync, u): u for u in urls}
    for fut in as_completed(futures):
        print(fut.result())
~~~

| الحتة | معناها |
|---|---|
| [[ThreadPoolExecutor(max_workers=8)]] | اعمل ٨ threads |
| [[with ... as pool:]] | في آخر البلوك استنى كل الشغل يخلص واقفل الـ threads |
| [[pool.submit(fetch_sync, u)]] | ابعت النداء ده لأي thread فاضي، ورجّعلي **Future** على طول (من غير ما تستنى) |
| [[{...: u for u in urls}]] | dict comprehension: كل Future قدامه الرابط بتاعه |
| [[as_completed(futures)]] | لف على الـ Futures **بترتيب الخلوص** مش بترتيب البعت |
| [[fut.result()]] | الناتج، ولو الدالة رمت exception بيترمي هنا |

**Future** يعني «إيصال»: نتيجة لسه جاية، تسأله عليها بعدين.

~~~text الناتج
https://api.example.com/items/0: 200
...
https://api.example.com/items/5: 200
https://api.example.com/items/6: 200
https://api.example.com/items/4: 200
https://api.example.com/items/7: 200
threads: 1.0s
~~~

لاحظ [[4]] طلعت بعد [[6]]: ده [[as_completed]]، أول واحدة تخلص تطبع. والوقت ثانية مش ٨، لأن الـ thread وهو نايم بيسيب الـ **GIL** (القفل اللي بيخلي thread واحد بس ينفّذ Python في نفس اللحظة)، فالتمانية بيناموا مع بعض.

---

## ٤. الـ processes للحسبة

~~~python
with ProcessPoolExecutor() as pool:
    results = list(pool.map(count_primes, [500_000] * 4))
~~~

- [[ProcessPoolExecutor()]] من غير رقم: عدد الـ processes = عدد الـ cores.
- [[[500_000] * 4]]: list فيها نفس الرقم ٤ مرات = ٤ مهام.
- [[pool.map(fn, items)]]: نادي [[fn]] على كل عنصر، والنتايج **بترتيب الـ input**. بيرجع iterator، و [[list(...)]] بتستنى الكل.

~~~text الناتج
41538 processes: 2.5s
~~~

كل process ليها interpreter و GIL لوحدها، فالأربعة بيحسبوا فعلًا في نفس الوقت على cores مختلفة.

---

## ٥. نفس الكلام جوه async: [[handler()]]

~~~python
async def handler() -> list[str]:
    one = await asyncio.to_thread(fetch_sync, "https://legacy-sdk")
    loop = asyncio.get_running_loop()
    with ProcessPoolExecutor(max_workers=2) as pool:
        primes = await loop.run_in_executor(pool, count_primes, 100_000)
    return [one, str(primes)]
~~~

- [[asyncio.to_thread(fn, arg)]]: الدالة الـ sync في thread، والـ loop فاضي.
- [[asyncio.get_running_loop()]]: هات الـ event loop الشغال دلوقتي.
- [[loop.run_in_executor(pool, fn, arg)]]: زي [[to_thread]] بس على أي executor تختاره، هنا process pool. ومبيقبلش keyword arguments.

~~~text الناتج
['https://legacy-sdk: 200', '9592']
~~~

[[9592]] عدد الأعداد الأولية تحت ١٠٠ ألف.

## ٦. [[if __name__ == "__main__":]]

~~~python
if __name__ == "__main__":
    main()
    print(asyncio.run(handler()))
~~~

[[__name__]] بيبقى [[__main__]] لما تشغّل الملف مباشرة. على ويندوز والماك (ومن 3.14 على لينكس كمان) كل process جديدة في الـ pool بتعمل **import للملف من الأول**. من غير الشرط ده، كل process هتنادي [[main()]] تاني وتحاول تعمل pool جوه pool.

---

## ٧. التجربة: ٥ قياسات

الـ solCode فيه دالة [[bench]] بتقيس الوقت لـ ٤ مهام بـ [[max_workers=4]]:

- [[executor is None]]: شغّل بالترتيب بـ list comprehension.
- غير كده: [[with executor(max_workers=4) as pool]] و [[pool.map]].
- [[f"{label:<22}..."]]: [[<22]] يعني اكتب الاسم على عرض ٢٢ حرف من الشمال، و [[5.1f]] رقم بعرض ٥ وخانة عشرية.

~~~text الناتج على الجهاز ده
CPU serial              7.2s
CPU threads             7.0s
CPU processes           2.2s
I/O serial              4.0s
I/O threads             1.0s
~~~

| السطر | ليه |
|---|---|
| CPU threads ≈ serial | الحسبة محتاجة الـ GIL طول الوقت، فالـ threads بيستنوا بعض |
| CPU processes أسرع ~3x مش 4x | تكلفة تشغيل الـ processes ونقل الداتا بـ pickle (تحويل الـ objects لـ bytes) |
| I/O threads ثانية بدل ٤ | الـ threads بتسيب الـ GIL وهي نايمة |

أرقامك هتختلف حسب الجهاز، بس الشكل نفسه.

## الخلاصة

| الشغل | الأداة |
|---|---|
| انتظار بمكتبة sync | [[ThreadPoolExecutor]] (أو [[to_thread]] جوه async) |
| حسبة Python تقيلة | [[ProcessPoolExecutor]] (أو [[run_in_executor]] جوه async) |
| انتظار بمكتبة async | [[asyncio.gather]]، مش threads |

- [[submit]] + [[as_completed]] بترتيب الخلوص، و [[map]] بترتيب الإدخال.
- [[fut.result()]] هو اللي بيطلّع الـ exception، فمتنساهوش.
- ProcessPool محتاج [[if __name__ == "__main__":]] ودوال على مستوى الـ module (مش lambda).`,
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
          teach: R`## المثال بيعمل إيه؟

بيعرّف موديل عميل [[Customer]] فيه قيود على كل حقل (طول، regex، قيم محددة، تاريخ، رقم في مدى، وموديل جوه موديل). وبعدين بيعمل منه object بداتا سليمة (فيتحوّل ويتنضّف)، ومرة بداتا غلط (فيترمي [[ValidationError]] فيه ٤ أخطاء). اتشغّل بـ Pydantic 2.13 و Python 3.14 على ويندوز ([[python main.py]]).

---

## ١. الـ imports

~~~python
from datetime import date
from typing import Annotated, Literal
from pydantic import BaseModel, ConfigDict, Field, ValidationError
~~~

| الاسم | بيعمل إيه |
|---|---|
| [[date]] | نوع التاريخ (يوم وشهر وسنة) |
| [[Annotated]] | نوع + معلومات زيادة |
| [[Literal]] | قيم محددة بس |
| [[BaseModel]] | الأب اللي أي موديل بيورث منه |
| [[ConfigDict]] | إعدادات الموديل |
| [[Field]] | قيود و default لحقل |
| [[ValidationError]] | الخطأ اللي بيترمي لو الداتا غلط |

---

## ٢. نوع بقيوده: [[Price]]

~~~python
Price = Annotated[float, Field(gt=0, le=1_000_000)]
~~~

[[Price]] مش موديل، ده **اسم لنوع**: float أكبر من صفر ([[gt]]) وأقل من أو يساوي مليون ([[le]]). تكتبه مرة وتستخدمه في أي موديل.

## ٣. موديل صغير: [[Address]]

~~~python
class Address(BaseModel):
    city: str
    street: str | None = None
~~~

- [[city: str]] من غير [[=]]: **إجباري**.
- [[street: str | None = None]]: نص أو None، والـ default None، يعني اختياري.

---

## ٤. الموديل الأساسي: [[Customer]]

~~~python
class Customer(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)
    name: str = Field(min_length=2)
    phone: str = Field(pattern=r"^01[0125]\d{8}$")
    tier: Literal["free", "pro"] = "free"
    birthday: date | None = None
    budget: Price = 100
    address: Address
~~~

### [[model_config]]

اسم محجوز: إعدادات الموديل كله، مش حقل.

- [[extra="forbid"]]: أي حقل زيادة مش متعرّف = خطأ. (الافتراضي [[ignore]]: بيتشال بهدوء.)
- [[str_strip_whitespace=True]]: شيل المسافات من أول وآخر أي string.

### الحقول

| الحقل | القيد | يعني |
|---|---|---|
| [[name]] | [[min_length=2]] | حرفين على الأقل، **بعد** شيل المسافات |
| [[phone]] | [[pattern=r"..."]] | لازم يطابق الـ regex |
| [[tier]] | [[Literal["free", "pro"]]] | واحدة من الاتنين، والافتراضي free |
| [[birthday]] | [[date | None]] | تاريخ أو مفيش |
| [[budget]] | [[Price]] | النوع اللي عملناه، والافتراضي 100 |
| [[address]] | [[Address]] | موديل جوه موديل، إجباري |

### الـ regex بتاع الموبايل

[[r"..."]] raw string: الـ [[\]] تفضل زي ما هي. والـ pattern [[^01[0125]\d{8}$]]:

| الحتة | معناها |
|---|---|
| [[^]] | أول النص |
| [[01]] | يبدأ بـ 01 |
| [[[0125]]] | رقم واحد من دول (فودافون واتصالات وأورانج ووي) |
| [[\d{8}]] | ٨ أرقام |
| [[$]] | آخر النص (مفيش حاجة زيادة) |

---

## ٥. داتا سليمة

~~~python
c = Customer(name="  Sara ", phone="01012345678", birthday="1999-05-01", address={"city": "Cairo"})
print(c.name, c.birthday.year, c.address.city)
~~~

~~~text الناتج
Sara 1999 Cairo
~~~

اللي حصل وقت الإنشاء:

- [["  Sara "]] اتنضّفت [[Sara]] ([[str_strip_whitespace]]).
- [["1999-05-01"]] string اتحوّل [[date]] حقيقي، فـ [[.year]] اشتغلت. ده الوضع العادي (lax): بيحوّل اللي ليه معنى.
- [[{"city": "Cairo"}]] dict اتحوّل object من [[Address]]، فـ [[c.address.city]] اشتغلت.

> لاحظ: [[c.budget]] طلع [[100]] (int) مش [[100.0]]. Pydantic **مبيفحصش الـ defaults** افتراضيًا، فالقيمة بتفضل زي ما كتبتها. لو بعتّ [[budget="50"]] بيتحوّل [[50.0]] لأنه اتفحص.

---

## ٦. داتا غلط

~~~python
try:
    Customer(name="S", phone="123", address={}, role="admin")
except ValidationError as e:
    print(e.error_count())
    print(e.errors()[0]["loc"], e.errors()[0]["msg"])
~~~

~~~text الناتج
4
('name',) String should have at least 2 characters
~~~

- [[e.error_count()]] عدد الأخطاء.
- [[e.errors()]] list فيها كل خطأ كـ dict، و [[[0]]] أولهم.

ولو طبعت [[e.errors()]] كلها (التجربة):

~~~text الناتج
{'type': 'string_too_short', 'loc': ('name',), 'msg': 'String should have at least 2 characters', 'input': 'S', 'ctx': {'min_length': 2}, 'url': '...'}
{'type': 'string_pattern_mismatch', 'loc': ('phone',), 'msg': "String should match pattern '^01[0125]\\d{8}$'", 'input': '123', ...}
{'type': 'missing', 'loc': ('address', 'city'), 'msg': 'Field required', 'input': {}, ...}
{'type': 'extra_forbidden', 'loc': ('role',), 'msg': 'Extra inputs are not permitted', 'input': 'admin', ...}
~~~

| الخانة | معناها |
|---|---|
| [[type]] | كود ثابت للخطأ (للكود: ترجمة الرسايل مثلًا) |
| [[loc]] | المكان: [[('address', 'city')]] يعني جوه address، حقل city |
| [[msg]] | رسالة للبني آدمين |
| [[input]] | القيمة اللي اتبعتت |
| [[ctx]] | تفاصيل القيد |

Pydantic **مبيقفش عند أول خطأ**: بيجمعهم كلهم. و [[print(e)]] نفسه بيطبعهم بشكل مقروء (أول سطر [[4 validation errors for Customer]]).

---

## ٧. [[model_json_schema()]]

~~~python
Customer.model_json_schema()
~~~

~~~text الناتج (مختصر)
"required": ["name", "phone", "address"]
"additionalProperties": false
"phone":  {"pattern": "^01[0125]\\d{8}$", "type": "string"}
"tier":   {"enum": ["free", "pro"], "default": "free"}
"budget": {"exclusiveMinimum": 0, "maximum": 1000000, "default": 100, "type": "number"}
"address": {"$ref": "#/$defs/Address"}
~~~

نفس القيود، بس بلغة JSON Schema: [[gt]] بقت [[exclusiveMinimum]]، و [[le]] بقت [[maximum]]، و [[extra="forbid"]] بقت [[additionalProperties: false]]، و [[Address]] اتحط في [[$defs]]. ده اللي FastAPI بيعرضه في [[/docs]].

## ٨. [[strict=True]]

| | [[budget="50"]] |
|---|---|
| الوضع العادي (lax) | بيعدّي ويبقى [[50.0]] |
| [[ConfigDict(strict=True)]] | [[1 validation error ... Input should be a valid number [type=float_type, input_value='50', input_type=str]]] |

---

## الخلاصة

- الموديل = class بيورث [[BaseModel]]، والحقول = type hints.
- من غير default = إجباري، و [[X | None = None]] = اختياري.
- [[Field(...)]] للقيود، و [[Annotated[T, Field(...)]]] لنوع بقيوده تعيد استخدامه.
- [[ValidationError]] فيه **كل** الأخطاء، وكل واحد فيه [[loc]] و [[msg]] و [[type]].
- الـ extra الافتراضي [[ignore]] مش [[forbid]]، والـ defaults مبتتفحصش.`,
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
          teach: R`## المثال بيعمل إيه؟

بيعمل موديل [[Item]] ويحوّل بيه في كل اتجاه: من dict لموديل، ومن موديل لـ dict ولـ JSON، ومن JSON string لموديل، ونسخة معدّلة، وليستة موديلات مرة واحدة، ومن object عادي (زي صف ORM) لموديل. اتشغّل بـ Pydantic 2.13 و Python 3.14 على ويندوز، وضفنا [[print]] بعد كل خطوة.

---

## ١. الموديل

~~~python
from datetime import datetime
from pydantic import BaseModel, ConfigDict, TypeAdapter
class Item(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    note: str | None = None
    created_at: datetime
~~~

- [[from_attributes=True]]: اسمح للموديل يتبني من أي object عنده attributes بنفس الأسماء (مش dict بس). هنحتاجها في آخر خطوة.
- [[note]] اختياري، و [[created_at]] من نوع [[datetime]] (تاريخ ووقت).
- [[TypeAdapter]] للخطوة ٧.

---

## ٢. [[model_validate]]: من dict لموديل

~~~python
item = Item.model_validate({"id": 1, "name": "Tea", "created_at": "2026-01-10T09:00:00Z"})
~~~

نفس [[Item(**data)]]، بس بياخد الـ dict كما هو. بيفحص ويحوّل:

~~~text الناتج (repr(item))
Item(id=1, name='Tea', note=None, created_at=datetime.datetime(2026, 1, 10, 9, 0, tzinfo=TzInfo(0)))
~~~

[[2026-01-10T09:00:00Z]] صيغة ISO 8601: [[T]] بتفصل التاريخ عن الوقت، و [[Z]] يعني UTC، فبقت [[tzinfo=TzInfo(0)]] (فرق صفر عن UTC).

---

## ٣. [[model_dump]]: من موديل لـ dict

~~~python
print(item.model_dump())
print(item.model_dump(mode="json", exclude_none=True))
~~~

~~~text الناتج
{'id': 1, 'name': 'Tea', 'note': None, 'created_at': datetime.datetime(2026, 1, 10, 9, 0, tzinfo=TzInfo(0))}
{'id': 1, 'name': 'Tea', 'created_at': '2026-01-10T09:00:00Z'}
~~~

| الخيار | بيعمل إيه |
|---|---|
| (الافتراضي) [[mode="python"]] | الـ objects تفضل objects: [[created_at]] نوعه [[<class 'datetime.datetime'>]] |
| [[mode="json"]] | كل حاجة تبقى نوع JSON: [[created_at]] بقى [[<class 'str'>]] |
| [[exclude_none=True]] | شيل الحقول اللي قيمتها None ([[note]] اختفت) |

ليه ده مهم؟ جربنا [[json.dumps(item.model_dump())]]:

~~~text الناتج
TypeError: Object of type datetime is not JSON serializable
~~~

[[json]] بتاعة Python متعرفش datetime. فلو هتحفظ الـ dict كـ JSON (Redis مثلًا)، استخدم [[mode="json"]].

## ٤. [[model_dump_json]]: من موديل لـ JSON string

~~~python
print(item.model_dump_json(include={"id", "name"}))
~~~

~~~text الناتج
{"id":1,"name":"Tea"}
~~~

string جاهز يتبعت، ومتعمل جوه Rust (أسرع من [[json.dumps]]). و [[include={...}]] set بأسماء الحقول اللي عايزها بس (وعكسها [[exclude]]).

---

## ٥. [[model_validate_json]]: من JSON string لموديل

~~~python
raw = '{"id": 2, "name": "Coffee", "created_at": "2026-01-10T10:00:00Z"}'
item2 = Item.model_validate_json(raw)
~~~

~~~text الناتج
Item(id=2, name='Coffee', note=None, created_at=datetime.datetime(2026, 1, 10, 10, 0, tzinfo=TzInfo(0)))
~~~

بدل [[json.loads(raw)]] وبعدين [[model_validate]]: خطوة واحدة جوه Rust، أسرع وذاكرة أقل.

## ٦. [[model_copy]]: نسخة معدّلة

~~~python
renamed = item.model_copy(update={"name": "Green tea"})
~~~

~~~text الناتج
renamed: Green tea | original: Tea
~~~

الأصل متغيرش. بس خد بالك: [[update]] **مبيفحصش**. جربنا [[model_copy(update={"id": "not-a-number"})]] وعدّت، و [[id]] بقى [[not-a-number]] string. لو محتاج فحص: [[Item.model_validate({**item.model_dump(), "id": ...})]].

---

## ٧. [[TypeAdapter]]: فحص أي نوع

~~~python
items = TypeAdapter(list[Item]).validate_python([{"id": 3, "name": "Cake", "created_at": "2026-01-10T11:00:00Z"}])
~~~

[[model_validate]] موجودة على الموديلات بس. لو عايز تفحص [[list[Item]]] (أو [[dict[str, int]]] أو أي نوع)، [[TypeAdapter(النوع)]] بيدّيك [[validate_python]] و [[validate_json]] و [[dump_python]] و [[json_schema]].

~~~text الناتج
[Item(id=3, name='Cake', note=None, created_at=datetime.datetime(2026, 1, 10, 11, 0, tzinfo=TzInfo(0)))]
~~~

بناء الـ TypeAdapter مكلف، فاعمله مرة على مستوى الـ module، مش جوه دالة بتتنادى كتير.

---

## ٨. [[from_attributes]]: من object لموديل

~~~python
class Row:
    id, name, note, created_at = 4, "Juice", None, datetime(2026, 1, 1)
from_orm = Item.model_validate(Row())
~~~

[[Row]] class عادي، والسطر التاني بيعمل ٤ class attributes مرة واحدة. [[Row()]] object منه زي صف راجع من SQLAlchemy:

~~~text الناتج
Item(id=4, name='Juice', note=None, created_at=datetime.datetime(2026, 1, 1, 0, 0))
~~~

ومن غير [[from_attributes]] (التجربة):

~~~text الناتج
Input should be a valid dictionary or instance of Item [type=model_type, input_value=<__main__.Row object at 0x...>, input_type=Row]
~~~

---

## الجدول كله (ومقابله في v1)

| عايز | v2 | v1 القديم |
|---|---|---|
| dict → موديل | [[model_validate(d)]] | [[parse_obj]] |
| JSON → موديل | [[model_validate_json(s)]] | [[parse_raw]] |
| موديل → dict | [[model_dump()]] | [[.dict()]] |
| موديل → JSON | [[model_dump_json()]] | [[.json()]] |
| نسخة | [[model_copy(update=...)]] | [[.copy()]] |
| من ORM | [[from_attributes=True]] | [[orm_mode]] |
| أي نوع | [[TypeAdapter(T)]] | [[parse_obj_as]] |

## الخلاصة

- كل حاجة في v2 بتبدأ بـ [[model_]].
- [[model_dump()]] بيسيب datetime كـ object، و [[mode="json"]] بيحوّله string.
- [[model_validate_json]] أحسن من [[json.loads]] + validate.
- [[model_copy(update=...)]] مبيفحصش.`,
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
          teach: R`## المثال بيعمل إيه؟

موديل حجز [[Booking]] فيه ٣ إضافات بتاعتك: validator على حقل الإيميل (ينضّفه ويتأكد إنه إيميل الشركة)، و validator على الموديل كله (تاريخ النهاية بعد البداية)، وحقل محسوب [[nights]] (عدد الليالي). اتشغّل بـ Pydantic 2.13 و Python 3.14 على ويندوز.

---

## ١. الـ imports

~~~python
from datetime import date
from typing import Self
from pydantic import BaseModel, computed_field, field_validator, model_validator
~~~

- [[Self]] (من Python 3.11): نوع معناه «object من نفس الكلاس ده». هنكتبه نوع رجوع للـ model validator.
- الباقي ٣ decorators هنشرحهم تحت.

## ٢. الحقول

~~~python
class Booking(BaseModel):
    email: str
    start: date
    end: date
    guests: int
~~~

كلهم إجباريين. و [[start]] و [[end]] هيتحوّلوا من [["2026-03-01"]] لـ [[date]].

---

## ٣. [[@field_validator]]: حقل واحد

~~~python
@field_validator("email")
@classmethod
def normalize_email(cls, v: str) -> str:
    v = v.strip().lower()
    if not v.endswith("@company.com"):
        raise ValueError("لازم إيميل الشركة")
    return v
~~~

| السطر | معناه |
|---|---|
| [[@field_validator("email")]] | الدالة دي تشتغل على حقل [[email]] |
| [[@classmethod]] | لازم تحته: الدالة بتاخد الكلاس [[cls]] مش object (الـ object لسه مااتعملش) |
| [[v: str]] | القيمة، **بعد** ما Pydantic اتأكد إنها str (الوضع الافتراضي [[mode="after"]]) |
| [[v.strip().lower()]] | شيل المسافات وحوّل لحروف صغيرة |
| [[raise ValueError(...)]] | ارفض، و Pydantic بيحوّلها لخطأ عادي في الـ ValidationError |
| [[return v]] | **لازم**: اللي بترجعه هو اللي بيتخزن. لو نسيته الحقل يبقى None |

## ٤. [[@model_validator(mode="after")]]: الموديل كله

~~~python
@model_validator(mode="after")
def check_dates(self) -> Self:
    if self.end <= self.start:
        raise ValueError("end لازم بعد start")
    return self
~~~

- [[mode="after"]]: بعد ما **كل** الحقول اتفحصت واتحوّلت، فـ [[self.start]] و [[self.end]] أكيد [[date]] وتقدر تقارنهم.
- مفيش [[@classmethod]] هنا: بياخد [[self]] (الـ object نفسه).
- [[<=]] بين تاريخين: [[end]] قبل أو يساوي [[start]] = غلط.
- [[return self]] **لازم**.

## ٥. [[@computed_field]]: حقل محسوب

~~~python
@computed_field
@property
def nights(self) -> int:
    return (self.end - self.start).days
~~~

- [[@property]]: دالة بتتقري كأنها attribute ([[b.nights]] من غير أقواس).
- [[@computed_field]] فوقها: ضيفها لـ [[model_dump]] وللـ JSON.
- [[self.end - self.start]]: طرح تاريخين بيدّي [[timedelta]] (مدة)، و [[.days]] عدد الأيام فيها.

---

## ٦. التشغيل

~~~python
b = Booking(email=" Sara@Company.com ", start="2026-03-01", end="2026-03-04", guests=2)
print(b.model_dump())
~~~

~~~text الناتج
{'email': 'sara@company.com', 'start': datetime.date(2026, 3, 1), 'end': datetime.date(2026, 3, 4), 'guests': 2, 'nights': 3}
~~~

- الإيميل اتنضّف ([[sara@company.com]]): الـ validator رجّع القيمة المعدّلة.
- [[nights: 3]] ظهر في الـ dump مع إنه مش حقل اتبعت (من ١ لـ ٤ مارس = ٣ ليالي).

---

## ٧. التجارب

جربنا ٣ حالات غلط وطبعنا [[type]] و [[loc]] و [[msg]] لكل خطأ:

~~~text الناتج
إيميل gmail                 → value_error ('email',) Value error, لازم إيميل الشركة
end قبل start               → value_error () Value error, end لازم بعد start
الاتنين غلط مع بعض           → value_error ('email',) Value error, لازم إيميل الشركة
~~~

نقرا:

- [[loc: ()]] tuple فاضي: الخطأ على **الموديل كله** مش حقل معين، لأنه من model validator.
- Pydantic بيزوّد [[Value error, ]] قبل رسالتك. خد بالك لو بتعرضها للمستخدم.
- في الحالة التالتة ظهر خطأ الإيميل **بس**: لو أي حقل فشل، الـ [[model_validator(mode="after")]] مبيشتغلش أصلًا (مفيش موديل سليم يفحصه).

وكمان:

| جربنا | النتيجة |
|---|---|
| [[b.guests = 100]] بعد الإنشاء | عدّت من غير فحص (إلا لو [[validate_assignment=True]]) |
| بعتنا [[nights=99]] | اتجاهلت: الـ computed field مبيتقبلش كـ input |
| [[model_json_schema(mode="serialization")]] | [[nights]] فيه [[readOnly: True]] |

### [[field_validator]] ولا [[Field(le=6)]]؟ (الـ solCode)

الـ solCode بيعمل نفس القاعدة (أقصى ٦ ضيوف) بطريقتين:

~~~text الناتج مع guests=7
WithValidator: {'type': 'value_error', 'loc': ('guests',), 'msg': 'Value error, max 6 guests', ...}
WithField:     {'type': 'less_than_equal', 'loc': ('guests',), 'msg': 'Input should be less than or equal to 6', 'ctx': {'le': 6}, ...}
~~~

وفي الـ JSON Schema: [[WithField]] فيه [[maximum: 6]]، و [[WithValidator]] مفيهوش حاجة. يعني [[Field]] أقصر، ورسالته ونوعه أوضح، وبيظهر في [[/docs]]. خلّي الـ validator للقواعد اللي [[Field]] ميعرفش يعبّر عنها.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| قيد بسيط (رقم، طول، regex) | [[Field(...)]] |
| تنضيف أو قاعدة على حقل | [[@field_validator("x")]] + [[@classmethod]] + [[return v]] |
| قاعدة بين حقلين | [[@model_validator(mode="after")]] + [[return self]] |
| قيمة محسوبة في الـ JSON | [[@computed_field]] + [[@property]] |

- ارمي [[ValueError]] مش [[assert]].
- الـ validators بتشتغل وقت الإنشاء بس.`,
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
          teach: R`## المثال بيعمل إيه؟

بيعرّف كل إعدادات التطبيق في class واحد [[Settings]]: كل حقل بيتملي من متغير بيئة بنفس الاسم أو من ملف [[.env]]، وبيتفحص ويتحوّل لنوعه. وبعدين بيعمل دالة بترجّع الإعدادات مرة واحدة (cache)، ويستخدمها كـ dependency في route. اتجرب بـ pydantic-settings 2.15 و FastAPI 0.142 و Python 3.14 على ويندوز.

---

## ١. الـ imports

~~~python
from functools import lru_cache
from typing import Annotated, Literal
from fastapi import Depends, FastAPI
from pydantic import PostgresDsn, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict
~~~

| الاسم | منين | بيعمل إيه |
|---|---|---|
| [[lru_cache]] | functools | بيحفظ ناتج الدالة، فتتنفّذ مرة واحدة |
| [[Depends]] | fastapi | يخلّي باراميتر ييجي من دالة (dependency) |
| [[PostgresDsn]] | pydantic | URL لازم يبدأ بـ [[postgresql://]] أو زيه |
| [[SecretStr]] | pydantic | string مبيتطبعش |
| [[BaseSettings]] | pydantic_settings | زي BaseModel بس بيقرا من البيئة |
| [[SettingsConfigDict]] | pydantic_settings | إعداداته |

[[pydantic_settings]] مكتبة **منفصلة** ([[pip install pydantic-settings]])، وجاية مع [[fastapi[standard]]].

---

## ٢. الكلاس

~~~python
class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")
~~~

- [[env_file=".env"]]: اقرا الملف ده كمان (لو موجود) من الفولدر اللي شغّلت منه.
- [[env_file_encoding="utf-8"]]: الملف UTF-8.
- [[extra="ignore"]]: لو [[.env]] فيه متغيرات ملهاش حقل، تجاهلها.

### الحقول

~~~python
    env: Literal["dev", "test", "prod"] = "dev"
    database_url: PostgresDsn
    redis_url: str = "redis://localhost:6379/0"
    jwt_secret: SecretStr
    cors_origins: list[str] = ["http://localhost:5173"]
    db_pool_size: int = 10
~~~

| الحقل | بيقرا من | إجباري؟ |
|---|---|---|
| [[env]] | [[ENV]]، وقيمه ٣ بس | لأ (dev) |
| [[database_url]] | [[DATABASE_URL]] | **أيوه** |
| [[redis_url]] | [[REDIS_URL]] | لأ |
| [[jwt_secret]] | [[JWT_SECRET]] | **أيوه** |
| [[cors_origins]] | [[CORS_ORIGINS]] كـ **JSON** | لأ |
| [[db_pool_size]] | [[DB_POOL_SIZE]] | لأ (10) |

اسم الحقل بالحروف الصغيرة بيلاقي المتغير بالكبيرة: المطابقة مش حساسة لحالة الحروف افتراضيًا.

---

## ٣. مرة واحدة: [[@lru_cache]]

~~~python
@lru_cache
def get_settings() -> Settings:
    return Settings()
~~~

[[Settings()]] من غير arguments = «اقرا كل حاجة من البيئة و .env وافحص». و [[@lru_cache]] بيحفظ الناتج: أول نداء بيقرا، والباقي بيرجّع نفس الـ object (جربنا [[get_settings() is get_settings()]] طلعت [[True]]).

## ٤. كـ dependency

~~~python
SettingsDep = Annotated[Settings, Depends(get_settings)]
app = FastAPI()
@app.get("/info")
async def info(settings: SettingsDep):
    return {"env": settings.env, "pool": settings.db_pool_size}
~~~

- [[Annotated[Settings, Depends(get_settings)]]]: «النوع Settings، والقيمة تيجي من نداء [[get_settings]]». بنديله اسم [[SettingsDep]] عشان نكرره بسهولة.
- [[settings: SettingsDep]]: FastAPI بينادي [[get_settings()]] ويديك الناتج. وفي الاختبارات تقدر تبدّلها ([[app.dependency_overrides]]).

---

## ٥. من غير [[.env]]

شغّلنا [[fastapi run main.py]] وطلبنا [[/info]]:

~~~text الناتج
Internal Server Error          ← 500 للعميل
~~~

~~~text اللي في الترمنال
INFO:     Application startup complete.
ERROR:    Exception in ASGI application
pydantic_core._pydantic_core.ValidationError: 2 validation errors for Settings
database_url
  Field required [type=missing, input_value={}, input_type=dict]
jwt_secret
  Field required [type=missing, input_value={}, input_type=dict]
~~~

السيرفر **قام عادي** ([[startup complete]])، والخطأ ظهر مع أول طلب، لأن [[get_settings()]] مبتتناداش غير ساعتها. عشان كده الأحسن تناديها في الـ lifespan (اللي بيشتغل وقت القيام): السيرفر يرفض يقوم بدل ما يقع مع أول مستخدم. والحلو إن الرسالة فيها **كل** المتغيرات الناقصة مرة واحدة.

---

## ٦. مع [[.env]]

~~~text .env
DATABASE_URL=postgresql://app:secret@localhost:5432/shop
JWT_SECRET=change-me-please-32-chars-minimum
CORS_ORIGINS=["https://shop.example.com"]
~~~

سطر لكل متغير، [[NAME=value]] من غير مسافات حوالين [[=]]. وطبعنا:

~~~text الناتج
/info                         → {'env': 'dev', 'pool': 10}
s.database_url                → PostgresDsn('postgresql://app:secret@localhost:5432/shop')
str(s.database_url)           → postgresql://app:secret@localhost:5432/shop
s.cors_origins                → ['https://shop.example.com']
s.db_pool_size                → 10  (int)
~~~

- [[database_url]] نوعه [[PostgresDsn]] مش str: لما تبعته لـ asyncpg اعمل [[str(...)]].
- [[cors_origins]] اتقرا JSON واتحوّل list.

### [[SecretStr]]

~~~text الناتج
print(s.jwt_secret)                  → **********
repr(s.jwt_secret)                   → SecretStr('**********')
s.jwt_secret.get_secret_value()      → change-me-please-32-chars-minimum
print(s)                             → ... jwt_secret=SecretStr('**********') ...
~~~

لو اللوج طبع الـ settings كلها، السر مش هيطلع. بس لاحظ إن [[database_url]] **طالع بالباسورد** ([[app:secret]]): [[PostgresDsn]] مش سر. لو مش عايزه يتطبع، خلّيه [[SecretStr]] وافحصه بنفسك، أو اقسمه لحقول.

---

## ٧. التجارب

متغير البيئة بيتحط **للأمر ده بس** في Git Bash كده: [[DB_POOL_SIZE=abc python ...]]. وفي PowerShell: [[$env:DB_POOL_SIZE = "abc"]] قبل الأمر (بيفضل لحد ما تقفل الترمنال بس، مش دايم).

| جربنا | النتيجة |
|---|---|
| [[DB_POOL_SIZE=abc]] | [[db_pool_size Input should be a valid integer, unable to parse string as an integer]] |
| [[DB_POOL_SIZE=25 ENV=prod]] | [[25 prod]]: [[25]] اتحوّل int |
| [[ENV=staging]] | [[Input should be 'dev', 'test' or 'prod']] |
| [[DATABASE_URL=mysql://x@h/db]] | [[URL scheme should be 'postgres', 'postgresql', 'postgresql+asyncpg', ...]] |
| [[CORS_ORIGINS=https://a.com]] (مش JSON) | [[SettingsError: error parsing value for field "cors_origins" from source "EnvSettingsSource"]] |
| [[$env:DATABASE_URL]] غير اللي في .env | متغير البيئة **كسب** |
| [[Settings(db_pool_size=3)]] | [[3]]: الـ argument كسب على الكل |

### الأولوية

~~~text
Settings(x=...)  >  متغيرات البيئة  >  .env  >  الـ default
~~~

يعني على السيرفر حط المتغيرات الحقيقية في البيئة (Docker أو systemd)، و [[.env]] لجهازك بس.

---

## الخلاصة

- [[BaseSettings]] = موديل بيتملي من البيئة و [[.env]]، بنفس الفحص.
- حقل من غير default = متغير لازم يتعرّف، والخطأ بيقول اسمه.
- list و dict بيتكتبوا JSON في المتغير.
- [[SecretStr]] للأسرار، و [[get_secret_value()]] وقت الاستخدام بس.
- [[@lru_cache]] + [[Depends]]: مرة واحدة، وسهل تبدّلها في الاختبار.
- [[.env]] في [[.gitignore]] دايمًا.`,
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

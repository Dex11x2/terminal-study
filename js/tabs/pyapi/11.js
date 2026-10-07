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
    }
]);

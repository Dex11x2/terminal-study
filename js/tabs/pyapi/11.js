// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "async و await",
      l: 2,
      time: R`حوالي ٩ ساعات (٦ دروس)`,
      goal: [
        R`تفهم الـ event loop: coroutine إيه، و [[await]] بيعمل إيه، وليه [[await]] ورا [[await]] مش أسرع، وتعرف بالأرقام إن async بيسرّع الانتظار مش الحساب.`,
        R`تشغّل شغل كتير مع بعض بأمان: [[gather]] و [[TaskGroup]] و [[asyncio.timeout]] و [[Semaphore]]، وتعرف كل واحدة بتعمل إيه لما مهمة تفشل.`,
        R`تبني طابور workers بـ [[asyncio.Queue]]، وتلغي tasks صح وتقفل البرنامج نضيف، وتعرف ليه بلع [[CancelledError]] بيعلّق البرنامج.`,
        R`تكتشف وتصلّح الكود اللي بيقفل الـ loop، وتختار [[def]] ولا [[async def]] لكل route في FastAPI.`,
        R`تختار بين threads و processes و async لكل نوع شغل، وتقيس الفرق بنفسك.`,
      ],
      use: {
        prog: R`FastAPI و httpx و asyncpg و redis كلهم async. أي route بيكلّم داتابيز أو API تاني بيستفيد، وأي غلطة (sync جوه [[async def]]) بتقفل الـ API كله تحت الضغط.`,
        work: R`crawler، و importer، و worker بيقرا من طابور، و API بيكلّم ٥ خدمات تانية في نفس الطلب، و service بيتقفل نضيف لما الـ container يتعمله restart. دي أشكال async الحقيقية في الشغل.`,
        cs: R`الـ event loop بيعتمد على [[select]] و [[epoll]] و IOCP في النظام (يستنى كذا socket في نداء واحد)، والـ coroutines بتتبدّل بشكل تعاوني (cooperative) مش preemptive زي الـ threads، والـ GIL قفل واحد على تنفيذ bytecode في الـ process.`,
      },
      projects: [
        { lvl: 'صغير', t: R`فاحص مواقع متوازي`, what: R`[[ping_sites.py]] بيفحص ١٠ مواقع وهمية (كل واحد [[asyncio.sleep]] عشوائي ونسبة فشل) بـ [[gather(return_exceptions=True)]] و [[asyncio.timeout]] لكل واحد، ويطبع جدول بالحالة والوقت مترتب. من درسين async def و gather.`, done: R`الوقت الكلي قريب من أبطأ موقع (أو الـ timeout) مش المجموع، والموقع البطيء [[timeout]] والفاشل باسم الـ exception، والجدول متترتب بالوقت.` },
        { lvl: 'صغير', t: R`كاشف الـ loop المقفول`, what: R`[[watchdog()]] task صغيرة بتنام ٠.٠٥ في لفة وتقيس التأخير، وتطبع تحذير فيه الوقت لو التأخير أكبر من ١٠٠ ملي ثانية. حطها مع كود فيه [[time.sleep]] وكود سليم. من درس blocking في async.`, done: R`مع [[time.sleep(0.5)]] بيطبع تحذير بتأخير حوالي ٥٠٠ ملي ثانية، ومع [[asyncio.sleep]] مبيطبعش ولا تحذير، و [[debug=True]] بيأكد نفس النتيجة.` },
        { lvl: 'متوسط', t: R`importer بطابور`, what: R`[[importer.py data.csv]] بيقرا CSV سطر سطر (producer) ويحط الصفوف في [[asyncio.Queue(maxsize=100)]]، و ٥ workers بيبعتوا كل صف لـ [[save(row)]] وهمية (٠.٠١ ثانية ونسبة فشل)، والفاشل بيتعاد مرتين وبعدين يتكتب في [[failed.csv]]، وفي الآخر [[shutdown]]. من الوحدة دي ووحدة الملفات.`, done: R`على ١٠ آلاف صف بيخلص في حوالي (١٠٠٠٠ × ٠.٠١ ÷ ٥) ثانية، والذاكرة ثابتة، و [[failed.csv]] فيه الصفوف اللي فشلت ٣ مرات بالظبط، والبرنامج بيخرج نضيف (ومع Ctrl+C في النص بيقفل في أقل من ثانية).` },
        { lvl: 'متوسط', t: R`API بـ routes صح`, what: R`FastAPI فيه ٤ routes: واحد بيكلّم ٣ خدمات وهمية مع بعض بـ [[TaskGroup]]، وواحد بيستخدم SDK sync وهمي، وواحد بيعمل scrypt، وواحد بيعمل حسبة Python تقيلة. اختار لكل واحد ([[async def]] و [[def]] و [[to_thread]] و process pool في الـ lifespan). من كل دروس الوحدة.`, done: R`٢٠ طلب مع بعض على أي route مبيأخرش الـ routes التانية (اتقاس)، والـ process pool بيتعمل مرة واحدة ويتقفل في آخر الـ lifespan، واختبار بـ [[TestClient]] لكل route بيعدّي.` },
        { lvl: 'كبير', t: R`crawler متين لموقع واحد`, what: R`[[crawl.py https://example.com --max-pages 50 --concurrency 5]]: طابور URLs + workers بـ [[httpx.AsyncClient]] (واحد مشترك)، وكل طلب ليه timeout و retry بانتظار متزايد، وبيستخرج اللينكات بـ regex (درس re) ويحط الجديدة اللي في نفس الدومين بس، وبيحترم [[--concurrency]]، وبيسجّل كل صفحة (status والوقت وعدد اللينكات) في JSON Lines، ويكتب ملخص في الآخر بـ [[write_atomic]]. Ctrl+C بيوقّف الـ producer، ويخلّي الـ workers يخلّصوا اللي في إيدهم، ويكتب الملخص الجزئي. من الوحدة دي ووحدات الملفات والـ collections و re والسكربتات.`, done: R`على [[example.com]] (أو سيرفر محلي بـ [[python -m http.server]] فيه ٣٠ صفحة متربطة) بيزور كل صفحة مرة واحدة بس، وعمره ما بيعدّي [[--concurrency]] طلب في نفس الوقت (عدّاد بيثبت)، والصفحة اللي بترجع 500 بتتعاد مرتين وتتسجّل فشل، و Ctrl+C بيخرج في أقل من ثانيتين والملخص الجزئي مكتوب وصالح، و ١٠ اختبارات بـ [[httpx.MockTransport]] (من غير نت) بتعدّي، والتشغيل التاني بنفس الأمر بيطلع نفس النتيجة.`, ext: R`زوّد احترام [[robots.txt]]، و rate limit بالثانية لكل دومين، وحفظ الحالة عشان يكمّل من مكان ما وقف، ولما توصل لـ Redis خلّي الطابور Redis عشان كذا process يشتغلوا مع بعض.` },
        { lvl: 'فكرة', t: R`قيس async في مشروعك`, what: R`خد أي كود عندك بيعمل كذا نداء شبكة أو داتابيز ورا بعض (سكربت، أو endpoint) وحوّله async بـ [[gather]] أو طابور، وقيس قبل وبعد. انت بتختار الكود وطريقة القياس.`, done: R`فيه رقمين حقيقيين (قبل وبعد) بنفس الداتا، والناتج نفسه متطابق، وكاتب إيه اللي اتحسّن وإيه اللي مااتحسّنش (الحسابات) وليه.`, ext: R`اكتب ملخص بأرقامك يتحط في README المشروع أو في الـ portfolio: المشكلة، والقياس، والحل، والنتيجة.` },
      ],
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب في ٣ سطور: يعني إيه coroutine، وإيه اللي بيحصل لما تنادي [[async def]] من غير [[await]]، وإيه وظيفة [[asyncio.run]]، وليه [[await]] ورا [[await]] مش أسرع.`, done: R`كاتب إن النداء بيرجّع coroutine object من غير ما يشغّل حاجة، وإن [[asyncio.run]] بيعمل الـ loop ويشغّل main ويقفل، وإن الـ await بيستنى قبل اللي بعده، وجرّبت [[print(type(fetch_user(1)))]] وشفت [[RuntimeWarning: ... was never awaited]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[async def step(n): print("start", n); await asyncio.sleep(n / 10); print("end", n); return n]] و [[main]] فيها [[print(await asyncio.gather(step(3), step(1), step(2)))]]. اكتب السطور السبعة بالترتيب قبل ما تشغّل.`, done: R`طابق: [[start 3]] و [[start 1]] و [[start 2]] الأول (بترتيب البعت)، وبعدين [[end 1]] و [[end 2]] و [[end 3]] (بترتيب الخلوص)، وآخر سطر [[[3, 1, 2]]] (بترتيب البعت تاني).` },
            { lvl: 'تطبيق', t: R`**صلّح:** الكود ده بياخد ٣ ثواني بدل ثانية: [[results = [await fetch_user(i) for i in range(3)]]]. وفي سطر تاني [[user = fetch_user(5); print(user["id"])]] بيرمي. صلّح الاتنين واكتب الرسالة الأصلية لكل واحد.`, done: R`الأول بقى [[await asyncio.gather(*(fetch_user(i) for i in range(3)))]] والقياس [[1.0s]]، والتاني كان [[TypeError: 'coroutine' object is not subscriptable]] وبقى [[user = await fetch_user(5)]]، ومفيش [[RuntimeWarning]] في الآخر.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[check_sites(urls)]] بتفحص ٥ مواقع وهمية (كل واحد [[asyncio.sleep]] بوقت مختلف من ٠.١ لـ ١ ثانية، وواحد بيرمي [[ConnectionError]]) وترجّع dict من الموقع لـ «ok بعد كذا ثانية» أو «failed». الوقت الكلي لازم يبقى قريب من أبطأ واحد.`, done: R`الـ dict فيه الـ ٥ (منهم واحد failed)، والوقت الكلي حوالي ثانية مش مجموع الأوقات (حوالي ٢.٥)، والموقع اللي بيرمي موقّفش الباقيين (استخدمت [[return_exceptions=True]] أو try جوه كل واحد).` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** كرر جدول «async بيكسب إمتى» على جهازك، وزوّد صفين: ١٠٠ نداء [[time.sleep(0.1)]] جوه [[async def]] بـ [[gather]] (غلط مقصود)، و ١٠٠ [[asyncio.to_thread(time.sleep, 0.1)]].`, done: R`عندك ٨ أرقام من جهازك، والصف الغلط حوالي ١٠ ثواني (الـ loop اتقفل في كل واحدة) والـ [[to_thread]] حوالي ثانية أو أقل (threads الـ pool بتنام مع بعض)، وكاتب ليه الاتنين مختلفين.` },
            { lvl: 'تحدي', t: R`**اشرحها:** ارسم (على ورقة أو في تعليق) timeline للـ event loop وهو بيشغّل [[gather(fetch_user(1), fetch_user(2))]]: كل لحظة مين شغال، ومين مستني، والـ loop بيعمل إيه. وبعدين نفس الرسم لـ [[await fetch_user(1); await fetch_user(2)]].`, done: R`الرسم الأول فيه الاتنين بيبدأوا قبل أي انتظار ويخلصوا عند ثانية، والتاني التانية بتبدأ عند ثانية وتخلص عند ٢، وفي الاتنين واضح إن فيه thread واحد بس، وزميل قراه وفهم من غير شرح منك.` },
          ],
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

## async بيكسب إمتى؟ بالأرقام

قيست ٣ أنواع شغل بنفس الطريقة (Python 3.14، ويندوز ١١، ١٦ core):

~~~python
def cpu(n=200_000):
    return sum(i * i for i in range(n))
async def io():
    await asyncio.sleep(0.1)
async def cpu_async():
    return cpu()
~~~

~~~text اتقاس فعلًا
I/O x100 sequential await: 10.84s
I/O x100 gather: 0.11s
I/O x10000 gather: 0.18s
CPU x8 plain: 0.11s
CPU x8 gather: 0.11s
CPU x8 to_thread: 0.10s
~~~

| الشغل | أحسن طريقة | ليه |
|---|---|---|
| ١٠٠ انتظار ورا بعض | [[gather]]: من ١٠.٨ ثانية لـ ٠.١١ | الانتظار مبيستخدمش CPU، فالـ loop بيستنى المية في نفس الوقت |
| ١٠ آلاف انتظار | [[gather]] (و [[Semaphore]] قدام API حقيقي): ٠.١٨ ثانية | الـ task رخيصة (KB مش MB زي الـ thread) |
| حسبة CPU جوه [[async def]] | مفيش مكسب: ٠.١١ = ٠.١١ | مفيش [[await]] جوه الحسبة، فالـ loop مبيقدرش يبدّل، وكل واحدة بتقفل التانية |
| حسبة CPU في threads | تقريبًا نفس الوقت: ٠.١٠ | الـ GIL بيخلي thread واحد بس يشغّل Python في نفس اللحظة |
| حسبة CPU تقيلة | processes (درس ThreadPoolExecutor و ProcessPoolExecutor): ٦.٢ ثانية لـ ١.٧ | كل process ليها GIL بتاعها على core لوحده |

- ليه ١٠.٨٤ مش ١٠ بالظبط؟ على ويندوز الـ timer بتاع النظام دقته حوالي ١٥ ملي ثانية، فكل [[sleep(0.1)]] بياخد حوالي ٠.١٠٨. في المية نداء الفرق بيتجمع.
- [[sys._is_gil_enabled()]] رجّعت [[True]] على Python 3.14 العادي. فيه نسخة اسمها free-threaded ([[python3.14t]]) من غير GIL بيتسطّب منفصل، وفيها الـ threads بتشتغل على cores مختلفة فعلًا (من الوثائق، متجرّبتش هنا).
- الخلاصة: async بيسرّع **الانتظار**، مش الحساب. API بيكلّم داتابيز و APIs تانية = مكسب كبير. سكربت بيحسب أرقام = مفيش مكسب، وكود async زيادة.

## الخلاصة

- async مبيسرّعش الحسبة، بيخلّي **الانتظار** يحصل مع بعض.
- [[await]] ورا [[await]] = بالترتيب. التوازي محتاج [[gather]] أو TaskGroup.
- نداء دالة async من غير [[await]] = مفيش حاجة اشتغلت.
- أي حاجة blocking ([[time.sleep]] و [[requests]]) جوه [[async def]] بتوقف الكل.`,
          lines: [
            R`[[asyncio]] المكتبة القياسية اللي فيها الـ event loop و [[sleep]] و [[gather]] و [[run]]. كل حاجة async في Python (FastAPI و httpx و asyncpg) شغالة فوقيها.`,
            R`[[time]] لـ [[perf_counter()]] بس: ساعة عالية الدقة للقياس، بنحسب بيها كام ثانية عدّت. **مش** هنستخدم [[time.sleep]] هنا؛ ده بيقفل الـ loop (التجربة ودرس blocking في async).`,
            R`[[async def]] بتعمل **coroutine function**: لما تناديها مبتشتغلش، بترجّع coroutine object ممكن يتوقف عند أي [[await]] ويكمّل بعدين. و [[-> dict]] نوع اللي هيرجع بعد الـ [[await]]، مش الـ coroutine نفسه.`,
            R`[[await asyncio.sleep(1)]] بيقول للـ loop «أنا مستني ثانية، شغّل غيري لحد ما أخلص». ده بيمثّل أي انتظار حقيقي (رد داتابيز، طلب HTTP). [[await]] ينفع بس جوه [[async def]]؛ جوه [[def]] عادية [[SyntaxError: 'await' outside async function]]، وبرّه أي دالة [['await' outside function]].`,
            R`بعد ما الانتظار يخلص، الـ coroutine بتكمّل من نفس النقطة وترجّع dict. اللي عمل [[await fetch_user(1)]] بياخد الـ dict ده كقيمة.`,
            R`[[main]] coroutine تانية بتنظّم الشغل. أي كود فيه [[await]] لازم يبقى جوه [[async def]]، فالـ main نفسها async و [[asyncio.run]] (آخر سطر) هو اللي بيشغّلها.`,
            R`[[perf_counter()]] بيرجّع رقم ثواني بكسور من نقطة ثابتة. الرقم نفسه ملوش معنى؛ الفرق بين قرايتين هو الوقت اللي عدّى.`,
            R`[[await fetch_user(1)]] بيبدأ الأولى **ويستنى** لحد ما ترجع. وانت مستني، الـ loop فاضي لأي task تانية (مفيش غيرها هنا)، بس السطر اللي بعده مش هيبدأ.`,
            R`التانية بتبدأ بعد ما الأولى خلصت بالظبط. [[await]] ورا [[await]] = بالترتيب، زي الكود العادي، والفرق إن الـ loop مش مقفول وانت مستني.`,
            R`[[:.1f]] رقم عشري واحد. الناتج [[2.0s]]: ثانية + ثانية. يعني [[async]] لوحده مش بيسرّع حاجة؛ اللي بيسرّع إنك تشغّل الانتظارات **مع بعض**.`,
            R`عداد جديد للطريقة التانية، عشان نقارن الرقمين.`,
            R`[[gather]] بياخد coroutines ويحوّل كل واحدة لـ task ويشغّلهم مع بعض، ويستنى **كلهم**، ويرجّع النتايج list **بنفس ترتيب** اللي بعته (مش ترتيب الخلوص). فـ [[a]] لسه بتاعة user 1.`,
            R`الناتج [[1.0s]]: الانتظارين حصلوا في نفس الثانية. ده الـ concurrency: thread واحد، بس وهو مستني حاجة بيشتغل على حاجة تانية. ومع ١٠ آلاف انتظار مع بعض الوقت كان [[0.18s]] (قسم الأرقام في الشرح).`,
            R`[[fetch_user(3)]] من غير [[await]] **مبيشغّلش أي سطر** في الدالة. بيعمل coroutine object واقف عند أول سطر ومستني حد يشغّله.`,
            R`[[<class 'coroutine'>]]: مش dict. لو استخدمته على إنه النتيجة ([[coro["id"]]]) هتلاقي [[TypeError: 'coroutine' object is not subscriptable]]، ولو نسيته خالص Python بيطبع في الآخر [[RuntimeWarning: coroutine 'fetch_user' was never awaited]].`,
            R`دلوقتي بس الدالة اشتغلت (ثانية) ورجّعت [[{'id': 3}]]. الـ coroutine بيتعمله [[await]] مرة واحدة بس؛ المرة التانية [[RuntimeError: cannot reuse already awaited coroutine]].`,
            R`[[asyncio.run]] بيعمل event loop جديد، ويشغّل [[main()]] لحد ما تخلص، ويقفل الـ loop وأي tasks فاضلة. بيتنادى **مرة واحدة** في أول البرنامج. في FastAPI مش هتكتبه: uvicorn بيعمل الـ loop وبينادي الـ routes بتاعتك جواه.`,
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** جدول ٤ صفوف ([[gather]] و [[gather(return_exceptions=True)]] و [[TaskGroup]] و [[asyncio.timeout]]): لو واحدة فشلت إيه اللي بيحصل للباقيين؟ وإيه اللي بيوصلك؟`, done: R`الجدول بيقول: gather بيرمي أول خطأ والباقيين **بيكمّلوا** من غير حد يستناهم، و return_exceptions الأخطاء قيم في الليستة، و TaskGroup بيلغي الباقيين ويرمي [[ExceptionGroup]]، و timeout بيلغي اللي جوه ويرمي [[TimeoutError]]، وكل صف ليه سطر جربته.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** TaskGroup فيها ٣ tasks: [[ok(0.3)]] بتطبع [[done ok]] بعد ٠.٣، و [[fail(0.1)]] بترمي [[ValueError]] بعد ٠.١، و [[ok(0.05)]]. إيه اللي هيتطبع؟ وإيه نوع الـ exception برّه البلوك؟ وإزاي تمسكه؟`, done: R`اتطبع [[done ok]] مرة واحدة بس (بتاعة ٠.٠٥، والـ ٠.٣ اتلغت)، والـ exception برّه [[ExceptionGroup]] ([[unhandled errors in a TaskGroup (1 sub-exception)]])، واتمسك بـ [[except* ValueError]]، وطابق التشغيل.` },
            { lvl: 'تطبيق', t: R`**صلّح:** [[results = await asyncio.gather(*(get_price(s) for s in skus), return_exceptions=True)]] وبعدها [[total = sum(results)]] بيرمي [[TypeError]] لما sku بايظ. صلّحه بحيث يجمع الناجح بس ويطبع الـ skus اللي فشلت بأسبابها.`, done: R`على ٥ skus منهم ٢ بايظين: الإجمالي [[30.0]] بالظبط، وسطرين بأسماء الاتنين و [[ValueError]]، ومفيش [[TypeError]]، والكود بيلف بـ [[zip(skus, results)]] عشان يعرف كل نتيجة تبع مين.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** API خارجي وهمي بيقبل ٥ طلبات في نفس الوقت بالكتير (لو جاله السادس وفيه ٥ شغالين بيرمي [[RuntimeError("429")]]، تعدّ الشغالين بعدّاد global). ابعتله ٥٠ طلب بـ [[gather]] من غير حماية، وبعدين بـ [[Semaphore(5)]].`, done: R`من غير حماية: ٤٥ طلب فشل بـ ٤٢٩ (أو رقم قريب)، وبالـ Semaphore: صفر فشل والوقت حوالي ١٠ دفعات × وقت الطلب، وأقصى عدد شغالين اللي سجّلته طول التشغيل [[5]] بالظبط.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[fetch_all(urls, limit=10, timeout=2)]] بترجّع dict من كل url لـ النتيجة أو سبب الفشل ([[timeout]] أو اسم الـ exception)، بـ [[TaskGroup]] و [[Semaphore]] و [[asyncio.timeout]] لكل طلب لوحده (عشان طلب بطيء ميلغيش الكل). استخدم [[asyncio.sleep]] كطلب وهمي.`, done: R`٢٠ url منهم ٣ بطيئين (٥ ثواني) و ٢ بيرموا: الـ dict فيه الـ ٢٠، والبطيئين [[timeout]]، والوقت الكلي حوالي ٢ × عدد الدفعات مش ٥، ومفيش [[ExceptionGroup]] طالع لبرّه.` },
            { lvl: 'تحدي', t: R`**اكتب اختبار:** لـ [[fetch_all]] اكتب ٤ اختبارات pytest (استخدم [[asyncio.run]] جوه اختبار عادي، أو [[pytest-asyncio]] في venv): كله نجح، وواحد timeout، والـ limit متحترم (عدّاد أقصى شغالين)، ولستة فاضية.`, done: R`[[pytest -q]] بيقول [[4 passed]] في أقل من ٣ ثواني (الأوقات في الاختبار صغيرة، ٠.٠١ مش ثواني)، واختبار الـ limit بيقع لو غيّرت [[Semaphore(limit)]] لـ [[Semaphore(100)]].` },
          ],
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
            R`[[asyncio]] لكل أدوات الدرس: [[gather]] و [[TaskGroup]] و [[timeout]] و [[Semaphore]].`,
            R`[[get_price]] coroutine بتمثّل طلب سعر منتج من API خارجي: بتاخد [[sku]] (كود المنتج) وبترجّع رقم.`,
            R`نص ثانية انتظار مكان طلب الشبكة. ده اللي هيخلي الفرق بين «مع بعض» و «ورا بعض» يبان في الأرقام.`,
            R`[[sku == "bad"]] حالة فشل مقصودة، عشان نشوف كل أداة بتعمل إيه لما واحدة من المهام ترمي.`,
            R`[[ValueError(sku)]] بيترمي **بعد** نص الثانية، يعني الـ task التانية كانت شغالة معاها لما الفشل حصل. ده اللي بيفرق بين [[gather]] و [[TaskGroup]] في اللي بيحصل للباقيين.`,
            R`أي sku تاني بيرجّع [[10.0]]. ثابت عشان الأرقام في الناتج تبقى سهلة ([[20.0]] = اتنين).`,
            R`[[main]] بتجرّب الأدوات الأربعة ورا بعض.`,
            R`[[gather]] بيشغّل الاتنين مع بعض ويرجّع list بنفس ترتيب الـ arguments: [[[10.0, 10.0]]] في نص ثانية مش ثانية. ولو واحدة رمت من غير [[return_exceptions]]، الـ exception بيطلع من [[await]] على طول، **والتانية بتفضل شغالة** في الخلفية من غير ما حد يستناها.`,
            R`[[return_exceptions=True]]: الفشل بيرجع **كقيمة** في الليستة بدل ما يترمي: [[[10.0, ValueError('bad')]]]. مفيد لما عايز نتيجة كل واحدة لوحدها (فحص ١٠٠ موقع)، بس لازم تلف وتفحص [[isinstance(r, Exception)]]، وإلا الأخطاء بتعدّي في صمت.`,
            R`[[TaskGroup]] (3.11+) مجموعة tasks جوه [[async with]]: البلوك مبيخلصش غير لما كل الـ tasks تخلص. ولو واحدة رمت، **بيلغي الباقيين** ويرمي [[ExceptionGroup]] فيه كل الأخطاء. ده الـ structured concurrency: مفيش task بتفضل سايبة بعد البلوك.`,
            R`[[tg.create_task]] بيبدأ الـ task **دلوقتي** (مش لما البلوك يخلص) ويرجّع Task object تقدر تسأله عن النتيجة بعدين. الـ group شايل مرجع ليها، فمش هتتمسح من الذاكرة في النص.`,
            R`تانية بتبدأ في نفس اللحظة. الاتنين شغالين مع بعض جوه البلوك.`,
            R`بعد البلوك الاتنين خلصوا أكيد، فـ [[result()]] بيرجّع النتيجة على طول من غير [[await]]: [[20.0]]. لو ناديت [[result()]] على task لسه شغالة: [[InvalidStateError: Result is not set.]].`,
            R`[[try]] حوالين البلوك عشان نمسك الـ timeout ونطبع رسالة بدل ما البرنامج يقع.`,
            R`[[asyncio.timeout(0.2)]] (3.11+): أي حاجة جوه البلوك ليها ٠.٢ ثانية. بعدها asyncio بيلغي الـ task عند الـ [[await]] اللي واقفة عنده (بيرمي [[CancelledError]] جواها)، وبرّه البلوك بيحوّله [[TimeoutError]]. أوضح من [[wait_for]] القديم، وبيغطي كذا [[await]] مع بعض.`,
            R`[[get_price("slow")]] بتاخد ٠.٥ ثانية (sku مش [["bad"]] فمش هترمي)، والبلوك مسموحله ٠.٢، فهتتلغي في النص قبل ما ترجع.`,
            R`[[TimeoutError]] العادي (built-in) من 3.11، مش [[asyncio.TimeoutError]] (اللي بقى نفس الاسم). مسك [[CancelledError]] هنا غلط: ده جوّاني، والـ timeout بيحوّله.`,
            R`بيطبع [[اتلغت بعد 0.2 ثانية]] بعد ٠.٢ ثانية مش ٠.٥. في API حقيقي هنا ترجّع 504 أو قيمة من الـ cache.`,
            R`[[Semaphore(10)]] عدّاد بـ ١٠ تصاريح: أي حد عايز يدخل بياخد تصريح، ولو مفيش بيستنى لحد ما حد يخرج. ده الحد الأقصى للي شغال في نفس الوقت، عشان [[gather]] على ١٠٠ طلب ميضربش الـ API الخارجي مرة واحدة ويطلّع 429.`,
            R`[[limited]] wrapper صغير حوالين [[get_price]]: نفس الـ signature، بس بيستنى تصريح قبل ما ينادي. متعرّفة جوه [[main]] عشان تشوف [[sem]].`,
            R`[[async with sem:]] بياخد تصريح أول ما يدخل ويرجّعه لما يخرج، حتى لو حصل exception. لو فيه ١٠ جوه، الـ ١١ بتقف هنا من غير ما تقفل الـ loop.`,
            R`بنادي الأصلية جوه البلوك، فالتصريح متمسوك طول ما الطلب شغال. و [[return]] جوه [[async with]] بيرجّع التصريح الأول وبعدين يطلع.`,
            R`[[gather(*(...))]] بيفك generator من ١٠٠ coroutine كـ arguments. ١٠٠ طلب كل واحد ٠.٥ ثانية و ١٠ مع بعض = ١٠ دفعات × ٠.٥ = حوالي **٥ ثواني** (من غير السيمافور كانت هتبقى ٠.٥ ثانية، بس على API حقيقي غالبًا 429).`,
            R`[[asyncio.run]] بيشغّل [[main]] من أولها لآخرها في event loop جديد، ويقفل الـ loop في الآخر.`,
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
          cmd: "asyncio.Queue والإلغاء",
          title: "طابور شغل بـ workers، وإزاي تلغي task وتقفل البرنامج صح",
          learn: R`تبني producer/consumer بـ [[asyncio.Queue]] وعدد workers ثابت، وتلغي tasks صح (وتعرف ليه بلع [[CancelledError]] بيعلّق البرنامج)، وتحمي عملية لازم تكمل بـ [[shield]]، وتاخد النتايج بترتيب الخلوص بـ [[as_completed]].`,
          out: R`crawler صغير بـ ٣ workers وطابور محدود، وبيقفل نضيف من غير ما يسيب tasks شغالة.`,
          use: {
            prog: R`[[gather]] بيبدأ كل حاجة مرة واحدة؛ الطابور بيخليك تتحكم في العدد والترتيب والضغط (backpressure) لو المصدر أسرع من المعالجة. ده الشكل اللي ورا أي crawler أو importer أو background worker.`,
            work: R`أي service async لازم يتقفل نضيف لما الـ container يتعمله stop: يخلّص الشغل اللي في إيده، ويلغي الباقي، ومبيعلّقش. وده بيتكسر من سطر [[except Exception]] واحد غلط.`,
          },
          desc: R`[[asyncio.Queue]] طابور الـ tasks بتتكلم بيه: الـ producer بيحط ([[await queue.put(x)]]) والـ workers بياخدوا ([[await queue.get()]])، وكل worker بيقول خلصت ([[task_done()]])، و [[await queue.join()]] بيستنى لحد ما كل اللي اتحط اتعالج. و [[maxsize]] بيخلي [[put]] يستنى لو الطابور مليان، فالـ producer مبيسبقش المعالجة بكتير.

والإلغاء: [[task.cancel()]] بيرمي [[CancelledError]] جوه الـ task عند أقرب [[await]]. الـ task تقدر تنضّف في [[except]] أو [[finally]]، بس **لازم ترميه تاني**؛ لو بلعته الـ task بتكمّل شغالة، والـ timeout مبيشتغلش، و [[asyncio.run]] بيعلّق في الآخر ومبيخلصش أبدًا (اتجرّب).`,
          example: R`import asyncio
import time
async def fetch(url: str) -> int:
    await asyncio.sleep(0.2)
    if url.endswith("7"):
        raise ConnectionError(url)
    return len(url)
async def worker(name: str, queue: asyncio.Queue, results: dict) -> None:
    while True:
        url = await queue.get()
        try:
            results[url] = await fetch(url)
        except ConnectionError as e:
            results[url] = f"failed: {e}"
        finally:
            queue.task_done()
async def main() -> None:
    queue: asyncio.Queue[str] = asyncio.Queue(maxsize=5)
    results: dict[str, int | str] = {}
    workers = [asyncio.create_task(worker(f"w{i}", queue, results)) for i in range(3)]
    start = time.perf_counter()
    for i in range(12):
        await queue.put(f"https://example.com/p{i}")
    await queue.join()
    print(f"12 urls, 3 workers: {time.perf_counter() - start:.1f}s")
    for w in workers:
        w.cancel()
    done = await asyncio.gather(*workers, return_exceptions=True)
    print(sum(isinstance(r, asyncio.CancelledError) for r in done), "workers cancelled")
    print(results["https://example.com/p7"], len(results))
    async def slow(n: float) -> float:
        await asyncio.sleep(n)
        return n
    for coro in asyncio.as_completed([slow(0.3), slow(0.1), slow(0.2)]):
        print("done:", await coro)
asyncio.run(main())`,
          try: R`طوّر الـ crawler: (١) [[fetch_retry]] بتعيد الطلب لحد مرتين بانتظار متزايد (٠.١ ثم ٠.٢) لو [[ConnectionError]] أو timeout، ولكل محاولة [[asyncio.timeout(0.3)]]. (٢) خلّي [[p5]] بطيء (ثانية كاملة) و [[p7]] يفشل أول مرتين وينجح التالتة. (٣) بدل [[cancel]] في الآخر، اقفل الطابور بـ [[queue.shutdown()]] (3.13+) والـ workers يخرجوا لوحدهم لما يمسكوا [[QueueShutDown]]. اطبع الوقت ونتيجة p5 و p7 وعدد محاولات p7.`,
          sol: R`المتوقع (اتشغّل بـ Python 3.14 على ويندوز):

~~~text
1.5s
failed after 3: TimeoutError
22 3
12
~~~

[[p5]] أخد ٣ timeouts (كل محاولة ٠.٣ ثانية وهو محتاج ثانية) فاتسجّل فشل، و [[p7]] نجح في المحاولة التالتة ورجّع طول الـ URL ([[22]]). والوقت ١.٥ ثانية لأن worker واحد قعد مع p5 حوالي ١.٢ ثانية (٣ × ٠.٣ + ٠.١ + ٠.٢ انتظار) والاتنين التانيين خلصوا الباقي.

[[queue.shutdown()]] بعد آخر [[put]] مش بيرمي الشغل اللي في الطابور: الـ workers بيكمّلوا ياخدوا لحد ما يفضى، وبعدها [[get()]] بترمي [[QueueShutDown]] والـ worker بيرجع. فـ [[gather(*workers)]] بيخلص من غير [[cancel]] خالص. ولو عايز توقف فورًا وترمي الباقي: [[shutdown(immediate=True)]].`,
          solCode: R`import asyncio
import time
attempts: dict[str, int] = {}
async def fetch(url: str) -> int:
    attempts[url] = attempts.get(url, 0) + 1
    await asyncio.sleep(1.0 if url.endswith("5") else 0.2)
    if url.endswith("7") and attempts[url] < 3:
        raise ConnectionError(url)
    return len(url)
async def fetch_retry(url: str, retries: int = 2) -> int | str:
    for attempt in range(retries + 1):
        try:
            async with asyncio.timeout(0.3):
                return await fetch(url)
        except (ConnectionError, TimeoutError) as e:
            if attempt == retries:
                return f"failed after {attempt + 1}: {type(e).__name__}"
            await asyncio.sleep(0.1 * 2 ** attempt)
    raise AssertionError("unreachable")
async def worker(queue: asyncio.Queue, results: dict) -> None:
    while True:
        try:
            url = await queue.get()
        except asyncio.QueueShutDown:
            return
        try:
            results[url] = await fetch_retry(url)
        finally:
            queue.task_done()
async def main() -> None:
    queue: asyncio.Queue[str] = asyncio.Queue(maxsize=5)
    results: dict[str, int | str] = {}
    workers = [asyncio.create_task(worker(queue, results)) for _ in range(3)]
    start = time.perf_counter()
    for i in range(12):
        await queue.put(f"https://example.com/p{i}")
    queue.shutdown()
    await asyncio.gather(*workers)
    print(f"{time.perf_counter() - start:.1f}s")
    print(results["https://example.com/p5"])
    print(results["https://example.com/p7"], attempts["https://example.com/p7"])
    print(len(results))
asyncio.run(main())`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من الذاكرة: إيه اللي بيعمله [[put]] و [[get]] و [[task_done]] و [[join]] و [[maxsize]]، وإيه اللي بيحصل لو worker نسي [[task_done]]؟ وإيه الفرق بين [[cancel()]] و [[queue.shutdown()]]؟`, done: R`كاتب الخمسة، وإن نسيان [[task_done]] بيخلي [[join()]] يستنى للأبد (جرّبتها بـ [[asyncio.timeout(2)]] حوالين [[join]] وطلع [[TimeoutError]])، وإن cancel بيقطع في النص و shutdown بيخلّص اللي في الطابور الأول.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** worker فيه [[try: await asyncio.sleep(10) except asyncio.CancelledError: print("cleanup")]] **من غير** [[raise]]، وبعده [[print("after")]]. [[t.cancel(); await t]]: إيه اللي هيتطبع؟ و [[t.cancelled()]] هيبقى إيه؟`, done: R`اتطبع [[cleanup]] و [[after]] (الـ task كمّلت عادي)، و [[await t]] مرماش، و [[t.cancelled()]] بـ [[False]]. وبعد ما زوّدت [[raise]]: [[after]] متطبعتش و [[await t]] رمى [[CancelledError]] و [[cancelled()]] بقت [[True]].` },
            { lvl: 'تطبيق', t: R`**صلّح:** worker فيه [[while True: try: ... except BaseException: log(...)]]، والبرنامج مبيخلصش لما تضغط Ctrl+C أو لما [[asyncio.run]] يخلص. لاقي السبب (شغّله بـ [[timeout]] من الصدفة عشان ميعلّقش جهازك) وصلّحه.`, done: R`قبل التصليح البرنامج علّق بعد آخر سطر (وكاتب إن [[asyncio.run]] بيلغي الـ tasks الفاضلة والـ worker بيبلع الإلغاء)، وبعد [[except Exception]] (اللي مبيمسكش [[CancelledError]] من 3.8) أو [[raise]] صريحة، بيخلص في أقل من ثانية.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** مطبخ مطعم: producer بيحط ٢٠ طلب (كل واحد ليه وقت تحضير من ٠.١ لـ ٠.٥) في طابور [[maxsize=4]]، و ٣ طباخين workers. اطبع لكل طلب مين حضّره وإمتى خلص، والوقت الكلي، وأقصى طول وصل له الطابور.`, done: R`الـ ٢٠ اتحضّروا وكل طلب ليه طباخ، والوقت الكلي قريب من (مجموع الأوقات ÷ ٣)، وأقصى طول الطابور عمره ما عدّى [[4]]، والبرنامج بيخلص نضيف بـ [[shutdown]] من غير tasks فاضلة.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[save_order(order)]] فيها خطوتين: [[await charge_card()]] (٠.٥ ثانية) و [[await send_email()]]. الطلب الكلي ليه [[asyncio.timeout(0.2)]]. خلّي الدفع **يكمل** حتى لو الـ timeout حصل بـ [[asyncio.shield]]، والإيميل يتلغي عادي.`, done: R`مع الـ timeout: [[TimeoutError]] للي نادى، بس [[payment saved]] اتطبعت بعدها بـ ٠.٣ ثانية (الـ task المحمية كمّلت)، والإيميل متبعتش، و [[await]] على الـ task المحمية بعد كده بيرجّع نتيجتها. وكاتب ليه لازم تحتفظ بمرجع للـ task المحمية.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** نفس ١٠٠ مهمة (كل واحدة [[asyncio.sleep]] عشوائي ٠.٠٥–٠.٢) بـ ٣ طرق: [[gather]] كلهم، و [[Semaphore(10)]] + [[gather]]، و طابور + ١٠ workers. قيس الوقت وأقصى عدد شغال في نفس اللحظة وأقصى عدد coroutines موجودة في الذاكرة.`, done: R`جدول بالأرقام التلاتة لكل طريقة من جهازك: gather أسرع بس ١٠٠ شغالين، والاتنين التانيين ١٠ شغالين ووقت قريب من بعض، والطابور فيه ١٠ coroutines بس عايشة (الـ Semaphore فيه ١٠٠ مستنيين)، وكاتب إمتى ده بيفرق (مليون مهمة).` },
          ],
          deep: {
            why: R`[[gather]] على ١٠٠ ألف URL بيعمل ١٠٠ ألف coroutine مرة واحدة، والمصدر نفسه ممكن يبقى مالوش آخر (ملف كبير، أو رسايل جاية من broker). الطابور بيخلي عدد الشغالين ثابت والذاكرة ثابتة. والإلغاء الصح هو الفرق بين service بيتقفل في ثانية و service بيتقتل بـ [[SIGKILL]] بعد ٣٠ ثانية وبيسيب شغل نصه متعمل.`,
            how: R`[[Queue(maxsize=5)]] لو فيه ٥ عناصر، [[await put()]] بيستنى لحد ما worker ياخد واحد (backpressure). و [[get()]] على طابور فاضي بيستنى لحد ما حاجة تتحط. و [[put_nowait]] و [[get_nowait]] بيرموا [[QueueFull]] و [[QueueEmpty]] بدل ما يستنوا.

[[queue.join()]] بيعدّ: كل [[put]] بيزوّد عدّاد، وكل [[task_done()]] بينقّصه، و [[join]] بيرجع لما يبقى صفر. عشان كده [[task_done]] في [[finally]]: لو اتنسى مرة واحدة (حتى لو فيه exception)، [[join]] هيستنى للأبد.

[[task.cancel()]] مش بيقتل حاجة فورًا: بيعلّم الـ task، وعند أقرب [[await]] جواها بيترمي [[CancelledError]]. الـ task بتقدر تنضّف ([[finally]] أو [[except CancelledError: ...; raise]]). [[CancelledError]] وارث من [[BaseException]] مش [[Exception]] (من 3.8)، فـ [[except Exception]] مش بيبلعه، بس [[except BaseException]] أو [[except:]] لوحدها بيبلعوه. والبلع بيكسر حاجات كتير: [[asyncio.timeout]] بيعتمد على الإلغاء، و [[TaskGroup]] بيلغي الباقيين بيه، و [[asyncio.run]] في الآخر بيلغي كل اللي فاضل ويستناه، فـ task بتبلعه بتخلي البرنامج **ميخلصش أبدًا** (اتجرّب: اتقفل بـ [[timeout]] من الصدفة بعد ٢٠ ثانية).

[[asyncio.shield(task)]] بيحمي الـ task من الإلغاء اللي جاي من **برّه**: اللي نادى بيتلغي (وبياخد [[TimeoutError]] أو [[CancelledError]])، والـ task نفسها بتكمّل. لازم تحتفظ بمرجع ليها، وإلا ممكن تتمسح من الذاكرة. استخدامه نادر ولعمليات لازم تخلص (دفع، كتابة في داتابيز).

[[asyncio.as_completed(coros)]] بيرجّع iterator على awaitables بترتيب **الخلوص**: أول واحدة تخلص بتطلع الأول ([[0.1]] ثم [[0.2]] ثم [[0.3]]). مفيد لما عايز تعرض النتايج أول بأول. ومن 3.13 بيرجّع الـ tasks الأصلية لو لفيت بـ [[async for]].

و [[asyncio.create_task]] لوحدها (من غير TaskGroup): الـ loop شايل مرجع ضعيف بس، فلو محتفظتش بالـ task في متغير أو set، ممكن تتمسح وهي شغالة. ولو رمت ومحدش عملها [[await]]، Python بيطبع [[Task exception was never retrieved]] بس لما تتمسح (اتجرّب)، والخطأ نفسه ضاع.`,
            when: R`طابور + workers لما المهام كتير أو مالهاش آخر، أو المصدر أسرع من المعالجة، أو عايز عدد ثابت من الاتصالات. [[gather]] أو [[TaskGroup]] لعدد صغير ومعروف. [[shield]] لعملية لازم تكمل مهما حصل. [[as_completed]] لما النتيجة الأولى مفيدة لوحدها.`,
            mistakes: R`[[task_done()]] برّه [[finally]] فأول exception يعلّق [[join()]]. و [[except BaseException]] أو [[except:]] جوه worker بيبلع الإلغاء والبرنامج مبيخلصش. و [[create_task]] من غير ما تحتفظ بالـ task. و [[maxsize]] مش متحدد فالـ producer بيحط مليون عنصر في الذاكرة. و [[queue.join()]] من غير ما تقفل الـ workers بعدها فبيفضلوا مستنيين للأبد. و [[asyncio.Queue]] من thread تاني (مش thread-safe؛ استخدم [[loop.call_soon_threadsafe]] أو [[queue.Queue]] العادية).`
          },
          teach: R`## المثال بيعمل إيه؟

crawler صغير: ١٢ URL في طابور ياخد ٥ بالكتير، و ٣ workers بياخدوا منه ويجيبوا كل صفحة (طلب وهمي ٠.٢ ثانية، وواحد بيفشل). بعد ما الطابور يخلص، بيلغي الـ workers ويتأكد إنهم اتلغوا، وبعدين يوري [[as_completed]]. ومعاه تجارب الإلغاء الغلط والـ [[shield]]. اتشغّل بـ Python 3.14 على ويندوز ١١.

~~~text الناتج (اتشغّل فعلًا)
12 urls, 3 workers: 0.8s
3 workers cancelled
failed: https://example.com/p7 12
done: 0.1
done: 0.2
done: 0.3
~~~

---

## ١. الطلب الوهمي

~~~python
async def fetch(url: str) -> int:
    await asyncio.sleep(0.2)
    if url.endswith("7"):
        raise ConnectionError(url)
    return len(url)
~~~

كل طلب ٠.٢ ثانية، واللي آخره [[7]] بيفشل (هنا [[p7]] بس)، والنتيجة طول الـ URL عشان تبقى رقم سهل.

---

## ٢. الـ worker

~~~python
async def worker(name: str, queue: asyncio.Queue, results: dict) -> None:
    while True:
        url = await queue.get()
        try:
            results[url] = await fetch(url)
        except ConnectionError as e:
            results[url] = f"failed: {e}"
        finally:
            queue.task_done()
~~~

| السطر | بيعمل إيه | ليه |
|---|---|---|
| [[while True]] | الـ worker مبيخلصش لوحده | بياخد شغل لحد ما حد يلغيه أو يقفل الطابور |
| [[await queue.get()]] | ياخد أول عنصر، أو يستنى لو الطابور فاضي | الانتظار ده مش بيقفل الـ loop، فالـ workers التانيين شغالين |
| [[except ConnectionError]] | الفشل بيتسجّل كنتيجة | worker مبيموتش من طلب واحد فاشل ويسيب الطابور من غير حد ياخد منه |
| [[finally: queue.task_done()]] | يقول للطابور «العنصر ده خلص» في كل حالة | من غيره [[join()]] بيستنى للأبد لو حصل أي exception مش متمسوك |

---

## ٣. الـ producer و [[join]]

~~~python
queue: asyncio.Queue[str] = asyncio.Queue(maxsize=5)
workers = [asyncio.create_task(worker(f"w{i}", queue, results)) for i in range(3)]
for i in range(12):
    await queue.put(f"https://example.com/p{i}")
await queue.join()
~~~

- [[maxsize=5]]: لما الطابور فيه ٥، [[await put()]] بيستنى لحد ما worker ياخد واحد. فالـ producer مبيسبقش بأكتر من ٥ (backpressure). من غيره الـ ١٢ (أو مليون) كانوا هيتحطوا في الذاكرة مرة واحدة.
- [[create_task]] بيبدأ الـ workers فورًا، و list الـ [[workers]] شايلة مراجع ليهم (لازم، تحت).
- [[join()]] بيرجع لما كل [[put]] قابله [[task_done]]. والوقت **٠.٨ ثانية**: ١٢ طلب ÷ ٣ workers = ٤ دفعات × ٠.٢.

---

## ٤. الإلغاء

~~~python
for w in workers:
    w.cancel()
done = await asyncio.gather(*workers, return_exceptions=True)
print(sum(isinstance(r, asyncio.CancelledError) for r in done), "workers cancelled")
~~~

- الـ workers واقفين عند [[await queue.get()]] (الطابور فاضي). [[cancel()]] بيرمي [[CancelledError]] جوه كل واحد عند السطر ده.
- [[gather(..., return_exceptions=True)]] بيستنى لحد ما الإلغاء **يخلص فعلًا** (ممكن الـ worker عنده [[finally]] بينضّف)، ويرجّع الـ [[CancelledError]] كقيمة. فـ [[3 workers cancelled]]. من غير الـ [[await]] ده، الـ workers كانوا هيتلغوا بعد ما [[main]] تخلص، وأي تنضيف عندهم ممكن ميحصلش.

### لما الـ worker يبلع الإلغاء

~~~python
async def bad_worker():
    while True:
        try:
            await asyncio.sleep(0.1)
        except BaseException:
            print("swallowed cancel")
async def good_worker():
    try:
        while True:
            await asyncio.sleep(0.1)
    except asyncio.CancelledError:
        print("cleanup, then re-raise")
        raise
~~~

~~~text الناتج (اتشغّل فعلًا، وبعدين اتقفل بـ timeout 20 من الصدفة)
cleanup, then re-raise
good: cancelled = True
swallowed cancel
bad: still running 0.5s after cancel = True
...
swallowed cancel
(البرنامج مخلصش: exit 124 من الـ timeout)
~~~

- [[good_worker]] نضّف ورمى تاني، فـ [[t.cancelled()]] بـ [[True]] والـ [[await t]] رمى [[CancelledError]] للي ناداه.
- [[bad_worker]] مسك [[BaseException]] (اللي [[CancelledError]] تبعه) ورجع للّفة. نص ثانية بعد [[cancel()]] ولسه شغال ([[asyncio.wait({t}, timeout=0.5)]] رجّعه في [[pending]]).
- والأسوأ: لما [[main]] خلصت، [[asyncio.run]] لغى كل الـ tasks الفاضلة **واستناهم**. [[bad_worker]] بلع الإلغاء تاني ([[swallowed cancel]] آخر سطر)، فالبرنامج **علّق** ومخرجش لحد ما الصدفة قتلته بعد ٢٠ ثانية. في container ده معناه [[docker stop]] بيستنى ١٠ ثواني ويقتل بـ [[SIGKILL]].
- القاعدة: [[except Exception]] (مش بيمسك [[CancelledError]] من 3.8) في اللفة، ولو مسكت [[CancelledError]] نفسه لتنضيف، [[raise]] في الآخر.

---

## ٥. [[shield]]: عملية لازم تكمل

~~~python
async def save_payment():
    await asyncio.sleep(0.3)
    print("payment saved")
    return "ok"
inner = asyncio.create_task(save_payment())
try:
    async with asyncio.timeout(0.1):
        await asyncio.shield(inner)
except TimeoutError:
    print("caller timed out")
print(await inner)
~~~

~~~text الناتج
caller timed out
payment saved
ok
~~~

الـ timeout لغى **اللي مستني** بعد ٠.١، بس [[shield]] منع الإلغاء يوصل لـ [[inner]]، فالدفع كمّل واتحفظ بعد ٠.٣. و [[await inner]] بعدها رجّع النتيجة. لاحظ إن [[inner]] متخزنة في متغير: [[shield(save_payment())]] على coroutine مباشرة بتعمل task محدش شايل مرجع ليها.

---

## ٦. [[as_completed]] و الـ task اللي محدش استناها

~~~python
for coro in asyncio.as_completed([slow(0.3), slow(0.1), slow(0.2)]):
    print("done:", await coro)
~~~

اتبعتوا ٠.٣ ثم ٠.١ ثم ٠.٢، وطلعوا بترتيب الخلوص: [[done: 0.1]] و [[0.2]] و [[0.3]]. عكس [[gather]] اللي بيرجّع بترتيب البعت.

ولو عملت [[asyncio.create_task(boom())]] و [[boom]] رمت ومحدش عمل [[await]]:

~~~text الناتج (آخر البرنامج)
Task exception was never retrieved
future: <Task finished name='Task-5' coro=<main.<locals>.boom() done, defined at ...> exception=ValueError('lost')>
ValueError: lost
~~~

الخطأ ظهر بس لما الـ task اتمسحت في الآخر، والبرنامج كمّل كأن مفيش حاجة. استخدم [[TaskGroup]] أو احتفظ بالـ tasks واعملهم [[await]].

---

## ٧. الحل: retry و timeout و [[shutdown]]

~~~text الناتج (اتشغّل فعلًا)
1.5s
failed after 3: TimeoutError
22 3
12
~~~

[[queue.shutdown()]] (3.13+) بيخلي أي [[put]] بعده يرمي [[QueueShutDown]]، وأي [[get]] على طابور فاضي يرمي [[QueueShutDown]] بدل ما يستنى. فالـ workers بيخلّصوا اللي فاضل ويرجعوا لوحدهم، من غير [[cancel]]. اتجرّب كمان لوحده: ٣ عناصر و workerين، النتيجة [[[0, 1, 2, 'bye', 'bye']]].

---

## الخلاصة

- طابور بـ [[maxsize]] + عدد workers ثابت = تحكم في التوازي والذاكرة، و [[task_done]] في [[finally]] دايمًا.
- [[cancel()]] بيرمي [[CancelledError]] عند أقرب [[await]]؛ نضّف وارميه تاني. بلعه بيعلّق [[asyncio.run]].
- [[shutdown()]] للقفل النضيف (3.13+)، و [[shield]] لعملية لازم تكمل، و [[as_completed]] بترتيب الخلوص.
- أي [[create_task]] لازم حد شايله ويستناه، أو استخدم [[TaskGroup]].`,
          lines: [
            R`[[asyncio]] فيه [[Queue]] و [[create_task]] و [[gather]] و [[as_completed]] و [[CancelledError]]، كل أدوات الدرس.`,
            R`[[time]] لـ [[perf_counter]] بس، عشان نقيس الطابور خلّص في قد إيه.`,
            R`[[fetch]] طلب وهمي: بياخد URL ويرجّع رقم. في كود حقيقي هنا [[httpx.AsyncClient.get]].`,
            R`٠.٢ ثانية انتظار تمثّل الشبكة. ده اللي بيخلّي ٣ workers أسرع من واحد.`,
            R`[[endswith("7")]] بيختار URL واحد يفشل ([[p7]] من الـ ١٢)، عشان نشوف الـ worker بيكمّل بعد الفشل.`,
            R`[[ConnectionError]] built-in وبياخد الـ URL كرسالة، فـ [[str(e)]] هيبقى الـ URL نفسه.`,
            R`النتيجة طول الـ URL ([[len("https://example.com/p0")]] = ٢٢)، رقم ثابت سهل نتأكد منه.`,
            R`[[worker]] coroutine بياخد اسم (للّوج لو حبيت)، والطابور، و dict النتايج المشترك. الـ dict مشترك بين ٣ workers من غير lock لأن كل الكود على thread واحد ومفيش [[await]] بين القراية والكتابة.`,
            R`لفة مالهاش آخر: الـ worker بيفضل ياخد شغل. بيخرج بس لما يتلغي ([[cancel]]) أو الطابور يتقفل ([[shutdown]] في الحل).`,
            R`[[await queue.get()]] بياخد أول عنصر (FIFO)، ولو الطابور فاضي بيستنى من غير ما يقفل الـ loop. ده المكان اللي الإلغاء هيوصل فيه في الآخر.`,
            R`[[try]] عشان أي حاجة تحصل في المعالجة، [[task_done]] تتنادى في [[finally]].`,
            R`[[await fetch(url)]] الشغل الحقيقي، والنتيجة في الـ dict تحت مفتاح الـ URL.`,
            R`الفشل المتوقع بيتمسك ويتسجّل كنتيجة، فالـ worker مبيموتش. لو مات، الطابور هيبقى فيه workers أقل ومحدش هيعرف.`,
            R`نتيجة الفشل نص فيه السبب: [[failed: https://example.com/p7]].`,
            R`[[finally]] بيتنفّذ في كل الحالات: نجاح، أو فشل متمسوك، أو exception تاني، أو حتى إلغاء.`,
            R`[[task_done()]] بيقول للطابور «العنصر اللي خدته خلص». [[join()]] بيعدّ دول. لو اتنسى مرة واحدة، [[join]] هيستنى للأبد.`,
            R`[[main]] بتعمل الطابور والـ workers، وتحط الشغل، وتستنى، وتقفل.`,
            R`[[Queue(maxsize=5)]] طابور ياخد ٥ بالكتير: [[put]] على طابور مليان بيستنى (backpressure). و [[asyncio.Queue[str]]] type hint بيقول إن العناصر strings.`,
            R`[[results]] dict مشترك، والقيمة رقم أو نص الفشل ([[int | str]]).`,
            R`٣ workers بـ [[create_task]]: بيبدأوا فورًا ويقفوا عند [[get()]] مستنيين. الـ list بتشيل مراجع ليهم، فمش هيتمسحوا وهما شغالين، وتقدر تلغيهم بعدين.`,
            R`بنبدأ العداد قبل ما نحط الشغل.`,
            R`١٢ URL (من [[p0]] لـ [[p11]]).`,
            R`[[await put()]]: لما الطابور يوصل ٥ السطر ده بيستنى لحد ما worker ياخد واحد، فالـ producer والـ workers ماشيين مع بعض.`,
            R`[[join()]] بيستنى لحد ما كل عنصر اتحط قابله [[task_done()]]، يعني الـ ١٢ اتعالجوا. الـ workers لسه عايشين ومستنيين عند [[get]].`,
            R`[[0.8s]]: ١٢ ÷ ٣ = ٤ دفعات × ٠.٢. بـ worker واحد كانت هتبقى ٢.٤.`,
            R`بنلف على الـ workers عشان نلغيهم، لأنهم مش هيخرجوا لوحدهم من [[while True]].`,
            R`[[cancel()]] بيعلّم الـ task، و [[CancelledError]] بيترمي جواها عند [[await queue.get()]] اللي واقفة عنده. مش بيقتلها فورًا.`,
            R`[[gather(..., return_exceptions=True)]] بيستنى لحد ما الإلغاء يخلص فعلًا في التلاتة، ويرجّع [[CancelledError]] كقيمة لكل واحد بدل ما يرميه. من غير الـ [[await]] ده مش هتعرف إمتى خلصوا.`,
            R`بيعدّ الـ [[CancelledError]]: [[3 workers cancelled]]. لو worker كان بيبلع الإلغاء (قسم ٤)، الـ [[gather]] ده كان هيستنى للأبد.`,
            R`نتيجة [[p7]] [[failed: https://example.com/p7]] و [[12]] نتيجة: كل URL ليه نتيجة، حتى اللي فشل.`,
            R`[[slow]] coroutine صغيرة بترجّع رقمها بعد ما تستنى نفس الرقم بالثواني، عشان نشوف ترتيب الخلوص.`,
            R`بتستنى [[n]] ثانية بـ [[asyncio.sleep]]، فالتلاتة بيستنوا في نفس الوقت ومحدش بيقفل التاني.`,
            R`وبترجّع نفس الرقم، عشان لما يطبع نعرف مين اللي خلص.`,
            R`[[as_completed]] بياخد awaitables ويرجّع iterator بيدّيك كل واحدة **أول ما تخلص**: اتبعتوا ٠.٣ و ٠.١ و ٠.٢.`,
            R`[[await coro]] بيدّي النتيجة: [[done: 0.1]] ثم [[0.2]] ثم [[0.3]]. الكل خلص في ٠.٣ ثانية لأنهم شغالين مع بعض.`,
            R`[[asyncio.run]] بيشغّل [[main]]، وفي الآخر بيلغي أي task فاضلة ويستناها. هنا مفيش حاجة فاضلة، فبيخلص على طول.`,
          ]
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، اكتب لكل حاجة البديل اللي مش بيقفل الـ loop: [[time.sleep]]، و [[requests.get]]، و [[psycopg2]]، و [[open().read()]] لملف كبير، و SDK sync مفيش بديل ليه، و loop حسابات تقيلة، و [[hashlib.scrypt]].`, done: R`السبعة صح: [[asyncio.sleep]] و [[httpx.AsyncClient]] و [[asyncpg]] و [[to_thread]] (أو [[aiofiles]]) و [[to_thread]] و process pool و [[to_thread]] (لأنها C وبتسيب الـ GIL)، وكاتب ليه الأخيرين مختلفين.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[heartbeat()]] بتطبع [[tick]] كل ٠.١ ثانية في لفة. شغّلها مع [[bad()]] اللي فيها [[time.sleep(1)]] بـ [[gather]] لمدة ثانية ونص. كام [[tick]] هتطبع؟ وكام مع [[good()]] (من غير الطلب الحقيقي)؟`, done: R`مع [[bad]]: حوالي ٤-٥ ticks بس (الثانية الأولى ولا tick؛ في التجربة على ويندوز طلعت [[4]])، ومع [[good]]: حوالي ١٣-١٤ (طلعت [[13]]، أقل من ١٥ عشان كل sleep بيتأخر شوية)، وشغّلتهم وطابقوا، والفرق ده هو بالظبط الطلبات اللي FastAPI كان هيأخرها.` },
            { lvl: 'تطبيق', t: R`**صلّح:** route في FastAPI [[async def report()]] جواها [[requests.get(url)]] و [[time.sleep(0.5)]] و [[hashlib.pbkdf2_hmac(...)]] بـ ٦٠٠ ألف تكرار. صلّحها بطريقتين: كله async صح، أو الـ route [[def]] عادية. قيس الاتنين بـ ١٠ طلبات مع بعض.`, done: R`الأصلية: ١٠ طلبات مع بعض بياخدوا حوالي ١٠ أضعاف طلب واحد، والنسختين المصلّحين: حوالي وقت طلب واحد أو اتنين، والأرقام مكتوبة، وكاتب أنهي نسخة هتختارها ليه.` },
            { lvl: 'تطبيق', t: R`**ابني (كاشف):** [[asyncio.run(main(), debug=True)]] بيطبع تحذير لأي callback أخد أكتر من ٠.١ ثانية من غير ما يسلّم الـ loop. شغّل [[bad()]] بيه واقرا التحذير، وبعدين اعمل [[block_detector()]] بنفسك: task بتنام ٠.٠٥ في لفة وتقيس هي اتأخرت قد إيه، وتطبع لو التأخير أكبر من ٠.١.`, done: R`الـ debug mode طلّع سطر فيه [[Executing <Task finished name='Task-1' coro=<bad() done ...> took 1.001 seconds]] (كاتبه بنصه)، والكاشف بتاعك طبع تأخير حوالي ثانية مع [[bad]] ومطبعش حاجة مع [[good]].` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** دالة sync [[parse_big_csv(path)]] بتقرا CSV ٢٠٠ ألف صف وترجّع مجموع عمود (من وحدة الملفات). ناديها من كود async بـ [[to_thread]] وفي نفس الوقت [[heartbeat]] شغالة، ومرة من غير [[to_thread]].`, done: R`من غير [[to_thread]] الـ heartbeat وقفت طول القراية (مفيش ticks)، ومعاها الـ ticks فضلت شغالة (أبطأ شوية بسبب الـ GIL، وكاتب الرقم)، والمجموع واحد في الحالتين.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** ١٠ نداءات [[hash_password]] مع بعض بـ ٣ طرق: جوه [[async def]] مباشرة، و [[to_thread]]، و [[ProcessPoolExecutor]] بـ [[run_in_executor]]. وبعدين نفس التلاتة لدالة Python خالصة ([[count_primes(50_000)]]).`, done: R`جدول ٦ أرقام من جهازك: [[scrypt]] بيكسب مع threads (لأنه C وبيسيب الـ GIL) و [[count_primes]] مبيكسبش مع threads وبيكسب مع processes، وكاتب القاعدة في جملة.` },
          ],
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

| بيقفل الـ loop | الحل | ليه |
|---|---|---|
| [[time.sleep]] | [[await asyncio.sleep]] | بيسلّم الـ loop وهو نايم بدل ما يقفله |
| [[requests.get]] | [[httpx.AsyncClient]] | الطلب بيتبعت والـ loop بيخدم غيرك لحد ما الرد ييجي |
| [[psycopg2]] | [[asyncpg]] | نفس الكلام مع الداتابيز (درس asyncpg في وحدة قاعدة البيانات) |
| مكتبة sync مفيش بديل ليها | [[await asyncio.to_thread(fn, ...)]] أو خلّي الـ route [[def]] | الدالة بتشتغل في thread جنب الـ loop |
| حسبة Python تقيلة (loops) | process تانية (درس ThreadPoolExecutor و ProcessPoolExecutor) | الـ thread مش كفاية للحساب بسبب الـ GIL |

## الخلاصة

- [[async def]] مش ضمان: أي سطر من غير [[await]] بياخد وقت بيوقف **كل** الطلبات.
- اسأل على كل I/O جوه [[async def]]: فيه [[await]]؟
- [[to_thread]] بتاخد الدالة والـ arguments منفصلين.
- [[PYTHONASYNCIODEBUG=1]] بيفضح الخطوات اللي ماسكة الـ loop.`,
          lines: [
            R`[[asyncio]] لـ [[asyncio.sleep]] اللي بيسلّم الـ loop، و [[to_thread]] اللي بيشغّل كود sync في thread جنبه.`,
            R`[[hashlib]] فيه [[scrypt]]: خوارزمية hash للباسوردات مقصود إنها بطيئة وتاكل ذاكرة، عشان اللي يسرق الداتابيز ميقدرش يجرّب مليارات الباسوردات. وده بالظبط حسبة CPU تقفل الـ loop.`,
            R`[[os.urandom(16)]] بيدّي ١٦ بايت عشوائي آمن من النظام للـ salt. مش [[random]] (اللي متوقّع ومش للأمان).`,
            R`[[time]] عشان [[time.sleep]] في [[bad()]]: الدالة اللي بتقفل الـ loop وتمثّل أي مكتبة sync.`,
            R`[[requests]] مكتبة HTTP **sync**: [[requests.get]] بيقفل الـ thread لحد ما الرد ييجي. جوه [[async def]] ده معناه الـ loop كله واقف. (لازم تتسطّب: [[pip install requests]].)`,
            R`[[httpx]] نفس فكرة requests بس فيه [[AsyncClient]] بـ [[await]]. ده البديل جوه أي كود async (درس httpx.AsyncClient في وحدة httpx و Redis).`,
            R`[[bad]] اسمها [[async def]] بس **مفيهاش ولا [[await]]** حقيقي بيسلّم الـ loop. الكلمة [[async]] لوحدها مبتخليش الكود جواها async.`,
            R`[[time.sleep(1)]] بينيّم الـ thread نفسه ثانية، والـ event loop شغال على نفس الـ thread، فمفيش أي task تانية (ولا طلب تاني في FastAPI) بتتحرك الثانية دي.`,
            R`[[requests.get(..., timeout=5)]] بيقفل الـ loop كمان لحد ما الرد ييجي أو ٥ ثواني. [[timeout]] موجود عشان لو السيرفر مردش الـ thread ميفضلش متعلّق للأبد، بس حتى مع timeout، كل الـ API واقف وهو مستني.`,
            R`[[good]] نفس الشغل بالأدوات الصح: كل انتظار فيها [[await]] على حاجة async فعلًا.`,
            R`[[await asyncio.sleep(1)]] بيقول للـ loop «صحّيني بعد ثانية» ويسيبه يشغّل غيره. نفس الثانية، بس الـ API فاضي يخدم طلبات تانية.`,
            R`[[async with httpx.AsyncClient(timeout=5)]] بيعمل client بـ connection pool ويقفله في الآخر. في FastAPI حقيقي بتعمله مرة واحدة في الـ lifespan مش في كل طلب (فتح اتصال جديد كل مرة أبطأ).`,
            R`[[await client.get]] بيبعت الطلب ويسلّم الـ loop لحد ما الرد ييجي. ده الفرق كله عن [[requests.get]]: نفس الطلب، بس الـ loop مش مقفول.`,
            R`[[r.text]] جسم الرد كنص. الطلب الحقيقي هنا لـ [[example.com]] (الدومين المحجوز للأمثلة).`,
            R`[[hash_password]] دالة **عادية** ([[def]] مش [[async def]]) لأنها مفيهاش انتظار: حسبة CPU خالصة. هنشغّلها من كود async تحت من غير ما تقفل الـ loop.`,
            R`salt جديد لكل باسورد، فاتنين بنفس الباسورد بيطلعلهم hash مختلف، وجداول الـ hashes الجاهزة (rainbow tables) متنفعش.`,
            R`[[scrypt]] بـ [[n=2**14]] (تكلفة)، و [[r=8]] (حجم البلوك)، و [[p=1]] (توازي): ده بياخد عشرات الملي ثواني عن قصد. و [[salt +]] بيلزق الـ salt قدام الـ hash عشان وقت الـ login تقراه وتحسب تاني وتقارن.`,
            R`[[register]] الدالة الـ async اللي route في FastAPI هيناديها. محتاجة الـ hash من غير ما توقّف الطلبات التانية.`,
            R`[[asyncio.to_thread(hash_password, pw)]] بيشغّل الدالة في thread من الـ default pool ويرجّع awaitable. الـ loop بيخدم غيرك وانت مستني الحسبة. ولأن [[hashlib.scrypt]] مكتوبة بـ C وبتسيب الـ GIL، الـ thread بيكسب فعلًا هنا؛ حسبة Python خالصة (loops) محتاجة process (آخر درس في الوحدة).`,
            R`[[asyncio.run(register("secret"))]] بيشغّلها مرة للتجربة ويرجّع ٨٠ بايت (١٦ salt + ٦٤ hash). في FastAPI الـ route بيعمل [[await register(...)]] والـ loop موجود خلاص.`,
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب القاعدة في ٣ سطور: إمتى [[async def]] وإمتى [[def]] في route، و FastAPI بيشغّل كل واحدة فين، وإيه اللي بيحصل لو [[async def]] جواها مكتبة sync.`, done: R`كاتب: async مع مكتبات async بس، و def مع أي sync (بتتشغّل في threadpool ٤٠ thread)، و async + sync = الـ API كله بيقف، والمثال اللي بيثبت ده [[/broken]] بـ ٢٠ ثانية لـ ٢٠ طلب.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** لو بعت ٥٠ طلب مع بعض على [[/sync-ok]] (و الـ threadpool ٤٠)، الوقت هيبقى حوالي كام؟ ولو على [[/async-ok]] (والسيرفر الخارجي بيرد في ثانية)؟ ولو ٥ على [[/broken]] و ٥ على [[/async-ok]] في نفس اللحظة؟`, done: R`كاتب: حوالي ثانيتين (٤٠ ثم ١٠)، وحوالي ثانية، وفي الأخيرة [[/async-ok]] كمان بتتأخر حوالي ٥ ثواني لأن [[/broken]] قافل الـ loop، وجرّبت واحدة منهم على الأقل وطابقت.` },
            { lvl: 'تطبيق', t: R`**صلّح:** route [[async def get_user(id)]] بيستخدم SDK sync اسمه [[legacy.fetch_user(id)]] (اعمله [[time.sleep(0.5)]]). صلّحه بطريقتين: [[def]]، و [[await asyncio.to_thread(...)]] جوه [[async def]]، وقيس ٢٠ طلب مع بعض في الحالات التلاتة.`, done: R`الأصلي حوالي ١٠ ثواني لـ ٢٠ طلب، والاتنين المصلّحين حوالي ٠.٥–١ ثانية، والأرقام مكتوبة، وكاتب إمتى [[to_thread]] أحسن من [[def]] (لما الـ route فيه [[await]] تانية لمكتبات async).` },
            { lvl: 'تطبيق', t: R`**ابني:** API فيه ٣ routes حقيقية: [[/weather]] بينادي [[https://example.com]] بـ httpx async، و [[/report]] بيقرا CSV بـ [[csv]] (sync)، و [[/hash]] بيعمل scrypt. اختار لكل واحد [[def]] ولا [[async def]] ولا [[to_thread]]، واكتب سبب كل اختيار في docstring.`, done: R`كل route شغال من [[/docs]]، و ٢٠ طلب مع بعض على كل واحد مبيأخرش الـ routes التانية (بتبعت طلب على [[/weather]] وانت ضاغط [[/hash]] وبيرجع في وقته)، والـ docstrings فيها السبب.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** بـ [[TestClient]] من FastAPI (أو [[httpx.AsyncClient]] بـ [[ASGITransport]])، اكتب اختبار بيبعت ١٠ طلبات مع بعض على [[/broken]] و [[/sync-ok]] ويتأكد إن [[/sync-ok]] خلصت في أقل من ٣ ثواني و [[/broken]] أخدت أكتر من ٨.`, done: R`الاختبار بيعدّي، ولو صلّحت [[/broken]] لـ [[def]] الجزء التاني بتاعه بيقع (يعني بيقيس فعلًا)، والاختبار نفسه بيخلص في أقل من ١٥ ثانية.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من كود FastAPI و Starlette (أو [[inspect.getsource]])، لاقي السطر اللي بيقرر الـ route يتشغّل في thread ولا لأ، واسم الدالة اللي بتشغّل الـ [[def]] في الـ threadpool، وإزاي تغيّر حد الـ ٤٠ thread.`, done: R`كاتب اسم الدالة اللي بتسأل هي coroutine ولا لأ، واسم [[run_in_threadpool]]، وإن الحد من [[anyio.to_thread.current_default_thread_limiter()]] و [[total_tokens]] بيتغيّر في الـ lifespan، وجرّبت تغيّره لـ ١٠٠ وأعدت تجربة الـ ٥٠ طلب.` },
          ],
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
            R`[[time]] لـ [[time.sleep]] في الـ routes الـ sync: بيمثّل أي مكتبة sync (requests أو SDK قديم أو psycopg2).`,
            R`[[httpx]] عشان [[AsyncClient]] في الـ route الـ async الصح. لازم يتسطّب ([[uv add httpx]])، و [[fastapi[standard]]] بيجيبه معاه.`,
            R`[[FastAPI]] الـ class اللي بيعمل التطبيق. بيشوف كل route هو [[def]] ولا [[async def]] ويشغّله بطريقة مختلفة.`,
            R`[[app]] التطبيق، و [[fastapi dev main.py]] بيدوّر على متغير بالاسم ده. كل [[@app.get]] تحت بيسجّل route عليه.`,
            R`[[@app.get("/async-ok")]] بيسجّل الدالة اللي تحته كـ handler لـ [[GET /async-ok]].`,
            R`[[async def]]: FastAPI بيناديها **مباشرة على الـ event loop**. ده الأسرع (مفيش thread)، بشرط إن كل انتظار جواها [[await]] على حاجة async.`,
            R`[[AsyncClient]] بيعمل اتصال HTTP async ويقفله في آخر الـ [[async with]]. (في production بيتعمل مرة في الـ lifespan، درس httpx.AsyncClient.)`,
            R`[[await client.get]]: وانت مستني رد [[example.com]] الـ loop بيخدم باقي الطلبات. ٢٠ طلب مع بعض على الـ route ده بياخدوا تقريبًا وقت طلب واحد.`,
            R`[[r.status_code]] رقم الـ HTTP ([[200]])، و FastAPI بيحوّل الـ dict لـ JSON لوحده.`,
            R`route تاني عشان نقارن: نفس الانتظار بس بطريقة sync.`,
            R`[[def]] عادية: FastAPI (عن طريق AnyIO) بيشغّلها في **threadpool** فيه ٤٠ thread افتراضيًا، فـ [[time.sleep]] جواها بيقفل الـ thread بتاعها بس، مش الـ loop. ٢٠ طلب مع بعض خدوا ١.٧٦ ثانية في التجربة (في الشرح).`,
            R`[[time.sleep(1)]] جوه thread: باقي الطلبات شغالة على threads تانية أو على الـ loop. الحد هو الـ ٤٠ thread: الطلب الـ ٤١ بيستنى (الشرح فيه تجربة ٥٠ طلب).`,
            R`الـ dict بيرجع للعميل JSON بعد ثانية بالظبط، و FastAPI هو اللي بيعمل التحويل لوحده.`,
            R`route تالت فيه الغلطة الأشهر في FastAPI.`,
            R`[[async def]]، فـ FastAPI بيناديها على الـ loop مباشرة **ومبيحطهاش في thread**، لأنه بيفترض إنك هتعمل [[await]].`,
            R`بس جواها [[time.sleep]] sync: الـ loop **كله** واقف ثانية، ومفيش طلب تاني بيتخدم، حتى [[/async-ok]] و [[/docs]]. ٢٠ طلب مع بعض خدوا ٢٠.١٧ ثانية في التجربة: واحد ورا التاني.`,
            R`الرد نفسه بيوصل عادي وبعد ثانية بالظبط، فلو جرّبت طلب واحد بس مش هتلاحظ أي مشكلة. المشكلة بتبان تحت الضغط بس، وده اللي بيخليها خطيرة.`,
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** جدول ٣ صفوف (انتظار شبكة، حسبة Python تقيلة، حسبة C بتسيب الـ GIL زي [[hashlib]]) و ٣ أعمدة (threads، processes، async): أنهي بيكسب وليه؟`, done: R`الجدول بيقول: الانتظار threads أو async، و Python الخالص processes بس، و C بيكسب مع threads، وكل خانة جنبها سبب في كلمتين (GIL، تكلفة البدء، pickle).` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[with ThreadPoolExecutor(max_workers=3) as p: list(p.map(fetch_sync, range(7)))]] و [[fetch_sync]] بتنام ثانية. هياخد قد إيه؟ وبـ [[max_workers=7]]؟ وبـ [[ProcessPoolExecutor(3)]]؟`, done: R`كاتب: حوالي ٣ ثواني (٣ دفعات)، وحوالي ثانية، وحوالي ٣ ثواني + وقت بدء الـ processes، وقست الاتنين الأولانيين وطابقوا.` },
            { lvl: 'تطبيق', t: R`**صلّح:** سكربت بيستخدم [[ProcessPoolExecutor]] و [[pool.map(lambda x: x * 2, data)]] ومن غير [[if __name__ == "__main__"]]. شغّله على ويندوز واكتب الخطأين اللي بيطلعوا، وصلّحهم.`, done: R`الخطأ الأول خطأ pickle للـ lambda (زي [[Can't pickle <function <lambda>]] أو [[PicklingError]])، والتاني [[RuntimeError]] بتاع الـ bootstrapping (أو كاتب الرسالة اللي طلعت عندك بنصها)، وبعد دالة عادية على مستوى الـ module والشرط السكربت بيطلع النتيجة صح.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[thumbs.py FOLDER]] بيلف على صور وهمية (ملفات بأي محتوى) ويحسب لكل واحد [[hashlib.sha256]] لمحتواه (C، بيسيب الـ GIL) بـ [[ThreadPoolExecutor]]، ويطبع بـ [[as_completed]] كل نتيجة أول ما تخلص ومعاها عدّاد ([[3/20]])، والملف اللي مقدرش يتقري يتطبع كخطأ ومبيوقّفش الباقي.`, done: R`على ٢٠ ملف بيطبع ٢٠ سطر والعداد صح، والـ hashes بتطابق [[Get-FileHash -Algorithm SHA256]] أو [[sha256sum]]، وملف اتمسح في النص بيطلع خطأ برقمه والباقيين كمّلوا، وقست الوقت بـ ١ و ٨ workers.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** «مطبعة»: ٣٠ مهمة، كل واحدة ٠.٢ ثانية انتظار (طباعة) و ٠.٢ ثانية حساب Python (تجهيز الصفحة). جرّب: كله threads، وكله processes، و processes للحساب مع threads للانتظار.`, done: R`جدول فيه الأوقات التلاتة من جهازك، والتالتة (المختلطة) الأحسن أو قريبة منه، وكاتب ليه كله threads مبيقسّمش الحساب، وليه كله processes بيدفع تكلفة زيادة.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** [[count_primes]] على ٨ أرقام بـ processes بعدد workers ١ و ٢ و ٤ و ٨ و ١٦ (أو عدد الـ cores عندك). ارسم الوقت مقابل العدد، واكتب فين بيقف التحسن وليه.`, done: R`عندك ٥ أرقام حقيقية، والتحسن قريب من الخطي لحد عدد المهام أو الـ cores الحقيقية وبعدها بيقف (أو بيسوء)، وكاتب السبب (عدد المهام ٨، والـ cores الحقيقية مقابل الـ logical، وتكلفة البدء).` },
          ],
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
            R`[[asyncio]] للجزء الأخير ([[to_thread]] و [[run_in_executor]]): نفس الـ pools بس من جوه كود async.`,
            R`[[time]] لـ [[time.sleep]] (انتظار وهمي) و [[perf_counter]] (القياس).`,
            R`[[concurrent.futures]] بيدّي نوعين pool بنفس الواجهة: [[ThreadPoolExecutor]] (threads في نفس الـ process) و [[ProcessPoolExecutor]] (processes منفصلة، كل واحدة Python كامل). و [[as_completed]] بيدّيك النتايج بترتيب الخلوص.`,
            R`[[fetch_sync]] دالة sync بتستنى، زي [[requests.get]] أو SDK قديم. الانتظار مبيستخدمش CPU، وده اللي بيخلّي الـ threads تكسب فيه.`,
            R`ثانية انتظار. وقت النوم ده الـ thread بيسيب الـ GIL، فالـ threads التانية بتشتغل.`,
            R`نتيجة وهمية فيها الرابط والـ status، عشان نشوف كل نتيجة تبع مين لما يطلعوا بترتيب مختلف.`,
            R`[[count_primes]] حسبة CPU بـ Python خالص (مفيش انتظار، مفيش C). ده الشغل اللي الـ GIL بيمنع الـ threads تكسب فيه.`,
            R`بيعدّ الأعداد الأولية لحد [[limit]]: لكل [[n]] بيجرّب يقسم على كل رقم لحد الجذر التربيعي ([[n**0.5]])، و [[all(n % d ...)]] [[True]] لو مفيش قاسم. بطيء عن قصد: [[count_primes(500_000)]] بياخد حوالي ١.٥ ثانية.`,
            R`[[main]] الجزء الـ sync: threads للانتظار وبعدين processes للحساب.`,
            R`٨ روابط على [[api.example.com]] (مش هنتصل بيها فعلًا؛ [[fetch_sync]] وهمية).`,
            R`[[perf_counter()]] بيبدأ عداد الجزء الأول (الـ threads)، والفرق في الآخر هو الوقت.`,
            R`[[ThreadPoolExecutor(max_workers=8)]] بيعمل ٨ threads جاهزة. الـ [[with]] في الآخر بيستنى كل المهام تخلص ويقفل الـ threads ([[shutdown(wait=True)]]). الافتراضي من غير [[max_workers]] هو [[min(32, cpu_count + 4)]].`,
            R`[[pool.submit(fn, arg)]] بيبعت المهمة لأول thread فاضي ويرجّع **Future** على طول (وعد بنتيجة). والـ dict comprehension بيربط كل Future بالرابط بتاعه، عشان لو فشلت تعرف أنهي.`,
            R`[[as_completed(futures)]] بيدّيك الـ Futures واحد واحد **أول ما كل واحد يخلص**، مش بترتيب البعت. عشان كده الناتج بيطلع زي [[items/6]] قبل [[items/7]] قبل [[items/5]].`,
            R`[[fut.result()]] بيرجّع اللي الدالة رجّعته، ولو الدالة رمت بيرمي **نفس** الـ exception هنا. يعني الأخطاء مبتضيعش، بس لازم تنادي [[result()]] عشان تشوفها.`,
            R`[[threads: 1.0s]] مش ٨: الـ ٨ انتظارات حصلوا في نفس الثانية. ولو [[max_workers=2]] كانت هتبقى ٤ ثواني (٤ دفعات).`,
            R`عداد جديد للجزء التاني (الـ processes)، عشان الرقمين ميتخلطوش ببعض.`,
            R`[[ProcessPoolExecutor()]] بيعمل processes بعدد الـ cores ([[os.cpu_count()]]). كل process ليها Python و GIL بتاعهم، فالحساب بيتوزّع على cores حقيقية. وبدايتها أغلى من الـ thread (ميلي ثواني لكل واحدة).`,
            R`[[pool.map(fn, items)]] زي [[map]] العادي بس موزّع، والنتايج **بترتيب** الـ items. الـ arguments والنتايج بتتنقل بين الـ processes بـ pickle، فلازم تبقى قابلة للـ pickle (مش lambda ولا اتصال داتابيز).`,
            R`[[41538]] عدد الأوليات أقل من ٥٠٠ ألف، و [[processes: 1.7s]] للأربعة. اتقاس على نفس الجهاز (١٦ core): بالترتيب **٦.٢ ثانية**، وبـ ٤ threads **٥.٦** (الـ GIL)، وبـ processes **١.٧** (حوالي ٣.٦ مرة أسرع).`,
            R`[[handler]] نفس الأفكار من جوه كود async (زي route في FastAPI)، من غير ما الـ loop يتقفل.`,
            R`[[asyncio.to_thread(fetch_sync, url)]] اختصار لـ [[run_in_executor(None, ...)]]: الدالة الـ sync في الـ default thread pool، والـ loop فاضي. ده الحل لأي SDK sync جوه [[async def]].`,
            R`[[get_running_loop()]] بيرجّع الـ event loop الشغال دلوقتي. محتاجينه عشان [[run_in_executor]] بيتنادى عليه، ومحتاجين pool processes مش threads.`,
            R`[[ProcessPoolExecutor(max_workers=2)]] صغير هنا للتجربة. في FastAPI متعملوش في كل طلب (عمل processes كل مرة بطيء جدًا): اعمله مرة في الـ lifespan وخزّنه في [[app.state]] (درس workers و GIL).`,
            R`[[run_in_executor(pool, fn, arg)]] بيبعت الحسبة للـ process pool ويرجّع awaitable. الـ loop بيخدم طلبات تانية وانت مستني. [[9592]] عدد الأوليات أقل من ١٠٠ ألف.`,
            R`بيرجّع النتيجتين كـ list strings: [[['https://legacy-sdk: 200', '9592']]].`,
            R`**لازم** مع [[ProcessPoolExecutor]] على ويندوز والماك: الـ process الجديدة بتعمل import للملف من أوله (spawn). من غير الشرط ده كل process هتشغّل [[main()]] تاني وتعمل pool جديد، وتطلع [[RuntimeError: An attempt has been made to start a new process before the current process has finished its bootstrapping phase]].`,
            R`الجزء الـ sync: threads و processes من كود عادي.`,
            R`الجزء الـ async بـ [[asyncio.run]]، اللي بيعمل loop ويشغّل [[handler]] ويطبع اللي رجع.`,
          ]
        }
      ]
    }
]);

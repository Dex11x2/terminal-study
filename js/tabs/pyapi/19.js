// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
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
          teach: R`## السؤال بيختبر إيه؟

دالتين بيعملوا نفس الحاجة: ضيف عنصر لـ list ورجّعها. الأولى فيها فخ، والتانية الحل. والفخ مش في [[append]]، في **إمتى** الـ default بيتحسب. كل اللي تحت اتجرب على ويندوز (Python 3.14).

---

## ١. الدالة الغلط

~~~python
def add(item, items=[]):
    items.append(item)
    return items
~~~

- [[items=[] ]]: باراميتر ليه **default**، يعني لو اللي بينادي مبعتش قيمة، استخدم دي.
- [[items.append(item)]]: [[append]] بتعدّل الـ list **مكانها** (in place)، مش بتعمل list جديدة.
- [[return items]]: بترجّع نفس الـ object.

### إمتى [[ [] ]] دي بتتعمل؟

سطر [[def]] نفسه كود بيتنفّذ **مرة واحدة** لما Python يقرا الملف: بيعمل function object، وبيحسب قيم الـ defaults، ويخزّنها جواه في خانة اسمها [[__defaults__]] (tuple فيها default لكل باراميتر). فالـ [[ [] ]] دي list واحدة اتعملت وقت التعريف، وبتفضل عايشة جوه الدالة.

---

## ٢. السطر اللي بيكشف المشكلة

~~~python
add(1); print(add(2))    # [1, 2] مش [2]
~~~

[[;]] بتفصل جملتين في سطر واحد. النداء الأول ضاف 1 للـ list المتخزنة، والتاني ضاف 2 لـ **نفس** الـ list. بصّينا على [[__defaults__]] قبل وبعد:

~~~text الناتج
([],)            قبل أي نداء
[1, 2]           print(add(2))
([1, 2],)        بعدهم: الـ list اللي جوه الدالة نفسها كبرت
~~~

والـ [[,]] في [[([],)]] معناها tuple فيها عنصر واحد. وكمان جربنا:

~~~text الناتج
[3]              add(3, []): بعتنا list بتاعتنا، فالـ default متلمسش
([1, 2],)        __defaults__ زي ما هي
True             add.__defaults__[0] is add(4)
~~~

[[is]] بتسأل «ده **نفس** الـ object؟» مش «نفس القيمة؟». و [[True]] معناها إن اللي [[add]] بترجعهولك هو حرفيًا الـ list المتخزنة جوه الدالة، فلو عدّلت فيها برّه، النداء الجاي هيشوف تعديلك.

---

## ٣. الحل: [[None]]

~~~python
def add_ok(item, items: list | None = None):
    items = [] if items is None else items
    items.append(item)
    return items
~~~

- [[items: list | None = None]]: الـ type hint بيقول «list أو None»، و [[|]] هنا معناها «أو» في الأنواع. والـ default [[None]]: object واحد ثابت محدش يقدر يعدّله، فمفيش مشكلة إنه يتشارك.
- [[[] if items is None else items]]: «لو مبعتش حاجة، اعمل list **جديدة دلوقتي** (جوه النداء)، وإلا استخدم بتاعتك». الـ [[ [] ]] هنا جوه جسم الدالة، فبتتنفّذ مع كل نداء.

~~~text الناتج
[1] [2] (None,)          add_ok(1), add_ok(2), add_ok.__defaults__
[9, 1] [9, 1]            add_ok(1, mine), mine
~~~

كل نداء أخد list لوحده، والـ default فضل [[None]]. وفي السطر التاني، [[mine = [9] ]] اتعدّلت لأنك انت اللي بعتها، وده سلوك متوقع: الدالة بتضيف على الـ list اللي ادّتهالها.

---

## ٤. نفس الفخ بشكل تاني: [[datetime.now()]]

~~~python
def stamp(at=datetime.datetime.now()):
    return at
~~~

[[now()]] بتتنادى مرة واحدة وقت الـ [[def]]. استنينا ثانية بين نداءين، و [[stamp() == stamp()]] طلعت [[True]]: نفس الوقت للأبد. والحل نفس الفكرة: [[at=None]]، وجوه الدالة [[if at is None:]] وتحتها [[at = datetime.datetime.now()]].

---

## ٥. في dataclass و Pydantic

~~~text الناتج
ValueError: mutable default <class 'list'> for field items is not allowed: use default_factory
Cart2(items=[1]) Cart2(items=[])
items=[1] | items=[]
~~~

- **dataclass**: [[items: list = [] ]] بيرمي [[ValueError]] وقت تعريف الـ class نفسه (بيحميك). والحل [[field(default_factory=list)]]: [[list]] من غير أقواس، يعني «الدالة اللي تعمل list جديدة»، وبتتنادى مع كل object.
- **Pydantic**: [[items: list[int] = [] ]] عادي، لأن Pydantic بينسخ الـ default لكل object. عدّلنا [[m1.items]] و [[m2]] فضل فاضي.

---

## ٦. الأدوات بتمسكها

[[ruff]] (linter) بالقاعدة [[B006]]:

~~~text الناتج: ruff check --select B006,B008
B006 Do not use mutable data structures for argument defaults
 --> l3\d.py:1:21
B008 Do not perform function call $__bt datetime.datetime.now$__bt in argument defaults; ...
~~~

[[B008]] بتمسك فخ الـ [[now()]].

---

## الخلاصة

| الـ default | آمن؟ | ليه |
|---|---|---|
| [[0]] و [[""]] و [[None]] و [[()]] | آه | immutable، محدش يقدر يعدّله |
| [[ [] ]] و [[{}]] و [[set()]] | لأ | object واحد بيتشارك بين كل النداءات |
| [[datetime.now()]] أو أي نداء دالة | لأ | بيتحسب مرة وقت الـ [[def]] |

الجملة اللي تقولها: «الـ defaults بتتحسب مرة واحدة لما سطر [[def]] يتنفّذ، وبتتخزن في [[__defaults__]]، فالـ mutable default بيتشارك. الحل [[None]] وتعمل الجديد جوه الدالة، و [[default_factory]] في dataclass».`,
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
          teach: R`## المثال بيعمل إيه؟

بيعد تنازلي من ٢٠ مليون لصفر، مرتين، في **threadين** شغالين مع بعض، ويقيس الوقت. المتوقع لو الـ threads بتشتغل على ٢ cores: نص وقت العدّ مرتين ورا بعض. اللي بيحصل فعلًا: نفس الوقت تقريبًا. والسبب الـ GIL. كل الأرقام تحت من ويندوز (جهاز ١٦ logical processor، Python 3.14، ونسخة [[3.14t]] اتسطبت في فولدر مؤقت).

---

## ١. الحسبة: [[count]]

~~~python
import threading, time
def count(n: int) -> None:
    while n:
        n -= 1
~~~

- [[import threading, time]]: موديولين في سطر واحد، [[threading]] للـ threads و [[time]] للقياس.
- [[-> None]]: الدالة مبترجعش حاجة.
- [[while n:]]: طول ما [[n]] مش صفر (أي رقم غير الصفر بيتحسب [[True]]).
- [[n -= 1]]: اختصار [[n = n - 1]].

ده كود Python خالص: كل لفة bytecode بيتنفّذ، ومحتاج الـ GIL. مفيش انتظار ولا I/O. اخترنا عدّ فاضي عشان مفيش حاجة تانية تأثر على القياس.

---

## ٢. الـ threads

~~~python
start = time.perf_counter()
threads = [threading.Thread(target=count, args=(20_000_000,)) for _ in range(2)]
for t in threads: t.start()
for t in threads: t.join()
print(f"{time.perf_counter() - start:.2f}s")
~~~

- [[threading.Thread(target=count, args=(...))]]: thread **هيشغّل** [[count]] لما تقوله ابدأ. [[target]] الدالة من غير أقواس، و [[args]] الـ arguments كـ tuple، والـ [[,]] في [[(20_000_000,)]] هي اللي بتخليها tuple فيها عنصر واحد (من غيرها تبقى رقم بين قوسين).
- [[for _ in range(2)]]: list comprehension بيعمل ٢. والـ [[_]] اسم متغير معناه «مش هستخدمه».
- [[t.start()]]: يبدأ الـ thread فعلًا، والسطر بيرجع على طول من غير ما يستنى.
- [[t.join()]]: استنى الـ thread ده لحد ما يخلص. لازم عشان القياس يبقى بعد ما الاتنين خلصوا.
- [[:.2f]]: رقم عشري بخانتين.

شغلناه مرتين:

~~~text الناتج
0.90s
0.96s
~~~

ولوحده الرقم ده ملوش معنى، محتاجين نقارنه.

---

## ٣. المقارنة الكاملة: الـ solCode

الـ solCode بيعمل نفس العدّ ٣ مرات: ورا بعض، وبـ threads، وبـ processes. حاجتين جديدة فيه:

- [[if __name__ == "__main__":]]: الكود ده يشتغل بس لو الملف اتشغّل مباشرة. ضروري مع [[ProcessPoolExecutor]] على ويندوز والماك، لأن الـ process الجديدة بتعمل import للملف من أوله (**spawn**)، ومن غير الشرط ده كل process هتعمل pool جديد وهكذا.
- [[pool.map(count, [N, N])]]: ابعت [[count(N)]] مرتين للـ pool، كل واحدة لـ process. و [[list(...)]] حوالين الـ map عشان نستنى النتايج فعلًا (الـ map بترجع iterator).

~~~text الناتج: python (3.14 العادي، فيه GIL)
ورا بعض: 0.91s
threads: 0.90s
processes: 0.66s
~~~

~~~text الناتج: python3.14t (free-threaded، من غير GIL)
ورا بعض: 1.02s
threads: 0.53s
processes: 0.65s
~~~

### نقرا الأرقام

| | فيه GIL | من غير GIL |
|---|---|---|
| ورا بعض | 0.91 | 1.02 (أبطأ شوية: الـ locks الصغيرة ليها تمن) |
| threads | 0.90 (زي ورا بعض) | 0.53 (النص تقريبًا) |
| processes | 0.66 | 0.65 |

- **threads مع GIL = ورا بعض**: الاتنين بيتبادلوا القفل، واحد بس بينفّذ في أي لحظة. كل [[sys.getswitchinterval()]] (طلعت [[0.005]] يعني 5ms) الـ thread اللي شغال بيُطلب منه يسيب القفل.
- **processes أسرع بس مش النص**: كل process ليها interpreter و GIL، فالعدّتين اتعملوا مع بعض فعلًا. الفرق عن النص (0.45) هو تمن تشغيل processes جديدة على ويندوز (spawn).
- **من غير GIL، الـ threads قربت من النص**: ده اللي الـ free-threaded build جه عشانه. والـ processes زي ما هي.

---

## ٤. «يعني الـ GIL بيحمي الكود بتاعي؟» لأ

الـ GIL بيحمي الـ interpreter من جوه، مش منطق برنامجك. جربنا ٤ threads، كل واحد بيزوّد رصيد ١٠ آلاف مرة، والقراية والكتابة مفصولين (زي أي كود بيقرا قيمة، يعمل حاجة، ويكتبها):

~~~python
current = balance
time.sleep(0)        # أي حاجة بتسيب الـ GIL: I/O أو نداء طويل
current += 1
balance = current
~~~

~~~text الناتج (فيه GIL)
no lock 10108
lock 40000
~~~

المفروض 40000، وطلع 10108: الـ threads قروا نفس القيمة القديمة وكتبوا فوق بعض. ومع [[with lock:]] ([[threading.Lock()]]، قفل بتاعك انت) طلع صح. وحتى [[x += 1]] لوحده: مع الـ GIL طلع [[4000000]] صح في كل تجاربنا، بس مش مضمون، ومع [[3.14t]] نفس الكود طلع [[1160724]] بدل ٤ مليون.

---

## ٥. الـ GIL و I/O

لو [[count]] كانت بتستنى (قاعدة أو [[time.sleep]] أو شبكة)، الـ thread بيسيب الـ GIL وهو مستني، فالتانيين يشتغلوا. عشان كده threads و async ممتازين للـ I/O، و FastAPI سريع رغم الـ GIL: أغلب وقت الـ API انتظار. ومكتبات C زي numpy و hashlib بتسيب الـ GIL جوه الحسبات الكبيرة.

---

## الخلاصة

| الشغل | الأداة | ليه |
|---|---|---|
| I/O (شبكة، قاعدة، ملفات) | async أو threads | الـ GIL بيتساب وقت الانتظار |
| CPU بكود Python | processes ([[ProcessPoolExecutor]] أو workers) | كل process ليها GIL |
| CPU بمكتبة C | threads ممكن تنفع | المكتبة بتسيب الـ GIL |
| بيانات مشتركة بين threads | [[threading.Lock]] | الـ GIL مش بيحمي منطقك |

الجملة اللي تقولها: «الـ GIL قفل في CPython بيخلي thread واحد بس ينفّذ bytecode في نفس اللحظة. بيمنع التوازي في حسابات Python بالـ threads، بس مش بيأثر على I/O. ومش بيحميني من race conditions. وفي 3.14 فيه build رسمي من غيره ([[python3.14t]]) بس مش الافتراضي.»`,
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
          teach: R`## السؤال بيختبر إيه؟

مش الـ syntax. السؤال الحقيقي: «لو عندك ١٠٠ ألف عنصر وهتسأل "موجود ولا لأ"، تحطهم في إيه؟». المثال بيحط نفس الأرقام في list وفي set ويسأل نفس السؤال، وبعدين يستخدم tuple كمفتاح في dict. كل اللي تحت اتجرب على ويندوز (Python 3.14).

---

## ١. نفس الداتا في شكلين

~~~python
ids_list = list(range(100_000))
ids_set = set(ids_list)
~~~

- [[range(100_000)]]: الأرقام من 0 لـ 99999، و [[list(...)]] بتحطهم في list بالترتيب.
- [[set(ids_list)]]: نفس الأرقام في set. والـ set مبيحتفظش بتكرار ولا بترتيب مضمون.

---

## ٢. [[in]]: نفس السؤال، تمن مختلف

~~~python
99_999 in ids_list   # O(n): بيلف على الكل
99_999 in ids_set    # O(1): hash مباشرة
~~~

الاتنين بيرجعوا [[True]]. الفرق في **إزاي**:

- **list**: مفيش طريقة غير إنها تقارن عنصر عنصر من الأول. و 99999 آخر عنصر، فدي ١٠٠ ألف مقارنة. ده معنى **O(n)** (اقرا «أوه إن»): الوقت بيكبر مع عدد العناصر n.
- **set**: من جوه **hash table**. بتحسب [[hash(99999)]] (رقم بيتحسب من القيمة)، والرقم ده بيحدد الخانة اللي العنصر المفروض يبقى فيها، فبتروح لها على طول. ده **O(1)**: الوقت ثابت تقريبًا مهما كان العدد.

### القياس: [[python -m timeit]]

~~~powershell
python -m timeit -s "l=list(range(100000)); s=set(l)" "99999 in l"
~~~

[[timeit]] موديول بيشغّل السطر الأخير آلاف المرات ويقولك أحسن متوسط. و [[-s]] (setup) كود بيتنفّذ مرة قبل القياس ومش محسوب.

~~~text الناتج
99999 in l    500 loops, best of 5: 763 usec per loop
99999 in s    10000000 loops, best of 5: 28.1 nsec per loop
0 in l        20000000 loops, best of 5: 20.1 nsec per loop
set(l)        100 loops, best of 5: 2.69 msec per loop
~~~

- [[usec]] ميكروثانية (جزء من مليون)، و [[nsec]] نانوثانية (جزء من مليار)، و [[msec]] ملّي ثانية. يعني 763 usec = 763000 nsec، والـ set أسرع بحوالي ٢٧ ألف مرة هنا.
- [[best of 5]]: كرر القياس ٥ مرات وخد الأحسن، عشان الجهاز ممكن يكون مشغول في حاجة تانية في مرة منهم.
- [[0 in l]] سريع جدًا: 0 أول عنصر. فـ O(n) معناها «أسوأ حالة»، والقياس الصح على أسوأ حالة.
- [[set(l)]] نفسه أخد 2.69ms، يعني تمن ٣ عمليات بحث في الـ list تقريبًا. فالتحويل يستاهل لو هتسأل كتير، مش لسؤال واحد.

---

## ٣. الـ tuple كمفتاح

~~~python
point = (30.0, 31.2)
cache = {point: "Cairo"}
~~~

- [[(30.0, 31.2)]]: tuple، قيمتين مرتبطين (خط عرض وطول). ومبتتعدّلش (immutable).
- [[{point: "Cairo"}]]: dict، المفتاح الـ tuple والقيمة النص. و [[cache[(30.0, 31.2)] ]] بترجع [[Cairo]].

ليه tuple مش list؟ الـ dict برضه hash table، فالمفتاح لازم يتحسبله hash، والـ hash ده لازم ميتغيرش طول ما المفتاح جوه. الـ list ممكن تتعدّل، فـ Python بيرفضها:

~~~text الناتج: {[30.0, 31.2]: "Cairo"}
TypeError: cannot use 'list' as a dict key (unhashable type: 'list')
~~~

و **hashable** يعني ليه hash ثابت: الأرقام والنصوص والـ tuples (لو كل اللي جواها hashable) أيوه، والـ list والـ dict والـ set لأ.

---

## ٤. حاجات بتيجي في نفس السؤال

~~~text الناتج
88 72              sys.getsizeof([1,2,3]), sys.getsizeof((1,2,3))
[3, 1, 2] {1, 2, 3}  list(dict.fromkeys([3,1,3,2,1])), set([3,1,3,2,1])
{'b': 1, 'a': 2}   dict اتضاف فيه b الأول
~~~

- الـ tuple أصغر (72 مقابل 88 byte): الـ list بتحجز مكان زيادة عشان تكبر.
- شيل التكرار **مع الحفاظ على الترتيب**: [[dict.fromkeys]] (مفاتيح الـ dict مبتتكررش ومرتبة)، أما [[set]] بيشيل التكرار بس الترتيب مش مضمون.
- الـ dict مرتب بترتيب الإضافة (مضمون من 3.7).

---

## الخلاصة

| النوع | مرتب؟ | بيتعدّل؟ | تكرار؟ | [[x in]] | استخدامه |
|---|---|---|---|---|---|
| list | آه | آه | آه | O(n) | قايمة هتلف عليها أو تضيف لها |
| tuple | آه | لأ | آه | O(n) | قيم ثابتة مع بعض، مفتاح، دالة بترجع كذا قيمة |
| set | لأ | آه | لأ | O(1) | «موجود؟»، شيل تكرار، تقاطع واتحاد |
| dict | بالإضافة | آه | المفاتيح لأ | O(1) بالمفتاح | مفتاح → قيمة |

الجملة اللي تقولها: «set و dict سريعين في البحث لأنهم hash tables، وده نفسه سبب إن المفاتيح لازم تبقى hashable. ولو هسأل "موجود؟" كتير، بحوّل لـ set مرة واحدة.»`,
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
          teach: R`## المثال بيعمل إيه؟

نفس الحسبة (مربعات مليون رقم) مكتوبة مرتين: مرة **list** ومرة **generator**. الفرق في الكتابة قوس واحد، والفرق في السلوك كبير: الحجم في الذاكرة، وإنك تقدر تلف عليه كام مرة. اتجرب على ويندوز (Python 3.14).

---

## ١. الفرق في الكتابة

~~~python
import sys
squares_list = [i * i for i in range(1_000_000)]
squares_gen = (i * i for i in range(1_000_000))
~~~

- **[[[...]]] أقواس مربعة**: list comprehension. Python بيلف على المليون رقم **دلوقتي**، ويحسب كل مربع، ويخزّن المليون نتيجة.
- **[[(...)]] أقواس عادية**: generator expression. Python بيعمل object صغير فاكر «أنا هحسب [[i * i]] على [[range(1_000_000)]]»، ومبيحسبش ولا رقم. الحساب بيحصل لما حد يطلب العنصر الجاي. ده معنى **lazy**.

---

## ٢. الحجم: [[sys.getsizeof]]

~~~python
print(sys.getsizeof(squares_list), sys.getsizeof(squares_gen))
~~~

[[sys.getsizeof]] بترجع حجم الـ object بالـ byte.

~~~text الناتج
8448728 208
~~~

- الـ list حوالي 8 ميجا: ده **مكان المؤشرات بس** (8 byte لكل عنصر على جهاز 64-bit + مكان زيادة للتكبير). والأرقام نفسها objects لوحدها فوق كده، فالحقيقي أكبر.
- الـ generator 208 byte، ومش هيكبر لو خليته مليار بدل مليون.

---

## ٣. اللف عليه: مرة واحدة بس

~~~python
print(sum(squares_gen))
print(sum(squares_gen))   # 0: اتستهلك
~~~

~~~text الناتج
333332833333500000
0
~~~

[[sum]] بتطلب من الـ generator عنصر عنصر، والـ generator بيحسب كل واحد ساعتها ويرميه بعد ما [[sum]] تجمعه. لما يخلص، خلص: مفيش «ارجع للأول». فـ [[sum]] التانية لقته فاضي ورجّعت 0 من غير أي error. ده أخطر حاجة فيه: الغلطة بتعدّي ساكتة.

وحاجات تانية مش موجودة فيه، لأن مفيش عناصر متخزنة أصلًا:

~~~text الناتج
TypeError: object of type 'generator' has no len()
TypeError: 'generator' object is not subscriptable
~~~

([[len(g)]] و [[g[0] ]]، و subscriptable يعني «ينفع تستخدم معاه [[ [] ]]».)

### طب [[range]] مش generator؟

لأ. [[range(5)]] كمان مبيخزّنش الأرقام، بس بيحسب أي واحد منها بمعادلة، فـ [[len(r)]] بترجع 5، و [[r[2] ]] بترجع 2، و [[list(r)]] مرتين بترجع [[[0, 1, 2, 3, 4]]] في المرتين. يعني lazy بس مش بيتستهلك.

---

## ٤. [[yield]]: generator بدالة

الـ generator expression شكل مختصر. الشكل الكامل دالة فيها [[yield]]:

~~~python
def gen():
    print("start")
    yield 1
    print("after 1")
    yield 2
g = gen(); print("made"); print(next(g)); print(next(g))
~~~

~~~text الناتج
made
start
1
after 1
2
StopIteration
~~~

- [[gen()]] مبينفّذش ولا سطر، بس بيرجع generator ([[made]] اتطبعت قبل [[start]]).
- [[next(g)]] بيشغّل الدالة لحد أول [[yield]] ويرجّع قيمتها، **ويوقف مكانه**.
- [[next]] التانية بتكمّل من عند الوقفة.
- لما الدالة تخلص، [[next]] بترمي [[StopIteration]]، و [[for]] و [[sum]] بيفهموها «خلصنا».

ونفس الوقفة دي هي اللي بتخلّي dependency فيها [[yield]] في FastAPI تكمّل بعد الـ request.

---

## ٥. الـ solCode: pipeline على ملف ضخم

~~~python
from itertools import islice
lines_read = 0
def read_lines(path: str):
    global lines_read
    with open(path, encoding="utf-8") as f:
        for line in f:
            lines_read += 1
            yield line.rstrip("\n")
~~~

- [[global lines_read]]: الدالة هتعدّل المتغير اللي برّه، مش تعمل واحد جديد جواها. عدّاد عشان نشوف قرينا كام سطر فعلًا.
- [[for line in f]]: الملف نفسه بيتقري سطر سطر (مش كله في الذاكرة).
- [[yield line.rstrip("\n")]]: رجّع السطر من غير الـ newline في آخره، واستنى.

~~~python
def errors(lines):
    return (l for l in lines if "ERROR" in l)
first10 = list(islice(errors(read_lines("app.log")), 10))
print(len(first10), "lines_read:", lines_read)
~~~

- [[errors]] بترجع generator expression بشرط: بيعدّي بس السطور اللي فيها [[ERROR]].
- [[islice(gen, 10)]] من [[itertools]]: زي [[[:10]]] بس على أي iterator، بياخد أول ١٠ ويقف.
- [[list(...)]] برّه هو اللي بيبدأ السحب فعلًا.

السحب بيمشي من برّه لجوه: [[list]] بتطلب من [[islice]]، اللي بتطلب من [[errors]]، اللي بتطلب من [[read_lines]] سطر سطر لحد ما تلاقي واحد فيه ERROR. عملنا ملف مليون سطر، كل ألف سطر فيهم ERROR:

~~~text الناتج
10 lines_read: 10000
1000 ERROR boom | 10000 ERROR boom
~~~

قرا ١٠ آلاف سطر بس ووقف، من مليون. ولما غيرنا [[errors]] لـ [[[l for l in lines if "ERROR" in l]]] (أقواس مربعة):

~~~text الناتج
10 lines_read: 1000000
~~~

نفس النتيجة، بس قرا الملف كله وخزّن كل سطور الـ ERROR في الذاكرة الأول. قوس واحد غيّر الشغل ١٠٠ مرة.

---

## الخلاصة

| | list | generator |
|---|---|---|
| بيحسب إمتى | كله مرة واحدة | عنصر عنصر لما يتطلب |
| الذاكرة | بتكبر مع العدد | ثابتة وصغيرة |
| تلف عليه | كذا مرة | مرة واحدة |
| [[len]] و [[[i]]] | آه | لأ |
| مناسب لـ | داتا صغيرة هتستخدمها كذا مرة | ملفات ضخمة، streams، pipelines، [[sum]] و [[any]] |

الجملة اللي تقولها: «الـ list بتحسب وتخزّن كل حاجة، والـ generator lazy بيحسب عنصر عنصر، فالذاكرة ثابتة، بس بيتستهلك مرة واحدة ومفيهوش len ولا index.»`,
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
          teach: R`## المثال بيعمل إيه؟

decorator اسمه [[timed]]: تحطه فوق أي دالة async، فكل ما تتنادى يطبع اسمها وأخدت كام ملّي ثانية، من غير ما تلمس كود الدالة نفسها. وفي الـ solCode نسخة بتشتغل مع الـ sync والـ async الاتنين. اتجرب على ويندوز (Python 3.14)، وجربنا عليه دالة [[fetch]] بتستنى 0.1 ثانية.

---

## ١. الفكرة قبل الكود: [[@timed]] = [[f = timed(f)]]

~~~python
@timed
async def fetch(user_id: int) -> str:
    ...
~~~

ده بالظبط نفس:

~~~python
async def fetch(user_id: int) -> str:
    ...
fetch = timed(fetch)
~~~

يعني الـ decorator **دالة عادية** بتاخد دالة وترجع دالة. والاسم [[fetch]] بعد كده بيشاور على اللي [[timed]] رجّعته، مش على الأصلية. ده ينفع لأن الدوال في Python objects: تتبعت كـ argument وتترجع وتتخزن في متغير.

---

## ٢. الطبقة البرّانية

~~~python
import functools, time
def timed(fn):
    ...
    return wrapper
~~~

[[timed]] بتاخد [[fn]] (الدالة الأصلية)، وبتعرّف جواها دالة جديدة [[wrapper]]، وبترجعها. **من غير أقواس**: [[return wrapper]] بيرجّع الدالة نفسها، و [[return wrapper()]] كان هينفّذها.

---

## ٣. الـ wrapper

~~~python
    @functools.wraps(fn)
    async def wrapper(*args, **kwargs):
~~~

- [[async def]]: لأن [[fn]] async، فاللي بينادي هيعمل [[await]] على اللي راجع، فلازم [[wrapper]] نفسها تبقى async.
- [[*args]]: أي arguments بالترتيب تتجمع في tuple اسمها [[args]]. و [[**kwargs]]: أي arguments بالاسم ([[user_id=7]]) تتجمع في dict. كده [[wrapper]] بتقبل أي شكل نداء، فتنفع لأي دالة.
- **closure**: [[wrapper]] بتستخدم [[fn]] مع إنها مش باراميتر عندها. بتفتكرها من الـ scope اللي اتعملت فيه، حتى بعد ما [[timed]] خلصت.

### [[@functools.wraps(fn)]]

decorator على الـ wrapper نفسه، بينسخ من [[fn]] اسمها ([[__name__]]) والـ docstring ([[__doc__]])، ويحط الأصلية في [[__wrapped__]]. جربنا الفرق:

~~~text الناتج
fetch Fetch a user. <function fetch at 0x000001BDB38017A0>    مع wraps: __name__ و __doc__ و __wrapped__
(user_id: int) -> str                                       inspect.signature(fetch) مع wraps
wrapper (*args, **kwargs)                                   من غير wraps
~~~

من غير [[wraps]] الدالة اسمها بقى [[wrapper]] والـ signature بقت [[(*args, **kwargs)]]. وده مش شكل بس: FastAPI بيقرا الـ signature عشان يعرف الـ route محتاج إيه، فمن غير [[wraps]] مش هيعرف إن فيه [[user_id: int]].

---

## ٤. القياس: [[try]] و [[finally]]

~~~python
        start = time.perf_counter()
        try:
            return await fn(*args, **kwargs)
        finally:
            print(fn.__name__, f"{(time.perf_counter() - start) * 1000:.1f}ms")
~~~

- [[fn(*args, **kwargs)]]: هنا الـ [[*]] و [[**]] بيعملوا العكس: بيفكّوا الـ tuple والـ dict تاني لـ arguments، فالأصلية بتستلم بالظبط اللي اتبعت.
- [[return await ...]]: استنى الأصلية ورجّع ناتجها زي ما هو. نسيان [[return]] = الدالة المتزيّنة ترجع [[None]] دايمًا.
- [[finally]]: بيتنفّذ **في كل الأحوال**: بعد [[return]]، أو لو الأصلية رمت exception. والـ exception بيكمّل طريقه عادي.

~~~text الناتج
fetch 109.0ms
user 7
boom 61.6ms
ValueError: bad
~~~

[[boom]] دالة بتستنى 0.05 ثانية وترمي [[ValueError]]: الوقت اتطبع، والـ exception وصل للي نادى. و 109 مش 100 بالظبط عشان [[asyncio.sleep]] بيضمن «على الأقل» المدة، والباقي وقت تشغيل.

---

## ٥. لو حطيته على دالة sync

~~~python
@timed
def f():
    return 1
~~~

~~~text الناتج
<coroutine object f at 0x000001BDB3865C40>
f 0.0ms
TypeError: 'int' object can't be awaited
~~~

[[f()]] بقت بترجع coroutine (لأن [[wrapper]] async) مش 1. ولما شغلناها، [[await fn()]] حاول يستنى الرقم 1 فرمى [[TypeError]]. ولو محدش عمل للـ coroutine دي await خالص، Python بيطبع [[RuntimeWarning: coroutine 'f' was never awaited]].

---

## ٦. الـ solCode: النوعين

الفكرة إن [[timed]] تسأل الأول: [[inspect.iscoroutinefunction(fn)]]، يعني «الدالة دي [[async def]]؟»، وترجّع wrapper من نفس النوع:

- لو آه: [[async_wrapper]] زي المثال بالظبط.
- لو لأ: [[sync_wrapper]] بـ [[def]] عادية، ومن غير [[await]].

~~~text الناتج
slow_sum 11.7ms
499999500000
fetch 102.2ms
done
True False      inspect.iscoroutinefunction(fetch), inspect.iscoroutinefunction(slow_sum)
~~~

السطر الأخير مهم: بعد الـ decorator، [[fetch]] لسه بتتشاف async. FastAPI بيسأل نفس السؤال عشان يقرر يشغّل الـ route على الـ event loop ولا في threadpool، فلو الـ decorator بوّظ الإجابة، الـ route هيتشغّل غلط.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[def timed(fn)]] | بتاخد الدالة الأصلية |
| [[@functools.wraps(fn)]] | الاسم والـ docstring والـ signature يفضلوا |
| [[*args, **kwargs]] | يقبل أي نداء ويبعته زي ما هو |
| [[async def]] + [[await]] | لو الأصلية async |
| [[return]] جوه الـ wrapper | الناتج يوصل |
| [[try]] / [[finally]] | الوقت يتسجّل حتى لو رمت |
| [[return wrapper]] من غير أقواس | ترجّع الدالة مش ناتجها |

الجملة اللي تقولها: «الـ decorator دالة بتاخد دالة وترجع wrapper بيلفها، و [[@x]] اختصار [[f = x(f)]]. بستخدم [[*args, **kwargs]] و [[functools.wraps]]، ولو الأصلية async الـ wrapper لازم يبقى async.»`,
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

الغلطة لو استخدمت الـ async wrapper بتاع المثال على دالة sync: [[f()]] مبترجعش 1، بترجع [[<coroutine object f at 0x...>]] ومعاها [[RuntimeWarning: coroutine 'f' was never awaited]]، ولو عملتلها await هترمي [[TypeError: 'int' object can't be awaited]] (ده نص Python 3.14، وفي 3.13 [[object int can't be used in 'await' expression]]). ولو عملت wrapper sync على دالة async، التوقيت هيطلع صفر تقريبًا لأنه بيقيس عمل الـ coroutine مش تشغيلها.`,
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
          teach: R`## المثال بيعمل إيه؟

route [[/me]] بيرجّع بيانات اليوزر الحالي من القاعدة. الـ route مبيعرفش يجيب اتصال ولا يقرا توكن: بيقول بس «أنا محتاج [[CurrentUser]] و [[DB]]»، و FastAPI بيجيبهم. والسطر الأخير بيبدّل القاعدة الحقيقية بواحدة مزيفة في الاختبارات.

المثال حتة من تطبيق، فكمّلناه عشان يشتغل: lifespan بيعمل [[asyncpg]] pool على Postgres 16 في Docker، و [[current_user]] بيقرا توكن من header [[Authorization]]، وجدول [[users]] فيه [[sara@example.com]] و [[omar@example.com]]. وحطينا [[print]] في كل dependency عشان نشوف الترتيب. اتجرب على ويندوز (FastAPI 0.142، Python 3.14) بـ [[TestClient]].

---

## ١. dependency فيها [[yield]]: [[get_db]]

~~~python
async def get_db(request: Request):
    async with request.app.state.pool.acquire() as conn:
        yield conn
~~~

- [[request: Request]]: الـ dependency نفسها ليها باراميترات زي الـ route بالظبط، و FastAPI بيملاها. هنا عايزة الـ request عشان توصل للـ pool اللي اتعمل في الـ lifespan.
- [[pool.acquire()]]: «سلّفني اتصال من الـ pool». و [[async with]] بيضمن إنه يرجع للـ pool لما البلوك يخلص، مهما حصل.
- [[yield conn]]: هنا الـ dependency **بتقف**، و [[conn]] بيروح للـ route. لما الـ route يخلص، FastAPI بيكمّل الدالة من بعد الـ [[yield]]، فالـ [[async with]] يقفل والاتصال يرجع. نفس فكرة الـ generator و [[@contextmanager]].

---

## ٢. [[Annotated]]: نوع قابل لإعادة الاستخدام

~~~python
DB = Annotated[asyncpg.Connection, Depends(get_db)]
~~~

[[Annotated[النوع, معلومة زيادة]]] طريقة Python تلزق معلومة على type hint. هنا: «النوع [[asyncpg.Connection]]» (للـ editor والـ autocomplete)، و «هاته من [[get_db]]» (لـ FastAPI). وبما إنه اتخزن في متغير [[DB]]، أي route يكتب [[db: DB]] وخلاص.

> [[Depends(get_db)]] من غير أقواس بعد [[get_db]]: بتدّي FastAPI الدالة، وهو اللي يناديها مع كل request. [[Depends(get_db())]] بتناديها انت مرة وقت التعريف، وده غلط.

---

## ٣. الـ route

~~~python
@app.get("/me")
async def me(user: CurrentUser, db: DB):
    return await db.fetchrow("SELECT id, email FROM users WHERE id = $1", user.id)
~~~

- [[user: CurrentUser]]: [[CurrentUser]] اتعرّف بنفس الطريقة: [[Annotated[User, Depends(current_user)]]]. و [[current_user]] نفسها معتمدة على [[DB]] وعلى الـ header.
- [[db.fetchrow(sql, value)]]: query بترجع صف واحد. و [[$1]] مكان أول قيمة بعد الـ SQL (هنا [[user.id]])، و asyncpg بيبعتها منفصلة عن النص، فمفيش SQL injection.

~~~text الناتج: GET /me مع Authorization: Bearer t-sara
get_db: acquire
current_user
route me
get_db: released
{'id': 1, 'email': 'sara@example.com'}
~~~

لاحظ: [[current_user]] و [[me]] الاتنين طالبين [[DB]]، و [[get_db: acquire]] اتطبعت **مرة واحدة**. FastAPI بيعمل cache لنتيجة كل dependency جوه نفس الـ request، فالاتنين أخدوا نفس الاتصال. (لو عايز نداء جديد كل مرة: [[Depends(get_db, use_cache=False)]].)

### من غير توكن

~~~text الناتج: GET /me من غير header
get_db: acquire
current_user
401 {'detail': 'bad token'}
~~~

[[current_user]] رمت [[HTTPException(401)]]، فالـ route متنادتش خالص. و [[get_db: released]] **متطبعتش**: الـ exception اتبعت جوه [[get_db]] عند الـ [[yield]]، فالـ [[async with]] قفل ورجّع الاتصال، بس السطر اللي بعده متنفّذش. عشان كده أي تنضيف لازم يحصل في الـ [[async with]] أو [[finally]]، مش في سطر عادي بعد الـ [[yield]].

---

## ٤. [[dependency_overrides]]

~~~python
app.dependency_overrides[get_db] = fake_db
~~~

[[dependency_overrides]] dict: المفتاح الدالة الأصلية، والقيمة البديلة. أي حتة في التطبيق طالبة [[get_db]] (الـ route و [[current_user]] كمان) هتاخد [[fake_db]]. عرّفنا [[fake_db]] بتعمل [[yield]] لـ object فيه [[fetchrow]] بترجع داتا ثابتة:

~~~text الناتج: GET /me مع Bearer t-omar بعد الـ override
fake_db
current_user
route me
{'id': 2, 'email': 'fake@test'}
~~~

ولا اتصال بالقاعدة، والـ route نفسه متغيرش حرف. وبعد الاختبار [[app.dependency_overrides.clear()]].

---

## ٥. التجربة: شجرة كاملة وترتيب الفتح والقفل

عملنا route [[list_orders]] طالب [[current_user]] (اللي طالبة [[oauth2]] و [[get_db]])، و [[get_db]]، و [[pagination]]. و [[get_db]] و [[current_user]] الاتنين بـ [[yield]]:

~~~text الناتج
  oauth2
  get_db: open
  current_user: open
  pagination
  route list_orders
  current_user: close
  get_db: close
~~~

- الفتح: الأعمق الأول، لأن [[current_user]] مقدرش يبدأ من غير التوكن والاتصال.
- القفل: **بالعكس** زي stack، آخر واحدة اتفتحت أول واحدة تتقفل. فالاتصال بيفضل موجود لحد ما [[current_user]] (اللي بتستخدمه) تخلص.

### إمتى الكود اللي بعد [[yield]] بيشتغل؟

عملنا dependency بتستنى ثانية بعد الـ [[yield]]، وقسنا بـ [[curl -w]] أول byte من الرد وصل إمتى:

~~~text الناتج
default  first byte 0.005441s total 0.005649s
function first byte 1.020253s total 1.020426s
~~~

الافتراضي: الرد بيتبعت الأول، والتنضيف بعده. و [[Depends(dep, scope="function")]]: التنضيف بيحصل **قبل** ما الرد يتبعت (العميل استنى الثانية).

---

## الخلاصة

| | dependency | middleware |
|---|---|---|
| بتشتغل على | الـ routes اللي طالباها | كل الطلبات |
| بترجع قيمة للـ route | آه | لأ |
| بتظهر في الـ docs | آه (الـ headers والـ query بتوعها) | لأ |
| تتبدل في الاختبار | [[dependency_overrides]] | لأ |

- FastAPI بيقرا الـ signatures مرة وقت التشغيل، وبيحل الشجرة مع كل request.
- كل dependency مرة واحدة لكل request (cache)، مش singleton على مستوى التطبيق.
- الـ [[yield]] بيقفل بالعكس، و exception بتوقف الـ route بس الـ [[async with]] بيقفل برضه.

الجملة اللي تقولها: «الـ route بيعلن محتاج إيه في الـ signature، و FastAPI بيبني شجرة الـ dependencies ويحلها لكل request مع cache جوه الطلب، والـ yield بيدّيني setup و teardown، و dependency_overrides بيخلّي الاختبار من غير mocks.»`,
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
          teach: R`## المثال بيعمل إيه؟

موديل [[User]] فيه رقم وإيميل. بندّيله dict فيه [[id]] كنص ([["5"]])، فبيفحصه ويحوّله لرقم ويتأكد إن الإيميل سليم، وبعدين بنرجّعه dict جاهز لـ JSON. ده نفس اللي FastAPI بيعمله مع كل body جاي. اتجرب على ويندوز (Pydantic 2.13 و pydantic-core 2.46، FastAPI 0.142، Python 3.14). و [[EmailStr]] محتاجة [[pip install "pydantic[email]"]].

---

## ١. الموديل

~~~python
class User(BaseModel):
    model_config = ConfigDict(from_attributes=True, extra="forbid")
    id: int
    email: EmailStr
~~~

- [[class User(BaseModel)]]: أي class بيورث من [[BaseModel]] بقى موديل: Pydantic بيقرا الـ type hints بتاعته ويبني منها قواعد فحص (مرة واحدة وقت تعريف الـ class).
- [[id: int]] و [[email: EmailStr]]: حقلين **إجباريين** (مفيش default). و [[EmailStr]] نوع جاهز بيتأكد إن النص شكله إيميل.
- [[model_config = ConfigDict(...)]]: إعدادات الموديل في v2. في v1 كانت [[class Config:]] جوه الموديل.
  - [[from_attributes=True]]: يقدر يقرا من object عادي بالـ attributes ([[row.id]])، مش dict بس. ده اللي بتحتاجه مع صف من SQLAlchemy. كان اسمه [[orm_mode]] في v1.
  - [[extra="forbid"]]: لو جه حقل مش في الموديل، ارفض. الافتراضي [[ignore]]: يتشال ساكت.

---

## ٢. الفحص والتحويل: [[model_validate]]

~~~python
user = User.model_validate({"id": "5", "email": "a@example.com"})
~~~

[[model_validate]] بتاخد dict (أو object مع [[from_attributes]]) وترجّع [[User]] مضمون، أو ترمي [[ValidationError]]. كانت [[parse_obj]] في v1.

~~~text الناتج: repr(user)
User(id=5, email='a@example.com')
~~~

[[id=5]] رقم مش [["5"]]: ده الـ **lax mode** (الافتراضي)، النص اللي شكله رقم بيتحوّل. وجربنا ٣ حاجات غلط:

~~~text الناتج
id
  Input should be a valid integer, unable to parse string as an integer [type=int_parsing, input_value='five', input_type=str]
email
  value is not a valid email address: An email address must have an @-sign. [type=value_error, input_value='not-an-email', input_type=str]
role
  Extra inputs are not permitted [type=extra_forbidden, input_value='admin', input_type=str]
~~~

كل error بيقولك الحقل، والسبب، ونوع الغلطة ([[type=...]])، والقيمة اللي جت. و [["five"]] متحولتش: lax بيحوّل اللي ليه معنى بس.

ومع object عادي فيه [[self.id = 7]] و [[self.email = "orm@example.com"]]، [[User.model_validate(row)]] رجّع [[id=7 email='orm@example.com']]: ده شغل [[from_attributes]].

---

## ٣. الرجوع لـ dict: [[model_dump]]

~~~python
user.model_dump(mode="json")   # {'id': 5, 'email': 'a@example.com'}
~~~

[[model_dump]] (كانت [[.dict()]] في v1) بترجّع dict. و [[mode="json"]] معناها «حوّل كل قيمة لنوع JSON يفهمه». الفرق بيبان مع تاريخ:

~~~text الناتج: موديل فيه at: datetime
{'at': datetime.datetime(2026, 10, 7, 12, 0)}     model_dump()
{'at': '2026-10-07T12:00:00'}                      model_dump(mode="json")
~~~

و [[model_dump_json()]] (كانت [[.json()]]) بترجّع نص JSON على طول: [[{"id":5,"email":"a@example.com"}]]، والتحويل ده بيحصل جوه pydantic-core المكتوب بـ Rust.

---

## ٤. في FastAPI

نفس الموديل كـ body وكـ return type:

~~~python
@app.post("/users")
async def create(user: User) -> User:
    return user
~~~

~~~text الناتج
200 {'id': 5, 'email': 'a@example.com'}
422 {'detail': [{'type': 'extra_forbidden', 'loc': ['body', 'role'], 'msg': 'Extra inputs are not permitted', 'input': 'admin'}]}
~~~

FastAPI بينادي [[model_validate]] على الـ body، ولو فشل بيرجّع **422** بنفس الـ errors من غير ما الـ route يتنادى. و [[loc]] بيقولك الغلطة فين: [[body]] ثم [[role]]. والـ [[-> User]] بيخلّي الرد يتفلتر بالموديل، و [[User.model_json_schema()]] هو اللي بيطلع في [[/docs]] (فيه [[additionalProperties: False]] بسبب [[extra="forbid"]]، و [[format: email]]).

---

## ٥. التجربة: من v1 لـ v2

موديل مكتوب v1 (فيه [[class Config: orm_mode = True]] و [[@validator]] و [[parse_obj]] و [[.dict()]] و [[.json()]]) لسه بيشتغل على Pydantic 2، بس كل حاجة قديمة بتطلّع تحذير:

~~~text الناتج (مختصر)
v1.py:7: PydanticDeprecatedSince20: Pydantic V1 style $__bt@validator$__bt validators are deprecated. ...
v1.py:2: PydanticDeprecatedSince20: Support for class-based $__bt config$__bt is deprecated, ...
UserWarning: Valid config keys have changed in V2:
* 'orm_mode' has been renamed to 'from_attributes'
v1.py:10: PydanticDeprecatedSince20: The $__bt parse_obj$__bt method is deprecated; use $__bt model_validate$__bt instead. ...
v1.py:11: PydanticDeprecatedSince20: The $__bt dict$__bt method is deprecated; use $__bt model_dump$__bt instead. ...
v1.py:11: PydanticDeprecatedSince20: The $__bt json$__bt method is deprecated; use $__bt model_dump_json$__bt instead. ...
{'id': 5, 'email': 'a@x.com'} {"id":5,"email":"a@x.com"}
~~~

و [[python -W error::DeprecationWarning v1.py]]: [[-W]] بيتحكم في التحذيرات، و [[error::DeprecationWarning]] معناها «أي تحذير من النوع ده يبقى exception». و [[PydanticDeprecatedSince20]] نوع من [[DeprecationWarning]]، فالبرنامج وقف عند أول واحد ([[@validator]]). بعد التحويل (الـ solCode) نفس الأمر طلّع [[{'id': 5, 'email': 'a@x.com'} {"id":5,"email":"a@x.com"}]] من غير ولا تحذير. لاحظ إن [[@field_validator]] لازم معاها [[@classmethod]] تحتها.

---

## الخلاصة

| v1 | v2 |
|---|---|
| [[class Config:]] | [[model_config = ConfigDict(...)]] |
| [[orm_mode = True]] | [[from_attributes=True]] |
| [[parse_obj(d)]] | [[model_validate(d)]] |
| [[.dict()]] | [[.model_dump()]] |
| [[.json()]] | [[.model_dump_json()]] |
| [[@validator]] | [[@field_validator]] + [[@classmethod]] |

- Pydantic بيفحص **ويحوّل** وقت التشغيل من الـ type hints، و FastAPI بيستخدمه للـ body والـ query والرد والـ docs.
- v2 الـ core بتاعه Rust (pydantic-core)، و FastAPI الحالي محتاج [[pydantic>=2.9.0]] (من الـ metadata بتاع 0.142)، يعني v1 مش مدعوم.
- 422 = الطلب غلط، و 500 ([[ResponseValidationError]]) = الرد اللي انت رجعته مش مطابق للموديل.`,
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
          teach: R`## المثال بيعمل إيه؟

٣ routes بيعملوا I/O (يستنوا حاجة برّه)، مكتوبين ٣ طرق: [[async def]] و [[await]] صح، و [[def]] عادية فيها مكتبة sync، و [[async def]] فيها مكتبة sync (الغلطة). الكود تقريبًا واحد، والفرق في الأداء ٣٠ مرة. اتجرب على ويندوز (FastAPI 0.142 و uvicorn 0.54، Python 3.14، worker واحد)، والقاعدة Postgres 16 في Docker.

---

## ١. الفكرة: thread واحد بيخدم الكل

uvicorn بيشغّل **event loop** واحد في thread واحد. الـ loop ده زي جرسون واحد في مطعم: ياخد طلب، يبعته للمطبخ، ويروح للترابيزة اللي بعدها **من غير ما يقف يستنى**. ولما الأكل يجهز يرجع. ده [[await]]: «أنا مستني حاجة، روح شوف غيري».

لكن لو الجرسون وقف جنب المطبخ مستني بنفسه، المطعم كله وقف. ده نداء sync ([[requests.get]] أو [[time.sleep]]) جوه [[async def]].

---

## ٢. [[/a]]: [[async def]] و [[await]]

~~~python
@app.get("/a")
async def a(db: DB):
    return await db.fetchval("SELECT 1")
~~~

- [[async def]]: FastAPI بيشغّلها **على الـ loop نفسه**.
- [[db: DB]]: اتصال من [[asyncpg]] pool (الـ dependency من درس «Depends»).
- [[await db.fetchval(...)]]: [[fetchval]] بترجع أول قيمة من أول صف. و [[await]] معناها: ابعت الـ query، وسيب الـ loop يخدم غيري لحد ما الرد يرجع.

---

## ٣. [[/b]]: [[def]] عادية

~~~python
@app.get("/b")
def b():
    return requests.get("https://example.com", timeout=5).status_code
~~~

- [[requests]] مكتبة HTTP **sync**: [[get]] بتقف لحد ما الرد يوصل. و [[timeout=5]] أقصى انتظار ٥ ثواني، و [[.status_code]] رقم الرد (200).
- لأن الدالة [[def]] مش [[async def]]، FastAPI مبيشغّلهاش على الـ loop. بيبعتها لـ **threadpool** (من مكتبة AnyIO)، فالانتظار بيقفل thread من الـ pool بس، والـ loop فاضي. عدد الـ threads ده:

~~~text الناتج: anyio.to_thread.current_default_thread_limiter().total_tokens
40
~~~

يعني ٤٠ طلب من النوع ده بس يستنوا مع بعض، والـ ٤١ بيستنى دوره.

---

## ٤. [[/c]]: الغلطة

~~~python
@app.get("/c")
async def c():
    return requests.get("https://example.com", timeout=5).status_code  # غلط: بيقفل الـ loop
~~~

[[async def]]، فـ FastAPI بيشغّلها على الـ loop. بس جواها [[requests.get]] اللي مش بتعمل [[await]]: الـ thread الوحيد بتاع الـ loop واقف مستني الشبكة، ومحدش تاني بيتخدم، ولا حتى route تاني خالص.

---

## ٥. القياس

بدل example.com عملنا خدمة محلية بترد بعد 0.2 ثانية بالظبط (عشان النت ميأثرش)، وأداة بتبعت ٢٠٠ طلب، ٥٠ في نفس الوقت (زي [[hey -n 200 -c 50]]: [[-n]] العدد الكلي و [[-c]] concurrency، كام مع بعض):

~~~text الناتج
/a: 200 requests, 50 at a time: 1.23s = 162 req/s {200: 200}
/b: 200 requests, 50 at a time: 1.35s = 148 req/s {200: 200}
/c: 200 requests, 50 at a time: 39.25s = 5 req/s {200: 181, 'ReadError': 17, 'RemoteProtocolError': 2}
~~~

### نحسبها

- **[[/c]]**: كل طلب 0.2 ثانية، وورا بعض لأن الـ loop مقفول: 200 × 0.2 = **40 ثانية**، وطلع 39.25. وكمان ١٩ طلب فشلوا: الاتصالات اللي فضلت مفتوحة (keep-alive) قعدت أكتر من مهلة uvicorn (٥ ثواني) من غير ما حد يرد، فاتقفلت. يعني الغلطة دي مش بطء بس، دي errors عند العميل.
- **[[/b]]**: ٤٠ thread، كل واحد 0.2 ثانية: 200 ÷ 40 × 0.2 = **1 ثانية** على الأقل، وطلع 1.35. أسرع من [[/c]] بحوالي ٣٠ مرة، **بنفس الكود بالظبط** من غير [[async]].
- **[[/a]]**: الـ query سريعة، والـ loop بيخدم الـ ٥٠ مع بعض. الرقم هنا محدود بأداة القياس نفسها (مكتوبة بـ Python على نفس الجهاز)، مش بالسيرفر.

---

## ٦. لو مضطر تنادي حاجة sync من [[async def]]

~~~python
result = await asyncio.to_thread(requests.get, url, timeout=5)
~~~

[[asyncio.to_thread]] بيشغّل الدالة في thread تاني ويدّيك حاجة تعملها [[await]]، فالـ loop يفضل فاضي. (و [[run_in_threadpool]] من Starlette نفس الفكرة على نفس الـ pool بتاع FastAPI.) أو الأحسن: استخدم نسخة async من المكتبة ([[httpx.AsyncClient]] بدل [[requests]]).

### إزاي تكتشف الـ blocking

[[PYTHONASYNCIODEBUG=1]] (أو [[asyncio.run(..., debug=True)]]) بيطبع أي خطوة مسكت الـ loop أكتر من 100ms. جربنا [[time.sleep(0.3)]] جوه [[async def]]:

~~~text الناتج
Executing <Task finished name='Task-4' coro=<bad() done, defined at <string>:6> result=None ...> took 0.301 seconds
~~~

---

## الخلاصة

| جوه الـ route | اكتبه | ليه |
|---|---|---|
| مكتبات async كلها ([[asyncpg]] و [[httpx.AsyncClient]] و [[redis.asyncio]]) | [[async def]] | الـ loop بيخدم آلاف الطلبات |
| مكتبة sync ([[requests]] و [[psycopg2]] و SDK قديم) | [[def]] | بيتشغّل في threadpool (٤٠ thread) |
| sync جوه [[async def]] | **لأ** | بيقفل الـ API كله |
| حسبة CPU تقيلة | process أو worker منفصل | الـ GIL، ولا ده ولا ده بيحلها |

الجملة اللي تقولها: «async مبيخليش الكود أسرع، بيخلّي الانتظار ميقفلش حد. [[async def]] بتشتغل على الـ event loop فكل I/O جواها لازم await، و [[def]] FastAPI بيشغّلها في threadpool. وأسوأ حالة إنك تحط مكتبة sync جوه [[async def]].»`,
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

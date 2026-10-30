// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "أسئلة انترفيو",
      l: 3,
      time: R`حوالي ٦ ساعات (نص ساعة لكل سؤال تقراه وتجرّبه، والباقي للتمارين والمشاريع)`,
      goal: [
        R`تجاوب على أشهر أسئلة Python بجملة تقولها في دقيقة، ومعاها رقم أو ناتج حقيقي جربته بنفسك بدل ما تحفظ.`,
        R`تتوقّع ناتج كود صغير فيه فخ (mutable default، و late binding، و MRO، و [[is]]، و generator اتستهلك) قبل ما تشغّله، وتشرح ليه.`,
        R`تشرح FastAPI من جوه: الـ dependencies بتتحل إزاي، و Pydantic بيعمل إيه، وإمتى [[async def]] بتفرق.`,
        R`تكتب كود قدام حد: decorator بـ [[wraps]]، و generator لملف ضخم، ومقارنة بالأرقام بين threads و processes.`,
      ],
      use: {
        prog: R`الأسئلة دي مش للانترفيو بس: كل واحد فيهم bug حقيقي هتقابله (list متشاركة بين نداءات، أو endpoint بيقفل السيرفر كله، أو decorator بوّظ الـ signature).`,
        work: R`في الانترفيو الإجابة اللي بتفرق هي اللي فيها «جربتها وطلع كذا»، والسؤال اللي بعدها. كل درس هنا فيه السؤال، والإجابة المختصرة، والأسئلة اللي بتيجي بعده، والغلطات اللي بتوقّع الناس.`,
        cs: R`الـ hash tables والـ complexity، والـ GIL و reference counting، والـ closures والدوال كـ objects، والـ iterator protocol، والـ C3 linearization (الـ MRO)، و event loop مقابل threads.`,
      },
      lab: R`python -m venv .venv && source .venv/bin/activate   # ويندوز: .\.venv\Scripts\Activate.ps1
pip install "fastapi[standard]" ruff pytest`,
      projects: [
        { lvl: 'صغير', t: R`كروت مراجعة بتتصحح لوحدها`, what: R`ملف [[cards.py]] فيه ١٠ أسئلة «توقّع الناتج» من الوحدة (كل سؤال: الكود كنص والناتج المتوقع)، وسكربت بيشغّل كل كود بـ [[exec]] ويقارن الناتج الحقيقي باللي انت كاتبه. من درس «توقّع الناتج».`, done: R`السكربت بيطبع ✓ أو ✗ لكل سؤال والمجموع، وفيه سؤالين على الأقل انت غلطت فيهم أول مرة وصلّحتهم، وبيشتغل على Python 3.13 و 3.14.` },
        { lvl: 'صغير', t: R`صيّاد الـ defaults`, what: R`شغّل [[ruff check --select B006,B008]] على مشروع Python عندك (أو على ملف فيه ٥ دوال كتبتها بفخاخ عن قصد)، وصلّح كل واحدة بـ [[None]] أو [[default_factory]]. من درس «الـ default بيتحسب مرة».`, done: R`ruff بيطبع [[All checks passed!]]، وكل دالة اتصلّحت ليها اختبار بيناديها مرتين ويتأكد إن الـ list مش متشاركة.` },
        { lvl: 'متوسط', t: R`مقياس التوازي`, what: R`سكربت بيقيس نفس الشغل بـ ٤ طرق: ورا بعض، و threads، و processes، و asyncio، على نوعين شغل: CPU (عدّ) و I/O ([[sleep]] أو طلبات لسيرفر محلي)، ويطبع جدول. من دروس «الـ GIL» و «async مش أسرع».`, done: R`الجدول فيه ٨ أرقام، و threads في الـ CPU قريبة من ورا بعض، وفي الـ I/O الـ threads و asyncio أسرع بكتير، وكاتب تحت الجدول جملة لكل صف بتفسّره.` },
        { lvl: 'متوسط', t: R`مكتبة decorators صغيرة`, what: R`[[decorators.py]] فيه [[timed]] و [[retry(times, delay)]] و [[cache_for(seconds)]]، كلهم شغالين مع sync و async، و [[wraps]] على الكل، و ١٠ اختبارات pytest. من درس «decorator بإيدك».`, done: R`الاختبارات بتعدّي، و [[inspect.signature]] و [[iscoroutinefunction]] بعد كل decorator زي الأصلية، و [[retry]] مش بيعيد على [[ValueError]] لو قلتله يعيد على [[ConnectionError]] بس.` },
        { lvl: 'كبير', t: R`انترفيو تجريبي كامل`, what: R`API صغير بـ FastAPI فيه [[GET /questions/random]] بيرجّع سؤال من الوحدة (كود + اختيارات)، و [[POST /answers]] بيصحح ويحفظ النتيجة في SQLite، و [[GET /stats]] بيرجّع نسبة الصح لكل موضوع. فيه Pydantic للـ body، و dependency للـ DB، ولوج JSON، واختبارات. من الوحدة دي ومن وحدات Pydantic و Dependencies و قاعدة البيانات.`, done: R`٢٠ سؤال على الأقل، والإجابة الغلط بترجّع الشرح والناتج الحقيقي، و [[/stats]] صح بعد ١٠ إجابات (اختبار بيتأكد)، والاختبارات بتستخدم [[dependency_overrides]] لقاعدة في الذاكرة وبتعدّي مرتين ورا بعض.`, ext: R`زوّد timer لكل سؤال، ومستوى صعوبة بيتغير حسب إجاباتك، وصفحة HTML بسيطة بتستخدم الـ API.` },
        { lvl: 'فكرة', t: R`بنك أسئلة فريقك`, what: R`اجمع الأسئلة اللي اتسألتها انت أو زمايلك في انترفيوهات حقيقية، وحوّل كل واحد لكود صغير بتشغّله، والإجابة اللي كانت متوقعة، والإجابة الأحسن بعد ما جربت. انت اللي بتختار الشكل (ملف Markdown، أو أداة، أو API).`, done: R`١٥ سؤال على الأقل، كل واحد فيه كود بيتشغّل وناتجه الحقيقي، ومصنّفين بالموضوع، وفيه ٣ أسئلة طلع ناتجها غير اللي كنت فاكره.`, ext: R`اربطه بمشروع «انترفيو تجريبي كامل» كمصدر أسئلة، وشاركه مع فريقك عشان كل واحد يضيف.` },
      ],
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

دالتين بيعملوا نفس الحاجة: ضيف عنصر لـ list ورجّعها. الأولى فيها فخ، والتانية الحل. والفخ مش في [[append]]، في **إمتى** الـ default بيتحسب. كل اللي تحت اتشغّل فعلًا على ويندوز (Python 3.14).

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
            R`سطر [[def]] كود بيتنفّذ **مرة واحدة** لما Python يقرا الملف: بيعمل الدالة ويحسب الـ [[[]]] ويخزّنها في [[add.__defaults__]]. فدي list واحدة لكل النداءات، مش list لكل نداء.`,
            R`[[append]] بتعدّل الـ list **مكانها** (in place). لو مبعتش [[items]]، دي الـ list المتخزّنة جوه الدالة نفسها، فالتعديل بيفضل للنداء الجاي.`,
            R`بترجّع نفس الـ object مش نسخة. اتجرّب: [[add.__defaults__[0] is add(4)]] طلعت [[True]]، فأي تعديل منك على الراجع بيوصل للدالة.`,
            R`النداء الأول ضاف 1 للـ list المتخزّنة، والتاني ضاف 2 لنفس الـ list، فالطباعة [[[1, 2]]] مش [[[2]]]. والـ [[;]] بتفصل جملتين في سطر.`,
            R`الحل: [[None]] كـ default. [[None]] object واحد ثابت محدش يقدر يعدّله، فمفيش مشكلة إنه يتشارك. و [[list | None]] بيقول للأدوات إنه list أو None.`,
            R`[[[] if items is None else items]]: الـ [[[]]] هنا جوه جسم الدالة، فبتتنفّذ مع **كل** نداء وتعمل list جديدة. و [[is None]] مش [[not items]]، عشان لو حد بعت list فاضية بتاعته نضيف عليها هي.`,
            R`دلوقتي [[append]] بيعدّل list النداء ده بس، أو الـ list اللي اللي بينادي بعتها (وده متوقع: هو اللي ادّاهالك).`,
            R`بنرجّع الـ list عشان اللي بينادي يستخدمها. ولو هو بعت بتاعته، هتتعدّل عنده كمان، وده سلوك موثّق مش فخ.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[def f(d={}): d["n"] = d.get("n", 0) + 1; return d["n"]]]. هيطبع إيه [[print(f(), f(), f({}), f())]]؟ اكتب الإجابة وبعدين شغّله.`, done: R`الناتج [[1 2 1 3]]: الـ [[f({})]] خدت dict جديد بتاعها، والـ default فضل يعدّ لوحده. وكاتب ليه التالتة 1 والرابعة 3.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[def log_event(name, at=datetime.now(), tags=[]):]] بتضيف [[name]] لـ [[tags]] وترجّع [[(at, tags)]]. نادي مرتين بينهم ثانية، وبيّن الباجين بالناتج، وصلّحهم.`, done: R`قبل: الوقت هو هو في النداءين، و [[tags]] التانية فيها الاسمين. بعد: الوقت مختلف بثانية، وكل نداء ليه tags لوحده، و [[ruff check --select B006,B008]] مبيطلّعش حاجة.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** اختبار pytest بيفشل على [[add]] الأصلية وبيعدّي على [[add_ok]]: بينادي من غير list مرتين ويتأكد إن كل نداء رجّع list فيها عنصر واحد.`, done: R`[[pytest -q]] على [[add]]: [[1 failed]] ورسالة الـ assert فيها [[[1, 2]]]. وعلى [[add_ok]]: [[1 passed]].` },
            { lvl: 'تحدي', t: R`**اشرحها:** اكتب لزميل في ٣ سطور ليه [[@dataclass]] بيرمي [[ValueError]] مع [[items: list = []]] و Pydantic لأ، وجرّب الاتنين وانسخ رسالة الخطأ بنصها.`, done: R`الرسالة [[mutable default <class 'list'> for field items is not allowed: use default_factory]]، وشرحك فيه إن dataclass بيرفض وقت تعريف الـ class، و Pydantic بينسخ الـ default لكل object، وجرّبت إن [[m1.items.append(1)]] مغيّرش [[m2.items]].` },
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

بيعد تنازلي من ٢٠ مليون لصفر، مرتين، في **threadين** شغالين مع بعض، ويقيس الوقت. المتوقع لو الـ threads بتشتغل على ٢ cores: نص وقت العدّ مرتين ورا بعض. اللي بيحصل فعلًا: نفس الوقت تقريبًا. والسبب الـ GIL. الكود اتشغّل فعلًا وكل الأرقام تحت منه، على ويندوز (جهاز ١٦ logical processor، Python 3.14، ونسخة [[3.14t]] اتسطبت في فولدر مؤقت).

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
            R`موديولين في سطر: [[threading]] عشان نعمل threads، و [[time]] عشان [[perf_counter]] نقيس بيه. (في كود حقيقي كل import في سطر، بس هنا عشان المثال يبقى قصير.)`,
            R`دالة بتعدّ تنازلي من [[n]] لصفر. مفيش فيها أي انتظار ولا I/O، فهي CPU خالص، وده بالظبط النوع اللي الـ GIL بيأثر عليه.`,
            R`[[while n:]] طول ما [[n]] مش صفر (أي رقم غير الصفر [[True]]). كل لفة bytecode Python لازم يتنفّذ وهو ماسك الـ GIL.`,
            R`[[n -= 1]] نفس [[n = n - 1]]. [[n]] متغير محلي في كل thread، فمفيش مشاركة بيانات ومفيش race condition هنا: البطء كله من الـ GIL بس.`,
            R`ابدأ القياس قبل ما نعمل الـ threads. [[perf_counter]] ساعة للقياس بس، والفرق بين قراءتين هو الوقت.`,
            R`threadين، كل واحد هيشغّل [[count(20_000_000)]]. [[target]] الدالة من غير أقواس، و [[args]] tuple، والـ [[,]] في [[(20_000_000,)]] هي اللي بتخليها tuple (من غيرها رقم بين قوسين و [[Thread]] يرمي [[TypeError]]).`,
            R`[[start()]] بيبدأ الـ thread ويرجع على طول من غير ما يستنى. فالاتنين بيبدأوا تقريبًا مع بعض.`,
            R`[[join()]] بيستنى كل thread لحد ما يخلص. من غيره الـ [[print]] هيطبع وقت عمل الـ threads بس (ملّي ثواني) مش وقت الشغل.`,
            R`[[:.2f]] رقم بخانتين. اتقاس: 0.90s، وعدّ نفس الرقم مرتين ورا بعض 0.91s: مفيش أي تسريع، لأن واحد بس بيمسك الـ GIL في كل لحظة. ومع [[python3.14t]] (من غير GIL) نفس الكود 0.53s.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** جاوب بصوتك في دقيقة ومن غير ورقة: الـ GIL إيه، بيحمي إيه، وبيأثر على أنهي نوع شغل، وإيه اللي اتغير في 3.13 و 3.14. وبعدين قارن بـ «الجملة اللي تقولها» في الدرس.`, done: R`إجابتك فيها الـ ٥ نقط: قفل في CPython، و thread واحد بينفّذ bytecode، و reference counting، والـ I/O مش متأثر، و [[python3.14t]] رسمي بس مش الافتراضي.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** بدّل [[count]] بـ [[time.sleep(1)]] وشغّل ٤ threads. هياخد قد إيه؟ وبعدين بدّلها بـ [[hashlib.pbkdf2_hmac("sha256", b"x", b"s", 300_000)]] (مكتبة C) وجرّب ٤ threads مقابل ٤ ورا بعض.`, done: R`الـ sleep: حوالي ثانية مش ٤ (الـ GIL بيتساب وقت الانتظار). و pbkdf2: الـ threads أسرع بوضوح من ورا بعض (اكتب الرقمين)، لأن hashlib بيسيب الـ GIL جوه الحسبة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** ٤ threads بيعملوا [[current = balance; time.sleep(0); balance = current + 1]] ١٠ آلاف مرة. الناتج أقل من 40000. صلّحه بـ [[threading.Lock]].`, done: R`قبل: رقم أقل من 40000 ومختلف كل مرة (عندنا 10108). بعد [[with lock:]] حوالين التلات سطور: 40000 بالظبط في ٥ مرات ورا بعض.` },
            { lvl: 'تطبيق', t: R`**قارن وقيس:** شغّل الـ solCode على جهازك، وزوّد سطر رابع بـ [[ProcessPoolExecutor(4)]] و ٤ عدّات بدل اتنين.`, done: R`عندك ٤ أرقام، وكاتب ليه الـ processes مش نص الوقت بالظبط (تمن الـ spawn)، وليه ٤ processes على ٤ cores فاضية أقرب للربع.` },
            { lvl: 'تحدي', t: R`**اشرحها:** المحاور سألك «يعني ليه FastAPI سريع مع وجود الـ GIL؟». اكتب الإجابة في ٤ سطور فيها رقم من درس «async مش أسرع»، والسؤال اللي متوقع يجي بعدها وإجابته.`, done: R`الإجابة فيها إن شغل الـ API أغلبه انتظار I/O والـ GIL بيتساب وقته، ورقم (٢٠٠ طلب في ١.٢ ثانية على worker واحد)، وإن الحسابات بتروح processes، والسؤال الجاي غالبًا «طب لو فيه حسبة تقيلة؟».` },
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

مش الـ syntax. السؤال الحقيقي: «لو عندك ١٠٠ ألف عنصر وهتسأل "موجود ولا لأ"، تحطهم في إيه؟». المثال بيحط نفس الأرقام في list وفي set ويسأل نفس السؤال، وبعدين يستخدم tuple كمفتاح في dict. كل اللي تحت اتشغّل فعلًا على ويندوز (Python 3.14).

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
            R`list فيها الأرقام من 0 لـ 99999 بالترتيب. الـ [[_]] جوه [[100_000]] للقراية بس. الـ list بتحفظ الترتيب والتكرار، ومن جوه array من مؤشرات.`,
            R`نفس الأرقام في set. التحويل نفسه O(n) (اتقاس 2.69ms)، فيستاهل بس لو هتسأل «موجود؟» كتير بعده، مش لسؤال واحد.`,
            R`[[in]] على list بيقارن عنصر عنصر من الأول. 99999 آخر عنصر فدي أسوأ حالة، ١٠٠ ألف مقارنة: اتقاس 763 ميكروثانية.`,
            R`[[in]] على set بيحسب [[hash(99999)]] ويروح للخانة على طول، فالوقت ثابت تقريبًا مهما كبر العدد: اتقاس 28 نانوثانية، يعني أسرع بحوالي ٢٧ ألف مرة هنا.`,
            R`tuple قيمتين مرتبطين (خط عرض وطول). مبتتعدّلش، فالـ hash بتاعها ثابت، وده اللي بيخلّيها تنفع مفتاح. وأخف من الـ list في الذاكرة (72 مقابل 88 byte لـ ٣ عناصر).`,
            R`dict المفتاح فيه الـ tuple. لو حطيت list مكانها: [[TypeError: cannot use 'list' as a dict key (unhashable type: 'list')]]، لأن الـ list ممكن تتغير بعد ما تتحط فالـ hash يبقى غلط.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** املى الجدول من الذاكرة لـ list و tuple و set و dict: مرتب؟ بيتعدّل؟ بيقبل تكرار؟ وتمن [[x in]]؟ وبعدين قارنه بجدول الخلاصة.`, done: R`الـ ١٦ خانة صح، وتعرف تقول جملة واحدة ليه set و dict سريعين وليه مفاتيحهم لازم تبقى hashable.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** هيطبع إيه: [[print(list(dict.fromkeys("banana")))]] و [[print({1, 1.0, True})]] و [[print({(1, 2): "a"}[(1, 2)])]] و [[print(hash((1, [2])))]]؟`, done: R`[[['b', 'a', 'n']]]، و [[{1}]] (التلاتة متساويين وليهم نفس الـ hash)، و [[a]]، والأخيرة [[TypeError: unhashable type: 'list']] لأن tuple جواها list مش hashable.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[common_skus(orders_a, orders_b)]] بتاخد لستتين فيهم ٥٠ ألف SKU كل واحدة وترجّع المشتركين **بترتيب أول لستة** ومن غير تكرار. اكتبها مرة بـ [[x in orders_b]] على list ومرة بـ set، وقيس.`, done: R`الاتنين بيرجّعوا نفس النتيجة بنفس الترتيب ([[assert]])، ونسخة الـ list أبطأ بآلاف المرات (اكتب الرقمين)، ونسخة الـ set بتعمل [[set(orders_b)]] مرة واحدة برّه الـ loop.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من [[help(collections.deque)]] والـ docs، لاقي تمن [[list.pop(0)]] مقابل [[deque.popleft()]]، وقيس الاتنين على ١٠٠ ألف عنصر بـ [[timeit]].`, done: R`كاتب إن [[pop(0)]] O(n) (بيزحزح كل العناصر) و [[popleft]] O(1)، ورقمين من القياس بيأكدوا، وجملة: إمتى تستخدم deque كطابور.` },
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

نفس الحسبة (مربعات مليون رقم) مكتوبة مرتين: مرة **list** ومرة **generator**. الفرق في الكتابة قوس واحد، والفرق في السلوك كبير: الحجم في الذاكرة، وإنك تقدر تلف عليه كام مرة. اتشغّل فعلًا على ويندوز (Python 3.14).

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
            R`[[sys]] عشان [[sys.getsizeof]] اللي بترجّع حجم الـ object نفسه بالـ byte (من غير الـ objects اللي جواه).`,
            R`أقواس مربعة = list comprehension: Python بيحسب المليون مربع **دلوقتي** ويخزّنهم. اتقاس: 8448728 byte للمؤشرات بس، والأرقام نفسها objects فوقيهم.`,
            R`أقواس عادية = generator expression: object صغير فاكر «هحسب [[i * i]] على الـ range ده»، ومحسبش ولا رقم. الحساب بيحصل لما حد يطلب العنصر الجاي ([[next]] أو [[for]] أو [[sum]]).`,
            R`اتقاس: [[8448728 208]]. الـ generator 208 byte ومش هيكبر لو خليته مليار بدل مليون، لأنه مش شايل غير مكانه الحالي.`,
            R`[[sum]] بتطلب عنصر عنصر، والـ generator بيحسب كل واحد ساعتها ويسيبه بعد ما [[sum]] تجمعه، فالذاكرة ثابتة. الناتج [[333332833333500000]].`,
            R`الـ generator خلص في السطر اللي فوق ومفيش «ارجع للأول»، فـ [[sum]] التانية لقته فاضي ورجّعت [[0]] **من غير أي error**. ده أخطر حاجة فيه: الغلطة بتعدّي ساكتة.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[g = (x for x in [1, 2, 3]); print(2 in g); print(list(g))]]. اكتب السطرين قبل ما تشغّل.`, done: R`[[True]] وبعدين [[[3]]]: الـ [[in]] سحب [[1]] و [[2]] ووقف عند ما لقى، فالباقي [[3]] بس. وكاتب ليه.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[nums = [1, 2, 3]; g = (n * 10 for n in nums); nums.append(4); print(list(g))]].`, done: R`[[[10, 20, 30, 40]]]: الـ generator بيقرا [[nums]] لما يتسحب منه، مش لما اتعمل، فشاف الـ 4. (والجزء الأول بس، [[for n in nums]]، هو اللي بيتحسب فورًا: الـ iterator بتاع الـ list.)` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية الشكل:** اعمل ملف لوج مليون سطر (كل ٥٠٠ سطر فيهم [[ERROR]])، واكتب pipeline من ٣ generators: يقرا، ويفلتر ERROR، ويطلّع رقم السطر والرسالة، وفوقهم [[islice]] بأول ٥.`, done: R`الـ ٥ صح، وعدّاد السطور اللي اتقرت ٢٥٠٠ مش مليون، والذاكرة (بـ [[tracemalloc]]) أقل من ميجا وقت التشغيل.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[rows = (r for r in read_csv())]] وبعدين [[total = sum(r["amount"] for r in rows)]] و [[count = len(list(rows))]]. المتوسط بيطلع [[ZeroDivisionError]]. صلّحه من غير ما تحمّل الملف كله في الذاكرة.`, done: R`نسختك بتلف مرة واحدة وبتجمع [[total]] و [[count]] في نفس الـ loop، والمتوسط صح على ملف تجربة (قارنه بحساب بإيدك)، ومفيش [[list(...)]] على الملف كله.` },
            { lvl: 'تحدي', t: R`**ابني:** [[chunked(iterable, size)]] generator بيطلّع lists بحجم [[size]] من أي iterable (حتى generator لا نهائي)، والأخيرة ممكن تبقى أصغر. وقارنه بـ [[itertools.batched]] (3.12+).`, done: R`[[list(chunked(range(7), 3))]] بيطلّع ٣ lists: [[[0, 1, 2]]] و [[[3, 4, 5]]] و [[[6]]] (و [[batched]] نفس الحاجة بس tuples)، وبيشتغل على [[itertools.count()]] مع [[islice]] من غير ما يعلّق، و iterable فاضي بيطلّع ولا حاجة.` },
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

decorator اسمه [[timed]]: تحطه فوق أي دالة async، فكل ما تتنادى يطبع اسمها وأخدت كام ملّي ثانية، من غير ما تلمس كود الدالة نفسها. وفي الـ solCode نسخة بتشتغل مع الـ sync والـ async الاتنين. اتشغّل فعلًا على ويندوز (Python 3.14)، وجربنا عليه دالة [[fetch]] بتستنى 0.1 ثانية.

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
            R`[[functools]] عشان [[wraps]]، و [[time]] عشان [[perf_counter]]. موديولين في سطر للاختصار بس.`,
            R`[[timed]] decorator: دالة عادية بتاخد الدالة الأصلية [[fn]] وهترجّع دالة جديدة تلفها. [[@timed]] فوق دالة هو بالظبط [[fetch = timed(fetch)]].`,
            R`[[@functools.wraps(fn)]] بينسخ لـ [[wrapper]] اسم الأصلية و docstring بتاعها ويحطها في [[__wrapped__]]، فـ [[inspect.signature]] بيرجّع الـ signature الأصلية. من غيره FastAPI مش هيشوف غير [[(*args, **kwargs)]] ومش هيعرف الـ route محتاج إيه.`,
            R`[[async def]] لأن الأصلية async، فاللي بينادي هيعمل [[await]] على اللي راجع. و [[*args, **kwargs]] بيقبلوا أي شكل نداء، و [[wrapper]] بتفتكر [[fn]] من الـ scope اللي اتعملت فيه (closure).`,
            R`ابدأ الساعة **جوه** الـ wrapper، يعني مع كل نداء. لو اتكتب برّه (في [[timed]] نفسها) هيتحسب مرة واحدة وقت الـ decorator، والوقت هيكبر مع كل نداء.`,
            R`[[try]] عشان الوقت يتطبع حتى لو الأصلية رمت exception.`,
            R`[[*args]] و [[**kwargs]] هنا بيفكّوا الـ tuple والـ dict تاني لـ arguments، فالأصلية بتستلم بالظبط اللي اتبعت. و [[return await]]: من غير [[return]] كل دالة متزيّنة هترجّع [[None]].`,
            R`[[finally]] بيتنفّذ في كل الأحوال: بعد الـ [[return]]، أو لو حصل exception. والـ exception بيكمّل طريقه عادي بعده (اتجرّب: [[boom 61.6ms]] وبعدها [[ValueError: bad]] وصلت للي نادى).`,
            R`اسم الدالة من [[fn.__name__]] والوقت بالملّي ثانية بخانة. في كود حقيقي هنا [[log.info]] مش [[print]].`,
            R`[[return wrapper]] **من غير أقواس**: بيرجّع الدالة نفسها عشان تتنادى بعدين. [[return wrapper()]] كان هينفّذها مرة دلوقتي ويرجّع coroutine.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** decoratorين [[a]] و [[b]]، كل واحد بيطبع اسمه قبل ما ينادي الأصلية. فوق [[f]] كاتب [[@a]] وتحتها [[@b]]. هيطبع إيه لما تنادي [[f()]]؟ ولو كل decorator بيطبع اسمه وقت التزيين نفسه (برّه الـ wrapper)، ترتيب الطباعة وقت التعريف إيه؟`, done: R`وقت النداء: [[a]] وبعدين [[b]] وبعدين جسم [[f]] (الأبعد بيلف الكل). ووقت التعريف: [[b]] الأول وبعدين [[a]] (التطبيق من تحت لفوق). وشغّلته واتأكدت.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** decorator من غير [[wraps]] على route في FastAPI: [[@app.get("/users/{user_id}")]] فوق [[@timed]] فوق [[async def get_user(user_id: int)]]. شغّله وابعت [[/users/7]] واقرا الرد، وصلّحه.`, done: R`قبل: الرد 422 لأن FastAPI شايف [[args]] و [[kwargs]] كـ query parameters إجبارية (انسخ الـ [[loc]] اللي طلع)، وبعد [[@functools.wraps(fn)]]: 200 و [[/docs]] بيوري [[user_id]] كـ integer.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[retry(times=3, exceptions=(ConnectionError,))]]: decorator بباراميترات (٣ طبقات) بيعيد الدالة لحد [[times]] مرات لو رمت واحد من [[exceptions]] بس، وبيشتغل مع async.`, done: R`دالة بترمي [[ConnectionError]] مرتين وتنجح التالتة: بترجّع الناتج و ٣ نداءات. دالة بترمي [[ValueError]]: بتترمي من أول مرة. و [[fn.__name__]] بعد الـ decorator زي الأصلي.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** ٣ اختبارات لـ [[timed]] من الـ solCode: الناتج بيرجع زي ما هو، والـ exception بيعدّي، و [[inspect.iscoroutinefunction]] بعد التزيين زي قبله. استخدم [[capsys]] عشان تتأكد إن سطر الوقت اتطبع.`, done: R`[[3 passed]]، والاختبار التاني بيستخدم [[pytest.raises]] وبيتأكد إن سطر الوقت اتطبع **برضه** في حالة الـ exception.` },
            { lvl: 'تحدي', t: R`**اشرحها:** المحاور سأل «decorator بباراميتر زي [[@retry(3)]] بيتكتب إزاي؟ وليه ٣ طبقات؟». اكتب الإجابة في ٤ سطور ومعاها الكود، ومين بيتنادى إمتى.`, done: R`شرحك فيه إن [[retry(3)]] بيتنادى الأول ويرجّع decorator، والـ decorator بياخد الدالة ويرجّع wrapper، والـ wrapper بيتنادى مع كل نداء، والكود بيشتغل.` },
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

المثال حتة من تطبيق، فكمّلناه عشان يشتغل: lifespan بيعمل [[asyncpg]] pool على Postgres 16 في Docker، و [[current_user]] بيقرا توكن من header [[Authorization]]، وجدول [[users]] فيه [[sara@example.com]] و [[omar@example.com]]. وحطينا [[print]] في كل dependency عشان نشوف الترتيب. اتشغّل فعلًا على ويندوز (FastAPI 0.142، Python 3.14) بـ [[TestClient]].

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
            R`dependency شكلها زي الـ route: باراميتراتها بيملاها FastAPI ([[request]] هنا). ولأن فيها [[yield]] فهي generator، و FastAPI بيكمّلها بعد الـ request عشان التنضيف.`,
            R`[[pool.acquire()]] بيسلّف اتصال من الـ pool اللي اتعمل في الـ lifespan، و [[async with]] بيضمن إنه يرجع للـ pool مهما حصل، حتى لو الـ route رمى exception.`,
            R`[[yield conn]]: الـ dependency بتقف هنا و [[conn]] بيروح للـ route. لما الـ route يخلص، FastAPI بيكمّل من بعد السطر ده فالـ [[async with]] يقفل والاتصال يرجع.`,
            R`[[Annotated[النوع, Depends(get_db)]]]: النوع للـ editor والـ autocomplete، و [[Depends]] لـ FastAPI. ولأنه في متغير [[DB]]، أي route يكتب [[db: DB]] وخلاص. و [[get_db]] من غير أقواس: FastAPI هو اللي بيناديها مع كل request.`,
            R`route عادي على [[GET /me]].`,
            R`الـ signature هي القايمة: «محتاج يوزر حالي واتصال». FastAPI بيبني شجرة الـ dependencies منها مرة وقت التشغيل، وبيحلها مع كل طلب. و [[get_db]] اتنادت **مرة** مع إن [[current_user]] والـ route الاتنين طالبينها (cache جوه الطلب).`,
            R`[[fetchrow]] بترجّع صف واحد، و [[$1]] مكان أول قيمة، و asyncpg بيبعت [[user.id]] منفصل عن نص الـ SQL، فمفيش SQL injection.`,
            R`[[dependency_overrides]] dict: المفتاح الدالة الأصلية، والقيمة البديلة. أي حتة في الشجرة طالبة [[get_db]] هتاخد [[fake_db]]، والـ route نفسه متغيرش حرف. وبعد الاختبار [[app.dependency_overrides.clear()]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** route طالب [[a]] و [[b]]، و [[b]] طالبة [[a]]، و [[a]] فيها [[print("a open")]] قبل [[yield]] و [[print("a close")]] بعده، و [[b]] زيها. اكتب ترتيب الـ ٤ سطور، وكام مرة [[a open]] هتتطبع.`, done: R`[[a open]] ثم [[b open]] ثم [[b close]] ثم [[a close]]، و [[a open]] مرة واحدة (cache جوه الطلب). وشغّلتها بـ TestClient واتأكدت.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[DB = Annotated[Connection, Depends(get_db())]]] و [[get_db]] فيها [[print("close")]] **بعد** [[yield]] من غير [[try/finally]]. شغّله، واقرا الخطأ، وصلّح الاتنين، وبعدين ابعت طلب الـ route بتاعه بيرمي 404 وشوف [[close]] اتطبعت ولا لأ.`, done: R`أول خطأ وقت التعريف (انسخ نصه)، وبعد شيل القوسين بيشتغل. ومع route بيرمي [[HTTPException(404)]]: [[close]] مبتتطبعش لحد ما تحطها في [[finally]]، وبعدها بتتطبع في الحالتين.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** اختبار لـ [[/me]] من غير قاعدة: [[dependency_overrides]] لـ [[get_db]] بـ fake، ولـ [[current_user]] بيوزر ثابت، وتأكد إن الرد فيه الإيميل المزيّف، وإن الـ overrides اتمسحت بعد الاختبار (fixture بـ [[yield]]).`, done: R`الاختبار بيعدّي من غير Postgres شغال، واختبار تاني بعده في نفس الملف بيتأكد إن [[app.dependency_overrides == {}]].` },
            { lvl: 'تحدي', t: R`**اشرحها:** المحاور سأل «إيه الفرق بين dependency و middleware، وإمتى تستخدم كل واحد؟». جاوب في ٤ سطور، وهات مثال حقيقي لكل واحد من مشروعك أو مشروع متخيّل.`, done: R`إجابتك فيها الـ ٤ فروق من جدول الخلاصة (مين بيتأثر، وبترجّع قيمة، وبتظهر في الـ docs، وبتتبدّل في الاختبار)، ومثال زي «auth = dependency، و request id ووقت الطلب = middleware».` },
            { lvl: 'تحدي', t: R`**ابني:** dependency [[pagination(page: int = 1, size: int = Query(20, le=100))]] بترجّع [[(offset, limit)]]، واستخدمها في routeين، وشوف [[/docs]].`, done: R`[[?size=500]] بيرجّع 422 لوحده من غير كود فحص، و [[/docs]] بيوري [[page]] و [[size]] في الـ routeين، و [[?page=3&size=10]] بيدّي [[(20, 10)]].` },
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

موديل [[User]] فيه رقم وإيميل. بندّيله dict فيه [[id]] كنص ([["5"]])، فبيفحصه ويحوّله لرقم ويتأكد إن الإيميل سليم، وبعدين بنرجّعه dict جاهز لـ JSON. ده نفس اللي FastAPI بيعمله مع كل body جاي. اتشغّل فعلًا على ويندوز (Pydantic 2.13 و pydantic-core 2.46، FastAPI 0.142، Python 3.14). و [[EmailStr]] محتاجة [[pip install "pydantic[email]"]].

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

| v1 | v2 | بيعمل إيه |
|---|---|---|
| [[class Config:]] | [[model_config = ConfigDict(...)]] | إعدادات الموديل كـ dict عادي بدل class جوه class |
| [[orm_mode = True]] | [[from_attributes=True]] | يقرا من object بالـ attributes (صف SQLAlchemy) مش dict بس |
| [[parse_obj(d)]] | [[model_validate(d)]] | يفحص dict ويرجّع موديل أو يرمي [[ValidationError]] |
| [[.dict()]] | [[.model_dump()]] | يرجّع الموديل dict، و [[mode="json"]] بأنواع JSON |
| [[.json()]] | [[.model_dump_json()]] | نص JSON على طول، بيتعمل في Rust |
| [[@validator]] | [[@field_validator]] + [[@classmethod]] | فحص بإيدك لحقل، ولازم [[@classmethod]] تحته |

- Pydantic بيفحص **ويحوّل** وقت التشغيل من الـ type hints، و FastAPI بيستخدمه للـ body والـ query والرد والـ docs.
- v2 الـ core بتاعه Rust (pydantic-core)، و FastAPI الحالي محتاج [[pydantic>=2.9.0]] (من الـ metadata بتاع 0.142)، يعني v1 مش مدعوم.
- 422 = الطلب غلط، و 500 ([[ResponseValidationError]]) = الرد اللي انت رجعته مش مطابق للموديل.`,
          lines: [
            R`أي class بيورث من [[BaseModel]] بقى موديل: Pydantic بيقرا الـ type hints مرة وقت تعريف الـ class ويبني منها قواعد فحص في pydantic-core (Rust).`,
            R`[[model_config]] إعدادات v2 (كانت [[class Config]]): [[from_attributes=True]] يقرا من object عادي بالـ attributes زي صف SQLAlchemy (كانت [[orm_mode]])، و [[extra="forbid"]] يرفض أي حقل زيادة بدل ما يشيله ساكت.`,
            R`[[id: int]] حقل إجباري (مفيش default). في lax mode النص اللي شكله رقم ([["5"]]) بيتحوّل، و [["five"]] بيترفض بـ [[int_parsing]].`,
            R`[[EmailStr]] بيتأكد إن النص شكله إيميل (محتاج [[pip install "pydantic[email]"]]). [["not-an-email"]] بيترفض برسالة [[An email address must have an @-sign]].`,
            R`[[model_validate]] (كانت [[parse_obj]]) بيفحص الـ dict ويرجّع [[User(id=5, email='a@example.com')]]: الـ [["5"]] بقى [[5]] رقم. ولو فيه غلطة بيرمي [[ValidationError]] فيها كل الحقول الغلط مع بعض مش أول واحد بس.`,
            R`[[model_dump]] (كانت [[.dict()]]) بيرجّع dict، و [[mode="json"]] بيحوّل كل قيمة لنوع JSON يفهمه (التاريخ يبقى نص ISO). من غيرها [[datetime]] بيفضل object و [[json.dumps]] يرمي.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** موديل [[class M(BaseModel): n: int; ok: bool]]. اكتب نتيجة [[M(n="7", ok="yes")]] و [[M(n=7.5, ok=1)]] و [[M(n="7", ok="maybe")]] (موديل ولا [[ValidationError]]، وفي أنهي حقل)، وبعدين شغّلهم.`, done: R`الأول [[n=7 ok=True]]، والتاني بيرفض [[n]] ([[int_from_float]]: 7.5 مش رقم صحيح) و [[ok=1]] كان هيعدّي، والتالت بيرفض [[ok]] ([[bool_parsing]]). وكاتب الـ [[type]] اللي طلع لكل غلطة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** route [[async def me() -> UserOut]] بيرجّع dict فيه [[id]] و [[email]] و [[password_hash]]، و [[UserOut]] فيه [[id]] و [[email]] بس، و [[UserOut]] عليه [[extra="forbid"]]. شغّله واطلب الـ route، وفسّر الـ 500.`, done: R`الرد 500 و [[ResponseValidationError]] في اللوج فيها [[extra_forbidden]] على [[password_hash]]. وبعد شيل [[extra="forbid"]] من موديل الرد (خليه على موديل الـ body بس) الرد 200 من غير [[password_hash]]: الـ response model فلتره.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** ١٠٠ ألف dict بـ [[id]] و [[email]] و [[at]] (datetime): قيس [[TypeAdapter(list[User]).dump_json(users)]] مقابل [[json.dumps([u.model_dump(mode="json") for u in users])]].`, done: R`عندك رقمين بـ [[perf_counter]] (٣ مرات لكل واحد)، والاتنين بيطلّعوا نفس الداتا ([[json.loads]] على الاتنين متساويين)، وكاتب أنهي أسرع وبكام مرة على جهازك.` },
            { lvl: 'تطبيق', t: R`**ابني:** موديل [[Booking]] فيه [[start]] و [[end]] (datetime) و [[guests: int = Field(ge=1, le=10)]]، و [[model_validator(mode="after")]] بيرفض [[end <= start]]. اختبره بـ ٤ حالات.`, done: R`الحالة الصح بتعدّي، و [[guests=0]] و [[guests=11]] بيرجّعوا [[greater_than_equal]] و [[less_than_equal]]، و [[end]] قبل [[start]] بيرجّع رسالتك انت، وكل ده من غير ولا if في الـ route.` },
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
            how: R`AnyIO هو اللي بيشغّل الـ [[def]] في threads، والحد الافتراضي ٤٠ thread ([[anyio.to_thread.current_default_thread_limiter().total_tokens]] طلع [[40]])، وتقدر تكبّره في الـ lifespan لو عندك [[def]] routes كتير بتستنى. والـ dependencies نفس القاعدة: [[def]] في thread و [[async def]] على الـ loop.

ولو مضطر تنادي حاجة sync من async: [[await asyncio.to_thread(fn)]] (thread من الـ pool بتاع asyncio) أو [[run_in_threadpool]] من Starlette (نفس الـ pool بتاع FastAPI). والأحسن نسخة async من المكتبة نفسها ([[httpx.AsyncClient]] و [[asyncpg]] و [[redis.asyncio]]).

وعشان تكتشف الـ blocking: [[PYTHONASYNCIODEBUG=1]] أو [[asyncio.run(..., debug=True)]] بيحذّر من أي خطوة مسكت الـ loop أكتر من 100ms (اتجرّب: [[took 0.301 seconds]] مع [[time.sleep(0.3)]]). وفي الإنتاج [[py-spy dump]] بيوريك الـ MainThread واقف فين.`,
            when: "«إيه اللي يحصل لو حطيت time.sleep في async def؟»، و «إزاي تنادي مكتبة sync من async؟»، و «ليه FastAPI سريع؟»، و «الفرق بين concurrency و parallelism؟».",
            mistakes: "«async دايمًا أسرع». و «def في FastAPI بتقفل السيرفر». و «async بيستخدم كل الـ cores»."
          },
          teach: R`## المثال بيعمل إيه؟

٣ routes بيعملوا I/O (يستنوا حاجة برّه)، مكتوبين ٣ طرق: [[async def]] و [[await]] صح، و [[def]] عادية فيها مكتبة sync، و [[async def]] فيها مكتبة sync (الغلطة). الكود تقريبًا واحد، والفرق في الأداء ٣٠ مرة. اتشغّل فعلًا على ويندوز (FastAPI 0.142 و uvicorn 0.54، Python 3.14، worker واحد)، والقاعدة Postgres 16 في Docker.

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
            R`route على [[GET /a]]، الشكل الصح الأول.`,
            R`[[async def]]: FastAPI بيشغّلها **على الـ event loop نفسه**. و [[db: DB]] اتصال asyncpg من dependency (درس «Depends بيعمل إيه»).`,
            R`[[await db.fetchval(...)]]: ابعت الـ query وسيب الـ loop يخدم غيري لحد ما الرد يرجع. كل I/O هنا بـ [[await]]، فدي أسرع حالة: اتقاس 162 req/s على ٥٠ مع بعض، والرقم محدود بأداة القياس مش بالسيرفر.`,
            R`route على [[GET /b]]، الشكل الصح التاني.`,
            R`[[def]] عادية: FastAPI مبيشغّلهاش على الـ loop، بيبعتها لـ threadpool بتاع AnyIO (٤٠ thread)، فانتظارها بيقفل thread واحد بس.`,
            R`[[requests]] sync بتقف لحد ما الرد يوصل، وده مقبول هنا لأنها في thread. و [[timeout=5]] لازم: [[requests]] من غيره ملوش timeout خالص. اتقاس: 148 req/s، قريب من [[/a]]، بنفس الكود من غير [[async]].`,
            R`route على [[GET /c]]، الغلطة.`,
            R`[[async def]]، فـ FastAPI بيشغّلها على الـ loop ومستني منها إنها تعمل [[await]] على أي انتظار.`,
            R`[[requests.get]] مش بتعمل [[await]]: الـ thread الوحيد بتاع الـ loop واقف مستني الشبكة، ومحدش تاني بيتخدم ولا حتى routes تانية. اتقاس: 5 req/s و ١٩ طلب من ٢٠٠ فشلوا بـ [[ReadError]] و [[RemoteProtocolError]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** ٣ routes: [[async def]] فيها [[await asyncio.sleep(1)]]، و [[def]] فيها [[time.sleep(1)]]، و [[async def]] فيها [[time.sleep(1)]]. لو بعتّ ١٠ طلبات مع بعض لكل واحد على worker واحد، كل مجموعة هتخلص في قد إيه تقريبًا؟`, done: R`توقّعك: حوالي ثانية، وحوالي ثانية (١٠ أقل من ٤٠ thread)، وحوالي ١٠ ثواني. وقستها بسكربت httpx فيه [[asyncio.gather]] والأرقام قريبة.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** route [[async def]] بيستخدم SDK قديم sync اسمه [[legacy.charge(order_id)]] (اعمله دالة فيها [[time.sleep(0.5)]]). صلّحه بطريقتين: [[def]] عادية، و [[await asyncio.to_thread(...)]]، وقيس الـ ٣ نسخ بـ ٢٠ طلب مع بعض.`, done: R`النسخة البايظة حوالي ١٠ ثواني، والتصليحين حوالي نص ثانية لكل واحد، وكاتب إمتى تختار كل واحد (route كله sync، ولا نداء sync واحد وسط كود async).` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** شغّل التطبيق بـ [[PYTHONASYNCIODEBUG=1]] واطلب route فيه [[time.sleep(0.3)]] جوه [[async def]]، واقرا التحذير، ومن سطر التحذير لاقي اسم الدالة والملف.`, done: R`التحذير فيه [[Executing <Task ...> took 0.3... seconds]] واسم الدالة بتاعتك، ولما صلّحت لـ [[await asyncio.sleep]] التحذير اختفى.` },
            { lvl: 'تحدي', t: R`**اشرحها:** اكتب لزميل الفرق بين concurrency و parallelism في ٣ سطور، وهات مثال من الدرس لكل واحد (أنهي route فيه concurrency بس، وإيه اللي محتاج parallelism).`, done: R`شرحك فيه إن الـ event loop بيعمل concurrency (طلبات كتير بتستنى مع بعض على thread واحد) والـ processes بتعمل parallelism (حسابات على كذا core في نفس اللحظة)، ومثال [[/a]] للأولى و [[ProcessPoolExecutor]] للتانية.` },
            { lvl: 'تحدي', t: R`**مسألة:** route [[async def]] لازم ينادي ٣ خدمات (كل واحدة 0.3 ثانية) ويرجّع نتايجهم مع بعض. اكتبه مرة بـ ٣ [[await]] ورا بعض، ومرة بـ [[asyncio.gather]]، ومرة بـ [[asyncio.TaskGroup]]، وقيس.`, done: R`ورا بعض حوالي 0.9 ثانية، و [[gather]] و [[TaskGroup]] حوالي 0.3، ولو خدمة رمت exception: [[TaskGroup]] بيلغي الباقيين ويرمي [[ExceptionGroup]]، وكاتب الفرق ده في سطر.` },
          ],
          sol: R`النتيجة المتوقعة (جربناها بـ ٢٠٠ طلب و ٥٠ مع بعض، مع خدمة خارجية بترد في 0.2 ثانية بدل example.com): [[/a]] الأسرع (عندنا حوالي 430 req/s)، لأن الـ query بتـ await والـ loop بيخدم غيرها. [[/b]] كويسة (حوالي 160 req/s، الـ ٢٠٠ في 1.5 ثانية)، لأن [[def]] بتروح للـ threadpool (٤٠ thread افتراضيًا)، فـ ٤٠ طلب بيستنوا مع بعض. و [[/c]] كارثة: حوالي 5 req/s، والـ ٢٠٠ أخدوا ٤١ ثانية، يعني ٢٠٠ × 0.2 ورا بعض، لأن [[requests]] blocking جوه [[async def]] فبيقفل الـ loop كله.

الدرس: [[async def]] مش بتخلي الكود أسرع لوحدها، بتخليه أسرع لو كل الـ I/O جواها [[await]]. [[/b]] المكتوبة [[def]] عادية أحسن من [[/c]] بـ ٣٠ مرة، مع إن الاتنين نفس الكود. ولو [[/c]] طلعت عندك قريبة من [[/b]]، اتأكد إن الـ load tool بيبعت فعلًا ٥٠ مع بعض ([[-c 50]]).`
        },
        {
          cmd: "توقّع الناتج",
          title: "أسئلة «هيطبع إيه؟» اللي بتتسأل في انترفيوهات Python، بناتجها الحقيقي",
          learn: R`تتوقّع ناتج ٨ أكواد صغيرة فيها فخاخ مشهورة قبل ما تشغّلها، وتشرح كل واحد بجملة: late binding، و list متكررة، وخاصية الـ class، و MRO، و [[is]]، ومفاتيح متساوية، و [[and]]/[[or]]، و [[+=]] على tuple.`,
          out: R`تقرا الكود زي ما Python بيقراه، وتعرف تفسّر أي ناتج غريب من الأسباب: الأسماء بتشاور على objects، والـ defaults والـ closures بتتحسب إمتى، والـ hash.`,
          use: {
            prog: R`كل سؤال هنا bug حقيقي بيحصل في الكود: callbacks في loop كلها بتاخد آخر قيمة، و grid بيتعدّل كله مرة واحدة، و cart بيشارك منتجاته بين اليوزرز.`,
            work: R`أسئلة «هيطبع إيه؟» أسرع طريقة المحاور يعرف بيها إنت فاهم Python ولا حافظ syntax. الإجابة اللي بتكسب: الناتج، وليه، والتصليح.`,
          },
          desc: R`٨ أكواد صغيرة، كل واحد فيه فخ مشهور. اقرا كل واحد واكتب الناتج قبل ما تشغّل، وبعدين قارن بالناتج الحقيقي تحت (اتشغّل على Python 3.14.3 و 3.13.18 وطلع نفس الحاجة بالحرف).

وكل فخ ليه سبب واحد من ٣: **الاسم بيشاور على object** (مش نسخة)، أو **الحاجة دي بتتحسب إمتى** (وقت التعريف ولا وقت النداء)، أو **الـ hash والمساواة**. ولو عرفت السبب، الإجابة بتطلع لوحدها.`,
          example: R`# ١) الـ lambda بتفتكر إيه؟
fs = [lambda: i for i in range(3)]
print([f() for f in fs])
# ٢) list جواها نفس الـ list ٣ مرات
row = [0] * 3
grid = [row] * 3
grid[0][0] = 9
print(grid)
# ٣) خاصية على الـ class نفسه
class Cart:
    items = []
a, b = Cart(), Cart()
a.items.append("tea")
print(b.items)
# ٤) الـ MRO و super
class A:
    def hi(self): return "A"
class B(A):
    def hi(self): return "B" + super().hi()
class C(A):
    def hi(self): return "C" + super().hi()
class D(B, C):
    def hi(self): return "D" + super().hi()
print(D().hi())
# ٥) is و ==
print(int("257") is int("257"), int("257") == int("257"))
# ٦) مفاتيح متساوية
print({True: "a", 1: "b", 1.0: "c"})
# ٧) and و or بيرجّعوا إيه
print(0 or "default", [] or None, 3 and 5)
# ٨) += على list جوه tuple
t = ([1],)
try:
    t[0] += [2]
except TypeError:
    print(t)`,
          try: R`غطّي الناتج، واكتب الـ ٨ سطور على ورقة، وبعدين شغّل الملف. وكل واحد غلطت فيه، صلّحه عشان يطبع اللي كنت متوقعه (مثلًا [[[0, 1, 2]]] في الأول).`,
          flag: "script",
          deep: {
            why: R`الأسئلة دي بتختبر الـ model اللي في دماغك عن Python: لو فاكر إن [[=]] بينسخ، أو إن الـ lambda بتاخد القيمة وقت ما اتعملت، هتغلط فيهم وهتكتب نفس الـ bugs في الشغل. والمحاور مش عايز الناتج بس، عايز السبب.`,
            how: R`**late binding:** الـ lambda بتشاور على **الاسم** [[i]] في الـ scope، مش على قيمته وقت ما اتعملت، فلما تتنادى بتقرا [[i]] الحالي (2). التصليح [[lambda i=i: i]]: الـ default بيتحسب وقت التعريف (نفس فكرة درس «الـ default بيتحسب مرة» بس هنا في صالحنا).

**[[[x] * 3]]:** الـ [[*]] على list بيكرر **المؤشرات**، مش بينسخ الـ objects. فالـ ٣ صفوف هما نفس الـ list. التصليح comprehension: [[[ [0] * 3 for _ in range(3) ]]].

**خاصية الـ class:** [[items = []]] جوه جسم الـ class بتتعمل مرة وقت تعريف الـ class، وكل الـ objects بيلاقوها هناك لأن مفيش [[items]] على الـ object نفسه. التصليح: [[self.items = []]] في [[__init__]].

**MRO:** Python بيرتّب الآباء بـ C3 linearization: [[D, B, C, A, object]]. و [[super()]] معناها «اللي بعدي في الـ MRO بتاع الـ object»، مش «الأب بتاعي»، فـ [[B]] بتنادي [[C]] مش [[A]]. (الوراثة و super في وحدة Classes.)

**[[is]]:** CPython عامل cache للأرقام من -5 لـ 256، فـ [[int("256") is int("256")]] بيطلع [[True]] و 257 لأ. ده تفصيلة تنفيذ مش قاعدة لغة، و [[is]] للهوية بس ([[None]] والـ sentinels).

**المفاتيح:** [[True == 1 == 1.0]] وليهم نفس الـ hash، فالـ dict شايفهم مفتاح واحد: بيحتفظ بأول مفتاح ([[True]]) وآخر قيمة ([['c']]).

**[[and]]/[[or]]:** بيرجّعوا واحد من الطرفين مش [[True]]/[[False]]: [[or]] أول قيمة truthy أو الأخيرة، و [[and]] أول قيمة falsy أو الأخيرة.

**[[t[0] += [2]]]:** بيتنفّذ خطوتين: [[t[0].__iadd__([2])]] (بيعدّل الـ list مكانها وينجح)، وبعدين [[t[0] = ...]] (بيفشل لأن الـ tuple مبيتعدّلش). فالـ error بيطلع **والتعديل حصل**.`,
            when: R`أول ١٠ دقايق في انترفيوهات Python كتير، و code review لما تشوف lambda في loop أو [[* n]] على list فيها lists، ولما تكتب class فيه list.`,
            mistakes: R`تقول «[[[0, 1, 2]]]» في الأول. وتعمل grid بـ [[[row] * 3]]. وتحط [[items = []]] في جسم الـ class وتفتكرها لكل object. وتقول «[[super]] بتنادي الأب». وتستخدم [[is]] مع أرقام أو نصوص (Python 3.8+ بيطبع [[SyntaxWarning: "is" with 'int' literal]] لو الرقم مكتوب حرفيًا).`
          },
          teach: R`## إزاي تستخدم الدرس ده؟

غطّي الناتج، واقرا كل حتة، واكتب توقّعك، وبعدين اقرا الشرح. كل الناتج تحت اتشغّل فعلًا على ويندوز (Python 3.14.3) وفي [[python:3.13-slim]] (3.13.18)، والاتنين طلّعوا نفس الحروف بالظبط.

~~~text الناتج كله
[2, 2, 2]
[[9, 0, 0], [9, 0, 0], [9, 0, 0]]
['tea']
DBCA
False True
{True: 'c'}
default None 5
([1, 2],)
~~~

---

## ١. late binding: [[[2, 2, 2]]]

~~~python
fs = [lambda: i for i in range(3)]
print([f() for f in fs])
~~~

٣ lambdas، وكل واحدة جسمها [[i]]. الـ lambda مش بتاخد نسخة من [[i]] وقت ما اتعملت، بتشاور على **الاسم** [[i]]، وبتقراه لما تتنادى. ولما ناديناهم، الـ loop كانت خلصت و [[i]] = 2.

~~~python
fs = [lambda i=i: i for i in range(3)]
~~~

~~~text الناتج
[0, 1, 2]
~~~

[[i=i]]: باراميتر ليه default، والـ default بيتحسب **وقت عمل الـ lambda**، فكل واحدة خدت قيمتها. (أو [[functools.partial]].) ونفس الفخ بيحصل مع callbacks في loop: [[button.on_click(lambda: open(i))]].

---

## ٢. [[[x] * 3]]: نفس الـ list ٣ مرات

~~~python
row = [0] * 3
grid = [row] * 3
grid[0][0] = 9
~~~

[[row]] list واحدة [[[0, 0, 0]]]. و [[[row] * 3]] عملت list فيها **٣ مؤشرات لنفس الـ list**. (ونفس الحاجة بالظبط لو كتبتها في سطر واحد بـ [[* 3]] على list جواها [[[0] * 3]].) فتعديل خانة في صف بيبان في الـ ٣. اتأكد بـ [[grid[0] is grid[1]]] = [[True]].

التصليح: [[[ [0] * 3 for _ in range(3) ]]]: الـ comprehension بينفّذ [[[0] * 3]] ٣ مرات، فـ ٣ lists مختلفة. (و [[[0] * 3]] نفسها آمنة: [[0]] immutable، فمحدش يعدّله مكانه.)

---

## ٣. خاصية الـ class: [[['tea']]]

~~~python
class Cart:
    items = []
a, b = Cart(), Cart()
a.items.append("tea")
~~~

[[items = []]] جوه جسم الـ class (مش في [[__init__]]) = خاصية على الـ **class** نفسه، اتعملت مرة. [[a.items]] بيدوّر على [[items]] في الـ object، ملقاش، فبيلاقيها في الـ class. و [[b.items]] نفس الحاجة. فالاتنين بيعدّلوا نفس الـ list: عربية يوزر فيها منتجات يوزر تاني.

والفرق المهم: [[a.items = ["x"]]] (assignment) كانت هتعمل خاصية جديدة على [[a]] بس. لكن [[append]] بيعدّل الـ list الموجودة.

التصليح: [[def __init__(self): self.items = []]]. أو [[@dataclass]] مع [[field(default_factory=list)]].

---

## ٤. MRO و [[super]]: [[DBCA]]

~~~python
class D(B, C):
    def hi(self): return "D" + super().hi()
~~~

~~~text الناتج: [k.__name__ for k in D.__mro__]
['D', 'B', 'C', 'A', 'object']
~~~

الـ **MRO** (Method Resolution Order) الترتيب اللي Python بيدوّر بيه على الدوال، وبيتحسب بخوارزمية C3: الابن قبل الأب، والآباء بترتيب ما اتكتبوا، وكل class مرة واحدة. و [[super()]] معناها «الـ class اللي بعدي **في الـ MRO ده**»، مش «الأب بتاعي». فـ [[B.hi]] لما اتنادت من [[D]] نادت [[C.hi]] مش [[A.hi]]، رغم إن [[B]] مورّثة من [[A]] بس. وده اللي بيخلّي [[A.hi]] تتنادى **مرة واحدة** في شكل الـ diamond.

---

## ٥. [[is]] و [[==]]: [[False True]]

~~~python
print(int("257") is int("257"), int("257") == int("257"))
~~~

[[==]] بيقارن القيمة، و [[is]] بيسأل «نفس الـ object؟». [[int("257")]] مرتين = object جديد كل مرة، فـ [[is]] بـ [[False]]. لكن جربنا [[x = 256; y = int("256")]] و [[x is y]] طلعت [[True]]: CPython عامل cache جاهز للأرقام من -5 لـ 256. ده تفصيلة في CPython مش في اللغة، فـ [[is]] مع الأرقام والنصوص غلط دايمًا، وهي للـ [[None]] بس (درس «names و objects»).

(استخدمنا [[int("257")]] مش [[257]] مكتوب، لأن Python ممكن يعيد استخدام نفس الثابت المكتوب مرتين في نفس السطر، والنتيجة ساعتها بتختلف حسب الكود.)

---

## ٦. مفاتيح متساوية: [[{True: 'c'}]]

~~~python
print({True: "a", 1: "b", 1.0: "c"})
~~~

[[True == 1 == 1.0]] و [[hash(True) == hash(1) == hash(1.0)]]، فالـ dict شايفهم **مفتاح واحد**. ولما مفتاح موجود بيتكتب تاني، الـ dict بيغيّر **القيمة** بس ويسيب **المفتاح الأول** زي ما هو: [[True]] من أول إضافة، و [['c']] من آخر واحدة.

---

## ٧. [[and]] و [[or]]: [[default None 5]]

~~~python
print(0 or "default", [] or None, 3 and 5)
~~~

- [[or]] بيرجّع أول قيمة truthy، ولو مفيش بيرجّع **الأخيرة**: [[0 or "default"]] = [["default"]]، و [[[] or None]] = [[None]] (الاتنين falsy، فالأخيرة).
- [[and]] بيرجّع أول قيمة falsy، ولو مفيش بيرجّع **الأخيرة**: [[3 and 5]] = [[5]].

ده اللي بيخلّي [[name = user_input or "guest"]] تشتغل. بس خد بالك: [[count = given or 10]] لو [[given]] = 0 هتبقى 10، والأصح [[10 if given is None else given]].

---

## ٨. [[+=]] على list جوه tuple: error **والتعديل حصل**

~~~python
t = ([1],)
try:
    t[0] += [2]
except TypeError:
    print(t)
~~~

~~~text الناتج: رسالة الخطأ لو طبعناها
'tuple' object does not support item assignment
~~~

[[t[0] += [2]]] بيتنفّذ خطوتين: الأولى [[t[0].__iadd__([2])]] (الـ list بتضيف [[2]] مكانها، ونجحت)، والتانية [[t[0] = النتيجة]] (الـ tuple مبيقبلش assignment، فشلت). فالـ error طلع **بعد** ما الـ list اتعدّلت، وطبعنا [[([1, 2],)]]. ده من أشهر أسئلة «Python غريب».

---

## زيادة: ٤ أسئلة بتيجي بعدهم

### [[return]] جوه [[finally]]

~~~python
def f():
    try:
        return "try"
    finally:
        return "finally"
~~~

~~~text الناتج (Python 3.14)
SyntaxWarning: 'return' in a 'finally' block
finally
~~~

الـ [[finally]] بيتنفّذ بعد الـ [[return]] الأولى، والـ [[return]] بتاعته بتكسب (وبتبلع أي exception كمان). و **3.14 بقى بيطبع [[SyntaxWarning]]** على ده (PEP 765)، و 3.13 مبيطبعش حاجة.

### [[__slots__]]

~~~text الناتج
'P' object has no attribute 'z' and no __dict__ for setting new attributes
P 8.4 MiB for 100k
Q 12.2 MiB for 100k
~~~

[[__slots__ = ("x", "y")]] بيقول «الـ object ده ليه الخاصيتين دول بس»، فمفيش [[__dict__]] لكل object: [[p.z = 3]] بيرمي [[AttributeError]] (الرسالة دي من 3.13 و 3.14)، والذاكرة أقل (قسناها بـ [[tracemalloc]] على ١٠٠ ألف object: ٨.٤ مقابل ١٢.٢ ميجا، والرقمين فيهم الـ list نفسها). و [[@dataclass(slots=True)]] بيعملها لوحده.

### [[copy]] و [[deepcopy]]

~~~text الناتج
{'tags': ['a', 'b']} {'tags': ['a']}
~~~

[[copy.copy(orig)]] نسخة **سطحية**: dict جديد بس الـ list اللي جواه هي هي، فلما [[orig["tags"].append("b")]] النسخة شافته. و [[copy.deepcopy]] بينسخ كل حاجة لتحت، فمتأثرش.

### asyncio مقابل [[time.sleep]]

~~~python
async def w(name, d):
    print("start", name); await asyncio.sleep(d); print("end", name)
await asyncio.gather(w("a", 0.2), w("b", 0.1))
~~~

~~~text الناتج
start a
start b
end b
end a
~~~

ولما [[await asyncio.sleep(d)]] بقت [[time.sleep(d)]]:

~~~text الناتج
start a
end a
start b
end b
~~~

مع [[await]]، [[a]] بتقف وتسيب الـ loop لـ [[b]]، و [[b]] بتخلص الأول لأنها أقصر. مع [[time.sleep]] مفيش [[await]]، فـ [[a]] ماسكة الـ loop لحد ما تخلص: نفس كارثة [[/c]] في درس «async مش أسرع».

---

## الخلاصة

| الفخ | السبب | التصليح |
|---|---|---|
| lambda في loop | بتقرا الاسم وقت النداء | [[lambda i=i: i]] |
| [[[x] * n]] و x list | تكرار مؤشرات لنفس الـ object | comprehension |
| list في جسم الـ class | خاصية واحدة على الـ class | [[self.items = []]] في [[__init__]] |
| [[super()]] في diamond | بتمشي على الـ MRO مش على الأب | اطبع [[__mro__]] |
| [[is]] مع أرقام | cache من -5 لـ 256 في CPython بس | [[==]]، و [[is]] لـ [[None]] |
| [[True]] و [[1]] و [[1.0]] | متساويين ونفس الـ hash | متخلطش أنواع في المفاتيح |
| [[or]] مع 0 | بيرجّع أول truthy | [[is None]] |
| [[+=]] جوه tuple | [[__iadd__]] نجح، والـ assignment فشل | متحطش mutable جوه tuple لو هتعدّله |`,
          lines: [
            R`list comprehension بيعمل ٣ lambdas، كل واحدة جسمها [[i]]. الـ lambda بتحفظ **الاسم** [[i]] (closure على الـ scope بتاع الـ comprehension)، مش القيمة وقت ما اتعملت.`,
            R`بننادي الـ ٣ بعد ما الـ loop خلصت، و [[i]] وقتها 2، فالناتج [[[2, 2, 2]]] مش [[[0, 1, 2]]].`,
            R`[[[0] * 3]] بيعمل list واحدة [[[0, 0, 0]]]. الـ [[*]] على list بيكرر العناصر، و [[0]] رقم immutable فده آمن.`,
            R`[[[row] * 3]] بيعمل list فيها ٣ مؤشرات **لنفس** الـ [[row]]، مش ٣ نسخ. ده نفس اللي بيحصل لو كتبت السطرين في سطر واحد.`,
            R`بنعدّل أول خانة في أول صف. بما إن الـ ٣ صفوف object واحد ([[grid[0] is grid[1]]] = [[True]])، التعديل بيبان في الـ ٣.`,
            R`الناتج: الـ ٣ صفوف أولهم 9. التصليح comprehension بيعمل [[[0] * 3]] جديدة لكل صف.`,
            R`class فيه خاصية **على الـ class نفسه**، مش على كل object.`,
            R`[[items = []]] في جسم الـ class بتتنفّذ مرة واحدة وقت تعريف الـ class، فكل الـ objects بيشوفوا نفس الـ list لأن مفيش [[items]] خاص بيهم.`,
            R`عربيتين لـ ٢ يوزرز. [[a, b = ...]] بيفك الـ tuple على اسمين، وكل [[Cart()]] object جديد بس من غير [[items]] بتاعه.`,
            R`[[a.items]] ملقاش [[items]] على [[a]] فراح للـ class، و [[append]] بيعدّل الـ list دي مكانها. لو كان [[a.items = ["tea"]]] كان هيعمل خاصية على [[a]] بس.`,
            R`[[b.items]] بيلاقي نفس الـ list في الـ class، فبيطبع [[['tea']]]: منتج يوزر ظهر في عربية يوزر تاني.`,
            R`[[A]] الجد، فيه [[hi]] بترجّع [[A]].`,
            R`دالة في سطر واحد بعد [[:]] (مسموح بس مش مستحب في كود حقيقي). بترجّع نص.`,
            R`[[B]] مورّثة من [[A]] بس، فلو مفيش وراثة متعددة [[super()]] جواها كانت هتوصل لـ [[A]] على طول.`,
            R`[[super().hi()]] مش معناها «[[A.hi]]»: معناها «الـ hi اللي بعد [[B]] في الـ MRO بتاع الـ object اللي بينادي». مع [[D]]، اللي بعد [[B]] هو [[C]].`,
            R`[[C]] كمان مورّثة من [[A]]، فده شكل الـ diamond: [[D]] فوق [[B]] و [[C]]، والاتنين فوق [[A]].`,
            R`[[C]] بتضيف حرفها وتنادي اللي بعدها في الـ MRO، وهو [[A]].`,
            R`[[D]] مورّثة من [[B]] و [[C]] بالترتيب ده. الـ MRO: [[D, B, C, A, object]] (C3 linearization: الابن الأول، والآباء بترتيب ما اتكتبوا، و [[A]] بعد ولادها الاتنين).`,
            R`[[D]] بتبدأ السلسلة: [[D]] ثم [[super]] = [[B]].`,
            R`الناتج [[DBCA]]: كل class اتنادت مرة بترتيب الـ MRO، و [[A]] مرة واحدة بس رغم إن [[B]] و [[C]] الاتنين بيورثوها.`,
            R`[[int("257")]] مرتين = ٢ objects مختلفين، فـ [[is]] بـ [[False]] و [[==]] بـ [[True]]. ولو 256 كانت [[True]] (cache من -5 لـ 256 في CPython). [[is]] للهوية مش للقيمة.`,
            R`[[True == 1 == 1.0]] وليهم نفس الـ hash، فالـ dict شايفهم مفتاح واحد: المفتاح الأول ([[True]]) والقيمة الأخيرة ([['c']]) فالناتج [[{True: 'c'}]].`,
            R`[[or]] بيرجّع أول truthy أو الأخيرة، و [[and]] أول falsy أو الأخيرة: [["default"]] ثم [[None]] (الاتنين falsy فالأخيرة) ثم [[5]]. و [[print]] بيطبع [[None]] كنص.`,
            R`tuple فيها عنصر واحد list. الـ [[,]] هي اللي بتخليها tuple، من غيرها [[([1])]] = list بس.`,
            R`[[try]] لأننا عارفين إن السطر الجاي هيرمي.`,
            R`[[+=]] على list = [[__iadd__]]: بيضيف [[2]] للـ list مكانها (نجح)، وبعدين Python بيعمل [[t[0] = ...]] والـ tuple بيرفض فيرمي [[TypeError]]. التعديل حصل قبل الخطأ.`,
            R`بنمسك [[TypeError]] بس، ورسالته [['tuple' object does not support item assignment]]، عشان نكمّل ونطبع الـ tuple بعد الخطأ.`,
            R`بيطبع [[([1, 2],)]]: الـ list جوه الـ tuple اتعدّلت فعلًا رغم الـ error. يعني الـ tuple نفسها immutable، بس الـ objects اللي جواها لأ.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[x = [1, 2]; y = x; y += [3]; print(x)]] وبعدين نفس الحاجة بـ [[y = y + [3]]]. اكتب الناتجين قبل ما تشغّل.`, done: R`الأول [[[1, 2, 3]]] ([[+=]] بيعدّل نفس الـ list)، والتاني [[[1, 2]]] ([[+]] بيعمل list جديدة و [[y]] بقى يشاور عليها). وكاتب الفرق بين [[__iadd__]] و [[__add__]] في سطر.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[class A: x = 1]] و [[a = A(); b = A(); a.x = 5; A.x = 10; print(a.x, b.x)]].`, done: R`[[5 10]]: [[a.x = 5]] عمل خاصية على [[a]] نفسه فبقت بتغطي على الـ class، و [[b]] لسه بيقرا من الـ class اللي اتغيّر لـ 10.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[handlers = {}]] و loop على [[["save", "load", "quit"]]] بيعمل [[handlers[name] = lambda: print("run", name)]]. لما تنادي [[handlers["save"]()]] بيطبع [[run quit]]. صلّحه بطريقتين.`, done: R`الطريقتين ([[lambda name=name:]] و [[functools.partial(print, "run", name)]]) بيطبعوا [[run save]] و [[run load]] و [[run quit]] كل واحد في مكانه.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[quiz.py]] فيه ٥ أسئلة من الدرس ككود نصي، بيشغّل كل واحد بـ [[exec]] مع [[contextlib.redirect_stdout]] عشان يمسك الناتج، ويسألك توقّعك بـ [[input]] ويقارن.`, done: R`السكربت بيطبع السؤال، وياخد إجابتك، ويقولك صح أو غلط ومعاه الناتج الحقيقي، وفي الآخر النتيجة من ٥. والناتج الحقيقي جاي من التشغيل مش مكتوب بإيدك.` },
            { lvl: 'تحدي', t: R`**اشرحها:** اختار ٣ أسئلة من الدرس، ولكل واحد اكتب الإجابة اللي هتقولها في الانترفيو في جملتين (الناتج والسبب)، والتصليح في سطر كود، وسؤال المتابعة اللي متوقع المحاور يسأله.`, done: R`٣ إجابات، كل واحدة فيها الناتج الصح والسبب من الأسباب التلاتة (الاسم بيشاور على object، وإمتى بيتحسب، والـ hash)، وكود تصليح بيشتغل.` },
          ],
          sol: R`الناتج الحقيقي (Python 3.14.3 و 3.13.18 نفس الحروف):

[[[2, 2, 2]]]، وبعده الـ grid والـ ٣ صفوف أولهم 9، و [[['tea']]]، و [[DBCA]]، و [[False True]]، و [[{True: 'c'}]]، و [[default None 5]]، و [[([1, 2],)]].

التصليحات: [[fs = [lambda i=i: i for i in range(3)]]] بيطبع [[[0, 1, 2]]]، و [[grid = [ [0] * 3 for _ in range(3) ] ]] بيعدّل صف واحد، و [[self.items = []]] في [[__init__]] بيخلّي [[b.items]] فاضية. والـ MRO مش غلطة: لو عايز [[DBA]] لازم [[B]] تنادي [[A.hi(self)]] صراحة، وده بيكسر الـ diamond (هتتنادى [[A]] مرتين لو [[C]] عملت نفس الحاجة).`
        }
      ]
    }
]);

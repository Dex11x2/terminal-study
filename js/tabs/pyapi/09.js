// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "collections و itertools و functools",
      l: 1,
      time: R`حوالي ٦ ساعات (٣ دروس)`,
      goal: [
        R`تختار الـ container الصح بدل dict و list لكل حاجة: [[Counter]] و [[defaultdict]] و [[deque]] و [[namedtuple]] و [[heapq]] و [[bisect]] و [[OrderedDict]] و [[ChainMap]]، بأرقام سرعة متقاسة.`,
        R`تكتب معالجة داتا كسولة بـ [[itertools]] (دفعات، أزواج، تراكم، تجميع، توافيق) بذاكرة ثابتة، وتعرف فخ الـ iterator اللي بيتقري مرة واحدة.`,
        R`تستخدم [[functools]]: cache بحدود وبمدة، و [[partial]]، و [[wraps]] في كل decorator، و [[singledispatch]] بدل سلسلة [[isinstance]]، وتعرف إمتى الـ cache بيعمل memory leak.`,
      ],
      use: {
        prog: R`نص كود معالجة الداتا اللي هتكتبه (تقارير، لوجات، تجميع) بيبقى سطرين بالأدوات دي بدل عشرين سطر [[if]] و [[for]]، وبيبقى أسرع وأخف.`,
        work: R`rate limiter بـ [[deque]]، وطابور مهام بـ [[heapq]]، وإعدادات بأولوية بـ [[ChainMap]]، و cache لنداء API بطيء، و import ملايين صفوف دفعات. دي حاجات بتتكتب في أي backend.`,
        cs: R`heap (O(log n)) و binary search و hash tables و LRU eviction و lazy evaluation: هياكل البيانات والخوارزميات الأساسية، مكتوبة في المكتبة القياسية بـ C وجاهزة.`,
      },
      projects: [
        { lvl: 'صغير', t: R`أكتر الكلمات في نص`, what: R`[[topwords.py file.txt -n 10]] بيقرا ملف عربي أو إنجليزي، ويشيل علامات الترقيم بـ regex، ويطبع أكتر N كلمات بـ [[Counter]]، ويتجاهل كلمات من [[stopwords.txt]]. من درس collections ووحدة الملفات.`, done: R`على مقال حقيقي بيطبع ١٠ كلمات مترتبة بعددها، والكلمات في stopwords مش ظاهرة، و [["Tea"]] و [["tea"]] كلمة واحدة، والعربي بيتعدّ صح.` },
        { lvl: 'صغير', t: R`آخر الأخطاء في لوج`, what: R`[[tailerr.py app.log -n 20]] بيلف على اللوج سطر سطر ويحتفظ بآخر N سطر فيه [[ERROR]] بـ [[deque(maxlen=N)]]، ويطبعهم مع عدد كل نوع خطأ بـ [[Counter]]. من درس collections.`, done: R`على لوج ١٠٠ ألف سطر الذاكرة ثابتة، وبيطبع آخر ٢٠ خطأ بالظبط بالترتيب، والعدّ لكل نوع صح، والملف الفاضي بيطبع «مفيش أخطاء».` },
        { lvl: 'متوسط', t: R`طابور مهام بأولويات ومواعيد`, what: R`[[class Scheduler]] بـ [[heapq]]: [[add(task, priority, run_at)]] و [[due(now)]] بترجّع المهام اللي ميعادها جه بالأولوية، والمتساوي بالترتيب، و [[cancel(task_id)]]. من دروس collections و itertools.`, done: R`١٠ مهام بمواعيد وأولويات مختلفة بتطلع بالترتيب الصح، والمتساويين بترتيب الإضافة، والملغية مبتطلعش، و ٨ اختبارات pytest بتعدّي، ومفيش [[TypeError]] لو المهمة dict.` },
        { lvl: 'متوسط', t: R`تقرير مبيعات من CSV كبير`, what: R`[[report.py sales.csv]] بيقرا سطر سطر، ويجمّع بـ [[defaultdict]] لكل مدينة ومنتج، ويطلّع أكبر ١٠ أيام بـ [[nlargest]]، والتغيّر اليومي بـ [[pairwise]]، ويكتب ملخص JSON. من الوحدة دي ووحدة الملفات.`, done: R`على ملف مليون صف بيخلص في أقل من ١٠ ثواني والذاكرة أقل من ٥٠ ميجا (قستهم)، والأرقام بتطابق حساب بإيدك على ملف ٢٠ صف، والسطور البايظة بتتعدّ ومبتوقّفش التقرير.` },
        { lvl: 'كبير', t: R`طبقة cache لأي API بطيء`, what: R`موديول [[smartcache]] فيه decorator [[@cached(ttl=60, maxsize=1000)]] بـ [[OrderedDict]] (LRU) ومدة صلاحية بـ [[time.monotonic]]، و [[wraps]]، وإحصائيات hits/misses، و [[invalidate(*args)]]، ومفتاح بيقبل dict و list (بيحوّلهم hashable)، وبيحفظ الحالة على الديسك بـ [[write_atomic]] لو طلبت ([[persist="cache.json"]]) ويقراها لما البرنامج يقوم. ومعاه CLI صغير بيعرض الإحصائيات. من الوحدة دي ووحدات الملفات والـ classes.`, done: R`١٥ اختبار pytest بيعدّوا (منهم: انتهاء المدة بـ [[monkeypatch]] على الوقت، والـ LRU بيشيل الأقدم استخدامًا، و [[invalidate]] بتمسح مفتاح واحد، والدالة اسمها لسه صح)، وعلى ١٠٠ ألف نداء بنمط حقيقي الـ hit rate متطبعة، وملف الحالة البايظ بيتجاهل بتحذير ويكمّل، و [[mypy --strict]] نضيف.`, ext: R`لما توصل لـ async خلّيه يدعم [[async def]] (ومنع إن ١٠ نداءات لنفس المفتاح في نفس الوقت يعملوا ١٠ طلبات)، ولما توصل لـ Redis بدّل التخزين بـ Redis من غير ما الـ API بتاع الـ decorator يتغيّر.` },
        { lvl: 'فكرة', t: R`حل مسائل بالأدوات دي`, what: R`اختار ١٠ مسائل من موقع مسائل (أو من بنك التمارين) وحل كل واحدة مرتين: مرة بـ loops بإيدك، ومرة بأدوات الوحدة دي ([[Counter]] و [[heapq]] و [[bisect]] و [[itertools]] و [[cache]]). قارن الطول والسرعة.`, done: R`١٠ مسائل محلولة بالطريقتين ونفس الناتج، وجدول فيه عدد السطور والوقت لكل واحدة، و ٣ مسائل على الأقل الأداة الجاهزة كانت أسرع بأكتر من ٥ مرات (بالقياس).`, ext: R`اعمل منهم «كراسة وصفات» بتاعتك: كل مشكلة شكلها إيه، والأداة اللي بتحلها، وسطرين مثال.` },
      ],
      n: "أدوات جاهزة في المكتبة الأساسية بتوفّر عليك loops و dicts بتكتبها بإيدك",
      items: [
        {
          cmd: "collections",
          title: "Counter و defaultdict و deque و namedtuple",
          desc: R`[[collections]] فيها أنواع جاهزة لمشاكل بتتكرر: [[Counter]] للعد (dict قيمه أعداد، و [[most_common]])، و [[defaultdict]] للتجميع (المفتاح الجديد بياخد قيمة افتراضية لوحده)، و [[deque]] طابور سريع من الناحيتين وممكن يبقى بحد أقصى ([[maxlen]])، و [[namedtuple]] tuple بأسماء.

درس «dict» فرّج على Counter و defaultdict بسرعة؛ هنا بالتفصيل ومعاهم deque اللي هو أساس أي طابور أو «آخر N حاجة».`,
          example: R`from collections import Counter, defaultdict, deque, namedtuple
words = "tea coffee tea juice tea coffee".split()
c = Counter(words)
print(c.most_common(2))                        # [('tea', 3), ('coffee', 2)]
print(c["water"])                              # 0: مفيش KeyError
c.update(["water", "tea"])
print(c + Counter(juice=4), c.total())
orders = [("Cairo", "sara"), ("Alex", "omar"), ("Cairo", "ali")]
by_city = defaultdict(list)
for city, user in orders:
    by_city[city].append(user)
print(dict(by_city))                           # {'Cairo': ['sara', 'ali'], 'Alex': ['omar']}
tree = defaultdict(lambda: defaultdict(int))
tree["Cairo"]["tea"] += 2
recent = deque(maxlen=3)
for page in ["/", "/a", "/b", "/c"]:
    recent.append(page)
print(recent)                                  # deque(['/a', '/b', '/c'], maxlen=3)
queue = deque(["job1", "job2"])
queue.appendleft("urgent")
print(queue.popleft(), queue.pop())            # urgent job2
Point = namedtuple("Point", ["lat", "lng"])
p = Point(30.04, 31.23)
print(p.lat, p)`,
          try: R`(١) من list عناوين IP، طلّع أكتر اتنين بيبعتوا طلبات بسطر واحد. (٢) اكتب rate limiter بسيط: [[allow(ip, now)]] بترجع True لو الـ IP ده بعت أقل من ٣ طلبات في آخر ١٠ ثواني، بـ [[defaultdict(deque)]]. جرّبها على IP واحد في الأوقات [[0, 1, 2, 3, 9.9, 10.5, 11]].`,
          sol: R`(١) [[Counter(ips).most_common(2)]] بترجع [[[('1.1.1.1', 3), ('2.2.2.2', 2)]]].

(٢) المتوقع [[[True, True, True, False, False, True, True]]]: أول ٣ مسموحين، و 3 و 9.9 مرفوضين (لسه فيه ٣ في آخر ١٠ ثواني)، وعند 10.5 الطلب اللي كان عند 0 خرج من الشباك فيتسمح، وعند 11 اللي عند 1 خرج. و IP تاني ليه deque لوحده فأول طلب ليه True.

الـ [[deque]] هنا بيدّيك [[popleft()]] بـ O(1)؛ لو استخدمت list و [[pop(0)]] كل شيل بيزق العناصر كلها. ولاحظ إن الطلب المرفوض مبيتسجّلش، وإلا الـ IP اللي بيضرب باستمرار هيفضل مقفول للأبد. والنسخة دي في الذاكرة، فمع كذا worker كل واحد شايف عدّ مختلف؛ النسخة الحقيقية في Redis (درس «redis rate limit» في المستوى ٣).`,
          solCode: R`from collections import Counter, defaultdict, deque
ips = ["1.1.1.1", "2.2.2.2", "1.1.1.1", "3.3.3.3", "1.1.1.1", "2.2.2.2"]
print(Counter(ips).most_common(2))
LIMIT, WINDOW = 3, 10.0
hits: defaultdict[str, deque[float]] = defaultdict(deque)
def allow(ip: str, now: float) -> bool:
    q = hits[ip]
    while q and q[0] <= now - WINDOW:
        q.popleft()
    if len(q) >= LIMIT:
        return False
    q.append(now)
    return True
print([allow("1.1.1.1", t) for t in [0, 1, 2, 3, 9.9, 10.5, 11]])
print(allow("2.2.2.2", 3))`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب جنب كل مشكلة الأداة: عدّ الكلمات، وتجميع طلبات تحت كل يوزر، وآخر ١٠٠ سطر لوج، وطابور أولويات، وأكبر ٥ منتجات مبيعًا، ودرجة من شرايح، وإعدادات بأولوية، و LRU cache. وجنب كل واحدة الـ method الأساسية.`, done: R`التمانية صح ([[Counter.most_common]] و [[defaultdict(list)]] و [[deque(maxlen=100)]] و [[heappush/heappop]] و [[nlargest]] و [[bisect]] و [[ChainMap]] و [[OrderedDict.move_to_end]])، ولكل واحدة سطر جربته.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[d = defaultdict(int); print("x" in d); d["y"]; print(len(d), dict(d))]]، وبعدين [[c = Counter("banana"); print(c["z"], len(c), c.most_common(1))]]. اكتب الناتج قبل التشغيل.`, done: R`طابق التشغيل: [[False]] ثم [[1 {'y': 0}]] (القراية ضافت المفتاح)، ثم [[0 3 [('a', 3)]]] (القراية في Counter مضافتش)، وكاتب الفرق بين الاتنين في جملة.` },
            { lvl: 'تطبيق', t: R`**صلّح:** طابور مهام بـ [[heapq]] بيقع: [[heappush(q, (1, {"id": 7}))]] وبعدها [[heappush(q, (1, {"id": 9}))]]. اقرا الرسالة، وصلّحه بعدّاد من [[itertools.count()]] بحيث المهام المتساوية في الأولوية تطلع بترتيب دخولها.`, done: R`قبل التصليح [[TypeError: '<' not supported between instances of 'dict' and 'dict']]، وبعده ٥ مهام بنفس الأولوية بتطلع بنفس ترتيب ما دخلت (اتأكدت بالـ id)، والأولوية الأقل لسه بتطلع الأول.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** rate limiter بـ [[deque]]: [[allow(user, now)]] بتسمح بـ ٥ طلبات لكل يوزر في أي ١٠ ثواني (نافذة متحركة)، بـ [[defaultdict(deque)]]. جرّبها بلستة أوقات ([[now]] رقم ثواني) مش بـ [[time.sleep]].`, done: R`٦ طلبات في ثانية واحدة: أول ٥ [[True]] والسادس [[False]]، وبعد ١٠ ثواني من أول طلب بيسمح تاني، ويوزرين مستقلين عن بعض، والـ deque لكل يوزر طوله عمره ما بيعدّي ٥.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** لستة ٢٠ طلب ([[(user, city, product, amount)]]). طلّع في دالة واحدة: أكتر ٣ منتجات (Counter)، وإجمالي كل مدينة لكل منتج (defaultdict متداخل)، وأكبر ٣ طلبات (nlargest)، وكل ده من غير ولا [[if key not in]].`, done: R`الأرقام بتطابق حسبة بإيدك على ٥ طلبات منهم على الأقل، والنتيجة متحوّلة لـ dicts عادية ([[dict()]]) قبل ما ترجع، والكود مفيهوش [[if ... not in]].` },
            { lvl: 'تحدي', t: R`**ابني وقيس:** [[LRUCache(capacity)]] بـ [[OrderedDict]] فيها [[get(k)]] و [[put(k, v)]]، وقارنها بـ [[functools.lru_cache]] على نفس سلسلة ١٠٠ ألف مفتاح عشوائي من ١٠٠٠ مفتاح، وسعة ١٠٠: عدد الـ hits في الاتنين والوقت.`, done: R`عدد الـ hits **متطابق** في الاتنين (نفس السياسة)، وعندك وقت الاتنين بالملي ثانية من جهازك، و [[LRUCache]] حجمها عمره ما بيعدّي ١٠٠، و ٤ اختبارات pytest بتعدّي (منهم إن [[get]] بتحدّث الترتيب).` },
          ],
          deep: {
            why: R`عدّ الكلمات، وتجميع الطلبات حسب المستخدم، و «آخر ١٠٠ سطر لوج»، و BFS في الـ graphs، و طابور jobs: كلها بتتكتب بإيدك بـ dict و if و list، وبتطلع أطول وأبطأ. وفي انترفيوهات الـ DSA، [[Counter]] و [[deque]] بيختصروا نص الحل.`,
            how: R`[[Counter]] dict عادي بس [[c["x"]]] بترجع 0 لو مش موجود (من غير ما تضيف المفتاح). وبيتجمع ويتطرح ([[c1 + c2]] و [[c1 - c2]] وبيشيل الصفر والسالب)، و [[update]] بتزوّد، و [[total()]] (3.10+) مجموع العدّ.

[[defaultdict(factory)]]: لما تطلب مفتاح مش موجود بينادي الـ factory ([[list]] أو [[int]] أو [[set]] أو lambda) ويحط الناتج. خلي بالك: مجرد القراية [[d["x"]]] بتضيف المفتاح، فلو عايز تسأل «موجود؟» استخدم [[in]]. و [[dict(d)]] قبل ما ترجعه من API عشان يبقى dict عادي.

[[deque]]: [[append]] و [[appendleft]] و [[pop]] و [[popleft]] كلهم O(1)، بعكس [[list.insert(0)]] و [[list.pop(0)]] اللي O(n). و [[maxlen]] بيشيل من الناحية التانية لوحده لما يتملى. والوصول بالـ index في النص O(n)، فمش بديل للـ list في كل حاجة.

[[namedtuple]] tuple immutable بأسماء، خفيف وبيتفك زي tuple. للكود الجديد غالبًا [[dataclass(frozen=True)]] أو [[typing.NamedTuple]] (نفس الفكرة بـ type hints) أوضح.`,
            when: R`Counter لأي عدّ. defaultdict لأي «group by» في الذاكرة. deque لأي طابور، أو «آخر N»، أو BFS. وللطابور بين threads: [[queue.Queue]]، وبين coroutines: [[asyncio.Queue]].`,
            mistakes: R`[[list.pop(0)]] في loop على list كبيرة (O(n²)). و [[defaultdict]] وتفتكر إن [[if d[k]:]] مش هتضيف مفتاح. وترجع defaultdict في JSON response وتستغرب من الـ type. و [[Counter]] بتاع حروف لما انت قصدك كلمات ([[Counter("hello world")]] بيعد الحروف؛ محتاج [[.split()]]).`
          },
          teach: R`## المثال بيعمل إيه؟

٤ أنواع جاهزة من [[collections]]، كل واحد في حتة من المثال: [[Counter]] بيعد كلمات، و [[defaultdict]] بيجمّع طلبات حسب المدينة، و [[deque]] بيحتفظ بآخر ٣ صفحات وبيشتغل طابور، و [[namedtuple]] بيعمل نقطة بـ lat و lng. اتشغّل على ويندوز (Python 3.14.3) وعلى لينكس ([[python:3.13-slim]] في Docker) بنفس الناتج.

~~~python
from collections import Counter, defaultdict, deque, namedtuple
~~~

[[collections]] module في المكتبة الأساسية، والسطر ده بيجيب الأربعة.

---

## ١. [[Counter]]: العدّ

~~~python
words = "tea coffee tea juice tea coffee".split()
c = Counter(words)
print(c.most_common(2))
print(c["water"])
~~~

~~~text الناتج
[('tea', 3), ('coffee', 2)]
0
~~~

- [[.split()]] من غير حاجة بيقسّم على المسافات: [[['tea', 'coffee', 'tea', 'juice', 'tea', 'coffee'] ]].
- [[Counter(words)]]: لف على الـ list وعدّ كل عنصر. الناتج dict المفتاح فيه الكلمة والقيمة عددها: [[{'tea': 3, 'coffee': 2, 'juice': 1}]].
- [[most_common(2)]]: أكتر اتنين، list of tuples (الكلمة، العدد) مترتبة من الأكتر.
- [[c["water"]]]: مش موجودة، ومع ذلك رجّعت [[0]] مش [[KeyError]]. وكمان مبتضيفش المفتاح: بعدها [["nothing" in c]] لسه False.

### الطريقة اليدوية اللي Counter بيوفّرها

~~~python
counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1
~~~

### [[update]] و [[+]] و [[total()]]

~~~python
c.update(["water", "tea"])
print(c + Counter(juice=4), c.total())
~~~

~~~text الناتج
Counter({'juice': 5, 'tea': 4, 'coffee': 2, 'water': 1}) 8
~~~

- [[update([...])]]: **زوّد** العدّ (مش استبدال زي dict العادي): tea بقت 4، و water اتضافت بـ 1.
- [[Counter(juice=4)]]: Counter من keyword arguments.
- [[c + ...]]: جمع العدّين: juice بقت 1 + 4 = 5. والجمع بيرجّع Counter جديد مترتب من الأكتر، و [[c]] نفسه مبيتغيرش.
- [[c.total()]] (من 3.10): مجموع كل الأعداد في [[c]]: 4 + 2 + 1 + 1 = 8.

والطرح بيشيل الصفر والسالب: [[Counter(a=3, b=1) - Counter(a=1, b=5)]] طلعت [[Counter({'a': 2})]] بس.

---

## ٢. [[defaultdict]]: التجميع

~~~python
orders = [("Cairo", "sara"), ("Alex", "omar"), ("Cairo", "ali")]
by_city = defaultdict(list)
for city, user in orders:
    by_city[city].append(user)
print(dict(by_city))
~~~

~~~text الناتج
{'Cairo': ['sara', 'ali'], 'Alex': ['omar']}
~~~

- [[for city, user in orders:]]: كل عنصر tuple من اتنين، فبنفكّه في متغيرين.
- [[defaultdict(list)]]: dict عادي، بس لما تطلب مفتاح مش موجود بينادي [[list()]] (اللي بتعمل list فاضية) ويحطها، وبعدين يرجّعها. [[list]] هنا اسمها **factory**: دالة بتصنع القيمة الافتراضية، ومن غير أقواس لأننا بنبعت الدالة نفسها مش نتيجتها.
- [[by_city[city].append(user)]]: أول مرة لـ Cairo: اتعملت [[[] ]] وبعدين ضفنا sara. تاني مرة: موجودة، ضفنا ali.

مع dict عادي نفس السطر بيقع:

~~~text الناتج: d = {}; d['k'].append(1)
KeyError: 'k'
~~~

- [[dict(by_city)]]: حوّله dict عادي. طباعة الـ defaultdict نفسه شكلها [[defaultdict(<class 'list'>, {'Cairo': [...], ...})]].

> الفخ: مجرد قراية مفتاح بتضيفه. [[d = defaultdict(list); d["x"]]] وبعدها [["x" in d]] طلعت True و [[dict(d)]] بقى [[{'x': []}]]. عشان تسأل «موجود؟» استخدم [[in]].

### متداخل: [[defaultdict(lambda: defaultdict(int))]]

~~~python
tree = defaultdict(lambda: defaultdict(int))
tree["Cairo"]["tea"] += 2
~~~

- [[lambda: ...]]: دالة صغيرة من غير اسم ومن غير باراميترات، بترجّع [[defaultdict(int)]] جديد.
- [[int()]] بترجّع [[0]]، فـ [[defaultdict(int)]] أي مفتاح جديد فيه بيبدأ صفر.
- [[tree["Cairo"]]] اتعمل dict داخلي، و [[["tea"]]] جواه بدأ 0، و [[+= 2]] خلاه 2. من غير ولا if.

---

## ٣. [[deque]]: آخر N وطابور

~~~python
recent = deque(maxlen=3)
for page in ["/", "/a", "/b", "/c"]:
    recent.append(page)
print(recent)
~~~

~~~text الناتج
deque(['/a', '/b', '/c'], maxlen=3)
~~~

[[deque]] (بتتنطق «ديك»، اختصار double-ended queue): list بتضيف وتشيل من الناحيتين بسرعة. و [[maxlen=3]]: أقصاه ٣، فلما الرابع ([["/c"]]) دخل، الأقدم ([["/"]]) طلع من الناحية التانية لوحده.

~~~python
queue = deque(["job1", "job2"])
queue.appendleft("urgent")
print(queue.popleft(), queue.pop())
~~~

~~~text الناتج
urgent job2
~~~

| خطوة | الطابور | اللي حصل |
|---|---|---|
| البداية | [[job1, job2]] | طابور فيه شغلتين بالترتيب |
| [[appendleft("urgent")]] | [[urgent, job1, job2]] | اتضافت في **الأول**، فهتطلع قبل الكل |
| [[popleft()]] رجّعت [[urgent]] | [[job1, job2]] | طلّعت من الأول (FIFO لو بتضيف بـ [[append]]) |
| [[pop()]] رجّعت [[job2]] | [[job1]] | طلّعت من الآخر (زي stack) |

ليه مش list؟ [[list.pop(0)]] و [[list.insert(0, x)]] بيزقّوا كل العناصر خطوة، يعني وقتهم بيكبر مع حجم الـ list (O(n)). في deque الأربع عمليات [[append]] و [[appendleft]] و [[pop]] و [[popleft]] وقتهم ثابت (O(1)) مهما كان الحجم.

---

## ٤. [[namedtuple]]

~~~python
Point = namedtuple("Point", ["lat", "lng"])
p = Point(30.04, 31.23)
print(p.lat, p)
~~~

~~~text الناتج
30.04 Point(lat=30.04, lng=31.23)
~~~

- [[namedtuple("Point", ["lat", "lng"])]]: بيعمل **نوع جديد** اسمه Point، tuple خانتها الأولى اسمها lat والتانية lng. الاسم الأول [["Point"]] بيظهر في الطباعة، فبنسمّي المتغير بنفس الاسم.
- [[p.lat]] بالاسم، و [[p[0]]] بالرقم برضه شغالة، و [[lat, lng = p]] بتتفك زي أي tuple.
- immutable: [[p.lat = 1]] مش هتنفع.

---

## ٥. الحل: أكتر IP و rate limiter

~~~python solCode (القلب)
LIMIT, WINDOW = 3, 10.0
hits: defaultdict[str, deque[float]] = defaultdict(deque)
def allow(ip: str, now: float) -> bool:
    q = hits[ip]
    while q and q[0] <= now - WINDOW:
        q.popleft()
    if len(q) >= LIMIT:
        return False
    q.append(now)
    return True
~~~

- [[hits]]: لكل IP deque فيه أوقات طلباته. [[defaultdict(deque)]] بيعمل deque فاضي لأي IP جديد. والجزء اللي بعد [[hits:]] type hint بس: dict مفاتيحه str وقيمه deque فيه floats.
- [[while q and q[0] <= now - WINDOW:]]: [[q[0]]] أقدم وقت. طول ما فيه أوقات وأقدمها عدّى عليه ١٠ ثواني أو أكتر، شيله من الشمال.
- [[if len(q) >= LIMIT: return False]]: لسه فيه ٣ في الشباك: ارفض، **ومن غير ما تسجّل** الطلب ده.
- وإلا سجّله ورجّع True.

~~~text الناتج
[('1.1.1.1', 3), ('2.2.2.2', 2)]
[True, True, True, False, False, True, True]
True
~~~

| الوقت | الشباك قبل | النتيجة |
|---|---|---|
| 0 و 1 و 2 | فاضي، ثم 0، ثم 0 و 1 | True ×3 |
| 3 | 0 و 1 و 2 | False |
| 9.9 | 0 و 1 و 2 (و 0 لسه جوه: 0 > 9.9 - 10) | False |
| 10.5 | 0 خرج (0 <= 0.5) | True |
| 11 | 1 خرج (1 <= 1) | True |

وطباعة [[hits]] في الآخر: [[{'1.1.1.1': deque([2, 10.5, 11]), '2.2.2.2': deque([3])}]].

---

## ٦. [[heapq]]: أكبر N، وطابور أولويات

[[heapq]] بيخلي list عادية «heap»: أصغر عنصر دايمًا في [[[0]]]، والإضافة والشيل O(log n):

~~~python
import heapq
sales = [("tea", 120), ("coffee", 340), ("juice", 90), ("water", 500), ("cake", 210)]
print(heapq.nlargest(2, sales, key=lambda x: x[1]))
tasks = []
heapq.heappush(tasks, (2, "send email"))
heapq.heappush(tasks, (1, "charge card"))
heapq.heappush(tasks, (3, "write log"))
print([heapq.heappop(tasks)[1] for _ in range(3)])
~~~

~~~text الناتج (Python 3.14)
[('water', 500), ('coffee', 340)]
['charge card', 'send email', 'write log']
~~~

- [[nlargest(n, items, key=...)]] و [[nsmallest]] بيجيبوا أكبر أو أصغر N من غير ما يرتّبوا الكل. قيست على ١٠٠ ألف رقم: [[sorted(data)[:10]]] أخدت **١٣.٦ ملي ثانية** و [[nsmallest(10, data)]] **١.٧٦**، يعني حوالي ٨ مرات أسرع. ولو N قريب من حجم اللستة، [[sorted]] أحسن.
- [[heappush]] بيضيف و [[heappop]] بيطلّع **الأصغر** دايمًا، فالـ tuple [[(priority, task)]] بيطلع بالأولوية: ١ الأول. ده الطابور اللي ورا الـ schedulers و Dijkstra.
- فخ: لو أولويتين متساويين، Python بيقارن العنصر التاني. ولو هو dict: [[TypeError: '<' not supported between instances of 'dict' and 'dict']] (اتجرّب). الحل [[(priority, counter, task)]] بعدّاد بيزيد، فمفيش اتنين متساويين أبدًا.
- مفيش max-heap: حط [[-priority]].

---

## ٧. [[bisect]]: تدوّر وتحط في list مترتبة

~~~python
import bisect
grades = [50, 65, 75, 85]
letters = "FDCBA"
print([letters[bisect.bisect(grades, s)] for s in [40, 50, 70, 90]])
prices = [10, 20, 40]; bisect.insort(prices, 25); print(prices)
~~~

~~~text الناتج
['F', 'D', 'C', 'A']
[10, 20, 25, 40]
~~~

- [[bisect(grades, s)]] بيرجّع المكان اللي [[s]] كانت هتتحط فيه عشان اللستة تفضل مترتبة، بـ binary search (O(log n)). ٤٠ قبل الكل = ٠ = F، و ٥٠ بعد ٥٠ = ١ = D (لأن [[bisect]] = [[bisect_right]]؛ [[bisect_left]] كانت هتحطها قبلها). ده جدول تقديرات أو شرايح ضريبة من غير سلسلة [[if/elif]].
- [[insort]] بيحط العنصر في مكانه الصح. الدوّرة O(log n) بس الإضافة نفسها O(n) لأن العناصر بتتزق.
- قيست [[0.5 in sorted_list]] على ١٠٠ ألف رقم: **١٠٦٨ ميكروثانية** (بيلف واحد واحد)، و [[bisect_left(sorted_list, 0.5)]]: **٠.٢٥ ميكروثانية**. نفس السؤال، ٤٠٠٠ مرة أسرع، بشرط اللستة مترتبة.

---

## ٨. [[OrderedDict]] و [[ChainMap]]

~~~python
from collections import OrderedDict, ChainMap
cache = OrderedDict()
for k in ["a", "b", "c"]: cache[k] = k.upper()
cache.move_to_end("a"); cache.popitem(last=False); print(list(cache))
defaults = {"port": 8000, "debug": False}
env = {"debug": True}
cli = {"port": 9000}
cfg = ChainMap(cli, env, defaults)
print(cfg["port"], cfg["debug"], dict(cfg))
~~~

~~~text الناتج
['c', 'a']
9000 True {'port': 9000, 'debug': True}
~~~

- الـ [[dict]] العادي محافظ على الترتيب من 3.7، فـ [[OrderedDict]] بقى للحاجتين دول: [[move_to_end(k)]] (اتاستخدم دلوقتي فوديه الآخر) و [[popitem(last=False)]] (شيل الأقدم). مع بعض = LRU cache بإيدك: [[b]] اتشالت لأنها الأقدم استخدامًا.
- [[ChainMap(cli, env, defaults)]] بيدوّر في الطبقات بالترتيب ويرجّع أول قيمة يلاقيها، من غير ما ينسخ أو يدمج: [[port]] من الـ CLI و [[debug]] من الـ env. ده بالظبط ترتيب أولوية الإعدادات في أي أداة (argument يغلب env يغلب default). والكتابة [[cfg["x"] = 1]] بتروح للطبقة الأولى بس.

## الخلاصة

| النوع | استخدمه لـ | أهم حاجة |
|---|---|---|
| [[Counter]] | العدّ | [[most_common(n)]]، والمفتاح الناقص بصفر |
| [[defaultdict(factory)]] | group by | القراية بتضيف المفتاح |
| [[deque(maxlen=n)]] | طابور، أو آخر N | الناحيتين O(1) |
| [[namedtuple]] | tuple بأسماء | immutable |

- [[Counter("hello world")]] بيعد **حروف** ([[('l', 3)]] أولهم)، فللكلمات اعمل [[.split()]] الأول.`,
          lines: [
            R`بنستورد أربع أنواع من [[collections]] (المكتبة القياسية): [[Counter]] للعدّ، و [[defaultdict]] للتجميع من غير [[if]]، و [[deque]] للطابور من الناحيتين، و [[namedtuple]] لـ tuple بأسماء. التلاتة الأولانيين dict أو list «متخصصة».`,
            R`[[split()]] من غير arguments بيقسّم على أي مسافات ويشيل الفاضي، فبتطلع list فيها ٦ كلمات بتتكرر. ده الشكل اللي بتجيبه من لوج أو من عمود في CSV.`,
            R`[[Counter(words)]] بيلف مرة واحدة ويعدّ كل عنصر: dict المفتاح فيه العنصر والقيمة عدده ([[{'tea': 3, 'coffee': 2, 'juice': 1}]]). بيقبل أي iterable: list أو string (يعدّ الحروف) أو generator.`,
            R`[[most_common(2)]] أكتر اتنين بالترتيب كـ list of tuples: [[[('tea', 3), ('coffee', 2)]]]. ولو عددهم متساوي، اللي ظهر الأول بيطلع الأول. ومن غير رقم بترجّع الكل مترتب.`,
            R`مفتاح مش موجود بيرجّع [[0]] بدل [[KeyError]]، ومبيتضافش للـ Counter (عكس [[defaultdict]]). فـ [[c["water"] > 0]] سؤال آمن.`,
            R`[[update]] بيزوّد العدّ بعناصر iterable تاني (مش بيستبدل زي [[dict.update]]): [[water]] بقت ١ و [[tea]] بقت ٤. ولو عايز تطرح: [[subtract]].`,
            R`[[+]] بين Counterين بيجمع العدّ لكل مفتاح (و [[-]] بيطرح ويشيل اللي بقى صفر أو سالب). و [[total()]] (3.10+) مجموع كل العدّات = [[8]] هنا قبل الجمع.`,
            R`list من tuples (مدينة، يوزر): الشكل اللي بتجيبه من صفوف داتابيز. عايزين نجمّع اليوزرز تحت كل مدينة.`,
            R`[[defaultdict(list)]]: لو طلبت مفتاح مش موجود، بينادي [[list()]] ويحط النتيجة [[[]]] تحت المفتاح ده ويرجّعها. اللي بتديه **دالة** بتعمل الـ default ([[list]] مش [[[]]])، زي [[default_factory]] في الـ dataclass.`,
            R`بنفك كل tuple لاسمين ([[city]] و [[user]]) جوه الـ [[for]] مباشرة (tuple unpacking)، بدل [[pair[0]]] و [[pair[1]]].`,
            R`[[by_city[city]]] لأول مرة بيعمل [[[]]] لوحده، و [[append]] بيضيف عليها. من غير defaultdict كنت هتكتب [[by_city.setdefault(city, []).append(user)]] أو [[if]] قبلها. وخلي بالك: مجرد **قراية** مفتاح مش موجود بتضيفه.`,
            R`[[dict(by_city)]] بيحوّله dict عادي: الطباعة بتبقى أنضف (من غير [[defaultdict(<class 'list'>, ...)]])، والأهم إن أي قراية غلط بعد كده هترمي [[KeyError]] بدل ما تضيف مفاتيح فاضية في صمت.`,
            R`defaultdict متداخل: الـ default بتاع البرّاني [[lambda]] بترجّع defaultdict جوّاني الـ default بتاعه [[int]] (اللي بيرجّع [[0]]). فبتقدر تكتب [[tree[a][b] += 1]] لأي a و b من غير ما تعمل أي حاجة قبلها.`,
            R`[[tree["Cairo"]]] اتعمل defaultdict جديد، و [[["tea"]]] جواه اتعمل [[0]]، و [[+= 2]] بقى [[2]]. سطر واحد بدل ٤ سطور [[if]]. ده الشكل اللي بتعدّ بيه «لكل مدينة، كل صنف اتباع كام».`,
            R`[[deque(maxlen=3)]] طابور (double-ended queue) بحد أقصى ٣ عناصر. لما يتملى وتضيف، الأقدم من الناحية التانية بيطلع **لوحده**. مثالي لـ «آخر N حاجة»: آخر صفحات، آخر أخطاء، نافذة rate limit.`,
            R`٤ صفحات والطابور بياخد ٣، عشان نشوف الأولى بتطلع.`,
            R`[[append]] بيضيف في الآخر. لما وصل للرابعة ([[/c]]) والطابور مليان، [[/]] اتشالت من الأول من غير أي كود مننا.`,
            R`[[deque(['/a', '/b', '/c'], maxlen=3)]]: آخر ٣ بس. الطباعة بتوري الـ [[maxlen]] كمان.`,
            R`deque عادي من غير حد، فيه شغلتين. [[deque]] بدل [[list]] عشان الإضافة والشيل من **الأول** سريعين.`,
            R`[[appendleft]] بيضيف في الأول في وقت ثابت (O(1)). في [[list]] نفس الحاجة [[insert(0, x)]] بتحرّك كل العناصر خطوة (O(n))، ومع ١٠٠ ألف عنصر الفرق بيبان.`,
            R`[[popleft()]] بيطلّع من الأول ([[urgent]])، و [[pop()]] من الآخر ([[job2]]). الاتنين O(1). و [[list.pop(0)]] O(n). الناتج [[urgent job2]] وفاضل [[job1]].`,
            R`[[namedtuple("Point", ["lat", "lng"])]] بيعمل **class** جديد اسمه [[Point]]: tuple عادي بس خاناته ليها أسماء. الاسم الأول (النص) هو اللي بيظهر في الطباعة، فخليه زي اسم المتغير.`,
            R`object من الـ class الجديد بالمكان (أو [[Point(lat=30.04, lng=31.23)]] بالاسم). مبيتعدلش زي أي tuple: [[p.lat = 1]] بترمي [[AttributeError]].`,
            R`[[p.lat]] بالاسم بدل [[p[0]]]، والطباعة [[Point(lat=30.04, lng=31.23)]] واضحة. ولأنه tuple، [[lat, lng = p]] شغالة. وفي كود جديد [[typing.NamedTuple]] (درس dataclass) نفس الحاجة بـ type hints.`,
          ]
        },
        {
          cmd: "itertools",
          title: "itertools: chain و batched و groupby و pairwise",
          desc: R`[[itertools]] أدوات بتشتغل على أي iterable وبترجع iterators (lazy، مبتحسبش غير لما تطلب): [[chain]] بيوصّل كذا حاجة ورا بعض، و [[batched]] (3.12+) بيقسّم لحتت بحجم ثابت، و [[pairwise]] أزواج متتالية، و [[accumulate]] مجموع متراكم، و [[product]] كل التوافيق، و [[count]] عدّاد مالوش آخر، و [[islice]] قطع من iterator، و [[groupby]] تجميع للعناصر المتجاورة.`,
          example: R`from itertools import accumulate, batched, chain, count, groupby, islice, pairwise, product
from operator import itemgetter
print(list(chain([1, 2], (3, 4), range(5, 7))))       # [1, 2, 3, 4, 5, 6]
print(list(batched(range(7), 3)))                     # [(0, 1, 2), (3, 4, 5), (6,)]
print(list(pairwise([100, 120, 90])))                 # [(100, 120), (120, 90)]
print(list(accumulate([100, -30, 50])))               # [100, 70, 120]: رصيد متراكم
print(list(product(["S", "M"], ["red", "blue"])))
ids = count(start=1000)
print(next(ids), next(ids))                           # 1000 1001
print(list(islice(ids, 3)))                           # [1002, 1003, 1004]
sales = [("Alex", 80), ("Cairo", 150), ("Cairo", 45), ("Alex", 20)]
sales.sort(key=itemgetter(0))
for city, group in groupby(sales, key=itemgetter(0)):
    print(city, sum(amount for _, amount in group))   # Alex 100 ثم Cairo 195`,
          try: R`(١) عندك قراءات حرارة [[[20, 21, 25, 24, 30, 29, 29]]]: طلّع التغيير بين كل قراية واللي بعدها وأكبر زيادة بـ [[pairwise]]. (٢) [[groupby]] على تواريخ [[["2026-09-01", "2026-09-01", "2026-09-02", "2026-09-01"]]] مرة من غير ترتيب ومرة بعد [[sorted]]، وقارن. (٣) قسّم [[range(1, 11)]] لدفعات من ٤ كأنك بتعمل INSERT على دفعات.`,
          sol: R`(١) [[[1, 4, -1, 6, -1, 0]]] وأكبر زيادة [[6]]. (٢) من غير ترتيب: [[[('2026-09-01', 2), ('2026-09-02', 1), ('2026-09-01', 1)]]]، اليوم الأول ظهر مرتين! وبعد [[sorted]]: [[[('2026-09-01', 3), ('2026-09-02', 1)]]]. (٣) [[(1, 2, 3, 4)]] و [[(5, 6, 7, 8)]] و [[(9, 10)]]: آخر دفعة أصغر، وده طبيعي.

الـ groupby هو الفخ المشهور: بيجمّع العناصر المتجاورة بس (زي [[uniq]] في bash)، فلازم ترتّب بنفس الـ key الأول. ولو مش عايز ترتّب، [[defaultdict(list)]] أسهل. والـ [[g]] اللي بيرجع من groupby بيتستهلك أول ما تتحرك للمجموعة اللي بعدها، عشان كده [[len(list(g))]] جوه نفس اللفة.`,
          solCode: R`from itertools import batched, groupby, pairwise
readings = [20, 21, 25, 24, 30, 29, 29]
changes = [b - a for a, b in pairwise(readings)]
print(changes, max(changes))
days = ["2026-09-01", "2026-09-01", "2026-09-02", "2026-09-01"]
print([(d, len(list(g))) for d, g in groupby(days)])
print([(d, len(list(g))) for d, g in groupby(sorted(days))])
ids = list(range(1, 11))
for chunk in batched(ids, 4):
    print("INSERT batch:", chunk)`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، قول أنهي أداة من [[itertools]] لكل حاجة: دفعات ١٠٠، وفرق كل يوم عن اللي قبله، ورصيد بعد كل عملية، وكل أزواج من ٤ لاعيبة، وأول ١٠ من مصدر مالوش آخر، وتجميع صفوف مترتبة، وتوزيع round-robin.`, done: R`السبعة صح ([[batched]] و [[pairwise]] و [[accumulate]] و [[combinations]] و [[islice]] و [[groupby]] و [[cycle]])، و [[len(list(combinations(range(4), 2)))]] طلعت [[6]] زي ما حسبت.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[nums = map(int, ["1", "2", "3"]); print(list(nums)); print(sum(nums)); print(list(zip("ab", count())))]]. اكتب الناتج، وبعدين [[print(list(batched("abcdefg", 3)))]].`, done: R`طابق: [[[1, 2, 3]]] ثم [[0]] (الـ map خلص) ثم [[[('a', 0), ('b', 1)]]] (zip وقف عند الأقصر رغم إن [[count]] مالوش آخر) ثم [[[('a', 'b', 'c'), ('d', 'e', 'f'), ('g',)]]].` },
            { lvl: 'تطبيق', t: R`**صلّح:** تقرير بيجمّع المبيعات لكل يوم بـ [[groupby(rows, key=lambda r: r["date"])]] وبيطلع نفس اليوم مرتين، ولما اتصلّح طلعت كل الأيام بمجموع [[0]] لأن الكاتب حفظ الـ groups في dict الأول. صلّح الاتنين.`, done: R`كل يوم بيظهر مرة واحدة بالمجموع الصح (قارنته بـ [[defaultdict(int)]] على نفس الداتا)، والتصليحين: [[sorted(rows, key=...)]] قبل [[groupby]]، و [[sum]] أو [[list(g)]] جوه اللفة نفسها.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** لستة أسعار سهم لـ ٣٠ يوم. بـ [[pairwise]] و [[accumulate]] و [[islice]] طلّع: أكبر صعود في يوم، وأطول سلسلة أيام صاعدة ورا بعض، والمتوسط المتحرك لـ ٥ أيام (sliding window بـ [[deque(maxlen=5)]]).`, done: R`الأرقام التلاتة بتطابق حسبة بإيدك على أول ١٠ أيام، والمتوسط المتحرك فيه ٢٦ قيمة (٣٠ - ٥ + ١)، والكود مفيهوش index يدوي زي [[prices[i+1] - prices[i]]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[import_rows(rows, size=500)]] بتاخد generator صفوف (ممكن مليون) وتبعتهم لدالة [[save_batch(batch)]] ٥٠٠ ٥٠٠ بـ [[batched]]، وترجّع عدد الدفعات والصفوف، ولو دفعة فشلت تكمّل الباقي وتسجّل رقمها.`, done: R`على generator مليون صف الذاكرة فضلت ثابتة (أقل من ٥ ميجا بـ [[tracemalloc]])، وعدد الدفعات [[2000]]، ولو [[save_batch]] رمت في الدفعة ٧ النتيجة فيها [[failed=[7]]] والباقي اتحفظ.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** قارن [[list(chain(a, b, c))]] و [[a + b + c]] و [[[*a, *b, *c]]] على ٣ lists مليون عنصر لكل واحدة في الوقت والذاكرة. وبعدين نفس الحاجة لو انت عايز تلف بس (من غير ما تبني list).`, done: R`جدول فيه ٣ أوقات و ٣ ذاكرة لبناء الـ list، ورقم واحد لـ [[for x in chain(...)]] من غير list (ذاكرته تقريبًا صفر)، وكاتب مين الأسرع في البناء عندك.` },
          ],
          deep: {
            why: R`دفعات لـ API بيقبل ١٠٠ عنصر في الطلب، و «الفرق عن امبارح»، و «رصيد بعد كل عملية»، و «كل مقاسات ×كل ألوان»: كلها loops فيها indexes و off-by-one. و itertools بيقولها في كلمة، ومن غير ما يحمّل الداتا كلها في الذاكرة.`,
            how: R`كل دوال itertools بترجع iterators: بتتلف عليها مرة واحدة ومبتحسبش حاجة غير لما تطلب. فـ [[count()]] مالوش آخر ومينفعش تعمل منه list، بس ينفع مع [[islice]] أو [[zip]] أو [[next]].

[[batched(it, n)]] بيرجع tuples، ومن 3.13 فيه [[strict=True]] بيرمي لو آخر دفعة ناقصة. و [[pairwise]] (3.10+) زي [[zip(a, a[1:])]] بس لأي iterable. و [[accumulate]] الافتراضي جمع، وتقدر تديله دالة ([[accumulate(xs, max)]] أعلى قيمة لحد دلوقتي).

[[groupby(it, key)]] بيرجع أزواج (المفتاح، iterator للمجموعة)، وبيعمل مجموعة جديدة كل ما الـ key يتغير عن اللي قبله. و [[operator.itemgetter(0)]] دالة جاهزة بتساوي [[lambda x: x[0]]].

وفيه كمان [[combinations]] و [[permutations]] (مفيدين في DSA)، و [[zip_longest]]، و [[takewhile]]/[[dropwhile]]، و [[tee]].`,
            when: R`لما الـ loop بتاعك بيعمل حاجة ليها اسم في itertools. بس متعملش سلسلة ٥ دوال متداخلة عشان تبان شاطر؛ لو loop عادي أوضح، اكتبه loop.`,
            mistakes: R`[[groupby]] من غير ترتيب. وتلف على iterator مرتين (التانية فاضية). و [[list(count())]] (بيلف للأبد). وتحتفظ بمجموعة من groupby لبعدين ([[groups = list(groupby(...))]]) فتلاقي المجموعات فاضية.`
          },
          teach: R`## المثال بيعمل إيه؟

كل سطر [[print]] بيجرّب أداة واحدة من [[itertools]] على list صغيرة، وفي الآخر [[groupby]] بيجمع المبيعات لكل مدينة. اتشغّل على ويندوز (Python 3.14.3) وعلى لينكس ([[python:3.13-slim]] في Docker) وطلع نفس الناتج بالحرف. ([[batched]] محتاج 3.12 أو أحدث.)

---

## ١. الـ imports و فكرة الـ iterator

~~~python
from itertools import accumulate, batched, chain, count, groupby, islice, pairwise, product
from operator import itemgetter
~~~

حاجة لازم تفهمها قبل أي أداة: كل دوال [[itertools]] بترجّع **iterator**، مش list. الـ iterator بيطلّع القيم واحدة واحدة وقت ما تطلبها (lazy)، ومرة واحدة بس:

~~~text الناتج: c = chain([1, 2], [3]); print(c, list(c), list(c))
<itertools.chain object at 0x00000121B82E06A0> [1, 2, 3] []
~~~

- طباعته مباشرة بتطلّع اسم الـ object مش القيم، عشان كده المثال بيلف كل حاجة في [[list(...)]].
- أول [[list(c)]] استهلكت كل القيم، والتانية لقته فاضي.

و [[operator]] module فيه العمليات كدوال جاهزة. [[itemgetter(0)]] دالة بتاخد حاجة وترجّع عنصرها رقم 0: [[itemgetter(0)(('Alex', 80))]] طلعت [['Alex']]. يعني نفس [[lambda x: x[0]]].

---

## ٢. [[chain]]: وصّل ورا بعض

~~~text الناتج: list(chain([1, 2], (3, 4), range(5, 7)))
[1, 2, 3, 4, 5, 6]
~~~

list و tuple و [[range(5, 7)]] (يعني 5 و 6، الآخر مش داخل)، اتلف عليهم ورا بعض كأنهم حاجة واحدة، من غير ما يتعمل list جديدة في الذاكرة.

---

## ٣. [[batched]]: دفعات

~~~text الناتج: list(batched(range(7), 3))
[(0, 1, 2), (3, 4, 5), (6,)]
~~~

قسّم 0 لـ 6 لحتت كل واحدة ٣. الأخيرة فيها عنصر واحد، و [[(6,)]] بالفاصلة دي طريقة كتابة tuple فيه عنصر واحد. ومن 3.13 لو عايز ترفض الدفعة الناقصة: [[batched(range(7), 3, strict=True)]] طلّعت [[ValueError: batched(): incomplete batch]].

---

## ٤. [[pairwise]]: كل عنصر واللي بعده

~~~text الناتج: list(pairwise([100, 120, 90]))
[(100, 120), (120, 90)]
~~~

٣ عناصر بيدّوا زوجين: (الأول، التاني) و (التاني، التالت). ده اللي تحتاجه لأي «الفرق عن اللي قبله».

---

## ٥. [[accumulate]]: مجموع متراكم

~~~text الناتج: list(accumulate([100, -30, 50]))
[100, 70, 120]
~~~

| الخطوة | الحساب | الناتج |
|---|---|---|
| ١ | 100 | 100 |
| ٢ | 100 + (-30) | 70 |
| ٣ | 70 + 50 | 120 |

زي رصيد حساب بعد كل عملية.

---

## ٦. [[product]]: كل التوافيق

~~~text الناتج: list(product(["S", "M"], ["red", "blue"]))
[('S', 'red'), ('S', 'blue'), ('M', 'red'), ('M', 'blue')]
~~~

كل عنصر من الأولى مع كل عنصر من التانية: ٢ × ٢ = ٤. زي loop جوه loop.

---

## ٧. [[count]] و [[next]] و [[islice]]

~~~python
ids = count(start=1000)
print(next(ids), next(ids))
print(list(islice(ids, 3)))
~~~

~~~text الناتج
1000 1001
[1002, 1003, 1004]
~~~

- [[count(start=1000)]]: عدّاد بيبدأ من 1000 **وملوش آخر**. [[list(count())]] هيلف للأبد.
- [[next(ids)]]: هات القيمة الجاية من أي iterator. مرتين: 1000 ثم 1001.
- [[islice(ids, 3)]]: slice لـ iterator: خد أول ٣ من اللي **فاضل**. ولاحظ إنها كمّلت من 1002، لأن العدّاد افتكر هو وقف فين.

---

## ٨. [[groupby]]: تجميع المتجاور

~~~python
sales = [("Alex", 80), ("Cairo", 150), ("Cairo", 45), ("Alex", 20)]
sales.sort(key=itemgetter(0))
for city, group in groupby(sales, key=itemgetter(0)):
    print(city, sum(amount for _, amount in group))
~~~

~~~text الناتج
Alex 100
Cairo 195
~~~

- [[sales.sort(key=itemgetter(0))]]: رتّب الـ list نفسها بالمدينة. بعدها: Alex 80، Alex 20، Cairo 150، Cairo 45.
- [[groupby(sales, key=itemgetter(0))]]: لف، وكل ما المدينة **تتغير عن اللي قبلها** ابدأ مجموعة جديدة. بيرجّع أزواج: المفتاح ([[city]])، و iterator فيه عناصر المجموعة ([[group]]).
- [[sum(amount for _, amount in group)]]: لف على عناصر المجموعة، وكل عنصر tuple بنفكّه: [[_]] للمدينة (مش محتاجينها) و [[amount]] للرقم، واجمع.

ليه الترتيب لازم؟ جربنا نفس الـ groupby من غير [[sort]]:

~~~text الناتج
[('Alex', 80), ('Cairo', 195), ('Alex', 20)]
~~~

Alex ظهرت مرتين، لأن groupby بيبص على العنصر اللي جنبه بس (زي [[uniq]] في bash).

---

## ٩. الحل

~~~python solCode
readings = [20, 21, 25, 24, 30, 29, 29]
changes = [b - a for a, b in pairwise(readings)]
print(changes, max(changes))
days = ["2026-09-01", "2026-09-01", "2026-09-02", "2026-09-01"]
print([(d, len(list(g))) for d, g in groupby(days)])
print([(d, len(list(g))) for d, g in groupby(sorted(days))])
for chunk in batched(ids, 4):
    print("INSERT batch:", chunk)
~~~

- [[[b - a for a, b in pairwise(readings)] ]]: كل زوج متتالي، اطرح الأول من التاني.
- [[groupby(days)]] من غير [[key]]: المفتاح هو العنصر نفسه.
- [[len(list(g))]]: عدد عناصر المجموعة. [[g]] iterator ملوش [[len]]، فبنحوّله list الأول. ولازم جوه نفس اللفة، لأن أول ما groupby يتحرك للمجموعة اللي بعدها، الـ [[g]] القديم بيفضى.

~~~text الناتج
[1, 4, -1, 6, -1, 0] 6
[('2026-09-01', 2), ('2026-09-02', 1), ('2026-09-01', 1)]
[('2026-09-01', 3), ('2026-09-02', 1)]
INSERT batch: (1, 2, 3, 4)
INSERT batch: (5, 6, 7, 8)
INSERT batch: (9, 10)
~~~

وعشان تتأكد من فخ «الـ g بيفضى»: [[gs = list(groupby(...))]] وبعدين بصينا جوه المجموعات: [[[('Alex', []), ('Cairo', [])] ]]. المفاتيح موجودة والمجموعات فاضية.

---

## ١٠. وصفات تانية بتتكتب كل يوم

~~~python
from itertools import takewhile, dropwhile, zip_longest, combinations, permutations, starmap, cycle, repeat, compress, islice
print(list(takewhile(lambda x: x < 5, [1, 3, 7, 2])), list(dropwhile(lambda x: x < 5, [1, 3, 7, 2])))
print(list(zip(["a", "b", "c"], [1, 2])), list(zip_longest(["a", "b", "c"], [1, 2], fillvalue=0)))
list(zip(["a", "b", "c"], [1, 2], strict=True))
print(list(combinations("ABC", 2)), len(list(permutations("ABC", 2))))
print(list(starmap(pow, [(2, 3), (10, 2)])))
print(list(islice(cycle(["web1", "web2"]), 5)), list(repeat("x", 3)))
print(list(compress(["a", "b", "c"], [1, 0, 1])))
~~~

~~~text الناتج (Python 3.14)
[1, 3] [7, 2]
[('a', 1), ('b', 2)] [('a', 1), ('b', 2), ('c', 0)]
ValueError: zip() argument 2 is shorter than argument 1
[('A', 'B'), ('A', 'C'), ('B', 'C')] 6
[8, 100]
['web1', 'web2', 'web1', 'web2', 'web1'] ['x', 'x', 'x']
['a', 'c']
~~~

| الأداة | بتعمل إيه | مثال من الشغل |
|---|---|---|
| [[takewhile(pred, it)]] | بتاخد لحد أول عنصر يكسر الشرط وتقف (الـ ٢ بعد ٧ متاخدتش) | سطور اللوج لحد أول سطر بعد ساعة معينة في ملف مترتب |
| [[dropwhile(pred, it)]] | بترمي لحد أول عنصر يكسر الشرط، وبعدها تاخد الكل | تتخطى الـ header في ملف لحد أول سطر داتا |
| [[zip]] و [[zip_longest]] | [[zip]] بيقف عند الأقصر في **صمت**، و [[zip_longest]] بيكمّل بـ [[fillvalue]] | عمودين من مصدرين مختلفين |
| [[zip(..., strict=True)]] (3.10+) | بيرمي [[ValueError]] لو الأطوال مختلفة | لما الاختلاف معناه داتا بايظة ولازم تعرف |
| [[combinations]] و [[permutations]] | توافيق من غير ترتيب (٣) ومع ترتيب (٦) | كل أزواج منتجين بيتشروا مع بعض، أو كل مباريات دوري |
| [[starmap(f, pairs)]] | بتنادي [[f(*pair)]] لكل tuple | [[pow(2, 3)]] و [[pow(10, 2)]] من لستة أزواج |
| [[cycle]] و [[repeat]] | تكرار لستة للأبد، أو قيمة N مرة | توزيع طلبات round-robin على سيرفرين |
| [[compress(data, flags)]] | بتاخد العناصر اللي الـ flag بتاعها [[True]] | فلتر بعمود [[is_active]] جاي من CSV |

---

## ١١. الـ iterator بيتقري مرة واحدة

~~~python
it = iter([1, 2, 3]); print(sum(it), sum(it))
gen = (x * 2 for x in range(3)); print(list(gen), list(gen))
sales = [("Alex", 80), ("Cairo", 150), ("Alex", 20)]
groups = {k: g for k, g in groupby(sorted(sales), key=lambda x: x[0])}
print({k: list(g) for k, g in groups.items()})
~~~

~~~text الناتج
6 0
[0, 2, 4] []
{'Alex': [], 'Cairo': []}
~~~

- [[sum(it)]] التانية [[0]]: الـ iterator خلص في الأولى ومبيرجعش من الأول. نفس الكلام مع generator ومع أي حاجة من [[itertools]] ومع ملف مفتوح. لو محتاج تلف مرتين: [[list(...)]] مرة واحدة واحتفظ بيها.
- الأخطر: حفظت groups [[groupby]] في dict وقريتهم بعدين، **فضيوا كلهم**. كل group بيبوظ لما [[groupby]] يتحرك للي بعده. الحل [[{k: list(g) for k, g in groupby(...)}]] (حوّل جوه اللفة).

وفايدة الـ laziness بالأرقام:

~~~text اتقاس بـ tracemalloc: sum على مليون مربع
list: sum([x * x for x in range(1_000_000)])   38.6 MB peak
gen:  sum(x * x for x in range(1_000_000))      0.0 MB peak
~~~

القوسين المربعين عملوا list فيها مليون رقم الأول (٣٨.٦ ميجا)، والقوسين العاديين عملوا generator بيدّي رقم رقم. نفس الناتج.

## الخلاصة

| الأداة | بتعمل إيه | مثال |
|---|---|---|
| [[chain(a, b)]] | ورا بعض | [[1, 2, 3, 4]] |
| [[batched(it, n)]] | دفعات بحجم n | [[(0, 1, 2), (3, 4, 5), (6,)]] |
| [[pairwise(it)]] | أزواج متتالية | [[(100, 120), (120, 90)]] |
| [[accumulate(it)]] | مجموع متراكم | [[100, 70, 120]] |
| [[product(a, b)]] | كل التوافيق | ٤ أزواج |
| [[count(start)]] | عدّاد ملوش آخر | مع [[next]] أو [[islice]] |
| [[groupby(it, key)]] | تجميع المتجاور | رتّب بنفس الـ key الأول |

- كله iterators: بتتلف مرة واحدة، و [[list()]] عشان تشوف القيم.`,
          lines: [
            R`ثمن أدوات من [[itertools]]: [[chain]] توصيل، و [[batched]] دفعات (3.12+)، و [[pairwise]] أزواج متتالية (3.10+)، و [[accumulate]] تراكم، و [[product]] توافيق، و [[count]] عدّاد مالوش آخر، و [[islice]] قص من iterator، و [[groupby]] تجميع المتجاور. كلهم بيرجّعوا iterators كسولة (lazy).`,
            R`[[itemgetter(0)]] من [[operator]] بترجّع دالة بتجيب العنصر رقم ٠، يعني زي [[lambda x: x[0]]] بس أسرع شوية وأوضح كـ [[key=]]. و [[itemgetter(0, 2)]] بترجّع tuple من الاتنين.`,
            R`[[chain]] بتلف على list وبعدين tuple وبعدين range كأنهم واحد، **من غير** ما تعمل list جديدة فيها الكل. و [[list(...)]] حوالينها عشان نشوف القيم؛ من غيرها هيطبع [[<itertools.chain object at ...>]].`,
            R`[[batched(range(7), 3)]] بيقسّم لدفعات tuples بحجم ٣، والأخيرة أصغر لو العدد مش بيتقسم: [[(6,)]]. ده اللي بتستخدمه عشان تبعت ١٠ آلاف صف للداتابيز أو API ١٠٠ ١٠٠. و من 3.13 [[strict=True]] بيرمي لو الأخيرة ناقصة.`,
            R`[[pairwise]] كل عنصر مع اللي بعده: [[(100, 120)]] و [[(120, 90)]]. عدد الأزواج أقل بواحد من العناصر. مفيد للفروق ([[b - a]] = التغيّر من يوم لليوم اللي بعده) أو للمسافة بين نقط.`,
            R`[[accumulate]] بيرجّع المجموع المتراكم بعد كل عنصر: ١٠٠، وبعدين ١٠٠-٣٠=٧٠، وبعدين ٧٠+٥٠=١٢٠. ده رصيد حساب بعد كل عملية. وبياخد دالة تانية: [[accumulate(xs, max)]] = أعلى قيمة لحد دلوقتي.`,
            R`[[product]] كل التوافيق بين اللستتين (زي for جوه for): ٢ مقاس × ٢ لون = ٤ tuples [[('S', 'red')]] لحد [[('M', 'blue')]]. و [[product(range(3), repeat=2)]] = كل الأزواج من ٠ لـ ٢. خلي بالك العدد بيتضرب بسرعة.`,
            R`[[count(start=1000)]] عدّاد بيطلّع ١٠٠٠، ١٠٠١، ١٠٠٢... من غير آخر. [[list(count())]] هتعلّق البرنامج وتاكل الذاكرة، فلازم تاخد منه بـ [[next]] أو [[islice]] أو [[zip]] مع حاجة ليها آخر.`,
            R`[[next(it)]] بتاخد القيمة الجاية من iterator وبتحرّكه خطوة، فطلعت [[1000 1001]]. الـ iterator **فاكر هو وصل فين**، فالجاي هيبدأ من ١٠٠٢. ولو iterator خلص، [[next]] بترمي [[StopIteration]] (أو بترجّع default لو كتبت [[next(it, None)]]).`,
            R`[[islice(ids, 3)]] بتاخد ٣ عناصر بس من iterator مالوش آخر، زي [[[:3]]] بس لأي iterator. وبدأت من [[1002]] لأن [[next]] خد الاتنين الأولانيين.`,
            R`list مبيعات (مدينة، مبلغ) **مش مترتبة**: الإسكندرية في الأول والآخر. ده الشكل اللي هيبوّظ [[groupby]] لو نسيت السطر الجاي.`,
            R`[[sort(key=itemgetter(0))]] بيرتّب في نفس الليستة بالمدينة. لازم قبل [[groupby]]، لأنه بيجمّع العناصر **المتجاورة** بس: من غير الترتيب كان هيطلع [[Alex]] مرتين كمجموعتين (اتجرّب: [[('Alex', 80), ('Cairo', 150), ('Alex', 20)]]).`,
            R`[[groupby]] بيرجّع لكل مجموعة متجاورة المفتاح ([[city]]) و iterator على عناصرها ([[group]]). الـ group ده **بيتقري مرة واحدة** وبيبوظ لما [[groupby]] يتحرك للمجموعة اللي بعدها، فاستخدمه جوه اللفة على طول.`,
            R`[[sum(amount for _, amount in group)]] بيجمع المبالغ في المجموعة، و [[_]] اسم للحاجة اللي مش محتاجينها (المدينة متكررة). الناتج [[Alex 100]] ثم [[Cairo 195]]. ولو التجميع بس هو المطلوب، [[defaultdict(int)]] أبسط ومش محتاج ترتيب.`,
          ]
        },
        {
          cmd: "functools",
          title: "lru_cache و partial و cached_property و reduce",
          desc: R`[[functools]] أدوات للدوال: [[@lru_cache]] بيحفظ ناتج الدالة لكل مجموعة باراميترات (memoization)، و [[partial]] بيثبّت باراميترات في دالة ويرجّع دالة جديدة، و [[@cached_property]] خاصية بتتحسب مرة واحدة لكل object، و [[reduce]] بيطبّق دالة على عناصر بالتراكم، و [[wraps]] اللي شفناه في درس «decorators».`,
          example: R`import time
from functools import cached_property, lru_cache, partial, reduce
@lru_cache(maxsize=256)
def exchange_rate(currency: str) -> float:
    time.sleep(0.5)
    return {"USD": 48.5, "EUR": 56.9}[currency]
exchange_rate("USD")
exchange_rate("USD")
print(exchange_rate.cache_info())      # CacheInfo(hits=1, misses=1, maxsize=256, currsize=1)
exchange_rate.cache_clear()
def price_with_tax(amount: float, rate: float) -> float:
    return round(amount * (1 + rate), 2)
egypt_vat = partial(price_with_tax, rate=0.14)
print(egypt_vat(100), list(map(egypt_vat, [10, 20])))   # 114.0 [11.4, 22.8]
print_err = partial(print, "ERROR:", sep=" | ")
print_err("disk full")                                 # ERROR: | disk full
print(reduce(lambda acc, x: acc * x, [1, 2, 3, 4], 1))  # 24
class Report:
    def __init__(self, rows: list[int]):
        self.rows = rows
    @cached_property
    def total(self) -> int:
        print("بحسب...")
        return sum(self.rows)
r = Report([1, 2, 3])
print(r.total, r.total)                                 # بحسب... مرة واحدة ثم 6 6
exchange_rate(["USD"])                                  # TypeError: unhashable type: 'list'`,
          try: R`(١) اكتب [[ways(n)]] عدد طرق طلوع سلم n درجة بخطوة أو خطوتين ([[ways(n-1) + ways(n-2)]]) بـ [[@lru_cache(maxsize=None)]] واطبع [[ways(80)]] وعدد النداءات الفعلية و [[cache_info()]]. جرّب تشيل الـ cache على [[ways(35)]] وقارن الوقت. (٢) من دالة [[fmt(amount, currency, decimals=2)]] اعمل [[egp]] و [[usd]] بـ [[partial]]، و [[usd]] من غير كسور.`,
          sol: R`(١) [[ways(80)]] = [[37889062373143906]] في أجزاء من الثانية، والدالة اتنفّذت [[81]] مرة بس (مرة لكل n من 0 لـ 80)، و [[cache_info()]] بيقول [[hits=78, misses=81]]. من غير الـ cache، [[ways(35)]] لوحدها بتعمل حوالي ٣٠ مليون نداء وبتاخد ثواني، و [[ways(80)]] مش هتخلص. ده الفرق بين O(n) و O(2^n)، ونفس فكرة الـ dynamic programming في تاب DSA.

(٢) [[egp(12500.5)]] = [[12,500.50 EGP]]، و [[usd(99.6)]] = [[100 USD]]، و [[egp(3, decimals=0)]] = [[3 EGP]]: الباراميتر اللي partial ثبّته بالاسم ينفع يتغير وقت النداء. الغلطة الشائعة: [[partial(fmt, "EGP")]] بالمكان، فالـ EGP تروح لـ [[amount]] مش [[currency]].`,
          solCode: R`import time
from functools import lru_cache, partial
calls = 0
@lru_cache(maxsize=None)
def ways(n: int) -> int:
    global calls
    calls += 1
    if n <= 1:
        return 1
    return ways(n - 1) + ways(n - 2)
start = time.perf_counter()
print(ways(80), calls, f"{time.perf_counter() - start:.4f}s")
print(ways.cache_info())
def fmt(amount: float, currency: str, decimals: int = 2) -> str:
    return f"{amount:,.{decimals}f} {currency}"
egp = partial(fmt, currency="EGP")
usd = partial(fmt, currency="USD", decimals=0)
print(egp(12500.5), usd(99.6), egp(3, decimals=0))`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من الذاكرة: الفرق بين [[lru_cache]] و [[cache]] و [[cached_property]] (بيحفظ فين، ولكل إيه، وإمتى بيتمسح)، و [[partial]] بتعمل إيه، و [[wraps]] بتحل مشكلة إيه.`, done: R`كاتب: lru_cache على الدالة بحد ومفتاحها الـ arguments، و cache نفس الحاجة من غير حد، و cached_property في [[__dict__]] بتاع كل object وبيتمسح بـ [[del]]، وجرّبت [[cache_info]] و [[del r.total]] بنفسك.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[@lru_cache(maxsize=2) def sq(x): print("calc", x); return x * x]]، وبعدين [[sq(1); sq(2); sq(1); sq(3); sq(2)]]. كام مرة [[calc]] هتتطبع وبأنهي أرقام؟ وإيه [[sq.cache_info()]] في الآخر؟`, done: R`[[calc 1]] و [[calc 2]] و [[calc 3]] و [[calc 2]] (٤ مرات: لما ٣ دخلت، الـ ٢ كانت الأقدم استخدامًا فاتشالت)، و [[CacheInfo(hits=1, misses=4, maxsize=2, currsize=2)]]، وشغّلته وطابق.` },
            { lvl: 'تطبيق', t: R`**صلّح:** decorator [[retry(fn)]] بيعيد الدالة ٣ مرات لو رمت، بس [[help(fetch)]] بيقول [[wrapper]] و FastAPI بيشوف [[*args, **kwargs]] بدل باراميترات [[fetch]]. صلّحه بـ [[wraps]] واتأكد بـ [[inspect.signature(fetch)]].`, done: R`بعد التصليح [[fetch.__name__]] بـ [[fetch]]، و [[inspect.signature(fetch)]] بيطبع الباراميترات الحقيقية، و [[fetch.__wrapped__]] موجودة، والـ retry لسه شغال (دالة بترمي مرتين وتنجح التالتة بترجّع النتيجة).` },
            { lvl: 'تطبيق', t: R`**ابني:** [[ttl_cache(seconds)]] decorator زي [[lru_cache]] بس كل قيمة ليها مدة صلاحية، وبيستخدم [[time.monotonic()]] و [[wraps]]، وفيه [[.cache_clear()]]. جرّبه بدالة سعر صرف وبـ [[seconds=1]].`, done: R`نداءين ورا بعض = حسبة واحدة، وبعد [[time.sleep(1.1)]] بتتحسب تاني، و [[cache_clear()]] بيمسح، والدالة لسه اسمها صح، و ٣ اختبارات pytest بتعدّي (بتبدّل [[time.monotonic]] بـ [[monkeypatch]] بدل ما تستنى).` },
            { lvl: 'تطبيق', t: R`**refactor:** دالة [[render(value)]] فيها ٦ [[elif isinstance]] (int و float و str و date و Decimal و list). حوّلها [[singledispatch]] من غير ما يتغيّر أي ناتج، وزوّد نوع جديد ([[datetime]] بساعة) من ملف تاني.`, done: R`نفس ١٠ نداءات قبل وبعد بيطلّعوا نفس النص بالظبط (قارنتهم بـ [[assert]])، ومفيش ولا [[isinstance]] في الكود الجديد، و [[datetime]] بياخد نسخته هو مش نسخة [[date]].` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** مسألة «عدد طرق طلوع سلم N درجة بخطوة ١ أو ٢ أو ٣». حلها (١) تكرار عادي (٢) [[@cache]] (٣) loop بـ ٣ متغيرات. قيس الوقت لـ N = ٢٥ و ٣٠٠ و ٥٠٠٠.`, done: R`الناتج واحد في الطرق اللي اشتغلت، وجدول أوقات من جهازك: التكرار العادي بيبقى مستحيل بعد ٣٠ تقريبًا، والـ cache بيقع [[RecursionError]] عند ٥٠٠٠ (أو كاتب ليه لأ)، والـ loop بيخلص الكل في أقل من ثانية.` },
          ],
          deep: {
            why: R`[[lru_cache]] بيحوّل حسبة متكررة غالية (إعدادات، سعر صرف، recursion) لـ lookup. و [[partial]] بتلاقيه في كود callbacks ومع [[map]] ومع [[run_in_executor]] اللي مبيقبلش keyword arguments. و [[@lru_cache]] على [[get_settings]] هو الـ pattern الرسمي في FastAPI (درس «pydantic-settings»).`,
            how: R`[[@lru_cache(maxsize=256)]] بيعمل dict من الباراميترات للناتج، ولما يتملى بيشيل الأقدم استخدامًا (Least Recently Used). [[maxsize=None]] أو [[@cache]] (3.9+) من غير حد. والباراميترات لازم hashable (مفيش list ولا dict)، و [[f(1)]] و [[f(x=1)]] بيتخزنوا كمفتاحين مختلفين. و [[cache_info()]] و [[cache_clear()]] للمتابعة والمسح.

الـ cache ده في ذاكرة الـ process: مفيش TTL (القيمة مبتنتهيش)، ومش مشترك بين الـ workers، وبيتمسح لما الـ process يقفل. للداتا اللي بتتغير: Redis (المستوى ٣). ولو الدالة async، [[lru_cache]] هيخزّن الـ coroutine نفسه مش الناتج، والنداء التاني هيقع بـ [[cannot reuse already awaited coroutine]]، فمينفعش.

[[partial(f, *args, **kwargs)]] بيرجع callable لما تناديه بيضيف الباراميترات المتثبتة. و [[cached_property]] بتحسب أول مرة وتحط الناتج في [[__dict__]] بتاع الـ object، فبعد كده بتتقري كخاصية عادية (ومش شغالة مع [[slots=True]]).

[[reduce(f, items, initial)]] بتطبّق [[f(acc, x)]] على كل عنصر. غالبًا [[sum]] و [[max]] و [[math.prod]] و loop أوضح منها، وده سبب إنها اتنقلت من الـ built-ins لـ functools.`,
            when: R`[[lru_cache]] لدوال pure (نفس الباراميترات = نفس الناتج دايمًا) وغالية. [[cached_property]] لحسبة تقيلة على object مبيتغيرش. [[partial]] لما تحتاج تبعت دالة بباراميترات متثبتة لحد تاني.`,
            mistakes: R`[[lru_cache]] على دالة بتقرا من القاعدة أو الوقت (الداتا القديمة تفضل راجعة). وعلى method ([[self]] بيبقى جزء من المفتاح والـ object مبيتمسحش من الذاكرة). وعلى دالة async. وباراميتر list: [[TypeError: unhashable type: 'list']]. و [[maxsize=None]] على دالة باراميتراتها جاية من المستخدمين (الذاكرة بتكبر من غير حد).`
          },
          teach: R`## المثال بيعمل إيه؟

٤ أدوات من [[functools]] في ٤ حتت: [[lru_cache]] بيحفظ سعر صرف بدل ما يستنى كل مرة، و [[partial]] بيعمل نسخة من دالة باراميتر فيها متثبت، و [[reduce]] بيضرب أرقام بالتراكم، و [[cached_property]] بيحسب خاصية مرة واحدة. اتشغّل على ويندوز (Python 3.14.3) وعلى لينكس ([[python:3.13-slim]] في Docker) بنفس الناتج.

~~~python
import time
from functools import cached_property, lru_cache, partial, reduce
~~~

[[time]] عشان [[time.sleep]] (استنى) و [[time.perf_counter]] (ساعة دقيقة لقياس الوقت). و [[functools]] = function tools، أدوات بتشتغل على الدوال.

---

## ١. [[@lru_cache]]

~~~python
@lru_cache(maxsize=256)
def exchange_rate(currency: str) -> float:
    time.sleep(0.5)
    return {"USD": 48.5, "EUR": 56.9}[currency]
~~~

- [[@...]] فوق [[def]] = decorator (درس «decorators»): بيلف الدالة بدالة تانية. هنا اللفافة بتحفظ الناتج.
- [[time.sleep(0.5)]]: استنى نص ثانية، كأن الدالة بتسأل API بطيء.
- [[{"USD": 48.5, "EUR": 56.9}[currency] ]]: dict وبنطلب منه المفتاح على طول.
- LRU = Least Recently Used: لما الـ cache يتملى (256 قيمة)، اللي بيتشال هو **أقدم واحد محدش طلبه**.

~~~python
exchange_rate("USD")
exchange_rate("USD")
print(exchange_rate.cache_info())
exchange_rate.cache_clear()
~~~

~~~text الناتج
CacheInfo(hits=1, misses=1, maxsize=256, currsize=1)
~~~

| الخانة | معناها | ليه القيمة دي |
|---|---|---|
| [[misses=1]] | مرات اتحسبت فعلًا | أول نداء: مش موجود، اتنفّذت ونامت نص ثانية |
| [[hits=1]] | مرات رجعت من الـ cache | تاني نداء بنفس الباراميتر |
| [[maxsize=256]] | الحد الأقصى | اللي كتبناه |
| [[currsize=1]] | المحفوظ دلوقتي | قيمة واحدة: USD |

قسنا الوقت: النداء الأول [[0.5004s]] والتاني [[0.0000s]]. و [[cache_clear()]] بيفضّي الـ cache كله (لما السعر يتغير مثلًا).

> المفتاح بيتعمل من الباراميترات **زي ما اتكتبت**: [[f("USD")]] وبعدها [[f(c="USD")]] اتحسبوا مرتين ([[misses=2]]).

---

## ٢. [[partial]]

~~~python
def price_with_tax(amount: float, rate: float) -> float:
    return round(amount * (1 + rate), 2)
egypt_vat = partial(price_with_tax, rate=0.14)
print(egypt_vat(100), list(map(egypt_vat, [10, 20])))
~~~

~~~text الناتج
114.0 [11.4, 22.8]
~~~

- [[partial(f, rate=0.14)]]: دالة جديدة لما تناديها بتنادي [[f]] وتضيف [[rate=0.14]] لوحدها. فـ [[egypt_vat(100)]] = [[price_with_tax(100, rate=0.14)]].
- [[round(..., 2)]] ليه؟ [[10 * 1.14]] لوحدها طلعت [[11.399999999999999]]: الـ float مبيخزنش الكسور العشرية بالظبط. التقريب بيرجّعها [[11.4]].
- [[map(egypt_vat, [10, 20])]]: نادي الدالة على كل عنصر. [[map]] بتبعت باراميتر واحد بس، وده بالظبط سبب الـ partial هنا: الدالة الأصلية محتاجة اتنين.

~~~python
print_err = partial(print, "ERROR:", sep=" | ")
print_err("disk full")
~~~

~~~text الناتج
ERROR: | disk full
~~~

هنا ثبّتنا باراميتر **بالمكان** ([["ERROR:"]] أول واحد) وواحد بالاسم ([[sep]]: اللي [[print]] بيحطه بين الحاجات بدل المسافة). فالنداء بقى [[print("ERROR:", "disk full", sep=" | ")]].

---

## ٣. [[reduce]]

~~~python
print(reduce(lambda acc, x: acc * x, [1, 2, 3, 4], 1))
~~~

~~~text الناتج
24
~~~

[[reduce(f, items, initial)]]: ابدأ بـ [[acc = initial]]، ولكل عنصر [[acc = f(acc, x)]]:

| الخطوة | [[acc]] | [[x]] | [[acc * x]] |
|---|---|---|---|
| ١ | 1 | 1 | 1 |
| ٢ | 1 | 2 | 2 |
| ٣ | 2 | 3 | 6 |
| ٤ | 6 | 4 | 24 |

[[acc]] اختصار accumulator (المتراكم). ونفس النتيجة أوضح بـ [[math.prod([1, 2, 3, 4])]].

---

## ٤. [[@cached_property]]

~~~python
class Report:
    def __init__(self, rows: list[int]):
        self.rows = rows
    @cached_property
    def total(self) -> int:
        print("بحسب...")
        return sum(self.rows)
r = Report([1, 2, 3])
print(r.total, r.total)
~~~

~~~text الناتج
بحسب...
6 6
~~~

- [[@cached_property]] بيخلّي [[total]] تتقري كخاصية من غير أقواس ([[r.total]] مش [[r.total()]])، وتتحسب أول مرة بس.
- ليه [[بحسب...]] اتطبعت **قبل** [[6 6]]؟ لأن Python بيحسب كل الباراميترات اللي جوه [[print(...)]] الأول، وبعدين يطبع. أول [[r.total]] حسبت وطبعت، والتانية رجعت 6 من غير حساب.
- اتحفظت فين؟ في [[__dict__]] بتاع الـ object نفسه. جربنا على class صغير: قبل القراية [[{}]] وبعدها [[{'t': 6}]]. فكل object ليه نسخته.

---

## ٥. السطر الأخير: باراميتر list

~~~text الناتج: exchange_rate(["USD"])
TypeError: unhashable type: 'list'
~~~

الـ cache dict، ومفاتيح الـ dict لازم تبقى **hashable**: قيمة مبتتغيرش (str و int و tuple). الـ list ممكن تتغير بعد ما تتخزن، فـ Python بيرفضها. حوّلها [[tuple(...)]] لو محتاج.

---

## ٦. الحل: السلم و [[partial]] بالاسم

~~~python solCode (ways)
@lru_cache(maxsize=None)
def ways(n: int) -> int:
    global calls
    calls += 1
    if n <= 1:
        return 1
    return ways(n - 1) + ways(n - 2)
~~~

- [[maxsize=None]]: من غير حد.
- [[global calls]]: عشان نعدّل المتغير اللي برّه الدالة. [[calls]] بيزيد بس لما الدالة تتنفّذ فعلًا (miss)، مش لما ترجع من الـ cache.

~~~text الناتج
37889062373143906 81 0.0003s
CacheInfo(hits=78, misses=81, maxsize=None, currsize=81)
12,500.50 EGP 100 USD 3 EGP
~~~

- [[81]] تنفيذ = n من 0 لـ 80، كل واحد مرة.
- [[hits=78]]: كل [[ways(n)]] من 3 لـ 80 بتنادي [[ways(n - 2)]] بعد ما [[ways(n - 1)]] حسبتها، فبترجع من الـ cache: ٧٨ مرة. (عند [[ways(2)]] الـ [[ways(0)]] كانت لسه أول مرة.)
- ومن غير الـ cache، [[ways(35)]] لوحدها:

~~~text الناتج: نفس الدالة من غير lru_cache
14930352 29860703 2.9s
~~~

حوالي ٣٠ مليون نداء في ٣ ثواني لـ n = 35، والعدد بيتضاعف تقريبًا مع كل زيادة في n، فـ 80 مش هتخلص.

~~~python solCode (fmt)
def fmt(amount: float, currency: str, decimals: int = 2) -> str:
    return f"{amount:,.{decimals}f} {currency}"
egp = partial(fmt, currency="EGP")
usd = partial(fmt, currency="USD", decimals=0)
~~~

- [[{amount:,.2f}]]: [[,]] فاصلة كل ٣ أرقام، و [[.2f]] رقمين بعد العلامة. و [[{decimals}]] جوه الـ format نفسه بيحط الرقم من المتغير.
- [[egp(3, decimals=0)]] طلعت [[3 EGP]]: الباراميتر اللي partial ثبّته بالاسم ينفع يتغير وقت النداء.
- لو ثبّت [["EGP"]] بالمكان ([[partial(fmt, "EGP")]])، هيروح لـ [[amount]]، وجربناها: [[ValueError: Unknown format code 'f' for object of type 'str']].

---

## ٧. [[@cache]] و [[@wraps]] و [[@singledispatch]]

### [[@cache]]: الـ cache من غير حد

~~~python
from functools import cache
@cache
def fib(n): return n if n < 2 else fib(n-1) + fib(n-2)
print(fib(200), fib.cache_info())
~~~

~~~text الناتج (Python 3.14)
280571172992510140037611932413038677189525 CacheInfo(hits=198, misses=201, maxsize=None, currsize=201)
~~~

- [[@cache]] (3.9+) = [[@lru_cache(maxsize=None)]]: بيحفظ كل حاجة ومبيرميش، وأسرع شوية لأنه مش بيتابع الترتيب. [[fib(30)]] من غير cache أخدت **١١٤ ملي ثانية** (حوالي ١.٦ مليون نداء)، وبالـ cache **٥٢ ميكروثانية** (٣١ نداء بس). نفس الكود بسطر زيادة.
- العيب: مالوش حد، فلو الـ arguments مالهاش آخر (IDs يوزرز في سيرفر شغال أسابيع) الذاكرة هتفضل تكبر. في سيرفر استخدم [[lru_cache(maxsize=...)]].
- [[fib(5000)]] من غير ما تبني الـ cache تدريجيًا بترمي [[RecursionError: maximum recursion depth exceeded]]: الـ cache مبيلغيش عمق التكرار. احسب [[fib(i)]] بالترتيب الأول أو اكتبها بـ loop.

### فخاخ الـ cache

~~~python
@lru_cache
def f(x): return type(x).__name__
print(f(1), f(1.0), f.cache_info().currsize)
class Svc:
    @lru_cache
    def get(self, k): return k * 2
s = Svc(); s.get(1); r = weakref.ref(s); del s; gc.collect(); print("alive after del:", r() is not None)
~~~

~~~text الناتج
int float 2
alive after del: True
~~~

- [[1 == 1.0]] و الـ hash بتاعهم واحد، ومع كده اتحفظوا كمفتاحين (تفصيلة في طريقة بناء المفتاح في CPython). متعتمدش على إن «القيم المتساوية» هتشارك نفس الـ entry، ولو عايز تفرقة صريحة بالنوع: [[lru_cache(typed=True)]].
- [[@lru_cache]] على **method**: [[self]] جزء من المفتاح، فالـ cache ماسك الـ object و [[del s]] مبيمسحوش من الذاكرة (اتأكدت بـ [[weakref]]: لسه عايش). في سيرفر بيعمل object لكل request ده memory leak. الحل [[cached_property]] (لكل object لوحده)، أو cache على دالة برّه الـ class.

### [[@wraps]]: الـ decorator ميضيّعش اسم الدالة

~~~python
def timed(fn):
    @wraps(fn)
    def wrapper(*a, **k):
        t = time.perf_counter(); r = fn(*a, **k)
        print(f"{fn.__name__}: {(time.perf_counter()-t)*1000:.1f} ms"); return r
    return wrapper
~~~

~~~text الناتج: load.__name__ و load.__doc__ مع @wraps ومن غيره
مع wraps:   load Load orders.
من غيره:    wrapper None
~~~

من غير [[@wraps(fn)]]، الدالة الملفوفة اسمها بقى [[wrapper]] والـ docstring ضاع، فاللوج و [[help()]] والـ tracebacks وFastAPI (اللي بيقرا الـ signature) بيشوفوا الـ wrapper مش دالتك. [[wraps]] بينسخ الاسم والـ doc والـ annotations، وبيحط [[__wrapped__]] بيشاور على الأصلية. (درس decorators في وحدة الدوال.)

### [[@singledispatch]]: دالة بتختار الكود حسب النوع

~~~python
from functools import singledispatch
from datetime import date
from decimal import Decimal
@singledispatch
def to_json(value):
    raise TypeError(f"can't serialize {type(value).__name__}")
@to_json.register
def _(value: date) -> str:
    return value.isoformat()
@to_json.register
def _(value: Decimal) -> str:
    return str(value)
@to_json.register(set)
def _(value) -> list:
    return sorted(value)
print(to_json(date(2026, 9, 29)), to_json(Decimal("19.99")), to_json({3, 1}))
to_json(1+2j)
~~~

~~~text الناتج
2026-09-29 19.99 [1, 3]
TypeError: can't serialize complex
~~~

- [[@singledispatch]] على الدالة الأساسية (اللي بتتنادى لو مفيش نسخة للنوع)، و [[@to_json.register]] بيضيف نسخة للنوع اللي في الـ type hint بتاع أول باراميتر. أو [[register(set)]] صريح.
- بدل سلسلة [[if isinstance(value, date): ... elif isinstance(value, Decimal): ...]] بتكبر في دالة واحدة، كل نوع في مكانه، وأي حد يضيف نوع من موديول تاني من غير ما يلمس الأصلية. وبتشتغل مع الوراثة: [[datetime]] ابن [[date]] فبياخد نسخة [[date]].
- وتنفع [[json.dumps(x, default=to_json)]] على طول (درس csv و json).

## الخلاصة

| الأداة | بتعمل إيه | خلي بالك |
|---|---|---|
| [[@lru_cache(maxsize=n)]] | تحفظ الناتج لكل باراميترات | للدوال pure بس، والباراميترات hashable |
| [[cache_info()]] و [[cache_clear()]] | إحصائيات ومسح | |
| [[partial(f, k=v)]] | دالة جديدة بباراميتر متثبت | ثبّت بالاسم |
| [[@cached_property]] | خاصية بتتحسب مرة لكل object | |
| [[reduce(f, items, init)]] | تراكم | [[sum]] و [[math.prod]] غالبًا أوضح |`,
          lines: [
            R`[[time]] عشان [[time.sleep]] تمثّل دالة بطيئة (طلب لـ API بياخد نص ثانية)، فنشوف الـ cache بيوفّر قد إيه.`,
            R`أربع أدوات من [[functools]]: [[lru_cache]] تفتكر نتايج دالة، و [[partial]] نسخة من دالة باراميتراتها متثبتة، و [[reduce]] تراكم بدالة، و [[cached_property]] خاصية بتتحسب مرة. والقسم الأخير في الشرح فيه [[cache]] و [[wraps]] و [[singledispatch]].`,
            R`[[@lru_cache(maxsize=256)]] بيحفظ نتيجة كل مجموعة arguments في dict. لو نفس الـ arguments اتنادت تاني، بيرجّع المحفوظ من غير ما يشغّل الدالة. ولما يتملى ٢٥٦، بيرمي **الأقدم استخدامًا** (Least Recently Used). و [[maxsize=None]] من غير حد.`,
            R`دالة سعر الصرف: اسم العملة داخل ورقم طالع. مناسبة للـ cache لأن نفس الـ input بيدّي نفس الـ output (على الأقل لفترة)، ومفيهاش side effects لازم تحصل كل مرة.`,
            R`[[time.sleep(0.5)]] بيمثّل نداء شبكة بطيء. ده الوقت اللي الـ cache بيوفّره في كل نداء متكرر.`,
            R`dict ثابت بيمثّل رد الـ API، و [[[currency]]] بيجيب السعر. عملة مش موجودة بترمي [[KeyError]]، و [[lru_cache]] **مبيحفظش** الـ exceptions: النداء الجاي هيجرّب تاني.`,
            R`أول نداء بـ [[USD]]: مش في الـ cache (miss)، فالدالة اشتغلت وأخدت نص ثانية واتحفظت النتيجة.`,
            R`تاني نداء بنفس الـ argument: من الـ cache على طول (hit)، من غير [[sleep]]، في ميكروثواني.`,
            R`[[cache_info()]] إحصائيات: [[hits=1]] (نداء جه من الـ cache)، و [[misses=1]] (نداء اتحسب)، و [[maxsize=256]]، و [[currsize=1]] (قيمة واحدة محفوظة). لو الـ hits قليلة جدًا، الـ cache مش بيفيد وبياكل ذاكرة.`,
            R`[[cache_clear()]] بيمسح كل المحفوظ. لازم لما الداتا الأصلية تتغيّر (سعر الصرف اتحدّث)، لأن [[lru_cache]] ملوش مدة صلاحية (TTL)، وهيفضل يرجّع القديم للأبد.`,
            R`دالة عامة بتاخد المبلغ ونسبة الضريبة. هنعمل منها نسخة مخصصة لمصر من غير ما نكتب دالة جديدة.`,
            R`المبلغ في (١ + النسبة)، مقرّب لرقمين. [[round(100 * 1.14, 2)]] بـ [[114.0]].`,
            R`[[partial(price_with_tax, rate=0.14)]] بترجّع دالة جديدة لما تتنادى بتنادي الأصلية و [[rate=0.14]] متحطوطة لوحدها. مفيدة لما مكتبة بتطلب دالة بباراميتر واحد (زي [[map]] أو callback) والدالة بتاعتك محتاجة اتنين.`,
            R`[[egypt_vat(100)]] = [[price_with_tax(100, rate=0.14)]] = [[114.0]]، و [[map]] بتناديها على كل عنصر: [[[11.4, 22.8]]]. ولو كنت هتكتب [[lambda x: price_with_tax(x, 0.14)]]، [[partial]] أوضح وبيبان في الـ repr.`,
            R`[[partial]] على [[print]] نفسها: أول argument ([["ERROR:"]]) متثبت في الأول، و [[sep=" | "]] متثبت كـ keyword. أي حاجة بتتبعتلها بعد كده بتيجي بعد [["ERROR:"]].`,
            R`[[print_err("disk full")]] = [[print("ERROR:", "disk full", sep=" | ")]]، فبتطبع [[ERROR: | disk full]]. الفاصل بيتحط بين كل argument والتاني.`,
            R`[[reduce(f, items, start)]] بتبدأ من [[1]] وبتنادي [[f(acc, x)]] لكل عنصر: ١×١، ثم ×٢، ثم ×٣، ثم ×٤ = [[24]]. الـ [[1]] في الآخر قيمة البداية؛ من غيرها لستة فاضية بترمي [[TypeError]]. ولحاصل الضرب بالذات [[math.prod]] أوضح، وللمجموع [[sum]].`,
            R`class تقرير فيه صفوف، وإجمالي غالي في الحساب (تخيّل مليون صف). عايزينه يتحسب مرة واحدة بس مهما اتقرى كام مرة.`,
            R`بياخد الصفوف كـ list أرقام.`,
            R`بيخزّنها في الـ object. الـ [[cached_property]] تحت هيعتمد إنها مش هتتغير.`,
            R`[[@cached_property]] أول قراية بتشغّل الـ method وتحط النتيجة في [[__dict__]] بتاع الـ object **بنفس الاسم**، فالقرايات الجاية بتلاقيها هناك ومبتنادييش الـ method خالص. ومحتاج [[__dict__]]، فمبيشتغلش مع [[slots=True]].`,
            R`الـ method اللي بتحسب الإجمالي. بتتنادى مرة واحدة لكل object.`,
            R`[[print]] كعلامة بنشوف بيها الحسبة حصلت كام مرة. في كود حقيقي ده مكان الشغل التقيل.`,
            R`المجموع. وخلي بالك: لو [[self.rows]] اتغيّرت بعد أول قراية، [[total]] هيفضل القديم. عشان تعيد الحساب: [[del r.total]].`,
            R`object تقرير بتلات صفوف. لسه محصلش أي حساب.`,
            R`أول [[r.total]] طبع [[بحسب...]] وحسب [[6]]، والتانية جت من [[__dict__]] من غير طباعة. الناتج سطر [[بحسب...]] وبعده [[6 6]]. ده الفرق عن [[@property]] اللي بتحسب في كل قراية.`,
            R`[[lru_cache]] بيستخدم الـ arguments كمفتاح dict، فلازم تبقى hashable. [[list]] مش hashable، فـ [[TypeError: unhashable type: 'list']]. الحل تبعت [[tuple]] أو [[frozenset]]، أو تحوّل جوه wrapper قبل الدالة المحفوظة.`,
          ]
        }
      ]
    }
]);

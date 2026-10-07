// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "collections و itertools و functools",
      l: 1,
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

| خطوة | الطابور |
|---|---|
| البداية | [[job1, job2]] |
| [[appendleft("urgent")]] | [[urgent, job1, job2]] |
| [[popleft()]] رجّعت [[urgent]] | [[job1, job2]] |
| [[pop()]] رجّعت [[job2]] | [[job1]] |

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

## الخلاصة

| النوع | استخدمه لـ | أهم حاجة |
|---|---|---|
| [[Counter]] | العدّ | [[most_common(n)]]، والمفتاح الناقص بصفر |
| [[defaultdict(factory)]] | group by | القراية بتضيف المفتاح |
| [[deque(maxlen=n)]] | طابور، أو آخر N | الناحيتين O(1) |
| [[namedtuple]] | tuple بأسماء | immutable |

- [[Counter("hello world")]] بيعد **حروف** ([[('l', 3)]] أولهم)، فللكلمات اعمل [[.split()]] الأول.`,
          lines: [
            "import الأربعة.",
            "list كلمات.",
            "عدّ في سطر.",
            "أكتر اتنين.",
            "مفتاح مش موجود: صفر، ومن غير KeyError.",
            "زوّد عدّ.",
            R`[[+]] بين Counters، و [[total()]] المجموع.`,
            "أزواج (مدينة، مستخدم).",
            "أي مدينة جديدة بتبدأ بـ list فاضية.",
            "لف.",
            R`من غير [[if city not in by_city]].`,
            R`[[dict()]] عشان يتطبع ويترجع كـ dict عادي.`,
            R`متداخل: مدينة ← صنف ← عدد.`,
            "المفتاحين اتعملوا لوحدهم.",
            R`طابور بحد أقصى ٣.`,
            "٤ صفحات.",
            "لما يتملى، الأقدم بيطلع لوحده.",
            "آخر ٣ بس.",
            "طابور عادي.",
            "ضيف في الأول: O(1).",
            R`[[popleft]] و [[pop]]: من الناحيتين O(1).`,
            "namedtuple: tuple بأسماء.",
            "object.",
            "بالاسم، والطباعة واضحة."
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
            "الأدوات.",
            R`[[itemgetter(0)]] = [[lambda x: x[0]]].`,
            "وصّل كذا iterable ورا بعض.",
            "دفعات بحجم ٣، والأخيرة أصغر.",
            "أزواج متتالية: مفيد للفروق.",
            "مجموع متراكم.",
            "كل التوافيق: مقاسات × ألوان.",
            "عدّاد مالوش آخر يبدأ من 1000.",
            R`[[next]] بتاخد القيمة الجاية.`,
            R`[[islice]] بتاخد ٣ من iterator مالوش آخر.`,
            "مبيعات.",
            R`رتّب بالمدينة الأول: [[groupby]] بيجمّع المتجاور بس.`,
            "لف على كل مجموعة.",
            "اجمع مبيعات المجموعة."
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

## الخلاصة

| الأداة | بتعمل إيه | خلي بالك |
|---|---|---|
| [[@lru_cache(maxsize=n)]] | تحفظ الناتج لكل باراميترات | للدوال pure بس، والباراميترات hashable |
| [[cache_info()]] و [[cache_clear()]] | إحصائيات ومسح | |
| [[partial(f, k=v)]] | دالة جديدة بباراميتر متثبت | ثبّت بالاسم |
| [[@cached_property]] | خاصية بتتحسب مرة لكل object | |
| [[reduce(f, items, init)]] | تراكم | [[sum]] و [[math.prod]] غالبًا أوضح |`,
          lines: [
            "للتأخير.",
            "الأدوات.",
            "cache بحد أقصى ٢٥٦ قيمة.",
            "دالة غالية (كأنها بتنادي API).",
            "نص ثانية.",
            "القيمة.",
            "أول مرة: بتتحسب (miss).",
            "تاني مرة: من الـ cache على طول (hit).",
            "إحصائيات الـ cache.",
            "امسح الـ cache (لما الداتا تتغير).",
            "دالة عامة.",
            "الحسبة.",
            R`[[partial]]: نسخة منها الـ rate فيها متثبت.`,
            "بتتنادى بباراميتر واحد، وتنفع مع map.",
            R`[[partial]] على [[print]] نفسها.`,
            "بتطبع بالبادئة والفاصل.",
            R`[[reduce]]: حاصل ضرب بالتراكم (وفيه [[math.prod]] أوضح).`,
            "class.",
            "الـ init.",
            "خزّن.",
            "خاصية بتتحسب أول مرة بس.",
            "method.",
            "علامة إن الحسبة حصلت.",
            "الحسبة.",
            "object.",
            "بحسب... مرة واحدة، وبعدين 6 و 6.",
            R`list مش hashable: [[lru_cache]] بيرمي.`
          ]
        }
      ]
    }
]);

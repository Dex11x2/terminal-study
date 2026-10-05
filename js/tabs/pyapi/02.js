// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "الدوال",
      l: 1,
      n: "باراميترات بالاسم وبالمكان، و decorators بتلف دالة جوه دالة، و generators بتطلّع قيم واحدة واحدة",
      items: [
        {
          cmd: "*args و **kwargs",
          title: "باراميترات بالمكان وبالاسم، و *args و **kwargs",
          desc: R`الدالة ممكن تتنادى بالمكان [[f(1, 2)]] أو بالاسم [[f(a=1, b=2)]]. والباراميتر اللي ليه default اختياري. و [[*args]] بيلم أي باراميترات زيادة بالمكان في tuple، و [[**kwargs]] بيلم الزيادة بالاسم في dict.

و [[*]] لوحدها في الباراميترات معناها «اللي بعدي بالاسم بس»: [[def paginate(q, *, page=1, size=20)]]، فمحدش يكتب [[paginate("x", 2, 50)]] ويلخبط الترتيب.`,
          example: R`def paginate(query: str, *, page: int = 1, size: int = 20) -> dict:
    return {"q": query, "offset": (page - 1) * size, "limit": size}
paginate("tea", page=2)
paginate("tea", 2)                    # TypeError: takes 1 positional argument but 2 were given
def log(msg: str, *args, **kwargs):
    print(msg, args, kwargs)
log("hi", 1, 2, user="sara")          # hi (1, 2) {'user': 'sara'}
def create_user(name: str, email: str, role: str = "user"):
    return {"name": name, "email": email, "role": role}
data = {"name": "Sara", "email": "s@x.com"}
create_user(**data)
nums = [3, 1, 2]
print(*nums)                          # 3 1 2`,
          try: R`اكتب دالة [[timed(fn, *args, **kwargs)]] بتنادي [[fn]] بنفس الباراميترات وتطبع الوقت اللي خدته بـ [[time.perf_counter()]]. وجرّبها على [[sorted]] بـ [[key]] و [[reverse=True]].`,
          flag: "script",
          deep: {
            why: R`دوال الـ API بتكبر: باراميترات كتير اختيارية، وترتيبها بيتلخبط. الـ keyword-only بتخلّي النداء مقروء وبتمنع الغلط، و [[**data]] بيفك dict في نداء واحد. و [[*args, **kwargs]] أساس الـ decorators (الدرس الجاي).`,
            how: R`ترتيب الباراميترات: العادية، وبعدين [[/]] (اللي قبلها بالمكان بس)، وبعدين [[*args]] أو [[*]]، وبعدين الـ keyword-only، و [[**kwargs]] في الآخر. مثال: [[def f(a, b, /, c, *, d, **kw)]].

وقت النداء، [[*list]] بيفك ليستة لباراميترات بالمكان، و [[**dict]] بيفك dict لباراميترات بالاسم. ولو في الـ dict مفتاح مش باراميتر في الدالة: TypeError (unexpected keyword argument).

الـ default بيتحسب مرة واحدة وقت تعريف الدالة، مش كل نداء، ودي غلطة مشهورة (أول سؤال في أسئلة الانترفيو آخر التاب).

وفي FastAPI اسم الباراميتر نفسه ليه معنى: [[page: int = 1]] في دالة route بيبقى query parameter اسمه page.`,
            when: R`[[*]] لأي دالة فيها أكتر من ٢ أو ٣ باراميترات اختيارية أو boolean flags. و [[**kwargs]] لما بتمرّر باراميترات لدالة تانية (wrappers و decorators). ومتستخدمهاش عشان تهرب من إنك تكتب الباراميترات صريحة.`,
            mistakes: R`[[def f(x, items=[])]]: الـ list بتتشارك بين كل النداءات. و [[def f(**kwargs)]] لكل حاجة: المحرر مش عارف الدالة بتاخد إيه، والغلطة الإملائية في اسم باراميتر بتعدّي بهدوء. و [[create_user(**request_json)]] من غير فحص: أي مفتاح زيادة بيوقّعها، والأخطر إن حد يبعت [[role="admin"]]. Pydantic بيحل ده (المستوى ٢).`
          },
          lines: [
            R`[[*]] لوحدها: [[page]] و [[size]] بالاسم بس، وليهم default.`,
            "بيرجع dict بالـ offset والـ limit.",
            "نداء سليم: الاسم واضح.",
            R`ممنوع: [[page]] لازم بالاسم.`,
            R`[[*args]] tuple للزيادة بالمكان، و [[**kwargs]] dict للزيادة بالاسم.`,
            "اطبعهم.",
            "1 و 2 راحوا args، و user راحت kwargs.",
            "باراميترين إجباريين وواحد اختياري.",
            "الجسم.",
            "dict جاي من حتة تانية.",
            R`[[**]] وقت النداء بيفك الـ dict لباراميترات بالاسم.`,
            "list.",
            R`[[*]] وقت النداء بيفك الـ list لباراميترات بالمكان.`
          ],
          sol: R`[[*args]] بتجمع الباراميترات بالترتيب و [[**kwargs]] بتجمع اللي بالاسم، وبعدين [[fn(*args, **kwargs)]] بتفكهم تاني زي ما جم بالظبط. فـ [[timed(sorted, words, key=len, reverse=True)]] بتنادي [[sorted(words, key=len, reverse=True)]].

على [[["banana", "kiwi", "apple", "fig"]]] هتشوف سطر زي [[sorted took 0.000004s]] (الرقم هيختلف عندك) وبعده [[['banana', 'apple', 'kiwi', 'fig']]]. لو نسيت الـ [[**]] وكتبت [[fn(*args, kwargs)]] هيوصل الـ dict كـ باراميتر تاني عادي و [[sorted]] ترمي [[TypeError: sorted expected 1 argument, got 2]]. ولازم ترجّع الناتج ([[return result]]) وإلا الدالة هتبلع النتيجة وترجع [[None]].`,
          solCode: R`import time
def timed(fn, *args, **kwargs):
    start = time.perf_counter()
    result = fn(*args, **kwargs)
    print(f"{fn.__name__} took {time.perf_counter() - start:.6f}s")
    return result
words = ["banana", "kiwi", "apple", "fig"]
print(timed(sorted, words, key=len, reverse=True))`
        },
        {
          cmd: "decorators",
          title: "إيه اللي بيعمله @ فوق الدالة؟",
          desc: R`الـ decorator دالة بتاخد دالة وبترجع دالة تانية، غالبًا بتلف الأصلية وتزوّد حاجة قبلها أو بعدها (لوج، وقت، cache، صلاحيات). [[@timed]] فوق [[def f]] معناها بالظبط [[f = timed(f)]].

وده اللي بتشوفه في FastAPI: [[@app.get("/users")]] decorator بيسجّل الدالة كـ route. وفي المكتبة الأساسية: [[@functools.cache]] و [[@dataclass]] و [[@property]].`,
          example: R`import functools
import time
def timed(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        try:
            return fn(*args, **kwargs)
        finally:
            print(f"{fn.__name__} took {time.perf_counter() - start:.3f}s")
    return wrapper
@timed
def slow_sum(n: int) -> int:
    return sum(range(n))
slow_sum(10_000_000)
@functools.cache
def fib(n: int) -> int:
    return n if n < 2 else fib(n - 1) + fib(n - 2)`,
          try: R`اعمل decorator اسمه [[retry(times)]] بياخد باراميتر (يعني ٣ طبقات دوال)، وبيعيد نداء الدالة لو رمت exception لحد [[times]] مرات. جرّبه على دالة بترمي عشوائيًا بـ [[random.random() < 0.5]].`,
          flag: "script",
          deep: {
            why: R`عندك ٢٠ دالة محتاج تقيس وقتها أو تعمل لها لوج أو تتأكد من صلاحية. بدل ما تكتب نفس الكود جوه كل واحدة: decorator واحد وسطر [[@]] فوق كل دالة. وبيتسأل كتير في الانترفيو: «اكتب decorator».`,
            how: R`الدوال في Python objects عادية: تتبعت كباراميتر، وترجع من دالة، وتتخزن في متغير. و [[wrapper]] closure: دالة جوه دالة بتفتكر [[fn]] حتى بعد ما [[timed]] خلصت.

[[@functools.wraps(fn)]] بينسخ اسم الدالة الأصلية والـ docstring والـ signature للـ wrapper. من غيره كل الدوال اسمها [[wrapper]] في اللوج والـ tracebacks. والأهم إن FastAPI بيقرا الـ signature عشان يعرف الباراميترات، فـ decorator من غير wraps على route ممكن يبوّظ الباراميترات.

decorator بباراميترات ([[@retry(3)]]) هو دالة بترجع decorator: ٣ طبقات.

[[@functools.cache]] بيحفظ ناتج كل نداء حسب الباراميترات (memoization)، فـ fib بقت O(n) بدل exponential. و [[lru_cache(maxsize=128)]] بحد أقصى. الاتنين في الذاكرة جوه process واحد، ومش مناسبين لداتا بتتغير (Redis في المستوى ٣).

ومع async: لو الدالة [[async def]]، الـ wrapper لازم يبقى [[async def]] ويعمل [[await fn(...)]]، وإلا هيرجع coroutine من غير ما يستناها.`,
            when: "حاجة بتتكرر حوالين دوال كتير: توقيت، ولوج، و retry، و cache، وصلاحيات. وفي FastAPI الصلاحيات الأحسن تبقى dependencies مش decorators (المستوى ٢).",
            mistakes: R`تنسى [[@functools.wraps]]. وتنسى [[return]] في الـ wrapper فكل الدوال ترجع None. و decorator sync على دالة async. و [[@cache]] على دالة بتاخد list (unhashable: TypeError)، أو على method (بيحتفظ بـ [[self]] فالـ object مبيتمسحش من الذاكرة).`
          },
          lines: [
            "أدوات للدوال: wraps و cache.",
            "للتوقيت.",
            "الـ decorator: بياخد دالة.",
            "بينسخ اسم وتوقيع الدالة الأصلية للـ wrapper.",
            "الدالة الجديدة اللي هتتنادى مكان الأصلية، وبتاخد أي باراميترات.",
            "قبل النداء: ابدأ العداد.",
            R`[[try]] عشان الوقت يتطبع حتى لو الدالة رمت.`,
            "نادي الأصلية ورجّع ناتجها.",
            R`[[finally]] بيشتغل في كل الأحوال.`,
            "اطبع الاسم والوقت.",
            "رجّع الـ wrapper.",
            R`[[@timed]] هي بالظبط [[slow_sum = timed(slow_sum)]].`,
            "دالة عادية.",
            "الجسم.",
            R`النداء بيعدّي على الـ wrapper ويطبع الوقت. و [[_]] في الرقم للقراية بس.`,
            "cache جاهز: كل n بيتحسب مرة واحدة.",
            "دالة recursive.",
            "من غير cache كانت هتعيد الحسبة ملايين المرات."
          ],
          sol: R`الـ ٣ طبقات: [[retry(times)]] بترجع الـ decorator، والـ decorator بياخد الدالة ويرجع [[wrapper]]، والـ [[wrapper]] هو اللي بيتنادي فعلًا. لما تشغّله أكتر من مرة هتشوف نتايج مختلفة: ساعات [[ok]] على طول، وساعات [[attempt 1 failed: network down]] وبعدين [[ok]]، ونادرًا (احتمال 1 من 8) التلات محاولات يفشلوا والـ [[ConnectionError]] الأصلي يطلع لبرّه. ولو عايز نتيجة ثابتة وإنت بتجرب: [[random.seed(3)]].

أهم نقطتين: في آخر محاولة اعمل [[raise]] عشان الخطأ ميتبلعش والدالة ترجع [[None]] في صمت. ولو كتبت [[@retry]] من غير أقواس الدالة نفسها هتتبعت مكان [[times]]، و [[flaky()]] هترمي [[TypeError: retry.<locals>.decorator() missing 1 required positional argument: 'fn']]. و [[functools.wraps]] بيخلي [[flaky.__name__]] يفضل [[flaky]] مش [[wrapper]].`,
          solCode: R`import functools
import random
def retry(times: int):
    def decorator(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            for attempt in range(1, times + 1):
                try:
                    return fn(*args, **kwargs)
                except Exception as e:
                    print(f"attempt {attempt} failed: {e}")
                    if attempt == times:
                        raise
        return wrapper
    return decorator
@retry(times=3)
def flaky() -> str:
    if random.random() < 0.5:
        raise ConnectionError("network down")
    return "ok"
print(flaky(), flaky.__name__)`
        },
        {
          cmd: "generators و yield",
          title: "دالة بتطلّع قيم واحدة واحدة بدل list كاملة",
          desc: R`الدالة اللي فيها [[yield]] بقت generator: لما تناديها مبتشتغلش، بترجع object تلف عليه، وكل لفة بتكمّل الدالة لحد الـ [[yield]] الجاي وتطلّع قيمة. الذاكرة ثابتة مهما كانت الداتا كبيرة.

وده مهم في FastAPI بالذات: الـ dependency اللي فيها [[yield]] (افتح اتصال بالقاعدة، [[yield]]، وبعدين اقفله) مبنية على نفس الفكرة، وكمان الـ lifespan و [[StreamingResponse]].`,
          example: R`def read_lines(path: str):
    with open(path, encoding="utf-8") as f:
        for line in f:
            yield line.rstrip("\n")
def batched(items, size: int):
    for i in range(0, len(items), size):
        yield items[i : i + size]
errors = (l for l in read_lines("app.log") if "ERROR" in l)
for line in errors:
    print(line)
for chunk in batched(list(range(10)), 4):
    print(chunk)                         # [0, 1, 2, 3] ثم [4, 5, 6, 7] ثم [8, 9]
gen = batched([1, 2, 3], 2)
next(gen)`,
          try: R`اعمل ملف لوج كبير ([[seq 1 5000000 > big.txt]] في bash)، واقراه مرة بـ [[f.readlines()]] ومرة بالـ generator، وقارن الذاكرة في Task Manager أو [[htop]].`,
          flag: "script",
          deep: {
            why: "ملف لوج ٢ جيجا أو جدول فيه مليون صف: لو حمّلته كله في list، الـ container هيقع بـ OOM. الـ generator بيخلّيك تعالج صف صف بذاكرة ثابتة. والـ pattern نفسه (حاجة قبل yield وحاجة بعده) هو اللي FastAPI بيستخدمه للـ dependencies والـ lifespan.",
            how: R`الـ generator بيحتفظ بحالته (المتغيرات ومكانه في الكود) بين كل [[next()]] والتاني. ولما الدالة تخلص، بيترمي [[StopIteration]] والـ for بتفهمها وتقف. ومبيتلفّش عليه غير مرة واحدة.

الملف نفسه في Python iterator: [[for line in f]] بيقرا سطر سطر، مش الملف كله.

[[@contextmanager]] (درس [[with و context managers]]) بياخد generator فيه [[yield]] واحد ويحوّله لـ context manager: اللي قبل الـ yield هو الدخول، واللي بعده هو الخروج. و FastAPI بيعمل نفس الحكاية مع الـ dependencies اللي فيها yield ومع الـ [[lifespan]].

و [[itertools]] فيه أدوات جاهزة: [[itertools.batched(items, 4)]] (3.12+) بيعمل نفس دالة [[batched]] اللي فوق وبيشتغل مع أي iterable، و [[islice]] بيقطع من generator.

وفيه async generators ([[async def]] فيها [[yield]]) بتلف عليها بـ [[async for]]، زي قراية صفوف من القاعدة بـ cursor.`,
            when: "داتا كبيرة أو ملهاش آخر (ملفات، صفوف من القاعدة، stream)، و pipelines من خطوات فلترة وتحويل. ولو الداتا صغيرة وهتلف عليها أكتر من مرة، list أبسط.",
            mistakes: R`تلف على generator مرتين والتانية فاضية. و [[len(gen)]] (مفيش len). وتعمل [[list(gen)]] على داتا ضخمة فترجع للمشكلة الأصلية. وتكتب [[return value]] جوه generator وتستنى القيمة ترجع للي نادى.`
          },
          lines: [
            R`generator: فيه [[yield]].`,
            "افتح الملف، وهيتقفل لما الـ generator يخلص.",
            "الملف بيتقري سطر سطر.",
            "طلّع سطر، واقف هنا لحد اللفة الجاية.",
            "generator بيقطّع list لحتت.",
            "كل خطوة بحجم الحتة.",
            "طلّع حتة.",
            "generator expression فوق generator: مفيش حاجة اتقرت لسه.",
            "هنا بس القراية بتحصل، سطر سطر.",
            "جوه الـ loop.",
            "لف على الحتت.",
            "جوه الـ loop.",
            "النداء مبيشغّلش الدالة، بيرجع generator object.",
            R`[[next]] بتشغّله لحد أول [[yield]] وترجع أول حتة (1 و 2).`
          ],
          sol: R`الملف فيه ٥ مليون سطر (حوالي 39MB على الديسك). لما جربناها وجمعنا الأرقام: [[f.readlines()]] وصّلت الذاكرة لحوالي 340MB، والـ generator فضل حوالي 8MB بس، والناتج واحد في الاتنين ([[12500002500000]]). [[readlines]] بتعمل list فيها ٥ مليون string مرة واحدة، وكل string في Python ليه overhead أكبر من حجم النص نفسه، فالرقم بيطلع أضعاف حجم الملف. والـ generator بيجيب سطر، تشتغل عليه، يرميه، يجيب اللي بعده.

لو ملقتش فرق في htop، غالبًا البرنامج خلص بسرعة قبل ما تلحق تشوفه، أو إنت عملت [[list(read_lines(...))]] فرجّعت كل حاجة للذاكرة تاني. الأدق إنك تقيس جوه البرنامج بـ [[resource]] زي الكود تحت (على Linux و macOS).`,
          solCode: R`import resource
import sys
def peak_mb() -> float:
    return resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024  # KB على Linux
def read_lines(path: str):
    with open(path, encoding="utf-8") as f:
        for line in f:
            yield line.rstrip("\n")
if sys.argv[1] == "list":
    with open("big.txt", encoding="utf-8") as f:
        total = sum(int(l) for l in f.readlines())
else:
    total = sum(int(l) for l in read_lines("big.txt"))
print(sys.argv[1], total, f"peak {peak_mb():.0f} MB")`
        },
        {
          cmd: "scope و LEGB",
          title: "الاسم ده جاي منين؟ LEGB و global و nonlocal",
          desc: R`لما تكتب اسم، Python بيدوّر عليه بالترتيب ده (LEGB): Local جوه الدالة الحالية، وبعدين Enclosing في الدوال اللي حواليها، وبعدين Global على مستوى الملف (الـ module)، وبعدين Built-in زي [[len]] و [[print]].

القراءة من برّه مسموحة، بس أول ما تعيّن قيمة لاسم جوه دالة ([[x = ...]] أو [[x += 1]])، الاسم ده بقى local في الدالة كلها. عشان تعدّل متغير على مستوى الملف: [[global]]، ولمتغير في دالة حواليك: [[nonlocal]]. وفي Python الـ if والـ for مبيعملوش scope، الدوال بس (والـ classes والـ comprehensions).`,
          example: R`x = "global"
def outer():
    x = "enclosing"
    def inner():
        print(x)                              # enclosing
    inner()
outer()
print(x, len(x))                              # global 6: و len جاية من الـ built-ins
count = 0
def bump() -> None:
    global count
    count += 1
bump()
print(count)                                  # 1
def make_counter():
    n = 0
    def inc() -> int:
        nonlocal n
        n += 1
        return n
    return inc
c = make_counter()
print(c(), c(), c())                          # 1 2 3
for i in range(3):
    pass
print(i)                                      # 2: الـ for مبتعملش scope
total = 10
def broken():
    total += 1
broken()                                      # UnboundLocalError`,
          try: R`خمّن قبل ما تشغّل: [[name = "global"]]، و [[def a(): print(name)]]، و [[def b(): name = "local"; a()]]، و [[b()]]. هيطبع إيه؟ وبعدين اكتب [[make_accumulator(start)]] بترجع دالة [[add(amount)]] بتزوّد على مجموع جواها وترجعه، وكل accumulator ليه مجموعه لوحده.`,
          sol: R`الأول بيطبع [[global]] مش [[local]]. الـ scope بيتحدد من مكان كتابة الدالة (lexical)، مش من مين ناداها: [[a]] مكتوبة على مستوى الملف، فبتدوّر في الـ local بتاعها وبعدين الـ global، والـ [[name]] اللي جوه [[b]] local في [[b]] ومحدش يشوفه.

والـ accumulator: [[acc = make_accumulator(100)]] وبعدين [[acc(10)]] و [[acc(-30)]] و [[acc(5)]] يطبعوا [[110 80 85]]، و [[make_accumulator()]] جديدة بتبدأ من صفر ومبتأثرش على الأولى. من غير [[nonlocal total]] هتاخد [[UnboundLocalError]]، لأن [[total += amount]] تعيين، فـ Python اعتبر [[total]] local في [[add]]. والغلطة التانية إنك تحط المجموع global: ساعتها كل الـ accumulators بيشاركوا نفس الرقم.`,
          solCode: R`def make_accumulator(start: float = 0):
    total = start
    def add(amount: float) -> float:
        nonlocal total
        total += amount
        return total
    return add
acc = make_accumulator(100)
print(acc(10), acc(-30), acc(5))
other = make_accumulator()
print(other(1), acc(0))`,
          flag: "script",
          deep: {
            why: R`[[UnboundLocalError]] من أكتر الأخطاء اللي بتلخبط المبتدئين، لأن المتغير «موجود» فوق. والـ closures ([[nonlocal]]) هي أساس الـ decorators وأي دالة بتفتكر state. وفي الانترفيو: «اشرح LEGB» و «إيه الفرق بين global و nonlocal».`,
            how: R`Python بيقرر وقت الـ compile (مش وقت التشغيل) إن الاسم local ولا لأ: لو فيه أي تعيين للاسم في أي حتة في الدالة، يبقى local في الدالة كلها، حتى في السطور اللي قبل التعيين. عشان كده [[total += 1]] بتقع: بيحاول يقرا [[total]] الـ local قبل ما يتعيّن.

[[global x]] بيقول «[[x]] هنا يعني بتاع الـ module». و [[nonlocal x]] بيقول «[[x]] هنا بتاع أقرب دالة حواليا»، ولازم يكون موجود فعلًا هناك. التعديل في object من غير تعيين للاسم مش محتاج أي حاجة منهم: [[items.append(1)]] على list global شغال عادي، لأنك مغيّرتش الاسم بيشاور على إيه.

الـ closure: الدالة الداخلية بتفتكر المتغيرات اللي حواليها حتى بعد ما الدالة الخارجية خلصت، وكل نداء لـ [[make_counter()]] بيعمل [[n]] جديدة. وده نفس اللي بيحصل في الـ [[wrapper]] بتاع الـ decorator (درس «decorators»).

والـ comprehension ليه scope خاص، فالمتغير اللي جواه مبيطلعش برّه، بعكس الـ for العادية اللي متغيرها بيفضل موجود بعدها.`,
            when: R`[[nonlocal]] في closures صغيرة (counter، cache بسيط، decorator بيعد). [[global]] نادرًا جدًا: لو محتاج state مشترك، class أو object بتبعته أوضح وأسهل في الاختبار. والثوابت على مستوى الملف ([[MAX_RETRIES = 3]]) بتتقري من غير global عادي.`,
            mistakes: R`[[global]] في كل دالة عشان «تشتغل»: الكود بقى صعب يتختبر وأي دالة ممكن تغيّر أي حاجة. وتسمّي متغير [[list]] أو [[id]] أو [[type]] فتغطي على الـ built-in ([[list(x)]] بعدها تقع بـ [[TypeError: 'list' object is not callable]]). وتفتكر إن متغير اتعرّف جوه if مش موجود برّه (هو موجود لو الـ if اتنفّذ، ومش موجود لو لأ: [[NameError]] في حالة واحدة بس، وده أسوأ).`
          },
          lines: [
            "global: على مستوى الملف.",
            "دالة خارجية.",
            "enclosing بالنسبة للي جواها.",
            "دالة داخلية ملهاش x خاص بيها.",
            "بتدوّر: local مفيش، enclosing لقت. فبتطبع enclosing.",
            "نادي الداخلية.",
            "نادي الخارجية.",
            R`هنا بره: الـ global. و [[len]] مش متعرّفة في الملف، فجاية من الـ built-ins.`,
            "متغير global.",
            "دالة بتعدّله.",
            R`[[global]]: [[count]] هنا هو بتاع الملف.`,
            "تعيين: من غير global كان هيبقى UnboundLocalError.",
            "نادي.",
            "اتغير فعلًا.",
            "دالة بتصنع عدّاد.",
            "متغير في الـ enclosing.",
            "الدالة الداخلية.",
            R`[[nonlocal]]: [[n]] بتاع الدالة اللي حواليا.`,
            "زوّد.",
            "رجّع.",
            "رجّع الدالة نفسها (closure بتفتكر n).",
            "عدّاد جديد بـ n خاصة بيه.",
            "كل نداء بيزوّد نفس الـ n.",
            "for عادية.",
            "مبتعملش حاجة.",
            "المتغير فضل موجود بعد الـ loop بآخر قيمة.",
            "global.",
            "دالة بتحاول تعدّله من غير global.",
            R`التعيين خلّى [[total]] local، فالقراية قبله بتقع.`,
            "النداء يطلّع UnboundLocalError."
          ]
        }
      ]
    },
    {
      t: "الأخطاء و with",
      l: 1,
      n: "try و except و raise، و exceptions بتاعتك، و with اللي بتقفل الحاجة لوحدها",
      items: [
        {
          cmd: "try و except",
          title: "تمسك الخطأ، وترمي خطأ بتاعك",
          desc: R`[[try]] فيه الكود اللي ممكن يرمي، و [[except SomeError]] بيمسك نوع معين، و [[else]] لو مفيش خطأ، و [[finally]] في كل الأحوال. و [[raise]] بيرمي خطأ.

امسك الأنواع اللي متوقعها بس، ومتمسكش [[Exception]] كله إلا في مكان واحد فوق (زي exception handler في FastAPI). والـ exceptions بتاعتك classes بتورث من [[Exception]]، فتقدر تمسكها باسمها.`,
          example: R`class NotFoundError(Exception):
    def __init__(self, what: str, item_id: int):
        super().__init__(f"{what} {item_id} not found")
        self.what, self.item_id = what, item_id
def parse_age(raw: str) -> int:
    try:
        age = int(raw)
    except ValueError as e:
        raise ValueError(f"age must be a number, got {raw!r}") from e
    else:
        if age < 0:
            raise ValueError("age can't be negative")
        return age
try:
    raise NotFoundError("user", 7)
except NotFoundError as e:
    print(e, e.item_id)
except (KeyError, TypeError):
    print("حاجة تانية")
finally:
    print("ده بيتطبع دايمًا")`,
          try: R`شغّل [[parse_age("abc")]] واقرا الـ traceback: هتلاقي الخطأين والجملة [[The above exception was the direct cause]]. وبعدين شيل [[from e]] وقارن.`,
          flag: "script",
          deep: {
            why: R`API من غير error handling صح: يا إما بيرجّع 500 على أي input غلط، يا إما [[except: pass]] بيبلع الأخطاء والبيانات تبوظ في صمت. والـ exceptions المخصصة بتخلي طبقة الـ business logic تقول «مش موجود» من غير ما تعرف حاجة عن HTTP، و FastAPI يحوّلها لـ 404 في مكان واحد.`,
            how: R`Python بيحب EAFP (أسهل تطلب السماح بعد ما تغلط): جرّب وامسك الخطأ، بدل ما تفحص كل حاجة قبلها. [[int(raw)]] جوه try أوضح من regex يفحص إن الـ string رقم.

الـ [[except]] بيتفحصوا بالترتيب، وأول واحد نوعه مطابق (أو parent ليه) بيمسك. و [[as e]] بيديك الـ exception object.

[[raise X from e]] بيربط الخطأ الجديد بالأصلي ([[__cause__]])، فالـ traceback بيوري الاتنين. و [[raise]] لوحدها جوه except بترمي نفس الخطأ تاني، بعد ما تسجّله مثلًا.

[[else]] بيشتغل لو الـ try عدّى من غير خطأ: حط فيه الكود اللي مش عايز تمسك أخطاؤه بالغلط. و [[finally]] للتنضيف، وبيشتغل حتى مع [[return]].

وفي 3.14 تقدر تكتب [[except KeyError, TypeError:]] من غير قوسين (لو مفيش [[as]]). ومن 3.11 فيه [[ExceptionGroup]] و [[except*]] لأخطاء كتير مع بعض، وهتقابلهم مع [[asyncio.TaskGroup]].`,
            when: "امسك اللي تقدر تعمل فيه حاجة (تحوّله لرسالة، تعيد المحاولة، ترجّع قيمة بديلة). والباقي سيبه يطلع لفوق، والـ exception handler العام يسجّله ويرجّع 500.",
            mistakes: R`[[except:]] أو [[except Exception: pass]]: بتبلع كل حاجة حتى الـ bugs (و [[except:]] لوحدها بتبلع Ctrl+C كمان). و try كبير حوالين ٣٠ سطر فمش عارف مين رمى. و [[raise Exception("...")]] عام بدل نوع محدد. و [[return]] جوه [[finally]]: بيبلع الـ exception، و 3.14 بقى بيطلّع SyntaxWarning عليه (PEP 765).`
          },
          lines: [
            R`exception بتاعك: class بيورث من [[Exception]].`,
            "بياخد بيانات عن الخطأ.",
            "الرسالة اللي هتظهر لما تطبعه.",
            "خزّن البيانات عشان اللي يمسكه يستخدمها.",
            "دالة بتحوّل نص لعمر.",
            "الكود اللي ممكن يرمي.",
            R`[[int("abc")]] بيرمي ValueError.`,
            "امسك النوع ده بس.",
            R`ارمي رسالة أوضح، و [[from e]] بيربطها بالأصلي. و [[!r]] بيحط القيمة بين علامات تنصيص.`,
            "لو الـ try عدّى من غير خطأ.",
            "فحص تاني.",
            "ارمي.",
            "رجّع العمر.",
            "try تاني.",
            "ارمي الخطأ بتاعك.",
            "امسكه باسمه.",
            "الرسالة والبيانات.",
            "كذا نوع في except واحد (في 3.14 القوسين اختياريين).",
            "جوه الـ except.",
            R`[[finally]]: للتنضيف.`,
            "بيشتغل في كل الأحوال."
          ],
          sol: R`مع [[from e]] هتشوف traceback لخطأين: الأول [[ValueError: invalid literal for int() with base 10: 'abc']] من [[int(raw)]]، وبعدين [[The above exception was the direct cause of the following exception:]]، وبعدين الخطأ بتاعك [[ValueError: age must be a number, got 'abc']]. يعني إنت قلت صراحة إن التاني سببه الأول.

من غير [[from e]] نفس الخطأين هيظهروا، بس الجملة في النص هتبقى [[During handling of the above exception, another exception occurred:]]، ودي معناها «حصل خطأ تاني وإحنا بنعالج الأول»، كأنه bug في الـ except نفسه. فـ [[from e]] مش بتضيف معلومة جديدة، هي بتوضح إن ده مقصود. ولو عايز تخفي الأصل خالص (مثلًا عشان فيه بيانات حساسة) اكتب [[from None]].`
        },
        {
          cmd: "with و context managers",
          title: "with بتقفل الملف أو الاتصال لوحدها",
          desc: R`[[with open(...) as f:]] بتضمن إن الملف يتقفل لما تخرج من البلوك، حتى لو حصل exception. نفس الفكرة للـ locks والاتصالات والـ transactions: [[async with pool.acquire() as conn:]] بيرجّع الاتصال للـ pool لوحده.

وتقدر تعمل context manager بتاعك بسهولة بـ [[@contextmanager]] من [[contextlib]]: generator فيه [[yield]] واحد. ودي بالظبط فكرة الـ [[lifespan]] في FastAPI.`,
          example: R`from contextlib import contextmanager
from pathlib import Path
import time
Path("out").mkdir(exist_ok=True)
with open("out/report.txt", "w", encoding="utf-8") as f:
    f.write("تمام\n")
text = Path("out/report.txt").read_text(encoding="utf-8")
@contextmanager
def timer(label: str):
    start = time.perf_counter()
    try:
        yield
    finally:
        print(f"{label}: {time.perf_counter() - start:.3f}s")
with timer("sum"):
    total = sum(range(10_000_000))`,
          try: R`اعمل context manager اسمه [[cd(path)]] بيدخل فولدر بـ [[os.chdir]] ويرجع للفولدر الأصلي بعد البلوك حتى لو حصل خطأ. (من 3.11 فيه واحد جاهز: [[contextlib.chdir]].)`,
          flag: "script",
          deep: {
            why: "ملف أو اتصال بالقاعدة اتفتح ومتقفلش لأن exception حصل في النص: مع الوقت الـ pool بيخلص والـ API بيقف. و with بتخلي التنضيف مضمون ومكتوب مرة واحدة.",
            how: R`أي object فيه [[__enter__]] و [[__exit__]] ينفع مع [[with]]. الدخول بينادي [[__enter__]] واللي بيرجعه بيروح لـ [[as]]، والخروج (عادي أو بـ exception) بينادي [[__exit__]]. والنسخة async: [[__aenter__]] و [[__aexit__]] مع [[async with]].

[[@contextmanager]] بيوفّر عليك الـ class: اللي قبل [[yield]] دخول، واللي بعده خروج، والقيمة اللي بتعملها yield هي اللي بتروح لـ [[as]]. والـ [[try/finally]] حوالين الـ yield ضروري، وإلا الخروج مش هيشتغل لو حصل exception جوه البلوك. و [[@asynccontextmanager]] النسخة async، وده بالظبط شكل الـ [[lifespan]] في FastAPI.

[[pathlib.Path]] الطريقة الحديثة للمسارات: [[Path("a") / "b.txt"]] و [[read_text]] و [[write_text]] و [[exists]] و [[glob]]، بدل [[os.path.join]].

وحدد [[encoding="utf-8"]] دايمًا مع الملفات النصية: على ويندوز الافتراضي مش UTF-8، والعربي بيبوظ. (من Python 3.15 الـ UTF-8 mode هيبقى الافتراضي، PEP 686.)`,
            when: "أي حاجة ليها فتح وقفل: ملفات، واتصالات، و locks، و transactions، و clients (httpx)، وقياس وقت، وتغيير مؤقت لإعداد.",
            mistakes: R`[[f = open(...)]] من غير with وتنسى [[close]]. و [[@contextmanager]] من غير [[try/finally]]. و [[with]] وترجع الـ object برّه البلوك وتستخدمه بعد ما اتقفل ([[ValueError: I/O operation on closed file]]).`
          },
          lines: [
            "decorator بيحوّل generator لـ context manager.",
            "المسارات بالطريقة الحديثة.",
            "للتوقيت.",
            "اعمل الفولدر، ومتعترضش لو موجود.",
            "افتح الملف للكتابة، وهيتقفل لوحده في آخر البلوك.",
            "اكتب.",
            "قراية الملف كله في سطر، وبيقفله لوحده.",
            "حوّل الـ generator اللي تحت لـ context manager.",
            "بياخد اسم للقياس.",
            "الدخول: ابدأ العداد.",
            R`[[try]] عشان الخروج يشتغل حتى مع exception.`,
            R`هنا البلوك بتاع [[with]] بيشتغل.`,
            "الخروج.",
            "اطبع الوقت.",
            "استخدمه.",
            "الكود اللي بيتقاس."
          ],
          sol: R`الفكرة: تحفظ الفولدر الحالي بـ [[os.getcwd()]] قبل الـ [[yield]]، وترجعله في [[finally]]. لو شغّلت الكود تحت هتشوف الفولدر الأصلي، وبعدين الفولدر الفرعي جوه البلوك، وبعدين الأصلي تاني حتى بعد ما البلوك رمى [[RuntimeError]].

الغلطة المشهورة إنك تكتب [[os.chdir(old)]] بعد الـ [[yield]] من غير [[try/finally]]: ساعتها لو حصل خطأ جوه الـ [[with]]، الـ generator مش هيكمّل والبرنامج هيفضل في الفولدر الغلط. وفي الكود الحقيقي على 3.11 وأحدث استخدم [[contextlib.chdir]] الجاهز، وخد بالك إن تغيير الفولدر بيأثر على البروسيس كله، فمش آمن مع threads.`,
          solCode: R`import os
from contextlib import contextmanager
from pathlib import Path
@contextmanager
def cd(path):
    old = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(old)
Path("sub").mkdir(exist_ok=True)
print(os.getcwd())
with cd("sub"):
    print(os.getcwd())
try:
    with cd("sub"):
        raise RuntimeError("boom")
except RuntimeError:
    pass
print(os.getcwd())  # رجع للأصلي رغم الخطأ`
        }
      ]
    },
    {
      t: "Classes",
      l: 1,
      n: "class و self و property، والوراثة و super، و dunder methods، و dataclass و Enum و Protocol",
      items: [
        {
          cmd: "class و self",
          title: "class بـ __init__ و self و @property",
          desc: R`الـ class قالب بتعمل منه objects. [[__init__]] بيتنادى أول ما الـ object يتعمل، و [[self]] هو الـ object نفسه (Python بيبعته لوحده لكل method). و [[@property]] بتخلي method تتقري كأنها خاصية: [[order.total]] من غير قوسين.

وفيه نوعين methods تانيين: [[@classmethod]] بتاخد الـ class نفسه ([[cls]]) بدل الـ object، وأشهر استخدام ليها طرق إنشاء بديلة ([[Order.from_dict(d)]])، و [[@staticmethod]] دالة عادية ملهاش [[self]] ولا [[cls]] بس مكانها منطقي جوه الـ class. والوراثة و [[super()]] في الدرس الجاي.`,
          example: R`from typing import Self
class Order:
    tax_rate = 0.14
    def __init__(self, customer: str, items: list[float] | None = None):
        self.customer = customer
        self.items = items if items is not None else []
    @property
    def total(self) -> float:
        return round(sum(self.items) * (1 + self.tax_rate), 2)
    def add(self, price: float) -> None:
        if not self.is_valid_price(price):
            raise ValueError(f"invalid price: {price}")
        self.items.append(price)
    @classmethod
    def from_dict(cls, data: dict) -> Self:
        return cls(data["customer"], list(data.get("items", [])))
    @staticmethod
    def is_valid_price(price: float) -> bool:
        return price > 0
    def __repr__(self) -> str:
        return f"Order({self.customer!r}, total={self.total})"
o = Order("Sara", [100, 200])
o.add(50)
print(o, o.total)                             # Order('Sara', total=399.0) 399.0
Order.add(o, 10)
o2 = Order.from_dict({"customer": "Omar", "items": [10]})
print(o2, Order.tax_rate, o2.tax_rate)
o2.tax_rate = 0
print(o2.total, Order.tax_rate)               # 10 0.14
o.total = 5                                   # AttributeError: property 'total' of 'Order' object has no setter`,
          try: R`ضيف method اسمها [[remove(price)]] بترمي [[ValueError]] لو السعر مش في الطلب، و [[classmethod]] اسمها [[empty(customer)]] بتعمل طلب فاضي، وخلّي [[__repr__]] يطبع عدد العناصر كمان. اعمل طلبين فاضيين، وضيف لواحد بس، واتأكد إن التاني لسه فاضي.`,
          sol: R`المتوقع: [[Order('Sara', items=2, total=171.0)]] بعد ما شلت 200، و [[Order('Ali', items=1, total=34.2) Order('Mona', items=0, total=0.0)]]، و [[999 not in order]] لما تشيل حاجة مش موجودة.

النقطة اللي التجربة معمولة عشانها: الطلب التاني لسه فاضي لأن [[__init__]] بيعمل list جديدة لكل object ([[items if items is not None else []]]). لو كنت كتبت [[def __init__(self, customer, items=[])]]، الطلبين هيشاركوا نفس الـ list، والـ 30 هتظهر في Mona كمان، ودي أشهر غلطة في Python (أسئلة الانترفيو آخر التاب). و [[empty]] بترجع [[cls(customer)]] مش [[Order(customer)]]، فلو حد ورث من [[Order]] ونادى [[RushOrder.empty(...)]] هيرجعله RushOrder.`,
          solCode: R`from typing import Self
class Order:
    tax_rate = 0.14
    def __init__(self, customer: str, items: list[float] | None = None):
        self.customer = customer
        self.items = items if items is not None else []
    @property
    def total(self) -> float:
        return round(sum(self.items) * (1 + self.tax_rate), 2)
    def add(self, price: float) -> None:
        if not self.is_valid_price(price):
            raise ValueError(f"invalid price: {price}")
        self.items.append(price)
    def remove(self, price: float) -> None:
        if price not in self.items:
            raise ValueError(f"{price} not in order")
        self.items.remove(price)
    @classmethod
    def from_dict(cls, data: dict) -> Self:
        return cls(data["customer"], list(data.get("items", [])))
    @classmethod
    def empty(cls, customer: str) -> Self:
        return cls(customer)
    @staticmethod
    def is_valid_price(price: float) -> bool:
        return price > 0
    def __repr__(self) -> str:
        return f"Order({self.customer!r}, items={len(self.items)}, total={self.total})"
o = Order("Sara", [100, 200, 50])
o.remove(200)
print(o)
e = Order.empty("Ali")
e2 = Order.empty("Mona")
e.add(30)
print(e, e2)
try:
    o.remove(999)
except ValueError as err:
    print(err)`,
          flag: "script",
          deep: {
            why: "الـ models والـ services والـ repositories في أي API هتبقى classes، وحتى Pydantic models و SQLAlchemy models classes. لازم تفهم self و property و classmethod عشان تقرا كود الناس وتكتب objects بتحافظ على الداتا بتاعتها سليمة.",
            how: R`[[o.add(50)]] هي بالظبط [[Order.add(o, 50)]]: عشان كده [[self]] أول باراميتر، والاسم اتفاق مش keyword.

الخاصية المكتوبة في جسم الـ class ([[tax_rate]]) class attribute مشتركة بين كل الـ objects، واللي بـ [[self.x = ...]] instance attribute لكل object لوحده. ولما تقرا [[o2.tax_rate]]، Python بيدوّر في الـ object الأول وبعدين في الـ class. فـ [[o2.tax_rate = 0]] مبتغيّرش الـ class، بتعمل instance attribute جديدة بتغطي عليها في [[o2]] بس. وخلي بالك: class attribute نوعها mutable (list) بتتشارك بين الكل، وده غالبًا bug.

[[@property]] بتحسب القيمة كل ما تتقري، فمش محتاج تخزّن total وتنسى تحدّثه، ومن غير setter مينفعش حد يكتب عليها ([[AttributeError]]). و [[__repr__]] هو اللي بيظهر في الـ REPL واللوج والـ debugger؛ اكتبه دايمًا.

[[Self]] من [[typing]] (3.11+) نوع الرجوع لـ method بترجع object من نفس الـ class، وبيفضل صح حتى في الأبناء. ومفيش private حقيقي في Python: [[_name]] اتفاق معناه «داخلي، متلمسوش»، و [[__name]] بيتغير اسمه (name mangling) عشان ميتصادمش في الوراثة، مش للحماية.`,
            when: "لما يبقى فيه داتا ومعاها سلوك بيتغير عليها أو قواعد لازم تتحافظ (سعر لازم يبقى موجب). لو داتا بس: dataclass أو Pydantic. لو سلوك بس من غير state: دوال عادية في module كفاية، Python مش Java.",
            mistakes: R`تنسى [[self]] في تعريف method ([[takes 0 positional arguments but 1 was given]]). و [[items=[]]] كـ default في [[__init__]] أو كـ class attribute فكل الطلبات تشارك نفس الليستة. و [[Order(...)]] جوه classmethod بدل [[cls(...)]] فالوراثة تبوظ. و class لكل حاجة حتى لو دالة واحدة. و getters و setters على طريقة Java ([[get_total()]]) بدل خاصية عادية أو [[@property]].`
          },
          lines: [
            R`[[Self]]: نوع «object من نفس الـ class».`,
            "class جديد.",
            "class attribute: مشتركة بين كل الطلبات.",
            R`بيتنادى وقت الإنشاء، و [[self]] الـ object الجديد. و [[items]] default بـ None مش [[[]]].`,
            "instance attribute: لكل طلب لوحده.",
            "list جديدة لكل طلب لو مفيش list اتبعتت.",
            "اللي تحت يتقري كخاصية من غير قوسين.",
            "الإجمالي بيتحسب كل مرة من العناصر.",
            "مع الضريبة، ومقرّب لقرشين.",
            "method عادية بتعدّل الـ object.",
            "بتستخدم الـ staticmethod عشان تتأكد من السعر.",
            "ارفض السعر الغلط.",
            "ضيف العنصر.",
            R`[[@classmethod]]: الـ method اللي تحت بتاخد الـ class نفسه.`,
            R`طريقة إنشاء بديلة من dict، و [[cls]] هو الـ class، والنوع [[Self]].`,
            R`[[cls(...)]] مش [[Order(...)]]، عشان لو ابن ناداها يرجعله ابن.`,
            R`[[@staticmethod]]: ملهاش [[self]] ولا [[cls]].`,
            "دالة فحص عادية، مكانها منطقي جوه الـ class.",
            "فحص بسيط.",
            "الشكل اللي بيظهر في الطباعة والـ debugger.",
            R`بيستخدم [[total]] كخاصية.`,
            "object جديد.",
            R`[[o.add(50)]] = [[Order.add(o, 50)]].`,
            R`بيطبع [[Order('Sara', total=399.0) 399.0]].`,
            R`نفس النداء بالشكل الطويل: [[self]] هو [[o]].`,
            "object من الـ classmethod.",
            "الـ class attribute بتتقري من الـ class ومن الـ object.",
            "دي مبتغيّرش الـ class: بتعمل instance attribute لـ o2 بس.",
            "o2 بقى من غير ضريبة، والـ class زي ما هو.",
            "property من غير setter: ممنوع تكتب عليها."
          ]
        },
        {
          cmd: "الوراثة و super و MRO",
          title: "وراثة و super() و mixins: Python بيدوّر على الـ method فين؟",
          desc: R`[[class SmsNotifier(Notifier):]] معناها إن SmsNotifier بيورث كل حاجة في Notifier، وتقدر تعيد تعريف أي method (override). و [[super().send(...)]] بينادي النسخة اللي في الأب، فتزوّد على سلوكه بدل ما تنسخه.

و Python بيسمح بوراثة من أكتر من class. أشهر استخدام ليها الـ mixins: classes صغيرة بتضيف سلوك واحد (لوج، cache) وتتركّب مع غيرها. والترتيب اللي Python بيدوّر بيه على الـ methods اسمه MRO، وتشوفه بـ [[Class.__mro__]].`,
          example: R`class Notifier:
    def __init__(self, sender: str):
        self.sender = sender
    def send(self, to: str, text: str) -> str:
        return f"[{self.sender}] -> {to}: {text}"
class SmsNotifier(Notifier):
    def __init__(self, sender: str, max_len: int = 160):
        super().__init__(sender)
        self.max_len = max_len
    def send(self, to: str, text: str) -> str:
        return super().send(to, text[: self.max_len])
class LoggingMixin:
    def send(self, to: str, text: str) -> str:
        result = super().send(to, text)
        print("LOG:", result)
        return result
class LoggedSms(LoggingMixin, SmsNotifier):
    pass
n = LoggedSms("shop", max_len=5)
n.send("010", "hello world")                  # LOG: [shop] -> 010: hello
print([c.__name__ for c in LoggedSms.__mro__])
print(isinstance(n, Notifier), issubclass(SmsNotifier, LoggingMixin))`,
          try: R`اطبع [[LoggedSms.__mro__]] وافهم الترتيب. وبعدين اعمل [[SignMixin]] بترجع [[super().send(...) + " (via shop)"]]، واعمل classين: [[A(LoggingMixin, SignMixin, SmsNotifier)]] و [[B(SignMixin, LoggingMixin, SmsNotifier)]]. نادي [[send]] على الاتنين وقارن سطر الـ LOG والقيمة اللي رجعت.`,
          sol: R`الاتنين بيرجعوا [[[shop] -> 010: hello (via shop)]]، بس سطر اللوج مختلف: A بيطبع [[LOG: [shop] -> 010: hello (via shop)]] و B بيطبع [[LOG: [shop] -> 010: hello]] من غير التوقيع.

السبب الـ MRO: في A الترتيب [[A, LoggingMixin, SignMixin, SmsNotifier, Notifier, object]]، فـ LoggingMixin بينادي [[super()]] اللي هو SignMixin، والتوقيع بيتضاف قبل ما اللوج يشوف النتيجة. وفي B العكس: SignMixin برّه، فاللوج بيشوف النتيجة قبل التوقيع. يعني [[super()]] مش «الأب»، هو «اللي بعدي في الـ MRO بتاع الـ object الحقيقي». الغلطة الشائعة إنك تفتكر إن ترتيب الـ mixins مش فارق، أو إن [[super()]] جوه mixin بينادي [[object]] (هو بينادي اللي بعده في السلسلة، وعشان كده الـ mixin بيشتغل أصلًا).`,
          solCode: R`class Notifier:
    def __init__(self, sender: str):
        self.sender = sender
    def send(self, to: str, text: str) -> str:
        return f"[{self.sender}] -> {to}: {text}"
class SmsNotifier(Notifier):
    def __init__(self, sender: str, max_len: int = 160):
        super().__init__(sender)
        self.max_len = max_len
    def send(self, to: str, text: str) -> str:
        return super().send(to, text[: self.max_len])
class LoggingMixin:
    def send(self, to: str, text: str) -> str:
        result = super().send(to, text)
        print("LOG:", result)
        return result
class SignMixin:
    def send(self, to: str, text: str) -> str:
        return super().send(to, text) + " (via shop)"
class A(LoggingMixin, SignMixin, SmsNotifier):
    pass
class B(SignMixin, LoggingMixin, SmsNotifier):
    pass
print("A returns:", A("shop", max_len=5).send("010", "hello world"))
print("B returns:", B("shop", max_len=5).send("010", "hello world"))
print([c.__name__ for c in A.__mro__])
print([c.__name__ for c in B.__mro__])`,
          flag: "script",
          deep: {
            why: R`هتقابل الوراثة في كل framework: [[BaseModel]] في Pydantic، و [[DeclarativeBase]] في SQLAlchemy، و [[Exception]] للأخطاء بتاعتك، و mixins في Django. ولو مش فاهم الـ MRO و [[super()]]، هتتلخبط في أول مرة method مبتتناداش أو بتتنادى مرتين. والـ MRO سؤال انترفيو Python متوسط/متقدم.`,
            how: R`لما تنادي [[n.send(...)]]، Python بيدوّر على [[send]] في الـ classes بترتيب [[type(n).__mro__]] وأول واحد يلاقيها بيشغّلها. الترتيب بيتحسب بخوارزمية اسمها C3 linearization، وقواعدها العملية: الابن قبل الأب، والآباء بنفس ترتيب كتابتهم في تعريف الـ class، وكل class بيظهر مرة واحدة، و [[object]] في الآخر.

[[super()]] من غير باراميترات بترجع proxy بيدوّر في الـ MRO بتاع الـ object الحالي ابتداءً من بعد الـ class اللي انت مكتوب فيه. عشان كده LoggingMixin (اللي مش وارث من حاجة غير object) بتقدر تنادي [[super().send]] وتوصل لـ SmsNotifier: ده «cooperative multiple inheritance»، وشرطه إن كل class في السلسلة ينادي [[super()]] بنفس الـ signature.

لو الابن عرّف [[__init__]]، الأب مبيتناداش لوحده: لازم [[super().__init__(...)]]، وإلا الخواص بتاعة الأب مش هتتعمل ([[AttributeError: 'SmsNotifier' object has no attribute 'sender']]).

[[isinstance(obj, Cls)]] بيقول الـ object من النوع ده أو من أي ابن ليه، و [[issubclass(A, B)]] نفس الكلام على الـ classes.`,
            when: R`وراثة لعلاقة «is-a» حقيقية ومستوى أو اتنين بس، أو لما الـ framework بيطلبها (BaseModel و Exception). وmixins لسلوك صغير مستقل بيتكرر. ولأغلب الحالات التانية composition أوضح: الـ class عنده object تاني ([[self.sender = EmailSender()]]) بدل ما يورث منه. وللـ interface بين الأجزاء: Protocol (درس «Protocol و ABC»).`,
            mistakes: R`تنسى [[super().__init__()]] في الابن. وتنادي [[Notifier.__init__(self, ...)]] بالاسم في وراثة متعددة فالـ class المشترك يتنادى مرتين. ووراثة ٤ و ٥ مستويات عشان تعيد استخدام method واحدة. و override بـ signature مختلف عن الأب (mypy بيعلّم عليه، والـ mixins بتقع). وفي الانترفيو: «إيه الـ diamond problem وPython بيحله إزاي؟» الإجابة: الـ MRO بيضمن إن كل class يظهر مرة واحدة، و [[super()]] بيمشي على السلسلة دي.`
          },
          lines: [
            "الـ class الأساسي.",
            "بياخد اسم المرسل.",
            "خزّنه.",
            "الـ method الأساسية.",
            "بترجع الرسالة متنسقة.",
            R`ابن: بيورث كل حاجة في [[Notifier]].`,
            "باراميتر زيادة.",
            R`[[super().__init__]]: خلّي الأب يعمل الـ sender.`,
            "الزيادة بتاعة الابن.",
            "override لنفس الـ method.",
            R`بيقص الرسالة وبينادي نسخة الأب بـ [[super()]].`,
            "mixin: سلوك واحد، ومش وارث من حاجة.",
            "نفس اسم الـ method.",
            R`[[super()]] هنا بينادي اللي بعده في الـ MRO، مش object.`,
            "سجّل.",
            "رجّع زي ما هو.",
            "ركّب: اللوج برّه والـ SMS جوه.",
            "مفيش كود زيادة.",
            "object: max_len بتوصل لـ SmsNotifier عبر السلسلة.",
            "اللوج بيطبع الرسالة بعد القص.",
            R`الترتيب: [[LoggedSms, LoggingMixin, SmsNotifier, Notifier, object]].`,
            R`True: SMS نوع من Notifier. و False: SmsNotifier مش وارث من الـ mixin.`
          ]
        },
        {
          cmd: "dunder methods",
          title: "تخلّي الـ class بتاعك يشتغل مع ==، و len، و for، و +",
          desc: R`الـ methods اللي اسمها بين شرطتين من الناحيتين ([[__x__]]، اسمها dunder أو «magic methods») هي اللي بتخلي الـ class بتاعك يشتغل مع أدوات اللغة: [[__repr__]] و [[__str__]] للطباعة، و [[__eq__]] لـ [[==]]، و [[__lt__]] لـ [[<]] و [[sorted]]، و [[__hash__]] عشان يبقى مفتاح في dict، و [[__len__]] لـ [[len()]]، و [[__iter__]] لـ for، و [[__contains__]] لـ [[in]]، و [[__add__]] لـ [[+]].

انت عمرك ما بتناديها بنفسك ([[a.__len__()]])؛ Python هو اللي بيناديها لما تكتب [[len(a)]]. وده اسمه protocols أو duck typing: أي object فيه [[__iter__]] ينفع تلف عليه، من غير ما يورث من حاجة.`,
          example: R`from functools import total_ordering
@total_ordering
class Money:
    def __init__(self, cents: int, currency: str = "EGP"):
        self.cents, self.currency = cents, currency
    def __repr__(self) -> str:
        return f"Money({self.cents}, {self.currency!r})"
    def __str__(self) -> str:
        return f"{self.cents / 100:,.2f} {self.currency}"
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Money):
            return NotImplemented
        return (self.cents, self.currency) == (other.cents, other.currency)
    def __hash__(self) -> int:
        return hash((self.cents, self.currency))
    def __lt__(self, other: "Money") -> bool:
        return self.cents < other.cents
    def __add__(self, other: "Money") -> "Money":
        return Money(self.cents + other.cents, self.currency)
    def __bool__(self) -> bool:
        return self.cents != 0
class Cart:
    def __init__(self, *prices: Money):
        self._prices = list(prices)
    def __len__(self) -> int:
        return len(self._prices)
    def __iter__(self):
        return iter(self._prices)
    def __contains__(self, item: Money) -> bool:
        return item in self._prices
cart = Cart(Money(15000), Money(2550), Money(15000))
print(len(cart), Money(2550) in cart)          # 3 True
print(sum(cart, Money(0)))                     # 325.50 EGP
print(max(cart), repr(min(cart)))              # 150.00 EGP Money(2550, 'EGP')
print(Money(1) >= Money(1), {Money(5), Money(5)})
print(bool(Money(0)), Money(5) == 5)           # False False`,
          try: R`اعمل class [[Playlist(name, songs)]] بحيث: [[len(p)]] عدد الأغاني، و [[p[0]]] و [[p[-1]]] و [[p[1:]]] يشتغلوا ([[__getitem__]])، و [[for song in p]] و [["b" in p]]، و [[p1 + p2]] يرجّع playlist جديدة اسمها [["chill+gym"]]، و [[==]] بيقارن الأغاني بس. وجرّب [[p + 5]]: لازم يطلع TypeError واضح.`,
          sol: R`المتوقع: [[Playlist('chill+gym', 3 songs) a c ['b', 'c']]] وبعدين [[['a', 'b', 'c'] True]] وبعدين [[True]] (playlist باسم مختلف ونفس الأغاني متساوية)، و [[p + 5]] بتطلّع [[TypeError: unsupported operand type(s) for +: 'Playlist' and 'int']].

السر في الـ TypeError إن [[__add__]] بترجع [[NotImplemented]] (قيمة خاصة، مش exception) لما النوع مش Playlist، فـ Python بيجرّب [[int.__radd__]] وبعدين يرمي الخطأ المعتاد. لو رميت خطأ بنفسك أو رجّعت [[False]] هتبوّظ الآلية دي. و [[__getitem__]] لوحدها بتخلي الـ slicing والـ indexes السالبة تشتغل لأنك بتمرر الـ index للـ list. وخلي بالك: لما عرّفت [[__eq__]] من غير [[__hash__]]، Python خلّى الـ class unhashable، فـ [[{a}]] هيطلع [[TypeError: unhashable type]]. ده مقصود: object بيتغير مينفعش يبقى مفتاح.`,
          solCode: R`class Playlist:
    def __init__(self, name: str, songs: list[str] | None = None):
        self.name = name
        self.songs = list(songs or [])
    def __repr__(self) -> str:
        return f"Playlist({self.name!r}, {len(self)} songs)"
    def __len__(self) -> int:
        return len(self.songs)
    def __getitem__(self, index):
        return self.songs[index]
    def __iter__(self):
        return iter(self.songs)
    def __add__(self, other: "Playlist") -> "Playlist":
        if not isinstance(other, Playlist):
            return NotImplemented
        return Playlist(f"{self.name}+{other.name}", self.songs + other.songs)
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Playlist):
            return NotImplemented
        return self.songs == other.songs
a = Playlist("chill", ["a", "b"])
b = Playlist("gym", ["c"])
mix = a + b
print(mix, mix[0], mix[-1], mix[1:])
print(list(mix), "b" in mix)
print(a == Playlist("other", ["a", "b"]))
try:
    a + 5
except TypeError as e:
    print("TypeError:", e)`,
          flag: "script",
          deep: {
            why: R`class من غير [[__repr__]] بيطبع [[<__main__.Money object at 0x7f...>]] في اللوج ومحدش فاهم حاجة. ومن غير [[__eq__]]، كائنين بنفس القيمة مش متساويين. والـ dunders هي اللي بتخلي الـ class بتاعك يحس إنه built-in: [[sorted(prices)]] و [[sum(cart)]] و [[max(cart)]] يشتغلوا من غير كود زيادة.`,
            how: R`[[len(x)]] بتنادي [[type(x).__len__(x)]]، و [[a + b]] بتنادي [[a.__add__(b)]]، ولو رجعت [[NotImplemented]] بتجرّب [[b.__radd__(a)]]. و [[a == b]] نفس الفكرة، ولو الاتنين رجّعوا [[NotImplemented]] بيرجع لمقارنة الهوية ([[is]]). عشان كده [[Money(5) == 5]] بترجع [[False]] بهدوء بدل ما ترمي.

[[__repr__]] للمبرمج (لازم يبقى واضح وأحسن لو شبه الكود اللي يعمل الـ object)، و [[__str__]] للمستخدم وبيستخدمه [[print]] و [[str()]]، ولو مش موجود بيستخدم [[__repr__]].

[[__eq__]] و [[__hash__]] مرتبطين: objects متساوية لازم يبقى ليها نفس الـ hash، وإلا الـ dict والـ set يبوظوا. ولو عرّفت [[__eq__]] بس، Python بيحط [[__hash__ = None]].

[[@total_ordering]] من [[functools]]: تكتب [[__eq__]] و [[__lt__]] بس، وهو يكمّل [[<=]] و [[>]] و [[>=]]. و [[sum(cart, Money(0))]] محتاجة قيمة بداية من نفس النوع، لأن الافتراضي 0 و [[0 + Money]] مش متعرّفة. و [[__iter__]] بترجع iterator؛ أسهل طريقة [[iter(self._prices)]] أو generator بـ [[yield]].`,
            when: R`[[__repr__]] في كل class تقريبًا. و [[__eq__]] و [[__hash__]] للـ value objects (فلوس، إحداثيات)، وغالبًا dataclass بيولّدهم لك (الدرس الجاي). والباقي ([[__len__]] و [[__iter__]] و [[__add__]]) لما الـ class بتاعك فعلًا collection أو قيمة رياضية، مش عشان «شكله حلو».`,
            mistakes: R`[[__eq__]] بترمي أو ترجع False بدل [[NotImplemented]] مع الأنواع التانية. و [[__eq__]] من غير [[__hash__]] وتستغرب إن الـ object مش بيدخل set. و [[__hash__]] على خواص بتتغير (الـ object يضيع جوه الـ dict). و [[__add__]] بتعدّل [[self]] بدل ما ترجع object جديد. و [[__str__]] بس من غير [[__repr__]]، فاللوج والـ debugger يطلّعوا الشكل الوحش.`
          },
          lines: [
            "بيكمّل باقي المقارنات من eq و lt.",
            "decorator على الـ class.",
            "value object للفلوس.",
            "بالقروش كـ int.",
            "خزّن.",
            "للمبرمج: REPL ولوج و debugger.",
            "شكل زي الكود.",
            R`للمستخدم: [[print]] و [[str()]].`,
            "جنيهات بفواصل.",
            R`[[==]].`,
            "لو النوع مختلف...",
            R`...[[NotImplemented]] مش False: خلّي Python يجرّب الناحية التانية.`,
            "قارن القيم.",
            "عشان يدخل set ويبقى مفتاح dict.",
            R`hash من نفس الحاجات اللي [[__eq__]] بيقارنها.`,
            R`[[<]]، ومنها [[sorted]] و [[max]] و [[min]].`,
            "قارن القروش.",
            R`[[+]]: بيرجع object جديد.`,
            "مبيعدّلش self.",
            R`[[bool()]] و [[if money:]].`,
            "صفر يبقى False.",
            "collection بتاعتك.",
            "بتاخد أي عدد أسعار.",
            R`[[_]] في الأول: داخلي.`,
            R`[[len()]].`,
            "العدد.",
            R`[[for]] و [[sum]] و [[max]].`,
            "iterator من الـ list.",
            R`[[in]].`,
            "دوّر (بيستخدم __eq__).",
            "عربية فيها ٣ أسعار.",
            "len و in.",
            R`[[sum]] بقيمة بداية من نفس النوع، والطباعة بـ [[__str__]].`,
            R`[[max]] و [[min]] بيستخدموا [[__lt__]].`,
            R`[[>=]] جت من [[total_ordering]]، والـ set شال التكرار بفضل [[__hash__]].`,
            R`[[__bool__]]، و [[Money(5) == 5]] رجعت False بهدوء.`
          ]
        },
        {
          cmd: "dataclass",
          title: "class للداتا من غير ما تكتب __init__ بإيدك",
          desc: R`[[@dataclass]] بيكتبلك [[__init__]] و [[__repr__]] و [[__eq__]] من الأنواع اللي كتبتها. و [[frozen=True]] بيخلي الـ object ميتعدلش (وينفع مفتاح في dict)، و [[slots=True]] أخف في الذاكرة وأسرع، و [[field(default_factory=list)]] للقيم الافتراضية الـ mutable.

الفرق عن Pydantic: الـ dataclass مبيفحصش حاجة، الأنواع ديكور زي أي type hint. استخدمه للداتا الداخلية اللي انت عاملها بنفسك، و Pydantic للداتا اللي جاية من برّه.`,
          example: R`from dataclasses import dataclass, field, asdict, replace
from datetime import datetime, UTC
@dataclass(frozen=True, slots=True)
class Money:
    amount: int
    currency: str = "EGP"
@dataclass(slots=True)
class Cart:
    user_id: int
    items: list[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=lambda: datetime.now(UTC))
price = Money(15000)
print(price)                    # Money(amount=15000, currency='EGP')
print(price == Money(15000))    # True
price.amount = 1                # FrozenInstanceError
cheaper = replace(price, amount=12000)
cart = Cart(user_id=7)
cart.items.append("tea")
print(asdict(cart))
Money("oops")                   # بيعدّي! dataclass مبيفحصش الأنواع`,
          try: R`شيل [[default_factory]] واكتب [[items: list[str] = []]] وشغّل: هتلاقي Python نفسه رافض (ValueError: mutable default). وبعدين جرّب [[{price: "x"}]] مع [[frozen=True]] ومن غيرها.`,
          flag: "script",
          deep: {
            why: R`من غير dataclass بتكتب [[__init__]] فيه [[self.x = x]] لكل خاصية، و [[__repr__]] و [[__eq__]] بإيدك، وكل ما تضيف خاصية تعدّل ٣ أماكن. و [[frozen]] بيمنع نوع كامل من الـ bugs: حد عدّل object مشترك من مكان تاني.`,
            how: R`الـ decorator بيقرا الـ annotations في جسم الـ class ويولّد الـ methods. والترتيب مهم: خاصية ليها default مينفعش ييجي بعدها خاصية من غير default. و [[kw_only=True]] بيخلي كل الباراميترات بالاسم ويحل المشكلة دي.

[[field(default_factory=list)]] بتعمل list جديدة لكل object. و Python بيرفض [[= []]] مباشرة في dataclass لأنها كانت هتتشارك بين الكل.

[[frozen=True]] بيمنع التعديل ويولّد [[__hash__]]، فالـ object ينفع في set أو مفتاح dict. والتعديل بيبقى بنسخة جديدة: [[dataclasses.replace]] (و 3.13 ضاف [[copy.replace]] العام).

[[slots=True]] (3.10+) بيستخدم [[__slots__]] بدل [[__dict__]]: ذاكرة أقل ووصول أسرع، ومينفعش تضيف خاصية مش متعرّفة بالغلط ([[cart.itmes = ...]] بترمي AttributeError).

[[asdict]] بيحوّله dict (ومعاه اللي جواه)، مفيد للّوج أو قبل ما تبعته JSON.`,
            when: "value objects (فلوس، إحداثيات)، ونتايج دوال فيها كذا قيمة، والداتا الداخلية بين الطبقات. للـ request والـ response والإعدادات والداتا اللي جاية من برّه: Pydantic.",
            mistakes: R`تفتكر إن dataclass بيفحص الأنواع ([[Money("oops")]] بيعدّي). و [[datetime.now()]] كـ default مباشرة (بتتحسب مرة واحدة وقت تعريف الـ class: كل الـ objects بنفس الوقت). و [[datetime.now()]] من غير timezone على سيرفر: خزّن UTC دايمًا.`
          },
          lines: [
            "أدوات الـ dataclass.",
            R`الوقت، و [[UTC]] (3.11+).`,
            "مبيتعدلش، وأخف في الذاكرة.",
            "class للفلوس.",
            "المبلغ بالقروش كـ int: مفيش مشاكل float.",
            "خاصية ليها default.",
            "dataclass عادي بيتعدّل.",
            "عربية مشتريات.",
            "إجباري.",
            "list جديدة لكل عربية.",
            "الوقت بيتحسب وقت إنشاء كل object، مش وقت تعريف الـ class.",
            R`[[__init__]] اتولّد لوحده.`,
            R`و [[__repr__]] كمان.`,
            R`و [[__eq__]]: بيقارن القيم مش الهوية.`,
            R`[[frozen]] منع التعديل.`,
            "التعديل بنسخة جديدة.",
            "عربية جديدة، و items فاضية.",
            "الـ list بتاعتها لوحدها.",
            "حوّلها dict.",
            "مفيش فحص وقت التشغيل: الفحص ده شغل Pydantic."
          ],
          sol: R`مع [[items: list[str] = []]] الـ class مش هيتعرّف أصلًا: [[ValueError: mutable default <class 'list'> for field items is not allowed: use default_factory]]. الـ dataclass بيمنعها عشان كل الـ carts هتشارك نفس الـ list (نفس غلطة الـ default المتغير في الدوال)، و [[default_factory=list]] بيعمل list جديدة لكل object.

و [[{price: "x"}]] مع [[frozen=True]] بتشتغل: [[{Money(amount=15000, currency='EGP'): 'x'}]]، لأن frozen مع [[eq]] (الافتراضي) بيعملوا [[__hash__]] من الحقول. من غير frozen هتاخد [[TypeError: unhashable type: 'Money']]: الـ dataclass عمل [[__eq__]] فشال الـ hash الافتراضي، لأن object ممكن يتغير ميبقاش آمن كمفتاح.`
        },
        {
          cmd: "Enum",
          title: "قيم محددة بالاسم بدل strings سايبة: Enum و StrEnum",
          desc: R`لما قيمة ليها اختيارات محددة (حالة طلب، دور مستخدم، أولوية)، بدل ما تكتب [["shipped"]] كـ string في ٢٠ مكان وحد يكتب [["shiped"]]، اعمل [[Enum]]: كل اختيار اسم ثابت، والمحرر بيكمّله، والغلطة الإملائية بتطلع [[AttributeError]] فورًا.

[[StrEnum]] (3.11+) أعضاؤه strings فعلًا، فبيتقارن بالـ string وبيتحوّل JSON من غير تعب، وده الأنسب مع APIs وقواعد البيانات. و [[IntEnum]] نفس الفكرة بأرقام، و [[Flag]] لصلاحيات بتتجمع بـ [[|]]. و [[auto()]] بيدّي القيمة لوحده.`,
          example: R`from enum import Enum, Flag, IntEnum, StrEnum, auto
class OrderStatus(StrEnum):
    PENDING = auto()
    PAID = auto()
    SHIPPED = auto()
    CANCELLED = auto()
print(OrderStatus.PAID, OrderStatus.PAID == "paid")      # paid True
s = OrderStatus("shipped")
print(s.name, s.value, s is OrderStatus.SHIPPED)          # SHIPPED shipped True
print([st.value for st in OrderStatus])
class Priority(IntEnum):
    LOW = 1
    HIGH = 3
print(Priority.HIGH > Priority.LOW, Priority(3).name)     # True HIGH
class Perm(Flag):
    READ = auto()
    WRITE = auto()
    DELETE = auto()
editor = Perm.READ | Perm.WRITE
print(Perm.WRITE in editor, Perm.DELETE in editor)        # True False
class Color(Enum):
    RED = "#f00"
print(Color.RED == "#f00", Color("#f00"))                 # False Color.RED
match s:
    case OrderStatus.SHIPPED | OrderStatus.PAID:
        print("اتدفع")
    case OrderStatus.CANCELLED:
        print("اتلغى")
OrderStatus("lost")                                        # ValueError: 'lost' is not a valid OrderStatus`,
          try: R`اعمل [[OrderStatus]] فيها PENDING و PAID و SHIPPED و DELIVERED و CANCELLED، و dict اسمه [[ALLOWED]] بيقول من كل حالة ينفع تروح لأنهي حالات (PENDING لـ PAID أو CANCELLED، و PAID لـ SHIPPED أو CANCELLED، و SHIPPED لـ DELIVERED بس)، ودالة [[can_move(current, new)]]. وضيف assert بيتأكد إن كل حالة في الـ Enum ليها سطر في [[ALLOWED]].`,
          sol: R`المتوقع: [[can_move(PENDING, PAID)]] ترجع True، و [[can_move(SHIPPED, CANCELLED)]] ترجع False (اتشحن خلاص، مينفعش يتلغى)، و [[can_move(OrderStatus("paid"), OrderStatus("shipped"))]] True، ودي الطريقة اللي بتحوّل بيها string جاي من الـ request أو القاعدة لـ Enum.

الـ assert [[set(ALLOWED) == set(OrderStatus)]] هو اللي بيحميك لما حد يضيف حالة جديدة (REFUNDED مثلًا) وينسى يحدد انتقالاتها: البرنامج يقع وقت التشغيل الأول بدل ما [[ALLOWED[new_status]]] تطلّع KeyError في نص طلب حقيقي. والحالات النهائية (DELIVERED و CANCELLED) قيمتها [[set()]] فاضية مش مش موجودة. الغلطة الشائعة: تخزّن الانتقالات كـ strings ([[{"pending": ["paid"]}]]) فالـ typo يعدّي.`,
          solCode: R`from enum import StrEnum, auto
class OrderStatus(StrEnum):
    PENDING = auto()
    PAID = auto()
    SHIPPED = auto()
    DELIVERED = auto()
    CANCELLED = auto()
ALLOWED: dict[OrderStatus, set[OrderStatus]] = {
    OrderStatus.PENDING: {OrderStatus.PAID, OrderStatus.CANCELLED},
    OrderStatus.PAID: {OrderStatus.SHIPPED, OrderStatus.CANCELLED},
    OrderStatus.SHIPPED: {OrderStatus.DELIVERED},
    OrderStatus.DELIVERED: set(),
    OrderStatus.CANCELLED: set(),
}
def can_move(current: OrderStatus, new: OrderStatus) -> bool:
    return new in ALLOWED[current]
print(can_move(OrderStatus.PENDING, OrderStatus.PAID))
print(can_move(OrderStatus.SHIPPED, OrderStatus.CANCELLED))
print(can_move(OrderStatus("paid"), OrderStatus("shipped")))
assert set(ALLOWED) == set(OrderStatus), "كل حالة لازم يبقى ليها سطر"`,
          flag: "script",
          deep: {
            why: R`الـ status كـ string حر من أشهر مصادر الـ bugs: [["Paid"]] و [["paid"]] و [["PAID"]] في نفس القاعدة، و if بتقارن بقيمة اتكتبت غلط. والـ Enum بيجمع الاختيارات في مكان واحد. وفي FastAPI، باراميتر نوعه Enum بيتفحص لوحده (أي قيمة تانية 422) وبيظهر كـ dropdown في [[/docs]]، ونفس الكلام في Pydantic.`,
            how: R`كل عضو في الـ Enum object واحد بس (singleton): [[OrderStatus("shipped") is OrderStatus.SHIPPED]] True، وليه [[.name]] (الاسم) و [[.value]] (القيمة). و [[OrderStatus("lost")]] بيرمي [[ValueError]]، فده نفسه validation. والـ Enum بيتلف عليه بالترتيب اللي اتكتب بيه.

[[Enum]] العادي مش بيتساوى مع قيمته: [[Color.RED == "#f00"]] False، ولازم [[Color.RED.value]]. أما [[StrEnum]] و [[IntEnum]] فورثوا من str و int، فبيتقارنوا ويتطبعوا كقيمتهم. و [[auto()]] في [[StrEnum]] بيدّي اسم العضو بحروف صغيرة.

[[Flag]]: كل عضو bit، و [[|]] بيجمعهم، و [[in]] بيسأل «الصلاحية دي موجودة؟». ومع [[match]] الأعضاء فيهم نقطة ([[OrderStatus.SHIPPED]])، فبيتقارنوا كقيم مش capture (درس «match و case»).

في Postgres تقدر تخزّن الـ StrEnum كـ [[text]] مع [[CHECK]]، أو كـ enum type في القاعدة (تاب «SQL و Prisma»).`,
            when: R`أي مجموعة قيم ثابتة ومعروفة وقت كتابة الكود: حالات، أدوار، أنواع. لو القيم بتتغير من لوحة تحكم (فئات منتجات بيضيفها الأدمن)، مكانها جدول في القاعدة مش Enum.`,
            mistakes: R`[[Enum]] عادي وتقارنه بـ string فيطلع False دايمًا في صمت (استخدم StrEnum). وتخزّن [[.name]] في القاعدة مرة و [[.value]] مرة. وتغيّر قيمة عضو موجود وفي داتا قديمة بالقيمة القديمة. و [[case PAID:]] من غير اسم الـ Enum جوه match (capture مش مقارنة).`
          },
          lines: [
            "أنواع الـ Enum.",
            R`[[StrEnum]]: الأعضاء strings.`,
            R`[[auto()]] بيدّي "pending".`,
            "و paid.",
            "و shipped.",
            "و cancelled.",
            "بيطبع كقيمته، وبيتساوى مع الـ string.",
            R`من string لـ Enum: ده اللي بتعمله مع داتا جاية من برّه.`,
            R`الاسم والقيمة، وعضو واحد بس ([[is]]).`,
            "لف على كل الأعضاء بالترتيب.",
            "Enum بأرقام.",
            "قيمة.",
            "قيمة.",
            R`بيتقارن كأرقام، و [[Priority(3)]] بيرجع العضو.`,
            "صلاحيات بتتجمع.",
            "bit.",
            "bit.",
            "bit.",
            R`[[|]]: قراية وكتابة.`,
            R`[[in]]: الصلاحية موجودة؟`,
            R`[[Enum]] عادي.`,
            "قيمة.",
            R`مش بيتساوى مع قيمته، و [[Color("#f00")]] بيرجع العضو.`,
            "match على Enum.",
            "الاسم فيه نقطة: مقارنة، مش capture.",
            "جوه الـ case.",
            "حالة تانية.",
            "جوه الـ case.",
            R`قيمة مش موجودة: [[ValueError]]. ده validation ببلاش.`
          ]
        },
        {
          cmd: "Protocol و ABC",
          title: "interface في Python: ABC ولا Protocol؟",
          desc: R`لما دالة محتاجة «أي حاجة بتعرف تبعت رسالة» ومش فارق معاها إيميل ولا SMS ولا fake في الاختبار، محتاج تعرّف الشكل ده. فيه طريقتين:

[[ABC]] مع [[@abstractmethod]]: class أساسي لازم الأبناء يورثوا منه ويكتبوا الـ methods، ولو ابن نسي واحدة، Python يرفض يعمل object منه. و [[typing.Protocol]] (structural typing، زي interface في TypeScript): بتوصف الشكل بس، وأي class فيه نفس الـ methods يطابق من غير ما يورث من حاجة. mypy و pyright هما اللي بيفحصوا.`,
          example: R`from abc import ABC, abstractmethod
from typing import Protocol, runtime_checkable
type Message = tuple[str, str]
class Storage(ABC):
    @abstractmethod
    def save(self, key: str, data: bytes) -> None: ...
    def save_text(self, key: str, text: str) -> None:
        self.save(key, text.encode("utf-8"))
class MemoryStorage(Storage):
    def __init__(self) -> None:
        self.files: dict[str, bytes] = {}
    def save(self, key: str, data: bytes) -> None:
        self.files[key] = data
store = MemoryStorage()
store.save_text("a.txt", "أهلًا")
print(store.files)
@runtime_checkable
class Sender(Protocol):
    def send(self, to: str, text: str) -> None: ...
class EmailSender:
    def send(self, to: str, text: str) -> None:
        print("email to", to, ":", text)
class FakeSender:
    def __init__(self) -> None:
        self.sent: list[Message] = []
    def send(self, to: str, text: str) -> None:
        self.sent.append((to, text))
def notify_shipped(sender: Sender, to: str) -> None:
    sender.send(to, "طلبك اتشحن")
notify_shipped(EmailSender(), "sara@example.com")
fake = FakeSender()
notify_shipped(fake, "omar@example.com")
print(fake.sent, isinstance(fake, Sender))
Storage()                                      # TypeError: Can't instantiate abstract class Storage`,
          try: R`اعمل Protocol اسمه [[Clock]] فيه [[now() -> datetime]]، و classين [[SystemClock]] (بيرجع [[datetime.now(UTC)]]) و [[FixedClock(at)]] (بيرجع وقت ثابت)، ودالة [[is_expired(expires_at, clock)]]. اختبر الحد: قبل الموعد بثانية، وعند الموعد بالظبط. وشغّل [[mypy --strict]] على الملف.`,
          sol: R`المتوقع: قبل الموعد بثانية [[False]]، وعند الموعد بالظبط [[True]] (لأن الشرط [[>=]])، و [[SystemClock]] بيرجع [[False]] لحد 1 أكتوبر 2026 و [[True]] بعدها. و [[mypy --strict]] مبيطلعش أخطاء، مع إن ولا class ورث من [[Clock]].

الفكرة إن الوقت بقى dependency بتتبعت، فالاختبار بيحط الوقت اللي هو عايزه بدل ما يستنى أو يعمل mock لـ [[datetime]]. ولو غيّرت [[FixedClock.now]] ترجع [[str]]، mypy هيرفض النداء ([[incompatible type "FixedClock"; expected "Clock"]]) وده الفحص اللي الـ Protocol بيدّيهولك. الغلطة الشائعة: [[datetime(2026, 10, 1)]] من غير [[tzinfo]]، فالمقارنة مع [[datetime.now(UTC)]] ترمي [[TypeError: can't compare offset-naive and offset-aware datetimes]] (درس «datetime و zoneinfo»).`,
          solCode: R`from datetime import UTC, datetime
from typing import Protocol
class Clock(Protocol):
    def now(self) -> datetime: ...
class SystemClock:
    def now(self) -> datetime:
        return datetime.now(UTC)
class FixedClock:
    def __init__(self, at: datetime) -> None:
        self.at = at
    def now(self) -> datetime:
        return self.at
def is_expired(expires_at: datetime, clock: Clock) -> bool:
    return clock.now() >= expires_at
deadline = datetime(2026, 10, 1, tzinfo=UTC)
print(is_expired(deadline, FixedClock(datetime(2026, 9, 30, 23, 59, 59, tzinfo=UTC))))
print(is_expired(deadline, FixedClock(deadline)))
print(is_expired(deadline, SystemClock()))`,
          flag: "script",
          deep: {
            why: R`الكود اللي بيعتمد على شكل مش على class معين سهل تختبره (تبعت fake) وسهل تغيّر الـ implementation (S3 بدل ملفات محلية). وده نفس مبدأ الـ dependency injection اللي FastAPI مبني عليه ([[Depends]]، المستوى ٢)، ونفس اللي في تاب «هندسة البرمجيات».`,
            how: R`[[ABC]]: [[class Storage(ABC)]] و [[@abstractmethod]] على الـ methods الإجبارية. محاولة [[Storage()]] أو ابن ناقص method بترمي [[TypeError: Can't instantiate abstract class]] وقت التشغيل. والـ ABC ينفع يبقى فيه methods عادية مشتركة ([[save_text]] بتستخدم [[save]])، ودي ميزته.

[[Protocol]]: مفيش وراثة. الـ type checker بيقارن الـ methods والـ signatures، فـ [[SmsSender]] فيها [[send(self, phone)]] بس هيترفض: mypy بيطلّع [[Argument 1 to "notify_shipped" has incompatible type "SmsSender"; expected "Sender"]] ويوريك الـ signature المتوقع واللي لقاه. ووقت التشغيل Python مبيفحصش حاجة.

[[@runtime_checkable]] بيخلي [[isinstance(x, Sender)]] يشتغل، بس بيفحص إن الـ method موجودة بالاسم بس، مش الـ signature، فمتعتمدش عليه كـ validation.

[[...]] (Ellipsis) كجسم للـ method معناه «مفيش implementation هنا». وده نفس الـ duck typing اللي Python طول عمره عليه، بس بقى ليه نوع يفحصه المحرر.`,
            when: R`Protocol للحدود بين الأجزاء (sender، storage، clock، repository)، خصوصًا لما الـ implementations في مكتبات مش بتاعتك ومش هتورث من class بتاعك. و ABC لما عايز تفرض الوراثة وقت التشغيل أو تشارك كود بين الأبناء. ومتعملش أي واحد منهم لو عندك implementation واحد ومفيش fake: دالة أو class عادي كفاية.`,
            mistakes: R`Protocol وتفتكر إن Python هيفحصه وقت التشغيل (مش هيفحص، شغّل mypy أو pyright). و [[runtime_checkable]] كـ validation للـ signature. و interface لكل class «احتياطي» (تاب «هندسة البرمجيات» فيه درس عن ده). و ABC ترث منه وتنسى [[@abstractmethod]] فمفيش أي فحص.`
          },
          lines: [
            "أدوات الـ ABC.",
            "أدوات الـ Protocol.",
            R`اسم لنوع (3.12+): الرسالة (لمين، النص).`,
            "class أساسي abstract.",
            "لازم أي ابن يكتبها.",
            R`[[...]]: مفيش جسم.`,
            "method عادية مشتركة بين الأبناء.",
            "بتستخدم الـ abstract method.",
            "ابن بيورث.",
            "الـ init.",
            "تخزين في الذاكرة.",
            "كتب الـ method الإجبارية.",
            "خزّن.",
            "object من الابن: مسموح.",
            "method من الأب بتنادي method الابن.",
            "النص اتخزن bytes بـ UTF-8.",
            R`عشان [[isinstance]] يشتغل مع الـ Protocol.`,
            "Protocol: الشكل بس.",
            "أي حاجة فيها send بالـ signature ده تطابق.",
            "class عادي، مش وارث من Sender.",
            "بس فيه send بنفس الشكل.",
            "بيطبع.",
            "fake للاختبار، برضه مش وارث.",
            "الـ init.",
            "بيحفظ اللي اتبعت بدل ما يبعته.",
            "نفس الشكل.",
            "سجّل.",
            R`الدالة بتطلب [[Sender]]، مش class معين.`,
            "بتنادي send وخلاص.",
            "إيميل حقيقي.",
            "fake.",
            "نفس الدالة من غير أي تغيير.",
            R`اللي اتبعت، و [[isinstance]] True بفضل runtime_checkable.`,
            "abstract: TypeError."
          ]
        }
      ]
    }
]);

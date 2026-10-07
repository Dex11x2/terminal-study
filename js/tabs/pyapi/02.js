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
          teach: R`## المثال بيعمل إيه؟

٤ دوال صغيرة، كل واحدة بتوري طريقة مختلفة تبعت بيها باراميترات: بالاسم بس ([[*]] لوحدها)، وتلم الزيادة ([[*args]] و [[**kwargs]])، وتفك dict أو list وقت النداء ([[**data]] و [[*nums]]). كل الأرقام تحت من تشغيل حقيقي بـ Python 3.14 على ويندوز و Python 3.13 على لينكس ([[docker run --rm python:3.13-slim]])، والناتج طلع هو هو.

> المثال فيه سطر بيرمي [[TypeError]] بالقصد ([[paginate("tea", 2)]]). لو حطيت المثال كله في ملف وشغّلته، البرنامج هيقف عند السطر ده. جرّبه سطر سطر في الـ REPL (اكتب [[python]] من غير ملف)، أو شيل السطر ده من الملف.

---

## ١. [[paginate]]: باراميترات بالاسم بس

~~~python
def paginate(query: str, *, page: int = 1, size: int = 20) -> dict:
    return {"q": query, "offset": (page - 1) * size, "limit": size}
~~~

نفكّ أول سطر حتة حتة:

- [[def paginate(...)]]: عرّف دالة اسمها [[paginate]] (يعني «قسّم النتايج لصفحات»).
- [[query: str]]: باراميتر عادي اسمه [[query]]، و [[: str]] **type hint** بيقول إنه نص. Python مبيفحصوش وقت التشغيل، ده للي بيقرا وللمحرر.
- [[*]] لوحدها: مش باراميتر، دي **فاصل**. أي باراميتر بعدها لازم يتبعت **بالاسم**، ومينفعش بالمكان. الاسم الرسمي ليهم keyword-only.
- [[page: int = 1]]: باراميتر نوعه رقم صحيح، و [[= 1]] قيمته الافتراضية (default)، فلو محدش بعته يبقى 1. وأي باراميتر ليه default بيبقى اختياري.
- [[-> dict]]: الدالة بترجّع dict.

السطر التاني بيحسب الـ [[offset]]: كام نتيجة نعدّيها قبل الصفحة دي. صفحة ٢ بحجم ٢٠ يعني نعدّي أول ٢٠: [[(2 - 1) * 20 = 20]].

### النداء السليم

~~~python
paginate("tea", page=2)
~~~

~~~text الناتج
{'q': 'tea', 'offset': 20, 'limit': 20}
~~~

[["tea"]] راحت لـ [[query]] **بالمكان** (أول باراميتر)، و [[page=2]] **بالاسم**، و [[size]] أخد الـ default بتاعه 20. ولما الأسماء مكتوبة، الترتيب بينهم ميفرقش:

~~~text الناتج: paginate("tea") و paginate("tea", size=5, page=3)
{'q': 'tea', 'offset': 0, 'limit': 20}
{'q': 'tea', 'offset': 10, 'limit': 5}
~~~

### النداء الممنوع

~~~python
paginate("tea", 2)
~~~

~~~text الناتج
Traceback (most recent call last):
  File "<string>", line 4, in <module>
    paginate('tea', 2)
    ~~~~~~~~^^^^^^^^^^
TypeError: paginate() takes 1 positional argument but 2 were given
~~~

اقرا الرسالة: الدالة بتاخد باراميتر واحد بس **بالمكان** (positional، يعني [[query]]) وانت بعت اتنين. الـ [[2]] دي كانت هتبقى page ولا size؟ محدش يعرف من غير ما يفتح الدالة، و [[*]] بتمنع السؤال ده من الأساس.

---

## ٢. [[log]]: [[*args]] و [[**kwargs]] بيلموا الزيادة

~~~python
def log(msg: str, *args, **kwargs):
    print(msg, args, kwargs)
log("hi", 1, 2, user="sara")
~~~

- [[*args]]: النجمة الواحدة قبل اسم معناها «أي باراميترات زيادة **بالمكان** حطها في **tuple** اسمه [[args]]». (tuple زي الـ list بس متتعدلش.)
- [[**kwargs]]: النجمتين معناهم «أي باراميترات زيادة **بالاسم** حطها في **dict** اسمه [[kwargs]]». kwargs اختصار keyword arguments.
- الأسماء [[args]] و [[kwargs]] اتفاق بس. المهم النجوم، وكان ممكن تكتب [[*extra]].

~~~text الناتج
hi (1, 2) {'user': 'sara'}
~~~

[["hi"]] راحت لـ [[msg]]، و [[1, 2]] ملهمش مكان فراحوا [[args]]، و [[user="sara"]] ملهاش باراميتر بالاسم ده فراحت [[kwargs]]. ولو مبعتش زيادة خالص، هتلاقيهم tuple فاضي [[()]] و dict فاضي [[{}]]، مش [[None]]:

~~~text الناتج: نوعهم لما تنادي log("x")
<class 'tuple'> <class 'dict'>
~~~

---

## ٣. [[**data]] وقت النداء: فك dict

~~~python
def create_user(name: str, email: str, role: str = "user"):
    return {"name": name, "email": email, "role": role}
data = {"name": "Sara", "email": "s@x.com"}
create_user(**data)
~~~

نفس الرمز [[**]] بس **في مكان تاني**، فمعناه عكس اللي فات:

| مكانه | معناه |
|---|---|
| في التعريف [[def f(**kwargs)]] | **لم** الباراميترات بالاسم في dict |
| في النداء [[f(**data)]] | **فك** الـ dict لباراميترات بالاسم |

يعني [[create_user(**data)]] هي بالظبط [[create_user(name="Sara", email="s@x.com")]]:

~~~text الناتج
{'name': 'Sara', 'email': 's@x.com', 'role': 'user'}
~~~

و [[role]] أخد الـ default. والمفاتيح لازم تطابق أسماء الباراميترات بالظبط، وإلا:

~~~text الناتج: مفتاح زيادة، ومفتاح ناقص
create_user() got an unexpected keyword argument 'age'
create_user() missing 1 required positional argument: 'email'
~~~

---

## ٤. [[*nums]] وقت النداء: فك list

~~~python
nums = [3, 1, 2]
print(*nums)
~~~

[[*nums]] بتفك الليستة لباراميترات بالمكان، فالسطر ده هو [[print(3, 1, 2)]]، و [[print]] بتحط مسافة بين الباراميترات:

~~~text الناتج
3 1 2
~~~

قارن بـ [[print(nums)]] اللي بتطبع الليستة نفسها: [[[3, 1, 2]]].

---

## ٥. الحل: [[timed]] بتعدّي الباراميترات زي ما هي

~~~python solCode
import time
def timed(fn, *args, **kwargs):
    start = time.perf_counter()
    result = fn(*args, **kwargs)
    print(f"{fn.__name__} took {time.perf_counter() - start:.6f}s")
    return result
words = ["banana", "kiwi", "apple", "fig"]
print(timed(sorted, words, key=len, reverse=True))
~~~

- [[import time]]: موديول الوقت.
- [[def timed(fn, *args, **kwargs)]]: [[fn]] الدالة نفسها (الدوال في Python قيم عادية تتبعت كباراميتر)، وكل اللي بعدها بيتلم: [[words]] في [[args]]، و [[key=len, reverse=True]] في [[kwargs]].
- [[time.perf_counter()]]: ساعة دقيقة جدًا لقياس المدد (رقم بالثواني ملوش معنى لوحده، المهم الفرق بين قراءتين).
- [[fn(*args, **kwargs)]]: هنا الفك. الـ tuple اتفك بالمكان والـ dict اتفك بالاسم، فالنداء بقى [[sorted(words, key=len, reverse=True)]]. اللمّ في التعريف والفك في النداء هما الطريقة اللي بتعدّي بيها «أي باراميترات» من غير ما تعرفها.
- [[fn.__name__]]: اسم الدالة كنص ([["sorted"]]).
- [[:.6f]] جوه الـ f-string: اطبع الرقم بـ ٦ أرقام بعد العلامة العشرية.
- [[return result]]: رجّع ناتج الدالة الأصلية، وإلا [[timed]] هترجّع [[None]].
- [[key=len]]: رتّب حسب طول الكلمة، و [[reverse=True]]: من الأطول للأقصر.

~~~text الناتج (ويندوز، Python 3.14)
sorted took 0.000008s
['banana', 'apple', 'kiwi', 'fig']
~~~

الوقت هيختلف كل مرة. و [['apple']] (٥ حروف) قبل [['kiwi']] (٤)، و [['banana']] الأطول في الأول.

---

## الترتيب الكامل للباراميترات

~~~python
def f(a, b, /, c, *, d, **kw): ...
~~~

| الحتة | معناها |
|---|---|
| [[a, b]] قبل [[/]] | بالمكان بس |
| [[c]] بين [[/]] و [[*]] | بالمكان أو بالاسم |
| [[d]] بعد [[*]] | بالاسم بس |
| [[**kw]] | أي زيادة بالاسم |

[[f(1, 2, 3, d=4, e=5)]] رجّعت [[(1, 2, 3, 4, {'e': 5})]]. و [[f(a=1, b=2, c=3, d=4)]] وقعت بـ [[missing 2 required positional arguments: 'a' and 'b']]: [[a]] و [[b]] بالمكان بس، فالاسمين دول راحوا [[kw]] واعتبرهم ناقصين.

## الخلاصة

- [[*]] و [[**]] **في التعريف** بيلموا، و **في النداء** بيفكوا.
- [[*args]] tuple، و [[**kwargs]] dict.
- [[*]] لوحدها في التعريف: اللي بعدها بالاسم بس. استخدمها مع الـ flags والباراميترات الاختيارية الكتير.
- [[fn(*args, **kwargs)]] هو الأساس اللي الـ decorators (الدرس الجاي) مبنية عليه.`,
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
          teach: R`## المثال بيعمل إيه؟

بيعمل decorator اسمه [[timed]] بيقيس وقت أي دالة ويطبعه، ويحطه فوق [[slow_sum]]. وبعدين بيستخدم decorator جاهز من Python ([[@functools.cache]]) يحفظ نتايج [[fib]]. الأرقام تحت من تشغيل حقيقي بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker).

قبل أي حاجة، الفكرة اللي كل الدرس واقف عليها: **الدالة في Python قيمة عادية**. تقدر تبعتها لدالة تانية، وترجّعها من دالة، وتحطها في متغير. والـ decorator مجرد دالة بتاخد دالة وترجّع دالة.

---

## ١. الـ imports

~~~python
import functools
import time
~~~

- [[functools]]: موديول فيه أدوات بتشتغل على الدوال، هناخد منه [[wraps]] و [[cache]].
- [[time]]: هناخد منه [[perf_counter]]، ساعة دقيقة لقياس المدد.

---

## ٢. الـ decorator: ٣ طبقات صغيرة

~~~python
def timed(fn):
    @functools.wraps(fn)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        try:
            return fn(*args, **kwargs)
        finally:
            print(f"{fn.__name__} took {time.perf_counter() - start:.3f}s")
    return wrapper
~~~

### [[def timed(fn):]]

دالة عادية بتاخد باراميتر واحد [[fn]]، وهو **الدالة** اللي هنلفها.

### [[def wrapper(*args, **kwargs):]]

دالة **جوه** دالة. دي اللي هتتنادى بدل الأصلية. [[*args, **kwargs]] (الدرس اللي فات) معناها «اقبل أي باراميترات»، عشان الـ decorator يشتغل على أي دالة مهما كانت باراميتراتها.

و [[wrapper]] بتستخدم [[fn]] مع إن [[fn]] مش باراميتر بتاعها: دي اسمها **closure**، دالة بتفتكر المتغيرات اللي حواليها حتى بعد ما [[timed]] نفسها تخلص (درس «scope و LEGB»).

### جسم الـ wrapper

- [[start = time.perf_counter()]]: سجّل الوقت قبل النداء.
- [[return fn(*args, **kwargs)]]: نادي الدالة الأصلية بنفس الباراميترات اللي جت (فك الـ tuple والـ dict)، ورجّع ناتجها زي ما هو.
- [[try:]] ... [[finally:]]: اللي في [[finally]] بيشتغل **في كل الأحوال**: بعد [[return]] عادي، أو لو الدالة رمت exception. فالوقت بيتطبع حتى لو الدالة وقعت.
- [[fn.__name__]]: اسم الدالة الأصلية كنص. و [[:.3f]]: ٣ أرقام بعد العلامة العشرية.

اتجرّب على دالة بترمي:

~~~text الناتج: @timed فوق دالة بترمي ValueError("bad")
boom took 0.000s
caught bad
~~~

السطر اتطبع، والخطأ نفسه طلع لبرّه زي ما هو.

### [[return wrapper]]

[[timed]] بترجّع الدالة الداخلية **من غير أقواس**: بترجّع الدالة نفسها، مش ناتج ندائها.

### [[@functools.wraps(fn)]]

ده decorator تاني على [[wrapper]]، بينسخ عليها اسم [[fn]] والـ docstring والـ signature. الفرق اتجرّب:

~~~text الناتج: الاسم والـ signature، الأول مع wraps والتاني من غيره
slow_sum   (n: int) -> int
wrapper    (*args, **kwargs)
~~~

من غير [[wraps]] كل دالة متلفوفة اسمها [[wrapper]] في اللوج والـ traceback، والـ signature بقى [[(*args, **kwargs)]]. وده بالذات بيبوّظ FastAPI، لأنه بيقرا الـ signature عشان يعرف الـ route بياخد إيه.

---

## ٣. [[@timed]]: السطر اللي فوق الدالة

~~~python
@timed
def slow_sum(n: int) -> int:
    return sum(range(n))
~~~

[[@timed]] فوق [[def]] هي **بالظبط**:

~~~python
def slow_sum(n: int) -> int:
    return sum(range(n))
slow_sum = timed(slow_sum)
~~~

يعني الاسم [[slow_sum]] بقى بيشاور على [[wrapper]]، والأصلية محفوظة جوه الـ closure (و [[wraps]] كمان بيحطها في [[slow_sum.__wrapped__]]).

و [[sum(range(n))]]: [[range(n)]] الأرقام من 0 لحد [[n - 1]]، و [[sum]] بيجمعهم.

---

## ٤. النداء

~~~python
slow_sum(10_000_000)
~~~

الـ [[_]] جوه الرقم للقراية بس، [[10_000_000]] هي عشرة مليون. النداء بيروح لـ [[wrapper]]، اللي بتشغّل الأصلية وتطبع الوقت:

~~~text الناتج في الـ REPL (ويندوز)
slow_sum took 0.135s
49999995000000
~~~

السطر الأول طبعه الـ [[finally]]، والتاني الـ REPL بيعرضه لأنه ناتج النداء (في ملف مش هيظهر إلا لو عملت [[print]]). وعلى لينكس جوه Docker الوقت كان [[0.237s]]: الرقم بيختلف حسب الجهاز، والمهم إنه اتقاس من غير ما نلمس [[slow_sum]] نفسها.

والرقم [[49999995000000]] ده مجموع 0 لحد 9,999,999، يعني [[n × (n − 1) ÷ 2]].

---

## ٥. [[@functools.cache]]: decorator جاهز

~~~python
@functools.cache
def fib(n: int) -> int:
    return n if n < 2 else fib(n - 1) + fib(n - 2)
~~~

- [[n if n < 2 else ...]]: اسمها conditional expression: «لو n أقل من 2 رجّع n، غير كده رجّع اللي بعد else». ده تعريف أرقام فيبوناتشي: كل رقم مجموع اللي قبله واللي قبليه.
- الدالة **recursive**: بتنادي نفسها مرتين. من غير cache، [[fib(30)]] بتعيد نفس الحسابات ملايين المرات.

[[@functools.cache]] بيحفظ ناتج كل نداء في dict مفتاحه الباراميترات، ولو نفس الباراميتر جه تاني بيرجّع المحفوظ على طول. المثال بيعرّف [[fib]] بس مبيناديهاش، فاتجرّب كده:

~~~text الناتج: fib(30) من غير cache (الناتج، عدد النداءات، الوقت)، وبعدين بـ cache
832040 2692537 0.27s
832040 CacheInfo(hits=28, misses=31, maxsize=None, currsize=31) 0.000079s
~~~

- من غير cache: **٢.٧ مليون** نداء.
- بـ cache: [[misses=31]] يعني ٣١ حساب حقيقي (من [[fib(0)]] لـ [[fib(30)]]، كل واحد مرة)، و [[hits=28]] مرة رجّع من المحفوظ. و [[maxsize=None]] يعني مفيش حد أقصى للمحفوظ، و [[currsize=31]] عدد المحفوظ دلوقتي. [[fib.cache_info()]] هي اللي بتطلّع السطر ده.

---

## ٦. الحل: decorator بياخد باراميتر ([[retry]])

~~~python solCode
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
~~~

[[@retry(times=3)]] بيتنفّذ على مرحلتين: الأول [[retry(times=3)]] بتتنادى وترجّع [[decorator]]، وبعدين [[decorator]] بيتحط فوق الدالة زي [[@timed]] بالظبط. عشان كده ٣ طبقات:

| الطبقة | بتاخد | بترجّع |
|---|---|---|
| [[retry]] | [[times]] | [[decorator]] |
| [[decorator]] | الدالة [[fn]] | [[wrapper]] |
| [[wrapper]] | باراميترات النداء | ناتج [[fn]] |

جوه الـ wrapper:

- [[range(1, times + 1)]]: من 1 لحد [[times]] (الرقم التاني في [[range]] مش داخل).
- [[return fn(...)]] جوه [[try]]: لو نجحت، [[return]] بتخرج من الدالة كلها والـ loop بتقف.
- [[except Exception as e]]: لو رمت، امسك الخطأ في [[e]] واطبعه.
- [[raise]] لوحدها: في آخر محاولة، ارمي **نفس** الخطأ تاني. من غيرها الـ loop هتخلص والدالة هترجّع [[None]] في صمت.

و [[random.random()]] رقم عشوائي بين 0 و 1، فـ [[< 0.5]] نص الوقت. بـ [[random.seed]] مختلفة اتجرّب:

~~~text الناتج: seed 3، وبعدين seed 4 (التلاتة فشلوا)
attempt 1 failed: network down
ok flaky

attempt 1 failed: network down
attempt 2 failed: network down
attempt 3 failed: network down
Traceback (most recent call last):
...
ConnectionError: network down
~~~

و [[ok flaky]]: [[flaky.__name__]] فضل [[flaky]] بفضل [[wraps]].

ولو كتبت [[@retry]] من غير أقواس، [[flaky]] نفسها هتتبعت مكان [[times]]، و [[flaky]] هتبقى هي [[decorator]]:

~~~text الناتج
TypeError: retry.<locals>.decorator() missing 1 required positional argument: 'fn'
~~~

[[<locals>]] معناها «دالة متعرّفة جوه [[retry]]».

---

## الخلاصة

- [[@deco]] فوق [[def f]] = [[f = deco(f)]]. مفيش سحر.
- الـ wrapper بياخد [[*args, **kwargs]] ويعدّيهم، ولازم [[return]] لناتج الأصلية.
- [[@functools.wraps(fn)]] دايمًا، عشان الاسم والـ signature.
- decorator بباراميتر = دالة بترجّع decorator (٣ طبقات).
- [[@functools.cache]] بيحفظ النتايج في الذاكرة، للدوال اللي نفس الباراميتر بيرجّع نفس الناتج.`,
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

و [[itertools]] فيه أدوات جاهزة: [[itertools.batched(items, 4)]] (3.12+) بيعمل نفس شغل دالة [[batched]] اللي فوق بس بيطلّع tuples مش lists، وبيشتغل مع أي iterable، و [[islice]] بيقطع من generator.

وفيه async generators ([[async def]] فيها [[yield]]) بتلف عليها بـ [[async for]]، زي قراية صفوف من القاعدة بـ cursor.`,
            when: "داتا كبيرة أو ملهاش آخر (ملفات، صفوف من القاعدة، stream)، و pipelines من خطوات فلترة وتحويل. ولو الداتا صغيرة وهتلف عليها أكتر من مرة، list أبسط.",
            mistakes: R`تلف على generator مرتين والتانية فاضية. و [[len(gen)]] (مفيش len). وتعمل [[list(gen)]] على داتا ضخمة فترجع للمشكلة الأصلية. وتكتب [[return value]] جوه generator وتستنى القيمة ترجع للي نادى.`
          },
          teach: R`## المثال بيعمل إيه؟

دالتين فيهم [[yield]]: واحدة بتقرا ملف لوج سطر سطر، والتانية بتقطّع list لحتت بحجم ثابت. وبعدين بنفلتر سطور [[ERROR]] من غير ما الملف كله يدخل الذاكرة. اتشغّل بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker)، على ملف [[app.log]] صغير فيه ٤ سطور:

~~~text app.log
INFO server started
ERROR db timeout
INFO GET /users 200
ERROR disk full
~~~

> لو شغّلت المثال من غير [[app.log]] جنبه هتاخد [[FileNotFoundError: [Errno 2] No such file or directory: 'app.log']] عند سطر الـ [[for]]، مش عند سطر [[errors =]]. هنفهم ليه تحت.

---

## ١. [[read_lines]]: أول generator

~~~python
def read_lines(path: str):
    with open(path, encoding="utf-8") as f:
        for line in f:
            yield line.rstrip("\n")
~~~

- [[with open(...) as f:]]: افتح الملف، وهيتقفل لوحده لما البلوك يخلص (درس «with و context managers»). و [[encoding="utf-8"]] عشان العربي يتقري صح على ويندوز.
- [[for line in f:]]: الملف في Python بيتلف عليه **سطر سطر**، مش بيتقري كله مرة واحدة.
- [[line.rstrip("\n")]]: كل سطر جاي ومعاه حرف السطر الجديد [[\n]] في آخره، و [[rstrip]] (r = right) بيشيله من اليمين.
- [[yield]]: هنا الفرق كله. [[return]] كانت هترجّع قيمة وتنهي الدالة. [[yield]] **بتطلّع** القيمة وتوقف الدالة مكانها، ولما حد يطلب القيمة الجاية تكمّل من نفس النقطة، بنفس المتغيرات.

وجود كلمة [[yield]] في أي حتة في الدالة بيغيّر معنى ندائها: النداء **مبيشغّلش** الجسم خالص، بيرجّع object:

~~~text الناتج: print(read_lines("app.log"))
<generator object read_lines at 0x0000019341C1C340>
~~~

الملف لسه متفتحش. الرقم [[0x...]] عنوانه في الذاكرة وبيتغير كل تشغيل.

---

## ٢. [[batched]]: generator بيقطّع

~~~python
def batched(items, size: int):
    for i in range(0, len(items), size):
        yield items[i : i + size]
~~~

- [[range(0, len(items), size)]]: من 0 لحد طول الليستة (مش داخل)، **بخطوة** [[size]]. لـ ١٠ عناصر وحجم ٤: [[0, 4, 8]].
- [[items[i : i + size]]]: slice، يعني «من index [[i]] لحد [[i + size]] (مش داخل)». ولو الآخر عدّى طول الليستة، الـ slice بيقف عند آخرها من غير خطأ، فآخر حتة بتطلع أصغر.

---

## ٣. [[errors]]: generator فوق generator

~~~python
errors = (l for l in read_lines("app.log") if "ERROR" in l)
~~~

شكلها زي list comprehension بس بأقواس عادية [[( )]] بدل [[[ ]]]، ودي اسمها **generator expression**. نقراها: «لكل [[l]] جاي من [[read_lines]]، لو فيه [["ERROR"]]، طلّعه». والسطر ده **مبيقراش أي حاجة**:

~~~text الناتج: print(errors)
<generator object <genexpr> at 0x0000019341BD8E10>
~~~

[[<genexpr>]] = generator expression. عشان كده الملف المش موجود مبيوقّعش هنا.

---

## ٤. اللف: هنا بس الشغل بيحصل

~~~python
for line in errors:
    print(line)
~~~

كل لفة بتطلب سطر من [[errors]]، و [[errors]] بتطلب من [[read_lines]]، و [[read_lines]] تقرا سطر واحد من الملف. السطر اللي مفيهوش ERROR بيترمي ويتطلب اللي بعده. في أي لحظة فيه **سطر واحد بس** في الذاكرة:

~~~text الناتج
ERROR db timeout
ERROR disk full
~~~

---

## ٥. [[batched]] في loop

~~~python
for chunk in batched(list(range(10)), 4):
    print(chunk)
~~~

[[list(range(10))]] = [[[0, 1, ..., 9]]]. ([[batched]] محتاجة list حقيقية لأنها بتستخدم [[len]] و slicing.)

~~~text الناتج
[0, 1, 2, 3]
[4, 5, 6, 7]
[8, 9]
~~~

وفيه نسخة جاهزة من 3.12: [[itertools.batched(range(10), 4)]]، بتشتغل مع أي iterable (حتى generator) بس بتطلّع **tuples**: [[[(0, 1, 2, 3), (4, 5, 6, 7), (8, 9)]]].

---

## ٦. [[next]]: تسوق الـ generator بإيدك

~~~python
gen = batched([1, 2, 3], 2)
next(gen)
~~~

[[next(gen)]] بتشغّل الدالة لحد أول [[yield]] وترجّع قيمته. و [[for]] أصلًا بتنادي [[next]] لوحدها كل لفة. لو كمّلنا بإيدنا:

~~~text الناتج: next ٣ مرات
[1, 2]
[3]
StopIteration
~~~

لما الدالة تخلص، [[next]] بترمي [[StopIteration]]. الـ [[for]] بتفهمها إنها «خلاص» وتقف من غير خطأ، لكن لو ناديت [[next]] بإيدك هتشوف الـ exception.

### الـ generator بيتلف عليه مرة واحدة

~~~text الناتج: list(e2) مرتين، وبعدين len(e2)
['ERROR db timeout', 'ERROR disk full'] []
object of type 'generator' has no len()
~~~

التانية فاضية لأنه خلص. ومفيش [[len]] لأنه ميعرفش هيطلّع كام غير لما يخلص.

---

## ٧. الحل: قياس الذاكرة فعلًا

ملف الاختبار ٥ مليون سطر. في bash: [[seq 1 5000000 > big.txt]] ([[seq]] بيطبع الأرقام من 1 لـ 5000000، و [[>]] بيحطهم في ملف). طلع **38,888,896 byte** (حوالي 37MB).

~~~python solCode
import resource
import sys
def peak_mb() -> float:
    return resource.getrusage(resource.RUSAGE_SELF).ru_maxrss / 1024  # KB على Linux
~~~

- [[resource]]: موديول بيسأل نظام التشغيل عن استهلاك البروسيس. **موجود على Linux و macOS بس**؛ على ويندوز:

~~~text الناتج: python l03_sol.py list على ويندوز
ModuleNotFoundError: No module named 'resource'
~~~

- [[getrusage(RUSAGE_SELF)]]: استهلاك البروسيس ده (self). و [[ru_maxrss]] أعلى ذاكرة (RAM) وصلها (max resident set size). على Linux الرقم بالـ KB، فـ [[/ 1024]] بيحوّله MB. (على macOS الرقم بالـ byte حسب الـ docs، فلازم تقسم على 1024 مرتين.)

~~~python solCode
if sys.argv[1] == "list":
    with open("big.txt", encoding="utf-8") as f:
        total = sum(int(l) for l in f.readlines())
else:
    total = sum(int(l) for l in read_lines("big.txt"))
print(sys.argv[1], total, f"peak {peak_mb():.0f} MB")
~~~

- [[sys.argv[1]]]: أول كلمة بعد اسم السكربت، فبنختار الطريقة من الترمنال.
- [[f.readlines()]]: بترجّع **list** فيها كل السطور مرة واحدة.
- [[int(l)]]: [[int]] بيتجاهل الـ [[\n]] في الآخر، فـ [[int("5\n")]] = 5.
- [[:.0f]]: من غير أرقام عشرية.

~~~bash
python l03_sol.py list
python l03_sol.py gen
~~~

~~~text الناتج (لينكس، python:3.13-slim)
list 12500002500000 peak 338 MB
gen 12500002500000 peak 8 MB
~~~

نفس المجموع، بس [[readlines]] وصلت لـ 338MB لملف حجمه 37MB: كل سطر بقى object من نوع str، وكل str في Python ليه حوالي ٤٠ byte زيادة فوق النص نفسه ([[sys.getsizeof('1234567')]] طلّع 48 لنص فيه ٧ حروف)، غير الـ list اللي شايلة ٥ مليون مؤشر. والـ generator فضل 8MB، يعني تقريبًا مفيش غير Python نفسه، ومهما كبر الملف الرقم ده مش هيكبر.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[yield]] في دالة | النداء بيرجّع generator ومبيشغّلش حاجة |
| [[next(gen)]] | كمّل لحد الـ [[yield]] الجاي |
| [[(x for x in ...)]] | generator expression |
| [[StopIteration]] | الـ generator خلص، والـ [[for]] بتقف لوحدها |

- الـ generator بيتلف عليه **مرة واحدة**، ومالوش [[len]].
- [[list(gen)]] بترجّعك للذاكرة الكبيرة تاني.
- نفس الشكل (حاجة قبل [[yield]] وحاجة بعده) هو اللي هتشوفه في [[@contextmanager]] وفي dependencies الـ FastAPI.`,
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

لو ملقتش فرق في htop، غالبًا البرنامج خلص بسرعة قبل ما تلحق تشوفه، أو إنت عملت [[list(read_lines(...))]] فرجّعت كل حاجة للذاكرة تاني. الأدق إنك تقيس جوه البرنامج بـ [[resource]] زي الكود تحت (على Linux؛ على macOS [[ru_maxrss]] بالـ byte فاقسم على 1024 مرتين، وعلى ويندوز مفيش موديول [[resource]] أصلًا).`,
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
          teach: R`## المثال بيعمل إيه؟

٥ تجارب صغيرة بتجاوب على سؤال واحد: لما تكتب اسم متغير، Python بيجيب قيمته **منين**؟ وإمتى تقدر **تغيّره** من جوه دالة؟ اتشغّل بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker)، والناتج واحد.

> آخر سطر في المثال ([[broken()]]) بيرمي [[UnboundLocalError]] بالقصد، فلو شغّلت المثال كملف هيقف عنده، وده آخر سطر أصلًا.

### LEGB في جدول

**scope** يعني «المكان اللي الاسم ده معروف فيه». Python بيدوّر على أي اسم بالترتيب ده، وأول ما يلاقيه يقف:

| الحرف | المكان | مثال |
|---|---|---|
| **L** Local | جوه الدالة اللي شغالة دلوقتي | متغير اتعمل جوه [[inner]] |
| **E** Enclosing | الدوال اللي الدالة دي مكتوبة جواها | [[x]] بتاع [[outer]] |
| **G** Global | الملف نفسه (الـ module) | [[x = "global"]] في أول الملف |
| **B** Built-in | الحاجات اللي جاية مع Python | [[len]] و [[print]] |

ولو ملقاهوش في الأربعة: [[NameError]].

---

## ١. القراية: L ثم E ثم G ثم B

~~~python
x = "global"
def outer():
    x = "enclosing"
    def inner():
        print(x)
    inner()
outer()
print(x, len(x))
~~~

- [[x = "global"]]: متغير على مستوى الملف، يعني **G**.
- جوه [[outer]]، [[x = "enclosing"]] متغير **local في outer**، ومش هو نفس الـ [[x]] اللي برّه: اسمين متشابهين في مكانين مختلفين.
- [[inner]] مكتوبة جوه [[outer]]، ومفيش فيها أي [[x =]]. فلما تقرا [[x]]: L فاضي، E لقت [["enclosing"]].
- برّه خالص، [[print(x, ...)]] بيدوّر في G على طول. و [[len]] مش متعرّفة في الملف، فبيكمّل لـ B.

~~~text الناتج
enclosing
global 6
~~~

[[6]] طول كلمة [["global"]]. و [[outer]] مغيّرتش الـ [[x]] اللي برّه، لأن التعيين جوه دالة بيعمل اسم local جديد.

---

## ٢. [[global]]: تعدّل متغير الملف

~~~python
count = 0
def bump() -> None:
    global count
    count += 1
bump()
print(count)
~~~

- [[-> None]]: الدالة مبترجّعش حاجة.
- [[global count]]: سطر بيقول لـ Python «[[count]] هنا هو بتاع الملف، متعملش واحد local».
- [[count += 1]]: اختصار [[count = count + 1]]، يعني **تعيين**. ومن غير سطر [[global]] كانت هتقع زي [[broken]] تحت.

~~~text الناتج
1
~~~

---

## ٣. [[nonlocal]]: تعدّل متغير الدالة اللي حواليك

~~~python
def make_counter():
    n = 0
    def inc() -> int:
        nonlocal n
        n += 1
        return n
    return inc
c = make_counter()
print(c(), c(), c())
~~~

- [[make_counter]] دالة بتصنع دالة. [[n = 0]] local فيها.
- [[nonlocal n]]: «[[n]] هنا هو بتاع أقرب دالة حواليا (E)»، مش جديد ومش global.
- [[return inc]] من غير أقواس: بترجّع الدالة نفسها.
- [[c = make_counter()]]: [[make_counter]] خلصت، بس [[inc]] لسه فاكرة [[n]] بتاعتها. ده اسمه **closure**.

~~~text الناتج
1 2 3
~~~

كل نداء زوّد **نفس** الـ [[n]]. ولو ناديت [[make_counter()]] تاني هتاخد عدّاد جديد بـ [[n]] تانية خالص.

و [[nonlocal]] لازم يلاقي المتغير فعلًا في دالة حواليه، وإلا Python بيرفض الكود من قبل ما يشتغل:

~~~text الناتج: nonlocal zz ومفيش zz في أي دالة حواليها
SyntaxError: no binding for nonlocal 'zz' found
~~~

---

## ٤. الـ [[for]] مبتعملش scope

~~~python
for i in range(3):
    pass
print(i)
~~~

- [[pass]]: «متعملش حاجة». Python محتاج سطر جوه أي بلوك.
- [[i]] اتعمل في الملف نفسه (G)، وفضل موجود بعد الـ loop بآخر قيمة:

~~~text الناتج
2
~~~

في Python **الدوال** بس هي اللي بتعمل scope جديد (والـ classes والـ comprehensions)، مش [[if]] ولا [[for]] ولا [[while]]. والـ comprehension بالذات ليه scope خاص:

~~~text الناتج: [j for j in range(3)] وبعدين print(j)
name 'j' is not defined
~~~

---

## ٥. [[UnboundLocalError]]: الغلطة المشهورة

~~~python
total = 10
def broken():
    total += 1
broken()
~~~

~~~text الناتج: python broken.py (ويندوز)
Traceback (most recent call last):
  File "C:\Users\ali\broken.py", line 4, in <module>
    broken()
    ~~~~~~^^
  File "C:\Users\ali\broken.py", line 3, in broken
    total += 1
    ^^^^^
UnboundLocalError: cannot access local variable 'total' where it is not associated with a value
~~~

ليه؟ مع إن [[total]] موجود فوق! لأن Python بيقرر **وقت قراية الدالة** (قبل ما تشتغل) مين local: أي اسم بيتعيّن له قيمة في **أي حتة** في الدالة يبقى local في الدالة **كلها**. و [[total += 1]] تعيين، فـ [[total]] بقى local. ولما السطر يشتغل بيحاول يقرا [[total]] الـ local عشان يزوّد عليه، ويلاقيه لسه ملوش قيمة (not associated with a value). الحل: [[global total]] زي [[bump]]، أو أحسن: الدالة تاخد القيمة كباراميتر وترجّع الجديدة.

### التعديل جوه object مش تعيين

~~~python
items = []
def add(): items.append(1)
~~~

ده شغال من غير [[global]] وطبع [[[1]]]، لأن [[append]] بتعدّل الـ list نفسها، وإنت مغيّرتش الاسم [[items]] بيشاور على إيه.

---

## ٦. التجربة: [[a]] و [[b]]

~~~python
name = "global"
def a(): print(name)
def b():
    name = "local"; a()
b()
~~~

~~~text الناتج
global
~~~

الـ scope بيتحدد من **مكان كتابة** الدالة، مش من مين ناداها. [[a]] مكتوبة على مستوى الملف، فبتدوّر في L بتاعها وبعدين G. والـ [[name]] اللي في [[b]] local في [[b]]، و [[a]] مش جواها.

---

## ٧. الحل: [[make_accumulator]]

~~~python solCode
def make_accumulator(start: float = 0):
    total = start
    def add(amount: float) -> float:
        nonlocal total
        total += amount
        return total
    return add
acc = make_accumulator(100)
print(acc(10), acc(-30), acc(5))
other = make_accumulator()
print(other(1), acc(0))
~~~

نفس فكرة [[make_counter]] بالظبط: [[total]] في الـ E، و [[nonlocal]] عشان [[+=]].

~~~text الناتج
110 80 85
1 85
~~~

- 100 + 10 = 110، و 110 − 30 = 80، و 80 + 5 = 85.
- [[other]] بدأت من الـ default صفر، فـ [[other(1)]] = 1، و [[acc(0)]] لسه 85: كل accumulator ليه [[total]] لوحده.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تقرا متغير من برّه | ولا حاجة، LEGB بيلاقيه |
| تغيّر متغير الملف | [[global x]] (نادرًا) |
| تغيّر متغير دالة حواليك | [[nonlocal x]] |
| تعدّل جوه list أو dict من برّه | ولا حاجة ([[append]] مش تعيين) |

- أي تعيين جوه دالة = الاسم local في الدالة **كلها**.
- [[if]] و [[for]] مبيعملوش scope، الدوال بتعمل.
- متسمّيش متغير [[list]] أو [[len]]: هتغطي على الـ built-in (اتجرّبت: [['list' object is not callable]]).`,
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
          teach: R`## المثال بيعمل إيه؟

٣ حاجات: بيعرّف exception بتاعه ([[NotFoundError]])، ودالة [[parse_age]] بتحوّل نص لعمر وبترمي رسالة واضحة لو النص غلط، وبلوك [[try]] كامل بـ [[except]] و [[finally]]. اتشغّل بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker).

الكلمات الأساسية في جدول قبل ما نبدأ:

| الكلمة | معناها |
|---|---|
| exception | object بيتعمل لما حاجة تغلط، وبيوقف الكود لحد ما حد يمسكه |
| [[raise]] | ارمي exception |
| [[try:]] | الكود اللي ممكن يرمي |
| [[except X:]] | لو اترمى exception من نوع [[X]]، شغّل ده |
| [[else:]] | لو الـ [[try]] عدّى من غير أي exception |
| [[finally:]] | في كل الأحوال، آخر حاجة |

---

## ١. exception بتاعك

~~~python
class NotFoundError(Exception):
    def __init__(self, what: str, item_id: int):
        super().__init__(f"{what} {item_id} not found")
        self.what, self.item_id = what, item_id
~~~

- [[class NotFoundError(Exception):]]: class جديد **بيورث** من [[Exception]] (الأب اللي بين القوسين). كده بقى exception حقيقي: ينفع يترمي ويتمسك. (الـ classes بالتفصيل في قسم Classes.)
- [[__init__]]: بيتنادى أول ما تعمل object، و [[self]] هو الـ object الجديد.
- [[super().__init__(...)]]: نادي [[__init__]] بتاع الأب ([[Exception]]) بالرسالة. هي دي اللي هتظهر لما تطبع الـ exception أو في الـ traceback.
- [[self.what, self.item_id = what, item_id]]: خزّن البيانات على الـ object، عشان اللي يمسكه يقدر يستخدمها (مثلًا يحط [[item_id]] في رد الـ API). [[a, b = x, y]] تعيين اتنين في سطر.

~~~text الناتج: repr(e) و e.args و e.what لـ NotFoundError("user", 7)
NotFoundError('user 7 not found') ('user 7 not found',) user
~~~

[[e.args]] tuple فيه اللي اتبعت لـ [[Exception.__init__]].

---

## ٢. [[parse_age]]: تمسك وترمي

~~~python
def parse_age(raw: str) -> int:
    try:
        age = int(raw)
    except ValueError as e:
        raise ValueError(f"age must be a number, got {raw!r}") from e
    else:
        if age < 0:
            raise ValueError("age can't be negative")
        return age
~~~

### [[try:]] / [[except ValueError as e:]]

[[int("abc")]] بيرمي [[ValueError]]. الـ [[except ValueError]] بيمسك النوع ده بس (وأي ابن ليه)، وأي نوع تاني بيعدّي لفوق. و [[as e]] بيحط الـ exception object في متغير اسمه [[e]].

### [[raise ... from e]]

جوه الـ except بنرمي [[ValueError]] **جديد** برسالة مفهومة:

- [[{raw!r}]]: [[!r]] معناها «حط [[repr]] القيمة»، فالنص بيظهر بين علامات تنصيص: [['abc']]. كده لو المستخدم بعت نص فاضي هتشوف [[got '']] بدل [[got ]] اللي ملهاش معنى.
- [[from e]]: اربط الجديد بالأصلي (بيتحفظ في [[__cause__]] بتاع الجديد)، فالـ traceback بيوري الاتنين وبيقول صراحة إن ده سبب ده.

### [[else:]]

بيشتغل **بس** لو [[int(raw)]] عدّى. ليه مش جوه الـ [[try]]؟ لأن أي [[ValueError]] جوه الـ [[try]] كان هيتمسك بالـ except اللي فوق ويطلع برسالة «must be a number» الغلط. الـ [[try]] يفضل صغير على قد السطر اللي ممكن يرمي.

### التشغيل

~~~text الناتج: parse_age("25") وبعدين parse_age("-3")
25
ValueError: age can't be negative
~~~

وده الـ traceback الكامل لـ [[parse_age("abc")]] (ملف [[age.py]] على ويندوز):

~~~text الناتج
Traceback (most recent call last):
  File "age.py", line 7, in parse_age
    age = int(raw)
ValueError: invalid literal for int() with base 10: 'abc'

The above exception was the direct cause of the following exception:

Traceback (most recent call last):
  File "age.py", line 18, in <module>
    parse_age("abc")
    ~~~~~~~~~^^^^^^^
  File "age.py", line 9, in parse_age
    raise ValueError(f"age must be a number, got {raw!r}") from e
ValueError: age must be a number, got 'abc'
~~~

اتقرا من تحت لفوق: آخر سطر هو الخطأ اللي طلع فعلًا. فوقه السطر اللي رماه. والجملة في النص بتقول إن الأول **سبب** التاني. و [[base 10]] معناها إن [[int]] كان بيحاول يقراه رقم عشري.

ومن غير [[from e]]، نفس الخطأين بيظهروا بس الجملة بتتغير:

~~~text الناتج: نفس الملف من غير from e
During handling of the above exception, another exception occurred:
~~~

ودي معناها «حصل خطأ تاني **بالصدفة** وإحنا بنعالج الأول»، كأنه bug في الـ except. فـ [[from e]] بتقول للي بيقرا إن ده مقصود.

---

## ٣. البلوك الكامل

~~~python
try:
    raise NotFoundError("user", 7)
except NotFoundError as e:
    print(e, e.item_id)
except (KeyError, TypeError):
    print("حاجة تانية")
finally:
    print("ده بيتطبع دايمًا")
~~~

- [[raise NotFoundError("user", 7)]]: بنرمي الـ exception بتاعنا بإيدنا عشان نشوف مين يمسكه.
- الـ [[except]] بيتفحصوا **بالترتيب**، وأول واحد نوعه مطابق بيمسك والباقي بيتجاهل. هنا الأول مطابق.
- [[print(e, e.item_id)]]: [[print(e)]] بتطبع الرسالة، و [[e.item_id]] البيانات اللي خزّناها.
- [[except (KeyError, TypeError):]]: أكتر من نوع في except واحد، كـ tuple بين قوسين.
- [[finally:]]: اشتغل رغم إن الـ exception اتمسك. وكان هيشتغل لو مفيش exception خالص، أو لو exception محدش مسكه (قبل ما البرنامج يقع).

~~~text الناتج
user 7 not found 7
ده بيتطبع دايمًا
~~~

### القوسين في 3.14

في Python 3.14 القوسين بقوا اختياريين لو مفيش [[as]]. اتجرّب [[except KeyError, TypeError:]]:

| النسخة | النتيجة |
|---|---|
| 3.14 (ويندوز) | اشتغل وطبع [[caught]] |
| 3.13 (لينكس) | [[SyntaxError: multiple exception types must be parenthesized]] |

فلو الكود هيشتغل على نسخ أقدم، خلّي القوسين.

### [[return]] جوه [[finally]]

~~~python
def f():
    try:
        1/0
    finally:
        return 1
~~~

[[1/0]] بيرمي [[ZeroDivisionError]]، بس الـ [[return]] اللي في [[finally]] **بلعه**، و [[f()]] رجّعت [[1]] كأن مفيش حاجة حصلت. 3.14 بقى بيحذّرك:

~~~text الناتج (3.14)
retfin.py:5: SyntaxWarning: 'return' in a 'finally' block
  return 1
1
~~~

و 3.13 طبع [[1]] من غير أي تحذير.

---

## الخلاصة

| الجزء | إمتى يشتغل |
|---|---|
| [[try]] | دايمًا، لحد أول exception |
| [[except X]] | لو اترمى X (أو ابن ليه) |
| [[else]] | لو الـ try خلص من غير exception |
| [[finally]] | في كل الأحوال |

- امسك الأنواع اللي هتعمل فيها حاجة بس، وخلّي الـ [[try]] صغير.
- exception بتاعك = class بيورث من [[Exception]]، وخزّن عليه البيانات.
- [[raise New(...) from e]] لما تحوّل خطأ لخطأ أوضح، و [[raise]] لوحدها ترمي نفس الخطأ تاني.
- متكتبش [[return]] جوه [[finally]].`,
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
          teach: R`## المثال بيعمل إيه؟

بيعمل فولدر [[out]] وملف [[report.txt]] جواه، ويكتب فيه ويقراه من غير ما يقفل الملف بإيده. وبعدين بيعمل context manager بتاعه اسمه [[timer]] بيقيس وقت أي بلوك. اتشغّل بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker).

**context manager** يعني object بيعرف يعمل حاجة **أول** ما تدخل بلوك [[with]] وحاجة **آخر** ما تخرج منه، مهما كانت طريقة الخروج.

---

## ١. الـ imports

~~~python
from contextlib import contextmanager
from pathlib import Path
import time
~~~

- [[from contextlib import contextmanager]]: هات decorator اسمه [[contextmanager]] من موديول [[contextlib]] (أدوات الـ context managers).
- [[from pathlib import Path]]: [[Path]] نوع بيمثّل مسار ملف أو فولدر، الطريقة الحديثة بدل [[os.path]].
- [[import time]]: للتوقيت.

---

## ٢. [[mkdir(exist_ok=True)]]

~~~python
Path("out").mkdir(exist_ok=True)
~~~

[[Path("out")]] مسار فولدر اسمه [[out]] جنب المكان اللي شغّال منه، و [[.mkdir()]] بيعمله. و [[exist_ok=True]]: لو موجود متعترضش (من غيرها التشغيل التاني يرمي [[FileExistsError]]).

---

## ٣. [[with open(...) as f:]]

~~~python
with open("out/report.txt", "w", encoding="utf-8") as f:
    f.write("تمام\n")
~~~

- [[open(path, "w", ...)]]: افتح الملف، و [[w]] = write: للكتابة، ولو موجود امسحه وابدأ من الأول.
- [[encoding="utf-8"]]: اكتب الحروف بترميز UTF-8. على ويندوز الافتراضي مش UTF-8، فمن غيرها العربي ممكن يبوظ أو يرمي.
- [[as f]]: الملف المفتوح اتسمّى [[f]].
- [[f.write("تمام\n")]]: اكتب الكلمة وسطر جديد.

أول ما البلوك (السطور اللي تحته بمسافة) يخلص، [[with]] بتقفل الملف لوحدها. اتجرّب بعد البلوك:

~~~text الناتج: f.closed و type(f).__name__ وبعدين f.write("x")
True TextIOWrapper
ValueError: I/O operation on closed file.
~~~

[[f]] لسه موجود كمتغير، بس الملف مقفول، فأي كتابة بعد البلوك بترمي. و [[TextIOWrapper]] اسم نوع الملف النصي في Python.

---

## ٤. [[read_text]]

~~~python
text = Path("out/report.txt").read_text(encoding="utf-8")
~~~

[[read_text]] بتفتح الملف وتقراه كله نص وتقفله، في سطر واحد (وجواها [[with]] برضه).

~~~text الناتج: repr(text)
'تمام\n'
~~~

---

## ٥. [[@contextmanager]]: context manager من generator

~~~python
@contextmanager
def timer(label: str):
    start = time.perf_counter()
    try:
        yield
    finally:
        print(f"{label}: {time.perf_counter() - start:.3f}s")
~~~

الدالة فيها [[yield]]، يعني generator (درس «generators و yield»)، و [[@contextmanager]] بيحوّلها لـ context manager. القاعدة:

| الحتة | بتشتغل إمتى |
|---|---|
| قبل [[yield]] | أول ما [[with]] تبدأ (الدخول) |
| [[yield]] | هنا بلوك الـ [[with]] نفسه بيشتغل |
| بعد [[yield]] | لما البلوك يخلص (الخروج) |

- [[time.perf_counter()]]: ساعة دقيقة، بنقرا الوقت قبل وبعد.
- [[yield]] لوحدها من غير قيمة: مفيش حاجة رايحة لـ [[as]]. لو كتبت [[yield x]]، [[x]] هي اللي هتروح لـ [[with timer(...) as x]].
- [[try:]] / [[finally:]] حوالين الـ [[yield]]: لو البلوك رمى exception، الـ exception بيطلع **من عند الـ yield** جوه الدالة، و [[finally]] بتضمن إن سطر الطباعة يشتغل برضه.

اتجرّب الاتنين، مع بلوك بيرمي [[RuntimeError("oops")]]:

~~~text الناتج: بـ try/finally
boom: 0.000s
caught oops
~~~

~~~text الناتج: نفس الحكاية من غير try/finally
caught oops
~~~

من غير [[finally]] سطر الوقت **مطبعش خالص**: الـ exception طلع من عند الـ [[yield]] والكود اللي بعده متنفّذش. ولو كان الكود ده بيقفل اتصال، الاتصال كان هيفضل مفتوح.

---

## ٦. الاستخدام

~~~python
with timer("sum"):
    total = sum(range(10_000_000))
~~~

[[timer("sum")]] بترجّع object الـ [[with]] بتستخدمه (اتطبع: [[<contextlib._GeneratorContextManager object at 0x...>]])، والبلوك بيجمع عشرة مليون رقم:

~~~text الناتج
sum: 0.250s
~~~

الوقت بيختلف كل تشغيل وكل جهاز (على لينكس جوه Docker طلع [[0.231s]]).

---

## ٧. من غير decorator: [[__enter__]] و [[__exit__]]

أي object فيه الـ methods دول ينفع مع [[with]]. ده كل اللي [[@contextmanager]] بيعمله لك من ورا:

~~~python
class Demo:
    def __enter__(self): print("enter"); return "value from enter"
    def __exit__(self, exc_type, exc, tb): print("exit", exc_type); return False
with Demo() as v: print("inside:", v)
~~~

~~~text الناتج
enter
inside: value from enter
exit None
~~~

- اللي [[__enter__]] بترجّعه بيروح لـ [[as]].
- [[__exit__]] بتاخد ٣ حاجات عن الـ exception (نوعه، والـ object، والـ traceback)، وكلهم [[None]] لو مفيش exception.
- [[return False]]: «متبلعش الـ exception، خليه يطلع». لو رجّعت [[True]] الـ exception بيختفي.

---

## ٨. الحل: [[cd(path)]]

~~~python solCode
@contextmanager
def cd(path):
    old = os.getcwd()
    os.chdir(path)
    try:
        yield
    finally:
        os.chdir(old)
~~~

- [[os.getcwd()]]: الفولدر الحالي (get current working directory). بنحفظه قبل ما نتحرك.
- [[os.chdir(path)]]: ادخل الفولدر (change directory).
- [[finally: os.chdir(old)]]: ارجع للأصلي حتى لو البلوك رمى.

باقي الحل بيطبع الفولدر قبل وجوه وبعد، وبيرمي [[RuntimeError("boom")]] جوه [[with]] تاني ويمسكه بـ [[except RuntimeError: pass]] ([[pass]] = متعملش حاجة):

~~~text الناتج: لينكس، شغال من /app
/app
/app/sub
/app
~~~

~~~text الناتج: ويندوز (المسار متختصر)
C:\Users\ali\AppData\Local\Temp\...\run06
C:\Users\ali\AppData\Local\Temp\...\run06\sub
C:\Users\ali\AppData\Local\Temp\...\run06
~~~

السطر التالت اتطبع **بعد** الـ [[RuntimeError]]، ورجع للأصلي: ده شغل الـ [[finally]].

---

## الخلاصة

- [[with X as y:]] = ادخل (بينادي [[__enter__]])، شغّل البلوك، اخرج (بينادي [[__exit__]]) **مهما حصل**.
- مع الملفات: [[with open(..., encoding="utf-8") as f:]] دايمًا، ومتستخدمش [[f]] بعد البلوك.
- [[@contextmanager]]: قبل [[yield]] دخول، وبعده خروج، و [[try/finally]] حوالين [[yield]] إجباري.
- ده نفس شكل الـ [[lifespan]] والـ dependencies اللي فيها [[yield]] في FastAPI.`,
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
          teach: R`## المثال بيعمل إيه؟

class اسمه [[Order]] (طلب شرا): فيه اسم العميل وليستة أسعار، وإجمالي بالضريبة بيتحسب لوحده، و method بتضيف سعر بعد ما تتأكد إنه صح، وطريقة تانية تعمل طلب من dict. وبعدين بيجرّب الفرق بين خاصية الـ class وخاصية الـ object. اتشغّل بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker)، والناتج واحد.

كلمتين قبل ما نبدأ:

- **class**: القالب. [[Order]] نفسه.
- **object** (أو instance): نسخة معمولة من القالب. [[o = Order(...)]].
- **attribute**: متغير مربوط بـ object أو class ([[o.customer]]). و **method**: دالة متعرّفة جوه الـ class ([[o.add]]).

---

## ١. [[Self]] و [[class Order:]]

~~~python
from typing import Self
class Order:
    tax_rate = 0.14
~~~

- [[Self]] (من 3.11): type hint معناه «object من نفس الـ class ده». هنستخدمه تحت.
- [[class Order:]]: عرّف class. الاسم بـ PascalCase (أول كل كلمة كابيتال) ده العرف.
- [[tax_rate = 0.14]]: متغير مكتوب في جسم الـ class مباشرة، اسمه **class attribute**: واحد بس، مشترك بين كل الطلبات. 0.14 يعني ١٤٪.

---

## ٢. [[__init__]] و [[self]]

~~~python
    def __init__(self, customer: str, items: list[float] | None = None):
        self.customer = customer
        self.items = items if items is not None else []
~~~

- [[__init__]]: method بالاسم ده Python بيناديها **لوحده** أول ما تكتب [[Order(...)]]، عشان تجهّز الـ object الجديد.
- [[self]]: أول باراميتر في أي method، وهو **الـ object نفسه**. Python بيبعته لوحده، فإنت بتكتب [[Order("Sara", [100, 200])]] من غير ما تبعت [[self]]. والاسم اتفاق مش كلمة محجوزة، بس محدش بيغيّره.
- [[list[float] | None = None]]: النوع «list أرقام أو None»، والـ default [[None]]. ([[|]] هنا معناها «أو» في الأنواع.)
- [[self.customer = customer]]: اعمل attribute على **الـ object ده** اسمه [[customer]]. ده اسمه **instance attribute**: كل طلب ليه واحد لوحده.
- [[items if items is not None else []]]: لو اتبعتت list استخدمها، غير كده اعمل list **جديدة**. ليه مش [[items=[]]] في الباراميتر على طول؟ لأن الـ default بيتعمل مرة واحدة وقت تعريف الدالة، فكل الطلبات كانت هتشارك **نفس** الـ list.

---

## ٣. [[@property]]: method بتتقري من غير أقواس

~~~python
    @property
    def total(self) -> float:
        return round(sum(self.items) * (1 + self.tax_rate), 2)
~~~

- [[@property]]: decorator بيخلّي [[o.total]] تنادي الـ method دي من غير [[()]]. فالإجمالي بيتحسب **كل مرة** من الأسعار الحالية، ومستحيل يبقى قديم.
- [[sum(self.items)]]: مجموع الأسعار.
- [[(1 + self.tax_rate)]]: [[1.14]]، يعني السعر + ١٤٪. و [[self.tax_rate]] مش متعرّفة على الـ object، فـ Python بيدوّر في الـ class ويلاقيها (هنرجعلها).
- [[round(..., 2)]]: قرّب لرقمين عشريين (قروش).

---

## ٤. method عادية و [[@staticmethod]]

~~~python
    def add(self, price: float) -> None:
        if not self.is_valid_price(price):
            raise ValueError(f"invalid price: {price}")
        self.items.append(price)
...
    @staticmethod
    def is_valid_price(price: float) -> bool:
        return price > 0
~~~

- [[add]]: بتعدّل الـ object، فمحتاجة [[self]].
- [[@staticmethod]]: method **ملهاش** [[self]]: دالة عادية خالص، بس مكانها منطقي جوه الـ class. بتتنادى من الـ class أو من الـ object: [[Order.is_valid_price(3)]] رجّعت [[True]] و [[o.is_valid_price(0)]] رجّعت [[False]].
- [[raise ValueError(...)]]: ارفض السعر الغلط. اتجرّب [[o.add(-5)]]:

~~~text الناتج
ValueError: invalid price: -5
~~~

---

## ٥. [[@classmethod]]: طريقة إنشاء تانية

~~~python
    @classmethod
    def from_dict(cls, data: dict) -> Self:
        return cls(data["customer"], list(data.get("items", [])))
~~~

- [[@classmethod]]: أول باراميتر بقى **الـ class نفسه** بدل الـ object، واسمه بالعرف [[cls]].
- [[cls(...)]]: يعني [[Order(...)]]. ليه مش نكتب [[Order]] على طول؟ لأن لو حد عمل class ابن من [[Order]] ونادى [[Child.from_dict(...)]]، [[cls]] هيبقى [[Child]] فيرجعله ابن. وده سبب [[-> Self]].
- [[data.get("items", [])]]: [[get]] بتجيب المفتاح، ولو مش موجود ترجّع الـ default [[[]]] بدل ما ترمي [[KeyError]].
- [[list(...)]]: نسخة جديدة، عشان الطلب ميشاركش الـ list مع الـ dict اللي اتبعت.

---

## ٦. [[__repr__]]: شكله وهو بيتطبع

~~~python
    def __repr__(self) -> str:
        return f"Order({self.customer!r}, total={self.total})"
~~~

[[__repr__]] بيتنادى لوحده لما تطبع الـ object أو تشوفه في الـ REPL أو الـ debugger. و [[!r]] بتحط الاسم بين علامات تنصيص. من غيره هتشوف حاجة زي [[<__main__.Order object at 0x...>]].

---

## ٧. التشغيل سطر سطر

~~~python
o = Order("Sara", [100, 200])
o.add(50)
print(o, o.total)
~~~

~~~text الناتج
Order('Sara', total=399.0) 399.0
~~~

(100 + 200 + 50) × 1.14 = 399.0. و [[o.add(50)]] Python بيترجمها لـ [[Order.add(o, 50)]]: الـ object اللي قبل النقطة بقى [[self]]. والسطر الجاي بيكتبها بالشكل الطويل ده بالظبط:

~~~python
Order.add(o, 10)
~~~

بعده [[o.items]] بقت [[[100, 200, 50, 10]]] و [[o.total]] بقى [[410.4]].

~~~python
o2 = Order.from_dict({"customer": "Omar", "items": [10]})
print(o2, Order.tax_rate, o2.tax_rate)
~~~

~~~text الناتج
Order('Omar', total=11.4) 0.14 0.14
~~~

[[tax_rate]] اتقرت من الـ class مباشرة ومن الـ object، والاتنين نفس القيمة: Python بيدوّر في الـ object الأول، وملقاهاش، فراح للـ class.

### تعيين على الـ object مبيغيّرش الـ class

~~~python
o2.tax_rate = 0
print(o2.total, Order.tax_rate)
~~~

~~~text الناتج
10 0.14
~~~

[[o2.tax_rate = 0]] عملت instance attribute **جديدة** على [[o2]] بس، وغطّت على اللي في الـ class. شوف الـ [[__dict__]] (الـ dict اللي Python شايل فيه attributes الـ object):

~~~text الناتج: o2.__dict__
{'customer': 'Omar', 'items': [10], 'tax_rate': 0}
~~~

وطلع [[10]] مش [[10.0]] لأن كل الحساب بقى أرقام صحيحة: [[10 * (1 + 0)]] = [[10]]، و [[round]] على int بيرجّع int.

### الـ property من غير setter

~~~python
o.total = 5
~~~

~~~text الناتج
AttributeError: property 'total' of 'Order' object has no setter
~~~

مفيش طريقة تكتب بيها على [[total]]، فمحدش يقدر يحط إجمالي مش مطابق للأسعار.

---

## ٨. الحل: [[remove]] و [[empty]]

الجزء الجديد بس:

~~~python solCode
    def remove(self, price: float) -> None:
        if price not in self.items:
            raise ValueError(f"{price} not in order")
        self.items.remove(price)
    @classmethod
    def empty(cls, customer: str) -> Self:
        return cls(customer)
    def __repr__(self) -> str:
        return f"Order({self.customer!r}, items={len(self.items)}, total={self.total})"
~~~

- [[price not in self.items]]: [[in]] بيسأل «موجود في الليستة؟»، و [[not in]] عكسه.
- [[self.items.remove(price)]]: [[list.remove]] بتشيل **أول** عنصر قيمته كده.
- [[cls(customer)]]: من غير items، فـ [[__init__]] بيعمل list فاضية جديدة.
- [[len(self.items)]]: عدد العناصر.

~~~text الناتج
Order('Sara', items=2, total=171.0)
Order('Ali', items=1, total=34.2) Order('Mona', items=0, total=0.0)
999 not in order
~~~

- (100 + 50) × 1.14 = 171.0.
- [[Mona]] لسه [[items=0]] بعد ما ضفنا 30 لـ [[Ali]]: كل طلب ليه list لوحده، بفضل [[items if items is not None else []]].

---

## الخلاصة

| الحاجة | أول باراميتر | بتتنادى إزاي |
|---|---|---|
| method عادية | [[self]] (الـ object) | [[o.add(50)]] |
| [[@classmethod]] | [[cls]] (الـ class) | [[Order.from_dict(d)]] |
| [[@staticmethod]] | ولا حاجة | [[Order.is_valid_price(3)]] |
| [[@property]] | [[self]] | [[o.total]] من غير أقواس |

- class attribute واحدة مشتركة، و [[self.x = ...]] لكل object لوحده.
- القراية بتدوّر في الـ object وبعدين الـ class، والكتابة على الـ object بتعمل attribute جديدة عليه.
- default الـ list في [[__init__]] يبقى [[None]]، مش [[[]]].`,
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
          teach: R`## المثال بيعمل إيه؟

٤ classes بيبنوا على بعض: [[Notifier]] بيبعت رسالة، و [[SmsNotifier]] ابنه بيقص الرسالة لطول معين، و [[LoggingMixin]] class صغير بيطبع لوج، و [[LoggedSms]] بيركّب الاتنين. وبعدين بنسأل Python بيدوّر على [[send]] بأنهي ترتيب. اتشغّل بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker)، والناتج واحد.

| الكلمة | معناها |
|---|---|
| وراثة (inheritance) | class بياخد كل حاجة من class تاني |
| الأب (parent / base) | اللي بنورث منه |
| الابن (child / subclass) | اللي بيورث |
| override | الابن بيعرّف method بنفس اسم واحدة في الأب |
| MRO | Method Resolution Order: ترتيب الـ classes اللي Python بيدوّر فيها على method |

---

## ١. الأب: [[Notifier]]

~~~python
class Notifier:
    def __init__(self, sender: str):
        self.sender = sender
    def send(self, to: str, text: str) -> str:
        return f"[{self.sender}] -> {to}: {text}"
~~~

class عادي (درس «class و self»): بيخزّن اسم المرسل، و [[send]] بترجّع الرسالة متنسقة.

~~~text الناتج: Notifier("shop").send("010", "hello world")
[shop] -> 010: hello world
~~~

---

## ٢. الابن: [[SmsNotifier(Notifier)]]

~~~python
class SmsNotifier(Notifier):
    def __init__(self, sender: str, max_len: int = 160):
        super().__init__(sender)
        self.max_len = max_len
    def send(self, to: str, text: str) -> str:
        return super().send(to, text[: self.max_len])
~~~

- [[(Notifier)]] بعد اسم الـ class: «ورث من [[Notifier]]». أي method مش موجودة في الابن بتتجاب من الأب.
- [[__init__]] جديدة بباراميتر زيادة [[max_len]] (160 حرف، حد رسالة الـ SMS).
- [[super().__init__(sender)]]: [[super()]] بيرجّع object بيوصّلك لـ methods «اللي بعدك في السلسلة»، وهنا يعني [[Notifier]]. فإحنا بنقول لـ [[Notifier.__init__]] يعمل [[self.sender]] بنفسه بدل ما ننسخ كوده.
- [[send]] هنا **override**: نفس الاسم، فبتتنادى هي بدل بتاعة الأب.
- [[text[: self.max_len]]]: slice من الأول لحد [[max_len]] حرف. [["hello world"[:5]]] = [['hello']].
- [[super().send(to, ...)]]: بعد ما قصّينا، نادي [[send]] بتاعة الأب يكمّل الشغل.

~~~text الناتج: SmsNotifier("shop", max_len=5).send("010", "hello world")
[shop] -> 010: hello
~~~

### لو نسيت [[super().__init__]]

اتجرّب ابن [[__init__]] بتاعه مبينادي الأب:

~~~text الناتج
AttributeError: 'Bad' object has no attribute 'sender'
~~~

الابن لما بيعرّف [[__init__]] بتاعه، بتاع الأب **مبيتناداش لوحده**، فـ [[self.sender]] عمره ما اتعمل.

---

## ٣. الـ mixin: [[LoggingMixin]]

~~~python
class LoggingMixin:
    def send(self, to: str, text: str) -> str:
        result = super().send(to, text)
        print("LOG:", result)
        return result
~~~

**mixin** يعني class صغير بيضيف سلوك واحد، ومش معمول يتستخدم لوحده، معمول «يتخلط» مع classes تانية. الغريب هنا إن [[LoggingMixin]] مش وارث من حاجة، ومع ذلك بينادي [[super().send]]. لوحده بيقع:

~~~text الناتج: LoggingMixin().send("a", "b")
AttributeError: 'super' object has no attribute 'send'
~~~

بيشتغل بس لما يتركّب مع class فيه [[send]]، لأن [[super()]] مش معناها «الأب اللي أنا كاتبه»، معناها «**اللي بعدي في الـ MRO بتاع الـ object الحقيقي**». هنشوف ده دلوقتي.

---

## ٤. التركيب: [[LoggedSms]]

~~~python
class LoggedSms(LoggingMixin, SmsNotifier):
    pass
~~~

- وراثة من **اتنين**، مفصولين بفاصلة. الترتيب مهم: الشمال الأول.
- [[pass]]: «مفيش كود»، الـ class ده تركيب بس.

### الـ MRO

~~~python
print([c.__name__ for c in LoggedSms.__mro__])
~~~

- [[LoggedSms.__mro__]]: tuple فيه الـ classes بالترتيب اللي Python هيدوّر بيه. لوحده بيطبع [[(<class '__main__.LoggedSms'>, <class '__main__.LoggingMixin'>, ...)]].
- [[[c.__name__ for c in ...]]]: list comprehension بتاخد اسم كل class بس، عشان يبقى مقروء.

~~~text الناتج
['LoggedSms', 'LoggingMixin', 'SmsNotifier', 'Notifier', 'object']
~~~

القواعد اللي طلّعت الترتيب ده: الابن قبل آبائه، والآباء بنفس ترتيب كتابتهم بين القوسين، وكل class مرة واحدة، و [[object]] (أبو كل الـ classes في Python) في الآخر.

---

## ٥. النداء: نمشي على السلسلة

~~~python
n = LoggedSms("shop", max_len=5)
n.send("010", "hello world")
~~~

### الإنشاء

[[LoggedSms]] و [[LoggingMixin]] ملهمش [[__init__]]، فـ Python بيكمّل في الـ MRO لحد ما يلاقي واحد: [[SmsNotifier.__init__]]، اللي بياخد [[max_len=5]] وينادي [[Notifier.__init__]]. النتيجة: [[vars(n)]] = [[{'sender': 'shop', 'max_len': 5}]].

### [[send]]

| الخطوة | مين بيشتغل | بيعمل إيه |
|---|---|---|
| ١ | [[LoggingMixin.send]] | أول واحد في الـ MRO فيه [[send]]. بينادي [[super().send]] |
| ٢ | [[SmsNotifier.send]] | اللي بعد [[LoggingMixin]] في الـ MRO. بيقص لـ [[hello]] وينادي [[super().send]] |
| ٣ | [[Notifier.send]] | بيرجّع [['[shop] -> 010: hello']] |
| ٤ | [[LoggingMixin.send]] تاني | النتيجة رجعت له، فيطبع اللوج ويرجّعها |

~~~text الناتج في الـ REPL
LOG: [shop] -> 010: hello
'[shop] -> 010: hello'
~~~

السطر الأول من [[print]]، والتاني الـ REPL بيعرض القيمة اللي رجعت (في ملف مش هيظهر).

---

## ٦. [[isinstance]] و [[issubclass]]

~~~python
print(isinstance(n, Notifier), issubclass(SmsNotifier, LoggingMixin))
~~~

- [[isinstance(n, Notifier)]]: «[[n]] من النوع ده أو من أي ابن ليه؟» آه، [[Notifier]] في الـ MRO بتاعه.
- [[issubclass(SmsNotifier, LoggingMixin)]]: «[[SmsNotifier]] ابن [[LoggingMixin]]؟» لأ، الـ mixin اتركّب في [[LoggedSms]] بس.

~~~text الناتج
True False
~~~

---

## ٧. الحل: ترتيب الـ mixins بيفرق

~~~python solCode
class SignMixin:
    def send(self, to: str, text: str) -> str:
        return super().send(to, text) + " (via shop)"
class A(LoggingMixin, SignMixin, SmsNotifier):
    pass
class B(SignMixin, LoggingMixin, SmsNotifier):
    pass
~~~

[[SignMixin]] بيزوّد توقيع على النتيجة **بعد** ما ترجع من [[super()]].

~~~text الناتج
LOG: [shop] -> 010: hello (via shop)
A returns: [shop] -> 010: hello (via shop)
LOG: [shop] -> 010: hello
B returns: [shop] -> 010: hello (via shop)
['A', 'LoggingMixin', 'SignMixin', 'SmsNotifier', 'Notifier', 'object']
['B', 'SignMixin', 'LoggingMixin', 'SmsNotifier', 'Notifier', 'object']
~~~

- في [[A]]: [[LoggingMixin]] برّه و [[SignMixin]] جوه. التوقيع بيتضاف الأول، فاللوج بيشوفه.
- في [[B]]: العكس. اللوج بيشوف النتيجة قبل التوقيع.
- القيمة اللي رجعت واحدة في الاتنين، بس اللوج مختلف. ونفس الكود بالظبط في [[LoggingMixin]] بينادي حاجة مختلفة حسب الـ class اللي اتركّب فيه.

---

## الخلاصة

- [[class Child(Parent):]] = ورث كل حاجة، و override بنفس الاسم.
- لو الابن عرّف [[__init__]]: نادي [[super().__init__(...)]].
- [[super()]] = **اللي بعدي في الـ MRO** بتاع الـ object، مش بالضرورة الأب المكتوب.
- [[Class.__mro__]] بيوريك الترتيب: الابن، وبعدين الآباء من الشمال لليمين، و [[object]] في الآخر.
- ترتيب الـ mixins بين القوسين بيغيّر النتيجة.`,
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
          teach: R`## المثال بيعمل إيه؟

classين: [[Money]] قيمة فلوس بالقروش بتشتغل مع [[print]] و [[==]] و [[<]] و [[+]] و [[set]]، و [[Cart]] عربية مشتريات بتشتغل مع [[len]] و [[for]] و [[in]] و [[sum]] و [[max]]. ومفيش ولا method من دول بنناديها بإيدنا: Python هو اللي بيناديها لما نستخدم أدوات اللغة. اتشغّل بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker)، والناتج واحد.

**dunder** اختصار double underscore: الشرطتين [[__]] قبل الاسم وبعده. والقاعدة:

| انت بتكتب | Python بينادي |
|---|---|
| [[print(x)]] و [[str(x)]] | [[x.__str__()]] |
| [[repr(x)]] والـ REPL | [[x.__repr__()]] |
| [[a == b]] | [[a.__eq__(b)]] |
| [[a < b]] | [[a.__lt__(b)]] |
| [[a + b]] | [[a.__add__(b)]] |
| [[hash(x)]] و [[set]] و مفتاح dict | [[x.__hash__()]] |
| [[bool(x)]] و [[if x:]] | [[x.__bool__()]] |
| [[len(x)]] | [[x.__len__()]] |
| [[for i in x]] | [[x.__iter__()]] |
| [[i in x]] | [[x.__contains__(i)]] |

---

## ١. [[@total_ordering]] و [[__init__]]

~~~python
from functools import total_ordering
@total_ordering
class Money:
    def __init__(self, cents: int, currency: str = "EGP"):
        self.cents, self.currency = cents, currency
~~~

- [[@total_ordering]]: decorator على الـ **class** كله (مش دالة). بتكتب [[__eq__]] و [[__lt__]] بس، وهو يكمّل [[<=]] و [[>]] و [[>=]] منهم.
- الفلوس بالقروش كرقم صحيح ([[int]])، مش جنيهات بكسور: الـ float فيه أخطاء تقريب ([[0.1 + 0.2]] مش بالظبط [[0.3]]).

---

## ٢. [[__repr__]] و [[__str__]]

~~~python
    def __repr__(self) -> str:
        return f"Money({self.cents}, {self.currency!r})"
    def __str__(self) -> str:
        return f"{self.cents / 100:,.2f} {self.currency}"
~~~

- [[__repr__]] للمبرمج: شكل زي الكود اللي يعمل الـ object. و [[!r]] بتحط [['EGP']] بين علامات تنصيص.
- [[__str__]] للمستخدم: [[self.cents / 100]] جنيهات، و [[:,.2f]] يعني: [[,]] فاصلة كل ٣ أرقام، و [[.2f]] رقمين بعد العلامة العشرية.

~~~text الناتج: print(m) و repr(m) و print([m]) لـ Money(150000)
1,500.00 EGP
Money(150000, 'EGP')
[Money(150000, 'EGP')]
~~~

لاحظ التالت: الـ list بتطبع عناصرها بـ [[__repr__]] مش [[__str__]].

---

## ٣. [[__eq__]] و [[__hash__]]

~~~python
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Money):
            return NotImplemented
        return (self.cents, self.currency) == (other.cents, other.currency)
    def __hash__(self) -> int:
        return hash((self.cents, self.currency))
~~~

- من غير [[__eq__]]، [[==]] بيقارن **الهوية** (نفس الـ object في الذاكرة؟)، فـ [[Money(5) == Money(5)]] كانت هتطلع [[False]].
- [[isinstance(other, Money)]]: الطرف التاني Money؟ لو لأ، رجّع [[NotImplemented]]: قيمة خاصة (مش exception) معناها «معرفش أقارن مع ده، جرّب الناحية التانية». ولو الناحيتين قالوا كده، [[==]] بترجع [[False]] بهدوء.
- [[(a, b) == (c, d)]]: بنقارن tuple بـ tuple، يعني القروش والعملة مع بعض. [[Money(1) == Money(1, "USD")]] طلعت [[False]].
- [[__hash__]]: رقم بيمثّل القيمة، والـ [[set]] والـ dict بيستخدموه عشان يلاقوا العنصر بسرعة. القاعدة: لو [[a == b]] يبقى لازم [[hash(a) == hash(b)]]، فبنعمل الـ hash من **نفس** الحاجات اللي [[__eq__]] بيقارنها.

لو كتبت [[__eq__]] من غير [[__hash__]]، Python بيحط [[__hash__ = None]] والـ class بيبقى unhashable:

~~~text الناتج: class فيه __eq__ بس
None
TypeError: cannot use 'NoHash' as a set element (unhashable type: 'NoHash')
~~~

ده على 3.14. و 3.13 الرسالة أقصر: [[TypeError: unhashable type: 'NoHash']].

---

## ٤. [[__lt__]] و [[__add__]] و [[__bool__]]

~~~python
    def __lt__(self, other: "Money") -> bool:
        return self.cents < other.cents
    def __add__(self, other: "Money") -> "Money":
        return Money(self.cents + other.cents, self.currency)
    def __bool__(self) -> bool:
        return self.cents != 0
~~~

- [[__lt__]] (lt = less than): [[<]]. ومنها [[sorted]] و [[max]] و [[min]] اشتغلوا. و [[@total_ordering]] كمّل الباقي: [[Money(1) > Money(2)]] طلعت [[False]] و [[Money(3) <= Money(3)]] [[True]].
- [[-> "Money"]] بين علامات تنصيص: الـ class لسه بيتعرّف، فالاسم لسه مش موجود؛ النص بيأجّل قراية النوع.
- [[__add__]]: بترجّع object **جديد** ومبتلمسش [[self]]. زي [[1 + 2]] اللي مبتغيّرش الـ 1.
- [[__bool__]]: [[Money(0)]] تبقى [[False]] في [[if]].

> [[__lt__]] هنا مش بتفحص النوع، فـ [[Money(1) < 5]] بتوقع بـ [[AttributeError: 'int' object has no attribute 'cents']] (اتجرّب). الأصح تعمل نفس فحص [[isinstance]] اللي في [[__eq__]] وترجّع [[NotImplemented]]، فيطلع [[TypeError]] واضح.

---

## ٥. [[Cart]]: collection بتاعتك

~~~python
class Cart:
    def __init__(self, *prices: Money):
        self._prices = list(prices)
    def __len__(self) -> int:
        return len(self._prices)
    def __iter__(self):
        return iter(self._prices)
    def __contains__(self, item: Money) -> bool:
        return item in self._prices
~~~

- [[*prices]]: أي عدد Money بالمكان، بيوصلوا tuple (درس «*args و **kwargs»)، و [[list(...)]] بتحوّله list.
- [[_prices]]: الـ [[_]] في الأول اتفاق معناه «داخلي، متلمسوش من برّه».
- [[__iter__]] لازم ترجّع **iterator**، و [[iter(list)]] أسهل طريقة.
- [[__contains__]]: [[item in self._prices]]، و [[in]] على list بتقارن بـ [[==]]، يعني بتستخدم [[Money.__eq__]].

---

## ٦. التشغيل

~~~python
cart = Cart(Money(15000), Money(2550), Money(15000))
print(len(cart), Money(2550) in cart)
~~~

~~~text الناتج
3 True
~~~

[[Money(2550)]] object جديد مش اللي جوه العربية، بس [[__eq__]] بيقارن القيمة فلقاه.

~~~python
print(sum(cart, Money(0)))
~~~

~~~text الناتج
325.50 EGP
~~~

[[sum]] بتبدأ من [[0]] وتجمع عليه. و [[0 + Money]] مش متعرّفة:

~~~text الناتج: sum(cart) من غير قيمة بداية
TypeError: unsupported operand type(s) for +: 'int' and 'Money'
~~~

فبنديها [[Money(0)]] كبداية. 15000 + 2550 + 15000 = 32550 قرش = 325.50.

~~~python
print(max(cart), repr(min(cart)))
~~~

~~~text الناتج
150.00 EGP Money(2550, 'EGP')
~~~

[[max]] بيلف بـ [[__iter__]] ويقارن بـ [[__lt__]]. واتطبع الأول بـ [[__str__]] (لأن [[print]])، والتاني بـ [[__repr__]] لأننا طلبناه صراحة.

~~~python
print(Money(1) >= Money(1), {Money(5), Money(5)})
~~~

~~~text الناتج
True {Money(5, 'EGP')}
~~~

[[>=]] جاية من [[@total_ordering]]. والـ set شال التكرار: نفس الـ hash ومتساويين.

~~~python
print(bool(Money(0)), Money(5) == 5)
~~~

~~~text الناتج
False False
~~~

الأولى من [[__bool__]]. والتانية: [[Money.__eq__]] رجّعت [[NotImplemented]]، و [[int]] كمان ميعرفش يقارن بـ Money، فالنتيجة [[False]] من غير exception.

---

## ٧. الحل: [[Playlist]]

~~~python solCode
    def __getitem__(self, index):
        return self.songs[index]
    def __add__(self, other: "Playlist") -> "Playlist":
        if not isinstance(other, Playlist):
            return NotImplemented
        return Playlist(f"{self.name}+{other.name}", self.songs + other.songs)
~~~

- [[__getitem__]]: [[p[0]]] بتنادي [[p.__getitem__(0)]]. وبما إننا بنعدّي الـ index للـ list زي ما هو، [[p[-1]]] و [[p[1:]]] اشتغلوا ببلاش ([[1:]] بيوصل كـ object من نوع [[slice]]).
- [[__add__]] بفحص النوع و [[NotImplemented]]: كده [[p + 5]] بيطلّع رسالة Python العادية.
- [[self.songs + other.songs]]: [[+]] على listين بيعمل list جديدة فيها الاتنين.
- و [[songs or []]] في [[__init__]]: لو [[None]] أو فاضية خد [[[]]]، و [[list(...)]] نسخة جديدة.

~~~text الناتج
Playlist('chill+gym', 3 songs) a c ['b', 'c']
['a', 'b', 'c'] True
True
TypeError: unsupported operand type(s) for +: 'Playlist' and 'int'
~~~

---

## الخلاصة

- الـ dunders بيناديها Python، مش انت.
- [[__repr__]] دايمًا. و [[__eq__]] و [[__hash__]] مع بعض ومن نفس الحقول.
- مع نوع مش متوقع: [[return NotImplemented]]، مش [[False]] ومش [[raise]].
- [[__add__]] بترجّع object جديد.
- [[@total_ordering]]: اكتب [[__eq__]] و [[__lt__]] والباقي يتولّد.`,
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
          teach: R`## المثال بيعمل إيه؟

classين للداتا من غير ولا [[__init__]] مكتوب بإيدنا: [[Money]] قيمة فلوس ثابتة متتعدلش، و [[Cart]] عربية فيها ليستة ووقت إنشاء. و [[@dataclass]] هو اللي بيكتب الـ methods من الأنواع اللي كتبناها. اتشغّل بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker).

> المثال فيه سطر بيرمي بالقصد ([[price.amount = 1]])، فلو شغّلته كملف هيقف عنده. جرّبه في الـ REPL سطر سطر، أو حط السطر ده في [[try]].

---

## ١. الـ imports

~~~python
from dataclasses import dataclass, field, asdict, replace
from datetime import datetime, UTC
~~~

- [[dataclass]]: الـ decorator نفسه. و [[field]]: لإعدادات خاصة بخانة واحدة. و [[asdict]]: يحوّل الـ object لـ dict. و [[replace]]: نسخة بقيم متغيرة.
- [[datetime]]: نوع التاريخ والوقت. و [[UTC]] (من 3.11): المنطقة الزمنية العالمية، عشان الوقت ميبقاش بتوقيت السيرفر.

---

## ٢. [[Money]]: [[frozen]] و [[slots]]

~~~python
@dataclass(frozen=True, slots=True)
class Money:
    amount: int
    currency: str = "EGP"
~~~

- [[amount: int]]: ده مش متغير، ده **annotation** (اسم ونوع). الـ dataclass بيقرا الـ annotations دي وبيعمل منها خانات (fields)، بنفس الترتيب.
- [[currency: str = "EGP"]]: خانة ليها default.
- الباراميترات اللي بين قوسين الـ decorator:

| الباراميتر | معناه |
|---|---|
| [[frozen=True]] | الـ object ميتعدلش بعد ما يتعمل، وبيتولّد له [[__hash__]] |
| [[slots=True]] (3.10+) | الخانات تتخزن في [[__slots__]] بدل [[__dict__]]: ذاكرة أقل، ومينفعش تضيف خانة مش متعرّفة |

والـ decorator ولّد ده تقريبًا لوحده:

~~~python
def __init__(self, amount: int, currency: str = "EGP"):
    self.amount = amount
    self.currency = currency
~~~

ومعاه [[__repr__]] و [[__eq__]].

---

## ٣. [[Cart]]: [[field(default_factory=...)]]

~~~python
@dataclass(slots=True)
class Cart:
    user_id: int
    items: list[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=lambda: datetime.now(UTC))
~~~

- [[user_id: int]]: إجباري (ملوش default).
- [[field(default_factory=list)]]: [[default_factory]] **دالة** بتتنادى كل مرة object جديد يتعمل، والناتج بتاعها هو الـ default. [[list]] لما تتنادى بترجّع [[[]]] جديدة. فكل عربية ليها ليستة لوحدها: [[Cart(1).items is Cart(2).items]] طلعت [[False]].
- [[lambda: datetime.now(UTC)]]: [[lambda]] دالة صغيرة من غير اسم في سطر واحد، من غير باراميترات، بترجّع الوقت دلوقتي. لو كتبت [[= datetime.now(UTC)]] على طول، الوقت كان هيتحسب **مرة واحدة** وقت تعريف الـ class، وكل العربيات تاخد نفس الوقت.

الـ dataclass بيمنعك من [[= []]] أصلًا:

~~~text الناتج: items: list[str] = []
ValueError: mutable default <class 'list'> for field items is not allowed: use default_factory
~~~

والترتيب مهم: خانة من غير default مينفعش تيجي بعد خانة ليها default (زي باراميترات الدوال بالظبط):

~~~text الناتج: a: int = 1 وبعدها b: int
TypeError: non-default argument 'b' follows default argument 'a'
~~~

---

## ٤. التشغيل

~~~python
price = Money(15000)
print(price)
print(price == Money(15000))
~~~

~~~text الناتج
Money(amount=15000, currency='EGP')
True
~~~

[[__repr__]] المتولّد بيكتب كل خانة باسمها. و [[__eq__]] المتولّد بيقارن الخانات بالترتيب، فـ objectين مختلفين بنفس القيم متساويين.

~~~python
price.amount = 1
~~~

~~~text الناتج
dataclasses.FrozenInstanceError: cannot assign to field 'amount'
~~~

[[frozen]] منع التعديل. [[dataclasses.]] قبل الاسم معناها إن نوع الخطأ متعرّف في موديول [[dataclasses]].

~~~python
cheaper = replace(price, amount=12000)
~~~

[[replace]] بتعمل **نسخة جديدة** بالخانة اللي اتغيرت، والأصلي زي ما هو:

~~~text الناتج: print(cheaper, price)
Money(amount=12000, currency='EGP') Money(amount=15000, currency='EGP')
~~~

~~~python
cart = Cart(user_id=7)
cart.items.append("tea")
print(asdict(cart))
~~~

[[Cart]] مش frozen، فالليستة تتعدّل عادي. و [[asdict]] حوّلته dict:

~~~text الناتج
{'user_id': 7, 'items': ['tea'], 'created_at': datetime.datetime(2026, 10, 7, 8, 56, 13, 535237, tzinfo=datetime.timezone.utc)}
~~~

الوقت ده وقت التشغيل الفعلي بالـ UTC، والأرقام: سنة، شهر، يوم، ساعة، دقيقة، ثانية، ومايكروثانية. و [[tzinfo=...utc]] معناها إن الوقت عارف المنطقة الزمنية بتاعته.

### [[slots=True]] بيمسك الغلط الإملائي

~~~text الناتج: cart.itmes = ["x"]
AttributeError: 'Cart' object has no attribute 'itmes' and no __dict__ for setting new attributes
~~~

من غير [[slots]]، السطر ده كان هيعدّي ويعمل خانة جديدة اسمها [[itmes]] في صمت.

### مفيش فحص للأنواع

~~~python
Money("oops")
~~~

~~~text الناتج
Money(amount='oops', currency='EGP')
~~~

عدّى عادي. [[amount: int]] للمحرر و mypy بس، و Python وقت التشغيل مبيفحصش. الفحص ده شغل Pydantic (المستوى ٢).

---

## ٥. التجربة: [[frozen]] و الـ hash

~~~text الناتج: {price: "x"} مع frozen=True
{Money(amount=15000, currency='EGP'): 'x'}
~~~

ومن غير [[frozen]] (اتجرّب على dataclass عادي اسمه [[M2]] فيه [[amount: int]] بس):

| النسخة | الرسالة |
|---|---|
| 3.14 | [[TypeError: cannot use 'M2' as a dict key (unhashable type: 'M2')]] |
| 3.13 | [[TypeError: unhashable type: 'M2']] |

الـ dataclass لما ولّد [[__eq__]] من غير frozen، حط [[__hash__ = None]] (اتطبع [[None]])، لأن object بيتغير لو اتغيّر وهو مفتاح في dict هيضيع جواه.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| خانة إجبارية | [[name: type]] |
| خانة ليها default ثابت | [[name: type = value]] |
| default list أو dict أو وقت | [[field(default_factory=...)]] |
| object ميتعدلش ويبقى مفتاح | [[@dataclass(frozen=True)]] |
| تمنع خانات بالغلط ووفّر ذاكرة | [[slots=True]] |
| نسخة بقيمة متغيرة | [[replace(obj, x=...)]] |
| dict | [[asdict(obj)]] |

- الـ dataclass بيولّد [[__init__]] و [[__repr__]] و [[__eq__]]، ومبيفحصش الأنواع.
- للداتا اللي جاية من برّه (request، ملف إعدادات): Pydantic.`,
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

و [[{price: "x"}]] مع [[frozen=True]] بتشتغل: [[{Money(amount=15000, currency='EGP'): 'x'}]]، لأن frozen مع [[eq]] (الافتراضي) بيعملوا [[__hash__]] من الحقول. من غير frozen هتاخد [[TypeError: unhashable type: 'Money']] (في 3.14 الرسالة أطول: [[cannot use 'Money' as a dict key (unhashable type: 'Money')]]): الـ dataclass عمل [[__eq__]] فشال الـ hash الافتراضي، لأن object ممكن يتغير ميبقاش آمن كمفتاح.`
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
          teach: R`## المثال بيعمل إيه؟

٤ أنواع Enum: [[StrEnum]] لحالة طلب، و [[IntEnum]] لأولوية، و [[Flag]] لصلاحيات بتتجمع، و [[Enum]] العادي للمقارنة. وفي الآخر [[match]] على الحالة، وقيمة غلط بترمي. اتشغّل بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker)، والناتج واحد.

**Enum** (من enumeration يعني «تعداد»): class أعضاؤه ثابتين ومعروفين من الأول، وكل عضو ليه **اسم** ([[.name]]) و**قيمة** ([[.value]]).

> آخر سطر ([[OrderStatus("lost")]]) بيرمي [[ValueError]] بالقصد، وهو آخر سطر فمش هيوقف حاجة.

---

## ١. [[StrEnum]] و [[auto()]]

~~~python
from enum import Enum, Flag, IntEnum, StrEnum, auto
class OrderStatus(StrEnum):
    PENDING = auto()
    PAID = auto()
    SHIPPED = auto()
    CANCELLED = auto()
~~~

- [[class OrderStatus(StrEnum):]]: Enum أعضاؤه **strings** فعلًا (الـ class بيورث من [[str]]). [[StrEnum]] من 3.11.
- الأسماء بحروف كابيتال لأنها ثوابت (عرف).
- [[auto()]]: «اختار القيمة لوحدك». في [[StrEnum]] القيمة بتبقى اسم العضو بحروف صغيرة: [[PAID]] قيمته [["paid"]].

~~~python
print(OrderStatus.PAID, OrderStatus.PAID == "paid")
~~~

~~~text الناتج
paid True
~~~

بيتطبع كقيمته، وبيساوي الـ string العادي لأنه **هو** string: [[isinstance(OrderStatus.PAID, str)]] طلعت [[True]]، و [[OrderStatus.PAID.upper()]] رجّعت [['PAID']]. وفي الـ REPL شكله الكامل [[<OrderStatus.PAID: 'paid'>]]. وده اللي بيخلّيه يتحوّل JSON من غير تعب: [[json.dumps({"status": OrderStatus.PAID})]] طلّعت [[{"status": "paid"}]].

والغلط الإملائي بيبان فورًا:

~~~text الناتج: OrderStatus.SHIPED
AttributeError: type object 'OrderStatus' has no attribute 'SHIPED'
~~~

مقارنة بـ [[status == "shiped"]] كـ string، اللي بترجع [[False]] في صمت.

---

## ٢. من string لـ Enum

~~~python
s = OrderStatus("shipped")
print(s.name, s.value, s is OrderStatus.SHIPPED)
~~~

- [[OrderStatus("shipped")]]: نداء الـ class **بقيمة** بيرجّع العضو اللي قيمته كده. ده اللي بتعمله مع داتا جاية من request أو قاعدة بيانات. (و [[OrderStatus["PAID"]]] بالأقواس المربعة بيدوّر **بالاسم**.)
- [[s is OrderStatus.SHIPPED]]: [[is]] بتسأل «نفس الـ object بالظبط؟». كل عضو object واحد بس في البرنامج كله (singleton).

~~~text الناتج
SHIPPED shipped True
~~~

~~~python
print([st.value for st in OrderStatus])
~~~

الـ Enum بيتلف عليه بترتيب الكتابة:

~~~text الناتج
['pending', 'paid', 'shipped', 'cancelled']
~~~

---

## ٣. [[IntEnum]]

~~~python
class Priority(IntEnum):
    LOW = 1
    HIGH = 3
print(Priority.HIGH > Priority.LOW, Priority(3).name)
~~~

نفس فكرة [[StrEnum]] بس الأعضاء أرقام ([[int]])، فبيتقارنوا ويتجمعوا كأرقام. و [[Priority(3)]] بيرجّع العضو اللي قيمته 3.

~~~text الناتج
True HIGH
~~~

---

## ٤. [[Flag]]: صلاحيات بتتجمع

~~~python
class Perm(Flag):
    READ = auto()
    WRITE = auto()
    DELETE = auto()
editor = Perm.READ | Perm.WRITE
print(Perm.WRITE in editor, Perm.DELETE in editor)
~~~

في [[Flag]]، [[auto()]] بيدّي كل عضو **bit** لوحده: القيم [[1, 2, 4]] (كل واحدة ضعف اللي قبلها). ليه؟ لأن في الـ binary دول [[001]] و [[010]] و [[100]]، كل واحد في خانة مختلفة.

- [[|]] (اسمها OR): بتجمع الـ bits. [[READ | WRITE]] = [[1 | 2]] = [[3]] ([[011]]). وشكلها في الـ REPL [[<Perm.READ|WRITE: 3>]].
- [[in]]: «الـ bit ده موجود جوه؟».

~~~text الناتج
True False
~~~

---

## ٥. [[Enum]] العادي مش بيساوي قيمته

~~~python
class Color(Enum):
    RED = "#f00"
print(Color.RED == "#f00", Color("#f00"))
~~~

[[Enum]] العادي مش وارث من [[str]]، فالعضو object مختلف عن قيمته، و [[==]] بترجع [[False]]. لازم [[Color.RED.value]] لو عايز [["#f00"]]. ولما تطبعه بيطلع [[Color.RED]] مش القيمة.

~~~text الناتج
False Color.RED
~~~

ده سبب إن [[StrEnum]] هو الأنسب مع الـ APIs.

---

## ٦. [[match]] على Enum

~~~python
match s:
    case OrderStatus.SHIPPED | OrderStatus.PAID:
        print("اتدفع")
    case OrderStatus.CANCELLED:
        print("اتلغى")
~~~

- [[match s:]]: قارن [[s]] بالحالات بالترتيب (درس «match و case»).
- [[|]] جوه [[case]] معناها «أو»: لو [[SHIPPED]] أو [[PAID]].
- الاسم فيه **نقطة** ([[OrderStatus.SHIPPED]])، فـ Python بيقارن بقيمته. لو كتبت [[case PAID:]] اسم لوحده من غير نقطة، ده **capture**: بيمسك أي قيمة ويحطها في متغير اسمه [[PAID]]. اتجرّب: [[s = "cancelled"]] مع [[case PAID:]] طبع [[matched cancelled]]. ولو فيه [[case]] بعده Python بيرفض الكود: [[SyntaxError: name capture 'PAID' makes remaining patterns unreachable]].

[[s]] قيمته [[SHIPPED]] من فوق:

~~~text الناتج
اتدفع
~~~

---

## ٧. قيمة مش موجودة

~~~python
OrderStatus("lost")
~~~

~~~text الناتج
ValueError: 'lost' is not a valid OrderStatus
~~~

يعني تحويل string لـ Enum هو نفسه validation: أي قيمة برّه القايمة بترمي.

---

## ٨. الحل: انتقالات الحالة

~~~python solCode (من غير الـ type hint اللي على أول سطر)
ALLOWED = {
    OrderStatus.PENDING: {OrderStatus.PAID, OrderStatus.CANCELLED},
    ...
    OrderStatus.DELIVERED: set(),
    OrderStatus.CANCELLED: set(),
}
def can_move(current: OrderStatus, new: OrderStatus) -> bool:
    return new in ALLOWED[current]
~~~

- في الحل أول سطر عليه type hint: [[ALLOWED]] نوعه [[dict]] مفتاحه [[OrderStatus]] وقيمته [[set[OrderStatus] ]]، يعني كل حالة قصادها مجموعة حالات.
- [[{A, B}]]: set (مجموعة من غير تكرار). و [[set()]] set فاضية (لأن [[{}]] لوحدها dict فاضي مش set).
- [[new in ALLOWED[current]]]: هات الحالات المسموحة من الحالية، واسأل الجديدة فيهم؟

~~~python solCode
assert set(ALLOWED) == set(OrderStatus), "كل حالة لازم يبقى ليها سطر"
~~~

- [[set(ALLOWED)]]: مفاتيح الـ dict كـ set. و [[set(OrderStatus)]]: كل الأعضاء.
- [[assert شرط, "رسالة"]]: لو الشرط [[False]] ارمي [[AssertionError]] بالرسالة. هنا عدّى من غير ما يطبع حاجة.

~~~text الناتج
True
False
True
~~~

[[PENDING]] لـ [[PAID]] مسموح، و [[SHIPPED]] لـ [[CANCELLED]] لأ، و [[OrderStatus("paid")]] لـ [[OrderStatus("shipped")]] مسموح.

---

## الخلاصة

| النوع | الأعضاء | بيساوي قيمته؟ | الاستخدام |
|---|---|---|---|
| [[StrEnum]] | strings | [[True]] | حالات وأدوار في API وقاعدة بيانات |
| [[IntEnum]] | أرقام | [[True]] | أولويات، مستويات |
| [[Flag]] | bits | مش موضوعه | صلاحيات بتتجمع بالـ OR |
| [[Enum]] | أي حاجة | [[False]] | لما مش عايز تخلطه بقيمته |

- [[X("value")]] من قيمة لعضو (وبترمي لو غلط)، و [[X["NAME"]]] من اسم.
- [[.name]] الاسم و [[.value]] القيمة، وكل عضو موجود مرة واحدة ([[is]]).
- جوه [[match]] اكتب [[OrderStatus.PAID]] بالنقطة، مش [[PAID]].`,
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
          teach: R`## المثال بيعمل إيه؟

طريقتين تقول بيهم «أنا محتاج أي حاجة بتعرف تعمل كذا»: [[ABC]] لـ [[Storage]] (تخزين) بيجبر الأبناء يكتبوا [[save]]، و [[Protocol]] لـ [[Sender]] (مُرسل) بيوصف الشكل بس، وأي class فيه [[send]] بنفس الشكل يطابق من غير ما يورث. اتشغّل بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker)، و mypy 2.4.0 اتشغّل جوه نفس الـ container (اتسطّب فيه بـ [[pip install mypy]] واتمسح معاه).

| | [[ABC]] | [[Protocol]] |
|---|---|---|
| لازم ترث منه؟ | آه | لأ |
| مين بيفحص؟ | Python وقت التشغيل | mypy أو pyright (المحرر) |
| فيه كود مشترك؟ | ممكن | لأ، شكل بس |

> آخر سطر ([[Storage()]]) بيرمي [[TypeError]] بالقصد، وهو آخر سطر.

---

## ١. الـ imports و [[type]]

~~~python
from abc import ABC, abstractmethod
from typing import Protocol, runtime_checkable
type Message = tuple[str, str]
~~~

- [[abc]] اختصار Abstract Base Classes. [[ABC]] الـ class اللي بنورث منه، و [[abstractmethod]] decorator بيعلّم method إنها «لازم الابن يكتبها».
- [[type Message = tuple[str, str]]] (من 3.12): بيعمل **اسم لنوع**. [[Message]] بقى معناه «tuple فيه نصين» (لمين، والنص). ده للقراية والـ type checker بس، و [[print(Message)]] بيطبع [[Message]].

---

## ٢. [[ABC]]: class أساسي إجباري

~~~python
class Storage(ABC):
    @abstractmethod
    def save(self, key: str, data: bytes) -> None: ...
    def save_text(self, key: str, text: str) -> None:
        self.save(key, text.encode("utf-8"))
~~~

- [[class Storage(ABC):]]: ورث من [[ABC]]، فبقى abstract class.
- [[@abstractmethod]] فوق [[save]]: أي ابن **لازم** يكتب [[save]]، وإلا Python يرفض يعمل منه object.
- [[...]] (اسمها Ellipsis، ٣ نقط): جسم فاضي، معناها «مفيش كود هنا».
- [[data: bytes]]: [[bytes]] بايتات خام، مش نص.
- [[save_text]]: method **عادية** فيها كود، والأبناء بياخدوها جاهزة. بتحوّل النص لـ bytes بـ [[.encode("utf-8")]] وتنادي [[save]] اللي الابن هيكتبها. دي ميزة الـ ABC على الـ Protocol: كود مشترك.

### الابن

~~~python
class MemoryStorage(Storage):
    def __init__(self) -> None:
        self.files: dict[str, bytes] = {}
    def save(self, key: str, data: bytes) -> None:
        self.files[key] = data
~~~

- [[self.files: dict[str, bytes] = {}]]: dict فاضي، والنوع مكتوب عليه: مفتاحه نص وقيمته bytes.
- [[save]] اتكتبت، فالـ class كامل.

~~~python
store = MemoryStorage()
store.save_text("a.txt", "أهلًا")
print(store.files)
~~~

~~~text الناتج
{'a.txt': b'\xd8\xa3\xd9\x87\xd9\x84\xd9\x8b\xd8\xa7'}
~~~

[[b'...']] معناها bytes، و [[\xd8]] كل واحدة بايت مكتوب بالـ hex. «أهلًا» ٥ حروف بقت ١٠ بايت، لأن كل حرف عربي في UTF-8 بياخد بايتين.

### الـ abstract مبيتعملش منه object

~~~python
Storage()
~~~

~~~text الناتج
TypeError: Can't instantiate abstract class Storage without an implementation for abstract method 'save'
~~~

ونفس الخطأ لابن نسي [[save]] (اتجرّب على [[class Half(Storage): pass]]): [[Can't instantiate abstract class Half without an implementation for abstract method 'save']]. والخطأ بيحصل **وقت التشغيل**، لما تحاول تعمل الـ object.

---

## ٣. [[Protocol]]: الشكل بس

~~~python
@runtime_checkable
class Sender(Protocol):
    def send(self, to: str, text: str) -> None: ...
~~~

- [[class Sender(Protocol):]]: مش class هيتورث منه، ده **وصف**: «أي حاجة فيها [[send(to: str, text: str)]]». الفكرة اسمها structural typing: الشكل هو اللي بيحدد، مش الوراثة (زي interface في TypeScript).
- [[@runtime_checkable]]: بيسمح بـ [[isinstance(x, Sender)]] وقت التشغيل (من غيره [[isinstance]] بترمي [[TypeError]]).

### classين مش وارثين من حاجة

~~~python
class EmailSender:
    def send(self, to: str, text: str) -> None:
        print("email to", to, ":", text)
class FakeSender:
    def __init__(self) -> None:
        self.sent: list[Message] = []
    def send(self, to: str, text: str) -> None:
        self.sent.append((to, text))
~~~

- [[EmailSender]]: بيطبع بدل ما يبعت إيميل حقيقي (مثال).
- [[FakeSender]]: **fake** للاختبار: بيحفظ اللي «اتبعت» في list بدل ما يبعته، فالاختبار يقدر يتأكد منه. [[list[Message]]] = list فيها tuples. و [[(to, text)]] بين قوسين tuple واحد.

### الدالة بتطلب الشكل

~~~python
def notify_shipped(sender: Sender, to: str) -> None:
    sender.send(to, "طلبك اتشحن")
~~~

[[sender: Sender]]: الدالة مش فارق معاها إيميل ولا SMS ولا fake، المهم فيه [[send]].

~~~python
notify_shipped(EmailSender(), "sara@example.com")
fake = FakeSender()
notify_shipped(fake, "omar@example.com")
print(fake.sent, isinstance(fake, Sender))
~~~

~~~text الناتج
email to sara@example.com : طلبك اتشحن
[('omar@example.com', 'طلبك اتشحن')] True
~~~

نفس الدالة اشتغلت مع الاتنين من غير أي تغيير. و [[isinstance]] قالت [[True]] مع إن [[FakeSender]] مش وارث من [[Sender]].

### [[runtime_checkable]] بيفحص الاسم بس

~~~text الناتج: isinstance لـ class فيه send(self, phone)، وبعدين لـ object()
True False
~~~

الأول [[True]] رغم إن الـ signature غلط: [[isinstance]] بتسأل «فيه method اسمها [[send]]؟» وبس. الفحص الحقيقي شغل mypy:

~~~text الناتج: mypy على SmsSender فيه send(self, phone: str)
sms_bad.py:8: error: Argument 1 to "notify_shipped" has incompatible type "SmsSender"; expected "Sender"  [arg-type]
sms_bad.py:8: note: Following member(s) of "SmsSender" have conflicts:
sms_bad.py:8: note:     Expected:
sms_bad.py:8: note:         def send(self, to: str, text: str) -> None
sms_bad.py:8: note:     Got:
sms_bad.py:8: note:         def send(self, phone: str) -> None
~~~

ونفس الـ mypy على المثال نفسه مسك [[Storage()]] قبل التشغيل: [[l12_ex.py:34: error: Cannot instantiate abstract class "Storage" with abstract attribute "save"  [abstract] ]].

---

## ٤. الحل: [[Clock]]

~~~python solCode
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
~~~

- الوقت بقى **باراميتر** ([[clock]]) بدل ما الدالة تنادي [[datetime.now()]] جواها. في الإنتاج تبعت [[SystemClock()]]، وفي الاختبار [[FixedClock(...)]] بالوقت اللي انت عايزه.
- [[>=]]: «عدّى أو وصل للموعد».

~~~python solCode
deadline = datetime(2026, 10, 1, tzinfo=UTC)
print(is_expired(deadline, FixedClock(datetime(2026, 9, 30, 23, 59, 59, tzinfo=UTC))))
print(is_expired(deadline, FixedClock(deadline)))
print(is_expired(deadline, SystemClock()))
~~~

[[datetime(سنة, شهر, يوم, ساعة, دقيقة, ثانية, tzinfo=UTC)]]. و [[tzinfo=UTC]] ضروري: من غيره الوقت «naive» (مش عارف منطقته)، والمقارنة مع [[datetime.now(UTC)]] بترمي:

~~~text الناتج
TypeError: can't compare offset-naive and offset-aware datetimes
~~~

~~~text الناتج (اتشغّل يوم 7 أكتوبر 2026)
False
True
True
~~~

قبل الموعد بثانية [[False]]، وعند الموعد بالظبط [[True]] بسبب [[>=]]، والساعة الحقيقية بعد 1 أكتوبر فـ [[True]] (قبل 1 أكتوبر كانت هتبقى [[False]]). و [[mypy --strict]] على الحل قال [[Success: no issues found in 1 source file]] مع إن ولا class ورث من [[Clock]]. ولو [[FixedClock.now]] رجّعت [[str]]:

~~~text الناتج: mypy --strict
clock_bad.py:10: error: Argument 2 to "is_expired" has incompatible type "FixedClock"; expected "Clock"  [arg-type]
~~~

---

## الخلاصة

- [[ABC]] + [[@abstractmethod]]: لازم ترث، و Python بيرفض الـ object الناقص وقت التشغيل، وتقدر تحط كود مشترك.
- [[Protocol]]: شكل بس، من غير وراثة، والفحص من mypy أو pyright مش من Python.
- [[@runtime_checkable]] بيخلّي [[isinstance]] تشتغل بس بتفحص الأسماء، مش الـ signatures.
- الحاجات اللي بتتغير بين الإنتاج والاختبار (وقت، إرسال، تخزين) ابعتها كباراميتر نوعه Protocol.`,
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

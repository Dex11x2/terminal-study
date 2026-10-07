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
    }
]);

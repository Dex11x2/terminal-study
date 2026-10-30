// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "الدوال",
      l: 1,
      n: "باراميترات بالاسم وبالمكان، و decorators بتلف دالة جوه دالة، و generators بتطلّع قيم واحدة واحدة",
      time: R`حوالي ٧ ساعات (٦ دروس)`,
      goal: [
        R`تكتب دوال بـ [[def]] و [[return]] وقيم افتراضية آمنة، وتقرا أي رسالة [[TypeError]] بتاعة باراميترات وتعرف تصلّحها.`,
        R`تتحكم في شكل النداء: بالمكان ولا بالاسم، و [[*args]] و [[**kwargs]]، و [[*]] و [[/]] في التعريف.`,
        R`تتعامل مع الدوال كقيم: تبعتها لـ [[sorted]] و [[map]]، وتخزنها في dict، وتكتب decorators و closures، وتحل مسائل بالـ recursion.`,
        R`تعرف قواعد LEGB و [[global]] و [[nonlocal]] وفخ الـ late binding، وتكتب generators بتوفّر الذاكرة وتقيسها.`,
      ],
      use: {
        prog: R`الدالة هي وحدة البناء: كل route في FastAPI دالة، وكل dependency دالة، وكل decorator دالة بتلف دالة.`,
        work: R`[[@retry]] و [[@timed]] و [[@cache]] و generators بتقرا ملفات بالجيجا سطر سطر: حاجات بتتكتب في أي سكربت أو خدمة حقيقية.`,
        cs: R`الـ closures والـ recursion والـ lazy evaluation مفاهيم في كل لغة. والـ recursion ليها حد في Python ([[sys.getrecursionlimit()]] = 1000).`,
      },
      projects: [
        { lvl: 'صغير', t: R`مكتبة validators`, what: R`[[validators.py]] فيه دوال [[is_email]] و [[is_phone_eg]] و [[in_range(lo, hi)]] (بترجّع دالة)، و [[validate(value, *checks)]] بتشغّل كل الفحوص وترجّع list بأسماء اللي فشلت. من درس «def و return و الـ defaults» و «lambda والدوال كقيم» و «*args و **kwargs».`, done: R`[[validate("a@b.com", is_email)]] بترجّع [[[]]]، و [[validate(150, in_range(1, 120))]] بترجّع list فيها اسم الفحص، و ١٠ [[assert]] بتعدّي منهم القيم الفاضية و [[None]].` },
        { lvl: 'صغير', t: R`[[@timed]] و [[@count_calls]]`, what: R`decoratorين: واحد بيطبع وقت الدالة، والتاني بيعدّ نداءاتها في صفة [[wrapper.calls]]، وتلفهم الاتنين على دالة واحدة. من درس «decorators».`, done: R`[[f.__name__]] بيرجّع الاسم الأصلي مش [[wrapper]] (عشان [[wraps]])، و [[f.calls]] بتزيد ١ كل نداء حتى لو الدالة رمت خطأ، وترتيب الـ decorators مكتوب وانت فاهم مين بيتنفّذ الأول.` },
        { lvl: 'متوسط', t: R`pipeline لتنضيف سطور`, what: R`٤ generators ورا بعض: [[read(lines)]] و [[strip_blank]] و [[parse_csv]] و [[only_valid]]، على list فيها ١٠٠ ألف سطر مولّدة، وفي الآخر [[sum]] لعمود. من درس «generators و yield» و «comprehensions».`, done: R`النتيجة بتطابق نفس الحسبة بـ lists، و [[tracemalloc]] بيقول إن الـ peak بتاع نسخة الـ generators أقل بكتير (اكتب الرقمين)، وكل مرحلة بتشتغل لوحدها في [[assert]].` },
        { lvl: 'متوسط', t: R`حاسبة حجم فولدر من dict`, what: R`شجرة فولدرات متمثلة كـ dict متداخل ([[{"name": ..., "size": ..., "children": [...]}]]). اكتب بالـ recursion: الحجم الكلي، وأعمق مستوى، وأكبر ٣ ملفات، ومسار كل ملف كـ [[a/b/c.txt]]. من درس «lambda والدوال كقيم».`, done: R`على شجرة فيها ٤ مستويات و ١٥ ملف النتايج بتطابق حسبة يدوية، والشجرة الفاضية (فولدر من غير children) بترجّع حجمه هو بس، والمسارات مترتبة بـ [[sorted]].` },
        { lvl: 'كبير', t: R`أداة أوامر بـ registry`, what: R`CLI تفاعلي فيه decorator [[@command("name", help="...")]] بيسجّل الدالة في dict، و loop بتقرا سطر وتفكه وتنادي الدالة بالـ arguments بـ [[*args]]، وأمر [[help]] بيطبع كل الأوامر من الـ registry، وأوامر: [[add]] و [[sum]] و [[avg]] و [[history]] و [[undo]]. أي أمر مش موجود أو arguments غلط ([[TypeError]] من النداء نفسه) بيطلّع رسالة واضحة ومبيوقعش. ومعاها [[test_cli.py]] على الدوال من غير input. من كل دروس الوحدة.`, done: R`إضافة أمر جديد = دالة واحدة بـ [[@command]] من غير ما تلمس الـ loop، و [[help]] بيظهر فيه لوحده، و [[avg]] من غير أرقام بيطبع رسالة مش [[ZeroDivisionError]]، و ١٢ [[assert]] بيعدّوا، ونفس سلسلة الأوامر بالـ pipe بتطلّع نفس الناتج مرتين.`, ext: R`زوّد aliases للأوامر، و [[@command]] بيقرا الـ type hints بتاعة الدالة ويحوّل الـ arguments لـ [[int]] أو [[float]] لوحده (بـ [[inspect.signature]])، وده بالظبط اللي FastAPI بيعمله مع الـ routes.` },
        { lvl: 'فكرة', t: R`مكتبة utils بتاعتك`, what: R`كل ما تكتب دالة صغيرة مفيدة في أي مشروع (تقسيم list لحتت، أو retry، أو تنسيق فلوس، أو flatten)، حطها في [[myutils.py]] بـ docstring و type hints و test. انت اللي بتقرر إيه يدخل.`, done: R`فيه ١٠ دوال على الأقل، كل واحدة ليها docstring بيظهر في [[help()]] و ٢ [[assert]] على الأقل، و [[mypy --strict]] من غير أخطاء، واستخدمتها في مشروعين مختلفين.`, ext: R`لما توصل لدرس «uv و pyproject.toml» حوّلها package تتسطّب بـ [[pip install -e .]]، وضيف pytest بدل الـ asserts.` },
      ],
      items: [
        {
          cmd: "def و return و الـ defaults",
          title: "تعرّف دالة وترجّع منها، والـ default اللي بيتحسب مرة واحدة",
          learn: R`تكتب دالة بـ [[def]] و docstring و type hints، وترجّع قيمة أو أكتر، وتعرف إن الدالة من غير [[return]] بترجّع [[None]]، وتكتب defaults آمنة.`,
          out: R`دوال بتتقري زي الجملة، ومش هتقع في فخ [[items=[]]]، وتفهم أي [[TypeError]] بتاعة نداء من أول سطر.`,
          use: {
            prog: R`أي حتة كود بتتكرر مرتين تبقى دالة. والدالة اللي بترجّع قيمة (مش بتطبعها) هي اللي تتختبر وتتستخدم في حتة تانية.`,
            work: R`في FastAPI كل endpoint دالة، والـ default في الباراميتر بيبقى query parameter اختياري. فهم الـ defaults هنا هو فهم الـ API هناك.`,
          },
          desc: R`[[def name(params):]] بيعرّف دالة، والجسم متزقوق تحتها، و [[return value]] بترجّع القيمة وتخرج من الدالة فورًا. لو الدالة خلصت من غير [[return]] بترجّع [[None]]. وتقدر ترجّع أكتر من قيمة بفاصلة ([[return q, r]]) فبتطلع tuple تتفك على اسمين.

الباراميتر بقيمة افتراضية ([[greeting="أهلا"]]) بيبقى اختياري. والنداء ممكن بالمكان ([[greet("سارة", "هاي")]]) أو بالاسم ([[greet("سارة", greeting="هاي")]]).

**الفخ الأشهر:** الـ default بيتحسب **مرة واحدة** لما سطر [[def]] يتنفّذ، مش كل نداء. فـ [[def add(item, items=[])]] كل النداءات بتشارك نفس الـ list. والحل [[items=None]] وتعمل [[[]]] جديدة جوه الدالة.

والسطر الأول تحت [[def]] لو نص بين تلات علامات تنصيص ده **docstring**: بيظهر في [[help(greet)]] وفي المحرر. ودرس «*args و **kwargs» بيكمّل أشكال الباراميترات.`,
          example: R`def greet(name: str, greeting: str = "أهلا") -> str:
    """بترجّع جملة ترحيب."""
    return f"{greeting} يا {name}"
print(greet("سارة"), greet("عمر", greeting="صباح الخير"))
def nothing():
    x = 1
print(nothing())
def div(a: int, b: int) -> tuple[int, int]:
    return a // b, a % b
q, r = div(17, 5)
print(q, r)
def add(item, items=[]):
    items.append(item)
    return items
print(add(1))
print(add(2))
def add_safe(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
print(add_safe(1), add_safe(2))
greet()`,
          try: R`اكتب [[help(greet)]] في الـ REPL بعد ما تعرّفها وشوف الـ docstring. وبعدين اطبع [[add.__defaults__]] بعد كل نداء لـ [[add]]، وجرّب [[greet("a", grting="x")]] واقرا الخطأ لآخره.`,
          flag: "script",
          deep: {
            why: R`الدالة هي أول أداة تنظيم: اسم واضح لحتة شغل، وتتختبر لوحدها، وتتستخدم في ١٠ أماكن. والفرق بين دالة بتـ[[print]] ودالة بتـ[[return]] هو الفرق بين كود تقدر تبني عليه وكود لازم تعيد كتابته. وفخ الـ mutable default سؤال ثابت في أي انترفيو Python (درس «الـ default بيتحسب مرة» في أسئلة الانترفيو).`,
            how: R`لما Python يقابل [[def]]، بيعمل function object ويربطه بالاسم، **وبيحسب الـ defaults ساعتها** ويحطهم في [[greet.__defaults__]]. كل نداء من غير الباراميتر ده بياخد **نفس الـ object** اللي اتحسب. لو الـ object immutable ([[str]] و [[int]] و [[None]]) مفيش مشكلة، لو mutable ([[list]] و [[dict]]) أي تعديل بيفضل للنداء اللي بعده. ونفس الكلام لـ [[def stamp(t=time.time())]]: الوقت بيتحسب مرة واحدة، وكل النداءات بترجّع نفس الرقم (اتجرّبت).

[[return]] بتخرج فورًا حتى لو جوه loop. و [[return a, b]] بتعمل tuple. والدالة من غير [[return]] (أو [[return]] لوحدها) بترجّع [[None]].

رسايل الـ [[TypeError]] بتقولك المشكلة بالظبط: [[missing 1 required positional argument: 'name']]، و [[takes from 1 to 2 positional arguments but 3 were given]]، و [[got an unexpected keyword argument 'grting'. Did you mean 'greeting'?]] (الاقتراح من 3.12). و [[help(f)]] أو [[inspect.signature(f)]] بيوروك الباراميترات.`,
            when: R`اعمل دالة لما حتة كود بتتكرر، أو لما ليها اسم واضح («احسب الضريبة»)، أو لما محتاج تختبرها لوحدها. رجّع قيمة بدل ما تطبع، وسيب الطباعة لآخر طبقة. واستخدم [[None]] كـ default لأي حاجة mutable أو بتتحسب وقت النداء (وقت، أو ID جديد).`,
            mistakes: R`[[def f(items=[])]] أو [[def f(config={})]]: النداءات بتشارك نفس الـ object. و [[def log(t=datetime.now())]]: الوقت ثابت. و [[print]] جوه الدالة بدل [[return]] فاللي بينادي ياخد [[None]]. و [[return]] جوه الـ loop بالغلط فبترجّع أول عنصر. و [[if not items: items = []]] بدل [[if items is None]]: لو حد بعت list فاضية قاصد يتعدّل عليها، هتتبدّل بواحدة تانية.`
          },
          teach: R`## المثال بيعمل إيه؟

بيعرّف ٥ دوال تغطي كل حاجة أساسية: دالة بـ default و docstring، ودالة من غير [[return]]، ودالة بترجّع قيمتين، والفخ المشهور وتصليحه، وفي الآخر نداء غلط. اتشغّل كملف [[defs.py]] على ويندوز بـ Python 3.14.3:

~~~text الناتج
أهلا يا سارة صباح الخير يا عمر
None
3 2
[1]
[1, 2]
[1] [2]
Traceback (most recent call last):
  File "defs.py", line 23, in <module>
    greet()
    ~~~~~^^
TypeError: greet() missing 1 required positional argument: 'name'
~~~

---

## ١. [[def greet(name: str, greeting: str = "أهلا") -> str:]]

| الحتة | معناها |
|---|---|
| [[def]] | «بعرّف دالة» (define) |
| [[greet]] | اسمها، snake_case زي المتغيرات |
| [[name: str]] | باراميتر إجباري، ونوعه المتوقع str (درس «type hints») |
| [[greeting: str = "أهلا"]] | باراميتر اختياري: لو محدش بعته قيمته [["أهلا"]] |
| [[-> str]] | الدالة بترجّع نص |
| [[:]] | الجسم جاي تحت متزقوق ٤ مسافات |

والباراميترات الاختيارية لازم **بعد** الإجبارية: [[def f(a=1, b)]] بتطلّع [[SyntaxError: parameter without a default follows parameter with a default]].

---

## ٢. الـ docstring

~~~python
    """بترجّع جملة ترحيب."""
~~~

أول سطر في الجسم لو نص لوحده بيبقى **docstring**. Python بيحطه في [[greet.__doc__]]، و [[help(greet)]] بتطبعه:

~~~text الناتج
Help on function greet in module __main__:

greet(name, greeting='أهلا')
    بترجّع جملة ترحيب.
~~~

لاحظ إن [[help]] طبعت شكل النداء والـ default. ده نفس اللي بيظهرلك في VS Code لما تحط الماوس على اسم الدالة.

---

## ٣. [[return]] والنداء بالاسم

~~~python
    return f"{greeting} يا {name}"
print(greet("سارة"), greet("عمر", greeting="صباح الخير"))
~~~

- [[return]] بترجّع النص للي نادى. من غيرها كانت هترجّع [[None]].
- [[greet("سارة")]] بعتت [[name]] بس، فـ [[greeting]] خد الـ default.
- [[greeting="صباح الخير"]] نداء **بالاسم** (keyword argument): أوضح، ومش لازم تفتكر الترتيب.

---

## ٤. دالة من غير [[return]]

~~~python
def nothing():
    x = 1
print(nothing())
~~~

~~~text الناتج
None
~~~

الدالة اشتغلت وخلصت، بس مفيش [[return]]، فـ Python رجّع [[None]] لوحده. ده سبب [[TypeError: 'NoneType' object is not subscriptable]] لما تنسى [[return]] وتستخدم الناتج.

---

## ٥. أكتر من قيمة: [[return a // b, a % b]]

~~~python
def div(a: int, b: int) -> tuple[int, int]:
    return a // b, a % b
q, r = div(17, 5)
print(q, r)
~~~

الفاصلة عملت tuple [[(3, 2)]]، و [[q, r =]] فكّتها (درس «set و tuple»). فطبع [[3 2]].

---

## ٦. الفخ: [[items=[]]]

~~~python
def add(item, items=[]):
    items.append(item)
    return items
print(add(1))
print(add(2))
~~~

~~~text الناتج
[1]
[1, 2]
~~~

النداء التاني كان المفروض يرجّع [[[2]]]. اللي حصل:

1. لما سطر [[def]] اتنفّذ، الـ [[[]]] اتعملت **مرة واحدة** واتحفظت في [[add.__defaults__]].
2. النداء الأول ضاف [[1]] عليها.
3. النداء التاني خد **نفس** الـ list (اللي فيها 1) وضاف [[2]].

بعد النداءين [[add.__defaults__]] بقت [[([1, 2],)]]. ولو كتبت [[print(add(1), add(2))]] في سطر واحد هتشوف [[[1, 2] [1, 2]]]: الاتنين نفس الـ object، واتطبعوا بعد ما الاتنين خلصوا.

### التصليح: [[None]]

~~~python
def add_safe(item, items=None):
    if items is None:
        items = []
    items.append(item)
    return items
print(add_safe(1), add_safe(2))
~~~

~~~text الناتج
[1] [2]
~~~

[[None]] immutable فمفيش حاجة تتشارك، والـ [[[]]] الجديدة بتتعمل **جوه** الدالة كل نداء. و [[is None]] مش [[not items]]، عشان لو حد بعتلك list فاضية قاصد، تشتغل عليها هي.

> **اتشغّل فعلًا:** [[def stamp(t=time.time())]] وناديناها مرتين بينهم [[time.sleep(0.01)]]: الاتنين رجّعوا **نفس** الوقت ([[True]]). أي default بيتحسب (وقت، أو رقم عشوائي، أو اتصال) بيتحسب مرة واحدة بس.

---

## ٧. اقرا رسالة الـ [[TypeError]]

جرّبنا ٣ نداءات غلط على [[greet]]:

| النداء | الرسالة | التصليح |
|---|---|---|
| [[greet()]] | [[missing 1 required positional argument: 'name']] | ابعت الاسم |
| [[greet("a", "b", "c")]] | [[takes from 1 to 2 positional arguments but 3 were given]] | شيل الزيادة أو ابعتها لباراميتر بالاسم |
| [[greet("a", grting="x")]] | [[got an unexpected keyword argument 'grting'. Did you mean 'greeting'?]] | صلّح الإملا زي ما الاقتراح بيقول |

كل رسالة بتقولك الدالة، والمشكلة، والاسم. والاقتراح [[Did you mean]] جه من Python 3.12 وأحدث.

## الخلاصة

| عايز | تكتب |
|---|---|
| دالة | [[def name(a, b=1) -> type:]] وتحتها الجسم |
| ترجّع | [[return value]]، ومن غيرها [[None]] |
| أكتر من قيمة | [[return a, b]] و [[x, y = f()]] |
| default لـ list أو dict | [[items=None]] وجوه الدالة [[if items is None: items = []]] |
| شرح يظهر في [[help]] | docstring في أول سطر |

- الـ defaults بتتحسب مرة واحدة وقت [[def]].
- رجّع القيمة، وسيب الطباعة للي بينادي.`,
          lines: [
            R`[[def]] بيعرّف دالة اسمها [[greet]]: [[name]] إجباري نوعه نص، و [[greeting]] اختياري قيمته [["أهلا"]] لو محدش بعته، و [[-> str]] بتقول إنها بترجّع نص.`,
            R`docstring: نص بين تلات علامات تنصيص في أول الجسم. Python بيحفظه في [[greet.__doc__]] وبيظهر في [[help(greet)]] وفي المحرر لما تقف على الاسم.`,
            R`[[return]] بترجّع النص للي نادى وتخرج من الدالة فورًا. لو كتبت [[print]] بدلها، اللي بينادي هياخد [[None]].`,
            R`نداءين: الأول من غير [[greeting]] فاستخدم الـ default، والتاني بعته **بالاسم** ([[greeting=...]]) فبقى واضح من غير ما تفتكر الترتيب. الناتج [[أهلا يا سارة صباح الخير يا عمر]].`,
            R`دالة مفيهاش [[return]] خالص، هنشوف بترجّع إيه.`,
            R`الجسم بيعمل متغير محلي ويخلص. [[x]] مش موجود برّه الدالة (درس «scope و LEGB»).`,
            R`بيطبع [[None]]: أي دالة بتخلص من غير [[return]] بترجّع [[None]] لوحدها.`,
            R`دالة بترجّع قيمتين، و [[tuple[int, int]]] نوع الرجوع.`,
            R`[[return a // b, a % b]]: الفاصلة بتعمل tuple [[(3, 2)]]، فالدالة رجّعت حاجتين في object واحد.`,
            R`[[q, r =]] بيفك الـ tuple: [[q]] بـ [[3]] و [[r]] بـ [[2]]. لو كتبت [[q = div(17, 5)]] هتاخد الـ tuple كلها.`,
            R`بيطبع [[3 2]]: الناتج الصحيح والباقي من القسمة، كل واحد في اسمه.`,
            R`الفخ: الـ default [[[]]] بيتعمل **مرة واحدة** لما سطر [[def]] ده يتنفّذ، ويتحفظ في [[add.__defaults__]]، وكل نداء من غير [[items]] بياخد نفس الـ list.`,
            R`[[append]] بتعدّل الـ list دي مكانها، يعني بتعدّل الـ default المحفوظ نفسه.`,
            R`بترجّع نفس الـ list (الـ default) بعد التعديل.`,
            R`أول نداء: الـ list كانت فاضية فبقت [[[1]]]. لحد هنا كل حاجة شكلها سليم.`,
            R`تاني نداء: المفروض [[[2]]]، بس طلع [[[1, 2]]] لأن الـ list المحفوظة لسه فيها الـ 1 من النداء اللي فات. ده الباج اللي بيظهر في الإنتاج بعد أيام.`,
            R`التصليح: الـ default [[None]] (immutable ومفيش حاجة تتشارك).`,
            R`[[is None]] بيفحص «محدش بعت list». مش [[if not items]]، عشان لو حد بعتلك list فاضية قاصد تتعدّل، متتبدّلش بواحدة تانية.`,
            R`[[[]]] جديدة بتتعمل **جوه** الدالة، فكل نداء ليه list بتاعته.`,
            R`[[append]] على الـ list بتاعة النداء ده بس.`,
            R`بترجّع الـ list الجديدة بتاعة النداء ده بعد ما اتضاف عليها.`,
            R`الناتج [[[1] [2]]]: كل نداء بدأ من list فاضية.`,
            R`نداء من غير الباراميتر الإجباري: [[TypeError: greet() missing 1 required positional argument: 'name']]. الرسالة بتقول اسم الدالة واسم الباراميتر الناقص.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**افتكر:** من غير ما تبص، اكتب دالة [[area(w, h=None)]] بترجّع مساحة المستطيل، ولو [[h]] مش مبعوت تبقى مربع، بـ docstring و type hints. وقول بترجّع إيه لو نسيت [[return]].`, done: R`[[area(3, 4) == 12]] و [[area(5) == 25]]، و [[help(area)]] بيطبع الـ docstring، وكتبت إنها من غير [[return]] كانت هترجّع [[None]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[def f(x, seen={}): seen[x] = seen.get(x, 0) + 1; return seen]] وبعدين [[f("a")]] و [[f("b")]] و [[print(f("a"))]]. إيه اللي هيتطبع؟`, done: R`توقعت [[{'a': 2, 'b': 1}]] قبل ما تشغّل، وشرحت إن الـ dict الـ default اتعمل مرة واحدة واتشارك بين التلات نداءات، وطبعت [[f.__defaults__]] وشفته فيه نفس الـ dict.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[def make_order(customer, items=[], created=time.time()): items.append("bag"); return {"c": customer, "items": items, "t": created}]]. ناديها ٣ مرات بينهم [[time.sleep(0.1)]] ولاقي الباجين وصلّحهم.`, done: R`قبل التصليح النداء التالت فيه ٣ [[bag]] والتلات أوقات زي بعض، وبعده كل طلب فيه [[bag]] واحدة ووقته مختلف، والتصليح [[items=None]] و [[created=None]] والحساب جوه الدالة.` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** من غير ما تقرا الدرس، خلّي Python يقولك: إيه الباراميترات بتاعة [[sorted]] ([[help(sorted)]])، وإيه الـ defaults بتاعة دالتك ([[f.__defaults__]])، وشكل النداء ([[inspect.signature(f)]]).`, done: R`كتبت إن [[sorted]] بتاخد [[iterable]] و [[key=None]] و [[reverse=False]] (وإن الاتنين دول بالاسم بس، شايف [[*]] في الـ signature)، وطبعت الـ defaults والـ signature لدالة من دوالك.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[price_after(price, discount=0, vat=0.14, coupon=None)]] بترجّع السعر النهائي مقرّب لرقمين: الخصم نسبة، والكوبون [[{"type": "fixed", "value": 50}]] أو [[{"type": "pct", "value": 10}]]، والسعر ميقلّش عن صفر. وارمي [[ValueError]] لو الخصم برّه 0 لـ 1.`, done: R`[[price_after(100) == 114.0]] و [[price_after(100, discount=0.5) == 57.0]] و [[price_after(30, coupon={"type": "fixed", "value": 50}) == 0]] و [[discount=1.5]] بيرمي، وكل النداءات في الاختبار بالاسم.` },
            { lvl: 'تحدي', t: R`**refactor:** خد سكربت من وحدة «التحكم في السير» كله في المستوى الأعلى (مفيش دوال)، وقسّمه لدوال كل واحدة ٥–١٥ سطر بترجّع قيمة ومفيهاش [[print]] غير دالة [[main()]]، وفي الآخر [[if __name__ == "__main__": main()]].`, done: R`الناتج زي ما هو بالظبط (قارنته بـ [[python old.py > a.txt]] و [[python new.py > b.txt]] و [[fc]] أو [[diff]])، وكل دالة ليها [[assert]] واحد على الأقل، و [[import]] للملف من ملف تاني مبيشغّلش [[main]].` },
          ],
          sol: R`[[help(greet)]] بتطبع [[greet(name, greeting='أهلا')]] وتحتها [[بترجّع جملة ترحيب.]]: شكل النداء والـ default والـ docstring.

[[add.__defaults__]] قبل أي نداء [[([],)]]، وبعد [[add(1)]] بقت [[([1],)]]، وبعد [[add(2)]] بقت [[([1, 2],)]]: الـ default نفسه بيتعدّل. و [[greet("a", grting="x")]] بترمي [[TypeError: greet() got an unexpected keyword argument 'grting'. Did you mean 'greeting'?]]، والاقتراح ده من Python 3.12 وأحدث، فاقرا الرسالة لآخرها قبل ما تدوّر برّه.`
        },
        {
          cmd: "*args و **kwargs",
          title: "باراميترات بالمكان وبالاسم، و *args و **kwargs",
          learn: R`تتحكم في شكل النداء: [[*]] للباراميترات بالاسم بس، و [[/]] بالمكان بس، و [[*args]] و [[**kwargs]] تلم الزيادة، و [[*]] و [[**]] وقت النداء تفك.`,
          out: R`دوال صعب تتنادى غلط، و wrappers بتعدّي أي باراميترات زي ما هي، ومش هتعمل [[**request_json]] من غير فحص.`,
          use: {
            prog: R`[[*args]] و [[**kwargs]] هما اللي بيخلّوا decorator واحد يلف أي دالة، وبيخلّوا [[print]] تاخد أي عدد قيم.`,
            work: R`[[def search(q, *, page=1, size=20)]] بيمنع حد يكتب [[search("x", 2, 50)]] ومحدش فاهم ٢ و ٥٠ دول إيه. ده نفس شكل الـ query parameters في FastAPI.`,
          },
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
| [[a, b]] قبل [[/]] | بالمكان بس، وأسماءهم مش جزء من الـ API |
| [[c]] بين [[/]] و [[*]] | بالمكان أو بالاسم |
| [[d]] بعد [[*]] | بالاسم بس، فالنداء بيتقري لوحده |
| [[**kw]] | أي زيادة بالاسم |

[[f(1, 2, 3, d=4, e=5)]] رجّعت [[(1, 2, 3, 4, {'e': 5})]]. و [[f(a=1, b=2, c=3, d=4)]] وقعت بـ [[missing 2 required positional arguments: 'a' and 'b']]: [[a]] و [[b]] بالمكان بس، فالاسمين دول راحوا [[kw]] واعتبرهم ناقصين.

## ٨. اتشغّل فعلًا: [[/]] و الـ signature

~~~python
def f(a, b, /, c, *, d):
    return a, b, c, d
f(1, 2, 3, d=4)
f(a=1, b=2, c=3, d=4)
~~~

~~~text الناتج (3.14.3)
TypeError: f() got some positional-only arguments passed as keyword arguments: 'a, b'
~~~

[[/]] معناها «اللي قبلي بالمكان بس». مفيدة لما اسم الباراميتر ملوش معنى للي بينادي (زي [[len(obj, /)]] في الـ built-ins)، وتقدر تغيّر اسمه بعدين من غير ما تكسر حد. و [[inspect.signature(f)]] بتطبع الشكل كامل: [[(a, b, /, c, *, d)]].

| الجزء | بيتبعت إزاي | ليه تستخدمه |
|---|---|---|
| قبل [[/]] | بالمكان بس | الاسم ملوش معنى للي بينادي، وتقدر تغيّره بعدين |
| بين [[/]] و [[*]] | بالمكان أو بالاسم | الافتراضي لأي باراميتر |
| بعد [[*]] أو [[*args]] | بالاسم بس | الخيارات اللي لازم تتقري في النداء ([[page=2]]) |
| [[**kwargs]] | أي اسم زيادة، في dict | wrappers بتعدّي الباراميترات زي ما هي |

---

## الخلاصة

- [[*]] و [[**]] **في التعريف** بيلموا، و **في النداء** بيفكوا.
- [[*args]] tuple، و [[**kwargs]] dict.
- [[*]] لوحدها في التعريف: اللي بعدها بالاسم بس. استخدمها مع الـ flags والباراميترات الاختيارية الكتير.
- [[fn(*args, **kwargs)]] هو الأساس اللي الـ decorators (الدرس الجاي) مبنية عليه.`,
          lines: [
            R`[[*]] لوحدها في وسط الباراميترات معناها «اللي بعدي بالاسم بس» (keyword-only)، فـ [[page]] و [[size]] لازم يتكتبوا بالاسم، وليهم defaults فاختياريين.`,
            R`بترجّع dict فيه الـ query والـ [[offset]] ([[(page - 1) * size]]: الصفحة ٢ تبدأ من 20) والـ [[limit]]، زي اللي بيتبعت لقاعدة بيانات.`,
            R`نداء سليم: [[page=2]] بالاسم فواضح هو إيه. والنتيجة [[{'q': 'tea', 'offset': 20, 'limit': 20}]].`,
            R`نداء ممنوع: [[2]] بالمكان مكان [[page]]، فبيرمي [[TypeError: paginate() takes 1 positional argument but 2 were given]]. وده المقصود: الغلطة بتبان بدري بدل رقم ملوش معنى.`,
            R`[[*args]] بيلم أي arguments زيادة **بالمكان** في tuple، و [[**kwargs]] بيلم أي زيادة **بالاسم** في dict. الأسماء [[args]] و [[kwargs]] عادة مش إجبارية، المهم النجمة.`,
            R`بيطبع الرسالة والـ tuple والـ dict عشان نشوف كل حاجة راحت فين.`,
            R`[[1]] و [[2]] بالمكان راحوا [[args]] كـ [[(1, 2)]]، و [[user="sara"]] بالاسم راحت [[kwargs]] كـ [[{'user': 'sara'}]].`,
            R`دالة عادية: [[name]] و [[email]] إجباريين، و [[role]] اختياري قيمته [["user"]].`,
            R`بترجّع dict باليوزر، و [[role]] فيه الـ default لو محدش بعته.`,
            R`dict جاي من حتة تانية (فورم أو JSON) ومفاتيحه نفس أسماء الباراميترات بالظبط.`,
            R`[[**data]] وقت **النداء** بيفك الـ dict لباراميترات بالاسم: زي [[create_user(name="Sara", email="s@x.com")]]. ولو في الـ dict مفتاح مش باراميتر هيرمي [[TypeError: ... got an unexpected keyword argument]].`,
            R`list أرقام هنفكها في نداء.`,
            R`[[*nums]] وقت النداء بيفك الـ list لباراميترات بالمكان، فـ [[print(*nums)]] هي [[print(3, 1, 2)]] وبتطبع [[3 1 2]] بمسافات بدل [[[3, 1, 2]]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**افتكر:** اكتب signature لدالة [[send(to, subject, body, *, cc=None, retries=3)]] واكتب ٣ نداءات: واحد صح، وواحد بيرمي عشان [[retries]] بالمكان، وواحد بيرمي عشان ناقص [[body]].`, done: R`الصح اشتغل، والتاني طلّع [[takes 3 positional arguments but 4 were given]]، والتالت [[missing 1 required positional argument: 'body']]، وكتبت كل رسالة بنصها.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[def f(a, *args, b=0, **kw): return a, args, b, kw]] و [[print(f(1, 2, 3, b=4, c=5))]] و [[print(f(*[9, 8], **{"b": 1}))]].`, done: R`توقعت [[(1, (2, 3), 4, {'c': 5})]] و [[(9, (8,), 1, {})]] قبل ما تشغّل، ولاحظت إن [[args]] tuple بعنصر واحد شكلها [[(8,)]].` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[user = create_user(**request_json)]] و [[request_json = {"name": "Sara", "email": "s@x.com", "role": "admin", "is_staff": True}]]. ليه ده بيقع، وليه خطير لو مقعش؟ صلّحه بحيث [[role]] متتاخدش من الطلب أبدًا.`, done: R`الخطأ [[got an unexpected keyword argument 'is_staff']]، وكتبت إن الخطر إن اليوزر يبعت [[role="admin"]] لنفسه، والتصليح بياخد المفاتيح المسموحة بس ([[{k: request_json[k] for k in ("name", "email") if k in request_json}]]) فـ [[role]] بقى [["user"]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[timed(fn, *args, **kwargs)]] بتنادي [[fn]] بنفس الباراميترات وترجّع ناتجها، وتطبع اسمها ووقتها بـ [[time.perf_counter()]]. جرّبها على [[sorted]] بـ [[key]] و [[reverse=True]].`, done: R`[[timed(sorted, [3, 1, 2], reverse=True)]] بترجّع [[[3, 2, 1]]] وتطبع [[sorted took 0.000...s]]، و [[timed(max, [4, 9], key=abs)]] بترجّع [[9]]، والدالة مفيهاش أي اسم باراميتر خاص بـ [[sorted]].` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[merge(*dicts, **overrides)]] بتدمج أي عدد dicts من الشمال لليمين، وبعدين [[overrides]] فوقهم، وترجّع dict جديد من غير ما تعدّل أي واحد من اللي اتبعتوا.`, done: R`[[merge({"a": 1}, {"a": 2, "b": 3}, b=9)]] بترجّع [[{'a': 2, 'b': 9}]]، و [[merge()]] بترجّع [[{}]]، والـ dicts الأصلية زي ما هي ([[assert]] بعد النداء).` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من [[help(print)]] و [[help(sorted)]] و [[help(max)]] و [[help(dict.get)]]، اعمل جدول: أنهي باراميترات بالمكان بس ([[/]])، وأنهي بالاسم بس ([[*]])، وجرّب تكسر واحدة من كل نوع.`, done: R`الجدول فيه الأربع دوال: [[inspect.signature]] قالت إن [[sorted]] شكلها [[(iterable, /, *, key=None, reverse=False)]] و [[dict.get]] شكلها [[(self, key, default=None, /)]]، و [[max]] مالهاش signature ([[no signature found]]) فقريت [[help(max)]]، وجرّبت [[sorted([1], None, True)]] وشفت [[sorted expected 1 argument, got 3]]، و [[{}.get(key="a")]] وشفت [[dict.get() takes no keyword arguments]].` },
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
          cmd: "lambda والدوال كقيم",
          title: "تبعت دالة لدالة: lambda و key و map و recursion",
          learn: R`تتعامل مع الدالة كقيمة: تحطها في متغير و dict، وتبعتها لـ [[sorted]] و [[max]] و [[map]]، وتكتب [[lambda]]، وتحل مسائل الشجر بالـ recursion وتعرف حدها.`,
          out: R`ترتيب بأي معيار، و dispatch table بدل [[elif]] طويلة، ودالة بتمشي على JSON متداخل لأي عمق.`,
          use: {
            prog: R`[[key=]] في [[sorted]] و [[max]] و [[min]]، والـ callbacks، والـ decorators (الدرس الجاي) كلهم مبنيين على إن الدالة قيمة زي أي قيمة.`,
            cs: R`الـ recursion هي الطريقة الطبيعية تمشي بيها على أي شجرة (فولدرات، و JSON، و HTML). وكل نداء بياخد frame في الـ stack، وده سبب الحد.`,
          },
          desc: R`في Python الدالة **object** زي الرقم والنص: تحطها في متغير ([[say = shout]])، وتخزنها في dict، وتبعتها لدالة تانية، وترجّعها من دالة. والدالة اللي بتاخد دالة اسمها higher-order function.

[[lambda args: expr]] دالة صغيرة من غير اسم، جسمها expression واحد بيترجّع لوحده. أكتر استخدام ليها: [[key=]] في [[sorted]] و [[max]] و [[min]]: [[sorted(users, key=lambda u: u["age"])]]. ولو فيه دالة جاهزة بتعمل نفس الحاجة، ابعتها هي: [[key=str.lower]] و [[key=len]].

[[map(fn, items)]] بتنادي [[fn]] على كل عنصر، و [[filter(fn, items)]] بتسيب اللي [[fn]] رجّعت له True. الاتنين بيرجّعوا iterator، والـ comprehension غالبًا أوضح منهم.

والـ **recursion**: دالة بتنادي نفسها على جزء أصغر من المشكلة، ولازم يبقى ليها **حالة وقوف** (base case). Python بيوقف بعد حوالي ١٠٠٠ مستوى بـ [[RecursionError]].`,
          example: R`def shout(s): return s.upper() + "!"
say = shout
print(say("hi"), say is shout)
ops = {"+": lambda a, b: a + b, "*": lambda a, b: a * b}
print(ops["+"](2, 3), ops["*"](2, 3))
words = ["banana", "apple", "Cherry", "fig"]
print(sorted(words, key=str.lower), sorted(words, key=len))
print(list(map(str.upper, words)), [w for w in words if "a" in w])
def apply_twice(fn, x):
    return fn(fn(x))
print(apply_twice(lambda n: n * 3, 2))
def total(node):
    return node["size"] + sum(total(c) for c in node.get("children", []))
tree = {"size": 1, "children": [{"size": 2}, {"size": 3, "children": [{"size": 4}]}]}
print(total(tree))`,
          try: R`اكتب [[fact(n)]] بالـ recursion وجرّبها على [[5]] وعلى [[1200]] واقرا الخطأ. وبعدين اكتبها بـ loop وجرّب [[1200]] تاني. وفي الآخر رتّب [[["b10", "b9", "a2"]]] بحيث [[b9]] تيجي قبل [[b10]].`,
          flag: "script",
          deep: {
            why: R`أول ما تفهم إن الدالة قيمة، كتير من الكود بيبقى أقصر: بدل ٥ نسخ من الترتيب بمعايير مختلفة، دالة ترتيب واحدة بتاخد [[key]]. وبدل [[if/elif]] على ٢٠ أمر، dict من الأمر للدالة. والـ recursion هي الحل الوحيد المريح لأي داتا متداخلة عمقها مش معروف، زي ردود API فيها children أو تعليقات بردود.`,
            how: R`[[def]] بيعمل function object ويربطه باسم، و [[lambda]] بيعمل نفس الـ object من غير اسم (اسمه [[<lambda>]] في الـ traceback، وده عيب لو استخدمتها في حتة كبيرة). الـ lambda جسمها expression واحد بس: مفيش [[return]] ولا [[if]] جملة ولا assignment (بس [[a if c else b]] مسموح).

[[key=fn]] بيتنادى **مرة لكل عنصر** وبيرتّب على الناتج. ولو الدالة جاهزة مكتوبة بـ C ([[str.lower]] و [[len]] و [[operator.itemgetter]])، أسرع من lambda بتنادي نفس الحاجة: قسنا ترتيب ١٠٠٠ كلمة [[key=str.lower]] = [[43.2 usec]]، و [[key=lambda w: w.lower()]] = [[83.5 usec]].

الـ recursion: كل نداء بيتحط فوق اللي ناداه في الـ call stack، ولما يرجع بيتشال. [[sys.getrecursionlimit()]] = [[1000]] افتراضيًا، فـ [[fact(1200)]] بترمي [[RecursionError: maximum recursion depth exceeded]]. ممكن تكبّره بـ [[sys.setrecursionlimit]] بس ده مسكّن، والحل الحقيقي loop أو stack بإيدك. و Python مفيهوش tail-call optimization، فالـ recursion «الذيلية» بتاخد stack زي أي recursion.`,
            when: R`[[lambda]] لـ [[key=]] أو callback صغير في سطر. لو محتاج اسم أو أكتر من expression، اكتب [[def]]. comprehension بدل [[map]] و [[filter]] مع lambda. dict من الدوال لما عندك أوامر كتير شكلها واحد. recursion للشجر والداتا المتداخلة اللي عمقها صغير (فولدرات، JSON، قواعد)، و loop لأي حاجة ممكن عمقها يوصل آلاف (list طويلة، أو أرقام كبيرة).`,
            mistakes: R`[[sorted(words, key=str.lower())]] بالأقواس: بتنادي الدالة بدل ما تبعتها ([[TypeError: unbound method str.lower() needs an argument]]). و [[f = lambda x: x * 2]] بدل [[def f(x):]] (الـ linters بتعلّم عليها، و الاسم في الـ traceback [[<lambda>]]). و recursion من غير base case أو بـ base case مبيتوصلّوش فتوصل للـ [[RecursionError]]. و lambdas جوه loop بتفتكر آخر قيمة (late binding، درس «comprehensions» و «scope و LEGB»).`
          },
          teach: R`## المثال بيعمل إيه؟

بيعامل الدوال كقيم بكل الأشكال: اسم تاني لدالة، و dict من الدوال، ودوال بتتبعت لـ [[sorted]] و [[map]]، ودالة بتاخد دالة، وفي الآخر دالة بتنادي نفسها عشان تجمع شجرة. اتشغّل كملف على ويندوز بـ Python 3.14.3:

~~~text الناتج
HI! True
5 6
['apple', 'banana', 'Cherry', 'fig'] ['fig', 'apple', 'banana', 'Cherry']
['BANANA', 'APPLE', 'CHERRY', 'FIG'] ['banana', 'apple']
18
10
~~~

---

## ١. الدالة قيمة: [[say = shout]]

~~~python
def shout(s): return s.upper() + "!"
say = shout
print(say("hi"), say is shout)
~~~

- [[def shout(s): return ...]] في سطر واحد مسموح لما الجسم سطر واحد.
- [[say = shout]] **من غير أقواس**: مش بننادي الدالة، بنربط اسم تاني بنفس الـ function object (زي [[b = a]] في درس «names و objects»). و [[say is shout]] = [[True]].
- [[say("hi")]] بالأقواس هي اللي بتنادي، فطلع [[HI!]].

الفرق كله في الأقواس: [[shout]] = الدالة نفسها، و [[shout("x")]] = ناتجها.

---

## ٢. dict من الدوال (dispatch table)

~~~python
ops = {"+": lambda a, b: a + b, "*": lambda a, b: a * b}
print(ops["+"](2, 3), ops["*"](2, 3))
~~~

### [[lambda a, b: a + b]]

| الحتة | معناها |
|---|---|
| [[lambda]] | «دالة من غير اسم» |
| [[a, b]] | الباراميترات، من غير أقواس |
| [[:]] | الجسم جاي بعدها على نفس السطر |
| [[a + b]] | expression واحد، وناتجه بيترجّع لوحده من غير [[return]] |

يعني نفس [[def add(a, b): return a + b]] بالظبط. و [[ops["+"]]] بيجيب الدالة من الـ dict، و [[(2, 3)]] بعدها بتناديها، فطلع [[5 6]]. ولو عايز تضيف عملية، سطر في الـ dict من غير ما تلمس أي [[if]].

---

## ٣. [[key=]]: دالة بتقول «رتّب على إيه»

~~~python
words = ["banana", "apple", "Cherry", "fig"]
print(sorted(words, key=str.lower), sorted(words, key=len))
~~~

| النداء | الناتج | ليه |
|---|---|---|
| [[sorted(words)]] | [[['Cherry', 'apple', 'banana', 'fig']]] | الحروف الكبيرة قبل الصغيرة في ترتيب Unicode |
| [[key=str.lower]] | [[['apple', 'banana', 'Cherry', 'fig']]] | بيقارن [[cherry]] بدل [[Cherry]] |
| [[key=len]] | [[['fig', 'apple', 'banana', 'Cherry']]] | بالطول، و [[banana]] قبل [[Cherry]] (الاتنين ٦) لأن الترتيب stable |

[[key=str.lower]] من غير أقواس: بنبعت الـ method نفسها، و [[sorted]] بتناديها على كل عنصر. ولو كتبت [[str.lower()]] بالأقواس هيطلع [[TypeError]].

---

## ٤. [[map]] ولا comprehension؟

~~~python
print(list(map(str.upper, words)), [w for w in words if "a" in w])
~~~

- [[map(str.upper, words)]] بتنادي [[str.upper]] على كل كلمة، وبترجّع iterator فلفيناه بـ [[list()]].
- [[[w for w in words if "a" in w]]] نفس شغل [[filter]] بس أوضح. و [[filter(lambda w: "a" in w, words)]] بتطلّع نفس الناتج [[['banana', 'apple']]].

القاعدة: [[map]] مع دالة جاهزة كويسة، ومع [[lambda]] اكتب comprehension.

---

## ٥. دالة بتاخد دالة: [[apply_twice]]

~~~python
def apply_twice(fn, x):
    return fn(fn(x))
print(apply_twice(lambda n: n * 3, 2))
~~~

[[fn]] باراميتر عادي بس قيمته دالة. [[fn(x)]] = ٢ × ٣ = ٦، وبعدين [[fn(6)]] = ١٨. ده نفس الشكل اللي الـ decorators مبنية عليه (درس «decorators»).

---

## ٦. الـ recursion: [[total(node)]]

~~~python
def total(node):
    return node["size"] + sum(total(c) for c in node.get("children", []))
tree = {"size": 1, "children": [{"size": 2}, {"size": 3, "children": [{"size": 4}]}]}
print(total(tree))
~~~

الشجرة دي زي فولدر فيه ملفات وفولدرات جواها:

~~~text الشجرة
1
├── 2
└── 3
    └── 4
~~~

[[total]] بتقول: «حجمي = حجمي أنا + مجموع [[total]] لكل ابن». و [[node.get("children", [])]] لو مفيش أبناء بترجّع list فاضية، فـ [[sum]] بترجّع [[0]]، **ودي حالة الوقوف**: الورقة اللي ملهاش أبناء مبتناديش حد.

| النداء | بيرجّع | ليه |
|---|---|---|
| [[total({"size": 4})]] | [[4]] | ورقة: مالهاش أبناء، فدي حالة الوقوف |
| [[total({"size": 3, ...})]] | [[3 + 4 = 7]] | حجمها وحجم ابنها الوحيد |
| [[total({"size": 2})]] | [[2]] | ورقة |
| [[total(tree)]] | [[1 + 2 + 7 = 10]] | الجذر بيجمع اللي رجع من الاتنين |

---

## ٧. اتشغّل فعلًا: حد الـ recursion

~~~python
import sys
def fact(n): return 1 if n <= 1 else n * fact(n - 1)
print(fact(5), sys.getrecursionlimit())
fact(1200)
~~~

~~~text الناتج
120 1000
RecursionError: maximum recursion depth exceeded
~~~

كل نداء بيستنى اللي ناداه يرجع، فبيتكوّموا فوق بعض في الـ stack. Python بيوقف عند حوالي ١٠٠٠ عشان البرنامج ميقعش crash. ونفس الحسبة بـ loop مالهاش حد:

~~~python
def fact_loop(n):
    result = 1
    for i in range(2, n + 1):
        result *= i
    return result
~~~

و [[fib(n)]] بالـ recursion المباشر بتعيد نفس الحسبة ملايين المرات؛ الحل [[@functools.cache]] (درس «decorators») أو loop: [[fibi(90)]] بالـ loop طلعت [[2880067194370816120]] فورًا.

---

## اللي في «جرّب»

- [[fact(5)]] = [[120]]، و [[fact(1200)]] = [[RecursionError]]، والـ loop بتحسبها عادي (رقم من ٣١٧٦ خانة).
- [[sorted(["b10", "b9", "a2"])]] بترجّع [[['a2', 'b10', 'b9']]] لأن المقارنة حرف حرف ([["1" < "9"]]). الحل [[key=lambda s: (s[0], int(s[1:]))]] فيطلع [[['a2', 'b9', 'b10']]].

## الخلاصة

| عايز | تكتب |
|---|---|
| تبعت دالة | اسمها من غير أقواس: [[key=len]] |
| دالة صغيرة في سطر | [[lambda x: expr]] |
| ترتيب بمعيار | [[sorted(xs, key=...)]] و [[max(xs, key=...)]] |
| أوامر كتير | dict من الاسم للدالة |
| شجرة أو داتا متداخلة | recursion بحالة وقوف واضحة |
| عمق ممكن يعدّي ١٠٠٠ | loop مش recursion |`,
          lines: [
            R`دالة عادية في سطر واحد: بترجّع النص بحروف كبيرة وبعده [[!]]. السطر الواحد مسموح لما الجسم جملة واحدة.`,
            R`[[shout]] **من غير أقواس** يعني الدالة نفسها مش ناتجها، فـ [[say]] بقى اسم تاني لنفس الـ function object، زي [[b = a]] مع الـ lists.`,
            R`[[say("hi")]] بتنادي نفس الدالة فطلع [[HI!]]، و [[say is shout]] = [[True]] لأنهم object واحد.`,
            R`dict قيمه دوال: كل علامة ليها [[lambda]] (دالة من غير اسم جسمها expression واحد بيترجّع لوحده). ده dispatch table بدل [[if op == "+": ... elif ...]].`,
            R`[[ops["+"]]] بيجيب الدالة، والأقواس [[(2, 3)]] اللي بعدها بتناديها، فطلع [[5 6]]. لو العلامة مش في الـ dict هيطلع [[KeyError]]، فاستخدم [[ops.get(op)]] وافحص.`,
            R`list كلمات فيها كلمة بحرف كبير ([["Cherry"]]) عشان نشوف تأثير الـ [[key]] على الترتيب.`,
            R`[[key=str.lower]] بيرتّب على النسخة الصغيرة من كل كلمة فـ [[Cherry]] جت في مكانها الأبجدي، و [[key=len]] بيرتّب بالطول. الدالتين اتبعتوا **من غير أقواس**.`,
            R`[[map(str.upper, words)]] بتنادي [[upper]] على كل كلمة وترجّع iterator فلفّيناه بـ [[list()]]، والـ comprehension جنبه فلتر الكلمات اللي فيها [["a"]]: [[['banana', 'apple']]].`,
            R`دالة higher-order: [[fn]] باراميتر قيمته دالة، و [[x]] قيمة عادية.`,
            R`[[fn(fn(x))]]: بتنادي الدالة على [[x]] وبعدين على الناتج. الأقواس الداخلية بتتحسب الأول.`,
            R`[[lambda n: n * 3]] بتضرب في ٣، فمرتين: ٢ ← ٦ ← ١٨. والـ lambda هنا مناسبة لأنها مستخدمة مرة واحدة ومحتاجة سطر.`,
            R`دالة recursive: بتحسب الحجم الكلي لعقدة وكل اللي تحتها، زي حجم فولدر.`,
            R`حجمي + مجموع [[total]] لكل ابن. و [[get("children", [])]] لو مفيش أبناء بترجّع [[[]]] فـ [[sum]] = [[0]]، ودي حالة الوقوف اللي من غيرها الدالة مش هتخلص.`,
            R`شجرة من ٤ عقد على ٣ مستويات كـ dict متداخل، نفس شكل JSON فيه children.`,
            R`بيطبع [[10]]: ١ + ٢ + (٣ + ٤). كل مستوى بيرجّع مجموعه للي فوقه.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**افتكر:** اكتب [[key]] لكل ترتيب على list يوزرز dicts: بالسن، وبالاسم من غير حالة حروف، وبالسن تنازلي والاسم تصاعدي، وبطول الإيميل. ومين يطلع أكبر واحد سن بـ [[max]].`, done: R`كتبت [[lambda u: u["age"]]] و [[lambda u: u["name"].lower()]] و [[lambda u: (-u["age"], u["name"])]] و [[lambda u: len(u["email"])]] و [[max(users, key=lambda u: u["age"])]]، وجرّبتهم على ٤ يوزرز.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[f = len]] ثم [[print(f("abc"), f is len)]]، و [[print(sorted(["bb", "a", "ccc"], key=len, reverse=True))]]، و [[print(sorted(["b", "a"], key=str.upper()))]].`, done: R`توقعت [[3 True]] و [[['ccc', 'bb', 'a']]] وإن التالت بيقع، وشفت الخطأ [[TypeError: unbound method str.upper() needs an argument]] وصلّحته بشيل الأقواس.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[def depth(d): return 1 + max(depth(v) for v in d.values())]] بتحسب عمق dict متداخل، وبتقع على [[{"a": {"b": 1}}]]. لاقي حالة الوقوف الناقصة وصلّحها.`, done: R`عرفت إنها بتنادي [[depth(1)]] على رقم فـ [[1.values()]] بتقع، والتصليح: لو مش dict رجّع [[0]]، ولو dict فاضي رجّع [[1]] (بـ [[max(..., default=0)]])، و [[depth({"a": {"b": 1}}) == 2]] و [[depth({}) == 1]] و [[depth(5) == 0]].` },
            { lvl: 'تطبيق', t: R`**ابني:** حاسبة بـ dispatch table: [[OPS = {"+": ..., "-": ..., "*": ..., "/": ..., "**": ...}]] ودالة [[calc(a, op, b)]] بتاخد الدالة من الـ dict، وبترجّع رسالة لو العلامة مش موجودة أو القسمة على صفر.`, done: R`[[calc(2, "**", 10) == 1024]] و [[calc(7, "/", 2) == 3.5]] و [[calc(1, "%", 2)]] بترجّع رسالة «عملية مش معروفة» و [[calc(1, "/", 0)]] رسالة مش [[ZeroDivisionError]]، و [[calc]] نفسها مفيهاش ولا [[if op ==]].` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** رد API لتعليقات بردود متداخلة: كل تعليق [[{"id", "text", "replies": [...]}]]. اكتب بالـ recursion: عدد كل التعليقات، وأعمق رد، و list مسطّحة فيها [[(depth, text)]] بالترتيب عشان تطبعها بمسافات حسب العمق.`, done: R`على داتا فيها ٨ تعليقات على ٤ مستويات: العدد [[8]]، والعمق [[4]]، والطباعة كل رد مزاح مسافتين أكتر من اللي فوقه، والتعليق اللي [[replies]] بتاعه فاضي أو مش موجود مبيوقعش.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** رتّب ١٠٠٠ كلمة بـ [[key=str.lower]] وبـ [[key=lambda w: w.lower()]]، وبعدين احسب [[fib(30)]] بالـ recursion المباشر وبـ loop، وقيس كل واحدة بـ [[timeit]] أو [[perf_counter]].`, done: R`عندك ٤ أرقام: الـ method الجاهزة أسرع من الـ lambda (عندنا [[43.2]] مقابل [[83.5]] usec)، و [[fib(30)]] الـ recursive بتاخد مئات الملي ثواني والـ loop أقل من ميكروثواني، وكتبت ليه في سطرين.` },
          ],
          sol: R`[[fact(5)]] بترجّع [[120]]، و [[fact(1200)]] بترمي [[RecursionError: maximum recursion depth exceeded]] لأن الحد الافتراضي [[1000]] نداء ([[sys.getrecursionlimit()]]). نسخة الـ loop بتحسب [[fact(1200)]] عادي (رقم من ٣١٧٦ خانة) لأن مفيش نداءات بتتكوّم.

[[sorted(["b10", "b9", "a2"])]] بترجّع [[['a2', 'b10', 'b9']]]: المقارنة حرف حرف، و [["1"]] أصغر من [["9"]]. الحل [[sorted(xs, key=lambda s: (s[0], int(s[1:])))]] بيرتّب على الحرف وبعدين الرقم كـ [[int]]، فيطلع [[['a2', 'b9', 'b10']]] (اسمها natural sort).`
        },
        {
          cmd: "decorators",
          title: "إيه اللي بيعمله @ فوق الدالة؟",
          learn: R`تكتب decorator بيلف أي دالة بـ [[*args]] و [[**kwargs]] و [[functools.wraps]]، وdecorator بباراميتر، وتستخدم [[@cache]] وتعرف ترتيب الـ decorators المتراكبة.`,
          out: R`[[@timed]] و [[@retry(3)]] و [[@cache]] جاهزين في أي مشروع، وتفهم [[@app.get]] في FastAPI بتعمل إيه.`,
          use: {
            prog: R`الـ decorator بيزوّد سلوك (وقت، ولوج، وكاش، وصلاحيات) على أي دالة من غير ما تلمس جسمها.`,
            work: R`[[@app.get("/items")]] في FastAPI و [[@pytest.fixture]] و [[@functools.cache]]: كلهم decorators، وفهمها بيخلّيك تقرا أي framework.`,
          },
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

## ٧. اتشغّل فعلًا: ترتيب الـ decorators المتراكبة

~~~python
import functools
def tag(name):
    def deco(fn):
        @functools.wraps(fn)
        def wrapper(*a, **k):
            return f"<{name}>{fn(*a, **k)}</{name}>"
        return wrapper
    return deco
@tag("b")
@tag("i")
def hello():
    return "hi"
print(hello(), hello.__name__)
~~~

~~~text الناتج
<b><i>hi</i></b> hello
~~~

الـ decorators بتتطبّق **من تحت لفوق**: [[hello = tag("b")(tag("i")(hello))]]، فـ [[i]] لفّت الأول وبقت جوه، و [[b]] برّه. ووقت النداء بيتنفّذوا من برّه لجوه. ولما شيلنا [[wraps]] من decorator تاني، [[ping.__name__]] طلعت [[wrapper]].

---

## ٨. اتشغّل فعلًا: الـ cache وفّر إيه؟

~~~python
calls = 0
@functools.lru_cache(maxsize=None)
def fib(n):
    global calls
    calls += 1
    return n if n < 2 else fib(n - 1) + fib(n - 2)
print(fib(30), calls, fib.cache_info())
~~~

~~~text الناتج
832040 31 CacheInfo(hits=28, misses=31, maxsize=None, currsize=31)
~~~

٣١ حسبة حقيقية (من 0 لـ 30) و ٢٨ مرة رجّع من الكاش. و [[cache_info()]] بتقولك ده لوحدها، و [[fib.cache_clear()]] بتفضّيه. و [[lru_cache(maxsize=128)]] بيحتفظ بآخر ١٢٨ قيمة بس عشان الذاكرة متكبرش للأبد. وخد بالك: الكاش بيستخدم الباراميترات كمفتاح، فلازم تكون hashable ([[fib([1])]] بترمي [[TypeError: unhashable type: 'list']]).

---

## الخلاصة

- [[@deco]] فوق [[def f]] = [[f = deco(f)]]. مفيش سحر.
- الـ wrapper بياخد [[*args, **kwargs]] ويعدّيهم، ولازم [[return]] لناتج الأصلية.
- [[@functools.wraps(fn)]] دايمًا، عشان الاسم والـ signature.
- decorator بباراميتر = دالة بترجّع decorator (٣ طبقات).
- [[@functools.cache]] بيحفظ النتايج في الذاكرة، للدوال اللي نفس الباراميتر بيرجّع نفس الناتج.`,
          lines: [
            R`[[functools]] موديول أدوات للدوال: منه [[wraps]] اللي بتحافظ على اسم الدالة، و [[cache]] اللي بتحفظ النتايج.`,
            R`[[time]] عشان [[perf_counter()]]: ساعة دقيقة بتقيس فرق الوقت (مش الساعة الحقيقية).`,
            R`الـ decorator دالة عادية بتاخد دالة [[fn]] وهترجّع دالة جديدة مكانها.`,
            R`[[@functools.wraps(fn)]] بينسخ [[__name__]] و [[__doc__]] والـ signature من [[fn]] للـ wrapper. من غيره [[slow_sum.__name__]] هتبقى [[wrapper]] واللوج والـ traceback يتلخبطوا، و FastAPI ميعرفش باراميترات الـ route.`,
            R`الـ wrapper هي اللي هتتنادى بدل الأصلية، و [[*args, **kwargs]] بيخلّوها تقبل **أي** باراميترات وتعدّيها زي ما هي (درس «*args و **kwargs»).`,
            R`قبل نداء الأصلية: سجّل الوقت. [[start]] متغير محلي جديد في كل نداء، فمفيش تداخل لو اتنادت مرتين.`,
            R`[[try]] عشان الـ [[finally]] تشتغل حتى لو الدالة رمت exception، فالوقت يتطبع في الحالتين.`,
            R`نادي الأصلية بنفس الباراميترات و**رجّع** ناتجها. لو نسيت [[return]] كل الدوال الملفوفة هترجّع [[None]].`,
            R`[[finally]] بتتنفّذ بعد الـ [[return]] وقبل ما القيمة توصل للي نادى، وبعد أي exception كمان.`,
            R`بيطبع اسم الدالة (صح بفضل [[wraps]]) والوقت بـ ٣ أرقام عشرية، زي [[slow_sum took 0.123s]].`,
            R`الـ decorator بيرجّع الـ wrapper نفسها (من غير أقواس: الدالة مش ناتجها)، وده اللي هيتحط مكان الأصلية.`,
            R`[[@timed]] فوق [[def]] هي بالظبط [[slow_sum = timed(slow_sum)]] بعد التعريف: الاسم بقى بيشاور على الـ wrapper.`,
            R`دالة عادية جدًا متعرفش أي حاجة عن التوقيت. ده الهدف: السلوك الزيادة برّه الدالة.`,
            R`الجسم بيجمع الأرقام من 0 لحد قبل [[n]].`,
            R`النداء بيعدّي على الـ wrapper الأول، فبيطبع الوقت ويرجّع المجموع. و [[10_000_000]] الـ [[_]] للقراية بس.`,
            R`[[@functools.cache]] decorator جاهز بيحفظ ناتج كل [[n]] في dict، فأي نداء بنفس القيمة بيرجع على طول من غير حسبة (memoization).`,
            R`دالة recursive لـ Fibonacci (درس «lambda والدوال كقيم»)، وبتتنادى بنفسها مرتين في كل خطوة.`,
            R`من غير cache [[fib(30)]] بتعمل أكتر من مليون نداء بتكرر نفس الحسبات، ومع الـ cache بتعمل ٣١ نداء بس (اتقاس تحت)، لأن كل قيمة بتتحسب مرة.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**افتكر:** اكتب من دماغك decorator [[log_calls]] بيطبع اسم الدالة والـ args قبل النداء، بالـ ٣ حاجات اللي لازم تكون موجودة: [[wraps]] و [[*args, **kwargs]] و [[return]].`, done: R`الـ decorator بيطبع [[calling add (2, 3) {}]] ويرجّع [[5]]، و [[add.__name__]] بترجّع [[add]]، ولو شلت أي واحدة من التلاتة عرفت إيه اللي هيبوظ.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[@tag("b")]] فوق [[@tag("i")]] فوق [[def hello(): return "hi"]]. إيه ناتج [[hello()]]؟ وبعدين اعكس الترتيب.`, done: R`توقعت [[<b><i>hi</i></b>]] وبعد العكس [[<i><b>hi</b></i>]]، وكتبت إن التطبيق من تحت لفوق والتنفيذ من برّه لجوه.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** decorator فيه [[def wrapper(*args, **kwargs): print("start"); fn(*args, **kwargs)]] ومن غير [[wraps]]. الدوال الملفوفة كلها بترجّع [[None]] واسمها [[wrapper]]. صلّحه.`, done: R`ضفت [[return]] قبل النداء و [[@functools.wraps(fn)]]، والدالة الملفوفة بترجّع ناتجها الحقيقي و [[__name__]] و [[__doc__]] بتوعها رجعوا.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[@retry(times=3, delay=0.1)]] بيعيد نداء الدالة لو رمت exception، ويستنى [[delay]] بين المحاولات، ولو كلهم فشلوا يرمي آخر exception. جرّبه على دالة بتفشل أول مرتين وتنجح التالتة (بعدّاد).`, done: R`الدالة اللي بتفشل مرتين رجّعت ناتجها في المحاولة التالتة والوقت الكلي حوالي ٠.٢ ثانية، والدالة اللي بتفشل دايمًا رمت نفس الـ exception الأصلي بعد ٣ محاولات بالظبط (العدّاد = ٣).` },
            { lvl: 'تطبيق', t: R`**محاكاة:** [[@rate_limit(max_calls=3, per=1.0)]] بيسمح بـ ٣ نداءات في الثانية، والرابع يرمي [[RuntimeError("rate limited")]]. خزّن أوقات النداءات في list جوه الـ closure.`, done: R`٣ نداءات ورا بعض نجحوا والرابع رمى، وبعد [[time.sleep(1.1)]] نداء جديد نجح، وكل دالة ملفوفة ليها عدّادها لوحدها (دالتين مختلفتين مبيأثروش على بعض).` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** [[fib(32)]] من غير cache، ومع [[@cache]]، ونسخة loop. قيس الوقت وعدد النداءات (بعدّاد global) لكل واحدة، واطبع [[cache_info()]].`, done: R`عندك ٣ أوقات و ٣ أعداد نداءات: من غير cache ملايين النداءات، ومع الـ cache [[33]] نداء و [[cache_info]] فيها [[misses=33]]، والـ loop من غير نداءات، والفرق في الوقت مكتوب برقم.` },
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
          learn: R`تكتب generators بـ [[yield]] وgenerator expressions، وتربطهم في pipeline، وتعرف [[next]] و [[yield from]] وإن الـ generator بيتلف عليه مرة واحدة.`,
          out: R`تقرا ملف بالجيجا سطر سطر بذاكرة ثابتة، وتقيس الفرق بنفسك بـ [[tracemalloc]].`,
          use: {
            prog: R`أي داتا كبيرة أو مالهاش آخر (ملف لوج، أو صفوف من القاعدة، أو صفحات API) بتتعالج عنصر عنصر من غير ما تتحمّل كلها.`,
            work: R`FastAPI بيستخدم [[yield]] في الـ dependencies (افتح اتصال، [[yield]]، اقفله) و [[StreamingResponse]] بياخد generator. نفس الفكرة هنا.`,
          },
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

## ٨. اتشغّل فعلًا: الـ generator وفّر كام؟

~~~python
import tracemalloc
tracemalloc.start()
s = sum([i for i in range(10**6)])
cur, peak = tracemalloc.get_traced_memory()
print("list peak MB", round(peak / 1e6, 1))
tracemalloc.reset_peak()
s = sum(i for i in range(10**6))
cur, peak = tracemalloc.get_traced_memory()
print("gen peak KB", round(peak / 1e3, 1))
~~~

~~~text الناتج (3.14.3)
list peak MB 40.4
gen peak KB 3.7
~~~

نفس المجموع، و الـ list حجزت حوالي ٤٠ ميجا (مليون int + الـ list نفسها) والـ generator أقل من ٤ كيلو. [[tracemalloc]] في المكتبة الأساسية وبيقيس الذاكرة اللي Python حجزها فعلًا، أدق من Task Manager.

---

## ٩. [[yield from]] وقيمة الـ [[return]]

~~~python
def inner():
    yield 1
    yield 2
    return "done"
def outer():
    r = yield from inner()
    yield r
print(list(outer()))
g = inner(); next(g); next(g)
next(g)
~~~

~~~text الناتج
[1, 2, 'done']
StopIteration: done
~~~

- [[yield from inner()]] بتطلّع كل قيم [[inner]] كأنها قيم [[outer]]، ولما [[inner]] تخلص، القيمة اللي في [[return]] بتبقى ناتج الـ [[yield from]].
- الـ [[return "done"]] جوه generator **مش** بترجّع للي بيلف عليه بـ for: بتتحط في [[StopIteration.value]]. عشان كده [[list(inner())]] = [[[1, 2]]] من غير [["done"]].

---

## ١٠. generators مالهاش آخر

~~~python
from itertools import islice, count
print(list(islice(count(10, 5), 4)))
~~~

~~~text الناتج
[10, 15, 20, 25]
~~~

[[count(10, 5)]] بيعدّ للأبد، و [[islice]] بياخد أول ٤ بس. لو كتبت [[list(count())]] البرنامج هيفضل ياكل ذاكرة لحد ما يقع، فالـ generator اللانهائي لازم يتقطع بـ [[islice]] أو [[break]].

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
            R`دالة فيها [[yield]] في أي حتة بقت **generator function**: ندائها مبيشغّلش الجسم، بيرجّع generator object.`,
            R`[[with open]] بيفتح الملف بـ UTF-8، والملف هيتقفل لما الـ generator يخلص أو يتقفل (درس «with و context managers»).`,
            R`الملف نفسه iterator: [[for line in f]] بيقرا سطر واحد كل لفة من الديسك، مش الملف كله في الذاكرة.`,
            R`[[yield]] بتطلّع السطر للي بيلف **وتوقف الدالة مكانها** بكل متغيراتها، ولما يطلب اللي بعده تكمّل من نفس السطر. و [[rstrip("\n")]] بتشيل السطر الجديد من الآخر بس.`,
            R`generator تاني بياخد list وحجم، وهيطلّعها حتت.`,
            R`[[range(0, len(items), size)]] بيدّي بدايات الحتت: 0 و 4 و 8 لو الحجم ٤.`,
            R`[[items[i : i + size]]] slice للحتة، والأخيرة ممكن تبقى أقصر من غير خطأ لأن الـ slice مبيرميش لو عدّى الآخر.`,
            R`generator expression بالأقواس العادية فوق generator: لسه **مفيش ولا سطر اتقري**. ده بيبني pipeline بس، والشغل بيحصل لما حد يلف.`,
            R`هنا بس القراية بتبدأ: كل لفة بتطلب سطر من [[errors]]، اللي بيطلب من [[read_lines]]، اللي بيقرا سطر من الملف. سطر واحد في الذاكرة في أي لحظة.`,
            R`بيطبع كل سطر فيه [["ERROR"]]. لو الملف [[app.log]] مش موجود، الخطأ [[FileNotFoundError]] بيظهر هنا وقت اللف مش وقت السطر اللي فوق.`,
            R`لف على الحتت: [[list(range(10))]] اتقسمت حتت من ٤.`,
            R`بيطبع [[[0, 1, 2, 3]]] ثم [[[4, 5, 6, 7]]] ثم [[[8, 9]]]. ومن 3.12 [[itertools.batched]] بتعمل نفس الشغل بس بتطلّع tuples.`,
            R`نداء generator function مبيشغّلش ولا سطر من جسمها: بيرجّع object جاهز يتلف عليه. [[print(gen)]] هتطبع [[<generator object batched at 0x...>]].`,
            R`[[next(gen)]] بتشغّل الجسم لحد أول [[yield]] وترجّع قيمتها: [[[1, 2]]]. والنداء التالت بعد ما يخلص بيرمي [[StopIteration]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**افتكر:** اكتب generator [[countdown(n)]] بيطلّع من [[n]] لـ 1، وبعدين نفس الحاجة كـ generator expression، واكتب إيه اللي بيحصل لو لفّيت عليه مرتين.`, done: R`[[list(countdown(3)) == [3, 2, 1]]]، والـ expression [[(i for i in range(3, 0, -1))]] بنفس الناتج، والمرة التانية [[list(g)]] رجّعت [[[]]] وكتبت ليه.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** generator فيه [[print("A")]] ثم [[yield 1]] ثم [[print("B")]] ثم [[yield 2]] ثم [[print("C")]]. إيه اللي بيتطبع عند [[g = gen()]]، وعند كل [[next(g)]] من التلاتة؟`, done: R`عند [[g = gen()]] مفيش حاجة، وأول [[next]] طبعت [[A]] ورجّعت [[1]]، والتاني [[B]] و [[2]]، والتالت طبعت [[C]] ورمت [[StopIteration]]، وطابقت التشغيل.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[rows = (parse(l) for l in lines)]] و [[print(len(rows))]] و [[total = sum(r["x"] for r in rows)]] و [[count = sum(1 for r in rows)]]. فيه غلطتين. صلّحهم من غير ما تحوّل لـ list.`, done: R`الأولى [[TypeError: object of type 'generator' has no len()]]، والتانية إن [[count]] بقى [[0]] لأن الـ generator خلص في [[total]]. التصليح: loop واحدة بتحسب الاتنين، أو تعمل الـ generator تاني لكل حسبة.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** اعمل ملف لوج فيه ٢٠٠ ألف سطر ([[INFO]] و [[WARN]] و [[ERROR]] بالتناوب مع وقت ورسالة) بسكربت Python. اكتب pipeline من ٣ generators: يقرا سطر سطر، ويفك المستوى والوقت، ويفلتر [[ERROR]]، وفي الآخر [[Counter]] على الساعة.`, done: R`الـ pipeline بيقرا الملف كله ويعدّ الـ ERRORs بالساعة، والعدد بيطابق [[sum(1 for l in open(...) if "ERROR" in l)]]، و [[tracemalloc]] بيقول إن الـ peak أقل من ١ ميجا مع إن الملف أكبر بكتير.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[paginate_api(fetch)]] generator بيطلب صفحة بعد صفحة من دالة [[fetch(page)]] (مزيّفة، بترجّع list من ١٠ عناصر لحد الصفحة ٤ وبعدين [[[]]]) ويطلّع العناصر واحد واحد، ويقف لما الصفحة تيجي فاضية.`, done: R`[[list(paginate_api(fake_fetch))]] فيها ٤٠ عنصر، و [[fetch]] اتنادت ٥ مرات بالظبط (العدّاد)، و [[next(islice(paginate_api(fake_fetch), 15, None))]] رجّع العنصر رقم ١٦ ونادى [[fetch]] مرتين بس.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** مجموع مربعات ٥ مليون رقم بـ list comprehension وبـ generator expression. قيس الوقت ([[perf_counter]]) والذاكرة ([[tracemalloc]]) للاتنين، واكتب إمتى تختار أنهي.`, done: R`عندك ٤ أرقام: الوقت قريب (الـ list ممكن تطلع أسرع شوية)، والذاكرة فرقها ضخم (ميجات مقابل كيلوهات)، وكتبت: list لو هتلف أكتر من مرة أو محتاج [[len]] أو index، و generator لو مرة واحدة على داتا كبيرة.` },
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
          learn: R`تعرف Python بيدوّر على الاسم فين (Local ثم Enclosing ثم Global ثم Built-in)، وإمتى تحتاج [[global]] و [[nonlocal]]، وليه بيطلع [[UnboundLocalError]]، وفخ الـ late binding.`,
          out: R`closures زي العدّادات والـ decorators من غير مفاجآت، ومش هتسمّي متغير [[list]] وتكسر الـ built-in.`,
          use: {
            prog: R`كل decorator و callback و closure بيعتمد على إن الدالة الداخلية بتشوف متغيرات اللي حواليها.`,
            work: R`الـ [[global]] في كود الإنتاج بيخلّي الاختبارات تأثر على بعض. فهم الـ scope بيخلّيك تحط الحالة في closure أو object بدلها.`,
          },
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

## ٨. اتشغّل فعلًا: late binding في الـ closures

~~~python
handlers = []
for name in ["a", "b"]:
    def h():
        return name
    handlers.append(h)
print([h() for h in handlers])
~~~

~~~text الناتج
['b', 'b']
~~~

الدالتين رجّعوا [["b"]]. الـ closure بيحفظ **المتغير** [[name]] مش قيمته وقت التعريف، والمتغير ده واحد بس (الـ for مبتعملش scope)، ووقت النداء كانت قيمته [["b"]]. التصليح [[def h(name=name):]]: الـ default بيتحسب وقت [[def]] (درس «def و return و الـ defaults») فبيحفظ القيمة، وطلع [[['a', 'b']]]. نفس الفخ مع [[lambda]] جوه comprehension (درس «comprehensions»).

---

## ٩. اتشغّل فعلًا: تغطية الـ built-ins

~~~python
list = [1, 2]
list("ab")
~~~

~~~text الناتج
TypeError: 'list' object is not callable
~~~

[[list = ...]] عمل اسم global بيغطي على الـ built-in (الـ G قبل الـ B في LEGB). وبعد [[del list]] رجع [[list("ab")]] يطلّع [[['a', 'b']]]. الأسماء اللي الناس بتغطيها كتير: [[list]] و [[dict]] و [[id]] و [[type]] و [[input]] و [[sum]] و [[max]] و [[filter]]. سمّيها [[items]] و [[user_id]] و [[kind]].

---

## ١٠. توصل بنفسك: الـ closure شايل إيه؟

~~~python
def outer():
    a = 1
    def inner():
        return a
    return inner
f = outer()
print(f.__closure__[0].cell_contents)
~~~

~~~text الناتج
1
~~~

[[__closure__]] tuple فيها «cells»، كل cell متغير محفوظ من الـ enclosing scope، و [[cell_contents]] قيمته دلوقتي. ده اللي بيخلّي [[make_counter]] يفتكر [[n]]. و [[globals()]] dict بكل الأسماء الـ global في الملف، و [[locals()]] للدالة الحالية.

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
            R`متغير على مستوى الملف (global)، أي دالة تقدر **تقرأه** من غير أي حاجة.`,
            R`دالة خارجية، وجواها هنعرّف دالة تانية.`,
            R`[[x]] هنا local للدالة الخارجية، وبالنسبة للدالة الداخلية ده الـ enclosing scope. ومش بيغيّر الـ global، ده اسم تاني بنفس الحروف.`,
            R`دالة جوه دالة، وملهاش [[x]] خاص بيها.`,
            R`Python بيدوّر على [[x]] بالترتيب: Local (مش موجود) ثم Enclosing (موجود)، فبيطبع [[enclosing]] ومبيكمّلش للـ global.`,
            R`نداء الدالة الداخلية من جوه الخارجية، والدالة الداخلية مش موجودة برّه [[outer]] أصلًا.`,
            R`نداء الخارجية، فبتعرّف [[x]] المحلي وتنادي [[inner]] اللي بتطبع [[enclosing]].`,
            R`برّه أي دالة: [[x]] هو الـ global ([[global]])، والـ [[x]] اللي جوه [[outer]] اختفى لما الدالة خلصت. و [[len]] مش متعرّفة في الملف، فـ Python لاقاها في الـ built-ins (آخر حرف في LEGB). الناتج [[global 6]].`,
            R`عدّاد global هنعدّله من جوه دالة.`,
            R`دالة بتزوّد العدّاد، و [[-> None]] بتقول إنها مبترجّعش حاجة.`,
            R`[[global count]] بيقول لـ Python «[[count]] في الدالة دي هو بتاع الملف». من غيرها أي تعيين للاسم بيخليه local.`,
            R`[[+=]] تعيين، فلولا [[global]] كان هيطلع [[UnboundLocalError]]: Python هيعتبر [[count]] local ويحاول يقراه قبل ما يتعيّن.`,
            R`نداء واحد يزوّد العدّاد.`,
            R`بيطبع [[1]]: الـ global اتغير فعلًا. وده بالظبط اللي بيخلّي [[global]] خطر: أي دالة تقدر تغيّره من أي حتة.`,
            R`دالة بتصنع عدّاد وترجّعه، والبديل النضيف لـ [[global]]: كل عدّاد ليه حالته لوحده.`,
            R`[[n]] local للدالة الخارجية، وهيعيش بعد ما تخلص لأن الدالة الداخلية هتفتكره.`,
            R`الدالة الداخلية اللي هنرجّعها، بترجّع رقم.`,
            R`[[nonlocal n]] بيقول «[[n]] هنا بتاع الدالة اللي حواليا» عشان التعيين يعدّله هو. ولو مفيش [[n]] هناك: [[SyntaxError: no binding for nonlocal 'n' found]].`,
            R`[[n += 1]] بيعدّل [[n]] اللي في الـ enclosing scope بفضل [[nonlocal]].`,
            R`بترجّع القيمة الجديدة للعدّاد.`,
            R`بنرجّع الدالة نفسها **من غير أقواس**. ده **closure**: دالة شايلة معاها المتغيرات اللي كانت حواليها ([[n]]) حتى بعد ما [[make_counter]] خلصت.`,
            R`كل نداء لـ [[make_counter()]] بيعمل [[n]] جديدة، فـ [[c]] عدّاد مستقل. لو عملت [[c2 = make_counter()]] هيبدأ من الأول.`,
            R`كل [[c()]] بيزوّد نفس الـ [[n]] المحفوظة، فبيطبع [[1 2 3]].`,
            R`for عادية من 0 لـ 2، عشان نشوف المتغير بتاعها بيروح فين بعدها.`,
            R`[[pass]] جملة فاضية «متعملش حاجة»، لازمة لأن البلوك مينفعش يبقى فاضي.`,
            R`بيطبع [[2]]: متغير الـ [[for]] فضل موجود بآخر قيمة، لأن الـ for والـ if مبيعملوش scope في Python (بس الدوال والـ comprehensions والـ classes).`,
            R`global هنحاول نعدّله غلط.`,
            R`دالة من غير [[global]]، وده اللي هيبيّن الغلطة المشهورة.`,
            R`Python وقت ما يقرا الدالة بيشوف تعيين لـ [[total]] فيقرر إنه local **في الدالة كلها**، فالقراية اللي جوه [[+=]] بتحصل قبل ما يتعيّن.`,
            R`النداء بيرمي [[UnboundLocalError: cannot access local variable 'total' where it is not associated with a value]]. التصليح: رجّع القيمة ([[return total + 1]]) أو [[global]] لو لازم.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**افتكر:** اكتب LEGB بالترتيب ومثال اسم واحد من كل مستوى في كود صغير، وإمتى تحتاج [[global]] وإمتى [[nonlocal]] وإمتى ولا واحد فيهم.`, done: R`عندك ٤ أمثلة (متغير في الدالة، وفي الدالة اللي حواليها، وفي الملف، و [[len]])، وكتبت إن الاتنين للتعيين بس، وإن [[items.append()]] مش محتاجة ولا واحد لأنها مش تعيين.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[name = "global"]] و [[def a(): print(name)]] و [[def b(): name = "local"; a()]] و [[b()]]. وبعدين [[x = 1]] و [[def show(): print(x); x = 2]] و [[show()]].`, done: R`الأول طبع [[global]] (الـ scope بيتحدد بمكان **تعريف** [[a]] مش مكان ندائها)، والتاني رمى [[UnboundLocalError: cannot access local variable 'x' where it is not associated with a value]] مع إن [[print]] قبل التعيين، وكتبت ليه.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[buttons = []]] و [[for i in range(3): buttons.append(lambda: print("button", i))]] و [[for b in buttons: b()]] بيطبع [[button 2]] ٣ مرات. صلّحه بطريقتين.`, done: R`الطريقتين طبعوا [[button 0]] و [[button 1]] و [[button 2]]: [[lambda i=i: ...]]، و [[functools.partial(print, "button", i)]] أو دالة بتصنع الـ lambda ([[make(i)]])، وكتبت اسم الفخ (late binding).` },
            { lvl: 'تطبيق', t: R`**refactor:** سكربت فيه [[total = 0]] و [[count = 0]] global ودالة [[add(x)]] فيها [[global total, count]]. حوّله لـ closure [[make_stats()]] بترجّع دالتين [[add]] و [[summary]] بيشاركوا نفس الحالة من غير ولا [[global]].`, done: R`[[add, summary = make_stats()]] ثم [[add(10)]] و [[add(20)]] و [[summary()]] بيرجّع [[(2, 15.0)]] (العدد والمتوسط)، ونسختين من [[make_stats()]] مبيأثروش على بعض، وكلمة [[global]] مش موجودة في الملف.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[make_accumulator(start=0)]] بترجّع دالة [[add(amount)]] بتزوّد على مجموع جواها وترجّعه، وبترفض المبالغ السالبة بـ [[ValueError]] من غير ما المجموع يتغير.`, done: R`[[acc = make_accumulator(100)]] و [[acc(10)]] = [[110]] و [[acc(5)]] = [[115]]، و [[acc(-1)]] بترمي والمجموع لسه [[115]]، و [[acc.__closure__[0].cell_contents]] بيطبع المجموع.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** اكتب كود بيطبع كل الأسماء الـ built-in اللي **غطّيتها** بالغلط في ملف (تقاطع [[set(globals())]] مع [[set(dir(builtins))]])، وجرّبه على ملف فيه [[list]] و [[id]] و [[type]] كمتغيرات.`, done: R`أول تشغيل طلّع كمان [[__doc__]] و [[__name__]] و [[__loader__]] و [[__package__]] و [[__spec__]] (موجودين في الاتنين طبيعي)، فشيلت اللي بيبدأ بـ [[_]] وبقى بيطبع [[['id', 'list', 'type']]]، وبعد ما غيّرت الأسماء طبع [[[]]].` },
          ],
        }
      ]
    }
]);

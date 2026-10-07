// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
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
    }
]);

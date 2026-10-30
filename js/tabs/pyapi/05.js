// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "الأخطاء و with",
      l: 1,
      n: "try و except و raise، و exceptions بتاعتك، و with اللي بتقفل الحاجة لوحدها",
      time: R`حوالي ٥ ساعات (٣ دروس)`,
      goal: [
        R`تقرا أي traceback من تحت لفوق وتوصل للسطر والسبب، وتعرف أشهر ١٢ خطأ برسايلهم، وتوقف الكود وتفحصه بـ [[breakpoint()]].`,
        R`تمسك الأخطاء اللي تقدر تتصرف فيها بس بـ [[try]] و [[except]] و [[else]] و [[finally]]، وترمي أخطاء واضحة بـ [[raise ... from]] و [[add_note]].`,
        R`تعمل exceptions بتاعتك في شجرة صغيرة ([[AppError]] وتحته الأنواع)، وتعرف إمتى [[assert]] وإمتى [[raise]].`,
        R`تفتح الملفات بـ [[with]] و [[encoding="utf-8"]] دايمًا، وتكتب context managers بـ [[@contextmanager]] وبالـ class، وتستخدم [[suppress]] و [[ExitStack]].`,
      ],
      use: {
        prog: R`البرنامج اللي مبيقعش مش اللي مفيهوش أخطاء، ده اللي بيتوقعها: ملف مش موجود، وإدخال غلط، وشبكة وقعت.`,
        work: R`في FastAPI كل [[HTTPException]] وكل exception handler مبني على نفس الأدوات دي، و [[with]] هو اللي بيقفل اتصالات القاعدة والملفات حتى لو الطلب وقع.`,
        cs: R`الـ exceptions بتطلع من الدالة اللي رمتها لفوق في الـ call stack لحد أول [[except]] مناسب، والـ traceback هو صورة الـ stack ده لحظة الوقوع.`,
      },
      projects: [
        { lvl: 'صغير', t: R`مكتبة إدخال آمن`, what: R`[[ask.py]] فيه [[ask_int(prompt, lo, hi)]] و [[ask_yes_no(prompt)]] و [[ask_choice(prompt, options)]]، كل واحدة بتعيد السؤال لحد ما الإدخال يبقى صح، وبتتعامل مع [[EOFError]] و [[KeyboardInterrupt]] برسالة «اتلغى» وترجّع [[None]] بدل traceback. من درس «try و except» ودرس «while و break و continue».`, done: R`بالـ pipe: [[abc]] ثم [[200]] ثم [[35]] بترجّع [[35]] بعد رسالتين مختلفتين، والـ pipe الفاضي بيرجّع [[None]] من غير traceback، و Ctrl+C في نص السؤال بيطبع «اتلغى» وكود الخروج [[130]] أو [[1]] (مكتوب أنهي وليه).` },
        { lvl: 'صغير', t: R`نسخ ملف برسايل مفهومة`, what: R`[[copy_file(src, dst)]] بتقرا وتكتب بـ [[with]] و [[encoding="utf-8"]]، وبتمسك [[FileNotFoundError]] و [[PermissionError]] و [[IsADirectoryError]] و [[UnicodeDecodeError]] وكل واحد ليه رسالة بالعربي فيها اسم الملف. من درس «with و context managers» و «الـ traceback وأشهر الأخطاء».`, done: R`٥ حالات اتجرّبت فعلًا (ملف موجود، ومش موجود، وفولدر بدل ملف، وملف binary، ومسار هدف في فولدر مش موجود) وكل واحدة طلّعت رسالتها، ومفيش [[except Exception]] واحدة عامة.` },
        { lvl: 'متوسط', t: R`قارئ ملف إعدادات`, what: R`[[load_config(path)]] بتقرا ملف [[key = value]] سطر سطر (بتتجاهل الفاضي واللي بيبدأ بـ [[#]])، وبترمي [[ConfigError]] (بتورث من [[AppError]]) فيها رقم السطر والسبب: سطر من غير [[=]]، أو مفتاح متكرر، أو مفتاح إجباري ناقص. من كل دروس الوحدة.`, done: R`ملف سليم بيرجّع dict، و ٣ ملفات بايظة كل واحد بيرمي [[ConfigError]] رسالته [[line 4: missing '=']] أو شبهها بالسطر الصح، و [[except AppError]] في [[main]] بيمسكهم كلهم، وخطأ [[UnicodeDecodeError]] بيتربط بـ [[raise ConfigError(...) from e]].` },
        { lvl: 'متوسط', t: R`ملخّص ملف لوج`, what: R`سكربت بيقرا ملف لوج (اعمله بسكربت: ٥٠ ألف سطر فيهم ١٪ سطور بايظة) بـ generator و [[with]]، ويعدّ كل مستوى، ويطبع أول ٥ سطور بايظة بأرقامها بدل ما يقع عليها، ويقيس الوقت بـ context manager [[timer]]. من درس «with و context managers» ووحدة «الدوال».`, done: R`العدّ بيطابق [[grep -c]] أو [[Select-String]] على نفس الملف، والسطور البايظة اتعدّت ومش بتوقّع، والسكربت بيقرا الملف سطر سطر (الذاكرة ثابتة بـ [[tracemalloc]] مهما كبّرت الملف)، والوقت بيتطبع حتى لو قطعته بـ Ctrl+C.` },
        { lvl: 'كبير', t: R`قايمة مهام محفوظة في ملف`, what: R`CLI [[todo.py]] بأوامر [[add]] و [[list]] و [[done N]] و [[undo N]] و [[rm N]] و [[clear-done]]، بيحفظ في [[todo.txt]] (كل سطر [[0|العنوان]] أو [[1|العنوان]]). الكتابة **آمنة**: بتكتب في ملف مؤقت وبعدين [[os.replace]] عشان لو البرنامج وقع في النص الملف ميبوظش. وكل خطأ (رقم مش موجود، أو مش رقم، أو سطر بايظ في الملف، أو ملف مش موجود أول مرة) ليه رسالة وكود خروج. ومعاه [[test_todo.py]] بـ [[assert]] على دوال القراية والكتابة في فولدر مؤقت ([[tempfile.TemporaryDirectory]]). من كل وحدات المستوى لحد هنا.`, done: R`أول تشغيل من غير ملف بيعمله، و [[done 99]] و [[done abc]] بيطلّعوا رسالتين مختلفتين وكود خروج [[2]]، وسطر بايظ في الملف بيتعدّى برسالة تحذير ومبيمسحش الباقي، و ١٢ [[assert]] بيعدّوا، وسلسلة أوامر بتتشغّل مرتين ورا بعض والملف في الآخر هو هو، وقطع البرنامج في نص الكتابة (اختبرته بـ [[raise]] مؤقت قبل [[os.replace]]) مبيبوّظش الملف القديم.`, ext: R`لما توصل لدرس «csv و json» حوّل التخزين لـ JSON، وضيف تواريخ ومواعيد، و [[argparse]] (درس «argparse و typer») بدل الـ [[input]]، ولوج بـ [[logging]].` },
        { lvl: 'فكرة', t: R`شجرة أخطاء مشروعك`, what: R`لأي مشروع بتشتغل عليه (أو فكرة مشروع)، صمّم [[errors.py]]: [[AppError]] وتحتها ٤–٦ أنواع حسب اللي ممكن يغلط فعلًا (داتا، وصلاحيات، ومورد مش موجود، وخدمة برّه وقعت)، وكل نوع فيه البيانات اللي اللي بيمسكه محتاجها.`, done: R`كل نوع مستخدم في مكان حقيقي واحد على الأقل، و [[main]] فيها [[except AppError]] واحدة بتطبع رسالة لليوزر وكود خروج مختلف لكل نوع، والأخطاء غير المتوقعة (الـ bugs) بتطلع traceback كامل مش بتتبلع.`, ext: R`في المستوى ٢ حوّل كل نوع لـ HTTP status في FastAPI بـ exception handler واحد (درس «exception handlers»).` },
      ],
      items: [
        {
          cmd: "try و except",
          title: "تمسك الخطأ، وترمي خطأ بتاعك",
          learn: R`تمسك الخطأ اللي تقدر تتصرف فيه بس، بـ [[try]] و [[except]] و [[else]] و [[finally]]، وترمي أخطاء أوضح بـ [[raise ... from]] و [[add_note]]، وتعمل exceptions بتاعتك.`,
          out: R`دوال بترمي أخطاء ليها معنى، وكود بيمسكها في مكان واحد، ومفيش [[except: pass]] بيبلع الـ bugs.`,
          use: {
            prog: R`أي حاجة جاية من برّه البرنامج (ملف، وإدخال، وشبكة) ممكن تغلط. [[try]] هو المكان اللي بتقرر فيه هتعمل إيه لما ده يحصل.`,
            work: R`في الـ API كل exception بتاعك بيتحوّل لـ status code ورسالة واضحة، والـ traceback بيتسجّل في اللوج بـ [[logging.exception]] بدل ما يضيع.`,
          },
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

## ٤. اتشغّل فعلًا: شجرة الـ exceptions

[[except X]] بيمسك [[X]] **وأي نوع بيورث منه**. طبعنا الـ [[__mro__]] (سلسلة الآباء) على 3.14.3:

~~~text الناتج
KeyError           → LookupError → Exception → BaseException
FileNotFoundError  → OSError     → Exception → BaseException
KeyboardInterrupt  →               BaseException
~~~

| تمسك | بيمسك معاه | ملاحظة |
|---|---|---|
| [[except LookupError]] | [[KeyError]] و [[IndexError]] | «مش لاقي المفتاح أو المكان» |
| [[except OSError]] | [[FileNotFoundError]] و [[PermissionError]] و [[IsADirectoryError]] و [[TimeoutError]] | كل أخطاء الملفات والشبكة |
| [[except Exception]] | كل اللي فوق والـ bugs كمان | آخر خط دفاع بس، مع لوج |
| [[except BaseException]] أو [[except:]] | Ctrl+C و [[sys.exit()]] كمان | تقريبًا عمرك ما هتحتاجها |

ولما تعمل exceptions لمشروعك، اعمل أب واحد وتحته الأنواع، عشان [[main]] تمسكهم كلهم بسطر:

~~~python
class AppError(Exception): pass
class ConfigError(AppError):
    def __init__(self, line_no, msg):
        super().__init__(f"line {line_no}: {msg}")
        self.line_no = line_no
try:
    raise ConfigError(3, "missing =")
except AppError as e:
    print(type(e).__name__, e, e.line_no)
~~~

~~~text الناتج
ConfigError line 3: missing = 3
~~~

---

## ٥. اتشغّل فعلًا: [[add_note]] و [[logging.exception]]

### [[add_note]] (من 3.11): زوّد سياق من غير ما تغيّر النوع

~~~python
try:
    int("x")
except ValueError as e:
    e.add_note("while reading row 7")
    raise
~~~

~~~text الناتج (آخر سطرين)
ValueError: invalid literal for int() with base 10: 'x'
while reading row 7
~~~

[[raise]] لوحدها بترمي نفس الخطأ تاني، والملاحظة بتظهر تحت الرسالة في الـ traceback. مفيدة لما تكون في loop على صفوف وعايز تعرف أنهي صف من غير ما تعمل نوع جديد.

### [[logging.exception]]: اللوج بالـ traceback

~~~python
import logging
logging.basicConfig(format="%(levelname)s %(message)s")
try:
    1 / 0
except ZeroDivisionError:
    logging.exception("failed to compute")
~~~

~~~text الناتج
ERROR failed to compute
Traceback (most recent call last):
  ...
ZeroDivisionError: division by zero
~~~

بتكتب الرسالة بمستوى [[ERROR]] **ومعاها الـ traceback كامل**. ده الفرق بين [[except Exception: pass]] (الخطأ اختفى) و [[except Exception: logging.exception(...)]] (الخطأ اتسجّل والبرنامج كمّل). اللوج ليه درس «logging و profiling» في المستوى ٣.

---

## ٦. اتشغّل فعلًا: [[try]] ولا [[if]]؟ (EAFP و LBYL)

قسنا قراية مفتاح من dict بـ [[python -m timeit]] (3.14.3):

| الطريقة | المفتاح موجود | المفتاح مش موجود |
|---|---|---|
| [[try: d["a"]]] و [[except KeyError]] | [[20.6 nsec]] | [[122 nsec]] |
| [[if "a" in d: d["a"]]] | — | [[19.5 nsec]] |

الـ [[try]] نفسه ببلاش تقريبًا لما مفيش خطأ، والتكلفة بتيجي لما الخطأ **يترمي فعلًا** (حوالي ٦ مرات). فالقاعدة: [[try]] لما الخطأ نادر (ملف المفروض موجود، ورقم المفروض صح)، و [[if]] أو [[get]] لما الحالة «مش موجود» عادية ومتكررة. والأهم من السرعة: [[try]] حوالي العملية نفسها مفيهوش race condition (الملف ممكن يتمسح بين [[exists()]] و [[open()]]).

---

## ٧. [[assert]] ولا [[raise]]؟

[[assert x > 0, "msg"]] للتأكد من حاجة **المفروض مستحيل** تحصل لو الكود صح (افتراضات المبرمج وفي الاختبارات). و [[python -O]] بيشيل كل الـ asserts. فأي فحص على داتا جاية من برّه (يوزر، أو ملف، أو API) لازم [[raise ValueError]]، مش [[assert]].

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
            R`exception بتاعك: class بيورث من [[Exception]] (مش [[BaseException]])، فأي [[except Exception]] هيمسكه، والاسم بينتهي بـ [[Error]] زي العادة.`,
            R`[[__init__]] بتاخد بيانات عن الخطأ (إيه اللي مش موجود ورقمه)، عشان اللي يمسكه ميضطرش يفك الرسالة كنص. الـ classes ليها درس «class و self».`,
            R`[[super().__init__(msg)]] بيدّي الرسالة للـ [[Exception]] الأب، فـ [[str(e)]] و [[print(e)]] والـ traceback بيطبعوها: [[user 7 not found]].`,
            R`بيخزن البيانات كصفات على الـ object، فاللي بيمسكه يقرا [[e.item_id]] مباشرة (مثلًا يرجّع 404 بالـ id).`,
            R`دالة بتحوّل نص لعمر، وهترمي [[ValueError]] برسالة واضحة لو النص مش رقم أو سالب.`,
            R`[[try]] حوالين السطر اللي ممكن يرمي **بس**، مش الدالة كلها، عشان تعرف بالظبط مين رمى.`,
            R`[[int("abc")]] بيرمي [[ValueError: invalid literal for int() with base 10: 'abc']]، ودي رسالة تقنية مش مفهومة لليوزر.`,
            R`[[except ValueError as e]] بيمسك النوع ده بس (والأنواع اللي بتورث منه)، و [[as e]] بيدّيك الـ exception object. أي نوع تاني هيعدّي لفوق عادي.`,
            R`بيرمي [[ValueError]] جديد برسالة مفهومة، و [[!r]] بيحط القيمة بـ [[repr]] بين علامات تنصيص فالفراغ بيبان. و [[from e]] بيربطه بالأصلي فالـ traceback بيوري الاتنين مع [[The above exception was the direct cause]].`,
            R`[[else]] بتاعة الـ try بتشتغل لو مفيش خطأ حصل. الكود اللي فيها **مش** محمي بالـ [[except]]، وده المقصود: مش عايز تمسك خطأ من حتة تانية بالغلط.`,
            R`فحص تاني على القيمة بعد ما بقت رقم: السالب رقم صالح لـ [[int]] بس مش عمر صالح.`,
            R`[[raise]] بيرمي خطأ جديد ويوقف الدالة. الرسالة إنجليزي هنا لأنها رسالة للمبرمج واللوج.`,
            R`لو كله تمام يرجّع العمر كـ [[int]].`,
            R`[[try]] تاني على مستوى البرنامج، عشان نوري الـ except المتعددة و [[finally]].`,
            R`[[raise]] بتاعنا بالبيانات: [[NotFoundError("user", 7)]]. في كود حقيقي ده بيبقى جوه دالة بتدوّر في قاعدة البيانات.`,
            R`[[except NotFoundError as e]] بيمسكه **باسمه**، وده أوضح من [[except Exception]] وأأمن لأنه مش هيمسك bugs تانية.`,
            R`بيطبع الرسالة والـ id: [[user 7 not found 7]]. البيانات جت من الصفات مش من تقطيع النص.`,
            R`tuple أنواع في [[except]] واحد: يمسك أي واحد منهم. القوسين لازمين لحد 3.13، وفي 3.14 اختياريين لو مفيش [[as]].`,
            R`مش هيتنفّذ هنا لأن الخطأ اتمسك في الـ except اللي قبله. أول [[except]] مطابق بيكسب والباقي بيتساب.`,
            R`[[finally]] بيتنفّذ في **كل** الأحوال: خطأ اتمسك، أو مااتمسكش، أو [[return]]، أو مفيش خطأ أصلًا. مكانه التنضيف (قفل اتصال، أو مسح ملف مؤقت).`,
            R`بيطبع [[ده بيتطبع دايمًا]] بعد سطر الـ except. ولو الخطأ مااتمسكش، السطر ده بيتطبع **قبل** الـ traceback.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**افتكر:** اكتب بلوك [[try]] كامل بالأربع أجزاء، وجنب كل جزء إمتى بيشتغل: [[try]] و [[except]] و [[else]] و [[finally]]، وجرّبه مرة بخطأ ومرة من غير.`, done: R`التشغيلين طبعوا بالترتيب الصح: من غير خطأ [[try]] ثم [[else]] ثم [[finally]]، وبالخطأ [[try]] ثم [[except]] ثم [[finally]]، وكتبت إن [[else]] مش محمية بالـ except.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[def f():]] وجواها [[try: return "try"]] و [[finally: print("finally")]]، وبعدين [[print(f())]]. وكمان: [[except LookupError]] هيمسك [[{}["x"]]] و [[[][0]]]؟`, done: R`توقعت [[finally]] قبل [[try]] (الـ finally بتشتغل قبل ما القيمة توصل)، وإن [[LookupError]] بيمسك الاتنين لأنه أب [[KeyError]] و [[IndexError]]، وطابقوا التشغيل.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[try: data = load(path); total = compute(data); save(total) except Exception: pass]]. الكود ده «مبيقعش أبدًا» والتقرير بيطلع فاضي من غير سبب. أعد كتابته: try صغير لكل خطوة ممكن تغلط، وأنواع محددة، ولوج.`, done: R`مفيش [[except Exception: pass]]، و [[FileNotFoundError]] حوالين [[load]] بس برسالة فيها المسار، وأي bug في [[compute]] بيطلع traceback كامل، و [[logging.exception]] مستخدمة في المكان الوحيد اللي بيكمّل بعد الخطأ.` },
            { lvl: 'تطبيق', t: R`**ابني:** شجرة أخطاء لمتجر: [[ShopError]] وتحتها [[OutOfStock(sku, wanted, available)]] و [[InvalidCoupon(code)]] و [[PaymentFailed(reason)]]. ودالة [[checkout(cart)]] بترمي المناسب، و [[main]] فيها [[except ShopError]] واحدة بتطبع رسالة لكل نوع.`, done: R`٣ سيناريوهات كل واحد بيرمي نوعه ورسالته فيها البيانات ([[tea: wanted 5, available 2]])، و [[except ShopError]] مسكت التلاتة، و [[ZeroDivisionError]] (bug متعمّد) **معدّاش** منها وطلع traceback.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** list صفوف CSV كنصوص فيها صفوف بايظة ([[["1,tea,30", "2,coffee,abc", "x,juice,40", "4,water"]]]). اقرا كل صف بـ [[try]]، وحوّل الـ id والسعر لـ [[int]]، والصفوف البايظة اتعدّت مع رقم السطر والسبب من رسالة الخطأ.`, done: R`صف واحد سليم بس ([[1, tea, 30]])، والـ ٣ التانيين اتسجّلوا: [[line 2: invalid literal for int() with base 10: 'abc']] و [[line 3: invalid literal ... 'x']] و [[line 4: not enough values to unpack (expected 3, got 2)]]، والـ loop كمّلت لآخرها.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** قيس [[try/except KeyError]] و [[if key in d]] و [[d.get(key)]] على dict، مرة والمفتاح موجود ومرة مش موجود. واكتب قاعدتك بالأرقام.`, done: R`عندك ٦ أرقام من جهازك، والـ try أبطأ بوضوح **بس** لما المفتاح مش موجود (عندنا [[122]] مقابل [[20.6]] nsec)، وكتبت قاعدة في سطرين بتستخدم الأرقام دي.` },
          ],
          sol: R`مع [[from e]] هتشوف traceback لخطأين: الأول [[ValueError: invalid literal for int() with base 10: 'abc']] من [[int(raw)]]، وبعدين [[The above exception was the direct cause of the following exception:]]، وبعدين الخطأ بتاعك [[ValueError: age must be a number, got 'abc']]. يعني إنت قلت صراحة إن التاني سببه الأول.

من غير [[from e]] نفس الخطأين هيظهروا، بس الجملة في النص هتبقى [[During handling of the above exception, another exception occurred:]]، ودي معناها «حصل خطأ تاني وإحنا بنعالج الأول»، كأنه bug في الـ except نفسه. فـ [[from e]] مش بتضيف معلومة جديدة، هي بتوضح إن ده مقصود. ولو عايز تخفي الأصل خالص (مثلًا عشان فيه بيانات حساسة) اكتب [[from None]].`
        },
        {
          cmd: "الـ traceback وأشهر الأخطاء",
          title: "تقرا رسالة الخطأ لوحدك وتوقف الكود تفحصه بـ breakpoint",
          learn: R`تقرا أي traceback من آخر سطر لفوق، وتعرف أشهر ١٢ خطأ في Python برسايلهم الحقيقية وسببهم، وتوقف البرنامج في نصه وتفحص المتغيرات بـ [[breakpoint()]].`,
          out: R`أغلب الأخطاء بتتحل من قراية الرسالة بس، من غير ما تدوّر برّه، وفي الباقي بتعرف تفحص بنفسك.`,
          use: {
            prog: R`نص وقت أي مبرمج بيروح في إنه يفهم الكود وقع ليه. الـ traceback بيقولك المكان والسبب، والـ debugger بيوريك القيم لحظة الوقوع.`,
            work: R`أول حاجة في أي bug report أو لوج سيرفر هي الـ traceback. اللي بيعرف يقراه بيحل المشكلة في دقايق، واللي ميعرفش بيسأل.`,
          },
          desc: R`لما Python يقع بيطبع **traceback**: سلسلة النداءات اللي وصّلت للسطر اللي وقع، من الأقدم فوق للأحدث تحت. اقراه **من تحت**: آخر سطر فيه نوع الخطأ والسبب، واللي فوقه على طول هو السطر اللي وقع فعلًا، وفوقه مين ناداه.

كل frame فيه ٣ حاجات: الملف ورقم السطر واسم الدالة ([[File "app.py", line 5, in parse_price]])، والسطر نفسه، وعلامات [[~~~^^^]] بتشاور على الجزء اللي وقع بالظبط (من 3.11).

أشهر الأخطاء ومعناها في كلمتين: [[NameError]] اسم مش موجود، و [[TypeError]] نوع غلط للعملية، و [[ValueError]] النوع صح والقيمة غلط، و [[KeyError]] و [[IndexError]] مفتاح أو مكان مش موجود، و [[AttributeError]] الـ object مفيهوش الصفة دي (غالبًا القيمة [[None]])، و [[FileNotFoundError]] و [[ModuleNotFoundError]].

ولو الرسالة مش كفاية: [[breakpoint()]] بيوقف البرنامج في السطر ده ويفتح [[pdb]]، وتطبع أي متغير بـ [[p name]]. وده الدرس اللي بيعلّمك توصل للإجابة بنفسك في Python، وبعده درس «try و except» بيعلّمك تمسك الأخطاء دي.`,
          example: R`def load_prices(rows):
    return {name: parse_price(raw) for name, raw in rows}
def parse_price(raw):
    return float(raw.replace(",", ""))
rows = [("tea", "30"), ("coffee", None)]
print(load_prices(rows))`,
          try: R`شغّل المثال واقرا الـ traceback من تحت: إيه نوع الخطأ؟ وأنهي سطر؟ وأنهي قيمة كانت [[None]]؟ وبعدين حط [[breakpoint()]] أول سطر في [[parse_price]] وشغّل تاني، واكتب [[p raw]] ثم [[c]] ثم [[p raw]] ثم [[q]].`,
          flag: "script",
          deep: {
            why: R`الناس بتنسخ آخر سطر في الخطأ وتدوّر بيه، والإجابة غالبًا مكتوبة في السطور اللي فوقه: الملف والسطر والقيمة. وفي Python 3.11 وأحدث الـ traceback بقى بيشاور على الجزء اللي وقع جوه السطر بالظبط، و 3.12 بيقترح الاسم الصح ([[Did you mean: 'upper'?]]). اللي بيستخدم ده بيوفّر نص وقت الـ debugging.`,
            how: R`لما exception يترمي، Python بيدوّر على [[except]] في الدالة الحالية، ولو ملقاش بيطلع للي ناداها، وهكذا لحد المستوى الأعلى. لو محدش مسكه، بيطبع الـ traceback على stderr وبيقفل البرنامج بكود خروج [[1]]. كل frame في الـ traceback هو دالة كانت لسه شغالة لحظة الوقوع.

لو exception حصل **وانت بتتعامل** مع exception تاني، الـ traceback بيطبع الاتنين وبينهم [[During handling of the above exception, another exception occurred:]]. ولو استخدمت [[raise ... from e]] الجملة بتبقى [[The above exception was the direct cause of the following exception:]]. الأولى غالبًا bug في الـ except نفسه، والتانية مقصودة.

اقتراح [[Did you mean]] بيظهر في الـ traceback المطبوع بس، مش في [[str(e)]]: [[print(e)]] على [[AttributeError]] بتطبع [['str' object has no attribute 'uper']] من غير الاقتراح. والموديول [[traceback]] بيدّيك الـ traceback كنص ([[traceback.format_exc()]]) أو كـ list frames ([[traceback.extract_tb]]) عشان تسجّله.

[[breakpoint()]] (من 3.7) بتنادي [[pdb.set_trace()]]. أوامر [[pdb]] الأساسية: [[p x]] اطبع، و [[n]] السطر الجاي، و [[s]] ادخل جوه الدالة، و [[c]] كمّل لحد الـ breakpoint الجاي، و [[l]] وريني الكود، و [[w]] الـ stack، و [[q]] اخرج. و [[PYTHONBREAKPOINT=0]] بيعطّل كل الـ breakpoints من غير ما تمسحها.`,
            when: R`اقرا الـ traceback كله قبل ما تدوّر في أي حتة. استخدم [[breakpoint()]] لما الرسالة بتقول «إيه» بس مش «ليه» (القيمة دي جت [[None]] منين؟). واستخدم debugger المحرر (F5 في VS Code بـ breakpoint أحمر) لما محتاج تمشي خطوة خطوة كتير. و [[print]] مؤقت لسه مقبول لحاجة سريعة، بس امسحه.`,
            mistakes: R`تقرا أول سطر في الـ traceback (أقدم نداء) وتفتكره مكان الغلط. وتدوّر على الرسالة كاملة باسم ملفك ورقم سطرك (مش هتلاقي حد عنده نفس الرقم): دوّر بالنوع والجزء العام بس. وتفتكر [[AttributeError: 'NoneType' object has no attribute ...]] مشكلة في الـ method، وهي إن القيمة اللي قبل النقطة [[None]] (دالة نسيت [[return]] غالبًا). وتسيب [[breakpoint()]] في الكود وتعمل commit، فالسيرفر يقف مستني حد يكتب.`
          },
          teach: R`## المثال بيعمل إيه؟

بيقرا أسعار من صفوف، وصف منهم السعر فيه [[None]] بدل نص (زي خلية فاضية في Excel)، فالبرنامج بيقع جوه دالة جوه دالة. هدفنا مش نمنع الوقوع، هدفنا **نقرا** الـ traceback. اتشغّل كملف [[tb.py]] على ويندوز بـ Python 3.14.3 (المسار اتختصر):

~~~text الناتج
Traceback (most recent call last):
  File "tb.py", line 8, in <module>
    print(load_prices(rows))
          ~~~~~~~~~~~^^^^^^
  File "tb.py", line 2, in load_prices
    return {name: parse_price(raw) for name, raw in rows}
                  ~~~~~~~~~~~^^^^^
  File "tb.py", line 5, in parse_price
    return float(raw.replace(",", ""))
                 ^^^^^^^^^^^
AttributeError: 'NoneType' object has no attribute 'replace'
~~~

---

## ١. اقرا من تحت لفوق

| الخطوة | السطر | بيقولك |
|---|---|---|
| ١ | [[AttributeError: 'NoneType' object has no attribute 'replace']] | النوع: الـ object مفيهوش الصفة. والسبب: القيمة [[None]] |
| ٢ | [[File "tb.py", line 5, in parse_price]] | وقع في السطر ٥ جوه [[parse_price]] |
| ٣ | [[^^^^^^^^^^^]] تحت [[raw.replace]] | الجزء اللي وقع بالظبط: [[raw]] هو اللي [[None]] |
| ٤ | [[line 2, in load_prices]] | مين نادى [[parse_price]]: الـ comprehension في [[load_prices]] |
| ٥ | [[line 8, in <module>]] | ومين نادى [[load_prices]]: الكود الأساسي ([[<module>]] = الملف نفسه) |

يعني الإجابة الكاملة في ٣ سطور: [[raw]] كانت [[None]] في [[parse_price]]، وجت من [[rows]] اللي اتبعتت من السطر ٨. التصليح في الداتا أو في فحص [[if raw is None]] قبل [[replace]].

- [[Traceback (most recent call last)]] معناها «آخر نداء تحت».
- [[~~~]] بتشاور على الجزء اللي كان بيتنفّذ، و [[^^^]] على الجزء اللي رمى (من 3.11).

---

## ٢. أشهر ١٢ خطأ (اتشغّلوا فعلًا)

| الكود | الرسالة الحقيقية | السبب الأشهر |
|---|---|---|
| [[undefined_name]] | [[NameError: name 'undefined_name' is not defined]] | غلطة إملائية أو متغير اتعرّف جوه [[if]] ماتنفّذتش |
| [['a' + 1]] | [[TypeError: can only concatenate str (not "int") to str]] | نوعين مينفعش يتجمعوا |
| [[int('x')]] | [[ValueError: invalid literal for int() with base 10: 'x']] | النوع صح (نص) بس القيمة مش رقم |
| [[{}['k']]] | [[KeyError: 'k']] | المفتاح مش موجود: استخدم [[get]] |
| [[[][0]]] | [[IndexError: list index out of range]] | list فاضية أو أقصر من اللي متوقع |
| [['abc'.uper()]] | [[AttributeError: 'str' object has no attribute 'uper'. Did you mean: 'upper'?]] | غلطة في اسم method |
| [[None.strip()]] | [[AttributeError: 'NoneType' object has no attribute 'strip']] | دالة رجّعت [[None]] (نسيت [[return]]؟) |
| [[1/0]] | [[ZeroDivisionError: division by zero]] | قسمة على صفر: list فاضية في متوسط؟ |
| [[open('nope.txt')]] | [[FileNotFoundError: [Errno 2] No such file or directory: 'nope.txt']] | المسار نسبي للفولدر اللي انت فيه، مش للسكربت |
| [[import nosuchmod]] | [[ModuleNotFoundError: No module named 'nosuchmod']] | مش متسطّب، أو متسطّب في venv تاني |
| [[from math import sqroot]] | [[ImportError: cannot import name 'sqroot' from 'math' (unknown location). Did you mean: 'sqrt'?]] | الاسم غلط جوه موديول موجود |
| [[f()]] لـ [[f(x)]] | [[TypeError: f() missing 1 required positional argument: 'x']] | ناقص باراميتر (درس «def و return و الـ defaults») |

> اقتراحات [[Did you mean]] بتظهر في الـ traceback المطبوع بس. [[print(e)]] في [[except]] بتطبع الرسالة من غيرها (جرّبنا).

وفيه كمان [[IndentationError: unexpected indent]] و [[SyntaxError]]: دول بيظهروا **قبل** ما أي سطر يتنفّذ، لأن Python مقدرش يفهم الملف أصلًا.

---

## ٣. خطأين ورا بعض: [[During handling]]

~~~python
try:
    {}["k"]
except KeyError:
    int("x")
~~~

~~~text الناتج (السطور المهمة)
KeyError: 'k'

During handling of the above exception, another exception occurred:

ValueError: invalid literal for int() with base 10: 'x'
~~~

الخطأ التاني حصل **جوه** الـ [[except]]. Python بيطبع الاتنين عشان متضيعش السبب الأصلي، والمهم غالبًا آخر واحد (هو اللي محدش مسكه). ولو حصل ده من غير قصد، يبقى فيه bug في كود التعامل مع الخطأ نفسه. ولو قاصد تبدّل خطأ بخطأ أوضح: [[raise NewError(...) from e]] (درس «try و except»).

---

## ٤. اتشغّل فعلًا: [[breakpoint()]] و [[pdb]]

~~~python
def f(xs):
    total = 0
    for x in xs:
        breakpoint()
        total += x
        break
    return total
print(f([5, 7]))
~~~

بعتنا أوامر الـ debugger بالـ pipe ([[p total]] ثم [[n]] ثم [[p total]] ثم [[c]]):

~~~text الناتج
> <string>(5)f()
(Pdb) 0
(Pdb) > <string>(6)f()
(Pdb) 0
(Pdb) 5
~~~

| الأمر | بيعمل إيه |
|---|---|
| [[p total]] | اطبع قيمة المتغير دلوقتي: [[0]] |
| [[n]] (next) | نفّذ السطر الحالي وروح للي بعده، ووقفنا على السطر ٦ |
| [[s]] (step) | لو السطر فيه نداء دالة، ادخل جواها |
| [[c]] (continue) | كمّل عادي لحد الـ breakpoint الجاي أو الآخر، فالبرنامج طبع [[5]] |
| [[l]] و [[w]] | وريني الكود حوالين السطر، والـ stack |
| [[q]] | اخرج ووقّف البرنامج، وفي 3.14 بيسألك تأكيد [[y/n]] الأول |

و [[PYTHONBREAKPOINT=0]] في البيئة بيعطّل كل الـ [[breakpoint()]] من غير ما تمسحهم. وفي VS Code: علامة حمرا جنب رقم السطر و F5 بيعملوا نفس الحاجة بواجهة.

---

## ٥. الـ traceback كنص: موديول [[traceback]]

~~~python
import traceback, sys
try:
    parse_price(None)
except AttributeError:
    print(traceback.format_exc().splitlines()[-1])
    print([(f.name, f.lineno) for f in traceback.extract_tb(sys.exc_info()[2])])
~~~

~~~text الناتج
AttributeError: 'NoneType' object has no attribute 'replace'
[('<module>', 5), ('parse_price', 3)]
~~~

[[format_exc()]] بترجّع الـ traceback كامل كنص (تحطه في لوج أو إيميل)، و [[extract_tb]] بترجّعه كـ frames تقدر تقرا منها اسم الدالة ورقم السطر.

## الخلاصة

| عايز | اعمل |
|---|---|
| تعرف إيه اللي حصل | اقرا آخر سطر: النوع والسبب |
| تعرف فين | السطر اللي فوقه على طول، وعلامات [[^^^]] |
| تعرف مين نادى | اطلع لفوق frame frame |
| تشوف القيم لحظة الوقوع | [[breakpoint()]] و [[p]] |
| تسجّل الـ traceback | [[traceback.format_exc()]] أو [[logging.exception]] |

- [['NoneType' object has no attribute]] = القيمة اللي قبل النقطة [[None]].
- دوّر برّه بنوع الخطأ والجزء العام من الرسالة، مش باسم ملفك.`,
          lines: [
            R`دالة بتحوّل list صفوف لـ dict من الاسم للسعر. هي نفسها سليمة، بس هتظهر في الـ traceback لأنها في سلسلة النداءات.`,
            R`dict comprehension بتنادي [[parse_price]] على كل سعر. لما [[parse_price]] تقع، الـ traceback هيوري السطر ده كـ «اللي نادى».`,
            R`الدالة اللي هتقع فعلًا، بتاخد السعر كنص زي [["1,250"]].`,
            R`[[raw.replace(",", "")]] بتشيل الفواصل، و [[float()]] بتحوّل لرقم. لما [[raw]] تبقى [[None]]، [[None.replace]] بترمي [[AttributeError: 'NoneType' object has no attribute 'replace']].`,
            R`صفين: الأول سليم، والتاني سعره [[None]] زي خلية فاضية في ملف أو حقل ناقص في JSON. ده سبب الوقوع.`,
            R`النداء من مستوى الملف ([[<module>]] في الـ traceback). البرنامج بيقع هنا ومبيطبعش حاجة، والـ traceback بيبدأ من السطر ده فوق ويوصل لـ [[parse_price]] تحت.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**افتكر:** من غير ما تبص، اكتب الخطأ اللي هيطلع من كل سطر: [[d["x"]]] على dict فاضي، و [[[1][5]]]، و [["5" * "2"]]، و [[int("٥.٥")]]، و [[None + 1]]، و [[len(5)]].`, done: R`كتبت [[KeyError]] و [[IndexError]] و [[TypeError]] و [[ValueError]] و [[TypeError]] و [[TypeError]]، وشغّلتهم وقارنت الرسايل، وكتبت جنب كل واحد السبب في سطر.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** traceback فيه ٤ frames: [[main]] ثم [[process]] ثم [[parse_row]] ثم [[to_int]] وآخره [[ValueError: invalid literal for int() with base 10: '']]. الغلط في أنهي دالة؟ والقيمة كانت إيه؟ وتبدأ تدوّر فين؟`, done: R`كتبت إن الوقوع في [[to_int]] (آخر frame)، والقيمة نص فاضي، والسبب الأرجح في [[parse_row]] (صف فيه خانة فاضية)، واعملت نفس السلسلة في ملف وطلع نفس الشكل.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[def get_user(users, uid):]] بتلف وترجّع اليوزر لو [[u["id"] == uid]] (من غير [[return None]] في الآخر)، وبعدين [[print(get_user(users, 9)["name"])]] بيقع. اقرا الخطأ، وقول السبب الحقيقي، وصلّح الدالة واللي بيناديها.`, done: R`الخطأ [[TypeError: 'NoneType' object is not subscriptable]]، وكتبت إن الدالة رجّعت [[None]] لأن مفيش يوزر بالـ id ده، والتصليح إن اللي بينادي بيفحص [[if user is None]] (أو الدالة بترمي [[NotFoundError]] برسالة فيها الـ id).` },
            { lvl: 'تطبيق', t: R`**دوّر بنفسك:** حط [[breakpoint()]] جوه loop في سكربت درجات (من وحدة «التحكم في السير»)، واستخدم [[p]] و [[n]] و [[c]] و [[w]] و [[l]] بس عشان تعرف قيمة المتوسط بعد تالت طالب، من غير ما تضيف ولا [[print]].`, done: R`كتبت قيمة المتوسط اللي شفتها بـ [[p]]، ونسخت ناتج [[w]] (الـ stack)، ومسحت الـ [[breakpoint()]] في الآخر، وجرّبت [[PYTHONBREAKPOINT=0]] وشفت البرنامج بيعدّي من غير ما يقف.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[explain(e)]] بتاخد أي exception وترجّع نصيحة بالعربي حسب نوعه: [[KeyError]] «المفتاح ده مش موجود، استخدم get»، و [[AttributeError]] اللي رسالته فيها [[NoneType]] «القيمة اللي قبل النقطة None»، وهكذا لـ ٦ أنواع، والباقي رسالة عامة ومعاها النص الأصلي.`, done: R`٦ أخطاء حقيقية (عملتها بـ [[try]]) كل واحد طلّع النصيحة الصح، والنصيحة فيها اسم المفتاح أو الصفة من الرسالة نفسها، وخطأ مش معروف ([[RecursionError]] مثلًا) طلّع الرسالة العامة.` },
            { lvl: 'تحدي', t: R`**اشرحها:** خد traceback حقيقي طويل من أي مشروع أو مكتبة (أو اعمل واحد بـ ٥ دوال)، واكتب شرح لزميل في ٥ سطور: النوع، والسطر اللي وقع، والقيمة الغلط، وجت منين، والتصليح، من غير ما تشغّل حاجة غير اللي في الـ traceback.`, done: R`الشرح فيه الخمس حاجات، وكل واحدة بتشاور على سطر معيّن في الـ traceback (بالرقم)، وزميل (أو انت بعد يوم) قدر يصلّح من الشرح بس.` },
          ],
          sol: R`آخر سطر [[AttributeError: 'NoneType' object has no attribute 'replace']]: النوع [[AttributeError]] والسبب إن القيمة [[None]]. السطر اللي فوقه [[line 5, in parse_price]] وتحته [[^^^]] تحت [[raw.replace]]، يعني [[raw]] هي اللي [[None]]. وفوقه [[line 2, in load_prices]] (الـ comprehension اللي نادت) و [[line 8, in <module>]] (النداء الأساسي)، والصف الغلط [[("coffee", None)]].

ومع [[breakpoint()]] في أول [[parse_price]]: أول [[p raw]] طبعت [['30']]، و [[c]] كمّلت لحد النداء التاني، و [[p raw]] طبعت [[None]]، و [[q]] في 3.14 سألت [[Quitting pdb will kill the process. Quit anyway? [y/n]]] فكتبنا [[y]] والبرنامج وقف من غير ما يكمّل. كده شفت القيمة لحظة الوقوع بعينك من غير [[print]].`
        },
        {
          cmd: "with و context managers",
          title: "with بتقفل الملف أو الاتصال لوحدها",
          learn: R`تفتح الملفات بـ [[with]] و [[encoding="utf-8"]]، وتكتب context manager بـ [[@contextmanager]] وبـ [[__enter__]] و [[__exit__]]، وتستخدم أكتر من واحد في [[with]] واحدة و [[suppress]] و [[ExitStack]].`,
          out: R`مفيش ملف أو اتصال بيفضل مفتوح بعد خطأ، و [[timer]] و [[cd]] وأي «افتح/اقفل» بتكتبه مرة وتستخدمه في كل حتة.`,
          use: {
            prog: R`أي مورد ليه فتح وقفل (ملف، واتصال قاعدة، و lock، وفولدر مؤقت) مكانه [[with]]، عشان القفل يحصل حتى لو حصل خطأ في النص.`,
            work: R`[[lifespan]] في FastAPI و [[Session]] بتاعة SQLAlchemy و [[httpx.Client]] كلهم context managers. ونفس الكلام [[tempfile.TemporaryDirectory]] في الاختبارات.`,
          },
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

## ٩. اتشغّل فعلًا: أكتر من مورد، و [[suppress]]، و [[ExitStack]]

~~~python
from contextlib import suppress, ExitStack
from pathlib import Path
import os
Path("w_a.txt").write_text("سطر 1\nسطر 2\n", encoding="utf-8")
with (
    open("w_a.txt", encoding="utf-8") as src,
    open("w_b.txt", "w", encoding="utf-8") as dst,
):
    for line in src:
        dst.write(line.upper())
with suppress(FileNotFoundError):
    os.remove("does_not_exist.txt")
print("بعد suppress")
names = ["w_a.txt", "w_b.txt"]
with ExitStack() as stack:
    files = [stack.enter_context(open(n, encoding="utf-8")) for n in names]
    print([f.readline().strip() for f in files])
print(all(f.closed for f in files))
~~~

~~~text الناتج (3.14.3)
بعد suppress
['سطر 1', 'سطر 1']
True
~~~

| الأداة | بتعمل إيه |
|---|---|
| [[with (A as a, B as b):]] | موردين في [[with]] واحدة، والأقواس عشان تكسر السطر: رسميًا من 3.10 (على Docker 3.9 اشتغلت بالصدفة لأن الـ parser الجديد قبلها، فمتعتمدش عليها هناك). بيتقفلوا بالعكس: [[b]] الأول |
| [[suppress(FileNotFoundError)]] | «لو حصل الخطأ ده بالذات، تجاهله»، أوضح من [[try/except: pass]] لحاجة واحدة متوقعة |
| [[ExitStack]] | عدد موارد مش معروف وقت الكتابة (list ملفات): كل [[enter_context]] بيتقفل في الآخر |

---

## ١٠. [[__exit__]] اللي بترجّع [[True]] بتبلع الخطأ

~~~python
class Swallow:
    def __enter__(self):
        return self
    def __exit__(self, exc_type, exc, tb):
        print("exit got", exc_type.__name__ if exc_type else None)
        return True
with Swallow():
    1 / 0
print("كمّل عادي")
~~~

~~~text الناتج
exit got ZeroDivisionError
كمّل عادي
~~~

[[__exit__]] بتاخد نوع الخطأ والخطأ والـ traceback (أو [[None]] التلاتة لو مفيش)، ولو رجّعت قيمة truthy الخطأ **بيختفي**. ده اللي [[suppress]] بتعمله من جوه. فلو كتبت context manager بنفسك ورجّعت [[True]] بالغلط، هتبلع كل الأخطاء في صمت. الافتراضي ([[None]]) بيسيب الخطأ يطلع.

---

## ١١. اتشغّل فعلًا: الـ encoding على ويندوز

كتبنا [["سارة"]] بـ UTF-8، وقريناها بـ [[encoding="cp1252"]] (الافتراضي القديم في ويندوز إنجليزي):

~~~text الناتج
b'\xd8\xb3\xd8\xa7\xd8\xb1\xd8\xa9'
Ø³Ø§Ø±Ø©
~~~

**مفيش خطأ**، بس النص اتحوّل لحروف غريبة (mojibake)، وده أسوأ من الخطأ لأنه بيعدّي ويتحفظ كده. وعلى الجهاز ده [[locale.getpreferredencoding(False)]] طلعت [[cp65001]] (يعني UTF-8)، فالقراية من غير [[encoding]] كانت هتشتغل هنا بالصدفة وتبوظ على جهاز تاني إعداده [[cp1252]] أو [[cp1256]]. عشان كده [[encoding="utf-8"]] في كل [[open]] نصي، من غير استثناء.

وبعد ما الـ [[with]] بيخلص، الملف اتقفل: [[f.read()]] بعدها بترمي [[ValueError: I/O operation on closed file.]].

---

## الخلاصة

- [[with X as y:]] = ادخل (بينادي [[__enter__]])، شغّل البلوك، اخرج (بينادي [[__exit__]]) **مهما حصل**.
- مع الملفات: [[with open(..., encoding="utf-8") as f:]] دايمًا، ومتستخدمش [[f]] بعد البلوك.
- [[@contextmanager]]: قبل [[yield]] دخول، وبعده خروج، و [[try/finally]] حوالين [[yield]] إجباري.
- ده نفس شكل الـ [[lifespan]] والـ dependencies اللي فيها [[yield]] في FastAPI.`,
          lines: [
            R`[[contextmanager]] decorator بيحوّل generator فيه [[yield]] واحد لـ context manager، فمش محتاج تكتب class بـ [[__enter__]] و [[__exit__]].`,
            R`[[Path]] من [[pathlib]]: المسارات كـ objects بـ [[/]] و methods زي [[read_text]] و [[mkdir]] بدل نصوص و [[os.path.join]]. ليها درس «pathlib».`,
            R`[[time]] عشان [[perf_counter()]] اللي هنقيس بيها في الـ [[timer]].`,
            R`[[mkdir(exist_ok=True)]] بيعمل الفولدر، ومتعترضش لو موجود. من غير [[exist_ok]] التشغيل التاني بيرمي [[FileExistsError]]، وعشان تعمل فولدرات جوه بعض ضيف [[parents=True]].`,
            R`[[with open(...) as f]] بيفتح الملف للكتابة ([["w"]] بتمسح القديم) ويربطه بـ [[f]]، وهيتقفل لوحده في آخر البلوك حتى لو حصل خطأ. و [[encoding="utf-8"]] عشان العربي ميبوظش على أجهزة الافتراضي فيها مش UTF-8.`,
            R`[[f.write]] بتكتب النص زي ما هو من غير سطر جديد لوحدها، عشان كده كتبنا [[\n]]. وبترجّع عدد الحروف اللي اتكتبت.`,
            R`[[read_text]] بتفتح وتقرا الملف كله وتقفله في سطر واحد، مناسبة للملفات الصغيرة. للملفات الكبيرة اقرا سطر سطر بـ [[for line in f]] جوه [[with]].`,
            R`[[@contextmanager]] فوق generator بيخليه يشتغل مع [[with]]: اللي قبل الـ [[yield]] دخول، واللي بعده خروج.`,
            R`الـ context manager بتاعنا بياخد اسم يطبعه مع الوقت.`,
            R`**الدخول**: سجّل وقت البداية قبل ما بلوك الـ [[with]] يبدأ.`,
            R`[[try]] حوالين الـ [[yield]] ضروري: لو البلوك رمى exception، الـ exception بيترمي **من سطر الـ yield نفسه**، ومن غير [[finally]] سطر الخروج مش هيتنفّذ.`,
            R`[[yield]] من غير قيمة: هنا بالظبط بلوك الـ [[with]] بيشتغل. ولو كتبت [[yield x]] القيمة بتروح لـ [[as]].`,
            R`**الخروج**: [[finally]] بتتنفّذ بعد البلوك، سواء خلص عادي أو رمى.`,
            R`بيطبع الاسم والوقت بـ ٣ أرقام عشرية، زي [[sum: 0.150s]].`,
            R`استخدام الـ context manager بتاعنا: الكود اللي جوه هو اللي بيتقاس.`,
            R`مجموع ١٠ مليون رقم كحاجة بتاخد وقت، ولما البلوك يخلص [[timer]] بيطبع الوقت لوحده.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**افتكر:** اكتب من دماغك: فتح ملف للقراية بالعربي، وللإضافة في آخره، ولكتابة جديدة، وقراية ملف كله في سطر بـ [[Path]]، وفتح ملفين مع بعض في [[with]] واحدة.`, done: R`كتبت [[open(p, encoding="utf-8")]] و [[open(p, "a", encoding="utf-8")]] و [[open(p, "w", encoding="utf-8")]] و [[Path(p).read_text(encoding="utf-8")]] و [[with (open(a) as x, open(b, "w") as y):]]، وجرّبتهم على ملف فيه عربي.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** context manager بـ [[@contextmanager]] فيه [[print("in")]] ثم [[yield]] ثم [[print("out")]] **من غير** [[try/finally]]، والبلوك جواه [[raise ValueError]] جوه [[try/except]] برّه الـ with. هيطبع إيه؟ وبعدين ضيف [[try/finally]].`, done: R`من غير [[finally]] طبع [[in]] بس (الخروج ماتنفّذش)، وبعدها طبع [[in]] و [[out]]، والـ [[ValueError]] اتمسك برّه في الحالتين، وكتبت ليه.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[def read_config(p): f = open(p); data = f.read(); if not data: raise ValueError("empty"); f.close(); return data]]. فيه ٣ مشاكل (ملف بيفضل مفتوح، و encoding، وملف فاضي). صلّحهم بـ [[with]].`, done: R`النسخة الجديدة فيها [[with open(p, encoding="utf-8") as f]] ومفيهاش [[close]]، والملف الفاضي بيرمي [[ValueError]] والملف **اتقفل** ([[f.closed]] بـ [[True]] بعد الخطأ)، والعربي اتقرا صح.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[cd(path)]] context manager بيدخل فولدر بـ [[os.chdir]] ويرجع للأصلي في الآخر حتى لو حصل خطأ، مرة بـ [[@contextmanager]] ومرة كـ class بـ [[__enter__]] و [[__exit__]]. وقارنه بـ [[contextlib.chdir]] (من 3.11).`, done: R`في التلات نسخ [[os.getcwd()]] بعد البلوك = اللي قبله، حتى لما البلوك رمى [[RuntimeError]] (والخطأ طلع برّه ومااتبلعش)، و [[cd("مش_موجود")]] بيرمي [[FileNotFoundError]] من غير ما يغيّر الفولدر.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** عندك ٣ ملفات CSV صغيرة (اعملهم بسكربت) لـ ٣ فروع. ادمجهم في ملف واحد بعمود [[branch]] زيادة، بـ [[ExitStack]] لفتح عدد ملفات مش معروف، والكتابة في ملف مؤقت وبعدين [[os.replace]] للاسم النهائي.`, done: R`الملف النهائي فيه عنوان واحد وكل الصفوف بعمود الفرع، وعدد الصفوف = مجموعهم، ولما رميت خطأ متعمد في النص الملف النهائي القديم فضل زي ما هو (مفيش نص ملف)، وكل الملفات مقفولة في الآخر ([[f.closed]]).` },
            { lvl: 'تحدي', t: R`**محاكاة:** [[transaction(account)]] context manager بياخد نسخة من رصيد حساب (dict) وقت الدخول، ولو البلوك رمى أي exception بيرجّع الرصيد زي ما كان (rollback) ويسيب الخطأ يطلع، ولو خلص عادي بيسيب التعديلات (commit).`, done: R`تحويل ناجح بيغيّر الرصيدين، وتحويل بيرمي في النص (بعد الخصم وقبل الإضافة) بيرجّع الرصيدين زي ما كانوا والخطأ بيوصل للي برّه، و [[__exit__]] (أو الـ generator) **مبيرجّعش True**.` },
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

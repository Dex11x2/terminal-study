// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("pyapi", {
  label: "Python و FastAPI",
  prompt: "$ ",
  lab: R`python3 -m venv .venv && source .venv/bin/activate
pip install "fastapi[standard]"
fastapi dev main.py`,
  labText: "تاب Python بيغطي venv و pip و pytest؛ هنا اللغة نفسها وبناء API. fastapi dev بيفتح docs تفاعلية على /docs.",
  levels: {"1":["اللغة","الأنواع، و if و for و match، و lists و dicts، والدوال، والـ classes، والمكتبة الأساسية، والسكربتات"],"2":["FastAPI","routes و pydantic و dependencies و errors و async"],"3":["الإنتاج والانترفيو","قاعدة بيانات، و background tasks، و httpx، والأداء، وأسئلة الانترفيو"]},
  categories: [
    {
      t: "الأسماء والأنواع",
      l: 1,
      n: "المتغير اسم بيشاور على object، والنوع بتاع القيمة مش الاسم، والـ type hints للأدوات مش للتشغيل",
      items: [
        {
          cmd: "مقدمة بايثون والـ print",
          title: "تشغّل أول كود Python إزاي، وتطبع بـ print وتعرّف متغيرات بأنواعها؟",
          desc: R`[[Python]] لغة كتابتها قريبة من الإنجليزي ومفيهاش رموز كتير، وبتستخدم في الـ backend (زي FastAPI و Django)، والـ AI وتحليل البيانات، والسكربتات اللي بتأتمت شغل متكرر. في التاب ده هنستخدمها لحد ما نوصل لـ API كامل بـ FastAPI.

بتشغّلها بطريقتين:
• REPL: اكتب [[python3]] في الترمنال (أو [[python]] أو [[py]] على ويندوز) هيظهرلك [[>>>]]، تكتب سطر وتشوف نتيجته على طول. [[exit()]] للخروج.
• ملف: تكتب الكود في [[hello.py]] وتشغّله بـ [[python3 hello.py]].

[[print(...)]] بتطبع اللي بين القوسين. ولو بعتلها كذا قيمة مفصولين بـ [[,]] بتطبعهم في سطر واحد وبينهم مسافة.

المتغير: الاسم وبعده [[=]] وبعده القيمة، من غير أي كلمة قبله (مفيش let ولا var). والأنواع الأساسية:
• [[str]] نص بين علامتين تنصيص: [["Ali"]] أو [['Ali']].
• [[int]] رقم صحيح: [[150]].
• [[float]] رقم بكسور: [[4.95]].
• [[bool]] قيمتين بس: [[True]] و [[False]]، بأول حرف كبير.
و [[type(x)]] بتقولك نوع أي قيمة.

العمليات: [[+]] و [[-]] و [[*]] عادي، و [[/]] قسمة بتطلّع float دايمًا، و [[//]] قسمة بترمي الكسر، و [[%]] باقي القسمة.

و [[#]] أول السطر تعليق، Python بيتجاهله.

الدرس الجاي («names و objects») بيشرح المتغير في Python بيشاور على القيمة إزاي، ودرس «f-strings» بيوريك أسهل طريقة تحط متغير جوه نص.`,
          example: R`# أول سطر Python
print("Hello, Python!")

# متغيرات: الاسم = القيمة
course_title = "FastAPI Basics"
students = 150
rating = 4.95
is_published = True

# print بتاخد كذا قيمة وتحط بينهم مسافة
print("Course:", course_title)
print("Seats after adding 50:", students + 50)
print(type(students), type(rating), type(is_published))
print(7 / 2, 7 // 2, 7 % 2)`,
          try: R`اكتب [[python3]] في الترمنال (على ويندوز [[python]] أو [[py]]) وانسخ سطور المثال سطر سطر. بعدين جرّب: [[price = 200]] و [[discount = 30]] و [[print(price - discount)]]. وجرّب غلطتين واقرا الرسالة: [[is_open = true]] بحرف صغير، و [[print("Total: " + 5)]]. واخرج بـ [[exit()]].`,
          flag: "script",
          deep: {
            why: R`Python بتشغّل السطر وتوريك نتيجته على طول، فتقدر تتعلم بالتجربة من غير خطوة build. وكل اللي هتعمله بعد كده في التاب (الـ dicts والدوال والـ classes و FastAPI) مبني على نفس المتغيرات والأنواع دي.`,
            how: R`لما تشغّل ملف، Python (النسخة العادية اسمها CPython) بيحوّل الكود لـ bytecode وبعدين ينفّذه سطر سطر. لو فيه غلطة كتابة في أي حتة، مش هيشغّل حاجة خالص. لكن الغلطات زي [[NameError]] و [[TypeError]] بتظهر بس لما السطر بتاعها يتنفذ.

النوع بيتحدد من القيمة نفسها مش من الاسم: [[students = 150]] تبقى int، ولو كتبت بعدها [[students = "many"]] نفس الاسم بقى بيشاور على str. بس Python مش هتحوّل الأنواع من نفسها في العمليات: [["Total: " + 5]] بترفضها بدل ما تخمّن قصدك (عكس JavaScript).`,
            when: "أول حاجة في التاب. وكل ما تحب تجرّب سطر بسرعة (حساب، أو method على نص، أو شكل dict) افتح REPL بدل ما تعمل ملف.",
            mistakes: R`تكتب [[true]] بحرف صغير زي JavaScript فيطلعلك [[NameError]]. تجمع نص على رقم بـ [[+]] فيطلعلك [[TypeError]]: حوّل الرقم بـ [[str(5)]] أو استخدم f-string. وتحط مسافات في أول السطر من غير سبب: في Python المسافة في أول السطر ليها معنى (indentation)، فبيطلعلك [[IndentationError: unexpected indent]].`
          },
          lines: [
            R`اطبع النص.`,
            R`متغير [[str]].`,
            R`متغير [[int]].`,
            R`متغير [[float]].`,
            R`متغير [[bool]]: [[True]] بحرف كبير.`,
            R`[[print]] بقيمتين: بتحط بينهم مسافة لوحدها.`,
            R`الحساب بيحصل الأول (150 + 50) وبعدين بيتطبع.`,
            R`[[type()]] بترجّع نوع كل قيمة.`,
            R`قسمة عادية، وقسمة من غير كسر، وباقي القسمة.`
          ],
          sol: R`ناتج المثال:
[[Hello, Python!]]
[[Course: FastAPI Basics]]
[[Seats after adding 50: 200]]
[[<class 'int'> <class 'float'> <class 'bool'>]]
[[3.5 3 1]]

[[print(price - discount)]] بتطبع [[170]].

[[is_open = true]]: [[NameError: name 'true' is not defined. Did you mean: 'True'?]] (الاقتراح ده بيظهر في Python 3.10 وأحدث).
[[print("Total: " + 5)]]: [[TypeError: can only concatenate str (not "int") to str]]. الصح [[print("Total: " + str(5))]] أو [[print("Total:", 5)]].`
        },
        {
          cmd: "names و objects",
          title: "المتغير في Python علبة ولا لافتة؟",
          desc: R`المتغير في Python مش علبة جواها قيمة، هو اسم (لافتة) بيشاور على object. [[a = [1, 2]]] وبعدين [[b = a]] معناها إن الاسمين بيشاوروا على نفس الـ list، فأي تعديل من [[b]] بيبان في [[a]].

[[==]] بيسأل «القيمتين زي بعض؟»، و [[is]] بيسأل «دول نفس الـ object؟». والقاعدة: [[is]] مع [[None]] بس ([[x is None]])، و [[==]] لأي مقارنة تانية.

والنوع بتاع القيمة مش الاسم: نفس الاسم ممكن يشاور على int وبعدين على str (dynamic typing)، بس Python مش هيجمع int على str من نفسه (strong typing).`,
          example: R`a = [1, 2, 3]
b = a
b.append(4)
print(a)               # [1, 2, 3, 4]
c = a.copy()
print(a == c, a is c)  # True False
c.append(5)
print(a)               # [1, 2, 3, 4]، النسخة اتعدّلت لوحدها
x = None
if x is None:
    print("مفيش قيمة")
n = 5
n = "five"
"5" + 5  # TypeError: can only concatenate str (not "int") to str`,
          try: R`افتح [[python3]] في الترمنال (الـ REPL) وجرّب المثال سطر سطر. وبعدين جرّب [[id(a)]] و [[id(b)]] و [[id(c)]] وشوف مين رقمه زي مين.`,
          flag: "script",
          deep: {
            why: R`أغلب bugs المبتدئين في Python من هنا: تبعت list لدالة فتعدّلها من غير ما تقصد، أو تعمل «نسخة» وهي نفس الـ object. وفي الانترفيو [[is]] و [[==]] سؤال ثابت.`,
            how: R`كل حاجة في Python object ليه نوع وقيمة وهوية ([[id]]). التعيين [[b = a]] مبينسخش حاجة: بيربط اسم جديد بنفس الـ object. والدوال نفس الكلام: الباراميتر اسم جديد لنفس الـ object اللي اتبعت (اسمها call by sharing). فلو الدالة عملت [[append]] على list جاتلها، اللي برّه هيشوف التعديل. بس لو عملت [[items = []]] جوه الدالة، ده ربط الاسم المحلي بـ object جديد ومش هيأثر برّه.

[[a.copy()]] و [[list(a)]] و [[a[:]]] نسخة سطحية (shallow): list جديدة بس العناصر اللي جواها نفس الـ objects. لو جواها lists أو dicts وعايز تنسخهم هما كمان: [[copy.deepcopy(a)]].

[[is]] بيقارن الهوية (نفس [[id]])، و [[==]] بينادي [[__eq__]] ويقارن القيمة. و [[None]] object واحد بس في البرنامج كله (singleton)، عشان كده [[is None]] هي الطريقة الصح والأسرع. وفيه أرقام صغيرة (من -5 لـ 256) و strings قصيرة Python بيعيد استخدامها (interning)، فـ [[is]] ساعات «يشتغل» بالصدفة معاهم، وده بالظبط سبب إنك متعتمدش عليه.

Python dynamic: النوع بيتحدد وقت التشغيل ومرتبط بالقيمة مش بالاسم. و strong: مفيش تحويل ضمني بين أنواع مختلفة زي JS. [["5" + 5]] في JS بيطلع [["55"]]، هنا TypeError.`,
            when: R`[[is]] مع [[None]] (ومع sentinels بتعملها بنفسك)، و [[==]] في كل حاجة تانية. و [[.copy()]] أو [[deepcopy]] قبل ما تعدّل داتا جاتلك من برّه وانت مش عايز تغيّر الأصل.`,
            mistakes: R`[[if x == None]]: شغالة غالبًا بس مش مضمونة (أي class ممكن يعرّف [[__eq__]] غريب)، والـ linters بتعلّم عليها. و [[if name is "admin"]]: ممكن تنجح في الـ REPL وتفشل في الإنتاج، و Python من 3.8 بيطلّع SyntaxWarning عليها. وتعمل مصفوفة بـ [[[row] * 3]] فالتلات صفوف يطلعوا نفس الـ list: عدّل واحد يتعدّلوا كلهم.`
          },
          lines: [
            R`list، والاسم [[a]] بيشاور عليها.`,
            R`مفيش نسخ: [[b]] اسم تاني لنفس الـ list.`,
            R`التعديل من [[b]]...`,
            R`...بيبان من [[a]]، لأنهم object واحد.`,
            "نسخة جديدة (shallow copy).",
            R`نفس القيمة ([[==]]) بس object تاني ([[is]]).`,
            "التعديل في النسخة...",
            "...مبيأثرش على الأصل.",
            R`[[None]] معناها «مفيش قيمة»، وهو object واحد في البرنامج كله.`,
            R`[[is None]] هي الطريقة الصح.`,
            "جوه الـ if.",
            R`[[n]] بيشاور على int.`,
            "نفس الاسم بقى يشاور على str: مسموح (dynamic).",
            "بس مفيش تحويل ضمني: TypeError (strong)."
          ],
          sol: R`هتلاقي [[id(a)]] و [[id(b)]] نفس الرقم بالظبط، و [[id(c)]] رقم تاني. يعني [[a]] و [[b]] اسمين لنفس الـ list، و [[c]] object جديد. والأرقام نفسها هتختلف كل مرة تشغّل فيها Python (هي عنوان في الذاكرة في CPython)، المهم مين زي مين. واختصارها: [[id(a) == id(b)]] هي هي [[a is b]] وبتطلع [[True]]، و [[id(a) == id(c)]] بتطلع [[False]].

ولما توصل لآخر سطر هتشوف [[TypeError: can only concatenate str (not "int") to str]]. لو اتلخبطت وتوقعت إن [[print(a)]] بعد [[c.append(5)]] هيطلع فيه 5، فده بالظبط الفرق: [[copy()]] عملت object جديد، فالتعديل عليه ميوصلش للأصل.`
        },
        {
          cmd: "mutable و immutable",
          title: "أنهي أنواع بتتعدّل مكانها، وأنهي لأ؟",
          desc: R`الأنواع اللي بتتعدّل مكانها (mutable): [[list]] و [[dict]] و [[set]] والـ objects بتاعتك. واللي مبتتعدّلش (immutable): [[int]] و [[float]] و [[str]] و [[tuple]] و [[frozenset]] و [[bool]] و [[None]].

«مبتتعدّلش» يعني أي عملية عليها بتطلّع object جديد: [[s.upper()]] مبتغيّرش [[s]]، بترجع string جديدة. وده بيفرق في حاجتين: الدوال اللي بتعدّل الـ list اللي جاتلها، ومفاتيح الـ dict اللي لازم تكون immutable (hashable).`,
          example: R`s = "sara"
s.upper()
print(s)                 # sara: الأصل متغيرش
s = s.upper()
nums = [3, 1, 2]
nums.sort()
print(nums)              # [1, 2, 3]: اتعدّلت مكانها
sorted_copy = sorted([3, 1, 2])
point = (30.0, 31.2)
point[0] = 1             # TypeError: 'tuple' object does not support item assignment
cache = {(30.0, 31.2): "Cairo"}
cache[[30.0, 31.2]] = "x"  # TypeError: unhashable type: 'list'`,
          try: R`اكتب دالة [[add_tag(tags, t)]] بتعمل [[tags.append(t)]]، وناديها على list وشوف الـ list الأصلية اتغيرت. وبعدين غيّرها تعمل [[tags = tags + [t]]] وشوف الفرق.`,
          flag: "script",
          deep: {
            why: R`لما تفهم الفرق ده، هتفهم ليه [[s.upper()]] «مش شغالة»، وليه list جوه dict اتغيرت من مكان تاني، وليه مينفعش تحط list مفتاح في dict. وده أساس سؤال الانترفيو الشهير عن الـ default argument (في أسئلة الانترفيو آخر التاب).`,
            how: R`الـ immutable object قيمته ثابتة طول عمره. [[s += "x"]] على string مبيعدّلش الـ string، بيعمل string جديدة ويربط [[s]] بيها. أما على list، [[+=]] بيعدّل مكانها (زي [[extend]]). عشان كده [[a += [1]]] و [[a = a + [1]]] مختلفين لو فيه اسم تاني بيشاور على نفس الـ list.

الـ methods اللي بتعدّل الـ list مكانها بترجع [[None]]: [[sort]] و [[append]] و [[reverse]]. واللي بترجع list جديدة: [[sorted()]] والـ slicing. أما [[reversed()]] فمبتعدّلش الأصل بس بترجع iterator مش list (لو عايز list: [[list(reversed(a))]] أو [[a[::-1]]]).

الـ dict والـ set مبنيين على hash table: المفتاح بيتحسبله [[hash()]] مرة ويتحط في خانة. لو المفتاح اتغير بعد ما اتحط، مكانه يبقى غلط. عشان كده المفاتيح لازم hashable، وده عمليًا immutable: str و int و tuple (لو كل اللي جواها hashable). والـ tuple نفسها immutable، بس لو جواها list، الـ list دي تتعدّل عادي.`,
            when: "tuple للقيم الثابتة اللي بتوصف حاجة واحدة (إحداثيات، صف من القاعدة، مفتاح مركّب في dict). list لمجموعة عناصر بتكبر وتصغر. و [[frozenset]] لو محتاج set كمفتاح.",
            mistakes: R`[[nums = nums.sort()]] فـ [[nums]] تبقى None. وتفتكر إن [[s.replace("a", "b")]] غيّرت s. وتعدّل list وانت بتلف عليها بـ for فتتخطى عناصر: لف على نسخة ([[for x in items[:]]]) أو اعمل list جديدة بـ comprehension.`
          },
          lines: [
            "string.",
            "بترجع string جديدة، والناتج ضاع لأننا محطناهوش في متغير.",
            "الأصل زي ما هو: str immutable.",
            "الصح: اربط الاسم بالناتج الجديد.",
            "list.",
            R`[[sort]] بتعدّل الـ list مكانها وبترجع [[None]].`,
            "اتعدّلت.",
            R`[[sorted]] بترجع list جديدة ومبتلمسش الأصل.`,
            "tuple: قيم ثابتة.",
            "ممنوع تتعدّل.",
            "الـ tuple ينفع مفتاح في dict لأنها hashable.",
            "الـ list لأ: ممكن تتغير فمكانها في الـ hash table يبوظ."
          ],
          sol: R`النسخة الأولى ([[tags.append(t)]]) بتعدّل الـ list الأصلية: لو ناديتها على [[my = ["python"]]] هتلاقي [[my]] بقت [[['python', 'api']]]، لأن الباراميتر اسم تاني لنفس الـ object و [[append]] بتعدّله مكانه.

النسخة التانية ([[tags = tags + [t]]]) مش هتغيّر حاجة برّه: [[my]] هتفضل [[['python']]]. الـ [[+]] بيعمل list جديدة، والتعيين بيربط الاسم المحلي [[tags]] بيها بس. فلو عايزها تفيد لازم [[return tags]] واللي نادى ياخد الناتج. وخد بالك: [[tags += [t]]] مش زي [[tags = tags + [t]]]؛ الـ [[+=]] على list بيعدّل مكانه، فهيغيّر الأصل زي [[append]].`,
          solCode: R`def add_tag(tags, t):
    tags.append(t)
my = ["python"]
add_tag(my, "api")
print(my)         # ['python', 'api']
def add_tag2(tags, t):
    tags = tags + [t]
    return tags
my = ["python"]
r = add_tag2(my, "api")
print(my, r)      # ['python'] ['python', 'api']`
        },
        {
          cmd: "type hints",
          title: "تكتب أنواع في Python: بتتفحص ولا لأ؟",
          desc: R`الـ type hints بتتكتب زي TypeScript: [[def get_user(user_id: int) -> User | None:]]. بس Python نفسه مبيفحصهاش وقت التشغيل: لو بعت string مكان int، الكود هيشتغل عادي لحد ما يقع في حتة تانية. اللي بيفحصها أدوات: mypy أو pyright (Pylance في VS Code).

إلا في FastAPI و Pydantic: هناك الأنواع ليها شغل حقيقي وقت التشغيل، FastAPI بيقراها ويفحص ويحوّل الـ request على أساسها. عشان كده في التاب ده الأنواع مش ديكور.

الصيغة الحديثة: [[list[int]]] و [[dict[str, int]]] و [[X | None]]، من غير [[from typing import List, Optional]].`,
          example: R`from typing import Literal
type UserId = int
type Role = Literal["admin", "user"]
def get_user(user_id: UserId, active: bool = True) -> dict[str, str] | None:
    return None
def first[T](items: list[T]) -> T | None:
    return items[0] if items else None
names: list[str] = []
scores: dict[str, float] = {}
role: Role = "admin"
get_user("5")  # بيشتغل عادي! Python مبيفحصش، بس mypy و Pylance بيعلّموا عليه`,
          try: R`سطّب [[pip install mypy]] وشغّل [[mypy file.py]] على المثال، وشوف الخطأ على آخر سطر. وبعدين [[python file.py]] وشوف إنه اشتغل عادي.`,
          flag: "script",
          deep: {
            why: "Python من غير أنواع سهل في سكربت صغير، بس في API فيه ٥٠ endpoint محدش فاكر الدالة دي بترجع إيه أو بتاخد إيه. الأنواع بتخلّي المحرر يكمّلك ويمسك الغلط، و FastAPI بيبني عليها الفحص والتوثيق.",
            how: R`الـ annotation بتتخزن ومحدش بيفحصها. وفي Python 3.14 (PEP 649) الـ annotations بقت بتتقيّم متأخر (lazy)، يعني مش محتاج [[from __future__ import annotations]] ولا تكتب النوع بين علامات تنصيص لما الكلاس لسه متعرّفش (forward reference). ومكتبات زي Pydantic و FastAPI بتقراها وقت التشغيل وتبني عليها الفحص.

التطور: من 3.9 [[list[int]]] مباشرة، ومن 3.10 [[int | None]]، ومن 3.12 [[type Alias = ...]] و generics بـ [[def first[T](...)]] من غير TypeVar. و [[Literal]] زي literal types في TS: قيم محددة بس.

ووقت التشغيل مفيش أي تحويل: [[get_user("5")]] بتوصل "5" string. الفحص الحقيقي بيحصل لو القيمة عدّت على Pydantic (المستوى ٢).`,
            when: "في أي كود هيعيش: باراميترات ونوع الرجوع لكل دالة، وأنواع الـ models. وشغّل mypy أو pyright في CI. السكربت اللي هترميه بعد ساعة مش لازم.",
            mistakes: R`[[Optional[str]]] تفتكرها «اختياري» وهي معناها [[str | None]] بس، والباراميتر لسه إجباري لو ملوش default. وتستخدم [[List]] و [[Dict]] من typing في كود جديد: شغالين بس طريقة قديمة. وتفتكر إن الـ hints بتحمي وقت التشغيل.`
          },
          lines: [
            R`[[Literal]] لقيم محددة بالاسم.`,
            R`اسم لنوع (Python 3.12+)، زي [[type]] في TS.`,
            "نوع قيمه اتنين بس.",
            R`باراميترات بأنواع، و [[->]] نوع الرجوع: dict أو None.`,
            "الجسم.",
            R`دالة generic بصيغة 3.12: [[T]] بيتحدد من الـ list اللي اتبعتت.`,
            "أول عنصر لو الـ list مش فاضية.",
            "متغير بنوعه، مفيد لما القيمة الأولى فاضية.",
            "dict مفاتيحه str وقيمه float.",
            "لازم تبقى واحدة من القيمتين (الفحص في mypy بس).",
            "Python بيشغّله عادي، والأدوات بس اللي بتعترض."
          ],
          sol: R`[[mypy file.py]] هيطلّع حاجة زي: [[file.py:11: error: Argument 1 to "get_user" has incompatible type "str"; expected "int"  [arg-type]]] وبعدها [[Found 1 error in 1 file]] وكود خروج 1. لاحظ إنه كتب [[int]] مش [[UserId]]، لأن [[type UserId = int]] اسم تاني لنفس النوع (alias) مش نوع جديد.

وبعدين [[python file.py]] هيشتغل ويخلص من غير أي رسالة وكود خروج 0. ودي الفكرة كلها: الـ hints للأدوات (mypy و Pylance) وPython نفسه بيتجاهلها وقت التشغيل. لو mypy مطلعش خطأ، اتأكد إنك شغّلته على الملف الصح وإن السطر [[get_user("5")]] موجود؛ ولو [[python]] رمى [[SyntaxError]] عند [[type]] أو [[first[T]]]، فإنت على Python أقدم من 3.12.`
        },
        {
          cmd: "f-strings",
          title: "تبني string من متغيرات وتنسّق الأرقام",
          desc: R`[[f"..."]] بتحط أي expression جوه [[{}]]: [[f"Hi {name}"]]. وبعد [[:]] تنسيق: [[{price:.2f}]] رقمين عشريين، و [[{n:,}]] فواصل الآلاف، و [[{x=}]] بيطبع الاسم والقيمة (للـ debugging).

وأهم methods للـ strings: [[split]] و [[join]] و [[strip]] و [[startswith]] و [[replace]]، و [[in]] للبحث.`,
          example: R`name, price, qty = "Sara", 1234.5, 3
print(f"{name} دفعت {price * qty:,.2f} جنيه")
print(f"{qty=}")                  # qty=3
print(f"{'id':<6}|{'name':>10}|")
tags = " python, fastapi ,api "
clean = [t.strip() for t in tags.split(",")]
print(", ".join(clean))           # python, fastapi, api
print("fast" in "fastapi", "a.py".endswith(".py"))
path = r"C:\new\folder"`,
          try: R`اطبع [[f"{3.14159:.3f}"]] و [[f"{0.256:.1%}"]] و [[f"{42:05d}"]]، وخمّن الناتج قبل ما تشوفه.`,
          flag: "script",
          deep: {
            why: R`الـ strings في كل حتة: رسايل لوج، و keys في Redis، وأسماء ملفات، وردود. الـ f-strings أسرع وأوضح من [[+]] و [[%]] و [[.format()]].`,
            how: R`الـ f-string بتتقيّم وقت التنفيذ: أي expression ينفع جوه القوسين، حتى نداء دالة. ومن 3.12 (PEP 701) تقدر تستخدم نفس نوع علامة التنصيص جوه ([[f"{d["key"]}"]]).

بعد [[:]] الـ format spec: [[,]] فواصل، و [[.2f]] عشريين، و [[<]] و [[>]] و [[^]] محاذاة، و [[%]] نسبة. و [[!r]] بيستخدم [[repr]]، فبيبيّن علامات التنصيص والمسافات المخفية.

[[join]] method على الفاصل مش على الـ list: [[", ".join(items)]]، والعناصر لازم تكون strings. وتجميع strings بـ [[+=]] في loop كبير بطيء؛ جمّعها في list واعمل join.

و [[r"..."]] raw string: الـ backslash بيفضل زي ما هو، مفيد للـ regex ومسارات ويندوز.

وفي 3.14 فيه template strings: [[t"..."]] شبه f-string بس بترجع object من نوع [[Template]] مش string، فالمكتبة تقدر تعمل escape لكل قيمة قبل ما تتحط (للـ SQL و HTML). لسه جديدة، بس اعرف إنها موجودة.`,
            when: R`أي string فيها متغيرات. استثناءين مهمين: رسايل الـ logging ([[log.info("user %s", uid)]]، درس logging في المستوى ٣)، والـ SQL (باراميترات، مش f-string أبدًا).`,
            mistakes: R`[[f"SELECT * FROM users WHERE id = {user_id}"]]: SQL injection (درس asyncpg). وتنسى الـ f فيطلع [[{name}]] حرفيًا. و float للفلوس: [[0.1 + 0.2]] بيطلع [[0.30000000000000004]]، فالفلوس تتخزن [[Decimal]] أو قروش كـ int.`
          },
          lines: [
            "كذا متغير في سطر (tuple unpacking).",
            R`expression جوه القوسين، و [[:,.2f]] فواصل آلاف ورقمين عشريين.`,
            R`[[=]] بيطبع اسم المتغير وقيمته: مفيد وانت بتدوّر على bug.`,
            R`محاذاة: [[<6]] شمال في ٦ خانات، و [[>10]] يمين في ١٠.`,
            "string فيها مسافات زيادة.",
            "قسّم على الفاصلة وشيل المسافات من كل حتة.",
            R`[[join]] على الفاصل، والعناصر strings.`,
            R`[[in]] للبحث، و [[endswith]] للنهاية.`,
            "raw string: الـ backslash مش escape."
          ],
          sol: R`الناتج: [[3.142]] و [[25.6%]] و [[00042]].

[[.3f]] يعني ٣ أرقام بعد العلامة مع تقريب (فـ 3.14159 بقت 3.142 مش 3.141). و [[.1%]] بيضرب في 100 ويحط علامة % برقم واحد بعد العلامة. و [[05d]] يعني عدد صحيح عرضه ٥ ويتملى أصفار من الشمال. الغلطة المشهورة إنك تتوقع [[0.3%]] من [[.1%]]، ناسي إنه بيضرب في 100 لوحده، فمتضربش إنت كمان.`
        }
      ]
    },
    {
      t: "التحكم في السير",
      l: 1,
      n: "if و elif، و for و range، و while و break، و match-case، وتمارين تثبّت بيها الأساسيات",
      items: [
        {
          cmd: "if و elif و else",
          title: "تاخد قرار: if و elif و else",
          desc: R`[[if]] بيشغّل البلوك لو الشرط صح، و [[elif]] (اختصار else if) بيجرّب شرط تاني لو اللي قبله غلط، و [[else]] لو ولا شرط اتحقق. البلوك بيتحدد بالمسافات (٤ مسافات)، مش بأقواس زي JS، والسطر اللي قبل البلوك بيخلص بـ [[:]].

والشروط بتتركب بـ [[and]] و [[or]] و [[not]] (كلمات، مش [[&&]] و [[||]])، والمقارنات بتتسلسل: [[18 <= age < 60]]. وأي قيمة ينفع تبقى شرط: الفاضي ([[0]] و [[""]] و [[[]]] و [[{}]] و [[None]]) معناه False، وأي حاجة تانية True.`,
          example: R`age, role = 20, "editor"
if age < 13:
    label = "طفل"
elif age < 18:
    label = "مراهق"
else:
    label = "بالغ"
print(label)                              # بالغ
if role == "admin" or (role == "editor" and age >= 18):
    print("يقدر ينشر")
if 18 <= age < 60:
    print("سن الشغل")
cart = []
if not cart:
    print("العربية فاضية")
status = "active" if age >= 18 else "pending"
if (n := len(role)) > 5:
    print(f"اسم الدور طويل: {n} حروف")`,
          try: R`اكتب دالة [[grade(score)]] بترجع A لو 90 وفوق، و B من 80، و C من 70، و D من 50، و F لأقل من كده، وترمي [[ValueError]] لو الدرجة برّه 0 لـ 100. جرّبها على 95 و 85 و 72 و 50 و 49 و 101.`,
          sol: R`الناتج المتوقع: [[95 A]] و [[85 B]] و [[72 C]] و [[50 D]] و [[49 F]]، و 101 بتطلع [[score out of range: 101]]. الترتيب هو المفتاح: الشروط بتتفحص من فوق لتحت وأول واحد يتحقق بيكسب، فبتبدأ من الأعلى. لو بدأت بـ [[if score >= 50]] كل الدرجات من 50 لـ 100 هتطلع D.

الفحص بتاع المدى في الأول (guard clause) بيخلي باقي الدالة تفترض إن الدرجة سليمة. و [[return "F"]] في الآخر من غير else كفاية، لأن كل الفروع اللي فوق فيها return. والغلطة التانية المشهورة: [[if score > 90]] بدل [[>=]]، فالـ 90 نفسها تطلع B. اختبر الحدود دايمًا (90 و 80 و 50) مش أرقام في النص بس.`,
          solCode: R`def grade(score: int) -> str:
    if not 0 <= score <= 100:
        raise ValueError(f"score out of range: {score}")
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 50:
        return "D"
    return "F"
for s in [95, 85, 72, 50, 49]:
    print(s, grade(s))
try:
    grade(101)
except ValueError as e:
    print("خطأ:", e)`,
          flag: "script",
          deep: {
            why: R`أي منطق في أي برنامج قرارات: المستخدم أدمن؟ الطلب فوق حد الشحن المجاني؟ الكوبون منتهي؟ ولو فهمت الـ truthiness صح، هتكتب [[if not items]] بدل [[if len(items) == 0]]، وهتعرف إمتى ده خطر.`,
            how: R`Python بيقيّم الشرط ويحوّله لـ bool بـ [[bool(x)]]: الأرقام صفر، والـ strings والـ collections الفاضية، و [[None]] كلهم False. وأي object تاني True إلا لو الـ class بتاعه عرّف [[__bool__]] أو [[__len__]].

[[and]] و [[or]] بيقفوا بدري (short-circuit) وبيرجعوا واحدة من القيمتين مش True/False: [[name or "ضيف"]] بترجع [[name]] لو مش فاضي، وإلا "ضيف". و [[a < b < c]] معناها [[a < b and b < c]] و [[b]] بيتحسب مرة واحدة.

[[x if cond else y]] (conditional expression) بتختار قيمة في سطر واحد، زي الـ ternary في JS. و [[:=]] (walrus، من 3.8) بيعيّن ويرجّع القيمة في نفس الوقت، فتقدر تحسب وتفحص في الشرط نفسه من غير ما تكرر الحسبة.

المسافات جزء من اللغة: خلط tabs ومسافات أو مسافة ناقصة بيطلّع [[IndentationError]]. وفي Python مفيش [[switch]] قديم، بس فيه [[match]] (درس «match و case»).`,
            when: R`[[if/elif/else]] لأي قرار. لو عندك سلسلة [[elif]] طويلة بتقارن نفس المتغير بقيم ثابتة، غالبًا dict (قيمة لكل مفتاح) أو [[match]] أوضح. ولو البلوك بقى متداخل ٣ مستويات، اقلب الشروط واخرج بدري بـ [[return]].`,
            mistakes: R`[[if x = 5]] (ده SyntaxError، المقارنة [[==]]). و [[if role == "admin" or "editor"]]: دي دايمًا True لأن "editor" string مش فاضية؛ الصح [[role in ("admin", "editor")]]. و [[if count:]] لما القيمة ممكن تبقى 0 وده رقم صالح؛ اكتب [[if count is not None]]. وفي الانترفيو: «إيه ناتج [[[] or 0 or "x"]]؟» الإجابة "x"، لأن [[or]] بيرجع أول قيمة truthy.`
          },
          lines: [
            "متغيرين في سطر واحد.",
            R`أول شرط، والسطر بيخلص بـ [[:]].`,
            "البلوك: ٤ مسافات.",
            R`[[elif]]: بيتفحص بس لو اللي قبله طلع False.`,
            "البلوك بتاعه.",
            R`[[else]]: لو ولا شرط اتحقق.`,
            "البلوك بتاعه.",
            "بالغ: وصلنا للـ else.",
            R`[[or]] و [[and]] كلمات، والأقواس بتوضح الترتيب.`,
            "جوه الـ if.",
            R`مقارنة متسلسلة: زي [[18 <= age and age < 60]].`,
            "جوه الـ if.",
            "list فاضية.",
            R`الفاضي falsy، فـ [[not cart]] بقت True.`,
            "جوه الـ if.",
            "اختيار قيمة في سطر (زي الـ ternary في JS).",
            R`[[:=]] بيحسب الطول ويحطه في [[n]] ويفحصه في نفس الوقت.`,
            R`[[n]] متاحة جوه البلوك.`
          ]
        },
        {
          cmd: "for و range",
          title: "تلف على حاجة: for و range و enumerate و zip",
          desc: R`[[for x in something:]] بتلف على أي iterable: list أو string أو dict أو ملف. مفيش [[for (i = 0; i < n; i++)]] زي JS؛ لو محتاج أرقام: [[range(n)]] من 0 لحد قبل n، و [[range(start, stop, step)]]، والـ stop مش داخل.

ولو محتاج الـ index مع العنصر: [[enumerate]]. ولو بتلف على كذا list مع بعض: [[zip]]. وعلى dict: [[.items()]] للمفتاح والقيمة.`,
          example: R`for i in range(3):
    print(i)                                  # 0 ثم 1 ثم 2
print(list(range(2, 11, 2)))                  # [2, 4, 6, 8, 10]
print(list(range(5, 0, -1)))                  # [5, 4, 3, 2, 1]
names = ["Sara", "Omar", "Ali"]
for name in names:
    print(name.upper())
for i, name in enumerate(names, start=1):
    print(f"{i}. {name}")
prices = [120, 80, 45]
for name, price in zip(names, prices, strict=True):
    print(name, price)
stock = {"tea": 3, "coffee": 0}
for item, qty in stock.items():
    print(item, qty)
for ch in "abc":
    print(ch, end=" ")
print()
total = 0
for p in prices:
    total += p
print(total, sum(prices))                     # 245 245`,
          try: R`اطبع جدول ضرب ٧ من 1 لـ 10 بالشكل ده بالظبط: [[7 x  1 =  7]] (الأرقام محاذية يمين). وبعدين اطبع الأرقام الزوجية من 20 لـ 2 تنازلي بـ [[range]] واحد. وفي الآخر، بـ loop جوه loop، اطبع جدول ضرب صغير ٣×٣.`,
          sol: R`الأعمدة بتتظبط بـ [[:>2]] في الـ f-string، فالسطر العاشر يطلع [[7 x 10 = 70]] بنفس عرض الأول. والأرقام الزوجية: [[range(20, 0, -2)]] بتطلّع [[[20, 18, ..., 2]]]؛ الـ stop هو 0 عشان 2 تبقى داخلة (لو كتبت 2 مكان 0 هتقف عند 4). وهي دي أشهر غلطة في [[range]]: الـ stop مش داخل.

والجدول ٣×٣: الـ loop الخارجي للصفوف والداخلي للأعمدة، وكل صف بيتجمع في string ويتطبع مرة واحدة، فتشوف [[1 2 3]] و [[2 4 6]] و [[3 6 9]]. لو طبعت جوه الـ loop الداخلي من غير [[end=""]] هيطلع كل رقم في سطر.`,
          solCode: R`for i in range(1, 11):
    print(f"7 x {i:>2} = {7 * i:>2}")
print(list(range(20, 0, -2)))
for row in range(1, 4):
    line = ""
    for col in range(1, 4):
        line += f"{row * col:>4}"
    print(line)`,
          flag: "script",
          deep: {
            why: R`اللف على داتا هو نص شغلك: صفوف من القاعدة، سطور ملف، عناصر request. ولو كتبت [[for i in range(len(items))]] وبعدين [[items[i]]] زي لغات تانية، الكود هيشتغل بس هيبان إنه مش Python، والـ reviewer هيقولك enumerate.`,
            how: R`الـ for بتنادي [[iter()]] على الحاجة اللي بتلف عليها، وبعدين [[next()]] لحد ما يترمي [[StopIteration]]. عشان كده أي حاجة iterable بتشتغل: الـ string حرف حرف، والـ dict مفاتيحه، والملف سطر سطر، والـ generator قيمة قيمة.

[[range]] مش list: object خفيف بيحسب الأرقام وقت الطلب، فـ [[range(10**9)]] مبياخدش ذاكرة. و [[list(range(...))]] لو عايز تشوفها.

[[enumerate(items, start=1)]] بيرجع أزواج (index, عنصر)، و [[zip(a, b)]] أزواج من الاتنين وبيقف عند الأقصر، و [[strict=True]] (3.10+) بيرمي [[ValueError]] لو الأطوال مختلفة بدل ما يقطع في صمت.

والمتغير بتاع الـ for بيفضل موجود بعد الـ loop بآخر قيمة (مفيش block scope في Python، درس «scope و LEGB»). و [[print(x, end=" ")]] بيغيّر آخر السطر من newline لمسافة.`,
            when: R`[[for]] لما عندك حاجة تلف عليها أو عدد مرات معروف. و [[while]] لما مش عارف هتلف كام مرة (الدرس الجاي). ولو الـ loop بيبني list جديدة من list: comprehension (قسم «lists و dicts و sets»). ولو بتجمع أرقام: [[sum]] و [[max]] و [[min]] بدل loop.`,
            mistakes: R`[[range(1, 10)]] وتستنى الـ 10 تبقى داخلة. وتعدّل الـ list وانت بتلف عليها (تمسح عناصر) فتتخطى عناصر. و [[for i in range(len(items))]] بدل [[enumerate]]. و [[zip]] على ليستتين أطوالهم مختلفة من غير [[strict=True]] فالبيانات تتقطع من غير أي خطأ.`
          },
          lines: [
            R`[[range(3)]]: 0 و 1 و 2، والـ 3 مش داخلة.`,
            "جسم الـ loop.",
            R`بداية ونهاية وخطوة: الزوجي من 2 لـ 10.`,
            "خطوة سالبة: عدّ تنازلي.",
            "list أسماء.",
            "لف على العناصر نفسها، من غير index.",
            "جسم الـ loop.",
            R`[[enumerate]]: الـ index مع العنصر، والعد من 1.`,
            "جسم الـ loop.",
            "list أسعار.",
            R`[[zip]] بيلف على الاتنين مع بعض، و [[strict=True]] بيرمي لو الأطوال مختلفة.`,
            "جسم الـ loop.",
            "dict.",
            R`[[.items()]]: المفتاح والقيمة مع بعض.`,
            "جسم الـ loop.",
            "الـ string كمان iterable: حرف حرف.",
            R`[[end=" "]] بدل سطر جديد.`,
            "سطر جديد في الآخر.",
            "مجموع بإيدك.",
            "لف على الأسعار.",
            R`[[+=]] بيزوّد على المجموع.`,
            R`نفس النتيجة بـ [[sum]]: الأقصر والأوضح.`
          ]
        },
        {
          cmd: "while و break و continue",
          title: "تلف لحد ما شرط يتحقق: while و break و continue و else",
          desc: R`[[while cond:]] بتلف طول ما الشرط صح، وده للحالات اللي مش عارف فيها هتلف كام مرة: محاولات، قراية input، retry. و [[break]] بيخرج من الـ loop فورًا، و [[continue]] بيسيب اللفة دي ويروح للي بعدها.

وفي Python حاجة مش موجودة في لغات كتير: [[else]] بعد الـ for أو الـ while، وبتشتغل لو الـ loop خلص عادي من غير [[break]]. مفيدة جدًا في البحث: «لفّيت على الكل وملقيتش».`,
          example: R`attempts = 0
while attempts < 3:
    attempts += 1
    print("محاولة", attempts)
nums = [4, 7, -1, 9, 0, 12]
for n in nums:
    if n < 0:
        continue
    if n == 0:
        break
    print(n)                                  # 4 ثم 7 ثم 9
users = ["sara", "omar"]
for u in users:
    if u == "ali":
        print("لقيته")
        break
else:
    print("مش موجود")
while True:
    cmd = input("> ").strip()
    if cmd == "q":
        break
    print("انت كتبت", cmd)`,
          try: R`اعمل لعبة تخمين: [[random.randint(1, 20)]] رقم سري، واللاعب عنده ٥ محاولات. لو كتب حاجة مش رقم، اطبع «اكتب رقم» ومتحسبهاش محاولة ([[continue]]). لو خمّن صح، اطبع عدد المحاولات واخرج ([[break]]). ولو المحاولات خلصت، اطبع الرقم في [[else]] بتاعة الـ while.`,
          sol: R`لو شغّلته وكتبت [[x]] الأول، هتشوف «اكتب رقم» والعداد لسه على محاولة 1، لأن الـ [[continue]] جه قبل [[tries += 1]]. وكل تخمين غلط بيطبع «أكبر» أو «أصغر». ولو خمّنت صح بيطبع [[صح! في 3 محاولات]] مثلًا ويخرج، والـ [[else]] مش بتشتغل لأن الخروج كان بـ [[break]]. ولو خلّصت الخمسة، الـ while بتخلص عادي فالـ [[else]] تشتغل وتطبع الرقم.

عشان تجرّبها من غير ما تكتب بإيدك: [[printf "x\n10\n5\n15\n1\n20\n" | python3 guess.py]]. الغلطات المشهورة: [[tries += 1]] قبل فحص الرقم (فالـ input الغلط ياكل محاولة)، أو [[int(input())]] مباشرة فالـ [[x]] يوقّع البرنامج بـ [[ValueError]]، أو تنسى تزوّد العداد فتلف للأبد.`,
          solCode: R`import random
secret = random.randint(1, 20)
tries = 0
while tries < 5:
    raw = input(f"خمّن (محاولة {tries + 1} من 5): ").strip()
    if not raw.isdigit():
        print("اكتب رقم")
        continue
    tries += 1
    guess = int(raw)
    if guess == secret:
        print(f"صح! في {tries} محاولات")
        break
    print("أكبر" if guess < secret else "أصغر")
else:
    print(f"خسرت، الرقم كان {secret}")`,
          flag: "script",
          deep: {
            why: R`retry لطلب شبكة لحد ٣ مرات، و polling لحد ما job تخلص، و REPL صغير بيقرا أوامر: كلها while. و [[for/else]] سؤال انترفيو محبوب لأن ناس كتير بتكتب Python سنين ومتعرفهاش.`,
            how: R`الـ while بتفحص الشرط قبل كل لفة. لو الشرط مبيتغيرش جوه الـ loop، هتلف للأبد (Ctrl+C يوقفها). [[while True:]] مع [[break]] جوه هو الشكل المعتاد لما شرط الخروج في النص مش في الأول.

[[break]] و [[continue]] بيأثروا على أقرب loop بس. لو عندك loop جوه loop وعايز تخرج من الاتنين، حط الاتنين في دالة واعمل [[return]].

الـ [[else]] بتاعة الـ loop بتشتغل لما الـ loop «يخلص طبيعي»: الـ for خلصت العناصر أو شرط الـ while بقى False. لو خرجت بـ [[break]] أو [[return]] أو exception، مش بتشتغل. فكّر فيها كـ «nobreak».

[[input()]] بيقرا سطر من الكيبورد (أو من pipe) من غير الـ newline، وبيرجع string دايمًا.`,
            when: R`[[while]] لما عدد اللفات مش معروف. لو بتلف على عناصر: [[for]]. و [[for/else]] للبحث اللي محتاج تعرف فيه «ملقيتش». وفي كود الإنتاج، الـ retry والـ polling لازم يبقى ليهم حد أقصى ووقت انتظار بين المحاولات، مش [[while True]] مفتوحة.`,
            mistakes: R`loop لانهائي لأنك نسيت تغيّر المتغير اللي في الشرط. و [[while True]] من غير [[break]] واضح. وتفتكر إن [[else]] بتاعة الـ loop بتشتغل «لو الـ loop مالفّش ولا مرة» (غلط: بتشتغل لو مفيش break). و retry من غير sleep بيضرب السيرفر ١٠٠٠ مرة في الثانية.`
          },
          lines: [
            "عداد.",
            "لف طول ما الشرط صح.",
            "غيّر العداد، وإلا هتلف للأبد.",
            "جسم الـ loop.",
            "أرقام فيها سالب وصفر.",
            "لف عليها.",
            "لو سالب...",
            R`...[[continue]]: سيب اللفة دي وروح للي بعدها.`,
            "لو صفر...",
            R`...[[break]]: اخرج من الـ loop خالص (والـ 12 مش هتتطبع).`,
            "اللي وصل هنا بيتطبع.",
            "ليستة مستخدمين.",
            "دوّر على ali.",
            "لو لقيته...",
            "اطبع.",
            "واخرج.",
            R`[[else]] بتاعة الـ for: بتشتغل لو مفيش break حصل.`,
            "ملقيناهوش.",
            R`loop مفتوح، والخروج من جوه.`,
            R`[[input]] بيقرا سطر ويرجّعه string، و [[strip]] بيشيل المسافات.`,
            "أمر الخروج؟",
            "اخرج.",
            "غير كده اطبع اللي اتكتب."
          ]
        },
        {
          cmd: "match و case",
          title: "match-case: switch ولا أكتر؟",
          desc: R`[[match]] (من Python 3.10) بيقارن قيمة بـ patterns بالترتيب، وأول [[case]] يطابق بيشتغل. ممكن يبقى زي switch عادي ([[case 200 | 201:]])، بس قوته في إنه بيفك الشكل: [[case ["go", direction]:]] بتطابق list من عنصرين أولهم "go"، وبتحط التاني في [[direction]]. ونفس الكلام مع الـ dicts والـ classes.

و [[case _:]] هي الـ default، و [[if]] بعد الـ pattern (guard) شرط زيادة.`,
          example: R`def handle(cmd: str) -> str:
    match cmd.split():
        case ["go", direction]:
            return f"رايح {direction}"
        case ["take", *items] if items:
            return f"خدت {', '.join(items)}"
        case ["quit" | "exit"]:
            return "باي"
        case []:
            return "مفيش أمر"
        case _:
            return f"مش فاهم: {cmd}"
print(handle("go north"), handle("take key lamp"), handle("exit"), handle(""))
def describe(event: dict) -> str:
    match event:
        case {"type": "order", "total": int(total)} if total > 1000:
            return f"طلب كبير {total}"
        case {"type": "order", "total": total}:
            return f"طلب {total}"
        case {"type": "refund", "id": str(oid)}:
            return f"استرجاع {oid}"
        case _:
            return "حدث مش معروف"
print(describe({"type": "order", "total": 1500, "user": 7}))
status = 404
match status:
    case 200 | 201:
        print("تمام")
    case 400 | 404 as code:
        print("غلطة من العميل", code)
    case _:
        print("حاجة تانية")`,
          try: R`اكتب [[route(method, path)]] بـ [[match]] على tuple من الـ method والـ path مقسوم على [[/]]: GET على [[/users]] ترجع «list users»، و GET على [[/users/7]] ترجع «show user 7» بس لو الـ id أرقام، و POST على [[/users]] «create user»، و DELETE على [[/users/7]] «delete user 7». أي حاجة تانية تحت [[/users]] ترجع «405 or 404»، والباقي «404 not found». جرّب [[("get", "/users/7/")]] و [[("DELETE", "/users/abc")]].`,
          sol: R`الناتج المتوقع: [[GET /users -> list users]]، و [[get /users/7/ -> show user 7]] (لأن [[method.upper()]] و [[path.strip("/")]] بيوحّدوا الشكل)، و [[POST /users -> create user]]، و [[DELETE /users/abc -> 405 or 404]] (الـ guard [[if uid.isdigit()]] رفض)، و [[GET /orders -> 404 not found]].

الترتيب مهم: الـ case العام [[_, ["users", *_]]] لازم ييجي بعد كل الحالات المحددة، وإلا هيمسكها قبلهم. والحتة اللي بتلخبط: [[uid]] في الـ pattern مش مقارنة، ده اسم بيتربط بأي قيمة في المكان ده، والفحص الحقيقي في الـ guard. ولو كتبت [[case "GET", ["users", 7]]] مش هتطابق أبدًا، لأن الـ path بعد split strings مش أرقام. ده بالظبط اللي FastAPI بيعمله لك في الـ path parameters (درس «path و query»).`,
          solCode: R`def route(method: str, path: str) -> str:
    match method.upper(), path.strip("/").split("/"):
        case "GET", ["users"]:
            return "list users"
        case "GET", ["users", uid] if uid.isdigit():
            return f"show user {int(uid)}"
        case "POST", ["users"]:
            return "create user"
        case "DELETE", ["users", uid] if uid.isdigit():
            return f"delete user {int(uid)}"
        case _, ["users", *_]:
            return "405 or 404"
        case _:
            return "404 not found"
for m, p in [("GET", "/users"), ("get", "/users/7/"), ("POST", "/users"),
             ("DELETE", "/users/abc"), ("GET", "/orders")]:
    print(m, p, "->", route(m, p))`,
          flag: "script",
          deep: {
            why: R`أوامر CLI، و events من webhook بأنواع مختلفة، ورسايل JSON شكلها بيختلف حسب [[type]]: بدل [[if]] طويلة فيها [[isinstance]] و [[len]] و [[.get]]، الـ pattern بيقول الشكل اللي مستنيه ويطلّع القيم في خطوة واحدة.`,
            how: R`أنواع الـ patterns: literal ([[200]] و [["quit"]])، و capture (اسم عادي زي [[direction]] بيتربط بأي قيمة)، و wildcard ([[_]] يطابق أي حاجة ومبيربطش)، و OR ([[|]])، و sequence ([[[a, b, *rest]]])، و mapping ([[{"type": "order", "total": t}]] وبيطابق حتى لو في الـ dict مفاتيح زيادة)، و class ([[int(total)]] أو [[Point(x=0)]] بيفحص النوع). و [[as]] بيربط اسم باللي طابق.

أهم فخ: الاسم العادي في الـ case دايمًا capture، مش مقارنة بمتغير. [[case NOT_FOUND:]] بتطابق أي قيمة وتحطها في [[NOT_FOUND]]! ولو بعدها cases، Python بيرفض بـ [[SyntaxError: name capture 'NOT_FOUND' makes remaining patterns unreachable]]، ولو هي الأخيرة بتعدّي بهدوء. عشان تقارن بثابت استخدم اسم فيه نقطة: [[case Status.NOT_FOUND:]] أو [[case http.HTTPStatus.NOT_FOUND:]] (درس «Enum»).

الـ string مش بتطابق sequence pattern (عشان [["go"]] متتفكّش لحروف)، و الـ match مش بيرمي لو مفيش case طابق، ببساطة مبيعملش حاجة.`,
            when: R`لما بتفرّق على شكل الداتا مش على قيمة بس: أوامر، و events، و AST، و ردود API مختلفة. لقيمة واحدة بتقارنها بـ ٣ ثوابت، [[if/elif]] أو dict كفاية ومش محتاج match.`,
            mistakes: R`[[case NOT_FOUND:]] بثابت من غير نقطة (capture مش مقارنة). ونسيان [[case _:]] فحالات غير متوقعة تعدّي من غير أي حاجة. وترتيب case عام قبل الخاص. وتفتكر إن mapping pattern بيشترط المفاتيح بالظبط (هو بيقبل الزيادة؛ لو عايز ترفضها: [[{"type": t, **rest}]] وافحص إن [[rest]] فاضي).`
          },
          lines: [
            "دالة بتفهم أوامر نصية.",
            "match على list الكلمات.",
            R`list من عنصرين أولهم "go"، والتاني بيتحط في [[direction]].`,
            "رجّع.",
            R`"take" وبعدها أي عدد، و [[if items]] شرط زيادة (guard).`,
            "رجّع.",
            R`كلمة واحدة: quit أو exit ([[|]] يعني أو).`,
            "رجّع.",
            "list فاضية: مفيش كلام.",
            "رجّع.",
            R`[[_]]: أي حاجة تانية (الـ default).`,
            "رجّع.",
            "أربع نداءات، كل واحد بيطابق case مختلف.",
            "دالة بتفهم events على شكل dict.",
            "match على الـ dict.",
            R`dict فيه type و total، و [[int(total)]] بيشترط إنه int، والـ guard فوق 1000.`,
            "رجّع.",
            "نفس الشكل من غير شرط: أي total.",
            "رجّع.",
            R`[[str(oid)]]: الـ id لازم string.`,
            "رجّع.",
            "أي event تاني.",
            "رجّع.",
            R`الـ dict فيه مفتاح زيادة (user) وبرضه طابق.`,
            "كود HTTP.",
            "match زي switch.",
            "واحد من الاتنين.",
            "جوه الـ case.",
            R`[[as code]] بيربط القيمة اللي طابقت باسم.`,
            "جوه الـ case.",
            "الباقي.",
            "جوه الـ case."
          ]
        },
        {
          cmd: "تمارين الأساسيات",
          title: "١٠ تمارين متدرجة على الأساسيات",
          desc: R`قبل ما تكمّل للدوال والـ classes، ثبّت الأساسيات بعشر تمارين من السهل للأصعب. كل تمرين دالة صغيرة، وتختبرها بـ [[assert]]: لو الشرط غلط البرنامج يقف بـ [[AssertionError]]، ولو كله صح يطبع رسالتك في الآخر.

حاول تحل كل تمرين بنفسك الأول بـ if و for و while بس، ومتفتحش الحل غير لما الـ asserts بتاعتك تعدّي أو تقف ربع ساعة.`,
          example: R`def sum_digits(n: int) -> int:
    total = 0
    for ch in str(abs(n)):
        total += int(ch)
    return total
assert sum_digits(9045) == 18
assert sum_digits(0) == 0
assert sum_digits(-12) == 3, "السالب كمان"
print("كل الاختبارات عدّت")`,
          try: R`اكتب الدوال دي في ملف واحد، وتحت كل واحدة asserts زي المثال:

١. [[fizzbuzz(n)]] بترجع list من 1 لـ n: "Fizz" لمضاعفات 3، و "Buzz" لمضاعفات 5، و "FizzBuzz" للاتنين، والباقي الرقم كـ string.
٢. [[sum_digits(n)]] مجموع أرقام عدد، والسالب كمان ([[-12]] ترجع 3).
٣. [[count_vowels(s)]] عدد الحروف المتحركة الإنجليزي (a e i o u) كبيرة وصغيرة.
٤. [[largest(nums)]] أكبر رقم من غير [[max]]، وترمي [[ValueError]] لو الليستة فاضية.
٥. [[is_palindrome(s)]] بتتجاهل المسافات والعلامات والحروف الكبيرة: [["Was it a car or a cat I saw?"]] ترجع True.
٦. [[reverse_words(s)]] بتعكس ترتيب الكلمات وتشيل المسافات الزيادة.
٧. [[second_largest(nums)]] تاني أكبر رقم مختلف: [[[5, 9, 9, 3]]] ترجع 5، و [[[7, 7]]] ترجع None، ومن غير ما ترتّب.
٨. [[top_word(text)]] أكتر كلمة متكررة وعددها كـ tuple، بـ dict و loop.
٩. [[is_prime(n)]]، واستخدمها تطلّع الأعداد الأولية أقل من 30.
١٠. [[two_sum(nums, target)]] بترجع indexes رقمين مجموعهم target، في لفة واحدة (O(n)) مش loopين.`,
          sol: R`لو كل حاجة صح هتشوف [[العشرة عدّوا]]. الحل الكامل تحت، وأهم النقط في كل تمرين:

١. افحص 15 الأول، لأن لو بدأت بـ 3 مضاعفات الـ 15 هتطلع "Fizz". ٢. [[str(abs(n))]] ولف على الحروف، والغلطة إنك تنسى [[abs]] فالـ [["-"]] توقّع [[int()]]. ٣. [[s.lower()]] مرة واحدة و [[ch in "aeiou"]]. ٤. ابدأ بأول عنصر مش بـ 0، وإلا [[[-5, -2]]] ترجع 0 وهو مش في الليستة.

٥. نضّف الحروف بـ [[isalnum()]] وقارن بالعكس [[[::-1]]]. ٦. [[split()]] من غير باراميتر بتشيل أي عدد مسافات، و [[split(" ")]] بتطلّع strings فاضية. ٧. متغيرين [[first]] و [[second]] بيبدأوا [[None]]، والشرط [[n != first]] هو اللي بيحل التكرار؛ [[sorted(nums)[-2]]] بيرجع 9 غلط لـ [[[5, 9, 9, 3]]].

٨. [[counts.get(word, 0) + 1]] و [[max(counts, key=counts.get)]]. ٩. كفاية تقسم لحد الجذر ([[i * i <= n]])، وافتكر إن 0 و 1 مش أوليين. ١٠. dict بيحفظ كل رقم شفته ومكانه، ولكل رقم بتسأل «المكمّل بتاعه ([[target - n]]) شفته قبل كده؟»: لفة واحدة. ده سؤال انترفيو كلاسيكي، والحل بـ loopين O(n²) بيتقبل كبداية بس الـ interviewer هيسألك تحسّنه.`,
          solCode: R`# ١. FizzBuzz
def fizzbuzz(n: int) -> list[str]:
    out = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            out.append("FizzBuzz")
        elif i % 3 == 0:
            out.append("Fizz")
        elif i % 5 == 0:
            out.append("Buzz")
        else:
            out.append(str(i))
    return out
# ٢. مجموع الأرقام
def sum_digits(n: int) -> int:
    total = 0
    for ch in str(abs(n)):
        total += int(ch)
    return total
# ٣. عدّ الحروف المتحركة
def count_vowels(s: str) -> int:
    return sum(1 for ch in s.lower() if ch in "aeiou")
# ٤. أكبر رقم من غير max
def largest(nums: list[int]) -> int:
    if not nums:
        raise ValueError("empty list")
    best = nums[0]
    for n in nums[1:]:
        if n > best:
            best = n
    return best
# ٥. palindrome
def is_palindrome(s: str) -> bool:
    clean = [ch.lower() for ch in s if ch.isalnum()]
    return clean == clean[::-1]
# ٦. اعكس الكلمات
def reverse_words(s: str) -> str:
    return " ".join(reversed(s.split()))
# ٧. تاني أكبر رقم مختلف
def second_largest(nums: list[int]) -> int | None:
    first = second = None
    for n in nums:
        if first is None or n > first:
            first, second = n, first
        elif n != first and (second is None or n > second):
            second = n
    return second
# ٨. أكتر كلمة متكررة
def top_word(text: str) -> tuple[str, int]:
    counts: dict[str, int] = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    best = max(counts, key=counts.get)
    return best, counts[best]
# ٩. الأعداد الأولية
def is_prime(n: int) -> bool:
    if n < 2:
        return False
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i += 1
    return True
# ١٠. two sum
def two_sum(nums: list[int], target: int) -> tuple[int, int] | None:
    seen: dict[int, int] = {}
    for i, n in enumerate(nums):
        if target - n in seen:
            return seen[target - n], i
        seen[n] = i
    return None
assert fizzbuzz(15)[-1] == "FizzBuzz" and fizzbuzz(5) == ["1", "2", "Fizz", "4", "Buzz"]
assert sum_digits(9045) == 18 and sum_digits(-12) == 3
assert count_vowels("FastAPI is fun") == 5
assert largest([3, -1, 9, 2]) == 9 and largest([-5, -2]) == -2
assert is_palindrome("Was it a car or a cat I saw?") and not is_palindrome("python")
assert reverse_words("  python  is   fun ") == "fun is python"
assert second_largest([5, 9, 9, 3]) == 5 and second_largest([7, 7]) is None
assert top_word("the cat and the hat and the bat") == ("the", 3)
assert [n for n in range(30) if is_prime(n)] == [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
assert two_sum([2, 7, 11, 15], 9) == (0, 1) and two_sum([3, 3], 6) == (0, 1) and two_sum([1], 5) is None
print("العشرة عدّوا")`,
          flag: "script",
          deep: {
            why: R`قراية الدروس بتدّيك إحساس إنك فاهم، والتمرين هو اللي بيكشف إذا كنت فعلًا تقدر تكتب. والتمارين دي بالظبط نوع الأسئلة اللي بتيجي في أول مرحلة في انترفيو junior أو في اختبار online.`,
            how: R`[[assert cond, "رسالة"]] بيرمي [[AssertionError]] بالرسالة لو الشرط False. ده أبسط شكل للاختبار، وهو نفس اللي pytest بيستخدمه (تاب Python). اكتب الـ asserts قبل الدالة أو معاها: الحالة العادية، والحدود (صفر، ليستة فاضية، رقم سالب)، والحالة اللي فيها تكرار.

ولو assert وقع، اطبع القيمة اللي طلعت: [[print(f"{second_largest([5, 9, 9, 3])=}")]] بيوريك الاسم والقيمة مع بعض (درس «f-strings»).

ملاحظة: [[python -O]] بيشيل الـ asserts، فمتستخدمهاش لفحص input المستخدم في كود الإنتاج؛ ده شغل [[if]] و [[raise]].`,
            when: R`دلوقتي، قبل ما تكمّل. وارجعلهم بعد أسبوع وحلهم تاني من غير ما تبص، وبعدين جرّب تحل نفس التمارين بـ built-ins ([[max]] و [[sorted]] و [[Counter]] و [[sum]]) وقارن.`,
            mistakes: R`تبص على الحل بعد دقيقتين. وتختبر الحالة العادية بس (أغلب الـ bugs في الحدود: فاضي، سالب، تكرار). وتستخدم [[assert]] للتحقق من input في API (بيتشال بـ [[-O]]). وتحل بـ built-in وانت المطلوب منك تكتبها بإيدك: في الانترفيو [[max(nums)]] مش إجابة لـ «اكتب max».`
          },
          lines: [
            "تمرين ٢ كمثال: دالة بتجمع أرقام عدد.",
            "المجموع.",
            R`[[abs]] عشان السالب، و [[str]] عشان نلف على الأرقام كحروف.`,
            "كل حرف يرجع رقم ويتجمع.",
            "رجّع.",
            R`[[assert]]: لو الشرط غلط البرنامج يقف.`,
            "الحد: صفر.",
            R`السالب، والرسالة بعد الفاصلة بتظهر في الـ [[AssertionError]].`,
            "لو وصلنا هنا، كله عدّى."
          ]
        }
      ]
    },
    {
      t: "lists و dicts و sets",
      l: 1,
      n: "الليستات والقواميس والمجموعات، وإمتى كل واحدة، والـ comprehensions",
      items: [
        {
          cmd: "list",
          title: "ليستة: تضيف وتقطع وترتّب",
          desc: R`[[list]] مجموعة مرتبة بتتعدّل: [[append]] يضيف في الآخر، و [[items[0]]] أول عنصر و [[items[-1]]] آخر عنصر، و slicing [[items[1:3]]] من الـ index 1 لحد قبل 3. و [[sorted(items, key=...)]] بيرتّب بأي معيار.

البحث بـ [[in]] في list بيلف على العناصر كلها (O(n))، فلو هتسأل «موجود؟» كتير استخدم set.`,
          example: R`users = [{"name": "Sara", "age": 27}, {"name": "Omar", "age": 31}]
users.append({"name": "Ali", "age": 22})
print(users[0]["name"], users[-1]["name"])
first_two = users[:2]
by_age = sorted(users, key=lambda u: u["age"])
oldest = max(users, key=lambda u: u["age"])
for i, u in enumerate(users, start=1):
    print(i, u["name"])
for name, score in zip(["a", "b"], [90, 80]):
    print(name, score)
page, size = 2, 20
chunk = users[(page - 1) * size : page * size]`,
          try: R`رتّب [[users]] بالاسم تنازلي ([[reverse=True]])، وبعدين هات أسماء اللي سنهم فوق ٢٥ بس في list.`,
          flag: "script",
          deep: {
            why: R`أي رد API فيه قايمة: مستخدمين، طلبات، منتجات. و [[sorted]] و [[max]] بـ [[key]] والـ slicing بيوفّروا loops كتير.`,
            how: R`الـ list في CPython array من pointers: الوصول بالـ index O(1)، و [[append]] O(1) في المتوسط، بس [[insert(0, x)]] و [[pop(0)]] O(n) لأن كل العناصر بتتزق (لو محتاج طابور من الناحيتين: [[collections.deque]]). و [[in]] O(n).

الـ slicing [[a[start:stop:step]]] بيرجع list جديدة (نسخة سطحية)، والـ stop مش داخل. والأرقام السالبة من الآخر. والـ slice مبيطلعش IndexError لو برّه الحدود، بيرجع اللي موجود.

[[sorted]] و [[list.sort]] stable: العناصر المتساوية بتحافظ على ترتيبها، فتقدر ترتّب على معيارين بـ tuple في الـ key: [[key=lambda u: (u["age"], u["name"])]]. و [[lambda]] دالة صغيرة من سطر واحد بترجع expression.

[[enumerate]] بيدّيك الـ index مع العنصر بدل [[range(len(...))]]، و [[zip]] بيلف على كذا list مع بعض (ومن 3.10 [[zip(a, b, strict=True)]] بيرمي لو الأطوال مختلفة).`,
            when: "داتا مرتبة، ممكن تتكرر، وهتلف عليها. لو هتدوّر بالمفتاح: dict. لو هتسأل «موجود؟»: set.",
            mistakes: R`[[for i in range(len(items))]] بدل enumerate. و [[items.sort()]] وتستنى ترجع الليستة (بترجع None). و [[copy = items]] وتفتكرها نسخة. و [[in]] على list فيها ١٠٠ ألف عنصر جوه loop: O(n²).`
          },
          lines: [
            "list فيها dicts، زي رد API.",
            "ضيف في الآخر.",
            R`أول عنصر وآخر عنصر ([[-1]]).`,
            "أول اتنين (slice: من البداية لحد قبل 2).",
            "list جديدة مترتبة بالسن، والأصل زي ما هو.",
            "العنصر اللي أكبر سن، من غير ما ترتّب الكل.",
            "الـ index مع العنصر، والعد يبدأ من 1.",
            "جوه الـ loop.",
            "لف على ليستتين مع بعض.",
            "جوه الـ loop.",
            "رقم الصفحة وحجمها.",
            "pagination بالـ slicing: العناصر من 20 لـ 39."
          ],
          sol: R`بالاسم تنازلي: [[['Sara', 'Omar', 'Ali']]]. واللي سنهم فوق ٢٥: [[['Sara', 'Omar']]] (Ali عنده 22).

[[sorted(users, key=lambda u: u["name"], reverse=True)]] بترجع list جديدة والأصل زي ما هو. لو استخدمت [[users.sort(...)]] بدلها هي بتعدّل مكانها وبترجع [[None]]، فلو كتبت [[x = users.sort(...)]] هتلاقي [[x]] فاضية، ودي أشهر غلطة. ولو نسيت [[key]] هترمي [[TypeError: '<' not supported between instances of 'dict' and 'dict']] لأن Python ميعرفش يقارن dicts ببعض.`,
          solCode: R`users = [{"name": "Sara", "age": 27}, {"name": "Omar", "age": 31}, {"name": "Ali", "age": 22}]
by_name_desc = sorted(users, key=lambda u: u["name"], reverse=True)
print([u["name"] for u in by_name_desc])            # ['Sara', 'Omar', 'Ali']
print([u["name"] for u in users if u["age"] > 25])  # ['Sara', 'Omar']`
        },
        {
          cmd: "dict",
          title: "قاموس: توصل للقيمة بالمفتاح على طول",
          desc: R`[[dict]] أزواج مفتاح وقيمة: [[user["email"]]] بيرمي KeyError لو المفتاح مش موجود، و [[user.get("phone")]] بترجع None (أو قيمة تانية تديها). والترتيب محفوظ بترتيب الإضافة.

الـ dict هو شكل JSON في Python، فهتشوفه في كل حتة: body وردود وإعدادات. وفي [[collections]] نسخ جاهزة مفيدة: [[Counter]] للعد و [[defaultdict]] للتجميع.`,
          example: R`from collections import Counter, defaultdict
user = {"id": 1, "name": "Sara", "role": "admin"}
print(user["name"], user.get("phone", "مفيش"))
user["email"] = "sara@example.com"
for key, value in user.items():
    print(key, value)
defaults = {"lang": "ar", "theme": "dark"}
settings = defaults | {"theme": "light"}
orders = [("sara", "tea"), ("omar", "coffee"), ("sara", "tea")]
by_user = defaultdict(list)
for who, item in orders:
    by_user[who].append(item)
print(Counter(item for _, item in orders).most_common(1))`,
          try: R`اعمل dict بيعد الكلمات في جملة مرة بـ loop و [[get]]، ومرة بـ [[Counter]]، وقارن. وبعدين جرّب [[user["phone"]]] واقرا الـ KeyError.`,
          flag: "script",
          deep: {
            why: "الـ dict أسرع طريقة تلاقي بيها حاجة بمفتاح: O(1) في المتوسط مهما كان حجمه. وده اللي بيخليه أساس الـ caching والـ lookups والعد والتجميع، وأكتر نوع هتقابله في كود API.",
            how: R`الـ dict مبني على hash table: [[hash(key)]] بيحدد مكان القيمة، فالبحث والإضافة والحذف O(1) في المتوسط. عشان كده المفاتيح لازم hashable. ومن 3.7 الترتيب مضمون بترتيب الإضافة.

[[d[k]]] بيرمي [[KeyError]] لو مش موجود: استخدمها لما المفتاح لازم يكون موجود. و [[d.get(k, default)]] لما ممكن ميكونش. و [[k in d]] O(1). و [[setdefault]] بيحط قيمة لو المفتاح مش موجود ويرجعها.

[[|]] (3.9+) بيدمج dictين في dict جديد، واللي على اليمين بيكسب. و [[|=]] بيدمج في نفس الـ dict. والطريقة القديمة [[{**a, **b}]] نفس الفكرة.

[[defaultdict(list)]] أول ما تطلب مفتاح مش موجود بيعمله list فاضية، فمش محتاج [[if key not in d]]. و [[Counter]] dict بيعد، وفيه [[most_common]].`,
            when: "lookup بمفتاح (id لـ object)، وعد وتجميع، و JSON. ولو شكل الداتا ثابت ومعروف (user فيه id و name دايمًا)، الأحسن dataclass أو Pydantic model بدل dict، عشان الأنواع والإكمال.",
            mistakes: R`تعدّل dict وانت بتلف عليه ([[RuntimeError: dictionary changed size during iteration]]): لف على [[list(d.items())]]. و [[if d.get("count"):]] لما القيمة ممكن تبقى 0. وتستخدم dict لكل حاجة في الكود، فالغلطة الإملائية [[user["nmae"]]] مش هتتمسك غير وقت التشغيل.`
          },
          lines: [
            "أدوات جاهزة للعد والتجميع.",
            "dict: مفاتيح strings وقيم أي نوع.",
            R`الأقواس لمفتاح لازم يكون موجود، و [[get]] بقيمة بديلة لو مش موجود.`,
            "ضيف مفتاح جديد أو عدّل الموجود.",
            "لف على المفاتيح والقيم مع بعض.",
            "جوه الـ loop.",
            "إعدادات افتراضية.",
            R`[[|]] بيدمج في dict جديد، واليمين بيكسب: theme بقت light.`,
            "ليستة طلبات.",
            "أي مفتاح جديد بيبدأ بـ list فاضية.",
            "لف على الطلبات.",
            R`مفيش [[if]]: الـ list بتتعمل لوحدها.`,
            "عدّ الأصناف، وهات الأكتر تكرارًا (tea مرتين)."
          ],
          sol: R`على جملة زي [[the cat and the dog and the bird]]، الـ loop بيطلّع [[{'the': 3, 'cat': 1, 'and': 2, 'dog': 1, 'bird': 1}]]، و [[Counter]] بيطلّع نفس العدد: [[Counter({'the': 3, 'and': 2, 'cat': 1, 'dog': 1, 'bird': 1})]] (مترتب من الأكتر) و [[counts == c]] بتطلع [[True]]، لأن [[Counter]] أصلًا dict. وميزته إنه سطر واحد وعنده [[most_common]].

و [[user["phone"]]] بيرمي [[KeyError: 'phone']]: المفتاح مش موجود. لو المفتاح ممكن ميبقاش موجود استخدم [[user.get("phone")]] (بترجع [[None]]) أو [[get("phone", "مفيش")]]. ولو كتبت [[counts[w] += 1]] من غير [[get]] هتاخد نفس الـ KeyError على أول كلمة.`,
          solCode: R`from collections import Counter
text = "the cat and the dog and the bird"
counts = {}
for w in text.split():
    counts[w] = counts.get(w, 0) + 1
print(counts)
c = Counter(text.split())
print(c, counts == c)`
        },
        {
          cmd: "set و tuple",
          title: "مجموعة من غير تكرار، وقيم ثابتة في tuple",
          desc: R`[[set]] مجموعة من غير تكرار ومن غير ترتيب: [[x in s]] O(1)، وفيها عمليات المجموعات: [[&]] المشترك و [[|]] الكل و [[-]] الفرق. و [[tuple]] زي list بس متتعدّلش، ومعظم استخدامها unpacking: [[lat, lng = point]] أو دالة بترجع أكتر من قيمة.`,
          example: R`emails = ["a@x.com", "b@x.com", "a@x.com"]
unique = set(emails)
print(len(unique))                     # 2
admins = {"sara", "omar"}
online = {"omar", "ali"}
print(admins & online, admins - online)
banned = {"spam@x.com"}
if "spam@x.com" in banned:
    print("ممنوع")
def min_max(nums: list[int]) -> tuple[int, int]:
    return min(nums), max(nums)
low, high = min_max([4, 9, 1])
first, *rest = [1, 2, 3, 4]
empty = set()`,
          try: R`عندك ليستتين ids: اللي في القاعدة واللي جت في الـ request. طلّع اللي جديد (في الـ request ومش في القاعدة) واللي اتمسح، بـ set في سطرين.`,
          flag: "script",
          deep: {
            why: "«الإيميل ده اتسجل قبل كده؟» و «مين من الأدمنز أونلاين؟» و «شيل التكرار من الليستة»: كلها عمليات set، وبـ list بتبقى loops متداخلة وبطيئة.",
            how: R`الـ set hash table من غير قيم، فـ [[in]] و [[add]] و [[remove]] O(1) في المتوسط، والعناصر لازم hashable. ومفيش ترتيب مضمون، فلو محتاج تشيل التكرار وتحافظ على الترتيب: [[list(dict.fromkeys(items))]].

[[{}]] فاضية ده dict مش set: الـ set الفاضية [[set()]].

الـ tuple: [[return a, b]] بترجع tuple، و [[x, y = ...]] unpacking، و [[*rest]] بيلم الباقي في list. وتقدر تبدّل متغيرين بـ [[a, b = b, a]] من غير متغير مؤقت. وعشان immutable و hashable، الـ tuple تنفع مفتاح مركّب في dict أو عنصر في set. والـ tuple بعنصر واحد محتاجة فاصلة: [[(1,)]].

وفيه [[NamedTuple]] من typing: tuple بأسماء للمواقع ([[p.lat]])، بس غالبًا dataclass أوضح (قسم الـ classes).`,
            when: "set للعضوية وشيل التكرار والمقارنة بين مجموعات. tuple لقيم ثابتة مرتبطة ببعض، ولما دالة ترجع كذا قيمة.",
            mistakes: R`[[s = {}]] وتفتكرها set. و [[set(items)]] وتستنى الترتيب يفضل. و [[("a")]] وتفتكرها tuple (دي string بين قوسين). وتحط dicts في set (مش hashable).`
          },
          lines: [
            "ليستة فيها تكرار.",
            "set: التكرار اتشال.",
            "٢ بس.",
            "set مكتوبة بالأقواس المعووجة.",
            "set تانية.",
            R`المشترك ([[&]]) واللي في الأولى بس ([[-]]).`,
            "set للبحث السريع.",
            R`[[in]] على set: O(1) مهما كان حجمها.`,
            "جوه الـ if.",
            "دالة بترجع tuple من قيمتين.",
            "الفاصلة هي اللي بتعمل tuple، مش القوسين.",
            "unpacking: كل قيمة في متغير.",
            R`[[*rest]] بيلم الباقي في list: 2 و 3 و 4.`,
            R`set فاضية. [[{}]] لوحدها dict.`
          ],
          sol: R`لو القاعدة فيها [[[1, 2, 3, 4]]] والـ request فيه [[[3, 4, 5, 6]]]: الجديد [[{5, 6}]] واللي اتمسح [[{1, 2}]]. الفرق بين الـ sets ([[-]]) بيرجع اللي في الأولى ومش في التانية، فالترتيب مهم: [[req - db]] للجديد و [[db - req]] للممسوح.

والـ set ملهاش ترتيب، فلو محتاج ترتيب ثابت (في test مثلًا) اعمل [[sorted(new)]]. ولو جربت تعملها بـ loop و [[not in]] على lists، هتشتغل بس أبطأ بكتير على ليستات كبيرة (O(n×m) بدل O(n+m)).`,
          solCode: R`in_db = [1, 2, 3, 4]
in_request = [3, 4, 5, 6]
new = set(in_request) - set(in_db)
removed = set(in_db) - set(in_request)
print(new, removed)  # {5, 6} {1, 2}`
        },
        {
          cmd: "comprehensions",
          title: "تبني list أو dict في سطر بدل loop",
          desc: R`[[[x * 2 for x in nums if x > 0]]] بتبني list جديدة من غير loop و append. نفس الشكل للـ dict [[{k: v for ...}]] وللـ set [[{x for ...}]]. ولو بأقواس عادية [[(x for x in ...)]] ده generator: بيطلّع العناصر واحدة واحدة من غير ما يخزّنها كلها.

القاعدة: comprehension لتحويل وفلترة بسيطة. لو محتاج أكتر من شرط أو خطوات، loop عادي أوضح.`,
          example: R`users = [{"name": "Sara", "active": True, "age": 27}, {"name": "Omar", "active": False, "age": 31}]
names = [u["name"] for u in users if u.get("active")]
by_name = {u["name"]: u for u in users}
decades = {u["age"] // 10 * 10 for u in users}
total_age = sum(u["age"] for u in users)
has_admin = any(u["name"] == "admin" for u in users)
pairs = [(x, y) for x in range(3) for y in range(2)]
labels = ["adult" if u["age"] >= 18 else "minor" for u in users]`,
          try: R`حوّل الـ loop ده لـ comprehension: [[result = []]] وبعدين [[for n in range(20): if n % 3 == 0: result.append(n * n)]]. وبعدين اعمل نفس الحاجة بأقواس عادية واطبع الناتج، وشوف طبع إيه.`,
          flag: "script",
          deep: {
            why: "تحويل وفلترة الداتا أكتر حاجة بتعملها في API: من صفوف القاعدة لـ response، ومن list لـ dict بالـ id. الـ comprehension بيقول «عايز إيه» في سطر، وأسرع شوية من loop بـ append.",
            how: R`[[[expr for x in it if cond]]] بتتقري: لكل x في it، لو cond، حط expr. ممكن أكتر من for (بتتقري من الشمال لليمين زي loops متداخلة). والـ if في الآخر فلتر، أما [[a if c else b]] في الأول ده اختيار قيمة لكل عنصر، مش فلتر.

المتغير جوه الـ comprehension ليه scope خاص بيه، مبيطلعش برّه.

الـ generator expression [[(... for ...)]] lazy: مبيحسبش حاجة غير لما حد يطلب. فـ [[sum(x for x in huge)]] مبيعملش list في الذاكرة. ولما يبقى الـ argument الوحيد لدالة، مش محتاج قوسين زيادة. و [[any]] و [[all]] بيقفوا أول ما يعرفوا الإجابة (short-circuit).`,
            when: R`تحويل أو فلترة في سطر مقروء. و generator expression مع [[sum]] و [[any]] و [[all]] و [[max]]، أو لما الداتا كبيرة.`,
            mistakes: R`comprehension متداخلة ٣ مستويات بشروط: محدش هيفهمها، اكتبها loop. و comprehension عشان side effects ([[[print(x) for x in xs]]]) بتعمل list من None على الفاضي. وتلف على generator مرتين: التانية فاضية لأنه اتستهلك.`
          },
          lines: [
            "ليستة مستخدمين.",
            R`أسماء النشطين بس: تحويل ([[u["name"]]]) وفلتر ([[if]]).`,
            "dict comprehension: من list لـ dict بالاسم، عشان تدوّر بسرعة.",
            "set comprehension: الفئات العمرية من غير تكرار (20 و 30).",
            R`generator جوه [[sum]]: مفيش list بتتعمل في الذاكرة.`,
            R`[[any]] بيقف أول ما يلاقي True.`,
            "loopين متداخلين: ٦ أزواج.",
            R`[[if/else]] في الأول بيختار قيمة لكل عنصر، مش فلتر.`
          ],
          sol: R`الـ comprehension: [[result = [n * n for n in range(20) if n % 3 == 0]]] وناتجه [[[0, 9, 36, 81, 144, 225, 324]]].

ولما تبدّل الأقواس المربعة بأقواس عادية مش هتاخد tuple، هتاخد generator: الطباعة هتطلع حاجة زي [[<generator object <genexpr> at 0x7f...>]]. الـ generator مبيحسبش حاجة لحد ما تلف عليه، فعشان تشوف القيم [[list(g)]]. وخد بالك إنه بيتلف عليه مرة واحدة بس: [[list(g)]] التانية بترجع [[[]]]. ولو عايز tuple فعلًا: [[tuple(n * n for n in ...)]].`
        }
      ]
    }
  ]
});

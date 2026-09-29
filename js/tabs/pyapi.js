// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("pyapi", {
  label: "Python و FastAPI",
  prompt: "$ ",
  lab: R`python3 -m venv .venv && source .venv/bin/activate
pip install "fastapi[standard]"
fastapi dev main.py`,
  labText: "تاب Python بيغطي venv و pip و pytest؛ هنا اللغة نفسها وبناء API. fastapi dev بيفتح docs تفاعلية على /docs.",
  levels: {"1":["اللغة","الأنواع، و lists و dicts، والدوال، والـ classes، والـ modules"],"2":["FastAPI","routes و pydantic و dependencies و errors و async"],"3":["الإنتاج والانترفيو","قاعدة بيانات، و background tasks، و httpx، والأداء، وأسئلة الانترفيو"]},
  categories: [
    {
      t: "الأسماء والأنواع",
      l: 1,
      n: "المتغير اسم بيشاور على object، والنوع بتاع القيمة مش الاسم، والـ type hints للأدوات مش للتشغيل",
      items: [
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
        }
      ]
    },
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
          ]
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
          ]
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

[[@contextmanager]] (درس [[with]]) بياخد generator فيه [[yield]] واحد ويحوّله لـ context manager: اللي قبل الـ yield هو الدخول، واللي بعده هو الخروج. و FastAPI بيعمل نفس الحكاية مع الـ dependencies اللي فيها yield ومع الـ [[lifespan]].

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
          ]
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
          ]
        }
      ]
    },
    {
      t: "Classes",
      l: 1,
      n: "class و self و property والوراثة، و dataclass بدل ما تكتب __init__ بإيدك",
      items: [
        {
          cmd: "class و self",
          title: "class بـ __init__ و self و @property",
          desc: R`الـ class قالب بتعمل منه objects. [[__init__]] بيتنادى أول ما الـ object يتعمل، و [[self]] هو الـ object نفسه (Python بيبعته لوحده لكل method). و [[@property]] بتخلي method تتقري كأنها خاصية: [[order.total]] من غير قوسين.

والوراثة [[class Admin(User):]]، و [[super()]] بينادي نسخة الأب.`,
          example: R`class Order:
    tax_rate = 0.14
    def __init__(self, items: list[float], customer: str):
        self.items = items
        self.customer = customer
    @property
    def total(self) -> float:
        return round(sum(self.items) * (1 + self.tax_rate), 2)
    def add(self, price: float) -> None:
        self.items.append(price)
    def __repr__(self) -> str:
        return f"Order({self.customer!r}, total={self.total})"
class RushOrder(Order):
    def __init__(self, items: list[float], customer: str, fee: float = 50):
        super().__init__(items, customer)
        self.fee = fee
    @property
    def total(self) -> float:
        return super().total + self.fee
o = RushOrder([100, 200], "Sara")
o.add(50)
print(o, o.total)`,
          try: R`ضيف method اسمها [[remove(price)]]، وخلّي [[__repr__]] يطبع عدد العناصر كمان. وبعدين اطبع [[RushOrder.__mro__]] وشوف Python بيدوّر على الـ methods بأنهي ترتيب.`,
          flag: "script",
          deep: {
            why: "الـ models والـ services والـ repositories في أي API هتبقى classes، وحتى Pydantic models و SQLAlchemy models classes بتورث. لازم تفهم self والوراثة و property عشان تقرا كود الناس.",
            how: R`[[o.add(50)]] هي بالظبط [[Order.add(o, 50)]]: عشان كده [[self]] أول باراميتر، والاسم اتفاق مش keyword.

الخاصية المكتوبة في جسم الـ class ([[tax_rate]]) class attribute مشتركة بين كل الـ objects، واللي بـ [[self.x = ...]] instance attribute لكل object لوحده. وخلي بالك: class attribute نوعها mutable (list) بتتشارك بين الكل، وده غالبًا bug.

[[@property]] بتحسب القيمة كل ما تتقري، فمش محتاج تخزّن total وتنسى تحدّثه. و [[__repr__]] هو اللي بيظهر في الـ REPL واللوج والـ debugger؛ اكتبه دايمًا.

مفيش private حقيقي في Python: [[_name]] اتفاق معناه «داخلي، متلمسوش»، و [[__name]] بيتغير اسمه (name mangling) عشان ميتصادمش في الوراثة، مش للحماية.

الـ methods اللي اسمها [[__x__]] (dunder) بتخلي الـ class بتاعك يشتغل مع أدوات اللغة: [[__eq__]] لـ [[==]]، و [[__len__]] لـ [[len()]]، و [[__iter__]] لـ for. و [[@classmethod]] لطرق إنشاء بديلة ([[Order.from_dict(d)]])، و [[@staticmethod]] لدالة ملهاش علاقة بالـ object.`,
            when: "لما يبقى فيه داتا ومعاها سلوك بيتغير عليها. لو داتا بس: dataclass أو Pydantic (الدرس الجاي). لو سلوك بس من غير state: دوال عادية في module كفاية، Python مش Java.",
            mistakes: R`تنسى [[self]] في تعريف method ([[takes 0 positional arguments but 1 was given]]). و [[items: list = []]] كـ class attribute فكل الطلبات تشارك نفس الليستة. و class لكل حاجة حتى لو دالة واحدة. ووراثة عميقة ٤ مستويات بدل composition.`
          },
          lines: [
            "class جديد.",
            "class attribute: مشتركة بين كل الطلبات.",
            R`بيتنادى وقت الإنشاء، و [[self]] الـ object الجديد.`,
            "instance attribute: لكل طلب لوحده.",
            "نفس الكلام.",
            "اللي تحت يتقري كخاصية من غير قوسين.",
            "الإجمالي بيتحسب كل مرة من العناصر.",
            "مع الضريبة، ومقرّب لقرشين.",
            "method عادية بتعدّل الـ object.",
            "ضيف عنصر.",
            "الشكل اللي بيظهر في الطباعة والـ debugger.",
            R`بيستخدم [[total]] كخاصية.`,
            "وراثة: RushOrder فيه كل حاجة في Order.",
            "باراميتر زيادة.",
            R`[[super()]] بينادي [[__init__]] بتاع الأب.`,
            "الزيادة.",
            "بنعيد تعريف الخاصية.",
            "نفس الاسم.",
            "إجمالي الأب وعليه رسوم الاستعجال.",
            "object من الابن.",
            "method موروثة من الأب.",
            R`بيطبع [[Order('Sara', total=449.0)]] و [[449.0]].`
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
          ]
        }
      ]
    },
    {
      t: "Modules والمشروع",
      l: 1,
      n: "import بيدوّر فين، و __name__، وشكل المشروع، و pyproject.toml و uv",
      items: [
        {
          cmd: "import و packages",
          title: "import بيلاقي الملف إزاي، وإيه __name__؟",
          desc: R`كل ملف .py هو module، والفولدر اللي فيه ملفات (ومعاه [[__init__.py]]) package. و [[from app.db import pool]] بيدوّر على [[app/db.py]] في [[sys.path]]، وأول مكان فيه فولدر السكربت اللي شغّلته (أو الفولدر الحالي مع [[python -m]]).

الـ module بيتنفّذ مرة واحدة أول ما حد يعمله import، وبعدين بيتخزن في [[sys.modules]]. و [[if __name__ == "__main__":]] بيشغّل كود لما الملف يتشغّل مباشرة بس، مش لما يتعمله import. وتفاصيل [[python -m]] في تاب Python.`,
          example: R`# app/
#   __init__.py
#   main.py
#   config.py
#   db.py
#   routers/__init__.py
#   routers/users.py
# app/routers/users.py:
from fastapi import APIRouter
from app.db import get_pool
from ..config import settings
router = APIRouter()
def main() -> None:
    print("seeding...", settings.env)
if __name__ == "__main__":
    main()`,
          try: R`اعمل ملف [[a.py]] فيه [[print(__name__)]]، وشغّله مباشرة ([[python a.py]])، وبعدين من ملف تاني اعمل [[import a]]. شوف الاسم اتغير لإيه.`,
          flag: "script",
          deep: {
            why: R`[[ModuleNotFoundError: No module named 'app']] و circular imports من أكتر الأخطاء اللي بتضيّع وقت في مشاريع FastAPI، وسببهم دايمًا إنك مش فاهم Python بيدوّر فين.`,
            how: R`[[import x]] بيدوّر في [[sys.modules]] الأول (لو اتعمله import قبل كده بيرجعه على طول)، وبعدين في [[sys.path]] بالترتيب: فولدر السكربت (أو الفولدر الحالي مع [[-m]])، وبعدين [[PYTHONPATH]]، وبعدين المكتبة الأساسية و site-packages بتاعة الـ venv.

الـ import بينفّذ الـ module كله من فوق لتحت. فأي كود على المستوى الأعلى (اتصال بقاعدة، قراية ملف) بيشتغل أول ما حد يعمل import. عشان كده الحاجات التقيلة مكانها [[lifespan]] أو دالة، مش على مستوى الملف.

[[from ..config import settings]] import نسبي: نقطة يعني نفس الـ package، ونقطتين اللي فوقه. بيشتغل بس لو الملف اتحمّل كجزء من package (بـ [[-m]] أو import)، مش لو شغّلته كسكربت مباشرة.

الـ circular import: [[a.py]] بيعمل import من [[b.py]] و [[b.py]] بيعمل import من [[a.py]]، فواحد فيهم بيتقري وهو لسه متنفّذش كله ([[ImportError: cannot import name ... (most likely due to a circular import)]]). الحل: انقل الحاجة المشتركة لـ module تالت، أو اعمل الـ import جوه الدالة.

و [[__init__.py]] بقى اختياري من Python 3.3 (namespace packages)، بس خليه موجود: الأدوات (pytest و mypy) بتتعامل أحسن مع packages عادية.`,
            when: R`من أول يوم في أي مشروع أكبر من ملف واحد. شغّل دايمًا من جذر المشروع بـ [[python -m app.x]] أو [[fastapi dev]]، واستخدم imports مطلقة من اسم الـ package ([[from app.db import ...]]).`,
            mistakes: R`ملف اسمه [[fastapi.py]] أو [[redis.py]] أو [[json.py]] في مشروعك: بيغطي على المكتبة الحقيقية. و [[from module import *]]: مش عارف الأسماء جاية منين. و [[sys.path.append("..")]] عشان تصلّح import: بيشتغل عندك ويقع على السيرفر.`
          },
          lines: [
            "مكتبة من الـ venv.",
            "import مطلق من جذر المشروع: الأوضح.",
            "import نسبي: config.py في الـ package اللي فوق.",
            "متغير على مستوى الـ module: بيتعمل مرة واحدة مع أول import.",
            "دالة.",
            "الجسم.",
            R`الملف اتشغّل مباشرة ([[python -m app.routers.users]])؟`,
            "يبقى شغّل main. لو اتعمله import، ده مش هيشتغل."
          ]
        },
        {
          cmd: "uv و pyproject.toml",
          title: "مشروع Python حديث: pyproject.toml و uv",
          desc: R`[[pyproject.toml]] ملف المشروع الحديث: اسمه، ونسخة Python، والمكتبات، وإعدادات الأدوات (ruff و pytest و mypy و FastAPI) في ملف واحد. و [[uv]] (من Astral) أداة واحدة بتعمل شغل venv و pip و pip-tools مع بعض وأسرع بكتير: [[uv add]] بتضيف المكتبة للملف وتسطّبها وتحدّث [[uv.lock]].

venv و pip و requirements.txt بالتفصيل في تاب Python، ولسه شغالين تمام؛ و uv بديل بقى منتشر جدًا، وتوثيق FastAPI نفسه بيستخدمه.`,
          example: R`curl -LsSf https://astral.sh/uv/install.sh | sh
uv init shop-api && cd shop-api
uv python pin 3.14
uv add "fastapi[standard]" asyncpg redis
uv add --dev pytest ruff mypy
uv run fastapi dev main.py
uv sync --locked
uv export --no-hashes > requirements.txt`,
          try: R`اعمل مشروع بـ [[uv init]]، وضيف fastapi، وافتح [[pyproject.toml]] و [[uv.lock]] وشوف اتكتب فيهم إيه. وبعدين امسح [[.venv]] خالص واعمل [[uv sync]] وشوف الوقت.`,
          deep: {
            why: "requirements.txt من غير lock بيطلّع نسخ مختلفة كل مرة، و pip-tools أداة زيادة، والـ venv بيتعمل بإيدك، ونسخة Python نفسها حكاية تانية (pyenv). uv بيجمعهم في أداة واحدة، وأسرع ١٠ لـ ١٠٠ مرة من pip لأنه مكتوب بـ Rust وبيعمل cache ذكي.",
            how: R`[[uv init]] بيعمل [[pyproject.toml]] و [[.python-version]] و [[main.py]]. و [[uv add pkg]] بيكتب المكتبة في [[dependencies]] بنطاق نسخ ([[>=]] آخر نسخة)، ويحل كل الـ dependencies ويكتب النسخ بالظبط في [[uv.lock]]، ويسطّب في [[.venv]]. و [[--dev]] بيحطها في مجموعة dev، ومش هتتسطّب في الإنتاج لو قلت [[--no-dev]].

[[uv run cmd]] بيتأكد إن الـ venv متزامن مع الـ lock وبعدين يشغّل الأمر جواه، فمش محتاج activate. و [[uv python pin]] بيحدد نسخة Python، و uv بينزّلها لو مش موجودة.

[[uv sync --locked]] في CI و Docker: بيسطّب من الـ lock بالظبط، ويفشل لو [[pyproject.toml]] اتغير والـ lock محدّثش. وفي الـ Dockerfile الترتيب زي pip: انسخ [[pyproject.toml]] و [[uv.lock]] الأول، و [[uv sync --locked --no-dev]]، وبعدين الكود (الـ Dockerfile الكامل بـ pip في تاب Python).

و [[uv export]] بيطلّع requirements.txt لو أداة أو منصة لسه محتاجاه.

وإعدادات الأدوات في نفس الملف: [[[tool.ruff]]] و [[[tool.pytest.ini_options]]] و [[[tool.fastapi]]].`,
            when: "أي مشروع جديد. ولو المشروع قايم على pip و requirements.txt وشغال، مفيش داعي تغيّر النهارده.",
            mistakes: R`تعمل commit لـ [[pyproject.toml]] من غير [[uv.lock]] (الـ lock لازم يتعمله commit في التطبيقات). وتخلط [[pip install]] جوه venv بتاع uv فالـ lock ميعرفش عنها حاجة. وتنسى [[--locked]] في CI فالـ lock يتحدّث هناك في صمت.`
          },
          lines: [
            "سطّب uv (مرة واحدة على الجهاز).",
            R`مشروع جديد فيه [[pyproject.toml]]، وادخل فيه.`,
            R`ثبّت نسخة Python في [[.python-version]]، و uv بينزّلها لو مش موجودة.`,
            "ضيف مكتبات: بتتكتب في pyproject، وتتقفل في uv.lock، وتتسطّب في .venv.",
            "أدوات التطوير في مجموعة لوحدها.",
            "شغّل جوه الـ venv من غير activate (بعد ما تكتب التطبيق في main.py).",
            "سطّب من الـ lock بالظبط، ويفشل لو مش متزامن: لـ CI و Docker.",
            "requirements.txt لو حاجة لسه محتاجاه."
          ]
        }
      ]
    },
    {
      t: "async و await",
      l: 2,
      n: "event loop واحد بيخدم آلاف الطلبات طالما محدش بيقفله، و gather و TaskGroup، و def ولا async def في FastAPI",
      items: [
        {
          cmd: "async def و await",
          title: "async بيخلّي الكود أسرع؟ بيعمل إيه بالظبط",
          desc: R`[[async def]] بتعمل coroutine: دالة ممكن توقف في نص شغلها عند [[await]] وتسيب البرنامج يعمل حاجة تانية لحد ما اللي مستنياه يخلص (رد من قاعدة بيانات أو API). والـ event loop هو اللي بيبدّل بينهم، في thread واحد.

async مبيخليش الحسابات أسرع. بيخلّي الانتظار ميضيّعش وقت: وانت مستني رد القاعدة ١٠٠ms، نفس العملية تخدم طلبات تانية. عشان كده مناسب جدًا لـ APIs، لأن أغلب وقتها انتظار I/O.`,
          example: R`import asyncio
import time
async def fetch_user(uid: int) -> dict:
    await asyncio.sleep(1)
    return {"id": uid}
async def main() -> None:
    start = time.perf_counter()
    a = await fetch_user(1)
    b = await fetch_user(2)
    print(f"واحدة ورا التانية: {time.perf_counter() - start:.1f}s")   # 2.0s
    start = time.perf_counter()
    a, b = await asyncio.gather(fetch_user(1), fetch_user(2))
    print(f"مع بعض: {time.perf_counter() - start:.1f}s")            # 1.0s
    coro = fetch_user(3)
    print(type(coro))
    await coro
asyncio.run(main())`,
          try: R`شغّل المثال، وبعدين غيّر [[asyncio.sleep(1)]] لـ [[time.sleep(1)]] جوه [[fetch_user]] وشغّل تاني: الـ gather بقى ٢ ثانية. ده «blocking the event loop»، ودي أهم غلطة في async.`,
          flag: "script",
          deep: {
            why: "API بيخدم ١٠٠٠ مستخدم، وكل request بيستنى القاعدة و API خارجي. بالـ threads محتاج thread لكل طلب (ذاكرة وتبديل). بالـ async، thread واحد بيخدمهم كلهم، لأن ولا واحد فيهم بيشتغل فعلًا وهو مستني.",
            how: R`نداء [[fetch_user(3)]] مبيشغّلش حاجة: بيرجع coroutine object. اللي بيشغّله إنه يتعمله [[await]] أو يتحوّل لـ task. ولو نسيت الـ await، Python بيطبع [[RuntimeWarning: coroutine ... was never awaited]] والكود مبيتنفّذش.

[[await]] نقطة تسليم: الـ coroutine بيقول للـ event loop «أنا مستني، شغّل غيري». الـ loop بيراقب الـ sockets (epoll على لينكس)، وأول ما الرد يوصل يكمّل الـ coroutine من نفس المكان. ده cooperative multitasking: محدش بيقاطع حد، كل واحد بيسلّم بإرادته عند await. فلو coroutine عمل حاجة طويلة من غير await (حسبة تقيلة، [[time.sleep]]، [[requests.get]])، الـ loop كله واقف والطلبات التانية كلها مستنية.

[[asyncio.run(main())]] بيعمل event loop ويشغّل main لحد ما تخلص ويقفله. في FastAPI مش هتكتبه: uvicorn هو اللي عامل الـ loop.

وأي دالة بتعمل [[await]] لازم تبقى [[async def]]، فالـ async بينتشر لفوق (function coloring). والمكتبات لازم تبقى async هي كمان: [[httpx]] مش [[requests]]، و [[asyncpg]] مش [[psycopg2]]، و [[redis.asyncio]].`,
            when: "APIs وأي حاجة فيها انتظار شبكة كتير: قواعد بيانات، APIs خارجية، websockets. مش للحسابات التقيلة (دي processes، في المستوى ٣).",
            mistakes: R`تنسى [[await]] فترجع coroutine بدل الداتا ([[TypeError: 'coroutine' object is not subscriptable]]). و [[time.sleep]] أو [[requests]] جوه [[async def]]. و [[await]] ورا بعض لحاجات مستقلة وتستغرب إن async مش أسرع: الـ await لوحده بيستنى، والتوازي محتاج gather أو TaskGroup.`
          },
          lines: [
            "مكتبة async الأساسية.",
            "للقياس.",
            "coroutine: دالة ممكن توقف عند await.",
            "انتظار ثانية من غير ما يقفل الـ loop (زي رد قاعدة بيانات).",
            "رجّع الداتا.",
            "الدالة الرئيسية.",
            "ابدأ العداد.",
            "استنى الأولى تخلص...",
            "...وبعدين ابدأ التانية.",
            R`ثانيتين: [[await]] ورا بعض مبيعملش توازي.`,
            "عداد جديد.",
            R`[[gather]] بيشغّلهم مع بعض ويستنى الاتنين.`,
            "ثانية واحدة بس: الانتظارين حصلوا في نفس الوقت.",
            "النداء من غير await مبيشغّلش حاجة...",
            R`...بيطبع [[<class 'coroutine'>]].`,
            "دلوقتي بس اشتغل.",
            "اعمل event loop وشغّل main. في FastAPI، uvicorn بيعمل ده."
          ]
        },
        {
          cmd: "gather و TaskGroup",
          title: "تشغّل كذا حاجة async مع بعض وتحط لها timeout",
          desc: R`[[asyncio.gather(a(), b())]] بيشغّلهم مع بعض ويرجّع النتايج بنفس الترتيب. و [[asyncio.TaskGroup]] (3.11+) الأحدث والأأمن: لو واحدة فشلت، الباقي بيتلغي وكل الأخطاء بتطلع مع بعض. و [[asyncio.timeout(2)]] بيلغي اللي جواه لو أخد أكتر من ثانيتين.

و [[asyncio.Semaphore(10)]] بيحدد أقصى عدد شغال في نفس الوقت، عشان متبعتش ١٠٠٠ طلب مرة واحدة لـ API خارجي.`,
          example: R`import asyncio
async def get_price(sku: str) -> float:
    await asyncio.sleep(0.5)
    if sku == "bad":
        raise ValueError(sku)
    return 10.0
async def main() -> None:
    prices = await asyncio.gather(get_price("a"), get_price("b"))
    results = await asyncio.gather(get_price("a"), get_price("bad"), return_exceptions=True)
    async with asyncio.TaskGroup() as tg:
        t1 = tg.create_task(get_price("a"))
        t2 = tg.create_task(get_price("b"))
    print(t1.result() + t2.result())
    try:
        async with asyncio.timeout(0.2):
            await get_price("slow")
    except TimeoutError:
        print("اتلغت بعد 0.2 ثانية")
    sem = asyncio.Semaphore(10)
    async def limited(sku: str) -> float:
        async with sem:
            return await get_price(sku)
    many = await asyncio.gather(*(limited(f"sku{i}") for i in range(100)))
asyncio.run(main())`,
          try: R`في الـ TaskGroup خلّي [[t2]] ينادي [[get_price("bad")]]، واقرا الـ [[ExceptionGroup]] اللي طلع، وامسكه بـ [[except* ValueError]]. وبعدين احسب الـ ١٠٠ طلب بياخدوا قد إيه مع [[Semaphore(10)]] ومع [[Semaphore(50)]].`,
          flag: "script",
          deep: {
            why: "endpoint واحد محتاج بيانات المستخدم وطلباته وإشعاراته من ٣ أماكن. ورا بعض = مجموع الأوقات، ومع بعض = أطولهم بس. ومن غير timeout، API خارجي واقع بيخلّي الطلبات عندك متعلقة لحد ما كل حاجة تقف.",
            how: R`[[gather]] بيحوّل كل coroutine لـ task ويستناهم. لو واحدة رمت، الـ exception بيطلع من gather على طول، بس الباقي بيفضل شغال في الخلفية (مش بيتلغي). و [[return_exceptions=True]] بيرجّع الأخطاء كقيم في الليستة بدل ما يرميها.

[[TaskGroup]] يعني structured concurrency: مفيش task بيعيش بعد البلوك. لو واحدة فشلت، الباقي بيتلغي، والأخطاء بتطلع في [[ExceptionGroup]] تمسكه بـ [[except*]]. ونتيجة كل task بـ [[t.result()]] بعد البلوك.

[[asyncio.timeout]] (3.11+) بيلغي الـ task (بيرمي [[CancelledError]] جواها عند أقرب await)، وبرّه البلوك بيتحوّل لـ [[TimeoutError]]. والطريقة القديمة [[asyncio.wait_for(coro, 2)]] لسه موجودة.

[[asyncio.create_task]] لوحدها بتبدأ task في الخلفية، بس لازم تحتفظ بمرجع ليها (في set مثلًا)، وإلا ممكن تتمسح من الذاكرة قبل ما تخلص، ولو رمت محدش هيعرف.

وفي 3.14 فيه [[python -m asyncio ps PID]] و [[python -m asyncio pstree PID]]: بيوروك الـ tasks الشغالة في process شغال، مفيد لما حاجة معلّقة.`,
            when: R`أي كذا عملية I/O مستقلة عن بعض: TaskGroup لو كلهم لازم ينجحوا، و gather بـ [[return_exceptions]] لو عايز اللي نجح. و timeout حوالين أي نداء لحاجة برّه. و Semaphore لما العدد كبير.`,
            mistakes: R`[[gather]] على ١٠ آلاف طلب مرة واحدة: الـ API الخارجي يعملك rate limit أو الاتصالات تخلص. و [[create_task]] من غير ما تحتفظ بيها ولا تستناها. وتمسك [[CancelledError]] وتبلعه: الـ task مش هيتلغي والـ timeout مش هيشتغل (لو مسكته، ارميه تاني). ومفيش timeout خالص.`
          },
          lines: [
            "asyncio.",
            "دالة بتجيب سعر منتج.",
            "كأنها طلب شبكة.",
            "لو المنتج بايظ...",
            "...ارمي.",
            "السعر.",
            "الرئيسية.",
            "الاتنين مع بعض، والنتايج بنفس الترتيب: نص ثانية بس.",
            "واحدة بتفشل: الخطأ بيرجع كقيمة في الليستة بدل ما يترمي.",
            "مجموعة tasks: البلوك مبيخلصش غير لما كلهم يخلصوا.",
            "ابدأ task...",
            "...وتانية معاها.",
            "النتايج متاحة بعد البلوك.",
            "هنمسك الـ timeout.",
            "أي حاجة جوه البلوك ده ليها 0.2 ثانية.",
            "بتاخد 0.5، فهتتلغي.",
            R`[[asyncio.timeout]] بيرمي [[TimeoutError]] العادي.`,
            "جوه الـ except.",
            "أقصى ١٠ في نفس الوقت.",
            "wrapper بيستنى دوره.",
            R`[[async with sem]]: لو فيه ١٠ شغالين، استنى.`,
            "نادي الأصلية.",
            "١٠٠ طلب، بس ١٠ بس في نفس الوقت: حوالي ٥ ثواني.",
            "شغّل."
          ]
        },
        {
          cmd: "blocking في async",
          title: "إيه اللي بيقفل الـ event loop، وتعمل إيه لو مضطر",
          desc: R`أي كود جوه [[async def]] بيشتغل من غير [[await]] لفترة طويلة بيقفل الـ event loop، وساعتها كل الطلبات التانية واقفة مستنية. أشهر الأمثلة: [[time.sleep]]، و [[requests.get]]، و [[psycopg2]]، وقراية ملفات كبيرة، وحسابات تقيلة (resize صورة، hash للباسورد).

لو مضطر تستخدم مكتبة sync: [[await asyncio.to_thread(fn, arg)]] بيشغّلها في thread جنب الـ loop. ولو حسبة CPU تقيلة بـ Python: process تانية.`,
          example: R`import asyncio
import hashlib
import os
import time
import requests
import httpx
async def bad() -> str:
    time.sleep(1)
    return requests.get("https://example.com", timeout=5).text
async def good() -> str:
    await asyncio.sleep(1)
    async with httpx.AsyncClient(timeout=5) as client:
        r = await client.get("https://example.com")
    return r.text
def hash_password(pw: str) -> bytes:
    salt = os.urandom(16)
    return salt + hashlib.scrypt(pw.encode(), salt=salt, n=2**14, r=8, p=1)
async def register(pw: str) -> bytes:
    return await asyncio.to_thread(hash_password, pw)
asyncio.run(register("secret"))`,
          try: R`في FastAPI اعمل endpoint [[async def]] على [[/slow]] فيه [[time.sleep(5)]]، وابعتله طلبين في نفس الوقت: [[seq 2 | xargs -P2 -I{} curl -s localhost:8000/slow]] (أو افتح [[/slow?a=1]] و [[/slow?a=2]] في تابين، لأن المتصفح بيأجّل طلبين على نفس الـ URL بالظبط لحد ما الأول يخلص): التاني هيستنى ١٠ ثواني. غيّرها لـ [[await asyncio.sleep(5)]] وجرّب تاني. وبعدين شغّل بـ [[PYTHONASYNCIODEBUG=1]] وشوف asyncio بيحذّرك من الخطوات البطيئة.`,
          flag: "script",
          deep: {
            why: R`ده أخطر bug في تطبيقات async، ومبيظهرش وانت بتجرّب لوحدك: مع مستخدم واحد كل حاجة سريعة. مع ٥٠ مستخدم، endpoint واحد فيه [[requests.get]] بياخد ٢ ثانية بيخلّي الـ API كله يستنى، حتى [[/health]]، والـ load balancer يفتكر السيرفر واقع.`,
            how: R`الـ event loop thread واحد، والـ coroutine بيسلّمه بس عند [[await]] لحاجة async بجد. [[time.sleep(1)]] مش await، فالـ thread نايم ثانية كاملة ومحدش غيره بيشتغل.

[[asyncio.to_thread]] (3.9+) بيبعت الدالة لـ thread pool ويرجّع حاجة تقدر تعمل لها await. وده بيشتغل كويس للـ I/O الـ sync (مكتبة قديمة)، وللحاجات اللي بتسيب الـ GIL (hashlib و bcrypt و numpy غالبًا). بس كود Python تقيل (loop فيه ملايين العمليات) مش هيستفيد من thread بسبب الـ GIL: محتاج [[ProcessPoolExecutor]] أو worker منفصل (المستوى ٣).

وفي FastAPI فيه حل أبسط: لو الـ route كله sync، اكتبه [[def]] عادي، و FastAPI بيشغّله في threadpool لوحده (الدرس الجاي).

[[PYTHONASYNCIODEBUG=1]] (أو [[python -X dev]]) بيشغّل debug mode في asyncio، وبيطبع تحذير لأي خطوة أخدت أكتر من 100ms وهي قافلة الـ loop.`,
            when: R`كل ما تكتب [[async def]]، اسأل على كل سطر فيه I/O: ليه [[await]]؟ لو لأ، يا إما مكتبة async، يا إما [[to_thread]]، يا إما خلّي الـ route [[def]].`,
            mistakes: R`[[requests]] جوه [[async def]] (أشهر واحدة). و SDK بتاع خدمة خارجية شكله عادي وجواه sync. و [[open().read()]] لملف ضخم. وتفتكر إن [[to_thread]] بيحل الحسابات التقيلة المكتوبة بـ Python.`
          },
          lines: [
            "asyncio.",
            "للـ hashing.",
            "لـ salt عشوائي.",
            "sleep العادي.",
            "مكتبة HTTP sync.",
            "مكتبة HTTP async.",
            "دالة async...",
            R`...بس [[time.sleep]] بيقفل الـ loop ثانية كاملة.`,
            R`و [[requests]] sync: الـ loop واقف لحد ما الرد ييجي.`,
            "النسخة الصح.",
            R`[[asyncio.sleep]] بيسلّم الـ loop.`,
            "client async.",
            R`[[await]]: الـ loop بيخدم غيرك وانت مستني.`,
            "رجّع النص.",
            "حسبة تقيلة sync (hash للباسورد).",
            "salt عشوائي لكل باسورد.",
            "scrypt بياخد وقت عن قصد، والـ salt بيتخزن مع الـ hash عشان تقدر تتحقق وقت الـ login.",
            "دالة async محتاجة تستخدمها.",
            R`[[to_thread]]: الحسبة في thread جنب الـ loop، والـ loop فاضي لغيرك.`,
            "شغّل للتجربة."
          ]
        },
        {
          cmd: "def ولا async def",
          title: "في FastAPI: تكتب الـ route def ولا async def؟",
          desc: R`FastAPI بيقبل الاتنين وبيتعامل معاهم بشكل مختلف. [[async def]] بتشتغل على الـ event loop مباشرة، فلازم كل I/O جواها يبقى async بـ [[await]]. و [[def]] العادية FastAPI بيشغّلها في threadpool (زي [[to_thread]])، فمش هتقفل الـ loop حتى لو جواها مكتبة sync.

القاعدة: لو بتستخدم مكتبات async (asyncpg و httpx و redis.asyncio): [[async def]]. لو مكتبة sync (psycopg2، requests، SDK قديم): [[def]]. ولو مش متأكد ومفيش await: [[def]] أأمن.`,
          example: R`import time
import httpx
from fastapi import FastAPI
app = FastAPI()
@app.get("/async-ok")
async def async_ok():
    async with httpx.AsyncClient() as client:
        r = await client.get("https://example.com")
    return {"status": r.status_code}
@app.get("/sync-ok")
def sync_ok():
    time.sleep(1)
    return {"ok": True}
@app.get("/broken")
async def broken():
    time.sleep(1)
    return {"ok": "بس الـ API كله وقف ثانية"}`,
          try: R`شغّل المثال بـ [[fastapi dev]]، وابعت ٢٠ طلب مع بعض على [[/broken]] ([[seq 20 | xargs -P20 -I{} curl -s localhost:8000/broken]]): هياخدوا حوالي ٢٠ ثانية. وعلى [[/sync-ok]]: حوالي ثانية.`,
          flag: "script",
          deep: {
            why: "ده من أكتر الأسئلة في انترفيوهات FastAPI، والغلط فيه هو اللي بيخلي API «سريع» في التجربة يقع تحت الضغط.",
            how: R`FastAPI (عن طريق Starlette و AnyIO) بيبص على الدالة: لو coroutine function بيعمل لها await على الـ loop. لو دالة عادية بيشغّلها بـ [[run_in_threadpool]]، والـ threadpool الافتراضي فيه ٤٠ thread، فأقصى ٤٠ طلب sync في نفس اللحظة والباقي بيستنى دوره.

ونفس القاعدة على الـ dependencies: dependency بـ [[def]] بتشتغل في thread، و [[async def]] على الـ loop.

[[async def]] أخف لما كل حاجة async (مفيش تكلفة threads)، وبيستحمل آلاف الطلبات المتزامنة. و [[def]] أبسط وآمنة مع أي مكتبة، بس محدودة بعدد الـ threads.

المشكلة الحقيقية الخلط جوه نفس الـ route: [[async def]] فيها نداء sync واحد. ولو مضطر، [[await asyncio.to_thread(...)]] أو [[run_in_threadpool]] من [[fastapi.concurrency]].`,
            when: R`مشروع جديد: مكتبات async و [[async def]]. كود قديم أو مكتبة sync بس: [[def]]. endpoint بيعمل حسبة CPU تقيلة: لا ده ولا ده، ابعتها لـ worker.`,
            mistakes: R`[[async def]] في كل حتة «عشان أسرع» وجواها [[requests]] و SQLAlchemy sync. و [[def]] وجواها [[asyncio.run(...)]] عشان تنادي حاجة async (بيعمل loop جديد، وبيقع مع objects مربوطة بالـ loop الأصلي زي الـ pool). وتفتكر إن [[def]] معناها «بطيء».`
          },
          lines: [
            "sleep الـ sync.",
            "HTTP client async.",
            "FastAPI.",
            "التطبيق.",
            "route.",
            "async def، وكل I/O جواها بـ await.",
            "client async.",
            "الـ loop بيخدم غيرك وانت مستني.",
            "رجّع.",
            "route تاني.",
            R`[[def]] عادية: FastAPI بيشغّلها في thread لوحدها.`,
            "sync، بس في thread فمش بيقفل حد.",
            "رجّع.",
            "route تالت.",
            "async def...",
            "...وجواها sync: الـ loop كله وقف، وكل الطلبات التانية مستنية.",
            "رجّع."
          ]
        }
      ]
    },
    {
      t: "أول API",
      l: 2,
      n: "fastapi dev، و path و query و body، والرد بنوعه، وتقسيم الـ routes على ملفات",
      items: [
        {
          cmd: "fastapi dev",
          title: "أول API بـ FastAPI وتشغّله",
          desc: R`[[pip install "fastapi[standard]"]] بيسطّب FastAPI ومعاه uvicorn و CLI اسمه [[fastapi]]. و [[fastapi dev main.py]] بيشغّل مع reload للتطوير على 127.0.0.1، و [[fastapi run]] للإنتاج على 0.0.0.0 من غير reload. وأول ما يشتغل، [[/docs]] فيها Swagger UI تجرّب منها كل endpoint.

والأحسن تكتب مكان التطبيق مرة في [[pyproject.toml]] تحت [[[tool.fastapi]]]: [[entrypoint = "app.main:app"]]، فـ [[fastapi dev]] يشتغل من غير مسار. و uvicorn نفسه وخياراته في الإنتاج ورا nginx في تاب Python.`,
          example: R`from fastapi import FastAPI
app = FastAPI(title="Shop API", version="1.0.0")
@app.get("/")
async def root() -> dict[str, str]:
    return {"message": "أهلًا"}
@app.get("/health", tags=["ops"])
async def health() -> dict[str, bool]:
    return {"ok": True}
# في الترمنال:
# fastapi dev main.py              ← http://127.0.0.1:8000/docs
# fastapi run main.py --workers 2`,
          try: R`اكتب الملف ده في [[main.py]]، وشغّله بـ [[fastapi dev main.py]]، وافتح [[http://127.0.0.1:8000/docs]] وجرّب الـ endpoints من هناك. وبعدين افتح [[/openapi.json]] وشوف الوصف اللي اتولّد من الكود. وغيّر الرسالة واحفظ وشوف الـ reload.`,
          flag: "script",
          deep: {
            why: "FastAPI بيبني على الأنواع: من نفس الكود بيطلع الفحص والتحويل والتوثيق. مفيش ملف swagger تكتبه بإيدك ويبعد عن الكود مع الوقت، ومفيش validation تكتبها يدوي لكل حقل.",
            how: R`FastAPI مبني على Starlette (الـ web: routing و requests و middleware) و Pydantic (الفحص والـ JSON). وهو تطبيق ASGI، يعني محتاج سيرفر ASGI يشغّله: uvicorn.

[[@app.get("/health")]] بيسجّل الدالة كـ handler لـ GET على المسار ده. والدالة بترجع dict أو list أو Pydantic model، و FastAPI بيحوّلها JSON. ونوع الرجوع ([[-> dict[str, bool]]]) بيستخدمه للتوثيق ولفحص وتحويل الرد (درس response model).

[[fastapi dev]] جواه [[uvicorn --reload]] على 127.0.0.1. و [[fastapi run]] بيشغّل uvicorn على 0.0.0.0:8000 من غير reload، و [[--workers N]] لأكتر من process. والاتنين بيدوّروا على التطبيق في [[main.py]] أو [[app/main.py]] وأماكن مشهورة زيهم لو مدتلوش مسار، أو في [[entrypoint]] من pyproject.

[[/docs]] (Swagger UI) و [[/redoc]] و [[/openapi.json]] بيتولدوا لوحدهم. وفي الإنتاج ممكن تقفلهم: [[FastAPI(docs_url=None, redoc_url=None, openapi_url=None)]].

و [[fastapi[standard]]] بيجيب uvicorn و httpx (للـ TestClient) و python-multipart (للـ forms) و email-validator و pydantic-settings وغيرهم. من غير [[[standard]]] بتاخد FastAPI لوحده.`,
            when: R`أي API جديد بـ Python. [[fastapi dev]] على جهازك، و [[fastapi run]] أو uvicorn مباشرة في Docker (تاب Python فيه الـ Dockerfile والإعدادات ورا nginx).`,
            mistakes: R`[[fastapi dev]] في الإنتاج (reload، وعلى 127.0.0.1 فمن برّه الـ container مش هيوصل). وملف اسمه [[fastapi.py]] في المشروع. و [[pip install fastapi]] من غير [[[standard]]] وتستغرب إن أمر [[fastapi]] بيطلعلك رسالة «please install fastapi[standard]» بدل ما يشغّل. وتسيب [[/docs]] مفتوحة في الإنتاج لـ API داخلي.`
          },
          lines: [
            "الكلاس الأساسي.",
            "التطبيق، والعنوان والنسخة بيظهروا في /docs.",
            "الدالة اللي تحت بترد على GET /.",
            "دالة async ونوع الرجوع مكتوب.",
            "dict بيتحوّل JSON لوحده.",
            R`route تاني، و [[tags]] بتجمّعه في مجموعة في /docs.`,
            "الدالة.",
            "الرد."
          ]
        },
        {
          cmd: "path و query",
          title: "تاخد قيم من المسار ومن ?page=2 بأنواعها",
          desc: R`أي حاجة في المسار بين [[{}]] بتبقى path parameter: [[@app.get("/items/{item_id}")]] و [[item_id: int]]. وأي باراميتر في الدالة مش في المسار ومش model بيبقى query parameter: [[page: int = 1]] يعني [[?page=2]].

FastAPI بيحوّل للنوع ويفحص: [[/items/abc]] بيرجع 422 برسالة واضحة من غير ما تكتب حاجة. والقيود الزيادة بـ [[Annotated]]: [[Annotated[int, Query(ge=1, le=100)]]].`,
          example: R`from typing import Annotated, Literal
from fastapi import FastAPI, Path, Query
from pydantic import BaseModel, Field
app = FastAPI()
@app.get("/items/{item_id}")
async def get_item(item_id: Annotated[int, Path(ge=1)]):
    return {"item_id": item_id}
@app.get("/items")
async def list_items(
    q: Annotated[str | None, Query(max_length=50)] = None,
    page: Annotated[int, Query(ge=1)] = 1,
    size: Annotated[int, Query(ge=1, le=100)] = 20,
    tags: Annotated[list[str] | None, Query()] = None,
    sort: Literal["new", "price"] = "new",
):
    return {"q": q, "page": page, "size": size, "tags": tags, "sort": sort}
class Filters(BaseModel):
    min_price: float = Field(0, ge=0)
    in_stock: bool = True
@app.get("/products")
async def products(filters: Annotated[Filters, Query()]):
    return filters`,
          try: R`جرّب في المتصفح: [[/items/0]] و [[/items/abc]] و [[/items?size=500]] و [[/items?tags=a&tags=b&sort=old]] و [[/products?min_price=-1]]، واقرا كل رد 422. وبعدين افتح [[/docs]] وشوف القيود ظهرت في التوثيق.`,
          flag: "script",
          deep: {
            why: R`من غير FastAPI بتكتب لكل endpoint: اقرا الـ query، حوّل لـ int، لو فشل ارجع 400، اتأكد إنه أكبر من صفر... و FastAPI بيعمل ده كله من النوع، وبيكتب التوثيق كمان.`,
            how: R`FastAPI بيقرا signature الدالة وقت ما التطبيق يقوم ويقرر مصدر كل باراميتر: اسمه في المسار؟ path. نوعه Pydantic model؟ body. غير كده؟ query. ومع كل request بيجمع القيم ويفحصها بـ Pydantic.

[[Annotated[type, metadata]]] الطريقة الموصى بيها: النوع الحقيقي الأول، والـ metadata ([[Query]] و [[Path]] و [[Depends]]) بعده، والـ default بـ [[=]] عادي. والقديمة [[page: int = Query(1, ge=1)]] لسه شغالة بس مش مفضلة.

القيود: [[ge]] و [[le]] و [[gt]] و [[lt]] للأرقام، و [[min_length]] و [[max_length]] و [[pattern]] للنصوص. و [[list[str]]] في query بيقبل نفس الاسم كذا مرة ([[?tags=a&tags=b]]). و [[Literal]] بيقبل قيم محددة بس. والـ bool بيقبل [[true]] و [[1]] و [[yes]] و [[on]].

ولو الـ query params كتير، اعملهم Pydantic model و [[Annotated[Filters, Query()]]] (FastAPI 0.115+)، ولو عايز ترفض أي باراميتر زيادة: [[model_config = {"extra": "forbid"}]] في الموديل.

وترتيب الـ routes مهم: [[/users/me]] لازم يتعرّف قبل [[/users/{user_id}]]، وإلا "me" هتتقري كـ user_id وترجع 422.`,
            when: R`path للي بيحدد resource ([[/orders/42]]). و query للفلترة والترتيب والـ pagination والبحث. ولو داتا كتير أو حساسة: body (الدرس الجاي).`,
            mistakes: R`[[item_id: str]] والـ id في القاعدة int، فالفحص مش بيحصل. و pagination من غير [[le]] على [[size]]: حد يطلب [[?size=1000000]] ويوقّع القاعدة. وتحط باسورد أو توكن في query (بيتسجل في لوج nginx وفي الـ history).`
          },
          lines: [
            R`[[Annotated]] للـ metadata، و [[Literal]] لقيم محددة.`,
            R`[[Path]] و [[Query]] بيحطوا قيود.`,
            "لموديل الفلاتر.",
            "التطبيق.",
            R`[[{item_id}]] في المسار.`,
            "int ولازم 1 أو أكتر، وإلا 422.",
            "رجّع.",
            "route للقايمة.",
            "كل باراميتر مش في المسار يبقى query.",
            "اختياري، وأقصاه 50 حرف.",
            "رقم الصفحة، على الأقل 1.",
            "حجم الصفحة، بين 1 و 100.",
            R`list: [[?tags=a&tags=b]].`,
            "قيمة من الاتنين دول بس.",
            "قفلة الباراميترات.",
            "رجّع كل حاجة عشان تشوف القيم اتحوّلت لإيه.",
            "موديل للفلاتر.",
            "رقم مش سالب، و default صفر.",
            "bool: بيقبل true و false و 1 و 0.",
            "route بفلاتر كتير.",
            "الموديل كله من الـ query (FastAPI 0.115+).",
            "Pydantic model بيتحوّل JSON لوحده."
          ]
        },
        {
          cmd: "request body",
          title: "تستقبل JSON في POST وتتحقق منه",
          desc: R`لو باراميتر الدالة نوعه Pydantic model، FastAPI بيقرا الـ body كـ JSON، ويفحصه بالموديل، ويديك object جاهز. أي حقل ناقص أو نوعه غلط = 422 تلقائي، ومفيش سطر من كودك بيشتغل أصلًا.

و [[status_code=201]] في الـ decorator للـ create. والـ PATCH بموديل كل حقوله اختيارية، و [[model_dump(exclude_unset=True)]] عشان تعدّل اللي اتبعت بس.`,
          example: R`from fastapi import FastAPI, status
from pydantic import BaseModel, Field
app = FastAPI()
class ProductIn(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    price: float = Field(gt=0)
    tags: list[str] = []
class ProductPatch(BaseModel):
    name: str | None = Field(default=None, min_length=2)
    price: float | None = Field(default=None, gt=0)
DB: dict[int, dict] = {}
@app.post("/products", status_code=status.HTTP_201_CREATED)
async def create_product(product: ProductIn):
    new_id = len(DB) + 1
    DB[new_id] = product.model_dump()
    return {"id": new_id, **DB[new_id]}
@app.patch("/products/{product_id}")
async def update_product(product_id: int, patch: ProductPatch):
    DB[product_id].update(patch.model_dump(exclude_unset=True))
    return DB[product_id]`,
          try: R`من [[/docs]] ابعت [[{"name": "x", "price": -5}]] واقرا الـ 422: فيها خطأين بالمكان بالظبط ([[loc]]). وبعدين ابعت [[{"name": "Tea", "price": "12.5"}]] وشوف السعر اتحوّل float. وجرّب PATCH بـ [[{"price": 20}]] بس.`,
          flag: "script",
          deep: {
            why: R`الـ body هو المكان اللي المستخدم بيبعت فيه أي حاجة. لو قريته كـ dict وحطيته في القاعدة، حد هيبعت [[price: -100]] أو [["role": "admin"]]. الموديل بيحدد بالظبط إيه المسموح وشكله.`,
            how: R`FastAPI بيقرا الـ body مرة، ويفحصه بالموديل، ولو فشل بيرجع 422 فيه ليستة [[detail]] لكل خطأ: [[loc]] (المكان: [[["body", "price"]]]) و [[msg]] و [[type]].

الحقول الزيادة اللي مش في الموديل بتتشال بهدوء افتراضيًا (مبتوصلكش). ولو عايز ترفضها: [[model_config = ConfigDict(extra="forbid")]].

و Pydantic في الوضع العادي (lax) بيحوّل الحاجات المنطقية: [["12.5"]] لـ float، و [["true"]] لـ bool. ولو عايز صارم: [[strict=True]].

والـ default الـ mutable ([[tags: list[str] = []]]) آمن في Pydantic عكس الدوال العادية: Pydantic بيعمل نسخة لكل object.

[[exclude_unset=True]] بيرجّع الحقول اللي العميل بعتها فعلًا بس، فتقدر تفرّق بين «مبعتش price» و «بعت price: null». ودي أساس PATCH صح.

ولو محتاج قيمة واحدة بسيطة في الـ body من غير موديل: [[Annotated[int, Body()]]]. والملفات بـ [[UploadFile]] والـ forms بـ [[Form()]] (محتاجين python-multipart، وموجود في standard).`,
            when: R`أي POST أو PUT أو PATCH. موديل منفصل للإنشاء ([[ProductIn]]) وللتعديل ([[ProductPatch]]) وللرد ([[ProductOut]]، الدرس الجاي)، حتى لو شبه بعض.`,
            mistakes: R`موديل واحد للإنشاء والرد وفيه [[id]] و [[password]]. و [[update(patch.model_dump())]] من غير [[exclude_unset]] فكل الحقول اللي مبعتتش تبقى None. و [[async def create(data: dict)]]: كده مفيش أي فحص.`
          },
          lines: [
            R`[[status]] فيه أسماء لأكواد HTTP.`,
            "الموديل والقيود.",
            "التطبيق.",
            "شكل الـ body المسموح في الإنشاء.",
            "string بين 2 و 100 حرف.",
            "رقم أكبر من صفر.",
            "اختياري، و default فاضي (آمن في Pydantic).",
            "موديل للتعديل: كل حاجة اختيارية.",
            "اختياري، بس لو اتبعت لازم حرفين على الأقل.",
            "نفس الفكرة.",
            "قاعدة بيانات وهمية في الذاكرة للتجربة.",
            "POST، والرد 201 Created.",
            "باراميتر نوعه موديل: يبقى الـ body.",
            "id جديد.",
            R`[[model_dump]] بيحوّل الموديل لـ dict.`,
            "رجّع الـ id مع البيانات.",
            "PATCH على منتج.",
            "path و body مع بعض.",
            "عدّل الحقول اللي اتبعتت بس.",
            "رجّع بعد التعديل."
          ]
        },
        {
          cmd: "response model",
          title: "تحدد شكل الرد، وتضمن إن الباسورد مايطلعش",
          desc: R`نوع الرجوع بتاع الدالة ([[-> UserOut]]) بيقول لـ FastAPI شكل الرد: بيفحصه، وبيشيل أي حقل مش في الموديل، وبيوثّقه في [[/docs]]. فلو رجّعت object فيه [[password_hash]] والموديل مفيهوش، مش هيطلع للعميل.

ولو الدالة بترجع حاجة مختلفة عن الموديل (dict أو ORM object)، استخدم [[response_model=UserOut]] في الـ decorator بدل نوع الرجوع. ولما يبقى فيه response model، FastAPI بيعمل الـ JSON بـ Pydantic مباشرة (في Rust)، وده أسرع كمان.`,
          example: R`from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
app = FastAPI()
class UserOut(BaseModel):
    id: int
    email: EmailStr
    name: str
class UserInDB(UserOut):
    password_hash: str
class UserRow:
    def __init__(self, id: int, email: str, name: str, password_hash: str):
        self.id, self.email, self.name, self.password_hash = id, email, name, password_hash
@app.get("/users/{user_id}")
async def get_user(user_id: int) -> UserOut:
    return UserInDB(id=user_id, email="sara@example.com", name="Sara", password_hash="$argon2id$...")
@app.get("/users", response_model=list[UserOut])
async def list_users():
    return [UserRow(1, "sara@example.com", "Sara", "$argon2id$...")]`,
          try: R`افتح [[/users/1]] وشوف الرد مفيهوش [[password_hash]]. وبعدين غيّر نوع الرجوع لـ [[-> UserInDB]] وشوف طلع. وجرّب ترجّع email غلط زي [["x"]] من الدالة: هيطلع 500 مش 422، لأن الغلط عندك انت مش عند العميل.`,
          flag: "script",
          deep: {
            why: "أشهر تسريب بيانات في APIs: endpoint بيرجّع الـ object من القاعدة زي ما هو، وفيه password_hash أو توكنات أو حقول داخلية. الـ response model قايمة بيضا: اللي مش مكتوب فيها مبيطلعش.",
            how: R`FastAPI بياخد اللي الدالة رجّعته ويفحصه بالـ response model (وبيقرا الـ attributes من أي object، مش dict بس)، وبعدين يحوّله JSON. الحقول الزيادة بتتشال، والناقصة أو الغلط بترمي [[ResponseValidationError]] (يعني 500): ده bug عندك.

نوع الرجوع ولا [[response_model]]؟ لو الدالة بترجّع نفس النوع: اكتبه نوع رجوع، والمحرر و mypy هيفهموه. لو بترجع حاجة تانية (ORM object أو dict) والرد موديل: [[response_model]]، لأنك لو كتبت [[-> UserOut]] ورجّعت UserRow، mypy هيعترض. ولو الاتنين موجودين، [[response_model]] بيكسب.

ولما تعمل [[UserOut.model_validate(row)]] بنفسك على object مش dict، محتاج [[model_config = ConfigDict(from_attributes=True)]] (اسمها القديم [[orm_mode]] في v1).

خيارات مفيدة: [[response_model_exclude_none=True]] يشيل الحقول اللي None. ووجود response model بيخلي FastAPI يطلّع الـ JSON من Pydantic مباشرة، فـ [[ORJSONResponse]] بقت deprecated ومش محتاجها.

ولو رجّعت [[Response]] أو [[RedirectResponse]] مباشرة، FastAPI بيعدّيها زي ما هي من غير فحص.`,
            when: R`كل endpoint بيرجّع داتا من القاعدة. اعمل عيلة موديلات: [[UserBase]] (المشترك)، و [[UserCreate]] (فيه password)، و [[UserOut]] (فيه id ومفيهوش password)، و [[UserInDB]] (فيه الـ hash).`,
            mistakes: R`ترجّع [[dict(row)]] من غير response model. و [[response_model=User]] والموديل فيه password لأنه نفس موديل الإدخال. و [[-> dict]] كنوع رجوع وتفتكر كده متوثّق (مفيش شكل). وتستخدم [[response_model_exclude]] كحماية بدل موديل منفصل.`
          },
          lines: [
            "FastAPI.",
            R`[[EmailStr]] بيفحص الإيميل (محتاج email-validator، وموجود في standard).`,
            "التطبيق.",
            "شكل الرد: اللي هنا بس اللي هيطلع.",
            "حقل.",
            "حقل.",
            "حقل.",
            "موديل داخلي: كل حقول الرد وزيادة.",
            "الحقل اللي مينفعش يطلع.",
            "زي صف راجع من ORM: object عادي مش dict.",
            "constructor.",
            "خزّن القيم كـ attributes.",
            "route.",
            "نوع الرجوع هو الـ response model.",
            R`بنرجّع الموديل الداخلي، و FastAPI بيشيل [[password_hash]].`,
            R`هنا الدالة بترجّع objects مش UserOut، فالموديل في [[response_model]].`,
            "الدالة.",
            "FastAPI بيقرا الـ attributes من كل object ويبني منها UserOut."
          ]
        },
        {
          cmd: "APIRouter",
          title: "تقسّم الـ API على ملفات",
          desc: R`بدل ما كل الـ routes في [[main.py]]، كل مجموعة في ملف ليها [[APIRouter]] بـ [[prefix]] و [[tags]]، و [[main.py]] بيجمعهم بـ [[app.include_router]]. والـ router ينفع ياخد dependencies تتطبق على كل routes بتاعته (زي auth على كل [[/admin]]).`,
          example: R`# app/routers/orders.py
from fastapi import APIRouter, Depends
from app.deps import require_user
router = APIRouter(prefix="/orders", tags=["orders"], dependencies=[Depends(require_user)])
@router.get("/")
async def list_orders():
    return []
@router.get("/{order_id}")
async def get_order(order_id: int):
    return {"id": order_id}
# app/main.py
from fastapi import FastAPI
from app.routers import orders, users
app = FastAPI()
app.include_router(users.router)
app.include_router(orders.router, prefix="/api/v1")`,
          try: R`قسّم التطبيق بتاعك لـ [[users.py]] و [[orders.py]]، وافتح [[/docs]]: هتلاقي كل مجموعة تحت الـ tag بتاعها. وبعدين اطبع المسارات كلها: [[print(list(app.openapi()["paths"]))]].`,
          flag: "script",
          deep: {
            why: R`بعد ٢٠ endpoint، [[main.py]] بقى ٨٠٠ سطر وكل الفريق بيعدّل فيه، والـ conflicts في كل merge. الـ routers بتقسّم الكود حسب الـ domain.`,
            how: R`[[APIRouter]] زي app مصغّر: بتسجّل عليه routes بنفس الـ decorators. و [[include_router]] بيربط الـ router بالتطبيق (من FastAPI 0.137 مبقاش بينسخ الـ routes، والربط live: أي route تضيفه للـ router بعد الـ include بيشتغل برضه) ويركّب الـ prefixes: [[/api/v1]] + [[/orders]] + [[/{order_id}]].

[[dependencies=[Depends(...)]]] على الـ router بتشتغل قبل كل route فيه، وقيمتها مبتتبعتش للدالة (للفحص بس، زي auth). ونفس الخيار موجود على [[include_router]] وعلى الـ decorator.

شكل مشروع متوسط: [[app/main.py]] (التطبيق والـ lifespan والـ routers)، و [[app/config.py]] (الإعدادات)، و [[app/deps.py]] (الـ dependencies المشتركة)، و [[app/routers/]] (الـ HTTP)، و [[app/services/]] أو [[app/repositories/]] (المنطق والـ SQL)، و [[app/schemas.py]] (موديلات Pydantic). والـ routers رفيعة: تقرا الـ request وتنادي service وترجّع.

والـ versioning بالـ prefix ([[/api/v1]]) أبسط طريقة، وتفاصيله وتصميم الـ URLs في تاب «APIs متقدمة».`,
            when: "من أول ما يبقى عندك أكتر من resource واحد.",
            mistakes: R`circular import: [[routers/users.py]] بيعمل import من [[main.py]] (عشان [[app]]) و [[main.py]] بيعمل import من الـ router. الـ router مش محتاج [[app]] أصلًا. و [[prefix="/orders/"]] بشرطة في الآخر: FastAPI بيرمي [[AssertionError]] («A path prefix must not end with '/'») والتطبيق مش هيقوم أصلًا، فاكتبها [[/orders]] من غير شرطة. والـ SQL والمنطق كله جوه دوال الـ routes.`
          },
          lines: [
            "Router و Depends.",
            "dependency بتتأكد إن فيه مستخدم (قسم الـ dependencies).",
            R`كل routes الملف تحت [[/orders]]، في مجموعة orders، ومحمية.`,
            R`GET [[/orders/]].`,
            "الدالة.",
            "رجّع.",
            R`GET [[/orders/{order_id}]].`,
            "الدالة.",
            "رجّع.",
            "في main: FastAPI.",
            "الـ modules اللي فيها routers.",
            "التطبيق.",
            "ضيف routes المستخدمين.",
            R`ضيف routes الطلبات تحت [[/api/v1]]: المسار النهائي [[/api/v1/orders/]].`
          ]
        }
      ]
    },
    {
      t: "Pydantic v2",
      l: 2,
      n: "موديلات بتفحص وتحوّل الداتا وقت التشغيل، و validators بتاعتك، والإعدادات من env",
      items: [
        {
          cmd: "BaseModel و Field",
          title: "موديل بيفحص الداتا بجد وقت التشغيل",
          desc: R`Pydantic بيعمل اللي Zod بيعمله في TypeScript: موديل بتوصف فيه الشكل بالـ type hints، ولما تعمل منه object بيفحص ويحوّل، ولو فيه غلط بيرمي [[ValidationError]] فيه كل المشاكل مع بعض. ومن نفس الموديل بيطلع JSON Schema (اللي FastAPI بيستخدمه للتوثيق).

[[Field(...)]] للقيود والـ defaults، و [[Annotated]] عشان تعمل نوع بقيوده وتستخدمه في كذا مكان. والنسخة الحالية Pydantic v2 (الـ core بتاعها مكتوب بـ Rust)، و FastAPI الحديث مبيقبلش v1 خالص.`,
          example: R`from datetime import date
from typing import Annotated, Literal
from pydantic import BaseModel, ConfigDict, Field, ValidationError
Price = Annotated[float, Field(gt=0, le=1_000_000)]
class Address(BaseModel):
    city: str
    street: str | None = None
class Customer(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)
    name: str = Field(min_length=2)
    phone: str = Field(pattern=r"^01[0125]\d{8}$")
    tier: Literal["free", "pro"] = "free"
    birthday: date | None = None
    budget: Price = 100
    address: Address
c = Customer(name="  Sara ", phone="01012345678", birthday="1999-05-01", address={"city": "Cairo"})
print(c.name, c.birthday.year, c.address.city)
try:
    Customer(name="S", phone="123", address={}, role="admin")
except ValidationError as e:
    print(e.error_count())
    print(e.errors()[0]["loc"], e.errors()[0]["msg"])`,
          try: R`اطبع [[e.errors()]] كله وشوف كل خطأ فيه [[loc]] و [[msg]] و [[type]]. وبعدين اطبع [[Customer.model_json_schema()]]: ده اللي بيظهر في [[/docs]]. وجرّب [[budget="50"]] مرة، ومرة مع [[ConfigDict(strict=True)]].`,
          flag: "script",
          deep: {
            why: "الـ type hints العادية مبتفحصش حاجة، و Pydantic هو اللي بيخليها حقيقية: أي داتا جاية من برّه (request، API خارجي، ملف، env، ناتج AI) بتعدّي على الموديل، وجوه الكود بتتعامل مع objects مضمونة الشكل.",
            how: R`الموديل class بيورث من [[BaseModel]]، والـ annotations هي الحقول. ووقت الإنشاء، pydantic-core (Rust) بيفحص كل حقل ويحوّل. في الوضع الافتراضي (lax) بيحوّل الحاجات المنطقية: [["1999-05-01"]] لـ date، و [["100"]] لـ float، و dict لموديل متداخل. و [[strict=True]] بيمنع التحويل.

الحقل من غير default إجباري، و [[X | None = None]] اختياري. (ولو كتبت [[X | None]] من غير default، يبقى إجباري بس مسموح يبقى null.)

[[model_config = ConfigDict(...)]] إعدادات الموديل (كانت [[class Config]] في v1): [[extra="forbid"]] بيرفض الحقول الزيادة (الافتراضي [[ignore]] بيشيلها بهدوء)، و [[str_strip_whitespace]] بيشيل المسافات، و [[frozen=True]] بيمنع التعديل.

[[Annotated[float, Field(...)]]] بيعمل نوع بقيوده (Price) تستخدمه في أي موديل. وفيه أنواع جاهزة: [[EmailStr]] و [[HttpUrl]] و [[SecretStr]] (مبيطبعش قيمته في اللوج) و [[PositiveInt]].

والـ ValidationError بيجمع كل الأخطاء مش أول واحد بس، وكل خطأ فيه [[loc]] (المسار، زي [[('address', 'city')]]).`,
            when: "كل حدود التطبيق: request و response و env و APIs خارجية وملفات JSON ورسايل queue. وجوه الكود بين دوالك: dataclass، أو نفس الموديل لو جاهز.",
            mistakes: R`أمثلة v1 في مشروع v2 ([[class Config]] و [[.dict()]] و [[@validator]] و [[orm_mode]]): بعضها شغال بتحذير وبعضها اتشال. و [[float]] للفلوس (استخدم [[Decimal]] و Pydantic بيدعمه، أو قروش int). وتفتكر إن [[extra]] الافتراضي بيرفض الزيادة.`
          },
          lines: [
            "نوع التاريخ.",
            R`[[Annotated]] و [[Literal]].`,
            "الموديل، والإعدادات، والقيود، والخطأ.",
            "نوع بقيوده، تستخدمه في كذا موديل.",
            "موديل متداخل.",
            "إجباري.",
            "اختياري.",
            "الموديل الأساسي.",
            "ارفض الحقول الزيادة، وشيل المسافات من النصوص.",
            "حرفين على الأقل (بعد شيل المسافات).",
            "رقم موبايل مصري بـ regex.",
            "قيمة من اتنين، والافتراضي free.",
            "تاريخ اختياري: الـ string بيتحوّل date.",
            "النوع اللي عملناه فوق.",
            "موديل جوه موديل: الـ dict بيتحوّل Address.",
            "داتا سليمة: كل حاجة اتحوّلت.",
            R`[[Sara]] من غير مسافات، و [[1999]] لأن birthday بقت date.`,
            "داتا غلط.",
            "٤ مشاكل: اسم قصير، وموبايل غلط، و city ناقصة، و role زيادة.",
            "امسك الخطأ.",
            "كل الأخطاء اتجمعت: 4.",
            "كل خطأ فيه مكانه ورسالته."
          ]
        },
        {
          cmd: "model_dump و model_validate",
          title: "من موديل لـ dict و JSON، ومن ORM لموديل",
          desc: R`في Pydantic v2 كل الـ methods بتبدأ بـ [[model_]]: [[model_dump()]] لـ dict، و [[model_dump_json()]] لـ JSON string، و [[model_validate(data)]] من dict أو object، و [[model_validate_json(raw)]] من JSON string على طول (أسرع من [[json.loads]] وبعدين validate)، و [[model_copy(update=...)]] لنسخة معدّلة.

ولو عايز تفحص حاجة مش موديل ([[list[Item]]] مثلًا): [[TypeAdapter]].`,
          example: R`from datetime import datetime
from pydantic import BaseModel, ConfigDict, TypeAdapter
class Item(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    note: str | None = None
    created_at: datetime
item = Item.model_validate({"id": 1, "name": "Tea", "created_at": "2026-01-10T09:00:00Z"})
print(item.model_dump())
print(item.model_dump(mode="json", exclude_none=True))
print(item.model_dump_json(include={"id", "name"}))
raw = '{"id": 2, "name": "Coffee", "created_at": "2026-01-10T10:00:00Z"}'
item2 = Item.model_validate_json(raw)
renamed = item.model_copy(update={"name": "Green tea"})
items = TypeAdapter(list[Item]).validate_python([{"id": 3, "name": "Cake", "created_at": "2026-01-10T11:00:00Z"}])
class Row:
    id, name, note, created_at = 4, "Juice", None, datetime(2026, 1, 1)
from_orm = Item.model_validate(Row())`,
          try: R`قارن [[item.model_dump()]] بـ [[item.model_dump(mode="json")]] واطبع نوع [[created_at]] في الاتنين. وبعدين جرّب [[Item.model_validate(Row())]] من غير [[from_attributes]] واقرا الخطأ.`,
          flag: "script",
          deep: {
            why: "الموديل بيتنقل بين طبقات كتير: من JSON جاي، لـ dict تحطه في القاعدة، لـ JSON راجع، أو لـ Redis. لازم تعرف تحوّل في كل اتجاه من غير ما تخسر الفحص. والأسماء اتغيرت بين v1 و v2، فأمثلة النت القديمة بتلخبط.",
            how: R`جدول التحويل من v1: [[.dict()]] بقت [[model_dump()]]، و [[.json()]] بقت [[model_dump_json()]]، و [[parse_obj]] بقت [[model_validate]]، و [[parse_raw]] بقت [[model_validate_json]]، و [[.copy()]] بقت [[model_copy()]]، و [[orm_mode]] بقت [[from_attributes]]، و [[schema()]] بقت [[model_json_schema()]]. والقديمة بعضها لسه موجود بـ DeprecationWarning.

[[model_dump()]] الافتراضي (mode python) بيسيب الـ datetime و Decimal و UUID objects زي ما هي. و [[mode="json"]] بيحوّلها لأنواع JSON (strings و numbers)، ودي اللي محتاجها لو هتبعت الـ dict لـ [[json.dumps]] أو Redis. و [[exclude_unset]] و [[exclude_none]] و [[include]] و [[exclude]] و [[by_alias]] للتحكم.

[[model_validate_json]] بيعمل parse و validate في خطوة واحدة جوه Rust: أسرع وبياكل ذاكرة أقل.

[[from_attributes=True]] بيخلي [[model_validate]] يقرا attributes من أي object (زي صف SQLAlchemy). و Record بتاع asyncpg حوّله [[dict(record)]] الأول.

[[TypeAdapter]] بيعمل validate و dump و JSON schema لأي نوع: [[list[Item]]] و [[dict[str, int]]] و [[int | None]]. اعمله مرة على مستوى الـ module، مش جوه loop، لأن بناؤه مكلف.

و [[model_copy(update=...)]] مبيفحصش القيم الجديدة: لو محتاج فحص، اعمل [[model_validate]] على dict جديد.`,
            when: R`[[model_dump(exclude_unset=True)]] للـ PATCH. و [[mode="json"]] قبل أي تخزين كـ JSON. و [[model_validate_json]] لما القيمة جاية string (Redis، queue، ملف). و [[from_attributes]] مع الـ ORMs.`,
            mistakes: R`[[json.dumps(item.model_dump())]] فيطلع [[TypeError: Object of type datetime is not JSON serializable]]: استخدم [[model_dump_json()]] أو [[mode="json"]]. و [[TypeAdapter(...)]] جوه دالة بتتنادى مع كل request. و [[dict(item)]] بدل [[model_dump]] (سطحي: الموديلات المتداخلة بتفضل objects).`
          },
          lines: [
            "datetime.",
            "الموديل، والإعدادات، و TypeAdapter.",
            "موديل.",
            "يقبل objects بـ attributes مش dicts بس.",
            "حقل.",
            "حقل.",
            "اختياري.",
            "بيتحوّل من string لـ datetime.",
            R`من dict: فحص وتحويل (كانت [[parse_obj]] في v1).`,
            R`dict، و [[created_at]] لسه datetime object.`,
            "dict كله أنواع JSON (التاريخ بقى string)، ومن غير الحقول اللي None.",
            "JSON string بحقول معينة بس.",
            "JSON جاي string (من Redis مثلًا).",
            "parse و validate في خطوة واحدة جوه Rust.",
            "نسخة بتعديل، والأصل زي ما هو.",
            "فحص ليستة موديلات من غير ما تعمل موديل wrapper.",
            "object عادي زي صف من ORM.",
            "attributes.",
            R`[[from_attributes]] خلّاه يقرا الـ attributes.`
          ]
        },
        {
          cmd: "field_validator و model_validator",
          title: "قواعد فحص بتاعتك: حقل لوحده أو حقول مع بعض",
          desc: R`لو القيود الجاهزة مش كفاية: [[@field_validator("field")]] دالة بتفحص أو تعدّل حقل واحد، و [[@model_validator(mode="after")]] بتفحص الموديل كله بعد ما كل حقل اتفحص (زي «تاريخ النهاية بعد البداية»). ارمي [[ValueError]] برسالة، و Pydantic بيحوّلها لخطأ في الـ ValidationError في المكان الصح.

و [[@computed_field]] حقل محسوب بيظهر في [[model_dump]] وفي الـ JSON.`,
          example: R`from datetime import date
from typing import Self
from pydantic import BaseModel, computed_field, field_validator, model_validator
class Booking(BaseModel):
    email: str
    start: date
    end: date
    guests: int
    @field_validator("email")
    @classmethod
    def normalize_email(cls, v: str) -> str:
        v = v.strip().lower()
        if not v.endswith("@company.com"):
            raise ValueError("لازم إيميل الشركة")
        return v
    @model_validator(mode="after")
    def check_dates(self) -> Self:
        if self.end <= self.start:
            raise ValueError("end لازم بعد start")
        return self
    @computed_field
    @property
    def nights(self) -> int:
        return (self.end - self.start).days
b = Booking(email=" Sara@Company.com ", start="2026-03-01", end="2026-03-04", guests=2)
print(b.model_dump())`,
          try: R`ابعت [[end]] قبل [[start]] واقرا مكان الخطأ في [[e.errors()]] (هيبقى على الموديل كله مش على حقل). وبعدين ضيف [[@field_validator("guests")]] بيرفض أكتر من 6، وقارنه بإنك تكتب [[Field(le=6)]] (الأبسط دايمًا أحسن).`,
          flag: "script",
          deep: {
            why: "قواعد الـ business الحقيقية مش دايمًا «رقم أكبر من صفر»: إيميل من دومين معين، تاريخين مرتبطين، حقل إجباري لو حقل تاني اتبعت. لو فحصتها جوه الـ route هتتكرر وتتنسى. في الموديل بتتطبّق في كل حتة وبتطلع 422 بنفس الشكل.",
            how: R`[[field_validator]] الافتراضي [[mode="after"]]: بيشتغل بعد ما Pydantic حوّل القيمة للنوع، فـ [[v]] مضمون str. و [[mode="before"]] بيشتغل على القيمة الخام قبل التحويل (مفيد لو هتحوّل [["a,b,c"]] لـ list). ولازم [[@classmethod]] تحته، ولازم ترجّع القيمة حتى لو معدّلتهاش.

[[model_validator(mode="after")]] بياخد [[self]] بعد ما كل الحقول اتفحصت، ولازم يرجّع [[self]]. و [[mode="before"]] بياخد الداتا الخام (غالبًا dict).

ارمي [[ValueError]] (أو [[PydanticCustomError]] لو عايز type خاص بيك). ومتستخدمش [[assert]] للفحص، لأنها بتتشال لو Python اشتغل بـ [[-O]].

وفيه طريقة أخف بـ Annotated: [[Annotated[str, AfterValidator(fn)]]] بتعمل نوع ومعاه الـ validator بتاعه وتستخدمه في كذا موديل.

[[@computed_field]] فوق [[@property]] بيضيف الحقل للـ dump والـ JSON schema، بس مبيتقبلش كـ input.

والـ validators بتشتغل وقت الإنشاء بس. لو عدّلت حقل بعدها ([[b.guests = 100]]) مفيش فحص، إلا لو [[validate_assignment=True]] في الـ config.`,
            when: "قاعدة بتخص الداتا نفسها (شكلها وعلاقة الحقول ببعض). أما اللي محتاج قاعدة بيانات («الإيميل متسجل قبل كده؟») فمكانه الـ service أو dependency، مش الـ validator.",
            mistakes: R`تنسى [[return v]] أو [[return self]]. و [[@validator]] و [[@root_validator]] بتوع v1. و validator بيعمل query على القاعدة (sync، وجوه تطبيق async، ومش مكانه). و validator لحاجة [[Field]] بيعملها أصلًا ([[ge]] و [[max_length]] و [[pattern]]).`
          },
          lines: [
            "date.",
            R`[[Self]] لنوع الرجوع (3.11+).`,
            "الـ decorators.",
            "موديل حجز.",
            "حقل.",
            "بيتحوّل date.",
            "نفس الكلام.",
            "حقل.",
            "validator على حقل email.",
            "لازم يبقى classmethod.",
            R`[[v]] القيمة بعد ما اتحوّلت str.`,
            "نضّفها.",
            "قاعدة بتاعتك.",
            R`[[ValueError]] بيبقى خطأ عادي في الـ 422.`,
            "رجّع القيمة (المعدّلة).",
            "validator على الموديل كله بعد فحص كل الحقول.",
            R`بياخد [[self]].`,
            "قاعدة بين حقلين.",
            "ارمي.",
            "لازم ترجّع self.",
            "حقل محسوب بيظهر في الـ dump والـ JSON.",
            "property عادية.",
            "عدد الليالي.",
            "الحسبة.",
            "الإيميل هيتنضّف، والتواريخ هتتحوّل.",
            R`فيه [[nights: 3]]، والإيميل [[sara@company.com]].`
          ]
        },
        {
          cmd: "pydantic-settings",
          title: "الإعدادات من env و .env بأنواعها",
          desc: R`[[pydantic-settings]] (مكتبة منفصلة عن Pydantic، و [[fastapi[standard]]] الحديث بيسطّبها معاه) فيها [[BaseSettings]]: موديل بيملّي حقوله من متغيرات البيئة ومن ملف [[.env]]، ويفحصها ويحوّلها. لو [[DATABASE_URL]] ناقص وانت بتنادي [[get_settings()]] مرة وقت الـ startup (في الـ lifespan)، التطبيق يقع وهو بيقوم برسالة واضحة، مش بعد ساعة في أول request.

واعمل الإعدادات مرة واحدة ([[@lru_cache]] على دالة)، واستخدمها كـ dependency عشان تعرف تغيّرها في الاختبارات.`,
          example: R`from functools import lru_cache
from typing import Annotated, Literal
from fastapi import Depends, FastAPI
from pydantic import PostgresDsn, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict
class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")
    env: Literal["dev", "test", "prod"] = "dev"
    database_url: PostgresDsn
    redis_url: str = "redis://localhost:6379/0"
    jwt_secret: SecretStr
    cors_origins: list[str] = ["http://localhost:5173"]
    db_pool_size: int = 10
@lru_cache
def get_settings() -> Settings:
    return Settings()
SettingsDep = Annotated[Settings, Depends(get_settings)]
app = FastAPI()
@app.get("/info")
async def info(settings: SettingsDep):
    return {"env": settings.env, "pool": settings.db_pool_size}
# .env:
# DATABASE_URL=postgresql://app:secret@localhost:5432/shop
# JWT_SECRET=change-me-please-32-chars-minimum
# CORS_ORIGINS=["https://shop.example.com"]`,
          try: R`شغّل التطبيق من غير [[.env]] وافتح [[/info]]: هيرجع 500، واقرا الخطأ في الترمنال: فيه اسم كل متغير ناقص. (ولو عايزه يقع وهو بيقوم، نادي [[get_settings()]] في الـ lifespan.) وبعدين اطبع [[settings.jwt_secret]] و [[settings.jwt_secret.get_secret_value()]] وقارن. وجرّب [[DB_POOL_SIZE=abc]].`,
          flag: "script",
          deep: {
            why: R`[[os.environ["DB_URL"]]] متفرقة في ٢٠ ملف: متغير ناقص يظهر بعد الديبلوي في أول request بيحتاجه، و [["10"]] string بيتقارن برقم، والسر بيطلع في اللوج. BaseSettings بيجمع الإعدادات في مكان واحد مفحوص، وأول ما تتقري بيطلع خطأ واحد فيه كل المتغيرات الناقصة (ولو ناديت get_settings() في الـ lifespan، ده بيحصل وقت الـ startup).`,
            how: R`كل حقل بيدوّر على متغير بيئة بنفس الاسم، من غير حساسية لحالة الحروف افتراضيًا: [[database_url]] بياخد [[DATABASE_URL]]. والأولوية: الـ arguments اللي بتديها لـ [[Settings()]]، وبعدين متغيرات البيئة، وبعدين [[.env]]، وبعدين الـ default. يعني متغير البيئة الحقيقي على السيرفر بيكسب على [[.env]].

الأنواع المعقدة ([[list]] و [[dict]] والموديلات) بتتقري كـ JSON من المتغير. و [[env_prefix="APP_"]] لو عايز كل المتغيرات تبدأ ببادئة. و [[env_nested_delimiter="__"]] للموديلات المتداخلة ([[DB__HOST]]).

[[SecretStr]] بيطبع [[**********]] في اللوج والـ repr، والقيمة الحقيقية بـ [[get_secret_value()]]. و [[PostgresDsn]] بيفحص الـ URL، ولما تبعته لـ asyncpg اعمل [[str(settings.database_url)]].

[[@lru_cache]] بيخلي [[Settings()]] يتعمل مرة واحدة (مش مع كل request يقرا .env). ولأن الإعدادات dependency، في الاختبارات تقدر تعمل [[app.dependency_overrides[get_settings] = lambda: Settings(env="test", ...)]].

و [[.env]] في [[.gitignore]] دايمًا، ومعاه [[.env.example]] فيه الأسماء من غير قيم. وفي Docker الـ env بييجي من compose أو secrets (تاب Docker).`,
            when: R`أي تطبيق، من أول يوم، قبل ما تكتب أول [[os.environ]].`,
            mistakes: R`[[Settings()]] على مستوى الـ module في ملف بيتعمله import في الاختبارات، فالاختبارات تقع لو مفيش .env. و [[.env]] في Git. و [[print(settings)]] وفيه سر من غير [[SecretStr]]. و [[from pydantic import BaseSettings]] (ده v1؛ في v2 اتنقلت لمكتبة منفصلة).`
          },
          lines: [
            "cache لدالة الإعدادات.",
            "للـ dependency وللقيم المحددة.",
            "FastAPI.",
            R`[[PostgresDsn]] بيفحص الـ URL، و [[SecretStr]] بيخبي القيمة في الطباعة.`,
            "مكتبة pydantic-settings.",
            "موديل إعدادات.",
            R`اقرا [[.env]] كمان، وتجاهل المتغيرات اللي ملهاش حقل.`,
            R`واحدة من ٣ قيم، من [[ENV]].`,
            "إجباري: ملوش default، ولو ناقص أول ما الإعدادات تتقري بيطلع خطأ باسمه.",
            "ليه default.",
            "سر: مبيطبعش.",
            "list بتتقري JSON من المتغير.",
            R`[["10"]] في env بيبقى int 10.`,
            "مرة واحدة بس.",
            "الدالة اللي بتعمل الإعدادات.",
            "بتقرا env و .env وتفحص.",
            "نوع جاهز للـ dependency (القسم الجاي).",
            "التطبيق.",
            "route.",
            "الإعدادات جت كـ dependency: سهل تغيّرها في الاختبار.",
            "استخدمها."
          ]
        }
      ]
    },
    {
      t: "Dependencies",
      l: 2,
      n: "Depends بيجهّز اللي الـ route محتاجه (اتصال، مستخدم، إعدادات) قبل ما يشتغل، ويقفله بعد ما يخلص",
      items: [
        {
          cmd: "Depends و Annotated",
          title: "تجهّز حاجة لكل route من غير ما تكررها",
          desc: R`الـ dependency دالة FastAPI بيناديها قبل الـ route ويبعت ناتجها كباراميتر. بتاخد باراميترات زي الـ route بالظبط (query و headers وغيرها)، وممكن تعتمد على dependencies تانية.

والطريقة الحديثة: [[Annotated[Type, Depends(fn)]]] وتسمّيه مرة ([[CurrentUser]] و [[Conn]] و [[PageDep]])، وبعدين أي route يكتب [[user: CurrentUser]] وخلاص.`,
          example: R`from typing import Annotated
from fastapi import Depends, FastAPI, Header, HTTPException, Query
from pydantic import BaseModel
app = FastAPI()
class Page(BaseModel):
    limit: int
    offset: int
def pagination(page: Annotated[int, Query(ge=1)] = 1, size: Annotated[int, Query(ge=1, le=100)] = 20) -> Page:
    return Page(limit=size, offset=(page - 1) * size)
PageDep = Annotated[Page, Depends(pagination)]
async def tenant_id(x_tenant_id: Annotated[str, Header()]) -> str:
    if not x_tenant_id.isalnum():
        raise HTTPException(400, "bad tenant")
    return x_tenant_id
TenantDep = Annotated[str, Depends(tenant_id)]
@app.get("/orders")
async def list_orders(page: PageDep, tenant: TenantDep):
    return {"tenant": tenant, "limit": page.limit, "offset": page.offset}
@app.get("/products")
async def list_products(page: PageDep):
    return {"limit": page.limit, "offset": page.offset}`,
          try: R`اطلب [[/orders?page=3]] من غير header [[X-Tenant-Id]] وشوف الـ 422، وبعدين بيه ([[curl -H "X-Tenant-Id: acme" "localhost:8000/orders?page=3"]]). وافتح [[/docs]] وشوف باراميترات الـ dependency ظهرت على الـ route.`,
          flag: "script",
          deep: {
            why: "كل route محتاج نفس الحاجات: اتصال بالقاعدة، والمستخدم الحالي، والإعدادات، والـ pagination. من غير dependencies بتنسخ نفس ٥ سطور في كل route، وأول ما تغيّر حاجة تنسى مكان. وكمان الـ dependency injection بيخلّي الاختبار سهل: تبدّل الـ dependency بنسخة وهمية.",
            how: R`FastAPI بيقرا الـ signature، ويلاقي [[Depends(fn)]]، فيقرا signature الـ fn هي كمان، ويبني شجرة. ومع كل request بيحل الشجرة من تحت لفوق: ينادي كل dependency، ويبعت نواتجها.

الـ cache: لو نفس الـ dependency مطلوبة في كذا مكان في نفس الـ request (الـ route واتنين dependencies تانيين)، بتتنادى مرة واحدة والناتج بيتشارك. و [[Depends(fn, use_cache=False)]] لو عايزها كل مرة.

باراميترات الـ dependency بتظهر في التوثيق وبتتفحص زي باراميترات الـ route بالظبط، و [[HTTPException]] منها بيوقف الـ request قبل ما الـ route يشتغل. و [[x_tenant_id]] بيتقري من header اسمه [[x-tenant-id]] (الـ _ بتتحوّل -).

[[def]] ولا [[async def]]: نفس قاعدة الـ routes، والـ [[def]] بتشتغل في threadpool.

والـ class ينفع يبقى dependency ([[Depends(Pagination)]] بينادي الـ constructor)، والـ Pydantic model كمان.`,
            when: "أي حاجة بتتكرر في أكتر من route: auth، واتصال القاعدة، والإعدادات، والـ pagination، و tenant، و rate limit، و feature flags.",
            mistakes: R`[[Depends(get_db())]] بالقوسين: كده بتنادي الدالة مرة وقت التعريف وتبعت ناتجها. اكتب اسمها بس. و [[page: Page = Depends(pagination)]] في كل route بدل ما تعمل النوع مرة بـ Annotated. و dependency تقيلة (query على القاعدة) على كل الـ routes وهي لازمة لبعضهم بس.`
          },
          lines: [
            "Annotated.",
            "Depends، و Header لقراية الـ headers.",
            "موديل للنتيجة.",
            "التطبيق.",
            "شكل الـ pagination.",
            "حقل.",
            "حقل.",
            "dependency: باراميتراتها query عادية بقيود.",
            "حوّلهم لـ limit و offset.",
            "نوع بالـ dependency بتاعته، تكتبه مرة واحدة.",
            R`dependency بتقرا header [[X-Tenant-Id]].`,
            "فحص.",
            "بيوقف الـ request قبل الـ route.",
            "رجّع القيمة.",
            "نوع تاني.",
            "route.",
            "باراميترين، كل واحد جاي من dependency.",
            "استخدمهم.",
            "route تاني بنفس الـ pagination.",
            "سطر واحد.",
            "رجّع."
          ]
        },
        {
          cmd: "dependency بـ yield",
          title: "تفتح اتصال قبل الـ route وتقفله بعده",
          desc: R`لو الـ dependency فيها [[yield]]، اللي قبل الـ yield بيشتغل قبل الـ route، والقيمة اللي بتتعمل لها yield بتروح للـ route، واللي بعد الـ yield (التنضيف) بيشتغل بعد ما الـ route يخلص. ده المكان الطبيعي لـ: خد اتصال من الـ pool، وابدأ transaction، و commit أو rollback، ورجّع الاتصال.

والحاجات المشتركة بين كل الطلبات (الـ pool نفسه، و HTTP client) مكانها الـ [[lifespan]]: بتتعمل مرة لما التطبيق يقوم وتتقفل لما يقفل.`,
          example: R`from collections.abc import AsyncIterator
from contextlib import asynccontextmanager
from typing import Annotated
import asyncpg
from fastapi import Depends, FastAPI, Request
@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncIterator[None]:
    app.state.pool = await asyncpg.create_pool("postgresql://app:secret@localhost/shop", min_size=2, max_size=10)
    yield
    await app.state.pool.close()
app = FastAPI(lifespan=lifespan)
async def get_conn(request: Request) -> AsyncIterator[asyncpg.Connection]:
    async with request.app.state.pool.acquire() as conn:
        async with conn.transaction():
            yield conn
Conn = Annotated[asyncpg.Connection, Depends(get_conn, scope="function")]
@app.post("/orders")
async def create_order(conn: Conn):
    order_id = await conn.fetchval("INSERT INTO orders DEFAULT VALUES RETURNING id")
    await conn.execute("INSERT INTO order_events (order_id, kind) VALUES ($1, 'created')", order_id)
    return {"id": order_id}`,
          try: R`ضيف [[raise HTTPException(400)]] بعد أول INSERT وشوف إن مفيش صف اتحط (rollback). وبعدين اطبع حاجة بعد الـ [[yield]] مرة بـ [[scope="function"]] ومرة من غيرها، وشوف بتتطبع قبل الرد ولا بعده.`,
          flag: "script",
          deep: {
            why: "اتصال بيتاخد من الـ pool ومبيرجعش لأن exception حصل في النص: بعد ١٠ أخطاء الـ pool خلص والـ API واقف. و transaction نصها اتنفذ بتسيب داتا بايظة. الـ dependency بـ yield بتضمن التنضيف في كل الحالات، في مكان واحد.",
            how: R`FastAPI بيشغّل الـ dependency لحد الـ yield، ويدّي القيمة للـ route. ولو الـ route رمى exception (حتى [[HTTPException]])، بيترمي جوه الـ dependency عند الـ yield: [[async with conn.transaction()]] بيشوفه فيعمل rollback. ولو مفيش exception بيعمل commit.

التوقيت: الافتراضي ([[scope="request"]]) إن اللي بعد الـ yield بيشتغل بعد ما الرد يتبعت للعميل. يعني الـ commit بيحصل بعد ما العميل خد 200، ولو فشل العميل مش هيعرف. و [[Depends(get_conn, scope="function")]] (FastAPI الحديث) بيخلي التنضيف يشتغل أول ما الـ route يخلص وقبل الرد، فالـ commit الفاشل يبقى 500 زي ما المفروض. (الـ StreamingResponse محتاج العكس: الاتصال مفتوح لحد ما الـ stream يخلص، فسيبها request.)

ولو عملت [[try/except]] حوالين الـ yield، لازم ترمي الـ exception تاني بعد ما تتعامل معاه ([[raise]])، وإلا FastAPI ميعرفش إن حصل خطأ.

والـ [[lifespan]]: [[@asynccontextmanager]] (درس [[with]]) بيتنادى مرة: اللي قبل الـ yield وقت ما التطبيق يقوم (قبل أي request)، واللي بعده وقت ما يقفل (SIGTERM من [[docker stop]]). و [[app.state]] مكان تحط فيه الحاجات المشتركة وتوصلها من [[request.app.state]]. و [[@app.on_event("startup")]] القديمة deprecated.`,
            when: "أي مورد ليه فتح وقفل لكل request: اتصال DB، و session، و transaction، و lock. والموارد المشتركة طول عمر التطبيق (pool، و httpx client، و Redis، وموديل AI): lifespan.",
            mistakes: R`تعمل [[asyncpg.connect()]] جديد مع كل request (بطيء، وبيخلّص اتصالات Postgres). و [[except Exception: pass]] حوالين الـ yield. وتستخدم الاتصال في BackgroundTask (بعد الرد، الاتصال ممكن يكون رجع للـ pool). و pool على مستوى الـ module بيتعمل وقت الـ import قبل ما يبقى فيه event loop.`
          },
          lines: [
            "نوع الرجوع للـ generators الـ async.",
            "decorator الـ lifespan.",
            "Annotated.",
            "درايفر Postgres async (المستوى ٣).",
            "Request عشان نوصل لـ app.state.",
            "بيحوّل الـ generator لـ context manager.",
            "بيتنادى مرة واحدة مع التطبيق.",
            "الـ pool بيتعمل وقت ما التطبيق يقوم (والـ URL من الإعدادات في الحقيقة).",
            "هنا التطبيق بيستقبل requests.",
            "وقت القفل: اقفل كل الاتصالات.",
            "اربط الـ lifespan بالتطبيق.",
            "dependency لكل request.",
            "خد اتصال من الـ pool، وهيرجع لوحده.",
            "transaction: commit لو الـ route نجح، و rollback لو رمى.",
            "الـ route بيشتغل هنا.",
            R`[[scope="function"]]: التنضيف (والـ commit) يحصل قبل ما الرد يتبعت.`,
            "route.",
            "بياخد الاتصال جاهز.",
            "INSERT ويرجّع الـ id.",
            "INSERT تاني في نفس الـ transaction: الاتنين يا يتنفذوا يا لأ.",
            "رجّع."
          ]
        },
        {
          cmd: "auth dependency",
          title: "تجيب المستخدم من التوكن وتحمي الـ routes",
          desc: R`[[OAuth2PasswordBearer]] (أو [[HTTPBearer]]) بيقرا [[Authorization: Bearer <token>]] من الـ header ويرجّع 401 لو مش موجود. وفوقه dependency بتاعتك بتفك التوكن وتجيب المستخدم: [[CurrentUser]]. وفوقها dependency للصلاحيات: [[require_role("admin")]].

أي route محتاج مستخدم يكتب [[user: CurrentUser]]، وأي router محمي كله بـ [[dependencies=[Depends(...)]]].`,
          example: R`from typing import Annotated
import jwt
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
SECRET = "change-me"
oauth2 = OAuth2PasswordBearer(tokenUrl="/auth/token")
app = FastAPI()
class User(BaseModel):
    id: int
    role: str
async def current_user(token: Annotated[str, Depends(oauth2)]) -> User:
    try:
        payload = jwt.decode(token, SECRET, algorithms=["HS256"])
    except jwt.InvalidTokenError:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED, "invalid token", headers={"WWW-Authenticate": "Bearer"})
    return User(id=int(payload["sub"]), role=payload.get("role", "user"))
CurrentUser = Annotated[User, Depends(current_user)]
def require_role(role: str):
    async def checker(user: CurrentUser) -> User:
        if user.role != role:
            raise HTTPException(status.HTTP_403_FORBIDDEN, "forbidden")
        return user
    return checker
@app.get("/me")
async def me(user: CurrentUser):
    return user
@app.delete("/users/{user_id}", dependencies=[Depends(require_role("admin"))])
async def delete_user(user_id: int):
    return {"deleted": user_id}`,
          try: R`اعمل توكن للتجربة: [[python -c "import jwt; print(jwt.encode({'sub': '1', 'role': 'admin'}, 'change-me', algorithm='HS256'))"]]، وجرّبه بـ [[curl -H "Authorization: Bearer <التوكن>" localhost:8000/me]] (زرار Authorize في [[/docs]] مع OAuth2PasswordBearer بيطلب username و password ويبعتهم لـ [[tokenUrl]]، فمينفعش تلزق فيه توكن؛ لو عايز تلزقه من /docs استخدم [[HTTPBearer]]). وبعدين غيّر حرف في التوكن، واعمل واحد بـ role عادي وجرّب الـ DELETE.`,
          flag: "script",
          deep: {
            why: "الـ auth أكتر كود بيتكرر، وأخطر كود لو اتنسى في route. لما يبقى نوع في الـ signature، نسيانه بيبان بالعين في الـ code review، والـ router كله يتقفل بسطر.",
            how: R`[[OAuth2PasswordBearer(tokenUrl=...)]] بيعمل حاجتين: dependency بتقرا الـ header وترجّع التوكن (أو 401)، وبيعرّف الـ security scheme في OpenAPI فيظهر زرار Authorize في [[/docs]]. و [[tokenUrl]] مسار الـ login بتاعك اللي بيدّي توكن (بياخد [[OAuth2PasswordRequestForm]]).

[[jwt.decode]] (مكتبة PyJWT) بيتأكد من التوقيع، ومن [[exp]] لو موجود. ولازم تحدد [[algorithms]] صريح. والـ 401 معناها «مش عارف انت مين»، و 403 «عارف، بس مش مسموحلك».

[[require_role("admin")]] factory: دالة بترجع dependency، فتقدر تعمل [[require_role("editor")]] كمان. ولأنها معتمدة على [[CurrentUser]]، والـ dependencies بتتعمل cache في نفس الـ request، التوكن بيتفك مرة واحدة حتى لو الـ route طالب الاتنين.

والباسوردات: خزّن hash بس، بـ Argon2 (مكتبة [[pwdlib]] اللي توثيق FastAPI بيستخدمها) أو bcrypt، والتحقق تقيل فخليه في [[def]] أو [[to_thread]]. وتفاصيل access و refresh tokens في تاب «بناء مشروع كامل»، والمصادقة السليمة في تاب «الأمان».`,
            when: R`أي API فيه مستخدمين. التوكن لـ APIs و mobile؛ ولو الـ frontend على نفس الدومين، cookie بـ [[HttpOnly]] غالبًا أأمن (FastAPI بيقراها بـ [[Cookie()]] أو [[APIKeyCookie]]).`,
            mistakes: R`السر مكتوب في الكود ([[SECRET = "..."]]): مكانه الإعدادات بـ [[SecretStr]]. و [[jwt.decode(..., options={"verify_signature": False})]]. وتوكن من غير [[exp]]. و [[if user.role != "admin"]] جوه كل route بدل dependency. و 401 من غير header الـ [[WWW-Authenticate]].`
          },
          lines: [
            "Annotated.",
            "PyJWT.",
            R`الأدوات، و [[status]] لأسماء الأكواد.`,
            "بيقرا Bearer token من الـ header.",
            "الموديل.",
            "للتجربة بس: السر مكانه الإعدادات.",
            "مسار الـ login اللي بيدّي التوكن، وبيظهر زرار Authorize في /docs.",
            "التطبيق.",
            "المستخدم.",
            "حقل.",
            "حقل.",
            "dependency فوق dependency: بتاخد التوكن من oauth2.",
            "نحاول نفكه.",
            "بيتأكد من التوقيع والانتهاء، والخوارزمية محددة.",
            "توكن بايظ أو منتهي.",
            "401 مع الـ header اللي المعيار طالبه.",
            "المستخدم من الـ payload (في مشروع حقيقي: من القاعدة أو الـ cache).",
            "النوع اللي كل الـ routes هتستخدمه.",
            "factory: بترجع dependency حسب الدور.",
            "الـ dependency الحقيقية، ومعتمدة على CurrentUser.",
            "الدور غلط؟",
            "403: عارفينك بس مش مسموحلك.",
            "رجّع المستخدم لو حد محتاجه.",
            "رجّع الدالة.",
            "route لأي مستخدم مسجّل.",
            "من غير توكن: 401 قبل ما الدالة تشتغل.",
            "رجّع.",
            "للأدمن بس، والـ route مش محتاج قيمة الـ dependency.",
            "الدالة.",
            "رجّع."
          ]
        },
        {
          cmd: "dependency_overrides",
          title: "تختبر الـ API وتبدّل القاعدة والمستخدم بنسخ وهمية",
          desc: R`[[TestClient]] بيبعت requests لتطبيقك من غير سيرفر: [[client.get("/me")]] ويرجّع response تفحصه. و [[app.dependency_overrides[real] = fake]] بيبدّل أي dependency بواحدة تانية في الاختبارات: مستخدم وهمي بدل التوكن، وقاعدة اختبار، وإعدادات test.

pytest نفسه والـ fixtures و pytest.ini في تاب Python. هنا الحتة الخاصة بـ FastAPI.`,
          example: R`import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.deps import User, current_user
@pytest.fixture
def client():
    app.dependency_overrides[current_user] = lambda: User(id=1, role="admin")
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()
def test_me(client: TestClient):
    r = client.get("/me")
    assert r.status_code == 200
    assert r.json() == {"id": 1, "role": "admin"}
def test_validation(client: TestClient):
    r = client.get("/items/abc")
    assert r.status_code == 422
    assert r.json()["detail"][0]["loc"] == ["path", "item_id"]`,
          try: R`اكتب اختبار لـ DELETE بمستخدم role عادي ([[User(id=2, role="user")]]) وتأكد إنه 403. وبعدين شيل الـ [[with]] واستخدم [[TestClient(app)]] بس، وشوف الـ lifespan اشتغل ولا لأ (اطبع حاجة فيه).`,
          flag: "script",
          deep: {
            why: "من غير overrides، كل اختبار محتاج توكن حقيقي، وقاعدة شغالة، و Redis، و API خارجي. الاختبارات بتبقى بطيئة وهشة، فمحدش بيكتبها. والـ DI بتاع FastAPI معمول عشان تبدّل أي حاجة من برّه من غير ما تلمس كود الـ routes.",
            how: R`[[dependency_overrides]] dict على التطبيق: المفتاح الدالة الأصلية (نفس الـ object، مش اسمها)، والقيمة البديلة. FastAPI بيبص فيه قبل ما يحل أي dependency. والبديلة ممكن تاخد باراميترات أو dependencies هي كمان، أو تبقى generator بـ yield (اتصال بقاعدة اختبار جوه transaction تعمله rollback في الآخر، فكل اختبار يبدأ نضيف).

[[TestClient]] مبني على httpx (أو httpx2 لو متسطّب، ودي النسخة اللي Starlette الحديث بيفضّلها): نفس الـ API ([[get]] و [[post(json=...)]] و [[headers]]). ولما تستخدمه بـ [[with]]، الـ lifespan بيشتغل (الـ pool بيتعمل ويتقفل)، ومن غير with لأ.

ولو الاختبارات نفسها async (عايز تعمل await على حاجة تانية جوه الاختبار)، استخدم [[httpx.AsyncClient(transport=httpx.ASGITransport(app=app), base_url="http://test")]] مع pytest-asyncio أو anyio. والـ ASGITransport مبيشغّلش الـ lifespan، فلو محتاجه شغّله بنفسك.

و [[.clear()]] في آخر الـ fixture مهم، وإلا الـ override يفضل لباقي الاختبارات.`,
            when: "كل تطبيق FastAPI. override للـ auth في أغلب الاختبارات، وقاعدة اختبار حقيقية (Postgres في Docker) لاختبارات الـ integration بدل mocks للـ SQL.",
            mistakes: R`override بمفتاح غلط (دالة تانية بنفس الاسم من module تاني، أو [[Depends(...)]] بدل الدالة). ونسيان [[clear()]]. و [[TestClient(app)]] من غير with وتستغرب إن [[app.state.pool]] مش موجود. واختبارات بتكلّم API خارجي حقيقي.`
          },
          lines: [
            "pytest (تفاصيله في تاب Python).",
            "client بيكلّم التطبيق من غير سيرفر.",
            "التطبيق.",
            "الـ dependency اللي هنبدّلها، ونفس الـ object بالظبط.",
            "fixture بيتشارك بين الاختبارات.",
            "الـ fixture.",
            "أي route محتاج current_user هياخد المستخدم ده من غير توكن.",
            R`[[with]] بتشغّل الـ lifespan.`,
            "ادّي الـ client للاختبار.",
            "بعد الاختبار: شيل الـ overrides.",
            "اختبار.",
            "request.",
            "الكود.",
            "الـ JSON.",
            "اختبار الفحص.",
            "id مش رقم.",
            "422.",
            "مكان الخطأ بالظبط."
          ]
        }
      ]
    },
    {
      t: "الأخطاء والـ middleware",
      l: 2,
      n: "HTTPException، و exceptions بتاعتك تتحوّل لردود، وشكل واحد لكل الأخطاء، و CORS و middleware",
      items: [
        {
          cmd: "HTTPException",
          title: "ترجّع 404 أو 409 برسالة",
          desc: R`[[raise HTTPException(status_code=404, detail="...")]] بيوقف الـ route ويرجّع الرد ده. والـ detail ممكن يبقى string أو dict أو list. ولأنها raise مش return، تقدر ترميها من أي حتة: من الـ route، أو dependency، أو دالة بتتنادى جوه.

والأكواد اللي هتستخدمها: 400 طلب غلط، و 401 مش مسجّل، و 403 مش مسموح، و 404 مش موجود، و 409 تعارض (إيميل مستخدم)، و 422 الداتا مش صح (FastAPI بيرجّعها لوحده)، و 429 طلبات كتير، و 500 bug عندك.`,
          example: R`from fastapi import FastAPI, HTTPException, status
app = FastAPI()
USERS = {1: {"id": 1, "email": "sara@example.com"}}
@app.get("/users/{user_id}")
async def get_user(user_id: int):
    user = USERS.get(user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    return user
@app.post("/users", status_code=201)
async def create_user(email: str):
    if any(u["email"] == email for u in USERS.values()):
        raise HTTPException(409, detail={"code": "EMAIL_TAKEN", "message": "الإيميل ده مستخدم"})
    new_id = max(USERS) + 1
    USERS[new_id] = {"id": new_id, "email": email}
    return USERS[new_id]
@app.delete("/users/{user_id}", status_code=204)
async def delete_user(user_id: int) -> None:
    USERS.pop(user_id, None)`,
          try: R`اطلب [[/users/99]] واقرا شكل الرد ([[{"detail": "User not found"}]]). وبعدين [[curl -i -X POST "localhost:8000/users?email=sara@example.com"]] وشوف الـ 409 والـ detail اللي هو dict.`,
          flag: "script",
          deep: {
            why: "العميل (موبايل أو frontend) بيقرر يعمل إيه من الكود: 401 يروح للـ login، و 404 صفحة «مش موجود»، و 409 رسالة تحت حقل الإيميل. لو كل حاجة 200 أو 500، الـ frontend مش هيعرف يتصرف.",
            how: R`[[HTTPException]] exception عادي بيحمل status و detail و headers. و FastAPI عنده handler جاهز ليه بيرجّع [[{"detail": ...}]] بالكود ده. ولأنه exception، بيعدّي على الـ dependencies اللي فيها yield (فالـ transaction بيعمل rollback).

الـ detail بيظهر للعميل زي ما هو: متحطش فيه stack trace أو SQL أو بيانات داخلية. و detail كـ dict فيه [[code]] ثابت (زي [["EMAIL_TAKEN"]]) أحسن من رسالة بس: الـ frontend يعتمد على الكود، والرسالة تتغير براحتك.

والـ 404 مقابل 403: لو المستخدم بيطلب order مش بتاعه، ناس كتير بترجّع 404 مش 403، عشان متأكدش إن الـ order ده موجود أصلًا.

و [[status_code=204]] (No Content) للـ DELETE: FastAPI مبيبعتش body. وتفاصيل اختيار الأكواد في تاب «APIs متقدمة».`,
            when: "في الـ routes والـ dependencies. أما في طبقة الـ services فالأحسن exceptions بتاعتك (الدرس الجاي)، عشان المنطق ميعرفش حاجة عن HTTP.",
            mistakes: R`[[return {"error": "not found"}]] بكود 200. و [[raise HTTPException(500, str(e))]] فتسرّب رسالة القاعدة للعميل. و [[except Exception]] حوالين الـ route كله بيبلع الـ HTTPException نفسها ويحوّلها 500.`
          },
          lines: [
            "HTTPException، و status لأسماء الأكواد.",
            "التطبيق.",
            "داتا وهمية.",
            "route.",
            "الدالة.",
            R`[[get]] بترجع None لو مش موجود.`,
            "مش موجود؟",
            "وقّف الـ route وارجع 404.",
            "موجود.",
            "إنشاء، والنجاح 201.",
            "email هنا query للتبسيط؛ في الحقيقة body model.",
            "الإيميل مستخدم؟",
            "409 بـ detail فيه code ثابت يعتمد عليه الـ frontend.",
            "id جديد.",
            "احفظ.",
            "رجّع.",
            "حذف، والنجاح 204 من غير body.",
            "مبترجعش حاجة.",
            "احذف لو موجود، ومتعترضش لو مش موجود (DELETE متكرر بيدّي نفس النتيجة)."
          ]
        },
        {
          cmd: "exception handlers",
          title: "exceptions بتاعتك تتحوّل لردود، وشكل واحد لكل الأخطاء",
          desc: R`[[@app.exception_handler(MyError)]] بيحوّل أي exception من نوعك لـ response، فالـ service يرمي [[NotFoundError]] من غير ما يعرف حاجة عن HTTP، والـ handler يحوّله 404. وتقدر تعيد تعريف handler الـ 422 ([[RequestValidationError]]) عشان كل الأخطاء تطلع بنفس الشكل.

و handler لـ [[Exception]] نفسها آخر خط: يسجّل الخطأ كامل في اللوج، ويرجّع 500 برسالة عامة ورقم للتتبع.`,
          example: R`import logging
import uuid
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
log = logging.getLogger("app")
app = FastAPI()
class AppError(Exception):
    status = 400
    code = "APP_ERROR"
    def __init__(self, message: str):
        self.message = message
class NotFoundError(AppError):
    status, code = 404, "NOT_FOUND"
@app.exception_handler(AppError)
async def app_error(request: Request, exc: AppError):
    return JSONResponse({"error": {"code": exc.code, "message": exc.message}}, status_code=exc.status)
@app.exception_handler(RequestValidationError)
async def validation_error(request: Request, exc: RequestValidationError):
    fields = [{"field": ".".join(map(str, e["loc"][1:])), "message": e["msg"]} for e in exc.errors()]
    return JSONResponse({"error": {"code": "VALIDATION", "fields": fields}}, status_code=422)
@app.exception_handler(Exception)
async def unhandled(request: Request, exc: Exception):
    ref = uuid.uuid4().hex[:8]
    log.exception("unhandled error ref=%s path=%s", ref, request.url.path)
    return JSONResponse({"error": {"code": "INTERNAL", "ref": ref}}, status_code=500)
@app.get("/orders/{order_id}")
async def get_order(order_id: int):
    raise NotFoundError(f"order {order_id} not found")`,
          try: R`اطلب [[/orders/5]] و [[/orders/abc]] وقارن الشكلين: نفس الـ [[error.code]] كمفتاح. وبعدين ضيف route بيعمل [[1 / 0]] وشوف الـ ref في الرد وفي اللوج.`,
          flag: "script",
          deep: {
            why: "الـ frontend محتاج يتعامل مع الأخطاء بطريقة واحدة. لو الـ 422 ليه شكل، و HTTPException شكل، والـ 500 نص، كل شاشة هتكتب parsing مختلف. والـ services اللي بترمي HTTPException مربوطة بـ HTTP ومينفعش تستخدمها من CLI أو worker.",
            how: R`لما exception يطلع من الـ route ومحدش مسكه، Starlette بيدوّر على handler لنوعه أو لأقرب parent في الوراثة. عشان كده handler واحد لـ [[AppError]] بيغطي [[NotFoundError]] و [[ConflictError]] وأي حاجة بتورث منه.

[[RequestValidationError]] هو اللي FastAPI بيرميه لما الـ request مش مطابق. و [[exc.errors()]] نفس ليستة Pydantic ([[loc]] و [[msg]] و [[type]])، و [[loc[0]]] بيبقى [[body]] أو [[query]] أو [[path]]، عشان كده شلناه بـ [[[1:]]].

handler الـ [[Exception]] بيشتغل في ServerErrorMiddleware (آخر طبقة)، ورده بيتبعت، وبعدين الـ exception بيتسجّل من السيرفر كمان. و [[log.exception]] بيكتب الـ traceback كامل. والـ ref بيربط الرد اللي المستخدم شافه بالسطر في اللوج؛ وفي مشروع أكبر خليه نفس الـ request id اللي في الـ middleware (الدرس الجاي). وشكل الأخطاء الموحّد القياسي (problem+json) في تاب «APIs متقدمة».

ولو عايز تكمّل على السلوك الافتراضي: [[from fastapi.exception_handlers import http_exception_handler]] وناديه من الـ handler بتاعك.`,
            when: "أي مشروع فيه frontend أو عملاء خارجيين: شكل واحد للأخطاء من أول يوم، و exceptions بتاعتك في الـ services.",
            mistakes: R`handler لـ [[Exception]] بيرجّع [[str(exc)]] للعميل. وتنسى تسجّل الخطأ في handler الـ 500 فيضيع. و handler على HTTPException بتاعة FastAPI بس: سجّله على [[starlette.exceptions.HTTPException]] عشان يمسك الاتنين (الـ 404 بتاعة route مش موجود جاية من Starlette).`
          },
          lines: [
            "logging.",
            "لرقم التتبع.",
            "FastAPI و Request.",
            "exception الـ 422.",
            "رد JSON بكود.",
            "logger باسم.",
            "التطبيق.",
            "الأب لكل أخطاء التطبيق.",
            "الكود الافتراضي.",
            "code ثابت للـ frontend.",
            "constructor.",
            "الرسالة.",
            "نوع مخصوص.",
            "بيغيّر الكود والـ code بس.",
            "أي AppError أو ابن ليه يوصل هنا.",
            "الـ handler بياخد الـ request والـ exception.",
            "شكل موحّد.",
            "بدّل شكل الـ 422 الافتراضي.",
            "الـ handler.",
            "حوّل الأخطاء لـ field و message، من غير body أو query في أول الـ loc.",
            "نفس الشكل.",
            "آخر خط: أي حاجة محدش مسكها.",
            "الـ handler.",
            "رقم قصير للتتبع.",
            "سجّل الـ traceback كامل في اللوج، مش في الرد.",
            "رسالة عامة ورقم.",
            "route.",
            "الدالة.",
            "بترمي خطأ business، والـ handler بيحوّله 404."
          ]
        },
        {
          cmd: "CORS و middleware",
          title: "تسمح لـ frontend على دومين تاني، وتعمل كود يلف كل request",
          desc: R`المتصفح بيمنع الـ JavaScript إنه يقرا رد API على origin تاني، إلا لو الـ API قال إنه موافق. و [[CORSMiddleware]] بيقول ده: [[allow_origins]] بالدومينات المسموحة بالظبط.

والـ middleware عمومًا كود بيلف كل request: قبل ما يوصل للـ route وبعد ما الرد يطلع. أمثلة: request id، وقياس الوقت، و headers أمان.`,
          example: R`import time
import uuid
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://shop.example.com", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE"],
    allow_headers=["Authorization", "Content-Type"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)
@app.middleware("http")
async def timing(request: Request, call_next):
    request_id = request.headers.get("x-request-id") or uuid.uuid4().hex
    start = time.perf_counter()
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    response.headers["Server-Timing"] = f"app;dur={(time.perf_counter() - start) * 1000:.1f}"
    return response`,
          try: R`من console صفحة على دومين تاني اعمل [[fetch("http://localhost:8000/health")]] قبل وبعد ما تضيف الدومين في [[allow_origins]]، واقرا رسالة CORS في الـ console. وشوف [[X-Request-ID]] في الرد بـ [[curl -i]].`,
          flag: "script",
          deep: {
            why: R`أول مرة تربط React بالـ API: كل حاجة شغالة في Postman، والمتصفح بيقول blocked by CORS policy. والحل مش [[allow_origins=["*"]]] وخلاص. والـ middleware بيحل الحاجات اللي لازم تحصل لكل request من غير ما تفتكرها في كل route.`,
            how: R`CORS قاعدة في المتصفح بس (curl و Postman مبيهتموش). ولما الطلب «مش بسيط» (فيه [[Authorization]] أو JSON أو PATCH)، المتصفح بيبعت الأول [[OPTIONS]] (preflight) يسأل، والـ middleware بيرد بالمسموح، وبعدين المتصفح يبعت الطلب الحقيقي. و [[allow_credentials=True]] (للـ cookies) لازم معاها الدومينات بالاسم. وخلي الدومينات جاية من الإعدادات، مش مكتوبة في الكود.

الـ middleware بيتنفذ على شكل بصلة: آخر واحد اتضاف هو أول واحد بيشوف الـ request، وآخر واحد بيشوف الـ response. و [[call_next(request)]] بيعدّي الطلب للي جوه ويستنى الرد.

[[@app.middleware("http")]] سهل، بس مبني على BaseHTTPMiddleware اللي فيه مشاكل مع الـ streaming و contextvars. فللحاجات الحساسة للأداء اكتب pure ASGI middleware. و [[GZipMiddleware]] بيضغط الردود الكبيرة (لو nginx مش عامل ده).

والـ middleware بيلف كل الطلبات (حتى الـ 404)، أما الـ dependency فعلى routes معينة وليها وصول للـ DI. فالـ auth مكانها dependency غالبًا، والـ request id والتوقيت و CORS مكانهم middleware.`,
            when: R`CORS لما الـ frontend على origin تاني (حتى [[localhost:5173]] و [[localhost:8000]] origins مختلفة). و middleware للحاجات اللي بتخص كل request: ids ولوج وتوقيت و headers.`,
            mistakes: R`[[allow_origins=["*"]]] مع [[allow_credentials=True]]: Starlette بيرجّع origin الطالب نفسه لما فيه cookies، فعمليًا أي موقع يقدر يكلّم الـ API بـ cookies المستخدم. ونسيان [[http://localhost:5173]] في التطوير. و CORS مضاف في nginx وفي FastAPI الاتنين فالـ header يتكرر والمتصفح يرفض. وتقرا [[await request.body()]] في middleware على كل request: بيحمّل الـ body كله في الذاكرة (حتى الـ uploads الكبيرة)، ولو في pure ASGI middleware استهلكت الـ receive بنفسك، الـ route مش هيلاقي body.`
          },
          lines: [
            "للتوقيت.",
            "للـ request id.",
            "FastAPI و Request.",
            "CORS جاهز.",
            "ضغط gzip جاهز.",
            "التطبيق.",
            "ضيف middleware بإعداداته.",
            "CORS.",
            "الـ origins المسموحة بالظبط (من الإعدادات في الحقيقة).",
            R`اسمح بالـ cookies (fetch بـ [[credentials: "include"]])؛ أما header الـ Authorization فبيتسمح بيه من allow_headers.`,
            "الـ methods المسموحة.",
            "الـ headers المسموحة.",
            "قفلة.",
            "اضغط الردود اللي أكبر من 1000 byte.",
            "middleware بدالة.",
            "بياخد الـ request ودالة بتعدّيه للي جوه.",
            "خد الـ id من اللي قبلك (nginx) أو اعمل واحد.",
            "ابدأ العداد.",
            "عدّي الطلب واستنى الرد.",
            "رجّع الـ id في الرد، عشان العميل يقولهولك لما يشتكي.",
            "الوقت، وبيظهر في DevTools في تاب Timing.",
            "رجّع الرد."
          ]
        }
      ]
    },
    {
      t: "قاعدة البيانات",
      l: 3,
      n: "asyncpg بـ pool و SQL صريح، و transactions، و SQLAlchemy async لو عايز ORM، و Alembic للـ migrations",
      items: [
        {
          cmd: "asyncpg",
          title: "تكلّم Postgres بـ asyncpg: pool و $1 و fetch",
          desc: R`asyncpg أسرع درايفر Postgres لـ Python async، وبتكتب بيه SQL عادي. الباراميترات بـ [[$1]] و [[$2]] مش f-string، والدوال: [[fetch]] (صفوف)، و [[fetchrow]] (صف أو None)، و [[fetchval]] (قيمة واحدة)، و [[execute]] (من غير نتيجة)، و [[executemany]] (نفس الأمر لكذا صف).

والـ pool بيتعمل مرة في الـ lifespan، وكل request بياخد اتصال ويرجّعه (درس dependency بـ yield). والـ SQL نفسه والـ indexes في تاب PostgreSQL وتاب «SQL و Prisma».`,
          example: R`import asyncpg
from pydantic import BaseModel
class Product(BaseModel):
    id: int
    name: str
    price_cents: int
async def demo(dsn: str) -> None:
    pool = await asyncpg.create_pool(dsn, min_size=2, max_size=10, command_timeout=10)
    async with pool.acquire() as conn:
        rows = await conn.fetch("SELECT id, name, price_cents FROM products WHERE price_cents < $1 ORDER BY id LIMIT $2", 5000, 20)
        products = [Product(**dict(r)) for r in rows]
        row = await conn.fetchrow("SELECT id, name, price_cents FROM products WHERE id = $1", 7)
        count = await conn.fetchval("SELECT count(*) FROM products")
        await conn.execute("UPDATE products SET price_cents = $1 WHERE id = $2", 4500, 7)
        await conn.executemany("INSERT INTO tags (product_id, tag) VALUES ($1, $2)", [(7, "hot"), (7, "new")])
        ids = await conn.fetch("SELECT id FROM products WHERE id = ANY($1::int[])", [1, 2, 3])
    await pool.close()`,
          try: R`شغّل Postgres في Docker (تاب Docker)، واعمل جدول products فيه كام صف، وجرّب كل دالة في المثال. وبعدين اكتب query بـ f-string زي [[f"... WHERE name = '{name}'"]] وجرّب [[name = "x' OR '1'='1"]]، وشوف ليه الـ [[$1]] مش اختيارية.`,
          flag: "script",
          deep: {
            why: R`الـ ORM مش إجباري. asyncpg بيديك SQL كامل (CTEs و window functions و [[ON CONFLICT]] و [[RETURNING]]) وأداء أعلى من أي حاجة تانية في Python، ومفيش طبقة سحرية بتولّد queries مش شايفها. ومشاريع حقيقية كتير ماشية بـ asyncpg و SQL في ملفات repository.`,
            how: R`[[create_pool]] بيفتح [[min_size]] اتصالات ويكبر لحد [[max_size]]، و [[pool.acquire()]] بيستنى لو كل الاتصالات مشغولة. وخلي [[max_size]] × عدد الـ workers × عدد الـ containers أقل من [[max_connections]] بتاع Postgres (الافتراضي 100).

asyncpg بيستخدم البروتوكول الثنائي و prepared statements: الـ query والقيم بيتبعتوا منفصلين، فمفيش SQL injection أصلًا، والـ statements المتكررة بتتعمل cache. عشان كده مع PgBouncer في وضع transaction لازم [[statement_cache_size=0]].

الـ [[Record]] اللي بيرجع بيتقري بالاسم [[r["name"]]] أو بالـ index، و [[dict(r)]] بيحوّله dict تبعته لـ Pydantic. والأنواع بتتحوّل لوحدها: [[timestamptz]] لـ datetime، و [[numeric]] لـ Decimal، و [[uuid]] لـ UUID، و [[jsonb]] لـ string (إلا لو عملت codec بـ [[set_type_codec]]).

وأي list بتتبعت كـ Postgres array: [[= ANY($1::int[])]] بدل ما تبني [[IN (1, 2, 3)]] بإيدك.`,
            when: "لما عايز SQL صريح وأداء عالي، أو الـ queries معقدة. ولو الفريق متعود على ORM والـ CRUD كتير: SQLAlchemy (بعد درسين).",
            mistakes: R`f-string في SQL (injection). و [[asyncpg.connect()]] مع كل request بدل pool. و [[%s]] أو [[?]] (دي بتاعة psycopg و sqlite)؛ asyncpg بيقبل [[$1]] بس. ونسيان [[command_timeout]] فـ query معلّقة تمسك اتصال للأبد. و [[fetch]] من غير LIMIT على جدول فيه مليون صف.`
          },
          lines: [
            "الدرايفر.",
            "موديل للنتيجة.",
            "شكل المنتج.",
            "حقل.",
            "حقل.",
            "السعر بالقروش int.",
            "دالة للتجربة (في التطبيق: الـ pool في الـ lifespan).",
            "pool: من ٢ لـ ١٠ اتصالات، وأي query أكتر من ١٠ ثواني تتلغي.",
            "خد اتصال، ويرجع للـ pool لوحده.",
            R`صفوف: الباراميترات [[$1]] و [[$2]] بتتبعت منفصلة عن الـ SQL.`,
            "كل Record لـ dict وبعدين لـ Pydantic.",
            "صف واحد أو None.",
            "قيمة واحدة.",
            R`أمر من غير نتيجة، وبيرجع string زي [[UPDATE 1]].`,
            "نفس الأمر لكذا صف.",
            "list بتتبعت كـ Postgres array.",
            "اقفل الـ pool (في التطبيق: بعد الـ yield في الـ lifespan)."
          ]
        },
        {
          cmd: "transactions",
          title: "كذا عملية يا تتنفذ كلها يا ولا واحدة",
          desc: R`[[async with conn.transaction():]] بيبدأ transaction: لو البلوك خلص عادي بيعمل commit، ولو حصل exception بيعمل rollback. وأي خطوتين مرتبطين (خصم من المخزون وإنشاء طلب) لازم يبقوا في transaction واحدة.

وللحاجات اللي ممكن تحصل من طلبين في نفس اللحظة (آخر قطعة في المخزون): UPDATE بشرط، أو [[SELECT ... FOR UPDATE]]، عشان متبيعش نفس القطعة مرتين.`,
          example: R`import json
import asyncpg
class OutOfStock(Exception):
    pass
async def place_order(conn: asyncpg.Connection, user_id: int, product_id: int, qty: int) -> int:
    async with conn.transaction():
        left = await conn.fetchval(
            "UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1 RETURNING stock",
            qty, product_id,
        )
        if left is None:
            raise OutOfStock(product_id)
        order_id = await conn.fetchval(
            "INSERT INTO orders (user_id, product_id, qty) VALUES ($1, $2, $3) RETURNING id",
            user_id, product_id, qty,
        )
        await conn.execute(
            "INSERT INTO outbox (topic, payload) VALUES ('order.created', $1::jsonb)",
            json.dumps({"order_id": order_id}),
        )
    return order_id`,
          try: R`افتح اتنين [[psql]] وجرّب نفس الـ UPDATE على نفس المنتج من الاتنين جوه [[BEGIN]] من غير COMMIT: التاني هيستنى الأول. وبعدين في Python ارمي exception بعد أول INSERT، واتأكد إن المخزون منقصش.`,
          flag: "script",
          deep: {
            why: "من غير transaction: المخزون نقص والطلب متعملش لأن الـ INSERT فشل، أو طلبين في نفس اللحظة شافوا «فاضل قطعة» والاتنين اشتروا. دي bugs بتظهر تحت الضغط بس، وبتكلّف فلوس حقيقية.",
            how: R`[[conn.transaction()]] بيبعت [[BEGIN]]، والخروج من البلوك [[COMMIT]] أو [[ROLLBACK]]. ولو اتنادت جوه transaction تانية، بتعمل [[SAVEPOINT]] (nested).

الـ UPDATE بالشرط ([[WHERE stock >= $1]]) atomic: Postgres بيقفل الصف، فمن طلبين مع بعض واحد بس هيلاقي المخزون كفاية، والتاني [[RETURNING]] مش هيرجّع حاجة (None). وده أبسط وأسرع من [[SELECT ... FOR UPDATE]] وبعدين UPDATE.

الـ outbox: بدل ما تبعت إيميل أو event جوه الـ transaction (لو الإرسال نجح والـ commit فشل، تبقى بعت عن حاجة محصلتش)، بتكتب الـ event في جدول [[outbox]] في نفس الـ transaction، و worker منفصل يقرا ويبعت. كده الـ event موجود لو وبس لو الطلب اتعمل.

والـ isolation الافتراضي [[READ COMMITTED]]. وممكن [[conn.transaction(isolation="serializable")]] بس ساعتها لازم تعيد المحاولة لو Postgres رمى serialization error. وتفاصيل الـ isolation والـ locks في تاب «SQL و Prisma» وتاب PostgreSQL.`,
            when: "أي عملية كتابة فيها أكتر من statement، أو قراية بعدها كتابة على نفس الداتا. وخلي الـ transaction قصيرة: متعملش HTTP call جواها.",
            mistakes: R`transaction بتستنى API خارجي (الـ locks والاتصال محجوزين ثواني). و SELECT المخزون، تحسب في Python، وبعدين UPDATE بالرقم ([[SET stock = 4]]): race condition. وتمسك الـ exception جوه البلوك وتبلعه، فالـ commit يحصل على نص شغل.`
          },
          lines: [
            "لـ JSON الـ event.",
            "الدرايفر.",
            "exception بتاعك.",
            "فاضي.",
            "دالة بتاخد اتصال (من الـ dependency).",
            "BEGIN، و COMMIT أو ROLLBACK حسب البلوك.",
            "UPDATE بشرط...",
            "...ينقص بس لو المخزون كفاية، ويرجّع الباقي.",
            R`الباراميترات، و [[$1]] اتستخدمت مرتين.`,
            "قفلة.",
            "مفيش صف اتعدّل = المخزون مش كفاية.",
            "exception = rollback لكل حاجة.",
            "اعمل الطلب...",
            "...ورجّع الـ id.",
            "القيم.",
            "قفلة.",
            "event في نفس الـ transaction (outbox)...",
            "...worker هيقراه ويبعته بعدين.",
            "الـ payload كـ JSON.",
            "قفلة.",
            "هنا الـ commit حصل."
          ]
        },
        {
          cmd: "SQLAlchemy async",
          title: "ORM بـ SQLAlchemy 2 وهو async",
          desc: R`SQLAlchemy 2 بيدّيك models بـ type hints ([[Mapped[int]]] و [[mapped_column]])، و queries بـ [[select()]]، ويشتغل async فوق asyncpg: [[create_async_engine("postgresql+asyncpg://...")]] و [[AsyncSession]].

الـ session بتتعمل لكل request في dependency بـ yield، والـ engine مرة واحدة. و [[expire_on_commit=False]] مهمة في async.`,
          example: R`from datetime import datetime
from typing import Annotated
from fastapi import Depends
from sqlalchemy import ForeignKey, func, select
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship, selectinload
class Base(DeclarativeBase):
    pass
class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(unique=True)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())
class Order(Base):
    __tablename__ = "orders"
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id"))
    total_cents: Mapped[int]
    user: Mapped[User] = relationship()
engine = create_async_engine("postgresql+asyncpg://app:secret@localhost/shop", pool_size=10)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)
async def get_session():
    async with SessionLocal() as session:
        yield session
SessionDep = Annotated[AsyncSession, Depends(get_session)]
async def recent_orders(session: AsyncSession, user_id: int) -> list[Order]:
    stmt = select(Order).where(Order.user_id == user_id).options(selectinload(Order.user)).order_by(Order.id.desc()).limit(20)
    return list(await session.scalars(stmt))
async def create_user(session: AsyncSession, email: str) -> User:
    user = User(email=email)
    session.add(user)
    await session.commit()
    return user`,
          try: R`شيل [[selectinload(Order.user)]] وجرّب تقرا [[order.user.email]] بعد الـ query: هيطلع [[MissingGreenlet]]. ده الـ lazy loading اللي async مبيسمحش بيه. وبعدين اعمل الـ engine بـ [[echo=True]] وشوف الـ SQL اللي اتولّد.`,
          flag: "script",
          deep: {
            why: "لما الـ CRUD كتير والعلاقات متشعبة، كتابة SQL لكل حاجة بتتقل. و SQLAlchemy أشهر ORM في Python، ونسخة 2 نضّفت الـ API وبقت typed وبتشتغل async. وهتقابلها في أغلب مشاريع FastAPI.",
            how: R`[[DeclarativeBase]] أساس الـ models، و [[Mapped[T]]] النوع (و [[Mapped[str | None]]] يبقى nullable)، و [[mapped_column]] للإعدادات.

الـ engine جواه pool الاتصالات، وإنشاؤه مبيفتحش اتصال فورًا، فعادي يبقى على مستوى الـ module، وفي آخر الـ lifespan [[await engine.dispose()]]. والـ session وحدة شغل لكل request: بتتابع الـ objects اللي اتضافت أو اتعدّلت، و [[commit]] بيكتبهم.

[[expire_on_commit=False]]: الافتراضي إن بعد commit كل الـ attributes بتتمسح وتتقري تاني من القاعدة أول ما تلمسها. وفي async ده محتاج await، والـ attribute access مينفعش يعمل await، فبيطلع [[MissingGreenlet]]. ونفس السبب بيخلي الـ lazy loading للعلاقات ممنوع: حمّلها مقدمًا بـ [[selectinload]] (query تانية بـ IN) أو [[joinedload]] (JOIN)، أو استخدم [[AsyncAttrs]] و [[await obj.awaitable_attrs.user]].

[[session.scalars(stmt)]] بيرجع الـ objects نفسها، و [[session.execute(stmt)]] بيرجع صفوف. و [[session.get(User, 5)]] بالـ primary key. وتقدر تحوّل الناتج لـ Pydantic بـ [[from_attributes]].

والـ migrations مش شغل SQLAlchemy نفسه: [[Base.metadata.create_all]] للتجربة بس، و Alembic للحقيقي (الدرس الجاي). وفيه كمان SQLModel (من صاحب FastAPI) مبني على SQLAlchemy و Pydantic مع بعض.`,
            when: R`CRUD كتير وعلاقات، وفريق متعود على ORM. وتقدر تخلط: ORM للعادي، و [[text()]] أو asyncpg مباشرة للـ queries التقيلة.`,
            mistakes: R`N+1: loop على طلبات وكل واحد يعمل query لمستخدمه (في async بيطلع error، وده أحسن من sync اللي بيبطّأ في صمت). و session واحدة مشتركة بين requests. و [[create_engine]] الـ sync جوه تطبيق async. ونسيان [[await session.commit()]] فمفيش حاجة اتحفظت.`
          },
          lines: [
            "datetime.",
            "Annotated.",
            "Depends.",
            "أدوات الـ SQL.",
            "الحتت الـ async.",
            "الـ models والعلاقات والتحميل المسبق.",
            "أساس كل الـ models.",
            "فاضي.",
            "model للمستخدمين.",
            "اسم الجدول.",
            "primary key.",
            "string ومفيش اتنين زي بعض.",
            "القاعدة بتحط الوقت لوحدها.",
            "model للطلبات.",
            "اسم الجدول.",
            "primary key.",
            "foreign key.",
            "annotation لوحدها كفاية: عمود int مش null.",
            "علاقة: الطلب بيشاور على صاحبه.",
            "engine بدرايفر asyncpg، وجواه pool.",
            "مصنع sessions، ومبيمسحش الـ attributes بعد commit.",
            "dependency: session لكل request.",
            "افتحها، وهتتقفل لوحدها.",
            "ادّيها للـ route.",
            "النوع للـ routes.",
            "دالة repository.",
            "select بشرط، وحمّل المستخدم مقدمًا (مفيش lazy loading في async)، ورتّب، و LIMIT.",
            "نفّذ ورجّع الـ objects.",
            "إنشاء.",
            "object جديد.",
            "ضيفه للـ session.",
            "INSERT و COMMIT، والـ id و created_at بيرجعوا بـ RETURNING.",
            "رجّع."
          ]
        },
        {
          cmd: "alembic",
          title: "تغيّر شكل الجداول بـ migrations بتتعمل commit",
          desc: R`Alembic أداة الـ migrations لـ SQLAlchemy: كل تغيير في الجداول ملف Python فيه [[upgrade()]] و [[downgrade()]]، بيتعمله commit مع الكود، ويتطبق على كل بيئة بنفس الترتيب. و [[--autogenerate]] بيقارن الـ models بالقاعدة ويكتب الـ migration، وانت تراجعه.

ولو مش بتستخدم SQLAlchemy (asyncpg و SQL بس)، نفس الفكرة بملفات SQL وسكربت (تاب PostgreSQL فيه «سكربت migrations»)، أو Alembic نفسه بـ [[op.execute("...")]].`,
          example: R`pip install alembic
alembic init -t async migrations
alembic revision --autogenerate -m "add orders.total_cents"
alembic upgrade head
alembic current
alembic history --verbose
alembic downgrade -1
alembic upgrade head --sql > upgrade.sql`,
          try: R`اعمل [[alembic init -t async migrations]]، وفي [[migrations/env.py]] خلّي [[target_metadata = Base.metadata]] والـ URL جاي من الإعدادات. ضيف عمود للـ model، واعمل autogenerate، وافتح الملف اللي اتعمل واقراه قبل [[upgrade]].`,
          deep: {
            why: R`[[create_all]] بيعمل الجداول لو مش موجودة بس، ومبيعدّلش جدول موجود. ومن غير migrations، كل تغيير بيتعمل بإيدك على السيرفر، ومحدش عارف القاعدة في الإنتاج شكلها إيه.`,
            how: R`[[alembic init -t async]] بيعمل [[alembic.ini]] وفولدر فيه [[env.py]] جاهز لـ engine async. في [[env.py]] بتربط [[target_metadata]] بـ [[Base.metadata]] عشان autogenerate يعرف الـ models، وتقرا الـ URL من الإعدادات بدل ما يتكتب في alembic.ini.

كل migration ليه [[revision]] و [[down_revision]]، فالملفات سلسلة. و Alembic بيسجّل آخر واحد اتطبق في جدول [[alembic_version]]، و [[upgrade head]] بيطبق كل اللي بعده بالترتيب.

autogenerate بيلقط الجداول والأعمدة والـ indexes والـ foreign keys، بس مش كل حاجة: تغيير اسم عمود بيطلع drop و add (والداتا تضيع!)، وبعض تغييرات الأنواع والـ constraints بتفوته. عشان كده الملف لازم يتقري ويتعدّل قبل ما يتعمله commit.

[[--sql]] (offline mode) بيطلّع الـ SQL من غير ما ينفّذه، تراجعه أو تديه للـ DBA.

وفي الديبلوي: [[alembic upgrade head]] خطوة قبل ما الـ containers الجديدة تقوم (job منفصل أو أمر في الـ entrypoint)، مش جوه التطبيق وكل worker بيحاول يعملها. والتغييرات الكاسرة (مسح عمود بيستخدمه الكود القديم) بتتعمل على مرحلتين: expand وبعدين contract. التفاصيل في «تغييرات آمنة في الإنتاج» في تاب PostgreSQL.`,
            when: "أي مشروع فيه قاعدة بيانات هتعيش أكتر من أسبوع.",
            mistakes: R`تعدّل migration اتطبق خلاص على الإنتاج بدل ما تعمل واحد جديد. وتعمل commit لـ autogenerate من غير ما تقراه (الـ rename بقى drop). واتنين في الفريق عملوا migration من نفس النقطة فبقى فيه اتنين head ([[alembic heads]]، والحل [[alembic merge]]). و [[downgrade]] على الإنتاج بيمسح داتا.`
          },
          lines: [
            "سطّب Alembic.",
            "اعمل فولدر migrations بقالب async.",
            "قارن الـ models بالقاعدة واكتب migration جديد (واقراه!).",
            "طبّق كل الـ migrations اللي لسه متطبقتش.",
            "القاعدة واقفة على أنهي revision.",
            "السلسلة كلها بالتفصيل.",
            "ارجع خطوة (بحذر: ممكن يمسح داتا).",
            "اطبع الـ SQL من غير ما تنفّذه، للمراجعة."
          ]
        }
      ]
    },
    {
      t: "httpx و Redis والشغل في الخلفية",
      l: 3,
      n: "تكلّم APIs تانية صح، و cache و rate limit بـ Redis، وشغل بعد الرد أو في worker",
      items: [
        {
          cmd: "httpx.AsyncClient",
          title: "تكلّم API خارجي من جوه الـ API بتاعك",
          desc: R`[[httpx.AsyncClient]] واحد مشترك للتطبيق كله (يتعمل في الـ lifespan)، مش client جديد مع كل request: بيعيد استخدام الاتصالات (keep-alive)، وده فرق كبير في السرعة. وحدد timeout دايمًا، و [[raise_for_status()]] عشان الـ 4xx و 5xx تبقى exceptions.

وللمحاولة تاني عند فشل مؤقت: retry بـ backoff (مكتبة tenacity، أو loop بسيطة)، بس للطلبات الآمنة (GET، أو اللي فيها idempotency key).

ملحوظة 2026: httpx نفسه نشاطه قلّ، و Pydantic بقت بتصون استكمال ليه اسمه [[httpx2]] بنفس الـ API بالظبط (الفرق [[import httpx2]])، و Starlette الحديث بيفضّله للـ TestClient. الأمثلة هنا بـ httpx لأنه لسه اللي [[fastapi[standard]]] بيسطّبه، والنقل غالبًا تغيير اسم الـ import بس.`,
          example: R`import asyncio
from contextlib import asynccontextmanager
import httpx
from fastapi import FastAPI, HTTPException, Request
@asynccontextmanager
async def lifespan(app: FastAPI):
    async with httpx.AsyncClient(
        base_url="https://api.payments.example",
        timeout=httpx.Timeout(5.0, connect=2.0),
        limits=httpx.Limits(max_connections=50, max_keepalive_connections=20),
        headers={"User-Agent": "shop-api/1.0"},
    ) as client:
        app.state.http = client
        yield
app = FastAPI(lifespan=lifespan)
async def get_json(client: httpx.AsyncClient, url: str, tries: int = 3) -> dict:
    for attempt in range(tries):
        try:
            r = await client.get(url)
            r.raise_for_status()
            return r.json()
        except (httpx.TransportError, httpx.HTTPStatusError) as e:
            retryable = isinstance(e, httpx.TransportError) or e.response.status_code == 429 or e.response.status_code >= 500
            if not retryable or attempt == tries - 1:
                raise
            await asyncio.sleep(0.2 * 2**attempt)
    raise RuntimeError("unreachable")
@app.get("/payments/{pid}")
async def payment(pid: str, request: Request):
    try:
        return await get_json(request.app.state.http, f"/v1/payments/{pid}")
    except httpx.HTTPError:
        raise HTTPException(502, "payment provider unavailable")`,
          try: R`خلّي الـ [[base_url]] يبقى [[https://httpbin.org]] واطلب [[/status/503]] وشوف الـ retries في اللوج (شغّل [[logging.basicConfig(level=logging.INFO)]]، و httpx بيسجّل كل طلب). وبعدين [[/delay/10]] وشوف الـ timeout.`,
          flag: "script",
          deep: {
            why: R`الـ API بتاعك بيعتمد على خدمات تانية: دفع، وشحن، و SMS، و AI. لو واحدة بطيئة أو واقعة ومفيش timeout، الطلبات عندك بتتراكم لحد ما الـ API كله يقف. ولو كل request بيعمل client جديد، كل طلب بيعمل TCP و TLS handshake من الأول.`,
            how: R`[[AsyncClient]] جواه connection pool: [[max_connections]] أقصى اتصالات مفتوحة، و [[max_keepalive_connections]] اللي بيفضلوا مفتوحين للطلب الجاي. و [[async with]] بيقفل كل الاتصالات لما التطبيق يقفل.

[[httpx.Timeout(5.0, connect=2.0)]]: ٥ ثواني لكل حاجة (read و write و pool)، و ٢ للاتصال. والـ timeout الافتراضي في httpx ٥ ثواني (عكس [[requests]] اللي ملوش timeout خالص)، بس اكتبه صريح عشان تفكّر فيه.

[[raise_for_status()]] بيرمي [[HTTPStatusError]] لأي 4xx أو 5xx، و [[TransportError]] للمشاكل قبل الرد (timeout، واتصال اتقطع)، و [[HTTPError]] الأب للاتنين.

الـ retry: exponential backoff (0.2 وبعدين 0.4 وبعدين 0.8)، وبس للأخطاء المؤقتة (شبكة و 5xx و 429)، مش 400 أو 404. ومع 429 احترم header الـ [[Retry-After]] لو موجود. ومتعملش retry لـ POST بيدفع فلوس إلا لو الـ API بيدعم idempotency key (تاب «APIs متقدمة»). ومكتبة tenacity بتعمل ده بـ decorator.

ورد الخدمة الخارجية يتفحص بـ Pydantic ([[Payment.model_validate(r.json())]]) زي أي داتا جاية من برّه. وفي الاختبارات، [[httpx.MockTransport]] أو مكتبة respx بتبدّل الـ API الحقيقي.`,
            when: R`أي نداء لـ API تاني من جوه تطبيق async. وفي السكربتات الـ sync العادية، [[httpx.Client]] بنفس الـ API من غير await.`,
            mistakes: R`[[requests]] جوه [[async def]]. و [[async with httpx.AsyncClient() as c:]] جوه كل route (مفيش إعادة استخدام للاتصالات). ومفيش timeout، أو timeout ٦٠ ثانية. و retry من غير حد أو من غير backoff (بتضرب خدمة واقعة أصلًا). وترجّع خطأ الخدمة الخارجية للعميل زي ما هو بدل 502.`
          },
          lines: [
            "لـ sleep في الـ backoff.",
            "الـ lifespan.",
            "httpx.",
            "FastAPI.",
            "lifespan.",
            "بيتنادى مرة.",
            "client واحد للتطبيق كله...",
            "...كل الطلبات تبدأ بالـ URL ده.",
            "٥ ثواني عمومًا، و ٢ للاتصال.",
            "حدود الـ pool.",
            "headers لكل طلب.",
            "والـ client هيتقفل لما التطبيق يقفل.",
            "خزّنه في app.state.",
            "التطبيق شغال هنا.",
            "التطبيق.",
            "GET بـ retry.",
            "لحد ٣ محاولات.",
            "حاول.",
            "الطلب (المسار بيتضاف على base_url).",
            "4xx أو 5xx يبقى exception.",
            "نجح.",
            "مشكلة شبكة أو رد خطأ.",
            "يستاهل نعيد؟ الشبكة و 5xx و 429 آه، وباقي الـ 4xx لأ.",
            "مش مؤقت، أو دي آخر محاولة؟",
            "ارمي نفس الخطأ.",
            "استنى 0.2 وبعدين 0.4 قبل المحاولة الجاية.",
            "عشان mypy: مش هنوصل هنا.",
            "route.",
            "بياخد الـ request عشان يوصل للـ client.",
            "حاول.",
            "رجّع رد الخدمة.",
            "الخدمة فشلت.",
            "502: المشكلة في خدمة ورانا، مش عندنا ولا عند العميل."
          ]
        },
        {
          cmd: "redis cache",
          title: "cache بـ Redis: تحفظ النتيجة وصلاحيتها تنتهي لوحدها",
          desc: R`[[redis.asyncio]] (من مكتبة [[redis]]) النسخة async من الـ client. والـ pattern الأشهر cache-aside: دوّر في Redis، لو موجود رجّعه، لو مش موجود هاته من القاعدة وحطه في Redis بـ TTL ([[ex=60]]). وأول ما الداتا تتغير امسح المفتاح.

والـ client يتعمل مرة في الـ lifespan زي أي مورد مشترك. وتشغيل Redis نفسه في تاب Docker، وتصميم طبقات الكاش في تاب «بناء مشروع كامل».`,
          example: R`import redis.asyncio as redis
from pydantic import BaseModel, TypeAdapter
class Product(BaseModel):
    id: int
    name: str
    price_cents: int
Products = TypeAdapter(list[Product])
r = redis.from_url("redis://localhost:6379/0", decode_responses=True)
async def load_products_from_db(category: str) -> list[Product]:
    return [Product(id=1, name="Tea", price_cents=1500)]
async def products_by_category(category: str) -> list[Product]:
    key = f"products:v1:{category}"
    cached = await r.get(key)
    if cached is not None:
        return Products.validate_json(cached)
    items = await load_products_from_db(category)
    await r.set(key, Products.dump_json(items), ex=60)
    return items
async def on_product_changed(category: str) -> None:
    await r.delete(f"products:v1:{category}")`,
          try: R`شغّل Redis ([[docker run -d -p 6379:6379 redis:8]])، ونادي الدالة مرتين وقيس الوقت. وبعدين من [[redis-cli]]: [[GET products:v1:tea]] و [[TTL products:v1:tea]]، وشوف العداد بينزل.`,
          flag: "script",
          deep: {
            why: "نفس الـ query التقيلة (قايمة منتجات، إحصائيات) بتتنفذ ألف مرة في الدقيقة ونتيجتها واحدة. Redis بيرجّعها من الذاكرة في أقل من ملّي ثانية، والقاعدة ترتاح للكتابة وللحاجات اللي لازم تبقى طازة.",
            how: R`[[from_url]] بيعمل client جواه connection pool، و [[decode_responses=True]] بيرجّع strings بدل bytes. و [[set(key, value, ex=60)]] بيحط المفتاح بعمر ٦٠ ثانية، و Redis بيمسحه لوحده. والقفل في آخر الـ lifespan بـ [[await r.aclose()]].

cache-aside يعني التطبيق هو اللي بيقرر يقرا ويكتب في الـ cache. والمشكلتين الكبار: invalidation (الداتا اتغيرت والـ cache لسه قديم: امسح المفتاح عند التعديل، والـ TTL شبكة أمان)، و stampede (المفتاح انتهى و ١٠٠٠ request راحوا للقاعدة مع بعض: TTL فيه عشوائية بسيطة، أو lock بـ [[SET key val NX EX 10]] عشان واحد بس يحسب).

[[v1]] في اسم المفتاح: لو شكل الموديل اتغير، غيّرها لـ v2، والمفاتيح القديمة تموت لوحدها بالـ TTL بدل ما تقع في الـ parsing.

و [[TypeAdapter]] بيعمل الـ JSON في Rust في الاتجاهين، أسرع من [[json.dumps]]، وبيفحص وهو بيقرا.

و [[@lru_cache]] في الذاكرة مش بديل: كل worker وكل container ليه نسخته، ومحدش يعرف يمسحها لما الداتا تتغير.`,
            when: "داتا بتتقري كتير وبتتغير قليل، ومقبول تبقى قديمة ثواني: كتالوج، وإعدادات، وصفحات عامة، وردود APIs خارجية. ومش للداتا اللي لازم تبقى دقيقة لحظيًا (رصيد، مخزون وقت الشراء).",
            mistakes: R`cache من غير TTL (بيكبر للأبد، والداتا القديمة عايشة). ومفتاح مشترك بين المستخدمين ([[products:list]]) لرد فيه حاجات خاصة بكل واحد. و cache لـ ORM objects بـ pickle. ونسيان إن Redis ممكن يقع: الـ cache لازم يبقى اختياري (لو Redis مش متاح، روح للقاعدة).`
          },
          lines: [
            "الـ client الـ async من مكتبة redis.",
            "الموديل، و TypeAdapter للـ JSON.",
            "موديل.",
            "حقل.",
            "حقل.",
            "حقل.",
            "adapter لليستة منتجات، يتعمل مرة واحدة.",
            "client جواه pool (في التطبيق: في الـ lifespan).",
            "القاعدة (وهمية هنا).",
            "رجّع.",
            "الدالة اللي بالـ cache.",
            "المفتاح: نوع الداتا ونسختها والفئة.",
            "دوّر في Redis.",
            "موجود؟",
            "حوّله من JSON لموديلات وارجع، من غير ما تلمس القاعدة.",
            "مش موجود: هاته من القاعدة.",
            "خزّنه JSON لمدة ٦٠ ثانية.",
            "رجّع.",
            "لما منتج يتغير.",
            "امسح المفتاح، والطلب الجاي يجيب الجديد."
          ]
        },
        {
          cmd: "redis rate limit",
          title: "تحدد عدد الطلبات لكل مستخدم في الدقيقة",
          desc: R`أبسط rate limit (fixed window): مفتاح لكل مستخدم ولكل دقيقة، و [[INCR]] مع كل طلب، و [[EXPIRE]] عشان يموت لوحده. لو العدد عدّى الحد: 429 مع [[Retry-After]]. ولأن العداد في Redis، الحد بيتطبق على كل الـ workers والـ containers مع بعض.

وتعمله dependency، فتحطه على الـ routes الحساسة (login و OTP والبحث) بحدود مختلفة.`,
          example: R`import time
import redis.asyncio as redis
from fastapi import Depends, FastAPI, HTTPException, Request
r = redis.from_url("redis://localhost:6379/0")
app = FastAPI()
def rate_limit(limit: int, window: int = 60):
    async def dep(request: Request) -> None:
        who = request.client.host if request.client else "unknown"
        bucket = int(time.time() // window)
        key = f"rl:{request.url.path}:{who}:{bucket}"
        async with r.pipeline(transaction=True) as pipe:
            count, _ = await pipe.incr(key).expire(key, window).execute()
        if count > limit:
            retry = window - int(time.time()) % window
            raise HTTPException(429, "Too many requests", headers={"Retry-After": str(retry)})
    return dep
@app.post("/auth/login", dependencies=[Depends(rate_limit(5))])
async def login():
    return {"ok": True}`,
          try: R`ابعت ٧ طلبات ورا بعض: [[for i in $(seq 7); do curl -s -o /dev/null -w "%{http_code}\n" -X POST localhost:8000/auth/login; done]] وشوف آخر اتنين 429. وبص على المفاتيح في [[redis-cli]] بـ [[SCAN 0 MATCH rl:*]].`,
          flag: "script",
          deep: {
            why: R`من غير rate limit، أي حد يجرّب مليون باسورد على [[/auth/login]]، أو يبعت ألف OTP ويخلّص رصيد الـ SMS، أو سكربت يسحب الكتالوج كله. والعداد في ذاكرة الـ process مبيشتغلش مع كذا worker: كل واحد عنده عداد لوحده.`,
            how: R`المفتاح فيه رقم النافذة ([[time // 60]])، فكل دقيقة مفتاح جديد. و [[INCR]] atomic في Redis: طلبين في نفس اللحظة مستحيل ياخدوا نفس الرقم. و [[pipeline(transaction=True)]] بيبعت [[INCR]] و [[EXPIRE]] في رحلة واحدة جوه [[MULTI]] و [[EXEC]]، فمفيش مفتاح يفضل من غير expire لو حاجة وقعت بينهم.

والـ fixed window عيبه إن الحد ممكن يتضاعف على حدود الدقيقة (٥ في آخر ثانية و ٥ في أول ثانية بعدها). لو محتاج دقة: sliding window بـ sorted set، أو token bucket بـ Lua script. ومكتبات زي [[limits]] و [[slowapi]] بتعمل ده جاهز.

المفتاح بالـ IP للـ routes اللي قبل الـ login، وبالـ user id بعده. وورا nginx الـ IP لازم ييجي من [[X-Forwarded-For]] بشكل آمن ([[--proxy-headers]] و [[--forwarded-allow-ips]] في تاب Python)، وإلا كل الناس ليهم نفس الـ IP ويتقفلوا مع بعض. ولو فيه rate limit في nginx كمان ([[limit_req]] في تاب Nginx)، ده خط أول، وده للحدود الذكية حسب المستخدم. والفكرة العامة في تاب «الأمان».`,
            when: "login و register و OTP و reset password والبحث والـ endpoints الغالية (AI، تصدير)، و APIs عامة ليها API keys.",
            mistakes: R`عداد في dict في الذاكرة. و [[INCR]] من غير [[EXPIRE]] (المفتاح بيعيش للأبد والمستخدم متقفل للأبد). و IP بتاع nginx لكل الناس. و 429 من غير [[Retry-After]]. وإنك متقررش مسبقًا تعمل إيه لو Redis وقع: تعدّي الطلبات (fail open) ولا ترفضها (fail closed).`
          },
          lines: [
            "للوقت.",
            "Redis async.",
            "FastAPI.",
            "client (في التطبيق: في الـ lifespan).",
            "التطبيق.",
            "factory: الحد وطول النافذة بالثواني.",
            "الـ dependency الحقيقية.",
            "مين؟ الـ IP هنا، أو الـ user id بعد الـ login.",
            "رقم النافذة الحالية: بيتغير كل دقيقة.",
            "مفتاح لكل مسار ومستخدم ونافذة.",
            "أوامر في رحلة واحدة جوه MULTI و EXEC.",
            "زوّد العداد، وحط له عمر، وخد الناتج.",
            "عدّى الحد؟",
            "فاضل كام ثانية للنافذة الجاية.",
            R`429، و [[Retry-After]] بيقول للعميل يستنى قد إيه.`,
            "رجّع الـ dependency.",
            "٥ محاولات login في الدقيقة لكل IP.",
            "الـ route.",
            "رجّع."
          ]
        },
        {
          cmd: "BackgroundTasks",
          title: "شغل بعد ما الرد يتبعت: إيميل، لوج، webhook",
          desc: R`[[BackgroundTasks]] بيخلّيك تضيف دالة تشتغل بعد ما الرد يوصل للعميل: [[tasks.add_task(send_email, to, body)]]. فالعميل مش بيستنى الإيميل يتبعت.

بس هي بتشتغل جوه نفس الـ process: لو السيرفر اتعمله restart أو وقع، الشغل ضاع، ومفيش retry. فهي للحاجات الخفيفة اللي لو ضاعت مش مشكلة. والشغل المهم أو التقيل (فواتير، معالجة صور، تقارير) مكانه queue و worker منفصل: arq أو Celery أو Dramatiq أو taskiq.`,
          example: R`import asyncio
import logging
from fastapi import BackgroundTasks, FastAPI
from pydantic import BaseModel, EmailStr
log = logging.getLogger("app")
app = FastAPI()
class Signup(BaseModel):
    email: EmailStr
async def send_welcome(email: str) -> None:
    try:
        await asyncio.sleep(1)
        log.info("welcome sent to %s", email)
    except Exception:
        log.exception("welcome email failed for %s", email)
def audit(event: str, email: str) -> None:
    log.info("audit %s %s", event, email)
@app.post("/signup", status_code=201)
async def signup(data: Signup, tasks: BackgroundTasks):
    tasks.add_task(send_welcome, data.email)
    tasks.add_task(audit, "signup", data.email)
    return {"ok": True}
# شغل مهم: queue و worker بـ arq (بيتخزن في Redis وبيتعاد لو فشل)
# pool = await arq.create_pool(RedisSettings())
# await pool.enqueue_job("generate_invoice", order_id)`,
          try: R`خلّي [[send_welcome]] تستنى ٥ ثواني، وابعت [[curl -w "%{time_total}\n" -X POST localhost:8000/signup -H "Content-Type: application/json" -d '{"email": "a@example.com"}']]: الرد هيرجع فورًا، واللوج هيظهر بعد ٥ ثواني. وبعدين اقفل السيرفر بالقوة في النص (Ctrl+C مرتين، أو [[kill -9]] للـ PID) وشوف الإيميل ضاع. (الـ restart العادي uvicorn بيستنى فيه الـ tasks تخلص، بس الـ crash أو الـ SIGKILL بعد مهلة الـ deploy بيضيّعها.)`,
          flag: "script",
          deep: {
            why: "التسجيل بياخد ٣ ثواني لأن الـ route مستني SMTP يرد، والمستخدم مش محتاج يستنى الإيميل عشان يشوف «تم». بس لو حطيت شغل مهم في BackgroundTasks، أول deploy هيضيّع طلبات من غير ما حد يعرف.",
            how: R`الـ tasks بتتنفذ بالترتيب بعد ما الـ response يتبعت، في نفس الـ event loop (لو [[async def]]) أو في threadpool (لو [[def]]). ولو واحدة رمت exception، اللي بعدها مش هتشتغل، فحط try/except جواها.

و [[BackgroundTasks]] ينفع ييجي في dependency كمان، و FastAPI بيجمعهم كلهم.

ومهم: متستخدمش حاجة من الـ request في الـ task (الاتصال من dependency بـ yield، أو الـ session): ممكن تكون اتقفلت. ابعت القيم اللي محتاجها (الإيميل، الـ id)، والـ task تفتح اللي محتاجاه بنفسها.

الـ worker والـ queue: الطلب بيتكتب في Redis أو RabbitMQ، و process منفصلة (container تاني) بتسحب وتنفّذ، ولو فشلت بتعيد، ولو السيرفر وقع الطلب لسه في الـ queue. و arq بسيط و async ومبني على Redis، و Celery الأقدم والأكبر. وفي الـ outbox pattern (درس transactions)، الـ worker بيقرا من جدول في القاعدة بدل queue. والفكرة كاملة في «background jobs» في تاب «بناء مشروع كامل».`,
            when: "BackgroundTasks: لوج، و analytics، وإيميل «أهلًا» مش حرج، و invalidate cache. و queue: أي حاجة لازم تحصل (فواتير، webhooks للعملاء)، أو تقيلة (صور، PDF، AI)، أو محتاجة retry أو جدولة.",
            mistakes: R`معالجة فيديو في BackgroundTasks (بتاكل CPU الـ API نفسه). وتبعت الـ db session للـ task. وتفتكر إن الـ task بتتعاد لو فشلت. وحسبة CPU تقيلة في task [[async def]]: بتقفل الـ loop بعد الرد، والطلبات الجاية هي اللي تستنى.`
          },
          lines: [
            "لـ sleep.",
            "logging.",
            "BackgroundTasks.",
            "الموديل.",
            "logger.",
            "التطبيق.",
            "الـ body.",
            "حقل.",
            "الشغل اللي هيحصل بعد الرد.",
            "أي خطأ هنا مش هيوصل للعميل، فلازم تمسكه بنفسك.",
            "كأنه اتصال بـ SMTP.",
            "لوج.",
            "امسك.",
            "سجّل الخطأ كامل.",
            "task sync: بتشتغل في threadpool.",
            "لوج.",
            "route.",
            "FastAPI بيدّيك object الـ tasks.",
            "ضيف task بالباراميترات (قيم، مش objects من الـ request).",
            "تانية، بتشتغل بعد الأولى.",
            "الرد بيتبعت فورًا، والـ tasks بعده."
          ]
        }
      ]
    },
    {
      t: "الأداء والإنتاج",
      l: 3,
      n: "workers والـ GIL والحسابات التقيلة، و logging منظم، وتقيس قبل ما تحسّن",
      items: [
        {
          cmd: "workers و GIL",
          title: "كام worker، وليه Python مبيستخدمش كل الـ cores في process واحد",
          desc: R`الـ GIL قفل في CPython بيخلي thread واحد بس ينفّذ كود Python في نفس اللحظة جوه الـ process. للـ I/O مش مشكلة (async أو threads بيسيبوه وهم مستنيين)، بس الحسابات التقيلة مبتستفيدش من cores زيادة جوه process واحد.

عشان كده في الإنتاج بتشغّل كذا process: [[fastapi run --workers 4]] (أو [[uvicorn --workers]]، أو كذا container). والحسبة التقيلة جوه request: [[ProcessPoolExecutor]] أو worker منفصل.`,
          example: R`import asyncio
import os
from concurrent.futures import ProcessPoolExecutor
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
def heavy_report(n: int) -> int:
    return sum(i * i for i in range(n))
@asynccontextmanager
async def lifespan(app: FastAPI):
    with ProcessPoolExecutor(max_workers=2) as pool:
        app.state.cpu = pool
        yield
app = FastAPI(lifespan=lifespan)
@app.get("/report")
async def report(request: Request, n: int = 10_000_000):
    loop = asyncio.get_running_loop()
    result = await loop.run_in_executor(request.app.state.cpu, heavy_report, n)
    return {"result": result, "pid": os.getpid()}
# في الترمنال:
# fastapi run app/main.py --workers 4
# python3.14t -c "import sys; print(sys._is_gil_enabled())"`,
          try: R`نادي [[heavy_report(n)]] مباشرة جوه الـ route من غير الـ executor، وافتح أي endpoint تاني في نفس الوقت: هيستنى. وبعدين بالـ executor. وجرّب [[--workers 1]] و [[--workers 4]] مع أداة زي [[hey]] أو [[wrk]]، وقارن الـ requests/sec.`,
          flag: "script",
          deep: {
            why: "API بيعمل حسبة تقيلة (تقرير، resize، تشفير) على سيرفر ٤ cores بـ worker واحد: core واحد ١٠٠٪ والتلاتة فاضيين، وكل الطلبات مستنية. وسؤال الـ GIL من أشهر أسئلة انترفيو Python.",
            how: R`الـ GIL (Global Interpreter Lock) بيحمي الـ reference counting وبيانات الـ interpreter من إن threads تبوّظها. والـ threads بتسيبه وهي مستنية I/O أو وهي جوه مكتبات C زي numpy و hashlib، فشغل الـ I/O ماشي كويس بالـ threads أو الـ async.

كل worker process لوحده: interpreter وذاكرة و GIL خاصين بيه، وكلهم بيسمعوا على نفس البورت. ونقطة بداية: عدد الـ cores، وبعدين قيس. وكل worker ليه الـ pool بتاعه، فاتصالات القاعدة بتتضرب في عدد الـ workers. وفي Kubernetes الأشهر worker واحد لكل container وتكبّر بعدد الـ pods (تاب «Cloud و DevOps»).

[[ProcessPoolExecutor]] بيشغّل الدالة في process تانية: الـ arguments والناتج بيتعملهم pickle ويتنقلوا، فالدالة لازم تبقى على مستوى الـ module، والداتا متبقاش ضخمة.

Python 3.13 جاب نسخة free-threaded تجريبية ([[python3.13t]])، و 3.14 بقت مدعومة رسميًا (PEP 779)، بس لسه build منفصل مش الافتراضي، ومش كل المكتبات جاهزة ليها. و 3.14 كمان فيها [[concurrent.interpreters]]: كذا interpreter في process واحد، كل واحد بـ GIL خاص بيه. الاتنين اتجاه المستقبل، بس الإنتاج النهارده لسه workers و processes.`,
            when: "workers = عدد الـ cores كبداية على VM. حسبة CPU أقل من ثانية ونادرة: ProcessPool. أكتر أو كتير: queue و workers منفصلين. والأهم: قيس الأول (الدرس الجاي).",
            mistakes: R`[[--workers 16]] على سيرفر ٢ cores (تبديل كتير وذاكرة ×16). و [[--reload]] مع [[--workers]]. وتفتكر إن الـ threads في Python بتسرّع الحسابات. وحالة في الذاكرة (dict للـ sessions أو الـ rate limit) مع كذا worker: كل واحد شايف نسخة مختلفة، فالحالة المشتركة مكانها Redis.`
          },
          lines: [
            "asyncio.",
            "لـ PID.",
            "pool من processes.",
            "الـ lifespan.",
            "FastAPI.",
            "حسبة CPU خالصة: الـ GIL بيمنعها تستفيد من threads.",
            "ملايين العمليات بـ Python.",
            "lifespan.",
            "بيتنادى مرة.",
            "processes جاهزة للحسابات، وبتتقفل مع التطبيق.",
            "خزّنها.",
            "التطبيق شغال.",
            "التطبيق.",
            "route.",
            "async، والحسبة مش هتقفل الـ loop.",
            "الـ loop الحالي.",
            "ابعت الحسبة لـ process تانية واستنى من غير ما تقفل حد.",
            "الـ PID بيوريك أنهي worker اللي رد."
          ]
        },
        {
          cmd: "logging و profiling",
          title: "لوج منظم بدل print، وتقيس الوقت بيروح فين",
          desc: R`[[logging]] بدل [[print]]: كل رسالة ليها level ([[DEBUG]] و [[INFO]] و [[WARNING]] و [[ERROR]])، واسم الـ module، والوقت، وتقدر تطلّعها JSON عشان أدوات اللوج تفهمها. و [[log = logging.getLogger(__name__)]] في أول كل ملف.

وقبل ما تحسّن أي حاجة، قيس: [[time.perf_counter()]] حوالين الحتة المشكوك فيها، و [[cProfile]] للسكربتات، و [[py-spy]] لـ process شغال فعلًا في الإنتاج من غير ما توقفه.`,
          example: R`import json
import logging
import sys
import time
class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord) -> str:
        data = {"ts": self.formatTime(record), "level": record.levelname, "logger": record.name, "msg": record.getMessage()}
        if record.exc_info:
            data["exc"] = self.formatException(record.exc_info)
        return json.dumps(data, ensure_ascii=False)
handler = logging.StreamHandler(sys.stdout)
handler.setFormatter(JsonFormatter())
logging.basicConfig(level=logging.INFO, handlers=[handler])
log = logging.getLogger(__name__)
start = time.perf_counter()
log.info("order created id=%s total=%s", 42, 1500)
log.debug("مش هيظهر: الـ level بتاعنا INFO")
try:
    1 / 0
except ZeroDivisionError:
    log.exception("report failed")
log.info("took %.1fms", (time.perf_counter() - start) * 1000)
# في الترمنال:
# python -m cProfile -s cumtime scripts/report.py | head -30
# py-spy top --pid 1234
# py-spy dump --pid 1234`,
          try: R`شغّل المثال وشوف الـ JSON، وبعدين غيّر الـ level لـ [[DEBUG]]. وعلى تطبيق FastAPI شغال، سطّب [[pip install py-spy]] وشغّل [[py-spy top --pid]] بالـ PID بتاع uvicorn وانت بتبعت طلبات، وشوف أنهي دالة واخدة الوقت.`,
          flag: "script",
          deep: {
            why: R`[[print]] في الإنتاج: مفيش وقت، ولا level، ولا طريقة تفلتر، والـ traceback بيضيع. ولما الـ API يبطأ، التخمين («أكيد القاعدة») غلط نص الوقت: القياس بيوريك إن الوقت رايح في serialization، أو في N+1، أو في استدعاء خارجي.`,
            how: R`الـ logging فيه loggers (بأسماء بالنقط زي [[app.routers.orders]])، و handlers (بيكتبوا فين: stdout أو ملف)، و formatters (الشكل). و [[basicConfig]] بيجهّز الـ root logger مرة واحدة أول ما التطبيق يقوم. وفي Docker اكتب على stdout بس، والـ platform يجمعها (تاب Docker).

[[log.info("id=%s", x)]] بالـ [[%s]] مش f-string: الـ formatting بيحصل بس لو الرسالة هتتطبع فعلًا، وأدوات زي Sentry بتجمّع الرسايل اللي ليها نفس القالب. و [[log.exception]] جوه except بيكتب الـ traceback كامل.

و uvicorn ليه loggers خاصة ([[uvicorn.error]] و [[uvicorn.access]])، وتظبطها بـ [[--log-config]]، أو [[--no-access-log]] لو nginx بيعمل access log.

[[cProfile]] بيسجّل كل نداء دالة ووقته، و [[-s cumtime]] بيرتّب بالوقت الكلي. بيبطّأ التشغيل، فهو للتجربة المحلية. أما [[py-spy]] فـ sampling profiler بيقرا ذاكرة الـ process من برّه: مبيبطّأش، ومش محتاج تغيّر كود، و [[dump]] بيوريك كل thread واقف فين دلوقتي (مفيد لما حاجة معلّقة). وفي Docker محتاج [[--cap-add SYS_PTRACE]]. و 3.14 ضاف [[python -m pdb -p PID]] تعمل debug لـ process شغال، و [[python -m asyncio ps PID]] للـ tasks.

وللإنتاج: metrics (Prometheus) و Sentry، في تاب «Cloud و DevOps»، واللوج المنظم في «structured logs» في تاب «بناء مشروع كامل».`,
            when: "الـ logging من أول سطر في أي خدمة. والقياس قبل أي optimization، ولما endpoint معين يبطأ.",
            mistakes: R`[[print]] في الإنتاج. و [[log.info(f"...")]] في loop سخن. وتسجّل باسوردات أو توكنات أو body كامل فيه بيانات شخصية. و [[logging.basicConfig]] في كذا ملف (أول واحد بس اللي بيشتغل). وتحسّن حاجة من غير ما تقيس قبل وبعد.`
          },
          lines: [
            "JSON.",
            "logging.",
            "stdout.",
            "التوقيت.",
            "formatter بيطلّع كل رسالة JSON في سطر.",
            "الدالة اللي بتتنادى لكل رسالة.",
            "الوقت والـ level واسم الـ logger والرسالة.",
            "فيه exception؟",
            "ضيف الـ traceback.",
            "سطر JSON، والعربي يفضل عربي.",
            "اكتب على stdout (Docker بيجمعه).",
            "بالشكل ده.",
            "جهّز الـ root logger مرة واحدة: INFO وفوق.",
            "logger باسم الـ module.",
            "ابدأ القياس.",
            R`[[%s]] مش f-string: الـ formatting بيحصل بس لو الرسالة هتتطبع.`,
            "أقل من INFO: مش هيتطبع.",
            "كود هيرمي.",
            "قسمة على صفر.",
            "امسك.",
            "ERROR ومعاه الـ traceback كامل.",
            "الوقت بالملّي ثانية."
          ]
        }
      ]
    },
    {
      t: "أسئلة انترفيو",
      l: 3,
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
          lines: [
            "الـ list دي اتعملت مرة واحدة وقت التعريف.",
            "بتتعدّل مكانها.",
            "بترجع نفس الـ object.",
            "النداء التاني شاف اللي ضافه الأول.",
            "None ثابت ومبيتعدلش.",
            "list جديدة لكل نداء.",
            "آمن.",
            "رجّع."
          ]
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
          lines: [
            "threading و time.",
            "حسبة CPU خالصة.",
            "loop.",
            "Python bytecode: محتاج الـ GIL.",
            "ابدأ القياس.",
            "threadين.",
            "ابدأهم.",
            "استناهم.",
            "مفيش تسريع: واحد بس بيشتغل في كل لحظة."
          ]
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
          lines: [
            "list فيها 100 ألف عنصر.",
            "نفس العناصر في set.",
            "بيقارن عنصر عنصر لحد الآخر.",
            "بيحسب الـ hash ويروح للخانة على طول.",
            "tuple: ثابتة و hashable.",
            "فتنفع مفتاح في dict."
          ]
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
          lines: [
            "لقياس الحجم.",
            "list: المليون رقم في الذاكرة.",
            "generator: ولا رقم اتحسب لسه.",
            "الفرق في الذاكرة ضخم.",
            "بيحسب ويجمع واحد واحد.",
            "المرة التانية فاضي."
          ]
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
          lines: [
            "الأدوات.",
            "بياخد الدالة.",
            "حافظ على الاسم والـ signature.",
            "async عشان الدالة الأصلية async.",
            "ابدأ.",
            "try...",
            "...نادي الأصلية ورجّع ناتجها.",
            "في كل الأحوال...",
            "...اطبع الوقت.",
            "رجّع الـ wrapper."
          ]
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
          lines: [
            "dependency بـ yield.",
            "خد اتصال من الـ pool.",
            "ادّيه للـ route، وبعد الـ request يرجع للـ pool.",
            "نوع قابل لإعادة الاستخدام.",
            "route.",
            "بيعلن هو محتاج إيه بس.",
            "استخدمهم.",
            "في الاختبارات: بدّلها."
          ]
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
          lines: [
            "موديل.",
            "إعدادات v2: يقرا من objects، ويرفض الزيادة.",
            "حقل.",
            "بيفحص الإيميل.",
            R`[["5"]] اتحوّل 5 (lax mode).`,
            "dict بأنواع JSON."
          ]
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
            how: R`AnyIO هو اللي بيشغّل الـ def في threads، وتقدر تكبّر الحد بتاعه لو محتاج. والـ dependencies نفس القاعدة. ولو مضطر تنادي حاجة sync من async: [[await asyncio.to_thread(fn)]] أو [[run_in_threadpool]]. وعشان تكتشف الـ blocking: [[PYTHONASYNCIODEBUG=1]] بيحذّر من أي خطوة أخدت أكتر من 100ms.`,
            when: "«إيه اللي يحصل لو حطيت time.sleep في async def؟»، و «إزاي تنادي مكتبة sync من async؟»، و «ليه FastAPI سريع؟»، و «الفرق بين concurrency و parallelism؟».",
            mistakes: "«async دايمًا أسرع». و «def في FastAPI بتقفل السيرفر». و «async بيستخدم كل الـ cores»."
          },
          lines: [
            "route.",
            "async، والاتصال جاي من dependency.",
            "كل I/O بـ await: صح.",
            "route.",
            "def عادية: بتشتغل في thread.",
            "sync جوه def: صح.",
            "route.",
            "async...",
            "...وجواها sync: كل الطلبات هتستنى."
          ]
        }
      ]
    }
  ]
});

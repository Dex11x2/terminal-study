// تكملة تاب symbols: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/symbols/01.js (شرح حقول الدرس في أوله)
MORE("symbols", [
    {
      t: "رموز Python",
      l: 2,
      n: ": والمسافات، و // و ** و f\"{}\" و *args و -> و := و is: الحاجات اللي Python مختلفة فيها",
      items: [
        {
          cmd: ": والمسافات",
          title: "النقطتين والمسافات في Python: : في آخر السطر تفتح بلوك، والمسافات (indentation) هي اللي بتحدد البلوك",
          desc: R`Python مفيهاش [[{ }]] للبلوكات. بدلها: [[:]] في آخر سطر if و for و while و def و class، وبعدها كل السطور اللي داخلة لجوه بنفس عدد المسافات (عادة ٤) هي البلوك. أول سطر يرجع لورا يبقى البلوك خلص.

يعني المسافات في أول السطر في Python جزء من الكود، مش تنسيق. غلطة في مسافة واحدة تطلع [[IndentationError]] أو الأسوأ: سطر يتنفذ برة الـ if من غير error.

نفس فكرة المسافات في YAML (ملفات docker-compose و GitHub Actions) وفي Makefile (لازم tab). في JS و C المسافات مالهاش معنى والأقواس هي اللي بتحدد.`,
          example: R`def check(age):
    if age >= 18:
        print("بالغ")
        return True
    print("قاصر")
    return False
for i in range(3):
    print(i)`,
          flag: "script",
          try: R`اكتب الدالة في ملف [[a.py]]، وبعدين خلّي [[print("بالغ")]] بـ ٣ مسافات بدل ٨ وشغّله بـ [[python3 a.py]] واقرا الـ error. بعدين جرّب تنسى [[:]] بعد if.`,
          deep: {
            why: R`أول error هتشوفه في Python غالبًا مسافات. وفهم إن المسافات هي الأقواس بيخليك تقرا أي كود Python بسرعة.`,
            how: R`الـ tokenizer بتاع Python بيحوّل زيادة المسافات لـ INDENT ونقصها لـ DEDENT، ودول بيلعبوا دور [[{]] و [[}]]. الخلط بين tabs ومسافات في نفس الملف بيطلع [[TabError]].`,
            when: R`دايمًا ٤ مسافات (PEP 8)، وخلي المحرر يحوّل Tab لمسافات. و Black أو Ruff يظبطوا الملف لوحدهم.`,
            mistakes: R`تنسى [[:]] فيطلع [[SyntaxError: expected ':']]. وتنسخ كود من موقع فيه tabs ومسافات مخلوطين. وتكتب سطر المفروض جوه الـ loop برة بمسافة ناقصة فيتنفذ مرة واحدة بس من غير أي error.`
          },
          lines: [
            R`[[:]] في الآخر: جسم الدالة جاي.`,
            R`٤ مسافات: جوه الدالة. و [[:]] تانية تفتح بلوك الـ if.`,
            R`٨ مسافات: جوه الـ if.`,
            R`لسه جوه الـ if.`,
            R`رجعنا لـ ٤: الـ if خلص، ده جوه الدالة بس.`,
            R`آخر سطر في الدالة.`,
            R`صفر مسافات: برة الدالة خالص، loop جديدة.`,
            R`جوه الـ loop.`
          ],
          sol: R`مع ٣ مسافات ← [[IndentationError: unindent does not match any outer indentation level]] (أو unexpected indent حسب المكان). ومن غير [[:]] ← [[SyntaxError: expected ':']].`
        },
        {
          cmd: "// في Python",
          title: "الشرطتين // في Python: قسمة صحيحة بتشيل الكسر، مش تعليق",
          desc: R`في Python [[/]] قسمة عادية دايمًا بترجّع float: [[7 / 2]] بـ [[3.5]]. و [[//]] قسمة صحيحة (floor division) بتقرّب لتحت: [[7 // 2]] بـ [[3]]. ومعاها [[%]] الباقي و [[**]] الأس.

مع السالب [[//]] بتقرّب لتحت مش للصفر: [[-7 // 2]] بـ [[-4]] مش [[-3]].

الفخ لو جاي من JS: في JS و C و Java [[//]] تعليق! وفي JS مفيش قسمة صحيحة، بتكتب [[Math.floor(7 / 2)]] أو [[Math.trunc]]. وفي C و Java [[7 / 2]] بين integers بـ 3 من الأساس. والتعليق في Python [[#]].`,
          example: R`print(7 / 2, 7 // 2, 7 % 2)
print(-7 // 2, 2 ** 10)
minutes = 125 // 60
seconds = 125 % 60
print(f"{minutes}:{seconds:02d}")`,
          flag: "script",
          try: R`افتح [[python3]] وجرّب [[10 / 5]] (لاحظ [[2.0]] مش 2)، و [[10 // 3]]، و [[-10 // 3]]، و [[divmod(125, 60)]].`,
          deep: {
            why: R`لو جاي من لغة تانية هتتلخبط: [[/]] في Python 3 دايمًا كسر، والـ index لازم يبقى int، فـ [[arr[len(arr) / 2]]] بتطلع TypeError.`,
            how: R`[[a // b]] = [[floor(a / b)]]. ومع [[%]] بيحققوا دايمًا [[(a // b) * b + a % b == a]]، عشان كده [[%]] في Python بياخد إشارة المقسوم عليه.`,
            when: R`أي index أو عدد صفحات أو تحويل وحدات محتاج رقم صحيح. و [[divmod(a, b)]] بترجّع الاتنين مرة واحدة.`,
            mistakes: R`تكتب [[//]] كتعليق في Python فتلاقي SyntaxError أو قسمة غريبة. وتستخدم [[/]] لـ index. وتفتكر [[-7 // 2]] بـ [[-3]].`
          },
          lines: [
            R`[[3.5 3 1]].`,
            R`[[-4]] (تقريب لتحت)، و [[1024]].`,
            R`عدد الدقايق الكاملة: 2.`,
            R`الثواني الباقية: 5.`,
            R`f-string بـ [[:02d]] تخلي الرقم خانتين: [[2:05]].`
          ],
          sol: R`[[10 / 5]] ← [[2.0]]. [[10 // 3]] ← [[3]]. [[-10 // 3]] ← [[-4]]. [[divmod(125, 60)]] ← [[(2, 5)]].`
        },
        {
          cmd: "f\"{x}\"",
          title: "حرف f قبل التنصيص في Python: f-string، أي حاجة بين { } جوه النص بتتحسب وتتحط مكانها",
          desc: R`[[f"Hi {name}"]] في Python زي الـ template literal في JS بالظبط: الـ [[f]] قبل علامة التنصيص بتخلي [[{...}]] جوه النص تتحسب. أي expression ينفع: [[f"{a + b}"]] و [[f"{name.upper()}"]].

وبعد [[:]] جوه الأقواس تقدر تنسّق: [[f"{price:.2f}"]] رقمين عشريين، و [[f"{n:,}"]] فواصل الآلاف، و [[f"{n:05d}"]] أصفار في الأول. و [[f"{x=}"]] بتطبع الاسم والقيمة (مفيدة جدًا في الـ debugging).

عشان تكتب قوس حرفي جوه f-string كرّره: [[{{]] و [[}}]]. وفيه حروف تانية قبل التنصيص: [[r"..."]] raw (الـ backslash حرفي، مهم للـ regex ومسارات ويندوز)، و [[b"..."]] bytes.`,
          example: R`name, price = "Sara", 1234.5
print(f"أهلًا {name}")
print(f"السعر: {price:,.2f} جنيه")
print(f"{name=}")
print(f"{{ مش متغير }}")
path = r"C:\new\test"`,
          flag: "script",
          try: R`افتح [[python3]] واكتب [[x = 7]] وبعدين [[print(f"{x * 3 = }")]] و [[print("{x}")]] من غير f وقارن.`,
          deep: {
            why: R`بناء النصوص من متغيرات في كل سكربت. والـ [[{x=}]] أسرع طريقة تطبع قيم وانت بتدوّر على bug.`,
            how: R`Python بيحوّل الـ f-string وقت الـ compile لكود بيحسب كل expression ويلزّق النتايج. التنسيق بعد [[:]] هو نفس format spec بتاع [[format()]].`,
            when: R`أي نص فيه متغيرات. استثناء: رسايل الـ logging الأحسن تبعتلها الـ arguments منفصلة ([[log.info("x=%s", x)]]).`,
            mistakes: R`تنسى الـ [[f]] فتتطبع [[{name}]] زي ما هي. وتكتب [[$__{name}]] زي JS. وتستخدم نفس نوع التنصيص جوه الأقواس [[f"{d["key"]}"]] في نسخ Python أقدم من 3.12 فيطلع SyntaxError، استخدم [[']] جوه.`
          },
          lines: [
            R`متغيرين في سطر واحد.`,
            R`[[أهلًا Sara]].`,
            R`فواصل آلاف ورقمين عشريين: [[1,234.50]].`,
            R`[[=]] بتطبع الاسم والقيمة: [[name='Sara']].`,
            R`قوسين مكررين بيطلعوا قوس حرفي: [[{ مش متغير }]].`,
            R`[[r]] قبل التنصيص: [[\n]] و [[\t]] بيفضلوا حروف عادية.`
          ],
          sol: R`[[print(f"{x * 3 = }")]] ← [[x * 3 = 21]]. و [[print("{x}")]] ← [[{x}]] حرفيًا.`
        },
        {
          cmd: "*args  و  **kwargs",
          title: "النجمة والنجمتين في Python: *args تلم arguments كتير في tuple، و **kwargs تلم الأسماء في dict",
          desc: R`في تعريف دالة: [[def f(*args)]] بتلم كل الـ arguments اللي من غير أسماء في tuple اسمها args. و [[def f(**kwargs)]] بتلم كل اللي بأسماء ([[f(a=1, b=2)]]) في dict. الأسامي args و kwargs عرف، المهم النجوم.

وفي النداء العكس: [[f(*my_list)]] بتفرد الـ list كـ arguments منفصلة، و [[f(**my_dict)]] بتفرد الـ dict كـ arguments بأسماء. ونفس الحاجة في بناء القوايم: [[[*a, *b]]] و [[{**d1, **d2}]].

ده المقابل لـ [[...]] في JS. و [[*]] لوحدها في الـ parameters [[def f(a, *, b)]] معناها «اللي بعدي لازم يتبعت بالاسم». وبين رقمين [[*]] ضرب و [[**]] أس.`,
          example: R`def total(*prices):
    return sum(prices)
print(total(10, 20, 30))
def show(**info):
    print(info)
show(name="Ali", age=20)
nums = [3, 1, 2]
print(max(*nums), [*nums, 4])
merged = {**{"a": 1}, "b": 2}`,
          flag: "script",
          try: R`في [[python3]] عرّف [[def f(*args, **kwargs): print(args, kwargs)]] وجرّب [[f(1, 2, x=3)]] و [[f(*[1, 2], **{"y": 4})]].`,
          deep: {
            why: R`هتلاقيها في كل مكتبة: decorators و wrappers ودوال بتمرر الـ arguments لدالة تانية زي ما هي. ولازم تفرّق بين النجمة اللي بتلم والنجمة اللي بتفرد.`,
            how: R`وقت التعريف النجوم بتعمل packing (لمّ)، ووقت النداء unpacking (فرد). الترتيب في التعريف ثابت: العادي، ثم [[*args]]، ثم الـ keyword-only، ثم [[**kwargs]].`,
            when: R`دوال بعدد arguments مش ثابت، و wrappers زي [[def wrapper(*args, **kwargs): return fn(*args, **kwargs)]]، ودمج dicts.`,
            mistakes: R`تكتب [[**kwargs]] قبل [[*args]] فيطلع SyntaxError. وتنسى إن args هي tuple مش list فمفيهاش [[append]]. وتفرد dict بنجمة واحدة [[f(*d)]] فتتبعت المفاتيح بس.`
          },
          lines: [
            R`[[*prices]] بتلم أي عدد أرقام في tuple.`,
            R`اجمعهم.`,
            R`[[60]].`,
            R`[[**info]] بتلم الـ arguments اللي بأسماء في dict.`,
            R`اطبع الـ dict.`,
            R`[[{'name': 'Ali', 'age': 20}]].`,
            R`list.`,
            R`فرد في النداء [[max(3, 1, 2)]] بـ 3، وفرد في list جديدة [[[3, 1, 2, 4]]].`,
            R`فرد dict جوه dict: [[{'a': 1, 'b': 2}]].`
          ],
          sol: R`[[f(1, 2, x=3)]] ← [[(1, 2) {'x': 3}]]. [[f(*[1, 2], **{"y": 4})]] ← [[(1, 2) {'y': 4}]].`
        },
        {
          cmd: "def f(x: int) -> str",
          title: "السهم -> بعد دالة في Python: نوع اللي الدالة بترجّعه (type hint)",
          desc: R`[[def greet(name: str) -> str:]] معناها name نص، والدالة بترجّع نص. النقطتين بعد اسم الـ parameter للنوع بتاعه، والسهم [[->]] قبل [[:]] الأخيرة لنوع اللي بيرجع. و [[-> None]] يعني مبترجّعش حاجة.

Python نفسه مبيفحصش الأنواع دي وقت التشغيل خالص. اللي بيفحصها أدوات زي mypy و Pyright (والمحرر). لكن FastAPI و Pydantic بيستخدموها فعلًا عشان يعملوا validation.

نفس [[->]] لنوع الراجع في Rust و Swift، وفي C++ الحديث [[auto f() -> int]]. لكن في TypeScript و Kotlin بيستخدموا [[:]] بدل السهم. والسهم في Java و Kotlin جوه lambda معناه تاني خالص.`,
          example: R`def greet(name: str, times: int = 1) -> str:
    return (name + " ") * times
def log(msg: str) -> None:
    print(msg)
def find(users: list[dict], uid: int) -> dict | None:
    return next((u for u in users if u["id"] == uid), None)
print(greet(5))`,
          flag: "script",
          try: R`احفظ المثال في [[t.py]] وشغّله: هيقع في السطر الأخير بس بـ TypeError عادي وقت التشغيل. لو عندك mypy جرّب [[mypy t.py]] وشوف إنه بيمسك الغلط قبل التشغيل.`,
          deep: {
            why: R`الكود الكبير من غير أنواع بيبقى تخمين: الدالة دي بترجّع list ولا dict ولا None؟ والـ hints بتخلي المحرر يكمّلك ويحذّرك.`,
            how: R`الـ hints بتتخزن في [[f.__annotations__]] وبس، Python مبيعملش بيها حاجة. الأدوات بتقراها وتحلل الكود من غير ما تشغّله.`,
            when: R`في أي كود هيعيش أو هيشتغل عليه أكتر من حد، وإجباري تقريبًا مع FastAPI و Pydantic.`,
            mistakes: R`تفتكر Python هيمنع نوع غلط وقت التشغيل. وتكتب [[list[int]]] في Python أقدم من 3.9 أو [[int | None]] في أقدم من 3.10 (استخدم [[typing.List]] و [[Optional]]). وتحط [[->]] بعد [[:]] بدل قبلها.`
          },
          lines: [
            R`name نص، و times رقم افتراضيه 1، والدالة بترجّع نص.`,
            R`كرر الاسم.`,
            R`[[-> None]]: مبترجّعش قيمة.`,
            R`بتطبع بس.`,
            R`بترجّع dict أو None.`,
            R`أول يوزر الـ id بتاعه مطابق، أو None.`,
            R`5 مش str: Python هيشغّلها ويقع وقت الجمع، و mypy كان هيمسكها قبلها.`
          ],
          sol: R`التشغيل ← [[TypeError: unsupported operand type(s) for +: 'int' and 'str']]. و [[mypy t.py]] ← [[error: Argument 1 to "greet" has incompatible type "int"; expected "str"]] من غير ما يشغّل.`
        },
        {
          cmd: ":= (walrus)",
          title: "النقطتين ويساوي := في Python: الـ walrus، بتحط قيمة في متغير وترجّعها في نفس الوقت",
          desc: R`[[:=]] (اسمها walrus operator عشان شبه عيون وأنياب الفظ) بتعمل assignment جوه expression. [[if (n := len(data)) > 10:]] بتحسب الطول، تحطه في n، وتقارن، في سطر واحد.

من غيرها كنت هتكتب [[n = len(data)]] في سطر لوحده قبل الـ if. وفيده أكتر في الـ while: [[while (line := f.readline()):]].

موجودة من Python 3.8. ونفس الرمز [[:=]] في Go معناه حاجة تانية: تعريف متغير جديد مع قيمته ([[x := 5]])، ودرسه في المستوى ٣. وفي Pascal و SQL ساعات [[:=]] هي الـ assignment العادية.`,
          example: R`data = [1, 2, 3, 4, 5, 6]
if (n := len(data)) > 5:
    print(f"طويلة: {n} عناصر")
while (cmd := input("> ")) != "quit":
    print("كتبت", cmd)
squares = [y for x in data if (y := x * x) > 10]`,
          flag: "script",
          try: R`في [[python3]] جرّب [[print(x := 5)]] وبعدين [[print(x)]]. وجرّب [[x := 5]] لوحدها كسطر واقرا الـ error.`,
          deep: {
            why: R`بتشيل تكرار: تحسب حاجة مرة واحدة وتستخدمها في الشرط وجوه البلوك. وهتشوفها في كود Python الحديث فلازم تقراها.`,
            how: R`[[a := expr]] بتقيّم expr، تحطه في a، وترجّعه كقيمة الـ expression. الأقواس غالبًا لازمة عشان أولويتها واطية: [[n := len(data) > 5]] من غير أقواس هتحط True أو False في n.`,
            when: R`في if و while و list comprehensions لما القيمة اللي بتختبرها هي نفسها اللي هتستخدمها.`,
            mistakes: R`تكتبها كسطر لوحدها بدل [[=]] (ممنوعة من غير أقواس). وتنسى الأقواس فتحط نتيجة المقارنة في المتغير. وتكتبها في Python أقدم من 3.8.`
          },
          lines: [
            R`list.`,
            R`احسب الطول، خزّنه في n، وقارنه بـ 5، كله مرة واحدة.`,
            R`استخدم n جوه البلوك.`,
            R`اقرا input وخزّنه في cmd وقارنه بـ quit في كل لفة.`,
            R`استخدم cmd.`,
            R`احسب المربع مرة واحدة واستخدمه في الشرط والناتج: [[[16, 25, 36]]].`
          ],
          sol: R`[[print(x := 5)]] ← [[5]]، و [[print(x)]] ← [[5]] (المتغير اتعمل). و [[x := 5]] لوحدها ← [[SyntaxError: invalid syntax]].`
        },
        {
          cmd: "is  و  ==",
          title: "is ضد == في Python: == بتقارن القيمة، و is بتسأل «هل دول نفس الحاجة في الذاكرة»",
          desc: R`[[a == b]] معناها القيمتين متساويتين. [[a is b]] معناها الاتنين بيشاوروا على نفس الـ object بالظبط. فـ [[[1, 2] == [1, 2]]] بـ True، لكن [[[1, 2] is [1, 2]]] بـ False لأنهم listتين مختلفتين.

القاعدة: استخدم [[is]] مع [[None]] بس (و True و False لو لازم): [[if x is None:]]. وكل المقارنات التانية [[==]]. و [[is not]] و [[!=]] عكسهم.

ده نفس فرق [[===]] مع الـ objects في JS: [[[1] === [1]]] بـ false لأنها مقارنة مراجع. وفي Java [[==]] بين objects (حتى String) بتقارن المرجع، والقيمة بـ [[.equals()]]. وفي Kotlin [[==]] قيمة و [[===]] مرجع.`,
          example: R`a = [1, 2]
b = a
c = [1, 2]
print(a == c, a is c, a is b)
x = None
if x is None:
    print("فاضي")`,
          flag: "script",
          try: R`في [[python3]]: [[a = [1]; b = a; b.append(2); print(a)]]. بعدين [[c = a.copy(); print(c == a, c is a)]].`,
          deep: {
            why: R`[[is]] مع أرقام أو نصوص ممكن تشتغل صدفة وبعدين تبوظ في حالة تانية، والـ bug ده صعب تلاقيه. وفهم «نفس الـ object» ضروري عشان تفهم ليه تعديل list في مكان بيغيّرها في مكان تاني.`,
            how: R`[[is]] بتقارن [[id()]] (عنوان الـ object). [[==]] بتنادي [[__eq__]] اللي الكلاس بيعرّفها. Python بيعيد استخدام objects للأرقام الصغيرة (-5 لـ 256) وبعض النصوص، عشان كده [[is]] بتشتغل معاهم ساعات صدفة.`,
            when: R`[[is None]] و [[is not None]] دايمًا. و [[==]] لكل حاجة تانية.`,
            mistakes: R`[[if x == None]] شغالة بس مش العرف. و [[if name is "Ali"]] بتشتغل ساعات ومبتشتغلش ساعات (و Python بيطلّع SyntaxWarning). وتفتكر [[b = a]] بتعمل نسخة.`
          },
          lines: [
            R`list.`,
            R`b مش نسخة: نفس الـ list.`,
            R`list تانية بنفس القيم.`,
            R`[[True False True]].`,
            R`None.`,
            R`المقارنة الصح مع None.`,
            R`[[فاضي]].`
          ],
          sol: R`[[print(a)]] ← [[[1, 2]]] لأن a و b نفس الـ list. [[c == a, c is a]] ← [[True False]].`
        }
      ]
    },
    {
      t: "JSON و Regex",
      l: 2,
      n: "رموز JSON اللي بتنقل الداتا بين أي برنامجين، ورموز الـ regex اللي بتدوّر وتتأكد من شكل النصوص",
      items: [
        {
          cmd: "{ \"key\": value }",
          title: "رموز JSON: { } object و [ ] array و \"\" لكل مفتاح ونص و : بين المفتاح والقيمة و , بين العناصر",
          desc: R`JSON هو الشكل اللي الـ APIs و [[package.json]] وملفات config كتير بيستخدموه. رموزه قليلة وصارمة: [[{ }]] object، و [[[ ]]] array، و [[:]] بين المفتاح والقيمة، و [[,]] بين العناصر، و [[""]] حوالين كل مفتاح وكل نص.

القيم المسموحة بس: نص [["..."]]، ورقم، و [[true]] و [[false]]، و [[null]]، و object، و array.

وده أشبه بـ object في JS بس أصرم: لازم [[""]] (مش [['']]) حوالين المفاتيح، وممنوع فصلة بعد آخر عنصر، وممنوع تعليقات، ومفيش [[undefined]] ولا دوال. [[JSON.stringify]] بتحوّل من JS لـ JSON، و [[JSON.parse]] العكس، وفي Python [[json.dumps]] و [[json.loads]].`,
          example: R`{
  "name": "terminal-study",
  "version": "1.0.0",
  "private": true,
  "tags": ["bash", "js"],
  "author": { "name": "Ali", "url": null }
}`,
          flag: "script",
          try: R`في الـ Console: [[JSON.parse('{"a": 1}')]] و [[JSON.parse("{'a': 1}")]] و [[JSON.parse('{"a": 1,}')]] و [[JSON.stringify({ a: undefined, b: 1 })]].`,
          deep: {
            why: R`أي API هتكلمه بيرد JSON، وأي ملف config فيه غلطة رمز واحدة (فصلة زيادة) البرنامج كله مش هيقوم. ورسالة [[Unexpected token]] غالبًا بتبقى بسبب رمز.`,
            how: R`الـ parser بيقرا حرف حرف بقواعد ثابتة جدًا، أي حاجة برة القواعد بيرمي SyntaxError ومعاه مكان الغلط (position). عشان كده JSON أسهل في القراية لأي لغة من YAML.`,
            when: R`نقل داتا بين frontend و backend، وملفات config ([[package.json]] و [[tsconfig.json]])، وحفظ داتا بسيطة في [[localStorage]].`,
            mistakes: R`فصلة بعد آخر عنصر (JS بتسمح، JSON لأ). و [['...']] بدل [[""]]. وتعليق [[//]] في [[package.json]]. ملحوظة: [[tsconfig.json]] و [[.vscode/settings.json]] بيقبلوا تعليقات لأنهم JSONC مش JSON صافي. ورسالة [[Unexpected token < in JSON]] معناها السيرفر رجّع HTML (صفحة error) مش JSON.`
          },
          lines: [
            R`بداية object.`,
            R`مفتاح نصي بـ [[""]]، و [[:]]، وقيمة نص، و [[,]].`,
            R`نص تاني.`,
            R`boolean من غير تنصيص.`,
            R`array بـ [[[ ]]].`,
            R`object جوه object، و [[null]]. ومفيش فصلة بعده لأنه آخر عنصر.`,
            R`قفلة الـ object.`
          ],
          sol: R`الأول ← [[{ a: 1 }]]. التاني والتالت ← [[SyntaxError]] (تنصيص مفرد، وفصلة زيادة). والرابع ← [['{"b":1}']]: الـ undefined اتشالت خالص.`
        },
        {
          cmd: "^  $  .  *  +  ?",
          title: "رموز الـ regex الأساسية: ^ البداية و $ النهاية و . أي حرف و * و + و ? للتكرار",
          desc: R`الـ regex (regular expression) لغة صغيرة بتوصف شكل نص. في JS بيتكتب بين [[/.../]]. أهم الرموز: [[^]] بداية النص، و [[$]] نهايته، و [[.]] أي حرف واحد. وبعد أي حرف أو مجموعة: [[*]] صفر مرة أو أكتر، و [[+]] مرة أو أكتر، و [[?]] صفر أو مرة (يعني اختياري).

فـ [[/^ab+c$/]] معناها: يبدأ بـ a، وبعدها b مرة أو أكتر، وينتهي بـ c. و [[/colou?r/]] بتطابق color و colour.

ولو عايز الرمز نفسه حرفي حط قبله [[\]]: [[\.]] نقطة حقيقية، و [[\$]] دولار. خد بالك إن [[*]] و [[?]] هنا غير معناهم في globbing بتاع الشيل: هناك [[*]] لوحدها «أي حاجة»، هنا [[.*]].`,
          example: R`console.log(/^ab+c$/.test("abbbc"), /^ab+c$/.test("ac"));
console.log(/colou?r/.test("color"));
console.log("a.b.c".replace(/./g, "-"));
console.log("a.b.c".replace(/\./g, "-"));
console.log(/^https?:\/\//.test("http://x.com"));`,
          flag: "script",
          try: R`افتح [[https://regex101.com]] واختار JavaScript، واكتب [[^a.*z$]] وجرّب نصوص: [[az]] و [[abcz]] و [[abc]] و [[xaz]]. وبعدين حل التمرين.`,
          deep: {
            why: R`الـ regex في كل حتة: validation للإيميل والتليفون، و [[grep]] و [[sed]]، و search/replace في VS Code (زرار [[.*]])، والـ routes في الـ frameworks.`,
            how: R`الـ engine بيمشي على النص ويحاول يطابق الـ pattern من كل مكان. من غير [[^]] و [[$]] بيدوّر على النمط في أي حتة جوه النص، عشان كده validation من غيرهم بيقبل حاجات غلط. و [[*]] و [[+]] جشعين (greedy): بياخدوا أطول حاجة ممكنة.`,
            when: R`تتأكد من شكل input، أو تطلّع حاجات من نص (أرقام وتواريخ)، أو تبدّل. لكن متحللش HTML أو JSON بالـ regex، استخدم parser.`,
            mistakes: R`تنسى [[^]] و [[$]] في validation فـ [[/\d{4}/]] تقبل [[abc12345xyz]]. وتكتب [[.]] وانت قصدك نقطة حرفية. وتنسى flag [[g]] في replace فيتبدل أول واحد بس.`
          },
          lines: [
            R`[[true false]]: التانية مفيهاش b ولا مرة و [[+]] محتاجة مرة على الأقل.`,
            R`[[u?]]: الـ u اختيارية: [[true]].`,
            R`[[.]] أي حرف، فكله اتبدل: [[-----]].`,
            R`[[\.]] نقطة حرفية بس: [[a-b-c]].`,
            R`[[s?]] اختيارية، و [[\/]] شرطة حرفية: [[true]].`
          ],
          sol: R`[[az]] تطابق، و [[abcz]] تطابق، و [[abc]] لأ (مش منتهية بـ z)، و [[xaz]] لأ (مش بادئة بـ a).`,
          check: {
            lang: "js",
            starter: R`// اكتب isCode: نص بيبدأ بـ "EG-" وبعده رقم واحد أو أكتر وبس
// isCode("EG-1") و isCode("EG-2048") ← true
// isCode("EG-") و isCode("xEG-12") و isCode("EG-12a") ← false
function isCode(s) {
  return /EG-/.test(s);
}`,
            tests: R`test("isCode('EG-1') ← true", () => expect(isCode("EG-1")).toBe(true));
test("isCode('EG-2048') ← true", () => expect(isCode("EG-2048")).toBe(true));
test("isCode('EG-') ← false (محتاج رقم واحد على الأقل)", () => expect(isCode("EG-")).toBe(false));
test("isCode('xEG-12') ← false (لازم يبدأ بيها)", () => expect(isCode("xEG-12")).toBe(false));
test("isCode('EG-12a') ← false (لازم ينتهي بالأرقام)", () => expect(isCode("EG-12a")).toBe(false));`,
            solution: R`function isCode(s) {
  return /^EG-[0-9]+$/.test(s);
}`
          }
        },
        {
          cmd: "\\d  \\w  [ ]  ( )  {n}  |",
          title: "رموز الـ regex التانية: \\d رقم و \\w حرف و [ ] مجموعة و ( ) جروب و {n} عدد مرات و | يا ده يا ده",
          desc: R`[[\d]] أي رقم (0-9)، و [[\w]] حرف إنجليزي أو رقم أو [[_]]، و [[\s]] مسافة أو tab أو سطر جديد. والحروف الكبيرة عكسهم: [[\D]] أي حاجة مش رقم.

[[[abc]]] حرف واحد من دول، و [[[a-z0-9]]] مدى، و [[[^0-9]]] أي حاجة ماعدا دول. و [[{3}]] بالظبط ٣ مرات، و [[{2,4}]] من ٢ لـ ٤، و [[{2,}]] ٢ أو أكتر.

[[( )]] بتجمع حاجات مع بعض وبتمسك اللي جواها عشان تاخده بعدين، و [[|]] جوه الجروب معناها «أو»: [[/^(cat|dog)s?$/]]. ونفس الرموز دي تقريبًا في Python ([[re]]) و grep -E و Java و Go.`,
          example: R`const phone = /^01[0125]\d{8}$/;
console.log(phone.test("01012345678"), phone.test("0101234567"));
const m = "2026-10-01".match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(m[1], m[2]);
console.log("a1b22c333".match(/\d+/g));
console.log(/^(cat|dog)s?$/.test("dogs"));`,
          flag: "script",
          try: R`على [[regex101.com]] اكتب [[\b\w+@\w+\.\w+\b]] وجرّبه على سطر فيه إيميلين. وبعدين حل التمرين.`,
          deep: {
            why: R`أغلب الـ validation الحقيقي (تليفون ورقم قومي وكود بريدي) محتاج عدد مرات محدد ومجموعات. والـ groups بتخليك تطلّع أجزاء من نص (السنة من تاريخ مثلًا).`,
            how: R`[[\d]] اختصار لـ [[[0-9]]]. [[{n}]] بتتطبق على اللي قبلها على طول، فـ [[ab{2}]] يعني abb مش abab (لده [[(ab){2}]]). والـ groups بتترقم من الشمال بالـ [[(]]، و [[m[0]]] هو الـ match كله.`,
            when: R`validation بشكل ثابت، واستخراج أجزاء، و replace بـ [[$1]] في VS Code و JS: [["2026-10-01".replace(/(\d+)-(\d+)-(\d+)/, "$3/$2/$1")]].`,
            mistakes: R`في نص عادي (مش [[/.../]]) لازم backslash مزدوج: [[new RegExp("\\d+")]]. وفي Python استخدم [[r"\d+"]]. و [[[^...]]] جوه الأقواس معناها «ماعدا» مش «بداية». و [[\w]] مبتشملش الحروف العربي.`
          },
          lines: [
            R`موبايل مصري: 01، وبعدها 0 أو 1 أو 2 أو 5، وبعدها ٨ أرقام بالظبط.`,
            R`[[true false]]: التاني ناقص رقم.`,
            R`٣ groups للسنة والشهر واليوم.`,
            R`[[2026 10]].`,
            R`[[\d+]] مع [[g]]: كل مجموعات الأرقام: [[["1", "22", "333"]]].`,
            R`[[|]] جوه group، و [[s?]] للجمع: [[true]].`
          ],
          sol: R`النمط هيعلّم على الإيميلين، زي [[ali@mail.com]] و [[sara@site.org]]. ([[\b]] حدود كلمة، و [[\.]] نقطة حرفية.)`,
          check: {
            lang: "js",
            starter: R`// isPhone: رقم موبايل مصري: 11 رقم، بيبدأ بـ 010 أو 011 أو 012 أو 015
function isPhone(s) {
  return /01\d+/.test(s);
}`,
            tests: R`test("isPhone('01012345678') ← true", () => expect(isPhone("01012345678")).toBe(true));
test("isPhone('01512345678') ← true", () => expect(isPhone("01512345678")).toBe(true));
test("isPhone('0101234567') ← false (10 أرقام)", () => expect(isPhone("0101234567")).toBe(false));
test("isPhone('01312345678') ← false (013 مش موجودة)", () => expect(isPhone("01312345678")).toBe(false));
test("isPhone('010123456789') ← false (12 رقم)", () => expect(isPhone("010123456789")).toBe(false));
test("isPhone('x01012345678') ← false", () => expect(isPhone("x01012345678")).toBe(false));`,
            solution: R`function isPhone(s) {
  return /^01[0125]\d{8}$/.test(s);
}`
          }
        }
      ]
    },
    {
      t: "رموز C و C++",
      l: 3,
      n: "* و & للمؤشرات والـ references، و -> و :: و <<، و #include و ~ و <T>: رموز بتخوّف المبتدئ وهي بسيطة لو اتشرحت",
      items: [
        {
          cmd: "int *p  و  *p",
          title: "النجمة * في C و C++: في التعريف يعني «مؤشر» (pointer)، وقبل متغير موجود يعني «روح للعنوان وهات القيمة»",
          desc: R`المؤشر (pointer) متغير بيشيل عنوان مكان في الذاكرة بدل قيمة. [[int *p]] معناها p مؤشر لـ int. ولما تكتب [[*p]] بعد كده (من غير نوع قبلها) معناها «القيمة اللي في العنوان ده» (dereference). وتقدر تغيّرها: [[*p = 10]] بتغيّر المتغير الأصلي.

يعني نفس النجمة ليها معنيين حسب المكان: مع نوع في التعريف = نوع مؤشر، ومن غير نوع = ادخل للقيمة. ومعنى تالت بين رقمين = ضرب.

المؤشر الفاضي في C++ [[nullptr]] وفي C [[NULL]]، ولو عملت [[*p]] على مؤشر فاضي البرنامج بيقع بـ [[Segmentation fault]].`,
          example: R`#include <stdio.h>
int main(void) {
    int x = 5;
    int *p = &x;
    *p = 10;
    printf("%d %d\n", x, *p);
    return 0;
}`,
          flag: "script",
          try: R`على [[onlinegdb.com]] أو [[godbolt.org]] (أو بـ [[gcc a.c && ./a.out]] لو عندك gcc) شغّل المثال. بعدين ضيف سطر [[printf("%p\n", (void *)p);]] عشان تشوف العنوان نفسه.`,
          deep: {
            why: R`C و C++ بيتعاملوا مع الذاكرة مباشرة، والمؤشرات هي الطريقة اللي دالة تعدّل بيها متغير من برة، وتتعامل مع arrays ونصوص و memory بتتحجز وقت التشغيل.`,
            how: R`كل متغير له مكان في الذاكرة ليه عنوان (رقم). [[&x]] بتجيب العنوان، والمؤشر بيشيله، و [[*p]] بتقرا أو تكتب في المكان ده. ونوع المؤشر ([[int *]]) بيقول للـ compiler كام byte يقرا من هناك.`,
            when: R`في C: تمرير متغيرات لدوال عشان تتعدل، والـ arrays والنصوص، و [[malloc]]. في C++ الحديث استخدم references و [[std::unique_ptr]] بدل المؤشرات الخام أغلب الوقت.`,
            mistakes: R`[[int* a, b;]] بتعمل a مؤشر و b int عادي (النجمة لازقة في الاسم مش النوع). ومؤشر من غير قيمة أولية بيشاور على عنوان عشوائي. وترجّع عنوان متغير محلي من دالة فيبقى مؤشر لحاجة ماتت.`
          },
          lines: [
            R`مكتبة الطباعة [[printf]].`,
            R`الدالة الرئيسية.`,
            R`متغير عادي قيمته 5.`,
            R`[[int *]] نوع «مؤشر لـ int»، وبيشيل عنوان x اللي [[&]] جابته.`,
            R`[[*p]] من غير نوع: روح للعنوان واكتب 10، فـ x نفسها بقت 10.`,
            R`اطبع: [[10 10]].`,
            R`0 يعني البرنامج خلص بنجاح.`,
            R`قفلة main.`
          ],
          sol: R`الناتج [[10 10]]. وسطر [[%p]] بيطبع عنوان زي [[0x7ffd5e8c3a4c]] (بيتغير كل مرة).`
        },
        {
          cmd: "&x  و  int &r",
          title: "علامة & في C و C++: قبل متغير تجيب عنوانه، وفي تعريف C++ بعد النوع يعني reference (اسم تاني لنفس المتغير)",
          desc: R`[[&x]] (address-of) بترجّع عنوان x في الذاكرة، ودي اللي بتحطها في مؤشر: [[int *p = &x]]. وفي C بتشوفها في [[scanf("%d", &age)]] عشان scanf تكتب في age.

في C++ بس، [[int &r = x]] (مع النوع في التعريف) معناها r مش متغير جديد، دي اسم تاني (reference) لـ x نفسها. أي تغيير في r بيغيّر x. وأشهر استخدام: parameters الدوال [[void inc(int &n)]] عشان الدالة تعدّل المتغير الأصلي، و [[const std::string &s]] عشان متتعملش نسخة.

ومعاني تانية لنفس الرمز: [[a & b]] bitwise AND، و [[&&]] منطق. وفي C++ الحديث [[T&&]] بعد نوع اسمها rvalue reference، ودي موضوع متقدم (move semantics).`,
          example: R`#include <iostream>
void inc(int &n) { n++; }
int main() {
    int x = 5;
    int &r = x;
    r = 7;
    inc(x);
    std::cout << x << " " << &x << "\n";
}`,
          flag: "script",
          try: R`شغّل المثال على [[godbolt.org]] أو [[onlinegdb.com]] (اختار C++). بعدين شيل [[&]] من [[int &n]] في inc وشغّل تاني وقارن الرقم.`,
          deep: {
            why: R`من غير [[&]] الدوال في C و C++ بتاخد نسخة، فأي تعديل جوه الدالة بيضيع. والنسخ لـ objects كبيرة (vector فيه مليون عنصر) بطيء جدًا.`,
            how: R`الـ reference لازم تتربط بمتغير وقت تعريفها ومش بتتغير بعد كده، ومفيش reference فاضية. الـ compiler غالبًا بيطبقها كمؤشر من جوه، بس انت بتستخدمها كأنها المتغير نفسه من غير [[*]].`,
            when: R`[[const T&]] لأي parameter كبير مش هتعدّله. [[T&]] لما الدالة لازم تعدّل. و [[&x]] لما محتاج مؤشر صراحة (APIs بتاعة C).`,
            mistakes: R`تخلط بين [[&]] في التعريف (reference) و [[&]] في الاستخدام (عنوان). وترجّع reference لمتغير محلي من دالة. وتنسى [[&]] في [[scanf]] فالبرنامج يقع.`
          },
          lines: [
            R`مكتبة cout.`,
            R`[[int &n]]: reference، فـ [[n++]] بتزوّد المتغير الأصلي.`,
            R`main.`,
            R`x بـ 5.`,
            R`r اسم تاني لـ x، مش نسخة.`,
            R`تغيير r غيّر x: بقت 7.`,
            R`inc زوّدت x الأصلية: بقت 8.`,
            R`اطبع x (8) وعنوانها بـ [[&x]].`,
            R`قفلة main.`
          ],
          sol: R`الناتج [[8]] وبعده عنوان زي [[0x7ffc...]]. من غير [[&]] في inc الدالة بتاخد نسخة، فالناتج يبقى [[7]].`
        },
        {
          cmd: "p->name",
          title: "السهم -> في C و C++: ادخل لخانة جوه struct أو object من خلال مؤشر",
          desc: R`لو عندك struct عادي بتكتب [[user.name]] بالنقطة. لو عندك مؤشر للـ struct بتكتب [[p->name]]. السهم ده اختصار لـ [[(*p).name]]: روح للعنوان، وبعدين خد الخانة.

في C++ نفس الحكاية مع الكلاسات والـ smart pointers: [[ptr->greet()]]، و [[this->name]] جوه الـ methods (this مؤشر للـ object الحالي).

والسهم ده غير [[->]] في PHP (بيعمل نفس الوظيفة تقريبًا: يدخل جوه object)، وغير [[->]] في Python و Rust و Swift (نوع الراجع)، وغير [[->]] في Java و Kotlin (lambda). نفس الرمز، معاني كتير.`,
          example: R`struct User { char name[20]; int age; };
struct User u = { "Ali", 20 };
struct User *p = &u;
printf("%s\n", u.name);
printf("%d\n", p->age);
p->age = 21;`,
          flag: "script",
          try: R`على [[onlinegdb.com]] حط السطور دي جوه main (مع [[#include <stdio.h>]] فوق). بعدين جرّب [[p.age]] بالنقطة واقرا الـ error.`,
          deep: {
            why: R`أي كود C فيه structs بيتعامل بالمؤشرات (linked lists، trees، أي داتا بتتحجز بـ malloc). من غير ما تفهم السهم مش هتقرا أي كود فيه.`,
            how: R`[[p->x]] الـ compiler بيترجمها لـ [[(*p).x]]. الأقواس مهمة لأن [[*p.x]] معناها [[*(p.x)]] (النقطة أولويتها أعلى)، عشان كده عملوا السهم.`,
            when: R`النقطة مع المتغير نفسه، والسهم مع المؤشر. وفي C++ مع [[std::unique_ptr]] و [[std::shared_ptr]] و iterators.`,
            mistakes: R`[[p.age]] مع مؤشر: [[error: request for member 'age' in something not a structure or union]] (أو رسالة شبهها). و [[u->age]] مع struct مش مؤشر. و [[p->]] على مؤشر NULL فيقع.`
          },
          lines: [
            R`struct فيه اسم وعمر.`,
            R`متغير struct.`,
            R`مؤشر بيشيل عنوان u.`,
            R`مع المتغير نفسه: نقطة.`,
            R`مع المؤشر: سهم، نفس [[(*p).age]].`,
            R`تعديل من خلال المؤشر بيغيّر u الأصلي.`
          ],
          sol: R`هيطبع [[Ali]] ثم [[20]]. و [[p.age]] بيطلع compile error لأن p مؤشر مش struct، و gcc ساعات بيقترح عليك [[->]] بنفسه.`
        },
        {
          cmd: "std::cout",
          title: "النقطتين المزدوجة :: في C++: «اللي جوه»، namespace أو class، زي std::cout",
          desc: R`[[::]] (scope resolution) معناها «الحاجة دي اللي جوه ده». [[std::cout]] يعني cout اللي جوه namespace اسمه std (المكتبة القياسية). و [[std::vector<int>]] و [[std::string]] نفس الفكرة.

ومع الكلاسات: [[User::count]] خانة static في الكلاس، و [[void User::greet() {...}]] تعريف method برة الكلاس (غالبًا في ملف [[.cpp]] منفصل عن [[.h]]).

[[using namespace std;]] بتخليك تكتب [[cout]] من غير [[std::]]، بس متحطهاش في ملفات [[.h]] عشان بتتنقل لكل ملف بيعمل include. ونفس الرمز [[::]] في PHP و Rust بنفس الفكرة تقريبًا، وفي Java و Kotlin معناه method reference (درس تاني).`,
          example: R`#include <iostream>
#include <string>
class User {
public:
    static int count;
    void greet();
};
int User::count = 0;
void User::greet() { std::cout << "hi\n"; }`,
          flag: "script",
          try: R`اكتب برنامج صغير فيه [[cout << "hi";]] من غير [[std::]] ومن غير using، واقرا الـ error. بعدين صلّحه مرة بـ [[std::]] ومرة بـ [[using namespace std;]].`,
          deep: {
            why: R`الـ namespaces بتمنع تصادم الأسماء: مكتبتين فيهم دالة اسمها [[sort]] مش هيتخانقوا. وكل كود C++ بتقراه مليان [[std::]].`,
            how: R`الـ compiler بيدوّر على الاسم جوه الـ scope اللي قبل [[::]] بس. و [[::name]] لوحدها في الأول معناها الـ global scope.`,
            when: R`[[std::]] في أي حاجة من المكتبة القياسية. و [[Class::]] لتعريف الـ methods برة الكلاس وللخانات الـ static.`,
            mistakes: R`تنسى [[std::]] فيطلع [[error: 'cout' was not declared in this scope]] (و gcc بيقولك [[did you mean 'std::cout'?]]). وتكتب [[using namespace std;]] في header. وتكتب [[std.cout]] بالنقطة.`
          },
          lines: [
            R`مكتبة الدخل والخرج.`,
            R`مكتبة النصوص.`,
            R`كلاس.`,
            R`الحاجات اللي بعدها عامة.`,
            R`خانة static: واحدة للكلاس كله.`,
            R`تعريف الـ method من غير جسم.`,
            R`قفلة الكلاس.`,
            R`[[User::count]]: إعطاء قيمة للخانة الـ static برة الكلاس.`,
            R`[[User::greet]]: جسم الـ method برة الكلاس، و [[std::cout]] جواها.`
          ],
          sol: R`من غير [[std::]] هيطلع [[error: 'cout' was not declared in this scope]] ومعاه اقتراح [[std::cout]]. وبأي واحد من الحلين البرنامج هيطبع [[hi]].`
        },
        {
          cmd: "#include <>  و  \"\"",
          title: "الـ #include في C و C++: <file> من مكتبات النظام، و \"file\" من ملفات مشروعك الأول",
          desc: R`[[#include]] بتنسخ محتوى ملف header جوه ملفك قبل الـ compile. [[#include <stdio.h>]] بالأقواس الزاوية معناها «دوّر في فولدرات مكتبات النظام والـ compiler». [[#include "user.h"]] بعلامات التنصيص معناها «دوّر جنب الملف ده الأول، ولو ملقتش دوّر في مكتبات النظام».

العرف: [[<>]] للمكتبة القياسية والمكتبات المتسطّبة، و [[""]] لملفاتك انت.

والـ [[#]] هنا مش تعليق: كل سطر بادئ بـ [[#]] في C و C++ أمر للـ preprocessor، زي [[#define]] و [[#ifndef]] و [[#pragma once]]. وفي C++ مكتبات C بتتكتب من غير [[.h]] وبـ c في الأول: [[<cstdio>]].`,
          example: R`#include <stdio.h>
#include <vector>
#include "user.h"
#define MAX 100
#pragma once`,
          flag: "script",
          try: R`اعمل ملف [[user.h]] فيه [[int add(int a, int b);]] وملف [[main.c]] فيه [[#include <user.h>]]. لو عندك gcc اعمل [[gcc -c main.c]] واقرا الـ error، وبعدين غيّرها لـ [["user.h"]].`,
          deep: {
            why: R`مشروع C أو C++ متقسم لملفات، والـ headers هي اللي بتعرّف كل ملف باللي في التاني. والخلط بين النوعين بيطلع [[No such file or directory]].`,
            how: R`الـ preprocessor بيشتغل قبل الـ compiler ويبدّل سطر الـ include بمحتوى الملف حرفيًا. مسارات البحث تقدر تزوّدها بـ [[-I]] للـ compiler، وفي CMake بـ [[target_include_directories]].`,
            when: R`[[<>]] لـ [[<iostream>]] و [[<vector>]] و [[<QWidget>]]. [[""]] لـ headers مشروعك. و [[#pragma once]] أو include guards في أول كل header عشان ميتنسخش مرتين.`,
            mistakes: R`[[#include <user.h>]] لملفك فميتلقاش. وتعمل include لملف [[.c]] أو [[.cpp]] بدل [[.h]]. وتنسى include guard فيطلع [[redefinition]]. وتحط [[;]] في آخر سطر [[#include]] أو [[#define]].`
          },
          lines: [
            R`header من مكتبة C القياسية.`,
            R`header من مكتبة C++ القياسية (من غير [[.h]]).`,
            R`header من مشروعك، بيتدوّر عليه جنب الملف الأول.`,
            R`[[#define]]: الـ preprocessor بيبدّل كل MAX بـ 100 قبل الـ compile.`,
            R`[[#pragma once]] في أول header: متنسخنيش أكتر من مرة.`
          ],
          sol: R`مع [[<user.h>]] ← [[fatal error: user.h: No such file or directory]] لأن gcc مدوّرش جنب الملف. مع [["user.h"]] الـ compile بيعدّي.`
        },
        {
          cmd: "cout <<  و  cin >>",
          title: "الـ << و >> مع cout و cin في C++: « ابعت للشاشة » و « اقرا من الكيبورد »، وأصلهم shift",
          desc: R`في C++ [[std::cout << "Hi" << name]] معناها «ابعت Hi وبعدها name للشاشة»، والسهم بيشاور ناحية cout يعني البيانات رايحة لها. و [[std::cin >> age]] معناها «اقرا من الكيبورد وحطه في age»، والسهم رايح ناحية المتغير.

الرمزين أصلًا bit shift ([[1 << 3]] بـ 8)، بس C++ عاملهم overload مع الـ streams. وتقدر تسلسلهم لأن كل [[<<]] بترجّع cout تاني.

[[std::endl]] سطر جديد ومعاه flush (بطيء شوية)، و [[\n]] سطر جديد بس. و [[cin >> name]] بتقف عند أول مسافة، فلو عايز سطر كامل [[std::getline(std::cin, name)]].`,
          example: R`#include <iostream>
#include <string>
int main() {
    std::string name;
    int age;
    std::cout << "اسمك؟ ";
    std::cin >> name >> age;
    std::cout << "أهلًا " << name << "، عندك " << age << "\n";
}`,
          flag: "script",
          try: R`شغّل المثال على [[onlinegdb.com]] واكتب [[Ali 20]]. بعدين اكتب [[Ali Hassan 20]] ولاحظ إن الـ age باظت، وفكّر ليه.`,
          deep: {
            why: R`أول برنامج C++ هتكتبه فيه cout و cin، وكل مسائل الـ competitive programming بتقرا بـ cin.`,
            how: R`[[operator<<]] متعرّفة لكل نوع أساسي، فـ cout بتعرف تطبع int و string. و [[>>]] بتتخطى المسافات وتقرا لحد المسافة الجاية، وبتحوّل للنوع المطلوب. ولو فشلت (حرف في مكان رقم) بتحط cin في حالة fail.`,
            when: R`برامج الترمنال والتمارين. في المشاريع الكبيرة غالبًا بتستخدم مكتبة logging أو [[std::format]] و [[std::print]] في C++ الأحدث.`,
            mistakes: R`تعكس الأسهم: [[cin << x]] أو [[cout >> x]]. وتستخدم [[cin >> name]] لاسم فيه مسافة. وتخلط [[cin >>]] مع [[getline]] فالـ getline تقرا السطر الفاضي اللي فاضل (حل: [[std::cin.ignore()]]).`
          },
          lines: [
            R`مكتبة cout و cin.`,
            R`مكتبة string.`,
            R`main.`,
            R`متغير نص.`,
            R`متغير رقم.`,
            R`[[<<]]: النص رايح للشاشة.`,
            R`[[>>]]: اقرا كلمة في name ورقم في age.`,
            R`سلسلة [[<<]] بتطبع كذا حاجة ورا بعض.`,
            R`قفلة main.`
          ],
          sol: R`مع [[Ali 20]] ← [[أهلًا Ali، عندك 20]]. مع [[Ali Hassan 20]] الـ name بقت Ali بس، والـ cin حاول يقرا Hassan كرقم ففشل، والـ age بقت 0.`
        },
        {
          cmd: "~ClassName()",
          title: "الـ tilde ~ قبل اسم الكلاس في C++: الـ destructor، الدالة اللي بتشتغل لوحدها لما الـ object يموت",
          desc: R`في C++ الدالة اللي اسمها نفس اسم الكلاس هي الـ constructor (بتشتغل وقت الإنشاء)، ونفس الاسم وقبله [[~]] هو الـ destructor: بيشتغل لوحده لما الـ object يخرج من الـ scope أو يتمسح بـ [[delete]].

وظيفته ينضّف: يقفل ملف، يرجّع ذاكرة، يفك lock. والفكرة دي اسمها RAII: الحاجة بتتحجز في الـ constructor وتترجع في الـ destructor، فمفيش حاجة تتنسي.

نفس الرمز [[~]] برة الكلاسات معناه bitwise NOT ([[~5]] بـ -6). وفي لينكس [[~]] الـ home. وفي C# [[~ClassName()]] اسمها finalizer وبيشغّلها الـ garbage collector في وقت مش معروف.`,
          example: R`#include <iostream>
class File {
public:
    File()  { std::cout << "open\n"; }
    ~File() { std::cout << "close\n"; }
};
int main() {
    { File f; std::cout << "using\n"; }
    std::cout << "after\n";
}`,
          flag: "script",
          try: R`شغّل المثال على [[onlinegdb.com]] وتوقّع ترتيب السطور الأربعة قبل ما تشوف الناتج.`,
          deep: {
            why: R`ده أهم فكرة في C++: الموارد بتتنضف لوحدها بشكل مضمون، حتى لو حصل exception. وعليها مبنيين [[std::vector]] و [[std::unique_ptr]] و [[std::lock_guard]].`,
            how: R`الـ compiler بيحط نداء الـ destructor أوتوماتيك عند قفلة [[}]] للـ scope اللي فيه الـ object، بالعكس من ترتيب الإنشاء. للـ objects اللي اتعملت بـ [[new]] لازم [[delete]]، وعشان كده الأحسن smart pointers.`,
            when: R`أي كلاس ماسك مورد (ملف، socket، ذاكرة). ولو الكلاس هيتورث منه ومعاك مؤشرات للأب، خلّي الـ destructor [[virtual]].`,
            mistakes: R`تنادي الـ destructor بإيدك. وتنسى [[virtual]] في كلاس أب فـ destructor الابن ميشتغلش. وتستخدم [[new]] من غير [[delete]] فيحصل memory leak.`
          },
          lines: [
            R`مكتبة cout.`,
            R`كلاس.`,
            R`عام.`,
            R`constructor: نفس اسم الكلاس.`,
            R`destructor: [[~]] قبل الاسم.`,
            R`قفلة الكلاس.`,
            R`main.`,
            R`بلوك: f بيتعمل جواه وبيموت عند [[}]].`,
            R`بعد البلوك.`,
            R`قفلة main.`
          ],
          sol: R`الترتيب: [[open]] ثم [[using]] ثم [[close]] (عند قفلة البلوك) ثم [[after]].`
        },
        {
          cmd: "template <typename T>",
          title: "الأقواس الزاوية < > في C++: templates، كود واحد بيشتغل مع أي نوع، زي vector<int>",
          desc: R`[[std::vector<int>]] معناها vector من الأرقام، و [[std::map<std::string, int>]] مفاتيحه نصوص وقيمه أرقام. الـ [[<>]] بعد اسم بتاخد نوع.

وتكتب بنفسك: [[template <typename T> T maxOf(T a, T b)]]: دالة واحدة الـ compiler بيعمل منها نسخة لكل نوع بتستخدمه بيه. ده المقابل لـ generics في TypeScript و Java.

و [[<>]] في C++ كمان في [[#include <...>]] و [[static_cast<int>(x)]] (تحويل نوع)، وبين رقمين [[<]] و [[>]] مقارنة. وفي C++ قديم (قبل 11) [[vector<vector<int>>]] كانت error لأن [[>>]] اتفهمت shift، فكانوا بيكتبوا [[> >]] بمسافة.`,
          example: R`#include <vector>
#include <map>
template <typename T>
T maxOf(T a, T b) { return a > b ? a : b; }
std::vector<int> nums = {3, 1, 2};
std::map<std::string, int> ages;
double d = static_cast<double>(7) / 2;`,
          flag: "script",
          try: R`على [[godbolt.org]] اكتب دالة [[maxOf]] ونادي [[maxOf(3, 7)]] و [[maxOf(2.5, 1.5)]]. بعدين جرّب [[maxOf(3, 2.5)]] واقرا الـ error.`,
          deep: {
            why: R`كل المكتبة القياسية (STL) templates. ولو مش فاهمها مش هتفهم رسايل الـ errors الطويلة اللي C++ مشهورة بيها.`,
            how: R`وقت الـ compile، كل مرة تستخدم template بنوع جديد الـ compiler بيولّد نسخة كاملة للنوع ده (instantiation). عشان كده كود الـ templates لازم يبقى في الـ header.`,
            when: R`استخدامها كل يوم مع containers. كتابتها لما عندك دالة أو كلاس منطقه واحد لأنواع مختلفة.`,
            mistakes: R`[[maxOf(3, 2.5)]]: T مش عارف يبقى int ولا double فيطلع [[no matching function]]، حدّد [[maxOf<double>(3, 2.5)]]. وتحط تعريف الـ template في [[.cpp]] فيطلع linker error.`
          },
          lines: [
            R`مكتبة vector.`,
            R`مكتبة map.`,
            R`T نوع هيتحدد وقت النداء.`,
            R`دالة بتشتغل مع أي نوع فيه [[>]].`,
            R`vector من الأرقام.`,
            R`map من نص لرقم.`,
            R`[[static_cast<double>]] تحويل نوع، فالقسمة بقت عشري: 3.5.`
          ],
          sol: R`[[maxOf(3, 7)]] ← [[7]]. [[maxOf(2.5, 1.5)]] ← [[2.5]]. [[maxOf(3, 2.5)]] ← error فيه [[deduced conflicting types for parameter 'T' ('int' and 'double')]].`
        }
      ]
    },
    {
      t: "رموز Go",
      l: 3,
      n: ":= و <- و _ و * و & و ... : رموز Go القليلة اللي بتفرق عن باقي اللغات",
      items: [
        {
          cmd: ":= في Go",
          title: "النقطتين ويساوي := في Go: عرّف متغير جديد وحط فيه قيمة، والنوع بيتعرف لوحده",
          desc: R`في Go [[name := "Ali"]] بتعمل متغير جديد اسمه name، ونوعه string من القيمة. ده اختصار [[var name string = "Ali"]].

و [[=]] لوحدها بتغيّر متغير موجود. فـ [[:=]] أول مرة، و [[=]] بعد كده. ولو كتبت [[:=]] لمتغير موجود في نفس الـ scope: [[no new variables on left side of :=]]. استثناء: لو على الشمال متغير واحد على الأقل جديد، زي [[result, err := f()]] و [[err]] موجودة قبل كده، مسموح.

[[:=]] جوه الدوال بس. برة الدوال (package level) لازم [[var]]. ونفس الرمز في Python (walrus) معناه مختلف شوية.`,
          example: R`package main
import "fmt"
func main() {
    name := "Ali"
    age := 20
    age = 21
    n, err := fmt.Println(name, age)
    fmt.Println(n, err)
}`,
          flag: "script",
          try: R`على [[go.dev/play]] شغّل المثال. بعدين غيّر [[age = 21]] لـ [[age := 21]] واقرا الـ error. بعدين ضيف متغير [[x := 1]] ومتستخدموش.`,
          deep: {
            why: R`أكتر سطر هتكتبه في Go. والفرق بين [[:=]] و [[=]] أول حاجة الـ compiler هيزعقلك عليها.`,
            how: R`الـ compiler بيستنتج النوع من اليمين. وجوه بلوك جديد (if أو for) [[:=]] بتعمل متغير جديد بنفس الاسم يغطي على اللي برة (shadowing)، ودي مصدر bugs.`,
            when: R`[[:=]] لأغلب المتغيرات جوه الدوال. [[var x int]] لما عايز القيمة الصفرية من غير قيمة أولية، أو على مستوى الـ package.`,
            mistakes: R`[[:=]] تاني لنفس المتغير. و [[err :=]] جوه if فتعمل err جديدة والبرة متتغيرش. ومتغير متعرّف ومش مستخدم: Go بيرفض يعمل compile ([[declared and not used]]).`
          },
          lines: [
            R`كل ملف Go بيبدأ بالـ package.`,
            R`مكتبة الطباعة.`,
            R`الدالة الرئيسية.`,
            R`متغير جديد نوعه string.`,
            R`متغير جديد نوعه int.`,
            R`[[=]]: تغيير متغير موجود.`,
            R`[[:=]] مع متغيرين جداد: عدد الـ bytes والـ error.`,
            R`اطبعهم.`,
            R`قفلة main.`
          ],
          sol: R`الناتج [[Ali 21]] ثم [[7 <nil>]]. مع [[age := 21]] ← [[no new variables on left side of :=]]. ومع متغير مش مستخدم ← [[declared and not used: x]].`
        },
        {
          cmd: "<-",
          title: "السهم الشمال <- في Go: ابعت قيمة في channel أو استلم منها",
          desc: R`الـ channel في Go ماسورة بتنقل قيم بين goroutines (حاجات شغالة بالتوازي). السهم [[<-]] دايمًا بيشاور على اتجاه الداتا: [[ch <- 5]] ابعت 5 جوه الـ channel، و [[x := <-ch]] استلم قيمة منها وحطها في x.

الاستلام بيستنى (block) لحد ما حد يبعت، والإرسال في channel من غير buffer بيستنى لحد ما حد يستلم. و [[v, ok := <-ch]] الـ ok بـ false لو الـ channel اتقفلت.

وفي الأنواع: [[chan<- int]] channel للإرسال بس، و [[<-chan int]] للاستلام بس. ومع [[select]] تستنى على أكتر من channel.`,
          example: R`package main
import "fmt"
func main() {
    ch := make(chan string)
    go func() { ch <- "done" }()
    msg := <-ch
    fmt.Println(msg)
}`,
          flag: "script",
          try: R`على [[go.dev/play]] شغّل المثال. بعدين امسح كلمة [[go]] من السطر الخامس وشغّل تاني واقرا الـ error.`,
          deep: {
            why: R`الـ concurrency في Go مبني على goroutines و channels، وده سبب انتشار Go في السيرفرات. ومن غير ما تفهم [[<-]] مش هتقرا أي كود concurrent.`,
            how: R`الـ channel من غير buffer بتعمل لقاء: المرسل والمستقبل لازم يتقابلوا. [[make(chan int, 10)]] بتعمل buffer يشيل 10 قبل ما الإرسال يستنى. و [[close(ch)]] بتقول مفيش قيم تاني، و [[for v := range ch]] بتقرا لحد ما تتقفل.`,
            when: R`تبعت نتايج من workers، أو تستنى حاجة تخلص، أو تعمل timeout مع [[select]] و [[time.After]].`,
            mistakes: R`ترسل في channel من غير ما حد يستلم في main فيطلع [[fatal error: all goroutines are asleep - deadlock!]]. وتبعت في channel مقفولة فيحصل panic. وتعكس السهم.`
          },
          lines: [
            R`package.`,
            R`fmt.`,
            R`main.`,
            R`channel بتنقل نصوص.`,
            R`goroutine بتبعت [["done"]] في الـ channel.`,
            R`main بتستنى لحد ما توصل قيمة وتحطها في msg.`,
            R`[[done]].`,
            R`قفلة main.`
          ],
          sol: R`الناتج [[done]]. من غير [[go]] الإرسال بيحصل في main نفسها ومفيش حد يستلم، فـ [[fatal error: all goroutines are asleep - deadlock!]].`
        },
        {
          cmd: "_ في Go",
          title: "الشرطة التحتية _ في Go: الـ blank identifier، مكان ترمي فيه قيمة مش محتاجها",
          desc: R`Go بيرفض يعمل compile لو فيه متغير متعرّف ومش مستخدم. فلو دالة بترجّع قيمتين وانت محتاج واحدة، حط [[_]] مكان التانية: [[_, err := strconv.Atoi("5")]].

أشهر مكان: الـ loops. [[for _, v := range items]] معناها «مش محتاج الـ index، عايز القيمة بس». و [[for i := range items]] لو عايز الـ index بس.

و [[import _ "github.com/lib/pq"]] معناها «حمّل المكتبة عشان تسجّل نفسها، بس مش هستخدم منها أسماء». ونفس الفكرة في Python ([[for _ in range(3)]]) و Rust و JS destructuring ([[const [, b] = arr]]).`,
          example: R`package main
import ("fmt"; "strconv")
func main() {
    n, _ := strconv.Atoi("42")
    for _, v := range []string{"a", "b"} {
        fmt.Println(v)
    }
    fmt.Println(n)
}`,
          flag: "script",
          try: R`على [[go.dev/play]] غيّر [[for _, v]] لـ [[for i, v]] من غير ما تستخدم i، واقرا الـ error.`,
          deep: {
            why: R`Go صارم في المتغيرات اللي مش مستخدمة عشان الكود يفضل نضيف. و [[_]] هي الطريقة الرسمية تقول «عارف إن فيه قيمة، ومش عايزها».`,
            how: R`[[_]] مش متغير حقيقي: مينفعش تقرا منه، وأي حاجة تتكتب فيه بتترمي. فينفع تستخدمه أكتر من مرة في نفس السطر.`,
            when: R`قيم راجعة مش محتاجها، و index مش محتاجه، و imports للـ side effects.`,
            mistakes: R`ترمي الـ error بـ [[_]] عشان تخلص بسرعة: [[n, _ := strconv.Atoi(s)]] لو s مش رقم n هتبقى 0 ومحدش هيعرف. تجاهل الـ errors في Go أسوأ عادة. وتحاول تقرا من [[_]].`
          },
          lines: [
            R`package.`,
            R`استيراد مكتبتين في سطر.`,
            R`main.`,
            R`[[Atoi]] بترجّع الرقم و error، والـ error اترمت في [[_]].`,
            R`الـ index اترمى، و v هي القيمة.`,
            R`اطبع القيمة.`,
            R`قفلة الـ loop.`,
            R`[[42]].`,
            R`قفلة main.`
          ],
          sol: R`الناتج [[a]] ثم [[b]] ثم [[42]]. ومع [[for i, v]] من غير استخدام i ← [[declared and not used: i]].`
        },
        {
          cmd: "*T  و  &x في Go",
          title: "النجمة * و & في Go: نفس فكرة C، &x عنوان و *T نوع مؤشر، ومن غير ->",
          desc: R`Go فيه مؤشرات زي C بس أبسط وأأمن. [[p := &x]] عنوان x، ونوع p هو [[*int]]. و [[*p = 10]] بتغيّر x. ومفيش حساب على المؤشرات ([[p++]] ممنوعة).

ومفيش [[->]]: مع مؤشر لـ struct بتكتب [[p.Name]] بالنقطة على طول، و Go بيدخل للقيمة لوحده.

أهم استخدام: الـ methods. [[func (u *User) Rename(n string)]] (pointer receiver) بتعدّل الـ User الأصلي، لكن [[func (u User) ...]] بتاخد نسخة فالتعديل بيضيع. والمؤشر الفاضي [[nil]].`,
          example: R`package main
import "fmt"
type User struct{ Name string }
func (u *User) Rename(n string) { u.Name = n }
func main() {
    u := User{Name: "Ali"}
    p := &u
    p.Rename("Sara")
    fmt.Println(u.Name, p.Name)
}`,
          flag: "script",
          try: R`على [[go.dev/play]] شيل النجمة من [[(u *User)]] وشغّل تاني وقارن الاسم المطبوع.`,
          deep: {
            why: R`الفرق بين pointer receiver و value receiver سبب bug مشهور في Go: method «بتعدّل» ومفيش حاجة بتتغير.`,
            how: R`Go بيمرر كل حاجة بالنسخ. المؤشر بيخلي النسخة هي العنوان، فالتعديل بيوصل للأصل. والـ compiler بيعمل [[&]] و [[*]] لوحده في نداء الـ methods وفي الوصول للخانات.`,
            when: R`pointer receivers للـ methods اللي بتعدّل أو لما الـ struct كبير. وخليك ثابت: لو method واحدة pointer receiver خلّي الباقي زيها.`,
            mistakes: R`value receiver في method بتعدّل. واستخدام مؤشر [[nil]] فيحصل [[panic: runtime error: invalid memory address or nil pointer dereference]].`
          },
          lines: [
            R`package.`,
            R`fmt.`,
            R`struct فيه اسم.`,
            R`pointer receiver: u مؤشر، فالتعديل بيوصل للأصل.`,
            R`main.`,
            R`struct.`,
            R`[[&u]] عنوانه، و p نوعها [[*User]].`,
            R`نداء الـ method من المؤشر.`,
            R`[[Sara Sara]]: النقطة شغالة مع المؤشر من غير [[->]].`,
            R`قفلة main.`
          ],
          sol: R`مع النجمة ← [[Sara Sara]]. من غيرها ← [[Ali Ali]]، لأن Rename عدّلت نسخة.`
        },
        {
          cmd: "nums ...int",
          title: "التلات نقط ... في Go: دالة بتاخد أي عدد arguments، و slice... بتفرده",
          desc: R`[[func sum(nums ...int) int]] معناها sum بتاخد أي عدد أرقام، وجوه الدالة nums بتبقى slice ([[[]int]]). تناديها [[sum(1, 2, 3)]] أو [[sum()]].

ولو معاك slice جاهز وعايز تبعته، حط [[...]] بعده: [[sum(xs...)]]. وأشهر مكان [[append(a, b...)]] عشان تضيف slice كاملة لـ slice.

و [[[...]int{1, 2, 3}]] في تعريف array معناها «الـ compiler يعدّ الطول». نفس الفكرة في JS ([[...]]) و Python ([[*args]]) و Java ([[int... nums]]) بس اتجاه النقط مختلف.`,
          example: R`package main
import "fmt"
func sum(nums ...int) int {
    t := 0
    for _, n := range nums { t += n }
    return t
}
func main() {
    xs := []int{4, 5}
    fmt.Println(sum(1, 2, 3), sum(xs...), append(xs, xs...))
}`,
          flag: "script",
          try: R`على [[go.dev/play]] جرّب [[sum(xs)]] من غير النقط واقرا الـ error.`,
          deep: {
            why: R`[[fmt.Println]] نفسها variadic، وكذلك [[append]]. ومن غير [[xs...]] هتلف loop عشان تضيف عناصر.`,
            how: R`الـ compiler بيلم الـ arguments في slice جديدة. ولو بعت [[xs...]] بيبعت الـ slice نفسها من غير نسخ، فلو الدالة عدّلت فيها هتعدّل الأصلية.`,
            when: R`دوال زي logging أو تجميع. ولازم الـ parameter الـ variadic يبقى آخر واحد.`,
            mistakes: R`[[sum(xs)]] من غير [[...]]: [[cannot use xs (variable of type []int) as int value in argument to sum]]. وتحط النقط قبل الاسم زي JS: في Go بعد النوع في التعريف، وبعد القيمة في النداء.`
          },
          lines: [
            R`package.`,
            R`fmt.`,
            R`[[...int]]: أي عدد أرقام، وجوه الدالة nums نوعها [[[]int]].`,
            R`مجموع.`,
            R`loop على الأرقام.`,
            R`رجّع المجموع.`,
            R`قفلة sum.`,
            R`main.`,
            R`slice.`,
            R`[[6]] و [[9]] (الـ slice اتفردت) و [[[4 5 4 5]]].`,
            R`قفلة main.`
          ],
          sol: R`الناتج [[6 9 [4 5 4 5]]]. ومع [[sum(xs)]] ← [[cannot use xs (variable of type []int) as int value in argument to sum]].`
        }
      ]
    },
    {
      t: "Kotlin و Swift و Java والمقارنات",
      l: 3,
      n: "?. و ?: و !! و ? و !، و -> و => و :: و @ و $: نفس الرموز بمعاني مختلفة بين اللغات",
      items: [
        {
          cmd: "?.  و  ?:  و  !!",
          title: "رموز null في Kotlin: ?. ادخل لو مش null، و ?: قيمة احتياطي (Elvis)، و !! أنا متأكد ولو null اقع",
          desc: R`في Kotlin النوع [[String]] مينفعش يبقى null أبدًا. لو عايزه يقبل null اكتب [[String?]] بعلامة استفهام. والـ compiler مش هيسيبك تستخدمه من غير ما تتعامل مع null.

[[name?.length]] (safe call): لو name بـ null رجّع null، غير كده رجّع الطول. [[name ?: "ضيف"]] (Elvis operator، عشان شكله شبه شعر إلفيس): لو الشمال null خد اليمين، زي [[??]] في JS. و [[name!!]]: «أنا متأكد إنها مش null»، ولو طلعت null بيرمي [[NullPointerException]].

ومعاها [[name?.let { ... }]] عشان تنفّذ بلوك لو القيمة مش null. ونفس الأفكار في Swift و Dart و C# بأشكال قريبة.`,
          example: R`val name: String? = null
val len = name?.length
val shown = name ?: "ضيف"
val size = name?.length ?: 0
name?.let { println("الاسم $it") }
val sure: Int = name!!.length`,
          flag: "script",
          try: R`على [[play.kotlinlang.org]] حط السطور جوه [[fun main() { }]] واطبع [[len]] و [[shown]] و [[size]]. آخر سطر هيوقع البرنامج، اقرا الـ exception.`,
          deep: {
            why: R`أشهر crash في Java (و Android) هو NullPointerException. Kotlin حطت null في نظام الأنواع عشان الـ compiler يمسكها قبل ما التطبيق يقع عند اليوزر.`,
            how: R`[[String?]] و [[String]] نوعين مختلفين. بعد [[if (name != null)]] الـ compiler بيعتبرها [[String]] لوحده (smart cast). و [[?:]] ممكن يكون يمينها [[return]] أو [[throw]]: [[val n = name ?: return]].`,
            when: R`[[?.]] و [[?:]] في أغلب الحالات. [[!!]] تقريبًا أبدًا، إلا في حالات انت متأكد منها 100% وعايز الـ crash يبان لو اتغيرت.`,
            mistakes: R`[[!!]] في كل حتة عشان تسكت الـ compiler: كده رجعت لمشاكل Java. وتنسى إن [[?.]] نتيجتها nullable برضه فلازم [[?:]] بعدها. وتخلط [[?:]] بتاعة Kotlin بالـ ternary [[? :]] (Kotlin مفيهاش ternary).`
          },
          lines: [
            R`[[String?]]: نص ممكن يبقى null، وهنا null فعلًا.`,
            R`safe call: len بـ null من غير crash.`,
            R`Elvis: [[ضيف]].`,
            R`الاتنين مع بعض: [[0]].`,
            R`البلوك مش هيتنفذ لأن name بـ null.`,
            R`[[!!]] على null: [[NullPointerException]].`
          ],
          sol: R`[[len]] ← [[null]]، [[shown]] ← [[ضيف]]، [[size]] ← [[0]]. وآخر سطر ← [[Exception in thread "main" java.lang.NullPointerException]].`
        },
        {
          cmd: "String?  و  x!",
          title: "الـ ? و ! في Swift: String? يعني optional (ممكن تبقى nil)، و ! يعني افتحها بالعافية",
          desc: R`في Swift [[String?]] نوع optional: يا نص يا [[nil]]. ومينفعش تستخدمه كنص على طول، لازم «تفتحه» (unwrap) الأول.

الطرق الآمنة: [[if let name = name { ... }]] (لو فيه قيمة، جوه البلوك هي نص عادي)، و [[guard let name else { return }]]، و [[name ?? "ضيف"]] قيمة احتياطي، و [[user?.address?.city]] optional chaining.

و [[name!]] (force unwrap): افتحها بالعافية، ولو nil التطبيق بيقع بـ [[Unexpectedly found nil while unwrapping an Optional value]]. ونفس الفكرة بالظبط في Kotlin ([[?]] و [[!!]]) و TypeScript ([[?:]] و [[!]]) و Dart ([[?]] و [[!]]).`,
          example: R`var name: String? = nil
let shown = name ?? "ضيف"
if let n = name {
    print("الاسم \(n)")
}
let count = name?.count ?? 0
let crash = name!.count`,
          flag: "script",
          try: R`على [[swiftfiddle.com]] شغّل السطور، واطبع [[shown]] و [[count]]. آخر سطر هيوقع، اقرا الرسالة. بعدين خلّي [[name = "Ali"]] وشغّل تاني.`,
          deep: {
            why: R`زي Kotlin: الـ compiler بيجبرك تتعامل مع غياب القيمة، فـ crashes الـ nil بتقل جدًا لو مستخدمتش [[!]].`,
            how: R`[[String?]] هو في الحقيقة [[Optional<String>]]، enum فيه حالتين: [[.some(value)]] و [[.none]]. و [[if let]] بتفك الـ enum بأمان. ولاحظ إن الـ interpolation في Swift بـ [[\(x)]] مش [[$__{x}]].`,
            when: R`[[if let]] و [[guard let]] و [[??]] دايمًا. [[!]] بس في حاجات مضمونة زي [[IBOutlet]] في UIKit أو URL ثابت انت كاتبه.`,
            mistakes: R`[[!]] في كل حتة. وتنسى إن [[?.]] بترجّع optional. وتخلط [[!]] (force unwrap) بـ [[!]] قبل القيمة (not).`
          },
          lines: [
            R`optional نص، قيمته nil.`,
            R`[[??]]: [[ضيف]].`,
            R`[[if let]]: لو فيه قيمة، n جوه البلوك نص عادي.`,
            R`interpolation في Swift بـ [[\( )]].`,
            R`قفلة البلوك (مش هيتنفذ هنا).`,
            R`optional chaining مع [[??]]: [[0]].`,
            R`force unwrap على nil: crash.`
          ],
          sol: R`[[shown]] ← [[ضيف]]، [[count]] ← [[0]]، وآخر سطر ← [[Fatal error: Unexpectedly found nil while unwrapping an Optional value]]. ولما [[name = "Ali"]] هيطبع [[الاسم Ali]] و count بـ [[3]] ومفيش crash.`
        },
        {
          cmd: "-> (نوع الراجع)",
          title: "السهم -> بعد أقواس الدالة: نوع اللي الدالة بترجّعه في Swift و Rust و Python، و : في TS و Kotlin",
          desc: R`في لغات كتير السهم [[->]] بعد الـ parameters معناه «الدالة دي بترجّع النوع ده». Swift: [[func add(a: Int, b: Int) -> Int]]. Rust: [[fn add(a: i32, b: i32) -> i32]]. Python: [[def add(a: int, b: int) -> int:]]. و C++ الحديث: [[auto add(int a, int b) -> int]].

لغات تانية بتستخدم [[:]] بدل السهم: TypeScript [[function add(a: number, b: number): number]] و Kotlin [[fun add(a: Int, b: Int): Int]]. و Go بيكتب النوع بعد الأقواس من غير أي رمز: [[func add(a, b int) int]]. و Java و C و C# بيكتبوه قبل الاسم: [[int add(int a, int b)]].

ولو مفيش قيمة بترجع: Swift [[-> Void]] أو تشيل السهم، و Python [[-> None]]، و Kotlin [[: Unit]]، و TS [[: void]]، و C [[void]].`,
          example: R`// Swift
func add(a: Int, b: Int) -> Int { a + b }
// Rust
fn add(a: i32, b: i32) -> i32 { a + b }
// Kotlin
fun add(a: Int, b: Int): Int = a + b
// Go
func add(a, b int) int { return a + b }`,
          flag: "script",
          try: R`اكتب نفس الدالة [[add]] في اللغة اللي بتذاكرها دلوقتي (TypeScript أو Python أو Java) بنوع الراجع، وقارن مكانه بالأمثلة.`,
          deep: {
            why: R`هتقرا كود بلغات كتير، وأول حاجة في توقيع أي دالة هي «بتاخد إيه وبترجّع إيه». معرفة مكان النوع في كل لغة بتخليك تقرا بسرعة.`,
            how: R`كلها نفس المعلومة للـ compiler، الاختلاف في الشكل بس. اللغات اللي بتحط النوع بعد الاسم ([[name: Type]]) بتستخدم [[->]] أو [[:]] للراجع عشان يبقى متسق.`,
            when: R`في كل دالة عامة. واللغات اللي بتستنتج (Kotlin مع [[=]]، و Rust مع closures) تقدر تشيله في الحاجات الصغيرة.`,
            mistakes: R`تكتب [[->]] في TypeScript أو Kotlin. وتكتب [[:]] في Swift. وتخلط السهم ده بـ [[->]] بتاعة C (مؤشرات) أو [[->]] بتاعة Java (lambda).`
          },
          lines: [
            R`Swift: [[-> Int]]، وجسم من سطر واحد بيرجّع لوحده.`,
            R`Rust: نفس السهم، وآخر expression من غير [[;]] هي اللي بترجع.`,
            R`Kotlin: [[: Int]] بدل السهم، و [[=]] لجسم من expression واحد.`,
            R`Go: النوع بعد الأقواس من غير رمز.`
          ],
          sol: R`TypeScript: [[function add(a: number, b: number): number { return a + b; }]]. Python: [[def add(a: int, b: int) -> int: return a + b]]. Java: [[int add(int a, int b) { return a + b; }]].`
        },
        {
          cmd: "=>  ضد  ->",
          title: "مقارنة الأسهم في الـ lambdas: => في JS و C# و Dart، و -> في Java و Kotlin، وغيرهم",
          desc: R`كل لغة عندها طريقة تكتب بيها دالة صغيرة من غير اسم (lambda)، والسهم بيختلف:

[[=>]] (سهم بيساوي): JavaScript و TypeScript [[x => x * 2]]، و C# [[x => x * 2]]، و Dart [[(x) => x * 2]]، و Scala، و PHP [[fn($x) => $x * 2]].

[[->]] (سهم بشرطة): Java [[x -> x * 2]]، و Kotlin جوه أقواس معووجة [[{ x -> x * 2 }]] (ولو parameter واحد ممكن [[{ it * 2 }]])، و Haskell [[\x -> x * 2]].

ومن غير سهم خالص: Python [[lambda x: x * 2]]، و Swift [[{ x in x * 2 }]]، و Rust [[|x| x * 2]]، و Go [[func(x int) int { return x * 2 }]].

و [[->]] كمان في Kotlin [[when]] و Java [[switch]] الحديث بتفصل الحالة عن النتيجة.`,
          example: R`// JavaScript / TypeScript / C#
nums.map(x => x * 2)
// Java
nums.stream().map(x -> x * 2).toList();
// Kotlin
nums.map { x -> x * 2 }
nums.map { it * 2 }
// Kotlin when
val label = when (n) { 0 -> "صفر"; else -> "رقم" }`,
          flag: "script",
          try: R`اكتب [[[1, 2, 3].map(x => x * 2)]] في الـ Console، وبعدين اكتب نفس الفكرة في python3: [[list(map(lambda x: x * 2, [1, 2, 3]))]].`,
          deep: {
            why: R`لو بتنقل بين لغتين (Kotlin و JS مثلًا، أو Java و TS) هتكتب السهم الغلط كتير. القايمة دي بتوفّر عليك أخطاء compile سخيفة.`,
            how: R`كلهم نفس الفكرة: parameters، وسهم، وجسم. الاختلاف تاريخي في كل لغة. و Dart بتستخدم [[=>]] كمان لأي دالة جسمها expression واحد: [[int sq(int x) => x * x;]].`,
            when: R`في الـ callbacks: map و filter و sort و event handlers، في أي لغة.`,
            mistakes: R`[[x -> x * 2]] في JS بتطلع SyntaxError. و [[x => x * 2]] في Java برضه. وفي Kotlin تكتب السهم برة الأقواس المعووجة [[map(x -> x * 2)]].`
          },
          lines: [
            R`JS و TS و C#: [[=>]].`,
            R`Java: [[->]].`,
            R`Kotlin: [[->]] جوه [[{ }]].`,
            R`Kotlin: [[it]] اسم جاهز للـ parameter الوحيد.`,
            R`Kotlin when: [[->]] بتفصل الحالة عن النتيجة.`
          ],
          sol: R`الاتنين بيطلعوا نفس النتيجة: [[[2, 4, 6]]].`
        },
        {
          cmd: "String::length",
          title: "النقطتين المزدوجة :: في Java و Kotlin: method reference، بتشاور على دالة من غير ما تناديها",
          desc: R`في Java و Kotlin [[String::length]] معناها «دالة length بتاعة String»، من غير تشغيل. بتحطها مكان lambda: [[names.map(String::length)]] هي هي [[names.map { it.length }]].

أشكالها: [[Class::staticMethod]]، و [[object::method]] ([[System.out::println]] في Java)، و [[Class::new]] للـ constructor. وفي Kotlin [[::functionName]] لدالة عادية، و [[User::class]] للـ class نفسه (بتشوفها في Android: [[MainActivity::class.java]]).

ده غير [[::]] في C++ و PHP و Rust (اللي معناها «اللي جوه»). نفس الشكل، فكرة مختلفة.`,
          example: R`// Java
List<Integer> lens = names.stream().map(String::length).toList();
names.forEach(System.out::println);
// Kotlin
val lens = names.map(String::length)
fun isLong(s: String) = s.length > 3
val longOnes = names.filter(::isLong)`,
          flag: "script",
          try: R`على [[play.kotlinlang.org]] اعمل [[val names = listOf("Ali", "Sara", "Mohamed")]] واطبع [[names.map(String::length)]] و [[names.filter(::isLong)]] بعد ما تعرّف isLong.`,
          deep: {
            why: R`أقصر وأوضح من lambda لما الـ lambda كل اللي بتعمله إنها تنادي دالة واحدة. وهتلاقيها كتير في Spring و Android.`,
            how: R`الـ compiler بيحوّلها لـ lambda بتنادي الدالة دي. في Java النوع المطلوب لازم يبقى functional interface (زي [[Function]] و [[Consumer]]).`,
            when: R`لما الـ lambda هي مجرد [[x -> f(x)]] أو [[x -> x.method()]].`,
            mistakes: R`تحط أقواس: [[String::length()]] غلط. وتستخدمها لما محتاج تبعت arguments زيادة (ساعتها اكتب lambda). وتخلطها بـ [[::]] بتاعة C++.`
          },
          lines: [
            R`Java: طول كل اسم.`,
            R`Java: اطبع كل اسم، [[System.out::println]] reference لـ method على object.`,
            R`Kotlin: نفس الفكرة.`,
            R`دالة عادية.`,
            R`[[::isLong]]: reference لدالة top-level.`
          ],
          sol: R`[[names.map(String::length)]] ← [[[3, 4, 7]]]. [[names.filter(::isLong)]] ← [[[Sara, Mohamed]]].`
        },
        {
          cmd: "@Override",
          title: "الـ @ فوق method أو class في Java و Kotlin: annotation، معلومة للـ compiler أو للـ framework",
          desc: R`[[@Override]] فوق method في Java معناها «دي بتعيد تعريف method في الأب». لو كتبت الاسم غلط، الـ compiler هيقولك إن مفيش حاجة تعمل override لها بدل ما الغلطة تعدّي.

ودي اسمها annotations: معلومات (metadata) على الكود. بعضها للـ compiler ([[@Override]] و [[@Deprecated]] و [[@FunctionalInterface]])، وأغلبها للـ frameworks: Spring [[@RestController]] و [[@GetMapping("/users")]] و [[@Autowired]]، و JPA [[@Entity]] و [[@Id]]، و JUnit [[@Test]]، و Lombok [[@Data]].

الشكل زي decorators في Python و TypeScript، بس في Java الـ annotation نفسها مش بتغيّر الكود، الـ framework بيقراها ويتصرف. وفي Kotlin نفس الحاجة، و [[override]] كلمة إجبارية مش annotation.`,
          example: R`@RestController
public class UserController {
    @GetMapping("/users/{id}")
    public User get(@PathVariable Long id) { return service.find(id); }
    @Override
    public String toString() { return "UserController"; }
}`,
          flag: "script",
          try: R`في أي مشروع Java (أو على [[onlinegdb.com]]) اكتب كلاس فيه [[@Override public String tostring()]] بحرف صغير، واعمل compile واقرا الـ error.`,
          deep: {
            why: R`Spring Boot كله annotations. لو مش فاهم إن [[@GetMapping]] بتسجّل route، هتحس إن الكود بيشتغل لوحده.`,
            how: R`الـ annotation بتتخزن مع الكلاس. الـ compiler بيستخدم بعضها للفحص، والـ frameworks بتقراها وقت التشغيل بالـ reflection أو وقت الـ compile بـ annotation processors (زي Lombok اللي بيولّد getters).`,
            when: R`[[@Override]] على كل override دايمًا. والباقي حسب الـ framework.`,
            mistakes: R`تنسى [[@Override]] فتغلط في الاسم ومحدش يقولك (تبقى method جديدة). وتحط annotation على المكان الغلط (فوق field بدل method). وتنسى إن [[@Autowired]] على field بتشتغل بس لو الكلاس نفسه bean.`
          },
          lines: [
            R`Spring: الكلاس ده controller بيرجّع JSON.`,
            R`كلاس.`,
            R`Spring: الـ method دي للـ GET على المسار ده، و [[{id}]] متغير في المسار.`,
            R`[[@PathVariable]]: خد id من المسار.`,
            R`compiler: دي بتعيد تعريف method في الأب ([[Object]]).`,
            R`toString.`,
            R`قفلة الكلاس.`
          ],
          sol: R`مع [[tostring]] بحرف صغير ← [[error: method does not override or implement a method from a supertype]]. من غير [[@Override]] كان الكود هيعدّي والـ method الغلط هتتجاهل.`
        },
        {
          cmd: "\"$name\"  (Kotlin و Dart)",
          title: "الدولار $ جوه النص في Kotlin و Dart: $name متغير، و ${expr} حساب",
          desc: R`في Kotlin و Dart [["Hi $name"]] بتحط قيمة name جوه النص. ولو عايز حاجة أكتر من اسم بسيط (خانة أو حساب أو نداء) حطها في أقواس: [["$__{user.name}"]] و [["$__{a + b}"]].

ده نفس فكرة [[$__{}]] في JS بس من غير backtick، وأي [[""]] عادية بتشتغل. وفي Groovy (Gradle) نفس الحكاية. وفي PHP [["Hi $name"]] برضه جوه [[""]] بس. وفي bash [["$name"]] و [["$__{name}"]] نفس الشكل تقريبًا.

وعشان تكتب دولار حرفي: Kotlin [["\$5"]] أو [["$__{'$'}5"]]، و Dart [['\$5']].`,
          example: R`// Kotlin
val name = "Sara"
val user = User("Ali", 20)
println("أهلًا $name")
println("$__{user.name} عنده $__{user.age + 1} سنة السنة الجاية")
println("$user.name")
println("السعر \$50")`,
          flag: "script",
          try: R`على [[play.kotlinlang.org]] اعمل [[data class User(val name: String)]] وجرّب [[println("$user.name")]] و [[println("$__{user.name}")]] وقارن.`,
          deep: {
            why: R`أكتر حاجة بتكتبها في Kotlin (Android) و Dart (Flutter): نصوص الواجهة والـ logs. والغلطة اللي في السطر الخامس منتشرة جدًا.`,
            how: R`الـ compiler بيقرا بعد [[$]] أطول اسم ممكن بس (حروف وأرقام و [[_]])، والنقطة بتوقفه. فـ [["$user.name"]] بتحط [[user.toString()]] وبعدها [[.name]] حرفيًا. الأقواس هي اللي بتاخد expression كامل.`,
            when: R`[[$name]] للمتغيرات البسيطة، و [[$__{}]] لأي حاجة فيها نقطة أو حساب.`,
            mistakes: R`[["$user.name"]] من غير أقواس. وتكتب backtick زي JS. وفي Flutter تنسى إن [['$']] في نص عادي لازم تهرب منها لو عايزها حرفي.`
          },
          lines: [
            R`متغير.`,
            R`object.`,
            R`[[أهلًا Sara]].`,
            R`[[$__{}]] مع خانة وحساب: [[Ali عنده 21 سنة السنة الجاية]].`,
            R`غلط: لو User data class هيطبع [[User(name=Ali, age=20).name]]، لأن [[$user]] وقفت عند النقطة.`,
            R`[[\$]] دولار حرفي.`
          ],
          sol: R`[[println("$user.name")]] ← [[User(name=Ali).name]]. [[println("$__{user.name}")]] ← [[Ali]].`
        }
      ]
    }
]);

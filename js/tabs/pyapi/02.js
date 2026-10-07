// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
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
          teach: R`## المثال بيعمل إيه؟

بياخد سن ودور (role) ويطلّع منهم قرارات: الشخص طفل ولا مراهق ولا بالغ، يقدر ينشر ولا لأ، في سن الشغل ولا لأ. وفي الطريق بيوريك كل أشكال الشرط في Python. اتشغّل على ويندوز بـ Python 3.14.3 وفي Docker بـ [[python:3.13-slim]]، والناتج كله:

~~~text الناتج
بالغ
يقدر ينشر
سن الشغل
العربية فاضية
اسم الدور طويل: 6 حروف
~~~

---

## ١. [[if]] و [[elif]] و [[else]]

~~~python
age, role = 20, "editor"
if age < 13:
    label = "طفل"
elif age < 18:
    label = "مراهق"
else:
    label = "بالغ"
print(label)
~~~

### شكل البلوك

- السطر اللي فيه الشرط بيخلص بـ [[:]]، ومعناها «البلوك جاي».
- **البلوك** هو السطور اللي تحته متزقوقة ٤ مسافات (indentation). في JavaScript الأقواس [[{ }]] بتحدد البلوك، هنا المسافات هي اللي بتحدد. أول سطر يرجع لأول السطر يبقى البلوك خلص.
- لو المسافات مش مظبوطة، Python بيرفض يشغّل الملف. جرّبنا سطر زيادة مسافتين:

~~~text الناتج
    b = 2
IndentationError: unexpected indent
~~~

### الترتيب

Python بيفحص من فوق لتحت، **وأول شرط يطلع صح بيكسب** والباقي بيتساب:

| الشرط | [[age = 20]] | النتيجة |
|---|---|---|
| [[age < 13]] | False | كمّل |
| [[elif age < 18]] | False | كمّل ([[elif]] = else if) |
| [[else]] | (مفيش شرط) | [[label = "بالغ"]] |

و [[<]] أقل من، و [[>=]] أكبر من أو يساوي، و [[==]] يساوي (اتنين، لأن [[=]] لوحدها تعيين)، و [[!=]] مش بيساوي.

---

## ٢. [[and]] و [[or]]

~~~python
if role == "admin" or (role == "editor" and age >= 18):
    print("يقدر ينشر")
~~~

في Python الكلمات [[and]] و [[or]] و [[not]] بدل [[&&]] و [[||]] و [[!]]. نحسبها من جوه:

| الحتة | القيمة |
|---|---|
| [[role == "admin"]] | False |
| [[role == "editor"]] | True |
| [[age >= 18]] | True |
| [[(True and True)]] | True |
| [[False or True]] | **True** |

والأقواس مش إجبارية هنا ([[and]] بيتحسب قبل [[or]] أصلًا)، بس بتوضّح القصد.

> فخ مشهور: [[role == "admin" or "editor"]] **مش** معناها «admin أو editor». معناها [[(role == "admin") or "editor"]]، و [["editor"]] نص مش فاضي فبيتحسب صح. جرّبناها على [[role = "viewer"]] فطبعت [[editor]] (قيمة truthy). الصح [[role in ("admin", "editor")]] وطبعت [[False]].

---

## ٣. مقارنة متسلسلة: [[18 <= age < 60]]

ده نفس [[18 <= age and age < 60]] بالظبط، زي ما بتكتبها في الرياضة. [[age]] بيتحسب مرة واحدة. ومع [[age = 20]] الاتنين صح فطبع [[سن الشغل]].

---

## ٤. truthiness: [[if not cart]]

~~~python
cart = []
if not cart:
    print("العربية فاضية")
~~~

أي قيمة في Python ينفع تبقى شرط. Python بيحوّلها لـ True أو False بـ [[bool()]]، والقاعدة: **الفاضي و الصفر False، وأي حاجة تانية True**. جرّبناهم:

~~~text الناتج: bool(0), bool(""), bool([]), bool({}), bool(None), bool("0"), bool([0]), bool(-1)
False False False False False True True True
~~~

لاحظ إن [["0"]] نص فيه حرف فـ True، و [[[0]]] list فيها عنصر فـ True. و [[[]]] فاضية فـ False، و [[not]] قلبتها True، فاتطبعت الرسالة.

---

## ٥. قيمة في سطر واحد: [[x if cond else y]]

~~~python
status = "active" if age >= 18 else "pending"
~~~

بيتقري: «[["active"]] لو [[age >= 18]]، غير كده [["pending"]]». ده **conditional expression** (زي [[cond ? a : b]] في JavaScript)، وبيرجع قيمة، فتقدر تحطها في متغير. هنا [[status]] بقت [['active']].

---

## ٦. الـ walrus: [[:=]]

~~~python
if (n := len(role)) > 5:
    print(f"اسم الدور طويل: {n} حروف")
~~~

نفكّه من جوه:

1. [[len(role)]]: طول النص [["editor"]] = 6.
2. [[n := ...]]: حط الـ 6 في [[n]] **وارجعها** في نفس اللحظة. [[=]] العادية مينفعش تيجي جوه شرط، [[:=]] ينفع. اسمها walrus لأن شكلها زي عيون وسنان حيوان الفظ.
3. [[(...) > 5]]: 6 > 5 صح.
4. جوه البلوك [[n]] موجودة، فاستخدمناها في الـ f-string من غير ما نحسب الطول تاني.

والأقواس حوالين [[n := len(role)]] لازمة: من غيرها [[n]] كانت هتاخد ناتج [[len(role) > 5]] يعني True.

---

## الحل: [[grade(score)]]

~~~python
def grade(score: int) -> str:
    if not 0 <= score <= 100:
        raise ValueError(f"score out of range: {score}")
    if score >= 90:
        return "A"
    ...
    return "F"
~~~

- أول [[if]] **guard clause**: [[0 <= score <= 100]] مقارنة متسلسلة، و [[not]] بتقلبها، يعني «لو برّه المدى». [[raise ValueError(...)]] بترمي error وتوقف الدالة.
- بعدها الدرجات من الأعلى للأقل، وكل فرع فيه [[return]] بيخرج من الدالة فورًا، عشان كده [[return "F"]] في الآخر من غير [[else]].
- [[try:]] و [[except ValueError as e:]] في آخر الحل بيمسكوا الـ error بدل ما البرنامج يقع، و [[e]] فيه الرسالة (درس «try و except»).

~~~text الناتج
95 A
85 B
72 C
50 D
49 F
خطأ: score out of range: 101
~~~

## الخلاصة

| الشكل | بيعمل إيه |
|---|---|
| [[if / elif / else]] + [[:]] + ٤ مسافات | أول شرط صح بيكسب |
| [[and]] و [[or]] و [[not]] | كلمات، مش رموز |
| [[a < b < c]] | مقارنة متسلسلة |
| [[if not items]] | الفاضي والصفر و [[None]] بيتحسبوا False |
| [[x if cond else y]] | قيمة في سطر |
| [[(n := expr)]] | عيّن وارجع القيمة جوه الشرط |

- [[==]] للمقارنة، و [[=]] للتعيين.
- [[role in ("admin", "editor")]] مش [[role == "admin" or "editor"]].`,
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
          teach: R`## المثال بيعمل إيه؟

بيلف بـ [[for]] على أرقام، وعلى list، وعلى dict، وعلى string، وبيوريك الأدوات اللي بتريّحك: [[range]] و [[enumerate]] و [[zip]] و [[.items()]] و [[sum]]. اتشغّل على ويندوز بـ Python 3.14.3 وفي Docker بـ [[python:3.13-slim]]، ونفس الناتج.

الفكرة الأساسية: [[for x in something:]] معناها «هات من [[something]] عنصر عنصر، وكل مرة حطه في [[x]] وشغّل البلوك». مفيش عدّاد [[i++]] زي JavaScript.

---

## ١. [[range]]

~~~python
for i in range(3):
    print(i)
print(list(range(2, 11, 2)))
print(list(range(5, 0, -1)))
~~~

~~~text الناتج
0
1
2
[2, 4, 6, 8, 10]
[5, 4, 3, 2, 1]
~~~

[[range]] بياخد لحد ٣ أرقام:

| الشكل | معناه | المثال |
|---|---|---|
| [[range(stop)]] | من 0 لحد **قبل** stop | [[range(3)]]: 0 1 2 |
| [[range(start, stop)]] | من start لحد قبل stop | [[range(1, 10)]]: 1 لـ 9 |
| [[range(start, stop, step)]] | بخطوة | [[range(2, 11, 2)]]: 2 لـ 10 |

- الـ stop **مش داخل** أبدًا: عشان كده كتبنا 11 عشان الـ 10 تدخل.
- خطوة سالبة بتعد تنازلي: [[range(5, 0, -1)]] بيقف قبل 0.
- [[range]] نفسه مش list: لو طبعته هيطلع [[range(0, 3)]]. هو object بيحسب الرقم وقت ما تطلبه، فـ [[range(10**9)]] حجمه 48 byte بس (قسناه بـ [[sys.getsizeof]]). و [[list(...)]] بتحوّله لـ list عشان تشوف أرقامه.

---

## ٢. على العناصر نفسها

~~~python
names = ["Sara", "Omar", "Ali"]
for name in names:
    print(name.upper())
~~~

~~~text الناتج
SARA
OMAR
ALI
~~~

مفيش index خالص: كل لفة [[name]] بياخد العنصر اللي بعده. و [[.upper()]] حروف كبيرة. ده الشكل الطبيعي في Python.

---

## ٣. [[enumerate]]: الرقم مع العنصر

~~~python
for i, name in enumerate(names, start=1):
    print(f"{i}. {name}")
~~~

[[enumerate(names, start=1)]] بيطلّع **أزواج** (tuples) فيها العداد والعنصر. لو حوّلناه list:

~~~text الناتج: list(enumerate(names, start=1))
[(1, 'Sara'), (2, 'Omar'), (3, 'Ali')]
~~~

- [[for i, name in ...]]: كل زوج بيتفك على اسمين (unpacking، زي [[a, b = 1, 2]]).
- [[start=1]] **keyword argument**: باراميتر بتبعته باسمه. من غيره العد بيبدأ من 0.

~~~text الناتج
1. Sara
2. Omar
3. Ali
~~~

---

## ٤. [[zip]]: كذا list مع بعض

~~~python
prices = [120, 80, 45]
for name, price in zip(names, prices, strict=True):
    print(name, price)
~~~

[[zip]] بياخد أول عنصر من كل list في زوج، وبعدين التاني، وهكذا (زي السوستة):

~~~text الناتج: list(zip(names, prices))
[('Sara', 120), ('Omar', 80), ('Ali', 45)]
~~~

ولو الأطوال مختلفة، [[zip]] العادي **بيقف عند الأقصر في صمت**: [[zip(names, [1, 2])]] طلّع زوجين بس، و Ali ضاع من غير أي رسالة. [[strict=True]] (من 3.10) بيخليه يعترض:

~~~text الناتج
ValueError: zip() argument 2 is shorter than argument 1
~~~

---

## ٥. على dict: [[.items()]]

~~~python
stock = {"tea": 3, "coffee": 0}
for item, qty in stock.items():
    print(item, qty)
~~~

لو لفّيت على الـ dict نفسه ([[for k in stock]]) هتاخد **المفاتيح** بس ([[tea]] ثم [[coffee]]). [[.items()]] بترجع أزواج (مفتاح، قيمة):

~~~text الناتج
tea 3
coffee 0
~~~

---

## ٦. على string و [[end]]

~~~python
for ch in "abc":
    print(ch, end=" ")
print()
~~~

- الـ string بتتلف حرف حرف.
- [[print]] عادةً بتحط سطر جديد في الآخر. [[end=" "]] بيغيّره لمسافة، فالحروف تطلع جنب بعض.
- [[print()]] فاضية بتطبع السطر الجديد اللي اتأجّل.

~~~text الناتج
a b c
~~~

---

## ٧. مجموع بإيدك و [[sum]]

~~~python
total = 0
for p in prices:
    total += p
print(total, sum(prices))
~~~

- [[total += p]] اختصار [[total = total + p]].
- اللفات: 0 + 120 = 120، ثم + 80 = 200، ثم + 45 = **245**.
- [[sum(prices)]] بتعمل نفس الحكاية في كلمة.

~~~text الناتج
245 245
~~~

---

## الحل: جدول الضرب

~~~python
for i in range(1, 11):
    print(f"7 x {i:>2} = {7 * i:>2}")
~~~

[[:>2]] يعني «في خانتين، ملزوق يمين» (درس «f-strings»)، فالـ 1 بتاخد مسافة قبلها:

~~~text الناتج (أول سطرين وآخر سطر)
7 x  1 =  7
7 x  2 = 14
7 x 10 = 70
~~~

و [[range(20, 0, -2)]] طلّعت [[[20, 18, 16, 14, 12, 10, 8, 6, 4, 2]]]. وجدول ٣×٣ بـ loop جوه loop: الخارجي للصفوف والداخلي للأعمدة، وكل رقم [[:>4]]:

~~~text الناتج
   1   2   3
   2   4   6
   3   6   9
~~~

## الخلاصة

| عايز | اكتب |
|---|---|
| أرقام | [[range(start, stop, step)]] والـ stop مش داخل |
| العنصر بس | [[for x in items]] |
| الرقم والعنصر | [[for i, x in enumerate(items, start=1)]] |
| كذا list مع بعض | [[zip(a, b, strict=True)]] |
| مفتاح وقيمة | [[for k, v in d.items()]] |
| مجموع | [[sum(items)]] |

- متكتبش [[for i in range(len(items))]]: استخدم [[enumerate]].
- المتغير بتاع الـ for بيفضل موجود بعد الـ loop بآخر قيمة: بعد [[for i in range(3)]] لقينا [[i]] = 2.`,
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
          teach: R`## المثال بيعمل إيه؟

٤ حتت: عدّاد بـ [[while]]، و loop بيتخطى أرقام ويقف عند أرقام بـ [[continue]] و [[break]]، وبحث بـ [[for]] و [[else]]، وفي الآخر برنامج صغير بيقرا أوامر من الكيبورد لحد ما تكتب [[q]]. اتشغّل على ويندوز بـ Python 3.14.3 وفي Docker بـ [[python:3.13-slim]]، والجزء الأخير اتشغّل بـ input جاي من pipe بدل الكيبورد.

---

## ١. [[while]]: لف طول ما الشرط صح

~~~python
attempts = 0
while attempts < 3:
    attempts += 1
    print("محاولة", attempts)
~~~

[[while cond:]] بتفحص الشرط **قبل كل لفة**: صح؟ شغّل البلوك وارجع افحص. غلط؟ اخرج.

| اللفة | [[attempts]] قبل | الشرط | بعد [[+= 1]] | اتطبع |
|---|---|---|---|---|
| ١ | 0 | [[0 < 3]] صح | 1 | محاولة 1 |
| ٢ | 1 | [[1 < 3]] صح | 2 | محاولة 2 |
| ٣ | 2 | [[2 < 3]] صح | 3 | محاولة 3 |
| - | 3 | [[3 < 3]] غلط | | خرجنا |

~~~text الناتج
محاولة 1
محاولة 2
محاولة 3
~~~

لو نسيت [[attempts += 1]]، الشرط هيفضل صح للأبد (infinite loop)، وتوقفه بـ Ctrl+C.

---

## ٢. [[continue]] و [[break]]

~~~python
nums = [4, 7, -1, 9, 0, 12]
for n in nums:
    if n < 0:
        continue
    if n == 0:
        break
    print(n)
~~~

- [[continue]]: «سيب باقي **اللفة دي**، وروح للعنصر اللي بعده».
- [[break]]: «اخرج من الـ loop **خالص** دلوقتي».

| [[n]] | اللي حصل |
|---|---|
| 4 | اتطبع |
| 7 | اتطبع |
| -1 | سالب: [[continue]]، متطبعش |
| 9 | اتطبع |
| 0 | صفر: [[break]]، خرجنا |
| 12 | محدش وصله |

~~~text الناتج
4
7
9
~~~

---

## ٣. [[for ... else]]: «لفّيت وملقيتش»

~~~python
users = ["sara", "omar"]
for u in users:
    if u == "ali":
        print("لقيته")
        break
else:
    print("مش موجود")
~~~

خد بالك إن [[else]] هنا تحت [[for]] (نفس المسافة)، مش تحت [[if]]. ومعناها: **شغّلني لو الـ loop خلص من غير [[break]]**.

- ali مش في الليستة، فالـ for لفت على الاتنين ومحصلش [[break]]، فالـ else اشتغلت: [[مش موجود]].
- جرّبنا نضيف [[ali]] للليستة: طبع [[لقيته]] بس، والـ else متشغلتش لأن الخروج كان بـ [[break]].
- وجرّبنا [[for]] على list فاضية: الـ else **اشتغلت**. يعني هي مش «لو الـ loop ملفّش»، هي «لو مفيش break». فكّر فيها كـ nobreak.

---

## ٤. [[while True]] و [[input]]

~~~python
while True:
    cmd = input("> ").strip()
    if cmd == "q":
        break
    print("انت كتبت", cmd)
~~~

- [[while True:]] شرطه دايمًا صح، فالخروج الوحيد [[break]] من جوه. ده الشكل المعتاد لما شرط الخروج بيتعرف في نص اللفة.
- [[input("> ")]] بتطبع [[> ]] (اسمه prompt) وتستنى سطر من الكيبورد، وبترجعه **string** من غير الـ Enter.
- [[.strip()]] بتشيل المسافات من الأطراف، فـ [[ q ]] بمسافات بتبقى [[q]].

شغّلناه وبعتنا السطور من pipe بدل ما نكتبها: [[hello]] وبعدين [[ q ]]:

~~~text الناتج
> انت كتبت hello
>
~~~

الـ prompt والرد في نفس السطر لأن الكلام الجاي من pipe مش بيظهر على الشاشة زي الكيبورد. والـ [[ q ]] بعد الـ strip بقت [[q]] فخرج. ولو الـ pipe خلص قبل [[q]]، [[input]] بيرمي [[EOFError: EOF when reading a line]] (EOF = End Of File: مفيش سطور تاني).

---

## الحل: لعبة التخمين

~~~python
import random
secret = random.randint(1, 20)
tries = 0
while tries < 5:
    raw = input(f"خمّن (محاولة {tries + 1} من 5): ").strip()
    if not raw.isdigit():
        print("اكتب رقم")
        continue
    tries += 1
    ...
else:
    print(f"خسرت، الرقم كان {secret}")
~~~

- [[random.randint(1, 20)]] رقم عشوائي من 1 لـ 20، **والاتنين داخلين** (عكس [[range]]).
- [[raw.isdigit()]] صح لو النص كله أرقام. لو لأ، [[continue]] **قبل** [[tries += 1]]، فالكلام الغلط مش بياكل محاولة.
- [[int(raw)]] بيحوّل النص لرقم، وبعدها مقارنة: صح؟ [[break]]. غلط؟ «أكبر» أو «أصغر».
- [[else]] بتاعة الـ while بتشتغل لو الخمس محاولات خلصوا من غير [[break]].

شغّلناه بـ [[printf "x\n10\n5\n15\n1\n20\n" | python sol.py]] كذا مرة (الرقم عشوائي). مرة خسرنا:

~~~text الناتج
خمّن (محاولة 1 من 5): اكتب رقم
خمّن (محاولة 1 من 5): أكبر
خمّن (محاولة 2 من 5): أكبر
خمّن (محاولة 3 من 5): أكبر
خمّن (محاولة 4 من 5): أكبر
خمّن (محاولة 5 من 5): أصغر
خسرت، الرقم كان 19
~~~

ومرة كسبنا:

~~~text الناتج
خمّن (محاولة 1 من 5): اكتب رقم
خمّن (محاولة 1 من 5): أصغر
خمّن (محاولة 2 من 5): صح! في 2 محاولات
~~~

لاحظ إن الـ [[x]] مأكلتش محاولة: العداد فضل 1.

## الخلاصة

| الكلمة | بتعمل إيه |
|---|---|
| [[while cond:]] | لف طول ما الشرط صح (بيتفحص قبل كل لفة) |
| [[break]] | اخرج من أقرب loop |
| [[continue]] | روح للفة اللي بعدها |
| [[else]] بعد loop | بتشتغل لو الـ loop خلص من غير [[break]] |
| [[input()]] | بيقرا سطر ويرجّعه string دايمًا |

- [[for]] لما عندك حاجة تلف عليها، و [[while]] لما مش عارف هتلف كام مرة.
- اتأكد إن حاجة جوه الـ while بتغيّر الشرط، أو فيه [[break]] أكيد.`,
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
          teach: R`## المثال بيعمل إيه؟

٣ استخدامات لـ [[match]]: دالة بتفهم أوامر نصية زي [["go north"]] من **شكل** الـ list، ودالة بتفهم events على شكل dict، و [[match]] بسيط على كود HTTP زي switch. اتشغّل على ويندوز بـ Python 3.14.3 وفي Docker بـ [[python:3.13-slim]] ([[match]] محتاج 3.10 أو أحدث)، والناتج:

~~~text الناتج
رايح north خدت key, lamp باي مفيش أمر
طلب كبير 1500
غلطة من العميل 404
~~~

الفكرة: [[match قيمة:]] وتحته [[case شكل:]]. Python بيجرّب الـ cases من فوق لتحت، **وأول واحد يطابق بيشتغل** والباقي بيتساب. ولو ولا واحد طابق، مبيحصلش حاجة (من غير error).

---

## ١. [[handle(cmd)]]: أوامر نصية

~~~python
def handle(cmd: str) -> str:
    match cmd.split():
~~~

[[cmd.split()]] من غير باراميتر بتقطّع النص عند المسافات: [["go north"]] بتبقى [[['go', 'north']]]، و [[""]] بتبقى [[[]]] (list فاضية). فإحنا بنعمل match على **list كلمات**.

### [[case ["go", direction]:]]

pattern على شكل list من **عنصرين بالظبط**:

- [["go"]] نص ثابت (literal): لازم أول عنصر يساوي [["go"]].
- [[direction]] اسم عادي، وده اسمه **capture**: بيطابق أي قيمة، وبيحطها في متغير بالاسم ده.

[["go north"]] طابقت، و [[direction]] بقى [['north']]، فرجّعت [[رايح north]]. أما [["go"]] لوحدها (عنصر واحد) مطابقتش، ووصلت للـ [[_]] في الآخر: [[مش فاهم: go]].

### [[case ["take", *items] if items:]]

- [[*items]] بيلم **كل الباقي** في list، حتى لو مفيش (زي [[*rest]] في الـ unpacking).
- [[if items]] بعد الـ pattern اسمها **guard**: شرط زيادة بيتفحص بعد ما الشكل يطابق. هنا معناه «لازم يكون فيه حاجة اتاخدت».
- [["take key lamp"]]: [[items]] بقت [[['key', 'lamp']]]، و [[', '.join(items)]] لزقتهم: [[خدت key, lamp]].
- [["take"]] لوحدها: الشكل طابق و [[items]] فاضية، والـ guard رفض، فكمّل لتحت ووصل [[مش فاهم: take]].

### [[case ["quit" | "exit"]:]]

[[|]] جوه الـ pattern معناها «أو»: list من عنصر واحد يا [["quit"]] يا [["exit"]]. [["exit"]] رجّعت [[باي]]. و [["quit now"]] (عنصرين) مطابقتش.

### [[case []:]] و [[case _:]]

- [[[]]]: list فاضية، وده اللي طلع من [[""]]: [[مفيش أمر]].
- [[_]] **wildcard**: بيطابق أي حاجة ومبيحطهاش في متغير. ده الـ default، ولازم يبقى آخر واحد.

---

## ٢. [[describe(event)]]: events على شكل dict

~~~python
case {"type": "order", "total": int(total)} if total > 1000:
~~~

ده **mapping pattern**: الـ dict لازم يكون فيه المفاتيح دي.

| الحتة | معناها |
|---|---|
| [["type": "order"]] | المفتاح [["type"]] قيمته لازم [["order"]] |
| [["total": int(total)]] | المفتاح [["total"]] لازم قيمته **من نوع int**، وتتحط في [[total]] |
| [[if total > 1000]] | guard |

و [[int(total)]] هنا مش تحويل لـ int، ده **class pattern**: «طابق لو القيمة int». جرّبناها:

| الـ event | الناتج |
|---|---|
| [[{"type": "order", "total": 1500, "user": 7}]] | [[طلب كبير 1500]] (المفتاح الزيادة [["user"]] مش مشكلة) |
| [[{"type": "order", "total": 50}]] | [[طلب 50]]: الـ guard رفض، فنزل للـ case اللي بعده |
| [[{"type": "order", "total": 1500.0}]] | [[طلب 1500.0]]: float مش int، فأول case مطابقش |
| [[{"type": "refund", "id": "A7"}]] | [[استرجاع A7]] |
| [[{"type": "refund", "id": 7}]] | [[حدث مش معروف]]: [[str(oid)]] بيشترط string |

---

## ٣. switch عادي: [[match status]]

~~~python
status = 404
match status:
    case 200 | 201:
        print("تمام")
    case 400 | 404 as code:
        print("غلطة من العميل", code)
    case _:
        print("حاجة تانية")
~~~

- [[200 | 201]]: يا ده يا ده.
- [[as code]]: حط القيمة اللي طابقت في [[code]]، عشان تعرف أنهي واحدة فيهم.

~~~text الناتج
غلطة من العميل 404
~~~

---

## الفخ: اسم ثابت في الـ case

الاسم العادي في الـ case **دايمًا capture**، مش مقارنة بمتغير. جرّبنا:

~~~python
NOT_FOUND = 404
match 200:
    case NOT_FOUND:
        print("matched", NOT_FOUND)
~~~

~~~text الناتج
matched 200
~~~

طابقت 200، وكمان غيّرت [[NOT_FOUND]] لـ 200! ولو بعدها cases تانية، Python بيرفض يشغّل الملف أصلًا:

~~~text الناتج
SyntaxError: name capture 'NOT_FOUND' makes remaining patterns unreachable
~~~

عشان تقارن بثابت لازم اسم فيه نقطة، زي [[case Status.NOT_FOUND:]] (درس «Enum»).

---

## الحل: [[route(method, path)]]

~~~text سطور من الحل
match method.upper(), path.strip("/").split("/"):
    case "GET", ["users"]:
    case "GET", ["users", uid] if uid.isdigit():
    ...
    case _, ["users", *_]:
~~~

- الـ match هنا على **tuple** من حاجتين: الـ method بحروف كبيرة، والـ path من غير [[/]] الأطراف ومقطّع عند [[/]]. فـ [[("get", "/users/7/")]] بتبقى [[("GET", ["users", "7"])]].
- [[uid]] capture، والـ guard [[uid.isdigit()]] هو اللي بيتأكد إنه أرقام. و [[uid]] لسه string، فـ [[int(uid)]] بتحوّله.
- [[_, ["users", *_]]]: أي method، وأي path يبدأ بـ users. بييجي بعد الخاص عشان ميمسكش قبله.

~~~text الناتج
GET /users -> list users
get /users/7/ -> show user 7
POST /users -> create user
DELETE /users/abc -> 405 or 404
GET /orders -> 404 not found
~~~

## الخلاصة

| الـ pattern | بيطابق |
|---|---|
| [[200]] و [["go"]] | القيمة دي بالظبط (literal) |
| [[direction]] | أي حاجة، وتتحط في الاسم (capture) |
| [[_]] | أي حاجة، من غير اسم (wildcard) |
| [[a | b]] | واحد من الاتنين |
| [[[x, y]]] و [[[x, *rest]]] | list بالشكل ده (sequence) |
| [[{"k": v}]] | dict فيه المفتاح ده، والزيادة مقبولة (mapping) |
| [[int(x)]] و [[str(x)]] | قيمة من النوع ده (class) |
| [[... if cond]] | guard: شرط زيادة |
| [[... as name]] | اسم للحتة اللي طابقت |

- أول case يطابق بيكسب، فالخاص قبل العام، و [[case _:]] في الآخر.
- اسم من غير نقطة = capture مش مقارنة.
- الـ string مبتطابقش sequence pattern: [[match "go"]] مع [[case [*chars]:]] مطابقتش (جرّبناها).`,
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
          teach: R`## المثال بيعمل إيه؟

المثال هو تمرين ٢ محلول: دالة بتجمع أرقام عدد ([[9045]] تبقى 9+0+4+5 = 18)، وتحتها ٣ اختبارات بـ [[assert]]. ده نفس الشكل اللي هتكتب بيه العشر تمارين: دالة، وتحتها asserts، وفي الآخر رسالة. اتشغّل على ويندوز بـ Python 3.14.3 وفي Docker بـ [[python:3.13-slim]]:

~~~text الناتج
كل الاختبارات عدّت
~~~

---

## ١. الدالة سطر سطر

~~~python
def sum_digits(n: int) -> int:
    total = 0
    for ch in str(abs(n)):
        total += int(ch)
    return total
~~~

### [[def sum_digits(n: int) -> int:]]

[[def]] بتعرّف دالة اسمها [[sum_digits]]، بتاخد [[n]] (المفروض int) وبترجع int (درس «type hints»).

### [[total = 0]]

المجموع بيبدأ من صفر، وكل رقم هيتزوّد عليه.

### [[for ch in str(abs(n)):]]

نفكّها من جوه:

| الخطوة | الكود | مع [[n = -12]] |
|---|---|---|
| ١ | [[abs(n)]] | القيمة المطلقة (من غير سالب): [[12]] |
| ٢ | [[str(...)]] | حوّل الرقم لنص: [['12']] |
| ٣ | [[for ch in ...]] | لف على النص حرف حرف: [['1']] ثم [['2']] |

ليه نحوّل لنص؟ عشان الرقم مش بيتلف عليه، والنص بيتلف حرف حرف: [[list(str(9045))]] طلّعت [[['9', '0', '4', '5']]].

### [[total += int(ch)]]

[[ch]] لسه نص ([['9']])، و [[int(ch)]] بيرجّعه رقم عشان يتجمع. ومع 9045: 0 → 9 → 9 → 13 → **18**.

### [[return total]]

الدالة بترجع المجموع للي ناداها.

### ليه [[abs]] مهمة؟

شيلناها وجرّبنا [[sum_digits(-12)]]: [[str(-12)]] بقت [['-12']]، وأول حرف [['-']]، و [[int('-')]] وقّعت البرنامج:

~~~text الناتج (Docker)
Traceback (most recent call last):
  File "/app/digits.py", line 9, in <module>
    assert sum_digits(-12) == 3, "السالب كمان"
           ~~~~~~~~~~^^^^^
  File "/app/digits.py", line 4, in sum_digits
    total += int(ch)
             ~~~^^^^
ValueError: invalid literal for int() with base 10: '-'
~~~

الـ traceback بيتقري من فوق لتحت: السطر 9 نادى الدالة، وجوه الدالة السطر 4 هو اللي وقع. و [[base 10]] يعني «كنت متوقع رقم عشري عادي».

---

## ٢. [[assert]]: الاختبار

~~~python
assert sum_digits(9045) == 18
assert sum_digits(0) == 0
assert sum_digits(-12) == 3, "السالب كمان"
print("كل الاختبارات عدّت")
~~~

[[assert شرط]] معناها «أنا متأكد إن ده صح». لو صح، مبيحصلش حاجة خالص وبيكمّل. لو غلط، البرنامج **بيقف** بـ [[AssertionError]]. جرّبنا دالة غلط بترجع 0 دايمًا:

~~~text الناتج (Docker)
Traceback (most recent call last):
  File "/app/digits2.py", line 3, in <module>
    assert sum_digits(9045) == 18
           ^^^^^^^^^^^^^^^^^^^^^^
AssertionError
~~~

والنص بعد الفاصلة ([[, "السالب كمان"]]) بيظهر مع الـ error لو وقع: [[AssertionError: السالب كمان]]. فاكتب فيه الحالة اللي بتختبرها.

والـ ٣ اختبارات مش عشوائية: حالة عادية ([[9045]])، وحد ([[0]])، وحالة صعبة ([[-12]]). أغلب الـ bugs في الحدود. و [[print]] في الآخر مش هيتطبع غير لو كل اللي فوقه عدّى.

> [[python -O]] (O = optimize) بيشيل الـ asserts خالص: جرّبنا ملف فيه assert غلط، و [[python -O]] طبع اللي بعده عادي. عشان كده [[assert]] للاختبارات بس، مش لفحص داتا جاية من مستخدم.

---

## ٣. أفكار الحل الكامل

الحل الكامل تحت «جرّب»، وعدّى عندنا وطبع [[العشرة عدّوا]] على الاتنين. ده أهم حاجة في كل واحد، وجنبها ناتج حقيقي:

| # | الفكرة | ناتج جرّبناه |
|---|---|---|
| ١ | [[i % 15 == 0]] **الأول**، وبعده 3 و 5 | آخر عنصر في [[fizzbuzz(15)]] هو [['FizzBuzz']] |
| ٢ | [[str(abs(n))]] | المثال فوق |
| ٣ | [[sum(1 for ch in s.lower() if ch in "aeiou")]]: عدّ 1 لكل حرف متحرك | [[count_vowels("FastAPI is fun")]] = 5 |
| ٤ | [[best = nums[0]]] مش 0 | [[largest([-5, -2])]] = -2 |
| ٥ | [[ch.isalnum()]] حرف أو رقم، و [[[::-1]]] العكس | [["Was it a car"]] بقت [[['w', 'a', 's', 'i', 't', 'a', 'c', 'a', 'r']]] |
| ٦ | [[split()]] من غير باراميتر | [["  python  is   fun ".split()]] = [[['python', 'is', 'fun']]]، أما [[split(" ")]] طلّعت strings فاضية كتير |
| ٧ | [[first]] و [[second]] بيبدأوا [[None]] | [[second_largest([5, 9, 9, 3])]] = 5، بينما [[sorted(...)[-2]]] = 9 غلط |
| ٨ | [[counts.get(word, 0) + 1]] و [[max(counts, key=counts.get)]] | [[('the', 3)]] |
| ٩ | [[while i * i <= n]]: كفاية لحد الجذر | [[[2, 3, 5, 7, 11, 13, 17, 19, 23, 29]]] |
| ١٠ | dict [[seen]] فيه كل رقم شفته ومكانه | [[two_sum([2, 7, 11, 15], 9)]] = [[(0, 1)]] |

### تمرين ٧ لفة لفة

~~~python
first = second = None
for n in nums:
    if first is None or n > first:
        first, second = n, first
    elif n != first and (second is None or n > second):
        second = n
~~~

- [[first = second = None]]: الاتنين [[None]] (لسه مشفناش حاجة).
- [[first, second = n, first]]: الرقم الجديد بقى الأكبر، والأكبر القديم نزل تاني. اليمين بيتحسب كله **قبل** التعيين، فمش محتاج متغير مؤقت.
- [[n != first]] هي اللي بتمنع التكرار: الـ 9 التانية مش بتبقى «تاني أكبر».

طبعنا القيم بعد كل لفة مع [[[5, 9, 9, 3]]]:

~~~text الناتج: n first second
5 5 None
9 9 5
9 9 5
3 9 5
~~~

### تمرين ١٠ لفة لفة

لكل رقم [[n]] بنسأل: «المكمّل بتاعه [[target - n]] شفته قبل كده؟». الـ [[in]] على dict سريعة (O(1))، فاللفة الواحدة كفاية:

~~~text الناتج: i n target-n seen
0 2 7 {}
1 7 2 {2: 0}
~~~

في اللفة التانية المكمّل 2 موجود في [[seen]] في المكان 0، فالإجابة [[(0, 1)]].

## الخلاصة

- اكتب الدالة، وتحتها asserts للحالة العادية والحدود (صفر، فاضي، سالب، تكرار).
- [[assert cond, "رسالة"]]: لو غلط بيوقف بـ [[AssertionError]] والرسالة.
- الـ traceback بيتقري من تحت: آخر سطر نوع الغلطة، وفوقه السطر اللي وقع.
- حاول تحل الأول. الحل جاهز تحت «جرّب» لما تخلص.`,
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
    }
]);

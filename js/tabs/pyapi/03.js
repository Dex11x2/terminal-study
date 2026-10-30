// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "lists و dicts و sets",
      l: 1,
      n: "الليستات والقواميس والمجموعات، وإمتى كل واحدة، والـ comprehensions",
      time: R`حوالي ٥ ساعات (٤ دروس)`,
      goal: [
        R`تختار الـ collection الصح: list للترتيب، و dict للبحث بمفتاح، و set للتكرار والعضوية، و tuple للقيم الثابتة.`,
        R`تستخدم أهم الـ methods لكل نوع، وتعرف أنهي بيعدّل مكانه وأنهي بيرجّع جديد، وأنهي بيرمي خطأ وأنهي بيرجّع قيمة بديلة.`,
        R`ترتّب وتجمّع وتعدّ داتا شكلها زي رد API بـ [[sorted]] و [[key]] و [[defaultdict]] و [[Counter]].`,
        R`تكتب comprehensions واضحة، وتعرف إمتى loop عادية أحسن، وتقيس الفرق بين [[in]] على list و set بنفسك.`,
      ],
      use: {
        prog: R`أي رد JSON في Python هو list فيها dicts. كل الشغل على الداتا (فلتر، وترتيب، وتجميع، وعدّ) بيعدّي على الدرس ده.`,
        cs: R`dict و set مبنيين على hash table فالبحث O(1)، و list array فالبحث O(n). اتقاس في الدروس: [[in]] على set أسرع من list بحوالي ٢٦ ألف مرة على ١٠٠ ألف عنصر.`,
        work: R`شيل التكرار من إيميلات، وقارن قايمتين IDs، وجمّع طلبات بالعميل، وعدّ أكتر منتج اتباع: دي مهام يومية في أي backend أو سكربت تقارير.`,
      },
      projects: [
        { lvl: 'صغير', t: R`عدّاد كلمات`, what: R`سكربت بياخد فقرة نص (متحطة في متغير)، وينضّفها من العلامات، ويطبع أكتر ١٠ كلمات تكرارًا وعددهم، مرة بـ dict و [[get]] ومرة بـ [[Counter]]. من درس «dict» و «strings: index و slicing و methods».`, done: R`النسختين بيطلّعوا نفس الأرقام ([[assert]] بتقارنهم)، والكلمات بحروف صغيرة ([[The]] و [[the]] واحد)، و [[python,]] بالفاصلة بتتعد [[python]].` },
        { lvl: 'صغير', t: R`منضّف قايمة إيميلات`, what: R`list فيها ٢٠ إيميل بتكرار وحروف كبيرة ومسافات. طلّع list من غير تكرار **بنفس الترتيب الأصلي**، وعدد اللي اتشال، والـ domains الموجودة. من درس «set و tuple» و «comprehensions».`, done: R`[[" Sara@X.com"]] و [["sara@x.com"]] بيتحسبوا واحد، والترتيب زي أول ظهور (بـ [[dict.fromkeys]] مش [[set]])، والـ domains في set مترتبة بـ [[sorted]].` },
        { lvl: 'متوسط', t: R`دفتر تليفونات في الترمنال`, what: R`dict الاسم ← list أرقام، و loop أوامر: [[add]] و [[find]] (بجزء من الاسم ومن غير حالة حروف) و [[del]] و [[list]] (مترتبة بالاسم). من درس «dict» و «match و case» و «while و break و continue».`, done: R`[[find sa]] بتلاقي [[Sara]] و [[Hassan]]، والرقم المكرر لنفس الشخص مش بيتضاف مرتين، و [[del]] لاسم مش موجود بيطلّع رسالة من غير [[KeyError]]، و [[list]] مترتبة.` },
        { lvl: 'متوسط', t: R`تقرير مبيعات من رد API`, what: R`list فيها ٣٠ طلب كـ dicts ([[customer]] و [[items]] list فيها [[sku]] و [[qty]] و [[price]]). اطبع: إجمالي كل عميل مترتب من الأعلى، وأكتر ٣ منتجات بالكمية، والعملاء اللي طلبوا أكتر من مرة. من كل دروس الوحدة.`, done: R`الأرقام بتطابق حسبة يدوية لـ ٣ عملاء، والتجميع بـ [[defaultdict]] والعدّ بـ [[Counter]]، ومفيش [[for]] جوه [[for]] جوه [[for]] (أقصى مستويين)، والطلب اللي [[items]] بتاعه فاضي مش بيوقّع حاجة.` },
        { lvl: 'كبير', t: R`مدير مصاريف في الترمنال`, what: R`أداة بتسجّل مصاريف (المبلغ بـ [[Decimal]]، والفئة، والوصف) في list من dicts، بأوامر: [[add 120.50 food غدا]] و [[report]] (إجمالي كل فئة ونسبتها مترتبة) و [[top 3]] و [[undo]] و [[cats]] (الفئات بـ set). وكل إدخال بيتفحص: المبلغ رقم موجب، والفئة من list مسموحة. ومعاها [[test_expenses.py]] بـ [[assert]] على دوال الحساب بس (منفصلة عن الـ input). من كل دروس الوحدات اللي فاتت.`, done: R`[[add -5 food]] و [[add abc food]] و [[add 10 unknown]] بيترفضوا برسالة مختلفة لكل سبب، و [[report]] مجموع النسب فيه [[100.0%]]، و [[undo]] على قايمة فاضية مبيوقعش، والاختبارات (١٢ assert على الأقل) بتعدّي، ونفس سلسلة الأوامر بالـ pipe بتطلّع نفس الناتج في التشغيل الأول والتاني.`, ext: R`لما توصل لوحدة «الأخطاء و with» ودرس «csv و json»: احفظ المصاريف في JSON وحمّلها لما الأداة تفتح، وضيف [[export csv]] وفلتر بالشهر.` },
        { lvl: 'فكرة', t: R`قارن قايمتين من شغلك`, what: R`خد قايمتين حقيقيتين الشكل من أي حتة (اشتراكات قديمة وجديدة، أو منتجات في المخزن وفي الموقع، أو حضور أسبوعين) واكتب أداة بتقول: الجديد، والممسوح، والمشترك، واللي اتغيّرت قيمته. انت اللي بتحدد المفتاح.`, done: R`الأداة بتشتغل على قايمتين فيهم ١٠٠ عنصر على الأقل، والنتايج الأربعة صح بحسبة يدوية على ٥ عناصر، والمفتاح (زي الإيميل بحروف صغيرة) متنضّف قبل المقارنة.`, ext: R`خليها تقرا من ملفين CSV (درس «csv و json») وتطبع التقرير جدول، وضيف خيار يطلّع الفرق كملف.` },
      ],
      items: [
        {
          cmd: "list",
          title: "ليستة: تضيف وتقطع وترتّب",
          learn: R`تضيف وتشيل وتدوّر وتقطّع وترتّب في list، وتستخدم [[sorted]] و [[max]] بـ [[key]]، وتعرف تكلفة كل عملية.`,
          out: R`ترتيب وفلترة وpagination لأي list من dicts، ومش هتستخدم [[pop(0)]] ولا [[in]] على list كبيرة جوه loop.`,
          use: {
            prog: R`الـ list هي الشكل الأساسي لأي «مجموعة حاجات بترتيب»: صفوف من القاعدة، ونتايج بحث، وطابور شغل.`,
            cs: R`الـ list في CPython array من pointers: الـ index O(1)، و [[append]] O(1)، و [[insert(0)]] و [[pop(0)]] و [[in]] O(n). اتقاسوا تحت.`,
          },
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
          teach: R`## المثال بيعمل إيه؟

بيشتغل على list فيها مستخدمين (كل واحد dict فيه اسم وسن)، زي رد API بالظبط: يضيف، ويوصل لأول وآخر عنصر، ويقطع، ويرتّب بالسن، ويجيب الأكبر، ويلف، ويعمل pagination. اتشغّل على ويندوز بـ Python 3.14.3 وفي Docker بـ [[python:3.13-slim]]، ونفس الناتج.

---

## ١. [[users = [{...}, {...}]]] و [[append]]

~~~python
users = [{"name": "Sara", "age": 27}, {"name": "Omar", "age": 31}]
users.append({"name": "Ali", "age": 22})
~~~

- [[[ ... ]]] list، وعناصرها مفصولة بـ [[,]].
- كل عنصر [[{"name": ..., "age": ...}]] dict (درس «dict» الجاي): مفتاح وقيمة.
- [[.append(x)]] بتضيف [[x]] في **آخر** الـ list، وبتعدّلها مكانها. دلوقتي فيها ٣.

---

## ٢. الـ index: [[users[0]["name"]]] و [[users[-1]["name"]]]

~~~python
print(users[0]["name"], users[-1]["name"])
~~~

نقراها من الشمال:

| الحتة | النتيجة |
|---|---|
| [[users[0]]] | أول عنصر (العد بيبدأ من **0**): dict بتاع Sara |
| [[["name"]]] بعدها | من الـ dict ده، قيمة المفتاح [["name"]]: [['Sara']] |
| [[users[-1]]] | الأرقام السالبة من الآخر: [[-1]] آخر عنصر، Ali |

~~~text الناتج
Sara Ali
~~~

ولو طلبت index مش موجود: [[users[5]]] بترمي [[IndexError: list index out of range]].

---

## ٣. الـ slicing: [[users[:2]]]

~~~python
first_two = users[:2]
~~~

[[a[start:stop]]] بيرجع list **جديدة** من [[start]] لحد **قبل** [[stop]] (زي [[range]]). ولو سبت [[start]] فاضي يبقى من الأول، ولو سبت [[stop]] فاضي يبقى لحد الآخر.

~~~text الناتج: [u["name"] for u in first_two]
['Sara', 'Omar']
~~~

وفيه رقم تالت اختياري للخطوة: [[[1, 2, 3, 4, 5][::2]]] طلّعت [[[1, 3, 5]]]، و [[[::-1]]] بتعكس. والـ slice مبيرميش error لو برّه الحدود: [[users[10:20]]] رجّعت [[[]]].

---

## ٤. [[sorted]] و [[max]] بـ [[key]]

~~~python
by_age = sorted(users, key=lambda u: u["age"])
oldest = max(users, key=lambda u: u["age"])
~~~

### [[lambda u: u["age"]]]

[[lambda]] دالة صغيرة من غير اسم في سطر واحد. اللي قبل [[:]] الباراميتر ([[u]])، واللي بعدها القيمة اللي بترجعها. يعني «إديني مستخدم، أرجّعلك سنه». جرّبناها لوحدها على Sara: رجّعت [[27]].

### [[key=]]

[[sorted]] و [[max]] بينادوا الدالة دي على كل عنصر، ويرتّبوا أو يقارنوا **بالناتج** بتاعها مش بالعنصر نفسه. يعني بيقارنوا 27 و 31 و 22.

~~~text الناتج: أسماء by_age، ثم oldest، ثم أسماء users
['Ali', 'Sara', 'Omar']
{'name': 'Omar', 'age': 31}
['Sara', 'Omar', 'Ali']
~~~

- [[sorted]] رجّعت list جديدة مترتبة من الأصغر، و [[users]] نفسها زي ما هي.
- [[max]] جابت العنصر كله اللي سنه أكبر، من غير ما ترتّب.

ومن غير [[key]] Python ميعرفش يقارن dict بـ dict:

~~~text الناتج: sorted(users)
TypeError: '<' not supported between instances of 'dict' and 'dict'
~~~

---

## ٥. [[enumerate]] و [[zip]]

~~~python
for i, u in enumerate(users, start=1):
    print(i, u["name"])
for name, score in zip(["a", "b"], [90, 80]):
    print(name, score)
~~~

[[enumerate]] بيدّيك الرقم مع العنصر، و [[zip]] بيلف على ليستتين مع بعض (اتشرحوا بالتفصيل في درس «for و range»):

~~~text الناتج
1 Sara
2 Omar
3 Ali
a 90
b 80
~~~

---

## ٦. pagination بالـ slicing

~~~python
page, size = 2, 20
chunk = users[(page - 1) * size : page * size]
~~~

| الحتة | الحساب | القيمة |
|---|---|---|
| [[(page - 1) * size]] | (2 - 1) × 20 | 20 |
| [[page * size]] | 2 × 20 | 40 |
| [[users[20:40]]] | العناصر من 20 لحد 39 | |

ده نفس اللي بيحصل في API لما تطلب [[?page=2&size=20]]: الصفحة الأولى 0 لـ 19، والتانية 20 لـ 39. وعندنا ٣ مستخدمين بس، فـ [[chunk]] طلعت [[[]]] فاضية من غير error.

---

## اللي في «جرّب»

~~~python
by_name_desc = sorted(users, key=lambda u: u["name"], reverse=True)
print([u["name"] for u in by_name_desc])
print([u["name"] for u in users if u["age"] > 25])
~~~

- [[reverse=True]] بيعكس الترتيب (من الكبير للصغير). والنصوص بتترتب أبجديًا.
- [[[u["name"] for u in ... if ...]]] list comprehension (درس «comprehensions»): «اسم كل مستخدم سنه فوق 25».

~~~text الناتج
['Sara', 'Omar', 'Ali']
['Sara', 'Omar']
~~~

وخد بالك: [[x = users.sort(key=...)]] بتخلّي [[x]] = [[None]] (جرّبناها)، لأن [[.sort()]] بتعدّل مكانها ومبترجعش حاجة.

## ٧. methods الـ list اللي هتحتاجها (اتشغّل فعلًا)

~~~python
a = [1, 2]
a.append([3, 4])
print(a)
b = [1, 2]
b.extend([3, 4])
print(b)
b.insert(0, 0)
last = b.pop()
first = b.pop(0)
print(b, last, first)
c = ["x", "y", "x"]
c.remove("x")
print(c, c.index("y"), c.count("x"))
d = [0, 1, 2, 3, 4, 5]
d[1:3] = ["a"]
del d[0]
print(d)
~~~

~~~text الناتج (3.14.3)
[1, 2, [3, 4]]
[1, 2, 3, 4]
[1, 2, 3] 4 0
['y', 'x'] 0 1
['a', 3, 4, 5]
~~~

| الـ method | بتعمل إيه | لو مش موجود |
|---|---|---|
| [[append(x)]] | بتضيف [[x]] كعنصر **واحد** في الآخر، حتى لو [[x]] list | — |
| [[extend(xs)]] | بتضيف **كل** عناصر [[xs]] في الآخر (زي [[+=]]) | — |
| [[insert(i, x)]] | بتحط [[x]] في المكان [[i]] وتزق الباقي (O(n)) | — |
| [[pop()]] و [[pop(i)]] | بتشيل الأخير أو اللي في [[i]] **وترجّعه** | [[IndexError: pop from empty list]] |
| [[remove(x)]] | بتشيل **أول** [[x]] بس | [[ValueError: list.remove(x): x not in list]] |
| [[index(x)]] | مكان أول [[x]] | [[ValueError: list.index(x): x not in list]] |
| [[count(x)]] | كام مرة [[x]] موجود | بترجّع [[0]] |
| [[d[1:3] = [...]]] | بتبدّل جزء بجزء (ممكن طول مختلف) | — |
| [[del d[i]]] | بتمسح بالمكان من غير ما ترجّع | [[IndexError]] |

> خد بالك: [[print(b, b.pop())]] في سطر واحد بيطبع [[b]] **بعد** الـ pop، لأن كل الـ arguments بتتحسب قبل ما [[print]] تشتغل. عشان كده فصلناهم في المثال.

---

## ٨. اتشغّل فعلًا: تكلفة [[in]] و [[pop(0)]]

قسنا بـ [[python -m timeit]] على list فيها ١٠٠ ألف عنصر (ويندوز، 3.14.3):

| العملية | list | البديل |
|---|---|---|
| [[99999 in x]] | [[668 usec]] | set: [[25.6 nsec]] |
| [[x.pop(0)]] وبعدين [[append]] | [[11.5 usec]] | [[deque.popleft()]]: [[33.6 nsec]] |

[[in]] على list بيلف عنصر عنصر لحد ما يلاقي (O(n))، فلو بتسأل «موجود؟» جوه loop على list كبيرة، حوّلها set مرة واحدة الأول. و [[pop(0)]] بيزق كل العناصر خطوة، فلو عايز طابور (أول داخل أول خارج) استخدم [[collections.deque]] (درس «collections»).

---

## ٩. ترتيب على معيارين

~~~python
users = [{"name": "Sara", "age": 27}, {"name": "Omar", "age": 31}, {"name": "Ali", "age": 27}]
print([u["name"] for u in sorted(users, key=lambda u: (u["age"], u["name"]))])
print([u["name"] for u in sorted(users, key=lambda u: (-u["age"], u["name"]))])
~~~

~~~text الناتج
['Ali', 'Sara', 'Omar']
['Omar', 'Ali', 'Sara']
~~~

الـ [[key]] بيرجّع tuple، و Python بيقارن الـ tuples عنصر عنصر: السن الأول، ولو متساوي الاسم. و [[-u["age"]]] بتعكس السن بس (تنازلي) والاسم يفضل تصاعدي. و [[sorted]] stable: العناصر اللي مفتاحها واحد بتفضل بترتيبها الأصلي.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تضيف في الآخر | [[items.append(x)]] |
| أول / آخر عنصر | [[items[0]]] / [[items[-1]]] |
| حتة | [[items[start:stop]]] والـ stop مش داخل |
| ترتيب جديد | [[sorted(items, key=..., reverse=...)]] |
| ترتيب مكانها | [[items.sort(...)]] وبترجع [[None]] |
| الأكبر بمعيار | [[max(items, key=...)]] |

- [[in]] على list بيلف على الكل (O(n)). لو هتسأل «موجود؟» كتير، استخدم set.`,
          lines: [
            R`list فيها dicts، كل dict يوزر بـ [[name]] و [[age]]. ده نفس شكل أي رد JSON من API بعد ما يتفك في Python.`,
            R`[[append]] بتضيف العنصر في **آخر** الـ list وبتعدّلها مكانها وبترجّع [[None]]، وتكلفتها ثابتة (O(1)) مهما كانت الـ list كبيرة.`,
            R`[[users[0]]] أول عنصر و [[users[-1]]] آخر عنصر، وبعدها [[["name"]]] بتجيب الاسم من الـ dict. الناتج [[Sara Ali]]. و index برّه الحدود بيرمي [[IndexError: list index out of range]].`,
            R`[[users[:2]]] slice من الأول لحد **قبل** 2، يعني أول عنصرين في list **جديدة** (نسخة سطحية). الـ slice مبيرميش خطأ لو طلبت أكتر من الموجود.`,
            R`[[sorted]] بترجّع list جديدة مترتبة والأصل زي ما هو، و [[key=lambda u: u["age"]]] بتقول «رتّب بالسن». من غير [[key]] هيطلع [[TypeError]] لأن Python ميعرفش يقارن dicts.`,
            R`[[max]] بنفس الـ [[key]] بترجّع **العنصر** صاحب أكبر سن (الـ dict كله، مش الرقم)، ومن غير ما ترتّب الـ list كلها، فهي O(n) بدل O(n log n).`,
            R`[[enumerate(users, start=1)]] بيدّيك الرقم مع العنصر، والعد بيبدأ من 1 عشان العرض للناس. بدل [[range(len(users))]].`,
            R`بيطبع [[1 Sara]] و [[2 Omar]] و [[3 Ali]]: رقم كل يوزر واسمه.`,
            R`[[zip]] بيلف على list الأسماء و list الدرجات مع بعض، وكل لفة زوج [[(name, score)]].`,
            R`بيطبع [[a 90]] ثم [[b 80]]: كل اسم جنب درجته، لأن [[zip]] بيمشي على الليستتين بنفس المكان.`,
            R`رقم الصفحة وحجمها، زي [[?page=2&size=20]] في API.`,
            R`pagination بالـ slicing: الصفحة ٢ بحجم ٢٠ = العناصر من [[20]] لحد قبل [[40]]. ولو الصفحة برّه الداتا، الـ slice بيرجّع [[[]]] من غير خطأ، فاللي بيطلب بيعرف إن الصفحات خلصت.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**افتكر:** لكل واحدة اكتب الـ method وهي بترجّع إيه: تضيف list كاملة في الآخر عنصر عنصر، وتشيل آخر عنصر وتاخده، وتشيل أول [["x"]]، وتعرف مكان [["y"]]، وترتّب مكانها، وترتّب في نسخة.`, done: R`كتبت [[extend]] ([[None]]) و [[pop()]] (العنصر) و [[remove("x")]] ([[None]]) و [[index("y")]] (رقم) و [[sort()]] ([[None]]) و [[sorted()]] (list جديدة)، وجرّبتهم.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[a = [1, 2]]] ثم [[a.append([3])]] ثم [[a.extend([4, 5])]] ثم [[a += "67"]] ثم [[print(a, len(a))]].`, done: R`توقعت [[[1, 2, [3], 4, 5, '6', '7'] 7]]: [[append]] حطت list كعنصر واحد، و [[+=]] بنص بتلف عليه حرف حرف زي [[extend]]. وشغّلته وطابق.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[top = users.sort(key=lambda u: u["age"])[-1]]] بيقع، و [[if "omar" in names_list]] جوه loop على ٥٠ ألف طلب بطيء. صلّح الاتنين.`, done: R`الأول خطأه [[TypeError: 'NoneType' object is not subscriptable]] واتصلح بـ [[max(users, key=...)]]، والتاني بقى [[names = set(names_list)]] قبل الـ loop، وقست الفرق بـ [[time.perf_counter]] قبل وبعد.` },
            { lvl: 'تطبيق', t: R`**مسألة:** [[paginate(items, page, size)]] بترجّع dict فيه [[items]] و [[page]] و [[pages]] (عدد الصفحات) و [[has_next]]، وترمي [[ValueError]] لو [[page]] أو [[size]] أقل من ١.`, done: R`على ٤٥ عنصر و [[size=20]]: الصفحة ١ فيها ٢٠ و [[has_next]] True، والصفحة ٣ فيها ٥ و [[has_next]] False، و [[pages]] = 3 (بـ [[-(-n // size)]] أو [[math.ceil]])، والصفحة ٤ بترجّع [[[]]]، و list فاضية [[pages]] = 0.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** عندك ١٠ منتجات كـ dicts فيها [[name]] و [[price]] و [[rating]]. رتّبهم بالتقييم تنازلي ولو متساوي بالسعر تصاعدي، وهات أرخص منتج تقييمه ٤ وفوق، وأغلى ٣.`, done: R`الترتيب بـ [[key=lambda p: (-p["rating"], p["price"])]] واتأكدت منه على منتجين ليهم نفس التقييم، والأرخص بـ [[min]] على list مفلترة، والأغلى ٣ بـ [[sorted(..., reverse=True)[:3]]]، و list مفيهاش تقييم ٤ بترجّع [[None]] مش خطأ.` },
            { lvl: 'تحدي', t: R`**محاكاة وقياس:** طابور مطعم: ١٠٠ ألف زبون بيدخلوا بـ [[append]] ويخرجوا من الأول. نفّذه بـ list و [[pop(0)]] وبـ [[deque]] و [[popleft()]]، وقيس الوقت الكلي بـ [[time.perf_counter]].`, done: R`النسختين خدموا الزباين بنفس الترتيب ([[assert]] على أول وآخر ٣)، وعندك الوقتين من جهازك، والـ deque أسرع بفرق كبير (عندنا [[11.5 usec]] مقابل [[33.6 nsec]] للعملية الواحدة)، وكتبت ليه.` },
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
          learn: R`تقرا وتكتب وتلف وتدمج في dict، وتعرف إمتى [[d[k]]] وإمتى [[get]]، وتجمّع بـ [[defaultdict]] وتعدّ بـ [[Counter]].`,
          out: R`تجميع وعدّ وفهرسة لأي داتا في سطرين، ومن غير [[KeyError]] مفاجئة في الإنتاج.`,
          use: {
            prog: R`الـ dict هو JSON في Python، وهو الفهرس اللي بتدوّر بيه بمفتاح في O(1) بدل ما تلف على list.`,
            work: R`إعدادات، وكاش، وتجميع طلبات بالعميل، وعدّ أخطاء اللوج بالنوع: كلها dict.`,
          },
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
          teach: R`## المثال بيعمل إيه؟

بيعمل dict لمستخدم، ويقرا منه بطريقتين، ويضيف مفتاح، ويلف عليه، ويدمج إعدادات، وفي الآخر بيجمّع طلبات حسب المستخدم بـ [[defaultdict]] ويعد الأصناف بـ [[Counter]]. اتشغّل على ويندوز بـ Python 3.14.3 وفي Docker بـ [[python:3.13-slim]]، ونفس الناتج.

---

## ١. [[from collections import Counter, defaultdict]]

[[collections]] موديول في المكتبة الأساسية فيه أنواع جاهزة. بنجيب منه اتنين هنستخدمهم في الآخر.

---

## ٢. [[user = {"id": 1, "name": "Sara", "role": "admin"}]]

- [[{ }]] بالأقواس المعووجة = **dict** (dictionary، قاموس).
- جواه أزواج [[مفتاح: قيمة]] مفصولين بـ [[,]]. المفاتيح هنا strings ([["id"]] و [["name"]] و [["role"]])، والقيم أي نوع.
- ده نفس شكل JSON، عشان كده هتقابله في كل API.

---

## ٣. القراية: [[user["name"]]] و [[user.get("phone", "مفيش")]]

~~~python
print(user["name"], user.get("phone", "مفيش"))
~~~

| الطريقة | لو المفتاح موجود | لو مش موجود |
|---|---|---|
| [[user["name"]]] | القيمة | **بترمي** [[KeyError]] |
| [[user.get("phone")]] | القيمة | [[None]] |
| [[user.get("phone", "مفيش")]] | القيمة | القيمة التانية اللي إديتها ([["مفيش"]]) |

~~~text الناتج
Sara مفيش
~~~

و [[user["phone"]]] (جرّبناها):

~~~text الناتج
KeyError: 'phone'
~~~

إمتى أنهي واحدة؟ الأقواس لما المفتاح **لازم** يبقى موجود (ولو مش موجود يبقى فيه bug وعايز تعرف). و [[get]] لما ممكن ميبقاش موجود عادي.

وعشان تسأل «المفتاح موجود؟»: [[in]]. [["name" in user]] طلعت [[True]]، و [["Sara" in user]] طلعت [[False]]، لأن [[in]] على dict بيدوّر في **المفاتيح** بس.

---

## ٤. [[user["email"] = "sara@example.com"]]

نفس الأقواس بس على شمال [[=]]: لو المفتاح مش موجود بيتضاف، ولو موجود قيمته بتتغير. الـ dict بقى:

~~~text الناتج
{'id': 1, 'name': 'Sara', 'role': 'admin', 'email': 'sara@example.com'}
~~~

لاحظ إن [['email']] جه في **الآخر**: الـ dict بيحافظ على ترتيب الإضافة (مضمون من Python 3.7).

---

## ٥. [[for key, value in user.items():]]

[[.items()]] بترجع أزواج (مفتاح، قيمة)، و [[key, value]] بيفكّوا كل زوج:

~~~text الناتج
id 1
name Sara
role admin
email sara@example.com
~~~

---

## ٦. الدمج: [[defaults | {"theme": "light"}]]

~~~python
defaults = {"lang": "ar", "theme": "dark"}
settings = defaults | {"theme": "light"}
~~~

[[|]] بين dictين (من Python 3.9) بيعمل dict **جديد** فيه مفاتيح الاتنين، ولو مفتاح موجود في الاتنين **اللي على اليمين بيكسب**:

~~~text الناتج: print(settings, defaults)
{'lang': 'ar', 'theme': 'light'} {'lang': 'ar', 'theme': 'dark'}
~~~

[[defaults]] نفسه متغيرش. ده الشكل المعتاد للإعدادات: افتراضي، وفوقه اللي المستخدم اختاره. والصيغة القديمة [[{**defaults, **{"theme": "light"}}]] طلّعت نفس الناتج ([[**]] بتفرد الـ dict جوه dict تاني).

---

## ٧. التجميع: [[defaultdict(list)]]

~~~python
orders = [("sara", "tea"), ("omar", "coffee"), ("sara", "tea")]
by_user = defaultdict(list)
for who, item in orders:
    by_user[who].append(item)
~~~

- [[orders]] list من tuples: كل واحدة (مين، طلب إيه).
- [[defaultdict(list)]] dict عادي بفرق واحد: لو طلبت مفتاح **مش موجود**، بيعمله لوحده بقيمة [[list()]] يعني [[[]]] فاضية، بدل [[KeyError]].
- فـ [[by_user["sara"]]] أول مرة بتعمل [[[]]]، و [[.append("tea")]] بتضيف فيها. من غيره كنت هتكتب [[if who not in by_user: by_user[who] = []]] كل لفة.

~~~text الناتج: print(by_user)
defaultdict(<class 'list'>, {'sara': ['tea', 'tea'], 'omar': ['coffee']})
~~~

وخد بالك: حتى **القراية** بتضيف المفتاح. [[by_user["nobody"]]] رجّعت [[[]]]، وبعدها [[len(by_user)]] بقت 3.

---

## ٨. العد: [[Counter(...).most_common(1)]]

~~~python
print(Counter(item for _, item in orders).most_common(1))
~~~

من جوه لبرّه:

1. [[item for _, item in orders]]: generator expression (درس «comprehensions») بيطلّع الصنف بس من كل طلب. و [[_]] اسم متعارف عليه لقيمة مش هنستخدمها (اسم المستخدم).
2. [[Counter(...)]]: dict بيعد كل قيمة اتكررت كام مرة: [[Counter({'tea': 2, 'coffee': 1})]].
3. [[.most_common(1)]]: list بأكتر ١ تكرارًا، كل عنصر tuple (القيمة، العدد).

~~~text الناتج
[('tea', 2)]
~~~

---

## اللي في «جرّب»

~~~python
counts = {}
for w in text.split():
    counts[w] = counts.get(w, 0) + 1
~~~

[[counts.get(w, 0)]] بترجع العدد الحالي أو 0 لو الكلمة جديدة، و [[+ 1]] عليها. على [["the cat and the dog and the bird"]]:

~~~text الناتج
{'the': 3, 'cat': 1, 'and': 2, 'dog': 1, 'bird': 1}
Counter({'the': 3, 'and': 2, 'cat': 1, 'dog': 1, 'bird': 1}) True
~~~

[[Counter(text.split())]] عمل نفس العد في سطر، و [[counts == c]] طلعت [[True]] لأن [[Counter]] أصلًا dict. وهو بيعرض من الأكتر للأقل.

---

## ٩. methods هتحتاجها (اتشغّل فعلًا)

~~~python
stock = {"tea": 3}
print(stock.setdefault("coffee", 0))
print(stock.pop("milk", None))
print(stock.pop("tea"))
print(stock)
print(dict(zip(["a", "b"], [1, 2])), {v: k for k, v in {"a": 1, "b": 2}.items()})
prices = {"tea": 30, "coffee": 55, "juice": 40}
print(sorted(prices.items(), key=lambda kv: kv[1], reverse=True)[:2], max(prices, key=prices.get))
print({"a": 1, "b": 2}.keys() & {"b": 0, "c": 0}.keys())
~~~

~~~text الناتج (3.14.3)
0
None
3
{'coffee': 0}
{'a': 1, 'b': 2} {1: 'a', 2: 'b'}
[('coffee', 55), ('juice', 40)] coffee
{'b'}
~~~

| الكود | بيعمل إيه |
|---|---|
| [[setdefault(k, v)]] | لو [[k]] مش موجود يحطه بـ [[v]]، وفي الحالتين يرجّع القيمة اللي في الـ dict |
| [[pop(k, None)]] | يشيل المفتاح ويرجّع قيمته، ومع الـ default مبيرميش [[KeyError]] لو مش موجود |
| [[dict(zip(keys, values))]] | يبني dict من ليستتين |
| [[{v: k for k, v in d.items()}]] | يقلب المفاتيح والقيم (لو القيم مش متكررة) |
| [[sorted(d.items(), key=lambda kv: kv[1])]] | يرتّب بالقيمة ويرجّع list من tuples |
| [[max(d, key=d.get)]] | المفتاح صاحب أكبر قيمة |
| [[a.keys() & b.keys()]] | المفاتيح المشتركة: الـ keys بتتعامل زي set |

---

## ١٠. الـ views بتتغير مع الـ dict

~~~python
inv = {"a": 1, "b": 2}
k = inv.keys()
inv["c"] = 3
print(k)
~~~

~~~text الناتج
dict_keys(['a', 'b', 'c'])
~~~

[[keys()]] و [[values()]] و [[items()]] مش نسخة: نافذة على الـ dict، فبتشوف أي تعديل بعدها. لو عايز لقطة ثابتة: [[list(inv.keys())]]. وده نفس سبب [[RuntimeError: dictionary changed size during iteration]] لو مسحت وانت بتلف (درس «for و range»).

---

## ١١. الـ dict للبحث بدل الـ list

لو هتدوّر على يوزر بالـ id كتير، متلفش على list كل مرة: اعمل فهرس مرة واحدة [[by_id = {u["id"]: u for u in users}]] وبعدين [[by_id.get(7)]] في O(1). نفس الفكرة اللي قسناها في درس «list» مع set.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| قيمة لازم تبقى موجودة | [[d[k]]] (وإلا [[KeyError]]) |
| قيمة ممكن متبقاش موجودة | [[d.get(k, default)]] |
| تضيف أو تعدّل | [[d[k] = v]] |
| المفتاح موجود؟ | [[k in d]] |
| مفتاح وقيمة في loop | [[d.items()]] |
| دمج في dict جديد | [[a | b]] (اليمين بيكسب) |
| تجميع | [[defaultdict(list)]] |
| عدّ | [[Counter(items).most_common(n)]] |

- البحث بالمفتاح O(1): سريع مهما كبر الـ dict، لأنه hash table.
- متعدّلش dict وانت بتلف عليه: جرّبنا نضيف مفتاح جوه loop فطلع [[RuntimeError: dictionary changed size during iteration]].`,
          lines: [
            R`[[Counter]] dict بيعدّ لوحده، و [[defaultdict]] dict بيعمل قيمة افتراضية لأي مفتاح جديد. الاتنين في [[collections]] جوه المكتبة الأساسية (ليهم درس «collections»).`,
            R`dict بالأقواس المعووجة: كل [[مفتاح: قيمة]] مفصولين بفاصلة. المفاتيح نصوص هنا (لازم hashable)، والقيم أي نوع.`,
            R`[[user["name"]]] لمفتاح **لازم** يكون موجود، ولو مش موجود بيرمي [[KeyError: 'name']]. و [[get("phone", "مفيش")]] بترجّع القيمة البديلة من غير خطأ. الناتج [[Sara مفيش]].`,
            R`التعيين بالأقواس بيضيف المفتاح لو جديد، أو بيبدّل قيمته لو موجود. ومفيش [[push]] ولا [[add]]: ده الشكل الوحيد.`,
            R`[[.items()]] بيدّيك (مفتاح، قيمة) في كل لفة بترتيب الإضافة (مضمون من 3.7). ولو لفّيت على [[user]] نفسه هتاخد المفاتيح بس.`,
            R`بيطبع كل مفتاح وقيمته في سطر: [[id 1]] و [[name Sara]] و [[role admin]] و [[email sara@example.com]].`,
            R`إعدادات افتراضية هندمج عليها اختيارات اليوزر.`,
            R`[[|]] (من 3.9) بيدمج dictين في dict **جديد**، واللي على اليمين بيكسب لو المفتاح مكرر، فـ [[theme]] بقت [[light]] و [[defaults]] زي ما هي. و [[|=]] بيدمج في نفس الـ dict.`,
            R`list من tuples (العميل، الصنف)، زي صفوف جاية من قاعدة بيانات.`,
            R`[[defaultdict(list)]]: أول ما تطلب مفتاح مش موجود بيعمله [[[]]] فاضية لوحده. و [[list]] هنا الـ class نفسه مش list فاضية، والـ defaultdict بيناديه لكل مفتاح جديد.`,
            R`لف على الطلبات وفك كل tuple لـ [[who]] و [[item]].`,
            R`[[by_user[who].append(item)]] من غير [[if who not in by_user]]: الـ list بتتعمل لوحدها أول مرة. النتيجة [[sara]] عندها tea مرتين و [[omar]] عنده coffee.`,
            R`[[Counter(...)]] بيعدّ كل صنف من generator expression، و [[_]] اسم للعميل اللي مش محتاجينه، و [[most_common(1)]] بترجّع الأكتر في list: [[[('tea', 2)]]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**افتكر:** اكتب الكود لكل واحدة من غير ما تبص: قيمة بديلة لمفتاح مش موجود، وتشيل مفتاح وتاخد قيمته من غير خطأ لو مش موجود، وتدمج dictين في جديد، وتلف على المفاتيح والقيم، وتعدّ عناصر list.`, done: R`كتبت [[d.get(k, x)]] و [[d.pop(k, None)]] و [[a | b]] و [[for k, v in d.items()]] و [[Counter(xs)]]، وكل واحدة اتجرّبت.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[d = {"a": 1}]] ثم [[k = d.keys()]] ثم [[d["b"] = 2]] ثم [[print(len(k), d.get("c", 0), d.setdefault("a", 9), d)]].`, done: R`توقعت [[2 0 1 {'a': 1, 'b': 2}]]: الـ view شافت المفتاح الجديد، و [[setdefault]] رجّعت القيمة الموجودة ومغيّرتهاش.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[counts = {}]] و [[for w in words: counts[w] += 1]] بيقع. اقرا الخطأ وصلّحه بـ ٣ طرق: [[get]]، و [[defaultdict(int)]]، و [[Counter]].`, done: R`الخطأ [[KeyError]] باسم أول كلمة، والتلات تصليحات طلّعوا نفس الـ dict ([[assert]] بتقارنهم)، وكتبت أنهي هتستخدمها في الشغل وليه.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** عندك سطور لوج [[["GET /items 200", "POST /orders 500", "GET /items 404", "GET /users 200", "POST /orders 201"]]]. اطبع عدد كل status code، والمسارات اللي فيها أخطاء (٤٠٠ وفوق) مع عدد أخطاء كل واحد.`, done: R`عدد الأكواد [[200: 2]] و [[500: 1]] و [[404: 1]] و [[201: 1]]، والأخطاء [[/orders: 1]] و [[/items: 1]] بـ [[defaultdict(int)]]، والكود اتحوّل [[int]] قبل المقارنة بـ ٤٠٠.` },
            { lvl: 'تطبيق', t: R`**ابني:** كاش بسيط [[get_price(sku)]]: لو الـ sku في dict الكاش رجّعه، وإلا «احسبه» (دالة بطيئة فيها [[time.sleep(0.5)]]) وحطه في الكاش. وعدّاد hits و misses.`, done: R`أول نداء لـ [["A1"]] بياخد حوالي نص ثانية والتاني فوري، والعدّادات بعد ٥ نداءات على [["A1"]] و [["B2"]] صح ([[2 misses]] و [[3 hits]])، والكاش مبيكبرش لو نفس الـ sku اتطلب ١٠٠ مرة.` },
            { lvl: 'تحدي', t: R`**مسألة:** [[group_anagrams(words)]] بترجّع list من lists، كل list فيها الكلمات اللي حروفها واحدة ([["listen"]] و [["silent"]]). المفتاح [[tuple(sorted(word))]].`, done: R`[[group_anagrams(["eat", "tea", "tan", "ate", "nat", "bat"])]] بترجّع ٣ مجموعات: [[eat tea ate]] و [[tan nat]] و [[bat]]، و list فاضية بترجّع [[[]]]، وكتبت ليه المفتاح tuple مش list (unhashable).` },
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
          learn: R`تشيل التكرار وتقارن مجموعات بالـ set، وترجّع وتفك قيم بالـ tuple، وتعرف [[frozenset]] و [[namedtuple]] والـ tuple بعنصر واحد.`,
          out: R`مقارنة قايمتين IDs في سطرين، وبحث [[in]] سريع، ودوال بترجّع أكتر من قيمة بوضوح.`,
          use: {
            prog: R`«مين جديد ومين اتمسح» بين نسختين من داتا، و«الإيميل ده ممنوع؟» في O(1)، كلهم set.`,
            cs: R`الـ set hash table من غير قيم، وعمليات المجموعات ([[&]] و [[|]] و [[-]] و [[^]]) هي نفسها اللي في الرياضة والـ SQL ([[INTERSECT]] و [[UNION]] و [[EXCEPT]]).`,
          },
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
          teach: R`## المثال بيعمل إيه؟

النص الأول **set**: بيشيل تكرار، ويقارن مجموعتين، ويدوّر بسرعة. والنص التاني **tuple**: دالة بترجع قيمتين، وتفكيك القيم في متغيرات. اتشغّل على ويندوز بـ Python 3.14.3 وفي Docker بـ [[python:3.13-slim]]:

~~~text الناتج
2
{'omar'} {'sara'}
ممنوع
~~~

---

## ١. [[set(emails)]]: شيل التكرار

~~~python
emails = ["a@x.com", "b@x.com", "a@x.com"]
unique = set(emails)
print(len(unique))
~~~

- [[set(...)]] بتاخد أي حاجة تتلف عليها وتعمل منها **set**: مجموعة كل عنصر فيها مرة واحدة بس.
- [["a@x.com"]] كانت مرتين، فبقت مرة. و [[len()]] عدد العناصر: [[2]].

والـ set **ملهاش ترتيب**. شغّلنا نفس السطر ٣ مرات ورا بعض:

~~~text الناتج: print(set(emails)) في ٣ تشغيلات
{'a@x.com', 'b@x.com'}
{'b@x.com', 'a@x.com'}
{'a@x.com', 'b@x.com'}
~~~

الترتيب اتغير من تشغيلة للتانية (Python بيغيّر الـ hash بتاع النصوص كل تشغيلة لأسباب أمان). فمتعتمدش على ترتيب set؛ ولو محتاج ترتيب: [[sorted(s)]]، ولو عايز تشيل التكرار وتحافظ على الترتيب: [[list(dict.fromkeys(items))]] (جرّبناها على [[["b", "a", "b", "c"]]] فطلّعت [[['b', 'a', 'c']]]).

---

## ٢. عمليات المجموعات: [[&]] و [[-]]

~~~python
admins = {"sara", "omar"}
online = {"omar", "ali"}
print(admins & online, admins - online)
~~~

[[{"sara", "omar"}]] set مكتوبة على طول بالأقواس المعووجة، من غير [[:]] (لو فيه [[:]] تبقى dict).

| الرمز | اسمه | السؤال | الناتج |
|---|---|---|---|
| [[&]] | intersection (تقاطع) | في الاتنين؟ | [[{'omar'}]] |
| [[-]] | difference (فرق) | في الأولى ومش في التانية؟ | [[{'sara'}]] |
| [[|]] | union (اتحاد) | في أي واحدة فيهم؟ | [['ali', 'omar', 'sara']] بعد [[sorted]] |
| [[^]] | symmetric difference | في واحدة بس؟ | [[{'sara', 'ali'}]] |

يعني «مين من الأدمنز أونلاين؟» [[omar]]، و «مين أدمن ومش أونلاين؟» [[sara]]. و [[-]] الترتيب فيها مهم: [[online - admins]] كانت هتبقى [[{'ali'}]].

---

## ٣. [[in]] على set

~~~python
banned = {"spam@x.com"}
if "spam@x.com" in banned:
    print("ممنوع")
~~~

[[in]] على list بيلف على العناصر واحد واحد. على set بيحسب الـ hash ويروح للمكان على طول، فبياخد نفس الوقت تقريبًا سواء فيها 10 عناصر أو مليون (O(1)). عشان كده «الإيميل ده محظور؟» تبقى set.

---

## ٤. دالة بترجع tuple

~~~python
def min_max(nums: list[int]) -> tuple[int, int]:
    return min(nums), max(nums)
low, high = min_max([4, 9, 1])
~~~

- [[min]] و [[max]] أصغر وأكبر عنصر.
- [[return a, b]]: **الفاصلة** هي اللي بتعمل tuple، مش القوسين. الدالة رجّعت [[(1, 9)]] ونوعها [[<class 'tuple'>]]. و [[tuple[int, int]]] في الـ hint معناها tuple فيها int وبعده int.
- [[low, high = ...]] **unpacking**: أول قيمة في [[low]] (1)، والتانية في [[high]] (9).

ولو العدد مش مظبوط:

~~~text الناتج: low, high = [1, 2, 3]
ValueError: too many values to unpack (expected 2, got 3)
~~~

---

## ٥. [[first, *rest = [1, 2, 3, 4]]]

[[*]] قبل الاسم معناها «لم **كل الباقي** هنا في list»:

~~~text الناتج: print(first, rest)
1 [2, 3, 4]
~~~

وتقدر تحطها في أي مكان: [[*init, last = ...]] مثلًا.

---

## ٦. [[empty = set()]]

~~~text الناتج: type({}), type(set()), set()
<class 'dict'> <class 'set'> set()
~~~

[[{}]] فاضية **dict** مش set (الـ dict جه الأول في اللغة وخد الشكل ده). الـ set الفاضية بتتكتب [[set()]]، وحتى Python بيطبعها كده.

ونفس الحكاية مع tuple بعنصر واحد: [[("a")]] مجرد string بين قوسين ([[<class 'str'>]])، و [[(1,)]] بالفاصلة هي اللي tuple.

---

## اللي في «جرّب»: الجديد والممسوح

~~~python
in_db = [1, 2, 3, 4]
in_request = [3, 4, 5, 6]
new = set(in_request) - set(in_db)
removed = set(in_db) - set(in_request)
print(new, removed)
~~~

- [[set(in_request) - set(in_db)]]: اللي في الـ request ومش في القاعدة = جديد.
- [[set(in_db) - set(in_request)]]: اللي في القاعدة ومش في الـ request = اتمسح.

~~~text الناتج
{5, 6} {1, 2}
~~~

## ٩. باقي عمليات الـ set (اتشغّل فعلًا)

~~~python
s1, s2 = {1, 2, 3}, {3, 4}
print(s1 | s2, s1 ^ s2, {1, 2} <= s1, s1.isdisjoint({9}))
s1.discard(99)
s1.remove(99)
~~~

~~~text الناتج (3.14.3)
{1, 2, 3, 4} {1, 2, 4} True True
KeyError: 99
~~~

| الكود | معناه |
|---|---|
| [[a | b]] | الاتحاد: كل اللي في الاتنين |
| [[a ^ b]] | اللي في واحدة بس (مش في الاتنين) |
| [[a <= b]] | [[a]] جزء من [[b]] (subset) |
| [[a.isdisjoint(b)]] | مفيش ولا عنصر مشترك |
| [[discard(x)]] | يشيل لو موجود، ومبيرميش خطأ |
| [[remove(x)]] | يشيل، ولو مش موجود [[KeyError]] |

---

## ١٠. اتشغّل فعلًا: ترتيب الـ set بيتغير كل تشغيلة

شغّلنا نفس السطر ٣ مرات ورا بعض:

~~~python
print(set(["apple", "banana", "cherry", "date"]))
~~~

~~~text الناتج (٣ تشغيلات)
{'apple', 'cherry', 'banana', 'date'}
{'banana', 'date', 'cherry', 'apple'}
{'date', 'banana', 'cherry', 'apple'}
~~~

الـ hash بتاع النصوص في Python بيتعمله «ملح» عشوائي كل تشغيلة (hash randomization)، عشان حد ميبعتش مفاتيح مقصودة تقع كلها في نفس الخانة ويبطّأ السيرفر. أما الأرقام الصغيرة فالـ hash بتاعها هو الرقم نفسه، فـ [[{3, 1, 2}]] طلعت [[{1, 2, 3}]] كل مرة، وده بالصدفة مش مضمون. النتيجة: **أي test بيعتمد على ترتيب set هيقع مرة وينجح مرة**. رتّب بـ [[sorted(s)]] قبل ما تطبع أو تقارن بـ list.

والحل لو عايز تشيل التكرار وتحافظ على الترتيب:

~~~text الناتج
>>> list(dict.fromkeys(["b", "a", "b", "c"]))
['b', 'a', 'c']
~~~

---

## ١١. الـ tuple: الفخاخ والأشكال

~~~python
print(type((1)), type((1,)), (1,) * 3)
x, y = 1, 2
x, y = y, x
print(x, y)
from collections import namedtuple
P = namedtuple("P", "lat lng")
p = P(30.0, 31.2)
print(p, p.lat, p[1])
~~~

~~~text الناتج
<class 'int'> <class 'tuple'> (1, 1, 1)
2 1
P(lat=30.0, lng=31.2) 30.0 31.2
~~~

- [[(1)]] رقم بين قوسين، و [[(1,)]] tuple. الفاصلة هي اللي بتعمل الـ tuple.
- [[x, y = y, x]] بيبدّل من غير متغير مؤقت: اليمين بيتحسب tuple الأول، وبعدين بيتفك.
- [[namedtuple]] tuple ليها أسماء للأماكن: [[p.lat]] أوضح من [[p[0]]]، وبرضه immutable وتنفع مفتاح. وللحاجات الأكبر dataclass أحسن (درس «dataclass»).

---

## الخلاصة

| | set | tuple |
|---|---|---|
| بتتكتب | [[{1, 2}]] أو [[set(...)]] | [[(1, 2)]] أو [[1, 2]] |
| فاضية | [[set()]] | [[()]] |
| تكرار؟ | لأ | آه |
| ترتيب؟ | لأ | آه |
| بتتعدّل؟ | آه ([[add]] و [[remove]]) | لأ |
| أشهر استخدام | شيل تكرار، [[in]] سريع، [[&]] و [[-]] | دالة بترجع كذا قيمة، unpacking، مفتاح dict |

- العناصر في set لازم hashable: [[{{"a": 1}}]] (dict جوه set) بترمي [[TypeError]].
- [[a, b = b, a]] بتبدّل متغيرين من غير متغير مؤقت (جرّبناها: [[1, 2]] بقت [[2, 1]]).`,
          lines: [
            R`list إيميلات فيها [["a@x.com"]] مرتين، زي اللي بتيجي من فورم اتبعت مرتين.`,
            R`[[set(emails)]] بيعمل مجموعة من غير تكرار: كل عنصر مرة واحدة بس. بس **الترتيب مش مضمون**، فلو محتاجه استخدم [[dict.fromkeys]].`,
            R`[[len]] بقى [[2]] بدل [[3]]: التكرار اتشال.`,
            R`set مكتوبة بالأقواس المعووجة من غير [[:]]. لو فيها [[:]] تبقى dict.`,
            R`set تانية فيها يوزر مشترك ([["omar"]]) ويوزر جديد.`,
            R`[[&]] التقاطع (المشترك بين الاتنين) = [[{'omar'}]]، و [[-]] الفرق (اللي في الأولى ومش في التانية) = [[{'sara'}]]. وفيه [[|]] للاتحاد و [[^]] للي في واحدة بس.`,
            R`set للبحث السريع. حتى لو عنصر واحد، الشكل ده بيكبر من غير ما يبطّأ.`,
            R`[[in]] على set بيحسب الـ hash ويروح للخانة على طول، O(1) مهما كان الحجم. على list كان هيلف عنصر عنصر.`,
            R`بيطبع [[ممنوع]] لأن الإيميل موجود في الـ set.`,
            R`[[tuple[int, int]]] نوع الرجوع: tuple فيها رقمين. الدالة هترجّع أصغر وأكبر رقم مع بعض.`,
            R`[[return min(nums), max(nums)]]: الفاصلة هي اللي بتعمل tuple، مش الأقواس. والـ list الفاضية هتوقّع [[min]] بـ [[ValueError]].`,
            R`unpacking: الـ tuple اللي رجعت اتفكت لاسمين، [[low]] بـ [[1]] و [[high]] بـ [[9]]. لو عدد الأسماء مختلف: [[ValueError: too many values to unpack]].`,
            R`[[*rest]] بيلم كل اللي بعد أول عنصر في **list** (مش tuple): [[first]] بـ [[1]] و [[rest]] بـ [[[2, 3, 4]]]. ينفع يبقى في النص كمان: [[first, *mid, last]].`,
            R`[[set()]] هي الطريقة الوحيدة تعمل set فاضية، لأن [[{}]] لوحدها dict. وده سؤال انترفيو مشهور.`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**افتكر:** اكتب الرمز لكل عملية على [[a]] و [[b]]: المشترك، والكل، واللي في [[a]] بس، واللي في واحدة بس، و [[a]] جزء من [[b]]. واكتب إزاي تعمل set فاضية و tuple بعنصر واحد.`, done: R`كتبت [[&]] و [[|]] و [[-]] و [[^]] و [[<=]]، و [[set()]] و [[(x,)]]، وجرّبت [[type({})]] وطلعت [[dict]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[first, *mid, last = "abcde"]] ثم [[print(first, mid, last)]]، و [[print(type(("a")), len(("a",)), {1, 1.0, True})]].`, done: R`توقعت [[a ['b', 'c', 'd'] e]] و [[<class 'str'> 1 {1}]]، وفهمت إن [[1]] و [[1.0]] و [[True]] متساويين وليهم نفس الـ hash فالـ set شالتهم واحد.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** test بيقارن [[assert list(set(tags)) == ["api", "python", "web"]]] وبيعدّي مرة ويقع مرة. لاقي السبب وصلّح الاختبار من غير ما تغيّر معناه.`, done: R`كتبت إن ترتيب الـ set بيتغير كل تشغيلة (hash randomization للنصوص)، والاختبار بقى [[assert sorted(set(tags)) == [...]]] أو [[assert set(tags) == {...}]]، وشغّلته ١٠ مرات ورا بعض وعدّى كلهم.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** [[db_ids = [1, 2, 3, 5, 8]]] و [[request_ids = [2, 3, 4, 8, 9]]]. طلّع الجديد (هيتضاف)، والممسوح (هيتشال)، واللي فضل، كل واحد مترتب.`, done: R`الجديد [[[4, 9]]] والممسوح [[[1, 5]]] واللي فضل [[[2, 3, 8]]]، كل واحد في سطر بـ [[sorted(set(...) - set(...))]]، ومجموع الممسوح واللي فضل = عدد [[db_ids]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[stats(nums)]] بترجّع tuple من ٤ قيم (العدد، والمتوسط، والأصغر، والأكبر)، وبرجّع [[None]] لو فاضية. واللي بيناديها يفكها في ٤ أسماء، وبعدين حوّلها لـ [[namedtuple]] واستخدم الأسماء.`, done: R`[[n, avg, lo, hi = stats([4, 9, 1])]] بيدّي [[3 4.666666666666667 1 9]]، و [[stats([])]] بترجّع [[None]] من غير [[ZeroDivisionError]]، ونسخة الـ namedtuple بتطبع [[Stats(n=3, ...)]] و [[s.avg]] شغالة.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** list فيها ٢٠٠ ألف رقم فيها تكرار. شيل التكرار بـ ٣ طرق: loop بـ [[if x not in result]] على list، و [[set]]، و [[dict.fromkeys]]. قيس كل واحدة وقول أنهي بتحافظ على الترتيب.`, done: R`الطرق التلاتة بتطلّع نفس العناصر، والـ loop بالـ list أبطأ بفرق ضخم (O(n²): ممكن ياخد ثواني أو دقايق، فجرّبه على ٢٠ ألف بس لو طوّل)، و [[dict.fromkeys]] هي الوحيدة السريعة اللي بتحافظ على الترتيب، والأرقام مكتوبة.` },
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
          learn: R`تكتب list و dict و set comprehensions و generator expressions بفلتر واختيار قيمة، وتعرف إمتى loop عادية أوضح.`,
          out: R`تحويل وفلترة أي داتا في سطر واحد بيتقري، ومش هتقع في فخ الـ lambda جوه الـ comprehension ولا في الـ generator اللي خلص.`,
          use: {
            prog: R`«هات الأسماء بس»، و«فهرس بالـ id»، و«فيه حد أدمن؟»: comprehension في سطر بدل ٤ سطور loop.`,
            work: R`تنضيف صفوف CSV، وتحويل رد API لشكل تاني، وبناء dict للبحث: كلها comprehensions في أي كود Python حقيقي.`,
          },
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
          teach: R`## المثال بيعمل إيه؟

بياخد list مستخدمين، ويطلّع منها ٧ حاجات مختلفة، كل واحدة في سطر بدل loop من ٣ أو ٤ سطور. المثال نفسه مفيهوش [[print]]، فطبعنا كل متغير بعده. اتشغّل على ويندوز بـ Python 3.14.3 وفي Docker بـ [[python:3.13-slim]]، ونفس الناتج.

### الشكل العام

[[[expr for x in items if cond]]] بتتقري كده:

| الحتة | معناها |
|---|---|
| [[expr]] | اللي هيتحط في الناتج |
| [[for x in items]] | لكل [[x]] في [[items]]، و [[x]] اسم بتختاره انت |
| [[if cond]] | لو الشرط صح (اختياري) |

نفس الـ loop ده بالظبط:

~~~python
result = []
for x in items:
    if cond:
        result.append(expr)
~~~

---

## ١. list comprehension بفلتر

~~~python
names = [u["name"] for u in users if u.get("active")]
~~~

| الحتة | معناها |
|---|---|
| [[[ ... ]]] | الأقواس المربعة بتقول إن الناتج list |
| [[u["name"]]] | اللي هيتحط: اسم المستخدم |
| [[for u in users]] | لكل مستخدم في الـ list، و [[u]] هو الـ dict بتاعه |
| [[if u.get("active")]] | لو [["active"]] قيمته truthy |

~~~text الناتج
['Sara']
~~~

Omar [["active": False]] فاتشال.

---

## ٢. dict comprehension

~~~python
by_name = {u["name"]: u for u in users}
~~~

أقواس معووجة و [[مفتاح: قيمة]] = dict. المفتاح الاسم، والقيمة الـ dict كله. كده تقدر تجيب أي مستخدم باسمه على طول [[by_name["Omar"]]] بدل ما تلف.

~~~text الناتج
{'Sara': {'name': 'Sara', 'active': True, 'age': 27}, 'Omar': {'name': 'Omar', 'active': False, 'age': 31}}
~~~

---

## ٣. set comprehension

~~~python
decades = {u["age"] // 10 * 10 for u in users}
~~~

أقواس معووجة **من غير** [[:]] = set. والحساب: [[27 // 10]] = 2 (قسمة من غير كسر)، و [[* 10]] = 20. يعني «العشرينات». Omar 31 → 30.

~~~text الناتج
{20, 30}
~~~

ولو فيه اتنين في العشرينات، الـ set هتشيل التكرار لوحدها.

---

## ٤. generator expression جوه [[sum]]

~~~python
total_age = sum(u["age"] for u in users)
~~~

من غير أقواس مربعة: ده **generator expression**. مبيبنيش list، بيطلّع قيمة قيمة و [[sum]] بتجمع وهي ماشية. ولما يبقى هو الـ argument الوحيد للدالة، أقواس الدالة كفاية.

~~~text الناتج
58
~~~

27 + 31 = 58. والفرق في الذاكرة حقيقي: قسنا بـ [[sys.getsizeof]] list comprehension فيها مليون رقم طلعت 8448728 byte (حوالي ٨ ميجا)، والـ generator بتاع نفس المليون 200 byte بس.

---

## ٥. [[any]]

~~~python
has_admin = any(u["name"] == "admin" for u in users)
~~~

[[any]] بترجع [[True]] لو **أي** قيمة صح، وبتقف أول ما تلاقي واحدة (أختها [[all]]: كلهم صح؟). مفيش مستخدم اسمه admin:

~~~text الناتج
False
~~~

---

## ٦. اتنين [[for]]

~~~python
pairs = [(x, y) for x in range(3) for y in range(2)]
~~~

بتتقري من **الشمال لليمين** زي loops متداخلة: الـ [[for]] الأولى هي الخارجية.

~~~python
for x in range(3):
    for y in range(2):
        pairs.append((x, y))
~~~

~~~text الناتج
[(0, 0), (0, 1), (1, 0), (1, 1), (2, 0), (2, 1)]
~~~

٣ × ٢ = ٦ أزواج.

---

## ٧. [[if/else]] في الأول

~~~python
labels = ["adult" if u["age"] >= 18 else "minor" for u in users]
~~~

خد بالك من المكان:

| المكان | الشكل | بيعمل إيه |
|---|---|---|
| في الأول | [[A if cond else B for x in ...]] | **بيختار قيمة** لكل عنصر، والعدد بيفضل زي ما هو |
| في الآخر | [[x for x in ... if cond]] | **فلتر**: بيشيل عناصر، ومفيهوش [[else]] |

~~~text الناتج
['adult', 'adult']
~~~

---

## اللي في «جرّب»

~~~python
result = [n * n for n in range(20) if n % 3 == 0]
~~~

«مربع كل رقم من 0 لـ 19 بيقبل القسمة على 3»:

~~~text الناتج
[0, 9, 36, 81, 144, 225, 324]
~~~

ولو بدّلت المربعة بأقواس عادية، الناتج **generator** مش tuple، وطباعته بتطلع عنوانه بس:

~~~text الناتج
<generator object <genexpr> at 0x000002AF2D908EE0>
~~~

(الرقم بيتغير كل مرة). عشان تشوف القيم [[list(g)]]. وجرّبنا [[list(g)]] مرتين ورا بعض: الأولى [[[0, 9, 36, 81, 144, 225, 324]]] والتانية [[[]]]، لأن الـ generator بيتلف عليه **مرة واحدة** وبعدها بيبقى خلص.

## ٨. اتشغّل فعلًا: فخ الـ lambda جوه comprehension (late binding)

~~~python
fs = [lambda: i for i in range(3)]
print([f() for f in fs])
fs = [lambda i=i: i for i in range(3)]
print([f() for f in fs])
~~~

~~~text الناتج (3.14.3)
[2, 2, 2]
[0, 1, 2]
~~~

كنا متوقعين [[[0, 1, 2]]] من أول سطر. الـ lambda مش بتحفظ **قيمة** [[i]] وقت ما اتعملت، بتحفظ **الاسم** [[i]] وبتدوّر عليه وقت ما تتنادى، ووقتها الـ loop كانت خلصت و [[i]] بقت [[2]]. ده اسمه late binding، ونفس الكلام في أي closure جوه loop (درس «scope و LEGB»). والحل [[i=i]]: الـ default بيتحسب وقت تعريف الـ lambda فبيحفظ القيمة.

---

## ٩. المتغير مبيطلعش برّه، والـ generator بيخلص

~~~python
[j for j in range(3)]
print(j)
g = (x * x for x in range(3))
print(sum(g), sum(g))
~~~

~~~text الناتج
NameError: name 'j' is not defined
5 0
~~~

- متغير الـ comprehension ليه scope لوحده، عكس الـ [[for]] العادية اللي متغيرها بيفضل بعدها (درس «for و range»).
- الـ generator بيتلف عليه **مرة واحدة**: أول [[sum]] استهلكه ([[0 + 1 + 4 = 5]])، والتاني لقاه فاضي فرجّع [[0]] من غير أي خطأ. لو محتاج تلف مرتين، اعمله list.

---

## ١٠. أشكال هتقابلها

~~~python
data = [" 3", "x", "4 ", ""]
print([n for s in data if (n := s.strip()).isdecimal()])
m = [[1, 2], [3], [4, 5]]
print([x for row in m for x in row])
~~~

~~~text الناتج
['3', '4']
[1, 2, 3, 4, 5]
~~~

- الـ walrus [[:=]] (درس «if و elif و else») بيحسب [[strip()]] مرة واحدة ويستخدمها في الفلتر وفي الناتج.
- فرد list متداخلة (flatten): الـ for الخارجية الأول ([[row]])، والداخلية بعدها ([[x]])، بنفس ترتيب الـ loops العادية.

---

## ١١. اتشغّل فعلًا: أسرع فعلًا؟

مربعات ١٠ آلاف رقم ([[python -m timeit]]، ويندوز، 3.14.3):

| الطريقة | الوقت | ليه |
|---|---|---|
| loop و [[append]] | [[418 usec]] | كل لفة بتدوّر على [[r.append]] وتناديها |
| list comprehension | [[384 usec]] | الـ append جوه الـ bytecode مباشرة |
| [[list(map(lambda i: i * i, ...))]] | [[630 usec]] | نداء دالة Python لكل عنصر |

الـ comprehension أسرع بحوالي ٨٪ بس على 3.14، مش أضعاف زي ما بيتقال. يعني اختارها عشان أوضح، مش عشان السرعة. و [[map]] مع [[lambda]] أبطأ الاتنين. وفي الذاكرة: [[sys.getsizeof]] لـ list فيها مليون عنصر [[8448728]] byte، وللـ generator اللي بيعمل نفس الأرقام [[200]] byte بس.

---

## الخلاصة

| الشكل | الناتج |
|---|---|
| [[[expr for x in it if cond]]] | list جديدة بكل العناصر مرة واحدة |
| [[{k: v for x in it}]] | dict، والنقطتين [[:]] هي اللي بتفرّقه عن set |
| [[{expr for x in it}]] | set من غير تكرار ومن غير ترتيب مضمون |
| [[(expr for x in it)]] | generator (lazy، مرة واحدة) |

- [[if]] في الآخر فلتر، و [[A if c else B]] في الأول اختيار قيمة.
- مع [[sum]] و [[any]] و [[all]] و [[max]] استخدم generator، مش list.
- متغير الـ loop جوه الـ comprehension مبيطلعش برّه: عملنا comprehension متغيرها [[n]]، وبعدها طلبنا [[n]] فطلع [[NameError: name 'n' is not defined]].
- لو الكلام بقى أكتر من شرط وتحويل بسيط، loop عادي أوضح.`,
          lines: [
            R`list يوزرز كـ dicts فيها [[name]] و [[active]] و [[age]]، هنعمل منها أشكال مختلفة تحت.`,
            R`list comprehension: لكل [[u]] في [[users]]، **لو** [[u.get("active")]] صح، حط [[u["name"]]]. الـ [[if]] في الآخر فلتر، فالناتج [[['Sara']]].`,
            R`dict comprehension: [[مفتاح: قيمة]] قبل الـ [[for]]، فبيبني فهرس بالاسم [[{'Sara': {...}, 'Omar': {...}}]] تدوّر فيه بـ [[by_name["Omar"]]] في O(1). لو اسمين متكررين، التاني بيكسب.`,
            R`set comprehension بالأقواس المعووجة من غير [[:]]: [[27 // 10 * 10]] = [[20]] و [[31]] = [[30]]، والتكرار بيتشال لوحده فالناتج [[{20, 30}]].`,
            R`generator expression جوه [[sum]] من غير أقواس مربعة: الأرقام بتتولد واحد واحد ومفيش list بتتعمل في الذاكرة. على مليون عنصر الـ list كانت هتاخد حوالي ٨ ميجا.`,
            R`[[any]] بترجّع True أول ما تلاقي عنصر صح وبتقف (short-circuit)، فمش بتلف على الباقي. هنا مفيش حد اسمه admin فبترجّع [[False]] بعد ما تلف على الكل.`,
            R`اتنين [[for]] بيتقروا من الشمال لليمين زي loops متداخلة: لكل [[x]] من 0 لـ 2، لكل [[y]] من 0 لـ 1، فطلع ٦ أزواج من [[(0, 0)]] لـ [[(2, 1)]].`,
            R`[[A if cond else B]] **قبل** الـ [[for]] بيختار قيمة لكل عنصر (مش فلتر)، فالطول زي الأصل: [[['adult', 'adult']]]. لو حطيت [[if]] لوحدها في الأول هيطلع [[SyntaxError]].`,
          ],
          practice: [
            { lvl: 'سريع', t: R`**افتكر:** حوّل كل loop لـ comprehension في سطر: مربعات الأرقام الزوجية من 0 لـ 20، و dict الكلمة ← طولها، و set الحروف الأولى من list أسماء، ومجموع الأسعار فوق ١٠٠ بـ generator.`, done: R`كتبت الأربعة وكل واحد طلّع نفس ناتج الـ loop ([[assert]])، والأخير من غير أقواس مربعة جوه [[sum]].` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[fs = [lambda: i * 10 for i in range(3)]]] ثم [[print([f() for f in fs])]]، و [[g = (c for c in "ab")]] ثم [[print(list(g), list(g))]].`, done: R`توقعت [[[20, 20, 20]]] (late binding) و [[['a', 'b'] []]] (الـ generator خلص)، وكتبت التصليح للأولى ([[lambda i=i: i * 10]]) وجرّبته وطلع [[[0, 10, 20]]].` },
            { lvl: 'تطبيق', t: R`**refactor:** الكود ده شغال بس طويل: [[result = {}]] و [[for u in users: if u["active"]: if u["age"] >= 18: result[ u["id"] ] = u["name"].title()]]. اكتبه dict comprehension واحد، وبعدين قرّر: لو زوّدنا شرط تالت، تفضل comprehension ولا ترجع loop؟`, done: R`النسخة الجديدة سطر واحد وبتطلّع نفس الـ dict ([[assert]] على ٥ يوزرز)، وكتبت قرارك بسبب (أكتر من شرطين أو loop متداخلة = loop عادية أوضح).` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** سطور CSV كنصوص: [[["id,name,price", "1, Tea ,30", "2,Coffee,abc", "3,Juice,40", ""]]]. حوّلهم لـ list من dicts ([[id]] int و [[name]] متنضّف و [[price]] int)، وشيل الصف الفاضي والصف اللي سعره مش رقم.`, done: R`الناتج صفين بس: [[{'id': 1, 'name': 'Tea', 'price': 30}]] و [[{'id': 3, 'name': 'Juice', 'price': 40}]]، والعنوان اتشال، والفحص بـ [[isdecimal]] قبل [[int]]، والحل comprehension واحدة أو اتنين مش أكتر.` },
            { lvl: 'تطبيق', t: R`**أشكال:** بـ comprehension اعمل جدول ضرب ١٠×١٠ كـ list من lists، واطبعه عواميده مظبوطة، وبعدين اعمل مصفوفة identity [[5×5]] (واحد على القطر وأصفار في الباقي).`, done: R`[[table[6][7]]] = [[56]] (لو الصفوف من 1)، والجدول عواميده مظبوطة بـ [[:3]]، والـ identity فيها ٥ وحايد بالظبط على القطر، و [[identity[0] is identity[1]]] [[False]] (مفيش فخ [[* 5]]).` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** قيس مربعات مليون رقم بـ loop و [[append]]، و list comprehension، و [[map]] مع [[lambda]]، و generator جوه [[sum]]، واكتب الوقت والذاكرة ([[sys.getsizeof]]) لكل واحدة.`, done: R`عندك ٤ أوقات و ٤ أحجام من جهازك، والترتيب قريب من اللي في الدرس (الـ comprehension أسرع شوية من الـ loop، و [[map]] مع lambda أبطأ)، وكتبت جملة: الفرق في السرعة صغير، وفي الذاكرة الـ generator بيفرق جدًا.` },
          ],
          sol: R`الـ comprehension: [[result = [n * n for n in range(20) if n % 3 == 0]]] وناتجه [[[0, 9, 36, 81, 144, 225, 324]]].

ولما تبدّل الأقواس المربعة بأقواس عادية مش هتاخد tuple، هتاخد generator: الطباعة هتطلع حاجة زي [[<generator object <genexpr> at 0x7f...>]]. الـ generator مبيحسبش حاجة لحد ما تلف عليه، فعشان تشوف القيم [[list(g)]]. وخد بالك إنه بيتلف عليه مرة واحدة بس: [[list(g)]] التانية بترجع [[[]]]. ولو عايز tuple فعلًا: [[tuple(n * n for n in ...)]].`
        }
      ]
    }
]);

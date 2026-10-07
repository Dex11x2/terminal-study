// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
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
          teach: R`## المثال بيعمل إيه؟

بياخد list مستخدمين، ويطلّع منها ٧ حاجات مختلفة، كل واحدة في سطر بدل loop من ٣ أو ٤ سطور. المثال نفسه مفيهوش [[print]]، فطبعنا كل متغير بعده. اتشغّل على ويندوز بـ Python 3.14.3 وفي Docker بـ [[python:3.13-slim]]، ونفس الناتج.

### الشكل العام

[[[expr for x in items if cond]]] بتتقري كده:

| الحتة | معناها |
|---|---|
| [[expr]] | اللي هيتحط في الناتج |
| [[for x in items]] | لكل [[x]] في [[items]] |
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
| [[[ ... ]]] | الناتج list |
| [[u["name"]]] | اللي هيتحط: اسم المستخدم |
| [[for u in users]] | لكل مستخدم |
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

## الخلاصة

| الشكل | الناتج |
|---|---|
| [[[expr for x in it if cond]]] | list |
| [[{k: v for x in it}]] | dict |
| [[{expr for x in it}]] | set |
| [[(expr for x in it)]] | generator (lazy، مرة واحدة) |

- [[if]] في الآخر فلتر، و [[A if c else B]] في الأول اختيار قيمة.
- مع [[sum]] و [[any]] و [[all]] و [[max]] استخدم generator، مش list.
- متغير الـ loop جوه الـ comprehension مبيطلعش برّه: عملنا comprehension متغيرها [[n]]، وبعدها طلبنا [[n]] فطلع [[NameError: name 'n' is not defined]].
- لو الكلام بقى أكتر من شرط وتحويل بسيط، loop عادي أوضح.`,
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
]);

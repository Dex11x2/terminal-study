// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
    {
      t: "Classes",
      l: 1,
      time: R`حوالي ٨ ساعات (٦ دروس)`,
      goal: [
        R`تكتب class فيه داتا وقواعد بتحميها: [[__init__]] و [[@property]] بـ setter و [[@classmethod]] و [[@staticmethod]]، وتعرف الفرق بين خانة الـ class وخانة الـ object.`,
        R`تفهم [[super()]] والـ MRO وتركّب mixins، وتختار بين الوراثة والـ composition بقاعدة مش بالإحساس.`,
        R`تخلي objects بتاعتك تشتغل مع [[==]] و [[sorted]] و [[set]] و [[len]] و [[for]] و [[+]] بالـ dunder methods، وتعرف القواعد اللي لو اتكسرت الـ set بتضيع منها حاجات.`,
        R`تختار الأداة الصح للداتا: dataclass ([[frozen]] و [[slots]] و [[order]] و [[kw_only]]) ولا NamedTuple ولا TypedDict ولا Pydantic، بأرقام ذاكرة متقاسة.`,
        R`تقفل القيم المحددة في Enum، وتوصف الشكل المطلوب بـ ABC أو Protocol أو Generics عشان mypy يمسك الغلط قبل التشغيل.`,
      ],
      use: {
        prog: R`كل framework هتستخدمه في التاب ده مبني على classes: Pydantic models و SQLAlchemy models و exceptions بتاعتك و Django views. لو فاهم [[super()]] والـ dunders، كود المكتبات بيبقى مقروء مش سحر.`,
        work: R`الفلوس value object متتعدلش، والحالات Enum مش strings، والتخزين وراه Protocol عشان الاختبار يحط fake. دي قرارات بتتاخد في أول أسبوع في أي مشروع backend، والغلط فيها بيتكلّف شهور.`,
        cs: R`الـ MRO بيتحسب بخوارزمية C3 linearization، والـ hash table محتاجة إن المتساويين ليهم نفس الـ hash، و [[__slots__]] بيشيل dict من كل object (٣٠٪ ذاكرة أقل اتقاست). دي نفس أفكار الـ vtables والـ interfaces في Java و C++ و Go.`,
      },
      projects: [
        { lvl: 'صغير', t: R`عدّاد بقواعد`, what: R`[[class Counter]] بخانة [[value]] property بـ setter بيرفض السالب، و [[step]] بيتحدد في الإنشاء، و [[increment()]] و [[reset()]]، و [[@classmethod from_text("5/2")]] (القيمة/الخطوة)، و [[__repr__]]. من درس «class و self».`, done: R`[[Counter.from_text("5/2").increment()]] بتخلي القيمة [[7]]، و [[c.value = -1]] بترمي [[ValueError]] والقيمة متتغيرش، و [[Counter.from_text("x")]] بترمي [[ValueError]] برسالة فيها النص، و [[print(c)]] بيطبع [[Counter(value=7, step=2)]].` },
        { lvl: 'صغير', t: R`Enum حالات تذكرة دعم`, what: R`[[TicketStatus(StrEnum)]] فيها [[open]] و [[in_progress]] و [[waiting]] و [[closed]]، و property [[label]] بالعربي، و method [[is_active()]]، و [[@unique]]. من درس «Enum».`, done: R`[[TicketStatus("waiting").label]] بترجّع النص العربي، و [[[s for s in TicketStatus if s.is_active()]]] فيها ٣، و [[json.dumps({"s": TicketStatus.CLOSED})]] بترجّع [[{"s": "closed"}]]، وإضافة قيمة متكررة بتترفض وقت التعريف.` },
        { lvl: 'متوسط', t: R`محفظة بعملات`, what: R`[[@dataclass(frozen=True, slots=True) Money]] بالقروش والعملة، بـ [[__add__]] و [[__sub__]] و [[__lt__]] و [[__format__]] (اللي بيطبع [[1,234.56 EGP]])، وبترمي [[ValueError]] لو العملات مختلفة، و [[class Wallet]] شايلة [[Money]] كتير بـ [[__len__]] و [[__iter__]] و [[total(currency)]]. من دروس dunder و dataclass.`, done: R`[[sum(wallet, Money(0, "EGP"))]] شغالة لعملة واحدة وبترمي لعملات مختلفة، و [[sorted(wallet)]] بترتّب، و [[{Money(5, "EGP"), Money(5, "EGP")}]] فيها عنصر واحد، و [[Money(1, "EGP") + 1]] بترمي [[TypeError]] مش [[AttributeError]]، و ٨ [[assert]] بيعدّوا.` },
        { lvl: 'متوسط', t: R`إشعارات بـ plugins`, what: R`[[class Channel]] أساس بـ [[__init_subclass__(name=...)]] بيسجّل كل قناة ([[sms]] و [[email]] و [[fake]])، و [[LoggingMixin]] و [[RetryMixin]] بيتركبوا فوق أي قناة، و [[notify(user, text, channel_name)]] بتختار القناة من الاسم. من دروس الوراثة و Protocol.`, done: R`[[notify(..., "email")]] و [[notify(..., "sms")]] بيستخدموا القناة الصح من غير [[if]] على الاسم، والقناة الـ fake بتسجّل اللي اتبعت في list، واسم قناة مش موجود بيرمي [[KeyError]] فيها الأسامي المتاحة، وقناة بتفشل مرتين بتنجح التالتة واللوج بيتطبع مرة واحدة.` },
        { lvl: 'كبير', t: R`نظام مخزن صغير في الذاكرة`, what: R`[[Product]] dataclass ([[frozen]] و [[slots]] و [[__post_init__]] بيفحص السعر والـ SKU)، و [[Category(StrEnum)]]، و [[class Repo[T]]] generic بـ [[add]] و [[get]] و [[find(pred)]]، و [[Inventory]] بتستخدم [[Repo[Product]]] بالـ composition وفيها [[restock]] و [[sell]] بترمي [[OutOfStock]] (exception بتاعتك وارثة من [[Exception]])، و [[Storage]] Protocol بـ [[MemoryStorage]] و [[FileStorage]] (بـ [[with open]] من وحدة الأخطاء و with) بيحفظوا حالة المخزن كسطور نص. وكل عملية بتتسجّل بـ [[print]] بوقتها. من كل دروس الوحدة ومن وحدة الأخطاء و with.`, done: R`ملف اختبارات pytest فيه ١٥ اختبار على الأقل وكلهم بيعدّوا (منهم: بيع أكتر من المخزون بيرمي [[OutOfStock]] والكمية متتغيرش، و SKU متكرر بيترفض، و Product بسعر صفر بيترفض)، و [[mypy --strict]] بيقول [[Success]]، والبرنامج لو اتقفل واتفتح تاني بـ [[FileStorage]] بيرجع لنفس الحالة، ولو الملف بايظ (سطر ناقص) بيطبع رقم السطر ويكمّل بالباقي.`, ext: R`لما توصل لوحدة «ملفات وداتا وتواريخ» خلّي [[FileStorage]] JSON بـ [[pathlib]] وكتابة آمنة، ولما توصل لـ FastAPI حط عليه endpoints، و [[Repo]] نفسه يتبدّل بقاعدة بيانات من غير ما [[Inventory]] تتغيّر.` },
        { lvl: 'فكرة', t: R`اقرا class من مكتبة حقيقية`, what: R`اختار class من المكتبة القياسية أو مكتبة بتستخدمها ([[collections.Counter]] أو [[pathlib.Path]] أو [[fractions.Fraction]]) وافتح الكود بتاعه ([[inspect.getsource]] أو ملف الـ [[.py]] في [[Lib]]). طلّع: إيه الـ dunders اللي كاتبها، وبيورث من مين ([[__mro__]])، وفيه [[__slots__]] ولا لأ، وفين بيرجّع [[NotImplemented]].`, done: R`ملف ملاحظات فيه جدول لكل dunder لقيته وبيتنادى مع أنهي أداة، والـ MRO مطبوع، و ٣ حاجات اتعلمتها مكانتش في الدرس، وكل واحدة جربتها في سطر كود.`, ext: R`اعمل نفس الحاجة لـ class من Pydantic أو FastAPI لما توصل لهم، وقارن أسلوبهم بأسلوب المكتبة القياسية.` },
      ],
      n: "class و self و property، والوراثة و super، و dunder methods، و dataclass و Enum و Protocol",
      items: [
        {
          cmd: "class و self",
          title: "class بـ __init__ و self و @property",
          desc: R`الـ class قالب بتعمل منه objects. [[__init__]] بيتنادى أول ما الـ object يتعمل، و [[self]] هو الـ object نفسه (Python بيبعته لوحده لكل method). و [[@property]] بتخلي method تتقري كأنها خاصية: [[order.total]] من غير قوسين.

وفيه نوعين methods تانيين: [[@classmethod]] بتاخد الـ class نفسه ([[cls]]) بدل الـ object، وأشهر استخدام ليها طرق إنشاء بديلة ([[Order.from_dict(d)]])، و [[@staticmethod]] دالة عادية ملهاش [[self]] ولا [[cls]] بس مكانها منطقي جوه الـ class. والوراثة و [[super()]] في الدرس الجاي.`,
          example: R`from typing import Self
class Order:
    tax_rate = 0.14
    def __init__(self, customer: str, items: list[float] | None = None):
        self.customer = customer
        self.items = items if items is not None else []
    @property
    def total(self) -> float:
        return round(sum(self.items) * (1 + self.tax_rate), 2)
    def add(self, price: float) -> None:
        if not self.is_valid_price(price):
            raise ValueError(f"invalid price: {price}")
        self.items.append(price)
    @classmethod
    def from_dict(cls, data: dict) -> Self:
        return cls(data["customer"], list(data.get("items", [])))
    @staticmethod
    def is_valid_price(price: float) -> bool:
        return price > 0
    def __repr__(self) -> str:
        return f"Order({self.customer!r}, total={self.total})"
o = Order("Sara", [100, 200])
o.add(50)
print(o, o.total)                             # Order('Sara', total=399.0) 399.0
Order.add(o, 10)
o2 = Order.from_dict({"customer": "Omar", "items": [10]})
print(o2, Order.tax_rate, o2.tax_rate)
o2.tax_rate = 0
print(o2.total, Order.tax_rate)               # 10 0.14
o.total = 5                                   # AttributeError: property 'total' of 'Order' object has no setter`,
          try: R`ضيف method اسمها [[remove(price)]] بترمي [[ValueError]] لو السعر مش في الطلب، و [[classmethod]] اسمها [[empty(customer)]] بتعمل طلب فاضي، وخلّي [[__repr__]] يطبع عدد العناصر كمان. اعمل طلبين فاضيين، وضيف لواحد بس، واتأكد إن التاني لسه فاضي.`,
          sol: R`المتوقع: [[Order('Sara', items=2, total=171.0)]] بعد ما شلت 200، و [[Order('Ali', items=1, total=34.2) Order('Mona', items=0, total=0.0)]]، و [[999 not in order]] لما تشيل حاجة مش موجودة.

النقطة اللي التجربة معمولة عشانها: الطلب التاني لسه فاضي لأن [[__init__]] بيعمل list جديدة لكل object ([[items if items is not None else []]]). لو كنت كتبت [[def __init__(self, customer, items=[])]]، الطلبين هيشاركوا نفس الـ list، والـ 30 هتظهر في Mona كمان، ودي أشهر غلطة في Python (أسئلة الانترفيو آخر التاب). و [[empty]] بترجع [[cls(customer)]] مش [[Order(customer)]]، فلو حد ورث من [[Order]] ونادى [[RushOrder.empty(...)]] هيرجعله RushOrder.`,
          solCode: R`from typing import Self
class Order:
    tax_rate = 0.14
    def __init__(self, customer: str, items: list[float] | None = None):
        self.customer = customer
        self.items = items if items is not None else []
    @property
    def total(self) -> float:
        return round(sum(self.items) * (1 + self.tax_rate), 2)
    def add(self, price: float) -> None:
        if not self.is_valid_price(price):
            raise ValueError(f"invalid price: {price}")
        self.items.append(price)
    def remove(self, price: float) -> None:
        if price not in self.items:
            raise ValueError(f"{price} not in order")
        self.items.remove(price)
    @classmethod
    def from_dict(cls, data: dict) -> Self:
        return cls(data["customer"], list(data.get("items", [])))
    @classmethod
    def empty(cls, customer: str) -> Self:
        return cls(customer)
    @staticmethod
    def is_valid_price(price: float) -> bool:
        return price > 0
    def __repr__(self) -> str:
        return f"Order({self.customer!r}, items={len(self.items)}, total={self.total})"
o = Order("Sara", [100, 200, 50])
o.remove(200)
print(o)
e = Order.empty("Ali")
e2 = Order.empty("Mona")
e.add(30)
print(e, e2)
try:
    o.remove(999)
except ValueError as err:
    print(err)`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة من الذاكرة:** من غير ما تبص فوق، اكتب جدول ٣ صفوف لـ method عادية و [[@classmethod]] و [[@staticmethod]]: أول باراميتر بياخد إيه، وبتتنادى إزاي، ومثال استخدام واحد من الشغل لكل واحدة.`, done: R`الجدول بيقول [[self]] ثم [[cls]] ثم ولا حاجة، وكل مثال منطقي (مثلًا [[from_dict]] للـ classmethod، وفحص قيمة للـ staticmethod)، وقارنته بالدرس ومفيش خانة غلط.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** اكتب على ورقة ناتج السطرين: [[class Cart: items = []]] وجواها [[def add(self, x): self.items.append(x)]]، وبعدين [[a, b = Cart(), Cart(); a.add("tea"); print(b.items, a.items is b.items)]]، وبعدين [[b.items = ["x"]; print(a.items, Cart.items, b.items)]]. وبعدين شغّله.`, done: R`ورقتك طابقت الناتج الحقيقي: [[['tea'] True]] وبعدها [[['tea'] ['tea'] ['x']]]، وتقدر تقول في جملة ليه [[append]] غيّرت الكل و [[=]] غيّرت [[b]] بس.` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[class Order]] فيها [[@classmethod def from_dict(cls, d): return Order(d["c"])]]، و [[class RushOrder(Order): pass]]. اطبع [[type(RushOrder.from_dict({"c": 1})).__name__]]، ولاقي الغلطة وصلّحها.`, done: R`قبل التصليح بيطبع [[Order]]، وبعد ما غيّرت [[Order(...)]] لـ [[cls(...)]] بيطبع [[RushOrder]]، و [[Order.from_dict]] لسه بيرجّع [[Order]].` },
            { lvl: 'تطبيق', t: R`**مسألة بحالات طرفية:** [[BankAccount(owner)]] فيها [[deposit(amount)]] و [[withdraw(amount)]]، و [[balance]] property للقراية بس، و [[@classmethod from_row(row)]] بتاخد [[{"owner": "Sara", "balance": "250"}]] (الرقم نص زي CSV). المبلغ صفر أو سالب = [[ValueError]]، والسحب أكتر من الرصيد = [[ValueError]] برسالة فيها الرصيد.`, done: R`[[a = BankAccount.from_row(...)]] بعدها [[a.deposit(50); a.withdraw(100)]] بيخلي [[a.balance == 200]]، و [[a.withdraw(1000)]] رسالتها فيها [[200]]، و [[a.deposit(0)]] بيرمي، و [[a.balance = 5]] بيرمي [[AttributeError]]، والرصيد ميتغيّرش بعد أي عملية فاشلة.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** لـ [[Product]] اللي في قسم الـ setter، اعمل [[test_product.py]] فيه ٤ اختبارات بـ pytest: التقريب ([[12.499]] تبقى [[12.5]])، والصفر، والسالب، وإن [[Product("x", 0)]] نفسه بيرمي (الإنشاء بيعدّي على الـ setter). استخدم [[pytest.raises(ValueError, match="> 0")]].`, done: R`[[pytest -q]] بيطلّع [[4 passed]]. ولو غيّرت [[self.price = price]] في [[__init__]] لـ [[self._price = price]]، بيقع اختبارين بالظبط: الإنشاء والتقريب (لأن التقريب كمان كان جوه الـ setter)، و [[test_zero]] و [[test_negative]] لسه بيعدّوا. وده بيثبت إن كل اختبار بيقيس حاجة محددة.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** خد [[P]] و [[S]] من قسم [[__slots__]] وقيس بـ [[tracemalloc]] الذاكرة لـ ١٠ آلاف و ١٠٠ ألف و مليون object، وبعدين قيس وقت الإنشاء بـ [[timeit]] لكل واحد. اكتب الأرقام في جدول.`, done: R`عندك ٦ أرقام ذاكرة و ٢ أرقام وقت حقيقية من جهازك، والفرق في الذاكرة بيكبر بنفس النسبة تقريبًا (حوالي ٣٠٪) مع عدد الـ objects، وكاتب جملة: إمتى الفرق ده يستاهل تكتب [[__slots__]] وإمتى لأ.` },
          ],
          deep: {
            why: "الـ models والـ services والـ repositories في أي API هتبقى classes، وحتى Pydantic models و SQLAlchemy models classes. لازم تفهم self و property و classmethod عشان تقرا كود الناس وتكتب objects بتحافظ على الداتا بتاعتها سليمة.",
            how: R`[[o.add(50)]] هي بالظبط [[Order.add(o, 50)]]: عشان كده [[self]] أول باراميتر، والاسم اتفاق مش keyword.

الخاصية المكتوبة في جسم الـ class ([[tax_rate]]) class attribute مشتركة بين كل الـ objects، واللي بـ [[self.x = ...]] instance attribute لكل object لوحده. ولما تقرا [[o2.tax_rate]]، Python بيدوّر في الـ object الأول وبعدين في الـ class. فـ [[o2.tax_rate = 0]] مبتغيّرش الـ class، بتعمل instance attribute جديدة بتغطي عليها في [[o2]] بس. وخلي بالك: class attribute نوعها mutable (list) بتتشارك بين الكل، وده غالبًا bug.

[[@property]] بتحسب القيمة كل ما تتقري، فمش محتاج تخزّن total وتنسى تحدّثه، ومن غير setter مينفعش حد يكتب عليها ([[AttributeError]]). و [[__repr__]] هو اللي بيظهر في الـ REPL واللوج والـ debugger؛ اكتبه دايمًا.

[[Self]] من [[typing]] (3.11+) نوع الرجوع لـ method بترجع object من نفس الـ class، وبيفضل صح حتى في الأبناء. ومفيش private حقيقي في Python: [[_name]] اتفاق معناه «داخلي، متلمسوش»، و [[__name]] بيتغير اسمه (name mangling) عشان ميتصادمش في الوراثة، مش للحماية.`,
            when: "لما يبقى فيه داتا ومعاها سلوك بيتغير عليها أو قواعد لازم تتحافظ (سعر لازم يبقى موجب). لو داتا بس: dataclass أو Pydantic. لو سلوك بس من غير state: دوال عادية في module كفاية، Python مش Java.",
            mistakes: R`تنسى [[self]] في تعريف method ([[takes 0 positional arguments but 1 was given]]). و [[items=[]]] كـ default في [[__init__]] أو كـ class attribute فكل الطلبات تشارك نفس الليستة. و [[Order(...)]] جوه classmethod بدل [[cls(...)]] فالوراثة تبوظ. و class لكل حاجة حتى لو دالة واحدة. و getters و setters على طريقة Java ([[get_total()]]) بدل خاصية عادية أو [[@property]].`
          },
          teach: R`## المثال بيعمل إيه؟

class اسمه [[Order]] (طلب شرا): فيه اسم العميل وليستة أسعار، وإجمالي بالضريبة بيتحسب لوحده، و method بتضيف سعر بعد ما تتأكد إنه صح، وطريقة تانية تعمل طلب من dict. وبعدين بيجرّب الفرق بين خاصية الـ class وخاصية الـ object. اتشغّل بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker)، والناتج واحد.

كلمتين قبل ما نبدأ:

- **class**: القالب. [[Order]] نفسه.
- **object** (أو instance): نسخة معمولة من القالب. [[o = Order(...)]].
- **attribute**: متغير مربوط بـ object أو class ([[o.customer]]). و **method**: دالة متعرّفة جوه الـ class ([[o.add]]).

---

## ١. [[Self]] و [[class Order:]]

~~~python
from typing import Self
class Order:
    tax_rate = 0.14
~~~

- [[Self]] (من 3.11): type hint معناه «object من نفس الـ class ده». هنستخدمه تحت.
- [[class Order:]]: عرّف class. الاسم بـ PascalCase (أول كل كلمة كابيتال) ده العرف.
- [[tax_rate = 0.14]]: متغير مكتوب في جسم الـ class مباشرة، اسمه **class attribute**: واحد بس، مشترك بين كل الطلبات. 0.14 يعني ١٤٪.

---

## ٢. [[__init__]] و [[self]]

~~~python
    def __init__(self, customer: str, items: list[float] | None = None):
        self.customer = customer
        self.items = items if items is not None else []
~~~

- [[__init__]]: method بالاسم ده Python بيناديها **لوحده** أول ما تكتب [[Order(...)]]، عشان تجهّز الـ object الجديد.
- [[self]]: أول باراميتر في أي method، وهو **الـ object نفسه**. Python بيبعته لوحده، فإنت بتكتب [[Order("Sara", [100, 200])]] من غير ما تبعت [[self]]. والاسم اتفاق مش كلمة محجوزة، بس محدش بيغيّره.
- [[list[float] | None = None]]: النوع «list أرقام أو None»، والـ default [[None]]. ([[|]] هنا معناها «أو» في الأنواع.)
- [[self.customer = customer]]: اعمل attribute على **الـ object ده** اسمه [[customer]]. ده اسمه **instance attribute**: كل طلب ليه واحد لوحده.
- [[items if items is not None else []]]: لو اتبعتت list استخدمها، غير كده اعمل list **جديدة**. ليه مش [[items=[]]] في الباراميتر على طول؟ لأن الـ default بيتعمل مرة واحدة وقت تعريف الدالة، فكل الطلبات كانت هتشارك **نفس** الـ list.

---

## ٣. [[@property]]: method بتتقري من غير أقواس

~~~python
    @property
    def total(self) -> float:
        return round(sum(self.items) * (1 + self.tax_rate), 2)
~~~

- [[@property]]: decorator بيخلّي [[o.total]] تنادي الـ method دي من غير [[()]]. فالإجمالي بيتحسب **كل مرة** من الأسعار الحالية، ومستحيل يبقى قديم.
- [[sum(self.items)]]: مجموع الأسعار.
- [[(1 + self.tax_rate)]]: [[1.14]]، يعني السعر + ١٤٪. و [[self.tax_rate]] مش متعرّفة على الـ object، فـ Python بيدوّر في الـ class ويلاقيها (هنرجعلها).
- [[round(..., 2)]]: قرّب لرقمين عشريين (قروش).

---

## ٤. method عادية و [[@staticmethod]]

~~~python
    def add(self, price: float) -> None:
        if not self.is_valid_price(price):
            raise ValueError(f"invalid price: {price}")
        self.items.append(price)
...
    @staticmethod
    def is_valid_price(price: float) -> bool:
        return price > 0
~~~

- [[add]]: بتعدّل الـ object، فمحتاجة [[self]].
- [[@staticmethod]]: method **ملهاش** [[self]]: دالة عادية خالص، بس مكانها منطقي جوه الـ class. بتتنادى من الـ class أو من الـ object: [[Order.is_valid_price(3)]] رجّعت [[True]] و [[o.is_valid_price(0)]] رجّعت [[False]].
- [[raise ValueError(...)]]: ارفض السعر الغلط. اتجرّب [[o.add(-5)]]:

~~~text الناتج
ValueError: invalid price: -5
~~~

---

## ٥. [[@classmethod]]: طريقة إنشاء تانية

~~~python
    @classmethod
    def from_dict(cls, data: dict) -> Self:
        return cls(data["customer"], list(data.get("items", [])))
~~~

- [[@classmethod]]: أول باراميتر بقى **الـ class نفسه** بدل الـ object، واسمه بالعرف [[cls]].
- [[cls(...)]]: يعني [[Order(...)]]. ليه مش نكتب [[Order]] على طول؟ لأن لو حد عمل class ابن من [[Order]] ونادى [[Child.from_dict(...)]]، [[cls]] هيبقى [[Child]] فيرجعله ابن. وده سبب [[-> Self]].
- [[data.get("items", [])]]: [[get]] بتجيب المفتاح، ولو مش موجود ترجّع الـ default [[[]]] بدل ما ترمي [[KeyError]].
- [[list(...)]]: نسخة جديدة، عشان الطلب ميشاركش الـ list مع الـ dict اللي اتبعت.

---

## ٦. [[__repr__]]: شكله وهو بيتطبع

~~~python
    def __repr__(self) -> str:
        return f"Order({self.customer!r}, total={self.total})"
~~~

[[__repr__]] بيتنادى لوحده لما تطبع الـ object أو تشوفه في الـ REPL أو الـ debugger. و [[!r]] بتحط الاسم بين علامات تنصيص. من غيره هتشوف حاجة زي [[<__main__.Order object at 0x...>]].

---

## ٧. التشغيل سطر سطر

~~~python
o = Order("Sara", [100, 200])
o.add(50)
print(o, o.total)
~~~

~~~text الناتج
Order('Sara', total=399.0) 399.0
~~~

(100 + 200 + 50) × 1.14 = 399.0. و [[o.add(50)]] Python بيترجمها لـ [[Order.add(o, 50)]]: الـ object اللي قبل النقطة بقى [[self]]. والسطر الجاي بيكتبها بالشكل الطويل ده بالظبط:

~~~python
Order.add(o, 10)
~~~

بعده [[o.items]] بقت [[[100, 200, 50, 10]]] و [[o.total]] بقى [[410.4]].

~~~python
o2 = Order.from_dict({"customer": "Omar", "items": [10]})
print(o2, Order.tax_rate, o2.tax_rate)
~~~

~~~text الناتج
Order('Omar', total=11.4) 0.14 0.14
~~~

[[tax_rate]] اتقرت من الـ class مباشرة ومن الـ object، والاتنين نفس القيمة: Python بيدوّر في الـ object الأول، وملقاهاش، فراح للـ class.

### تعيين على الـ object مبيغيّرش الـ class

~~~python
o2.tax_rate = 0
print(o2.total, Order.tax_rate)
~~~

~~~text الناتج
10 0.14
~~~

[[o2.tax_rate = 0]] عملت instance attribute **جديدة** على [[o2]] بس، وغطّت على اللي في الـ class. شوف الـ [[__dict__]] (الـ dict اللي Python شايل فيه attributes الـ object):

~~~text الناتج: o2.__dict__
{'customer': 'Omar', 'items': [10], 'tax_rate': 0}
~~~

وطلع [[10]] مش [[10.0]] لأن كل الحساب بقى أرقام صحيحة: [[10 * (1 + 0)]] = [[10]]، و [[round]] على int بيرجّع int.

### الـ property من غير setter

~~~python
o.total = 5
~~~

~~~text الناتج
AttributeError: property 'total' of 'Order' object has no setter
~~~

مفيش طريقة تكتب بيها على [[total]]، فمحدش يقدر يحط إجمالي مش مطابق للأسعار.

---

## ٨. الحل: [[remove]] و [[empty]]

الجزء الجديد بس:

~~~python solCode
    def remove(self, price: float) -> None:
        if price not in self.items:
            raise ValueError(f"{price} not in order")
        self.items.remove(price)
    @classmethod
    def empty(cls, customer: str) -> Self:
        return cls(customer)
    def __repr__(self) -> str:
        return f"Order({self.customer!r}, items={len(self.items)}, total={self.total})"
~~~

- [[price not in self.items]]: [[in]] بيسأل «موجود في الليستة؟»، و [[not in]] عكسه.
- [[self.items.remove(price)]]: [[list.remove]] بتشيل **أول** عنصر قيمته كده.
- [[cls(customer)]]: من غير items، فـ [[__init__]] بيعمل list فاضية جديدة.
- [[len(self.items)]]: عدد العناصر.

~~~text الناتج
Order('Sara', items=2, total=171.0)
Order('Ali', items=1, total=34.2) Order('Mona', items=0, total=0.0)
999 not in order
~~~

- (100 + 50) × 1.14 = 171.0.
- [[Mona]] لسه [[items=0]] بعد ما ضفنا 30 لـ [[Ali]]: كل طلب ليه list لوحده، بفضل [[items if items is not None else []]].

---

## ٩. property بـ setter: الفحص وقت الكتابة

الـ [[total]] فوق للقراية بس. بس ساعات عايز الخانة تتكتب، **بشرط** القيمة تبقى سليمة. ده شغل [[@اسم.setter]]:

~~~python
class Product:
    def __init__(self, name: str, price: float):
        self.name = name
        self.price = price          # بيعدّي على الـ setter
    @property
    def price(self) -> float:
        return self._price
    @price.setter
    def price(self, value: float) -> None:
        if value <= 0:
            raise ValueError(f"price must be > 0, got {value}")
        self._price = round(value, 2)
p = Product("tea", 12.499)
print(p.price)
p.price = 15
print(p.price, p.__dict__)
p.price = -1
~~~

~~~text الناتج (Python 3.14 على ويندوز)
12.5
15 {'name': 'tea', '_price': 15}
ValueError: price must be > 0, got -1
~~~

- [[@property]] على [[price]] الأولى: القراية بترجّع [[self._price]]، الخانة الحقيقية اللي اسمها بـ [[_]] في أوله.
- [[@price.setter]]: لازم الاسم يبقى **نفس اسم** الـ property ([[price]])، وإلا هتبقى عندك خاصيتين مختلفتين. أي [[p.price = ...]] بتنادي الدالة دي بالقيمة.
- [[self.price = price]] جوه [[__init__]] بتعدّي على الـ setter كمان، فـ [[Product("x", 0)]] بيترفض من أول لحظة ([[price must be > 0, got 0]] اتجرّبت). لو كتبت [[self._price = price]] هناك، الفحص هيتعدّى وقت الإنشاء.
- [[p.__dict__]] بيوريك اللي متخزّن فعلًا: [[_price]] مش [[price]]. الـ property نفسها عايشة في الـ class مش في الـ object.
- الغلطة المشهورة: [[self.price = value]] **جوه** الـ setter نفسه بتنادي الـ setter تاني، وتاني... لحد [[RecursionError: maximum recursion depth exceeded]]. اكتب في [[self._price]].

وإمتى؟ لما فيه قاعدة لازم تتحافظ على خانة بتتكتب من برّه. لو الخانة بتتكتب مرة واحدة في الإنشاء، فحص في [[__init__]] (أو [[__post_init__]] في الـ dataclass) أبسط. ولو قواعد كتير على داتا جاية من API، ده شغل Pydantic (وحدة Pydantic v2).

---

## ١٠. [[__slots__]] في class عادي: قيس الذاكرة

كل object عادي شايل dict صغير ([[__dict__]]) فيه خاناته. [[__slots__]] بيقول لـ Python «الخانات دي بس»، فبيحجز مكانهم مباشرة من غير dict:

~~~python
import tracemalloc
class P:
    def __init__(self, x, y): self.x, self.y = x, y
class S:
    __slots__ = ("x", "y")
    def __init__(self, x, y): self.x, self.y = x, y
for cls in (P, S):
    tracemalloc.start()
    objs = [cls(i, i) for i in range(100_000)]
    cur, peak = tracemalloc.get_traced_memory()
    tracemalloc.stop()
    print(cls.__name__, round(cur / 1024 / 1024, 1), "MB")
    del objs
s = S(1, 2)
s.z = 3
~~~

~~~text الناتج (اتشغّل فعلًا، Python 3.14 ويندوز ١١)
P 12.2 MB
S 8.4 MB
AttributeError: 'S' object has no attribute 'z' and no __dict__ for setting new attributes
~~~

- [[tracemalloc]] بيعدّ الذاكرة اللي Python حجزها من بعد [[start()]]. و [[get_traced_memory()]] بترجّع (دلوقتي، أعلى قيمة) بالبايت، فقسمنا على [[1024 * 1024]] عشان ميجا.
- ١٠٠ ألف object: ١٢.٢ ميجا من غير slots و ٨.٤ بيها، يعني حوالي ٣٠٪ أقل. والرقم ده بيفرق لما بتعمل ملايين objects (صفوف داتا، نقط، أحداث)، ومش بيفرق لـ ١٠ objects.
- الميزة التانية: الغلطة الإملائية ([[s.z]] أو [[s.nmae]]) بتطلع error فورًا بدل ما تعمل خانة جديدة في صمت. ورسالة Python 3.13 و 3.14 بتقول السبب بالظبط (اتجرّبت على الاتنين): «مفيش [[__dict__]] تحط فيه خانات جديدة».
- العيب: مينفعش تزوّد خانة مش في اللستة، و [[vars(s)]] بترمي [[TypeError]]، والوراثة محتاجة كل class في السلسلة يكتب [[__slots__]] بتاعه عشان التوفير يفضل. وفي الـ dataclass بتكتب [[slots=True]] بدل ما تكتبها بإيدك (الدرس الجاي).

---

## ١١. [[_name]] و [[__name]]: مفيش private في Python

~~~python
class Account:
    def __init__(self):
        self._balance = 0
        self.__pin = "1234"
a = Account()
print(a._balance)
print(a.__pin)
~~~

~~~text الناتج
0
AttributeError: 'Account' object has no attribute '__pin'
~~~

- [[_balance]] (شرطة واحدة): **اتفاق** معناه «داخلي، متلمسوش من برّه». Python مبيمنعش حاجة، بس المحررات و linters زي ruff بتحذّر.
- [[__pin]] (شرطتين في الأول ومش في الآخر): Python بيغيّر الاسم وهو بيقرا الـ class لـ [[_Account__pin]] (اسمها name mangling). فـ [[a._Account__pin]] بترجّع [[1234]] عادي، و [[list(vars(a))]] بتطلع [[['_balance', '_Account__pin']]]. الهدف إن ابن يكتب [[__pin]] بتاعه من غير ما يدوس على بتاع الأب، **مش** حماية.
- يعني: متحطش سر في object على أساس إنه «private». اللي عايز يحمي داتا بيحميها بالتصميم (property من غير setter، أو object [[frozen]]).

## الخلاصة

| الحاجة | أول باراميتر | بتتنادى إزاي |
|---|---|---|
| method عادية | [[self]] (الـ object) | [[o.add(50)]] |
| [[@classmethod]] | [[cls]] (الـ class) | [[Order.from_dict(d)]] |
| [[@staticmethod]] | ولا حاجة | [[Order.is_valid_price(3)]] |
| [[@property]] | [[self]] | [[o.total]] من غير أقواس |

- class attribute واحدة مشتركة، و [[self.x = ...]] لكل object لوحده.
- القراية بتدوّر في الـ object وبعدين الـ class، والكتابة على الـ object بتعمل attribute جديدة عليه.
- default الـ list في [[__init__]] يبقى [[None]]، مش [[[]]].`,
          lines: [
            R`[[Self]] من [[typing]] (Python 3.11 وبعده) type hint معناه «object من نفس الـ class ده». هنستخدمه كنوع رجوع لـ [[from_dict]]، وميزته إنه بيفضل صح لو حد ورث من [[Order]]: الابن هيرجّع ابن مش [[Order]]. مبيأثرش على التشغيل، ده للمحرر و mypy بس.`,
            R`[[class Order:]] بتعرّف قالب اسمه [[Order]]. كل اللي متزاح تحته جزء من الـ class، والاسم بيتكتب CamelCase بالاتفاق (PEP 8) عشان تفرّقه عن الدوال والمتغيرات اللي بتتكتب snake_case.`,
            R`متغير مكتوب في جسم الـ class نفسه = **class attribute**: نسخة واحدة مشتركة بين كل الطلبات. لو غيّرت [[Order.tax_rate]] كل الطلبات هتشوف الرقم الجديد. وده مكان مناسب للثوابت؛ ولو حطيت فيه list هتبقى list واحدة لكل الـ objects (bug مشهور، شوف التمارين).`,
            R`[[__init__]] بيتنادى لوحده أول ما تكتب [[Order(...)]]، و [[self]] هو الـ object الجديد اللي لسه معمول. و [[items]] الـ default بتاعها [[None]] مش [[[]]]: الـ default بيتحسب **مرة واحدة** وقت تعريف الدالة، فلو كان [[[]]] كل الطلبات هتشارك نفس الليستة.`,
            R`[[self.customer = customer]] بتعمل **instance attribute**: خانة جوه الـ object ده بس. [[customer]] اللي على اليمين الباراميتر، و [[self.customer]] اللي على الشمال الخانة اللي هتفضل بعد ما [[__init__]] يخلص. من غير السطر ده الاسم يضيع أول ما الدالة ترجع.`,
            R`لو حد بعت list نستخدمها، ولو لأ ([[None]]) نعمل [[[]]] جديدة **دلوقتي** لكل طلب. [[is not None]] أدق من [[if items]]، لأن [[if items]] كانت هتعتبر list فاضية اتبعتت قصد زي «مفيش» وتعمل واحدة جديدة غيرها.`,
            R`[[@property]] decorator بيحوّل الـ method اللي تحته لخاصية: بتتقري [[o.total]] من غير أقواس، وبتتحسب في كل قراية. ومن غير setter (شوف قسم الـ setter في الشرح) أي كتابة عليها بترمي [[AttributeError]].`,
            R`[[def total(self) -> float:]] الـ method اللي الـ property ماسكاها. [[-> float]] نوع الرجوع للقارئ وللأدوات. مفيش باراميتر غير [[self]] لأن الخاصية مبتاخدش arguments.`,
            R`بيجمع الأسعار ويضرب في [[1 + tax_rate]] (يعني ١.١٤)، وبعدين [[round(..., 2)]] لرقمين عشريين عشان [[float]] ميطلّعش [[398.99999999]]. ولأنها بتتحسب كل مرة، مستحيل الإجمالي يبقى قديم بعد [[add]]؛ لو كنت خزّنته في [[__init__]] كان لازم تفتكر تحدّثه في كل مكان بيغيّر [[items]].`,
            R`method عادية: أول باراميتر [[self]] (الطلب اللي اتنادت عليه) وبعده السعر. [[-> None]] معناها إنها بتعدّل الـ object نفسه ومبترجّعش حاجة، فـ [[x = o.add(5)]] هيدّيك [[None]].`,
            R`قبل ما نضيف، بنسأل الـ staticmethod [[is_valid_price]]. بنناديها بـ [[self.]] (أو [[Order.]])؛ الاتنين شغالين. القاعدة اللي بتحمي الداتا مكانها هنا جوه الـ class، فمفيش كود برّه يقدر يحط سعر سالب من غير ما يعدّي عليها.`,
            R`لو السعر غلط بنرمي [[ValueError]] برسالة فيها القيمة نفسها ([[invalid price: -5]])، عشان اللي بيقرا اللوج يعرف إيه اللي اتبعت. والرمي بيوقّف الـ method قبل السطر اللي بعده، فالليستة مبتتلمسش.`,
            R`[[append]] بيضيف السعر لليستة الطلب ده بس (لأن [[self.items]] list خاصة بيه). مش محتاجين نحدّث أي إجمالي، لأن [[total]] بيتحسب من [[items]] وقت القراية.`,
            R`[[@classmethod]] بيخلي الـ method اللي تحته تاخد الـ **class** نفسه كأول باراميتر بدل الـ object. وده الشكل المعتاد لطرق إنشاء تانية: [[Order.from_dict(...)]] بتتنادى على الـ class قبل ما يبقى فيه object أصلًا.`,
            R`[[cls]] هو [[Order]] (أو الابن لو اتنادت عليه)، و [[data: dict]] الـ dict اللي جاي من JSON مثلًا. نوع الرجوع [[Self]] بيقول للمحرر إنها بترجّع object من نفس الـ class اللي اتنادت عليه.`,
            R`[[cls(...)]] بدل [[Order(...)]]: لو [[RushOrder(Order)]] نادى [[from_dict]] هيرجعله [[RushOrder]]. و [[data["customer"]]] بترمي [[KeyError]] لو الاسم ناقص (إجباري)، و [[data.get("items", [])]] بتدّي ليستة فاضية لو مش موجودة، و [[list(...)]] بتعمل نسخة عشان تعديل الطلب ميغيّرش الـ dict الأصلي.`,
            R`[[@staticmethod]] = دالة عادية متحطوطة جوه الـ class: ملهاش [[self]] ولا [[cls]]، فمبتعرفش حاجة عن الـ object. بنحطها هنا عشان مكانها منطقي (قاعدة السعر بتاعة الطلب)، وممكن تتنادى من غير object: [[Order.is_valid_price(5)]].`,
            R`[[price: float]] الباراميتر الوحيد (مفيش [[self]])، و [[-> bool]] بترجّع صح أو غلط. لو نسيت [[@staticmethod]] فوقها، Python هيبعت الـ object في [[price]] والمقارنة هتبقى بين [[Order]] ورقم وترمي [[TypeError]].`,
            R`القاعدة نفسها: السعر لازم يبقى أكبر من صفر. [[0]] مرفوض و [[0.01]] مقبول. ولو القاعدة اتغيّرت (حد أقصى مثلًا) بتتغيّر في السطر ده بس، وكل اللي بينادي [[add]] بيلتزم بيها لوحده.`,
            R`[[__repr__]] الشكل اللي بيظهر لما تطبع الـ object، أو تكتبه في الـ REPL، أو يظهر في لوج أو debugger. من غيره هتشوف [[<__main__.Order object at 0x000001F...>]] ومش هتعرف ده أنهي طلب.`,
            R`[[!r]] جوه الـ f-string معناها «استخدم [[repr]] للقيمة»، فالاسم بيطلع بعلامات تنصيص ([['Sara']]) وتفرق بينه وبين رقم. و [[self.total]] بتتقري كخاصية من غير أقواس، يعني الـ property شغالة جوه الـ class زي برّه.`,
            R`[[Order("Sara", [100, 200])]] بيعمل object: Python بيعمل object فاضي وبعدين ينادي [[__init__]] عليه بـ [[self]] = الـ object ده والاتنين التانيين. و [[o]] بقى شايل طلب فيه سعرين.`,
            R`[[o.add(50)]] هي نفسها [[Order.add(o, 50)]]: النقطة بتلاقي [[add]] في الـ class وبتبعت [[o]] في [[self]] لوحدها. عشان كده [[self]] لازم يبقى أول باراميتر في التعريف.`,
            R`[[print]] بتنادي [[__repr__]] (لأن مفيش [[__str__]]) فبيطلع [[Order('Sara', total=399.0)]]، وبعده [[o.total]] = (١٠٠+٢٠٠+٥٠) × ١.١٤ = [[399.0]].`,
            R`نفس النداء بالشكل الطويل: بتبعت [[o]] بإيدك في مكان [[self]]. مش هتكتبه كده في الشغل، بس هو اللي بيوضح إن [[self]] مجرد باراميتر عادي اسمه متفق عليه، مش كلمة محجوزة.`,
            R`[[o2]] اتعمل من dict بالـ classmethod مش من [[__init__]] على طول. ولأن الـ dict فيه [[items]]، [[o2.items]] بقت [[[10]]] (نسخة منها).`,
            R`بيطبع [[Order('Omar', total=11.4) 0.14 0.14]]: الـ class attribute بتتقري من الـ class ومن أي object. لما تكتب [[o2.tax_rate]] Python بيدوّر في الـ object الأول، ومش لاقيها، فبيدوّر في الـ class.`,
            R`**الكتابة** على الـ object مش بتغيّر الـ class: بتعمل خانة جديدة اسمها [[tax_rate]] جوه [[o2]] بس، بتغطي على بتاعة الـ class. [[vars(o2)]] بعدها هيبان فيه [[tax_rate: 0]]. ولو كنت عايز تغيّر للكل: [[Order.tax_rate = 0]].`,
            R`[[10]]: [[o2]] بقى من غير ضريبة لأن القراية لقت الخانة الجديدة فيه، و [[Order.tax_rate]] لسه [[0.14]]، و [[o]] نفسه لسه بيحسب بالضريبة.`,
            R`كتابة على property ملهاش setter بترمي [[AttributeError: property 'total' of 'Order' object has no setter]] (نص Python 3.14 بالظبط). وده المطلوب: الإجمالي بيتحسب، ومحدش يقدر يكتب رقم مزوّر فيه. السطر ده بيوقّف السكربت، فهو آخر سطر.`,
          ]
        },
        {
          cmd: "الوراثة و super و MRO",
          title: "وراثة و super() و mixins: Python بيدوّر على الـ method فين؟",
          desc: R`[[class SmsNotifier(Notifier):]] معناها إن SmsNotifier بيورث كل حاجة في Notifier، وتقدر تعيد تعريف أي method (override). و [[super().send(...)]] بينادي النسخة اللي في الأب، فتزوّد على سلوكه بدل ما تنسخه.

و Python بيسمح بوراثة من أكتر من class. أشهر استخدام ليها الـ mixins: classes صغيرة بتضيف سلوك واحد (لوج، cache) وتتركّب مع غيرها. والترتيب اللي Python بيدوّر بيه على الـ methods اسمه MRO، وتشوفه بـ [[Class.__mro__]].`,
          example: R`class Notifier:
    def __init__(self, sender: str):
        self.sender = sender
    def send(self, to: str, text: str) -> str:
        return f"[{self.sender}] -> {to}: {text}"
class SmsNotifier(Notifier):
    def __init__(self, sender: str, max_len: int = 160):
        super().__init__(sender)
        self.max_len = max_len
    def send(self, to: str, text: str) -> str:
        return super().send(to, text[: self.max_len])
class LoggingMixin:
    def send(self, to: str, text: str) -> str:
        result = super().send(to, text)
        print("LOG:", result)
        return result
class LoggedSms(LoggingMixin, SmsNotifier):
    pass
n = LoggedSms("shop", max_len=5)
n.send("010", "hello world")                  # LOG: [shop] -> 010: hello
print([c.__name__ for c in LoggedSms.__mro__])
print(isinstance(n, Notifier), issubclass(SmsNotifier, LoggingMixin))`,
          try: R`اطبع [[LoggedSms.__mro__]] وافهم الترتيب. وبعدين اعمل [[SignMixin]] بترجع [[super().send(...) + " (via shop)"]]، واعمل classين: [[A(LoggingMixin, SignMixin, SmsNotifier)]] و [[B(SignMixin, LoggingMixin, SmsNotifier)]]. نادي [[send]] على الاتنين وقارن سطر الـ LOG والقيمة اللي رجعت.`,
          sol: R`الاتنين بيرجعوا [[[shop] -> 010: hello (via shop)]]، بس سطر اللوج مختلف: A بيطبع [[LOG: [shop] -> 010: hello (via shop)]] و B بيطبع [[LOG: [shop] -> 010: hello]] من غير التوقيع.

السبب الـ MRO: في A الترتيب [[A, LoggingMixin, SignMixin, SmsNotifier, Notifier, object]]، فـ LoggingMixin بينادي [[super()]] اللي هو SignMixin، والتوقيع بيتضاف قبل ما اللوج يشوف النتيجة. وفي B العكس: SignMixin برّه، فاللوج بيشوف النتيجة قبل التوقيع. يعني [[super()]] مش «الأب»، هو «اللي بعدي في الـ MRO بتاع الـ object الحقيقي». الغلطة الشائعة إنك تفتكر إن ترتيب الـ mixins مش فارق، أو إن [[super()]] جوه mixin بينادي [[object]] (هو بينادي اللي بعده في السلسلة، وعشان كده الـ mixin بيشتغل أصلًا).`,
          solCode: R`class Notifier:
    def __init__(self, sender: str):
        self.sender = sender
    def send(self, to: str, text: str) -> str:
        return f"[{self.sender}] -> {to}: {text}"
class SmsNotifier(Notifier):
    def __init__(self, sender: str, max_len: int = 160):
        super().__init__(sender)
        self.max_len = max_len
    def send(self, to: str, text: str) -> str:
        return super().send(to, text[: self.max_len])
class LoggingMixin:
    def send(self, to: str, text: str) -> str:
        result = super().send(to, text)
        print("LOG:", result)
        return result
class SignMixin:
    def send(self, to: str, text: str) -> str:
        return super().send(to, text) + " (via shop)"
class A(LoggingMixin, SignMixin, SmsNotifier):
    pass
class B(SignMixin, LoggingMixin, SmsNotifier):
    pass
print("A returns:", A("shop", max_len=5).send("010", "hello world"))
print("B returns:", B("shop", max_len=5).send("010", "hello world"))
print([c.__name__ for c in A.__mro__])
print([c.__name__ for c in B.__mro__])`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**اشرحها:** اكتب لزميل في ٣ سطور: [[super()]] بتنادي مين بالظبط؟ وليه [[LoggingMixin]] بتنادي [[SmsNotifier]] رغم إنها مش وارثة منه؟ وإيه اللي بيحصل لو الابن كتب [[__init__]] ونسي [[super().__init__]]؟`, done: R`السطور التلاتة فيها كلمة MRO، وإن [[super()]] بتمشي على MRO الـ object مش الـ class اللي مكتوبة فيه، وإن نسيان [[super().__init__]] بيطلّع [[AttributeError]] على خانة الأب بعدين (جرّبتها وطلعت [[has no attribute]]).` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[class A]] و [[B(A)]] و [[C(A)]] و [[D(B, C)]] زي قسم الماسة، بس [[C.hi]] بترجّع [[A.hi(self)]] بالاسم بدل [[super().hi()]]. اكتب ناتج [[D().hi()]]، وبعدين خلّي [[B.hi]] كمان بالاسم واكتب الناتج تاني.`, done: R`شغّلت الاتنين وطابقوا ورقتك: الأول [[B+C+A]]، والتاني [[B+A]] ([[C]] اتشالت من السلسلة لأن [[B]] بقت تنادي [[A]] على طول)، وتقدر تقول ليه.` },
            { lvl: 'تطبيق', t: R`**صلّح:** [[class X(A, B)]] و [[B]] ابن [[A]] بيرمي [[TypeError: Cannot create a consistent method resolution order]]. صلّحه بطريقتين، واطبع [[X.__mro__]] في كل واحدة.`, done: R`الطريقتين ([[X(B, A)]] و [[X(B)]]) بيعرّفوا الـ class، والـ MRO فيهم الاتنين [[X, B, A, object]]، وكاتب في تعليق ليه الأولى كانت مستحيلة.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[RetryMixin]] بتعيد [[send]] لحد ٣ مرات لو رمت [[ConnectionError]]، و [[FlakySms(SmsNotifier)]] بترمي أول مرتين وتنجح التالتة. ركّب [[class SafeSms(LoggingMixin, RetryMixin, FlakySms)]].`, done: R`[[SafeSms("shop").send("010", "hi")]] بيرجّع الرسالة بعد ٣ محاولات واللوج بيتطبع **مرة واحدة**، ولو خليت [[FlakySms]] ترمي ٥ مرات الـ [[ConnectionError]] بيوصل لبرّه بعد ٣ محاولات بالظبط (عدّاد بيقول [[3]]).` },
            { lvl: 'تطبيق', t: R`**refactor لـ composition:** [[class ReportEmailer(CsvExporter, EmailSender)]] بيورث الاتنين عشان يعمل CSV ويبعته. حوّله لـ [[ReportEmailer(exporter, sender)]] بياخدهم في [[__init__]]، وجرّبه بـ [[JsonExporter]] و sender وهمي بيحفظ اللي اتبعت في list.`, done: R`الناتج المبعوت زي القديم بالظبط مع الـ CSV، وبقيت تقدر تبعت JSON من غير ما تعمل class جديد، والاختبار مبيبعتش إيميل حقيقي (الـ list فيها رسالة واحدة).` },
            { lvl: 'تحدي', t: R`**مسألة plugins:** وسّع [[Exporter]] بـ [[__init_subclass__]]: ارفض [[fmt]] متكرر برسالة [[ValueError]] فيها اسم الكلاسين، وزوّد [[Exporter.create(fmt)]] بترمي [[KeyError]] برسالة فيها الأنواع المتاحة لو الاسم غلط.`, done: R`تعريف [[class Other(Exporter, fmt="csv")]] بيرمي [[ValueError]] فيها [[CsvExporter]] و [[Other]]، و [[Exporter.create("xml")]] رسالتها فيها [[csv, json]]، و [[Exporter.create("json").export(rows)]] شغال.` },
          ],
          deep: {
            why: R`هتقابل الوراثة في كل framework: [[BaseModel]] في Pydantic، و [[DeclarativeBase]] في SQLAlchemy، و [[Exception]] للأخطاء بتاعتك، و mixins في Django. ولو مش فاهم الـ MRO و [[super()]]، هتتلخبط في أول مرة method مبتتناداش أو بتتنادى مرتين. والـ MRO سؤال انترفيو Python متوسط/متقدم.`,
            how: R`لما تنادي [[n.send(...)]]، Python بيدوّر على [[send]] في الـ classes بترتيب [[type(n).__mro__]] وأول واحد يلاقيها بيشغّلها. الترتيب بيتحسب بخوارزمية اسمها C3 linearization، وقواعدها العملية: الابن قبل الأب، والآباء بنفس ترتيب كتابتهم في تعريف الـ class، وكل class بيظهر مرة واحدة، و [[object]] في الآخر.

[[super()]] من غير باراميترات بترجع proxy بيدوّر في الـ MRO بتاع الـ object الحالي ابتداءً من بعد الـ class اللي انت مكتوب فيه. عشان كده LoggingMixin (اللي مش وارث من حاجة غير object) بتقدر تنادي [[super().send]] وتوصل لـ SmsNotifier: ده «cooperative multiple inheritance»، وشرطه إن كل class في السلسلة ينادي [[super()]] بنفس الـ signature.

لو الابن عرّف [[__init__]]، الأب مبيتناداش لوحده: لازم [[super().__init__(...)]]، وإلا الخواص بتاعة الأب مش هتتعمل ([[AttributeError: 'SmsNotifier' object has no attribute 'sender']]).

[[isinstance(obj, Cls)]] بيقول الـ object من النوع ده أو من أي ابن ليه، و [[issubclass(A, B)]] نفس الكلام على الـ classes.`,
            when: R`وراثة لعلاقة «is-a» حقيقية ومستوى أو اتنين بس، أو لما الـ framework بيطلبها (BaseModel و Exception). وmixins لسلوك صغير مستقل بيتكرر. ولأغلب الحالات التانية composition أوضح: الـ class عنده object تاني ([[self.sender = EmailSender()]]) بدل ما يورث منه. وللـ interface بين الأجزاء: Protocol (درس «Protocol و ABC»).`,
            mistakes: R`تنسى [[super().__init__()]] في الابن. وتنادي [[Notifier.__init__(self, ...)]] بالاسم في وراثة متعددة فالـ class المشترك يتنادى مرتين. ووراثة ٤ و ٥ مستويات عشان تعيد استخدام method واحدة. و override بـ signature مختلف عن الأب (mypy بيعلّم عليه، والـ mixins بتقع). وفي الانترفيو: «إيه الـ diamond problem وPython بيحله إزاي؟» الإجابة: الـ MRO بيضمن إن كل class يظهر مرة واحدة، و [[super()]] بيمشي على السلسلة دي.`
          },
          teach: R`## المثال بيعمل إيه؟

٤ classes بيبنوا على بعض: [[Notifier]] بيبعت رسالة، و [[SmsNotifier]] ابنه بيقص الرسالة لطول معين، و [[LoggingMixin]] class صغير بيطبع لوج، و [[LoggedSms]] بيركّب الاتنين. وبعدين بنسأل Python بيدوّر على [[send]] بأنهي ترتيب. اتشغّل بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker)، والناتج واحد.

| الكلمة | معناها |
|---|---|
| وراثة (inheritance) | class بياخد كل حاجة من class تاني |
| الأب (parent / base) | اللي بنورث منه |
| الابن (child / subclass) | اللي بيورث |
| override | الابن بيعرّف method بنفس اسم واحدة في الأب |
| MRO | Method Resolution Order: ترتيب الـ classes اللي Python بيدوّر فيها على method |

---

## ١. الأب: [[Notifier]]

~~~python
class Notifier:
    def __init__(self, sender: str):
        self.sender = sender
    def send(self, to: str, text: str) -> str:
        return f"[{self.sender}] -> {to}: {text}"
~~~

class عادي (درس «class و self»): بيخزّن اسم المرسل، و [[send]] بترجّع الرسالة متنسقة.

~~~text الناتج: Notifier("shop").send("010", "hello world")
[shop] -> 010: hello world
~~~

---

## ٢. الابن: [[SmsNotifier(Notifier)]]

~~~python
class SmsNotifier(Notifier):
    def __init__(self, sender: str, max_len: int = 160):
        super().__init__(sender)
        self.max_len = max_len
    def send(self, to: str, text: str) -> str:
        return super().send(to, text[: self.max_len])
~~~

- [[(Notifier)]] بعد اسم الـ class: «ورث من [[Notifier]]». أي method مش موجودة في الابن بتتجاب من الأب.
- [[__init__]] جديدة بباراميتر زيادة [[max_len]] (160 حرف، حد رسالة الـ SMS).
- [[super().__init__(sender)]]: [[super()]] بيرجّع object بيوصّلك لـ methods «اللي بعدك في السلسلة»، وهنا يعني [[Notifier]]. فإحنا بنقول لـ [[Notifier.__init__]] يعمل [[self.sender]] بنفسه بدل ما ننسخ كوده.
- [[send]] هنا **override**: نفس الاسم، فبتتنادى هي بدل بتاعة الأب.
- [[text[: self.max_len]]]: slice من الأول لحد [[max_len]] حرف. [["hello world"[:5]]] = [['hello']].
- [[super().send(to, ...)]]: بعد ما قصّينا، نادي [[send]] بتاعة الأب يكمّل الشغل.

~~~text الناتج: SmsNotifier("shop", max_len=5).send("010", "hello world")
[shop] -> 010: hello
~~~

### لو نسيت [[super().__init__]]

اتجرّب ابن [[__init__]] بتاعه مبينادي الأب:

~~~text الناتج
AttributeError: 'Bad' object has no attribute 'sender'
~~~

الابن لما بيعرّف [[__init__]] بتاعه، بتاع الأب **مبيتناداش لوحده**، فـ [[self.sender]] عمره ما اتعمل.

---

## ٣. الـ mixin: [[LoggingMixin]]

~~~python
class LoggingMixin:
    def send(self, to: str, text: str) -> str:
        result = super().send(to, text)
        print("LOG:", result)
        return result
~~~

**mixin** يعني class صغير بيضيف سلوك واحد، ومش معمول يتستخدم لوحده، معمول «يتخلط» مع classes تانية. الغريب هنا إن [[LoggingMixin]] مش وارث من حاجة، ومع ذلك بينادي [[super().send]]. لوحده بيقع:

~~~text الناتج: LoggingMixin().send("a", "b")
AttributeError: 'super' object has no attribute 'send'
~~~

بيشتغل بس لما يتركّب مع class فيه [[send]]، لأن [[super()]] مش معناها «الأب اللي أنا كاتبه»، معناها «**اللي بعدي في الـ MRO بتاع الـ object الحقيقي**». هنشوف ده دلوقتي.

---

## ٤. التركيب: [[LoggedSms]]

~~~python
class LoggedSms(LoggingMixin, SmsNotifier):
    pass
~~~

- وراثة من **اتنين**، مفصولين بفاصلة. الترتيب مهم: الشمال الأول.
- [[pass]]: «مفيش كود»، الـ class ده تركيب بس.

### الـ MRO

~~~python
print([c.__name__ for c in LoggedSms.__mro__])
~~~

- [[LoggedSms.__mro__]]: tuple فيه الـ classes بالترتيب اللي Python هيدوّر بيه. لوحده بيطبع [[(<class '__main__.LoggedSms'>, <class '__main__.LoggingMixin'>, ...)]].
- [[[c.__name__ for c in ...]]]: list comprehension بتاخد اسم كل class بس، عشان يبقى مقروء.

~~~text الناتج
['LoggedSms', 'LoggingMixin', 'SmsNotifier', 'Notifier', 'object']
~~~

القواعد اللي طلّعت الترتيب ده: الابن قبل آبائه، والآباء بنفس ترتيب كتابتهم بين القوسين، وكل class مرة واحدة، و [[object]] (أبو كل الـ classes في Python) في الآخر.

---

## ٥. النداء: نمشي على السلسلة

~~~python
n = LoggedSms("shop", max_len=5)
n.send("010", "hello world")
~~~

### الإنشاء

[[LoggedSms]] و [[LoggingMixin]] ملهمش [[__init__]]، فـ Python بيكمّل في الـ MRO لحد ما يلاقي واحد: [[SmsNotifier.__init__]]، اللي بياخد [[max_len=5]] وينادي [[Notifier.__init__]]. النتيجة: [[vars(n)]] = [[{'sender': 'shop', 'max_len': 5}]].

### [[send]]

| الخطوة | مين بيشتغل | بيعمل إيه |
|---|---|---|
| ١ | [[LoggingMixin.send]] | أول واحد في الـ MRO فيه [[send]]. بينادي [[super().send]] |
| ٢ | [[SmsNotifier.send]] | اللي بعد [[LoggingMixin]] في الـ MRO. بيقص لـ [[hello]] وينادي [[super().send]] |
| ٣ | [[Notifier.send]] | بيرجّع [['[shop] -> 010: hello']] |
| ٤ | [[LoggingMixin.send]] تاني | النتيجة رجعت له، فيطبع اللوج ويرجّعها |

~~~text الناتج في الـ REPL
LOG: [shop] -> 010: hello
'[shop] -> 010: hello'
~~~

السطر الأول من [[print]]، والتاني الـ REPL بيعرض القيمة اللي رجعت (في ملف مش هيظهر).

---

## ٦. [[isinstance]] و [[issubclass]]

~~~python
print(isinstance(n, Notifier), issubclass(SmsNotifier, LoggingMixin))
~~~

- [[isinstance(n, Notifier)]]: «[[n]] من النوع ده أو من أي ابن ليه؟» آه، [[Notifier]] في الـ MRO بتاعه.
- [[issubclass(SmsNotifier, LoggingMixin)]]: «[[SmsNotifier]] ابن [[LoggingMixin]]؟» لأ، الـ mixin اتركّب في [[LoggedSms]] بس.

~~~text الناتج
True False
~~~

---

## ٧. الحل: ترتيب الـ mixins بيفرق

~~~python solCode
class SignMixin:
    def send(self, to: str, text: str) -> str:
        return super().send(to, text) + " (via shop)"
class A(LoggingMixin, SignMixin, SmsNotifier):
    pass
class B(SignMixin, LoggingMixin, SmsNotifier):
    pass
~~~

[[SignMixin]] بيزوّد توقيع على النتيجة **بعد** ما ترجع من [[super()]].

~~~text الناتج
LOG: [shop] -> 010: hello (via shop)
A returns: [shop] -> 010: hello (via shop)
LOG: [shop] -> 010: hello
B returns: [shop] -> 010: hello (via shop)
['A', 'LoggingMixin', 'SignMixin', 'SmsNotifier', 'Notifier', 'object']
['B', 'SignMixin', 'LoggingMixin', 'SmsNotifier', 'Notifier', 'object']
~~~

- في [[A]]: [[LoggingMixin]] برّه و [[SignMixin]] جوه. التوقيع بيتضاف الأول، فاللوج بيشوفه.
- في [[B]]: العكس. اللوج بيشوف النتيجة قبل التوقيع.
- القيمة اللي رجعت واحدة في الاتنين، بس اللوج مختلف. ونفس الكود بالظبط في [[LoggingMixin]] بينادي حاجة مختلفة حسب الـ class اللي اتركّب فيه.

---

## ٨. الماسة (diamond): ليه [[super()]] مش «الأب»

لما ابنين بيورثوا من نفس الأب، وحفيد بيورث الاتنين، كل method لازم تتنادى **مرة واحدة**:

~~~python
class A:
    def hi(self): return 'A'
class B(A):
    def hi(self): return 'B+' + super().hi()
class C(A):
    def hi(self): return 'C+' + super().hi()
class D(B, C): pass
print(D().hi(), [k.__name__ for k in D.__mro__])
~~~

~~~text الناتج (Python 3.14)
B+C+A ['D', 'B', 'C', 'A', 'object']
~~~

- [[super()]] جوه [[B]] نادت [[C]] مش [[A]]، رغم إن [[B]] مش وارث من [[C]] أصلًا. لأنها بتمشي على MRO الـ object الحالي ([[D]]).
- [[A]] اتنادت مرة واحدة بس. لو كل class كان كاتب [[A.hi(self)]] بالاسم، [[A]] كانت هتتنادى مرتين (مرة من [[B]] ومرة من [[C]])، وفي [[__init__]] ده معناه اتصال بالداتابيز يتفتح مرتين مثلًا.
- الترتيب بيتحسب بخوارزمية اسمها C3: الابن قبل أبوه، والآباء بترتيب ما اتكتبوا. ولو الترتيب مستحيل Python بيرفض الـ class من أوله:

~~~text الناتج: class X(A, B) و B ابن A
TypeError: Cannot create a consistent method resolution order (MRO) for bases A, B
~~~

يعني كتبت الأب قبل ابنه. الحل: الأكتر تخصص الأول ([[class X(B, A)]] أو [[class X(B)]] بس).

---

## ٩. composition ولا inheritance

الوراثة معناها «الابن **نوع من** الأب» ([[SmsNotifier]] نوع من [[Notifier]]). لو العلاقة «فيه» أو «بيستخدم»، الأحسن تحط object جوه object (composition):

~~~python
class Engine:
    def start(self) -> str:
        return "engine on"
class Car:
    def __init__(self, engine: Engine):
        self.engine = engine
    def drive(self) -> str:
        return self.engine.start() + ", driving"
class FakeEngine:
    def start(self) -> str:
        return "fake on"
print(Car(Engine()).drive())
print(Car(FakeEngine()).drive())
~~~

~~~text الناتج
engine on, driving
fake on, driving
~~~

- [[Car]] **مش** وارث من [[Engine]]؛ عربية مش نوع من موتور. هي شايلة موتور في [[self.engine]] وبتطلب منه يشتغل.
- الميزة الكبيرة: تقدر تبدّل الجزء من برّه. [[FakeEngine]] في الاختبار، وموتور كهربا في الإنتاج، من غير ما تغيّر [[Car]] ولا تعمل ابن جديد. وده نفس اللي FastAPI بيعمله بالـ dependencies (وحدة Dependencies).
- القاعدة العملية: وراثة لما الابن ينفع يتحط مكان الأب في أي حتة (نفس الـ methods بنفس المعنى)، و composition في أي حاجة تانية. ولو لقيت نفسك بتعمل وراثة تلات أو أربع طبقات عشان تعيد استخدام method واحدة، فكّها لـ composition.

---

## ١٠. [[__init_subclass__]]: الأب بيعرف ولاده

[[__init_subclass__]] بيتنادى على الأب **كل ما class جديد يورث منه**. بيتستخدم في الـ plugins: كل ابن يسجّل نفسه لوحده.

~~~python
class Exporter:
    registry: dict[str, type["Exporter"]] = {}
    def __init_subclass__(cls, *, fmt: str, **kw):
        super().__init_subclass__(**kw)
        Exporter.registry[fmt] = cls
    def export(self, rows: list[dict]) -> str:
        raise NotImplementedError
class CsvExporter(Exporter, fmt="csv"):
    def export(self, rows):
        return "\n".join(",".join(map(str, r.values())) for r in rows)
class JsonExporter(Exporter, fmt="json"):
    def export(self, rows):
        import json
        return json.dumps(rows)
print(Exporter.registry)
print(Exporter.registry["csv"]().export([{"id": 1, "name": "tea"}]))
class Bad(Exporter):
    pass
~~~

~~~text الناتج (Python 3.14)
{'csv': <class '__main__.CsvExporter'>, 'json': <class '__main__.JsonExporter'>}
1,tea
TypeError: Exporter.__init_subclass__() missing 1 required keyword-only argument: 'fmt'
~~~

- [[cls]] هنا هو الابن الجديد ([[CsvExporter]])، مش [[Exporter]]. و [[*, fmt: str]] باراميتر keyword-only (درس [[*args و **kwargs]])، بييجي من [[fmt="csv"]] اللي مكتوبة في سطر الـ class نفسه.
- [[super().__init_subclass__(**kw)]] عشان لو فيه أب تاني فوق بيستخدم نفس الفكرة ياخد الـ arguments بتاعته.
- [[Bad]] من غير [[fmt]] اترفض **وقت تعريف الـ class**، قبل ما أي كود يشتغل. وده أحسن من إنك تكتشف بعد شهر إن فيه نوع مش متسجّل.
- وبعد كده [[Exporter.registry[fmt]()]] بيختار الكلاس من اسم جاي من argument أو من query في API، من غير [[if fmt == "csv": ... elif ...]] بيكبر مع كل نوع جديد.

## الخلاصة

- [[class Child(Parent):]] = ورث كل حاجة، و override بنفس الاسم.
- لو الابن عرّف [[__init__]]: نادي [[super().__init__(...)]].
- [[super()]] = **اللي بعدي في الـ MRO** بتاع الـ object، مش بالضرورة الأب المكتوب.
- [[Class.__mro__]] بيوريك الترتيب: الابن، وبعدين الآباء من الشمال لليمين، و [[object]] في الآخر.
- ترتيب الـ mixins بين القوسين بيغيّر النتيجة.`,
          lines: [
            R`[[Notifier]] الـ class الأساسي (الأب): فيه السلوك المشترك اللي كل أنواع الإشعارات محتاجاه. مش وارث من حاجة صريحة، بس أي class في Python 3 بيورث من [[object]] لوحده، وده هيظهر في آخر الـ MRO.`,
            R`[[__init__]] بتاع الأب بياخد [[sender]]: اسم اللي بيبعت (اسم المحل مثلًا). أي ابن هيحتاج يتأكد إن السطر ده اتنفّذ، وإلا الخانة مش هتتعمل.`,
            R`بيخزّن الاسم في الـ object. ده السطر اللي لو الابن نسي [[super().__init__]] مش هيتنفّذ، و [[self.sender]] هترمي [[AttributeError]] بعدين في [[send]] (القسم «لو نسيت» في الشرح).`,
            R`[[send]] الـ method الأساسية: بتاخد مين هيستلم ([[to]]) والنص، وبترجّع الرسالة كنص بدل ما تطبعها، فأي ابن أو mixin يقدر ياخد الناتج ويزوّد عليه.`,
            R`بترجّع الشكل [[[shop] -> 010: hello]]. القوسين المربعين جزء من النص مش list. ده السلوك اللي الابن هيعيد استخدامه بـ [[super()]] بدل ما ينسخه.`,
            R`[[class SmsNotifier(Notifier):]] = ابن: الاسم اللي بين القوسين هو الأب. أي حاجة مش متعرّفة في الابن (زي الخانات والـ methods) بتتجاب من الأب لوحدها.`,
            R`الابن بيعيد تعريف [[__init__]] عشان عايز باراميتر زيادة ([[max_len]] = أقصى طول للـ SMS، الافتراضي ١٦٠ حرف زي الـ SMS الحقيقي). ولما الابن يكتب [[__init__]] بتاعه، بتاع الأب **مبيتناداش لوحده**.`,
            R`عشان كده بننادي [[super().__init__(sender)]]: «يا اللي بعدي في السلسلة، اعمل الجزء بتاعك». من غيره [[self.sender]] مش هيتعمل. و [[super()]] من غير arguments شغالة جوه أي method في Python 3.`,
            R`بعد ما الأب خلص، الابن بيزوّد الخانة بتاعته. الترتيب المعتاد: الأب الأول، وبعدين زيادة الابن، عشان لو الابن محتاج حاجة الأب عملها يلاقيها.`,
            R`**override**: الابن بيعرّف [[send]] بنفس الاسم والـ signature، فـ [[sms.send(...)]] بتنادي دي مش بتاعة الأب. خلّي نفس الباراميترات، عشان أي كود بيستخدم [[Notifier]] يشتغل مع الابن من غير تغيير.`,
            R`[[text[: self.max_len]]] slice بياخد أول ١٦٠ حرف (أو أقل لو النص أقصر، مفيش error). وبعدين [[super().send(...)]] بيعيد استخدام شكل الرسالة بتاع الأب بدل ما ننسخ الـ f-string هنا، فلو الأب غيّر الشكل الابن بياخده لوحده.`,
            R`**mixin**: class صغير بيدّي سلوك واحد (هنا اللوج) ومش معمول يتعمل منه object لوحده. مش وارث من [[Notifier]] قصد، عشان ينفع يتركّب مع أي class فيه [[send]].`,
            R`نفس اسم [[send]] بنفس الـ signature، فهيتنادى **قبل** اللي في [[SmsNotifier]] لما يتحط قبله في الوراثة.`,
            R`[[super()]] هنا **مش** معناها «الأب بتاع LoggingMixin» (اللي هو [[object]] ومفيهوش [[send]]). معناها «اللي بعدي في الـ MRO بتاع الـ object الحالي»، واللي بعده في [[LoggedSms]] هو [[SmsNotifier]]. عشان كده الـ mixin شغال من غير ما يعرف هو متركّب مع مين.`,
            R`بيطبع النتيجة بعد ما الجزء الجوّاني خلص، يعني بعد القص. [[print]] بتاخد كذا قيمة وبتفصل بينهم بمسافة: [[LOG: [shop] -> 010: hello]].`,
            R`بيرجّع النتيجة زي ما هي من غير تعديل. لو نسيت [[return]] هنا، [[n.send(...)]] هترجّع [[None]] واللي نادى هيفتكر الإرسال مرجّعش حاجة، رغم إن اللوج اتطبع.`,
            R`التركيب: [[LoggingMixin]] الأول وبعده [[SmsNotifier]]. الترتيب ده معناه إن اللوج «برّه» والـ SMS «جوه»: النداء بيدخل في اللوج الأول، اللوج بينادي الـ SMS، والـ SMS بينادي [[Notifier]].`,
            R`[[pass]] = «مفيش كود». الـ class كامل من التركيب لوحده، ومش محتاج ولا سطر. Python محتاج حاجة في الجسم، فـ [[pass]] بتملا المكان.`,
            R`[[LoggedSms("shop", max_len=5)]]: مفيش [[__init__]] في [[LoggedSms]] ولا [[LoggingMixin]]، فـ Python بيمشي على الـ MRO لحد ما يلاقي [[SmsNotifier.__init__]]، وهي اللي بتاخد [[max_len]] وتبعت [[sender]] للأب.`,
            R`[[send]] بيتنادى على [[LoggingMixin]] الأول، اللي بينادي [[SmsNotifier.send]] (بيقص [["hello world"]] لـ [["hello"]] بـ ٥ حروف)، اللي بينادي [[Notifier.send]]. والنتيجة بترجع لبرّه، واللوج بيطبعها.`,
            R`[[LoggedSms.__mro__]] tuple بالترتيب اللي Python بيدوّر بيه، و [[c.__name__]] اسم كل class. الناتج [[['LoggedSms', 'LoggingMixin', 'SmsNotifier', 'Notifier', 'object']]]. أي [[super()]] بيمشي خطوة واحدة على اللستة دي.`,
            R`[[isinstance(n, Notifier)]] بيسأل «الـ object ده من النوع ده أو ابن ليه؟» فـ [[True]]. و [[issubclass(SmsNotifier, LoggingMixin)]] بيسأل عن الـ classes نفسها: [[SmsNotifier]] لوحده مش وارث من الـ mixin فـ [[False]]؛ اللي وارثهم الاتنين [[LoggedSms]] بس.`,
          ]
        },
        {
          cmd: "dunder methods",
          title: "تخلّي الـ class بتاعك يشتغل مع ==، و len، و for، و +",
          desc: R`الـ methods اللي اسمها بين شرطتين من الناحيتين ([[__x__]]، اسمها dunder أو «magic methods») هي اللي بتخلي الـ class بتاعك يشتغل مع أدوات اللغة: [[__repr__]] و [[__str__]] للطباعة، و [[__eq__]] لـ [[==]]، و [[__lt__]] لـ [[<]] و [[sorted]]، و [[__hash__]] عشان يبقى مفتاح في dict، و [[__len__]] لـ [[len()]]، و [[__iter__]] لـ for، و [[__contains__]] لـ [[in]]، و [[__add__]] لـ [[+]].

انت عمرك ما بتناديها بنفسك ([[a.__len__()]])؛ Python هو اللي بيناديها لما تكتب [[len(a)]]. وده اسمه protocols أو duck typing: أي object فيه [[__iter__]] ينفع تلف عليه، من غير ما يورث من حاجة.`,
          example: R`from functools import total_ordering
@total_ordering
class Money:
    def __init__(self, cents: int, currency: str = "EGP"):
        self.cents, self.currency = cents, currency
    def __repr__(self) -> str:
        return f"Money({self.cents}, {self.currency!r})"
    def __str__(self) -> str:
        return f"{self.cents / 100:,.2f} {self.currency}"
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Money):
            return NotImplemented
        return (self.cents, self.currency) == (other.cents, other.currency)
    def __hash__(self) -> int:
        return hash((self.cents, self.currency))
    def __lt__(self, other: "Money") -> bool:
        return self.cents < other.cents
    def __add__(self, other: "Money") -> "Money":
        return Money(self.cents + other.cents, self.currency)
    def __bool__(self) -> bool:
        return self.cents != 0
class Cart:
    def __init__(self, *prices: Money):
        self._prices = list(prices)
    def __len__(self) -> int:
        return len(self._prices)
    def __iter__(self):
        return iter(self._prices)
    def __contains__(self, item: Money) -> bool:
        return item in self._prices
cart = Cart(Money(15000), Money(2550), Money(15000))
print(len(cart), Money(2550) in cart)          # 3 True
print(sum(cart, Money(0)))                     # 325.50 EGP
print(max(cart), repr(min(cart)))              # 150.00 EGP Money(2550, 'EGP')
print(Money(1) >= Money(1), {Money(5), Money(5)})
print(bool(Money(0)), Money(5) == 5)           # False False`,
          try: R`اعمل class [[Playlist(name, songs)]] بحيث: [[len(p)]] عدد الأغاني، و [[p[0]]] و [[p[-1]]] و [[p[1:]]] يشتغلوا ([[__getitem__]])، و [[for song in p]] و [["b" in p]]، و [[p1 + p2]] يرجّع playlist جديدة اسمها [["chill+gym"]]، و [[==]] بيقارن الأغاني بس. وجرّب [[p + 5]]: لازم يطلع TypeError واضح.`,
          sol: R`المتوقع: [[Playlist('chill+gym', 3 songs) a c ['b', 'c']]] وبعدين [[['a', 'b', 'c'] True]] وبعدين [[True]] (playlist باسم مختلف ونفس الأغاني متساوية)، و [[p + 5]] بتطلّع [[TypeError: unsupported operand type(s) for +: 'Playlist' and 'int']].

السر في الـ TypeError إن [[__add__]] بترجع [[NotImplemented]] (قيمة خاصة، مش exception) لما النوع مش Playlist، فـ Python بيجرّب [[int.__radd__]] وبعدين يرمي الخطأ المعتاد. لو رميت خطأ بنفسك أو رجّعت [[False]] هتبوّظ الآلية دي. و [[__getitem__]] لوحدها بتخلي الـ slicing والـ indexes السالبة تشتغل لأنك بتمرر الـ index للـ list. وخلي بالك: لما عرّفت [[__eq__]] من غير [[__hash__]]، Python خلّى الـ class unhashable، فـ [[{a}]] هيطلع [[TypeError: unhashable type]]. ده مقصود: object بيتغير مينفعش يبقى مفتاح.`,
          solCode: R`class Playlist:
    def __init__(self, name: str, songs: list[str] | None = None):
        self.name = name
        self.songs = list(songs or [])
    def __repr__(self) -> str:
        return f"Playlist({self.name!r}, {len(self)} songs)"
    def __len__(self) -> int:
        return len(self.songs)
    def __getitem__(self, index):
        return self.songs[index]
    def __iter__(self):
        return iter(self.songs)
    def __add__(self, other: "Playlist") -> "Playlist":
        if not isinstance(other, Playlist):
            return NotImplemented
        return Playlist(f"{self.name}+{other.name}", self.songs + other.songs)
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Playlist):
            return NotImplemented
        return self.songs == other.songs
a = Playlist("chill", ["a", "b"])
b = Playlist("gym", ["c"])
mix = a + b
print(mix, mix[0], mix[-1], mix[1:])
print(list(mix), "b" in mix)
print(a == Playlist("other", ["a", "b"]))
try:
    a + 5
except TypeError as e:
    print("TypeError:", e)`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، اكتب جنب كل حاجة الـ dunder اللي Python بيناديها: [[print(x)]]، [[x == y]]، [[len(x)]]، [[for i in x]]، [[x in y]]، [[x + y]]، [[x()]]، [[x[k]]]، [[if x:]]، [[{x}]].`, done: R`العشرة صح لما قارنتهم بالجدول في الشرح (منهم [[__str__]] و [[__contains__]] و [[__call__]] و [[__getitem__]] و [[__hash__]])، وكاتب جنب [[if x:]] إنها بتجرّب [[__len__]] لو [[__bool__]] مش موجودة.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[class P:]] فيها [[__init__]] بيخزّن [[x]] و [[__eq__]] بترجّع [[self.x == other.x]] بس. توقّع ناتج [[print(P(1) == P(1))]] وبعدين [[print({P(1)})]] وبعدين [[print(P(1) == 1)]]، وشغّلهم واحد واحد.`, done: R`الأول [[True]]، والتاني [[TypeError: cannot use 'P' as a set element (unhashable type: 'P')]]، والتالت [[AttributeError: 'int' object has no attribute 'x']]، وكاتب التصليح لكل واحد ([[__hash__]] و [[NotImplemented]]).` },
            { lvl: 'تطبيق', t: R`**صلّح الكود البايظ:** [[Money.__add__]] فيها [[self.cents += other.cents; return self]]. اعمل [[a = Money(100); b = a + Money(50); print(a, b, a is b)]] واشرح ليه ده bug في value object، وصلّحه.`, done: R`قبل التصليح [[a]] نفسها اتغيّرت لـ ١٥٠ و [[a is b]] بـ [[True]]، وبعده [[a]] لسه ١٠٠ و [[b]] ١٥٠ و [[a is b]] بـ [[False]]، و [[{a}]] لسه بتلاقي [[a]] بعد الجمع.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[Playlist]] زي التجربة، وزوّد [[__getitem__]] اللي بيقبل رقم و slice ([[p[1:]]] ترجّع Playlist جديدة مش list)، و [[__call__(song)]] بيضيف أغنية ويرجّع [[self]] عشان [[p("a")("b")]] تشتغل، و [[__format__]] بحيث [[f"{p:short}"]] تطبع الاسم وعدد الأغاني بس.`, done: R`[[type(p[1:]).__name__]] بيطبع [[Playlist]]، و [[p[-1]]] آخر أغنية، و [[p("x")("y")]] زوّدت اتنين، و [[f"{p:short}"]] زي [[chill (4)]]، و [[p["a"]]] بترمي [[TypeError]] برسالة واضحة إنت كاتبها.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** اكتب [[test_money.py]] بـ pytest لـ [[Money]] اللي في المثال: الجمع مبيغيّرش الأصل، و [[sorted]] بيرتّب، و set بتشيل المتكرر، و [[Money(5) == 5]] بـ [[False]] من غير error، و [[Money(1) + 1]] بترمي [[TypeError]] (بعد ما تصلّح [[__add__]] بـ [[NotImplemented]]).`, done: R`[[pytest -q]] بيقول [[5 passed]]، ولو شلت سطر [[NotImplemented]] من [[__add__]] الاختبار الأخير بيقع بـ [[AttributeError]] بدل [[TypeError]].` },
            { lvl: 'تحدي', t: R`**مسألة:** [[Vector(x, y)]] بـ [[__add__]] و [[__sub__]] و [[__mul__]] (ضرب في رقم) و [[__rmul__]] (عشان [[3 * v]] تشتغل مش [[v * 3]] بس) و [[__abs__]] (الطول) و [[__eq__]] و [[__hash__]] و [[__repr__]] و [[__iter__]] (عشان [[x, y = v]]).`, done: R`[[Vector(3, 4) * 2 == 2 * Vector(3, 4) == Vector(6, 8)]] بـ [[True]]، و [[abs(Vector(3, 4))]] بـ [[5.0]]، و [[x, y = Vector(1, 2)]] شغالة، و [[v * "a"]] بترمي [[TypeError]]، و [[len({Vector(1, 1), Vector(1, 1)})]] بـ [[1]].` },
          ],
          deep: {
            why: R`class من غير [[__repr__]] بيطبع [[<__main__.Money object at 0x7f...>]] في اللوج ومحدش فاهم حاجة. ومن غير [[__eq__]]، كائنين بنفس القيمة مش متساويين. والـ dunders هي اللي بتخلي الـ class بتاعك يحس إنه built-in: [[sorted(prices)]] و [[sum(cart)]] و [[max(cart)]] يشتغلوا من غير كود زيادة.`,
            how: R`[[len(x)]] بتنادي [[type(x).__len__(x)]]، و [[a + b]] بتنادي [[a.__add__(b)]]، ولو رجعت [[NotImplemented]] بتجرّب [[b.__radd__(a)]]. و [[a == b]] نفس الفكرة، ولو الاتنين رجّعوا [[NotImplemented]] بيرجع لمقارنة الهوية ([[is]]). عشان كده [[Money(5) == 5]] بترجع [[False]] بهدوء بدل ما ترمي.

[[__repr__]] للمبرمج (لازم يبقى واضح وأحسن لو شبه الكود اللي يعمل الـ object)، و [[__str__]] للمستخدم وبيستخدمه [[print]] و [[str()]]، ولو مش موجود بيستخدم [[__repr__]].

[[__eq__]] و [[__hash__]] مرتبطين: objects متساوية لازم يبقى ليها نفس الـ hash، وإلا الـ dict والـ set يبوظوا. ولو عرّفت [[__eq__]] بس، Python بيحط [[__hash__ = None]].

[[@total_ordering]] من [[functools]]: تكتب [[__eq__]] و [[__lt__]] بس، وهو يكمّل [[<=]] و [[>]] و [[>=]]. و [[sum(cart, Money(0))]] محتاجة قيمة بداية من نفس النوع، لأن الافتراضي 0 و [[0 + Money]] مش متعرّفة. و [[__iter__]] بترجع iterator؛ أسهل طريقة [[iter(self._prices)]] أو generator بـ [[yield]].`,
            when: R`[[__repr__]] في كل class تقريبًا. و [[__eq__]] و [[__hash__]] للـ value objects (فلوس، إحداثيات)، وغالبًا dataclass بيولّدهم لك (الدرس الجاي). والباقي ([[__len__]] و [[__iter__]] و [[__add__]]) لما الـ class بتاعك فعلًا collection أو قيمة رياضية، مش عشان «شكله حلو».`,
            mistakes: R`[[__eq__]] بترمي أو ترجع False بدل [[NotImplemented]] مع الأنواع التانية. و [[__eq__]] من غير [[__hash__]] وتستغرب إن الـ object مش بيدخل set. و [[__hash__]] على خواص بتتغير (الـ object يضيع جوه الـ dict). و [[__add__]] بتعدّل [[self]] بدل ما ترجع object جديد. و [[__str__]] بس من غير [[__repr__]]، فاللوج والـ debugger يطلّعوا الشكل الوحش.`
          },
          teach: R`## المثال بيعمل إيه؟

classين: [[Money]] قيمة فلوس بالقروش بتشتغل مع [[print]] و [[==]] و [[<]] و [[+]] و [[set]]، و [[Cart]] عربية مشتريات بتشتغل مع [[len]] و [[for]] و [[in]] و [[sum]] و [[max]]. ومفيش ولا method من دول بنناديها بإيدنا: Python هو اللي بيناديها لما نستخدم أدوات اللغة. اتشغّل بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker)، والناتج واحد.

**dunder** اختصار double underscore: الشرطتين [[__]] قبل الاسم وبعده. والقاعدة:

| انت بتكتب | Python بينادي | ولو الـ class مش كاتبها (اتجرّب على 3.14) |
|---|---|---|
| [[print(x)]] و [[str(x)]] | [[x.__str__()]] | بيستخدم [[__repr__]] بداله |
| [[repr(x)]] والـ REPL | [[x.__repr__()]] | الشكل الافتراضي [[<__main__.X object at 0x...>]] |
| [[a == b]] | [[a.__eq__(b)]] | بيقارن الهوية زي [[is]]، فـ [[X() == X()]] بـ [[False]] |
| [[a < b]] | [[a.__lt__(b)]] | [[TypeError: '<' not supported between instances of 'X' and 'X']] |
| [[a + b]] | [[a.__add__(b)]] | [[TypeError: unsupported operand type(s) for +: 'X' and 'X']] |
| [[hash(x)]] و [[set]] و مفتاح dict | [[x.__hash__()]] | hash من الهوية؛ بس لو كتبت [[__eq__]] من غيرها الـ object بيبقى unhashable |
| [[bool(x)]] و [[if x:]] | [[x.__bool__()]] | بيجرّب [[__len__]] (صفر = False)، ولو مش موجودة يبقى [[True]] دايمًا |
| [[len(x)]] | [[x.__len__()]] | [[TypeError: object of type 'X' has no len()]] |
| [[for i in x]] | [[x.__iter__()]] | بيجرّب [[__getitem__]] من صفر، وإلا [[TypeError: 'X' object is not iterable]] |
| [[i in x]] | [[x.__contains__(i)]] | بيلف بـ [[__iter__]] ويقارن بـ [[==]]، وإلا [[argument of type 'X' is not a container or iterable]] (نص 3.14) |

---

## ١. [[@total_ordering]] و [[__init__]]

~~~python
from functools import total_ordering
@total_ordering
class Money:
    def __init__(self, cents: int, currency: str = "EGP"):
        self.cents, self.currency = cents, currency
~~~

- [[@total_ordering]]: decorator على الـ **class** كله (مش دالة). بتكتب [[__eq__]] و [[__lt__]] بس، وهو يكمّل [[<=]] و [[>]] و [[>=]] منهم.
- الفلوس بالقروش كرقم صحيح ([[int]])، مش جنيهات بكسور: الـ float فيه أخطاء تقريب ([[0.1 + 0.2]] مش بالظبط [[0.3]]).

---

## ٢. [[__repr__]] و [[__str__]]

~~~python
    def __repr__(self) -> str:
        return f"Money({self.cents}, {self.currency!r})"
    def __str__(self) -> str:
        return f"{self.cents / 100:,.2f} {self.currency}"
~~~

- [[__repr__]] للمبرمج: شكل زي الكود اللي يعمل الـ object. و [[!r]] بتحط [['EGP']] بين علامات تنصيص.
- [[__str__]] للمستخدم: [[self.cents / 100]] جنيهات، و [[:,.2f]] يعني: [[,]] فاصلة كل ٣ أرقام، و [[.2f]] رقمين بعد العلامة العشرية.

~~~text الناتج: print(m) و repr(m) و print([m]) لـ Money(150000)
1,500.00 EGP
Money(150000, 'EGP')
[Money(150000, 'EGP')]
~~~

لاحظ التالت: الـ list بتطبع عناصرها بـ [[__repr__]] مش [[__str__]].

---

## ٣. [[__eq__]] و [[__hash__]]

~~~python
    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Money):
            return NotImplemented
        return (self.cents, self.currency) == (other.cents, other.currency)
    def __hash__(self) -> int:
        return hash((self.cents, self.currency))
~~~

- من غير [[__eq__]]، [[==]] بيقارن **الهوية** (نفس الـ object في الذاكرة؟)، فـ [[Money(5) == Money(5)]] كانت هتطلع [[False]].
- [[isinstance(other, Money)]]: الطرف التاني Money؟ لو لأ، رجّع [[NotImplemented]]: قيمة خاصة (مش exception) معناها «معرفش أقارن مع ده، جرّب الناحية التانية». ولو الناحيتين قالوا كده، [[==]] بترجع [[False]] بهدوء.
- [[(a, b) == (c, d)]]: بنقارن tuple بـ tuple، يعني القروش والعملة مع بعض. [[Money(1) == Money(1, "USD")]] طلعت [[False]].
- [[__hash__]]: رقم بيمثّل القيمة، والـ [[set]] والـ dict بيستخدموه عشان يلاقوا العنصر بسرعة. القاعدة: لو [[a == b]] يبقى لازم [[hash(a) == hash(b)]]، فبنعمل الـ hash من **نفس** الحاجات اللي [[__eq__]] بيقارنها.

لو كتبت [[__eq__]] من غير [[__hash__]]، Python بيحط [[__hash__ = None]] والـ class بيبقى unhashable:

~~~text الناتج: class فيه __eq__ بس
None
TypeError: cannot use 'NoHash' as a set element (unhashable type: 'NoHash')
~~~

ده على 3.14. و 3.13 الرسالة أقصر: [[TypeError: unhashable type: 'NoHash']].

---

## ٤. [[__lt__]] و [[__add__]] و [[__bool__]]

~~~python
    def __lt__(self, other: "Money") -> bool:
        return self.cents < other.cents
    def __add__(self, other: "Money") -> "Money":
        return Money(self.cents + other.cents, self.currency)
    def __bool__(self) -> bool:
        return self.cents != 0
~~~

- [[__lt__]] (lt = less than): [[<]]. ومنها [[sorted]] و [[max]] و [[min]] اشتغلوا. و [[@total_ordering]] كمّل الباقي: [[Money(1) > Money(2)]] طلعت [[False]] و [[Money(3) <= Money(3)]] [[True]].
- [[-> "Money"]] بين علامات تنصيص: الـ class لسه بيتعرّف، فالاسم لسه مش موجود؛ النص بيأجّل قراية النوع.
- [[__add__]]: بترجّع object **جديد** ومبتلمسش [[self]]. زي [[1 + 2]] اللي مبتغيّرش الـ 1.
- [[__bool__]]: [[Money(0)]] تبقى [[False]] في [[if]].

> [[__lt__]] هنا مش بتفحص النوع، فـ [[Money(1) < 5]] بتوقع بـ [[AttributeError: 'int' object has no attribute 'cents']] (اتجرّب). الأصح تعمل نفس فحص [[isinstance]] اللي في [[__eq__]] وترجّع [[NotImplemented]]، فيطلع [[TypeError]] واضح.

---

## ٥. [[Cart]]: collection بتاعتك

~~~python
class Cart:
    def __init__(self, *prices: Money):
        self._prices = list(prices)
    def __len__(self) -> int:
        return len(self._prices)
    def __iter__(self):
        return iter(self._prices)
    def __contains__(self, item: Money) -> bool:
        return item in self._prices
~~~

- [[*prices]]: أي عدد Money بالمكان، بيوصلوا tuple (درس «*args و **kwargs»)، و [[list(...)]] بتحوّله list.
- [[_prices]]: الـ [[_]] في الأول اتفاق معناه «داخلي، متلمسوش من برّه».
- [[__iter__]] لازم ترجّع **iterator**، و [[iter(list)]] أسهل طريقة.
- [[__contains__]]: [[item in self._prices]]، و [[in]] على list بتقارن بـ [[==]]، يعني بتستخدم [[Money.__eq__]].

---

## ٦. التشغيل

~~~python
cart = Cart(Money(15000), Money(2550), Money(15000))
print(len(cart), Money(2550) in cart)
~~~

~~~text الناتج
3 True
~~~

[[Money(2550)]] object جديد مش اللي جوه العربية، بس [[__eq__]] بيقارن القيمة فلقاه.

~~~python
print(sum(cart, Money(0)))
~~~

~~~text الناتج
325.50 EGP
~~~

[[sum]] بتبدأ من [[0]] وتجمع عليه. و [[0 + Money]] مش متعرّفة:

~~~text الناتج: sum(cart) من غير قيمة بداية
TypeError: unsupported operand type(s) for +: 'int' and 'Money'
~~~

فبنديها [[Money(0)]] كبداية. 15000 + 2550 + 15000 = 32550 قرش = 325.50.

~~~python
print(max(cart), repr(min(cart)))
~~~

~~~text الناتج
150.00 EGP Money(2550, 'EGP')
~~~

[[max]] بيلف بـ [[__iter__]] ويقارن بـ [[__lt__]]. واتطبع الأول بـ [[__str__]] (لأن [[print]])، والتاني بـ [[__repr__]] لأننا طلبناه صراحة.

~~~python
print(Money(1) >= Money(1), {Money(5), Money(5)})
~~~

~~~text الناتج
True {Money(5, 'EGP')}
~~~

[[>=]] جاية من [[@total_ordering]]. والـ set شال التكرار: نفس الـ hash ومتساويين.

~~~python
print(bool(Money(0)), Money(5) == 5)
~~~

~~~text الناتج
False False
~~~

الأولى من [[__bool__]]. والتانية: [[Money.__eq__]] رجّعت [[NotImplemented]]، و [[int]] كمان ميعرفش يقارن بـ Money، فالنتيجة [[False]] من غير exception.

---

## ٧. الحل: [[Playlist]]

~~~python solCode
    def __getitem__(self, index):
        return self.songs[index]
    def __add__(self, other: "Playlist") -> "Playlist":
        if not isinstance(other, Playlist):
            return NotImplemented
        return Playlist(f"{self.name}+{other.name}", self.songs + other.songs)
~~~

- [[__getitem__]]: [[p[0]]] بتنادي [[p.__getitem__(0)]]. وبما إننا بنعدّي الـ index للـ list زي ما هو، [[p[-1]]] و [[p[1:]]] اشتغلوا ببلاش ([[1:]] بيوصل كـ object من نوع [[slice]]).
- [[__add__]] بفحص النوع و [[NotImplemented]]: كده [[p + 5]] بيطلّع رسالة Python العادية.
- [[self.songs + other.songs]]: [[+]] على listين بيعمل list جديدة فيها الاتنين.
- و [[songs or []]] في [[__init__]]: لو [[None]] أو فاضية خد [[[]]]، و [[list(...)]] نسخة جديدة.

~~~text الناتج
Playlist('chill+gym', 3 songs) a c ['b', 'c']
['a', 'b', 'c'] True
True
TypeError: unsupported operand type(s) for +: 'Playlist' and 'int'
~~~

---

## ٨. [[__call__]]: object بيتنادى زي دالة

~~~python
class RateLimiter:
    def __init__(self, limit: int):
        self.limit, self.calls = limit, 0
    def __call__(self, user: str) -> bool:
        self.calls += 1
        return self.calls <= self.limit
allow = RateLimiter(2)
print(allow("sara"), allow("sara"), allow("sara"), callable(allow))
~~~

~~~text الناتج (Python 3.14)
True True False True
~~~

- [[allow("sara")]] = [[allow.__call__("sara")]]. الـ object بيتنادى بأقواس زي أي دالة، بس **فاكر حاجة** بين النداءات ([[self.calls]]).
- إمتى بدل الدالة؟ لما الدالة محتاجة حالة (عدّاد، cache، إعدادات) ومش عايز متغير global. وإمتى بدل closure؟ لما الحالة كبيرة أو محتاج methods تانية ([[reset()]]). و [[callable(x)]] بيسأل «ينفع أناديه؟».
- FastAPI بيستخدم ده: dependency ممكن تبقى object فيه [[__call__]] (وحدة Dependencies).

---

## ٩. [[__getattr__]]: لما الخاصية مش موجودة

~~~python
class Settings:
    def __init__(self, data: dict):
        self._data = data
    def __getattr__(self, name: str):
        try:
            return self._data[name]
        except KeyError:
            raise AttributeError(f"no setting {name!r}") from None
s = Settings({"port": 8000, "debug": False})
print(s.port, s.debug)
print(getattr(s, "host", "localhost"))
s.host
~~~

~~~text الناتج
8000 False
localhost
AttributeError: no setting 'host'
~~~

- [[__getattr__]] بيتنادى **بس** لما القراية العادية متلاقيش الاسم. فـ [[s._data]] بيتقري عادي من غير ما يعدّي عليها، و [[s.port]] مش موجودة كخانة فبتعدّي عليها.
- لازم ترمي [[AttributeError]] مش [[KeyError]]: [[getattr(s, "host", "localhost")]] و [[hasattr]] بيعتمدوا على [[AttributeError]] بالذات عشان يرجّعوا الـ default. لو سبت [[KeyError]] تطلع، [[getattr]] بالـ default هترمي بدل ما ترجّع [[localhost]].
- [[from None]] بيشيل سطر «During handling of the above exception» من الـ traceback، عشان الـ [[KeyError]] الداخلي تفصيلة مش مهمة لليوزر.
- فخ: لو [[__getattr__]] قرت [[self._data]] قبل ما [[__init__]] يعمله (مثلًا وقت [[copy]] أو [[pickle]])، هتنادي نفسها لحد [[RecursionError]]. وفيه [[__getattribute__]] بيتنادى في **كل** قراية، ونادرًا ما تحتاجه.

---

## ١٠. [[__getitem__]] و [[__setitem__]] و [[__format__]]

~~~python
class Grid:
    def __init__(self): self._cells = {}
    def __getitem__(self, key): return self._cells.get(key, ".")
    def __setitem__(self, key, value): self._cells[key] = value
    def __delitem__(self, key): del self._cells[key]
g = Grid(); g[0, 1] = "X"
print(g[0, 1], g[5, 5]); del g[0, 1]; print(g[0, 1])
class Price:
    def __init__(self, c): self.c = c
    def __format__(self, spec):
        if spec == "egp": return f"{self.c/100:,.2f} ج.م"
        return format(self.c, spec)
m = Price(1234567)
print(f"{m:egp}", f"{m:>10}")
~~~

~~~text الناتج
X .
.
12,345.67 ج.م    1234567
~~~

- [[g[0, 1]]] = [[g.__getitem__((0, 1))]]: الفصلة بتعمل tuple، فالمفتاح [[(0, 1)]]. و [[g[0, 1] = "X"]] بتنادي [[__setitem__]]، و [[del g[0, 1]]] بتنادي [[__delitem__]].
- [[__format__]] بيتنادى مع [[f"{m:egp}"]] و [[format(m, "egp")]]، واللي بعد [[:]] بيوصل في [[spec]]. فتقدر تعمل شكل خاص بيك ([[egp]])، وأي spec تاني ([[>10]] = محاذاة يمين في ١٠ خانات) بتسلّمه للرقم العادي.

---

## ١١. [[__eq__]] من غير [[__hash__]]

~~~python
class Bad:
    def __eq__(self, o): return True
{Bad()}
~~~

~~~text الناتج (نص Python 3.14 الجديد)
TypeError: cannot use 'Bad' as a set element (unhashable type: 'Bad')
~~~

Python بيحط [[__hash__ = None]] لوحده لما تكتب [[__eq__]] من غير [[__hash__]]، لأن الـ hash القديم (من الهوية) هيكسر قاعدة «المتساويين ليهم نفس الـ hash». وفي 3.13 (اتجرّب في [[python:3.13-slim]]) الرسالة كانت [[unhashable type: 'Bad']] بس. الحل: اكتب [[__hash__]] من نفس الخانات لو الـ object مبيتعدلش، أو سيبه unhashable لو بيتعدل (زي [[list]]).

ولـ [[__enter__]] و [[__exit__]] (اللي بيخلّوا الـ object يشتغل مع [[with]]) درس لوحدهم في وحدة «الأخطاء و with».

## الخلاصة

- الـ dunders بيناديها Python، مش انت.
- [[__repr__]] دايمًا. و [[__eq__]] و [[__hash__]] مع بعض ومن نفس الحقول.
- مع نوع مش متوقع: [[return NotImplemented]]، مش [[False]] ومش [[raise]].
- [[__add__]] بترجّع object جديد.
- [[@total_ordering]]: اكتب [[__eq__]] و [[__lt__]] والباقي يتولّد.`,
          lines: [
            R`[[total_ordering]] decorator من [[functools]]: بتكتب [[__eq__]] و method مقارنة واحدة ([[__lt__]] هنا)، وهو يكمّل التلاتة الباقيين ([[<=]] و [[>]] و [[>=]]). من غيره [[Money(1) >= Money(1)]] كانت هترمي [[TypeError]].`,
            R`الـ decorator بيتحط فوق الـ class نفسه (مش فوق method): بيقرا الـ class بعد ما يتعرّف ويضيف عليه الـ methods الناقصة.`,
            R`[[Money]] value object: object بيتعرّف بقيمته (المبلغ والعملة) مش بهويته. اتنين [[Money(100)]] لازم يبقوا متساويين حتى لو اتعملوا في مكانين مختلفين، وده اللي الـ dunders تحت بتحققه.`,
            R`المبلغ بالقروش كـ [[int]] مش جنيه كـ [[float]]: [[0.1 + 0.2]] في float بتطلع [[0.30000000000000004]]، و [[10 + 20]] قرش دايمًا [[30]]. و [[currency]] الافتراضي [[EGP]] عشان أغلب الاستخدام بالجنيه.`,
            R`تعيين الخانتين في سطر واحد (tuple unpacking): اللي على اليمين بيتحسب الأول وبعدين بيتوزّع بالترتيب. نفس [[self.cents = cents]] وبعدها [[self.currency = currency]].`,
            R`[[__repr__]] للمبرمج: هو اللي بيظهر في الـ REPL، وجوه list أو dict مطبوعة، وفي اللوج والـ debugger. لازم يكون واضح ومفيهوش لبس.`,
            R`الشكل المعتاد للـ repr: يشبه الكود اللي يعمل نفس الـ object ([[Money(2550, 'EGP')]])، فلو نسخته ولصقته في Python يرجعلك نفس القيمة. و [[!r]] بتحط العملة بين علامات تنصيص.`,
            R`[[__str__]] للمستخدم: [[print(x)]] و [[str(x)]] و [[f"{x}"]] بينادوها. لو مش موجودة بيستخدموا [[__repr__]]، فالـ repr هو اللي لازم تكتبه دايمًا، والـ str اختياري.`,
            R`[[self.cents / 100]] بيحوّل لجنيه، و [[:,.2f]] format spec: [[,]] فاصل آلاف و [[.2f]] رقمين عشريين. فـ [[32550]] قرش بتطلع [[325.50 EGP]]، و [[1500000]] بتطلع [[15,000.00 EGP]].`,
            R`[[__eq__]] بيتنادى مع [[a == b]] (و [[!=]] بتعكس نتيجته لوحدها). الـ type hint [[other: object]] لأن [[==]] ممكن تتكتب بين أي نوعين، مش [[Money]] بس.`,
            R`لو الطرف التاني مش [[Money]] (رقم أو نص مثلًا)، منقارنش خانات مش موجودة فيه؛ من غير الفحص ده [[Money(5) == 5]] كانت هترمي [[AttributeError: 'int' object has no attribute 'cents']].`,
            R`[[NotImplemented]] (قيمة خاصة، مش exception) معناها «مش عارف أقارن بالنوع ده». Python ساعتها بيجرّب الناحية التانية ([[5 .__eq__(money)]])، ولو هي كمان مش عارفة يرجع للمقارنة بالهوية فيطلع [[False]]. لو رجّعت [[False]] بإيدك، بتقفل الباب على نوع تاني ممكن يكون عارف يقارن نفسه بيك.`,
            R`المقارنة كـ tuple: [[(cents, currency) == (cents, currency)]] بتقارن العنصر الأول وبعدين التاني، فـ [[Money(100, "EGP") == Money(100, "USD")]] بـ [[False]]. أقصر وأوضح من [[and]] بين مقارنتين.`,
            R`[[__hash__]] هو اللي بيخلي الـ object ينفع يتحط في [[set]] أو يبقى مفتاح في dict. و**مهم**: أي class بيكتب [[__eq__]] من غير [[__hash__]] بيبقى unhashable لوحده، و [[{Money(5)}]] كانت هترمي [[TypeError]].`,
            R`القاعدة: اللي بيتساووا لازم يبقى ليهم نفس الـ hash، فبنحسبه من **نفس الخانات** اللي [[__eq__]] بيقارنها، بـ [[hash()]] على tuple. ولو الـ object بيتعدّل بعد ما يدخل set، الـ hash بيتغيّر وتضيع منك جوه الـ set؛ عشان كده الـ value objects بتبقى متتعدلش (زي [[frozen=True]] في الـ dataclass).`,
            R`[[__lt__]] = less than ([[<]]). [[sorted]] و [[min]] و [[max]] و [[list.sort]] كلهم بيستخدموها، فتعريفها بيخلي ترتيب الفلوس شغال من غير [[key=]]. والنوع [["Money"]] بين علامات تنصيص لأن الـ class لسه متعرّفش وقت ما السطر ده بيتقري (forward reference).`,
            R`بيقارن القروش بس، وده تبسيط: [[Money(100, "USD") < Money(200, "EGP")]] هترجّع [[True]] رغم إنها مقارنة عملات مختلفة. في كود حقيقي ارمي [[ValueError]] لو العملات مختلفة، زي ما التمارين بتطلب.`,
            R`[[__add__]] بيتنادى مع [[a + b]]. القاعدة في value objects إن [[+]] **بترجّع object جديد** ومبتغيّرش الأصلي، زي [[1 + 2]] اللي مبيغيّرش الـ 1.`,
            R`[[Money(...)]] جديد بمجموع القروش، و [[self]] و [[other]] زي ما هما. ولو حد كتب [[money + 5]]، [[other.cents]] هترمي [[AttributeError]]؛ الأحسن [[if not isinstance(other, Money): return NotImplemented]] فيطلع [[TypeError: unsupported operand]] الواضح.`,
            R`[[__bool__]] بيتنادى مع [[bool(x)]] و [[if x:]] و [[while x:]] و [[and]]/[[or]]. من غيرها أي [[Money]] حتى الصفر كان هيبقى [[True]] (لأن مفيش [[__len__]] كمان).`,
            R`صفر قروش = [[False]]، أي حاجة تانية (حتى السالب) = [[True]]. فـ [[if balance:]] بتقرا «لو فيه فلوس» من غير [[balance.cents != 0]].`,
            R`[[Cart]] collection بتاعتك: class شايل عناصر جواه، وهنخليه يتعامل زي list في [[len]] و [[for]] و [[in]] من غير ما يورث من [[list]] (اللي كانت هتدّيه [[append]] و [[clear]] وعشرين method مش عايزهم).`,
            R`[[*prices: Money]] بتاخد أي عدد arguments بالمكان وتجمّعهم في tuple ([[*args]] من وحدة الدوال)، فـ [[Cart(a, b, c)]] و [[Cart()]] الاتنين شغالين.`,
            R`[[list(prices)]] بيحوّل الـ tuple لـ list عشان تقدر تزوّد بعدين. و [[_]] في أول [[_prices]] اتفاق معناه «داخلي»: اللي برّه يستخدم [[len]] و [[for]] و [[in]]، مش يلعب في الليستة مباشرة.`,
            R`[[__len__]] بيتنادى مع [[len(cart)]]، ولازم ترجّع [[int]] صفر أو أكبر. وبرضه [[bool(cart)]] بتستخدمها لو مفيش [[__bool__]]: عربية فاضية تبقى [[False]].`,
            R`بنسأل الـ list الداخلية عن طولها. ده اسمه delegation: الـ class بيسلّم الشغل لحاجة جواه بدل ما يحسبه بنفسه.`,
            R`[[__iter__]] بيتنادى مع [[for x in cart]]، وكمان [[sum]] و [[max]] و [[min]] و [[list(cart)]] و unpacking، لأن كلهم بيلفّوا. لازم ترجّع iterator (حاجة فيها [[__next__]]).`,
            R`[[iter(self._prices)]] بيرجّع iterator جاهز من الـ list. وكل [[for]] بتنادي [[__iter__]] من جديد، فتقدر تلف على العربية مرتين وتلاقي العناصر كلها في المرتين.`,
            R`[[__contains__]] بيتنادى مع [[item in cart]]. من غيرها [[in]] كانت هتشتغل برضه بإنها تلف بـ [[__iter__]]، بس كتابتها بتخليك تختار طريقة أسرع (set مثلًا) لو العربية كبيرة.`,
            R`[[in]] على الـ list بتقارن كل عنصر بـ [[==]]، يعني بتنادي [[Money.__eq__]] اللي فوق. فـ [[Money(2550) in cart]] بتلاقي object **تاني** بنفس القيمة، مش لازم نفس الـ object.`,
            R`عربية فيها ٣ أسعار: لابتوب ١٥٠ جنيه مرتين وحاجة بـ ٢٥.٥٠. ([[15000]] قرش = ١٥٠ جنيه.) التكرار مقصود عشان نشوف الـ set تحت بيشيله.`,
            R`[[len(cart)]] نادت [[__len__]] = [[3]]، و [[Money(2550) in cart]] نادت [[__contains__]] اللي نادت [[__eq__]] = [[True]]. الناتج [[3 True]].`,
            R`[[sum]] بيبدأ من [[0]] افتراضيًا، و [[0 + Money]] مش متعرّفة. فبنديله قيمة بداية من نفس النوع [[Money(0)]]، وهو بيعمل [[Money(0) + a + b + c]] بـ [[__add__]]. والطباعة بـ [[__str__]]: [[325.50 EGP]].`,
            R`[[max]] و [[min]] بيلفّوا بـ [[__iter__]] ويقارنوا بـ [[__lt__]]. [[print(max(cart))]] بيستخدم [[__str__]] فيطلع [[150.00 EGP]]، و [[repr(min(cart))]] بيجبر الـ repr فيطلع [[Money(2550, 'EGP')]]. نفس الـ object بشكلين.`,
            R`[[>=]] مش مكتوبة في الـ class؛ جت من [[total_ordering]] (من [[__lt__]] و [[__eq__]]) = [[True]]. و [[{Money(5), Money(5)}]] set فيها عنصر واحد بس: الاتنين ليهم نفس الـ hash ومتساويين، فالـ set اعتبرتهم واحد.`,
            R`[[bool(Money(0))]] نادت [[__bool__]] = [[False]]. و [[Money(5) == 5]] رجّعت [[False]] بهدوء من غير error، بفضل [[NotImplemented]]: Python جرّب ناحية الـ [[int]]، ومعرفتش، فرجع لمقارنة الهوية.`,
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
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** اكتب من الذاكرة الـ [[@dataclass]] بتاع [[Money]] و [[Cart]] من المثال، وجنب كل إعداد ([[frozen]] و [[slots]] و [[default_factory]] و [[order]] و [[kw_only]] و [[repr=False]]) جملة: بيعمل إيه، وإيه اللي بيحصل من غيره.`, done: R`الكود بيتشغّل ويطبع نفس ناتج المثال، والست جمل كل واحدة فيها نتيجة تقدر تجرّبها (مثلًا «من غير [[default_factory]] بيطلع [[ValueError: mutable default]]»).` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[@dataclass(order=True) class V: major: int; minor: int; label: str = ""]]. إيه ناتج [[sorted([V(1, 10), V(1, 2), V(0, 99)])]]؟ وإيه ناتج [[V(1, 2, "a") == V(1, 2, "b")]]؟ وبعدين خلّي [[label]] بـ [[field(default="", compare=False)]] وتوقّع تاني.`, done: R`الترتيب [[V(0, 99), V(1, 2), V(1, 10)]] (مقارنة أرقام مش نص)، والمساواة [[False]] الأول و [[True]] بعد [[compare=False]]، وشغّلتهم وطابقوا.` },
            { lvl: 'تطبيق', t: R`**صلّح:** [[@dataclass class Event: name: str; at: datetime = datetime.now(UTC)]]. اعمل حدثين بينهم [[time.sleep(1)]] واطبع الوقتين. لاقي الغلطة وصلّحها.`, done: R`قبل التصليح الوقتين **متطابقين** بالظبط (اتحسبوا وقت تعريف الـ class)، وبعد [[field(default_factory=lambda: datetime.now(UTC))]] الفرق بينهم حوالي ثانية.` },
            { lvl: 'تطبيق', t: R`**بيانات حقيقية:** ملف [[orders.csv]] فيه ٦ صفوف ([[id,customer,total,status]]) واتنين منهم بايظين (total سالب، و status مش من [[pending]] أو [[paid]] أو [[shipped]]). اعمل [[@dataclass(frozen=True, slots=True) Order]] بـ [[__post_init__]] بيحوّل [[total]] من نص لـ [[int]] ويفحص القواعد، واقرا الملف بـ [[csv.DictReader]] وافصل السليم عن البايظ ومعاه سبب كل واحد.`, done: R`٤ orders سليمة في list، والصفين البايظين متطبعين برقم السطر والرسالة ([[total must be >= 0]] مثلًا)، وكل [[Order]] [[frozen]] ([[o.total = 1]] بترمي)، وملحوظة: مع [[frozen]] التحويل جوه [[__post_init__]] محتاج [[object.__setattr__]].` },
            { lvl: 'تطبيق', t: R`**refactor:** خد class [[Order]] من درس «class و self» (اللي فيه [[__init__]] و [[__repr__]] بإيدك) وحوّله dataclass من غير ما تغيّر سلوكه: [[total]] property، و [[add]] بتفحص السعر، و [[from_dict]] classmethod.`, done: R`الكود أقصر بـ ٥ سطور على الأقل، ونفس سطور التجربة بتطبع نفس الناتج تقريبًا (الـ repr بقى فيه أسامي الخانات)، و [[Order("a") == Order("a")]] بقت [[True]] (كانت [[False]]) وكاتب ليه.` },
            { lvl: 'تحدي', t: R`**قارن وقيس:** شغّل كود جدول المقارنة على جهازك لـ ١٠٠ ألف ومليون object، وزوّد صف لـ [[@dataclass(frozen=True, slots=True)]] وصف لـ Pydantic [[BaseModel]] (في venv). رتّب النتايج بالذاكرة.`, done: R`عندك جدول بأرقامك انت لـ ٨ أنواع، والترتيب النسبي بتاع الذاكرة زي اللي في الدرس (slots الأقل من الـ classes)، وكاتب جملة عن تكلفة Pydantic في الإنشاء مقارنة بالـ dataclass برقمك.` },
          ],
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
          teach: R`## المثال بيعمل إيه؟

classين للداتا من غير ولا [[__init__]] مكتوب بإيدنا: [[Money]] قيمة فلوس ثابتة متتعدلش، و [[Cart]] عربية فيها ليستة ووقت إنشاء. و [[@dataclass]] هو اللي بيكتب الـ methods من الأنواع اللي كتبناها. اتشغّل بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker).

> المثال فيه سطر بيرمي بالقصد ([[price.amount = 1]])، فلو شغّلته كملف هيقف عنده. جرّبه في الـ REPL سطر سطر، أو حط السطر ده في [[try]].

---

## ١. الـ imports

~~~python
from dataclasses import dataclass, field, asdict, replace
from datetime import datetime, UTC
~~~

- [[dataclass]]: الـ decorator نفسه. و [[field]]: لإعدادات خاصة بخانة واحدة. و [[asdict]]: يحوّل الـ object لـ dict. و [[replace]]: نسخة بقيم متغيرة.
- [[datetime]]: نوع التاريخ والوقت. و [[UTC]] (من 3.11): المنطقة الزمنية العالمية، عشان الوقت ميبقاش بتوقيت السيرفر.

---

## ٢. [[Money]]: [[frozen]] و [[slots]]

~~~python
@dataclass(frozen=True, slots=True)
class Money:
    amount: int
    currency: str = "EGP"
~~~

- [[amount: int]]: ده مش متغير، ده **annotation** (اسم ونوع). الـ dataclass بيقرا الـ annotations دي وبيعمل منها خانات (fields)، بنفس الترتيب.
- [[currency: str = "EGP"]]: خانة ليها default.
- الباراميترات اللي بين قوسين الـ decorator:

| الباراميتر | معناه |
|---|---|
| [[frozen=True]] | الـ object ميتعدلش بعد ما يتعمل، وبيتولّد له [[__hash__]] |
| [[slots=True]] (3.10+) | الخانات تتخزن في [[__slots__]] بدل [[__dict__]]: ذاكرة أقل، ومينفعش تضيف خانة مش متعرّفة |

والـ decorator ولّد ده تقريبًا لوحده:

~~~python
def __init__(self, amount: int, currency: str = "EGP"):
    self.amount = amount
    self.currency = currency
~~~

ومعاه [[__repr__]] و [[__eq__]].

---

## ٣. [[Cart]]: [[field(default_factory=...)]]

~~~python
@dataclass(slots=True)
class Cart:
    user_id: int
    items: list[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=lambda: datetime.now(UTC))
~~~

- [[user_id: int]]: إجباري (ملوش default).
- [[field(default_factory=list)]]: [[default_factory]] **دالة** بتتنادى كل مرة object جديد يتعمل، والناتج بتاعها هو الـ default. [[list]] لما تتنادى بترجّع [[[]]] جديدة. فكل عربية ليها ليستة لوحدها: [[Cart(1).items is Cart(2).items]] طلعت [[False]].
- [[lambda: datetime.now(UTC)]]: [[lambda]] دالة صغيرة من غير اسم في سطر واحد، من غير باراميترات، بترجّع الوقت دلوقتي. لو كتبت [[= datetime.now(UTC)]] على طول، الوقت كان هيتحسب **مرة واحدة** وقت تعريف الـ class، وكل العربيات تاخد نفس الوقت.

الـ dataclass بيمنعك من [[= []]] أصلًا:

~~~text الناتج: items: list[str] = []
ValueError: mutable default <class 'list'> for field items is not allowed: use default_factory
~~~

والترتيب مهم: خانة من غير default مينفعش تيجي بعد خانة ليها default (زي باراميترات الدوال بالظبط):

~~~text الناتج: a: int = 1 وبعدها b: int
TypeError: non-default argument 'b' follows default argument 'a'
~~~

---

## ٤. التشغيل

~~~python
price = Money(15000)
print(price)
print(price == Money(15000))
~~~

~~~text الناتج
Money(amount=15000, currency='EGP')
True
~~~

[[__repr__]] المتولّد بيكتب كل خانة باسمها. و [[__eq__]] المتولّد بيقارن الخانات بالترتيب، فـ objectين مختلفين بنفس القيم متساويين.

~~~python
price.amount = 1
~~~

~~~text الناتج
dataclasses.FrozenInstanceError: cannot assign to field 'amount'
~~~

[[frozen]] منع التعديل. [[dataclasses.]] قبل الاسم معناها إن نوع الخطأ متعرّف في موديول [[dataclasses]].

~~~python
cheaper = replace(price, amount=12000)
~~~

[[replace]] بتعمل **نسخة جديدة** بالخانة اللي اتغيرت، والأصلي زي ما هو:

~~~text الناتج: print(cheaper, price)
Money(amount=12000, currency='EGP') Money(amount=15000, currency='EGP')
~~~

~~~python
cart = Cart(user_id=7)
cart.items.append("tea")
print(asdict(cart))
~~~

[[Cart]] مش frozen، فالليستة تتعدّل عادي. و [[asdict]] حوّلته dict:

~~~text الناتج
{'user_id': 7, 'items': ['tea'], 'created_at': datetime.datetime(2026, 10, 7, 8, 56, 13, 535237, tzinfo=datetime.timezone.utc)}
~~~

الوقت ده وقت التشغيل الفعلي بالـ UTC، والأرقام: سنة، شهر، يوم، ساعة، دقيقة، ثانية، ومايكروثانية. و [[tzinfo=...utc]] معناها إن الوقت عارف المنطقة الزمنية بتاعته.

### [[slots=True]] بيمسك الغلط الإملائي

~~~text الناتج: cart.itmes = ["x"]
AttributeError: 'Cart' object has no attribute 'itmes' and no __dict__ for setting new attributes
~~~

من غير [[slots]]، السطر ده كان هيعدّي ويعمل خانة جديدة اسمها [[itmes]] في صمت.

### مفيش فحص للأنواع

~~~python
Money("oops")
~~~

~~~text الناتج
Money(amount='oops', currency='EGP')
~~~

عدّى عادي. [[amount: int]] للمحرر و mypy بس، و Python وقت التشغيل مبيفحصش. الفحص ده شغل Pydantic (المستوى ٢).

---

## ٥. التجربة: [[frozen]] و الـ hash

~~~text الناتج: {price: "x"} مع frozen=True
{Money(amount=15000, currency='EGP'): 'x'}
~~~

ومن غير [[frozen]] (اتجرّب على dataclass عادي اسمه [[M2]] فيه [[amount: int]] بس):

| النسخة | الرسالة |
|---|---|
| 3.14 | [[TypeError: cannot use 'M2' as a dict key (unhashable type: 'M2')]] |
| 3.13 | [[TypeError: unhashable type: 'M2']] |

الـ dataclass لما ولّد [[__eq__]] من غير frozen، حط [[__hash__ = None]] (اتطبع [[None]])، لأن object بيتغير لو اتغيّر وهو مفتاح في dict هيضيع جواه.

---

## ٦. [[__post_init__]] و [[kw_only]] و [[order]] و [[field(...)]]

~~~python
from dataclasses import dataclass, field, fields, KW_ONLY
@dataclass(order=True, kw_only=True)
class Ticket:
    priority: int
    title: str = field(compare=False)
    token: str = field(default="", repr=False, compare=False)
    def __post_init__(self):
        if not 1 <= self.priority <= 5:
            raise ValueError(f"priority 1..5, got {self.priority}")
        self.title = self.title.strip()
t1 = Ticket(priority=3, title="  login broken ", token="s3cret")
t2 = Ticket(priority=1, title="typo")
print(t1)
print(sorted([t1, t2]))
print(t1 == Ticket(priority=3, title="other"))
print([f.name for f in fields(Ticket)])
Ticket(3, "x")
~~~

~~~text الناتج (Python 3.14)
Ticket(priority=3, title='login broken')
[Ticket(priority=1, title='typo'), Ticket(priority=3, title='login broken')]
True
['priority', 'title', 'token']
TypeError: Ticket.__init__() takes 1 positional argument but 3 were given
~~~

| الإعداد | بيعمل إيه | ليه |
|---|---|---|
| [[__post_init__]] | method بيناديها [[__init__]] المتولّد بعد ما يملا الخانات | فحص قواعد ([[priority 1..5, got 9]] اتجرّبت) وتنضيف قيم ([[strip]]) من غير ما تكتب [[__init__]] بإيدك |
| [[order=True]] | بيولّد [[<]] و [[<=]] و [[>]] و [[>=]] بمقارنة الخانات بالترتيب | [[sorted(tickets)]] تشتغل، والأولوية الأقل الأول |
| [[kw_only=True]] | كل الباراميترات لازم بالاسم | [[Ticket(3, "x")]] بترمي، فمحدش يبدّل الخانات بالغلط، وكمان بيلغي قاعدة «من غير default قبل اللي ليه default» |
| [[field(compare=False)]] | الخانة دي مش داخلة في [[==]] ولا الترتيب | العنوان مختلف والتذكرتين متساويين في الأولوية فـ [[True]] |
| [[field(repr=False)]] | مش بتظهر في الطباعة | التوكن [[s3cret]] مظهرش في [[print(t1)]] ولا هيظهر في اللوج |
| [[fields(Ticket)]] | لستة الخانات بأسمائها وأنواعها | تبني بيها CSV header أو form من غير ما تكتب الأسامي تاني |
| [[_: KW_ONLY]] | الخانات اللي بعد السطر ده بس بالاسم | [[Point(1, label="a")]]: الأولى بالمكان والباقي بالاسم |

- [[__post_init__]] بيتنادى بعد [[__init__]] على طول. ومع [[frozen=True]] مينفعش تكتب [[self.title = ...]] جواها؛ استخدم [[object.__setattr__(self, "title", ...)]].
- [[repr=False]] مش أمان كامل: [[asdict]] لسه بيطلّع التوكن. هو بس بيقفل أشهر طريق للتسريب (الطباعة واللوج).

---

## ٧. جدول المقارنة: dataclass ولا NamedTuple ولا TypedDict ولا dict

قيست ١٠٠ ألف object من كل نوع (خانتين أرقام) بـ [[tracemalloc]]، والإنشاء بـ [[timeit]] (أحسن ٥ مرات):

~~~text اتشغّل فعلًا (Python 3.14، ويندوز ١١)
dict              21.4 MB    108 ns
TypedDict         21.3 MB    232 ns
dataclass         12.2 MB    140 ns
dataclass slots    8.4 MB    134 ns
NamedTuple        10.7 MB    242 ns
tuple              9.9 MB     56 ns
~~~

| النوع | بيتعدّل؟ | فحص أنواع وقت التشغيل | استخدمه لـ |
|---|---|---|---|
| [[@dataclass]] | أيوه (إلا مع [[frozen]]) | لأ | داتا داخلية فيها سلوك ([[methods]])، والأكتر استخدامًا |
| [[@dataclass(slots=True)]] | أيوه | لأ | نفس اللي فوق لما عندك ملايين objects: أقل ذاكرة في الجدول |
| [[NamedTuple]] | لأ | لأ | نتيجة دالة فيها كذا قيمة وعايز تفكها [[x, y = p]]، وبتتقارن وتترتب زي tuple |
| [[TypedDict]] | أيوه | لأ | **شكل** dict لـ mypy بس؛ وقت التشغيل هو [[dict]] عادي ([[type(T(x=1, y=2))]] بتطلع [[<class 'dict'>]]) |
| Pydantic [[BaseModel]] | أيوه | **أيوه** | أي داتا جاية من برّه: request أو ملف أو env (وحدة Pydantic v2) |

- اللي يلفت النظر: الـ [[dict]] العادي أخد أكتر ذاكرة من الـ dataclass، لأن objects الـ class الواحد بتتشارك جدول المفاتيح (key-sharing) والـ dicts المنفصلة لأ.
- [[TypedDict]] أبطأ من [[dict]] في الإنشاء رغم إنه dict، لأن [[T(x=..)]] نداء لـ class بدل literal [[{...}]].
- الأرقام دي على جهازي؛ قيسها على جهازك (تمرين تحت). الفرق في النانوثانية مش هيفرق في API بيستنى داتابيز ٥ ملي ثانية؛ الفرق في الذاكرة بيفرق لما بتحمّل ملايين صفوف.

## الخلاصة

| عايز | اكتب |
|---|---|
| خانة إجبارية | [[name: type]] |
| خانة ليها default ثابت | [[name: type = value]] |
| default list أو dict أو وقت | [[field(default_factory=...)]] |
| object ميتعدلش ويبقى مفتاح | [[@dataclass(frozen=True)]] |
| تمنع خانات بالغلط ووفّر ذاكرة | [[slots=True]] |
| نسخة بقيمة متغيرة | [[replace(obj, x=...)]] |
| dict | [[asdict(obj)]] |

- الـ dataclass بيولّد [[__init__]] و [[__repr__]] و [[__eq__]]، ومبيفحصش الأنواع.
- للداتا اللي جاية من برّه (request، ملف إعدادات): Pydantic.`,
          lines: [
            R`[[dataclass]] الـ decorator نفسه، و [[field]] لإعدادات خانة واحدة (زي default بيتعمل جديد لكل object)، و [[asdict]] بتحوّل الـ object لـ dict (عشان JSON مثلًا)، و [[replace]] بتعمل نسخة بقيم متغيّرة من غير ما تلمس الأصل.`,
            R`[[datetime]] نوع التاريخ والوقت، و [[UTC]] (اختصار لـ [[timezone.utc]]، موجود من 3.11) المنطقة الزمنية العالمية. بنستخدمها عشان وقت الإنشاء يتخزن aware بالتوقيت العالمي مش بساعة السيرفر (درس datetime و zoneinfo).`,
            R`[[frozen=True]] بيخلي أي كتابة على خانة بعد الإنشاء ترمي [[FrozenInstanceError]]، وبيولّد [[__hash__]] فالـ object ينفع مفتاح في dict. و [[slots=True]] (3.10+) بيخزّن الخانات من غير [[__dict__]]: ذاكرة أقل (اتقاست في قسم «جدول المقارنة»)، وغلطة إملائية في اسم خانة بتطلع error بدل خانة جديدة.`,
            R`[[class Money:]] class عادي، والـ decorator اللي فوقه هو اللي بيكتب [[__init__]] و [[__repr__]] و [[__eq__]] من الخانات اللي تحت. مفيش وراثة من حاجة.`,
            R`[[amount: int]] مش متغير، ده annotation (اسم ونوع) من غير قيمة. الـ dataclass بيقرا الـ annotations بالترتيب ويعمل منها باراميترات [[__init__]]؛ ولأنها من غير default، [[amount]] إجباري. وبالقروش كـ [[int]] عشان مفيش كسور [[float]].`,
            R`[[currency: str = "EGP"]] خانة ليها default، فـ [[Money(15000)]] بتكفي. ولازم تيجي **بعد** الخانات اللي من غير default، وإلا [[TypeError: non-default argument ... follows default argument]] (أو استخدم [[kw_only=True]]، قسم الإعدادات في الشرح).`,
            R`[[@dataclass(slots=True)]] من غير [[frozen]]: الـ object بيتعدّل عادي ([[cart.user_id = 9]] شغالة)، لأن العربية بطبيعتها بتتغير. وفي المقابل مفيش [[__hash__]]، فمينفعش تتحط في set.`,
            R`[[Cart]] عربية مشتريات: رقم اليوزر، وليستة أصناف، ووقت إنشاء. مثال لداتا داخلية بتتعدل، عكس [[Money]] القيمة الثابتة.`,
            R`[[user_id: int]] إجباري (ملوش default)، فـ [[Cart()]] من غيره بترمي [[TypeError: Cart.__init__() missing 1 required positional argument: 'user_id']].`,
            R`[[field(default_factory=list)]]: [[list]] **دالة** بتتنادى مع كل object جديد وترجّع [[[]]] جديدة. من غيرها [[items: list[str] = []]] الـ dataclass بيرفضها أصلًا بـ [[ValueError: mutable default ... use default_factory]]، عشان كل العربيات كانت هتشارك نفس الليستة.`,
            R`[[default_factory=lambda: datetime.now(UTC)]] دالة صغيرة من غير اسم بتتنادى وقت إنشاء **كل** عربية، فكل واحدة ليها وقتها. لو كتبت [[= datetime.now(UTC)]] على طول، الوقت كان هيتحسب مرة واحدة وقت تعريف الـ class وكل العربيات تاخد نفس اللحظة.`,
            R`[[Money(15000)]] بينادي الـ [[__init__]] اللي الـ decorator ولّده: [[amount=15000]] و [[currency]] بالـ default. مكتبناش ولا سطر [[self.amount = amount]].`,
            R`[[print]] بيستخدم الـ [[__repr__]] المتولّد: [[Money(amount=15000, currency='EGP')]]، اسم كل خانة وقيمتها. ده لوحده سبب كفاية تستخدم dataclass بدل class عادي بيطبع [[<__main__.Money object at 0x...>]].`,
            R`[[__eq__]] المتولّد بيقارن الخانات كـ tuple بالترتيب، مش الهوية: اتنين معمولين لوحدهم بنفس القيمة = [[True]]. وبيرجّع [[NotImplemented]] لو النوع مختلف، فـ [[Money(1) == 1]] بـ [[False]] من غير error.`,
            R`الكتابة على object [[frozen]] بترمي [[dataclasses.FrozenInstanceError: cannot assign to field 'amount']] (نص 3.14). السطر ده بيوقّف السكربت لو شغّلته كملف، فجرّبه في الـ REPL أو جوه [[try]].`,
            R`[[replace(price, amount=12000)]] بترجّع [[Money]] **جديدة** بالمبلغ الجديد ونفس العملة، و [[price]] زي ما هي. ده الطريق «الصح» لتعديل frozen object: نسخة جديدة. (ومن 3.13 فيه [[copy.replace]] بيشتغل على أنواع تانية كمان.)`,
            R`[[Cart(user_id=7)]] بالاسم (ينفع بالمكان كمان). [[items]] اتعملت [[[]]] جديدة من الـ factory، و [[created_at]] اتحسب دلوقتي.`,
            R`[[append]] بيعدّل ليستة العربية دي بس. لو عملت [[Cart(8)]] بعدها، الـ items بتاعتها فاضية، لأن كل عربية خدت list من نداء مستقل لـ [[list()]].`,
            R`[[asdict(cart)]] بتحوّل الـ object لـ dict، وبتنزل جوه أي dataclass متداخلة وأي list أو dict وتعمل **نسخ** منها (deep copy)، فتعديل الـ dict الناتج مبيغيّرش العربية. الناتج [[{'user_id': 7, 'items': ['tea'], 'created_at': datetime.datetime(...)}]]، والـ datetime محتاج [[default=str]] لو هتعمل [[json.dumps]].`,
            R`[[Money("oops")]] بيعدّي من غير أي error ويطبع [[Money(amount='oops', currency='EGP')]]: الـ annotations للمحرر و mypy بس، و Python وقت التشغيل مبيفحصش الأنواع. لو عايز فحص: [[__post_init__]] بإيدك (قسم الإعدادات)، أو Pydantic للداتا اللي جاية من برّه.`,
          ],
          sol: R`مع [[items: list[str] = []]] الـ class مش هيتعرّف أصلًا: [[ValueError: mutable default <class 'list'> for field items is not allowed: use default_factory]]. الـ dataclass بيمنعها عشان كل الـ carts هتشارك نفس الـ list (نفس غلطة الـ default المتغير في الدوال)، و [[default_factory=list]] بيعمل list جديدة لكل object.

و [[{price: "x"}]] مع [[frozen=True]] بتشتغل: [[{Money(amount=15000, currency='EGP'): 'x'}]]، لأن frozen مع [[eq]] (الافتراضي) بيعملوا [[__hash__]] من الحقول. من غير frozen هتاخد [[TypeError: unhashable type: 'Money']] (في 3.14 الرسالة أطول: [[cannot use 'Money' as a dict key (unhashable type: 'Money')]]): الـ dataclass عمل [[__eq__]] فشال الـ hash الافتراضي، لأن object ممكن يتغير ميبقاش آمن كمفتاح.`
        },
        {
          cmd: "Enum",
          title: "قيم محددة بالاسم بدل strings سايبة: Enum و StrEnum",
          desc: R`لما قيمة ليها اختيارات محددة (حالة طلب، دور مستخدم، أولوية)، بدل ما تكتب [["shipped"]] كـ string في ٢٠ مكان وحد يكتب [["shiped"]]، اعمل [[Enum]]: كل اختيار اسم ثابت، والمحرر بيكمّله، والغلطة الإملائية بتطلع [[AttributeError]] فورًا.

[[StrEnum]] (3.11+) أعضاؤه strings فعلًا، فبيتقارن بالـ string وبيتحوّل JSON من غير تعب، وده الأنسب مع APIs وقواعد البيانات. و [[IntEnum]] نفس الفكرة بأرقام، و [[Flag]] لصلاحيات بتتجمع بـ [[|]]. و [[auto()]] بيدّي القيمة لوحده.`,
          example: R`from enum import Enum, Flag, IntEnum, StrEnum, auto
class OrderStatus(StrEnum):
    PENDING = auto()
    PAID = auto()
    SHIPPED = auto()
    CANCELLED = auto()
print(OrderStatus.PAID, OrderStatus.PAID == "paid")      # paid True
s = OrderStatus("shipped")
print(s.name, s.value, s is OrderStatus.SHIPPED)          # SHIPPED shipped True
print([st.value for st in OrderStatus])
class Priority(IntEnum):
    LOW = 1
    HIGH = 3
print(Priority.HIGH > Priority.LOW, Priority(3).name)     # True HIGH
class Perm(Flag):
    READ = auto()
    WRITE = auto()
    DELETE = auto()
editor = Perm.READ | Perm.WRITE
print(Perm.WRITE in editor, Perm.DELETE in editor)        # True False
class Color(Enum):
    RED = "#f00"
print(Color.RED == "#f00", Color("#f00"))                 # False Color.RED
match s:
    case OrderStatus.SHIPPED | OrderStatus.PAID:
        print("اتدفع")
    case OrderStatus.CANCELLED:
        print("اتلغى")
OrderStatus("lost")                                        # ValueError: 'lost' is not a valid OrderStatus`,
          try: R`اعمل [[OrderStatus]] فيها PENDING و PAID و SHIPPED و DELIVERED و CANCELLED، و dict اسمه [[ALLOWED]] بيقول من كل حالة ينفع تروح لأنهي حالات (PENDING لـ PAID أو CANCELLED، و PAID لـ SHIPPED أو CANCELLED، و SHIPPED لـ DELIVERED بس)، ودالة [[can_move(current, new)]]. وضيف assert بيتأكد إن كل حالة في الـ Enum ليها سطر في [[ALLOWED]].`,
          sol: R`المتوقع: [[can_move(PENDING, PAID)]] ترجع True، و [[can_move(SHIPPED, CANCELLED)]] ترجع False (اتشحن خلاص، مينفعش يتلغى)، و [[can_move(OrderStatus("paid"), OrderStatus("shipped"))]] True، ودي الطريقة اللي بتحوّل بيها string جاي من الـ request أو القاعدة لـ Enum.

الـ assert [[set(ALLOWED) == set(OrderStatus)]] هو اللي بيحميك لما حد يضيف حالة جديدة (REFUNDED مثلًا) وينسى يحدد انتقالاتها: البرنامج يقع وقت التشغيل الأول بدل ما [[ALLOWED[new_status]]] تطلّع KeyError في نص طلب حقيقي. والحالات النهائية (DELIVERED و CANCELLED) قيمتها [[set()]] فاضية مش مش موجودة. الغلطة الشائعة: تخزّن الانتقالات كـ strings ([[{"pending": ["paid"]}]]) فالـ typo يعدّي.`,
          solCode: R`from enum import StrEnum, auto
class OrderStatus(StrEnum):
    PENDING = auto()
    PAID = auto()
    SHIPPED = auto()
    DELIVERED = auto()
    CANCELLED = auto()
ALLOWED: dict[OrderStatus, set[OrderStatus]] = {
    OrderStatus.PENDING: {OrderStatus.PAID, OrderStatus.CANCELLED},
    OrderStatus.PAID: {OrderStatus.SHIPPED, OrderStatus.CANCELLED},
    OrderStatus.SHIPPED: {OrderStatus.DELIVERED},
    OrderStatus.DELIVERED: set(),
    OrderStatus.CANCELLED: set(),
}
def can_move(current: OrderStatus, new: OrderStatus) -> bool:
    return new in ALLOWED[current]
print(can_move(OrderStatus.PENDING, OrderStatus.PAID))
print(can_move(OrderStatus.SHIPPED, OrderStatus.CANCELLED))
print(can_move(OrderStatus("paid"), OrderStatus("shipped")))
assert set(ALLOWED) == set(OrderStatus), "كل حالة لازم يبقى ليها سطر"`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من غير ما تبص، اكتب الفرق بين [[OrderStatus("paid")]] و [[OrderStatus["PAID"]]]، وإيه اللي كل واحد بيرميه لو غلط، وأنهي نوع Enum بيطلع JSON من غير [[.value]].`, done: R`كاتب: الأول بالقيمة وبيرمي [[ValueError]]، والتاني بالاسم وبيرمي [[KeyError]]، و [[StrEnum]] و [[IntEnum]] و [[IntFlag]] بيتحوّلوا JSON، وجرّبت الأربعة في الـ REPL.` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[class Role(Enum): ADMIN = "admin"; USER = "user"; MEMBER = "user"]]. إيه ناتج [[len(list(Role))]] و [[Role.MEMBER]] و [[Role("user")]] و [[Role.ADMIN == "admin"]]؟`, done: R`توقعت [[2]] و [[Role.USER]] و [[Role.USER]] و [[False]]، وشغّلتهم وطابقوا، وتقدر تقول إن [[MEMBER]] alias وإن [[@unique]] كانت هتمسكه.` },
            { lvl: 'تطبيق', t: R`**صلّح:** الكود ده [[if order["status"] == "Shipped": notify()]] مبيبعتش إشعار أبدًا، والداتا فيها [["shipped"]]. حوّل الحالة لـ [[StrEnum]] واكتب [[parse_status(text)]] بتقبل الكابيتال والمسافات ([[" Shipped "]]) وترمي [[ValueError]] برسالة فيها القيم المسموحة لو غلط.`, done: R`[[parse_status(" Shipped ")]] بترجّع [[OrderStatus.SHIPPED]]، و [[parse_status("lost")]] رسالتها فيها [[pending, paid, shipped, cancelled]]، والمقارنة في الكود بقت [[is OrderStatus.SHIPPED]] من غير ولا string.` },
            { lvl: 'تطبيق', t: R`**محاكاة:** آلة حالات لطلب بـ [[ALLOWED]] (dict من كل حالة لـ set الحالات اللي ينفع تروحلها، زي حل التجربة) و [[class Order]] فيها [[move(to)]] بتسجّل كل انتقال في [[history]] مع الوقت. شغّل ٣ سيناريوهات: طلب طبيعي لحد التسليم، وطلب اتلغى بعد الدفع، ومحاولة شحن طلب ملغي.`, done: R`السيناريو الأول [[history]] فيه ٤ انتقالات بالترتيب، والتاني بيخلص بـ [[cancelled]]، والتالت بيرمي [[ValueError]] فيها [[cancelled -> shipped]] والـ [[history]] متغيّرش، و [[assert set(ALLOWED) == set(OrderStatus)]] موجود.` },
            { lvl: 'تطبيق', t: R`**ابني:** [[class Perm(Flag)]] فيها [[READ]] و [[WRITE]] و [[DELETE]] و [[ADMIN = READ | WRITE | DELETE]]، و [[ROLES = {"viewer": ..., "editor": ..., "admin": ...}]]، ودالة [[can(role, perm)]]. وبعدين خزّن صلاحيات يوزر كرقم ([[perm.value]]) وارجع اقراها ([[Perm(3)]]).`, done: R`[[can("editor", Perm.DELETE)]] بـ [[False]] و [[can("admin", Perm.DELETE)]] بـ [[True]]، و [[Perm(Perm.READ.value | Perm.WRITE.value)]] بترجع نفس صلاحيات الـ editor، و [[can("ghost", ...)]] بترمي [[KeyError]] برسالة واضحة.` },
            { lvl: 'تحدي', t: R`**دوّر بنفسك:** من وثائق [[enum]] الرسمية (أو [[help(enum)]]) لاقي إزاي تعمل Enum أعضاؤه tuples ([[EGP = ("EGP", "ج.م", 2)]]) وكل عضو ليه [[code]] و [[symbol]] و [[decimals]] كخانات، من غير dict جنبه. استخدمه في دالة [[fmt(cents, currency)]].`, done: R`[[Currency.EGP.symbol]] بترجّع [[ج.م]]، و [[fmt(123456, Currency.EGP)]] بترجّع [[1,234.56 ج.م]]، و [[Currency("EGP")]] شغالة بالكود لوحده. (مع [[__init__]] بس، القيمة بتفضل الـ tuple كله و [[Currency("EGP")]] بترمي؛ الحل [[__new__]] اللي بيحط [[_value_]] = الكود، وكاتب ده في تعليق.)` },
          ],
          deep: {
            why: R`الـ status كـ string حر من أشهر مصادر الـ bugs: [["Paid"]] و [["paid"]] و [["PAID"]] في نفس القاعدة، و if بتقارن بقيمة اتكتبت غلط. والـ Enum بيجمع الاختيارات في مكان واحد. وفي FastAPI، باراميتر نوعه Enum بيتفحص لوحده (أي قيمة تانية 422) وبيظهر كـ dropdown في [[/docs]]، ونفس الكلام في Pydantic.`,
            how: R`كل عضو في الـ Enum object واحد بس (singleton): [[OrderStatus("shipped") is OrderStatus.SHIPPED]] True، وليه [[.name]] (الاسم) و [[.value]] (القيمة). و [[OrderStatus("lost")]] بيرمي [[ValueError]]، فده نفسه validation. والـ Enum بيتلف عليه بالترتيب اللي اتكتب بيه.

[[Enum]] العادي مش بيتساوى مع قيمته: [[Color.RED == "#f00"]] False، ولازم [[Color.RED.value]]. أما [[StrEnum]] و [[IntEnum]] فورثوا من str و int، فبيتقارنوا ويتطبعوا كقيمتهم. و [[auto()]] في [[StrEnum]] بيدّي اسم العضو بحروف صغيرة.

[[Flag]]: كل عضو bit، و [[|]] بيجمعهم، و [[in]] بيسأل «الصلاحية دي موجودة؟». ومع [[match]] الأعضاء فيهم نقطة ([[OrderStatus.SHIPPED]])، فبيتقارنوا كقيم مش capture (درس «match و case»).

في Postgres تقدر تخزّن الـ StrEnum كـ [[text]] مع [[CHECK]]، أو كـ enum type في القاعدة (تاب «SQL و Prisma»).`,
            when: R`أي مجموعة قيم ثابتة ومعروفة وقت كتابة الكود: حالات، أدوار، أنواع. لو القيم بتتغير من لوحة تحكم (فئات منتجات بيضيفها الأدمن)، مكانها جدول في القاعدة مش Enum.`,
            mistakes: R`[[Enum]] عادي وتقارنه بـ string فيطلع False دايمًا في صمت (استخدم StrEnum). وتخزّن [[.name]] في القاعدة مرة و [[.value]] مرة. وتغيّر قيمة عضو موجود وفي داتا قديمة بالقيمة القديمة. و [[case PAID:]] من غير اسم الـ Enum جوه match (capture مش مقارنة).`
          },
          teach: R`## المثال بيعمل إيه؟

٤ أنواع Enum: [[StrEnum]] لحالة طلب، و [[IntEnum]] لأولوية، و [[Flag]] لصلاحيات بتتجمع، و [[Enum]] العادي للمقارنة. وفي الآخر [[match]] على الحالة، وقيمة غلط بترمي. اتشغّل بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker)، والناتج واحد.

**Enum** (من enumeration يعني «تعداد»): class أعضاؤه ثابتين ومعروفين من الأول، وكل عضو ليه **اسم** ([[.name]]) و**قيمة** ([[.value]]).

> آخر سطر ([[OrderStatus("lost")]]) بيرمي [[ValueError]] بالقصد، وهو آخر سطر فمش هيوقف حاجة.

---

## ١. [[StrEnum]] و [[auto()]]

~~~python
from enum import Enum, Flag, IntEnum, StrEnum, auto
class OrderStatus(StrEnum):
    PENDING = auto()
    PAID = auto()
    SHIPPED = auto()
    CANCELLED = auto()
~~~

- [[class OrderStatus(StrEnum):]]: Enum أعضاؤه **strings** فعلًا (الـ class بيورث من [[str]]). [[StrEnum]] من 3.11.
- الأسماء بحروف كابيتال لأنها ثوابت (عرف).
- [[auto()]]: «اختار القيمة لوحدك». في [[StrEnum]] القيمة بتبقى اسم العضو بحروف صغيرة: [[PAID]] قيمته [["paid"]].

~~~python
print(OrderStatus.PAID, OrderStatus.PAID == "paid")
~~~

~~~text الناتج
paid True
~~~

بيتطبع كقيمته، وبيساوي الـ string العادي لأنه **هو** string: [[isinstance(OrderStatus.PAID, str)]] طلعت [[True]]، و [[OrderStatus.PAID.upper()]] رجّعت [['PAID']]. وفي الـ REPL شكله الكامل [[<OrderStatus.PAID: 'paid'>]]. وده اللي بيخلّيه يتحوّل JSON من غير تعب: [[json.dumps({"status": OrderStatus.PAID})]] طلّعت [[{"status": "paid"}]].

والغلط الإملائي بيبان فورًا:

~~~text الناتج: OrderStatus.SHIPED
AttributeError: type object 'OrderStatus' has no attribute 'SHIPED'
~~~

مقارنة بـ [[status == "shiped"]] كـ string، اللي بترجع [[False]] في صمت.

---

## ٢. من string لـ Enum

~~~python
s = OrderStatus("shipped")
print(s.name, s.value, s is OrderStatus.SHIPPED)
~~~

- [[OrderStatus("shipped")]]: نداء الـ class **بقيمة** بيرجّع العضو اللي قيمته كده. ده اللي بتعمله مع داتا جاية من request أو قاعدة بيانات. (و [[OrderStatus["PAID"]]] بالأقواس المربعة بيدوّر **بالاسم**.)
- [[s is OrderStatus.SHIPPED]]: [[is]] بتسأل «نفس الـ object بالظبط؟». كل عضو object واحد بس في البرنامج كله (singleton).

~~~text الناتج
SHIPPED shipped True
~~~

~~~python
print([st.value for st in OrderStatus])
~~~

الـ Enum بيتلف عليه بترتيب الكتابة:

~~~text الناتج
['pending', 'paid', 'shipped', 'cancelled']
~~~

---

## ٣. [[IntEnum]]

~~~python
class Priority(IntEnum):
    LOW = 1
    HIGH = 3
print(Priority.HIGH > Priority.LOW, Priority(3).name)
~~~

نفس فكرة [[StrEnum]] بس الأعضاء أرقام ([[int]])، فبيتقارنوا ويتجمعوا كأرقام. و [[Priority(3)]] بيرجّع العضو اللي قيمته 3.

~~~text الناتج
True HIGH
~~~

---

## ٤. [[Flag]]: صلاحيات بتتجمع

~~~python
class Perm(Flag):
    READ = auto()
    WRITE = auto()
    DELETE = auto()
editor = Perm.READ | Perm.WRITE
print(Perm.WRITE in editor, Perm.DELETE in editor)
~~~

في [[Flag]]، [[auto()]] بيدّي كل عضو **bit** لوحده: القيم [[1, 2, 4]] (كل واحدة ضعف اللي قبلها). ليه؟ لأن في الـ binary دول [[001]] و [[010]] و [[100]]، كل واحد في خانة مختلفة.

- [[|]] (اسمها OR): بتجمع الـ bits. [[READ | WRITE]] = [[1 | 2]] = [[3]] ([[011]]). وشكلها في الـ REPL [[<Perm.READ|WRITE: 3>]].
- [[in]]: «الـ bit ده موجود جوه؟».

~~~text الناتج
True False
~~~

---

## ٥. [[Enum]] العادي مش بيساوي قيمته

~~~python
class Color(Enum):
    RED = "#f00"
print(Color.RED == "#f00", Color("#f00"))
~~~

[[Enum]] العادي مش وارث من [[str]]، فالعضو object مختلف عن قيمته، و [[==]] بترجع [[False]]. لازم [[Color.RED.value]] لو عايز [["#f00"]]. ولما تطبعه بيطلع [[Color.RED]] مش القيمة.

~~~text الناتج
False Color.RED
~~~

ده سبب إن [[StrEnum]] هو الأنسب مع الـ APIs.

---

## ٦. [[match]] على Enum

~~~python
match s:
    case OrderStatus.SHIPPED | OrderStatus.PAID:
        print("اتدفع")
    case OrderStatus.CANCELLED:
        print("اتلغى")
~~~

- [[match s:]]: قارن [[s]] بالحالات بالترتيب (درس «match و case»).
- [[|]] جوه [[case]] معناها «أو»: لو [[SHIPPED]] أو [[PAID]].
- الاسم فيه **نقطة** ([[OrderStatus.SHIPPED]])، فـ Python بيقارن بقيمته. لو كتبت [[case PAID:]] اسم لوحده من غير نقطة، ده **capture**: بيمسك أي قيمة ويحطها في متغير اسمه [[PAID]]. اتجرّب: [[s = "cancelled"]] مع [[case PAID:]] طبع [[matched cancelled]]. ولو فيه [[case]] بعده Python بيرفض الكود: [[SyntaxError: name capture 'PAID' makes remaining patterns unreachable]].

[[s]] قيمته [[SHIPPED]] من فوق:

~~~text الناتج
اتدفع
~~~

---

## ٧. قيمة مش موجودة

~~~python
OrderStatus("lost")
~~~

~~~text الناتج
ValueError: 'lost' is not a valid OrderStatus
~~~

يعني تحويل string لـ Enum هو نفسه validation: أي قيمة برّه القايمة بترمي.

---

## ٨. الحل: انتقالات الحالة

~~~python solCode (من غير الـ type hint اللي على أول سطر)
ALLOWED = {
    OrderStatus.PENDING: {OrderStatus.PAID, OrderStatus.CANCELLED},
    ...
    OrderStatus.DELIVERED: set(),
    OrderStatus.CANCELLED: set(),
}
def can_move(current: OrderStatus, new: OrderStatus) -> bool:
    return new in ALLOWED[current]
~~~

- في الحل أول سطر عليه type hint: [[ALLOWED]] نوعه [[dict]] مفتاحه [[OrderStatus]] وقيمته [[set[OrderStatus] ]]، يعني كل حالة قصادها مجموعة حالات.
- [[{A, B}]]: set (مجموعة من غير تكرار). و [[set()]] set فاضية (لأن [[{}]] لوحدها dict فاضي مش set).
- [[new in ALLOWED[current]]]: هات الحالات المسموحة من الحالية، واسأل الجديدة فيهم؟

~~~python solCode
assert set(ALLOWED) == set(OrderStatus), "كل حالة لازم يبقى ليها سطر"
~~~

- [[set(ALLOWED)]]: مفاتيح الـ dict كـ set. و [[set(OrderStatus)]]: كل الأعضاء.
- [[assert شرط, "رسالة"]]: لو الشرط [[False]] ارمي [[AssertionError]] بالرسالة. هنا عدّى من غير ما يطبع حاجة.

~~~text الناتج
True
False
True
~~~

[[PENDING]] لـ [[PAID]] مسموح، و [[SHIPPED]] لـ [[CANCELLED]] لأ، و [[OrderStatus("paid")]] لـ [[OrderStatus("shipped")]] مسموح.

---

## ٩. methods و properties على الـ Enum

الـ Enum class عادي، فتقدر تحط فيه سلوك يخص الحالة بدل ما تبعتره [[if]] في كل حتة:

~~~python
import json
from enum import Enum, StrEnum, IntFlag, unique, auto
class Status(StrEnum):
    PENDING = auto()
    PAID = auto()
    SHIPPED = auto()
    @property
    def label(self) -> str:
        return {"pending": "مستني الدفع", "paid": "اتدفع", "shipped": "اتشحن"}[self.value]
    def can_cancel(self) -> bool:
        return self in (Status.PENDING, Status.PAID)
print(Status.PAID.label, Status.SHIPPED.can_cancel())
print(json.dumps({"status": Status.PAID}))
print(Status["PAID"])
Status["paid"]
~~~

~~~text الناتج (Python 3.14)
اتدفع False
{"status": "paid"}
paid
KeyError: 'paid'
~~~

- [[label]] و [[can_cancel]] بيتعرّفوا جوه الـ class زي أي class، بس **مش** بيبقوا أعضاء (الـ methods والـ properties بتتساب). فـ [[list(Status)]] لسه ٣ أعضاء.
- [[Status["PAID"]]] بالاسم الكبير، و [[Status["paid"]]] بالقيمة بترمي [[KeyError]]. لو الداتا جاية بالقيمة استخدم [[Status("paid")]].

---

## ١٠. aliases و [[@unique]]

~~~python
class Size(Enum):
    S = 1
    SMALL = 1
print(Size.SMALL, Size.SMALL is Size.S, list(Size))
@unique
class Size2(Enum):
    S = 1
    SMALL = 1
~~~

~~~text الناتج
Size.S True [<Size.S: 1>]
ValueError: duplicate values found in <enum 'Size2'>: SMALL -> S
~~~

- قيمتين زي بعض = العضو التاني **alias** (اسم تاني) للأول، مش عضو جديد: [[Size.SMALL]] بتطبع [[Size.S]]، واللفة بتجيب عضو واحد. ممكن يكون ده المقصود (اسم قديم لسه شغال)، وممكن تكون غلطة نسخ ولصق.
- [[@unique]] بيرفض أي قيمة متكررة وقت تعريف الـ class. حطه على أي Enum القيم فيه بتتخزن في داتابيز.

---

## ١١. [[IntFlag]]: صلاحيات زي [[chmod]]

~~~python
class P(IntFlag):
    R = 4; W = 2; X = 1
print(P(6), P.R | P.W == 6, int(P.R | P.X))
~~~

~~~text الناتج
6 True 5
~~~

[[IntFlag]] زي [[Flag]] بس الأعضاء أرقام فعلًا، فبيتقارن بالأرقام ويتطبع كرقم ([[P(6)]] طبعت [[6]] مش [[P.R|W]]). مناسب لما الرقم نفسه بروتوكول (صلاحيات ملفات لينكس: [[rw-]] = ٦). و [[Flag]] العادي أأمن لو مش محتاج تقارن بأرقام.

| النوع | العضو بيساوي قيمته؟ | JSON من غير [[.value]] | استخدمه لـ |
|---|---|---|---|
| [[Enum]] | لأ | لأ، [[TypeError]] | قيم داخلية مش عايز حد يقارنها بـ string |
| [[StrEnum]] | أيوه | أيوه | حالات بتتخزن وبتتبعت في API (الأكتر استخدامًا) |
| [[IntEnum]] | أيوه | أيوه (رقم) | أولويات ومستويات ليها ترتيب |
| [[Flag]] | لأ | لأ | صلاحيات وخيارات بتتجمع |
| [[IntFlag]] | أيوه | أيوه (رقم) | نفس [[Flag]] بس الرقم نفسه ليه معنى برّه |

## الخلاصة

| النوع | الأعضاء | بيساوي قيمته؟ | الاستخدام |
|---|---|---|---|
| [[StrEnum]] | strings | [[True]] | حالات وأدوار في API وقاعدة بيانات |
| [[IntEnum]] | أرقام | [[True]] | أولويات، مستويات |
| [[Flag]] | bits | مش موضوعه | صلاحيات بتتجمع بالـ OR |
| [[Enum]] | أي حاجة | [[False]] | لما مش عايز تخلطه بقيمته |

- [[X("value")]] من قيمة لعضو (وبترمي لو غلط)، و [[X["NAME"]]] من اسم.
- [[.name]] الاسم و [[.value]] القيمة، وكل عضو موجود مرة واحدة ([[is]]).
- جوه [[match]] اكتب [[OrderStatus.PAID]] بالنقطة، مش [[PAID]].`,
          lines: [
            R`بنستورد ٤ أنواع: [[Enum]] الأساسي (العضو مش بيساوي قيمته)، و [[StrEnum]] (3.11+، الأعضاء strings فعلًا)، و [[IntEnum]] (الأعضاء أرقام وبتتقارن كأرقام)، و [[Flag]] (أعضاء بتتجمع بـ [[|]] زي الصلاحيات). و [[auto()]] بتختار القيمة لوحدها بدل ما تكتبها.`,
            R`[[class OrderStatus(StrEnum):]] بيعرّف مجموعة حالات الطلب. الوراثة من [[StrEnum]] معناها إن كل عضو **هو** string ([[isinstance(OrderStatus.PAID, str)]] بـ [[True]])، فبيتخزن في الداتابيز وبيتحوّل JSON من غير [[.value]].`,
            R`[[PENDING = auto()]]: في [[StrEnum]]، [[auto()]] بتدّي القيمة اسم العضو بحروف صغيرة، يعني [["pending"]]. الاسم الكبير ([[PENDING]]) للكود، والقيمة الصغيرة للداتا اللي برّه. والأعضاء ثوابت: [[OrderStatus.PENDING = "x"]] بترمي [[AttributeError: cannot reassign member 'PENDING']].`,
            R`[[PAID]] قيمته [["paid"]]. كل عضو بيتعمل **مرة واحدة** وقت تعريف الـ class، فأي [[OrderStatus.PAID]] في أي حتة في البرنامج هو نفس الـ object، وتقدر تقارن بـ [[is]].`,
            R`[[SHIPPED]] قيمته [["shipped"]]. لو حد كتب [[OrderStatus.SHIPED]] (غلطة إملائية) هتطلع [[AttributeError]] فورًا، وده الفرق عن string سايب [["shiped"]] اللي كان هيعدّي في صمت ومحدش يلاقي الطلب.`,
            R`[[CANCELLED]] قيمته [["cancelled"]]. الترتيب اللي بتكتب بيه الأعضاء هو ترتيب اللفة عليهم ([[for st in OrderStatus]])، فاكتبهم بترتيب منطقي (ترتيب مراحل الطلب).`,
            R`[[print(OrderStatus.PAID)]] بيطبع القيمة [[paid]] (في [[StrEnum]] الـ str هو القيمة)، و [[== "paid"]] بـ [[True]] لأنه string. فبيشتغل مع كود قديم بيقارن بـ strings. الناتج [[paid True]].`,
            R`[[OrderStatus("shipped")]]: نداء الـ class **بقيمة** بيرجّع العضو. ده اللي بتعمله مع قيمة جاية من request أو صف في الداتابيز، وبيرمي [[ValueError]] لو القيمة مش من الاختيارات (آخر سطر).`,
            R`[[.name]] الاسم في الكود ([[SHIPPED]])، و [[.value]] القيمة ([[shipped]])، و [[is]] بيأكد إن [[OrderStatus("shipped")]] رجّع **نفس** العضو مش نسخة. الناتج [[SHIPPED shipped True]].`,
            R`اللفة على الـ class نفسه بتجيب كل الأعضاء بترتيب التعريف: [[['pending', 'paid', 'shipped', 'cancelled']]]. مفيدة لـ dropdown في الواجهة أو رسالة خطأ فيها «القيم المسموحة».`,
            R`[[class Priority(IntEnum):]] أعضاؤه أرقام فعلًا ([[Priority.HIGH + 1]] بـ [[4]])، فبيتقارن ويترتب كأرقام. مناسب لما الترتيب نفسه له معنى (أولوية، مستوى)، ومش مناسب لحالات ملهاش ترتيب.`,
            R`[[LOW = 1]] قيمة مكتوبة بإيدك بدل [[auto()]]، لأن الرقم نفسه مهم (بيتخزن في الداتابيز أو بيتبعت لنظام تاني). لو استخدمت [[auto()]] الأرقام هتبقى ١ و ٢ بالترتيب، وأي إعادة ترتيب هتغيّرها.`,
            R`[[HIGH = 3]]: سبنا [[2]] فاضية قصد عشان لو احتجنا [[MEDIUM]] بعدين نحطها في النص من غير ما نغيّر قيم موجودة في داتا قديمة.`,
            R`[[Priority.HIGH > Priority.LOW]] مقارنة أرقام = [[True]]، و [[Priority(3)]] بيرجّع العضو اللي قيمته ٣ و [[.name]] بتاعه [[HIGH]]. الناتج [[True HIGH]].`,
            R`[[class Perm(Flag):]] للحاجات اللي بتتجمع: يوزر ممكن يبقى معاه قراية **و** كتابة في نفس الوقت. كل عضو bit لوحده في رقم، والتجميع بـ [[|]] (OR) بيعمل قيمة فيها كذا bit.`,
            R`[[READ = auto()]]: في [[Flag]]، [[auto()]] بتدّي قوى ٢ بالترتيب: [[READ]] بـ [[1]] (binary [[001]])، عشان كل عضو ياخد bit مختلف ومفيش اتنين يتلخبطوا لما يتجمعوا.`,
            R`[[WRITE]] بـ [[2]] (binary [[010]]). لو كتبت القيم بإيدك واديت اتنين نفس الـ bit، [[READ | WRITE]] هتبقى نفس [[READ]] من غير ما تاخد بالك.`,
            R`[[DELETE]] بـ [[4]] (binary [[100]]). فـ [[READ | WRITE | DELETE]] = [[7]] = كل الصلاحيات.`,
            R`[[Perm.READ | Perm.WRITE]] بيعمل قيمة واحدة فيها الصلاحيتين ([[3]])، وبتتطبع [[Perm.READ|WRITE]]. بتتخزن كرقم واحد في عمود في الداتابيز بدل جدول صلاحيات.`,
            R`[[in]] مع [[Flag]] بتسأل «الـ bit ده موجود في التجميعة؟»: [[WRITE]] موجود و [[DELETE]] لأ. الناتج [[True False]]. ده أوضح من [[editor & Perm.DELETE]].`,
            R`[[class Color(Enum):]] [[Enum]] العادي: العضو object مختلف عن قيمته (مش وارث من [[str]] ولا [[int]]). مناسب لما القيمة تفصيلة داخلية ومش عايز حد يقارن بيها مباشرة.`,
            R`[[RED = "#f00"]]: القيمة كود لون. لازم [[Color.RED.value]] عشان توصله، و [[json.dumps({"c": Color.RED})]] بترمي [[TypeError: Object of type Color is not JSON serializable]] (اتجرّبت).`,
            R`[[Color.RED == "#f00"]] بـ [[False]]: [[Enum]] العادي مش بيساوي قيمته، ودي أشهر لخبطة لما تنقل من string لـ Enum. و [[Color("#f00")]] بيرجّع العضو، وبيتطبع [[Color.RED]]. الناتج [[False Color.RED]].`,
            R`[[match s:]] على Enum (درس match و case): بيقارن [[s]] بكل [[case]] بالترتيب، وأول واحدة تطابق بتتنفّذ والباقي بيتساب.`,
            R`[[OrderStatus.SHIPPED]] فيه نقطة، فـ match بيعامله كقيمة **بيقارن بيها** (value pattern). لو كتبت اسم من غير نقطة ([[case SHIPPED:]])، كان هيبقى متغير بيلقط أي قيمة (capture). و [[|]] هنا معناها «أو».`,
            R`بيطبع [[اتدفع]] لأن [[s]] = [[SHIPPED]] وهي من الاتنين اللي في الـ case. وبعد أول تطابق match بيخرج.`,
            R`[[case OrderStatus.CANCELLED:]] حالة تانية مش هتتنفّذ هنا. ولو عايز تمسك أي حالة ناقصة، ضيف [[case _:]] في الآخر بترمي error، عشان لما حد يزوّد حالة جديدة ينكشف.`,
            R`كان هيطبع [[اتلغى]] لو الطلب ملغي. مفيش fall-through زي [[switch]] في لغات تانية، فمش محتاج [[break]].`,
            R`[[OrderStatus("lost")]] قيمة مش من الاختيارات بترمي [[ValueError: 'lost' is not a valid OrderStatus]]. ده validation ببلاش للداتا اللي جاية من برّه، و FastAPI بيحوّلها لرد 422 لوحده لو الباراميتر نوعه Enum.`,
          ]
        },
        {
          cmd: "Protocol و ABC",
          title: "interface في Python: ABC ولا Protocol؟",
          desc: R`لما دالة محتاجة «أي حاجة بتعرف تبعت رسالة» ومش فارق معاها إيميل ولا SMS ولا fake في الاختبار، محتاج تعرّف الشكل ده. فيه طريقتين:

[[ABC]] مع [[@abstractmethod]]: class أساسي لازم الأبناء يورثوا منه ويكتبوا الـ methods، ولو ابن نسي واحدة، Python يرفض يعمل object منه. و [[typing.Protocol]] (structural typing، زي interface في TypeScript): بتوصف الشكل بس، وأي class فيه نفس الـ methods يطابق من غير ما يورث من حاجة. mypy و pyright هما اللي بيفحصوا.`,
          example: R`from abc import ABC, abstractmethod
from typing import Protocol, runtime_checkable
type Message = tuple[str, str]
class Storage(ABC):
    @abstractmethod
    def save(self, key: str, data: bytes) -> None: ...
    def save_text(self, key: str, text: str) -> None:
        self.save(key, text.encode("utf-8"))
class MemoryStorage(Storage):
    def __init__(self) -> None:
        self.files: dict[str, bytes] = {}
    def save(self, key: str, data: bytes) -> None:
        self.files[key] = data
store = MemoryStorage()
store.save_text("a.txt", "أهلًا")
print(store.files)
@runtime_checkable
class Sender(Protocol):
    def send(self, to: str, text: str) -> None: ...
class EmailSender:
    def send(self, to: str, text: str) -> None:
        print("email to", to, ":", text)
class FakeSender:
    def __init__(self) -> None:
        self.sent: list[Message] = []
    def send(self, to: str, text: str) -> None:
        self.sent.append((to, text))
def notify_shipped(sender: Sender, to: str) -> None:
    sender.send(to, "طلبك اتشحن")
notify_shipped(EmailSender(), "sara@example.com")
fake = FakeSender()
notify_shipped(fake, "omar@example.com")
print(fake.sent, isinstance(fake, Sender))
Storage()                                      # TypeError: Can't instantiate abstract class Storage`,
          try: R`اعمل Protocol اسمه [[Clock]] فيه [[now() -> datetime]]، و classين [[SystemClock]] (بيرجع [[datetime.now(UTC)]]) و [[FixedClock(at)]] (بيرجع وقت ثابت)، ودالة [[is_expired(expires_at, clock)]]. اختبر الحد: قبل الموعد بثانية، وعند الموعد بالظبط. وشغّل [[mypy --strict]] على الملف.`,
          sol: R`المتوقع: قبل الموعد بثانية [[False]]، وعند الموعد بالظبط [[True]] (لأن الشرط [[>=]])، و [[SystemClock]] بيرجع [[False]] لحد 1 أكتوبر 2026 و [[True]] بعدها. و [[mypy --strict]] مبيطلعش أخطاء، مع إن ولا class ورث من [[Clock]].

الفكرة إن الوقت بقى dependency بتتبعت، فالاختبار بيحط الوقت اللي هو عايزه بدل ما يستنى أو يعمل mock لـ [[datetime]]. ولو غيّرت [[FixedClock.now]] ترجع [[str]]، mypy هيرفض النداء ([[incompatible type "FixedClock"; expected "Clock"]]) وده الفحص اللي الـ Protocol بيدّيهولك. الغلطة الشائعة: [[datetime(2026, 10, 1)]] من غير [[tzinfo]]، فالمقارنة مع [[datetime.now(UTC)]] ترمي [[TypeError: can't compare offset-naive and offset-aware datetimes]] (درس «datetime و zoneinfo»).`,
          solCode: R`from datetime import UTC, datetime
from typing import Protocol
class Clock(Protocol):
    def now(self) -> datetime: ...
class SystemClock:
    def now(self) -> datetime:
        return datetime.now(UTC)
class FixedClock:
    def __init__(self, at: datetime) -> None:
        self.at = at
    def now(self) -> datetime:
        return self.at
def is_expired(expires_at: datetime, clock: Clock) -> bool:
    return clock.now() >= expires_at
deadline = datetime(2026, 10, 1, tzinfo=UTC)
print(is_expired(deadline, FixedClock(datetime(2026, 9, 30, 23, 59, 59, tzinfo=UTC))))
print(is_expired(deadline, FixedClock(deadline)))
print(is_expired(deadline, SystemClock()))`,
          flag: "script",
          practice: [
            { lvl: 'سريع', t: R`**مراجعة:** من الذاكرة املا جدول ٤ صفوف للـ [[ABC]] و [[Protocol]]: لازم وراثة؟ مين بيفحص وإمتى؟ فيه كود مشترك؟ مثال من الشغل لكل واحد.`, done: R`الجدول بيقول: ABC وراثة وفحص من Python وقت إنشاء الـ object وفيه كود مشترك، و Protocol من غير وراثة والفحص من mypy قبل التشغيل وشكل بس، ومثالين حقيقيين (Storage و Sender مثلًا).` },
            { lvl: 'سريع', t: R`**اقرا وتوقّع:** [[class Base(ABC)]] فيها [[@abstractmethod def a(self)]] و [[@abstractmethod def b(self)]]، و [[class Half(Base)]] كاتبة [[a]] بس. توقّع: [[Half()]] بيعمل إيه؟ ورسالته بالظبط؟ وإيه اللي بيحصل لو [[class Base]] من غير [[(ABC)]]؟`, done: R`[[Half()]] بترمي [[TypeError]] فيها [[abstract method 'b']]، ومن غير [[ABC]] الـ object بيتعمل عادي ومفيش أي فحص (جرّبت الاتنين).` },
            { lvl: 'تطبيق', t: R`**صلّح:** [[class SmsSender]] فيها [[def send(self, phone: str) -> None]] (باراميتر واحد)، واتبعتت لـ [[notify_shipped]]. شغّل الكود: بيشتغل ولا لأ؟ وبعدين شغّل [[mypy]] عليه، وصلّح الـ signature.`, done: R`وقت التشغيل بيرمي [[TypeError: SmsSender.send() takes 2 positional arguments but 3 were given]] بس لما النداء يحصل، و mypy قبل التشغيل طلّع [[incompatible type "SmsSender"; expected "Sender"]]، وبعد التصليح mypy بيقول [[Success]].` },
            { lvl: 'تطبيق', t: R`**ابني:** [[DiskStorage(Storage)]] بتكتب كل key كملف جوه فولدر بـ [[pathlib]] ([[write_bytes]])، وزوّد على [[Storage]] abstract method [[load(key) -> bytes]] وكمّلها في الاتنين. ارفض أي key فيه [[..]] أو [[/]] بـ [[ValueError]].`, done: R`[[save_text("a.txt", "أهلًا")]] ثم [[load("a.txt").decode()]] بيرجّع [[أهلًا]] في الاتنين، و [[MemoryStorage]] القديمة من غير [[load]] بقت ترمي [[TypeError]] عند الإنشاء (وده المقصود)، و [[save("../x", b"")]] بترمي ومفيش ملف اتعمل برّه الفولدر.` },
            { lvl: 'تطبيق', t: R`**اكتب اختبار:** لـ [[notify_shipped]]، اكتب ٣ اختبارات pytest بـ [[FakeSender]]: الرسالة اتبعتت مرة واحدة، وللعنوان الصح، وبالنص الصح. ومن غير ما تستخدم [[unittest.mock]].`, done: R`[[pytest -q]] بيقول [[3 passed]]، ومفيش ولا [[print]] اتطبع (الإيميل الحقيقي متناداش)، ولو غيّرت النص في [[notify_shipped]] اختبار واحد بس بيقع.` },
            { lvl: 'تحدي', t: R`**مسألة Generics:** [[class Page[T]]] dataclass فيها [[items: list[T]]] و [[total]] و [[page]] و [[size]]، و [[paginate[T](items: list[T], page: int, size: int) -> Page[T]]]. حالات طرفية: صفحة بعد الآخر، وصفحة صفر أو سالبة، و size صفر.`, done: R`[[paginate(list(range(25)), 3, 10).items]] بـ [[[20, 21, 22, 23, 24]]]، والصفحة ٤ items فاضية و total لسه ٢٥، و page صفر أو size صفر بيرموا [[ValueError]]، و [[mypy --strict]] بيقول [[Success]] ونوع [[.items]] في المحرر [[list[int]]].` },
          ],
          deep: {
            why: R`الكود اللي بيعتمد على شكل مش على class معين سهل تختبره (تبعت fake) وسهل تغيّر الـ implementation (S3 بدل ملفات محلية). وده نفس مبدأ الـ dependency injection اللي FastAPI مبني عليه ([[Depends]]، المستوى ٢)، ونفس اللي في تاب «هندسة البرمجيات».`,
            how: R`[[ABC]]: [[class Storage(ABC)]] و [[@abstractmethod]] على الـ methods الإجبارية. محاولة [[Storage()]] أو ابن ناقص method بترمي [[TypeError: Can't instantiate abstract class]] وقت التشغيل. والـ ABC ينفع يبقى فيه methods عادية مشتركة ([[save_text]] بتستخدم [[save]])، ودي ميزته.

[[Protocol]]: مفيش وراثة. الـ type checker بيقارن الـ methods والـ signatures، فـ [[SmsSender]] فيها [[send(self, phone)]] بس هيترفض: mypy بيطلّع [[Argument 1 to "notify_shipped" has incompatible type "SmsSender"; expected "Sender"]] ويوريك الـ signature المتوقع واللي لقاه. ووقت التشغيل Python مبيفحصش حاجة.

[[@runtime_checkable]] بيخلي [[isinstance(x, Sender)]] يشتغل، بس بيفحص إن الـ method موجودة بالاسم بس، مش الـ signature، فمتعتمدش عليه كـ validation.

[[...]] (Ellipsis) كجسم للـ method معناه «مفيش implementation هنا». وده نفس الـ duck typing اللي Python طول عمره عليه، بس بقى ليه نوع يفحصه المحرر.`,
            when: R`Protocol للحدود بين الأجزاء (sender، storage، clock، repository)، خصوصًا لما الـ implementations في مكتبات مش بتاعتك ومش هتورث من class بتاعك. و ABC لما عايز تفرض الوراثة وقت التشغيل أو تشارك كود بين الأبناء. ومتعملش أي واحد منهم لو عندك implementation واحد ومفيش fake: دالة أو class عادي كفاية.`,
            mistakes: R`Protocol وتفتكر إن Python هيفحصه وقت التشغيل (مش هيفحص، شغّل mypy أو pyright). و [[runtime_checkable]] كـ validation للـ signature. و interface لكل class «احتياطي» (تاب «هندسة البرمجيات» فيه درس عن ده). و ABC ترث منه وتنسى [[@abstractmethod]] فمفيش أي فحص.`
          },
          teach: R`## المثال بيعمل إيه؟

طريقتين تقول بيهم «أنا محتاج أي حاجة بتعرف تعمل كذا»: [[ABC]] لـ [[Storage]] (تخزين) بيجبر الأبناء يكتبوا [[save]]، و [[Protocol]] لـ [[Sender]] (مُرسل) بيوصف الشكل بس، وأي class فيه [[send]] بنفس الشكل يطابق من غير ما يورث. اتشغّل بـ Python 3.14 على ويندوز و 3.13 على لينكس ([[python:3.13-slim]] في Docker)، و mypy 2.4.0 اتشغّل جوه نفس الـ container (اتسطّب فيه بـ [[pip install mypy]] واتمسح معاه).

| | [[ABC]] | [[Protocol]] |
|---|---|---|
| لازم ترث منه؟ | آه | لأ |
| مين بيفحص؟ | Python وقت التشغيل | mypy أو pyright (المحرر) |
| فيه كود مشترك؟ | ممكن | لأ، شكل بس |

> آخر سطر ([[Storage()]]) بيرمي [[TypeError]] بالقصد، وهو آخر سطر.

---

## ١. الـ imports و [[type]]

~~~python
from abc import ABC, abstractmethod
from typing import Protocol, runtime_checkable
type Message = tuple[str, str]
~~~

- [[abc]] اختصار Abstract Base Classes. [[ABC]] الـ class اللي بنورث منه، و [[abstractmethod]] decorator بيعلّم method إنها «لازم الابن يكتبها».
- [[type Message = tuple[str, str]]] (من 3.12): بيعمل **اسم لنوع**. [[Message]] بقى معناه «tuple فيه نصين» (لمين، والنص). ده للقراية والـ type checker بس، و [[print(Message)]] بيطبع [[Message]].

---

## ٢. [[ABC]]: class أساسي إجباري

~~~python
class Storage(ABC):
    @abstractmethod
    def save(self, key: str, data: bytes) -> None: ...
    def save_text(self, key: str, text: str) -> None:
        self.save(key, text.encode("utf-8"))
~~~

- [[class Storage(ABC):]]: ورث من [[ABC]]، فبقى abstract class.
- [[@abstractmethod]] فوق [[save]]: أي ابن **لازم** يكتب [[save]]، وإلا Python يرفض يعمل منه object.
- [[...]] (اسمها Ellipsis، ٣ نقط): جسم فاضي، معناها «مفيش كود هنا».
- [[data: bytes]]: [[bytes]] بايتات خام، مش نص.
- [[save_text]]: method **عادية** فيها كود، والأبناء بياخدوها جاهزة. بتحوّل النص لـ bytes بـ [[.encode("utf-8")]] وتنادي [[save]] اللي الابن هيكتبها. دي ميزة الـ ABC على الـ Protocol: كود مشترك.

### الابن

~~~python
class MemoryStorage(Storage):
    def __init__(self) -> None:
        self.files: dict[str, bytes] = {}
    def save(self, key: str, data: bytes) -> None:
        self.files[key] = data
~~~

- [[self.files: dict[str, bytes] = {}]]: dict فاضي، والنوع مكتوب عليه: مفتاحه نص وقيمته bytes.
- [[save]] اتكتبت، فالـ class كامل.

~~~python
store = MemoryStorage()
store.save_text("a.txt", "أهلًا")
print(store.files)
~~~

~~~text الناتج
{'a.txt': b'\xd8\xa3\xd9\x87\xd9\x84\xd9\x8b\xd8\xa7'}
~~~

[[b'...']] معناها bytes، و [[\xd8]] كل واحدة بايت مكتوب بالـ hex. «أهلًا» ٥ حروف بقت ١٠ بايت، لأن كل حرف عربي في UTF-8 بياخد بايتين.

### الـ abstract مبيتعملش منه object

~~~python
Storage()
~~~

~~~text الناتج
TypeError: Can't instantiate abstract class Storage without an implementation for abstract method 'save'
~~~

ونفس الخطأ لابن نسي [[save]] (اتجرّب على [[class Half(Storage): pass]]): [[Can't instantiate abstract class Half without an implementation for abstract method 'save']]. والخطأ بيحصل **وقت التشغيل**، لما تحاول تعمل الـ object.

---

## ٣. [[Protocol]]: الشكل بس

~~~python
@runtime_checkable
class Sender(Protocol):
    def send(self, to: str, text: str) -> None: ...
~~~

- [[class Sender(Protocol):]]: مش class هيتورث منه، ده **وصف**: «أي حاجة فيها [[send(to: str, text: str)]]». الفكرة اسمها structural typing: الشكل هو اللي بيحدد، مش الوراثة (زي interface في TypeScript).
- [[@runtime_checkable]]: بيسمح بـ [[isinstance(x, Sender)]] وقت التشغيل (من غيره [[isinstance]] بترمي [[TypeError]]).

### classين مش وارثين من حاجة

~~~python
class EmailSender:
    def send(self, to: str, text: str) -> None:
        print("email to", to, ":", text)
class FakeSender:
    def __init__(self) -> None:
        self.sent: list[Message] = []
    def send(self, to: str, text: str) -> None:
        self.sent.append((to, text))
~~~

- [[EmailSender]]: بيطبع بدل ما يبعت إيميل حقيقي (مثال).
- [[FakeSender]]: **fake** للاختبار: بيحفظ اللي «اتبعت» في list بدل ما يبعته، فالاختبار يقدر يتأكد منه. [[list[Message]]] = list فيها tuples. و [[(to, text)]] بين قوسين tuple واحد.

### الدالة بتطلب الشكل

~~~python
def notify_shipped(sender: Sender, to: str) -> None:
    sender.send(to, "طلبك اتشحن")
~~~

[[sender: Sender]]: الدالة مش فارق معاها إيميل ولا SMS ولا fake، المهم فيه [[send]].

~~~python
notify_shipped(EmailSender(), "sara@example.com")
fake = FakeSender()
notify_shipped(fake, "omar@example.com")
print(fake.sent, isinstance(fake, Sender))
~~~

~~~text الناتج
email to sara@example.com : طلبك اتشحن
[('omar@example.com', 'طلبك اتشحن')] True
~~~

نفس الدالة اشتغلت مع الاتنين من غير أي تغيير. و [[isinstance]] قالت [[True]] مع إن [[FakeSender]] مش وارث من [[Sender]].

### [[runtime_checkable]] بيفحص الاسم بس

~~~text الناتج: isinstance لـ class فيه send(self, phone)، وبعدين لـ object()
True False
~~~

الأول [[True]] رغم إن الـ signature غلط: [[isinstance]] بتسأل «فيه method اسمها [[send]]؟» وبس. الفحص الحقيقي شغل mypy:

~~~text الناتج: mypy على SmsSender فيه send(self, phone: str)
sms_bad.py:8: error: Argument 1 to "notify_shipped" has incompatible type "SmsSender"; expected "Sender"  [arg-type]
sms_bad.py:8: note: Following member(s) of "SmsSender" have conflicts:
sms_bad.py:8: note:     Expected:
sms_bad.py:8: note:         def send(self, to: str, text: str) -> None
sms_bad.py:8: note:     Got:
sms_bad.py:8: note:         def send(self, phone: str) -> None
~~~

ونفس الـ mypy على المثال نفسه مسك [[Storage()]] قبل التشغيل: [[l12_ex.py:34: error: Cannot instantiate abstract class "Storage" with abstract attribute "save"  [abstract] ]].

---

## ٤. الحل: [[Clock]]

~~~python solCode
class Clock(Protocol):
    def now(self) -> datetime: ...
class SystemClock:
    def now(self) -> datetime:
        return datetime.now(UTC)
class FixedClock:
    def __init__(self, at: datetime) -> None:
        self.at = at
    def now(self) -> datetime:
        return self.at
def is_expired(expires_at: datetime, clock: Clock) -> bool:
    return clock.now() >= expires_at
~~~

- الوقت بقى **باراميتر** ([[clock]]) بدل ما الدالة تنادي [[datetime.now()]] جواها. في الإنتاج تبعت [[SystemClock()]]، وفي الاختبار [[FixedClock(...)]] بالوقت اللي انت عايزه.
- [[>=]]: «عدّى أو وصل للموعد».

~~~python solCode
deadline = datetime(2026, 10, 1, tzinfo=UTC)
print(is_expired(deadline, FixedClock(datetime(2026, 9, 30, 23, 59, 59, tzinfo=UTC))))
print(is_expired(deadline, FixedClock(deadline)))
print(is_expired(deadline, SystemClock()))
~~~

[[datetime(سنة, شهر, يوم, ساعة, دقيقة, ثانية, tzinfo=UTC)]]. و [[tzinfo=UTC]] ضروري: من غيره الوقت «naive» (مش عارف منطقته)، والمقارنة مع [[datetime.now(UTC)]] بترمي:

~~~text الناتج
TypeError: can't compare offset-naive and offset-aware datetimes
~~~

~~~text الناتج (اتشغّل يوم 7 أكتوبر 2026)
False
True
True
~~~

قبل الموعد بثانية [[False]]، وعند الموعد بالظبط [[True]] بسبب [[>=]]، والساعة الحقيقية بعد 1 أكتوبر فـ [[True]] (قبل 1 أكتوبر كانت هتبقى [[False]]). و [[mypy --strict]] على الحل قال [[Success: no issues found in 1 source file]] مع إن ولا class ورث من [[Clock]]. ولو [[FixedClock.now]] رجّعت [[str]]:

~~~text الناتج: mypy --strict
clock_bad.py:10: error: Argument 2 to "is_expired" has incompatible type "FixedClock"; expected "Clock"  [arg-type]
~~~

---

## ٥. Generics: class واحد لكل الأنواع ([[class Repo[T]]])

[[Repo]] بيخزّن منتجات، وبعدين محتاج واحد لليوزرز، وواحد للطلبات. بدل ٣ classes بنفس الكود، بتعمل class واحد **بنوع متغير** [[T]] (Python 3.12+):

~~~python
from typing import Protocol
class Repo[T]:
    def __init__(self) -> None:
        self._items: dict[int, T] = {}
    def add(self, id: int, item: T) -> None:
        self._items[id] = item
    def get(self, id: int) -> T | None:
        return self._items.get(id)
def first[T](items: list[T]) -> T:
    return items[0]
class HasPrice(Protocol):
    price: float
def cheapest[P: HasPrice](items: list[P]) -> P:
    return min(items, key=lambda x: x.price)
class Item:
    def __init__(self, n, p): self.name, self.price = n, p
r = Repo[str]()
r.add(1, "tea")
print(r.get(1), r.get(2), first([3, 4]), cheapest([Item("a", 5), Item("b", 2)]).name)
print(Repo.__type_params__)
~~~

~~~text الناتج (Python 3.14)
tea None 3 b
(T,)
~~~

- [[class Repo[T]:]] الأقواس المربعة بعد الاسم بتعرّف «type parameter» اسمه [[T]]. جوه الـ class، [[T]] معناها «النوع اللي اليوزر هيختاره». و [[Repo[str]()]] بتقول «Repo للنصوص».
- [[def first[T](items: list[T]) -> T]] نفس الفكرة على دالة: اللي داخل list من نوع، واللي راجع من **نفس** النوع. فـ mypy عارف إن [[first([3, 4])]] [[int]].
- [[[P: HasPrice]]] = «أي نوع بشرط يطابق [[HasPrice]]» (bound). Protocol فيه **خانة** [[price]] مش method، وده شغال برضه.
- وقت التشغيل مفيش فحص: [[Repo[str]().add(1, 5)]] بتعدّي. اللي بيمسكها mypy:

~~~text الناتج: mypy 2.4 على x = Repo[str](); x.add(5)
error: Argument 1 to "add" of "Repo" has incompatible type "int"; expected "str"  [arg-type]
~~~

- قبل 3.12 كنت بتكتب [[T = TypeVar("T")]] و [[class Repo(Generic[T]):]]. هتلاقيها في كود قديم ومكتبات كتير، ومعناها نفس الحاجة بالظبط.

## الخلاصة

- [[ABC]] + [[@abstractmethod]]: لازم ترث، و Python بيرفض الـ object الناقص وقت التشغيل، وتقدر تحط كود مشترك.
- [[Protocol]]: شكل بس، من غير وراثة، والفحص من mypy أو pyright مش من Python.
- [[@runtime_checkable]] بيخلّي [[isinstance]] تشتغل بس بتفحص الأسماء، مش الـ signatures.
- الحاجات اللي بتتغير بين الإنتاج والاختبار (وقت، إرسال، تخزين) ابعتها كباراميتر نوعه Protocol.`,
          lines: [
            R`[[ABC]] (Abstract Base Class) class بتورث منه عشان تقول «ده أساس مش معمول يتعمل منه object»، و [[abstractmethod]] decorator بيعلّم الـ methods اللي **لازم** كل ابن يكتبها. الاتنين من موديول [[abc]] في المكتبة القياسية.`,
            R`[[Protocol]] من [[typing]] بيوصف «شكل» (methods بأنواعها) من غير وراثة، و [[runtime_checkable]] decorator بيخلي [[isinstance]] يشتغل معاه وقت التشغيل (فحص أسامي بس، تحت).`,
            R`[[type Message = tuple[str, str]]] (Python 3.12+) بيدّي اسم لنوع: الرسالة tuple من نصين (لمين، النص). الاسم بيخلي الـ hints أقصر وأوضح (بتكتب [[list[Message]]] بدل ما تكرر الـ tuple كاملة) ومبيعملش أي حاجة وقت التشغيل.`,
            R`[[class Storage(ABC):]] الأساس اللي كل أنواع التخزين (ميموري، ديسك، S3) بتورث منه. الوراثة من [[ABC]] هي اللي بتفعّل فحص الـ abstract methods؛ من غيرها [[@abstractmethod]] مبيعملش أي حاجة.`,
            R`[[@abstractmethod]] على [[save]] معناها «أي ابن لازم يكتب [[save]] بتاعته». لو ابن نسيها، Python بيرفض يعمل object من الابن ده بـ [[TypeError]] ساعة الإنشاء، مش بعدين ساعة ما حد ينادي [[save]].`,
            R`[[...]] (Ellipsis) مكان الجسم: «مفيش كود هنا، ده توصيف بس». الـ signature نفسه ([[key: str, data: bytes]] و [[-> None]]) هو العقد اللي الأبناء لازم يمشوا عليه.`,
            R`[[save_text]] method **عادية** (مش abstract) جوه الـ ABC: كود مشترك كل الأبناء بياخدوه ببلاش. ده الفرق الأساسي عن [[Protocol]] اللي مفيهوش كود مشترك.`,
            R`[[text.encode("utf-8")]] بيحوّل النص لـ bytes، وبعدين بينادي [[self.save]]، يعني الـ method اللي **الابن** كاتبها. الأب بيستخدم حاجة لسه متكتبتش، والابن هو اللي بيكمّلها (template method pattern).`,
            R`[[class MemoryStorage(Storage):]] ابن بيخزّن في الذاكرة، مفيد في الاختبارات. لازم يكتب [[save]] عشان يبقى «concrete» (ينفع يتعمل منه object).`,
            R`[[__init__]] بتاع الابن، و [[-> None]] لأن [[__init__]] دايمًا بترجّع [[None]]. الأب مفيهوش [[__init__]]، فمش محتاجين [[super().__init__()]] هنا.`,
            R`[[self.files: dict[str, bytes] = {}]] dict من اسم الملف لمحتواه كـ bytes. الـ annotation على الخانة بتقول لـ mypy نوع المفاتيح والقيم، فلو حد حط [[str]] بدل [[bytes]] mypy هيعترض.`,
            R`كتب [[save]] بنفس الـ signature بالظبط بتاع الأب. ده اللي بيشيل [[MemoryStorage]] من قايمة «abstract»، و [[MemoryStorage.__abstractmethods__]] بقت [[frozenset()]] فاضية.`,
            R`[[self.files[key] = data]] بيخزّن المحتوى تحت الاسم، ولو الاسم موجود بيكتب فوقه. في تخزين حقيقي (ديسك أو S3) السطر ده كان هيبقى كتابة ملف.`,
            R`[[MemoryStorage()]] شغال لأن كل الـ abstract methods اتكتبت. وده بيتحقق **وقت الإنشاء**: Python بيبص على [[__abstractmethods__]] وهو بيعمل الـ object.`,
            R`[[save_text]] متعرّفة في الأب، بس جواها [[self.save]] بتنادي نسخة [[MemoryStorage]]، لأن [[self]] هو object الابن. النص العربي بيتحوّل لـ bytes بـ UTF-8.`,
            R`بيطبع [[{'a.txt': b'\xd8\xa3...'}]]: [[b'...']] معناها bytes، وكل حرف عربي بقى ٢ bytes في UTF-8 (فـ «أهلًا» بقت ١٠ bytes)، و [[\x..]] الشكل اللي Python بيطبع بيه bytes مش ASCII.`,
            R`[[@runtime_checkable]] من غيره [[isinstance(x, Sender)]] بترمي [[TypeError: Instance and class checks can only be used with @runtime_checkable protocols]]. ومعاه بيفحص إن الأسامي موجودة بس، مش الأنواع ولا عدد الباراميترات.`,
            R`[[class Sender(Protocol):]] بيوصف أي حاجة «بتعرف تبعت رسالة». محدش لازم يورث منه؛ أي class فيه [[send]] بالشكل ده بيطابق (structural typing، زي interface في TypeScript أو Go).`,
            R`الـ signature هو الشكل المطلوب: [[send(to: str, text: str) -> None]]. mypy بيقارن ده بالـ class اللي اتبعت، ولو الباراميترات أو الأنواع مختلفة بيطلّع [[incompatible type]].`,
            R`[[EmailSender]] class عادي **مش** وارث من [[Sender]] ولا عارف إنه موجود. ده المهم: مكتبة خارجية أو كود قديم ممكن يطابق Protocol بتاعك من غير ما تلمسه.`,
            R`[[send]] بنفس الأسامي والأنواع ونوع الرجوع، فـ mypy بيعتبره [[Sender]]. لو كان اسمها [[send_email]] أو بتاخد باراميتر واحد، mypy كان هيرفض النداء تحت.`,
            R`بيطبع بدل ما يبعت فعلًا، عشان المثال يشتغل من غير سيرفر إيميل. في كود حقيقي هنا كان هيبقى [[smtplib]] أو API لخدمة إيميل.`,
            R`[[FakeSender]] fake للاختبارات: نفس الشكل، بس بيحفظ اللي «اتبعت» بدل ما يبعته. ومش وارث من حاجة برضه.`,
            R`[[__init__]] بيجهّز مكان يتسجّل فيه اللي اتبعت. مفيش باراميترات، فـ [[FakeSender()]] كفاية.`,
            R`[[self.sent: list[Message] = []]] list فاضية من نوع [[Message]] اللي عرّفناه فوق. الاختبار بعدين يسأل [[fake.sent]] «اتبعت إيه ولمين؟» من غير ما يبعت حاجة حقيقية.`,
            R`[[send]] بنفس الـ signature بالظبط بتاع [[Sender]]، وده كل اللي mypy محتاجه عشان يقبل [[FakeSender]] مكان [[Sender]].`,
            R`[[append((to, text))]] بيضيف tuple (القوسين الجوانيين هما الـ tuple). بدل ما يطبع أو يبعت، بيسجّل عشان الاختبار يتأكد.`,
            R`[[sender: Sender]] الدالة بتطلب **شكل** مش class معين، فهي مش مربوطة بالإيميل ولا بـ SMS. وده اللي بيخليها قابلة للاختبار من غير mock.`,
            R`بتنادي [[sender.send]] وخلاص، من غير [[if isinstance(sender, EmailSender)]]. أي نوع جديد (SMS، واتساب) بيشتغل من غير ما تغيّر الدالة دي.`,
            R`[[EmailSender()]] بيتبعت مكان [[Sender]] وبيطبع [[email to sara@example.com : طلبك اتشحن]]. (الـ [[:]] متطبعة بمسافات حواليها لأن [[print]] بيفصل بمسافة بين كل قيمة.)`,
            R`[[FakeSender()]] object جديد [[sent]] بتاعه فاضي، هنبعته لنفس الدالة بالظبط.`,
            R`نفس [[notify_shipped]] من غير ولا تغيير، بس المرة دي مفيش حاجة اتبعتت فعلًا؛ اتسجّلت في [[fake.sent]].`,
            R`[[fake.sent]] بقت [[[('omar@example.com', 'طلبك اتشحن')]]]، و [[isinstance(fake, Sender)]] بـ [[True]] بفضل [[runtime_checkable]] (لأن فيه method اسمها [[send]]، مش لأنه فحص الأنواع).`,
            R`[[Storage()]] مباشرة بيرمي [[TypeError: Can't instantiate abstract class Storage without an implementation for abstract method 'save']] (نص 3.12+). Python بيرفض يعمل object من class فيه abstract methods لسه مكتوبتش.`,
          ]
        }
      ]
    }
]);

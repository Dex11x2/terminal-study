// تكملة تاب pyapi: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pyapi/01.js (شرح حقول الدرس في أوله)
MORE("pyapi", [
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
          teach: R`## المثال بيعمل إيه؟

بيعرّف موديل عميل [[Customer]] فيه قيود على كل حقل (طول، regex، قيم محددة، تاريخ، رقم في مدى، وموديل جوه موديل). وبعدين بيعمل منه object بداتا سليمة (فيتحوّل ويتنضّف)، ومرة بداتا غلط (فيترمي [[ValidationError]] فيه ٤ أخطاء). اتشغّل بـ Pydantic 2.13 و Python 3.14 على ويندوز ([[python main.py]]).

---

## ١. الـ imports

~~~python
from datetime import date
from typing import Annotated, Literal
from pydantic import BaseModel, ConfigDict, Field, ValidationError
~~~

| الاسم | بيعمل إيه |
|---|---|
| [[date]] | نوع التاريخ (يوم وشهر وسنة) |
| [[Annotated]] | نوع + معلومات زيادة |
| [[Literal]] | قيم محددة بس |
| [[BaseModel]] | الأب اللي أي موديل بيورث منه |
| [[ConfigDict]] | إعدادات الموديل |
| [[Field]] | قيود و default لحقل |
| [[ValidationError]] | الخطأ اللي بيترمي لو الداتا غلط |

---

## ٢. نوع بقيوده: [[Price]]

~~~python
Price = Annotated[float, Field(gt=0, le=1_000_000)]
~~~

[[Price]] مش موديل، ده **اسم لنوع**: float أكبر من صفر ([[gt]]) وأقل من أو يساوي مليون ([[le]]). تكتبه مرة وتستخدمه في أي موديل.

## ٣. موديل صغير: [[Address]]

~~~python
class Address(BaseModel):
    city: str
    street: str | None = None
~~~

- [[city: str]] من غير [[=]]: **إجباري**.
- [[street: str | None = None]]: نص أو None، والـ default None، يعني اختياري.

---

## ٤. الموديل الأساسي: [[Customer]]

~~~python
class Customer(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True)
    name: str = Field(min_length=2)
    phone: str = Field(pattern=r"^01[0125]\d{8}$")
    tier: Literal["free", "pro"] = "free"
    birthday: date | None = None
    budget: Price = 100
    address: Address
~~~

### [[model_config]]

اسم محجوز: إعدادات الموديل كله، مش حقل.

- [[extra="forbid"]]: أي حقل زيادة مش متعرّف = خطأ. (الافتراضي [[ignore]]: بيتشال بهدوء.)
- [[str_strip_whitespace=True]]: شيل المسافات من أول وآخر أي string.

### الحقول

| الحقل | القيد | يعني |
|---|---|---|
| [[name]] | [[min_length=2]] | حرفين على الأقل، **بعد** شيل المسافات |
| [[phone]] | [[pattern=r"..."]] | لازم يطابق الـ regex |
| [[tier]] | [[Literal["free", "pro"]]] | واحدة من الاتنين، والافتراضي free |
| [[birthday]] | [[date | None]] | تاريخ أو مفيش |
| [[budget]] | [[Price]] | النوع اللي عملناه، والافتراضي 100 |
| [[address]] | [[Address]] | موديل جوه موديل، إجباري |

### الـ regex بتاع الموبايل

[[r"..."]] raw string: الـ [[\]] تفضل زي ما هي. والـ pattern [[^01[0125]\d{8}$]]:

| الحتة | معناها |
|---|---|
| [[^]] | أول النص |
| [[01]] | يبدأ بـ 01 |
| [[[0125]]] | رقم واحد من دول (فودافون واتصالات وأورانج ووي) |
| [[\d{8}]] | ٨ أرقام |
| [[$]] | آخر النص (مفيش حاجة زيادة) |

---

## ٥. داتا سليمة

~~~python
c = Customer(name="  Sara ", phone="01012345678", birthday="1999-05-01", address={"city": "Cairo"})
print(c.name, c.birthday.year, c.address.city)
~~~

~~~text الناتج
Sara 1999 Cairo
~~~

اللي حصل وقت الإنشاء:

- [["  Sara "]] اتنضّفت [[Sara]] ([[str_strip_whitespace]]).
- [["1999-05-01"]] string اتحوّل [[date]] حقيقي، فـ [[.year]] اشتغلت. ده الوضع العادي (lax): بيحوّل اللي ليه معنى.
- [[{"city": "Cairo"}]] dict اتحوّل object من [[Address]]، فـ [[c.address.city]] اشتغلت.

> لاحظ: [[c.budget]] طلع [[100]] (int) مش [[100.0]]. Pydantic **مبيفحصش الـ defaults** افتراضيًا، فالقيمة بتفضل زي ما كتبتها. لو بعتّ [[budget="50"]] بيتحوّل [[50.0]] لأنه اتفحص.

---

## ٦. داتا غلط

~~~python
try:
    Customer(name="S", phone="123", address={}, role="admin")
except ValidationError as e:
    print(e.error_count())
    print(e.errors()[0]["loc"], e.errors()[0]["msg"])
~~~

~~~text الناتج
4
('name',) String should have at least 2 characters
~~~

- [[e.error_count()]] عدد الأخطاء.
- [[e.errors()]] list فيها كل خطأ كـ dict، و [[[0]]] أولهم.

ولو طبعت [[e.errors()]] كلها (التجربة):

~~~text الناتج
{'type': 'string_too_short', 'loc': ('name',), 'msg': 'String should have at least 2 characters', 'input': 'S', 'ctx': {'min_length': 2}, 'url': '...'}
{'type': 'string_pattern_mismatch', 'loc': ('phone',), 'msg': "String should match pattern '^01[0125]\\d{8}$'", 'input': '123', ...}
{'type': 'missing', 'loc': ('address', 'city'), 'msg': 'Field required', 'input': {}, ...}
{'type': 'extra_forbidden', 'loc': ('role',), 'msg': 'Extra inputs are not permitted', 'input': 'admin', ...}
~~~

| الخانة | معناها |
|---|---|
| [[type]] | كود ثابت للخطأ (للكود: ترجمة الرسايل مثلًا) |
| [[loc]] | المكان: [[('address', 'city')]] يعني جوه address، حقل city |
| [[msg]] | رسالة للبني آدمين |
| [[input]] | القيمة اللي اتبعتت |
| [[ctx]] | تفاصيل القيد |

Pydantic **مبيقفش عند أول خطأ**: بيجمعهم كلهم. و [[print(e)]] نفسه بيطبعهم بشكل مقروء (أول سطر [[4 validation errors for Customer]]).

---

## ٧. [[model_json_schema()]]

~~~python
Customer.model_json_schema()
~~~

~~~text الناتج (مختصر)
"required": ["name", "phone", "address"]
"additionalProperties": false
"phone":  {"pattern": "^01[0125]\\d{8}$", "type": "string"}
"tier":   {"enum": ["free", "pro"], "default": "free"}
"budget": {"exclusiveMinimum": 0, "maximum": 1000000, "default": 100, "type": "number"}
"address": {"$ref": "#/$defs/Address"}
~~~

نفس القيود، بس بلغة JSON Schema: [[gt]] بقت [[exclusiveMinimum]]، و [[le]] بقت [[maximum]]، و [[extra="forbid"]] بقت [[additionalProperties: false]]، و [[Address]] اتحط في [[$defs]]. ده اللي FastAPI بيعرضه في [[/docs]].

## ٨. [[strict=True]]

| | [[budget="50"]] |
|---|---|
| الوضع العادي (lax) | بيعدّي ويبقى [[50.0]] |
| [[ConfigDict(strict=True)]] | [[1 validation error ... Input should be a valid number [type=float_type, input_value='50', input_type=str]]] |

---

## الخلاصة

- الموديل = class بيورث [[BaseModel]]، والحقول = type hints.
- من غير default = إجباري، و [[X | None = None]] = اختياري.
- [[Field(...)]] للقيود، و [[Annotated[T, Field(...)]]] لنوع بقيوده تعيد استخدامه.
- [[ValidationError]] فيه **كل** الأخطاء، وكل واحد فيه [[loc]] و [[msg]] و [[type]].
- الـ extra الافتراضي [[ignore]] مش [[forbid]]، والـ defaults مبتتفحصش.`,
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
          ],
          sol: R`[[e.errors()]] فيها ٤ أخطاء، كل واحد dict فيه [[type]] و [[loc]] و [[msg]] (و [[input]] و [[url]]): [[string_too_short ('name',)]]، و [[string_pattern_mismatch ('phone',)]]، و [[missing ('address', 'city')]] (الـ loc بيوصل لجوه الموديل المتداخل)، و [[extra_forbidden ('role',)]] (بسبب [[extra="forbid"]]). والـ [[type]] ثابت ومناسب للكود (تترجم منه الرسائل مثلًا)، والـ [[msg]] للبني آدمين.

[[model_json_schema()]] بيرجع JSON Schema فيه [[required: ['name', 'phone', 'address']]]، و [[phone]] جواه [[pattern]]، و [[budget]] جواه [[exclusiveMinimum: 0]] و [[maximum: 1000000]]، و [[Address]] في [[$defs]]. و [[budget="50"]] بيعدّي ويبقى [[50.0]] (float)، لكن مع [[strict=True]] بيترفض: [[float_type]] و [[Input should be a valid number]]. الـ strict مفيد لما البيانات جاية من كود تاني مش من JSON أو فورم.`
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
          teach: R`## المثال بيعمل إيه؟

بيعمل موديل [[Item]] ويحوّل بيه في كل اتجاه: من dict لموديل، ومن موديل لـ dict ولـ JSON، ومن JSON string لموديل، ونسخة معدّلة، وليستة موديلات مرة واحدة، ومن object عادي (زي صف ORM) لموديل. اتشغّل بـ Pydantic 2.13 و Python 3.14 على ويندوز، وضفنا [[print]] بعد كل خطوة.

---

## ١. الموديل

~~~python
from datetime import datetime
from pydantic import BaseModel, ConfigDict, TypeAdapter
class Item(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    note: str | None = None
    created_at: datetime
~~~

- [[from_attributes=True]]: اسمح للموديل يتبني من أي object عنده attributes بنفس الأسماء (مش dict بس). هنحتاجها في آخر خطوة.
- [[note]] اختياري، و [[created_at]] من نوع [[datetime]] (تاريخ ووقت).
- [[TypeAdapter]] للخطوة ٧.

---

## ٢. [[model_validate]]: من dict لموديل

~~~python
item = Item.model_validate({"id": 1, "name": "Tea", "created_at": "2026-01-10T09:00:00Z"})
~~~

نفس [[Item(**data)]]، بس بياخد الـ dict كما هو. بيفحص ويحوّل:

~~~text الناتج (repr(item))
Item(id=1, name='Tea', note=None, created_at=datetime.datetime(2026, 1, 10, 9, 0, tzinfo=TzInfo(0)))
~~~

[[2026-01-10T09:00:00Z]] صيغة ISO 8601: [[T]] بتفصل التاريخ عن الوقت، و [[Z]] يعني UTC، فبقت [[tzinfo=TzInfo(0)]] (فرق صفر عن UTC).

---

## ٣. [[model_dump]]: من موديل لـ dict

~~~python
print(item.model_dump())
print(item.model_dump(mode="json", exclude_none=True))
~~~

~~~text الناتج
{'id': 1, 'name': 'Tea', 'note': None, 'created_at': datetime.datetime(2026, 1, 10, 9, 0, tzinfo=TzInfo(0))}
{'id': 1, 'name': 'Tea', 'created_at': '2026-01-10T09:00:00Z'}
~~~

| الخيار | بيعمل إيه |
|---|---|
| (الافتراضي) [[mode="python"]] | الـ objects تفضل objects: [[created_at]] نوعه [[<class 'datetime.datetime'>]] |
| [[mode="json"]] | كل حاجة تبقى نوع JSON: [[created_at]] بقى [[<class 'str'>]] |
| [[exclude_none=True]] | شيل الحقول اللي قيمتها None ([[note]] اختفت) |

ليه ده مهم؟ جربنا [[json.dumps(item.model_dump())]]:

~~~text الناتج
TypeError: Object of type datetime is not JSON serializable
~~~

[[json]] بتاعة Python متعرفش datetime. فلو هتحفظ الـ dict كـ JSON (Redis مثلًا)، استخدم [[mode="json"]].

## ٤. [[model_dump_json]]: من موديل لـ JSON string

~~~python
print(item.model_dump_json(include={"id", "name"}))
~~~

~~~text الناتج
{"id":1,"name":"Tea"}
~~~

string جاهز يتبعت، ومتعمل جوه Rust (أسرع من [[json.dumps]]). و [[include={...}]] set بأسماء الحقول اللي عايزها بس (وعكسها [[exclude]]).

---

## ٥. [[model_validate_json]]: من JSON string لموديل

~~~python
raw = '{"id": 2, "name": "Coffee", "created_at": "2026-01-10T10:00:00Z"}'
item2 = Item.model_validate_json(raw)
~~~

~~~text الناتج
Item(id=2, name='Coffee', note=None, created_at=datetime.datetime(2026, 1, 10, 10, 0, tzinfo=TzInfo(0)))
~~~

بدل [[json.loads(raw)]] وبعدين [[model_validate]]: خطوة واحدة جوه Rust، أسرع وذاكرة أقل.

## ٦. [[model_copy]]: نسخة معدّلة

~~~python
renamed = item.model_copy(update={"name": "Green tea"})
~~~

~~~text الناتج
renamed: Green tea | original: Tea
~~~

الأصل متغيرش. بس خد بالك: [[update]] **مبيفحصش**. جربنا [[model_copy(update={"id": "not-a-number"})]] وعدّت، و [[id]] بقى [[not-a-number]] string. لو محتاج فحص: [[Item.model_validate({**item.model_dump(), "id": ...})]].

---

## ٧. [[TypeAdapter]]: فحص أي نوع

~~~python
items = TypeAdapter(list[Item]).validate_python([{"id": 3, "name": "Cake", "created_at": "2026-01-10T11:00:00Z"}])
~~~

[[model_validate]] موجودة على الموديلات بس. لو عايز تفحص [[list[Item]]] (أو [[dict[str, int]]] أو أي نوع)، [[TypeAdapter(النوع)]] بيدّيك [[validate_python]] و [[validate_json]] و [[dump_python]] و [[json_schema]].

~~~text الناتج
[Item(id=3, name='Cake', note=None, created_at=datetime.datetime(2026, 1, 10, 11, 0, tzinfo=TzInfo(0)))]
~~~

بناء الـ TypeAdapter مكلف، فاعمله مرة على مستوى الـ module، مش جوه دالة بتتنادى كتير.

---

## ٨. [[from_attributes]]: من object لموديل

~~~python
class Row:
    id, name, note, created_at = 4, "Juice", None, datetime(2026, 1, 1)
from_orm = Item.model_validate(Row())
~~~

[[Row]] class عادي، والسطر التاني بيعمل ٤ class attributes مرة واحدة. [[Row()]] object منه زي صف راجع من SQLAlchemy:

~~~text الناتج
Item(id=4, name='Juice', note=None, created_at=datetime.datetime(2026, 1, 1, 0, 0))
~~~

ومن غير [[from_attributes]] (التجربة):

~~~text الناتج
Input should be a valid dictionary or instance of Item [type=model_type, input_value=<__main__.Row object at 0x...>, input_type=Row]
~~~

---

## الجدول كله (ومقابله في v1)

| عايز | v2 | v1 القديم |
|---|---|---|
| dict → موديل | [[model_validate(d)]] | [[parse_obj]] |
| JSON → موديل | [[model_validate_json(s)]] | [[parse_raw]] |
| موديل → dict | [[model_dump()]] | [[.dict()]] |
| موديل → JSON | [[model_dump_json()]] | [[.json()]] |
| نسخة | [[model_copy(update=...)]] | [[.copy()]] |
| من ORM | [[from_attributes=True]] | [[orm_mode]] |
| أي نوع | [[TypeAdapter(T)]] | [[parse_obj_as]] |

## الخلاصة

- كل حاجة في v2 بتبدأ بـ [[model_]].
- [[model_dump()]] بيسيب datetime كـ object، و [[mode="json"]] بيحوّله string.
- [[model_validate_json]] أحسن من [[json.loads]] + validate.
- [[model_copy(update=...)]] مبيفحصش.`,
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
          ],
          sol: R`[[model_dump()]] بيرجع [[created_at]] كـ [[datetime]] حقيقي ([[datetime.datetime(2026, 1, 10, 9, 0, tzinfo=TzInfo(0))]] ونوعه [[<class 'datetime.datetime'>]])، و [[model_dump(mode="json")]] بيرجعه string: [[2026-01-10T09:00:00Z]] ونوعه [[<class 'str'>]]. الأول لو هتكمّل شغل في Python، والتاني لو هتبعته لحاجة مبتفهمش غير JSON (Redis أو [[json.dumps]]).

ومن غير [[from_attributes]]: [[Input should be a valid dictionary or instance of Item [type=model_type, input_value=<__main__.Row object at 0x...>, input_type=Row]]]. Pydantic افتراضيًا بيقبل dict أو object من نفس الموديل بس، و [[from_attributes=True]] بيخليه يقرا [[obj.id]] و [[obj.name]]، ودي اللي بتحتاجها مع صفوف SQLAlchemy.`
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
          teach: R`## المثال بيعمل إيه؟

موديل حجز [[Booking]] فيه ٣ إضافات بتاعتك: validator على حقل الإيميل (ينضّفه ويتأكد إنه إيميل الشركة)، و validator على الموديل كله (تاريخ النهاية بعد البداية)، وحقل محسوب [[nights]] (عدد الليالي). اتشغّل بـ Pydantic 2.13 و Python 3.14 على ويندوز.

---

## ١. الـ imports

~~~python
from datetime import date
from typing import Self
from pydantic import BaseModel, computed_field, field_validator, model_validator
~~~

- [[Self]] (من Python 3.11): نوع معناه «object من نفس الكلاس ده». هنكتبه نوع رجوع للـ model validator.
- الباقي ٣ decorators هنشرحهم تحت.

## ٢. الحقول

~~~python
class Booking(BaseModel):
    email: str
    start: date
    end: date
    guests: int
~~~

كلهم إجباريين. و [[start]] و [[end]] هيتحوّلوا من [["2026-03-01"]] لـ [[date]].

---

## ٣. [[@field_validator]]: حقل واحد

~~~python
@field_validator("email")
@classmethod
def normalize_email(cls, v: str) -> str:
    v = v.strip().lower()
    if not v.endswith("@company.com"):
        raise ValueError("لازم إيميل الشركة")
    return v
~~~

| السطر | معناه |
|---|---|
| [[@field_validator("email")]] | الدالة دي تشتغل على حقل [[email]] |
| [[@classmethod]] | لازم تحته: الدالة بتاخد الكلاس [[cls]] مش object (الـ object لسه مااتعملش) |
| [[v: str]] | القيمة، **بعد** ما Pydantic اتأكد إنها str (الوضع الافتراضي [[mode="after"]]) |
| [[v.strip().lower()]] | شيل المسافات وحوّل لحروف صغيرة |
| [[raise ValueError(...)]] | ارفض، و Pydantic بيحوّلها لخطأ عادي في الـ ValidationError |
| [[return v]] | **لازم**: اللي بترجعه هو اللي بيتخزن. لو نسيته الحقل يبقى None |

## ٤. [[@model_validator(mode="after")]]: الموديل كله

~~~python
@model_validator(mode="after")
def check_dates(self) -> Self:
    if self.end <= self.start:
        raise ValueError("end لازم بعد start")
    return self
~~~

- [[mode="after"]]: بعد ما **كل** الحقول اتفحصت واتحوّلت، فـ [[self.start]] و [[self.end]] أكيد [[date]] وتقدر تقارنهم.
- مفيش [[@classmethod]] هنا: بياخد [[self]] (الـ object نفسه).
- [[<=]] بين تاريخين: [[end]] قبل أو يساوي [[start]] = غلط.
- [[return self]] **لازم**.

## ٥. [[@computed_field]]: حقل محسوب

~~~python
@computed_field
@property
def nights(self) -> int:
    return (self.end - self.start).days
~~~

- [[@property]]: دالة بتتقري كأنها attribute ([[b.nights]] من غير أقواس).
- [[@computed_field]] فوقها: ضيفها لـ [[model_dump]] وللـ JSON.
- [[self.end - self.start]]: طرح تاريخين بيدّي [[timedelta]] (مدة)، و [[.days]] عدد الأيام فيها.

---

## ٦. التشغيل

~~~python
b = Booking(email=" Sara@Company.com ", start="2026-03-01", end="2026-03-04", guests=2)
print(b.model_dump())
~~~

~~~text الناتج
{'email': 'sara@company.com', 'start': datetime.date(2026, 3, 1), 'end': datetime.date(2026, 3, 4), 'guests': 2, 'nights': 3}
~~~

- الإيميل اتنضّف ([[sara@company.com]]): الـ validator رجّع القيمة المعدّلة.
- [[nights: 3]] ظهر في الـ dump مع إنه مش حقل اتبعت (من ١ لـ ٤ مارس = ٣ ليالي).

---

## ٧. التجارب

جربنا ٣ حالات غلط وطبعنا [[type]] و [[loc]] و [[msg]] لكل خطأ:

~~~text الناتج
إيميل gmail                 → value_error ('email',) Value error, لازم إيميل الشركة
end قبل start               → value_error () Value error, end لازم بعد start
الاتنين غلط مع بعض           → value_error ('email',) Value error, لازم إيميل الشركة
~~~

نقرا:

- [[loc: ()]] tuple فاضي: الخطأ على **الموديل كله** مش حقل معين، لأنه من model validator.
- Pydantic بيزوّد [[Value error, ]] قبل رسالتك. خد بالك لو بتعرضها للمستخدم.
- في الحالة التالتة ظهر خطأ الإيميل **بس**: لو أي حقل فشل، الـ [[model_validator(mode="after")]] مبيشتغلش أصلًا (مفيش موديل سليم يفحصه).

وكمان:

| جربنا | النتيجة |
|---|---|
| [[b.guests = 100]] بعد الإنشاء | عدّت من غير فحص (إلا لو [[validate_assignment=True]]) |
| بعتنا [[nights=99]] | اتجاهلت: الـ computed field مبيتقبلش كـ input |
| [[model_json_schema(mode="serialization")]] | [[nights]] فيه [[readOnly: True]] |

### [[field_validator]] ولا [[Field(le=6)]]؟ (الـ solCode)

الـ solCode بيعمل نفس القاعدة (أقصى ٦ ضيوف) بطريقتين:

~~~text الناتج مع guests=7
WithValidator: {'type': 'value_error', 'loc': ('guests',), 'msg': 'Value error, max 6 guests', ...}
WithField:     {'type': 'less_than_equal', 'loc': ('guests',), 'msg': 'Input should be less than or equal to 6', 'ctx': {'le': 6}, ...}
~~~

وفي الـ JSON Schema: [[WithField]] فيه [[maximum: 6]]، و [[WithValidator]] مفيهوش حاجة. يعني [[Field]] أقصر، ورسالته ونوعه أوضح، وبيظهر في [[/docs]]. خلّي الـ validator للقواعد اللي [[Field]] ميعرفش يعبّر عنها.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| قيد بسيط (رقم، طول، regex) | [[Field(...)]] |
| تنضيف أو قاعدة على حقل | [[@field_validator("x")]] + [[@classmethod]] + [[return v]] |
| قاعدة بين حقلين | [[@model_validator(mode="after")]] + [[return self]] |
| قيمة محسوبة في الـ JSON | [[@computed_field]] + [[@property]] |

- ارمي [[ValueError]] مش [[assert]].
- الـ validators بتشتغل وقت الإنشاء بس.`,
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
          ],
          sol: R`لما [[end]] قبل [[start]]: [[e.errors()]] فيها خطأ واحد بـ [[loc: ()]] (tuple فاضي، يعني على الموديل كله)، و [[type: 'value_error']]، و [[msg: 'Value error, end لازم بعد start']]. Pydantic بيضيف [[Value error, ]] قبل رسالتك، فخد بالك لو بتعرض الرسالة للمستخدم. ولو عايز الخطأ يتربط بحقل معين، اعمل الفحص في field validator.

الـ [[@field_validator("guests")]] بيطلّع [[loc: ('guests',)]] و [[Value error, max 6 guests]]، و [[Field(le=6)]] بيطلّع [[less_than_equal]] و [[Input should be less than or equal to 6]] ومعاه [[ctx: {'le': 6}]]، وبيظهر كـ [[maximum]] في [[/docs]]. فـ [[Field(le=6)]] أقصر وأوضح وموثّق، والـ validator خليه للمنطق اللي Field ميعرفش يعبّر عنه.`,
          solCode: R`from pydantic import BaseModel, Field, field_validator
class WithValidator(BaseModel):
    guests: int
    @field_validator("guests")
    @classmethod
    def max_guests(cls, v: int) -> int:
        if v > 6:
            raise ValueError("max 6 guests")
        return v
class WithField(BaseModel):
    guests: int = Field(le=6)`
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
          teach: R`## المثال بيعمل إيه؟

بيعرّف كل إعدادات التطبيق في class واحد [[Settings]]: كل حقل بيتملي من متغير بيئة بنفس الاسم أو من ملف [[.env]]، وبيتفحص ويتحوّل لنوعه. وبعدين بيعمل دالة بترجّع الإعدادات مرة واحدة (cache)، ويستخدمها كـ dependency في route. اتجرب بـ pydantic-settings 2.15 و FastAPI 0.142 و Python 3.14 على ويندوز.

---

## ١. الـ imports

~~~python
from functools import lru_cache
from typing import Annotated, Literal
from fastapi import Depends, FastAPI
from pydantic import PostgresDsn, SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict
~~~

| الاسم | منين | بيعمل إيه |
|---|---|---|
| [[lru_cache]] | functools | بيحفظ ناتج الدالة، فتتنفّذ مرة واحدة |
| [[Depends]] | fastapi | يخلّي باراميتر ييجي من دالة (dependency) |
| [[PostgresDsn]] | pydantic | URL لازم يبدأ بـ [[postgresql://]] أو زيه |
| [[SecretStr]] | pydantic | string مبيتطبعش |
| [[BaseSettings]] | pydantic_settings | زي BaseModel بس بيقرا من البيئة |
| [[SettingsConfigDict]] | pydantic_settings | إعداداته |

[[pydantic_settings]] مكتبة **منفصلة** ([[pip install pydantic-settings]])، وجاية مع [[fastapi[standard]]].

---

## ٢. الكلاس

~~~python
class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")
~~~

- [[env_file=".env"]]: اقرا الملف ده كمان (لو موجود) من الفولدر اللي شغّلت منه.
- [[env_file_encoding="utf-8"]]: الملف UTF-8.
- [[extra="ignore"]]: لو [[.env]] فيه متغيرات ملهاش حقل، تجاهلها.

### الحقول

~~~python
    env: Literal["dev", "test", "prod"] = "dev"
    database_url: PostgresDsn
    redis_url: str = "redis://localhost:6379/0"
    jwt_secret: SecretStr
    cors_origins: list[str] = ["http://localhost:5173"]
    db_pool_size: int = 10
~~~

| الحقل | بيقرا من | إجباري؟ |
|---|---|---|
| [[env]] | [[ENV]]، وقيمه ٣ بس | لأ (dev) |
| [[database_url]] | [[DATABASE_URL]] | **أيوه** |
| [[redis_url]] | [[REDIS_URL]] | لأ |
| [[jwt_secret]] | [[JWT_SECRET]] | **أيوه** |
| [[cors_origins]] | [[CORS_ORIGINS]] كـ **JSON** | لأ |
| [[db_pool_size]] | [[DB_POOL_SIZE]] | لأ (10) |

اسم الحقل بالحروف الصغيرة بيلاقي المتغير بالكبيرة: المطابقة مش حساسة لحالة الحروف افتراضيًا.

---

## ٣. مرة واحدة: [[@lru_cache]]

~~~python
@lru_cache
def get_settings() -> Settings:
    return Settings()
~~~

[[Settings()]] من غير arguments = «اقرا كل حاجة من البيئة و .env وافحص». و [[@lru_cache]] بيحفظ الناتج: أول نداء بيقرا، والباقي بيرجّع نفس الـ object (جربنا [[get_settings() is get_settings()]] طلعت [[True]]).

## ٤. كـ dependency

~~~python
SettingsDep = Annotated[Settings, Depends(get_settings)]
app = FastAPI()
@app.get("/info")
async def info(settings: SettingsDep):
    return {"env": settings.env, "pool": settings.db_pool_size}
~~~

- [[Annotated[Settings, Depends(get_settings)]]]: «النوع Settings، والقيمة تيجي من نداء [[get_settings]]». بنديله اسم [[SettingsDep]] عشان نكرره بسهولة.
- [[settings: SettingsDep]]: FastAPI بينادي [[get_settings()]] ويديك الناتج. وفي الاختبارات تقدر تبدّلها ([[app.dependency_overrides]]).

---

## ٥. من غير [[.env]]

شغّلنا [[fastapi run main.py]] وطلبنا [[/info]]:

~~~text الناتج
Internal Server Error          ← 500 للعميل
~~~

~~~text اللي في الترمنال
INFO:     Application startup complete.
ERROR:    Exception in ASGI application
pydantic_core._pydantic_core.ValidationError: 2 validation errors for Settings
database_url
  Field required [type=missing, input_value={}, input_type=dict]
jwt_secret
  Field required [type=missing, input_value={}, input_type=dict]
~~~

السيرفر **قام عادي** ([[startup complete]])، والخطأ ظهر مع أول طلب، لأن [[get_settings()]] مبتتناداش غير ساعتها. عشان كده الأحسن تناديها في الـ lifespan (اللي بيشتغل وقت القيام): السيرفر يرفض يقوم بدل ما يقع مع أول مستخدم. والحلو إن الرسالة فيها **كل** المتغيرات الناقصة مرة واحدة.

---

## ٦. مع [[.env]]

~~~text .env
DATABASE_URL=postgresql://app:secret@localhost:5432/shop
JWT_SECRET=change-me-please-32-chars-minimum
CORS_ORIGINS=["https://shop.example.com"]
~~~

سطر لكل متغير، [[NAME=value]] من غير مسافات حوالين [[=]]. وطبعنا:

~~~text الناتج
/info                         → {'env': 'dev', 'pool': 10}
s.database_url                → PostgresDsn('postgresql://app:secret@localhost:5432/shop')
str(s.database_url)           → postgresql://app:secret@localhost:5432/shop
s.cors_origins                → ['https://shop.example.com']
s.db_pool_size                → 10  (int)
~~~

- [[database_url]] نوعه [[PostgresDsn]] مش str: لما تبعته لـ asyncpg اعمل [[str(...)]].
- [[cors_origins]] اتقرا JSON واتحوّل list.

### [[SecretStr]]

~~~text الناتج
print(s.jwt_secret)                  → **********
repr(s.jwt_secret)                   → SecretStr('**********')
s.jwt_secret.get_secret_value()      → change-me-please-32-chars-minimum
print(s)                             → ... jwt_secret=SecretStr('**********') ...
~~~

لو اللوج طبع الـ settings كلها، السر مش هيطلع. بس لاحظ إن [[database_url]] **طالع بالباسورد** ([[app:secret]]): [[PostgresDsn]] مش سر. لو مش عايزه يتطبع، خلّيه [[SecretStr]] وافحصه بنفسك، أو اقسمه لحقول.

---

## ٧. التجارب

متغير البيئة بيتحط **للأمر ده بس** في Git Bash كده: [[DB_POOL_SIZE=abc python ...]]. وفي PowerShell: [[$env:DB_POOL_SIZE = "abc"]] قبل الأمر (بيفضل لحد ما تقفل الترمنال بس، مش دايم).

| جربنا | النتيجة |
|---|---|
| [[DB_POOL_SIZE=abc]] | [[db_pool_size Input should be a valid integer, unable to parse string as an integer]] |
| [[DB_POOL_SIZE=25 ENV=prod]] | [[25 prod]]: [[25]] اتحوّل int |
| [[ENV=staging]] | [[Input should be 'dev', 'test' or 'prod']] |
| [[DATABASE_URL=mysql://x@h/db]] | [[URL scheme should be 'postgres', 'postgresql', 'postgresql+asyncpg', ...]] |
| [[CORS_ORIGINS=https://a.com]] (مش JSON) | [[SettingsError: error parsing value for field "cors_origins" from source "EnvSettingsSource"]] |
| [[$env:DATABASE_URL]] غير اللي في .env | متغير البيئة **كسب** |
| [[Settings(db_pool_size=3)]] | [[3]]: الـ argument كسب على الكل |

### الأولوية

~~~text
Settings(x=...)  >  متغيرات البيئة  >  .env  >  الـ default
~~~

يعني على السيرفر حط المتغيرات الحقيقية في البيئة (Docker أو systemd)، و [[.env]] لجهازك بس.

---

## الخلاصة

- [[BaseSettings]] = موديل بيتملي من البيئة و [[.env]]، بنفس الفحص.
- حقل من غير default = متغير لازم يتعرّف، والخطأ بيقول اسمه.
- list و dict بيتكتبوا JSON في المتغير.
- [[SecretStr]] للأسرار، و [[get_secret_value()]] وقت الاستخدام بس.
- [[@lru_cache]] + [[Depends]]: مرة واحدة، وسهل تبدّلها في الاختبار.
- [[.env]] في [[.gitignore]] دايمًا.`,
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
          ],
          sol: R`من غير [[.env]]، [[/info]] بترجع [[500 Internal Server Error]]، والترمنال فيه [[2 validation errors for Settings]] وتحتها [[database_url Field required]] و [[jwt_secret Field required]]. التطبيق قام عادي لأن [[get_settings()]] مبتتناداش غير مع أول طلب، وده سبب إنك تناديها في الـ lifespan: الأحسن السيرفر يرفض يقوم بدل ما يقوم ويقع مع أول مستخدم.

بعد ما تعمل [[.env]]: [[print(settings.jwt_secret)]] بيطبع [[**********]] و [[repr]] بيطبع [[SecretStr('**********')]]، و [[get_secret_value()]] بس هي اللي بترجع القيمة الحقيقية، فلو اللوج طبع الـ settings كلها السر مش هيتسرّب. و [[CORS_ORIGINS=["https://shop.example.com"]]] بيتقري كـ JSON ويبقى list. و [[DB_POOL_SIZE=abc]] بيطلّع [[db_pool_size Input should be a valid integer, unable to parse string as an integer]]. ومتغيرات البيئة الحقيقية بتكسب على [[.env]].`
        }
      ]
    }
]);

// تكملة تاب swift: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/swift/01.js (شرح حقول الدرس في أوله)
MORE("swift", [
    {
      t: "الأنواع بتاعتك: struct و class و enum و protocol",
      l: 1,
      n: "تبني أنواعك: value vs reference، والـ properties والـ methods، والـ enums بقيم مرفقة، والـ protocols والـ extensions، والـ generics",
      items: [
        {
          cmd: "الـ Structs والـ Classes في Swift",
          title: "struct ولا class: الفرق بين value type و reference type، وليه Swift بتبدأ بـ struct",
          desc: R`الاتنين بيعملوا نوع جديد فيه properties (بيانات) و methods (دوال). بس فيه فرق واحد بيغيّر كل حاجة:

1. [[struct]] value type: لما تنسخه ([[var b = a]]) أو تبعته لدالة، بياخد نسخة مستقلة. تعديل النسخة مش بيأثر على الأصل.
2. [[class]] reference type: النسخ بيدّيك مرجع (reference) لنفس الـ object. الاتنين بيشاوروا على نفس الحاجة، فتعديل واحد بيظهر في التاني.

فروق تانية:
• الـ struct بياخد initializer جاهز (memberwise init) فيه كل الـ properties: [[User(id: 1, name: "سارة")]]. الـ class لازم تكتب [[init]] بنفسك (لو فيه properties من غير قيمة افتراضية).
• الـ class بيدعم الوراثة (inheritance) بـ [[class Admin: User]]، والـ struct لأ.
• [[let]] على struct بتقفل كل خصائصه. [[let]] على class بتقفل المرجع بس، وتقدر تعدّل الـ properties اللي [[var]].
• [[===]] بتسأل هل اتنين references بيشاوروا على نفس الـ object (للـ classes بس).

القاعدة اللي Apple نفسها بتنصح بيها: ابدأ بـ [[struct]]. استخدم [[class]] لما محتاج identity مشتركة (حاجة واحدة أكتر من جزء في التطبيق شايفها ومعدّل فيها)، أو وراثة، أو لما API بيطلب class (زي [[@Observable]] و SwiftData [[@Model]]). أنواع Swift الأساسية نفسها (String و Array و Dictionary) structs.`,
          example: R`struct Point {
  var x: Int
  var y: Int
}
var a = Point(x: 1, y: 2)
var b = a
b.x = 100
print("struct: a.x = \(a.x), b.x = \(b.x)")
final class Account {
  var balance: Int
  init(balance: Int) {
    self.balance = balance
  }
}
let acc1 = Account(balance: 500)
let acc2 = acc1
acc2.balance = 0
print("class: acc1 = \(acc1.balance), acc2 = \(acc2.balance)")
print(acc1 === acc2)
let fixed = Point(x: 0, y: 0)
print(fixed.x)`,
          try: R`حاول تكتب [[fixed.x = 5]] (struct بـ let) وشوف الخطأ، وبعدين لاحظ إن [[acc2.balance = 0]] اشتغل رغم إن [[acc2]] بـ [[let]]. وبعدين غيّر [[struct Point]] لـ [[class Point]] وشوف إيه اللي هيبوظ.`,
          flag: "script",
          deep: {
            why: R`مع الـ classes، أي جزء من الكود عنده reference يقدر يغيّر الـ object، فلما قيمة تتغير فجأة لازم تدور في المشروع كله مين غيّرها. مع الـ structs، القيمة اللي في إيدك محدش غيرك يقدر يغيّرها. ده بيسهّل الفهم وبيشيل مشاكل الـ threads (كل thread معاه نسخته). وده سبب إن SwiftUI مبني على structs.`,
            how: R`الـ class بيتعمل في الـ heap، والـ variable فيه pointer ليه، و Swift بتعد الـ references (ARC) عشان تعرف تمسحه إمتى. الـ struct ممكن يتخزن inline (في الـ stack أو جوه object تاني)، والنسخ بتاعه رخيص. والـ collections زي Array بتستخدم copy-on-write: النسخ الحقيقي بيحصل بس لما واحدة من النسختين تتعدل.

[[final class]] معناها مينفعش حد يورث منها، وده بيخلي الـ compiler ينادي الـ methods مباشرة (أسرع شوية) وبيوضح نيتك. و [[self.balance = balance]]: [[self]] هو الـ object الحالي، ومحتاجينه هنا عشان الـ parameter والـ property ليهم نفس الاسم.`,
            when: R`struct: الـ models (منتج، رسالة، رد API)، والـ Views في SwiftUI، وأي قيمة. class: الحاجة اللي ليها هوية واحدة مشتركة (session المستخدم، cache، view model متشارك)، وكلاسات UIKit، و SwiftData models.`,
            mistakes: R`تعمل كل حاجة class بحكم عادة Java: هتلاقي داتا بتتغير من حتة مش متوقعة. وتعدّل struct جوه array بـ for loop وتستغرب إن الأصل متغيرش ([[for var item in items]] بيعدّل نسخة). وتفتكر إن [[let]] على class بتخليه ثابت.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعمل نفس التجربة مرتين: ينسخ قيمة ويعدّل النسخة. مرة بـ [[struct]] (الأصل مبيتأثرش) ومرة بـ [[class]] (الأصل بيتغير). الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. [[struct Point]]

~~~swift
struct Point {
  var x: Int
  var y: Int
}
~~~

- [[struct]] بيعرّف نوع جديد اسمه [[Point]]. الاسم بيبدأ بحرف capital (كل الأنواع كده: [[Int]] و [[String]]).
- [[var x: Int]]: property (حقل) قابلة للتعديل. ومفيش قيمة، فلازم تتبعت وانت بتعمل النقطة.

---

## ٢. النسخ في الـ struct

~~~swift
var a = Point(x: 1, y: 2)
var b = a
b.x = 100
print("struct: a.x = \(a.x), b.x = \(b.x)")
~~~

- [[Point(x: 1, y: 2)]]: memberwise initializer. Swift كتبته لوحدها، بـ label لكل property بالترتيب.
- [[var b = a]]: [[b]] **نسخة كاملة مستقلة**. دلوقتي فيه نقطتين في الذاكرة.
- [[b.x = 100]]: النقطة [[.]] بتوصل لـ property. التعديل على [[b]] بس.

~~~text الناتج
struct: a.x = 1, b.x = 100
~~~

---

## ٣. [[final class Account]]

~~~swift
final class Account {
  var balance: Int
  init(balance: Int) {
    self.balance = balance
  }
}
~~~

- [[class]] زي struct في الشكل، بس reference type.
- [[final]]: محدش يقدر يورث من الكلاس ده (يعمل [[class X: Account]]).
- [[init(...)]]: الـ initializer. الكلاس **مبياخدش** memberwise init جاهز، فلازم نكتبه.
- [[self.balance = balance]]: [[self]] = «الـ object ده نفسه». الشمال الـ property، واليمين الـ parameter اللي بنفس الاسم.

---

## ٤. النسخ في الـ class

~~~swift
let acc1 = Account(balance: 500)
let acc2 = acc1
acc2.balance = 0
print("class: acc1 = \(acc1.balance), acc2 = \(acc2.balance)")
print(acc1 === acc2)
~~~

- [[Account(balance: 500)]] بيعمل **object واحد** في الذاكرة، و [[acc1]] فيه «عنوانه» (reference).
- [[let acc2 = acc1]]: نسخنا العنوان بس. الاتنين بيشاوروا على نفس الـ object.
- [[acc2.balance = 0]] اشتغل رغم [[let]]: الـ [[let]] بتقفل المتغير ([[acc2]] مش هيشاور على object تاني)، مش الـ object نفسه. و [[balance]] نفسها [[var]].
- [[===]] (تلات علامات): «نفس الـ object بالظبط؟».

~~~text الناتج
class: acc1 = 0, acc2 = 0
true
~~~

---

## ٥. [[let]] على struct

~~~swift
let fixed = Point(x: 0, y: 0)
print(fixed.x)
~~~

القراية عادي: **0**. لكن [[fixed.x = 5]] (التجربة):

~~~text الناتج
main.swift:22:7: error: cannot assign to property: 'fixed' is a 'let' constant
~~~

في الـ struct القيمة هي المتغير نفسه، فـ [[let]] بتقفل كل حاجة جواه حتى الـ [[var]].

---

## ٦. التجربة: [[struct Point]] ← [[class Point]]

~~~text الناتج
main.swift:1:7: error: class 'Point' has no initializers
main.swift:5:9: error: 'Point' cannot be constructed because it has no accessible initializers
main.swift:20:13: error: 'Point' cannot be constructed because it has no accessible initializers
~~~

ومع أول خطأ الـ compiler قال [[note: stored property 'x' without initial value prevents synthesized initializers]]: الكلاس فيه properties من غير قيمة ومن غير [[init]]. بعد ما تكتب [[init(x: Int, y: Int)]]، الـ [[a.x]] هتطبع 100 لأن [[b]] بقى reference لنفس النقطة. و [[fixed.x = 5]] هيشتغل.

---

## الخلاصة

| | [[struct]] | [[class]] |
|---|---|---|
| النوع | value type | reference type |
| [[b = a]] | نسخة مستقلة | نفس الـ object |
| [[init]] جاهز | أيوه (memberwise) | لأ، تكتبه |
| [[let]] | يقفل كل الـ properties | يقفل الـ reference بس |
| وراثة | لأ | أيوه (إلا لو [[final]]) |
| [[===]] | مش متاح | نفس الـ object؟ |

ابدأ بـ [[struct]]، وخد [[class]] لما محتاج object واحد متشارك.`,
          lines: [
            R`[[struct]] اسمه Point.`,
            "property قابلة للتعديل.",
            "property تانية.",
            "قفلة.",
            R`memberwise init جاهز من غير ما نكتبه.`,
            R`[[b]] نسخة مستقلة من [[a]].`,
            "بنعدّل النسخة بس.",
            R`[[a.x]] لسه 1.`,
            R`[[final class]]: class مينفعش يتورث.`,
            "property.",
            R`[[init]] لازم نكتبه للـ class.`,
            R`[[self.balance]] الـ property، و [[balance]] لوحدها الـ parameter.`,
            "قفلة الـ init.",
            "قفلة الـ class.",
            "object واحد.",
            R`[[acc2]] reference لنفس الـ object.`,
            R`مسموح رغم [[let]]: الـ let على الـ reference مش على الـ object.`,
            "الاتنين صفر.",
            R`[[===]] نفس الـ object؟ true.`,
            R`struct بـ [[let]]: مقفول بالكامل.`,
            "قراية عادي."
          ],
          sol: R`[[fixed.x = 5]] بيطلّع: [[cannot assign to property: 'fixed' is a 'let' constant]].

ناتج المثال:
[[struct: a.x = 1, b.x = 100]]
[[class: acc1 = 0, acc2 = 0]]
[[true]]
[[0]]

لو غيّرت Point لـ class: محتاج تكتب [[init]] بنفسك وإلا [[class 'Point' has no initializers]]، وبعد ما تكتبه هتلاقي [[a.x]] بقت 100 كمان لأن [[b]] بقى reference لنفس الـ object.`
        },
        {
          cmd: "properties و methods و mutating",
          title: "computed properties و didSet و static، وليه method الـ struct اللي بتعدّل محتاجة mutating",
          desc: R`الـ properties نوعين:
1. stored: قيمة متخزنة فعلًا ([[var name: String]]).
2. computed: بتتحسب كل مرة تتقري: [[var total: Double { price * Double(quantity) }]]. مش متخزنة، فدايمًا مظبوطة.

[[didSet]] و [[willSet]] (property observers): كود بيتنفذ بعد أو قبل ما الـ stored property تتغير. جوه [[didSet]] فيه [[oldValue]] (القيمة القديمة).

الـ methods دوال جوه النوع. وفي الـ struct، أي method بتغيّر property لازم تتعلم [[mutating]]، لأن الـ struct value والـ methods العادية بتتعامل معاه كأنه [[let]]. ومش هتقدر تنادي method [[mutating]] على struct متعرّف بـ [[let]]. (في الـ class مفيش [[mutating]] لأن الـ object reference).

[[static]] property أو method تابعة للنوع نفسه مش لكل نسخة: [[Product.taxRate]].

و [[private(set)]] معناها: الكل يقدر يقرا، بس التعديل من جوه النوع بس (تفاصيل في درس access control).

[[init]] تقدر تكتبه بنفسك في الـ struct (ولو كتبته الـ memberwise init الجاهز بيختفي، إلا لو كتبت بتاعك في extension).`,
          example: R`struct CartItem {
  static let taxRate = 0.14
  let name: String
  let price: Double
  private(set) var quantity: Int {
    didSet {
      print("\(name): \(oldValue) ← \(quantity)")
    }
  }
  var total: Double {
    price * Double(quantity) * (1 + Self.taxRate)
  }
  mutating func add(_ n: Int = 1) {
    quantity += n
  }
}
var item = CartItem(name: "كشكول", price: 50, quantity: 1)
item.add()
item.add(3)
print(item.quantity, item.total)
print(CartItem.taxRate)`,
          try: R`شيل كلمة [[mutating]] واقرا الخطأ. وبعدين جرّب [[item.quantity = 10]] من برة. وأخيرًا اعمل [[let fixedItem = CartItem(...)]] ونادي [[fixedItem.add()]].`,
          flag: "script",
          deep: {
            why: R`[[mutating]] بتخلي التعديل ظاهر في الكود: لما تشوف method مش mutating انت متأكد إنها مش هتغيّر القيمة. والـ computed properties بتمنع الداتا المتناقضة (مفيش total متخزن ممكن ينسى يتحدث لما الكمية تتغير).`,
            how: R`الـ mutating method بتاخد [[self]] كأنه [[inout]]: نسخة بتتعدل وبترجع مكان الأصل. عشان كده محتاجة [[var]].

[[Self.taxRate]] بـ S كابيتال يعني «النوع الحالي». وينفع تكتب [[CartItem.taxRate]]. و [[didSet]] مش بيتنادى من جوه [[init]]، بس بيتنادى من أي تعديل بعد كده (حتى من جوه الـ methods).

الـ memberwise init لسه موجود هنا وبياخد [[quantity]] رغم إنها [[private(set)]]، لأن الـ init نفسه internal.`,
            when: R`computed properties لأي قيمة مشتقة من قيم تانية (المجموع، الاسم الكامل، هل الفورم سليم). و [[didSet]] للـ side effects البسيطة (حفظ، log). و [[static]] للثوابت المشتركة وللـ factory methods ([[User.preview]] في SwiftUI previews).`,
            mistakes: R`تحط computed property تقيلة (حسابات كتير أو شبكة) وتقراها في loop. وتعمل [[didSet]] بيعدّل نفس الـ property فيعمل loop. وتنسى إن [[didSet]] مش بيشتغل في الـ init فتستغرب إن الـ log مطلعش.`
          },
          teach: R`## البرنامج بيعمل إيه؟

عنصر في سلة مشتريات: ليه اسم وسعر ثابتين، وكمية بتتغير من method واحدة بس وبتطبع كل تغيير، ومجموع بيتحسب لوحده بالضريبة. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. [[static]]: قيمة للنوع كله

~~~swift
struct CartItem {
  static let taxRate = 0.14
~~~

[[static]] معناها إن [[taxRate]] تابعة لـ [[CartItem]] نفسه، مش لكل عنصر. نسخة واحدة بس مهما عملت عناصر، وبتتقري من اسم النوع: [[CartItem.taxRate]].

---

## ٢. stored properties

~~~swift
  let name: String
  let price: Double
~~~

دول **stored**: قيمتهم متخزنة فعلًا جوه كل عنصر. و [[let]] يعني بعد ما العنصر يتعمل مش هيتغيروا.

---

## ٣. [[private(set)]] و [[didSet]]

~~~swift
  private(set) var quantity: Int {
    didSet {
      print("\(name): \(oldValue) ← \(quantity)")
    }
  }
~~~

- [[private(set)]]: أي حد يقدر **يقرا** [[quantity]]، بس **الكتابة** من جوه الـ struct بس.
- [[{ didSet { ... } }]] بعد الـ property: property observer. الكود ده بيتنفذ **بعد** كل تغيير في القيمة.
- [[oldValue]]: اسم جاهز جوه [[didSet]] للقيمة القديمة. و [[quantity]] جواه = الجديدة.
- وفيه أخوه [[willSet]] بيتنفذ **قبل** التغيير، وجواه [[newValue]].

---

## ٤. computed property

~~~swift
  var total: Double {
    price * Double(quantity) * (1 + Self.taxRate)
  }
~~~

- مفيش [[=]]: فيه [[{ }]] على طول بعد النوع. ده معناه إن [[total]] مش متخزنة، **بتتحسب كل مرة تتقري**. فعمرها ما هتبقى قديمة.
- [[Double(quantity)]]: الكمية Int، ولازم تتحول عشان تتضرب في Double.
- [[Self.taxRate]]: [[Self]] بـ S كبيرة = «النوع الحالي» (هنا [[CartItem]]). بنستخدمها عشان نوصل للـ static من جوه.

---

## ٥. [[mutating]]

~~~swift
  mutating func add(_ n: Int = 1) {
    quantity += n
  }
}
~~~

- [[func]] جوه النوع اسمها method.
- الـ struct value، والـ methods العادية بتشوف [[self]] كأنه [[let]]. [[mutating]] بتقول: «الـ method دي بتعدّل الـ struct».
- [[n: Int = 1]] قيمة افتراضية: [[add()]] = [[add(1)]].

شلنا [[mutating]] (التجربة):

~~~text الناتج
main.swift:14:14: error: left side of mutating operator isn't mutable: 'self' is immutable
~~~

يعني: الشمال بتاع [[+=]] مش قابل للتعديل لأن [[self]] ثابت. والـ compiler بيقترح [[note: mark method 'mutating' to make 'self' mutable]].

---

## ٦. التشغيل

~~~swift
var item = CartItem(name: "كشكول", price: 50, quantity: 1)
item.add()
item.add(3)
print(item.quantity, item.total)
print(CartItem.taxRate)
~~~

- الـ memberwise init لسه موجود وبياخد [[quantity]].
- [[var item]]: لازم [[var]] عشان ننادي mutating.
- [[add()]]: 1 ← 2، و [[didSet]] طبع. [[add(3)]]: 2 ← 5.
- [[total]] = 50 × 5 × 1.14 = 285 بالحساب... بس الطباعة [[285.00000000000006]]. الـ [[Double]] بيخزن الأرقام بالنظام الثنائي، و 1.14 مبتتكتبش فيه بالظبط، فبيطلع فرق صغير جدًا.

~~~text الناتج
كشكول: 1 ← 2
كشكول: 2 ← 5
5 285.00000000000006
0.14
~~~

ملحوظة: [[didSet]] **مش** بيتنادى وقت الإنشاء (الـ init)، عشان كده مفيش سطر «لا شيء ← 1». جربناها في struct فيه [[init]] بيحط القيمة وبعدين غيّرناها مرة: [[didSet]] طبع مرة واحدة بس، للتغيير.

---

## ٧. باقي التجربة

~~~swift
item.quantity = 10
let fixedItem = CartItem(name: "x", price: 1, quantity: 1)
fixedItem.add()
~~~

~~~text الناتج
main.swift:22:6: error: cannot assign to property: 'quantity' setter is inaccessible
main.swift:24:11: error: cannot use mutating member on immutable value: 'fixedItem' is a 'let' constant
~~~

- الأول: الـ setter (جزء الكتابة) private بسبب [[private(set)]].
- التاني: [[fixedItem]] [[let]]، فمينفعش mutating عليه.

---

## الخلاصة

| الحاجة | الشكل | معناها |
|---|---|---|
| stored | [[let name: String]] | قيمة متخزنة |
| computed | [[var total: Double { ... }]] | بتتحسب كل قراية |
| observer | [[didSet { oldValue }]] | كود بعد كل تغيير (مش في الـ init) |
| static | [[static let taxRate]] | للنوع كله: [[CartItem.taxRate]] |
| mutating | [[mutating func add]] | method بتعدّل struct |
| private(set) | [[private(set) var q]] | قراية للكل، كتابة من جوه |`,
          lines: [
            "struct لعنصر في السلة.",
            R`[[static]]: ثابت واحد للنوع كله.`,
            "stored property ثابتة.",
            "stored property ثابتة.",
            R`[[private(set)]]: القراية للكل والتعديل من جوه بس.`,
            R`[[didSet]] بيتنفذ بعد كل تعديل.`,
            R`[[oldValue]] القيمة القديمة متاحة جواه.`,
            "قفلة didSet.",
            "قفلة الـ property.",
            R`computed: مش متخزنة، بتتحسب كل قراية.`,
            R`[[Self.taxRate]]: الـ static بتاع النوع الحالي.`,
            "قفلة.",
            R`[[mutating]] لأنها بتغيّر [[quantity]]. و [[n]] افتراضيه 1.`,
            "التعديل ده بيشغّل didSet.",
            "قفلة.",
            "قفلة الـ struct.",
            R`memberwise init، و [[var]] عشان نقدر ننادي mutating.`,
            "بيطبع 1 ← 2.",
            "بيطبع 2 ← 5.",
            "الكمية والمجموع بالضريبة.",
            R`static بيتقري من اسم النوع.`
          ],
          sol: R`من غير [[mutating]]: [[left side of mutating operator isn't mutable: 'self' is immutable]].
و [[item.quantity = 10]] من برة: [[cannot assign to property: 'quantity' setter is inaccessible]].
و [[fixedItem.add()]] على [[let]]: [[cannot use mutating member on immutable value: 'fixedItem' is a 'let' constant]].

ناتج المثال (لاحظ [[285.00000000000006]] بدل 285: ده خطأ الـ Double اللي اتكلمنا عنه في درس الأنواع، وعشان كده الفلوس في تطبيق حقيقي بتتحسب بـ [[Decimal]] أو بالقروش كـ Int، وبتتعرض بـ [[formatted()]]):`,
          solCode: R`كشكول: 1 ← 2
كشكول: 2 ← 5
5 285.00000000000006
0.14`
        },
        {
          cmd: "enums و associated values",
          title: "enum للحالات المحدودة، ومعاه قيم مرفقة (associated values)، وتفكه بـ switch",
          desc: R`[[enum]] نوع قيمه محددة ومعروفة: [[enum Direction { case north, south, east, west }]]. القيمة بتتكتب [[Direction.north]]، ولو النوع معروف [[.north]] بس (النقطة في الأول اختصار).

enums في Swift أقوى بكتير من C و Java:
1. raw values: كل حالة ليها قيمة ثابتة من نوع واحد: [[enum Role: String { case admin, user }]]. [[Role.admin.rawValue]] = [["admin"]]. و [[Role(rawValue: "x")]] بترجّع optional.
2. associated values: كل حالة ممكن تشيل داتا مختلفة: [[case failed(message: String)]] و [[case loaded([Item])]]. دي أهم ميزة، وبتوصف «الحالة» بالظبط من غير properties optional متلخبطة.
3. methods و computed properties جوه الـ enum.
4. [[CaseIterable]]: بيدّيك [[allCases]] بكل الحالات.

[[switch]] على enum بيطلب تغطية كل الحالات، ولو ضفت حالة جديدة الـ compiler بيوريك كل مكان لازم يتعدل. وتفك الـ associated values جوه الـ case: [[case .failed(let message):]].

و [[if case .failed(let msg) = state { }]] لو عايز تشيك حالة واحدة بس.`,
          example: R`enum LoadState {
  case idle
  case loading
  case loaded(items: [String])
  case failed(message: String)
}
func describe(_ state: LoadState) -> String {
  switch state {
  case .idle: "لسه مبدأناش"
  case .loading: "بنحمّل..."
  case .loaded(let items) where items.isEmpty: "مفيش نتايج"
  case .loaded(let items): "لقينا \(items.count)"
  case .failed(let message): "حصلت مشكلة: \(message)"
  }
}
print(describe(.loading))
print(describe(.loaded(items: ["أ", "ب"])))
print(describe(.loaded(items: [])))
print(describe(.failed(message: "مفيش نت")))
enum Plan: String, CaseIterable {
  case free, pro, team
  var price: Int {
    switch self {
    case .free: 0
    case .pro: 99
    case .team: 299
    }
  }
}
for plan in Plan.allCases {
  print(plan.rawValue, plan.price)
}
print(Plan(rawValue: "pro")?.price ?? -1, Plan(rawValue: "gold") as Any)`,
          try: R`ضيف [[case offline]] لـ [[LoadState]] من غير ما تعدّل الـ switch، وشوف الـ compiler بيقول إيه. وبعدين اكتب [[if case .failed(let m) = someState { print(m) }]].`,
          flag: "script",
          deep: {
            why: R`الطريقة البدائية لوصف حالة شاشة: [[isLoading: Bool]] و [[error: String?]] و [[items: [Item]]]. وبكده ممكن تبقى في حالة مستحيلة (بتحمّل وفيه error وفيه داتا في نفس الوقت). الـ enum بـ associated values بيخلي الحالات المستحيلة مستحيلة فعلًا: يا loading يا loaded بداتا يا failed برسالة. هتستخدم ده في كل شاشة SwiftUI بتجيب داتا.`,
            how: R`الـ enum value type. الحجم بتاعه = أكبر associated value + شوية للتمييز بين الحالات. والـ [[Optional]] نفسه enum: [[case none]] و [[case some(Wrapped)]]. و [[Result]] (درس الأخطاء) enum: [[case success]] و [[case failure]].

[[where]] في الـ case بيضيف شرط، والـ cases بتتجرب بالترتيب، عشان كده [[items.isEmpty]] لازم قبل الـ case العام.`,
            when: R`أي حاجة ليها مجموعة حالات محدودة: حالة تحميل، نوع اشتراك، تاب في التطبيق، نوع إشعار، أخطاء (enum بيتبع [[Error]]). و raw values لما الحالات بتتحفظ أو بتيجي من API كنص.`,
            mistakes: R`تحط [[default:]] في switch على enum بتاعك فتخسر تنبيه الحالات الجديدة. وتستخدم [[String]] للحالات ([[status == "loadng"]] بغلطة إملائية محدش هيمسكها). وتنسى إن [[Plan(rawValue:)]] optional.`
          },
          teach: R`## البرنامج بيعمل إيه؟

جزئين: enum بيوصف حالة تحميل شاشة، وبعض حالاته شايلة داتا (associated values) ودالة بتوصفها بـ [[switch]]. وenum تاني لخطط اشتراك ليه raw values وسعر لكل خطة. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. [[enum LoadState]] بـ associated values

~~~swift
enum LoadState {
  case idle
  case loading
  case loaded(items: [String])
  case failed(message: String)
}
~~~

- [[enum]] نوع قيمه محددة: الحالة يا [[idle]] يا [[loading]] يا [[loaded]] يا [[failed]]. مفيش حاجة تانية ممكنة.
- [[case idle]] و [[case loading]]: حالات فاضية.
- [[case loaded(items: [String])]]: الحالة دي **شايلة** array من النصوص. ده associated value: كل قيمة من الحالة دي معاها داتا خاصة بيها.
- [[case failed(message: String)]]: شايلة رسالة.

فمستحيل يبقى عندك «فيه error وفيه items في نفس الوقت»: النوع نفسه بيمنعها.

---

## ٢. [[switch]] بيفك الداتا

~~~swift
func describe(_ state: LoadState) -> String {
  switch state {
  case .idle: "لسه مبدأناش"
  case .loading: "بنحمّل..."
  case .loaded(let items) where items.isEmpty: "مفيش نتايج"
  case .loaded(let items): "لقينا \(items.count)"
  case .failed(let message): "حصلت مشكلة: \(message)"
  }
}
~~~

- [[.idle]]: اختصار [[LoadState.idle]]. النقطة في الأول كفاية لأن Swift عارفة إن [[state]] نوعه [[LoadState]].
- الـ switch هنا expression (من غير [[return]]): كل case فيه قيمة واحدة بترجع.
- [[case .loaded(let items)]]: لو الحالة loaded، طلّع الـ array اللي جواها في اسم [[items]].
- [[where items.isEmpty]]: شرط زيادة. لازم ييجي **قبل** [[.loaded]] العام، لأن الـ cases بتتجرب بالترتيب.
- **مفيش [[default]]**: الـ ٤ حالات متغطية، والـ compiler عارف كده.

---

## ٣. النداءات

~~~swift
print(describe(.loading))
print(describe(.loaded(items: ["أ", "ب"])))
print(describe(.loaded(items: [])))
print(describe(.failed(message: "مفيش نت")))
~~~

بتعمل القيمة بنفس شكل الـ case: [[.loaded(items: [...])]].

~~~text الناتج
بنحمّل...
لقينا 2
مفيش نتايج
حصلت مشكلة: مفيش نت
~~~

**التجربة:** ضفنا [[case offline]] من غير ما نعدّل الـ switch:

~~~text الناتج
main.swift:9:3: error: switch must be exhaustive
~~~

ومعاه [[note: add missing case: '.offline']]: الـ compiler بيقولك بالظبط الحالة الناقصة. لو كان فيه [[default]] كان سكت والحالة الجديدة دخلت فيه من غير ما تاخد بالك.

---

## ٤. [[enum Plan]]: raw values و [[CaseIterable]]

~~~swift
enum Plan: String, CaseIterable {
  case free, pro, team
  var price: Int {
    switch self {
    case .free: 0
    case .pro: 99
    case .team: 299
    }
  }
}
~~~

- [[: String]] بعد الاسم: كل حالة ليها raw value نصي. لو مكتبتهوش، بيبقى اسم الحالة نفسه: [[Plan.pro.rawValue]] = [["pro"]].
- [[CaseIterable]]: protocol بيدّيك [[Plan.allCases]] = array بكل الحالات بالترتيب.
- [[case free, pro, team]]: ٣ حالات في سطر واحد.
- [[var price: Int { switch self { ... } }]]: computed property جوه الـ enum. [[self]] = الحالة الحالية.

---

## ٥. استخدامها

~~~swift
for plan in Plan.allCases {
  print(plan.rawValue, plan.price)
}
print(Plan(rawValue: "pro")?.price ?? -1, Plan(rawValue: "gold") as Any)
~~~

- [[Plan(rawValue: "pro")]]: من نص لـ enum. بترجّع [[Plan?]] لأن النص ممكن ميطابقش أي حالة.
- [[pro]] موجودة: [[?.price]] = 99. [["gold"]] مش موجودة: nil.

~~~text الناتج
free 0
pro 99
team 299
99 nil
~~~

---

## ٦. [[if case]] (التجربة)

~~~swift
let someState = LoadState.failed(message: "timeout")
if case .failed(let m) = someState { print(m) }
~~~

~~~text الناتج
timeout
~~~

[[if case pattern = value]]: زي case واحد من switch. لو الحالة failed، فك الرسالة واطبعها، ولو أي حالة تانية متعملش حاجة. مفيد لما يهمك حالة واحدة بس.

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| حالات بسيطة | [[enum E { case a, b }]] |
| قيمة مرفقة | [[case loaded(items: [String])]] |
| فكها | [[case .loaded(let items):]] |
| raw value | [[enum Plan: String]] و [[.rawValue]] |
| من raw value | [[Plan(rawValue: "x")]] بترجّع optional |
| كل الحالات | [[CaseIterable]] و [[allCases]] |
| حالة واحدة | [[if case .failed(let m) = s]] |

ومتحطش [[default]] في switch على enum بتاعك.`,
          lines: [
            "enum لحالة تحميل شاشة.",
            "حالة من غير داتا.",
            "حالة تانية.",
            R`حالة شايلة array: associated value.`,
            "حالة شايلة رسالة.",
            "قفلة.",
            "دالة بتوصف الحالة.",
            R`switch كـ expression، ولازم يغطي كل الحالات.`,
            R`[[.idle]] من غير اسم النوع لأنه معروف.`,
            "حالة التحميل.",
            R`[[let items]] بيفك الـ array، و [[where]] شرط.`,
            R`أي loaded تاني.`,
            R`بيفك الرسالة.`,
            "قفلة الـ switch.",
            "قفلة الدالة.",
            "بنحمّل.",
            "لقينا 2.",
            "مفيش نتايج.",
            "رسالة المشكلة.",
            R`enum بـ raw value [[String]] و [[CaseIterable]].`,
            R`تلات حالات. الـ rawValue بيبقى اسم الحالة نفسه.`,
            "computed property جوه الـ enum.",
            R`switch على [[self]].`,
            "مجاني.",
            "سعر.",
            "سعر.",
            "قفلة الـ switch.",
            "قفلة الـ property.",
            "قفلة الـ enum.",
            R`[[allCases]] جاية من CaseIterable.`,
            "الاسم والسعر.",
            "قفلة.",
            R`[[rawValue:]] بترجّع optional: pro موجودة، gold لأ.`
          ],
          sol: R`لما تضيف [[case offline]]: [[switch must be exhaustive]] ومعاه [[add missing case: '.offline']]. وده بالظبط الأمان اللي عايزه.

ناتج المثال:`,
          solCode: R`بنحمّل...
لقينا 2
مفيش نتايج
حصلت مشكلة: مفيش نت
free 0
pro 99
team 299
99 nil`
        },
        {
          cmd: "protocols و extensions",
          title: "protocol زي عقد بيقول النوع لازم يعمل إيه، و extension تضيف بيها لأي نوع حتى لو مش بتاعك",
          desc: R`[[protocol]] بيوصف مجموعة متطلبات (properties و methods) من غير تنفيذ. أي struct أو class أو enum يقدر يتبعه (conform) وينفذ المتطلبات: [[struct Circle: Shape]]. والـ [[:]] هنا معناها «بيتبع». (Java و C# بيسموها interface).

[[extension]] بتضيف methods و computed properties لنوع موجود، حتى لو مش انت اللي كاتبه: [[extension String { var isEmail: Bool { ... } }]]. وكمان بتستخدم لتقسيم الكود: الـ struct في حتة، وتنفيذ كل protocol في extension لوحده.

protocol extension: تقدر تدّي تنفيذ افتراضي لـ method في الـ protocol، فكل اللي بيتبعه ياخدها ببلاش.

protocols مهمة جاهزة هتقابلها كل يوم:
• [[Equatable]]: يقبل [[==]]. • [[Hashable]]: ينفع يبقى مفتاح dictionary أو في Set. • [[Comparable]]: يقبل [[<]] فينفع [[sorted()]]. • [[Codable]]: يتحول من وإلى JSON. • [[Identifiable]]: ليه [[id]] (لازم لـ SwiftUI List). • [[CustomStringConvertible]]: بيحدد شكل الطباعة.
وللـ structs، Swift بتكتب [[Equatable]] و [[Hashable]] و [[Codable]] لوحدها لو كل الـ properties بتتبعهم.

[[any Shape]] معناها «أي قيمة بتتبع Shape» (صندوق ممكن يشيل أنواع مختلفة)، و [[some Shape]] معناها «نوع واحد محدد بيتبع Shape بس مش هقولك هو إيه» (هتشوفها في [[some View]]).`,
          example: R`protocol Shape {
  var area: Double { get }
  func describe() -> String
}
extension Shape {
  func describe() -> String {
    "مساحة: \(area)"
  }
}
struct Square: Shape {
  let side: Double
  var area: Double { side * side }
}
struct Circle: Shape {
  let radius: Double
  var area: Double { (Double.pi * radius * radius).rounded() }
  func describe() -> String { "دايرة مساحتها \(area)" }
}
let shapes: [any Shape] = [Square(side: 3), Circle(radius: 2)]
for s in shapes {
  print(s.describe())
}
extension Int {
  var isEven: Bool { self % 2 == 0 }
}
print(4.isEven, 7.isEven)
struct Version: Comparable {
  let major: Int
  static func < (a: Version, b: Version) -> Bool { a.major < b.major }
}
print(Version(major: 2) < Version(major: 5), Version(major: 3) == Version(major: 3))`,
          try: R`اعمل [[struct Rectangle: Shape]] بعرض وطول، ومتكتبش [[describe]] فيه، وضيفه للـ array. وبعدين اعمل extension على [[String]] فيها [[var isBlank: Bool]] بترجّع true لو النص فاضي أو مسافات بس (استخدم [[trimmingCharacters(in: .whitespaces)]] ومعاها [[import Foundation]]).`,
          flag: "script",
          deep: {
            why: R`Swift بيسموها «protocol-oriented language»: بدل شجرة وراثة كبيرة (Animal ← Dog ← Puppy)، بتعرّف قدرات صغيرة (protocols) وكل نوع ياخد اللي محتاجه، حتى الـ structs والـ enums اللي مبتورثش. و SwiftUI كلها مبنية كده: [[View]] protocol، وكل شاشة struct بتتبعه.`,
            how: R`[[{ get }]] في الـ protocol معناها «لازم تتقري» (ممكن تبقى stored أو computed). [[{ get set }]] معناها لازم تتقري وتتكتب.

[[Version]] اتبع [[Comparable]] وكتبنا [[<]] بس، و [[==]] اتعملت لوحدها (Comparable بيورث Equatable، و Swift بتكتب [[==]] للـ struct تلقائيًا)، و [[>]] و [[<=]] جاية من protocol extension جاهز.

[[any Shape]] بيحط كل قيمة في صندوق (existential)، والنداء بيروح للنوع الحقيقي وقت التشغيل. [[some]] و الـ generics (الدرس الجاي) بيخلوا الـ compiler يعرف النوع الحقيقي، وده أسرع. ومن Swift 6 لازم تكتب [[any]] صريحة في أماكن كتير.`,
            when: R`protocol لما عندك أكتر من نوع بيعمل نفس الحاجة (مصادر داتا: API حقيقي و fake للاختبار). extension لتنظيم الكود ولإضافة helpers على أنواع النظام. واتبع [[Equatable]] و [[Hashable]] و [[Codable]] و [[Identifiable]] لأي model.`,
            mistakes: R`تعمل protocol لكل class «احتياطي» حتى لو مفيش غير تنفيذ واحد. وتضيف extensions على [[String]] لكل حاجة لحد ما النوع يتملي helpers. وتحط stored property في extension: مينفعش ([[extensions must not contain stored properties]]).`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف عقد [[Shape]] (لازم يبقى ليه مساحة ووصف)، ويدّي وصف افتراضي، ويعمل شكلين بيتبعوه، ويلف عليهم في array واحدة. وبعدين يضيف property جديدة لـ [[Int]] بتاع Swift، ويعمل نوع بيتقارن بـ [[<]]. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. [[protocol Shape]]

~~~swift
protocol Shape {
  var area: Double { get }
  func describe() -> String
}
~~~

- [[protocol]]: قايمة متطلبات من غير تنفيذ.
- [[var area: Double { get }]]: أي نوع بيتبع Shape لازم يبقى عنده [[area]] تتقري. [[{ get }]] = قراية بس مطلوبة (ممكن تبقى stored أو computed).
- [[func describe() -> String]]: لازم method بالتوقيع ده. من غير جسم [[{ }]].

---

## ٢. protocol extension: تنفيذ افتراضي

~~~swift
extension Shape {
  func describe() -> String {
    "مساحة: \(area)"
  }
}
~~~

[[extension]] بتضيف كود لنوع موجود. هنا بنضيف **تنفيذ** لـ [[describe]] على مستوى الـ protocol، فأي نوع بيتبع Shape ومكتبش describe ياخد ده.

---

## ٣. [[Square]]: بيتبع وياخد الافتراضي

~~~swift
struct Square: Shape {
  let side: Double
  var area: Double { side * side }
}
~~~

- [[: Shape]] = «بيتبع (conforms to) الـ protocol». الـ compiler هيتأكد إن كل المتطلبات موجودة.
- [[area]] computed. و [[describe]] مش مكتوبة، فهتيجي من الـ extension.

---

## ٤. [[Circle]]: بيكتب نسخته

~~~swift
struct Circle: Shape {
  let radius: Double
  var area: Double { (Double.pi * radius * radius).rounded() }
  func describe() -> String { "دايرة مساحتها \(area)" }
}
~~~

- [[Double.pi]]: ثابت ط (3.14159...). π × 2 × 2 = 12.566...، و [[rounded()]] = **13.0**.
- كتب [[describe]] بتاعه، فبتغطي على الافتراضية.

---

## ٥. [[any Shape]]: أنواع مختلفة في array واحدة

~~~swift
let shapes: [any Shape] = [Square(side: 3), Circle(radius: 2)]
for s in shapes {
  print(s.describe())
}
~~~

- array عادي لازم كل عناصره نوع واحد. [[[any Shape]]] معناها «أي قيمة بتتبع Shape»، فينفع Square و Circle مع بعض.
- [[s.describe()]] بتنادي نسخة النوع الحقيقي وقت التشغيل.

~~~text الناتج
مساحة: 9.0
دايرة مساحتها 13.0
~~~

3 × 3 = 9 بالوصف الافتراضي، والدايرة بوصفها.

---

## ٦. extension على [[Int]]

~~~swift
extension Int {
  var isEven: Bool { self % 2 == 0 }
}
print(4.isEven, 7.isEven)
~~~

[[Int]] نوع من Swift نفسها، ومع ذلك ضفنا عليه computed property. [[self]] هنا = الرقم نفسه. فبقى [[4.isEven]] شغال في البرنامج كله.

~~~text الناتج
true false
~~~

ولو حاولت تحط stored property في extension (جربنا [[var cache: Int = 0]] جوه [[extension Int]]):

~~~text الناتج
main.swift:6:21: error: extensions must not contain stored properties
~~~

الـ extension مينفعش يغيّر حجم النوع في الذاكرة، فـ computed بس.

---

## ٧. [[Comparable]]: تكتب [[<]] بس

~~~swift
struct Version: Comparable {
  let major: Int
  static func < (a: Version, b: Version) -> Bool { a.major < b.major }
}
print(Version(major: 2) < Version(major: 5), Version(major: 3) == Version(major: 3))
~~~

- [[Comparable]] بيطلب دالة [[<]]. والـ operators في Swift دوال [[static]] اسمها الرمز نفسه: [[static func < (a: Version, b: Version) -> Bool]].
- [[==]] مكتبناهاش: [[Comparable]] بيورث [[Equatable]]، و Swift بتكتب [[==]] للـ struct لوحدها (بتقارن كل الـ properties).
- و [[>]] و [[<=]] و [[>=]] جاهزين من الـ standard library على أساس [[<]].

~~~text الناتج
true true
~~~

---

## ٨. حل التجربة

~~~swift
import Foundation

struct Rectangle: Shape {
  let width: Double
  let height: Double
  var area: Double { width * height }
}
print(Rectangle(width: 2, height: 5).describe())

extension String {
  var isBlank: Bool {
    trimmingCharacters(in: .whitespaces).isEmpty
  }
}
print("   ".isBlank, " a ".isBlank)
~~~

~~~text الناتج
مساحة: 10.0
true false
~~~

- [[Rectangle]] مكتبش describe، فخد الافتراضية.
- [[import Foundation]]: [[trimmingCharacters]] جاية من مكتبة Foundation مش من Swift الأساسية.
- [[trimmingCharacters(in: .whitespaces)]] بتشيل المسافات من الطرفين: [["   "]] بقت [[""]] فاضية = true، و [[" a "]] بقت [["a"]] = false.

---

## الخلاصة

| الحاجة | الشكل | فايدتها |
|---|---|---|
| عقد | [[protocol P { var x: T { get } }]] | متطلبات من غير تنفيذ |
| يتبعه | [[struct S: P]] | الـ compiler يتأكد من المتطلبات |
| تنفيذ افتراضي | [[extension P { func f() {...} }]] | كل اللي بيتبعوا ياخدوه |
| إضافة لنوع موجود | [[extension Int { var ... }]] | computed بس |
| أنواع مختلفة مع بعض | [[[any P]]] | |
| مقارنة | [[Comparable]] + [[static func <]] | [[==]] و [[>]] ببلاش |`,
          lines: [
            R`[[protocol]]: عقد.`,
            R`لازم property [[area]] تتقري.`,
            "ولازم method describe.",
            "قفلة.",
            R`[[extension]] على الـ protocol: تنفيذ افتراضي.`,
            "describe الافتراضية.",
            "بتستخدم area اللي كل نوع هيوفرها.",
            "قفلة الدالة.",
            "قفلة الـ extension.",
            R`[[: Shape]] يعني بيتبع الـ protocol.`,
            "property عادية.",
            R`[[area]] computed، ومش كاتبين describe فهياخد الافتراضية.`,
            "قفلة.",
            "نوع تاني بيتبع Shape.",
            "نصف القطر.",
            R`[[Double.pi]] ثابت باي، و [[rounded()]] للتقريب.`,
            "بيكتب describe بتاعته بدل الافتراضية.",
            "قفلة.",
            R`[[any Shape]]: array فيها أنواع مختلفة بتتبع نفس الـ protocol.`,
            "بنلف عليهم.",
            "كل واحد بينادي describe بتاعته.",
            "قفلة.",
            R`extension على [[Int]] بتاع Swift نفسها.`,
            R`[[self]] هنا الرقم نفسه.`,
            "قفلة.",
            R`[[4.isEven]] بقت متاحة لأي Int.`,
            R`struct بيتبع [[Comparable]].`,
            "رقم الإصدار.",
            R`بنكتب [[<]] بس كـ static function.`,
            "قفلة.",
            R`[[<]] من كتابتنا و [[==]] اتعملت لوحدها.`
          ],
          sol: R`ناتج المثال:
[[مساحة: 9.0]]
[[دايرة مساحتها 13.0]]
[[true false]]
[[true true]]

الحل:`,
          solCode: R`import Foundation

struct Rectangle: Shape {
  let width: Double
  let height: Double
  var area: Double { width * height }
}
print(Rectangle(width: 2, height: 5).describe())
// مساحة: 10.0

extension String {
  var isBlank: Bool {
    trimmingCharacters(in: .whitespaces).isEmpty
  }
}
print("   ".isBlank, " a ".isBlank)
// true false`
        },
        {
          cmd: "الـ generics",
          title: "generics: تكتب دالة أو نوع واحد يشتغل مع أي نوع، وتحط عليه شروط بـ where و some",
          desc: R`الـ generics بتخليك تكتب كود مرة واحدة يشتغل مع أنواع كتير من غير ما تخسر أمان الأنواع. انت استخدمتها من غير ما تاخد بالك: [[Array<Int>]] (اللي بتتكتب [[[Int]]]) و [[Dictionary<String, Int>]] و [[Optional<String>]] كلهم generic types.

دالة generic: [[func firstOrDefault<T>(_ items: [T], _ fallback: T) -> T]]. الـ [[<T>]] بعد الاسم معناها «فيه نوع اسمه T هيتحدد لما حد ينادي». لو ناديتها بـ [[[Int]]] يبقى T = Int، وبـ [[[String]]] يبقى T = String. والاسم [[T]] عادة، بس ينفع أي اسم ([[Element]] و [[Value]]).

الشروط (constraints): [[<T: Comparable>]] يعني T لازم يتبع Comparable، فتقدر تستخدم [[<]] جواها. أو بـ [[where]] بعد التوقيع: [[where T: Equatable]].

نوع generic: [[struct Stack<Element> { var items: [Element] }]].

[[some Protocol]] في الـ parameter اختصار للـ generic: [[func printAll(_ items: some Collection)]] نفس [[func printAll<C: Collection>(_ items: C)]]. وفي الـ return type معناها «هرجّع نوع واحد محدد بيتبع الـ protocol»، وده بالظبط [[some View]] في SwiftUI.`,
          example: R`func largest<T: Comparable>(_ items: [T]) -> T? {
  guard var best = items.first else { return nil }
  for item in items where item > best {
    best = item
  }
  return best
}
print(largest([3, 9, 2]) ?? 0)
print(largest(["موز", "تفاح", "مانجا"]) ?? "")
print(largest([Double]()) as Any)
struct Stack<Element> {
  private var items: [Element] = []
  mutating func push(_ item: Element) { items.append(item) }
  mutating func pop() -> Element? { items.popLast() }
  var isEmpty: Bool { items.isEmpty }
}
var history = Stack<String>()
history.push("الرئيسية")
history.push("المنتج")
print(history.pop() ?? "-", history.isEmpty)
func countMatches(in items: some Collection<String>, prefix: String) -> Int {
  items.filter { $0.hasPrefix(prefix) }.count
}
print(countMatches(in: ["swift", "swiftui", "kotlin"], prefix: "swift"))`,
          try: R`نادي [[largest]] على array من struct بتاعك مش [[Comparable]] وشوف الخطأ. وبعدين ضيف [[var peek: Element?]] لـ [[Stack]] بترجّع آخر عنصر من غير ما تشيله.`,
          flag: "script",
          deep: {
            why: R`من غير generics كنت هتكتب [[largestInt]] و [[largestString]] و [[largestDouble]]، أو تستخدم نوع عام زي [[Any]] وتخسر الأمان (تحط Int وتطلع String). الـ generics بتديك الاتنين: كود واحد، والـ compiler عارف النوع بالظبط.`,
            how: R`الـ compiler بيعمل specialization: بيولّد نسخة من الدالة لكل نوع بتستخدمه (لما يقدر)، فالأداء زي ما تكون كاتبها بإيدك. [[Stack<String>()]] بيحدد Element صريح. و [[popLast()]] بترجّع optional عشان الـ array ممكن تبقى فاضية.

[[some Collection<String>]] بيستخدم primary associated type: [[Collection]] ليها نوع عنصر اسمه [[Element]]، والـ [[<String>]] بيحدده. ينفع تبعت Array أو Set أو أي collection فيها String.`,
            when: R`لما تلاقي نفسك بتكتب نفس الدالة لأكتر من نوع. في التطبيقات هتستخدمها أكتر من ما تكتبها: [[[Item]]] و [[Result<Data, Error>]] و [[Binding<String>]]. وأشهر مكان تكتب فيه generic: network layer بيعمل decode لأي نوع [[Decodable]] ([[func get<T: Decodable>(_ url: URL) async throws -> T]]).`,
            mistakes: R`تعمل كل حاجة generic من أول يوم قبل ما يبقى عندك حالتين حقيقيتين. وتنسى الـ constraint فتحاول تستخدم [[>]] على T عادي ([[binary operator '>' cannot be applied to two 'T' operands]]). وتخلط بين [[some]] (نوع واحد ثابت) و [[any]] (صندوق لأي نوع).`
          },
          teach: R`## البرنامج بيعمل إيه؟

٣ حاجات generic: دالة [[largest]] بتجيب أكبر عنصر في أي array نوعها بيتقارن، ونوع [[Stack]] بيشيل أي نوع، ودالة بتاخد أي collection فيها نصوص بـ [[some]]. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. توقيع [[largest]]

~~~swift
func largest<T: Comparable>(_ items: [T]) -> T? {
~~~

| الحتة | معناها |
|---|---|
| [[<T: Comparable>]] | فيه نوع اسمه [[T]] هيتحدد عند النداء، بشرط يتبع [[Comparable]] (يقبل [[<]] و [[>]]) |
| [[_ items: [T]]] | array من النوع ده |
| [[-> T?]] | بترجّع عنصر من نفس النوع، أو nil |

الـ [[T]] (Type) اسم متعارف عليه، وينفع أي اسم.

---

## ٢. جسم [[largest]]

~~~swift
  guard var best = items.first else { return nil }
  for item in items where item > best {
    best = item
  }
  return best
}
~~~

- [[guard var]]: زي [[guard let]] بس الناتج [[var]] عشان هنغيّره. لو الـ array فاضية [[first]] = nil، فنرجّع nil.
- [[where item > best]]: لف بس على العناصر الأكبر من الأفضل الحالي، وحدّث.
- [[item > best]] مسموحة **بس** عشان [[T: Comparable]]. شلنا الشرط وكتبنا [[<T>]] بس:

~~~text الناتج
main.swift:3:32: error: binary operator '>' cannot be applied to two 'T' operands
~~~

يعني: [[T]] ممكن يبقى أي نوع، ومش كل الأنواع فيها [[>]].

---

## ٣. نداء بأنواع مختلفة

~~~swift
print(largest([3, 9, 2]) ?? 0)
print(largest(["موز", "تفاح", "مانجا"]) ?? "")
print(largest([Double]()) as Any)
~~~

- الأول: Swift استنتجت [[T = Int]]: **9**.
- التاني: [[T = String]]، والمقارنة أبجدية: الحرف الأول ت ثم م ثم م، و «موز» بعد «مانجا» لأن تاني حرف و بعد ا. فـ **موز**.
- [[[Double]()]]: array فاضية من Double (الأقواس [[()]] بتعمل instance جديد فاضي). [[T = Double]] والنتيجة **nil**.

---

## ٤. [[Stack<Element>]]: نوع generic

~~~swift
struct Stack<Element> {
  private var items: [Element] = []
  mutating func push(_ item: Element) { items.append(item) }
  mutating func pop() -> Element? { items.popLast() }
  var isEmpty: Bool { items.isEmpty }
}
~~~

- [[<Element>]] بعد اسم الـ struct: نوع العناصر بيتحدد لما تعمل Stack.
- [[private var items]]: الـ array الداخلية محدش برة يلمسها، فالطريقة الوحيدة [[push]] و [[pop]].
- [[popLast()]]: بتشيل آخر عنصر وترجّعه، أو nil لو فاضية. (Stack = آخر حاجة دخلت أول حاجة تطلع، زي زرار Back في المتصفح).
- [[mutating]] لأنهم بيعدّلوا الـ struct.

~~~swift
var history = Stack<String>()
history.push("الرئيسية")
history.push("المنتج")
print(history.pop() ?? "-", history.isEmpty)
~~~

[[Stack<String>()]]: حددنا [[Element = String]] صريح (مفيش قيمة يتستنتج منها). [[pop]] رجّع آخر واحد **المنتج**، ولسه فيه «الرئيسية» فـ [[isEmpty]] = **false**.

---

## ٥. [[some Collection<String>]]

~~~swift
func countMatches(in items: some Collection<String>, prefix: String) -> Int {
  items.filter { $0.hasPrefix(prefix) }.count
}
print(countMatches(in: ["swift", "swiftui", "kotlin"], prefix: "swift"))
~~~

- [[some Collection<String>]]: «أي نوع collection عناصره String» (Array أو Set أو غيرهم). ده اختصار لـ [[func countMatches<C: Collection>(...) where C.Element == String]].
- [[hasPrefix(prefix)]]: النص بيبدأ بكده؟ swift و swiftui أيوه: **2**.

~~~text الناتج كله
9
موز
nil
المنتج false
2
~~~

---

## ٦. التجربة

**نوع مش Comparable** ([[struct Box { let v: Int }]] و [[largest([Box(v: 1)])]]):

~~~text الناتج
main.swift:26:7: error: global function 'largest' requires that 'Box' conform to 'Comparable'
~~~

ومعاه [[note: where 'T' = 'Box']]: الـ compiler بيقولك T اتحدد إيه وليه مش نافع.

**الحل: [[peek]]** جوه [[struct Stack]]:

~~~swift
var peek: Element? { items.last }
~~~

ضفناها ونادينا [[history.peek]] بعد الـ pop: طبعت **الرئيسية**، والعنصر فضل مكانه.

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[func f<T>(_ x: T)]] | دالة لأي نوع |
| [[<T: Comparable>]] | بشرط النوع يتبع protocol |
| [[struct Box<Element>]] | نوع generic |
| [[Stack<String>()]] | تحديد النوع صريح |
| [[some Collection<String>]] | أي collection من String (اختصار generic) |

[[Array]] و [[Dictionary]] و [[Optional]] نفسهم generics: [[[Int]]] = [[Array<Int>]].`,
          lines: [
            R`[[<T: Comparable>]]: T أي نوع بيتقارن. والدالة بترجّع [[T?]].`,
            R`[[guard var]]: لو الـ array فاضية نرجّع nil.`,
            R`بنلف على العناصر الأكبر من الأفضل الحالي.`,
            "بنحدّث الأفضل.",
            "قفلة.",
            "بنرجّعه.",
            "قفلة.",
            "T = Int، بيطبع 9.",
            "T = String، بالترتيب الحرفي.",
            R`[[[Double]()]] array فاضية من Double، فبترجّع nil.`,
            R`نوع generic: [[Element]] هيتحدد عند الاستخدام.`,
            R`[[private]]: محدش برة يلمس الـ array.`,
            "push بتضيف.",
            R`pop بترجّع optional.`,
            "computed.",
            "قفلة.",
            R`Stack بـ Element = String.`,
            "push.",
            "push.",
            "بيطبع المنتج false.",
            R`[[some Collection<String>]]: أي collection فيها String.`,
            R`[[hasPrefix]] بتشيك بداية النص.`,
            "قفلة.",
            "بيطبع 2."
          ],
          sol: R`لو struct مش Comparable: [[global function 'largest' requires that 'X' conform to 'Comparable']].

ناتج المثال: [[9]] ثم [[موز]] (بالترتيب الحرفي: موز بعد مانجا لأن الواو بعد الألف، والاتنين بعد تفاح) ثم [[nil]] ثم [[المنتج false]] ثم [[2]].

الـ peek:`,
          solCode: R`// جوه struct Stack
var peek: Element? { items.last }`
        }
      ]
    }
]);

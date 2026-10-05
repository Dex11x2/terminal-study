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
    },
    {
      t: "الأخطاء والتنظيم والذاكرة",
      l: 1,
      n: "throws و try و do/catch و Result، والـ access control، و ARC و weak و retain cycles",
      items: [
        {
          cmd: "الأخطاء throws و do catch",
          title: "تتعامل مع الأخطاء بـ throws و try و do/catch، وإمتى try? و try! و Result",
          desc: R`لما دالة ممكن تفشل لسبب متوقع (ملف مش موجود، JSON بايظ، باسورد ضعيف)، بتعلّمها بـ [[throws]] وبترمي (throw) error. الـ error أي نوع بيتبع protocol [[Error]]، وغالبًا enum.

اللي بينادي دالة [[throws]] لازم يكتب [[try]] قبلها (عشان يبان إن السطر ده ممكن يفشل)، ويتعامل مع الفشل بطريقة من دول:
1. [[do { try ... } catch { ... }]]: بيمسك الخطأ. وجوه [[catch]] فيه متغير جاهز اسمه [[error]]. وتقدر تعمل كذا [[catch]] لكل حالة: [[catch PasswordError.tooShort { }]].
2. [[try?]]: لو فشل يرجّع [[nil]] (والنتيجة بتبقى optional). سهل بس بيضيّع سبب الخطأ.
3. [[try!]]: «متأكد إنها مش هتفشل». لو فشلت = crash. زي [[!]] بالظبط.
4. تخلي دالتك نفسها [[throws]] وتسيب الخطأ يطلع لفوق.

من Swift 6 فيه typed throws: [[throws(PasswordError)]] بيحدد نوع الخطأ بالظبط، فـ [[error]] جوه catch بيبقى من النوع ده مش [[any Error]].

[[Result<Success, Failure>]] enum فيه [[.success(value)]] و [[.failure(error)]]، مفيد لما تخزن نتيجة أو تبعتها لـ closure. وبعد async/await بقى استخدامه أقل.

[[throw]] بيخرج من الدالة فورًا زي [[return]]. و [[defer { }]] كود بيتنفذ عند الخروج من الـ scope مهما حصل (حتى لو اترمى error)، مفيد للتنضيف.`,
          example: R`enum PasswordError: Error {
  case tooShort(min: Int)
  case noDigits
}
func validate(_ password: String) throws(PasswordError) -> String {
  guard password.count >= 8 else {
    throw .tooShort(min: 8)
  }
  guard password.contains(where: \.isNumber) else {
    throw .noDigits
  }
  return "باسورد قوي"
}
for p in ["abc", "abcdefgh", "abcdefg1"] {
  do {
    let result = try validate(p)
    print(p, "→", result)
  } catch .tooShort(let min) {
    print(p, "→ لازم \(min) حروف على الأقل")
  } catch {
    print(p, "→ خطأ:", error)
  }
}
let maybe = try? validate("123")
print(maybe as Any)
let result = Result { try validate("swift2026") }
switch result {
case .success(let msg): print("Result:", msg)
case .failure(let err): print("Result فشل:", err)
}`,
          try: R`اكتب [[let x = validate("abc")]] من غير [[try]] وشوف الخطأ. وبعدين جرّب [[try! validate("abc")]] وشوف الـ crash. وضيف case [[noUppercase]] واكتب لها guard.`,
          flag: "script",
          deep: {
            why: R`في JS ممكن أي دالة ترمي exception ومحدش يعرف. في Swift [[throws]] جزء من توقيع الدالة، و [[try]] إجباري عند النداء، فانت شايف كل سطر ممكن يفشل وانت بتقرا. ومفيش exceptions مخفية.`,
            how: R`الـ errors في Swift مش exceptions تقيلة بـ stack unwinding: هي قيمة بترجع بطريقة خاصة، فالأداء قريب من return عادي. [[catch .tooShort(let min)]] pattern matching زي switch. والـ [[catch]] الأخير من غير pattern بيمسك أي حاجة باقية.

[[Result { try ... }]] initializer بيحوّل نداء throws لـ Result. و [[result.get()]] بيرجّعه throws تاني.

typed throws (Swift 6) مفيدة في الكود الداخلي والمكتبات الصغيرة. أغلب كود Apple لسه بيرمي [[any Error]]، فـ [[throws]] العادي هو الافتراضي المعقول.`,
            when: R`[[throws]] للفشل المتوقع اللي اللي بينادي ممكن يتعامل معاه (validation، شبكة، parsing). [[try?]] لما الفشل مش مهم سببه (قراية cache). [[try!]] تقريبًا أبدًا. والأخطاء البرمجية (bug) مش errors: استخدم [[precondition]] أو [[fatalError]].`,
            mistakes: R`تمسك كل حاجة بـ [[catch {}]] فاضي فالخطأ يختفي ومتعرفش التطبيق مش شغال ليه. وتستخدم [[try?]] في كل حتة فتخسر رسالة الخطأ اللي كانت هتقولك المشكلة. وتعرض [[error]] للمستخدم كما هو ([[noDigits]]): اعمل رسالة مفهومة.`
          },
          lines: [
            R`enum بيتبع [[Error]] فينفع يترمي.`,
            R`حالة بقيمة مرفقة.`,
            "حالة تانية.",
            "قفلة.",
            R`[[throws(PasswordError)]]: typed throws، الخطأ من النوع ده بس.`,
            "لازم 8 حروف.",
            R`[[throw]] بيخرج فورًا. [[.tooShort]] من غير اسم النوع لأنه معروف.`,
            "قفلة.",
            R`[[\.isNumber]] key path على كل حرف.`,
            "خطأ تاني.",
            "قفلة.",
            "لو عدّى الاتنين.",
            "قفلة الدالة.",
            "بنجرب 3 باسوردات.",
            R`[[do]] بلوك فيه كود ممكن يفشل.`,
            R`[[try]] إجباري قبل الدالة.`,
            "لو نجح.",
            R`[[catch]] لحالة معينة وبنفك القيمة.`,
            "الرسالة.",
            R`[[catch]] لأي حاجة تانية، و [[error]] متغير جاهز.`,
            "الرسالة.",
            "قفلة do/catch.",
            "قفلة الـ loop.",
            R`[[try?]]: لو فشل nil.`,
            "بيطبع nil.",
            R`[[Result { }]] بيحوّل النداء لـ Result.`,
            "switch على الـ Result.",
            "النجاح.",
            "الفشل.",
            "قفلة."
          ],
          sol: R`من غير [[try]]: [[call can throw but is not marked with 'try']].
و [[try!]] على باسورد غلط: [[Fatal error: 'try!' expression unexpectedly raised an error]] ومعاه نوع الخطأ.

ناتج المثال:`,
          solCode: R`abc → لازم 8 حروف على الأقل
abcdefgh → خطأ: noDigits
abcdefg1 → باسورد قوي
nil
Result: باسورد قوي`
        },
        {
          cmd: "access control",
          title: "private و fileprivate و internal و public: مين يقدر يشوف إيه في كودك",
          desc: R`الـ access control بيحدد مين يقدر يستخدم property أو method أو نوع. من الأضيق للأوسع:

1. [[private]]: جوه نفس النوع (ونفس الـ extensions بتاعته في نفس الملف) بس.
2. [[fileprivate]]: أي حاجة في نفس الملف.
3. [[internal]]: أي حاجة في نفس الـ module (التطبيق كله أو الـ package). ده الافتراضي لو مكتبتش حاجة.
4. [[package]]: (Swift 5.9) أي module في نفس الـ Swift package.
5. [[public]]: أي module تاني يقدر يستخدمه، بس مينفعش يورث منه أو يعمل override.
6. [[open]]: زي public وكمان يتورث ويتعمل override (للـ classes).

[[private(set)]] (شفتها قبل كده): القراية بالمستوى العادي والكتابة private. ده أشهر استخدام: الـ state تقدر تتقري من برة بس تتغير من methods النوع بس.

في تطبيق iOS عادي، كل الكود module واحد، فهتستخدم [[private]] كتير و [[internal]] الافتراضي. و [[public]] و [[open]] لما تعمل framework أو Swift package حد تاني هيستخدمه.

وفي SwiftUI القاعدة: [[@State private var]] دايمًا private.`,
          example: R`struct BankAccount {
  let owner: String
  private(set) var balance: Double = 0
  private var history: [String] = []
  init(owner: String) {
    self.owner = owner
  }
  mutating func deposit(_ amount: Double) {
    guard isValid(amount) else { return }
    balance += amount
    history.append("+\(amount)")
  }
  var lastAction: String { history.last ?? "مفيش" }
  private func isValid(_ amount: Double) -> Bool {
    amount > 0
  }
}
var account = BankAccount(owner: "منى")
account.deposit(500)
account.deposit(-20)
print(account.balance, account.lastAction)`,
          try: R`جرّب [[account.balance = 1_000_000]] و [[account.history]] و [[account.isValid(5)]] من برة الـ struct. اقرا الأخطاء. ليه منطقي إن الرصيد ميتغيرش إلا من [[deposit]]؟`,
          flag: "script",
          deep: {
            why: R`الـ access control مش أمان ضد الهاكرز (الكود بيتفك برضه)، ده أمان ضد الأخطاء: لو [[balance]] ينفع يتعدل من أي حتة، مفيش ضمان إن الـ validation اتعمل. لما تقفله، كل التعديلات بتعدي على method واحدة فيها القواعد. وبيخلي الـ API بتاع النوع صغير وواضح: اللي مش private هو اللي المفروض تستخدمه.`,
            how: R`الـ module في Swift = target بيتبني لوحده (التطبيق، framework، package target). [[internal]] الافتراضي معناه كل ملفات التطبيق شايفة بعض من غير import. و [[@testable import MyApp]] في الاختبارات بيفتح الـ internal للاختبار.

لاحظ الـ [[init]] اللي كتبناه: لو الـ struct فيه أي stored property [[private]]، الـ memberwise init الجاهز بيبقى [[private]] هو كمان (حتى لو الـ property ليها قيمة افتراضية)، فمحدش برة يقدر يعمل object. جرّب تمسح الـ init وهتلاقي: [['BankAccount' initializer is inaccessible due to 'private' protection level]]. الحل إنك تكتب [[init]] بنفسك بالمستوى اللي عايزه.`,
            when: R`خلي أي حاجة [[private]] لحد ما حاجة برة تحتاجها فعلًا. و [[private(set)]] لأي state ليها قواعد تغيير. و [[public]] بس في الـ packages اللي بتتشارك.`,
            mistakes: R`تسيب كل حاجة internal لأنه الافتراضي، فكل ملف في التطبيق يقدر يعدّل كل حاجة. وتعمل [[@State]] من غير [[private]] فحد يحاول يبعتلها قيمة من برة (مش هتشتغل زي ما يتوقع). وتنسى إن [[private]] بتسمح للـ extension في نفس الملف بس.`
          },
          lines: [
            "struct لحساب بنكي.",
            "المالك، ثابت.",
            R`[[private(set)]]: الكل يقرا، التعديل من جوه بس.`,
            R`[[private]]: محدش برة يشوفها خالص.`,
            R`[[init]] مكتوب بإيدنا. من غيره الـ memberwise init هيبقى private (شوف تحت).`,
            "بنحط المالك، والباقي ليه قيم افتراضية.",
            "قفلة.",
            "الطريقة الوحيدة لتزويد الرصيد.",
            "validation قبل أي تعديل.",
            "تعديل مسموح من جوه.",
            "تسجيل في السجل.",
            "قفلة.",
            "computed بتعرض حاجة محدودة من السجل.",
            R`method private: helper داخلي.`,
            "الشرط.",
            "قفلة.",
            "قفلة الـ struct.",
            R`الـ init بتاعنا بياخد [[owner]] بس.`,
            "إيداع سليم.",
            "سالب فهيترفض بهدوء.",
            "بيطبع 500.0 +500.0."
          ],
          sol: R`الأخطاء:
[[account.balance = ...]] ← [[cannot assign to property: 'balance' setter is inaccessible]]
[[account.history]] ← [['history' is inaccessible due to 'private' protection level]]
[[account.isValid(5)]] ← [['isValid' is inaccessible due to 'private' protection level]]

وده منطقي: لو الرصيد يتعدل من برة، ممكن أي حتة في التطبيق تحط رقم سالب أو تنسى تسجل العملية في السجل. كده كل تعديل لازم يعدي على [[deposit]] اللي فيها القواعد.

ناتج المثال: [[500.0 +500.0]]`
        },
        {
          cmd: "ARC و weak و retain cycles",
          title: "Swift بتمسح الـ objects إمتى (ARC)، و retain cycle بيعمل memory leak إزاي، و weak و unowned و [weak self]",
          desc: R`Swift مفيهاش garbage collector زي Java و JS. بدل كده بتستخدم ARC (Automatic Reference Counting): كل object من class ليه عداد بعدد الـ references القوية (strong) اللي ماسكاه. لما العداد يوصل صفر، الـ object بيتمسح فورًا، و [[deinit]] بتاعه بيتنادى. (الـ structs والـ enums مش داخلين في ده، دي values).

المشكلة: retain cycle. لو object A ماسك B بقوة، و B ماسك A بقوة، العداد بتاع الاتنين عمره ما هيوصل صفر حتى لو محدش تاني محتاجهم. ده memory leak: ذاكرة محجوزة لحد ما التطبيق يتقفل.

الحل: واحد من الاتنين يمسك التاني بـ [[weak]] (ضعيف): مش بيزود العداد، ولما الـ object يتمسح الـ reference بيبقى [[nil]] لوحده. عشان كده [[weak]] لازم [[var]] و optional. ([[weak var owner: Person?]]).

[[unowned]]: زي weak مش بيزود العداد، بس مش optional، ولو الـ object اتمسح ووصلت له = crash. استخدمه بس لو متأكد إن الـ object التاني هيعيش أطول.

أشهر مكان للـ cycle: closure متخزن جوه class وبيستخدم [[self]]. الـ class ماسك الـ closure، والـ closure ماسك [[self]]. الحل capture list: [[{ [weak self] in self?.doSomething() }]]. الـ [[[weak self]]] في أول الـ closure بتقول «امسك self ضعيف».`,
          example: R`final class Person {
  let name: String
  var apartment: Apartment?
  init(name: String) { self.name = name }
  deinit { print("\(name) اتمسح") }
}
final class Apartment {
  let number: Int
  weak var tenant: Person?
  init(number: Int) { self.number = number }
  deinit { print("شقة \(number) اتمسحت") }
}
var sara: Person? = Person(name: "سارة")
var flat: Apartment? = Apartment(number: 7)
sara?.apartment = flat
flat?.tenant = sara
sara = nil
flat = nil
final class Ticker {
  var onTick: (() -> Void)?
  var count = 0
  func start() {
    onTick = { [weak self] in
      self?.count += 1
    }
  }
  deinit { print("Ticker اتمسح") }
}
var t: Ticker? = Ticker()
t?.start()
t?.onTick?()
print(t?.count ?? 0)
t = nil`,
          try: R`شيل [[weak]] من [[tenant]] وشغّل: هتلاقي رسايل الـ deinit مطلعتش (leak). رجّعها، وبعدين شيل [[[weak self]]] من الـ closure واكتب [[self.count += 1]]: هل [[Ticker اتمسح]] لسه بتطلع؟`,
          flag: "script",
          deep: {
            why: R`الـ leaks في iOS بتسبب إن التطبيق ياكل ذاكرة كل ما تفتح وتقفل شاشة، ولحد ما النظام يقفله. وأسئلة ARC و [[weak self]] من أشهر أسئلة انترفيو iOS على الإطلاق. ولازم تفهمها حتى لو SwiftUI بيقلل المشكلة، لأن view models والـ closures والـ delegates لسه موجودين.`,
            how: R`ARC بيحط تعليمات retain و release وقت الـ compile، فمفيش garbage collector بيوقف التطبيق، والمسح بيحصل في لحظة معروفة. التمن إن الـ cycles مش بتتكشف لوحدها.

في المثال: [[sara]] ماسكة [[flat]] بقوة، و [[flat.tenant]] ماسك سارة weak. لما [[sara = nil]]، عداد سارة صفر فتتمسح (و [[flat.tenant]] بقت nil لوحدها). وبعدين [[flat = nil]] الشقة تتمسح.

الـ delegates في UIKit دايمًا [[weak var delegate]] لنفس السبب. و [[[weak self]]] بيخلي [[self]] جوه الـ closure optional، عشان كده [[self?.]]. وفيه شكل [[guard let self else { return }]] في أول الـ closure.

أداة Xcode «Debug Memory Graph» بتوريك الـ objects الموجودة في الذاكرة والـ cycles بينهم (درس الـ debugging).`,
            when: R`[[weak]] للـ back-references (ابن بيشاور على أب، delegate)، و [[[weak self]]] في أي closure متخزن جوه class (timers، notifications، completion handlers متخزنة). في closures مش escaping (زي [[map]]) مش محتاجها.`,
            mistakes: R`تحط [[[weak self]]] في كل closure حتى في [[map]] بدون داعي. وتستخدم [[unowned]] عشان تهرب من الـ optional وبعدين تاخد crash. وتفتكر إن SwiftUI views نفسها ممكن تعمل cycle: الـ View struct، المشكلة في الـ classes اللي وراها.`
          },
          lines: [
            "class (الـ ARC للـ classes بس).",
            "الاسم.",
            R`reference قوي للشقة.`,
            "init.",
            R`[[deinit]] بيتنادى لحظة المسح.`,
            "قفلة.",
            "class الشقة.",
            "رقم الشقة.",
            R`[[weak]]: مش بيزود العداد، و optional لأنه ممكن يبقى nil.`,
            "init.",
            "deinit.",
            "قفلة.",
            R`optional عشان نقدر نخليه nil بعدين.`,
            "شقة.",
            "سارة ماسكة الشقة بقوة.",
            "الشقة ماسكة سارة weak.",
            "مفيش strong reference لسارة، فتتمسح.",
            "والشقة كمان.",
            "class فيه closure متخزن.",
            "property بتشيل closure.",
            "عداد.",
            "method بتجهز الـ closure.",
            R`[[[weak self]]]: الـ closure ماسك self ضعيف.`,
            R`[[self?.]] لأن self بقت optional.`,
            "قفلة الـ closure.",
            "قفلة.",
            "deinit.",
            "قفلة.",
            "object.",
            "بنجهز الـ closure.",
            R`بننادي الـ closure. [[?()]] لأنه optional.`,
            "بيطبع 1.",
            "بيتمسح لأن مفيش cycle."
          ],
          sol: R`ناتج المثال:
[[سارة اتمسح]]
[[شقة 7 اتمسحت]]
[[1]]
[[Ticker اتمسح]]

من غير [[weak]] على [[tenant]]: ولا رسالة deinit بتطلع للتنين، لأن كل واحد ماسك التاني، رغم إن المتغيرين بقوا nil. ده leak.

ومن غير [[[weak self]]]: [[Ticker اتمسح]] مش بتطلع. الـ object ماسك الـ closure في [[onTick]]، والـ closure ماسك الـ object. وده نفس الـ leak بالظبط في view model بيخزن closure.`
        }
      ]
    }
]);

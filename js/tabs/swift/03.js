// تكملة تاب swift: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/swift/01.js (شرح حقول الدرس في أوله)
MORE("swift", [
    {
      t: "الـ Optionals والـ collections والـ closures",
      l: 1,
      n: "أهم فكرة في Swift: القيمة اللي ممكن متبقاش موجودة. وبعدين Array و Dictionary و Set، و map و filter، والـ closures",
      items: [
        {
          cmd: "الـ Optionals وفكها بأمان",
          title: "Optional يعني إيه، وتفكه بأمان بـ if let و ??، وليه ! خطر",
          desc: R`في Swift المتغير العادي مينفعش يبقى فاضي. [[let name: String]] لازم يبقى فيه نص. طب لو القيمة ممكن متبقاش موجودة؟ (المستخدم مكتبش اسمه، أو البحث ملقاش حاجة). هنا بتستخدم Optional: تحط [[?]] بعد النوع: [[String?]]. ومعناها «يا String يا [[nil]]». و [[nil]] معناها «مفيش قيمة».

الـ Optional زي علبة مقفولة: ممكن يبقى جواها قيمة، وممكن تبقى فاضية. ومينفعش تستخدم اللي جواها على طول: [[name.count]] على [[String?]] خطأ compile. لازم تفتح العلبة (unwrap) الأول:

1. [[if let]]: [[if let name = optionalName { ... }]]. لو فيه قيمة بتتحط في [[name]] (نوعها [[String]] عادي) والبلوك يتنفذ. ومن Swift 5.7 فيه اختصار: [[if let name { }]] لما الاسم واحد.
2. [[??]] (nil-coalescing): [[optionalName ?? "ضيف"]]. لو فيه قيمة خدها، لو nil خد القيمة الافتراضية. الناتج دايمًا مش optional.
3. [[!]] (force unwrap): [[optionalName!]] معناها «أنا متأكد إن فيه قيمة، افتحها». لو طلعت nil البرنامج بيقع (crash) فورًا. استخدمه بس لما تكون متأكد 100% ومتقدرش تثبت ده للـ compiler.

[[Int("42")]] بترجّع [[Int?]] لأن التحويل ممكن يفشل، و [[array.first]] بترجّع optional لأن الـ array ممكن تبقى فاضية. هتقابل optionals في كل حتة.`,
          example: R`// ? بعد النوع: يا String يا nil
var bio: String? = nil
// ?? قيمة افتراضية لو nil
print(bio ?? "لسه مفيش نبذة")
bio = "مطورة iOS"
// if let بيفك الـ optional لو فيه قيمة
if let bio {
  print("النبذة: \(bio)، وطولها \(bio.count)")
}
let input = "25"
if let age = Int(input), age >= 18 {
  print("السن \(age): مسموح")
} else {
  print("رقم غلط أو صغير")
}
let scores = [70, 95, 88]
print(scores.max() ?? 0)
let empty: [Int] = []
print(empty.first as Any)`,
          try: R`اعمل [[var nickname: String? = nil]] واطبع [[nickname!]]. شوف الـ crash ورسالته. وبعدين غيّر [[input]] لـ [["abc"]] ومرة لـ [["12"]] وشوف أي فرع اتنفذ.`,
          flag: "script",
          deep: {
            why: R`أشهر crash في Java و C# و JS هو استخدام قيمة null ([[NullPointerException]] و [[Cannot read properties of undefined]]). Swift حلت ده من جذوره: النوع نفسه بيقولك لو القيمة ممكن تبقى nil، والـ compiler مش هيسيبك تستخدمها من غير ما تتعامل مع حالة nil. فالـ crash الوحيد الممكن هو اللي انت طلبته بإيدك بـ [[!]].`,
            how: R`[[String?]] اختصار لـ [[Optional<String>]]، وده enum عادي جوه اللغة فيه حالتين: [[.none]] (يعني nil) و [[.some(value)]]. [[if let]] بيعمل pattern matching على الحالتين. و [[print]] لـ optional بيطبع [[Optional("...")]] عشان كده بنفك قبل الطباعة.

في [[if let a = x, a >= 18]] الفاصلة [[,]] معناها «و»: كل الشروط لازم تتحقق، وكل واحد بيقدر يستخدم اللي قبله. و [[??]] بيتسلسل: [[a ?? b ?? "default"]].`,
            when: R`[[??]] لما فيه قيمة افتراضية منطقية. [[if let]] لما عايز تعمل حاجة بس لو القيمة موجودة. [[guard let]] (الدرس الجاي) لما القيمة لازمة لباقي الدالة. و [[!]] تقريبًا أبدًا في كود التطبيق، إلا في حاجات مضمونة زي [[URL(string: "https://apple.com")!]] بنص ثابت انت كاتبه.`,
            mistakes: R`تحط [[!]] في كل حتة عشان الـ compiler يسكت: كده رجعت لمشكلة الـ null بتاعة اللغات التانية. وتطبع optional من غير فك فيطلع [[Optional("سارة")]] للمستخدم. وتفتكر إن [[""]] (نص فاضي) زي [[nil]]: النص الفاضي قيمة موجودة.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعمل قيمة ممكن تبقى فاضية ([[String?]])، ويتعامل معاها بالطرق الآمنة: [[??]] لقيمة افتراضية، و [[if let]] للفك، وتحويل نص لرقم بشرطين، و [[max()]] و [[first]] اللي بيرجّعوا optional. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. [[String?]] و [[nil]]

~~~swift
var bio: String? = nil
~~~

- [[?]] بعد النوع = Optional: «يا [[String]] يا مفيش».
- [[nil]] = مفيش قيمة. ولازم نكتب النوع هنا: من [[nil]] لوحدها Swift متعرفش ده optional من إيه.
- [[var]] عشان هنحط فيه قيمة بعدين.

---

## ٢. [[??]]: قيمة افتراضية

~~~swift
print(bio ?? "لسه مفيش نبذة")
~~~

[[a ?? b]] اسمها nil-coalescing: «لو [[a]] فيها قيمة خدها، لو nil خد [[b]]». و [[bio]] nil، فاتطبع:

~~~text الناتج
لسه مفيش نبذة
~~~

والناتج نوعه [[String]] عادي (مش optional)، عشان كده [[print]] طبعته من غير [[Optional(...)]].

---

## ٣. [[if let]]: افتح العلبة

~~~swift
bio = "مطورة iOS"
if let bio {
  print("النبذة: \(bio)، وطولها \(bio.count)")
}
~~~

- [[if let bio]] اختصار [[if let bio = bio]] (من Swift 5.7): لو [[bio]] فيها قيمة، اعمل ثابت جديد بنفس الاسم نوعه [[String]] **عادي** وادخل البلوك. لو nil اتخطى البلوك.
- جوه البلوك [[bio.count]] شغالة. برة البلوك، على الـ optional، كانت هتبقى خطأ compile.
- [[count]] عدد الحروف: «مطورة» 5 + مسافة 1 + «iOS» 3 = **9**.

~~~text الناتج
النبذة: مطورة iOS، وطولها 9
~~~

---

## ٤. [[if let]] بشرطين

~~~swift
let input = "25"
if let age = Int(input), age >= 18 {
  print("السن \(age): مسموح")
} else {
  print("رقم غلط أو صغير")
}
~~~

- [[Int(input)]] بترجّع [[Int?]]: التحويل ممكن يفشل.
- [[if let age = ...]]: لو نجح، [[age]] بقت [[Int]].
- [[,]] معناها «و كمان»: [[age >= 18]] بيتشيك بس لو الفك نجح، وبيستخدم [[age]] اللي لسه متفكة.

| input | الفك | الشرط | الفرع |
|---|---|---|---|
| [["25"]] | 25 | صح | السن 25: مسموح |
| [["abc"]] | فشل | مبيتشيكش | رقم غلط أو صغير |
| [["12"]] | 12 | غلط | رقم غلط أو صغير |

الصفين التانيين من التجربة: اتشغّلوا وطلّعوا نفس الرسالة.

---

## ٥. دوال بترجّع optional

~~~swift
let scores = [70, 95, 88]
print(scores.max() ?? 0)
let empty: [Int] = []
print(empty.first as Any)
~~~

- [[scores.max()]] بترجّع [[Int?]]: لو الـ array فاضية مفيش أكبر رقم. هنا فيها، فـ **95**، و [[?? 0]] للأمان.
- [[let empty: [Int] = []]]: array فاضية. لازم النوع لأن [[[]]] لوحدها مفيهاش عناصر يتستنتج منها.
- [[empty.first]]: أول عنصر... ومفيش، فـ **nil**. و [[as Any]] بس عشان نطبع optional من غير warning.

~~~text الناتج كله
لسه مفيش نبذة
النبذة: مطورة iOS، وطولها 9
السن 25: مسموح
95
nil
~~~

---

## ٦. التجربة: [[!]] على nil

~~~swift
var nickname: String? = nil
print(nickname!)
~~~

البرنامج اترجم عادي، ووقع وهو شغال:

~~~text الناتج
main/main.swift:2: Fatal error: Unexpectedly found nil while unwrapping an Optional value
*** Program crashed: Illegal instruction at 0x00007387eaaf7aff ***
~~~

- [[Fatal error]]: Swift وقفت البرنامج عمدًا، و [[:2]] رقم السطر.
- [[Unexpectedly found nil while unwrapping]]: «لقيت nil وانت قلتلي افتح».
- [[Illegal instruction]]: الطريقة اللي Swift بتوقف بيها البرنامج (trap). على iPhone ده معناه التطبيق يقفل في وش المستخدم.

---

## الخلاصة

| الطريقة | الشكل | لو nil |
|---|---|---|
| قيمة افتراضية | [[x ?? "default"]] | ياخد الافتراضي |
| فك آمن | [[if let x { }]] | يتخطى البلوك |
| فك بشرط | [[if let v = x, v > 0 { }]] | يروح [[else]] |
| force unwrap | [[x!]] | **crash** |

وأي دالة ممكن «متلاقيش» ([[Int("...")]] و [[first]] و [[max()]]) بترجّع optional.`,
          lines: [
            R`[[String?]] optional، وبدايته [[nil]].`,
            R`لو nil يطبع النص الافتراضي.`,
            "دلوقتي فيه قيمة.",
            R`اختصار [[if let bio = bio]]: جوه البلوك [[bio]] نوعها String عادي.`,
            R`نقدر نستخدم [[.count]] لأنها اتفكت.`,
            "قفلة.",
            "نص جاي من المستخدم.",
            R`[[Int(input)]] بترجّع [[Int?]]. لو نجح تتحط في [[age]]، وبعد [[,]] شرط تاني.`,
            "الفرع لو الاتنين اتحققوا.",
            R`[[else]] لو التحويل فشل أو السن أقل.`,
            "رسالة الرفض.",
            "قفلة.",
            "array أرقام.",
            R`[[max()]] بترجّع optional (الـ array ممكن تبقى فاضية)، و [[??]] بتدي 0 لو كده.`,
            R`array فاضية، والنوع لازم يتكتب لأن مفيش قيم يتستنتج منها.`,
            R`[[first]] على array فاضية = nil.`
          ],
          sol: R`[[nickname!]] وهي nil بيوقف البرنامج برسالة:
[[Fatal error: Unexpectedly found nil while unwrapping an Optional value]]

مع [[input = "abc"]] و [[input = "12"]] الاتنين بيطبعوا [[رقم غلط أو صغير]]: الأولى عشان التحويل فشل، والتانية عشان الشرط التاني.

ناتج المثال الأصلي:`,
          solCode: R`لسه مفيش نبذة
النبذة: مطورة iOS، وطولها 9
السن 25: مسموح
95
nil`
        },
        {
          cmd: "guard let و optional chaining",
          title: "guard let للقيم اللازمة، و ?. عشان تمشي في سلسلة optionals من غير crash",
          desc: R`[[guard let]] نفس فكرة [[if let]] بس بالعكس: [[guard let user = currentUser else { return }]]. لو nil اخرج، ولو فيه قيمة الـ [[user]] تفضل متاحة في باقي الدالة كلها (مش جوه بلوك بس). وده الشكل الأشهر في كود iOS الحقيقي.

Optional chaining بـ [[?.]]: [[user?.address?.city]]. معناها «لو [[user]] موجود روح لـ address، ولو address موجود روح لـ city». ولو أي حلقة nil، النتيجة كلها nil من غير crash. والنتيجة دايمًا optional حتى لو [[city]] نفسها مش optional.

وينفع تنادي دوال كده: [[user?.greet()]] بتتنفذ بس لو [[user]] مش nil.

[[compactMap]] (هتشوفها بالتفصيل في درس map و filter) بتحوّل وتشيل الـ nil في خطوة واحدة.`,
          example: R`struct Address {
  var city: String
}
struct User {
  var name: String
  var address: Address?
}
func shippingLabel(for user: User?) -> String {
  // لو مفيش user اخرج بدري
  guard let user else {
    return "مفيش مستخدم"
  }
  guard let city = user.address?.city else {
    return "\(user.name): ضيف عنوان الأول"
  }
  // user و city متاحين هنا عادي
  return "شحن لـ \(user.name) في \(city)"
}
let sara = User(name: "سارة", address: Address(city: "الإسكندرية"))
let ali = User(name: "علي", address: nil)
print(shippingLabel(for: sara))
print(shippingLabel(for: ali))
print(shippingLabel(for: nil))
let maybeUser: User? = sara
print(maybeUser?.address?.city.count as Any)`,
          try: R`اكتب دالة [[func parseAge(_ text: String) -> Int]] بـ [[guard let]] بترجّع [[-1]] لو النص مش رقم. وبعدين اطبع [[ali.address?.city ?? "مش معروف"]].`,
          flag: "script",
          deep: {
            why: R`في التطبيقات الحقيقية الداتا بتيجي ناقصة طول الوقت: JSON من غير حقل، مستخدم من غير صورة، إعداد مش متخزن. [[guard let]] بيخليك تتعامل مع النقص في أول الدالة، و [[?.]] بيخليك تقرا داتا متداخلة من غير ما تكتب 4 if جوه بعض.`,
            how: R`[[guard let x]] بيعمل متغير جديد [[x]] نوعه مش optional في الـ scope اللي فيه الـ guard. ولأن الـ else لازم يخرج، الـ compiler متأكد إن أي سطر بعده [[x]] فيها قيمة.

الـ optional chaining بيوقف عند أول nil. [[maybeUser?.address?.city.count]]: [[city]] نفسها String عادي فمش محتاجة [[?]] بعدها، بس النتيجة النهائية [[Int?]] لأن السلسلة كان ممكن تقف قبلها.

[[struct]] هنا بس عشان نعمل نوع فيه أكتر من حقل. هتشرحها بالتفصيل في درس struct و class.`,
            when: R`[[guard let]] في أول الدوال وفي الـ handlers (لما تستقبل داتا من النت أو من المستخدم). و [[?.]] لما تقرا قيمة متداخلة ومش فارق معاك لو مش موجودة. و [[if let]] لما الكود اللي محتاج القيمة صغير.`,
            mistakes: R`تكتب [[user!.address!.city]]: أي nil في السكة = crash. وتنسى إن نتيجة [[?.]] optional فتحاول تستخدمها كـ String عادي. وتكتب [[guard let]] جوه loop ونسيت إن [[return]] بيخرج من الدالة كلها، يمكن كنت عايز [[continue]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

دالة بتعمل «ليبل شحن» لمستخدم ممكن يبقى مش موجود، وعنوانه ممكن يبقى مش موجود. بتستخدم [[guard let]] تخرج بدري لو حاجة ناقصة، و [[?.]] عشان تمشي في السلسلة من غير crash. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. الأنواع: [[struct]] بحقل optional

~~~swift
struct Address {
  var city: String
}
struct User {
  var name: String
  var address: Address?
}
~~~

- [[struct]] بيعمل نوع جديد فيه أكتر من حقل (property). ليه درس كامل، هنا محتاجينه بس عشان المثال.
- [[address: Address?]]: المستخدم ممكن ميكونش عنده عنوان.
- Swift بتعمل للـ struct دالة إنشاء جاهزة بأسماء الحقول: [[User(name: "...", address: ...)]].

---

## ٢. أول [[guard let]]

~~~swift
func shippingLabel(for user: User?) -> String {
  guard let user else {
    return "مفيش مستخدم"
  }
~~~

- [[for user: User?]]: label اسمه [[for]] (فالنداء [[shippingLabel(for: sara)]] بيتقري جملة)، والـ parameter نفسه optional.
- [[guard let user]] اختصار [[guard let user = user]]: لو nil ادخل [[else]] واخرج. لو فيه قيمة، اعمل [[user]] جديد نوعه [[User]] عادي، **ويفضل موجود لآخر الدالة** (مش جوه بلوك زي [[if let]]).

---

## ٣. تاني [[guard let]] و [[?.]]

~~~swift
  guard let city = user.address?.city else {
    return "\(user.name): ضيف عنوان الأول"
  }
~~~

نفكه من جوه لبرة:
1. [[user.address]]: نوعه [[Address?]].
2. [[?.city]]: optional chaining. لو العنوان موجود هات [[city]]، لو nil وقّف هنا والنتيجة nil. نوع النتيجة [[String?]] (حتى لو [[city]] نفسها String عادي).
3. [[guard let city = ...]]: فك النتيجة. لو nil اخرج برسالة فيها [[user.name]] (شغالة لأن أول guard فك [[user]]).

---

## ٤. الطريق السعيد

~~~swift
  return "شحن لـ \(user.name) في \(city)"
}
~~~

لو وصلنا هنا يبقى [[user]] و [[city]] الاتنين قيم عادية، من غير ولا [[if]] متداخل.

---

## ٥. النداءات

~~~swift
let sara = User(name: "سارة", address: Address(city: "الإسكندرية"))
let ali = User(name: "علي", address: nil)
print(shippingLabel(for: sara))
print(shippingLabel(for: ali))
print(shippingLabel(for: nil))
~~~

| النداء | وقف فين | الناتج |
|---|---|---|
| [[sara]] | عدّى الاتنين | شحن لـ سارة في الإسكندرية |
| [[ali]] | تاني guard (العنوان nil) | علي: ضيف عنوان الأول |
| [[nil]] | أول guard | مفيش مستخدم |

لاحظ إن [[sara]] نوعها [[User]] مش [[User?]]، وبعتناها لـ parameter من نوع [[User?]] عادي: Swift بتحط القيمة في العلبة لوحدها.

---

## ٦. سلسلة من أولها optional

~~~swift
let maybeUser: User? = sara
print(maybeUser?.address?.city.count as Any)
~~~

- [[maybeUser?]]: الحلقة الأولى optional.
- [[.address?]]: التانية optional.
- [[.city.count]]: من غير [[?]] لأن [[city]] و [[count]] مش optional.
- السلسلة كلها نجحت، و «الإسكندرية» 10 حروف، بس النتيجة **[[Optional(10)]]** لأن السلسلة كان ممكن تقف في النص، فنوعها [[Int?]].

~~~text الناتج كله
شحن لـ سارة في الإسكندرية
علي: ضيف عنوان الأول
مفيش مستخدم
Optional(10)
~~~

---

## ٧. حل التجربة

~~~swift
func parseAge(_ text: String) -> Int {
  guard let age = Int(text) else {
    return -1
  }
  return age
}
print(parseAge("30"), parseAge("تلاتين"))
print(ali.address?.city ?? "مش معروف")
~~~

~~~text الناتج
30 -1
مش معروف
~~~

- [[Int("تلاتين")]] فشل فرجّعنا -1.
- [[ali.address?.city]] = nil (مفيش عنوان)، و [[??]] بتدي القيمة البديلة.

---

## الخلاصة

| | [[if let x]] | [[guard let x]] |
|---|---|---|
| [[x]] متاح فين | جوه البلوك بس | لآخر الدالة |
| لو nil | يتخطى البلوك | لازم يخرج |
| الأنسب | كود صغير محتاج القيمة | قيمة لازمة لباقي الدالة |

و [[a?.b?.c]] بيقف عند أول nil، ونتيجته دايمًا optional.`,
          lines: [
            "نوع للعنوان.",
            "المدينة.",
            "قفلة.",
            "نوع للمستخدم.",
            "الاسم.",
            R`العنوان optional: ممكن يبقى مش موجود.`,
            "قفلة.",
            R`الدالة بتاخد [[User?]]: ممكن يتبعت nil.`,
            R`[[guard let user]] اختصار [[guard let user = user]].`,
            "لو nil بنخرج برسالة.",
            "قفلة.",
            R`[[?.]] على العنوان: لو nil الـ guard يفشل.`,
            R`[[user]] متاح هنا لأن الـ guard الأول نجح.`,
            "قفلة.",
            "هنا الاتنين مش optional.",
            "قفلة الدالة.",
            "مستخدم بعنوان.",
            "مستخدم من غير عنوان.",
            "شحن عادي.",
            "رسالة العنوان.",
            "رسالة مفيش مستخدم.",
            R`optional فيه قيمة.`,
            R`السلسلة نجحت فبتطبع [[Optional(10)]] (عدد حروف الإسكندرية).`
          ],
          sol: R`ناتج المثال:
[[شحن لـ سارة في الإسكندرية]]
[[علي: ضيف عنوان الأول]]
[[مفيش مستخدم]]
[[Optional(10)]]

و [[ali.address?.city ?? "مش معروف"]] بتطبع [[مش معروف]].

حل [[parseAge]]:`,
          solCode: R`func parseAge(_ text: String) -> Int {
  guard let age = Int(text) else {
    return -1
  }
  return age
}
print(parseAge("30"), parseAge("تلاتين"))
// 30 -1`
        },
        {
          cmd: "Array و Dictionary و Set",
          title: "تخزن قوايم بـ Array، وأزواج مفتاح وقيمة بـ Dictionary، وقيم من غير تكرار بـ Set",
          desc: R`التلاتة collections الأساسية في Swift، وكلهم value types (لما تنسخهم كل نسخة مستقلة) وكلهم نوعهم ثابت: كل العناصر من نفس النوع.

1. [[Array]]: قايمة مرتبة. [[let names = ["سارة", "علي"]]] نوعها [[[String]]] (يعني Array of String). بتوصل بالـ index من 0: [[names[0]]]. والـ index برة الحدود = crash، فاستخدم [[first]] و [[last]] (بيرجعوا optional) أو اتأكد من [[indices.contains(i)]]. [[append]] بتضيف في الآخر، و [[insert(_:at:)]] في مكان معين، و [[remove(at:)]] بتمسح، و [[count]] و [[isEmpty]] و [[contains]].
2. [[Dictionary]]: مفتاح وقيمة. [[["cairo": 22, "giza": 9]]] نوعها [[[String: Int]]]. القراية [[dict["cairo"]]] بترجّع optional دايمًا (المفتاح ممكن مايكونش موجود)، فبتستخدم [[??]] أو [[default:]]. والكتابة [[dict["alex"] = 5]] بتضيف أو بتعدّل، و [[= nil]] بتمسح. ومفيش ترتيب مضمون.
3. [[Set]]: قيم من غير تكرار ومن غير ترتيب. [[contains]] فيها سريعة جدًا. وفيها عمليات المجموعات: [[union]] و [[intersection]] و [[subtracting]].

عشان تعدّل collection لازم يبقى [[var]]. الـ [[let]] بتقفله كله.

الـ array الفاضية لازم نوعها يتكتب: [[var items: [String] = []]] أو [[[String]()]].`,
          example: R`var cart = ["قلم", "كشكول"]
cart.append("مسطرة")
cart.insert("شنطة", at: 0)
print(cart, cart.count)
print(cart[1], cart.first ?? "-", cart.contains("قلم"))
cart.remove(at: 0)
print(cart)
var prices: [String: Double] = ["قلم": 5, "كشكول": 20]
prices["مسطرة"] = 7.5
prices["قلم"] = 6
print(prices["قلم"] ?? 0, prices["ممحاة"] ?? 0)
print(prices["ممحاة", default: 1])
for (item, price) in prices.sorted(by: { $0.key < $1.key }) {
  print(item, price)
}
var tags: Set<String> = ["swift", "ios"]
tags.insert("swift")
tags.insert("xcode")
print(tags.count, tags.contains("ios"))
let other: Set = ["ios", "android"]
print(tags.intersection(other))`,
          try: R`اكتب [[print(cart[10])]] وشوف الـ crash. وبعدين اعمل dictionary بيعد تكرار كل كلمة في [[["a", "b", "a", "c", "a"]]] (استخدم [[counts[word, default: 0] += 1]]).`,
          flag: "script",
          deep: {
            why: R`الأنواع الثابتة (كل العناصر نفس النوع) بتشيل bugs كتير: مفيش حد هيحط رقم في قايمة أسماء بالغلط. والـ value semantics معناها إن لما تبعت array لدالة، الدالة مش هتغيّر الأصل من وراك.`,
            how: R`الـ Array بيخزن العناصر جنب بعض في الذاكرة، فالوصول بالـ index سريع جدًا، والإضافة في الآخر سريعة، بس [[insert(at: 0)]] و [[remove(at: 0)]] بيزحزحوا كل العناصر. الـ Dictionary والـ Set مبنيين على hash table، فالبحث بالمفتاح سريع جدًا مهما كان الحجم، بس المفتاح لازم يبقى [[Hashable]] (String و Int و enums البسيطة كلهم Hashable).

النسخ رخيص بسبب copy-on-write: النسختين بيشاركوا نفس الذاكرة لحد ما واحدة تتعدل، ساعتها بس النسخ الفعلي بيحصل.

[[sorted(by:)]] بتاخد closure بيقارن عنصرين، و [[$0]] و [[$1]] أسماء مختصرة ليهم (درس الـ closures). من غير sorted ترتيب الـ dictionary بيتغير من تشغيل للتاني.`,
            when: R`[[Array]] لأي قايمة بترتيب (رسايل، منتجات). [[Dictionary]] لما بتدور بمفتاح (منتج بالـ id، إعدادات). [[Set]] لما مش عايز تكرار أو بتسأل «موجود ولا لأ» كتير (tags، ids اتشافت).`,
            mistakes: R`توصل بـ index من غير ما تتأكد. وتعتمد على ترتيب الـ Dictionary أو الـ Set. وتمسح عناصر من array وانت بتلف عليها بالـ index فالـ indexes تتلخبط: استخدم [[removeAll(where:)]]. وتنسى إن [[dict[key]]] optional فتطبع [[Optional(5.0)]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

٣ أجزاء: سلة مشتريات كـ [[Array]] (نضيف ونمسح ونقرا)، وأسعار كـ [[Dictionary]] (مفتاح وقيمة)، و tags كـ [[Set]] (من غير تكرار). الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. Array: إضافة

~~~swift
var cart = ["قلم", "كشكول"]
cart.append("مسطرة")
cart.insert("شنطة", at: 0)
print(cart, cart.count)
~~~

- [[[ ... ]]] بعناصر بينهم فاصلة = array. النوع اتستنتج [[[String]]] (يعني Array of String).
- [[var]] عشان هنعدّل. على [[let]] أي [[append]] = خطأ compile.
- [[append]]: يضيف في الآخر. [[insert(_, at: 0)]]: يضيف في مكان 0 (الأول) ويزق الباقي.
- [[count]]: عدد العناصر.

~~~text الناتج
["شنطة", "قلم", "كشكول", "مسطرة"] 4
~~~

---

## ٢. Array: قراية ومسح

~~~swift
print(cart[1], cart.first ?? "-", cart.contains("قلم"))
cart.remove(at: 0)
print(cart)
~~~

- [[cart[1]]]: العنصر رقم 1 = التاني = **قلم** (الترقيم من 0).
- [[cart.first]]: أول عنصر بس **optional** (لو فاضية nil)، فـ [[?? "-"]]: **شنطة**.
- [[contains("قلم")]]: موجود؟ **true**.
- [[remove(at: 0)]]: امسح الأول.

~~~text الناتج
قلم شنطة true
["قلم", "كشكول", "مسطرة"]
~~~

**index برة الحدود** (التجربة: [[cart[10]]] على array فيها عنصرين):

~~~text الناتج
Swift/ContiguousArrayBuffer.swift:695: Fatal error: Index out of range
*** Program crashed: Illegal instruction ...
~~~

الـ compiler مش بيمسكها، والبرنامج بيقع وقت التشغيل. والملف المذكور جوه مكتبة Swift نفسها (هي اللي بتشيك الحدود)، مش في كودك.

---

## ٣. Dictionary

~~~swift
var prices: [String: Double] = ["قلم": 5, "كشكول": 20]
prices["مسطرة"] = 7.5
prices["قلم"] = 6
print(prices["قلم"] ?? 0, prices["ممحاة"] ?? 0)
print(prices["ممحاة", default: 1])
~~~

- [[[String: Double]]]: dictionary المفتاح فيه String والقيمة Double. كتبنا النوع عشان [[5]] و [[20]] لوحدهم كانوا هيبقوا Int.
- [[["قلم": 5, ...]]]: كل عنصر [[مفتاح: قيمة]].
- [[prices["مسطرة"] = 7.5]]: المفتاح مش موجود، فاتضاف. [[prices["قلم"] = 6]]: موجود، فاتعدّل.
- القراية [[prices["قلم"]]] نوعها [[Double?]] دايمًا: المفتاح ممكن ميكونش موجود. «ممحاة» مش موجودة فـ [[?? 0]] اشتغلت.
- [[default: 1]] جوه القوسين: نفس فكرة [[??]] بس النتيجة [[Double]] على طول.

~~~text الناتج
6.0 0.0
1.0
~~~

---

## ٤. اللف على dictionary بترتيب

~~~swift
for (item, price) in prices.sorted(by: { $0.key < $1.key }) {
  print(item, price)
}
~~~

- الـ dictionary **ملوش ترتيب**: لو لفيت عليه على طول الترتيب ممكن يتغير من تشغيل للتاني.
- [[sorted(by:)]] بترجّع array من أزواج مترتبة. وبتاخد closure بيقارن عنصرين: [[$0]] الأول و [[$1]] التاني (درس الـ closures). [[$0.key < $1.key]]: رتّب بالمفتاح أبجديًا.
- [[(item, price)]] بيفك كل زوج.

~~~text الناتج
قلم 6.0
كشكول 20.0
مسطرة 7.5
~~~

ق قبل ك قبل م في الأبجدية.

---

## ٥. Set

~~~swift
var tags: Set<String> = ["swift", "ios"]
tags.insert("swift")
tags.insert("xcode")
print(tags.count, tags.contains("ios"))
let other: Set = ["ios", "android"]
print(tags.intersection(other))
~~~

- [[Set<String>]]: النوع لازم يتكتب، لأن [[[...]]] لوحدها بتبقى Array. والـ [[<String>]] نوع العناصر (generics، درس جاي).
- [[insert("swift")]] تاني: موجودة، فمفيش حاجة حصلت. [[insert("xcode")]] اتضافت. العدد **3**.
- [[let other: Set = [...]]]: [[Set]] من غير نوع العنصر، Swift استنتجته String.
- [[intersection]]: العناصر المشتركة بين الاتنين: **["ios"]**.

~~~text الناتج
3 true
["ios"]
~~~

---

## ٦. حل التجربة: عد الكلمات

~~~swift
var counts: [String: Int] = [:]
for word in ["a", "b", "a", "c", "a"] {
  counts[word, default: 0] += 1
}
print(counts["a"]!, counts["b"]!, counts["c"]!)
~~~

- [[[:]]]: dictionary فاضي (العلامة [[:]] هي اللي بتفرقه عن array فاضية [[[]]]).
- [[counts[word, default: 0] += 1]]: لو الكلمة مش موجودة ابدأ من 0، وزوّد 1، وخزّن.
- [[!]] هنا آمن لأننا متأكدين إن الـ 3 مفاتيح اتحطوا.

~~~text الناتج
3 1 1
~~~

---

## الخلاصة

| | Array | Dictionary | Set |
|---|---|---|---|
| مثال النوع | [[[String]]] | [[[String: Double]]] | [[Set<String>]] |
| الترتيب | مضمون | لأ | لأ |
| تكرار | مسموح | المفاتيح لأ | لأ |
| القراية | [[a[i]]] (برة الحدود = crash) | [[d[key]]] بترجّع optional | [[s.contains(x)]] |
| إضافة | [[append]] و [[insert(_:at:)]] | [[d[key] = v]] | [[insert]] |
| مسح | [[remove(at:)]] | [[d[key] = nil]] | [[remove]] |`,
          lines: [
            R`array من String، و [[var]] عشان هنعدّلها.`,
            "إضافة في الآخر.",
            "إضافة في الأول.",
            "بيطبع الـ array وعددها.",
            R`بالـ index، و [[first]] optional، و [[contains]].`,
            "مسح أول عنصر.",
            "بيطبع بعد المسح.",
            R`dictionary: المفتاح String والقيمة Double. النوع مكتوب عشان 5 و 20 يبقوا Double.`,
            "إضافة مفتاح جديد.",
            "تعديل مفتاح موجود.",
            R`القراية optional، فبنستخدم [[??]].`,
            R`[[default:]] بديل لـ ?? جوه القوسين.`,
            R`بنرتب بالمفتاح عشان الطباعة تبقى ثابتة. [[$0]] و [[$1]] العنصرين اللي بيتقارنوا.`,
            "كل عنصر (مفتاح، قيمة).",
            "قفلة.",
            R`Set من String. النوع لازم يتكتب وإلا هيبقى Array.`,
            "swift موجودة، فمفيش تكرار.",
            "إضافة جديدة.",
            R`3 عناصر بس.`,
            R`[[Set]] من غير نوع العنصر، بيستنتجه.`,
            R`المشترك بين الاتنين.`
          ],
          sol: R`[[cart[10]]] بيوقف البرنامج بـ [[Fatal error: Index out of range]].

ناتج المثال بالترتيب:
["شنطة", "قلم", "كشكول", "مسطرة"] 4
قلم شنطة true
["قلم", "كشكول", "مسطرة"]
6.0 0.0
1.0
قلم 6.0 / كشكول 20.0 / مسطرة 7.5 (كل واحد في سطر)
3 true
["ios"]

وعد الكلمات بـ [[default: 0]]: لو الكلمة مش موجودة بتبدأ من صفر وبعدين [[+= 1]].`,
          solCode: R`var counts: [String: Int] = [:]
for word in ["a", "b", "a", "c", "a"] {
  counts[word, default: 0] += 1
}
print(counts["a"]!, counts["b"]!, counts["c"]!)
// 3 1 1`
        },
        {
          cmd: "map و filter و reduce",
          title: "تحوّل وتفلتر وتجمع array في سطر: map و filter و reduce و compactMap و sorted",
          desc: R`بدل ما تكتب loop وتعمل array جديدة وتضيف فيها، Swift فيها دوال جاهزة على أي collection بتاخد closure (دالة صغيرة) وتطبقها:

• [[map]]: بتحوّل كل عنصر لحاجة تانية. [[[1, 2, 3].map { $0 * 2 }]] = [[[2, 4, 6]]].
• [[filter]]: بتسيب العناصر اللي بتحقق شرط. [[.filter { $0 > 1 }]].
• [[reduce]]: بتجمع كل العناصر في قيمة واحدة. [[.reduce(0, +)]] = المجموع.
• [[compactMap]]: زي map بس بتشيل الـ nil. [[["1", "x", "3"].compactMap { Int($0) }]] = [[[1, 3]]].
• [[sorted(by:)]] و [[first(where:)]] و [[contains(where:)]] و [[allSatisfy]] و [[min(by:)]].

[[$0]] اسم مختصر لأول parameter في الـ closure، و [[$1]] للتاني. يعني [[{ $0 * 2 }]] نفس [[{ n in n * 2 }]].

و [[\.name]] اسمه key path: طريقة تشاور بيها على property. [[users.map(\.name)]] نفس [[users.map { $0.name }]].

الدوال دي بترجّع array جديدة ومبتغيرش الأصل، فينفع تسلسلهم: [[.filter { }.map { }.reduce(...)]].`,
          example: R`struct Product {
  let name: String
  let price: Double
  let inStock: Bool
}
let products = [
  Product(name: "سماعة", price: 450, inStock: true),
  Product(name: "شاحن", price: 200, inStock: false),
  Product(name: "كابل", price: 80, inStock: true),
]
let names = products.map(\.name)
print(names)
let available = products.filter { $0.inStock }
print(available.count)
let total = available.map(\.price).reduce(0, +)
print("مجموع المتاح:", total)
let cheapFirst = products.sorted { $0.price < $1.price }
print(cheapFirst.map(\.name))
let inputs = ["10", "abc", "25", ""]
let numbers = inputs.compactMap { Int($0) }
print(numbers)
print(products.first { $0.price > 300 }?.name ?? "-")
print(products.allSatisfy { $0.price > 50 })`,
          try: R`من [[products]] اطلع أسماء المنتجات المتاحة اللي سعرها أقل من 300، مترتبة أبجديًا، في سطر واحد متسلسل.`,
          flag: "script",
          deep: {
            why: R`الـ loop اليدوي فيه 4 حاجات ممكن تغلط فيها (البداية، والشرط، والإضافة، والنتيجة). [[filter { $0.inStock }]] بيقول «إيه» مش «إزاي»، فبيتقري أسرع ومفيهوش مكان للـ bug. وده الأسلوب اللي هتشوفه في كل كود Swift و SwiftUI حقيقي.`,
            how: R`[[map]] و [[filter]] بيلفوا مرة على الـ collection ويرجّعوا array جديدة. [[reduce(initial, f)]] بيبدأ بالقيمة الأولية وبينادي [[f(acc, element)]] لكل عنصر. [[+]] نفسها دالة بتاخد اتنين، فينفع تتبعت لـ reduce مباشرة.

لو الـ closure آخر argument، بيتكتب برة القوسين (trailing closure)، ولو هو الـ argument الوحيد القوسين بيتشالوا خالص: [[filter { }]]. ده سبب الشكل [[sorted { $0.price < $1.price }]].

لو السلسلة طويلة على داتا كبيرة، [[.lazy]] قبلها بيخليها تشتغل عنصر عنصر من غير arrays وسيطة.`,
            when: R`أي تحويل أو فلترة أو تجميع لقايمة. في SwiftUI هتعمل [[filter]] و [[sorted]] على الداتا قبل ما تعرضها في List. ولو الـ loop فيه منطق معقد أو side effects (طباعة، شبكة)، [[for]] العادي أوضح.`,
            mistakes: R`تستخدم [[map]] وترجع optional فتطلع [[[Int?]]] بدل [[compactMap]]. وتسلسل 6 دوال بـ [[$0]] في سطر واحد لحد ما محدش يفهمه: قسّم وسمّي الخطوات. وتستخدم [[map]] عشان side effect (طباعة) بدل [[forEach]] أو for.`
          },
          teach: R`## البرنامج بيعمل إيه؟

عنده ٣ منتجات، وبيطلع منهم معلومات من غير ولا loop مكتوب بإيده: الأسماء، والمتاح، ومجموع أسعار المتاح، والترتيب بالسعر، وتحويل نصوص لأرقام، وأول منتج غالي، وهل كلهم فوق 50. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. الداتا

~~~swift
struct Product {
  let name: String
  let price: Double
  let inStock: Bool
}
let products = [
  Product(name: "سماعة", price: 450, inStock: true),
  Product(name: "شاحن", price: 200, inStock: false),
  Product(name: "كابل", price: 80, inStock: true),
]
~~~

نوع [[Product]] بـ ٣ حقول، و array منه نوعها [[[Product]]]. الفاصلة بعد آخر عنصر مسموحة.

---

## ٢. [[map]] و key path

~~~swift
let names = products.map(\.name)
print(names)
~~~

- [[map]] بتلف على كل عنصر، وتطبق عليه حاجة، وترجّع **array جديدة** بالنتايج.
- [[\.name]] اسمه key path: «الـ property اللي اسمها name». يعني «من كل منتج هات اسمه». نفس [[map { $0.name }]].

~~~text الناتج
["سماعة", "شاحن", "كابل"]
~~~

---

## ٣. [[filter]] و [[$0]]

~~~swift
let available = products.filter { $0.inStock }
print(available.count)
~~~

- [[filter]] بتسيب العناصر اللي الـ closure بيرجّعلها [[true]].
- [[{ $0.inStock }]] closure (دالة صغيرة من غير اسم). [[$0]] اسم جاهز للعنصر الحالي. ومفيش أقواس [[()]] بعد [[filter]] لأن الـ closure هو الـ argument الوحيد (trailing closure).
- الشاحن [[inStock: false]] فاتشال: **2**.

---

## ٤. [[map]] ثم [[reduce]]

~~~swift
let total = available.map(\.price).reduce(0, +)
print("مجموع المتاح:", total)
~~~

من الشمال لليمين:
1. [[available.map(\.price)]] → [[[450.0, 80.0]]].
2. [[.reduce(0, +)]]: ابدأ بـ 0، وطبّق [[+]] بين اللي اتجمع لحد دلوقتي وكل عنصر: 0 + 450 = 450، ثم 450 + 80 = **530**. و [[+]] هنا متبعته كدالة لأنه فعلًا دالة بتاخد اتنين.

~~~text الناتج
مجموع المتاح: 530.0
~~~

---

## ٥. [[sorted]] بـ [[$0]] و [[$1]]

~~~swift
let cheapFirst = products.sorted { $0.price < $1.price }
print(cheapFirst.map(\.name))
~~~

[[sorted]] بتاخد closure بيقارن **عنصرين**: [[$0]] و [[$1]]، ويرجّع true لو الأول المفروض ييجي قبل التاني. [[<]] على السعر = من الأرخص للأغلى: 80، 200، 450.

~~~text الناتج
["كابل", "شاحن", "سماعة"]
~~~

---

## ٦. [[compactMap]]

~~~swift
let inputs = ["10", "abc", "25", ""]
let numbers = inputs.compactMap { Int($0) }
print(numbers)
~~~

- [[Int($0)]] بترجّع [[Int?]]: 10، nil، 25، nil.
- [[map]] كانت هتطلّع [[[Int?]]] فيها nil. [[compactMap]] بتحوّل **وبتشيل الـ nil**: [[[Int]]] نضيفة.

~~~text الناتج
[10, 25]
~~~

---

## ٧. [[first]] بشرط و [[allSatisfy]]

~~~swift
print(products.first { $0.price > 300 }?.name ?? "-")
print(products.allSatisfy { $0.price > 50 })
~~~

- [[first { شرط }]] (اسمها الكامل [[first(where:)]]): أول عنصر يحقق الشرط، أو nil. فـ [[?.name]] و [[?? "-"]]. السماعة 450: **سماعة**.
- [[allSatisfy]]: كلهم بيحققوا الشرط؟ أرخص واحد 80 > 50: **true**.

~~~text الناتج كله
["سماعة", "شاحن", "كابل"]
2
مجموع المتاح: 530.0
["كابل", "شاحن", "سماعة"]
[10, 25]
سماعة
true
~~~

---

## ٨. حل التجربة: سلسلة

~~~swift
let result = products
  .filter { $0.inStock && $0.price < 300 }
  .map(\.name)
  .sorted()
print(result)
~~~

| الخطوة | الناتج |
|---|---|
| [[filter]] متاح وأقل من 300 | الكابل بس (الشاحن مش متاح، والسماعة 450) |
| [[map(\.name)]] | [[["كابل"]]] |
| [[sorted()]] | [[["كابل"]]] (String بيتقارن لوحده) |

~~~text الناتج
["كابل"]
~~~

كل سطر بيبدأ بـ [[.]] بيكمّل على نتيجة اللي قبله، فالسلسلة بتتقري من فوق لتحت.

---

## الخلاصة

| الدالة | بترجّع |
|---|---|
| [[map { }]] | array بنفس العدد بعد التحويل |
| [[filter { }]] | العناصر اللي الشرط بتاعها true |
| [[reduce(start, f)]] | قيمة واحدة |
| [[compactMap { }]] | تحويل + شيل الـ nil |
| [[sorted { $0 < $1 }]] | array مترتبة |
| [[first { }]] | أول عنصر optional |
| [[allSatisfy { }]] | Bool |

و [[$0]] = أول argument في الـ closure، و [[\.name]] = key path لـ property.`,
          lines: [
            "نوع للمنتج.",
            "الاسم.",
            "السعر.",
            "متاح ولا لأ.",
            "قفلة.",
            "array من 3 منتجات.",
            "منتج.",
            "منتج.",
            R`منتج. والفاصلة بعد آخر عنصر مسموحة في Swift.`,
            "قفلة الـ array.",
            R`[[\.name]] key path: الأسماء بس.`,
            "بيطبع الأسماء.",
            R`[[$0]] كل منتج، بنسيب المتاح بس.`,
            "2.",
            R`أسعار المتاح وبعدين مجموعهم بـ [[reduce]] من صفر.`,
            "بيطبع 530.0.",
            R`ترتيب بالسعر: [[$0]] و [[$1]] منتجين بيتقارنوا.`,
            "الأسماء من الأرخص.",
            "نصوص بعضها مش أرقام.",
            R`[[Int($0)]] بترجّع optional، و [[compactMap]] بتشيل الـ nil.`,
            "بيطبع [10, 25].",
            R`[[first]] بشرط بترجّع optional، فـ [[?.name]] و [[??]].`,
            "هل كلهم أغلى من 50؟"
          ],
          sol: R`ناتج المثال:
[[["سماعة", "شاحن", "كابل"]]]
[[2]]
[[مجموع المتاح: 530.0]]
[[["كابل", "شاحن", "سماعة"]]]
[[[10, 25]]]
[[سماعة]]
[[true]]

الحل (الناتج [[["كابل"]]] لأن الشاحن مش متاح والسماعة أغلى من 300):`,
          solCode: R`let result = products
  .filter { $0.inStock && $0.price < 300 }
  .map(\.name)
  .sorted()
print(result)`
        },
        {
          cmd: "الـ closures",
          title: "closure يعني إيه، وتكتبه مختصر بـ trailing closure و $0، وبيمسك المتغيرات اللي حواليه إزاي",
          desc: R`الـ closure دالة من غير اسم تقدر تحطها في متغير أو تبعتها لدالة تانية. شكلها الكامل:
[[{ (a: Int, b: Int) -> Int in return a + b }]]
الـ parameters والنوع قبل كلمة [[in]]، والجسم بعدها.

ونوع الـ closure بيتكتب [[(Int, Int) -> Int]]: «بتاخد اتنين Int وبترجّع Int». و [[() -> Void]] يعني مبتاخدش حاجة ومبترجعش حاجة.

الاختصارات (كلها نفس المعنى):
1. لو النوع معروف من السياق: [[{ a, b in a + b }]].
2. سطر واحد؟ شيل [[return]].
3. أسماء جاهزة [[$0]] و [[$1]]: [[{ $0 + $1 }]].
4. trailing closure: لو آخر argument closure، تكتبه برة القوسين. [[numbers.sorted { $0 > $1 }]]. ده الشكل اللي هتشوفه في كل SwiftUI: [[Button("حفظ") { save() }]].

الـ closure بيمسك (capture) المتغيرات اللي حواليه: لو استخدم [[count]] من برة، بيفضل شايفه ومعدّل فيه حتى بعد ما الدالة اللي اتعمل فيها خلصت.

[[@escaping]]: لو دالة بتاخد closure وبتخزنه عشان تناديه بعدين (بعد ما الدالة نفسها ترجع)، لازم تعلّم الـ parameter بـ [[@escaping]]. الـ [[@]] في Swift اسمها attribute: علامة بتدي معلومة زيادة للـ compiler. هتشوف كتير منها: [[@State]] و [[@MainActor]] و [[@Observable]].`,
          example: R`let add: (Int, Int) -> Int = { a, b in a + b }
print(add(2, 3))
// دالة بتاخد closure
func repeatTimes(_ n: Int, action: (Int) -> Void) {
  for i in 1...n {
    action(i)
  }
}
// trailing closure: برة القوسين
repeatTimes(3) { i in
  print("مرة \(i)")
}
// closure بيمسك متغير من برة ويفضل فاكره
func makeCounter() -> () -> Int {
  var count = 0
  return {
    count += 1
    return count
  }
}
let next = makeCounter()
print(next(), next(), next())
// @escaping: بنخزن الـ closure ونناديه بعدين
var handlers: [() -> Void] = []
func store(in list: inout [() -> Void], _ handler: @escaping () -> Void) {
  list.append(handler)
}
store(in: &handlers) { print("خلصنا") }
handlers.forEach { $0() }`,
          try: R`اعمل [[let otherCounter = makeCounter()]] ونادي [[otherCounter()]] مرتين. هل بيكمّل من 4 ولا بيبدأ من 1؟ ليه؟ وبعدين امسح [[@escaping]] واقرا الخطأ.`,
          flag: "script",
          deep: {
            why: R`الـ closures هي اللغة اللي بيتكلم بيها iOS: زرار بينادي closure لما يتضغط، والشبكة كانت بتنادي closure لما الرد يوصل (قبل async/await)، و SwiftUI كله closures: [[VStack { }]] و [[ForEach(items) { item in }]] و [[.onAppear { }]].`,
            how: R`الـ closure reference type: لما بيمسك [[count]]، المتغير بيتنقل للـ heap ويفضل عايش طول ما الـ closure عايش. كل نداء لـ [[makeCounter()]] بيعمل [[count]] جديد، فكل counter ليه حالته.

الـ closures العادية non-escaping: الـ compiler متأكد إنها هتتنادى قبل ما الدالة ترجع، فمش محتاج يحتفظ بيها. [[@escaping]] بيقوله «ده هيعيش بعد الدالة»، وساعتها لو الـ closure جوه class ومسك [[self]]، ممكن يحصل retain cycle (درس الـ ARC).`,
            when: R`trailing closures و [[$0]] للـ closures القصيرة (سطر أو اتنين). ولو الـ closure طويل أو فيه أكتر من parameter، سمّي الـ parameters ([[{ user, index in }]]) عشان القراية. و [[@escaping]] لما بتخزن الـ closure أو بتبعته لكود async.`,
            mistakes: R`تستخدم [[$0]] في closure متداخل جوه closure: مش هتعرف أنهي [[$0]] بتاع مين. وتنسى إن الـ closure بيمسك المتغير مش قيمته وقت التعريف (لو اتغير بعدين الـ closure هيشوف الجديد). وتمسك [[self]] بقوة في closure متخزن جوه class فتعمل memory leak.`
          },
          teach: R`## البرنامج بيعمل إيه؟

٤ استخدامات للـ closure: closure متخزن في ثابت، ودالة بتاخد closure (و trailing closure)، ودالة بترجّع closure فاكر عداده، و closure بيتخزن عشان يتنادى بعدين ([[@escaping]]). الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. closure في ثابت

~~~swift
let add: (Int, Int) -> Int = { a, b in a + b }
print(add(2, 3))
~~~

| الحتة | معناها |
|---|---|
| [[(Int, Int) -> Int]] | نوع الـ closure: بياخد اتنين Int وبيرجّع Int |
| [[{ ... }]] | الـ closure نفسه |
| [[a, b]] | أسماء الـ parameters (أنواعهم معروفة من النوع اللي فوق) |
| [[in]] | فاصل: الـ parameters قبله، والجسم بعده |
| [[a + b]] | الجسم. سطر واحد فمش محتاج [[return]] |

[[add(2, 3)]] بتنادى زي أي دالة: **5**.

---

## ٢. دالة بتاخد closure

~~~swift
func repeatTimes(_ n: Int, action: (Int) -> Void) {
  for i in 1...n {
    action(i)
  }
}
~~~

- [[action: (Int) -> Void]]: parameter نوعه closure بياخد Int ومبيرجعش حاجة. [[Void]] = «مفيش قيمة راجعة».
- الدالة مش عارفة الـ closure هيعمل إيه، هي بس بتناديه n مرة وتديله رقم اللفة.

---

## ٣. trailing closure

~~~swift
repeatTimes(3) { i in
  print("مرة \(i)")
}
~~~

الشكل الكامل كان [[repeatTimes(3, action: { i in print(...) })]]. لأن الـ closure آخر argument، Swift بتسمح تقفل القوسين بدري وتكتبه برة **من غير label**. ده نفس شكل [[Button("حفظ") { ... }]] و [[VStack { ... }]] في SwiftUI.

~~~text الناتج
مرة 1
مرة 2
مرة 3
~~~

---

## ٤. closure بيمسك متغير (capture)

~~~swift
func makeCounter() -> () -> Int {
  var count = 0
  return {
    count += 1
    return count
  }
}
let next = makeCounter()
print(next(), next(), next())
~~~

- [[-> () -> Int]]: الدالة بترجّع closure، والـ closure ده نوعه [[() -> Int]] (مبياخدش حاجة وبيرجّع Int). اقراها: «بترجّع (حاجة مبتاخدش وبترجّع Int)».
- [[count]] متغير محلي في [[makeCounter]]، وكان المفروض يختفي أول ما الدالة تخلص.
- بس الـ closure اللي رجع **مسكه** (captured)، فالمتغير بيفضل عايش جوه الـ closure.
- كل نداء [[next()]] بيزود نفس الـ [[count]]:

~~~text الناتج
1 2 3
~~~

**التجربة:** عملنا [[let otherCounter = makeCounter()]] وناديناه مرتين، وبعدين [[next()]] تاني:

~~~text الناتج
1 2
4
~~~

[[otherCounter]] بدأ من 1، لأن كل نداء لـ [[makeCounter()]] بيعمل [[count]] جديد خاص بيه. و [[next]] كمّل من 4 لوحده.

---

## ٥. [[@escaping]]: closure هيعيش بعد الدالة

~~~swift
var handlers: [() -> Void] = []
func store(in list: inout [() -> Void], _ handler: @escaping () -> Void) {
  list.append(handler)
}
store(in: &handlers) { print("خلصنا") }
handlers.forEach { $0() }
~~~

- [[[() -> Void]]]: array من closures.
- [[store]] مش بتنادي الـ closure، بتحطه في الـ array عشان يتنادى **بعد** ما [[store]] نفسها ترجع. ده اسمه escaping (الـ closure «هرب» من الدالة)، ولازم تقولها صريحة بـ [[@escaping]]. الـ [[@]] بتعلّم attribute: معلومة زيادة للـ compiler.
- [[inout]] و [[&handlers]]: عشان الإضافة تحصل في الـ array الأصلية (درس الدوال).
- [[handlers.forEach { $0() }]]: [[$0]] هنا هو الـ closure المتخزن نفسه، و [[()]] بتناديه.

~~~text الناتج
خلصنا
~~~

**التجربة:** شلنا [[@escaping]]:

~~~text الناتج
main.swift:26:15: error: converting non-escaping parameter 'handler' to generic parameter 'Element' may allow it to escape
~~~

الترجمة: «انت بتحط closure مش escaping جوه array (اللي نوع عنصرها [[Element]])، وده ممكن يخليه يهرب». الـ closures من غير [[@escaping]] الـ compiler ضامن إنها هتتنادى وتخلص جوه الدالة، فمينفعش تتخزن.

~~~text الناتج كله
5
مرة 1
مرة 2
مرة 3
1 2 3
خلصنا
~~~

---

## الخلاصة

| الشكل | مثال |
|---|---|
| كامل | [[{ (a: Int, b: Int) -> Int in return a + b }]] |
| النوع معروف | [[{ a, b in a + b }]] |
| أسماء جاهزة | [[{ $0 + $1 }]] |
| trailing | [[f(3) { i in ... }]] |
| نوع closure | [[(Int) -> Void]] و [[() -> Int]] |
| هيتخزن | [[@escaping () -> Void]] |

والـ closure بيمسك المتغيرات اللي حواليه ويفضل شايفها.`,
          lines: [
            R`closure في ثابت، ونوعه [[(Int, Int) -> Int]]. الأسماء قبل [[in]].`,
            "بننادي الـ closure زي أي دالة: 5.",
            R`[[action]] نوعه closure بياخد Int ومبيرجعش حاجة ([[Void]]).`,
            "بنلف n مرة.",
            "بننادي الـ closure اللي اتبعت.",
            "قفلة.",
            "قفلة.",
            R`trailing closure: [[action:]] اتكتب برة القوسين من غير label.`,
            "جسم الـ closure.",
            "قفلة.",
            R`دالة بترجّع closure ([[() -> Int]]).`,
            "متغير محلي.",
            "بنرجّع closure بيمسك count.",
            "بيعدّل count حتى بعد ما makeCounter خلصت.",
            "بيرجّع القيمة الجديدة.",
            "قفلة الـ closure.",
            "قفلة الدالة.",
            "counter جديد.",
            "بيطبع 1 2 3.",
            "array بتخزن closures.",
            R`[[@escaping]] لأننا بنخزنه، و [[inout]] عشان نضيف في الـ array بتاعة اللي بينادي.`,
            "بنخزنه.",
            "قفلة.",
            R`[[&handlers]] للـ inout، والـ closure trailing.`,
            R`بننادي كل closure متخزن. [[$0]] هنا هو الـ closure نفسه، و [[()]] بتناديه.`
          ],
          sol: R`[[otherCounter()]] بيبدأ من 1 تاني: كل نداء لـ [[makeCounter()]] بيعمل متغير [[count]] جديد خاص بالـ closure ده. والأول بيكمّل لوحده (لو ناديته تاني هيطلع 4).

من غير [[@escaping]]: [[converting non-escaping parameter 'handler' to generic parameter 'Element' may allow it to escape]]، ومعناها إنك بتخزن closure من غير ما تقول إنه escaping.

ناتج المثال:`,
          solCode: R`5
مرة 1
مرة 2
مرة 3
1 2 3
خلصنا`
        }
      ]
    }
]);

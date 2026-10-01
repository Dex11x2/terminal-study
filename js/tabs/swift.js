// تاب Swift و iOS
// الأمثلة اللي من غير SwiftUI أو UIKit اتجربت على Swift 6 (swift main.swift). وأمثلة SwiftUI محتاجة Xcode على ماك.
TAB("swift", {
  label: "Swift و iOS",
  prompt: "$ ",
  lab: R`swift --version
swift main.swift
swift run`,
  labText: "لو عندك ماك: نزّل Xcode من App Store، واعمل Playground أو مشروع iOS وجرّب فيه. لو على Windows أو Linux: نزّل Swift من swift.org (أو استخدم Docker: docker run --rm -it -v \"$PWD\":/src -w /src swift swift main.swift)، واعمل فولدر lab/swift وحط فيه ملف main.swift لكل درس من المستوى الأول. SwiftUI وتطبيقات iPhone نفسها محتاجة ماك، بس اللغة كلها تقدر تتعلمها من غيره.",
  levels: {
    "1": ["لغة Swift من الصفر", "التجهيز، و let و var، والأنواع، والشروط والـ loops، والدوال، والـ optionals، والـ collections والـ closures، و struct و class و enum و protocol و generics، والأخطاء، والـ ARC"],
    "2": ["تطبيقات بـ SwiftUI", "مشروع Xcode، والـ View والـ stacks والـ modifiers، والـ List، والحالة بـ @State و @Binding و @Observable، والتنقل بـ NavigationStack، والفورمز، والنت بـ async/await و Codable، والتخزين بـ AppStorage و SwiftData، و UIKit"],
    "3": ["المعمارية والنشر والشغل", "MVVM بأمانة، والـ actors و Swift 6 strict concurrency، و Swift Package Manager، والاختبارات بـ Swift Testing، والـ debugging، والتوقيع و TestFlight ومراجعة App Store، وسوق الشغل ومشروع التخرج"]
  },
  categories: [
    {
      t: "ابدأ: Swift والأدوات",
      l: 1,
      n: "تجهّز Swift على ماك أو Windows أو Linux، وأول برنامج، و let و var، والأنواع والعمليات الحسابية",
      items: [
        {
          cmd: "تجهيز Swift",
          title: "تجهّز Swift إزاي على ماك أو Windows أو Linux، وإيه اللي محتاج ماك فعلًا",
          desc: R`[[Swift]] لغة Apple لتطبيقات iPhone و iPad و Mac و Apple Watch. طلعت سنة 2014 بديل لـ Objective-C، وهي open source من 2015، ودلوقتي في الإصدار 6 (Swift 6.x).

خليني أكون صريح معاك من الأول لأن ده بيفرق في قرارك:
1. عشان تبني تطبيق iPhone وتشغّله على جهاز وترفعه على App Store لازم [[Xcode]]، و Xcode بيشتغل على [[macOS]] بس. مفيش طريقة رسمية تبني تطبيق iOS من Windows أو Linux. (فيه خدمات ماك على السحابة زي GitHub Actions بـ macOS runners أو تأجير ماك، بس دي مش بيئة تعلم مريحة).
2. لكن اللغة نفسها شغالة على Linux و Windows. يعني كل المستوى الأول من التاب ده (اللغة) تقدر تتعلمه وتشغّله على أي جهاز. وكمان Swift بتتكتب بيها سيرفرات (server-side Swift بـ [[Vapor]] أو [[Hummingbird]]).
3. أرخص بداية جادة لـ iOS: ماك مستعمل بمعالج Apple Silicon ([[M1]] أو أحدث). الماكات القديمة بـ Intel ممكن متشغلش آخر Xcode، و Apple بتطلب كل سنة نسخة Xcode حديثة عشان ترفع على المتجر.

الأدوات:
• على الماك: [[Xcode]] من App Store (حجمه كبير، سيبله مساحة 40 جيجا على الأقل)، وجواه Swift و iOS Simulator. و [[Swift Playgrounds]] تطبيق أخف على الماك والـ iPad للتعلم.
• على Linux: من [[swift.org/install]] (الأداة الرسمية اسمها [[swiftly]])، أو Docker image اسمها [[swift]].
• على Windows: installer رسمي من swift.org، و VS Code مع إضافة Swift.

[[swift main.swift]] بيشغّل ملف واحد على طول، و [[swift package init]] بيعمل مشروع كامل بـ [[Package.swift]]، و [[swift run]] بيبنيه ويشغّله.`,
          example: R`# على الماك بعد ما تنزّل Xcode وتفتحه مرة
xcodebuild -version
swift --version
# على أي جهاز فيه Docker (Linux أو Windows أو ماك)
docker run --rm -it -v "$PWD":/src -w /src swift swift --version
# مشروع سطر أوامر صغير، يشتغل في أي مكان فيه Swift
mkdir Hello && cd Hello
swift package init --type executable
swift run`,
          try: R`نفّذ [[swift --version]] (أو أمر الـ Docker). وبعدين اعمل مشروع [[Hello]] بـ [[swift package init --type executable]] وافتح [[Sources/main.swift]]، غيّر الرسالة لاسمك، وشغّل [[swift run]] تاني.`,
          deep: {
            why: R`ناس كتير بتشتري كورس iOS وتكتشف بعد أسبوع إن جهازها Windows ومش هينفع. لو عارف الحقيقة من الأول تقدر تخطط: اتعلم اللغة دلوقتي على جهازك، واجمع لماك مستعمل لما توصل لـ SwiftUI. أو لو مش ناوي تشتري ماك خالص، Flutter أو React Native بيطلّعوا تطبيقات iOS بس برضه محتاجين ماك عشان البناء النهائي والرفع (أو خدمة build سحابية زي EAS أو Codemagic).`,
            how: R`Swift بتتحول لكود الآلة عن طريق compiler مبني على [[LLVM]] (نفس البنية التحتية بتاعة Clang و Rust). [[swift main.swift]] بيترجم الملف في الذاكرة ويشغّله على طول. [[swift build]] بيترجم المشروع وبيحط الناتج في [[.build/debug]]، و [[swift run]] = build + تشغيل. على الماك، Xcode بيستخدم نفس الـ compiler بس بيضيف الـ SDKs بتاعة iOS (UIKit و SwiftUI) والـ Simulator والتوقيع والرفع.

[[Foundation]] (التواريخ و JSON و URLSession) موجودة على Linux و Windows كمان (نسخة open source اسمها swift-foundation)، لكن [[SwiftUI]] و [[UIKit]] و [[SwiftData]] موجودين على أجهزة Apple بس.`,
            when: R`أول يوم. ولو على Linux أو Windows، كل دروس المستوى الأول تقدر تجربها بـ [[swift main.swift]]. من أول المستوى التاني (SwiftUI) هتحتاج ماك.`,
            mistakes: R`تنزّل Xcode من موقع غير App Store أو developer.apple.com. وتنسى تفتح Xcode مرة بعد التنزيل فيكمّل تثبيت الـ components. وتشتري ماك Intel قديم رخيص وتكتشف إن آخر Xcode مش بيدعمه. وتفتكر إن Swift Playgrounds على الـ iPad لعبة: ده بيبني تطبيقات SwiftUI حقيقية وتقدر ترفع منه على المتجر كمان.`
          },
          lines: [
            "بيطبع نسخة Xcode اللي على الماك (مثلًا Xcode 26.x).",
            "بيطبع نسخة Swift والـ target (مثلًا arm64-apple-macosx).",
            R`بيشغّل Swift جوه container: [[-v]] بيربط الفولدر الحالي بـ [[/src]]، و [[-w]] بيخلي الشغل فيه، و [[--rm]] بيمسح الـ container لما يخلص.`,
            R`فولدر للمشروع وتدخل جواه. اسم الفولدر هو اسم المشروع.`,
            R`بيعمل [[Package.swift]] و [[Sources/main.swift]] فيه [[print("Hello, world!")]].`,
            "بيبني المشروع ويشغّله."
          ],
          sol: R`[[swift --version]] بيطبع حاجة زي:
[[Swift version 6.0.3 (swift-6.0.3-RELEASE)]] وتحتها الـ target (على Linux [[x86_64-unknown-linux-gnu]] أو [[aarch64-unknown-linux-gnu]]).

و [[swift run]] أول مرة بيطبع سطور البناء ([[Building for debugging...]] و [[Build of product 'Hello' complete!]]) وبعدين:
[[Hello, world!]]

بعد ما تعدّل الملف:`,
          solCode: R`// Sources/main.swift
print("أهلًا، أنا سارة وده أول برنامج Swift ليا")`
        },
        {
          cmd: "مقدمة Swift والـ print",
          title: "تطبع بـ print وتحط قيم جوه النص بـ \\(...)، وتفرق بين let و var",
          desc: R`أول سطر Swift: [[print("أهلًا")]]. مفيش [[main]] ومفيش [[;]] في آخر السطر. الملف اللي اسمه [[main.swift]] بيتنفذ من فوق لتحت.

[[let]] بتعرّف ثابت (constant): قيمة بتتحط مرة واحدة ومش بتتغير. و [[var]] بتعرّف متغير (variable) تقدر تغيّر قيمته بعدين. القاعدة في Swift: ابدأ دايمًا بـ [[let]]، وحوّل لـ [[var]] لما تحتاج تغيّر فعلًا. والـ compiler نفسه بيساعدك: لو عملت [[var]] جوه دالة ومغيرتهاش هيديك تحذير «اتغيرتش، خليها let».

[[\(...)]] اسمه string interpolation: أي حاجة بين القوسين بعد الـ backslash بتتحسب وتتحط جوه النص. ينفع متغير [[\(name)]] أو عملية كاملة [[\(price * 2)]].

النصوص اللي على أكتر من سطر بتتكتب بين [[""" ... """]]. و [[//]] تعليق لحد آخر السطر، و [[/* ... */]] تعليق على كذا سطر. (مش [[#]] زي Python و bash: [[#]] في Swift معناه حاجة تانية خالص هتشوفها بعدين زي [[#if]] و [[#Preview]]).`,
          example: R`// let: ثابت، مينفعش يتغير
let appName = "مهامي"
// var: متغير
var doneCount = 0
doneCount += 1
// \(...) بتحط القيمة جوه النص
print("أهلًا في \(appName)، خلّصت \(doneCount) مهمة")
print("الباقي: \(5 - doneCount)")
// نص على أكتر من سطر
let report = """
  التطبيق: \(appName)
  المنجز: \(doneCount)
  """
print(report)`,
          try: R`ضيف السطر [[appName = "تاني"]] بعد التعريف وشغّل. اقرا رسالة الخطأ كويس. وبعدين حط الكود جوه دالة [[func run() { ... }]] ونادي [[run()]] في الآخر، وامسح سطر [[+= 1]] وشوف التحذير (في Xcode بيظهر أصفر).`,
          flag: "script",
          deep: {
            why: R`الكود اللي أغلب قيمه ثابتة أسهل في القراية: لما تشوف [[let]] بتطمن إن القيمة دي مش هتتغير في أي حتة تحت. وده كمان بيفرق مع الـ structs (هتشوف إن [[let]] على struct بتقفل كل خصائصه) ومع الـ concurrency (القيم الثابتة آمنة بين الـ threads).`,
            how: R`[[let]] و [[var]] الاتنين بيستنتجوا النوع من القيمة (هنا [[String]] و [[Int]]). [[print]] بتضيف سطر جديد في الآخر، ولو مش عايزه: [[print("x", terminator: "")]]. وبتاخد أكتر من قيمة: [[print("a", 1, true)]] بتطبعهم بمسافة بينهم.

في الـ [["""]]: المسافة اللي قبل الـ [["""]] الأخيرة بتتشال من أول كل سطر، عشان تقدر تعمل indent للنص جوه الكود من غير ما يطلع في الناتج.`,
            when: R`[[let]] افتراضيًا لأي قيمة، و [[var]] للعدادات والحاجات اللي بتتجمع أو بتتغير. و [[\(...)]] بدل جمع النصوص بـ [[+]] عشان أوضح.`,
            mistakes: R`تكتب [[#]] للتعليقات (عادة من Python): الكود مش هيترجم. وتكتب [["Count: " + count]] و count رقم: Swift مش بتحوّل الرقم لنص لوحدها، استخدم [[\(count)]]. وتنسى الـ backslash فتكتب [[(name)]] جوه النص فتطبع كلمة name نفسها. وتحط نص بعد [["""]] الأولى على نفس السطر: لازم السطر يبقى فاضي بعدها.`
          },
          lines: [
            R`ثابت اسمه [[appName]]، نوعه [[String]] اتستنتج من القيمة.`,
            R`متغير [[doneCount]] نوعه [[Int]] وبدايته صفر.`,
            R`[[+=]] بتزود 1 على القيمة الحالية. ينفع لأنه [[var]].`,
            R`[[\(appName)]] و [[\(doneCount)]] بيتبدلوا بقيمهم جوه النص.`,
            R`ينفع عملية حسابية كاملة جوه [[\(...)]].`,
            R`بداية نص على كذا سطر بـ [["""]]، وجواه interpolation عادي.`,
            "السطر الأول من النص.",
            "السطر التاني.",
            R`قفلة النص. المسافة اللي قبلها بتتشال من أول كل سطر.`,
            "بيطبع التقرير سطرين."
          ],
          sol: R`لما تضيف [[appName = "تاني"]] الـ compiler بيرفض: [[cannot assign to value: 'appName' is a 'let' constant]] ومعاه اقتراح يغيّرها لـ var.

ولما الكود يبقى جوه دالة وتشيل [[+= 1]]، بيطلع تحذير [[variable 'doneCount' was never mutated; consider changing to 'let' constant]]. البرنامج بيشتغل بس التحذير بيقولك إن [[let]] أنسب. (التحذير ده مش بيظهر للمتغيرات اللي في أعلى [[main.swift]] برة أي دالة، عشان كده حطيناه في دالة).

ناتج المثال الأصلي:`,
          solCode: R`أهلًا في مهامي، خلّصت 1 مهمة
الباقي: 4
التطبيق: مهامي
المنجز: 1`
        },
        {
          cmd: "الأنواع واستنتاجها",
          title: "Int و Double و String و Bool: Swift بتستنتج النوع إزاي، وليه مبتحولش بين الأنواع لوحدها",
          desc: R`كل قيمة في Swift ليها نوع ثابت مبيتغيرش. الأساسيين:
• [[Int]] أرقام صحيحة ([[42]] و [[-7]]).
• [[Double]] أرقام بكسور بدقة عالية ([[3.14]]). وفيه [[Float]] أقل دقة ونادرًا ما بتحتاجه.
• [[String]] نص، و [[Character]] حرف واحد.
• [[Bool]] يا [[true]] يا [[false]].

استنتاج الأنواع (type inference): لما تكتب [[let x = 5]] الـ compiler بيعرف إنها [[Int]] من غير ما تقوله. ولو عايز تحدد النوع بنفسك تكتب [[:]] وبعدها النوع: [[let price: Double = 5]] (هنا بقت [[5.0]] مش [[5]]). اسمها type annotation، والـ [[:]] دي هتشوفها في كل حتة في Swift: في الـ parameters والـ properties.

أهم قاعدة: Swift مبتحولش بين الأنواع لوحدها (no implicit conversion). [[Int]] زائد [[Double]] = خطأ compile. لازم تحوّل بإيدك: [[Double(count)]] أو [[Int(3.9)]] (اللي بيقص الكسر ويطلع 3). وتحويل نص لرقم [[Int("42")]] ممكن يفشل (لو النص "abc")، فبيرجّع نوع اسمه [[Int?]] (optional) هتفهمه في درس الـ optionals.

[[type(of: x)]] بتقولك نوع أي قيمة، مفيدة وانت بتتعلم.`,
          example: R`let count = 3
let price = 12.5
let name = "قلم"
let inStock = true
// تحديد النوع بنفسك بـ :
let tax: Double = 2
print(type(of: count), type(of: price), type(of: tax))
// Int و Double مينفعش يتجمعوا من غير تحويل
let total = Double(count) * price + tax
print("\(count) \(name) بـ \(total) جنيه، متاح: \(inStock)")
// Int(...) من Double بتقص الكسر
print(Int(9.99))
// Int من نص ممكن يفشل، فالناتج Optional
let parsed = Int("42")
print(parsed as Any, Int("abc") as Any)
print(Int.max)`,
          try: R`غيّر سطر [[total]] لـ [[let total = count * price + tax]] من غير [[Double(...)]] واقرا الخطأ. وبعدين جرّب [[let big: Int = Int.max + 1]] وشوف Swift بتقول إيه.`,
          flag: "script",
          deep: {
            why: R`في JavaScript [["5" * 2]] بتطلع 10 و [["5" + 2]] بتطلع "52"، وده مصدر bugs مشهور. Swift قررت إن أي تحويل لازم يبقى مكتوب، فالـ bug بيظهر وقت الـ compile مش عند المستخدم. التمن: شوية [[Double(...)]] زيادة في الكود.`,
            how: R`الـ compiler بيستنتج من القيمة الحرفية (literal): رقم من غير علامة عشرية = [[Int]]، برقم عشري = [[Double]]، بين [[""]] = [[String]]. لو حددت النوع بـ [[:]] الـ literal بيتأقلم عليه، فـ [[let tax: Double = 2]] صح. لكن [[let n = 2]] وبعدين [[let d: Double = n]] غلط لأن [[n]] بقت Int خلاص.

[[Int]] على أجهزة 64-bit (كل أجهزة Apple الحالية) حجمه 64 bit، و [[Int.max]] = 9223372036854775807. والـ overflow في Swift مش بيلف بهدوء زي C: بيوقف البرنامج (crash) لأنه غالبًا bug. ولو عايز اللف فعلًا فيه عمليات خاصة زي [[&+]].

[[as Any]] في المثال بس عشان نطبع optional من غير تحذير. ومش هتحتاجها في الكود العادي.`,
            when: R`سيب الاستنتاج يشتغل في أغلب الحالات، وحط النوع بـ [[:]] لما القيمة الأولية مش بتوضح النوع اللي عايزه (زي [[Double]] بقيمة صحيحة)، أو في الـ properties بتاعة الـ structs.`,
            mistakes: R`تستخدم [[Float]] من غير سبب: [[Double]] هو الافتراضي. وتستخدم [[Double]] للفلوس في تطبيق حقيقي: [[0.1 + 0.2]] مش بالظبط 0.3، فاستخدم [[Decimal]] أو خزّن القروش كـ [[Int]]. وتفتكر إن [[Int(9.99)]] بيقرّب لـ 10: هو بيقص، والتقريب [[Int(9.99.rounded())]].`
          },
          lines: [
            R`[[Int]] اتستنتج من الرقم الصحيح.`,
            R`[[Double]] عشان فيه علامة عشرية.`,
            R`[[String]].`,
            R`[[Bool]].`,
            R`النوع محدد بـ [[: Double]]، فالـ 2 بقت 2.0.`,
            R`[[type(of:)]] بتطبع نوع كل قيمة.`,
            R`[[Double(count)]] بتحوّل الـ Int لـ Double عشان نقدر نضرب ونجمع.`,
            "interpolation لكل القيم.",
            R`بيقص الكسر: 9 مش 10.`,
            R`[[Int("42")]] ممكن يفشل، فالنوع [[Int?]].`,
            R`بيطبع القيمتين. [[as Any]] بس عشان نطبع optional من غير تحذير.`,
            "أكبر Int ممكن."
          ],
          sol: R`[[count * price]] من غير تحويل بيطلّع: [[binary operator '*' cannot be applied to operands of type 'Int' and 'Double']].

و [[Int.max + 1]] بثوابت الـ compiler بيكتشفه قبل التشغيل: [[arithmetic operation '9223372036854775807 + 1' (on type 'Int') results in an overflow]]. ولو الأرقام جاية وقت التشغيل البرنامج بيقع بدل ما يكمّل بقيمة غلط.

ناتج المثال الأصلي:`,
          solCode: R`Int Double Double
3 قلم بـ 39.5 جنيه، متاح: true
9
Optional(42) nil
9223372036854775807`
        },
        {
          cmd: "العمليات الحسابية والمقارنة",
          title: "+ و / و % و == و && في Swift: القسمة الصحيحة، ومفيش ++، والـ overflow بيوقف البرنامج",
          desc: R`العمليات الحسابية: [[+]] و [[-]] و [[*]] و [[/]] و [[%]] (باقي القسمة). القسمة على [[Int]] بتقص الكسر: [[7 / 2]] = 3. لو عايز 3.5 لازم واحد منهم يبقى [[Double]].

العمليات المختصرة: [[+=]] و [[-=]] و [[*=]] و [[/=]]. ومفيش [[++]] ولا [[--]] في Swift (اتشالوا في Swift 3)، فاكتب [[i += 1]].

المقارنة بترجّع [[Bool]]: [[==]] و [[!=]] و [[<]] و [[>]] و [[<=]] و [[>=]]. والنصوص بتتقارن بـ [[==]] عادي (مقارنة محتوى مش مكان في الذاكرة).

المنطق: [[&&]] (و)، و [[||]] (أو)، و [[!]] قبل القيمة (نفي). والـ ternary: [[شرط ? قيمة1 : قيمة2]].

وفيه عملية [[===]] بتلات علامات، دي بتسأل «هما نفس الـ object في الذاكرة؟» ومع الـ classes بس (هتفهمها في درس struct و class).`,
          example: R`let a = 7, b = 2
print(a / b, a % b)
print(Double(a) / Double(b))
var score = 10
score += 5
score *= 2
print(score)
let isAdult = 20 >= 18
let hasTicket = false
print(isAdult && hasTicket, isAdult || hasTicket, !hasTicket)
// ternary: شرط ? لو صح : لو غلط
let label = score > 25 ? "ممتاز" : "كويس"
print(label)
print("swift" == "Swift", "abc" < "abd")
print(2.0.squareRoot(), (10.0 / 3).rounded())`,
          try: R`اكتب [[score++]] وشوف الخطأ. وبعدين احسب متوسط 3 درجات [[Int]] (90 و 85 و 82) بطريقتين: مرة بقسمة Int ومرة بـ Double، واطبع الاتنين.`,
          flag: "script",
          deep: {
            why: R`[[++]] اتشالت لأنها كانت بتعمل لخبطة ([[i++]] ولا [[++i]]؟) وبتشجع loops على طريقة C. Swift بتفضل كود واضح: [[i += 1]] مفيهوش أي غموض.`,
            how: R`العمليات في Swift دوال عادية. [[+]] على [[String]] بتجمع النصوص، وعلى [[Array]] بتلزق المصفوفتين. وتقدر تعرّف [[+]] و [[==]] لأنواعك انت (operator overloading)، وده اللي بيحصل لما نوعك يتبع [[Equatable]].

لو الحساب طلع برة حدود [[Int]] وقت التشغيل البرنامج بيقف بـ crash (مش بيكمّل بقيمة غلط). و [[&+]] و [[&*]] عمليات بتلف عمدًا لو محتاج ده (في الـ hashing مثلًا).

مقارنة النصوص بـ [[<]] بتمشي بالترتيب الحرفي (Unicode)، فـ [["Z" < "a"]] صح.`,
            when: R`الـ ternary للقيم البسيطة اللي بتتحدد بشرط واحد (زي النص في زرار)، ولو الشرط معقد استخدم [[if]] أو [[switch]] كـ expression (درس الشروط).`,
            mistakes: R`تقسم Int على Int وتستنى كسر. وتكتب [[if x = 5]] بدل [[==]]: Swift بترفضها (حلو). وتقارن Double بـ [[==]] بعد حسابات: [[0.1 + 0.2 == 0.3]] بيطلع [[false]]، قارن بفرق صغير. وتكتب [[a ?b : c]] من غير مسافات حوالين [[?]]: Swift بتحتاج مسافة قبل [[?]] بتاع الـ ternary وإلا هتفهمه optional.`
          },
          lines: [
            R`ثابتين في سطر واحد مفصولين بـ [[,]].`,
            R`قسمة Int بتقص: 3، والباقي 1.`,
            "لما نحوّل لـ Double القسمة بتطلع 3.5.",
            "متغير لأن قيمته هتتغير.",
            "بقى 15.",
            "بقى 30.",
            "بيطبع 30.",
            R`[[>=]] بترجّع Bool.`,
            "Bool تاني.",
            R`[[&&]] و [[||]] و [[!]].`,
            R`لو الشرط صح القيمة الأولى، لو غلط التانية.`,
            "بيطبع ممتاز.",
            R`المقارنة حساسة لحالة الحروف، و [[<]] بتقارن بالترتيب.`,
            R`[[squareRoot]] و [[rounded]] دوال على الـ Double نفسه.`
          ],
          sol: R`[[score++]] بيطلّع خطأ [[cannot find operator '++' in scope; did you mean '+= 1'?]].

ناتج المثال الأصلي بالترتيب: [[3 1]] ثم [[3.5]] ثم [[30]] ثم [[false true true]] ثم [[ممتاز]] ثم [[false true]] ثم [[1.4142135623730951 3.0]].

والمتوسط: المجموع 257، فقسمة Int بتطلع [[85]] والكسر بيضيع، والـ Double بتطلع [[85.66666666666667]].`,
          solCode: R`let g1 = 90, g2 = 85, g3 = 82
print((g1 + g2 + g3) / 3)
print(Double(g1 + g2 + g3) / 3)`
        }
      ]
    },
    {
      t: "الشروط والـ loops والدوال",
      l: 1,
      n: "if و guard، و switch بالـ pattern matching، و for و ranges، والدوال بالـ argument labels و inout",
      items: [
        {
          cmd: "if و guard",
          title: "if و else في Swift، و guard اللي بيخرج بدري لو الشرط مش متحقق",
          desc: R`[[if]] زي أي لغة، بس من غير أقواس حوالين الشرط، والأقواس المعووجة [[{ }]] إجبارية حتى لو سطر واحد. والشرط لازم يبقى [[Bool]] فعلًا: [[if count]] و count رقم = خطأ (مفيش truthy و falsy زي JS).

[[guard]] عكس [[if]] في الشكل: [[guard شرط else { اخرج }]]. يعني «لازم الشرط ده يبقى صح، ولو مش صح اخرج من هنا». والـ [[else]] لازم يخرج فعلًا: [[return]] أو [[throw]] أو [[break]] أو [[continue]]، والـ compiler بيتأكد من ده.

ليه guard؟ عشان تكتب «الحالات الغلط» فوق وتخرج بدري (early exit)، والكود المهم يفضل على الشمال من غير ما يتدفن جوه if جوه if. هتشوفه أكتر مع الـ optionals في [[guard let]].

ومن Swift 5.9، [[if]] و [[switch]] ينفع يبقوا expression يرجّعوا قيمة: [[let x = if cond { "a" } else { "b" }]].`,
          example: R`func checkOrder(quantity: Int, inStock: Int) -> String {
  // guard: لو الكمية غلط اخرج على طول
  guard quantity > 0 else {
    return "الكمية لازم تبقى أكبر من صفر"
  }
  guard quantity <= inStock else {
    return "المتاح \(inStock) بس"
  }
  if quantity >= 10 {
    return "تمام، وليك خصم جملة"
  } else if quantity >= 5 {
    return "تمام، وليك شحن مجاني"
  } else {
    return "تمام"
  }
}
print(checkOrder(quantity: 0, inStock: 20))
print(checkOrder(quantity: 7, inStock: 20))
print(checkOrder(quantity: 30, inStock: 20))
// if كـ expression بترجّع قيمة
let stock = 3
let badge = if stock == 0 { "خلصان" } else if stock < 5 { "قرب يخلص" } else { "متاح" }
print(badge)`,
          try: R`احذف [[return]] من جوه أول [[guard]] (سيب الـ else فاضي) وشوف الـ compiler بيقول إيه. وبعدين اكتب دالة [[canVote(age: Int) -> Bool]] فيها [[guard]] بيرفض السن السالب.`,
          flag: "script",
          deep: {
            why: R`الـ pyramid of doom (if جوه if جوه if) بيصعّب القراية. مع [[guard]] كل شرط لازم بيتكتب في سطر وبيخرج لو مش متحقق، والقارئ بيعرف إن أي حاجة تحت الـ guards دي الشروط بتاعتها متحققة.`,
            how: R`الـ compiler بيعمل تحليل: لو [[else]] بتاع [[guard]] ممكن يكمّل لتحت من غير خروج، ده خطأ compile ([['guard' body must not fall through]]). وده ضمان حقيقي مش مجرد style.

الـ [[if]] expression: كل فرع لازم يرجّع قيمة من نفس النوع، ولازم يبقى فيه [[else]] في الآخر.`,
            when: R`[[guard]] في أول الدالة للـ validation والـ preconditions، و [[if]] للتفرع العادي في النص. ولو بتقارن قيمة واحدة بحالات كتير [[switch]] أحسن (الدرس الجاي).`,
            mistakes: R`تكتب [[guard]] بشرط معكوس في دماغك: [[guard x > 0]] معناها «لازم x أكبر من صفر» مش «لو x أكبر من صفر اخرج». وتنسى إن [[else]] بتاع guard لازم يخرج. وتحط أقواس حوالين الشرط بحكم العادة: شغالة بس مش style Swift.`
          },
          lines: [
            R`دالة بتاخد رقمين وبترجّع [[String]]. [[->]] معناها «بترجّع» (تفاصيل الدوال في درس الدوال).`,
            R`[[guard]]: لازم الكمية أكبر من صفر، وإلا ادخل الـ else.`,
            R`[[return]] بيخرج من الدالة. لازم الـ else يخرج.`,
            "قفلة الـ guard.",
            "guard تاني على المخزون.",
            R`رسالة فيها interpolation.`,
            "قفلة.",
            "هنا متأكدين إن الكمية سليمة. if عادي.",
            "فرع الجملة.",
            R`[[else if]] شرط تاني.`,
            "فرع الشحن المجاني.",
            R`[[else]] لأي حاجة غير كده.`,
            "الحالة العادية.",
            "قفلة الـ if.",
            "قفلة الدالة.",
            "بيطلع رسالة الكمية الغلط من أول guard.",
            "بيطلع شحن مجاني.",
            "بيطلع رسالة المخزون من تاني guard.",
            "ثابت للمخزون.",
            R`[[if]] بترجّع قيمة بتتحط في [[badge]] على طول.`,
            "بيطبع قرب يخلص."
          ],
          sol: R`الـ guard من غير خروج بيطلّع: [['guard' body must not fall through, consider using a 'return' or 'throw' to exit the scope]].

ناتج المثال: [[الكمية لازم تبقى أكبر من صفر]] ثم [[تمام، وليك شحن مجاني]] ثم [[المتاح 20 بس]] ثم [[قرب يخلص]].

حل الدالة:`,
          solCode: R`func canVote(age: Int) -> Bool {
  guard age >= 0 else {
    print("سن غلط: \(age)")
    return false
  }
  return age >= 18
}
print(canVote(age: -3), canVote(age: 16), canVote(age: 30))
// سن غلط: -3
// false false true`
        },
        {
          cmd: "switch والـ pattern matching",
          title: "switch في Swift: لازم يغطي كل الحالات، ومن غير break، وبيطابق ranges و tuples و where",
          desc: R`[[switch]] في Swift أقوى بكتير من C و JS:
1. لازم يبقى exhaustive: يغطي كل القيم الممكنة. مع [[Int]] أو [[String]] ده معناه لازم [[default]]. مع الـ enums بتاعتك (هتشوفها بعدين) ممكن تغطي كل الحالات من غير default، والـ compiler بيقولك لو نسيت حالة.
2. مفيش fallthrough تلقائي: كل [[case]] بيخلص لوحده، فمش محتاج [[break]].
3. الـ case الواحد ممكن يبقى فيه كذا قيمة: [[case "a", "e", "i":]].
4. بيطابق ranges: [[case 90...100:]].
5. بيطابق tuples: [[case (0, 0):]]، و [[_]] معناها «أي قيمة، مش فارقة».
6. بيربط قيم بأسماء [[case let (x, y):]] ويضيف شرط بـ [[where]].

[[...]] (تلات نقط) اسمه closed range: من وإلى بالاتنين. و [[..<]] اسمه half-open range: من، لحد قبل الرقم التاني. يعني [[1...3]] = 1 و 2 و 3، و [[1..<3]] = 1 و 2 بس. هتستخدمهم كتير في الـ loops.

و [[_]] (underscore) في Swift معناها دايمًا «مش محتاج القيمة دي»: في switch، وفي loops، وفي أسماء parameters (درس الدوال).`,
          example: R`func grade(_ score: Int) -> String {
  switch score {
  case 90...100: return "امتياز"
  case 75..<90: return "جيد جدًا"
  case 50..<75: return "مقبول"
  case 0..<50: return "راسب"
  default: return "درجة غلط"
  }
}
print(grade(95), grade(75), grade(30), grade(120))
let point = (3, 0)
switch point {
case (0, 0):
  print("في نقطة الأصل")
case (_, 0):
  print("على محور x")
case let (x, y) where x == y:
  print("على القطر: \(x)")
default:
  print("في حتة تانية")
}
let command = "stop"
let message = switch command {
case "start", "run": "بنشغّل"
case "stop": "بنوقف"
default: "أمر مش معروف"
}
print(message)`,
          try: R`امسح [[default]] من دالة [[grade]] وشوف الخطأ. وبعدين اكتب switch على [[(isLoggedIn, isAdmin)]] (tuple من Bool) بيطبع رسالة لكل حالة من الأربعة من غير default.`,
          flag: "script",
          deep: {
            why: R`أكتر bug مشهور في switch بتاع C هو نسيان [[break]] فالكود بيكمّل في الـ case اللي بعده. Swift قلبت الافتراضي: مفيش كمّلة إلا لو كتبت [[fallthrough]] صريح. والـ exhaustiveness معناها إنك لما تضيف حالة جديدة لـ enum، كل switch في المشروع مش مغطيها هيطلع خطأ، فمش هتنسى مكان.`,
            how: R`الـ switch بيجرب الـ cases بالترتيب ويدخل أول واحد يطابق. المطابقة بتستخدم عملية [[~=]]: للـ range بتسأل [[range.contains(value)]]، وللقيم العادية [[==]]. عشان كده تقدر تطابق أي نوع [[Equatable]].

[[case let (x, y)]] بتطابق أي tuple وبتحط القيم في x و y، و [[where]] بيضيف شرط إضافي. والـ switch expression (Swift 5.9): كل case فيه قيمة واحدة بترجع.`,
            when: R`كل ما تقارن قيمة واحدة بأكتر من حالتين، ودايمًا مع الـ enums. في SwiftUI هتلاقيه جوه [[body]] كتير عشان تعرض شاشة حسب الحالة (loading و error و loaded).`,
            mistakes: R`تحط [[default]] مع enum بتاعك وانت مغطي كل الحالات: كده لما تضيف حالة جديدة الـ compiler مش هينبهك. وتكتب [[case 1...5]] وانت قصدك [[1..<5]]. وتعمل [[1...0]] (البداية أكبر من النهاية): البرنامج بيقع وقت التشغيل.`
          },
          lines: [
            R`[[_]] قبل [[score]] معناها إن اللي بينادي مش بيكتب اسم الـ parameter: [[grade(95)]].`,
            R`[[switch]] على الدرجة.`,
            R`[[90...100]] من 90 لـ 100 والاتنين داخلين.`,
            R`[[75..<90]] من 75 لـ 89.`,
            "50 لـ 74.",
            "0 لـ 49.",
            R`[[default]] لازم عشان Int ليه قيم تانية كتير.`,
            "قفلة الـ switch.",
            "قفلة الدالة.",
            "أربع نتايج.",
            R`tuple فيه رقمين.`,
            "switch على الـ tuple.",
            "الاتنين صفر بالظبط.",
            "بيطبع لو النقطة (0, 0).",
            R`[[_]] أي x، بس y صفر.`,
            "بيطبع لو y صفر.",
            R`يربط القيمتين بأسماء، و [[where]] شرط زيادة.`,
            R`بيستخدم [[x]] اللي اتربطت.`,
            "أي حاجة تانية.",
            "بيطبع لو مفيش حاجة طابقت.",
            "قفلة.",
            "نص الأمر.",
            R`switch كـ expression، القيمة بتتحط في [[message]].`,
            R`case فيه قيمتين.`,
            "case واحد.",
            "default بقيمة.",
            "قفلة.",
            "بيطبع بنوقف."
          ],
          sol: R`من غير default: [[switch must be exhaustive]] ومعاه اقتراح [[add a default clause]].

ناتج المثال: [[امتياز جيد جدًا راسب درجة غلط]]، ثم [[على محور x]]، ثم [[بنوقف]].

حل التمرين: الـ tuple من اتنين Bool ليه 4 حالات بالظبط، فلو غطيتهم الـ compiler بيعرف إن الـ switch كامل.`,
          solCode: R`let isLoggedIn = true, isAdmin = false
switch (isLoggedIn, isAdmin) {
case (true, true): print("أهلًا يا أدمن")
case (true, false): print("أهلًا")
case (false, true): print("حالة غريبة: أدمن مش عامل login")
case (false, false): print("سجّل دخول الأول")
}
// أهلًا`
        },
        {
          cmd: "for و while و ranges",
          title: "for-in على range أو array، و ..< و ... و stride، و while و repeat",
          desc: R`[[for item in collection]] هو الـ loop الأساسي. بيلف على أي حاجة تتلف عليها: range، أو array، أو dictionary، أو string (حرف حرف).

[[for i in 0..<5]] = 0 لحد 4 (خمس مرات). و [[for i in 1...5]] = 1 لحد 5. ولو مش محتاج الرقم نفسه: [[for _ in 1...3]].

[[stride(from:to:by:)]] للخطوات: [[stride(from: 0, to: 10, by: 2)]] = 0 و 2 و 4 و 6 و 8 (من غير 10)، و [[through:]] بدل [[to:]] بتدخّل الآخر. وينفع بخطوة سالبة عشان تعد لورا. و [[.reversed()]] على range كمان بيعد لورا.

[[.enumerated()]] بتديك الرقم والعنصر مع بعض: [[for (i, name) in names.enumerated()]].

[[while شرط { }]] بيلف طول ما الشرط صح. و [[repeat { } while شرط]] بيتنفذ مرة على الأقل قبل ما يشيك. و [[break]] بيخرج من الـ loop، و [[continue]] بيعدّي للفة اللي بعدها.

مفيش [[for (i = 0; i < n; i++)]] بتاعة C في Swift.`,
          example: R`for i in 1...3 {
  print("لفة \(i)")
}
let names = ["سارة", "علي", "منى"]
for (index, name) in names.enumerated() {
  print("\(index + 1). \(name)")
}
for n in stride(from: 10, through: 0, by: -5) {
  print(n, terminator: " ")
}
print()
var sum = 0
for n in 1...100 where n % 2 == 0 {
  sum += n
}
print("مجموع الزوجي:", sum)
var attempts = 0
while attempts < 5 {
  attempts += 1
  if attempts == 2 { continue }
  if attempts == 4 { break }
  print("محاولة \(attempts)")
}`,
          try: R`اطبع جدول ضرب 7 من 1 لـ 10 بـ [[for]]. وبعدين اعمل loop على [[names]] بيطبع الأسماء بالعكس من غير ما تعمل array جديدة بإيدك (فكّر في [[reversed()]]).`,
          flag: "script",
          deep: {
            why: R`الـ loop على collection مباشرة بيشيل أشهر bugs الـ index (off-by-one و index برة الحدود). و [[..<]] متصمم عشان [[0..<array.count]] تمشي بالظبط على كل الـ indexes من غير -1.`,
            how: R`[[for-in]] بيشتغل مع أي نوع بيتبع protocol اسمه [[Sequence]]: بيطلب منه iterator وينادي [[next()]] لحد ما يرجّع nil. الـ ranges نفسها نوع ([[ClosedRange]] و [[Range]]) مش array، فـ [[1...1_000_000]] مبتاخدش ذاكرة.

[[where]] في الـ for بيعدّي العناصر اللي مش محققة الشرط، زي [[continue]] في الأول. والـ [[_]] في الأرقام زي [[1_000_000]] مجرد فاصل للقراية.`,
            when: R`[[for-in]] في 90% من الحالات. [[while]] لما مش عارف عدد اللفات (قراية لحد ما الداتا تخلص، retry لحد ما ينجح). و [[repeat-while]] نادرًا (منيو لازم يظهر مرة على الأقل).`,
            mistakes: R`تكتب [[0...names.count]] بدل [[..<]] فتقرا عنصر برة المصفوفة والبرنامج يقع بـ [[Index out of range]]. وأحسن من الاتنين: [[for name in names]] أو [[names.indices]]. وتغيّر array وانت بتلف عليها وتستنى إن الـ loop يشوف التغيير: الـ for بيلف على نسخة.`
          },
          lines: [
            R`من 1 لـ 3 والتلاتة داخلين.`,
            "بيطبع رقم اللفة.",
            "قفلة.",
            "array فيها 3 أسماء.",
            R`[[enumerated()]] بتدي (رقم، عنصر). الرقم بيبدأ من 0.`,
            "بنزود 1 عشان الترقيم يبدأ من 1.",
            "قفلة.",
            R`من 10 لـ 0 بخطوة -5، و [[through]] بتدخّل الصفر.`,
            R`[[terminator: " "]] بدل السطر الجديد، فالأرقام تطلع جنب بعض.`,
            "قفلة.",
            R`[[print()]] فاضية بتنزل سطر.`,
            "مجموع بيبدأ من صفر.",
            R`[[where]] بياخد الزوجي بس.`,
            "بنجمع.",
            "قفلة.",
            R`[[print]] بقيمتين.`,
            "عداد المحاولات.",
            "while طول ما أقل من 5.",
            "بنزود الأول.",
            R`[[continue]]: سيب باقي اللفة دي.`,
            R`[[break]]: اخرج من الـ loop كله.`,
            "بيطبع المحاولة.",
            "قفلة."
          ],
          sol: R`ناتج المثال: [[لفة 1]] و [[لفة 2]] و [[لفة 3]]، ثم [[1. سارة]] و [[2. علي]] و [[3. منى]]، ثم [[10 5 0]]، ثم [[مجموع الزوجي: 2550]]، ثم [[محاولة 1]] و [[محاولة 3]] (2 اتعدّت بـ continue، و 4 خرجت بـ break).

حل التمرين:`,
          solCode: R`for i in 1...10 {
  print("7 × \(i) = \(7 * i)")
}
for name in names.reversed() {
  print(name)
}
// منى
// علي
// سارة`
        },
        {
          cmd: "الدوال و argument labels",
          title: "تكتب دالة بـ func و ->، وتفهم argument labels و _ والقيم الافتراضية و inout و &",
          desc: R`[[func name(param: Type) -> ReturnType { }]]. السهم [[->]] بيقول نوع القيمة اللي الدالة بترجّعها. ولو مش بترجّع حاجة بتشيل [[->]] خالص.

أهم حاجة غريبة في Swift: الـ argument labels. لما تنادي الدالة بتكتب اسم كل parameter: [[greet(name: "سارة")]]. والهدف إن الاستدعاء يتقري كجملة إنجليزي.
• ممكن تدّي الـ parameter اسمين: واحد للي بينادي وواحد جوه الدالة: [[func send(to user: String)]]. بتناديها [[send(to: "علي")]] وجوه الدالة اسمها [[user]].
• [[_]] كـ label معناها «من غير اسم وانت بتنادي»: [[func square(_ n: Int)]] بتتنادى [[square(4)]].

القيم الافتراضية: [[func greet(name: String, excited: Bool = false)]]، ممكن تنادي من غير [[excited]].

[[inout]]: الـ parameters عادةً ثوابت جوه الدالة (زي [[let]]). لو عايز الدالة تعدّل متغير بتاع اللي بينادي، تكتب [[inout]] قبل النوع، وانت بتنادي تحط [[&]] قبل المتغير: [[addBonus(to: &salary)]]. الـ [[&]] تذكير واضح إن المتغير ده هيتغير.

الدالة ممكن ترجّع tuple فيه أكتر من قيمة بأسماء: [[-> (min: Int, max: Int)]].

ولو جسم الدالة expression واحد، ممكن تشيل [[return]].`,
          example: R`func greet(name: String, excited: Bool = false) -> String {
  excited ? "أهلًا يا \(name)!!" : "أهلًا يا \(name)"
}
print(greet(name: "سارة"))
print(greet(name: "علي", excited: true))
// label برة (to) واسم جوه (user)
func send(_ message: String, to user: String) {
  print("بنبعت «\(message)» لـ \(user)")
}
send("اجتماع الساعة 3", to: "منى")
// inout: الدالة بتعدّل متغير اللي بينادي
func addBonus(to salary: inout Int, percent: Int) {
  salary += salary * percent / 100
}
var mySalary = 10_000
addBonus(to: &mySalary, percent: 15)
print(mySalary)
// ترجيع أكتر من قيمة في tuple
func minMax(_ numbers: [Int]) -> (min: Int, max: Int) {
  var lo = numbers[0], hi = numbers[0]
  for n in numbers {
    lo = min(lo, n)
    hi = max(hi, n)
  }
  return (lo, hi)
}
let range = minMax([4, 9, 1, 7])
print(range.min, range.max)`,
          try: R`اكتب دالة [[func price(_ base: Double, discount: Double = 0) -> Double]] بترجّع السعر بعد الخصم، ونادِها مرة بخصم ومرة من غيره. وبعدين نادي [[addBonus]] من غير [[&]] واقرا الخطأ.`,
          flag: "script",
          deep: {
            why: R`الـ labels جاية من Objective-C، وفكرتها إن [[move(from: a, to: b)]] أوضح من [[move(a, b)]] (مين اللي من ومين اللي لـ؟). وده بيأثر على تصميم الـ APIs كلها في iOS: هتلاقي [[insert(_:at:)]] و [[index(of:)]] و [[sheet(isPresented:content:)]].`,
            how: R`اسم الدالة الكامل بيشمل الـ labels: [[send(_:to:)]] و [[greet(name:excited:)]]، فممكن يبقى فيه دالتين بنفس الاسم وlabels مختلفة (overloading).

[[inout]] بيشتغل بـ copy-in copy-out: القيمة بتتنسخ جوه، والدالة بتشتغل عليها، ولما ترجع النسخة بتتكتب في المتغير الأصلي. عشان كده لازم [[var]] (مينفعش [[let]] ولا literal). والـ [[&]] هنا مش pointer زي C، ده بس علامة inout.

[[min]] و [[max]] دوال جاهزة في Swift. و [[[Int]]] يعني array من Int (درس الـ collections).`,
            when: R`labels: سيب الافتراضي (label = اسم الـ parameter) في أغلب الحالات، واستخدم [[_]] لما أول argument واضح من اسم الدالة ([[print(x)]] و [[square(4)]])، وlabel برة مختلف لما بيخلي الجملة أوضح ([[to:]] و [[from:]] و [[with:]]). و [[inout]] نادرًا: أغلب الوقت رجّع قيمة جديدة أوضح.`,
            mistakes: R`تنادي من غير label فيطلع [[missing argument label 'name:' in call]]. وتحاول تعدّل parameter عادي جوه الدالة ([[cannot assign to value: 'x' is a 'let' constant]]). وتستخدم [[numbers[0]]] من غير ما تتأكد إن الـ array مش فاضية: لو فاضية البرنامج يقع. (الحل الأنظف [[numbers.min()]] اللي بيرجّع optional).`
          },
          lines: [
            R`دالة بـ parameter عادي وواحد بقيمة افتراضية، وبترجّع [[String]].`,
            R`expression واحد، فمش محتاجين [[return]].`,
            "قفلة.",
            R`من غير [[excited]]، فبتاخد false.`,
            "بالـ parameter التاني.",
            R`[[_]] أول parameter من غير label، والتاني label برة [[to]] واسم جوه [[user]].`,
            R`جوه الدالة بنستخدم [[user]] مش [[to]].`,
            "قفلة.",
            "الاستدعاء بيتقري كجملة.",
            R`[[inout]] معناها إن التعديل هيرجع للمتغير الأصلي.`,
            "بنزود النسبة.",
            "قفلة.",
            R`[[var]] لازم. و [[10_000]] = 10000.`,
            R`[[&]] قبل المتغير إجباري مع inout.`,
            "بقى 11500.",
            R`بتاخد array وبترجّع tuple فيه min و max بأسماء.`,
            "أول عنصر بداية للاتنين.",
            "بنلف على الأرقام.",
            R`[[min]] دالة جاهزة.`,
            R`[[max]] دالة جاهزة.`,
            "قفلة.",
            "بنرجّع الـ tuple.",
            "قفلة.",
            "بنحفظ النتيجة.",
            "بنوصل للقيم بالأسماء."
          ],
          sol: R`من غير [[&]]: [[passing value of type 'Int' to an inout parameter requires explicit '&']].

ناتج المثال: [[أهلًا يا سارة]]، [[أهلًا يا علي!!]]، [[بنبعت «اجتماع الساعة 3» لـ منى]]، [[11500]]، [[1 9]].

حل الدالة:`,
          solCode: R`func price(_ base: Double, discount: Double = 0) -> Double {
  base - base * discount / 100
}
print(price(200))
print(price(200, discount: 25))
// 200.0
// 150.0`
        }
      ]
    },
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
    },
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
    },
    {
      t: "SwiftUI: أول شاشة",
      l: 2,
      n: "مشروع Xcode من جوه، والـ View و body و some View، والـ stacks، والـ modifiers وترتيبها، و List و ForEach (محتاج ماك من هنا)",
      items: [
        {
          cmd: "مشروع iOS في Xcode",
          title: "تعمل مشروع iOS في Xcode وتفهم ملفاته: @main و App و Scene و WindowGroup والـ Simulator",
          desc: R`من Xcode: File ← New ← Project ← iOS ← App. اختار:
• Product Name: اسم التطبيق. • Organization Identifier: نطاق بالعكس زي [[com.yourname]]. الاتنين مع بعض بيعملوا الـ Bundle Identifier ([[com.yourname.Tasks]]) وده الـ ID الفريد للتطبيق في العالم، ومينفعش يتغير بعد النشر.
• Interface: SwiftUI. • Storage: None (أو SwiftData لو عايز القالب يجهزها).

الملفات اللي هتلاقيها:
1. [[TasksApp.swift]]: نقطة البداية. فيه struct عليه [[@main]] وبيتبع [[App]].
2. [[ContentView.swift]]: أول شاشة.
3. [[Assets.xcassets]]: الصور والألوان وأيقونة التطبيق ([[AppIcon]]).
4. إعدادات الـ target (لما تدوس على اسم المشروع فوق): الـ Bundle ID، وأقل نسخة iOS بتدعمها (Minimum Deployments)، والتوقيع (Signing & Capabilities)، وتاب Info اللي فيه مفاتيح [[Info.plist]] زي رسايل الصلاحيات.

[[@main]] بيقول «من هنا التطبيق بيبدأ». و [[App]] protocol، و [[body]] بتاعه بيرجّع [[some Scene]]: الـ Scene حاجة النظام بيعرضها (على iPhone شاشة واحدة، على iPad و Mac ممكن كذا شباك). و [[WindowGroup]] الـ Scene العادي اللي جواه أول View.

التشغيل: اختار Simulator من فوق (أي iPhone) واضغط [[Cmd+R]]. أول build بياخد وقت. و [[Cmd+.]] بيوقف. ولو عايز تشغّل على موبايلك الحقيقي: وصّله بالكابل، واعمل Sign in بـ Apple ID في Xcode ← Settings ← Accounts، واختار الـ Team في Signing (حساب مجاني بيشغّل على جهازك بس، وبيتطلب تثبيت تاني كل 7 أيام).

الـ Canvas على يمين الكود بيعرض [[#Preview]] من غير ما تشغّل التطبيق كله ([[Cmd+Option+Enter]] يظهره ويخفيه).`,
          example: R`import SwiftUI

// @main: هنا التطبيق بيبدأ
@main
struct TasksApp: App {
  var body: some Scene {
    WindowGroup {
      ContentView()
    }
  }
}`,
          try: R`اعمل مشروع جديد اسمه Tasks بـ SwiftUI، وشغّله على Simulator. وبعدين افتح [[ContentView.swift]] وغيّر النص في [[Text]] ولاحظ الـ Canvas بيتحدث لوحده. ودوّر في إعدادات الـ target على الـ Bundle Identifier و Minimum Deployments.`,
          flag: "script",
          deep: {
            why: R`أول ساعة في Xcode بتلخبط ناس كتير: ملفات كتير وإعدادات في كل حتة. لما تعرف إن التطبيق كله بيبدأ من [[@main]] وإن كل شاشة struct بيتبع [[View]]، الباقي بيبقى تفاصيل. والـ Bundle ID لازم تفهمه من أول يوم لأنه مربوط بالتوقيع والمتجر والإشعارات.`,
            how: R`لما التطبيق يفتح، النظام بينادي النوع اللي عليه [[@main]]، وبياخد الـ [[body]] (Scenes)، ويعمل شباك فيه الـ View اللي جوه [[WindowGroup]]. ومن هنا SwiftUI بتحسب الـ [[body]] بتاع كل View وترسمه.

Xcode من نسخة 16 بيستخدم «buildable folders»: أي ملف تحطه في فولدر المشروع على الديسك بيدخل الـ build لوحده، فالتعديل من Finder أو من VS Code بقى أسهل من زمان.

[[Minimum Deployments]] بيحدد أقل iOS يقدر يشغّل التطبيق. كل ما تعلّيه تقدر تستخدم APIs أحدث (زي [[@Observable]] و SwiftData محتاجين iOS 17)، بس بتخسر الأجهزة القديمة. أغلب التطبيقات الجديدة دلوقتي بتبدأ من iOS 17 أو أعلى.`,
            when: R`أول خطوة في أي تطبيق. والـ [[App]] struct هو المكان اللي بتجهز فيه الحاجات المشتركة للتطبيق كله: الـ SwiftData container، وأي object هيتحط في الـ environment.`,
            mistakes: R`تختار Bundle ID عشوائي وتكتشف بعدين إنه لازم يتطابق مع اللي في App Store Connect. وتحط أقل iOS قديم جدًا فمتقدرش تستخدم [[@Observable]] و [[NavigationStack]]. وتستنى الـ Preview يشتغل وفيه خطأ compile في ملف تاني: الـ Preview محتاج المشروع كله يتبني.`
          },
          lines: [
            R`[[import SwiftUI]] بيجيب كل حاجة الواجهة محتاجاها.`,
            R`[[@main]]: نقطة بداية التطبيق. لازم تبقى في مكان واحد بس.`,
            R`struct بيتبع [[App]].`,
            R`[[body]] بترجّع [[some Scene]]: نوع Scene محدد الـ compiler عارفه.`,
            R`[[WindowGroup]]: الشباك العادي للتطبيق.`,
            "أول شاشة.",
            "قفلة WindowGroup.",
            "قفلة body.",
            "قفلة الـ struct."
          ],
          sol: R`هتشوف في الـ Simulator الأيقونة والنص اللي في [[ContentView]] (القالب بيعرض كرة أرضية و Hello, world!). ولما تعدّل النص الـ Canvas بيتحدث في ثانية من غير ما تعيد تشغيل.

الـ Bundle Identifier هتلاقيه في تاب General أو Signing & Capabilities، بالشكل [[com.yourname.Tasks]]. و Minimum Deployments في General تحت Supported Destinations، وغالبًا هيبقى آخر نسخة iOS: نزّلها لـ 17.0 لو عايز تدعم أجهزة أقدم ولسه تستخدم كل حاجة في التاب ده.`
        },
        {
          cmd: "مقدمة SwiftUI والـ View Protocol",
          title: "الـ View في SwiftUI: struct بيتبع View، وليه body بترجّع some View، و Text و Image و #Preview",
          desc: R`في SwiftUI كل حاجة على الشاشة View، وكل View عبارة عن [[struct]] بيتبع protocol اسمه [[View]]. الـ protocol بيطلب حاجة واحدة: property اسمها [[body]] بترجّع الواجهة.

[[var body: some View]]: الـ [[some View]] معناها «هرجّع نوع واحد محدد بيتبع View، بس متشغلش بالك بإسمه». الاسم الحقيقي بيبقى حاجة طويلة جدًا زي [[VStack<TupleView<(Image, Text, Text)>>]]، و [[some]] بتعفيك من كتابتها والـ compiler بيعرفها.

الـ SwiftUI declarative: انت بتوصف الشاشة شكلها إيه حسب الداتا الحالية، و SwiftUI بتعرضها وتحدثها لما الداتا تتغير. مش بتقول «امسح النص ده وحط ده» زي UIKit.

أساسيات:
• [[Text("...")]] نص. • [[Image(systemName: "star")]] أيقونة من SF Symbols (آلاف الأيقونات ببلاش من Apple، نزّل تطبيق SF Symbols عشان تدور فيهم). • [[Image("logo")]] صورة من Assets.
• الـ modifiers: [[.font(.title)]] و [[.foregroundStyle(.blue)]] و [[.padding()]]. كل modifier بيرجّع View جديد (درس الـ modifiers).

[[#Preview { ... }]] بيعرض الـ View في الـ Canvas. علامة [[#]] في Swift معناها macro (كود بيتولد وقت الـ compile)، مش تعليق.

والـ View بياخد بيانات من برة كـ properties عادية ([[let name: String]])، والـ memberwise init بيتعمل لوحده: [[ProfileCard(name: "سارة", role: "...")]].`,
          example: R`import SwiftUI

struct ProfileCard: View {
  let name: String
  let role: String
  var body: some View {
    VStack(spacing: 8) {
      Image(systemName: "person.crop.circle.fill")
        .font(.system(size: 56))
        .foregroundStyle(.blue)
      Text(name)
        .font(.title2.bold())
      Text(role)
        .foregroundStyle(.secondary)
    }
    .padding()
  }
}

#Preview {
  ProfileCard(name: "سارة", role: "iOS Developer")
}`,
          try: R`ضيف [[Text]] تالت تحت الـ role فيه المدينة، وخليه [[.font(.caption)]]. وبعدين اعمل [[#Preview]] تاني بيعرض كارتين فوق بعض جوه [[VStack]] بأسماء مختلفة.`,
          flag: "script",
          deep: {
            why: R`في UIKit كنت بتعمل الـ view مرة وتعدّل فيه بإيدك كل ما الداتا تتغير، ولو نسيت تحدث label الشاشة تبقى غلط. في SwiftUI الـ [[body]] دالة من الداتا للواجهة، فالشاشة دايمًا متطابقة مع الحالة. ولأن الـ Views structs صغيرة، SwiftUI تقدر تعمل منها آلاف وترميها كل ما تحسب من جديد.`,
            how: R`SwiftUI بتنادي [[body]] كتير جدًا (كل ما حاجة الـ View معتمد عليها تتغير)، فـ [[body]] لازم تبقى سريعة ومن غير side effects (متعملش طلب شبكة جواها). الـ structs دي مجرد وصف؛ SwiftUI بتقارن الوصف الجديد بالقديم وتعدّل اللي اتغير بس على الشاشة.

الـ [[body]] جواها result builder ([[@ViewBuilder]]): عشان كده بتكتب Views ورا بعض من غير [[return]] ومن غير فواصل، وتقدر تحط [[if]] و [[switch]] جواها.

وفي SDK الـ iOS 18 وما بعده، الـ [[View]] protocol نفسه [[@MainActor]]، يعني كل الـ Views بتشتغل على الـ main thread (درس الـ concurrency).`,
            when: R`كل شاشة وكل جزء متكرر في الشاشة (كارت، صف، زرار مخصوص) = View لوحده. لو الـ [[body]] عدّى 40 أو 50 سطر، قسّمه لـ Views أصغر.`,
            mistakes: R`تحط logic أو طلبات شبكة جوه [[body]]. وتعمل View واحد عملاق بـ 300 سطر. وتستخدم [[.foregroundColor]] القديمة (الأحدث [[.foregroundStyle]]). وتكتب [[return]] قبل أكتر من View في body فيطلع خطأ: الـ result builder بيجمعهم لوحده.`
          },
          lines: [
            "SwiftUI.",
            R`View = struct بيتبع protocol [[View]].`,
            "بيانات جاية من برة.",
            "بيانات تانية.",
            R`[[body]] المطلوبة، و [[some View]] نوع محدد مخفي.`,
            R`[[VStack]] بيرص اللي جواه فوق بعض بمسافة 8.`,
            R`أيقونة من SF Symbols.`,
            R`حجم الأيقونة بيتحدد بالـ font.`,
            R`لونها. [[.blue]] اختصار [[Color.blue]].`,
            "نص الاسم.",
            R`خط عنوان وعريض.`,
            "نص الوظيفة.",
            R`[[.secondary]] لون رمادي بيتأقلم مع الوضع الليلي.`,
            "قفلة الـ VStack.",
            R`مسافة حوالين الـ VStack كله.`,
            "قفلة body.",
            "قفلة الـ struct.",
            R`جوه [[#Preview]] (الـ macro اللي فوق): الـ View ببيانات تجريبية.`,
            "قفلة الـ Preview."
          ],
          sol: R`الكارت بعد الإضافة، والـ Preview بكارتين:`,
          solCode: R`struct ProfileCard: View {
  let name: String
  let role: String
  let city: String
  var body: some View {
    VStack(spacing: 8) {
      Image(systemName: "person.crop.circle.fill")
        .font(.system(size: 56))
        .foregroundStyle(.blue)
      Text(name).font(.title2.bold())
      Text(role).foregroundStyle(.secondary)
      Text(city).font(.caption)
    }
    .padding()
  }
}

#Preview("كارتين") {
  VStack {
    ProfileCard(name: "سارة", role: "iOS Developer", city: "القاهرة")
    ProfileCard(name: "علي", role: "Designer", city: "طنطا")
  }
}`
        },
        {
          cmd: "VStack و HStack و ZStack",
          title: "ترص العناصر بـ VStack و HStack و ZStack، وتتحكم في المسافات بـ Spacer و alignment و frame",
          desc: R`الـ layout في SwiftUI بيتعمل بالـ stacks:
• [[VStack]]: فوق بعض (vertical). • [[HStack]]: جنب بعض (horizontal). • [[ZStack]]: فوق بعض في العمق (طبقات، الأخير فوق).

كل stack بياخد [[alignment]] و [[spacing]]: [[VStack(alignment: .leading, spacing: 12)]]. الـ [[.leading]] و [[.trailing]] مش شمال ويمين: leading = بداية السطر، فبيقلبوا لوحدهم في العربي (RTL). وده سبب إنك متستخدمش [[.left]].

[[Spacer()]] بياخد كل المساحة الفاضية المتاحة. في HStack [[Text("أ") Spacer() Text("ب")]] بيزق الاتنين للأطراف.

[[.frame(maxWidth: .infinity)]] بيخلي الـ View ياخد العرض كله. و [[.frame(width: 80, height: 80)]] حجم ثابت.

القاعدة في الـ layout: الأب بيعرض مساحة على الابن، الابن بيختار حجمه، والأب بيحطه في مكانه. عشان كده [[Text]] بياخد حجم النص بس، و [[Color.red]] أو [[Spacer]] بياخدوا كل اللي يتعرض عليهم.

للقوايم الطويلة اللي جوه [[ScrollView]] استخدم [[LazyVStack]]: بيعمل العناصر بس لما تقرب تظهر. وللشبكات [[LazyVGrid]] أو [[Grid]].`,
          example: R`import SwiftUI

struct OrderRow: View {
  var body: some View {
    HStack(alignment: .top, spacing: 12) {
      ZStack(alignment: .bottomTrailing) {
        RoundedRectangle(cornerRadius: 12)
          .fill(.orange.gradient)
          .frame(width: 56, height: 56)
        Text("3")
          .font(.caption.bold())
          .padding(4)
          .background(.white, in: .circle)
      }
      VStack(alignment: .leading, spacing: 4) {
        Text("طلب #1042")
          .font(.headline)
        Text("3 منتجات · جاري التوصيل")
          .font(.subheadline)
          .foregroundStyle(.secondary)
      }
      Spacer()
      Text("450 ج")
        .font(.headline)
    }
    .padding()
  }
}`,
          try: R`شيل [[Spacer()]] وشوف السعر راح فين. وبعدين غيّر [[VStack(alignment: .leading]] لـ [[.trailing]]. وأخيرًا من Canvas غيّر اتجاه الـ layout لـ Right to Left (أو ضيف [[.environment(\.layoutDirection, .rightToLeft)]] على الـ Preview) ولاحظ إن leading بقت يمين.`,
          flag: "script",
          deep: {
            why: R`الـ stacks مع [[Spacer]] و [[frame]] بيعملوا 90% من أي تصميم من غير constraints زي Auto Layout في UIKit. والـ leading و trailing بيخلوا التطبيق يشتغل عربي وإنجليزي من غير ما تكتب layout مرتين.`,
            how: R`الـ layout بيتعمل على 3 خطوات: الأب بيقترح حجم، الابن بيرد بالحجم اللي عايزه، والأب بيحدد المكان. الـ HStack بيقسم العرض على أولاده، ويدّي الأولوية للي حجمهم ثابت، والمرن (Spacer و Color) بياخد الباقي.

الـ [[ZStack(alignment: .bottomTrailing)]] بيحط الطبقات في الركن اللي تحت عند نهاية السطر، فالرقم بيتحط على ركن الصورة. و [[.background(.white, in: .circle)]] بيرسم خلفية بيضا على شكل دايرة. و [[.orange.gradient]] تدرج خفيف من اللون.

[[Text("طلب #1042")]]: الـ [[#]] جوه نص عادي، مش macro.`,
            when: R`[[HStack]] للصفوف، و [[VStack]] للأعمدة والشاشات، و [[ZStack]] للـ badges والخلفيات والـ overlays. ولو بتعمل طبقة فوق View واحد بحجمه، [[.overlay { }]] و [[.background { }]] أنسب من ZStack.`,
            mistakes: R`تستخدم أرقام ثابتة لكل حاجة ([[frame(width: 375)]]) فالتصميم يبوظ على شاشة تانية أو مع خط كبير (Dynamic Type). وتحط [[VStack]] فيه 1000 عنصر من غير [[Lazy]] فالشاشة تبطّأ. وتستخدم [[.padding(.left)]]: مش موجودة، استخدم [[.leading]].`
          },
          lines: [
            "SwiftUI.",
            "View لصف طلب.",
            "body.",
            R`[[HStack]]: صورة ونصوص وسعر جنب بعض، ومحاذاة من فوق.`,
            R`[[ZStack]]: طبقات، والمحاذاة في الركن التحتاني عند نهاية السطر.`,
            "مربع بزوايا مدورة.",
            "متلون بتدرج برتقالي.",
            "حجم ثابت.",
            "رقم فوق المربع.",
            "خط صغير عريض.",
            "مسافة صغيرة حوالين الرقم.",
            "خلفية بيضا دايرية.",
            "قفلة ZStack.",
            R`[[VStack]] للنصوص، محاذاة من بداية السطر.`,
            "رقم الطلب.",
            "خط عنوان.",
            "التفاصيل.",
            "خط أصغر.",
            "لون باهت.",
            "قفلة VStack.",
            R`[[Spacer]] بيزق السعر لآخر السطر.`,
            "السعر.",
            "خط عنوان.",
            "قفلة HStack.",
            "مسافة حوالين الصف.",
            "قفلة body.",
            "قفلة الـ struct."
          ],
          sol: R`من غير [[Spacer]]: السعر بيلزق جنب النصوص، والصف كله بيتحط في النص لأن مفيش حاجة بتاخد المساحة الزيادة.

بـ [[.trailing]]: النصين بيتحاذوا من آخر السطر بالنسبة لبعض.

وفي RTL: الصورة بقت على اليمين والسعر على الشمال، والرقم على ركن الصورة التحتاني الشمال، من غير ما تغيّر أي سطر. ده لأن كل حاجة مكتوبة بـ leading و trailing.`,
          solCode: R`#Preview {
  OrderRow()
    .environment(\.layoutDirection, .rightToLeft)
}`
        },
        {
          cmd: "الـ modifiers وترتيبها",
          title: "الـ modifiers بتغلف الـ View، فليه padding قبل background غير بعدها، وتعمل modifier بتاعك",
          desc: R`كل modifier زي [[.padding()]] أو [[.background(.blue)]] مش بيعدّل الـ View، ده بيلفه في View جديد. يعني [[Text("x").padding().background(.blue)]] معناها: نص، ملفوف في مسافة، والكل ملفوف في خلفية زرقا. فالخلفية بتغطي المسافة.

ولو عكست: [[Text("x").background(.blue).padding()]]: نص بخلفية زرقا على قده، وبعدين مسافة فاضية حواليه. شكل مختلف تمامًا. الترتيب في SwiftUI بيفرق، واقراه من جوه لبرة.

نوعين modifiers:
1. بيلفوا الـ View: [[padding]] و [[background]] و [[frame]] و [[clipShape]] و [[shadow]] و [[overlay]].
2. بيحطوا قيمة في الـ environment تنزل لكل الأولاد: [[.font]] و [[.foregroundStyle]] و [[.tint]] و [[.disabled]]. لو حطيت [[.font(.title)]] على VStack، كل الـ Text جواه هياخدوه (إلا اللي ليه font بتاعه).

لو مجموعة modifiers بتتكرر، اعملها مرة واحدة: إما [[extension View]] فيه دالة، أو struct بيتبع [[ViewModifier]].`,
          example: R`import SwiftUI

struct BadgeDemo: View {
  var body: some View {
    VStack(spacing: 24) {
      Text("padding قبل background")
        .padding()
        .background(.blue)
      Text("background قبل padding")
        .background(.blue)
        .padding()
      Text("كارت")
        .cardStyle()
    }
    .font(.headline)
    .foregroundStyle(.white)
    .padding()
    .background(.black)
  }
}

extension View {
  func cardStyle() -> some View {
    padding(16)
      .frame(maxWidth: .infinity)
      .background(.indigo, in: .rect(cornerRadius: 16))
      .shadow(radius: 4, y: 2)
  }
}`,
          try: R`في [[cardStyle]] انقل [[.frame(maxWidth: .infinity)]] لبعد [[.background]] وقارن. وبعدين ضيف [[.font(.caption)]] على تاني Text بس، ولاحظ إن الـ font بتاع الـ VStack اتطبق على الباقي.`,
          flag: "script",
          deep: {
            why: R`أغلب مشاكل «الشكل مش طالع زي التصميم» في SwiftUI سببها ترتيب الـ modifiers. لما تفهم إن كل modifier طبقة، تقدر تقرا أي كود وتتخيل الشكل. والـ extension بيخلي التصميم موحد في التطبيق كله ويتغير من مكان واحد.`,
            how: R`[[Text("x").padding()]] نوعه الحقيقي [[ModifiedContent<Text, _PaddingLayout>]]، وكل modifier بيزود طبقة في النوع، وده سبب [[some View]]: مفيش حد عايز يكتب النوع ده.

[[.background(.indigo, in: .rect(cornerRadius: 16))]] بترسم الخلفية في شكل مستطيل بزوايا مدورة (iOS 17). و [[.shadow(radius:y:)]] ظل بإزاحة لتحت. والـ environment modifiers زي [[.font]] بتتطبق على أقرب Text مش عنده قيمة بتاعته.

جوه [[cardStyle]] أول سطر [[padding(16)]] من غير نقطة: لأننا جوه extension على View، فده معناه [[self.padding(16)]].`,
            when: R`كل ما تكتب نفس 3 أو 4 modifiers في أكتر من مكان، اعمل extension. ولو الـ modifier محتاج state جواه (زي animation أو اهتزاز)، اعمل struct بيتبع [[ViewModifier]].`,
            mistakes: R`تحط [[.frame]] بعد [[.background]] وتستغرب إن الخلفية على قد المحتوى. وتحط [[.onTapGesture]] على View شفاف أو صغير فالضغط مش بيوصل (ضيف [[.contentShape(.rect)]]). وتستخدم [[.cornerRadius()]] القديمة: الأحدث [[.clipShape(.rect(cornerRadius:))]].`
          },
          lines: [
            "SwiftUI.",
            "View للتجربة.",
            "body.",
            "تلات نصوص فوق بعض.",
            "النص الأول.",
            "المسافة الأول.",
            "فالخلفية بتغطي النص والمسافة.",
            "النص التاني.",
            "الخلفية الأول على قد النص بس.",
            "والمسافة برة الخلفية.",
            "النص التالت.",
            "modifier بتاعنا من الـ extension.",
            "قفلة VStack.",
            R`environment modifier: كل النصوص جوه بتاخده.`,
            "ولون النص لكل الأولاد.",
            "مسافة حوالين الكل.",
            "خلفية سودا للكل.",
            "قفلة body.",
            "قفلة الـ struct.",
            R`[[extension View]]: أي View هيقدر يستخدم الدالة.`,
            R`بترجّع [[some View]] زي body.`,
            R`[[padding]] على [[self]].`,
            "ياخد العرض كله.",
            "خلفية بزوايا مدورة.",
            "ظل.",
            "قفلة الدالة.",
            "قفلة الـ extension."
          ],
          sol: R`لو [[.frame]] بعد [[.background]]: الخلفية البنفسجي بقت على قد النص والمسافة بس، والـ frame العريض بقى شفاف حواليها، لأن الخلفية اتطبقت قبل ما الـ View يكبر.

و [[.font(.caption)]] على تاني نص: النص ده بس بقى صغير، والباقي لسه [[.headline]] لأن الـ environment بياخد القيمة الأقرب للـ Text.`
        },
        {
          cmd: "List و ForEach",
          title: "تعرض قايمة بـ List و ForEach، وليه العناصر لازم تبقى Identifiable، وتمسح بالـ swipe",
          desc: R`[[List]] قايمة بتسكرول، بالشكل بتاع iOS (زي الإعدادات)، وبتعمل العناصر بشكل lazy. و [[ForEach]] بيكرر View لكل عنصر في collection (ممكن يبقى جوه List أو VStack أو أي حاجة).

SwiftUI لازم تعرف كل عنصر «هو مين» عشان لما القايمة تتغير تعرف إيه اللي اتضاف واتمسح واتحرك، وتعمل animation صح. عشان كده العناصر لازم:
• تتبع [[Identifiable]]: يعني فيها property اسمها [[id]] فريدة. الشكل الشائع [[let id = UUID()]] (ID عشوائي فريد) أو [[id]] جاي من السيرفر.
• أو تقول لـ ForEach تستخدم إيه كـ id: [[ForEach(names, id: \.self)]] (ينفع لو القيم نفسها مش بتتكرر).

[[List]] ممكن تاخد الداتا مباشرة: [[List(tasks) { task in ... }]]. ولو عايز تمسح بالـ swipe لازم [[ForEach]] جوه [[List]] و [[.onDelete]]. و [[Section("عنوان") { }]] بيقسم القايمة. و [[.swipeActions]] لأزرار swipe مخصوصة.

[[.onDelete]] بيدّيك [[IndexSet]] (أماكن العناصر اللي اتمسحت)، وتمسحهم بـ [[remove(atOffsets:)]].`,
          example: R`import SwiftUI

struct TaskItem: Identifiable {
  let id = UUID()
  var title: String
  var isUrgent: Bool
}

struct TasksList: View {
  @State private var tasks = [
    TaskItem(title: "رد على الإيميلات", isUrgent: true),
    TaskItem(title: "اشتري لبن", isUrgent: false),
    TaskItem(title: "ذاكر SwiftUI", isUrgent: true),
  ]
  var body: some View {
    List {
      Section("مستعجل") {
        ForEach(tasks.filter(\.isUrgent)) { task in
          Label(task.title, systemImage: "flame")
        }
      }
      Section("الكل") {
        ForEach(tasks) { task in
          Text(task.title)
        }
        .onDelete { offsets in
          tasks.remove(atOffsets: offsets)
        }
      }
    }
  }
}`,
          try: R`اعمل swipe على مهمة في Section «الكل» وامسحها. وبعدين ضيف [[.swipeActions]] على الـ Text فيه زرار «مستعجل» بيقلب [[isUrgent]] (هتحتاج تلاقي index المهمة بـ [[firstIndex(where:)]]).`,
          flag: "script",
          deep: {
            why: R`القوايم في كل تطبيق تقريبًا. ولو الـ id غلط (مثلًا استخدمت الـ index كـ id)، لما تمسح عنصر SwiftUI هتفتكر إن العنصر الأخير هو اللي اتمسح، فالـ animation تبوظ والـ state بتاع الصفوف يروح للصف الغلط.`,
            how: R`[[List]] مبنية فوق [[UICollectionView]] على iOS، وبتعمل الصفوف اللي ظاهرة بس وبتعيد استخدامها. [[ForEach]] بيقارن الـ ids بين الحسبة القديمة والجديدة ويعرف الـ diff.

[[Label(title, systemImage:)]] نص وأيقونة مع بعض بالشكل القياسي. و [[remove(atOffsets:)]] دالة SwiftUI بتضيفها على الـ arrays.

لاحظ إن المسح في Section «مستعجل» مش متاح: مفيش [[.onDelete]] هناك. ولو عملته على array متفلترة، الـ offsets هتبقى بتاعة المتفلترة مش الأصلية، فلازم تحوّلها بالـ id.`,
            when: R`[[List]] لأي قايمة بستايل iOS (إعدادات، رسايل، مهام). و [[ScrollView]] + [[LazyVStack]] لما عايز تصميم حر من غير شكل الـ List (feed بكروت). و [[ForEach]] جوه أي حاجة لما بتكرر Views.`,
            mistakes: R`[[ForEach(0..<items.count)]] على array بتتغير: هتاخد crash أو تحذير. واستخدام [[id: \.self]] مع قيم بتتكرر. وتعمل [[let id = UUID()]] في struct جاي من السيرفر ومش بتستخدم الـ id بتاعه، فكل reload كل العناصر تبقى «جديدة» وتتعمل من الأول.`
          },
          lines: [
            "SwiftUI.",
            R`struct بيتبع [[Identifiable]].`,
            R`[[UUID()]] ID فريد عشوائي لكل عنصر.`,
            "العنوان.",
            "مستعجل ولا لأ.",
            "قفلة.",
            "الشاشة.",
            R`[[@State]] عشان القايمة هتتغير (درس الحالة).`,
            "مهمة.",
            "مهمة.",
            "مهمة.",
            "قفلة الـ array.",
            "body.",
            R`[[List]] بتسكرول.`,
            R`[[Section]] بعنوان.`,
            R`[[ForEach]] على المستعجل بس. مش محتاج [[id:]] لأنها Identifiable.`,
            R`[[Label]]: نص وأيقونة.`,
            "قفلة ForEach.",
            "قفلة Section.",
            "Section تاني.",
            "كل المهام.",
            "نص المهمة.",
            "قفلة ForEach.",
            R`[[.onDelete]] بيفعّل المسح بالـ swipe.`,
            "بنمسح من الـ state، و SwiftUI بتحدث القايمة.",
            "قفلة.",
            "قفلة Section.",
            "قفلة List.",
            "قفلة body.",
            "قفلة الـ struct."
          ],
          sol: R`لما تمسح «اشتري لبن» من «الكل» بيختفي بـ animation. ولو مسحت «رد على الإيميلات» بيختفي من الـ Section الاتنين لأن الاتنين من نفس الـ state.

الـ swipeActions:`,
          solCode: R`ForEach(tasks) { task in
  Text(task.title)
    .swipeActions(edge: .leading) {
      Button("مستعجل", systemImage: "flame") {
        if let i = tasks.firstIndex(where: { $0.id == task.id }) {
          tasks[i].isUrgent.toggle()
        }
      }
      .tint(.orange)
    }
}
.onDelete { tasks.remove(atOffsets: $0) }`
        }
      ]
    },
    {
      t: "الحالة والتنقل والفورمز",
      l: 2,
      n: "@State و @Binding و $، و @Observable و @Bindable و @Environment، و NavigationStack، و sheet و alert، و Form و TextField",
      items: [
        {
          cmd: "إدارة الحالة بـ State و Binding",
          title: "@State بتخلي الـ View يفتكر قيمة ويتحدث لما تتغير، و @Binding و $ بيدوا ابن حق يعدّلها",
          desc: R`الـ View struct، والـ struct بيتعمل من جديد كل شوية، فمينفعش يخزن قيمة بتتغير في [[var]] عادي. الحل [[@State]]: بتقول لـ SwiftUI «خزّنلي القيمة دي برة الـ struct، ولما تتغير احسب الـ [[body]] تاني». [[@State private var count = 0]]. ودايمًا [[private]] لأنها ملك الـ View ده بس.

الـ [[@State]] و [[@Binding]] اسمهم property wrappers: الـ [[@]] قبل الاسم بتلف الـ property بنوع بيضيف سلوك (هنا: التخزين والتحديث).

[[@Binding]]: لما View ابن محتاج يعدّل state بتاعة الأب. الابن مش بيملك القيمة، هو ماسك «وصلة» ليها: [[@Binding var value: Int]]. والأب بيبعت الوصلة بـ [[$]] قبل الاسم: [[StepperRow(value: $count)]].

الـ [[$]] قبل اسم state بيدّيك [[Binding]] (قراية وكتابة) بدل القيمة نفسها (قراية بس). وده اللي بتبعته لكل الـ controls اللي بتعدّل: [[Toggle("...", isOn: $isOn)]] و [[TextField("...", text: $name)]] و [[Slider(value: $volume)]].

القاعدة: كل قيمة ليها مالك واحد (source of truth). المالك عنده [[@State]]، واللي محتاج يقرا بس بياخد [[let]] عادي، واللي محتاج يعدّل بياخد [[@Binding]].

[[@State]] للقيم البسيطة المحلية في View واحد (رقم، نص، Bool، struct صغير). ولما الداتا تكبر أو تتشارك بين شاشات، هتستخدم [[@Observable]] (الدرس الجاي).`,
          example: R`import SwiftUI

struct CounterScreen: View {
  @State private var count = 0
  @State private var notify = false
  var body: some View {
    VStack(spacing: 16) {
      Text("العدد: \(count)")
        .font(.largeTitle)
      Button("زوّد") {
        count += 1
      }
      .buttonStyle(.borderedProminent)
      StepperRow(value: $count)
      Toggle("إشعارات", isOn: $notify)
      if notify {
        Text("هنبعتلك لما العدد يوصل 10")
      }
    }
    .padding()
  }
}

struct StepperRow: View {
  @Binding var value: Int
  var body: some View {
    HStack(spacing: 24) {
      Button("−") { value -= 1 }
        .disabled(value == 0)
      Text("\(value)")
      Button("+") { value += 1 }
    }
    .font(.title)
  }
}`,
          try: R`غيّر [[@Binding var value]] في [[StepperRow]] لـ [[let value: Int]] وابعتله [[count]] من غير [[$]]. هتلاقي إيه؟ وبعدين ضيف [[TextField("اسمك", text: $name)]] بـ [[@State private var name = ""]] و [[Text("أهلًا \(name)")]] بيتحدث مع كل حرف.`,
          flag: "script",
          deep: {
            why: R`ده قلب SwiftUI: الواجهة = دالة من الحالة. انت مش بتحدث النص بإيدك لما العدد يزيد، انت بتغيّر [[count]] بس، و SwiftUI بتعرف مين معتمد عليه وتحدثه. ومع [[@Binding]] الابن والأب شايفين نفس القيمة، فمستحيل الاتنين يبقوا مختلفين.`,
            how: R`[[@State]] بيخزن القيمة في storage خاص بـ SwiftUI مربوط بمكان الـ View في الشجرة، مش في الـ struct. لما الـ struct يتعمل من جديد، بيتوصل بنفس الـ storage. وده سبب إن الـ [[@State]] بيتعمل initialize مرة واحدة بس: القيمة اللي في التعريف بتتستخدم أول مرة بس.

[[$count]] بيرجّع [[Binding<Int>]]: struct فيه getter و setter بيقروا ويكتبوا في الـ storage الأصلي. و [[@Binding]] بيلف [[Binding]] ده، فـ [[value += 1]] بتكتب في [[count]] بتاع الأب.

لما [[notify]] تبقى true، الـ [[if]] جوه [[body]] بيضيف الـ Text، ولما ترجع false بيشيله. ده الـ conditional rendering في SwiftUI.`,
            when: R`[[@State]] لحالة الـ UI المحلية: النص اللي بيتكتب، زرار شغال ولا لأ، sheet ظاهر ولا لأ، التاب المختار. و [[@Binding]] لما تقسّم View كبير لأجزاء وجزء محتاج يعدّل حالة الأب.`,
            mistakes: R`تعمل [[@State]] مش [[private]] وتبعتله قيمة من الأب، وتستغرب إنها مبتتحدثش لما الأب يتغير (الـ State بيتعمل مرة واحدة بس). وتعمل [[@State]] في الابن وفي الأب لنفس القيمة: كده بقى عندك نسختين مختلفتين، والصح [[@Binding]] في الابن. وتحط class عادي في [[@State]] وتستنى التحديث: لازم يبقى [[@Observable]].`
          },
          lines: [
            "SwiftUI.",
            "الشاشة.",
            R`[[@State]]: SwiftUI بتخزن العدد وتحدث الشاشة لما يتغير.`,
            "state تانية.",
            "body.",
            "عمود.",
            "بيقرا الـ state.",
            "خط كبير.",
            R`[[Button]] بعنوان، والـ closure اللي بيتنفذ عند الضغط (trailing closure).`,
            "تغيير الـ state بيعيد حساب body.",
            "قفلة الـ closure.",
            "زرار بخلفية ملونة.",
            R`[[$count]]: Binding للابن عشان يعدّل.`,
            R`[[Toggle]] محتاج Binding لـ Bool.`,
            R`[[if]] جوه body: بيظهر بس لو notify صح.`,
            "النص.",
            "قفلة if.",
            "قفلة VStack.",
            "مسافة.",
            "قفلة body.",
            "قفلة الـ struct.",
            "View ابن.",
            R`[[@Binding]]: مش مالك القيمة، ماسك وصلة ليها.`,
            "body.",
            "صف.",
            "بيقلل.",
            "مقفول لو صفر.",
            "بيعرض القيمة.",
            R`بيزود، والتعديل بيوصل لـ [[count]] بتاع الأب.`,
            "قفلة HStack.",
            "خط كبير للصف.",
            "قفلة body.",
            "قفلة الـ struct."
          ],
          sol: R`بـ [[let value: Int]] الأزرار نفسها مش هتترجم: [[value -= 1]] بيطلع [[left side of mutating operator isn't mutable: 'value' is a 'let' constant]]. ولو شيلت الأزرار وسبت العرض بس، هيشتغل: الأب بيبعت القيمة والابن بيعرضها ويتحدث لما الأب يتغير، بس مش هيقدر يعدّل. عشان كده [[let]] للقراية و [[@Binding]] للتعديل.

الـ TextField:`,
          solCode: R`@State private var name = ""

// جوه الـ VStack
TextField("اسمك", text: $name)
  .textFieldStyle(.roundedBorder)
Text("أهلًا \(name)")`
        },
        {
          cmd: "@Observable و @Environment",
          title: "تشارك داتا بين شاشات بـ @Observable class، وتوزعها بـ @Environment، وتعمل bindings منها بـ @Bindable",
          desc: R`[[@State]] كويس لقيمة صغيرة في View واحد. بس لو عندك داتا أكبر (سلة مشتريات، المستخدم الحالي، إعدادات) كذا شاشة محتاجاها، بتعملها [[class]] وتعلّمها بـ [[@Observable]] (iOS 17 وما بعده، من framework اسمه Observation).

[[@Observable]] macro بيخلي SwiftUI تتابع كل property: أي View قرا [[store.items]] في الـ body بتاعه هيتحدث لما [[items]] تتغير، والـ Views اللي مقرتش [[items]] مش هتتحدث. مش محتاج تعلّم كل property بحاجة.

3 حاجات تعرفها:
1. مين يملك الـ object: الـ View اللي بيعمله بيحطه في [[@State]]: [[@State private var store = CartStore()]]. كده بيتعمل مرة واحدة ويعيش طول عمر الـ View.
2. توزيعه: [[.environment(store)]] على View بيحطه لكل الأولاد تحته. وأي ابن بياخده بـ [[@Environment(CartStore.self) private var store]] من غير ما يتبعت من شاشة لشاشة.
3. bindings: لو View استلم الـ object وعايز يعمل [[TextField]] مربوط بـ property فيه، بيستخدم [[@Bindable var profile: Profile]] وبعدين [[$profile.name]]. ولو جاي من environment: [[@Bindable var store = store]] جوه الـ body.

الكود القديم (قبل iOS 17، ولسه موجود في مشاريع كتير هتشتغل عليها): [[ObservableObject]] و [[@Published]] على كل property، و [[@StateObject]] و [[@ObservedObject]] و [[@EnvironmentObject]]. لو هتدعم iOS 16 أو بتشتغل على كود قديم هتقابلهم. الكود الجديد: [[@Observable]].`,
          example: R`import SwiftUI

@Observable
final class CartStore {
  var items: [String] = []
  var couponCode = ""
  var total: Int { items.count * 50 }
  func add(_ item: String) {
    items.append(item)
  }
}

struct ShopScreen: View {
  @State private var store = CartStore()
  var body: some View {
    VStack(spacing: 16) {
      Button("ضيف قلم") { store.add("قلم") }
      CartSummary()
      CouponField(store: store)
    }
    .environment(store)
    .padding()
  }
}

struct CartSummary: View {
  @Environment(CartStore.self) private var store
  var body: some View {
    Text("\(store.items.count) منتج بـ \(store.total) جنيه")
  }
}

struct CouponField: View {
  @Bindable var store: CartStore
  var body: some View {
    TextField("كود الخصم", text: $store.couponCode)
      .textFieldStyle(.roundedBorder)
  }
}`,
          try: R`ضيف View تالت اسمه [[CartBadge]] بياخد الـ store من الـ environment ويعرض العدد بس في دايرة حمرا. وجرّب تشيل [[.environment(store)]]: إيه اللي هيحصل لما الشاشة تفتح؟`,
          flag: "script",
          deep: {
            why: R`من غير مكان مشترك للداتا هتلاقي نفسك بتبعت نفس الـ object من شاشة لشاشة لشاشة (prop drilling)، أو كل شاشة عندها نسخة مختلفة. [[@Observable]] + environment بيحلوا الاتنين. وأحسن من [[ObservableObject]] القديم في الأداء: القديم كان بيحدث أي View بيراقب الـ object لما أي [[@Published]] تتغير، والجديد بيحدث بس اللي قرا الـ property اللي اتغيرت.`,
            how: R`الـ macro [[@Observable]] بيعيد كتابة كل stored property بحيث القراية تسجل «مين قرا»، والكتابة تبلغ اللي قروا. SwiftUI وهي بتحسب [[body]] بتسجل كل property اتقرت، فلما واحدة تتغير بتعيد حساب الـ Views دي بس. والـ computed [[total]] بيتراقب من خلال [[items]] اللي بيقراها.

لازم [[class]] (مش struct) لأن كل الشاشات لازم تشوف نفس الـ object. و [[@State]] هنا مش بيراقب (المراقبة من [[@Observable]])، هو بس بيضمن إن الـ object ميتعملش من جديد كل ما الـ View يتعمل.

[[@Environment(CartStore.self)]]: لو الـ object مش موجود في الـ environment التطبيق بيقع وقت التشغيل برسالة إن مفيش Observable من النوع ده. وفيه شكل optional: [[@Environment(CartStore.self) private var store: CartStore?]].`,
            when: R`[[@Observable]] لأي state مشتركة أو فيها logic: view models، والـ stores، والمستخدم الحالي، والإعدادات. وحطه في environment لما Views كتير بعيدة عن بعض محتاجاه. ولو View واحد بس محتاجه، ابعته كـ parameter عادي أوضح.`,
            mistakes: R`تعمل [[let store = CartStore()]] جوه الـ View من غير [[@State]] (أو كـ default parameter): كل مرة الـ View يتعمل هيتعمل store جديد والداتا تضيع. وتنسى [[.environment(store)]] على الأب (أو على الـ Preview) فيقع. وتخلط القديم بالجديد: [[@StateObject]] مع [[@Observable]] class مش هيشتغل صح.`
          },
          lines: [
            "SwiftUI (بتجيب Observation معاها).",
            R`[[@Observable]]: SwiftUI هتتابع كل property في الـ class.`,
            R`[[class]] عشان كل الشاشات تشوف نفس الـ object.`,
            "المنتجات.",
            "كود الخصم.",
            "computed، بيتراقب من خلال items.",
            "method بتعدّل.",
            "تغيير بيوصل لكل View قرا items.",
            "قفلة.",
            "قفلة الـ class.",
            "الشاشة الأب.",
            R`[[@State]]: الـ View ده مالك الـ store ومش هيتعمل من جديد.`,
            "body.",
            "عمود.",
            "زرار بيضيف.",
            "View بياخد الـ store من الـ environment.",
            "View بياخده كـ parameter.",
            "قفلة VStack.",
            R`[[.environment(store)]] بيحطه لكل اللي تحت.`,
            "مسافة.",
            "قفلة body.",
            "قفلة.",
            "View الملخص.",
            R`[[@Environment(CartStore.self)]]: هات الـ object من النوع ده.`,
            "body.",
            "بيقرا items و total، فهيتحدث لما يتغيروا.",
            "قفلة body.",
            "قفلة.",
            "View كود الخصم.",
            R`[[@Bindable]]: عشان نقدر نعمل [[$store.couponCode]].`,
            "body.",
            R`[[$store.couponCode]] Binding لـ property جوه الـ object.`,
            "شكل الخانة.",
            "قفلة body.",
            "قفلة."
          ],
          sol: R`من غير [[.environment(store)]]: الشاشة بتقع أول ما [[CartSummary]] يتعرض، برسالة معناها إن مفيش object من نوع [[CartStore]] في الـ environment. وده نفس اللي بيحصل في الـ Preview لو نسيت تحطه هناك.

الـ badge:`,
          solCode: R`struct CartBadge: View {
  @Environment(CartStore.self) private var store
  var body: some View {
    Text("\(store.items.count)")
      .font(.caption.bold())
      .foregroundStyle(.white)
      .frame(width: 24, height: 24)
      .background(.red, in: .circle)
  }
}

#Preview {
  CartBadge()
    .environment(CartStore())
}`
        },
        {
          cmd: "NavigationStack والتنقل",
          title: "تتنقل بين الشاشات بـ NavigationStack و NavigationLink(value:) و navigationDestination، وترجع بالكود",
          desc: R`[[NavigationStack]] بيعمل شريط فوق وبيسمح بالدخول لشاشات جوه بعض (push) والرجوع بزرار Back أو بالسحب من الطرف.

الطريقة الحديثة (iOS 16 وما بعده) بتفصل «رايح فين» عن «الشاشة شكلها إيه»:
1. [[NavigationLink(value: product) { Text(product.name) }]]: لما يتضغط بيحط [[product]] في الـ stack.
2. [[.navigationDestination(for: Product.self) { product in ProductDetail(product: product) }]]: بيقول «أي قيمة من النوع ده، اعرضها بالشاشة دي». بيتحط مرة واحدة جوه الـ NavigationStack (مش جوه List أو ForEach lazy).

القيمة لازم تبقى [[Hashable]] (Swift بتعملها لوحدها للـ struct لو كل properties بتاعته Hashable).

تتحكم في التنقل من الكود: اربط الـ stack بـ path: [[NavigationStack(path: $path)]] و [[@State private var path: [Product] = []]]. [[path.append(p)]] بتفتح شاشة، و [[path.removeLast()]] بترجع واحدة، و [[path.removeAll()]] بترجع للأول. ولو الشاشات من أنواع مختلفة استخدم [[NavigationPath]].

[[.navigationTitle("...")]] بيتحط على المحتوى اللي جوه الـ stack (مش على الـ stack نفسه). و [[.toolbar { }]] لأزرار الشريط.

[[NavigationView]] القديم deprecated، متستخدموش في كود جديد. وللـ iPad والماك فيه [[NavigationSplitView]] (عمودين أو تلاتة).`,
          example: R`import SwiftUI

struct Product: Identifiable, Hashable {
  let id: Int
  let name: String
  let price: Int
}

struct ProductsScreen: View {
  let products = [
    Product(id: 1, name: "سماعة", price: 450),
    Product(id: 2, name: "شاحن", price: 200),
  ]
  @State private var path: [Product] = []
  var body: some View {
    NavigationStack(path: $path) {
      List(products) { product in
        NavigationLink(value: product) {
          Text(product.name)
        }
      }
      .navigationTitle("المنتجات")
      .navigationDestination(for: Product.self) { product in
        ProductDetail(product: product) {
          path.removeAll()
        }
      }
    }
  }
}

struct ProductDetail: View {
  let product: Product
  let onBuy: () -> Void
  var body: some View {
    VStack(spacing: 16) {
      Text("\(product.price) جنيه").font(.largeTitle)
      Button("اشتري وارجع للقايمة", action: onBuy)
    }
    .navigationTitle(product.name)
    .navigationBarTitleDisplayMode(.inline)
  }
}`,
          try: R`ضيف في [[ProductDetail]] زرار «منتجات مشابهة» بيعمل [[NavigationLink(value:)]] لمنتج تاني، وادخل 3 شاشات جوه بعض، وبعدين اضغط «اشتري وارجع للقايمة». وبعدين ضيف زرار في [[.toolbar]] بتاع القايمة بيفتح أرخص منتج بـ [[path.append]].`,
          flag: "script",
          deep: {
            why: R`فصل الـ value عن الـ destination بيخلي التنقل داتا عادية: تقدر تحفظ الـ path وترجّعه، وتفتح شاشة جوه من deep link أو إشعار ([[path = [product]]])، وتختبر التنقل من غير UI. الطريقة القديمة ([[NavigationLink(destination:)]]) كانت بتعمل الشاشة الجاية مقدمًا لكل صف وصعب تتحكم فيها.`,
            how: R`الـ NavigationStack بيقرا الـ path: كل عنصر فيه = شاشة متكومة. الضغط على [[NavigationLink(value:)]] بيضيف القيمة للـ path (لو مربوط) أو لـ path داخلي. و [[navigationDestination]] بيحوّل كل قيمة لـ View.

الزرار بيبعت للشاشة الجاية closure [[onBuy]] بدل ما يبعتلها الـ path نفسه، فـ [[ProductDetail]] مش محتاج يعرف حاجة عن التنقل. و [[Button("...", action: onBuy)]] بياخد الـ closure مباشرة.

[[.navigationBarTitleDisplayMode(.inline)]] بيخلي العنوان صغير في النص بدل الكبير.`,
            when: R`[[NavigationStack]] لأي تطبيق فيه قايمة وتفاصيل. وفي التطبيقات اللي فيها tabs، كل تاب ليه NavigationStack بتاعه جوه [[TabView]] (مش العكس). و [[NavigationSplitView]] لو هتدعم iPad بشكل كويس.`,
            mistakes: R`تحط [[NavigationStack]] جوه كل شاشة فيتكوم شريطين فوق بعض: واحد بس في أعلى الشجرة. وتحط [[navigationDestination]] جوه [[List]] أو [[ForEach]] فيطلع تحذير ومش بيشتغل صح. وتنسى [[Hashable]] على النوع. وتحط [[.navigationTitle]] على الـ NavigationStack من برة فمبيظهرش.`
          },
          lines: [
            "SwiftUI.",
            R`[[Hashable]] لازم عشان القيمة تتحط في الـ path.`,
            "id.",
            "الاسم.",
            "السعر.",
            "قفلة.",
            "شاشة القايمة.",
            "داتا ثابتة للتجربة.",
            "منتج.",
            "منتج.",
            "قفلة.",
            R`الـ path: الشاشات المفتوحة حاليًا.`,
            "body.",
            R`[[NavigationStack]] مربوط بالـ path.`,
            "قايمة.",
            R`[[NavigationLink(value:)]]: الضغط بيحط المنتج في الـ path.`,
            "شكل الصف.",
            "قفلة الـ link.",
            "قفلة الـ List.",
            R`العنوان على المحتوى.`,
            R`أي [[Product]] في الـ path يتعرض بالشاشة دي.`,
            R`شاشة التفاصيل، ومعاها closure.`,
            R`[[removeAll]] بيرجع لأول شاشة.`,
            "قفلة الـ closure.",
            "قفلة navigationDestination.",
            "قفلة NavigationStack.",
            "قفلة body.",
            "قفلة.",
            "شاشة التفاصيل.",
            "المنتج.",
            R`closure من الأب، نوعه [[() -> Void]].`,
            "body.",
            "عمود.",
            "السعر بخط كبير.",
            R`[[action: onBuy]] بيبعت الـ closure للزرار مباشرة.`,
            "قفلة.",
            "العنوان اسم المنتج.",
            "عنوان صغير في النص.",
            "قفلة body.",
            "قفلة."
          ],
          sol: R`لما تدخل 3 شاشات وتضغط «اشتري وارجع للقايمة»، [[path.removeAll()]] بيفضّي الـ path فبترجع للقايمة مرة واحدة بـ animation.

الإضافات:`,
          solCode: R`// في ProductDetail جوه VStack (محتاج products أو منتج تاني يتبعت)
NavigationLink("منتج مشابه", value: Product(id: 3, name: "كابل", price: 80))

// في ProductsScreen على الـ List
.toolbar {
  Button("الأرخص") {
    if let cheapest = products.min(by: { $0.price < $1.price }) {
      path.append(cheapest)
    }
  }
}`
        },
        {
          cmd: "sheet و alert",
          title: "تفتح شاشة من تحت بـ sheet، وتسأل المستخدم بـ alert و confirmationDialog، وتقفل بـ dismiss",
          desc: R`في SwiftUI مفيش «افتح الـ sheet دلوقتي». بدل كده بتربط الـ sheet بـ state: [[.sheet(isPresented: $showSheet) { AboutView() }]]. لما [[showSheet]] تبقى true بيظهر، ولما المستخدم يقفله بالسحب SwiftUI بترجّعها false لوحدها (عشان كده Binding).

• [[.sheet(item: $selectedItem) { item in ... }]]: بيظهر لما الـ optional يبقى فيه قيمة، وبيدّيك القيمة. أحسن لما الـ sheet بيعرض عنصر معين. (النوع لازم Identifiable).
• [[.fullScreenCover]]: زي sheet بس الشاشة كلها.
• [[.presentationDetents([.medium, .large])]] على محتوى الـ sheet: نص شاشة أو كاملة.

[[.alert("العنوان", isPresented: $show) { أزرار } message: { Text(...) }]]: رسالة في النص. الأزرار [[Button]] عادية، و [[role: .destructive]] بيخليه أحمر، و [[role: .cancel]] زرار الإلغاء. وأي زرار بيقفل الـ alert لوحده.

[[.confirmationDialog]]: اختيارات بتطلع من تحت (action sheet)، للقرارات اللي ليها أكتر من اختيار.

جوه الشاشة اللي اتفتحت: [[@Environment(\.dismiss) private var dismiss]] وبعدين [[dismiss()]] بيقفلها (sheet أو شاشة navigation). الـ [[\.dismiss]] key path لقيمة جاهزة في الـ environment.`,
          example: R`import SwiftUI

struct Note: Identifiable {
  let id = UUID()
  let title: String
}

struct SettingsScreen: View {
  @State private var showAbout = false
  @State private var confirmDelete = false
  @State private var openedNote: Note?
  var body: some View {
    VStack(spacing: 20) {
      Button("عن التطبيق") { showAbout = true }
      Button("افتح ملاحظة") { openedNote = Note(title: "أفكار") }
      Button("امسح الحساب", role: .destructive) { confirmDelete = true }
    }
    .sheet(isPresented: $showAbout) {
      AboutSheet()
        .presentationDetents([.medium])
    }
    .sheet(item: $openedNote) { note in
      Text("ملاحظة: \(note.title)")
    }
    .alert("متأكد؟", isPresented: $confirmDelete) {
      Button("امسح", role: .destructive) { print("بنمسح") }
      Button("إلغاء", role: .cancel) { }
    } message: {
      Text("مش هتقدر ترجّع الحساب بعد المسح.")
    }
  }
}

struct AboutSheet: View {
  @Environment(\.dismiss) private var dismiss
  var body: some View {
    VStack(spacing: 12) {
      Text("مهامي 1.0").font(.title)
      Button("قفل") { dismiss() }
    }
  }
}`,
          try: R`ضيف [[.confirmationDialog]] بيظهر لما تضغط «شارك» وفيه اختيارين: «انسخ اللينك» و «ابعت إيميل». وبعدين ضيف [[.interactiveDismissDisabled()]] على [[AboutSheet]] وجرّب تقفله بالسحب.`,
          flag: "script",
          deep: {
            why: R`ربط العرض بـ state بيشيل مشاكل زي «الـ alert اتفتح مرتين» أو «الـ sheet اتقفل بس الكود فاكره مفتوح». الحالة هي الحقيقة الوحيدة، والسحب لتحت بيحدثها لوحده.`,
            how: R`[[.sheet(isPresented:)]] بيراقب الـ Binding: true = اعرض، false = اقفل. ولما المستخدم يسحب، SwiftUI بتكتب false في الـ Binding. ونفس الكلام في [[item:]] بتكتب nil.

[[openedNote]] نوعه [[Note?]] من غير قيمة أولية: الـ [[var]] الـ optional بيبدأ بـ nil لوحده.

لاحظ إن الـ alert ليه trailing closures اتنين: الأزرار، وبعدين [[message:]] بـ label. ده اسمه multiple trailing closures: أول closure من غير label وكل اللي بعده بالـ label بتاعه.`,
            when: R`sheet لمهمة جانبية (إضافة عنصر، إعدادات، تفاصيل سريعة). fullScreenCover لحاجة لازم تخلص (onboarding، كاميرا). alert للتأكيد أو الأخطاء المهمة بس. confirmationDialog لما فيه أكتر من اختيار. ومتستخدمش alert لكل حاجة: مزعج.`,
            mistakes: R`تحط أكتر من [[.alert]] على نفس الـ View في نسخ قديمة من iOS فواحد بس يشتغل (حطهم على Views مختلفة أو استخدم item). وتعمل [[showSheet = true]] وجوه الـ sheet مفيش طريقة يقفل غير السحب. وتمرر داتا للـ sheet من state تانية بتتحدث متأخر: استخدم [[sheet(item:)]].`
          },
          lines: [
            "SwiftUI.",
            R`[[Identifiable]] عشان [[sheet(item:)]].`,
            "id.",
            "العنوان.",
            "قفلة.",
            "الشاشة.",
            "state للـ sheet.",
            "state للـ alert.",
            R`optional: nil = الـ sheet مقفول.`,
            "body.",
            "عمود.",
            "بيفتح الـ sheet الأول.",
            R`بيحط قيمة فيفتح [[sheet(item:)]].`,
            R`[[role: .destructive]]: لون أحمر.`,
            "قفلة.",
            R`[[.sheet(isPresented:)]] مربوط بـ Bool.`,
            "محتوى الـ sheet.",
            "نص شاشة.",
            "قفلة.",
            R`[[.sheet(item:)]]: بيدّينا الملاحظة.`,
            "محتوى بالقيمة.",
            "قفلة.",
            R`[[.alert]] بعنوان ومربوط بـ Bool.`,
            "زرار أحمر.",
            R`[[.cancel]]: زرار الإلغاء.`,
            R`[[message:]] تاني trailing closure.`,
            "نص الرسالة.",
            "قفلة.",
            "قفلة body.",
            "قفلة.",
            "الـ sheet.",
            R`[[\.dismiss]] من الـ environment.`,
            "body.",
            "عمود.",
            "نص.",
            R`[[dismiss()]] بيقفل الـ sheet.`,
            "قفلة.",
            "قفلة body.",
            "قفلة."
          ],
          sol: R`مع [[.interactiveDismissDisabled()]] السحب لتحت بيرجّع الـ sheet مكانه، والطريقة الوحيدة للقفل زرار «قفل». مفيد لما المستخدم بيكتب حاجة ومش عايزه يخسرها بالغلط.

الـ confirmationDialog:`,
          solCode: R`@State private var showShare = false

// جوه VStack
Button("شارك") { showShare = true }

// على الـ VStack
.confirmationDialog("شارك التطبيق", isPresented: $showShare, titleVisibility: .visible) {
  Button("انسخ اللينك") { print("copy") }
  Button("ابعت إيميل") { print("mail") }
}`
        },
        {
          cmd: "Form و TextField",
          title: "تعمل فورم بـ Form و TextField و Toggle و Picker و Stepper، وتتحقق من المدخلات قبل الإرسال",
          desc: R`[[Form]] حاوية بتدّي المدخلات شكل الإعدادات بتاع iOS. جواها:
• [[TextField("الاسم", text: $name)]]: نص. و [[SecureField]] للباسورد. و [[TextField(..., axis: .vertical)]] لنص على كذا سطر.
• [[Toggle("...", isOn: $flag)]]: Bool.
• [[Picker("الباقة", selection: $plan) { ... }]]: اختيار من قايمة. كل اختيار [[Text("...").tag(قيمة)]]، والـ tag لازم من نفس نوع الـ selection. أو [[ForEach]] على enum بيتبع [[CaseIterable]].
• [[Stepper("...", value: $n, in: 1...10)]]: زرارين + و −.
• [[DatePicker]] للتواريخ.
• [[Section("عنوان") { }]] بيقسم الفورم.

modifiers مهمة للـ TextField:
• [[.keyboardType(.emailAddress)]] أو [[.numberPad]]: نوع الكيبورد.
• [[.textInputAutocapitalization(.never)]] و [[.autocorrectionDisabled()]]: للإيميل والـ username.
• [[.textContentType(.emailAddress)]]: بيساعد الـ AutoFill.
• [[.onSubmit { }]]: لما يدوس Enter.

الـ validation: computed property [[isValid]] بتشيك كل الشروط، و [[.disabled(!isValid)]] على زرار الإرسال. و [[@FocusState]] بيتحكم في الخانة اللي عليها الكيبورد.`,
          example: R`import SwiftUI

enum Plan: String, CaseIterable, Identifiable {
  case free = "مجانية", pro = "برو"
  var id: Self { self }
}

struct SignUpForm: View {
  @State private var name = ""
  @State private var email = ""
  @State private var age = 18
  @State private var plan = Plan.free
  @State private var acceptsTerms = false
  private var isValid: Bool {
    !name.trimmingCharacters(in: .whitespaces).isEmpty
      && email.contains("@") && acceptsTerms
  }
  var body: some View {
    Form {
      Section("بياناتك") {
        TextField("الاسم", text: $name)
          .textContentType(.name)
        TextField("الإيميل", text: $email)
          .keyboardType(.emailAddress)
          .textInputAutocapitalization(.never)
          .autocorrectionDisabled()
        Stepper("السن: \(age)", value: $age, in: 13...100)
      }
      Section("الاشتراك") {
        Picker("الباقة", selection: $plan) {
          ForEach(Plan.allCases) { Text($0.rawValue).tag($0) }
        }
        Toggle("موافق على الشروط", isOn: $acceptsTerms)
      }
      Button("سجّل") { print(name, email, age, plan) }
        .disabled(!isValid)
    }
  }
}`,
          try: R`ضيف [[SecureField("الباسورد", text: $password)]] وخلي [[isValid]] يطلب 8 حروف على الأقل. وبعدين اعرض تحت الخانة رسالة حمرا «الإيميل شكله غلط» لو الإيميل مش فاضي ومفيهوش [[@]].`,
          flag: "script",
          deep: {
            why: R`أي تطبيق فيه تسجيل أو إعدادات أو إضافة داتا = فورم. و [[Form]] بيدّيك الشكل القياسي اللي المستخدم متعود عليه في الإعدادات، مع accessibility و Dynamic Type جاهزين. والـ validation في computed property بيخلي الزرار دايمًا متطابق مع حالة المدخلات.`,
            how: R`كل control بياخد Binding، فالكتابة بتحدث الـ state على طول، والـ [[isValid]] بتتحسب من جديد مع كل حرف لأن body بيتحسب تاني.

الـ enum بيتبع [[Identifiable]] بـ [[var id: Self { self }]] عشان [[ForEach(Plan.allCases)]] يشتغل. والـ raw value هنا نص عربي بيتعرض. و [[.tag($0)]] بيربط كل صف بقيمة من نوع [[Plan]] زي الـ selection.

[[trimmingCharacters(in: .whitespaces)]] بتشيل المسافات من الأطراف عشان «   » ميتحسبش اسم. والـ [[&&]] في أول السطر التاني كمّلة للـ expression اللي فوق.`,
            when: R`[[Form]] للإعدادات والتسجيل وإضافة عنصر. ولو التصميم مخصوص جدًا (شاشة login بتصميم براند)، اعمل VStack بـ TextFields بستايل بتاعك.`,
            mistakes: R`تتحقق من الإيميل بـ [[contains("@")]] بس وتفتكر ده كفاية: ده فلتر مبدئي، والتحقق الحقيقي من السيرفر. وتنسى [[.textInputAutocapitalization(.never)]] فالإيميل يبدأ بحرف كابيتال. وتستخدم [[TextField]] للباسورد. وتنسى إن الـ tag لازم يبقى نفس نوع الـ selection بالظبط ([[Plan]] مش [[String]]) وإلا الاختيار مش هيتغير.`
          },
          lines: [
            "SwiftUI.",
            R`enum للباقات، [[CaseIterable]] عشان [[allCases]] و [[Identifiable]] عشان ForEach.`,
            "الحالات والنص العربي كـ raw value.",
            R`الـ id هو القيمة نفسها. [[Self]] = Plan.`,
            "قفلة.",
            "الفورم.",
            "state لكل خانة.",
            "الإيميل.",
            "السن.",
            "الباقة.",
            "الموافقة.",
            R`computed: الفورم سليم ولا لأ.`,
            "الاسم مش فاضي بعد شيل المسافات.",
            R`و الإيميل فيه [[@]] و موافق.`,
            "قفلة.",
            "body.",
            R`[[Form]]: شكل الإعدادات.`,
            "قسم بعنوان.",
            R`خانة نص مربوطة بـ [[$name]].`,
            "للـ AutoFill.",
            "خانة الإيميل.",
            "كيبورد فيه @.",
            "من غير حروف كابيتال.",
            "من غير تصحيح تلقائي.",
            R`[[Stepper]] من 13 لـ 100.`,
            "قفلة القسم.",
            "قسم تاني.",
            R`[[Picker]] مربوط بـ [[$plan]].`,
            R`صف لكل باقة، و [[.tag]] بنفس نوع الـ selection.`,
            "قفلة الـ Picker.",
            "Toggle.",
            "قفلة القسم.",
            "زرار الإرسال.",
            R`مقفول لحد ما الفورم يبقى سليم.`,
            "قفلة Form.",
            "قفلة body.",
            "قفلة."
          ],
          sol: R`الإضافات:`,
          solCode: R`@State private var password = ""

private var isValid: Bool {
  !name.trimmingCharacters(in: .whitespaces).isEmpty
    && email.contains("@") && acceptsTerms
    && password.count >= 8
}

// جوه Section("بياناتك") تحت خانة الإيميل
if !email.isEmpty && !email.contains("@") {
  Text("الإيميل شكله غلط")
    .font(.caption)
    .foregroundStyle(.red)
}
SecureField("الباسورد (8 حروف على الأقل)", text: $password)
  .textContentType(.newPassword)`
        }
      ]
    },
    {
      t: "النت والبيانات والتخزين",
      l: 2,
      n: "async و await و Task، و Codable و JSON، و URLSession بحالات التحميل والخطأ، والصور، و AppStorage، و SwiftData، و UIKit جوه SwiftUI",
      items: [
        {
          cmd: "async و await و Task",
          title: "async و await: تستنى شغل بطيء من غير ما الشاشة تقف، و async let للتوازي، و Task و cancel",
          desc: R`أي شغل بياخد وقت (طلب من النت، قراية ملف كبير) لو اتعمل على الـ main thread الشاشة بتقف (freeze). الحل في Swift الحديثة: async/await.

• [[async]] في توقيع الدالة: «الدالة دي ممكن توقف في النص وتستنى». [[func load() async -> String]].
• [[await]] قبل نداء دالة async: «هنا ممكن نستنى». وانت مستني، الـ thread مش واقف: بيشتغل على حاجات تانية (زي رسم الشاشة)، ولما النتيجة تيجي الكود بيكمّل من نفس السطر.
• [[async throws]] لو ممكن تستنى وممكن تفشل، وبتتنادى [[try await]].

[[await]] ورا [[await]] بيمشوا بالترتيب: التاني مبيبدأش غير لما الأول يخلص. لو مستقلين عن بعض، [[async let]] بيبدأهم مع بعض: [[async let a = f(); async let b = g()]] وبعدين [[await]] على الاتنين.

الدالة async لازم تتنادى من مكان async. من كود عادي (زرار مثلًا) بتعمل [[Task { await load() }]]: ده بيبدأ شغل async جديد. و [[Task]] بيرجّع object تقدر تستنى نتيجته بـ [[.value]] أو تلغيه بـ [[.cancel()]].

في SwiftUI: [[.task { await load() }]] modifier بيبدأ الشغل لما الـ View يظهر، وبيلغيه لوحده لما يختفي. ده أحسن مكان لتحميل داتا الشاشة.

[[Task.sleep(for: .seconds(1))]] بيستنى من غير ما يوقف الـ thread، وبيرمي [[CancellationError]] لو الـ Task اتلغى. والمثال ده بيشتغل على Linux كمان ([[swift main.swift]]: الـ top-level في [[main.swift]] ينفع فيه [[await]]).`,
          example: R`func fetchUser(id: Int) async -> String {
  try? await Task.sleep(for: .milliseconds(300))
  return "مستخدم \(id)"
}
func fetchOrders(for user: String) async throws -> [Int] {
  try await Task.sleep(for: .milliseconds(100))
  return user.isEmpty ? [] : [101, 102]
}
let clock = ContinuousClock()
let t1 = clock.now
let a = await fetchUser(id: 1)
let b = await fetchUser(id: 2)
print(a, b, "| ورا بعض أكتر من نص ثانية:", t1.duration(to: clock.now) > .milliseconds(500))
let t2 = clock.now
async let c = fetchUser(id: 3)
async let d = fetchUser(id: 4)
let both = await [c, d]
print(both, "| مع بعض أقل من نص ثانية:", t2.duration(to: clock.now) < .milliseconds(500))
let task = Task {
  try await fetchOrders(for: a)
}
print(try await task.value)
let slow = Task {
  try await Task.sleep(for: .seconds(5))
  return "خلص"
}
slow.cancel()
do {
  print(try await slow.value)
} catch is CancellationError {
  print("اتلغى قبل ما يخلص")
}`,
          try: R`اكتب [[let x = fetchUser(id: 9)]] من غير [[await]] واقرا الخطأ. وبعدين استخدم [[withTaskGroup]] أو [[async let]] عشان تجيب 5 مستخدمين مع بعض، وقيس الوقت: لازم يبقى قريب من 0.3 ثانية مش 1.5.`,
          flag: "script",
          deep: {
            why: R`قبل async/await (Swift 5.5 سنة 2021) كان الكود بيتكتب بـ completion handlers: closure جوه closure جوه closure، وكل واحد ممكن ينسى ينادي الـ completion أو يناديه مرتين، والأخطاء بتتعامل يدوي في كل مستوى. الكود الـ async بيتقري من فوق لتحت زي الكود العادي، و [[try]] و [[catch]] شغالين عادي.`,
            how: R`لما الدالة توصل لـ [[await]] وتحتاج تستنى، بتسيب الـ thread (suspension point)، والـ runtime بيستخدمه لشغل تاني. لما النتيجة تيجي، الدالة بتكمّل (ممكن على thread تاني، إلا لو الكود مربوط بـ actor زي [[@MainActor]]، درس الـ concurrency).

الـ Tasks بتعمل شجرة: [[async let]] و task groups بيعملوا child tasks، ولو الأب اتلغى الأولاد بيتلغوا. الإلغاء cooperative: [[cancel()]] بيحط علامة بس، والكود لازم يشيك ([[Task.sleep]] و [[URLSession]] بيشيكوا لوحدهم، وفي الكود بتاعك [[try Task.checkCancellation()]]).

[[ContinuousClock]] ساعة لقياس الوقت. و [[.duration(to:)]] الوقت بين لحظتين.`,
            when: R`أي شغل بياخد وقت: شبكة، داتابيز، ملفات، معالجة صور. في SwiftUI ابدأه من [[.task]] (تحميل الشاشة) أو [[Task { }]] جوه زرار. و [[async let]] لما محتاج كذا حاجة مستقلة للشاشة (البروفايل والطلبات مع بعض).`,
            mistakes: R`تعمل [[Task { }]] في كل حتة بدل [[.task]] فالشغل يكمّل بعد ما الشاشة تتقفل. وتعمل [[await]] ورا [[await]] لحاجات مستقلة فالشاشة تاخد ضعف الوقت. وتفتكر إن [[async]] لوحده بيشغّل الكود في الخلفية: الحسابات التقيلة من غير أي [[await]] جواها ممكن لسه تقفل الـ thread اللي هي عليه.`
          },
          lines: [
            R`[[async]]: الدالة ممكن تستنى. بترجّع String.`,
            R`[[await]] على sleep. [[try?]] عشان sleep بيرمي لو اتلغى.`,
            "بترجّع النتيجة بعد الاستنا.",
            "قفلة.",
            R`[[async throws]]: بتستنى وممكن تفشل.`,
            R`[[try await]] مع بعض.`,
            "ternary: لو الاسم فاضي array فاضية.",
            "قفلة.",
            "ساعة لقياس الوقت.",
            "اللحظة دي.",
            "بنستنى الأول (0.3 ثانية).",
            "وبعدين التاني (0.3 كمان).",
            "الاتنين ورا بعض = أكتر من 0.5.",
            "لحظة جديدة.",
            R`[[async let]] بيبدأ على طول من غير ما يستنى.`,
            "والتاني بيبدأ معاه.",
            R`[[await]] على الاتنين مع بعض.`,
            "قريب من 0.3 بس.",
            R`[[Task]] بيبدأ شغل async جديد.`,
            "جواه نداء ممكن يرمي.",
            "قفلة.",
            R`[[task.value]] بيستنى النتيجة، و [[try]] لأنه ممكن يرمي.`,
            "Task بطيء.",
            "5 ثواني.",
            "النتيجة.",
            "قفلة.",
            R`[[cancel()]]: بيلغيه.`,
            "do.",
            "هيرمي بدل ما يطبع.",
            R`[[catch is CancellationError]]: بيمسك الإلغاء بس.`,
            "رسالة الإلغاء.",
            "قفلة."
          ],
          sol: R`من غير [[await]]: [[expression is 'async' but is not marked with 'await']].

ناتج المثال:
[[مستخدم 1 مستخدم 2 | ورا بعض أكتر من نص ثانية: true]]
[[["مستخدم 3", "مستخدم 4"] | مع بعض أقل من نص ثانية: true]]
[[[101, 102]]]
[[اتلغى قبل ما يخلص]]

جيب 5 مع بعض بـ task group:`,
          solCode: R`let t3 = clock.now
let users = await withTaskGroup(of: String.self) { group in
  for id in 1...5 {
    group.addTask { await fetchUser(id: id) }
  }
  var result: [String] = []
  for await user in group {
    result.append(user)
  }
  return result
}
print(users.count, t3.duration(to: clock.now) < .seconds(1))
// 5 true  (والترتيب ممكن يختلف لأنهم بيخلصوا في أوقات مختلفة)`
        },
        {
          cmd: "Codable و JSON",
          title: "تحوّل JSON لـ struct والعكس بـ Codable و JSONDecoder، و snake_case والتواريخ و CodingKeys",
          desc: R`أي struct بيتبع [[Codable]] يقدر يتحول من JSON ولـ JSON، و Swift بتكتب الكود لوحدها لو كل الـ properties نفسها Codable (String و Int و Double و Bool و Date و Array و Dictionary و optionals وأي struct تاني Codable). [[Codable]] = [[Decodable]] (من JSON) + [[Encodable]] (لـ JSON). لو بتقرا بس، [[Decodable]] كفاية.

القراية: [[try JSONDecoder().decode(Post.self, from: data)]]. الـ [[Post.self]] معناها «النوع Post نفسه» مش قيمة منه. والـ [[data]] نوعها [[Data]] (bytes)، ومن String بتعملها [[Data(json.utf8)]].

قواعد المطابقة:
• اسم الـ property لازم يطابق المفتاح. لو السيرفر بيبعت [[author_name]] و Swift بتسمّي [[authorName]]: [[decoder.keyDecodingStrategy = .convertFromSnakeCase]].
• أو تحدد الأسماء بنفسك بـ enum اسمه [[CodingKeys]] جوه الـ struct.
• المفاتيح الزيادة في الـ JSON بتتجاهل. المفتاح الناقص = خطأ، إلا لو الـ property optional.
• التواريخ: [[decoder.dateDecodingStrategy = .iso8601]] للشكل [["2026-03-15T10:30:00Z"]].

الكتابة: [[try JSONEncoder().encode(value)]] بترجّع [[Data]]، و [[.outputFormatting = .sortedKeys]] أو [[.prettyPrinted]] للشكل.

لو الـ JSON مش مطابق، الـ decode بيرمي [[DecodingError]] فيه بالظبط المفتاح الغلط والسبب. اطبعه وانت بتطوّر، هيوفر عليك ساعات.

[[#"..."#]] raw string: النص بين العلامتين بيتاخد زي ما هو، فالـ [["]] جواه مش محتاجة escape.`,
          example: R`import Foundation

struct Post: Codable {
  let id: Int
  let title: String
  let authorName: String
  let publishedAt: Date
  let tags: [String]?
}
let json = """
{
  "id": 7,
  "title": "أول تطبيق SwiftUI",
  "author_name": "سارة",
  "published_at": "2026-03-15T10:30:00Z",
  "views": 1200
}
"""
let decoder = JSONDecoder()
decoder.keyDecodingStrategy = .convertFromSnakeCase
decoder.dateDecodingStrategy = .iso8601
do {
  let post = try decoder.decode(Post.self, from: Data(json.utf8))
  print(post.title, "|", post.authorName, "|", post.tags ?? [])
  print(post.publishedAt)
} catch {
  print("JSON بايظ:", error)
}
struct Settings: Codable {
  var theme: String
  var fontSize: Int
  enum CodingKeys: String, CodingKey {
    case theme
    case fontSize = "font_px"
  }
}
let encoder = JSONEncoder()
encoder.outputFormatting = .sortedKeys
let data = try encoder.encode(Settings(theme: "dark", fontSize: 16))
print(String(decoding: data, as: UTF8.self))
let bad = #"{"id": "سبعة", "title": "x"}"#
do {
  _ = try decoder.decode(Post.self, from: Data(bad.utf8))
} catch DecodingError.typeMismatch(_, let context) {
  print("نوع غلط في:", context.codingPath.map(\.stringValue))
} catch {
  print("مشكلة تانية:", error)
}`,
          try: R`امسح [[author_name]] من الـ JSON وشوف الخطأ اللي بيطبعه الـ catch (اسمه [[keyNotFound]]). وبعدين ضيف لـ [[Post]] property [[views: Int]] وتأكد إنها بتتقري 1200. وأخيرًا اعمل [[struct Comment: Codable]] وخلّي [[Post]] فيه [[comments: [Comment]?]].`,
          flag: "script",
          deep: {
            why: R`كل تطبيق بيكلم API. من غير Codable كنت هتقرا كل مفتاح بإيدك من dictionary وتحوّل نوعه وتتعامل مع غيابه (ده اللي كان بيحصل في Objective-C). مع Codable الـ struct نفسه هو وصف الـ JSON، والـ compiler بيكتب الباقي.`,
            how: R`الـ compiler بيولّد [[init(from decoder:)]] و [[encode(to:)]] و enum [[CodingKeys]] من أسماء الـ properties. لو كتبت [[CodingKeys]] بنفسك، بيستخدمه، والـ raw value هو اسم المفتاح في الـ JSON. ولو محتاج منطق خاص (قيمة افتراضية لمفتاح ناقص، أو شكل غريب)، تكتب [[init(from:)]] بنفسك.

[[convertFromSnakeCase]] بيحوّل [[author_name]] لـ [[authorName]] قبل المطابقة. و [[DecodingError]] enum فيه [[keyNotFound]] و [[typeMismatch]] و [[valueNotFound]] و [[dataCorrupted]]، وكلهم معاهم [[codingPath]]: السكة للمفتاح الغلط.

[[String(decoding: data, as: UTF8.self)]] بيحوّل bytes لنص. و [[try]] على [[encoder.encode]] من غير do: في [[main.swift]] لو رمى البرنامج هيقف برسالة الخطأ.`,
            when: R`أي داتا جاية من API أو رايحة له، وأي داتا بتحفظها في ملف أو UserDefaults. ولو API بيبعت أشكال مختلفة لنفس المفتاح، اكتب [[init(from:)]] مخصوص بدل ما تخلي كل حاجة optional.`,
            mistakes: R`تخلي كل الـ properties optional «احتياطي» فتلاقي الشاشة فاضية من غير ما تعرف ليه، بدل ما الـ decode يقولك المفتاح الناقص. وتعمل [[try?]] على الـ decode فتخسر رسالة الخطأ. وتنسى الـ dateDecodingStrategy فالتاريخ يفشل. وتستخدم [[Int]] لـ id بييجي من السيرفر كـ String.`
          },
          lines: [
            "Foundation فيها JSONDecoder و Date.",
            R`[[Codable]]: يتحول من وإلى JSON.`,
            "id.",
            "title.",
            R`في الـ JSON [[author_name]].`,
            "تاريخ.",
            R`optional: لو مش موجود في الـ JSON يبقى nil من غير خطأ.`,
            "قفلة.",
            "نص JSON على كذا سطر.",
            "{",
            "رقم.",
            "نص.",
            "snake_case.",
            "تاريخ ISO 8601.",
            R`مفتاح زيادة ملوش property: بيتجاهل.`,
            "}",
            "قفلة النص.",
            "decoder.",
            R`[[author_name]] ← [[authorName]].`,
            "شكل التاريخ.",
            "do.",
            R`[[Post.self]] النوع، و [[Data(json.utf8)]] النص كـ bytes.`,
            R`[[tags]] مش موجودة فـ nil، و [[??]] بتدي array فاضية.`,
            "التاريخ بعد ما اتحول.",
            "catch.",
            "أي خطأ.",
            "قفلة.",
            "struct تاني.",
            "theme.",
            "fontSize.",
            R`[[CodingKeys]]: أسماء المفاتيح في الـ JSON.`,
            "نفس الاسم.",
            R`[[fontSize]] في الـ JSON اسمه [[font_px]].`,
            "قفلة.",
            "قفلة.",
            "encoder.",
            "المفاتيح بالترتيب عشان الناتج ثابت.",
            R`[[encode]] بيرجّع Data.`,
            "نحوّل الـ Data لنص ونطبعه.",
            R`[[#"..."#]] raw string: id نص بدل رقم.`,
            "do.",
            R`[[_ =]] مش محتاجين النتيجة.`,
            R`catch لنوع خطأ معين وبنفك الـ context.`,
            R`[[codingPath]] السكة للمفتاح الغلط.`,
            "أي خطأ تاني.",
            "رسالة.",
            "قفلة."
          ],
          sol: R`ناتج المثال (التاريخ بيتطبع بتوقيت UTC):
[[أول تطبيق SwiftUI | سارة | []]]
[[2026-03-15 10:30:00 +0000]]
[[{"font_px":16,"theme":"dark"}]]
[[نوع غلط في: ["id"]]]

لما تمسح [[author_name]]: الـ catch بيطبع [[keyNotFound]] ومعاه [[CodingKeys(stringValue: "authorName"...)]] ورسالة [[No value associated with key]]: يعني المفتاح مش موجود.

الإضافات:`,
          solCode: R`struct Comment: Codable {
  let id: Int
  let body: String
}

struct Post: Codable {
  let id: Int
  let title: String
  let authorName: String
  let publishedAt: Date
  let tags: [String]?
  let views: Int
  let comments: [Comment]?
}
// post.views == 1200 و post.comments == nil`
        },
        {
          cmd: "الاتصال بالـ API بـ Async/Await و URLSession",
          title: "تجيب داتا من API بـ URLSession و async/await، وتعرض حالة التحميل والخطأ والنتيجة في SwiftUI",
          desc: R`[[URLSession.shared.data(from: url)]] بيعمل طلب GET وبيرجّع [[(Data, URLResponse)]]: tuple فيه البيانات والرد. وهي [[async throws]]: بتستنى، وبترمي لو مفيش نت أو الـ URL غلط.

مهم: الـ URLSession مش بترمي لو السيرفر رد بـ 404 أو 500. ده رد ناجح من ناحية الشبكة. لازم انت تشيك الـ status: تحوّل الـ response لـ [[HTTPURLResponse]] بـ [[as?]] وتبص على [[statusCode]].

[[as?]] اسمه conditional cast: «حاول تعامل القيمة دي كنوع كذا، ولو مش هو رجّع nil». و [[as!]] نفسها بس بتعمل crash لو فشل.

الشاشة نفسها ليها 3 حالات: بتحمّل، خلصت بداتا، فشلت برسالة. أنظف طريقة: enum بـ associated values (اللي اتعلمته في المستوى الأول) في [[@State]]، و [[switch]] جوه [[body]] يعرض الشكل المناسب لكل حالة.

• [[.task { await load() }]]: بيحمّل أول ما الشاشة تظهر.
• [[.refreshable { await load() }]] على List: سحب لتحت للتحديث.
• [[ContentUnavailableView]] (iOS 17): شاشة «مفيش داتا» أو «مفيش نت» بالشكل القياسي.

iOS بيرفض [[http://]] من غير تشفير افتراضيًا (App Transport Security)، فاستخدم [[https://]].

المثال بيستخدم API تجريبي مجاني ([[dummyjson.com]]) بيرجّع [[{ "posts": [...] }]]، عشان كده فيه struct للغلاف. (دالة [[fetchPosts]] نفسها اتجربت على Linux، والفرق الوحيد هناك إنك محتاج [[import FoundationNetworking]]).`,
          example: R`import SwiftUI

struct Post: Decodable, Identifiable {
  let id: Int
  let title: String
}
struct PostsPage: Decodable {
  let posts: [Post]
}
enum APIError: Error {
  case badStatus(Int)
}

func fetchPosts() async throws -> [Post] {
  let url = URL(string: "https://dummyjson.com/posts?limit=20")!
  let (data, response) = try await URLSession.shared.data(from: url)
  guard let http = response as? HTTPURLResponse, (200..<300).contains(http.statusCode) else {
    throw APIError.badStatus((response as? HTTPURLResponse)?.statusCode ?? -1)
  }
  return try JSONDecoder().decode(PostsPage.self, from: data).posts
}

struct PostsScreen: View {
  enum Phase {
    case loading
    case loaded([Post])
    case failed(String)
  }
  @State private var phase = Phase.loading
  var body: some View {
    Group {
      switch phase {
      case .loading:
        ProgressView("بنحمّل...")
      case .loaded(let posts):
        List(posts) { Text($0.title) }
          .refreshable { await load() }
      case .failed(let message):
        ContentUnavailableView {
          Label("في مشكلة", systemImage: "wifi.slash")
        } description: {
          Text(message)
        } actions: {
          Button("جرّب تاني") { Task { await load() } }
        }
      }
    }
    .task { await load() }
  }
  private func load() async {
    do {
      phase = .loaded(try await fetchPosts())
    } catch {
      phase = .failed(error.localizedDescription)
    }
  }
}`,
          try: R`شغّل الـ Simulator، وبعدين اقفل النت من الماك (أو غيّر الـ URL لـ [[posts-x]]) وشوف شاشة الخطأ، ورجّعه ودوس «جرّب تاني». وبعدين ضيف حالة [[.loaded]] لما الـ array فاضية تعرض [[ContentUnavailableView("مفيش بوستات", systemImage: "tray")]].`,
          flag: "script",
          deep: {
            why: R`أغلب شغل iOS في الشركات: شاشة بتجيب داتا من API وتعرضها. واللي بيفرق تطبيق محترف عن تطبيق مبتدئ هو التعامل مع الحالات التانية: النت فصل، السيرفر رد 500، الداتا فاضية، المستخدم سحب للتحديث. الـ enum بيجبرك تفكر في كل حالة لأن الـ switch لازم يغطيهم.`,
            how: R`[[.task]] بيشتغل في context الـ View (الـ MainActor)، فـ [[phase = ...]] بيتكتب على الـ main thread بأمان. لما [[await fetchPosts()]] بيستنى، الـ main thread فاضي يرسم الـ ProgressView. ولو المستخدم خرج من الشاشة قبل ما الطلب يخلص، [[.task]] بيلغي الـ Task، و URLSession بيرمي error إلغاء.

[[(200..<300).contains(http.statusCode)]]: range بيشيك الـ status من 200 لـ 299. والـ [[(response as? HTTPURLResponse)?.statusCode ?? -1]]: cast ثم optional chaining ثم قيمة افتراضية.

[[List(posts) { Text($0.title) }]]: [[$0]] كل بوست. و [[Group]] container شفاف عشان نحط [[.task]] على أي حالة من الـ switch.`,
            when: R`أي شاشة بتعرض داتا من السيرفر. ولما الطلبات تكتر، انقل [[fetchPosts]] وأخواتها لـ type واحد ([[APIClient]]) فيه الـ base URL والـ headers (زي التوكن) وفك الـ JSON بشكل generic، وده الدرس بتاع MVVM في المستوى 3.`,
            mistakes: R`تفترض إن مفيش error يعني الرد 200. وتحط الطلب في [[.onAppear]] مع [[Task { }]] فبيتكرر كل ما ترجع للشاشة ومبيتلغيش. وتعرض [[error.localizedDescription]] الخام للمستخدم في تطبيق حقيقي (اعمل رسايل مفهومة بالعربي). وتنسى حالة «فاضي» فالمستخدم يشوف شاشة بيضا ويفتكرها باظت.`
          },
          lines: [
            "SwiftUI (فيها Foundation).",
            R`[[Decodable]] عشان نقراه بس، و [[Identifiable]] عشان List.`,
            "id.",
            "title.",
            "قفلة.",
            R`الغلاف: الـ JSON شكله [[{ "posts": [...] }]].`,
            "array البوستات.",
            "قفلة.",
            "أخطاء بتاعتنا.",
            "status غلط.",
            "قفلة.",
            R`دالة [[async throws]].`,
            R`[[!]] هنا آمن لأن النص ثابت ومكتوب صح.`,
            R`الطلب نفسه. بيرجّع tuple بنفكه في اسمين.`,
            R`[[as?]] cast، وبعد الفاصلة شرط الـ status من 200 لـ 299.`,
            "لو مش ناجح نرمي خطأ فيه الكود.",
            "قفلة.",
            R`نفك الغلاف ونرجّع [[.posts]].`,
            "قفلة.",
            "الشاشة.",
            "enum للحالات جوه الـ View.",
            "بتحمّل.",
            "خلصت بداتا.",
            "فشلت برسالة.",
            "قفلة.",
            R`[[@State]] بالحالة الأولى.`,
            "body.",
            R`[[Group]] حاوية شفافة.`,
            "switch على الحالة.",
            "بتحمّل.",
            R`[[ProgressView]] دايرة بتلف.`,
            "خلصت.",
            R`قايمة، و [[$0]] كل بوست.`,
            R`[[.refreshable]]: سحب لتحت بيحمّل تاني.`,
            "فشلت.",
            R`[[ContentUnavailableView]] بـ 3 أجزاء.`,
            "العنوان والأيقونة.",
            "الوصف.",
            "الرسالة.",
            "الأزرار.",
            R`[[Task { }]] عشان الزرار مش async.`,
            "قفلة.",
            "قفلة الـ switch.",
            "قفلة Group.",
            R`[[.task]]: يحمّل لما الشاشة تظهر ويلغي لما تختفي.`,
            "قفلة body.",
            "دالة التحميل.",
            "do.",
            "لو نجح الحالة بقت loaded.",
            "catch.",
            "لو فشل الحالة بقت failed.",
            "قفلة.",
            "قفلة الدالة.",
            "قفلة الـ struct."
          ],
          sol: R`لما النت يتقفل هتشوف [[ContentUnavailableView]] بأيقونة wifi.slash ورسالة زي [[The Internet connection appears to be offline.]] (أو ترجمتها حسب لغة الجهاز). ولما تغير الـ URL لمسار مش موجود، السيرفر بيرد 404 فهيظهر خطأ [[APIError]].

حالة الفاضي:`,
          solCode: R`case .loaded(let posts) where posts.isEmpty:
  ContentUnavailableView("مفيش بوستات", systemImage: "tray")
case .loaded(let posts):
  List(posts) { Text($0.title) }
    .refreshable { await load() }`
        },
        {
          cmd: "الصور و AsyncImage",
          title: "تعرض أيقونة SF Symbol وصورة من Assets وصورة من النت بـ AsyncImage، وتظبط حجمها",
          desc: R`تلات مصادر للصور:
1. [[Image(systemName: "heart.fill")]]: SF Symbols، أيقونات Apple الجاهزة. بتتعامل زي النص: حجمها بـ [[.font]] ولونها بـ [[.foregroundStyle]]، وبتتظبط مع Dynamic Type لوحدها.
2. [[Image("logo")]]: صورة حطيتها في [[Assets.xcassets]] (اسحبها جوه Xcode). حطها بـ 3 أحجام (1x و 2x و 3x) أو PDF/SVG واحد.
3. [[AsyncImage(url:)]]: صورة من النت، بتتحمّل لوحدها.

الصورة افتراضيًا بتتعرض بحجمها الأصلي. عشان تتحكم:
• [[.resizable()]] الأول (لازم قبل أي تحجيم).
• [[.scaledToFit()]]: تبان كلها جوه المساحة. [[.scaledToFill()]]: تملا المساحة وممكن تتقص.
• [[.frame(width:height:)]] و [[.clipShape(.circle)]] أو [[.clipShape(.rect(cornerRadius: 12))]].

[[AsyncImage]] بالـ closure بتاعه بيدّيك [[phase]] فيه 3 حالات: [[.empty]] (لسه بيحمّل) و [[.success(let image)]] و [[.failure]]. تعرض لكل حالة شكل.

حدود AsyncImage: الـ cache بتاعه ضعيف (ممكن يحمّل الصورة تاني لما الصف يرجع يظهر في List). في تطبيقات فيها صور كتير، الشركات بتستخدم مكتبات زي [[Kingfisher]] أو [[Nuke]] (عن طريق Swift Package Manager).

Accessibility: الصور الزخرفية [[Image(decorative:)]] أو [[.accessibilityHidden(true)]]، والصور اللي ليها معنى [[.accessibilityLabel("...")]] عشان VoiceOver.`,
          example: R`import SwiftUI

struct AuthorRow: View {
  let name: String
  let avatarURL: URL?
  var body: some View {
    HStack(spacing: 12) {
      AsyncImage(url: avatarURL) { phase in
        switch phase {
        case .success(let image):
          image
            .resizable()
            .scaledToFill()
        case .failure:
          Image(systemName: "person.crop.circle.badge.exclamationmark")
            .font(.title)
        default:
          ProgressView()
        }
      }
      .frame(width: 56, height: 56)
      .clipShape(.circle)
      .accessibilityLabel("صورة \(name)")
      Text(name).font(.headline)
      Spacer()
      Image(systemName: "checkmark.seal.fill")
        .foregroundStyle(.blue)
        .accessibilityLabel("حساب موثق")
    }
    .padding()
  }
}

#Preview {
  AuthorRow(name: "سارة", avatarURL: URL(string: "https://i.pravatar.cc/200"))
}`,
          try: R`غيّر الـ URL لحاجة غلط وشوف أيقونة الخطأ. وبعدين شيل [[.resizable()]] وشوف الصورة طلعت إزاي. وأخيرًا جرّب [[.scaledToFit()]] بدل [[.scaledToFill()]] مع صورة مستطيلة.`,
          flag: "script",
          deep: {
            why: R`الصور أكتر حاجة بتخلي التطبيق شكله حلو أو شكله مكسور. ومن غير التعامل مع الحالات (بتحمّل، فشلت) هتلاقي أماكن فاضية بتقفز لما الصورة تظهر. الـ frame الثابت بيمنع القفزة دي.`,
            how: R`[[AsyncImage]] بيستخدم URLSession عشان يحمّل، ومش بيبدأ غير لما يظهر. [[phase]] نوعه [[AsyncImagePhase]] (enum). استخدمنا [[default:]] بدل [[.empty]] لأن الـ enum ممكن تيجي له حالات جديدة في iOS أحدث، و Apple بتطلب تغطيتها ([[@unknown default]] هو الشكل الأدق).

[[.resizable()]] لازم يتحط على [[Image]] نفسها مش على الـ View اللي حواليها، عشان كده جوه الـ case. و [[.clipShape(.circle)]] بتقص الصورة على شكل دايرة، والـ [[.frame]] قبلها بيحدد المساحة.

[[URL(string:)]] بيرجّع [[URL?]]، والـ [[AsyncImage(url:)]] بياخد optional: لو nil بيروح لـ failure.`,
            when: R`SF Symbols لكل الأيقونات (أول اختيار دايمًا قبل ما تطلب أيقونة من الديزاينر). Assets للوجو والصور الثابتة. AsyncImage للصور القليلة من النت، ومكتبة لما الصور كتير (feed أو متجر).`,
            mistakes: R`تحط [[.frame]] من غير [[.resizable()]] فالصورة متتغيرش. وتستخدم [[scaledToFill]] من غير [[clipShape]] أو [[.clipped()]] فالصورة تطلع برة حدودها. وتحمّل صورة 4000 بكسل عشان تعرضها 56 نقطة: اطلب من الـ API حجم صغير (thumbnail).`
          },
          lines: [
            "SwiftUI.",
            "صف لكاتب.",
            "الاسم.",
            R`[[URL?]] لأن الـ URL ممكن يبقى غلط أو مش موجود.`,
            "body.",
            "صف.",
            R`[[AsyncImage]] بـ closure بياخد الحالة.`,
            "switch على الحالة.",
            "اتحملت.",
            "الصورة.",
            "قابلة للتحجيم.",
            "تملا المساحة.",
            "فشلت.",
            "أيقونة بديلة.",
            "حجمها.",
            R`أي حالة تانية (أهمها [[.empty]]: لسه بيحمّل).`,
            "دايرة تحميل.",
            "قفلة switch.",
            "قفلة AsyncImage.",
            "مساحة ثابتة، فمفيش قفزة.",
            "قص دايري.",
            R`وصف لـ VoiceOver.`,
            "الاسم.",
            "Spacer.",
            "أيقونة SF Symbol.",
            "لونها.",
            "وصفها.",
            "قفلة HStack.",
            "مسافة.",
            "قفلة body.",
            "قفلة.",
            R`جوه [[#Preview]]: URL لصورة تجريبية.`,
            "قفلة."
          ],
          sol: R`بالـ URL الغلط بتظهر الأيقونة بعلامة التعجب. ومن غير [[.resizable()]] الصورة بتظهر بحجمها الأصلي (200 بكسل) وبتتقص من الدايرة فتشوف جزء صغير منها. و [[scaledToFit]] بيخلي الصورة المستطيلة كاملة جوه المربع وفيه مساحة فاضية فوق وتحت (أو على الجناب)، و [[scaledToFill]] بيملا المربع ويقص الزيادة.`
        },
        {
          cmd: "AppStorage و UserDefaults",
          title: "تحفظ إعدادات صغيرة بـ @AppStorage و UserDefaults، وإيه اللي مينفعش يتحفظ فيها",
          desc: R`[[UserDefaults]] مخزن صغير key-value بيفضل محفوظ بعد ما التطبيق يتقفل. مناسب للإعدادات: الوضع الليلي، اللغة، شاف الـ onboarding ولا لأ، آخر تاب.

في SwiftUI: [[@AppStorage("key") private var isDark = false]]. زي [[@State]] بالظبط (بيحدث الـ View وبيدّيك Binding بـ [[$]])، بس القيمة بتتخزن في UserDefaults تحت المفتاح ده. والقيمة اللي في التعريف افتراضية لو المفتاح لسه مش موجود. بيدعم Bool و Int و Double و String و URL و Data، و enums بـ raw value من النوع ده.

برة SwiftUI: [[UserDefaults.standard.set(true, forKey: "seen")]] و [[.bool(forKey:)]] و [[.integer(forKey:)]] و [[.string(forKey:)]]. لاحظ إن [[bool]] و [[integer]] بيرجعوا [[false]] و [[0]] لو المفتاح مش موجود، و [[string]] بيرجّع optional.

اللي مينفعش يتحفظ في UserDefaults:
• أي حاجة سرية (توكن، باسورد): بتتخزن في ملف plist مش متشفر جوه التطبيق. السر مكانه الـ [[Keychain]].
• داتا كبيرة أو قوايم بتكبر (المهام، الرسايل): بتتحمّل كلها في الذاكرة عند الفتح. ده مكانه SwiftData أو ملف.

ملحوظة للنشر: [[UserDefaults]] من الـ APIs اللي Apple بتطلب تكتب سبب استخدامها في الـ privacy manifest (درس الخصوصية في المستوى 3).

خلي أسماء المفاتيح في مكان واحد (enum أو static constants) عشان غلطة إملائية في المفتاح = قيمة مش بتتحفظ من غير أي خطأ.`,
          example: R`import SwiftUI

enum AppTheme: String, CaseIterable, Identifiable {
  case system, light, dark
  var id: Self { self }
}

struct SettingsScreen: View {
  @AppStorage("username") private var username = ""
  @AppStorage("theme") private var theme = AppTheme.system
  @AppStorage("launchCount") private var launchCount = 0
  private var colorScheme: ColorScheme? {
    switch theme {
    case .system: nil
    case .light: .light
    case .dark: .dark
    }
  }
  var body: some View {
    Form {
      TextField("اسمك", text: $username)
      Picker("المظهر", selection: $theme) {
        ForEach(AppTheme.allCases) { Text($0.rawValue).tag($0) }
      }
      Text("فتحت الشاشة دي \(launchCount) مرة")
    }
    .preferredColorScheme(colorScheme)
    .onAppear { launchCount += 1 }
  }
}

func markOnboardingSeen() {
  UserDefaults.standard.set(true, forKey: "seenOnboarding")
  print(UserDefaults.standard.bool(forKey: "seenOnboarding"))
}`,
          try: R`اكتب اسمك واختار dark، واقفل التطبيق من الـ Simulator خالص (اسحبه من الـ app switcher) وافتحه تاني. لسه موجودين؟ وبعدين غيّر المفتاح [["username"]] لـ [["userName"]] وشوف القيمة راحت فين.`,
          flag: "script",
          deep: {
            why: R`كل تطبيق محتاج يفتكر إعدادات صغيرة. [[@AppStorage]] بيخليها سطر واحد، ومربوطة بالواجهة مباشرة. بس لازم تعرف حدوده عشان متحطش فيه توكن (مشكلة أمان) أو 5000 عنصر (مشكلة أداء).`,
            how: R`UserDefaults بيتخزن كملف plist في فولدر التطبيق، وبيتقري في الذاكرة عند أول استخدام. [[@AppStorage]] بيراقب المفتاح، فلو اتغير من أي حتة (حتى من [[UserDefaults.standard.set]]) كل الـ Views اللي بتقراه بتتحدث.

[[preferredColorScheme]] بياخد [[ColorScheme?]]: [[nil]] = اتبع النظام، وعشان كده الـ computed property بترجّع optional. و [[.onAppear]] بيتنفذ كل ما الشاشة تظهر.

لو عايز تشارك الإعدادات مع widget أو extension: [[UserDefaults(suiteName: "group.com.you.app")]] مع App Group.`,
            when: R`[[@AppStorage]] لإعدادات المستخدم والـ flags الصغيرة. Keychain للتوكنات والباسوردات (مكتبات زي [[KeychainAccess]] بتسهلها). SwiftData للداتا الحقيقية. والملفات ([[FileManager]]) للحاجات الكبيرة (صور، ملفات PDF).`,
            mistakes: R`تحفظ الـ access token في UserDefaults (أشهر غلطة أمان في تطبيقات المبتدئين). وتحفظ array كبيرة متحولة لـ JSON في UserDefaults وتحدّثها كل ثانية. وتكتب اسم المفتاح كنص في 5 أماكن. وتفتكر إن [[@AppStorage]] بيتشارك بين أجهزة المستخدم: لأ، ده محلي (للمزامنة فيه [[NSUbiquitousKeyValueStore]] أو CloudKit).`
          },
          lines: [
            "SwiftUI.",
            R`enum بـ raw value String، فـ [[@AppStorage]] يقدر يخزنه.`,
            "3 حالات.",
            "id للـ ForEach.",
            "قفلة.",
            "شاشة الإعدادات.",
            R`[[@AppStorage]] بمفتاح، والقيمة الافتراضية فاضية.`,
            "enum بيتخزن كـ raw value.",
            "عداد.",
            R`computed بتحوّل اختيارنا لـ [[ColorScheme?]]، و [[nil]] يعني زي النظام.`,
            "switch كـ expression.",
            "nil: اتبع إعداد الجهاز.",
            "فاتح.",
            "غامق.",
            "قفلة switch.",
            "قفلة.",
            "body.",
            "فورم.",
            R`[[$username]] Binding زي State، بس بيتحفظ.`,
            "Picker مربوط بالـ theme.",
            "صف لكل اختيار.",
            "قفلة.",
            "العداد.",
            "قفلة Form.",
            "مظهر الشاشة دي واللي تحتها.",
            "بيزود كل ما الشاشة تظهر.",
            "قفلة body.",
            "قفلة.",
            "دالة عادية برة SwiftUI.",
            R`[[set(_:forKey:)]] بيحفظ.`,
            R`[[bool(forKey:)]] بيقرا، true.`,
            "قفلة."
          ],
          sol: R`بعد قفل التطبيق وفتحه: الاسم والمظهر موجودين، والعداد كمّل. ولما تغير اسم المفتاح، الـ [[@AppStorage]] بيدور على [["userName"]] فمش لاقيه، فبيرجع للقيمة الافتراضية (فاضي)، والقيمة القديمة لسه متخزنة تحت [["username"]] بس محدش بيقراها. ده سبب إن أسماء المفاتيح لازم تبقى في مكان واحد:`,
          solCode: R`enum StorageKey {
  static let username = "username"
  static let theme = "theme"
}

@AppStorage(StorageKey.username) private var username = ""`
        },
        {
          cmd: "SwiftData",
          title: "تحفظ داتا التطبيق على الجهاز بـ SwiftData: @Model و modelContainer و @Query و modelContext",
          desc: R`SwiftData (iOS 17 وما بعده) طريقة Apple الحديثة لتخزين داتا التطبيق في داتابيز على الجهاز (تحتها SQLite). مبنية فوق Core Data القديمة، بس بكود Swift عادي من غير ملفات model.

4 حاجات:
1. [[@Model]] على [[class]]: [[@Model final class TaskItem { var title: String ... }]]. الـ macro بيخلي الـ class جدول، وكل property عمود. لازم class ولازم [[init]].
2. [[.modelContainer(for: TaskItem.self)]] على الـ [[WindowGroup]] في الـ App: بيجهز الداتابيز وبيحطها في الـ environment.
3. [[@Query]] في أي View: [[@Query(sort: \TaskItem.createdAt, order: .reverse) private var tasks: [TaskItem]]]. بيجيب الداتا ويحدث الـ View لوحده لما تتغير. وتقدر تفلتر بـ [[filter: #Predicate { !$0.isDone }]].
4. [[@Environment(\.modelContext) private var context]]: للإضافة [[context.insert(item)]] والمسح [[context.delete(item)]]. والتعديل: غيّر الـ property مباشرة ([[task.isDone = true]]). الحفظ بيحصل لوحده (autosave)، وتقدر تنادي [[try context.save()]] لو عايز تضمن.

الـ [[@Model]] classes بتتبع Observable، فتقدر تعمل منها bindings بـ [[@Bindable]] أو [[Bindable(task).isDone]].

[[@Attribute(.unique)]] على property بيمنع التكرار، و [[@Relationship(deleteRule: .cascade)]] للعلاقات (مشروع فيه مهام، ولما يتمسح المهام تتمسح).

صراحة: SwiftData لسه أصغر من Core Data في الإمكانيات وكان فيها bugs في أول نسخها، وفيه شركات كتير لسه على Core Data أو بتستخدم مكتبات زي [[GRDB]]. بس للمشاريع الجديدة وللتعلم هي البداية المنطقية.`,
          example: R`import SwiftUI
import SwiftData

@Model
final class TaskItem {
  var title: String
  var isDone: Bool
  var createdAt: Date
  init(title: String, isDone: Bool = false, createdAt: Date = .now) {
    self.title = title
    self.isDone = isDone
    self.createdAt = createdAt
  }
}

@main
struct TasksApp: App {
  var body: some Scene {
    WindowGroup {
      TasksScreen()
    }
    .modelContainer(for: TaskItem.self)
  }
}

struct TasksScreen: View {
  @Environment(\.modelContext) private var context
  @Query(sort: \TaskItem.createdAt, order: .reverse) private var tasks: [TaskItem]
  @State private var newTitle = ""
  var body: some View {
    NavigationStack {
      List {
        TextField("مهمة جديدة", text: $newTitle)
          .onSubmit(add)
        ForEach(tasks) { task in
          Toggle(task.title, isOn: Bindable(task).isDone)
        }
        .onDelete { offsets in
          for index in offsets { context.delete(tasks[index]) }
        }
      }
      .navigationTitle("مهامي (\(tasks.count))")
    }
  }
  private func add() {
    let title = newTitle.trimmingCharacters(in: .whitespaces)
    guard !title.isEmpty else { return }
    context.insert(TaskItem(title: title))
    newTitle = ""
  }
}`,
          try: R`ضيف 3 مهام وعلّم واحدة، واقفل التطبيق خالص وافتحه: موجودين؟ وبعدين اعمل [[@Query]] تاني بـ [[filter: #Predicate<TaskItem> { !$0.isDone }]] واعرض عدد المتبقي في العنوان. وأخيرًا اعمل Preview بداتابيز في الذاكرة بس.`,
          flag: "script",
          deep: {
            why: R`تطبيق مهام أو ملاحظات أو مصاريف لازم يحفظ الداتا على الجهاز ويشتغل من غير نت. قبل SwiftData كان Core Data هو الحل الرسمي، وكان محتاج ملف model بالرسم و [[NSManagedObject]] و [[NSFetchRequest]] وكود كتير. SwiftData بتعمل نفس الشغل بـ macros.`,
            how: R`[[@Model]] بيحوّل كل stored property لحاجة بتتخزن وبتتراقب (زي [[@Observable]]). الـ [[ModelContainer]] بيمثل الداتابيز والـ schema، والـ [[ModelContext]] زي «مساحة شغل»: بتعمل فيها insert و delete وتعديلات، وبتتحفظ على الديسك على فترات أو مع [[save()]].

[[@Query]] بيعمل fetch من الـ context اللي في الـ environment، وبيراقب أي تغيير، فلما تعمل insert القايمة بتتحدث من غير ما تعمل حاجة. و [[#Predicate]] macro بيحوّل الـ closure لشرط الداتابيز تفهمه (مش كل كود Swift ينفع جواه).

[[Bindable(task).isDone]] بيعمل Binding لـ property في الـ object من غير ما نعمل View منفصل بـ [[@Bindable]]. و [[.onSubmit(add)]] بيبعت الدالة نفسها كـ closure.

لو غيرت شكل الـ model بعد ما نزّلت التطبيق (ضفت property مثلًا)، SwiftData بتعمل migration خفيف لوحدها في الحالات البسيطة، وللتغييرات الكبيرة فيه [[VersionedSchema]] و [[SchemaMigrationPlan]].`,
            when: R`داتا المستخدم المحلية اللي بتكبر: مهام، ملاحظات، مفضلة، cache لداتا من السيرفر. ولو التطبيق كله بيعرض داتا السيرفر ومش محتاج يشتغل offline، ممكن مش محتاج داتابيز خالص.`,
            mistakes: R`تنسى [[.modelContainer]] فالتطبيق يقع أول ما [[@Query]] يشتغل. وتعمل [[@Model]] بـ struct (لازم class). وتعمل الـ Preview من غير container. وتعمل insert لعناصر كتير في loop على الـ main thread (لآلاف العناصر استخدم [[@ModelActor]] في الخلفية). وتفتكر إن SwiftData بتزامن مع السيرفر بتاعك: هي محلية (وفيها مزامنة iCloud عن طريق CloudKit لو فعّلتها، بشروط على شكل الـ model).`
          },
          lines: [
            "SwiftUI.",
            "SwiftData.",
            R`[[@Model]]: الـ class ده بقى جدول.`,
            R`لازم [[class]].`,
            "عمود.",
            "عمود.",
            "عمود.",
            R`[[init]] إجباري، والقيم الافتراضية بتسهّل الإنشاء. [[.now]] = [[Date.now]].`,
            "بنحط القيم.",
            "بنحط القيم.",
            "بنحط القيم.",
            "قفلة الـ init.",
            "قفلة الـ class.",
            "نقطة البداية.",
            "الـ App.",
            "body.",
            "الشباك.",
            "أول شاشة.",
            "قفلة WindowGroup.",
            R`[[.modelContainer]]: بيجهز الداتابيز للنوع ده ويحطها في الـ environment.`,
            "قفلة body.",
            "قفلة.",
            "شاشة المهام.",
            R`[[\.modelContext]]: للإضافة والمسح.`,
            R`[[@Query]]: كل المهام، الأحدث فوق، وبتتحدث لوحدها.`,
            "النص اللي بيتكتب.",
            "body.",
            "NavigationStack عشان العنوان.",
            "قايمة.",
            "خانة الإضافة.",
            R`[[.onSubmit(add)]]: لما يدوس Enter.`,
            "مهمة في كل صف.",
            R`[[Bindable(task).isDone]] Binding للـ property، والتعديل بيتحفظ لوحده.`,
            "قفلة ForEach.",
            "المسح بالـ swipe.",
            R`[[context.delete]] لكل عنصر اتمسح.`,
            "قفلة.",
            "قفلة List.",
            "العدد في العنوان.",
            "قفلة NavigationStack.",
            "قفلة body.",
            "دالة الإضافة.",
            "نشيل المسافات.",
            "منضيفش فاضي.",
            R`[[context.insert]]: الـ @Query هيشوفها على طول.`,
            "نفضّي الخانة.",
            "قفلة الدالة.",
            "قفلة."
          ],
          sol: R`بعد القفل والفتح، المهام والعلامات موجودين: اتحفظوا تلقائيًا.

الفلتر والـ Preview:`,
          solCode: R`@Query(filter: #Predicate<TaskItem> { !$0.isDone }) private var remaining: [TaskItem]

// العنوان
.navigationTitle("مهامي (فاضل \(remaining.count))")

#Preview {
  TasksScreen()
    .modelContainer(for: TaskItem.self, inMemory: true)
}`
        },
        {
          cmd: "UIKit مع SwiftUI",
          title: "UIKit لسه موجود فين، وتستخدم view من UIKit جوه SwiftUI بـ UIViewRepresentable والعكس بـ UIHostingController",
          desc: R`[[UIKit]] الـ framework القديم للواجهات (من 2008). SwiftUI طلع 2019، ودلوقتي هو الاختيار الطبيعي لأي شاشة جديدة. بس UIKit لسه في كل حتة:
• تطبيقات الشركات الكبيرة اتكتبت بـ UIKit وبتتنقل لـ SwiftUI شاشة شاشة. هتلاقي في الإعلانات كتير «UIKit و SwiftUI».
• حاجات مفيهاش بديل كامل في SwiftUI أو محتاجة تحكم أدق (بعض شاشات الكاميرا، و text editing متقدم، و collection layouts معقدة).
• SwiftUI نفسه على iOS مبني جزء منه فوق UIKit.

المفاهيم اللي لازم تعرفها من UIKit: [[UIViewController]] (شاشة)، و [[UIView]] (عنصر)، و [[UILabel]] و [[UIButton]] و [[UITableView]]، والـ delegate pattern (object بيبلغ object تاني بالأحداث، وبيبقى [[weak]])، والـ Auto Layout (constraints)، و Storyboards (تصميم بالسحب، أقل استخدامًا دلوقتي).

التوصيل في الاتجاهين:
1. UIKit جوه SwiftUI: struct بيتبع [[UIViewRepresentable]] (أو [[UIViewControllerRepresentable]] لشاشة كاملة). بتكتب [[makeUIView]] (بتعمل الـ view مرة) و [[updateUIView]] (بتحدثه لما الـ state تتغير). ولو محتاج تستقبل أحداث من الـ view، بتعمل [[Coordinator]] يبقى الـ delegate.
2. SwiftUI جوه UIKit: [[UIHostingController(rootView: MySwiftUIView())]] بيلف أي View في view controller، فتقدر تحطه في تطبيق UIKit قديم. وده الطريقة اللي الشركات بتدخل بيها SwiftUI تدريجيًا.

المثال بيلف [[UITextView]] (SwiftUI فيه [[TextEditor]] بالفعل، بس الـ pattern نفسه هو اللي هتستخدمه مع أي view من UIKit).`,
          example: R`import SwiftUI
import UIKit

struct RichTextView: UIViewRepresentable {
  @Binding var text: String
  func makeUIView(context: Context) -> UITextView {
    let view = UITextView()
    view.font = .preferredFont(forTextStyle: .body)
    view.delegate = context.coordinator
    return view
  }
  func updateUIView(_ uiView: UITextView, context: Context) {
    if uiView.text != text {
      uiView.text = text
    }
  }
  func makeCoordinator() -> Coordinator {
    Coordinator(text: $text)
  }
  final class Coordinator: NSObject, UITextViewDelegate {
    var text: Binding<String>
    init(text: Binding<String>) {
      self.text = text
    }
    func textViewDidChange(_ textView: UITextView) {
      text.wrappedValue = textView.text
    }
  }
}

struct NoteScreen: View {
  @State private var note = "اكتب هنا..."
  var body: some View {
    VStack {
      RichTextView(text: $note)
      Text("\(note.count) حرف")
    }
  }
}

func makeLegacyScreen() -> UIViewController {
  UIHostingController(rootView: NoteScreen())
}`,
          try: R`شغّل [[NoteScreen]] واكتب: العداد بيتحدث مع كل حرف؟ وبعدين ضيف زرار «امسح» في SwiftUI بيعمل [[note = ""]] وشوف إن الـ UITextView اتفضّى (ده شغل [[updateUIView]]).`,
          flag: "script",
          deep: {
            why: R`أغلب الوظايف iOS في السوق في شركات عندها كود من 5 أو 10 سنين. لو بتعرف SwiftUI بس، هتتلخبط أول ما تفتح المشروع وتلاقي [[UIViewController]] و delegates. ولو بتعرف UIKit بس، هتتأخر عن الجديد. الربط بين الاتنين مهارة مطلوبة فعلًا في الانترفيوهات.`,
            how: R`SwiftUI بتنادي [[makeUIView]] مرة لما الـ View يظهر أول مرة، و [[updateUIView]] كل ما state الـ struct تتغير (هنا [[text]]). الشرط [[if uiView.text != text]] بيمنع إعادة الكتابة كل مرة (اللي كانت هتحرك المؤشر).

الـ [[Coordinator]] class لأن الـ delegate لازم يبقى object (UIKit بيمسكه [[weak]])، وبيورث [[NSObject]] لأن protocols الـ UIKit من Objective-C. وبيمسك [[Binding]] عشان يكتب في الـ state بتاعة SwiftUI. و [[text.wrappedValue]] هي القيمة اللي جوه الـ Binding.

[[UIViewRepresentable]] و [[UITextViewDelegate]] الاتنين [[@MainActor]]، فالكود ده كله على الـ main thread، وده المطلوب لأي شغل UI.`,
            when: R`لما تحتاج view من UIKit أو مكتبة قديمة مفيش بديلها في SwiftUI (خرايط مخصصة، محرر نصوص متقدم، كاميرا مخصصة). و [[UIHostingController]] لما بتضيف شاشات SwiftUI جديدة لتطبيق UIKit قديم.`,
            mistakes: R`تعمل الـ view من جديد في [[updateUIView]] بدل ما تعدّله. وتكتب في الـ Binding من جوه [[updateUIView]] فتعمل loop تحديث. وتمسك الـ parent struct جوه الـ Coordinator وتتوقع إنه يتحدث (الـ struct نسخة قديمة). وتفتكر إن UIKit «مات»: لسه مطلوب في أغلب الشركات.`
          },
          lines: [
            "SwiftUI.",
            "UIKit.",
            R`[[UIViewRepresentable]]: بيلف view من UIKit.`,
            "Binding للنص من الأب.",
            R`[[makeUIView]]: بتتنادى مرة واحدة.`,
            R`[[UITextView]] من UIKit.`,
            "خط بيتأقلم مع Dynamic Type.",
            R`الـ delegate هو الـ coordinator.`,
            "بنرجّع الـ view.",
            "قفلة.",
            R`[[updateUIView]]: لما الـ state تتغير.`,
            "لو النص مختلف بس.",
            "نحدث الـ view.",
            "قفلة if.",
            "قفلة.",
            R`[[makeCoordinator]]: بيعمل الـ coordinator مرة.`,
            "بنبعتله الـ Binding.",
            "قفلة.",
            R`[[Coordinator]]: class بيستقبل أحداث UIKit.`,
            "بيمسك الـ Binding.",
            "init.",
            "بنحفظه.",
            "قفلة.",
            R`method من [[UITextViewDelegate]]: بتتنادى مع كل تغيير.`,
            R`بنكتب في state بتاعة SwiftUI عن طريق [[wrappedValue]].`,
            "قفلة.",
            "قفلة الـ Coordinator.",
            "قفلة الـ struct.",
            "شاشة SwiftUI.",
            "state.",
            "body.",
            "عمود.",
            "الـ view بتاع UIKit زي أي View.",
            "عداد بيتحدث مع الكتابة.",
            "قفلة.",
            "قفلة body.",
            "قفلة.",
            "دالة للتطبيقات القديمة.",
            R`[[UIHostingController]]: View من SwiftUI جوه UIViewController.`,
            "قفلة."
          ],
          sol: R`أيوه: كل حرف بينادي [[textViewDidChange]]، والـ coordinator بيكتب في [[note]]، فالعداد بيتحدث. وزرار المسح بيغيّر [[note]]، و SwiftUI بتنادي [[updateUIView]]، والنص مختلف فبيتكتب [[""]] في الـ UITextView.`,
          solCode: R`VStack {
  RichTextView(text: $note)
  HStack {
    Text("\(note.count) حرف")
    Spacer()
    Button("امسح") { note = "" }
  }
  .padding()
}`
        }
      ]
    },
    {
      t: "المعمارية والـ concurrency والـ packages",
      l: 3,
      n: "MVVM بـ @Observable من غير مبالغة، والـ actors و @MainActor و Sendable، وأخطاء Swift 6 وحلها، و Swift Package Manager",
      items: [
        {
          cmd: "MVVM بـ Observable",
          title: "MVVM في SwiftUI بأمانة: view model بـ @Observable و @MainActor، و service protocol عشان تختبر من غير نت",
          desc: R`MVVM = Model (الداتا: structs زي [[Post]]) + View (الـ SwiftUI view) + ViewModel (class فيه state الشاشة والـ logic: التحميل، والفلترة، والـ validation).

الشكل الحديث:
• الـ ViewModel: [[@MainActor @Observable final class]]. [[@MainActor]] عشان الـ state بتاعته بتتعرض في الـ UI فلازم تتعدل على الـ main thread (الدرس الجاي).
• الـ View بيملكه في [[@State]]، ويبدأ التحميل في [[.task]]، ويعمل bindings بـ [[$viewModel.searchText]].
• الـ ViewModel مش بيكلم [[URLSession]] مباشرة: بياخد service من نوع protocol ([[any PostsService]]). في التطبيق بتبعت الحقيقي، وفي الاختبارات بتبعت fake بيرجّع داتا ثابتة أو بيرمي error. ده اسمه dependency injection.

بأمانة، عشان هتسمع آراء كتير:
1. MVVM مش إجباري في SwiftUI. فيه ناس (ومنهم أمثلة Apple نفسها) بتحط الـ state في [[@Observable]] models والـ Views على طول من غير view model لكل شاشة، وفيه architectures تانية زي TCA (The Composable Architecture) في شركات معينة.
2. view model لشاشة فيها [[Text]] و [[Toggle]] = تعقيد ملوش لازمة.
3. فايدته الحقيقية: الشاشات اللي فيها logic (تحميل وحالات وفلترة وvalidation): الـ View بيبقى عرض بس، والـ logic بيتختبر بـ unit tests من غير UI ومن غير نت.
4. في الانترفيوهات المصرية والخليجية هيسألوك عنه كتير، فلازم تعرف تشرحه وتعرف عيوبه.

[[_viewModel = State(initialValue: ...)]] في الـ init: الـ [[_]] قبل اسم property wrapper بيوصلك للـ wrapper نفسه (الـ [[State]]) مش للقيمة. ده الطريقة لتجهيز [[@State]] بقيمة جاية من الـ init.`,
          example: R`import SwiftUI

struct Post: Decodable, Identifiable, Sendable {
  let id: Int
  let title: String
}

protocol PostsService: Sendable {
  func fetchPosts() async throws -> [Post]
}

@MainActor
@Observable
final class PostsViewModel {
  enum Phase {
    case idle, loading, loaded([Post]), failed(String)
  }
  private(set) var phase = Phase.idle
  var searchText = ""
  private let service: any PostsService
  init(service: any PostsService) {
    self.service = service
  }
  var visiblePosts: [Post] {
    guard case .loaded(let posts) = phase else { return [] }
    if searchText.isEmpty { return posts }
    return posts.filter { $0.title.localizedCaseInsensitiveContains(searchText) }
  }
  func load() async {
    phase = .loading
    do {
      phase = .loaded(try await service.fetchPosts())
    } catch {
      phase = .failed("مقدرناش نحمّل البوستات، اتأكد من النت")
    }
  }
}

struct PostsListScreen: View {
  @State private var viewModel: PostsViewModel
  init(service: any PostsService) {
    _viewModel = State(initialValue: PostsViewModel(service: service))
  }
  var body: some View {
    NavigationStack {
      List(viewModel.visiblePosts) { Text($0.title) }
        .searchable(text: $viewModel.searchText)
        .overlay {
          if case .failed(let message) = viewModel.phase {
            ContentUnavailableView(message, systemImage: "wifi.slash")
          }
        }
        .navigationTitle("البوستات")
    }
    .task { await viewModel.load() }
  }
}`,
          try: R`اعمل [[struct FakePostsService: PostsService]] فيه [[posts]] و [[shouldFail]]، واستخدمه في [[#Preview]] مرة بداتا ومرة بفشل. وبعدين (بعد درس الاختبارات) اكتب test بيتأكد إن البحث بـ [["swift"]] بيرجّع البوست الصح.`,
          flag: "script",
          deep: {
            why: R`لما الـ logic جوه الـ View، الطريقة الوحيدة تتأكد إنه شغال إنك تشغّل التطبيق وتدوس بإيدك، وكل ما تعدّل حاجة تعيد. لما يبقى في view model بياخد service، تقدر تختبر «لو النت فصل الرسالة تظهر» و «البحث بيفلتر صح» في جزء من الثانية. وده بالظبط اللي الشركات بتدور عليه في كود المتقدمين.`,
            how: R`[[@Observable]] بيخلي الـ View يتحدث لما [[phase]] أو [[searchText]] يتغيروا. [[visiblePosts]] computed فبتتحسب من الاتنين، ومفيش state مكررة. و [[private(set)]] على [[phase]]: الـ View يقرا بس، والتغيير من [[load()]] بس.

[[guard case .loaded(let posts) = phase]]: pattern matching على enum جوه guard. و [[localizedCaseInsensitiveContains]] من Foundation: بحث من غير فرق حروف كبيرة وصغيرة.

[[any PostsService]] existential: ممكن يبقى أي نوع بيتبع الـ protocol. والـ protocol [[Sendable]] لأن الـ service ممكن يتنادى من أكتر من task. و [[$viewModel.searchText]]: الـ [[$]] على [[@State]] بيدّي Binding للـ object، والـ [[.searchText]] بيدّي Binding للـ property.

الكود ده (الـ view model والـ fake والاختبارات) اتجرب فعلًا بـ [[swift test]] على Linux بعد ما اتشال الجزء بتاع SwiftUI، لأن الـ view model مش معتمد على UI. وده دليل على الفصل الصح.`,
            when: R`view model للشاشات اللي فيها تحميل وحالات وlogic. لشاشات العرض البسيطة، View بـ [[@State]] كفاية. والـ services (API و storage) protocols من الأول لو ناوي تختبر.`,
            mistakes: R`view model بيعمل [[import SwiftUI]] ويرجّع [[Color]] و [[Font]]: كده مربوط بالـ UI ومش هتقدر تختبره براحة. ونسيان [[@MainActor]] فتطلع تحذيرات Swift 6 أو تحديث UI من thread تاني. وview model واحد ضخم لكل التطبيق (God object). ونسخ نفس الداتا في الـ View والـ view model.`
          },
          lines: [
            "SwiftUI.",
            R`الـ Model: struct، و [[Sendable]] عشان يتنقل بين tasks بأمان.`,
            "id.",
            "title.",
            "قفلة.",
            R`protocol للـ service: الحقيقي والـ fake الاتنين هيتبعوه.`,
            "الدالة الوحيدة المطلوبة.",
            "قفلة.",
            R`[[@MainActor]]: كل الكود ده على الـ main thread.`,
            R`[[@Observable]]: الـ View بيتحدث لما الـ state تتغير.`,
            "الـ ViewModel.",
            "حالات الشاشة.",
            "الحالات في سطر.",
            "قفلة.",
            R`[[private(set)]]: الـ View يقرا بس.`,
            "نص البحث، الـ View بيكتب فيه.",
            R`الـ service من برة (dependency injection).`,
            "init.",
            "بنحفظه.",
            "قفلة.",
            "computed: البوستات اللي هتتعرض.",
            R`[[guard case]]: لو مش loaded رجّع فاضي.`,
            "من غير بحث رجّع الكل.",
            "فلترة.",
            "قفلة.",
            R`[[load]]: الـ logic كله هنا مش في الـ View.`,
            "بنحمّل.",
            "do.",
            "النتيجة.",
            "catch.",
            "رسالة مفهومة للمستخدم.",
            "قفلة.",
            "قفلة الدالة.",
            "قفلة الـ class.",
            "الـ View.",
            R`[[@State]] بيملك الـ view model.`,
            "init بياخد الـ service.",
            R`[[_viewModel]]: الـ State wrapper نفسه، بنجهزه بالقيمة.`,
            "قفلة.",
            "body.",
            "NavigationStack.",
            "قايمة من الـ computed.",
            R`[[.searchable]]: خانة بحث مربوطة بالـ view model.`,
            R`[[.overlay]]: حاجة فوق القايمة.`,
            R`[[if case]]: لو الحالة failed.`,
            "شاشة الخطأ.",
            "قفلة if.",
            "قفلة overlay.",
            "العنوان.",
            "قفلة NavigationStack.",
            "التحميل لما الشاشة تظهر.",
            "قفلة body.",
            "قفلة."
          ],
          sol: R`الـ fake والـ Previews:`,
          solCode: R`struct FakePostsService: PostsService {
  var posts: [Post] = []
  var shouldFail = false
  func fetchPosts() async throws -> [Post] {
    if shouldFail { throw URLError(.notConnectedToInternet) }
    return posts
  }
}

#Preview("بداتا") {
  PostsListScreen(service: FakePostsService(posts: [
    Post(id: 1, title: "SwiftUI من الصفر"),
    Post(id: 2, title: "Kotlin و Compose"),
  ]))
}

#Preview("من غير نت") {
  PostsListScreen(service: FakePostsService(shouldFail: true))
}

// والاختبار (درس Swift Testing):
@MainActor
@Test func searchFilters() async {
  let fake = FakePostsService(posts: [Post(id: 1, title: "SwiftUI"), Post(id: 2, title: "Kotlin")])
  let viewModel = PostsViewModel(service: fake)
  await viewModel.load()
  viewModel.searchText = "swift"
  #expect(viewModel.visiblePosts.map(\.id) == [1])
}`
        },
        {
          cmd: "actors و MainActor و Sendable",
          title: "data race يعني إيه، وتمنعه بـ actor، و @MainActor للـ UI، و Sendable للقيم اللي بتتنقل بين الـ tasks",
          desc: R`data race: اتنين tasks بيعدّلوا نفس المتغير في نفس اللحظة من threads مختلفة. النتيجة: قيم غلط أو crash عشوائي صعب جدًا تلاقيه لأنه مش بيحصل كل مرة. Swift 6 بتمنع ده وقت الـ compile.

3 أدوات:
1. [[actor]]: زي class، بس بيضمن إن task واحد بس يلمس الـ state بتاعته في نفس الوقت. اللي برة لازم يكلمه بـ [[await]] ([[await account.deposit(5)]]) لأنه ممكن يستنى دوره. جوه الـ actor بتكتب كود عادي من غير locks.
2. [[@MainActor]]: actor خاص هو الـ main thread. أي class أو function عليها [[@MainActor]] بتشتغل على الـ main thread، وده إجباري لأي حاجة بتلمس الـ UI. الـ Views في SwiftUI كلها [[@MainActor]] أصلًا. والـ view models بتتعلم بيه.
3. [[Sendable]]: protocol بيقول «النوع ده آمن يتنقل بين tasks». الـ structs والـ enums اللي كل properties بتاعتها Sendable بتبقى Sendable لوحدها (في نفس الـ module). الـ class يبقى Sendable بس لو [[final]] وكل properties [[let]] من أنواع Sendable. والـ actors Sendable دايمًا.

[[nonisolated]]: method جوه actor مش محتاجة الحماية (مش بتلمس state متغيرة) فمش محتاجة [[await]].

ملحوظة عن Swift 6.2 و Xcode 26: المشاريع الجديدة بقت بتيجي بإعداد «Default Actor Isolation = MainActor»، يعني كل الكود افتراضيًا على الـ main thread إلا اللي تقول غير كده، و [[@concurrent]] عشان تبعت دالة تشتغل في الخلفية صراحة. ده بيقلل الأخطاء جدًا للتطبيقات العادية. لو مشروعك قديم أو package، الافتراضي القديم لسه موجود (nonisolated)، فاعرف الاتنين.`,
          example: R`actor BankAccount {
  private(set) var balance = 0
  func deposit(_ amount: Int) {
    balance += amount
  }
}
struct Transfer: Sendable {
  let id: Int
  let amount: Int
}
@MainActor
final class DashboardModel {
  var status = "مستني"
  func refresh(using account: BankAccount) async {
    status = "بيحدث..."
    let total = await account.balance
    status = "الرصيد: \(total)"
  }
}
let account = BankAccount()
let transfers = (1...1000).map { Transfer(id: $0, amount: 1) }
await withTaskGroup(of: Void.self) { group in
  for t in transfers {
    group.addTask {
      await account.deposit(t.amount)
    }
  }
}
print(await account.balance)
let model = DashboardModel()
await model.refresh(using: account)
print(model.status)`,
          try: R`غيّر [[actor BankAccount]] لـ [[final class BankAccount]] وشيل الـ [[await]] اللي قبل [[account.deposit]] وشغّل بـ [[swift -swift-version 6 main.swift]]. اقرا الخطأ. وبعدين جرّب تقرا [[account.balance]] من غير [[await]] والـ actor رجع actor.`,
          flag: "script",
          deep: {
            why: R`الـ crashes العشوائية من data races كانت من أصعب الـ bugs في iOS: بتحصل عند مستخدم واحد من ألف، ومش بتحصل عندك. Swift 6 حولتها لأخطاء compile: لو الكود ممكن يعمل race، مش هيترجم. التمن إنك لازم تفهم الـ actors و Sendable، وده سبب إن الموضوع ده بقى من أهم أسئلة انترفيو iOS.`,
            how: R`كل actor ليه «صندوق بريد»: الطلبات بتقف في طابور وبتتنفذ واحد واحد، فمفيش اتنين بيعدّلوا [[balance]] في نفس الوقت. الـ 1000 task اتنفذوا بالتوازي بس كل [[deposit]] اتنفذ لوحده، فالنتيجة 1000 بالظبط. لو كان class عادي في Swift 5 من غير حماية، الرقم ممكن كان يطلع أقل.

[[await account.balance]]: قراية property من actor تاني محتاجة [[await]]. وجوه [[refresh]] (اللي على الـ MainActor)، الـ [[await]] بيسيب الـ main thread فاضي وهو مستني، وبيرجع عليه لما الرد ييجي، فـ [[status]] بيتعدل على الـ main thread دايمًا.

Reentrancy: جوه actor، عند كل [[await]] ممكن task تاني يدخل ويغيّر الـ state. فمتفترضش إن القيمة اللي قريتها قبل [[await]] لسه زي ما هي بعده.

الكود ده بيشتغل على Linux بـ [[swift main.swift]] وبـ [[swift -swift-version 6 main.swift]] من غير أي تحذير.`,
            when: R`[[@MainActor]] على أي view model وأي حاجة بتلمس UI. [[actor]] لـ state مشتركة بتتعدل من أماكن كتير (cache للصور، token manager بيعمل refresh مرة واحدة، عداد). و [[Sendable]] على كل الـ models اللي بتعدّي بين الشبكة والـ UI.`,
            mistakes: R`تحط [[@MainActor]] على service الشبكة كله فتعمل parsing تقيل على الـ main thread. وتعمل كل حاجة actor «احتياطي» فكل سطر يبقى [[await]]. وتستخدم [[@unchecked Sendable]] أو [[nonisolated(unsafe)]] عشان تسكّت الـ compiler من غير ما تفهم المشكلة. وتنسى الـ reentrancy فتعمل نفس الطلب مرتين.`
          },
          lines: [
            R`[[actor]]: task واحد بس جواه في نفس الوقت.`,
            R`[[private(set)]]: التعديل من جوه بس.`,
            "method عادية من غير locks.",
            "التعديل آمن.",
            "قفلة.",
            "قفلة.",
            R`[[Sendable]]: آمن يتنقل بين tasks.`,
            "let.",
            "let.",
            "قفلة.",
            R`[[@MainActor]]: الـ class ده كله على الـ main thread.`,
            "view model.",
            "state بتتعرض في الـ UI.",
            "async method.",
            "تعديل على الـ main thread.",
            R`[[await]]: قراية من actor تاني، وبنستنى من غير ما نقفل الـ main thread.`,
            "رجعنا على الـ main thread ونعدّل.",
            "قفلة.",
            "قفلة.",
            "actor واحد.",
            "1000 تحويل.",
            "task group.",
            "لكل تحويل.",
            "task موازي.",
            R`[[await]] على الـ actor: بيقف في الطابور.`,
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "1000 بالظبط.",
            "الـ view model.",
            "التحديث.",
            "الحالة الأخيرة."
          ],
          sol: R`ناتج المثال: [[1000]] ثم [[الرصيد: 1000]].

لما تحوّله لـ class من غير حماية وتشغّل بـ Swift 6 mode، الـ compiler بيرفض: الـ tasks كلها عايزة توصل لنفس الـ object وهو مش Sendable. في [[main.swift]] الرسالة بالظبط:
[[non-sendable type 'BankAccount' in implicitly asynchronous access to main actor-isolated let 'account' cannot cross actor boundary]]
(الـ [[account]] هنا top-level، فهو على الـ MainActor). ولو نفس الكود جوه دالة والـ object متغير محلي، الرسالة بتبقى [[passing closure as a 'sending' parameter risks causing data races...]]. نفس المشكلة بصياغتين.

ولو قريت [[account.balance]] والـ actor رجع actor من غير [[await]]: [[actor-isolated property 'balance' can not be referenced from a nonisolated context]] (أو [[expression is 'async' but is not marked with 'await']] حسب المكان).`
        },
        {
          cmd: "Swift 6 strict concurrency",
          title: "أشهر أخطاء Swift 6 strict concurrency وحلها: static var، و class مش Sendable، والـ UI من برة الـ MainActor",
          desc: R`Swift 6 language mode بيحوّل تحذيرات الـ concurrency لأخطاء. ولو بتنقل مشروع قديم هتلاقي عشرات. الخبر الحلو: أغلبهم من 4 أنواع وحلهم معروف.

1. [[static property 'x' is not concurrency-safe because it is nonisolated global shared mutable state]]: عندك [[static var]] أو global [[var]] ممكن أي thread يعدّله. الحل بالترتيب: خليه [[let]] لو مش بيتغير، أو [[@MainActor static var]] لو بيتغير من الـ UI، أو حطه جوه actor. و [[nonisolated(unsafe)]] آخر حل لو متأكد إن مفيش race.

2. [[stored property 'x' of 'Sendable'-conforming class is mutable]] أو [[non-sendable type]]: نوع بيتنقل بين tasks ومش آمن. الحل: حوّله لـ struct، أو خلي properties الـ class كلها [[let]] و [[final]]، أو حوّله لـ actor.

3. [[passing closure as a 'sending' parameter risks causing data races]]: closure بيمسك object مش Sendable وبيتبعت لـ task تاني. الحل: ابعت قيم Sendable بدل الـ object، أو خلي الـ object actor.

4. [[main actor-isolated property 'x' can not be mutated from a nonisolated context]]: بتعدّل UI state من كود مش على الـ main actor. الحل: [[@MainActor]] على الـ class أو الدالة، أو [[await MainActor.run { }]].

الخطة الواقعية لنقل مشروع: من Build Settings ابدأ بـ [[Strict Concurrency Checking = Complete]] وانت لسه على Swift 5 mode (تحذيرات بس)، صلّحهم module module، وبعدين حوّل الـ [[Swift Language Version]] لـ 6. وفي Package.swift: [[swiftLanguageModes: [.v6]]] (أو [[.v5]] لو لسه مش جاهز).

والمثال تحت كله بيترجم في Swift 6 mode من غير أخطاء (اتجرب بـ [[swift -swift-version 6]])، وكل جزء فيه هو «الحل» لنوع من الأخطاء دي.`,
          example: R`struct Config {
  // كانت static var: خطأ 1. الحل let
  static let baseURL = "https://api.example.com"
  // لو لازم تتغير: اربطها بالـ MainActor
  @MainActor static var showDebugMenu = false
}
// struct كل properties بتاعته Sendable: آمن
struct Order: Sendable {
  let id: Int
  let total: Double
}
// class Sendable: لازم final وكل حاجة let
final class AppInfo: Sendable {
  let version: String
  init(version: String) { self.version = version }
}
// state متغيرة مشتركة بين tasks: actor
actor BigOrdersCounter {
  private(set) var count = 0
  func record() { count += 1 }
}
func countBigOrders(_ orders: [Order]) async -> Int {
  let counter = BigOrdersCounter()
  await withTaskGroup(of: Void.self) { group in
    for order in orders where order.total > 100 {
      group.addTask { await counter.record() }
    }
  }
  return await counter.count
}
let orders = [Order(id: 1, total: 50), Order(id: 2, total: 150), Order(id: 3, total: 300)]
print(await countBigOrders(orders))
Config.showDebugMenu = true
print(Config.baseURL, Config.showDebugMenu, AppInfo(version: "1.2").version)`,
          try: R`اعمل الحاجات دي واحدة واحدة وشغّل بـ [[swift -swift-version 6 main.swift]]: غيّر [[static let baseURL]] لـ [[static var]]. غيّر [[let version]] لـ [[var version]]. غيّر [[actor BigOrdersCounter]] لـ [[final class]]. اكتب رسالة كل خطأ وحلّه.`,
          flag: "script",
          deep: {
            why: R`الشركات بتنقل مشاريعها لـ Swift 6 دلوقتي، والمطوّر اللي يفهم الأخطاء دي ويحلها صح (مش بـ [[@unchecked Sendable]] في كل حتة) مطلوب جدًا. وكمان الأخطاء دي بتطلع فعلًا bugs حقيقية كانت مستخبية.`,
            how: R`الـ compiler بيعمل تحليل «isolation»: كل متغير ودالة إما مربوطة بـ actor معين (MainActor أو actor بتاعك) أو nonisolated. وكل ما قيمة بتعدّي من isolation لـ isolation تاني، لازم تبقى Sendable أو يثبت إنها «disconnected» (محدش تاني ماسكها، وده region-based isolation من Swift 6).

المتغيرات اللي في الـ top-level بتاع [[main.swift]] (زي [[orders]]) بتبقى [[@MainActor]] لوحدها، وعشان كده قدرنا نعدّل [[Config.showDebugMenu]] من هناك من غير [[await]].

[[@MainActor static var]]: القراية والكتابة لازم من الـ MainActor، ومن برة لازم [[await]].`,
            when: R`كل مشروع جديد ابدأه Swift 6 (أو بالإعدادات الجديدة بتاعة Xcode 26 اللي بتخلي الافتراضي MainActor). والمشاريع القديمة نقلها تدريجي بـ Strict Concurrency Checking الأول.`,
            mistakes: R`[[@unchecked Sendable]] على كل class عشان الخطأ يختفي: كده رجعت الـ races بس مستخبية. و [[nonisolated(unsafe)]] على كل [[static var]]. و [[@MainActor]] على كل حاجة في التطبيق بما فيها الـ parsing التقيل. وتحوّل الـ language mode لـ 6 مرة واحدة في مشروع كبير فيطلعلك 400 خطأ.`
          },
          lines: [
            "struct للإعدادات.",
            R`[[static let]]: ثابت، فآمن من أي thread.`,
            R`[[@MainActor static var]]: متغير، بس مربوط بالـ main thread.`,
            "قفلة.",
            R`struct [[Sendable]].`,
            "let.",
            "let.",
            "قفلة.",
            R`class [[Sendable]]: [[final]] وكل حاجة [[let]].`,
            "let.",
            "init.",
            "قفلة.",
            R`[[actor]] للـ state المتغيرة.`,
            "عداد.",
            "التعديل جوه الـ actor.",
            "قفلة.",
            "دالة async.",
            "actor جديد.",
            "task group.",
            R`[[where]] الطلبات الكبيرة بس.`,
            R`كل task بيكلم الـ actor بـ [[await]]. [[order]] Sendable فآمن يتمسك.`,
            "قفلة.",
            "قفلة.",
            "النتيجة.",
            "قفلة.",
            "3 طلبات.",
            "بيطبع 2.",
            R`top-level على الـ MainActor، فمسموح نعدّل.`,
            "بيطبع القيم."
          ],
          sol: R`ناتج المثال: [[2]] ثم [[https://api.example.com true 1.2]].

الأخطاء (بـ [[swift -swift-version 6 main.swift]]، كل تغيير لوحده):
• [[static var baseURL]] ← [[static property 'baseURL' is not concurrency-safe because it is nonisolated global shared mutable state]]. الحل [[let]] أو [[@MainActor]].
• [[var version]] في class Sendable ← [[stored property 'version' of 'Sendable'-conforming class 'AppInfo' is mutable]]. الحل [[let]]، أو struct، أو actor.
• [[final class BigOrdersCounter]] بدل actor ← الـ [[await]] على [[record()]] بقى ملوش لازمة (تحذير)، والـ tasks بتمسك object مش Sendable فبيطلع [[passing closure as a 'sending' parameter risks causing data races...]]. الحل يرجع actor.`
        },
        {
          cmd: "Swift Package Manager",
          title: "تضيف مكتبة لمشروعك بـ Swift Package Manager، وتقسّم كودك لـ packages بـ Package.swift",
          desc: R`Swift Package Manager (SPM) هو مدير المكتبات الرسمي لـ Swift، ومدمج في Xcode وفي الـ toolchain على Linux و Windows. (زمان كان فيه CocoaPods و Carthage. CocoaPods لسه موجود في مشاريع قديمة كتير، بس فريقه أعلن إن الـ trunk بتاعه هيتقفل للنشر الجديد ويبقى read-only في أواخر 2026، فالجديد كله SPM).

إضافة مكتبة لتطبيق في Xcode: File ← Add Package Dependencies ← حط لينك الـ GitHub ← اختار الـ version rule (Up to Next Major غالبًا) ← اختار الـ target. Xcode بيكتب الـ versions المحددة في [[Package.resolved]]، وده لازم يترفع على git عشان الفريق كله ياخد نفس النسخ.

عمل package بتاعك: [[Package.swift]] بيوصف:
• [[name]] و [[platforms]] (أقل نسخ OS).
• [[products]]: اللي الناس تقدر تستخدمه ([[.library]] أو [[.executable]]).
• [[dependencies]]: مكتبات تانية بلينك ونسخة.
• [[targets]]: كل target فولدر في [[Sources/]]، و [[.testTarget]] فولدر في [[Tests/]].

أول سطر [[// swift-tools-version: 6.0]] مش تعليق عادي: إجباري، وبيحدد نسخة SPM اللي بتقرا الملف (ومعاها الـ language mode الافتراضي).

ليه تقسّم تطبيقك لـ packages محلية (modularization)؟ build أسرع لأن كل module بيتبني لوحده، وحدود واضحة ([[public]] بس اللي يطلع برة)، واختبارات أسرع من غير simulator. التطبيقات الكبيرة في الشركات بتبقى عبارة عن app target صغير + 10 أو 20 package محلي.

الأوامر: [[swift build]] و [[swift test]] و [[swift package update]] (يحدّث النسخ في حدود القواعد) و [[swift package resolve]].`,
          example: R`// swift-tools-version: 6.0
import PackageDescription

let package = Package(
  name: "PriceKit",
  platforms: [.iOS(.v17), .macOS(.v14)],
  products: [
    .library(name: "PriceKit", targets: ["PriceKit"]),
  ],
  dependencies: [
    .package(url: "https://github.com/apple/swift-algorithms", from: "1.2.0"),
  ],
  targets: [
    .target(
      name: "PriceKit",
      dependencies: [.product(name: "Algorithms", package: "swift-algorithms")]
    ),
    .testTarget(name: "PriceKitTests", dependencies: ["PriceKit"]),
  ]
)`,
          try: R`اعمل [[swift package init --type library --name PriceKit]]، وحط الـ Package.swift ده، واكتب في [[Sources/PriceKit/Price.swift]] دالة [[public func applyDiscount(_ price: Double, percent: Double) -> Double]]، وكمان دالة بتستخدم [[chunks(ofCount:)]] من swift-algorithms. وشغّل [[swift build]]. (ده بيشتغل على Linux كمان).`,
          flag: "script",
          deep: {
            why: R`مفيش تطبيق حقيقي من غير مكتبات: Firebase، و Kingfisher للصور، و Alamofire عند البعض، و Lottie للـ animations. ولازم تعرف تضيفها وتثبّت نسخها. والـ modularization بقت سؤال انترفيو للـ seniors: «إزاي تقسم تطبيق كبير؟».`,
            how: R`SPM بيحل شجرة الـ dependencies: بيجيب كل مكتبة بالـ git tag المناسب للقاعدة ([[from: "1.2.0"]] يعني أي 1.x.x من 1.2.0 لفوق، semantic versioning)، وبيكتب النسخ النهائية في [[Package.resolved]]. وبعدين بيبني كل target كـ module منفصل.

[[.product(name:package:)]] بيقول «من الـ package اسمه swift-algorithms، استخدم الـ product اسمه Algorithms». والـ test target بيعتمد على الـ target بتاعك باسمه. و [[platforms]] بيمنع استخدام الـ package على نسخ أقدم.

الـ package ده اتبنى واتختبر فعلًا على Linux بـ [[swift build]] و [[swift test]] (Swift 6.0).`,
            when: R`أي مكتبة خارجية: SPM أول اختيار. وابدأ تقسيم تطبيقك لـ packages محلية لما المشروع يكبر أو لما فيه أكتر من مطوّر (Networking و DesignSystem و Features).`,
            mistakes: R`تحط [[branch: "main"]] بدل version فكل build ممكن ياخد كود مختلف. ومترفعش [[Package.resolved]] على git. وتضيف مكتبة ضخمة لحاجة بسيطة (Alamofire لطلب GET واحد بدل URLSession). وتنسى [[public]] على الحاجات اللي التطبيق محتاجها من الـ package فيطلع [[cannot find 'x' in scope]].`
          },
          lines: [
            R`[[PackageDescription]]: الـ API بتاع وصف الـ package.`,
            R`[[Package(...)]] الوصف كله.`,
            "اسم الـ package.",
            "أقل نسخ iOS و macOS.",
            "اللي بيطلع للناس.",
            R`[[.library]] اسمها PriceKit من الـ target ده.`,
            "قفلة.",
            "المكتبات الخارجية.",
            R`لينك ونسخة: [[from]] = أي 1.x من 1.2.0.`,
            "قفلة.",
            "الـ targets.",
            R`[[.target]]: كود في [[Sources/PriceKit]].`,
            "اسمه.",
            R`بيعتمد على product [[Algorithms]].`,
            "قفلة.",
            R`[[.testTarget]]: اختبارات في [[Tests/PriceKitTests]].`,
            "قفلة الـ targets.",
            "قفلة الـ Package."
          ],
          sol: R`[[swift build]] أول مرة بيعمل [[Fetching https://github.com/apple/swift-algorithms]] و swift-numerics (dependency بتاعتها)، وبعدين بيبني و [[Build complete!]]. وهتلاقي [[Package.resolved]] اتعمل.

الكود اللي اتجرب:`,
          solCode: R`// Sources/PriceKit/Price.swift
import Algorithms

public enum PriceError: Error, Equatable {
  case invalidPercent(Double)
}

public func applyDiscount(_ price: Double, percent: Double) -> Double {
  price - price * percent / 100
}

public func checkedDiscount(_ price: Double, percent: Double) throws -> Double {
  guard (0...100).contains(percent) else {
    throw PriceError.invalidPercent(percent)
  }
  return applyDiscount(price, percent: percent)
}

// chunks(ofCount:) من swift-algorithms
public func priceBuckets(_ prices: [Double]) -> [[Double]] {
  prices.sorted().chunks(ofCount: 2).map(Array.init)
}`
        }
      ]
    },
    {
      t: "الاختبارات والـ debugging",
      l: 3,
      n: "Swift Testing بـ @Test و #expect، و XCTest القديم، والـ breakpoints و LLDB، و Instruments و Memory Graph",
      items: [
        {
          cmd: "Swift Testing",
          title: "تكتب unit tests بـ Swift Testing: @Test و #expect و #require والـ arguments، وإيه الفرق عن XCTest",
          desc: R`Swift Testing هو framework الاختبارات الجديد من Apple (من Xcode 16 و Swift 6، وشغال على Linux و Windows كمان). بيحل محل XCTest في الـ unit tests الجديدة، والاتنين ممكن يعيشوا في نفس المشروع.

الأساسيات:
• [[import Testing]] و [[@testable import MyApp]] (الـ [[@testable]] بيفتحلك الحاجات اللي [[internal]] في التطبيق).
• [[@Test func something() { }]]: اختبار. ممكن يبقى [[async]] و [[throws]]، وممكن جوه struct (الـ struct بيبقى suite، وبيتعمل من جديد لكل test، فمفيش state بتتسرب بين الاختبارات).
• [[@Test("وصف بالعربي")]]: اسم يظهر في التقرير.
• [[#expect(a == b)]]: لو غلط بيسجل فشل ويكمّل. والرسالة بتوريك القيم الحقيقية: [[(applyDiscount(...) → 150.0) == 160]].
• [[try #require(x)]]: لو فشل بيوقف الاختبار ده. ومع optional بيفكه: [[let first = try #require(items.first)]].
• [[#expect(throws: SomeError.x) { try f() }]]: بيتأكد إن الكود رمى الخطأ ده.
• [[@Test(arguments: [...])]]: نفس الاختبار على قيم كتير، وكل قيمة بتظهر لوحدها في التقرير.
• [[@Suite]] و tags و [[.disabled("سبب")]] للتنظيم.

XCTest (القديم، وهتلاقيه في كل مشروع موجود): [[final class PriceTests: XCTestCase]]، وكل method اسمها لازم يبدأ بـ [[test]]، و [[XCTAssertEqual(a, b)]] و [[XCTAssertTrue]] و [[XCTAssertThrowsError]] و [[XCTUnwrap]]. ولسه هو الوحيد للـ UI tests ([[XCUIApplication]]) واختبارات الأداء.

التشغيل: في Xcode [[Cmd+U]]، أو الماسة جنب الاختبار. ومن الترمنال [[swift test]] للـ packages، أو [[xcodebuild test -scheme MyApp -destination 'platform=iOS Simulator,name=iPhone 16']] للتطبيقات (حط اسم أي simulator موجود عندك).

إيه اللي تختبره؟ الـ logic: الحسابات، والـ validation، والـ view models (بـ fake services)، وفك الـ JSON. مش لازم تختبر إن [[Text]] بيعرض نص.`,
          example: R`import Testing
@testable import PriceKit

struct PriceTests {
  @Test func discountReducesPrice() {
    #expect(applyDiscount(200, percent: 25) == 150)
  }
  @Test("خصم أكبر من 100% بيرمي error")
  func invalidPercentThrows() {
    #expect(throws: PriceError.invalidPercent(150)) {
      try checkedDiscount(100, percent: 150)
    }
  }
  @Test(arguments: [(100.0, 10.0, 90.0), (50, 50, 25), (80, 0, 80)])
  func manyDiscounts(price: Double, percent: Double, expected: Double) {
    #expect(applyDiscount(price, percent: percent) == expected)
  }
  @Test func bucketsAreSorted() throws {
    let buckets = priceBuckets([30, 10, 20])
    let first = try #require(buckets.first)
    #expect(first == [10, 20])
  }
}`,
          try: R`في الـ package بتاع درس SPM حط الملف ده في [[Tests/PriceKitTests/PriceTests.swift]] وشغّل [[swift test]]. وبعدين غيّر [[== 150]] لـ [[== 160]] واقرا رسالة الفشل. وأخيرًا اكتب test للـ [[PostsViewModel]] من درس MVVM بـ fake service بيفشل، وتأكد إن الحالة بقت [[.failed]].`,
          flag: "script",
          deep: {
            why: R`الاختبارات هي اللي بتخليك تعدّل في كود عمره سنة من غير ما تخاف. وفي الشركات، الـ pull request من غير tests لـ logic جديد غالبًا مش هيتقبل. وفي الانترفيو، «إزاي بتختبر view model بيكلم API؟» سؤال شبه ثابت، والإجابة: protocol + fake + unit test.`,
            how: R`[[@Test]] و [[#expect]] macros: الـ [[#expect]] بيفك الـ expression وقت الـ compile، فلما يفشل يقدر يطبع قيمة كل جزء (مش بس «false»). والاختبارات بتشتغل بالتوازي افتراضيًا (على عكس XCTest)، وده سبب إن الـ suite struct بيتعمل لكل test، وسبب إن الـ shared state بين الاختبارات خطر.

[[@Test(arguments:)]] مع array من tuples: كل tuple بيتفك على الـ parameters بالترتيب. و [[(50, 50, 25)]] بتتقري Double لأن أول tuple حدد النوع.

الـ package ده ([[PriceKit]] بالاختبارات دي واختبارات الـ view model) اتجرب بـ [[swift test]] على Linux بـ Swift 6.0: 6 اختبارات عدّوا.`,
            when: R`unit tests لأي logic جديد، وخصوصًا الـ bugs: قبل ما تصلّح bug اكتب test بيفشل بسببه، وبعدين صلّح. وUI tests (XCTest) قليلة ولأهم سيناريو بس (login، والشراء)، لأنها بطيئة وبتتكسر بسهولة.`,
            mistakes: R`تختبر تفاصيل التنفيذ بدل السلوك (إن method اتنادت 3 مرات). واختبارات بتكلم API حقيقي فتفشل لما النت يقع. واختبارات معتمدة على ترتيب التشغيل أو على state مشتركة (Swift Testing بيشغّل بالتوازي فهتظهر عشوائيًا). وتستخدم [[#expect]] على optional ثم تكمل عليه بدل [[#require]].`
          },
          lines: [
            R`[[Testing]]: الـ framework الجديد.`,
            R`[[@testable]]: يفتح الـ internal في PriceKit للاختبار.`,
            "struct = suite، وبيتعمل من جديد لكل test.",
            R`[[@Test]] على function: ده اختبار.`,
            R`[[#expect]]: لو غلط بيسجل فشل بالقيم الحقيقية.`,
            "قفلة.",
            R`[[@Test("...")]] باسم بيظهر في التقرير.`,
            "الـ function.",
            R`[[#expect(throws:)]]: لازم يرمي الخطأ ده بالظبط.`,
            "الكود اللي المفروض يرمي.",
            "قفلة.",
            "قفلة.",
            R`[[arguments:]] 3 حالات، كل tuple بيتفك على الـ parameters.`,
            "3 parameters بالترتيب.",
            "نفس الـ expect لكل حالة.",
            "قفلة.",
            R`[[throws]] عشان [[#require]] ممكن يرمي.`,
            "دالة من الـ package.",
            R`[[#require]]: يفك الـ optional، ولو nil يوقف الاختبار.`,
            "مقارنة arrays.",
            "قفلة.",
            "قفلة الـ suite."
          ],
          sol: R`[[swift test]] بيطبع حاجة زي:
[[✔ Test discountReducesPrice() passed after 0.001 seconds.]]
[[◇ Passing 3 arguments price → 80.0, percent → 0.0, expected → 80.0 to manyDiscounts(price:percent:expected:)]]
[[✔ Test run with 4 tests passed after 0.004 seconds.]]

ولما تغيرها لـ 160:
[[✘ Test discountReducesPrice() recorded an issue at PriceTests.swift:6:5: Expectation failed: (applyDiscount(200, percent: 25) → 150.0) == (160 → 160.0)]]
لاحظ إنه بيوريك القيمة الحقيقية (150) من غير ما تضيف print.

اختبار الـ view model (اتجرب وعدّى):`,
          solCode: R`@MainActor
struct PostsViewModelTests {
  @Test func showsErrorWhenOffline() async {
    let viewModel = PostsViewModel(service: FakePostsService(shouldFail: true))
    await viewModel.load()
    guard case .failed(let message) = viewModel.phase else {
      Issue.record("كان المفروض الحالة تبقى failed")
      return
    }
    #expect(message.contains("النت"))
  }
}`
        },
        {
          cmd: "الـ debugging و Instruments",
          title: "تلاقي الـ bug بـ breakpoints و LLDB (po و p و bt)، وتلاقي البطء والـ leaks بـ Instruments و Memory Graph",
          desc: R`[[print]] كويس في الأول، بس بعد شوية هتحتاج أدوات Xcode:

1. Breakpoints: دوس على رقم السطر في Xcode فيظهر سهم أزرق. لما التطبيق يوصل للسطر ده يقف، وتقدر تشوف كل المتغيرات في الـ Variables View تحت. وتمشي سطر سطر: Step Over ([[F6]])، و Step Into ([[F7]]) جوه الدالة، و Continue ([[Ctrl+Cmd+Y]]).
   • breakpoint بشرط: كليك يمين ← Edit Breakpoint ← Condition ([[items.count == 0]]): يقف بس لما الشرط يتحقق.
   • breakpoint بيطبع من غير ما يقف: Action ← Log Message، وعلّم «Automatically continue». ده [[print]] من غير ما تعدّل الكود.
   • Exception و Swift Error breakpoints (من تاب الـ Breakpoints): يوقف لحظة ما error يترمي، حتى لو اتمسك.

2. LLDB console (تحت لما البرنامج واقف):
   • [[po x]]: اطبع الـ object بوصفه. • [[p x]]: اطبع القيمة (في Xcode الحديث [[p]] بقى ذكي وبيختار). • [[v]]: كل المتغيرات المحلية بسرعة. • [[bt]]: الـ backtrace (مين نادى مين لحد هنا). • [[expr x = 5]]: غيّر قيمة وانت واقف وكمّل. • [[c]]: كمّل.

3. لما التطبيق يقع: Xcode بيقف على السطر وبيكتب السبب (زي [[Unexpectedly found nil]] أو [[Index out of range]]). اقرا الـ backtrace في الـ Debug Navigator من فوق لتحت لحد أول سطر من كودك.

4. Debug View Hierarchy (زرار الطبقات تحت): بيوريك الشاشة 3D وكل View فين، مفيد لما حاجة مش ظاهرة.

5. Debug Memory Graph (زرار التلات دواير): بيوريك كل الـ objects اللي في الذاكرة، وعلامة بنفسجي على الـ leaks. لو قفلت شاشة ولسه الـ view model بتاعها موجود = leak (غالبًا [[[weak self]]] ناقصة).

6. Instruments (Product ← Profile أو [[Cmd+I]]): أداة قياس على build الـ Release:
   • Time Profiler: الكود بيقضي وقته فين (لما التطبيق بطيء أو بيتقطع).
   • Allocations و Leaks: الذاكرة بتزيد ليه.
   • SwiftUI instrument: أنهي Views بيتعاد حساب body بتاعها كتير.
   • Network: الطلبات ومدتها.

وفي الـ SwiftUI: [[let _ = Self._printChanges()]] جوه [[body]] (للـ debugging بس) بيطبع إيه اللي خلّى الـ View يتحسب تاني.`,
          example: R`# اكتبهم في الـ console تحت لما البرنامج يقف على breakpoint
po viewModel.phase
p posts.count
v
bt
expr viewModel.searchText = "swift"
c
# breakpoint بشرط من الـ console بدل الماوس
breakpoint set --file PostsViewModel.swift --line 30 --condition 'posts.isEmpty'
# من الترمنال: قوالب Instruments المتاحة على جهازك
xcrun xctrace list templates`,
          try: R`حط breakpoint في [[load()]] بتاعة الـ view model، وشغّل، ولما يقف اكتب [[po phase]] و [[bt]]. وبعدين اعمل leak مقصود (شيل [[[weak self]]] من closure متخزن في class)، وافتح وقفل الشاشة كذا مرة، وافتح Debug Memory Graph ودوّر على الـ objects المتكررة.`,
          flag: "console",
          deep: {
            why: R`الفرق بين junior و mid غالبًا مش في كتابة الكود، في سرعة إيجاد المشكلة. اللي بيعرف breakpoint بشرط و [[bt]] و Memory Graph بيحل في 10 دقايق اللي غيره بيقعد فيه يوم بـ [[print]].`,
            how: R`LLDB هو الـ debugger اللي تحت Xcode. لما البرنامج يقف على breakpoint، LLDB يقدر يقرا ذاكرة البرنامج ويشغّل كود Swift جواه ([[expr]]). [[po]] بينادي [[description]] (أو [[debugDescription]]) على الـ object، و [[v]] (اختصار [[frame variable]]) بيقرا الذاكرة مباشرة من غير ما يشغّل كود، فأسرع وأأمن.

Instruments بيشتغل بالـ sampling: كل ميلي ثانية بياخد صورة من الـ stack بتاع كل thread، وبعدين بيجمّع: الدالة اللي ظهرت في أغلب الصور هي اللي واكلة الوقت. عشان كده لازم Release build على جهاز حقيقي لو أمكن: الـ Debug build والـ Simulator أرقامهم مش حقيقية.

[[xcrun xctrace]] الـ command line بتاع Instruments، مفيد في CI.`,
            when: R`breakpoints لأي bug منطقي (القيمة غلط فين؟). Memory Graph بعد أي feature فيها closures أو delegates. Time Profiler لما حد يقولك «بطيء» قبل ما تخمّن. و SwiftUI instrument لما الـ scrolling بيتقطع.`,
            mistakes: R`تقيس الأداء على Debug build. وتسيب [[print]] كتير في كود الإنتاج (استخدم [[Logger]] من [[os]] بدلها). وتتجاهل الـ warnings البنفسجي (Runtime Issues) في Xcode: غالبًا تحديث UI من thread غلط أو مشكلة SwiftUI. وتحسن أداء حتة من غير ما تقيس فتطلع مش هي المشكلة.`
          },
          lines: [
            R`[[po]]: اطبع وصف الـ object.`,
            R`[[p]]: اطبع القيمة.`,
            R`[[v]]: كل المتغيرات المحلية.`,
            R`[[bt]]: backtrace، مين نادى مين.`,
            R`[[expr]]: غيّر قيمة وانت واقف.`,
            R`[[c]]: كمّل التشغيل.`,
            "breakpoint بيقف بس لو القايمة فاضية.",
            R`في الترمنال: [[xctrace]] بيعرض قوالب Instruments زي Time Profiler و Leaks.`
          ],
          sol: R`لما يقف في [[load()]]: [[po phase]] بيطبع حاجة زي [[PostsViewModel.Phase.idle]] (أو [[.loading]] حسب مكان الـ breakpoint)، و [[bt]] بيوريك السلسلة من [[load()]] لفوق لحد كود SwiftUI اللي نادى [[.task]].

وفي الـ leak: بعد ما تفتح وتقفل الشاشة 3 مرات، Memory Graph هيوريك 3 نسخ من الـ class بتاعك لسه عايشة وعلامة تحذير بنفسجي، ولو دوست على واحدة هتشوف السهم من الـ closure للـ object والعكس: ده الـ retain cycle. رجّع [[[weak self]]] وكرر: لازم ميفضلش غير اللي مفتوح.`
        }
      ]
    },
    {
      t: "النشر على App Store والشغل",
      l: 3,
      n: "التوقيع والـ provisioning، و archive و TestFlight والرفع، ومراجعة Apple والـ privacy manifest، وسوق iOS والانترفيو، ومشروع التخرج",
      items: [
        {
          cmd: "التوقيع و provisioning",
          title: "Apple Developer Program والتوقيع: certificate و App ID و provisioning profile، و Automatic Signing بيعمل إيه",
          desc: R`iOS مش بيشغّل أي تطبيق غير موقّع من Apple. والتوقيع ده سبب أغلب أخطاء «مش راضي يتبني على الموبايل» أو «مش راضي يترفع». المكونات:

1. الحساب:
   • Apple ID مجاني: تقدر تشغّل على موبايلك الشخصي، بس التطبيق بيتلغي بعد 7 أيام ولازم تثبته تاني، وفيه capabilities مش متاحة (زي push notifications). كفاية للتعلم.
   • Apple Developer Program: اشتراك سنوي (حوالي 99 دولار في أغلب البلاد، والسعر المحلي بيختلف). لازم عشان TestFlight والمتجر. ينفع كفرد (اسمك الشخصي بيظهر كبائع) أو كشركة (محتاج رقم D-U-N-S للشركة).

2. Certificate: شهادة بتثبت إنك انت. فيه Development (للتشغيل على أجهزة) و Distribution (للمتجر). المفتاح الخاص بتاعها بيتخزن في الـ Keychain على الماك اللي عملها.

3. App ID: الـ Bundle ID متسجل عند Apple، ومعاه الـ capabilities (Push، و Sign in with Apple، و iCloud، و App Groups).

4. Provisioning Profile: ملف بيربط: الشهادة + الـ App ID + (للـ development) الأجهزة المسموحة. بيتحط جوه التطبيق.

5. Entitlements: الصلاحيات الخاصة اللي التطبيق طالبها (ملف [[.entitlements]])، ولازم تبقى موجودة في الـ profile.

Automatic Signing (Signing & Capabilities ← Automatically manage signing ← اختار Team): Xcode بيعمل كل ده لوحده ويجدده. استخدمه في الأول ودايمًا في المشاريع الصغيرة. الـ Manual signing بيظهر في الشركات الكبيرة والـ CI، وهناك أدوات زي [[fastlane match]] بتخزن الشهادات متشفرة في repo عشان الفريق كله يستخدم نفس الشهادة.

الأوامر تحت بتساعدك تشوف «إيه اللي موجود فعلًا» لما حاجة تبوظ.`,
          example: R`# الشهادات اللي على الماك وتقدر توقّع بيها
security find-identity -v -p codesigning
# الـ profiles اللي Xcode نزّلها (Xcode 16 وما بعده)
ls ~/Library/Developer/Xcode/UserData/Provisioning\ Profiles
# اقرا profile: الـ App ID والـ entitlements والأجهزة وتاريخ الانتهاء
security cms -D -i profile.mobileprovision
# اتأكد إن التطبيق المتبني موقّع، وبإيه
codesign -dv --verbose=4 build/Tasks.app
# الـ entitlements اللي جوه التطبيق فعلًا
codesign -d --entitlements - build/Tasks.app`,
          try: R`في مشروعك: Signing & Capabilities ← فعّل Automatically manage signing واختار الـ Team بتاعك (حتى لو Personal Team)، وشغّل على موبايلك. لو أول مرة، الموبايل هيطلب تفعّل Developer Mode وتثق في المطوّر من Settings ← General ← VPN & Device Management. بعدها شغّل [[security find-identity -v -p codesigning]] وشوف الشهادة اللي اتعملت.`,
          deep: {
            why: R`التوقيع هو اللي بيضمن إن التطبيق جاي من المطوّر ده ومحدش عدّله، وإن الصلاحيات الحساسة (push، و iCloud، و Apple Pay) Apple وافقت عليها. وبالنسبة لك: لما الـ build يفشل بـ «No profiles for 'com.x' were found» أو «Provisioning profile doesn't include the entitlement»، لازم تعرف تقرا المشكلة دي بدل ما تجرب عشوائي.`,
            how: R`وقت الـ build، Xcode بيحط الـ profile جوه الـ app bundle ([[embedded.mobileprovision]])، وبيوقّع كل ملف تنفيذي بالمفتاح الخاص بتاع الشهادة. الجهاز عند التثبيت بيتأكد: التوقيع سليم، والشهادة في الـ profile، والـ Bundle ID مطابق، والجهاز ده في القايمة (للـ development)، والـ entitlements كلها مسموحة في الـ profile.

[[security cms -D -i]] بيفك الـ profile (هو plist موقّع) ويطبعه، فتشوف [[ExpirationDate]] و [[Entitlements]] و [[ProvisionedDevices]]. و [[codesign -dv]] بيوريك الـ Authority (مين وقّع) والـ TeamIdentifier.

في Xcode قبل 16 الـ profiles كانت في [[~/Library/MobileDevice/Provisioning Profiles]].`,
            when: R`أول مرة تشغّل على جهاز حقيقي، ولما تضيف capability جديدة (push مثلًا)، ولما تجهز CI بيبني ويرفع. والمشاكل بتحصل غالبًا لما الشهادة تخلص (سنة) أو لما حد في الفريق يعمل شهادة جديدة ويلغي القديمة.`,
            mistakes: R`تمسح شهادة Distribution من موقع Apple عشان «تنضف» فكل الـ profiles المربوطة بيها تبوظ. وتعمل شهادة على ماك ومتعملش export للمفتاح الخاص (ملف .p12) فلما الماك يتغير تبقى مش قادر توقّع. وتغيّر الـ Bundle ID بعد ما عملت الـ App ID و App Store Connect. وتفعّل capability في Xcode ومش موجودة في حسابك (زي push بحساب مجاني).`
          },
          lines: [
            R`[[security find-identity]]: الشهادات الصالحة للتوقيع. هتلاقي «Apple Development: اسمك (ID)».`,
            R`[[ls]] على فولدر الـ profiles. [[\ ]] عشان المسافة في الاسم.`,
            R`[[security cms -D]]: يفك الـ profile ويطبعه plist مقروء.`,
            R`[[codesign -dv]]: مين وقّع التطبيق، و Team ID، ونوع التوقيع.`,
            R`[[--entitlements -]]: يطبع الصلاحيات اللي جوه التطبيق.`
          ],
          sol: R`[[security find-identity -v -p codesigning]] هيطبع حاجة زي:
[[1) 3F2A...9C "Apple Development: Sara Ahmed (AB12CD34EF)"]]
[[1 valid identities found]]

ولو التشغيل على الموبايل فشل برسالة «Untrusted Developer»، روح Settings ← General ← VPN & Device Management ← اختار حسابك ← Trust. ولو مظهرلكش Developer Mode: Settings ← Privacy & Security ← Developer Mode (بيظهر بعد أول محاولة تشغيل من Xcode) وفعّله والموبايل هيعمل restart.`
        },
        {
          cmd: "النشر على متجر App Store و TestFlight",
          title: "ترفع تطبيقك: version و build number، و Archive، و TestFlight للتجربة، وبعدين Submit for Review",
          desc: R`الخطوات من أول مرة:
1. App Store Connect ([[appstoreconnect.apple.com]]): My Apps ← New App. اختار الـ Bundle ID، والاسم (لازم يبقى مش محجوز)، و SKU (أي كود داخلي).
2. في Xcode: رقمين مهمين في General:
   • Version (مثلًا [[1.0.0]]): اللي المستخدم بيشوفه.
   • Build (مثلًا [[1]] ثم [[2]] ...): لازم يزيد مع كل رفع لنفس الـ version. لو رفعت build رقمه موجود هيترفض.
3. اختار [[Any iOS Device (arm64)]] بدل الـ Simulator، و Product ← Archive. لما يخلص بيفتح الـ Organizer.
4. Distribute App ← App Store Connect ← Upload. Xcode بيوقّع بشهادة Distribution وبيرفع. أو من الترمنال بـ [[xcodebuild]] (تحت) وده اللي بيتعمل في CI مع [[fastlane]] أو Xcode Cloud.
5. بعد ما الـ build يخلص processing (دقايق لساعة)، بيظهر في TestFlight:
   • Internal testing: لحد 100 حد من فريقك في App Store Connect، من غير مراجعة.
   • External testing: لحد 10,000 tester بإيميل أو لينك عام، وأول build من كل version بيعدّي على مراجعة سريعة (Beta App Review).
   • الـ build في TestFlight بيفضل متاح 90 يوم.
   • الـ testers بينزّلوا تطبيق TestFlight من المتجر ويقبلوا الدعوة.
6. لما تبقى جاهز: في صفحة الـ version في App Store Connect املا الوصف، والكلمات المفتاحية، و screenshots (المقاسات المطلوبة بتتحدد في الصفحة)، والـ Privacy Policy URL، وبيانات الـ App Privacy (إيه الداتا اللي بتجمعها)، والفئة العمرية، واختار الـ build، و Submit for Review.

المراجعة غالبًا بتخلص في يوم أو اتنين. ولو اترفض، الرسالة بتقولك رقم الـ guideline (درس المراجعة الجاي)، وترد من Resolution Center أو تصلّح وترفع build جديد.

Apple بتطلب كل سنة (غالبًا في الربيع) إن الرفع يبقى بـ Xcode و SDK حديثين، فلازم تحدّث Xcode بانتظام. شوف صفحة Upcoming Requirements على موقع Apple Developer.`,
          example: R`# 1) زوّد رقم الـ build (محتاج Versioning System = Apple Generic في Build Settings)
agvtool next-version -all
# 2) archive لنسخة Release لأي جهاز iOS
xcodebuild archive -scheme Tasks -configuration Release -destination 'generic/platform=iOS' -archivePath build/Tasks.xcarchive
# 3) export ورفع: ExportOptions.plist فيه method = app-store-connect و destination = upload
xcodebuild -exportArchive -archivePath build/Tasks.xcarchive -exportOptionsPlist ExportOptions.plist -exportPath build/export -allowProvisioningUpdates`,
          try: R`(محتاج Apple Developer Program) اعمل التطبيق في App Store Connect، وزوّد الـ build، واعمل Archive من Xcode وارفعه بـ Distribute App. استنى الإيميل بتاع processing، وضيف نفسك internal tester في TestFlight، ونزّل التطبيق على موبايلك من تطبيق TestFlight. لو لسه مشتركتش: اعمل Archive بس واتفرج على الـ Organizer وأحجام التطبيق.`,
          deep: {
            why: R`التطبيق اللي على المتجر أو على الأقل على TestFlight هو أقوى حاجة في الـ CV بتاعك: بيقول إنك عديت كل السكة مش بس كتبت كود. و TestFlight بيخليك تجرب مع ناس حقيقية وتلاقي crashes قبل المستخدمين.`,
            how: R`الـ Archive بيبني Release (optimized) لكل المعالجات المطلوبة ويحفظ معاه ملفات الـ debug symbols ([[dSYM]])، ودي اللي بتخلي تقارير الـ crash تتقري بأسماء الدوال (في Xcode ← Organizer ← Crashes، أو في Firebase Crashlytics).

عند الرفع، App Store Connect بيعمل فحص أوتوماتيكي (APIs ممنوعة، والـ privacy manifest، والأيقونات، والتوقيع). ولما التطبيق يتنشر، المتجر بيعمل App Thinning: كل جهاز بينزّل الأجزاء اللي محتاجها بس.

[[agvtool next-version -all]] بيزود [[CURRENT_PROJECT_VERSION]]. و [[-allowProvisioningUpdates]] بيسمح لـ xcodebuild يعمل أو يحدّث الـ profiles لوحده باستخدام الحساب اللي في Xcode (أو بـ App Store Connect API key في CI).

[[altool]] القديم اتشال من حاجات كتير (زي الـ notarization)، فالأحسن تستخدم Xcode أو [[xcodebuild -exportArchive]] أو تطبيق Transporter أو fastlane.`,
            when: R`TestFlight من أول ما التطبيق يبقى ليه شكل، مش في الآخر. واعمل CI (Xcode Cloud أو GitHub Actions بـ macOS runner + fastlane) لما الرفع اليدوي يبقى أكتر من مرة في الأسبوع.`,
            mistakes: R`ترفع build بنفس الرقم. وتنسى ترفع الـ dSYMs لأداة الـ crashes فالتقارير تبقى أرقام. وتستنى لآخر يوم قبل ما تبدأ أول رفع (أول مرة فيها مفاجآت: اسم محجوز، وشهادات، و screenshots). وتعمل Submit من غير demo account والتطبيق فيه login: الـ reviewer مش هيعرف يدخل وهيرفض (Guideline 2.1).`
          },
          lines: [
            R`[[agvtool]]: بيزود الـ build number في كل الـ targets.`,
            R`[[xcodebuild archive]]: build Release لأي جهاز iOS ويحفظه في [[.xcarchive]].`,
            R`[[-exportArchive]]: يوقّع للمتجر ويرفع لـ App Store Connect حسب الـ ExportOptions.plist.`
          ],
          sol: R`بعد الرفع، Xcode (أو xcodebuild) بيكتب [[Upload succeeded]]، وبعد شوية بيوصلك إيميل [[The following build has completed processing]] من App Store Connect. في تاب TestFlight هتلاقي الـ build، ولو طلب منك Export Compliance (التشفير) جاوب (التطبيقات اللي بتستخدم HTTPS بس غالبًا معفية، وتقدر تحط [[ITSAppUsesNonExemptEncryption = NO]] في Info.plist عشان السؤال ميتكررش). بعدها تضيف نفسك internal tester والتطبيق يظهر في TestFlight على الموبايل.

ExportOptions.plist أبسط شكل ليه:`,
          solCode: R`<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>method</key>
  <string>app-store-connect</string>
  <key>destination</key>
  <string>upload</string>
  <key>signingStyle</key>
  <string>automatic</string>
</dict>
</plist>`
        },
        {
          cmd: "مراجعة App Store والخصوصية",
          title: "تعدّي مراجعة Apple: أشهر أسباب الرفض، ورسايل الصلاحيات، و privacy manifest و required reason APIs",
          desc: R`كل تطبيق وكل تحديث بيتراجع من بني آدمين في Apple حسب App Review Guidelines. أشهر أسباب الرفض:

• 2.1 App Completeness: التطبيق بيقع، أو فيه أزرار مش شغالة، أو محتوى تجريبي (Lorem ipsum)، أو مفيش demo account لتطبيق فيه login.
• 4.2 Minimum Functionality: تطبيق هو موقع جوه WebView من غير قيمة إضافية حقيقية.
• 5.1.1 Data Collection: بتطلب صلاحية من غير سبب واضح، أو بتجبر المستخدم يعمل حساب لحاجة مش محتاجة حساب. ولو التطبيق فيه إنشاء حساب، لازم يبقى فيه مسح حساب من جوه التطبيق.
• 4.8 Login Services: لو بتستخدم login من طرف تالت (Google أو Facebook) كطريقة أساسية، لازم تقدّم كمان اختيار login بيحافظ على الخصوصية زي Sign in with Apple (فيه استثناءات، اقراها).
• 3.1.1 In-App Purchase: المحتوى الرقمي (اشتراكات، ومزايا جوه التطبيق) لازم يتباع بـ In-App Purchase. الحاجات الحقيقية (أكل، وتوصيل، وخدمات) بأي وسيلة دفع. والقواعد دي بتختلف حسب البلد وبتتغير بسبب قضايا وقوانين، فاقرا النسخة الحالية.
• 2.3 Accurate Metadata: screenshots مش من التطبيق، أو وصف بيوعد بحاجات مش موجودة.

الصلاحيات: أي وصول للكاميرا أو الصور أو الموقع أو الميكروفون أو جهات الاتصال لازم مفتاح في Info.plist زي [[NSCameraUsageDescription]] فيه سبب واضح ومحدد («عشان تصوّر الفاتورة وتضيفها للمصروف»). من غيره التطبيق بيقع لحظة الطلب، وبسبب ضعيف بيترفض.

Privacy manifest ([[PrivacyInfo.xcprivacy]]): ملف (من 2024) بيوصف:
1. هل التطبيق بيعمل tracking ([[NSPrivacyTracking]]) ودومينات التتبع.
2. الداتا اللي بتجمعها ([[NSPrivacyCollectedDataTypes]]).
3. «Required reason APIs» ([[NSPrivacyAccessedAPITypes]]): APIs ممكن تتستخدم في الـ fingerprinting، وأي استخدام ليها لازم سبب من قايمة Apple بكود. منها: [[UserDefaults]] (السبب [[CA92.1]] = قراية وكتابة داتا التطبيق نفسه)، وتواريخ الملفات، و system boot time، ومساحة الديسك. والـ SDKs المشهورة (Firebase وغيرها) لازم يبقى معاها manifest بتاعها.

App Privacy في App Store Connect («الـ nutrition label»): بتجاوب أسئلة عن الداتا اللي بتتجمع وبتظهر في صفحة التطبيق. لازم تبقى متطابقة مع الحقيقة ومع الـ SDKs. ولو بتتبع المستخدم عبر تطبيقات تانية لازم App Tracking Transparency ([[ATTrackingManager]]).`,
          example: R`<?xml version="1.0" encoding="UTF-8"?>
<plist version="1.0">
<dict>
  <key>NSPrivacyTracking</key>
  <false/>
  <key>NSPrivacyAccessedAPITypes</key>
  <array>
    <dict>
      <key>NSPrivacyAccessedAPIType</key>
      <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
      <key>NSPrivacyAccessedAPITypeReasons</key>
      <array>
        <string>CA92.1</string>
      </array>
    </dict>
  </array>
  <key>NSPrivacyCollectedDataTypes</key>
  <array/>
</dict>
</plist>`,
          try: R`في مشروعك: File ← New ← File ← App Privacy واعمل [[PrivacyInfo.xcprivacy]]، وضيف UserDefaults بالسبب CA92.1 (لو بتستخدم [[@AppStorage]]). وبعدين ضيف [[NSCameraUsageDescription]] في تاب Info برسالة بالعربي. وأخيرًا اقرا sections 2.1 و 4.2 و 5.1.1 من App Review Guidelines على موقع Apple (مش طويلين).`,
          flag: "script",
          deep: {
            why: R`الرفض بيأخر الإطلاق أيام وممكن أسابيع، وده بيبوظ مواعيد مع عملاء. أغلب أسباب الرفض معروفة ومكررة، فلو راجعتها قبل الرفع بتوفر دورة كاملة. وتطبيقات المبتدئين بتترفض أكتر حاجة على 2.1 (crash أو مفيش demo account) و 4.2 (WebView).`,
            how: R`عند الرفع، App Store Connect بيجمّع الـ privacy manifests من التطبيق وكل الـ SDKs في تقرير، ولو استخدمت required reason API من غير ما تعلن عنه بيوصلك إيميل بالمشكلة (وممكن الرفع يترفض). والـ manifest نفسه plist: [[key]] واسم، وبعده القيمة ([[false]] و [[string]] و [[array]] و [[dict]]).

المراجع بيشغّل التطبيق على جهاز حقيقي، بيجرب السيناريوهات الأساسية، وبيقارن الـ metadata بالتطبيق، وبيشيك الصلاحيات ورسايلها. ولو فيه حاجات مش واضحة (هاردوير معين، حساب) اكتبها في App Review Information.`,
            when: R`اقرا الـ guidelines قبل ما تبدأ التطبيق مش قبل الرفع (فكرة التطبيق نفسها ممكن تبقى ضد 4.2 أو 3.1.1). وراجع الـ privacy manifest كل ما تضيف SDK أو API جديد.`,
            mistakes: R`رسالة صلاحية عامة زي «التطبيق محتاج الكاميرا». وتجبر المستخدم يدّي الموقع عشان يفتح التطبيق. وتنسى مسح الحساب. وتضيف SDK إعلانات أو analytics ومتحدّثش الـ App Privacy. وتتعامل مع الرفض بزعل بدل ما ترد بهدوء في Resolution Center وتوضح أو تصلّح.`
          },
          lines: [
            "رأس ملف XML.",
            "الـ plist.",
            "dictionary رئيسي.",
            "مفتاح: هل بتعمل tracking؟",
            "لأ.",
            R`مفتاح: الـ required reason APIs اللي بتستخدمها.`,
            "array.",
            "API واحد.",
            "نوعه:",
            R`UserDefaults (يعني [[@AppStorage]] كمان).`,
            "الأسباب:",
            "array أسباب.",
            R`[[CA92.1]]: بقرا وبكتب داتا خاصة بالتطبيق نفسه بس.`,
            "قفلة الأسباب.",
            "قفلة الـ API.",
            "قفلة الـ array.",
            "مفتاح: الداتا اللي بتتجمع.",
            "فاضية: مش بنجمع حاجة.",
            "قفلة الـ dict.",
            "قفلة الـ plist."
          ],
          sol: R`الـ [[PrivacyInfo.xcprivacy]] لما Xcode يعمله بيفتح بمحرر جدول، وتقدر تفتحه كـ Source Code (كليك يمين ← Open As ← Source Code) فتلاقيه زي المثال.

رسالة الكاميرا في تاب Info: [[Privacy - Camera Usage Description]] = «عشان تصوّر الفاتورة وتضيفها للمصروف من غير ما تكتبها بإيدك». وده بيظهر للمستخدم في نافذة الإذن.

ملخص الـ sections:
• 2.1: التطبيق لازم يبقى كامل وشغال، ومعاه demo account لو فيه login.
• 4.2: لازم يقدّم قيمة أكتر من موقع ملفوف.
• 5.1.1: اطلب الداتا اللي محتاجها بس، وبسبب واضح، ومسح الحساب لازم يبقى متاح.`
        },
        {
          cmd: "سوق iOS والانترفيو",
          title: "سوق شغل iOS في مصر والخليج وريموت، وأشهر أسئلة انترفيو Swift و SwiftUI",
          desc: R`صورة صريحة للسوق (2025 و 2026):
• في مصر، وظايف Native iOS أقل عددًا من Android ومن Flutter، لأن شركات كتير بتعمل التطبيقين بـ Flutter أو React Native عشان التكلفة. بس المنافسة على iOS كمان أقل، والشركات الكبيرة (بنوك، fintech، توصيل، شركات بتشتغل لعملاء برة) لسه بتطلب Native، والمرتبات غالبًا أعلى شوية من المتوسط لنفس الخبرة.
• في الخليج (السعودية والإمارات)، الطلب على iOS Native أعلى بسبب نسبة مستخدمي iPhone العالية والتطبيقات الحكومية والبنكية.
• الريموت والفريلانس: موجود بس تنافسي جدًا. اللي بيكسب فيه: تطبيقات منشورة فعلًا، و GitHub نضيف، وإنجليزي كويس.
• العائق الحقيقي: الماك. بدونه مش هتعرف تشتغل iOS، فحسبها في خطتك.

الإعلانات بتطلب عادةً: Swift و SwiftUI و UIKit (الاتنين)، و MVVM أو Clean Architecture، و async/await و Combine (في الكود القديم)، و Core Data أو SwiftData، و REST و JSON، و Git، و unit tests، وخبرة رفع على المتجر. ولو تعرف Kotlin أو Flutter بجانبها ده ميزة.

أسئلة انترفيو بتتكرر (جاوبها بصوت عالي لحد ما تبقى سلسة):
1. struct ولا class؟ value vs reference، وإمتى تستخدم كل واحد.
2. Optional إيه، وطرق فكه، وليه [[!]] خطر.
3. ARC و retain cycle و [[weak]] و [[unowned]] و [[[weak self]]] (وممكن يديك كود يسألك فيه leak ولا لأ).
4. [[@State]] و [[@Binding]] و [[@Observable]] و [[@Environment]]: مين يملك الداتا.
5. إيه اللي بيحصل لما الـ state تتغير في SwiftUI؟ (body بيتحسب تاني، و diffing).
6. async/await vs completion handlers، و [[actor]] و [[@MainActor]] و [[Sendable]] و data races.
7. [[some]] vs [[any]].
8. protocol-oriented programming و protocol extensions.
9. إزاي تختبر view model بيكلم API؟ (protocol + fake).
10. الفرق بين [[escaping]] و non-escaping closure.
11. App lifecycle و ScenePhase، وإزاي التطبيق بيتصرف في الخلفية.
12. إزاي هتعمل pagination أو image caching أو offline mode؟ (أسئلة design).

وفيه غالبًا تاسك عملي (take-home): شاشة بتجيب داتا من API وتعرضها في List بتفاصيل، مع loading و error، وأحيانًا بحث وcache. ده بالظبط اللي اتعلمته في المستوى التاني + MVVM والاختبارات.

المثال تحت سؤال «اكتب الناتج» مشهور. حاول تتوقعه قبل ما تشغّله.`,
          example: R`final class Screen {
  let name: String
  var onClose: (() -> Void)?
  init(name: String) { self.name = name }
  deinit { print("\(name) اتمسحت") }
}
struct Score {
  var value = 0
}
var a = Score()
var b = a
b.value = 10
print(a.value, b.value)
func openHome() {
  let home = Screen(name: "home")
  home.onClose = { [weak home] in
    print("قفلنا \(home?.name ?? "-")")
  }
  home.onClose?()
}
func openProfile() {
  let profile = Screen(name: "profile")
  profile.onClose = {
    print("قفلنا \(profile.name)")
  }
  profile.onClose?()
}
openHome()
openProfile()
print("خلصنا")`,
          try: R`قبل ما تشغّل: اكتب على ورقة الناتج سطر سطر، وقول هل [[profile اتمسحت]] هتظهر ولا لأ وليه. وبعدين شغّل بـ [[swift main.swift]] وقارن، وصلّح [[openProfile]] بحيث السطر ده يظهر. وأخيرًا جاوب على أول 6 أسئلة من القايمة بصوت عالي، دقيقتين لكل سؤال.`,
          flag: "script",
          deep: {
            why: R`الانترفيو مش بيقيس إنك حفظت تعريفات، بيقيس إنك تقدر تتوقع الكود هيعمل إيه وتشرح ليه. الأسئلة اللي فوق متكررة لدرجة إن عدم الإجابة عليها بيوقف المقابلة بدري، والإجابة الكويسة عليها بتفتح كلام عن خبرتك.`,
            how: R`السؤال ده بيختبر 3 حاجات:
1. [[Score]] struct، فـ [[b]] نسخة مستقلة: [[0 10]].
2. [[openHome]]: الـ closure ماسك [[home]] weak، فمفيش cycle. لما الدالة تخلص الثابت [[home]] بيختفي، ومفيش حد ماسك الشاشة بقوة، فـ deinit بيشتغل: [[home اتمسحت]].
3. [[openProfile]]: الـ closure بيستخدم [[profile]] من غير capture list، فبيمسكه بقوة. والـ object ماسك الـ closure في [[onClose]]. يعني cycle، ولما الدالة تخلص الاتنين بيفضلوا ماسكين بعض في الذاكرة ومحدش يقدر يوصلهم: leak. عشان كده [[profile اتمسحت]] مش بتظهر خالص.

الحل: [[{ [weak profile] in print(profile?.name ?? "-") }]]، أو [[[unowned profile]]] لو متأكد إن الـ closure مش هيتنادى بعد ما الشاشة تتمسح. ونفس الكلام بالظبط مع [[self]] جوه class: [[[weak self]]].

تفصيلة بتفرق في الانترفيو: لو الـ closure بيستخدم [[var]] (مش [[let]])، هو بيمسك المتغير نفسه مش القيمة. فلو عملت [[profile = nil]] بعد كده الـ cycle بيتكسر. عشان كده الأسئلة دي بتيجي غالبًا بـ [[let]] أو بـ [[self]].`,
            when: R`ذاكر الأسئلة دي قبل أي انترفيو iOS، واعمل مشروع take-home لنفسك قبلها (القايمة والتفاصيل والـ API) في 4 ساعات كتمرين.`,
            mistakes: R`تحفظ إجابات من غير ما تقدر تكتب كود يثبتها. وتقول «SwiftUI بس» لما يسألوك عن UIKit: قول إنك فاهم المفاهيم ومستعد تتعلمه. وتعمل take-home من غير error handling ولا tests ولا README: دي الحاجات اللي بتفرق. وتبعت CV فيه «iOS Developer» من غير لينك لتطبيق أو repo.`
          },
          lines: [
            "class شاشة.",
            "الاسم.",
            "closure متخزن.",
            "init.",
            "deinit بيطبع لما تتمسح.",
            "قفلة.",
            "struct.",
            "قيمة.",
            "قفلة.",
            "نسخة أولى.",
            R`[[b]] نسخة مستقلة.`,
            "بنعدّل النسخة.",
            "0 و 10.",
            "دالة بتفتح شاشة.",
            R`ثابت محلي.`,
            R`closure ماسك [[home]] weak.`,
            "بيطبع الاسم لو موجود.",
            "قفلة.",
            "بننادي الـ closure.",
            "قفلة: هنا home بتتمسح.",
            "دالة تانية.",
            "ثابت محلي.",
            R`closure بيستخدم [[profile]] من غير capture list: strong.`,
            "بيطبع الاسم.",
            "قفلة.",
            "بننادي الـ closure.",
            "قفلة: profile مش بتتمسح (cycle).",
            "بننادي الأولى.",
            "بننادي التانية.",
            "آخر سطر."
          ],
          sol: R`الناتج الحقيقي (اتجرب بـ [[swift main.swift]]):
[[0 10]]
[[قفلنا home]]
[[home اتمسحت]]
[[قفلنا profile]]
[[خلصنا]]

[[profile اتمسحت]] مظهرتش: retain cycle بين الشاشة والـ closure. بعد التصليح الناتج بيبقى فيه [[profile اتمسحت]] بعد [[قفلنا profile]] على طول:`,
          solCode: R`func openProfile() {
  let profile = Screen(name: "profile")
  profile.onClose = { [weak profile] in
    print("قفلنا \(profile?.name ?? "-")")
  }
  profile.onClose?()
}`
        },
        {
          cmd: "مشروع التخرج",
          title: "مشروع التخرج: تطبيق عادات يومية بـ SwiftUI و SwiftData و API و اختبارات، ترفعه على TestFlight",
          desc: R`المشروع ده بيجمع كل التاب في تطبيق واحد يتحط في الـ CV. اسمه مثلًا «عاداتي»: المستخدم بيضيف عادات يومية (قراية، رياضة، شرب مية) ويعلّم عليها كل يوم، ويشوف الـ streak بتاعه.

المتطلبات (اعمل checklist واشطب):
1. اللغة والبنية: Swift 6 language mode (أو إعدادات Xcode 26 الجديدة) من غير أخطاء concurrency. أقل نسخة iOS 18.
2. البيانات: SwiftData بـ [[@Model]] للـ [[Habit]] و [[CheckIn]] (علاقة one-to-many بـ cascade delete).
3. الشاشات: [[TabView]] بتلات تابات (العادات، الإحصائيات، الإعدادات)، كل واحد فيه [[NavigationStack]]. شاشة تفاصيل لكل عادة، و sheet لإضافة عادة بـ [[Form]] و validation.
4. الحالة: view model بـ [[@Observable]] و [[@MainActor]] للشاشة اللي فيها logic (الإحصائيات وحساب الـ streak)، و [[@AppStorage]] للإعدادات (المظهر، وساعة التذكير).
5. النت: شاشة «اقتباس اليوم» بتجيب من API مجاني بـ [[URLSession]] و Codable، بحالات loading و error و retry.
6. الجودة: Swift Testing لحساب الـ streak (يوم فاضي بيقطع السلسلة، والتغيير بين الأيام بالـ timezone) وللـ view model بـ fake service. ومفيش [[!]] في كود التطبيق إلا في URL ثابت.
7. الـ UX: Dark Mode، و Dynamic Type (جرّب أكبر خط)، و RTL، و VoiceOver labels على الأيقونات، و [[ContentUnavailableView]] لما مفيش عادات.
8. النشر: privacy manifest، وأيقونة، و TestFlight (لو عندك Developer Program)، و README فيه screenshots وشرح المعمارية وإزاي تشغّل الاختبارات.

ابدأ بالأصغر: model و List وإضافة ومسح (يوم). بعدين الـ streak والاختبارات (يوم). بعدين التابات والإحصائيات (يوم). بعدين الـ API والتلميع (يوم). ورفع (نص يوم). وكل خطوة commit.

مستوى أعلى لو خلصت: Widget بـ WidgetKit بيعرض الـ streak، وإشعار تذكير محلي بـ [[UserNotifications]]، و App Intents عشان Siri و Shortcuts. ودي حاجات بتفرق في الانترفيو لأنها مش في كل الكورسات.`,
          example: R`import SwiftUI
import SwiftData

@main
struct HabitsApp: App {
  @AppStorage("theme") private var theme = "system"
  var body: some Scene {
    WindowGroup {
      TabView {
        Tab("العادات", systemImage: "checklist") {
          NavigationStack { HabitsScreen() }
        }
        Tab("الإحصائيات", systemImage: "chart.bar") {
          NavigationStack { StatsScreen() }
        }
        Tab("الإعدادات", systemImage: "gear") {
          NavigationStack { SettingsScreen() }
        }
      }
      .preferredColorScheme(theme == "dark" ? .dark : theme == "light" ? .light : nil)
    }
    .modelContainer(for: [Habit.self, CheckIn.self])
  }
}`,
          try: R`ابدأ بالـ models: [[Habit]] (اسم، وأيقونة SF Symbol، وتاريخ الإنشاء، و [[@Relationship(deleteRule: .cascade) var checkIns: [CheckIn] = []]]) و [[CheckIn]] (تاريخ). وبعدين اكتب دالة [[streak(for dates: [Date], today: Date) -> Int]] واختبرها بـ Swift Testing قبل ما تعمل أي شاشة.`,
          flag: "script",
          deep: {
            why: R`الكورسات بتعلّمك كل حاجة لوحدها، بس الشغل الحقيقي هو إنك تربطهم: SwiftData مع view model مع navigation مع اختبارات مع رفع. والمشروع اللي بيعدي كل ده ومنشور على TestFlight أو المتجر بيتكلم عنك في الانترفيو أكتر من أي شهادة.`,
            how: R`الـ [[App]] بيجهز الحاجات المشتركة: الـ [[modelContainer]] لكل الـ models، والمظهر من [[@AppStorage]]. و [[Tab]] (iOS 18) هو الطريقة الجديدة لكتابة التابات، وكل تاب جواه [[NavigationStack]] بتاعه عشان كل تاب يحتفظ بمكانه لما تتنقل بينهم. (لو هتدعم iOS 17 استخدم [[.tabItem { Label(...) }]] على كل شاشة).

حساب الـ streak هو أصعب logic في المشروع: لازم تتعامل مع الأيام مش الساعات ([[Calendar.current.startOfDay(for:)]] و [[isDate(_:inSameDayAs:)]])، ومع يوم النهارده لو لسه متعلمش. عشان كده بنقول اكتبه دالة pure ومعاها اختبارات الأول.

[[HabitsScreen]] و [[StatsScreen]] و [[SettingsScreen]] انت اللي هتكتبهم من دروس المستوى التاني.`,
            when: R`بعد ما تخلص المستويين الأول والتاني ودروس MVVM والاختبارات. وخليه في repo على GitHub من أول يوم.`,
            mistakes: R`تبدأ بالتصميم والألوان قبل الـ model والـ logic. وتعمل 10 features بنص جودة بدل 5 كاملين. ومتكتبش README. وتنسى تجرب Dark Mode و الخط الكبير. وتحط كل الكود في [[ContentView.swift]].`
          },
          lines: [
            "SwiftUI.",
            "SwiftData.",
            "نقطة البداية.",
            "الـ App.",
            R`المظهر من [[@AppStorage]].`,
            "body.",
            "الشباك.",
            R`[[TabView]]: التابات تحت.`,
            R`[[Tab]] (iOS 18): عنوان وأيقونة.`,
            R`كل تاب ليه [[NavigationStack]] بتاعه.`,
            "قفلة.",
            "تاب الإحصائيات.",
            "شاشته.",
            "قفلة.",
            "تاب الإعدادات.",
            "شاشته.",
            "قفلة.",
            "قفلة TabView.",
            R`المظهر حسب الإعداد، و [[nil]] = زي النظام.`,
            "قفلة WindowGroup.",
            "الداتابيز للـ models الاتنين.",
            "قفلة body.",
            "قفلة."
          ],
          sol: R`الـ models ودالة الـ streak واختباراتها (الدالة pure فتقدر تجربها على Linux كمان من غير SwiftData):`,
          solCode: R`@Model
final class Habit {
  var name: String
  var symbol: String
  var createdAt: Date
  @Relationship(deleteRule: .cascade) var checkIns: [CheckIn] = []
  init(name: String, symbol: String = "star", createdAt: Date = .now) {
    self.name = name
    self.symbol = symbol
    self.createdAt = createdAt
  }
}

@Model
final class CheckIn {
  var date: Date
  init(date: Date = .now) { self.date = date }
}

func streak(for dates: [Date], today: Date, calendar: Calendar = .current) -> Int {
  let days = Set(dates.map { calendar.startOfDay(for: $0) })
  var day = calendar.startOfDay(for: today)
  // لو النهارده لسه متعلمش، نبدأ العد من امبارح
  if !days.contains(day) {
    day = calendar.date(byAdding: .day, value: -1, to: day)!
  }
  var count = 0
  while days.contains(day) {
    count += 1
    day = calendar.date(byAdding: .day, value: -1, to: day)!
  }
  return count
}

@Test func streakCountsConsecutiveDays() {
  var cal = Calendar(identifier: .gregorian)
  cal.timeZone = TimeZone(identifier: "Africa/Cairo")!
  let today = cal.date(from: DateComponents(year: 2026, month: 5, day: 10, hour: 9))!
  let days = [0, 1, 2, 4].map { cal.date(byAdding: .day, value: -$0, to: today)! }
  #expect(streak(for: days, today: today, calendar: cal) == 3)
  #expect(streak(for: Array(days.dropFirst()), today: today, calendar: cal) == 2)
  #expect(streak(for: [], today: today, calendar: cal) == 0)
}`
        }
      ]
    }
  ]
});

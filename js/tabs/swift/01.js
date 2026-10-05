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
    }
  ]
});

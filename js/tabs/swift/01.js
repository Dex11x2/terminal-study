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
          try: R`نفّذ [[swift --version]] (أو أمر الـ Docker). وبعدين اعمل مشروع [[Hello]] بـ [[swift package init --type executable]] وافتح [[Sources/Hello/Hello.swift]]، غيّر الرسالة لاسمك، وشغّل [[swift run]] تاني.`,
          deep: {
            why: R`ناس كتير بتشتري كورس iOS وتكتشف بعد أسبوع إن جهازها Windows ومش هينفع. لو عارف الحقيقة من الأول تقدر تخطط: اتعلم اللغة دلوقتي على جهازك، واجمع لماك مستعمل لما توصل لـ SwiftUI. أو لو مش ناوي تشتري ماك خالص، Flutter أو React Native بيطلّعوا تطبيقات iOS بس برضه محتاجين ماك عشان البناء النهائي والرفع (أو خدمة build سحابية زي EAS أو Codemagic).`,
            how: R`Swift بتتحول لكود الآلة عن طريق compiler مبني على [[LLVM]] (نفس البنية التحتية بتاعة Clang و Rust). [[swift main.swift]] بيترجم الملف في الذاكرة ويشغّله على طول. [[swift build]] بيترجم المشروع وبيحط الناتج في [[.build/debug]]، و [[swift run]] = build + تشغيل. على الماك، Xcode بيستخدم نفس الـ compiler بس بيضيف الـ SDKs بتاعة iOS (UIKit و SwiftUI) والـ Simulator والتوقيع والرفع.

[[Foundation]] (التواريخ و JSON و URLSession) موجودة على Linux و Windows كمان (نسخة open source اسمها swift-foundation)، لكن [[SwiftUI]] و [[UIKit]] و [[SwiftData]] موجودين على أجهزة Apple بس.`,
            when: R`أول يوم. ولو على Linux أو Windows، كل دروس المستوى الأول تقدر تجربها بـ [[swift main.swift]]. من أول المستوى التاني (SwiftUI) هتحتاج ماك.`,
            mistakes: R`تنزّل Xcode من موقع غير App Store أو developer.apple.com. وتنسى تفتح Xcode مرة بعد التنزيل فيكمّل تثبيت الـ components. وتشتري ماك Intel قديم رخيص وتكتشف إن آخر Xcode مش بيدعمه. وتفتكر إن Swift Playgrounds على الـ iPad لعبة: ده بيبني تطبيقات SwiftUI حقيقية وتقدر ترفع منه على المتجر كمان.`
          },
          teach: R`## المثال بيعمل إيه؟

٣ حاجات: يتأكد إن Swift متسطبة ويطبع نسختها، يشغّل Swift من غير ما تسطّبها خالص (جوه Docker)، ويعمل مشروع صغير بـ SwiftPM ويشغّله. جزء الماك ([[xcodebuild]]) من الـ docs الرسمية لأن مفيش ماك هنا، والباقي كله اتشغّل فعلًا في [[docker run --rm swift:latest]] على Swift 6.4.

---

## ١. على الماك: [[xcodebuild -version]] و [[swift --version]]

~~~zsh
xcodebuild -version
swift --version
~~~

- [[xcodebuild]] أداة سطر الأوامر بتاعة Xcode (بتبني المشاريع من غير ما تفتح البرنامج). و [[-version]] بتطبع نسخة Xcode ورقم الـ build. لو طلع خطأ إن الأداة مش موجودة، يبقى Xcode لسه متسطبش أو متفتحش مرة.
- [[swift --version]] بيطبع نسخة الـ compiler والـ target (المعالج والنظام اللي بيترجم ليه). على ماك Apple Silicon الـ target بيبقى [[arm64-apple-macosx...]] (من الـ docs).

---

## ٢. Swift من غير تسطيب: Docker

~~~bash
docker run --rm -it -v "$PWD":/src -w /src swift swift --version
~~~

نفكه حتة حتة:

| الحتة | معناها |
|---|---|
| [[docker run]] | شغّل container من image |
| [[--rm]] | امسح الـ container أول ما يخلص |
| [[-it]] | interactive + terminal: عشان لو فتحت REPL تقدر تكتب فيه |
| [[-v "$PWD":/src]] | volume: الفولدر الحالي ([[$PWD]] = print working directory) يظهر جوه الـ container في [[/src]] |
| [[-w /src]] | working directory: الأوامر تتنفذ من جوه [[/src]] |
| [[swift]] (الأولى) | اسم الـ image الرسمية من Docker Hub (من غير tag يبقى [[swift:latest]]) |
| [[swift --version]] | الأمر اللي بيتنفذ جوه الـ container |

اتشغّل هنا وطلع:

~~~text الناتج
Swift version 6.4 (swift-6.4-RELEASE)
Target: x86_64-unknown-linux-gnu
~~~

- [[x86_64]] نوع المعالج (Intel و AMD 64-bit). على ماك M1 أو سيرفر ARM هتلاقي [[aarch64]].
- [[unknown-linux-gnu]]: النظام لينكس بمكتبة GNU.

> الـ image دي كبيرة (حوالي 5.5 جيجا على الديسك بعد التنزيل) لأن فيها الـ compiler كامل. فيه tag اسمه [[slim]] أصغر بس **مفيهوش compiler**، بيشغّل برامج متترجمة بس.

---

## ٣. مشروع بـ Swift Package Manager

~~~bash
mkdir Hello && cd Hello
swift package init --type executable
swift run
~~~

### [[mkdir Hello && cd Hello]]

[[mkdir]] (make directory) بيعمل فولدر، و [[&&]] معناها «لو اللي قبلي نجح نفّذ اللي بعدي»، و [[cd]] (change directory) بيدخلك جواه. اسم الفولدر هو اللي SwiftPM بياخده اسم للمشروع.

### [[swift package init --type executable]]

- [[swift package]] هي SwiftPM: مدير الحزم والبناء الرسمي.
- [[init]] بيعمل مشروع جديد في الفولدر الحالي.
- [[--type executable]]: برنامج بيتشغّل (فيه نقطة بداية)، مش [[library]] بيستخدمها كود تاني.

على Swift 6.4 طلع:

~~~text الناتج
Creating executable package: Hello
Creating Package.swift
Creating .gitignore
Creating Sources
Creating Sources/Hello/Hello.swift
Creating Tests/
Creating Tests/HelloTests/
Creating Tests/HelloTests/HelloTests.swift
~~~

- [[Package.swift]]: وصف المشروع (اسمه، الـ targets، الـ dependencies). مكتوب بـ Swift نفسها.
- [[Sources/Hello/Hello.swift]]: الكود. فولدر لكل target باسمه.
- [[Tests/HelloTests]]: مكان الاختبارات (درس Swift Testing).
- [[.gitignore]]: بيقول لـ git يتجاهل فولدر [[.build]] اللي فيه الناتج.

> النسخ الأقدم من Swift كانت بتعمل [[Sources/main.swift]] فيه سطر [[print]] بس. النسخة الجديدة بتعمل الملف ده:

~~~swift
@main
struct Hello {
    static func main() {
        print("Hello, world!")
    }
}
~~~

[[@main]] بتقول «البرنامج بيبدأ من هنا»، فـ Swift بتنادي [[static func main()]] أول ما البرنامج يشتغل. ([[struct]] و [[static]] هتفهمهم في دروس الأنواع. دلوقتي كفاية تعرف إن سطر الـ [[print]] هو اللي هتغيّره).

### [[swift run]]

بيعمل حاجتين: [[swift build]] (يترجم ويحط الناتج في [[.build/debug]]) وبعدين يشغّل البرنامج.

~~~text الناتج أول مرة
Building for debugging...
[Planning deferred tasks]
[18 / 22] Hello-product
[19 / 22] Hello-product
[23 / 23] Hello-product
Build complete! (2.72 secs)
Hello, world!
~~~

- [[for debugging]]: الـ build الافتراضي debug (من غير تحسينات وفيه معلومات للـ debugger). للنسخة السريعة: [[swift run -c release]].
- [[[23 / 23]]]: عدد خطوات البناء.
- المرة التانية (بعد ما غيّرنا النص) البناء أخد [[0.54 secs]] بس، لأن SwiftPM بيترجم اللي اتغير بس.

> جوه Docker طلع كمان سطرين [[warning: safeExec: signal(32, SIG_DFL) failed]] قبل الناتج. دول من بيئة الـ container ومش ليهم علاقة بالكود، تجاهلهم.

---

## ٤. [[swift main.swift]]: ملف واحد من غير مشروع

لدروس المستوى الأول كفاية ملف واحد: [[swift main.swift]] بيترجمه في الذاكرة ويشغّله على طول. وكل أمثلة التاب اتجربت كده. ملاحظة: الوضع ده بيترجم بـ **language mode 5** افتراضيًا (اتطبع في رسالة crash عندنا: [[Compiling with effective version 5.10]])، ولو عايز قواعد Swift 6 الصارمة: [[swiftc -swift-version 6 main.swift]]. وكل أمثلة الدروس اللي جاية اتترجمت بالوضعين.

---

## الخلاصة

| الأمر | بيعمل إيه | محتاج ماك؟ |
|---|---|---|
| [[xcodebuild -version]] | نسخة Xcode | أيوه |
| [[swift --version]] | نسخة الـ compiler والـ target | لأ |
| [[docker run --rm swift swift ...]] | Swift من غير تسطيب | لأ |
| [[swift package init --type executable]] | مشروع جديد بـ [[Package.swift]] | لأ |
| [[swift run]] | build + تشغيل | لأ |
| [[swift main.swift]] | يشغّل ملف واحد | لأ |

اللغة كلها على أي جهاز، و SwiftUI و Simulator والرفع على المتجر محتاجين Xcode على ماك.`,
          lines: [
            "بيطبع نسخة Xcode اللي على الماك (مثلًا Xcode 26.x).",
            "بيطبع نسخة Swift والـ target (مثلًا arm64-apple-macosx).",
            R`بيشغّل Swift جوه container: [[-v]] بيربط الفولدر الحالي بـ [[/src]]، و [[-w]] بيخلي الشغل فيه، و [[--rm]] بيمسح الـ container لما يخلص.`,
            R`فولدر للمشروع وتدخل جواه. اسم الفولدر هو اسم المشروع.`,
            R`بيعمل [[Package.swift]] و [[Sources/Hello/Hello.swift]] (في Swift 6.4: [[@main struct Hello]] جواه [[print("Hello, world!")]]، والنسخ الأقدم كانت بتعمل [[Sources/main.swift]])، وفولدر [[Tests]].`,
            "بيبني المشروع ويشغّله."
          ],
          sol: R`[[swift --version]] بيطبع حاجة زي:
[[Swift version 6.4 (swift-6.4-RELEASE)]] وتحتها الـ target (على Linux [[x86_64-unknown-linux-gnu]] أو [[aarch64-unknown-linux-gnu]]).

و [[swift run]] أول مرة بيطبع سطور البناء ([[Building for debugging...]] و [[Build complete! (2.72 secs)]]) وبعدين:
[[Hello, world!]]

بعد ما تعدّل الملف:`,
          solCode: R`// Sources/Hello/Hello.swift
@main
struct Hello {
    static func main() {
        print("أهلًا، أنا سارة وده أول برنامج Swift ليا")
    }
}`
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
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف ثابت ومتغير، يغيّر المتغير، ويطبع جمل فيها القيم دي جوه النص، وفي الآخر نص على كذا سطر. كل الناتج والأخطاء تحت اتشغّلوا بـ [[swift main.swift]] في [[docker run --rm swift:latest]] (Swift 6.4).

---

## ١. [[let]]: اسم لقيمة مش هتتغير

~~~swift
let appName = "مهامي"
~~~

| الحتة | معناها |
|---|---|
| [[let]] | ثابت (constant): القيمة بتتحط مرة واحدة |
| [[appName]] | الاسم. الـ style في Swift: camelCase (أول كلمة small وكل كلمة بعدها أولها capital) |
| [[=]] | «حط القيمة دي في الاسم ده» (مش «يساوي» بتاعة الرياضة) |
| [["مهامي"]] | نص بين [[" "]]، نوعه [[String]] |

مكتبناش النوع، و Swift عرفته لوحدها من القيمة. ده اسمه type inference (الدرس الجاي).

والسطر اللي فوقه [[// let: ثابت...]] تعليق: [[//]] لحد آخر السطر Swift بتتجاهله.

---

## ٢. [[var]] و [[+=]]

~~~swift
var doneCount = 0
doneCount += 1
~~~

- [[var]] (variable): متغير، ينفع تغيّر قيمته بعدين. نوعه اتستنتج [[Int]] من الصفر.
- [[+=]] اختصار [[doneCount = doneCount + 1]]: خد القيمة الحالية (0) وزوّد 1 وحطها تاني. بقت **1**.
- ومفيش [[;]] في آخر السطر: Swift مش محتاجاها (بتحتاجها بس لو حطيت أمرين في سطر واحد).

---

## ٣. [[print]] و [[\(...)]]

~~~swift
print("أهلًا في \(appName)، خلّصت \(doneCount) مهمة")
print("الباقي: \(5 - doneCount)")
~~~

- [[print(...)]] دالة جاهزة بتطبع اللي بين القوسين وتنزل سطر جديد.
- [[\(appName)]]: الـ backslash [[\]] وبعده قوسين = string interpolation. Swift بتحسب اللي جوه القوسين وتحط الناتج مكانه في النص.
- [[\(5 - doneCount)]]: جوه القوسين ينفع حساب كامل، مش متغير بس: 5 - 1 = 4.

~~~text الناتج
أهلًا في مهامي، خلّصت 1 مهمة
الباقي: 4
~~~

---

## ٤. نص على كذا سطر: [["""]]

~~~swift
let report = """
  التطبيق: \(appName)
  المنجز: \(doneCount)
  """
print(report)
~~~

- [["""]] (تلات علامات تنصيص) بتفتح نص متعدد السطور. لازم السطر يخلص بعدها على طول، والنص يبدأ من السطر اللي تحته.
- الـ interpolation شغال جواه عادي.
- [["""]] الأخيرة ليها مسافتين قبلها، و Swift بتشيل نفس المسافتين دول من أول كل سطر. عشان كده الناتج طالع من غير مسافات في الأول:

~~~text الناتج
التطبيق: مهامي
المنجز: 1
~~~

---

## ٥. التجربة: الأخطاء اللي هتشوفها

**تغيّر [[let]]** (ضفنا [[appName = "تاني"]] في السطر التالت):

~~~text الناتج
main.swift:3:1: error: cannot assign to value: 'appName' is a 'let' constant
~~~

[[main.swift:3:1]] معناها: الملف، السطر 3، العمود 1. وتحت الرسالة الـ compiler بيقترح [[note: change 'let' to 'var' to make it mutable]]. والبرنامج **مش بيتشغّل خالص**: ده خطأ compile.

**[[var]] متغيرتش** (الكود جوه [[func run() { ... }]] من غير [[+= 1]]):

~~~text الناتج
main.swift:3:7: warning: variable 'doneCount' was never mutated; consider changing to 'let' constant [#VariableNeverMutated]
أهلًا في مهامي، خلّصت 0 مهمة
~~~

ده **warning** مش error: البرنامج اشتغل وطبع، بس الـ compiler بينصحك تخليها [[let]]. و [[[#VariableNeverMutated]]] اسم التحذير، وجنبه لينك لشرحه في docs.swift.org.

ليه حطيناه جوه دالة؟ لأن المتغيرات في أعلى [[main.swift]] (برة أي دالة) global، والتحذير ده مش بيطلع ليها.

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[let x = ...]] | ثابت. ابدأ بيه دايمًا |
| [[var x = ...]] | متغير. لما تحتاج تغيّر فعلًا |
| [[x += 1]] | زوّد 1 (مفيش [[++]]) |
| [[print("...")]] | اطبع وانزل سطر |
| [[\(expr)]] | حط قيمة جوه النص |
| [[""" ... """]] | نص على كذا سطر |
| [[//]] | تعليق (مش [[#]]) |`,
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
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف قيمة من كل نوع أساسي، يطبع أنواعهم، يحسب سعر بعد ما يحوّل الأنواع بإيده، ويورّيك تحويلين ممكن يفاجئوك. الناتج والأخطاء من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. الاستنتاج من القيمة

~~~swift
let count = 3
let price = 12.5
let name = "قلم"
let inStock = true
~~~

| القيمة | Swift استنتجت | ليه |
|---|---|---|
| [[3]] | [[Int]] | رقم من غير علامة عشرية |
| [[12.5]] | [[Double]] | فيه علامة عشرية |
| [["قلم"]] | [[String]] | بين [[" "]] |
| [[true]] | [[Bool]] | [[true]] أو [[false]] بس |

---

## ٢. النوع بإيدك: [[: Double]]

~~~swift
let tax: Double = 2
print(type(of: count), type(of: price), type(of: tax))
~~~

- [[: Double]] بعد الاسم اسمها type annotation: «النوع ده بالظبط». الشكل دايمًا [[الاسم: النوع = القيمة]].
- القيمة [[2]] لوحدها كانت هتبقى Int، بس لأننا قلنا Double بقت [[2.0]].
- [[type(of: x)]] بترجّع نوع القيمة. و [[of:]] ده اسم الـ argument (درس الدوال). و [[print]] لما تديها كذا قيمة بفاصلة بتطبعهم بمسافة بينهم:

~~~text الناتج
Int Double Double
~~~

---

## ٣. مفيش تحويل لوحده: [[Double(count)]]

~~~swift
let total = Double(count) * price + tax
print("\(count) \(name) بـ \(total) جنيه، متاح: \(inStock)")
~~~

من جوه لبرة:
1. [[Double(count)]]: بيعمل Double جديد من الـ Int: [[3]] بقت [[3.0]]. ([[count]] نفسها لسه Int).
2. [[3.0 * 12.5]] = [[37.5]]. [[*]] ضرب.
3. [[+ tax]] = [[39.5]].

~~~text الناتج
3 قلم بـ 39.5 جنيه، متاح: true
~~~

ولو شلت [[Double(...)]] (التجربة) الـ compiler بيرفض:

~~~text الناتج
main.swift:9:13: error: cannot convert value of type 'Int' to expected argument type 'Double'
~~~

يعني: [[*]] اللي بتاخد Double مستنية Double، وانت اديتها Int. وده قصد: Swift عمرها ما بتحوّل نوع لنوع تاني لوحدها.

---

## ٤. [[Int(9.99)]]: بيقص مش بيقرّب

~~~swift
print(Int(9.99))
~~~

~~~text الناتج
9
~~~

التحويل لـ Int بيرمي الكسر (truncate). لو عايز 10: [[Int(9.99.rounded())]].

---

## ٥. [[Int("42")]]: تحويل ممكن يفشل

~~~swift
let parsed = Int("42")
print(parsed as Any, Int("abc") as Any)
~~~

- النص [["42"]] ينفع يبقى رقم، بس [["abc"]] لأ. فـ [[Int(String)]] مش بترجّع [[Int]]، بترجّع [[Int?]] (optional: «يا Int يا مفيش»). علامة [[?]] بعد النوع ليها درس كامل.
- [[as Any]]: لو طبعت optional على طول الـ compiler بيدّي warning، و [[as Any]] بتقوله «عارف، اطبعه كده».

~~~text الناتج
Optional(42) nil
~~~

[[Optional(42)]] = نجح والقيمة جوه «علبة». [[nil]] = فشل، مفيش قيمة.

---

## ٦. [[Int.max]] والـ overflow

~~~swift
print(Int.max)
~~~

~~~text الناتج
9223372036854775807
~~~

ده 2 أس 63 ناقص 1: [[Int]] على الأجهزة 64-bit بياخد 64 bit، واحد منهم للإشارة (موجب أو سالب).

**[[Int.max + 1]] بأرقام ثابتة** (التجربة): الـ compiler بيحسبها قبل التشغيل ويرفض:

~~~text الناتج
main.swift:1:24: error: arithmetic operation '9223372036854775807 + 1' (on type 'Int') results in an overflow
~~~

**ولو الرقم جاي وقت التشغيل** (جربنا [[Int.max + CommandLine.arguments.count]]، والـ count ده 1): البرنامج اترجم عادي، ووقع وهو شغال:

~~~text الناتج
*** Program crashed: Illegal instruction at 0x000079b2fe45415d ***
~~~

ومفيش رسالة «overflow» مكتوبة: Swift بتحط تعليمة بتوقف البرنامج فورًا (trap) بدل ما تكمّل برقم سالب غلط زي C و Java.

---

## الخلاصة

| عايز | اكتب | الناتج |
|---|---|---|
| تعرف النوع | [[type(of: x)]] | [[Int]] |
| Int لـ Double | [[Double(n)]] | [[3.0]] |
| Double لـ Int | [[Int(9.99)]] | [[9]] (قص) |
| نص لرقم | [[Int("42")]] | [[Int?]]: [[Optional(42)]] أو [[nil]] |
| تحدد النوع | [[let x: Double = 2]] | [[2.0]] |

ومفيش تحويل لوحده أبدًا: Int و Double مع بعض = خطأ compile.`,
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
          sol: R`[[count * price]] من غير تحويل بيطلّع: [[cannot convert value of type 'Int' to expected argument type 'Double']] (على Swift 6.4).

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
          teach: R`## البرنامج بيعمل إيه؟

بيجرب كل نوع عمليات: قسمة وباقي، اختصارات [[+=]]، مقارنات، منطق، ternary، مقارنة نصوص، ودوال على الـ Double. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. قسمة الأعداد الصحيحة

~~~swift
let a = 7, b = 2
print(a / b, a % b)
print(Double(a) / Double(b))
~~~

- [[let a = 7, b = 2]]: ثابتين في سطر واحد، الفاصلة بتفصلهم.
- [[a / b]]: الاتنين [[Int]]، فالناتج [[Int]] والكسر بيترمي: 7 / 2 = **3** (مش 3.5 ولا 4).
- [[a % b]]: [[%]] اسمها remainder، باقي القسمة: 7 = 2 × 3 + **1**.
- [[Double(a) / Double(b)]]: حوّلنا الاتنين، فالقسمة بقت عشرية: **3.5**.

~~~text الناتج
3 1
3.5
~~~

---

## ٢. [[+=]] و [[*=]]

~~~swift
var score = 10
score += 5
score *= 2
print(score)
~~~

- [[var]] لأن القيمة هتتغير.
- [[score += 5]] = [[score = score + 5]]: بقت 15.
- [[score *= 2]] = [[score = score * 2]]: بقت **30**.

ولو كتبت [[score++]] (التجربة):

~~~text الناتج
main.swift:5:6: error: cannot find operator '++' in scope; did you mean '+= 1'?
~~~

يعني الـ operator ده مش موجود في اللغة خالص (اتشال في Swift 3)، والـ compiler نفسه بيقولك البديل.

---

## ٣. المقارنة والمنطق

~~~swift
let isAdult = 20 >= 18
let hasTicket = false
print(isAdult && hasTicket, isAdult || hasTicket, !hasTicket)
~~~

- [[>=]] «أكبر من أو يساوي»، والناتج [[Bool]]: [[20 >= 18]] = [[true]].
- [[&&]] (و): صح لو الاتنين صح. true && false = **false**.
- [[||]] (أو): صح لو واحد على الأقل صح. true || false = **true**.
- [[!]] قبل القيمة (نفي): بتقلبها. !false = **true**.

~~~text الناتج
false true true
~~~

---

## ٤. الـ ternary: [[? :]]

~~~swift
let label = score > 25 ? "ممتاز" : "كويس"
print(label)
~~~

الشكل [[شرط ? لو_صح : لو_غلط]]. [[score > 25]] → 30 > 25 = true، فالقيمة الأولى: **ممتاز**. ولازم مسافة قبل [[?]]، وإلا Swift تفهمها optional.

---

## ٥. مقارنة النصوص

~~~swift
print("swift" == "Swift", "abc" < "abd")
~~~

- [[==]] بتقارن المحتوى حرف حرف، وحساسة لحالة الحروف: s صغيرة غير S كبيرة، فالناتج **false**.
- [[<]] على النصوص بالترتيب الأبجدي: أول حرفين زي بعض، والتالت c قبل d، فـ **true**.

---

## ٦. دوال على الـ Double نفسه

~~~swift
print(2.0.squareRoot(), (10.0 / 3).rounded())
~~~

- [[2.0.squareRoot()]]: النقطة الأولى جزء من الرقم، والتانية «نادي دالة على القيمة دي». الجذر التربيعي لـ 2: [[1.4142135623730951]].
- [[(10.0 / 3).rounded()]]: القوسين الأول عشان القسمة تتحسب الأول (3.3333...)، وبعدين [[rounded()]] بتقرّب لأقرب عدد صحيح، والناتج لسه Double: **3.0**.

~~~text الناتج كله بالترتيب
3 1
3.5
30
false true true
ممتاز
false true
1.4142135623730951 3.0
~~~

---

## ٧. حل التجربة: المتوسط بطريقتين

~~~swift
let g1 = 90, g2 = 85, g3 = 82
print((g1 + g2 + g3) / 3)
print(Double(g1 + g2 + g3) / 3)
~~~

~~~text الناتج
85
85.66666666666667
~~~

المجموع 257. قسمة Int: 257 / 3 = 85 والباقي 2 اترمى. قسمة Double: [[85.66666666666667]]. لاحظ إن [[3]] في السطر التالت اتعاملت Double لوحدها: دي مش «تحويل»، ده رقم مكتوب (literal) بياخد النوع المطلوب.

---

## الخلاصة

| الرمز | معناه | مثال | الناتج |
|---|---|---|---|
| [[/]] | قسمة (Int بيقص) | [[7 / 2]] | [[3]] |
| [[%]] | باقي القسمة | [[7 % 2]] | [[1]] |
| [[+=]] و [[*=]] | عدّل وخزّن | [[s += 5]] | |
| [[==]] و [[!=]] | يساوي / مش يساوي | [["a" == "A"]] | [[false]] |
| [[&&]] و [[||]] و [[!]] | و / أو / نفي | | |
| [[c ? x : y]] | ternary | | |

ومفيش [[++]] ولا [[--]]: اكتب [[+= 1]].`,
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
    }
  ]
});

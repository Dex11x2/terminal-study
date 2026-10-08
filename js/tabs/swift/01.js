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
          teach: R`## البرنامج بيعمل إيه؟

دالة بتراجع طلب شراء: ترفض الكمية الغلط والكمية الأكبر من المخزون بـ [[guard]]، وبعدين تختار رسالة بـ [[if]]. وفي الآخر [[if]] بيرجّع قيمة على طول. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. توقيع الدالة

~~~swift
func checkOrder(quantity: Int, inStock: Int) -> String {
~~~

- [[func]] بتعرّف دالة، واسمها [[checkOrder]].
- جوه القوسين parameters: كل واحد [[الاسم: النوع]].
- [[-> String]]: السهم معناه «بترجّع»، والدالة دي بترجّع نص. (الدوال ليها درس كامل).

---

## ٢. أول [[guard]]

~~~swift
  guard quantity > 0 else {
    return "الكمية لازم تبقى أكبر من صفر"
  }
~~~

اقراها كده: «**لازم** [[quantity > 0]]، **وإلا** نفّذ اللي في [[else]]».
- لو الشرط صح: Swift بتعدّي البلوك كله وتكمّل تحت.
- لو غلط: تدخل [[else]]، و [[return]] بيرجّع الرسالة ويخرج من الدالة فورًا.

والـ [[else]] إجباري، ولازم يخرج. شلنا [[return]] (التجربة):

~~~text الناتج
main.swift:4:3: error: 'guard' body must not fall through, consider using a 'return' or 'throw' to exit the scope
~~~

fall through يعني «يكمّل لتحت». الـ compiler بيرفض لأن الكود اللي تحت الـ guard مكتوب على أساس إن الشرط متحقق.

---

## ٣. تاني [[guard]] و interpolation

~~~swift
  guard quantity <= inStock else {
    return "المتاح \(inStock) بس"
  }
~~~

[[<=]] «أصغر من أو يساوي». ولو الكمية أكبر من المخزون بنرجّع رسالة فيها الرقم بـ [[\(inStock)]].

---

## ٤. [[if]] / [[else if]] / [[else]]

~~~swift
  if quantity >= 10 {
    return "تمام، وليك خصم جملة"
  } else if quantity >= 5 {
    return "تمام، وليك شحن مجاني"
  } else {
    return "تمام"
  }
~~~

- مفيش أقواس حوالين الشرط، والـ [[{ }]] إجبارية.
- الشروط بتتجرب بالترتيب، وأول واحد صح بيتنفذ والباقي يتساب. عشان كده [[>= 10]] الأول: لو بدأنا بـ [[>= 5]] كان الـ 30 هيدخله.
- الوصول هنا معناه إن الـ guards الاتنين عدّوا.

---

## ٥. النداءات التلاتة

~~~swift
print(checkOrder(quantity: 0, inStock: 20))
print(checkOrder(quantity: 7, inStock: 20))
print(checkOrder(quantity: 30, inStock: 20))
~~~

| النداء | وقف فين | الرسالة |
|---|---|---|
| 0 | أول guard (0 مش أكبر من 0) | الكمية لازم تبقى أكبر من صفر |
| 7 | عدّى الـ guards، [[else if]] (7 ≥ 5) | تمام، وليك شحن مجاني |
| 30 | تاني guard (30 > 20) | المتاح 20 بس |

---

## ٦. [[if]] كـ expression

~~~swift
let stock = 3
let badge = if stock == 0 { "خلصان" } else if stock < 5 { "قرب يخلص" } else { "متاح" }
print(badge)
~~~

من Swift 5.9: الـ [[if]] نفسه بيطلّع قيمة، فبنحطها في [[badge]] على طول. كل فرع فيه قيمة واحدة من نفس النوع، والـ [[else]] الأخير لازم. 3 مش صفر وأقل من 5: **قرب يخلص**.

~~~text الناتج كله
الكمية لازم تبقى أكبر من صفر
تمام، وليك شحن مجاني
المتاح 20 بس
قرب يخلص
~~~

---

## ٧. حل التجربة: [[canVote]]

~~~swift
func canVote(age: Int) -> Bool {
  guard age >= 0 else {
    print("سن غلط: \(age)")
    return false
  }
  return age >= 18
}
print(canVote(age: -3), canVote(age: 16), canVote(age: 30))
~~~

~~~text الناتج
سن غلط: -3
false false true
~~~

- الـ guard فيه سطرين: يطبع، وبعدين [[return false]]. لو شلت الـ return هيطلع نفس خطأ [['guard' body must not fall through]] (جربناه).
- [[return age >= 18]]: المقارنة نفسها [[Bool]]، فبنرجّعها على طول من غير if.
- [[سن غلط: -3]] اتطبع **قبل** سطر النتايج، لأن [[print]] بيحسب الـ arguments التلاتة الأول (وأولهم بيطبع)، وبعدين يطبعهم.

---

## الخلاصة

| | [[if]] | [[guard]] |
|---|---|---|
| المعنى | لو كذا اعمل كذا | لازم كذا، وإلا اخرج |
| البلوك بيتنفذ لما | الشرط صح | الشرط غلط |
| الخروج | اختياري | إجباري ([[return]] / [[throw]] / [[break]] / [[continue]]) |
| مكانه | أي حتة | أول الدالة غالبًا (early exit) |`,
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
          teach: R`## البرنامج بيعمل إيه؟

٣ استخدامات لـ [[switch]]: تحويل درجة لتقدير بالـ ranges، وتحديد مكان نقطة بالـ tuples، واختيار رسالة من أمر نصي بـ switch بيرجّع قيمة. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. [[grade]]: switch على ranges

~~~swift
func grade(_ score: Int) -> String {
  switch score {
  case 90...100: return "امتياز"
  case 75..<90: return "جيد جدًا"
  case 50..<75: return "مقبول"
  case 0..<50: return "راسب"
  default: return "درجة غلط"
  }
}
~~~

- [[_ score]]: الـ [[_]] قبل الاسم معناها إن اللي بينادي مش بيكتب label: [[grade(95)]] مش [[grade(score: 95)]].
- [[switch score { }]]: قارن [[score]] بالـ cases بالترتيب، وادخل أول واحد يطابق.
- [[case 90...100:]]: [[...]] closed range، الطرفين داخلين: 90 لحد 100.
- [[case 75..<90:]]: [[..<]] half-open، الأول داخل والآخر لأ: 75 لحد 89.
- مفيش [[break]]: كل case بيخلص لوحده.
- [[default:]] لأي حاجة مطابقتش. ليه إجباري؟ لأن [[Int]] فيه قيم سالبة وأكبر من 100، والـ switch لازم يغطي **كل** القيم. شلناه (التجربة):

~~~text الناتج
main.swift:2:3: error: switch must be exhaustive
~~~

ومعاه [[note: add a default clause]].

~~~swift
print(grade(95), grade(75), grade(30), grade(120))
~~~

~~~text الناتج
امتياز جيد جدًا راسب درجة غلط
~~~

75 دخلت «جيد جدًا» لأن [[75..<90]] بيبدأ بـ 75. و 120 مفيش range فيه، فـ default.

---

## ٢. switch على tuple

~~~swift
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
~~~

- [[(3, 0)]] tuple: قيمتين متجمعين في قيمة واحدة من غير ما تعمل نوع.
- [[case (0, 0):]] الاتنين لازم صفر. 3 مش صفر: مش هو.
- [[case (_, 0):]] الـ [[_]] = «أي قيمة، مش فارقة»، والتانية لازم صفر. ✓ فبيطبع **على محور x** ويخرج.
- [[case let (x, y) where x == y:]] [[let]] بتحط القيمتين في اسمين جداد، و [[where]] بتزود شرط. بيطابق (2, 2) مثلًا.
- الـ case بيبدأ تحته سطر جديد عادي، والـ indentation مش مهم للـ compiler.

**ملاحظة من التشغيل:** لأن [[point]] ثابت قيمته معروفة، الـ compiler بيطلّع ٣ تحذيرات [[warning: will never be executed]] على الـ cases اللي عمرها ما هتتنفذ، ومعاها [[note: condition always evaluates to false]]. البرنامج بيشتغل عادي، والتحذيرات دي بتختفي لو القيمة جاية وقت التشغيل.

---

## ٣. switch بيرجّع قيمة

~~~swift
let command = "stop"
let message = switch command {
case "start", "run": "بنشغّل"
case "stop": "بنوقف"
default: "أمر مش معروف"
}
print(message)
~~~

- [[let message = switch ...]]: من Swift 5.9 الـ switch expression، كل case فيه قيمة واحدة (من غير [[return]]) بتتحط في [[message]].
- [[case "start", "run":]]: case واحد بقيمتين، الفاصلة معناها «أو».
- مع [[String]] الـ default لازم برضه (النصوص مالهاش آخر).

~~~text الناتج كله
امتياز جيد جدًا راسب درجة غلط
على محور x
بنوقف
~~~

---

## ٤. حل التجربة: switch كامل من غير default

~~~swift
let isLoggedIn = true, isAdmin = false
switch (isLoggedIn, isAdmin) {
case (true, true): print("أهلًا يا أدمن")
case (true, false): print("أهلًا")
case (false, true): print("حالة غريبة: أدمن مش عامل login")
case (false, false): print("سجّل دخول الأول")
}
~~~

~~~text الناتج
أهلًا
~~~

[[Bool]] ليه قيمتين، فالـ tuple من اتنين Bool ليه 2 × 2 = 4 حالات بالظبط. لما غطيتهم كلهم، الـ compiler عرف إن الـ switch exhaustive ومطلبش [[default]].

---

## الخلاصة

| الـ pattern | بيطابق |
|---|---|
| [[case 5:]] | القيمة دي بالظبط |
| [[case "a", "b":]] | أي واحدة منهم |
| [[case 1...5:]] | من 1 لـ 5 والاتنين داخلين |
| [[case 1..<5:]] | من 1 لـ 4 |
| [[case (_, 0):]] | tuple تانيه صفر |
| [[case let (x, y) where ...:]] | يربط أسماء ويضيف شرط |
| [[default:]] | أي حاجة باقية |

لازم يغطي كل القيم، ومفيش [[break]].`,
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
          teach: R`## البرنامج بيعمل إيه؟

٥ loops صغيرين: لفة على range، ولفة على array بالرقم، وعد تنازلي بـ [[stride]]، وجمع الأرقام الزوجية بـ [[where]]، و [[while]] فيه [[continue]] و [[break]]. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. [[for i in 1...3]]

~~~swift
for i in 1...3 {
  print("لفة \(i)")
}
~~~

- [[for ... in ...]]: «لكل عنصر في ده». 
- [[i]] اسم بتختاره، وفي كل لفة بياخد القيمة اللي عليها الدور. وهو ثابت جوه اللفة (زي [[let]]).
- [[1...3]] = 1 و 2 و 3.

~~~text الناتج
لفة 1
لفة 2
لفة 3
~~~

---

## ٢. [[enumerated()]]: الرقم والعنصر

~~~swift
let names = ["سارة", "علي", "منى"]
for (index, name) in names.enumerated() {
  print("\(index + 1). \(name)")
}
~~~

- [[[...]]] array (قايمة). درس Array جاي.
- [[names.enumerated()]] بتدّي كل عنصر مع رقمه كـ tuple: (0, "سارة") و (1, "علي") و (2, "منى").
- [[(index, name)]] بيفك الـ tuple في اسمين.
- الترقيم بيبدأ من **0**، عشان كده [[index + 1]].

~~~text الناتج
1. سارة
2. علي
3. منى
~~~

---

## ٣. [[stride]]: عد بخطوة

~~~swift
for n in stride(from: 10, through: 0, by: -5) {
  print(n, terminator: " ")
}
print()
~~~

- [[stride(from: 10, through: 0, by: -5)]]: ابدأ من 10، وزوّد -5 كل مرة، لحد 0 **وداخل** ([[through]]). لو كتبت [[to: 0]] الصفر مكانش هيدخل.
- [[terminator: " "]]: [[print]] عادةً بتختم بسطر جديد، وهنا قلنالها تختم بمسافة، فالأرقام جنب بعض.
- [[print()]] فاضية: بتطبع السطر الجديد اللي استغنينا عنه.

~~~text الناتج
10 5 0 
~~~

---

## ٤. [[where]] في الـ for

~~~swift
var sum = 0
for n in 1...100 where n % 2 == 0 {
  sum += n
}
print("مجموع الزوجي:", sum)
~~~

- [[where n % 2 == 0]]: اللفة بتتنفذ بس للأرقام اللي باقي قسمتها على 2 صفر (الزوجي).
- 2 + 4 + ... + 100: خمسين رقم، متوسطهم 51، فالمجموع 50 × 51 = **2550**.

~~~text الناتج
مجموع الزوجي: 2550
~~~

---

## ٥. [[while]] و [[continue]] و [[break]]

~~~swift
var attempts = 0
while attempts < 5 {
  attempts += 1
  if attempts == 2 { continue }
  if attempts == 4 { break }
  print("محاولة \(attempts)")
}
~~~

[[while شرط]] بيلف طول ما الشرط صح، ومش عارف عدد اللفات مقدمًا.

| attempts | اللي حصل |
|---|---|
| 1 | طبع «محاولة 1» |
| 2 | [[continue]]: سيب باقي اللفة وارجع للشرط |
| 3 | طبع «محاولة 3» |
| 4 | [[break]]: اخرج من الـ loop كله |

~~~text الناتج
محاولة 1
محاولة 3
~~~

لاحظ إن [[attempts += 1]] في **أول** اللفة. لو كانت في الآخر، الـ [[continue]] كان هيرجع قبلها و attempts هتفضل 2 للأبد (infinite loop).

---

## ٦. حل التجربة

~~~swift
for i in 1...10 {
  print("7 × \(i) = \(7 * i)")
}
for name in names.reversed() {
  print(name)
}
~~~

~~~text الناتج (اتشغّل بعد المثال عشان names موجودة)
7 × 1 = 7
7 × 2 = 14
...
7 × 10 = 70
منى
علي
سارة
~~~

[[names.reversed()]] بترجّع نفس العناصر بالعكس من غير ما تغيّر [[names]] نفسها.

---

## الخلاصة

| الكود | بيلف على |
|---|---|
| [[for i in 0..<n]] | 0 لحد n-1 |
| [[for i in 1...n]] | 1 لحد n |
| [[for _ in 1...3]] | 3 مرات من غير ما تحتاج الرقم |
| [[for (i, x) in a.enumerated()]] | الرقم (من 0) والعنصر |
| [[stride(from:through:by:)]] | بخطوة، والآخر داخل ([[to:]] من غيره) |
| [[for ... where شرط]] | العناصر اللي بتحقق الشرط بس |
| [[while شرط]] | طول ما الشرط صح |

و [[continue]] = اللفة الجاية، و [[break]] = اخرج خالص.`,
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
          teach: R`## البرنامج بيعمل إيه؟

٤ دوال، كل واحدة بتوريك حاجة: قيمة افتراضية، و labels مختلفة برة وجوه، و [[inout]] اللي بتعدّل متغير بتاع اللي بينادي، ودالة بترجّع قيمتين في tuple. الناتج من [[swift main.swift]] على Swift 6.4 في Docker.

---

## ١. [[greet]]: قيمة افتراضية ومن غير [[return]]

~~~swift
func greet(name: String, excited: Bool = false) -> String {
  excited ? "أهلًا يا \(name)!!" : "أهلًا يا \(name)"
}
print(greet(name: "سارة"))
print(greet(name: "علي", excited: true))
~~~

| الحتة | معناها |
|---|---|
| [[func greet]] | دالة اسمها greet |
| [[name: String]] | parameter اسمه name ونوعه String، وهو نفسه الـ label وانت بتنادي |
| [[excited: Bool = false]] | [[= false]] قيمة افتراضية: ينفع متبعتهوش |
| [[-> String]] | بترجّع String |

- جسم الدالة expression واحد (ternary)، فـ Swift بترجّعه لوحدها من غير [[return]].
- النداء الأول من غير [[excited]] فبقت false. التاني بعتناها true.

~~~text الناتج
أهلًا يا سارة
أهلًا يا علي!!
~~~

---

## ٢. [[send]]: [[_]] و label برة غير الاسم جوه

~~~swift
func send(_ message: String, to user: String) {
  print("بنبعت «\(message)» لـ \(user)")
}
send("اجتماع الساعة 3", to: "منى")
~~~

كل parameter ممكن يبقى ليه اسمين: **label** (اللي بيتكتب في النداء) و**اسم** (اللي بتستخدمه جوه الدالة):

| الـ parameter | الـ label | الاسم جوه |
|---|---|---|
| [[_ message]] | مفيش ([[_]]) | [[message]] |
| [[to user]] | [[to]] | [[user]] |

فالنداء بيتقري جملة: [[send("...", to: "منى")]]، وجوه الدالة [[user]] أوضح من [[to]]. ومفيش [[->]] لأن الدالة مبترجعش حاجة (نوعها الحقيقي [[Void]]).

~~~text الناتج
بنبعت «اجتماع الساعة 3» لـ منى
~~~

---

## ٣. [[inout]] و [[&]]

~~~swift
func addBonus(to salary: inout Int, percent: Int) {
  salary += salary * percent / 100
}
var mySalary = 10_000
addBonus(to: &mySalary, percent: 15)
print(mySalary)
~~~

- الـ parameters العادية ثوابت جوه الدالة. [[inout]] قبل النوع بتقول: «الدالة هتعدّل القيمة، والتعديل يرجع للمتغير الأصلي».
- الحساب بالترتيب من الشمال: [[10000 * 15]] = 150000، [[/ 100]] = 1500، فـ [[salary += 1500]] = 11500. (لو كتبت [[percent / 100]] الأول، 15 / 100 في Int = صفر!)
- [[10_000]]: الـ [[_]] جوه الرقم للقراية بس = 10000.
- [[&mySalary]]: الـ [[&]] إجباري وانت بتنادي، عشان أي حد يقرا السطر يعرف إن المتغير ده هيتغير. ولازم [[var]].

~~~text الناتج
11500
~~~

ومن غير [[&]] (التجربة):

~~~text الناتج
main.swift:16:14: error: passing value of type 'Int' to an inout parameter requires explicit '&'
~~~

---

## ٤. [[minMax]]: ترجيع tuple بأسماء

~~~swift
func minMax(_ numbers: [Int]) -> (min: Int, max: Int) {
  var lo = numbers[0], hi = numbers[0]
  for n in numbers {
    lo = min(lo, n)
    hi = max(hi, n)
  }
  return (lo, hi)
}
let range = minMax([4, 9, 1, 7])
print(range.min, range.max)
~~~

- [[[Int]]]: array من Int.
- [[-> (min: Int, max: Int)]]: بترجّع tuple فيه قيمتين ليهم أسماء.
- [[numbers[0]]]: أول عنصر (الترقيم من 0). بنبدأ بيه الاتنين.
- [[min(lo, n)]] و [[max(hi, n)]]: دوال جاهزة بترجّع الأصغر والأكبر.
- [[return (lo, hi)]] والقيم بتتحط في [[min]] و [[max]] بالترتيب، وبعدين بنقراها [[range.min]].

| n | lo | hi |
|---|---|---|
| 4 | 4 | 4 |
| 9 | 4 | 9 |
| 1 | 1 | 9 |
| 7 | 1 | 9 |

~~~text الناتج
1 9
~~~

> لو بعتّ array فاضية، [[numbers[0]]] بيوقّع البرنامج. الأمان: [[numbers.min()]] اللي بترجّع optional.

---

## ٥. حل التجربة

~~~swift
func price(_ base: Double, discount: Double = 0) -> Double {
  base - base * discount / 100
}
print(price(200))
print(price(200, discount: 25))
~~~

~~~text الناتج
200.0
150.0
~~~

200 - 200 × 25 / 100 = 200 - 50 = 150. والناتج فيه [[.0]] لأنه Double.

---

## الخلاصة

| الشكل | النداء |
|---|---|
| [[func f(x: Int)]] | [[f(x: 1)]] |
| [[func f(_ x: Int)]] | [[f(1)]] |
| [[func f(to x: Int)]] | [[f(to: 1)]] وجوه الدالة [[x]] |
| [[func f(x: Int = 0)]] | [[f()]] أو [[f(x: 5)]] |
| [[func f(x: inout Int)]] | [[f(x: &v)]] و v لازم [[var]] |
| [[-> (a: Int, b: Int)]] | [[r.a]] و [[r.b]] |`,
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
  ]
});

// تكملة تاب swift: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/swift/01.js (شرح حقول الدرس في أوله)
MORE("swift", [
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
          teach: R`## الكود ده بيعمل إيه؟

ده الملف اللي Xcode بيعمله لوحده لما تعمل مشروع iOS جديد ([[TasksApp.swift]]). هو أول حاجة بتتنفذ في التطبيق: بيقول للنظام «اعمل شباك، وحط جواه أول شاشة [[ContentView]]».

> Xcode و الـ Simulator و SwiftUI شغالين على الماك بس، ومفيش ماك هنا. فخطوات Xcode والشاشات هنا من docs بتاعة Apple. الحتة الوحيدة اللي اتجربت بجد هي فكرة [[@main]] نفسها في Swift 6.4 على لينكس (Docker).

---

## ١. [[import SwiftUI]]

~~~swift
import SwiftUI
~~~

[[import]] بيجيب framework (مكتبة كبيرة من Apple) عشان تستخدم اللي فيها. و SwiftUI فيها [[App]] و [[Scene]] و [[WindowGroup]] و [[View]] وكل حاجة الواجهة محتاجاها. من غير السطر ده الـ compiler مش هيعرف يعني إيه [[App]].

---

## ٢. [[@main]]: من هنا البرنامج بيبدأ

~~~swift
// @main: هنا التطبيق بيبدأ
@main
~~~

السطر الأول تعليق ([[//]]) والـ compiler بيتجاهله. والتاني attribute (علامة [[@]] قبل اسم بتدّي الـ compiler معلومة زيادة عن اللي بعدها). [[@main]] معناها «النوع اللي جاي ده هو نقطة البداية». ولازم تبقى في مكان واحد بس في البرنامج كله.

عشان تشوف الفكرة من غير SwiftUI، ده برنامج Swift عادي (مش iOS) فيه [[@main]] على struct فيه دالة [[static func main()]]:

~~~swift
@main
struct TasksApp {
  static func main() {
    print("التطبيق بدأ من هنا")
  }
}
~~~

~~~bash
swiftc -parse-as-library main_attr.swift -o m && ./m
~~~

~~~text الناتج (Swift 6.4 على لينكس في Docker)
التطبيق بدأ من هنا
~~~

[[-parse-as-library]] بيقول للـ compiler «الملف ده مش script بيتنفذ من أول سطر، دور على [[@main]]». في Xcode ده بيحصل لوحده. والفرق في iOS إن [[App]] protocol هو اللي جواه [[main()]] جاهزة، فانت مش بتكتبها: بتكتب [[body]] بس.

---

## ٣. [[struct TasksApp: App]]

~~~swift
struct TasksApp: App {
~~~

- [[struct]]: نوع بتعمله انت (درس الـ structs).
- [[TasksApp]]: الاسم، Xcode بياخده من اسم المشروع + كلمة App.
- [[: App]]: الـ struct ده بيتبع protocol اسمه [[App]]. الـ protocol شرط: «أي حد بيتبعني لازم يكون عنده [[body]]».

---

## ٤. [[var body: some Scene]]

~~~swift
  var body: some Scene {
~~~

- [[var body]]: الـ property اللي [[App]] بيطلبها.
- [[some Scene]]: النوع اللي بيرجع «حاجة بتتبع [[Scene]]»، والـ compiler عارف هي إيه بالظبط بس انت مش مضطر تكتب اسمها (هتشوف [[some]] بالتفصيل في الدرس الجاي).
- **Scene** = حاجة النظام بيعرضها كشباك. على iPhone الشاشة كلها شباك واحد، وعلى iPad والماك ممكن تفتح كذا شباك من نفس التطبيق.

---

## ٥. [[WindowGroup { ContentView() }]]

~~~swift
    WindowGroup {
      ContentView()
    }
  }
}
~~~

- [[WindowGroup]]: الـ Scene العادي: «اعمل شباك (أو أكتر على iPad) وحط جواه ده».
- الأقواس [[{ }]] بعد اسمه closure: الكود اللي بيوصف المحتوى.
- [[ContentView()]]: بيعمل نسخة من أول شاشة. القوسين [[()]] = initializer من غير parameters.
- آخر ٣ أسطر قفلات: [[WindowGroup]] ثم [[body]] ثم الـ struct.

---

## ٦. المشروع في Xcode (من docs بتاعة Apple)

| الحاجة | مكانها | بتعمل إيه |
|---|---|---|
| Product Name + Organization Identifier | شاشة New Project | بيعملوا الـ Bundle ID: [[com.yourname.Tasks]] |
| Bundle Identifier | Target ← General | الـ ID الفريد للتطبيق، ومينفعش يتغير بعد النشر |
| Minimum Deployments | Target ← General | أقل iOS التطبيق بيشتغل عليه |
| Signing & Capabilities | Target | التوقيع والـ Team |
| [[Assets.xcassets]] | الملفات على الشمال | الصور والألوان والأيقونة |
| الـ Canvas | يمين الكود | بيعرض [[#Preview]] ([[Cmd+Option+Enter]]) |

والتشغيل: تختار Simulator من فوق وتدوس [[Cmd+R]]، و [[Cmd+.]] بيوقف.

---

## الخلاصة

- التطبيق بيبدأ من النوع اللي عليه [[@main]]، وده في iOS struct بيتبع [[App]].
- [[App]] بيطلب [[body]] بترجّع Scenes، و [[WindowGroup]] هو الشباك اللي جواه أول View.
- الـ Bundle ID اسم التطبيق في العالم كله، فاختاره صح من الأول.`,
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
          teach: R`## الكود ده بيعمل إيه؟

بيعمل View اسمه [[ProfileCard]]: كارت فيه أيقونة شخص زرقا، وتحتها الاسم بخط عريض، وتحته الوظيفة بلون باهت. وفي الآخر [[#Preview]] بيعرض الكارت في الـ Canvas بتاع Xcode ببيانات تجريبية.

> SwiftUI و الـ Canvas شغالين على الماك بس، فشكل الكارت هنا من docs بتاعة Apple. اللي اتجرّب بجد في Swift 6.4 على لينكس (Docker): الـ memberwise init، وفكرة [[some]] اللي بتخبي نوع طويل.

---

## ١. الـ View نفسه: struct بيتبع [[View]]

~~~swift
struct ProfileCard: View {
  let name: String
  let role: String
~~~

- [[struct ProfileCard]]: نوع جديد. كل شاشة أو حتة من شاشة في SwiftUI struct.
- [[: View]]: بيتبع protocol [[View]]. الشرط الوحيد اللي الـ protocol بيطلبه: property اسمها [[body]].
- [[let name: String]] و [[let role: String]]: البيانات اللي الكارت محتاجها من برة. [[let]] لأن الكارت بيعرضها بس ومش بيغيّرها.

ولأنه struct، Swift بتعمله initializer لوحدها بنفس أسامي الـ properties (اسمه memberwise init). جرّبنا ده من غير SwiftUI:

~~~swift
struct ProfileCard {
  let name: String
  let role: String
}
let card = ProfileCard(name: "سارة", role: "iOS Developer")
print(card)
~~~

~~~text الناتج (Swift 6.4، لينكس)
ProfileCard(name: "سارة", role: "iOS Developer")
~~~

ونفس الـ init ده اللي بيتنادى في الـ Preview: [[ProfileCard(name: "سارة", role: "iOS Developer")]].

---

## ٢. [[var body: some View]]

~~~swift
  var body: some View {
~~~

[[body]] بترجّع الواجهة. والنوع [[some View]] معناه «نوع واحد محدد بيتبع View، والـ compiler عارفه، بس مش هكتب اسمه». ليه؟ لأن الاسم الحقيقي بيبقى طويل جدًا، زي [[VStack<TupleView<(...)>>]] وفيه كل modifier اتحط.

نفس الفكرة بالظبط ينفع تشوفها في Swift عادي من غير SwiftUI. الدالة دي بترجّع [[some Sequence<Int>]]، وبعدين بنطبع النوع الحقيقي:

~~~swift
func evens() -> some Sequence<Int> {
  (1...10).lazy.filter { $0 % 2 == 0 }.map { $0 * 10 }
}
let s = evens()
print(type(of: s))
print(Array(s))
~~~

~~~text الناتج (Swift 6.4، لينكس)
LazyMapSequence<LazyFilterSequence<ClosedRange<Int>>, Int>
[20, 40, 60, 80, 100]
~~~

شايف الاسم؟ كل خطوة ([[filter]] ثم [[map]]) لفّت اللي قبلها في نوع جديد. وده اللي بيحصل في SwiftUI مع كل [[.font]] و [[.padding]]. [[some]] بتريحك من كتابته، والـ compiler لسه عارفه بالظبط (مش زي [[any]] اللي بيخبي النوع وقت التشغيل).

---

## ٣. [[VStack(spacing: 8)]]

~~~swift
    VStack(spacing: 8) {
~~~

[[VStack]] بيرص اللي جواه فوق بعض (V = vertical). و [[spacing: 8]] مسافة ٨ points بين كل عنصر والتاني (الـ point وحدة iOS، مش pixel: على شاشة Retina الـ point = ٢ أو ٣ pixels). والـ Views اللي جوه الأقواس بتتكتب ورا بعض من غير فواصل ومن غير [[return]]، لأن [[body]] جواها result builder ([[@ViewBuilder]]) بيجمعهم.

---

## ٤. الأيقونة

~~~swift
      Image(systemName: "person.crop.circle.fill")
        .font(.system(size: 56))
        .foregroundStyle(.blue)
~~~

- [[Image(systemName:)]]: أيقونة من SF Symbols، مكتبة أيقونات Apple الجاهزة. الاسم [[person.crop.circle.fill]] = شخص جوه دايرة مليانة. تقدر تدوّر على الأسامي في تطبيق SF Symbols المجاني.
- [[.font(.system(size: 56))]]: الأيقونات دي بتتعامل كأنها حروف، فحجمها بيتحدد بالـ font. ٥٦ point.
- [[.foregroundStyle(.blue)]]: لونها. [[.blue]] اختصار [[Color.blue]]: النقطة كفاية لأن Swift عارفة النوع المطلوب.

كل سطر بيبدأ بنقطة ده **modifier**: بياخد الـ View اللي قبله ويرجّع View جديد (درس الـ modifiers).

---

## ٥. النصين

~~~swift
      Text(name)
        .font(.title2.bold())
      Text(role)
        .foregroundStyle(.secondary)
    }
    .padding()
  }
}
~~~

- [[Text(name)]]: نص بقيمة الـ property.
- [[.title2.bold()]]: خط من أحجام iOS الجاهزة ([[.title2]] أصغر من [[.title]])، و [[.bold()]] عريض. الأحجام الجاهزة دي بتكبر وتصغر مع إعداد حجم الخط عند المستخدم (Dynamic Type).
- [[.secondary]]: رمادي باهت بيتظبط لوحده في الوضع الليلي.
- القوس المعقوف اللي بعد النص التاني بيقفل الـ VStack، وبعدها [[.padding()]] على الـ VStack كله: مسافة حوالين الكارت (من غير رقم، SwiftUI بتختار مسافة افتراضية مناسبة للجهاز).

---

## ٦. [[#Preview]]

~~~swift
#Preview {
  ProfileCard(name: "سارة", role: "iOS Developer")
}
~~~

[[#]] في Swift قبل اسم يعني **macro**: كود بيتولد وقت الـ compile (مش تعليق زي Python). [[#Preview]] بيعرض اللي جواه في الـ Canvas على يمين Xcode، وبيتحدث كل ما تعدّل. ومش بيدخل في التطبيق اللي بينزل للمستخدم.

---

## الـ solCode

الحل بيضيف [[let city: String]] وسطر [[Text(city).font(.caption)]]، فالـ memberwise init بقى محتاج [[city:]] كمان. و [[#Preview("كارتين")]] اسم للـ preview عشان لو عندك أكتر من واحد، وجواه [[VStack]] فيه كارتين.

| الحتة | معناها |
|---|---|
| [[struct X: View]] | View جديد |
| [[var body: some View]] | الواجهة، بنوع محدد مخفي |
| [[VStack(spacing:)]] | فوق بعض بمسافة |
| [[Image(systemName:)]] | أيقونة SF Symbol |
| [[.font]] / [[.foregroundStyle]] | حجم ولون |
| [[#Preview]] | macro للعرض في الـ Canvas |

## الخلاصة

- كل View struct صغير فيه [[body]]. الـ [[body]] وصف للشاشة من البيانات، و SwiftUI بترسمه.
- [[some View]] = «نوع واحد معروف للـ compiler، بس طويل فمش هكتبه».
- [[#]] = macro، و [[//]] = تعليق.`,
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
          teach: R`## الكود ده بيعمل إيه؟

بيعمل صف طلب زي اللي في تطبيقات التوصيل: على البداية مربع برتقالي عليه رقم صغير في الركن (عدد المنتجات)، وجنبه عمود فيه رقم الطلب والتفاصيل، وفي آخر السطر السعر.

> الـ layout ده SwiftUI، وبيترسم على الماك بس (Xcode Canvas أو Simulator)، فالشكل والسلوك هنا من docs بتاعة Apple، مش متجرّب.

الشكل اللي بيطلع (في اتجاه إنجليزي، من الشمال لليمين):

~~~text شكل الصف
[مربع برتقالي ③]  طلب #1042                    450 ج
                  3 منتجات · جاري التوصيل
~~~

---

## ١. الصف كله: [[HStack(alignment: .top, spacing: 12)]]

~~~swift
struct OrderRow: View {
  var body: some View {
    HStack(alignment: .top, spacing: 12) {
~~~

- [[HStack]]: H = horizontal، بيرص اللي جواه جنب بعض. فيه ٤ حاجات: الـ ZStack، والـ VStack، والـ Spacer، ونص السعر.
- [[alignment: .top]]: العناصر مختلفة في الطول (المربع ٥٦ والنصوص أقصر)، فبنقول «حاذيهم من فوق». الافتراضي [[.center]].
- [[spacing: 12]]: ١٢ point بين كل عنصر والتاني.

---

## ٢. المربع والرقم: [[ZStack]]

~~~swift
      ZStack(alignment: .bottomTrailing) {
        RoundedRectangle(cornerRadius: 12)
          .fill(.orange.gradient)
          .frame(width: 56, height: 56)
        Text("3")
          .font(.caption.bold())
          .padding(4)
          .background(.white, in: .circle)
      }
~~~

- [[ZStack]]: طبقات فوق بعض (Z = العمق). أول حاجة تحت، وكل اللي بعدها فوقها.
- [[alignment: .bottomTrailing]]: حط الطبقات في الركن التحتاني عند **نهاية السطر**. ([[trailing]] = نهاية السطر، و [[leading]] = بدايته، فبيتقلبوا لوحدهم في العربي.)
- [[RoundedRectangle(cornerRadius: 12)]]: مستطيل زواياه مدورة بنص قطر ١٢.
- [[.fill(.orange.gradient)]]: لوّنه بتدرج خفيف من البرتقالي.
- [[.frame(width: 56, height: 56)]]: حجم ثابت ٥٦×٥٦. من غيره الشكل هياخد كل المساحة المعروضة عليه.
- [[Text("3")]] بخط صغير عريض، و [[.padding(4)]] مسافة ٤ حواليه، و [[.background(.white, in: .circle)]] خلفية بيضا على شكل دايرة. فبيبقى رقم جوه دايرة بيضا في ركن المربع.

---

## ٣. النصوص: [[VStack(alignment: .leading, spacing: 4)]]

~~~swift
      VStack(alignment: .leading, spacing: 4) {
        Text("طلب #1042")
          .font(.headline)
        Text("3 منتجات · جاري التوصيل")
          .font(.subheadline)
          .foregroundStyle(.secondary)
      }
~~~

- [[alignment: .leading]]: النصين بيبدأوا من نفس النقطة (بداية السطر). من غيرها الأقصر بيتوسّط تحت الأطول.
- [[.headline]] و [[.subheadline]]: أحجام iOS الجاهزة، والتاني أصغر. و [[.secondary]] لون باهت.
- [[#]] جوه [[Text("طلب #1042")]] حرف عادي في نص، مش macro.

---

## ٤. [[Spacer()]] والسعر

~~~swift
      Spacer()
      Text("450 ج")
        .font(.headline)
    }
    .padding()
  }
}
~~~

- [[Spacer()]]: View فاضي بياخد **كل** المساحة الفاضية. فبيزق السعر لآخر السطر.
- [[.padding()]] بعد قفلة الـ HStack: مسافة حوالين الصف كله.

ليه الـ Spacer بيعمل كده؟ قاعدة الـ layout في SwiftUI ٣ خطوات:

| الخطوة | مين | بيعمل إيه |
|---|---|---|
| ١ | الأب ([[HStack]]) | بيعرض على كل ابن مساحة |
| ٢ | الابن | بيختار حجمه: [[Text]] على قد النص، و [[frame]] الثابت ٥٦، و [[Spacer]] أي حاجة تتبقى |
| ٣ | الأب | بيحط كل ابن في مكانه حسب الـ alignment |

---

## ٥. الـ try والـ solCode

~~~swift
#Preview {
  OrderRow()
    .environment(\.layoutDirection, .rightToLeft)
}
~~~

[[.environment(\.layoutDirection, .rightToLeft)]] بيحط قيمة في الـ environment (إعدادات بتنزل لكل الـ Views اللي تحت). [[\.layoutDirection]] key path (عنوان خانة جوه الـ environment) لاتجاه الكتابة، و [[.rightToLeft]] = عربي. ولأن الكود كله [[leading]] و [[trailing]]، الصف بيتقلب لوحده: المربع على اليمين والسعر على الشمال.

| النوع | بيرص إزاي | مثال |
|---|---|---|
| [[HStack]] | جنب بعض | صف |
| [[VStack]] | فوق بعض | عمود، شاشة |
| [[ZStack]] | طبقات | badge على صورة |
| [[Spacer]] | بياخد الفاضي | يزق للأطراف |

## الخلاصة

- اقرا الـ layout كصناديق جوه صناديق: HStack فيه ZStack و VStack و Spacer.
- [[leading]] و [[trailing]] مش شمال ويمين، فالتطبيق بيشتغل عربي من غير تعديل.
- [[Spacer]] بياخد الفاضي، و [[frame]] الثابت بيحدد الحجم، و [[Text]] على قد محتواه.`,
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
          teach: R`## الكود ده بيعمل إيه؟

٣ نصوص فوق بعض على خلفية سودا: الأول [[padding]] قبل [[background]]، والتاني العكس، والتالت بـ modifier عملناه احنا اسمه [[cardStyle()]]. الهدف إنك تشوف بعينك إن **ترتيب الـ modifiers بيغيّر الشكل**.

> الرسم نفسه SwiftUI على الماك بس، فالشكل هنا من docs بتاعة Apple. لكن فكرة «كل modifier بيلف اللي قبله في نوع جديد» جرّبناها بجد في Swift 6.4 على لينكس بـ stand-in صغير (أنواع عملناها بإيدنا بنفس أسامي SwiftUI، مش SwiftUI الحقيقية).

---

## ١. يعني إيه modifier بيلف الـ View؟

[[Text("x").padding()]] مش بيعدّل الـ Text. ده بيعمل View جديد جواه الـ Text ومعاه مسافة. عملنا نسخة صغيرة من الفكرة دي:

~~~swift
protocol View {}
struct Text: View { let s: String; init(_ s: String) { self.s = s } }
struct Padding<Content: View>: View { let content: Content }
struct Background<Content: View>: View { let content: Content; let color: String }
extension View {
  func padding() -> Padding<Self> { Padding(content: self) }
  func background(_ c: String) -> Background<Self> { Background(content: self, color: c) }
}
let a = Text("x").padding().background("blue")
let b = Text("x").background("blue").padding()
print(type(of: a))
print(type(of: b))
~~~

~~~text الناتج (Swift 6.4، لينكس)
Background<Padding<Text>>
Padding<Background<Text>>
~~~

- [[Padding<Content>]]: النوع بين [[< >]] generic: «Padding لأي View جواه».
- [[Self]] (بـ S كبيرة) = النوع اللي الدالة اتنادت عليه.
- [[type(of:)]] بيطبع النوع الحقيقي.

اقرا الناتج من برة لجوه: الأول **خلفية** حوالين **(مسافة حوالين النص)**، فالخلفية بتغطي المسافة. والتاني **مسافة** حوالين **(خلفية حوالين النص)**، فالخلفية على قد النص والمسافة فاضية براها. SwiftUI الحقيقية بتعمل نفس الحكاية بأنواع زي [[ModifiedContent<Text, _PaddingLayout>]].

---

## ٢. أول نصين في المثال

~~~swift
      Text("padding قبل background")
        .padding()
        .background(.blue)
      Text("background قبل padding")
        .background(.blue)
        .padding()
~~~

| النص | الترتيب | الشكل |
|---|---|---|
| الأول | مسافة ثم خلفية | مستطيل أزرق كبير والنص جواه |
| التاني | خلفية ثم مسافة | أزرق على قد الحروف، وحواليه فراغ |

---

## ٣. التالت: [[cardStyle()]]

~~~swift
      Text("كارت")
        .cardStyle()
~~~

دي مش دالة من SwiftUI. احنا عملناها تحت في extension:

~~~swift
extension View {
  func cardStyle() -> some View {
    padding(16)
      .frame(maxWidth: .infinity)
      .background(.indigo, in: .rect(cornerRadius: 16))
      .shadow(radius: 4, y: 2)
  }
}
~~~

- [[extension View]]: بنضيف دالة لكل الأنواع اللي بتتبع [[View]]، فأي View يقدر يكتب [[.cardStyle()]].
- [[-> some View]]: بترجّع View نوعه طويل ومخفي، زي [[body]].
- [[padding(16)]] من غير نقطة: احنا جوه الـ extension، فده [[self.padding(16)]]. مسافة ١٦ point.
- [[.frame(maxWidth: .infinity)]]: كبّر العرض لأقصى حاجة متاحة. [[.infinity]] = مالانهاية.
- [[.background(.indigo, in: .rect(cornerRadius: 16))]]: خلفية بنفسجي غامق في شكل مستطيل بزوايا مدورة (الشكل ده من iOS 17).
- [[.shadow(radius: 4, y: 2)]]: ظل ناعم بنص قطر ٤، ومزاح ٢ لتحت.

والترتيب هنا مقصود: الـ frame العريض **قبل** الخلفية، فالخلفية بتاخد العرض كله. ولو نقلت [[.frame]] بعد [[.background]] (الـ try)، الخلفية بتتعمل على قد النص والمسافة بس، والـ frame العريض بيبقى شفاف حواليها.

---

## ٤. modifiers على الـ VStack كله

~~~swift
    VStack(spacing: 24) {
      ...
    }
    .font(.headline)
    .foregroundStyle(.white)
    .padding()
    .background(.black)
~~~

فيه نوعين modifiers:

| النوع | أمثلة | بيعمل إيه |
|---|---|---|
| بيلف الـ View | [[padding]] [[background]] [[frame]] [[shadow]] | طبقة جديدة حوالين اللي قبله |
| بيحط قيمة في الـ environment | [[font]] [[foregroundStyle]] [[tint]] | القيمة بتنزل لكل الأولاد |

فـ [[.font(.headline)]] و [[.foregroundStyle(.white)]] على الـ VStack بيوصلوا لكل النصوص التلاتة. ولو حطيت [[.font(.caption)]] على نص واحد (الـ try)، هو بس اللي يصغر، لأن النص بياخد أقرب قيمة ليه.

---

## الخلاصة

- كل modifier = طبقة جديدة حوالين اللي قبله. اقرا السلسلة من فوق لتحت: كل سطر بيلف اللي فوقه.
- [[padding]] قبل [[background]] = الخلفية بتغطي المسافة. والعكس = المسافة برة الخلفية.
- الـ modifiers اللي بتتكرر اعملها مرة واحدة في [[extension View]].`,
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
          teach: R`## الكود ده بيعمل إيه؟

شاشة قايمة مهام فيها قسمين: «مستعجل» بيعرض المهام المستعجلة بس بأيقونة نار، و «الكل» بيعرض كل المهام وتقدر تمسح منه بالـ swipe.

> [[List]] و [[ForEach]] و [[Section]] و [[.onDelete]] SwiftUI على الماك بس، فشكلهم هنا من docs بتاعة Apple. اللي اتجرّب بجد في Swift 6.4 على لينكس: الـ struct و [[UUID]] والفلترة و [[IndexSet]] و [[firstIndex(where:)]] (الداتا من غير الواجهة).

---

## ١. العنصر: [[TaskItem: Identifiable]]

~~~swift
struct TaskItem: Identifiable {
  let id = UUID()
  var title: String
  var isUrgent: Bool
}
~~~

- [[Identifiable]]: protocol بيطلب property واحدة اسمها [[id]] تكون فريدة. SwiftUI بتستخدمها عشان تعرف كل صف «هو مين» لما القايمة تتغير.
- [[UUID()]]: Universally Unique Identifier، رقم عشوائي ١٢٨ bit احتمال تكراره تقريبًا صفر. [[let]] عشان الـ id ميتغيرش أبدًا.
- [[var]] للعنوان والاستعجال لأنهم ممكن يتغيروا.

ده شكل الـ id لما طبعناه:

~~~text الناتج (Swift 6.4، لينكس)
A149415B-D635-4210-A65C-5B134FB2777D
~~~

---

## ٢. الداتا: [[@State private var tasks]]

~~~swift
  @State private var tasks = [
    TaskItem(title: "رد على الإيميلات", isUrgent: true),
    TaskItem(title: "اشتري لبن", isUrgent: false),
    TaskItem(title: "ذاكر SwiftUI", isUrgent: true),
  ]
~~~

[[@State]] عشان القايمة هتتغير (بالمسح)، والشاشة لازم تتحدث لما تتغير (الدرس الجاي بيشرحه بالتفصيل). والفاصلة بعد آخر عنصر مسموحة في Swift.

---

## ٣. [[List]] و [[Section]]

~~~swift
    List {
      Section("مستعجل") {
~~~

[[List]] قايمة بتسكرول بشكل iOS (زي الإعدادات)، وبتعمل الصفوف اللي ظاهرة بس. و [[Section("مستعجل")]] جزء من القايمة بعنوان فوقه.

---

## ٤. [[ForEach(tasks.filter(\.isUrgent))]]

~~~swift
        ForEach(tasks.filter(\.isUrgent)) { task in
          Label(task.title, systemImage: "flame")
        }
~~~

من جوه لبرة:

- [[\.isUrgent]]: key path: «الخانة [[isUrgent]] في كل عنصر». الـ [[\]] بتبدأ الـ key path.
- [[tasks.filter(\.isUrgent)]]: array جديدة فيها العناصر اللي [[isUrgent]] بتاعتها [[true]] بس.

~~~swift
print(tasks.filter(\.isUrgent).map(\.title))
~~~

~~~text الناتج
["رد على الإيميلات", "ذاكر SwiftUI"]
~~~

- [[ForEach(...) { task in ... }]]: لكل عنصر اعمل View. [[task in]] اسم العنصر جوه الـ closure. ومش محتاج [[id:]] لأن العناصر [[Identifiable]].
- [[Label(task.title, systemImage: "flame")]]: نص وأيقونة نار جنب بعض بالشكل القياسي.

---

## ٥. القسم التاني والمسح: [[.onDelete]]

~~~swift
      Section("الكل") {
        ForEach(tasks) { task in
          Text(task.title)
        }
        .onDelete { offsets in
          tasks.remove(atOffsets: offsets)
        }
      }
~~~

- [[.onDelete]] على الـ [[ForEach]] (مش على الـ [[List]]) بيفعّل الـ swipe للمسح في القسم ده بس.
- [[offsets]] نوعه [[IndexSet]]: مجموعة أرقام أماكن (indexes) العناصر اللي اتمسحت. لو مسحت التاني، فيها [[1]] (العد من صفر).
- [[tasks.remove(atOffsets:)]] بتمسحهم من الـ state، والقايمة بتتحدث بـ animation.

[[remove(atOffsets:)]] دي **من SwiftUI** مش من Swift نفسها. لما جربناها على لينكس (Foundation من غير SwiftUI) طلع:

~~~text الناتج (Swift 6.4، لينكس)
error: incorrect argument label in call (have 'atOffsets:', expected 'at:')
~~~

فعشان نشوف اللي بيحصل للداتا، عملنا نفس الخطوة بإيدنا:

~~~swift
let offsets = IndexSet([1])
for i in offsets.sorted(by: >) { tasks.remove(at: i) }
print(tasks.map(\.title))
~~~

~~~text الناتج
["رد على الإيميلات", "ذاكر SwiftUI"]
~~~

بنمسح من الأكبر للأصغر ([[sorted(by: >)]]) عشان مسح عنصر بيزحزح أرقام اللي بعده.

---

## ٦. الـ solCode: [[firstIndex(where:)]] و [[toggle()]]

~~~swift
if let i = tasks.firstIndex(where: { $0.id == task.id }) {
  tasks[i].isUrgent.toggle()
}
~~~

- [[firstIndex(where:)]]: أول مكان العنصر فيه بيحقق الشرط، أو [[nil]] لو مش موجود. [[$0]] = العنصر الحالي.
- بنقارن بالـ [[id]] مش بالعنوان، لأن ممكن مهمتين ليهم نفس العنوان.
- [[toggle()]] بيقلب الـ Bool.

على القايمة بعد المسح:

~~~text الناتج
1 ذاكر SwiftUI false
~~~

يعني لقاها في المكان [[1]] وقلب [[isUrgent]] من [[true]] لـ [[false]]. و [[.swipeActions(edge: .leading)]] بيحط الزرار على بداية السطر، و [[.tint(.orange)]] لونه.

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [[Identifiable]] + [[id]] | SwiftUI تعرف كل صف مين |
| [[List]] | قايمة بتسكرول بشكل iOS |
| [[ForEach]] | View لكل عنصر |
| [[.onDelete]] | المسح بالـ swipe، وبيدّيك [[IndexSet]] |
| [[firstIndex(where:)]] | تلاقي مكان عنصر بالـ id |

- الـ id لازم يكون ثابت وفريد. متستخدمش الـ index كـ id.
- الـ offsets اللي جاية من قايمة متفلترة بتاعة المتفلترة مش الأصلية.`,
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
    }
]);

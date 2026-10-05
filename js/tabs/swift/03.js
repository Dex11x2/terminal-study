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
    }
]);

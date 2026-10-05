// تكملة تاب swift: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/swift/01.js (شرح حقول الدرس في أوله)
MORE("swift", [
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
    }
]);

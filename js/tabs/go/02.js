// تكملة تاب go: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/go/01.js (شرح حقول الدرس في أوله)
MORE("go", [
    {
      t: "التحكم والدوال",
      l: 1,
      n: "if بجملة تمهيدية، و for الـ loop الوحيدة، و switch من غير break، والدوال اللي بترجّع أكتر من قيمة، والـ closures",
      items: [
        {
          cmd: "if و for",
          title: "if بجملة تمهيدية، و for هي الـ loop الوحيدة في Go",
          desc: R`[[if]] في Go من غير أقواس حوالين الشرط، والـ [[{ }]] إجبارية حتى لو سطر واحد. والشرط لازم يبقى bool فعلًا: [[if count]] مش مسموحة، اكتب [[if count > 0]].

و if ممكن يبقى فيها جملة تمهيدية قبل الشرط مفصولة بـ [[;]]:
[[if n, err := strconv.Atoi(s); err != nil { ... }]]
المتغيرات n و err موجودة جوه الـ if والـ else بتوعها بس، وده بيخلي الكود نضيف ومفيش متغيرات سايبة. [[!=]] معناها «لا يساوي».

Go فيها loop واحدة بس: [[for]]، وبتتكتب بكذا شكل:
• الكلاسيكي: [[for i := 0; i < 3; i++ { }]]. [[i++]] بتزوّد واحد.
• زي while: [[for balance > 30 { }]].
• للأبد: [[for { }]] وتخرج بـ [[break]] أو [[return]].
• [[for i, v := range items { }]]: على slice أو map أو string أو channel. i المكان و v القيمة، ولو مش عايز المكان: [[for _, v := range items]].
• على رقم (Go 1.22+): [[for i := range 10]] من 0 لـ 9.

[[continue]] بتنط للّفة اللي بعدها، و [[break]] بتخرج من الـ loop.`,
          example: R`package main

import (
  "fmt"
  "strconv"
)

func main() {
  if n, err := strconv.Atoi("15"); err != nil {
    fmt.Println("مش رقم:", err)
  } else if n%2 == 0 {
    fmt.Println(n, "زوجي")
  } else {
    fmt.Println(n, "فردي")
  }

  for i := 0; i < 3; i++ {
    fmt.Print(i, " ")
  }
  fmt.Println()

  balance := 100
  for balance > 30 {
    balance -= 40
  }
  fmt.Println("balance:", balance)

  prices := []int{50, 0, 120, 300, 80}
  for i, p := range prices {
    if p == 0 {
      continue
    }
    if p > 200 {
      break
    }
    fmt.Println(i, p)
  }

  for i := range 3 {
    fmt.Print(i*i, " ")
  }
  fmt.Println()
}`,
          try: R`اكتب FizzBuzz: من 1 لـ 15، اطبع Fizz لو الرقم بيقبل القسمة على 3، و Buzz على 5، و FizzBuzz على الاتنين، وإلا الرقم نفسه. وبعدين اكتب loop تدوّر على أول رقم في [[[]int{3, 8, 12, 7}]] أكبر من 10 وتطبعه وتخرج.`,
          flag: "script",
          deep: {
            why: R`loop واحدة بأشكال مختلفة أسهل من while و do-while و for و foreach. والجملة التمهيدية في if هي اللي بتخلي نمط [[if err := f(); err != nil]] مقروء في كل كود Go.`,
            how: R`[[range]] على slice بيدّيك نسخة من كل عنصر في v، فلو عدّلت v العنصر الأصلي مش بيتغيّر. لو عايز تعدّل اكتب [[items[i] = ...]].

من Go 1.22 كل لفّة في الـ loop ليها متغير i جديد. قبل كده كان متغير واحد بيتعاد استخدامه، وده كان بيعمل bug مشهور مع الـ goroutines والـ closures (كلهم يشوفوا آخر قيمة). لو شغال على مشروع go.mod بتاعه أقدم من 1.22 السلوك القديم لسه موجود.

[[break]] جوه switch أو select جوه for بيخرج من الـ switch بس مش الـ for. للخروج من الـ for حط label: [[outer: for ... { ... break outer }]].

[[fmt.Print]] زي Println بس من غير سطر جديد، وبتحط مسافة بين القيم بس لو الاتنين مش نصوص.`,
            when: R`[[for range]] على أي مجموعة. الكلاسيكي لما محتاج تتحكم في الخطوة أو الاتجاه. [[for {}]] للـ workers والسيرفرات اللي بتستنى شغل.`,
            mistakes: R`تحط أقواس [[if (x > 0)]]: بتشتغل بس go fmt بيشيلها. تعدّل v جوه range وتستغرب إن الـ slice متغيّرش. و [[break]] جوه switch جوه for وانت فاكر إنه خرج من الـ for. و [[for i := 0; i < len(s); i++]] وانت بتمسح من s جوه الـ loop.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            "strconv.",
            "قفلة.",
            "main.",
            R`جملة تمهيدية بتحوّل النص، وبعد [[;]] الشرط: لو فيه error.`,
            "مش هيتنفذ: 15 رقم.",
            R`[[%]] باقي القسمة: زوجي لو الباقي صفر.`,
            "مش هنا.",
            R`[[else]]: لا ده ولا ده.`,
            "15 فردي.",
            "قفلة. n و err مش موجودين بعد السطر ده.",
            R`الشكل الكلاسيكي: بداية؛ شرط؛ خطوة.`,
            R`[[Print]] من غير سطر جديد.`,
            "قفلة.",
            "سطر جديد.",
            "رصيد.",
            "زي while: طول ما الشرط صح.",
            R`[[-=]] اطرح وخزّن: 100 ثم 60 ثم 20.`,
            "قفلة.",
            "20.",
            "slice أرقام.",
            "range: المكان والقيمة.",
            "لو صفر...",
            "...نط للّفة اللي بعدها.",
            "قفلة.",
            "لو أكبر من 200...",
            "...اخرج من الـ loop كلها (فـ 80 مش هيتطبع).",
            "قفلة.",
            "اطبع.",
            "قفلة الـ range.",
            "range على رقم: 0 و 1 و 2.",
            "اطبع المربع.",
            "قفلة.",
            "سطر جديد.",
            "قفلة main."
          ],
          sol: R`الناتج:
[[15 فردي]]
[[0 1 2 ]]
[[balance: 20]]
[[0 50]]
[[2 120]]
[[0 1 4 ]]

لاحظ إن 300 وقّفت الـ loop فـ 80 مطبعتش. وفي FizzBuzz (الكود تحت) الترتيب مهم: شرط الـ 15 الأول، وإلا 15 هتطلع Fizz بس. والتاني بيطبع [[12]].`,
          solCode: R`for i := 1; i <= 15; i++ {
  switch {
  case i%15 == 0:
    fmt.Println("FizzBuzz")
  case i%3 == 0:
    fmt.Println("Fizz")
  case i%5 == 0:
    fmt.Println("Buzz")
  default:
    fmt.Println(i)
  }
}

for _, n := range []int{3, 8, 12, 7} {
  if n > 10 {
    fmt.Println(n)
    break
  }
}`
        },
        {
          cmd: "switch",
          title: "switch في Go: كل case بيخرج لوحده، ومن غير قيمة بيبقى بديل if-else",
          desc: R`[[switch]] في Go أبسط من C و JavaScript:
• كل [[case]] بيخرج لوحده بعد ما يخلص، فمفيش [[break]] تنساها.
• أكتر من قيمة في نفس الـ case بفاصلة: [[case "fri", "sat":]].
• [[default]] لو ولا case نفع.
• [[switch]] من غير قيمة خالص بيقيّم كل case كشرط bool، وده أنضف من سلسلة [[else if]] طويلة.
• ممكن جملة تمهيدية زي if: [[switch x := f(); x { ... }]].

ولو عايز تكمّل للـ case اللي بعده بقصد فيه كلمة [[fallthrough]]، بس نادرًا ما هتحتاجها.

وفيه نوع تالت اسمه type switch ([[switch v := x.(type)]]) هتشوفه في درس الـ interfaces.`,
          example: R`package main

import "fmt"

func grade(score int) string {
  switch {
  case score >= 85:
    return "امتياز"
  case score >= 65:
    return "جيد"
  case score >= 50:
    return "مقبول"
  default:
    return "راسب"
  }
}

func httpClass(code int) string {
  switch code / 100 {
  case 2:
    return "success"
  case 3:
    return "redirect"
  case 4, 5:
    return "error"
  }
  return "unknown"
}

func main() {
  day := "fri"
  switch day {
  case "fri", "sat":
    fmt.Println("أجازة")
  case "sun":
    fmt.Println("أول الأسبوع")
  default:
    fmt.Println("يوم شغل")
  }

  fmt.Println(grade(90), grade(70), grade(10))
  fmt.Println(httpClass(201), httpClass(404), httpClass(503), httpClass(100))
}`,
          try: R`اكتب دالة [[shipping(total int, city string) int]]: لو الطلب 1000 أو أكتر يبقى 0، ولو المدينة "cairo" أو "giza" يبقى 30، وغير كده 60. اكتبها بـ switch من غير قيمة، وجرّبها على [[(1200, "aswan")]] و [[(300, "giza")]] و [[(300, "aswan")]].`,
          flag: "script",
          deep: {
            why: R`أشهر bug في switch بتاع C و JS إنك تنسى break فالـ case اللي بعده يتنفذ. Go عكست الافتراض: الخروج هو الطبيعي، والكمّلة لازم تطلبها بكلمة صريحة.`,
            how: R`الـ cases بتتقيّم من فوق لتحت، وأول واحد يطابق بيكسب. في grade الترتيب مهم: لو حطيت [[score >= 50]] الأول، الـ 90 هتطلع «مقبول».

[[switch code / 100]]: التعبير بيتحسب مرة واحدة (404 / 100 = 4 لأنها قسمة int) وبعدين يتقارن بكل case.

في httpClass لو مفيش case طابق ومفيش default، الـ switch بيخلص من غير ما يعمل حاجة والكود بيكمّل لـ [[return "unknown"]]. والدالة اللي بترجّع قيمة لازم يبقى فيه return في كل طريق، وإلا [[missing return]].

[[fallthrough]] بتنفّذ جسم الـ case اللي بعده من غير ما تفحص شرطه، ولازم تبقى آخر سطر في الـ case.`,
            when: R`switch بقيمة لما بتقارن متغير واحد بقيم ثابتة (أيام، أنواع رسايل، أكواد). switch من غير قيمة لما الشروط نطاقات أو مختلفة. و if-else لو هما فرعين بس.`,
            mistakes: R`تكتب [[break]] في آخر كل case من عادة C (مش غلط بس مالوش لازمة). وترتيب cases غلط (الأوسع قبل الأضيق). وتستخدم [[break]] جوه switch جوه for وانت عايز تخرج من الـ for: محتاج label.`
          },
          lines: [
            "باكدج main.",
            "import fmt.",
            "دالة بتاخد int وترجّع string.",
            "switch من غير قيمة: كل case شرط.",
            "الأعلى الأول.",
            "return بتخرج من الدالة كلها.",
            "شرط تاني.",
            "جيد.",
            "تالت.",
            "مقبول.",
            "ولا حاجة نفعت.",
            "راسب.",
            "قفلة الـ switch.",
            "قفلة الدالة.",
            "دالة تانية.",
            R`switch على قيمة محسوبة: 404 / 100 = 4.`,
            "2xx.",
            "نجاح.",
            "3xx.",
            "تحويل.",
            "قيمتين في نفس الـ case.",
            "خطأ.",
            "قفلة: من غير default.",
            "لو ولا case طابق.",
            "قفلة.",
            "main.",
            "اليوم.",
            "switch على قيمة نصية.",
            "الجمعة أو السبت.",
            "بيتنفذ، والـ switch بيخلص هنا من غير break.",
            "الأحد.",
            "مش هنا.",
            "أي يوم تاني.",
            "مش هنا.",
            "قفلة.",
            "امتياز جيد راسب.",
            "success error error unknown.",
            "قفلة."
          ],
          sol: R`الناتج:
[[أجازة]]
[[امتياز جيد راسب]]
[[success error error unknown]]

و shipping (الكود تحت) بترجّع 0 و 30 و 60. شرط الـ 1000 لازم ييجي الأول، وإلا طلب الجيزة بـ 1200 هيدفع 30 وهو المفروض مجاني.`,
          solCode: R`func shipping(total int, city string) int {
  switch {
  case total >= 1000:
    return 0
  case city == "cairo", city == "giza":
    return 30
  default:
    return 60
  }
}`
        },
        {
          cmd: "الدوال والقيم المتعددة",
          title: "الدوال: أكتر من قيمة راجعة، و named returns، و ...variadic",
          desc: R`الدالة بتتكتب: [[func name(params) returnType { ... }]]. ولو كذا parameter من نفس النوع تكتب النوع مرة: [[func add(a, b int) int]].

الدالة ممكن ترجّع أكتر من قيمة، وده من أهم حاجات Go: [[func divmod(a, b int) (int, int)]]، والمستدعي بياخدهم [[q, r := divmod(17, 5)]]. وأشهر استخدام: القيمة ومعاها error [[(User, error)]]. ولو مش عايز واحدة منهم: [[_]].

Named results: ممكن تسمّي القيم الراجعة [[(lo, hi int)]]، فبيبقوا متغيرات جاهزة بقيمتها الصفرية جوه الدالة، و [[return]] لوحدها بترجّعهم. مفيدة في الدوال القصيرة والتوثيق، بس في الدوال الطويلة بتلخبط.

Variadic: [[func sum(nums ...int)]]. الـ [[...]] قبل النوع معناها «أي عدد من القيم»، وجوه الدالة nums بيبقى slice. ولو عندك slice جاهزة وعايز تبعتها: [[sum(xs...)]] بالـ [[...]] بعدها. [[fmt.Println]] نفسها variadic.

الدوال في Go قيم: تتحط في متغير، وتتبعت لدالة تانية كـ parameter. النوع بيتكتب [[func(int) int]].

وكل الـ parameters بتتبعت بالقيمة (نسخة)، فلو الدالة غيّرت int جالها، المتغير الأصلي مش بيتغيّر. (الـ pointers في درسها.)

[[min]] و [[max]] دوال مبنية في اللغة من Go 1.21.`,
          example: R`package main

import "fmt"

func add(a, b int) int {
  return a + b
}

func divmod(a, b int) (int, int) {
  return a / b, a % b
}

// named results: lo و hi متغيرات جاهزة، و return لوحدها بترجّعهم
func minMax(nums []int) (lo, hi int) {
  lo, hi = nums[0], nums[0]
  for _, n := range nums {
    lo = min(lo, n)
    hi = max(hi, n)
  }
  return
}

func sum(nums ...int) int {
  total := 0
  for _, n := range nums {
    total += n
  }
  return total
}

func apply(n int, f func(int) int) int {
  return f(n)
}

func main() {
  fmt.Println(add(2, 3))
  q, r := divmod(17, 5)
  fmt.Println(q, r)
  lo, hi := minMax([]int{7, 2, 9, 4})
  fmt.Println(lo, hi)
  xs := []int{1, 2, 3}
  fmt.Println(sum(), sum(5, 5), sum(xs...))
  double := func(x int) int { return x * 2 }
  fmt.Println(apply(21, double))
}`,
          try: R`اكتب دالة [[stats(nums ...float64) (avg float64, count int)]] بترجّع المتوسط والعدد، ولو مفيش أرقام ترجّع (0, 0) من غير ما تقسم على صفر. جرّبها بـ [[stats()]] و [[stats(2, 4, 9)]] و [[stats(prices...)]].`,
          flag: "script",
          deep: {
            why: R`أكتر من قيمة راجعة هي اللي خلّت Go تستغنى عن الـ exceptions: الدالة بترجّع النتيجة والـ error جنب بعض، والمستدعي لازم يتعامل مع الاتنين قدام عينه.`,
            how: R`[[minMax]] بتفترض إن الـ slice فيها عنصر واحد على الأقل: [[nums[0]]] على slice فاضية بيعمل panic ([[index out of range]]). في كود حقيقي افحص الطول الأول.

[[double := func(x int) int { return x * 2 }]] دالة من غير اسم (anonymous function) محطوطة في متغير. و [[apply]] بتاخد أي دالة بنفس الشكل [[func(int) int]].

الـ variadic لازم يبقى آخر parameter. و [[sum(xs...)]] مش بتنسخ الـ slice، بتبعتها هي نفسها، فلو الدالة عدّلت عنصر فيها هيتعدّل عندك.

Go مفيهاش default parameters ولا function overloading (دالتين بنفس الاسم). البديل: أسماء مختلفة ([[NewServer]] و [[NewServerWithTLS]])، أو struct للإعدادات، أو variadic options.`,
            when: R`[[(T, error)]] لأي حاجة ممكن تفشل. named results للدوال القصيرة أو لما تحتاج تعدّل القيمة الراجعة في defer (درس defer). variadic لدوال زي sum و log و append. دوال كـ parameters لـ callbacks و middleware و sort.`,
            mistakes: R`ترجّع [[(error, T)]] بالعكس: العرف إن الـ error آخر واحد. وتستخدم named results مع [[return]] لوحدها في دالة ٥٠ سطر فمحدش يعرف إيه اللي راجع. وتبعت slice لـ variadic من غير [[...]] فيطلع [[cannot use xs (variable of type []int) as int value]].`
          },
          lines: [
            "باكدج main.",
            "import fmt.",
            "دالة بتاخد int اتنين وترجّع int.",
            "رجّع المجموع.",
            "قفلة.",
            R`بترجّع قيمتين: [[(int, int)]].`,
            "خارج القسمة والباقي.",
            "قفلة.",
            R`named results: lo و hi.`,
            "ابدأ بأول عنصر في الاتنين.",
            "لف على الأرقام.",
            R`[[min]] مبنية في اللغة.`,
            R`و [[max]].`,
            "قفلة.",
            "return لوحدها: بترجّع lo و hi.",
            "قفلة.",
            R`variadic: [[...int]] يعني أي عدد، و nums جوّا slice.`,
            "مجموع.",
            "لف.",
            "زوّد.",
            "قفلة.",
            "رجّعه.",
            "قفلة.",
            R`بتاخد رقم ودالة شكلها [[func(int) int]].`,
            "نادي الدالة اللي جت.",
            "قفلة.",
            "main.",
            "5.",
            "استقبل القيمتين.",
            "3 و 2.",
            "slice literal مباشرة.",
            "2 و 9.",
            "slice جاهزة.",
            R`من غير قيم (0)، وقيمتين (10)، وslice بـ [[...]] (6).`,
            "دالة من غير اسم في متغير.",
            "ابعتها لـ apply: 42.",
            "قفلة."
          ],
          sol: R`الناتج:
[[5]]
[[3 2]]
[[2 9]]
[[0 10 6]]
[[42]]

و stats (الكود تحت): [[stats()]] بترجّع [[0 0]]، و [[stats(2, 4, 9)]] بترجّع [[5 3]]. لاحظ [[float64(count)]]: مينفعش تقسم float64 على int من غير تحويل.`,
          solCode: R`func stats(nums ...float64) (avg float64, count int) {
  count = len(nums)
  if count == 0 {
    return 0, 0
  }
  total := 0.0
  for _, n := range nums {
    total += n
  }
  return total / float64(count), count
}`
        },
        {
          cmd: "closures",
          title: "الـ closure: دالة فاكرة المتغيرات اللي اتعملت جنبها",
          desc: R`الدالة اللي من غير اسم (function literal) لما تستخدم متغير من بره نفسها، بتمسكه هو نفسه مش نسخة منه. ده اسمه closure: الدالة والمتغيرات اللي «قافلة» عليها.

في المثال [[counter()]] بترجّع دالة. كل مرة تنادي الدالة الراجعة، بتزوّد نفس المتغير [[count]] اللي اتعمل جوه counter، رغم إن counter نفسها خلصت من بدري. ولو ناديت counter تاني بتعمل count جديد خالص.

النوع الراجع [[func() int]] معناه «دالة مبتاخدش حاجة وبترجّع int».

الـ closures في كل حتة في Go: الـ goroutines ([[go func() { ... }()]])، و defer، و الـ middleware في الـ HTTP، والـ sort ([[slices.SortFunc(users, func(a, b User) int { ... })]]).

والـ [[append]] في المثال بتضيف عنصر لآخر slice (هتتشرح في درس الـ slices).`,
          example: R`package main

import "fmt"

func counter() func() int {
  count := 0
  return func() int {
    count++
    return count
  }
}

func main() {
  next := counter()
  fmt.Println(next(), next(), next())
  other := counter()
  fmt.Println(other())

  // من Go 1.22 كل لفّة ليها i جديدة، فكل دالة فاكرة رقمها
  var printers []func()
  for i := range 3 {
    printers = append(printers, func() { fmt.Print(i, " ") })
  }
  for _, p := range printers {
    p()
  }
  fmt.Println()

  total := 0
  add := func(n int) { total += n }
  add(10)
  add(5)
  fmt.Println(total)
}`,
          try: R`اكتب دالة [[makeMultiplier(factor int) func(int) int]] بترجّع دالة بتضرب في factor. اعمل [[double]] و [[triple]] منها واطبع [[double(5)]] و [[triple(5)]]. وبعدين اكتب [[memo]]: دالة بتحسب مربع الرقم وبتحفظ النتايج في map جوّا closure، وتطبع «من الكاش» لو الرقم اتحسب قبل كده.`,
          flag: "script",
          deep: {
            why: R`الـ closure بيخليك تربط داتا بسلوك من غير ما تعمل struct: عدّاد، أو إعدادات middleware، أو كاش صغير. وهتحتاج تفهمه عشان تفهم ليه goroutine جوه loop بيشوف قيمة معينة.`,
            how: R`لما الدالة الداخلية تستخدم [[count]]، الـ compiler بيلاحظ إن count لازم يعيش بعد ما counter تخلص، فبيحطه في الـ heap بدل الـ stack (ده اسمه escape analysis، وبيحصل لوحده). انت مش محتاج تعمل حاجة.

حكاية الـ loop: قبل Go 1.22 الـ [[i]] كان متغير واحد لكل اللفّات، فالتلات دوال كانوا بيطبعوا [[3 3 3]] (آخر قيمة). من 1.22 كل لفّة ليها نسختها فبيطبعوا [[0 1 2]]. ده بيعتمد على سطر [[go]] في go.mod، فمشروع قديم مكتوب فيه [[go 1.21]] لسه بالسلوك القديم. لو شغال على كود قديم هتلاقي [[i := i]] جوه الـ loop: ده كان الحل قبل كده.

[[add := func(n int) { total += n }]] بتعدّل total الخارجي نفسه، مش نسخة.`,
            when: R`factories بتطلّع دوال بإعدادات (makeMultiplier، middleware بياخد config). عدّادات و generators. callbacks للـ sort والـ filter. والـ goroutines.`,
            mistakes: R`goroutines كتير بتعدّل نفس المتغير اللي ماسكه closure من غير Mutex: data race (المستوى ٢). ومشروع على [[go 1.21]] أو أقدم بيطبع [[3 3 3]]. وتتوقع إن الـ closure واخد نسخة من القيمة وقت ما اتعمل: هو ماسك المتغير نفسه، فلو المتغير اتغيّر بعدين الدالة هتشوف القيمة الجديدة.`
          },
          lines: [
            "باكدج main.",
            "import fmt.",
            R`counter بترجّع دالة نوعها [[func() int]].`,
            "متغير محلي.",
            "رجّع دالة من غير اسم...",
            "...بتزوّد count نفسه (مش نسخة)...",
            "...وترجّعه.",
            "قفلة الدالة الداخلية.",
            "قفلة counter.",
            "main.",
            "next فاكرة count بتاعها.",
            "1 2 3: نفس المتغير بيزيد.",
            "counter جديدة = count جديد.",
            "1.",
            R`slice من الدوال.`,
            "loop على 0 و 1 و 2.",
            "ضيف دالة بتطبع i بتاع اللفّة دي.",
            "قفلة.",
            "نادي كل الدوال.",
            "كل واحدة بتطبع رقمها.",
            "قفلة.",
            "سطر جديد.",
            "متغير عادي.",
            "closure بتعدّل total اللي بره.",
            "10.",
            "15.",
            "15.",
            "قفلة."
          ],
          sol: R`الناتج:
[[1 2 3]]
[[1]]
[[0 1 2 ]]
[[15]]

والحل (الكود تحت): [[double(5)]] = 10 و [[triple(5)]] = 15. وفي memo أول [[square(4)]] بتحسب وترجّع 16، والتانية بتطبع «من الكاش» قبل ما ترجّع 16.`,
          solCode: R`func makeMultiplier(factor int) func(int) int {
  return func(n int) int { return n * factor }
}

func memo() func(int) int {
  cache := map[int]int{}
  return func(n int) int {
    if v, ok := cache[n]; ok {
      fmt.Println("من الكاش")
      return v
    }
    cache[n] = n * n
    return cache[n]
  }
}`
        }
      ]
    },
    {
      t: "البيانات: slices و maps و structs و pointers",
      l: 1,
      n: "array و slice وإزاي بيكبروا، والفخ بتاع الذاكرة المشتركة، و map، والـ pointers، و struct و methods، و embedding بدل الوراثة",
      items: [
        {
          cmd: "المصفوفات والـ Slices والـ Maps في Go",
          title: "array و slice: الفرق بينهم، و len و cap و append",
          desc: R`[[[3]int]] ده array: حجمه ثابت وجزء من النوع نفسه ([[[3]int]] و [[[4]int]] نوعين مختلفين). ولما تعمل [[b := a]] بيتنسخ كله. عشان كده نادرًا ما هتستخدمه مباشرة.

[[[]int]] (من غير رقم) ده slice، واللي هتستخدمه في ٩٩٪ من الوقت. الـ slice «شبّاك» على array مستخبي تحت (backing array)، وجوّاه ٣ حاجات: pointer لأول عنصر، و [[len]] (عدد العناصر اللي فيه)، و [[cap]] (المساحة المتاحة في الـ array اللي تحت من أول الشبّاك).

بتعمل slice بكذا طريقة:
• [[[]string{"a", "b"}]]: بقيم. الأقواس [[{ }]] هنا معناها «القيم الأولية»، مش block كود.
• [[make([]int, 0, 10)]]: فاضية (len 0) بمساحة 10 (cap). لو عارف الحجم تقريبًا ده بيوفّر.
• [[var s []int]]: nil slice، و len بتاعها 0، و append عليها شغالة عادي.

[[append(s, x)]] بتضيف في الآخر وبترجّع slice جديدة، فلازم تكتب [[s = append(s, x)]]. لو فيه مساحة (len < cap) بتكتب في نفس الـ array. لو مفيش بتعمل array أكبر (تقريبًا الضعف للصغيرة) وتنسخ القديم فيه.

القص: [[s[1:3]]] من العنصر 1 لحد قبل 3. و [[s[:2]]] من الأول، و [[s[3:]]] لحد الآخر.`,
          example: R`package main

import "fmt"

func main() {
  // array: الحجم جزء من النوع، والتعيين بينسخ كله
  arr := [3]int{10, 20, 30}
  copyArr := arr
  copyArr[0] = 99
  fmt.Println(arr, copyArr, len(arr))

  var s []int
  fmt.Println(s == nil, len(s), cap(s))
  for i := range 5 {
    s = append(s, i*10)
    fmt.Println(len(s), cap(s))
  }
  fmt.Println(s, s[1:3], s[:2], s[3:])

  names := make([]string, 0, 10)
  names = append(names, "Ali", "Sara")
  fmt.Println(names, len(names), cap(names))
}`,
          try: R`اعمل slice بـ [[make([]int, 3)]] (من غير cap) واعمل append لـ 1 عليها، واطبعها. هتلاقي إيه في أولها؟ وبعدين جرّب [[s[5]]] على slice طولها 3 واقرا رسالة الـ panic.`,
          flag: "script",
          deep: {
            why: R`الـ slice هي أكتر نوع بيانات هتستخدمه في Go: نتايج query، وقايمة طلبات، وأسطر ملف. ولو مش فاهم len و cap و append هتقع في أخطاء غريبة: عناصر بتتغيّر لوحدها، أو أصفار في أول القايمة.`,
            how: R`الـ slice header نفسه (pointer و len و cap) حجمه صغير (24 بايت)، وده اللي بيتنسخ لما تبعت slice لدالة، مش العناصر. فالدالة تقدر تعدّل [[s[0]]] وتشوف التعديل بره، بس لو عملت append جوّاها والـ array اتغيّر، اللي بره مش هيشوف العنصر الجديد. عشان كده الدوال اللي بتضيف بترجّع الـ slice.

الـ cap في المثال بيبقى 1 ثم 2 ثم 4 ثم 4 ثم 8: لما المساحة تخلص، append بتعمل array ضعف الحجم. للـ slices الكبيرة (فوق 256 عنصر) النمو بيقل تدريجيًا لحد حوالي 1.25 مرة.

[[make([]int, 3)]] بتعمل slice فيها 3 أصفار (len = 3)، فـ append بتضيف بعدهم: [[[0 0 0 1]]]. لو عايز فاضية بمساحة: [[make([]int, 0, 3)]].

الوصول لعنصر بره الطول بيعمل panic: [[index out of range [5] with length 3]]. Go بتشيك على الحدود دايمًا، فمفيش قراية ذاكرة غلط زي C.`,
            when: R`slice لأي قايمة. array لما الحجم ثابت ومعروف (مفتاح تشفير [[[32]byte]]، أو إحداثيات). و [[make]] مع cap لما تعرف العدد تقريبًا (مثلًا بتحوّل 1000 صف لـ 1000 struct).`,
            mistakes: R`تكتب [[append(s, x)]] من غير [[s =]]: الـ compiler بيرفضها ([[append(s, x) (value of type []int) is not used]])، بس [[t := append(s, x)]] وبعدين تكمّل على s بتعدّي وتلخبطك. و [[make([]int, n)]] وبعدين append فتلاقي n أصفار في الأول. وتفترض إن الدالة اللي عملت append على slice جاتلها غيّرت الـ slice الأصلية.`
          },
          lines: [
            "باكدج main.",
            "import fmt.",
            "main.",
            R`array من 3 أرقام. [[{ }]] هنا القيم الأولية.`,
            "تعيين = نسخة كاملة.",
            "التعديل على النسخة بس.",
            "الأصلي متغيّرش.",
            R`nil slice: موجودة ومفيهاش حاجة.`,
            "true 0 0.",
            "5 لفّات.",
            "ضيف في الآخر، وخزّن النتيجة في s.",
            "len و cap بعد كل إضافة.",
            "قفلة.",
            R`الكل، ومن 1 لقبل 3، وأول اتنين، ومن 3 للآخر.`,
            R`فاضية بمساحة 10.`,
            R`append بتاخد أكتر من قيمة.`,
            "2 عنصر ومساحة 10.",
            "قفلة."
          ],
          sol: R`الناتج:
[[[10 20 30] [99 20 30] 3]]
[[true 0 0]]
[[1 1]]
[[2 2]]
[[3 4]]
[[4 4]]
[[5 8]]
[[[0 10 20 30 40] [10 20] [0 10] [30 40]]]
[[[Ali Sara] 2 10]]

وفي التجربة: [[make([]int, 3)]] + append بتطلع [[[0 0 0 1]]]، و [[s[5]]] بتعمل [[panic: runtime error: index out of range [5] with length 3]] والبرنامج بيقع ومعاه رقم السطر.`
        },
        {
          cmd: "copy و slices",
          title: "slice من slice بيشاركوا نفس الذاكرة: copy والباكدج slices",
          desc: R`أهم فخ في الـ slices: [[b := a[1:3]]] مش نسخة. b شبّاك على نفس الـ array بتاع a، فلو غيّرت [[b[0]]] هتلاقي [[a[1]]] اتغيّر.

والأسوأ: [[append]] على b. لو b فيها مساحة (cap أكبر من len) هتكتب العنصر الجديد فوق عنصر موجود في a من غير ما تحس.

الحلول:
• [[copy(dst, src)]]: بتنسخ العناصر من src لـ dst (لحد أصغر طول فيهم) وترجّع عدد اللي اتنسخ. dst لازم تبقى محجوزة بالطول الصح ([[make([]int, len(src))]]).
• [[slices.Clone(s)]]: نسخة مستقلة في سطر.
• [[s[low:high:max]]]: القص بـ 3 أرقام بيحدد الـ cap، فأي append بعدها بتعمل array جديد.

الباكدج [[slices]] (من Go 1.21) فيها اللي كنت بتكتبه بإيدك: [[slices.Sort]] و [[slices.Contains]] و [[slices.Index]] و [[slices.Max]] و [[slices.Reverse]] و [[slices.Equal]] (عشان [[==]] مش شغالة بين slices) و [[slices.SortFunc]] بدالة مقارنة.`,
          example: R`package main

import (
  "fmt"
  "slices"
)

func main() {
  a := []int{1, 2, 3, 4, 5}
  b := a[1:3]
  b[0] = 99
  fmt.Println(a, b, len(b), cap(b))

  // b فيها مساحة، فالـ append بتكتب فوق a[3]
  b = append(b, 77)
  fmt.Println(a)

  c := make([]int, len(a))
  n := copy(c, a)
  c[0] = -1
  fmt.Println(n, a[0], c[0])

  d := slices.Clone(a[:2])
  d = append(d, 1000)
  fmt.Println(a, d)

  nums := []int{5, 2, 8, 1}
  slices.Sort(nums)
  fmt.Println(nums, slices.Contains(nums, 8), slices.Index(nums, 5), slices.Max(nums))
}`,
          try: R`اكتب دالة [[removeAt(s []int, i int) []int]] بتشيل عنصر من مكانه. جرّبها على [[a := []int{1, 2, 3, 4}]] بـ [[r := removeAt(a, 1)]] واطبع a و r. هتلاقي a اتغيّرت. صلّحها بحيث a متتلمسش، وبعدين قارن بـ [[slices.Delete]].`,
          flag: "script",
          deep: {
            why: R`الـ bug ده بيحصل في الكود الحقيقي: دالة بتاخد جزء من slice وتضيف عليه، فداتا في مكان تاني تتغيّر. مفيش error ومفيش crash، بس رقم غلط في تقرير. لو فهمت الصورة (كلهم شبابيك على نفس الـ array) هتعرف إمتى تنسخ.`,
            how: R`a عندها array من 5 عناصر. [[b := a[1:3]]] بيبدأ من العنصر 1، فـ len = 2 و cap = 4 (من 1 لآخر الـ array). [[b = append(b, 77)]] لقت مساحة، فكتبت في الخانة اللي بعد b، اللي هي [[a[3]]].

[[slices.Clone(a[:2])]] عملت array جديد بالظبط على قد العنصرين، فأي append بعدها بتعمل array تالت، و a مش بتتأثر.

[[slices.Sort]] بترتّب في مكانها (in place) ومبترجّعش حاجة. [[slices.Index]] بترجّع -1 لو مش موجود. و [[slices.Max]] بتعمل panic على slice فاضية.

لاحظ إن الـ string برضه بيتقص بنفس الطريقة ([[s[2:5]]]) بس مفيش مشكلة هنا لأن الـ strings مبتتغيرش.`,
            when: R`انسخ ([[slices.Clone]] أو copy) لما تخزّن slice جاتلك من بره في struct، أو ترجّع جزء من داتا داخلية لحد بره، أو تعمل append على جزء مقصوص. واستخدم باكدج slices بدل ما تكتب loops للبحث والترتيب.`,
            mistakes: R`[[copy(dst, src)]] و dst طولها 0 ([[var dst []int]] أو [[make([]int, 0, n)]]): بتنسخ صفر عناصر. و [[a == b]] بين slices: compile error، استخدم [[slices.Equal]]. وتحتفظ بـ slice صغيرة مقصوصة من slice ضخمة (ملف 100 ميجا): الـ array الكبير كله بيفضل في الذاكرة طول ما الصغيرة عايشة، فانسخها.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            R`[[slices]]: دوال جاهزة للـ slices.`,
            "قفلة.",
            "main.",
            "slice فيها 5.",
            "شبّاك على العنصرين 1 و 2، مش نسخة.",
            "التعديل بيوصل لـ a.",
            R`a بقت [[[1 99 3 4 5]]]، و len(b) = 2 و cap(b) = 4.`,
            "append لقت مساحة...",
            R`...فـ a بقت [[[1 99 3 77 5]]].`,
            R`slice بنفس الطول.`,
            "انسخ العناصر، و n عددهم.",
            "عدّل النسخة.",
            "5 و 1 و -1: الأصل متغيّرش.",
            "نسخة مستقلة من أول اتنين.",
            "append عليها مش بتلمس a.",
            "اطبعهم.",
            "slice أرقام.",
            "رتّبها في مكانها.",
            R`[[[1 2 5 8]]]، و true، و 2، و 8.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[[1 99 3 4 5] [99 3] 2 4]]
[[[1 99 3 77 5]]]
[[5 1 -1]]
[[[1 99 3 77 5] [1 99 1000]]]
[[[1 2 5 8] true 2 8]]

[[removeAt]] بالشكل الساذج [[append(s[:i], s[i+1:]...)]] بيرجّع [[[1 3 4]]] بس a بتبقى [[[1 3 4 4]]]: الـ append كتبت فوق الـ array بتاع a. الحل إنك تعمل slice جديدة (الكود تحت). و [[slices.Delete(a, 1, 2)]] كمان بتعدّل a في مكانها (بتزق العناصر وبتصفّر الخانة الأخيرة)، فاستخدمها لما تكون عايز ده.`,
          solCode: R`func removeAt(s []int, i int) []int {
  out := make([]int, 0, len(s)-1)
  out = append(out, s[:i]...)
  return append(out, s[i+1:]...)
}`
        },
        {
          cmd: "maps",
          title: "map: مفتاح وقيمة، و comma ok، والترتيب اللي بيتغيّر كل مرة",
          desc: R`[[map[string]int]] جدول مفتاح وقيمة: المفتاح string والقيمة int. البحث والإضافة والمسح سريعين في المتوسط مهما كبر الـ map.

• [[m := map[string]int{"apple": 5}]] بقيم، أو [[make(map[string]int)]] فاضي.
• [[m["mango"] = 12]] إضافة أو تعديل.
• [[m["kiwi"]]] لمفتاح مش موجود مش error: بيرجّع القيمة الصفرية (0).
• عشان تفرّق بين «مش موجود» و «موجود وقيمته صفر»: [[v, ok := m["kiwi"]]]. ok بتبقى false لو مش موجود. ده اسمه «comma ok».
• [[delete(m, key)]] و [[len(m)]].
• [[for k, v := range m]]: الترتيب عشوائي ومتعمّد يتغيّر من تشغيل للتاني، عشان محدش يعتمد عليه. لو محتاج ترتيب: رتّب المفاتيح الأول [[slices.Sorted(maps.Keys(m))]] (Go 1.23+).

المفتاح لازم يبقى نوع ينفع يتقارن بـ [[==]]: string و int و bool و struct فيه الأنواع دي. slice أو map مينفعوش يبقوا مفتاح.

والـ map اللي متعرّف بـ [[var m map[string]int]] من غير make بيبقى nil: القراية منه شغالة وبترجّع صفر، بس الكتابة فيه بتعمل panic.`,
          example: R`package main

import (
  "fmt"
  "maps"
  "slices"
)

func main() {
  stock := map[string]int{"apple": 5, "banana": 0}
  stock["mango"] = 12
  stock["apple"] += 3

  fmt.Println(stock["apple"], stock["kiwi"])
  qty, ok := stock["banana"]
  fmt.Println(qty, ok)
  if _, ok := stock["kiwi"]; !ok {
    fmt.Println("kiwi مش موجود")
  }

  delete(stock, "banana")
  fmt.Println(len(stock))

  for _, k := range slices.Sorted(maps.Keys(stock)) {
    fmt.Println(k, stock[k])
  }

  counts := make(map[string]int)
  for _, w := range []string{"go", "is", "go"} {
    counts[w]++
  }
  fmt.Println(counts)

  var empty map[string]int
  fmt.Println(empty["x"], len(empty))
}`,
          try: R`اكتب [[empty["x"] = 1]] في آخر main وشغّل واقرا الـ panic. وبعدين اكتب برنامج بياخد جملة ويطبع كل كلمة وعدد مرات ظهورها، مترتبين من الأكتر للأقل (استخدم [[strings.Fields]] و [[slices.SortFunc]]).`,
          flag: "script",
          deep: {
            why: R`الـ map هو الكاش، والعدّاد، والـ index السريع (بدل ما تلف على slice كلها تدوّر على user بالـ id)، وإزالة التكرار. هتستخدمه في كل برنامج تقريبًا.`,
            how: R`[[stock["kiwi"]]] بيرجّع 0، و [[stock["banana"]]] بيرجّع 0 برضه. من غير comma ok مش هتعرف تفرّق. [[!ok]]: الـ [[!]] معناها «مش».

[[counts[w]++]] شغالة من غير ما تشيك: لو المفتاح مش موجود القيمة صفر، فبتبقى 1.

[[fmt.Println]] بتطبع الـ map بمفاتيح مترتبة (عشان الناتج يبقى ثابت)، بس [[range]] مش بيرتّب.

الـ map بيتبعت للدوال كمرجع: لو الدالة عدّلت فيه، التعديل بيبان بره.

الـ map مش آمن مع أكتر من goroutine بيكتبوا في نفس الوقت: الـ runtime بيكتشف ده ويوقف البرنامج كله بـ [[fatal error: concurrent map writes]]. الحل Mutex (المستوى ٢) أو [[sync.Map]] في حالات معينة.

ولو القيمة struct مينفعش تعدّل حقل جوّاه مباشرة: [[m["a"].Count++]] compile error. اقرا القيمة في متغير، عدّلها، ورجّعها، أو خلي القيمة pointer [[map[string]*Item]].`,
            when: R`بحث سريع بالمفتاح (users بالـ id)، وعدّ التكرار، وإزالة التكرار ([[map[string]bool]] أو [[map[string]struct{}]] اللي مبياخدش مساحة للقيمة)، والتجميع (group by).`,
            mistakes: R`تكتب في nil map: [[panic: assignment to entry in nil map]] (حصلت كتير في structs فيها map محدش عمله make). وتعتمد على ترتيب range فالاختبار ينجح مرة ويفشل مرة. وتعمل [[if m[k] == 0]] وانت تقصد «مش موجود». وتكتب في map من أكتر من goroutine.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            R`[[maps]]: دوال للـ maps.`,
            "slices، عشان الترتيب.",
            "قفلة.",
            "main.",
            "map بقيمتين أوليين.",
            "إضافة مفتاح جديد.",
            R`تعديل: [[+=]] على القيمة الموجودة (5 + 3).`,
            "8، و kiwi مش موجود فبيرجّع 0 من غير error.",
            "comma ok: القيمة وهل موجود.",
            "0 true: موجود وقيمته صفر.",
            "comma ok في جملة تمهيدية، و ok هنا false.",
            "اطبع.",
            "قفلة.",
            "امسح مفتاح.",
            "2: apple و mango.",
            "المفاتيح مترتبة أبجديًا.",
            "اطبع المفتاح والقيمة.",
            "قفلة.",
            "map فاضي بـ make.",
            "لف على الكلمات.",
            "زوّد العدّاد: المفتاح الجديد بيبدأ من صفر.",
            "قفلة.",
            R`[[map[go:2 is:1]]].`,
            "nil map: متعرّف من غير make.",
            "القراية منه شغالة: 0 0.",
            "قفلة."
          ],
          sol: R`الناتج:
[[8 0]]
[[0 true]]
[[kiwi مش موجود]]
[[2]]
[[apple 8]]
[[mango 12]]
[[map[go:2 is:1]]]
[[0 0]]

و [[empty["x"] = 1]] بتعمل [[panic: assignment to entry in nil map]]. الحل [[empty = make(map[string]int)]] قبلها.

وعدّ الكلمات (الكود تحت): بنحط المفاتيح في slice ونرتّبها بـ [[slices.SortFunc]] بدالة بترجّع رقم سالب لو a قبل b. [[cmp.Compare(counts[b], counts[a])]] بالعكس عشان الأكبر الأول. والكلمات اللي ليها نفس العدد (go و is) ترتيبها بينهم مش ثابت، ولو عايزه ثابت قارن بالكلمة نفسها لما العدد يتساوى.`,
          solCode: R`counts := map[string]int{}
for _, w := range strings.Fields("go is simple and go is fast") {
  counts[w]++
}
words := slices.Collect(maps.Keys(counts))
slices.SortFunc(words, func(a, b string) int {
  return cmp.Compare(counts[b], counts[a])
})
for _, w := range words {
  fmt.Println(w, counts[w])
}`
        },
        {
          cmd: "& و * (pointers)",
          title: "الـ pointer: & بتجيب العنوان و * بتوصل للقيمة",
          desc: R`Go بتبعت كل حاجة للدوال بالقيمة: الدالة بتاخد نسخة. فلو [[doubleValue(x)]] غيّرت n جوّاها، x بره مش هيتغيّر.

الـ pointer متغير فيه عنوان متغير تاني في الذاكرة بدل القيمة نفسها:
• [[&x]]: «عنوان x». النتيجة نوعها [[*int]] (pointer لـ int).
• [[*p]]: «القيمة اللي في العنوان ده». بتقرا منها وتكتب فيها: [[*p = 100]] بتغيّر x نفسه.
• [[*int]] في تعريف النوع معناها «pointer لـ int». نفس الرمز [[*]] بمعنيين: في النوع «pointer لـ»، وقدام متغير «القيمة اللي بيشاور عليها».

القيمة الصفرية للـ pointer هي [[nil]] (مش بيشاور على حاجة). لو عملت [[*p]] و p بـ nil البرنامج بيقع بـ [[nil pointer dereference]].

مع الـ structs مش محتاج تكتب [[(*p).Name]]: [[p.Name]] بتشتغل لوحدها.

ومفيش في Go حسابات على العناوين ([[p + 1]]) زي C، فالـ pointers آمنة. وترجيع [[&c]] لمتغير محلي من دالة آمن تمامًا: الـ compiler بيلاحظ وبيحطه في مكان بيعيش بعد الدالة (escape analysis).`,
          example: R`package main

import "fmt"

func doubleValue(n int) {
  n *= 2
}

func doublePointer(n *int) {
  *n *= 2
}

func newCounter() *int {
  c := 0
  return &c
}

func main() {
  x := 10
  doubleValue(x)
  fmt.Println(x)
  doublePointer(&x)
  fmt.Println(x)

  p := &x
  *p = 100
  fmt.Println(x, *p, p != nil)

  c := newCounter()
  *c++
  fmt.Println(*c)

  var missing *int
  fmt.Println(missing == nil)
}`,
          try: R`اكتب [[swap(a, b *int)]] بتبدّل قيمتين، وجرّبها على متغيرين. وبعدين اكتب [[fmt.Println(*missing)]] في آخر main واقرا الـ panic كله، خصوصًا السطر اللي فيه [[main.go]].`,
          flag: "script",
          deep: {
            why: R`هتقابل الـ pointers في Go كل يوم: [[*http.Request]] و [[*sql.DB]] و [[json.Unmarshal(data, &v)]] و methods بتعدّل الـ struct. ومن غير ما تفهم & و * مش هتفهم ليه التعديل وصل في مكان ومش وصل في مكان تاني.`,
            how: R`[[n *= 2]] معناها [[n = n * 2]]. في doubleValue الـ n نسخة، ففي doublePointer الـ n عنوان، و [[*n *= 2]] بتضرب القيمة اللي في العنوان.

[[p := &x]]: p نوعها [[*int]]. [[*p = 100]] كتبت في x. و [[p != nil]] true لأنها بتشاور على حاجة.

[[*c++]] بتزوّد القيمة اللي c بيشاور عليها (مش العنوان).

الـ pointer مش أسرع دايمًا: نسخ struct صغير (كام حقل) غالبًا أرخص من pointer، لأن الـ pointer ممكن يخلي المتغير يروح الـ heap ويزوّد شغل الـ garbage collector. القاعدة: pointer لما محتاج تعدّل، أو الـ struct كبير، أو محتاج «مفيش قيمة» (nil).

[[new(int)]] بيعمل int جديد بصفر ويرجّع عنوانه، زي [[c := 0; return &c]].`,
            when: R`لما الدالة لازم تعدّل حاجة جاتلها (Unmarshal و Scan بياخدوا pointers للسبب ده). و structs كبيرة أو فيها Mutex. و حقل اختياري في JSON ([[*string]] عشان تفرّق بين "" و مش موجود). والـ slices والـ maps مش محتاجين pointer عشان تعدّل عناصرهم.`,
            mistakes: R`[[*p]] و p بـ nil: [[panic: runtime error: invalid memory address or nil pointer dereference]]، وأشهر سبب: struct جاي من دالة رجّعت [[nil, err]] وانت متشيكتش على err. وتنسى & في [[json.Unmarshal(data, v)]] فيطلع [[json: Unmarshal(non-pointer main.User)]]. وتعمل pointer لكل حاجة «عشان السرعة».`
          },
          lines: [
            "باكدج main.",
            "import fmt.",
            "بتاخد نسخة من الرقم.",
            "بتعدّل النسخة بس.",
            "قفلة.",
            R`بتاخد عنوان: [[*int]] = pointer لـ int.`,
            R`[[*n]]: القيمة اللي في العنوان، اضربها في 2.`,
            "قفلة.",
            "بترجّع pointer.",
            "متغير محلي.",
            R`رجّع عنوانه بـ [[&]]: آمن في Go.`,
            "قفلة.",
            "main.",
            "x = 10.",
            "بعتنا نسخة...",
            "...فـ x لسه 10.",
            R`بعتنا العنوان بـ [[&x]]...`,
            "...فـ x بقى 20.",
            "p بيشاور على x.",
            "الكتابة في العنوان = الكتابة في x.",
            "100 100 true.",
            "pointer لعدّاد جديد.",
            "زوّد القيمة اللي بيشاور عليها.",
            "1.",
            R`pointer من غير قيمة: [[nil]].`,
            "true.",
            "قفلة."
          ],
          sol: R`الناتج:
[[10]]
[[20]]
[[100 100 true]]
[[1]]
[[true]]

[[swap]] (الكود تحت) بتبدّل القيمتين في السطر [[*a, *b = *b, *a]]، وبتتنادى [[swap(&x, &y)]].

و [[*missing]] بتطبع:
[[panic: runtime error: invalid memory address or nil pointer dereference]]
[[[signal SIGSEGV: segmentation violation code=... addr=0x0 pc=...]]]
وتحت [[goroutine 1 [running]:]] و [[main.main()]] وسطر زي [[/src/main.go:30 +0x...]]: ده رقم السطر اللي وقع. اقرا الـ stack trace من فوق لتحت ودوّر على أول سطر من ملفاتك انت.`,
          solCode: R`func swap(a, b *int) {
  *a, *b = *b, *a
}

x, y := 1, 2
swap(&x, &y)
fmt.Println(x, y)`
        },
        {
          cmd: "الـ Structs والـ Methods والـ Pointers",
          title: "struct و methods: value receiver ولا pointer receiver؟",
          desc: R`Go مفيهاش classes. بدلها [[struct]]: نوع بيجمع حقول بأسماء، و methods: دوال مربوطة بالنوع.

[[type User struct { Name string; Score int }]]. الحقل اللي اسمه بيبدأ بحرف كبير exported (متاح بره الباكدج، وده اللي encoding/json بيشوفه)، والصغير خاص بالباكدج.

بتعمل قيمة بـ [[User{Name: "Sara", Score: 10}]] (الحقول اللي متكتبتش بتاخد القيمة الصفرية). ولو عايز pointer على طول: [[&User{...}]].

الـ method دالة قبل اسمها receiver بين قوسين:
• [[func (u User) Label() string]]: value receiver. u نسخة، وأي تعديل عليها بيضيع.
• [[func (u *User) AddPoints(n int)]]: pointer receiver. u بيشاور على الـ struct الأصلي، فالتعديل بيوصل.

Go مفيهاش constructors. العرف دالة اسمها [[NewUser(...)]] بترجّع [[*User]] جاهز، لو فيه حاجة لازم تتجهز (map أو قيم افتراضية).

ولو عندك [[u]] قيمة عادية وناديت [[u.AddPoints(5)]]، Go بتكتبها لوحدها [[(&u).AddPoints(5)]].`,
          example: R`package main

import "fmt"

type User struct {
  Name  string
  Email string
  Score int
}

func NewUser(name, email string) *User {
  return &User{Name: name, Email: email}
}

func (u User) Label() string {
  return fmt.Sprintf("%s (%d)", u.Name, u.Score)
}

func (u *User) AddPoints(pts int) {
  u.Score += pts
}

// value receiver: u نسخة، فالتصفير ده مش هيوصل
func (u User) ResetWrong() {
  u.Score = 0
}

func main() {
  u := User{Name: "Sara", Email: "sara@example.com", Score: 10}
  u.AddPoints(5)
  u.ResetWrong()
  fmt.Println(u.Label())

  p := NewUser("Ali", "ali@example.com")
  p.AddPoints(3)
  fmt.Println(p.Label(), p.Email)

  var empty User
  fmt.Printf("%+v\n", empty)
}`,
          try: R`ضيف struct اسمه [[Cart]] فيه [[Items []Item]] (و Item فيه Name و Price و Qty)، و method [[Add(item Item)]] بتضيف، و [[Total() float64]] بتحسب الإجمالي. قرّر أنهي فيهم pointer receiver وليه. وبعدين خلي Add value receiver وشوف إيه اللي هيحصل.`,
          flag: "script",
          deep: {
            why: R`الـ struct هو الطريقة اللي بتوصف بيها أي حاجة في البرنامج: User و Order و Config و Server. وقرار value ولا pointer receiver بيحدد إذا كانت الـ method بتعدّل ولا لأ، وده أكتر سؤال بيتسأل في انترفيوهات Go.`,
            how: R`[[u.ResetWrong()]] خدت نسخة من u وصفّرتها، والنسخة اتمسحت لما الدالة خلصت، فـ u لسه 15. go vet مش بيمسك ده، فخلي بالك.

[[NewUser]] بترجّع [[&User{...}]]: عنوان struct جديد. و [[p.AddPoints(3)]] و [[p.Label()]] الاتنين شغالين على pointer: Go بتعمل [[*p]] لوحدها للـ value receiver.

القواعد اللي الناس ماشية عليها:
• لو أي method بتعدّل، خلي كل الـ methods pointer receivers (التوحيد بيمنع لخبطة الـ interfaces بعدين).
• struct فيه [[sync.Mutex]] لازم pointer receiver (نسخ الـ Mutex بيكسره، و go vet بيمسك ده).
• struct صغير ومبيتغيرش (زي [[time.Time]] أو نقطة x و y) value receiver تمام.

[[%+v]] على struct فاضي: [[{Name: Email: Score:0}]] (النصوص الفاضية مش باينة).`,
            when: R`pointer receiver: أي method بتعدّل، أو الـ struct كبير، أو فيه Mutex أو حاجة مينفعش تتنسخ. value receiver: أنواع صغيرة immutable. و [[NewX]] لما الـ struct محتاج تجهيز (map أو قيم افتراضية أو validation).`,
            mistakes: R`تعدّل في value receiver وتستغرب إن التعديل ضاع. وتخلط: نص الـ methods value ونصها pointer. وتعمل [[NewUser]] للـ structs اللي القيمة الصفرية بتاعتها جاهزة أصلًا. وتنسى تعمل make للـ map اللي جوه struct فيقع في أول كتابة.`
          },
          lines: [
            "باكدج main.",
            "import fmt.",
            "تعريف نوع struct اسمه User.",
            "حقل exported (حرف كبير).",
            "حقل تاني.",
            "حقل رقم.",
            "قفلة.",
            R`constructor بالعرف: بترجّع [[*User]].`,
            R`[[&User{...}]]: struct جديد وعنوانه. Score صفر لأنه متكتبش.`,
            "قفلة.",
            R`method بـ value receiver: [[(u User)]].`,
            "بترجّع نص فيه الاسم والنقاط.",
            "قفلة.",
            R`method بـ pointer receiver: [[(u *User)]].`,
            R`بتعدّل الـ struct الأصلي ([[u.Score]] = [[(*u).Score]]).`,
            "قفلة.",
            "value receiver بيحاول يعدّل.",
            "بيصفّر نسخة.",
            "قفلة.",
            "main.",
            "struct literal بأسماء الحقول.",
            R`Go بتحوّلها [[(&u).AddPoints(5)]]: Score بقى 15.`,
            "مش هتأثر.",
            R`[[Sara (15)]].`,
            "pointer من الـ constructor.",
            "3 نقاط.",
            R`[[Ali (3) ali@example.com]].`,
            "struct بالقيم الصفرية.",
            R`[[%+v]] بأسماء الحقول.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[Sara (15)]]
[[Ali (3) ali@example.com]]
[[{Name: Email: Score:0}]]

في الـ Cart (الكود تحت): [[Add]] لازم pointer receiver لأنها بتعمل append على Items، و [[Total]] ممكن تبقى value بس الأحسن تبقى pointer عشان التوحيد. لو خليت Add value receiver: الإضافة بتحصل على نسخة، فـ [[Total()]] هترجّع 0 والـ Items فاضية.`,
          solCode: R`type Item struct {
  Name  string
  Price float64
  Qty   int
}

type Cart struct {
  Items []Item
}

func (c *Cart) Add(it Item) {
  c.Items = append(c.Items, it)
}

func (c *Cart) Total() float64 {
  total := 0.0
  for _, it := range c.Items {
    total += it.Price * float64(it.Qty)
  }
  return total
}`
        },
        {
          cmd: "embedding",
          title: "embedding: تحط struct جوه struct بدل الوراثة",
          desc: R`Go مفيهاش وراثة (inheritance). بدلها embedding: تحط نوع جوه struct من غير اسم حقل:
[[type Admin struct { User; Level int }]]

النتيجة: حقول و methods الـ User بتطلع لمستوى Admin (promoted). تكتب [[a.Name]] و [[a.Greet()]] بدل [[a.User.Name]]. والطريق الطويل لسه موجود.

لو Admin عرّف method بنفس الاسم ([[Greet]])، بتاعته هي اللي بتتنادى، وتقدر توصل للأصلية بـ [[a.User.Greet()]].

بس ده مش وراثة: Admin مش User. مينفعش تبعت Admin لدالة مستنية User. اللي يخليه يتعامل كأنه حاجة تانية هو الـ interfaces (المستوى ٢): لو Admin عنده الـ methods المطلوبة، بيحقق الـ interface.

وبتلاقي embedding كتير في المكتبة القياسية: struct فيه [[sync.Mutex]] embedded فتكتب [[c.Lock()]] على طول، أو interfaces بتتجمع من بعض ([[io.ReadWriter]] = Reader + Writer).`,
          example: R`package main

import "fmt"

type Audit struct {
  CreatedBy string
}

func (a Audit) Describe() string {
  return "created by " + a.CreatedBy
}

type User struct {
  Name string
}

func (u User) Greet() string {
  return "أهلًا " + u.Name
}

type Admin struct {
  User
  Audit
  Level int
}

// Admin بيغطّي Greet بتاعة User، ولسه يقدر يناديها
func (a Admin) Greet() string {
  return a.User.Greet() + " (admin)"
}

func main() {
  a := Admin{
    User:  User{Name: "Mona"},
    Audit: Audit{CreatedBy: "system"},
    Level: 2,
  }
  fmt.Println(a.Name, a.Level)
  fmt.Println(a.Greet())
  fmt.Println(a.User.Greet())
  fmt.Println(a.Describe())
}`,
          try: R`ضيف لـ Audit method اسمها [[Greet()]] كمان، وشيل Greet بتاعة Admin. شغّل واقرا الـ error. وبعدين اكتب دالة [[welcome(u User)]] وجرّب تبعتلها [[a]] ثم [[a.User]].`,
          flag: "script",
          deep: {
            why: R`الوراثة العميقة (A يورث B يورث C) بتعمل كود صعب تتبعه وتغيّره. Go اختارت composition: تبني النوع من أجزاء صغيرة، وكل جزء ليه شغلانة واضحة، والـ interfaces هي اللي بتوحّد السلوك.`,
            how: R`الحقل الـ embedded اسمه هو اسم النوع: [[a.User]] و [[a.Audit]]. عشان كده في الـ literal بتكتب [[User: User{...}]].

لما Go تدوّر على [[a.Greet]] بتبدأ من Admin نفسه، ولو ملقتش تنزل مستوى (User و Audit). لو لقت نفس الاسم في نوعين على نفس المستوى، ومفيش واحد في Admin نفسه يحسم، بيبقى ambiguous: الـ compiler بيرفض الاستدعاء ([[ambiguous selector a.Greet]]) بس مش بيرفض التعريف.

الـ method اللي اتطلعت لفوق لسه الـ receiver بتاعها User، مش Admin. فلو User.Greet نادت method تانية، هتنادي بتاعة User حتى لو Admin عامل واحدة بنفس الاسم. ده الفرق الأساسي عن الوراثة (مفيش virtual methods).

الفاصلة في آخر كل سطر في الـ literal اللي على أكتر من سطر إجبارية (حتى آخر واحد)، عشان الـ compiler بيحط [[;]] لوحده في آخر السطر.`,
            when: R`تشارك حقول وسلوك بين أنواع (timestamps، audit، id). تحط Mutex جوه struct. تلف نوع موجود وتغيّر method واحدة (زي ResponseWriter في الـ middleware، المستوى ٢).`,
            mistakes: R`تفكّر فيها كوراثة وتبعت Admin لدالة مستنية User: [[cannot use a (variable of struct type Admin) as User value]]. وتعمل embed لـ pointer ([[*User]]) وتنسى تديله قيمة فأول وصول يعمل nil pointer panic. وتعمل embed لـ Mutex في struct exported فأي حد بره يقدر يعمل Lock عليه.`
          },
          lines: [
            "باكدج main.",
            "import fmt.",
            "struct صغير لمعلومات الإنشاء.",
            "حقل.",
            "قفلة.",
            "method على Audit.",
            "بترجّع وصف.",
            "قفلة.",
            "struct للمستخدم.",
            "حقل الاسم.",
            "قفلة.",
            "method على User.",
            "ترحيب.",
            "قفلة.",
            "Admin مبني من أجزاء.",
            "User embedded: من غير اسم حقل.",
            "Audit embedded.",
            "حقل عادي.",
            "قفلة.",
            "Admin بيعرّف Greet بتاعته.",
            "بينادي الأصلية ويضيف عليها.",
            "قفلة.",
            "main.",
            "literal على أكتر من سطر.",
            "اسم الحقل الـ embedded = اسم النوع.",
            "نفس الكلام.",
            "والفاصلة في آخر كل سطر إجبارية.",
            "قفلة.",
            R`[[a.Name]] طالع من User.`,
            "بتاعة Admin.",
            "الأصلية بتاعة User.",
            "طالعة من Audit.",
            "قفلة."
          ],
          sol: R`الناتج:
[[Mona 2]]
[[أهلًا Mona (admin)]]
[[أهلًا Mona]]
[[created by system]]

لما Audit و User الاتنين عندهم Greet ومفيش واحدة في Admin: [[a.Greet()]] بيطلع [[ambiguous selector a.Greet]]. الـ compiler مش بيختار بالنيابة عنك، فلازم تكتب [[a.User.Greet()]] أو تعرّف Greet على Admin.

و [[welcome(a)]] بيطلع [[cannot use a (variable of struct type Admin) as User value in argument to welcome]]، و [[welcome(a.User)]] شغالة. يعني Admin مش User.`
        }
      ]
    }
]);

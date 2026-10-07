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
          teach: R`## البرنامج ده بيعمل إيه؟

بيوريك كل أشكال [[if]] و [[for]] في Go في ملف واحد: if بجملة تمهيدية، والـ loop الكلاسيكية، و for كأنها while، و [[range]] على slice ومعاها [[continue]] و [[break]]، و range على رقم. كل الناتج اللي تحت حقيقي من [[go run .]] جوه [[docker run --rm golang:1.25]] (Go 1.25.14 على لينكس)، في فولدر فيه [[main.go]] و [[go.mod]] مكتوب فيه [[go 1.25]].

---

## ١. أول الملف

~~~go main.go
package main

import (
  "fmt"
  "strconv"
)
~~~

- [[package main]]: الملف ده جزء من باكدج اسمه [[main]]، وده الباكدج الوحيد اللي بيطلع منه برنامج يتشغّل (درس «مقدمة Go»).
- [[import ( ... )]]: لما تستورد أكتر من باكدج بتحطهم بين قوسين، كل واحد في سطر.
- [[fmt]]: الطباعة. و [[strconv]] اختصار string conversion: تحويل بين النصوص والأرقام.

---

## ٢. if بجملة تمهيدية

~~~go main.go
  if n, err := strconv.Atoi("15"); err != nil {
    fmt.Println("مش رقم:", err)
  } else if n%2 == 0 {
    fmt.Println(n, "زوجي")
  } else {
    fmt.Println(n, "فردي")
  }
~~~

### الجملة التمهيدية: [[n, err := strconv.Atoi("15")]]

- [[Atoi]] اختصار ASCII to integer: بتاخد نص وبترجّع **قيمتين**: الرقم، و [[error]] (لو النص مش رقم).
- [[:=]] بتعرّف متغيرين جداد وتديهم القيمتين مرة واحدة.
- الـ [[;]] بتفصل الجملة التمهيدية عن الشرط. يعني Go بتنفّذ اللي قبل [[;]] الأول، وبعدين تقيّم الشرط اللي بعدها.

### الشرط: [[err != nil]]

- [[!=]] «لا يساوي»، و [[nil]] معناها «مفيش قيمة». فالشرط معناه «لو فيه error».
- مفيش أقواس حوالين الشرط، والـ [[{ }]] إجبارية حتى لو جوه سطر واحد.

### [[else if n%2 == 0]]

- [[%]] باقي القسمة. 15 على 2 الباقي 1، فالشرط false.
- [[==]] مقارنة «يساوي» (و [[=]] لوحدها تعيين).
- [[else]] اللي في الآخر: لا ده ولا ده، فبيطبع:

~~~text الناتج
15 فردي
~~~

### n و err عايشين فين؟

جوه الـ if وكل الـ else بتوعها بس. جرّبت أطبع [[n]] بعد قفلة الـ if:

~~~text الناتج: go build
./main.go:14:14: undefined: n
~~~

وده المقصود: المتغير اللي محتاجه للفحص بس ميفضلش سايب في باقي الدالة.

### الشرط لازم bool

لو كتبت [[if count]] و count رقم:

~~~text الناتج: go build
./main.go:7:5: non-boolean condition in if statement
~~~

Go مبتعتبرش 0 «false» زي C و JavaScript. لازم تكتب المقارنة بنفسك [[if count > 0]].

---

## ٣. الـ for الكلاسيكية

~~~go main.go
  for i := 0; i < 3; i++ {
    fmt.Print(i, " ")
  }
  fmt.Println()
~~~

٣ أجزاء مفصولين بـ [[;]]:

| الجزء | معناه | بيتنفّذ إمتى |
|---|---|---|
| [[i := 0]] | البداية: متغير جديد | مرة واحدة قبل أول لفّة |
| [[i < 3]] | الشرط | قبل كل لفّة، ولو false الـ loop تخلص |
| [[i++]] | الخطوة: زوّد واحد | بعد كل لفّة |

- [[fmt.Print]] زي [[Println]] بس من غير سطر جديد في الآخر. وبتحط مسافة بين قيمتين بس لو **الاتنين** مش نصوص، فـ [[Print(i, " ")]] مبتزودش مسافة من عندها (جرّبت [[fmt.Print("a", "b", 1, 2, "c")]] وطلّع [[ab1 2c]]: المسافة جت بين 1 و 2 بس).
- [[fmt.Println()]] من غير حاجة: سطر جديد بس.

~~~text الناتج
0 1 2 
~~~

(فيه مسافة بعد الـ 2 لأننا طبعنا [[" "]] بعد كل رقم.)

---

## ٤. for كأنها while

~~~go main.go
  balance := 100
  for balance > 30 {
    balance -= 40
  }
  fmt.Println("balance:", balance)
~~~

- for بشرط بس: «طول ما الشرط صح لف». ده الـ while بتاع اللغات التانية، و Go مفيهاش كلمة while أصلًا.
- [[-=]]: اطرح وخزّن، يعني [[balance = balance - 40]].
- اللفّات: 100 أكبر من 30 فتبقى 60، و 60 أكبر من 30 فتبقى 20، و 20 مش أكبر من 30 فتقف.

~~~text الناتج
balance: 20
~~~

---

## ٥. range ومعاها continue و break

~~~go main.go
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
~~~

- [[[]int{...}]]: slice أرقام (ليها درس في القسم الجاي).
- [[for i, p := range prices]]: لكل عنصر، [[i]] مكانه (index من 0) و [[p]] قيمته.
- [[continue]]: سيب باقي اللفّة دي وروح للي بعدها. فالـ 0 مش هيتطبع.
- [[break]]: اخرج من الـ loop كلها. فلما وصلنا 300 وقفنا، و 80 عمرها ما اتشافت.

| i | p | اللي حصل |
|---|---|---|
| 0 | 50 | اتطبع |
| 1 | 0 | continue |
| 2 | 120 | اتطبع |
| 3 | 300 | break، والـ loop خلصت |
| 4 | 80 | مش هتوصله |

~~~text الناتج
0 50
2 120
~~~

### p نسخة

p نسخة من العنصر. جرّبت [[for _, v := range items { v *= 10 }]] على [[[]int{1, 2, 3}]] والـ slice فضلت [[[1 2 3]]]. ولما كتبت [[items[i] *= 10]] بالـ index بقت [[[10 20 30]]]. و [[_]] مكان i معناها «مش محتاج القيمة دي».

---

## ٦. range على رقم (Go 1.22+)

~~~go main.go
  for i := range 3 {
    fmt.Print(i*i, " ")
  }
  fmt.Println()
~~~

[[range 3]] بتلف من 0 لـ 2، وبنطبع المربع [[i*i]]:

~~~text الناتج
0 1 4 
~~~

ده محتاج إن [[go.mod]] يقول [[go 1.22]] أو أحدث. لما غيّرته لـ [[go 1.21]]:

~~~text الناتج: go build
./main.go:6:17: cannot range over 3 (untyped int constant): requires go1.22 or later (-lang was set to go1.21; check go.mod)
~~~

---

## ٧. break جوه switch جوه for

ده فخ مشهور. جرّبت:

~~~go main.go
for i := 0; i < 5; i++ {
	switch i {
	case 2:
		break
	}
	fmt.Print(i, " ")
}
~~~

~~~text الناتج
0 1 2 3 4 
~~~

الـ [[break]] خرجت من الـ switch بس، والـ for كمّلت. عشان تخرج من الـ for تحط **label** (اسم وبعده [[:]]) قبلها:

~~~go main.go
outer:
	for i := 0; i < 5; i++ {
		switch i {
		case 2:
			break outer
		}
		fmt.Print(i, " ")
	}
~~~

~~~text الناتج
0 1 
~~~

---

## ٨. الحل

### FizzBuzz

~~~go solCode
for i := 1; i <= 15; i++ {
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
~~~

- [[i <= 15]]: لحد 15 ومعاها (أقل من أو يساوي).
- [[switch]] من غير قيمة: كل [[case]] شرط، وأول واحد صح بيتنفّذ (درس switch الجاي).
- [[i%15 == 0]] الأول: الرقم اللي بيقبل القسمة على 3 و 5 مع بعض بيقبل القسمة على 15. لو حطيته في الآخر، 15 هتقف عند [[i%3 == 0]] وتطبع Fizz بس.

~~~text الناتج (أول ١٥ سطر)
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
~~~

### أول رقم أكبر من 10

~~~go solCode
for _, n := range []int{3, 8, 12, 7} {
  if n > 10 {
    fmt.Println(n)
    break
  }
}
~~~

- الـ slice مكتوبة جوه الـ range على طول من غير متغير.
- أول ما نلاقي رقم أكبر من 10 نطبعه و [[break]]، فالـ 7 مش بتتفحص.

~~~text الناتج
12
~~~

---

## الخلاصة

| الشكل | بيتكتب | زي |
|---|---|---|
| if بتمهيد | [[if x, err := f(); err != nil { }]] | متغيرات عايشة جوه الـ if بس |
| كلاسيكي | [[for i := 0; i < n; i++ { }]] | for في C |
| بشرط | [[for cond { }]] | while |
| للأبد | [[for { }]] | while true، وتخرج بـ break أو return |
| range | [[for i, v := range s { }]] | foreach، و v نسخة |
| على رقم | [[for i := range n { }]] | من 0 لـ n-1 (Go 1.22+) |

- الشرط لازم bool، ومفيش أقواس، والـ [[{ }]] إجبارية.
- [[continue]] للّفّة اللي بعدها، و [[break]] تخرج من أقرب for أو switch أو select، ولـ for أبعد استخدم label.`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

فيه ٣ أشكال لـ [[switch]]: من غير قيمة (كل case شرط) في [[grade]]، وعلى قيمة محسوبة في [[httpClass]]، وعلى قيمة نصية في [[main]]. الناتج اللي تحت من [[go run .]] في [[golang:1.25]] على لينكس.

---

## ١. [[grade]]: switch من غير قيمة

~~~go main.go
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
~~~

- [[func grade(score int) string]]: دالة اسمها grade، بتاخد [[score]] من نوع [[int]] (رقم صحيح)، وبترجّع [[string]].
- [[switch {]] من غير حاجة بعدها: Go بتعتبرها [[switch true]]، يعني «دوّر على أول case شرطه true».
- [[case score >= 85:]]: الشرط وبعده [[:]]، وتحته الكود اللي يتنفّذ.
- [[return]] بترجّع القيمة وتخرج من الدالة كلها، مش من الـ switch بس.
- [[default:]]: لو ولا case نفع.

### الترتيب مهم

الـ cases بتتفحص من فوق لتحت، وأول واحد true بيكسب والباقي ميتفحصش. 90 أكبر من أو يساوي 85، فـ «امتياز». و 70 مش ≥ 85 بس ≥ 65، فـ «جيد». لو حطيت [[score >= 50]] الأول، كل اللي فوق 50 كان هيطلع «مقبول».

---

## ٢. [[httpClass]]: switch على قيمة محسوبة

~~~go main.go
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
~~~

- [[code / 100]]: قسمة بين اتنين int بتطلع int وبترمي الكسر. 404 / 100 = 4، و 201 / 100 = 2، و 100 / 100 = 1. التعبير ده بيتحسب **مرة واحدة** ويتقارن بكل case.
- [[case 4, 5:]]: أكتر من قيمة في نفس الـ case بفاصلة: «4 أو 5».
- مفيش [[default]]: لو ولا case طابق (زي 1)، الـ switch بيخلص من غير ما يعمل حاجة، والكود بيكمّل لـ [[return "unknown"]].

### ليه السطر الأخير لازم؟

الدالة اللي بترجّع قيمة لازم يبقى فيها return في كل طريق. شيلت [[return "unknown"]] وعملت build:

~~~text الناتج: go build
./main.go:10:1: missing return
~~~

---

## ٣. [[main]]: switch على نص

~~~go main.go
  day := "fri"
  switch day {
  case "fri", "sat":
    fmt.Println("أجازة")
  case "sun":
    fmt.Println("أول الأسبوع")
  default:
    fmt.Println("يوم شغل")
  }
~~~

- [[switch day]]: قارن قيمة [[day]] بكل case.
- [[case "fri", "sat":]] طابق، فاتطبع «أجازة» والـ switch **خلص لوحده**. مفيش [[break]] زي C و JavaScript، ومفيش خطر إن الكود «يسيح» على الـ case اللي بعده.
- ولو كررت نفس القيمة في case تاني الـ compiler بيمسكها:

~~~text الناتج: go build (case "fri" مكرر)
./main.go:10:7: duplicate case "fri" (constant of type string) in expression switch
	./main.go:8:7: previous case
~~~

~~~go main.go
  fmt.Println(grade(90), grade(70), grade(10))
  fmt.Println(httpClass(201), httpClass(404), httpClass(503), httpClass(100))
~~~

[[Println]] بتاخد أكتر من قيمة وتحط بينهم مسافة:

~~~text الناتج
أجازة
امتياز جيد راسب
success error error unknown
~~~

---

## ٤. [[fallthrough]]: لو عايز تكمّل بقصد

~~~go main.go
switch n := 1; n {
case 1:
	fmt.Println("one")
	fallthrough
case 2:
	fmt.Println("two")
case 3:
	fmt.Println("three")
}
~~~

- [[switch n := 1; n]]: جملة تمهيدية زي if، و n عايش جوه الـ switch بس.
- [[fallthrough]]: نفّذ جسم الـ case اللي بعده **من غير ما تفحص شرطه**. ولازم تبقى آخر سطر في الـ case.

~~~text الناتج
one
two
~~~

الـ three ماتطبعتش: fallthrough بتنزل خطوة واحدة بس.

---

## ٥. الحل: [[shipping]]

~~~go solCode
func shipping(total int, city string) int {
  switch {
  case total >= 1000:
    return 0
  case city == "cairo", city == "giza":
    return 30
  default:
    return 60
  }
}
~~~

- [[total int, city string]]: parameter اتنين من نوعين مختلفين.
- [[case city == "cairo", city == "giza":]]: في switch من غير قيمة، الفاصلة بين شرطين معناها «أو».
- شرط الـ 1000 الأول، عشان طلب الجيزة بـ 1200 ياخد الشحن المجاني.

~~~text الناتج: shipping(1200, "aswan"), (300, "giza"), (300, "aswan"), (1200, "giza")
0 30 60 0
~~~

---

## الخلاصة

| الشكل | بيتكتب | استخدمه لما |
|---|---|---|
| على قيمة | [[switch x { case 1, 2: }]] | بتقارن متغير واحد بقيم ثابتة |
| من غير قيمة | [[switch { case x > 5: }]] | الشروط نطاقات أو مختلفة |
| بتمهيد | [[switch v := f(); v { }]] | محتاج متغير للـ switch بس |

- كل case بيخرج لوحده، و [[fallthrough]] بس اللي بتكمّل للي بعده.
- أول case يطابق يكسب، فرتّب من الأضيق للأوسع.
- [[break]] جوه switch جوه for بتخرج من الـ switch بس (درس «if و for»).`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

٥ دوال صغيرة، كل واحدة بتوريك حاجة: [[add]] الشكل العادي، و [[divmod]] بترجّع قيمتين، و [[minMax]] بـ named results، و [[sum]] بتاخد أي عدد من الأرقام (variadic)، و [[apply]] بتاخد دالة كـ parameter. الناتج من [[go run .]] في [[golang:1.25]] على لينكس.

---

## ١. [[add]]: شكل الدالة

~~~go main.go
func add(a, b int) int {
  return a + b
}
~~~

| الحتة | معناها |
|---|---|
| [[func]] | كلمة تعريف دالة |
| [[add]] | اسمها |
| [[(a, b int)]] | الـ parameters: a و b الاتنين int. لما يبقوا نفس النوع بتكتبه مرة واحدة في الآخر |
| [[int]] بعد القوس | نوع القيمة الراجعة |
| [[return a + b]] | رجّع المجموع |

~~~text الناتج: add(2, 3)
5
~~~

---

## ٢. [[divmod]]: قيمتين راجعين

~~~go main.go
func divmod(a, b int) (int, int) {
  return a / b, a % b
}
~~~

- [[(int, int)]]: لما الدالة بترجّع أكتر من قيمة، الأنواع بتتكتب بين قوسين.
- [[return a / b, a % b]]: القيمتين بفاصلة. [[/]] بين int بتطلع خارج القسمة من غير كسر، و [[%]] الباقي.

~~~go main.go
  q, r := divmod(17, 5)
  fmt.Println(q, r)
~~~

- [[q, r :=]]: استقبل القيمتين في متغيرين جداد. لازم تستقبلهم الاتنين، ولو مش عايز واحد اكتب [[_]] مكانه: [[q, _ := divmod(17, 5)]].
- 17 على 5 = 3 والباقي 2:

~~~text الناتج
3 2
~~~

وده نفس الشكل اللي هتشوفه في كل Go: [[n, err := strconv.Atoi(s)]]، القيمة ومعاها الـ error.

---

## ٣. [[minMax]]: named results

~~~go main.go
// named results: lo و hi متغيرات جاهزة، و return لوحدها بترجّعهم
func minMax(nums []int) (lo, hi int) {
  lo, hi = nums[0], nums[0]
  for _, n := range nums {
    lo = min(lo, n)
    hi = max(hi, n)
  }
  return
}
~~~

- [[//]]: تعليق، Go بتتجاهله.
- [[nums []int]]: الـ parameter slice أرقام.
- [[(lo, hi int)]]: القيم الراجعة ليها **أسامي**. Go بتعملهم متغيرات جوه الدالة من الأول بقيمتهم الصفرية (0).
- [[lo, hi = nums[0], nums[0]]]: [[=]] مش [[:=]] لأنهم متعرّفين خلاص. بنبدأ الاتنين بأول عنصر.
- [[min]] و [[max]]: دوال مبنية في اللغة من Go 1.21، بتاخد قيمتين أو أكتر من نفس النوع ([[min(3, 1, 2)]] طلّعت 1).
- [[return]] لوحدها: رجّع lo و hi بقيمهم الحالية. اسمها naked return.

~~~text الناتج: minMax([]int{7, 2, 9, 4})
2 9
~~~

### slice فاضية

[[nums[0]]] بتفترض إن فيه عنصر. جرّبت [[minMax(nil)]]:

~~~text الناتج
panic: runtime error: index out of range [0] with length 0

goroutine 1 [running]:
main.minMax(...)
	/w/e2b/main.go:6
~~~

**panic** يعني البرنامج وقع وقف، و exit code 2. في كود حقيقي افحص [[len(nums) == 0]] الأول.

---

## ٤. [[sum]]: variadic

~~~go main.go
func sum(nums ...int) int {
  total := 0
  for _, n := range nums {
    total += n
  }
  return total
}
~~~

- [[...int]]: الـ [[...]] **قبل** النوع معناها «أي عدد من القيم، حتى صفر». وجوه الدالة [[nums]] بيبقى [[[]int]] عادي.
- الـ variadic لازم يبقى آخر parameter.
- [[total += n]]: زوّد، يعني [[total = total + n]].

~~~go main.go
  xs := []int{1, 2, 3}
  fmt.Println(sum(), sum(5, 5), sum(xs...))
~~~

- [[sum()]]: من غير قيم، nums فاضية، فالمجموع 0.
- [[sum(5, 5)]]: 10.
- [[sum(xs...)]]: الـ [[...]] **بعد** الـ slice معناها «افرد الـ slice دي كأنها قيم». من غيرها:

~~~text الناتج: go build على sum(xs)
./main.go:9:18: cannot use xs (variable of type []int) as int value in argument to sum
~~~

~~~text الناتج
0 10 6
~~~

> [[sum(xs...)]] مش بتنسخ، بتبعت نفس الـ slice. جرّبت دالة بتعمل [[xs[0] = 99]] جوّاها، والـ slice اللي بره بقت [[[99 2]]].

---

## ٥. [[apply]]: دالة بتاخد دالة

~~~go main.go
func apply(n int, f func(int) int) int {
  return f(n)
}
~~~

- [[f func(int) int]]: parameter اسمه f، **نوعه دالة** بتاخد int وترجّع int. أي دالة بنفس الشكل ينفع تتبعت.
- [[f(n)]]: نادي الدالة اللي جت.

~~~go main.go
  double := func(x int) int { return x * 2 }
  fmt.Println(apply(21, double))
~~~

- [[func(x int) int { ... }]] من غير اسم: **anonymous function**، محطوطة في متغير اسمه double. والدوال في Go قيم زي الأرقام والنصوص.
- [[apply(21, double)]]: apply نادت [[double(21)]]:

~~~text الناتج
42
~~~

وتقدر تشوف نوع أي دالة بـ [[%T]]: [[fmt.Printf("%T", inc)]] لدالة [[func inc(n int)]] طلّع [[func(int)]].

---

## ٦. كل حاجة بتتبعت نسخة

~~~go main.go
func inc(n int) { n++ }

x := 1
inc(x)
fmt.Println(x)
~~~

~~~text الناتج
1
~~~

[[inc]] زوّدت نسختها هي. عشان الدالة تعدّل متغير عندك محتاج pointer (درس [[&]] و [[*]]).

---

## ٧. الحل: [[stats]]

~~~go solCode
func stats(nums ...float64) (avg float64, count int) {
  count = len(nums)
  if count == 0 {
    return 0, 0
  }
  total := 0.0
  for _, n := range nums {
    total += n
  }
  return total / float64(count), count
}
~~~

- [[...float64]]: أي عدد من الأرقام العشرية. [[float64]] رقم بكسور (64 bit).
- [[(avg float64, count int)]]: named results من نوعين مختلفين.
- [[count = len(nums)]]: [[len]] عدد العناصر. و [[=]] لأن count متعرّف في الـ named results.
- [[if count == 0 { return 0, 0 }]]: نخرج قبل القسمة. ممكن تكتب قيم مع [[return]] حتى لو النتايج ليها أسامي.
- [[total := 0.0]]: الـ [[.0]] بتخلي النوع float64 مش int.
- [[float64(count)]]: تحويل. Go مبتقسمش float64 على int. من غير التحويل:

~~~text الناتج: go build
./main.go:3:53: invalid operation: total / count (mismatched types float64 and int)
~~~

~~~text الناتج: stats(), stats(2, 4, 9), stats(prices...) و prices = []float64{10, 20.5}
0 0
5 3
15.25 2
~~~

---

## الخلاصة

| الحاجة | بتتكتب |
|---|---|
| parameters من نفس النوع | [[func add(a, b int) int]] |
| أكتر من قيمة راجعة | [[func f() (int, error)]] واستقبلهم [[v, err := f()]] |
| تجاهل قيمة | [[_]] |
| named results | [[func f() (lo, hi int)]] و [[return]] لوحدها |
| variadic | [[func sum(nums ...int)]]، ونداها بـ slice [[sum(xs...)]] |
| دالة كـ parameter | [[f func(int) int]] |
| anonymous function | [[func(x int) int { return x * 2 }]] |

- كل parameter بيوصل نسخة.
- الـ error آخر قيمة راجعة بالعرف.
- Go مفيهاش default parameters ولا دالتين بنفس الاسم.`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

٣ تجارب على الـ closure: عدّاد بيفتكر رقمه بعد ما الدالة اللي عملته خلصت، و ٣ دوال اتعملوا جوه loop وكل واحدة فاكرة رقم لفّتها، ودالة بتعدّل متغير بره نفسها. الناتج من [[go run .]] في [[golang:1.25]] على لينكس.

---

## ١. [[counter]]: دالة بترجّع دالة

~~~go main.go
func counter() func() int {
  count := 0
  return func() int {
    count++
    return count
  }
}
~~~

### النوع الراجع: [[func() int]]

اقراها: «counter بترجّع **دالة**، والدالة دي مبتاخدش حاجة [[()]] وبترجّع [[int]]». الدوال في Go قيم، فينفع ترجع من دالة زي ما رقم بيرجع.

### الجسم

- [[count := 0]]: متغير محلي جوه counter.
- [[return func() int { ... }]]: بنرجّع دالة من غير اسم (function literal).
- جوّاها [[count++]]: بتزوّد **count بتاع counter**، مش نسخة منه. ده اللي بيخليها closure: الدالة ومعاها المتغيرات اللي «قافلة» عليها من بره.

### الاستخدام

~~~go main.go
  next := counter()
  fmt.Println(next(), next(), next())
  other := counter()
  fmt.Println(other())
~~~

- [[next := counter()]]: counter اشتغلت وخلصت، ورجّعت الدالة الداخلية. و next دلوقتي دالة.
- كل [[next()]] بتزوّد نفس الـ count، فـ 1 ثم 2 ثم 3.
- [[other := counter()]]: نداء جديد لـ counter = [[count := 0]] جديد خالص. فـ other بتبدأ من 1 ومالهاش دعوة بـ next.

~~~text الناتج
1 2 3
1
~~~

### count عايش فين بعد ما counter خلصت؟

المتغيرات المحلية عادةً بتتحط في الـ **stack** وبتتمسح لما الدالة تخلص. بس الـ compiler شايف إن الدالة الراجعة لسه محتاجة count، فبيحطه في الـ **heap** (ذاكرة بتعيش لحد ما محدش يحتاجها، والـ garbage collector بيمسحها بعدين). اسم القرار ده **escape analysis**. تقدر تشوفه بـ [[go build -gcflags=-m]] ([[-gcflags]] بتبعت flags للـ compiler، و [[-m]] بتطبع قراراته):

~~~text الناتج: go build -gcflags=-m (سطور مختارة)
./main.go:4:2: moved to heap: count
./main.go:5:9: func literal escapes to heap
~~~

انت مش محتاج تعمل حاجة، ده بيحصل لوحده.

---

## ٢. closures جوه loop

~~~go main.go
  // من Go 1.22 كل لفّة ليها i جديدة، فكل دالة فاكرة رقمها
  var printers []func()
  for i := range 3 {
    printers = append(printers, func() { fmt.Print(i, " ") })
  }
  for _, p := range printers {
    p()
  }
  fmt.Println()
~~~

- [[var printers []func()]]: slice عناصرها **دوال** من نوع [[func()]] (مبتاخدش ولا بترجّع حاجة). [[var]] من غير قيمة بيعملها فاضية (nil).
- [[append(printers, ...)]]: ضيف عنصر في آخر الـ slice وخزّن النتيجة فيها تاني (ليها درس في القسم الجاي).
- [[func() { fmt.Print(i, " ") }]]: دالة ماسكة [[i]]. **مبتتنفذش هنا**، بتتحفظ بس.
- الـ loop التانية بتنادي كل دالة بـ [[p()]].

~~~text الناتج
0 1 2 
~~~

### ليه مش نفس الرقم ٣ مرات؟

لأن من Go 1.22 كل لفّة ليها **متغير i جديد**، فكل دالة ماسكة واحد مختلف. قبل كده كان i متغير واحد لكل اللفّات، وكل الدوال ماسكة نفس المتغير، وبعد ما الـ loop تخلص قيمته بتبقى آخر قيمة.

والسلوك ده بيتحدد من سطر [[go]] في [[go.mod]]، مش من نسخة Go المتسطبة. جرّبت نفس الفكرة بـ [[go 1.21]] في go.mod (بالـ loop الكلاسيكية، لأن [[range 3]] نفسها محتاجة 1.22):

~~~go main.go (go.mod: go 1.21)
for i := 0; i < 3; i++ {
	printers = append(printers, func() { fmt.Print(i, " ") })
}
~~~

~~~text الناتج بـ Go 1.25 بس go.mod بيقول go 1.21
3 3 3 
~~~

طلعت ٣ (مش ٢)، لأن الـ [[i++]] الأخيرة خلّت i = 3 وبعدها الشرط وقف. ولو لقيت في كود قديم [[i := i]] أول سطر جوه الـ loop: ده كان الحل وقتها، بيعمل نسخة جديدة لكل لفّة.

---

## ٣. closure بتعدّل متغير بره

~~~go main.go
  total := 0
  add := func(n int) { total += n }
  add(10)
  add(5)
  fmt.Println(total)
~~~

- [[add]] دالة في متغير، ماسكة [[total]] نفسه.
- [[add(10)]] ثم [[add(5)]]: total بقى 15 **بره**.

~~~text الناتج
15
~~~

### ماسكة المتغير، مش القيمة

~~~go main.go
x := 1
show := func() { fmt.Println(x) }
x = 2
show()
~~~

~~~text الناتج
2
~~~

الدالة اتعملت و x = 1، بس طبعت 2: هي مش واخدة صورة من القيمة وقت ما اتعملت، هي بتبص على x نفسه وقت ما بتشتغل.

---

## ٤. الحل

~~~go solCode
func makeMultiplier(factor int) func(int) int {
  return func(n int) int { return n * factor }
}
~~~

- بترجّع دالة نوعها [[func(int) int]].
- الدالة الراجعة ماسكة [[factor]]، فـ [[makeMultiplier(2)]] بتطلّع دالة بتضرب في 2، و [[makeMultiplier(3)]] دالة تانية بتضرب في 3، كل واحدة بـ factor بتاعها.

~~~go solCode
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
}
~~~

- [[map[int]int{}]]: map فاضي، مفتاحه int وقيمته int (درس maps). عايش جوه الـ closure، ومحدش بره يقدر يوصله غير عن طريق الدالة.
- [[v, ok := cache[n]]]: «comma ok»: [[ok]] بتبقى true لو المفتاح موجود.
- لو موجود: اطبع «من الكاش» ورجّع المحفوظ. لو لأ: احسب، احفظ، ورجّع.

~~~go main.go
double := makeMultiplier(2)
triple := makeMultiplier(3)
fmt.Println(double(5), triple(5))
square := memo()
fmt.Println(square(4))
fmt.Println(square(4))
~~~

~~~text الناتج
10 15
16
من الكاش
16
~~~

---

## الخلاصة

| الفكرة | المعنى |
|---|---|
| closure | دالة من غير اسم ماسكة متغيرات من بره نفسها |
| [[func() int]] | نوع: دالة مبتاخدش حاجة وبترجّع int |
| كل نداء لـ counter | متغيرات جديدة، يعني closure مستقلة |
| المتغير الممسوك | بيعيش في الـ heap طول ما الدالة عايشة (escape analysis) |
| loop في Go 1.22+ | كل لفّة ليها i جديد، فـ [[0 1 2]] |
| go.mod أقدم من 1.22 | i واحد لكل اللفّات، فـ [[3 3 3]] |

- الـ closure ماسكة **المتغير** مش قيمته، فلو اتغيّر بعدين هتشوف الجديد.
- كذا goroutine بيعدّلوا نفس المتغير الممسوك = data race، محتاج Mutex (المستوى ٢).`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

بيقارن الـ array بالـ slice: array بيتنسخ كله لما تعيّنه، وبعدين slice بتبدأ فاضية ونضيف عليها ٥ أرقام ونتفرج على [[len]] و [[cap]] بعد كل إضافة، وبعدين نقص منها، وفي الآخر slice محجوز لها مساحة من الأول بـ [[make]]. الناتج من [[go run .]] في [[golang:1.25]] على لينكس.

---

## ١. الـ array

~~~go main.go
  // array: الحجم جزء من النوع، والتعيين بينسخ كله
  arr := [3]int{10, 20, 30}
  copyArr := arr
  copyArr[0] = 99
  fmt.Println(arr, copyArr, len(arr))
~~~

- [[[3]int]]: array من **3** أرقام int بالظبط. الرقم بين [[[ ]]] جزء من النوع نفسه، فـ [[[3]int]] و [[[4]int]] نوعين مختلفين. جرّبت أعيّن واحد للتاني:

~~~text الناتج: go build
./main.go:7:17: cannot use a (variable of type [3]int) as [4]int value in variable declaration
~~~

- [[{10, 20, 30}]]: القيم الأولية. الأقواس المعقوفة هنا مش block كود، دي «literal» يعني القيم مكتوبة بإيدك.
- [[copyArr := arr]]: **نسخة كاملة** من التلات عناصر.
- [[copyArr[0] = 99]]: [[[0]]] أول عنصر (العدّ من صفر). التعديل على النسخة بس.
- [[len(arr)]]: عدد العناصر.

~~~text الناتج
[10 20 30] [99 20 30] 3
~~~

الأصل لسه 10. وده سبب إنك نادرًا ما هتستخدم array مباشرة: حجمه ثابت وكل تعيين أو تمرير لدالة بينسخه كله.

---

## ٢. الـ slice: شبّاك على array

[[[]int]] من غير رقم = slice. جوّاها ٣ حاجات بس:

| الحتة | معناها |
|---|---|
| pointer | عنوان أول عنصر في array مستخبي تحت (backing array) |
| [[len]] | عدد العناصر اللي في الشبّاك |
| [[cap]] | المساحة المتاحة في الـ array من أول الشبّاك لآخره |

### nil slice

~~~go main.go
  var s []int
  fmt.Println(s == nil, len(s), cap(s))
~~~

- [[var s []int]] من غير قيمة: القيمة الصفرية للـ slice هي [[nil]] (مفيش array تحت أصلًا).
- [[s == nil]]: الـ slice الوحيدة اللي بتتقارن بـ [[==]] هي مع nil.

~~~text الناتج
true 0 0
~~~

---

## ٣. append وإزاي الـ cap بيكبر

~~~go main.go
  for i := range 5 {
    s = append(s, i*10)
    fmt.Println(len(s), cap(s))
  }
~~~

- [[append(s, i*10)]]: ضيف القيمة في الآخر، و **بترجّع slice جديدة**. عشان كده [[s = ]] قدامها: من غيرها التغيير بيضيع. والـ compiler بيرفض لو نسيت تستخدم النتيجة خالص:

~~~text الناتج: go build على append(s, 1) لوحدها
./main.go:5:2: append(s, 1) (value of type []int) is not used
~~~

اللي بيحصل جوه append:

- لو [[len < cap]]: فيه مكان فاضي، فبتكتب في نفس الـ array.
- لو [[len == cap]]: مفيش مكان، فبتعمل array أكبر، تنسخ القديم فيه، وتضيف.

~~~text الناتج
1 1
2 2
3 4
4 4
5 8
~~~

| الإضافة | len | cap | اللي حصل |
|---|---|---|---|
| 0 | 1 | 1 | nil، فـ array جديد بمكان واحد |
| 10 | 2 | 2 | مليان، فـ array ضعفه |
| 20 | 3 | 4 | مليان، فـ ضعفه |
| 30 | 4 | 4 | كان فيه مكان، نفس الـ array |
| 40 | 5 | 8 | مليان، فـ ضعفه |

الضعف ده للـ slices الصغيرة. بعد 256 عنصر النمو بيقل تدريجيًا لحد حوالي 1.25 مرة، والـ runtime بيقرّب للمقاسات اللي الـ allocator بتاعه بيدّيها. في تجربة أطول على نفس الجهاز الـ cap اتنقل من 512 لـ 848 ثم 1280 ثم 1792 ثم 2560.

---

## ٤. القص

~~~go main.go
  fmt.Println(s, s[1:3], s[:2], s[3:])
~~~

[[s[low:high]]]: من العنصر [[low]] لحد **قبل** [[high]]. ولو سيبت واحد منهم فاضي: من الأول أو لحد الآخر.

| التعبير | العناصر | الناتج |
|---|---|---|
| [[s]] | كله | [[[0 10 20 30 40]]] |
| [[s[1:3]]] | 1 و 2 | [[[10 20]]] |
| [[s[:2]]] | 0 و 1 | [[[0 10]]] |
| [[s[3:]]] | 3 للآخر | [[[30 40]]] |

~~~text الناتج
[0 10 20 30 40] [10 20] [0 10] [30 40]
~~~

القص مش بينسخ: الـ slice الجديدة شبّاك على **نفس** الـ array. وده فخ ليه درس لوحده («copy و slices»).

---

## ٥. [[make]] بمساحة محجوزة

~~~go main.go
  names := make([]string, 0, 10)
  names = append(names, "Ali", "Sara")
  fmt.Println(names, len(names), cap(names))
~~~

- [[make([]string, 0, 10)]]: اعمل slice نصوص، [[len]] = 0 (فاضية) و [[cap]] = 10 (مكان لـ 10 من غير ما تحتاج array جديد).
- [[append]] بتاخد أكتر من قيمة مرة واحدة.

~~~text الناتج
[Ali Sara] 2 10
~~~

لو عارف إنك هتضيف حوالي 10 عناصر، الحجز من الأول بيوفّر النسخ وعمل arrays جديدة كل شوية.

---

## ٦. التجربة

### [[make([]int, 3)]] من غير cap

~~~go main.go
s := make([]int, 3)
s = append(s, 1)
fmt.Println(s, len(s), cap(s))
~~~

~~~text الناتج
[0 0 0 1] 4 6
~~~

الرقم التاني في make هو **الطول**، فالـ slice اتعملت فيها ٣ أصفار، والـ append ضافت **بعدهم**. لو عايزها فاضية بمساحة: [[make([]int, 0, 3)]]، ودي طلّعت [[[1] 1 3]].

### عنصر بره الطول

~~~go main.go
s := []int{1, 2, 3}
fmt.Println(s[5])
~~~

~~~text الناتج
panic: runtime error: index out of range [5] with length 3

goroutine 1 [running]:
main.main()
	/w/e4e/main.go:7 +0x17
exit status 2
~~~

- Go بتشيك على الحدود في كل وصول، فمفيش قراية ذاكرة غلط زي C.
- [[goroutine 1 [running]:]] وتحتها [[main.main()]] والسطر اللي فيه اسم الملف ورقم السطر ([[main.go:7]]): ده المكان اللي وقع.
- [[exit status 2]]: البرنامج خرج بـ 2.
- الـ compiler مبيمسكش ده للـ slices حتى لو الرقم مكتوب ثابت، لأن طول الـ slice بيتعرف وقت التشغيل. الـ array بس (حجمه في النوع) هو اللي بيتمسك وقت الـ build: [[a[5]]] على [[[3]int]] طلّعت [[invalid argument: index 5 out of bounds [0:3]]].

---

## الخلاصة

| | array | slice |
|---|---|---|
| النوع | [[[3]int]] (الحجم جزء منه) | [[[]int]] |
| الحجم | ثابت | بيكبر بـ append |
| التعيين | نسخة كاملة | نسخة من الشبّاك بس، والعناصر مشتركة |
| القيمة الصفرية | أصفار | [[nil]] |

- [[s = append(s, x)]] دايمًا بالـ [[s =]].
- [[make([]T, len, cap)]]: الرقم التاني طول (أصفار)، والتالت مساحة.
- [[s[a:b]]] من a لحد قبل b، ومن غير نسخ.`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

بيوريك الفخ: slice مقصوصة من slice تانية بتشاركها نفس الذاكرة، فالتعديل والـ append بيوصلوا للأصل. وبعدين ٣ طرق للنسخ ([[copy]] و [[slices.Clone]] والقص بـ ٣ أرقام)، وفي الآخر دوال جاهزة من باكدج [[slices]]. الناتج من [[go run .]] في [[golang:1.25]] على لينكس.

---

## ١. القص مش نسخة

~~~go main.go
  a := []int{1, 2, 3, 4, 5}
  b := a[1:3]
  b[0] = 99
  fmt.Println(a, b, len(b), cap(b))
~~~

- [[a[1:3]]]: من العنصر 1 لحد قبل 3، يعني العنصرين 2 و 3. بس b **شبّاك** على نفس الـ array بتاع a، مش array جديد.
- [[b[0] = 99]]: أول خانة في b هي نفسها [[a[1]]].

~~~text الناتج
[1 99 3 4 5] [99 3] 2 4
~~~

### ليه cap(b) = 4؟

الـ cap بيتحسب من أول الشبّاك لآخر الـ array اللي تحت، مش لآخر الشبّاك:

| index في الـ array | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| a | 1 | 99 | 3 | 4 | 5 |
| b | | [[b[0]]] | [[b[1]]] | مكان في الـ cap | مكان في الـ cap |

يعني b شايفة عنصرين، بس قدامها مكان لـ 4.

---

## ٢. append على b بتكتب فوق a

~~~go main.go
  // b فيها مساحة، فالـ append بتكتب فوق a[3]
  b = append(b, 77)
  fmt.Println(a)
~~~

append شافت إن [[len(b) = 2]] أقل من [[cap(b) = 4]]، يعني فيه مكان، فكتبت 77 في الخانة اللي بعد b مباشرة، واللي هي **[[a[3]]]**:

~~~text الناتج
[1 99 3 77 5]
~~~

مفيش error ومفيش تحذير، الـ 4 اختفت بس. ده الـ bug اللي بيطلع رقم غلط في تقرير.

---

## ٣. [[copy]]

~~~go main.go
  c := make([]int, len(a))
  n := copy(c, a)
  c[0] = -1
  fmt.Println(n, a[0], c[0])
~~~

- [[make([]int, len(a))]]: slice جديدة بـ array جديد، طولها زي a (5 أصفار).
- [[copy(dst, src)]]: انسخ العناصر من src لـ dst. الترتيب **الهدف الأول** زي [[dst = src]]. بتنسخ لحد أصغر طول فيهم، وبترجّع عدد اللي اتنسخ.
- [[c[0] = -1]]: التعديل في c بس، لأنهم على arrays مختلفة.

~~~text الناتج
5 1 -1
~~~

### dst طولها صفر

[[copy]] بتشوف **len** مش cap. جرّبت [[var dst []int]] وبعدين [[copy(dst, x)]]:

~~~text الناتج: fmt.Println(copy(dst, x), dst)
0 []
~~~

صفر عناصر اتنسخت. عشان كده لازم [[make([]int, len(src))]] مش [[make([]int, 0, len(src))]].

---

## ٤. [[slices.Clone]]

~~~go main.go
  d := slices.Clone(a[:2])
  d = append(d, 1000)
  fmt.Println(a, d)
~~~

- [[slices.Clone(a[:2])]]: نسخة مستقلة من أول عنصرين، في array جديد **على قدهم بالظبط**.
- فالـ append بعدها ملقتش مكان، فعملت array تالت، و a متلمستش.

~~~text الناتج
[1 99 3 77 5] [1 99 1000]
~~~

### القص بـ ٣ أرقام

[[s[low:high:max]]]: الرقم التالت بيحدد لحد فين الـ cap. فـ [[x[0:1:1]]] شبّاك فيه عنصر واحد و cap = 1، فأي append بعده لازم تعمل array جديد:

~~~go main.go
x := []int{1, 2, 3}
y := x[0:1:1]
y = append(y, 50)
fmt.Println(x, y, cap(x[0:1:1]))
~~~

~~~text الناتج
[1 2 3] [1 50] 1
~~~

x فضلت [[[1 2 3]]]: الـ 50 راحت في array جديد.

---

## ٥. باكدج [[slices]]

~~~go main.go
  nums := []int{5, 2, 8, 1}
  slices.Sort(nums)
  fmt.Println(nums, slices.Contains(nums, 8), slices.Index(nums, 5), slices.Max(nums))
~~~

| الدالة | بتعمل إيه | هنا |
|---|---|---|
| [[slices.Sort(nums)]] | ترتّب **في مكانها** (in place)، ومبترجّعش حاجة | [[[1 2 5 8]]] |
| [[slices.Contains(nums, 8)]] | موجود ولا لأ | [[true]] |
| [[slices.Index(nums, 5)]] | مكانه، أو -1 لو مش موجود | [[2]] |
| [[slices.Max(nums)]] | أكبر قيمة | [[8]] |

~~~text الناتج
[1 2 5 8] true 2 8
~~~

حاجتين جرّبتهم:

- [[slices.Max]] على slice فاضية مبترجّعش صفر، بتوقع البرنامج:

~~~text الناتج
panic: slices.Max: empty list
~~~

- [[a == b]] بين slices مش مسموحة:

~~~text الناتج: go build
./main.go:8:14: invalid operation: a == b (slice can only be compared to nil)
~~~

البديل [[slices.Equal(a, b)]]: [[slices.Equal(x, []int{1, 2, 3})]] طلّعت [[true]].

---

## ٦. التجربة: [[removeAt]]

### الشكل الساذج

~~~go main.go
func removeAtNaive(s []int, i int) []int {
	return append(s[:i], s[i+1:]...)
}
~~~

- [[s[:i]]]: اللي قبل i. و [[s[i+1:]...]]: اللي بعد i، مفرودين كقيم (الـ [[...]] زي [[sum(xs...)]]).
- المشكلة: [[s[:i]]] شبّاك على array بتاع s، و cap بتاعه كبير، فـ append بتكتب فوق s نفسها.

~~~text الناتج: a := []int{1, 2, 3, 4}; r := removeAtNaive(a, 1)
[1 3 4 4] [1 3 4]
~~~

r صح، بس a باظت: العناصر اتزقّت لورا والـ 4 الأخيرة فضلت مكانها.

### الحل

~~~go solCode
func removeAt(s []int, i int) []int {
  out := make([]int, 0, len(s)-1)
  out = append(out, s[:i]...)
  return append(out, s[i+1:]...)
}
~~~

- [[make([]int, 0, len(s)-1)]]: slice جديدة فاضية بمكان لعنصر أقل من s.
- ضيف اللي قبل i، وبعدين اللي بعده. كل الكتابة في array بتاع out.

~~~text الناتج
[1 2 3 4] [1 3 4]
~~~

### [[slices.Delete]]

~~~text الناتج: d := slices.Delete(a, 1, 2) و a = [1 2 3 4]
[1 3 4 0] [1 3 4]
~~~

[[slices.Delete(s, i, j)]] بتشيل من i لحد قبل j **في نفس الـ slice**، ومن Go 1.22 بتصفّر الخانات اللي فضيت في الآخر (عشان القديم ميفضلش ماسك ذاكرة). استخدمها لما تكون عايز التعديل في مكانه.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| جزء من slice تقرا منه بس | [[s[a:b]]] عادي |
| نسخة مستقلة | [[slices.Clone(s)]] |
| تنسخ في slice موجودة | [[copy(dst, src)]] و dst طولها كفاية |
| جزء هتعمل عليه append من غير ما يلمس الأصل | [[s[a:b:b]]] أو Clone |
| مقارنة | [[slices.Equal]] |
| ترتيب وبحث | [[slices.Sort]] و [[slices.Contains]] و [[slices.Index]] |

- slice من slice = نفس الـ array، فالتعديل والـ append ممكن يوصلوا للأصل.
- [[copy]] بتشوف len مش cap.`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

مخزن فاكهة صغير في [[map]]: نضيف ونعدّل ونقرا، ونفرّق بين «مش موجود» و «موجود وقيمته صفر» بـ comma ok، ونمسح، ونطبع مترتب. وبعدين نعدّ كلمات، وفي الآخر nil map. الناتج من [[go run .]] في [[golang:1.25]] على لينكس.

---

## ١. الـ imports

~~~go main.go
import (
  "fmt"
  "maps"
  "slices"
)
~~~

- [[maps]]: دوال للـ maps (هنستخدم منها [[maps.Keys]]).
- [[slices]]: عشان نرتّب المفاتيح.

---

## ٢. إنشاء وإضافة وتعديل

~~~go main.go
  stock := map[string]int{"apple": 5, "banana": 0}
  stock["mango"] = 12
  stock["apple"] += 3
~~~

- [[map[string]int]]: اقراها «map مفتاحه string وقيمته int».
- [[{"apple": 5, "banana": 0}]]: قيم أولية، كل واحدة [[مفتاح: قيمة]].
- [[stock["mango"] = 12]]: لو المفتاح مش موجود بيتضاف، ولو موجود بيتعدّل. نفس السطر للاتنين.
- [[stock["apple"] += 3]]: اقرا 5، زوّد 3، اكتب 8.

---

## ٣. القراية ومشكلة الصفر

~~~go main.go
  fmt.Println(stock["apple"], stock["kiwi"])
~~~

~~~text الناتج
8 0
~~~

[[kiwi]] مش موجود، ومع ذلك مفيش error: الـ map بيرجّع **القيمة الصفرية** للنوع (0 للـ int، و [[""]] للـ string، و [[false]] للـ bool). طب [[banana]] موجود وقيمته 0 برضه. إزاي تفرّق؟

### comma ok

~~~go main.go
  qty, ok := stock["banana"]
  fmt.Println(qty, ok)
~~~

لما تستقبل **قيمتين** من قراية map، التانية [[bool]] بتقول المفتاح موجود ولا لأ. الاسم [[ok]] عرف، مش كلمة محجوزة.

~~~text الناتج
0 true
~~~

موجود وقيمته صفر.

~~~go main.go
  if _, ok := stock["kiwi"]; !ok {
    fmt.Println("kiwi مش موجود")
  }
~~~

- comma ok جوه جملة تمهيدية للـ if (درس «if و for»).
- [[_]]: مش محتاجين القيمة، عايزين ok بس.
- [[!ok]]: الـ [[!]] معناها «مش»، يعني «لو مش موجود».

~~~text الناتج
kiwi مش موجود
~~~

---

## ٤. المسح والطول

~~~go main.go
  delete(stock, "banana")
  fmt.Println(len(stock))
~~~

- [[delete(map, key)]]: دالة مبنية في اللغة. ولو المفتاح مش موجود مبتعملش حاجة ومفيش error.
- [[len(stock)]]: عدد المفاتيح. فضل apple و mango:

~~~text الناتج
2
~~~

---

## ٥. اللف بترتيب

~~~go main.go
  for _, k := range slices.Sorted(maps.Keys(stock)) {
    fmt.Println(k, stock[k])
  }
~~~

### الأول: الترتيب العادي عشوائي

[[for k := range m]] ترتيبه **بيتغيّر من تشغيل للتاني** بقصد، عشان محدش يبني كود على ترتيب مش مضمون. شغّلت نفس البرنامج (map فيه a لـ e) ٤ مرات:

~~~text الناتج: ٤ تشغيلات لـ for k := range m
d e a b c
a b c d e
a b c d e
b c d e a
~~~

### نفك السطر من جوه لبرة

1. [[maps.Keys(stock)]]: بترجّع المفاتيح كـ **iterator** (حاجة ينفع تلف عليها بـ range، مش slice)، وبنفس الترتيب العشوائي.
2. [[slices.Sorted(...)]]: بتلف على الـ iterator، تجمع القيم في slice جديدة، وترتّبها. (الاتنين من Go 1.23.)
3. [[range]] على الـ slice المترتبة، و [[stock[k]]] تجيب القيمة.

~~~text الناتج
apple 8
mango 12
~~~

---

## ٦. عدّاد كلمات

~~~go main.go
  counts := make(map[string]int)
  for _, w := range []string{"go", "is", "go"} {
    counts[w]++
  }
  fmt.Println(counts)
~~~

- [[make(map[string]int)]]: map فاضي جاهز للكتابة. (زي [[map[string]int{}]].)
- [[counts[w]++]]: من غير ما تشيك إذا كان موجود. لو مش موجود القراية بترجّع 0، فبيبقى 1.
- [[fmt.Println]] على map بتطبعه بمفاتيح **مترتبة** عشان الناتج يبقى ثابت. ده في الطباعة بس، مش في range.

~~~text الناتج
map[go:2 is:1]
~~~

---

## ٧. nil map

~~~go main.go
  var empty map[string]int
  fmt.Println(empty["x"], len(empty))
~~~

- [[var]] من غير [[make]]: القيمة الصفرية للـ map هي [[nil]].
- القراية منه والـ len شغالين:

~~~text الناتج
0 0
~~~

### التجربة: الكتابة فيه

~~~go main.go
  empty["x"] = 1
~~~

~~~text الناتج
panic: assignment to entry in nil map

goroutine 1 [running]:
main.main()
	/w/e6a/main.go:8 +0xa8
exit status 2
~~~

الحل [[empty = make(map[string]int)]] قبلها. وده بيحصل كتير مع struct فيه حقل map محدش عمله make.

---

## ٨. حاجات الـ compiler بيرفضها

| الكود | الرسالة |
|---|---|
| map مفتاحه [[[]int]] | [[invalid map key type []int]] |
| [[m["a"].Count++]] و القيمة struct | [[cannot assign to struct field m["a"].Count in map]] |

- المفتاح لازم يتقارن بـ [[==]]، والـ slice مبتتقارنش.
- القيمة اللي في map مش متغير ليه عنوان ثابت (الـ map بينقل القيم لما يكبر)، فمينفعش تعدّل حقل جوّاها. اقرا في متغير، عدّل، واكتب تاني، أو خلي القيمة pointer.

---

## ٩. التجربة: الكلمات مترتبة بالعدد

~~~go solCode
counts := map[string]int{}
for _, w := range strings.Fields("go is simple and go is fast") {
  counts[w]++
}
words := slices.Collect(maps.Keys(counts))
slices.SortFunc(words, func(a, b string) int {
  return cmp.Compare(counts[b], counts[a])
})
for _, w := range words {
  fmt.Println(w, counts[w])
}
~~~

- [[strings.Fields(s)]]: بتقطّع النص على المسافات وترجّع [[[]string]].
- [[slices.Collect(maps.Keys(counts))]]: اجمع المفاتيح في slice من غير ترتيب.
- [[slices.SortFunc(words, func(a, b string) int {...})]]: رتّب بدالة مقارنة بترجّع رقم سالب لو a قبل b، وموجب لو بعدها، وصفر لو زي بعض.
- [[cmp.Compare(x, y)]] (باكدج [[cmp]]): بترجّع -1 لو x أصغر، و 0 لو متساويين، و 1 لو أكبر. وكتبناها [[(counts[b], counts[a])]] **بالعكس** عشان الأكبر ييجي الأول.
- الكود ده محتاج [[import]] لـ [[cmp]] و [[fmt]] و [[maps]] و [[slices]] و [[strings]].

شغّلته مرتين:

~~~text الناتج: أول تشغيل
go 2
is 2
and 1
fast 1
simple 1
~~~

~~~text الناتج: تاني تشغيل
go 2
is 2
simple 1
and 1
fast 1
~~~

الأعداد مترتبة صح، بس الكلمات اللي ليها نفس العدد ترتيبها بيتغيّر، لأنها جاية من map و [[SortFunc]] مش بتحافظ على ترتيبها. لو عايزه ثابت: لما العدد يتساوى قارن بالكلمة نفسها [[cmp.Compare(a, b)]].

---

## الخلاصة

| العملية | الكود |
|---|---|
| إنشاء | [[map[K]V{...}]] أو [[make(map[K]V)]] |
| إضافة أو تعديل | [[m[k] = v]] |
| قراية (مش موجود = صفر) | [[m[k]]] |
| موجود ولا لأ | [[v, ok := m[k]]] |
| مسح | [[delete(m, k)]] |
| ترتيب المفاتيح | [[slices.Sorted(maps.Keys(m))]] |

- range على map ترتيبه عشوائي، و Println بس هي اللي بترتّب.
- nil map: القراية تمام والكتابة panic.
- كتابة من أكتر من goroutine في نفس الوقت محتاجة Mutex.`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

بيوريك الفرق بين إنك تبعت لدالة **نسخة** من رقم وإنك تبعتلها **عنوانه**: [[doubleValue]] بتضرب نسخة فالأصل مبيتغيرش، و [[doublePointer]] بتضرب الأصل نفسه. وبعدين pointer في متغير، ودالة بترجّع عنوان متغير محلي، و pointer فاضي ([[nil]]). الناتج من [[go run .]] في [[golang:1.25]] على لينكس.

---

## ١. الرمزين

| الرمز | قدام إيه | معناه | مثال |
|---|---|---|---|
| [[&]] | متغير | «عنوانه في الذاكرة» | [[&x]] |
| [[*]] | نوع | «pointer لـ» | [[*int]] = pointer لـ int |
| [[*]] | متغير pointer | «القيمة اللي في العنوان ده» | [[*p = 100]] |

نفس الـ [[*]] بمعنيين: في **النوع** معناها «pointer لـ»، وقدام **متغير** معناها «روح للعنوان وهات أو اكتب القيمة» (اسمها dereference).

---

## ٢. نسخة ولا عنوان

~~~go main.go
func doubleValue(n int) {
  n *= 2
}

func doublePointer(n *int) {
  *n *= 2
}
~~~

- [[doubleValue(n int)]]: n نسخة. [[n *= 2]] يعني [[n = n * 2]] على النسخة، والنسخة بتتمسح لما الدالة تخلص.
- [[doublePointer(n *int)]]: n نوعها [[*int]]، يعني جواها **عنوان** مش رقم.
- [[*n *= 2]]: روح للعنوان، اضرب اللي هناك في 2، واكتبه هناك.

~~~go main.go
  x := 10
  doubleValue(x)
  fmt.Println(x)
  doublePointer(&x)
  fmt.Println(x)
~~~

- [[doubleValue(x)]]: اتبعت 10، والنسخة بقت 20 واتمسحت.
- [[doublePointer(&x)]]: [[&x]] عنوان x. الدالة كتبت في العنوان ده، يعني في x نفسه.

~~~text الناتج
10
20
~~~

---

## ٣. pointer في متغير

~~~go main.go
  p := &x
  *p = 100
  fmt.Println(x, *p, p != nil)
~~~

- [[p := &x]]: p نوعها [[*int]] (جرّبت [[fmt.Printf("%T", p)]] وطلّع [[*int]]). [[%T]] بتطبع النوع.
- [[*p = 100]]: اكتب 100 في العنوان، فـ x بقى 100.
- [[*p]] في الطباعة: اقرا اللي في العنوان، 100.
- [[p != nil]]: p بيشاور على حاجة فعلًا، فـ true.

~~~text الناتج
100 100 true
~~~

ولو طبعت [[p]] نفسه من غير [[*]] هتشوف العنوان بالـ hex (أرقام بأساس 16): مرة طلّع [[0xc000194008]] والمرة اللي بعدها [[0xc00011a008]]، يعني بيتغير كل تشغيل.

---

## ٤. ترجيع عنوان متغير محلي

~~~go main.go
func newCounter() *int {
  c := 0
  return &c
}
~~~

- بترجّع [[*int]].
- [[return &c]]: عنوان متغير محلي. في C ده bug (المتغير بيتمسح والعنوان بيشاور على زبالة). في Go **آمن**: الـ compiler بيشوف إن العنوان طالع بره الدالة فبيحط c في الـ heap (escape analysis، شفناها في درس closures).

~~~go main.go
  c := newCounter()
  *c++
  fmt.Println(*c)
~~~

- [[*c++]]: زوّد **القيمة** اللي c بيشاور عليها (0 تبقى 1). Go مفيهاش حسابات على العناوين، فمفيش معنى لـ «زوّد العنوان».

~~~text الناتج
1
~~~

ونفس الحاجة في سطر: [[new(int)]] بتعمل int جديد بصفر وترجّع عنوانه. [[q := new(int)]] و [[fmt.Println(*q)]] طلّعت [[0]].

---

## ٥. pointer فاضي: [[nil]]

~~~go main.go
  var missing *int
  fmt.Println(missing == nil)
~~~

القيمة الصفرية لأي pointer هي [[nil]]: مش بيشاور على حاجة.

~~~text الناتج
true
~~~

### التجربة: [[*missing]]

ضفت [[fmt.Println(*missing)]] كسطر أخير في main (السطر 35 في الملف):

~~~text الناتج
panic: runtime error: invalid memory address or nil pointer dereference
[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x4986af]

goroutine 1 [running]:
main.main()
	/w/e7b/main.go:35 +0x1ef
exit status 2
~~~

اقراها من فوق لتحت:

- [[invalid memory address or nil pointer dereference]]: حاولت تقرا من عنوان nil.
- [[SIGSEGV]]: إشارة من نظام التشغيل اسمها segmentation violation، يعني البرنامج لمس ذاكرة مش بتاعته. و [[addr=0x0]]: العنوان صفر، يعني nil.
- [[goroutine 1 [running]:]] وتحتها الدوال اللي كانت شغالة، الأحدث فوق. أول سطر من ملفاتك انت ([[main.go:35]]) هو المكان.

أشهر سبب في الكود الحقيقي: دالة رجّعت [[nil, err]] وانت استخدمت القيمة من غير ما تشيك على err.

---

## ٦. لازم & لما الدالة هتكتب

[[json.Unmarshal]] بتكتب في المتغير اللي تديهولها، فلازم عنوانه. جرّبت أبعت [[u]] من غير [[&]]:

~~~text الناتج: go vet
./main.go:12:23: call of Unmarshal passes non-pointer as second argument
~~~

~~~text الناتج: go run
json: Unmarshal(non-pointer main.User) {}
<nil> {Sara}
~~~

السطر الأول بـ [[u]]: error و u فاضي. التاني بـ [[&u]]: مفيش error ([[<nil>]]) و u اتملى. و [[go vet]] مسكها قبل التشغيل.

---

## ٧. الحل: [[swap]]

~~~go solCode
func swap(a, b *int) {
  *a, *b = *b, *a
}

x, y := 1, 2
swap(&x, &y)
fmt.Println(x, y)
~~~

- [[a, b *int]]: الاتنين عناوين.
- [[*a, *b = *b, *a]]: تعيين متعدد. Go بتحسب كل اللي على اليمين الأول (القيمتين 2 و 1)، وبعدين تكتبهم في العنوانين. فمش محتاج متغير مؤقت.
- [[swap(&x, &y)]]: ابعت العنوانين.

~~~text الناتج
2 1
~~~

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[&x]] | عنوان x |
| [[*int]] | نوع: pointer لـ int |
| [[*p]] | القيمة اللي p بيشاور عليها (قراية أو كتابة) |
| [[nil]] | pointer مش بيشاور على حاجة |
| [[new(T)]] | T جديد بصفر وعنوانه |

- Go بتبعت نسخ، فالدالة اللي لازم تعدّل تاخد pointer.
- ترجيع [[&local]] آمن.
- [[*p]] و p بـ nil = panic، فشيك على err الأول.
- الـ slices والـ maps مش محتاجين pointer عشان تعدّل عناصرهم.`,
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
وتحت [[goroutine 1 [running]:]] و [[main.main()]] وسطر زي [[/w/main.go:35 +0x1ef]] (لما السطر الجديد يبقى آخر سطر في main، يعني السطر 35): ده رقم السطر اللي وقع. اقرا الـ stack trace من فوق لتحت ودوّر على أول سطر من ملفاتك انت.`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

بيعرّف نوع [[User]] بـ ٣ حقول، ودالة [[NewUser]] بتجهّزه، و ٣ methods: واحدة بتقرا ([[Label]])، وواحدة بتعدّل صح ([[AddPoints]] بـ pointer receiver)، وواحدة بتحاول تعدّل وتفشل ([[ResetWrong]] بـ value receiver). الناتج من [[go run .]] في [[golang:1.25]] على لينكس.

---

## ١. تعريف الـ struct

~~~go main.go
type User struct {
  Name  string
  Email string
  Score int
}
~~~

- [[type User struct { ... }]]: عرّف نوع جديد اسمه User، وهو struct: مجموعة حقول بأسماء.
- كل سطر: اسم الحقل ونوعه. والمسافات اللي بتصف الأنواع تحت بعض من [[go fmt]].
- الحرف الكبير في [[Name]] و [[Email]] و [[Score]] معناه **exported**: متاح بره الباكدج، و [[encoding/json]] بيشوفه. لو كتبت [[name]] بحرف صغير يبقى خاص بالباكدج بس.

---

## ٢. [[NewUser]]: الـ constructor بالعرف

~~~go main.go
func NewUser(name, email string) *User {
  return &User{Name: name, Email: email}
}
~~~

- Go مفيهاش constructors. العرف دالة عادية اسمها [[New]] + اسم النوع.
- [[User{Name: name, Email: email}]]: **struct literal** بأسماء الحقول. [[Score]] متكتبش فبياخد القيمة الصفرية 0.
- [[&User{...}]]: اعمل struct جديد ورجّع **عنوانه**، فالنوع الراجع [[*User]].

---

## ٣. الـ methods والـ receiver

الـ method دالة قبل اسمها قوسين فيهم **receiver**: المتغير اللي الـ method بتشتغل عليه، زي [[this]] أو [[self]] في لغات تانية بس بتسمّيه انت.

### value receiver: [[(u User)]]

~~~go main.go
func (u User) Label() string {
  return fmt.Sprintf("%s (%d)", u.Name, u.Score)
}
~~~

- [[(u User)]]: u **نسخة** من الـ User اللي ناديت عليه.
- [[fmt.Sprintf]]: زي Printf بس بترجّع النص بدل ما تطبعه. [[%s]] مكان نص و [[%d]] مكان رقم صحيح (درس «fmt و Printf»).
- Label بتقرا بس، فالنسخة مش مشكلة.

### pointer receiver: [[(u *User)]]

~~~go main.go
func (u *User) AddPoints(pts int) {
  u.Score += pts
}
~~~

- [[(u *User)]]: u **عنوان** الـ User الأصلي.
- [[u.Score]]: Go بتكتبها لوحدها [[(*u).Score]]، فمش محتاج تكتب النجمة. والتعديل بيوصل للأصل.

### value receiver بيحاول يعدّل

~~~go main.go
// value receiver: u نسخة، فالتصفير ده مش هيوصل
func (u User) ResetWrong() {
  u.Score = 0
}
~~~

صفّرت النسخة، والنسخة اتمسحت لما الـ method خلصت. ومفيش أي تحذير: [[go vet]] على الملف ده مطلّعش حاجة.

---

## ٤. main

~~~go main.go
  u := User{Name: "Sara", Email: "sara@example.com", Score: 10}
  u.AddPoints(5)
  u.ResetWrong()
  fmt.Println(u.Label())
~~~

- [[u]] قيمة عادية (مش pointer)، Score = 10.
- [[u.AddPoints(5)]]: الـ method عايزة [[*User]] و u قيمة. Go بتاخد العنوان لوحدها: [[(&u).AddPoints(5)]]. فـ Score بقى 15.
- [[u.ResetWrong()]]: اتبعتلها نسخة، وصفّرتها هي. u لسه 15.

~~~text الناتج
Sara (15)
~~~

~~~go main.go
  p := NewUser("Ali", "ali@example.com")
  p.AddPoints(3)
  fmt.Println(p.Label(), p.Email)
~~~

- [[p]] نوعها [[*User]].
- [[p.AddPoints(3)]]: الـ receiver pointer، و p pointer، فمباشرة.
- [[p.Label()]]: Label عايزة قيمة و p pointer، فـ Go بتعمل [[(*p).Label()]] لوحدها.
- [[p.Email]]: الحقول برضه من غير نجمة.

~~~text الناتج
Ali (3) ali@example.com
~~~

~~~go main.go
  var empty User
  fmt.Printf("%+v\n", empty)
~~~

- [[var empty User]]: struct كل حقوله بالقيمة الصفرية.
- [[%+v]]: اطبع القيمة **بأسماء الحقول**. ([[%v]] لوحدها بتطبع القيم بس.) و [[\n]] سطر جديد لأن Printf مبتزودوش.

~~~text الناتج
{Name: Email: Score:0}
~~~

النصوص الفاضية مش باينة، فـ [[Name:]] وبعدها على طول [[Email:]].

---

## ٥. struct فيه Mutex لازم pointer

[[sync.Mutex]] (قفل للـ goroutines، المستوى ٢) مينفعش يتنسخ. كتبت method بـ value receiver على struct فيه Mutex، و [[go vet]] مسكها:

~~~text الناتج: go vet
./main.go:13:9: Get passes lock by value: demo.Counter contains sync.Mutex
~~~

يعني vet مبيمسكش «تعديل ضاع» زي ResetWrong، بس بيمسك «نسخت قفل».

---

## ٦. التجربة: [[Cart]]

~~~go solCode
type Item struct {
  Name  string
  Price float64
  Qty   int
}

type Cart struct {
  Items []Item
}
~~~

- [[Item]]: منتج بسعر عشري وكمية.
- [[Cart]]: فيها حقل [[Items]] نوعه slice من Item. القيمة الصفرية nil slice، و append عليها شغالة، فمش محتاجين [[NewCart]].

~~~go solCode
func (c *Cart) Add(it Item) {
  c.Items = append(c.Items, it)
}
~~~

pointer receiver: [[append]] بترجّع slice جديدة، ولازم تتخزن في الحقل **الأصلي**.

~~~go solCode
func (c *Cart) Total() float64 {
  total := 0.0
  for _, it := range c.Items {
    total += it.Price * float64(it.Qty)
  }
  return total
}
~~~

- Total بتقرا بس، فـ value receiver كان هيشتغل. بس خليناها pointer عشان كل methods النوع تبقى شكل واحد.
- [[float64(it.Qty)]]: تحويل الكمية لعشري عشان تتضرب في السعر.

~~~go main.go
var c Cart
c.Add(Item{"tea", 25.5, 2})
c.Add(Item{"sugar", 30, 1})
fmt.Println(c.Total(), len(c.Items))
~~~

- [[Item{"tea", 25.5, 2}]]: literal **من غير أسماء**، القيم بترتيب الحقول. أقصر بس لازم تكتب كل الحقول، وبيبوظ لو حد زوّد حقل.
- 25.5 × 2 + 30 × 1 = 81.

~~~text الناتج
81 2
~~~

### لو Add بقت value receiver

عملت نسخة [[Cart2]] نفس الكود بس [[func (c Cart2) Add(...)]]:

~~~text الناتج: c2.Add(...) ثم fmt.Println(c2.Total(), len(c2.Items))
0 0
~~~

الإضافة حصلت في نسخة واتمسحت، والسلة الأصلية فضيت فاضية.

---

## الخلاصة

| الحاجة | الكود |
|---|---|
| تعريف | [[type User struct { Name string }]] |
| قيمة | [[User{Name: "Sara"}]] والباقي أصفار |
| pointer على طول | [[&User{...}]] |
| constructor بالعرف | [[func NewUser(...) *User]] |
| method بتقرا | [[func (u User) Label() string]] |
| method بتعدّل | [[func (u *User) AddPoints(n int)]] |

- Go بتحوّل [[u.M()]] لـ [[(&u).M()]] أو [[(*p).M()]] لوحدها.
- لو method واحدة بتعدّل، خلي الكل pointer receivers.
- التعديل في value receiver بيضيع من غير أي تحذير.`,
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
          teach: R`## البرنامج ده بيعمل إيه؟

بيبني نوع [[Admin]] من حتتين جاهزين: [[User]] (فيه اسم و method ترحيب) و [[Audit]] (فيه مين عمله و method وصف). Admin بياخد حقولهم و methods بتوعهم كأنها بتاعته، ويغيّر الترحيب بس. الناتج من [[go run .]] في [[golang:1.25]] على لينكس.

---

## ١. الحتت الصغيرة

~~~go main.go
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
~~~

- struct عادي لكل واحد، وكل واحد عليه method بـ value receiver (درس structs).
- [[+]] بين نصين بيلزقهم.

---

## ٢. الـ embedding

~~~go main.go
type Admin struct {
  User
  Audit
  Level int
}
~~~

- [[User]] و [[Audit]] مكتوبين **نوع من غير اسم حقل**. ده الـ embedding.
- [[Level int]]: حقل عادي باسم ونوع.
- الحقل الـ embedded ليه اسم برضه: **اسم النوع نفسه**. فـ [[a.User]] و [[a.Audit]] موجودين.

### promotion

حقول و methods الـ User و الـ Audit «بتطلع» لمستوى Admin:

| تكتب | Go بتفهمها |
|---|---|
| [[a.Name]] | [[a.User.Name]] |
| [[a.Describe()]] | [[a.Audit.Describe()]] |

---

## ٣. Admin بيغطّي Greet

~~~go main.go
// Admin بيغطّي Greet بتاعة User، ولسه يقدر يناديها
func (a Admin) Greet() string {
  return a.User.Greet() + " (admin)"
}
~~~

- Admin عرّف method بنفس اسم واحدة طالعة من User. لما تنادي [[a.Greet()]]، Go بتدوّر في Admin **الأول**، فبتلاقي دي.
- [[a.User.Greet()]]: الطريق الكامل للأصلية لسه شغال، فبنناديها ونزوّد عليها.

---

## ٤. main

~~~go main.go
  a := Admin{
    User:  User{Name: "Mona"},
    Audit: Audit{CreatedBy: "system"},
    Level: 2,
  }
~~~

- [[User: User{Name: "Mona"}]]: اسم الحقل ([[User]]، اسم النوع) وبعده قيمته (struct literal من نوع User).
- **الفاصلة في آخر كل سطر إجبارية، حتى آخر واحد**. Go بتحط [[;]] لوحدها في آخر أي سطر ينفع يخلص فيه statement، والفاصلة بتمنعها. شيلت الفاصلة من آخر سطر:

~~~text الناتج: go build
./main.go:9:24: syntax error: unexpected newline in composite literal; possibly missing comma or }
~~~

~~~go main.go
  fmt.Println(a.Name, a.Level)
  fmt.Println(a.Greet())
  fmt.Println(a.User.Greet())
  fmt.Println(a.Describe())
~~~

| السطر | جاي منين | الناتج |
|---|---|---|
| [[a.Name, a.Level]] | Name طالع من User، و Level بتاع Admin | [[Mona 2]] |
| [[a.Greet()]] | بتاعة Admin | [[أهلًا Mona (admin)]] |
| [[a.User.Greet()]] | الأصلية بتاعة User | [[أهلًا Mona]] |
| [[a.Describe()]] | طالعة من Audit | [[created by system]] |

~~~text الناتج
Mona 2
أهلًا Mona (admin)
أهلًا Mona
created by system
~~~

---

## ٥. ده مش وراثة

### Admin مش User

جرّبت دالة [[welcome(u User)]]:

~~~text الناتج: go build على welcome(a)
./main.go:20:10: cannot use a (variable of struct type Admin) as User value in argument to welcome
~~~

و [[welcome(a.User)]] شغالة، لأنك بتبعت الحقل اللي جوّاه وهو فعلًا User. اللي بيخلي أنواع مختلفة تتبعت لنفس الدالة هو الـ interfaces (المستوى ٢).

### الـ method الطالعة لسه بتاعة User

~~~go main.go
func (u User) Hello() string { return "I am " + u.Kind() }
func (u User) Kind() string  { return "user" }

type Admin struct{ User }

func (a Admin) Kind() string { return "admin" }
~~~

~~~text الناتج: fmt.Println(a.Kind(), "|", a.Hello())
admin | I am user
~~~

[[a.Hello()]] هي [[a.User.Hello()]]، والـ receiver بتاعها User، فلما نادت [[Kind]] نادت بتاعة User مش بتاعة Admin. في لغة فيها وراثة كانت هتطلع «I am admin». ده الفرق الأساسي.

---

## ٦. التجربة: نفس الاسم في اتنين

ضفت [[func (a Audit) Greet() string]] وشيلت Greet بتاعة Admin. دلوقتي User و Audit الاتنين عندهم Greet على نفس المستوى، ومفيش واحدة في Admin تحسم:

~~~text الناتج: go build
./main.go:35:17: ambiguous selector a.Greet
~~~

- التعريف نفسه عدّى، الخطأ في **الاستدعاء** بس ([[a.Greet()]]).
- الـ compiler مبيختارش بالنيابة عنك. الحل: [[a.User.Greet()]] صريحة، أو تعرّف Greet على Admin (زي المثال الأصلي).

---

## الخلاصة

| الحاجة | الكود |
|---|---|
| embed | [[type Admin struct { User; Level int }]] |
| اسم الحقل الـ embedded | اسم النوع: [[a.User]] |
| حقل أو method طالعين | [[a.Name]] و [[a.Describe()]] |
| تغطية method | تعرّفها على Admin بنفس الاسم |
| الوصول للأصلية | [[a.User.Greet()]] |
| نفس الاسم في نوعين embedded | [[ambiguous selector]] لحد ما تحسم |

- embedding = composition: Admin **فيه** User، مش **هو** User.
- الـ method الطالعة الـ receiver بتاعها النوع الداخلي.
- في literal على أكتر من سطر: فاصلة في آخر كل سطر.`,
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

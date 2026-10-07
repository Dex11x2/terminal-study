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
    }
]);

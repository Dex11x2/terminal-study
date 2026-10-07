// تكملة تاب go: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/go/01.js (شرح حقول الدرس في أوله)
MORE("go", [
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

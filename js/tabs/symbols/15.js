// تكملة تاب symbols: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/symbols/01.js (شرح حقول الدرس في أوله)
MORE("symbols", [
    {
      t: "رموز Go",
      l: 3,
      n: ":= و <- و _ و * و & و ... : رموز Go القليلة اللي بتفرق عن باقي اللغات",
      items: [
        {
          cmd: ":= في Go",
          title: "النقطتين ويساوي := في Go: عرّف متغير جديد وحط فيه قيمة، والنوع بيتعرف لوحده",
          desc: R`في Go [[name := "Ali"]] بتعمل متغير جديد اسمه name، ونوعه string من القيمة. ده اختصار [[var name string = "Ali"]].

و [[=]] لوحدها بتغيّر متغير موجود. فـ [[:=]] أول مرة، و [[=]] بعد كده. ولو كتبت [[:=]] لمتغير موجود في نفس الـ scope: [[no new variables on left side of :=]]. استثناء: لو على الشمال متغير واحد على الأقل جديد، زي [[result, err := f()]] و [[err]] موجودة قبل كده، مسموح.

[[:=]] جوه الدوال بس. برة الدوال (package level) لازم [[var]]. ونفس الرمز في Python (walrus) معناه مختلف شوية.`,
          example: R`package main
import "fmt"
func main() {
    name := "Ali"
    age := 20
    age = 21
    n, err := fmt.Println(name, age)
    fmt.Println(n, err)
}`,
          flag: "script",
          try: R`على [[go.dev/play]] شغّل المثال. بعدين غيّر [[age = 21]] لـ [[age := 21]] واقرا الـ error. بعدين ضيف متغير [[x := 1]] ومتستخدموش.`,
          deep: {
            why: R`أكتر سطر هتكتبه في Go. والفرق بين [[:=]] و [[=]] أول حاجة الـ compiler هيزعقلك عليها.`,
            how: R`الـ compiler بيستنتج النوع من اليمين. وجوه بلوك جديد (if أو for) [[:=]] بتعمل متغير جديد بنفس الاسم يغطي على اللي برة (shadowing)، ودي مصدر bugs.`,
            when: R`[[:=]] لأغلب المتغيرات جوه الدوال. [[var x int]] لما عايز القيمة الصفرية من غير قيمة أولية، أو على مستوى الـ package.`,
            mistakes: R`[[:=]] تاني لنفس المتغير. و [[err :=]] جوه if فتعمل err جديدة والبرة متتغيرش. ومتغير متعرّف ومش مستخدم: Go بيرفض يعمل compile ([[declared and not used]]).`
          },
          teach: R`## الفكرة: [[:=]] تعريف جديد، و [[=]] تغيير

في Go [[:=]] (اسمها short variable declaration) بتعمل متغير **جديد** وتحط فيه قيمة، والنوع بيتعرف من القيمة. و [[=]] بتغيّر متغير **موجود**. المثال اتشغّل بـ [[go run]] (Go 1.25) جوه Docker ([[golang:1.25]]).

---

## ١. سطر بسطر

~~~go
package main
import "fmt"
func main() {
~~~

- [[package main]]: كل ملف Go بيبدأ باسم الـ package، و main معناها «ده برنامج يتشغّل» مش مكتبة.
- [[import "fmt"]]: مكتبة الطباعة (fmt من format).
- [[func main()]]: البرنامج بيبدأ من هنا.

~~~go
    name := "Ali"
    age := 20
~~~

متغيرين جداد. Go شاف [["Ali"]] فـ name نوعها [[string]]، وشاف 20 فـ age نوعها [[int]]. جربنا [[fmt.Printf("%T %T", "Ali", 20)]] ([[%T]] بتطبع النوع) وطلع [[string int]].

السطر الأول هو هو [[var name string = "Ali"]]، بس أقصر.

~~~go
    age = 21
~~~

[[=]] من غير [[:]]: age موجودة، احنا بنغيّر قيمتها بس.

~~~go
    n, err := fmt.Println(name, age)
~~~

- [[fmt.Println(name, age)]] بتطبع [[Ali 21]] وسطر جديد.
- وكمان بترجّع **قيمتين**: عدد الـ bytes اللي اتكتبت، و error لو حصلت مشكلة.
- [[n, err :=]]: متغيرين جداد ياخدوا القيمتين.

~~~go
    fmt.Println(n, err)
}
~~~

~~~text الناتج
Ali 21
7 <nil>
~~~

- [[7]]: [["Ali 21"]] ٦ حروف + سطر جديد = ٧ bytes.
- [[<nil>]]: [[nil]] يعني «مفيش»، فمفيش error.

---

## ٢. الغلطات اللي الـ compiler بيمسكها

غيرنا [[age = 21]] لـ [[age := 21]]، وضفنا [[x := 1]] من غير ما نستخدمه:

~~~text الناتج
./main.go:6:9: no new variables on left side of :=
./main.go:7:5: declared and not used: x
~~~

- [[:=]] لازم يبقى على شمالها متغير جديد واحد على الأقل، و age مش جديدة.
- Go بيرفض يعمل compile لو فيه متغير محلي متعرّف ومش مستخدم.

ولو حطيت [[name := "Ali"]] برة أي دالة:

~~~text الناتج
./main.go:3:1: syntax error: non-declaration statement outside function body
~~~

برة الدوال لازم [[var name = "Ali"]].

---

## ٣. فخ الـ shadowing

~~~go
x := 1
if true {
    x := 2
    fmt.Println("inside", x)
}
fmt.Println("outside", x)
~~~

~~~text الناتج
inside 2
outside 1
~~~

[[:=]] جوه بلوك جديد عملت x **تانية** بنفس الاسم غطّت على اللي برة. اللي برة متغيرتش. لو قصدك تغيّرها اكتب [[x = 2]].

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[x := 5]] | متغير جديد، جوه دالة بس |
| [[x = 6]] | غيّر متغير موجود |
| [[var x int]] | متغير جديد بقيمته الصفرية (0)، ينفع برة الدوال |
| [[a, err := f()]] | مسموح لو واحد على الأقل جديد |`,
          lines: [
            R`كل ملف Go بيبدأ بالـ package.`,
            R`مكتبة الطباعة.`,
            R`الدالة الرئيسية.`,
            R`متغير جديد نوعه string.`,
            R`متغير جديد نوعه int.`,
            R`[[=]]: تغيير متغير موجود.`,
            R`[[:=]] مع متغيرين جداد: عدد الـ bytes والـ error.`,
            R`اطبعهم.`,
            R`قفلة main.`
          ],
          sol: R`الناتج [[Ali 21]] ثم [[7 <nil>]]. مع [[age := 21]] ← [[no new variables on left side of :=]]. ومع متغير مش مستخدم ← [[declared and not used: x]].`
        },
        {
          cmd: "<-",
          title: "السهم الشمال <- في Go: ابعت قيمة في channel أو استلم منها",
          desc: R`الـ channel في Go ماسورة بتنقل قيم بين goroutines (حاجات شغالة بالتوازي). السهم [[<-]] دايمًا بيشاور على اتجاه الداتا: [[ch <- 5]] ابعت 5 جوه الـ channel، و [[x := <-ch]] استلم قيمة منها وحطها في x.

الاستلام بيستنى (block) لحد ما حد يبعت، والإرسال في channel من غير buffer بيستنى لحد ما حد يستلم. و [[v, ok := <-ch]] الـ ok بـ false لو الـ channel اتقفلت.

وفي الأنواع: [[chan<- int]] channel للإرسال بس، و [[<-chan int]] للاستلام بس. ومع [[select]] تستنى على أكتر من channel.`,
          example: R`package main
import "fmt"
func main() {
    ch := make(chan string)
    go func() { ch <- "done" }()
    msg := <-ch
    fmt.Println(msg)
}`,
          flag: "script",
          try: R`على [[go.dev/play]] شغّل المثال. بعدين امسح كلمة [[go]] من السطر الخامس وشغّل تاني واقرا الـ error.`,
          deep: {
            why: R`الـ concurrency في Go مبني على goroutines و channels، وده سبب انتشار Go في السيرفرات. ومن غير ما تفهم [[<-]] مش هتقرا أي كود concurrent.`,
            how: R`الـ channel من غير buffer بتعمل لقاء: المرسل والمستقبل لازم يتقابلوا. [[make(chan int, 10)]] بتعمل buffer يشيل 10 قبل ما الإرسال يستنى. و [[close(ch)]] بتقول مفيش قيم تاني، و [[for v := range ch]] بتقرا لحد ما تتقفل.`,
            when: R`تبعت نتايج من workers، أو تستنى حاجة تخلص، أو تعمل timeout مع [[select]] و [[time.After]].`,
            mistakes: R`ترسل في channel من غير ما حد يستلم في main فيطلع [[fatal error: all goroutines are asleep - deadlock!]]. وتبعت في channel مقفولة فيحصل panic. وتعكس السهم.`
          },
          teach: R`## الفكرة: السهم بيشاور على اتجاه القيمة

الـ channel ماسورة بين حاجتين شغالين في نفس الوقت. [[ch <- v]] القيمة رايحة **جوه** الماسورة، و [[<-ch]] القيمة **طالعة** منها. المثال اتشغّل بـ [[go run]] (Go 1.25) جوه Docker ([[golang:1.25]]).

---

## ١. سطر بسطر

~~~go
package main
import "fmt"
func main() {
~~~

البداية المعتادة: package و fmt و main.

~~~go
    ch := make(chan string)
~~~

- [[chan string]]: نوع «channel بتنقل نصوص».
- [[make(...)]]: اعمل واحدة جديدة. من غير رقم تاني يبقى **من غير buffer**: مبتشيلش قيم، الإرسال لازم يقابله استلام في نفس اللحظة.

~~~go
    go func() { ch <- "done" }()
~~~

نفكها من جوه لبرة:

1. [[ch <- "done"]]: ابعت النص ده في الـ channel.
2. [[func() { ... }]]: دالة من غير اسم.
3. [[()]] في الآخر: ناديها على طول.
4. [[go]] قبلها: شغّلها في **goroutine**، يعني بالتوازي مع main، و main تكمّل من غير ما تستناها.

~~~go
    msg := <-ch
~~~

[[<-ch]]: استنى لحد ما قيمة توصل من ch، وحطها في msg. main هنا بتقف (block) لحد ما الـ goroutine تبعت.

~~~go
    fmt.Println(msg)
}
~~~

~~~text الناتج
done
~~~

---

## ٢. من غير [[go]]

شلنا كلمة [[go]]:

~~~go
    func() { ch <- "done" }()
~~~

~~~text الناتج
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan send]:
~~~

الدالة اتنفذت في main نفسها، وحاولت تبعت في channel من غير buffer، فوقفت مستنية حد يستلم. والاستلام في السطر اللي بعدها، اللي مش هيتنفذ أبدًا لأن main واقفة. Go لاحظ إن مفيش ولا goroutine تقدر تتحرك، فقفل البرنامج. [[[chan send]]] بتقولك هي واقفة فين: في إرسال.

---

## ٣. channel بـ buffer و [[ok]]

~~~go
ch := make(chan int, 2)
ch <- 1
ch <- 2
close(ch)
v, ok := <-ch
fmt.Println(v, ok)
v, ok = <-ch
fmt.Println(v, ok)
v, ok = <-ch
fmt.Println(v, ok)
~~~

~~~text الناتج
1 true
2 true
0 false
~~~

- [[make(chan int, 2)]]: buffer يشيل قيمتين، فالإرسال مستناش حد.
- [[close(ch)]]: مفيش قيم تاني هتتبعت.
- [[v, ok := <-ch]]: ok بـ true طول ما فيه قيم. بعد ما خلصت والـ channel مقفولة: v بالقيمة الصفرية ([[0]]) و ok بـ [[false]].

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[ch <- v]] | ابعت v |
| [[v := <-ch]] | استلم في v |
| [[v, ok := <-ch]] | استلم، و ok بـ false لو مقفولة وفاضية |
| [[chan<- int]] | نوع: للإرسال بس |
| [[<-chan int]] | نوع: للاستلام بس |
| [[go f()]] | شغّل f بالتوازي |`,
          lines: [
            R`package.`,
            R`fmt.`,
            R`main.`,
            R`channel بتنقل نصوص.`,
            R`goroutine بتبعت [["done"]] في الـ channel.`,
            R`main بتستنى لحد ما توصل قيمة وتحطها في msg.`,
            R`[[done]].`,
            R`قفلة main.`
          ],
          sol: R`الناتج [[done]]. من غير [[go]] الإرسال بيحصل في main نفسها ومفيش حد يستلم، فـ [[fatal error: all goroutines are asleep - deadlock!]].`
        },
        {
          cmd: "_ في Go",
          title: "الشرطة التحتية _ في Go: الـ blank identifier، مكان ترمي فيه قيمة مش محتاجها",
          desc: R`Go بيرفض يعمل compile لو فيه متغير متعرّف ومش مستخدم. فلو دالة بترجّع قيمتين وانت محتاج واحدة، حط [[_]] مكان التانية: [[_, err := strconv.Atoi("5")]].

أشهر مكان: الـ loops. [[for _, v := range items]] معناها «مش محتاج الـ index، عايز القيمة بس». و [[for i := range items]] لو عايز الـ index بس.

و [[import _ "github.com/lib/pq"]] معناها «حمّل المكتبة عشان تسجّل نفسها، بس مش هستخدم منها أسماء». ونفس الفكرة في Python ([[for _ in range(3)]]) و Rust و JS destructuring ([[const [, b] = arr]]).`,
          example: R`package main
import ("fmt"; "strconv")
func main() {
    n, _ := strconv.Atoi("42")
    for _, v := range []string{"a", "b"} {
        fmt.Println(v)
    }
    fmt.Println(n)
}`,
          flag: "script",
          try: R`على [[go.dev/play]] غيّر [[for _, v]] لـ [[for i, v]] من غير ما تستخدم i، واقرا الـ error.`,
          deep: {
            why: R`Go صارم في المتغيرات اللي مش مستخدمة عشان الكود يفضل نضيف. و [[_]] هي الطريقة الرسمية تقول «عارف إن فيه قيمة، ومش عايزها».`,
            how: R`[[_]] مش متغير حقيقي: مينفعش تقرا منه، وأي حاجة تتكتب فيه بتترمي. فينفع تستخدمه أكتر من مرة في نفس السطر.`,
            when: R`قيم راجعة مش محتاجها، و index مش محتاجه، و imports للـ side effects.`,
            mistakes: R`ترمي الـ error بـ [[_]] عشان تخلص بسرعة: [[n, _ := strconv.Atoi(s)]] لو s مش رقم n هتبقى 0 ومحدش هيعرف. تجاهل الـ errors في Go أسوأ عادة. وتحاول تقرا من [[_]].`
          },
          teach: R`## الفكرة: [[_]] سلة زبالة للقيم

Go بيرفض أي متغير محلي متعرّف ومش مستخدم. فلو حاجة رجّعت قيمة مش عايزها، بتحطها في [[_]] (اسمه blank identifier) وهي بتترمي. المثال اتشغّل بـ [[go run]] (Go 1.25) جوه Docker ([[golang:1.25]]).

---

## ١. سطر بسطر

~~~go
package main
import ("fmt"; "strconv")
func main() {
~~~

[[import ( ... )]] بأقواس بتستورد كذا مكتبة، و [[;]] بتفصل بينهم في سطر واحد (عادة كل واحدة في سطر). [[strconv]] من string conversion: تحويل نصوص لأرقام والعكس.

~~~go
    n, _ := strconv.Atoi("42")
~~~

- [[strconv.Atoi]] (من ASCII to integer) بتحوّل نص لرقم، وبترجّع قيمتين: الرقم، و error.
- [[n, _ :=]]: الرقم في n، والـ error اترمى في [[_]].

~~~go
    for _, v := range []string{"a", "b"} {
        fmt.Println(v)
    }
~~~

- [[[]string{"a", "b"}]]: slice (قايمة) فيها نصين.
- [[range]] بترجّع في كل لفة حاجتين: الـ index (0 ثم 1) والقيمة.
- [[_, v]]: الـ index اترمى، والقيمة في v.

~~~go
    fmt.Println(n)
}
~~~

~~~text الناتج
a
b
42
~~~

---

## ٢. لو مسكت الـ index ومستخدمتوش

غيرنا [[for _, v]] لـ [[for i, v]]:

~~~text الناتج
./main.go:5:9: declared and not used: i
~~~

ده كل الفرق: [[_]] بتقول للـ compiler «عارف إن فيه قيمة، ومش عايزها».

ولو عايز الـ index بس: [[for i := range items]] من غير [[_]] خالص، وطبعت [[0]] و [[1]].

---

## ٣. خطر رمي الـ error

~~~go
n, err := strconv.Atoi("4x2")
fmt.Println(n, err)
m, _ := strconv.Atoi("abc")
fmt.Println(m)
~~~

~~~text الناتج
0 strconv.Atoi: parsing "4x2": invalid syntax
0
~~~

مع err اتعرفت المشكلة. مع [[_]] رجع [[0]] بهدوء، وكأن النص كان صفر. عشان كده رمي الـ error بـ [[_]] يتعمل بس لما تكون متأكد إنه مستحيل يحصل (زي [["42"]] اللي احنا كاتبينها بإيدنا).

---

## الخلاصة

| الكود | معناه |
|---|---|
| [[n, _ := f()]] | خد أول قيمة، وارمي التانية |
| [[for _, v := range s]] | القيم بس |
| [[for i := range s]] | الـ index بس |
| [[import _ "pkg"]] | حمّل المكتبة عشان تشتغل لوحدها، من غير ما تستخدم أسماءها |

ومينفعش تقرا من [[_]]: هو مش متغير.`,
          lines: [
            R`package.`,
            R`استيراد مكتبتين في سطر.`,
            R`main.`,
            R`[[Atoi]] بترجّع الرقم و error، والـ error اترمت في [[_]].`,
            R`الـ index اترمى، و v هي القيمة.`,
            R`اطبع القيمة.`,
            R`قفلة الـ loop.`,
            R`[[42]].`,
            R`قفلة main.`
          ],
          sol: R`الناتج [[a]] ثم [[b]] ثم [[42]]. ومع [[for i, v]] من غير استخدام i ← [[declared and not used: i]].`
        },
        {
          cmd: "*T  و  &x في Go",
          title: "النجمة * و & في Go: نفس فكرة C، &x عنوان و *T نوع مؤشر، ومن غير ->",
          desc: R`Go فيه مؤشرات زي C بس أبسط وأأمن. [[p := &x]] عنوان x، ونوع p هو [[*int]]. و [[*p = 10]] بتغيّر x. ومفيش حساب على المؤشرات ([[p++]] ممنوعة).

ومفيش [[->]]: مع مؤشر لـ struct بتكتب [[p.Name]] بالنقطة على طول، و Go بيدخل للقيمة لوحده.

أهم استخدام: الـ methods. [[func (u *User) Rename(n string)]] (pointer receiver) بتعدّل الـ User الأصلي، لكن [[func (u User) ...]] بتاخد نسخة فالتعديل بيضيع. والمؤشر الفاضي [[nil]].`,
          example: R`package main
import "fmt"
type User struct{ Name string }
func (u *User) Rename(n string) { u.Name = n }
func main() {
    u := User{Name: "Ali"}
    p := &u
    p.Rename("Sara")
    fmt.Println(u.Name, p.Name)
}`,
          flag: "script",
          try: R`على [[go.dev/play]] شيل النجمة من [[(u *User)]] وشغّل تاني وقارن الاسم المطبوع.`,
          deep: {
            why: R`الفرق بين pointer receiver و value receiver سبب bug مشهور في Go: method «بتعدّل» ومفيش حاجة بتتغير.`,
            how: R`Go بيمرر كل حاجة بالنسخ. المؤشر بيخلي النسخة هي العنوان، فالتعديل بيوصل للأصل. والـ compiler بيعمل [[&]] و [[*]] لوحده في نداء الـ methods وفي الوصول للخانات.`,
            when: R`pointer receivers للـ methods اللي بتعدّل أو لما الـ struct كبير. وخليك ثابت: لو method واحدة pointer receiver خلّي الباقي زيها.`,
            mistakes: R`value receiver في method بتعدّل. واستخدام مؤشر [[nil]] فيحصل [[panic: runtime error: invalid memory address or nil pointer dereference]].`
          },
          teach: R`## الفكرة: نفس [[&]] و [[*]] بتوع C، من غير [[->]]

[[&x]] عنوان x، و [[*T]] نوع «مؤشر لـ T»، و [[*p]] القيمة اللي في العنوان. والفرق عن C إن Go بيعمل الـ [[*]] لوحده لما تكتب نقطة. المثال اتشغّل بـ [[go run]] (Go 1.25) جوه Docker ([[golang:1.25]]).

---

## ١. سطر بسطر

~~~go
type User struct{ Name string }
~~~

نوع جديد اسمه User، struct فيه خانة واحدة Name نصها. (الحرف الكبير في الأول معناه إنها ظاهرة لأي package تانية.)

~~~go
func (u *User) Rename(n string) { u.Name = n }
~~~

| الحتة | معناها |
|---|---|
| [[func]] | دالة |
| [[(u *User)]] | الـ receiver: الدالة دي method على User، و u **مؤشر** للـ User اللي اتنادت عليه |
| [[Rename(n string)]] | اسمها وبتاخد نص |
| [[u.Name = n]] | غيّر الخانة. u مؤشر، و Go فهم إنها [[(*u).Name]] لوحده |

~~~go
func main() {
    u := User{Name: "Ali"}
    p := &u
~~~

- [[User{Name: "Ali"}]]: struct جديد قيمته Ali.
- [[p := &u]]: عنوان u. نوع p هو [[*User]].

~~~go
    p.Rename("Sara")
    fmt.Println(u.Name, p.Name)
}
~~~

~~~text الناتج
Sara Sara
~~~

- [[p.Rename]]: method من خلال المؤشر، فـ Rename اشتغلت على u الأصلي.
- [[p.Name]]: نقطة على مؤشر، من غير [[->]]، و Go دخل للقيمة لوحده.

---

## ٢. من غير النجمة في الـ receiver

غيرنا [[(u *User)]] لـ [[(u User)]] وضفنا شوية سطور:

~~~go
fmt.Println(u.Name, p.Name)
fmt.Printf("%T %T\n", u, p)
x := 5
q := &x
*q = 10
fmt.Println(x, *q)
~~~

~~~text الناتج
Ali Ali
main.User *main.User
10 10
~~~

- [[Ali Ali]]: من غير [[*]] الـ method أخدت **نسخة** من الـ User، وغيّرت النسخة، فالأصلي فضل Ali. ده bug مشهور في Go: method «بتعدّل» ومفيش حاجة بتتغير.
- [[%T]] بتطبع النوع: u نوعها [[main.User]]، و p نوعها [[*main.User]] (main اسم الـ package).
- [[*q = 10]]: زي C بالظبط، بتكتب في العنوان فـ x بقت 10.

---

## ٣. المؤشر الفاضي

~~~go
var np *User
fmt.Println(np == nil)
fmt.Println(np.Name)
~~~

~~~text الناتج
true
panic: runtime error: invalid memory address or nil pointer dereference
~~~

[[var np *User]] من غير قيمة بيبقى [[nil]] (مش بيشاور على حاجة). والنقطة عليه حاولت تدخل لقيمة مش موجودة، فالبرنامج وقع بـ panic.

---

## الخلاصة

| الكود | C | Go |
|---|---|---|
| عنوان | [[&x]] | [[&x]] |
| نوع مؤشر | [[int *p]] | [[var p *int]] |
| القيمة | [[*p]] | [[*p]] |
| خانة من مؤشر | [[p->name]] | [[p.Name]] |
| حساب على مؤشر | [[p++]] مسموح | ممنوع |
| المؤشر الفاضي | [[NULL]] | [[nil]] |`,
          lines: [
            R`package.`,
            R`fmt.`,
            R`struct فيه اسم.`,
            R`pointer receiver: u مؤشر، فالتعديل بيوصل للأصل.`,
            R`main.`,
            R`struct.`,
            R`[[&u]] عنوانه، و p نوعها [[*User]].`,
            R`نداء الـ method من المؤشر.`,
            R`[[Sara Sara]]: النقطة شغالة مع المؤشر من غير [[->]].`,
            R`قفلة main.`
          ],
          sol: R`مع النجمة ← [[Sara Sara]]. من غيرها ← [[Ali Ali]]، لأن Rename عدّلت نسخة.`
        },
        {
          cmd: "nums ...int",
          title: "التلات نقط ... في Go: دالة بتاخد أي عدد arguments، و slice... بتفرده",
          desc: R`[[func sum(nums ...int) int]] معناها sum بتاخد أي عدد أرقام، وجوه الدالة nums بتبقى slice ([[[]int]]). تناديها [[sum(1, 2, 3)]] أو [[sum()]].

ولو معاك slice جاهز وعايز تبعته، حط [[...]] بعده: [[sum(xs...)]]. وأشهر مكان [[append(a, b...)]] عشان تضيف slice كاملة لـ slice.

و [[[...]int{1, 2, 3}]] في تعريف array معناها «الـ compiler يعدّ الطول». نفس الفكرة في JS ([[...]]) و Python ([[*args]]) و Java ([[int... nums]]) بس اتجاه النقط مختلف.`,
          example: R`package main
import "fmt"
func sum(nums ...int) int {
    t := 0
    for _, n := range nums { t += n }
    return t
}
func main() {
    xs := []int{4, 5}
    fmt.Println(sum(1, 2, 3), sum(xs...), append(xs, xs...))
}`,
          flag: "script",
          try: R`على [[go.dev/play]] جرّب [[sum(xs)]] من غير النقط واقرا الـ error.`,
          deep: {
            why: R`[[fmt.Println]] نفسها variadic، وكذلك [[append]]. ومن غير [[xs...]] هتلف loop عشان تضيف عناصر.`,
            how: R`الـ compiler بيلم الـ arguments في slice جديدة. ولو بعت [[xs...]] بيبعت الـ slice نفسها من غير نسخ، فلو الدالة عدّلت فيها هتعدّل الأصلية.`,
            when: R`دوال زي logging أو تجميع. ولازم الـ parameter الـ variadic يبقى آخر واحد.`,
            mistakes: R`[[sum(xs)]] من غير [[...]]: [[cannot use xs (variable of type []int) as int value in argument to sum]]. وتحط النقط قبل الاسم زي JS: في Go بعد النوع في التعريف، وبعد القيمة في النداء.`
          },
          teach: R`## الفكرة: [[...]] قبل النوع بتلم، وبعد القيمة بتفرد

[[...int]] في تعريف الدالة معناها «أي عدد من الـ int»، وجوه الدالة بيبقوا slice. و [[xs...]] في النداء معناها «افرد الـ slice دي arguments». المثال اتشغّل بـ [[go run]] (Go 1.25) جوه Docker ([[golang:1.25]]).

---

## ١. الدالة سطر بسطر

~~~go
func sum(nums ...int) int {
~~~

| الحتة | معناها |
|---|---|
| [[nums ...int]] | parameter اسمه nums بياخد أي عدد int (variadic) |
| [[int]] بعد الأقواس | الدالة بترجّع int |

جوه الدالة nums نوعها [[[]int]] (slice من int). ضفنا سطر [[fmt.Printf("%T %v len=%d\n", nums, nums, len(nums))]] وجربنا:

~~~text الناتج
sum()        →  []int [] len=0
sum(1, 2, 3) →  []int [1 2 3] len=3
~~~

يعني من غير arguments بتبقى slice فاضية، مش error.

~~~go
    t := 0
    for _, n := range nums { t += n }
    return t
}
~~~

- [[t := 0]]: المجموع بيبدأ صفر.
- [[for _, n := range nums]]: لف على الأرقام، الـ index اترمى في [[_]].
- [[t += n]]: زوّد t بـ n.
- [[return t]]: رجّع المجموع.

---

## ٢. main

~~~go
func main() {
    xs := []int{4, 5}
    fmt.Println(sum(1, 2, 3), sum(xs...), append(xs, xs...))
}
~~~

~~~text الناتج
6 9 [4 5 4 5]
~~~

| النداء | بيحصل إيه | الناتج |
|---|---|---|
| [[sum(1, 2, 3)]] | Go لمّ التلاتة في slice | [[6]] |
| [[sum(xs...)]] | [[...]] بعد الـ slice: افردها، كأنك كتبت [[sum(4, 5)]] | [[9]] |
| [[append(xs, xs...)]] | [[append]] نفسها variadic: ضيف عناصر xs لآخر xs | [[[4 5 4 5]]] |

---

## ٣. من غير النقط

~~~go
fmt.Println(sum(xs))
~~~

~~~text الناتج
./main.go:12:21: cannot use xs (variable of type []int) as int value in argument to sum
~~~

sum مستنية أرقام منفصلة، و xs slice كاملة. النقط هي اللي بتقول «افرد».

---

## ٤. [[[...]]] في array

~~~go
a := [...]int{1, 2, 3}
fmt.Printf("%T\n", a)
~~~

~~~text الناتج
[3]int
~~~

[[[...]int]] معناها «array، والـ compiler يعدّ الطول من القيم». النوع طلع [[[3]int]]: array طولها ٣ ثابت.

---

## الخلاصة

| اللغة | تعريف (لمّ) | نداء (فرد) |
|---|---|---|
| Go | [[nums ...int]] | [[xs...]] (النقط بعد) |
| JS | [[...nums]] | [[f(...xs)]] (النقط قبل) |
| Python | [[*nums]] | [[f(*xs)]] |
| Java | [[int... nums]] | array على طول |

والـ parameter الـ variadic لازم يبقى آخر واحد.`,
          lines: [
            R`package.`,
            R`fmt.`,
            R`[[...int]]: أي عدد أرقام، وجوه الدالة nums نوعها [[[]int]].`,
            R`مجموع.`,
            R`loop على الأرقام.`,
            R`رجّع المجموع.`,
            R`قفلة sum.`,
            R`main.`,
            R`slice.`,
            R`[[6]] و [[9]] (الـ slice اتفردت) و [[[4 5 4 5]]].`,
            R`قفلة main.`
          ],
          sol: R`الناتج [[6 9 [4 5 4 5]]]. ومع [[sum(xs)]] ← [[cannot use xs (variable of type []int) as int value in argument to sum]].`
        }
      ]
    }
]);

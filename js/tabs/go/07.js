// تكملة تاب go: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/go/01.js (شرح حقول الدرس في أوله)
MORE("go", [
    {
      t: "التزامن: goroutines و channels و context",
      l: 2,
      n: "تشغّل شغل بالتوازي بكلمة go وتستناه، وتبعت داتا بين الـ goroutines بالـ channels و select، وتحمي الداتا المشتركة بـ Mutex، وتلغي الشغل بـ context",
      items: [
        {
          cmd: "الـ Goroutines والتزامن الخارق",
          title: "goroutine: تشغّل دالة بالتوازي بكلمة go، وتستناها بـ WaitGroup",
          desc: R`[[go f()]] بتشغّل f في goroutine جديدة وبترجع على طول من غير ما تستنى. الـ goroutine «thread خفيف» بيديره الـ runtime بتاع Go مش نظام التشغيل: بيبدأ بـ stack صغير (حوالي 2KB وبيكبر لو احتاج)، فتقدر تشغّل آلاف أو مئات الآلاف منهم من غير مشكلة. الـ threads العادية في نظام التشغيل أتقل بكتير.

الـ runtime بيوزّع الـ goroutines على عدد threads قد عدد أنوية المعالج ([[GOMAXPROCS]]). ولما goroutine تستنى شبكة أو ملف أو sleep، الـ scheduler بيشغّل غيرها مكانها.

أهم قاعدة: لما main تخلص البرنامج كله بيقفل، حتى لو فيه goroutines لسه شغالة. فلازم تستناهم. أبسط طريقة [[sync.WaitGroup]]:
• [[wg.Add(1)]] قبل ما تشغّل كل goroutine.
• [[defer wg.Done()]] جوّاها: «خلصت».
• [[wg.Wait()]]: استنى لحد ما العدّاد يرجع صفر.
ومن Go 1.25 فيه اختصار: [[wg.Go(func() { ... })]] بيعمل الـ ٣ دول لوحده.

[[go func() { ... }()]]: دالة من غير اسم بتتشغّل goroutine. الـ [[()]] في الآخر بتناديها.

المثال بيعمل ٣ «طلبات» كل واحد بياخد وقت مختلف. بالتوازي الوقت الكلي = أطول واحد (300ms)، مش مجموعهم (600ms).`,
          example: R`package main

import (
  "fmt"
  "sync"
  "time"
)

func fetch(name string, d time.Duration) string {
  time.Sleep(d)
  return name + " done"
}

func main() {
  start := time.Now()
  jobs := map[string]time.Duration{
    "users":  300 * time.Millisecond,
    "orders": 200 * time.Millisecond,
    "stock":  100 * time.Millisecond,
  }

  var wg sync.WaitGroup
  for name, d := range jobs {
    wg.Add(1)
    go func() {
      defer wg.Done()
      fmt.Println(fetch(name, d))
    }()
  }
  wg.Wait()

  elapsed := time.Since(start).Round(100 * time.Millisecond)
  fmt.Println("total:", elapsed)
}`,
          try: R`شيل [[wg.Wait()]] وشغّل: هيطبع إيه؟ وبعدين رجّعه، وغيّر الـ loop تستخدم [[wg.Go(func() { ... })]] بدل Add و Done (محتاج Go 1.25). وبعدين شغّل 100,000 goroutine كل واحدة بتعمل sleep ثانية، واطبع الوقت الكلي.`,
          flag: "script",
          deep: {
            why: R`السيرفرات أغلب وقتها مستنية: داتابيز، أو API تاني، أو ملف. الـ goroutines بتخليك تكتب كود عادي من فوق لتحت (مش callbacks ولا async/await) والـ runtime هو اللي بيشغّل غيره وانت مستني. سيرفر net/http بيشغّل كل request في goroutine لوحده عشان كده.`,
            how: R`[[time.Sleep(d)]] بيوقّف الـ goroutine دي بس مش البرنامج. و [[time.Since(start)]] المدة من start، و [[Round]] بيقرّبها عشان الرقم يبقى نضيف.

ترتيب الطباعة هنا ثابت تقريبًا لأن المدد مختلفة (stock الأول). لكن من غير sleeps مختلفة الترتيب بين الـ goroutines مش مضمون خالص.

الـ closure جوه الـ loop بيستخدم name و d. من Go 1.22 كل لفّة ليها متغيرات جديدة فكل goroutine بتشوف بتاعتها. قبل كده كانوا كلهم ممكن يشوفوا آخر قيمة.

[[wg.Add(1)]] لازم قبل [[go]] مش جوّا الـ goroutine: لو جوّاها ممكن main توصل لـ Wait قبل ما الـ goroutine تلحق تعمل Add، فـ Wait ترجع على طول.

الـ goroutine مبترجّعش قيمة. عشان ترجّع نتيجة استخدم channel (الدرس الجاي) أو اكتب في slice في مكان مختلف لكل goroutine.`,
            when: R`شغل مستقل ممكن يمشي مع بعض: تنادي ٣ APIs مرة واحدة، أو تعالج صور، أو worker في الخلفية بيبعت إيميلات. مش لكل حاجة: لو الشغل صغير جدًا، تكلفة إنشاء الـ goroutine والتنسيق ممكن تبقى أكبر منه.`,
            mistakes: R`main تخلص قبل الـ goroutines فالشغل يضيع من غير error. و [[time.Sleep]] كطريقة للاستنا (هشة: الجهاز البطيء هيفشل). و [[wg.Add]] جوّا الـ goroutine. وتبعت WaitGroup لدالة بالقيمة بدل pointer ([[wg *sync.WaitGroup]]) فـ Done بتشتغل على نسخة و Wait تعلّق للأبد (go vet بيمسكها). و goroutine leak: goroutine مستنية حاجة مش هتيجي أبدًا فبتفضل عايشة.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

بيعمل ٣ «طلبات» وهمية، كل واحد بياخد وقت مختلف (300 و 200 و 100 ملي ثانية)، ويشغّلهم **مع بعض** في ٣ goroutines، ويستناهم كلهم، وبعدين يطبع الوقت الكلي. لو اشتغلوا ورا بعض كانوا هياخدوا 600ms، ومع بعض بياخدوا قد أطولهم: 300ms.

كل الناتج اللي تحت حقيقي من [[go run .]] جوه [[docker run --rm golang:1.25]] (Go 1.25.14 على لينكس، جهاز فيه 16 logical processor)، في فولدر فيه [[main.go]] و [[go.mod]] مكتوب فيه [[go 1.25]].

---

## ١. الـ imports

~~~go main.go
import (
  "fmt"
  "sync"
  "time"
)
~~~

- [[fmt]]: الطباعة.
- [[sync]] اختصار synchronization (تزامن): فيه [[WaitGroup]] اللي هنستنى بيه، و [[Mutex]] (درس جاي).
- [[time]]: المدد والوقت: [[time.Sleep]] و [[time.Now]] و [[time.Millisecond]].

---

## ٢. [[fetch]]: طلب بطيء على سبيل التمثيل

~~~go main.go
func fetch(name string, d time.Duration) string {
  time.Sleep(d)
  return name + " done"
}
~~~

- [[d time.Duration]]: نوع المدة في Go. هو في الحقيقة رقم صحيح بالـ **nanoseconds**، بس ليه طباعة حلوة ([[300ms]] و [[1.3s]]).
- [[time.Sleep(d)]]: وقّف **الـ goroutine دي بس** المدة دي. باقي البرنامج شغال عادي. هنا بتمثّل استنا رد داتابيز أو API.
- [[name + " done"]]: لزق نصين، فـ fetch("users", ...) بترجّع [[users done]].

---

## ٣. الشغلانات في map

~~~go main.go
  start := time.Now()
  jobs := map[string]time.Duration{
    "users":  300 * time.Millisecond,
    "orders": 200 * time.Millisecond,
    "stock":  100 * time.Millisecond,
  }
~~~

- [[start := time.Now()]]: احفظ اللحظة دي عشان نحسب المدة في الآخر.
- [[map[string]time.Duration]]: map مفتاحه نص (اسم الشغلانة) وقيمته مدة.
- [[300 * time.Millisecond]]: [[time.Millisecond]] ثابت قيمته مليون nanosecond، فالضرب بيطلّع مدة 300ms. ده الأسلوب العادي في Go لكتابة المدد.
- الفاصلة بعد آخر عنصر إجبارية لما القفلة [[}]] تكون في سطر لوحدها.

> ترتيب الـ map في الـ range عشوائي في Go. بس هنا مش فارق، لأن ترتيب الطباعة هيحدده مين **يخلص** الأول، مش مين بدأ الأول.

---

## ٤. قلب الدرس: [[go]] و [[WaitGroup]]

~~~go main.go
  var wg sync.WaitGroup
  for name, d := range jobs {
    wg.Add(1)
    go func() {
      defer wg.Done()
      fmt.Println(fetch(name, d))
    }()
  }
  wg.Wait()
~~~

### [[var wg sync.WaitGroup]]

الـ WaitGroup جواه **عدّاد** بيبدأ بصفر. القيمة الصفرية بتاعته جاهزة للاستخدام، فمش محتاج [[New]] ولا [[make]].

### [[for name, d := range jobs]]

لفّة على الـ map: كل لفّة [[name]] = المفتاح و [[d]] = المدة.

### [[wg.Add(1)]]: «فيه goroutine جاية»

بتزوّد العدّاد واحد. ولازم **قبل** [[go]]، في main نفسها: لو حطيتها جوه الـ goroutine، ممكن main توصل لـ [[wg.Wait()]] والعدّاد لسه صفر (الـ goroutine لسه ما اتشغلتش)، فـ Wait ترجع على طول.

### [[go func() { ... }()]]

نفكّها حتة حتة:

- [[func() { ... }]]: دالة **من غير اسم** (function literal)، معمولة في مكانها.
- [[()]] في الآخر: نادِ الدالة دي. من غيرها تبقى عرّفت دالة ومشغلتهاش (والـ compiler هيرفض).
- [[go]] قبل النداء: شغّل النداء ده في **goroutine جديدة**، وارجع على طول من غير ما تستنى. يعني الـ loop بتلف ٣ لفّات في أجزاء من الثانية، وبتسيب ٣ goroutines شغالين في الخلفية.

### جوه الـ goroutine

- [[defer wg.Done()]]: [[defer]] معناها «نفّذ ده لما الدالة دي تخلص، مهما حصل». و [[Done()]] بتنقّص العدّاد واحد. فكل goroutine بتقول «خلصت» وهي خارجة.
- [[fmt.Println(fetch(name, d))]]: اعمل الطلب واطبع نتيجته.

### الدالة شايفة name و d إزاي؟

الدالة اللي من غير اسم دي **closure**: بتشوف متغيرات اللفّة اللي اتعملت فيها. ومن Go 1.22 كل لفّة ليها [[name]] و [[d]] جداد، فكل goroutine ماسكة قيمها هي. (قبل 1.22 كانت كلها ممكن تشوف آخر قيمة. والسلوك ده بيتحدد بسطر [[go]] في [[go.mod]]، ودرس closures في المستوى الأول فيه التجربة.)

### [[wg.Wait()]]

استنى لحد ما العدّاد يرجع صفر. main واقفة هنا، والـ ٣ goroutines شغالين:

~~~text الناتج (الزمن من البداية)
100ms   stock done
200ms   orders done
300ms   users done      العدّاد بقى صفر، و Wait رجعت
~~~

---

## ٥. الوقت الكلي

~~~go main.go
  elapsed := time.Since(start).Round(100 * time.Millisecond)
  fmt.Println("total:", elapsed)
~~~

- [[time.Since(start)]]: المدة من [[start]] لحد دلوقتي، زي [[time.Now().Sub(start)]].
- [[.Round(100 * time.Millisecond)]]: قرّبها لأقرب 100ms. المدة الحقيقية بتطلع حاجة زي 300.6ms (وقت تشغيل الـ goroutines والطباعة)، والتقريب بيخليها [[300ms]] نضيفة.

~~~text الناتج كله
stock done
orders done
users done
total: 300ms
~~~

ليه 300 مش 600؟ لأن الـ ٣ sleeps بيعدّوا **في نفس الوقت**. فالوقت الكلي = أطولهم.

---

## ٦. لو شلت [[wg.Wait()]]

مسحت السطر وشغّلت:

~~~text الناتج
total: 0s
~~~

بس كده. main ما استنتش، فطبعت الوقت (أقل من 50ms، فالتقريب بيطلّعه 0s) وخلصت. ولما main تخلص **البرنامج كله بيقفل**، والـ ٣ goroutines بيموتوا قبل ما يطبعوا حاجة، من غير أي error ولا تحذير.

---

## ٧. الحل: [[wg.Go]] (Go 1.25)

~~~go solCode
var wg sync.WaitGroup
for name, d := range jobs {
  wg.Go(func() {
    fmt.Println(fetch(name, d))
  })
}
wg.Wait()
~~~

[[wg.Go(f)]] بتعمل التلاتة لوحدها: [[Add(1)]]، وتشغّل [[f]] في goroutine، وتنادي [[Done()]] لما f تخلص. لاحظ إن مفيش [[()]] بعد الدالة هنا، لأنك بتدّي الدالة نفسها لـ [[wg.Go]] وهي اللي بتشغّلها. الناتج نفسه بالظبط (جرّبته):

~~~text الناتج
stock done
orders done
users done
total: 300ms
~~~

> [[wg.Go]] مش موجودة قبل Go 1.25: لو نسختك أقدم هتاخد [[wg.Go undefined]]، وساعتها استخدم Add و Done.

---

## ٨. 100,000 goroutine

~~~go solCode
start := time.Now()
var wg2 sync.WaitGroup
for range 100_000 {
  wg2.Go(func() { time.Sleep(time.Second) })
}
wg2.Wait()
fmt.Println(time.Since(start))
~~~

- [[for range 100_000]]: لف 100,000 مرة من غير متغير (range على رقم من Go 1.22). و [[_]] جوه الرقم فاصل للقراية بس، زي الفاصلة.
- كل goroutine بتنام ثانية.

جرّبتها وزوّدت سطرين بيطبعوا [[runtime.GOMAXPROCS(0)]] (عدد الـ threads اللي بتشغّل كود Go في نفس اللحظة) وحجم الذاكرة وهما نايمين ([[runtime.ReadMemStats]]):

~~~text الناتج
GOMAXPROCS: 16 NumCPU: 16
goroutines: 100001 StackInuse MB: 196 Sys MB: 268
1.306465083s
~~~

نقرا الأرقام:

| الرقم | معناه |
|---|---|
| [[GOMAXPROCS: 16]] | الـ runtime بيشغّل الـ goroutines على 16 thread بس، قد عدد الـ logical processors. ومن Go 1.25 لو الـ container محدود بـ CPU أقل، الرقم بينزل له لوحده |
| [[goroutines: 100001]] | الـ 100,000 والـ main |
| [[StackInuse MB: 196]] | الـ stacks كلها: 196 ميجا على 100,000 = حوالي **2KB** لكل goroutine |
| [[Sys MB: 268]] | كل اللي البرنامج خده من نظام التشغيل |
| [[1.306465083s]] | ثانية النوم + حوالي 0.3 ثانية لإنشاء 100,000 goroutine وجدولتهم |

وده الفرق مع threads نظام التشغيل: الـ thread العادي في لينكس بيحجز stack حجمه ميجات، و 100,000 منهم تقيلين جدًا على أي جهاز.

---

## ٩. أشهر غلطة: WaitGroup بالقيمة

لو نقلت شغل الـ goroutine لدالة وبعتلها الـ WaitGroup **بالقيمة**:

~~~go main.go
func work(id int, wg sync.WaitGroup) {
  defer wg.Done()
  fmt.Println("work", id)
}
~~~

الدالة بتاخد **نسخة** من الـ WaitGroup، فـ [[Done()]] بتنقّص عدّاد النسخة، وعدّاد main فاضل 1. [[go vet]] بيمسكها قبل ما تشغّل:

~~~text الناتج: go vet .
./main.go:8:22: work passes lock by value: sync.WaitGroup contains sync.noCopy
./main.go:16:14: call of work copies lock value: sync.WaitGroup contains sync.noCopy
~~~

ولو شغّلت برضه:

~~~text الناتج: go run .
work 1
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [sync.WaitGroup.Wait]:
~~~

main مستنية في Wait للأبد، ومفيش goroutine تانية عايشة، فالـ runtime بيوقف البرنامج. الحل: [[wg *sync.WaitGroup]] (pointer) وتنادي [[work(1, &wg)]]، أو أسهل: [[wg.Go]] من غير ما تبعته خالص.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[go f()]] | شغّل f في goroutine جديدة وارجع على طول |
| [[go func() { ... }()]] | نفس الكلام لدالة من غير اسم، و [[()]] بتناديها |
| [[var wg sync.WaitGroup]] | عدّاد بيبدأ بصفر |
| [[wg.Add(1)]] | زوّد العدّاد، قبل [[go]] |
| [[defer wg.Done()]] | نقّصه لما الـ goroutine تخلص |
| [[wg.Wait()]] | استنى لحد ما يبقى صفر |
| [[wg.Go(f)]] | التلاتة مرة واحدة (Go 1.25) |

- main لما تخلص البرنامج كله بيقفل، فاستنى الـ goroutines دايمًا.
- الوقت الكلي للشغل المتوازي = أطول واحد، مش المجموع.
- الـ WaitGroup والـ Mutex مينفعش يتنسخوا: ابعتهم بـ pointer، و [[go vet]] بيمسكها.`,
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            R`[[sync]]: WaitGroup و Mutex.`,
            "time.",
            "قفلة.",
            "دالة بتمثّل طلب بطيء.",
            "استنى المدة (الـ goroutine دي بس).",
            "رجّع النتيجة.",
            "قفلة.",
            "main.",
            "وقت البداية.",
            "٣ شغلانات بمدد مختلفة.",
            "300ms.",
            "200ms.",
            "100ms.",
            "قفلة.",
            R`WaitGroup بالقيمة الصفرية: جاهز.`,
            "لف.",
            "سجّل goroutine جاية، قبل go.",
            R`شغّل دالة من غير اسم في goroutine: السطر ده بيرجع على طول.`,
            "لما تخلص قول Done مهما حصل.",
            "اعمل الشغل واطبع.",
            R`قفلة الدالة، و [[()]] بتناديها.`,
            "قفلة الـ loop.",
            "استنى لحد ما كلهم يخلصوا.",
            "المدة الكلية مقرّبة.",
            "300ms مش 600ms.",
            "قفلة."
          ],
          sol: R`الناتج:
[[stock done]]
[[orders done]]
[[users done]]
[[total: 300ms]]

من غير [[wg.Wait()]]: بيطبع [[total: 0s]] بس، والـ goroutines بتتقفل مع البرنامج قبل ما تطبع.

بـ [[wg.Go]] (الكود تحت) نفس الناتج بسطور أقل. و 100,000 goroutine بـ sleep ثانية بيخلصوا في حوالي ثانية وشوية (1.3s في تجربتي)، والذاكرة بتزيد كام مية ميجا بالكتير، لأن كل goroutine بتبدأ بـ stack صغير. نفس العدد من threads نظام التشغيل كان هيبقى أتقل بكتير.`,
          solCode: R`var wg sync.WaitGroup
for name, d := range jobs {
  wg.Go(func() {
    fmt.Println(fetch(name, d))
  })
}
wg.Wait()

start := time.Now()
var wg2 sync.WaitGroup
for range 100_000 {
  wg2.Go(func() { time.Sleep(time.Second) })
}
wg2.Wait()
fmt.Println(time.Since(start))`
        },
        {
          cmd: "القنوات Channels والتواصل بين الـ Goroutines",
          title: "channel: أنبوبة بتبعت داتا بين goroutines بأمان، و close و range",
          desc: R`الـ channel أنبوبة ليها نوع: [[ch := make(chan int)]] بتنقل ints. والسهم [[<-]] بيوضّح اتجاه الداتا:
• [[ch <- 5]]: ابعت 5 في الـ channel.
• [[v := <-ch]]: استقبل قيمة من الـ channel.

نوعين:
• unbuffered ([[make(chan int)]]): الإرسال بيستنى لحد ما حد يستقبل، والاستقبال بيستنى لحد ما حد يبعت. يعني الاتنين بيتقابلوا في نفس اللحظة، وده بيزامن الـ goroutines.
• buffered ([[make(chan string, 2)]]): فيها مكان لـ 2. الإرسال مش بيستنى غير لما تتملي.

[[close(ch)]]: «مفيش حاجة تانية جاية». بعدها:
• [[for v := range ch]] بتاخد كل اللي فاضل وتخرج لوحدها.
• [[v, ok := <-ch]]: ok بـ false لما الـ channel مقفولة وفاضية، و v بالقيمة الصفرية.
• الإرسال على channel مقفولة بيعمل panic. عشان كده اللي بيقفل هو اللي بيبعت.

اتجاه في النوع: [[chan<- int]] «للإرسال بس»، و [[<-chan int]] «للاستقبال بس». بتحطهم في parameters الدوال عشان الـ compiler يمنع الغلط.

الشعار المشهور في Go: «Don't communicate by sharing memory; share memory by communicating». بدل ما كذا goroutine يعدّلوا متغير واحد بأقفال، ابعت الداتا في channel وواحد بس يملكها في كل لحظة.`,
          example: R`package main

import "fmt"

func produce(n int, out chan<- int) {
  for i := 1; i <= n; i++ {
    out <- i
  }
  close(out)
}

func square(in <-chan int, out chan<- int) {
  for v := range in {
    out <- v * v
  }
  close(out)
}

func main() {
  nums := make(chan int)
  squares := make(chan int)
  go produce(4, nums)
  go square(nums, squares)
  for s := range squares {
    fmt.Print(s, " ")
  }
  fmt.Println()

  buf := make(chan string, 2)
  buf <- "a"
  buf <- "b"
  fmt.Println(len(buf), cap(buf))
  close(buf)
  fmt.Println(<-buf, <-buf)
  v, ok := <-buf
  fmt.Printf("%q %v\n", v, ok)
}`,
          try: R`شيل [[close(out)]] من square وشغّل واقرا الرسالة. وبعدين اكتب في main [[ch := make(chan int)]] ثم [[ch <- 1]] على طول (من غير goroutine تستقبل). وبعدين ضيف مرحلة تالتة للـ pipeline: [[sum(in <-chan int) int]] بتجمع المربعات.`,
          flag: "script",
          deep: {
            why: R`الـ channels بتحل مشكلتين مع بعض: نقل الداتا بين goroutines، والتزامن (مين يستنى مين). الـ pipeline في المثال (produce ثم square ثم main) بيشتغل كل مرحلة بالتوازي مع التانية، وكل قيمة بتعدّي من مرحلة للي بعدها من غير أي lock.`,
            how: R`main و produce و square شغالين مع بعض. produce بتبعت 1 وتستنى لحد ما square تاخده (unbuffered). square بتربّعه وتبعته وتستنى main. main بتطبعه. وهكذا.

لما produce تخلص بتقفل nums، فالـ range في square يخلص، فتقفل squares، فالـ range في main يخلص. السلسلة دي بتقفل نفسها بالترتيب.

[[len(buf)]] عدد اللي جوّا دلوقتي، و [[cap(buf)]] السعة.

Deadlock: لو كل الـ goroutines مستنية ومفيش حد هيتحرك، الـ runtime بيكتشف ده ويوقف البرنامج بـ [[fatal error: all goroutines are asleep - deadlock!]]. بس ده بيحصل لو كل الـ goroutines واقفة. في سيرفر فيه goroutines تانية شغالة، الـ goroutine اللي علّقت هتفضل معلّقة بصمت (leak).

جدول لازم تحفظه:
• إرسال أو استقبال على nil channel: بيستنى للأبد.
• استقبال من channel مقفولة: القيمة الصفرية فورًا.
• إرسال على مقفولة: panic.
• close لـ channel مقفولة: panic.`,
            when: R`pipelines، و worker pools (المستوى ٣)، وإشارات ([[done chan struct{}]])، ونتايج goroutines. لكن لو كل اللي محتاجه عدّاد أو map مشترك، Mutex أبسط (الدرس الجاي). مش كل حاجة لازم channel.`,
            mistakes: R`تنسى close فالـ range يستنى للأبد. والمستقبِل هو اللي بيقفل فالمرسل يعمل panic. و unbuffered channel في نفس الـ goroutine (إرسال من غير مستقبل): deadlock. و buffered channel كبيرة عشان «تحل» deadlock: بتأجله بس.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

جزئين:

1. **pipeline** من ٣ مراحل شغالين مع بعض: [[produce]] بتطلّع الأرقام 1 لـ 4، و [[square]] بتربّعهم، و [[main]] بتطبع. والمراحل متوصّلة بـ ٢ channels.
2. **buffered channel** بسعة 2: نملاها، نقفلها، ونقرا منها لحد ما تفضى.

الناتج كله من [[go run .]] جوه [[docker run --rm golang:1.25]] (Go 1.25.14 على لينكس).

---

## ١. [[produce]]: المرحلة الأولى

~~~go main.go
func produce(n int, out chan<- int) {
  for i := 1; i <= n; i++ {
    out <- i
  }
  close(out)
}
~~~

### [[out chan<- int]]

- [[chan int]]: channel بتنقل قيم من نوع [[int]].
- السهم [[<-]] بعد كلمة [[chan]] معناه **للإرسال بس** (send-only). الدالة دي تقدر تحط في [[out]] بس، ولو حاولت تقرا منها الـ compiler بيرفض. جرّبت أكتب [[v := <-out]] جوه دالة زي دي:

~~~text الناتج: go run .
./main.go:4:10: invalid operation: cannot receive from send-only channel chan<- int out (variable of type chan<- int)
~~~

### [[out <- i]]: الإرسال

السهم بيشاور **ناحية الـ channel**: «حط i جوه out». ولأن [[out]] هتبقى unbuffered (مفيهاش مكان)، السطر ده **بيستنى** لحد ما حد على الناحية التانية ياخد القيمة. يعني produce مبتسبقش اللي بعدها.

### [[close(out)]]

بعد آخر رقم: «مفيش حاجة تانية جاية». القفل مش بيمسح اللي في الـ channel، هو بس بيقول للي بيستقبل إن الإرسال خلص. والعرف: **اللي بيبعت هو اللي بيقفل**، لأنه الوحيد اللي عارف إمتى خلص.

---

## ٢. [[square]]: المرحلة التانية

~~~go main.go
func square(in <-chan int, out chan<- int) {
  for v := range in {
    out <- v * v
  }
  close(out)
}
~~~

- [[in <-chan int]]: السهم **قبل** [[chan]] = **للاستقبال بس** (receive-only). افتكرها كده: السهم طالع من الـ channel.
- [[for v := range in]]: خد قيمة من [[in]] كل لفّة. لو مفيش قيمة دلوقتي استنى. ولما [[in]] تتقفل وتفضى، الـ loop تخلص لوحدها.
- [[out <- v * v]]: ابعت المربع للمرحلة اللي بعدها.
- [[close(out)]]: لما [[in]] تخلص، اقفل [[out]]. كده القفل بيتنقل في السلسلة.

---

## ٣. [[main]]: بتوصّل المراحل وبتبقى آخر مرحلة

~~~go main.go
  nums := make(chan int)
  squares := make(chan int)
  go produce(4, nums)
  go square(nums, squares)
  for s := range squares {
    fmt.Print(s, " ")
  }
  fmt.Println()
~~~

- [[make(chan int)]]: الـ channels لازم تتعمل بـ [[make]]. من غير رقم تاني = **unbuffered**.
- [[nums]] و [[squares]] نوعهم [[chan int]] (الاتجاهين). ولما تبعتهم لـ produce و square، Go بتحوّلهم لوحدها للنوع اللي بالاتجاه.
- [[go produce(4, nums)]] و [[go square(nums, squares)]]: كل مرحلة في goroutine لوحدها، و main نفسها هي المرحلة التالتة.
- [[fmt.Print(s, " ")]]: [[Print]] من غير [[ln]] مش بتنزل سطر، فالأرقام بتيجي جنب بعض. و [[fmt.Println()]] بعد الـ loop بتنزل السطر.

### القيمة بتمشي إزاي؟

| الخطوة | اللي بيحصل |
|---|---|
| ١ | produce: [[nums <- 1]] وتستنى |
| ٢ | square: تاخد 1 من nums، و [[squares <- 1]] وتستنى |
| ٣ | main: تاخد 1 وتطبعه، و square تكمّل تاخد الرقم اللي بعده |
| ٤ | نفس الكلام لـ 2 و 3 و 4، وكل مرحلة شغالة على رقم مختلف في نفس الوقت |
| ٥ | produce خلصت: [[close(nums)]]، فالـ range في square يخلص |
| ٦ | square: [[close(squares)]]، فالـ range في main يخلص |

~~~text الناتج
1 4 9 16
~~~

(فيه مسافة بعد 16 لأن كل رقم بيتطبع وبعده [[" "]].)

### لو square نسيت [[close(out)]]

شلتها وشغّلت:

~~~text الناتج
1 4 9 16
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan receive]:
main.main()
	/w/l2a/main.go:23 +0x15b
exit status 2
~~~

- المربعات اتطبعت عادي.
- بعدها main واقفة في [[range squares]] مستنية قيمة جاية، و square خلصت ومقفلتش، و produce خلصت. يعني **كل** الـ goroutines واقفة ومحدش هيتحرك.
- الـ runtime بيكتشف ده ويوقف البرنامج. وسطر [[goroutine 1]] اللي جنبه [[chan receive]] بين قوسين معناه: goroutine رقم 1 (main) واقفة على **استقبال** من channel، في السطر 23 (سطر الـ for).

---

## ٤. buffered channel

~~~go main.go
  buf := make(chan string, 2)
  buf <- "a"
  buf <- "b"
  fmt.Println(len(buf), cap(buf))
~~~

- [[make(chan string, 2)]]: الرقم التاني = حجم الـ **buffer**: مكان لقيمتين جوه الـ channel نفسها.
- [[buf <- "a"]] و [[buf <- "b"]]: الإرسال **مش بيستنى** حد يستقبل، لأن فيه مكان. فينفع تعملهم في نفس الـ goroutine. التالتة كانت هتستنى (الـ buffer مليان).
- [[len(buf)]]: عدد القيم اللي جوّا دلوقتي. و [[cap(buf)]] (capacity): السعة.

~~~text الناتج
2 2
~~~

### القفل والقراية بعده

~~~go main.go
  close(buf)
  fmt.Println(<-buf, <-buf)
  v, ok := <-buf
  fmt.Printf("%q %v\n", v, ok)
~~~

- [[close(buf)]]: مفيش إرسال تاني. بس اللي جوّا **لسه موجود**.
- [[<-buf]] لوحدها كـ expression: «استقبل قيمة». فالسطر ده بيقرا "a" وبعدين "b":

~~~text الناتج
a b
~~~

- [[v, ok := <-buf]]: شكل «comma ok» للاستقبال. الـ channel دلوقتي **مقفولة وفاضية**، فالاستقبال مش بيستنى: بيرجّع القيمة الصفرية للنوع ([[""]] للـ string) و [[ok]] = [[false]]. لو كانت فيها قيمة كان [[ok]] هيبقى [[true]].
- [[fmt.Printf]]: طباعة بقالب. [[%q]] بيطبع النص بين علامات تنصيص (عشان تشوف إنه فاضي)، و [[%v]] القيمة بشكلها العادي، و [[\n]] سطر جديد.

~~~text الناتج
"" false
~~~

---

## ٥. اللي بيوقّع البرنامج

جرّبت كل حالة لوحدها:

### إرسال على unbuffered من غير مستقبل

~~~go main.go
ch := make(chan int)
ch <- 1
~~~

~~~text الناتج
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan send]:
~~~

[[chan send]]: main واقفة على **إرسال**، ومفيش أي goroutine تانية تستقبل.

### إرسال على channel مقفولة

~~~text الناتج
panic: send on closed channel
~~~

### قفل channel مقفولة (أو nil)

~~~text الناتج (كل سطر من برنامج لوحده)
panic: close of closed channel
panic: close of nil channel
~~~

| العملية | channel عادية | مقفولة | nil (مش معمولة بـ make) |
|---|---|---|---|
| إرسال [[ch <- v]] | بيستنى لو مفيش مكان | panic | بيستنى للأبد |
| استقبال [[<-ch]] | بيستنى لو فاضية | القيمة الصفرية فورًا (بعد ما اللي جوّا يخلص) | بيستنى للأبد |
| [[close(ch)]] | تمام | panic | panic |

---

## ٦. الحل: مرحلة تالتة [[sum]]

~~~go solCode
func sum(in <-chan int) int {
  total := 0
  for v := range in {
    total += v
  }
  return total
}
~~~

- بتستقبل بس ([[<-chan int]]) وبترجّع [[int]].
- [[total += v]]: زوّد v على total. والـ range بيخلص لما square تقفل.

~~~go solCode
nums := make(chan int)
squares := make(chan int)
go produce(4, nums)
go square(nums, squares)
fmt.Println(sum(squares))
~~~

هنا [[sum]] هي اللي بتستقبل بدل الـ for في main، ومش محتاجة [[go]] لأننا عايزين main تستنى نتيجتها:

~~~text الناتج
30
~~~

1 + 4 + 9 + 16 = 30.

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[make(chan int)]] | unbuffered: الإرسال والاستقبال بيستنوا بعض |
| [[make(chan string, 2)]] | buffered: الإرسال مش بيستنى غير لما تتملي |
| [[ch <- v]] | ابعت |
| [[v := <-ch]] | استقبل |
| [[v, ok := <-ch]] | ok = false لو مقفولة وفاضية |
| [[chan<- int]] | إرسال بس |
| [[<-chan int]] | استقبال بس |
| [[close(ch)]] | مفيش إرسال تاني، والـ range بيخلص |

- اللي بيبعت هو اللي بيقفل، والقفل بيتنقل في الـ pipeline من مرحلة للي بعدها.
- [[all goroutines are asleep - deadlock!]] معناها كل الـ goroutines واقفة، والسطر اللي تحتها بيقولك كل واحدة واقفة فين.`,
          lines: [
            "باكدج main.",
            "import fmt.",
            R`[[chan<- int]]: الدالة تقدر تبعت بس.`,
            "من 1 لـ n.",
            R`ابعت، واستنى لحد ما حد ياخد.`,
            "قفلة.",
            "خلصنا: اقفل عشان اللي بيستقبل يعرف.",
            "قفلة.",
            R`بتستقبل من in ([[<-chan]]) وتبعت في out.`,
            "خد لحد ما in تتقفل.",
            "ابعت المربع.",
            "قفلة.",
            "اقفل out.",
            "قفلة.",
            "main.",
            "channel للأرقام (unbuffered).",
            "channel للمربعات.",
            "المرحلة الأولى في goroutine.",
            "المرحلة التانية في goroutine.",
            "main هي المرحلة الأخيرة: خد لحد ما تتقفل.",
            "اطبع.",
            "قفلة.",
            "سطر جديد.",
            "buffered بسعة 2.",
            "مش بتستنى: فيه مكان.",
            "ولا دي.",
            "2 جوّا، والسعة 2.",
            "اقفل: مفيش إرسال تاني.",
            "اللي جوّا لسه بيتقري: a b.",
            "فاضية ومقفولة.",
            R`[[""]] و false.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[1 4 9 16 ]]
[[2 2]]
[[a b]]
[["" false]]

من غير [[close(out)]] في square: المربعات بتتطبع، وبعدين:
[[fatal error: all goroutines are asleep - deadlock!]]
main مستنية في range على squares، ومحدش هيبعت ولا هيقفل.

و [[ch <- 1]] من غير مستقبل: نفس الـ deadlock على طول، لأن unbuffered بتستنى حد ياخد.

والمرحلة التالتة (الكود تحت) بترجّع [[30]] (1 + 4 + 9 + 16).`,
          solCode: R`func sum(in <-chan int) int {
  total := 0
  for v := range in {
    total += v
  }
  return total
}

nums := make(chan int)
squares := make(chan int)
go produce(4, nums)
go square(nums, squares)
fmt.Println(sum(squares))`
        },
        {
          cmd: "select",
          title: "select: تستنى أكتر من channel مع بعض، و timeout، وإرسال من غير ما تستنى",
          desc: R`[[select]] زي switch بس للـ channels: كل [[case]] عملية إرسال أو استقبال، والـ select بيستنى لحد ما واحدة منهم تبقى جاهزة وينفّذها. لو أكتر من واحدة جاهزة بيختار عشوائي.

أشهر استخدامات:
• timeout: [[case <-time.After(200 * time.Millisecond):]]. [[time.After]] بترجّع channel بيوصلها قيمة بعد المدة. فاللي يوصل الأول يكسب: الرد ولا الوقت.
• [[default]]: لو ولا case جاهز دلوقتي، نفّذ default على طول من غير استنا. كده تعمل إرسال «لو فيه مكان، وإلا ارمي».
• loop بـ select جوّاها: worker بيسمع على كذا channel (شغل، أو ticker، أو إشارة قفل).

[[time.NewTicker(d)]] بيبعت في [[ticker.C]] كل d. لازم [[ticker.Stop()]] لما تخلص.

وفي المثال slowAPI بتعمل channel بسعة 1. ليه؟ لو الـ timeout كسب ومحدش استقبل، الـ goroutine اللي جوّاها هتبعت في الـ buffer وتخلص. لو كانت unbuffered كانت هتفضل مستنية حد يستقبل للأبد (goroutine leak).`,
          example: R`package main

import (
  "fmt"
  "time"
)

func slowAPI(d time.Duration) <-chan string {
  ch := make(chan string, 1)
  go func() {
    time.Sleep(d)
    ch <- fmt.Sprintf("response after %v", d)
  }()
  return ch
}

func main() {
  select {
  case res := <-slowAPI(50 * time.Millisecond):
    fmt.Println(res)
  case <-time.After(200 * time.Millisecond):
    fmt.Println("timeout")
  }

  select {
  case res := <-slowAPI(time.Second):
    fmt.Println(res)
  case <-time.After(200 * time.Millisecond):
    fmt.Println("timeout")
  }

  jobs := make(chan int, 1)
  for i := range 3 {
    select {
    case jobs <- i:
      fmt.Println("queued", i)
    default:
      fmt.Println("queue full, dropped", i)
    }
  }

  ticker := time.NewTicker(30 * time.Millisecond)
  defer ticker.Stop()
  done := time.After(100 * time.Millisecond)
  ticks := 0
  for {
    select {
    case <-ticker.C:
      ticks++
    case <-done:
      fmt.Println("ticks:", ticks)
      return
    }
  }
}`,
          try: R`اكتب دالة [[firstOf(mirrors ...time.Duration) string]] بتنادي slowAPI لكل mirror بالتوازي وترجّع أول رد يوصل (أسرع سيرفر يكسب)، مع timeout كلي 500ms. جرّبها بـ [[firstOf(300*time.Millisecond, 80*time.Millisecond, 200*time.Millisecond)]].`,
          flag: "script",
          deep: {
            why: R`في السيرفر مينفعش تستنى للأبد: API تاني وقع، أو الداتابيز علّقت. من غير timeout الطلبات بتتراكم والسيرفر بيقع. و select هي الأداة اللي بتخليك تقول «استنى ده، أو ده، أو الوقت يخلص، أو الطلب يتلغي»، وده نفس اللي context بيعمله من جوّا (الدرس الجاي).`,
            how: R`في select التاني الـ API بتاخد ثانية والـ timeout 200ms، فالـ timeout كسب. الـ goroutine اللي جوه slowAPI لسه شغالة، وبعد ثانية هتبعت في الـ buffer وتخلص لوحدها، لكن البرنامج هيكون قفل قبلها.

[[case jobs <- i]] مع default: أول مرة فيه مكان (السعة 1)، التانية والتالتة الـ buffer مليان فـ default اتنفذت. ده نمط «load shedding»: لو الطابور مليان ارفض بدل ما تعلّق.

في الـ loop الأخيرة: ticker كل 30ms و done بعد 100ms، فالـ ticks بتطلع 3 تقريبًا (30 و 60 و 90). [[return]] بتخرج من main كلها. [[break]] هنا كانت هتخرج من الـ select بس.

[[time.After]] في loop طويلة بيعمل timer جديد كل لفّة. من Go 1.23 الـ timers اللي محدش ماسكها بتتنضّف لوحدها، بس [[time.NewTimer]] مع Reset لسه أوضح في الـ loops.`,
            when: R`timeouts على أي استنا، وإلغاء ([[case <-ctx.Done():]])، و workers بتسمع على أكتر من مصدر، وإرسال أو استقبال من غير استنا (default).`,
            mistakes: R`[[break]] جوه select جوه for وانت عايز تخرج من الـ for (محتاج label أو return). و select من غير default ومن غير timeout على channel ممكن متجيش: علّقة. و unbuffered channel في goroutine ممكن محدش يستقبل منها بعد الـ timeout: leak. و default في loop من غير أي استنا: الـ CPU بيوصل 100٪.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

٤ استخدامات لـ [[select]] في برنامج واحد:

1. رد بييجي قبل الـ timeout، فبيكسب.
2. رد بطيء، فالـ timeout يكسب.
3. طابور بسعة 1 بنحاول نحط فيه 3 حاجات من غير ما نستنى ([[default]]).
4. loop بتعدّ ticks لحد ما وقت معيّن يخلص.

الناتج كله من [[go run .]] جوه [[docker run --rm golang:1.25]] (Go 1.25.14 على لينكس).

---

## ١. [[slowAPI]]: API وهمية بترجّع channel

~~~go main.go
func slowAPI(d time.Duration) <-chan string {
  ch := make(chan string, 1)
  go func() {
    time.Sleep(d)
    ch <- fmt.Sprintf("response after %v", d)
  }()
  return ch
}
~~~

- النوع الراجع [[<-chan string]]: channel **للاستقبال بس**. اللي نادى الدالة يقدر يستنى الرد منها، بس ميقدرش يبعت فيها.
- [[make(chan string, 1)]]: buffered بسعة 1 (السبب في آخر الجزء ده).
- [[go func() { ... }()]]: goroutine بتنام المدة وبعدين تبعت الرد. والدالة نفسها **بترجع على طول** بالـ channel، قبل ما الرد يجهز.
- [[fmt.Sprintf]]: زي Printf بس بترجّع النص بدل ما تطبعه. و [[%v]] مع [[time.Duration]] بتطبعها بشكل [[50ms]] أو [[1s]].

### ليه سعة 1؟

لو الـ timeout كسب، محدش هيستقبل من [[ch]] تاني أبدًا. لو كانت unbuffered، سطر [[ch <- ...]] هيستنى حد ياخد **للأبد**، والـ goroutine تفضل عايشة في الذاكرة على الفاضي (اسمها **goroutine leak**). بسعة 1 الإرسال بيلاقي مكان، فالـ goroutine بتحط الرد وتخلص، والـ channel بتتمسح لما محدش يبقى ماسكها.

---

## ٢. select بـ timeout: الرد يكسب

~~~go main.go
  select {
  case res := <-slowAPI(50 * time.Millisecond):
    fmt.Println(res)
  case <-time.After(200 * time.Millisecond):
    fmt.Println("timeout")
  }
~~~

### بيتنفّذ إزاي؟

1. أول ما Go توصل للـ select، بتحسب الـ channels اللي في كل [[case]]: بتنادي [[slowAPI(50ms)]] (فالـ goroutine بتبدأ تنام)، وبتنادي [[time.After(200ms)]].
2. [[time.After(d)]] بترجّع channel، والـ runtime بيبعت فيها الوقت الحالي بعد d.
3. الـ select بيستنى لحد ما **أي** case تبقى جاهزة.
4. عند 50ms الرد وصل، فـ [[case res := <-...]] اتنفذت: الـ [[:=]] هنا بتعرّف [[res]] وتحط فيه اللي اتستقبل.
5. الـ case التانية **اتلغت**: الـ select بينفّذ case واحدة بس وبيخرج.

~~~text الناتج
response after 50ms
~~~

- [[case <-time.After(...)]] من غير [[:=]]: بنستقبل القيمة ونرميها، المهم إن الوقت جه.

---

## ٣. select بـ timeout: الوقت يكسب

~~~go main.go
  select {
  case res := <-slowAPI(time.Second):
    fmt.Println(res)
  case <-time.After(200 * time.Millisecond):
    fmt.Println("timeout")
  }
~~~

الـ API محتاجة ثانية، والـ timer 200ms، فالـ timer كسب:

~~~text الناتج
timeout
~~~

والـ goroutine اللي جوه slowAPI؟ لسه نايمة. بعد ثانية كانت هتحط الرد في الـ buffer وتخلص (ده فايدة السعة 1)، بس البرنامج كله هيكون خلص قبلها.

---

## ٤. [[default]]: إرسال من غير استنا

~~~go main.go
  jobs := make(chan int, 1)
  for i := range 3 {
    select {
    case jobs <- i:
      fmt.Println("queued", i)
    default:
      fmt.Println("queue full, dropped", i)
    }
  }
~~~

- [[jobs := make(chan int, 1)]]: طابور فيه مكان لحاجة واحدة، ومحدش بيستقبل منه.
- [[for i := range 3]]: i = 0 ثم 1 ثم 2.
- [[case jobs <- i]]: case **إرسال**. جاهزة لو فيه مكان في الـ buffer.
- [[default]]: لو ولا case جاهزة **دلوقتي**، نفّذ default على طول. من غير default الـ select كان هيستنى، وهنا كان هيعلّق للأبد.

| i | الـ buffer قبلها | اللي اتنفذ |
|---|---|---|
| 0 | فاضي | [[case jobs <- i]] |
| 1 | فيه 0 (مليان) | [[default]] |
| 2 | لسه مليان | [[default]] |

~~~text الناتج
queued 0
queue full, dropped 1
queue full, dropped 2
~~~

ده نمط اسمه **load shedding**: السيرفر لو طابوره مليان يرفض الشغل الجديد على طول بدل ما يتقل ويعلّق.

---

## ٥. ticker و loop بـ select

~~~go main.go
  ticker := time.NewTicker(30 * time.Millisecond)
  defer ticker.Stop()
  done := time.After(100 * time.Millisecond)
  ticks := 0
  for {
    select {
    case <-ticker.C:
      ticks++
    case <-done:
      fmt.Println("ticks:", ticks)
      return
    }
  }
~~~

- [[time.NewTicker(30ms)]]: بيرجّع [[*time.Ticker]]، وفيه حقل [[C]] (channel) بيوصلها قيمة كل 30ms، لحد ما تنادي [[Stop()]].
- [[defer ticker.Stop()]]: وقّفه لما main تخلص.
- [[done := time.After(100ms)]]: channel هتوصلها قيمة **مرة واحدة** بعد 100ms. خزّناها في متغير بره الـ loop، عشان لو كتبنا [[time.After]] جوه الـ select كل لفّة هتعمل timer جديد يبدأ من الصفر، ومش هيخلص أبدًا لأن الـ ticker بيكسب كل 30ms.
- [[for { ... }]]: loop للأبد، وكل لفّة select.
- [[case <-ticker.C:]]: tick وصل، زوّد العدّاد.
- [[case <-done:]]: الوقت خلص، اطبع و [[return]].

~~~text الناتج
ticks: 3
~~~

3 لأن الـ ticks بتوصل عند 30 و 60 و 90، والـ 120 بعد الـ done. شغّلته ٥ مرات وطلع 3 كل مرة، بس على جهاز مشغول جدًا ممكن تطلع 2، لأن 90 قريبة من 100.

### ليه [[return]] مش [[break]]؟

[[break]] جوه select بتخرج من **الـ select بس**، مش من الـ for. جرّبت أبدّل [[return]] بـ [[break]] وزوّدت شرط يخرج بعد 10 ticks عشان البرنامج ميلفّش للأبد:

~~~text الناتج
ticks: 3
still looping, ticks = 11
~~~

الـ break اتنفذت والـ loop كمّلت. وبعد كده [[done]] مش هتبعت تاني (time.After بتبعت مرة واحدة)، فكانت هتلف للأبد. عشان تخرج من الـ for: [[return]]، أو label فوق الـ for ([[loop:]]) و [[break loop]].

---

## ٦. الحل: [[firstOf]]، أسرع سيرفر يكسب

~~~go solCode
func firstOf(mirrors ...time.Duration) string {
  results := make(chan string, len(mirrors))
  for _, d := range mirrors {
    go func() { results <- <-slowAPI(d) }()
  }
  select {
  case r := <-results:
    return r
  case <-time.After(500 * time.Millisecond):
    return "timeout"
  }
}
~~~

- [[mirrors ...time.Duration]]: الـ [[...]] قبل النوع = دالة **variadic**: تاخد أي عدد من القيم، وجوّاها [[mirrors]] بيبقى [[[]time.Duration]] (slice).
- [[make(chan string, len(mirrors))]]: buffer قد عدد السيرفرات، عشان كل goroutine تقدر تبعت وتخلص حتى لو محدش استقبل منها (نفس فكرة السعة 1 فوق).
- [[for _, d := range mirrors]]: [[_]] بترمي الـ index، و [[d]] المدة.
- [[results <- <-slowAPI(d)]]: بتتقري من اليمين: [[<-slowAPI(d)]] استنى رد السيرفر ده، وبعدين [[results <-]] ابعته في results.
- الـ select: أول رد في results يكسب، أو 500ms تخلص.

جرّبتها:

~~~go main.go
fmt.Println(firstOf(300*time.Millisecond, 80*time.Millisecond, 200*time.Millisecond))
fmt.Println(firstOf(time.Second, 900*time.Millisecond))
~~~

~~~text الناتج
response after 80ms
timeout
~~~

الأولى رجعت بعد 80ms (قِسته: [[80ms]])، مش بعد 300. والتانية كل السيرفرات أبطأ من 500ms فالـ timeout كسب.

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[case v := <-ch:]] | لو وصل حاجة في ch، خدها في v |
| [[case ch <- v:]] | لو فيه مكان في ch، ابعت v |
| [[case <-time.After(d):]] | timeout بعد d |
| [[default:]] | لو ولا حاجة جاهزة دلوقتي، متستناش |
| [[time.NewTicker(d)]] | قيمة في [[.C]] كل d، ولازم [[Stop()]] |

- الـ select بينفّذ case **واحدة** بس. ولو أكتر من واحدة جاهزة مع بعض بيختار عشوائي.
- [[break]] جوه select بتخرج من الـ select بس: استخدم [[return]] أو label.
- channel الرد اللي ممكن محدش يستقبل منها تبقى buffered، عشان الـ goroutine متعلّقش (leak).`,
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            "time.",
            "قفلة.",
            "بترجّع channel للاستقبال بس.",
            "سعة 1: عشان الـ goroutine متعلّقش لو محدش استقبل.",
            "goroutine بتعمل الشغل.",
            "استنى (كأنها API بطيئة).",
            "ابعت الرد.",
            "قفلة.",
            "رجّع الـ channel على طول.",
            "قفلة.",
            "main.",
            "select: استنى أول واحد يجهز.",
            "الرد (50ms)...",
            "...وصل الأول.",
            "أو الوقت (200ms).",
            "مش هنا.",
            "قفلة.",
            "تاني، بس الـ API بطيئة.",
            "ثانية...",
            "مش هنا.",
            "200ms كسبت.",
            "timeout.",
            "قفلة.",
            "طابور بسعة 1.",
            "3 محاولات.",
            "select فيه إرسال و default.",
            "لو فيه مكان...",
            "...اتحط.",
            "لو مفيش: من غير استنا.",
            "ارمي.",
            "قفلة.",
            "قفلة.",
            "ticker كل 30ms.",
            "وقّفه في الآخر.",
            "إشارة بعد 100ms.",
            "عدّاد.",
            "loop للأبد.",
            "select في كل لفّة.",
            "tick...",
            "...عدّ.",
            "الوقت خلص...",
            "اطبع.",
            "اخرج من main.",
            "قفلة الـ select.",
            "قفلة الـ for.",
            "قفلة."
          ],
          sol: R`الناتج:
[[response after 50ms]]
[[timeout]]
[[queued 0]]
[[queue full, dropped 1]]
[[queue full, dropped 2]]
[[ticks: 3]]

(الـ ticks ممكن تطلع 2 أو 3 على جهاز مشغول، لأن الأوقات قريبة من بعض.)

firstOf (الكود تحت) بترجّع [[response after 80ms]]. السر إن كل الـ channels بسعة 1، فالـ goroutines التانية بتبعت وتخلص حتى لو محدش استقبل منها.`,
          solCode: R`func firstOf(mirrors ...time.Duration) string {
  results := make(chan string, len(mirrors))
  for _, d := range mirrors {
    go func() { results <- <-slowAPI(d) }()
  }
  select {
  case r := <-results:
    return r
  case <-time.After(500 * time.Millisecond):
    return "timeout"
  }
}`
        },
        {
          cmd: "التزامن الآمن بـ WaitGroup و Mutex",
          title: "data race: لما أكتر من goroutine يعدّلوا نفس المتغير، والحل Mutex أو atomic و go run -race",
          desc: R`لو أكتر من goroutine بيقروا ويكتبوا نفس المتغير في نفس الوقت، ومفيش تنسيق بينهم، ده data race. [[counter++]] شكلها خطوة واحدة بس هي ٣: اقرا، زوّد، اكتب. لو اتنين قروا نفس القيمة مع بعض، الاتنين هيكتبوا نفس النتيجة وزيادة هتضيع. والنتيجة بتتغيّر من تشغيل للتاني، وده أصعب نوع bugs.

الحلول:
• [[sync.Mutex]]: قفل. [[mu.Lock()]] قبل ما تلمس الداتا، و [[mu.Unlock()]] بعدها. goroutine واحدة بس تقدر تبقى جوّا في كل لحظة، والباقي بيستنى. والعرف [[defer mu.Unlock()]] بعد Lock على طول.
• [[sync.RWMutex]]: نفس الفكرة بس قرّايين كتير مع بعض ([[RLock]])، وكاتب واحد لوحده ([[Lock]]). مفيد لو القراية أكتر بكتير من الكتابة.
• [[sync/atomic]]: لعدّاد أو flag بسيط: [[atomic.Int64]] و [[Add]] و [[Load]]. أسرع من Mutex بس لعملية واحدة بس.
• أو متشاركش أصلًا: channel وصاحب واحد للداتا.

والعرف: الـ Mutex يبقى حقل جوه الـ struct اللي بيحميه، فوق الحقول اللي بيحميها، والـ methods pointer receivers (نسخ Mutex بيكسره).

وأهم أداة: [[go run -race .]] (أو [[go test -race]]): بتراقب البرنامج وهو شغال، ولو لقت race بتطبع السطرين اللي عملوه. شغّلها في الاختبارات دايمًا.`,
          example: R`package main

import (
  "fmt"
  "sync"
  "sync/atomic"
)

type Counter struct {
  mu sync.Mutex
  m  map[string]int
}

func (c *Counter) Inc(key string) {
  c.mu.Lock()
  defer c.mu.Unlock()
  c.m[key]++
}

func main() {
  var wg sync.WaitGroup
  unsafeTotal := 0
  var atomicTotal atomic.Int64
  c := Counter{m: make(map[string]int)}

  for range 1000 {
    wg.Add(1)
    go func() {
      defer wg.Done()
      // data race: أكتر من goroutine بيكتبوا من غير قفل
      unsafeTotal++
      atomicTotal.Add(1)
      c.Inc("visits")
    }()
  }
  wg.Wait()

  fmt.Println("unsafe:", unsafeTotal)
  fmt.Println("atomic:", atomicTotal.Load())
  fmt.Println("mutex:", c.m["visits"])
}`,
          try: R`شغّل [[go run .]] كذا مرة وراقب رقم unsafe، وبعدين [[go run -race .]] واقرا التقرير. وبعدين امسح سطر unsafeTotal وشغّل -race تاني. وأخيرًا شيل [[c.mu.Lock()]] و [[defer c.mu.Unlock()]] من Inc وشغّل [[go run .]] من غير -race.`,
          flag: "script",
          deep: {
            why: R`الـ race بيعدّي في الاختبار على جهازك ويظهر في الإنتاج تحت ضغط: رصيد غلط، أو عدّاد ناقص، أو map بيوقّع السيرفر كله. والكود شكله سليم. عشان كده Go عاملة race detector جوّا الأدوات، وفرق كتير بيشغّلوا كل الاختبارات بـ -race في CI.`,
            how: R`[[unsafeTotal]] ممكن يطلع 1000 أحيانًا وأقل أحيانًا، حسب التوقيت وعدد الأنوية. وده بالظبط اللي بيخلي الـ race خطير: مش بيبان كل مرة.

[[-race]] بيبني البرنامج بتعليمات زيادة بتسجّل كل قراية وكتابة في الذاكرة ومين عملها، فلو اتنين goroutine لمسوا نفس المكان (وواحد منهم بيكتب) من غير ما يكون بينهم تزامن، بيطبع [[WARNING: DATA RACE]] ومكان الاتنين، وبيخرج بـ exit code 66. بيبطّأ البرنامج (٢ لـ ٢٠ مرة) ويزوّد الذاكرة، فمش للإنتاج، بس بيمسك الـ races اللي حصلت فعلًا وهو شغال، مش اللي ممكن تحصل.

الـ map بالذات: الكتابة فيه من أكتر من goroutine من غير قفل الـ runtime بيكتشفها غالبًا ويوقف البرنامج كله بـ [[fatal error: concurrent map writes]]، ودي مش panic تتمسك بـ recover.

[[atomic.Int64]] (من Go 1.19) نوع جاهز بقيمة صفرية مفيدة، أحسن من [[atomic.AddInt64(&x, 1)]] القديمة.`,
            when: R`Mutex لأي داتا مشتركة فيها أكتر من حقل أو عملية مركّبة (map، أو رصيد مع سجل). RWMutex لكاش قرايته كتير. atomic لعدّاد أو flag واحد. و -race في كل [[go test]] في CI.`,
            mistakes: R`تنسى Unlock في return بدري (استخدم defer). و Lock مرتين في نفس الـ goroutine (Mutex في Go مش reentrant): deadlock. وتنسخ struct فيه Mutex (value receiver): go vet بيقول [[passes lock by value]]. وتقفل وانت بتعمل حاجة بطيئة (HTTP call) فكل حاجة تستنى. وتفتكر إن القراية بس مش محتاجة قفل: قراية مع كتابة = race برضه.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

بيشغّل 1000 goroutine، وكل واحدة بتزوّد **٣ عدّادات** بواحد:

- [[unsafeTotal]]: [[int]] عادي من غير أي حماية (ده الغلط).
- [[atomicTotal]]: [[atomic.Int64]].
- المفتاح [[visits]] في [[c.m]]: map جوه struct محمي بـ [[sync.Mutex]].

وفي الآخر بيطبعهم. المفروض التلاتة يطلعوا 1000، بس الأول لأ. الناتج كله من [[go run .]] جوه [[docker run --rm golang:1.25]] (Go 1.25.14 على لينكس، 16 logical processor).

---

## ١. الـ imports

~~~go main.go
import (
  "fmt"
  "sync"
  "sync/atomic"
)
~~~

- [[sync]]: فيه [[WaitGroup]] و [[Mutex]].
- [[sync/atomic]]: باكدج جوه sync، فيه عمليات **atomic** (ذرّية): العملية بتحصل كلها مرة واحدة، ومحدش يقدر يدخل في نصها. واسمه في الكود [[atomic]] (آخر جزء من المسار).

---

## ٢. [[Counter]]: الداتا وقفلها مع بعض

~~~go main.go
type Counter struct {
  mu sync.Mutex
  m  map[string]int
}
~~~

- [[mu sync.Mutex]]: الـ Mutex اختصار **mutual exclusion** (استبعاد متبادل): قفل goroutine واحدة بس تقدر تمسكه في المرة. القيمة الصفرية بتاعته قفل **مفتوح** جاهز، فمش محتاج تعمله.
- العرف إن الـ Mutex يتحط **فوق** الحقول اللي بيحميها، عشان اللي يقرا الـ struct يعرف إن [[m]] متلمسش من غير [[mu]].

~~~go main.go
func (c *Counter) Inc(key string) {
  c.mu.Lock()
  defer c.mu.Unlock()
  c.m[key]++
}
~~~

- [[(c *Counter)]]: method بـ **pointer receiver**: [[c]] بيشاور على الـ Counter الأصلي، مش نسخة منه. ده مهم جدًا هنا (القسم ٨).
- [[c.mu.Lock()]]: امسك القفل. لو goroutine تانية ماسكاه، استنى لحد ما تسيبه.
- [[defer c.mu.Unlock()]]: سيب القفل لما Inc تخلص، حتى لو حصل panic أو return بدري. العرف تكتبها في السطر اللي بعد Lock على طول عشان متنساهاش.
- [[c.m[key]++]]: زوّد القيمة. ده بيحصل وانت **لوحدك**، فمحدش هيكتب في الـ map معاك.

---

## ٣. main: التلات عدّادات

~~~go main.go
  var wg sync.WaitGroup
  unsafeTotal := 0
  var atomicTotal atomic.Int64
  c := Counter{m: make(map[string]int)}
~~~

- [[unsafeTotal := 0]]: int عادي.
- [[var atomicTotal atomic.Int64]]: نوع جاهز (من Go 1.19) جواه int64، ومبيتعدّلش غير بـ methods ذرّية. القيمة الصفرية = 0.
- [[Counter{m: make(map[string]int)}]]: الـ map لازم يتعمل بـ [[make]] (الـ map الـ nil مينفعش يتكتب فيه). و [[mu]] مش مكتوب، فبياخد قيمته الصفرية: قفل مفتوح.

---

## ٤. الـ 1000 goroutine

~~~go main.go
  for range 1000 {
    wg.Add(1)
    go func() {
      defer wg.Done()
      // data race: أكتر من goroutine بيكتبوا من غير قفل
      unsafeTotal++
      atomicTotal.Add(1)
      c.Inc("visits")
    }()
  }
  wg.Wait()
~~~

[[wg.Add(1)]] و [[go func() { ... }()]] و [[defer wg.Done()]] و [[wg.Wait()]] نفس اللي في درس الـ goroutines. الجديد ٣ سطور:

### [[unsafeTotal++]]: ليه مش آمنة؟

شكلها خطوة واحدة، بس الجهاز بينفّذها ٣ خطوات:

1. اقرا قيمة unsafeTotal من الذاكرة.
2. زوّد عليها 1.
3. اكتب النتيجة في الذاكرة.

ولو goroutine A و B شغالين على أنوية مختلفة في نفس اللحظة:

| A | B | unsafeTotal |
|---|---|---|
| قرت 41 | | 41 |
| | قرت 41 | 41 |
| كتبت 42 | | 42 |
| | كتبت 42 | 42 |

اتنين زوّدوا، والعدّاد زاد **واحد بس**. زيادة ضاعت. ده اسمه **data race**: أكتر من goroutine بيلمسوا نفس المتغير في نفس الوقت، وواحد منهم على الأقل بيكتب، ومفيش تزامن بينهم.

### [[atomicTotal.Add(1)]]

بتعمل الـ ٣ خطوات **كعملية واحدة** على مستوى المعالج، فمحدش يقدر يدخل في النص. وبترجّع القيمة الجديدة (احنا مش محتاجينها هنا).

### [[c.Inc("visits")]]

الزيادة جوه Lock و Unlock، فـ goroutine واحدة بس بتكتب في الـ map في كل لحظة.

---

## ٥. الطباعة

~~~go main.go
  fmt.Println("unsafe:", unsafeTotal)
  fmt.Println("atomic:", atomicTotal.Load())
  fmt.Println("mutex:", c.m["visits"])
~~~

- [[atomicTotal.Load()]]: اقرا القيمة بطريقة ذرّية. القراية كمان لازم تكون بـ Load مش مباشرة.
- قراية [[c.m]] هنا من غير قفل وده تمام، لأن [[wg.Wait()]] خلصت، فمفيش ولا goroutine شغالة تكتب.

شغّلته ٥ مرات وبصّيت على السطر الأول بس:

~~~text الناتج (أول سطر من ٥ تشغيلات)
unsafe: 992
unsafe: 1000
unsafe: 998
unsafe: 993
unsafe: 997
~~~

والسطرين التانيين [[atomic: 1000]] و [[mutex: 1000]] كل مرة. لاحظ التشغيلة التانية: [[1000]] صح بالصدفة. ده اللي بيخلّي الـ race خطير: بيعدّي في الاختبار ويبان في الإنتاج.

---

## ٦. [[go run -race .]]: الـ race detector

[[-race]] بيبني البرنامج بتعليمات زيادة بتسجّل كل قراية وكتابة في الذاكرة، ومين عملها. ولو اتنين لمسوا نفس المكان من غير تزامن بينهم، بيطبع تقرير:

~~~text الناتج: go run -race . (أول تقرير)
==================
WARNING: DATA RACE
Read at 0x00c000120030 by goroutine 8:
  main.main.func1()
      /w/l4/main.go:31 +0x95

Previous write at 0x00c000120030 by goroutine 9:
  main.main.func1()
      /w/l4/main.go:31 +0xa7

Goroutine 8 (running) created at:
  main.main()
      /w/l4/main.go:28 +0x114

Goroutine 9 (running) created at:
  main.main()
      /w/l4/main.go:28 +0x114
==================
~~~

نقراه:

| الجزء | معناه |
|---|---|
| [[Read at 0x00c000120030 by goroutine 8]] | goroutine 8 **قرت** من العنوان ده في الذاكرة (ده مكان unsafeTotal) |
| [[main.main.func1()]] | جوه أول دالة من غير اسم في main ([[func1]]) |
| [[main.go:31]] | السطر 31 = [[unsafeTotal++]] |
| [[Previous write ... by goroutine 9]] | قبلها goroutine 9 **كتبت** في نفس المكان، ومفيش بينهم قفل |
| [[created at: ... main.go:28]] | الاتنين اتعملوا من سطر [[go func()]] |

وفي آخر الناتج:

~~~text الناتج (الآخر)
unsafe: 885
atomic: 1000
mutex: 1000
Found 2 data race(s)
exit status 66
~~~

- [[Found 2 data race(s)]]: عدد التقارير (بيختلف من تشغيلة للتانية).
- [[exit status 66]]: البرنامج بيخرج بـ 66 لو لقى race، فالـ CI بيفشل لوحده.
- لاحظ: سطور atomic و Inc مطلعتش في التقرير، لأنها محمية.
- و unsafe بقت 885: الـ race detector بيبطّأ البرنامج ويغيّر التوقيت.

### بعد ما تمسح unsafeTotal

مسحت سطرين unsafeTotal والتعليق وشغّلت [[-race]] تاني:

~~~text الناتج: go run -race .
atomic: 1000
mutex: 1000
~~~

مفيش ولا تقرير، و exit 0.

---

## ٧. من غير القفل في Inc

شلت [[c.mu.Lock()]] و [[defer c.mu.Unlock()]] وشغّلت [[go run .]] (من غير -race) ٣ مرات:

~~~text الناتج: أول مرتين
fatal error: concurrent map writes

goroutine 1006 [running]:
~~~

البرنامج كله وقع. الـ runtime بتاع Go بيراقب الـ maps لوحده، ولو لقى كتابتين مع بعض بيوقف كل حاجة، وده **fatal error** مش panic، فـ [[recover]] متقدرش تمسكه. والتالتة عدّت وطبعت [[mutex: 1000]] بالصدفة. يعني الكشف ده مش مضمون، و [[-race]] هو اللي بيمسكها كل مرة.

---

## ٨. لو نسيت الـ pointer receiver

غيّرت [[func (c *Counter) Inc]] لـ [[func (c Counter) Inc]] (value receiver). كده كل نداء بيشتغل على **نسخة** من الـ Counter، وجواها نسخة من القفل، فكل goroutine بتقفل قفل خاص بيها ومفيش حماية. [[go vet]] بيمسكها:

~~~text الناتج: go vet .
./main.go:14:9: Inc passes lock by value: demo.Counter contains sync.Mutex
~~~

([[demo]] هو اسم الـ module في go.mod.)

---

## الخلاصة

| الأداة | امتى |
|---|---|
| [[sync.Mutex]] + [[Lock]] / [[defer Unlock]] | داتا مركّبة (map، أو أكتر من حقل لازم يتغيّروا مع بعض) |
| [[sync.RWMutex]] | نفس الكلام والقراية أكتر بكتير من الكتابة ([[RLock]] للقرّايين) |
| [[atomic.Int64]] + [[Add]] / [[Load]] | عدّاد أو flag واحد |
| [[go run -race .]] / [[go test -race]] | دايمًا وانت بتختبر: بيطبع السطرين اللي عملوا الـ race، و exit 66 |
| [[go vet]] | بيمسك نسخ الـ Mutex (value receiver) |

- [[x++]] مش عملية واحدة: اقرا، زوّد، اكتب.
- الـ race ممكن يطلع النتيجة صح بالصدفة، فمتعتمدش على «اشتغل عندي».
- الكتابة في map من أكتر من goroutine من غير قفل: [[fatal error: concurrent map writes]] والبرنامج كله يقع.`,
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            "sync.",
            R`[[sync/atomic]]: عمليات ذرّية.`,
            "قفلة.",
            "struct فيه الـ Mutex والداتا اللي بيحميها.",
            "القفل: قيمته الصفرية جاهزة.",
            "map مشترك.",
            "قفلة.",
            "pointer receiver: عشان منتنسخش القفل.",
            "اقفل.",
            "افتح لما الدالة تخلص.",
            "عدّل وانت لوحدك.",
            "قفلة.",
            "main.",
            "WaitGroup.",
            "عدّاد عادي من غير حماية.",
            R`عدّاد atomic.`,
            "Counter بالـ map جاهز.",
            "1000 لفّة.",
            "سجّل.",
            "goroutine.",
            "Done في الآخر.",
            R`race: [[++]] = اقرا + زوّد + اكتب، ومش محمية.`,
            "زيادة ذرّية: آمنة.",
            "زيادة بقفل: آمنة.",
            "قفلة الـ goroutine.",
            "قفلة الـ loop.",
            "استنى الكل.",
            "ممكن أقل من 1000.",
            "1000 دايمًا.",
            "1000 دايمًا.",
            "قفلة."
          ],
          sol: R`[[go run .]] بيطبع حاجة زي:
[[unsafe: 987]]
[[atomic: 1000]]
[[mutex: 1000]]
والرقم الأول بيتغيّر من مرة للتانية (وممكن يطلع 1000 أحيانًا، وده اللي بيخلّي الـ race يعدّي من غير ما حد يلاحظ).

[[go run -race .]] بيطبع [[WARNING: DATA RACE]] وتحتها [[Read at ... by goroutine 8:]] و [[Previous write at ... by goroutine 7:]] وكل واحدة فيها [[main.main.func1()]] ورقم سطر [[unsafeTotal++]]. وفي الآخر [[Found 2 data race(s)]] (العدد بيختلف من تشغيل للتاني) و [[exit status 66]].

بعد ما تمسح unsafeTotal: -race مش بيطبع حاجة. ومن غير القفل في Inc: غالبًا [[fatal error: concurrent map writes]] والبرنامج كله بيقع.`
        },
        {
          cmd: "context",
          title: "context: تلغي شغل أو تحطله مهلة، وتعدّيه من الـ handler لحد الداتابيز",
          desc: R`[[context.Context]] قيمة بتتعدّى كأول parameter لأي دالة بتعمل حاجة ممكن تطوّل (شبكة، داتابيز، شغل تقيل)، والعرف إن اسمه [[ctx]]. وظيفته يقول للدالة «بطّل، محدش مستني النتيجة دي».

بتعمله:
• [[context.Background()]]: الأصل الفاضي، في main أو الاختبارات.
• [[context.WithTimeout(parent, 100*time.Millisecond)]]: بيتلغي لوحده بعد المدة.
• [[context.WithCancel(parent)]]: بيتلغي لما تنادي cancel.
الاتنين بيرجّعوا ctx جديد و [[cancel]]، و [[defer cancel()]] لازم دايمًا عشان الـ timer والموارد تتنضّف.

جوه الدالة:
• [[<-ctx.Done()]]: channel بتتقفل لما الـ ctx يتلغي، فتستخدمها في select.
• [[ctx.Err()]]: السبب: [[context.DeadlineExceeded]] (المهلة خلصت) أو [[context.Canceled]] (حد ألغى).

والأهم: الـ ctx بيتعدّى لتحت. في السيرفر كل request معاه [[r.Context()]]، وده بيتلغي لوحده لو اليوزر قفل الاتصال. فلو عدّيته للداتابيز ([[db.QueryContext(ctx, ...)]]) وللـ HTTP client، الـ query نفسها هتتلغي بدل ما تكمّل على الفاضي.

ولو parent اتلغي، كل اللي اتعمل منه بيتلغي معاه.`,
          example: R`package main

import (
  "context"
  "errors"
  "fmt"
  "time"
)

// بتمثّل query بتاخد وقت، وبتسمع للإلغاء
func query(ctx context.Context, d time.Duration) (string, error) {
  select {
  case <-time.After(d):
    return "rows", nil
  case <-ctx.Done():
    return "", fmt.Errorf("query: %w", ctx.Err())
  }
}

func main() {
  ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
  defer cancel()

  res, err := query(ctx, 20*time.Millisecond)
  fmt.Println(res, err)

  _, err = query(ctx, time.Second)
  fmt.Println(err, errors.Is(err, context.DeadlineExceeded))

  ctx2, cancel2 := context.WithCancel(context.Background())
  go func() {
    time.Sleep(30 * time.Millisecond)
    cancel2()
  }()
  _, err = query(ctx2, time.Second)
  fmt.Println(err)
}`,
          try: R`اعمل handler في سيرفر بيعمل [[query(r.Context(), 5*time.Second)]]، وافتح الرابط بـ [[curl]] واضغط Ctrl+C بعد ثانية. اطبع الـ error في السيرفر: هتلاقي [[context canceled]] على طول، مش بعد 5 ثواني. (السيرفر في الدروس الجاية، والكود تحت.)`,
          flag: "script",
          deep: {
            why: R`من غير context: يوزر بيقفل الصفحة، والسيرفر بيكمّل query بتاخد 10 ثواني و ٣ API calls على الفاضي. اضرب ده في ألف يوزر بيعملوا refresh وقت الضغط، وتلاقي السيرفر بيقع من شغل محدش مستنيه. context بيوقّف السلسلة كلها مرة واحدة.`,
            how: R`الـ ctx الأول مهلته 100ms. الـ query الأولى بتخلص في 20ms فنجحت. التانية محتاجة ثانية، فالـ ctx اتلغي عند 100ms (من وقت إنشاءه)، و [[ctx.Err()]] رجّع DeadlineExceeded، والتغليف بـ [[%w]] خلّى errors.Is تلاقيه.

ctx2 بيتلغي بعد 30ms من goroutine تانية، فالـ Err بقى Canceled.

الـ context مش بيوقّف الكود لوحده: الدالة لازم تسمع ([[ctx.Done()]] في select، أو تعدّيه لمكتبة بتسمع زي database/sql و net/http). لو عندك loop تقيلة، شيك [[ctx.Err() != nil]] كل كام لفّة.

[[context.WithValue]] بيحط قيمة في الـ ctx (زي request id أو اليوزر من الـ auth middleware)، بس للحاجات اللي بتعدّي الطبقات وبتخص الـ request، مش كطريقة تبعت parameters.

go vet بيمسك [[the cancel function is not used on all paths]] لو نسيت cancel.`,
            when: R`أي دالة بتعمل I/O أو ممكن تطوّل: خلي أول parameter [[ctx context.Context]]. في handlers استخدم [[r.Context()]]. في main و workers استخدم [[signal.NotifyContext]] (المستوى ٣) عشان Ctrl+C يلغي كل حاجة.`,
            mistakes: R`تنسى [[defer cancel()]]. وتخزّن ctx في struct بدل ما تعدّيه كـ parameter. وتستخدم [[context.Background()]] جوه handler بدل [[r.Context()]] فالإلغاء ميوصلش. وتحط كل حاجة في WithValue. وتبعت nil كـ ctx (استخدم [[context.TODO()]] لو لسه مش عارف).`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

فيه دالة [[query]] بتمثّل query داتابيز بتاخد وقت، وبتسمع لـ context. و main بتجرّبها ٣ مرات:

1. ctx مهلته 100ms، و query بتاخد 20ms: تنجح.
2. نفس الـ ctx، و query محتاجة ثانية: المهلة تخلص قبلها.
3. ctx تاني بيتلغي بإيدينا بعد 30ms.

الناتج كله من [[go run .]] جوه [[docker run --rm golang:1.25]] (Go 1.25.14 على لينكس).

---

## ١. الـ imports

~~~go main.go
import (
  "context"
  "errors"
  "fmt"
  "time"
)
~~~

- [[context]]: النوع [[context.Context]] والدوال اللي بتعمله.
- [[errors]]: فيها [[errors.Is]] اللي بتدوّر على error معيّن جوه error ملفوف.

---

## ٢. [[query]]: دالة بتسمع للإلغاء

~~~go main.go
// بتمثّل query بتاخد وقت، وبتسمع للإلغاء
func query(ctx context.Context, d time.Duration) (string, error) {
  select {
  case <-time.After(d):
    return "rows", nil
  case <-ctx.Done():
    return "", fmt.Errorf("query: %w", ctx.Err())
  }
}
~~~

### [[ctx context.Context]]

- [[context.Context]] **interface**: أي قيمة فيها methods [[Done()]] و [[Err()]] و [[Deadline()]] و [[Value()]].
- العرف في Go: الـ ctx **أول parameter** واسمه [[ctx]]. أي دالة بتعمل I/O أو ممكن تطوّل بتاخده.
- [[(string, error)]]: الدالة بترجّع قيمتين: النتيجة و error.

### الـ select

- [[case <-time.After(d):]]: الشغل «خلص» بعد d، فارجع [[rows]] و [[nil]] (مفيش error).
- [[case <-ctx.Done():]]: [[ctx.Done()]] بترجّع channel **بتتقفل** لما الـ ctx يتلغي. والاستقبال من channel مقفولة بيرجع على طول (درس الـ channels)، فالـ case دي بتصحى أول ما الإلغاء يحصل.
- اللي يحصل الأول يكسب.

### [[fmt.Errorf("query: %w", ctx.Err())]]

- [[ctx.Err()]]: **سبب** الإلغاء. واحد من اتنين:
  - [[context.DeadlineExceeded]]: المهلة خلصت، ونصه [[context deadline exceeded]].
  - [[context.Canceled]]: حد نادى cancel، ونصه [[context canceled]].
- [[fmt.Errorf]]: بتعمل error جديد من قالب. و [[%w]] (w = wrap) بتحط الـ error الأصلي **جوّاه**، مش بس نصه. فبعدين [[errors.Is]] تقدر تلاقيه.

---

## ٣. ctx بمهلة: [[context.WithTimeout]]

~~~go main.go
  ctx, cancel := context.WithTimeout(context.Background(), 100*time.Millisecond)
  defer cancel()
~~~

- [[context.Background()]]: الـ ctx الأصل، فاضي، عمره ما بيتلغي. بتبدأ منه في main والاختبارات.
- [[context.WithTimeout(parent, d)]]: بيعمل ctx **ابن** من parent، بيتلغي لوحده بعد d **من دلوقتي**. وبيرجّع حاجتين: الـ ctx الجديد، و [[cancel]] (دالة تلغيه بإيدك).
- [[defer cancel()]]: لازم دايمًا، حتى لو المهلة هتخلص لوحدها. لو خلصت شغلك بدري، الـ timer اللي جوّا والارتباط بالـ parent بيفضلوا محجوزين لحد ما المهلة تخلص. [[cancel()]] بتنضّفهم على طول، ونداها أكتر من مرة مفيهوش مشكلة.

### الـ query الأولى: 20ms

~~~go main.go
  res, err := query(ctx, 20*time.Millisecond)
  fmt.Println(res, err)
~~~

20ms أقل من 100ms، فالـ [[time.After]] كسب:

~~~text الناتج
rows <nil>
~~~

[[<nil>]] هي طريقة طباعة error فاضي.

### الـ query التانية: ثانية بنفس الـ ctx

~~~go main.go
  _, err = query(ctx, time.Second)
  fmt.Println(err, errors.Is(err, context.DeadlineExceeded))
~~~

- [[_]]: مش محتاجين النتيجة. و [[err =]] (من غير [[:]]) لأن err متعرّف قبل كده.
- المهلة محسوبة من وقت ما الـ ctx اتعمل، مش من وقت الـ query. فعدّى منها حوالي 20ms، وفاضل حوالي 80ms. الثانية مش هتلحق، فـ [[ctx.Done()]] اتقفلت.
- [[errors.Is(err, context.DeadlineExceeded)]]: بتفك الـ error طبقة طبقة (اللي اتلف بـ [[%w]]) وتشوف هل جوّاه DeadlineExceeded.

~~~text الناتج
query: context deadline exceeded true
~~~

جرّبت أكتب [[%v]] بدل [[%w]]: النص طلع زي ما هو، بس [[errors.Is]] رجّعت false، لأن الـ error الأصلي مبقاش جوّاه، نصه بس:

~~~text الناتج بـ %v
query: context deadline exceeded false
~~~

---

## ٤. ctx بيتلغي بإيدنا: [[context.WithCancel]]

~~~go main.go
  ctx2, cancel2 := context.WithCancel(context.Background())
  go func() {
    time.Sleep(30 * time.Millisecond)
    cancel2()
  }()
  _, err = query(ctx2, time.Second)
  fmt.Println(err)
~~~

- [[context.WithCancel(parent)]]: ctx من غير مهلة، بيتلغي بس لما حد ينادي [[cancel2()]] (أو الـ parent يتلغي).
- الـ goroutine بتستنى 30ms وتلغي. ده بيمثّل حاجة من بره: يوزر قفل الصفحة، أو Ctrl+C.
- query كانت محتاجة ثانية، بس ctx2 اتلغي عند 30ms:

~~~text الناتج
query: context canceled
~~~

المرة دي السبب [[Canceled]] مش [[DeadlineExceeded]].

> هنا مفيش [[defer cancel2()]] لأن الـ goroutine بتناديها دايمًا. بس في الكود الحقيقي اكتبها برضه.

---

## ٥. الإلغاء بينزل لتحت

لو الـ parent اتلغي، كل اللي اتعمل منه بيتلغي معاه، حتى لو مهلته لسه طويلة. جرّبت:

~~~go main.go
parent, cancel := context.WithCancel(context.Background())
child, cancelChild := context.WithTimeout(parent, time.Hour)
defer cancelChild()
cancel()
<-child.Done()
fmt.Println(child.Err())
~~~

~~~text الناتج
context canceled
~~~

الابن مهلته ساعة، بس اتلغي أول ما الأب اتلغي. وده اللي بيخلّي ctx واحد من الـ request يوقف الـ query والـ HTTP calls اللي تحته كلها.

---

## ٦. [[go vet]] بيمسك cancel المنسية

لو رميت cancel:

~~~go main.go
ctx, _ := context.WithTimeout(context.Background(), time.Second)
~~~

~~~text الناتج: go vet .
./main.go:10:8: the cancel function returned by context.WithTimeout should be called, not discarded, to avoid a context leak
~~~

ولو فيه [[return]] بدري قبل [[defer cancel()]]:

~~~text الناتج: go vet .
./main.go:10:3: the cancel function is not used on all paths (possible context leak)
./main.go:12:5: this return statement may be reached without using the cancel var defined on line 10
~~~

عشان كده [[defer cancel()]] في السطر اللي بعد WithTimeout على طول.

---

## ٧. الحل: handler بيسمع لليوزر

~~~go solCode
http.HandleFunc("/report", func(w http.ResponseWriter, r *http.Request) {
  res, err := query(r.Context(), 5*time.Second)
  if err != nil {
    log.Println("client gone:", err)
    return
  }
  fmt.Fprintln(w, res)
})
log.Fatal(http.ListenAndServe(":8080", nil))
~~~

- [[http.HandleFunc("/report", ...)]]: أي طلب على [[/report]] تنفّذ الدالة دي (تفاصيل السيرفر في قسم الويب).
- [[r.Context()]]: كل request معاه ctx، والسيرفر بيلغيه لوحده لو اليوزر قفل الاتصال.
- [[query(r.Context(), 5*time.Second)]]: بنعدّيه لتحت، فالـ query بتسمع لليوزر.
- [[log.Println]]: زي fmt.Println بس بيكتب على stderr ومعاه التاريخ والوقت.
- [[fmt.Fprintln(w, res)]]: اكتب الرد لليوزر.
- [[log.Fatal(http.ListenAndServe(":8080", nil))]]: شغّل السيرفر على port 8080، ولو وقع اطبع السبب واخرج.

جرّبته جوه نفس الـ container: شغّلت السيرفر في الخلفية، وبدل ما أضغط Ctrl+C استخدمت [[curl --max-time 1]] اللي بيقفل الاتصال بعد ثانية (نفس اللي بيحصل لما اليوزر يقفل). وزوّدت المدة في سطر اللوج:

~~~text الناتج (curl)
curl: (28) Operation timed out after 1001 milliseconds with 0 bytes received
~~~

~~~text الناتج (السيرفر)
2026/10/07 16:29:19 client gone: query: context canceled after 1s
~~~

السيرفر عرف بعد ثانية، مش بعد 5. ولو كنت عدّيت [[context.Background()]] بدل [[r.Context()]]، الـ query كانت هتكمّل الـ 5 ثواني لحد مش موجود.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[context.Background()]] | الأصل، في main والاختبارات |
| [[context.WithTimeout(parent, d)]] | ابن بيتلغي لوحده بعد d من دلوقتي |
| [[context.WithCancel(parent)]] | ابن بيتلغي لما تنادي cancel |
| [[defer cancel()]] | دايمًا، بعد السطر على طول |
| [[<-ctx.Done()]] | channel بتتقفل وقت الإلغاء، تستخدمها في select |
| [[ctx.Err()]] | [[context deadline exceeded]] أو [[context canceled]] |
| [[r.Context()]] | ctx الـ request، بيتلغي لو اليوزر مشي |

- الـ context مش بيوقّف كودك لوحده: دالتك لازم تسمع لـ [[ctx.Done()]]، أو تعدّيه لمكتبة بتسمع (database/sql و net/http).
- لف الـ error بـ [[%w]] عشان [[errors.Is]] تلاقي السبب.
- إلغاء الأب بيلغي كل الأبناء.`,
          lines: [
            "باكدج main.",
            "imports.",
            "context.",
            "errors.",
            "fmt.",
            "time.",
            "قفلة.",
            R`[[ctx]] أول parameter بالعرف.`,
            "استنى اللي يحصل الأول.",
            "الشغل خلص.",
            "نتيجة.",
            "أو اتلغى.",
            R`رجّع السبب ملفوف بـ [[%w]].`,
            "قفلة.",
            "قفلة.",
            "main.",
            "ctx بمهلة 100ms من دلوقتي.",
            R`لازم: بينضّف الـ timer حتى لو خلصنا بدري.`,
            "query سريعة (20ms).",
            R`[[rows <nil>]].`,
            "query محتاجة ثانية بنفس الـ ctx.",
            "المهلة خلصت: DeadlineExceeded.",
            "ctx بيتلغي بإيدنا.",
            "goroutine...",
            "...تستنى 30ms...",
            "...وتلغي.",
            "قفلة.",
            "query طويلة.",
            R`[[query: context canceled]].`,
            "قفلة."
          ],
          sol: R`الناتج:
[[rows <nil>]]
[[query: context deadline exceeded true]]
[[query: context canceled]]

وفي السيرفر (الكود تحت): أول ما تضغط Ctrl+C في curl، السيرفر بيطبع [[client gone: query: context canceled]] على طول. لو كنت عدّيت [[context.Background()]] بدل [[r.Context()]] كان هيكمّل 5 ثواني ويكتب رد لحد مش موجود.`,
          solCode: R`http.HandleFunc("/report", func(w http.ResponseWriter, r *http.Request) {
  res, err := query(r.Context(), 5*time.Second)
  if err != nil {
    log.Println("client gone:", err)
    return
  }
  fmt.Fprintln(w, res)
})
log.Fatal(http.ListenAndServe(":8080", nil))`
        }
      ]
    }
]);

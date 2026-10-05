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

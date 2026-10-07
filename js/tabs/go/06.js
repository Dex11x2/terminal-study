// تكملة تاب go: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/go/01.js (شرح حقول الدرس في أوله)
MORE("go", [
    {
      t: "interfaces و generics",
      l: 2,
      n: "interface بيتحقق لوحده من غير implements، و io.Reader و io.Writer، و any والـ type switch، وفخ الـ nil interface، و generics بـ constraints",
      items: [
        {
          cmd: "الواجهات Interfaces والـ Duck Typing",
          title: "interface: أي نوع عنده الـ methods المطلوبة بيحققه لوحده، من غير implements",
          desc: R`الـ interface في Go قايمة methods: [[type Notifier interface { Notify(to, msg string) error }]]. أي نوع عنده method بنفس الاسم والشكل بالظبط بيحقق الـ interface لوحده (implicitly). مفيش كلمة [[implements]]، والنوع ممكن ميعرفش أصلًا إن الـ interface موجود.

ده بيخلي الدالة تقول «أنا محتاجة أي حاجة تعرف تبعت إشعار» بدل «أنا محتاجة Email بالذات»: [[func notifyAll(ns []Notifier, ...)]] بتشتغل مع Email و SMS وأي نوع تعمله بكرة.

قواعد بيمشي عليها كود Go:
• الـ interfaces صغيرة: method أو اتنين. أشهرهم في المكتبة القياسية [[io.Reader]] و [[io.Writer]] و [[fmt.Stringer]] و [[error]]، وكلهم method واحدة.
• الـ interface بيتعرّف عند اللي بيستخدمه، مش عند اللي بيحققه. الـ service اللي محتاجة تحفظ users تعرّف [[UserStore]] بالـ methods اللي هي محتاجاها بس.
• «accept interfaces, return structs»: الدوال بتاخد interfaces (مرونة) وبترجّع أنواع حقيقية.

و [[var _ Notifier = SMS{}]]: سطر بيتأكد وقت الـ compile إن SMS بيحقق Notifier. لو حد غيّر توقيع Notify، الـ compile يقع هنا بدل ما يقع في مكان بعيد.`,
          example: R`package main

import (
  "fmt"
  "strings"
)

type Notifier interface {
  Notify(to, msg string) error
}

type Email struct {
  From string
}

func (e Email) Notify(to, msg string) error {
  fmt.Printf("email %s -> %s: %s\n", e.From, to, msg)
  return nil
}

type SMS struct{}

func (SMS) Notify(to, msg string) error {
  if !strings.HasPrefix(to, "+20") {
    return fmt.Errorf("sms: unsupported number %s", to)
  }
  fmt.Println("sms ->", to+":", msg)
  return nil
}

// فحص وقت الـ compile إن SMS بيحقق Notifier
var _ Notifier = SMS{}

func notifyAll(ns []Notifier, to, msg string) {
  for _, n := range ns {
    if err := n.Notify(to, msg); err != nil {
      fmt.Println("failed:", err)
    }
  }
}

func main() {
  all := []Notifier{Email{From: "shop@example.com"}, SMS{}}
  notifyAll(all, "+201001234567", "طلبك اتشحن")
  notifyAll([]Notifier{SMS{}}, "+44700", "hi")
}`,
          try: R`اعمل نوع تالت [[Fake]] فيه [[Sent []string]] ودالة Notify بتضيف الرسالة في Sent بدل ما تبعت (pointer receiver). ابعته لـ notifyAll كـ [[&Fake{}]] واطبع Sent بعدها. وبعدين جرّب تبعته من غير [[&]] واقرا الـ error.`,
          flag: "script",
          deep: {
            why: R`الـ interfaces هي اللي بتخلي كود Go قابل للاختبار والتبديل: الـ service بتاخد [[UserStore]] (interface)، فالإنتاج يديها Postgres، والاختبار يديها fake في الذاكرة، من غير mocking framework ومن غير ما Postgres يعرف إن فيه interface أصلًا.`,
            how: R`قيمة الـ interface جوّاها حاجتين: النوع الحقيقي، والقيمة. [[n.Notify(...)]] بتنادي method النوع الحقيقي وقت التشغيل.

[[func (SMS) Notify]]: receiver من غير اسم لأننا مش محتاجينه (SMS مفيهوش حقول).

مين بيحقق إيه مع الـ pointers: لو الـ method على [[*Fake]] (pointer receiver)، يبقى [[*Fake]] بس اللي بيحقق الـ interface، مش [[Fake]]. ولو على [[Fake]] (value)، الاتنين بيحققوه. عشان كده [[notifyAll([]Notifier{Fake{}})]] بيطلع error: [[Fake does not implement Notifier (method Notify has pointer receiver)]].

[[!strings.HasPrefix(to, "+20")]]: الرقم مش بيبدأ بكود مصر.`,
            when: R`لما يبقى عندك أكتر من تنفيذ حقيقي (إشعارات، تخزين، دفع)، أو محتاج fake للاختبار. متعملش interface لكل struct «يمكن نحتاجه»: اعمله لما يبقى فيه مستخدم محتاجه.`,
            mistakes: R`interface بـ 15 method على شكل الـ struct (زي Java): مستحيل تعمله fake، وكل حاجة مربوطة بيه. وتعرّف الـ interface جنب التنفيذ بدل جنب المستخدم. وتنسى إن pointer receiver معناه إن القيمة العادية مش بتحقق الـ interface.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

interface اسمه [[Notifier]] (أي حاجة تعرف تبعت إشعار)، ونوعين بيحققوه: [[Email]] و [[SMS]]، من غير ما حد فيهم يقول «أنا بحقق Notifier». ودالة [[notifyAll]] بتبعت لأي Notifiers من غير ما تعرف نوعهم. الناتج من [[go run .]] في [[golang:1.25]] على لينكس.

---

## ١. تعريف الـ interface

~~~go main.go
type Notifier interface {
  Notify(to, msg string) error
}
~~~

- [[type Notifier interface { ... }]]: نوع جديد اسمه Notifier، وهو **قايمة methods** مش بيانات.
- [[Notify(to, msg string) error]]: method واحدة بتاخد نصين وترجّع error. أي نوع عنده method **بنفس الاسم ونفس الـ parameters ونفس الراجع** بيبقى Notifier لوحده.

---

## ٢. [[Email]]: النوع الأول

~~~go main.go
type Email struct {
  From string
}

func (e Email) Notify(to, msg string) error {
  fmt.Printf("email %s -> %s: %s\n", e.From, to, msg)
  return nil
}
~~~

- [[(e Email)]]: الـ receiver: الـ method دي على قيمة من نوع Email، و [[e]] اسمها جوه الـ method (زي this أو self في لغات تانية).
- الشكل [[Notify(to, msg string) error]] مطابق للـ interface بالظبط، فـ Email بقى Notifier. مفيش كلمة implements ولا أي ربط مكتوب.
- [[%s]] نص، و [[\n]] سطر جديد. والـ [[->]] هنا مجرد حروف في النص بتتطبع، مش رمز في Go.

---

## ٣. [[SMS]]: النوع التاني

~~~go main.go
type SMS struct{}

func (SMS) Notify(to, msg string) error {
  if !strings.HasPrefix(to, "+20") {
    return fmt.Errorf("sms: unsupported number %s", to)
  }
  fmt.Println("sms ->", to+":", msg)
  return nil
}
~~~

- [[struct{}]]: struct من غير ولا حقل. مفيش بيانات محتاجينها، بس محتاجين نوع نعلّق عليه الـ method.
- [[(SMS)]]: receiver من غير اسم، لأن الـ method مش محتاجة تقرا منه حاجة.
- [[strings.HasPrefix(to, "+20")]]: هل النص بيبدأ بـ [["+20"]] (كود مصر)؟ و [[!]] قبلها = «مش». فلو الرقم مش مصري رجّع error.
- [[to+":"]]: [[+]] على النصوص بتلزقهم.

---

## ٤. الفحص وقت الـ compile

~~~go main.go
// فحص وقت الـ compile إن SMS بيحقق Notifier
var _ Notifier = SMS{}
~~~

- [[var _ Notifier = SMS{}]]: «اعمل متغير نوعه Notifier وحط فيه SMS{}». الاسم [[_]] يعني محدش هيستخدمه، فمش بياخد مكان.
- الفايدة: لو SMS مبقاش بيحقق Notifier، الـ compile يقع **هنا** برسالة واضحة. جرّبت أغيّر توقيع SMS لـ [[Notify(to string) error]]:

~~~text go run .
./main.go:32:18: cannot use SMS{} (value of struct type SMS) as Notifier value in variable declaration: SMS does not implement Notifier (wrong type for method Notify)
        have Notify(string) error
        want Notify(string, string) error
~~~

الـ compiler بيقولك عندك إيه ([[have]]) والمطلوب إيه ([[want]]).

---

## ٥. [[notifyAll]]: بتشتغل مع أي Notifier

~~~go main.go
func notifyAll(ns []Notifier, to, msg string) {
  for _, n := range ns {
    if err := n.Notify(to, msg); err != nil {
      fmt.Println("failed:", err)
    }
  }
}
~~~

- [[ns []Notifier]]: slice عناصرها من نوع Notifier، يعني كل عنصر ممكن يبقى Email أو SMS أو أي حاجة تانية.
- [[n.Notify(to, msg)]]: الدالة مش عارفة n نوعه إيه. قيمة الـ interface شايلة جوّاها **النوع الحقيقي والقيمة**، فوقت التشغيل Go بتنادي Notify بتاعة النوع الحقيقي.
- [[if err := ...; err != nil]]: لو الإرسال فشل اطبع وكمّل على اللي بعده.

---

## ٦. main

~~~go main.go
func main() {
  all := []Notifier{Email{From: "shop@example.com"}, SMS{}}
  notifyAll(all, "+201001234567", "طلبك اتشحن")
  notifyAll([]Notifier{SMS{}}, "+44700", "hi")
}
~~~

- [[[]Notifier{Email{...}, SMS{}}]]: نوعين مختلفين خالص في نفس الـ slice، لأن الاتنين Notifier.
- النداء التاني رقم إنجليزي ([[+44]])، فـ SMS هترجّع error.

~~~text الناتج
email shop@example.com -> +201001234567: طلبك اتشحن
sms -> +201001234567: طلبك اتشحن
failed: sms: unsupported number +44700
~~~

---

## ٧. الحل: [[Fake]] بـ pointer receiver

~~~go solCode
type Fake struct {
  Sent []string
}

func (f *Fake) Notify(to, msg string) error {
  f.Sent = append(f.Sent, msg)
  return nil
}

f := &Fake{}
notifyAll([]Notifier{f}, "+20100", "test")
fmt.Println(f.Sent)
~~~

- [[(f *Fake)]]: pointer receiver. لازم pointer عشان الـ method **بتعدّل** [[f.Sent]]: لو كانت على قيمة كانت هتعدّل نسخة وتترمي.
- [[append(f.Sent, msg)]]: ضيف الرسالة في آخر الـ slice.
- [[f := &Fake{}]]: [[&]] = هات عنوان Fake جديد، فـ f نوعه [[*Fake]].
- آخر ٣ سطور مكانهم جوه main (حطيتهم في آخرها).

~~~text الناتج (بعد سطور المثال)
[test]
~~~

### من غير [[&]]

غيّرتها لـ [[notifyAll([]Notifier{Fake{}}, ...)]]:

~~~text go run .
./main.go:57:24: cannot use Fake{} (value of struct type Fake) as Notifier value in array or slice literal: Fake does not implement Notifier (method Notify has pointer receiver)
~~~

القاعدة: الـ method اللي على [[*Fake]] بتخلي [[*Fake]] بس هو اللي Notifier. الـ method اللي على [[Fake]] (زي Email) بتخلي الاتنين ([[Email]] و [[*Email]]) Notifier.

---

## الخلاصة

| الفكرة | المعنى |
|---|---|
| interface | قايمة methods |
| التحقيق | تلقائي: النوع عنده كل الـ methods بنفس الشكل |
| [[var _ I = T{}]] | يقع وقت الـ compile لو T مبقاش بيحقق I |
| قيمة الـ interface | جوّاها النوع الحقيقي والقيمة |
| receiver بـ pointer | [[*T]] بس اللي بيحقق الـ interface |
| receiver بقيمة | [[T]] و [[*T]] الاتنين |

- الـ interface صغير، ومتعرّف عند اللي بيستخدمه.
- الـ Fake ده نفس اللي هتستخدمه في الاختبارات بدل ما تبعت رسايل حقيقية.`,
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            "strings.",
            "قفلة.",
            "تعريف interface اسمه Notifier.",
            "method واحدة: بتاخد رقم ورسالة وترجّع error.",
            "قفلة.",
            "نوع أول.",
            "حقل المرسِل.",
            "قفلة.",
            "Email عنده Notify بنفس الشكل بالظبط، فبقى Notifier لوحده.",
            "اطبع بدل ما نبعت فعلًا.",
            "نجاح.",
            "قفلة.",
            R`نوع تاني من غير حقول: [[struct{}]].`,
            "receiver من غير اسم.",
            "لو الرقم مش مصري...",
            "...رجّع error.",
            "قفلة.",
            "اطبع.",
            "نجاح.",
            "قفلة.",
            R`[[_]]: متغير مش هنستخدمه، بس السطر بيتأكد إن SMS بيحقق Notifier.`,
            R`بتاخد slice من أي Notifiers.`,
            "لف.",
            "نادي Notify بتاعة النوع الحقيقي، وشيك على الـ error.",
            "اطبع الفشل.",
            "قفلة.",
            "قفلة.",
            "قفلة.",
            "main.",
            "نوعين مختلفين في نفس الـ slice.",
            "الاتنين يبعتوا.",
            "SMS هيرفض.",
            "قفلة."
          ],
          sol: R`الناتج:
[[email shop@example.com -> +201001234567: طلبك اتشحن]]
[[sms -> +201001234567: طلبك اتشحن]]
[[failed: sms: unsupported number +44700]]

الـ Fake (الكود تحت) بعد [[notifyAll([]Notifier{f}, "+20100", "test")]] بيطبع [[[test]]]. ومن غير [[&]]:
[[cannot use Fake{} (value of struct type Fake) as Notifier value in array or slice literal: Fake does not implement Notifier (method Notify has pointer receiver)]]

ده نفس الـ fake اللي هتستخدمه في الاختبارات: بدل ما تبعت SMS حقيقي، تشيك إن الرسالة اتسجّلت.`,
          solCode: R`type Fake struct {
  Sent []string
}

func (f *Fake) Notify(to, msg string) error {
  f.Sent = append(f.Sent, msg)
  return nil
}

f := &Fake{}
notifyAll([]Notifier{f}, "+20100", "test")
fmt.Println(f.Sent)`
        },
        {
          cmd: "io.Reader و io.Writer",
          title: "io.Reader و io.Writer: أصغر interfaces وأكتر حاجة بتتستخدم في Go",
          desc: R`[[io.Reader]] فيه method واحدة: [[Read(p []byte) (n int, err error)]]: «املالي الـ buffer ده وقولّي ملّيت كام بايت». ولما الداتا تخلص بترجّع [[io.EOF]].
[[io.Writer]] فيه [[Write(p []byte) (n int, err error)]]: «اكتب البايتات دي».

ليه مهمين؟ لأن نص المكتبة القياسية بيتكلم بيهم. الحاجات دي كلها Readers: ملف ([[*os.File]])، و body الطلب في HTTP، و [[strings.NewReader]]، واتصال شبكة، وملف مضغوط بيتفك. والحاجات دي كلها Writers: ملف، و [[os.Stdout]]، و [[http.ResponseWriter]]، و [[strings.Builder]]، و [[bytes.Buffer]]، و hash.

فلو كتبت دالة بتاخد [[io.Reader]]، هتشتغل مع كل ده من غير تعديل، وتختبرها بـ [[strings.NewReader("...")]] من غير ملفات.

أدوات بتشتغل عليهم:
• [[bufio.Scanner]]: يقرا سطر سطر (أو كلمة كلمة).
• [[io.Copy(dst, src)]]: ينقل من Reader لـ Writer على دفعات من غير ما يحمّل الكل في الذاكرة.
• [[fmt.Fprintf(w, ...)]]: يكتب نص منسّق في أي Writer.
• [[io.ReadAll(r)]]: يقرا كله (للحاجات الصغيرة بس).

[[&sb]]: بنبعت عنوان الـ Builder لأن Write method بتاعته على pointer receiver.`,
          example: R`package main

import (
  "bufio"
  "bytes"
  "fmt"
  "io"
  "os"
  "strings"
)

type upperWriter struct {
  w io.Writer
}

// أي نوع عنده Write بالشكل ده بقى io.Writer
func (u upperWriter) Write(p []byte) (int, error) {
  _, err := u.w.Write(bytes.ToUpper(p))
  return len(p), err
}

func countLines(r io.Reader) (int, error) {
  sc := bufio.NewScanner(r)
  n := 0
  for sc.Scan() {
    n++
  }
  return n, sc.Err()
}

func main() {
  n, err := countLines(strings.NewReader("a\nb\nc\n"))
  fmt.Println(n, err)

  var sb strings.Builder
  fmt.Fprintf(&sb, "total=%d", n)
  fmt.Println(sb.String())

  out := upperWriter{w: os.Stdout}
  fmt.Fprintln(out, "hello from go")
  if _, err := io.Copy(out, strings.NewReader("copied\n")); err != nil {
    fmt.Println(err)
  }
}`,
          try: R`اكتب برنامج بيقرا من [[os.Stdin]] ويطبع عدد السطور، وشغّله بـ [[cat main.go | go run .]]. لاحظ إن countLines نفسها متغيّرتش. وبعدين احسب SHA-256 لملف من غير ما تقراه كله: [[h := sha256.New()]] ثم [[io.Copy(h, f)]] ثم [[fmt.Printf("%x\n", h.Sum(nil))]]، وقارن بـ [[sha256sum main.go]].`,
          flag: "script",
          deep: {
            why: R`ملف 5 جيجا مينفعش تقراه كله في الذاكرة. الـ Reader والـ Writer بيخلّوا الداتا تمشي على دفعات (streaming): من الملف للـ hash، أو من الطلب للـ S3، أو من الداتابيز للرد، والذاكرة ثابتة مهما كبر الحجم. وده نفس الكود اللي بيشتغل على نص صغير في الاختبار.`,
            how: R`[[bufio.NewScanner(r)]] بيقرا من r على دفعات وبيقسّم سطور. [[sc.Scan()]] بترجّع true طول ما فيه سطر، و [[sc.Err()]] بعد الـ loop بيقولك لو وقفت بسبب error مش نهاية الداتا. أقصى طول سطر افتراضي 64KB، ولو أكبر لازم [[sc.Buffer(...)]].

upperWriter مثال على «تلف» Writer: بتاخد Writer وتعدّل البايتات قبل ما تعدّيها. نفس الفكرة في gzip.NewWriter و middleware بيعدّ البايتات. والعقد بتاع Write: ترجّع عدد البايتات اللي اتكتبت من p، و error لو أقل من [[len(p)]].

[[io.Copy]] بيستخدم buffer بـ 32KB ويلف: Read ثم Write لحد io.EOF، ومبيرجّعش io.EOF كـ error (ده النهاية الطبيعية).`,
            when: R`أي دالة بتعالج داتا (parse، hash، تحويل، رفع): خليها تاخد [[io.Reader]] وتكتب في [[io.Writer]] بدل ما تاخد اسم ملف أو [[[]byte]]. كده تشتغل مع الملفات والشبكة والاختبار.`,
            mistakes: R`[[io.ReadAll]] على حاجة ممكن تبقى ضخمة (upload من يوزر): استخدم [[io.LimitReader]] أو [[http.MaxBytesReader]]. وتنسى [[sc.Err()]] بعد الـ Scan loop فتفتكر إن الملف خلص وهو وقف بسبب error. وتعامل [[io.EOF]] كـ error حقيقي.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

٤ حاجات بالـ interfaces دول: يعدّ سطور من [[io.Reader]] (نص في الذاكرة)، ويكتب نص منسّق في [[strings.Builder]]، ويعمل Writer بتاعه بيحوّل لحروف كبيرة، وينقل من Reader لـ Writer بـ [[io.Copy]]. الناتج من [[go run .]] في [[golang:1.25]] على لينكس.

---

## ١. الـ interfaces نفسهم (من المكتبة القياسية)

~~~go
type Reader interface {
  Read(p []byte) (n int, err error)
}

type Writer interface {
  Write(p []byte) (n int, err error)
}
~~~

- [[p []byte]]: slice بايتات. في Read دي «فاضية، املاها»، وفي Write دي «اللي عايزك تكتبه».
- [[n]]: عدد البايتات اللي اتقرت أو اتكتبت فعلًا.
- Read بترجّع [[io.EOF]] (End Of File) لما الداتا تخلص. ده مش فشل، ده «خلاص».

---

## ٢. الـ imports

| الباكدج | بنستخدم منها |
|---|---|
| [[bufio]] | (buffered I/O) [[bufio.NewScanner]]: قراية سطر سطر |
| [[bytes]] | زي strings بس على [[[]byte]]: [[bytes.ToUpper]] |
| [[fmt]] | [[Fprintf]] و [[Fprintln]]: طباعة في أي Writer |
| [[io]] | الـ interfaces، و [[io.Copy]] |
| [[os]] | [[os.Stdout]]: الشاشة، وهي Writer |
| [[strings]] | [[strings.NewReader]] و [[strings.Builder]] |

---

## ٣. [[upperWriter]]: Writer بيلف Writer تاني

~~~go main.go
type upperWriter struct {
  w io.Writer
}

// أي نوع عنده Write بالشكل ده بقى io.Writer
func (u upperWriter) Write(p []byte) (int, error) {
  _, err := u.w.Write(bytes.ToUpper(p))
  return len(p), err
}
~~~

- [[w io.Writer]]: حقل بيشيل **أي** Writer: الشاشة أو ملف أو غيره.
- [[Write(p []byte) (int, error)]]: نفس شكل io.Writer، فـ upperWriter بقى Writer لوحده.
- [[bytes.ToUpper(p)]]: نسخة من البايتات بحروف كبيرة، وبنكتبها في الـ Writer اللي جوّا.
- [[_, err :=]]: عدد البايتات اللي الـ Writer الداخلي رجّعه مش محتاجينه.
- [[return len(p), err]]: العقد بتاع Write إنك ترجّع كام بايت **من p** اتكتب. إحنا كتبنا p كله (بعد التحويل)، فـ [[len(p)]].

---

## ٤. [[countLines]]: بتاخد أي Reader

~~~go main.go
func countLines(r io.Reader) (int, error) {
  sc := bufio.NewScanner(r)
  n := 0
  for sc.Scan() {
    n++
  }
  return n, sc.Err()
}
~~~

- [[bufio.NewScanner(r)]]: Scanner بيقرا من r على دفعات ويقسّمهم سطور.
- [[for sc.Scan()]]: [[Scan()]] بتجهّز السطر الجاي وترجّع true، ولما الداتا تخلص (أو يحصل error) بترجّع false فالـ loop تقف. ده شكل for بشرط بس (زي while).
- [[sc.Err()]]: بعد الـ loop: nil لو وقفت عشان الداتا خلصت (io.EOF مش بيتحسب error)، أو الـ error الحقيقي.

ليه Err مهمة؟ جرّبت سطر طوله 70000 حرف (أكبر من الحد الافتراضي 64KB):

~~~text الناتج
1 bufio.Scanner: token too long
~~~

الـ Scan وقفت بعد أول سطر بس. لو مكنتش شيّكت على Err كنت هتفتكر إن الملف سطر واحد.

---

## ٥. main

### العد من نص في الذاكرة

~~~go main.go
  n, err := countLines(strings.NewReader("a\nb\nc\n"))
  fmt.Println(n, err)
~~~

- [[strings.NewReader(...)]]: بيحوّل نص لـ io.Reader، فينفع نبعته لأي دالة عايزة Reader، من غير ملف.
- ٣ سطور، و Err بـ nil.

~~~text الناتج
3 <nil>
~~~

### [[strings.Builder]] و [[Fprintf]]

~~~go main.go
  var sb strings.Builder
  fmt.Fprintf(&sb, "total=%d", n)
  fmt.Println(sb.String())
~~~

- [[strings.Builder]]: Writer بيجمّع اللي بيتكتب فيه نص. [[var sb]] من غير قيمة = Builder فاضي جاهز.
- [[fmt.Fprintf(w, ...)]]: F = file، يعني اطبع في Writer معيّن بدل الشاشة.
- [[&sb]]: عنوان sb، لأن Write بتاعة Builder على pointer receiver، فـ [[*strings.Builder]] بس هو الـ Writer. لو بعتّ sb من غير [[&]]:

~~~text go build .
./main.go:10:14: cannot use sb (variable of struct type strings.Builder) as io.Writer value in argument to fmt.Fprintf: strings.Builder does not implement io.Writer (method Write has pointer receiver)
~~~

- [[sb.String()]]: النص اللي اتجمّع.

~~~text الناتج
total=3
~~~

### upperWriter فوق الشاشة

~~~go main.go
  out := upperWriter{w: os.Stdout}
  fmt.Fprintln(out, "hello from go")
~~~

- [[os.Stdout]]: الـ standard output (الشاشة)، ونوعه [[*os.File]] اللي هو Writer.
- [[Fprintln(out, ...)]]: Fprintln مش عارفة إن out بيكبّر الحروف، هي بس بتنادي Write.

~~~text الناتج
HELLO FROM GO
~~~

### [[io.Copy]]

~~~go main.go
  if _, err := io.Copy(out, strings.NewReader("copied\n")); err != nil {
    fmt.Println(err)
  }
~~~

- [[io.Copy(dst, src)]]: انقل من src (Reader) لـ dst (Writer) لحد ما الداتا تخلص، وبيرجّع عدد البايتات و error.
- في العادي بيستخدم buffer بـ 32KB: Read ثم Write ثم Read... فالذاكرة ثابتة مهما كبر الحجم. (ولو الـ src عنده method اسمها [[WriteTo]] زي [[strings.Reader]]، io.Copy بتسيبه هو يكتب على طول.)
- io.EOF في الآخر طبيعي، فـ err بـ nil.

~~~text الناتج كله
3 <nil>
total=3
HELLO FROM GO
COPIED
~~~

---

## ٦. الحل

~~~go solCode
n, err := countLines(os.Stdin)
fmt.Println(n, err)

f, err := os.Open("main.go")
if err != nil {
  log.Fatal(err)
}
defer f.Close()
h := sha256.New()
if _, err := io.Copy(h, f); err != nil {
  log.Fatal(err)
}
fmt.Printf("%x\n", h.Sum(nil))
~~~

- محتاج imports زيادة: [[crypto/sha256]] و [[log]].
- [[countLines(os.Stdin)]]: [[os.Stdin]] (الـ standard input) Reader هو كمان، فـ countLines اشتغلت عليه من غير ولا تعديل.
- [[log.Fatal(err)]]: اطبع الـ error وأقفل البرنامج بـ exit code 1. تمام في main، مش في دالة عميقة.
- [[sha256.New()]]: hash فاضي، وهو Writer: كل اللي يتكتب فيه بيدخل في الحساب.
- [[io.Copy(h, f)]]: الملف بيتقري دفعات ويتكتب في الـ hash، من غير ما الملف كله يبقى في الذاكرة.
- [[h.Sum(nil)]]: النتيجة كـ [[[]byte]] (32 بايت). و [[%x]] بيطبعهم hex: كل بايت حرفين، فـ 64 حرف.

شغّلته بـ [[cat main.go | go run .]] (الـ [[|]] بيبعت ناتج cat لـ stdin بتاع البرنامج)، وقارنت بـ [[wc -l]] و [[sha256sum]]:

~~~text الناتج
35 <nil>
91e718968168d4496da39d9a4b3f8ea9fd0a1c9e5a4e6fc3462eb90df5f777a5
35 main.go
91e718968168d4496da39d9a4b3f8ea9fd0a1c9e5a4e6fc3462eb90df5f777a5  main.go
~~~

نفس العدد ونفس الـ hash (الرقمين حسب محتوى ملفك).

---

## الخلاصة

| الحاجة | Reader ولا Writer |
|---|---|
| [[strings.NewReader]] و [[os.Stdin]] و [[*os.File]] | Reader |
| [[os.Stdout]] و [[*strings.Builder]] و [[sha256.New()]] | Writer |
| [[bufio.Scanner]] | بيقرا من Reader سطر سطر |
| [[io.Copy(dst, src)]] | من Reader لـ Writer على دفعات |
| [[fmt.Fprintf(w, ...)]] | طباعة منسّقة في أي Writer |

- اكتب دوالك تاخد [[io.Reader]] أو [[io.Writer]]، وهتشتغل مع الملفات والشبكة والاختبار من غير تعديل.
- [[sc.Err()]] بعد أي Scan loop.`,
          lines: [
            "باكدج main.",
            "imports.",
            R`[[bufio]]: قراية بـ buffer وسطر سطر.`,
            R`[[bytes]]: زي strings بس على [[[]byte]].`,
            "fmt.",
            R`[[io]]: الـ interfaces والأدوات.`,
            "os.",
            "strings.",
            "قفلة.",
            "نوع بيلف Writer تاني.",
            "الـ Writer اللي هنكتب فيه في الآخر.",
            "قفلة.",
            "Write: حوّل لحروف كبيرة واكتب في اللي جوّا.",
            "اكتب، وخد الـ error.",
            R`رجّع [[len(p)]]: كتبنا كل اللي جالنا.`,
            "قفلة.",
            R`بتاخد أي [[io.Reader]].`,
            "Scanner بيقسّم سطور.",
            "عدّاد.",
            "طول ما فيه سطر...",
            "...زوّد.",
            "قفلة.",
            "العدد، والـ error لو حصل.",
            "قفلة.",
            "main.",
            "نص في الذاكرة كـ Reader: من غير ملف.",
            "3 و nil.",
            R`[[strings.Builder]]: Writer بيجمّع نص.`,
            R`[[Fprintf]] بتكتب فيه، و [[&sb]] عنوانه.`,
            "اطبع اللي اتجمّع.",
            R`upperWriter فوق [[os.Stdout]].`,
            "Fprintln في أي Writer.",
            R`[[io.Copy]] من Reader لـ Writer.`,
            "لو فشل.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الناتج:
[[3 <nil>]]
[[total=3]]
[[HELLO FROM GO]]
[[COPIED]]

[[cat main.go | go run .]] بيطبع عدد سطور الملف (الكود تحت)، و countLines هي هي: بس بعتنالها [[os.Stdin]] بدل strings.NewReader.

والـ hash بيطلع نفس الرقم اللي [[sha256sum main.go]] بيطلّعه (64 حرف hex). الملف بيتقري على دفعات 32KB، فلو كان 5 جيجا الذاكرة مش هتزيد.`,
          solCode: R`n, err := countLines(os.Stdin)
fmt.Println(n, err)

f, err := os.Open("main.go")
if err != nil {
  log.Fatal(err)
}
defer f.Close()
h := sha256.New()
if _, err := io.Copy(h, f); err != nil {
  log.Fatal(err)
}
fmt.Printf("%x\n", h.Sum(nil))`
        },
        {
          cmd: "any و type switch",
          title: "any والـ type assertion والـ type switch: تعرف إيه اللي جوّا الـ interface",
          desc: R`[[any]] اسم تاني لـ [[interface{}]]: interface من غير methods، فكل الأنواع بتحققه. يعني متغير من نوع any ممكن يشيل أي حاجة: int أو string أو struct. [[fmt.Println]] بتاخد [[...any]] عشان كده بتطبع أي حاجة.

بس عشان تعمل حاجة بالقيمة لازم ترجّعها لنوعها:
• type assertion: [[n := v.(int)]]: «أنا متأكد إن جوّاه int». لو مش int البرنامج بيعمل panic.
• بالشكل الآمن (comma ok): [[n, ok := v.(int)]]. لو مش int، ok بـ false و n بالقيمة الصفرية، ومفيش panic.
• type switch: [[switch x := v.(type) { case int: ... case string: ... }]]. جوه كل case الـ x بيبقى من النوع ده. والـ case ممكن يبقى interface كمان ([[case fmt.Stringer:]]).

وفيه حاجة لازم تعرفها: [[json.Unmarshal]] في [[map[string]any]] بيحوّل كل الأرقام لـ [[float64]]، والـ arrays لـ [[[]any]]، والـ objects لـ [[map[string]any]].

الـ backticks حوالين الـ JSON في المثال raw string: مش محتاج تعمل escape لعلامات التنصيص اللي جوّاه.`,
          example: R`package main

import (
  "encoding/json"
  "fmt"
)

func describe(v any) string {
  switch x := v.(type) {
  case nil:
    return "nil"
  case int:
    return fmt.Sprintf("int %d", x)
  case string:
    return fmt.Sprintf("string of %d bytes", len(x))
  case []any:
    return fmt.Sprintf("list of %d", len(x))
  case fmt.Stringer:
    return "stringer " + x.String()
  default:
    return fmt.Sprintf("other %T", x)
  }
}

func main() {
  var v any = 42
  n, ok := v.(int)
  fmt.Println(n, ok)
  s, ok := v.(string)
  fmt.Printf("%q %v\n", s, ok)

  fmt.Println(describe(7), describe("سلام"), describe(nil), describe(3.5))

  var data map[string]any
  raw := $__bt{"name":"Sara","age":25,"tags":["a","b"]}$__bt
  if err := json.Unmarshal([]byte(raw), &data); err != nil {
    panic(err)
  }
  fmt.Println(describe(data["age"]), describe(data["tags"]))
}`,
          try: R`اكتب [[s := v.(string)]] (من غير ok) واقرا الـ panic. وبعدين ضيف لـ describe case لـ [[float64]]، وجرّب [[describe(time.Second)]]: هيدخل أنهي case وليه؟`,
          flag: "script",
          deep: {
            why: R`أحيانًا مش عارف النوع وقت الكتابة: JSON شكله مش ثابت، أو رسايل من queue بأنواع مختلفة، أو دالة بتاخد options متنوعة. type switch هو الطريقة الآمنة إنك تتعامل مع ده، بدل ما البرنامج يقع.`,
            how: R`الترتيب في type switch مهم: أول case يطابق بيكسب. [[time.Duration]] أساسه int64 (مش int)، فمش هيدخل [[case int]]، بس عنده [[String()]] فهيدخل [[case fmt.Stringer]] ويطلع [[stringer 1s]].

[[case nil]] بيطابق لو الـ interface نفسه nil. وفي [[default]] الـ x بيفضل نوعه any.

الأرقام في JSON بتبقى float64 لأن JSON مفيهوش فرق بين int و float. فـ [[data["age"].(int)]] هيعمل panic. لو محتاج أرقام صحيحة استخدم struct بحقل int (الأحسن)، أو [[decoder.UseNumber()]].

قبل generics (Go 1.18) كان any بيتستخدم كتير عشان تكتب كود لأكتر من نوع. دلوقتي لو الأنواع معروفة وقت الكتابة، generics أحسن لأن الـ compiler بيشيك عليها (درس generics).`,
            when: R`JSON مش معروف شكله، وقيم في context، و type switch على أنواع errors أو رسايل. لكن لو تقدر تعرّف struct أو interface بـ methods، ده أحسن دايمًا: any بيشيل الحماية بتاعة الـ compiler.`,
            mistakes: R`[[v.(T)]] من غير ok على قيمة جاية من بره فالسيرفر يقع. و [[map[string]any]] في كل حتة بدل struct، فتلاقي نفسك بتعمل assertions في كل سطر. وتتوقع int من JSON وهو float64.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

دالة [[describe]] بتاخد أي قيمة ([[any]]) وتقول نوعها بـ type switch. و main بتجرّب الـ type assertion بالشكل الآمن، وبعدين بتفك JSON في [[map[string]any]] وتشوف الأرقام بقت نوعها إيه. الناتج من [[go run .]] في [[golang:1.25]] على لينكس.

---

## ١. [[any]]

[[any]] اسم تاني لـ [[interface{}]]: interface **من غير methods**. وبما إن أي نوع عنده «كل الـ methods المطلوبة» (اللي هي ولا حاجة)، فأي قيمة تتحط فيه. وزي أي interface، القيمة جوّاها حاجتين: النوع الحقيقي والقيمة.

---

## ٢. [[describe]]: الـ type switch

~~~go main.go
func describe(v any) string {
  switch x := v.(type) {
  case nil:
    return "nil"
  case int:
    return fmt.Sprintf("int %d", x)
  case string:
    return fmt.Sprintf("string of %d bytes", len(x))
  case []any:
    return fmt.Sprintf("list of %d", len(x))
  case fmt.Stringer:
    return "stringer " + x.String()
  default:
    return fmt.Sprintf("other %T", x)
  }
}
~~~

### [[switch x := v.(type)]]

- [[v.(type)]]: «إيه النوع الحقيقي اللي جوه v؟». الكلمة [[type]] هنا حرفيًا، وده شكل مسموح بس جوه switch.
- [[x :=]]: جوه كل case، x بيبقى **من نوع الـ case ده**. في [[case int]] الـ x نوعه int، فـ [[%d]] شغالة. وفي [[case string]] نوعه string، فـ [[len(x)]] شغالة.

### الـ cases

| الـ case | بيطابق إمتى | x جوّاه نوعه |
|---|---|---|
| [[nil]] | الـ interface نفسه فاضي | any |
| [[int]] | int بالظبط (مش int64) | int |
| [[string]] | نص | string |
| [[[]any]] | slice من any (زي JSON array) | [[[]any]] |
| [[fmt.Stringer]] | أي نوع عنده [[String() string]] | fmt.Stringer |
| [[default]] | أي حاجة تانية | any |

- [[fmt.Stringer]] interface في fmt فيه method واحدة [[String() string]]. يعني الـ case ممكن يبقى interface مش نوع بس.
- [[%T]]: بيطبع اسم النوع.
- الترتيب مهم: أول case يطابق بيكسب.

---

## ٣. main: الـ type assertion

~~~go main.go
  var v any = 42
  n, ok := v.(int)
  fmt.Println(n, ok)
  s, ok := v.(string)
  fmt.Printf("%q %v\n", s, ok)
~~~

- [[var v any = 42]]: v نوعه any، وجوّاه int قيمته 42.
- [[v.(int)]]: type assertion: «طلّع اللي جوّا كـ int». بالشكل ده [[n, ok :=]] (comma ok): لو صح ok بـ true و n بـ 42.
- [[v.(string)]]: غلط، جوّاه int. بس عشان كاتبين [[, ok]] مفيش panic: s بالقيمة الصفرية [[""]] و ok بـ false.
- [[%q]] بتبيّن إن النص فاضي ([[""]])، و [[%v]] بتطبع القيمة بشكلها العادي.

~~~text الناتج
42 true
"" false
~~~

### ومن غير ok؟

غيّرت السطرين لـ [[s := v.(string)]] و [[fmt.Println(s)]]:

~~~text الناتج
42 true
panic: interface conversion: interface {} is int, not string
~~~

والبرنامج وقف بـ [[exit status 2]].

---

## ٤. [[describe]] على ٤ قيم

~~~go main.go
  fmt.Println(describe(7), describe("سلام"), describe(nil), describe(3.5))
~~~

~~~text الناتج
int 7 string of 8 bytes nil other float64
~~~

- [["سلام"]] ٤ حروف بس [[len]] بيعدّ **بايتات**، وكل حرف عربي في UTF-8 بايتين، فـ 8.
- [[3.5]] نوعه الافتراضي float64، ومفيش case ليه، فراح [[default]].

---

## ٥. JSON في [[map[string]any]]

~~~go main.go
  var data map[string]any
  raw := $__bt{"name":"Sara","age":25,"tags":["a","b"]}$__bt
  if err := json.Unmarshal([]byte(raw), &data); err != nil {
    panic(err)
  }
  fmt.Println(describe(data["age"]), describe(data["tags"]))
~~~

- [[map[string]any]]: map مفتاحها نص وقيمتها أي حاجة، لأننا مش عارفين شكل الـ JSON.
- الـ backticks حوالين الـ JSON: **raw string**، النص بيتاخد زي ما هو، فعلامات التنصيص اللي جوّاه مش محتاجة [[\"]].
- [[json.Unmarshal(data, &v)]]: فك JSON (كبايتات) جوه v. و [[&data]] عنوان الـ map عشان Unmarshal تقدر تعملها وتملاها.
- [[data["age"]]]: القيمة نوعها any، فنبعتها لـ describe تقولنا جوّاها إيه.

~~~text الناتج
other float64 list of 2
~~~

- [[25]] بقت **float64** مش int: JSON فيه نوع واحد للأرقام، فـ Go بتحطهم كلهم float64. عشان كده [[case int]] مطابقش.
- [[["a","b"]]] بقت [[[]any]] فيها عنصرين.

جرّبت [[data["age"].(int)]]:

~~~text الناتج
panic: interface conversion: interface {} is float64, not int
~~~

---

## ٦. التجربة: [[case float64]] و [[time.Second]]

ضفت قبل [[default]]:

~~~go
  case float64:
    return fmt.Sprintf("float64 %g", x)
~~~

([[%g]] بيطبع الرقم العشري من غير أصفار زيادة.) وضفت في main [[describe(time.Second)]] و [[describe(int64(5))]]:

~~~text الناتج
42 true
"" false
int 7 string of 8 bytes nil float64 3.5
float64 25 list of 2
stringer 1s other int64
~~~

- [[time.Second]] نوعه [[time.Duration]]، وأساسه int64، لكنه نوع **تاني** غير int، فمش هيدخل [[case int]]. بس عنده [[String()]] فدخل [[case fmt.Stringer]] وطلع [[1s]].
- [[int64(5)]]: int64 مش int، ومش Stringer، فـ default.

---

## الخلاصة

| الشكل | لو النوع غلط |
|---|---|
| [[x := v.(T)]] | panic |
| [[x, ok := v.(T)]] | x صفري و ok = false |
| [[switch x := v.(type)]] | بيروح للـ case المناسب أو default |

- [[any]] = [[interface{}]]: يشيل أي حاجة، بس لازم ترجّعه لنوعه عشان تستخدمه.
- أرقام JSON في any بتبقى float64.
- لو تقدر تعرّف struct أو interface بـ methods، ده أحسن من any.`,
          lines: [
            "باكدج main.",
            "imports.",
            "encoding/json.",
            "fmt.",
            "قفلة.",
            R`بتاخد [[any]]: أي قيمة.`,
            R`type switch: x جوه كل case بنوع الـ case.`,
            "الـ interface فاضي.",
            "nil.",
            "int.",
            "x هنا int.",
            "string.",
            "x هنا string، فـ len شغالة.",
            R`slice من any (زي arrays الـ JSON).`,
            "طولها.",
            "أي نوع عنده String() (interface).",
            "نادي String.",
            "أي حاجة تانية.",
            R`[[%T]] بيطبع النوع.`,
            "قفلة الـ switch.",
            "قفلة.",
            "main.",
            "any جوّاه int.",
            "assertion آمن (comma ok): n نوعه int.",
            R`[[42 true]].`,
            "مش string: القيمة الصفرية و false، من غير panic.",
            R`[[%q]] بيبيّن إن النص فاضي.`,
            R`int 7، و string of 8 bytes، و nil، و other float64.`,
            "map بقيم any.",
            "JSON في raw string.",
            R`فك الـ JSON في الـ map، و [[&data]] عشان Unmarshal يملاه.`,
            "لو فشل.",
            "قفلة.",
            R`age بقى float64، و tags بقت [[[]any]].`,
            "قفلة."
          ],
          sol: R`الناتج:
[[42 true]]
[["" false]]
[[int 7 string of 8 bytes nil other float64]]
[[other float64 list of 2]]

[[s := v.(string)]] من غير ok: [[panic: interface conversion: interface {} is int, not string]].

و [[describe(time.Second)]] بيرجّع [[stringer 1s]]: Duration مش int (أساسه int64، ونوعه نوع تاني أصلًا)، بس عنده String() فطابق [[fmt.Stringer]]. ولو حطيت [[case float64]] قبل default، [[describe(3.5)]] و [[data["age"]]] هيدخلوه.`
        },
        {
          cmd: "nil interface",
          title: "interface جوّاه nil pointer مش بيساوي nil: أشهر فخ في Go",
          desc: R`قيمة الـ interface جوّاها حاجتين: النوع والقيمة. الـ interface بيساوي [[nil]] بس لو الاتنين فاضيين.

لو عملت [[var e *MyErr]] (pointer بـ nil) ورجّعته كـ [[error]]، الـ error اللي راجع جوّاه: النوع [[*MyErr]] والقيمة nil. النوع مش فاضي، فـ [[err != nil]] بتبقى true، والمستدعي هيفتكر إن فيه error وهو مفيش.

ده بيحصل في كود حقيقي لما دالة بتعرّف متغير من نوع الـ error الخاص بيها وترجّعه في الآخر «عادي». الحل بسيط: الدالة اللي بترجّع [[error]] ترجّع [[nil]] صريحة في حالة النجاح، مش متغير من نوع خاص.

[[func (*MyErr) Error() string { return "my error" }]]: method في سطر واحد، والـ receiver من غير اسم.

و [[(*MyErr)(nil)]] معناها «nil من النوع [[*MyErr]]»: تحويل nil لنوع معيّن عشان نقارن بيه.`,
          example: R`package main

import (
  "errors"
  "fmt"
)

type MyErr struct{}

func (*MyErr) Error() string { return "my error" }

// غلط: بترجّع متغير من نوع *MyErr حتى لو nil
func validateBad(ok bool) error {
  var e *MyErr
  if !ok {
    e = &MyErr{}
  }
  return e
}

// صح: nil صريحة لما مفيش error
func validateGood(ok bool) error {
  if !ok {
    return &MyErr{}
  }
  return nil
}

func main() {
  err := validateBad(true)
  fmt.Println(err == nil)
  fmt.Printf("%T %v\n", err, err == (*MyErr)(nil))

  fmt.Println(validateGood(true) == nil)

  var target *MyErr
  fmt.Println(errors.As(validateGood(false), &target))
}`,
          try: R`نادي [[validateBad(true)]] واكتب [[if err != nil { fmt.Println("فيه error:", err) }]]. هيطبع إيه؟ وبعدين جرّب نفس الفكرة مع interface تاني: [[var s fmt.Stringer]] واديله [[(*time.Location)(nil)]] وشوف [[s == nil]].`,
          flag: "script",
          deep: {
            why: R`ده من أشهر أسئلة انترفيو Go، ومن أصعب الـ bugs لو مكنتش تعرفه: كل حاجة شغالة صح، بس الـ handler بيرجّع 500 «my error» لطلبات ناجحة، أو بيعمل panic لما يحاول يقرا الـ error.`,
            how: R`لما بترجّع e من دالة نوعها الراجع [[error]]، Go بتحوّل [[*MyErr]] لـ error: بتحط النوع ([[*MyErr]]) والقيمة (nil) في الـ interface. المقارنة [[err == nil]] بتسأل «النوع والقيمة الاتنين فاضيين؟» والإجابة لأ.

[[%T]] بيطبع [[*main.MyErr]]: النوع موجود. و [[err == (*MyErr)(nil)]] true: القيمة nil من النوع ده.

ولو حد نادى [[err.Error()]] هنا مش هيقع، لأن Error() مبتقراش أي حقل. لو كانت بتقرا [[e.Field]] كانت هتعمل nil pointer panic.

[[go vet]] مش بيمسك الحالة دي. staticcheck بيمسكها بفحص [[SA4023]] ([[this comparison is never true]])، و [[nilaway]] من Uber بيحاول كمان.`,
            when: R`خليك فاكرها في أي دالة بترجّع interface (error بالذات): رجّع [[nil]] صريحة. ولو بتبني error بالتدريج ([[var errs []error]])، رجّع [[errors.Join(errs...)]] اللي بترجّع nil لو مفيش.`,
            mistakes: R`[[var err *MyErr; ...; return err]]. ودالة نوعها الراجع [[*MyErr]] (مش error)، والمستدعي بيحطها في [[err error]]: نفس المشكلة. و [[if err != nil]] على interface ميعرفش إنه ممكن يبقى typed nil.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

دالتين بيعملوا نفس الحاجة: يرجّعوا error لو [[ok]] بـ false. الأولى ([[validateBad]]) بترجّع error **مش nil** حتى في النجاح، والتانية ([[validateGood]]) صح. و main بتوريك الفرق. الناتج من [[go run .]] في [[golang:1.25]] على لينكس.

---

## ١. نوع error خاص

~~~go main.go
type MyErr struct{}

func (*MyErr) Error() string { return "my error" }
~~~

- [[struct{}]]: من غير حقول.
- [[func (*MyErr) Error() string { ... }]]: method على [[*MyErr]] (الـ receiver من غير اسم لأننا مش محتاجينه)، والجسم كله في سطر واحد. فـ [[*MyErr]] بقى بيحقق [[error]].

---

## ٢. الدالة الغلط

~~~go main.go
// غلط: بترجّع متغير من نوع *MyErr حتى لو nil
func validateBad(ok bool) error {
  var e *MyErr
  if !ok {
    e = &MyErr{}
  }
  return e
}
~~~

- [[var e *MyErr]]: pointer قيمته [[nil]]، بس نوعه معروف: [[*MyErr]].
- [[if !ok]]: لو فشل، حط فيه error حقيقي.
- [[return e]]: الدالة نوعها الراجع [[error]] (interface). فـ Go بتحوّل e لـ error، يعني بتحط جوه الـ interface حاجتين:

~~~text جوه الـ error الراجع لما ok = true
النوع:   *MyErr
القيمة:  nil
~~~

والـ interface بيساوي [[nil]] **بس لو الاتنين فاضيين**. هنا النوع مش فاضي، فالـ error مش nil.

---

## ٣. الدالة الصح

~~~go main.go
// صح: nil صريحة لما مفيش error
func validateGood(ok bool) error {
  if !ok {
    return &MyErr{}
  }
  return nil
}
~~~

[[return nil]] في دالة نوعها الراجع error = interface فاضي خالص (لا نوع ولا قيمة).

---

## ٤. main

~~~go main.go
  err := validateBad(true)
  fmt.Println(err == nil)
  fmt.Printf("%T %v\n", err, err == (*MyErr)(nil))
~~~

- [[validateBad(true)]]: نجاح، ومع ذلك [[err == nil]] بـ **false**.
- [[%T]]: النوع اللي جوه الـ interface: [[*main.MyErr]] ([[main]] اسم الباكدج).
- [[(*MyErr)(nil)]]: تحويل: «nil من النوع [[*MyErr]]». الأقواس حوالين [[*MyErr]] لازمة عشان Go متفهمش [[*]] كـ «اقرا اللي في العنوان». والمقارنة true: النوع والقيمة الاتنين متطابقين.

~~~go main.go
  fmt.Println(validateGood(true) == nil)

  var target *MyErr
  fmt.Println(errors.As(validateGood(false), &target))
~~~

- النسخة الصح: true.
- [[errors.As]] لقت [[*MyErr]] جوه الـ error الحقيقي، فـ true.

~~~text الناتج
false
*main.MyErr true
true
true
~~~

---

## ٥. التجربة: [[if err != nil]]

~~~go main.go
  if err := validateBad(true); err != nil {
    fmt.Println("فيه error:", err)
  }
~~~

~~~text الناتج
فيه error: my error
~~~

العملية نجحت، والكود قال إنها فشلت. ولو Error() كانت بتقرا حقل من الـ struct (زي [[e.Field]]) كانت هتعمل nil pointer panic، لأن الـ pointer نفسه nil.

### مع interface تاني

~~~go main.go
  var s fmt.Stringer = (*time.Location)(nil)
  fmt.Println(s == nil)
  var s2 fmt.Stringer
  fmt.Println(s2 == nil)
~~~

~~~text الناتج
false
true
~~~

نفس الفكرة مع أي interface: s فيه نوع ([[*time.Location]]) فمش nil، و s2 فاضي خالص فـ nil.

---

## ٦. الأدوات بتمسكها؟

[[go vet]] عدّى البرنامج من غير ولا كلمة. لكن staticcheck (أداة فحص مشهورة، شغّلت نسخة 2025.1.1) مسكتها بفحص [[SA4023]]:

~~~text staticcheck ./...
main.go:31:15: this comparison is never true (SA4023)
    main.go:30:10: the lhs of the comparison is the 1st return value of this function call
    main.go:13:6: example.com/l8.validateBad never returns a nil interface value
~~~

يعني: [[err == nil]] في سطر 31 عمرها ما هتبقى true، لأن validateBad عمرها ما بترجّع interface فاضي. ([[lhs]] = left-hand side، الطرف الشمال من المقارنة.)

---

## الخلاصة

| الحالة | النوع جوّا | القيمة جوّا | [[== nil]] |
|---|---|---|---|
| [[return nil]] | فاضي | فاضي | true |
| [[return e]] و e بـ [[(*MyErr)(nil)]] | [[*MyErr]] | nil | **false** |
| [[return &MyErr{}]] | [[*MyErr]] | عنوان حقيقي | false |

- الدالة اللي بترجّع [[error]] ترجّع [[nil]] **صريحة** في النجاح، مش متغير من نوع خاص.
- [[go vet]] مش بيمسكها، و staticcheck (SA4023) بيمسكها.`,
          lines: [
            "باكدج main.",
            "imports.",
            "errors.",
            "fmt.",
            "قفلة.",
            "نوع error خاص.",
            R`[[*MyErr]] بيحقق error. method في سطر.`,
            R`نوع الراجع [[error]] (interface).`,
            R`متغير [[*MyErr]] قيمته nil.`,
            "لو فشل...",
            "...حط فيه قيمة.",
            "قفلة.",
            R`بيرجّع e حتى لو nil: الـ interface هيبقى فيه نوع.`,
            "قفلة.",
            "النسخة الصح.",
            "فشل...",
            "...رجّع error حقيقي.",
            "قفلة.",
            R`نجاح: [[nil]] صريحة.`,
            "قفلة.",
            "main.",
            "نجاح بالدالة الغلط.",
            "false!",
            R`النوع موجود ([[*main.MyErr]])، والقيمة nil (true).`,
            "النسخة الصح: true.",
            "متغير للـ As.",
            "errors.As لقى النوع: true.",
            "قفلة."
          ],
          sol: R`الناتج:
[[false]]
[[*main.MyErr true]]
[[true]]
[[true]]

[[if err != nil]] مع validateBad(true) بتطبع [[فيه error: my error]] رغم إن مفيش error. والحل تغيّر validateBad تبقى زي validateGood.

و [[s == nil]] مع [[(*time.Location)(nil)]] بتطلع false برضه: نفس الفكرة مع أي interface، مش error بس.`
        },
        {
          cmd: "generics",
          title: "generics: دالة أو نوع واحد لأكتر من نوع، بـ [T any] و constraints",
          desc: R`من Go 1.18 الدالة تقدر تاخد type parameters بين أقواس مربعة قبل الـ parameters العادية:
[[func MaxOf[T cmp.Ordered](items []T) T]]
T هنا «أي نوع يحقق cmp.Ordered» (أرقام ونصوص: أي حاجة ينفع معاها [[<]] و [[>]]). والـ compiler بيستنتج T من القيم: [[MaxOf([]float64{...})]] من غير ما تكتب [[MaxOf[float64]]].

الـ constraint (القيد) هو interface بيحدد الـ T يقدر يعمل إيه:
• [[any]]: أي نوع، بس مش هتقدر تعمل عليه غير حاجات عامة (تخزّن، ترجّع، تبعت).
• [[comparable]]: أي نوع ينفع معاه [[==]] و [[!=]] (مطلوب لمفاتيح الـ map).
• [[cmp.Ordered]]: الأرقام والنصوص.
• interface انت تعمله بقايمة أنواع: [[~int | ~int64 | ~float64]]. الـ [[|]] معناها «أو»، والـ [[~]] معناها «النوع ده أو أي نوع أساسه هو» (يعني [[type Money int64]] يدخل في [[~int64]]).

والأنواع كمان ممكن تبقى generic: [[type Stack[T any] struct { items []T }]]، وبتستخدمه [[Stack[string]]].

[[var zero T]] أسهل طريقة تجيب القيمة الصفرية لأي T (عشان ترجّعها لما مفيش قيمة).

المكتبة القياسية مليانة generics دلوقتي: [[slices]] و [[maps]] و [[cmp]] و [[sync.OnceValue]].`,
          example: R`package main

import (
  "cmp"
  "fmt"
)

func Map[T, U any](items []T, f func(T) U) []U {
  out := make([]U, 0, len(items))
  for _, it := range items {
    out = append(out, f(it))
  }
  return out
}

func MaxOf[T cmp.Ordered](items []T) T {
  best := items[0]
  for _, it := range items[1:] {
    if it > best {
      best = it
    }
  }
  return best
}

func Index[T comparable](items []T, target T) int {
  for i, it := range items {
    if it == target {
      return i
    }
  }
  return -1
}

type Number interface {
  ~int | ~int64 | ~float64
}

func Sum[T Number](nums ...T) T {
  var total T
  for _, n := range nums {
    total += n
  }
  return total
}

type Stack[T any] struct {
  items []T
}

func (s *Stack[T]) Push(v T) { s.items = append(s.items, v) }

func (s *Stack[T]) Pop() (T, bool) {
  var zero T
  if len(s.items) == 0 {
    return zero, false
  }
  v := s.items[len(s.items)-1]
  s.items = s.items[:len(s.items)-1]
  return v, true
}

func main() {
  squares := Map([]int{1, 2, 3}, func(n int) string { return fmt.Sprint(n * n) })
  fmt.Println(squares, len(squares[2]))
  fmt.Println(MaxOf([]float64{2.5, 9.1, 4}), MaxOf([]string{"b", "z", "a"}))
  fmt.Println(Index([]string{"go", "js"}, "js"), Sum(1.5, 2.5), Sum[int]())

  var s Stack[string]
  s.Push("a")
  s.Push("b")
  v, ok := s.Pop()
  fmt.Println(v, ok, len(s.items))
}`,
          try: R`اكتب [[Filter[T any](items []T, keep func(T) bool) []T]] وجرّبها تطلّع الأرقام الزوجية من [[[]int{1, 2, 3, 4}]] والكلمات اللي أطول من 2 من [[[]string{"go", "rust", "c"}]]. وبعدين جرّب [[MaxOf([]bool{true, false})]] واقرا الـ error.`,
          flag: "script",
          deep: {
            why: R`قبل generics كنت بتكتب نفس الدالة لـ int ولـ float64 ولـ string، أو تستخدم any وتخسر حماية الـ compiler وتعمل assertions. generics بتخليك تكتب الكود مرة، والـ compiler لسه بيمنعك تبعت نوع غلط.`,
            how: R`[[Map[T, U any]]]: نوعين، T للداخل و U للخارج. Go بتستنتجهم من الـ slice ومن الدالة اللي بعتها.

[[items[1:]]] من التاني للآخر. و MaxOf بتعمل panic على slice فاضية (زي [[slices.Max]]).

[[Sum[int]()]]: هنا لازم تكتب النوع لأن مفيش قيم يستنتج منها.

الـ methods على النوع الـ generic بتكتب [[(s *Stack[T])]]. بس الـ methods نفسها مينفعش ياخدوا type parameters جديدة غير بتاعة النوع.

[[fmt.Sprint(n * n)]] بيحوّل الرقم لنص (زي Println من غير طباعة).

جوه الـ generic الـ compiler بيسمحلك بس بالعمليات اللي الـ constraint بيضمنها: [[+=]] شغالة في Sum لأن كل أنواع Number بتدعم الجمع، لكن [[>]] مش هتشتغل على T any.`,
            when: R`دوال على collections (Map و Filter و GroupBy)، و data structures (Stack و Queue و Cache و Set)، و helpers زي [[Ptr[T any](v T) *T]]. لكن متعملش interface أو struct generic لأي حاجة: لو الكود بيشتغل بـ interface عادي بـ methods (زي io.Reader) خليه كده. القاعدة: لو لقيت نفسك بتكتب نفس الكود لأكتر من نوع، ساعتها generics.`,
            mistakes: R`تستخدم generics في كل حتة فالكود يبقى صعب القراية. و [[T any]] وانت محتاج [[==]] (لازم comparable). وتنسى [[~]] فالأنواع المعرّفة ([[type Money int64]]) متدخلش. ونوع غلط زي [[MaxOf([]bool{...})]] بيطلع [[bool does not satisfy cmp.Ordered]].`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

٤ دوال generic ([[Map]] و [[MaxOf]] و [[Index]] و [[Sum]]) كل واحدة مكتوبة مرة وبتشتغل مع أكتر من نوع، و struct generic اسمه [[Stack]]. وكل دالة بـ constraint مختلف. الناتج من [[go run .]] في [[golang:1.25]] على لينكس.

---

## ١. [[Map]]: نوعين

~~~go main.go
func Map[T, U any](items []T, f func(T) U) []U {
  out := make([]U, 0, len(items))
  for _, it := range items {
    out = append(out, f(it))
  }
  return out
}
~~~

### [[[T, U any]]]: الـ type parameters

- الأقواس المربعة بعد اسم الدالة فيها **أنواع** مش قيم. [[T]] و [[U]] أسامي لأنواع هتتحدد وقت النداء.
- [[any]] بعدهم هو الـ **constraint**: T و U ممكن يبقوا أي نوع. ([[T, U any]] اختصار [[T any, U any]].)

### الـ parameters

- [[items []T]]: slice من T.
- [[f func(T) U]]: دالة بتاخد T وترجّع U.
- [[[]U]]: الراجع slice من U.

### الجسم

- [[make([]U, 0, len(items))]]: slice طولها 0 بس حاجزة مكان ([[cap]]) لـ [[len(items)]] عنصر، فالـ append مش هتحتاج تكبّر.
- [[append(out, f(it))]]: طبّق f على كل عنصر وضيف النتيجة.

---

## ٢. [[MaxOf]]: [[cmp.Ordered]]

~~~go main.go
func MaxOf[T cmp.Ordered](items []T) T {
  best := items[0]
  for _, it := range items[1:] {
    if it > best {
      best = it
    }
  }
  return best
}
~~~

- [[cmp.Ordered]]: constraint من باكدج [[cmp]] معناه «أي نوع ينفع معاه [[<]] و [[>]]»: كل أنواع الأرقام والـ string.
- [[it > best]]: مسموحة **بسبب** الـ constraint. لو كان [[T any]] الـ compiler هيرفضها (تحت).
- [[items[0]]]: ابدأ بأول عنصر، و [[items[1:]]] = من التاني للآخر.
- لو الـ slice فاضية، [[items[0]]] بتعمل panic. جرّبت [[MaxOf([]int{})]]:

~~~text الناتج
panic: runtime error: index out of range [0] with length 0
~~~

---

## ٣. [[Index]]: [[comparable]]

~~~go main.go
func Index[T comparable](items []T, target T) int {
  for i, it := range items {
    if it == target {
      return i
    }
  }
  return -1
}
~~~

- [[comparable]]: constraint جاهز في اللغة: أي نوع ينفع معاه [[==]] و [[!=]].
- بترجّع مكان أول عنصر بيساوي target، أو [[-1]] لو مش موجود.

---

## ٤. [[Sum]]: constraint انت عامله

~~~go main.go
type Number interface {
  ~int | ~int64 | ~float64
}

func Sum[T Number](nums ...T) T {
  var total T
  for _, n := range nums {
    total += n
  }
  return total
}
~~~

### [[Number]]

interface مش فيه methods، فيه **قايمة أنواع**. ده بيتستخدم كـ constraint بس.

- [[|]] = «أو»: int أو int64 أو float64.
- [[~int64]]: «int64 **أو أي نوع أساسه int64**». يعني لو عندك [[type Money int64]] يدخل. جرّبت [[Sum(Money(150), Money(50))]] وطلع [[200]]. ومن غير [[~]] (يعني [[int | int64]]):

~~~text go run .
./main.go:18:22: Money does not satisfy Number (possibly missing ~ for int64 in Number)
~~~

### [[Sum]]

- [[nums ...T]]: variadic: أي عدد من القيم من نوع T، وجوه الدالة nums بتبقى [[[]T]].
- [[var total T]]: القيمة الصفرية لـ T (0 للأرقام). دي أسهل طريقة تجيب «صفر» لنوع مش عارفه.
- [[total += n]]: مسموحة لأن كل أنواع Number بتتجمع.

---

## ٥. [[Stack[T]]]: نوع generic

~~~go main.go
type Stack[T any] struct {
  items []T
}

func (s *Stack[T]) Push(v T) { s.items = append(s.items, v) }

func (s *Stack[T]) Pop() (T, bool) {
  var zero T
  if len(s.items) == 0 {
    return zero, false
  }
  v := s.items[len(s.items)-1]
  s.items = s.items[:len(s.items)-1]
  return v, true
}
~~~

- [[Stack[T any]]]: struct ليه type parameter. ومينفعش تستخدمه من غير ما تحدد T: [[Stack[string]]].
- [[(s *Stack[T])]]: الـ receiver لازم يكتب [[[T]]]، وبـ pointer لأن Push و Pop بيعدّلوا items.
- Stack = كومة: آخر حاجة دخلت أول حاجة تطلع.
- [[Pop]] بترجّع [[(T, bool)]]: القيمة، وهل كان فيه حاجة أصلًا. [[var zero T]] عشان نرجّع «صفر» لما الكومة فاضية.
- [[s.items[len(s.items)-1]]]: آخر عنصر. و [[s.items[:len(s.items)-1]]]: كل حاجة ما عدا الآخر.

جرّبت Pop ٢ مرات زيادة بعد المثال: [["a" true]] ثم [["" false]] (الـ string الصفري).

---

## ٦. main

~~~go main.go
  squares := Map([]int{1, 2, 3}, func(n int) string { return fmt.Sprint(n * n) })
  fmt.Println(squares, len(squares[2]))
~~~

- Go استنتجت لوحدها: T = int (من الـ slice) و U = string (من راجع الدالة).
- [[fmt.Sprint(n * n)]]: بيحوّل الرقم لنص.
- [[squares[2]]] = [["9"]]، وطوله 1.

~~~go main.go
  fmt.Println(MaxOf([]float64{2.5, 9.1, 4}), MaxOf([]string{"b", "z", "a"}))
  fmt.Println(Index([]string{"go", "js"}, "js"), Sum(1.5, 2.5), Sum[int]())
~~~

- نفس MaxOf مرة بـ float64 ومرة بـ string. والنصوص بتتقارن بالترتيب الأبجدي، فـ [["z"]].
- [[Index(...)]] = 1. و [[Sum(1.5, 2.5)]] = 4 (T = float64، و Println بتكتب 4 من غير [[.0]]).
- [[Sum[int]()]]: من غير قيم مفيش حاجة يستنتج منها، فلازم تكتب النوع. لو شلت [[[int]]]:

~~~text go run .
./main.go:75:18: in call to Sum, cannot infer T (declared at ./main.go:39:10)
~~~

~~~go main.go
  var s Stack[string]
  s.Push("a")
  s.Push("b")
  v, ok := s.Pop()
  fmt.Println(v, ok, len(s.items))
~~~

- [[var s Stack[string]]]: Stack فاضي من النصوص (الـ slice بـ nil وده تمام لـ append).
- [[s.Push]] على s مش [[&s]]؟ Go بتاخد العنوان لوحدها لما المتغير ينفع ياخد عنوان.
- Pop طلّعت [["b"]] (آخر واحد)، وفضل عنصر واحد.

~~~text الناتج
[1 4 9] 1
9.1 z
1 4 0
b true 1
~~~

---

## ٧. لما الـ constraint يمنعك

~~~go
func Bad[T any](a, b T) bool  { return a == b }
func Bad2[T any](a, b T) bool { return a > b }
~~~

~~~text go run .
./main.go:3:39: invalid operation: a == b (incomparable types in type set)
./main.go:4:40: invalid operation: a > b (type parameter T cannot use operator >)
~~~

و [[MaxOf([]bool{true, false})]]:

~~~text go run .
./main.go:74:20: bool does not satisfy cmp.Ordered (bool missing in ~int | ~int8 | ~int16 | ~int32 | ~int64 | ~uint | ~uint8 | ~uint16 | ~uint32 | ~uint64 | ~uintptr | ~float32 | ~float64 | ~string)
~~~

الرسالة دي بتوريك [[cmp.Ordered]] من جوه: قايمة أنواع بـ [[~]] زي Number بالظبط. وكل ده وقت الـ compile، قبل ما البرنامج يشتغل.

---

## ٨. الحل: [[Filter]]

~~~go solCode
func Filter[T any](items []T, keep func(T) bool) []T {
  var out []T
  for _, it := range items {
    if keep(it) {
      out = append(out, it)
    }
  }
  return out
}

evens := Filter([]int{1, 2, 3, 4}, func(n int) bool { return n%2 == 0 })
long := Filter([]string{"go", "rust", "c"}, func(s string) bool { return len(s) > 2 })
fmt.Println(evens, long)
~~~

- [[keep func(T) bool]]: دالة بتقول «خليه» (true) أو «ارميه».
- [[T any]] كفاية: Filter مش بتقارن ولا بتجمع، بتنادي keep بس.
- [[n%2 == 0]]: [[%]] باقي القسمة، والزوجي باقيه 0.
- آخر ٣ سطور جوه main.

~~~text الناتج
[2 4] [rust]
~~~

---

## الخلاصة

| الـ constraint | بيسمح بإيه |
|---|---|
| [[any]] | تخزّن وترجّع وتبعت بس |
| [[comparable]] | [[==]] و [[!=]] |
| [[cmp.Ordered]] | المقارنة بـ [[<]] و [[>]] (أرقام ونصوص) |
| interface بقايمة أنواع | العمليات المشتركة بين كل الأنواع اللي فيها |
| [[~T]] | T وأي نوع أساسه T |

- النوع بيتستنتج من الـ arguments، ولو مفيش arguments تكتبه: [[Sum[int]()]].
- [[var zero T]] = القيمة الصفرية لأي T.
- الـ compiler بيمنع النوع الغلط قبل التشغيل، وده الفرق عن any.`,
          lines: [
            "باكدج main.",
            "imports.",
            R`[[cmp]]: فيها cmp.Ordered و cmp.Compare.`,
            "fmt.",
            "قفلة.",
            R`نوعين: T للداخل و U للناتج، وبتاخد دالة من T لـ U.`,
            "slice بالمساحة الصح.",
            "لف.",
            "طبّق الدالة وضيف.",
            "قفلة.",
            "رجّع.",
            "قفلة.",
            R`T لازم يحقق [[cmp.Ordered]] (ينفع معاه >).`,
            "ابدأ بالأول.",
            "لف على الباقي.",
            R`[[>]] مسموحة بسبب الـ constraint.`,
            "خزّن الأكبر.",
            "قفلة.",
            "قفلة.",
            "رجّع.",
            "قفلة.",
            R`[[comparable]]: ينفع معاه ==.`,
            "لف.",
            "قارن.",
            "رجّع المكان.",
            "قفلة.",
            "قفلة.",
            "مش موجود.",
            "قفلة.",
            "constraint انت عامله: قايمة أنواع.",
            R`[[~]]: النوع أو أي نوع أساسه هو، و [[|]] أو.`,
            "قفلة.",
            "بتاخد أي عدد من أي Number.",
            R`القيمة الصفرية لـ T.`,
            "لف.",
            R`[[+=]] مسموحة: كل الأنواع دي بتتجمع.`,
            "قفلة.",
            "رجّع.",
            "قفلة.",
            R`نوع generic: [[Stack[T]]].`,
            "slice من T.",
            "قفلة.",
            "Push في سطر.",
            "Pop بترجّع القيمة و ok.",
            "القيمة الصفرية لـ T.",
            "لو فاضية...",
            "...رجّع الصفرية و false.",
            "قفلة.",
            "آخر عنصر.",
            "شيله.",
            "رجّعه.",
            "قفلة.",
            "main.",
            "T = int و U = string، اتستنتجوا لوحدهم.",
            R`[[[1 4 9]]]، و طول "9" = 1.`,
            "T = float64 ثم string.",
            "1، و 4، و 0 (النوع مكتوب لأن مفيش قيم).",
            "Stack من strings.",
            "حط a.",
            "حط b.",
            "طلّع آخر واحد.",
            "b true 1.",
            "قفلة."
          ],
          sol: R`الناتج:
[[[1 4 9] 1]]
[[9.1 z]]
[[1 4 0]]
[[b true 1]]

Filter (الكود تحت) بترجّع [[[2 4]]] و [[[rust]]]. و [[MaxOf([]bool{true, false})]] بيطلع:
[[bool does not satisfy cmp.Ordered (bool missing in ~int | ~int8 | ... | ~string)]]
(الرسالة الحقيقية فيها القايمة كلها). يعني الـ compiler منعك قبل التشغيل، وده الفرق عن any.`,
          solCode: R`func Filter[T any](items []T, keep func(T) bool) []T {
  var out []T
  for _, it := range items {
    if keep(it) {
      out = append(out, it)
    }
  }
  return out
}

evens := Filter([]int{1, 2, 3, 4}, func(n int) bool { return n%2 == 0 })
long := Filter([]string{"go", "rust", "c"}, func(s string) bool { return len(s) > 2 })
fmt.Println(evens, long)`
        }
      ]
    }
]);

// تاب Go (Golang)
// نفس شكل الدروس اللي في js.js (الشرح فوق الملف ده هناك). أمثلة Go هنا كود حقيقي بيتعمله compile:
// التعليقات فيه بـ // زي Go بالظبط، والـ indentation مسافتين (go fmt بيحوّلها tabs لما تحفظ).
// ولو محتاج backtick جوه R`...` (struct tags أو raw strings) اكتبه $__bt.

TAB("go", {
  label: "Go (Golang)",
  prompt: "$ ",
  lab: R`go version
mkdir -p lab/go/hello && cd lab/go/hello
go mod init example.com/hello
go run .`,
  labText: "اعمل فولدر lab/go، وجوّاه فولدر لكل تجربة فيه go mod init مرة واحدة وملف main.go، وشغّله بـ go run . ولو مش عايز تسطّب Go على جهازك، Docker كفاية: docker run --rm -it -v \"$PWD\":/src -w /src golang:1.25 go run .",
  levels: {
    "1": ["اللغة من الصفر", "التسطيب و go mod، والمتغيرات والأنواع والنص العربي، و for و switch والدوال، و slices و maps و structs والـ pointers، والأخطاء و defer والباكدجات"],
    "2": ["اللغة بجد والويب", "interfaces و generics، و goroutines و channels و select و Mutex و context، وسيرفر net/http بالـ routing و JSON و middleware، والـ HTTP client وقاعدة البيانات وهيكل المشروع"],
    "3": ["الإنتاج", "الاختبارات و httptest و benchmarks و fuzzing و pprof، و slog والإغلاق النضيف و Docker والـ cross-compile، و worker pools والفريموركات، وأسئلة الانترفيو ومشروع API كامل"]
  },
  categories: [
    {
      t: "البداية: التسطيب وأول برنامج",
      l: 1,
      n: "تسطّب Go، وتعمل module، وتشغّل وتبني أول برنامج، وتخلّي الأدوات تظبط الكود وتراجعه",
      items: [
        {
          cmd: "go version",
          title: "تسطّب Go وتتأكد إنها شغالة",
          desc: R`Go لغة compiled: الكود بيتحوّل لملف تنفيذي (binary) قبل ما يشتغل، مش بيتقري سطر سطر وقت التشغيل زي Python أو JavaScript. وكل الأدوات اللي هتحتاجها (الـ compiler، والـ formatter، والاختبارات، وتنزيل المكتبات) جاية في أمر واحد اسمه [[go]].

التسطيب:
• لينكس: نزّل الأرشيف من [[go.dev/dl]] وفكّه في [[/usr/local/go]]، وضيف [[/usr/local/go/bin]] للـ PATH. نسخة apt غالبًا قديمة.
• ماك: [[brew install go]] أو ملف الـ pkg من نفس الموقع.
• ويندوز: ملف الـ msi من نفس الموقع، أو جوه WSL زي لينكس بالظبط.
• من غير تسطيب خالص: [[docker run --rm golang:1.25 go version]].

[[go version]] بيقولك النسخة والنظام. و [[go env]] بيطبع إعدادات الأداة، وأهمها [[GOPATH]] (افتراضيًا [[~/go]]): فيه كاش المكتبات اللي بتنزل ([[~/go/pkg/mod]]) والبرامج اللي بتسطّبها بـ [[go install]] ([[~/go/bin]]).

Go بتطلع نسخة كبيرة كل ٦ شهور تقريبًا (فبراير وأغسطس). وفيه وعد اسمه Go 1 compatibility: الكود اللي اتكتب لـ Go 1.0 سنة 2012 لسه بيتعمله compile النهارده، فالترقية عادةً آمنة. الدروس هنا محتاجة Go 1.22 أو أحدث، والأمثلة اتجربت على 1.25.`,
          example: R`# لينكس: امسح أي نسخة قديمة وفك الأرشيف اللي نزّلته من go.dev/dl
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.25.1.linux-amd64.tar.gz
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> ~/.bashrc && source ~/.bashrc
go version
go env GOPATH GOOS GOARCH
go help`,
          try: R`سطّب Go (أو استخدم صورة Docker) واكتب [[go version]] و [[go env GOPATH GOOS GOARCH]]. وبعدين اكتب [[go help]]، اختار أمر مش عارفه، واقرا شرحه بـ [[go help <الأمر>]] (مثلًا [[go help mod]]).`,
          deep: {
            why: R`في لغات تانية بتسطّب compiler، وبعدين package manager، وبعدين formatter، وبعدين test runner، وكل فريق بيختار مجموعة مختلفة. في Go كل ده جوه [[go]] نفسه، فأي مشروع Go تفتحه هتلاقي نفس الأوامر: [[go build]] و [[go test]] و [[go fmt]]. وده من أسباب إن الشركات بتختارها للسيرفرات وأدوات الـ DevOps (Docker و Kubernetes و Terraform مكتوبين بيها).`,
            how: R`[[GOROOT]] هو مكان Go نفسها ([[/usr/local/go]])، ومش محتاج تغيّره. [[GOPATH]] مكان شغلك انت: الكاش والأدوات. زمان كان لازم كودك يبقى جوه GOPATH، من أيام go modules (Go 1.11) ده مبقاش مطلوب، والمشروع ممكن يبقى في أي فولدر.

[[GOOS]] و [[GOARCH]] النظام والمعالج اللي هتبني ليهم (زي [[linux]] و [[amd64]]). هترجعلهم في درس الـ cross-compile.

ولو فتحت مشروع مكتوب في go.mod بتاعه نسخة أحدث من اللي عندك، أداة go بتنزّل الـ toolchain المطلوبة لوحدها (ده الإعداد [[GOTOOLCHAIN=auto]]، من Go 1.21). فمش لازم تجري تحدّث كل ما مشروع يطلب نسخة جديدة.`,
            when: R`أول مرة على أي جهاز. وفي CI بتستخدم صورة [[golang:1.25]] أو [[actions/setup-go]] بنسخة محددة، وعلى السيرفر غالبًا مش محتاج Go أصلًا: بتنسخ الـ binary بس.`,
            mistakes: R`تنسى تضيف [[/usr/local/go/bin]] للـ PATH فيطلعلك [[go: command not found]]. وتفك الأرشيف فوق نسخة قديمة من غير [[rm -rf]] فتتخلط ملفات النسختين وتطلع errors غريبة (التوثيق الرسمي محذّر من ده بالاسم). وتسطّب من apt نسخة قديمة فحاجات زي [[for i := range 10]] متشتغلش (محتاجة 1.22).`
          },
          teach: R`## المثال بيعمل إيه؟

بيسطّب Go على لينكس من الأرشيف الرسمي، ويضيفها للـ PATH، وبعدين يسأل أداة [[go]] ٣ أسئلة: نسختك إيه؟ إعداداتك إيه؟ وعندك أوامر إيه؟ اتجرّب كله في [[docker run --rm ubuntu:24.04]] (أرشيف Go 1.25.14 الرسمي نفسه، منسوخ من صورة [[golang:1.25]])، والأوامر اللي بعد التسطيب اتجرّبت كمان في صورة [[golang:1.25]].

---

## ١. فك الأرشيف

~~~bash
sudo rm -rf /usr/local/go && sudo tar -C /usr/local -xzf go1.25.1.linux-amd64.tar.gz
~~~

ده أمرين مربوطين بـ [[&&]] (التاني يشتغل بس لو الأول نجح):

| الحتة | معناها |
|---|---|
| [[sudo]] | نفّذ بصلاحيات الـ root، لأن [[/usr/local]] ملك النظام |
| [[rm -rf /usr/local/go]] | امسح نسخة Go القديمة لو موجودة. [[-r]] الفولدر باللي جواه، و [[-f]] من غير ما تسأل ومن غير error لو مش موجود |
| [[tar]] | أداة الأرشيفات |
| [[-C /usr/local]] | ادخل الفولدر ده الأول وفك فيه (C = change directory) |
| [[-x]] | extract: فك |
| [[-z]] | الأرشيف مضغوط gzip (الـ [[.gz]] في الآخر) |
| [[-f اسم_الملف]] | الملف اللي هتفكه (f = file، ولازم ييجي بعده الاسم على طول) |

اسم الملف نفسه بيقول كل حاجة: [[go1.25.1]] النسخة، و [[linux]] النظام، و [[amd64]] نوع المعالج (Intel و AMD العاديين). الأرشيف جواه فولدر اسمه [[go]]، فبعد الفك بيبقى عندك [[/usr/local/go]]، وجواه [[bin/go]] (الأداة نفسها) و [[bin/gofmt]].

ليه [[rm -rf]] الأول؟ لو فكيت نسخة جديدة فوق قديمة، الملفات اللي اتشالت في النسخة الجديدة بتفضل موجودة من القديمة، وتطلع errors غريبة. التوثيق الرسمي بيقول كده صراحةً.

> في الـ container مكانش فيه [[sudo]] لأنك أصلًا root، فاتشغّل الأمر من غيرها.

---

## ٢. الـ PATH

قبل الخطوة دي، الأرشيف اتفك بس الشيل لسه مش عارف مكانه:

~~~text الناتج: go version قبل تعديل PATH (ubuntu:24.04)
bash: line 1: go: command not found
~~~

[[PATH]] متغير فيه قايمة فولدرات مفصولة بـ [[:]]، والشيل بيدوّر فيهم بالترتيب على أي أمر تكتبه. فلازم نضيف فولدر [[go]]:

~~~bash
echo 'export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin' >> ~/.bashrc && source ~/.bashrc
~~~

- [[echo '...']]: اطبع النص ده زي ما هو. العلامات المفردة [[' ']] بتمنع الشيل يفك [[$PATH]] دلوقتي، فبيتكتب في الملف حرفيًا ويتفك كل مرة الترمنال يفتح.
- [[export PATH=$PATH:...]]: القيمة الجديدة = القديمة ([[$PATH]]) + فولدرين. [[export]] بتخلي المتغير يوصل للبرامج اللي بتشغّلها.
- [[/usr/local/go/bin]]: فيه [[go]] و [[gofmt]].
- [[$HOME/go/bin]]: هنا بتنزل الأدوات اللي هتسطّبها بعدين بـ [[go install]] (زي [[staticcheck]]).
- [[>> ~/.bashrc]]: ضيف السطر في آخر الملف ده ([[>>]] تضيف، و [[>]] لوحدها كانت هتمسح الملف). [[.bashrc]] بيتنفّذ مع كل ترمنال bash جديد.
- [[source ~/.bashrc]]: نفّذ الملف دلوقتي في الترمنال ده، عشان متقفلوش وتفتحه.

آخر سطر في [[.bashrc]] بعدها:

~~~text الناتج: tail -1 ~/.bashrc
export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin
~~~

وفي ترمنال جديد [[echo $PATH]] بيطلع آخره [[:/usr/local/go/bin:/root/go/bin]] ([[/root]] لأن اليوزر في الـ container هو root).

> على zsh (الماك الافتراضي) الملف اسمه [[~/.zshrc]]. وعلى ويندوز الـ msi بيضيف الـ PATH لوحده، بس لازم تقفل الترمنال وتفتحه.

---

## ٣. [[go version]]

~~~text الناتج (ubuntu:24.04 بعد التسطيب)
go version go1.25.14 linux/amd64
~~~

٣ معلومات: النسخة ([[go1.25.14]]: النسخة الكبيرة 1.25، والتصليح رقم 14)، والنظام ([[linux]])، والمعالج ([[amd64]]). على ماك M1 أو أحدث هتلاقي [[darwin/arm64]] (darwin اسم نواة الماك)، وعلى ويندوز [[windows/amd64]] (من الـ docs).

---

## ٤. [[go env GOPATH GOOS GOARCH]]

[[go env]] لوحده بيطبع كل إعدادات الأداة (أكتر من ٤٠ سطر). لما تديله أسامي، بيطبع قيمهم بس، كل واحدة في سطر:

~~~text الناتج (ubuntu:24.04، يوزر root)
/root/go
linux
amd64
~~~

| الإعداد | معناه | القيمة |
|---|---|---|
| [[GOPATH]] | فولدر شغلك: كاش المكتبات ([[pkg/mod]]) والأدوات ([[bin]]) | [[$HOME/go]] افتراضيًا، فـ [[/root/go]] هنا و [[/home/ali/go]] عندك |
| [[GOOS]] | OS: النظام اللي هيتبني له | [[linux]] |
| [[GOARCH]] | ARCHitecture: المعالج | [[amd64]] |

وفي صورة [[golang:1.25]] نفس الأمر طلّع [[/go]] بدل [[/root/go]]، لأن الصورة نفسها محددة [[GOPATH=/go]]. يعني القيمة ممكن تتغير بمتغير بيئة، والافتراضي [[~/go]].

---

## ٥. [[go help]]

بيطبع كل أوامر go، كل واحد بسطر شرح. أول جزء من الناتج (golang:1.25):

~~~text الناتج: go help
Go is a tool for managing Go source code.

Usage:

	go <command> [arguments]

The commands are:

	bug         start a bug report
	build       compile packages and dependencies
	clean       remove object files and cached files
	doc         show documentation for package or symbol
	env         print Go environment information
	fix         update packages to use new APIs
	fmt         gofmt (reformat) package sources
	generate    generate Go files by processing source
	get         add dependencies to current module and install them
	install     compile and install packages and dependencies
	list        list packages or modules
	mod         module maintenance
	work        workspace maintenance
	run         compile and run Go program
	telemetry   manage telemetry data and settings
	test        test packages
	tool        run specified go tool
	version     print Go version
	vet         report likely mistakes in packages
~~~

اللي هتستخدمه كل يوم: [[run]] و [[build]] و [[mod]] و [[get]] و [[fmt]] و [[vet]] و [[test]]، وكل واحد ليه درس هنا. و [[go help mod]] بيفك أمر واحد لأوامره الفرعية:

~~~text الناتج: go help mod (جزء)
	download    download modules to local cache
	init        initialize new module in current directory
	tidy        add missing and remove unused modules
	why         explain why packages or modules are needed
~~~

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[rm -rf /usr/local/go && tar -C /usr/local -xzf ...]] | تسطيب نضيف (من غير خلط نسخ) |
| [[export PATH=$PATH:/usr/local/go/bin:$HOME/go/bin]] | الشيل يلاقي [[go]] والأدوات اللي هتسطّبها |
| [[go version]] | النسخة/النظام/المعالج |
| [[go env NAME...]] | قيم إعدادات معيّنة |
| [[go help]] / [[go help mod]] | قايمة الأوامر / شرح أمر |

- [[command not found]] بعد التسطيب = الـ PATH، مش التسطيب.
- [[GOROOT]] مكان Go نفسها ([[/usr/local/go]])، و [[GOPATH]] مكان شغلك ([[~/go]]). متخلطش بينهم.`,
          lines: [
            R`بيمسح نسخة Go القديمة لو موجودة، ويفك الأرشيف في [[/usr/local]] فيبقى عندك [[/usr/local/go]]. ([[&&]] معناها: نفّذ اللي بعدها بس لو اللي قبلها نجح.)`,
            R`بيضيف فولدر أمر go وفولدر الأدوات اللي هتسطّبها ([[~/go/bin]]) للـ PATH، في [[.bashrc]] عشان يفضل في كل ترمنال جديد.`,
            R`بيطبع النسخة والنظام والمعالج.`,
            R`بيطبع ٣ إعدادات بس من [[go env]] بدل القايمة كلها.`,
            R`قايمة كل أوامر go مع سطر شرح لكل واحد.`
          ],
          sol: R`[[go version]] بيطبع حاجة زي [[go version go1.25.1 linux/amd64]] (على ماك M1 أو أحدث: [[darwin/arm64]]، وعلى ويندوز [[windows/amd64]]).

و [[go env GOPATH GOOS GOARCH]] بيطبع ٣ سطور:
[[/home/you/go]]
[[linux]]
[[amd64]]

لو طلعلك [[command not found]] افتح ترمنال جديد (أو [[source ~/.bashrc]]) واتأكد إن [[/usr/local/go/bin]] في [[echo $PATH]].`
        },
        {
          cmd: "مقدمة Go وكتابة أول برنامج",
          title: "أول برنامج: package main و import و func main",
          desc: R`Go اتعملت في Google سنة 2009 (Robert Griesemer و Rob Pike و Ken Thompson) عشان مشكلة محددة: سيرفرات كبيرة، وفرق كبيرة، وكود الـ C++ بياخد وقت طويل في الـ compile وصعب يتقري. فالهدف كان لغة بسيطة (فيها 25 كلمة محجوزة بس)، الـ compile فيها سريع، وفيها أدوات للتزامن (concurrency) جوه اللغة نفسها. النتيجة لغة مملة بشكل مقصود: الكود بتاع أي حد شبه كود أي حد تاني.

أي برنامج Go بيبدأ كده:
• [[package main]]: كل ملف Go جزء من باكدج. الباكدج اللي اسمها [[main]] بالذات معناها «ده برنامج بيتشغّل»، مش مكتبة.
• [[import "fmt"]]: الباكدجات اللي الملف محتاجها. [[fmt]] للطباعة والتنسيق، و [[os]] للتعامل مع نظام التشغيل. ولو أكتر من واحدة بتتكتب جوه [[import ( ... )]].
• [[func main() { ... }]]: نقطة البداية. [[func]] كلمة تعريف الدالة، والأقواس [[()]] فيها الـ parameters (هنا مفيش)، والأقواس المعووجة [[{ }]] فيها جسم الدالة. البرنامج بيخلص لما main تخلص.

وجوه main:
• [[name := "يا عالم"]]: [[:=]] بتعرّف متغير جديد وتديله قيمة في خطوة واحدة، والنوع (هنا string) بيتستنتج من القيمة.
• [[os.Args]]: الكلام اللي كتبته بعد اسم البرنامج في الترمنال. [[os.Args[0]]] اسم البرنامج نفسه، فأول كلمة بعده في [[os.Args[1]]].
• [[fmt.Println]]: بيطبع القيم بمسافة بينها وسطر جديد في الآخر. الحرف الكبير في [[Println]] معناه إنها exported (متاحة بره باكدج fmt)، وده قانون في Go هتشوفه كتير.

مفيش [[;]] في آخر السطور: الـ compiler بيحطها لوحده. وعشان كده [[{]] لازم تيجي في نفس سطر [[func]] أو [[if]]، مش في سطر لوحدها.`,
          example: R`package main

import (
  "fmt"
  "os"
)

// البرنامج بيبدأ من main
func main() {
  name := "يا عالم"
  // لو كتبت اسم بعد البرنامج في الترمنال نستخدمه
  if len(os.Args) > 1 {
    name = os.Args[1]
  }
  fmt.Println("أهلًا", name)
}`,
          try: R`اعمل فولدر [[lab/go/hello]]، وجوّاه [[go mod init example.com/hello]]، واحفظ الكود في [[main.go]]. شغّله بـ [[go run .]] وبعدين بـ [[go run . سارة]]. وبعدين جرّب ٣ أخطاء واقرا رسالة الـ compiler في كل مرة: (١) انقل [[{]] بتاعة main لسطر لوحدها، (٢) ضيف [[import "strings"]] من غير ما تستخدمها، (٣) اكتب [[age := 30]] جوه main من غير ما تستخدمه.`,
          flag: "script",
          deep: {
            why: R`Go بقت لغة الـ cloud: Docker و Kubernetes و Terraform و Prometheus و Caddy مكتوبين بيها، وشركات كتير بتكتب بيها الـ backend والـ microservices. السبب مش إنها «أسرع لغة» (C و Rust و C++ أسرع في حاجات كتير)، السبب إنها توازن كويس: سريعة كفاية، والـ binary واحد سهل تنشره، والتزامن سهل، وأي مبرمج جديد يقرا الكود بسرعة.`,
            how: R`[[go run .]] بيعمل compile للباكدج اللي في الفولدر ده في مكان مؤقت ويشغّلها. الكلام اللي بعد [[.]] بيروح للبرنامج في [[os.Args]].

الـ compiler صارم في حاجتين هتقابلهم من أول يوم: import مش مستخدم ([["strings" imported and not used]]) ومتغير متعرّف ومش مستخدم ([[declared and not used: age]]) الاتنين errors مش تحذيرات. الفكرة إن الكود الميت ميتراكمش. وأداة [[goimports]] أو إضافة Go في VS Code بتضيف وتشيل الـ imports لوحدها وانت بتحفظ.

[[len(os.Args)]]: [[len]] دالة مبنية في اللغة بترجع الطول.`,
            when: "كل برنامج بيتشغّل (سيرفر، أداة CLI، worker) فيه package main و func main واحدة بس. المكتبات (اللي بتعملها import) بيبقى اسم الباكدج بتاعها حاجة تانية ومفيهاش main.",
            mistakes: R`تكتب [[{]] في سطر لوحدها زي C# أو Java فيطلعلك [[syntax error: unexpected semicolon or newline before {]]. وتسمّي الباكدج حاجة غير main وتحاول تشغّلها فيقولك [[package command-line-arguments is not a main package]] (مع [[go run main.go]])، أو [[package example.com/hello is not a main package]] (مع [[go run .]]: بيكتب اسم الـ module). وتستخدم [[go run main.go]] وانت عندك أكتر من ملف: هيشوف الملف ده بس، فاستخدم [[go run .]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيطبع «أهلًا يا عالم»، ولو كتبت اسم بعد البرنامج في الترمنال بيحيّيه هو. صغير، بس فيه الهيكل اللي كل برنامج Go هتكتبه هيبدأ بيه: [[package]] و [[import]] و [[func main]]. اتشغّل في [[docker run --rm golang:1.25]] (Go 1.25.14) بعد [[go mod init example.com/hello]].

---

## ١. [[package main]]

~~~go main.go
package main
~~~

- كل ملف [[.go]] لازم أول سطر فيه يقول هو تبع أنهي **package** (باكدج = مجموعة ملفات في نفس الفولدر بتتبني مع بعض).
- الاسم [[main]] مخصوص: معناه «الباكدج دي برنامج بيتشغّل، مش مكتبة». أي اسم تاني (زي [[hello]]) يبقى مكتبة تتعملها import.

جرّبت أغيّره لـ [[package hello]] وأشغّل:

~~~text الناتج: go run .
package example.com/hello is not a main package
~~~

و [[go run main.go]] بيقول نفس الكلام بس بالاسم [[command-line-arguments]]، وده الاسم اللي Go بتديه لملفات اديتهالها بالاسم.

---

## ٢. [[import]]

~~~go main.go
import (
  "fmt"
  "os"
)
~~~

- [[import]] بتقول الملف ده محتاج أنهي باكدجات. الاسم بين علامات تنصيص لأنه مسار.
- لما تبقى أكتر من واحدة بتتجمع جوه [[( )]]، واحدة في كل سطر. لو واحدة بس ينفع [[import "fmt"]] من غير أقواس.
- [[fmt]] (بتتنطق «فَمت»، اختصار format): الطباعة والتنسيق.
- [[os]] (operating system): التعامل مع النظام. هنا محتاجينها عشان [[os.Args]].

بعد كده بتستخدم أي حاجة منهم بـ [[اسم_الباكدج.الاسم]]: [[fmt.Println]] و [[os.Args]].

import مش مستخدمة = البرنامج مش بيتبني أصلًا. ضفت [[ "strings" ]] من غير استخدام:

~~~text الناتج: go run .
# example.com/hello
./main.go:6:3: "strings" imported and not used
~~~

[[6:3]] يعني سطر 6 عمود 3. والسطر الأول [[# example.com/hello]] اسم الباكدج اللي فيها الغلط.

---

## ٣. التعليقات

~~~go main.go
// البرنامج بيبدأ من main
~~~

[[//]] لحد آخر السطر تعليق، الـ compiler بيتجاهله. وفيه كمان [[/* ... */]] لأكتر من سطر.

---

## ٤. [[func main()]]

~~~go main.go
func main() {
  ...
}
~~~

- [[func]]: الكلمة اللي بتعرّف بيها دالة (function).
- [[main]]: اسمها. البرنامج بيبدأ منها، ولما تخلص البرنامج يخلص.
- [[()]]: مكان الـ parameters، وهنا مفيش. main عمرها ما بتاخد parameters ولا بترجّع قيمة في Go: الـ arguments بتيجي من [[os.Args]]، والـ exit code من [[os.Exit]].
- [[{ }]]: جسم الدالة.

### ليه [[{]] لازم في نفس السطر؟

Go مفيهاش [[;]] في آخر السطور لأن الـ compiler بيحطها لوحده بعد أي سطر بيخلص بكلمة أو [[)]] أو رقم. فلو كتبت:

~~~go
func main()
{
~~~

الـ compiler بيشوف [[func main();]] وبعدين [[{]] لوحدها، فيقول:

~~~text الناتج: go run .
./main.go:10:1: syntax error: unexpected semicolon or newline before {
~~~

---

## ٥. [[name := "يا عالم"]]

~~~go main.go
  name := "يا عالم"
~~~

- [[:=]]: «عرّف متغير جديد وحط فيه القيمة». النوع بيتستنتج من القيمة: هنا [[string]] (نص).
- النص بين [[" "]]، وعادي يبقى عربي: ملفات Go بتتقري UTF-8.

ومتغير معرّف ومش مستخدم = error برضه. ضفت [[age := 30]]:

~~~text الناتج: go run .
./main.go:11:3: declared and not used: age
~~~

---

## ٦. [[os.Args]] و [[if]]

~~~go main.go
  if len(os.Args) > 1 {
    name = os.Args[1]
  }
~~~

### [[os.Args]]

قايمة (slice) بكل الكلام اللي في سطر التشغيل، من نوع [[[]string]]. عشان أشوفها، عملت برنامج صغير بيطبع طولها ومحتواها بـ [[%q]]:

~~~text الناتج: go run . سارة
2
["/tmp/go-build2045422124/b001/exe/x" "سارة"]
~~~

- [[os.Args[0]]]: البرنامج نفسه. المسار ده مؤقت لأن [[go run]] بني البرنامج في فولدر مؤقت.
- [[os.Args[1]]]: أول كلمة بعده. الترقيم من 0.

### [[len(os.Args) > 1]]

[[len]] دالة مبنية في اللغة (مش محتاجة import) بترجّع الطول. الشرط معناه «فيه حاجة بعد اسم البرنامج». لازم نسأل الأول، لأن [[os.Args[1]]] على قايمة طولها 1 بتعمل **panic** (البرنامج يقع وقت التشغيل: index out of range).

### [[if]]

- مفيش أقواس حوالين الشرط زي C أو JavaScript، بس [[{ }]] إجبارية حتى لو سطر واحد.
- [[name = os.Args[1]]]: [[=]] لوحدها مش [[:=]]، لأن name موجود قبل كده واحنا بنغيّر قيمته بس.

---

## ٧. [[fmt.Println]]

~~~go main.go
  fmt.Println("أهلًا", name)
~~~

- [[Println]] = Print line: بتطبع القيم ومسافة بين كل اتنين وسطر جديد في الآخر.
- الحرف الكبير [[P]] مش صدفة: في Go أي اسم بيبدأ بحرف كبير يبقى **exported** (متاح بره الباكدج بتاعته). لو كانت [[println]] بحرف صغير مكانتش هتقدر تستخدمها من بره [[fmt]].

---

## ٨. التشغيل

~~~bash
go mod init example.com/hello
go run .
go run . سارة
go run . سارة أحمد
~~~

~~~text الناتج
go: creating new go.mod: module example.com/hello
go: to add module requirements and sums:
	go mod tidy
أهلًا يا عالم
أهلًا سارة
أهلًا سارة
~~~

- أول ٣ سطور من [[go mod init]] (درس [[go mod init]] الجاي).
- [[go run .]]: [[.]] = الباكدج اللي في الفولدر ده.
- آخر سطر: [[أحمد]] راحت [[os.Args[2]]]، والبرنامج مش بيبص غير على [[os.Args[1]]].

---

## الخلاصة

| الحتة | معناها |
|---|---|
| [[package main]] | ده برنامج بيتشغّل |
| [[import ( "fmt" "os" )]] | الباكدجات المطلوبة، ومينفعش واحدة زيادة |
| [[func main() {]] | البداية، و [[{]] في نفس السطر |
| [[:=]] / [[=]] | تعريف جديد / تغيير قيمة موجودة |
| [[os.Args[0]]] / [[os.Args[1]]] | البرنامج / أول argument |
| [[fmt.Println]] | اطبع بمسافات وسطر جديد |

- import أو متغير مش مستخدم = compile error، مش تحذير.
- حرف كبير في أول الاسم = exported.`,
          lines: [
            R`الملف ده جزء من الباكدج [[main]]: يعني برنامج بيتشغّل، مش مكتبة.`,
            R`بداية قايمة الـ imports بين قوسين.`,
            R`[[fmt]]: الطباعة والتنسيق.`,
            R`[[os]]: التعامل مع النظام، وهنا عشان [[os.Args]].`,
            "قفلة الـ imports.",
            R`تعريف دالة [[main]]: نقطة البداية. [[{]] لازم في نفس السطر.`,
            R`متغير جديد بـ [[:=]]، ونوعه string من القيمة.`,
            R`[[if]] من غير أقواس حوالين الشرط، بس [[{ }]] إجبارية. لو فيه كلمة بعد اسم البرنامج...`,
            R`...غيّر قيمة name بـ [[=]] (متغير موجود قبل كده، فمش [[:=]]).`,
            "قفلة الـ if.",
            "اطبع الترحيب: Println بتحط مسافة بين القيم وسطر جديد في الآخر.",
            "قفلة main: البرنامج بيخلص هنا."
          ],
          sol: R`[[go run .]] بيطبع [[أهلًا يا عالم]]، و [[go run . سارة]] بيطبع [[أهلًا سارة]].

والأخطاء التلاتة:
(١) [[{]] في سطر لوحدها: [[./main.go:10:1: syntax error: unexpected semicolon or newline before {]]. السبب إن الـ compiler حط [[;]] لوحده في آخر سطر [[func main()]].
(٢) [[./main.go:6:3: "strings" imported and not used]].
(٣) [[./main.go:10:3: declared and not used: age]].

الأرقام (السطر والعمود) هتختلف حسب مكان التعديل عندك. ولاحظ إن الـ compile بيقف، يعني البرنامج مش بيشتغل خالص لحد ما تصلّح.`
        },
        {
          cmd: "go mod init",
          title: "كل مشروع Go هو module: go.mod و go.sum",
          desc: R`الـ module هو المشروع: فولدر فيه ملف [[go.mod]] بيقول اسم المشروع ونسخة Go والمكتبات اللي محتاجها. أي فولدر تحته (من غير go.mod تاني) جزء من نفس الـ module.

[[go mod init example.com/hello]] بيعمل go.mod. الاسم ده اسمه module path، وهو اللي هيتكتب في أي import من المشروع. لو المشروع هيترفع على GitHub خليه [[github.com/اسمك/المشروع]] عشان الناس تقدر تعمله import. لو لعب محلي أي اسم يمشي.

[[go get github.com/google/uuid@latest]] بينزّل مكتبة ويسجّلها في go.mod. و [[go mod tidy]] أهم أمر فيهم: بيقرا الـ imports في كودك، يضيف الناقص، ويشيل اللي مبقاش مستخدم. اتعوّد تشغّله بعد ما تضيف أو تشيل import.

[[go.sum]] فيه hash (بصمة) لكل نسخة مكتبة نزلت. Go بتقارن بيه كل مرة، فلو حد غيّر محتوى نسخة بعد ما اتنشرت، البناء يقع بدل ما يسحب كود متغيّر. go.mod و go.sum الاتنين يترفعوا على git، ومحدش بيعدّل go.sum بإيده.`,
          example: R`mkdir hello && cd hello
go mod init example.com/hello
cat go.mod
go get github.com/google/uuid@latest
go mod tidy
go list -m all`,
          try: R`في فولدر جديد اعمل [[go mod init example.com/hello]]، واكتب main.go بيطبع [[uuid.NewString()]] (import [["github.com/google/uuid"]]). شغّله بـ [[go run .]] قبل ما تعمل أي حاجة تانية واقرا الـ error. بعدها [[go mod tidy]] وشغّل تاني، وافتح go.mod و go.sum وشوف اتغيّروا إزاي.`,
          deep: {
            why: R`قبل modules (Go 1.11، سنة 2018) كان كل الكود لازم يبقى جوه فولدر واحد اسمه GOPATH، ومكانش فيه طريقة رسمية تقول «المشروع ده محتاج نسخة كذا من المكتبة». go.mod حل ده: كل مشروع بيحدد نسخه، والبناء بيطلع نفس النتيجة على أي جهاز.`,
            how: R`go.mod بيبقى فيه سطر [[module]] (الاسم)، وسطر [[go 1.25.14]] (أقل نسخة Go المشروع محتاجها، و go mod init بيكتب نسختك)، وبلوك [[require]] بالمكتبات ونسخها. المكتبات اللي مكتبتك بتحتاجها (مش انت مباشرة) بيتكتب جنبها [[// indirect]].

Go بتستخدم طريقة اسمها Minimal Version Selection: بتختار أقل نسخة بتحقق كل المتطلبات، مش آخر نسخة نزلت. فلو محدش غيّر go.mod، البناء النهارده زي البناء بعد سنة، من غير lock file منفصل زي package-lock.

المكتبات بتنزل من [[proxy.golang.org]] (كاش عام)، والبصمات بتتراجع على [[sum.golang.org]]. ولو المكتبة وصلت v2 أو أكتر، رقم النسخة بيبقى جزء من المسار: [[github.com/jackc/pgx/v5]].

[[go list -m all]] بيعرض كل المكتبات اللي داخلة في البناء بنسخها. و [[go mod why <مكتبة>]] بيقولك مين جايبها.`,
            when: R`مرة واحدة في أول المشروع ([[go mod init]])، و [[go get]] لما تضيف مكتبة أو تحدّثها ([[go get -u ./...]] تحدّث الكل)، و [[go mod tidy]] قبل كل commit فيه تغيير في الـ imports.`,
            mistakes: R`تعمل [[go mod init]] في فولدر الـ home أو فولدر فوق المشروع فكل حاجة تحته تبقى module واحد. وتنسى [[go mod tidy]] فالـ CI يقع بـ [[missing go.sum entry]]. وتعدّل go.sum بإيدك أو تحطه في [[.gitignore]]. وتكتب import بمسار مش مطابق للـ module path (تكتب [[hello/internal/x]] والـ module اسمه [[example.com/hello]]).`
          },
          teach: R`## المثال بيعمل إيه؟

بيعمل مشروع (module) جديد، ويضيف له مكتبة من النت، وبعدين يرتّب ملف المكتبات ويعرضها. كل الأوامر اتشغّلت في [[docker run --rm golang:1.25]] (Go 1.25.14)، والناتج تحت كل خطوة حقيقي. وفي الآخر هنشوف حاجة مهمة: [[go mod tidy]] في المثال ده **بيشيل** المكتبة اللي لسه ضايفينها، وليه ده الصح.

---

## ١. [[mkdir hello && cd hello]]

[[mkdir]] (make directory) يعمل فولدر، و [[cd]] (change directory) يدخله. [[&&]]: الأمر التاني بس لو الأول نجح. الـ module = فولدر فيه [[go.mod]]، فلازم فولدر للمشروع الأول.

---

## ٢. [[go mod init example.com/hello]]

~~~text الناتج
go: creating new go.mod: module example.com/hello
~~~

- [[go mod]]: مجموعة أوامر إدارة الـ modules، و [[init]] (initialize) أولهم: اعمل [[go.mod]] في الفولدر ده.
- [[example.com/hello]]: الـ **module path**، يعني اسم المشروع. شكله زي عنوان موقع لأن Go بتستخدمه كمان عشان تلاقي الكود على النت. [[example.com]] دومين محجوز للأمثلة، فمش هيتلخبط مع حاجة حقيقية. لو هترفعه على GitHub اكتب [[github.com/اسمك/hello]].

---

## ٣. [[cat go.mod]]

[[cat]] يطبع محتوى الملف:

~~~text go.mod
module example.com/hello

go 1.25.14
~~~

| السطر | معناه |
|---|---|
| [[module example.com/hello]] | اسم المشروع. أي import لباكدج جوه المشروع بيبدأ بيه: [[example.com/hello/internal/db]] |
| [[go 1.25.14]] | أقل نسخة Go المشروع محتاجها. [[init]] بيكتب نسختك انت |

---

## ٤. [[go get github.com/google/uuid@latest]]

~~~text الناتج
go: downloading github.com/google/uuid v1.6.0
go: added github.com/google/uuid v1.6.0
~~~

- [[go get]]: نزّل مكتبة وسجّلها في go.mod.
- [[github.com/google/uuid]]: الـ module path بتاع المكتبة (مكتبة جوجل لعمل UUID، يعني ID عشوائي فريد زي [[de8db9f9-2d5d-41e2-99b7-2a35c247abfb]]).
- [[@latest]]: آخر نسخة منشورة. ممكن تكتب نسخة محددة [[@v1.6.0]].
- [[v1.6.0]]: نظام الترقيم اسمه semantic versioning: [[v<major>.<minor>.<patch>]]. الـ major بيتغير لما فيه تغيير بيكسر الكود القديم.

المكتبة نزلت فين؟ في كاش الـ modules، مش جوه مشروعك:

~~~text الناتج: ls /go/pkg/mod/github.com/google/
uuid@v1.6.0
~~~

([[/go]] لأن ده الـ GOPATH في صورة Docker، وعندك هيبقى [[~/go/pkg/mod]].) ومحتوى go.mod بقى:

~~~text go.mod بعد go get
module example.com/hello

go 1.25.14

require github.com/google/uuid v1.6.0 // indirect
~~~

- [[require]]: «المشروع محتاج المكتبة دي بالنسخة دي أو أحدث».
- [[// indirect]]: Go شايفة إن مفيش ملف في المشروع بيعمل import ليها مباشرة. وده صح: لسه مكتبناش ولا ملف [[.go]].

---

## ٥. [[go mod tidy]]

[[tidy]] = رتّب. بيقرا كل الـ imports في ملفات [[.go]] بتاعتك، ويخلّي go.mod و go.sum مطابقين ليها بالظبط: يضيف الناقص ويشيل الزيادة. في المثال زي ما هو (من غير أي ملف كود):

~~~text الناتج
go: warning: "all" matched no packages
~~~

~~~text go.mod بعد tidy
module example.com/hello

go 1.25.14
~~~

المكتبة **اتشالت**، لأن مفيش كود بيستخدمها. والتحذير معناه إن الفولدر مفيهوش ولا باكدج Go أصلًا. فـ [[go get]] لوحده مش كفاية: المكتبة لازم تتستخدم في import.

---

## ٦. [[go list -m all]]

- [[go list]]: اعرض باكدجات. [[-m]]: modules مش باكدجات. [[all]]: كل اللي داخل في البناء.

~~~text الناتج (من غير كود)
example.com/hello
~~~

أول سطر دايمًا مشروعك نفسه (من غير نسخة لأنه مش منشور).

---

## ٧. نفس الكلام بالترتيب الصح (الـ try و solCode)

~~~go main.go
package main

import (
  "fmt"

  "github.com/google/uuid"
)

func main() {
  fmt.Println(uuid.NewString())
}
~~~

- الـ imports في مجموعتين بينهم سطر فاضي: المكتبة القياسية ([[fmt]]) فوق، والمكتبات الخارجية تحت. ده عُرف [[goimports]].
- [[uuid.NewString()]]: الباكدج اسمها [[uuid]] (آخر جزء في المسار)، و [[NewString]] بترجّع UUID جديد كنص.

### تشغيل قبل tidy

~~~text الناتج: go run .
main.go:6:3: no required module provides package github.com/google/uuid; to add it:
	go get github.com/google/uuid
~~~

الكود بيعمل import لمكتبة go.mod مش عارفها، و Go مش بتنزّل حاجة من ورا ضهرك أثناء البناء. ([[6:3]]: سطر 6 عمود 3. في ملف متظبط بـ gofmt (tab بدل مسافتين) العمود هيبقى 2.)

### [[go mod tidy]]

~~~text الناتج
go: finding module for package github.com/google/uuid
go: found github.com/google/uuid in github.com/google/uuid v1.6.0
~~~

~~~text go.mod
module example.com/hello

go 1.25.14

require github.com/google/uuid v1.6.0
~~~

المرة دي من غير [[// indirect]]، لأن main.go بيستخدمها مباشرة.

### [[go.sum]]

~~~text go.sum
github.com/google/uuid v1.6.0 h1:NIvaJDMOsjHA8n1jAhLSgzrAzy1Hgr+hNrb57e+94F0=
github.com/google/uuid v1.6.0/go.mod h1:TIyPZe4MgqvfeYDBFedMoGGpEw/LqOeaOT+nhxU+yHo=
~~~

- كل سطر: المكتبة، والنسخة، و hash (بصمة) للمحتوى.
- [[h1:]]: نوع البصمة (SHA-256 مكتوب base64).
- السطر الأول بصمة كود المكتبة كله، والتاني ([[/go.mod]]) بصمة ملف go.mod بتاعها بس، لأن Go أحيانًا محتاجة تقرا go.mod بتاع نسخة من غير ما تنزّل الكود كله.
- لو حد غيّر محتوى [[v1.6.0]] على النت، البصمة مش هتطابق والبناء يقف.

### التشغيل وعرض المكتبات

~~~text الناتج: go run . (مرتين)
de8db9f9-2d5d-41e2-99b7-2a35c247abfb
237564e4-b5a2-4fb2-b374-8a3928698389
~~~

~~~text الناتج: go list -m all
example.com/hello
github.com/google/uuid v1.6.0
~~~

~~~text الناتج: go mod why github.com/google/uuid
# github.com/google/uuid
example.com/hello
github.com/google/uuid
~~~

[[go mod why]] بيرسم السلسلة: مشروعك بيعمل import للمكتبة مباشرة.

---

## الخلاصة

| الأمر | بيعمل إيه | بيغيّر |
|---|---|---|
| [[go mod init <path>]] | مشروع جديد | بيعمل go.mod |
| [[go get <mod>@latest]] | ينزّل ويسجّل نسخة | go.mod و go.sum |
| [[go mod tidy]] | يطابق الملفين مع الـ imports | يضيف ويشيل |
| [[go list -m all]] | كل الـ modules في البناء | لا |
| [[go mod why <mod>]] | مين جايب المكتبة | لا |

- اكتب الـ import الأول وبعدين [[go mod tidy]]: أسهل طريقة.
- مكتبة مش مستخدمة في أي import بتتشال مع tidy، حتى لو لسه عامل لها go get.
- go.mod و go.sum الاتنين على git، ومحدش يعدّل go.sum بإيده.`,
          lines: [
            R`فولدر جديد للمشروع وتدخله.`,
            R`بيعمل go.mod باسم الـ module.`,
            R`تشوف محتواه: سطر [[module]] وسطر [[go]] بالنسخة.`,
            R`بينزّل مكتبة uuid ويسجّلها في go.mod (ولسه محدش بيستخدمها، فهتتعلّم [[// indirect]]).`,
            R`بيرتّب go.mod و go.sum على حسب الـ imports الحقيقية في الكود (ولو لسه مفيش ملف .go بيعمل import لـ uuid، هيشيلها).`,
            "كل الـ modules الداخلة في البناء بنسخها."
          ],
          sol: R`[[go run .]] قبل tidy بيقول:
[[main.go:6:3: no required module provides package github.com/google/uuid; to add it:]]
[[	go get github.com/google/uuid]]

بعد [[go mod tidy]] الـ go.mod بيبقى كده (النسخ ممكن تبقى أحدث عندك):
[[module example.com/hello]]
[[go 1.25.14]] (نسخة Go اللي عملت بيها init)
[[require github.com/google/uuid v1.6.0]]

و go.sum فيه سطرين للمكتبة: واحد لمحتواها كله وواحد لملف go.mod بتاعها ([[/go.mod]] في آخره). و [[go run .]] بيطبع UUID جديد كل مرة زي [[3f2b8c1e-9a4d-4c6b-8e7f-2d1a0b9c8e7f]].`,
          solCode: R`package main

import (
  "fmt"

  "github.com/google/uuid"
)

func main() {
  fmt.Println(uuid.NewString())
}`
        },
        {
          cmd: "go run و go build",
          title: "go run للتجربة، و go build للملف اللي هتشغّله على السيرفر",
          desc: R`[[go run .]] بيعمل compile ويشغّل من غير ما يسيب ملف تنفيذي في فولدرك (الملف بيتعمل في فولدر مؤقت، ومن Go 1.24 بيتحفظ في الـ build cache فالتشغيل التاني أسرع). مناسب وانت بتكتب وبتجرّب. النقطة [[.]] معناها «الباكدج اللي في الفولدر ده» (كل ملفات .go فيه)، وده أحسن من [[go run main.go]] لأن الأخيرة بتشوف ملف واحد بس.

[[go build -o app .]] بيطلع ملف تنفيذي اسمه app. الملف ده لوحده كفاية: مش محتاج Go على السيرفر، ولا node_modules، ولا runtime متسطب. بتنسخه وتشغّله. ده من أكبر أسباب انتشار Go في أدوات السيرفرات والـ CLI.

[[go install]] بيبني ويحط الملف في [[~/go/bin]]، ومع [[@latest]] بيسطّب أدوات من النت مباشرة.

و [[-ldflags="-s -w"]] بيشيل معلومات الـ debug من الملف فيصغر حجمه (بس الـ stack traces بتفضل شغالة). و [[-X]] جوه ldflags بيحط قيمة في متغير وقت البناء، زي رقم النسخة.`,
          example: R`go run .
go run . --port 9090
go build -o app .
./app
ls -lh app
go build -ldflags="-s -w -X main.version=1.0.0" -o app .
go install golang.org/x/tools/cmd/goimports@latest`,
          try: R`اعمل برنامج بيطبع [[os.Args]] وفيه [[var version = "dev"]] بيطبعه برضه. جرّب [[go run . a b c]]، وبعدين [[go build -o app .]] وشغّل [[./app a b]]، وبعدين ابنيه بـ [[-ldflags="-s -w -X main.version=1.0.0"]] وقارن الحجم بـ [[ls -lh]] وشوف version اتغيّرت.`,
          deep: {
            why: R`في Node أو Python النشر معناه تنقل الكود وتسطّب runtime ومكتبات على السيرفر. في Go بتنقل ملف واحد. ده بيبسّط Docker (صورة فيها الملف بس)، وبيخلي أدوات CLI زي [[gh]] و [[kubectl]] و [[terraform]] تتوزّع كملف واحد تنزّله وتشغّله.`,
            how: R`الـ compile في Go سريع نسبيًا لأن اللغة متصممة عشان كده: مفيش header files، والـ imports اللي مش مستخدمة ممنوعة، وكل باكدج بتتبني مرة وتتحفظ في build cache ([[go env GOCACHE]]). فالمرة التانية بتبني اللي اتغيّر بس.

الـ binary فيه الـ runtime بتاع Go (الـ garbage collector والـ scheduler بتاع الـ goroutines)، عشان كده hello world حجمه حوالي ٢ ميجا مش كام كيلو زي C.

الكلام اللي بعد [[go run .]] بيروح للبرنامج مش لأداة go، فـ [[--port 9090]] هتلاقيها في [[os.Args]] (أو تقراها بالباكدج [[flag]]).`,
            when: R`[[go run]] وانت بتطوّر. [[go build]] للنشر وفي Dockerfile وفي CI. [[go install pkg@version]] لتسطيب أدوات (linters، مولّدات كود).`,
            mistakes: R`ترفع الـ binary على git: حطه في [[.gitignore]]. وتبني على ماك وتنسخ الملف لسيرفر لينكس فيطلع [[exec format error]] (الحل في درس [[GOOS و GOARCH]]). وتستخدم [[go run main.go]] في مشروع فيه أكتر من ملف فيطلع [[undefined: helper]] رغم إن الدالة موجودة في ملف تاني. وجوه صورة [[golang:1.25]] الإعداد [[GOTOOLCHAIN=local]]، فـ [[go install golang.org/x/tools/cmd/goimports@latest]] بيقع بـ [[requires go >= 1.26.0]] لأن آخر نسخة من الأداة محتاجة Go أحدث: على جهازك (الإعداد [[auto]]) go بتنزّل الـ toolchain المطلوبة لوحدها، وفي الصورة استخدم صورة أحدث أو [[GOTOOLCHAIN=auto]].`
          },
          teach: R`## المثال بيعمل إيه؟

بيشغّل نفس البرنامج بطريقتين: [[go run]] (جرّب على طول) و [[go build]] (اطلع بملف تنفيذي تاخده معاك)، وبعدين يصغّر الملف ويحط فيه رقم نسخة وقت البناء، ويسطّب أداة من النت. البرنامج المستخدم هو الـ solCode:

~~~go main.go
package main

import (
  "fmt"
  "os"
)

var version = "dev"

func main() {
  fmt.Println(os.Args, version)
}
~~~

- [[var version = "dev"]]: متغير على مستوى الباكدج (بره main)، قيمته الافتراضية [["dev"]]. هنغيّرها وقت البناء من غير ما نلمس الكود.
- [[fmt.Println(os.Args, version)]]: اطبع قايمة الـ arguments كلها، وبعدها النسخة.

اتشغّل كله في [[docker run --rm golang:1.25]] (Go 1.25.14، لينكس amd64).

---

## ١. [[go run .]]

~~~text الناتج: go run . (أول مرة)
[/tmp/go-build1236943464/b001/exe/hello] dev
~~~

- [[go run]] = compile + تشغيل في خطوة واحدة.
- [[.]]: الباكدج اللي في الفولدر الحالي، يعني **كل** ملفات [[.go]] فيه.
- الأقواس [[[ ]]] دي طريقة Println في طباعة slice. وجواها عنصر واحد: [[os.Args[0]]]، مسار الملف التنفيذي اللي go run عمله في فولدر مؤقت تحت [[/tmp]]. واسمه [[hello]] من آخر جزء في اسم الـ module.

### ليه [[go run .]] مش [[go run main.go]]؟

عملت مشروع فيه ملفين: [[main.go]] بينادي [[helper()]]، و [[util.go]] فيه الدالة:

~~~text الناتج: go run main.go
# command-line-arguments
./main.go:2:14: undefined: helper
~~~

~~~text الناتج: go run .
helper
~~~

لما تدي اسم ملف، Go بتبني الملف ده **بس** (وتسمّيه [[command-line-arguments]])، فمش شايفة [[util.go]].

---

## ٢. [[go run . --port 9090]]

~~~text الناتج
[/root/.cache/go-build/f0/f0d4a2fc...-d/hello --port 9090] dev
~~~

- أي حاجة بعد [[.]] بتروح لبرنامجك، مش لأداة go. فـ [[--port]] و [[9090]] بقوا [[os.Args[1]]] و [[os.Args[2]]]. (عشان تفهمهم كـ flags بجد بتستخدم الباكدج [[flag]].)
- لاحظ المسار اتغيّر: المرة دي من [[~/.cache/go-build]]، يعني الـ **build cache** ([[go env GOCACHE]] طلّعت [[/root/.cache/go-build]]). من Go 1.24، [[go run]] بيحفظ الملف التنفيذي هناك، فلو الكود متغيّرش المرة الجاية مش بيعمل compile تاني.

---

## ٣. [[go build -o app .]]

- [[build]]: compile بس، من غير تشغيل، والناتج ملف بيفضل.
- [[-o app]]: o = output، اسم الملف الناتج. من غيرها الاسم بيبقى آخر جزء في اسم الـ module ([[hello]]).
- [[.]]: نفس الباكدج.

مفيش ناتج على الشاشة لو نجح. Go مش بتطبع «تم» (أسلوب أدوات يونكس: السكوت = نجاح).

---

## ٤. [[./app]]

~~~text الناتج
[./app] dev
~~~

~~~text الناتج: ./app a b
[./app a b] dev
~~~

- [[./]]: «من الفولدر الحالي». الشيل مش بيدوّر في الفولدر الحالي لوحده (مش في الـ PATH)، فلازم تقوله.
- [[os.Args[0]]] بقى [[./app]]: بالظبط اللي كتبته.
- الملف ده شغال من غير Go خالص: تنسخه لأي سيرفر لينكس amd64 ويشتغل.

---

## ٥. [[ls -lh app]]

~~~text الناتج
-rwxr-xr-x 1 root root 2.2M Oct  7 16:14 app
~~~

- [[ls -l]]: تفاصيل، و [[-h]] (human) الحجم بـ K و M.
- [[-rwxr-xr-x]]: الـ [[x]] معناها الملف قابل للتنفيذ.
- **2.2M** لبرنامج سطرين؟ لأن الملف جواه الـ Go runtime كله: الـ garbage collector (اللي بيفضّي الذاكرة لوحده)، والـ scheduler بتاع الـ goroutines، وباكدج [[fmt]] وكل اللي بتعتمد عليه. التمن ده بتدفعه مرة، والمكسب إنه مش محتاج حاجة متسطّبة.

---

## ٦. [[go build -ldflags="-s -w -X main.version=1.0.0" -o app .]]

[[-ldflags]] = flags للـ **linker** (المرحلة الأخيرة في البناء، اللي بتجمّع كل الكود في ملف واحد). الكلام اللي بين [[" "]] كله بيروح له:

| الحتة | معناها |
|---|---|
| [[-s]] | شيل جدول الرموز (symbol table) |
| [[-w]] | شيل معلومات الـ debug (DWARF، اللي بيستخدمها debugger زي [[dlv]]) |
| [[-X main.version=1.0.0]] | حط القيمة [[1.0.0]] في المتغير [[version]] اللي في باكدج [[main]] |

~~~text الناتج: ./app ثم ls -lh app
[./app] 1.0.0
-rwxr-xr-x 1 root root 1.5M Oct  7 16:14 app
~~~

- الحجم نزل من 2.2M لـ 1.5M (1499320 بايت بالظبط)، حوالي الثلث.
- الـ panic لسه بيطبع أسماء الدوال وأرقام السطور، لأن Go بتحفظهم في جدول تاني منفصل عن اللي اتشال.
- [[version]] بقت [[1.0.0]] من غير ما نعدّل الكود. في الـ CI بيتكتب حاجة زي [[-X main.version=$(git describe --tags)]].

### شرط [[-X]]

غيّرت السطر لـ [[const version = "dev"]] وبنيت بنفس الـ flag:

~~~text الناتج: ./app2
[./app2] dev
~~~

مفيش error ولا تحذير، والقيمة متغيرتش. [[-X]] بيشتغل على [[var]] من نوع string على مستوى الباكدج بس.

---

## ٧. [[go install golang.org/x/tools/cmd/goimports@latest]]

- [[go install]]: ابني وحط الملف في [[$GOPATH/bin]] (يعني [[~/go/bin]]، اللي ضفناه للـ PATH في درس [[go version]]).
- [[golang.org/x/tools/cmd/goimports]]: مسار الباكدج (فيها [[package main]]). [[x]] = مكتبات رسمية من فريق Go بس بره المكتبة القياسية.
- [[@latest]]: آخر نسخة. مع [[@]] الأمر بيشتغل في أي فولدر ومش بيلمس go.mod بتاعك.

في صورة Docker الأمر وقع:

~~~text الناتج (golang:1.25، GOTOOLCHAIN=local)
go: downloading golang.org/x/tools v0.51.0
go: golang.org/x/tools/cmd/goimports@latest: golang.org/x/tools@v0.51.0 requires go >= 1.26.0 (running go 1.25.14; GOTOOLCHAIN=local)
~~~

آخر نسخة من الأداة محتاجة Go 1.26. الصورة مظبوطة على [[GOTOOLCHAIN=local]] («استخدم اللي عندك بس»). على جهاز عادي الإعداد [[auto]]، فجربته بـ [[GOTOOLCHAIN=auto]]:

~~~text الناتج
go: golang.org/x/tools@v0.51.0 requires go >= 1.26.0; switching to go1.26.8
go: downloading go1.26.8 (linux/amd64)
...
~~~

go نزّلت Go 1.26.8 لوحدها وبنت بيها، و [[ls -lh /go/bin]] طلّع [[goimports]] بحجم 7.8M.

---

## ٨. ملف لينكس على نظام تاني

بنيت نفس البرنامج لماك ([[GOOS=darwin]]) وجربت أشغّله على لينكس:

~~~text الناتج
bash: line 36: ./mac: cannot execute binary file: Exec format error
~~~

الملف التنفيذي خاص بنظام ومعالج. ده موضوع درس [[GOOS و GOARCH]].

---

## الخلاصة

| الأمر | بيعمل إيه | الناتج |
|---|---|---|
| [[go run .]] | compile وتشغيل | مفيش ملف في فولدرك (بيتحفظ في الكاش) |
| [[go run . a b]] | نفس الكلام | [[a b]] في [[os.Args]] |
| [[go build -o app .]] | compile بس | ملف [[app]] (2.2M) |
| [[-ldflags="-s -w"]] | من غير رموز ولا debug | 1.5M |
| [[-X main.version=1.0.0]] | يغيّر [[var]] string وقت البناء | من غير لمس الكود |
| [[go install pkg@latest]] | يبني أداة | في [[~/go/bin]] |

- استخدم [[.]] مش اسم ملف.
- [[-X]] مع [[const]] بيسكت ومش بيعمل حاجة.
- الـ binary مش محتاج Go على السيرفر، بس لازم يتبني لنفس النظام والمعالج.`,
          lines: [
            "compile وتشغيل الباكدج اللي في الفولدر ده، من غير ما يسيب ملف.",
            R`نفس الكلام، و [[--port 9090]] بتروح للبرنامج في [[os.Args]].`,
            R`بناء ملف تنفيذي اسمه app ([[-o]] اسم الناتج).`,
            "تشغيله مباشرة: مش محتاج go خالص.",
            "حجمه.",
            R`بناء أصغر من غير معلومات debug، و [[-X]] بيحط 1.0.0 في متغير version بتاع باكدج main.`,
            R`بيبني الأداة ويحطها في [[~/go/bin]].`
          ],
          sol: R`[[go run . a b c]] بيطبع حاجة زي [[[/tmp/go-build1234/b001/exe/hello a b c] dev]]: أول عنصر مسار الملف اللي go run بناه: أول مرة في فولدر مؤقت، وبعد كده من الـ build cache (زي [[/root/.cache/go-build/f0/...-d/hello]]). و [[./app a b]] بيطبع [[[./app a b] dev]].

الحجم: hello world عادي حوالي 2.2M، ومع [[-s -w]] حوالي 1.5M. وبعد [[-X main.version=1.0.0]] البرنامج بيطبع [[1.0.0]] بدل [[dev]].

شرط [[-X]]: المتغير لازم يبقى [[var]] من نوع string على مستوى الباكدج (مش [[const]] ومش جوه دالة)، وإلا القيمة مش هتتغيّر ومن غير أي error.`,
          solCode: R`package main

import (
  "fmt"
  "os"
)

var version = "dev"

func main() {
  fmt.Println(os.Args, version)
}`
        },
        {
          cmd: "go fmt و go vet",
          title: "go fmt و go vet: أدوات بتظبط شكل الكود وتمسك أخطاء قبل التشغيل",
          desc: R`في Go مفيش نقاش على شكل الكود: [[gofmt]] بيحدد شكل واحد (tabs للـ indentation، ومكان الأقواس، والمسافات، ومحاذاة الحقول). [[go fmt ./...]] بيعيد كتابة الملفات بالشكل ده. و [[./...]] معناها «الفولدر ده وكل الفولدرات اللي تحته». إضافة Go في VS Code (أو أي محرر) بتعمل ده لوحدها مع كل حفظ.

[[go vet ./...]] بيدوّر على أخطاء الـ compiler مش بيمسكها: [[Printf]] بنوع أو عدد قيم مش مطابق للـ %، أو نسخ Mutex، أو struct tag مكتوب غلط، أو كود بعد return مش هيتنفذ. [[go test]] بيشغّل جزء منه لوحده.

[[gofmt -l .]] بيقولك أسماء الملفات اللي شكلها مش مظبوط من غير ما يغيّرها (مفيد في CI)، و [[gofmt -d]] بيوريك الفرق.

وللمراجعة الأعمق: [[staticcheck]] أو [[golangci-lint]] (بيجمع linters كتير في أمر واحد) في CI.`,
          example: R`go fmt ./...
go vet ./...
gofmt -l .
gofmt -d main.go
go install honnef.co/go/tools/cmd/staticcheck@latest
staticcheck ./...`,
          try: R`اكتب [[fmt.Printf("%d\n", "text")]] في main.go وشغّل [[go run .]] وبعدين [[go vet .]]. وبعدين بوّظ الـ indentation بإيدك (مسافات عشوائية) وشغّل [[gofmt -d main.go]] وبعدين [[go fmt ./...]].`,
          deep: {
            why: R`الـ code review بيضيع وقت كتير على المسافات ومكان الأقواس. gofmt شال الموضوع ده من الأساس: كل كود Go في العالم شكله واحد، فتقرا أي مكتبة كأنك انت كاتبها. و vet بيمسك أخطاء حقيقية بتعدّي من الـ compiler وبتطلع في الإنتاج.`,
            how: R`[[go fmt]] بيشغّل [[gofmt -l -w]] على ملفات الباكدجات. [[goimports]] نفس الكلام وكمان بيرتّب الـ imports ويضيف الناقص (اختاره في إعدادات المحرر).

[[go vet]] مجموعة analyzers: [[printf]] (الـ verbs والقيم)، و [[copylocks]] (نسخ Mutex بالقيمة)، و [[structtag]]، و [[unreachable]]، و [[lostcancel]] (context.WithCancel من غير cancel)، وغيرهم. مش بيطلع إنذارات كتير على الفاضي، فلو طلّع حاجة صدّقه.`,
            when: R`fmt مع كل حفظ. vet و staticcheck في CI على كل pull request، والـ CI يقع لو [[gofmt -l .]] طلّع أي ملف.`,
            mistakes: R`تعطّل format on save لأن «شكلي أحسن». وتتجاهل vet لأن البرنامج اشتغل: [[Printf("%d", "text")]] بتشتغل وتطبع [[%!d(string=text)]] بدل ما تقع، فالغلطة بتعدّي لحد ما يوزر يشوفها.`
          },
          teach: R`## المثال بيعمل إيه؟

٣ أدوات بتراجع الكود من غير ما تشغّله: [[gofmt]] (الشكل)، و [[go vet]] (أخطاء شائعة)، و [[staticcheck]] (مراجعة أعمق). عشان نشوفهم شغالين، جربتهم على ملف فيه مشكلتين بالقصد: indentation بايظ، و [[%d]] (رقم) مع نص. اتشغّل كله في [[docker run --rm golang:1.25]] (Go 1.25.14):

~~~go main.go (قبل)
package main

import "fmt"

func main() {
   x:=5
      fmt.Printf("%d\n", "text")
  fmt.Println( x )
}
~~~

الأول: الـ compiler نفسه شايف الملف ده سليم:

~~~text الناتج: go run .
%!d(string=text)
5
~~~

البرنامج اتبنى واشتغل. و [[fmt]] لما الـ verb مش مناسب مش بتقع، بتطبع [[%!d(string=text)]]: «الـ [[%d]] جالها string قيمته text». الغلطة دي هتعدّي لحد ما يوزر يشوفها.

---

## ١. [[./...]]: يعني إيه؟

قبل الأوامر: [[./...]] اسمه package pattern. [[.]] الفولدر الحالي، و [[...]] «وأي حاجة تحته». فـ [[go vet ./...]] = كل الباكدجات في المشروع. و [[.]] لوحدها = الباكدج اللي في الفولدر ده بس.

---

## ٢. [[go fmt ./...]]

بيعيد كتابة الملفات بالشكل الرسمي، ويطبع أسماء الملفات اللي غيّرها:

~~~text الناتج
main.go
~~~

~~~go main.go (بعد)
package main

import "fmt"

func main() {
	x := 5
	fmt.Printf("%d\n", "text")
	fmt.Println(x)
}
~~~

اللي اتغيّر:
- الـ indentation بقى **tab** واحد لكل مستوى (مش مسافات). [[cat -A]] بيبيّنه [[^I]] في أول السطر.
- [[x:=5]] بقت [[x := 5]]: مسافة حوالين العمليات.
- [[Println( x )]] بقت [[Println(x)]]: من غير مسافات جوه الأقواس.

[[go fmt]] في الحقيقة بيشغّل [[gofmt -l -w]] على ملفات الباكدجات: [[-w]] (write) اكتب التعديل في الملف، و [[-l]] (list) اطبع أسماء الملفات اللي اتغيّرت. وعشان كده شفنا [[main.go]].

---

## ٣. [[gofmt -l .]]

نفس الفحص بس من غير [[-w]]: بيطبع **أسماء** الملفات اللي شكلها غلط ومش بيلمسها. قبل go fmt:

~~~text الناتج
main.go
~~~

وبعد go fmt: مفيش ناتج خالص. ده اللي الـ CI بيستخدمه: لو الأمر طبع أي حاجة، يبقى حد رفع كود مش متظبط. (لاحظ: [[gofmt]] أداة لوحدها بتاخد ملفات وفولدرات، و [[.]] هنا فولدر بكل اللي تحته، مش package pattern.)

---

## ٤. [[gofmt -d main.go]]

[[-d]] (diff): وريني الفرق من غير ما تغيّر:

~~~text الناتج (قبل go fmt)
diff main.go.orig main.go
--- main.go.orig
+++ main.go
@@ -3,7 +3,7 @@
 import "fmt"
 
 func main() {
-   x:=5
-      fmt.Printf("%d\n", "text")
-  fmt.Println( x )
+	x := 5
+	fmt.Printf("%d\n", "text")
+	fmt.Println(x)
 }
~~~

| الحتة | معناها |
|---|---|
| [[--- main.go.orig]] / [[+++ main.go]] | النسخة الحالية / النسخة بعد التظبيط |
| [[@@ -3,7 +3,7 @@]] | الجزء ده بيبدأ من سطر 3 وطوله 7 سطور، في الاتنين |
| سطر بيبدأ بـ [[-]] | هيتشال |
| سطر بيبدأ بـ [[+]] | هيتحط مكانه |
| سطر بيبدأ بمسافة | زي ما هو (context) |

---

## ٥. [[go vet ./...]]

~~~text الناتج
# example.com/hello
# [example.com/hello]
./main.go:7:14: fmt.Printf format %d has arg "text" of wrong type string
~~~

- vet مسك اللي الـ compiler عدّاه: [[Printf]] الـ verb بتاعها [[%d]] واخدة [["text"]] من نوع string.
- [[7:14]]: سطر 7 عمود 14 (قبل go fmt كان [[7:19]]، لأن المسافات الكتير اتبدلت بـ tab واحد).
- السطرين اللي بيبدأوا بـ [[#]] اسم الباكدج اللي فيها المشكلة.
- الـ exit code بتاعه [[1]] (طلع من [[echo $?]])، فلو حطيته في CI الـ job هيقع.

اللي بيعمل الفحص ده analyzer اسمه [[printf]]. vet فيه analyzers تانية: [[copylocks]] (نسخ Mutex)، و [[structtag]] (tags مكتوبة غلط)، و [[unreachable]] (كود بعد return)، و [[lostcancel]] وغيرهم.

---

## ٦. [[staticcheck]]

### التسطيب

~~~bash
go install honnef.co/go/tools/cmd/staticcheck@latest
~~~

نفس فكرة [[go install]] في الدرس اللي فات: يبني الأداة ويحطها في [[~/go/bin]]. في صورة Docker لازم [[GOTOOLCHAIN=auto]] قبله، لأن آخر نسخة (0.8.1) محتاجة Go 1.26 والصورة مظبوطة [[local]]:

~~~text الناتج من غير GOTOOLCHAIN=auto
go: honnef.co/go/tools/cmd/staticcheck@latest: honnef.co/go/tools@v0.8.1 requires go >= 1.26.0 (running go 1.25.14; GOTOOLCHAIN=local)
~~~

على جهاز عادي go بتنزّل الـ toolchain لوحدها. [[staticcheck -version]] بعد التسطيب طلّع [[staticcheck 2026.2.1 (0.8.1)]].

### التشغيل

~~~text الناتج: staticcheck ./...
main.go:7:13: Printf format %d has arg #1 of wrong type string (SA5009)
~~~

نفس الغلطة، بس كل رسالة ليها **كود** بين أقواس تقدر تدوّر عليه في التوثيق. وعشان أشوف حاجات vet مش بيمسكها، ضفت ملف فيه دالة مش مستخدمة و [[strings.Index(s, "x") != -1]]:

~~~text الناتج
extra.go:5:6: func helper is unused (U1000)
extra.go:6:9: should use strings.Contains(s, "x") instead (S1003)
extra.go:9:6: func unused is unused (U1000)
main.go:7:13: Printf format %d has arg #1 of wrong type string (SA5009)
~~~

| أول الكود | النوع |
|---|---|
| [[SA]] | staticcheck: bugs حقيقية |
| [[S]] | simple: كود ممكن يتكتب أبسط |
| [[U]] | unused: كود مش مستخدم |
| [[ST]] | stylecheck: أسلوب وأسماء |

> الـ compiler بيرفض **متغير** مش مستخدم، بس **دالة** مش مستخدمة عادي عنده. staticcheck هو اللي بيمسكها.

---

## الخلاصة

| الأمر | بيغيّر الملفات؟ | بيعمل إيه |
|---|---|---|
| [[go fmt ./...]] | أيوه | يظبط الشكل ويطبع اللي اتغيّر |
| [[gofmt -l .]] | لا | أسماء الملفات المش مظبوطة (للـ CI) |
| [[gofmt -d file]] | لا | الفرق بصيغة diff |
| [[go vet ./...]] | لا | أخطاء الـ compiler مش بيمسكها، exit 1 |
| [[staticcheck ./...]] | لا | bugs وتبسيط وكود ميت، بأكواد |

- البرنامج اشتغل ≠ البرنامج صح: [[%!d(string=text)]] مثال.
- الـ indentation في Go tabs. خلّي المحرر يشغّل gofmt مع كل حفظ.`,
          lines: [
            "بيظبط شكل كل ملفات .go في المشروع ويكتبها.",
            "بيدوّر على أخطاء منطقية شائعة في كل الباكدجات.",
            "أسماء الملفات اللي شكلها مش مظبوط بس، من غير تعديل.",
            "الفرق اللي gofmt هيعمله في الملف، بصيغة diff.",
            "تسطيب staticcheck.",
            "مراجعة أعمق: كود مش مستخدم، و APIs قديمة، وأخطاء شائعة."
          ],
          sol: R`[[go run .]] بيشتغل عادي وبيطبع [[%!d(string=text)]]، يعني الغلطة بتعدّي من الـ compiler. و [[go vet .]] بيمسكها:
[[./main.go:6:15: fmt.Printf format %d has arg "text" of wrong type string]] (رقم السطر والعمود حسب ملفك)

و [[gofmt -d main.go]] بيطبع diff بسطور [[-]] (الشكل الحالي) و [[+]] (الشكل الصح)، وبعد [[go fmt ./...]] الملف بيتظبط و [[gofmt -l .]] ميطبعش حاجة.`
        }
      ]
    }
  ]
});

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
    },
    {
      t: "المتغيرات والأنواع والنصوص",
      l: 1,
      n: "var و := والقيمة الصفرية، والثوابت و iota، والتحويل بين الأنواع، والنص العربي جوه string، والطباعة بـ fmt",
      items: [
        {
          cmd: "var و :=",
          title: "تعرّف متغير إزاي: var و := والقيمة الصفرية",
          desc: R`Go لغة statically typed: كل متغير ليه نوع ثابت بيتحدد وقت الـ compile ومبيتغيرش. لو المتغير int مينفعش تحط فيه نص بعدين.

٣ طرق للتعريف:
• [[var count int]]: متغير من نوع int من غير قيمة، فبياخد القيمة الصفرية (zero value): [[0]] للأرقام، و [[""]] للنص، و [[false]] للـ bool، و [[nil]] للـ pointers والـ slices والـ maps. مفيش في Go متغير «مش متعرّف» أو فيه زبالة من الذاكرة.
• [[var name = "Sara"]]: النوع بيتستنتج من القيمة (string).
• [[name := "Sara"]]: نفس اللي فوق بس أقصر، ودي اللي هتكتبها أغلب الوقت. [[:=]] معناها «عرّف متغير جديد وحط فيه القيمة»، وبتشتغل جوه الدوال بس. بره الدوال (على مستوى الباكدج) لازم [[var]].

و [[=]] لوحدها تعيين قيمة جديدة لمتغير موجود قبل كده.

ممكن تعرّف أكتر من متغير مرة واحدة: [[a, b := 1, 2]]. والتبديل بينهم [[a, b = b, a]] من غير متغير مؤقت.

و [[_]] (الشرطة السفلية) اسمها blank identifier: مكان ترمي فيه قيمة مش محتاجها. ليه محتاجينه؟ لأن Go مش هتسيبك تعرّف متغير ومتستخدموش، وفيه دوال بترجّع أكتر من قيمة وانت عايز واحدة بس منهم.`,
          example: R`package main

import "fmt"

// على مستوى الباكدج لازم var، و := مش مسموحة هنا
var appName = "store"

func main() {
  var count int
  var price float64
  var name string
  var ok bool
  fmt.Println(count, price, name == "", ok)

  city := "Cairo"
  qty, total := 3, 4.5
  // := مع متغير واحد جديد على الأقل (extra)، و qty بيتعاد تعيينه
  qty, extra := 5, true
  city = "Giza"
  fmt.Println(appName, city, qty, total, extra)

  a, b := 1, 2
  a, b = b, a
  // Println بترجّع قيمتين (عدد البايتات و error)، والأولى مش محتاجينها
  _, err := fmt.Println("a =", a, "b =", b)
  fmt.Println(err)
}`,
          try: R`جرّب ٣ حاجات واقرا رسالة الـ compiler: (١) انقل [[city := "Cairo"]] بره main. (٢) اكتب [[city := "Alex"]] تاني تحت الأولى في نفس main. (٣) اكتب [[count = "ten"]].`,
          flag: "script",
          deep: {
            why: R`القيمة الصفرية بتشيل نوع كامل من الـ bugs: مفيش «undefined» زي JavaScript ولا قيمة عشوائية زي C. والـ struct اللي كل حقوله ليها قيمة صفرية مفيدة بيبقى جاهز للاستخدام من غير constructor، وده مبدأ في Go اسمه «make the zero value useful» (زي [[sync.Mutex]] و [[strings.Builder]] و [[bytes.Buffer]]: بتعرّفهم وتستخدمهم على طول).`,
            how: R`[[:=]] لازم يكون على الشمال متغير واحد جديد على الأقل. لو كلهم موجودين يطلع error، ولو فيه واحد جديد التانيين بيتعاد تعيينهم (زي qty في المثال). ده بيخليك تكتب [[n, err := ...]] وبعدها [[m, err := ...]] من غير ما تخترع اسم جديد للـ error كل مرة.

الفخ: [[:=]] جوه block جديد ([[if]] أو [[for]] أو [[{ }]]) بيعمل متغير جديد بنفس الاسم يغطّي اللي بره (shadowing)، والتعديل عليه مش بيوصل للمتغير الخارجي:
[[if ok { err := save() }]] هنا err الخارجي متغيّرش.

[[fmt.Println]] لما تديله [[name == ""]] بيطبع نتيجة المقارنة (true). ولو طبعت name الفاضي نفسه مش هتشوف حاجة، عشان كده قارنّاه.`,
            when: R`[[:=]] جوه الدوال في ٩٠٪ من الوقت. [[var x T]] لما عايز القيمة الصفرية صراحةً ([[var wg sync.WaitGroup]])، أو النوع مختلف عن اللي هيتستنتج ([[var ratio float64 = 1]]). و [[var]] على مستوى الباكدج للقيم المشتركة (وقللها: global state بيصعّب الاختبار).`,
            mistakes: R`[[x := 1]] بره دالة: [[syntax error: non-declaration statement outside function body]]. و [[:=]] تاني لنفس الاسم في نفس الـ scope: [[no new variables on left side of :=]]. والـ shadowing جوه if أو for وتفتكر إنك عدّلت المتغير اللي بره. ومتغير معرّف ومش مستخدم: [[declared and not used]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف متغيرات بالطرق التلاتة ([[var]] بنوع، و [[var]] بقيمة، و [[:=]])، ويطبع القيم الصفرية، ويبدّل قيمتين، ويرمي قيمة مش محتاجها بـ [[_]]. اتشغّل في [[docker run --rm golang:1.25]] (Go 1.25.14)، وكل خطأ في الآخر اتجرّب بتعديل الملف فعلًا.

---

## ١. متغير على مستوى الباكدج

~~~go
var appName = "store"
~~~

- [[var]] (variable): كلمة التعريف. بعدها الاسم، وبعدها [[=]] والقيمة.
- مفيش نوع مكتوب، فـ Go استنتجته من القيمة: [[string]].
- مكانه بره أي دالة، فأي دالة في الباكدج تشوفه. هنا **لازم** [[var]]: [[:=]] بره الدوال ممنوعة (هتشوف الـ error تحت).

---

## ٢. [[var]] من غير قيمة = القيمة الصفرية

~~~go
  var count int
  var price float64
  var name string
  var ok bool
  fmt.Println(count, price, name == "", ok)
~~~

الشكل: [[var الاسم النوع]]. النوع بييجي **بعد** الاسم في Go (عكس C و Java). ومفيش قيمة، فكل متغير بياخد الـ **zero value** بتاعة نوعه:

| النوع | معناه | القيمة الصفرية |
|---|---|---|
| [[int]] | رقم صحيح | [[0]] |
| [[float64]] | رقم عشري (64 bit) | [[0]] |
| [[string]] | نص | [[""]] (فاضي) |
| [[bool]] | صح أو غلط | [[false]] |

~~~text الناتج
0 0 true false
~~~

- [[price]] اتطبع [[0]] مش [[0.0]]: Println بتطبع الـ float من غير كسور لو مفيش.
- [[name == ""]]: [[==]] مقارنة بترجّع bool. لو طبعنا name نفسه مش هنشوف حاجة (نص فاضي)، فقارنّاه بـ [[""]] وطلع [[true]].

وده مش للأنواع البسيطة بس. جربت [[var s []int]] و [[var m map[string]int]] و [[var p *int]] (slice و map و pointer، ليهم دروس جاية):

~~~text الناتج: fmt.Println(s == nil, m == nil, p == nil, s, m, p)
true true true [] map[] <nil>
~~~

القيمة الصفرية ليهم [[nil]] («مفيش حاجة»). يعني في Go مفيش متغير من غير قيمة أبدًا.

---

## ٣. [[:=]]

~~~go
  city := "Cairo"
  qty, total := 3, 4.5
~~~

- [[:=]] اسمها short variable declaration: «عرّف متغير **جديد** واديله القيمة دي». النوع من القيمة.
- السطر التاني بيعرّف اتنين مرة واحدة: الأسامي على الشمال بالترتيب، والقيم على اليمين بنفس الترتيب.
- [[3]] رقم صحيح فـ qty بقى [[int]]، و [[4.5]] فيه علامة عشرية فـ total بقى [[float64]]. اتأكدت بـ [[fmt.Printf("%T %T\n", qty, total)]] وطلع [[int float64]] ([[%T]] بتطبع النوع، ليها شرح في درس [[fmt و Printf]]).

---

## ٤. [[:=]] مع متغير قديم ومتغير جديد

~~~go
  qty, extra := 5, true
~~~

qty موجود من السطر اللي فوق، و extra جديد. القاعدة: [[:=]] محتاجة **متغير جديد واحد على الأقل** على الشمال. لو فيه، التانيين الموجودين بيتعاد تعيينهم عادي. فـ extra اتعرّف ([[bool]])، و qty بقى 5.

الفايدة الحقيقية هتشوفها كتير: [[n, err := ...]] وبعدها [[m, err := ...]]. الـ [[err]] نفسه بيتعاد استخدامه.

---

## ٥. [[=]]: تغيير قيمة

~~~go
  city = "Giza"
  fmt.Println(appName, city, qty, total, extra)
~~~

[[=]] لوحدها مش بتعرّف حاجة، بتغيّر قيمة متغير موجود. والقيمة الجديدة لازم من نفس النوع.

~~~text الناتج
store Giza 5 4.5 true
~~~

---

## ٦. تبديل قيمتين

~~~go
  a, b := 1, 2
  a, b = b, a
~~~

Go بتحسب **كل** القيم اللي على اليمين الأول ([[b]] = 2 و [[a]] = 1)، وبعدين تحطهم في الشمال. فمش محتاج متغير مؤقت زي لغات تانية.

---

## ٧. [[_]]: ارمي القيمة

~~~go
  _, err := fmt.Println("a =", a, "b =", b)
  fmt.Println(err)
~~~

~~~text الناتج
a = 2 b = 1
<nil>
~~~

- [[fmt.Println]] مش بتطبع بس، كمان **بترجّع** قيمتين: عدد البايتات اللي اتكتبت، و [[error]] لو الكتابة فشلت. عادةً محدش بيبص عليهم، بس هنا مثال.
- محتاجين الـ error بس. ولو كتبنا [[n, err :=]] ومستخدمناش n، الـ compiler يرفض ([[declared and not used]]). فـ [[_]] (blank identifier) مكان ترمي فيه القيمة.
- [[<nil>]]: الـ error قيمته [[nil]]، يعني مفيش مشكلة. هتشوف الشكل ده في كل كود Go.

---

## ٨. الأخطاء التلاتة (الـ try)

| التعديل | رسالة الـ compiler |
|---|---|
| [[city := "Cairo"]] بره main | [[./main.go:7:1: syntax error: non-declaration statement outside function body]] |
| [[city := "Alex"]] تحت الأولى | [[./main.go:16:8: no new variables on left side of :=]] |
| [[count = "ten"]] | [[./main.go:13:11: cannot use "ten" (untyped string constant) as int value in assignment]] |

- الأول: بره الدوال بيتكتب تعريفات بس (declarations: [[var]] و [[const]] و [[func]] و [[type]] و [[import]])، و [[:=]] statement مش declaration.
- التاني: مفيش متغير جديد على الشمال، فـ [[:=]] ملهاش لازمة. اكتب [[=]].
- التالت: count نوعه [[int]] من ساعة ما اتعرّف، ومينفعش يتحط فيه نص. [[untyped string constant]] يعني نص مكتوب في الكود لسه ملوش نوع نهائي.

---

## ٩. الفخ: الـ shadowing

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

[[:=]] جوه [[{ }]] جديدة عملت متغير **تاني** اسمه x بيغطّي (shadow) اللي بره، والتغيير مات معاه لما الـ block خلص. لو كنت عايز تغيّر اللي بره: [[x = 2]].

---

## الخلاصة

| الشكل | فين | بيعمل إيه |
|---|---|---|
| [[var x int]] | أي مكان | متغير بالقيمة الصفرية |
| [[var x = 5]] | أي مكان | النوع من القيمة |
| [[x := 5]] | جوه الدوال بس | نفس اللي فوق، أقصر |
| [[x = 6]] | أي مكان | تغيير قيمة موجودة |
| [[a, b = b, a]] | | تبديل |
| [[_, err := f()]] | | ارمي القيمة الأولى |

- [[:=]] = متغير جديد واحد على الأقل. [[=]] = تغيير بس.
- مفيش متغير من غير قيمة: 0 و [[""]] و false و nil.`,
          lines: [
            R`باكدج main.`,
            R`import لباكدج واحدة ممكن من غير أقواس.`,
            R`متغير على مستوى الباكدج بـ [[var]]، نوعه string من القيمة.`,
            "main.",
            R`int من غير قيمة: صفر.`,
            R`float64 (رقم عشري): صفر برضه.`,
            R`string فاضي [[""]].`,
            R`bool: false.`,
            "اطبع القيم الصفرية (ومقارنة النص الفاضي عشان يبان).",
            R`متغير جديد بـ [[:=]].`,
            "متغيرين جداد في سطر واحد: int و float64.",
            R`extra جديد، فـ [[:=]] مسموحة، و qty اتغيّر لـ 5.`,
            R`تعيين قيمة جديدة لمتغير موجود بـ [[=]].`,
            "اطبعهم.",
            "متغيرين جداد.",
            "تبديل القيم في سطر واحد.",
            R`[[_]] بترمي القيمة الأولى، و err جديد.`,
            R`[[<nil>]] يعني مفيش error.`,
            "قفلة main."
          ],
          sol: R`الناتج:
[[0 0 true false]]
[[store Giza 5 4.5 true]]
[[a = 2 b = 1]]
[[<nil>]]

والأخطاء التلاتة:
(١) [[syntax error: non-declaration statement outside function body]]: بره الدوال لازم [[var city = "Cairo"]].
(٢) [[no new variables on left side of :=]]: city موجود، فاكتب [[city = "Alex"]].
(٣) [[cannot use "ten" (untyped string constant) as int value in assignment]]: count نوعه int ومينفعش يتغيّر.`
        },
        {
          cmd: "const و iota",
          title: "الثوابت و iota: قيم مبتتغيرش، و enum من غير كلمة enum",
          desc: R`[[const]] قيمة معروفة وقت الـ compile ومبتتغيرش: أرقام، ونصوص، و bool. مينفعش const يبقى slice أو map أو نتيجة دالة بتشتغل وقت التشغيل.

الثوابت في Go بتبقى «untyped» لحد ما تستخدمها: [[const timeout = 5 * time.Second]] بتشتغل كـ [[time.Duration]]، و [[const big = 1 << 40]] رقم كبير من غير ما تحدد نوعه. [[<<]] معناها shift لليسار: [[1 << 10]] يعني 1 مضروب في 2 عشر مرات = 1024.

Go مفيهاش كلمة [[enum]]. البديل: نوع جديد ([[type Status int]]) وبلوك const فيه [[iota]]. [[iota]] عدّاد بيبدأ من 0 في أول سطر في البلوك ويزيد واحد مع كل سطر. والسطور اللي من غير قيمة بتكرر نفس التعبير اللي فوقها بـ iota الجديدة.

[[type Status int]] بيعمل نوع جديد أساسه int. الفايدة إن الدالة اللي بتاخد Status مش هتقبل أي int بالغلط من غير تحويل صريح.`,
          example: R`package main

import (
  "fmt"
  "time"
)

const appName = "orders"
const timeout = 5 * time.Second

type Status int

// iota بتبدأ من 0 وتزيد واحد مع كل سطر
const (
  Pending Status = iota
  Paid
  Shipped
  Cancelled
)

// _ بترمي أول قيمة (صفر)، والسطور اللي بعدها بتكرر نفس المعادلة
const (
  _  = iota
  KB = 1 << (10 * iota)
  MB
  GB
)

func main() {
  fmt.Println(appName, timeout)
  fmt.Println(Pending, Paid, Shipped, Cancelled)
  s := Shipped
  fmt.Println(s == 2, KB, MB, GB)
}`,
          try: R`ضيف method اسمها [[String()]] على Status بترجّع اسم الحالة ([["pending"]] و [["paid"]]...)، واطبع [[fmt.Println(Paid)]]. هتلاقي fmt استخدمها لوحدها. (الـ methods هتتشرح بالتفصيل في درس الـ structs، الشكل: [[func (s Status) String() string { ... }]].)`,
          flag: "script",
          deep: {
            why: R`الأرقام السحرية (status == 2) مبتتقريش وسهل تغلط فيها. الثوابت بأسماء بتوضّح المعنى، والنوع الخاص (Status) بيخلي الـ compiler يمنعك تبعت رقم عشوائي لدالة مستنية حالة.`,
            how: R`[[iota]] بتتصفّر مع كل بلوك [[const ( )]] جديد. وفي البلوك التاني [[KB = 1 << (10 * iota)]]: iota هنا 1 فـ [[1 << 10]] = 1024، وسطر MB من غير قيمة فبيكرر المعادلة بـ iota = 2 يعني [[1 << 20]]، وهكذا.

[[fmt.Println(Paid)]] بيطبع 1 لأن Status أساسه int. لو عرّفت [[String() string]] على النوع، fmt بيشوف إنه بيحقق الـ interface اسمه [[fmt.Stringer]] ويطبع الاسم. وفيه أداة رسمية [[stringer]] بتولّد الدالة دي لوحدها ([[go generate]]).

[[timeout]] بيتطبع [[5s]] لأن [[time.Duration]] عنده String() جاهزة.`,
            when: R`حالات الطلب، والأدوار (admin و user)، والأحجام والحدود (MaxUploadSize)، وأي رقم ثابت ليه معنى.`,
            mistakes: R`تحفظ قيمة iota (رقم) في الداتابيز، وبعدين تضيف حالة في نص البلوك فكل الأرقام اللي بعدها تتزحلق وداتا قديمة تتقري غلط. لو القيمة هتتخزن أو تتبعت في API، استخدم نصوص ([[const Paid Status = "paid"]] مع [[type Status string]]) أو أرقام صريحة. وكمان القيمة الصفرية للـ Status هي أول ثابت (Pending)، فـ struct جديد مش متحددله حالة هيبقى Pending من غير قصد. لو ده مشكلة خلي أول قيمة [[Unknown]].`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيعرّف ثوابت عادية، وبعدين «enum» لحالات الطلب بـ [[iota]]، وبعدين أحجام KB و MB و GB بمعادلة واحدة، ويطبعهم. اتشغّل في [[docker run --rm golang:1.25]] (Go 1.25.14)، و [[go vet .]] معلّقش عليه بحاجة.

---

## ١. ثوابت عادية

~~~go
const appName = "orders"
const timeout = 5 * time.Second
~~~

- [[const]] (constant): زي [[var]] بس القيمة مبتتغيرش، ولازم تبقى معروفة وقت الـ compile. لو كتبت [[appName = "x"]] بعدين الـ compiler يرفض.
- [[time.Second]] ثابت في باكدج [[time]] نوعه [[time.Duration]]، وهو في الحقيقة رقم: عدد الـ nanoseconds في ثانية (مليار). فـ [[5 * time.Second]] = 5 مليار nanosecond، من نوع Duration.

~~~text الناتج: fmt.Println(appName, timeout)
orders 5s
~~~

[[5s]] مش 5000000000، لأن [[time.Duration]] عنده method اسمها [[String()]] بتكتبه بشكل مقروء، و Println بتستخدمها لوحدها (نفس الحركة هنعملها لـ Status تحت).

---

## ٢. [[type Status int]]

~~~go
type Status int
~~~

- [[type]]: اعمل نوع جديد. اسمه [[Status]]، وأساسه (underlying type) [[int]].
- ليه مش int على طول؟ عشان الـ compiler يفرّق. جربت دالة [[show(s Status)]] وبعتّلها متغير int:

~~~text الناتج
./main.go:15:8: cannot use n (variable of type int) as Status value in argument to show
~~~

بس [[show(2)]] (رقم مكتوب في الكود مباشرة) عدّت وطبعت [[2]]: الرقم المكتوب ثابت **untyped** (ملوش نوع لسه)، فبياخد النوع اللي المكان محتاجه. المتغير n نوعه اتحدد [[int]] خلاص.

---

## ٣. بلوك [[iota]]

~~~go
const (
  Pending Status = iota
  Paid
  Shipped
  Cancelled
)
~~~

- [[const ( ... )]]: بلوك فيه كذا ثابت، واحد في كل سطر.
- [[iota]]: عدّاد بيبدأ [[0]] في أول سطر في البلوك، ويزيد 1 مع كل سطر.
- [[Pending Status = iota]]: Pending نوعه Status وقيمته iota (يعني 0).
- [[Paid]] لوحده من غير نوع ولا قيمة: Go بتكرر **نفس التعبير اللي فوقه** ([[Status = iota]]) بس iota بقت 1.

| السطر | iota | القيمة |
|---|---|---|
| [[Pending]] | 0 | 0 |
| [[Paid]] | 1 | 1 |
| [[Shipped]] | 2 | 2 |
| [[Cancelled]] | 3 | 3 |

~~~text الناتج: fmt.Println(Pending, Paid, Shipped, Cancelled)
0 1 2 3
~~~

---

## ٤. [[KB]] و [[MB]] و [[GB]]

~~~go
const (
  _  = iota
  KB = 1 << (10 * iota)
  MB
  GB
)
~~~

بلوك جديد، فـ iota رجعت 0.

- [[_ = iota]]: القيمة 0 مش محتاجينها، فنرميها في [[_]]. الفايدة إن iota في السطر اللي بعده بقت 1.
- [[<<]]: shift لليسار. [[1 << n]] = 1 مضروبة في 2 عدد n مرات، يعني 2 أُس n.
- [[10 * iota]]: في سطر KB iota = 1 فـ [[1 << 10]].
- [[MB]] و [[GB]]: بيكرروا المعادلة [[1 << (10 * iota)]] بـ iota = 2 و 3.

| الاسم | iota | المعادلة | القيمة |
|---|---|---|---|
| [[KB]] | 1 | [[1 << 10]] | 1024 |
| [[MB]] | 2 | [[1 << 20]] | 1048576 |
| [[GB]] | 3 | [[1 << 30]] | 1073741824 |

ليه 1024 مش 1000؟ لأن الكمبيوتر بيعدّ بـ 2: 2 أُس 10 = 1024 أقرب حاجة لألف.

---

## ٥. main

~~~go
  s := Shipped
  fmt.Println(s == 2, KB, MB, GB)
~~~

- [[s]] نوعه [[Status]] (من Shipped).
- [[s == 2]] مسموحة: [[2]] ثابت untyped فبيتعامل كـ Status. والنتيجة [[true]] لأن Shipped = 2.

~~~text الناتج كامل
orders 5s
0 1 2 3
true 1024 1048576 1073741824
~~~

### الثوابت الـ untyped أكبر من غير مشكلة

جربت [[const big = 1 << 40]] وطبعته بـ [[fmt.Printf("%T %d\n", big, big)]]:

~~~text الناتج
int 1099511627776
~~~

الثابت ملوش نوع لحد ما يتستخدم، وساعتها بياخد [[int]] (الافتراضي للأرقام الصحيحة). [[%T]] بتطبع النوع و [[%d]] الرقم.

---

## ٦. الحل: [[String()]]

~~~go solCode
func (s Status) String() string {
  switch s {
  case Pending:
    return "pending"
  ...
  }
  return fmt.Sprintf("Status(%d)", int(s))
}
~~~

- [[func (s Status) String() string]]: method على النوع Status. [[(s Status)]] اسمه receiver: القيمة اللي الـ method اتنادت عليها ([[Paid.String()]] يعني s = Paid). و [[string]] الأخيرة نوع الحاجة اللي بترجع.
- [[switch s]]: قارن s بكل [[case]] واختار اللي بيطابق.
- لو مفيش case طابق (رقم غريب)، [[fmt.Sprintf]] بتبني نص زي [[Status(9)]] من غير ما تطبعه.
- [[int(s)]]: حوّله int عادي الأول. ليه؟ تحت.

أي نوع عنده [[String() string]] بيحقق interface اسمه [[fmt.Stringer]]، و fmt بتستخدمها لوحدها:

~~~text الناتج بعد إضافة String
pending paid shipped cancelled
paid
Status(9)
paid 1
~~~

- السطر الأول: نفس [[fmt.Println(Pending, Paid, Shipped, Cancelled)]] بقى أسامي.
- [[Status(9)]]: تحويل الرقم 9 لـ Status، وملوش case.
- [[fmt.Printf("%v %d\n", Paid, Paid)]]: [[%v]] بتستخدم String، و [[%d]] بتطبع الرقم نفسه.

### ليه [[int(s)]] مش [[s]] على طول؟

جربت [[return fmt.Sprint(s)]] جوه String:

~~~text الناتج: go vet .
./main.go:35:42: fmt.Sprint arg s causes recursive call to (x.Status).String method
~~~

~~~text الناتج: go run .
runtime: goroutine stack exceeds 1000000000-byte limit
fatal error: stack overflow
~~~

Sprint شافت إن s عنده String فنادتها، والـ String نادت Sprint تاني... للأبد لحد ما الـ stack (الذاكرة اللي بتتحفظ فيها نداءات الدوال، حدها 1GB هنا) خلص. [[int(s)]] نوع من غير String، فمفيش لفّ.

---

## الخلاصة

| الشكل | معناه |
|---|---|
| [[const x = ...]] | قيمة ثابتة معروفة وقت الـ compile |
| [[type Status int]] | نوع جديد أساسه int، مش بيقبل int متغير من غير تحويل |
| [[iota]] | 0 في أول سطر في البلوك، +1 لكل سطر |
| سطر من غير قيمة | يكرر التعبير اللي فوقه بـ iota الجديدة |
| [[_ = iota]] | ارمي القيمة 0 |
| [[1 << n]] | 2 أُس n |
| [[String() string]] | fmt تطبع الاسم بدل الرقم |

- قيم iota بتتزحلق لو ضفت سطر في النص: متخزّنهاش في داتابيز.
- جوه String متطبعش القيمة نفسها بـ fmt: حوّلها لنوعها الأساسي الأول.`,
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            R`time، عشان [[time.Second]].`,
            "قفلة.",
            "ثابت نصي.",
            R`ثابت مدة: 5 ثواني من نوع [[time.Duration]].`,
            R`نوع جديد اسمه Status أساسه int.`,
            "بلوك ثوابت.",
            R`Pending = 0 ونوعه Status.`,
            "Paid = 1 بنفس النوع (السطر بيكرر اللي فوقه).",
            "Shipped = 2.",
            "Cancelled = 3.",
            "قفلة البلوك.",
            "بلوك تاني: iota بتبدأ من صفر تاني.",
            R`القيمة 0 بنرميها في [[_]].`,
            R`iota = 1، فـ [[1 << 10]] = 1024.`,
            R`iota = 2، فـ [[1 << 20]].`,
            R`iota = 3، فـ [[1 << 30]].`,
            "قفلة.",
            "main.",
            R`[[5s]]: Duration بتطبع نفسها بشكل مقروء.`,
            "الأرقام اللي iota ادتها.",
            "متغير من نوع Status.",
            R`مقارنة بـ 2 مسموحة (2 ثابت untyped)، والأحجام بالبايت.`,
            "قفلة main."
          ],
          sol: R`الناتج:
[[orders 5s]]
[[0 1 2 3]]
[[true 1024 1048576 1073741824]]

ومع الـ String() method (الكود تحت)، [[fmt.Println(Paid)]] بتطبع [[paid]] بدل 1، و [[fmt.Println(Status(9))]] بتطبع [[Status(9)]]. لاحظ إننا مستخدمناش [[fmt.Sprint(s)]] جوه String نفسها: ده هينادي String تاني وتالت لحد ما البرنامج يقع (stack overflow)، فبنحوّله int الأول.`,
          solCode: R`func (s Status) String() string {
  switch s {
  case Pending:
    return "pending"
  case Paid:
    return "paid"
  case Shipped:
    return "shipped"
  case Cancelled:
    return "cancelled"
  }
  return fmt.Sprintf("Status(%d)", int(s))
}`
        },
        {
          cmd: "الأنواع والتحويل",
          title: "الأنواع الأساسية والتحويل بينها: Go مبتحوّلش لوحدها",
          desc: R`الأنواع اللي هتستخدمها كل يوم:
• [[int]]: رقم صحيح، 64 bit على الأجهزة العادية. وفيه [[int8]] و [[int16]] و [[int32]] و [[int64]] بأحجام محددة، و [[uint]] للموجب بس.
• [[float64]]: رقم عشري (و [[float32]] أقل دقة).
• [[bool]]: true أو false.
• [[string]]: نص.
• [[byte]] (اسم تاني لـ uint8) و [[rune]] (اسم تاني لـ int32): هنشرحهم في درس النصوص.

Go مبتحوّلش بين الأنواع لوحدها أبدًا. [[qty * price]] لو qty int و price float64 = compile error. لازم تحوّل بإيدك: [[T(x)]]، يعني [[float64(qty)]] أو [[int(price)]]. والتحويل من float لـ int بيقطع الكسر (مش بيقرّب).

الأرقام والنصوص بالذات بتتحوّل بالباكدج [[strconv]]:
• [[strconv.Atoi("42")]]: نص لـ int، وبترجّع قيمتين: الرقم و error (لو النص مش رقم).
• [[strconv.Itoa(42)]]: int لنص.
• [[strconv.ParseFloat("3.75", 64)]] و [[strconv.ParseBool("true")]].

القسمة بين int و int بترجّع int: [[7/2]] = 3. و [[%]] باقي القسمة.`,
          example: R`package main

import (
  "fmt"
  "strconv"
)

func main() {
  qty := 3
  price := 19.5
  total := float64(qty) * price
  fmt.Println(total)
  fmt.Println(int(price), 7/2, 7.0/2, 7%2)

  n, err := strconv.Atoi("42")
  fmt.Println(n+1, err)
  _, err = strconv.Atoi("42abc")
  fmt.Println(err)

  s := strconv.Itoa(99) + " جنيه"
  f, _ := strconv.ParseFloat("3.75", 64)
  fmt.Println(s, f*2)

  // int8 أكبر قيمة فيه 127، والزيادة بتلف للسالب من غير error
  var small int8 = 127
  small++
  fmt.Println(small)
}`,
          try: R`اكتب [[fmt.Println(string(65))]] و [[fmt.Println(strconv.Itoa(65))]] وقارن. وبعدين شغّل [[go vet .]] على السطر الأول. وجرّب [[total := qty * price]] من غير تحويل واقرا الـ error.`,
          flag: "script",
          deep: {
            why: R`التحويل التلقائي في لغات تانية مصدر bugs مشهور: [["5" + 1]] في JavaScript بقت [["51"]]. Go بتخليك تكتب التحويل صريح، فتشوف بعينك إن فيه كسر هيتقطع أو رقم ممكن يلف.`,
            how: R`[[int(price)]] = 19 (قطع مش تقريب، والتقريب [[math.Round]]). وخلي بالك: [[int(9.99)]] على رقم ثابت مكتوب في الكود compile error ([[cannot convert 9.99 (untyped float constant) to type int]])، لأن الـ compiler شايف إن الكسر هيضيع. على متغير بيعدّي وبيقطع. و [[7.0/2]] = 3.5 لأن 7.0 ثابت عشري فالعملية بقت float.

الـ overflow في Go مش error: int8 أكبر قيمة فيه 127، فـ [[127 + 1]] بتلف لـ -128 بصمت. نفس الكلام مع int64 بس عند رقم ضخم. للفلوس متستخدمش float64 (الكسور العشرية مش بتتخزن بالظبط: [[0.1 + 0.2]] مش 0.3 بالظبط)، خزّن قروش في int64 أو استخدم مكتبة decimal.

[[string(65)]] بيرجّع [["A"]] (الحرف اللي رقمه 65) مش [["65"]]، ودي غلطة مشهورة لدرجة إن [[go vet]] بيمسكها: [[conversion from untyped int to string yields a string of one rune, not a string of digits]].

[[strconv.Atoi]] بترجّع error فيه اسم الدالة والنص اللي فشل، فاقرأه.`,
            when: R`[[strconv]] كل ما تقرا رقم من نص: query string و env vars و CSV و os.Args. و [[float64(x)]] لما تخلط int مع عشري في حساب.`,
            mistakes: R`[[string(n)]] وانت عايز الرقم كنص (استخدم [[strconv.Itoa]] أو [[fmt.Sprint]]). وتتجاهل الـ error بتاع Atoi فيرجع 0 وتكمّل كأن اليوزر كتب صفر. وتحسب فلوس بـ float64.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيحسب سعر (int × float)، ويجرّب القسمة والباقي، ويحوّل نصوص لأرقام وأرقام لنصوص بـ [[strconv]]، وفي الآخر يوريك رقم بيعدّي حده ويلف. الفكرة اللي ورا كله: Go **عمرها ما بتحوّل نوع لنوع لوحدها**. اتشغّل في [[docker run --rm golang:1.25]] (Go 1.25.14)، و [[go vet .]] عدّاه من غير تعليق.

---

## ١. int × float64 = لازم تحويل

~~~go
  qty := 3
  price := 19.5
  total := float64(qty) * price
  fmt.Println(total)
~~~

- [[qty]] نوعه [[int]] و [[price]] نوعه [[float64]] (من شكل القيمة).
- العمليات الحسابية في Go لازم الطرفين **نفس النوع بالظبط**. جربت [[total := qty * price]]:

~~~text الناتج
./main.go:11:12: invalid operation: qty * price (mismatched types int and float64)
~~~

- [[float64(qty)]]: التحويل في Go شكله [[النوع(القيمة)]]. هنا اعمل نسخة float64 من qty (القيمة 3.0)، و qty نفسه فضل int.

~~~text الناتج
58.5
~~~

---

## ٢. سطر القسمة

~~~go
  fmt.Println(int(price), 7/2, 7.0/2, 7%2)
~~~

~~~text الناتج
19 3 3.5 1
~~~

| التعبير | النتيجة | ليه |
|---|---|---|
| [[int(price)]] | 19 | التحويل لـ int بيقطع الكسر (19.5 → 19)، مش بيقرّب |
| [[7/2]] | 3 | int على int = int، والكسر بيضيع |
| [[7.0/2]] | 3.5 | [[7.0]] عشري، فالعملية كلها بقت float |
| [[7%2]] | 1 | [[%]] باقي القسمة (modulo): 7 = 2×3 + **1** |

ولو عايز تقريب بجد: [[math.Round(9.99)]] طلّعت [[10]]، و [[int(x)]] على متغير قيمته 9.99 طلّعت [[9]]، و [[int(-x)]] طلّعت [[-9]] (القطع ناحية الصفر، مش لتحت).

### فخ: الثابت المكتوب في الكود

جربت [[int(9.99)]] مباشرة (رقم مكتوب، مش متغير):

~~~text الناتج
./main.go:12:26: cannot convert 9.99 (untyped float constant) to type int
~~~

الـ compiler عارف القيمة وشايف إن الكسر هيضيع، فبيرفض. على متغير مش عارف القيمة، فبيعدّي ويقطع.

---

## ٣. [[strconv.Atoi]]: نص → رقم

~~~go
  n, err := strconv.Atoi("42")
  fmt.Println(n+1, err)
~~~

- [[strconv]] = string conversion. [[Atoi]] = ASCII to integer (الاسم جاي من دالة قديمة في C).
- بترجّع **قيمتين**: الرقم، و [[error]]. ليه error؟ لأن مش أي نص رقم.

~~~text الناتج
43 <nil>
~~~

[[n+1]] = 43 يثبت إن n رقم بجد مش نص، و [[<nil>]] يعني مفيش error.

~~~go
  _, err = strconv.Atoi("42abc")
  fmt.Println(err)
~~~

- [[_]]: الرقم مش محتاجينه (هيبقى 0 أصلًا لما فيه error).
- [[=]] مش [[:=]]: err موجود، و [[_]] مش متغير جديد، فمفيش جديد على الشمال.

~~~text الناتج
strconv.Atoi: parsing "42abc": invalid syntax
~~~

الرسالة فيها ٣ حاجات: الدالة، والنص اللي فشل، والسبب. وجربت رقم أكبر من int64 ([["99999999999999999999"]]):

~~~text الناتج
strconv.Atoi: parsing "99999999999999999999": value out of range
~~~

---

## ٤. [[strconv.Itoa]] و [[ParseFloat]]

~~~go
  s := strconv.Itoa(99) + " جنيه"
  f, _ := strconv.ParseFloat("3.75", 64)
  fmt.Println(s, f*2)
~~~

- [[Itoa]] = integer to ASCII: [[99]] → [["99"]]. و [[+]] بين نصين بيلزقهم.
- [[ParseFloat("3.75", 64)]]: نص → float64. الـ [[64]] الدقة (bitSize): 64 لـ float64، و 32 لو هتحوّل لـ float32. الـ error اترمى في [[_]] لأن النص ثابت ومعروف إنه صح (في كود حقيقي متعملش كده مع نص جاي من يوزر).
- وفيه [[strconv.ParseBool("true")]] طلّعت [[true <nil>]].

~~~text الناتج
99 جنيه 7.5
~~~

---

## ٥. الـ overflow

~~~go
  var small int8 = 127
  small++
  fmt.Println(small)
~~~

- [[int8]]: رقم صحيح في 8 bits. 8 bits فيها 256 قيمة، ونصهم سالب، فالمدى من -128 لـ 127.
- [[var small int8 = 127]]: [[var]] بنوع وقيمة مع بعض، لأن [[small := 127]] كانت هتعمله int.
- [[small++]]: زوّد 1 (زي [[small = small + 1]]). في Go [[++]] statement لوحده، مينفعش [[x = small++]].

~~~text الناتج
-128
~~~

مفيش error ولا panic: الرقم لف من آخر المدى لأوله. نفس اللي بيحصل في عداد عربية قديم بيلف من 99999 لـ 00000.

| النوع | المدى |
|---|---|
| [[int8]] | -128 .. 127 |
| [[uint8]] / [[byte]] | 0 .. 255 |
| [[int32]] / [[rune]] | حوالي ± 2.1 مليار |
| [[int64]] / [[int]] (على 64 bit) | حوالي ± 9.2 × 10 أُس 18 |

---

## ٦. الـ try: [[string(65)]] و [[strconv.Itoa(65)]]

~~~text الناتج: go run .
A
65
~~~

- [[string(65)]]: حوّل الرقم لـ **الحرف** اللي رقمه 65 في Unicode، وهو [[A]].
- [[strconv.Itoa(65)]]: الرقم مكتوب كنص.

~~~text الناتج: go vet .
./main.go:10:15: conversion from untyped int to string yields a string of one rune, not a string of digits
~~~

vet بيمسكها لأنها غلطة مشهورة. لاحظ إن [[go run]] اشتغل عادي، vet بس اللي اشتكى.

### [[0.1 + 0.2]]

~~~text الناتج
0.30000000000000004 false
~~~

ده لـ [[a, b := 0.1, 0.2]] ثم [[a+b, a+b == 0.3]]. الـ float بيتخزن binary، و 0.1 مالهاش تمثيل binary مظبوط (زي 1/3 في العشري). عشان كده الفلوس تتخزن قروش في int. (ولو كتبتها ثوابت [[0.1+0.2 == 0.3]] طلعت [[true]]، لأن الثوابت بتتحسب بدقة كاملة وقت الـ compile.)

---

## الخلاصة

| عايز | اكتب | ملاحظة |
|---|---|---|
| int ↔ float64 | [[float64(n)]] / [[int(f)]] | int() بيقطع |
| نص → int | [[strconv.Atoi(s)]] | رقم + error |
| int → نص | [[strconv.Itoa(n)]] أو [[fmt.Sprint(n)]] | مش [[string(n)]] |
| نص → float | [[strconv.ParseFloat(s, 64)]] | |
| تقريب | [[math.Round(f)]] | |

- int على int = int ([[7/2 = 3]]).
- الـ overflow بيلف بصمت.
- اقرا الـ error بتاع strconv، متتجاهلوش.`,
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            R`strconv: التحويل بين النصوص والأرقام.`,
            "قفلة.",
            "main.",
            "int.",
            "float64.",
            R`[[float64(qty)]] تحويل صريح، من غيره compile error.`,
            "58.5.",
            R`19 (قطع الكسر من 19.5)، و 3 (قسمة int)، و 3.5، و 1 (باقي القسمة).`,
            R`نص لرقم: الرقم و error.`,
            R`43 و [[<nil>]].`,
            R`نص مش رقم: الرقم بنرميه ([[_]]) والـ error فيه السبب. [[=]] لأن err موجود.`,
            "اطبع الـ error.",
            R`رقم لنص، و [[+]] بين نصين بتلزقهم.`,
            R`نص لـ float64 (الـ 64 هي الدقة).`,
            R`[[99 جنيه 7.5]].`,
            R`int8 بأكبر قيمة.`,
            R`[[++]] بتزوّد واحد.`,
            "-128: لفّ.",
            "قفلة."
          ],
          sol: R`الناتج:
[[58.5]]
[[19 3 3.5 1]]
[[43 <nil>]]
[[strconv.Atoi: parsing "42abc": invalid syntax]]
[[99 جنيه 7.5]]
[[-128]]

وفي التجربة: [[string(65)]] بتطبع [[A]] و [[strconv.Itoa(65)]] بتطبع [[65]]. و [[go vet .]] بيقول [[conversion from untyped int to string yields a string of one rune, not a string of digits]]. و [[qty * price]] من غير تحويل: [[invalid operation: qty * price (mismatched types int and float64)]].`
        },
        {
          cmd: "string و rune و byte",
          title: "النص العربي جوه string: بايتات و runes و UTF-8",
          desc: R`الـ string في Go سلسلة بايتات مبتتغيرش (immutable)، وغالبًا متشفرة UTF-8. في UTF-8 الحرف الإنجليزي بايت واحد، والحرف العربي بايتين، والإيموجي ٤. عشان كده:
• [[len("سلام")]] = 8 مش 4: [[len]] بتعد بايتات مش حروف.
• [[s[0]]] بيرجّع أول بايت (رقم من نوع byte)، مش أول حرف.

الحرف الواحد (Unicode code point) اسمه [[rune]] وبيتكتب بين علامتين مفردتين: [['س']]. وعشان تمشي على الحروف مش البايتات:
• [[for i, r := range s]]: r هو الحرف (rune)، و i مكانه بالبايت.
• [[utf8.RuneCountInString(s)]]: عدد الحروف.
• [[[]rune(s)]]: يحوّل النص لقايمة حروف، فتقدر تقص بالحروف.

الباكدج [[strings]] فيها كل اللي هتحتاجه: [[Contains]] و [[HasPrefix]] و [[Split]] و [[Fields]] (تقسيم على المسافات) و [[Join]] و [[TrimSpace]] و [[ReplaceAll]] و [[ToUpper]].

ولو هتبني نص كبير في loop استخدم [[strings.Builder]] بدل [[+=]]، لأن كل [[+=]] بيعمل نسخة جديدة من النص كله.

والنص ممكن يتكتب بين backticks: ده raw string، مفيهوش [[\n]] ولا escaping، وبيمتد على أكتر من سطر. مفيد للـ JSON والـ SQL والـ regex.`,
          example: R`package main

import (
  "fmt"
  "strings"
  "unicode/utf8"
)

func main() {
  s := "سلام Go"
  fmt.Println(len(s), utf8.RuneCountInString(s))
  fmt.Println(s[0], s[len(s)-1], string(s[len(s)-1]))

  for i, r := range "سلا" {
    fmt.Println(i, string(r), r)
  }

  runes := []rune(s)
  fmt.Println(string(runes[:4]))

  fmt.Println(strings.Contains(s, "Go"), strings.ToUpper("go"))
  words := strings.Fields("  Go   سهلة   وسريعة ")
  fmt.Println(len(words), strings.Join(words, "-"))

  query := $__btSELECT name
FROM users$__bt
  fmt.Println(strings.Count(query, "\n"))
}`,
          try: R`اكتب دالة [[reverse(s string) string]] بتعكس نص. جرّبها الأول بالبايتات ([[[]byte(s)]]) على [["سلام"]] وشوف النتيجة، وبعدين بالـ runes ([[[]rune(s)]]).`,
          flag: "script",
          deep: {
            why: R`أي برنامج بيتعامل مع يوزرز عرب هيقابل ده: تحدد طول اسم بـ len فتلاقي «محمد» 8، أو تقص أول 10 حروف من عنوان بالبايتات فتقطع حرف في النص ويطلع [[�]] على الشاشة. لو فهمت الفرق بين byte و rune المشاكل دي بتختفي.`,
            how: R`[[s[0]]] = 216: أول بايت من حرف «س» (الحرف ده في UTF-8 بايتين: 216 و 179). و [[s[len(s)-1]]] = 111 وده حرف o، و [[string(byte)]] بيحوّله نص.

[[range]] على string بيفك UTF-8 لوحده: المرة الأولى i = 0 و r = 'س' (رقمه 1587)، والتانية i = 2 لأن «س» خد بايتين، وهكذا. لو النص فيه بايتات مش UTF-8 صح، range بيرجّع الحرف [[U+FFFD]] (�).

[[[]rune(s)]] بيعمل نسخة جديدة كلها runes (كل واحدة ٤ بايت)، فمتستخدمهاش في loop على نص ضخم من غير داعي.

ملحوظة: الـ rune مش دايمًا «حرف» زي ما العين بتشوفه: إيموجي العلم أو الحرف بالتشكيل ممكن يبقى أكتر من rune. للحالات دي فيه مكتبة [[golang.org/x/text]].`,
            when: R`[[len]] لما تحسب حجم بالبايت (حدود الداتابيز، الـ body). [[utf8.RuneCountInString]] لما تتحقق من طول اسم أو تعليق. [[range]] أو [[[]rune]] لما تقص أو تعكس أو تمشي حرف حرف.`,
            mistakes: R`[[len(name) > 50]] كتحقق على عدد الحروف، فالاسم العربي يتقبل نصه بس. وتقص [[s[:10]]] على نص عربي فيطلع حرف مكسور. وتبني نص بـ [[+=]] في loop على آلاف العناصر. وتكتب [["c"]] وانت عايز rune: [["c"]] string و [['c']] rune.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بياخد نص فيه عربي وإنجليزي ([["سلام Go"]]) ويوريك الفرق بين **البايتات** و**الحروف**: الطول بكل طريقة، وأول وآخر بايت، واللف على الحروف، والقص الصح، وشوية دوال من [[strings]]، وفي الآخر raw string. اتشغّل في [[docker run --rm golang:1.25]] (Go 1.25.14)، و [[go vet .]] عدّاه.

---

## ١. الفكرة الأساسية: UTF-8

الكمبيوتر بيخزّن أرقام بس. كل حرف ليه رقم في جدول اسمه **Unicode** (اسمه code point، وبيتكتب [[U+0633]] بالـ hex): [[A]] = 65، و «س» = 1587. و **UTF-8** طريقة كتابة الأرقام دي كبايتات:

| الحرف | رقمه | عدد البايتات في UTF-8 |
|---|---|---|
| إنجليزي ([[G]]) | 71 | 1 |
| عربي («س») | 1587 | 2 ([[216 179]]) |
| إيموجي | فوق 65535 | 4 |

الـ [[string]] في Go = بايتات UTF-8 ورا بعض، ومبتتغيرش (immutable). جربت [[[]byte("س")]] وطلّعت [[[216 179]]]، و [[fmt.Sprintf("%U", 'س')]] طلّعت [[U+0633]].

---

## ٢. [[len]] و [[RuneCountInString]]

~~~go
  s := "سلام Go"
  fmt.Println(len(s), utf8.RuneCountInString(s))
~~~

~~~text الناتج
11 7
~~~

- [[len(s)]]: عدد **البايتات**: 4 حروف عربي × 2 = 8، + مسافة (1) + [[G]] (1) + [[o]] (1) = **11**.
- [[utf8.RuneCountInString(s)]]: عدد **الحروف** (runes): س ل ا م + مسافة + G + o = **7**. [[utf8]] باكدج اسمها الكامل [[unicode/utf8]]، بتستخدمها باسمها الأخير.

---

## ٣. [[s[0]]] وآخر بايت

~~~go
  fmt.Println(s[0], s[len(s)-1], string(s[len(s)-1]))
~~~

~~~text الناتج
216 111 o
~~~

- [[s[0]]]: الـ index على string بيرجّع **بايت** (نوعه [[uint8]]، واسمه التاني [[byte]])، مش حرف. 216 = أول بايت من «س».
- [[s[len(s)-1]]]: آخر index = الطول ناقص 1 (الترقيم من 0). البايت 111 = [[o]].
- [[string(...)]] على byte بيرجّعه حرف: [[o]]. نفع هنا لأن [[o]] بايت واحد. لو جربت تقص [[s[:3]]] (أول ٣ بايتات) طلعت [[س�]]: «س» كاملة (بايتين) + نص حرف «ل» مكسور، اتطبع [[�]].

و [[fmt.Printf("%T %T\n", 'س', s[0])]] طلّعت [[int32 uint8]]: الحرف بين [[' ']] نوعه rune (= int32)، والـ index نوعه byte (= uint8).

---

## ٤. [[for i, r := range]] على نص

~~~go
  for i, r := range "سلا" {
    fmt.Println(i, string(r), r)
  }
~~~

- [[for ... range]]: لف على العناصر واحد واحد. على string، [[range]] بيفك UTF-8 لوحده ويديك **حرف** كل لفة.
- [[i]]: مكان الحرف **بالبايت** (مش رقمه في الترتيب).
- [[r]]: الحرف نفسه كـ [[rune]] (رقمه في Unicode). و [[string(r)]] بيرجّعه حرف تتقريه.

~~~text الناتج
0 س 1587
2 ل 1604
4 ا 1575
~~~

i بيقفز 0 ← 2 ← 4، لأن كل حرف عربي بايتين. والأرقام 1587 و 1604 و 1575 أرقام الحروف في Unicode.

ولو النص فيه بايت مش UTF-8 سليم؟ جربت [[range "a\xffb"]] ([[\xff]] بايت قيمته 255 لوحده):

~~~text الناتج
0 97 a
1 65533 �
2 98 b
~~~

65533 = [[U+FFFD]]، الحرف [[�]] اللي معناه «هنا كان فيه بايتات بايظة».

---

## ٥. [[[]rune(s)]]: القص بالحروف

~~~go
  runes := []rune(s)
  fmt.Println(string(runes[:4]))
~~~

- [[[]rune]]: slice (قايمة) من runes. التحويل ده بيفك النص كله لحروف، كل حرف في خانة.
- [[runes[:4]]]: أول 4 **خانات** (من 0 لحد قبل 4)، يعني أول 4 حروف.
- [[string(...)]]: رجّعهم نص.

~~~text الناتج
سلام
~~~

---

## ٦. دوال [[strings]]

~~~go
  fmt.Println(strings.Contains(s, "Go"), strings.ToUpper("go"))
  words := strings.Fields("  Go   سهلة   وسريعة ")
  fmt.Println(len(words), strings.Join(words, "-"))
~~~

~~~text الناتج
true GO
3 Go-سهلة-وسريعة
~~~

| الدالة | بتعمل إيه | هنا |
|---|---|---|
| [[strings.Contains(s, sub)]] | فيه sub جوه s؟ | [[true]] |
| [[strings.ToUpper]] | حروف كبيرة | [[GO]] (العربي ملوش كبير وصغير) |
| [[strings.Fields]] | قسّم على أي عدد مسافات وشيل اللي في الأطراف | [[[Go سهلة وسريعة]]] |
| [[len(words)]] | طول الـ slice | 3 |
| [[strings.Join(words, "-")]] | لزّق العناصر وبينهم [[-]] | [[Go-سهلة-وسريعة]] |

[[Fields]] غير [[strings.Split(s, " ")]]: Split كانت هتطلّع خانات فاضية مكان كل مسافة زيادة.

---

## ٧. raw string

~~~go
  query := $__btSELECT name
FROM users$__bt
  fmt.Println(strings.Count(query, "\n"))
~~~

- النص بين **backticks** (العلامة اللي تحت Esc) اسمه raw string: بيتاخد حرفيًا. مفيش escapes ([[\n]] جواه هتفضل حرفين: [[\]] و [[n]])، وينفع يمتد على كذا سطر. السطر الجديد الحقيقي بين [[name]] و [[FROM]] جزء من النص.
- السطر التاني لازق في أول السطر عمدًا: أي مسافات قبل [[FROM]] كانت هتبقى جزء من النص.
- [[strings.Count(query, "\n")]]: عد مرات ظهور السطر الجديد. هنا [["\n"]] بين [[" "]] عادية، فـ [[\n]] = حرف السطر الجديد.

~~~text الناتج
1
~~~

---

## ٨. الـ try: [[reverse]]

~~~go solCode
func reverse(s string) string {
  r := []rune(s)
  for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
    r[i], r[j] = r[j], r[i]
  }
  return string(r)
}
~~~

- [[r := []rune(s)]]: حروف، مش بايتات.
- الـ [[for]] بـ ٣ أجزاء مفصولة بـ [[;]]: البداية ([[i]] من أول القايمة و [[j]] من آخرها)، والشرط ([[i < j]]: لسه مااتقابلوش)، والخطوة (i لقدام و j لورا).
- [[r[i], r[j] = r[j], r[i]]]: بدّل الحرفين (نفس حركة [[a, b = b, a]]).

~~~text الناتج: reverse("سلام")، reverse("Go سهلة")
مالس ةلهس oG
~~~

ونفس الدالة بـ [[[]byte(s)]] بدل [[[]rune(s)]] على [["سلام"]]:

~~~text الناتج: النص، و utf8.ValidString
�٧؄ٳ� false
~~~

~~~text الناتج: نفس النص بـ %q
"\x85٧\u0604ٳ\xd8"
~~~

قلب البايتات قلب ترتيب البايتين **جوه** كل حرف، فبقت تركيبات تانية: شوية منها بالصدفة حروف تانية خالص (٧ و ٳ)، والباقي بايتات مش UTF-8 أصلًا ([[\x85]] و [[\xd8]]). و [[utf8.ValidString]] أكدت إن النص بايظ ([[false]]).

---

## الخلاصة

| عايز | استخدم |
|---|---|
| الحجم بالبايت | [[len(s)]] |
| عدد الحروف | [[utf8.RuneCountInString(s)]] |
| تلف حرف حرف | [[for i, r := range s]] (i بالبايت) |
| تقص أو تعكس بالحروف | [[[]rune(s)]] |
| حرف واحد | [['س']] (rune = int32) |
| بايت واحد | [[s[i]]] (byte = uint8) |
| نص على كذا سطر من غير escapes | raw string بين backticks |

- العربي = 2 بايت للحرف، فـ [[len]] بيضاعف.
- القص بالبايتات على عربي بيكسر الحروف ([[�]]).`,
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            "strings: دوال النصوص.",
            R`unicode/utf8: عدّ الحروف وفحص الـ UTF-8.`,
            "قفلة.",
            "main.",
            "نص فيه عربي وإنجليزي.",
            R`11 بايت (4 حروف عربي × 2 + مسافة + G + o) و 7 حروف.`,
            R`أول بايت (216)، وآخر بايت (111)، وآخر بايت كنص (o).`,
            R`range على نص: i مكان البايت و r الحرف (rune).`,
            "اطبع المكان والحرف ورقمه في Unicode.",
            "قفلة الـ for.",
            "حوّل النص لـ runes.",
            "أول 4 حروف صح: سلام.",
            "فيه Go؟ وتحويل لحروف كبيرة.",
            "قسّم على أي عدد مسافات وشيل اللي في الأطراف.",
            R`3 كلمات، ووصّلهم بـ [[-]].`,
            R`raw string بين backticks على سطرين.`,
            "كمّلة الـ raw string.",
            R`فيه سطر جديد واحد جواه.`,
            "قفلة."
          ],
          sol: R`الناتج:
[[11 7]]
[[216 111 o]]
[[0 س 1587]]
[[2 ل 1604]]
[[4 ا 1575]]
[[سلام]]
[[true GO]]
[[3 Go-سهلة-وسريعة]]
[[1]]

والـ reverse بالبايتات على [["سلام"]] بيطلع حاجة زي [[�٧؄ٳ�]]: حروف غلط وعلامات [[�]]، لأنه قلب ترتيب البايتات جوه كل حرف فبقت بايتات ملهاش معنى في UTF-8. بالـ runes بيطلع [[مالس]] صح (الكود تحت).`,
          solCode: R`func reverse(s string) string {
  r := []rune(s)
  for i, j := 0, len(r)-1; i < j; i, j = i+1, j-1 {
    r[i], r[j] = r[j], r[i]
  }
  return string(r)
}`
        },
        {
          cmd: "fmt و Printf",
          title: "fmt: تطبع أي قيمة وتعرف نوعها (%v و %+v و %T و %q)",
          desc: R`الباكدج [[fmt]] فيها ٣ عائلات:
• [[Print]] و [[Println]] و [[Printf]]: بتطبع على الشاشة (stdout).
• [[Sprint]] و [[Sprintln]] و [[Sprintf]]: نفس الكلام بس بترجّع string بدل ما تطبع.
• [[Fprint]] و [[Fprintln]] و [[Fprintf]]: بتكتب في أي مكان تديهولها (ملف، أو [[os.Stderr]]، أو رد HTTP).
وفيه [[fmt.Errorf]]: زي Sprintf بس بترجّع error.

[[Printf]] بتاخد قالب فيه verbs بتبدأ بـ [[%]]، وكل verb بيتبدّل بقيمة بالترتيب:
• [[%v]]: القيمة بشكلها الافتراضي (أي نوع). و [[%+v]] مع أسماء حقول الـ struct، و [[%#v]] بشكل كود Go.
• [[%T]]: نوع القيمة، مفيد جدًا وانت بتدوّر على bug.
• [[%d]] رقم صحيح، و [[%s]] نص، و [[%q]] نص بين علامات تنصيص (بيبيّن المسافات والـ [[\n]] المستخبية)، و [[%t]] bool.
• [[%f]] عشري، و [[%.2f]] برقمين بعد العلامة.
• العرض: [[%6d]] (6 خانات، والمسافات على الشمال)، و [[%-6s]] (المسافات على اليمين)، و [[%03d]] (أصفار).
• [[%x]] hex، و [[%b]] binary، و [[%%]] علامة % نفسها.

[[Printf]] مش بتضيف سطر جديد، فبتكتب [[\n]] في الآخر. و [[Println]] بتضيفه لوحدها.

في المثال فيه struct ([[type User struct]])، ده نوع فيه حقول بأسماء، وهيتشرح بالتفصيل في درس الـ structs.`,
          example: R`package main

import (
  "fmt"
  "os"
)

type User struct {
  Name string
  Age  int
}

func main() {
  u := User{Name: "Sara", Age: 25}
  fmt.Printf("%v\n", u)
  fmt.Printf("%+v\n", u)
  fmt.Printf("%#v\n", u)
  fmt.Printf("%T %T %T\n", u, 3.5, []string{})
  fmt.Printf("%q %d %t\n", "hi ", 42, true)
  fmt.Printf("[%6.2f] [%-6s] [%6s] [%03d]\n", 3.14159, "go", "go", 7)
  fmt.Printf("%x %X %b %%\n", 255, 255, 5)
  msg := fmt.Sprintf("%s عندها %d سنة", u.Name, u.Age)
  fmt.Println(msg)
  fmt.Fprintln(os.Stderr, "ده بيروح على stderr")
}`,
          try: R`اطبع جدول فاتورة بـ Printf: ٣ منتجات، كل سطر فيه الاسم بعرض 10 على اليمين ([[%-10s]])، والكمية بعرض 3، والسعر بعرض 8 برقمين عشريين، وسطر أخير بالإجمالي. وبعدين شغّل البرنامج بـ [[go run . 2>/dev/null]] وشوف سطر stderr اختفى.`,
          flag: "script",
          deep: {
            why: R`[[%v]] و [[%T]] و [[%+v]] هما أسرع أدوات debug في Go: تطبع القيمة ونوعها وأسماء حقولها في سطر. و [[%q]] بتكشف المسافات الزيادة والـ [[\n]] في نص جاي من يوزر أو من ملف، ودي سبب مقارنات كتير بتفشل من غير سبب واضح.`,
            how: R`لو النوع عنده [[String() string]] (يعني بيحقق [[fmt.Stringer]])، الـ [[%v]] و [[%s]] و Println بيستخدموها. ولو عنده [[Error() string]] بيستخدموها قبلها.

لو الـ verb مش مناسب للقيمة، fmt مش بتقع: بتطبع [[%!d(string=hi)]]. وعدد قيم أقل من الـ verbs: [[%!d(MISSING)]]. وأكتر: [[%!(EXTRA int=5)]]. go vet بيمسك الحالات دي قبل التشغيل.

[[os.Stdout]] و [[os.Stderr]] الاتنين بيظهروا في الترمنال، بس الـ shell بيفرّق بينهم: [[> file]] بتحوّل stdout بس، و [[2> file]] بتحوّل stderr. فالرسايل والأخطاء على stderr، والناتج الحقيقي على stdout، عشان اللي بيستخدم برنامجك في pipe ([[|]]) ياخد الناتج نضيف.`,
            when: R`[[Println]] للطباعة السريعة. [[Printf]] للتنسيق. [[Sprintf]] لبناء نص (رسالة، مفتاح كاش). [[Errorf]] للأخطاء. و [[Fprintf(w, ...)]] لما تكتب في ملف أو رد HTTP. وفي السيرفر الحقيقي اللوج بـ [[log/slog]] (المستوى ٣) مش fmt.`,
            mistakes: R`تنسى [[\n]] في آخر Printf فالسطور تلزق في بعض. وتستخدم [[%d]] مع float أو [[%s]] مع int. وتستخدم [[Println]] بقالب فيه [[%s]]: Println مبتفهمش الـ verbs وهتطبعها زي ما هي.`
          },
          teach: R`## البرنامج بيعمل إيه؟

بيطبع نفس القيمة (struct اسمه User) بأكتر من شكل، وبعدين يجرّب verbs الأرقام والنصوص والعرض والمحاذاة، ويبني نص بـ [[Sprintf]]، ويكتب سطر على stderr. اتشغّل في [[docker run --rm golang:1.25]] (Go 1.25.14)، و [[go vet .]] عدّاه.

---

## ١. القالب والـ verbs

~~~go
fmt.Printf("%v\n", u)
~~~

[[Printf]] = print formatted. أول argument **قالب** (format string)، وفيه علامات بتبدأ بـ [[%]] اسمها **verbs**. كل verb بيتبدّل بالقيمة اللي عليها الدور من القيم اللي بعد القالب، بالترتيب. و [[\n]] حرف السطر الجديد، لأن Printf مش بتضيفه لوحدها.

---

## ٢. الـ struct

~~~go
type User struct {
  Name string
  Age  int
}
...
  u := User{Name: "Sara", Age: 25}
~~~

- [[type User struct { ... }]]: نوع جديد فيه حقول (fields) بأسامي وأنواع. له درس كامل بعدين.
- [[User{Name: "Sara", Age: 25}]]: قيمة من النوع ده، وكل حقل باسمه.

---

## ٣. [[%v]] و [[%+v]] و [[%#v]]

~~~text الناتج
{Sara 25}
{Name:Sara Age:25}
main.User{Name:"Sara", Age:25}
~~~

| الـ verb | بيطبع | مفيد لإيه |
|---|---|---|
| [[%v]] | القيم بس (v = value) | الطباعة العادية |
| [[%+v]] | [[+]] = ضيف أسماء الحقول | الـ debug: تعرف كل رقم بتاع إيه |
| [[%#v]] | [[#]] = بشكل كود Go: النوع وعلامات التنصيص | تنسخ القيمة في test |

[[main.User]]: اسم النوع ومعاه اسم الباكدج اللي هو فيها.

---

## ٤. [[%T]]: النوع

~~~go
  fmt.Printf("%T %T %T\n", u, 3.5, []string{})
~~~

~~~text الناتج
main.User float64 []string
~~~

٣ verbs، فـ ٣ قيم بعد القالب. [[3.5]] نوعه الافتراضي [[float64]]، و [[[]string{}]] slice فاضية من النصوص. لما تبقى مش متأكد متغير نوعه إيه، [[%T]] أسرع إجابة.

---

## ٥. [[%q]] و [[%d]] و [[%t]]

~~~go
  fmt.Printf("%q %d %t\n", "hi ", 42, true)
~~~

~~~text الناتج
"hi " 42 true
~~~

- [[%q]] (quoted): النص بين [[" "]]، فالمسافة اللي في آخر [["hi "]] بانت. وكمان بيكتب الحروف الخفية كـ escapes: جربت [[fmt.Printf("%q\n", "a\tb\n")]] وطلع [["a\tb\n"]] (tab وسطر جديد ظاهرين).
- [[%d]] (decimal): رقم صحيح.
- [[%t]] (truth): bool.

---

## ٦. العرض والمحاذاة

~~~go
  fmt.Printf("[%6.2f] [%-6s] [%6s] [%03d]\n", 3.14159, "go", "go", 7)
~~~

~~~text الناتج
[  3.14] [go    ] [    go] [007]
~~~

الأقواس [[[ ]]] جزء من القالب، حطيناها عشان المسافات تبان. الشكل العام: [[%]] + flags + عرض + [[.]]دقة + الـ verb.

| الـ verb | معناه | الناتج |
|---|---|---|
| [[%6.2f]] | float، عرض 6 خانات، رقمين بعد العلامة | [[  3.14]]: 4 حروف + مسافتين على الشمال |
| [[%-6s]] | نص، عرض 6، [[-]] = محاذاة شمال | [[go    ]] |
| [[%6s]] | نص، عرض 6 (يمين افتراضيًا) | [[    go]] |
| [[%03d]] | رقم، عرض 3، [[0]] = املا بأصفار | [[007]] |

العرض **أقل حاجة**: لو القيمة أطول منه بتتطبع كاملة.

---

## ٧. [[%x]] و [[%X]] و [[%b]] و [[%%]]

~~~text الناتج: fmt.Printf("%x %X %b %%\n", 255, 255, 5)
ff FF 101 %
~~~

- [[%x]] / [[%X]]: hex (أساس 16) بحروف صغيرة / كبيرة. 255 = 15×16 + 15 = [[ff]].
- [[%b]]: binary. 5 = 4 + 1 = [[101]].
- [[%%]]: علامة [[%]] نفسها. مش verb فمش بتاخد قيمة: ٣ verbs و ٣ قيم.

---

## ٨. [[Sprintf]] و [[Fprintln]]

~~~go
  msg := fmt.Sprintf("%s عندها %d سنة", u.Name, u.Age)
  fmt.Println(msg)
  fmt.Fprintln(os.Stderr, "ده بيروح على stderr")
~~~

- [[Sprintf]] (S = string): نفس Printf بس **بترجّع** النص بدل ما تطبعه. [[%s]] نص و [[u.Name]] حقل من الـ struct بالنقطة.
- [[Fprintln]] (F = file): بتكتب في أي حاجة تديهالها كأول argument. [[os.Stderr]] = مخرج الأخطاء (standard error)، وهو قناة منفصلة عن [[os.Stdout]] (اللي Println بتكتب فيه).

~~~text الناتج
Sara عندها 25 سنة
ده بيروح على stderr
~~~

### [[2>/dev/null]]

~~~bash
go run . 2>/dev/null
~~~

[[2>]] حوّل القناة رقم 2 (stderr) لـ [[/dev/null]] (ملف بيبلع أي حاجة). الناتج طلع كل السطور **ما عدا** [[ده بيروح على stderr]]. ده الهدف من الفصل: اللي بيعمل pipe لبرنامجك ياخد الناتج نضيف.

> لما شغلت من غير التحويل، سطر stderr ظهر **قبل** الباقي، لأن docker بيوصّل القناتين كل واحدة لوحدها، فالترتيب بينهم مش مضمون. في ترمنال عادي هتلاقيه في مكانه.

---

## ٩. لما الـ verb والقيمة مايتطابقوش

fmt مش بتقع، بتكتب الغلطة جوه الناتج:

~~~text الناتج
%!d(string=hi) 1 %!d(MISSING) 1%!(EXTRA int=5)
%s x
~~~

| الكود | الناتج |
|---|---|
| [[Sprintf("%d", "hi")]] | [[%!d(string=hi)]]: [[%d]] جالها نص |
| [[Sprintf("%d %d", 1)]] | [[1 %!d(MISSING)]]: قيمة ناقصة |
| [[Sprintf("%d", 1, 5)]] | [[1%!(EXTRA int=5)]]: قيمة زيادة |
| [[Println("%s", "x")]] | [[%s x]]: Println مبتفهمش verbs |

و [[go vet .]] مسكهم كلهم قبل التشغيل:

~~~text الناتج: go vet .
./main.go:17:28: fmt.Sprintf format %d has arg "hi" of wrong type string
./main.go:17:56: fmt.Sprintf format %d reads arg #2, but call has 1 arg
./main.go:17:65: fmt.Sprintf call needs 1 arg but has 2 args
./main.go:18:3: fmt.Println call has possible Printf formatting directive %s
~~~

---

## ١٠. الحل: الفاتورة

~~~go solCode
items := []struct {
  name  string
  qty   int
  price float64
}{{"قهوة", 2, 45.5}, {"شاي", 1, 20}, {"كيك", 3, 35.25}}
total := 0.0
for _, it := range items {
  fmt.Printf("%-10s %3d %8.2f\n", it.name, it.qty, it.price)
  total += float64(it.qty) * it.price
}
fmt.Printf("%-10s %12.2f\n", "الإجمالي", total)
~~~

- [[[]struct{...}{...}]]: slice من struct ملوش اسم (anonymous)، ومليانة على طول بـ ٣ عناصر. القيم بالترتيب من غير أسماء الحقول.
- [[total := 0.0]]: [[0.0]] مش [[0]] عشان يبقى float64.
- [[for _, it := range items]]: لف على العناصر. [[_]] بترمي رقم الخانة، و [[it]] العنصر.
- [[%-10s %3d %8.2f]]: الاسم شمال بعرض 10، والكمية يمين بعرض 3، والسعر يمين بعرض 8 ورقمين عشريين.
- [[total += ...]]: زوّد على total. والكمية int فلازم [[float64(it.qty)]].
- السطر الأخير: [[%12.2f]] = 3 + مسافة + 8 = 12، عشان الإجمالي ييجي تحت عمود السعر.

~~~text الناتج
قهوة         2    45.50
شاي          1    20.00
كيك          3    35.25
الإجمالي         216.75
~~~

الحساب: 2×45.5 + 1×20 + 3×35.25 = 91 + 20 + 105.75 = **216.75**. والعرض بيتحسب بالحروف (runes) مش البايتات: [[قهوة]] 4 حروف + 6 مسافات = 10.

---

## الخلاصة

| الـ verb | لـ |
|---|---|
| [[%v]] / [[%+v]] / [[%#v]] | أي قيمة / بأسماء الحقول / بشكل كود |
| [[%T]] | النوع |
| [[%d]] / [[%s]] / [[%q]] / [[%t]] | int / نص / نص بين علامات / bool |
| [[%.2f]] / [[%8.2f]] | عشري برقمين / وبعرض 8 |
| [[%-10s]] / [[%03d]] | شمال / أصفار |
| [[%x]] / [[%b]] / [[%%]] | hex / binary / علامة % |

| العائلة | بتعمل إيه |
|---|---|
| [[Print...]] | stdout |
| [[Sprint...]] | ترجّع string |
| [[Fprint...]] | أي writer ([[os.Stderr]]، ملف، رد HTTP) |
| [[Errorf]] | ترجّع error: [[fmt.Errorf("user %d not found", 7)]] طبعت [[user 7 not found]] |

- Printf محتاجة [[\n]]، و Println لأ (ومبتفهمش verbs).
- fmt مش بتقع لو غلطت، [[go vet]] هو اللي بيمسك.`,
          lines: [
            "باكدج main.",
            "imports.",
            "fmt.",
            R`os، عشان [[os.Stderr]].`,
            "قفلة.",
            "نوع struct فيه حقلين.",
            "حقل الاسم.",
            "حقل السن.",
            "قفلة الـ struct.",
            "main.",
            "قيمة من النوع User.",
            R`[[{Sara 25}]].`,
            R`[[{Name:Sara Age:25}]].`,
            R`[[main.User{Name:"Sara", Age:25}]].`,
            R`الأنواع: [[main.User float64 []string]].`,
            R`[[%q]] بتبيّن المسافة اللي في الآخر.`,
            "عرض ودقة ومحاذاة وأصفار.",
            R`hex صغير وكبير، و binary، وعلامة %.`,
            "Sprintf بترجّع النص بدل ما تطبعه.",
            "اطبعه.",
            "اطبع على stderr مش stdout.",
            "قفلة."
          ],
          sol: R`الناتج:
[[{Sara 25}]]
[[{Name:Sara Age:25}]]
[[main.User{Name:"Sara", Age:25}]]
[[main.User float64 []string]]
[["hi " 42 true]]
[[[  3.14] [go    ] [    go] [007]]]
[[ff FF 101 %]]
[[Sara عندها 25 سنة]]
[[ده بيروح على stderr]]

ومع [[2>/dev/null]] آخر سطر بيختفي لأنه على stderr. والفاتورة (الكود تحت) بتطلع أعمدة متظبطة:
[[قهوة         2    45.50]]
[[شاي          1    20.00]]
[[الإجمالي         216.75]]
لاحظ إن العربي ممكن يبان مش متظبط في بعض الترمنالات لأن العرض بيتحسب بالـ runes، والخط بيرسم الحروف بعرض مختلف.`,
          solCode: R`items := []struct {
  name  string
  qty   int
  price float64
}{{"قهوة", 2, 45.5}, {"شاي", 1, 20}, {"كيك", 3, 35.25}}
total := 0.0
for _, it := range items {
  fmt.Printf("%-10s %3d %8.2f\n", it.name, it.qty, it.price)
  total += float64(it.qty) * it.price
}
fmt.Printf("%-10s %12.2f\n", "الإجمالي", total)`
        }
      ]
    }
  ]
});

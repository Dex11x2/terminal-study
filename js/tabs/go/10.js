// تكملة تاب go: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/go/01.js (شرح حقول الدرس في أوله)
MORE("go", [
    {
      t: "الإنتاج: لوج وإغلاق ونشر",
      l: 3,
      n: "لوج JSON بـ log/slog، وإغلاق نضيف للسيرفر مع SIGTERM، وصورة Docker صغيرة، والبناء لأنظمة تانية، و worker pools و errgroup، وإمتى تحتاج Gin أو chi",
      items: [
        {
          cmd: "log/slog",
          title: "log/slog: لوج structured بمستويات، JSON في الإنتاج",
          desc: R`[[log]] العادية بتطبع سطر نص. في الإنتاج اللوج بيروح لأداة (Loki أو Datadog أو CloudWatch) بتدوّر فيه، والنص الحر صعب تفلتره. [[log/slog]] (Go 1.21+) في المكتبة القياسية وبيكتب structured logs: رسالة ثابتة ومعاها مفاتيح وقيم.

[[slog.Info("server started", "addr", ":8080")]]: الرسالة، وبعدها أزواج مفتاح وقيمة.

المستويات: [[Debug]] و [[Info]] و [[Warn]] و [[Error]]. الافتراضي Info، يعني Debug مش بيظهر إلا لو غيّرت المستوى.

الـ handler بيحدد الشكل:
• [[slog.NewTextHandler]]: [[key=value]]، مريح وانت بتطوّر.
• [[slog.NewJSONHandler]]: سطر JSON لكل لوج، للإنتاج.
وبتعمل logger بـ [[slog.New(handler)]]، و [[slog.SetDefault(logger)]] بيخلي [[slog.Info]] (و log العادية كمان) تستخدمه.

[[logger.With("request_id", "r-42")]] بيرجّع logger فيه المفاتيح دي في كل سطر. بتعمله في أول الـ request وتعدّيه، فكل لوجات الطلب ده تتربط ببعض.

و [[slog.String("k", v)]] و [[slog.Int(...)]] بديل أسرع وأوضح من الأزواج السايبة، و go vet بيشيك إن الأزواج مكتملة.

[[&slog.HandlerOptions{Level: slog.LevelDebug}]]: pointer لـ struct إعدادات.`,
          example: R`package main

import (
  "log/slog"
  "os"
)

func main() {
  logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}))
  slog.SetDefault(logger)

  slog.Info("server started", "addr", ":8080", "env", "prod")
  slog.Debug("cache warmed", "items", 120)

  reqLog := logger.With("request_id", "r-42", "user_id", 7)
  reqLog.Warn("slow query", "ms", 950)
  reqLog.Error("payment failed", slog.String("provider", "paymob"), slog.Int("status", 502))

  text := slog.New(slog.NewTextHandler(os.Stdout, nil))
  text.Info("human readable", "port", 8080)
  text.Debug("hidden by default")
}`,
          try: R`خلي مستوى اللوج ييجي من env: [[LOG_LEVEL=debug]] يطلّع Debug، وأي حاجة تانية Info (استخدم [[slog.LevelVar]] أو [[level.UnmarshalText]]). وبعدين شغّل البرنامج واعمل pipe لـ [[jq]]: [[go run . | jq -c 'select(.level == "ERROR")']].`,
          flag: "script",
          deep: {
            why: R`لما حاجة تقع الساعة ٣ الفجر، اللوج هو كل اللي عندك. structured logs بتخليك تسأل «كل الـ errors لـ user_id 7 في آخر ساعة» أو «كل الطلبات اللي أخدت أكتر من ثانية»، بدل grep على نص كل واحد كاتبه بشكل.`,
            how: R`[[slog.Info]] (الـ default) و [[logger.Info]] نفس الكلام بعد SetDefault. الـ With بيعمل نسخة، والأصلي مبيتغيّرش.

JSONHandler بيطبع [[time]] و [[level]] و [[msg]] وبعدين المفاتيح بتاعتك. الوقت بصيغة RFC 3339 بدقة ميكرو/نانو ثانية.

لو مفتاح من غير قيمة ([[slog.Info("x", "k")]])، بيطلع [[!BADKEY]]. و go vet بيمسك ده.

في السيرفر، الـ middleware بيعمل request ID ([[crypto/rand]] أو header جاي من الـ load balancer)، ويعمل [[logger.With("request_id", id)]] ويحطه في الـ context، والـ handlers تاخده من هناك. فيه مكتبات بتعمل ده، أو تكتبه في ٢٠ سطر.

متطبعش أسرار (باسوردات، توكنز، أرقام كروت) في اللوج. ممكن تعمل type عنده method [[LogValue()]] بترجّع [["REDACTED"]].

الأداء: slog سريع كفاية لأغلب السيرفرات. لو محتاج أسرع، zap و zerolog موجودين، وفيه handlers بتربطهم بـ slog.`,
            when: R`في أي سيرفر أو worker: JSON في الإنتاج و Text محليًا (اختار حسب env). مستوى Debug في التطوير، و Info في الإنتاج. و log العادية أو fmt تمام لأدوات CLI الصغيرة.`,
            mistakes: R`رسايل متغيّرة ([[slog.Info("user " + id + " logged in")]]) بدل رسالة ثابتة ومفاتيح: مش هتعرف تجمّعها. ولوج Error لنفس الغلطة في كل طبقة. وتسجيل body الطلبات كله (أسرار وحجم). و [[fmt.Println]] جنب slog فاللوج يبقى نص JSON ونص مش JSON.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

بيعمل logger بيكتب كل سطر JSON، ويطبع بيه ٤ مستويات، ويعمل logger فرعي فيه مفاتيح ثابتة لكل الطلب، وفي الآخر logger نصي للمقارنة.

الناتج من [[go run .]] جوه [[docker run --rm golang:1.25]] (Go 1.25.14).

---

## ١. الـ imports

~~~go main.go
import (
  "log/slog"
  "os"
)
~~~

- [[log/slog]]: s = structured. لوج بمفاتيح وقيم مش نص حر.
- [[os]]: عشان [[os.Stdout]]، المكان اللي هنكتب فيه.

---

## ٢. الـ logger: سطر طويل من جوه لبرة

~~~go main.go
  logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: slog.LevelDebug}))
  slog.SetDefault(logger)
~~~

1. [[slog.LevelDebug]]: ثابت لأقل مستوى. الترتيب: Debug ثم Info ثم Warn ثم Error.
2. [[&slog.HandlerOptions{Level: ...}]]: struct إعدادات، و [[&]] لأن الدالة عايزة pointer ليه. [[Level]] معناها «اطبع من المستوى ده وفوق».
3. [[slog.NewJSONHandler(os.Stdout, opts)]]: **handler**، اللي بيقرر الشكل (JSON) والمكان (stdout).
4. [[slog.New(handler)]]: الـ logger اللي هتنادي عليه [[Info]] و [[Error]].
5. [[slog.SetDefault(logger)]]: خليه الافتراضي، فـ [[slog.Info(...)]] من أي حتة في البرنامج تستخدمه.

---

## ٣. أول سطرين

~~~go main.go
  slog.Info("server started", "addr", ":8080", "env", "prod")
  slog.Debug("cache warmed", "items", 120)
~~~

- أول argument **الرسالة**، ثابتة.
- الباقي **أزواج**: مفتاح، قيمة، مفتاح، قيمة.

~~~text الناتج
{"time":"2026-10-07T16:56:39.0796441Z","level":"INFO","msg":"server started","addr":":8080","env":"prod"}
{"time":"2026-10-07T16:56:39.079778427Z","level":"DEBUG","msg":"cache warmed","items":120}
~~~

- [[time]] و [[level]] و [[msg]]: الـ handler بيحطهم لوحده في الأول. الوقت UTC ([[Z]]) بدقة نانوثانية.
- [[120]] من غير علامات تنصيص: رقم حقيقي في JSON، فأداة اللوج تقدر تعمل [[items > 100]].
- الـ Debug ظهر لأننا وطّينا المستوى.

---

## ٤. [[With]]: مفاتيح ثابتة لكل سطر

~~~go main.go
  reqLog := logger.With("request_id", "r-42", "user_id", 7)
  reqLog.Warn("slow query", "ms", 950)
  reqLog.Error("payment failed", slog.String("provider", "paymob"), slog.Int("status", 502))
~~~

- [[logger.With(...)]]: logger **جديد** كل سطر منه فيه المفاتيح دي. الأصلي مبيتغيّرش.
- [[slog.String(k, v)]] و [[slog.Int(k, v)]]: بدل الأزواج السايبة. النوع واضح، ومستحيل تنسى القيمة.

~~~text الناتج
{"time":"2026-10-07T16:56:39.079794288Z","level":"WARN","msg":"slow query","request_id":"r-42","user_id":7,"ms":950}
{"time":"2026-10-07T16:56:39.079797614Z","level":"ERROR","msg":"payment failed","request_id":"r-42","user_id":7,"provider":"paymob","status":502}
~~~

مفاتيح الـ With جت قبل مفاتيح السطر نفسه. ودلوقتي تقدر تدوّر على [[request_id = r-42]] فتلاقي كل اللي حصل في الطلب ده.

---

## ٥. TextHandler للمقارنة

~~~go main.go
  text := slog.New(slog.NewTextHandler(os.Stdout, nil))
  text.Info("human readable", "port", 8080)
  text.Debug("hidden by default")
~~~

- [[nil]] مكان الإعدادات: الافتراضي، يعني المستوى Info.

~~~text الناتج
time=2026-10-07T16:56:39.079Z level=INFO msg="human readable" port=8080
~~~

- شكل [[key=value]]، والقيمة اللي فيها مسافة بين علامات تنصيص.
- سطر الـ Debug **مطلعش**.

---

## ٦. من غير SetDefault، ومفتاح من غير قيمة

برنامج صغير منفصل من غير أي إعداد:

~~~go main.go
  slog.Info("x", "k")
  slog.Info("default handler", "port", 8080)
  log.Println("old log")
~~~

~~~text الناتج
2026/10/07 16:56:39 INFO x !BADKEY=k
2026/10/07 16:56:39 INFO default handler port=8080
2026/10/07 16:56:39 old log
~~~

- الـ handler الافتراضي بيكتب بنفس شكل [[log]] القديمة (تاريخ ووقت) + المستوى + المفاتيح.
- [[!BADKEY=k]]: [["k"]] لوحدها من غير قيمة، فـ slog مش عارف ده مفتاح ولا قيمة. و go vet بيمسكها:

~~~text الناتج: go vet .
./main.go:9:3: call to slog.Info missing a final value
~~~

---

## ٧. الحل: المستوى من env

~~~go solCode
var level slog.Level
if err := level.UnmarshalText([]byte(os.Getenv("LOG_LEVEL"))); err != nil {
  level = slog.LevelInfo
}
logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: level}))
slog.SetDefault(logger)
slog.Debug("visible only with LOG_LEVEL=debug")
~~~

- [[var level slog.Level]]: [[slog.Level]] رقم (Debug = -4، Info = 0، Warn = 4، Error = 8). والقيمة الصفرية Info.
- [[level.UnmarshalText([]byte(...))]]: بتحوّل نص زي [["debug"]] أو [["WARN"]] لـ Level. بتاخد bytes فبنحوّل. ومش بتفرّق بين كبير وصغير.
- لو النص مش مفهوم (أو فاضي): error، فنرجع لـ Info.

حطيته في main وزوّدت [[slog.Info("always visible")]] تحته:

~~~text الناتج: go run .
{"time":"2026-10-07T16:56:39.275944604Z","level":"INFO","msg":"always visible"}
~~~

~~~text الناتج: LOG_LEVEL=debug go run .
{"time":"2026-10-07T16:56:39.360088067Z","level":"DEBUG","msg":"visible only with LOG_LEVEL=debug"}
{"time":"2026-10-07T16:56:39.360195202Z","level":"INFO","msg":"always visible"}
~~~

و [[LOG_LEVEL=DEBUG]] نفس النتيجة، و [[LOG_LEVEL=loud]] رجع لـ Info.

### jq: فلتر الـ ERROR

~~~bash
go run . | jq -c 'select(.level == "ERROR")'
~~~

- [[jq]]: أداة بتقرا JSON في الترمنال. [[select(...)]] بتسيب السطور اللي الشرط صح فيها بس، و [[-c]] (compact) بتطبع كل نتيجة في سطر.

على المثال الأصلي:

~~~text الناتج
{"time":"2026-10-07T16:56:51.968286086Z","level":"ERROR","msg":"payment failed","request_id":"r-42","user_id":7,"provider":"paymob","status":502}
jq: parse error: Invalid literal at line 5, column 19
~~~

سطر الـ ERROR طلع، وبعدين jq وقف عند السطر الخامس لأنه سطر الـ TextHandler ومش JSON. وده بالظبط اللي بيحصل في الإنتاج لو خلطت [[fmt.Println]] مع لوج JSON.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[slog.NewJSONHandler(os.Stdout, opts)]] | JSON، للإنتاج |
| [[slog.NewTextHandler(os.Stdout, nil)]] | [[key=value]]، للتطوير |
| [[&slog.HandlerOptions{Level: ...}]] | أقل مستوى بيظهر (الافتراضي Info) |
| [[slog.SetDefault(logger)]] | [[slog.Info]] في أي حتة تستخدمه |
| [[slog.Info("msg", "k", v)]] | رسالة ثابتة + أزواج |
| [[logger.With(k, v)]] | logger جديد بمفاتيح ثابتة |
| [[level.UnmarshalText]] | المستوى من نص (env) |

- الرسالة ثابتة والتفاصيل مفاتيح.
- مفتاح من غير قيمة = [[!BADKEY]]، و go vet بيمسكه.`,
          lines: [
            "باكدج main.",
            "imports.",
            R`[[log/slog]].`,
            "os.",
            "قفلة.",
            "main.",
            "logger بـ JSON على stdout، ومستوى Debug.",
            "خليه الافتراضي.",
            "Info بمفتاحين.",
            "Debug: ظاهر لأننا وطّينا المستوى.",
            "logger فيه مفاتيح ثابتة لكل سطر.",
            "Warn.",
            R`Error بـ [[slog.String]] و [[slog.Int]].`,
            R`logger نصي بالإعدادات الافتراضية ([[nil]]).`,
            R`[[key=value]].`,
            "مش هيظهر: الافتراضي Info.",
            "قفلة."
          ],
          sol: R`الناتج (الأوقات هتختلف):
[[{"time":"2026-10-01T12:00:00.123Z","level":"INFO","msg":"server started","addr":":8080","env":"prod"}]]
[[{"time":"...","level":"DEBUG","msg":"cache warmed","items":120}]]
[[{"time":"...","level":"WARN","msg":"slow query","request_id":"r-42","user_id":7,"ms":950}]]
[[{"time":"...","level":"ERROR","msg":"payment failed","request_id":"r-42","user_id":7,"provider":"paymob","status":502}]]
[[time=2026-10-01T12:00:00.124Z level=INFO msg="human readable" port=8080]]

السطر الأخير (Debug) مطلعش. و jq بيطلّع سطر الـ ERROR، وبعدها بيقف عند سطر الـ TextHandler لأنه مش JSON: [[jq: parse error: Invalid literal at line 5, column 19]] (وده بالظبط ليه متخلطش JSON بنص في نفس الـ output). ومستوى اللوج من env في الكود تحت.`,
          solCode: R`var level slog.Level
if err := level.UnmarshalText([]byte(os.Getenv("LOG_LEVEL"))); err != nil {
  level = slog.LevelInfo
}
logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{Level: level}))
slog.SetDefault(logger)
slog.Debug("visible only with LOG_LEVEL=debug")`
        },
        {
          cmd: "signal.NotifyContext و Shutdown",
          title: "إغلاق نضيف: السيرفر يخلّص الطلبات الشغالة قبل ما يقفل مع SIGTERM",
          desc: R`لما Docker أو Kubernetes أو systemd عايزين يقفلوا البرنامج (deploy جديد مثلًا) بيبعتوا [[SIGTERM]]، وبعد مهلة (10 ثواني في Docker افتراضيًا) بيبعتوا [[SIGKILL]] اللي بيقتل فورًا. ومن غير ما تتعامل مع SIGTERM، Go بتقفل على طول، والطلبات اللي في النص بتتقطع.

الخطوات:
1. [[ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)]]: ctx بيتلغي لما توصل إشارة (Ctrl+C هي [[os.Interrupt]]).
2. [[http.Server]] بإعدادات بدل [[http.ListenAndServe]] المختصرة، وشغّله في goroutine.
3. [[<-ctx.Done()]]: main بتستنى الإشارة.
4. [[srv.Shutdown(ctx)]] بمهلة: بيقفل الـ listener (مفيش طلبات جديدة)، ويستنى الطلبات الشغالة تخلص، أو المهلة تخلص.

و [[ListenAndServe]] بترجّع [[http.ErrServerClosed]] بعد Shutdown، ودي مش error حقيقي، عشان كده بنتجاهلها بـ [[errors.Is]].

ونفس الـ struct بيحل مشكلة تانية: الـ timeouts. [[http.ListenAndServe]] المختصرة مفيهاش أي timeout، فعميل بطيء (أو هجوم slowloris) يقدر يمسك اتصالات للأبد. [[ReadHeaderTimeout]] بالذات مهم.`,
          example: R`package main

import (
  "context"
  "errors"
  "log/slog"
  "net/http"
  "os"
  "os/signal"
  "syscall"
  "time"
)

func main() {
  ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
  defer stop()

  mux := http.NewServeMux()
  mux.HandleFunc("GET /slow", func(w http.ResponseWriter, r *http.Request) {
    time.Sleep(3 * time.Second)
    w.Write([]byte("finished\n"))
  })

  srv := &http.Server{
    Addr:              ":8080",
    Handler:           mux,
    ReadHeaderTimeout: 5 * time.Second,
    ReadTimeout:       10 * time.Second,
    WriteTimeout:      15 * time.Second,
    IdleTimeout:       60 * time.Second,
  }

  go func() {
    slog.Info("listening", "addr", srv.Addr)
    if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
      slog.Error("server failed", "err", err)
      os.Exit(1)
    }
  }()

  <-ctx.Done()
  slog.Info("shutting down")
  shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
  defer cancel()
  if err := srv.Shutdown(shutdownCtx); err != nil {
    slog.Error("forced shutdown", "err", err)
  }
  slog.Info("bye")
}`,
          try: R`شغّله، وفي ترمنال تاني [[curl localhost:8080/slow]]، وبسرعة (قبل 3 ثواني) ارجع للأول واضغط Ctrl+C. الـ curl خد الرد ولا اتقطع؟ وبعدين جرّب نفس الكلام بنسخة بـ [[http.ListenAndServe]] العادية من غير Shutdown. وجرّب [[kill -TERM <pid>]] بدل Ctrl+C.`,
          flag: "script",
          deep: {
            why: R`كل deploy بيقفل النسخة القديمة. من غير graceful shutdown كل deploy بيقطع طلبات في النص: دفع اتخصم ومتسجّلش، أو upload اتقطع، أو أخطاء 502 في الـ dashboards كل ما حد يعمل deploy.`,
            how: R`[[signal.NotifyContext]] (Go 1.16+) بيجمع [[signal.Notify]] مع context: أول إشارة بتلغي الـ ctx. و [[stop()]] بيرجّع السلوك العادي، فإشارة تانية (Ctrl+C مرتين) بتقفل على طول.

[[Shutdown]] بيقفل الـ listeners، وبعدين يقفل الاتصالات اللي فاضية، ويستنى اللي شغالة تخلص. لو [[shutdownCtx]] خلص قبلها بيرجّع [[context deadline exceeded]] والطلبات دي بتتقطع. خلي المهلة دي أقل من مهلة الـ orchestrator (Docker 10 ثواني، و Kubernetes [[terminationGracePeriodSeconds]] افتراضيًا 30).

Shutdown مش بيلغي الـ handlers اللي شغالة. لو handler بيعمل حاجة طويلة لازم يسمع لـ [[r.Context()]]، أو تدّي السيرفر [[BaseContext]] بيتلغي مع الإشارة.

الـ timeouts:
• [[ReadHeaderTimeout]]: وقت قراية الـ headers (ضد slowloris).
• [[ReadTimeout]]: الطلب كله بالـ body.
• [[WriteTimeout]]: من آخر الـ headers لحد ما الرد يخلص. لو عندك streaming أو SSE، ده هيقطعه.
• [[IdleTimeout]]: اتصال keep-alive فاضي.

[[os.Exit(1)]] جوه الـ goroutine: لو السيرفر مقدرش يبدأ أصلًا (البورت مشغول) مفيش لازمة نستنى إشارة. وخلي بالك إن os.Exit مش بينفّذ الـ defers.

وبعد Shutdown اقفل باقي الحاجات بالترتيب: workers، وبعدين الداتابيز ([[db.Close()]]).`,
            when: R`أي سيرفر أو worker هيشتغل في Docker أو Kubernetes أو systemd، يعني تقريبًا كل حاجة في الإنتاج. وفي Docker: [[ENTRYPOINT ["/api"]]] بصيغة الـ array عشان الإشارة توصل للبرنامج نفسه مش لـ shell.`,
            mistakes: R`[[http.ListenAndServe]] من غير timeouts في الإنتاج. وتعامل [[ErrServerClosed]] كـ error فاللوج كل deploy يقول server failed. ومهلة Shutdown أطول من مهلة Docker فييجي SIGKILL في النص. و [[CMD npm start]]-style: shell في النص بيبلع SIGTERM. وتنسى إن الـ goroutines الخلفية بتاعتك محتاجة تسمع للـ ctx كمان.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

سيرفر فيه endpoint بطيء ([[/slow]] بياخد 3 ثواني). لما يوصله Ctrl+C أو [[SIGTERM]]:

1. يبطّل يستقبل طلبات جديدة.
2. يستنى الطلبات اللي شغالة تخلص (لحد 10 ثواني).
3. يقفل.

جرّبته جوه [[docker run --rm golang:1.25]] (Go 1.25.14): شغّلت الـ binary في الخلفية، وبعتّ طلب [[/slow]]، وبعد نص ثانية بعتّ إشارة بـ [[kill]] (ده نفس اللي Ctrl+C و [[docker stop]] بيعملوه).

---

## ١. الـ imports الجديدة

~~~go main.go
import (
  "context"
  "errors"
  "log/slog"
  "net/http"
  "os"
  "os/signal"
  "syscall"
  "time"
)
~~~

- [[os/signal]]: استقبال إشارات نظام التشغيل.
- [[syscall]]: فيها أسماء الإشارات الخاصة بالنظام زي [[syscall.SIGTERM]].
- [[log/slog]]: اللوج من الدرس اللي فات. من غير SetDefault بيطبع بشكل [[log]] العادي.

### الإشارات (signals) دي إيه؟

رسالة صغيرة نظام التشغيل بيبعتها لبرنامج شغال:

| الإشارة | مين بيبعتها | البرنامج يقدر يمسكها؟ |
|---|---|---|
| [[SIGINT]] ([[os.Interrupt]] في Go) | Ctrl+C في الترمنال | أيوه |
| [[SIGTERM]] | [[docker stop]] و Kubernetes و systemd و [[kill]] | أيوه |
| [[SIGKILL]] | بعد ما المهلة تخلص، أو [[kill -9]] | لأ، بيموت فورًا |

---

## ٢. ctx بيتلغي مع الإشارة

~~~go main.go
  ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
  defer stop()
~~~

- [[signal.NotifyContext(parent, signals...)]]: ctx بيتلغي أول ما توصل واحدة من الإشارات دي. فبدل ما Go تقفل البرنامج على طول (السلوك الافتراضي)، بتلغي الـ ctx وبس، والقرار بقى في إيدك.
- [[stop]]: بيرجّع السلوك العادي. فلو حد داس Ctrl+C تاني، البرنامج يقفل فورًا.

---

## ٣. [[http.Server]] بدل [[http.ListenAndServe]]

~~~go main.go
  srv := &http.Server{
    Addr:              ":8080",
    Handler:           mux,
    ReadHeaderTimeout: 5 * time.Second,
    ReadTimeout:       10 * time.Second,
    WriteTimeout:      15 * time.Second,
    IdleTimeout:       60 * time.Second,
  }
~~~

[[http.ListenAndServe(addr, mux)]] المختصرة بتعمل [[http.Server]] جوّاها بالـ addr والـ handler بس. احنا محتاجين الـ struct نفسه في إيدنا لسببين: ننادي عليه [[Shutdown]] بعدين، ونحط timeouts.

| الحقل | المهلة على إيه |
|---|---|
| [[ReadHeaderTimeout]] | قراية الـ headers. عميل بيبعت header حرف حرف عشان يمسك الاتصال (هجوم اسمه slowloris) هيتقفل بعد 5 ثواني |
| [[ReadTimeout]] | قراية الطلب كله بالـ body |
| [[WriteTimeout]] | كتابة الرد. لازم أطول من أبطأ handler عندك |
| [[IdleTimeout]] | اتصال keep-alive فاضي مستني طلب جاي |

---

## ٤. السيرفر في goroutine

~~~go main.go
  go func() {
    slog.Info("listening", "addr", srv.Addr)
    if err := srv.ListenAndServe(); err != nil && !errors.Is(err, http.ErrServerClosed) {
      slog.Error("server failed", "err", err)
      os.Exit(1)
    }
  }()
~~~

- [[go func() {...}()]]: [[ListenAndServe]] مبترجعش طول ما السيرفر شغال، فلو اتنادت في main عادي، main مش هتعرف تستنى الإشارة.
- [[srv.ListenAndServe()]] بعد Shutdown بترجّع [[http.ErrServerClosed]]. ده **مش** error، ده «انت قفلتني». فالشرط: فيه error **و** مش ده.
- [[os.Exit(1)]]: error حقيقي (البورت مشغول مثلًا): اخرج على طول، مفيش لازمة نستنى إشارة.

---

## ٥. main بتستنى، وبعدين Shutdown

~~~go main.go
  <-ctx.Done()
  slog.Info("shutting down")
  shutdownCtx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
  defer cancel()
  if err := srv.Shutdown(shutdownCtx); err != nil {
    slog.Error("forced shutdown", "err", err)
  }
  slog.Info("bye")
~~~

- [[<-ctx.Done()]]: استنى لحد ما الـ channel تتقفل، يعني لحد ما الإشارة توصل. main واقفة هنا معظم عمر البرنامج.
- [[shutdownCtx]]: ctx **جديد** بمهلة 10 ثواني. مش [[ctx]] القديم لأنه اتلغي خلاص، ولو اديته لـ Shutdown هترجع على طول.
- [[srv.Shutdown(shutdownCtx)]]:
  1. يقفل البورت: أي اتصال جديد بيترفض.
  2. يقفل الاتصالات الفاضية.
  3. يستنى اللي شغالة تخلص، أو shutdownCtx يخلص.
- بعد ما Shutdown ترجع، main بتخلص فالبرنامج يقفل بـ exit code 0.

---

## ٦. التجربة: إشارة والطلب لسه شغال

~~~bash
curl localhost:8080/slow     # في الخلفية
kill -INT <pid>              # بعد نص ثانية، زي Ctrl+C
curl localhost:8080/slow     # طلب جديد بعد الإشارة
~~~

~~~text لوج السيرفر
2026/10/07 16:57:38 INFO listening addr=:8080
2026/10/07 16:57:40 INFO shutting down
2026/10/07 16:57:43 INFO bye
~~~

~~~text الطلب الأول (كان شغال)
finished
~~~

~~~text الطلب الجديد
curl: (7) Failed to connect to localhost port 8080 after 0 ms: Could not connect to server
~~~

- بين [[shutting down]] و [[bye]] **3 ثواني**: Shutdown استنت الطلب اللي في النص يخلص.
- الطلب الأول خد ردّه كامل.
- الطلب الجديد اترفض على طول (curl كود 7: مقدرش يتصل)، لأن البورت اتقفل. في الإنتاج الـ load balancer بيكون بطّل يبعت للنسخة دي أصلًا.
- السيرفر خرج بـ exit code 0.

وبـ [[kill -TERM <pid>]] (اللي [[docker stop]] بيبعته): نفس النتيجة بالظبط، [[finished]] ثم [[bye]] بعد ثانيتين ونص.

---

## ٧. نفس التجربة بالنسخة العادية

سيرفر بـ [[log.Fatal(http.ListenAndServe(":8080", mux))]] ونفس الـ handler، وبعتّله SIGTERM والطلب شغال:

~~~text الطلب اللي كان شغال
curl: (52) Empty reply from server
~~~

~~~text exit code السيرفر
143
~~~

- الطلب اتقطع في النص.
- 143 = 128 + 15، و 15 رقم SIGTERM. يعني «اتقتل بالإشارة»، مش خرج بنفسه.

> ملاحظة من التجربة: البرنامج اللي بيتشغّل في الخلفية بـ [[&]] من سكربت sh بيتجاهل SIGINT (Ctrl+C)، فالنسخة العادية مماتتش بـ [[kill -INT]]. لكن [[signal.NotifyContext]] بيفعّل الإشارة تاني، فالنسخة اللي في المثال سمعتها عادي. عشان كده جرّبت النسخة العادية بـ SIGTERM.

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| ctx بيتلغي مع الإشارة | [[signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)]] |
| سيرفر بـ timeouts تقدر تقفله | [[srv := &http.Server{...}]] |
| شغّله من غير ما تقف | [[go func() { srv.ListenAndServe() }()]] |
| تجاهل الإغلاق الطبيعي | [[!errors.Is(err, http.ErrServerClosed)]] |
| استنى | [[<-ctx.Done()]] |
| اقفل بمهلة | [[srv.Shutdown(shutdownCtx)]] |

- مهلة الـ Shutdown أقل من مهلة Docker (10 ثواني) أو Kubernetes (30).
- [[ReadHeaderTimeout]] دايمًا في الإنتاج.`,
          lines: [
            "باكدج main.",
            "imports.",
            "context.",
            "errors.",
            "log/slog.",
            "net/http.",
            "os.",
            R`[[os/signal]]: الإشارات.`,
            R`[[syscall]]: عشان SIGTERM.`,
            "time.",
            "قفلة.",
            "main.",
            "ctx بيتلغي مع Ctrl+C أو SIGTERM.",
            "رجّع السلوك العادي في الآخر.",
            "router.",
            "endpoint بياخد 3 ثواني.",
            "شغل طويل.",
            "رد.",
            "قفلة.",
            R`[[http.Server]] بإعدادات.`,
            "البورت.",
            "الـ router.",
            "ضد العملاء البطيئين.",
            "الطلب كله.",
            "الرد كله.",
            "اتصال فاضي.",
            "قفلة.",
            "السيرفر في goroutine عشان main تفضل فاضية تستنى.",
            "لوج.",
            R`شغّل، و [[ErrServerClosed]] بعد Shutdown مش error.`,
            "error حقيقي (البورت مشغول مثلًا).",
            "اقفل.",
            "قفلة.",
            "قفلة الـ goroutine.",
            "استنى الإشارة.",
            "لوج.",
            "مهلة 10 ثواني للإغلاق.",
            "نضّف.",
            "وقّف الطلبات الجديدة واستنى الشغالة.",
            "المهلة خلصت والطلبات لسه شغالة.",
            "قفلة.",
            "خلاص.",
            "قفلة."
          ],
          sol: R`مع Ctrl+C والـ curl شغال: السيرفر بيطبع [[2026/10/01 12:00:02 INFO shutting down]]، والـ curl بيكمّل ويطبع [[finished]] بعد ما الـ 3 ثواني يخلصوا، وبعدها [[INFO bye]] والبرنامج يقفل. (slog من غير SetDefault بيطبع بشكل log العادي.) أي curl جديد بعد Ctrl+C بيطلع [[curl: (7) Failed to connect to localhost port 8080]].

مع النسخة العادية: Ctrl+C بيقفل فورًا والـ curl بيطبع [[curl: (52) Empty reply from server]].

و [[kill -TERM <pid>]] بيعمل نفس اللي Ctrl+C عمله، وده اللي Docker بيبعته مع [[docker stop]].`
        },
        {
          cmd: "تحزيم تطبيق Go في Docker بـ Scratch بحجم 15 ميجا",
          title: "Docker multi-stage: صورة صغيرة فيها الـ binary بس (scratch أو distroless)",
          desc: R`صورة [[golang:1.25]] حجمها حوالي 800MB لأن فيها الـ compiler وكل الأدوات. البرنامج المبني مش محتاج ده كله، فبنستخدم multi-stage build:
1. مرحلة build: من صورة golang، تنزّل المكتبات وتبني الـ binary.
2. مرحلة التشغيل: صورة فاضية تقريبًا، وتنسخ فيها الـ binary بس من المرحلة الأولى.

[[CGO_ENABLED=0]]: يبني binary مش معتمد على مكتبة C بتاعة النظام (glibc)، فيشتغل في صورة مفيهاش أي حاجة. أغلب برامج Go مش محتاجة cgo، لكن مكتبات معينة (زي go-sqlite3) محتاجاه.

مرحلة التشغيل اختيارين:
• [[scratch]]: فاضية خالص. مفيش shell ولا ls ولا شهادات SSL ولا timezones. عشان كده لازم تنسخ [[ca-certificates.crt]] بنفسك، وإلا أي HTTPS call هيفشل.
• [[gcr.io/distroless/static-debian12:nonroot]]: فيها الشهادات و timezones ويوزر nonroot، ومفيهاش shell. أسهل وآمنة، وده الاختيار اللي ناس كتير بتبدأ بيه.

النتيجة صورة حجمها قد الـ binary تقريبًا (بين 5 و 20 ميجا لأغلب الـ APIs)، بتتنزّل بسرعة، ومفيهاش برامج ممكن تتستغل.

وترتيب الـ COPY مهم: go.mod و go.sum الأول ثم [[go mod download]]، فالـ layer ده يتكاش ومش بيتعاد غير لما الـ dependencies تتغيّر.`,
          example: R`# مرحلة 1: البناء
FROM golang:1.25 AS build
WORKDIR /src
COPY go.mod go.sum* ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /out/api ./cmd/api

# مرحلة 2: التشغيل (فاضية، ونسخنا فيها الشهادات والـ binary بس)
FROM scratch
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=build /out/api /api
USER 65534:65534
EXPOSE 8080
ENTRYPOINT ["/api"]`,
          try: R`في مشروعك (فيه [[cmd/api]])، احفظ ده كـ [[Dockerfile]] وضيف [[.dockerignore]] فيه [[.git]] و [[bin/]]. شغّل [[docker build -t my-go-api .]] ثم [[docker images my-go-api]]. وبعدين [[docker run --rm -p 8080:8080 my-go-api]]. وجرّب تدخل جوّاها بـ [[docker run --rm -it --entrypoint sh my-go-api]]: إيه اللي حصل؟ وبعدين شيل سطر الشهادات وخلّي البرنامج يعمل [[http.Get("https://go.dev")]].`,
          flag: "script",
          deep: {
            why: R`صورة صغيرة يعني pull أسرع في كل deploy و autoscaling، وتخزين أرخص، والأهم: سطح هجوم أصغر. صورة فيها shell و apt و curl بتدّي أي حد استغل ثغرة في برنامجك أدوات جاهزة. scratch مفيهاش أي حاجة غير برنامجك.`,
            how: R`[[-trimpath]] بيشيل مسارات جهازك من الـ binary (أنضف وبيخلي البناء يتكرر). [[-ldflags="-s -w"]] بيشيل معلومات الـ debug فيصغر الحجم حوالي التلت (سيرفر صغير نزل من 8.8 لـ 6.1 ميجا).

[[./cmd/api]]: بيبني الباكدج اللي في الفولدر ده (الهيكل من درس هيكل المشروع).

[[USER 65534:65534]]: يوزر nobody، عشان البرنامج ميشتغلش root. scratch مفيهاش ملف [[/etc/passwd]] فبنكتب الرقم. distroless:nonroot فيها يوزر جاهز.

[[ENTRYPOINT ["/api"]]] بصيغة الـ array: البرنامج بيبقى PID 1 مباشرة ويستقبل SIGTERM (درس الإغلاق النضيف). الصيغة النصية ([[ENTRYPOINT /api]]) بتحتاج shell، والـ scratch مفيهاش shell أصلًا.

Timezones: لو بتستخدم [[time.LoadLocation("Africa/Cairo")]] في scratch هتفشل. الحل [[import _ "time/tzdata"]] في main (بيضيف حوالي 450KB للـ binary)، أو distroless.

لو محتاج shell للـ debugging مؤقتًا: [[distroless/static-debian12:debug]] فيها busybox، أو [[docker debug]].`,
            when: R`أي خدمة Go بتنشرها بـ Docker. scratch لو عايز أصغر حاجة ومستعد تتعامل مع الشهادات والـ timezones، و distroless static لو عايز الافتراضيات الآمنة من غير تفكير. و alpine لو محتاج shell وأدوات جوه الـ container (أكبر شوية).`,
            mistakes: R`تنسى الشهادات في scratch: [[x509: certificate signed by unknown authority]] في أول HTTPS call. وتبني بـ cgo (الافتراضي في بعض الحالات) وتنسخ لـ scratch: [[exec /api: no such file or directory]] رغم إن الملف موجود (الحقيقة: الـ dynamic linker مش موجود). و [[COPY . .]] قبل [[go mod download]] فالكاش يضيع مع كل تعديل. و [[COPY go.mod go.sum ./]] في مشروع مفيهوش مكتبات: go.sum مش موجود فالبناء يقع بـ [["/go.sum": not found]]، وعشان كده المثال كاتب [[go.sum*]]. ومفيش [[.dockerignore]] فالـ .git كله بيتبعت للـ build.`
          },
          teach: R`## الملف ده بيعمل إيه؟

Dockerfile فيه **مرحلتين**: الأولى فيها Go كامل وبتبني البرنامج، والتانية فاضية خالص وبنحط فيها الـ binary وشهادات SSL بس. الصورة النهائية فيها التانية بس.

جرّبته على سيرفر صغير بالهيكل [[cmd/api]] (فيه [[/health]] و [[/tls]] اللي بيعمل [[http.Get("https://go.dev")]])، بـ Docker 29 على ويندوز (Docker Desktop، Linux containers)، وصورة البناء [[golang:1.25]].

---

## المرحلة الأولى: البناء

### [[FROM golang:1.25 AS build]]

- [[FROM]]: الصورة اللي بنبدأ منها. [[golang:1.25]] فيها الـ compiler والأدوات، حوالي 800 ميجا.
- [[AS build]]: اسم للمرحلة دي، عشان المرحلة التانية تنسخ منها.

### [[WORKDIR /src]]

اعمل فولدر [[/src]] جوه الصورة وادخله. كل الأوامر اللي بعده بتشتغل فيه.

### [[COPY go.mod go.sum* ./]] ثم [[RUN go mod download]]

- [[COPY src dest]]: انسخ من جهازك (الـ build context) لجوّه الصورة. [[./]] يعني [[/src]].
- [[go.sum*]]: الـ [[*]] معناها «لو موجود». مشروع من غير مكتبات خارجية مفيهوش go.sum، ومن غير النجمة البناء بيقع.
- [[go mod download]]: نزّل المكتبات.

ليه ملفين بس الأول؟ Docker بيعمل **layer** لكل أمر وبيحفظه (cache). لو الملفات اللي دخلت الأمر متغيرتش، بيستخدم النسخة المحفوظة. فلما تعدّل كود بس، تنزيل المكتبات مش بيتعاد. غيّرت سطر في [[main.go]] وبنيت تاني:

~~~text الناتج: docker build --progress=plain (مختصر)
#6 [build 3/6] COPY go.mod go.sum* ./
#6 CACHED
#8 [build 4/6] RUN go mod download
#8 CACHED
#9 [build 5/6] COPY . .
#9 DONE 0.1s
#10 [build 6/6] RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /out/api ./cmd/api
#10 DONE 9.2s
~~~

[[CACHED]] للخطوات اللي قبل الكود، والبناء بس اللي اتعاد.

### [[COPY . .]]

انسخ باقي المشروع. [[.dockerignore]] بيقول Docker يتجاهل إيه (زي [[.git]] و [[bin/]]) عشان ميتبعتوش أصلًا.

### الـ build من جوه لبرة

~~~bash
RUN CGO_ENABLED=0 go build -trimpath -ldflags="-s -w" -o /out/api ./cmd/api
~~~

| الحتة | معناها |
|---|---|
| [[CGO_ENABLED=0]] | متربطش بمكتبة C بتاعة النظام. الـ binary يبقى static: مكتفي بنفسه |
| [[-trimpath]] | شيل مسارات الجهاز ([[/src/...]]) من جوه الـ binary |
| [[-ldflags="-s -w"]] | [[-s]] شيل جدول الرموز و [[-w]] شيل معلومات الـ debug (DWARF) |
| [[-o /out/api]] | اسم ومكان الناتج |
| [[./cmd/api]] | الباكدج اللي فيه main |

قست الفرق بتاع [[-s -w]] على نفس السيرفر:

~~~text حجم الـ binary
8771856  من غير -trimpath و -ldflags
6070456  بيهم
~~~

حوالي التلت أصغر.

---

## المرحلة التانية: التشغيل

### [[FROM scratch]]

[[scratch]] مش صورة بتتنزّل، دي كلمة محجوزة معناها «ابدأ من ولا حاجة». مفيش shell، ولا [[ls]]، ولا أي ملف.

### [[COPY --from=build ...]]

~~~bash
COPY --from=build /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=build /out/api /api
~~~

- [[--from=build]]: انسخ من المرحلة اللي اسمها build، مش من جهازك.
- السطر الأول: شهادات الـ CA. دي اللي بيها البرنامج بيتأكد إن موقع HTTPS هو فعلًا اللي بيقول عليه.
- التاني: الـ binary بس.

### [[USER 65534:65534]]

شغّل البرنامج كـ يوزر رقم 65534 وجروب 65534 (المعروف بـ nobody)، مش root. بالرقم لأن scratch مفيهاش [[/etc/passwd]] فيها أسامي.

### [[EXPOSE 8080]] و [[ENTRYPOINT ["/api"]]]

- [[EXPOSE]]: توثيق بس إن البرنامج بيسمع على 8080. مبيفتحش حاجة، الفتح بـ [[-p]] في docker run.
- [[ENTRYPOINT ["/api"]]]: البرنامج اللي يشتغل. صيغة الـ array (JSON) معناها «شغّله مباشرة» من غير shell، فيبقى PID 1 ويستقبل SIGTERM بنفسه. والصيغة النصية محتاجة [[/bin/sh]]، ومش موجود هنا أصلًا.

---

## التجربة

~~~bash
docker build -t my-go-api .
docker images my-go-api
~~~

~~~text الناتج
IMAGE                     ID             DISK USAGE   CONTENT SIZE   EXTRA
teach-go0507-api:latest   0c84601af2ed       9.07MB         2.75MB
~~~

(سمّيت الصورة [[teach-go0507-api]] عندي.) [[DISK USAGE]] 9.07 ميجا على الديسك، و [[CONTENT SIZE]] 2.75 ميجا مضغوطة، ودي اللي بتتنزّل في كل deploy. قارنها بـ 800 ميجا بتاعة golang:1.25.

ومحتواها:

~~~text الناتج: docker history
0B	ENTRYPOINT ["/api"]
0B	EXPOSE [8080/tcp]
0B	USER 65534:65534
6.08MB	COPY /out/api /api # buildkit
242kB	COPY /etc/ssl/certs/ca-certificates.crt /etc…
~~~

ملفين، وبس.

### شغّلها

~~~bash
docker run --rm -p 8080:8080 my-go-api
~~~

~~~text الناتج: curl localhost:8080/health و /tls
ok uid=65534 args=[sh]
200 OK
~~~

- [[uid=65534]]: البرنامج شغال فعلًا كـ nobody.
- [[args=[sh]]]: هنا أنا كنت كاتب [[docker run ... my-go-api sh]]: الـ [[sh]] راحت كـ argument للـ [[/api]] نفسه، لأن ENTRYPOINT ثابت وأي حاجة بعد اسم الصورة بتتضاف بعده.
- [[200 OK]]: HTTPS لـ go.dev اشتغل، بفضل الشهادات.

### تدخل جوّاها؟

~~~text الناتج: docker run --rm --entrypoint sh my-go-api
docker: Error response from daemon: failed to create task for container: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: error during container init: exec: "sh": executable file not found in $PATH
~~~

[[--entrypoint sh]] بيغيّر البرنامج اللي يشتغل لـ sh، ومفيش sh. وده مقصود: لو حد اخترق البرنامج، ملوش shell يشتغل منه.

---

## غلطتين وشكلهم

### من غير سطر الشهادات

~~~text الناتج: curl localhost:8080/tls
Get "https://go.dev": tls: failed to verify certificate: x509: certificate signed by unknown authority
~~~

### [[CGO_ENABLED=1]]

بنيت نفس الـ Dockerfile بـ [[CGO_ENABLED=1]] بدل 0:

~~~text الناتج: docker run --rm
exec /api: no such file or directory
~~~

الملف موجود! بس الـ binary بقى dynamic: محتاج الـ loader بتاع glibc ([[/lib64/ld-linux-x86-64.so.2]])، وده اللي مش موجود في scratch. والـ [[net]] package بالذات بتستخدم cgo لو متاح، فلازم تقول [[CGO_ENABLED=0]] صراحة: جوه صورة golang:1.25 الافتراضي [[go env CGO_ENABLED]] = 1 لأن فيها gcc.

---

## الخلاصة

| السطر | ليه |
|---|---|
| [[FROM golang:1.25 AS build]] | مرحلة فيها الأدوات، مش هتبقى في الصورة النهائية |
| [[COPY go.mod go.sum* ./]] + [[go mod download]] | layer المكتبات يتكاش |
| [[CGO_ENABLED=0 go build -trimpath -ldflags="-s -w"]] | binary static وأصغر |
| [[FROM scratch]] | صورة فاضية |
| [[COPY --from=build .../ca-certificates.crt]] | HTTPS يشتغل |
| [[USER 65534:65534]] | مش root |
| [[ENTRYPOINT ["/api"]]] | البرنامج PID 1 ويستقبل SIGTERM |

- لو مش عايز تفكر في الشهادات والـ timezones: [[gcr.io/distroless/static-debian12:nonroot]] بدل scratch.`,
          lines: [
            R`مرحلة البناء من صورة Go الرسمية، واسمها [[build]].`,
            "فولدر الشغل.",
            R`ملفات الـ dependencies الأول (عشان الكاش). الـ [[*]] عشان مشروع من غير مكتبات مفيهوش go.sum.`,
            "نزّل المكتبات: layer بيتكاش لحد ما go.mod يتغيّر.",
            "باقي الكود.",
            "ابني binary مستقل عن C، من غير مسارات جهازك ومعلومات debug.",
            R`مرحلة التشغيل: [[scratch]] فاضية خالص.`,
            "انسخ شهادات SSL من مرحلة البناء، عشان HTTPS يشتغل.",
            "انسخ الـ binary بس.",
            "شغّل كيوزر nobody مش root.",
            "توثيق إن البرنامج بيسمع على 8080.",
            "البرنامج نفسه هو العملية الأساسية (PID 1)."
          ],
          sol: R`[[docker images my-go-api]] بيقول حجم حوالي [[8.9MB]] (في خانة SIZE، أو DISK USAGE في نسخ Docker الجديدة) لمشروع المهام اللي في آخر المستوى ده. API بالمكتبة القياسية بيبقى بين 5 و 10 ميجا، والحجم بيزيد مع المكتبات. قارنه بصورة [[golang:1.25]] نفسها (حوالي 800MB).

[[--entrypoint sh]]: [[exec: "sh": executable file not found in $PATH]]. مفيش shell، وده مقصود. (ولو كتبت [[docker run my-go-api sh]] من غير --entrypoint، كلمة sh هتروح كـ argument للـ /api نفسه والسيرفر هيشتغل عادي، لأن ENTRYPOINT ثابت والكلام اللي بعد اسم الصورة بيتضاف بعده.)

ومن غير سطر الشهادات: [[Get "https://go.dev": tls: failed to verify certificate: x509: certificate signed by unknown authority]].`
        },
        {
          cmd: "GOOS و GOARCH",
          title: "cross-compile: تبني لويندوز وماك ولينكس ARM من نفس الجهاز",
          desc: R`Go بتبني لأي نظام ومعالج من أي جهاز، من غير أدوات زيادة. كل اللي بتغيّره متغيرين environment قبل [[go build]]:
• [[GOOS]]: النظام: [[linux]] و [[darwin]] (ماك) و [[windows]] و [[freebsd]]...
• [[GOARCH]]: المعالج: [[amd64]] (Intel و AMD العادي) و [[arm64]] (ماك M1 وما بعده، و Raspberry Pi 4 و 5، وسيرفرات AWS Graviton).

[[GOOS=linux GOARCH=arm64 go build -o app .]]: الكتابة دي في bash بتحط المتغيرات للأمر ده بس.

[[go tool dist list]] بيعرض كل التركيبات المدعومة.

الـ cross-compile بسيط طول ما مفيش cgo. لما GOOS أو GOARCH مختلفين عن جهازك، Go بتقفل cgo لوحدها، فلو مكتبة محتاجاه البناء هيفشل أو هيطلع ناقص.

ولو فيه كود خاص بنظام معين: ملف اسمه [[file_windows.go]] بيدخل البناء على ويندوز بس، و [[file_linux.go]] على لينكس بس. أو سطر [[//go:build linux]] في أول الملف.

و [[-X main.version=...]] بيحط رقم النسخة في الـ binary وقت البناء (من درس go build)، ومفيد مع الإصدارات.`,
          example: R`go tool dist list | grep -E '^(linux|darwin|windows)/'
GOOS=linux GOARCH=amd64 go build -o dist/app-linux-amd64 .
GOOS=linux GOARCH=arm64 go build -o dist/app-linux-arm64 .
GOOS=darwin GOARCH=arm64 go build -o dist/app-macos-arm64 .
GOOS=windows GOARCH=amd64 go build -ldflags="-X main.version=1.2.0" -o dist/app.exe .
file dist/*`,
          try: R`ابني برنامج hello لـ ٣ أنظمة وشوف [[file dist/*]]. وبعدين جرّب تشغّل نسخة الـ arm64 على جهاز amd64 (أو العكس) واقرا الـ error. ولو عندك Raspberry Pi أو سيرفر arm64، انسخ الملف بـ scp وشغّله.`,
          deep: {
            why: R`أداة CLI بتنزل لويندوز وماك ولينكس، أو سيرفر arm64 أرخص على AWS، أو Raspberry Pi: كلهم من جهازك في ثواني، من غير VM ولا جهاز لكل نظام. ده من أسباب إن أدوات زي gh و terraform و kubectl مكتوبة بـ Go.`,
            how: R`الـ compiler بتاع Go نفسه بيعرف يطلّع كود لكل المعالجات، والمكتبة القياسية مكتوبة لكل الأنظمة، فمش محتاج toolchain مختلف زي C.

[[file]] بيقرا أول بايتات الملف ويقولك نوعه: [[ELF 64-bit LSB executable, ARM aarch64]] للينكس arm64، و [[Mach-O 64-bit arm64 executable]] للماك، و [[PE32+ executable ... x86-64]] لويندوز.

[[grep -E '^(linux|darwin|windows)/']]: regex بيفلتر السطور اللي بتبدأ بالأنظمة دي.

Docker بيبني لأكتر من معالج بـ [[docker buildx build --platform linux/amd64,linux/arm64]]، ومع Go الأسرع إنك تخلي مرحلة البناء تشتغل على معالج جهازك وتعمل cross-compile بـ [[TARGETOS]] و [[TARGETARCH]] بدل emulation.

[[GoReleaser]] أداة بتعمل كل ده (بناء لكل الأنظمة، وأرشيفات، و checksums، و GitHub Release) من ملف إعدادات واحد.`,
            when: R`إصدار أدوات CLI، والنشر على سيرفرات arm64، والأجهزة الصغيرة، والبناء على ماك لسيرفر لينكس (لو مش بتستخدم Docker).`,
            mistakes: R`تبني على ماك M1 وتنسخ لسيرفر لينكس: [[cannot execute binary file: Exec format error]]. وتعتمد على مكتبة فيها cgo ([[go-sqlite3]]) وتعمل cross-compile فيفشل (البديل [[modernc.org/sqlite]] بـ Go صافي). وتنسى [[.exe]] في اسم ملف ويندوز.`
          },
          teach: R`## الأوامر دي بتعمل إيه؟

بتبني **نفس البرنامج** ٤ مرات من نفس الجهاز: لينكس على معالجين، وماك، وويندوز. وفي الآخر [[file]] بيأكد نوع كل ملف.

جرّبتها في bash جوه [[docker run --rm golang:1.25]] (Go 1.25.14، لينكس amd64) على برنامج صغير:

~~~go main.go
package main

import (
  "fmt"
  "runtime"
)

var version = "dev"

func main() {
  fmt.Println("hello", version, runtime.GOOS, runtime.GOARCH)
}
~~~

[[runtime.GOOS]] و [[runtime.GOARCH]]: النظام والمعالج اللي البرنامج **اتبنى** ليهم. و [[version]] متغير هنغيّره وقت البناء.

---

## ١. التركيبات المدعومة

~~~bash
go tool dist list | grep -E '^(linux|darwin|windows)/'
~~~

- [[go tool dist list]]: كل تركيبات [[نظام/معالج]] اللي Go تقدر تبني ليها (48 تركيبة في Go 1.25).
- [[|]]: ابعت الناتج للأمر اللي بعده.
- [[grep -E '^(linux|darwin|windows)/']]: [[-E]] regex موسّع. [[^]] بداية السطر، و [[(a|b|c)]] واحدة من دول، و [[/]] حرفيًا. يعني «السطور اللي بتبدأ بـ linux/ أو darwin/ أو windows/».

~~~text الناتج
darwin/amd64
darwin/arm64
linux/386
linux/amd64
linux/arm
linux/arm64
linux/loong64
linux/mips
linux/mips64
linux/mips64le
linux/mipsle
linux/ppc64
linux/ppc64le
linux/riscv64
linux/s390x
windows/386
windows/amd64
windows/arm64
~~~

| الاسم | معناه |
|---|---|
| [[darwin]] | macOS (اسم النواة بتاعته) |
| [[amd64]] | 64-bit العادي في Intel و AMD (اسمه كمان x86-64) |
| [[arm64]] | ماك M1 وما بعده، و Raspberry Pi 4 و 5، و AWS Graviton (اسمه كمان aarch64) |
| [[386]] و [[arm]] | 32-bit القديم |

---

## ٢. البناء لكل نظام

~~~bash
GOOS=linux GOARCH=amd64 go build -o dist/app-linux-amd64 .
GOOS=linux GOARCH=arm64 go build -o dist/app-linux-arm64 .
GOOS=darwin GOARCH=arm64 go build -o dist/app-macos-arm64 .
~~~

- [[GOOS=linux GOARCH=amd64 go build ...]]: في bash، [[VAR=value]] قبل الأمر بيحط المتغير **للأمر ده بس**. ده مش إعداد دايم.
- [[GOOS]]: النظام الهدف. و [[GOARCH]]: المعالج الهدف.
- [[-o dist/app-linux-amd64]]: اسم الناتج. go build بتعمل فولدر [[dist]] لوحدها لو مش موجود.
- [[.]]: ابني الباكدج اللي في الفولدر الحالي.

مفيش أي أدوات زيادة اتسطّبت: الـ compiler بتاع Go بيطلّع كود لكل المعالجات دي.

### ويندوز ومعاه رقم النسخة

~~~bash
GOOS=windows GOARCH=amd64 go build -ldflags="-X main.version=1.2.0" -o dist/app.exe .
~~~

- [[-ldflags="..."]]: إعدادات للـ linker (المرحلة الأخيرة اللي بتجمّع الـ binary).
- [[-X main.version=1.2.0]]: غيّر قيمة المتغير [[version]] في باكدج [[main]] لـ [["1.2.0"]]. بيشتغل مع متغيرات string بس.
- [[.exe]]: ويندوز مش هيشغّل الملف من غيرها.

---

## ٣. [[file dist/*]]

[[file]] بيقرا أول bytes في الملف ويقولك نوعه، مش بيبص على الاسم. (مكانش موجود في صورة golang، فسطّبته بـ [[apt-get install file]].)

~~~text الناتج
dist/app-linux-amd64: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), statically linked, BuildID[sha1]=2567a2cb7e2dd4f1df9aa969c5ca3e0cf7e307e6, with debug_info, not stripped
dist/app-linux-arm64: ELF 64-bit LSB executable, ARM aarch64, version 1 (SYSV), statically linked, BuildID[sha1]=88211ef4b55b98e507c05b6c47c67c7cb2dc5b90, with debug_info, not stripped
dist/app-macos-arm64: Mach-O 64-bit arm64 executable, flags:<|DYLDLINK|PIE>
dist/app.exe:         PE32+ executable for MS Windows 6.01 (console), x86-64, 16 sections
~~~

| الكلمة | معناها |
|---|---|
| [[ELF]] / [[Mach-O]] / [[PE32+]] | شكل الملف التنفيذي في لينكس / ماك / ويندوز |
| [[x86-64]] / [[ARM aarch64]] | المعالج |
| [[statically linked]] | مش محتاج مكتبات من النظام (لأن cgo مقفول في الـ cross-compile) |
| [[with debug_info, not stripped]] | فيه معلومات debug، و [[-ldflags="-s -w"]] بتشيلها |

والأحجام قريبة من بعض (حوالي 2.2 لـ 2.4 ميجا لـ hello).

---

## ٤. تشغيلهم

### على نفس المعالج

~~~text الناتج: ./dist/app-linux-amd64
hello dev linux amd64
~~~

[[dev]]: مبنتش بـ [[-X]] فالقيمة الأصلية.

### نسخة ويندوز على ويندوز

نسخت [[app.exe]] وشغّلته من bash على ويندوز 11 (الجهاز نفسه):

~~~text الناتج
hello 1.2.0 windows amd64
~~~

اتبنى على لينكس واشتغل على ويندوز، و [[-X]] غيّرت النسخة.

### نسخة الماك على لينكس

~~~text الناتج
bash: line 1: ./dist/app-macos-arm64: cannot execute binary file: Exec format error
~~~

[[Exec format error]]: الملف سليم، بس لنظام تاني. النواة بتاعة لينكس مبتفهمش Mach-O. و exit code 126 = «لقيت الملف بس مقدرتش أشغّله».

### نسخة arm64 على amd64

~~~text الناتج: ./dist/app-linux-arm64
hello dev linux arm64
~~~

اشتغلت! مش لأن الـ CPU فهمها، لكن Docker Desktop مسطّب محاكي (QEMU) بيترجم أوامر ARM. على سيرفر لينكس عادي من غير المحاكي ده هيطلع [[Exec format error]] زي الماك.

---

## الخلاصة

| الأمر | الناتج |
|---|---|
| [[go tool dist list]] | كل التركيبات |
| [[GOOS=linux GOARCH=arm64 go build -o x .]] | binary للينكس ARM |
| [[GOOS=darwin GOARCH=arm64]] | ماك M1 وما بعده |
| [[GOOS=windows GOARCH=amd64 ... -o app.exe]] | ويندوز، ومتنساش [[.exe]] |
| [[-ldflags="-X main.version=1.2.0"]] | قيمة متغير string وقت البناء |
| [[file x]] | نوع الملف من محتواه |

- الـ cross-compile من غير أدوات طول ما مفيش cgo.
- [[Exec format error]] = binary لنظام أو معالج تاني.

> على ويندوز في PowerShell الكتابة مختلفة: [[$env:GOOS="linux"; $env:GOARCH="arm64"; go build -o app .]]، والمتغيرات دي بتفضل لحد ما تقفل الـ session (من الـ docs، مش متجرّب هنا).`,
          lines: [
            "التركيبات المدعومة للأنظمة التلاتة بس.",
            "لينكس على Intel/AMD.",
            "لينكس على ARM (Graviton و Raspberry Pi).",
            "ماك M1 وما بعده.",
            R`ويندوز، ومعاه رقم النسخة بـ [[-X]].`,
            "نوع كل ملف اتبنى."
          ],
          sol: R`[[file dist/*]]:
[[dist/app-linux-amd64: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), statically linked, ...]]
[[dist/app-linux-arm64: ELF 64-bit LSB executable, ARM aarch64, version 1 (SYSV), statically linked, ...]]
[[dist/app-macos-arm64: Mach-O 64-bit arm64 executable, ...]]
[[dist/app.exe: PE32+ executable for MS Windows 6.01 (console), x86-64, 16 sections]]

تشغيل نسخة arm64 على جهاز amd64: [[cannot execute binary file: Exec format error]] (أو [[exec format error]] في Docker). يعني الملف سليم بس لمعالج تاني. (استثناء: Docker Desktop فيه محاكي QEMU متسطّب، فنسخة لينكس arm64 بتشتغل جوه containers الـ amd64 بس أبطأ. ونسخة الماك جوه لينكس بتطلع Exec format error في كل الحالات.)`
        },
        {
          cmd: "worker pool و errgroup",
          title: "worker pool و errgroup: تحدد عدد الشغل المتوازي وتوقف عند أول error",
          desc: R`[[go f()]] لكل عنصر في قايمة فيها 100 ألف عنصر معناه 100 ألف طلب على الداتابيز أو API في نفس اللحظة: هتوقعها أو هتتعمل rate limit. الحل إنك تحدد العدد.

Worker pool بالـ channels:
• channel للشغل [[jobs]] و channel للنتايج [[results]].
• N goroutines (workers) كل واحد بيعمل [[for id := range jobs]].
• goroutine بتبعت الشغل وتقفل jobs لما تخلص.
• goroutine بتستنى الـ workers ([[wg.Wait()]]) وتقفل results، فالـ range على results يخلص.

[[errgroup]] (من [[golang.org/x/sync/errgroup]]، مكتبة رسمية من فريق Go بس مش في القياسية) بيعمل ده بشكل أبسط لما كل اللي محتاجه «شغّل دول بالتوازي، واستنى، ورجّعلي أول error»:
• [[g, ctx := errgroup.WithContext(ctx)]]: لو أي واحد رجّع error، الـ ctx بيتلغي فالباقيين يقدروا يوقفوا.
• [[g.SetLimit(2)]]: اتنين بس في نفس الوقت. [[g.Go]] بيستنى لو العدد كامل.
• [[g.Go(func() error { ... })]] لكل شغلانة، و [[g.Wait()]] بيرجّع أول error.

والـ [[case <-time.After(...):]] الفاضي في المثال معناه «استنى المدة ومتعملش حاجة»، فالكود يكمّل بعد الـ select.`,
          example: R`package main

import (
  "context"
  "fmt"
  "sync"
  "time"

  "golang.org/x/sync/errgroup"
)

func resize(id int) int {
  time.Sleep(20 * time.Millisecond)
  return id * 10
}

func pool(ids []int, workers int) []int {
  jobs := make(chan int)
  results := make(chan int)
  var wg sync.WaitGroup
  for range workers {
    wg.Add(1)
    go func() {
      defer wg.Done()
      for id := range jobs {
        results <- resize(id)
      }
    }()
  }
  go func() {
    for _, id := range ids {
      jobs <- id
    }
    close(jobs)
  }()
  go func() {
    wg.Wait()
    close(results)
  }()
  var out []int
  for r := range results {
    out = append(out, r)
  }
  return out
}

func fetchAll(ctx context.Context, urls []string) error {
  g, ctx := errgroup.WithContext(ctx)
  g.SetLimit(2)
  for _, u := range urls {
    g.Go(func() error {
      select {
      case <-ctx.Done():
        return ctx.Err()
      case <-time.After(10 * time.Millisecond):
      }
      if u == "bad" {
        return fmt.Errorf("fetch %s: status 500", u)
      }
      return nil
    })
  }
  return g.Wait()
}

func main() {
  start := time.Now()
  res := pool([]int{1, 2, 3, 4, 5, 6, 7, 8}, 4)
  fmt.Println(len(res), time.Since(start).Round(10*time.Millisecond))
  fmt.Println(fetchAll(context.Background(), []string{"a", "bad", "c"}))
}`,
          try: R`[[go get golang.org/x/sync/errgroup]] وشغّل. (لو go get قالك [[requires go >= 1.26.0]] يبقى آخر نسخة من المكتبة محتاجة Go أحدث من اللي عندك: حدّث Go، أو اختار نسخة أقدم بـ [[go get golang.org/x/sync@v0.17.0]].) وبعدين غيّر عدد الـ workers لـ 1 ثم 8 وقارن الوقت. وبعدين خلي pool ترجّع النتايج بنفس ترتيب المدخلات (تلميح: ابعت المكان مع الـ id، واكتب في [[out[i]]] على slice محجوزة بالطول).`,
          flag: "script",
          deep: {
            why: R`الـ concurrency من غير حد بيكسّر الحاجات اللي بتكلّمها: الداتابيز ليها حد اتصالات، والـ APIs ليها rate limit، والذاكرة ليها حد. والـ worker pool و errgroup هما النمطين اللي هتلاقيهم في كل كود Go بيعالج دفعات (batch): رفع ملفات، وإرسال إشعارات، و import داتا.`,
            how: R`في pool: 8 شغلانات و 4 workers وكل شغلانة 20ms، فالوقت حوالي 40ms (دفعتين). مع worker واحد 160ms.

الترتيب في results مش مضمون: كل worker بيخلّص في وقت مختلف.

ليه goroutine منفصلة بتعمل [[wg.Wait()]] ثم [[close(results)]]؟ لأن main مشغولة بتقرا results. لو main عملت Wait الأول، الـ workers هيعلّقوا وهما بيبعتوا في results ومحدش بيقرا: deadlock.

في fetchAll، [[u]] جوه الـ closure آمن لأن من Go 1.22 كل لفّة ليها نسختها. الـ "bad" بيرجّع error، فـ errgroup بيلغي الـ ctx، و "c" لو لسه مستنية هتشوف [[ctx.Done()]] وترجع بدري. و [[g.Wait()]] بيرجّع أول error بس.

لو محتاج النتايج من errgroup: اعمل slice بطول المدخلات قبل الـ loop، وكل goroutine تكتب في [[results[i]]] بتاعها: مفيش race لأن كل واحدة بتكتب في خانة مختلفة.`,
            when: R`worker pool لما الشغل جاي من مصدر مستمر (queue أو ملف ضخم) أو محتاج workers طويلة العمر. errgroup لما عندك قايمة محددة وعايز «كلهم ينجحوا أو أوقف». و [[SetLimit]] أو [[semaphore]] لما تحتاج حد بس من غير pool كامل.`,
            mistakes: R`goroutine لكل عنصر من غير حد. وتنسى [[close(jobs)]] فالـ workers يستنوا للأبد. وتقفل results من worker (أكتر من worker هيقفلوها: panic). و main تعمل wg.Wait قبل ما تقرا النتايج: deadlock. و errgroup من غير WithContext فالـ goroutines التانية متعرفش إن فيه فشل.`
          },
          teach: R`## البرنامج ده بيعمل إيه؟

طريقتين تشغّل بيهم شغل كتير بالتوازي **بعدد محدود**:

1. [[pool]]: worker pool بالـ channels. 8 شغلانات و 4 workers.
2. [[fetchAll]]: نفس الفكرة بـ [[errgroup]]، ويقف عند أول error.

الناتج من [[go run .]] جوه [[docker run --rm golang:1.25]] (Go 1.25.14).

---

## ١. تجهيز المكتبة

[[errgroup]] مش في المكتبة القياسية، فلازم:

~~~bash
go get golang.org/x/sync/errgroup
~~~

~~~text الناتج
go: downloading golang.org/x/sync v0.23.0
go: golang.org/x/sync/errgroup: golang.org/x/sync@v0.23.0 requires go >= 1.26.0 (running go 1.25.14; GOTOOLCHAIN=local)
~~~

آخر نسخة من المكتبة عايزة Go 1.26، وعندي 1.25. فاخترت نسخة أقدم بـ [[@]]:

~~~bash
go get golang.org/x/sync@v0.17.0
~~~

~~~text الناتج
go: added golang.org/x/sync v0.17.0
~~~

---

## ٢. الشغلانة نفسها

~~~go main.go
func resize(id int) int {
  time.Sleep(20 * time.Millisecond)
  return id * 10
}
~~~

بتمثّل شغل بياخد 20ms (تصغير صورة مثلًا)، ونتيجتها id × 10 عشان نعرف مين رجع.

---

## ٣. [[pool]]: الـ channels

~~~go main.go
func pool(ids []int, workers int) []int {
  jobs := make(chan int)
  results := make(chan int)
  var wg sync.WaitGroup
~~~

- [[jobs]]: الشغل رايح للـ workers. و [[results]]: النتايج راجعة.
- الاتنين unbuffered: الإرسال بيستنى لحد ما حد يستقبل.
- [[sync.WaitGroup]]: عدّاد عشان نعرف إمتى كل الـ workers خلصوا.

### الـ workers

~~~go main.go
  for range workers {
    wg.Add(1)
    go func() {
      defer wg.Done()
      for id := range jobs {
        results <- resize(id)
      }
    }()
  }
~~~

- [[for range workers]]: لف [[workers]] مرة (4)، من غير متغير.
- [[wg.Add(1)]]: زوّد العدّاد **قبل** [[go]]، مش جوّاها.
- كل worker: [[for id := range jobs]] بياخد شغلانة شغلانة لحد ما [[jobs]] تتقفل وتفضى. وبيبعت النتيجة في [[results]].
- [[defer wg.Done()]]: لما الـ worker يخلص، نقّص العدّاد.

فيه 4 workers بس، فمهما كان عدد الـ ids، أقصى حاجة 4 شغالين في نفس الوقت.

### اللي بيبعت الشغل

~~~go main.go
  go func() {
    for _, id := range ids {
      jobs <- id
    }
    close(jobs)
  }()
~~~

في goroutine لوحدها لأن [[jobs <- id]] بيستنى worker فاضي، و main لازم تبقى فاضية تقرا النتايج. و [[close(jobs)]] بعد آخر واحد: من غيرها الـ [[range jobs]] في الـ workers مش هتخلص أبدًا.

### اللي بيقفل النتايج

~~~go main.go
  go func() {
    wg.Wait()
    close(results)
  }()
~~~

لما كل الـ workers يخلصوا، اقفل [[results]]، فالـ range اللي تحت يخلص.

ليه في goroutine؟ جرّبت أعمل [[wg.Wait()]] و [[close(results)]] في الـ main نفسها قبل ما تقرا:

~~~text الناتج
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [sync.WaitGroup.Wait]:
~~~

main مستنية الـ workers، والـ workers مستنيين حد يقرا [[results]]، ومحدش بيقرا. كله واقف، و Go بتكتشف ده وتقفل.

### الجمع

~~~go main.go
  var out []int
  for r := range results {
    out = append(out, r)
  }
  return out
}
~~~

---

## ٤. [[fetchAll]]: errgroup

~~~go main.go
func fetchAll(ctx context.Context, urls []string) error {
  g, ctx := errgroup.WithContext(ctx)
  g.SetLimit(2)
~~~

- [[errgroup.WithContext(ctx)]]: بيرجّع group و ctx جديد. الـ ctx ده **بيتلغي** أول ما أي شغلانة ترجّع error.
- [[ctx]] على الشمال بيغطّي اللي جه كـ parameter (نفس الاسم)، فكل اللي تحت بيستخدم الجديد.
- [[g.SetLimit(2)]]: اتنين بس في نفس الوقت. ده بيعمل شغل الـ worker pool من غير channels.

~~~go main.go
  for _, u := range urls {
    g.Go(func() error {
      select {
      case <-ctx.Done():
        return ctx.Err()
      case <-time.After(10 * time.Millisecond):
      }
      if u == "bad" {
        return fmt.Errorf("fetch %s: status 500", u)
      }
      return nil
    })
  }
  return g.Wait()
}
~~~

- [[g.Go(func() error {...})]]: شغّل الدالة في goroutine. ولو فيه 2 شغالين، [[g.Go]] نفسها بتستنى لحد ما واحد يخلص.
- الـ select: يا الإلغاء ييجي فنرجع بسببه، يا 10ms تعدّي (الـ case الفاضية) ونكمّل. ده بيمثّل طلب HTTP بيسمع للـ ctx.
- [[u == "bad"]]: نمثّل فشل.
- [[u]] جوه الدالة آمن: من Go 1.22 كل لفّة ليها [[u]] خاص بيها.
- [[g.Wait()]]: استنى الكل، ورجّع **أول** error (أو nil).

---

## ٥. main والناتج

~~~go main.go
  start := time.Now()
  res := pool([]int{1, 2, 3, 4, 5, 6, 7, 8}, 4)
  fmt.Println(len(res), time.Since(start).Round(10*time.Millisecond))
  fmt.Println(fetchAll(context.Background(), []string{"a", "bad", "c"}))
~~~

[[.Round(10*time.Millisecond)]]: قرّب المدة لأقرب 10ms عشان الرقم يبقى نضيف.

~~~text الناتج
8 40ms
fetch bad: status 500
~~~

- **40ms**: 8 شغلانات ÷ 4 workers = دفعتين، كل دفعة 20ms.
- [[fetch bad: status 500]]: أول error. و [["a"]] و [["c"]] رجعوا nil فمش ظاهرين.

### عدد الـ workers

زوّدت loop بتجرّب 1 و 8 وبتطبع النتايج كمان:

~~~text الناتج
workers 1 8 160ms [10 20 30 40 50 60 70 80]
workers 8 8 20ms [70 40 50 60 10 80 20 30]
~~~

- worker واحد: 8 × 20 = 160ms، وبالترتيب لأنه لوحده.
- 8 workers: دفعة واحدة، 20ms. بس **الترتيب اتلخبط**: كل worker خلّص في لحظة مختلفة شوية.

---

## ٦. الحل: pool بالترتيب

~~~go solCode
type job struct{ i, id int }

func orderedPool(ids []int, workers int) []int {
  out := make([]int, len(ids))
  jobs := make(chan job)
  var wg sync.WaitGroup
  for range workers {
    wg.Go(func() {
      for j := range jobs {
        out[j.i] = resize(j.id)
      }
    })
  }
  for i, id := range ids {
    jobs <- job{i, id}
  }
  close(jobs)
  wg.Wait()
  return out
}
~~~

- [[type job struct{ i, id int }]]: الشغلانة معاها **مكانها** [[i]] في القايمة الأصلية.
- [[out := make([]int, len(ids))]]: slice محجوزة بالطول من الأول، كل الخانات موجودة.
- [[wg.Go(func() {...})]]: جديدة في Go 1.25: بتعمل [[Add(1)]] و [[go]] و [[defer Done()]] في نداء واحد.
- [[out[j.i] = ...]]: كل worker بيكتب في الخانة بتاعة الشغلانة. خانات مختلفة، فمفيش race.
- مفيش channel نتايج، فـ main تقدر تبعت الشغل بنفسها، وتقفل، وتستنى.

~~~text الناتج
[10 20 30 40 50 60 70 80]
~~~

وشغّلت البرنامج كله بـ [[go run -race .]]: مفيش أي [[WARNING: DATA RACE]]، فالكتابة في خانات مختلفة آمنة فعلًا.

---

## الخلاصة

| الحتة | بتعمل إيه |
|---|---|
| [[jobs]] + N workers بـ [[range jobs]] | أقصى N شغالين |
| [[close(jobs)]] | الـ workers يخلصوا |
| goroutine فيها [[wg.Wait()]] ثم [[close(results)]] | النتايج تتقفل من غير deadlock |
| [[errgroup.WithContext]] + [[SetLimit(n)]] + [[g.Go]] + [[g.Wait()]] | حد، وأول error، وإلغاء الباقي |
| [[out[i]]] على slice محجوزة | نتايج بالترتيب ومن غير race |

- الترتيب مش مضمون مع أكتر من worker.
- [[go get pkg@version]] لو آخر نسخة عايزة Go أحدث.`,
          lines: [
            "باكدج main.",
            "imports.",
            "context.",
            "fmt.",
            "sync.",
            "time.",
            "مكتبة رسمية بره القياسية.",
            "قفلة.",
            "شغلانة بتاخد وقت.",
            "20ms.",
            "النتيجة.",
            "قفلة.",
            R`worker pool بعدد workers.`,
            "channel الشغل.",
            "channel النتايج.",
            "WaitGroup للـ workers.",
            R`N worker.`,
            "سجّل.",
            "worker...",
            "...Done لما يخلص.",
            "خد شغل لحد ما jobs تتقفل...",
            "...واعمله وابعت النتيجة.",
            "قفلة.",
            "قفلة الـ worker.",
            "قفلة الـ loop.",
            "goroutine بتبعت الشغل...",
            "...لكل id...",
            "...ابعت.",
            "قفلة.",
            "مفيش شغل تاني.",
            "قفلة.",
            "goroutine بتستنى الـ workers...",
            "...لما كلهم يخلصوا...",
            "...اقفل النتايج.",
            "قفلة.",
            "اجمع.",
            "لحد ما results تتقفل.",
            "ضيف.",
            "قفلة.",
            "رجّع.",
            "قفلة.",
            "نفس الفكرة بـ errgroup.",
            "group و ctx بيتلغي مع أول error.",
            "اتنين بس في نفس الوقت.",
            "لكل URL...",
            "...شغّل (بيستنى لو فيه اتنين شغالين).",
            "استنى...",
            "...الإلغاء...",
            "...ورجّع سببه...",
            "...أو 10ms ومتعملش حاجة.",
            "قفلة.",
            "لو bad...",
            "...error.",
            "قفلة.",
            "نجاح.",
            "قفلة.",
            "قفلة.",
            "استنى ورجّع أول error.",
            "قفلة.",
            "main.",
            "الوقت.",
            "8 شغلانات، 4 workers.",
            "8 نتايج في حوالي 40ms.",
            "أول error.",
            "قفلة."
          ],
          sol: R`الناتج:
[[8 40ms]]
[[fetch bad: status 500]]

بـ worker واحد: [[8 160ms]]، وبـ 8: [[8 20ms]]. الوقت بيقل مع الـ workers لحد ما يبقى عددهم قد عدد الشغل (أو قد الحد اللي الخدمة التانية تستحمله).

pool بالترتيب (الكود تحت): بنبعت [[job{i, id}]]، والـ worker بيكتب في [[out[j.i]]]. مفيش race لأن كل worker بيكتب في خانة مختلفة، والنتيجة [[[10 20 30 40 50 60 70 80]]].`,
          solCode: R`type job struct{ i, id int }

func orderedPool(ids []int, workers int) []int {
  out := make([]int, len(ids))
  jobs := make(chan job)
  var wg sync.WaitGroup
  for range workers {
    wg.Go(func() {
      for j := range jobs {
        out[j.i] = resize(j.id)
      }
    })
  }
  for i, id := range ids {
    jobs <- job{i, id}
  }
  close(jobs)
  wg.Wait()
  return out
}`
        },
        {
          cmd: "Gin و Echo و chi",
          title: "Gin و chi: إمتى تحتاج framework، وإمتى net/http كفاية",
          desc: R`من Go 1.22 الـ [[net/http]] فيها routing بالـ methods والـ parameters، فأغلب الـ APIs تقدر تتكتب من غير framework. بس فيه مكتبات مشهورة هتقابلها في الشغل:

• [[chi]]: router صغير متوافق 100٪ مع net/http (الـ handlers هي هي [[func(w, r)]]). بيضيف groups ([[r.Route("/api/v1", ...)]]) و middleware لكل group ومجموعة middlewares جاهزة (RequestID و Logger و Recoverer و Timeout). لو بدأت بالقياسي وكبرت، chi أسهل نقلة.
• [[Gin]]: أشهر framework. الـ handler شكله مختلف: [[func(c *gin.Context)]]، و [[c.Param("id")]] و [[c.JSON(200, gin.H{...})]] و [[c.ShouldBindJSON(&in)]] مع validation بالـ tags. أسرع في الكتابة، بس كودك بيبقى مربوط بيه.
• [[Echo]] و [[Fiber]]: شبه Gin. Fiber مبني على fasthttp مش net/http، فمش متوافق مع middlewares المكتبة القياسية.

إمتى تختار إيه؟
• مشروع جديد أو فريق صغير: القياسي، وبعدين chi لو احتجت groups.
• فريق متعود على Gin، أو مشروع موجود بيه: Gin تمام.
• محتاج Fiber لأداء استثنائي: نادرًا، وقيس الأول (الداتابيز غالبًا هي البطء مش الـ router).

الفكرة المهمة: اللي بتتعلمه في net/http (Handler و middleware و context و httptest) هو الأساس اللي كلهم مبنيين عليه.

[[gin.H]] مجرد اسم مختصر لـ [[map[string]any]].`,
          example: R`package main

import (
  "log"
  "net/http"

  "github.com/go-chi/chi/v5"
  "github.com/go-chi/chi/v5/middleware"
)

func main() {
  r := chi.NewRouter()
  r.Use(middleware.RequestID)
  r.Use(middleware.Logger)
  r.Use(middleware.Recoverer)

  r.Route("/api/v1", func(r chi.Router) {
    r.Get("/users/{id}", func(w http.ResponseWriter, r *http.Request) {
      w.Write([]byte("user " + chi.URLParam(r, "id") + "\n"))
    })
  })

  log.Fatal(http.ListenAndServe(":8080", r))
}`,
          try: R`[[go get github.com/go-chi/chi/v5]] وشغّل وجرّب [[curl localhost:8080/api/v1/users/7]] وبص على اللوج. وبعدين اكتب نفس الـ endpoint بـ Gin (الحل تحت) و [[go get github.com/gin-gonic/gin]]، ورجّع JSON بدل النص. وقارن حجم الـ binary في الحالتين بـ [[go build]] و [[ls -lh]].`,
          flag: "script",
          deep: {
            why: R`هتقابل Gin في أغلب إعلانات الشغل والمشاريع الموجودة، فلازم تقراه وتكتبه. بس الفهم الحقيقي في net/http، وده اللي بيخليك تنقل بين أي framework في يوم، وتعرف تكتب سيرفر من غير أي حاجة لو احتجت.`,
            how: R`[[r.Use]] بيضيف middleware لكل اللي جوّا الـ router ده. و [[r.Route]] بيعمل sub-router ليه prefix، وممكن يبقى له middlewares خاصة بيه ([[r.With(auth).Get(...)]]).

[[chi.URLParam(r, "id")]] هو المقابل لـ [[r.PathValue("id")]]. والـ middlewares بتاعة chi شكلها [[func(http.Handler) http.Handler]]، نفس اللي كتبناه في درس الـ middleware، فتقدر تخلطهم.

في Gin [[gin.Default()]] بيضيف Logger و Recovery لوحده. و [[c.ShouldBindJSON(&in)]] بيعمل decode و validation بالـ tags ([[binding:"required,email"]]) في سطر. [[r.Run(":8080")]] بيشغّل [[http.ListenAndServe]] من جوّا. وللإنتاج اعمل [[http.Server]] بـ timeouts وادّيله [[Handler: r]] زي درس الإغلاق النضيف.

الحجم: Gin بيسحب dependencies أكتر بكتير من chi (validator و json و msgpack...)، فالـ binary أكبر بعدة ميجا.`,
            when: R`القياسي: أي API جديد. chi: لما الـ routes تكتر ومحتاج groups و middlewares لكل جزء، وعايز تفضل على net/http. Gin: لو الفريق أو المشروع عليه، أو عايز binding و validation جاهزين.`,
            mistakes: R`تختار framework قبل ما تعرف net/http فتتلخبط لما تحتاج حاجة الـ framework مش عاملها. و [[r.Run]] في الإنتاج من غير timeouts. و Fiber عشان «الأسرع» وبعدين تكتشف إن مكتبات كتير مش شغالة معاه. وتخلط Gin context ([[*gin.Context]]) مع [[context.Context]]: استخدم [[c.Request.Context()]] للإلغاء.`
          },
          teach: R`## الكود ده بيعمل إيه؟

نفس الـ endpoint ([[GET /api/v1/users/{id}]]) مكتوب مرتين:

- المثال بـ **chi**: router فوق net/http، معاه ٣ middlewares جاهزين.
- الحل بـ **Gin**: framework بشكل handler مختلف، وبيرجّع JSON.

جرّبت الاتنين جوه [[docker run --rm golang:1.25]] (Go 1.25.14)، بـ chi v5.3.2 و Gin v1.12.0.

---

## ١. chi

### التسطيب

~~~bash
go get github.com/go-chi/chi/v5
~~~

~~~text الناتج (آخر سطر)
go: added github.com/go-chi/chi/v5 v5.3.2
~~~

[[/v5]] في آخر المسار: Go بتحط رقم الـ major version في اسم الـ module لما يبقى 2 أو أكتر.

### الـ imports

~~~go main.go
import (
  "log"
  "net/http"

  "github.com/go-chi/chi/v5"
  "github.com/go-chi/chi/v5/middleware"
)
~~~

[[middleware]] باكدج جوه chi فيها middlewares جاهزة، كلها بالشكل [[func(http.Handler) http.Handler]] اللي كتبناه بإيدنا في درس الـ middleware.

### الـ router والـ middlewares

~~~go main.go
  r := chi.NewRouter()
  r.Use(middleware.RequestID)
  r.Use(middleware.Logger)
  r.Use(middleware.Recoverer)
~~~

- [[chi.NewRouter()]]: زي [[http.NewServeMux()]].
- [[r.Use(mw)]]: لف كل الـ routes اللي هتتسجّل بالـ middleware ده. بالترتيب: أول واحد هو اللي بره.

| الـ middleware | بيعمل إيه |
|---|---|
| [[RequestID]] | بيدّي كل طلب ID ويحطه في الـ context |
| [[Logger]] | سطر لوج لكل طلب، وفيه الـ ID |
| [[Recoverer]] | يمسك الـ panic ويرد 500 (زي recoverer بتاعنا) |

### group بـ prefix

~~~go main.go
  r.Route("/api/v1", func(r chi.Router) {
    r.Get("/users/{id}", func(w http.ResponseWriter, r *http.Request) {
      w.Write([]byte("user " + chi.URLParam(r, "id") + "\n"))
    })
  })
~~~

- [[r.Route(prefix, func(r chi.Router) {...})]]: كل اللي جوّا الدالة بيبدأ بـ [[/api/v1]]. الـ [[r]] اللي داخل الدالة sub-router جديد (بيغطّي اسم [[r]] اللي بره).
- [[r.Get(path, handler)]]: زي [["GET /path"]] في القياسي.
- الـ handler **هو هو** [[func(w http.ResponseWriter, r *http.Request)]]. ده أهم حاجة في chi: أي handler أو middleware مكتوب لـ net/http بيشتغل معاه.
- [[chi.URLParam(r, "id")]]: زي [[r.PathValue("id")]].

### التشغيل

~~~go main.go
  log.Fatal(http.ListenAndServe(":8080", r))
~~~

الـ router بتاع chi بيحقق [[http.Handler]]، فبيتبعت لـ ListenAndServe العادية.

~~~text الناتج: curl localhost:8080/api/v1/users/7
user 7
~~~

~~~text لوج السيرفر
2026/10/07 17:06:59 [edfe835ab0f7/B8WXPoOnMD-000001] "GET http://localhost:8080/api/v1/users/7 HTTP/1.1" from [::1]:42198 - 200 7B in 54.575µs
2026/10/07 17:06:59 [edfe835ab0f7/B8WXPoOnMD-000002] "GET http://localhost:8080/users/7 HTTP/1.1" from [::1]:42206 - 404 19B in 28.985µs
~~~

- [[edfe835ab0f7/B8WXPoOnMD-000001]]: الـ request ID من [[RequestID]]: اسم الجهاز (هنا اسم الـ container)، وبعده جزء عشوائي، وبعده عدّاد.
- [[200 7B]]: الـ status وحجم الرد ([[user 7]] + سطر جديد = 7 bytes).
- الطلب التاني من غير [[/api/v1]]: 404، لأن الـ route موجود جوّا الـ group بس.

---

## ٢. Gin (الـ solCode)

~~~bash
go get github.com/gin-gonic/gin
~~~

سحب مكتبات كتير معاه: بعد [[go mod tidy]] الملف [[go.sum]] فيه 89 سطر، مقابل سطرين بس لـ chi.

~~~go solCode
package main

import (
  "net/http"

  "github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()
  r.GET("/api/v1/users/:id", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"id": c.Param("id")})
  })
  r.Run(":8080")
}
~~~

| Gin | المقابل في net/http |
|---|---|
| [[gin.Default()]] | router + Logger + Recovery جاهزين |
| [[r.GET(path, ...)]] | [["GET /path"]] |
| [[:id]] | [[{id}]] |
| [[func(c *gin.Context)]] | [[func(w, r)]]، الاتنين جوّا [[c]] ([[c.Writer]] و [[c.Request]]) |
| [[c.Param("id")]] | [[r.PathValue("id")]] |
| [[c.JSON(200, v)]] | Content-Type + WriteHeader + json.Encode |
| [[gin.H{...}]] | [[map[string]any{...}]] |
| [[r.Run(":8080")]] | [[http.ListenAndServe(":8080", r)]] (من غير timeouts) |

~~~text الناتج: curl localhost:8080/api/v1/users/7
{"id":"7"}
~~~

### اللي Gin بيطبعه وهو بيقوم

~~~text لوج السيرفر
[GIN-debug] [WARNING] Creating an Engine instance with the Logger and Recovery middleware already attached.

[GIN-debug] [WARNING] Running in "debug" mode. Switch to "release" mode in production.
 - using env:	export GIN_MODE=release
 - using code:	gin.SetMode(gin.ReleaseMode)

[GIN-debug] GET    /api/v1/users/:id         --> main.main.func1 (3 handlers)
[GIN-debug] [WARNING] You trusted all proxies, this is NOT safe. We recommend you to set a value.
Please check https://github.com/gin-gonic/gin/blob/master/docs/doc.md#dont-trust-all-proxies for details.
[GIN-debug] Listening and serving HTTP on :8080
[GIN] 2026/10/07 - 17:07:15 | 200 | 50.537µs |             ::1 | GET      "/api/v1/users/7"
~~~

- [[debug mode]]: الوضع الافتراضي. في الإنتاج [[GIN_MODE=release]].
- [[(3 handlers)]]: Logger و Recovery والـ handler بتاعك.
- [[trusted all proxies]]: Gin بيصدّق header [[X-Forwarded-For]] من أي حد، فاليوزر يقدر يزوّر الـ IP بتاعه. بتتظبط بـ [[r.SetTrustedProxies]].
- آخر سطر: لوج الطلب بشكل Gin.

---

## ٣. حجم الـ binary

بنيت الاتنين بـ [[go build]] العادي:

~~~text الحجم بالـ bytes
9774700   chi
21019926  Gin
~~~

Gin أكبر من الضعف، عشان الـ validator والـ JSON والـ protobuf والمكتبات اللي جت معاه.

---

## الخلاصة

| | net/http | chi | Gin |
|---|---|---|---|
| شكل الـ handler | [[func(w, r)]] | [[func(w, r)]] | [[func(c *gin.Context)]] |
| parameter | [[{id}]] + [[r.PathValue]] | [[{id}]] + [[chi.URLParam]] | [[:id]] + [[c.Param]] |
| groups | لأ | [[r.Route]] | [[r.Group]] |
| middlewares القياسية | أيوه | أيوه | لأ، شكل خاص |
| الحجم هنا | | 9.8 ميجا | 21 ميجا |

- chi = net/http + groups + middlewares جاهزة.
- Gin أسرع في الكتابة، بس كودك بيبقى مربوط بـ [[gin.Context]]. وللإنتاج: [[GIN_MODE=release]] و [[http.Server]] بـ timeouts بدل [[r.Run]].`,
          lines: [
            "باكدج main.",
            "imports.",
            "log.",
            "net/http.",
            "chi.",
            "الـ middlewares الجاهزة بتاعة chi.",
            "قفلة.",
            "main.",
            "router.",
            "request ID لكل طلب.",
            "لوج لكل طلب.",
            "recover من الـ panic ويرد 500.",
            R`group بـ prefix [[/api/v1]].`,
            "GET بـ parameter.",
            R`[[chi.URLParam]] زي [[r.PathValue]].`,
            "قفلة.",
            "قفلة الـ group.",
            R`الـ router نفسه [[http.Handler]]، فـ ListenAndServe بتاخده.`,
            "قفلة."
          ],
          sol: R`[[curl localhost:8080/api/v1/users/7]]: [[user 7]]، واللوج بتاع chi:
[[2026/10/01 12:00:00 [host/abc-000001] "GET http://localhost:8080/api/v1/users/7 HTTP/1.1" from 127.0.0.1:51234 - 200 7B in 20.1µs]]

بـ Gin (الكود تحت): [[{"id":"7"}]]، و Gin بيطبع تحذير [[[WARNING] Running in "debug" mode]] لحد ما تحط [[GIN_MODE=release]]. وحجم الـ binary بـ Gin أكبر بشكل ملحوظ من chi (حوالي الضعف لبرنامج بالحجم ده).`,
          solCode: R`package main

import (
  "net/http"

  "github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()
  r.GET("/api/v1/users/:id", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"id": c.Param("id")})
  })
  r.Run(":8080")
}`
        }
      ]
    }
]);

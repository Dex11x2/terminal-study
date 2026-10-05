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

السطر الأخير (Debug) مطلعش. و jq بيطلّع سطر الـ ERROR بس. ومستوى اللوج من env في الكود تحت.`,
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
            how: R`[[-trimpath]] بيشيل مسارات جهازك من الـ binary (أنضف وبيخلي البناء يتكرر). [[-ldflags="-s -w"]] بيشيل معلومات الـ debug فيصغر الحجم حوالي الربع.

[[./cmd/api]]: بيبني الباكدج اللي في الفولدر ده (الهيكل من درس هيكل المشروع).

[[USER 65534:65534]]: يوزر nobody، عشان البرنامج ميشتغلش root. scratch مفيهاش ملف [[/etc/passwd]] فبنكتب الرقم. distroless:nonroot فيها يوزر جاهز.

[[ENTRYPOINT ["/api"]]] بصيغة الـ array: البرنامج بيبقى PID 1 مباشرة ويستقبل SIGTERM (درس الإغلاق النضيف). الصيغة النصية ([[ENTRYPOINT /api]]) بتحتاج shell، والـ scratch مفيهاش shell أصلًا.

Timezones: لو بتستخدم [[time.LoadLocation("Africa/Cairo")]] في scratch هتفشل. الحل [[import _ "time/tzdata"]] في main (بيضيف حوالي 450KB للـ binary)، أو distroless.

لو محتاج shell للـ debugging مؤقتًا: [[distroless/static-debian12:debug]] فيها busybox، أو [[docker debug]].`,
            when: R`أي خدمة Go بتنشرها بـ Docker. scratch لو عايز أصغر حاجة ومستعد تتعامل مع الشهادات والـ timezones، و distroless static لو عايز الافتراضيات الآمنة من غير تفكير. و alpine لو محتاج shell وأدوات جوه الـ container (أكبر شوية).`,
            mistakes: R`تنسى الشهادات في scratch: [[x509: certificate signed by unknown authority]] في أول HTTPS call. وتبني بـ cgo (الافتراضي في بعض الحالات) وتنسخ لـ scratch: [[exec /api: no such file or directory]] رغم إن الملف موجود (الحقيقة: الـ dynamic linker مش موجود). و [[COPY . .]] قبل [[go mod download]] فالكاش يضيع مع كل تعديل. و [[COPY go.mod go.sum ./]] في مشروع مفيهوش مكتبات: go.sum مش موجود فالبناء يقع بـ [["/go.sum": not found]]، وعشان كده المثال كاتب [[go.sum*]]. ومفيش [[.dockerignore]] فالـ .git كله بيتبعت للـ build.`
          },
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
[[dist/app.exe: PE32+ executable (console) x86-64, for MS Windows, ...]]

تشغيل نسخة arm64 على جهاز amd64: [[cannot execute binary file: Exec format error]] (أو [[exec format error]] في Docker). يعني الملف سليم بس لمعالج تاني.`
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
    },
    {
      t: "الانترفيو ومشروع كامل",
      l: 3,
      n: "الأسئلة اللي بتتسأل في انترفيوهات Go بإجاباتها، ومشروع REST API كامل بيجمع كل اللي فات",
      items: [
        {
          cmd: "أسئلة انترفيو Go",
          title: "أسئلة انترفيو Go المشهورة: slices و maps و nil و goroutines و channels",
          desc: R`أسئلة انترفيو Go غالبًا بتيجي من نفس المواضيع. المثال تحت فيه ٥ أسئلة «الكود ده بيطبع إيه؟»، وتحت إجابات مختصرة لأشهر الأسئلة النظرية:

• goroutine ولا thread؟ الـ goroutine بيديرها الـ runtime بتاع Go، وبتبدأ بـ stack صغير (حوالي 2KB) بيكبر لو احتاج، وكتير منها بتتوزع على عدد قليل من threads نظام التشغيل (M:N scheduling). فتقدر تشغّل مئات الآلاف.
• buffered ولا unbuffered channel؟ unbuffered: الإرسال بيستنى لحد ما حد يستقبل (تزامن). buffered: بيستنى بس لما تتملي.
• channel مقفولة أو nil: الاستقبال من مقفولة بيرجّع القيمة الصفرية فورًا، والإرسال عليها panic، و close مرتين panic. والإرسال أو الاستقبال على nil channel بيستنى للأبد.
• slice جوّاها إيه؟ pointer لـ array و len و cap. وأكتر من slice ممكن يشاوروا على نفس الـ array، فـ append على واحدة ممكن يكتب في التانية.
• map و goroutines: مش آمن للكتابة المتزامنة، والـ runtime بيوقف البرنامج بـ [[concurrent map writes]]. الحل Mutex أو [[sync.Map]].
• make ولا new؟ [[make]] للـ slices والـ maps والـ channels بس، وبترجّع قيمة جاهزة للاستخدام. [[new(T)]] لأي نوع، وبترجّع [[*T]] لقيمة صفرية.
• value ولا pointer receiver؟ pointer لو بتعدّل أو الـ struct كبير أو فيه Mutex، ووحّدهم في النوع الواحد.
• interface و nil: interface فيه typed nil pointer مش بيساوي nil.
• defer: بيتنفذ بالعكس (LIFO)، والـ arguments بتتحسب وقت كتابة defer.
• goroutine leak إيه وإزاي تمنعه؟ goroutine مستنية حاجة مش هتحصل. الحل: context للإلغاء، و buffered channels للنتايج، وكل goroutine ليها طريقة واضحة تخلص بيها.
• الـ GC في Go: concurrent mark-and-sweep، بيشتغل جنب البرنامج ووقفاته قصيرة جدًا (غالبًا أقل من ملّي ثانية). وبتتحكم فيه بـ [[GOGC]] و [[GOMEMLIMIT]].
• errors ولا exceptions؟ الـ errors قيم بترجع من الدوال، وبتتغلّف بـ [[%w]] وبتتسأل بـ errors.Is و As. و panic للحاجات المستحيلة بس.`,
          example: R`package main

import "fmt"

type T struct{}

func (T) String() string { return "T" }

func main() {
  // ١. slices بتشارك نفس الـ array
  s := make([]int, 3, 10)
  a := append(s, 4)
  b := append(s, 5)
  fmt.Println(a[3], b[3])

  // ٢. nil map: القراية تمام
  var m map[string]int
  fmt.Println(m["x"], len(m))

  // ٣. interface فيه nil pointer
  var p *T
  var st fmt.Stringer = p
  fmt.Println(st == nil)

  // ٤. range بيدّي نسخة
  x := []int{1, 2, 3}
  for _, v := range x {
    v *= 10
    _ = v
  }
  fmt.Println(x)

  // ٥. defer بالعكس، والقيمة بتتحسب وقت ما تكتبه
  for i := range 3 {
    defer fmt.Print(i, " ")
  }
}`,
          try: R`قبل ما تشغّل: اكتب على ورقة كل سطر هيطبع إيه وليه. وبعدين شغّل وقارن. وبعدين جاوب بصوت عالي (زي الانترفيو) على: «لو عندك 10,000 URL عايز تعملهم fetch بأسرع وقت من غير ما توقع الـ API، هتعمل إيه؟».`,
          flag: "script",
          deep: {
            why: R`انترفيوهات Go بتختبر إنك فاهم إزاي اللغة بتشتغل من جوّا، مش إنك حافظ syntax. الأسئلة دي بالذات بتتسأل لأن كل واحد فيها بيسبب bug حقيقي في الإنتاج لو مش فاهمه.`,
            how: R`١: s طولها 3 والـ cap بتاعها 10، فالـ append الأول كتب 4 في الخانة 3 من نفس الـ array، والتاني كتب 5 في نفس الخانة. a و b الاتنين بيشاوروا عليها: [[5 5]].

٢: nil map بيرجّع الصفر في القراية: [[0 0]]. الكتابة هي اللي بتعمل panic.

٣: st جوّاه النوع [[*T]] وقيمة nil: [[false]].

٤: v نسخة، فـ x متغيّرش: [[[1 2 3]]]. ([[_ = v]] عشان الـ compiler ميشتكيش إن v متغيّر ومش مستخدم بعد التعديل.)

٥: الـ defers بتتنفذ لما main تخلص بالعكس: [[2 1 0]].

وسؤال الـ 10,000 URL: الإجابة الكويسة فيها: errgroup أو worker pool بحد (مثلًا 20)، و http.Client واحد بـ timeout، و context بمهلة كلية بيتلغي مع أول error لو ده المطلوب (أو تجمع الأخطاء لو لأ)، و retry بـ backoff للـ 5xx بس، واحترام الـ rate limit (429 و Retry-After).`,
            when: R`قبل أي انترفيو Go. وكمان كـ checklist وانت بتعمل code review: الحاجات دي هي اللي بتعدّي من غير ما حد يلاحظ.`,
            mistakes: R`تحفظ إجابات من غير ما تجرّب الكود بنفسك. وتقول «goroutines أسرع من threads» من غير ما تشرح ليه (أخف في الذاكرة والـ scheduling، مش أسرع في الحساب). وتقول «Go مفيهاش OOP» (فيها: structs و methods و interfaces و composition، بس مفيش inheritance).`
          },
          lines: [
            "باكدج main.",
            "import fmt.",
            "نوع فاضي.",
            R`[[String]] على T.`,
            "main.",
            "len 3 و cap 10.",
            "بيكتب في الخانة 3 من نفس الـ array.",
            "بيكتب فوقها.",
            "5 5.",
            "nil map.",
            "0 0.",
            "pointer بـ nil.",
            "جوّا interface.",
            "false.",
            "slice.",
            "v نسخة.",
            "تعديل النسخة.",
            "عشان الـ compiler.",
            "قفلة.",
            "[1 2 3].",
            "3 defers.",
            "بتتنفذ في الآخر بالعكس.",
            "قفلة.",
            "هنا بيطبع: 2 1 0."
          ],
          sol: R`الناتج:
[[5 5]]
[[0 0]]
[[false]]
[[[1 2 3]]]
[[2 1 0 ]]

وإجابة سؤال الـ 10,000 URL في كود (تحت): errgroup بحد 20، و client بمهلة، وكل goroutine بتكتب نتيجتها في خانتها.`,
          solCode: R`func fetchAll(ctx context.Context, urls []string) ([]int, error) {
  client := &http.Client{Timeout: 10 * time.Second}
  statuses := make([]int, len(urls))
  g, ctx := errgroup.WithContext(ctx)
  g.SetLimit(20)
  for i, u := range urls {
    g.Go(func() error {
      req, err := http.NewRequestWithContext(ctx, http.MethodGet, u, nil)
      if err != nil {
        return err
      }
      resp, err := client.Do(req)
      if err != nil {
        return fmt.Errorf("fetch %s: %w", u, err)
      }
      resp.Body.Close()
      statuses[i] = resp.StatusCode
      return nil
    })
  }
  return statuses, g.Wait()
}`
        },
        {
          cmd: "مشروع: REST API لمهام",
          title: "مشروع كامل: REST API للمهام بالمكتبة القياسية، من الـ routing للـ validation",
          desc: R`ده ملف واحد بيجمع اللي اتعلمته في API حقيقي صغير لإدارة مهام (tasks):
• [[GET /tasks]]: كل المهام مترتبة.
• [[POST /tasks]] بـ [[{"title": "..."}]]: مهمة جديدة (201).
• [[GET /tasks/{id}]]: مهمة واحدة (404 لو مش موجودة).
• [[PATCH /tasks/{id}/done]]: علّمها خلصت.

الأجزاء:
• [[Store]]: التخزين في الذاكرة (map)، ومحمي بـ [[sync.RWMutex]] لأن كل request في goroutine. [[RLock]] للقراية (كذا واحد مع بعض) و [[Lock]] للكتابة. وبيرجّع [[ErrNotFound]] (sentinel error).
• [[API]]: struct فيه الـ dependencies (الـ store). الـ handlers methods عليه، فمفيش global variables.
• [[writeJSON]] و [[writeError]]: helpers عشان كل الردود يبقى شكلها واحد، والـ errors تبقى [[{"error": "..."}]].
• الـ validation: body بحد أقصى 1MB، و JSON سليم، و title مش فاضي ومش أطول من 200 بايت. 400 للـ JSON البايظ، و 422 للبيانات اللي مش مقبولة.
• [[Routes()]] بترجّع الـ handler، فالاختبار يقدر يستخدمه بـ httptest من غير ما يشغّل سيرفر.
• [[taskFromPath]]: بتاخد دالة ([[a.store.Get]] أو [[a.store.MarkDone]]) عشان منكررش قراية الـ id ومعالجة الـ errors. [[a.store.Get]] هنا اسمها method value: method مربوطة بالـ store بتاعها وبتتبعت كدالة عادية.

[[1<<20]] = 1,048,576 بايت = 1MB. و [[a.ID - b.ID]] في SortFunc: سالب لو a قبل b.

الخطوة الجاية بعد ما يشتغل: الإغلاق النضيف و slog middleware (من الدروس اللي فاتت)، وتبدّل الـ Store بـ Postgres من غير ما تلمس الـ handlers (لو خليت API ياخد interface).`,
          example: R`package main

import (
  "encoding/json"
  "errors"
  "log/slog"
  "net/http"
  "os"
  "slices"
  "strconv"
  "strings"
  "sync"
  "time"
)

type Task struct {
  ID        int       $__btjson:"id"$__bt
  Title     string    $__btjson:"title"$__bt
  Done      bool      $__btjson:"done"$__bt
  CreatedAt time.Time $__btjson:"created_at"$__bt
}

var ErrNotFound = errors.New("task not found")

type Store struct {
  mu     sync.RWMutex
  nextID int
  tasks  map[int]Task
}

func NewStore() *Store {
  return &Store{nextID: 1, tasks: make(map[int]Task)}
}

func (s *Store) Create(title string) Task {
  s.mu.Lock()
  defer s.mu.Unlock()
  t := Task{ID: s.nextID, Title: title, CreatedAt: time.Now().UTC()}
  s.tasks[t.ID] = t
  s.nextID++
  return t
}

func (s *Store) Get(id int) (Task, error) {
  s.mu.RLock()
  defer s.mu.RUnlock()
  t, ok := s.tasks[id]
  if !ok {
    return Task{}, ErrNotFound
  }
  return t, nil
}

func (s *Store) MarkDone(id int) (Task, error) {
  s.mu.Lock()
  defer s.mu.Unlock()
  t, ok := s.tasks[id]
  if !ok {
    return Task{}, ErrNotFound
  }
  t.Done = true
  s.tasks[id] = t
  return t, nil
}

func (s *Store) List() []Task {
  s.mu.RLock()
  defer s.mu.RUnlock()
  out := make([]Task, 0, len(s.tasks))
  for _, t := range s.tasks {
    out = append(out, t)
  }
  slices.SortFunc(out, func(a, b Task) int { return a.ID - b.ID })
  return out
}

type API struct {
  store *Store
}

func writeJSON(w http.ResponseWriter, status int, v any) {
  w.Header().Set("Content-Type", "application/json")
  w.WriteHeader(status)
  json.NewEncoder(w).Encode(v)
}

func writeError(w http.ResponseWriter, status int, msg string) {
  writeJSON(w, status, map[string]string{"error": msg})
}

func (a *API) list(w http.ResponseWriter, r *http.Request) {
  writeJSON(w, http.StatusOK, a.store.List())
}

func (a *API) create(w http.ResponseWriter, r *http.Request) {
  var in struct {
    Title string $__btjson:"title"$__bt
  }
  r.Body = http.MaxBytesReader(w, r.Body, 1<<20)
  if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
    writeError(w, http.StatusBadRequest, "invalid JSON")
    return
  }
  in.Title = strings.TrimSpace(in.Title)
  if in.Title == "" || len(in.Title) > 200 {
    writeError(w, http.StatusUnprocessableEntity, "title is required (max 200 bytes)")
    return
  }
  writeJSON(w, http.StatusCreated, a.store.Create(in.Title))
}

func (a *API) taskFromPath(w http.ResponseWriter, r *http.Request, f func(int) (Task, error)) {
  id, err := strconv.Atoi(r.PathValue("id"))
  if err != nil {
    writeError(w, http.StatusBadRequest, "id must be a number")
    return
  }
  t, err := f(id)
  switch {
  case errors.Is(err, ErrNotFound):
    writeError(w, http.StatusNotFound, err.Error())
  case err != nil:
    writeError(w, http.StatusInternalServerError, "internal error")
  default:
    writeJSON(w, http.StatusOK, t)
  }
}

func (a *API) Routes() http.Handler {
  mux := http.NewServeMux()
  mux.HandleFunc("GET /tasks", a.list)
  mux.HandleFunc("POST /tasks", a.create)
  mux.HandleFunc("GET /tasks/{id}", func(w http.ResponseWriter, r *http.Request) {
    a.taskFromPath(w, r, a.store.Get)
  })
  mux.HandleFunc("PATCH /tasks/{id}/done", func(w http.ResponseWriter, r *http.Request) {
    a.taskFromPath(w, r, a.store.MarkDone)
  })
  return mux
}

func main() {
  api := &API{store: NewStore()}
  addr := ":8080"
  if v := os.Getenv("ADDR"); v != "" {
    addr = v
  }
  srv := &http.Server{Addr: addr, Handler: api.Routes(), ReadHeaderTimeout: 5 * time.Second}
  slog.Info("listening", "addr", addr)
  if err := srv.ListenAndServe(); err != nil {
    slog.Error("server stopped", "err", err)
    os.Exit(1)
  }
}`,
          try: R`اعمل [[lab/go/tasks]] و [[go mod init example.com/tasks]] واحفظ الملف وشغّله. جرّب:
[[curl -s -X POST localhost:8080/tasks -d '{"title":"اتعلم Go"}']]
[[curl -s localhost:8080/tasks]]
[[curl -s -X PATCH localhost:8080/tasks/1/done]]
[[curl -s -i localhost:8080/tasks/99]]
[[curl -s -i -X POST localhost:8080/tasks -d '{"title":"  "}']]
[[curl -s -i -X POST localhost:8080/tasks -d 'not json']]
وبعدين اكتب [[main_test.go]] بيختبر السيناريو كله بـ httptest، وشغّله بـ [[go test -race -v]]. وكمّل: ضيف [[DELETE /tasks/{id}]]، والإغلاق النضيف، و logging middleware بـ slog.`,
          flag: "script",
          deep: {
            why: R`الدروس لوحدها بتعلّمك الأجزاء. المشروع بيوريك الأجزاء بتتركّب إزاي: الـ Mutex في مكانه عشان الـ handlers شغالة بالتوازي، والـ sentinel error بيتحوّل لـ 404، والـ helpers بتوحّد الردود، والتصميم بيخلي الاختبار سهل. ده نفس شكل الـ APIs الحقيقية بس من غير داتابيز.`,
            how: R`الطلب بيمشي كده: ServeMux بيطابق [["POST /tasks"]] وينادي [[a.create]]. create بتحط حد للـ body، وتعمل decode لـ struct من غير اسم فيه title بس (فمحدش يقدر يبعت id أو done)، وتنضّف وتتحقق، وبعدين [[Store.Create]] بتاخد القفل وتضيف وترجّع.

ليه RWMutex؟ لأن List و Get بيتنادوا أكتر من Create، و RLock بيسمح لكذا قراية مع بعض.

List بتنسخ المهام في slice جديدة وترتّبها: الـ map مش مترتب، ومينفعش نرجّع الـ map نفسه لأن حد بره ممكن يقراه وحد جوّا بيكتب (race).

[[time.Now().UTC()]]: خزّن الأوقات UTC دايمًا، وحوّل للتوقيت المحلي في العرض بس.

لو ضفت [[DisallowUnknownFields]] للـ decoder، أي مفتاح زيادة هيرجّع 400.

الـ status codes: 201 للإنشاء، و 400 للطلب البايظ (JSON أو id مش رقم)، و 404 للمش موجود، و 405 لوحدها من الـ mux، و 422 للبيانات اللي مش مقبولة، و 500 لأي حاجة مش متوقعة.

[[len(in.Title) > 200]] بتعد بايتات. لو عايز 200 حرف عربي استخدم [[utf8.RuneCountInString]] (درس النصوص).`,
            when: R`نقطة بداية لأي API صغير، أو ك template تبني عليه: بدّل Store بـ Postgres (database/sql)، وضيف auth middleware، و config من env، و Dockerfile، و CI بيشغّل [[go vet]] و [[go test -race]].`,
            mistakes: R`map من غير Mutex مع handlers بتشتغل بالتوازي (go test -race هيمسكها). وترجّع الـ map الداخلي أو slice بتشاور عليه. وتنسى return بعد writeError. ورسايل errors داخلية للعميل (stack traces أو SQL). و 200 لكل حاجة حتى الأخطاء.`
          },
          lines: [
            "باكدج main.",
            "imports.",
            "JSON.",
            "errors.",
            "لوج.",
            "HTTP.",
            "env.",
            "الترتيب.",
            "تحويل الـ id.",
            "TrimSpace.",
            "RWMutex.",
            "الأوقات.",
            "قفلة.",
            "المهمة.",
            R`[[id]] في JSON.`,
            "العنوان.",
            "خلصت ولا لأ.",
            "وقت الإنشاء، snake_case في JSON.",
            "قفلة.",
            "sentinel error للمش موجود.",
            "التخزين.",
            "قفل: كتير يقروا، أو واحد يكتب.",
            "الـ id الجاي.",
            "المهام بالـ id.",
            "قفلة.",
            "constructor: الـ map لازم make.",
            "يبدأ من 1.",
            "قفلة.",
            "إضافة.",
            "قفل كتابة.",
            "افتح في الآخر.",
            "مهمة جديدة بالـ id الجاي ووقت UTC.",
            "خزّن.",
            "زوّد العدّاد.",
            "رجّعها.",
            "قفلة.",
            "قراية واحدة.",
            "قفل قراية: كذا واحد مع بعض.",
            "افتح.",
            "comma ok.",
            "مش موجودة...",
            "...sentinel error.",
            "قفلة.",
            "موجودة.",
            "قفلة.",
            "تعليم إنها خلصت.",
            "قفل كتابة.",
            "افتح.",
            "اقرا.",
            "مش موجودة...",
            "...error.",
            "قفلة.",
            "عدّل النسخة...",
            "...ورجّعها في الـ map (القيمة struct مش pointer).",
            "رجّع.",
            "قفلة.",
            "الكل.",
            "قفل قراية.",
            "افتح.",
            "slice جديدة بالمساحة الصح.",
            "انسخ من الـ map...",
            "...ضيف.",
            "قفلة.",
            "رتّب بالـ id.",
            "رجّع النسخة (مش الـ map نفسه).",
            "قفلة.",
            "الـ API struct: فيه الـ dependencies.",
            "الـ store.",
            "قفلة.",
            "helper لأي رد JSON.",
            "header.",
            "status.",
            "body.",
            "قفلة.",
            "helper للأخطاء بشكل ثابت.",
            R`[[{"error": "..."}]].`,
            "قفلة.",
            "GET /tasks.",
            "200 والقايمة.",
            "قفلة.",
            "POST /tasks.",
            "struct من غير اسم فيه اللي مسموح بيه بس...",
            "...title.",
            "قفلة.",
            "حد أقصى 1MB للـ body.",
            "decode.",
            "JSON بايظ: 400.",
            "اخرج.",
            "قفلة.",
            "شيل المسافات.",
            "فاضي أو طويل؟",
            "422.",
            "اخرج.",
            "قفلة.",
            "201 والمهمة الجديدة.",
            "قفلة.",
            "helper للمسارات اللي فيها id: بياخد دالة الـ store.",
            "id من المسار.",
            "مش رقم...",
            "...400.",
            "اخرج.",
            "قفلة.",
            "نادي الدالة اللي جت (Get أو MarkDone).",
            "حوّل الـ error لـ status.",
            "مش موجودة...",
            "...404.",
            "أي error تاني...",
            "...500 من غير تفاصيل داخلية.",
            "تمام...",
            "...200.",
            "قفلة.",
            "قفلة.",
            "الـ routes في مكان واحد.",
            "router.",
            "قايمة.",
            "إنشاء.",
            "واحدة: بتبعت a.store.Get كدالة.",
            "method value.",
            "قفلة.",
            "تعليم: نفس الـ helper بـ MarkDone.",
            "method value.",
            "قفلة.",
            "رجّع.",
            "قفلة.",
            "main.",
            "وصّل الـ dependencies.",
            "البورت الافتراضي.",
            "أو من env.",
            "استخدمه.",
            "قفلة.",
            "سيرفر بـ timeout للـ headers.",
            "لوج.",
            "شغّل.",
            "وقف بـ error.",
            "اقفل.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`الردود:
[[{"id":1,"title":"اتعلم Go","done":false,"created_at":"2026-10-01T12:00:00.123456Z"}]] (بـ 201)
[[[{"id":1,"title":"اتعلم Go","done":false,...}]]]
[[{"id":1,"title":"اتعلم Go","done":true,...}]]
[[HTTP/1.1 404 Not Found]] و [[{"error":"task not found"}]]
[[HTTP/1.1 422 Unprocessable Entity]] و [[{"error":"title is required (max 200 bytes)"}]]
[[HTTP/1.1 400 Bad Request]] و [[{"error":"invalid JSON"}]]

والاختبار (الكود تحت) بيمشي السيناريو: create ثم get ثم done ثم 404. [[go test -race -v]] بيطلع [[--- PASS: TestTasksFlow]] من غير أي race. لو جرّبت تشيل الـ Lock من Create وتعمل اختبار بيبعت 50 create بالتوازي، [[-race]] هيمسكها.`,
          solCode: R`// ملف: main_test.go
package main

import (
  "encoding/json"
  "net/http"
  "net/http/httptest"
  "strings"
  "testing"
)

func do(t *testing.T, h http.Handler, method, path, body string) *httptest.ResponseRecorder {
  t.Helper()
  rec := httptest.NewRecorder()
  h.ServeHTTP(rec, httptest.NewRequest(method, path, strings.NewReader(body)))
  return rec
}

func TestTasksFlow(t *testing.T) {
  h := (&API{store: NewStore()}).Routes()

  rec := do(t, h, "POST", "/tasks", $__bt{"title":"learn go"}$__bt)
  if rec.Code != http.StatusCreated {
    t.Fatalf("create: status %d", rec.Code)
  }
  var task Task
  if err := json.NewDecoder(rec.Body).Decode(&task); err != nil {
    t.Fatal(err)
  }
  if task.ID != 1 || task.Done {
    t.Fatalf("unexpected task %+v", task)
  }

  if rec := do(t, h, "PATCH", "/tasks/1/done", ""); !strings.Contains(rec.Body.String(), $__bt"done":true$__bt) {
    t.Errorf("done: body %s", rec.Body.String())
  }
  if rec := do(t, h, "GET", "/tasks/99", ""); rec.Code != http.StatusNotFound {
    t.Errorf("missing: status %d", rec.Code)
  }
  if rec := do(t, h, "POST", "/tasks", $__bt{"title":"  "}$__bt); rec.Code != http.StatusUnprocessableEntity {
    t.Errorf("empty title: status %d", rec.Code)
  }
}`
        }
      ]
    }
]);

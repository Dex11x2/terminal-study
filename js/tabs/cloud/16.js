// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
    {
      t: "Kubernetes: deploy وتشخيص و Helm",
      l: 3,
      n: "تنزّل نسخة جديدة من غير ما حد يحس وترجع في ثانية، وتعرف الـ pod ماله بالترتيب، وتسطّب وتحدّث بـ Helm",
      items: [
        {
          cmd: "rolling update",
          title: "نسخة جديدة من غير توقف، ولو باظت ترجع",
          desc: R`لما تغيّر الـ image، الـ Deployment بيعمل ReplicaSet جديد ويبدّل الـ pods واحد واحد: يقوّم جديد، يستنى الـ readiness، يقفل قديم. و [[maxSurge]] و [[maxUnavailable]] بيحددوا السرعة، و [[progressDeadlineSeconds]] بيقول إمتى نعتبره فشل.

k8s مش بيرجع لوحده لو النسخة باظت: [[kubectl rollout status]] بيرجّع error، وانت (أو الـ CI) اللي بتعمل [[kubectl rollout undo]].`,
          example: R`kubectl apply -f k8s/web.yaml
kubectl set image deploy/web web=myapp:2.0
kubectl annotate deploy/web kubernetes.io/change-cause="v2.0" --overwrite
kubectl rollout status deploy/web --timeout=120s
kubectl rollout history deploy/web
kubectl rollout undo deploy/web
kubectl rollout undo deploy/web --to-revision=4`,
          try: R`طبّق [[web.yaml]] اللي في الشرح، وفي ترمنال تاني شغّل loop بيعمل [[curl http://shop.localhost/]] كل ٠.٢ ثانية. نزّل 2.0 وعدّ كام طلب فشل. وبعدين نزّل [[myapp:3.0]] (مش موجودة) وشوف [[rollout status]] بيعمل إيه بعد دقيقة، وارجع بـ [[undo]].`,
          deep: {
            why: R`الـ deploy أكتر وقت الموقع بيقع فيه. الـ rolling update مع readinessProbe بيخلّي في كل لحظة فيه pods جاهزة بترد، والـ rollback بيبقى أمر واحد بدل «ابني النسخة القديمة تاني وارفعها». وده اللي بيخلّيك تعمل deploy كذا مرة في اليوم من غير خوف.`,
            how: R`كل تغيير في [[spec.template]] (image، env، resources، annotation) بيعمل ReplicaSet جديد برقم revision جديد. الـ ReplicaSets القديمة بتفضل موجودة بصفر pods ([[revisionHistoryLimit]] الافتراضي ١٠)، وده اللي بيخلّي الـ undo سريع: مش بيبني حاجة، بيكبّر القديم ويصغّر الجديد.

[[maxSurge: 1]] = مسموح pod زيادة واحد فوق [[replicas]] أثناء التبديل. [[maxUnavailable: 0]] = ممنوع ينزل عدد الجاهزين عن [[replicas]]. الافتراضي ٢٥٪ و ٢٥٪.

[[progressDeadlineSeconds]] (افتراضي ٦٠٠): لو مفيش تقدّم المدة دي، الـ condition [[Progressing]] تبقى [[False]] بسبب [[ProgressDeadlineExceeded]]، و [[rollout status]] يخرج بكود 1. ده اللي الـ CI بيستخدمه.

وقت قفل pod قديم: بيخرج من الـ Service، والـ kubelet يبعت SIGTERM، ويستنى لحد [[terminationGracePeriodSeconds]] (٣٠)، وبعدين SIGKILL. التطبيق لازم يقفل لوحده لما ييجي SIGTERM: يخلّص الطلبات اللي معاه ويخرج.`,
            when: R`الـ RollingUpdate هو الافتراضي ومناسب لأغلب الـ APIs. [[Recreate]] (اقفل الكل وبعدين قوّم) لو النسختين مينفعش يشتغلوا مع بعض (migration مش متوافقة). و canary أو blue-green (درس «blue-green vs canary» في أسئلة انترفيو) بأدوات زي Argo Rollouts لو عايز تجرّب على نسبة صغيرة الأول.`,
            mistakes: R`من غير readinessProbe: الـ pod الجديد يتحسب جاهز قبل ما يسمع، والطلبات تفشل وقت كل deploy. وتطبيق مبيسمعش SIGTERM: كل pod قديم ياخد ٣٠ ثانية يقفل والطلبات اللي عليه تتقطع. و [[latest]] في الـ image: [[set image]] لنفس الاسم مبيعملش rollout، والـ undo مالوش معنى. و [[rollout undo]] على الإنتاج ومتنساش ترجّع الـ YAML في Git، وإلا أول [[apply]] يرجّع النسخة البايظة (k8s v1.37 بيحذّرك من ده). وتعتمد على [[change-cause]] وانت مش بتكتبه، فالـ history كلها [[<none>]].`
          },
          teach: R`## الفكرة: بدّل واحد واحد، وخلّي طريق رجوع

أول سطر بيطبّق Deployment متظبط للـ rolling update. التاني بيغيّر الـ image (وده اللي بيبدأ الـ rollout)، والتالت بيكتب سبب التغيير، والرابع بيستنى ويقولك نجح ولا لأ. والتلاتة الأخيرة: السجل، والرجوع خطوة، والرجوع لرقم معين.

اتجرّب على cluster kind (Kubernetes v1.37.0، kubectl v1.37.1) على ويندوز 11، بتطبيق درس «kind load docker-image» بنسخه 1.0 و 2.0، ومع الـ Ingress بتاع درس «Service و Ingress» عشان نبعت طلبات من برا وقت الـ deploy.

---

## ١. [[kubectl apply -f k8s/web.yaml]]

~~~yaml k8s/web.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web
  annotations: { kubernetes.io/change-cause: "v1.0" }
spec:
  replicas: 4
  progressDeadlineSeconds: 60
  strategy:
    type: RollingUpdate
    rollingUpdate: { maxSurge: 1, maxUnavailable: 0 }
  selector: { matchLabels: { app: web } }
  template:
    metadata: { labels: { app: web } }
    spec:
      containers:
        - name: web
          image: myapp:1.0
          ports: [{ containerPort: 3000 }]
          readinessProbe: { httpGet: { path: /readyz, port: 3000 }, periodSeconds: 2 }
          resources: { requests: { cpu: 100m, memory: 64Mi }, limits: { memory: 128Mi } }
~~~

| الحتة | معناها |
|---|---|
| [[kubernetes.io/change-cause]] | نص بيظهر في [[rollout history]]. من غيره السجل كله [[<none>]] |
| [[progressDeadlineSeconds: 60]] | دقيقة من غير تقدّم = فشل (الافتراضي ١٠ دقايق، طويل على CI) |
| [[maxSurge: 1]] | مسموح ٥ pods بدل ٤ أثناء التبديل |
| [[maxUnavailable: 0]] | الجاهزين عمرهم ما يقلّوا عن ٤ |
| [[readinessProbe]] | من غيرها، «جاهز» = الـ process قام، حتى لو لسه مش بيسمع |

---

## ٢. [[kubectl set image deploy/web web=myapp:2.0]]

[[web=]] الأولى اسم الـ **container** جوه الـ template (مش اسم الـ Deployment). وفي نفس الوقت كان فيه loop من برا: [[curl http://shop.localhost/]] كل ٠.٢ ثانية، ٢٠٠ مرة:

~~~text عدّ الردود
     20 200 "version":"1.0"
    180 200 "version":"2.0"
~~~

~~~text أول ٣٠ رد بالترتيب
1.0 1.0 1.0 ... 1.0 2.0 1.0 2.0 2.0 2.0 2.0 2.0 ...
~~~

كل الـ ٢٠٠ رجعوا 200، ومفيش ولا طلب فشل. وفي النص 2.0 و 1.0 مع بعض: الاتنين شغالين لحظة التبديل، فلازم النسخة الجديدة تقدر تشتغل جنب القديمة (نفس الـ API، ونفس شكل قاعدة البيانات).

---

## ٣. [[kubectl annotate ... change-cause="v2.0" --overwrite]]

[[--overwrite]] لأن الـ annotation موجودة من الـ YAML ([[v1.0]]). من غيرها بيرفض. ولأن الـ annotation دي على الـ Deployment مش الـ template، مش بتعمل rollout لوحدها.

---

## ٤. [[kubectl rollout status deploy/web --timeout=120s]]

~~~text الناتج
Waiting for deployment "web" rollout to finish: 1 out of 4 new replicas have been updated...
Waiting for deployment "web" rollout to finish: 2 out of 4 new replicas have been updated...
Waiting for deployment "web" rollout to finish: 3 out of 4 new replicas have been updated...
Waiting for deployment "web" rollout to finish: 1 old replicas are pending termination...
deployment "web" successfully rolled out
~~~

خد ٥ ثواني. [[--timeout]] = متستناش أكتر من كده (وارجع بكود 1).

### ولما النسخة تبوظ

~~~bash
kubectl set image deploy/web web=myapp:3.0
~~~

([[3.0]] مش موجودة.)

~~~text kubectl rollout status deploy/web (بعد ٦١ ثانية)
Waiting for deployment "web" rollout to finish: 1 out of 4 new replicas have been updated...
error: deployment "web" exceeded its progress deadline
~~~

وكود الخروج [[1]]: في CI ده اللي بيوقف الـ pipeline. والوضع وقتها:

~~~text kubectl get pods -l app=web
NAME                   READY   STATUS         RESTARTS   AGE
web-6f5b57c766-jknrh   0/1     ErrImagePull   0          61s
web-855d554b77-4826l   1/1     Running        0          2m53s
web-855d554b77-975rl   1/1     Running        0          2m55s
web-855d554b77-r6swq   1/1     Running        0          2m54s
web-855d554b77-vrtgf   1/1     Running        0          2m56s
~~~

~~~text kubectl describe deploy web (جزء)
  Available      True    MinimumReplicasAvailable
  Progressing    False   ProgressDeadlineExceeded
~~~

pod جديد واحد بايظ (الـ [[maxSurge: 1]])، والـ ٤ القدام شغالين، و [[curl]] لسه بيرجّع [[2.0]]. الموقع مش واقع، بس الـ deploy واقف. و k8s **مش هيرجع لوحده**.

---

## ٥. [[kubectl rollout history deploy/web]]

~~~text الناتج
REVISION  CHANGE-CAUSE
1         <none>
2         <none>
3         <none>
4         v1.0
5         v2.0
6         v3.0
~~~

١ لـ ٣ تغييرات من الدروس اللي فاتت من غير change-cause. ولتفاصيل revision: [[kubectl rollout history deploy/web --revision=5]] بيطبع الـ template بتاعها ([[Image: b3a-app:2.0]] عندنا).

---

## ٦. [[kubectl rollout undo deploy/web]]

~~~text الناتج
Warning: resource deployments/web was previously managed with 'kubectl apply'. Rolling back will not update the kubectl.kubernetes.io/last-applied-configuration annotation, which may cause unexpected behavior on future 'kubectl apply' operations. Consider using 'kubectl apply' with your previous configuration file instead.
deployment.apps/web rolled back
deployment "web" successfully rolled out
~~~

التحذير ده مهم: الـ undo غيّر الـ cluster، بس ملفك لسه فيه [[3.0]]. أول [[kubectl apply -f k8s/web.yaml]] هيرجّع النسخة البايظة. الصح بعد الطوارئ: رجّع الملف في Git وطبّقه.

~~~text kubectl rollout history deploy/web
REVISION  CHANGE-CAUSE
4         v1.0
6         v3.0
7         v2.0
~~~

(١ لـ ٣ لسه فوق.) revision 5 اختفى وبقى 7: الـ undo مش «رجوع في الزمن»، هو revision جديدة بنفس template الـ 5.

---

## ٧. [[kubectl rollout undo deploy/web --to-revision=4]]

يرجع لرقم معين، مش للي قبله بس. بعدها [[v1.0]] بقت revision 8، و [[curl]] رجّع [[{"version":"1.0",...}]] (أول طلب بعدها مباشرة جه من pod قديم لسه بيتقفل؛ بعد ثواني كله بقى 1.0).

---

## SIGTERM: ليه كل pod قديم بياخد ٣٠ ثانية

~~~text kubectl delete pod لـ pod شغال بـ 1.0
pod "web-8574788c9b-29jbz" deleted from default namespace
took 31s
~~~

Node كـ PID 1 من غير handler لـ SIGTERM مبيقفلش، فالـ kubelet بيستنى الـ ٣٠ ثانية كلها ويقتله. بنينا [[2.1]] بنفس الكود + السطور دي في آخر [[server.js]]:

~~~js
process.on("SIGTERM", () => {
  console.log("SIGTERM: closing");
  server.close(() => process.exit(0));
});
~~~

[[server.close]] بيبطّل يقبل اتصالات جديدة، ويستنى اللي شغالة تخلص، وبعدين [[process.exit(0)]].

~~~text نفس الأمر على pod بـ 2.1
pod "web-5796dd45d6-957gt" deleted from default namespace
took 2s
~~~

~~~text kubectl logs -f للـ pod ده
v2.1 loading, 0s
v2.1 listening on 3000
SIGTERM: closing
~~~

من ٣١ ثانية لـ ٢. ونفس الحكاية في Docker Compose و ECS: أي orchestrator بيبعت SIGTERM الأول.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| نسخة جديدة | [[kubectl set image deploy/NAME CONTAINER=IMAGE:TAG]] (أو عدّل الـ YAML و [[apply]]) |
| اكتب السبب | [[kubectl annotate deploy/NAME kubernetes.io/change-cause="..." --overwrite]] |
| استنى وأعرف النتيجة | [[kubectl rollout status deploy/NAME --timeout=120s]]: كود 1 لو فشل |
| السجل | [[kubectl rollout history deploy/NAME]] |
| ارجع | [[kubectl rollout undo deploy/NAME]] أو [[--to-revision=N]] |

> k8s مبيرجعش لوحده. الـ CI: [[rollout status]] ولو فشل [[rollout undo]]، وبعدها صلّح الـ YAML في Git.`,
          lines: [
            "طبّق Deployment فيه maxSurge 1 و maxUnavailable 0 و readinessProbe و deadline دقيقة.",
            "غيّر image الـ container اللي اسمه web لـ 2.0: ده بيبدأ الـ rollout.",
            "اكتب سبب التغيير عشان يظهر في السجل.",
            "استنى لحد ما يخلص، ولو فشل أو عدّى دقيقتين اخرج بكود 1.",
            "السجل: كل revision وسببها.",
            "ارجع للـ revision اللي قبلها.",
            "ارجع لـ revision معينة برقمها."
          ],
          sol: R`مع 2.0: كل الطلبات 200، وفي النص ردود 1.0 و 2.0 مخلوطة، و [[rollout status]] بيخلص في ثواني. مع 3.0: pod واحد [[ErrImagePull]] والـ ٤ القدام [[Running]]، والموقع لسه بيرد 2.0، وبعد حوالي ٦٠ ثانية [[error: deployment "web" exceeded its progress deadline]] بكود خروج 1. [[rollout undo]] يطبع [[rolled back]] وتحذير [[last-applied-configuration]]، والـ pod البايظ يتقفل.

ولو الطلبات فشلت وقت الـ rollout (502 أو connection refused): غالبًا مفيش readinessProbe، أو [[maxUnavailable]] أكبر من صفر والـ pods الجديدة بطيئة.

(اتجرّب على kind v0.33.0، Kubernetes v1.37.0، على ويندوز 11.)`,
          solCode: R`while true; do curl -s --max-time 2 http://shop.localhost/; sleep 0.2; done
kubectl set image deploy/web web=myapp:2.0
kubectl rollout status deploy/web --timeout=120s
kubectl set image deploy/web web=myapp:3.0
kubectl rollout status deploy/web --timeout=180s || kubectl rollout undo deploy/web
kubectl rollout history deploy/web`
        },
        {
          cmd: "CrashLoopBackOff",
          title: "الـ pod مش شغال: تشخّص بالترتيب",
          desc: R`لما pod يبقى مش [[Running]] و [[1/1]]، فيه ترتيب ثابت: [[kubectl get pods]] (الحالة)، ثم [[describe]] (الـ Events والـ Exit Code)، ثم [[logs]] و [[logs --previous]] (التطبيق قال إيه قبل ما يقع)، ثم [[kubectl events]] للصورة كلها.

[[CrashLoopBackOff]] مش السبب، هو النتيجة: «التطبيق بيقع، وأنا بستنى أطول كل مرة قبل ما أقوّمه». السبب في اللوج أو في الـ Exit Code.`,
          example: R`kubectl get pods
kubectl describe pod crash-78968799b4-74xxw
kubectl logs deploy/crash
kubectl logs deploy/crash --previous
kubectl events --for pod/crash-78968799b4-74xxw
kubectl get events --sort-by=.lastTimestamp
kubectl debug web-8574788c9b-9kptp --image=busybox:1.37 --target=web -c dbg -- sh -c 'wget -qO- localhost:3000/healthz; ps'`,
          try: R`اعمل Deployment بيقع على طول: [[kubectl create deployment crash --image=myapp:1.0]] ثم [[kubectl set env deploy/crash CRASH=1]]. راقبه بـ [[kubectl get pods -w]] دقيقتين، وبعدين امشي على الترتيب: [[describe]] و [[logs]] و [[logs --previous]]. هتلاقي السبب في أنهي واحد؟`,
          deep: {
            why: R`أغلب وقت الـ k8s في الشغل الحقيقي تشخيص، والمشكلة دايمًا واحدة من ٦ حالات معروفة. لو عارف كل حالة بتبان إزاي ومكانها فين، بتحل في دقيقة بدل ما تعيد الـ deploy وتدعي.`,
            how: R`الحالة في [[STATUS]] بتقولك المشكلة في أنهي مرحلة:

[[Pending]]: لسه متحطش على node (الـ scheduler). [[ErrImagePull]] و [[ImagePullBackOff]]: اتحط بس مش قادر يسحب الـ image (الـ kubelet). [[CreateContainerConfigError]]: الـ image موجودة بس الإعدادات ناقصة (ConfigMap أو Secret). [[CrashLoopBackOff]] و [[Error]]: الـ container قام ووقع (التطبيق). [[Running]] و [[0/1]]: شغال بس الـ readiness فاشلة.

الـ Exit Code في [[describe]]: [[1]] (أو أي رقم صغير) التطبيق خرج بنفسه بـ error، فالسبب في اللوج. [[137]] = 128 + 9: اتقتل بـ SIGKILL (OOMKilled، أو liveness وعدّى الـ grace period). [[143]] = 128 + 15: خرج بسبب SIGTERM. [[0]]: خلص طبيعي، وده غلط لو هو سيرفر (الأمر في الـ CMD مش بيفضل شغال).

الـ backoff بيبدأ ١٠ ثواني ويتضاعف لحد ٥ دقايق، وبيرجع صفر لو الـ container فضل شغال ١٠ دقايق.

[[kubectl debug --target]] بيضيف ephemeral container (زي busybox فيه أدوات) جوه pod شغال، وبيشارك الـ process namespace بتاع الـ container المستهدف، فتقدر تشوف الـ processes وتكلّم [[localhost]] من غير ما تحط أدوات في الـ image بتاعتك.`,
            when: R`أي pod مش [[Running 1/1]]، أو [[RESTARTS]] بيزيد. ولما الحالة كويسة بس التطبيق مش بيرد: الـ Service (الـ endpoints)، ثم الـ Ingress، زي جدول درس «Service و Ingress».`,
            mistakes: R`تعيد الـ deploy أو تمسح الـ pod من غير ما تقرا [[describe]]: الـ pod الجديد هيقع بنفس السبب، وانت ضيّعت اللوج. وتقرا [[kubectl logs]] بس على pod اتعاد تشغيله فتلاقي لوج البداية النضيف، والسبب كان في [[--previous]]. وتدوّر في [[get events]] على OOMKilled (مش هناك، هو في [[Last State]]). والـ Events بتتمسح بعد ساعة افتراضيًا، فلو المشكلة من امبارح مش هتلاقيها: محتاج نظام لوجات برا الـ cluster (درس «المراقبة و SRE»).`
          },
          teach: R`## الفكرة: نفس الأسئلة، بنفس الترتيب، كل مرة

اتجرّب على cluster kind (Kubernetes v1.37.0) على ويندوز 11، بـ Deployment اسمه [[crash]] من نفس الـ image بتاعت درس «kind load docker-image»، ومتغير [[CRASH=1]] بيخلّي التطبيق يطبع [[DATABASE_URL is missing, exiting]] ويخرج بـ [[process.exit(1)]] (زي تطبيق ناقصه إعداد):

~~~bash
kubectl create deployment crash --image=myapp:1.0
kubectl set env deploy/crash CRASH=1
~~~

[[set env]] بيزوّد متغير بيئة في الـ template، فده rollout جديد بالمتغير.

---

## ١. [[kubectl get pods]]

~~~text بعد ٥٠ ثانية
NAME                     READY   STATUS   RESTARTS      AGE
crash-78968799b4-74xxw   0/1     Error    3 (38s ago)   50s
~~~

و [[kubectl get pods -w]] بعدها:

~~~text الناتج
crash-78968799b4-74xxw   0/1     CrashLoopBackOff   3 (58s ago)   97s
crash-78968799b4-74xxw   1/1     Running            4 (58s ago)   97s
crash-78968799b4-74xxw   0/1     Error              4 (59s ago)   98s
crash-78968799b4-74xxw   0/1     CrashLoopBackOff   4 (74s ago)   2m51s
crash-78968799b4-74xxw   1/1     Running            5 (82s ago)   2m59s
crash-78968799b4-74xxw   0/1     Error              5 (83s ago)   3m
~~~

الدايرة: [[Running]] ثانية، [[Error]] (وقع)، [[CrashLoopBackOff]] (مستني)، والانتظار بيطول (من ٤ لـ ٥ خد دقيقة وأكتر). فالـ STATUS بيتغير حسب اللحظة اللي بصيت فيها. اللي ثابت هو [[RESTARTS]] اللي بيزيد.

### جدول الحالات

| STATUS | المرحلة | أول مكان تبص فيه |
|---|---|---|
| [[Pending]] | الـ scheduler مش لاقي node | [[describe]]: [[FailedScheduling]] (درس «requests و limits») |
| [[ErrImagePull]] و [[ImagePullBackOff]] | مش قادر يسحب الـ image | [[describe]]: الاسم، الـ tag، [[imagePullPolicy]]، صلاحيات الـ registry (درس «kind load docker-image») |
| [[CreateContainerConfigError]] | ConfigMap أو Secret ناقص | [[describe]]: [[configmap "..." not found]] (درس «ConfigMap و Secret») |
| [[Error]] و [[CrashLoopBackOff]] | التطبيق بيقع | [[logs]] و [[--previous]] و الـ Exit Code |
| [[Running]] و [[0/1]] | الـ readiness فاشلة | [[describe]]: [[Readiness probe failed]] (درس «probes») |
| [[Running]] و [[RESTARTS]] بيزيد | OOM أو liveness | [[describe]]: [[Last State]] |

---

## ٢. [[kubectl describe pod NAME]]

~~~text الناتج (جزء)
    State:          Terminated
      Reason:       Error
      Exit Code:    1
    Last State:     Terminated
      Reason:       Error
      Exit Code:    1
      Started:      Wed, 28 Oct 2026 03:45:08 +0300
      Finished:     Wed, 28 Oct 2026 03:45:08 +0300
    Restart Count:  3
Events:
  Normal   Pulled     11s (x4 over 50s)  kubelet  Container image "b3a-app:1.0" already present on machine ...
  Normal   Started    11s (x4 over 50s)  kubelet  Container started
  Warning  BackOff    10s (x3 over 48s)  kubelet  Back-off restarting failed container b3a-app in pod crash-78968799b4-74xxw_default(642a...)
~~~

| السطر | يقولك إيه |
|---|---|
| [[Exit Code: 1]] | التطبيق هو اللي خرج بـ error. يبقى السبب في اللوج |
| [[Started]] و [[Finished]] نفس الثانية | بيقع أول ما يقوم: إعداد ناقص، مش مشكلة ضغط |
| [[Pulled]] و [[Started]] [[x4]] | الـ image تمام والـ container قام ٤ مرات |
| [[BackOff]] | k8s مستني قبل المرة الجاية |
| [[container b3a-app]] | اسم الـ container. [[create deployment]] بيسمّيه على اسم الـ image (عندك هيبقى [[myapp]]) |

### الـ Exit Codes

| الكود | معناه |
|---|---|
| [[0]] | خلص طبيعي. لسيرفر ده غلط: الأمر مش بيفضل شغال |
| [[1]] | التطبيق خرج بـ error: اقرا اللوج |
| [[137]] | 128 + 9 (SIGKILL): [[OOMKilled]]، أو liveness وعدّى الـ ٣٠ ثانية |
| [[143]] | 128 + 15 (SIGTERM): اتقفل بطلب وخرج |

---

## ٣. [[kubectl logs deploy/crash]] و [[--previous]]

~~~text kubectl logs deploy/crash
DATABASE_URL is missing, exiting
~~~

ده السبب. و [[--previous]] = لوج الـ container اللي **قبل** الحالي. جرّبناه كل ٥ ثواني:

| الـ STATUS ساعتها | [[logs --previous]] |
|---|---|
| [[Error]] | [[unable to retrieve container logs for containerd://119f...]] |
| [[CrashLoopBackOff]] | [[DATABASE_URL is missing, exiting]] |

في v1.37 لما الحالة [[Error]]، الـ container اللي لسه واقع هو «الحالي»، واللي قبله اتمسح (الـ kubelet بيحتفظ بـ container ميت واحد بس)، فـ [[--previous]] ملوش لوج. فالقاعدة: جرّب [[logs]] الأول، ولو فاضي أو لوج بداية نضيف (الـ container قام تاني)، استخدم [[--previous]].

و [[--previous]] مهم جدًا في الـ liveness و OOM: الـ container الحالي شغال ولوجه نضيف، والسبب كان في اللي قبله. في درس «probes» ده اللي ورّانا إن التطبيق كان سليم.

---

## ٤. [[kubectl events --for pod/NAME]]

[[kubectl events]] أمر أحدث من [[get events]]، و [[--for]] بيفلتر على object واحد:

~~~text الناتج
LAST SEEN           TYPE      REASON      OBJECT                       MESSAGE
51s                 Normal    Scheduled   Pod/crash-78968799b4-74xxw   Successfully assigned default/crash-78968799b4-74xxw to b3a-worker
12s (x4 over 51s)   Normal    Pulled      Pod/crash-78968799b4-74xxw   Container image "b3a-app:1.0" already present on machine ...
12s (x4 over 51s)   Normal    Started     Pod/crash-78968799b4-74xxw   Container started
11s (x3 over 49s)   Warning   BackOff     Pod/crash-78968799b4-74xxw   Back-off restarting failed container ...
~~~

نفس الـ Events اللي في آخر [[describe]]، بس مترتبة بالوقت ولوحدها.

---

## ٥. [[kubectl get events --sort-by=.lastTimestamp]]

كل الـ events في الـ namespace، مترتبة بالوقت ([[--sort-by]] بياخد مسار JSON زي jsonpath). مفيدة لما مش عارف أنهي object فيه المشكلة: ReplicaSet مش قادر يعمل pods، أو Ingress، أو HPA. ومثال من الـ cluster بتاعنا بعد OOM:

~~~text الناتج (جزء)
15s   Normal   SuccessfulCreate   replicaset/hog-64f69f984d    Created pod: hog-64f69f984d-7gf7s
4s    Normal   Started            pod/hog-64f69f984d-7gf7s     Container started
4s    Normal   Pulled             pod/hog-64f69f984d-7gf7s     Container image "b3a-app:1.0" already present on machine ...
~~~

ولاحظ: مفيش ولا كلمة عن OOM. الـ events مش كل حاجة.

---

## ٦. [[kubectl debug ... --target=web]]

الـ image بتاعتنا ([[node:22-slim]]) مفيهاش curl ولا ps:

~~~text kubectl exec POD -- curl --version
exec: "curl": executable file not found in $PATH
~~~

[[kubectl debug]] بيضيف container مؤقت جوه نفس الـ pod:

| الحتة | معناها |
|---|---|
| [[--image=busybox:1.37]] | image فيها أدوات (wget و ps و nslookup) |
| [[--target=web]] | شارك الـ processes بتاعة container [[web]] |
| [[-c dbg]] | اسم الـ container المؤقت، عشان نقرا لوجه |
| [[-- sh -c '...']] | الأمر اللي هيتنفذ. ([[-it]] بدل كده = ترمنال تكتب فيه) |

~~~text kubectl logs POD -c dbg
ok
PID   USER     TIME  COMMAND
    1 1000      0:28 node server.js
   18 root      0:00 ps
~~~

[[ok]] من [[localhost:3000/healthz]] (نفس الشبكة)، و [[ps]] شايف [[node server.js]] بتاع الـ container التاني (user [[1000]] = [[node]] من الـ Dockerfile). الـ ephemeral container مبيتشالش من الـ pod؛ بيختفي لما الـ pod نفسه يتمسح.

---

## الخلاصة

1. [[get pods]]: الـ STATUS والـ RESTARTS.
2. [[describe pod]]: Exit Code و Last State و Events (من تحت).
3. [[logs]]، ولو اتعاد تشغيله [[logs --previous]].
4. [[kubectl events --for pod/NAME]] أو [[get events --sort-by=.lastTimestamp]].
5. محتاج أدوات جوه؟ [[kubectl debug --target]].

> CrashLoopBackOff نتيجة. السبب في الـ Exit Code واللوج.`,
          lines: [
            "الحالة والـ RESTARTS لكل pod.",
            "حالة الـ container والـ Exit Code والـ Events.",
            "لوج الـ container الحالي (هنا: سبب الوقوع).",
            "لوج الـ container اللي قبله (لو الحالي قام تاني ولوجه نضيف).",
            "events الـ pod ده بس، مترتبة بالوقت.",
            "كل events الـ namespace مترتبة بالوقت.",
            "شغّل busybox جوه pod شغال وشارك processes الـ container web."
          ],
          sol: R`[[kubectl get pods -w]] بيوري الدايرة: [[Running]] ثم [[Error]] ثم [[CrashLoopBackOff]]، و [[RESTARTS]] بيزيد والانتظار بيطول. [[describe]] فيه [[Exit Code: 1]] و [[Started]] و [[Finished]] نفس الثانية، و [[Back-off restarting failed container]]. و [[kubectl logs deploy/crash]] بيطبع [[DATABASE_URL is missing, exiting]]: ده السبب.

و [[logs --previous]] ممكن يرجّع [[unable to retrieve container logs]] لو بصيت والحالة [[Error]]؛ استنى ثواني لحد [[CrashLoopBackOff]] أو اقرا [[logs]] من غير [[--previous]]. الحل نفسه: [[kubectl set env deploy/crash CRASH-]] ([[-]] في الآخر = امسح المتغير)، أو في الحقيقة: حط الإعداد الناقص في Secret.

(اتجرّب على kind v0.33.0، Kubernetes v1.37.0، في ويندوز 11.)`,
          solCode: R`kubectl create deployment crash --image=myapp:1.0
kubectl set env deploy/crash CRASH=1
kubectl get pods -w
kubectl describe pod -l app=crash
kubectl logs deploy/crash
kubectl set env deploy/crash CRASH-
kubectl rollout status deploy/crash
kubectl delete deploy crash`
        },
        {
          cmd: "helm",
          title: "Helm: سطّب تطبيق جاهز، وظبط الـ values، وحدّث وارجع",
          desc: R`Helm مدير حزم لـ Kubernetes: الـ chart فولدر templates (Deployment و Service و Ingress...) فيها متغيرات، و [[values.yaml]] بيملا المتغيرات. [[helm install]] بيطبّق الكل مرة واحدة كـ release ليه اسم ورقم revision.

و [[helm upgrade]] و [[helm rollback]] بيحدّثوا ويرجّعوا الـ release كله (مش Deployment واحد بس). وخد بالك: [[upgrade]] بياخد الـ values اللي في الأمر بس، مش اللي فاتت.`,
          example: R`helm repo add podinfo https://stefanprodan.github.io/podinfo
helm show values podinfo/podinfo --version 6.17.0
helm install demo podinfo/podinfo --version 6.17.0 -f values.yaml
helm upgrade demo podinfo/podinfo --version 6.17.0 -f values.yaml --set replicaCount=3
helm history demo
helm rollback demo 1
helm uninstall demo`,
          try: R`على cluster الدروس اللي فاتت (اللي فيه ingress-nginx): اعمل [[values.yaml]] اللي في الشرح وسطّب podinfo. افتح [[http://podinfo.localhost]]. وبعدين اعمل [[helm upgrade demo podinfo/podinfo --set ui.message=Bye]] **من غير** [[-f]] وشوف الـ Ingress وعدد الـ pods. رجّع بـ [[helm rollback]].`,
          deep: {
            why: R`تطبيق حقيقي على k8s = ٥ لـ ١٥ ملف YAML، ونفس الملفات بفروق بسيطة لكل بيئة (dev و staging و prod). Helm بيخلّيهم template واحد و values لكل بيئة، وبيعرف يحدّث ويرجّع الكل كوحدة. وأغلب الأدوات الجاهزة (Prometheus و cert-manager و ingress controllers و قواعد بيانات) بتتسطب بـ Helm chart.`,
            how: R`الـ chart فيه [[Chart.yaml]] (الاسم والنسخة)، و [[values.yaml]] (القيم الافتراضية)، و [[templates/]] (YAML فيه [[{{ .Values.replicaCount }}]] وأخواتها بلغة Go templates). [[helm install]] = اقرا الـ values (الافتراضي، ثم [[-f]] بالترتيب، ثم [[--set]] وده الأقوى)، واعمل render، وطبّق على الـ cluster.

كل release متخزّن كـ Secret في نفس الـ namespace ([[sh.helm.release.v1.demo.v1]] و [[v2]]...)، فيه الـ manifest والـ values بتوع كل revision. ده اللي [[history]] و [[rollback]] بيقروه. Helm مش محتاج حاجة تتسطب جوه الـ cluster.

الـ charts بتتوزع بطريقتين: repo عادي ([[helm repo add]] ثم [[REPO/CHART]]) أو OCI registry ([[oci://ghcr.io/...]]) من غير [[repo add]]. و [[--version]] بيثبّت نسخة الـ chart، زي [[package-lock]].

[[helm upgrade]] من غير [[-f]] أو [[--set]] اللي قبل كده بيرجع للـ defaults ([[--reuse-values]] بيغيّر ده، بس الأوضح دايمًا تبعت نفس [[-f values.yaml]]). و [[helm upgrade --install]] بيعمل install لو مش موجود: ده اللي بيتكتب في CI.`,
            when: R`تسطيب أدوات جاهزة (دايمًا تقريبًا بـ Helm). ولتطبيقك: لو عندك بيئات كتير أو هتوزّعه لناس تانية. البديل الأبسط Kustomize (جوه kubectl: [[kubectl apply -k]]) بيعمل overlays من غير templates. ومع GitOps (Argo CD أو Flux) الاتنين مدعومين.`,
            mistakes: R`[[helm upgrade]] من غير نفس الـ values: الـ Ingress يختفي والـ replicas ترجع ١ (جرّبناها). و [[helm install]] من غير [[--version]]: كل مرة chart مختلف. و [[kubectl edit]] على حاجة Helm عاملها: أول [[upgrade]] يمسح تعديلك. وأسرار في [[values.yaml]] على Git: Helm بيخزّنها في Secret الـ release كمان. واستخدام Bitnami charts القديمة من غير ما تقرا: Bitnami غيّرت سياسة الـ images المجانية في ٢٠٢٥، فناس كتير لقت images بتاعتها مش بتتسحب.`
          },
          teach: R`## الفكرة: release واحد بدل ١٠ ملفات

السطر الأول بيضيف مكان الـ charts، والتاني بيوريك تقدر تغيّر إيه، والتالت بيسطّب بالـ values بتاعتك، والرابع بيحدّث، والخامس السجل، والسادس الرجوع، والسابع المسح.

اتجرّب بـ Helm v4.3.1 (Helm 4، والأوامر دي هي هي في Helm 3) على cluster kind (Kubernetes v1.37.0) فيه ingress-nginx من درس «Service و Ingress»، على ويندوز 11. والـ chart هو podinfo v6.17.0: تطبيق Go صغير معمول مخصوص للتجارب. (Helm بيحفظ الـ repos والـ cache في فولدر المستخدم؛ إحنا وجّهناهم لفولدر التجربة بمتغيرات [[HELM_CONFIG_HOME]] و [[HELM_CACHE_HOME]] و [[HELM_DATA_HOME]].)

---

## ١. [[helm repo add podinfo https://stefanprodan.github.io/podinfo]]

~~~text الناتج
"podinfo" has been added to your repositories
~~~

[[podinfo]] الأولى اسم محلي انت بتختاره. وبعدها [[helm repo update]] (بينزّل الفهرس) و [[helm search repo podinfo]]:

~~~text الناتج
NAME            CHART VERSION   APP VERSION   DESCRIPTION
podinfo/podinfo 6.17.0          6.17.0        Podinfo Helm chart for Kubernetes
~~~

[[CHART VERSION]] نسخة الـ chart (الـ templates)، و [[APP VERSION]] نسخة التطبيق جواه. ممكن يختلفوا.

---

## ٢. [[helm show values podinfo/podinfo --version 6.17.0]]

بيطبع [[values.yaml]] الافتراضي كله: ده «دليل الإعدادات». حتت منه:

~~~text الناتج (جزء)
replicaCount: 1
ui:
  color: "#34577c"
  message: ""
ingress:
  enabled: false
  className: ""
  hosts:
    - host: podinfo.local
~~~

كل اللي هتكتبه في [[values.yaml]] بتاعك لازم يمشي على نفس الشكل ده. والـ chart ده فيه كمان [[httpRoute]] لـ Gateway API.

---

## ٣. [[helm install demo podinfo/podinfo --version 6.17.0 -f values.yaml]]

~~~yaml values.yaml
replicaCount: 2
ui:
  message: "Hello from Helm"
ingress:
  enabled: true
  className: nginx
  hosts:
    - host: podinfo.localhost
      paths:
        - path: /
          pathType: Prefix
~~~

| الحتة | معناها |
|---|---|
| [[demo]] | اسم الـ release. كل الـ objects بتتسمّى بيه ([[demo-podinfo]]) |
| [[podinfo/podinfo]] | REPO/CHART |
| [[--version 6.17.0]] | نسخة الـ chart، مثبتة |
| [[-f values.yaml]] | قيمك فوق الافتراضي. اللي مكتبتهوش بياخد الافتراضي |

~~~text الناتج (أول تسطيب، كان بـ --set replicaCount=2)
NAME: demo
NAMESPACE: default
STATUS: deployed
REVISION: 1
DESCRIPTION: Install complete
NOTES:
1. Get the application URL by running these commands:
  echo "Visit http://127.0.0.1:8080 to use your application"
  kubectl -n default port-forward deploy/demo-podinfo 8080:9898
~~~

[[NOTES]] جاية من [[templates/NOTES.txt]] في الـ chart. و [[curl http://podinfo.localhost/]]:

~~~text الناتج (جزء)
  "hostname": "demo-podinfo-8584fc4875-78tj2",
  "version": "6.17.0",
  "message": "Hello from Helm",
~~~

الـ [[message]] من الـ values بتاعتنا، والـ Ingress اتعمل لوحده. وتقدر تشوف الـ YAML النهائي قبل ما تطبّق: [[helm template demo podinfo/podinfo --version 6.17.0 -f values.yaml]] طبع Service و Deployment و Ingress (و ٣ Pods للاختبار في [[templates/tests]] مش بتتطبّق غير بـ [[helm test]]).

---

## ٤. [[helm upgrade ... -f values.yaml --set replicaCount=3]]

[[--set]] أقوى من [[-f]]: الـ ٢ في الملف بقوا ٣.

~~~text الناتج
STATUS: deployed
REVISION: 2
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
demo-podinfo   3/3     3            3           5s
~~~

### الفخ: upgrade من غير نفس الـ values

على release فيه Ingress و ٢ replicas، عملنا:

~~~bash
helm upgrade demo podinfo/podinfo --version 6.17.0 --set ui.message=Bye
~~~

~~~text الناتج
REVISION: 3
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
demo-podinfo   1/1     1            1           96s
~~~

| بعد الأمر ده | ليه |
|---|---|
| [[1/1]] بدل ٢ | [[replicaCount]] رجع للافتراضي (١) |
| [[curl http://podinfo.localhost/]] رجّع [[404]] | [[ingress.enabled]] رجع [[false]] والـ Ingress اتمسح |
| [[helm get values demo]] طبع [[ui: message: Bye]] بس | الـ release ده مافتكرش غير اللي في الأمر |

القاعدة: كل [[upgrade]] ابعتله نفس [[-f values.yaml]]. والـ values الحالية لأي release: [[helm get values NAME]].

---

## ٥. [[helm history demo]]

~~~text الناتج (التشغيل التاني)
REVISION   STATUS       CHART            APP VERSION   DESCRIPTION
1          superseded   podinfo-6.17.0   6.17.0        Install complete
2          superseded   podinfo-6.17.0   6.17.0        Upgrade complete
3          deployed     podinfo-6.17.0   6.17.0        Rollback to 1
~~~

(عمود [[UPDATED]] اتشال من هنا عشان العرض.) و [[deployed]] = الشغال دلوقتي، و [[superseded]] = قديم.

كل revision متخزّن كـ Secret:

~~~text kubectl get secrets -l owner=helm
NAME                         TYPE                 DATA   AGE
sh.helm.release.v1.demo.v1   helm.sh/release.v1   1      0s
~~~

---

## ٦. [[helm rollback demo 1]]

~~~text الناتج
Rollback was a success! Happy Helming!
NAME           READY   UP-TO-DATE   AVAILABLE   AGE
demo-podinfo   2/2     2            2           6s
~~~

رجع لـ ٢ (قيم revision 1)، وزي [[rollout undo]]: الرجوع revision جديدة ([[3]] بوصف [[Rollback to 1]])، مش مسح للي بعده. وفي فخ الـ values فوق، [[helm rollback demo 2]] رجّع الـ Ingress والـ ٢ replicas، و [[curl]] رجع [[Hello from Helm]].

والفرق عن [[kubectl rollout undo]]: ده بيرجّع Deployment واحد، و [[helm rollback]] بيرجّع **كل** اللي في الـ release (Ingress اتمسح؟ بيرجع).

---

## ٧. [[helm uninstall demo]]

~~~text الناتج
release "demo" uninstalled
~~~

بيمسح كل الـ objects وكل الـ Secrets بتاعة الـ revisions. [[kubectl get all -l app.kubernetes.io/instance=demo]] بعدها: [[No resources found]].

---

## chart لتطبيقك: [[helm create]]

~~~text helm create myapp
Creating myapp
~~~

~~~text الفولدر
myapp/Chart.yaml  myapp/values.yaml  myapp/charts/
myapp/templates/: NOTES.txt  _helpers.tpl  deployment.yaml  hpa.yaml  httproute.yaml
                  ingress.yaml  service.yaml  serviceaccount.yaml  tests/
~~~

قالب كامل فيه كل اللي اتكلمنا عنه في الدروس اللي فاتت (Deployment و Service و Ingress و HPA و HTTPRoute)، و [[helm lint myapp]] طبع [[1 chart(s) linted, 0 chart(s) failed]]. غيّر الـ image في [[values.yaml]] وابدأ منه.

وفي CI السطر المعتاد: [[helm upgrade --install demo CHART --version X -f values.yaml --wait]] (جرّبناه وطلّع [[Release "demo" has been upgraded]] و [[REVISION: 5]]). [[--install]] = اعمل install لو مش موجود، و [[--wait]] = استنى لحد ما الـ pods تبقى جاهزة.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| أشوف الإعدادات المتاحة | [[helm show values REPO/CHART --version X]] |
| أشوف الـ YAML قبل التطبيق | [[helm template NAME REPO/CHART -f values.yaml]] |
| أسطّب أو أحدّث (CI) | [[helm upgrade --install NAME REPO/CHART --version X -f values.yaml --wait]] |
| القيم الحالية | [[helm get values NAME]] |
| السجل والرجوع | [[helm history NAME]] و [[helm rollback NAME N]] |
| أمسح | [[helm uninstall NAME]] |

> كل [[upgrade]] بنفس [[-f values.yaml]] و [[--version]]. اللي مش في الأمر بيرجع للافتراضي.`,
          lines: [
            "ضيف repo الـ charts باسم محلي podinfo.",
            "اعرض الـ values الافتراضية: كل اللي تقدر تغيّره.",
            "سطّب release اسمه demo بنسخة chart مثبتة وقيمك.",
            "حدّث بنفس الملف، و --set يغلب عليه (٣ replicas).",
            "سجل الـ revisions.",
            "ارجع لقيم revision 1 (بيعمل revision جديدة).",
            "امسح الـ release وكل اللي عمله."
          ],
          sol: R`بعد [[install]]: [[STATUS: deployed]] و [[REVISION: 1]]، و [[http://podinfo.localhost]] بيرجّع JSON فيه [[Hello from Helm]]. بعد [[upgrade]] بـ [[--set ui.message=Bye]] لوحده: الـ pods بقت ١، و [[podinfo.localhost]] بقى [[404]] (الـ Ingress اتمسح)، و [[helm get values demo]] فيه [[message: Bye]] بس. و [[helm rollback demo 1]] (أو رقم آخر revision سليمة) يرجّع الـ Ingress والعدد، والـ history فيها سطر [[Rollback to 1]].

لو [[podinfo.localhost]] بيرجّع [[404]] من الأول: [[ingress.className]] لازم [[nginx]]، و [[pathType: Prefix]]. ولو [[Error: INSTALLATION FAILED: cannot re-use a name that is still in use]]: الـ release موجود، استخدم [[upgrade --install]].

(اتجرّب بـ Helm v4.3.1 و podinfo chart 6.17.0 على kind v0.33.0، Kubernetes v1.37.0، في ويندوز 11.)`,
          solCode: R`helm install demo podinfo/podinfo --version 6.17.0 -f values.yaml --wait
curl http://podinfo.localhost/
helm upgrade demo podinfo/podinfo --version 6.17.0 --set ui.message=Bye --wait
kubectl get deploy demo-podinfo
helm get values demo
helm rollback demo 1 --wait
helm history demo
helm uninstall demo`
        }
      ]
    }
]);

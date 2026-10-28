// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
    {
      t: "Kubernetes: تطبيقك على cluster محلي",
      l: 3,
      n: "من image على جهازك لحد URL شغال: kind، و Service و Ingress، و probes، و requests و limits، و HPA",
      items: [
        {
          cmd: "kind load docker-image",
          title: "شغّل الـ image بتاعتك على cluster محلي بـ kind",
          desc: R`kind بيعمل cluster كامل (control plane و workers) كـ containers جوه Docker، و [[kind load docker-image]] بينقل الـ image اللي بنيتها على جهازك جوه الـ nodes، فتشغّلها من غير registry.

ده بيكمّل دروس «Kubernetes: الأساسيات» (درس «kubectl» و «Deployment YAML» في التاب ده): هناك جرّبنا nginx جاهز، وهنا تطبيقك انت. وقبل ما تكمّل: لو مشروعك صغير، اقرا آخر جزء في الشرح «إمتى متستخدمش Kubernetes».`,
          example: R`kind create cluster --name shop --config kind.yaml
docker build -t myapp:1.0 .
kind load docker-image myapp:1.0 --name shop
kubectl apply -f k8s/app.yaml
kubectl rollout status deploy/web
kubectl port-forward deploy/web 8080:3000`,
          try: R`ابني أي تطبيق صغير بيسمع على بورت 3000 (أو استخدم الـ [[server.js]] اللي في الشرح) بـ tag [[myapp:1.0]]، واعمل cluster بـ [[kind.yaml]] اللي في الشرح، وحمّل الـ image وطبّق [[k8s/app.yaml]]. افتح [[http://localhost:8080]] كذا مرة بعد الـ port-forward. وبعدين جرّب نفس الـ Deployment بـ [[image: myapp]] من غير tag وشوف إيه اللي بيحصل.`,
          deep: {
            why: R`عشان تتعلم k8s أو تجرّب الـ YAML بتاع شغلك من غير ما تدفع على EKS أو GKE. والـ cluster المحلي بيبوظ ويتعمل من الأول في دقيقة، فتقدر تجرّب الغلط براحتك. وفرق كتير بتستخدم kind في CI عشان تختبر الـ manifests و Helm charts قبل الـ deploy.`,
            how: R`كل node في kind هو container من image اسمها [[kindest/node]]، جواه kubelet و containerd (مش Docker). عشان كده الـ images اللي على Docker عندك مش شايفها الـ cluster: ليه مخزن images لوحده جوه كل node. [[kind load docker-image]] بيعمل [[docker save]] للـ image وبيستوردها في containerd بتاع كل node.

ولما الـ pod يطلب image، الـ kubelet بيشوف [[imagePullPolicy]]: [[IfNotPresent]] (الافتراضي لأي tag غير [[latest]]) يستخدم اللي موجود على الـ node، و [[Always]] (الافتراضي لـ [[latest]] أو من غير tag) يروح للـ registry كل مرة، فـ image محلية بتفشل بـ [[ErrImagePull]].

[[kind.yaml]] بيحدد شكل الـ cluster: كام node وبأنهي دور، و [[extraPortMappings]] بتفتح بورت على جهازك يوصّل للـ node (هنحتاجها للـ Ingress في الدرس الجاي).`,
            when: R`تعلّم، وتجربة manifests و charts، و CI. مش للإنتاج: كل الـ cluster على جهاز واحد. وبدائله المحلية: k3d (k3s جوه Docker، أخف)، و minikube، و Kubernetes اللي جوه Docker Desktop (النسخ الجديدة فيها اختيار cluster بـ kind).

إمتى متستخدمش Kubernetes أصلًا: شوف درس «kubectl» (أول درس في «Kubernetes: الأساسيات») ودرس «orchestration» في «أسئلة انترفيو». باختصار: فريق صغير وخدمتين أو تلاتة، Docker Compose على VPS أو منصة جاهزة (درس «PaaS ولا VPS: الحساب») أو ECS Fargate أوفر في الوقت والفلوس.`,
            mistakes: R`تبني image جديدة بنفس الـ tag وتنسى [[kind load]] تاني، فالـ cluster لسه شغال بالقديمة. وتستخدم [[latest]] فـ k8s يروح يدوّر عليها في Docker Hub ويطلع [[ErrImagePull]]. وتنسى إن kubectl بيكلّم أنهي cluster: شوف [[kubectl config current-context]] قبل أي [[delete]]. وتسيب الـ cluster شغال بعد ما تخلص: ٣ nodes بياكلوا رام Docker Desktop.`
          },
          teach: R`## الفكرة: تطبيقك انت، مش nginx

في دروس الأساسيات شغّلنا [[nginx:alpine]] من Docker Hub. في الشغل الحقيقي الـ image بتاعتك، ولسه مرفعتهاش على registry. الأوامر الست دي: اعمل cluster، ابني الـ image، دخّلها جوه الـ cluster، طبّق الـ Deployment، استنى، وافتح التطبيق.

كل ده اتشغّل فعلًا (أكتوبر ٢٠٢٦) على ويندوز 11 و Docker Desktop: kind v0.33.0 و kubectl v1.37.1، والـ cluster طلع Kubernetes v1.37.0. الأسامي عندنا كانت [[b3a]] للـ cluster و [[b3a-app]] للـ image بدل [[shop]] و [[myapp]]، وملف الإعدادات (kubeconfig) في فولدر التجربة عن طريق متغير [[KUBECONFIG]] عشان منلمسش إعدادات kubectl اللي على الجهاز. والأوامر هي هي في PowerShell و bash (جرّبنا [[kind get clusters]] و [[kubectl get nodes]] في pwsh وطلعوا نفس الناتج).

> تسطيب kind (من الـ docs): ويندوز [[winget install Kubernetes.kind]]، ماك [[brew install kind]]، لينكس ملف واحد من [[https://kind.sigs.k8s.io/dl/v0.33.0/kind-linux-amd64]]. إحنا نزّلنا [[kind-windows-amd64]] من نفس الرابط وسمّيناه [[kind.exe]].

---

## التطبيق اللي هنشغّله

سيرفر Node صغير (من غير مكتبات) فيه المسارات اللي هنحتاجها في الدروس الجاية:

~~~js server.js
const http = require("http");
const os = require("os");

const VERSION = process.env.APP_VERSION || "1.0";
const START_DELAY = Number(process.env.START_DELAY || 0);
const hog = [];
let ready = true;

if (process.env.CRASH === "1") {
  console.error("DATABASE_URL is missing, exiting");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, "http://x");
  if (url.pathname === "/healthz") return res.end("ok");
  if (url.pathname === "/readyz") {
    res.statusCode = ready ? 200 : 503;
    return res.end(ready ? "ready" : "not ready");
  }
  if (url.pathname === "/toggle-ready") {
    ready = !ready;
    return res.end("ready=" + ready + "\n");
  }
  if (url.pathname === "/work") {
    const end = Date.now() + 50;
    while (Date.now() < end) {}
    return res.end("done\n");
  }
  if (url.pathname === "/leak") {
    const mb = Number(url.searchParams.get("mb") || 50);
    hog.push(Buffer.alloc(mb * 1024 * 1024, 1));
    return res.end("holding " + hog.length * mb + " MB\n");
  }
  res.setHeader("content-type", "application/json");
  res.end(JSON.stringify({ version: VERSION, pod: os.hostname() }) + "\n");
});

console.log("v" + VERSION + " loading, " + START_DELAY + "s");
setTimeout(() => {
  server.listen(3000, "0.0.0.0", () => console.log("v" + VERSION + " listening on 3000"));
}, START_DELAY * 1000);
~~~

| المسار | بيعمل إيه | هنستخدمه في |
|---|---|---|
| [[/]] | يرجّع النسخة واسم الـ pod (الـ [[hostname]] جوه الـ pod هو اسمه) | نشوف الطلب راح لأنهي pod |
| [[/healthz]] | [[ok]] دايمًا لو الـ process عايش | liveness و startup |
| [[/readyz]] و [[/toggle-ready]] | جاهز ولا لأ، وزرار يقلبه | readiness |
| [[/work]] | يشغّل الـ CPU ٥٠ ms | HPA |
| [[/leak?mb=50]] | يحجز ٥٠ ميجا ومش بيرجّعها | OOMKilled |
| [[START_DELAY]] و [[CRASH]] | يأخّر الـ listen، أو يقع على طول | startupProbe و CrashLoopBackOff |

و [[0.0.0.0]] مهمة: لو سمع على [[localhost]] بس، محدش من برا الـ container يوصله.

~~~dockerfile Dockerfile
FROM node:22-slim
WORKDIR /app
COPY server.js .
ARG VERSION=1.0
ENV APP_VERSION=$VERSION
USER node
CMD ["node", "server.js"]
~~~

[[ARG VERSION]] قيمة وقت البناء، و [[ENV APP_VERSION=$VERSION]] بيحطها متغير بيئة جوه الـ image، فنبني نسخة 2.0 بـ [[--build-arg VERSION=2.0]] من غير ما نغيّر الكود. و [[USER node]] عشان ميشتغلش root.

---

## ١. [[kind create cluster --name shop --config kind.yaml]]

~~~yaml kind.yaml
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
  - role: control-plane
    labels:
      ingress-ready: "true"
    extraPortMappings:
      - containerPort: 80
        hostPort: 80
      - containerPort: 443
        hostPort: 443
  - role: worker
  - role: worker
~~~

| الحتة | معناها |
|---|---|
| [[kind: Cluster]] و [[apiVersion]] | ملف إعدادات kind نفسه، مش object في k8s |
| [[role: control-plane]] | الـ node اللي فيها «المخ» (API server و etcd و scheduler) |
| [[role: worker]] مرتين | ٢ nodes للتطبيقات، عشان نشوف الـ pods بتتوزّع |
| [[labels: ingress-ready]] | label على الـ node، هنستخدمه في الدرس الجاي نختار بيه مكان الـ ingress controller |
| [[extraPortMappings]] | بورت 80 و 443 على جهازك يوصّلوا لنفس البورت جوه الـ node دي |

> لو بورت 80 مشغول عندك (IIS أو Apache أو Skype قديم)، خلّي [[hostPort: 8081]] وافتح [[localhost:8081]] بعد كده.

~~~text الناتج (آخره)
 ✓ Starting control-plane 🕹️
 ✓ Installing CNI 🔌
 ✓ Installing StorageClass 💾
 ✓ Joining worker nodes 🚜
Set kubectl context to "kind-b3a"
~~~

أول مرة خدت ٥ دقايق و ١٥ ثانية، لأن kind بيسحب [[kindest/node:v1.37.0]] (١.٣٤ جيجا). المرات الجاية أسرع بكتير.

الـ nodes نفسها containers:

~~~text docker ps --filter name=b3a
NAMES               IMAGE                  PORTS
b3a-control-plane   kindest/node:v1.37.0   0.0.0.0:80->80/tcp, 0.0.0.0:443->443/tcp, 127.0.0.1:57776->6443/tcp
b3a-worker2         kindest/node:v1.37.0
b3a-worker          kindest/node:v1.37.0
~~~

[[6443]] هو بورت الـ API server، و kubectl بيكلّمه على [[127.0.0.1:57776]] (رقم عشوائي، مكتوب في الـ kubeconfig).

~~~text kubectl get nodes (أعمدة مختارة من -o wide)
NAME                STATUS   ROLES           VERSION   INTERNAL-IP   CONTAINER-RUNTIME
b3a-control-plane   Ready    control-plane   v1.37.0   172.19.0.4    containerd://2.3.4
b3a-worker          Ready    <none>          v1.37.0   172.19.0.2    containerd://2.3.4
b3a-worker2         Ready    <none>          v1.37.0   172.19.0.3    containerd://2.3.4
~~~

[[CONTAINER-RUNTIME]] هو containerd، مش Docker. وده سبب الخطوة ٣.

---

## ٢. [[docker build -t myapp:1.0 .]]

[[-t]] = tag: الاسم والنسخة. [[.]] = ابني من الفولدر الحالي. والنسخة التانية:

~~~bash
docker build --build-arg VERSION=2.0 -t myapp:2.0 .
~~~

الـ image دلوقتي في Docker على جهازك بس. لو طبّقت الـ Deployment دلوقتي، الـ node هتدوّر عليها في Docker Hub.

---

## ٣. [[kind load docker-image myapp:1.0 --name shop]]

~~~text الناتج (جزء)
Image: "b3a-app:1.0" with ID "sha256:181a342224aa..." not yet present on node "b3a-worker2", loading...
Image: "b3a-app:1.0" with ID "sha256:181a342224aa..." not yet present on node "b3a-worker", loading...
~~~

بيقارن الـ ID على كل node، ويحمّل بس لو مش موجودة أو اتغيرت. ممكن تدّيله أكتر من image مرة واحدة ([[kind load docker-image myapp:1.0 myapp:2.0]]): ٢ images × ٣ nodes خدت ٢٧ ثانية. و [[--name]] لازم يطابق اسم الـ cluster.

وجوه الـ node، containerd شايفها باسمها الكامل:

~~~text docker exec b3a-worker crictl images
IMAGE                       TAG   IMAGE ID        SIZE
docker.io/library/b3a-app   1.0   a646a24958c83   79.8MB
docker.io/library/b3a-app   2.0   eba9b97ac66aa   79.8MB
~~~

[[myapp:1.0]] = [[docker.io/library/myapp:1.0]]. ده الاسم اللي الـ kubelet هيدوّر عليه.

---

## ٤. [[kubectl apply -f k8s/app.yaml]]

~~~yaml k8s/app.yaml
apiVersion: apps/v1
kind: Deployment
metadata: { name: web }
spec:
  replicas: 3
  selector: { matchLabels: { app: web } }
  template:
    metadata: { labels: { app: web } }
    spec:
      containers:
        - name: web
          image: myapp:1.0
          ports: [{ containerPort: 3000 }]
~~~

نفس شكل درس «Deployment YAML»، بس الـ image بتاعتنا. وفي الدروس الجاية هنزوّد عليه probes و resources.

---

## ٥. [[kubectl rollout status deploy/web]]

~~~text الناتج
Waiting for deployment "web" rollout to finish: 0 of 3 updated replicas are available...
Waiting for deployment "web" rollout to finish: 1 of 3 updated replicas are available...
Waiting for deployment "web" rollout to finish: 2 of 3 updated replicas are available...
deployment "web" successfully rolled out
~~~

~~~text kubectl get pods -o wide (أعمدة مختارة)
NAME                  READY   STATUS    IP           NODE
web-6d4665c97-9v5ss   1/1     Running   10.244.3.2   b3a-worker2
web-6d4665c97-gqzfq   1/1     Running   10.244.1.2   b3a-worker
web-6d4665c97-k7m4s   1/1     Running   10.244.3.3   b3a-worker2
~~~

الـ scheduler وزّعهم على الـ workers بس. الـ control-plane عليها taint (علامة «ممنوع») بيمنع الـ pods العادية، وهنشوف أثرها في درس «requests و limits».

---

## ٦. [[kubectl port-forward deploy/web 8080:3000]]

[[8080]] على جهازك، و [[3000]] جوه الـ pod. ومن ترمنال تاني:

~~~text curl localhost:8080
{"version":"1.0","pod":"web-6d4665c97-9v5ss"}
~~~

[[port-forward]] بيختار pod **واحد** ويفضل عليه، فكل الطلبات هتروح لنفس الـ pod. للتوزيع الحقيقي محتاج Service (الدرس الجاي).

---

## الغلطة المشهورة: [[latest]]

عملنا tag [[latest]] لنفس الـ image وحمّلناها بـ [[kind load]]، وبعدين:

~~~bash
kubectl create deployment latest-demo --image=myapp
~~~

~~~text kubectl get pods -l app=latest-demo
NAME                           READY   STATUS         RESTARTS   AGE
latest-demo-5dcc8854cc-gl868   0/1     ErrImagePull   0          15s
~~~

~~~text kubectl describe pod (الـ Events)
Normal   Pulling    15s   kubelet   Pulling image "b3a-app"
Warning  Failed     11s   kubelet   Failed to pull image "b3a-app": ... "docker.io/library/b3a-app:latest": pull access denied, repository does not exist or may require authorization
Normal   BackOff    11s   kubelet   Back-off pulling image "b3a-app"
Warning  Failed     11s   kubelet   Error: ImagePullBackOff
~~~

الـ image **موجودة** على الـ node، وبرضه راح يسحبها. السبب:

~~~text kubectl get deploy ... -o jsonpath='{.spec.template.spec.containers[0].imagePullPolicy}'
latest-demo: Always
web:         IfNotPresent
~~~

من غير tag أو بـ [[latest]]، k8s بيحط [[imagePullPolicy: Always]]. الحل: tag بنسخة (الأحسن)، أو [[imagePullPolicy: IfNotPresent]] صريح في الـ YAML (جرّبناه والـ pod بقى [[Running]] في ثانية).

---

## إمتى متستخدمش Kubernetes

بعد كل ده، كلام بصراحة:

| الوضع | الأنسب |
|---|---|
| مشروع لوحدك أو فريق ٢ أو ٣، وخدمتين | Docker Compose على VPS، أو PaaS (Render و Railway و Fly.io) |
| على AWS ومش عايز تدير cluster | ECS Fargate (درس «ECS Fargate» في التاب ده) |
| خدمات كتير، وفرق كتير، ومحتاجين منصة واحدة | هنا k8s بيكسب، وغالبًا managed (EKS أو GKE) |

التمن مش الفلوس بس: ترقية الـ cluster كل كام شهر، و ingress وشهادات، و RBAC، ومراقبة الـ cluster نفسه. التفاصيل في درس «kubectl» ودرس «orchestration» (أسئلة انترفيو). تعلّمه عشان هتلاقيه في الشغل، مش عشان تحطه في كل مشروع.

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| cluster بـ ٣ nodes وبورت 80 | [[kind create cluster --name shop --config kind.yaml]] |
| الـ image | [[docker build -t myapp:1.0 .]] |
| دخّلها الـ cluster | [[kind load docker-image myapp:1.0 --name shop]] (بعد **كل** build) |
| شغّلها | [[kubectl apply -f k8s/app.yaml]] ثم [[rollout status]] |
| جرّبها | [[kubectl port-forward deploy/web 8080:3000]] |
| خلصت | [[kind delete cluster --name shop]] |

> tag بنسخة دايمًا. [[latest]] = [[Always]] = k8s يروح للـ registry.`,
          lines: [
            "اعمل cluster اسمه shop بالشكل اللي في kind.yaml (control-plane و ٢ workers وبورت 80).",
            "ابني الـ image بتاعتك بنسخة محددة.",
            "انقل الـ image من Docker لكل nodes الـ cluster.",
            "طبّق الـ Deployment اللي بيستخدم myapp:1.0.",
            "استنى لحد ما الـ pods تبقى جاهزة.",
            "افتح بورت 8080 على جهازك يوصّل لبورت 3000 في pod."
          ],
          sol: R`[[kind create cluster]] يطبع [[Joining worker nodes]] و [[Set kubectl context to "kind-shop"]]، و [[kind load]] يطبع [[not yet present on node ... loading...]] لكل node. بعد [[rollout status]] هتلاقي ٣ pods [[Running]] على الـ workers. ومع الـ port-forward، [[curl localhost:8080]] يرجّع [[{"version":"1.0","pod":"web-..."}]] ونفس اسم الـ pod كل مرة، لأن port-forward بيمسك pod واحد.

وبـ [[image: myapp]] من غير tag: الـ pod يبقى [[ErrImagePull]] ثم [[ImagePullBackOff]]، وفي [[describe]] هتلاقي [[pull access denied]] على [[docker.io/library/myapp:latest]]، مع إن الـ image متحمّلة. السبب [[imagePullPolicy: Always]] الافتراضي مع [[latest]].

(اتجرّب بـ kind v0.33.0 و kubectl v1.37.1 على Docker Desktop في ويندوز 11، بأسامي [[b3a]] و [[b3a-app]].)`,
          solCode: R`kind create cluster --name shop --config kind.yaml
docker build -t myapp:1.0 .
docker build --build-arg VERSION=2.0 -t myapp:2.0 .
kind load docker-image myapp:1.0 myapp:2.0 --name shop
kubectl apply -f k8s/app.yaml
kubectl rollout status deploy/web
kubectl get pods -o wide
kubectl port-forward deploy/web 8080:3000
kind delete cluster --name shop`
        },
        {
          cmd: "Service و Ingress",
          title: "وصّل للتطبيق: أنواع الـ Service، و Ingress على localhost",
          desc: R`الـ Service بيدّي الـ pods اسم وعنوان ثابت ويوزّع عليهم، وليه ٣ أنواع: [[ClusterIP]] (من جوه الـ cluster بس)، و [[NodePort]] (بورت على كل node)، و [[LoadBalancer]] (بيطلب load balancer من الـ cloud).

والـ Ingress قواعد HTTP: «[[shop.localhost]] يروح لـ Service [[web]]، و [[beta.shop.localhost]] لـ [[beta]]»، وبيشتغل بس لو فيه ingress controller في الـ cluster. هنا استخدمنا ingress-nginx، وخد بالك إن المشروع ده اتقفل (archived) في ٢٠٢٦، فاقرا آخر الشرح قبل ما تختاره لمشروع جديد.`,
          example: R`kubectl apply -f k8s/svc.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.15.1/deploy/static/provider/kind/deploy.yaml
kubectl patch deploy -n ingress-nginx ingress-nginx-controller -p '{"spec":{"template":{"spec":{"nodeSelector":{"ingress-ready":"true"}}}}}'
kubectl apply -f k8s/ingress.yaml
kubectl get ingress
curl http://shop.localhost/
curl http://beta.shop.localhost/`,
          try: R`على cluster الدرس اللي فات: اعمل Service لـ [[web]]، و Deployment تاني [[beta]] بـ [[myapp:2.0]] بـ Service ليه، وسطّب ingress-nginx واعمل الـ Ingress. افتح [[http://shop.localhost]] و [[http://beta.shop.localhost]] في المتصفح. وبعدين جرّب Ingress بيشاور على Service اسمها غلط: الرد هيبقى إيه؟`,
          deep: {
            why: R`الـ pods بتموت وتتعمل بـ IPs جديدة، فمحدش يقدر يكلّمهم مباشرة. الـ Service هو العنوان الثابت جوه الـ cluster، والـ Ingress هو الباب الواحد من برا: load balancer واحد (بفلوس واحدة في الـ cloud) قدام خدمات كتير، بدل LoadBalancer لكل Service.`,
            how: R`[[ClusterIP]]: IP افتراضي (من [[10.96.x.x]]) واسم DNS [[web.default.svc.cluster.local]]، و kube-proxy على كل node بيحوّل الطلب لواحد من الـ pods الجاهزين في الـ EndpointSlice.

[[NodePort]]: نفس ClusterIP + بورت بين 30000 و 32767 مفتوح على **كل** node، حتى اللي مفيهاش pod من التطبيق.

[[LoadBalancer]]: NodePort + طلب للـ cloud يعمل load balancer حقيقي (ALB/NLB على AWS). على kind مفيش cloud، فالـ [[EXTERNAL-IP]] بيفضل [[<pending>]] (إلا لو شغّلت cloud-provider-kind).

الـ Ingress object مجرد قواعد. اللي بينفّذها هو الـ ingress controller: pod فيه nginx (أو Traefik أو غيره) بيقرا كل الـ Ingresses ويعمل منها إعدادات، وبيستقبل على 80 و 443. نسخة kind من ingress-nginx بتستخدم [[hostPort]]، يعني بتسمع على بورت 80 بتاع الـ node نفسها، ومع [[extraPortMappings]] في [[kind.yaml]] بقى [[localhost:80]] على جهازك يوصل لها.`,
            when: R`ClusterIP لكل حاجة داخلية (API بيكلّم API). Ingress (أو Gateway API) للـ HTTP من برا. LoadBalancer لحاجة مش HTTP (TCP زي قاعدة بيانات أو gRPC من غير ingress)، أو لو الـ ingress controller نفسه. NodePort نادر في الإنتاج.`,
            mistakes: R`Service الـ [[selector]] بتاعه مش مطابق لـ labels الـ pods، فالـ endpoints فاضية والـ Ingress يرجّع 503. و Ingress من غير [[ingressClassName]] والـ controller مش بيلتقطه. و [[targetPort]] غلط (بورت الـ Service مكان بورت الـ container). وعلى kind بـ أكتر من node: الـ ingress controller ينزل على worker مفيهوش البورت، فـ [[localhost]] ميردّش خالص. وفي PowerShell: [[Invoke-WebRequest http://shop.localhost]] بيفشل بـ «No such host is known»، استخدم [[curl.exe]].`
          },
          teach: R`## الفكرة: عنوان ثابت جوه، وباب واحد من برا

أول سطر بيعمل Service (العنوان الثابت)، والتاني والتالت بيسطّبوا ingress-nginx ويثبّتوه على الـ node اللي عليها البورت، والرابع بيعمل قواعد الـ Ingress، والباقي بيجرّب.

اتشغّل على cluster الدرس اللي فات (kind v0.33.0، Kubernetes v1.37.0، ٣ nodes) على ويندوز 11، مع Deployment تاني اسمه [[beta]] بـ النسخة 2.0 و Service ليه ([[kubectl create deployment beta --image=myapp:2.0]] ثم [[kubectl expose deploy beta --port 80 --target-port 3000]]).

---

## ١. [[kubectl apply -f k8s/svc.yaml]]

~~~yaml k8s/svc.yaml
apiVersion: v1
kind: Service
metadata: { name: web }
spec:
  selector: { app: web }
  ports: [{ port: 80, targetPort: 3000 }]
~~~

| الحتة | معناها |
|---|---|
| [[selector: { app: web }]] | الـ pods اللي عليها [[app: web]] هي اللي ورا الـ Service |
| [[port: 80]] | البورت اللي الـ Service بيسمع عليه |
| [[targetPort: 3000]] | البورت جوه الـ container |
| مفيش [[type]] | يبقى [[ClusterIP]] |

### الأنواع التلاتة جنب بعض

عملنا نوعين زيادة بـ [[kubectl expose]] عشان نقارن:

~~~bash
kubectl expose deploy web --name web-np --type NodePort --port 80 --target-port 3000
kubectl expose deploy web --name web-lb --type LoadBalancer --port 80 --target-port 3000
~~~

~~~text kubectl get svc
NAME         TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)        AGE
kubernetes   ClusterIP      10.96.0.1      <none>        443/TCP        2m25s
web          ClusterIP      10.96.145.56   <none>        80/TCP         4s
web-lb       LoadBalancer   10.96.135.58   <pending>     80:30692/TCP   3s
web-np       NodePort       10.96.39.221   <none>        80:31631/TCP   3s
~~~

| النوع | اقرا السطر إزاي |
|---|---|
| [[ClusterIP]] | عنوان [[10.96.145.56]] بيشتغل من جوه الـ cluster بس |
| [[NodePort]] | [[80:31631]]: بورت 31631 مفتوح على كل node |
| [[LoadBalancer]] | فيه NodePort كمان ([[30692]])، و [[<pending>]] لأن مفيش cloud يدّيله IP |
| [[kubernetes]] | Service بتاع الـ API server نفسه، موجود في أي cluster |

والـ NodePort بيرد من أي node، حتى من الـ control-plane اللي مفيهاش pods من [[web]]:

~~~text docker exec b3a-control-plane curl -s 172.19.0.3:31631/
{"version":"1.0","pod":"web-6d4665c97-gqzfq"}
~~~

### الـ ClusterIP من جوه: اسم DNS وتوزيع

~~~bash
kubectl run tmp --image=busybox:1.37 --rm -i --restart=Never -- sh -c 'for i in 1 2 3 4 5 6; do wget -qO- http://web; done'
~~~

~~~text الناتج
{"version":"1.0","pod":"web-6d4665c97-gqzfq"}
{"version":"1.0","pod":"web-6d4665c97-k7m4s"}
{"version":"1.0","pod":"web-6d4665c97-k7m4s"}
{"version":"1.0","pod":"web-6d4665c97-gqzfq"}
{"version":"1.0","pod":"web-6d4665c97-gqzfq"}
{"version":"1.0","pod":"web-6d4665c97-9v5ss"}
~~~

[[http://web]] اشتغل لأن الـ pod في نفس الـ namespace، والـ ٦ طلبات اتوزّعوا على الـ ٣ pods (عشوائي، مش بالدور). و [[nslookup web.default.svc.cluster.local]] رجّع [[10.96.145.56]]، نفس الـ ClusterIP.

> أول مرة [[kubectl run]] فشل بـ [[timed out waiting for the condition]]: سحب [[busybox]] خد أكتر من الدقيقة اللي kubectl بيستناها. زوّد [[--pod-running-timeout=3m]].

---

## ٢. [[kubectl apply -f .../provider/kind/deploy.yaml]]

ده ملف ingress-nginx الجاهز لـ kind، بنسخة مثبتة [[controller-v1.15.1]] في الرابط (مش [[main]]، عشان الملف ميتغيرش تحتك). بيعمل namespace [[ingress-nginx]] وفيه الـ controller، و IngressClass اسمها [[nginx]]، و admission webhook بيرفض أي Ingress غلط قبل ما يتحفظ.

~~~text الناتج (آخره)
job.batch/ingress-nginx-admission-create created
job.batch/ingress-nginx-admission-patch created
ingressclass.networking.k8s.io/nginx created
validatingwebhookconfiguration.admissionregistration.k8s.io/ingress-nginx-admission created
~~~

---

## ٣. [[kubectl patch ... nodeSelector ingress-ready]]

ده اللي محدش بيقولهولك. بعد الخطوة ٢:

~~~text kubectl get pods -n ingress-nginx -o wide (أعمدة مختارة)
NAME                                        READY   STATUS    NODE
ingress-nginx-controller-596f5b6bcf-hfmpn   1/1     Running   b3a-worker
~~~

الـ controller نزل على [[b3a-worker]]، والبورت 80 اللي على جهازك متوصّل بـ [[b3a-control-plane]] بس (الـ [[extraPortMappings]]). والنتيجة: [[curl http://localhost/]] مفيش رد خالص (curl طلّع كود [[000]]). النسخة دي من الملف فيها [[nodeSelector: kubernetes.io/os: linux]] بس، وده بيقبل أي node.

[[patch]] بيعدّل حتة من الـ object من غير ما تكتب الملف كله:

| الحتة | معناها |
|---|---|
| [[-n ingress-nginx]] | في الـ namespace ده |
| [[-p '{...}']] | الحتة اللي هتتدمج في الـ object (strategic merge patch) |
| [[nodeSelector: ingress-ready: "true"]] | انزل بس على node عليها الـ label ده، اللي حطيناه في [[kind.yaml]] على الـ control-plane |

~~~text الناتج
deployment.apps/ingress-nginx-controller patched
deployment "ingress-nginx-controller" successfully rolled out
ingress-nginx-controller-575c4d8bc6-jc4m4   1/1   Running   0   58s   10.244.0.5   b3a-control-plane
~~~

ودلوقتي [[curl -i http://localhost/]] بيرد [[HTTP/1.1 404 Not Found]]. ده كويس: nginx بيرد، بس لسه مفيش قواعد.

> الـ control-plane عليها taint بيمنع الـ pods، بس الـ controller ده معاه toleration ليها (موجود في الملف)، فقدر ينزل.

### الـ JSON ده في PowerShell

| الشل | يشتغل إزاي |
|---|---|
| bash و pwsh 7 | زي ما هو في المثال (جرّبناه في pwsh 7.6) |
| Windows PowerShell 5.1 | رفض بـ [[invalid JSON patch]]، لأنه بيشيل علامات [[" "]] اللي جوه. الحل تكتبها [[\"]]: |

~~~powershell
kubectl patch deploy -n ingress-nginx ingress-nginx-controller -p '{\"spec\":{\"template\":{\"spec\":{\"nodeSelector\":{\"ingress-ready\":\"true\"}}}}}'
~~~

(والعكس: الشكل ده بالـ [[\"]] بيفشل في pwsh 7. فاعرف انت على أنهي واحد: [[$PSVersionTable.PSVersion]].)

---

## ٤. [[kubectl apply -f k8s/ingress.yaml]]

~~~yaml k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata: { name: web }
spec:
  ingressClassName: nginx
  rules:
    - host: shop.localhost
      http:
        paths:
          - { path: /, pathType: Prefix, backend: { service: { name: web, port: { number: 80 } } } }
    - host: beta.shop.localhost
      http:
        paths:
          - { path: /, pathType: Prefix, backend: { service: { name: beta, port: { number: 80 } } } }
~~~

| الحتة | معناها |
|---|---|
| [[ingressClassName: nginx]] | أنهي controller ينفّذ القواعد دي |
| [[host: shop.localhost]] | الطلبات اللي الـ Host header بتاعها كده |
| [[path: /]] و [[pathType: Prefix]] | أي مسار بيبدأ بـ [[/]] (يعني كله) |
| [[backend.service]] | ابعتها لـ Service [[web]] على بورت 80 (بورت الـ Service، مش الـ container) |

ليه [[.localhost]]؟ أي اسم بيخلص بـ [[.localhost]] معناه جهازك (127.0.0.1): المتصفحات و curl بيفهموه لوحدهم، من غير ما تعدّل ملف [[hosts]].

---

## ٥. [[kubectl get ingress]]

~~~text الناتج
NAME   CLASS   HOSTS                                ADDRESS     PORTS   AGE
web    nginx   shop.localhost,beta.shop.localhost   localhost   80      21m
~~~

[[ADDRESS]] بيفضل فاضي أول كام ثانية لحد ما الـ controller يلتقط الـ Ingress. و [[kubectl describe ingress web]] بيوري كل قاعدة رايحة لأنهي pods:

~~~text الناتج (جزء)
  Host                 Path  Backends
  shop.localhost
                       /   web:80 (10.244.3.36:3000,10.244.3.37:3000,10.244.1.33:3000 + 1 more...)
  beta.shop.localhost
                       /   beta:80 (10.244.1.9:3000)
~~~

---

## ٦. [[curl http://shop.localhost/]] و [[beta.shop.localhost]]

~~~text الناتج
{"version":"1.0","pod":"web-6d4665c97-k7m4s"}
{"version":"2.0","pod":"beta-f98bb694-xfmx6"}
~~~

نفس البورت 80، ونفس الـ IP، والـ Host header هو اللي فرّق. وده نفس اللي curl بيعمله لو كتبته بإيدك: [[curl -H "Host: shop.localhost" http://localhost/]] رجّع نفس الرد. واسم مش في القواعد ([[other.localhost]]) رجّع [[404]] من nginx.

### على ويندوز

| الأداة | النتيجة |
|---|---|
| [[curl.exe http://shop.localhost/]] (في pwsh و 5.1) | اشتغل: curl نفسه بيحوّل [[.localhost]] لـ 127.0.0.1 |
| [[Invoke-WebRequest http://shop.localhost/]] | فشل: [[No such host is known]]، لأنه بيسأل ويندوز، وويندوز مبيعرفش [[*.localhost]] |
| [[Invoke-WebRequest http://localhost/ -Headers @{Host='shop.localhost'}]] | اشتغل في pwsh 7 و 5.1 (في 5.1 زوّد [[-UseBasicParsing]]) |

---

## لما الـ Service اسمها غلط

~~~bash
kubectl create ingress bad --class=nginx --rule="bad.localhost/*=nope:80"
~~~

[[curl http://bad.localhost/]] رجّع [[503]]، و [[describe]] قال السبب:

~~~text الناتج
  bad.localhost
                 /   nope:80 (<error: services "nope" not found>)
~~~

| الرد | السبب الغالب |
|---|---|
| مفيش رد خالص | الـ controller مش على الـ node اللي عليها البورت، أو البورت مش متعمله mapping |
| [[404]] من nginx | الـ host أو المسار مش في أي قاعدة، أو [[ingressClassName]] غلط |
| [[503]] | القاعدة صح، بس الـ Service مش موجودة أو مفيهاش pods جاهزة |
| [[502]] | فيه pods، بس [[targetPort]] غلط أو التطبيق بيسمع على [[localhost]] |

---

## ingress-nginx اتقفل: اختار إيه لمشروع جديد

[[kubernetes/ingress-nginx]] على GitHub بقى archived (للقراية بس)، وآخر نسخة [[controller-v1.15.1]] في ١٩ مارس ٢٠٢٦ (شفناه من GitHub API وقت كتابة الدرس). يعني مفيش إصلاحات أمنية جاية. هو لسه شغال، وهتلاقيه في clusters كتير، فلازم تفهمه، بس لمشروع جديد:

- الـ Ingress كـ API نفسه لسه موجود ومستقر، وفيه controllers تانية شغالة عليه (Traefik، و HAProxy، و NGINX Ingress Controller بتاع F5 وده مشروع تاني غير ده).
- الاتجاه الرسمي هو **Gateway API** ([[Gateway]] و [[HTTPRoute]] بدل [[Ingress]])، مع implementation زي Envoy Gateway أو NGINX Gateway Fabric أو Traefik.
- وعلى kind، الـ docs الحالية بتقول إن cloud-provider-kind (v0.9.0 وأحدث) بيدعم Ingress و Gateway API من غير controller منفصل. ده من الـ docs، ماتجرّبش هنا.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| خدمة تكلّم خدمة جوه الـ cluster | Service [[ClusterIP]] و [[http://NAME]] |
| HTTP من برا لخدمات كتير | Ingress (أو Gateway API) + controller |
| TCP مش HTTP من برا | Service [[LoadBalancer]] |
| تجربة سريعة من جهازك | [[kubectl port-forward svc/NAME 8080:80]] |

> على kind بـ أكتر من node: الـ ingress controller لازم يبقى على الـ node اللي عليها [[extraPortMappings]].`,
          lines: [
            "اعمل Service اسمه web قدام الـ pods اللي عليها app: web.",
            "سطّب ingress-nginx بنسخة kind، بإصدار مثبت.",
            "ثبّت الـ controller على الـ node اللي عليها label ingress-ready (اللي البورت 80 متوصّل بيها).",
            "اعمل قواعد الـ Ingress: كل host لـ Service.",
            "اتأكد إن الـ Ingress اتلقط (ADDRESS).",
            "جرّب الـ host الأول: يروح لـ web.",
            "جرّب الـ host التاني: يروح لـ beta."
          ],
          sol: R`[[http://shop.localhost]] بيرجّع [[{"version":"1.0",...}]] من pods الـ [[web]]، و [[http://beta.shop.localhost]] بيرجّع [[{"version":"2.0","pod":"beta-..."}]]. والـ Ingress اللي بيشاور على Service مش موجودة بيرجّع [[503]] من nginx، و [[kubectl describe ingress]] بيقول [[<error: services "nope" not found>]].

لو [[curl http://localhost/]] مفيش رد خالص: شوف الـ controller نازل على أنهي node بـ [[kubectl get pods -n ingress-nginx -o wide]]؛ لازم يبقى [[shop-control-plane]] (اعمل الـ patch). ولو [[404]]: الـ host مش مكتوب صح أو نسيت [[ingressClassName: nginx]].

(اتجرّب بـ ingress-nginx controller-v1.15.1 على kind v0.33.0، Kubernetes v1.37.0، في ويندوز 11 بـ Git Bash و pwsh 7.6 و PowerShell 5.1.)`,
          solCode: R`kubectl create deployment beta --image=myapp:2.0
kubectl expose deploy beta --port 80 --target-port 3000
kubectl apply -f k8s/svc.yaml -f k8s/ingress.yaml
kubectl get pods -n ingress-nginx -o wide
kubectl describe ingress web
kubectl create ingress bad --class=nginx --rule="bad.localhost/*=nope:80"
curl -s -o /dev/null -w "%{http_code}\n" http://bad.localhost/
kubectl delete ingress bad`
        },
        {
          cmd: "probes",
          title: "startup و readiness و liveness: مين بيسأل إيه، ولما يغلط بيحصل إيه",
          desc: R`الـ probes أسئلة الـ kubelet بيسألها للـ container كل كام ثانية: [[startupProbe]] «خلصت تحميل؟»، و [[readinessProbe]] «أبعتلك ترافيك؟»، و [[livenessProbe]] «انت عايش ولا أعيد تشغيلك؟».

لو readiness فشل، الـ pod بيخرج من الـ Service بس (مفيش restart). لو liveness فشل، الـ container بيتقتل ويقوم من الأول. ولو حطيت liveness غلط، انت اللي بتوقّع تطبيقك.`,
          example: R`startupProbe:
  httpGet: { path: /healthz, port: 3000 }
  periodSeconds: 2
  failureThreshold: 30
readinessProbe:
  httpGet: { path: /readyz, port: 3000 }
  periodSeconds: 5
livenessProbe:
  httpGet: { path: /healthz, port: 3000 }
  periodSeconds: 5
  failureThreshold: 3`,
          try: R`حط الـ ٣ probes دول تحت [[containers]] في Deployment للتطبيق بتاعك، مع [[START_DELAY=25]] (تطبيق بياخد ٢٥ ثانية يقوم). الأول جرّبه بالـ livenessProbe لوحده من غير startup وشوف [[RESTARTS]]. وبعدين بالتلاتة. وبعدين غيّر بورت الـ liveness لـ 8080 وسيبه ٥ دقايق.`,
          flag: "script",
          deep: {
            why: R`k8s مش عارف حاجة عن تطبيقك غير إن الـ process شغال. process شغال ممكن يكون لسه بيحمّل، أو معلّق في deadlock، أو قاعدة البيانات بتاعته واقعة. الـ probes هي الطريقة اللي بتقوله بيها «جاهز» و «عايش»، وهي اللي بتخلّي الـ rolling update من غير أخطاء.`,
            how: R`الـ kubelet على الـ node هو اللي بيسأل (مش الـ control plane). [[httpGet]] يعدّي لو الرد بين 200 و 399. وفيه كمان [[tcpSocket]] (البورت بيقبل اتصال؟) و [[exec]] (أمر جوه الـ container رجع 0؟) و [[grpc]].

الترتيب: طول ما الـ startupProbe منجحتش، readiness و liveness واقفين. بعد ما تنجح مرة، مبتشتغلش تاني، والاتنين التانيين يبدأوا. فالـ startup بتدّي التطبيق البطيء وقت (هنا [[2 × 30 = 60]] ثانية) من غير ما تخلّي الـ liveness نفسها بطيئة.

[[periodSeconds]] كل قد إيه، و [[failureThreshold]] كام فشل ورا بعض، و [[timeoutSeconds]] (افتراضي 1) الرد يتأخر قد إيه، و [[initialDelaySeconds]] استنى قبل أول سؤال (مع وجود startupProbe مش محتاجه).

لما الـ liveness تفشل، الـ kubelet بيبعت SIGTERM ويستنى [[terminationGracePeriodSeconds]] (افتراضي 30) وبعدين SIGKILL. Node شغال كـ PID 1 من غير handler لـ SIGTERM مبيقفلش، فبياخد الـ ٣٠ ثانية كاملة ويخرج بـ [[Exit Code: 137]] (128 + 9 = SIGKILL).`,
            when: R`readiness لأي تطبيق بياخد ترافيك، دايمًا. startup لأي تطبيق بياخد أكتر من كام ثانية يقوم (Java، و migrations، و cache warming). liveness بس لو التطبيق ممكن يعلّق وهو شغال ومفيش طريقة يخرج لوحده، وخليها بسيطة جدًا: «الـ event loop بيرد»، مش «قاعدة البيانات شغالة».`,
            mistakes: R`liveness بتسأل قاعدة البيانات: القاعدة تقع دقيقة، فكل الـ pods تتعاد مع بعض وتضرب القاعدة وهي بتقوم. و liveness على بورت أو مسار غلط: التطبيق سليم وبيتقتل كل شوية. و liveness من غير startup لتطبيق بطيء: بيتقتل قبل ما يخلص تحميل، للأبد. ومفيش readiness خالص: الـ pod يبقى [[1/1]] وهو لسه مش بيسمع، والترافيك يروحله. و [[timeoutSeconds: 1]] الافتراضي على endpoint تقيل تحت ضغط.`
          },
          teach: R`## الفكرة: ٣ أسئلة مختلفة، وكل واحد ليه عقاب مختلف

| الـ probe | السؤال | لو فشل |
|---|---|---|
| [[startupProbe]] | خلصت تحميل؟ | بعد [[failureThreshold]] مرة: restart. ولحد ما تنجح، التانيين واقفين |
| [[readinessProbe]] | أبعتلك ترافيك؟ | يخرج من الـ Service. **مفيش restart** |
| [[livenessProbe]] | عايش؟ | restart للـ container |

اتجرّب على cluster kind (Kubernetes v1.37.0) على ويندوز 11، بتطبيق الدرس «kind load docker-image» ([[server.js]]): [[/healthz]] بيرد [[ok]] دايمًا، و [[/readyz]] بيرد 200 أو 503 حسب زرار [[/toggle-ready]]، و [[START_DELAY=25]] بيخلّيه يستنى ٢٥ ثانية قبل ما يفتح البورت.

---

## ١. التجربة الأولى: liveness لوحدها على تطبيق بطيء

~~~yaml
          env: [{ name: START_DELAY, value: "25" }]
          livenessProbe:
            httpGet: { path: /healthz, port: 3000 }
            periodSeconds: 5
            failureThreshold: 3
~~~

~~~text kubectl get pods -l app=slow (كل ١٠ ثواني)
slow-5ff88cd458-2s48f   1/1   Running   0     10s
slow-5ff88cd458-2s48f   1/1   Running   0     20s
slow-5ff88cd458-2s48f   1/1   Running   0     31s
slow-5ff88cd458-2s48f   1/1   Running   0     41s
slow-5ff88cd458-2s48f   1/1   Running   1 (6s ago)   51s
~~~

حاجتين غلط هنا:

1. [[1/1]] من أول ١٠ ثواني، والتطبيق لسه مفتحش البورت. من غير readinessProbe، k8s بيعتبر «الـ process قام» = جاهز، ولو فيه Service هيبعتله ترافيك يفشل.
2. [[RESTARTS 1]]: الـ liveness قتلته.

~~~text kubectl describe pod (جزء)
    Last State:     Terminated
      Reason:       Error
      Exit Code:    137
      Started:      Wed, 28 Oct 2026 03:35:10 +0300
      Finished:     Wed, 28 Oct 2026 03:35:54 +0300
Events:
  Warning  Unhealthy  21s (x6 over 76s)  kubelet  Liveness probe failed: Get "http://10.244.3.8:3000/healthz": dial tcp 10.244.3.8:3000: connect: connection refused
  Normal   Killing    21s (x2 over 66s)  kubelet  Container slow failed liveness probe, will be restarted
~~~

### الأرقام دي جت منين

| الوقت من البداية | اللي حصل |
|---|---|
| ٥ و ١٠ و ١٥ ثانية | ٣ أسئلة، و [[connection refused]] (لسه مفيش حد بيسمع) |
| ١٥ ثانية | [[failureThreshold: 3]] اتملى: SIGTERM |
| ٢٥ ثانية | التطبيق فتح البورت (اللوج قال [[listening on 3000]]) بس خلاص، اتحكم عليه |
| ٤٤ ثانية | SIGKILL: [[Exit Code 137]] |

ليه ٤٤ مش ١٥؟ Node مكتوبلوش handler لـ SIGTERM، وهو PID 1 جوه الـ container، و PID 1 مبيموتش من SIGTERM لوحده. فالـ kubelet استنى [[terminationGracePeriodSeconds]] الافتراضي (٣٠ ثانية) وبعدين SIGKILL. و [[137]] = 128 + 9 (رقم SIGKILL). هنصلّح ده في درس «rolling update».

وده هيفضل يتكرر للأبد: كل مرة يقوم، يتقتل قبل ما يخلص.

---

## ٢. الحل: [[startupProbe]] + [[readinessProbe]]

ده المثال كله. الحتة بالحتة:

~~~yaml
startupProbe:
  httpGet: { path: /healthz, port: 3000 }
  periodSeconds: 2
  failureThreshold: 30
~~~

اسأل كل ثانيتين، واستحمل ٣٠ فشل: يعني التطبيق عنده لحد ٦٠ ثانية يقوم. أول ما ترد 200 مرة واحدة، الـ startup خلصت ومش هتتسأل تاني.

~~~yaml
readinessProbe:
  httpGet: { path: /readyz, port: 3000 }
  periodSeconds: 5
~~~

مسار مختلف عن الـ liveness عمدًا: [[/readyz]] ممكن يقول «مش جاهز» (مثلًا وهو بيقفل، أو الـ cache لسه فاضي) من غير ما حد يقتله.

~~~yaml
livenessProbe:
  httpGet: { path: /healthz, port: 3000 }
  periodSeconds: 5
  failureThreshold: 3
~~~

نفس اللي فات، بس دلوقتي مش هتبدأ غير بعد الـ startup.

~~~text kubectl get pods -l app=slow (كل ٥ ثواني، النسخة الجديدة)
slow-674565c7d-xt55q    0/1   Running   0     5s
slow-674565c7d-xt55q    0/1   Running   0     15s
slow-674565c7d-xt55q    0/1   Running   0     26s
slow-674565c7d-xt55q    1/1   Running   0     31s
slow-674565c7d-xt55q    1/1   Running   0     46s
~~~

[[0/1]] طول ما بيحمّل (صح: مش جاهز)، و [[1/1]] بعد ما فتح البورت، و [[RESTARTS 0]]. و [[describe]] بيوري القيم كلها، باللي مكتبنهوش بالافتراضي:

~~~text الناتج
    Liveness:   http-get http://:3000/healthz delay=0s timeout=1s period=5s successThreshold=1 failureThreshold=3
    Readiness:  http-get http://:3000/readyz delay=0s timeout=1s period=5s successThreshold=1 failureThreshold=3
    Startup:    http-get http://:3000/healthz delay=0s timeout=1s period=2s successThreshold=1 failureThreshold=30
~~~

وخد بالك: الـ Deployment القديم (اللي بيتقتل) فضل شغال لحد ما الجديد بقى Ready، لأن الـ rolling update بيستنى الـ readiness.

---

## ٣. readiness بتفشل: يخرج من الترافيك، ومحدش يقتله

عملنا ٢ pods و Service، وقلبنا الزرار في واحد منهم بس (الـ image مفيهاش curl، فاستخدمنا [[node -e]] جوه الـ pod):

~~~bash
kubectl exec slow-674565c7d-6lxqh -- node -e "fetch('http://localhost:3000/toggle-ready').then(r=>r.text()).then(console.log)"
~~~

~~~text بعد ١٧ ثانية
NAME                   READY   STATUS    RESTARTS   AGE
slow-674565c7d-6lxqh   0/1     Running   0          44s
slow-674565c7d-xt55q   1/1     Running   0          101s
~~~

~~~text kubectl get endpointslices -l kubernetes.io/service-name=slow -o jsonpath=...
10.244.1.11  ready=true
10.244.3.9   ready=false
~~~

| اللي شفناه | معناه |
|---|---|
| [[0/1]] و [[RESTARTS 0]] | مش جاهز، بس محدش قتله |
| [[ready=false]] في الـ EndpointSlice | لسه في القايمة، بس متعلّم إنه مش جاهز |
| [[kubectl describe svc slow]] قال [[Endpoints: 10.244.1.11:3000]] | الـ Service بيوزّع على الجاهز بس |
| ٦ طلبات من pod تاني لـ [[http://slow]] | الستة راحوا لـ [[xt55q]] |
| في الـ Events: [[Readiness probe failed: HTTP probe failed with statuscode: 503]] | ده السبب، مكتوب |

> [[kubectl get endpointslices]] العادي بيعرض الـ IPs الاتنين في عمود [[ENDPOINTS]] حتى اللي مش جاهز. عشان تعرف مين جاهز، بص على [[conditions.ready]] أو على [[describe svc]].

---

## ٤. الـ probe الغلط: liveness على بورت 8080 والتطبيق على 3000

~~~yaml
          livenessProbe:
            httpGet: { path: /healthz, port: 8080 }
            periodSeconds: 5
~~~

التطبيق سليم ١٠٠٪. بعد ٥ دقايق ونص:

~~~text kubectl get pods -l app=broken
NAME                      READY   STATUS             RESTARTS      AGE
broken-6585fdf478-xlmrl   0/1     CrashLoopBackOff   5 (68s ago)   5m38s
~~~

~~~text kubectl describe pod (الـ Events)
  Warning  Unhealthy  8s (x18 over 4m3s)  kubelet  Liveness probe failed: Get "http://10.244.1.14:8080/healthz": dial tcp 10.244.1.14:8080: connect: connection refused
  Normal   Killing    8s (x6 over 3m53s)  kubelet  Container broken failed liveness probe, will be restarted
~~~

| الرقم | معناه |
|---|---|
| [[x18]] | ١٨ فشل = ٦ مرات × [[failureThreshold]] ٣ |
| [[x6]] | اتقتل ٦ مرات |
| [[CrashLoopBackOff]] | k8s بقى يستنى أطول بين كل restart والتاني. في الـ status كان مكتوب [[back-off 2m40s restarting failed container]] |

و [[kubectl logs --previous]] بيوري إن التطبيق كان سليم: [[v1.0 listening on 3000]]، ومفيش ولا error. لما تشوف restarts واللوجات نضيفة، أول حاجة تشك فيها هي الـ liveness نفسها.

> مسار غلط مش دايمًا بيبان: أول ما جرّبنا [[path: /health]] (من غير z)، التطبيق رد 200 لأن أي مسار مش معروف عنده بيرجّع الـ JSON. فالـ probe «نجحت» وهي بتسأل مسار مالوش علاقة. اكتب endpoint للـ health بيرجّع 404 لأي حاجة غيره.

---

## الخلاصة

| الإعداد | الحسبة |
|---|---|
| startup: [[period 2]] × [[failure 30]] | التطبيق عنده ٦٠ ثانية يقوم |
| liveness: [[period 5]] × [[failure 3]] | معلّق ١٥ ثانية = يتقتل، وبعدين ٣٠ ثانية grace لو مبيقفلش لوحده |
| readiness: [[period 5]] × [[failure 3]] (افتراضي) | ١٥ ثانية مش بيرد = يخرج من الـ Service |

> readiness دايمًا. startup للبطيء. liveness بس لو التطبيق ممكن يعلّق، وتكون أبسط endpoint عندك، ومتسألش أي حاجة برا الـ process.`,
          lines: [
            "سؤال «خلصت تحميل؟»: لحد ما ينجح، التانيين واقفين.",
            "GET على /healthz بورت 3000؛ أي رد 200 لـ 399 = نجح.",
            "اسأل كل ثانيتين.",
            "استحمل ٣٠ فشل (٦٠ ثانية) قبل ما تعيد التشغيل.",
            "سؤال «أبعتلك ترافيك؟»: لو فشل يخرج من الـ Service بس.",
            "مسار منفصل /readyz يقدر يقول «مش جاهز» من غير ما حد يقتله.",
            "اسأل كل ٥ ثواني.",
            "سؤال «انت عايش؟»: لو فشل، restart.",
            "أبسط endpoint: الـ process بيرد ولا لأ.",
            "اسأل كل ٥ ثواني.",
            "٣ فشل ورا بعض (١٥ ثانية) = اقتله."
          ],
          sol: R`بالـ liveness لوحدها والتطبيق بياخد ٢٥ ثانية: [[RESTARTS]] بيزيد كل حوالي ٤٥ ثانية للأبد، و [[describe]] بيقول [[Liveness probe failed: ... connect: connection refused]] و [[Last State: Terminated, Exit Code: 137]]. والـ pod مكتوب [[1/1]] من أول ثواني وهو لسه مش بيسمع (مفيش readiness).

بالتلاتة: [[0/1]] حوالي ٣٠ ثانية، وبعدين [[1/1]] و [[RESTARTS 0]].

بالـ liveness على 8080: التطبيق سليم واللوجات نضيفة، بس [[RESTARTS]] بيزيد ويوصل [[CrashLoopBackOff]] بعد كام دقيقة، والـ Events فيها [[Killing ... failed liveness probe]]. الحل: نفس بورت الـ container، أو اسم البورت ([[port: http]] لو مسمّيه في [[ports]]).

(اتجرّب على kind v0.33.0، Kubernetes v1.37.0، في ويندوز 11.)`,
          solCode: R`apiVersion: apps/v1
kind: Deployment
metadata: { name: slow }
spec:
  replicas: 2
  selector: { matchLabels: { app: slow } }
  template:
    metadata: { labels: { app: slow } }
    spec:
      containers:
        - name: slow
          image: myapp:1.0
          env: [{ name: START_DELAY, value: "25" }]
          startupProbe: { httpGet: { path: /healthz, port: 3000 }, periodSeconds: 2, failureThreshold: 30 }
          readinessProbe: { httpGet: { path: /readyz, port: 3000 }, periodSeconds: 5 }
          livenessProbe: { httpGet: { path: /healthz, port: 3000 }, periodSeconds: 5, failureThreshold: 3 }`
        },
        {
          cmd: "requests و limits",
          title: "الـ CPU والرام: الحجز والسقف، و OOMKilled و Pending",
          desc: R`[[requests]] هو اللي الـ scheduler بيحجزه للـ pod على الـ node (من غيره بيرص pods أكتر من اللي السيرفر يشيله)، و [[limits]] هو السقف: لو الرام عدّته الـ container بيتقتل [[OOMKilled]]، ولو الـ CPU عدّاه بيتبطّأ بس.

ولو طلبت [[requests]] أكبر من اللي فاضي في أي node، الـ pod يفضل [[Pending]] ومش هيتحط خالص.`,
          example: R`kubectl apply -f k8s/hog.yaml
kubectl get pod -l app=hog -o jsonpath='{.items[0].status.qosClass}'
kubectl exec deploy/hog -- node -e "fetch('http://localhost:3000/leak?mb=50').then(r=>r.text()).then(console.log)"
kubectl describe pod -l app=hog
kubectl set resources deploy/big --requests=cpu=20,memory=64Mi
kubectl top pods`,
          try: R`طبّق [[hog.yaml]] اللي في الشرح (limit رام 128Mi)، ونفّذ سطر الـ [[/leak]] ٣ مرات ورا بعض، وبعدين [[kubectl get pods]] و [[describe]]. وبعدين اعمل Deployment [[big]] واطلب له [[cpu=20]] (أكتر من أي node) وشوف حالته والـ Events.`,
          deep: {
            why: R`الـ scheduler بيقرر بالـ requests، مش بالاستهلاك الحقيقي. لو مكتبتش requests، كل pod «بياخد صفر»، فيتحطوا كلهم على نفس الـ node لحد ما الرام تخلص والـ kernel يبدأ يقتل عشوائي. ولو مكتبتش limit رام، pod فيه memory leak ياكل الـ node كله ويوقّع جيرانه.`,
            how: R`الوحدات: [[cpu: 100m]] = ١٠٠ milli-CPU = عُشر core، و [[cpu: 1]] = core كامل. [[64Mi]] = ٦٤ × ١٠٢٤ × ١٠٢٤ byte (Mi مش M).

الرام: الـ limit بيتحط كـ cgroup على الـ container. أول ما يعدّيه، الـ kernel بيقتل (SIGKILL، [[Exit Code 137]])، والـ kubelet بيكتب [[Reason: OOMKilled]] ويعيد التشغيل. ده مش بيظهر كـ Event، بيظهر في [[Last State]] بتاع الـ container.

الـ CPU: الـ limit بيعمل throttling: الـ container ياخد نصيبه كل ١٠٠ ms وبعدين يستنى. عشان كده فرق كتير بتسيب CPU من غير limit (requests بس)، و requests بتضمن النصيب العادل وقت الزحمة.

QoS class بيتحسب لوحده: [[Guaranteed]] (requests = limits للاتنين في كل container)، و [[Burstable]] (فيه requests أو limits بس مش متساويين)، و [[BestEffort]] (مفيش أي حاجة). لما الـ node رامها تخلص، الـ kubelet بيطرد BestEffort الأول، وبعدين Burstable اللي عدّى الـ requests بتاعه.

[[kubectl top]] محتاج metrics-server (الدرس الجاي)، وبيعرض الاستهلاك الحالي: ده اللي تبني عليه الأرقام، مش التخمين.`,
            when: R`requests لـ CPU والرام في كل container في الإنتاج. limit للرام دايمًا (أعلى من الاستهلاك الطبيعي بهامش). limit للـ CPU لو عايز تمنع خدمة تخنق جيرانها، أو لو الـ namespace عليه quota بيطلبه. وحدّد الأرقام من [[kubectl top]] أو Prometheus بعد ما التطبيق يشتغل بترافيك حقيقي.`,
            mistakes: R`limit رام قريب جدًا من الاستهلاك الطبيعي: OOMKilled كل ما الترافيك يزيد. و Node.js بـ heap افتراضي أكبر من الـ limit: [[--max-old-space-size]] لازم يبقى أقل من الـ limit. و requests كبيرة «احتياطي»: الـ nodes فاضية فعليًا بس الـ scheduler شايفها مليانة، فـ Pending وبتدفع على nodes زيادة. وتدوّر على OOM في [[kubectl get events]] ومتلاقيهوش (هو في [[describe pod]]).`
          },
          teach: R`## الفكرة: حجز وسقف

| | [[requests]] | [[limits]] |
|---|---|---|
| مين بيستخدمه | الـ scheduler: «فيه node فاضي فيها كده؟» | الـ kernel على الـ node، وقت التشغيل |
| الرام | محجوز ليك | لو عدّيته: تتقتل ([[OOMKilled]]) |
| الـ CPU | نصيبك المضمون | لو عدّيته: تتبطّأ (throttling)، مش تتقتل |

اتجرّب على cluster kind بـ ٣ nodes (Kubernetes v1.37.0) على Docker Desktop في ويندوز 11، بتطبيق درس «kind load docker-image» اللي فيه [[/leak?mb=50]]: كل طلب بيحجز ٥٠ ميجا ومش بيرجّعها.

---

## ١. [[kubectl apply -f k8s/hog.yaml]]

~~~yaml k8s/hog.yaml
apiVersion: apps/v1
kind: Deployment
metadata: { name: hog }
spec:
  replicas: 1
  selector: { matchLabels: { app: hog } }
  template:
    metadata: { labels: { app: hog } }
    spec:
      containers:
        - name: hog
          image: myapp:1.0
          resources:
            requests: { cpu: 100m, memory: 64Mi }
            limits: { memory: 128Mi }
~~~

| الحتة | معناها |
|---|---|
| [[cpu: 100m]] | [[m]] = milli: ١٠٠ من ١٠٠٠، يعني عُشر core |
| [[memory: 64Mi]] | [[Mi]] = mebibyte = ١٠٤٨٥٧٦ byte. ([[64M]] من غير i = ٦٤ مليون، فرق صغير بس بيلخبط) |
| [[limits: { memory: 128Mi }]] | سقف الرام. ومفيش سقف CPU عمدًا |

---

## ٢. [[kubectl get pod ... -o jsonpath='{.items[0].status.qosClass}']]

[[-l app=hog]] بيرجّع **قايمة**، فـ [[.items[0].status.qosClass]] يعني: أول pod في القايمة، وجواه الخانة اللي k8s حسبها لوحده:

~~~text الناتج
Burstable
~~~

| الـ class | إمتى | لما رام الـ node تخلص |
|---|---|---|
| [[Guaranteed]] | requests = limits لـ CPU والرام في كل container | آخر واحد يتطرد |
| [[Burstable]] | فيه requests، ومش متساوية مع limits (زي هنا) | في النص |
| [[BestEffort]] | مفيش requests ولا limits خالص | أول واحد يتطرد |

---

## ٣. [[kubectl exec deploy/hog -- node -e "..."]] ٣ مرات

الـ image مفيهاش curl، فبنستخدم [[fetch]] اللي في Node نفسه جوه الـ pod. [[--]] بيفصل flags kubectl عن الأمر اللي هيتنفذ جوه، و [[node -e]] = نفّذ الكود ده.

~~~text الناتج
holding 50 MB

holding 100 MB

command terminated with exit code 137
~~~

| المرة | الرام تقريبًا | اللي حصل |
|---|---|---|
| الأولى | ٥٠ ميجا + التطبيق نفسه | تمام |
| التانية | ١٠٠ ميجا + التطبيق | تمام، لسه تحت ١٢٨ |
| التالتة | ١٥٠ ميجا + التطبيق | عدّى ١٢٨Mi: الـ kernel قتل الـ container كله، ومعاه الـ [[node -e]] بتاعنا، فـ kubectl رجّع ١٣٧ |

---

## ٤. [[kubectl describe pod -l app=hog]]

~~~text kubectl get pods -l app=hog
NAME                   READY   STATUS    RESTARTS     AGE
hog-64f69f984d-7gf7s   1/1     Running   1 (3s ago)   14s
~~~

~~~text kubectl describe pod (جزء)
    Last State:     Terminated
      Reason:       OOMKilled
      Exit Code:    137
      Started:      Wed, 28 Oct 2026 03:39:33 +0300
      Finished:     Wed, 28 Oct 2026 03:39:43 +0300
    Restart Count:  1
~~~

- [[Running]] تاني بعد ٣ ثواني: k8s عمل restart، والرام رجعت صفر (الـ leak اتمسح مع الـ process). عشان كده OOMKilled ممكن يعدّي عليك لو بصيت على [[STATUS]] بس: بص على [[RESTARTS]].
- [[Reason: OOMKilled]] هو الدليل. و [[137]] لوحده مش كفاية (الـ liveness بتطلّع ١٣٧ برضه، شفناها في درس «probes»).
- [[kubectl get events]] مكانش فيها أي حاجة عن OOM: بس [[Created]] و [[Started]]. المكان الوحيد هو [[Last State]].

ولو عايزها في سطر: [[kubectl get pod -l app=hog -o jsonpath='{.items[0].status.containerStatuses[0].lastState.terminated.reason}']] طبع [[OOMKilled]].

---

## ٥. [[kubectl set resources deploy/big --requests=cpu=20,memory=64Mi]]

[[set resources]] بيعدّل الـ resources من غير ما تفتح الـ YAML ([[big]] هنا Deployment عادي عملناه بـ [[kubectl create deployment big --image=myapp:1.0]]). طلبنا ٢٠ core:

~~~text kubectl get pods -l app=big
NAME                   READY   STATUS    RESTARTS   AGE
big-79988dffbc-8jrpb   0/1     Pending   0          6s
big-7fdf777595-j6kvr   1/1     Running   0          7s
~~~

~~~text kubectl describe pod big-79988dffbc-8jrpb (الـ Events)
  Warning  FailedScheduling  18s  default-scheduler  0/3 nodes are available: 1 node(s) had untolerated taint(s), 2 Insufficient cpu. preemption: 0/3 nodes are available: 3 Preemption is not helpful for scheduling.
~~~

اقرا الرسالة حتة حتة:

| الحتة | معناها |
|---|---|
| [[0/3 nodes are available]] | ولا node من التلاتة نفعت |
| [[1 node(s) had untolerated taint(s)]] | الـ control-plane: عليها taint بيمنع الـ pods العادية |
| [[2 Insufficient cpu]] | الـ ٢ workers: كل واحد allocatable بتاعه ١٦ core (نفس اللي Docker Desktop شايفه) والطلب ٢٠ |
| [[Preemption is not helpful]] | حتى لو طرد pods أقل أولوية، برضه مش هيكفي |

والـ pod القديم ([[j6kvr]]) فضل [[Running]]: الـ rolling update مبيقفلش القديم غير لما الجديد يبقى جاهز. فالغلطة دي مش هتوقّع الموقع، بس الـ deploy هيفضل معلّق.

والأرقام اللي الـ scheduler بيحسب بيها:

~~~text kubectl get nodes -o custom-columns=NAME:.metadata.name,CPU:.status.allocatable.cpu,MEM:.status.allocatable.memory
NAME                CPU   MEM
b3a-control-plane   16    16074392Ki
b3a-worker          16    16074392Ki
b3a-worker2         16    16074392Ki
~~~

(على kind كل الـ nodes شايفة نفس الجهاز، فالأرقام دي أكبر من الحقيقة. في الـ cloud كل node ليها أرقامها.)

---

## ٦. [[kubectl top pods]]

محتاج metrics-server (هنسطّبه في الدرس الجاي). من غيره:

~~~text الناتج
error: Metrics API not available
~~~

وبعد ما اشتغل:

~~~text الناتج
NAME                      CPU(cores)   MEMORY(bytes)
beta-766968dd86-64b62     1m           8Mi
hog-64f69f984d-7gf7s      0m           8Mi
web-6d7f7769f7-gklwd      1m           8Mi
~~~

التطبيق فاضي بياكل ٨ ميجا و ١ milli-CPU. فـ [[requests: 64Mi]] و [[limit: 128Mi]] فيهم هامش كبير وهو فاضي، وده اللي تعمله: تقيس تحت ترافيك حقيقي وتظبط.

---

## الخلاصة

| اللي شفته | السبب | تعمل إيه |
|---|---|---|
| [[RESTARTS]] بيزيد و [[Reason: OOMKilled]] | عدّى limit الرام | ارفع الـ limit، أو صلّح الـ leak، أو قلّل [[--max-old-space-size]] |
| [[Pending]] و [[Insufficient cpu]] أو [[memory]] | الـ requests أكبر من أي node فاضية | قلّل الـ requests، أو زوّد nodes |
| [[untolerated taint]] | node مقفولة لنوع معين من الـ pods | طبيعي على الـ control-plane |
| التطبيق بطيء و CPU قريب من الـ limit | throttling | شيل limit الـ CPU أو ارفعه |

> requests = اللي الـ scheduler بيحسب بيه. limits = اللي الـ kernel بيعاقب بيه.`,
          lines: [
            "اعمل Deployment بـ requests (CPU ورام) و limit رام 128Mi.",
            "اعرف الـ QoS class اللي k8s حسبه للـ pod.",
            "خلّي التطبيق يحجز ٥٠ ميجا (كررها ٣ مرات لحد ما يعدّي الـ limit).",
            "اقرا Last State: Reason OOMKilled و Exit Code 137.",
            "اطلب ٢٠ core: أكبر من أي node، فالـ pod الجديد يفضل Pending.",
            "الاستهلاك الحقيقي لكل pod (محتاج metrics-server)."
          ],
          sol: R`بعد التالتة: [[command terminated with exit code 137]]، و [[kubectl get pods]] يوري [[RESTARTS 1]] والحالة [[Running]] تاني، و [[describe]] فيه [[Last State: Terminated]] و [[Reason: OOMKilled]] و [[Exit Code: 137]]. والـ QoS [[Burstable]].

و [[big]] بـ [[cpu=20]]: pod جديد [[Pending]] للأبد، والقديم [[Running]]، والـ Events: [[0/3 nodes are available: 1 node(s) had untolerated taint(s), 2 Insufficient cpu]]. رجّعه بـ [[kubectl set resources deploy/big --requests=cpu=100m]] أو امسحه.

(اتجرّب على kind v0.33.0، Kubernetes v1.37.0، على Docker Desktop في ويندوز 11.)`,
          solCode: R`kubectl apply -f k8s/hog.yaml
kubectl exec deploy/hog -- node -e "fetch('http://localhost:3000/leak?mb=50').then(r=>r.text()).then(console.log)"
kubectl exec deploy/hog -- node -e "fetch('http://localhost:3000/leak?mb=50').then(r=>r.text()).then(console.log)"
kubectl exec deploy/hog -- node -e "fetch('http://localhost:3000/leak?mb=50').then(r=>r.text()).then(console.log)"
kubectl get pod -l app=hog -o jsonpath='{.items[0].status.containerStatuses[0].lastState.terminated.reason}'
kubectl create deployment big --image=myapp:1.0
kubectl set resources deploy/big --requests=cpu=20,memory=64Mi
kubectl describe pod -l app=big
kubectl delete deploy hog big`
        },
        {
          cmd: "HPA",
          title: "HorizontalPodAutoscaler: زوّد الـ pods لوحدك تحت الضغط",
          desc: R`الـ HPA بيبص على استهلاك الـ CPU (أو الرام أو أي metric) كل ١٥ ثانية، ويغيّر [[replicas]] بتاع الـ Deployment عشان المتوسط يقرب من الهدف، بين حد أدنى وحد أقصى.

محتاج حاجتين: metrics-server في الـ cluster (مش موجود على kind لوحده)، و [[requests.cpu]] في الـ pods، لأن «٥٠٪» معناها ٥٠٪ من الـ requests.`,
          example: R`kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/download/v0.9.0/components.yaml
kubectl patch deploy metrics-server -n kube-system --type=json -p='[{"op":"add","path":"/spec/template/spec/containers/0/args/-","value":"--kubelet-insecure-tls"}]'
kubectl top pods
kubectl autoscale deploy web --cpu=50% --min=2 --max=8
kubectl run load --image=busybox:1.37 --restart=Never -- sh -c "while true; do wget -qO- http://web/work >/dev/null; done"
kubectl get hpa web -w
kubectl delete pod load`,
          try: R`على cluster الدروس اللي فاتت: حط [[requests.cpu: 100m]] لـ [[web]]، وسطّب metrics-server، واعمل الـ HPA. شغّل الـ load وراقب [[kubectl get hpa web -w]] دقيقتين، وبعدين امسح الـ load وكمّل مراقبة ٧ دقايق. بعد كام دقيقة الـ pods رجعت؟`,
          deep: {
            why: R`الترافيك مش ثابت: الصبح غير بالليل، والعروض غير الأيام العادية. لو حجزت pods على أعلى ضغط هتدفع عليهم طول الوقت، ولو على المتوسط هتقع وقت الزحمة. الـ HPA بيخلّي العدد يتبع الضغط، ومع cluster autoscaler (أو Karpenter على EKS) الـ nodes نفسها بتزيد وتقل.`,
            how: R`metrics-server بيسأل الـ kubelet على كل node عن استهلاك كل pod، وبيعرضه في Metrics API ([[kubectl top]] بيقرا منه، والـ HPA كمان).

الحسبة: [[desired = ceil(current × currentUtilization ÷ target)]]. مثلًا ٣ pods والمتوسط ١٠٠٪ والهدف ٥٠٪: [[3 × 100 ÷ 50 = 6]]. والـ utilization = الاستهلاك ÷ [[requests.cpu]]، فـ pod بياكل ١٠٢m و requests بتاعه ١٠٠m = ١٠٢٪.

الزيادة سريعة (الافتراضي يضاعف كل ١٥ ثانية أو يزوّد ٤، الأكبر فيهم). النقصان بطيء عمدًا: stabilization window ٥ دقايق، يعني ياخد أعلى توصية في آخر ٥ دقايق، عشان ميقفلش pods ويرجع يفتحها مع كل تذبذب. والاتنين بيتظبطوا في [[spec.behavior]].

على kind، شهادات الـ kubelet مش موقّعة من CA يعرفه metrics-server، فبيرفض يكلّمه. [[--kubelet-insecure-tls]] بيتخطى الفحص ده: للـ cluster المحلي بس، مش للإنتاج.`,
            when: R`أي خدمة stateless الضغط عليها بيتغير، والـ CPU بيعبّر عن الضغط (APIs). لو الضغط مش CPU (queue فيها رسايل مستنية، أو connections)، استخدم custom metrics أو KEDA (بيعمل scale على طول الـ queue، ولحد صفر). ومينفعش HPA على CPU ووقت نفسه VPA بيغيّر الـ requests على نفس الـ metric.`,
            mistakes: R`pods من غير [[requests.cpu]]: الـ HPA يقول [[missing request for cpu]] ومبيعملش حاجة. ونسيان metrics-server: [[TARGETS]] تفضل [[<unknown>]]. و [[replicas: 3]] مكتوبة في YAML الـ Deployment والـ HPA شغال: كل [[kubectl apply]] يرجّع العدد ٣ لحد ما الـ HPA يصلّح تاني، فشيل [[replicas]] من الـ YAML. و [[max]] قليل: الـ HPA يوصل للسقف ويفضل CPU فوق الهدف ([[ScalingLimited]]). وتفتكر إنه مش شغال لأن الـ pods منزلتش على طول بعد الضغط: ده الـ ٥ دقايق.`
          },
          teach: R`## الفكرة: الـ replicas بتتحدد لوحدها

أول سطرين بيسطّبوا metrics-server ويخلّوه يشتغل على kind، والتالت بيتأكد إن الأرقام بتوصل. الرابع بيعمل الـ HPA. الخامس بيعمل ضغط، والسادس بيتفرج، والسابع بيوقف الضغط.

اتجرّب على cluster kind بـ ٣ nodes (Kubernetes v1.37.0، kubectl v1.37.1، metrics-server v0.9.0) على Docker Desktop في ويندوز 11، على Deployment [[web]] من الدروس اللي فاتت بعد [[kubectl set resources deploy/web --requests=cpu=100m,memory=64Mi --limits=memory=128Mi]]. المسار [[/work]] في التطبيق بيشغّل الـ CPU ٥٠ ms في كل طلب.

---

## ١. [[kubectl apply -f .../metrics-server/.../v0.9.0/components.yaml]]

الملف الرسمي بنسخة مثبتة في الرابط. بيعمل Deployment في [[kube-system]]، و [[APIService]] اسمها [[v1beta1.metrics.k8s.io]]: دي اللي بتخلّي الـ API server يحوّل أي سؤال عن metrics لـ metrics-server.

~~~text الناتج (آخره)
deployment.apps/metrics-server created
apiservice.apiregistration.k8s.io/v1beta1.metrics.k8s.io created
~~~

لو وقفت هنا، الـ pod بيفضل [[0/1]] على kind، لأنه بيرفض شهادة الـ kubelet.

---

## ٢. [[kubectl patch ... --type=json -p='[...]']]

المرة دي [[--type=json]]: JSON Patch، قايمة عمليات بدل حتة تتدمج.

| الحتة | معناها |
|---|---|
| [["op":"add"]] | زوّد |
| [["path":"/spec/template/spec/containers/0/args/-"]] | في [[args]] بتاعة أول container. و [[-]] في الآخر = «آخر القايمة» |
| [["value":"--kubelet-insecure-tls"]] | الـ flag اللي هيتزوّد |

> نفس حكاية الدرس اللي فات في PowerShell: الشكل ده اشتغل في pwsh 7.6، و Windows PowerShell 5.1 محتاج [[\"]] بدل كل [["]] (وبالـ [[-p '...']] من غير [[=]]). جرّبنا الاتنين بـ [[--dry-run=server]].

بعدها الـ Deployment عمل rollout، واستنينا لحد ما [[kubectl top]] اشتغل.

---

## ٣. [[kubectl top pods]]

~~~text kubectl top nodes
NAME                CPU(cores)   CPU(%)   MEMORY(bytes)   MEMORY(%)
b3a-control-plane   204m         1%       949Mi           6%
b3a-worker          302m         1%       370Mi           2%
b3a-worker2         203m         1%       329Mi           2%
~~~

لو [[error: Metrics API not available]]، metrics-server لسه بيقوم (أول قراية بتاخد حوالي دقيقة) أو مش شغال.

---

## ٤. [[kubectl autoscale deploy web --cpu=50% --min=2 --max=8]]

| الحتة | معناها |
|---|---|
| [[--cpu=50%]] | الهدف: متوسط الـ CPU = ٥٠٪ من [[requests.cpu]] (يعني ٥٠m هنا) |
| [[--min=2]] | عمره ما ينزل تحت ٢ |
| [[--max=8]] | عمره ما يطلع فوق ٨ |

> [[--cpu-percent=50]] اللي في مقالات كتير بقى deprecated في kubectl v1.37: بيشتغل وبيطبع [[Flag --cpu-percent has been deprecated, Use --cpu with percentage or resource quantity format]].

والأحسن تحطه YAML في Git. ده اللي الأمر بيعمله ([[--dry-run=client -o yaml]] طلّع نفس الـ spec ده بالظبط، وده اللي طبّقناه):

~~~yaml k8s/hpa.yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata: { name: web }
spec:
  scaleTargetRef: { apiVersion: apps/v1, kind: Deployment, name: web }
  minReplicas: 2
  maxReplicas: 8
  metrics:
    - type: Resource
      resource: { name: cpu, target: { type: Utilization, averageUtilization: 50 } }
~~~

[[scaleTargetRef]] = هيغيّر [[replicas]] بتاع مين.

### أول دقيقة

~~~text kubectl get hpa web
NAME   REFERENCE        TARGETS              MINPODS   MAXPODS   REPLICAS   AGE
web    Deployment/web   cpu: <unknown>/50%   2         8         3          30s
~~~

[[<unknown>]] لحد ما يجمع قراية. وفي [[describe hpa]] لقينا رسالة مهمة من الثواني دي:

~~~text الناتج
Warning  FailedGetResourceMetric  3m27s  horizontal-pod-autoscaler  failed to get cpu utilization: missing request for cpu in container web of Pod web-6d7f7769f7-rzt7z
~~~

ده pod قديم من قبل ما نحط [[requests.cpu]] (كان لسه بيتقفل). pod واحد من غير requests كفاية يوقف الحسبة.

---

## ٥. [[kubectl run load --image=busybox:1.37 ... wget ... /work]]

pod واحد فيه loop مبيقفش: [[wget -qO- http://web/work]] ([[-q]] من غير كلام، و [[-O-]] اطبع الرد) و [[>/dev/null]] ارمي الرد. [[--restart=Never]] = pod لوحده، مش Deployment.

---

## ٦. [[kubectl get hpa web -w]]

~~~text كل ١٥ ثانية (الوقت، والـ TARGETS، والـ REPLICAS)
03:42:05 cpu: 0%/50%   3
03:42:20 cpu: 102%/50% 3
03:42:35 cpu: 305%/50% 6
03:42:51 cpu: 166%/50% 8
03:43:06 cpu: 118%/50% 8
03:44:22 cpu: 120%/50% 8
~~~

| السطر | اللي حصل |
|---|---|
| [[0%]] و [[3]] | قبل الضغط. ٣ مش ٢ (الـ min) لأن النقصان بيستنى ٥ دقايق |
| [[102%]] | الضغط وصل: ٣ pods بياكلوا ١٠٢m في المتوسط من ١٠٠m |
| [[6]] | [[3 × 100 ÷ 50 = 6]]. والـ Event: [[New size: 6; reason: cpu resource utilization (percentage of request) above target]] |
| [[8]] | وصل للسقف |
| [[118%]] و [[8]] | لسه فوق الهدف بس مش هيزوّد: [[ScalingLimited True TooManyReplicas]] |

ليه فضل فوق ٥٠٪؟ الـ load pod واحد بيبعت طلب ورا طلب، فهو بيولّد حوالي core واحد ضغط (٨ × ١١٨m ≈ ٩٤٠m)، ومحتاج ١٩ pod عشان المتوسط يبقى ٥٠m. و [[kubectl top pods -l app=web]] وقتها كان كل pod بين ١٠٢m و ١٤٣m.

---

## ٧. [[kubectl delete pod load]] والنزول

~~~text كل ٣٠ ثانية بعد ما وقفنا الضغط الساعة 03:44:33
03:45:40 cpu: 8%/50%  8
03:46:10 cpu: 1%/50%  8
03:48:11 cpu: 0%/50%  8
03:50:12 cpu: 0%/50%  8
03:50:43 cpu: 1%/50%  2
~~~

دقيقة عشان الـ CPU ينزل، و ٥ دقايق كمان والـ replicas ثابتة على ٨، وبعدين مرة واحدة لـ ٢ (الـ min): [[New size: 2; reason: All metrics below target]]. ده الـ stabilization window: الـ HPA بياخد أعلى توصية في آخر ٥ دقايق قبل ما ينزّل.

---

## الخلاصة

| اللي شفته | السبب |
|---|---|
| [[TARGETS <unknown>]] | metrics-server مش شغال، أو لسه بيجمع |
| [[missing request for cpu]] | pod من غير [[requests.cpu]] |
| واصل للـ max والـ CPU فوق الهدف | [[ScalingLimited]]: زوّد [[--max]] أو nodes |
| مش بينزل بعد الضغط | طبيعي: ٥ دقايق ([[spec.behavior.scaleDown]]) |

> الـ HPA بيحسب بالنسبة للـ requests، فـ requests غلط = autoscaling غلط.`,
          lines: [
            "سطّب metrics-server (نسخة مثبتة).",
            "على kind بس: خلّيه يقبل شهادات الـ kubelet المحلية.",
            "اتأكد إن الأرقام بتوصل.",
            "اعمل HPA: متوسط CPU ٥٠٪ من الـ requests، بين ٢ و ٨ pods.",
            "pod بيضرب /work من غير توقف عشان يعمل ضغط CPU.",
            "اتفرّج على TARGETS و REPLICAS وهي بتتغير.",
            "وقّف الضغط (والنزول بياخد حوالي ٥ دقايق)."
          ],
          sol: R`في أقل من دقيقة من الضغط: [[TARGETS]] بيطلع فوق [[100%/50%]] و [[REPLICAS]] من ٣ لـ ٦ لـ ٨ (السقف)، و [[kubectl describe hpa web]] فيه [[SuccessfulRescale ... New size: 6]] و [[New size: 8]]. وبعد ما تمسح الـ load: الـ CPU بينزل في دقيقة، والـ replicas تفضل ٨ حوالي ٥ دقايق، وبعدين [[New size: 2; reason: All metrics below target]].

لو [[TARGETS]] فضل [[<unknown>]]: [[kubectl top pods]] بيشتغل؟ لو لأ، metrics-server (ناقصه [[--kubelet-insecure-tls]] على kind). ولو شغال: [[describe hpa]] هيقول [[missing request for cpu]].

(اتجرّب بـ metrics-server v0.9.0 على kind v0.33.0، Kubernetes v1.37.0. وتوقيتات النزول من تشغيلنا: وقفنا 03:44:33 ونزل 03:50:43.)`,
          solCode: R`kubectl set resources deploy/web --requests=cpu=100m,memory=64Mi --limits=memory=128Mi
kubectl apply -f k8s/hpa.yaml
kubectl run load --image=busybox:1.37 --restart=Never -- sh -c "while true; do wget -qO- http://web/work >/dev/null; done"
kubectl get hpa web -w
kubectl top pods -l app=web
kubectl describe hpa web
kubectl delete pod load`
        }
      ]
    }
]);

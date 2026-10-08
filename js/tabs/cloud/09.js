// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
    {
      t: "Containers في الـ cloud",
      l: 3,
      n: "نفس الـ image اللي بتبنيها لـ Docker، بس AWS هو اللي يشغّلها ويكبّرها",
      items: [
        {
          cmd: "ECR",
          title: "ارفع الـ image لـ registry جوه حسابك",
          desc: R`ECR هو Docker registry خاص جوه حساب AWS، و ECS و Lambda و EC2 بيسحبوا منه بالـ role من غير باسوردات.

بتعمل repository، وتسجّل دخول Docker بتوكن مؤقت (١٢ ساعة)، وتعمل tag و push. وحط lifecycle policy تمسح الـ images القديمة، لأن التخزين بيتحاسب بالجيجا.`,
          example: R`aws ecr create-repository --repository-name myapp-api --image-scanning-configuration scanOnPush=true
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.eu-central-1.amazonaws.com
docker build --platform linux/amd64 -t myapp-api:1.4.0 .
docker tag myapp-api:1.4.0 123456789012.dkr.ecr.eu-central-1.amazonaws.com/myapp-api:1.4.0
docker push 123456789012.dkr.ecr.eu-central-1.amazonaws.com/myapp-api:1.4.0
aws ecr describe-images --repository-name myapp-api --query "imageDetails[].[imageTags[0],imageSizeInBytes]" --output table`,
          try: R`اكتب [[keep-last-20.json]] وطبّقه بـ [[aws ecr put-lifecycle-policy --repository-name myapp-api --lifecycle-policy-text file://keep-last-20.json]]: قاعدة بـ [[imageCountMoreThan]] قيمتها 20 و action من نوع [[expire]]. وشوف نتيجة الفحص بـ [[aws ecr describe-image-scan-findings]].`,
          deep: {
            why: "ECS أو EKS محتاجين يسحبوا الـ image من مكان. Docker Hub فيه rate limits، والـ image العامة أي حد عارف الاسم يشوفها. ECR جوه حسابك، والسحب منه بالـ role، وفي نفس الـ region فالسحب سريع ومن غير egress.",
            how: R`[[get-login-password]] بيطلّع token مؤقت (١٢ ساعة) بالهوية اللي انت شغال بيها، والـ pipe بيدّيه لـ [[docker login]] على الـ stdin عشان ميظهرش في history الترمنال. واليوزر دايمًا [[AWS]].

اسم الـ image كامل: [[ACCOUNT.dkr.ecr.REGION.amazonaws.com/REPO:TAG]]. [[docker tag]] بيدّي نفس الـ image الاسم ده، و push بيرفع الطبقات اللي مش موجودة بس.

[[--platform linux/amd64]]: لو بتبني على Mac بـ Apple Silicon، الـ image هتطلع ARM افتراضي وهتقع على Fargate x86 بـ [[exec format error]]. يا تبني amd64، يا تشغّل Fargate على ARM64 (Graviton، وأرخص). التفاصيل في تاب Docker (buildx و --platform).

[[scanOnPush]] بيفحص الـ image على ثغرات معروفة في الباكدجات. والـ tags: متعتمدش على [[latest]]، استخدم رقم نسخة أو الـ commit SHA، وممكن تفعّل tag immutability عشان محدش يكتب فوق tag موجود.

والـ lifecycle policy بتمسح لوحدها حسب قواعد: عدد، أو عمر، أو images من غير tag.`,
            when: "أي container هيشتغل على ECS أو EKS أو Lambda (container image).",
            mistakes: "تبني على Mac M1 وترفع وتستغرب [[exec format error]]. وتكتب [[docker login -p TOKEN]] فيفضل في الـ history. وتستخدم [[:latest]] في الـ task definition فمش عارف إيه اللي شغال ومفيش rollback واضح. وتنسى الـ lifecycle وتلاقي مئات الـ images بتتحاسب."
          },
          teach: R`## الفكرة: repository، دخول، بناء، اسم كامل، رفع، مراجعة

٦ أوامر بالترتيب اللي هتعمله بيه أول مرة. اللي بعد كده في كل deploy: الـ build والـ tag والـ push بس (والـ login لو الـ token خلص).

اتجرّب هنا: [[docker build --platform linux/amd64]] و [[docker tag]] على Docker Desktop (ويندوز 11) بـ image تجربة من [[nginx:alpine]]. أوامر [[aws ecr]] من الـ docs: ECR مش موجود في LocalStack المجاني، وجرّبناه فرد [[The API for service 'ecr' is either not included in your current license plan]]. والـ push محتاج حساب.

---

## ١. [[aws ecr create-repository ...]]

~~~bash
aws ecr create-repository --repository-name myapp-api --image-scanning-configuration scanOnPush=true
~~~

| الحتة | معناها |
|---|---|
| [[ecr]] | Elastic Container Registry |
| [[create-repository]] | repository = مكان لـ image واحدة بكل نسخها (tags) |
| [[--repository-name myapp-api]] | اسمه |
| [[--image-scanning-configuration scanOnPush=true]] | افحص كل image أول ما تترفع على ثغرات معروفة. الصيغة [[key=value]] اختصار الـ CLI بدل JSON |

الرد (من الـ docs) فيه [[repositoryUri]]: [[123456789012.dkr.ecr.eu-central-1.amazonaws.com/myapp-api]]. ده الاسم اللي هتستخدمه في كل حاجة بعد كده.

---

## ٢. [[aws ecr get-login-password ... | docker login ...]]

~~~bash
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.eu-central-1.amazonaws.com
~~~

| الحتة | معناها |
|---|---|
| [[get-login-password]] | AWS يدّيك باسورد مؤقت (١٢ ساعة) بالصلاحيات اللي انت شغال بيها |
| [[--region eu-central-1]] | الـ registry في الـ region دي |
| [[|]] | ابعت الباسورد للأمر اللي بعده على طول، من غير ما يتطبع |
| [[--username AWS]] | اليوزر ثابت دايمًا [[AWS]] |
| [[--password-stdin]] | اقرا الباسورد من الـ pipe، مش من الأمر |
| آخر حتة | عنوان الـ registry: [[ACCOUNT.dkr.ecr.REGION.amazonaws.com]] |

ليه [[--password-stdin]] مش [[-p]]؟ أي حاجة مكتوبة في الأمر بتتحفظ في history الترمنال وبتبان في قايمة الـ processes. والـ pipe بيعدّي الباسورد من غير ما يتكتب في أي حتة. والناتج لو نجح: [[Login Succeeded]].

---

## ٣. [[docker build --platform linux/amd64 -t myapp-api:1.4.0 .]]

| الحتة | معناها |
|---|---|
| [[--platform linux/amd64]] | ابني لـ Linux على معالج x86-64 (اللي Fargate الافتراضي عليه) |
| [[-t myapp-api:1.4.0]] | الاسم والـ tag. الـ tag رقم نسخة، مش [[latest]] |
| [[.]] | الـ build context: الفولدر الحالي (وفيه الـ Dockerfile) |

بنينا image تجربة بنفس الطريقة وسألنا Docker هي اتبنت لإيه:

~~~bash
docker build --platform linux/amd64 -t teach-cloud02-api:1.4.0 .
docker image inspect teach-cloud02-api:1.4.0 --format '{{.Os}}/{{.Architecture}}'
~~~

~~~text الناتج
linux/amd64
~~~

على Mac بـ Apple Silicon من غير [[--platform]] كانت هتطلع [[linux/arm64]]، و Fargate x86 هيرفض يشغّلها ([[exec format error]]). ودي أسرع طريقة تتأكد قبل الـ push.

---

## ٤. [[docker tag myapp-api:1.4.0 ACCOUNT.dkr.ecr.../myapp-api:1.4.0]]

[[docker tag]] مبيعملش نسخة: بيدّي نفس الـ image اسم تاني. جرّبنا وبعدين [[docker images]]:

~~~text الناتج
123456789012.dkr.ecr.eu-central-1.amazonaws.com/teach-cloud02-api:1.4.0 932b2693021c 93.6MB
teach-cloud02-api:1.4.0 932b2693021c 93.6MB
~~~

نفس الـ ID ([[932b2693021c]])، يعني image واحدة باسمين، والـ ٩٣.٦ ميجا مش متحسوبين مرتين. أول جزء في الاسم (قبل أول [[/]]) هو اللي بيقول لـ Docker «ارفع على السيرفر ده»، فمن غير الاسم الطويل [[docker push]] هيحاول يرفع على Docker Hub.

---

## ٥. [[docker push ACCOUNT.dkr.ecr.../myapp-api:1.4.0]]

بيرفع الـ layers (طبقات الـ image). اللي موجود قبل كده على ECR مش بيترفع تاني ([[Layer already exists]])، فالـ push التاني بيبقى أسرع بكتير. من غير الخطوة ٢ هتاخد [[no basic auth credentials]] (من الـ docs).

---

## ٦. [[aws ecr describe-images ...]]

~~~bash
aws ecr describe-images --repository-name myapp-api --query "imageDetails[].[imageTags[0],imageSizeInBytes]" --output table
~~~

[[imageDetails[]]] كل الـ images، ومن كل واحدة [[imageTags[0]]] (أول tag) و [[imageSizeInBytes]] (الحجم بالـ byte). الحجم هنا **مضغوط** (زي ما اتخزن على ECR)، فهتلاقيه أصغر من الرقم اللي [[docker images]] بيقوله على جهازك. والتخزين بيتحاسب بالجيجا في الشهر، وده سبب الـ lifecycle policy.

---

## الـ solCode: الـ lifecycle policy

| الخانة | معناها |
|---|---|
| [["rulePriority": 1]] | ترتيب القاعدة: الأصغر يتطبق الأول |
| [["tagStatus": "any"]] | أي image، عليها tag أو لأ |
| [["countType": "imageCountMoreThan", "countNumber": 20]] | لو العدد زاد عن ٢٠ (رقم مش نص) |
| [["action": { "type": "expire" }]] | امسح الأقدم لحد ما يبقوا ٢٠ |

و [[start-lifecycle-policy-preview]] ثم [[get-lifecycle-policy-preview]] بيوروك هيمسح إيه **قبل** ما يمسح.

---

## الخلاصة

| كل deploy | الأمر |
|---|---|
| (لو الـ token خلص) | [[get-login-password | docker login --password-stdin]] |
| ابني للمعالج الصح | [[docker build --platform linux/amd64 -t NAME:VERSION .]] |
| الاسم الكامل | [[docker tag]] لـ [[ACCOUNT.dkr.ecr.REGION.amazonaws.com/REPO:VERSION]] |
| ارفع | [[docker push]] |

> tag برقم نسخة أو commit SHA، والـ [[--platform]] بيطابق اللي هتشغّل عليه.`,
          lines: [
            "اعمل repository، وافحص كل image على ثغرات أول ما تترفع.",
            "سجّل دخول Docker على ECR بتوكن مؤقت (عن طريق الـ stdin مش في الأمر).",
            "ابني للمعالج اللي Fargate هيشغّل عليه.",
            "ادّيها الاسم الكامل بتاع ECR.",
            "ارفعها.",
            "اعرض الـ images المرفوعة وحجمها."
          ],
          sol: R`الـ [[keep-last-20.json]] تحت. [[put-lifecycle-policy]] بيرجّع [[registryId]] و [[repositoryName]] و [[lifecyclePolicyText]] (نفس الـ JSON). والقاعدة مش بتمسح فورًا: ECR بيطبّقها في الخلفية خلال ساعات، فلو عايز تشوف هتمسح إيه قبلها شغّل الـ preview اللي تحت.

[[describe-image-scan-findings]] محتاج [[--image-id imageTag=1.4.0]]، وبيرجّع [[imageScanStatus.status: COMPLETE]] و [[findingSeverityCounts]] زي [[{"HIGH": 2, "MEDIUM": 7, "LOW": 12}]]. الأرقام بتفرق حسب الـ base image: [[node:22-alpine]] أو [[distroless]] غالبًا أقل بكتير من [[node:22]] الكامل، وده سبب كويس تصغّر الـ image.

أخطاء شائعة: [[ScanNotFoundException]] يعني الـ image اترفعت قبل ما تفعّل [[scanOnPush]] أو لسه الفحص شغال (استنى أو [[aws ecr start-image-scan]]). و [[InvalidParameterException]] على الـ policy غالبًا [[countNumber]] مكتوب كنص [["20"]] بدل رقم، أو [[tagStatus]] بـ [[tagged]] من غير [[tagPrefixList]]. وخلي بالك إن [[tagStatus: any]] بيعدّ كل الـ images، فلو عندك tag اسمه [[prod]] قديم ممكن يتمسح؛ لو ده خطر اعمل قاعدة بأولوية أعلى تحميه.`,
          solCode: R`cat > keep-last-20.json <<'EOF'
{
  "rules": [{
    "rulePriority": 1,
    "description": "keep last 20 images",
    "selection": { "tagStatus": "any", "countType": "imageCountMoreThan", "countNumber": 20 },
    "action": { "type": "expire" }
  }]
}
EOF
aws ecr put-lifecycle-policy --repository-name myapp-api --lifecycle-policy-text file://keep-last-20.json
aws ecr start-lifecycle-policy-preview --repository-name myapp-api
aws ecr get-lifecycle-policy-preview --repository-name myapp-api --query "previewResults[].[imageTags[0],action.type]" --output table
aws ecr describe-image-scan-findings --repository-name myapp-api --image-id imageTag=1.4.0 --query "[imageScanStatus.status,imageScanFindings.findingSeverityCounts]"`
        },
        {
          cmd: "ECS Fargate",
          title: "شغّل containers من غير ما تدير سيرفرات",
          desc: R`ECS بيشغّل containers ويخلّيها شغالة ويكبّرها، و Fargate معناه مفيش EC2 تديرها: بتقول «container بنص CPU و ١ جيجا» وخلاص، والوحدات هي task definition (وصف الـ container) و service (عايز كام نسخة دايمًا) و cluster.

أسهل طريقة دلوقتي ECS Express Mode: أمر واحد بـ image و roles يعمل service على Fargate و load balancer و URL و autoscaling. و App Runner اتقفل للعملاء الجداد من أبريل ٢٠٢٦، و AWS بتنصح بـ Express Mode بداله. تحذير: الـ load balancer والـ tasks بيتحاسبوا بالساعة لحد ما تمسحهم.`,
          example: R`aws ecs create-express-gateway-service \
  --service-name myapp-api \
  --execution-role-arn arn:aws:iam::123456789012:role/ecsTaskExecutionRole \
  --infrastructure-role-arn arn:aws:iam::123456789012:role/ecsInfrastructureRoleForExpressServices \
  --primary-container '{"image":"123456789012.dkr.ecr.eu-central-1.amazonaws.com/myapp-api:1.4.0","containerPort":3000}' \
  --health-check-path /health \
  --scaling-target '{"minTaskCount":1,"maxTaskCount":4}'
aws ecs list-clusters`,
          try: "لو عندك image على ECR، اعمل الـ service بالأمر ده وافتح الـ URL اللي بيطلع في الكونسول. بعدين افتح الـ service وشوف كل اللي اتعمل: load balancer و target group و security groups و autoscaling. وامسحها لما تخلص.",
          flag: "danger",
          deep: {
            why: "بين VPS (انت بتدير كل حاجة) و Kubernetes (قوي ومعقد جدًا)، ECS Fargate هو النص المعقول على AWS: containers بتتدار وبتكبر، من غير سيرفرات ولا control plane تدفع عليه أو تفهمه.",
            how: R`الـ task definition وصف شبه compose: الـ image، والـ CPU والرام، والبورت، ومتغيرات البيئة، والـ [[secrets]] (ARN من Parameter Store أو Secrets Manager)، واللوجات (الـ driver [[awslogs]] بيودّيها CloudWatch).

فيه دورين لازم تفرق بينهم: الـ execution role بيستخدمه ECS نفسه عشان يسحب الـ image ويقرا الأسرار ويكتب اللوجات. والـ task role بيستخدمه الكود بتاعك جوه الـ container (يرفع على S3 مثلًا). الخلط بينهم أشهر سبب لـ AccessDenied.

الـ service بتقول «عايز N نسخ من الـ task دي ورا load balancer». لو نسخة فشلت في الـ health check بتتقتل ويتعمل غيرها. والـ deploy: revision جديدة من الـ task definition، والـ service بتقوّم النسخ الجديدة وتستنى الـ health check قبل ما تقفل القديمة (rolling). ولو الجديدة فضلت تفشل، الـ circuit breaker بيرجّع للقديمة.

في Fargate كل task ليها network interface و IP في الـ subnet و security group، وبتدفع على الـ vCPU والرام بالثانية. Express Mode بيعمل كل ده من أمر واحد، وتقدر بعدين تعدّل أي جزء كـ ECS عادي.

VPS بـ Docker Compose أرخص بكتير لمشروع صغير. Fargate بيكسب لما تحتاج أكتر من نسخة، و autoscaling، ونشر من غير توقف، ومن غير ما تحدّث سيرفرات.`,
            when: "API أو worker في container ومحتاج أكتر من نسخة أو autoscaling، والفريق مش عايز يدير سيرفرات ولا Kubernetes.",
            mistakes: "الخلط بين execution role و task role. وتسيب الـ health check على [[/]] وهو بيرجّع redirect أو 404 فالـ tasks تفضل تتقتل. وتشغّل الـ tasks في private subnet من غير NAT ولا VPC endpoints فمش قادرة تسحب الـ image. والتطبيق بيسمع على [[localhost]] جوه الـ container بدل [[0.0.0.0]] (تاب Docker)."
          },
          teach: R`## الفكرة: أمر واحد = service و load balancer و autoscaling

[[create-express-gateway-service]] هو ECS Express Mode: بتديه image ودورين IAM، وهو يعمل كل الباقي في حسابك. الأمر مكسور على ٧ سطور، وآخر سطر في المثال أمر تاني بيعرض الـ clusters.

اتجرّب هنا بـ aws-cli 2.37.10 (جوه [[amazon/aws-cli]]): [[help]] بتاع الأمر عشان القيم الافتراضية، وتشغيل الأمر على endpoint مش موجود عشان نتأكد إن الـ CLI قبل كل الـ parameters (من غير ما يكلّم AWS). ECS مش موجود في LocalStack المجاني، والإنشاء الحقيقي بيعمل ALB بيتحاسب بالساعة، فالرد والكونسول من الـ docs.

---

## ١. [[\]] في آخر كل سطر

الأمر طويل، فاتكسر. [[\]] في آخر السطر = «لسه مكمّل». ولازم تبقى آخر حرف من غير مسافة بعدها. في PowerShell بدلها backtick، وفي CMD [[^]].

---

## ٢. الـ parameters واحد واحد

### [[--service-name myapp-api]]

اسم الـ service. من الـ help: لو مكتبتهوش ECS بيولّد اسم، والاسم بيدخل في الـ ARN ومش بيتغير بعد كده.

### [[--execution-role-arn ...ecsTaskExecutionRole]]

الدور اللي **ECS نفسه** بيستخدمه، مش الكود بتاعك. من الـ help:

~~~text
This role is required for Amazon ECS to pull container images from Amazon ECR,
send container logs to Amazon CloudWatch Logs, and retrieve sensitive data from
... Systems Manager Parameter Store or ... Secrets Manager
~~~

يعني: يسحب الـ image، يكتب اللوجات، يقرا الأسرار. والكود جوه الـ container بياخد صلاحياته من [[--task-role-arn]] (مش في المثال) لو محتاج يكلّم S3 مثلًا.

### [[--infrastructure-role-arn ...ecsInfrastructureRoleForExpressServices]]

الدور اللي ECS بيعمل بيه البنية: load balancer و security groups و target group و autoscaling. ده الوحيد الإجباري في الـ help (من غير أقواس [[[ ]]]).

### [[--primary-container '{...}']]

~~~text
'{"image":"123456789012.dkr.ecr.eu-central-1.amazonaws.com/myapp-api:1.4.0","containerPort":3000}'
~~~

JSON بين [[' ']] عشان الشل ميلمسش علامات [["]] اللي جواه. [[image]] الاسم الكامل من ECR (درس [[ECR]])، و [[containerPort]] البورت اللي التطبيق بيسمع عليه جوه الـ container. الـ help بيقول الافتراضي [[80]]، فلو تطبيقك على 3000 ونسيته، الـ health check هيفشل.

### [[--health-check-path /health]]

الـ load balancer بيسأل المسار ده، ولازم يرد 200. الافتراضي في الـ help [[/ping]]، فلو تطبيقك مفيهوش [[/ping]] لازم تكتب المسار بتاعك.

### [[--scaling-target '{"minTaskCount":1,"maxTaskCount":4}']]

من نسخة لـ ٤ حسب الضغط. ومن الـ help، فيه خانتين تانيين اختياريين: [[autoScalingMetric]] ([[AVERAGE_CPU]] أو [[AVERAGE_MEMORY]] أو [[REQUEST_COUNT_PER_TARGET]]) و [[autoScalingTargetValue]] (الافتراضي ٦٠، يعني لو متوسط الـ CPU عدّى ٦٠٪ زوّد نسخة).

### اللي مش مكتوب بياخد افتراضي

| الـ parameter | الافتراضي (من الـ help) |
|---|---|
| [[--cluster]] | الـ cluster اللي اسمه [[default]] |
| [[--cpu]] | [[256]] = ربع vCPU |
| [[--memory]] | [[512]] ميجا |
| [[--cpu-architecture]] | [[X86_64]]، فالـ image لازم [[linux/amd64]] |
| [[--network-configuration]] | الـ default VPC |

---

## ٣. جرّبنا الـ CLI يقبل الأمر

شغّلنا نفس الأمر بالظبط بـ [[--endpoint-url http://127.0.0.1:9]] (عنوان مفيش حد عليه)، عشان الـ CLI يفحص الـ parameters ويقف قبل ما يكلّم أي حد:

~~~text الناتج
aws: [ERROR]: Could not connect to the endpoint URL: "http://127.0.0.1:9/"
~~~

وصل لمرحلة الاتصال، يعني كل الـ parameters والـ JSON مقبولين. وبعدين غلطنا في اسم خانة ([[minTasks]] بدل [[minTaskCount]]):

~~~text الناتج
aws: [ERROR]: An error occurred (ParamValidation): Parameter validation failed:
Unknown parameter in scalingTarget: "minTasks", must be one of: minTaskCount, maxTaskCount, autoScalingMetric, autoScalingTargetValue
~~~

الـ CLI بيمسك الغلط ده على جهازك وبيقولك الأسامي الصح. فلو الأمر فشل بـ [[ParamValidation]]، المشكلة في الكتابة مش في الحساب.

---

## ٤. [[aws ecs list-clusters]]

بيرجّع ARNs بتاعة الـ clusters في الـ region. بعد الأمر الأول هتلاقي [[.../cluster/default]] (اتعمل لوحده لو مكانش موجود). شكل الـ ARN:

~~~text
arn:aws:ecs:eu-central-1:123456789012:cluster/default
 │   │    │   │            │            └ نوع المورد/اسمه
 │   │    │   │            └ رقم الحساب
 │   │    │   └ الـ region
 │   │    └ الخدمة
 │   └ partition (aws العادي)
 └ Amazon Resource Name
~~~

---

## ٥. الـ solCode: الـ URL والمسح

| الأمر | بيعمل إيه |
|---|---|
| [[describe-express-gateway-service --query "service.activeConfigurations[0].ingressPaths[0].endpoint"]] | الـ URL العام اللي الـ ALB بيرد عليه |
| [[delete-express-gateway-service]] | امسح الـ service وكل اللي اتعمل معاه |
| [[aws elbv2 describe-load-balancers]] | اتأكد إن الـ ALB اختفى فعلًا، لأنه بيتحاسب بالساعة |

---

## الخلاصة

| الحتة | اللي يهمك |
|---|---|
| [[--infrastructure-role-arn]] | إجباري: بيه ECS يعمل الشبكة والـ ALB |
| [[--execution-role-arn]] | سحب الـ image واللوجات والأسرار |
| [[containerPort]] | الافتراضي 80، اكتب بورتك |
| [[--health-check-path]] | الافتراضي [[/ping]]، اكتب مسارك |
| [[--scaling-target]] | أقل وأكتر عدد نسخ |

> App Runner اتقفل للعملاء الجداد من ٣٠ أبريل ٢٠٢٦، و AWS بتوجّه لـ Express Mode بداله. والفرق: Express Mode بياخد image جاهزة بس، مش كود من الريبو.`,
          lines: [
            "اعمل service بأمر واحد (الأمر مكمّل في السطور اللي تحته).",
            "اسم الـ service.",
            "الـ role اللي ECS بيسحب بيه الـ image ويكتب اللوجات.",
            "الـ role اللي بيعمل بيه الـ load balancer والشبكة و autoscaling في حسابك.",
            "الـ image من ECR والبورت اللي التطبيق بيسمع عليه.",
            "المسار اللي الـ load balancer بيسأله: التطبيق عايش؟",
            "من نسخة لـ ٤ حسب الضغط.",
            "اعرض الـ clusters في الـ region."
          ],
          sol: R`الأمر بيرجّع [[service]] فيه [[serviceArn]] و [[status]]، والـ URL في [[activeConfigurations[0].ingressPaths[0].endpoint]] (نفس اللي بيظهر في الكونسول). أول ما الـ deployment يخلص (دقايق)، [[curl https://ENDPOINT/health]] يرجّع 200 من الـ container بتاعك. و [[list-clusters]] هيوري [[arn:aws:ecs:eu-central-1:123456789012:cluster/default]] لأن الـ express mode بيستخدم الـ cluster الافتراضي لو محددتش.

في الكونسول هتلاقي الحاجات اللي اتعملت لوحدها: task definition، و service، و Application Load Balancer بـ listener على HTTPS، و target group بالـ health check على [[/health]]، و security groups (واحدة للـ ALB وواحدة للـ tasks بتقبل من الـ ALB بس)، و autoscaling بين 1 و 4 tasks، و log group في CloudWatch. ده بالظبط الشغل اللي كان محتاج عشرات الأوامر.

أخطاء شائعة: الـ tasks تفضل تقوم وتقع، وفي Events [[CannotPullContainerError]] (الـ execution role ناقصها صلاحيات ECR، أو الـ image مبنية لـ arm64 والـ task على x86)، أو [[failed ELB health checks]] (الـ app مش بترد 200 على [[/health]]، أو بتسمع على [[localhost]] بدل [[0.0.0.0]]، أو البورت مش 3000). والمسح مهم: الـ ALB لوحده بيتحاسب بالساعة، فامسح بـ [[delete-express-gateway-service]] واتأكد إن الـ ALB اختفى.`,
          solCode: R`aws ecs describe-express-gateway-service --service-arn arn:aws:ecs:eu-central-1:123456789012:service/default/myapp-api --query "service.activeConfigurations[0].ingressPaths[0].endpoint" --output text
aws ecs delete-express-gateway-service --service-arn arn:aws:ecs:eu-central-1:123456789012:service/default/myapp-api
aws elbv2 describe-load-balancers --query "LoadBalancers[].[LoadBalancerName,State.Code]" --output table`
        }
      ]
    },
    {
      t: "Kubernetes: الأساسيات",
      l: 3,
      n: "بتوصف الحالة اللي عايزها في YAML، و k8s يفضل يصلّح لحد ما الواقع يطابقها",
      items: [
        {
          cmd: "kubectl",
          title: "k8s بيحل إيه، وإمتى متستخدموش",
          desc: R`Kubernetes بيشغّل containers على مجموعة سيرفرات (nodes) ويخلّيها زي ما وصفتها: عدد النسخ، وإعادة التشغيل لو وقعت، والتوزيع، والشبكة بينهم، والـ deploy التدريجي، وانت بتكلّمه بـ [[kubectl]].

بس هو تقيل: شبكات، و ingress، وشهادات، و RBAC، وتحديثات للـ cluster نفسه. لمشروع بـ ٢ أو ٣ خدمات وفريق صغير، Docker Compose على VPS أو ECS أسهل بكتير. k8s بيكسب لما يبقى عندك خدمات كتير وفريق يقدر يديره.`,
          example: R`kind create cluster --name dev
kubectl get nodes
kubectl get pods -A
kubectl describe pod api-7d9f8c6b5-x2x4q
kubectl logs -f deploy/api
kubectl exec -it deploy/api -- sh
kubectl rollout undo deployment/api`,
          try: "سطّب kind (Kubernetes جوه Docker) واعمل cluster. شغّل [[kubectl create deployment web --image=nginx:alpine --replicas=3]]، وامسح pod بـ [[kubectl delete pod]] وشوف k8s بيعمل غيره في ثانية بـ [[kubectl get pods -w]].",
          deep: {
            why: "لما يبقى عندك ٣٠ خدمة على ٢٠ سيرفر، مينفعش حد يدخل SSH ويقرر مين يشتغل فين. k8s بيعمل ده لوحده، وبيدّي كل الفرق نفس الطريقة للـ deploy والإعدادات والمراقبة. وعشان كده بيتسأل عنه كتير في الانترفيوهات.",
            how: R`الفكرة الأساسية: desired state. انت بتقول «عايز ٣ نسخ من api بالـ image دي» (YAML)، والـ control plane بيخزّنها، و controllers بتلف طول الوقت: «شغال كام؟ ٢؟ اعمل واحدة». ده اللي بيخلّي الـ pod اللي اتمسح يرجع.

الـ pod أصغر وحدة: container واحد أو أكتر بيشاركوا الشبكة. وهو مؤقت: بيموت ويتعمل غيره باسم و IP جديد. عشان كده مبتتعاملش مع pods مباشرة.

الـ Deployment بيدير مجموعة pods متشابهة ويعمل rolling update: يقوّم الجديد ويستنى الـ readiness وبعدين يقفل القديم. و [[rollout undo]] بيرجّع الـ revision اللي قبلها.

[[describe]] أهم أمر في التشخيص. فوق هتلاقي حالة كل container: [[State: Waiting]] بـ [[Reason: ImagePullBackOff]] (مش قادر يسحب الـ image) أو [[CrashLoopBackOff]] (بيقوم ويقع)، أو [[Last State: Terminated]] بـ [[Reason: OOMKilled]] (عدّى حد الرام). وفي آخر الـ output الـ Events بتقولك اللي حصل: [[FailedScheduling]] والـ pod فاضل [[Pending]] (مفيش node فيها مكان)، أو [[Failed]] و [[BackOff]] (فشل سحب الـ image، أو «Back-off restarting failed container»).

محليًا: kind أو minikube أو k3d أو Kubernetes جوه Docker Desktop. وفي الـ cloud: EKS على AWS (بتدفع على الـ control plane بالساعة غير الـ nodes)، أو GKE، أو k3s على VPS لو عايز تتعلم.`,
            when: "فرق كبيرة، وخدمات كتير، ومحتاجين نفس المنصة على أكتر من cloud. متستخدموش لمشروع لوحدك عشان الـ CV: الوقت اللي هتصرفه على الـ cluster وقت مش في المنتج.",
            mistakes: "تتعامل مع pod باسمه في سكربتات وهو بيتغير. وتعدّل حاجة بـ [[kubectl edit]] على الإنتاج ومتكتبهاش في الـ YAML، فأول [[apply]] يرجّعها. وتفتكر إن k8s بيحل مشاكل التطبيق نفسه: تطبيق بيقع كل شوية هيفضل يقع، بس بسرعة (CrashLoopBackOff)."
          },
          teach: R`## الفكرة: cluster على جهازك، وأهم ٦ أسئلة تسألها لـ k8s

أول سطر بيعمل cluster، والباقي هي الأوامر اللي هتكتبها كل يوم: فيه nodes إيه؟ فيه pods إيه؟ الـ pod ده ماله؟ اللوجات؟ ادخل جواه، وارجع للنسخة اللي فاتت.

كل ده اتشغّل فعلًا (أكتوبر ٢٠٢٦): kind v0.33.0 و kubectl v1.36.1 على Docker Desktop في ويندوز 11، والـ cluster طلع Kubernetes v1.37.0. عملنا الـ cluster باسم [[teach-cloud02]] بدل [[dev]]، وملف الإعدادات (kubeconfig) في فولدر التجربة عشان منلمسش إعدادات kubectl اللي على الجهاز. والأوامر نفسها هي هي في PowerShell و bash.

---

## ١. [[kind create cluster --name dev]]

[[kind]] = Kubernetes IN Docker: بيشغّل «سيرفر» k8s كامل كـ container. [[--name]] اسم الـ cluster.

~~~text الناتج (آخره)
 ✓ Starting control-plane 🕹️
 ✓ Installing CNI 🔌
 ✓ Installing StorageClass 💾
Set kubectl context to "kind-teach-cloud02"
~~~

| السطر | معناه |
|---|---|
| control-plane | «المخ»: الـ API server وقاعدة etcd والـ scheduler والـ controllers |
| CNI | Container Network Interface: البرنامج اللي بيدّي كل pod عنوان IP |
| StorageClass | طريقة عمل ديسكات للـ pods |
| [[Set kubectl context]] | kubectl بقى بيكلّم الـ cluster ده. الـ context اسمه [[kind-]] + اسم الـ cluster |

أول مرة kind بيسحب image اسمها [[kindest/node]] (عندنا كانت ١.٣٤ جيجا)، فبتاخد وقت.

---

## ٢. [[kubectl get nodes]]

~~~text الناتج
NAME                          STATUS   ROLES           AGE   VERSION
teach-cloud02-control-plane   Ready    control-plane   26s   v1.37.0
~~~

node واحدة بتعمل كل حاجة (في الإنتاج الـ control plane لوحده والـ workers لوحدهم). [[STATUS]] لازم [[Ready]]. وشفناها في الأول [[NotReady]] لمدة ثواني، لحد ما الـ CNI اشتغل.

---

## ٣. [[kubectl get pods -A]]

[[-A]] = [[--all-namespaces]]. الـ namespace زي فولدر جوه الـ cluster. من غير [[-A]] بيعرض [[default]] بس. على cluster جديد لسه قايم:

~~~text الناتج (مختصر)
NAMESPACE            NAME                                         READY   STATUS    RESTARTS   AGE
kube-system          coredns-559f6c778d-mmmfm                     0/1     Pending   0          2s
kube-system          etcd-teach-cloud02-control-plane             0/1     Running   0          12s
kube-system          kube-apiserver-teach-cloud02-control-plane   0/1     Running   0          10s
kube-system          kindnet-q5r8l                                1/1     Running   0          2s
...
~~~

| العمود | معناه |
|---|---|
| [[READY]] | كام container جاهز من كام. [[0/1]] لسه بيقوم |
| [[STATUS]] | [[Pending]] (مستني مكان أو شبكة)، [[Running]]، [[CrashLoopBackOff]]، [[ImagePullBackOff]] |
| [[RESTARTS]] | اتعاد تشغيله كام مرة. رقم بيزيد = مشكلة |

كل اللي في [[kube-system]] هو k8s نفسه شغال كـ pods.

---

## التجربة: k8s بيصلّح لوحده

~~~bash
kubectl create deployment web --image=nginx:alpine --replicas=3
kubectl delete pod web-6bd469df5c-64sx2
~~~

وفي نفس الوقت كان شغال [[kubectl get pods -w]] ([[-w]] = watch: اطبع أي تغيير أول ما يحصل):

~~~text الناتج
web-6bd469df5c-64sx2   1/1     Terminating         0          23s
web-6bd469df5c-4h2fq   0/1     Pending             0          0s
web-6bd469df5c-4h2fq   0/1     ContainerCreating   0          0s
web-6bd469df5c-4h2fq   1/1     Running             0          1s
~~~

في ثانية: pod جديد باسم جديد ([[4h2fq]]) بدل اللي اتمسح. الاسم نفسه ٣ حتت: [[web]] (الـ Deployment) + [[6bd469df5c]] (الـ ReplicaSet، بيتغير مع كل نسخة) + [[4h2fq]] (عشوائي لكل pod). و [[kubectl get rs]] بيوري اللي عمل كده:

~~~text الناتج
NAME             DESIRED   CURRENT   READY   AGE
web-6bd469df5c   3         3         3       32s
~~~

---

## ٤. [[kubectl describe pod NAME]]

عشان نشوف شكله وفيه مشكلة، غيّرنا الـ image لحاجة مش موجودة ([[kubectl set image deploy/api nginx=nginx:does-not-exist]])، و [[describe]] للـ pod الجديد:

~~~text الناتج (مختصر)
Status:           Pending
    State:          Waiting
      Reason:       ErrImagePull
Events:
  Type     Reason     Age                From               Message
  Normal   Scheduled  32s                default-scheduler  Successfully assigned default/api-... to teach-cloud02-control-plane
  Normal   Pulling    15s (x2 over 31s)  kubelet            Pulling image "nginx:does-not-exist"
  Warning  Failed     13s (x2 over 29s)  kubelet            Failed to pull image "nginx:does-not-exist": ... NotFound
  Normal   BackOff    3s (x2 over 28s)   kubelet            Back-off pulling image "nginx:does-not-exist"
  Warning  Failed     3s (x2 over 28s)   kubelet            Error: ImagePullBackOff
~~~

اقرا الـ Events من فوق لتحت، هي القصة: اتحط على node، حاول يسحب، فشل ([[NotFound]])، استنى (BackOff)، حاول تاني ([[x2]] = حصلت مرتين). [[ErrImagePull]] أول فشل، و [[ImagePullBackOff]] يعني «فشل وأنا مستني قبل المحاولة الجاية»، والانتظار بيطول كل مرة.

والمهم: الـ pods القديمة فضلت [[Running]]. الـ Deployment مش بيقفل القديم غير لما الجديد يبقى جاهز، فالموقع مش وقع.

---

## ٥. [[kubectl logs -f deploy/api]]

[[deploy/api]] بدل اسم pod: kubectl بيختار pod من الـ Deployment. و [[-f]] = follow (يفضل مفتوح). جرّبناه بـ [[--tail=3]] (آخر ٣ سطور):

~~~text الناتج
Found 2 pods, using pod/api-77966c779-f95vh
2026/10/08 11:05:28 [notice] 1#1: start worker process 47
2026/10/08 11:05:28 [notice] 1#1: start worker process 48
~~~

لاحظ أول سطر: فيه ٢ pods واختار **واحد**. اللوجات اللي على التاني مش هتظهر. لكل الـ pods: [[kubectl logs -l app=api]] ([[-l]] = بالـ label).

---

## ٦. [[kubectl exec -it deploy/api -- sh]]

| الحتة | معناها |
|---|---|
| [[exec]] | نفّذ أمر جوه container شغال |
| [[-it]] | interactive + terminal: ترمنال تكتب فيه |
| [[--]] | اللي بعدها هو الأمر اللي هيتنفذ جوه، مش flags لـ kubectl |
| [[sh]] | الشل. images زي alpine مفيهاش bash |

جرّبناه بأمر بدل الترمنال:

~~~bash
kubectl exec deploy/api -- sh -c 'hostname; nginx -v'
~~~

~~~text الناتج
api-77966c779-f95vh
nginx version: nginx/1.31.6
~~~

الـ [[hostname]] جوه الـ pod هو اسم الـ pod نفسه.

---

## ٧. [[kubectl rollout undo deployment/api]]

بعد الـ image الغلط، [[kubectl rollout history deploy/api]] كان فيه revision 1 و 2. الـ undo رجّع 1:

~~~text الناتج
deployment.apps/api rolled back
deployment "api" successfully rolled out
NAME                   READY   STATUS        RESTARTS   AGE
api-57566589f9-6lv97   0/1     Terminating   0          32s
api-77966c779-f95vh    1/1     Running       0          38s
~~~

الـ pod البايظ بيتقفل، والقدام فضلوا زي ما هما (نفس الـ ReplicaSet [[77966c779]]).

---

## على ويندوز

kubectl بييجي مع Docker Desktop، و kind ملف [[kind.exe]] واحد. والأوامر هي هي في PowerShell. بس [[$(...)]] و [[head]] و [[cut]] اللي في الـ solCode bash. في PowerShell بدلهم:

~~~powershell
kubectl delete (kubectl get pods -l app=web -o name | Select-Object -First 1)
~~~

~~~text الناتج (pwsh)
pod "web-6bd469df5c-f5lxx" deleted from default namespace
~~~

[[-o name]] بيطبع [[pod/web-...]]، و [[kubectl delete]] بيقبل الشكل ده زي ما هو، فمش محتاج [[cut]]. بس من غير كلمة [[pod]] قبله: جرّبنا [[kubectl delete pod (...)]] ورفض بـ [[there is no need to specify a resource type as a separate argument]]، لأن النوع مكتوب في الاسم أصلًا.

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| بكلّم أنهي cluster؟ | [[kubectl config current-context]] |
| الـ nodes؟ | [[kubectl get nodes]] |
| الـ pods؟ | [[kubectl get pods -A]] |
| الـ pod ده ماله؟ | [[kubectl describe pod NAME]]، والـ Events في الآخر |
| اللوجات؟ | [[kubectl logs -f deploy/NAME]] |
| ادخل جوه | [[kubectl exec -it deploy/NAME -- sh]] |
| ارجع | [[kubectl rollout undo deployment/NAME]] |
| امسح الـ cluster | [[kind delete cluster --name dev]] |`,
          lines: [
            "اعمل cluster محلي جوه Docker للتجربة.",
            "السيرفرات (nodes) في الـ cluster.",
            "كل الـ pods في كل الـ namespaces.",
            "تفاصيل pod والـ Events في الآخر: أول مكان تشخّص فيه.",
            "تابع لوجات الـ deployment اللي اسمه api.",
            "ادخل ترمنال جوه واحد من الـ pods.",
            "ارجع للنسخة اللي قبل كده."
          ],
          sol: R`[[kind create cluster]] بيطبع خطوات بعلامات صح وفي الآخر [[Set kubectl context to "kind-dev"]]. و [[kubectl get nodes]] يطبع [[dev-control-plane Ready control-plane]]. بعد [[create deployment]]، [[kubectl get pods]] يوري ٣ pods أساميهم زي [[web-7c5b8d9f6-abcde]] وحالتهم [[Running]].

في [[get pods -w]] بعد ما تمسح pod هتشوف في ثانية أو اتنين: الـ pod القديم [[Terminating]]، وواحد جديد باسم مختلف [[Pending]] ثم [[ContainerCreating]] ثم [[Running]]. العدد بيرجع ٣ لوحده لأن الـ ReplicaSet شايف «المطلوب ٣، والموجود ٢»، مش لأن حد عمل restart للـ pod القديم؛ ده pod جديد خالص باسم و IP جداد.

أخطاء شائعة: [[kind: command not found]] أو [[Cannot connect to the Docker daemon]] (kind محتاج Docker شغال). و [[ImagePullBackOff]] لو كتبت اسم image غلط. ولو [[kubectl]] بيكلّم cluster تاني (مثلًا شغل)، شوف [[kubectl config current-context]] قبل ما تمسح أي حاجة. (الكلام ده اتجرّب بـ kind v0.33.0 على Docker Desktop في ويندوز، بـ cluster اسمه [[teach-cloud02]]، فالأسامي عندك هتبقى [[dev]] بدل كده.)`,
          solCode: R`kind create cluster --name dev
kubectl create deployment web --image=nginx:alpine --replicas=3
kubectl get pods -o wide
kubectl delete pod $(kubectl get pods -l app=web -o name | head -1 | cut -d/ -f2)
kubectl get pods -w
kind delete cluster --name dev`
        },
        {
          cmd: "Deployment YAML",
          title: "اوصف: عايز ٣ نسخ من الـ API، و k8s يتصرف",
          desc: R`الـ Deployment بيقول «اعمل ٣ pods من الـ image دي وعلّمهم بـ label [[app: api]]»، والـ Service بيدّي اسم ثابت داخل الـ cluster ويوزّع الطلبات على أي pod عليه نفس الـ label وجاهز.

و [[kubectl apply -f]] بيبعت الوصف، و k8s يعمل الفرق بين اللي موجود واللي انت عايزه.`,
          example: R`apiVersion: apps/v1
kind: Deployment
metadata: { name: api }
spec:
  replicas: 3
  selector: { matchLabels: { app: api } }
  template:
    metadata: { labels: { app: api } }
    spec:
      containers:
        - name: api
          image: ghcr.io/myorg/myapp-api:1.4.0
          envFrom: [{ configMapRef: { name: api-config } }, { secretRef: { name: api-secrets } }]
          readinessProbe: { httpGet: { path: /health, port: 3000 } }
          resources: { requests: { cpu: 100m, memory: 128Mi }, limits: { memory: 256Mi } }`,
          try: R`اعمل الـ ConfigMap والـ Secret الأول (الدرس الجاي) أو شيل سطر envFrom. احفظه في [[k8s/api.yaml]] (غيّر الـ image لـ [[nginx:alpine]]، والبورت لـ 80، ومسار الـ readinessProbe لـ [[/]] للتجربة، لأن nginx مفيهوش [[/health]]) و [[kubectl apply -f k8s/]]. اعمل Service بـ [[kubectl expose deployment api --port 80 --target-port 80]] وجرّبه بـ [[kubectl port-forward svc/api 8080:80]] وافتح localhost:8080.`,
          flag: "script",
          deep: {
            why: "بدل ما توصف «خطوات» (شغّل، استنى، شغّل التاني)، بتوصف «النتيجة». ده بيخلّي الـ deploy والـ rollback وإعادة بناء الـ cluster كله مجرد [[apply]] لنفس الملفات من Git.",
            how: R`[[selector]] لازم يطابق الـ [[labels]] اللي في الـ template: ده اللي بيربط الـ Deployment بالـ pods بتوعه. ونفس الـ labels هي اللي الـ Service بيدوّر بيها.

[[readinessProbe]]: k8s ميبعتش ترافيك لـ pod إلا لما [[/health]] يرد 200، وده اللي بيخلّي الـ rolling update من غير توقف. وفيه [[livenessProbe]]: لو فشل، k8s يعيد تشغيل الـ container. خليه بسيط ومتربطهوش بقاعدة البيانات، وإلا لو القاعدة وقعت كل الـ pods هتفضل تتعاد.

[[resources.requests]]: اللي الـ scheduler بيحجزه على الـ node ([[100m]] = عُشر CPU). و [[limits.memory]]: لو الـ container عدّاه يتقتل OOMKilled. ومن غير requests الـ scheduler بيرص pods أكتر من اللي السيرفر يستحمله.

الـ Service: [[kind: Service]] و [[selector: { app: api }]] و [[ports: [{ port: 80, targetPort: 3000 }] ]]. بيدّي اسم DNS داخلي [[api.default.svc.cluster.local]] (أو [[api]] من نفس الـ namespace)، ويوزّع على الـ pods الجاهزة بس. النوع الافتراضي ClusterIP (من جوه بس)، و LoadBalancer بيطلب load balancer حقيقي من الـ cloud (بفلوس).

وللنت: Ingress (قواعد host و path لـ Services، ومحتاج ingress controller). بس ingress-nginx المشهور اتوقف تطويره في مارس ٢٠٢٦، والاتجاه دلوقتي Gateway API ([[Gateway]] و [[HTTPRoute]]) كبديل رسمي.`,
            when: "أي تطبيق stateless على k8s. قواعد البيانات على k8s موضوع أصعب بكتير (StatefulSets)، وغالبًا الأحسن قاعدة مُدارة برا الـ cluster.",
            mistakes: "selector مش مطابق للـ labels فالـ Service مش لاقي pods. ومفيش readinessProbe فالترافيك بيروح لـ pod لسه بيقوم ويطلع 502 مع كل deploy. و liveness بتسأل قاعدة البيانات. ومن غير resources، pod واحد ياكل رام الـ node كله ويوقّع الباقي."
          },
          teach: R`## الفكرة: ملف بيقول «عايز إيه»، مش «اعمل إيه»

الملف ده Deployment: «عايز ٣ pods من الـ image دي، كل واحد عليه label [[app: api]]، ومتبعتلهمش ترافيك غير لما يبقوا جاهزين، ودي حدود الرام والـ CPU». و [[kubectl apply]] بيبعته، و k8s يفضل يقارن الواقع بيه ويصلّح.

اتجرّب على kind (Kubernetes v1.37.0) على Docker Desktop في ويندوز 11، بنسخة الـ solCode ([[nginx:alpine]] على بورت 80)، وجرّبنا كمان الأخطاء اللي في الـ sol واحد واحد. الـ image الأصلية [[ghcr.io/myorg/myapp-api]] مثال مش موجود.

---

## ١. الهيدر: [[apiVersion]] و [[kind]] و [[metadata]]

~~~yaml
apiVersion: apps/v1
kind: Deployment
metadata: { name: api }
~~~

| السطر | معناه |
|---|---|
| [[apiVersion: apps/v1]] | النوع ده موجود في مجموعة [[apps]] نسخة [[v1]]. الـ Pod والـ Service في [[v1]] بس (المجموعة الأساسية) |
| [[kind: Deployment]] | نوع الحاجة |
| [[metadata: { name: api }]] | اسمها. و [[{ }]] في YAML طريقة كتابة object في سطر واحد، زي JSON |

---

## ٢. [[spec]]: اللي انت عايزه

~~~yaml
spec:
  replicas: 3
  selector: { matchLabels: { app: api } }
  template:
    metadata: { labels: { app: api } }
~~~

| السطر | معناه |
|---|---|
| [[replicas: 3]] | ٣ نسخ شغالين دايمًا |
| [[selector.matchLabels]] | «الـ pods بتوعي هما اللي عليهم [[app: api]]» |
| [[template]] | قالب كل pod هيتعمل |
| [[template.metadata.labels]] | كل pod جديد بيتعلّم [[app: api]] |

الـ [[selector]] والـ [[labels]] لازم يتطابقوا. جرّبنا نخليهم مختلفين ([[app: sel]] و [[app: other]]):

~~~text الناتج
The Deployment "sel" is invalid: spec.template.metadata.labels: Invalid value: {"app":"other"}: $__btselector$__bt does not match template $__btlabels$__bt
~~~

k8s رفضه قبل ما يعمل أي حاجة: Deployment مش هيلاقي الـ pods اللي هو نفسه عاملها.

---

## ٣. الـ container

~~~yaml
    spec:
      containers:
        - name: api
          image: ghcr.io/myorg/myapp-api:1.4.0
~~~

[[containers]] قايمة ([[- ]])، لأن الـ pod ممكن يبقى فيه أكتر من container. [[image]] بنسخة محددة [[1.4.0]]: لو [[latest]] مش هتعرف إيه اللي شغال، والـ rollback ملوش معنى.

### [[envFrom]]

~~~yaml
          envFrom: [{ configMapRef: { name: api-config } }, { secretRef: { name: api-secrets } }]
~~~

«خد كل مفتاح في الـ ConfigMap [[api-config]] والـ Secret [[api-secrets]] وحطه متغير بيئة» (الدرس الجاي). جرّبناه والاتنين مش موجودين:

~~~text الناتج
NAME                    READY   STATUS                       RESTARTS   AGE
envt-5495cbcf7d-fsfkd   0/1     CreateContainerConfigError   0          8s
~~~

وفي الـ Events: [[Error: configmap "api-config" not found]]. الـ container مش بيقوم أصلًا، لأن إعداداته ناقصة.

### [[readinessProbe]]

~~~yaml
          readinessProbe: { httpGet: { path: /health, port: 3000 } }
~~~

k8s بيبعت [[GET /health]] على بورت 3000 جوه الـ pod، ولو مردّش 2xx أو 3xx، الـ pod مش «Ready» ومش بياخد ترافيك. والقيم اللي مش مكتوبة بتاخد افتراضي، [[kubectl describe pod]] بيوريها:

~~~text الناتج
    Readiness:    http-get http://:3000/health delay=0s timeout=1s period=10s #success=1 #failure=3
~~~

| القيمة | معناها |
|---|---|
| [[delay=0s]] | ابدأ تسأل على طول |
| [[timeout=1s]] | لو مردّش في ثانية = فشل |
| [[period=10s]] | اسأل كل ١٠ ثواني |
| [[#failure=3]] | ٣ مرات فشل ورا بعض = مش جاهز |

جرّبنا الـ probe ده على nginx (اللي بيسمع على 80 ومفيهوش [[/health]]):

~~~text kubectl get deploy probe (بعد ٢٦ ثانية)
NAME    READY   UP-TO-DATE   AVAILABLE   AGE
probe   0/3     3            0           26s
~~~

الـ pods [[Running]] بس [[0/1]]: شغالين ومحدش هيبعتلهم ترافيك. ده بالظبط غلطة الـ sol.

### [[resources]]

~~~yaml
          resources: { requests: { cpu: 100m, memory: 128Mi }, limits: { memory: 256Mi } }
~~~

| الحتة | معناها |
|---|---|
| [[requests]] | اللي الـ scheduler بيحجزه على الـ node قبل ما يحط الـ pod |
| [[cpu: 100m]] | [[m]] = milli: ١٠٠ من ١٠٠٠ = عُشر CPU |
| [[memory: 128Mi]] | [[Mi]] = mebibyte (١٠٢٤ × ١٠٢٤ byte) |
| [[limits.memory: 256Mi]] | لو عدّاها الـ container يتقتل ([[OOMKilled]]) |

مفيش [[limits.cpu]] عمدًا: لما الـ CPU يخلص التطبيق بيبطأ بس مش بيتقتل، وكتير من الفرق بتسيبه من غير حد.

---

## ٤. [[kubectl apply -f k8s/]]

[[-f]] ملف أو فولدر (كل ملفات YAML اللي فيه).

~~~text الناتج
deployment.apps/api created
deployment "api" successfully rolled out
NAME   READY   UP-TO-DATE   AVAILABLE   AGE
api    3/3     3            3           2s
~~~

([[successfully rolled out]] من [[kubectl rollout status deploy/api]]، بيستنى لحد ما كله Ready.)

وبعدين غيّرنا [[replicas]] لـ 5 وعملنا [[apply]] مرتين:

~~~text الناتج
deployment.apps/api configured
deployment.apps/api unchanged
~~~

أول مرة [[configured]] (فيه فرق، اتطبّق)، والتانية [[unchanged]] (الواقع زي الملف). ده معنى «الحالة المطلوبة»: نفس الملف تطبّقه ١٠ مرات والنتيجة واحدة.

---

## ٥. [[kubectl expose]] والـ Service

~~~bash
kubectl expose deployment api --port 80 --target-port 80
~~~

[[expose]] بيعمل Service بنفس الـ selector بتاع الـ Deployment. [[--port]] البورت اللي الـ Service بيسمع عليه، و [[--target-port]] البورت جوه الـ pod.

~~~text kubectl get svc api
NAME   TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
api    ClusterIP   10.96.132.159   <none>        80/TCP    0s
~~~

~~~text kubectl get endpointslices -l kubernetes.io/service-name=api
NAME        ADDRESSTYPE   PORTS   ENDPOINTS                             AGE
api-4drjg   IPv4          80      10.244.0.15,10.244.0.17,10.244.0.16   0s
~~~

الـ Service ليه IP ثابت ([[ClusterIP]]، من جوه الـ cluster بس)، والـ EndpointSlice هي قايمة IPs الـ pods الجاهزة اللي بيوزّع عليها. pod مش Ready = مش في القايمة.

ومن pod تاني جوه الـ cluster، الاسم بيشتغل كـ DNS:

~~~bash
kubectl run curl --image=nginx:alpine --rm -i --restart=Never -- sh -c "wget -qO- http://api.default.svc.cluster.local | grep -o '<title>.*</title>'"
~~~

~~~text الناتج
<title>Welcome to nginx!</title>
~~~

[[api]] لوحده اشتغل كمان (نفس الـ namespace).

---

## ٦. [[kubectl port-forward svc/api 8080:80]]

بيفتح بورت 8080 على **جهازك** ويوصّله بالـ Service جوه الـ cluster. ده للتجربة والتشخيص، مش للإنتاج.

~~~text الناتج
Forwarding from 127.0.0.1:8080 -> 80
Forwarding from [::1]:8080 -> 80
Handling connection for 8080
~~~

و [[http://localhost:8080]] رد [[200]] بصفحة [[Welcome to nginx!]]. الأمر بيفضل شغال لحد ما تقفله بـ Ctrl+C.

---

## الخلاصة

| الحتة | لو غلطت فيها |
|---|---|
| [[selector]] ≠ [[labels]] | الـ apply نفسه بيترفض |
| [[envFrom]] لحاجة مش موجودة | [[CreateContainerConfigError]] |
| [[readinessProbe]] على مسار أو بورت غلط | [[Running]] بس [[0/1]]، ومفيش ترافيك |
| من غير [[resources]] | الـ scheduler بيرص pods أكتر من اللي الـ node يشيله |
| [[latest]] | مش عارف إيه اللي شغال |

> [[apply]] = «خلّي الواقع زي الملف». [[configured]] لو فيه فرق، و [[unchanged]] لو مفيش.`,
          lines: [
            "نسخة الـ API اللي فيها Deployment.",
            "النوع: Deployment.",
            "اسمه api.",
            "المواصفات.",
            "عايز ٣ نسخ شغالين دايمًا.",
            "الـ pods بتوعي هما اللي عليهم app: api.",
            "قالب كل pod.",
            "كل pod بيتعلّم app: api.",
            "مواصفات الـ pod.",
            "الـ containers.",
            "container اسمه api.",
            "الـ image بنسخة محددة (مش latest).",
            "متغيرات البيئة من ConfigMap و Secret (الدرس الجاي).",
            "متبعتش ترافيك غير لما /health يرد.",
            "احجز عُشر CPU و ١٢٨ ميجا، واقتله لو عدّى ٢٥٦ ميجا."
          ],
          sol: R`الملف بعد التعديلات تحت (من غير envFrom). [[kubectl apply -f k8s/]] يطبع [[deployment.apps/api created]]، و [[kubectl get deploy api]] يوري [[READY 3/3]] بعد ما الـ readinessProbe تعدّي. [[expose]] يطبع [[service/api exposed]]، و [[port-forward]] يطبع [[Forwarding from 127.0.0.1:8080 -> 80]]، و [[http://localhost:8080]] يفتح صفحة [[Welcome to nginx!]].

جرّب كمان تغيّر [[replicas]] لـ 5 وتعمل apply تاني: هيطبع [[deployment.apps/api configured]] ويقوم ٢ زيادة، لأن الـ YAML «حالة مطلوبة» مش أمر.

أخطاء شائعة: [[READY 0/3]] والـ pods [[Running]] بس مش Ready، وده لأن الـ readinessProbe لسه على [[/health]] أو بورت 3000 فـ nginx بيرجّع 404 أو مفيش حد بيسمع. و [[CreateContainerConfigError]] يعني سبت [[envFrom]] والـ ConfigMap أو الـ Secret مش موجودين. و [[selector does not match template labels]] لو غيّرت الـ label في مكان واحد بس. الملف ده عدّى من [[kubeconform -strict]].`,
          solCode: R`apiVersion: apps/v1
kind: Deployment
metadata: { name: api }
spec:
  replicas: 3
  selector: { matchLabels: { app: api } }
  template:
    metadata: { labels: { app: api } }
    spec:
      containers:
        - name: api
          image: nginx:alpine
          ports: [{ containerPort: 80 }]
          readinessProbe: { httpGet: { path: /, port: 80 } }
          resources: { requests: { cpu: 100m, memory: 128Mi }, limits: { memory: 256Mi } }`
        },
        {
          cmd: "ConfigMap و Secret",
          title: "الإعدادات والأسرار في k8s",
          desc: R`ConfigMap للإعدادات العادية (NODE_ENV و LOG_LEVEL) و Secret للأسرار (DATABASE_URL و API keys)، والاتنين بيتحطوا في الـ pod كمتغيرات بيئة ([[envFrom]]) أو كملفات.

خد بالك: الـ Secret في k8s مش متشفّر، هو base64 بس، وأي حد عنده صلاحية يقرا الـ Secrets يفكّه في ثانية. والـ pods مبتاخدش القيم الجديدة لوحدها: لازم restart.`,
          example: R`kubectl create configmap api-config --from-literal=NODE_ENV=production --from-literal=LOG_LEVEL=info
kubectl create secret generic api-secrets --from-env-file=.env.production
kubectl get secret api-secrets -o jsonpath='{.data.DATABASE_URL}' | base64 -d
kubectl create secret generic api-secrets --from-env-file=.env.production --dry-run=client -o yaml | kubectl apply -f -
kubectl rollout restart deployment/api
kubectl rollout status deployment/api`,
          try: "اعمل الـ ConfigMap والـ Secret، وطبّق Deployment الدرس اللي فات، وادخل pod واكتب [[env | grep LOG_LEVEL]]. غيّر LOG_LEVEL في الـ ConfigMap وادخل تاني: لسه القديم. اعمل rollout restart وشوف.",
          deep: {
            why: "الـ image لازم تبقى واحدة لكل البيئات (dev و staging و prod)، والفرق في الإعدادات بس. ومينفعش الأسرار تبقى جوه الـ image أو في YAML على Git.",
            how: R`[[--from-literal]] قيمة قيمة، و [[--from-env-file]] بياخد ملف [[KEY=VALUE]] كله. و [[envFrom]] في الـ Deployment بيحوّل كل مفتاح لمتغير بيئة.

الـ Secret متخزّن في etcd (قاعدة بيانات الـ cluster) كـ base64، و base64 تحويل مش تشفير: [[base64 -d]] بيرجّعه. عشان كده: فعّل encryption at rest في الـ cluster (EKS بيدعمه بـ KMS)، واقفل صلاحية قراية الـ secrets بـ RBAC، ومترفعش YAML فيه Secrets على Git. والبدائل: External Secrets Operator بيسحب من AWS Secrets Manager أو Parameter Store، أو Sealed Secrets بيخلّيك تحط نسخة متشفّرة في Git.

المتغيرات بتتقرا وقت ما الـ container يقوم بس. تعديل الـ ConfigMap مش بيوصل للـ pods الشغالة كمتغيرات (لو متركّب كملف بيتحدّث بعد شوية، بس التطبيق لازم يعيد قراية الملف). عشان كده [[rollout restart]] بيعمل rolling update بنفس الـ image.

[[create]] بيفشل لو الحاجة موجودة. و [[--dry-run=client -o yaml | kubectl apply -f -]] بيولّد الـ YAML ويطبّقه، فينفع يتكرر في سكربت (يعمل أو يعدّل).`,
            when: "أي إعداد بيختلف بين البيئات. والأسرار الحقيقية في الإنتاج الأحسن تيجي من Secrets Manager عن طريق operator.",
            mistakes: "تفتكر إن Secret متشفّر فتحط الـ YAML بتاعه على GitHub. وتعدّل ConfigMap وتستنى التطبيق يتغير. وتطبع الـ env كله في لوج بداية التطبيق فالأسرار تبقى في نظام اللوجات. وملف [[.env.production]] نفسه فاضل على جهاز حد أو في Git."
          },
          teach: R`## الفكرة: الإعدادات برا الـ image، وتتقري مرة واحدة

أول سطرين بيعملوا ConfigMap و Secret، والتالت بيثبت إن الـ Secret مش متشفّر، والرابع بيحدّثه من غير ما يضرب error، وآخر سطرين بيعيدوا تشغيل الـ pods عشان ياخدوا القيم الجديدة.

كل ده اتشغّل على kind (Kubernetes v1.37.0) على Docker Desktop في ويندوز 11، مع Deployment الدرس اللي فات (nginx) وفيه [[envFrom]]. وملف [[.env.production]] اللي استخدمناه فيه قيم تجربة:

~~~text .env.production
DATABASE_URL=postgresql://app:s3cret@db:5432/shop
JWT_SECRET=dev-only-not-real
QUOTED="with quotes"
~~~

---

## ١. [[kubectl create configmap api-config --from-literal=...]]

| الحتة | معناها |
|---|---|
| [[create configmap]] | اعمل ConfigMap |
| [[api-config]] | اسمه، وده اللي الـ Deployment بيشاور عليه في [[configMapRef]] |
| [[--from-literal=NODE_ENV=production]] | مفتاح وقيمته مكتوبين في الأمر. أول [[=]] بعد الـ flag جزء منه، والتاني بيفصل المفتاح عن القيمة |

~~~text الناتج
configmap/api-config created
~~~

---

## ٢. [[kubectl create secret generic api-secrets --from-env-file=.env.production]]

| الحتة | معناها |
|---|---|
| [[secret generic]] | Secret عادي (فيه أنواع تانية: [[tls]] للشهادات و [[docker-registry]] لباسورد registry) |
| [[--from-env-file]] | كل سطر [[KEY=VALUE]] في الملف = مفتاح في الـ Secret |

~~~text الناتج
secret/api-secrets created
~~~

### القيمة بتتخزن زي ما هي مكتوبة

[[QUOTED="with quotes"]] اتخزنت بعلامات التنصيص نفسها:

~~~text kubectl get secret api-secrets -o jsonpath='{.data.QUOTED}' | base64 -d
"with quotes"
~~~

[[--from-env-file]] مش بيشيل التنصيص زي ما مكتبات [[dotenv]] بتعمل. فلو باسورد القاعدة مكتوب بين [[" "]]، التطبيق هياخده بالعلامات ويفشل يتصل. اكتب القيم في الملف من غير تنصيص.

---

## ٣. [[kubectl get secret ... -o jsonpath='{.data.DATABASE_URL}' | base64 -d]]

من جوه لبرة:

### الخطوة ١: الـ Secret متخزن إزاي

~~~text kubectl get secret api-secrets -o yaml (جزء)
data:
  DATABASE_URL: cG9zdGdyZXNxbDovL2FwcDpzM2NyZXRAZGI6NTQzMi9zaG9w
  JWT_SECRET: ZGV2LW9ubHktbm90LXJlYWw=
~~~

القيم شكلها متلخبط، بس دي base64: طريقة كتابة أي bytes بحروف وأرقام بس. مفيش مفتاح ولا باسورد. والـ [[=]] في الآخر حشو عشان الطول يبقى مضاعف ٤.

### الخطوة ٢: [[-o jsonpath='{.data.DATABASE_URL}']]

[[-o jsonpath]] بيطلع خانة واحدة: [[.data]] ثم [[.DATABASE_URL]]. والعلامات [[' ']] عشان الشل ميلمسش الـ [[{ }]].

~~~text الناتج
cG9zdGdyZXNxbDovL2FwcDpzM2NyZXRAZGI6NTQzMi9zaG9w
~~~

### الخطوة ٣: [[| base64 -d]]

[[-d]] = decode:

~~~text الناتج
postgresql://app:s3cret@db:5432/shop
~~~

الباسورد [[s3cret]] قدامك. أي حد عنده صلاحية [[get secrets]] في الـ namespace يقدر يعمل كده.

### على ويندوز (PowerShell مفيهوش [[base64]])

~~~powershell
[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String((kubectl get secret api-secrets -o jsonpath='{.data.DATABASE_URL}')))
~~~

من جوه لبرة: [[kubectl ...]] بيرجّع النص، و [[[Convert]::FromBase64String]] بيحوّله bytes، و [[[Text.Encoding]::UTF8.GetString]] بيحوّل الـ bytes نص. وطلّع نفس الـ URL (اتجرّب في pwsh).

---

## ٤. [[create ... --dry-run=client -o yaml | kubectl apply -f -]]

لو عملت [[create]] تاني:

~~~text الناتج
error: failed to create secret secrets "api-secrets" already exists
~~~

الحل سطر واحد بـ ٣ حتت:

| الحتة | معناها |
|---|---|
| [[--dry-run=client]] | متبعتش حاجة للـ cluster، اعمل الـ object على جهازك بس |
| [[-o yaml]] | واطبعه YAML |
| [[| kubectl apply -f -]] | خد الـ YAML ده وطبّقه. [[-]] بعد [[-f]] معناها «اقرا من الـ stdin» بدل ملف |

~~~text الناتج
Warning: resource secrets/api-secrets is missing the kubectl.kubernetes.io/last-applied-configuration annotation ...
secret/api-secrets configured
~~~

الـ Warning ده بيظهر **مرة واحدة** لأن الـ Secret اتعمل بـ [[create]] مش [[apply]]، و kubectl بيصلّحه لوحده. وبعد كده نفس السطر بيطبع [[configured]] أو [[unchanged]] من غير تحذير. عشان كده السطر ده بيتحط في سكربتات: بيشتغل سواء موجود أو لأ.

---

## ٥. التغيير مش بيوصل لوحده

الـ pods شغالة، وجوه واحد منهم:

~~~text kubectl exec deploy/api -- env | grep -E "LOG_LEVEL|NODE_ENV|JWT"
LOG_LEVEL=info
NODE_ENV=production
JWT_SECRET=dev-only-not-real
~~~

غيّرنا [[LOG_LEVEL]] لـ [[debug]] بنفس طريقة [[--dry-run]] (أول سطر في الـ solCode)، وسألنا تاني:

~~~text الناتج
configmap/api-config configured
LOG_LEVEL=info
~~~

لسه [[info]]. متغيرات البيئة بتتنسخ جوه الـ process وقت ما بيبدأ، ومحدش بيغيّرها بعد كده.

---

## ٦. [[kubectl rollout restart deployment/api]] و [[rollout status]]

~~~text الناتج
deployment.apps/api restarted
Waiting for deployment "api" rollout to finish: 1 out of 3 new replicas have been updated...
Waiting for deployment "api" rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for deployment "api" rollout to finish: 1 old replicas are pending termination...
deployment "api" successfully rolled out
~~~

و [[env]] بعدها: [[LOG_LEVEL=debug]].

إزاي [[restart]] بيعمل rolling update والـ image زي ما هي؟ بيحط annotation فيها الوقت جوه قالب الـ pod، والقالب اتغير، فالـ Deployment بيعمل ReplicaSet جديد:

~~~text kubectl get deploy api -o jsonpath='{.spec.template.metadata.annotations}'
{"kubectl.kubernetes.io/restartedAt":"2026-10-08T14:11:04+03:00"}
~~~

وزي أي rolling update: جديد يبقى Ready، قديم يتقفل، واحد واحد، فمفيش لحظة من غير pods. و [[rollout status]] بيفضل مستني لحد ما يخلص (أو يفشل)، فمفيد في CI بعد أي deploy.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| إعدادات عادية | [[create configmap NAME --from-literal=K=V]] |
| أسرار من ملف | [[create secret generic NAME --from-env-file=FILE]] (من غير تنصيص في الملف) |
| تقرا سر | [[get secret NAME -o jsonpath='{.data.K}' | base64 -d]] |
| تعمل أو تحدّث | [[create ... --dry-run=client -o yaml | kubectl apply -f -]] |
| الـ pods ياخدوا الجديد | [[rollout restart]] ثم [[rollout status]] |

> Secret = base64، مش تشفير. احميه بـ RBAC و encryption at rest، ومترفعهوش على Git.`,
          lines: [
            "إعدادات عادية بقيم مباشرة.",
            "الأسرار من ملف env.",
            "دليل إن الـ Secret مش متشفّر: base64 بيرجّع القيمة.",
            "حدّث الـ Secret لو موجود (بدل ما create يفشل).",
            "أعد تشغيل الـ pods تدريجي عشان ياخدوا القيم الجديدة.",
            "استنى لحد ما الـ rollout يخلص وشوف نجح ولا لأ."
          ],
          sol: R`أول مرة: [[kubectl exec deploy/api -- env | grep LOG_LEVEL]] يطبع [[LOG_LEVEL=info]]. بعد ما تغيّر الـ ConfigMap لـ [[debug]] (بالأمر اللي تحت)، نفس الأمر لسه يطبع [[LOG_LEVEL=info]]: متغيرات البيئة بتتقري مرة واحدة وقت ما الـ container يبدأ، والـ pod الشغال مش هيعرف إن الـ ConfigMap اتغير. بعد [[rollout restart]]، [[rollout status]] يطبع [[deployment "api" successfully rolled out]]، والـ pods الجديدة تطبع [[LOG_LEVEL=debug]].

و [[get secret ... | base64 -d]] بيطبع الـ DATABASE_URL نفسه، يعني الـ Secret مش مشفّر، ده base64 بس: أي حد عنده صلاحية [[get secrets]] يقراه. ده الفرق اللي بيتسأل عليه في الانترفيو.

أخطاء شائعة: تعمل [[kubectl create configmap]] تاني عشان تغيّر القيمة فتاخد [[error: failed to create configmap: configmaps "api-config" already exists]]؛ الطريقة هي [[--dry-run=client -o yaml | kubectl apply -f -]]. و [[.env.production]] فيه سطر بعلامات تنصيص، فالقيمة تتخزن بالتنصيص نفسه. ولو [[env]] مطبعش المتغير خالص، الـ Deployment مفيهوش [[envFrom]] أو اسم الـ ConfigMap فيه مختلف.`,
          solCode: R`kubectl create configmap api-config --from-literal=NODE_ENV=production --from-literal=LOG_LEVEL=debug --dry-run=client -o yaml | kubectl apply -f -
kubectl exec deploy/api -- env | grep LOG_LEVEL
kubectl rollout restart deployment/api
kubectl rollout status deployment/api
kubectl exec deploy/api -- env | grep LOG_LEVEL`
        }
      ]
    }
]);

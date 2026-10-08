// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
    {
      t: "أسئلة انترفيو",
      l: 3,
      n: "إجابات قصيرة تتقال بصوت عالي، والأسئلة اللي بتيجي بعدها",
      items: [
        {
          cmd: "control vs convenience",
          title: "الفرق بين IaaS و PaaS و serverless؟ (What's the difference between IaaS, PaaS and serverless?)",
          desc: R`الفرق في مين بيدير إيه. في IaaS زي EC2 بتاخد سيرفر افتراضي وانت مسؤول عن نظام التشغيل والتحديثات والـ runtime والتطبيق. في PaaS زي Vercel أو RDS بتدّي الكود أو الإعدادات والمنصة بتدير السيرفرات والتحديثات.

وفي serverless زي Lambda مفيش سيرفر تشوفه خالص: كود بيشتغل على حدث، وبيكبر لوحده، وبتدفع على الطلب ووقت التنفيذ، وصفر لو مفيش ترافيك. وكل ما تطلع لفوق بتكسب سرعة وصيانة أقل، وبتخسر تحكم وبتقابل حدود زي مدة التنفيذ والـ cold start. وفي كل الحالات انت مسؤول عن الكود والبيانات والصلاحيات.`,
          try: "قول الإجابة بصوت عالي في أقل من دقيقة، وبعدين طبّقها على ٣ مشاريع من مشاريعك: كل واحد كان إيه؟",
          deep: {
            why: "بيختبر إنك فاهم الـ tradeoff مش حافظ تعريفات: تحكم أكتر وشغل أكتر، ولا راحة أكتر وحدود أكتر.",
            how: R`اربطها بـ shared responsibility: كل ما تطلع لفوق، AWS بيمسك طبقات أكتر (نظام التشغيل، والـ runtime، والـ scaling). والـ containers على Fargate في النص: انت بتدير الـ image والـ runtime جواها، و AWS بيدير السيرفرات.

والتكلفة: IaaS سعر ثابت بالساعة سواء فيه ترافيك ولا لأ. و serverless سعر لكل طلب، أرخص جدًا للترافيك القليل أو المتقطع، وممكن يبقى أغلى من سيرفر مع ترافيك عالي ومستمر.`,
            when: "إمتى تختار serverless وإمتى لأ؟ إيه هو الـ cold start وتقلله إزاي؟ فين الـ containers (ECS و Fargate) من التقسيمة دي؟ إيه هو shared responsibility model؟",
            mistakes: "إن serverless يعني «مفيش سيرفرات» حرفيًا (فيه، بس مش بتديرها). أو إن PaaS و SaaS نفس الحاجة. أو إن managed يعني انت مش مسؤول عن الأمان."
          },
          teach: R`## الفكرة: السؤال كله عن «مين بيدير إيه»

مفيش كود هنا. الإجابة بتتبني على جدول واحد: الطبقات من تحت لفوق، وكل نموذج بيشيل عنك طبقات أكتر.

---

## ١. الجدول اللي في دماغك

| الطبقة | IaaS (EC2) | PaaS (Vercel، RDS) | Serverless (Lambda) |
|---|---|---|---|
| السيرفرات والشبكة الفعلية | AWS | المنصة | AWS |
| نظام التشغيل وتحديثاته | **انت** | المنصة | AWS |
| الـ runtime (Node، Python) | **انت** | المنصة غالبًا | AWS (انت بتختار النسخة) |
| الـ scaling | **انت** (Auto Scaling) | المنصة (بحدود) | لوحده |
| الكود والبيانات والصلاحيات | **انت** | **انت** | **انت** |

آخر سطر ثابت في الكل: ده الـ **shared responsibility model**. AWS مسؤول عن أمان الـ cloud نفسه، وانت مسؤول عن اللي بتحطه فيه.

---

## ٢. الفلوس

| النموذج | بتدفع على إيه | لما مفيش ترافيك |
|---|---|---|
| IaaS | ساعات السيرفر | بتدفع برضه |
| PaaS | خطة أو موارد | غالبًا بتدفع |
| Serverless | عدد الطلبات × مدة التنفيذ × الرام | تقريبًا صفر |

والعكس صحيح: ترافيك عالي ومستمر طول اليوم ممكن يخلّي Lambda أغلى من سيرفر شغال على طول. دي الجملة اللي بتفرّق إجابة قوية عن إجابة محفوظة.

---

## ٣. التمن: حدود

كل ما تطلع لفوق بتقابل حدود: Lambda ليها حد لمدة التنفيذ (١٥ دقيقة حسب الـ docs)، و cold start (أول طلب بعد فترة سكون أبطأ لأن البيئة بتقوم من الأول)، وأقل تحكم في الشبكة ونظام التشغيل، و lock-in أكتر في المنصة.

---

## ٤. فين الـ containers؟

ECS على Fargate في النص: انت بتبني الـ image (فانت مسؤول عن الـ runtime واللي جوه الـ container)، و AWS بيدير السيرفرات اللي تحتها. ECS على EC2 أقرب لـ IaaS.

---

## الخلاصة: الإجابة في ٤ نقط

1. مين بيدير نظام التشغيل والـ runtime.
2. الدفع: بالساعة مقابل بالطلب.
3. التمن: تحكم أقل، وحدود (مدة، cold start)، و lock-in.
4. shared responsibility: الكود والبيانات والصلاحيات عليك دايمًا.`,
          sol: R`إجابة نموذجية في أقل من دقيقة: «الفرق في مين بيدير إيه. IaaS زي EC2: سيرفر، وأنا مسؤول عن النظام والتحديثات والـ runtime، وبدفع بالساعة حتى لو مفيش ترافيك. PaaS زي Vercel أو RDS أو Render: بدّي كود أو إعدادات والمنصة بتشغّل وتحدّث وتعمل باك أب. Serverless زي Lambda: دالة بتشتغل على حدث، بتكبر لوحدها، وبدفع على الطلب، وصفر لو مفيش ترافيك، بس فيه cold start وحدود مدة. كل ما أطلع لفوق بكسب سرعة وصيانة أقل وبخسر تحكم. وفي كل الحالات الكود والبيانات والصلاحيات مسؤوليتي.»

النقط اللي لازم تتقال: (١) مين بيدير نظام التشغيل، (٢) طريقة الدفع (ساعة مقابل طلب)، (٣) التمن: تحكم وحدود و lock-in، (٤) shared responsibility. وتطبيقها على مشاريعك بيبقى جملة لكل واحد، زي: «API على VPS = IaaS، كنت أنا اللي بحدّث وبعمل باك أب»، «Next.js على Vercel = PaaS مع serverless functions للـ API routes».

الغلطة الشائعة: تقول إن serverless «مفيهوش سيرفرات» وتقف، أو تقول إنه دايمًا أرخص. الإجابة الأقوى بتقول إمتى يبقى أغلى: ترافيك عالي ومستمر.`
        },
        {
          cmd: "CloudFront + ECS + RDS",
          title: "هتعمل deploy لتطبيق Next.js و API وقاعدة بيانات على AWS إزاي؟ (How would you deploy Next.js, an API and a database on AWS?)",
          desc: R`هبدأ بسؤال عن الحجم والفريق والميزانية، لأن الإجابة بتختلف. لتطبيق إنتاج متوسط: الـ Next.js والـ API كـ containers على ECS Fargate في private subnets ورا Application Load Balancer في AZين، و CloudFront قدام كل حاجة للكاش والـ HTTPS، والملفات الثابتة والمرفوعة في S3. القاعدة RDS Postgres بـ Multi-AZ في private subnet، والـ security group بتاعها بيقبل من الـ API بس، والأسرار في Secrets Manager أو Parameter Store وبتتحقن في الـ tasks.

الـ deploy من GitHub Actions بـ OIDC: build، و push لـ ECR، و migration، و update للـ service. والمراقبة CloudWatch و Sentry، والدومين على Route 53، والبنية كلها Terraform. ولو فريق صغير وميزانية قليلة، ممكن Next.js على Vercel أو Amplify، والـ API على Fargate أو Lambda، والقاعدة RDS أو Neon.`,
          example: R`Route 53 → CloudFront → ALB → ECS Fargate (web, api) → RDS Postgres (Multi-AZ)
                      ↘ S3 (static + uploads)`,
          try: "ارسم الرسمة دي لمشروع من مشاريعك، وحط تحت كل مربع: التكلفة الشهرية التقريبية، وإيه اللي يحصل لو وقع.",
          flag: "script",
          deep: {
            why: "السؤال بيختبر إنك شايف الصورة كلها: شبكة، وأمان، وبيانات، و deploy، ومراقبة، مش خدمة واحدة.",
            how: R`الشبكة: VPC فيها public subnets للـ ALB بس، و private subnets للـ tasks والقاعدة. والـ tasks بتطلع للنت عن طريق NAT Gateway أو VPC endpoints (أرخص لـ S3 و ECR).

Next.js على أكتر من نسخة: [[output: 'standalone']] في الـ Docker image، والكاش بتاع ISR لازم يبقى مشترك بين النسخ أو متقفل، والصور المرفوعة في S3 مش على الديسك.

الـ migrations: خطوة في الـ pipeline قبل تحديث الـ service (ECS run-task بنفس الـ image)، وتكون backward compatible عشان النسخة القديمة لسه شغالة وقت الـ rolling.

الـ scaling: autoscaling على الـ CPU أو عدد الطلبات لكل target، ومع كل نسخة زيادة اتصالات أكتر للقاعدة، فـ pool صغير لكل نسخة أو RDS Proxy.`,
            when: "إزاي تعمل migrations من غير توقف؟ ISR والكاش في Next.js لما يبقى فيه أكتر من نسخة؟ التكلفة الشهرية تقريبًا كام؟ ليه مش Lambda؟ ليه مش Kubernetes؟ إزاي الـ API يوصل للقاعدة من غير ما تبقى عامة؟",
            mistakes: "تقفز على Kubernetes لتطبيق صغير. أو تحط القاعدة publicly accessible. أو تنسى الأسرار والـ CI والمراقبة. أو متسألش عن الحجم والفريق والميزانية الأول."
          },
          teach: R`## الفكرة: الرسمة سطرين، وكل سهم ليه سبب

المثال رحلة الطلب من اليوزر لحد القاعدة. هنمشي عليها سهم سهم، ونقول كل مربع موجود ليه، ومين يقدر يكلّمه.

~~~text
Route 53 → CloudFront → ALB → ECS Fargate (web, api) → RDS Postgres (Multi-AZ)
                      ↘ S3 (static + uploads)
~~~

---

## ١. السهم بالسهم

| المحطة | بتعمل إيه | ليه هنا |
|---|---|---|
| Route 53 | الـ DNS: [[myapp.com]] يشاور على CloudFront | أول حاجة المتصفح بيسأل عنها |
| CloudFront | CDN: كاش قريب من اليوزر، و HTTPS، و WAF لو محتاج | الملفات الثابتة متوصلش للسيرفر أصلًا |
| [[↘]] S3 | CloudFront بيوزّع: [[/assets/*]] و [[/uploads/*]] من S3، والباقي للـ ALB | الصور والـ JS مش شغلانة الـ containers |
| ALB | Application Load Balancer: يوزّع على الـ tasks، ويشيل اللي بيفشل في الـ health check | في AZين، فوقوع مبنى مش بيوقّعه |
| ECS Fargate | الـ containers: [[web]] (Next.js) و [[api]] | من غير ما تدير سيرفرات |
| RDS Multi-AZ | Postgres مُدار بـ standby في AZ تانية | النقطة الوحيدة اللي وقوعها يوقّع كل حاجة |

---

## ٢. الشبكة: مين يقدر يكلّم مين

| المكان | فيه | مين يوصله |
|---|---|---|
| public subnets | الـ ALB بس | النت (بورت 443) |
| private subnets | الـ tasks | الـ ALB بس (security group) |
| private subnets | RDS | الـ tasks بس، على 5432 |

والـ tasks في private subnet محتاجة طريق للنت (تسحب من ECR، وتكلّم APIs خارجية): NAT Gateway (بالساعة والجيجا)، أو VPC endpoints لـ S3 و ECR (أرخص).

---

## ٣. اللي مش مرسوم بس لازم يتقال

| الحاجة | الإجابة |
|---|---|
| الأسرار | Secrets Manager أو Parameter Store، وبتتحقن في الـ task definition |
| الـ deploy | GitHub Actions بـ OIDC: build، و push لـ ECR، و migration، و [[update-service]] |
| الـ migrations | backward compatible، لأن النسخة القديمة شغالة وقت الـ rolling |
| المراقبة | CloudWatch للوجات والإنذارات، و Sentry للأخطاء |
| البنية | Terraform |

---

## الخلاصة

ابدأ بسؤال الحجم والفريق والميزانية، وبعدين ارسم الطريق ده، وقول لكل مربع: بيعمل إيه، ومين يوصله، وإيه اللي يحصل لو وقع. والجملة اللي تقفل بيها: «الحاجة الوحيدة اللي وقوعها بيوقّع كل حاجة هي القاعدة، عشان كده Multi-AZ».`,
          lines: [
            "رحلة الطلب: DNS، ثم CDN، ثم load balancer، ثم containers، ثم القاعدة.",
            "والملفات الثابتة والمرفوعة من S3 من ورا نفس الـ CDN."
          ],
          sol: R`الرسمة لمشروع متوسط (أرقام تقريبية لـ eu-central-1، بتتغير، راجعها بـ AWS Pricing Calculator):

Route 53: نص دولار للـ zone + الاستعلامات. لو وقع (نادر جدًا) الدومين مش بيتحل؛ الحماية TTL معقول.
CloudFront: على قد الترافيك، وفيه شريحة مجانية شهرية. لو وقع، ممكن تحوّل الـ DNS للـ ALB مباشرة مؤقتًا.
ALB: حوالي ٢٠ دولار في الشهر + وحدات الاستخدام. موزّع على AZين، فوقوع مبنى مش بيوقّعه.
ECS Fargate (نسختين web و ٢ api، صغيرين): عشرات الدولارات. لو task وقعت، ECS بيقوّم غيرها والـ ALB بيشيلها من الترافيك.
RDS Postgres Multi-AZ صغير: تقريبًا ضعف سعر الـ single-AZ. لو الـ primary وقع، failover في دقيقة أو اتنين، والتطبيق لازم يعيد الاتصال.
S3: سنتات للجيجا. عمليًا مش بيقع، والخطر مسح بالغلط، فالحماية versioning.
NAT Gateway (لو الـ tasks في private subnets): حوالي ٣٥ لـ ٤٠ دولار للواحد + الجيجا، وده البند اللي ناس كتير بتنساه.

الغلطة الشائعة: ترسم الرسمة وتنسى الـ NAT والـ public IPs، أو تكتب «لو وقع: مفيش مشكلة» قدام حاجة single point of failure (زي RDS من غير Multi-AZ). الإجابة القوية بتقول بصراحة: «الحاجة الوحيدة اللي وقوعها بيوقّع كل حاجة هي القاعدة، وده ليه دفعت في Multi-AZ».`
        },
        {
          cmd: "least privilege + roles",
          title: "أهم ممارسات IAM إيه؟ (What are IAM best practices?)",
          desc: R`أولًا الـ root user عليه MFA ومفيش ليه access keys ومش بيستخدم في الشغل اليومي. ثانيًا البشر بيدخلوا بهويات مؤقتة عن طريق IAM Identity Center مع MFA، مش IAM users بمفاتيح دايمة. ثالثًا أي workload، سيرفر أو Lambda أو CI، بياخد IAM role بمفاتيح مؤقتة، و GitHub Actions بـ OIDC.

رابعًا least privilege: كل role بالأفعال والموارد اللي محتاجها بس، أبدأ من managed policies وأضيّق، وأستخدم IAM Access Analyzer. وأخيرًا مراجعة دورية للصلاحيات والمفاتيح اللي مش مستخدمة، و CloudTrail شغال، ولو فيه أكتر من حساب SCPs من AWS Organizations كحد أقصى.`,
          try: "راجع حساب AWS عندك بالنقط دي واحدة واحدة، واكتب قدام كل نقطة: متطبقة ولا لأ.",
          deep: {
            why: "أغلب حوادث الأمان على AWS سببها مفتاح اتسرّب أو صلاحية أوسع من اللازم، فالسؤال بيختبر إذا كنت هتبقى خطر على الحساب ولا لأ.",
            how: R`تقييم الطلب: Deny صريح في أي policy يكسب، بعده Allow، والافتراضي ممنوع. وفيه identity-based policies (على اليوزر أو الـ role) و resource-based policies (على الـ bucket أو الـ key أو الـ Lambda)، وفي نفس الحساب يكفي Allow من واحدة منهم، وبين حسابين لازم الاتنين.

وفوقهم حدود: permission boundaries (أقصى حاجة role ممكن تاخدها حتى لو اتدّالها أكتر)، و SCPs على مستوى الـ Organization. الحدود دي مبتدّيش صلاحية، بتقفل بس.`,
            when: "الفرق بين user و role؟ identity-based و resource-based policy؟ إزاي تدّي حساب تاني صلاحية على bucket؟ لو فيه Allow و Deny يحصل إيه؟ إزاي الـ CI يدخل من غير مفاتيح؟",
            mistakes: "«بعمل IAM user لكل تطبيق وبحط المفتاح في .env». أو «بدّي AdministratorAccess وبعدين أضيّق» ومبيضيّقش أبدًا. أو نسيان MFA على الـ root."
          },
          teach: R`## الفكرة: ٥ طبقات بالترتيب: root، ثم البشر، ثم البرامج، ثم الصلاحيات، ثم المراجعة

السؤال مفيهوش كود، بس الإجابة بتمشي بترتيب ثابت، وكل نقطة ليها طريقة تتأكد منها. والجزء اللي اتجرّب: تقرير المفاتيح اللي في الحل، على LocalStack 4.9 بـ AWS CLI 2.37 و [[column]] من أوبونتو 24.04.

---

## ١. الطبقات

| # | النقطة | يعني إيه عمليًا |
|---|---|---|
| ١ | root | MFA، ومفيش ليه access keys، ومبيستخدمش في الشغل اليومي |
| ٢ | البشر | IAM Identity Center (أو [[aws login]]) بمفاتيح مؤقتة و MFA، مش IAM users بمفاتيح دايمة |
| ٣ | البرامج | سيرفر أو Lambda أو task بياخد IAM role، و GitHub Actions بـ OIDC |
| ٤ | least privilege | كل role بالأفعال والموارد اللي محتاجها بس |
| ٥ | المراجعة | مفاتيح مش مستخدمة، و CloudTrail شغال، و SCPs لو فيه Organization |

---

## ٢. AWS بيقرر إزاي؟

لما طلب يوصل، AWS بيبص على كل الـ policies اللي تخصه:

1. فيه **Deny** صريح في أي واحدة؟ ممنوع، خلاص، مهما كان فيه Allow.
2. فيه **Allow**؟ مسموح.
3. مفيش ولا ده ولا ده؟ ممنوع (الافتراضي).

| نوع الـ policy | متعلقة فين | مثال |
|---|---|---|
| identity-based | على user أو role | «الـ role دي تقدر [[s3:GetObject]]» |
| resource-based | على المورد نفسه | bucket policy: «الحساب ده يقدر يقرا» |
| permission boundary | حد أقصى على role | مبيدّيش صلاحية، بيقفل بس |
| SCP | على حساب كامل في الـ Organization | مبيدّيش صلاحية، بيقفل بس |

في نفس الحساب يكفي Allow من نوع واحد من الاتنين الأولانيين، وبين حسابين لازم الاتنين.

---

## ٣. الحل: تقرير المفاتيح

~~~bash
aws iam generate-credential-report
aws iam get-credential-report --query Content --output text | base64 -d | cut -d, -f1,4,5,8,9,11 | column -t -s,
~~~

### [[generate-credential-report]]

بيبدأ يعمل التقرير:

~~~text الناتج
{
    "State": "STARTED",
    "Description": "No report exists. Starting a new report generation task"
}
~~~

ولو طلبته على طول ممكن ميكونش جاهز، فاستنى ثواني وشغّل التاني.

### الـ pipeline

| الحتة | بتعمل إيه |
|---|---|
| [[--query Content --output text]] | التقرير نفسه، بس متشفّر base64 (نص يمثّل بايتات) |
| [[base64 -d]] | فك الـ base64: CSV (أعمدة بينها فواصل) |
| [[cut -d, -f1,4,5,8,9,11]] | [[-d,]] الفاصل هو [[,]]، و [[-f]] الأعمدة دي بس |
| [[column -t -s,]] | اعرضهم جدول محاذي ([[-t]])، والفاصل [[,]] ([[-s,]]) |

الأعمدة اللي اخترناها من أول سطر في الـ CSV:

| رقم | العمود | السؤال |
|---|---|---|
| 1 | [[user]] | مين |
| 4 | [[password_enabled]] | عنده باسورد للكونسول؟ |
| 5 | [[password_last_used]] | آخر مرة دخل |
| 8 | [[mfa_active]] | MFA شغال؟ |
| 9 | [[access_key_1_active]] | عنده مفتاح شغال؟ |
| 11 | [[access_key_1_last_used_date]] | المفتاح ده اتستخدم إمتى |

عملنا user اسمه [[ci-old]] بمفتاح ومستخدمناهوش:

~~~text الناتج
user    password_enabled  password_last_used  mfa_active  access_key_1_active  access_key_1_last_used_date
ci-old  false             not_supported       false       true                 N/A
~~~

اقراه كإنذار: مفتاح شغال ([[true]]) ومحدش استخدمه أبدًا ([[N/A]]). ده بالظبط اللي يتمسح. وفي AWS الحقيقي أول سطر بيبقى [[<root_account>]] (من الـ docs)، و LocalStack مطلّعهوش.

> [[column]] مش موجود في image أوبونتو الصغير. اتسطّب من [[bsdextrautils]]. وعلى ويندوز: [[ConvertFrom-Csv]] في PowerShell.

---

## الخلاصة

| السؤال | الإجابة |
|---|---|
| user ولا role؟ | user هوية دايمة بمفاتيح دايمة، و role بتتلبس بمفاتيح مؤقتة. البرامج تاخد roles |
| Allow و Deny مع بعض؟ | الـ Deny الصريح يكسب |
| الـ CI يدخل إزاي؟ | OIDC، مفيش مفاتيح في Secrets |
| تعرف محتاج إيه إزاي؟ | Access Analyzer، ورسالة [[AccessDenied]]، و [[simulate-principal-policy]] |`,
          sol: R`الجدول المتوقع لحساب شخصي جديد نسبيًا (وده غالبًا اللي هتلاقيه):

الـ root عليه MFA ومفيش ليه مفاتيح: اتأكد بـ [[get-account-summary]] (درس «root + MFA»).
البشر بيدخلوا بهوية مؤقتة (login أو Identity Center): غالبًا «لأ» لو لسه عندك access key في [[~/.aws/credentials]].
كل workload بياخد role: «لأ» لو فيه مفتاح في .env على سيرفر.
CI بـ OIDC: «لأ» لو فيه [[AWS_ACCESS_KEY_ID]] في GitHub Secrets.
least privilege: ابحث عن [[AdministratorAccess]] أو [[*]] في الـ policies.
مفاتيح ومستخدمين مش مستخدمين: [[aws iam generate-credential-report]] وبعدين [[get-credential-report]] بيدّيك CSV فيه آخر استخدام لكل باسورد ومفتاح.
CloudTrail شغال: حساب جديد فيه Event history ٩٠ يوم ببلاش، بس trail بيحفظ في S3 لازم تعمله.

الإجابة في الانترفيو بتبقى بنفس الترتيب ده: root، ثم البشر، ثم البرامج، ثم least privilege، ثم المراجعة. والغلطة الشائعة إنك تقول «بدّي كل واحد الصلاحيات اللي محتاجها» من غير ما تقول إزاي تعرف هو محتاج إيه (Access Analyzer، ورسالة AccessDenied، و [[simulate-principal-policy]]).`,
          solCode: R`aws iam generate-credential-report
aws iam get-credential-report --query Content --output text | base64 -d | cut -d, -f1,4,5,8,9,11 | column -t -s,`
        },
        {
          cmd: "direct-to-S3 upload",
          title: "إزاي تخلّي اليوزر يرفع ملف كبير على S3 بأمان؟ (How do S3 presigned URLs work?)",
          desc: R`بدل ما الملف يعدّي على السيرفر، العميل بيطلب من الـ API إذن رفع. الـ API بيتأكد إن اليوزر مسجّل ومسموح له، ويتحقق من نوع الملف، ويختار هو الـ key، ويعمل presigned URL لـ PutObject بمدة قصيرة (دقايق). الـ URL فيه توقيع SigV4 محسوب بصلاحيات الـ role بتاعة السيرفر على الـ method والـ bucket والـ key ووقت الانتهاء، والـ Content-Type كمان لو طلبت ده بـ [[signableHeaders]] (SDK v3 افتراضيًا بيسيبه برّه التوقيع). فلو أي حاجة من دول اتغيرت S3 بيرفض.

العميل بيعمل PUT مباشرة لـ S3، وبعدين يبلّغ الـ API بالـ key، والـ API يتأكد إن الملف موجود ويخصّ اليوزر ده ويحفظه. والـ bucket فاضل private، والقراية بعدين بـ presigned GET أو CloudFront signed URLs.`,
          example: R`const url = await getSignedUrl(s3, new PutObjectCommand({ Bucket, Key, ContentType }), { expiresIn: 300, signableHeaders: new Set(["content-type"]) });
await fetch(url, { method: "PUT", headers: { "Content-Type": file.type }, body: file });`,
          try: "اشرحها بصوت عالي في دقيقة، وبعدين ارسم الـ sequence diagram: المتصفح والـ API و S3، وعلّم على كل سهم مين بيتحقق من إيه.",
          flag: "script",
          deep: {
            why: "بيختبر فهمك للأمان (مين يقرر) والأداء (مين يشيل الحمل) مع بعض.",
            how: R`الـ bucket محتاج CORS يسمح بـ PUT من دومينك. والـ PUT الموقّع مبيحددش حجم، فلو محتاج حد: presigned POST مع [[content-length-range]]. وللملفات الكبيرة جدًا: multipart upload بـ URL لكل جزء.

مدة الـ URL محدودة بمدة المفاتيح اللي وقّعته: لو role بجلسة ساعة، الـ URL بيموت بعد ساعة مهما كتبت. وبعد الرفع ممكن S3 event يشغّل Lambda تفحص الملف أو تصغّر الصورة.`,
            when: "تحدد حجم أقصى إزاي؟ ملف ٥ جيجا؟ مين يمسح الملفات اللي اترفعت ومحدش استخدمها؟ (lifecycle على prefix مؤقت) الفرق بين presigned URL و CloudFront signed URL؟ إزاي تفحص الملف على فيروسات؟",
            mistakes: "إن الـ presigned URL بيخلّي الـ bucket public. أو إن العميل يختار الـ key. أو مدة بالأيام. أو نسيان CORS."
          },
          teach: R`## الفكرة: السيرفر بيدّي «إذن» موقّع، والملف يروح على S3 مباشرة

سطرين: السطر الأول على السيرفر (يعمل URL موقّع)، والتاني في المتصفح (يرفع عليه). الملف عمره ما بيعدّي على السيرفر.

اتجرّب بـ [[@aws-sdk/client-s3]] 3.1147 في Node 22، على LocalStack 4.9. واتشغّل مرتين: مرة عادي، ومرة بـ LocalStack مفعّل فيه التحقق من التوقيع ([[S3_SKIP_SIGNATURE_VALIDATION=0]]، لأن الافتراضي فيه إنه ميتحققش).

---

## ١. السيرفر: [[getSignedUrl]]

~~~js
const url = await getSignedUrl(s3, new PutObjectCommand({ Bucket, Key, ContentType }), { expiresIn: 300, signableHeaders: new Set(["content-type"]) });
~~~

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[new PutObjectCommand({ Bucket, Key, ContentType })]] | «الطلب اللي هيتسمح بيه»: رفع ملف على الـ key ده بالنوع ده. [[{ Bucket }]] اختصار لـ [[{ Bucket: Bucket }]] |
| [[getSignedUrl(s3, command, ...)]] | بدل ما يبعت الطلب، يحسب التوقيع ويحطه في URL |
| [[expiresIn: 300]] | صالح ٣٠٠ ثانية = ٥ دقايق |
| [[signableHeaders: new Set(["content-type"])]] | دخّل الـ Content-Type في التوقيع. من غيرها SDK v3 بيسيبه برّه |

اللي بيختار [[Key]] هو السيرفر ([[uploads/user-42/7f3c.png]] في التجربة)، مش العميل.

### الـ URL من جوه

~~~text الناتج (الـ query parameters)
http://teach-cloud0304-ls:4566/myapp-uploads/uploads/user-42/7f3c.png
  X-Amz-Algorithm = AWS4-HMAC-SHA256
  X-Amz-Content-Sha256 = UNSIGNED-PAYLOAD
  X-Amz-Credential = test/20261008/eu-central-1/s3/aws4_request
  X-Amz-Date = 20261008T140608Z
  X-Amz-Expires = 300
  X-Amz-Signature = a3d0b28f37d4...
  X-Amz-SignedHeaders = content-type;host
  x-id = PutObject
~~~

| الخانة | معناها |
|---|---|
| [[AWS4-HMAC-SHA256]] | طريقة التوقيع: SigV4 |
| [[UNSIGNED-PAYLOAD]] | محتوى الملف نفسه مش جوه التوقيع (لسه مش معروف) |
| [[X-Amz-Credential]] | المفتاح اللي وقّع (الـ ID بس، مش السر)، والتاريخ والـ region والخدمة |
| [[X-Amz-Date]] و [[X-Amz-Expires]] | اتوقّع إمتى، وصالح كام ثانية |
| [[X-Amz-SignedHeaders = content-type;host]] | الهيدرز اللي داخلة في التوقيع: النوع والسيرفر |
| [[X-Amz-Signature]] | التوقيع: HMAC محسوب بالسر على كل اللي فوق + الـ method + المسار |

السر نفسه مش في الـ URL. S3 بيعيد حساب التوقيع بنفس السر ويقارن.

---

## ٢. المتصفح: [[fetch PUT]]

~~~js
await fetch(url, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
~~~

[[file]] من [[<input type="file">]]، و [[file.type]] نوعه ([[image/png]]). الـ Content-Type لازم يطابق اللي اتوقّع.

~~~text الناتج (التحقق من التوقيع شغال)
PUT image/png -> 200
PUT text/html -> 403 SignatureDoesNotMatch
HeadObject: image/png 4 bytes
~~~

نفس الـ URL، بس بـ [[text/html]]: S3 رفض. ليه مهم؟ من غير الـ Content-Type في التوقيع، أي حد معاه الـ URL يقدر يرفع HTML على مكان المفروض فيه صورة.

> على LocalStack العادي (من غير التحقق) الرفعة التانية نجحت وكتبت فوق الصورة. فاختبار الأمان على محاكي لازم تتأكد إنه بيتحقق فعلًا.

---

## ٣. الرحلة كاملة (للإجابة)

| # | السهم | مين بيتحقق من إيه |
|---|---|---|
| ١ | Browser ← API: «عايز أرفع» | الـ API: اليوزر مسجّل؟ النوع مسموح؟ |
| ٢ | API ← Browser: [[{url, key}]] | الـ API اختار الـ key |
| ٣ | Browser ← S3: [[PUT url]] | S3: التوقيع؟ المدة؟ الـ Content-Type؟ الـ role ليها [[s3:PutObject]]؟ CORS؟ |
| ٤ | Browser ← API: «رفعت [[key]]» | الـ API: الـ key تبع اليوزر ده؟ [[HeadObject]]: موجود وحجمه معقول؟ |

---

## الخلاصة

| الحاجة | القاعدة |
|---|---|
| مين يختار الـ key | السيرفر |
| المدة | دقايق ([[expiresIn]]) |
| الـ Content-Type | جوه التوقيع بـ [[signableHeaders]] |
| الحجم | PUT مبيحددش؛ presigned POST بـ [[content-length-range]] |
| الـ bucket | يفضل private، والـ URL هو الإذن الوحيد |`,
          lines: [
            "السيرفر: وقّع إذن رفع لملف واحد لمدة ٥ دقايق، والـ Content-Type جوه التوقيع.",
            "المتصفح: ارفع مباشرة على S3 بنفس الـ Content-Type."
          ],
          sol: R`شرح في دقيقة: «المتصفح بيطلب من الـ API إذن رفع. الـ API بيتأكد من اليوزر والنوع والحجم المتوقع، ويختار الـ key، ويعمل presigned PUT URL لمدة دقايق، والتوقيع بصلاحيات الـ role بتاعة السيرفر. المتصفح بيرفع مباشرة على S3، و S3 بيتحقق من التوقيع والمدة والـ Content-Type. بعدها المتصفح يبعت الـ key للـ API، والـ API يتأكد إن الملف موجود وتبع اليوزر ده قبل ما يحفظه.»

الـ sequence diagram وعلى كل سهم مين بيتحقق:
١. Browser ← API: [[POST /uploads/sign]]. الـ API يتحقق: اليوزر مسجّل؟ النوع مسموح؟
٢. API ← Browser: [[{url, key}]]. الـ API هو اللي اختار الـ key ([[uploads/USER_ID/uuid]]).
٣. Browser ← S3: [[PUT url]]. S3 يتحقق: التوقيع سليم؟ المدة لسه؟ الـ Content-Type نفس اللي اتوقّع؟ الـ role اللي وقّعت ليها [[s3:PutObject]]؟ و CORS مسموح للدومين؟
٤. Browser ← API: [[POST /files {key}]]. الـ API يتحقق: الـ key بيبدأ بـ [[uploads/USER_ID/]]؟ [[HeadObject]] بيقول إنه موجود وحجمه معقول؟

نقطة تكسب بيها: مع SDK v3 الجديد، الـ presign ممكن يحط checksum لملف فاضي في الـ URL فالرفع يفشل، والحل [[requestChecksumCalculation: "WHEN_REQUIRED"]] (درس «presigned URL»). والغلطة الشائعة في الإجابة: تنسى الخطوة ٤، فأي حد يقدر يبعت key بتاع يوزر تاني.`
        },
        {
          cmd: "Cache-Control + CDN",
          title: "الـ CDN بيشتغل إزاي، وتكاش إيه ومتكاشش إيه؟ (How does CDN caching work?)",
          desc: R`الـ CDN شبكة سيرفرات قريبة من اليوزرز. أول طلب لملف في منطقة بيروح للـ origin، والـ edge بيحتفظ بالرد حسب Cache-Control والـ TTL في إعدادات الـ CDN، والطلبات اللي بعده بتتخدم من الـ edge، فالـ latency بتقل والـ origin بيرتاح. والـ cache key افتراضي الدومين والمسار، وكل ما تضيف له query strings أو headers أو cookies نسبة الـ hit بتقل.

بكاش الملفات الثابتة اللي أسماءها فيها hash لمدة طويلة مع immutable، و HTML بمدة قصيرة أو no-cache، ومبكاشش أي رد فيه بيانات يوزر إلا لو الـ key بيميّزه. ولو محتاج أغيّر حاجة فورًا بعمل invalidation، بس الأساس versioned filenames.`,
          example: R`Cache-Control: public, max-age=31536000, immutable
Cache-Control: no-cache
Cache-Control: private, no-store`,
          try: "افتح Network في DevTools على موقع كبير، وشوف Cache-Control على الـ HTML وعلى ملفات JS وعلى طلبات API، وفسّر كل واحد ليه كده.",
          flag: "script",
          deep: {
            why: "الكاش من أكبر أدوات الأداء، ومن أخطر مصادر الـ bugs: بيانات يوزر تظهر لتاني، أو نسخة قديمة مش راضية تمشي.",
            how: R`[[max-age]] للمتصفح والـ CDN، و [[s-maxage]] للـ CDN بس. [[no-cache]] يعني «خزّن بس اسأل الـ origin قبل ما تستخدم» (بـ ETag، والرد 304 لو متغيرش)، و [[no-store]] يعني متخزنش خالص. و [[stale-while-revalidate]] يقدّم القديم وهو بيجيب الجديد في الخلفية.

و [[Vary]] بيقول إن الرد بيختلف حسب header (زي [[Accept-Encoding]])، فالـ CDN يخزّن نسخة لكل قيمة. ولو كتير الـ CDN بيبقى مالوش لازمة.`,
            when: "no-cache و no-store الفرق إيه؟ Vary بيعمل إيه؟ stale-while-revalidate؟ الموقع بيعرض نسخة قديمة بعد deploy، تعمل إيه؟ إزاي تكاش API؟",
            mistakes: "إن no-cache معناها «متخزنش» (دي no-store). أو invalidation مع كل deploy كحل أساسي. أو كاش لصفحة فيها بيانات يوزر."
          },
          teach: R`## الفكرة: ٣ هيدرز لـ ٣ أنواع ردود

المثال ٣ قيم لهيدر [[Cache-Control]]، كل واحدة لنوع: ملف اسمه فيه hash، وصفحة HTML، ورد فيه بيانات يوزر. اتجرّبوا على سيرفر Express 5 صغير بيرجّع الـ ٣ دول، و [[curl]] من Git Bash على ويندوز.

---

## ١. [[public, max-age=31536000, immutable]]

| الحتة | معناها |
|---|---|
| [[public]] | أي كاش يخزّنه: المتصفح والـ CDN |
| [[max-age=31536000]] | صالح سنة (بالثواني) من غير ما يسأل |
| [[immutable]] | مش هيتغير أبدًا، فحتى مع refresh المتصفح ميسألش |

ده لملفات زي [[main.3f9a2c.js]]: الـ hash في الاسم بيتغير لو المحتوى اتغير، فالنسخة القديمة عمرها ما هتتطلب تاني.

---

## ٢. [[no-cache]]

**مش** «متخزنش». معناها: «خزّن، بس قبل كل استخدام اسأل السيرفر لسه صالح؟». والسؤال بيبقى رخيص بالـ ETag:

~~~text curl -D - localhost:3911/
HTTP/1.1 200 OK
Cache-Control: no-cache
ETag: W/"2c-1ivDoN+Tucvstnn8ntA5bhjdsVs"
~~~

[[ETag]] بصمة للمحتوى (Express بيحسبها لوحده؛ [[W/]] = weak، و [[2c]] الحجم بالـ hex = ٤٤ بايت). المرة الجاية المتصفح بيبعتها:

~~~text curl -H 'If-None-Match: W/"2c-..."' localhost:3911/
HTTP/1.1 304 Not Modified
~~~

[[304]] من غير جسم: «اللي عندك لسه صالح». فالـ HTML بيتجدد مع كل deploy، وبتكلفة طلب صغير.

---

## ٣. [[private, no-store]]

| الحتة | معناها |
|---|---|
| [[private]] | المتصفح بس، مش أي كاش مشترك (CDN أو proxy) |
| [[no-store]] | متخزنش خالص في أي حتة |

الاتنين مع بعض لأي رد فيه بيانات يوزر ([[/api/me]]). أسوأ bug كاش: CDN يحفظ رد يوزر ويدّيه لغيره.

~~~text الناتج (الـ ٣ مع بعض)
/assets/main.3f9a2c.js   Cache-Control: public, max-age=31536000, immutable
/                        Cache-Control: no-cache
/api/me                  Cache-Control: private, no-store
~~~

---

## ٤. باقي الكلمات اللي هتتسأل عنها

| الكلمة | معناها |
|---|---|
| [[s-maxage]] | زي [[max-age]] بس للكاش المشترك (CDN) بس |
| [[stale-while-revalidate=60]] | قدّم القديم لحد ٦٠ ثانية وانت بتجيب الجديد في الخلفية |
| [[Vary: Accept-Encoding]] | خزّن نسخة لكل قيمة للهيدر ده (gzip ونسخة من غيره) |
| cache key | اللي الـ CDN بيميّز بيه الردود: الدومين والمسار افتراضيًا |

---

## الخلاصة

| الرد | الهيدر |
|---|---|
| ملف فيه hash | [[public, max-age=31536000, immutable]] |
| HTML | [[no-cache]] (ومعاه ETag ← 304) |
| بيانات يوزر | [[private, no-store]] |

[[no-cache]] = اسأل قبل ما تستخدم. [[no-store]] = متخزنش.`,
          lines: [
            "ملف فيه hash: سنة، والمتصفح ميسألش تاني.",
            "HTML: خزّنه بس اسأل الـ origin قبل ما تستخدمه.",
            "بيانات يوزر: متتخزنش في أي مكان مشترك ولا غيره."
          ],
          sol: R`اللي هتلاقيه غالبًا في أي موقع كبير:

الـ HTML: [[no-cache]] أو [[max-age=0, must-revalidate]] أو [[private, max-age=0]]. ليه؟ الـ HTML هو اللي بيشاور على أسماء ملفات الـ JS الجديدة، فلازم يتجدد مع كل deploy.
ملفات JS و CSS اللي أسماءها فيها hash (زي [[main.3f9a2c.js]]): [[public, max-age=31536000, immutable]]. ليه؟ الاسم بيتغير لو المحتوى اتغير، فالنسخة القديمة مش هتتطلب تاني أصلًا.
طلبات API فيها بيانات يوزر: [[private, no-store]] أو [[no-cache]]، ومعاها أحيانًا [[Vary: Authorization]] أو [[Cookie]]. ليه؟ عشان CDN أو proxy ميحفظش رد يوزر ويدّيه لغيره.

وفي DevTools لاحظ عمود Size: [[(memory cache)]] أو [[(disk cache)]] معناها المتصفح مطلبش أصلًا، و [[304]] معناها سأل السيرفر ورد «متغيرش». الغلطة الشائعة: تفتكر إن [[no-cache]] يعني «متكاشش»، هو معناه «كاش بس اسأل قبل ما تستخدم»، والمنع الكامل هو [[no-store]].`
        },
        {
          cmd: "scale out vs scale up",
          title: "الفرق بين horizontal و vertical scaling؟ (Horizontal vs vertical scaling?)",
          desc: R`vertical يعني سيرفر أكبر: CPU ورام أكتر. سهل ومش محتاج تغيير في الكود، بس ليه سقف، وغالبًا فيه توقف وقت التكبير، وبيفضل نقطة فشل واحدة. horizontal يعني نسخ أكتر ورا load balancer: مالوش سقف تقريبًا، وبيدّي high availability، وممكن يتعمل أوتوماتيك مع الضغط، بس التطبيق لازم يبقى stateless: الـ sessions في Redis أو JWT، والملفات في S3، والـ cron ميشتغلش على كل النسخ.

وقواعد البيانات أصعب في الـ horizontal: بتبدأ بـ vertical و read replicas و caching، والـ sharding آخر حل. عمليًا بكبّر vertical لحد نقطة معقولة، وبصمّم التطبيق من الأول يبقى جاهز للـ horizontal.`,
          example: R`aws autoscaling update-auto-scaling-group --auto-scaling-group-name myapp-web --min-size 2 --max-size 10
aws rds modify-db-instance --db-instance-identifier myapp-db --db-instance-class db.r7g.large --apply-immediately`,
          try: "خد تطبيق من تطبيقاتك واكتب ٣ حاجات هتمنعه يشتغل على نسختين: sessions؟ ملفات على الديسك؟ cron؟ WebSockets؟",
          flag: "danger",
          deep: {
            why: "بيختبر إنك عارف ليه التطبيق مش بيكبر بمجرد إنك تزوّد سيرفرات، وإيه اللي لازم يتغير في التصميم.",
            how: R`الـ load balancer بيوزّع ويشيل النسخ اللي بتفشل في الـ health check. والـ autoscaling على metric زي CPU أو عدد الطلبات لكل target. وكل نسخة زيادة بتفتح اتصالات للقاعدة، فالـ pool لازم يتحسب على العدد الأقصى للنسخ، أو pooler زي RDS Proxy.

الـ WebSockets على أكتر من سيرفر محتاجة pub/sub (زي Redis adapter) عشان رسالة من يوزر على سيرفر توصل ليوزر على سيرفر تاني. والـ sticky sessions حل مؤقت بيبوّظ التوزيع وبيوقع مع أي سيرفر.`,
            when: "إزاي تعمل scale لقاعدة البيانات؟ read replicas و replication lag؟ WebSockets على أكتر من سيرفر؟ الـ autoscaling على أنهي metric؟",
            mistakes: "إن horizontal دايمًا أحسن. أو نسيان إن كل نسخة بتفتح اتصالات للقاعدة. أو sticky sessions كحل للـ state."
          },
          teach: R`## الفكرة: أمرين، واحد بيزوّد نسخ وواحد بيكبّر سيرفر

| | horizontal (scale out) | vertical (scale up) |
|---|---|---|
| يعني | نسخ أكتر ورا load balancer | سيرفر أكبر: CPU ورام أكتر |
| الكود | لازم stateless | زي ما هو |
| السقف | تقريبًا مفيش | أكبر سيرفر موجود |
| التوقف | مفيش | غالبًا restart |
| نقطة فشل واحدة | لأ | آه |

الأمرين من الـ docs: Auto Scaling و RDS مش موجودين في LocalStack المجاني اللي اتجرّب عليه الدرس.

---

## ١. horizontal: [[update-auto-scaling-group]]

~~~bash
aws autoscaling update-auto-scaling-group --auto-scaling-group-name myapp-web --min-size 2 --max-size 10
~~~

| الحتة | معناها |
|---|---|
| [[--auto-scaling-group-name myapp-web]] | مجموعة السيرفرات اللي AWS بيديرها |
| [[--min-size 2]] | أقل حاجة نسختين، حتى بالليل |
| [[--max-size 10]] | أقصى ١٠ وقت الضغط |

اللي بيقرر العدد بينهم scaling policy (مثلًا «خلّي متوسط الـ CPU ٥٠٪»). وكل نسخة بتفتح اتصالات للقاعدة: ١٠ نسخ × pool بـ ٢٠ = ٢٠٠ اتصال. احسبها على الـ max مش العادي.

---

## ٢. vertical: [[modify-db-instance --db-instance-class]]

~~~bash
aws rds modify-db-instance --db-instance-identifier myapp-db --db-instance-class db.r7g.large --apply-immediately
~~~

| الحتة | معناها |
|---|---|
| [[db.r7g.large]] | [[db.]] = RDS، و [[r]] = عيلة رام كتير، و [[7]] = الجيل، و [[g]] = Graviton، و [[large]] = الحجم |
| [[--apply-immediately]] | دلوقتي، مش في الـ maintenance window |

تغيير الـ class بيعمل restart (توقف قصير، وفي Multi-AZ أقصر لأنه بيكبّر الـ standby الأول ويعمل failover)، والسعر أكتر.

---

## ٣. اللي بيمنع النسختين (من الحل)

| الحاجة | المشكلة على نسختين | الحل |
|---|---|---|
| sessions في الرام | اليوزر يخرج لما الطلب يروح للتانية | Redis store أو JWT |
| ملفات على الديسك | الصورة موجودة على نسخة واحدة | S3 أو R2 |
| cron جوه التطبيق | الإيميل يتبعت مرتين | scheduler واحد أو lock |
| WebSockets | رسالة على نسخة مش بتوصل للتانية | Redis adapter (pub/sub) |

درس «stateless» تحت فيه التجربة الأولى متشغّلة فعلًا: نسختين ورا Nginx، و ٥ من ٢٠ طلب طلعوا «مش مسجّل».

---

## الخلاصة

كبّر vertical الأول لأنه مش محتاج تغيير، وصمّم stateless من أول يوم عشان horizontal يبقى متاح. والقاعدة بالذات: vertical، و read replicas، و cache، والـ sharding آخر حل.`,
          lines: [
            "horizontal: من ٢ لـ ١٠ نسخ حسب الضغط.",
            "vertical: القاعدة على سيرفر أكبر (فيه توقف قصير، وبيتحاسب أكتر)."
          ],
          sol: R`مثال لتطبيق Express عادي، التلات حاجات اللي غالبًا هتمنعه يشتغل على نسختين:

١. الـ sessions في الذاكرة ([[express-session]] من غير store): اليوزر يسجّل دخول على نسخة، والطلب التاني يروح للتانية فيطلع خارج. جرّبتها بنسختين ورا Nginx والنتيجة إن طلبات راحت للنسخة التانية ورجعت [[NOT LOGGED IN]]. الحل Redis store أو JWT.
٢. الملفات المرفوعة على الديسك ([[multer]] على [[uploads/]]): الملف موجود على نسخة واحدة، فصورة البروفايل تظهر مرة وتختفي مرة. الحل S3 أو R2.
٣. cron جوه التطبيق ([[node-cron]]): الإيميل اليومي يتبعت مرتين. الحل scheduler واحد (EventBridge أو worker منفصل أو lock في Redis).

والرابعة لو فيه: WebSockets مع Socket.IO، رسالة يوزر على نسخة مش بتوصل ليوزر على التانية من غير Redis adapter. الإجابة الكويسة في الانترفيو بتربط: «عشان كده بكبّر vertical الأول لأنه مش محتاج تغيير، بس بصمّم stateless من الأول عشان الـ horizontal يبقى متاح».`
        },
        {
          cmd: "blue-green vs canary",
          title: "إزاي تنزّل نسخة جديدة من غير ما توقّع الموقع؟ (How do blue/green and canary releases differ?)",
          desc: R`rolling بيبدّل النسخ واحدة واحدة، وده الافتراضي في ECS و Kubernetes. blue-green معناه بيئتين كاملتين: blue شغالة، وبتنزّل green جنبها وتختبرها، وبعدين تحوّل كل الترافيك مرة واحدة من الـ load balancer أو الـ DNS، والرجوع لحظي لأن blue لسه موجودة، بس بيكلف ضعف الموارد وقت التبديل.

canary معناه تبعت نسبة صغيرة (١ أو ٥ أو ١٠٪) للنسخة الجديدة، وتراقب الأخطاء والـ latency، وتزوّد تدريجي، ولو الأرقام وحشة ترجّع؛ المشكلة بتأثر على جزء صغير بس، بس محتاج مراقبة كويسة وأتمتة. وفي الاتنين قاعدة البيانات هي الصعبة: الـ migrations لازم تبقى backward compatible عشان النسختين يشتغلوا على نفس الـ schema (expand ثم contract).`,
          example: R`aws lambda update-alias --function-name hello --name live --function-version 6 --routing-config '{"AdditionalVersionWeights":{"7":0.1}}'
aws lambda update-alias --function-name hello --name live --function-version 7 --routing-config '{"AdditionalVersionWeights":{}}'`,
          try: "لو عندك Nginx، اعمل blue-green بـ upstream بيتبدّل (تاب Nginx: blue-green). ولو Lambda، جرّب الـ alias بالأوامر دي وشوف النسبة في اللوجات.",
          deep: {
            why: "كل deploy خطر، والسؤال بيختبر إنك بتقلل الخطر ده بتصميم مش بالدعاء: تقدر ترجع بسرعة، والمشكلة متأثرش على الكل.",
            how: R`الأدوات على AWS: ALB بـ weighted target groups، و Route 53 weighted records (أبطأ بسبب الـ DNS caching)، و ECS بقى فيه blue/green جاهز، و Lambda aliases بأوزان زي المثال. وفي k8s: Argo Rollouts أو Flagger.

expand/contract: عشان تمسح عمود من غير توقف، deploy أول بيبطّل يقرا العمود، وبعده migration تمسحه. وعشان تغيّر اسمه: عمود جديد، واكتب في الاتنين، وانقل الداتا، واقرا من الجديد، وبعدين امسح القديم.

و feature flags بديل أو مكمّل: الكود الجديد بينزل مقفول وبتفتحه لنسبة من اليوزرز، فتفصل الـ deploy عن الـ release.`,
            when: "إزاي تعمل migration تمسح عمود من غير توقف؟ الفرق بين canary و feature flag؟ تعرف إن الـ canary فشل إزاي؟ canary و A/B testing نفس الحاجة؟",
            mistakes: "إن blue-green بيحل مشكلة الـ migrations لوحده. أو canary من غير مراقبة ولا مقارنة بالنسخة القديمة. أو الخلط بين canary (أمان الـ deploy) و A/B testing (تجربة منتج)."
          },
          teach: R`## الفكرة: alias بيوزّع الترافيك على نسختين بنسبة

في Lambda كل [[publish-version]] بيعمل نسخة ثابتة برقم (6، 7...). والـ alias (هنا [[live]]) اسم بيشاور على نسخة، والعميل بينادي [[hello:live]] مش رقم. فالـ canary: الـ alias يشاور على 6، ويبعت جزء صغير لـ 7.

الأوامر من الـ docs: جرّبناها على LocalStack 4.9، و [[create-alias]] اشتغل، بس [[update-alias]] بالـ [[--routing-config]] وقع بخطأ داخلي في المحاكي نفسه ([[InternalError]] ... [[_create_routing_config_model() missing 1 required positional argument]]).

---

## ١. ابدأ الـ canary

~~~bash
aws lambda update-alias --function-name hello --name live --function-version 6 --routing-config '{"AdditionalVersionWeights":{"7":0.1}}'
~~~

| الحتة | معناها |
|---|---|
| [[--name live]] | الـ alias |
| [[--function-version 6]] | النسخة الأساسية |
| [[--routing-config '...']] | JSON بين [[' ']] عشان الـ shell ميلمسش الـ [[{ }]] والـ [[" "]] |
| [[AdditionalVersionWeights]] | نسخ إضافية ووزن كل واحدة |
| [[{"7":0.1}]] | النسخة 7 تاخد ١٠٪، والـ ٩٠٪ الباقيين لـ 6 |

---

## ٢. خلّص: كل الترافيك للجديدة

~~~bash
aws lambda update-alias --function-name hello --name live --function-version 7 --routing-config '{"AdditionalVersionWeights":{}}'
~~~

الأساسية بقت 7، و [[{}]] فاضي = مفيش نسخ إضافية. والرجوع نفس الأمر بـ [[--function-version 6]]: لحظي، لأن 6 لسه موجودة.

---

## ٣. الحل: تعدّ النسب

~~~bash
for i in $(seq 1 20); do aws lambda invoke --function-name hello:live --query ExecutedVersion --output text /dev/null; done | sort | uniq -c
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[seq 1 20]] | ١ لـ ٢٠ |
| [[--function-name hello:live]] | نادي الـ alias. من غير [[:live]] بتنادي [[$LATEST]] ومفيش تقسيم |
| [[--query ExecutedVersion]] | من الرد: أنهي نسخة اتنفذت فعلًا |
| [[/dev/null]] | الملف اللي [[invoke]] بيكتب فيه رد الدالة نفسه، واحنا مش محتاجينه |
| [[sort]] وبعدها [[uniq -c]] | رتّب وعدّ كل قيمة |

الشكل المتوقع (من الـ docs): حوالي [[18 6]] و [[2 7]]، والنسبة بتظبط مع طلبات أكتر.

---

## ٤. المقارنة اللي هتتسأل فيها

| | rolling | blue-green | canary |
|---|---|---|---|
| إزاي | تبدّل النسخ واحدة واحدة | بيئة كاملة جنب القديمة وتحويل مرة واحدة | نسبة صغيرة وتزوّد |
| الرجوع | rolling تاني | لحظي | لحظي |
| التكلفة | عادي | ضعف الموارد وقت التبديل | نسخة زيادة |
| مين يتأثر بالـ bug | كل اللي وصلوا للجديدة | الكل بعد التحويل | النسبة الصغيرة بس |

وفي الكل: الـ migration لازم backward compatible (expand ثم contract)، لأن النسختين شغالين على نفس الـ schema.

---

## الخلاصة

canary = وزن صغير للجديدة + مراقبة + شرط رجوع. من غير المراقبة والشرط، ده deploy بطيء وخلاص.`,
          lines: [
            "canary: ٩٠٪ للنسخة 6 و ١٠٪ للنسخة 7.",
            "الأرقام كويسة؟ كل الترافيك لـ 7."
          ],
          sol: R`مع Lambda: الأمر الأول بيرجّع [[RoutingConfig]] فيه [[AdditionalVersionWeights: {"7": 0.1}]]. لو ناديت [[hello:live]] كذا مرة بـ [[aws lambda invoke]]، الرد فيه [[ExecutedVersion]] بـ [[6]] في حوالي ٩ من ١٠ مرات و [[7]] في الباقي (النسبة تقريبية وبتظهر مع عدد طلبات كبير). وفي CloudWatch Logs أسماء الـ log streams فيها رقم النسخة زي [[2026/09/29/[7]abc...]]، فتقدر تشوف النسبة وتفلتر أخطاء النسخة الجديدة لوحدها. الأمر التاني بيحوّل كل الترافيك لـ 7 ويفضّي الأوزان.

مع Nginx: blue-green معناه upstream بيشاور على [[blue]]، تشغّل [[green]] جنبه وتجرّبه مباشرة، وتغيّر الـ upstream وتعمل [[nginx -s reload]]، فالتحويل لحظي والرجوع نفس الخطوة بالعكس.

الغلطة الشائعة: تنادي [[--function-name hello]] من غير [[:live]] فكل الطلبات تروح [[$LATEST]] ومتشوفش أي تقسيم. وتانية: الـ canary من غير مراقبة ولا شرط رجوع، فبقى مجرد deploy بطيء. الإجابة القوية بتقول الشرط: «لو الأخطاء في النسخة الجديدة زادت عن كذا خلال ١٠ دقايق، رجوع أوتوماتيك».`,
          solCode: R`for i in $(seq 1 20); do aws lambda invoke --function-name hello:live --query ExecutedVersion --output text /dev/null; done | sort | uniq -c`
        },
        {
          cmd: "orchestration",
          title: "Kubernetes بيحل مشكلة إيه؟ وإمتى متستخدموش؟ (What problem does Kubernetes solve?)",
          desc: R`Kubernetes هو container orchestrator: بتوصف الحالة اللي عايزها بـ YAML (كام نسخة، وأنهي image، وكام CPU ورام، وإزاي توصلها)، وهو بيفضل يخلّي الواقع يطابقها. بيوزّع الـ containers على السيرفرات، ويعيد تشغيل اللي بيقع، ويشيل اللي بيفشل في الـ health check من الترافيك، ويعمل rolling updates و rollback، و service discovery و load balancing داخلي، و autoscaling، وإدارة إعدادات وأسرار.

قيمته الحقيقية لما يبقى عندك خدمات كتير وفرق كتير ومحتاجين منصة موحدة. ومش بستخدمه لمشروع صغير أو فريق من ٢ أو ٣ لأنه بيضيف تعقيد تشغيلي كبير؛ هناك Docker Compose على VPS أو ECS Fargate أو PaaS أنسب.`,
          example: R`kubectl scale deployment/api --replicas=5
kubectl rollout undo deployment/api`,
          try: "اشرح بصوت عالي الفرق بين Pod و Deployment و Service في ٣ جمل، وبعدين قول ليه مش هتستخدم k8s لآخر مشروع عملته.",
          deep: {
            why: "بيختبر إنك فاهم المشكلة اللي الأداة بتحلها، مش بس إنك سمعت اسمها، وإنك عندك حكم تقول «مش محتاجينها».",
            how: R`الـ control plane فيه API server، و etcd (بيخزّن الحالة المطلوبة)، و scheduler (بيختار node لكل pod)، و controllers (بتلف تقارن المطلوب بالموجود وتصلّح). وعلى كل node فيه kubelet بيشغّل الـ containers فعلًا عن طريق containerd.

الـ Pod مؤقت، والـ Deployment بيدير نسخ متشابهة، والـ Service اسم ثابت قدامهم، و Ingress أو Gateway API للدخول من برا. والـ StatefulSet للحاجات اللي ليها هوية وديسك ثابت زي قواعد البيانات.`,
            when: "Pod و Deployment و Service الفرق إيه؟ liveness و readiness؟ StatefulSet؟ الـ autoscaling (HPA) بيشتغل إزاي؟ الفرق بينه وبين ECS أو Docker Swarm؟",
            mistakes: "إن k8s هو اللي بيشغّل الـ containers نفسها (ده containerd تحت). أو إنه ضروري لأي microservices. أو إن الـ Secret فيه متشفّر."
          },
          teach: R`## الفكرة: انت بتقول «عايز إيه»، و k8s بيفضل يصلّح الواقع

الأمرين في المثال أمثلة على الفكرة دي: [[scale]] بيغيّر «العدد المطلوب»، و [[rollout undo]] بيرجّع «النسخة المطلوبة»، وفي الحالتين k8s هو اللي بيعمل الشغل. الأوامر نفسها اتجرّبت في دروس «Kubernetes: الأساسيات» (تاب cloud) على kind، وهنا الشرح للإجابة.

---

## ١. [[kubectl scale deployment/api --replicas=5]]

| الحتة | معناها |
|---|---|
| [[deployment/api]] | النوع/الاسم: الـ Deployment اللي اسمه [[api]] |
| [[--replicas=5]] | عايز ٥ pods |

k8s بيقارن: موجود ٣، مطلوب ٥، فيعمل ٢ ويوزّعهم على الـ nodes. ولو node وقع وراح معاه pod، نفس الـ controller يلاحظ إن الموجود ٤ ويعمل واحد. ده الـ reconciliation loop.

> [[scale]] بإيدك بيضيع لو حد عمل [[kubectl apply]] لملف YAML فيه [[replicas: 3]]. المصدر الحقيقي هو الملف (أو HPA).

---

## ٢. [[kubectl rollout undo deployment/api]]

كل تغيير في الـ template (image جديدة مثلًا) بيعمل ReplicaSet جديد، والقديم بيفضل محفوظ بصفر pods. [[undo]] بيرجّع الـ template للنسخة اللي قبلها، فـ k8s يعمل rolling update عكسي.

---

## ٣. القطع اللي هتتسأل عنها

| القطعة | دورها |
|---|---|
| API server | كل الأوامر بتروحله |
| etcd | قاعدة بيانات بتخزّن الحالة المطلوبة |
| scheduler | يختار node لكل pod جديد |
| controllers | لفّة دايمة: المطلوب = الموجود؟ لو لأ صلّح |
| kubelet | على كل node: يشغّل الـ containers فعلًا عن طريق containerd |
| Pod | container أو أكتر بـ IP واحد. مؤقت |
| Deployment | «عايز N نسخة من الـ pod ده» + rolling update |
| Service | اسم وعنوان ثابت قدام pods بالـ labels |

---

## الخلاصة

| السؤال | الإجابة القصيرة |
|---|---|
| بيحل إيه؟ | تشغيل containers كتير على سيرفرات كتير، وإصلاح نفسه، و deploy من غير توقف |
| إمتى لأ؟ | فريق صغير وخدمات قليلة: Compose على VPS أو ECS Fargate أو PaaS |
| التمن | control plane، و YAML، و ingress، وتحديثات الـ cluster نفسه |`,
          lines: [
            "عايز ٥ نسخ: k8s يوزّعهم على السيرفرات.",
            "رجّع النسخة اللي قبلها."
          ],
          sol: R`إجابة نموذجية في ٣ جمل: «الـ Pod أصغر وحدة، container أو أكتر بيشتغلوا مع بعض وليهم IP، وهو مؤقت ممكن يموت ويتعمل غيره باسم وعنوان جديد. الـ Deployment بيقول عايز كام نسخة من Pod معين وبأنهي image، ويفضل يصلّح الواقع عشان يطابق، ويعمل rolling update و rollback. الـ Service اسم وعنوان ثابت قدام مجموعة Pods بالـ labels، وبيوزّع عليهم، فالتطبيق بيكلّم [[api]] مش IP بيتغير.»

وليه مش لآخر مشروع (مثال): «مشروع فيه API وقاعدة بيانات وفريق من ٢. k8s هيضيف control plane أدفع فيه أو أديره، و YAML و ingress وشهادات وتحديثات للـ cluster نفسه، عشان مشاكل أنا معنديش: خدمات كتير وفرق كتير. Docker Compose على VPS أو PaaS أو ECS Fargate كان كفاية.»

الغلطة الشائعة: تقول إن الـ Service هو اللي «بيشغّل» الـ pods (ده الـ Deployment)، أو تقول إن k8s «أحسن» من غير ما تقول إمتى. الانترفيوير عايز يسمع التكلفة التشغيلية، مش قايمة مميزات.`
        },
        {
          cmd: "SLO vs SLA",
          title: "الفرق بين SLI و SLO و SLA؟ (What are SLIs, SLOs and SLAs?)",
          desc: R`الـ SLI هو المقياس نفسه من ناحية اليوزر، زي نسبة الطلبات الناجحة أو نسبة الطلبات الأسرع من ٣٠٠ مللي. الـ SLO هو الهدف الداخلي للمقياس ده، زي ٩٩.٩٪ في ٣٠ يوم. والـ SLA عقد مع العميل فيه وعد وتبعات لو اتكسر، زي تعويض أو خصم، وبيبقى أقل من الـ SLO عشان يبقى فيه هامش.

والفرق بين ١٠٠٪ والـ SLO اسمه error budget: لو فاضل منه بنتحرك بسرعة ونعمل deploys، ولو خلص بنوقف الـ features ونركّز على الاستقرار. والإنذار بيبقى على سرعة صرف الميزانية، مش على كل خطأ.`,
          example: R`(30 * 24 * 60 * (1 - 0.999)).toFixed(1); // "43.2"`,
          try: "احسب الـ error budget بالدقايق لـ ٩٩.٥٪ و ٩٩.٩٥٪، وقول لكل واحد: ده محتاج إيه في البنية؟",
          flag: "script",
          deep: {
            why: "بيختبر إنك بتفكر في الاعتمادية كرقم وقرار، مش إحساس ولا «عايزينه ١٠٠٪».",
            how: R`كل ٩ زيادة بتقلل الميزانية ١٠ مرات: ٩٩٪ حوالي ٧ ساعات في الشهر، و ٩٩.٩٪ حوالي ٤٣ دقيقة، و ٩٩.٩٩٪ حوالي ٤ دقايق. والـ SLO لازم يبقى أقل من اعتمادية اللي انت معتمد عليه.

القياس: من لوجات الـ load balancer، أو من الـ metrics في التطبيق، أو synthetic checks من برا. والإنذار بـ burn rate: لو بنصرف الميزانية بسرعة تخلّصها في يومين، صحّي حد دلوقتي.`,
            when: "تختار الـ SLO إزاي؟ لو الـ error budget خلص تعمل إيه؟ تقيس الـ SLI منين؟ ٩٩.٩٩٪ محتاجة إيه؟",
            mistakes: "إن الـ SLA هو الهدف الداخلي. أو SLO بـ ١٠٠٪. أو SLI على CPU أو uptime السيرفر بدل تجربة اليوزر."
          },
          teach: R`## الفكرة: ٣ كلمات، كل واحدة بتجاوب سؤال مختلف

| الكلمة | السؤال | مثال |
|---|---|---|
| SLI | بنقيس إيه؟ | نسبة الطلبات اللي نجحت |
| SLO | الهدف كام؟ (داخلي) | ٩٩.٩٪ في ٣٠ يوم |
| SLA | وعدنا العميل بكام؟ (عقد بتعويض) | ٩٩.٥٪، ولو أقل خصم ١٠٪ |

الـ SLA أقل من الـ SLO عشان الـ SLO ينبّهك قبل ما تدفع.

---

## ١. السطر

~~~js
(30 * 24 * 60 * (1 - 0.999)).toFixed(1); // "43.2"
~~~

اتشغّل في Node 24:

~~~text الناتج
"43.2"
~~~

- [[30 * 24 * 60]] = ٤٣٢٠٠ دقيقة في ٣٠ يوم.
- [[1 - 0.999]] = الجزء المسموح يفشل (٠.١٪).
- [[.toFixed(1)]] رقم عشري واحد، والناتج **نص** (عشان كده بين [[" "]]).

---

## ٢. الحل: هدفين تانيين

~~~js
for (const slo of [0.995, 0.9995]) console.log(slo, (30 * 24 * 60 * (1 - slo)).toFixed(1));
~~~

~~~text الناتج
0.995 216.0
0.9995 21.6
~~~

| الهدف | الميزانية في ٣٠ يوم | محتاج إيه |
|---|---|---|
| ٩٩.٥٪ | ٢١٦ دقيقة (٣.٦ ساعة) | سيرفر كويس، وباك أب، ومراقبة |
| ٩٩.٩٪ | ٤٣.٢ دقيقة | deploy من غير توقف، وإنذارات |
| ٩٩.٩٥٪ | ٢١.٦ دقيقة | نسختين في AZين، و Multi-AZ، و rollback في دقايق |

ولو حسبت على سنة: [[365 * 24 * 60 * (1 - 0.999)]] = [[525.6]] دقيقة. متقارنش رقم سنة برقم شهر.

---

## الخلاصة

SLI = المقياس، و SLO = الهدف الداخلي، و SLA = العقد. والـ error budget = ١ − SLO: لو فاضل نتحرك، ولو خلص نوقف الـ features. والإنذار على سرعة صرفه (burn rate).`,
          lines: [
            "ميزانية ٩٩.٩٪ في ٣٠ يوم: ٤٣.٢ دقيقة."
          ],
          sol: R`الحسبة لـ ٣٠ يوم: ٩٩.٥٪ = [[216.0]] دقيقة (حوالي ٣.٦ ساعة)، و ٩٩.٩٥٪ = [[21.6]] دقيقة.

٩٩.٥٪: سيرفر واحد كويس مع باك أب ومراقبة ممكن يوصلها، حتى لو فيه deploy بيوقف دقيقة كل مرة، ومشكلة كبيرة واحدة في الشهر ممكن تتحل في ساعتين. ٩٩.٩٥٪: ٢١ دقيقة في الشهر كله، يعني مفيش مكان لـ downtime في الـ deploy (rolling أو blue-green)، ونسختين على الأقل في AZين، وقاعدة Multi-AZ، وإنذار أوتوماتيك وحد يرد في دقايق، و rollback في أقل من ٥ دقايق. الفرق بين الرقمين مش ٠.٤٥٪، ده ١٠ أضعاف الشغل والتكلفة تقريبًا.

الغلطة الشائعة: تحسب على ٣٦٥ يوم وتقارن بأرقام على ٣٠ يوم. أو تقول SLA و SLO حاجة واحدة: الـ SLA عقد فيه تعويض، وبيبقى أقل من الـ SLO الداخلي عشان يبقى فيه هامش.`,
          solCode: R`for (const slo of [0.995, 0.9995]) console.log(slo, (30 * 24 * 60 * (1 - slo)).toFixed(1));
// 0.995 216.0
// 0.9995 21.6`
        },
        {
          cmd: "rightsize + commit + clean",
          title: "فاتورة الـ cloud زادت الضعف: هتعمل إيه؟ (How would you cut a cloud bill?)",
          desc: R`أول حاجة أقيس قبل ما أقطع: Cost Explorer مقسّم بالخدمة والـ usage type والـ tags، عشان أعرف الفلوس رايحة فين وإيه اللي زاد. بعدين السهل: موارد منسية زي volumes و Elastic IPs و snapshots وبيئات تجربة، ولوجات من غير retention. وبعدها right-sizing من أرقام الاستخدام الحقيقية، و Graviton، وإطفاء dev و staging بالليل، و S3 lifecycle أو Intelligent-Tiering.

وبعد ما الاستخدام يستقر: Savings Plans للحد الأدنى الثابت و Spot للشغل اللي يستحمل. وأبص على الشبكة: NAT Gateway والـ egress والنقل بين الـ AZs، وحلول زي VPC endpoints و CloudFront. وفي الآخر أمنع الرجوع: budgets، و anomaly detection، و tags إجبارية.`,
          example: R`aws ce get-cost-and-usage --time-period Start=2026-08-01,End=2026-09-01 --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=USAGE_TYPE`,
          try: "خد فاتورة أي حساب عندك واعمل جدول: أكبر ٥ بنود، وسبب كل واحد، وخطوة تقلله.",
          deep: {
            why: "بيختبر إنك بتتعامل مع التكلفة كهندسة: قياس، ثم أولويات، ثم منع الرجوع، مش «هنصغّر السيرفرات وخلاص».",
            how: R`الترتيب مقصود: المسح والتنضيف مفيهمش أي مخاطرة. الـ right-sizing محتاج أرقام وأسابيع مراقبة. والالتزام (Savings Plans) آخر حاجة، لأنك لو التزمت على استخدام هتقلله بعدين هتدفع على حاجة مش بتستخدمها.

والبنود المخفية: NAT Gateway (بالساعة والجيجا)، و public IPv4، والنقل بين الـ AZs، وCloudWatch Logs من غير retention، والـ snapshots القديمة. و Cost Anomaly Detection بينبّه لما بند يقفز فجأة.`,
            when: "Savings Plans ولا Reserved Instances؟ Spot مناسب لإيه؟ ليه NAT Gateway غالي؟ تعرف كل فريق صرف كام إزاي؟",
            mistakes: "تبدأ بشراء Savings Plans قبل ما تنضّف. أو تصغّر من غير أرقام فالتطبيق يبطأ أو يقع. أو تنسى الـ egress والـ NAT."
          },
          teach: R`## الفكرة: قيس، نضّف، صغّر، التزم، امنع الرجوع. بالترتيب ده

السطر الوحيد في المثال هو خطوة «قيس». وكل الخطوات اللي بعده بتعتمد على اللي هيطلع منه. الأمر من الـ docs: Cost Explorer مش موجود في LocalStack المجاني. وشرحه الكامل (والـ [[sort]] اللي بيرتّب البنود) في درس «cost optimization» فوق.

---

## ١. السطر

~~~bash
aws ce get-cost-and-usage --time-period Start=2026-08-01,End=2026-09-01 --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=USAGE_TYPE
~~~

| الحتة | معناها |
|---|---|
| [[Start=2026-08-01,End=2026-09-01]] | أغسطس كله. الـ [[End]] مش داخل، فأول سبتمبر = لحد آخر أغسطس |
| [[MONTHLY]] | رقم واحد للشهر |
| [[UnblendedCost]] | التكلفة الفعلية لكل بند |
| [[Key=USAGE_TYPE]] | مش بالخدمة: بنوع الاستخدام. «EC2» بيتفك لسيرفرات و NAT و IPs و ديسكات |

ليه USAGE_TYPE؟ لأن بند «EC2-Other» الكبير لوحده مبيقولكش حاجة. جواه بنود زي [[NatGateway-Hours]] و [[PublicIPv4:InUseAddress]] و [[EBS:VolumeUsage]]، وكل واحد ليه حل مختلف.

---

## ٢. الترتيب وليه

| # | الخطوة | المخاطرة |
|---|---|---|
| ١ | قيس بالـ usage type والـ tags | صفر |
| ٢ | امسح المنسي (volumes و IPs و snapshots وبيئات تجربة) و retention للوجات | تقريبًا صفر |
| ٣ | right-size من أرقام أسابيع، و Graviton، وإطفاء dev بالليل | محتاج أرقام |
| ٤ | Savings Plans للحد الأدنى الثابت، و Spot للشغل اللي يستحمل | التزام سنة أو ٣ |
| ٥ | budgets، و anomaly detection، و tags إجبارية | صفر |

الالتزام آخر حاجة: لو التزمت على استخدام هتقلله في خطوة ٢ أو ٣، هتدفع على حاجة مش بتستخدمها.

---

## الخلاصة

الإجابة القوية بتبدأ بـ «هقيس الأول بالـ usage type»، وتقول البنود المخفية بالاسم: NAT Gateway، و public IPv4، والنقل بين الـ AZs، واللوجات من غير retention.`,
          lines: [
            "التكلفة مقسومة بنوع الاستخدام: هنا بيبان NatGateway و DataTransfer-Out وغيرهم."
          ],
          sol: R`جدول نموذجي لحساب صغير فيه تجارب (الأرقام مثال، بنودك هتختلف):

١. EC2 (t3.medium شغال ٢٤ ساعة، الاستخدام ٥٪): اختاروه «احتياطي». الخطوة: t4g.small (Graviton) أو إطفاء بالليل لو dev.
٢. NAT Gateway: private subnets من قالب جاهز. الخطوة: VPC endpoint لـ S3 و ECR، أو public subnet لبيئة dev.
٣. RDS Multi-AZ لقاعدة staging: حد نسخ إعدادات الإنتاج. الخطوة: single-AZ لـ staging.
٤. Public IPv4 و Elastic IPs مش مربوطة: بقايا تجارب. الخطوة: امسحها (درس «امسح اللي مش مستخدم»).
٥. CloudWatch Logs: log groups من غير retention بقالها سنة. الخطوة: [[put-retention-policy]] بـ ٣٠ يوم.

الإجابة في الانترفيو بتمشي بنفس ترتيب الجدول: أقيس (usage type، مش الخدمة بس)، أنضّف المنسي، أصغّر، وبعد ما الاستخدام يستقر Savings Plans، وفي الآخر أمنع الرجوع (budgets و anomaly detection و tags). الغلطة الشائعة: تبدأ بـ «هشتري Reserved Instances» قبل ما تعرف إن نص الفاتورة موارد منسية.`
        },
        {
          cmd: "stateless",
          title: "ليه التطبيق لازم ميحتفظش بحاجة جواه عشان يكبر؟ (Why should app servers keep no local state?)",
          desc: R`معناها إن أي نسخة من التطبيق تقدر ترد على أي طلب، لأن مفيش حاجة مهمة محفوظة جوه النسخة نفسها: الـ sessions في Redis أو قاعدة البيانات أو JWT، والملفات المرفوعة في S3 مش على الديسك، والكاش المشترك في Redis، والمهام المجدولة شغالة من مكان واحد مش على كل نسخة.

ده اللي بيخلّيني أزوّد نسخ ورا load balancer، وأبدّل أي نسخة بايظة أو أعمل deploy من غير ما اليوزر يخرج، وأشغّل autoscaling. والـ state مش بيختفي، بيتنقل لخدمات متخصصة ومُدارة.`,
          example: R`app.use(session({ store: new RedisStore({ client: redis }), secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));`,
          try: "شغّل تطبيقك نسختين ورا Nginx (upstream بسيرفرين)، وسجّل دخول، واعمل refresh كذا مرة. لو خرجت، التطبيق مش stateless.",
          flag: "script",
          deep: {
            why: "بيختبر إنك فاهم الشرط الأساسي لأي scaling أو high availability، وإن المشكلة في التصميم مش في عدد السيرفرات.",
            how: R`الحاجات اللي بتكسر الـ stateless وناس كتير مش واخدة بالها منها: sessions في الرام (الـ default في express-session)، وملفات مرفوعة على الديسك، وكاش في الرام بيختلف من نسخة للتانية، و cron جوه التطبيق بيشتغل مرة على كل نسخة (الإيميل بيتبعت ٣ مرات)، و WebSockets متوصلة بنسخة معينة.

الحلول: store خارجي للـ sessions، و S3 للملفات، و Redis للكاش المشترك، و scheduler واحد (EventBridge أو cron على worker واحد أو lock في Redis)، و pub/sub للـ WebSockets.`,
            when: "WebSockets إزاي؟ sticky sessions ليه مش حل؟ الـ cron مع ٣ نسخ؟ JWT ولا sessions؟",
            mistakes: "إن stateless يعني مفيش قاعدة بيانات. أو sticky sessions كحل نهائي. أو نسيان الـ cron والكاش المحلي."
          },
          teach: R`## الفكرة: الـ session تتخزن برّه السيرفر، فأي نسخة تعرف اليوزر

السطر بيقول لـ [[express-session]]: «متحفظش الـ sessions في رام الـ process، احفظها في Redis». اتجرّب الحل بالظبط: نسختين من التطبيق (بورت 4101 و 4102) في container [[node:22-slim]]، ورا Nginx 1.31 بـ upstream فيه الاتنين، مرة بالـ sessions في الرام ومرة في Redis 7 ([[connect-redis]] 10 و [[redis]] 6).

---

## ١. السطر

~~~js
app.use(session({ store: new RedisStore({ client: redis }), secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
~~~

| الخانة | معناها |
|---|---|
| [[store: new RedisStore({ client: redis })]] | المكان اللي الـ sessions بتتحفظ فيه. [[redis]] client متوصل قبل كده |
| [[secret]] | المفتاح اللي بيوقّع الـ cookie. لازم **نفس** القيمة في كل النسخ، وإلا نسخة مش هتقبل cookie نسخة تانية |
| [[resave: false]] | متكتبش الـ session تاني لو متغيرتش |
| [[saveUninitialized: false]] | متعملش session لزائر لسه مخزّنش فيه حاجة |

والـ imports في [[connect-redis]] الحالية:

~~~js
import { RedisStore } from "connect-redis";
import { createClient } from "redis";
const redis = createClient({ url: "redis://localhost:6379" });
await redis.connect();
~~~

---

## ٢. التجربة: من غير store (الرام)

~~~bash
curl -s -c jar -b jar localhost:8088/login
for i in $(seq 20); do curl -s -c jar -b jar localhost:8088/me; done | sort | uniq -c
~~~

[[-c jar]] احفظ الـ cookies في ملف [[jar]]، و [[-b jar]] ابعتها. يعني [[curl]] بيتصرف زي متصفح.

~~~text الناتج
logged in on 4101
     15 4101: ali
      5 4102: NOT LOGGED IN
~~~

سجّلنا دخول على 4101. أي طلب راح 4102 معاه نفس الـ cookie، بس 4102 مش لاقي الـ session في رامه. ليه مش بالتبادل بالظبط؟ Nginx كان شغال بـ ١٦ worker، وكل واحد ليه عدّاد round robin لوحده.

---

## ٣. مع Redis

~~~text الناتج
logged in on 4101
     17 4101: ali
      3 4102: ali
~~~

٢٠ من ٢٠ عارفين اليوزر، مهما النسخة. وفي Redis:

~~~text redis-cli --scan --pattern 'sess:*'
sess:v3gZVainSYrzy-S-8utsDX4yBvSh4V-m
~~~

الـ session بقت مفتاح في Redis ([[sess:]] + الـ id اللي في الـ cookie)، والنسختين بيقروا منه.

> وقعنا في حاجة جانبية وقت التجربة: Nginx بيحوّل اسم الـ upstream لـ IP **مرة واحدة** وهو بيقوم. لما قومنا container التطبيق من جديد بـ IP جديد، Nginx فضل يكلّم القديم ورجّع 502 لحد ما اتعمله restart. نفس فكرة الـ DNS caching في درس HA.

---

## الخلاصة

| اللي جوه النسخة | يروح فين |
|---|---|
| sessions | Redis أو القاعدة، أو JWT |
| ملفات مرفوعة | S3 |
| كاش مشترك | Redis |
| cron | scheduler واحد أو lock |
| WebSockets | pub/sub (Redis adapter) |

stateless مش معناه مفيش state. معناه الـ state مش جوه النسخة.`,
          lines: [
            "الـ sessions في Redis مش في رام السيرفر، فأي نسخة تعرف اليوزر."
          ],
          sol: R`بالكود اللي تحت (sessions في الذاكرة) ونسختين ورا Nginx، جرّبتها فعلًا والناتج كان:

[[logged in on 4101]]
[[4101: ali]] (٣ مرات)
[[4102: NOT LOGGED IN]]

يعني بعد تسجيل الدخول، أي طلب راح للنسخة التانية طلع خارج. التوزيع مش شرط يبقى بالتبادل بالظبط (كل worker في Nginx ليه عدّاد round robin لوحده)، بس مع كذا refresh هيحصل. ده الإثبات إن التطبيق مش stateless.

الحل: store خارجي ([[connect-redis]] مع Redis) زي سطر الدرس، وبعدها كل الطلبات ترجع [[ali]] مهما النسخة. الغلطة الشائعة: تحل المشكلة بـ [[ip_hash]] أو sticky sessions في Nginx؛ الأعراض تختفي، بس أول ما نسخة تقع أو تعمل deploy، كل اليوزرز اللي عليها يخرجوا، والتوزيع يبقى مش عادل.`,
          solCode: R`// sess.mjs  (PORT=4101 node sess.mjs & PORT=4102 node sess.mjs &)
import express from "express";
import session from "express-session";
const app = express();
app.use(session({ secret: "dev-secret", resave: false, saveUninitialized: false }));
app.get("/login", (req, res) => { req.session.user = "ali"; res.send("logged in on " + process.env.PORT + "\n"); });
app.get("/me", (req, res) => res.send(process.env.PORT + ": " + (req.session.user ?? "NOT LOGGED IN") + "\n"));
app.listen(process.env.PORT);
# nginx: upstream app { server 127.0.0.1:4101; server 127.0.0.1:4102; }  و  location / { proxy_pass http://app; }
curl -s -c jar -b jar localhost:8088/login
for i in 1 2 3 4; do curl -s -c jar -b jar localhost:8088/me; done`
        },
        {
          cmd: "RPO / RTO",
          title: "لو الـ region كلها وقعت، ترجع إزاي وفي قد إيه؟ (Explain RPO and RTO)",
          desc: R`بعرّف الأول رقمين مع البزنس: RPO، أقصى داتا مقبول تضيع، و RTO، أقصى وقت مقبول لحد ما نرجع، والرقمين دول بيحددوا الاستراتيجية والتكلفة. لو RPO ساعات و RTO يوم، باك أب منتظم منسوخ لـ region وحساب تاني كفاية. لو RPO دقايق، محتاج replication مستمر زي cross-region read replica أو Aurora Global Database.

ولو RTO دقايق، محتاج warm standby أو active-active مع Route 53 failover، والبنية كلها Terraform عشان تتعمل بسرعة. وفي كل الحالات الباك أب بيتختبر دوريًا باسترجاع حقيقي، والـ runbook مكتوب، لأن الـ RTO الحقيقي هو اللي قسته مش اللي افترضته.`,
          try: "لمشروع من مشاريعك: اكتب الـ RPO والـ RTO الحاليين بصراحة (آخر باك أب إمتى؟ والاسترجاع بياخد قد إيه؟)، وبعدين الرقمين اللي المفروض يبقوا.",
          deep: {
            why: "بيختبر إنك بتربط القرار التقني بالبزنس: كام دقيقة وقوع أو كام ساعة داتا الشركة تستحمل تخسر، وكام هتدفع عشان تقلل ده.",
            how: R`الاستراتيجيات من الأرخص للأغلى: backup & restore، ثم pilot light (القاعدة متكررة والباقي يتعمل وقت الحاجة)، ثم warm standby (نسخة صغيرة شغالة)، ثم active-active. كل خطوة بتقلل الـ RTO وبتزوّد التكلفة والتعقيد.

والـ HA غير الـ DR: Multi-AZ بيحميك من وقوع مبنى، مش من مسح داتا ولا من region كاملة. والباك أب لازم يبقى في حساب منفصل كمان، عشان لو الحساب نفسه اتخترق.`,
            when: "الفرق بين HA و DR؟ Multi-AZ كفاية؟ بتختبر الـ DR إزاي؟ الـ DNS failover بياخد قد إيه؟",
            mistakes: "إن Multi-AZ هو الـ DR. أو باك أب في نفس الحساب ونفس الـ region. أو أرقام من غير ما تسأل البزنس."
          },
          teach: R`## الفكرة: رقمين بيحددوا كل حاجة

مفيش كود هنا. الإجابة بتبدأ بتعريف رقمين، وبعدين الرقمين دول بيختاروا الاستراتيجية.

~~~text
          آخر باك أب            الكارثة                 رجعنا
              |                    |                        |
  ------------+--------------------+------------------------+------>  الوقت
              |<----- RPO -------->|<--------- RTO -------->|
               الداتا اللي ضاعت           الوقت وانت واقع
~~~

| الرقم | السؤال | بيتحدد بـ |
|---|---|---|
| RPO (Recovery Point Objective) | أقصى داتا مقبول تضيع؟ | عدد مرات الباك أب أو الـ replication |
| RTO (Recovery Time Objective) | أقصى وقت مقبول لحد ما نرجع؟ | سرعة الاسترجاع وقيام البنية |

---

## ١. الرقمين بيختاروا الاستراتيجية

| الاستراتيجية | RPO | RTO | التكلفة |
|---|---|---|---|
| backup & restore | ساعات (آخر باك أب) | ساعات | الأرخص |
| pilot light | دقايق (القاعدة متكررة) | عشرات الدقايق | أكتر |
| warm standby | ثواني لدقايق | دقايق | أكتر |
| active-active | تقريبًا صفر | تقريبًا صفر | الأغلى والأعقد |

---

## ٢. HA مش DR

| | بيحمي من | مبيحميش من |
|---|---|---|
| Multi-AZ | وقوع مبنى | [[DELETE]] من غير [[WHERE]] (بيتنسخ للـ standby فورًا)، ووقوع region |
| باك أب في نفس الحساب | مسح بالغلط | اختراق الحساب |
| باك أب في حساب و region تانيين | الاتنين | (ده الـ DR) |

---

## ٣. الرقم الحقيقي مش اللي في الورق

الـ RTO اللي بيتحسب هو اللي قسته في استرجاع حقيقي. باك أب يومي على **نفس** الديسك = RPO لانهائي لو الديسك راح.

---

## الخلاصة

اسأل البزنس الأول (ساعة وقوع بتكلف كام؟ يوم طلبات ضايع بيكلف كام؟)، وبعدين اختار الاستراتيجية على قد الرقمين، واختبرها باسترجاع حقيقي.`,
          sol: R`مثال لإجابة صريحة لمشروع صغير على VPS:

الحالي: الباك أب [[pg_dump]] يومي الساعة ٣ الصبح على نفس السيرفر. يعني RPO الحقيقي لحد ٢٤ ساعة، ولو الديسك نفسه راح يبقى RPO لانهائي (الباك أب راح معاه). والـ RTO: عمري ما استرجعت، فمعرفوش؛ التقدير: سيرفر جديد وتسطيب وتنزيل الباك أب ٣ لـ ٤ ساعات.

المفروض: RPO ساعة و RTO ساعتين مثلًا (اسأل: خسارة يوم طلبات تكلف قد إيه؟). ده محتاج: باك أب لـ مكان تاني (S3 أو R2 في حساب منفصل) كل ساعة أو WAL archiving، أو قاعدة مُدارة فيها PITR، وسكربت أو Terraform بيقوّم السيرفر، وتجربة استرجاع حقيقية كل شهر بتقيس الوقت.

الغلطة الشائعة: تكتب RPO = «يوم» لأن الباك أب يومي وتنسى إن الباك أب على نفس الديسك، أو تكتب RTO رقم متخيّل من غير ما تكون جربت استرجاع ولو مرة. والفرق اللي الانترفيوير بيدوّر عليه: Multi-AZ ده HA مش DR، ومبيحميش من [[DELETE]] من غير [[WHERE]].`
        }
      ]
    }
]);

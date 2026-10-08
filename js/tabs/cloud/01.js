// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   teach    اختياري: «الشرح خطوة بخطوة»: markdown صغير (## و ### و ~~~lang عنوان ... ~~~ و جداول | و - و 1. و > و ---). القواعد في README
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
//   check    اختياري: تمرين بيتصحح لوحده في الصفحة
//            JS:  { lang: "js", starter, tests: R`test("..", () => expect(x).toBe(y))`, solution }
//            SQL: { lang: "sql", setup: R`CREATE TABLE ...; INSERT ...`, starter, expect: [[...صفوف]] أو expectSql: R`استعلام مرجعي`, solution, ordered }
//            solution حل مرجعي مش بيظهر، و npm run check بيتأكد إنه بيعدّي الاختبارات. المتاح في tests: test و expect(x).toBe/toEqual/toThrow/toBeTruthy/toBeFalsy
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("cloud", {
  label: "Cloud و DevOps",
  prompt: "$ ",
  lab: R`aws --version
aws configure
aws sts get-caller-identity`,
  labText: "افتح حساب AWS مجاني وفعّل MFA و budget alert من أول يوم (درس في المستوى ١). جرّب على منطقة واحدة وامسح كل حاجة بعد التجربة.",
  levels: {"1":["الأساس","يعني إيه cloud، و IAM، و regions، والتكلفة، و AWS CLI"],"2":["الخدمات","EC2 و S3 و RDS و CloudFront و Lambda و Cloudflare (و R2 و Workers و Tunnel) و Vercel، ومنصات الباك إند: Render و Railway و Fly.io و Coolify"],"3":["DevOps","containers في الـ cloud، و Kubernetes، و Terraform، والمراقبة، و OpenTelemetry والـ tracing، و SRE، وأسئلة الانترفيو"]},
  categories: [
    {
      t: "يعني إيه cloud",
      l: 1,
      n: "بتأجّر كمبيوتر أو خدمة جاهزة بالساعة بدل ما تشتري، والسؤال المهم دايمًا: مين بيدير إيه",
      items: [
        {
          cmd: "IaaS / PaaS / SaaS",
          title: "مين بيدير إيه: السيرفر ولا المنصة ولا الكود بس",
          desc: R`الـ cloud معناه إنك بتأجّر حاجة شغالة في data center حد تاني بيديره وبتدفع على قد استخدامك، والفرق بين أنواعه هو لحد فين AWS مسؤول ومن فين انت مسؤول.

IaaS (زي EC2 أو VPS): بتاخد سيرفر فاضي، وانت اللي بتحدّث النظام وتسطّب وتأمّن. PaaS (زي Vercel أو RDS): بتدّيله الكود أو الإعدادات، والمنصة بتشغّل وتحدّث وتعمل باك أب. SaaS (زي Gmail أو Sentry): برنامج جاهز بتستخدمه. و serverless (زي Lambda): بتكتب دالة، ومفيش سيرفر تشوفه خالص، وبتدفع على كل طلب.

والقاعدة اللي AWS بتسمّيها «shared responsibility»: هما مسؤولين عن أمان الـ cloud نفسه (المباني والأجهزة والشبكة)، وانت مسؤول عن اللي جوه: مين عنده صلاحية، والبيانات مفتوحة ولا لأ، والبورتات، والباسوردات.`,
          example: R`ssh ubuntu@203.0.113.10 "sudo apt update && sudo apt upgrade -y"
aws rds describe-db-instances --query "DBInstances[].[DBInstanceIdentifier,EngineVersion]"
vercel deploy --prod
aws lambda invoke --function-name hello out.json`,
          try: "اكتب كل مشروع عملته قبل كده وحط جنبه: IaaS ولا PaaS ولا serverless؟ وفي كل واحد: مين كان بيحدّث نظام التشغيل؟ ومين كان بيعمل باك أب لقاعدة البيانات؟",
          deep: {
            why: "لما تختار استضافة، انت مش بتختار سعر بس، بتختار كمية الشغل اللي هتفضل عليك. سيرفر رخيص محتاج حد يحدّثه ويراقبه ويعمل باك أب. ومنصة أغلى شوية بتشيل الشغل ده عنك. ولما حاجة تتسرّق أو تقع، لازم تكون عارف مين كان مسؤول.",
            how: R`تخيّل طبقات فوق بعض: مبنى وكهربا، أجهزة، شبكة، virtualization، نظام تشغيل، runtime (Node أو Python)، تطبيقك، بياناتك، والصلاحيات.

في IaaS الـ provider ماسك لحد الـ virtualization، وكل اللي فوق عليك: [[apt upgrade]]، والفايروول، وتسطيب Node، والباك أب. ده اللي بتعمله في تاب VPS.

في PaaS بيمسك كمان نظام التشغيل والـ runtime. في RDS مثلًا AWS بيعمل patch لـ Postgres وباك أب يومي، وانت بتختار النسخة ونافذة الصيانة والباسورد ومين يوصل. في Vercel بتعمل push والمنصة بتبني وتشغّل.

في serverless مفيش حاجة شغالة وانت مش بتستخدمها. الطلب بيجي، AWS بيقوّم بيئة صغيرة، يشغّل دالتك، ويحاسبك بالمللي ثانية. انت مسؤول عن الكود وصلاحياته بس.

وفي كل الأنواع فيه حاجات عمرها ما بتبقى على AWS: البيانات اللي بتحطها، ومين عنده صلاحية عليها، والإعدادات. bucket مفتوح للنت أو قاعدة بيانات باسوردها ضعيف غلطتك انت، مش غلطة AWS.`,
            when: "أول سؤال قبل أي deploy: مين هيحدّث ويراقب ويعمل باك أب؟ لو الإجابة «محدش عنده وقت»، روح لـ PaaS.",
            mistakes: "إنك تفتكر إن «على AWS» معناها «آمن تلقائي». أغلب التسريبات المشهورة كانت bucket مفتوح أو مفتاح اترفع على GitHub، مش اختراق لـ AWS. وإنك تفتكر إن managed معناها مفيش شغل: لسه عليك الصلاحيات والتكلفة والمراقبة."
          },
          teach: R`## الفكرة: ٤ أوامر، كل واحد في نوع

المثال مش خطوات ورا بعض. هو ٤ أوامر، كل واحد بيوريك **انت بتكلّم مين** في نوع من الأنواع: في IaaS بتكلّم نظام التشغيل نفسه، وفي PaaS بتكلّم المنصة، وفي serverless بتكلّم دالة. لو عرفت انت بتكلّم مين، تعرف مين مسؤول عن إيه.

### الاختصارات الأول

| الاختصار | بالإنجليزي | يعني |
|---|---|---|
| IaaS | Infrastructure as a Service | بيأجّرلك «البنية»: سيرفر فاضي وشبكة وديسك |
| PaaS | Platform as a Service | بيأجّرلك «منصة» بتشغّل كودك أو قاعدة بياناتك |
| SaaS | Software as a Service | برنامج جاهز بتستخدمه من المتصفح |
| serverless | من غير سيرفر (تشوفه) | دالة بتصحى مع كل طلب |

---

## ١. IaaS: [[ssh ubuntu@203.0.113.10 "sudo apt update && sudo apt upgrade -y"]]

نفكّه حتة حتة:

| الحتة | معناها |
|---|---|
| [[ssh]] | افتح اتصال مشفّر بترمنال السيرفر (Secure Shell) |
| [[ubuntu@]] | ادخل باليوزر [[ubuntu]]، وده اليوزر الافتراضي في صور Ubuntu على AWS |
| [[203.0.113.10]] | عنوان السيرفر. الرقم ده من رينج محجوز للأمثلة، مش سيرفر حقيقي |
| [["..."]] | الأمر اللي يتنفّذ على السيرفر، مش على جهازك |
| [[sudo]] | بصلاحيات root، لأن تحديث النظام بيغيّر ملفات النظام |
| [[apt update]] | هات قايمة النسخ الجديدة |
| [[&&]] | لو اللي قبلي نجح، كمّل |
| [[apt upgrade -y]] | سطّب التحديثات، و [[-y]] يعني «أيوه» من غير ما يسألك |

الدرس هنا مش الأمر نفسه (ليه شرح كامل في تاب VPS)، الدرس إن **انت** اللي بتكتبه. AWS مش هيحدّث Ubuntu بتاع سيرفرك لوحده أبدًا. لو نسيت شهرين، السيرفر شغال بثغرات معروفة.

---

## ٢. managed (PaaS): [[aws rds describe-db-instances --query ...]]

~~~bash
aws rds describe-db-instances --query "DBInstances[].[DBInstanceIdentifier,EngineVersion]"
~~~

| الحتة | معناها |
|---|---|
| [[aws]] | الـ AWS CLI، البرنامج اللي بيكلّم AWS من الترمنال |
| [[rds]] | الخدمة: RDS (Relational Database Service)، قواعد بيانات مُدارة |
| [[describe-db-instances]] | «اوصفلي قواعد البيانات اللي عندي». [[describe]] في AWS يعني اقرا بس، مش بيغيّر حاجة |
| [[--query]] | خد من الرد الطويل الحتة دي بس (لغة اسمها JMESPath، ليها شرح في درس «الخدمات الأساسية») |
| [[DBInstances[]]] | لف على كل قاعدة في القايمة |
| [[.[DBInstanceIdentifier,EngineVersion]]] | وهات من كل واحدة اسمها ونسخة Postgres |

الناتج حسب الـ docs بيبقى قايمة جوه قايمة، زي:

~~~text الناتج (شكله من الـ docs)
[
    [
        "myapp-db",
        "17.6"
    ]
]
~~~

لاحظ الفرق عن السطر الأول: هنا انت **بتسأل** عن النسخة، مش بتحدّثها. AWS هو اللي بيعمل patch لـ Postgres في نافذة الصيانة. RDS مش موجود في نسخة LocalStack المجانية اللي اتجرّب عليها الدرس، فالشكل ده من الـ docs.

---

## ٣. PaaS كامل: [[vercel deploy --prod]]

| الحتة | معناها |
|---|---|
| [[vercel]] | الـ CLI بتاع Vercel |
| [[deploy]] | ارفع الفولدر الحالي، والمنصة تبني وتشغّل |
| [[--prod]] | على الدومين الأساسي مش رابط preview |

مفيش سيرفر، ولا [[apt]]، ولا Nginx. انت مسؤول عن الكود ومتغيرات البيئة بس. (الأمر من docs بتاعة Vercel، ودرسه في المستوى ٢.)

---

## ٤. serverless: [[aws lambda invoke --function-name hello out.json]]

| الحتة | معناها |
|---|---|
| [[lambda]] | خدمة Lambda: دوال بتشتغل وقت الطلب |
| [[invoke]] | نادِ الدالة دلوقتي |
| [[--function-name hello]] | اسم الدالة |
| [[out.json]] | اكتب اللي الدالة رجّعته في الملف ده |

جرّبناه على LocalStack (محاكي AWS بيشتغل في Docker، بمفاتيح وهمية [[test]]) على دالة الدرس «Lambda handler»:

~~~text الناتج على الشاشة
{
    "StatusCode": 200,
    "ExecutedVersion": "$LATEST"
}
~~~

[[StatusCode: 200]] يعني الدالة اتنادت وخلصت، و [[$LATEST]] يعني آخر نسخة من الكود. واللي الدالة رجّعته نفسه في [[out.json]]، مش على الشاشة:

~~~text cat out.json
{"statusCode":200,"headers":{"content-type":"application/json"},"body":"{\"hello\":\"world\",\"invocations\":5,\"envAgeMs\":84985}"}
~~~

[[world]] لأننا مبعتناش [[name]]، و [[invocations]] بـ 5 لأن نفس البيئة كانت اتنادت ٤ مرات قبلها (الحكاية دي في درس «Lambda handler»). ومفيش أي سيرفر شفته ولا نظام تشغيل تحدّثه. LocalStack كان بيشغّل الدالة في container صغير قام وقت الطلب، وده بالظبط اللي Lambda بتعمله.

---

## مين مسؤول عن إيه

| الطبقة | IaaS (EC2) | PaaS (RDS أو Vercel) | serverless (Lambda) | SaaS (Gmail) |
|---|---|---|---|---|
| المبنى والأجهزة والشبكة | AWS | المنصة | AWS | الشركة |
| نظام التشغيل وتحديثاته | **انت** | المنصة | AWS | الشركة |
| Node أو Postgres وتحديثه | **انت** | المنصة | AWS (بتختار النسخة) | الشركة |
| الكود | **انت** | **انت** | **انت** | الشركة |
| الباك أب | **انت** | المنصة (على قد الخطة) | مفيش داتا في الدالة | الشركة |
| الصلاحيات والباسوردات والداتا | **انت** | **انت** | **انت** | **انت** |

آخر سطر هو الـ shared responsibility: مهما نزلت في الجدول، مين يدخل وإيه اللي مفتوح للنت فضل عليك.

---

## الخلاصة

~~~text
IaaS        سيرفر فاضي: انت بتحدّث وتأمّن وتعمل باك أب
PaaS        بتدّي الكود أو الإعدادات، والمنصة تشغّل وتحدّث
serverless  دالة بتصحى مع الطلب، وبتدفع على كل طلب
SaaS        برنامج جاهز
في الكل     الصلاحيات والداتا والإعدادات مسؤوليتك
~~~`,
          lines: [
            "IaaS: انت اللي بتحدّث نظام التشغيل بإيدك على سيرفرك.",
            "managed (PaaS): AWS بيشغّل ويحدّث Postgres، وانت بتسأل بس هو على أنهي نسخة.",
            "PaaS كامل: بتدّي Vercel الكود وهو يبني ويشغّل وينشر.",
            "serverless: بتنادي دالة، ومفيش سيرفر تشوفه ولا تحدّثه."
          ],
          sol: R`مفيش ناتج واحد صح، بس الجدول بتاعك المفروض يطلع شبه كده: موقع static على Vercel أو Netlify = PaaS (المنصة بتحدّث كل حاجة، ومفيش قاعدة بيانات أصلًا). API على VPS من DigitalOcean أو Hetzner أو EC2 = IaaS: انت اللي كنت بتعمل [[apt upgrade]]، وانت اللي كنت المفروض تعمل [[pg_dump]] بـ cron. تطبيق على Render أو Railway مع Postgres بتاعهم = PaaS: هما بيحدّثوا النظام، والباك أب اليومي عليهم (بس على قد الخطة). دالة على Lambda أو Vercel Functions = serverless: مفيش نظام تشغيل تحدّثه خالص.

السؤال التاني هو المهم: لو كتبت «محدش» قدام «مين بيعمل باك أب؟» في مشروع IaaS، يبقى ده خطر حقيقي لقيته، مش مجرد تصنيف. وخلي بالك إن Supabase أو Neon أو RDS بيعملوا باك أب، بس انت لسه مسؤول عن الداتا نفسها: لو مسحت جدول بالغلط، المنصة مش هترجّعه لوحدها إلا لو فيه PITR وانت عارف تستخدمه.

الغلطة الشائعة: تكتب «Docker على VPS» على إنه PaaS. الـ Docker بيغيّر طريقة التشغيل، بس السيرفر لسه بتاعك: التحديثات والفايروول والديسك عليك، فده IaaS. ونفس الكلام لـ Coolify: شكله PaaS، بس السيرفر تحته لسه مسؤوليتك.`
        },
        {
          cmd: "VPS ولا managed ولا PaaS",
          title: "فريق صغير: يستضيف مشروعه فين؟",
          desc: R`مفيش اختيار صح دايمًا: VPS أرخص وفيه تحكم كامل بس الصيانة كلها عليك، و PaaS أسرع بداية وأغلى مع الكبر، و managed cloud مرن وقوي بس معقّد ومحتاج حد فاهم.

وبين الـ frontend PaaS (Vercel) والـ VPS الخام فيه درجتين ناس كتير بتنساهم: container PaaS (Render و Railway و Fly.io) بيشغّل API و worker و Postgres من الريبو، و self-hosted PaaS (Coolify أو Dokploy على VPS بتاعك) بيدّيك نفس الراحة بسعر السيرفر.

الدالة دي مش قاعدة مقدّسة، هي طريقة تفكير: حجم الفريق، وشكل الترافيك، ومحتاج سيرفر خاص ولا لأ، والميزانية، وفيه حد يعرف Linux ولا لأ.`,
          example: R`function pickHosting({ devs, traffic, needsServer, budgetUsd, knowsLinux }) {
  if (devs <= 2 && !needsServer) return "frontend PaaS: Vercel + Neon أو Supabase";
  if (budgetUsd < 20 && !knowsLinux) return "container PaaS: Render أو Railway أو Fly.io";
  if (budgetUsd < 20) return "VPS + Coolify أو Dokploy (أو Docker Compose بإيدك)";
  if (traffic === "spiky") return "serverless: Lambda أو Vercel Functions";
  if (devs <= 5) return "container PaaS مدفوع + Postgres مُدار";
  return "managed: ECS Fargate + RDS + CloudFront";
}
console.log(pickHosting({ devs: 1, traffic: "steady", needsServer: false, budgetUsd: 0 }));
console.log(pickHosting({ devs: 2, traffic: "steady", needsServer: true, budgetUsd: 10, knowsLinux: false }));
console.log(pickHosting({ devs: 2, traffic: "steady", needsServer: true, budgetUsd: 10, knowsLinux: true }));
console.log(pickHosting({ devs: 4, traffic: "steady", needsServer: true, budgetUsd: 150, knowsLinux: true }));
console.log(pickHosting({ devs: 6, traffic: "steady", needsServer: true, budgetUsd: 400, knowsLinux: true }));`,
          try: "شغّل الدالة على ٣ مشاريع عملتها قبل كده. لو النتيجة مختلفة عن اللي عملته فعلًا، اكتب ليه، وهل اختيارك كان أحسن ولا لأ.",
          flag: "script",
          deep: {
            why: "أغلب المشاريع الصغيرة بتقع في غلطة من اتنين: Kubernetes لموقع فيه ١٠٠ زائر في اليوم، أو VPS محدش بيحدّثه ولا بيعمل له باك أب لحد ما الديسك يبوظ. الاختيار الصح بيوفر فلوس ووقت ووجع دماغ.",
            how: R`VPS (Hetzner أو DigitalOcean أو Hostinger): سعر ثابت وقليل، وبتعمل اللي انت عايزه: Docker و cron و WebSockets و workers. بس انت الـ sysadmin: تحديثات، وفايروول، وباك أب، ومراقبة. ولو السيرفر وقع الموقع كله وقع. التفاصيل في تاب VPS وتاب Docker.

frontend PaaS (Vercel و Netlify و Cloudflare Pages، ومعاهم Supabase و Neon للقاعدة): بتعمل push والموقع يطلع، و preview لكل branch، و SSL تلقائي. بس السعر بيقفز مع الترافيك، وفيه حدود (مدة الدالة، وحجم الطلب)، وحاجات زي WebSockets طويلة أو شغل خلفي بالساعات مش مكانها.

container PaaS (Render و Railway و Fly.io): بتدّيله Dockerfile أو ريبو، وهو يشغّل process حقيقي شغال على طول: API و worker و cron، ومعاهم Postgres و Redis مُدارين، و SSL ولوجات. ده الاختيار الطبيعي لـ Express أو FastAPI مع worker لما محدش عايز يبقى sysadmin. العيب إن كل خدمة بتتحاسب لوحدها، فالفاتورة بتكبر مع عدد الخدمات. الدروس في فئة «منصات جاهزة للباك إند»: [[render.yaml]] و [[railway]] و [[fly launch]].

self-hosted PaaS (Coolify أو Dokploy على VPS): نفس تجربة push-to-deploy و SSL والباك أب، بسعر السيرفر. بس نظام التشغيل والأمان والباك أب برا السيرفر لسه عليك. درس [[Coolify / Dokploy]]، وإمتى تنقل من ده لده في درس [[PaaS ولا VPS: الحساب]].

managed cloud (ECS و RDS على AWS): تقدر تبني أي حاجة وتكبر لأي حجم، ومعاك Multi-AZ وباك أب تلقائي. بس فيه عشرات الإعدادات (VPC و IAM و security groups)، والفاتورة معقدة، ومحتاج حد يفهمها.

طريق شائع ومعقول: تبدأ PaaS (frontend أو container) أو VPS بـ Coolify، ولما الترافيك أو الفريق يكبر تنقل الأجزاء اللي محتاجة لـ AWS. وخلي التطبيق من الأول «سهل النقل»: Docker، ومتغيرات بيئة، والملفات في object storage مش على الديسك.`,
            when: "في أول يوم من أي مشروع، وكل ما الفاتورة أو وقت الصيانة يزيد بشكل ملحوظ.",
            mistakes: "تختار AWS عشان «الشركات الكبيرة بتستخدمه» وانت لوحدك، فتقضي أسبوع في VPC و IAM بدل ما تبني المنتج. وتحط موقع تجاري على خطة Hobby في Vercel وهي للاستخدام الشخصي غير التجاري بس. وتحفظ الملفات اللي المستخدمين بيرفعوها على ديسك الـ VPS، فلما تنقل أو تكبّر لازم تنقلها بإيدك. وتنط من Vercel لـ VPS خام لأول API عندك، وانت ممكن تشغّله على Render أو Railway في ساعة، أو على نفس الـ VPS بـ Coolify من غير ما تكتب Nginx config."
          },
          teach: R`## الفكرة: دالة بتسأل أسئلة بالترتيب

المثال دالة JavaScript بتاخد وصف المشروع وترجّع اقتراح استضافة. هي مش «الإجابة الصح»، هي طريقة تفكير مكتوبة كود: كل [[if]] سؤال، وأول سؤال إجابته «أيوه» بيقرر. شغّلناها بـ [[node pick.mjs]] جوه [[node:22-slim]] في Docker.

---

## ١. السطر الأول: الدالة ومدخلاتها

~~~js
function pickHosting({ devs, traffic, needsServer, budgetUsd, knowsLinux }) {
~~~

| الحتة | معناها |
|---|---|
| [[function pickHosting]] | دالة اسمها pickHosting (اختار الاستضافة) |
| [[({ ... })]] | الدالة بتاخد object واحد، والأقواس المعووجة جوه القوسين بتفكّه لمتغيرات بأسماء الخانات (destructuring) |
| [[devs]] | عدد المطورين |
| [[traffic]] | شكل الترافيك: [["steady"]] ثابت، أو [["spiky"]] بيقفز وينزل |
| [[needsServer]] | محتاج process شغال على طول (API أو worker)؟ |
| [[budgetUsd]] | الميزانية بالدولار في الشهر |
| [[knowsLinux]] | فيه حد في الفريق يعرف يدير Linux؟ |

ليه object مش ٥ parameters عادية؟ عشان وانت بتنادي تكتب [[devs: 1]] بالاسم، فمتلخبطش الترتيب. والخانة اللي متبعتهاش بتبقى [[undefined]]، ودي هتفرق تحت.

---

## ٢. الشروط بالترتيب

| السطر | الشرط | بيقرر |
|---|---|---|
| ١ | [[devs <= 2 && !needsServer]] | فريق صغير ومفيش سيرفر خاص: frontend PaaS |
| ٢ | [[budgetUsd < 20 && !knowsLinux]] | ميزانية قليلة ومحدش يعرف Linux: container PaaS |
| ٣ | [[budgetUsd < 20]] | ميزانية قليلة (وفيه حد يعرف Linux، لأن اللي قبله وقع): VPS + Coolify |
| ٤ | [[traffic === "spiky"]] | ترافيك متقطع: serverless |
| ٥ | [[devs <= 5]] | فريق لحد ٥: container PaaS مدفوع |
| ٦ | (مفيش شرط) | غير كده: managed على AWS |

الرموز:

- [[<=]] أصغر من أو يساوي، و [[<]] أصغر من.
- [[&&]] «و»: الاتنين لازم يبقوا صح.
- [[!]] «مش»: [[!needsServer]] يعني «مش محتاج سيرفر».
- [[===]] يساوي بالظبط (نفس القيمة ونفس النوع).
- [[return]] بترجّع النتيجة **وتخرج من الدالة على طول**، فالشروط اللي بعدها مبتتسألش. عشان كده الترتيب هو المنطق كله: سطر ٣ مش محتاج يكتب [[knowsLinux]]، لأن لو وصلنا له يبقى سطر ٢ وقع، يعني فيه حد يعرف Linux.

---

## ٣. النداءات الخمسة والناتج

~~~js
console.log(pickHosting({ devs: 1, traffic: "steady", needsServer: false, budgetUsd: 0 }));
~~~

[[console.log]] بيطبع اللي الدالة رجّعته. والناتج الحقيقي للخمس سطور:

~~~text الناتج
frontend PaaS: Vercel + Neon أو Supabase
container PaaS: Render أو Railway أو Fly.io
VPS + Coolify أو Dokploy (أو Docker Compose بإيدك)
container PaaS مدفوع + Postgres مُدار
managed: ECS Fargate + RDS + CloudFront
~~~

نمشي كل نداء على الجدول:

| النداء | أول شرط صح | ليه |
|---|---|---|
| مطوّر واحد، مش محتاج سيرفر | ١ | [[1 <= 2]] و [[!false]] = [[true]] |
| ٢، محتاج سيرفر، ١٠ دولار، مش عارف Linux | ٢ | ١ وقع لأنه محتاج سيرفر، و [[10 < 20]] و [[!false]] |
| نفس اللي فات بس عارف Linux | ٣ | ٢ وقع لأن [[!true]] = [[false]] |
| ٤، ١٥٠ دولار، ترافيك ثابت | ٥ | الميزانية مش أقل من ٢٠، والترافيك مش spiky، و [[4 <= 5]] |
| ٦، ٤٠٠ دولار | ٦ | ولا شرط صح، فوصلنا للـ [[return]] الأخير |

---

## ٤. الفخ اللي في الـ sol: الخانة الناقصة

النداء ده من الـ solCode مبعتش [[knowsLinux]] خالص:

~~~js
console.log(pickHosting({ devs: 3, traffic: "spiky", needsServer: false, budgetUsd: 0 }));
~~~

~~~text الناتج
container PaaS: Render أو Railway أو Fly.io
~~~

موقع static من غير سيرفر، ومع كده طلع container PaaS! نمشيها:

1. سطر ١: [[3 <= 2]] غلط، فالشرط كله وقع (رغم إنه مش محتاج سيرفر).
2. سطر ٢: [[0 < 20]] صح، و [[knowsLinux]] مش متبعتة فقيمتها [[undefined]]، و [[!undefined]] = [[true]] (جرّبناها في node وطبعت [[true]]). فالشرط صح.

يعني الدالة بتجاوب على ترتيب أسئلتها، مش على اللي في دماغك. وده درس أكبر من الاستضافة: لما قرار يطلع غريب، اسأل الأول «هو السؤال ده ناقصه إيه؟».

---

## الخلاصة

~~~text
frontend PaaS      موقع أو frontend من غير سيرفر خاص
container PaaS     API و worker من الريبو، ومحدش عايز يبقى sysadmin
VPS + Coolify      ميزانية قليلة وفيه حد يعرف Linux
serverless         ترافيك متقطع، وبتدفع على الطلب
managed (AWS)      فريق وميزانية أكبر، ومحتاج تحكم كامل
~~~

> الترتيب في الكود هو الأولوية: [[return]] بيوقف عند أول شرط صح، والخانة اللي متبعتهاش [[undefined]] و [[!undefined]] صح.`,
          lines: [
            "دالة بتاخد وصف المشروع (وهل فيه حد يعرف Linux).",
            "فريق صغير ومش محتاج سيرفر خاص: منصة frontend جاهزة.",
            "ميزانية قليلة ومحدش يعرف Linux: container PaaS.",
            "ميزانية قليلة وفيه حد يعرف Linux: VPS، والأسهل بـ Coolify أو Dokploy.",
            "ترافيك بيقفز وينزل: ادفع على الطلب.",
            "فريق صغير لمتوسط بميزانية: container PaaS مدفوع وقاعدة مُدارة.",
            "غير كده: managed على AWS.",
            "قفلة الدالة.",
            "مطوّر واحد ومش محتاج سيرفر: frontend PaaS.",
            "محتاج سيرفر وميزانيته ١٠ دولار ومحدش يعرف Linux: container PaaS.",
            "نفس المشروع بس فيه حد يعرف Linux: VPS + Coolify.",
            "٤ مطورين وميزانية ١٥٠: container PaaS مدفوع.",
            "فريق أكبر وميزانية: managed."
          ],
          sol: R`المثال نفسه بيطبع بالترتيب: [[frontend PaaS]]، و [[container PaaS: Render ...]]، و [[VPS + Coolify ...]]، و [[container PaaS مدفوع ...]]، و [[managed: ECS Fargate ...]]. ولما جرّبت ٣ مشاريع تانية (الكود تحت) طلع: موقع static لشخص واحد = [[frontend PaaS]]، و API بـ ٥ دولار وانت عارف Linux = [[VPS + Coolify]]، و API بترافيك متقطع وميزانية ١٠٠ = [[serverless]].

وفيه حالة مفاجئة: فريق من ٣ بموقع static من غير سيرفر وميزانية صفر بيطلع [[container PaaS]]، لأن أول شرط فيه [[devs <= 2]]، و [[knowsLinux]] مش متبعت فبيبقى [[undefined]]. يعني الدالة بتجاوب على ترتيب الشروط مش على المنطق. ده بالظبط اللي التجربة عايزاك تلاحظه: لو النتيجة مختلفة عن اللي عملته، اسأل الأول «هل الدالة ناقصها سؤال؟» (زي: الموقع static ولا لأ؟ فيه SLA؟ فيه داتا حساسة؟) قبل ما تقول اختيارك كان غلط.

الإجابة الكويسة لكل مشروع بتقول جملة زي: «اخترت VPS عشان كان رخيص، بس دفعت التمن في وقت الصيانة والباك أب اللي معملتوش، فالـ PaaS كان أحسن لحجم المشروع ده».`,
          solCode: R`console.log(pickHosting({ devs: 1, traffic: "steady", needsServer: false, budgetUsd: 0 }));
console.log(pickHosting({ devs: 1, traffic: "steady", needsServer: true, budgetUsd: 5, knowsLinux: true }));
console.log(pickHosting({ devs: 3, traffic: "spiky", needsServer: true, budgetUsd: 100, knowsLinux: true }));
console.log(pickHosting({ devs: 3, traffic: "spiky", needsServer: false, budgetUsd: 0 }));
// frontend PaaS: Vercel + Neon أو Supabase
// VPS + Coolify أو Dokploy (أو Docker Compose بإيدك)
// serverless: Lambda أو Vercel Functions
// container PaaS: Render أو Railway أو Fly.io`
        }
      ]
    },
    {
      t: "الحساب والفلوس من أول يوم",
      l: 1,
      n: "أول ساعة في حساب AWS بتحدد هل هتتفاجئ بفاتورة أو باختراق ولا لأ",
      items: [
        {
          cmd: "root + MFA",
          title: "أول حاجة تعملها بعد ما تفتح حساب AWS",
          desc: R`الإيميل والباسورد اللي فتحت بيهم الحساب اسمهم root user، وده يقدر يعمل أي حاجة، فأول خطوة: MFA عليه، ومفيش ليه access keys أبدًا، ومتستخدموش في الشغل اليومي.

بعدها اعمل هوية للشغل اليومي (IAM Identity Center أو IAM user بـ MFA)، وسجّل إيميل للأمان عشان تنبيهات AWS توصلك. الأوامر دي بتفحص إن ده اتعمل.`,
          example: R`aws iam get-account-summary --query "SummaryMap.{rootMfa:AccountMFAEnabled,rootKeys:AccountAccessKeysPresent}"
aws iam list-users --query "Users[].[UserName,PasswordLastUsed]" --output table
aws iam list-access-keys --user-name ali
aws account get-alternate-contact --alternate-contact-type SECURITY`,
          try: "من الكونسول: فعّل MFA على الـ root (يفضل passkey أو مفتاح أمان)، واعمل يوزر للشغل اليومي. بعدين شغّل أول أمر وتأكد إن rootMfa بـ 1 و rootKeys بـ 0.",
          deep: {
            why: "حساب AWS مربوط بفيزا. لو حد دخل عليه هيشغّل سيرفرات تعدين عملات في كل الـ regions، والفاتورة ممكن توصل آلاف الدولارات في يوم. والـ root مفيش حاجة تمنعه: مفيش policy بتقيّده.",
            how: R`الـ root مش IAM user عادي، ده صاحب الحساب. فيه حاجات بيعملها هو بس: يقفل الحساب، ويغيّر خطة الدعم، ويرجّع الصلاحيات لو اتقفلت على الكل. عشان كده بتقفله بـ MFA وتحطه على جنب.

[[get-account-summary]] بيرجّع أرقام عن الحساب، منها [[AccountMFAEnabled]] (1 يعني الـ root عليه MFA) و [[AccountAccessKeysPresent]] (لازم 0: مفيش مفاتيح للـ root).

والـ access key (اللي بيبدأ بـ AKIA) مفتاح دايم: أي حد معاه النص ده يقدر يعمل اللي صاحبه يقدر عليه، من أي مكان، لحد ما تمسحه. عشان كده الأحسن متعملوش خالص، وتستخدم تسجيل دخول مؤقت (درس «aws configure / login / sso»).

و [[get-alternate-contact]] بيعرض إيميل الأمان. لو مش متسجل، تنبيهات AWS عن تسريب مفتاح أو نشاط غريب بتروح للإيميل الأساسي بس، وممكن محدش يقراه.`,
            when: "في أول ساعة من فتح الحساب، وقبل أي سيرفر أو bucket.",
            mistakes: "تعمل access key للـ root وتحطه في [[aws configure]] عشان «أسهل»، وده أخطر مفتاح ممكن يتسرّب. وتشارك باسورد الـ root مع زميل بدل ما تعمل له يوزر. وتسيب مفاتيح قديمة مش مستخدمة: [[PasswordLastUsed]] و [[aws iam get-access-key-last-used]] بيقولولك مين نايم من شهور."
          },
          teach: R`## الفكرة: ٤ أسئلة فحص بعد ما تقفل الحساب

تفعيل MFA نفسه بيتعمل من الكونسول (Security credentials ← Assign MFA device)، مش من الترمنال. الأوامر الأربعة دي **بتفحص** إن الشغل اتعمل: الـ root عليه MFA؟ ملوش مفاتيح؟ مين اليوزرز ومفاتيحهم؟ وفيه إيميل أمان؟ وكلهم [[get]] أو [[list]]، يعني قراية بس.

الأوامر اتجرّبت بـ AWS CLI 2.37 (صورة [[amazon/aws-cli]] الرسمية) على LocalStack، وده محاكي لـ AWS بيشتغل في Docker بمفاتيح وهمية ([[test]]). فالأرقام من حساب وهمي، والفرق عن الحساب الحقيقي مكتوب تحت كل أمر.

---

## ١. [[aws iam get-account-summary --query ...]]

~~~bash
aws iam get-account-summary --query "SummaryMap.{rootMfa:AccountMFAEnabled,rootKeys:AccountAccessKeysPresent}"
~~~

### من غير [[--query]] الأول

[[iam]] هي خدمة الهويات والصلاحيات (Identity and Access Management)، و [[get-account-summary]] بيرجّع ملخص أرقام عن الحساب كله:

~~~text الناتج (أول سطور)
{
    "SummaryMap": {
        "GroupPolicySizeQuota": 5120,
        "InstanceProfilesQuota": 1000,
        "Policies": 0,
        "GroupsPerUserQuota": 10,
        "InstanceProfiles": 0,
        "AttachedPoliciesPerUserQuota": 10,
        "Users": 1,
        "PoliciesQuota": 1500,
        "Providers": 0,
        "AccountMFAEnabled": 0,
...
~~~

حوالي ٣٠ رقم: عدد اليوزرز، والحدود ([[Quota]]) وغيرهم. احنا عايزين اتنين بس.

### الـ [[--query]] حتة حتة

| الحتة | معناها |
|---|---|
| [[SummaryMap]] | ادخل جوه الخانة دي |
| [[.{ ... }]] | واعمل object جديد بأسامي انت بتختارها |
| [[rootMfa:AccountMFAEnabled]] | خانة اسمها rootMfa قيمتها من [[AccountMFAEnabled]] |
| [[rootKeys:AccountAccessKeysPresent]] | خانة rootKeys من [[AccountAccessKeysPresent]] |

~~~text الناتج على LocalStack
{
    "rootMfa": 0,
    "rootKeys": 0
}
~~~

| الخانة | معناها | المطلوب |
|---|---|---|
| [[rootMfa]] | الـ root عليه MFA؟ (1 أيوه، 0 لأ) | **1** |
| [[rootKeys]] | الـ root ليه access keys؟ | **0** |

على LocalStack [[rootMfa]] طلع 0 لأن محدش فعّل MFA على حساب وهمي. على حسابك الحقيقي بعد ما تفعّله المفروض يطلع 1. ولو ضفت [[--output text]] بيطلع الرقمين في سطر واحد بينهم Tab:

~~~text الناتج بـ --output text
0	0
~~~

---

## ٢. [[aws iam list-users --query ... --output table]]

~~~bash
aws iam list-users --query "Users[].[UserName,PasswordLastUsed]" --output table
~~~

| الحتة | معناها |
|---|---|
| [[list-users]] | كل الـ IAM users في الحساب |
| [[Users[]]] | لف على القايمة |
| [[.[UserName,PasswordLastUsed]]] | هات الاسم وآخر مرة دخل بالباسورد |
| [[--output table]] | اعرضها جدول للعين |

عملنا يوزر تجربة اسمه [[ali]] الأول ([[aws iam create-user --user-name ali]]):

~~~text الناتج
-----------------
|   ListUsers   |
+------+--------+
|  ali |  None  |
+------+--------+
~~~

[[None]] يعني اليوزر عمره ما دخل الكونسول بباسورد (أو مالوش باسورد أصلًا). يوزر قديم جنبه [[None]] أو تاريخ من سنة: اسأل هو لسه لازم ليه؟

---

## ٣. [[aws iam list-access-keys --user-name ali]]

بيعرض المفاتيح الدايمة بتاعة يوزر واحد. عملنا له مفتاح تجربة بـ [[create-access-key]]:

~~~text الناتج
{
    "AccessKeyMetadata": [
        {
            "UserName": "ali",
            "AccessKeyId": "LKIAQAAAAAAAPZ4I45LD",
            "Status": "Active",
            "CreateDate": "2026-10-08T09:47:58.228432+00:00"
        }
    ]
}
~~~

| الخانة | معناها |
|---|---|
| [[AccessKeyId]] | الجزء العام من المفتاح. في AWS الحقيقي بيبدأ بـ [[AKIA]]، و LocalStack بيطلّعه [[LKIA]] عشان يبان إنه وهمي |
| [[Status]] | [[Active]] شغال، أو [[Inactive]] متوقف من غير ما يتمسح |
| [[CreateDate]] | اتعمل إمتى، بتوقيت UTC (الـ [[+00:00]]) |

الـ secret نفسه مش بيظهر هنا أبدًا: بيظهر مرة واحدة بس وقت ما المفتاح بيتعمل. وعشان تعرف المفتاح اتستخدم آخر مرة إمتى: [[aws iam get-access-key-last-used --access-key-id ...]].

---

## ٤. [[aws account get-alternate-contact --alternate-contact-type SECURITY]]

| الحتة | معناها |
|---|---|
| [[account]] | خدمة إعدادات الحساب نفسه |
| [[get-alternate-contact]] | هات جهة اتصال إضافية |
| [[--alternate-contact-type SECURITY]] | بتاعة الأمان. التانيين [[BILLING]] (الفواتير) و [[OPERATIONS]] (التشغيل) |

الخدمة دي مش موجودة في LocalStack المجاني (رجّع [[InternalFailure ... not included in your current license plan]])، فالشكل من الـ docs: لو متسجل بيرجّع [[AlternateContact]] فيه [[Name]] و [[EmailAddress]] و [[PhoneNumber]] و [[Title]]، ولو مش متسجل بيرجّع خطأ [[ResourceNotFoundException]].

---

## الخلاصة

| الأمر | بيسأل | الإجابة الصح |
|---|---|---|
| [[get-account-summary]] | الـ root عليه MFA؟ وليه مفاتيح؟ | [[1]] و [[0]] |
| [[list-users]] | مين اليوزرز وآخر دخول | مفيش يوزر نايم من شهور |
| [[list-access-keys]] | مفاتيح يوزر معين | أقل عدد، ومفيش مفتاح قديم مش مستخدم |
| [[get-alternate-contact]] | إيميل الأمان | متسجل ومحدش ينساه |

> الـ root للطوارئ بس: MFA عليه، ومن غير مفاتيح، ومتدخلش بيه في الشغل اليومي.`,
          lines: [
            "هل الـ root عليه MFA؟ وهل ليه access keys؟ عايز 1 و 0.",
            "اليوزرز اللي في الحساب وآخر مرة كل واحد دخل.",
            "مفاتيح يوزر معين: لو فيه مفتاح قديم مش مستخدم، امسحه.",
            "إيميل الأمان اللي AWS بيبعت عليه التنبيهات."
          ],
          sol: R`أول أمر المفروض يطبع:

[[{ "rootMfa": 1, "rootKeys": 0 }]]

[[rootMfa: 1]] معناها إن الـ root عليه MFA، و [[rootKeys: 0]] معناها إن مفيش access keys للـ root. ولو عايز سطر واحد في سكربت ضيف [[--output text]] فيطلع [[1	0]].

لو طلع [[rootMfa: 0]] يبقى الـ MFA اتضاف لـ IAM user مش للـ root (غلطة مشهورة: دخلت بيوزر وضفت MFA لنفسك). ولو [[rootKeys: 1]] امسح المفتاح فورًا من Security credentials وانت داخل بالـ root. ولو الأمر نفسه رجّع [[AccessDenied]] يبقى اليوزر اللي بتشغّل بيه ملوش صلاحية [[iam:GetAccountSummary]]، وده طبيعي لو هو يوزر محدود؛ شغّله من هوية فيها صلاحيات قراءة IAM. وأمر [[get-alternate-contact]] لو رجّع [[ResourceNotFoundException]] يبقى مفيش إيميل أمان متسجل: سجّله من Account settings.`
        },
        {
          cmd: "Budgets و free tier",
          title: "إنذار قبل ما الفاتورة تفاجئك",
          desc: R`AWS مش بيوقّف حاجة لما المصاريف تزيد، بيحاسبك وخلاص، فأول حاجة بعد الـ MFA budget بإنذار على الإيميل لما التكلفة المتوقعة أو الفعلية تعدي رقم انت حاطه.

والحسابات الجديدة من يوليو ٢٠٢٥ بتختار Free plan (رصيد لحد ٢٠٠ دولار لمدة ٦ شهور، والخدمات الغالية مقفولة) أو Paid plan. والـ free tier مش معناه «ببلاش»: فيه حاجات بتتحاسب من أول ساعة، زي الـ public IPv4 والـ NAT Gateway والديسكات اللي فضلت بعد ما مسحت السيرفر.`,
          example: R`aws budgets create-budget --account-id 123456789012 --budget file://budget.json --notifications-with-subscribers file://notify.json
aws budgets describe-budgets --account-id 123456789012 --query "Budgets[].[BudgetName,BudgetLimit.Amount,CalculatedSpend.ActualSpend.Amount]"
for r in $(aws ec2 describe-regions --query "Regions[].RegionName" --output text); do
  echo "$r: $(aws ec2 describe-instances --region $r --query 'Reservations[].Instances[].InstanceId' --output text)"
done`,
          try: "اعمل budget بـ ٥ دولار وإنذار عند ٨٠٪ على إيميلك (من الكونسول أسهل: Billing ← Budgets). بعدين شغّل الـ loop وتأكد إن مفيش سيرفر نسيته في region تانية.",
          deep: {
            why: "أشهر قصة في AWS: طالب جرّب حاجة ونسيها شغالة، وجتله فاتورة بمئات الدولارات آخر الشهر. الـ budget مش بيمنع ده، بس بيعرّفك بدري، والـ loop بيلاقي اللي نسيته.",
            how: R`الـ budget بيتكون من ملفين. [[budget.json]] فيه الاسم والحد والنوع، زي: [[{"BudgetName":"monthly","BudgetLimit":{"Amount":"5","Unit":"USD"},"BudgetType":"COST","TimeUnit":"MONTHLY"}]]. و [[notify.json]] فيه نوع الإنذار ([[FORECASTED]] للمتوقع آخر الشهر أو [[ACTUAL]] للفعلي)، والنسبة ([[80]] ٪)، والإيميل.

[[FORECASTED]] أهم من [[ACTUAL]]: بيقولك «بالمعدل ده هتعدي الحد آخر الشهر» وانت لسه في أوله.

الـ loop بيلف على كل الـ regions المفعّلة ويطبع السيرفرات في كل واحدة. ليه؟ لأن الكونسول بيعرض region واحدة في المرة، فسيرفر اتعمل في us-east-1 بالغلط مش هتشوفه وانت فاتح فرانكفورت.

حاجات بتتحاسب وناس كتير متعرفهاش: كل public IPv4 بـ 0.005 دولار في الساعة (حوالي ٣.٦ دولار في الشهر) حتى لو مش مربوط بسيرفر. و NAT Gateway بيتحاسب بالساعة وعلى كل جيجا بتعدي منه. والديسك (EBS) والـ snapshots بيفضلوا بعد ما السيرفر يتمسح لو مش متظبطين يتمسحوا معاه. واللوجات في CloudWatch بتفضل للأبد لو محطتش مدة. والـ Cost Explorer API نفسه بسنت على كل طلب.`,
            when: "مع فتح الحساب وقبل أي تجربة. والـ loop بعد كل تجربة أو ورشة.",
            mistakes: "تعتمد على «أنا على الـ free tier» وتفتح RDS بـ Multi-AZ أو instance كبيرة مش داخلة فيه. وتعمل budget بـ ACTUAL بس، فالإنذار ييجي بعد ما الفلوس اتصرفت. وتمسح السيرفر وتنسى الـ Elastic IP والديسك. وأوامر المسح في درس «امسح اللي مش مستخدم» في المستوى ٣."
          },
          teach: R`## الفكرة: إنذار، وبعدين تفتيش

المثال جزئين: أول سطرين بيعملوا budget ويعرضوه (الإنذار قبل ما الفاتورة تكبر)، والـ loop في الآخر بيلف على كل الـ regions يدوّر على سيرفرات نسيتها (التفتيش). خدمة Budgets مش موجودة في LocalStack المجاني، فأول سطرين شكلهم من الـ docs ومن [[aws budgets create-budget help]] في CLI 2.37. الـ loop اتشغّل فعلًا على LocalStack.

---

## ١. [[aws budgets create-budget ...]]

~~~bash
aws budgets create-budget --account-id 123456789012 --budget file://budget.json --notifications-with-subscribers file://notify.json
~~~

| الحتة | معناها |
|---|---|
| [[budgets]] | خدمة AWS Budgets |
| [[create-budget]] | اعمل budget جديد |
| [[--account-id 123456789012]] | رقم حسابك، ١٢ رقم. ده رقم مثال، والـ solCode بيجيبه لوحده بـ [[sts get-caller-identity]] |
| [[--budget file://budget.json]] | الـ budget نفسه في ملف. [[file://]] يعني «اقرا القيمة من الملف ده» بدل ما تكتب JSON طويل في الأمر |
| [[--notifications-with-subscribers file://notify.json]] | الإنذارات ومين يستلمها |

### الملف الأول: [[budget.json]]

~~~json
{"BudgetName":"monthly","BudgetLimit":{"Amount":"5","Unit":"USD"},"BudgetType":"COST","TimeUnit":"MONTHLY"}
~~~

| الخانة | القيمة | معناها |
|---|---|---|
| [[BudgetName]] | [[monthly]] | اسم تختاره |
| [[BudgetLimit]] | [[5]] و [[USD]] | الحد: ٥ دولار. الرقم مكتوب كنص [["5"]] لأن الـ API طالبه كده |
| [[BudgetType]] | [[COST]] | بنراقب الفلوس (فيه أنواع تانية للاستخدام والـ Savings Plans) |
| [[TimeUnit]] | [[MONTHLY]] | الحد ده لكل شهر، وبيتصفّر أول الشهر |

### الملف التاني: [[notify.json]] (في الـ solCode)

قايمة، كل عنصر فيها إنذار ومعاه المشتركين:

| الخانة | القيمة | معناها |
|---|---|---|
| [[NotificationType]] | [[FORECASTED]] | على المتوقع آخر الشهر، والتاني [[ACTUAL]] للمصروف فعلًا |
| [[ComparisonOperator]] | [[GREATER_THAN]] | لما يبقى أكبر من |
| [[Threshold]] | [[80]] | ٨٠ |
| [[ThresholdType]] | [[PERCENTAGE]] | ٪ من الحد، يعني ٤ دولار |
| [[SubscriptionType]] | [[EMAIL]] | ابعت إيميل (أو [[SNS]]) |
| [[Address]] | إيميلك | |

القيم دي بالظبط هي اللي الـ help بيقبلها: [[ACTUAL]] أو [[FORECASTED]]، و [[GREATER_THAN]] أو [[LESS_THAN]] أو [[EQUAL_TO]].

---

## ٢. [[aws budgets describe-budgets ...]]

~~~bash
aws budgets describe-budgets --account-id 123456789012 --query "Budgets[].[BudgetName,BudgetLimit.Amount,CalculatedSpend.ActualSpend.Amount]"
~~~

الـ [[--query]] بيلف على [[Budgets[]]] ويطلّع من كل واحد ٣ حاجات: الاسم، والحد ([[BudgetLimit.Amount]])، والمصروف الفعلي لحد النهارده ([[CalculatedSpend.ActualSpend.Amount]]). النقطة بين الأسماء يعني «ادخل جوه». الشكل حسب الـ docs:

~~~text الناتج (من الـ docs)
[
    [
        "monthly",
        "5.0",
        "0.0"
    ]
]
~~~

---

## ٣. الـ loop: فيه سيرفر منسي فين؟

~~~bash
for r in $(aws ec2 describe-regions --query "Regions[].RegionName" --output text); do
  echo "$r: $(aws ec2 describe-instances --region $r --query 'Reservations[].Instances[].InstanceId' --output text)"
done
~~~

نفكّه من جوه لبرة:

### الخطوة ١: قايمة الـ regions

~~~bash
aws ec2 describe-regions --query "Regions[].RegionName" --output text
~~~

[[describe-regions]] بيرجّع الـ regions المفعّلة في حسابك (ولو عايز المقفولة كمان فيه [[--all-regions]]). و [[--output text]] بيطبع الأسامي في سطر واحد بينها Tab، وده الشكل اللي الـ loop محتاجه:

~~~text الناتج على LocalStack (أوله)
af-south-1	ap-east-1	ap-east-2	ap-northeast-1	...	eu-central-1	...	me-central-1	me-south-1	...	us-east-1
~~~

### الخطوة ٢: [[$( ... )]] و [[for r in]]

[[$( ... )]] اسمها command substitution: «شغّل الأمر ده وحط ناتجه مكانه». فالسطر بيبقى [[for r in af-south-1 ap-east-1 ...]]، و [[for]] بيلف على كل كلمة ويحطها في المتغير [[r]]. و [[do]] ... [[done]] جسم الـ loop.

### الخطوة ٣: السيرفرات في الـ region دي

~~~bash
aws ec2 describe-instances --region $r --query 'Reservations[].Instances[].InstanceId' --output text
~~~

| الحتة | معناها |
|---|---|
| [[--region $r]] | اسأل الـ region اللي عليها الدور، مش الافتراضية |
| [[Reservations[].Instances[]]] | EC2 بيرجّع السيرفرات جوه «حجوزات»، فبنفك القايمتين |
| [[.InstanceId]] | رقم كل سيرفر |
| علامات [[']] | الـ query جوه [["..."]] بتاعة [[echo]]، فبنستخدم النوع التاني من العلامات عشان ميتقفلش النص |

### الخطوة ٤: [[echo "$r: ..."]]

بيطبع اسم الـ region وجنبه الأرقام. عشان نشوف الـ loop بيلاقي حاجة، شغّلنا سيرفر وهمي في LocalStack في [[us-east-1]] الأول بـ [[run-instances]]:

~~~text الناتج (جزء)
eu-central-1: 
eu-south-1: 
me-central-1: 
me-south-1: 
us-east-1: i-a6ae19e65a7050a15
us-east-2: 
~~~

الـ region اللي جنبها فاضي مفيهاش سيرفرات، و [[us-east-1]] فيها السيرفر المنسي. ده بالظبط اللي الكونسول بيخبّيه: لو فاتح فرانكفورت مش هتشوفه.

> LocalStack طلّع نفس السيرفر كمان في regions زي [[us-gov-east-1]] و [[cn-north-1]]، ودي غلطة في المحاكي نفسه. الحساب العادي مبيشوفش الـ regions دي أصلًا.

---

## الخلاصة

| الخطوة | الأمر | ليه |
|---|---|---|
| إنذار | [[create-budget]] بـ [[FORECASTED]] ٨٠٪ | تعرف بدري، قبل ما الفلوس تتصرف |
| متابعة | [[describe-budgets]] | الحد والمصروف لحد النهارده |
| تفتيش | الـ loop على كل region | تلاقي اللي نسيته شغال |

> الـ budget **مش بيوقف** حاجة، بيبعتلك إيميل بس. والـ free tier مش بيغطي الـ public IPv4 ولا الـ NAT Gateway ولا الديسكات اللي فضلت.`,
          lines: [
            "اعمل budget: الحد في budget.json، والإنذارات والإيميل في notify.json.",
            "اعرض الـ budgets: الاسم، والحد، والمصروف لحد دلوقتي.",
            "لف على كل region مفعّلة في الحساب.",
            "اطبع اسم الـ region والسيرفرات اللي فيها (لو فاضي يبقى مفيش).",
            "نهاية الـ loop."
          ],
          sol: R`بعد ما تعمل الـ budget، أمر [[describe-budgets]] المفروض يرجّع حاجة زي [[["monthly", "5.0", "0.0"]]]: الاسم والحد (AWS بيرجّعه بعلامة عشرية) والمصروف الفعلي. وهيوصلك إيميل من AWS Budgets عند ٨٠٪ (٤ دولار). والملفين لو عايز تعمله بالترمنال تحت (نفس الـ JSON اللي في الـ deep).

الـ loop المفروض يطبع كل region وجنبها فاضي، زي [[eu-central-1: ]] و [[us-east-1: ]]. أي region جنبها [[i-0...]] يبقى فيه سيرفر شغال (أو stopped، والـ stopped لسه بيتحاسب على الديسك). عشان تشوف الحالة كمان غيّر الـ query لـ [[Reservations[].Instances[].[InstanceId,State.Name]]].

الأخطاء الشائعة: region طالعة [[An error occurred (AuthFailure)]] أو [[UnauthorizedOperation]]، وده غالبًا region مش مفعّلة (opt-in زي me-central-1) أو صلاحياتك ناقصة، مش سيرفر. والإيميل ميوصلش لأنك نسيت تأكد اشتراك SNS لو استخدمته بدل الإيميل المباشر.`,
          solCode: R`cat > budget.json <<'EOF'
{"BudgetName":"monthly","BudgetLimit":{"Amount":"5","Unit":"USD"},"BudgetType":"COST","TimeUnit":"MONTHLY"}
EOF
cat > notify.json <<'EOF'
[{"Notification":{"NotificationType":"FORECASTED","ComparisonOperator":"GREATER_THAN","Threshold":80,"ThresholdType":"PERCENTAGE"},
  "Subscribers":[{"SubscriptionType":"EMAIL","Address":"you@example.com"}]}]
EOF
aws budgets create-budget --account-id $(aws sts get-caller-identity --query Account --output text) --budget file://budget.json --notifications-with-subscribers file://notify.json`
        }
      ]
    }
  ]
});

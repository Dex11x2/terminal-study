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
    },
    {
      t: "IAM والدخول من الترمنال",
      l: 1,
      n: "مين بيدخل، وبيعمل إيه، ومن غير مفاتيح دايمة لو تقدر",
      items: [
        {
          cmd: "aws configure / login / sso",
          title: "وصّل الترمنال بحسابك، وبدّل بين أكتر من حساب",
          desc: R`AWS CLI v2 محتاج يعرف انت مين، وفيه ٣ طرق: [[aws login]] (دخول من المتصفح ومفاتيح مؤقتة)، و [[aws configure sso]] (لو فيه IAM Identity Center)، و [[aws configure]] بمفتاح دايم كآخر حل.

كل طريقة بتتحفظ في profile باسم. و [[--profile]] أو متغير [[AWS_PROFILE]] بيختار انت شغال بأنهي حساب، و [[sts get-caller-identity]] بيقولك انت مين فعلًا. و [[aws login]] محتاج CLI نسخة 2.32 أو أحدث.`,
          example: R`aws --version
aws login --profile personal
aws configure sso --profile work
aws sso login --profile work
aws configure list-profiles
export AWS_PROFILE=work
aws sts get-caller-identity
aws logout --profile personal`,
          try: "سطّب AWS CLI v2 واعمل [[aws login]]، وبعدها [[aws sts get-caller-identity]]. افتح [[~/.aws/config]] وشوف الـ profile اتكتب إزاي، ولاحظ إن مفيش access key دايم مكتوب في [[~/.aws/credentials]]؛ اللي في [[~/.aws/login/cache]] مفاتيح مؤقتة بتموت لوحدها.",
          deep: {
            why: "الغلطة اللي بتتكرر: access key دايم في [[~/.aws/credentials]] أو في .env، واتسرب في commit أو في لابتوب اتسرق، وفضل شغال لحد ما حد افتكر يمسحه. الطرق المؤقتة بتقلل الخطر: المفتاح بيموت لوحده بعد ساعات.",
            how: R`الـ CLI بيدوّر على الصلاحيات بالترتيب: الـ flags في الأمر، بعدين متغيرات البيئة ([[AWS_ACCESS_KEY_ID]] و [[AWS_PROFILE]])، بعدين الـ profile في [[~/.aws/config]] و [[~/.aws/credentials]]، وآخر حاجة صلاحيات الجهاز نفسه لو هو EC2 أو container على AWS (role). أول واحد يلاقيه بيستخدمه. عشان كده متغير بيئة قديم ممكن يخليك شغال على حساب غير اللي فاكره.

[[aws login]] بيفتح المتصفح، تسجّل دخول زي الكونسول، فيكتب في الـ config سطر [[login_session]]، ويحفظ مفاتيح مؤقتة في [[~/.aws/login/cache]] ويجددها لوحده لحد ١٢ ساعة. اليوزر محتاج الـ policy اللي اسمها [[SignInLocalDevelopmentAccess]] (الـ root مش محتاجها، بس متستخدموش).

[[configure sso]] بيسألك عن رابط Identity Center والحساب والـ role، وبعدها [[sso login]] كل ما الجلسة تخلص. ده الأنسب لو فيه فريق أو أكتر من حساب (dev و prod).

[[aws configure]] بيسأل ٤ أسئلة: Access Key و Secret و region و output، ويكتبهم في ملفين. استخدمه بس لو الأداة مش بتدعم الطرق التانية.

[[get-caller-identity]] بيرجّع رقم الحساب و ARN الهوية. عوّد نفسك تشغّله قبل أي أمر خطير: أنا على prod ولا dev؟`,
            when: "أول مرة تسطّب الـ CLI، وكل ما تبدّل بين حسابات أو عملاء.",
            mistakes: "تنسى [[export AWS_PROFILE=prod]] في ترمنال مفتوح وتمسح حاجة فاكرها في dev. وتحط [[AWS_ACCESS_KEY_ID]] في .env بتاع التطبيق على السيرفر، والتطبيق على EC2 أو ECS المفروض ياخد role مش مفاتيح. وتنسى [[--region]] فالأمر يروح للـ region الافتراضية وتفتكر الحاجة اتمسحت."
          },
          lines: [
            "اتأكد إنها v2 (لازم 2.32 أو أحدث عشان login).",
            "سجّل دخول من المتصفح في profile اسمه personal. المفاتيح مؤقتة وبتتجدد لوحدها.",
            "لو الشغل عليه IAM Identity Center: اربط profile اسمه work.",
            "افتح جلسة SSO (كل ما الجلسة تخلص).",
            "اعرض كل الـ profiles اللي عندك.",
            "كل الأوامر الجاية في الترمنال ده تروح لـ work.",
            "انت مين دلوقتي؟ رقم الحساب والـ ARN.",
            "امسح المفاتيح المؤقتة بتاعة personal."
          ],
          sol: R`بعد [[aws login]] و [[aws sts get-caller-identity]] هيطلع JSON فيه ٣ حاجات: [[UserId]] و [[Account]] (رقم حسابك، ١٢ رقم) و [[Arn]]. والـ ARN بيقولك انت مين: لو دخلت بيوزر هتلاقي [[arn:aws:iam::123456789012:user/ali]]، ولو بـ SSO أو role هتلاقي [[arn:aws:sts::123456789012:assumed-role/...]]. و [[aws login]] نفسه في الآخر بيطبع سطر زي [[Updated profile default to use arn:aws:... credentials.]]

وفي [[~/.aws/config]] هتلاقي section زي [[[profile personal]]] فيه [[login_session]] و [[region]]، ومفيش [[aws_access_key_id]]. و [[~/.aws/credentials]] يا إما مش موجود يا إما فاضي من الـ profile ده. ولو لقيت فيه [[aws_access_key_id = AKIA...]] يبقى ده مفتاح دايم من [[aws configure]] قديم: اتأكد إنه مش مستخدم وامسحه من IAM.

الأخطاء الشائعة: [[aws: error: argument command: Invalid choice ... login]] معناها نسخة الـ CLI أقدم من 2.32، حدّثها. و [[Unable to locate credentials]] بعد الدخول معناها إنك دخلت بـ [[--profile personal]] وبتشغّل الأمر من غير [[--profile]] ولا [[AWS_PROFILE]]، فالـ CLI بيدوّر على [[default]].`
        },
        {
          cmd: "IAM users و roles",
          title: "الفرق بين هوية لشخص وهوية لبرنامج",
          desc: R`IAM user هوية لشخص أو أداة ليها باسورد أو مفتاح دايم، و IAM role هوية مفيهاش أي باسورد، حد «بيلبسها» لفترة ويطلع بمفاتيح مؤقتة: سيرفر EC2، أو دالة Lambda، أو GitHub Actions، أو انت لما تدخل بـ SSO.

القاعدة: البشر يدخلوا بـ SSO أو login، والبرامج تاخد role. والـ role فيها جزئين: trust policy (مين مسموح يلبسها) و permissions policy (تعمل إيه لما تلبسها).`,
          example: R`aws iam create-role --role-name myapp-ec2 --assume-role-policy-document file://trust-ec2.json
aws iam attach-role-policy --role-name myapp-ec2 --policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
aws iam put-role-policy --role-name myapp-ec2 --policy-name s3-uploads --policy-document file://s3-uploads.json
aws iam create-instance-profile --instance-profile-name myapp-ec2
aws iam add-role-to-instance-profile --instance-profile-name myapp-ec2 --role-name myapp-ec2
aws sts get-caller-identity`,
          try: R`اكتب [[trust-ec2.json]] اللي بيسمح لخدمة EC2 تلبس الـ role: [[{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}]]. نفّذ الأوامر، واربط الـ instance profile بسيرفر تجربة، ومن جوه السيرفر شغّل [[aws sts get-caller-identity]] من غير أي configure: هتلاقيه عارف هو مين.`,
          deep: {
            why: "الطريقة القديمة: IAM user للتطبيق ومفتاحه في .env على السيرفر. المفتاح ده دايم، ولو السيرفر اتخترق أو الملف اتسرب، المهاجم معاه مفتاح شغال من أي مكان في الدنيا. الـ role بتحل ده: مفيش مفتاح مكتوب في أي مكان، والمفاتيح المؤقتة بتتجدد كل كام ساعة.",
            how: R`الـ role ليها نوعين policies. الـ trust policy بتقول مين يقدر يلبسها ([[sts:AssumeRole]]): خدمة زي [[ec2.amazonaws.com]] أو [[lambda.amazonaws.com]]، أو حساب تاني، أو GitHub عن طريق OIDC. والـ permissions policies بتقول تعمل إيه.

على EC2 الـ role بتتربط عن طريق «instance profile» (غلاف حوالين الـ role، في الكونسول بيتعمل لوحده). السيرفر بيسأل عنوان داخلي ([[169.254.169.254]]، اسمه IMDS) ويرجع بمفاتيح مؤقتة، والـ AWS SDK بيعمل ده لوحده. عشان كده الكود بيكتب [[new S3Client()]] من غير أي مفتاح.

فيه AWS managed policies زي [[AmazonSSMManagedInstanceCore]] (جاهزة، بتسمح للسيرفر يتدار بـ Session Manager من غير SSH)، و policies انت بتكتبها على قد احتياجك بالظبط (الدرس الجاي).

والـ groups بتجمع users وتحط الصلاحيات على الـ group بدل كل user لوحده. ولو بتستخدم Identity Center، الصلاحيات بتبقى «permission sets» هناك.`,
            when: "أي كود شغال على AWS (EC2 و ECS و Lambda) ياخد role. وأي CI (GitHub Actions) ياخد role عن طريق OIDC (المستوى ٣).",
            mistakes: "تدّي التطبيق [[AdministratorAccess]] «عشان يشتغل بس»، فأي ثغرة في التطبيق بقت تحكم كامل في الحساب. وتحط access key في .env على EC2 مع إن الـ role موجودة، فالمفتاح هو اللي بيتستخدم والـ role ملهاش لازمة. وتنسى إن تغيير الـ policy بياخد ثواني يوصل، فتجرّب على طول وتفتكره مش شغال."
          },
          lines: [
            "اعمل role، والـ trust policy بتقول: خدمة EC2 بس تقدر تلبسها.",
            "ادّيها policy جاهزة: السيرفر يتدار بـ Session Manager من غير SSH.",
            "وادّيها policy انت كاتبها: رفع وقراية في فولدر واحد في S3 بس.",
            "اعمل instance profile (ده اللي بيتربط بالسيرفر فعلًا).",
            "حط الـ role جوه الـ instance profile.",
            "من جوه السيرفر: هتلاقي الهوية assumed-role/myapp-ec2 من غير أي مفتاح."
          ],
          sol: R`من جوه السيرفر، [[aws sts get-caller-identity]] من غير أي configure المفروض يطلع [[Arn]] شكله [[arn:aws:sts::123456789012:assumed-role/myapp-ec2/i-0abc1234567890def]]: اسم الـ role، وبعده الـ instance id كاسم جلسة. ده دليل إن الـ CLI جاب مفاتيح مؤقتة من IMDS لوحده. وتقدر تشوف ده بنفسك بـ [[curl]] على IMDSv2 (تحت): هترجع اسم الـ role.

لو طلع [[Unable to locate credentials]] يبقى الـ instance profile مش مربوط (اربطه بـ [[aws ec2 associate-iam-instance-profile]] أو من الكونسول Modify IAM role)، أو اتربط من ثواني والصلاحيات لسه مانتشرتش. ولو [[create-instance-profile]] اشتغل بس الربط رجّع [[Invalid IAM Instance Profile name]] استنى ١٠ ثواني وجرّب تاني، لأن IAM eventually consistent. ولو الـ Arn طلع [[user/...]] يبقى فيه [[~/.aws/credentials]] أو متغيرات بيئة على السيرفر بتسبق الـ role، وده بالظبط اللي الدرس بيحذّر منه.`,
          solCode: R`cat > trust-ec2.json <<'EOF'
{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}
EOF
aws ec2 associate-iam-instance-profile --instance-id i-0abc1234567890def --iam-instance-profile Name=myapp-ec2
# من جوه السيرفر:
aws sts get-caller-identity --query Arn --output text
TOKEN=$(curl -s -X PUT http://169.254.169.254/latest/api/token -H "X-aws-ec2-metadata-token-ttl-seconds: 60")
curl -s -H "X-aws-ec2-metadata-token: $TOKEN" http://169.254.169.254/latest/meta-data/iam/security-credentials/`
        },
        {
          cmd: "IAM policy JSON",
          title: "اكتب صلاحية على قد الشغل بالظبط (least privilege)",
          desc: R`الـ policy ملف JSON فيه statements، كل واحد بيقول [[Effect]] (Allow أو Deny) و [[Action]] (زي [[s3:PutObject]]) و [[Resource]] (الـ ARN) واختياري [[Condition]].

least privilege معناها أقل صلاحية تخلي الشغل يمشي: أفعال محددة على موارد محددة. المثال بيسمح للتطبيق يرفع ويقرا في فولدر [[uploads/]] بس في bucket واحد، ويمنع المسح صراحةً.`,
          example: R`{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject"],
      "Resource": "arn:aws:s3:::myapp-assets/uploads/*"
    },
    {
      "Effect": "Deny",
      "Action": "s3:DeleteObject",
      "Resource": "arn:aws:s3:::myapp-assets/*"
    }
  ]
}`,
          try: R`طبّق الـ policy على role تجربة، وبعدين اسأل IAM من غير ما تجرّب فعلًا: [[aws iam simulate-principal-policy --policy-source-arn arn:aws:iam::123456789012:role/myapp-ec2 --action-names s3:DeleteObject --resource-arns arn:aws:s3:::myapp-assets/uploads/a.png]]. هتلاقي [[explicitDeny]]. جرّب [[s3:PutObject]] على [[avatars/a.png]] وشوف [[implicitDeny]].`,
          flag: "script",
          deep: {
            why: "لما تطبيقك يتخترق (وده بيحصل)، المهاجم بياخد صلاحيات التطبيق بالظبط. لو التطبيق عنده [[s3:*]] على كل حاجة، هيمسح الباك أب وينزّل بيانات العملاء. لو عنده PutObject على فولدر واحد، أقصى حاجة يعملها يرفع ملفات.",
            how: R`كل طلب لـ AWS بيتقيّم كده: الافتراضي «ممنوع» (implicit deny). لو فيه Allow يغطي الطلب يبقى مسموح، إلا لو فيه Deny صريح في أي policy، ساعتها ممنوع مهما كان فيه Allow. يعني: Deny صريح > Allow > ممنوع افتراضي.

ده بيخلي الـ Deny أداة أمان قوية: حتى لو حد بعدين ضاف policy فيها [[s3:*]]، الـ Deny بتاع المسح لسه شغال.

الـ ARN عنوان أي حاجة في AWS: [[arn:aws:SERVICE:REGION:ACCOUNT:RESOURCE]]. في S3 الـ region ورقم الحساب فاضيين لأن اسم الـ bucket فريد في الدنيا كلها. وخلي بالك: [[arn:aws:s3:::myapp-assets]] هو الـ bucket نفسه (لأفعال زي [[s3:ListBucket]])، و [[arn:aws:s3:::myapp-assets/*]] هو الملفات اللي جواه. دي أشهر لخبطة.

[[Version]] دايمًا [[2012-10-17]] (ده إصدار لغة الـ policy مش تاريخ). و [[Condition]] بتضيف شروط زي لازم HTTPS ([[aws:SecureTransport]]) أو من IP معين. ولو مش عارف التطبيق محتاج إيه، IAM Access Analyzer بيقدر يولّد policy من اللي التطبيق استخدمه فعلًا.`,
            when: "كل role لتطبيق أو CI. ابدأ بالأفعال اللي الكود بينادي عليها فعلًا، وزوّد لما يطلع AccessDenied واضح.",
            mistakes: R`[["Action": "*", "Resource": "*"]] عشان تخلص. وتكتب [[myapp-assets]] من غير [[/*]] فالـ PutObject يفضل مرفوض ومش فاهم ليه. ومتستعجلش: AccessDenied بيتحل بقراية الرسالة (فيها الـ action والـ resource اللي اترفضوا)، مش بإنك تدّي Admin.`
          },
          lines: [
            "بداية الـ policy.",
            "إصدار لغة الـ policy، ودايمًا بالقيمة دي.",
            "قايمة القواعد.",
            "القاعدة الأولى.",
            "اسمح.",
            "بالرفع والقراية بس.",
            "على الملفات جوه فولدر uploads في الـ bucket ده بس.",
            "نهاية القاعدة الأولى.",
            "القاعدة التانية.",
            "امنع صراحةً (بتكسب أي Allow في أي policy تانية).",
            "مسح الملفات.",
            "في الـ bucket كله.",
            "نهاية القاعدة التانية.",
            "نهاية القايمة.",
            "نهاية الـ policy."
          ],
          sol: R`التلات أسئلة ونتيجتهم (بـ [[--query]] عشان يطلع الـ decision بس):

[[s3:DeleteObject]] على [[uploads/a.png]] = [[explicitDeny]]: فيه statement فيه [[Deny]] بيغطي [[myapp-assets/*]]، والـ Deny بيكسب أي Allow.
[[s3:PutObject]] على [[uploads/a.png]] = [[allowed]].
[[s3:PutObject]] على [[avatars/a.png]] = [[implicitDeny]]: مفيش Allow بيغطي المسار ده، ومفيش Deny كمان، فبيقع في «ممنوع افتراضي».

الفرق بين الاتنين هو الدرس كله: [[implicitDeny]] بيتحل بإنك تضيف Allow، إنما [[explicitDeny]] مش هيتحل غير لو شلت الـ Deny نفسه. ولو [[PutObject]] على [[uploads/]] طلع [[implicitDeny]] عندك، غالبًا الـ policy مش مربوطة بالـ role اللي في [[--policy-source-arn]]، أو كتبت الـ Resource من غير [[/*]]. ولو الأمر رجّع [[NoSuchEntity]] يبقى الـ role مش موجودة بالاسم ده أو رقم الحساب في الـ ARN مش بتاعك (استبدل [[123456789012]] برقمك).`,
          solCode: R`aws iam put-role-policy --role-name myapp-ec2 --policy-name s3-uploads --policy-document file://s3-uploads.json
ROLE=arn:aws:iam::123456789012:role/myapp-ec2
aws iam simulate-principal-policy --policy-source-arn $ROLE --action-names s3:DeleteObject --resource-arns arn:aws:s3:::myapp-assets/uploads/a.png --query "EvaluationResults[].EvalDecision" --output text
# explicitDeny
aws iam simulate-principal-policy --policy-source-arn $ROLE --action-names s3:PutObject --resource-arns arn:aws:s3:::myapp-assets/uploads/a.png --query "EvaluationResults[].EvalDecision" --output text
# allowed
aws iam simulate-principal-policy --policy-source-arn $ROLE --action-names s3:PutObject --resource-arns arn:aws:s3:::myapp-assets/avatars/a.png --query "EvaluationResults[].EvalDecision" --output text
# implicitDeny`
        }
      ]
    },
    {
      t: "Regions والخدمات",
      l: 1,
      n: "السيرفر بتاعك في مكان حقيقي على الخريطة، والخدمات دي اللي هتقابلها في كل مشروع",
      items: [
        {
          cmd: "regions و AZs",
          title: "تحط مشروعك في أنهي مكان في الدنيا",
          desc: R`الـ region مدينة فيها data centers (زي [[eu-central-1]] في فرانكفورت)، وجواها ٣ Availability Zones أو أكتر: مباني منفصلة بكهربا وشبكة منفصلة، عشان لو واحدة وقعت التانية تكمّل.

لمستخدمين في مصر، أقرب regions: [[me-central-1]] (الإمارات) و [[me-south-1]] (البحرين) و [[il-central-1]] و [[eu-south-1]] (ميلانو)، ودول لازم تفعّلهم الأول (opt-in). و [[eu-central-1]] مفعّلة افتراضي وفيها كل الخدمات. متخمّنش: قيس الـ latency من عند المستخدمين بتوعك.`,
          example: R`for r in eu-central-1 eu-south-1 me-central-1 me-south-1; do
  echo "$r $(curl -o /dev/null -s -w '%{time_connect}' https://ec2.$r.amazonaws.com)"
done
aws account list-regions --region-opt-status-contains ENABLED_BY_DEFAULT ENABLED --query "Regions[].RegionName"
aws ec2 describe-availability-zones --region eu-central-1 --query "AvailabilityZones[].ZoneName"`,
          try: "شغّل الـ loop من جهازك ٣ مرات في أوقات مختلفة وسجّل الأرقام. لو عندك VPS في مكان تاني، شغّله من هناك كمان وقارن.",
          deep: {
            why: "كل طلب بيسافر من المستخدم للسيرفر ويرجع. لو السيرفر في أمريكا والمستخدم في القاهرة، كل رحلة حوالي ١٥٠ مللي ثانية أو أكتر، وصفحة فيها ١٠ طلبات ورا بعض بتحس بيها. والـ region كمان بتحدد السعر، والخدمات المتاحة، ومكان البيانات قانونيًا.",
            how: R`كل region مستقلة تمامًا عن التانية: سيرفر في فرانكفورت مش شايف قاعدة بيانات في البحرين إلا لو ربطتهم. معظم الخدمات «regional»، إلا شوية «global» زي IAM و CloudFront و Route 53.

الـ AZ مبنى أو أكتر جوه الـ region، ومتوصلين ببعض بشبكة سريعة جدًا. اسمها زي [[eu-central-1a]]. عشان الـ high availability بتحط نسختين من التطبيق في AZs مختلفة، وقاعدة البيانات Multi-AZ (المستوى ٣).

الـ regions اللي اتعملت بعد مارس ٢٠١٩ (زي البحرين والإمارات وميلانو) مقفولة افتراضي، ولازم تفعّلها من Account settings قبل ما تستخدمها. وفيه region في السعودية معلن عنها، فاتأكد من القايمة الرسمية قبل ما تعتمد عليها.

الـ loop بيقيس وقت فتح اتصال TCP مع endpoint في كل region، وده تقريبًا زمن رحلة واحدة. مش دقيق زي أداة متخصصة، بس كفاية تقارن. والأسعار بتختلف: نفس السيرفر في فرانكفورت أو البحرين أغلى من [[us-east-1]].

ولو معظم الترافيك ملفات ثابتة (صور و JS و CSS)، الـ region بتفرق أقل، لأن CDN زي CloudFront أو Cloudflare بيقدّمها من أقرب نقطة للمستخدم.`,
            when: "قبل أول resource في المشروع، لأن نقل قاعدة بيانات من region لتانية بعدين شغل تقيل.",
            mistakes: "تسيب الكونسول على region غلط وتعمل كل حاجة هناك من غير ما تاخد بالك. وتحط التطبيق في region وقاعدة البيانات في region تانية، فكل query بتعدي بحر. وتختار region لأنها «الأقرب على الخريطة» من غير ما تقيس، والكابلات البحرية مش بتمشي خط مستقيم."
          },
          lines: [
            "لف على ٤ regions قريبة من مصر.",
            "اطبع اسم الـ region ووقت فتح الاتصال (بالثواني) مع endpoint فيها.",
            "نهاية الـ loop.",
            "الـ regions المفعّلة في حسابك (الافتراضية واللي فعّلتها).",
            "الـ AZs اللي في فرانكفورت."
          ],
          sol: R`كل سطر هيطبع اسم الـ region وجنبه وقت فتح الاتصال بالثواني، زي [[eu-central-1 0.061]]. الأرقام الحقيقية بتفرق حسب مزوّد الإنترنت، بس من مصر الشكل المتوقع: فرانكفورت وميلان (eu-central-1 و eu-south-1) غالبًا الأقرب في حدود ٥٠ لـ ٩٠ مللي، والخليج (me-central-1 في الإمارات و me-south-1 في البحرين) ممكن يطلعوا أقرب أو أبعد حسب مسار الكابلات، مش حسب المسافة على الخريطة. وده ليه بتقيس ٣ مرات: رقم واحد ممكن يكون صدفة زحمة.

من VPS في أوروبا الأرقام هتبقى أصغر بكتير (١٠ لـ ٣٠ مللي لفرانكفورت)، وده بيوضّح إن اللي يهم هو مكان اليوزرز مش مكانك انت.

لو سطر طلع [[0.000000]] يبقى الاتصال فشل (DNS أو region انت مش واصل لها)، مش إنه سريع جدًا. واختيار الـ region مش على الـ latency بس: الأسعار (الخليج أغلى شوية) وتوفر الخدمات وقوانين حفظ البيانات بيفرقوا كمان. وأمر [[list-regions]] ممكن ميعرضش me-central-1 لو هي opt-in ومش مفعّلة عندك.`
        },
        {
          cmd: "الخدمات الأساسية",
          title: "خريطة AWS: الخدمات اللي في كل مشروع تقريبًا",
          desc: R`AWS فيها أكتر من ٢٠٠ خدمة بس أغلب المشاريع بتستخدم نفس العشرة: EC2 و S3 و RDS و Lambda و ECS و CloudFront و Route 53 و IAM و CloudWatch و SES أو SQS.

كل خدمة ليها أوامر [[describe]] أو [[list]] في الـ CLI. و [[--query]] بيطلّع الجزء اللي انت عايزه من الـ JSON، و [[--output table]] بيعرضه جدول.`,
          example: R`aws ec2 describe-instances --query "Reservations[].Instances[].[InstanceId,InstanceType,State.Name]" --output table
aws s3 ls
aws rds describe-db-instances --query "DBInstances[].[DBInstanceIdentifier,DBInstanceStatus]" --output table
aws lambda list-functions --query "Functions[].[FunctionName,Runtime]" --output table
aws cloudfront list-distributions --query "DistributionList.Items[].[Id,DomainName]" --output text
aws route53 list-hosted-zones --query "HostedZones[].Name"`,
          try: "شغّل الأوامر على حسابك حتى لو فاضي. بعدين اكتب أمر لوحدك يعرض أسماء الـ log groups في CloudWatch بـ [[aws logs describe-log-groups]] و [[--query]].",
          deep: {
            why: "الكونسول بيخبّي الصورة الكبيرة: كل خدمة في صفحة، وكل region لوحدها. لما تعرف الخريطة وتقدر تسأل كل خدمة من الترمنال، تعرف عندك إيه شغال وبيتحاسب في دقيقة.",
            how: R`قسّم الخدمات لمجموعات:
compute: EC2 (سيرفر كامل)، و ECS/Fargate (containers)، و Lambda (دوال).
storage: S3 (ملفات من غير حدود)، و EBS (ديسك لسيرفر EC2).
databases: RDS و Aurora (SQL)، و DynamoDB (NoSQL)، و ElastiCache (Redis).
network: VPC (شبكتك الخاصة)، و ALB (load balancer)، و CloudFront، و Route 53.
security: IAM، و Secrets Manager، و KMS (مفاتيح التشفير)، و ACM (شهادات SSL ببلاش).
observability: CloudWatch (لوجات ومقاييس وإنذارات)، و CloudTrail (مين عمل إيه في الحساب).
messaging: SQS (طابور)، و SNS (إشعارات)، و SES (إيميل)، و EventBridge (أحداث وجدولة).

الرد الافتراضي JSON طويل. [[--query]] بيستخدم لغة اسمها JMESPath: [[Reservations[].Instances[].InstanceId]] يعني «فك القوايم دي وهات الحقل ده»، و [[.[InstanceId, State.Name] ]] بعد النقطة يعني «هات الحقلين دول بس»، و [[?State.Name=='running']] فلتر. و [[--output]] يا [[json]] يا [[table]] يا [[text]] (الأخير للسكربتات).

و S3 و CloudFront و Route 53 و IAM بيردوا نفس النتيجة من أي region، والباقي بيرد عن الـ region الحالية بس.`,
            when: "لما تستلم حساب AWS من حد، أو ترجع لحساب قديم ومش فاكر عليه إيه، أو قبل ما تكتب سكربت يعدي على الموارد.",
            mistakes: "تفتكر إن الـ CLI بيعرض كل حاجة، وهو بيعرض الـ region الحالية بس. وتكتب سكربتات بتقرا [[--output table]] بـ grep وهي معمولة للعين: للسكربتات [[--output text]] أو [[json]] مع jq. وتتوه في أسماء الخدمات: ابدأ من السؤال «أنا محتاج أخزّن ولا أشغّل ولا أوصّل؟»."
          },
          lines: [
            "السيرفرات: الرقم والنوع والحالة، في جدول.",
            "كل الـ buckets في الحساب (من أي region).",
            "قواعد البيانات في RDS وحالتها.",
            "دوال Lambda ونسخة الـ runtime بتاعة كل واحدة.",
            "الـ CDN: رقم كل distribution والدومين بتاعه.",
            "الدومينات اللي على Route 53."
          ],
          sol: R`على حساب فاضي، الأوامر مش هترجّع خطأ، هترجّع فاضي: الـ table من غير صفوف، و [[aws s3 ls]] مش هيطبع حاجة، و [[route53]] يطبع [[[]]]. ده المتوقع، مش مشكلة. ولو أي أمر رجّع [[AccessDenied]] يبقى هويتك ناقصها صلاحية قراءة للخدمة دي.

وأمر الـ log groups ممكن يبقى كده:

[[aws logs describe-log-groups --query "logGroups[].logGroupName" --output table]]

على حساب جديد غالبًا فاضي، ولو عملت Lambda قبل كده هتلاقي [[/aws/lambda/hello]]. والغلطة الشائعة هنا إن حرف الـ query بيفرق: [[logGroups]] بـ g صغيرة، مش [[LogGroups]] زي [[Reservations]] في EC2. كل خدمة ليها شكل رد مختلف، فشغّل الأمر من غير [[--query]] الأول وشوف أسماء الحقول، وبعدين اكتب الـ query. ولو الـ table طلع فاضي في حساب فيه Lambdas، اتأكد من الـ region.`,
          solCode: R`aws logs describe-log-groups --query "logGroups[].logGroupName" --output table
aws logs describe-log-groups --query "logGroups[].[logGroupName,retentionInDays,storedBytes]" --output table`
        }
      ]
    },
    {
      t: "S3 و CloudFront",
      l: 2,
      n: "الملفات مكانها object storage مش ديسك السيرفر، والـ CDN بيوصّلها بسرعة لأي حد",
      items: [
        {
          cmd: "aws s3",
          title: "مخزن ملفات مالوش آخر، ومقفول افتراضي",
          desc: R`S3 بيخزّن objects (ملف ومعاه key زي [[uploads/42/avatar.png]]) جوه bucket، من غير حد للحجم الكلي، وبتدفع على الجيجا المخزنة والطلبات والنقل برا AWS.

أي bucket جديد مقفول افتراضي: Block Public Access شغال بإعداداته الأربعة، والـ ACLs مقفولة. خليه كده، واللي عايزه يتعرض للناس قدّمه من CloudFront أو بـ presigned URL.`,
          example: R`aws s3 mb s3://myapp-assets --region eu-central-1
aws s3api get-public-access-block --bucket myapp-assets
aws s3 cp ./logo.png s3://myapp-assets/public/logo.png
aws s3 ls s3://myapp-assets/ --recursive --human-readable
aws s3 cp s3://myapp-assets/public/logo.png ./downloaded.png
aws s3 presign s3://myapp-assets/public/logo.png --expires-in 600`,
          try: "اعمل bucket باسم فريد (الأسماء عالمية، فحط اسمك أو رقم فيه)، وارفع صورة، وافتح رابطها العادي [[https://myapp-assets.s3.eu-central-1.amazonaws.com/public/logo.png]] في المتصفح: هيطلع AccessDenied. بعدين افتح الرابط اللي طلّعه [[presign]].",
          deep: {
            why: "لو المستخدمين بيرفعوا ملفات على ديسك السيرفر، السيرفر بقى «مش قابل للاستبدال»: مينفعش تشغّل نسختين، ولو الديسك باظ الملفات راحت، ولو نقلت لازم تنقلها. S3 بيفصل الملفات عن السيرفر: أي نسخة من التطبيق تقرا وتكتب نفس المكان، و AWS بيخزّن كل ملف في أكتر من AZ.",
            how: R`اسم الـ bucket فريد على مستوى العالم (مش حسابك بس)، وبيبقى جزء من الدومين، فحروف صغيرة وأرقام وشرطة بس. ومفيش فولدرات حقيقية: الـ [[/]] جزء من اسم الـ key، والكونسول بس بيعرضها كأنها فولدرات.

[[aws s3]] أوامر عالية المستوى زي [[cp]] و [[ls]] و [[sync]]. و [[aws s3api]] بيكلّم الـ API مباشرة بكل الإعدادات. الاتنين بيكمّلوا بعض.

الـ Block Public Access أربع إعدادات: [[BlockPublicAcls]] و [[IgnorePublicAcls]] (ميسمحش بـ ACL عامة ولا يعمل بيها)، و [[BlockPublicPolicy]] و [[RestrictPublicBuckets]] (ميسمحش بـ bucket policy بتفتح للكل). ممكن تتحط على مستوى الحساب كله، ودي أقوى حماية. ولو [[get-public-access-block]] رجّع الأربعة [[true]]، محدش يقدر يفتح الـ bucket بالغلط.

[[presign]] بيعمل رابط فيه توقيع ومدة (هنا ١٠ دقايق): اللي معاه الرابط يقرا الملف ده بس لحد ما المدة تخلص، والـ bucket لسه مقفول. من الـ CLI أو الـ SDK أقصى مدة ٧ أيام، ولو اتعمل بمفاتيح مؤقتة (role) بيموت لما المفاتيح تموت.

و S3 فيه storage classes: Standard للعادي، و Intelligent-Tiering بينقل الملفات اللي محدش بيفتحها لطبقة أرخص لوحده، و Glacier للأرشيف.`,
            when: "أي ملف المستخدم بيرفعه، وأي ملف التطبيق بيولّده (PDF، وشهادات، وتقارير)، والباك أب، وملفات الموقع الـ static.",
            mistakes: "في مشروع حقيقي كانت ملفات الـ CV اللي المتقدمين بيرفعوها في bucket عام وبيتجاب لها public URL: أي حد يلاقي الرابط يشوف بيانات شخصية. الملفات الخاصة مكانها bucket مقفول وتتفتح بـ signed URL لمدة قصيرة لليوزر المسموح له بس. وغلطة تانية: تفتح Block Public Access عشان «الصور مش ظاهرة» بدل ما تحط CloudFront قدامها."
          },
          lines: [
            "اعمل bucket في فرانكفورت (الاسم لازم يبقى فريد في الدنيا كلها).",
            "اتأكد إن الإعدادات الأربعة لمنع الوصول العام [[true]].",
            "ارفع ملف. [[public/]] جزء من الاسم مش فولدر حقيقي.",
            "اعرض كل اللي في الـ bucket بأحجام مقروءة.",
            "نزّل ملف من S3 لجهازك.",
            "رابط مؤقت لمدة ١٠ دقايق للملف ده بس، والـ bucket لسه مقفول."
          ],
          sol: R`الأوامر بتطبع بالترتيب تقريبًا: [[make_bucket: myapp-assets-ali-7]]، وبعدين JSON فيه الأربع قيم [[BlockPublicAcls]] و [[IgnorePublicAcls]] و [[BlockPublicPolicy]] و [[RestrictPublicBuckets]] كلهم [[true]] (ده الافتراضي للـ buckets الجديدة)، وبعدين [[upload: ./logo.png to s3://.../public/logo.png]]، و [[ls]] بيطبع سطر فيه التاريخ والحجم زي [[4.2 KiB public/logo.png]].

الرابط العادي في المتصفح هيرجّع XML فيه [[<Code>AccessDenied</Code>]]، لأن الـ bucket مقفول ومفيش توقيع. والرابط اللي [[presign]] طلّعه طويل وفيه [[X-Amz-Algorithm=AWS4-HMAC-SHA256]] و [[X-Amz-Expires=600]] و [[X-Amz-Signature=...]]، وبيفتح الصورة. وبعد ١٠ دقايق نفس الرابط بيرجّع [[Request has expired]].

أخطاء شائعة: [[BucketAlreadyExists]] يعني الاسم محجوز عند حد تاني في الدنيا، زوّد اسمك أو رقم. ولو فتحت رابط المثال نفسه ([[myapp-assets]]) من غير ما تغيّر الاسم هتلاقي [[NoSuchBucket]] مش AccessDenied، لأن الـ bucket ده مش موجود أصلًا. ولو الـ presign اتعمل بمفاتيح مؤقتة (login أو SSO)، الرابط بيحتوي [[X-Amz-Security-Token]] وبيموت مع الجلسة حتى لو [[--expires-in]] أطول. ولو رجّع [[SignatureDoesNotMatch]] اتأكد إن الـ region في الأمر هي region الـ bucket.`
        },
        {
          cmd: "presigned URL",
          title: "المتصفح يرفع الملف على S3 من غير ما يعدي على سيرفرك",
          desc: R`بدل ما الملف يعدي من المتصفح لسيرفرك وبعدين لـ S3، السيرفر بيعمل «إذن رفع» مؤقت (URL موقّع) لملف واحد باسم ونوع محددين، والمتصفح يرفع عليه مباشرة بـ PUT.

السيرفر بيتحقق من اليوزر والنوع ويختار الاسم، و S3 بيشيل الملف نفسه. وفي المتصفح: [[await fetch(url, { method: "PUT", headers: { "Content-Type": file.type }, body: file })]] وبعدها يبعت الـ [[key]] للـ API.`,
          example: R`import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";

const s3 = new S3Client({ region: "eu-central-1", requestChecksumCalculation: "WHEN_REQUIRED" });
const ALLOWED = ["image/png", "image/jpeg", "application/pdf"];

app.post("/uploads/sign", requireAuth, async (req, res) => {
  if (!ALLOWED.includes(req.body.contentType)) return res.status(400).json({ error: "type" });
  const key = $__btuploads/$__{req.user.id}/$__{randomUUID()}$__bt;
  const cmd = new PutObjectCommand({ Bucket: "myapp-assets", Key: key, ContentType: req.body.contentType });
  const url = await getSignedUrl(s3, cmd, { expiresIn: 300, signableHeaders: new Set(["content-type"]) });
  res.json({ url, key });
});`,
          try: R`شغّل الـ route، وخد الـ url وارفع بيه من الترمنال: [[curl -X PUT -H "Content-Type: image/png" --upload-file logo.png "URL"]]. جرّب نفس الـ URL بنوع [[image/gif]] وشوف SignatureDoesNotMatch. وبعدين جرّبه من المتصفح بـ fetch، وهتقابل CORS: ظبطه بـ [[aws s3api put-bucket-cors --bucket myapp-assets --cors-configuration file://cors.json]] واسمح بـ PUT من دومينك بس.`,
          flag: "script",
          deep: {
            why: "رفع الملفات عن طريق السيرفر بياكل رام وباندويدث ووقت: الطلب ماسك اتصال لحد ما الملف كله يوصل، وبعدين السيرفر يرفعه تاني. وفي Vercel جسم الطلب ليه حد ٤.٥ ميجا، وفي Lambda ٦ ميجا. الـ presigned URL بيخلّي كل واحد يعمل شغله: السيرفر يقرر، و S3 يستقبل.",
            how: R`[[getSignedUrl]] مش بيكلّم S3 خالص. بيحسب توقيع (SigV4) بالمفاتيح اللي السيرفر شايلها (يفضل role) على: الـ method (PUT)، والـ bucket، والـ key، ووقت الانتهاء. والـ Content-Type بيدخل في التوقيع بس لو طلبته: SDK v3 افتراضيًا بيشيله من التوقيع، عشان كده المثال بيبعت [[signableHeaders: new Set(["content-type"])]]؛ من غيرها أي نوع هيعدي. التوقيع ده بيتحط في الـ query string بتاع الـ URL.

لما المتصفح يعمل PUT، S3 بيعيد نفس الحساب. لو أي حاجة اتغيرت (اسم تاني، نوع تاني، المدة خلصت) التوقيع مش هيطابق والطلب يترفض. عشان كده المتصفح لازم يبعت نفس [[Content-Type]] اللي اتوقّع.

الـ URL بيشتغل بصلاحيات اللي وقّعه. لو الـ role بتاعة السيرفر مش معاها [[s3:PutObject]] على [[uploads/*]]، الرفع هيترفض حتى لو التوقيع سليم.

المتصفح بيرفع على دومين تاني (S3)، فلازم CORS على الـ bucket: [[AllowedOrigins]] دومينك، و [[AllowedMethods]] فيها [[PUT]]، و [[AllowedHeaders]] فيها [[content-type]].

بعد الرفع، المتصفح يبعت الـ [[key]] للـ API، والسيرفر يتأكد إنه بيبدأ بـ [[uploads/USER_ID/]] بتاع اليوزر ده وإن الملف موجود ([[HeadObject]]) قبل ما يحفظه في قاعدة البيانات. والقراية بعدين بـ presigned GET أو CloudFront.

الـ PUT الواحد أقصاه ٥ جيجا، وللملفات الأكبر فيه multipart upload بأكتر من URL.`,
            when: "أي رفع من المتصفح أو الموبايل: صور، وفيديوهات، و PDF، وإثبات دفع. خصوصًا لو السيرفر صغير أو serverless.",
            mistakes: R`في مشروع حقيقي كان الـ backend بيستقبل الفيديوهات بـ multer في الرام ([[memoryStorage]]) بحد ١٠٠ ميجا، وملفات PDF لحد ٥٠٠ ميجا، وبعدين يرفعها للـ storage. كام رفعة في نفس الوقت على سيرفر ١ جيجا رام كفاية توقّع الـ process. تاني غلطة: تسيب المتصفح يختار الـ key فيكتب فوق ملف حد تاني. تالت: [[expiresIn]] بالساعات بدل الدقايق. رابع: الـ PUT الموقّع مبيحددش حجم أقصى، فلو محتاج حد استخدم presigned POST مع [[content-length-range]].`
          },
          lines: [
            "كلاينت S3 والأمر اللي هنوقّعه.",
            "الدالة اللي بتوقّع من غير ما تكلّم S3.",
            "عشان أسامي ملفات عشوائية مبتتكررش.",
            "الكلاينت مرة واحدة، وبياخد صلاحياته من الـ role. و WHEN_REQUIRED عشان الـ SDK ميحطّش checksum لملف فاضي في الـ URL فالرفع يفشل.",
            "الأنواع المسموحة بس.",
            "route محمي: لازم اليوزر يبقى مسجّل دخول.",
            "نوع مش مسموح؟ ارفض.",
            "السيرفر هو اللي يختار الاسم: فولدر لكل يوزر واسم عشوائي.",
            "وصف الرفع: الـ bucket والاسم والنوع (المتصفح لازم يبعت نفس النوع).",
            "وقّع لمدة ٥ دقايق، وخلّي الـ Content-Type جزء من التوقيع (SDK v3 مش بيوقّعه لوحده).",
            "رجّع الـ URL والـ key للمتصفح.",
            "قفلة الـ route."
          ],
          sol: R`الـ route بيرجّع JSON فيه [[key]] زي [[uploads/42/0e2027a6-...]] و [[url]] فيه [[X-Amz-SignedHeaders=content-type%3Bhost]]، يعني الـ Content-Type داخل في التوقيع. وطلب بنوع [[image/gif]] للـ route نفسه بيرجع [[400 {"error":"type"}]] من السيرفر. والرفع بـ curl بنوع [[image/png]] يرجّع 200 من غير body، والملف يظهر في [[aws s3 ls s3://myapp-assets/uploads/42/]]. ولو غيّرت الـ header في curl لـ [[image/gif]] على نفس الـ URL، S3 يرجّع 403 [[SignatureDoesNotMatch]].

مهم: نسخ SDK v3 من أول 3.729 بتحسب checksum تلقائي، ومع الـ presign مفيش body وقت التوقيع، فالـ URL بيطلع فيه [[x-amz-checksum-crc32=AAAAAA%3D%3D]] (checksum لملف فاضي)، وأي رفع لملف حقيقي عليه بيفشل برسالة checksum. جرّبتها على 3.1143 والـ URL طلع فيه السطر ده فعلًا. الحل اللي في المثال دلوقتي: [[requestChecksumCalculation: "WHEN_REQUIRED"]] في الـ [[S3Client]]، وبعدها الـ URL بيطلع من غير checksum.

الـ CORS: من المتصفح من غير CORS هتشوف في الـ console [[blocked by CORS policy]] والطلب نفسه اتبعت كـ preflight [[OPTIONS]] واترفض. بعد [[put-bucket-cors]] بالملف اللي تحت، الـ fetch يعدّي. ولو حطيت [[AllowedOrigins: ["*"]]] هيشتغل برضه، بس ده بيسمح لأي موقع يستخدم روابطك.`,
          solCode: R`cat > cors.json <<'EOF'
{
  "CORSRules": [{
    "AllowedOrigins": ["https://myapp.example.com", "http://localhost:5173"],
    "AllowedMethods": ["PUT"],
    "AllowedHeaders": ["content-type"],
    "MaxAgeSeconds": 3000
  }]
}
EOF
aws s3api put-bucket-cors --bucket myapp-assets --cors-configuration file://cors.json
aws s3api get-bucket-cors --bucket myapp-assets`
        },
        {
          cmd: "S3 + CloudFront",
          title: "ارفع build بتاع React وقدّمه من CDN",
          desc: R`موقع static (Vite أو React أو Next.js بـ [[output: 'export']]) مجرد ملفات، والطريقة الحديثة: bucket مقفول و CloudFront قدامه بيقرا منه عن طريق OAC (Origin Access Control)، فتاخد HTTPS ودومين وكاش في كل العالم.

الملفات اللي أسماءها فيها hash ([[assets/index-a1b2c3.js]]) كاشها سنة، و [[index.html]] من غير كاش، عشان أول ما ترفع نسخة جديدة الناس تشوفها.`,
          example: R`npm run build
aws s3 sync ./dist/assets s3://myapp-site/assets --cache-control "public,max-age=31536000,immutable"
aws s3 cp ./dist/index.html s3://myapp-site/index.html --cache-control "no-cache"
aws cloudfront create-invalidation --distribution-id E1ABCDEF2GHIJK --paths "/index.html"`,
          try: "اعمل distribution من الكونسول: الـ origin هو الـ bucket، واختار Origin access control (الكونسول بيعرض يحدّث الـ bucket policy)، و Default root object [[index.html]]. ارفع بالأوامر وافتح رابط cloudfront.net. بعدين افتح [[/about]] مباشرة وشوف هيحصل إيه.",
          deep: {
            why: "S3 عنده «static website hosting» قديم، بس ده HTTP بس ومحتاج الـ bucket يبقى عام. CloudFront بيحل الاتنين: HTTPS بشهادة ببلاش من ACM، والـ bucket يفضل مقفول ومحدش يوصله غير CloudFront، والملفات بتتقدّم من أقرب نقطة للزائر.",
            how: R`OAC بيخلّي CloudFront يوقّع طلباته لـ S3. والـ bucket policy بتسمح لخدمة [[cloudfront.amazonaws.com]] تعمل [[s3:GetObject]] بشرط إن [[AWS:SourceArn]] هو الـ distribution بتاعك بس. يعني حتى لو حد عرف اسم الـ bucket مش هيقدر يقرا منه مباشرة. (OAI القديم لسه موجود، بس AWS بتنصح بـ OAC.)

مشكلة الـ SPA: لما حد يفتح [[/about]] مباشرة، CloudFront بيطلب [[about]] من S3، والملف مش موجود. ولأن الـ bucket مقفول، S3 بيرجّع 403 مش 404. الحل في Custom error responses: 403 و 404 يرجّعوا [[/index.html]] بكود 200، و React Router يكمّل.

ترتيب الرفع مهم: الـ assets الأول ثم [[index.html]]. لو عكست، فيه لحظة [[index.html]] الجديدة بتطلب ملف JS لسه مترفعش. والملفات القديمة في [[assets/]] سيبها شوية، لأن حد فاتح الصفحة القديمة لسه بيطلبها.

[[Cache-Control]] اللي بتحطه على الـ object بيرجع مع الملف، و CloudFront والمتصفح بيحترموه (في حدود الـ cache policy). [[immutable]] بيقول للمتصفح «متسألش تاني خالص»، وده آمن لأن أي تعديل بيطلع اسم جديد.

وباقي الملفات ([[favicon.ico]] و [[robots.txt]]): [[aws s3 sync ./dist s3://myapp-site --exclude "assets/*" --exclude index.html]].`,
            when: "أي frontend مش محتاج server rendering: لوحة تحكم، أو landing page، أو موقع Vite. أرخص وأسرع من تشغيله على سيرفر.",
            mistakes: "تفعّل static website hosting وتفتح الـ bucket للعامة عشان «أسهل». وتنسى الـ custom error responses، فالموقع شغال من الرئيسية بس وأي refresh على صفحة داخلية يطلع AccessDenied. وترفع [[index.html]] بكاش طويل، فالناس تفضل تشوف النسخة القديمة أيام. وتعمل invalidation لـ [[/*]] مع كل رفعة بدل ما تعتمد على الأسماء اللي فيها hash."
          },
          lines: [
            "ابني الموقع في dist.",
            "ارفع الـ assets (أسماءها فيها hash) بكاش سنة، و immutable.",
            "ارفع index.html في الآخر، من غير كاش.",
            "قول لـ CloudFront يرمي نسخته القديمة من index.html بس."
          ],
          sol: R`بعد الرفع، رابط [[https://dXXXX.cloudfront.net/]] المفروض يفتح الموقع (بسبب Default root object). بس [[/about]] مباشرة هيرجّع XML فيه [[<Code>AccessDenied</Code>]] بكود 403، مش 404، لأن CloudFront بيطلب ملف اسمه [[about]] من S3، والملف مش موجود، والـ bucket مقفول ومفيش [[s3:ListBucket]]، فـ S3 بيقول 403 بدل ما يعترف إن الملف مش موجود.

الحل: في الـ distribution، Error pages، اعمل custom error response لـ 403 (و 404) بـ Response page path [[/index.html]] و HTTP response code 200. بعد ما التعديل يخلص deploy، [[curl -sI https://dXXXX.cloudfront.net/about]] يرجّع [[HTTP/2 200]] والصفحة تفتح و React Router يعرض [[/about]].

لو الرئيسية نفسها رجّعت AccessDenied، يبقى الـ bucket policy مش متحدّثة بالـ OAC (انسخ الـ policy اللي الكونسول بيعرضها وحطها في الـ bucket)، أو Default root object فاضي. ولو ظهرت صفحة بيضا والـ console فيه 403 على ملفات [[/assets/]]، يبقى رفعت [[dist/assets]] لمسار غلط.`
        },
        {
          cmd: "CloudFront cache",
          title: "الـ CDN بيكاش إيه ولمدة قد إيه",
          desc: R`CloudFront عنده مئات النقط حوالين العالم (edge locations): أول زائر من منطقة بيجيب الملف من الـ origin والـ edge يحتفظ بيه، واللي بعده ياخده من الـ edge مباشرة، والهيدر [[x-cache]] بيقولك Hit ولا Miss.

مدة الكاش بتتحدد من [[Cache-Control]] اللي الـ origin بيبعته، في حدود الـ min و max TTL في الـ cache policy. ولو غيّرت ملف ومستعجل، اعمل invalidation.`,
          example: R`curl -sI https://d111111abcdef8.cloudfront.net/assets/index-a1b2c3.js | grep -i -E "x-cache|age|cache-control"
curl -sI https://d111111abcdef8.cloudfront.net/assets/index-a1b2c3.js | grep -i -E "x-cache|age"
aws cloudfront create-invalidation --distribution-id E1ABCDEF2GHIJK --paths "/blog/*" "/index.html"
aws cloudfront get-invalidation --distribution-id E1ABCDEF2GHIJK --id I2J3K4L5M6N7O8
aws cloudfront list-distributions --query "DistributionList.Items[].[Id,Origins.Items[0].DomainName]" --output table`,
          try: "اطلب نفس الملف مرتين وشوف [[x-cache]] يتحول من Miss لـ Hit، و [[age]] (عمر النسخة بالثواني) بيزيد. بعدين اعمل invalidation واطلبه تاني.",
          deep: {
            why: "من غير CDN كل زائر من الخليج أو أوروبا بيعدي لحد سيرفرك، والسيرفر بيدفع باندويدث على كل ملف. مع CDN معظم الطلبات بتخلص عند الـ edge: أسرع للزائر، وأقل حمل وتكلفة عليك. والنقل من S3 لـ CloudFront ببلاش، و CloudFront نفسه عنده حصة مجانية كل شهر.",
            how: R`الـ cache key هو اللي بيحدد «ده نفس الطلب ولا لأ»: افتراضي الدومين والمسار. لو ضفت query strings أو headers أو cookies للـ key، كل قيمة مختلفة بتبقى نسخة لوحدها، ونسبة الـ Hit بتقع. عشان كده الـ managed policy اللي اسمها [[CachingOptimized]] مبتحطش cookies ولا query strings.

الـ TTL: CloudFront بيحترم [[max-age]] أو [[s-maxage]] (الأخير للـ CDN بس) في حدود الـ min والـ max بتوع الـ policy. لو الـ origin مبعتش حاجة، بيستخدم الـ default (يوم في CachingOptimized).

للـ API: behavior لوحده لـ [[/api/*]] بـ [[CachingDisabled]]، فـ CloudFront يبقى مجرد proxy سريع. متكاشش حاجة فيها بيانات يوزر إلا لو الـ key فيه اللي يميّز اليوزر، وإلا يوزر يشوف بيانات يوزر تاني.

الـ invalidation بتقول لكل الـ edges «ارمي النسخة دي». أول ١٠٠٠ path في الشهر ببلاش على مستوى الحساب، و [[/*]] بيتحسب path واحد مهما كان عدد الملفات. بس بتاخد وقت تخلص، والأحسن دايمًا أسماء فيها hash.

و [[x-cache: RefreshHit]] يعني الـ edge سأل الـ origin «اتغير؟» ورد «لأ»، فرجّع النسخة اللي عنده.`,
            when: "الملفات الثابتة، وصور المستخدمين (مع signed URLs للخاص)، والصفحات العامة اللي مش بتتغير لكل يوزر.",
            mistakes: "تكاش [[/api/me]] فيوزر يشوف بيانات يوزر تاني. وتحط كل الـ query strings في الـ cache key فكل [[?utm_source=]] نسخة جديدة. وتعتمد على invalidation بعد كل deploy ومش فاهم ليه ناس شايفة القديم دقايق. وتنسى إن المتصفح نفسه عنده كاش: invalidation في CloudFront مبتمسحش كاش متصفح اتقاله [[max-age=31536000]]."
          },
          lines: [
            "أول طلب: شوف x-cache و age و Cache-Control.",
            "تاني طلب: المفروض Hit، و age بيعدّ.",
            "ارمي من الكاش كل صفحات المدونة وملف index (كل واحد path).",
            "حالة الـ invalidation: InProgress ولا Completed.",
            "كل distribution والـ origin اللي بيقرا منه."
          ],
          sol: R`أول طلب بيرجّع [[x-cache: Miss from cloudfront]] ومفيش [[age]]، والطلب التاني [[x-cache: Hit from cloudfront]] ومعاه [[age: 3]] مثلًا، والرقم ده بيزيد كل ما تطلب بعدها (عمر النسخة في الـ edge بالثواني). و [[cache-control]] هو اللي انت رفعت بيه: [[public,max-age=31536000,immutable]].

بعد [[create-invalidation]] هتاخد [[Id]] وحالة [[InProgress]]، و [[get-invalidation]] بعد دقيقة أو اتنين يقول [[Completed]]. الطلب اللي بعدها يرجع [[Miss from cloudfront]] تاني، وبعدين Hit. ولو شفت [[RefreshHit from cloudfront]] ده معناه إن الـ edge سأل الـ origin «اتغيّر؟» ورد «لأ»، فكمّل بنفس النسخة.

الغلطة الشائعة: الطلبين يرجعوا Miss على طول. ده غالبًا لأنهم راحوا لـ edge مختلفين (فيه أكتر من IP)، أو لأن الـ cache policy بتحط query string أو header في الـ key، أو لأن الملف مرفوع بـ [[no-cache]] أو [[max-age=0]]. وخد بالك إن [[age]] مش هيقل بعد invalidation في المتصفح لو المتصفح نفسه كاشه: [[curl]] مفيهوش كاش، فهو الأصدق في التجربة دي.`
        }
      ]
    },
    {
      t: "EC2 والشبكة",
      l: 2,
      n: "سيرفر في الـ cloud، بفايروول حواليه وديسك منفصل عنه",
      items: [
        {
          cmd: "security groups",
          title: "فايروول حوالين كل سيرفر وقاعدة بيانات",
          desc: R`الـ security group فايروول على الـ network interface فيه قواعد «اسمح» بس للداخل، وأي حاجة مش مسموحة ممنوعة، وهو stateful: لو الطلب دخل، الرد بيخرج لوحده.

أقوى ميزة: القاعدة ممكن تقول «اسمح لـ 5432 من الـ security group بتاع السيرفرات» بدل IP. كده قاعدة البيانات بتقبل من التطبيق بس، حتى لو عملت ١٠ سيرفرات جديدة بعناوين جديدة.`,
          example: R`aws ec2 create-security-group --group-name myapp-web --description "web servers" --vpc-id vpc-0abc1234
aws ec2 authorize-security-group-ingress --group-id sg-0web1111 --protocol tcp --port 443 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id sg-0web1111 --protocol tcp --port 22 --cidr 203.0.113.7/32
aws ec2 authorize-security-group-ingress --group-id sg-0db22222 --protocol tcp --port 5432 --source-group sg-0web1111
aws ec2 describe-security-groups --group-ids sg-0db22222 --query "SecurityGroups[].IpPermissions"`,
          try: "اعمل ٢ security groups (web و db) بالقواعد دي. شغّل [[describe-security-groups]] على الـ db وتأكد إن مفيش ولا قاعدة فيها [[0.0.0.0/0]].",
          deep: {
            why: "أشهر اختراق لقواعد البيانات: Postgres أو MongoDB أو Redis مفتوح على النت بباسورد ضعيف أو من غير باسورد، والبوتات بتمسح النت كله كل كام ساعة. الـ security group بيقفل الباب قبل ما الطلب يوصل للبرنامج أصلًا.",
            how: R`كل حاجة في AWS بتتعمل جوه VPC: شبكة خاصة بعناوين زي [[10.0.0.0/16]]، مقسومة subnets، كل subnet في AZ واحدة. الـ public subnet ليها route للنت عن طريق Internet Gateway، فالسيرفر اللي فيها ياخد IP عام. الـ private subnet مفيهاش، فاللي فيها (قاعدة البيانات مثلًا) مش ممكن يتوصل له من النت خالص. ولو محتاج يطلع للنت (تحديثات) بيعدي على NAT Gateway، وده بيتحاسب بالساعة وبالجيجا، فخد بالك.

الـ security group بيتحط على الـ network interface نفسه (السيرفر أو RDS أو الـ load balancer). القواعد «اسمح» بس ومفيش «امنع»؛ للمنع فيه Network ACL على مستوى الـ subnet، وده stateless ونادرًا ما بتحتاجه.

stateful معناها: الطلب اللي دخل على 443 رده بيخرج من غير قاعدة outbound. والعكس: لو السيرفر طلب حاجة من النت، الرد بيدخل. والخارج كله مفتوح افتراضي.

[[--source-group]] يعني «أي حاجة لابسة الـ security group ده». لو الـ load balancer عليه [[sg-alb]] والسيرفرات عليها [[sg-web]]، تخلّي [[sg-web]] يقبل 3000 من [[sg-alb]] بس، فمحدش يوصل للتطبيق من غير ما يعدي على الـ load balancer.

وبدل ما تفتح 22 خالص: Session Manager (بالـ role [[AmazonSSMManagedInstanceCore]]) بيدّيك ترمنال بـ [[aws ssm start-session]] من غير أي بورت مفتوح.`,
            when: "مع أي سيرفر أو قاعدة بيانات أو load balancer. خطّطهم قبل ما تعمل الموارد.",
            mistakes: R`[[--port 22 --cidr 0.0.0.0/0]] «مؤقتًا» وتنساه. و RDS بـ publicly accessible و 5432 مفتوح لـ [[0.0.0.0/0]] عشان تفتحها من DBeaver على جهازك؛ الصح tunnel (درس «RDS من جهازك»). وتفتكر إن ufw على السيرفر كفاية وتسيب الـ security group مفتوح: خليهم الاتنين، وافتكر إن Docker بيعدّي ufw أصلًا.`
          },
          lines: [
            "اعمل security group للسيرفرات جوه الـ VPC بتاعك.",
            "اسمح بـ HTTPS من أي مكان.",
            "اسمح بـ SSH من IP بيتك بس ([[/32]] يعني عنوان واحد).",
            "قاعدة البيانات تقبل 5432 من أي حاجة لابسة security group السيرفرات بس.",
            "اعرض قواعد الدخول بتاعة security group القاعدة."
          ],
          sol: R`[[create-security-group]] بيرجّع [[{"GroupId": "sg-..."}]]، خزّنه في متغير بدل ما تنسخه بإيدك (تحت). و [[describe-security-groups]] على الـ db المفروض يرجّع قاعدة واحدة: [[IpProtocol: tcp]] و [[FromPort/ToPort: 5432]] و [[UserIdGroupPairs]] فيها الـ [[GroupId]] بتاع الـ web، و [[IpRanges: []]] فاضية. والـ query اللي تحت بتطلّع كل الـ CIDRs مباشرة، والناتج المتوقع للـ db [[[]]].

لو لقيت [[0.0.0.0/0]] في الـ db، غالبًا عملت [[--cidr 0.0.0.0/0]] بالغلط أو الكونسول «Anywhere» وانت بتجرّب، امسحها بـ [[revoke-security-group-ingress]] بنفس البارامترات. ولو [[authorize]] رجّع [[InvalidPermission.Duplicate]] يبقى القاعدة موجودة أصلًا. ولو [[--source-group]] رجّع [[InvalidGroup.NotFound]] يبقى الـ security groups في VPCs مختلفة.

وخد بالك إن الـ egress الافتراضي مفتوح لكل حاجة ([[IpPermissionsEgress]] فيها [[0.0.0.0/0]])، وده طبيعي، السؤال في الـ ingress بس.`,
          solCode: R`VPC=vpc-0abc1234
WEB=$(aws ec2 create-security-group --group-name myapp-web --description "web servers" --vpc-id $VPC --query GroupId --output text)
DB=$(aws ec2 create-security-group --group-name myapp-db --description "postgres" --vpc-id $VPC --query GroupId --output text)
aws ec2 authorize-security-group-ingress --group-id $WEB --protocol tcp --port 443 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id $DB --protocol tcp --port 5432 --source-group $WEB
aws ec2 describe-security-groups --group-ids $DB --query "SecurityGroups[].IpPermissions[].IpRanges[].CidrIp"`
        },
        {
          cmd: "aws ec2 run-instances",
          title: "شغّل سيرفر من الترمنال ويتظبط لوحده أول ما يقوم",
          desc: R`الأمر ده بيعمل سيرفر من AMI (صورة النظام) ونوع (المعالج والرام) و key pair و security group و user data (سكربت بيشتغل مرة واحدة أول ما السيرفر يقوم).

اسم النوع زي [[t4g.small]]: [[t]] العيلة (burstable، رخيص ومعاه رصيد CPU)، و [[4]] الجيل، و [[g]] معالج Graviton (ARM، أرخص بحوالي ٢٠٪)، و [[small]] الحجم (٢ جيجا رام). تحذير: السيرفر بيتحاسب بالثانية طول ما هو شغال، والـ IP العام كمان، فامسحه بعد التجربة.`,
          example: R`aws ec2 create-key-pair --key-name myapp-key --key-type ed25519 --query KeyMaterial --output text > myapp-key.pem
chmod 400 myapp-key.pem
AMI=$(aws ssm get-parameter --name /aws/service/canonical/ubuntu/server/24.04/stable/current/amd64/hvm/ebs-gp3/ami-id --query Parameter.Value --output text)
aws ec2 run-instances --image-id $AMI --instance-type t3.small --key-name myapp-key --security-group-ids sg-0web1111 --iam-instance-profile Name=myapp-ec2 --user-data file://init.sh --metadata-options HttpTokens=required --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=myapp-web}]"
aws ec2 describe-instances --filters Name=tag:Name,Values=myapp-web --query "Reservations[].Instances[].[InstanceId,PublicIpAddress,State.Name]" --output table
ssh -i myapp-key.pem ubuntu@203.0.113.10 "tail -n 20 /var/log/cloud-init-output.log"`,
          try: R`اكتب [[init.sh]]: أول سطر [[#!/bin/bash]]، وبعده [[curl -fsSL https://get.docker.com | sh]] و [[usermod -aG docker ubuntu]]. شغّل السيرفر، واستنى دقيقتين، واقرا لوج cloud-init وتأكد إن Docker اتسطّب. وفي الآخر امسحه بـ [[aws ec2 terminate-instances]] عشان ميتحاسبش.`,
          flag: "danger",
          deep: {
            why: "لما السيرفر يتعمل بأمر وسكربت، تقدر تعمل واحد زيه بالظبط في دقيقتين لو القديم باظ، أو تعمل ٣ ورا load balancer. السيرفر اللي اتظبط بإيدك في ٣ ساعات SSH محدش فاكر اتعمل إزاي.",
            how: R`الـ AMI صورة ديسك جاهزة، ورقمها بيختلف من region لـ region وبيتغير مع كل تحديث. عشان كده بدل ما تحفظ رقم، بتسأل الـ Parameter Store العام اللي Canonical بيحدّثه: دايمًا آخر Ubuntu 24.04 (و AWS بتعمل نفس الحاجة لـ Amazon Linux).

الـ key pair: AWS بيحط المفتاح العام على السيرفر، والخاص بيتطبع مرة واحدة بس، ولو ضاع مفيش طريقة ترجّعه. و [[chmod 400]] لأن ssh بيرفض مفتاح غيرك يقدر يقراه.

user data: السيرفر فيه برنامج اسمه cloud-init بيقرا السكربت ويشغّله كـ root أول boot بس. اللوج في [[/var/log/cloud-init-output.log]]. لو السكربت فشل السيرفر بيقوم عادي، فلازم تقرا اللوج.

[[HttpTokens=required]] بيفرض IMDSv2: العنوان [[169.254.169.254]] اللي السيرفر بياخد منه مفاتيح الـ role بقى محتاج token الأول. ده بيقفل هجوم SSRF مشهور كان بيخلّي تطبيق فيه ثغرة يسرّب مفاتيح الـ role.

الأنواع [[t]] (burstable) بتجمع رصيد CPU وهي هادية وتصرفه وقت الضغط. لو فضلت ضاغطة على طول بتدفع زيادة (unlimited) أو بتبطأ. للشغل التقيل المستمر [[c7i]] أو [[m7i]]. والـ IP العام بيتغير لو وقّفت وشغّلت، ولو محتاج ثابت اعمل Elastic IP (وده بيتحاسب كمان).`,
            when: "لما تحتاج سيرفر كامل: Docker Compose، أو WebSockets، أو workers، أو حاجة الـ PaaS مبتدعمهاش. ولو هتديره زي VPS بالظبط، قارن السعر الأول مع VPS عادي.",
            mistakes: "تسيب سيرفر تجربة شغال وتنسى: [[t3.small]] حوالي ١٥ لـ ١٨ دولار في الشهر حسب الـ region، غير الـ IP. وتسطّب على السيرفر بإيدك وتقول «هكتب السكربت بعدين». وتحط أسرار في user data: أي حد عنده صلاحية يقرا إعدادات الـ instance يشوفها، والسيرفر نفسه بيقدّمها على IMDS؛ الأسرار مكانها Parameter Store. وتنسى إن terminate بيمسح الـ root disk افتراضي، و stop لأ."
          },
          lines: [
            "اعمل key pair، واحفظ المفتاح الخاص في ملف (بيتطبع مرة واحدة بس).",
            "اقفل صلاحيات الملف، وإلا ssh يرفضه.",
            "هات رقم آخر Ubuntu 24.04 في الـ region دي.",
            "شغّل السيرفر: النوع، والمفتاح، والفايروول، والـ role، وسكربت أول تشغيل، و IMDSv2، واسم.",
            "هات الـ IP العام والحالة.",
            "اقرا لوج سكربت أول تشغيل: نجح ولا فشل."
          ],
          sol: R`الـ [[init.sh]] تحت. بعد دقيقتين، آخر سطور [[cloud-init-output.log]] المفروض فيها ناتج سكربت Docker (سطور زي [[Client: Docker Engine - Community]] ورقم النسخة)، وفي الآخر سطر زي [[Cloud-init v. 24.x finished at ... Up 95.3 seconds]]. وبعدها [[ssh ... docker --version]] يطبع النسخة، و [[docker ps]] من اليوزر ubuntu يشتغل (في جلسة SSH جديدة، لأن الـ group بيتقري عند الدخول).

وبعد [[terminate-instances]] الحالة تبقى [[shutting-down]] وبعدين [[terminated]]، والـ instance بتفضل ظاهرة في [[describe-instances]] حوالي ساعة وبعدين تختفي؛ ده طبيعي ومش بتتحاسب عليها.

أخطاء شائعة: اللوج فيه [[/var/lib/cloud/instance/scripts/part-001: ... not found]] أو السكربت متنفذش أصلًا، وده لأن أول سطر مش [[#!/bin/bash]] (أو الملف مكتوب على ويندوز بـ CRLF). و [[Permission denied (publickey)]] يبقى اليوزر غلط (Ubuntu = [[ubuntu]]) أو نسيت [[chmod 400]]. و [[docker: permission denied]] وانت ubuntu يبقى محتاج تخرج وتدخل تاني بعد [[usermod]]. و [[Connection timed out]] يبقى الـ security group مفيهاش 22 من IP بتاعك.`,
          solCode: R`#!/bin/bash
set -euxo pipefail
curl -fsSL https://get.docker.com | sh
usermod -aG docker ubuntu
systemctl enable --now docker`
        },
        {
          cmd: "EBS",
          title: "الديسك: بيفضل ولا بيتمسح، وتكبّره إزاي",
          desc: R`ديسك سيرفر EC2 اسمه EBS volume، وده حاجة منفصلة عن السيرفر ومتوصلة بيه على الشبكة: الـ root volume بيتمسح مع terminate افتراضي، وأي volume تضيفه بعدين بيفضل (وبيتحاسب) لحد ما تمسحه بإيدك.

stop مش بيمسح الديسك (وبيفضل يتحاسب عليه)، و terminate بيمسح السيرفر للأبد. والـ snapshot نسخة من الديسك تعمل منها ديسك جديد. تحذير: الـ snapshot والديسك الأكبر بيتحاسبوا بالجيجا في الشهر.`,
          example: R`aws ec2 describe-volumes --filters Name=attachment.instance-id,Values=i-0abc1234567890def --query "Volumes[].[VolumeId,Size,VolumeType]"
aws ec2 create-snapshot --volume-id vol-0abc1234567890def --description "before upgrade"
aws ec2 modify-volume --volume-id vol-0abc1234567890def --size 40
sudo growpart /dev/nvme0n1 1
sudo resize2fs /dev/nvme0n1p1
df -h /`,
          try: "على سيرفر تجربة: اعمل snapshot، وكبّر الديسك من ٨ لـ ١٢ جيجا، وشوف [[lsblk]] قبل وبعد [[growpart]]، و [[df -h]] قبل وبعد [[resize2fs]]. لاحظ إن السيرفر فضل شغال طول الوقت.",
          flag: "danger",
          deep: {
            why: "«الديسك اتملى» من أشهر أسباب وقوع السيرفرات. على VPS بتنقل لخطة أكبر، وعلى EC2 بتكبّر الديسك وهو شغال في دقايق. وقبل أي تغيير خطير (upgrade للنظام أو migration) الـ snapshot بيديك زرار رجوع.",
            how: R`EBS مش ديسك جوه السيرفر، ده ديسك على الشبكة في نفس الـ AZ. عشان كده ممكن تفصله وتوصّله بسيرفر تاني (في نفس الـ AZ بس).

gp3 هو النوع العادي والأرخص: ٣٠٠٠ IOPS افتراضي أيًا كان الحجم. والأقدم gp2 كان أداؤه مربوط بالحجم.

التكبير ٣ خطوات: [[modify-volume]] بيكبّر الديسك نفسه في AWS. بس نظام التشغيل لسه شايف الـ partition القديم، فـ [[growpart]] بيمد الـ partition لآخر الديسك، و [[resize2fs]] بيمد الـ filesystem (ext4 في Ubuntu). في Amazon Linux الـ filesystem غالبًا XFS فبتستخدم [[xfs_growfs -d /]]. واسم الديسك [[nvme0n1]] في الأنواع الحديثة، و [[lsblk]] بيقولك الاسم الصح.

مينفعش تصغّر الديسك. وبعد [[modify-volume]] لازم تستنى ٦ ساعات قبل تعديل تاني على نفس الـ volume.

الـ snapshot incremental: أول واحد نسخة كاملة، والباقي بيخزّن الفرق بس. ومع ذلك متسيبش snapshots قديمة للأبد. وفيه Data Lifecycle Manager بيعمل snapshot يومي ويمسح القديم لوحده.`,
            when: "لما الديسك يوصل ٨٠٪، وقبل أي تحديث كبير للنظام أو للداتا.",
            mistakes: "تعمل terminate لسيرفر وفاكر إن volume تاني متوصل بيه هيتمسح معاه، وتفضل تتحاسب عليه شهور. وتكبّر الـ volume وتنسى growpart و resize2fs، و [[df]] لسه بيقول 100%. وتعتمد على snapshot لديسك عليه Postgres شغال كباك أب وحيد: ممكن يطلع مش متسق؛ الباك أب الصح [[pg_dump]] أو RDS."
          },
          lines: [
            "الديسكات المتوصلة بالسيرفر ده: الرقم والحجم والنوع.",
            "خد snapshot قبل أي حاجة (بيتحاسب بالجيجا).",
            "كبّر الديسك لـ ٤٠ جيجا وهو شغال.",
            "على السيرفر: مد الـ partition رقم 1 لآخر الديسك.",
            "مد الـ filesystem (ext4) على الـ partition.",
            "اتأكد إن المساحة زادت."
          ],
          sol: R`قبل التكبير، [[lsblk]] على Ubuntu 24.04 بيوري حاجة زي [[nvme0n1 8G]] والـ root [[nvme0n1p1]] حوالي 7G (وجنبه partitions صغيرة للـ boot). بعد [[modify-volume]] بدقيقة، [[lsblk]] يقول [[nvme0n1 12G]] بس [[nvme0n1p1]] لسه زي ما هو: الديسك كبر، الـ partition لأ. [[growpart]] يطبع [[CHANGED: partition=1 ...]] وبعدها [[lsblk]] يوري الـ partition كبرت. و [[df -h /]] لسه بيقول الحجم القديم لحد [[resize2fs]]، اللي بيطبع سطر زي [[The filesystem on /dev/nvme0n1p1 is now 3112699 (4k) blocks long.]]، وبعدها [[df -h /]] يوري حوالي 11G.

وكل ده والسيرفر شغال: [[uptime]] قبل وبعد نفس الرقم تقريبًا.

أخطاء شائعة: [[growpart]] يقول [[NOCHANGE: partition 1 is size ... it cannot be grown]]، وده لأنك شغّلته قبل ما الديسك الجديد يظهر (شوف [[aws ec2 describe-volumes-modifications]] لحد ما الحالة تبقى [[optimizing]] أو [[completed]]). و [[resize2fs]] يرجّع [[Bad magic number]] لو الـ filesystem مش ext4: على Amazon Linux بيبقى XFS، والأمر [[sudo xfs_growfs -d /]]. ولو جيت تكبّر تاني على طول هتاخد خطأ إنك لازم تستنى (حوالي ٦ ساعات بين كل تعديل للـ volume). وخلي بالك إنك مينفعش تصغّر volume.`,
          solCode: R`aws ec2 create-snapshot --volume-id vol-0abc1234567890def --description "before resize"
aws ec2 modify-volume --volume-id vol-0abc1234567890def --size 12
aws ec2 describe-volumes-modifications --volume-ids vol-0abc1234567890def --query "VolumesModifications[].[ModificationState,Progress]"
# على السيرفر:
lsblk
sudo growpart /dev/nvme0n1 1
lsblk
df -h /
sudo resize2fs /dev/nvme0n1p1
df -h /`
        }
      ]
    },
    {
      t: "RDS: Postgres مُدار",
      l: 2,
      n: "AWS بيشغّل ويحدّث ويعمل باك أب، وانت بتقفل الباب وتختار الإعدادات",
      items: [
        {
          cmd: "aws rds create-db-instance",
          title: "Postgres من غير ما تدير سيرفر",
          desc: R`RDS بيشغّل Postgres على سيرفر AWS بيديره، بتحديثات أمنية وباك أب يومي واسترجاع لأي ثانية في آخر كام يوم، وانت بتختار الحجم والشبكة ومين يوصل.

القاعدة تبقى في private subnet ومش publicly accessible، والباسورد يديره Secrets Manager بدل ما تكتبه في الأمر. تحذير: بتتحاسب بالساعة من أول ما تقوم، حتى لو محدش بيستخدمها.`,
          example: R`aws rds create-db-instance \
  --db-instance-identifier myapp-db \
  --engine postgres \
  --db-instance-class db.t4g.micro --allocated-storage 20 --storage-type gp3 \
  --master-username myapp_admin --manage-master-user-password \
  --db-subnet-group-name myapp-private --vpc-security-group-ids sg-0db22222 \
  --no-publicly-accessible --storage-encrypted \
  --backup-retention-period 7
aws rds wait db-instance-available --db-instance-identifier myapp-db
aws rds describe-db-instances --db-instance-identifier myapp-db --query "DBInstances[0].[Endpoint.Address,EngineVersion,MasterUserSecret.SecretArn]"`,
          try: R`اعمل parameter group وفعّل لوج للـ queries البطيئة: [[aws rds create-db-parameter-group --db-parameter-group-name myapp-pg --db-parameter-group-family postgres17 --description "myapp"]] وبعدين [[aws rds modify-db-parameter-group --db-parameter-group-name myapp-pg --parameters "ParameterName=log_min_duration_statement,ParameterValue=500,ApplyMethod=immediate"]]، واربطه بالقاعدة بـ [[modify-db-instance --db-parameter-group-name myapp-pg]]. اتأكد إن الـ family مطابقة للنسخة اللي طلعت في آخر أمر.`,
          flag: "danger",
          deep: {
            why: "Postgres على VPS معناها انت مسؤول عن التحديثات، والباك أب ومكانه، واختبار الاسترجاع، والمراقبة، والديسك. RDS بياخد ده كله بسعر أعلى. للمشاريع اللي الداتا فيها فلوس (طلبات ومدفوعات) الفرق يستاهل.",
            how: R`[[--db-subnet-group-name]] مجموعة subnets خاصة في AZs مختلفة، والقاعدة بتتحط في واحدة منهم (أو اتنين لو Multi-AZ). ولو محددتش subnet group بتروح الـ default VPC وممكن تبقى publicly accessible، عشان كده [[--no-publicly-accessible]] صريح.

[[--manage-master-user-password]] بيخلّي RDS يولّد باسورد قوي ويحطه في Secrets Manager ويغيّره دوريًا. الـ ARN بتاعه في [[MasterUserSecret]]، والتطبيق ياخده من هناك. وبعدين اعمل يوزر للتطبيق بصلاحيات أقل من الأدمن (زي ما في تاب PostgreSQL).

[[--backup-retention-period 7]]: باك أب يومي تلقائي ولوجات التعديلات، فتقدر ترجع لأي ثانية في آخر ٧ أيام. من الـ CLI من غيره بيحط يوم واحد بس، و [[0]] بيقفل الباك أب خالص.

parameter groups: مفيش [[postgresql.conf]] تعدّله. الإعدادات في parameter group، والافتراضي مينفعش يتعدل، فبتعمل واحد باسمك. الإعدادات dynamic بتتطبق على طول، و static (زي [[shared_buffers]]) محتاجة reboot وبتظهر [[pending-reboot]]. وفي Postgres 15 وأحدث [[rds.force_ssl]] افتراضي 1: أي اتصال من غير SSL مرفوض.

ومن غير [[--engine-version]] بياخد النسخة الافتراضية وقتها. في الإنتاج حددها صريح، وتعرف المتاح بـ [[aws rds describe-db-engine-versions --engine postgres --default-only]].`,
            when: "لما الداتا مهمة ومفيش حد متفرغ يدير Postgres. ولمشروع صغير جدًا، Supabase أو Neon أرخص وأسهل (قسم «منصات جاهزة»).",
            mistakes: "publicly accessible عشان تفتحها من جهازك. و [[db.t4g.micro]] لإنتاج عليه ضغط، والرام الصغيرة بتخلّي كل query تقرا من الديسك. وتنسى إن Multi-AZ بيضاعف الفاتورة. وتكتب [[--master-user-password]] صريح في الأمر فيفضل في history الترمنال."
          },
          lines: [
            "اعمل قاعدة بيانات جديدة (الأمر مكمّل في السطور اللي تحته).",
            "اسمها في AWS (مش اسم قاعدة البيانات جوه Postgres).",
            "المحرك: Postgres (من غير نسخة بياخد الافتراضية).",
            "حجم صغير (Graviton و ١ جيجا رام) و ٢٠ جيجا gp3.",
            "اسم الأدمن، والباسورد يولّده ويحفظه Secrets Manager.",
            "في subnets خاصة، وبالـ security group اللي بيقبل من السيرفرات بس.",
            "مش متاحة من النت، والتخزين متشفّر.",
            "باك أب يومي، وتقدر ترجع لأي لحظة في آخر ٧ أيام.",
            "استنى لحد ما تبقى جاهزة (بتاخد دقايق).",
            "هات العنوان والنسخة ومكان الباسورد في Secrets Manager."
          ],
          sol: R`أول حاجة: آخر أمر في المثال بيطلّع [[EngineVersion]]، زي [[17.6]]، والـ family لازم تطابق الرقم الكبير: 17 = [[postgres17]]، ولو طلعت 18 يبقى [[postgres18]]. [[create-db-parameter-group]] بيرجّع [[DBParameterGroupFamily: postgres17]]، و [[modify-db-parameter-group]] بيرجّع [[{"DBParameterGroupName": "myapp-pg"}]] بس.

بعد [[modify-db-instance]]، الـ parameter group الجديدة بتتربط، بس [[describe-db-instances]] هيقول [[ParameterApplyStatus: pending-reboot]]: ربط group جديدة محتاج reboot مرة واحدة. بعد [[reboot-db-instance]] الحالة تبقى [[in-sync]]، ومن هنا أي query أطول من ٥٠٠ مللي هتظهر في لوج Postgres (من الكونسول Logs أو [[describe-db-log-files]]). جرّب [[SELECT pg_sleep(1);]] وشوف سطر [[duration: 1001.xxx ms statement: SELECT pg_sleep(1);]].

الغلطة الشائعة: family مش مطابقة، فالـ modify يرجع [[InvalidParameterCombination]] بيقول إن الـ group دي مينفعش مع النسخة دي. وتانية: تعدّل [[default.postgres17]] مباشرة، وده مش مسموح، لأن الـ default groups مبتتعدّلش؛ عشان كده بنعمل واحدة خاصة بينا.`,
          solCode: R`aws rds create-db-parameter-group --db-parameter-group-name myapp-pg --db-parameter-group-family postgres17 --description "myapp"
aws rds modify-db-parameter-group --db-parameter-group-name myapp-pg --parameters "ParameterName=log_min_duration_statement,ParameterValue=500,ApplyMethod=immediate"
aws rds modify-db-instance --db-instance-identifier myapp-db --db-parameter-group-name myapp-pg --apply-immediately
aws rds describe-db-instances --db-instance-identifier myapp-db --query "DBInstances[0].DBParameterGroups"
aws rds reboot-db-instance --db-instance-identifier myapp-db
aws rds wait db-instance-available --db-instance-identifier myapp-db`
        },
        {
          cmd: "RDS snapshots و PITR",
          title: "رجّع القاعدة زي ما كانت الساعة ١٠ الصبح",
          desc: R`RDS فيه باك أب تلقائي كل يوم بيسمح بـ point-in-time restore لأي ثانية في مدة الاحتفاظ، و manual snapshot بتعمله بإيدك وبيفضل لحد ما تمسحه.

الاسترجاع عمره ما بيكتب فوق القاعدة الحالية: بيعمل instance جديدة بعنوان جديد، وانت تختار تنقل التطبيق عليها أو تنسخ منها الجدول اللي باظ. تحذير: الـ instance الجديدة والـ snapshots بيتحاسبوا لحد ما تمسحهم.`,
          example: R`aws rds create-db-snapshot --db-instance-identifier myapp-db --db-snapshot-identifier myapp-before-migration-42
aws rds describe-db-snapshots --db-instance-identifier myapp-db --query "DBSnapshots[].[DBSnapshotIdentifier,SnapshotCreateTime,Status]" --output table
aws rds describe-db-instances --db-instance-identifier myapp-db --query "DBInstances[0].LatestRestorableTime"
aws rds restore-db-instance-to-point-in-time --source-db-instance-identifier myapp-db --target-db-instance-identifier myapp-db-restored --restore-time 2026-09-28T10:00:00Z --db-subnet-group-name myapp-private --vpc-security-group-ids sg-0db22222 --no-publicly-accessible`,
          try: "على قاعدة تجربة: اعمل جدول واكتب فيه صفين، استنى ١٠ دقايق، امسح صف، واسترجع لوقت قبل المسح في instance جديدة. اتصل بيها واتأكد إن الصف موجود، وبعدين امسحها.",
          flag: "danger",
          deep: {
            why: "أغلب ضياع الداتا مش من هارد باظ، من بني آدم: [[DELETE]] من غير [[WHERE]]، أو migration غلط. والباك أب اللي مش بتعرف ترجّعه بسرعة زي عدمه.",
            how: R`الباك أب التلقائي = snapshot يومي للديسك + لوجات التعديلات كل كام دقيقة. عشان ترجع للساعة ١٠:٠٠، RDS بياخد آخر snapshot قبلها ويعيد عليه التعديلات لحد اللحظة دي. [[LatestRestorableTime]] هي أقرب لحظة تقدر ترجعلها (غالبًا من كام دقيقة).

الاسترجاع بيعمل instance جديدة، فلازم تديها نفس الـ subnet group والـ security group والـ parameter group، وإلا تطلع بالإعدادات الافتراضية. وبياخد من دقايق لساعات حسب الحجم، وده الـ RTO الحقيقي بتاعك.

عندك خيارين بعدها: تغيّر [[DATABASE_URL]] للعنوان الجديد، أو (الأغلب) تاخد [[pg_dump]] للجدول اللي باظ من الجديدة وترجّعه في القديمة، وبعدين تمسح الجديدة.

الـ manual snapshot بيفضل حتى لو مسحت القاعدة، وتقدر تنسخه لـ region تانية أو تشاركه مع حساب تاني (للـ DR). والتلقائي بيتمسح مع القاعدة، إلا لو اخترت تحتفظ بيه.`,
            when: "snapshot يدوي قبل كل migration كبيرة أو تحديث نسخة Postgres. و PITR لما حد يمسح داتا بالغلط.",
            mistakes: "تستنى لحد الكارثة وتكتشف إن الاحتفاظ يوم واحد. وتسترجع من غير الـ security group الصح فالتطبيق مش عارف يتصل وتفتكر الباك أب بايظ. ومتجرّبش الاسترجاع أبدًا لحد اليوم اللي تحتاجه فيه. وتنسى instance الاسترجاع شغالة بعد ما خلصت."
          },
          lines: [
            "snapshot يدوي قبل migration، وبيفضل لحد ما تمسحه.",
            "اعرض الـ snapshots ووقتها وحالتها.",
            "أقرب لحظة تقدر ترجعلها دلوقتي.",
            "رجّع القاعدة زي ما كانت ١٠ الصبح في instance جديدة، بنفس الشبكة والفايروول."
          ],
          sol: R`الخطوات والنتيجة: جدول [[notes]] فيه صفين (id 1 و 2)، استنيت، ومسحت id 2 الساعة مثلًا 10:25:00 UTC. الاسترجاع لـ 10:24:00 بيعمل instance جديدة اسمها [[myapp-db-restored]] بـ endpoint جديد خالص، وبياخد من ١٠ لـ ٢٠ دقيقة أو أكتر. بعدها [[SELECT * FROM notes;]] على الـ endpoint الجديد يرجّع الصفين، والقاعدة الأصلية لسه فيها صف واحد: الاسترجاع مبيلمسش الأصلية.

اتأكد الأول إن الوقت اللي اخترته أقدم من [[LatestRestorableTime]] (غالبًا بيبقى متأخر عن دلوقتي بحوالي ٥ دقايق)، وإلا هيرجّع خطأ إن الوقت برا الـ window. والوقت بـ UTC، فلو كتبت الساعة بتوقيت مصر هترجع لوقت غلط بساعتين أو تلاتة، وتلاقي الصف ممسوح أو الجدول مش موجود.

وفي الآخر امسح الـ instance الجديدة ([[--skip-final-snapshot]] لأنها تجربة). الغلطة المكلفة إنك تنساها: هي instance كاملة بتتحاسب بالساعة زي الأصلية.`,
          solCode: R`psql "$DATABASE_URL" -c "CREATE TABLE notes(id int primary key, body text); INSERT INTO notes VALUES (1,'a'),(2,'b');"
# بعد ١٠ دقايق:
date -u +%Y-%m-%dT%H:%M:%SZ
psql "$DATABASE_URL" -c "DELETE FROM notes WHERE id = 2;"
aws rds restore-db-instance-to-point-in-time --source-db-instance-identifier myapp-db --target-db-instance-identifier myapp-db-restored --restore-time 2026-09-28T10:24:00Z --db-subnet-group-name myapp-private --vpc-security-group-ids sg-0db22222 --no-publicly-accessible
aws rds wait db-instance-available --db-instance-identifier myapp-db-restored
aws rds describe-db-instances --db-instance-identifier myapp-db-restored --query "DBInstances[0].Endpoint.Address" --output text
aws rds delete-db-instance --db-instance-identifier myapp-db-restored --skip-final-snapshot`
        },
        {
          cmd: "RDS من جهازك",
          title: "وصّل لقاعدة مقفولة في private subnet",
          desc: R`القاعدة مش متاحة من النت وده الصح، فعشان تفتحها من جهازك (psql أو DBeaver أو Prisma Studio) بتعمل tunnel عن طريق سيرفر جوه نفس الـ VPC.

الأحسن Session Manager port forwarding (من غير أي بورت مفتوح)، أو SSH tunnel. وبعدها القاعدة بتبان كأنها على [[localhost:5433]] عندك.`,
          example: R`aws rds describe-db-instances --db-instance-identifier myapp-db --query "DBInstances[0].Endpoint.Address" --output text
aws ssm start-session --target i-0abc1234567890def --document-name AWS-StartPortForwardingSessionToRemoteHost --parameters '{"host":["myapp-db.abc123xyz.eu-central-1.rds.amazonaws.com"],"portNumber":["5432"],"localPortNumber":["5433"]}'
psql "postgresql://myapp_admin@localhost:5433/postgres?sslmode=require"
ssh -i myapp-key.pem -N -L 5433:myapp-db.abc123xyz.eu-central-1.rds.amazonaws.com:5432 ubuntu@203.0.113.10`,
          try: "سطّب Session Manager plugin على جهازك، وافتح الـ tunnel في ترمنال و psql في ترمنال تاني. لاحظ سطر SSL connection اللي psql بيطبعه أول ما يتصل.",
          deep: {
            why: "الحل السهل الغلط: تفتح القاعدة للنت «ساعة بس» وتنساها، والبوتات بتلاقي 5432 مفتوح في ساعات. الـ tunnel بيدّيك نفس الراحة من غير ما تفتح أي حاجة.",
            how: R`Session Manager: السيرفر عليه SSM agent (موجود في صور Ubuntu و Amazon Linux على AWS) والـ role [[AmazonSSMManagedInstanceCore]]. الـ agent بيفتح اتصال خارج لـ AWS، فمش محتاج أي بورت داخل. [[start-session]] بالـ document ده بيقول للـ agent «افتح اتصال لـ host:5432 ووصّله بـ 5433 على جهازي». وكل جلسة بتتسجل في CloudTrail. ومحتاج plugin على جهازك اسمه session-manager-plugin.

SSH tunnel: نفس الفكرة بس عن طريق sshd على السيرفر، ومحتاج 22 مفتوح لـ IP بيتك. [[-L 5433:HOST:5432]] يعني «اللي يوصل 5433 عندي وديه لـ HOST:5432 من ناحية السيرفر»، و [[-N]] من غير ما يفتح shell. التفاصيل في تاب bash (SSH tunnel).

[[sslmode=require]] بيشفّر من غير ما يتأكد من الشهادة. والاسم في الشهادة هو عنوان RDS مش localhost، فـ [[verify-full]] مش هتنفع عن طريق tunnel ببساطة. من السيرفر نفسه استخدم [[verify-full]] مع شهادة RDS CA.

السيرفر اللي بتعدي عليه ممكن يبقى سيرفر التطبيق نفسه، أو سيرفر صغير (bastion) بتشغّله وقت الحاجة بس.`,
            when: "migrations يدوية، أو Prisma Studio على الإنتاج (بحذر)، أو تشخيص.",
            mistakes: "تفتح 5432 للكل في الـ security group «مؤقتًا». وتشغّل migration على الإنتاج من جهازك وانت فاكر إنك على dev لأن الاتنين localhost؛ خلي بورت مختلف لكل بيئة (5433 للإنتاج و 5432 للمحلي). وتسيب الـ tunnel مفتوح طول اليوم."
          },
          lines: [
            "هات عنوان القاعدة (DNS جوه الـ VPC).",
            "Session Manager: وصّل 5433 على جهازك بـ 5432 على القاعدة عن طريق السيرفر ده، من غير بورت مفتوح.",
            "في ترمنال تاني: psql على localhost كأن القاعدة عندك، والاتصال مشفّر.",
            "البديل بـ SSH tunnel لو 22 مفتوح لـ IP بيتك."
          ],
          sol: R`في الترمنال الأول، [[start-session]] يطبع [[Starting session with SessionId: ...]] وبعدين [[Port 5433 opened for sessionId ...]] و [[Waiting for connections...]]، ويفضل مفتوح. في التاني، [[psql]] يسأل عن الباسورد (من Secrets Manager لو استخدمت [[--manage-master-user-password]]) ويطبع قبل الـ prompt سطر زي:

[[SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, compression: off)]]

(psql 17 وأحدث بيزوّد [[ALPN: postgresql]]). السطر ده معناه إن الاتصال مشفّر لحد RDS نفسه. وأول ما psql يتصل، الترمنال الأول يطبع [[Connection accepted for session]].

أخطاء شائعة: [[SessionManagerPlugin is not found]] يعني الـ plugin مش متسطّب. و [[TargetNotConnected]] يعني السيرفر مش ظاهر في SSM: ناقصه الـ role اللي فيها [[AmazonSSMManagedInstanceCore]] أو مش واصل للإنترنت أو لـ VPC endpoints. ولو psql فضل واقف لحد timeout، يبقى الـ security group بتاعة RDS مش بتقبل من السيرفر الوسيط. و [[no pg_hba.conf entry ... no encryption]] يعني RDS فارض SSL وانت نسيت [[sslmode=require]].`,
          solCode: R`aws secretsmanager get-secret-value --secret-id "$(aws rds describe-db-instances --db-instance-identifier myapp-db --query 'DBInstances[0].MasterUserSecret.SecretArn' --output text)" --query SecretString --output text`
        }
      ]
    },
    {
      t: "Serverless وخدمات جاهزة",
      l: 2,
      n: "دوال بتصحى لما حد يطلبها، وإيميل وأسرار من غير ما تدير سيرفر",
      items: [
        {
          cmd: "Lambda handler",
          title: "كود بيشتغل لما حد يطلبه بس",
          desc: R`Lambda بتشغّل دالة لما يحصل حدث (طلب HTTP، أو ملف اترفع على S3، أو رسالة في SQS، أو جدول زمني)، وبتدفع على عدد الطلبات والمللي ثواني، وصفر لو محدش طلب.

الدالة [[async]] بتاخد [[event]] وترجّع النتيجة. وفي Node 24 (الـ runtime اسمه [[nodejs24.x]]) الـ handlers اللي بالـ callback اتشالت خالص، لازم async.`,
          example: R`const startedAt = Date.now();
let invocations = 0;

export const handler = async (event) => {
  invocations += 1;
  const name = event.queryStringParameters?.name ?? "world";
  return {
    statusCode: 200,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ hello: name, invocations, envAgeMs: Date.now() - startedAt }),
  };
};`,
          try: "ارفعها (الدرس الجاي) ونادِها ٥ مرات ورا بعض: [[invocations]] هيزيد لأن نفس البيئة بتتعاد. استنى ٢٠ دقيقة ونادِها تاني: غالبًا هيرجع 1 لأن البيئة القديمة اتقفلت (cold start).",
          flag: "script",
          deep: {
            why: "API صغيرة بتاخد ١٠٠ طلب في اليوم مش محتاجة سيرفر شغال ٢٤ ساعة. وشغل زي «صغّر الصورة لما تترفع» أو «ابعت تقرير كل يوم الساعة ٨» مثالي لـ Lambda: بيشتغل وقت الحاجة ويقفل.",
            how: R`أول طلب: Lambda بتعمل بيئة (microVM صغيرة)، تنزّل الكود، تشغّل Node، وتنفّذ كل الكود اللي برا الـ handler (الـ imports والـ clients والاتصالات). ده اسمه init أو cold start، وممكن ياخد من ١٠٠ مللي ثانية لثانيتين حسب حجم الكود. بعدين تنادي الـ handler.

البيئة بتفضل مستنية شوية. الطلب اللي بعده بيروح لنفس البيئة وينادي الـ handler بس (warm)، عشان كده المتغيرات برا الـ handler بتفضل. ولو جه طلبين في نفس اللحظة، Lambda بتعمل بيئتين؛ كل بيئة بتخدم طلب واحد في المرة.

عشان كده: اعمل الـ SDK clients واتصالات قاعدة البيانات برا الـ handler (مرة لكل بيئة)، ومتحطش بيانات يوزر في متغيرات عامة لأنها ممكن تظهر في طلب تاني.

شكل الـ event بيعتمد على مين نادى: من API Gateway (HTTP API) أو function URL فيه [[rawPath]] و [[queryStringParameters]] و [[body]] كنص. من S3 فيه [[Records]] بأسماء الملفات. وللـ HTTP لازم ترجّع [[statusCode]] و [[body]] نص.

الحدود: ١٥ دقيقة أقصى مدة، والرام من ١٢٨ ميجا لـ ١٠ جيجا (والـ CPU بيزيد مع الرام)، والطلب والرد ٦ ميجا كل واحد، والكود ٢٥٠ ميجا بعد فك الضغط، و ١٠٠٠ تنفيذ متزامن افتراضي في الـ region (الحسابات الجديدة أقل).`,
            when: "APIs صغيرة أو متقطعة، و webhooks، ومعالجة ملفات بعد الرفع، ومهام مجدولة. مش مناسبة لـ WebSockets طويلة، أو شغل أكتر من ١٥ دقيقة، أو ترافيك عالي ومستمر (السيرفر أرخص).",
            mistakes: "تفتح اتصال Postgres جديد جوه الـ handler مع كل طلب، ومع ٢٠٠ طلب متزامن = ٢٠٠ اتصال والقاعدة تقفل الباب؛ استخدم pooler (RDS Proxy أو Supabase/Neon pooled). وتستخدم callback في Node 24 فيطلع [[Runtime.CallbackHandlerDeprecated]]. وتعمل دالة بتكتب في نفس الـ bucket اللي بيشغّلها، فتلف للأبد والفاتورة تطير."
          },
          lines: [
            "برا الـ handler: بيتنفذ مرة واحدة لكل بيئة (وقت الـ cold start).",
            "عدّاد بيفضل بين الطلبات طول ما البيئة عايشة.",
            "الـ handler: async وبياخد الـ event.",
            "زوّد العدّاد.",
            "اقرا ?name= من الـ URL، ولو مش موجود world.",
            "رجّع رد HTTP.",
            "كود الحالة.",
            "نوع المحتوى.",
            "الـ body لازم نص، فـ JSON.stringify.",
            "قفلة الرد.",
            "قفلة الـ handler."
          ],
          sol: R`لو جرّبت محليًا بالكود اللي تحت (من غير رفع) هتشوف فكرة الدرس نفسها، لأن الـ module بيتحمّل مرة واحدة:

[[{"hello":"Ali","invocations":1,"envAgeMs":0}]] وبعدين 2 و 3 و 4 و 5، و [[envAgeMs]] ثابت تقريبًا.

وعلى Lambda فعلًا: الـ ٥ طلبات ورا بعض بيرجّعوا [[invocations]] من 1 لـ 5، و [[envAgeMs]] بيزيد بالثواني لأنها نفس البيئة. بعد ٢٠ دقيقة غالبًا يرجع [[invocations: 1]] و [[envAgeMs]] صغير، ده cold start. «غالبًا» لأن AWS مبتضمنش إمتى البيئة بتتقفل.

الغلطة الشائعة في الفهم: تبعت ٥ طلبات في نفس اللحظة (مثلًا [[&]] في bash أو [[Promise.all]]) فتلاقي أرقام متكررة زي 1 و 1 و 2. ده مش bug: كل طلب متزامن بياخد بيئة لوحده، ولكل بيئة عدّاد. وده بالظبط ليه متعتمدش على متغير في الذاكرة كعدّاد أو كاش مشترك في Lambda.`,
          solCode: R`// local.mjs جنب index.mjs
import { handler } from "./index.mjs";
for (let i = 0; i < 5; i++) {
  const res = await handler({ queryStringParameters: { name: "Ali" } });
  console.log(res.body);
}`
        },
        {
          cmd: "Lambda deploy + API Gateway",
          title: "ارفع الدالة واديها URL حقيقي",
          desc: R`بتضغط الكود في zip، وتعمل الدالة بـ role فيها صلاحية اللوجات، وتجرّبها بـ [[invoke]]، وعشان تبقى API أسهل طريقة API Gateway (HTTP API) بأمر واحد.

بعدها كل تعديل: zip تاني و [[update-function-code]]. وفي المشاريع الحقيقية بتستخدم أداة (SAM أو CDK أو Terraform أو SST) بدل الأوامر دي، بس لازم تفهم هي بتعمل إيه.`,
          example: R`zip fn.zip index.mjs
aws lambda create-function --function-name hello --runtime nodejs24.x --handler index.handler --zip-file fileb://fn.zip --role arn:aws:iam::123456789012:role/lambda-basic
aws lambda invoke --function-name hello --cli-binary-format raw-in-base64-out --payload '{"queryStringParameters":{"name":"Ali"}}' out.json && cat out.json
aws apigatewayv2 create-api --name hello-api --protocol-type HTTP --target arn:aws:lambda:eu-central-1:123456789012:function:hello
aws lambda add-permission --function-name hello --statement-id apigw --action lambda:InvokeFunction --principal apigateway.amazonaws.com --source-arn "arn:aws:execute-api:eu-central-1:123456789012:a1b2c3d4e5/*"
aws logs tail /aws/lambda/hello --since 10m --follow`,
          try: "اعمل الـ role [[lambda-basic]] بـ trust لـ [[lambda.amazonaws.com]] والـ policy الجاهزة [[AWSLambdaBasicExecutionRole]]. ارفع دالة الدرس اللي فات، وخد [[ApiEndpoint]] من رد [[create-api]] وافتحه في المتصفح بـ [[?name=Ali]]. وشوف سطر [[REPORT]] في اللوج: فيه [[Init Duration]] في أول طلب بس.",
          deep: {
            why: "لازم تشوف الأجزاء بعينك: كود، و role، و trigger، وإذن للـ trigger ينادي الدالة. لما حاجة تقع (403 أو 500) هتعرف أنهي جزء ناقص بدل ما تلف في الكونسول.",
            how: R`[[--handler index.handler]] يعني «ملف index (هنا index.mjs) والدالة اللي اسمها handler». و [[fileb://]] يعني اقرا الملف كـ binary.

[[--cli-binary-format raw-in-base64-out]] لازمة في CLI v2 عشان الـ payload يتبعت JSON عادي مش base64. والنتيجة بتتكتب في [[out.json]].

[[create-api]] بـ [[--target]] ده «quick create»: بيعمل HTTP API و route افتراضي ([[$default]]) و stage بيعمل deploy لوحده، وبيرجّع [[ApiEndpoint]]. بس API Gateway لازم ياخد إذن ينادي الدالة: [[add-permission]] بيضيف للدالة resource-based policy «مسموح لـ API Gateway من الـ API ده». من غيرها الطلب بيرجع 500.

HTTP API أرخص وأبسط من REST API القديم، وفيه JWT authorizers و CORS. والـ REST API فيه حاجات زيادة (API keys و usage plans و request validation).

البديل: function URL بـ [[create-function-url-config --auth-type NONE]]. ومن أكتوبر ٢٠٢٥ الـ URL العام محتاج إذنين في الـ resource policy: [[lambda:InvokeFunctionUrl]] و [[lambda:InvokeFunction]] (الكونسول بيعملهم لوحده، الـ CLI لأ).

اللوجات بتروح CloudWatch لوحدها في [[/aws/lambda/NAME]] (عشان كده الـ role فيها صلاحية اللوجات). كل طلب بيطلع سطر [[REPORT]] فيه المدة والرام المستخدمة، و [[Init Duration]] لو كان cold start.`,
            when: "للتجربة والفهم. وفي مشروع حقيقي: SAM أو CDK أو Terraform عشان كل حاجة تبقى في كود.",
            mistakes: "تنسى [[add-permission]] والـ API يرجّع 500 ومفيش ولا سطر في لوج الدالة (لأنها متنادتش أصلًا). وتنسى [[node_modules]] في الـ zip فيطلع [[Cannot find package]]. وتحط الملفات جوه فولدر في الـ zip فالـ handler يبقى [[dist/index.handler]] مش [[index.handler]]."
          },
          lines: [
            "اضغط الكود في zip.",
            "اعمل الدالة: Node 24، والـ handler هو دالة handler في index، و role فيها صلاحية اللوجات.",
            "نادِها بـ event شبه اللي API Gateway بيبعته، واطبع الرد.",
            "اعمل HTTP API بأمر واحد بيوصّل كل الطلبات للدالة.",
            "اسمح لـ API Gateway (الـ API ده بس) ينادي الدالة.",
            "تابع لوجات الدالة لايف."
          ],
          sol: R`بعد [[create-function]] و [[invoke]]، [[out.json]] فيه [[{"statusCode":200,"headers":{...},"body":"{\"hello\":\"Ali\",\"invocations\":1,...}"}]]، والأمر نفسه يطبع [[{"StatusCode": 200, "ExecutedVersion": "$LATEST"}]]. و [[create-api]] يرجّع [[ApiEndpoint]] زي [[https://a1b2c3d4e5.execute-api.eu-central-1.amazonaws.com]]، وفتح [[?name=Ali]] في المتصفح يرجّع الـ JSON نفسه من غير الغلاف: [[{"hello":"Ali","invocations":2,...}]].

وفي [[logs tail]] كل طلب ليه سطر [[REPORT RequestId: ... Duration: 2.1 ms Billed Duration: 3 ms Memory Size: 128 MB Max Memory Used: 70 MB]]، وأول طلب بس فيه كمان [[Init Duration: 150.3 ms]] (الرقم بيفرق)، وده الـ cold start.

أخطاء شائعة: المتصفح يرجّع [[{"message":"Internal Server Error"}]] وده غالبًا لأنك نسيت [[add-permission]]، أو الـ [[--source-arn]] فيه API id مش بتاعك. و [[create-function]] يرجّع [[InvalidParameterValueException: The role defined for the function cannot be assumed by Lambda]] لو الـ trust مش لـ [[lambda.amazonaws.com]] أو لو شغّلته بعد إنشاء الـ role بثواني. و [[Runtime.ImportModuleError]] يعني الملف في الـ zip اسمه مش [[index.mjs]] أو جوه فولدر. واللوج مش بيظهر خالص يعني الـ role ناقصها [[AWSLambdaBasicExecutionRole]].`,
          solCode: R`cat > trust-lambda.json <<'EOF'
{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"lambda.amazonaws.com"},"Action":"sts:AssumeRole"}]}
EOF
aws iam create-role --role-name lambda-basic --assume-role-policy-document file://trust-lambda.json
aws iam attach-role-policy --role-name lambda-basic --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
aws apigatewayv2 get-apis --query "Items[].[Name,ApiEndpoint]" --output table`
        },
        {
          cmd: "SES",
          title: "ابعت إيميلات من تطبيقك توصل الـ inbox",
          desc: R`SES خدمة إيميل رخيصة جدًا بتوثّق فيها دومينك (DKIM بـ ٣ سجلات CNAME) وتبعت من الكود بالـ SDK أو SMTP.

كل حساب جديد بيبدأ في «sandbox» في كل region: تبعت لإيميلات متوثّقة بس، و ٢٠٠ إيميل في اليوم، وإيميل في الثانية. عشان تبعت لأي حد بتطلب production access وتشرح هتبعت إيه.`,
          example: R`import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const ses = new SESv2Client({ region: "eu-central-1" });

export async function sendResetCode(to, code) {
  await ses.send(new SendEmailCommand({
    FromEmailAddress: "MyApp <no-reply@example.com>",
    Destination: { ToAddresses: [to] },
    Content: { Simple: {
      Subject: { Data: "كود استرجاع الباسورد" },
      Body: { Text: { Data: $__btالكود بتاعك: $__{code}. صالح ١٠ دقايق.$__bt } },
    } },
  }));
}`,
          try: R`وثّق الدومين: [[aws sesv2 create-email-identity --email-identity example.com]] بيرجّع ٣ DKIM tokens، حطهم CNAME في الـ DNS. ووثّق إيميلك الشخصي كمان (وانت في الـ sandbox)، وابعت لنفسك، وافتح «Show original» في Gmail وشوف [[DKIM: PASS]] و [[SPF]].`,
          flag: "script",
          deep: {
            why: "إيميلات التسجيل واسترجاع الباسورد لازم توصل الـ inbox مش الـ spam. الإرسال من السيرفر بـ sendmail أو من Gmail SMTP بيخلّي الإيميلات تتعلّم spam أو الحساب يتقفل. SES بيدّيك سمعة إرسال كويسة وأدوات DKIM و SPF و DMARC.",
            how: R`التوثيق: SES بيدّيك ٣ سجلات CNAME للـ DKIM. لما تبعت، SES بيوقّع الإيميل، و Gmail بيجيب المفتاح العام من الـ DNS ويتأكد إن الإيميل مخرجش من حد تاني ومتعدّلش في السكة.

SPF و DMARC: [[MAIL FROM]] مخصص (زي [[mail.example.com]]) بسجل MX و TXT بيخلّي الـ SPF يعدّي بدومينك. وسجل DMARC على [[_dmarc.example.com]] (مثلًا [[v=DMARC1; p=none; rua=mailto:you@example.com]] كبداية) بيقول للمستقبل يعمل إيه مع الإيميلات اللي بتفشل. و Gmail و Yahoo بقوا بيطلبوهم من المرسلين الكتير.

الـ sandbox لكل region لوحدها. الطلب من الكونسول (Get set up ← Request production access) أو [[aws sesv2 put-account-details --production-access-enabled]]، وبتقول نوع الإيميلات (Transactional) والموقع وإزاي بتتعامل مع الـ bounces. الرد عادةً خلال يوم.

الـ bounces والـ complaints: لو نسبتهم عليت AWS بيوقف الإرسال. SES عنده suppression list بيمنع الإرسال لإيميل عمل bounce، واربط SNS أو EventBridge عشان تعرف وتعلّم اليوزر في قاعدة البيانات.`,
            when: "إيميلات التطبيق: تسجيل، واسترجاع باسورد، وفواتير، وإشعارات. للنشرات التسويقية فيه أدوات أنسب فوقه.",
            mistakes: "تجرّب في الـ sandbox وتستغرب إن الإيميل مش واصل لعميل (لأنه مش متوثّق). وتبعت من عنوان [[@gmail.com]] بدل دومينك فالـ DMARC يفشل. وتطلب production access بسطر واحد فيترفض. والتشخيص الكامل لـ «الإيميلات مش بتوصل» في تاب التشخيص."
          },
          lines: [
            "كلاينت SES (النسخة 2 من الـ API).",
            "الكلاينت برا الدالة، مرة واحدة.",
            "دالة تبعت كود استرجاع.",
            "ابعت الأمر.",
            "المرسل: اسم ظاهر وإيميل على دومين متوثّق.",
            "المستقبل (في الـ sandbox لازم يكون متوثّق).",
            "المحتوى: إيميل بسيط.",
            "العنوان.",
            "نص الإيميل.",
            "قفلة المحتوى.",
            "قفلة الأمر.",
            "قفلة الدالة."
          ],
          sol: R`[[create-email-identity]] بيرجّع JSON فيه [[IdentityType: DOMAIN]] و [[VerifiedForSendingStatus: false]] و [[DkimAttributes.Tokens]] فيها ٣ tokens. كل token بيبقى CNAME: الاسم [[TOKEN._domainkey.example.com]] والقيمة [[TOKEN.dkim.amazonses.com]]. بعد ما الـ DNS ينتشر (دقايق لساعات)، [[get-email-identity]] يقول [[DkimAttributes.Status: SUCCESS]] و [[VerifiedForSendingStatus: true]]. وإيميلك الشخصي بيوصله رابط توثيق لازم تضغط عليه.

في Gmail «Show original» المتوقع: [[DKIM: 'PASS' with domain example.com]]، و [[SPF: PASS]] بس غالبًا على دومين [[amazonses.com]] (لأن الـ MAIL FROM الافتراضي بتاع SES)، ولو عندك سجل DMARC هتلاقي [[DMARC: 'PASS']] بسبب الـ DKIM. ولو عايز الـ SPF على دومينك انت، اعمل custom MAIL FROM domain.

الأخطاء الشائعة: [[MessageRejected: Email address is not verified. The following identities failed the check in region EU-CENTRAL-1: ...]] وده لأنك في الـ sandbox وبتبعت لإيميل مش موثّق، أو وثّقت في region والكود على region تانية. والإيميل يوصل Spam يبقى غالبًا الـ DKIM لسه مش SUCCESS.`,
          solCode: R`aws sesv2 create-email-identity --email-identity example.com --query "DkimAttributes.Tokens"
aws sesv2 create-email-identity --email-identity you@gmail.com
aws sesv2 get-email-identity --email-identity example.com --query "[VerifiedForSendingStatus,DkimAttributes.Status]"
aws sesv2 send-email --from-email-address "MyApp <no-reply@example.com>" --destination ToAddresses=you@gmail.com --content "Simple={Subject={Data=test},Body={Text={Data=hello}}}"`
        },
        {
          cmd: "Parameter Store و Secrets Manager",
          title: "الأسرار فين غير ملف .env على السيرفر",
          desc: R`بدل ما [[DATABASE_URL]] ومفاتيح بوابات الدفع تبقى في .env على السيرفر، بتتخزن متشفّرة في AWS والتطبيق ياخدها وقت التشغيل بالـ role بتاعته، وكل قراية بتتسجل.

SSM Parameter Store (النوع [[SecureString]]) ببلاش للاستخدام العادي ومناسب لأغلب المشاريع. Secrets Manager بـ ٠.٤ دولار للسر في الشهر، وميزته إنه بيغيّر الباسوردات لوحده (rotation). تحذير: كل سر في Secrets Manager بيتحاسب لحد ما تمسحه.`,
          example: R`aws ssm put-parameter --name /myapp/prod/DATABASE_URL --type SecureString --value file://db-url.txt
aws ssm get-parameter --name /myapp/prod/DATABASE_URL --with-decryption --query Parameter.Value --output text
aws ssm get-parameters-by-path --path /myapp/prod --with-decryption --query "Parameters[].Name"
aws secretsmanager create-secret --name myapp/prod/stripe --secret-string file://stripe.json
aws secretsmanager get-secret-value --secret-id myapp/prod/stripe --query SecretString --output text`,
          try: "خزّن [[DATABASE_URL]] لبيئة dev في Parameter Store، واعمل سكربت صغير يطلّعها ويحطها في متغير بيئة قبل ما يشغّل التطبيق. بعدين شيل من الـ role صلاحية [[ssm:GetParameter]] وشوف رسالة AccessDenied.",
          flag: "danger",
          deep: {
            why: "ملف .env على السيرفر بيتنسخ في الباك أب، وبيتسرب مع أي ثغرة بتقرا ملفات، ومحدش عارف مين قراه، وتغيير الباسورد معناه تدخل كل سيرفر. التخزين المركزي بيحل ده: مكان واحد، متشفّر بـ KMS، وصلاحية بالـ role، ولوج بكل قراية في CloudTrail.",
            how: R`الأسماء بمسار زي [[/myapp/prod/DATABASE_URL]]، فتقدر تدّي الـ role صلاحية على [[/myapp/prod/*]] بس، وسيرفر الـ dev ميشوفش أسرار الإنتاج.

[[SecureString]] بيتشفّر بمفتاح KMS (الافتراضي [[aws/ssm]] ببلاش). و [[--with-decryption]] لازمة وإلا ترجع القيمة المشفّرة. ولو استخدمت مفتاح KMS انت عامله، الـ role محتاجة [[kms:Decrypt]] عليه.

في ECS مش محتاج تكتب كود: الـ task definition فيها [[secrets]] بتاخد ARN الـ parameter وتحطه متغير بيئة وقت التشغيل. و Lambda مفيهاش حاجة زي كده: بتقرا السر بالـ SDK برا الـ handler (مرة واحدة وقت الـ cold start)، أو بالـ AWS Parameters and Secrets Lambda Extension. وعلى EC2 أو VPS: سكربت الـ deploy يسحبهم ويكتب .env مؤقت، أو التطبيق يقراهم وقت ما يقوم.

[[file://]] بيقرا القيمة من ملف بدل ما تكتبها في الأمر، عشان متفضلش في history الترمنال ولا في [[ps]].

الفرق: Parameter Store (standard) ببلاش ولحد ٤ كيلوبايت للقيمة. Secrets Manager بفلوس، بس فيه rotation تلقائي، ونسخ لـ regions تانية، وقيم أكبر. و RDS بـ [[--manage-master-user-password]] بيستخدمه لوحده.`,
            when: "أي سر في الإنتاج: باسورد القاعدة، ومفاتيح بوابات الدفع، و JWT secret، ومفاتيح الـ AI APIs.",
            mistakes: R`[[--value "postgres://user:pass@..."]] مكتوبة في الأمر فتفضل في [[~/.bash_history]]. وتطبع الـ env كله في اللوج وقت التشخيص. وتدّي التطبيق [[ssm:*]] على كل حاجة فيشوف أسرار كل البيئات. وتغيّر السر وتستغرب إن التطبيق لسه بالقديم: التطبيق قراه وقت ما قام، فلازم restart أو deploy.`
          },
          lines: [
            "خزّن السر متشفّر، والقيمة من ملف مش مكتوبة في الأمر.",
            "اقراه مفكوك التشفير (الـ role لازم تسمح).",
            "اعرض أسماء كل أسرار الإنتاج تحت المسار ده.",
            "Secrets Manager: سر فيه JSON (بيتحاسب ٠.٤ دولار في الشهر).",
            "اقرا السر."
          ],
          sol: R`السكربت تحت. أول تشغيل المفروض يطبع [[DATABASE_URL loaded (57 chars)]] (رقم على قد الـ URL بتاعك) وبعدين التطبيق يشتغل عادي. لاحظ إن السكربت مبيطبعش القيمة نفسها، عشان متتسربش في لوج.

بعد ما تشيل [[ssm:GetParameter]] من الـ role، السكربت يقف ومش هيشغّل التطبيق، وتطلع رسالة زي:

[[An error occurred (AccessDeniedException) when calling the GetParameter operation: User: arn:aws:sts::123456789012:assumed-role/myapp-ec2/i-0abc... is not authorized to perform: ssm:GetParameter on resource: arn:aws:ssm:eu-central-1:123456789012:parameter/myapp/dev/DATABASE_URL because no identity-based policy allows the ssm:GetParameter action]]

الرسالة فيها كل اللي محتاجه: مين (الـ role)، وإيه (الـ action)، وعلى إيه (الـ ARN). والغلطة الشائعة إن السكربت من غير [[set -e]] يكمّل ويشغّل التطبيق بـ [[DATABASE_URL]] فاضي، فتاخد خطأ اتصال غامض من الـ ORM بدل AccessDenied الواضح. وتانية: قيمة SecureString ترجع مشفّرة (نص طويل غريب) لأنك نسيت [[--with-decryption]]، أو ترجع AccessDenied على [[kms:Decrypt]] لو المفتاح customer managed.`,
          solCode: R`#!/bin/bash
set -euo pipefail
DATABASE_URL=$(aws ssm get-parameter --name /myapp/dev/DATABASE_URL --with-decryption --query Parameter.Value --output text)
export DATABASE_URL
echo "DATABASE_URL loaded ($(printf %s "$DATABASE_URL" | wc -c) chars)"
exec node server.js`
        }
      ]
    }
  ]
});

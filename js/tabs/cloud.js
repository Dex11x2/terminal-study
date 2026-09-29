// كل درس هنا في مكان واحد:
//   cmd      اسم الأمر (ولازم يبقى فريد جوه التاب، لأن التقدم محفوظ بيه)
//   title    العنوان القصير، ودا اللي بيظهر كسؤال في «اختبرني»
//   desc     الشرح. الفقرات مفصولة بسطر فاضي، و [[كلام]] بيتعرض كـ code
//   example  المثال. كل سطر أمر، والسطور اللي بتبدأ بـ # تعليق
//   try      التجربة اللي تعملها بإيدك
//   flag     اختياري: "danger" أو "script" (من غير prompt) أو "keys" أو "term" أو "console"
//   mac      اختياري (bash بس): ["both"|"diff"|"linux", ملاحظة الماك]
//   deep     اختياري: why / how / when / mistakes
//   lines    اختياري: شرح لكل سطر في المثال بالترتيب، من غير السطور الفاضية والتعليقات
//   sol      اختياري: حل التجربة والناتج المتوقع (بيظهر مقفول تحت «جرّب»)
//   solCode  اختياري: كود الحل، بيتعرض كـ مثال تحت الـ sol
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
    },
    {
      t: "DNS و Cloudflare",
      l: 2,
      n: "الدومين بيشاور على مين، وإيه اللي بيحصل للطلب قبل ما يوصل سيرفرك",
      items: [
        {
          cmd: "Route 53",
          title: "الدومين يشاور على CloudFront أو load balancer",
          desc: R`Route 53 هو الـ DNS بتاع AWS: بتعمل hosted zone للدومين (٠.٥ دولار في الشهر)، وتحط الـ nameservers بتوعه عند المسجّل، وتضيف records.

الميزة الخاصة alias record: زي CNAME بس بيشتغل على الدومين الرئيسي نفسه ([[example.com]] من غير www)، وبيشاور على CloudFront أو load balancer أو S3، والاستعلامات عليه ببلاش. تحذير: أي تغيير هنا بيغيّر مكان موقعك لكل الناس، فراجعه قبل ما تطبّقه.`,
          example: R`aws route53 list-hosted-zones --query "HostedZones[].[Id,Name]" --output table
aws route53 change-resource-record-sets --hosted-zone-id Z0123456789ABCDEFGHIJ --change-batch file://www.json
aws route53 list-resource-record-sets --hosted-zone-id Z0123456789ABCDEFGHIJ --query "ResourceRecordSets[].[Name,Type,TTL]" --output table
dig +short NS example.com
dig +short www.example.com`,
          try: R`اكتب [[www.json]] بتغيير [[UPSERT]] لسجل A alias: الـ [[Name]] هو [[www.example.com]]، والـ [[AliasTarget]] فيه [[DNSName]] بتاع الـ distribution، و [[HostedZoneId]] الثابت بتاع CloudFront ([[Z2FDTNDATAQYW2]])، و [[EvaluateTargetHealth]] بـ false. نفّذه، وتابع بـ [[dig]] لحد ما يرد.`,
          flag: "danger",
          deep: {
            why: "الدومين أول حاجة في رحلة كل طلب. لو غلطت فيه الموقع كله مش موجود حتى لو كل حاجة تانية سليمة. وفهمه بيخليك تنقل من سيرفر لسيرفر من غير ما حد يحس.",
            how: R`المسجّل (registrar) هو اللي اشتريت منه الدومين، و DNS provider هو اللي بيرد على «example.com فين؟»، وممكن يبقوا مكانين مختلفين. سجل الـ NS عند المسجّل بيقول «اسألوا الـ nameservers دول». ولما تنقل لـ Route 53 أو Cloudflare، بتغيّر الـ NS بس.

الـ records: [[A]] (عنوان IPv4)، و [[AAAA]] (IPv6)، و [[CNAME]] (اسم تاني، ومينفعش على الدومين الرئيسي)، و [[MX]] (الإيميل)، و [[TXT]] (توثيقات زي SPF و DKIM).

الـ alias خاص بـ Route 53: من برا بيبان A عادي، بس جوه بيتتبّع عنوان CloudFront أو الـ ALB لوحده لو اتغير. وفيه كمان routing policies: weighted (تقسيم نسبة بين عنوانين، مفيد في النقل التدريجي)، و latency، و failover مع health checks.

الـ TTL: كام ثانية الناس تحتفظ بالرد. قبل أي نقل نزّله لـ 60 قبلها بيوم، عشان التغيير ينتشر بسرعة، وبعد ما تستقر رجّعه 3600.

[[UPSERT]] يعني «اعمله لو مش موجود، وعدّله لو موجود». والـ change-batch بيتنفذ كله أو مفيش حاجة.`,
            when: "لما البنية على AWS وعايز alias على الدومين الرئيسي. ولو الـ DNS على Cloudflare، بتعمل نفس الحاجة هناك (CNAME flattening).",
            mistakes: "تغيّر الـ NS عند المسجّل قبل ما تنسخ كل الـ records القديمة (خصوصًا MX)، فالإيميل يقف. وتعمل CNAME على [[example.com]] نفسه. وتنقل والـ TTL لسه 86400، فنص الناس على السيرفر القديم يوم كامل. والتشخيص الكامل في تاب التشخيص: «الدومين بيشاور على مين»."
          },
          lines: [
            "الدومينات اللي على Route 53 ورقم كل zone.",
            "طبّق تغيير على الـ records من ملف (هنا www).",
            "اعرض الـ records: الاسم والنوع والـ TTL.",
            "مين الـ nameservers بتوع الدومين فعلًا.",
            "www بتشاور على إيه دلوقتي."
          ],
          sol: R`[[www.json]] تحت. [[change-resource-record-sets]] بيرجّع [[ChangeInfo]] فيه [[Status: PENDING]] و [[Id]]، وبعد أقل من دقيقة غالبًا [[get-change]] يقول [[INSYNC]]. بعدها [[dig +short www.example.com]] بيرجّع كذا IP (عناوين CloudFront، بتتغير)، ومش هترجّع اسم cloudfront.net زي الـ CNAME، لأن الـ alias بيتحل جوه Route 53.

لو [[dig]] مرجّعش حاجة، اتأكد إن [[dig +short NS example.com]] بيرجّع nameservers بتاعة [[awsdns]] نفس اللي في الـ hosted zone؛ لو لسه nameservers المسجّل القديم يبقى الـ zone ده محدش بيسأله. ولو الـ IPs رجعت بس فتح [[https://www.example.com]] طلّع [[403 ERROR The request could not be satisfied]]، يبقى الـ distribution ناقصه Alternate domain name [[www.example.com]] وشهادة ACM ليه (والشهادة لازم تبقى في us-east-1).

وأخطاء الـ JSON: [[InvalidChangeBatch]] لو كتبت [[TTL]] أو [[ResourceRecords]] مع alias (الـ alias ملوش TTL)، أو حطيت [[HostedZoneId]] بتاع الـ zone بتاعك بدل [[Z2FDTNDATAQYW2]].`,
          solCode: R`cat > www.json <<'EOF'
{
  "Comment": "www -> CloudFront",
  "Changes": [{
    "Action": "UPSERT",
    "ResourceRecordSet": {
      "Name": "www.example.com",
      "Type": "A",
      "AliasTarget": {
        "HostedZoneId": "Z2FDTNDATAQYW2",
        "DNSName": "d111111abcdef8.cloudfront.net",
        "EvaluateTargetHealth": false
      }
    }
  }]
}
EOF
CHANGE=$(aws route53 change-resource-record-sets --hosted-zone-id Z0123456789ABCDEFGHIJ --change-batch file://www.json --query ChangeInfo.Id --output text)
aws route53 wait resource-record-sets-changed --id $CHANGE
dig +short www.example.com`
        },
        {
          cmd: "Cloudflare proxy و SSL",
          title: "السحابة البرتقاني و Full (strict)",
          desc: R`في Cloudflare كل سجل DNS يا رمادي (DNS only، الزائر بيروح لسيرفرك مباشرة) يا برتقاني (proxied، الزائر بيكلّم Cloudflare و Cloudflare بيكلّم سيرفرك)، والبرتقاني بيخبّي IP سيرفرك ويدّيك SSL وكاش و WAF وحماية DDoS.

وضع الـ SSL بيحدد الجزء التاني من السكة (من Cloudflare لسيرفرك): Flexible (HTTP من غير تشفير)، و Full (HTTPS من غير ما يتأكد من الشهادة)، و Full (strict) (HTTPS بشهادة سليمة). استخدم Full (strict) دايمًا.`,
          example: R`dig +short myapp.example.com
curl -sI https://myapp.example.com | grep -i -E "^server|cf-ray|cf-cache-status"
echo | openssl s_client -connect 203.0.113.10:443 -servername myapp.example.com 2>/dev/null | openssl x509 -noout -subject -issuer -enddate
curl -sIL --max-redirs 5 http://myapp.example.com | grep -i -E "^HTTP|^location"
for ip in $(curl -s https://www.cloudflare.com/ips-v4); do sudo ufw allow from $ip to any port 80,443 proto tcp; done`,
          try: "خلّي السجل برتقاني وشوف [[dig]] بيرجّع IPs بتاعة Cloudflare مش سيرفرك. اتأكد إن السيرفر عليه شهادة سليمة بأمر openssl، وبعدين غيّر SSL mode لـ Full (strict) وافتح الموقع.",
          deep: {
            why: "Flexible بيدّي قفل أخضر للزائر وهو كذب: من Cloudflare لسيرفرك الكلام رايح نص عادي. وأشهر مشكلة: Flexible + سيرفر بيحوّل HTTP لـ HTTPS = redirect loop (ERR_TOO_MANY_REDIRECTS) ومحدش فاهم ليه.",
            how: R`مع البرتقاني، الـ DNS بيرجّع IPs بتاعة Cloudflare. الزائر بيعمل TLS مع Cloudflare بشهادتهم، و Cloudflare بيفتح اتصال تاني لسيرفرك حسب الـ mode.

Flexible: من Cloudflare لسيرفرك HTTP على 80. لو Nginx عندك بيعمل redirect لـ HTTPS: Cloudflare يطلب HTTP، ياخد redirect، يبعته للزائر، الزائر يطلب HTTPS من Cloudflare، و Cloudflare يطلب HTTP تاني... دايرة.

Full: HTTPS لسيرفرك بس بيقبل أي شهادة (حتى self-signed أو منتهية). Full (strict): لازم الشهادة سليمة وتطابق الاسم: Let's Encrypt (تاب VPS) أو Cloudflare Origin CA (شهادة مجانية لحد ١٥ سنة، و Cloudflare بس اللي بيثق فيها).

IP سيرفرك ممكن يتسرّب برضه: سجل رمادي قديم على نفس السيرفر (زي [[mail]] أو [[ftp]])، أو الإيميلات اللي السيرفر بيبعتها، أو مواقع بتحفظ تاريخ الـ DNS. عشان كده في الآخر اقفل 80 و 443 على السيرفر إلا من IPs بتاعة Cloudflare (الـ loop في المثال)، أو استخدم Cloudflare Tunnel ومتفتحش أي بورت خالص (تاب Node: cloudflared).

ولما السيرفر يبقى ورا Cloudflare، الـ IP اللي Nginx شايفه هو IP بتاع Cloudflare، ولازم [[CF-Connecting-IP]]: التفاصيل في تاب Nginx «IP الزائر ورا Cloudflare».`,
            when: "أي موقع على VPS بدومين: البرتقاني مع Full (strict) هما الإعداد الافتراضي المعقول.",
            mistakes: "Flexible عشان «مفيش شهادة على السيرفر» وبعدين redirect loop. وسجل برتقاني لحاجة مش HTTP (SSH أو Postgres أو SMTP)؛ الـ proxy العادي بيعدّي بورتات HTTP و HTTPS محددة بس. وتقفل ufw على IPs بتاعة Cloudflare وتنسى إن Docker بيفتح البورتات بعيد عن ufw."
          },
          lines: [
            "لو برتقاني، هيرجّع IPs بتاعة Cloudflare مش سيرفرك.",
            "الهيدرز: server: cloudflare و cf-ray معناها الطلب عدّى على Cloudflare.",
            "كلّم سيرفرك مباشرة واطبع الشهادة: مين أصدرها وبتخلص إمتى (لازم سليمة عشان strict).",
            "تابع الـ redirects: لو لفّت ٥ مرات، عندك loop.",
            "اسمح لـ 80 و 443 من IPs بتاعة Cloudflare بس (واقفل الباقي بعدها)."
          ],
          sol: R`مع السحابة البرتقاني، [[dig +short myapp.example.com]] بيرجّع IPs بتاعة Cloudflare (غالبًا بتبدأ بـ [[104.21.]] أو [[172.67.]])، مش IP سيرفرك. و [[curl -sI]] بيرجّع [[server: cloudflare]] و [[cf-ray: ...-CAI]] مثلًا (آخر ٣ حروف هي الـ data center اللي رد، و CAI يعني القاهرة) و [[cf-cache-status: DYNAMIC]] للـ HTML.

أمر openssl على IP السيرفر مباشرة المفروض يطبع [[subject=CN=myapp.example.com]] و [[issuer=C=US, O=Let's Encrypt, CN=...]] وتاريخ [[notAfter]] في المستقبل. لو ده سليم، Full (strict) يشتغل والموقع يفتح عادي. وأمر [[curl -sIL http://...]] المفروض يوري [[301]] لـ https وبعدين [[200]].

أخطاء شائعة: بعد Full (strict) الموقع يطلع Error 526 (Invalid SSL certificate)، وده لأن الشهادة على السيرفر self-signed أو منتهية أو اسمها مختلف. و [[ERR_TOO_MANY_REDIRECTS]] بيحصل لو الـ mode لسه Flexible والسيرفر بيحوّل HTTP لـ HTTPS، فالطلب يلف ما بينهم. و 521 أو 522 يعني Cloudflare مش واصل للسيرفر، غالبًا الفايروول بيقفل IPs بتاعة Cloudflare.`
        },
        {
          cmd: "Cloudflare cache و WAF",
          title: "كاش وحماية قبل ما الطلب يوصل سيرفرك",
          desc: R`Cloudflare افتراضي بيكاش الملفات الثابتة حسب الامتداد (صور و JS و CSS) ومش بيكاش HTML ولا JSON، و [[cf-cache-status]] بيقولك [[HIT]] أو [[MISS]] أو [[DYNAMIC]] (مش بيتكاش أصلًا) أو [[BYPASS]].

Cache Rules بتغيّر ده لمسارات معينة (كاش صفحات المدونة ساعة، و bypass لـ [[/api]] و [[/admin]]). و WAF بيوقف الطلبات الوحشة قبل ما توصل: قواعد جاهزة (managed)، وقواعد انت بتكتبها، و rate limiting.`,
          example: R`curl -sI https://myapp.example.com/assets/app.js | grep -i cf-cache-status
curl -sI https://myapp.example.com/api/me | grep -i cf-cache-status
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_TOKEN" -H "Content-Type: application/json" \
  --data '{"files":["https://myapp.example.com/index.html"]}'`,
          try: R`اعمل Cache Rule: لو المسار بيبدأ بـ [[/blog/]] يبقى Eligible for cache و Edge TTL ساعة، وشوف [[cf-cache-status]] يتحول من DYNAMIC لـ HIT. واعمل WAF custom rule بـ Block على [[(http.request.uri.path contains "/wp-login.php")]] وجرّبها بـ curl.`,
          deep: {
            why: "البوتات بتضرب [[/wp-login.php]] و [[/.env]] على أي موقع حتى لو مش WordPress. وموجة ترافيك من إعلان ممكن توقّع سيرفر ١ جيجا. لو Cloudflare وقفهم أو رد من الكاش، سيرفرك مش هيحس.",
            how: R`قرار الكاش الافتراضي بالامتداد مش بالنوع: [[.js]] و [[.css]] و [[.png]] وغيرهم بيتكاشوا، و [[/]] و [[/about]] (HTML) لأ. ومدة الكاش في الـ edge بتحترم [[Cache-Control]] من سيرفرك لو موجود.

Cache Rules (بدل Page Rules القديمة): شرط (المسار، الدومين، الكوكيز) وإجراء: Eligible for cache أو Bypass، و Edge TTL، و Browser TTL. خلي بالك من الصفحات اللي فيها بيانات يوزر: لو كاشتها، يوزر يشوف صفحة يوزر تاني. القاعدة: bypass لو فيه كوكي session.

Purge: من الداشبورد أو الـ API. [[files]] لملفات بعينها، أو [[purge_everything]] للكل (هيضرب سيرفرك لحد ما الكاش يتملى تاني). والـ token يبقى API token بصلاحية Cache Purge على الـ zone دي بس، مش الـ Global API Key.

WAF: الخطة المجانية فيها Free Managed Ruleset للثغرات المشهورة. و custom rules بلغة زي [[(http.request.uri.path contains "/.env")]] بإجراء Block أو Managed Challenge. و rate limiting rule على [[/api/login]] (مثلًا ١٠ طلبات في الدقيقة لكل IP). وفيه Bot Fight Mode و Under Attack Mode للطوارئ.

وأي حاجة Cloudflare مش بيكاشها بتعدّي لسيرفرك عادي، فالكاش مش بديل عن إن التطبيق نفسه يبقى سريع.`,
            when: "أي موقع ورا Cloudflare: bypass للـ API والأدمن، وكاش للملفات الثابتة، وقاعدتين WAF للمسارات اللي البوتات بتحبها، و rate limit على login.",
            mistakes: "[[Cache Everything]] على الدومين كله فيوزر يشوف لوحة تحكم يوزر تاني. و purge everything مع كل deploy. و Global API Key في سكربت الـ CI بدل token محدود. وتعتمد على Cloudflare يحمي الـ login وانت مش عامل rate limiting في التطبيق نفسه."
          },
          lines: [
            "ملف ثابت: المفروض HIT بعد أول طلب.",
            "API: المفروض DYNAMIC (مش بيتكاش).",
            "امسح ملف معين من كاش Cloudflare بالـ API.",
            "token محدود بصلاحية purge، والـ body JSON.",
            "الملفات اللي عايز تمسحها."
          ],
          sol: R`قبل الـ Cache Rule: ملف [[app.js]] يرجّع [[cf-cache-status: HIT]] (بعد أول طلب MISS)، لأن Cloudflare بيكاش امتدادات static افتراضيًا، و [[/api/me]] يرجّع [[DYNAMIC]] (مش متكاش أصلًا). وصفحة [[/blog/post-1]] برضه [[DYNAMIC]] لأنها HTML. بعد الـ rule: أول طلب [[MISS]]، والتاني [[HIT]]، ولو الـ origin بعت [[Cache-Control: private]] أو [[Set-Cookie]] ممكن تلاقيها [[BYPASS]] أو [[DYNAMIC]] حسب إعدادات الـ rule.

الـ WAF: [[curl -sI https://myapp.example.com/wp-login.php]] يرجّع [[HTTP/2 403]] ومعاه [[cf-ray]]، والـ body صفحة Cloudflare فيها «Sorry, you have been blocked». وفي Security Events هتلاقي الطلب ده باسم الـ rule. والـ purge API يرجّع [[{"success":true,"errors":[],"messages":[],"result":{"id":"..."}}]].

الغلطة الشائعة: تعمل الـ Cache Rule على [[/blog/]] وصفحات فيها حاجة لليوزر المسجّل (زي اسمه في الـ header)، فيوزر يشوف اسم يوزر تاني. ولو [[cf-cache-status]] فضل [[DYNAMIC]] بعد الـ rule، يبقى الـ rule مش بيطابق (راجع الـ expression) أو السحابة رمادي (DNS only) فمفيش Cloudflare في النص أصلًا.`,
          solCode: R`# Cache Rule expression:
starts_with(http.request.uri.path, "/blog/")
# WAF custom rule expression (Action: Block):
(http.request.uri.path contains "/wp-login.php")
# التجربة:
curl -sI https://myapp.example.com/blog/post-1 | grep -i cf-cache-status
curl -sI https://myapp.example.com/blog/post-1 | grep -i cf-cache-status
curl -s -o /dev/null -w "%{http_code}\n" https://myapp.example.com/wp-login.php`
        }
      ]
    },
    {
      t: "Cloudflare للمطوّر: Pages و R2 و Workers و Tunnel",
      l: 2,
      n: "موقع Vite على الـ edge، وتخزين زي S3 من غير رسوم خروج، وكود صغير قبل سيرفرك، ومدخل للإنتاج من غير ما تفتح بورت",
      items: [
        {
          cmd: "Cloudflare Pages",
          title: "موقع Vite على Cloudflare: من git ولا من الترمنال",
          desc: R`موقع Vite أو React بعد [[npm run build]] مجرد فولدر [[dist]] فيه HTML و JS و CSS، و Cloudflare بيخدمه من الـ CDN بتاعه في كل مكان، والطلبات على الملفات الثابتة مجانية.

فيه طريقتين: Cloudflare Pages (تربط الريبو، وكل push يعمل build، وكل branch ليه preview URL، أو ترفع [[dist]] بـ [[wrangler pages deploy]])، أو Workers static assets (ملف [[wrangler.jsonc]] فيه [[assets]] وبعدين [[wrangler deploy]]). Cloudflare بقى بيقول إن المشاريع الجديدة تبدأ على Workers، و Pages لسه شغال ومدعوم للمشاريع الموجودة، والاتنين بيدّوك نفس النتيجة لموقع static.

ولو الموقع SPA فيه routing (React Router)، لازم تقول لـ Cloudflare «أي مسار مش ملف رجّع index.html»، وإلا [[/dashboard]] يطلع 404 لما حد يعمل refresh.`,
          example: R`npm create vite@latest my-site -- --template react-ts
cd my-site && npm i && npm run build
npx wrangler login
npx wrangler pages deploy dist --project-name my-site --branch main
npx wrangler pages deploy dist --project-name my-site --branch feature-x
# أو Workers static assets: wrangler.jsonc زي الـ sol، وبعدين
npx wrangler deploy`,
          try: R`اعمل موقع Vite فيه React Router بصفحتين ([[/]] و [[/about]]). انشره بطريقة من الاتنين، وافتح [[/about]] مباشرة (مش من لينك جوه الموقع) واعمل refresh. لو طلع 404 صلّحه. وبعدين اربط دومين فرعي من الداشبورد ([[www.example.com]]).`,
          deep: {
            why: "موقع static على VPS معناه Nginx وشهادة وسيرفر لازم يفضل شغال، عشان حاجة ممكن تتخدم من CDN ببلاش تقريبًا. Cloudflare (زي Vercel و Netlify) بيخدمه من أقرب مكان لليوزر، مع HTTPS و preview لكل branch، وده مناسب جدًا لـ landing page أو dashboard بيكلّم API منفصل.",
            how: R`Pages من git: في الداشبورد Workers & Pages ثم Create، وتختار الريبو، و build command [[npm run build]]، و output directory [[dist]]. الـ branch الأساسي production، وأي branch تاني preview على [[BRANCH.my-site.pages.dev]].

Pages من الترمنال (Direct Upload): [[wrangler pages deploy dist]] بيرفع الفولدر كما هو. [[--branch main]] (أو الـ production branch بتاع المشروع) = production، وأي اسم تاني = preview. مفيد لو الـ build بيحصل في GitHub Actions.

Workers static assets: ملف [[wrangler.jsonc]] فيه [[name]] و [[compatibility_date]] و [[assets.directory = "./dist"]]. وتقدر تضيف [[main]] (Worker بكود) فيبقى عندك API و frontend في deploy واحد (درس [[Workers]]). وفي نسخ wrangler الجديدة، ممكن [[pages deploy]] لمشروع جديد يقترح عليك تروح Workers.

الـ SPA fallback: في Workers بتكتب [[not_found_handling: "single-page-application"]]. في Pages، لو مفيش [[404.html]] في الـ output، Pages بيعامل المشروع كـ SPA ويرجّع [[index.html]] للمسارات المش موجودة. والـ redirects والـ headers في ملفات [[_redirects]] و [[_headers]] جوه [[public/]].

متغيرات البيئة: Vite بيكتب [[import.meta.env.VITE_*]] جوه الـ JS وقت الـ build، فهي مش سر، وأي حاجة سرية تروح للـ API مش للـ frontend.`,
            when: "أي frontend static أو SPA: portfolio، landing، dashboard بيكلّم API على دومين تاني. لو محتاج SSR لـ Next.js بكل مميزاته، Vercel أو سيرفر Node أسهل (تاب Next.js).",
            mistakes: R`SPA من غير fallback فكل refresh على صفحة داخلية يطلع 404. وتحط مفتاح API سري في [[VITE_API_KEY]] فيطلع في الـ JS لأي حد. وتنسى إن الـ output directory لـ Vite هو [[dist]] مش [[build]] (ده CRA القديم). وتربط الدومين الرئيسي بـ CNAME وهو مش على Cloudflare DNS.`
          },
          lines: [
            "مشروع Vite جديد بـ React و TypeScript.",
            "سطّب وابني: الناتج في dist.",
            "اربط wrangler بحسابك (بيفتح المتصفح).",
            "ارفع dist كـ production على Pages (أول مرة بيعمل المشروع).",
            "نفس الفولدر كـ preview لـ branch تانية (URL لوحده).",
            "أو انشر كـ Worker بـ static assets حسب wrangler.jsonc."
          ],
          sol: R`بعد [[pages deploy]] هتاخد URL زي [[https://my-site.pages.dev]] (أو URL فيه hash لكل deploy)، وللـ preview [[https://feature-x.my-site.pages.dev]]. ولو استخدمت Workers هتاخد [[https://my-site.YOUR-SUBDOMAIN.workers.dev]].

اختبار الـ refresh: [[curl -I https://my-site.pages.dev/about]] المفروض يرجّع 200 ومحتواه هو [[index.html]]. لو رجّع 404، يبقى فيه [[404.html]] في [[dist]] (فـ Pages مبقاش يعتبره SPA)، أو في Workers ناقصك [[not_found_handling]].

الغلطة الشائعة التانية: الصفحة بيضا والـ console فيه 404 على [[/assets/index-abc.js]]، وده لأنك غيّرت [[base]] في [[vite.config.ts]] أو رفعت فولدر غير [[dist]].`,
          solCode: R`// wrangler.jsonc لطريقة Workers static assets
{
  "name": "my-site",
  "compatibility_date": "2026-09-01",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}`
        },
        {
          cmd: "R2",
          title: "R2: تخزين زي S3 بنفس الكود ومن غير رسوم خروج",
          desc: R`R2 تخزين ملفات (object storage) من Cloudflare بيتكلم نفس API بتاع S3، فبتستخدم [[@aws-sdk/client-s3]] زي ما هو، وبتغيّر 3 حاجات بس: الـ [[endpoint]] بقى [[https://ACCOUNT_ID.r2.cloudflarestorage.com]]، والـ [[region]] بقى [[auto]]، والمفاتيح من R2 API token.

الفرق الكبير في الفلوس: مفيش رسوم على الداتا اللي بتخرج (egress). في S3 كل جيجا بتنزل لليوزر بتتحاسب، وده ممكن يبقى أكبر بند في الفاتورة لموقع صور أو فيديو. وقت كتابة الدرس فيه free tier شهري (حوالي ١٠ جيجا تخزين وملايين من العمليات)، وبعدها بتدفع على التخزين والعمليات بس. راجع صفحة الأسعار.`,
          example: R`import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const r2 = new S3Client({
  region: "auto",
  endpoint: "https://" + process.env.R2_ACCOUNT_ID + ".r2.cloudflarestorage.com",
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY },
  requestChecksumCalculation: "WHEN_REQUIRED",
});

const put = new PutObjectCommand({ Bucket: "myapp-uploads", Key: "avatars/42.webp", ContentType: "image/webp" });
const uploadUrl = await getSignedUrl(r2, put, { expiresIn: 300 });
const get = new GetObjectCommand({ Bucket: "myapp-uploads", Key: "avatars/42.webp" });
const downloadUrl = await getSignedUrl(r2, get, { expiresIn: 3600 });
console.log(uploadUrl.split("?")[0]);
console.log(new URL(downloadUrl).searchParams.get("X-Amz-Expires"));`,
          try: R`من غير حساب حتى: سطّب [[@aws-sdk/client-s3]] و [[@aws-sdk/s3-request-presigner]] في فولدر تجربة، وشغّل الملف بمتغيرات وهمية ([[R2_ACCOUNT_ID=0123456789abcdef0123456789abcdef]] وأي مفاتيح). التوقيع بيتحسب على جهازك فمش محتاج نت. وبعدين لو عندك حساب: اعمل bucket و R2 API token بصلاحية Object Read & Write على الـ bucket ده بس، وارفع ملف فعلًا بـ [[curl -X PUT --upload-file]] على الـ uploadUrl.`,
          flag: "script",
          deep: {
            why: "ملفات المستخدمين مكانها object storage مش ديسك السيرفر (عشان تقدر تكبّر وتنقل). و S3 هو المعيار، بس رسوم الخروج بتفاجئ الناس: موقع بيعرض صور كتير ممكن يدفع على الترافيك أكتر من التخزين. R2 بيشيل البند ده، ولأنه بيتكلم S3 API، النقل منه وإليه تغيير إعدادات مش إعادة كتابة.",
            how: R`الكود هو هو اللي في درس [[presigned URL]]: السيرفر بيعمل رابط موقّع مؤقت، والمتصفح بيرفع عليه مباشرة بـ PUT، فالملف مبيعديش على سيرفرك. [[getSignedUrl]] بيحسب التوقيع محليًا بالمفتاح السري، ومبيكلّمش R2 خالص.

المفاتيح: من R2 في الداشبورد، Manage API tokens، واعمل token بصلاحية على bucket معين. هيدّيك Access Key ID و Secret Access Key (دول اللي بيدخلوا الـ SDK). والـ Account ID موجود في الداشبورد.

العرض للناس: الـ bucket خاص افتراضيًا. يا إما presigned GET زي المثال (لملفات خاصة)، يا إما تربط custom domain بالـ bucket ([[files.example.com]]) فيبقى public ومعاه كاش Cloudflare، ودي أحسن للصور العامة. وفيه [[r2.dev]] URL للتجربة بس (عليه rate limit ومفيش كاش).

الـ CORS: المتصفح بيرفع على دومين R2 مش دومينك، فلازم CORS policy على الـ bucket تسمح بـ [[PUT]] من [[https://myapp.example.com]] وبالـ header [[Content-Type]].

من جوه Worker مش محتاج SDK: بتعمل binding للـ bucket وتستخدم [[env.BUCKET.put()]] و [[env.BUCKET.get()]] (درس [[Workers]]).

فرق عن S3: مفيش regions بالمعنى ده (فيه location hint)، وبعض مميزات S3 مش موجودة أو مختلفة (زي بعض إعدادات الـ ACL والـ events). و [[requestChecksumCalculation: "WHEN_REQUIRED"]] في المثال مهمة: نسخ SDK v3 الجديدة بتحسب checksum افتراضيًا، وفي الـ presigned PUT بتحط في الرابط [[x-amz-checksum-crc32]] محسوب على body فاضي (قيمته [[AAAAAA==]])، فأي ملف حقيقي يترفع عليه يترفض لأن الـ checksum مش مطابق.`,
            when: "صور ومرفقات المستخدمين، والباك أب (Coolify و Dokploy بيدعموه كـ S3)، وأي ملفات بتتنزل كتير. S3 يفضل أحسن لو كل حاجة تانية على AWS ومحتاج events لـ Lambda وصلاحيات IAM.",
            mistakes: R`endpoint غلط (بتحط bucket في الـ host بإيدك أو تنسى الـ Account ID)، أو [[region: "us-east-1"]] بدل [[auto]]. و token بصلاحية على كل الـ buckets. ومفاتيح R2 في كود الـ frontend بدل presigned URL. وتستخدم [[r2.dev]] في الإنتاج. وتنسى الـ CORS فالرفع من المتصفح يفشل برسالة CORS مع إن الـ URL سليم.`
          },
          lines: [
            "الـ client والأوامر من AWS SDK زي S3 بالظبط.",
            "دالة الروابط الموقّعة.",
            "client جديد لـ R2.",
            "R2 مفيهوش regions، فـ auto.",
            "الـ endpoint بتاع حسابك على R2.",
            "مفاتيح R2 API token من متغيرات البيئة.",
            "من غيرها SDK v3 بيحط [[x-amz-checksum-crc32]] لجسم فاضي في رابط الـ PUT، فالرفع بملف حقيقي يفشل. كده الـ checksum بيتحسب بس لما العملية تطلبه.",
            "قفلة.",
            "أمر رفع لمسار معين بنوع ملف معين.",
            "رابط رفع صالح ٥ دقايق.",
            "أمر تنزيل لنفس الملف.",
            "رابط تنزيل صالح ساعة.",
            "اطبع الرابط من غير التوقيع.",
            "اطبع مدة صلاحية رابط التنزيل من الـ query."
          ],
          sol: R`بالمتغيرات الوهمية الناتج:

[[https://myapp-uploads.0123456789abcdef0123456789abcdef.r2.cloudflarestorage.com/avatars/42.webp]]
[[3600]]

لاحظ إن الـ SDK حط اسم الـ bucket في أول الـ host لوحده (virtual-hosted style)، ومفيش أي طلب اتبعت لـ R2: التوقيع اتحسب على جهازك، فحتى مفاتيح غلط بتطلّع رابط، بس الرفع عليه هيرجّع 403 [[SignatureDoesNotMatch]] أو [[InvalidAccessKeyId]].

مع حساب حقيقي: [[curl -X PUT -H "Content-Type: image/webp" --upload-file a.webp "UPLOAD_URL"]] يرجّع 200، والملف يظهر في الـ bucket. لو رجّع 403 [[SignatureDoesNotMatch]] مع مفاتيح صح، غالبًا الـ Content-Type اللي بعته مختلف عن اللي في [[PutObjectCommand]]، لأنه جزء من التوقيع.`,
          solCode: R`npm init -y && npm i @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
R2_ACCOUNT_ID=0123456789abcdef0123456789abcdef R2_ACCESS_KEY_ID=test R2_SECRET_ACCESS_KEY=test node r2.mjs
curl -X PUT -H "Content-Type: image/webp" --upload-file avatar.webp "UPLOAD_URL_FROM_THE_SCRIPT"`
        },
        {
          cmd: "Workers",
          title: "Workers: كود صغير بيرد من أقرب مكان لليوزر",
          desc: R`Worker دالة JavaScript بتاخد [[Request]] وترجّع [[Response]] (نفس Web APIs اللي في المتصفح و Node 18+)، وبتشتغل على سيرفرات Cloudflare في كل مكان، من غير cold start تقريبًا لأنها isolates مش containers.

الـ [[env]] فيه المتغيرات والأسرار والـ bindings: bucket R2، أو KV، أو قاعدة D1، أو Durable Objects. والـ binding معناه إن الـ Worker بيكلّم الخدمة من غير مفاتيح ولا SDK.

وقت كتابة الدرس الخطة المجانية فيها حد يومي للطلبات (حوالي ١٠٠ ألف) ووقت CPU قليل لكل طلب، والخطة المدفوعة بتبدأ بـ ٥ دولار في الشهر. راجع الأرقام قبل ما تعتمد عليها.`,
          example: R`export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname === "/api/hello") {
      const country = request.cf?.country ?? "unknown";
      return Response.json({ hello: env.GREETING, country });
    }
    if (url.pathname.startsWith("/files/")) {
      const obj = await env.BUCKET.get(url.pathname.slice(7));
      if (!obj) return new Response("not found", { status: 404 });
      return new Response(obj.body, { headers: { "content-type": obj.httpMetadata?.contentType ?? "application/octet-stream" } });
    }
    return new Response("not found", { status: 404 });
  },
};`,
          try: R`من غير حساب: احفظ الـ Worker في [[worker.mjs]]، واعمل [[test.mjs]] بيعمل import ليه وبينادي [[worker.fetch(new Request(...), env, {})]] بـ env وهمي فيه [[GREETING]] و [[BUCKET]] بدالة [[get]] بترجّع object لمفتاح واحد بس. جرّب ٤ مسارات. وبعدين بحساب: [[npm create cloudflare@latest]]، و [[npx wrangler dev]]، و [[npx wrangler deploy]].`,
          flag: "script",
          deep: {
            why: "حاجات كتير صغيرة مش محتاجة سيرفر: redirect حسب البلد، أو API صغير بيقرا من R2 أو KV، أو webhook receiver، أو حماية endpoint بتوكن قبل ما يوصل سيرفرك. Worker بيعمل ده قريب من اليوزر، وتقريبًا ببلاش لحجم صغير، ومن غير سيرفر تحدّثه.",
            how: R`الـ Worker ES module بيعمل [[export default]] لـ object فيه [[fetch]]. Cloudflare بيناديها مع كل طلب بـ ٣ حاجات: [[request]] (Request عادي ومعاه [[request.cf]] فيه البلد والمدينة وغيرهم)، و [[env]]، و [[ctx]] ([[ctx.waitUntil(promise)]] تكمّل شغل بعد ما الرد يتبعت، زي لوج أو analytics).

الـ runtime مش Node: مفيش [[fs]] ولا process طويل، والكود بيشتغل لكل طلب لوحده وبحد CPU. وفيه [[nodejs_compat]] flag بيدّيك جزء كبير من Node APIs (زي [[Buffer]] و [[crypto]])، بس مش كل المكتبات بتشتغل.

الإعداد في [[wrangler.jsonc]]: [[main]] (ملف الكود)، و [[vars]] (متغيرات عادية)، و [[r2_buckets]] بـ [[binding: "BUCKET"]] و [[bucket_name]]، والأسرار بـ [[wrangler secret put NAME]] مش في الملف.

[[wrangler dev]] بيشغّل الـ Worker على جهازك بـ workerd (نفس الـ runtime) وبـ R2 و KV محليين. و [[wrangler deploy]] بينشره على [[NAME.SUBDOMAIN.workers.dev]] أو على route في دومينك. و [[wrangler tail]] لايف لوجات.

ولأنه Request و Response عاديين، تقدر تختبر الـ handler في Node مباشرة زي التجربة، أو بـ Vitest ومعاه pool خاص بـ Workers.`,
            when: "منطق خفيف قريب من اليوزر، و APIs صغيرة على R2 أو KV أو D1، وتحويلات على الطلب قبل سيرفرك، والـ webhooks. مش مكان شغل تقيل على CPU، ولا مكتبات Node بتعتمد على الديسك أو native modules.",
            mistakes: R`تفتكر إن الـ Worker Node فتعمل [[import fs]] أو تحط connection pool لـ Postgres في متغير global وتتوقع إنه يعيش (للقواعد فيه Hyperdrive). وتحط أسرار في [[vars]] جوه [[wrangler.jsonc]] اللي على GitHub. وتنسى [[await]] لشغل مش مهم بدل [[ctx.waitUntil]] فالرد يستنى. وتقرا [[obj.body]] مرتين (stream بيتقري مرة واحدة).`
          },
          lines: [
            "الـ Worker بيصدّر object فيه دوال الأحداث.",
            "fetch: بتتنادى مع كل طلب HTTP.",
            "اقرا المسار من الـ URL.",
            "مسار API صغير.",
            "البلد من بيانات Cloudflare (مش موجودة في الاختبار المحلي).",
            "رد JSON فيه متغير من env.",
            "قفلة.",
            "مسار ملفات من R2.",
            "هات الملف من الـ bucket عن طريق الـ binding بالمفتاح اللي بعد /files/.",
            "مش موجود: 404.",
            "رجّع الملف stream بنوعه المتخزن.",
            "قفلة.",
            "أي مسار تاني: 404.",
            "قفلة fetch.",
            "قفلة الـ object."
          ],
          sol: R`بـ env وهمي فيه [[GREETING: "ahlan"]] و bucket بيرجّع ملف لـ [[a.txt]] بس، الناتج:

[[/api/hello 200 application/json {"hello":"ahlan","country":"unknown"}]]
[[/files/a.txt 200 text/plain hi from r2]]
[[/files/b.txt 404 text/plain;charset=UTF-8 not found]]
[[/x 404 text/plain;charset=UTF-8 not found]]

[[country]] بـ [[unknown]] لأن [[request.cf]] مش موجود برا Cloudflare. بعد [[wrangler deploy]] هتلاقي البلد الحقيقية (زي [[EG]]).

الغلطة الشائعة: [[TypeError: Cannot read properties of undefined (reading 'get')]]، وده لأن [[env.BUCKET]] مش موجود: اسم الـ binding في [[wrangler.jsonc]] مختلف عن اللي في الكود، أو نسيت تعدّي env في الاختبار.`,
          solCode: R`// test.mjs
import worker from "./worker.mjs";
const env = {
  GREETING: "ahlan",
  BUCKET: { get: async (k) => (k === "a.txt" ? { body: "hi from r2", httpMetadata: { contentType: "text/plain" } } : null) },
};
for (const p of ["/api/hello", "/files/a.txt", "/files/b.txt", "/x"]) {
  const r = await worker.fetch(new Request("https://myapp.example.workers.dev" + p), env, {});
  console.log(p, r.status, r.headers.get("content-type"), await r.text());
}`
        },
        {
          cmd: "Cloudflare Tunnel",
          title: "السيرفر في الإنتاج من غير ولا بورت مفتوح",
          desc: R`Cloudflare Tunnel بيقلب الاتجاه: بدل ما الناس توصل لسيرفرك على 80 و 443، برنامج [[cloudflared]] على السيرفر بيفتح اتصال طالع لـ Cloudflare، والطلبات بترجع عليه. فالفايروول يقفل كل البورتات الداخلة (إلا SSH، أو حتى SSH كمان)، و IP السيرفر مبيبقاش له لازمة للزائر.

للتجربة على جهازك فيه درس [[cloudflared]] في «تاب Node». هنا نسخة الإنتاج: tunnel بيتدار من الداشبورد بـ token، و [[cloudflared]] شغال كـ service أو container، وكل hostname بيروح لخدمة داخلية.`,
          example: R`# ~/.cloudflared/config.yml (لو بتدير الـ tunnel من ملف مش من الداشبورد)
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /etc/cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json
ingress:
  - hostname: api.example.com
    service: http://localhost:3000
  - hostname: app.example.com
    service: http://localhost:8080
  - service: http_status:404`,
          try: R`على VPS فيه API شغال على [[localhost:3000]]: من الداشبورد (Zero Trust ثم Networks ثم Tunnels) اعمل tunnel، وخد أمر التسطيب بالـ token وشغّله على السيرفر ([[sudo cloudflared service install TOKEN]]). ضيف Public hostname [[api.example.com]] على [[http://localhost:3000]]. بعدين اقفل 80 و 443 في ufw، واتأكد إن الموقع لسه شغال من برا، وإن [[curl http://SERVER_IP]] ما بيردش.`,
          flag: "script",
          deep: {
            why: "كل بورت مفتوح باب بيتفحص طول اليوم. ولما السيرفر ورا Cloudflare proxy عادي، لسه ممكن حد يلاقي الـ IP ويضربه مباشرة ويعدّي WAF و rate limiting (درس [[Cloudflare proxy و SSL]]). مع Tunnel مفيش باب أصلًا. وكمان بيحل مشكلة سيرفر في البيت أو ورا NAT من غير IP ثابت.",
            how: R`[[cloudflared]] بيفتح كذا اتصال طالع (outbound) لأقرب data centers بتوع Cloudflare. الزائر بيطلب [[api.example.com]]، الـ DNS بيشاور على [[TUNNEL_ID.cfargotunnel.com]] (CNAME برتقاني)، و Cloudflare بيبعت الطلب في الـ tunnel، و [[cloudflared]] بيوصّله لـ [[localhost:3000]].

طريقتين للإدارة: remotely-managed (من الداشبورد، والسيرفر عليه token بس، وده الأسهل والمنصوح بيه) أو locally-managed (ملف [[config.yml]] زي المثال، وملف credentials JSON من [[cloudflared tunnel create]]).

الـ [[ingress]] بيتقري من فوق لتحت، وأول قاعدة hostname بتطابق بتكسب، والقاعدة الأخيرة لازم تبقى catch-all من غير hostname (هنا 404)، وإلا [[cloudflared]] يرفض يشتغل. وتقدر تتحقق بـ [[cloudflared tunnel ingress validate]].

التشغيل الدايم: [[cloudflared service install]] بيعمل systemd service. أو في Docker Compose: container [[cloudflare/cloudflared]] بأمر [[tunnel run]] ومتغير [[TUNNEL_TOKEN]]، وعلى نفس الشبكة فالـ service يبقى [[http://api:3000]] (اسم الـ container)، ومتعملش [[ports:]] للـ API خالص.

ومع Cloudflare Access تحط تسجيل دخول (Google أو إيميل OTP) قبل hostname زي [[admin.example.com]] أو لوحة Coolify، فمحدش يوصل للصفحة أصلًا من غير ما يثبت هو مين.`,
            when: "أي سيرفر إنتاج صغير ورا Cloudflare، ولوحات التحكم الداخلية (Grafana و Coolify و pgAdmin)، والسيرفرات اللي ورا NAT. مش مناسب لو الترافيك مش HTTP (زي UDP لألعاب) من غير إعدادات إضافية.",
            mistakes: R`تعمل الـ tunnel وتسيب 80 و 443 مفتوحين، فالفايدة الأمنية راحت. وتنسى الـ catch-all في [[ingress]]. و [[ports: "3000:3000"]] في compose فالـ API مفتوح على الـ IP برضه. وتحط [[localhost]] في الـ service والـ cloudflared جوه container (الـ localhost بتاعه هو الـ container نفسه). وتحط الـ token في ملف على GitHub: الـ token ده يقدر يشغّل الـ tunnel من أي جهاز.`
          },
          lines: [
            "رقم الـ tunnel (من cloudflared tunnel create).",
            "ملف المفاتيح بتاعه.",
            "قواعد التوجيه، بالترتيب.",
            "الطلبات على api.example.com...",
            "...تروح للـ API على البورت ٣٠٠٠ محليًا.",
            "والـ frontend على دومين تاني...",
            "...على ٨٠٨٠.",
            "أي حاجة تانية: 404 (لازم تبقى آخر قاعدة)."
          ],
          sol: R`بعد التسطيب، [[systemctl status cloudflared]] يقول [[active (running)]]، والداشبورد يوري الـ tunnel بحالة [[HEALTHY]]. و [[dig +short api.example.com]] يرجّع IPs بتاعة Cloudflare، و [[curl -sI https://api.example.com/healthz]] يرجّع 200 ومعاه [[cf-ray]].

بعد [[sudo ufw delete allow 80/tcp]] و [[sudo ufw delete allow 443/tcp]]: الموقع لسه شغال من برا (لأن الاتصال طالع من السيرفر)، و [[curl -m 5 http://SERVER_IP]] يعمل timeout.

الغلطات الشائعة: [[502 Bad Gateway]] من Cloudflare، ولوج [[cloudflared]] فيه [[connection refused]]، وده لأن الـ API مش شغال أو بيسمع على بورت تاني أو cloudflared في container وانت كاتب localhost. أو [[1033]] (Argo Tunnel error)، وده معناه إن مفيش [[cloudflared]] متصل بالـ tunnel ده دلوقتي.`,
          solCode: R`# docker-compose.yml: الـ API من غير أي ports، و cloudflared بيوصله بالاسم
services:
  api:
    build: .
    environment:
      - PORT=3000
  tunnel:
    image: cloudflare/cloudflared:latest
    command: tunnel --no-autoupdate run
    environment:
      - TUNNEL_TOKEN=$__{TUNNEL_TOKEN}
    restart: unless-stopped
# وفي الداشبورد: Public hostname api.example.com على http://api:3000`
        }
      ]
    },
    {
      t: "منصات جاهزة للفرق الصغيرة",
      l: 2,
      n: "push والموقع يطلع، وقاعدة بيانات من غير سيرفر، بس افهم الحدود قبل ما تتفاجئ",
      items: [
        {
          cmd: "vercel",
          title: "Next.js على منصة جاهزة: preview و env والحدود",
          desc: R`Vercel بيبني Next.js مع كل push: الـ branch الرئيسي production، وأي branch أو PR تاني preview بـ URL لوحده، والصفحات والـ API routes بتشتغل Functions والملفات الثابتة على الـ CDN.

متغيرات البيئة ليها ٣ بيئات (Production و Preview و Development)، وأي تغيير فيها بيتطبق على الـ deploy الجاي بس. ولازم تعرف الحدود: مدة الدالة (٥ دقايق افتراضي)، وجسم الطلب ٤.٥ ميجا، وخطة Hobby للاستخدام الشخصي غير التجاري بس.`,
          example: R`npm i -g vercel
vercel link
vercel env add DATABASE_URL production
vercel env pull .env.local
vercel
vercel --prod
vercel logs https://myapp-abc123.vercel.app`,
          try: "اربط مشروع Next.js من GitHub، واعمل branch فيه تعديل صغير وافتح PR: هتلاقي تعليق فيه URL الـ preview. غيّر متغير بيئة وافتح الـ preview القديم: لسه بالقيمة القديمة.",
          deep: {
            why: "لـ Next.js، Vercel أسهل طريقة: مفيش Dockerfile ولا Nginx ولا SSL. بس الناس بتتفاجئ: فاتورة Pro، أو رفع ملف ١٠ ميجا بيقع، أو كل query بطيئة، أو متغير جديد مش باين.",
            how: R`كل deploy نسخة ثابتة مستقلة بـ URL خاص، والدومين بيشاور على آخر production. عشان كده الـ rollback لحظي (Instant Rollback)، وعشان كده تغيير متغير بيئة مش بيأثر على deploy قديم: المتغيرات بتتقرا وقت الـ build (خصوصًا [[NEXT_PUBLIC_*]] اللي بتتكتب جوه الـ JS نفسه).

الـ preview بياخد متغيرات Preview، فخلّي فيها قاعدة بيانات تجربة مش الإنتاج. Neon مثلًا بيعمل branch من القاعدة لكل preview.

الـ Functions افتراضي بتشتغل في region واحدة في أمريكا ([[iad1]]). لو القاعدة في فرانكفورت، كل query بتعدّي الأطلنطي. غيّر region الدوال لأقرب واحدة للقاعدة ([[fra1]]) من إعدادات المشروع أو [[vercel.json]].

الحدود المهمة: مدة الدالة ٣٠٠ ثانية افتراضي (Pro يقدر يوصل ٨٠٠). جسم الطلب والرد ٤.٥ ميجا، فرفع الملفات يبقى presigned لـ S3 أو storage. مفيش ديسك دايم: أي ملف تكتبه بيروح. والـ WebSockets الطويلة والشغل الخلفي التقيل مش مكانهم.

Netlify نفس الفكرة تقريبًا: deploy previews، ومتغيرات بيئة لكل context، و [[netlify deploy --prod]].`,
            when: "Next.js أو frontend لفريق صغير عايز يركز على المنتج. وقارن السعر مع VPS لما الترافيك يكبر.",
            mistakes: "مشروع لعميل بيدفع على خطة Hobby. و preview متوصل بقاعدة الإنتاج فأي تجربة بتكتب في الداتا الحقيقية. وتنسى تغيّر region الدوال. وتحط سر في متغير بيبدأ بـ [[NEXT_PUBLIC_]] فيطلع في الـ JS لأي حد يفتح الموقع."
          },
          lines: [
            "سطّب الـ CLI.",
            "اربط الفولدر ده بمشروع على Vercel.",
            "ضيف متغير لبيئة الـ production (بيسألك عن القيمة).",
            "نزّل متغيرات Development لملف محلي.",
            "deploy كـ preview (URL لوحده).",
            "deploy للـ production.",
            "لوجات deploy معين."
          ],
          sol: R`بعد ربط الريبو وفتح الـ PR، Vercel bot بيكتب تعليق على الـ PR فيه جدول بالـ Status (Building ثم Ready) ولينك Preview زي [[https://myapp-git-feature-x-yourteam.vercel.app]]، وكل push جديد على الـ branch بيعمل preview جديد ويحدّث التعليق. والـ Checks في الـ PR فيها Vercel كـ check.

بعد ما تغيّر متغير بيئة للـ Preview من الداشبورد أو بـ [[vercel env]]، الـ preview القديم هيفضل بالقيمة القديمة. ده مقصود: كل deployment immutable، والمتغيرات بتتقري وقت الـ build (و [[NEXT_PUBLIC_*]] بتتكتب جوه الـ JS نفسه). عشان تاخد القيمة الجديدة لازم deployment جديد: push تاني أو Redeploy من الداشبورد.

الغلطة الشائعة: تغيّر المتغير في Production بس وتستغرب إن الـ preview مش شايفه (كل environment ليه قيم لوحده). أو تنسى تعمل [[vercel env pull]] تاني فالـ [[.env.local]] على جهازك بالقيمة القديمة. وتانية: [[vercel logs]] مبيعرضش لوجات قديمة كتير على الخطة المجانية، فلو مش لاقي خطأ امبارح، ده سبب محتمل.`
        },
        {
          cmd: "Supabase / Neon",
          title: "Postgres مُدار من غير AWS ومن غير سيرفر",
          desc: R`Supabase و Neon بيدّوك Postgres حقيقي بـ connection string وخطة مجانية، و Supabase معاه Auth و Storage و Realtime، و Neon قاعدة بس بتنام لما محدش يستخدمها وبتعمل branch من القاعدة في ثواني.

أهم حاجة تفهمها: فيه connection string مباشر (للـ migrations والسيرفرات الدايمة) وواحد عن طريق pooler (للـ serverless وأي حاجة بتفتح اتصالات كتير).`,
          example: R`DATABASE_URL="postgresql://postgres.abcdefghijklmnop:YOUR_PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres:YOUR_PASSWORD@db.abcdefghijklmnop.supabase.co:5432/postgres"
NEON_POOLED_URL="postgresql://app:YOUR_PASSWORD@ep-cool-name-123456-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require"
NEON_DIRECT_URL="postgresql://app:YOUR_PASSWORD@ep-cool-name-123456.eu-central-1.aws.neon.tech/neondb?sslmode=require"`,
          try: "افتح مشروع Supabase أو Neon مجاني في فرانكفورت، وخد الاتنين. شغّل migration بالمباشر، والتطبيق بالـ pooler. وشغّل [[SELECT count(*) FROM pg_stat_activity;]] وانت بتضرب الـ API بـ ٥٠ طلب، وقارن بين الطريقتين.",
          flag: "script",
          deep: {
            why: "لمشروع صغير أو MVP، RDS غالي ومعقد (VPC و security groups وباك أب). Supabase أو Neon بيدّوك قاعدة في دقيقة. بس لو مفهمتش الـ pooling، أول ضغط على دوال serverless هيخلّص الاتصالات والقاعدة تقفل الباب.",
            how: R`كل اتصال Postgres عملية على السيرفر بتاكل رام، والعدد محدود (عشرات في الخطط الصغيرة). سيرفر Node دايم بيفتح pool فيه ١٠ اتصالات ويعيد استخدامهم. لكن ١٠٠ دالة serverless في نفس اللحظة = ١٠٠ اتصال.

الـ pooler (Supavisor في Supabase، و PgBouncer في Neon) بيقف في النص: آلاف الاتصالات من ناحية التطبيق، وعدد قليل حقيقي للقاعدة. في transaction mode (Supabase بورت 6543، و Neon الهوست اللي فيه [[-pooler]]) الاتصال الحقيقي بيرجع للـ pool بعد كل transaction. والتمن: مفيش حاجة بتعيش بين transactions (named prepared statements و [[SET]] و [[LISTEN]])، فلو الـ ORM بيستخدم prepared statements لازم تقفلها.

الـ migrations محتاجة session كاملة، فتروح على المباشر. في Supabase المباشر ([[db.REF.supabase.co:5432]]) على IPv6 بس إلا لو دفعت add-on، ولو شبكتك IPv4 استخدم session mode على الـ pooler بورت 5432. وإعداد الاتنين مع Prisma في تاب «SQL و Prisma».

Neon: الـ compute بينام بعد ٥ دقايق من غير استخدام، وأول طلب بعدها بياخد جزء من الثانية زيادة. والـ branching بيعمل نسخة من القاعدة من غير ما ينسخ الداتا فعلًا (copy-on-write)، فتدّي كل preview قاعدته.

Supabase المجاني: المشروع بيتوقف (pause) لو مفيش نشاط أسبوع، ومفيش باك أب تلقائي تعتمد عليه. للإنتاج خطة مدفوعة أو باك أب بإيدك ([[pg_dump]]).`,
            when: "MVP، ومشاريع صغيرة ومتوسطة، ومع Vercel. انقل لـ RDS لما تحتاج VPC خاصة أو تحكم أكتر أو الحجم يكبر.",
            mistakes: "migrations على الـ pooler في transaction mode فتقع بأخطاء prepared statements أو locks غريبة. ومشروع إنتاج على الخطة المجانية لحد ما يتوقف في أجازة. واستخدام [[service_role]] key بتاع Supabase في كود الـ frontend: ده بيعدّي كل الـ RLS. والقاعدة في region والتطبيق في region تانية."
          },
          lines: [
            "Supabase عن طريق الـ pooler (بورت 6543، transaction mode): للتطبيق والدوال.",
            "Supabase مباشر (5432): للـ migrations.",
            "Neon عن طريق الـ pooler: الهوست فيه -pooler.",
            "Neon مباشر: نفس الهوست من غير -pooler، للـ migrations."
          ],
          sol: R`الأرقام بتفرق حسب الإعدادات، بس الشكل المتوقع: [[pg_stat_activity]] فيه أصلًا صفوف كتير من المنصة نفسها (خصوصًا Supabase: خدمات زي Auth و Realtime و PostgREST)، فقارن باتصالات يوزر التطبيق بس بالـ query اللي تحت. وانت بتضرب ٥٠ طلب: بالـ direct URL من تطبيق serverless، الرقم بيطلع مع عدد النسخ اللي اشتغلت (كل نسخة ليها pool لوحدها)، وممكن يوصل للحد وتاخد [[too many connections]] أو [[remaining connection slots are reserved]]. بالـ pooler، عدد اتصالات Postgres الحقيقية بيفضل صغير وثابت تقريبًا، لأن الـ pooler (Supavisor أو PgBouncer في Neon) بيوزّع الطلبات على عدد قليل من الاتصالات.

والـ migration بالمباشر: [[prisma migrate deploy]] المفروض يعدّي على [[DIRECT_URL]] (أو [[NEON_DIRECT_URL]]). لو شغّلته على الـ pooler في transaction mode ممكن يقف أو يفشل، لأن الـ migrations محتاجة session كاملة (locks و prepared statements).

الغلطة الأشهر: التطبيق بـ Prisma على بورت 6543 من غير [[?pgbouncer=true]]، فيطلع [[prepared statement "s0" already exists]] بشكل عشوائي تحت الضغط. وتانية: تحط الـ pooler URL في [[directUrl]] بالغلط فالـ migrate يفشل.`,
          solCode: R`SELECT usename, application_name, state, count(*)
FROM pg_stat_activity
WHERE backend_type = 'client backend'
GROUP BY 1, 2, 3
ORDER BY 4 DESC;
# في ترمنال تاني، ٥٠ طلب مع بعض:
seq 50 | xargs -P 50 -I{} curl -s -o /dev/null https://myapp.example.com/api/items`
        }
      ]
    },
    {
      t: "منصات جاهزة للباك إند",
      l: 2,
      n: "API و Postgres و worker من GitHub من غير ما تدير سيرفر: Render و Railway و Fly.io، أو PaaS على الـ VPS بتاعك، وإمتى الحساب يقلب",
      items: [
        {
          cmd: "render.yaml",
          title: "Render: API و Postgres و worker في ملف واحد",
          desc: R`Render بيشغّل الباك إند بتاعك من الريبو: web service (API ليه URL)، و background worker (من غير بورت، بيسحب jobs)، و cron job، و Postgres و Key Value (زي Redis) مُدارين، وكل ده ممكن يتوصف في ملف [[render.yaml]] (اسمه عندهم Blueprint) في جذر الريبو.

الملف بيربط الخدمات ببعض: [[fromDatabase]] بيحط connection string القاعدة في متغير البيئة لوحده، و [[preDeployCommand]] بيشغّل الـ migrations قبل ما النسخة الجديدة تستقبل ترافيك. وكل push على الـ branch بيعمل deploy.

الخطة المجانية للتجربة بس (الأرقام وقت كتابة الدرس وممكن تتغير، راجع صفحة الأسعار): الـ web service المجاني بينام بعد حوالي ربع ساعة من غير ترافيك وأول طلب بعدها بياخد ثواني، و Postgres المجاني بيتمسح بعد حوالي ٣٠ يوم. والـ worker و preDeployCommand محتاجين خطة مدفوعة.`,
          example: R`# render.yaml في جذر الريبو
services:
  - type: web
    name: shop-api
    runtime: node
    region: frankfurt
    plan: starter
    buildCommand: npm ci && npm run build
    preDeployCommand: npx prisma migrate deploy
    startCommand: node dist/server.js
    healthCheckPath: /healthz
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: shop-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
  - type: worker
    name: shop-worker
    runtime: node
    region: frankfurt
    plan: starter
    buildCommand: npm ci && npm run build
    startCommand: node dist/worker.js
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: shop-db
          property: connectionString
databases:
  - name: shop-db
    region: frankfurt
    plan: basic-256mb`,
          try: R`خد مشروع Express فيه [[/healthz]] وملف worker بسيط (حلقة بتطبع كل ١٠ ثواني وبتقرا من القاعدة). حط [[render.yaml]] زي المثال، وفي الداشبورد اختار New ثم Blueprint ووصّله بالريبو. بعد أول deploy: افتح لوجات الـ worker وشوف إنه وصل للقاعدة، وغيّر حاجة في الكود واعمل push وتابع الـ deploy التاني.`,
          flag: "script",
          deep: {
            why: "أغلب الناس بتعرف تنشر frontend على Vercel، بس أول ما يبقى عندها Express أو FastAPI ومعاه Postgres و worker بيبعت إيميلات، بتتنقل على طول لـ VPS وتقعد أسبوع في Nginx و systemd و SSL. منصة زي Render بتديك الـ ٣ حاجات دول في ملف واحد، و SSL ودومين ولوجات وباك أب للقاعدة جاهزين.",
            how: R`كل خدمة في [[services]] ليها [[type]]: [[web]] بياخد بورت من متغير [[PORT]] اللي Render بيحطه (فلازم تطبيقك يسمع على [[process.env.PORT]] وعلى [[0.0.0.0]])، و [[worker]] نفس الكود بس من غير بورت ولا URL، و [[cron]] بياخد [[schedule]]، و [[keyvalue]] لـ Redis-compatible.

[[runtime: node]] معناها Render هيبني بنفسه ([[buildCommand]]). ولو عندك Dockerfile اكتب [[runtime: docker]] وهو يبني الـ image (تاب Docker)، ودي أحسن عشان نفس الـ image تشتغل في أي حتة لما تنقل.

[[preDeployCommand]] بيشتغل بعد الـ build وقبل التبديل. لو فشل، النسخة القديمة بتفضل شغالة. ده المكان الصح لـ [[prisma migrate deploy]] (تاب «SQL و Prisma»)، مش جوه [[startCommand]]: لو عندك نسختين من الـ API، الاتنين هيحاولوا يعملوا migrate في نفس الوقت.

[[healthCheckPath]]: Render مش هيبعت ترافيك للنسخة الجديدة غير لما المسار ده يرد 200، وده اللي بيدّيك deploy من غير downtime.

[[fromDatabase]] بـ [[connectionString]] بيحط الـ internal URL: الخدمات والقاعدة في نفس الـ region بيتكلموا على شبكة Render الخاصة. عشان كده حط كله في نفس الـ [[region]]. و [[generateValue: true]] بيعمل سر عشوائي مرة واحدة. والأسرار اللي انت عارف قيمتها (مفتاح Stripe) اكتبها [[sync: false]] وحط قيمتها من الداشبورد، متكتبهاش في الملف.

الفلوس (تقريبي ومتغير): فيه اشتراك للـ workspace، وكل خدمة ليها instance بسعر شهري ثابت، والقاعدة بسعر حسب حجمها. يعني API + worker + قاعدة = ٣ بنود، وده اللي بيخلّي الفاتورة تكبر أسرع من VPS لما الخدمات تزيد (درس [[PaaS ولا VPS: الحساب]]).`,
            when: "باك إند Node أو Python لفريق صغير أو فريلانسر، خصوصًا لو محتاج worker و cron، ومحدش عايز يبقى sysadmin. والخطة المجانية للديمو والبورتفوليو بس.",
            mistakes: R`تحط مشروع عميل حقيقي على Postgres المجاني وتتفاجئ إنه اتمسح بعد شهر. والتطبيق يسمع على [[localhost]] أو بورت ثابت ٣٠٠٠ فالـ deploy يفشل في health check. و [[prisma migrate deploy]] جوه [[startCommand]]. والقاعدة في [[oregon]] (الافتراضي) والـ API في فرانكفورت. والملفات اللي اليوزر بيرفعها تتحفظ على ديسك الـ instance: بتتمسح مع كل deploy، فاستخدم S3 أو R2. وفي الانترفيو: «إيه الفرق بين web service و worker؟» الـ worker مفيش حد بيكلّمه من برا، هو اللي بيسحب الشغل من queue.`
          },
          lines: [
            "كل الخدمات اللي مش قواعد بيانات.",
            "خدمة web: ليها URL وبتستقبل HTTP.",
            "اسمها، وبيبقى جزء من الـ URL.",
            "Render هيبني بـ Node من غير Dockerfile.",
            "قريب من مصر وأوروبا (الافتراضي أمريكا).",
            "خطة مدفوعة صغيرة: مبتنامش.",
            "أمر البناء.",
            "الـ migrations قبل ما النسخة الجديدة تاخد ترافيك.",
            "أمر التشغيل.",
            "مسار بيرد 200 لما التطبيق يبقى جاهز.",
            "متغيرات البيئة.",
            "DATABASE_URL.",
            "جاي من القاعدة اللي تحت.",
            "اسمها.",
            "الـ connection string الداخلي.",
            "سر للتوكنات.",
            "Render بيولّده عشوائي مرة واحدة.",
            "خدمة worker: من غير بورت ولا URL.",
            "اسمها.",
            "نفس الـ runtime.",
            "نفس الـ region عشان الشبكة الداخلية.",
            "خطة مدفوعة (الـ worker مش مجاني).",
            "نفس البناء.",
            "بس بيشغّل ملف الـ worker.",
            "متغيراتها.",
            "نفس القاعدة.",
            "من القاعدة.",
            "اسمها.",
            "الـ connection string.",
            "قواعد البيانات المُدارة.",
            "اسم القاعدة اللي الخدمات بتشاور عليه.",
            "نفس الـ region.",
            "أصغر خطة مدفوعة (باك أب ومبتتمسحش)."
          ],
          sol: R`بعد ما الـ Blueprint يخلص هتلاقي ٣ حاجات في المشروع: [[shop-api]] بـ URL على [[onrender.com]]، و [[shop-worker]] من غير URL، و [[shop-db]]. افتح [[https://shop-api-xxxx.onrender.com/healthz]] المفروض يرد 200، ولوجات الـ worker المفروض تطبع سطرها كل ١٠ ثواني ومعاه نتيجة من القاعدة (زي عدد الطلبات).

ولما تعمل push هتلاقي deploy جديد للخدمتين، وفي لوج الـ API سطر [[prisma migrate deploy]] قبل التشغيل. والموقع مش هيقع وانت بتنشر، لأن النسخة القديمة بتفضل شغالة لحد ما [[/healthz]] في الجديدة يرد.

الغلطات الشائعة: الـ deploy يفضل «In progress» وبعدين يفشل بـ timeout، وده غالبًا لأن التطبيق بيسمع على بورت ثابت بدل [[process.env.PORT]]. أو الـ worker يقع بـ [[ECONNREFUSED]]، وده لأنك كاتب DATABASE_URL بإيدك من جهازك بدل [[fromDatabase]]. ولو اخترت [[plan: free]] للـ worker هتلاقي الـ Blueprint بيرفض، لأن الـ workers مش مجانية.`,
          solCode: R`// src/server.ts
import express from "express";
const app = express();
app.get("/healthz", (_req, res) => res.send("ok"));
app.listen(Number(process.env.PORT ?? 3000), "0.0.0.0");

// src/worker.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
setInterval(async () => {
  const count = await prisma.order.count();
  console.log(JSON.stringify({ msg: "worker tick", orders: count }));
}, 10_000);`
        },
        {
          cmd: "railway",
          title: "Railway: خدمات ومتغيرات بتشاور على بعض",
          desc: R`Railway بيشتغل بفكرة مشروع فيه خدمات جنب بعض على canvas: خدمة من ريبو GitHub أو Docker image، وقاعدة Postgres أو Redis بزرار واحد، وكلهم على شبكة خاصة جوه المشروع.

المتغيرات بتشاور على بعض بـ reference variables: [[DATABASE_URL=$__{{Postgres.DATABASE_URL}}]] معناها «خد قيمة DATABASE_URL من خدمة اسمها Postgres»، فلو القاعدة اتغيرت، المتغير يتحدّث لوحده. والـ worker مجرد خدمة تانية من نفس الريبو بـ start command مختلف.

الفلوس بالاستخدام الفعلي (CPU و RAM بالثانية + الديسك + الترافيك الخارج)، مش بسعر ثابت لكل خدمة. وقت كتابة الدرس: فيه trial بكريدت صغير، وخطة Hobby بـ ٥ دولار في الشهر وجواها ٥ دولار استخدام. الأرقام بتتغير، فراجع صفحة الأسعار.`,
          example: R`npm i -g @railway/cli
railway login
railway init --name shop
railway add --database postgres
railway add --service api --variables 'DATABASE_URL=$__{{Postgres.DATABASE_URL}}'
railway add --service worker --variables 'DATABASE_URL=$__{{Postgres.DATABASE_URL}}'
railway up --service api
railway variables --service api
railway logs --service worker
railway run npx prisma migrate dev`,
          try: R`اعمل مشروع على Railway فيه Postgres وخدمتين (api و worker) من نفس الريبو. في إعدادات الـ worker غيّر الـ start command لـ [[node dist/worker.js]]، وفي الـ api حط pre-deploy command بـ [[npx prisma migrate deploy]]. بعدين من إعدادات الـ api اعمل Generate Domain وافتح [[/healthz]]، وشوف في الـ Metrics أد إيه كل خدمة بتاكل RAM.`,
          deep: {
            why: "Railway أسرع طريقة تشغّل بيها كذا خدمة بتكلم بعض (API و worker و Postgres و Redis) من غير YAML كتير. وطريقة الفلوس بالاستخدام بتبقى أرخص لمشروع صغير فاضي معظم الوقت، وأغلى لو خدمة بتاكل RAM على طول.",
            how: R`المشروع فيه environments (زي production و staging)، وكل environment فيه نسخة من كل الخدمات بمتغيراتها. وممكن تفعّل PR environments: نسخة كاملة لكل PR.

الخدمة بتتبني بـ Railpack (البنّاء بتاعهم اللي بيعرف Node و Python وغيرهم لوحده) أو بـ Dockerfile لو موجود في الريبو. وإعداداتها (start command و pre-deploy command و health check) من الداشبورد أو من ملف [[railway.json]] أو [[railway.toml]] في الريبو.

الشبكة الخاصة: كل خدمة ليها اسم داخلي زي [[api.railway.internal]]، والـ worker يقدر يكلّم الـ API عليه من غير ما يطلع على النت. والقاعدة بتدّي متغيرين: [[DATABASE_URL]] (داخلي، ببلاش ترافيك) و [[DATABASE_PUBLIC_URL]] (للوصول من جهازك، وبيتحاسب كترافيك خارج).

الـ CLI: [[railway init]] مشروع جديد، [[railway link]] يربط الفولدر بمشروع موجود، [[railway add]] يضيف قاعدة أو خدمة، [[railway up]] يرفع الفولدر الحالي ويبني (من غير GitHub)، و [[railway run CMD]] بيشغّل أمر على جهازك بمتغيرات الخدمة، مفيد لـ migration أو script سريع.

الخدمة مش بتنام لوحدها. فيه خيار serverless (أو «App Sleeping») بيوقّفها لو مفيش ترافيك، بس مش مناسب لـ worker.`,
            when: "MVP أو مشروع جانبي فيه كذا خدمة، أو فريق صغير عايز staging و PR previews للباك إند من غير شغل. ولو الـ RAM بتاع الخدمات ثابت وعالي على طول، احسبها مقابل VPS.",
            mistakes: R`تكتب connection string القاعدة كنص ثابت بدل reference variable، فلما القاعدة تتغير الخدمة تقع. وتستخدم [[DATABASE_PUBLIC_URL]] من جوه الخدمات فتدفع ترافيك على كل query وتبقى أبطأ. وتفتكر إن الـ ٥ دولار حد أقصى: لو الاستخدام عدّاها بتدفع الزيادة، فحط usage limit من الإعدادات. وتنسى إن [[railway run]] بيشغّل على جهازك بمتغيرات الإنتاج، فـ [[prisma migrate reset]] كده بيمسح قاعدة الإنتاج.`
          },
          lines: [
            "سطّب الـ CLI.",
            "سجّل دخول (بيفتح المتصفح).",
            "مشروع جديد اسمه shop، والفولدر اتربط بيه.",
            "ضيف Postgres مُدار (اسم الخدمة Postgres).",
            "خدمة api، و DATABASE_URL بتشاور على القاعدة (علامات ' عشان الشل ميفسّرش $).",
            "خدمة worker بنفس المتغير.",
            "ارفع الكود وابنيه على خدمة api.",
            "اعرض متغيرات الـ api بقيمها النهائية.",
            "لوجات الـ worker.",
            "شغّل أمر على جهازك بمتغيرات الخدمة المربوطة."
          ],
          sol: R`في الـ canvas هتشوف ٣ مربعات: Postgres و api و worker، وخطوط بين القاعدة والخدمتين (بسبب الـ reference variables). [[railway variables --service api]] المفروض يطلّع [[DATABASE_URL]] بقيمة فيها [[postgres.railway.internal]]، يعني الشبكة الداخلية.

بعد Generate Domain، [[/healthz]] يرد 200. وفي لوجات الـ api تلاقي خطوة pre-deploy فيها [[prisma migrate deploy]] وبعدها [[All migrations have been successfully applied]] أو [[No pending migrations to apply]]. والـ Metrics المفروض توريك استهلاك صغير (عشرات الميجات RAM للـ worker)، وده اللي بتدفعه فعلًا.

الغلطات الشائعة: الـ worker بيشتغل كـ API تاني ويطبع [[listening on 3000]]، لأنك مغيّرتش الـ start command فخد [[npm start]]. أو قيمة المتغير طالعة [[$__{{Postgres.DATABASE_URL}}]] كنص حرفي، لأن اسم خدمة القاعدة مش [[Postgres]] بالظبط (الاسم حساس لحالة الحروف).`,
          solCode: R`// railway.json في جذر الريبو (إعدادات الـ api)
{
  "$schema": "https://railway.com/railway.schema.json",
  "deploy": {
    "startCommand": "node dist/server.js",
    "preDeployCommand": ["npx prisma migrate deploy"],
    "healthcheckPath": "/healthz"
  }
}`
        },
        {
          cmd: "fly launch",
          title: "Fly.io: containers قريبة من اليوزر، و volumes، و regions",
          desc: R`Fly.io بياخد الـ Docker image بتاعتك ويشغّلها كـ Machines (VMs صغيرة بتقوم في ثواني) في أي region تختارها. [[fly launch]] بيقرا المشروع، ويعمل [[fly.toml]] و Dockerfile لو مش موجود، ويعمل الـ app.

الـ Machine ديسكها بيتمسح مع كل deploy. لو محتاج داتا تعيش (SQLite مثلًا) بتعمل volume: ديسك مربوط بـ Machine واحدة في region واحدة. وبتقدر تفصل الـ web عن الـ worker بـ [[processes]] في نفس الـ app.

مفيش free tier للحسابات الجديدة وقت كتابة الدرس: بتدفع بالثانية على الـ Machines الشغالة، وبالجيجا على الـ volumes حتى لو الـ Machine واقفة. الـ Machine الصغيرة جدًا بدولارات قليلة في الشهر، بس راجع صفحة الأسعار.`,
          example: R`# fly.toml (fly launch بيعمله، وده بعد التعديل)
app = "shop-api"
primary_region = "fra"

[build]

[deploy]
  release_command = "npx prisma migrate deploy"

[processes]
  app = "node dist/server.js"
  worker = "node dist/worker.js"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = "stop"
  auto_start_machines = true
  min_machines_running = 1
  processes = ["app"]

[[vm]]
  size = "shared-cpu-1x"
  memory = "512mb"`,
          try: R`اعمل [[fly launch]] على مشروع Express، واقبل الـ Dockerfile اللي بيعمله، وخلّي [[primary_region]] أقرب region ليك. ضيف [[processes]] زي المثال، وشغّل [[fly secrets set DATABASE_URL=...]] وبعدين [[fly deploy]]. بعدين: [[fly status]] (كام Machine لكل process)، و [[fly scale count app=2]]، و [[fly logs]]. وجرّب تسيب الموقع ربع ساعة من غير طلبات وشوف [[fly status]].`,
          flag: "script",
          deep: {
            why: "لو المستخدمين في أكتر من قارة، أو محتاج WebSockets أو process شغال على طول، Fly بيشغّل container حقيقي قريب منهم، مش function ليها حد أقصى للوقت. والـ Machines اللي بتقف لما مفيش ترافيك بتخلي مشروع صغير يتكلف قليل.",
            how: R`[[fly launch]] بيسألك عن الاسم والـ region، ويقترح Postgres أو Redis، ويكتب [[fly.toml]]. وبعدها [[fly deploy]] بيبني الـ image (على builder عندهم أو جهازك) ويعمل rolling update.

[[release_command]] بيشتغل مرة واحدة في Machine مؤقتة قبل تحديث الباقي، ولو فشل الـ deploy بيقف. ده مكان الـ migrations.

[[processes]]: كل سطر بيعمل مجموعة Machines بأمر مختلف من نفس الـ image. و [[http_service.processes = ["app"]]] معناها بس مجموعة app بتستقبل HTTP. وتكبّر كل مجموعة لوحدها: [[fly scale count worker=2]].

[[auto_stop_machines = "stop"]]: الـ proxy بتاع Fly بيوقّف الـ Machines لما مفيش طلبات، ويقوّمها مع أول طلب (حوالي ثانية أو أقل). و [[min_machines_running = 1]] بيسيب واحدة صاحية في الـ primary region. ده بيأثر على الـ web بس، والـ worker مبيستقبلش HTTP فمش بيتوقف بالطريقة دي.

الـ volumes: [[fly volumes create data --size 1 --region fra]] وبعدين في [[fly.toml]] قسم [[[mounts]]] فيه [[source = "data"]] و [[destination = "/data"]]. الـ volume في region واحدة ومربوط بـ Machine واحدة، ومفيش مشاركة بين Machines ولا replication تلقائي. عشان كده Machine بـ volume = حاجة واحدة لو وقعت وقعت، و Fly بيعمل snapshots يومية (والتخزين بتاعها بقى بيتحاسب). لو محتاج قاعدة بجد استخدم Postgres مُدار (من Fly أو Neon أو Supabase) بدل ما تدير Postgres على volume بنفسك.

الـ regions: [[fly platform regions]] بيعرضهم. [[fly scale count 2 --region fra,ams]] بيوزّع Machines. الطلب بيروح لأقرب Machine شغالة (Anycast)، بس لو القاعدة في fra والـ Machine في سنغافورة، كل query هتعدّي نص الكرة الأرضية. فابدأ region واحدة جنب القاعدة.`,
            when: "API أو WebSockets أو app محتاج process طويل وقريب من اليوزر، وانت مرتاح مع Docker. ولو كل اللي عندك API بسيط وقاعدة، Render أو Railway أبسط.",
            mistakes: R`تعمل volume وتفتكر إنه باك أب أو إنه بيتشارك بين Machines. وتعمل [[fly scale count 3]] لـ app عليه volume فيتعمل ٣ volumes فاضية مختلفة، وكل Machine بداتا مختلفة. و [[min_machines_running = 0]] لـ API محتاج يرد بسرعة. وتنسى إن الـ volumes والـ IPv4 المخصص بيتحاسبوا حتى لو الـ Machines واقفة. والتطبيق يسمع على بورت غير [[internal_port]] فالـ health check يفشل.`
          },
          lines: [
            "اسم الـ app (والدومين هيبقى shop-api.fly.dev).",
            "الـ region الأساسية: فرانكفورت.",
            "البناء: فاضي يعني استخدم الـ Dockerfile اللي في الريبو.",
            "إعدادات الـ deploy.",
            "Machine مؤقتة بتشغّل الـ migrations قبل التحديث.",
            "مجموعات processes من نفس الـ image.",
            "مجموعة app: السيرفر.",
            "مجموعة worker: شغل الخلفية.",
            "الـ HTTP من برا.",
            "البورت اللي التطبيق بيسمع عليه جوه الـ container.",
            "حوّل HTTP لـ HTTPS.",
            "وقّف الـ Machines لما مفيش ترافيك.",
            "قوّمها مع أول طلب.",
            "سيب واحدة صاحية دايمًا.",
            "بس مجموعة app بتاخد HTTP.",
            "مقاس الـ Machine.",
            "CPU مشترك واحد.",
            "نص جيجا رام."
          ],
          sol: R`بعد [[fly deploy]] المفروض [[fly status]] يوريك Machines في مجموعتين: [[app]] و [[worker]]، كلهم في [[fra]]. و [[https://shop-api.fly.dev/healthz]] يرد 200. وفي [[fly logs]] هتلاقي سطر الـ release_command ([[prisma migrate deploy]]) قبل ما الـ Machines تتحدّث.

بعد [[fly scale count app=2]] هتلاقي ٢ app و ١ worker. ولو سبت الموقع من غير طلبات ربع ساعة، [[fly status]] هيوريك Machine من الاتنين حالتها [[stopped]] والتانية [[started]] (بسبب [[min_machines_running = 1]])، والـ worker لسه [[started]].

الغلطات الشائعة: الـ deploy يطلع [[instance refused connection]] أو ما يعدّيش الـ health check، لأن التطبيق بيسمع على ٣٠٠٠ والـ [[internal_port]] ٨٠٨٠: خلي التطبيق يقرا [[PORT]] أو غيّر الرقم. أو الـ worker مش ظاهر خالص، لأنك نسيت [[processes = ["app"]]] في [[http_service]] فالاتنين بقوا web.`,
          solCode: R`fly launch --no-deploy
fly secrets set DATABASE_URL="postgresql://app:YOUR_PASSWORD@db.example.com:5432/shop?sslmode=require"
fly deploy
fly status
fly scale count app=2
fly logs`
        },
        {
          cmd: "Coolify / Dokploy",
          title: "PaaS على الـ VPS بتاعك: تجربة Render بسعر سيرفر",
          desc: R`Coolify و Dokploy برامج open source بتسطّبها على VPS بتاعك، فيبقى عندك داشبورد زي Render: تربط ريبو GitHub، وكل push يعمل build و deploy، و SSL تلقائي بـ Let's Encrypt، وقواعد بيانات بزرار، وباك أب للقاعدة على S3 أو R2.

من جوه بيستخدموا Docker (والـ Dockerfile أو Nixpacks أو Docker Compose بتاعك)، و Traefik كـ reverse proxy بياخد الدومين ويعمل الشهادة. يعني نفس اللي بتعمله بإيدك في تاب VPS وتاب Docker وتاب Nginx، بس بداشبورد.

البرنامج نفسه ببلاش، وبتدفع تمن السيرفر بس. وكل واحد ليه نسخة cloud مدفوعة لو مش عايز تدير لوحة التحكم نفسها. الحد الأدنى المكتوب في الدوكس حوالي ٢ جيجا رام و ٣٠ جيجا ديسك، والـ build نفسه بياكل رام، فسيرفر ٤ جيجا أريح.`,
          example: R`ssh root@203.0.113.10
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash
curl -sSL https://dokploy.com/install.sh | sh
docker ps --format "table {{.Names}}\t{{.Status}}"
sudo ufw allow 22,80,443/tcp
dig +short api.example.com`,
          try: R`على VPS جديد فاضي (Ubuntu LTS، ٤ جيجا لو تقدر)، سطّب واحد بس من الاتنين. افتح اللوحة (Coolify على بورت 8000، و Dokploy على 3000)، واعمل حساب الأدمن فورًا. اربط GitHub، واعمل Postgres، وانشر API من ريبو فيه Dockerfile على [[api.example.com]] (سجل A بيشاور على السيرفر). وبعدين فعّل الباك أب المجدول للقاعدة على bucket في R2 أو S3.`,
          flag: "danger",
          deep: {
            why: "الـ PaaS المدفوعة بتبقى غالية لما الخدمات تكتر: ٥ خدمات صغيرة = ٥ instances. على VPS بـ ١٥ دولار تقدر تشغّل الـ ٥ ومعاهم Postgres و Redis. Coolify و Dokploy بيدّوك راحة push-to-deploy و SSL والباك أب من غير ما تكتب Nginx config ولا systemd unit، وده طريق شائع جدًا للفريلانسرز والشركات الصغيرة.",
            how: R`سكربت التسطيب بيسطّب Docker ويشغّل اللوحة نفسها كـ containers. بعد كده، أي app بتضيفه بيتبني image ويشتغل container، و Traefik بيقرا الـ labels بتاعته ويوجّه الدومين ليه ويطلب شهادة.

Coolify: أقدم وأكبر، فيه كتالوج خدمات جاهزة كبير (Plausible و n8n و MinIO وغيرهم بزرار)، ويقدر يدير كذا سيرفر من لوحة واحدة عن طريق SSH. Dokploy: أخف وأحدث، ومبني على Docker Swarm فبيقدر يوزّع على كذا سيرفر، وتجربته قريبة من Vercel. الاتنين بيقروا Docker Compose بتاعك كما هو.

الـ build على نفس السيرفر اللي بيخدم اليوزرز. build لـ Next.js ممكن ياخد ١.٥ جيجا رام، فعلى سيرفر ٢ جيجا الموقع يبطأ أو الـ OOM killer يقتل حاجة. الحل: سيرفر أكبر، أو swap، أو تبني الـ image في GitHub Actions وتخلي اللوحة تسحبها من registry (تاب GitHub Actions).

اللي لسه عليك انت: تحديث نظام التشغيل (unattended-upgrades في تاب VPS)، والفايروول، وتحديث اللوحة نفسها، ومراقبة الديسك (الـ images القديمة بتتراكم)، وباك أب برا السيرفر. لو السيرفر الواحد وقع، كل حاجة وقعت.

تحذير أمان: اللوحة فيها صلاحية root على السيرفر عمليًا. اعمل حساب الأدمن أول ما تفتحها (أول واحد يفتح الصفحة بيبقى الأدمن)، وحط لوحة التحكم على دومين بـ HTTPS، ولو تقدر اقفل بورت اللوحة إلا من IP بتاعك أو وراه Cloudflare Access.`,
            when: "عندك كذا مشروع صغير أو عملاء، وعايز push-to-deploy بسعر VPS، وعندك حد يعرف أساسيات Linux لو حاجة باظت. مش أول اختيار لو محدش في الفريق عمره فتح ترمنال.",
            mistakes: R`تسطّب وتسيب صفحة التسجيل مفتوحة على [[http://IP:8000]] فحد تاني يسجّل أدمن قبلك. والقاعدة على نفس السيرفر والباك أب على نفس الديسك. وسيرفر ١ جيجا وكل build يوقّع الموقع. وتنسى إن Docker بيفتح البورتات بعيد عن ufw (تاب Docker)، فقاعدة عملتلها public port تبقى مفتوحة للنت. وتفتكر إن «زي Render» معناها «مُدار»: التحديثات والأمان لسه عليك.`
          },
          lines: [
            "ادخل السيرفر الجديد.",
            "سكربت تسطيب Coolify الرسمي (Docker + اللوحة على بورت 8000).",
            "أو سكربت Dokploy الرسمي (اللوحة على بورت 3000). اختار واحد بس.",
            "اتأكد إن containers اللوحة شغالة.",
            "SSH والويب بس (وافتكر إن Docker بيعدّي ufw في البورتات اللي بيفتحها).",
            "اتأكد إن الدومين بيشاور على السيرفر قبل ما تطلب شهادة."
          ],
          sol: R`بعد التسطيب، [[docker ps]] المفروض يوريك containers اللوحة: في Coolify أسماء زي [[coolify]] و [[coolify-db]] و [[coolify-redis]] و [[coolify-proxy]] (ده Traefik)، وفي Dokploy أسماء زي [[dokploy]] و [[dokploy-postgres]] و [[dokploy-redis]] و [[dokploy-traefik]].

بعد ما تنشر الـ API، [[curl -I https://api.example.com/healthz]] يرجّع [[HTTP/2 200]]، والشهادة من Let's Encrypt ([[openssl s_client]] زي درس [[Cloudflare proxy و SSL]]). وبعد أول باك أب مجدول هتلاقي ملف dump في الـ bucket.

الغلطات الشائعة: الشهادة مش بتطلع والمتصفح بيقول [[TRAEFIK DEFAULT CERT]]، وده لأن الـ DNS لسه مش بيشاور على السيرفر، أو السجل برتقاني في Cloudflare والـ SSL mode مش Full (strict). أو الـ build بيقف في النص ولوج السيرفر فيه [[Out of memory: Killed process]]، والحل رام أكبر أو swap أو build برا السيرفر.`
        },
        {
          cmd: "PaaS ولا VPS: الحساب",
          title: "الفاتورة كبرت: تفضل على PaaS ولا تنقل؟",
          desc: R`المقارنة الصح مش «٨٠ دولار مقابل ٢٠»، هي فلوس + وقت: الـ PaaS بتاخد فلوس أكتر ووقت أقل، والـ VPS فلوس أقل ووقت أكتر (تحديثات، وباك أب، ومشاكل الساعة ٢ بالليل). والوقت ده ليه سعر حتى لو انت اللي بتعمله.

السكربت ده بيحسب التكلفة الكاملة بسعر ساعتك. الأرقام تقريبية للتوضيح بس: عدّلها بأسعار المنصات النهارده وبالوقت اللي بتصرفه فعلًا.`,
          example: R`const HOURLY = Number(process.argv[2] ?? 15);
const setups = {
  "PaaS (Render/Railway)": { bill: { api: 25, worker: 25, postgres: 20, redis: 10 }, opsHours: 0.5 },
  "VPS + Coolify": { bill: { vps: 16, backups: 3, offsite: 1 }, opsHours: 3 },
  "VPS بإيدك": { bill: { vps: 16, backups: 3, offsite: 1 }, opsHours: 5 },
};
const sum = (o) => Object.values(o).reduce((a, b) => a + b, 0);
for (const [name, s] of Object.entries(setups)) {
  const cash = sum(s.bill);
  const time = s.opsHours * HOURLY;
  console.log(name.padEnd(22), "فلوس", cash, "+ وقت", time, "=", cash + time, "دولار");
}`,
          try: R`احفظه [[cost.mjs]] وشغّله بـ [[node cost.mjs 5]] و [[node cost.mjs 15]] و [[node cost.mjs 40]]. وبعدين حط أرقامك الحقيقية: فاتورة المنصة من آخر شهر، وسعر VPS يكفي نفس الخدمات، وكام ساعة في الشهر فعلًا بتصرفها على السيرفر. عند أنهي سعر ساعة الاختيار بيقلب؟`,
          flag: "script",
          deep: {
            why: "أغلب قرارات النقل بتتاخد غلط في الاتجاهين: حد ينقل من PaaS لـ VPS عشان يوفر ٥٠ دولار ويصرف ١٠ ساعات في الشهر على الصيانة، أو شركة تفضل تدفع آلاف على منصة وكان ممكن سيرفرين يكفوا. الحساب البسيط ده بيخلّي القرار أرقام مش إحساس.",
            how: R`ليه الـ PaaS بتغلى مع الكبر: كل خدمة instance بسعر، وكل قاعدة بسعر، والترافيك الخارج بيتحاسب. ٥ خدمات صغيرة على PaaS ممكن تكلف أضعاف سيرفر واحد يشيلهم. وعلى الناحية التانية، أول ٢-٣ خدمات على PaaS غالبًا أرخص من وقتك.

إمتى الحساب بيقلب لـ VPS (أو VPS + Coolify): فاتورة المنصة بقت أكبر من سيرفرين كويسين + ساعتين شغل، والترافيك ثابت ومتوقع، وفيه حد في الفريق مرتاح مع Linux. وإمتى تفضل على PaaS: الفريق صغير ووقته أغلى من الفرق، أو محتاج previews و autoscaling و Postgres بـ PITR من غير ما تبنيهم.

وفيه حل وسط كتير بيعمله الناس: الـ API والـ workers على VPS بـ Coolify، والقاعدة تفضل مُدارة (Neon أو Supabase أو RDS)، لأن القاعدة هي أصعب حاجة تديرها صح (باك أب واسترجاع مجرّب).

إزاي تبقى جاهز للنقل من أول يوم: Dockerfile لكل خدمة (فتشتغل في أي حتة)، وكل الإعدادات متغيرات بيئة (مفيش حاجة في داشبورد بس)، والملفات في S3 أو R2 مش على ديسك، والـ migrations في الكود، والدومين عندك في Cloudflare مش عند المنصة.

خطوات النقل نفسها: شغّل كل حاجة على الجديد جنب القديم، واعمل [[pg_dump]] من القاعدة القديمة و [[pg_restore]] على الجديدة وجرّب عليها، ونزّل الـ TTL قبلها بيوم (درس [[Route 53]])، وبعدين في وقت هادي: وقّف الكتابة (maintenance mode)، و dump أخير، و restore، وغيّر الـ DNS، وسيب القديم شغال أسبوع لو احتجت ترجع. تفاصيل الـ dump والـ restore في تاب PostgreSQL.`,
            when: "كل ما فاتورة المنصة تزيد بشكل ملحوظ، أو تيجي تضيف خدمة جديدة، أو وقت الصيانة على VPS يبدأ ياكل من وقت المنتج.",
            mistakes: R`تحسب الفلوس بس وتعتبر وقتك ببلاش. وتنقل القاعدة من غير ما تجرّب الـ restore قبلها. وتنقل وانت معتمد على حاجات خاصة بالمنصة (cron من الداشبورد، أو متغيرات مش مكتوبة في أي حتة، أو ملفات على ديسك الـ instance). وفي الانترفيو: «امتى تنقل من Heroku-like PaaS لـ infrastructure بتاعتك؟» الإجابة الكويسة فيها التكلفة الكاملة، ومين هيدير، وخطة نقل من غير downtime وخطة رجوع.`
          },
          lines: [
            "سعر ساعتك من أول argument (الافتراضي ١٥ دولار).",
            "٣ طرق لتشغيل نفس المشروع.",
            "PaaS: ٤ بنود (API و worker وقاعدة و Redis)، ونص ساعة شغل في الشهر.",
            "VPS + Coolify: سيرفر وباك أب وتخزين برا، و ٣ ساعات صيانة.",
            "VPS بإيدك: نفس الفلوس، ووقت أكتر (Nginx و systemd بإيدك).",
            "قفلة.",
            "دالة بتجمع البنود.",
            "لكل طريقة:",
            "الفلوس اللي بتدفعها.",
            "تمن وقتك.",
            "اطبع الاتنين والمجموع.",
            "قفلة الحلقة."
          ],
          sol: R`الناتج بسعر ساعة ٥ دولار: PaaS حوالي [[82.5]]، و VPS + Coolify [[35]]، و VPS بإيدك [[45]]. يعني السيرفر أرخص بفرق كبير.

بسعر ١٥: PaaS [[87.5]]، و Coolify [[65]]، و VPS بإيدك [[95]]. هنا الـ VPS بإيدك بقى أغلى من الـ PaaS، و Coolify لسه أرخص.

بسعر ٤٠: PaaS [[100]]، و Coolify [[140]]، و VPS بإيدك [[220]]. الـ PaaS بقت الأرخص فعلًا.

والحل (الـ solCode) بياخد أرقامك من الـ argv: [[node break-even.mjs]] بالافتراضي بيطلّع [[PaaS: 87.5 | VPS: 80 | الـ VPS أرخص]] و [[الاختيار بيقلب عند سعر ساعة 17.1 دولار]]. ولو فاتورة الـ PaaS ١٢٠ والـ VPS ٢٠ بـ ٣ ساعات ([[node break-even.mjs 30 120 20 3]]) نقطة القلب بتبقى ٤٠ دولار.

الفكرة: كل ما وقتك يغلى، الـ PaaS تكسب. وكل ما الخدمات تكتر (زوّد بنود في الـ PaaS بس وشوف)، الـ VPS يكسب. ولو لقيت إن الـ PaaS دايمًا أغلى مهما غيّرت سعر الساعة، راجع إنك حاسب ساعات صيانة الـ VPS بأمانة: تحديثات وباك أب واسترجاع مجرّب ومراقبة، مش «ولا حاجة، هو شغال لوحده».`,
          solCode: R`// break-even.mjs: هات الفاتورة والساعات من argv بدل ما تكتبها في الكود
const [, , hourly = "15", paasBill = "80", vpsBill = "20", vpsHours = "4"] = process.argv;
const h = Number(hourly);
const paas = Number(paasBill) + 0.5 * h;
const vps = Number(vpsBill) + Number(vpsHours) * h;
console.log("PaaS:", paas, "| VPS:", vps, "|", paas < vps ? "خليك على PaaS" : "الـ VPS أرخص");
const breakEven = (Number(paasBill) - Number(vpsBill)) / (Number(vpsHours) - 0.5);
console.log("الاختيار بيقلب عند سعر ساعة", breakEven.toFixed(1), "دولار");`
        }
      ]
    },
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

أخطاء شائعة: [[kind: command not found]] أو [[Cannot connect to the Docker daemon]] (kind محتاج Docker شغال). و [[ImagePullBackOff]] لو كتبت اسم image غلط. ولو [[kubectl]] بيكلّم cluster تاني (مثلًا شغل)، شوف [[kubectl config current-context]] قبل ما تمسح أي حاجة. (ملحوظة: في بيئة التجهيز هنا kind نفسه مقدرش يقوم جوه container، فالناتج ده من الشكل المعروف لـ kind، مش من تشغيل هنا.)`,
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

أخطاء شائعة: تعمل [[kubectl create configmap]] تاني عشان تغيّر القيمة فتاخد [[AlreadyExists]]؛ الطريقة هي [[--dry-run=client -o yaml | kubectl apply -f -]]. و [[.env.production]] فيه سطر بعلامات تنصيص، فالقيمة تتخزن بالتنصيص نفسه. ولو [[env]] مطبعش المتغير خالص، الـ Deployment مفيهوش [[envFrom]] أو اسم الـ ConfigMap فيه مختلف.`,
          solCode: R`kubectl create configmap api-config --from-literal=NODE_ENV=production --from-literal=LOG_LEVEL=debug --dry-run=client -o yaml | kubectl apply -f -
kubectl exec deploy/api -- env | grep LOG_LEVEL
kubectl rollout restart deployment/api
kubectl rollout status deployment/api
kubectl exec deploy/api -- env | grep LOG_LEVEL`
        }
      ]
    },
    {
      t: "Terraform و CI/CD",
      l: 3,
      n: "البنية مكتوبة كود في Git، والـ deploy بيدخل AWS من غير مفاتيح دايمة",
      items: [
        {
          cmd: "Terraform resource",
          title: "البنية مكتوبة كود بدل الضغط في الكونسول",
          desc: R`Terraform بيقرا ملفات [[.tf]] فيها الموارد اللي عايزها، ويقارنها باللي موجود فعلًا، ويعمل الفرق بس، والـ provider هو الـ plugin اللي بيكلّم AWS (أو Cloudflare أو Vercel) والـ resource حاجة واحدة.

الموارد بتشاور على بعض: [[aws_s3_bucket.assets.id]] يعني «الـ id بتاع الـ bucket ده»، و Terraform بيفهم منها الترتيب لوحده.`,
          example: R`provider "aws" {
  region = "eu-central-1"
}

resource "aws_s3_bucket" "assets" {
  bucket = "myapp-assets"
}

resource "aws_s3_bucket_public_access_block" "assets" {
  bucket                  = aws_s3_bucket.assets.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}`,
          try: R`ضيف [[variable "env" { default = "dev" }]] و [[output "bucket_arn" { value = aws_s3_bucket.assets.arn }]]، وخلّي اسم الـ bucket [["myapp-assets-$__{var.env}"]]. شغّل plan (الدرس الجاي) وشوف هيعمل كام resource.`,
          flag: "script",
          deep: {
            why: "البنية اللي اتعملت بالضغط في الكونسول محدش فاكر اتعملت إزاي، ومينفعش تعمل منها نسخة لـ staging، ومحدش يعرف مين غيّر إيه. في Terraform كل تغيير commit وليه review، وتقدر تعمل نفس البيئة في region تانية بتغيير متغير.",
            how: R`الـ block شكله [[resource "TYPE" "NAME"]]: الـ TYPE من الـ provider ([[aws_s3_bucket]])، والـ NAME اسمك انت جوه Terraform بس. الاسم الحقيقي في AWS هو [[bucket = ...]].

في AWS provider الحديث، إعدادات الـ bucket كل واحدة resource لوحدها: public access block، و versioning، و encryption، و lifecycle. عشان كده فيه resource تانية بنفس الاسم [[assets]] بتشاور على الأولى.

المراجع بين الموارد بتعمل dependency graph: Terraform عارف إن الـ public access block محتاج الـ bucket الأول، فيعمله الأول. واللي مش معتمدين على بعض بيتعملوا بالتوازي.

المتغيرات ([[variable]]) بتدخّل قيم من برا ([[-var]] أو ملف [[.tfvars]])، و [[output]] بيطلّع قيم بعد التطبيق (زي عنوان القاعدة). والـ modules بتجمع موارد في وحدة تتعاد (زي «bucket مقفول بإعداداته»).

والـ provider بياخد الصلاحيات من نفس مكان الـ CLI (profile أو متغيرات أو role). وتثبيت نسخة الـ provider نفسه في درس الـ state.`,
            when: "أي بنية هتعيش أكتر من أسبوع أو محتاج منها أكتر من نسخة (dev و prod). للتجربة السريعة الكونسول عادي، بس امسح اللي عملته.",
            mistakes: "تعمل نص الحاجات بـ Terraform ونص بالكونسول، فالـ plan يطلع تغييرات غريبة. وتعدّل من الكونسول مورد Terraform بيديره (drift)، وأول apply يرجّعه. وتغيّر الـ NAME في الكود وتفتكره rename وهو في الحقيقة «امسح واعمل جديد» (استخدم [[moved]] block)."
          },
          lines: [
            "الـ provider: هنكلّم AWS.",
            "في فرانكفورت.",
            "قفلة.",
            "resource نوعه bucket، واسمه جوه Terraform assets.",
            "اسمه الحقيقي في AWS.",
            "قفلة.",
            "resource تاني: منع الوصول العام لنفس الـ bucket.",
            "بيشاور على الـ bucket اللي فوق، فبيتعمل بعده.",
            "امنع ACLs عامة.",
            "امنع bucket policy عامة.",
            "تجاهل أي ACL عامة موجودة.",
            "اقفل الوصول لو فيه policy عامة.",
            "قفلة."
          ],
          sol: R`الملف كامل تحت. [[terraform validate]] يقول [[Success! The configuration is valid.]]، و [[terraform plan]] ينتهي بـ:

[[Plan: 2 to add, 0 to change, 0 to destroy.]]
[[Changes to Outputs: + bucket_arn = (known after apply)]]

يعني resource للـ bucket (وفيه [[bucket = "myapp-assets-dev"]]) وواحد للـ public access block، والـ ARN «known after apply» لأنه مش معروف غير بعد الإنشاء. جرّب [[terraform plan -var env=prod]] وشوف الاسم يبقى [[myapp-assets-prod]]. (شغّلت ده فعلًا بـ provider 6.x والنتيجة زي ما هي.)

أخطاء شائعة: [[Error: Retrieving AWS account details: validating provider credentials ... InvalidClientTokenId]] يعني الترمنال مش داخل على AWS (اعمل [[aws login]] أو حدد [[AWS_PROFILE]]). و [[Reference to undeclared input variable]] لو كتبت [[var.env]] من غير block الـ variable. ولو كتبت [["myapp-assets-var.env"]] من غير [[$__{var.env}]]، الاسم هيبقى النص ده حرفيًا.`,
          solCode: R`provider "aws" {
  region = "eu-central-1"
}

variable "env" {
  default = "dev"
}

resource "aws_s3_bucket" "assets" {
  bucket = "myapp-assets-$__{var.env}"
}

resource "aws_s3_bucket_public_access_block" "assets" {
  bucket                  = aws_s3_bucket.assets.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

output "bucket_arn" {
  value = aws_s3_bucket.assets.arn
}`
        },
        {
          cmd: "terraform plan / apply",
          title: "شوف هيتغير إيه قبل ما يتغير",
          desc: R`الدورة دايمًا [[init]] مرة (ينزّل الـ provider) ثم [[plan]] يوريك بالظبط هيعمل إيه ثم [[apply]] ينفّذ، والرموز في الـ plan: [[+]] يعمل، و [[~]] يعدّل، و [[-]] يمسح، و [[-/+]] يمسح ويعمل من جديد.

احفظ الـ plan في ملف وطبّق الملف ده بالظبط، عشان اللي اتراجع هو اللي يتنفذ. تحذير: اقرا أي [[-]] أو [[-/+]] مرتين، ده مسح حقيقي، و [[destroy]] بيمسح كل حاجة.`,
          example: R`terraform init
terraform fmt -recursive
terraform validate
terraform plan -out=tfplan
terraform apply tfplan
terraform state list
terraform destroy`,
          try: "اعمل الـ bucket بـ apply. غيّر اسمه في الكود وشغّل plan: هتلاقي [[-/+]] لأن اسم الـ bucket مينفعش يتعدّل. رجّع الاسم، وبعدين [[destroy]] وانت فاهم هيمسح إيه.",
          flag: "danger",
          deep: {
            why: "أخطر حاجة في Terraform إنك تطبّق وانت مش شايف. سطر واحد في الكود ممكن يعني «امسح قاعدة البيانات واعمل واحدة فاضية». الـ plan فرصتك تشوف ده قبل ما يحصل.",
            how: R`[[init]] بينزّل الـ providers في [[.terraform/]] ويكتب [[.terraform.lock.hcl]] (ارفعه على Git زي package-lock)، ويجهّز الـ backend.

[[plan]] بيعمل ٣ حاجات: يقرا الـ state (Terraform فاكر عمل إيه)، ويسأل AWS عن الحالة الحقيقية (refresh)، ويقارن بالكود. والنتيجة قايمة تغييرات. بعض الإعدادات لو اتغيرت محتاجة resource جديد (اسم الـ bucket، أو الـ AMI بتاع سيرفر)، فتلاقي [[forces replacement]] جنبها.

[[-out=tfplan]] بيحفظ الـ plan، و [[apply tfplan]] بينفّذه من غير ما يسأل تاني. ومن غير ملف، [[apply]] بيعمل plan جديد ويسألك [[yes]].

[[fmt]] بينسّق الكود، و [[validate]] بيتأكد إن الـ syntax والأنواع سليمة من غير ما يكلّم AWS. الاتنين مكانهم CI.

[[destroy]] بيمسح كل حاجة في الـ state. وللموارد المهمة حط [[prevent_destroy = true]] جوه [[lifecycle]]، وفي RDS [[deletion_protection = true]].

وفي CI: [[plan]] على كل PR ويتحط تعليق، و [[apply]] بعد الـ merge بس، على الـ plan اللي اتراجع.`,
            when: "مع كل تغيير في البنية. ومتعملش apply على الإنتاج من جهازك لو فيه CI بيعمله.",
            mistakes: "[[terraform apply -auto-approve]] من غير ما تبص على الـ plan. وتشوف [[forces replacement]] على قاعدة البيانات وتكمّل. وتضيف [[.terraform/]] لـ Git (مئات الميجات)، أو تنسى [[.terraform.lock.hcl]] فكل واحد في الفريق ياخد نسخة provider مختلفة."
          },
          lines: [
            "نزّل الـ providers وجهّز الـ backend (أول مرة وبعد أي تغيير فيهم).",
            "نسّق كل الملفات.",
            "افحص الكود من غير ما تكلّم AWS.",
            "اعرض التغييرات واحفظها في ملف.",
            "نفّذ الـ plan المحفوظ بالظبط.",
            "الموارد اللي Terraform بيديرها.",
            "امسح كل حاجة في الـ state (بيسألك الأول)."
          ],
          sol: R`بعد [[apply]]: [[Apply complete! Resources: 2 added, 0 changed, 0 destroyed.]] و [[bucket_arn = "arn:aws:s3:::myapp-assets-dev"]]، و [[state list]] يطبع السطرين [[aws_s3_bucket.assets]] و [[aws_s3_bucket_public_access_block.assets]].

لما تغيّر الاسم (مثلًا [[-var env=staging]]) الـ plan يطبع:

[[# aws_s3_bucket.assets must be replaced]]
[[~ bucket = "myapp-assets-dev" -> "myapp-assets-staging" # forces replacement]]
[[Plan: 2 to add, 0 to change, 2 to destroy.]]

يعني الاتنين هيتمسحوا ويتعملوا من جديد ([[-/+]])، لأن اسم الـ bucket مينفعش يتعدّل، والـ access block تابع له. ده اللي عايزك تلاحظه: أي ملفات جوه الـ bucket كانت هتضيع. و [[destroy]] يطبع [[Plan: 0 to add, 0 to change, 2 to destroy.]] ويستنى [[yes]].

الغلطة الشائعة: [[destroy]] يفشل بـ [[BucketNotEmpty]] لأن فيه ملفات جوه الـ bucket؛ ده حماية، فاضيه بإيدك ([[aws s3 rm s3://... --recursive]]) أو استخدم [[force_destroy = true]] في بيئات التجربة بس. (الـ plan ده اتجرّب هنا على state فيه الـ bucket بـ [[-refresh=false]].)`
        },
        {
          cmd: "Terraform state",
          title: "Terraform فاكر إيه، ومتخزّن فين",
          desc: R`الـ state ملف JSON فيه كل مورد Terraform عمله ورقمه الحقيقي في AWS، ومن غيره Terraform مش عارف إن [[aws_s3_bucket.assets]] هو [[myapp-assets]].

افتراضي بيبقى [[terraform.tfstate]] على جهازك، وده ينفع لوحدك بس. في فريق أو CI: الـ state في S3 مع lock عشان محدش يطبّق في نفس اللحظة. والـ state فيه أسرار (باسوردات و connection strings) فمكانه مش Git.`,
          example: R`terraform {
  required_version = ">= 1.11"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 6.0" }
  }
  backend "s3" {
    bucket       = "myapp-tfstate"
    key          = "prod/terraform.tfstate"
    region       = "eu-central-1"
    use_lockfile = true
    encrypt      = true
  }
}`,
          try: "اعمل bucket للـ state بإيدك (مرة واحدة) وفعّل عليه versioning. ضيف الـ block وشغّل [[terraform init -migrate-state]] ينقل الـ state المحلي لـ S3. وافتح ترمنالين وشغّل [[plan]] في الاتنين في نفس اللحظة وشوف رسالة الـ lock.",
          flag: "script",
          deep: {
            why: "اتنين في الفريق عملوا apply في نفس الوقت كل واحد بـ state على جهازه = موارد متكررة أو ممسوحة. أو اللابتوب اللي عليه الـ state باظ = Terraform نسي كل حاجة ومبقاش يعرف يدير البنية.",
            how: R`[[required_version]] و [[required_providers]] بيثبّتوا النسخ: [[~> 6.0]] يعني أي 6.x بس مش 7 (اللي ممكن يكسر حاجات). والـ lock file بيثبّت النسخة بالظبط.

الـ backend "s3": [[key]] مسار الملف جوه الـ bucket (ملف لكل بيئة: [[prod/]] و [[staging/]]). و [[use_lockfile = true]] بيعمل ملف lock جنب الـ state وقت الـ plan والـ apply، فأي حد تاني يستنى أو يفشل برسالة واضحة. ده بدل طريقة DynamoDB القديمة اللي بقت deprecated (الـ lock في S3 نفسه بقى رسمي من Terraform 1.11).

[[encrypt]] بيشفّر الملف في S3. وفعّل versioning على الـ bucket، فلو الـ state باظ ترجّع نسخة قبلها. واقفل الـ bucket بـ Block Public Access وصلاحيات محدودة.

أوامر الـ state: [[terraform state list]] و [[state show]] للقراية، و [[import]] عشان تدخّل مورد اتعمل بالكونسول تحت إدارة Terraform، و [[state mv]] أو [[moved]] block لو غيّرت الاسم. ومتعدّلش الملف بإيدك أبدًا.

والـ bucket بتاع الـ state نفسه بيتعمل مرة واحدة بإيدك أو بـ Terraform منفصل، لأن مينفعش Terraform يخزّن الـ state في bucket لسه هيعمله.`,
            when: "من أول ما حد تاني أو CI هيشغّل Terraform على نفس البنية. وعمليًا من أول يوم.",
            mistakes: "[[terraform.tfstate]] على GitHub وفيه باسورد القاعدة. و state واحد للإنتاج والـ dev، فـ destroy للتجربة يمسح الإنتاج. وتعدّل الـ JSON بإيدك لما حاجة تتلخبط. وتستخدم [[dynamodb_table]] في مشروع جديد مع إنه deprecated."
          },
          lines: [
            "إعدادات Terraform نفسه.",
            "Terraform 1.11 أو أحدث (الـ lock في S3 رسمي).",
            "الـ providers المطلوبة.",
            "AWS provider من HashiCorp، أي نسخة 6.x.",
            "قفلة.",
            "خزّن الـ state في S3.",
            "الـ bucket (اتعمل قبل كده بإيدك).",
            "مسار الملف: ملف لكل بيئة.",
            "الـ region بتاع الـ bucket.",
            "lock بملف جنب الـ state، فمحدش يطبّق في نفس الوقت.",
            "شفّر الملف في S3.",
            "قفلة الـ backend.",
            "قفلة."
          ],
          sol: R`[[terraform init -migrate-state]] بيسألك [[Do you want to copy existing state to the new backend?]]، تكتب [[yes]]، وبعدها [[Successfully configured the backend "s3"!]]. وفي الـ bucket هتلاقي [[prod/terraform.tfstate]]، ومع versioning كل apply بيعمل version جديدة ترجع لها لو الـ state باظ. وتقدر تمسح [[terraform.tfstate]] المحلي بعد ما تتأكد إن [[terraform plan]] بيقول [[No changes]].

والـ lock: الـ plan بياخد الـ lock ثواني بس، فلو الاتنين مجوش في نفس اللحظة بالظبط ممكن الاتنين يعدّوا. الأضمن: شغّل [[terraform apply]] في ترمنال وسيبه واقف عند [[Enter a value:]] (هو ماسك الـ lock)، وشغّل [[plan]] في التاني. هتاخد:

[[Error: Error acquiring the state lock]] ومعاها [[Lock Info:]] فيها [[ID]] و [[Path]] و [[Operation: OperationTypeApply]] و [[Who]] (اليوزر والجهاز). جرّبت الرسالة دي بـ local state والشكل واحد؛ مع S3 الـ Path بيبقى [[myapp-tfstate/prod/terraform.tfstate]]، وملف [[.tflock]] بيظهر جنب الـ state طول ما الـ lock ماسك.

الغلطة الشائعة: تعمل [[terraform force-unlock ID]] والعملية التانية لسه شغالة فعلًا، فالاتنين يكتبوا في نفس الـ state. استخدمه بس لو متأكد إن اللي ماسك الـ lock مات (مثلًا CI اتقفل في النص). وتانية: [[Error: Failed to get existing workspaces ... NoSuchBucket]] لأنك عملت الـ backend قبل ما تعمل الـ bucket بإيدك.`
        },
        {
          cmd: "GitHub OIDC",
          title: "GitHub Actions يدخل AWS من غير مفاتيح في Secrets",
          desc: R`بدل IAM user بـ access key دايم في GitHub Secrets، GitHub بيدّي كل job توكن موقّع فيه «أنا repo كذا و branch كذا»، و AWS يتأكد منه ويدّي مفاتيح مؤقتة لساعة من role انت محدد مين يلبسها.

مرة واحدة من الكونسول: IAM ← Identity providers ← OpenID Connect، بالـ URL [[https://token.actions.githubusercontent.com]] والـ audience [[sts.amazonaws.com]]. وبعدين role بالـ trust policy دي.`,
          example: R`{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": { "Federated": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com" },
    "Action": "sts:AssumeRoleWithWebIdentity",
    "Condition": {
      "StringEquals": {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
        "token.actions.githubusercontent.com:sub": "repo:myorg/myapp:ref:refs/heads/main"
      }
    }
  }]
}`,
          try: "اعمل الـ provider والـ role، وادّي الـ role صلاحية [[s3:ListBucket]] بس. اعمل workflow على main يشغّل [[aws sts get-caller-identity]] و [[aws s3 ls s3://myapp-site]]. بعدين شغّله من branch تاني وشوف [[Not authorized to perform sts:AssumeRoleWithWebIdentity]].",
          flag: "script",
          deep: {
            why: "access key في GitHub Secrets: أي action خبيث في الـ workflow، أو أي حد بصلاحية على الـ repo، يقدر يطلّعه، وبيفضل شغال لحد ما حد يفتكر يغيّره. مع OIDC مفيش سر متخزن أصلًا، والمفاتيح بتموت بعد ساعة، ومربوطة بـ repo و branch محددين.",
            how: R`لما الـ job فيه [[id-token: write]] في الـ permissions، GitHub بيقدر يطلّع JWT موقّع بمفتاحه. التوكن فيه claims: [[aud]] (لمين، هنا sts.amazonaws.com)، و [[sub]] (مين: [[repo:ORG/REPO:ref:refs/heads/BRANCH]]، أو [[repo:ORG/REPO:environment:production]] لو الـ job عليه environment)، وحاجات تانية.

الـ action [[configure-aws-credentials]] بيبعت التوكن لـ STS بـ [[AssumeRoleWithWebIdentity]]. AWS بيتأكد من التوقيع بمفاتيح GitHub العامة (عشان كده سجّلت الـ provider)، وبعدين يقيّم الـ trust policy: [[aud]] مطابق؟ [[sub]] مطابق؟ لو آه يرجّع مفاتيح مؤقتة، والـ action يحطها متغيرات بيئة لباقي الـ steps.

الـ [[sub]] هو القفل الحقيقي. [[StringEquals]] على main بس معناه إن PR من fork أو branch تجربة مش هيقدر يلبس role الإنتاج. ولو محتاج أكتر من branch استخدم [[StringLike]] بحذر: [[repo:myorg/*]] يعني أي repo في الـ org.

والأحسن كمان: GitHub environment اسمه production بموافقة يدوية، والـ sub يبقى [[environment:production]]، فمحدش يطبّق على الإنتاج من غير approval. التفاصيل عن environments في تاب GitHub Actions.`,
            when: "أي CI بيكلّم AWS: deploy على S3 و CloudFront، و push لـ ECR، و terraform apply.",
            mistakes: "trust policy من غير شرط [[sub]] (أو [[sub]] فيه نجمة على الـ org كله): repos تانية تقدر تلبس الـ role بتاعتك. وتنسى [[id-token: write]] فيطلع [[Could not load credentials]]. وتدّي الـ role بتاعة الـ CI [[AdministratorAccess]]."
          },
          lines: [
            "بداية الـ trust policy.",
            "إصدار لغة الـ policy.",
            "قاعدة واحدة.",
            "اسمح.",
            "لمين: توكنات موقّعة من GitHub (الـ provider اللي سجّلته).",
            "إنه يلبس الـ role بتوكن OIDC.",
            "بشروط.",
            "لازم القيم تطابق بالظبط.",
            "التوكن معمول لـ AWS STS.",
            "ومن الـ repo ده و branch main بس.",
            "قفلة.",
            "قفلة الشروط.",
            "قفلة القاعدة والقايمة.",
            "قفلة الـ policy."
          ],
          sol: R`الـ workflow تحت (عدّى من [[actionlint]]). على main، step الـ credentials يطبع [[Assuming role with OIDC]] وبعدها [[Authenticated as assumedRoleId AROA...:GitHubActions]]، و [[get-caller-identity]] يطلّع [[arn:aws:sts::123456789012:assumed-role/github-readonly/GitHubActions]]، و [[s3 ls]] يعرض الملفات. من branch تاني، نفس الـ step يفشل بـ [[Could not assume role with OIDC: Not authorized to perform sts:AssumeRoleWithWebIdentity]]، لأن الـ [[sub]] في التوكن بقى [[repo:myorg/myapp:ref:refs/heads/feature-x]] ومش مطابق للـ Condition.

لاحظ إن [[s3:ListBucket]] بيتدّى على الـ bucket نفسه [[arn:aws:s3:::myapp-site]] مش [[/*]]. لو كتبته بـ [[/*]] هتاخد [[AccessDenied ... ListObjectsV2]] مع إن الـ role اتلبست صح.

أخطاء شائعة: [[No OpenIDConnect provider found in your account]] يعني الـ provider مش معمول (أو الـ ARN في الـ trust فيه رقم حساب غلط). و [[Incorrect token audience]] يعني [[client-id-list]] مش [[sts.amazonaws.com]]. ولو الـ workflow بيشتغل على [[pull_request]] الـ sub بيبقى [[repo:myorg/myapp:pull_request]]، ولو فيه [[environment:]] بيبقى [[repo:myorg/myapp:environment:prod]]، فالـ Condition لازم تطابق الشكل ده.`,
          solCode: R`aws iam create-open-id-connect-provider --url https://token.actions.githubusercontent.com --client-id-list sts.amazonaws.com
# trust-github.json = الـ trust policy اللي في المثال
aws iam create-role --role-name github-readonly --assume-role-policy-document file://trust-github.json
aws iam put-role-policy --role-name github-readonly --policy-name list-site --policy-document '{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Action":"s3:ListBucket","Resource":"arn:aws:s3:::myapp-site"}]}'
# .github/workflows/whoami.yml
name: whoami
on: [push, workflow_dispatch]
permissions:
  id-token: write
  contents: read
jobs:
  whoami:
    runs-on: ubuntu-latest
    steps:
      - uses: aws-actions/configure-aws-credentials@v6
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-readonly
          aws-region: eu-central-1
      - run: aws sts get-caller-identity
      - run: aws s3 ls s3://myapp-site`
        },
        {
          cmd: "deploy.yml إلى AWS",
          title: "workflow بيبني الموقع ويرفعه على S3 و CloudFront",
          desc: R`بعد ما الـ role جاهزة الـ workflow بسيط: [[id-token: write]] في الـ permissions، و step بـ [[aws-actions/configure-aws-credentials]] بياخد الـ role والـ region، وبعدها أي أمر [[aws]] شغال.

مفيش [[AWS_ACCESS_KEY_ID]] في أي مكان. ولو محتاج رقم الحساب أو الـ distribution، حطهم في GitHub Variables (مش أسرار).`,
          example: R`on: { push: { branches: [main] } }
permissions:
  id-token: write
  contents: read
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: aws-actions/configure-aws-credentials@v6
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-deploy
          aws-region: eu-central-1
      - run: npm ci && npm run build && aws s3 sync dist/assets s3://myapp-site/assets --cache-control "public,max-age=31536000,immutable"
      - run: aws s3 cp dist/index.html s3://myapp-site/index.html --cache-control no-cache && aws cloudfront create-invalidation --distribution-id E1ABCDEF2GHIJK --paths "/index.html"`,
          try: "حط الـ workflow في repo الموقع واعمل push على main، وافتح الـ run وشوف step الـ credentials: هتلاقي الـ role اللي اتلبست. بعدين شيل [[id-token: write]] وشوف الخطأ.",
          flag: "script",
          deep: {
            why: "الـ deploy اليدوي من جهازك بيعتمد على إن جهازك عليه الصلاحيات الصح والـ build صح. الـ CI بيعمل نفس الخطوات كل مرة من كود نضيف، وبصلاحيات مؤقتة ومحدودة.",
            how: R`لما تكتب [[permissions]] صريح، أي صلاحية مش مكتوبة بتبقى [[none]]. عشان كده [[contents: read]] لازمة للـ checkout، و [[id-token: write]] لازمة لطلب التوكن. وممكن تحطهم على مستوى الـ job بدل الـ workflow كله.

[[configure-aws-credentials]] بعد ما ياخد المفاتيح المؤقتة بيحطها في [[AWS_ACCESS_KEY_ID]] و [[AWS_SECRET_ACCESS_KEY]] و [[AWS_SESSION_TOKEN]] كمتغيرات بيئة للـ steps اللي بعده، فالـ CLI والـ SDK بيلاقوها لوحدهم. والمدة الافتراضية ساعة.

الـ runner بتاع [[ubuntu-latest]] عليه AWS CLI جاهز. ونفس النمط لأي حاجة: push لـ ECR بـ [[aws-actions/amazon-ecr-login]]، أو [[terraform plan]] و [[apply]].

والـ role نفسها صلاحياتها على قد الـ workflow: [[s3:PutObject]] و [[s3:ListBucket]] على [[myapp-site]]، و [[cloudfront:CreateInvalidation]] على الـ distribution دي. مش أكتر.

والتفاصيل العامة (triggers و jobs و secrets و environments و concurrency) في تاب GitHub Actions.`,
            when: "أي deploy لـ AWS من GitHub. ونفس الفكرة موجودة في GitLab CI و Bitbucket مع OIDC.",
            mistakes: "تكتب [[id-token: write]] بس وتنسى [[contents: read]] فالـ checkout يقع. وتستخدم [[aws s3 sync --delete]] على الـ bucket كله فتمسح assets الناس لسه بتطلبها. وتنسى [[concurrency]] فاتنين deploy يشتغلوا في نفس الوقت والأقدم يخلص الأخير."
          },
          lines: [
            "اشتغل مع كل push على main.",
            "صلاحيات الـ workflow (أي حاجة مش مكتوبة بتبقى none).",
            "مسموح يطلب توكن OIDC.",
            "ويقرا الكود.",
            "الـ jobs.",
            "job اسمه deploy.",
            "على Ubuntu (عليه AWS CLI).",
            "الخطوات.",
            "هات الكود.",
            "البس الـ role بـ OIDC.",
            "الإعدادات.",
            "الـ role اللي الـ trust policy بتاعتها بتسمح للـ repo ده.",
            "الـ region.",
            "ابني وارفع الـ assets بكاش سنة.",
            "ارفع index.html من غير كاش وامسحه من كاش CloudFront."
          ],
          sol: R`الـ run المفروض يبقى أخضر، وفي step [[configure-aws-credentials]] هتلاقي [[Assuming role with OIDC]] و [[Authenticated as assumedRoleId ...]]. و step الـ sync يطبع [[upload: dist/assets/index-a1b2c3.js to s3://myapp-site/assets/index-a1b2c3.js]] لكل ملف جديد (والملفات اللي متغيرتش مش بتترفع تاني)، والأخير يطبع JSON الـ invalidation بحالة [[InProgress]].

لما تشيل [[id-token: write]]: step الـ credentials يطبع [[It looks like you might be trying to authenticate with OIDC. Did you mean to set the id-token permission?]] وبعدها يفشل بـ [[Credentials could not be loaded, please check your action inputs: Could not load credentials from any providers]]. السبب: من غير الصلاحية دي GitHub مش بيدّي الـ job توكن OIDC أصلًا، فالـ action ملقاش حاجة يبدّلها بمفاتيح AWS.

أخطاء شائعة: الـ run نجح والموقع لسه قديم لأن [[index.html]] اترفع بكاش طويل من deploy قديم (المتصفح نفسه كاشه). و [[AccessDenied]] على [[CreateInvalidation]] لأن الـ role ناقصها [[cloudfront:CreateInvalidation]]. ولو حطيت [[permissions]] على مستوى الـ job، اللي على مستوى الـ workflow بيتلغي للـ job ده، فلازم تكتب [[contents: read]] هناك كمان وإلا [[checkout]] يفشل في repo private.`
        }
      ]
    },
    {
      t: "المراقبة و SRE",
      l: 3,
      n: "تعرف إن فيه مشكلة قبل العميل، وتتصرف صح لما تحصل، وتتعلم منها",
      items: [
        {
          cmd: "CloudWatch",
          title: "لوجات ومقاييس وإنذارات على AWS",
          desc: R`المراقبة ٣ أنواع: logs (إيه اللي حصل بالتفصيل) و metrics (أرقام على مدار الوقت) و traces (رحلة طلب واحد بين الخدمات)، و CloudWatch بيجمع اللوجات والـ metrics من خدمات AWS لوحده وانت بتضيف الإنذارات.

اكتب لوجات التطبيق JSON (بـ pino مثلًا) عشان تبحث فيها بالحقول، وحط مدة احتفاظ لكل log group لأن الافتراضي «للأبد» وبيتحاسب. تحذير: تغيير المدة بيمسح اللوجات الأقدم منها، والإنذارات بتتحاسب بالشهر.`,
          example: R`aws logs tail /ecs/myapp-api --since 30m --follow --format short
aws logs put-retention-policy --log-group-name /ecs/myapp-api --retention-in-days 30
aws logs start-query --log-group-name /ecs/myapp-api --start-time $(date -d '-1 hour' +%s) --end-time $(date +%s) --query-string 'fields @timestamp, path, status | filter status >= 500 | stats count() by path'
aws logs get-query-results --query-id 12345678-1234-1234-1234-123456789012
aws cloudwatch put-metric-alarm --alarm-name myapp-5xx --namespace AWS/ApplicationELB --metric-name HTTPCode_Target_5XX_Count --dimensions Name=LoadBalancer,Value=app/myapp-alb/0123456789abcdef --statistic Sum --period 300 --evaluation-periods 1 --threshold 10 --comparison-operator GreaterThanThreshold --alarm-actions arn:aws:sns:eu-central-1:123456789012:myapp-alerts`,
          try: "حط في التطبيق logger بيطبع JSON فيه [[path]] و [[status]] و [[ms]]، وشغّله على ECS أو Lambda. واعمل Logs Insights query بتطلّع أبطأ ١٠ endpoints بـ [[stats avg(ms) by path | sort avg(ms) desc | limit 10]].",
          flag: "danger",
          deep: {
            why: "من غير مراقبة بتعرف إن الموقع واقع من عميل على واتساب. ومن غير لوجات منظمة بتقضي ساعة grep في نص عشوائي. والـ log groups اللي من غير retention بتكبر لحد ما تبقى بند كبير في الفاتورة.",
            how: R`اللوجات: كل خدمة بتكتب في log group ([[/aws/lambda/NAME]] أو اللي حددته في ECS). Lambda و ECS بـ awslogs بيودّوا stdout و stderr لوحدهم، فالتطبيق يطبع على الشاشة بس. ولو السطر JSON، Logs Insights بيفهم الحقول لوحده: [[filter status >= 500]] بدل regex.

[[start-query]] بيبدأ query ويرجّع [[queryId]]، و [[get-query-results]] بيجيب النتيجة (والكونسول أسهل). وبتدفع على الجيجات اللي اتمسحت، فضيّق الوقت.

الـ metrics: كل خدمة بتبعت metrics أساسية لوحدها (CPU الـ EC2، وأخطاء Lambda، و 5xx الـ ALB، واتصالات RDS). الـ alarm بيبص على metric كل [[period]] ثانية، ولو عدّى الحد لعدد [[evaluation-periods]] بيتحول ALARM ويبعت لـ SNS (إيميل أو Slack أو غيره).

الـ traces: X-Ray أو OpenTelemetry. كل طلب ليه trace id بيتنقل في الهيدرز بين الخدمات، فتشوف «الطلب ده قعد ٢ ثانية منهم ١.٨ في query واحدة». والتفاصيل وكود شغال في فئة «OpenTelemetry والـ tracing» تحت.

وتقدر تطلّع metrics من اللوجات نفسها (metric filters)، وده مفيد لرقم زي «عدد الطلبات اللي فشلت في الدفع».`,
            when: "من أول يوم في الإنتاج: retention لكل log group، وإنذار على 5xx، وإنذار على الـ latency، وإنذار على الفاتورة.",
            mistakes: "[[console.log]] نص حر مع كل حاجة، ومفيش request id يربط سطور الطلب الواحد. وتطبع باسوردات أو توكنات في اللوج. و ٥٠ إنذار على كل حاجة فالناس تتجاهلهم كلهم. وإنذار على CPU عالي بدل ما يبقى على اللي اليوزر حاسس بيه (أخطاء وبطء)."
          },
          lines: [
            "تابع اللوج لايف من آخر نص ساعة.",
            "احتفظ بـ ٣٠ يوم بس (الأقدم بيتمسح).",
            "Logs Insights: عدد أخطاء 5xx لكل مسار في آخر ساعة.",
            "هات نتيجة الـ query بالرقم اللي رجع.",
            "إنذار: لو أكتر من ١٠ أخطاء 5xx في ٥ دقايق، ابعت لـ SNS."
          ],
          sol: R`الـ logger تحت (جرّبته محليًا). كل طلب بيطبع سطر زي:

[[{"level":"info","method":"GET","path":"/users/:id","status":200,"ms":4}]]

لاحظ إن [[path]] هو الـ route pattern مش المسار الحقيقي ([[/users/:id]] مش [[/users/7]])، عشان الـ stats تجمّع كل المستخدمين في سطر واحد. Logs Insights بيقرا حقول الـ JSON لوحده، فالـ query تحت بترجع جدول: [[path]] و [[avgMs]] و [[n]]، مترتب من الأبطأ.

من الترمنال: [[start-query]] بيرجّع [[queryId]]، و [[get-query-results]] بيرجّع [[status: Running]] وبعدين [[Complete]] ومعاه [[results]] كل صف فيها list من [[{field, value}]].

أخطاء شائعة: الجدول فاضي لأن التطبيق بيطبع نص عادي مش JSON (أو بيطبع [[console.log(obj)]] من غير [[JSON.stringify]] فيطلع شكل Node مش JSON)، أو اختار log group غلط أو فترة زمنية مفيهاش لوجات. ولو الـ path هو المسار الحقيقي، الـ stats هتطلع آلاف الصفوف ومفيش فايدة. ولو [[sort]] على [[avg(ms)]] مباشرة مشتغلش عندك، سمّيه بـ [[as avgMs]] زي ما تحت.`,
          solCode: R`app.use((req, res, next) => {
  const start = performance.now();
  res.on("finish", () => {
    console.log(JSON.stringify({
      level: res.statusCode >= 500 ? "error" : "info",
      method: req.method,
      path: req.route?.path ?? "unmatched",
      status: res.statusCode,
      ms: Math.round(performance.now() - start),
    }));
  });
  next();
});
// Logs Insights:
// fields path, ms | filter ispresent(ms) | stats avg(ms) as avgMs, count(*) as n by path | sort avgMs desc | limit 10`
        },
        {
          cmd: "Prometheus + Grafana",
          title: "مقاييس ولوحات لتطبيقك على أي سيرفر",
          desc: R`Prometheus بيسحب أرقام من endpoint اسمه [[/metrics]] في تطبيقك كل شوية ويخزّنها، و Grafana بيرسمها لوحات وبيعمل إنذارات، وفي Node مكتبة [[prom-client]] بتطلّع الأرقام بالشكل المطلوب.

أهم ٣ أرقام لأي API (RED): Rate (طلبات في الثانية)، و Errors (نسبة الأخطاء)، و Duration (الـ latency، خصوصًا p95 و p99).`,
          example: R`import client from "prom-client";

client.collectDefaultMetrics();
const httpDuration = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request latency",
  labelNames: ["method", "route", "status"],
  buckets: [0.05, 0.1, 0.3, 1, 3],
});

app.use((req, res, next) => {
  const end = httpDuration.startTimer({ method: req.method });
  res.on("finish", () => end({ route: req.route?.path ?? "unmatched", status: res.statusCode }));
  next();
});
app.get("/metrics", async (req, res) => res.type(client.register.contentType).send(await client.register.metrics()));`,
          try: R`شغّل Prometheus و Grafana بـ Docker Compose، و [[prometheus.yml]] فيه [[scrape_configs]] بـ target [[api:3000]]. وفي Grafana اعمل panel بالـ query [[histogram_quantile(0.95, sum(rate(http_request_duration_seconds_bucket[5m])) by (le, route))]] وشوف p95 لكل route.`,
          flag: "script",
          deep: {
            why: "CloudWatch مربوط بـ AWS ومكلف مع الحجم. على VPS أو k8s، Prometheus و Grafana ببلاش ومعيار الصناعة. والمتوسط بيكدب: متوسط ١٠٠ مللي ممكن يخبّي إن ١٪ من الطلبات بتاخد ٥ ثواني.",
            how: R`Prometheus بيعمل scrape: كل [[scrape_interval]] بيطلب [[/metrics]] من كل target ويخزّن الأرقام بوقتها (time series). وكل مجموعة labels مختلفة = series لوحدها.

الأنواع: Counter (بيزيد بس، زي عدد الطلبات، وبتقراه بـ [[rate()]])، و Gauge (بيطلع وينزل، زي الاتصالات المفتوحة)، و Histogram (بيعد القيم في buckets عشان تحسب percentiles).

الـ Histogram هنا بيطلّع [[http_request_duration_seconds_bucket]] لكل حد (أقل من ٠.٠٥، أقل من ٠.١، ...)، و [[_sum]] و [[_count]]. و [[histogram_quantile(0.95, ...)]] بيحسب p95 منهم. و [[startTimer]] بيرجّع دالة، لما تناديها بتحسب المدة وتسجّلها بالـ labels.

[[collectDefaultMetrics]] بيضيف أرقام Node نفسه: الرام، و event loop lag، و GC.

الـ route لازم يبقى القالب ([[/users/:id]]) مش المسار الحقيقي ([[/users/8812]])، وإلا كل يوزر series جديدة والـ Prometheus يتملى (high cardinality).

و Grafana بيقرا من Prometheus ويرسم، وفيه alerting بيبعت Telegram أو Slack أو إيميل. ولو مش عايز تدير ده، Grafana Cloud فيه خطة مجانية.`,
            when: "أي تطبيق على VPS أو k8s في الإنتاج. وحتى على AWS لو عندك خدمات كتير وعايز لوحات موحدة.",
            mistakes: "labels فيها user id أو المسار الخام أو الإيميل: ملايين series. و [[/metrics]] مفتوح للنت (بيكشف مسارات وأرقام داخلية)، فاقفله في Nginx أو على بورت داخلي. وتحسب المتوسط بدل p95. وتعمل [[rate()]] على Gauge."
          },
          lines: [
            "مكتبة Prometheus لـ Node.",
            "أرقام Node الأساسية: الرام و event loop و GC.",
            "Histogram لمدة الطلبات.",
            "اسم الـ metric (بالثواني، ده العرف).",
            "وصف.",
            "الأبعاد اللي هتقسّم بيها.",
            "حدود الـ buckets بالثواني.",
            "قفلة.",
            "middleware على كل طلب.",
            "ابدأ العدّاد بالـ method.",
            "لما الرد يخلص: سجّل المدة بقالب الـ route (مش المسار الخام) والـ status.",
            "كمّل للـ route.",
            "قفلة.",
            "endpoint بيطلّع كل الأرقام بصيغة Prometheus."
          ],
          sol: R`الملفين تحت. بعد [[docker compose up -d]]: [[http://localhost:9090/targets]] المفروض يوري الـ job [[api]] بحالة [[UP]]. و [[curl localhost:3000/metrics]] يطلّع سطور زي:

[[http_request_duration_seconds_bucket{le="0.3",method="GET",route="/users/:id",status="200"} 3]]

جرّبت ده فعلًا: route بتاخد ١٢٠ مللي، والـ query بتاعة الـ p95 رجّعت [[0.29]] للـ route ده. مش غلط: الـ histogram عارف بس إن الطلبات بين 0.1 و 0.3 (الـ buckets)، فـ [[histogram_quantile]] بيقدّر بالـ interpolation جوه الـ bucket. عشان رقم أدق، حط buckets قريبة من الأرقام اللي تهمك. و route اسمها [[unmatched]] ممكن تطلع [[NaN]] لو مفيهاش ترافيك في آخر ٥ دقايق.

أخطاء شائعة: الـ target [[DOWN]] بـ [[connection refused]] لأنك كتبت [[localhost:3000]] جوه Prometheus (ده الـ container نفسه)، الصح اسم الـ service في Compose [[api:3000]]. والـ panel فاضي في Grafana لأن الـ data source URL مكتوب [[http://localhost:9090]] بدل [[http://prometheus:9090]]. ولو شلت [[by (le, route)]] أو نسيت [[le]] الـ query بترجع فاضي أو خطأ.`,
          solCode: R`# prometheus.yml
global:
  scrape_interval: 15s
scrape_configs:
  - job_name: api
    static_configs:
      - targets: ["api:3000"]
# compose.yaml
services:
  api:
    build: .
    ports: ["3000:3000"]
  prometheus:
    image: prom/prometheus
    volumes: ["./prometheus.yml:/etc/prometheus/prometheus.yml:ro"]
    ports: ["9090:9090"]
  grafana:
    image: grafana/grafana
    ports: ["3001:3000"]
    depends_on: [prometheus]`
        },
        {
          cmd: "Sentry",
          title: "اعرف الأخطاء اللي حصلت عند المستخدم بالـ stack trace",
          desc: R`Sentry بيمسك أي exception في الـ backend أو المتصفح ويبعته بالـ stack trace واليوزر والـ request والنسخة، ويجمّع الأخطاء المتشابهة في issue واحدة وينبّهك لما حاجة جديدة تظهر.

في Node: ملف [[instrument.mjs]] فيه [[Sentry.init]] ويتحمّل قبل أي حاجة بـ [[node --import]]، و [[setupExpressErrorHandler]] بعد كل الـ routes.`,
          example: R`// instrument.mjs
import * as Sentry from "@sentry/node";
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  release: process.env.GIT_SHA,
  tracesSampleRate: 0.1,
  sendDefaultPii: false,
});
// app.mjs: بعد كل الـ routes وقبل أي error handler تاني
Sentry.setupExpressErrorHandler(app);
// التشغيل: node --import ./instrument.mjs app.mjs`,
          try: R`اعمل حساب Sentry مجاني ومشروع Node، وحط الـ DSN في متغير بيئة. اعمل route بترمي [[throw new Error("test sentry")]] وافتحه، وشوف الـ issue: الـ stack trace والـ request والـ environment. وبعدها امسح الـ route ده.`,
          flag: "script",
          deep: {
            why: "اللوجات بتقولك إن فيه خطأ لو دوّرت. Sentry بيجيلك هو: «خطأ جديد ظهر في النسخة اللي نزلت من ساعة، حصل ٣٤٠ مرة لـ ٥٠ يوزر، في السطر ده». والأهم أخطاء المتصفح: من غيره مش هتعرف إن زرار الدفع بيقع على Safari.",
            how: R`[[--import ./instrument.mjs]] بيحمّل Sentry قبل تطبيقك، فيقدر يلف (instrument) الـ http و Express و pg و Prisma قبل ما يتحمّلوا. لو عملت init في نص الكود، جزء من الـ tracing مش هيشتغل.

[[setupExpressErrorHandler(app)]] بيضيف error middleware يبعت أي خطأ وصل لـ [[next(err)]] أو اترمى في route. ومكانه بعد الـ routes وقبل الـ error handler بتاعك (اللي بيرجّع JSON لليوزر).

[[environment]] و [[release]] بيخلّوك تفلتر: أخطاء الإنتاج بس، ومن أنهي نسخة بدأت. و [[release]] بالـ commit SHA بيربط الخطأ بالـ deploy اللي جابه.

[[tracesSampleRate: 0.1]]: ١٠٪ من الطلبات بتتسجل كـ traces للأداء. و [[1.0]] في الإنتاج بيخلّص الـ quota بسرعة.

[[sendDefaultPii: false]]: ميبعتش IPs والكوكيز وبيانات اليوزر تلقائي. بيانات العملاء لما تطلع لخدمة برا دي مسؤولية قانونية.

وفي المتصفح (React أو Next.js) فيه SDK لكل framework، ولازم ترفع source maps عشان الـ stack trace يبقى على الكود الأصلي مش الـ minified.`,
            when: "أي تطبيق في الإنتاج، backend و frontend. والخطة المجانية كفاية لمشروع صغير.",
            mistakes: R`في مشروع حقيقي كان [[Sentry.init]] مكتوب في أول [[index.ts]] وتحته تعليق «لازم يتنفذ قبل أي حاجة»، وبعده [[import express]]. بس في ESM كل الـ imports بتتنفذ الأول قبل أي كود في الملف، فالـ init كان بيحصل بعد تحميل Express، والحل ملف instrument منفصل مع [[--import]]. وفي نفس المشروع route للتجربة [[/debug-sentry]] اتساب في الإنتاج. وغلطات تانية: الـ DSN في الكود بدل متغير بيئة، وأخطاء متكررة محدش بيحلها ولا بيعملها ignore لحد ما محدش يبص على Sentry خالص.`
          },
          lines: [
            "هات الـ SDK.",
            "ابدأ Sentry قبل أي حاجة في التطبيق.",
            "مفتاح المشروع من متغير بيئة.",
            "البيئة: production أو staging.",
            "النسخة: الـ commit SHA.",
            "سجّل ١٠٪ من الطلبات للأداء.",
            "متبعتش بيانات شخصية تلقائي.",
            "قفلة.",
            "في app.mjs: ابعت أي خطأ في Express لـ Sentry."
          ],
          sol: R`بعد ما تفتح الـ route، خلال ثواني هيظهر issue في Sentry عنوانه [[Error: test sentry]]، وجواه: الـ stack trace لحد السطر اللي فيه [[throw]] في ملفك، وقسم Request فيه الـ URL والـ method والـ headers (من غير IP والكوكيز لأن [[sendDefaultPii: false]])، و tags فيها [[environment]] و [[release]] (لو [[GIT_SHA]] متسجل). واليوزر نفسه هيشوف 500 عادي، لأن Sentry بيسجّل الخطأ وبيسيب الـ error handler التاني يرد.

لو مفيش حاجة ظهرت: أول سبب إن [[SENTRY_DSN]] مش متعرّف في البيئة اللي شغّلت منها، و [[Sentry.init]] بـ dsn فاضي مبيشتكيش، بيقفل نفسه في صمت. تاني سبب: شغّلت [[node app.mjs]] من غير [[--import ./instrument.mjs]]، فالـ instrumentation متحمّلش قبل express. تالت: الـ route عامل [[try/catch]] وبيرجّع 500 بنفسه، فالخطأ موصلش للـ handler أصلًا (في الحالة دي استخدم [[Sentry.captureException(err)]]). ورابع: [[setupExpressErrorHandler]] متحط قبل الـ routes.

جرّب كمان تفتح الـ route مرتين: هيبقى issue واحد عدده 2 events، مش اتنين. وبعدها امسح الـ route واعمل Resolve للـ issue.`,
          solCode: R`app.get("/debug-sentry", () => {
  throw new Error("test sentry");
});
// SENTRY_DSN=https://...ingest.sentry.io/... NODE_ENV=staging GIT_SHA=$(git rev-parse --short HEAD) node --import ./instrument.mjs app.mjs`
        },
        {
          cmd: "SLI / SLO / error budget",
          title: "الاعتمادية بالأرقام: قد إيه مسموح نقع",
          desc: R`SLI رقم بتقيسه من ناحية اليوزر (نسبة الطلبات اللي نجحت أو اللي خلصت في أقل من ٣٠٠ مللي)، و SLO هدف ليه زي «٩٩.٩٪ في ٣٠ يوم»، و error budget هو الفرق: ٠.١٪ مسموح يفشل، يعني حوالي ٤٣ دقيقة وقوع كامل في الشهر.

لو الميزانية لسه موجودة، اعمل deploy وجرّب براحتك. لو خلصت، وقّف الـ features وركّز على الاعتمادية لحد ما ترجع.`,
          example: R`const slo = 0.999;
const minutesIn30Days = 30 * 24 * 60;
console.log((minutesIn30Days * (1 - slo)).toFixed(1)); // 43.2

const total = 1_200_000;
const failed = 900;
const sli = 1 - failed / total;
const budgetUsed = (failed / total) / (1 - slo);
console.log((sli * 100).toFixed(3) + "%", Math.round(budgetUsed * 100) + "% of budget"); // 99.925% 75% of budget`,
          try: "احسب الميزانية لـ ٩٩٪ و ٩٩.٩٩٪. بعدين خد لوجات الـ ALB أو Nginx لأسبوع واحسب الـ SLI الحقيقي بتاعك: كام طلب 5xx من الإجمالي.",
          flag: "script",
          deep: {
            why: "«الموقع لازم يبقى شغال ١٠٠٪» هدف مستحيل وبيقتل السرعة: كل deploy بقى خطر. الـ SLO بيحوّل النقاش من إحساس لرقم: عندنا ٤٣ دقيقة في الشهر، صرفنا منهم ٣٠، يبقى نهدّى.",
            how: R`اختار SLIs من ناحية اليوزر مش السيرفر: CPU ٩٠٪ مش مشكلة لو الطلبات سريعة. الشائع: availability (نسبة الردود اللي مش 5xx) و latency (نسبة الطلبات الأسرع من حد معين).

كل ٩ زيادة أغلى بكتير: ٩٩٪ = ٧.٢ ساعة في الشهر، و ٩٩.٩٪ = ٤٣ دقيقة، و ٩٩.٩٩٪ = ٤ دقايق ونص. الأخيرة معناها إن أي مشكلة لازم تتحل قبل ما حد يصحى أصلًا، يعني automation كامل و Multi-AZ وأكتر.

والـ SLO بتاعك لازم يبقى أقل من اعتمادية اللي انت معتمد عليه: لو القاعدة Single-AZ، متوعدش بـ ٩٩.٩٩٪.

الـ SLA حاجة تانية: عقد مع العميل فيه تعويض لو النسبة وقعت. ودايمًا أقل من الـ SLO، عشان الـ SLO ينبّهك قبل ما تدفع.

والإنذار الصح على «burn rate»: بنصرف الميزانية بسرعة قد إيه. لو بالمعدل ده هتخلص في يومين، صحّي حد. لو في ٣ أسابيع، تذكرة للصبح.`,
            when: "لما يبقى عندك مستخدمين بيدفعوا وعايز قرار واضح: نزوّد features ولا نصلّح استقرار.",
            mistakes: "SLO بـ ١٠٠٪. و SLI على CPU أو uptime السيرفر بدل تجربة اليوزر. وتحط SLO ومحدش بيبص عليه أو بيغيّر قراره بسببه. وتخلط SLO بـ SLA في الانترفيو."
          },
          lines: [
            "الهدف: ٩٩.٩٪.",
            "دقايق الشهر.",
            "الميزانية: ٤٣.٢ دقيقة وقوع كامل في الشهر.",
            "طلبات الشهر.",
            "اللي فشل منها.",
            "الـ SLI: نسبة النجاح الفعلية.",
            "صرفنا كام من الميزانية.",
            "٩٩.٩٢٥٪ نجاح، وصرفنا ٧٥٪ من الميزانية."
          ],
          sol: R`الحسبة لـ ٣٠ يوم (٤٣٢٠٠ دقيقة): ٩٩٪ = [[432.0]] دقيقة (٧.٢ ساعة)، و ٩٩.٩٪ = [[43.2]]، و ٩٩.٩٩٪ = [[4.3]] دقيقة بس. كل ٩ زيادة بتقسم الميزانية على ١٠، وده ليه ٩٩.٩٩٪ معناها إن deploy بايظ واحد في الشهر ممكن يخلّص الميزانية.

للوجات: الـ awk تحت بيعد الطلبات والـ 5xx من لوج Nginx بالشكل الافتراضي (الحقل التاسع هو الـ status). على لوج تجربة فيه ٤ طلبات منهم 502 واحد طبع [[total=4 5xx=1 SLI=75.000%]]. على لوج حقيقي لأسبوع المفروض تلاقي رقم زي [[99.9xx%]]. وقارنه بالـ SLO: لو ٩٩.٩٥٪ والـ SLO ٩٩.٩٪، يبقى صرفت نص الميزانية.

الأخطاء الشائعة: تحسب الـ 4xx كفشل (الـ 404 والـ 401 غالبًا غلطة العميل مش السيستم)، أو تعد طلبات الـ health check من الـ load balancer فتعلّي الـ SLI على الفاضي. ولو اللوج بصيغة مختلفة (JSON أو ALB)، رقم الحقل هيختلف: اطبع سطر واحد الأول وعدّ.`,
          solCode: R`for (const slo of [0.99, 0.999, 0.9999]) console.log(slo, (30 * 24 * 60 * (1 - slo)).toFixed(1));
// 0.99 432.0 / 0.999 43.2 / 0.9999 4.3
# من لوجات Nginx لأسبوع:
cat /var/log/nginx/access.log /var/log/nginx/access.log.1 | awk '{t++} $9>=500{f++} END{printf "total=%d 5xx=%d SLI=%.3f%%\n", t, f, 100*(1-f/t)}'`
        },
        {
          cmd: "incident response",
          title: "الموقع وقع: تعمل إيه بالترتيب",
          desc: R`الترتيب: اتأكد إن فيه مشكلة وحجمها، وقول للناس، ووقّف النزيف (rollback أو تعطيل feature) قبل ما تدوّر على السبب، والسبب بتدوّر عليه بعد ما الموقع يرجع.

ومحدش هيعرف إن الموقع وقع من غير uptime check من برا: حاجة (Uptime Kuma على سيرفر تاني، أو Better Stack، أو Route 53 health check) بتطلب [[/health]] كل دقيقة وتبعتلك لو فشل.`,
          example: R`curl -s -o /dev/null -w "%{http_code} %{time_total}s\n" https://myapp.example.com/health
aws ecs describe-services --cluster myapp --services api --query "services[0].deployments[].[status,taskDefinition,rolloutState]" --output table
aws logs tail /ecs/myapp-api --since 15m --filter-pattern ERROR
aws ecs update-service --cluster myapp --service api --task-definition myapp-api:41
aws ecs wait services-stable --cluster myapp --services api`,
          try: "اكتب runbook من ٥ سطور لمشروعك: تعرف منين إنه واقع، وتبص فين الأول، وإزاي ترجّع نسخة. وجرّبه فعلًا على staging: deploy بنسخة بايظة وبعدين رجّعها وانت بتحسب الوقت.",
          deep: {
            why: "وقت الحادثة الكل متوتر، وأسوأ حاجة ٣ ناس يعدّلوا على الإنتاج في نفس الوقت، أو حد يقعد ساعة يدوّر على السبب والموقع واقع والعملاء مش عارفين حاجة. خطوات ثابتة ومكتوبة بتقلل الوقت والغلط.",
            how: R`١. اكتشف: إنذار من الـ uptime check أو Sentry أو CloudWatch، مش من عميل. والـ health check يبقى من مكان تاني غير السيرفر نفسه، وإلا لو السيرفر وقع المراقب وقع معاه.

٢. قيّم: كل الناس ولا جزء؟ كل الـ endpoints ولا واحد؟ من إمتى؟ حصل deploy أو تغيير إعدادات قريب؟ أغلب الحوادث بتيجي بعد تغيير.

٣. نظّم: واحد incident commander بيقرر وبيكلّم الناس، والباقي بيشتغلوا. قناة واحدة للحادثة، وحد بيكتب timeline بالوقت. ورسالة للعملاء (status page) حتى لو «بنحقق».

٤. خفّف: rollback لآخر نسخة سليمة، أو feature flag، أو زوّد السيرفرات، أو اقفل الحاجة اللي بتضرب. في ECS: الـ task definition بتاعة النسخة اللي قبلها ([[:41]])، و [[wait services-stable]] بيستنى لحد ما النسخ الجديدة تبقى healthy.

٥. اتأكد إن الأرقام رجعت طبيعية، وبعدين اقفل الحادثة واكتب postmortem.

وعلى VPS نفس الخطوات بأوامر تانية: تاب التشخيص فيه السلّم الكامل و 502 و 504 و «الـ deploy كسر الموقع».`,
            when: "في كل حادثة، حتى الصغيرة. والتمرين عليها قبلها (game day) بيفرق جدًا.",
            mistakes: "تدوّر على الـ root cause والموقع واقع بدل ما ترجّع النسخة الأول. وكل واحد في الفريق يجرّب حل على الإنتاج في نفس الوقت. ومحدش يقول للعملاء. ومراقب الـ uptime على نفس السيرفر. ومفيش طريقة rollback مجرّبة أصلًا."
          },
          lines: [
            "الموقع بيرد؟ الكود والوقت.",
            "فيه deploy شغال أو فشل؟ النسخة الحالية والجديدة وحالة الـ rollout.",
            "الأخطاء في آخر ربع ساعة.",
            "rollback: رجّع الـ service للـ task definition رقم 41 (آخر نسخة سليمة).",
            "استنى لحد ما النسخ ترجع healthy."
          ],
          sol: R`runbook نموذجي من ٥ سطور (عدّله لمشروعك):

١. الكشف: uptime check من برا على [[/health]] كل دقيقة بينبّه على Telegram أو الإيميل، أو إنذار 5xx من CloudWatch. أول خطوة أأكّد بـ [[curl -w "%{http_code}"]].
٢. أبص فين الأول: هل فيه deploy في آخر ساعة؟ ([[describe-services]] أو تاريخ الـ releases). لو أيوه، ده المشتبه الأول.
٣. اللوج: [[aws logs tail ... --since 15m --filter-pattern ERROR]] أو [[docker compose logs --since 15m]].
٤. الرجوع: [[update-service]] بالـ task definition اللي قبلها (أو [[git revert]] و deploy)، ومتستناش لحد ما تفهم السبب.
٥. أبلّغ: رسالة قصيرة للفريق أو العملاء، وبعد ما يستقر أكتب postmortem.

على staging: المفروض تقيس ٣ أرقام: وقت الاكتشاف (من الـ deploy البايظ لحد الإنذار)، ووقت القرار، ووقت الرجوع ([[wait services-stable]] على ECS غالبًا دقايق). لو الرقم الكلي أكبر من ١٥ دقيقة، أكبر جزء فيه غالبًا الاكتشاف، مش الرجوع.

الغلطة الشائعة: الـ rollback يرجّع الكود بس، والـ migration الجديدة اللي نزلت معاه لسه موجودة، فالنسخة القديمة تقع برضه. عشان كده الـ migrations لازم تبقى backward compatible. وتانية: تقعد تصلّح في الإنتاج قدام الناس بدل ما ترجع الأول.`,
          solCode: R`aws ecs describe-services --cluster myapp --services api --query "services[0].deployments[].[status,taskDefinition,rolloutState]" --output table
aws ecs list-task-definitions --family-prefix myapp-api --sort DESC --max-items 3
aws ecs update-service --cluster myapp --service api --task-definition myapp-api:41
aws ecs wait services-stable --cluster myapp --services api`
        },
        {
          cmd: "postmortem",
          title: "بعد الحادثة: تكتب إيه عشان متتكررش",
          desc: R`الـ postmortem مستند قصير بعد كل حادثة مهمة فيه حصل إيه، وأثّر على مين وقد إيه، والـ timeline، والسبب الجذري، وليه متمسكش بدري، و action items بصاحب وتاريخ.

وهو «blameless»: السؤال «إيه في السيستم سمح للغلطة دي تعدّي؟» مش «مين غلط؟». لو الناس خافت هتخبّي الغلطات، ونفس الحادثة هترجع.`,
          example: R`# Postmortem: 502 على الـ API يوم 2026-09-12
Impact: 38 دقيقة، 12% من الطلبات فشلت، مفيش داتا ضاعت
Detection: إنذار الـ uptime بعد 4 دقايق (مش من عميل)
Timeline: 14:02 deploy v1.9 / 14:06 إنذار / 14:15 rollback / 14:40 رجع طبيعي
Root cause: migration عملت lock على جدول orders، والـ pool خلص
Why not caught: staging فيه 200 صف، والإنتاج 2 مليون
Action: migrations بـ CONCURRENTLY و lock_timeout (owner: Ali، قبل 09-20)
Action: اختبار الـ migrations على نسخة بحجم الإنتاج (owner: Mona، قبل 09-30)`,
          try: "اكتب postmortem لآخر مشكلة حصلت في مشروع من مشاريعك (حتى لو بسيطة، زي شهادة SSL خلصت). واسأل «ليه» ٥ مرات لحد ما توصل لحاجة في السيستم مش في شخص.",
          flag: "script",
          deep: {
            why: "من غير postmortem الحادثة بتتنسى في أسبوع ونفس السبب يرجع بعد شهرين. المستند بيحوّل الوجع لتغيير حقيقي: اختبار أو إنذار أو خطوة في الـ CI.",
            how: R`Impact بالأرقام: مدة، ونسبة، وعدد عملاء، وفلوس لو فيه. و Detection: عرفنا إزاي وبعد قد إيه؛ لو من عميل، ده في حد ذاته action item.

الـ Timeline بالدقيقة من المصادر (لوجات، ورسائل القناة)، مش من الذاكرة.

الـ Root cause بـ «5 whys»: ليه وقع؟ الـ pool خلص. ليه؟ الطلبات مستنية lock. ليه؟ migration قفلت الجدول. ليه عدّت؟ staging صغير. ليه؟ مفيش بيانات بحجم حقيقي. الإجابة الأخيرة هي اللي بتتصلّح.

الـ Action items قليلة ومحددة، كل واحد ليه صاحب وتاريخ وبيتتابع. «نبقى أحرص» مش action item. «الـ CI يرفض migration من غير lock_timeout» action item.

وبيتشارك مع الفريق كله. وشركات كبيرة بتنشر postmortems علني (Cloudflare و GitHub مثلًا)، والقراية فيها بتعلّمك أنماط كتير.`,
            when: "بعد أي حادثة أثّرت على اليوزرز أو كانت هتأثر. وفي خلال أيام، والتفاصيل لسه فاكرها.",
            mistakes: "postmortem بيدوّر على مين الغلطان. و action items كتير ومحدش مسؤول عنها فمبتتعملش. و root cause «خطأ بشري» ووقفت لحد هنا. وتكتبه بعد شهر من الذاكرة."
          },
          lines: [
            "الأثر بالأرقام: المدة والنسبة والداتا.",
            "عرفنا إزاي وبعد قد إيه.",
            "الأحداث بالوقت من المصادر.",
            "السبب الجذري التقني.",
            "ليه الاختبارات مكشفتهوش.",
            "تصليح بصاحب وتاريخ.",
            "تصليح تاني يمنع النوع ده كله."
          ],
          sol: R`مثال نموذجي لمشكلة بسيطة، عشان تشوف الـ «٥ ليه» بتوصل لفين:

المشكلة: الموقع طلّع تحذير SSL ساعتين. ليه؟ الشهادة خلصت. ليه؟ التجديد التلقائي فشل. ليه؟ certbot كان محتاج بورت 80 وأنا قفلته في الفايروول من شهرين. ليه محدش عرف؟ مفيش إنذار على فشل التجديد ولا على تاريخ الانتهاء. ليه؟ مفيش مراقبة للشهادات أصلًا. الـ Action هنا مش «أفتكر أجدد»، دي: uptime check بيفحص تاريخ الشهادة وينبّه قبل ١٤ يوم (owner و تاريخ)، وتجديد بـ DNS challenge مش محتاج بورت 80.

الـ postmortem الكويس لازم فيه: Impact بأرقام (مدة، نسبة، داتا ضاعت ولا لأ)، و Detection (عرفنا إزاي، ومن مين)، و Timeline بالدقايق، و Root cause في السيستم، و Actions كل واحدة ليها owner وتاريخ.

الغلطة الشائعة: توقف عند «ليه» الأولى أو التانية وتكتب «فلان نسي» أو «هنخلّي بالنا». لو الإجابة شخص، اسأل «ليه السيستم سمح إن النسيان ده يوقّع الموقع؟». وتانية: Actions من غير owner وتاريخ، ودي عمليًا مش هتتعمل.`
        }
      ]
    },
    {
      t: "OpenTelemetry والـ tracing",
      l: 3,
      n: "الطلب ده بطيء ليه؟ trace بيوريك رحلة الطلب خطوة خطوة بين الـ API والقاعدة والخدمات التانية، و OpenTelemetry الطريقة المحايدة اللي كل الأدوات بتفهمها",
      items: [
        {
          cmd: "trace و span",
          title: "trace و span و context propagation: رحلة طلب واحد",
          desc: R`الـ trace هو رحلة طلب واحد من أوله لآخره، ومكوّن من spans: كل span خطوة ليها اسم وبداية ومدة (استقبال الطلب، query على القاعدة، طلب لخدمة تانية)، وكل span ليه parent غير أول واحد. فبتشوف شجرة زي «الطلب ١٢٠٠ مللي، منهم ٩٥٠ في query واحدة».

عشان الـ trace يكمل بين خدمتين، لازم الـ trace id يتنقل معاه. ده اسمه context propagation، والمعيار W3C Trace Context: header اسمه [[traceparent]] شكله [[00-TRACE_ID-PARENT_SPAN_ID-01]]. الخدمة الأولى بتحطه في الطلب الطالع، والتانية بتقراه وتكمّل نفس الـ trace.

المثال ده خدمتين في ملف واحد (A بتكلّم B)، ولما يتشغّل بـ OpenTelemetry (الدرس الجاي) هتلاقي الاتنين بنفس الـ trace id، من غير ما تكتب سطر واحد يبعت الـ header.`,
          example: R`import http from "node:http";
import { trace } from "@opentelemetry/api";

const b = http.createServer((req, res) => {
  console.log("B got traceparent:", req.headers.traceparent);
  console.log("B active traceId:  ", trace.getActiveSpan()?.spanContext().traceId);
  res.end("ok");
});
b.listen(4000);

const a = http.createServer(async (req, res) => {
  console.log("A active traceId:  ", trace.getActiveSpan()?.spanContext().traceId);
  const r = await fetch("http://localhost:4000/stock");
  res.end(await r.text());
});
a.listen(3000, async () => {
  await fetch("http://localhost:3000/checkout");
  a.close(); b.close();
});`,
          try: R`احفظه [[two.mjs]] في فولدر فيه [[@opentelemetry/api]] وشغّله بـ [[node two.mjs]] عادي: هتشوف إيه؟ بعدين شغّله بملف [[instrumentation.mjs]] من الدرس الجاي: [[node --import ./instrumentation.mjs two.mjs]]، وقارن. وبعدين ابعت انت الـ header بإيدك: [[curl -H "traceparent: 00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01" localhost:3000]] (عدّل السكربت ميقفلش نفسه) وشوف الـ trace id اللي A طبعه.`,
          flag: "script",
          deep: {
            why: "اللوجات بتقولك إيه اللي حصل، والـ metrics بتقولك إن p95 عالي، بس محدش منهم بيقولك «الطلب ده بالذات بطيء عشان إيه». مع API و worker وخدمة دفع خارجية وقاعدة، الـ trace هو اللي بيوريك الوقت راح فين بالظبط، وده سؤال بيتسأل في أي incident.",
            how: R`الـ span فيه: [[traceId]] (١٦ byte، واحد لكل الرحلة)، و [[spanId]] (٨ bytes)، و [[parentSpanId]]، والاسم، والبداية والمدة، و [[kind]] (SERVER للطلب الداخل، CLIENT للطلب الطالع، INTERNAL لخطوة جوه الكود)، و attributes (زي [[http.route]] و [[db.system]])، و events (زي exception)، و status (OK أو ERROR).

الـ context propagation جوه الخدمة: OpenTelemetry بيحفظ الـ span الحالي في AsyncLocalStorage (درس [[AsyncLocalStorage]] في «تاب Backend بـ Node»)، فأي span جديد في نفس الطلب، حتى بعد await، بيعرف الـ parent بتاعه لوحده. عشان كده [[trace.getActiveSpan()]] بيشتغل في أي حتة.

وبين الخدمات: الـ instrumentation بتاع HTTP client (هنا [[fetch]]) بيعمل span من نوع CLIENT ويحط [[traceparent]] في الـ headers، والـ instrumentation بتاع HTTP server في B بيقراه ويعمل span جديد parent بتاعه هو الـ CLIENT span. نفس الفكرة بتتعمل يدويًا مع queues: تحط الـ context في الـ job data وتطلعه في الـ worker.

الـ [[traceparent]]: [[00]] الإصدار، وبعدين الـ trace id، وبعدين id الـ span الأب، وآخر حاجة flags ([[01]] = sampled، يعني الـ trace ده بيتسجّل). وفيه [[tracestate]] اختياري لبيانات خاصة بالـ vendor.

sampling: مش لازم تسجّل كل trace. الأشهر: head sampling (تقرر في أول الطلب، مثلًا ١٠٪)، والقرار بيتنقل مع الـ flags فكل الخدمات تسجّل نفس الـ traces. و tail sampling (في الـ collector، بعد ما الـ trace يخلص: خلي كل اللي فيه error أو أبطأ من ثانية).`,
            when: "أول ما يبقى عندك أكتر من خدمة، أو API بيكلّم APIs خارجية وقاعدة و cache، أو سؤال «ليه ده بطيء» مبيتجاوبش من اللوجات.",
            mistakes: R`تفتكر إن الـ trace id هو الـ request id: ممكن يبقوا نفس الحاجة، بس الـ trace بيعدّي على كل الخدمات والـ request id غالبًا محلي (الدرس الجاي بيربطهم). وتعمل propagation بـ header مخترع ([[x-trace]]) فمفيش أداة تفهمه. وتنسى الـ propagation في الـ queues فالـ worker يبدأ trace جديد مقطوع. وفي الانترفيو: «إيه الفرق بين logs و metrics و traces؟» اللوج حدث واحد بالتفصيل، والـ metric رقم متجمّع على وقت، والـ trace رحلة طلب واحد بين المكونات.`
          },
          lines: [
            "سيرفر HTTP من Node.",
            "الـ API بتاع OpenTelemetry (بيرجّع no-op لو مفيش SDK).",
            "خدمة B.",
            "اطبع الـ header اللي وصل من A.",
            "اطبع الـ trace id اللي B شغالة فيه.",
            "رد.",
            "قفلة.",
            "B على ٤٠٠٠.",
            "خدمة A.",
            "اطبع الـ trace id بتاع الطلب في A.",
            "A بتكلّم B بـ fetch (هنا الـ header بيتحط لوحده).",
            "رجّع رد B.",
            "قفلة.",
            "A على ٣٠٠٠، ولما تشتغل:",
            "ابعت طلب واحد لـ A.",
            "واقفل الاتنين عشان السكربت يخلص.",
            "قفلة."
          ],
          sol: R`بـ [[node two.mjs]] من غير SDK: التلات سطور [[undefined]]، لأن [[@opentelemetry/api]] من غيره بيرجّع no-op، ومحدش بيحط [[traceparent]].

بـ [[instrumentation.mjs]] (فيه الـ loader hook، الدرس الجاي) الناتج زي:

[[A active traceId:   2fa1034af6bbe4fb4302073471963f88]]
[[B got traceparent: 00-2fa1034af6bbe4fb4302073471963f88-3f5366a1e5111f2d-01]]
[[B active traceId:   2fa1034af6bbe4fb4302073471963f88]]

(ومعاهم الـ spans نفسها مطبوعة كـ objects من الـ console exporter.) نفس الـ trace id في A و B، والجزء الأوسط في الـ header هو الـ span الـ CLIENT اللي fetch عمله في A.

ولو بعت الـ header بإيدك بالـ curl، A هيطبع [[4bf92f3577b34da6a3ce929d0e0e4736]]: كمّل الـ trace اللي جاي من برا بدل ما يبدأ واحد جديد، وده بالظبط اللي بيحصل لما gateway أو frontend بيبدأ الـ trace.

الغلطة الشائعة: A بيطبع [[undefined]] و B بيطبع traceparent سليم. ده معناه إن fetch اتعمله instrument بس سيرفر [[node:http]] لأ، لأن الملف ESM وشغّلته من غير الـ loader hook (الدرس الجاي).`
        },
        {
          cmd: "OpenTelemetry في Node",
          title: "auto-instrumentation في Node من غير ما تلمس الكود",
          desc: R`OpenTelemetry (OTel) معيار مفتوح ومحايد: بتعمل instrument للكود مرة واحدة، وتبعت الـ traces لأي backend (Jaeger أو Grafana Tempo أو Honeycomb أو Datadog أو Sentry) من غير ما تغيّر الكود.

في Node: ملف [[instrumentation.mjs]] بيشغّل [[NodeSDK]] مع [[getNodeAutoInstrumentations()]]، وده بيعمل patch لـ http و express و pg و redis و fetch وغيرهم، فكل طلب وكل query يطلع span لوحده. والملف لازم يتحمّل قبل أي حاجة تانية: [[node --import ./instrumentation.mjs server.mjs]].

هنا بنطبع الـ spans على الشاشة بـ [[ConsoleSpanExporter]] عشان تشوفها. وفي الإنتاج بتشيله وتبعت بـ OTLP (درس [[OTLP و backend]]).`,
          example: R`import { register } from "node:module";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { ConsoleSpanExporter, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";

register("@opentelemetry/instrumentation/hook.mjs", import.meta.url);

const sdk = new NodeSDK({
  resource: resourceFromAttributes({ [ATTR_SERVICE_NAME]: "orders-api" }),
  spanProcessors: [new SimpleSpanProcessor(new ConsoleSpanExporter())],
  instrumentations: [getNodeAutoInstrumentations({ "@opentelemetry/instrumentation-fs": { enabled: false } })],
});
sdk.start();
process.on("SIGTERM", () => sdk.shutdown().finally(() => process.exit(0)));`,
          try: R`في فولدر تجربة: [[npm i express @opentelemetry/api @opentelemetry/sdk-node @opentelemetry/sdk-trace-node @opentelemetry/auto-instrumentations-node @opentelemetry/resources @opentelemetry/semantic-conventions]]. احفظ الملف ده [[instrumentation.mjs]]، واعمل [[app.mjs]] فيه Express بـ route [[/orders/:id]]. شغّل [[node --import ./instrumentation.mjs app.mjs]] وابعت [[curl localhost:3000/orders/7]]. كام span طلعوا؟ وإيه اسم الـ span اللي [[parentSpanContext]] بتاعه [[undefined]]؟`,
          flag: "script",
          deep: {
            why: "إنك تكتب span بإيدك لكل route وكل query مستحيل ومحدش هيحافظ عليه. الـ auto-instrumentation بيدّيك ٨٠٪ من القيمة من أول يوم: كل طلب HTTP وكل query وكل طلب خارجي بمدته. ولأنه معيار، لو غيّرت الـ backend من Jaeger لـ Honeycomb بتغيّر متغير بيئة بس.",
            how: R`[[NodeSDK]] بيجمع ٣ حاجات: resource (مين أنا: [[service.name]] وهو أهم attribute، ومن غيره الخدمة بتظهر [[unknown_service:node]])، و span processor + exporter (الـ spans تروح فين)، و instrumentations (إيه اللي يتعمله patch).

الـ instrumentation بيشتغل عن طريق إنه يلف الموديول لما يتحمّل. عشان كده الملف لازم يتحمّل قبل [[express]] و [[pg]]: لو عملت import لـ express الأول، هو اتحمّل من غير patch. ده سبب [[--import]] بدل ما تعمل import من جوه [[server.mjs]].

ESM: الـ patch القديم بيشتغل مع [[require]] بس. لو كودك [[import]] (ملفات [[.mjs]] أو [[type: module]])، لازم loader hook. السطر [[register("@opentelemetry/instrumentation/hook.mjs", ...)]] بيسجّله من جوه الملف، وده زي إنك تكتب [[--experimental-loader=@opentelemetry/instrumentation/hook.mjs]] في أمر التشغيل. من غيره هتلاقي حاجات اتعملها instrument (زي fetch وحاجات بتتحمّل بـ require من جوه مكتبات) وحاجات لأ (زي [[node:http]] اللي انت عامله import مباشرة).

[[SimpleSpanProcessor]] بيبعت كل span أول ما يخلص، ده كويس للتجربة. في الإنتاج [[BatchSpanProcessor]] (الافتراضي لو استخدمت [[traceExporter]]) بيجمّع ويبعت دفعات، أخف بكتير.

[[instrumentation-fs]] بيطلّع span لكل قراية ملف، ودي ضوضاء، فأغلب الناس بتقفله. وفيه طريقة من غير ملف خالص: [[node --import @opentelemetry/auto-instrumentations-node/register app.js]] والإعدادات كلها من متغيرات البيئة ([[OTEL_SERVICE_NAME]] وغيره).

[[sdk.shutdown()]] مع SIGTERM بيبعت الـ spans اللي لسه في الـ buffer قبل ما الـ process يموت، وإلا آخر ثواني قبل كل deploy تضيع.`,
            when: "أي API في الإنتاج بيكلّم قاعدة أو خدمات تانية. ابدأ بالـ auto-instrumentation، وضيف custom spans بس في الأماكن اللي محتاج تفهمها أكتر.",
            mistakes: R`تعمل [[import "./instrumentation.mjs"]] في أول [[server.mjs]] بدل [[--import]]: في ESM الـ imports بتتحمّل قبل ما أي كود يشتغل، فممكن express يتحمّل قبل الـ patch. وتنسى الـ loader hook مع ESM وتستغرب إن نص الـ spans ناقصة. ومن غير [[service.name]]. و [[ConsoleSpanExporter]] في الإنتاج (اللوجات هتتملي). وتسيب [[instrumentation-fs]] شغال.`
          },
          lines: [
            "register عشان نسجّل loader hook لموديولات ESM.",
            "الـ SDK اللي بيربط كل حاجة.",
            "exporter بيطبع على الشاشة، و processor بيبعت كل span أول ما يخلص.",
            "كل الـ instrumentations الجاهزة (http و express و pg و redis و fetch...).",
            "عشان نعرّف الخدمة.",
            "اسم الـ attribute القياسي service.name.",
            "من غير الـ hook ده، الموديولات اللي بتعملها import مش هتتعمل instrument.",
            "الإعدادات.",
            "اسم الخدمة (أهم attribute).",
            "الـ spans تتطبع على الشاشة فورًا.",
            "كل الـ instrumentations ماعدا fs (ضوضاء).",
            "قفلة.",
            "ابدأ (قبل ما أي كود تاني يتحمّل).",
            "مع الإيقاف: ابعت اللي فاضل وبعدين اقفل."
          ],
          sol: R`مع [[curl localhost:3000/orders/7]] هتلاقي كذا object مطبوعين، كلهم بنفس الـ [[traceId]]:

- span اسمه [[GET /orders/:id]] من [[@opentelemetry/instrumentation-http]]، و [[kind: 1]] (SERVER)، و [[parentSpanContext: undefined]]، يعني هو الـ root. وفيه attributes زي [[http.request.method]] و [[url.path]] و [[http.response.status_code: 200]].
- spans من [[instrumentation-express]] و [[instrumentation-router]] زي [[request handler - /orders/:id]]، وكمان span للـ middleware اللي Express بيحطه من جوه، والـ parent بتاعهم هو الـ span اللي فوقه.

وكلهم فيهم [[service.name: 'orders-api']] في الـ resource. والترتيب على الشاشة بيبقى من الأصغر للأكبر، لأن كل span بيتطبع لما يخلص، والـ root بيخلص آخر واحد.

الغلطة الشائعة: الـ root span اسمه [[GET]] بس من غير الـ route، ومفيش spans لـ express خالص. ده معناه إن express مكنش عليه instrument، غالبًا عشان الـ hook مش متسجّل أو الملف اتحمّل بعد express. ولو مفيش ولا span، يبقى نسيت [[--import]] أصلًا.`,
          solCode: R`// app.mjs
import express from "express";
const app = express();
app.get("/orders/:id", (req, res) => res.json({ id: req.params.id, total: 250 }));
app.listen(3000, () => console.log("listening on 3000"));

// التشغيل:
// node --import ./instrumentation.mjs app.mjs
// curl localhost:3000/orders/7`
        },
        {
          cmd: "custom span",
          title: "span بإيدك حوالين query أو API خارجي",
          desc: R`الـ auto-instrumentation بيشوف الـ HTTP والـ driver بتاع القاعدة، بس مش بيعرف إن «حساب الشحن» أو «تجهيز الفاتورة» خطوة ليها معنى. هنا بتعمل span بإيدك: [[tracer.startActiveSpan(name, fn)]] بيعمل span ويخليه الـ active جوه [[fn]]، فأي span يطلع جوه (query مثلًا) بيبقى ابنه.

القاعدة: [[span.end()]] في [[finally]] دايمًا، ولو حصل خطأ [[span.recordException(err)]] و [[setStatus]] بـ ERROR، عشان الـ backend يلوّن الـ span بالأحمر وتقدر تفلتر عليه.`,
          example: R`import express from "express";
import { trace, SpanStatusCode } from "@opentelemetry/api";

const tracer = trace.getTracer("orders-api");
const app = express();

async function findOrder(id) {
  return tracer.startActiveSpan("db.findOrder", async (span) => {
    span.setAttribute("order.id", id);
    try {
      await new Promise((r) => setTimeout(r, 40));
      if (id === "0") throw new Error("order not found");
      return { id, total: 250 };
    } catch (err) {
      span.recordException(err);
      span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
      throw err;
    } finally {
      span.end();
    }
  });
}

app.get("/orders/:id", async (req, res) => {
  const traceId = trace.getActiveSpan()?.spanContext().traceId;
  try {
    res.json(await findOrder(req.params.id));
  } catch {
    res.status(404).json({ error: "not found", traceId });
  }
});
app.listen(3000);`,
          try: R`شغّل ده بـ [[instrumentation.mjs]] من الدرس اللي فات، وابعت [[curl localhost:3000/orders/7]] و [[curl localhost:3000/orders/0]]. دوّر في الناتج على [[db.findOrder]] في الحالتين: قارن [[status]] و [[events]] و [[duration]] و [[parentSpanContext]]. وبعدين ضيف span تاني اسمه [[shipping.quote]] حوالين [[fetch]] لأي API خارجي (زي [[https://httpbin.org/delay/1]]) وشوف إن الـ fetch نفسه طلع span ابن ليه.`,
          flag: "script",
          deep: {
            why: "الـ auto-instrumentation هيقولك إن الطلب أخد ٢ ثانية وإن فيه ٤٠ query. الـ custom span هو اللي بيقولك إن الـ ٤٠ دول كلهم جوه «حساب الخصومات»، وإن الخطوة دي بالذات هي اللي بطيئة للطلبات اللي فيها كوبون. وده الفرق بين trace بيوريك أرقام و trace بيوريك قصة.",
            how: R`[[trace.getTracer("orders-api")]] بيجيب tracer باسم (بيظهر كـ [[instrumentationScope]]). ولو مفيش SDK شغال، الـ tracer بيبقى no-op والكود يشتغل عادي من غير أي تكلفة تقريبًا. فالمكتبات بتعتمد على [[@opentelemetry/api]] بس، والتطبيق هو اللي بيقرر يشغّل الـ SDK.

[[startActiveSpan(name, fn)]] بيعمل span ابن للـ span الحالي، ويخليه active جوه [[fn]]، ويرجّع اللي [[fn]] رجّعته (هنا Promise). فيه كمان [[startSpan]] من غير ما يبقى active، وده بتستخدمه لو مش عايز spans تانية تتعلق تحته.

attributes: خليها أسماء ثابتة وقيم مفيدة للبحث ([[order.id]] و [[coupon.code]] و [[items.count]]). ولأسماء معروفة استخدم semantic conventions ([[db.system]] و [[http.request.method]]) عشان الأدوات تفهمها.

[[recordException]] بيضيف event اسمه [[exception]] فيه النوع والرسالة والـ stack. و [[setStatus(ERROR)]] حاجة تانية: هو اللي بيعلّم الـ span إنه فشل. محتاج الاتنين.

[[span.end()]] لازم في [[finally]]: span مبيخلصش عمره ما بيتبعت، والـ trace يبان ناقص. ولو الـ span بيلف حاجة بترجع Promise، الـ end يبقى بعد الـ await، مش قبله.

الـ trace id في رد الخطأ: اليوزر أو الـ support يبعتلك الرقم، وتلاقي الـ trace كله في ثانية.`,
            when: "حوالي أي خطوة بيزنس مهمة (checkout، حساب، توليد PDF)، وأي API خارجي أو queue مالهوش instrumentation جاهز، وأي حاجة بتشك إنها بطيئة.",
            mistakes: R`تنسى [[span.end()]] في مسار الخطأ فالـ span ميتبعتش. و [[recordException]] من غير [[setStatus]] فالـ span يبان ناجح. و span لكل iteration في loop فيها ١٠ آلاف عنصر. و attributes فيها إيميلات أو توكنات أو الـ body كله (الـ traces بتتخزن عند طرف تالت غالبًا). وأسماء spans ديناميكية ([[db.findOrder.8812]]) بدل اسم ثابت و attribute.`
          },
          lines: [
            "Express.",
            "الـ API: جيب tracer، و SpanStatusCode للأخطاء.",
            "tracer باسم الخدمة.",
            "التطبيق.",
            "دالة القاعدة (هنا مجرد تأخير يمثّل query).",
            "span جديد اسمه db.findOrder، و active جوه الدالة.",
            "attribute عشان تقدر تدوّر بالـ id.",
            "حاول:",
            "مكان الـ query الحقيقية (٤٠ مللي).",
            "id صفر = مش موجود.",
            "رجّع الطلب.",
            "لو فشل:",
            "سجّل الـ exception كـ event جوه الـ span.",
            "وعلّم الـ span إنه ERROR.",
            "ورجّع الخطأ لفوق.",
            "في كل الحالات:",
            "اقفل الـ span (من غيرها مش هيتبعت).",
            "قفلة.",
            "قفلة startActiveSpan.",
            "قفلة الدالة.",
            "الـ route.",
            "الـ trace id بتاع الطلب ده.",
            "حاول:",
            "رجّع الطلب.",
            "لو فشل:",
            "404 ومعاه الـ trace id عشان الـ support يدوّر بيه.",
            "قفلة.",
            "قفلة الـ route.",
            "شغّل."
          ],
          sol: R`لـ [[/orders/7]]: span اسمه [[db.findOrder]]، فيه [[attributes: { 'order.id': '7' }]] و [[status: { code: 0 }]] و [[events: []]] و [[duration]] حوالي [[40000]] (بالمايكروثانية، يعني ٤٠ مللي). و [[parentSpanContext]] بتاعه بيشاور على span الـ express [[request handler - /orders/:id]]، يعني اتعلق تحت الطلب لوحده.

لـ [[/orders/0]]: الرد [[{"error":"not found","traceId":"..."}]]، و [[db.findOrder]] فيه [[status: { code: 2, message: 'order not found' }]] (2 = ERROR)، و [[events]] فيه event اسمه [[exception]] ومعاه [[exception.type: 'Error']] و [[exception.message]] و [[exception.stacktrace]]. والـ [[traceId]] اللي في الرد هو نفسه اللي في الـ spans.

ولما تضيف [[shipping.quote]] حوالين fetch، هتلاقي span [[GET]] من نوع CLIENT (kind 2) من [[instrumentation-undici]] والـ parent بتاعه [[shipping.quote]]، ومدته حوالي ثانية.

الغلطة الشائعة: [[db.findOrder]] ظاهر كـ root لوحده ([[parentSpanContext: undefined]]) بـ trace id مختلف عن الطلب. ده معناه إن الـ context ضاع، غالبًا لأنك استخدمت [[startSpan]] بدل [[startActiveSpan]] في مكان، أو عملت الـ span برا الطلب.`,
          solCode: R`async function shippingQuote(city) {
  return tracer.startActiveSpan("shipping.quote", async (span) => {
    span.setAttribute("shipping.city", city);
    try {
      const r = await fetch("https://httpbin.org/delay/1");
      span.setAttribute("http.response.status_code", r.status);
      return 50;
    } catch (err) {
      span.recordException(err);
      span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
      throw err;
    } finally {
      span.end();
    }
  });
}`
        },
        {
          cmd: "trace id في اللوج",
          title: "trace id جنب request id في كل سطر لوج",
          desc: R`اللوج بيقولك إيه اللي حصل، والـ trace بيقولك الوقت راح فين. لما يبقى في كل سطر لوج [[trace_id]]، تقدر من سطر خطأ تفتح الـ trace بتاعه، ومن span بطيء تجيب اللوجات بتاعته.

مع pino: الـ auto-instrumentation فيه [[instrumentation-pino]] بيحط [[trace_id]] و [[span_id]] و [[trace_flags]] في كل سطر لوحده. والـ request id بتاعك (من [[x-request-id]] أو UUID) بتحطه بـ [[logger.child]] زي ما هو، وترجّعه في الـ response header. الاتنين مع بعض: الـ request id اللي العميل شايفه، والـ trace id اللي أدوات الـ tracing بتفهمه.`,
          example: R`import express from "express";
import pino from "pino";
import { randomUUID } from "node:crypto";

const logger = pino();
const app = express();

app.use((req, res, next) => {
  req.id = req.get("x-request-id") ?? randomUUID();
  res.set("x-request-id", req.id);
  req.log = logger.child({ requestId: req.id });
  next();
});

app.get("/orders/:id", (req, res) => {
  req.log.info({ orderId: req.params.id }, "loading order");
  res.json({ ok: true });
});

const server = app.listen(3000, async () => {
  await fetch("http://localhost:3000/orders/7", { headers: { "x-request-id": "req-abc-123" } });
  server.close();
});`,
          try: R`سطّب [[pino]] جنب باقي الحاجات، وشغّل الملف مرتين: [[node logs.mjs]] من غير OpenTelemetry، و [[node --import ./instrumentation.mjs logs.mjs]] معاه (غيّر الـ exporter لواحد ساكت أو سيب الـ console). قارن سطر [[loading order]] في الحالتين. وبعدين ضيف middleware بيحط الـ trace id في header اسمه [[x-trace-id]] في الرد.`,
          flag: "script",
          deep: {
            why: "في incident، اليوزر بيبعتلك screenshot فيها request id أو وقت. من غير ربط، بتدوّر في اللوجات بالوقت، وبعدين تحاول تلاقي الـ trace بالوقت برضه، وممكن تلاقي ١٠٠ طلب في نفس الثانية. مع [[trace_id]] في اللوج، Grafana (Loki مع Tempo) أو Datadog أو Honeycomb بيدّوك زرار من سطر اللوج للـ trace على طول.",
            how: R`الـ request id: درس [[AsyncLocalStorage]] في «تاب Backend بـ Node» بيشرح إزاي يوصل لكل سطر لوج من غير ما تعدّيه لكل دالة، وهنا بنستخدم أبسط طريقة: [[req.log]] child logger. وخد الـ [[x-request-id]] لو جاي من برا (من Nginx أو load balancer أو frontend) عشان تربط لحد أول نقطة.

الـ trace id: [[instrumentation-pino]] بيلف pino ويضيف الحقول دي من الـ span الـ active مع كل سطر. ولو مش بتستخدم pino أو عايز تتحكم بنفسك:
[[pino({ mixin() { const s = trace.getActiveSpan(); return s ? { trace_id: s.spanContext().traceId } : {}; } })]].

الأسماء: الـ instrumentation بيكتب [[trace_id]] و [[span_id]] (بـ underscore)، ودي الأسماء اللي أغلب الأدوات بتدوّر عليها.

ممكن تخلي الـ request id هو الـ trace id نفسه (ترجّع الـ trace id في [[x-request-id]])، فيبقى رقم واحد. بس لو فيه gateway قبلك بيعمل request id بصيغته، سيب الاتنين جنب بعض.

و OpenTelemetry عنده logs signal كمان: تبعت اللوجات نفسها بـ OTLP لنفس الـ backend، وهي مربوطة بالـ trace لوحدها. بس JSON على stdout مع trace_id لسه أبسط وشغال مع أي حاجة.`,
            when: "من أول يوم تشغّل فيه tracing. التكلفة سطر، والفايدة إن كل لوج بقى لينك للـ trace.",
            mistakes: R`تعمل request id جديد في كل خدمة فمش بتقدر تربط. وتثق في [[x-request-id]] من برا من غير حد لطوله أو شكله (ممكن حد يحط فيه نص طويل أو سطر جديد يلخبط اللوج). وتلوج برا الطلب ([[setInterval]] أو worker) وتتوقع trace_id: مفيش span active هناك، فلازم تعمل span للـ job. وفي الانترفيو: «إزاي تتبع طلب واحد بين ٣ خدمات؟» الإجابة: context propagation بـ traceparent، و trace_id في كل لوج، وأداة tracing.`
          },
          lines: [
            "Express.",
            "pino: logger بيطبع JSON.",
            "لتوليد request id.",
            "logger واحد للتطبيق.",
            "التطبيق.",
            "middleware على كل طلب.",
            "خد الـ request id من برا لو موجود، أو اعمل واحد.",
            "رجّعه في الرد عشان العميل يقدر يبعتهولك.",
            "child logger فيه الـ request id في كل سطر.",
            "كمّل.",
            "قفلة.",
            "route.",
            "سطر لوج (هنا الـ instrumentation بيضيف trace_id).",
            "رد.",
            "قفلة.",
            "شغّل، ولما يشتغل:",
            "ابعت طلب واحد بـ request id معروف.",
            "واقفل.",
            "قفلة."
          ],
          sol: R`من غير OpenTelemetry:

[[{"level":30,...,"requestId":"req-abc-123","orderId":"7","msg":"loading order"}]]

ومعاه:

[[{"level":30,...,"requestId":"req-abc-123","trace_id":"c0292ceda7cb1194ca407f5b679ae214","span_id":"e81daa6cf4e50c9f","trace_flags":"01","orderId":"7","msg":"loading order"}]]

نفس السطر، بس زاد عليه [[trace_id]] و [[span_id]] و [[trace_flags]] من غير ما تغيّر ولا سطر في الكود. والـ [[trace_id]] ده نفسه اللي هتلاقيه في الـ spans.

للـ header: middleware بعد الـ instrumentation يكتب [[res.set("x-trace-id", trace.getActiveSpan()?.spanContext().traceId)]]، و [[curl -i]] يوريك الاتنين: [[x-request-id: req-abc-123]] و [[x-trace-id: ...]].

الغلطة الشائعة: مفيش [[trace_id]] في السطر حتى مع [[--import]]. ده غالبًا لأن pino اتحمّل قبل الـ instrumentation، أو [[instrumentation-pino]] مقفول، أو اللوج بيتكتب برا أي span.`,
          solCode: R`import { trace } from "@opentelemetry/api";

app.use((req, res, next) => {
  const traceId = trace.getActiveSpan()?.spanContext().traceId;
  if (traceId) res.set("x-trace-id", traceId);
  next();
});`
        },
        {
          cmd: "OTLP و backend",
          title: "ابعت الـ traces لـ Jaeger أو Tempo أو Honeycomb بـ OTLP",
          desc: R`OTLP هو البروتوكول بتاع OpenTelemetry لبعت الـ traces والـ metrics واللوجات، على HTTP بورت 4318 ([[/v1/traces]]) أو gRPC بورت 4317. وأي backend حديث بيستقبله: Jaeger (open source للتجربة والإنتاج الصغير)، و Grafana Tempo (مع Grafana، و Grafana Cloud فيه خطة مجانية)، و Honeycomb، و Datadog، و Sentry.

الحلو إن الإعدادات كلها متغيرات بيئة، فالكود هو هو والـ backend يتغير: [[OTEL_SERVICE_NAME]] و [[OTEL_EXPORTER_OTLP_ENDPOINT]] و [[OTEL_EXPORTER_OTLP_HEADERS]] (للمفاتيح). وفي الإنتاج غالبًا بتبعت لـ OpenTelemetry Collector جنب التطبيق، وهو يبعت للـ backend.`,
          example: R`docker run -d --name jaeger -p 16686:16686 -p 4318:4318 jaegertracing/jaeger:latest
export OTEL_SERVICE_NAME=orders-api
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318
export OTEL_METRICS_EXPORTER=none
export OTEL_TRACES_SAMPLER=parentbased_traceidratio OTEL_TRACES_SAMPLER_ARG=0.2
node --import ./instrumentation.prod.mjs two.mjs
curl -s localhost:16686/api/v3/services
# Honeycomb بدل Jaeger: نفس الكود، متغيرين بس
export OTEL_EXPORTER_OTLP_ENDPOINT=https://api.honeycomb.io
export OTEL_EXPORTER_OTLP_HEADERS="x-honeycomb-team=YOUR_API_KEY"`,
          try: R`اعمل [[instrumentation.prod.mjs]]: نسخة من [[instrumentation.mjs]] من غير [[spanProcessors]] ولا الـ console exporter (فالـ SDK يقرا الـ exporter من البيئة ويستخدم OTLP)، وضيف سطر [[beforeExit]] (الملف كامل في الحل). شغّل Jaeger بـ Docker، ونفّذ [[two.mjs]] من أول درس بالمتغيرات دي من غير سطر الـ sampler. افتح [[http://localhost:16686]]، واختار [[orders-api]]، وافتح آخر trace: كام span؟ ومين جوه مين؟ بعدين رجّع الـ sampler بـ [[0.2]] وشغّل ١٠ مرات: كام trace ظهر؟`,
          deep: {
            why: "الـ console exporter للتعلم بس. القيمة الحقيقية في شاشة بتوريك الـ traces كـ waterfall، وتدوّر فيها بـ «كل الطلبات على /checkout اللي أبطأ من ثانية امبارح». ولأن OTLP معيار، مش مربوط بـ vendor: تبدأ بـ Jaeger ببلاش على جهازك أو VPS، وتنقل لـ Grafana Cloud أو Honeycomb بتغيير متغيرين.",
            how: R`لما [[NodeSDK]] ميبقاش معاه [[traceExporter]] ولا [[spanProcessors]]، بيقرا [[OTEL_TRACES_EXPORTER]] (الافتراضي [[otlp]]) و [[OTEL_EXPORTER_OTLP_ENDPOINT]] ويبعت على [[ENDPOINT/v1/traces]] بـ [[BatchSpanProcessor]]. وفي النسخ الحالية بيبعت metrics كمان على [[/v1/metrics]] لو مقفلتهاش بـ [[OTEL_METRICS_EXPORTER=none]]، فلو الـ backend بتاعك traces بس، اقفلها عشان متبعتش ترافيك على الفاضي.

الـ batch بيتبعت كل كام ثانية. سيرفر شغال على طول مش فارق معاه، بس script بيخلص في ثانية (زي [[two.mjs]]) هيقفل قبل ما يبعت، عشان كده [[beforeExit]] بيعمل [[shutdown()]] (وده بيبعت اللي في الـ buffer). والـ [[catch]] مهمة: من غيرها، لو الـ backend مش شغال، الـ shutdown بيرمي خطأ والـ process يقع بـ unhandled rejection.

الـ protocol: [[OTEL_EXPORTER_OTLP_PROTOCOL]] ممكن [[http/protobuf]] (الافتراضي في Node) أو [[http/json]] أو [[grpc]] (على 4317 ومحتاج exporter تاني).

الـ backends: Jaeger v2 image واحد فيه الاستقبال والتخزين في الرام والـ UI على 16686، ممتاز للتجربة وللـ dev (وللإنتاج بتوصله بـ storage). Grafana Tempo بيخزّن traces رخيص على object storage، وبيتعرض في Grafana جنب Prometheus و Loki، وفيه image اسمه [[grafana/otel-lgtm]] فيه الكل للتجربة. Honeycomb و Datadog خدمات مدفوعة (مع خطط مجانية محدودة) وبتاخد OTLP مباشرة بمفتاح في header.

الـ Collector: برنامج منفصل (container) بيستقبل OTLP من كل خدماتك، ويعمل batch و retry، ويشيل بيانات حساسة، ويعمل tail sampling، ويبعت لـ backend واحد أو أكتر. التطبيق يبعت لـ [[http://otel-collector:4318]] بس، والمفاتيح في الـ collector مش في كل خدمة.

الـ sampling: [[parentbased_traceidratio]] بـ [[0.2]] معناها: لو الطلب جاي بـ traceparent، اتبع قرار الأب (عشان الـ trace ميتقطعش)، ولو إنت الأول، سجّل ٢٠٪ بس. وده مهم لما الترافيك يكبر، لأن الـ backends بتحاسب بعدد الـ spans.`,
            when: "Jaeger على جهازك أو في docker compose بتاع الـ dev من أول ما تضيف OTel. وفي الإنتاج: Grafana (Tempo) لو عندك Prometheus و Grafana أصلًا، أو SaaS لو مش عايز تدير storage.",
            mistakes: R`[[OTEL_EXPORTER_OTLP_ENDPOINT]] فيه [[/v1/traces]] في الآخر، فالـ SDK يضيفها تاني ويبعت لـ [[/v1/traces/v1/traces]] (لو عايز مسار كامل استخدم [[OTEL_EXPORTER_OTLP_TRACES_ENDPOINT]]). وتبعت لبورت 4317 (gRPC) بـ exporter HTTP. ومفتاح Honeycomb في الكود أو في الـ frontend. و sampling ١٠٠٪ على ترافيك كبير والفاتورة تنفجر. وتنسى [[sdk.shutdown()]] فالـ batch الأخير يضيع مع كل restart.`
          },
          lines: [
            "Jaeger v2: الـ UI على 16686، واستقبال OTLP HTTP على 4318.",
            "اسم الخدمة.",
            "ابعت الـ traces هنا (الـ SDK بيضيف /v1/traces).",
            "متبعتش metrics (Jaeger بياخد traces بس).",
            "سجّل ٢٠٪ من الـ traces الجديدة، واتبع قرار الأب لو جاي من خدمة تانية.",
            "شغّل بملف الإنتاج (مفيهوش exporter في الكود، فبياخده من البيئة).",
            "اتأكد إن Jaeger شاف الخدمة.",
            "نفس الكلام لـ Honeycomb: الـ endpoint بتاعهم...",
            "...والمفتاح في header."
          ],
          sol: R`بعد التشغيل، [[curl -s localhost:16686/api/v3/services]] يرجّع حاجة زي [[{"services":["orders-api","jaeger"]}]]. (لو رجّع فاضي على طول بعد التشغيل، استنى ثانيتين: الـ batch بيتبعت كل شوية.)

في الـ UI، الـ trace بتاع [[two.mjs]] فيه ٤ spans بنفس الـ trace id، كلهم اسمهم [[GET]]: الـ fetch الأولاني (CLIENT، الـ root، مثلًا ٢٨ مللي)، وتحته A (SERVER)، وتحته الـ fetch من A لـ B (CLIENT)، وتحته B (SERVER، أقصر واحد). الـ waterfall بيوريك إن كل span جوه اللي فوقه.

مع الـ sampler بـ 0.2 و ١٠ تشغيلات: هتلاقي حوالي ٢ traces (ممكن ١ أو ٤، هي احتمالات). وكل trace ظهر ظهر كامل بالـ ٤ spans، لأن الخدمات اللي بعد الأول بتتبع قراره.

الغلطات الشائعة: الخدمة اسمها [[unknown_service:node]] (نسيت [[OTEL_SERVICE_NAME]] أو الـ resource). أو السكربت اشتغل ومفيش ولا trace في Jaeger، وده لأن الـ process قفل قبل ما الـ batch يتبعت (ناقصك [[beforeExit]]). أو السطر [[otel: connect ECONNREFUSED 127.0.0.1:4318]]، يعني Jaeger مش شغال أو البورت غلط.`,
          solCode: R`// instrumentation.prod.mjs: مفيش exporter في الكود، كله من متغيرات البيئة
import { register } from "node:module";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

register("@opentelemetry/instrumentation/hook.mjs", import.meta.url);
const sdk = new NodeSDK({
  instrumentations: [getNodeAutoInstrumentations({ "@opentelemetry/instrumentation-fs": { enabled: false } })],
});
sdk.start();
process.on("SIGTERM", () => sdk.shutdown().finally(() => process.exit(0)));
process.once("beforeExit", () => sdk.shutdown().catch((err) => console.error("otel:", err.message)));`
        },
        {
          cmd: "instrumentation.ts",
          title: "OpenTelemetry في Next.js: instrumentation.ts",
          desc: R`Next.js عنده ملف خاص اسمه [[instrumentation.ts]] في جذر المشروع (أو جوه [[src/]] لو بتستخدمه)، فيه دالة [[register()]] بتتنادى مرة واحدة لما السيرفر يقوم قبل أي طلب. ده مكان OpenTelemetry (و Sentry وغيرهم).

أسهل طريقة [[@vercel/otel]]: [[registerOTel("next-app")]] وخلاص، وبيشتغل على Node و Edge. ولو محتاج تحكم كامل، [[NodeSDK]] زي الدروس اللي فاتت، بس في ملف منفصل بيتحمّل لما [[NEXT_RUNTIME]] يبقى [[nodejs]] بس، لأن NodeSDK مش بيشتغل على Edge.

Next.js نفسه بيطلّع spans جاهزة (الـ route، والـ render، و fetch في Server Components)، ولو عايز تفاصيل أكتر شغّل بـ [[NEXT_OTEL_VERBOSE=1]].`,
          example: R`// instrumentation.ts (في جذر المشروع)
import { registerOTel } from "@vercel/otel";
export function register() {
  registerOTel({ serviceName: "shop-web" });
}
// أو تحكم كامل: instrumentation.ts بيحمّل ملف Node بس
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./instrumentation.node");
  }
}
// instrumentation.node.ts
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
const sdk = new NodeSDK({
  resource: resourceFromAttributes({ [ATTR_SERVICE_NAME]: "shop-web" }),
  traceExporter: new OTLPTraceExporter(),
});
sdk.start();`,
          try: R`في مشروع Next.js: [[npm i @vercel/otel @opentelemetry/api]] واعمل [[instrumentation.ts]] بالطريقة الأولى. شغّل Jaeger (الدرس اللي فات)، وبعدين [[OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4318 npm run build && npm start]]. افتح صفحة Server Component بتعمل [[fetch]] لـ API خارجي، ودوّر على الـ trace في Jaeger. وبعدين ضيف custom span حوالين حاجة في Server Action.`,
          flag: "script",
          deep: {
            why: "في Next.js الوقت ممكن يروح في حاجات مش باينة: fetch في Server Component، أو render تقيل، أو middleware، أو query في Route Handler. الـ traces بتوريك كل ده في waterfall واحد، ومع propagation لـ API الباك إند (لو Express عليه OTel) الـ trace بيكمل من Next لحد القاعدة.",
            how: R`[[register]] بتتنادى مرة في كل runtime: مرة في Node، ومرة في Edge لو عندك حاجة على Edge (زي middleware في نسخ كتير). عشان كده [[process.env.NEXT_RUNTIME]] بيفرّق. والـ dynamic import جوه الشرط بيضمن إن كود NodeSDK مبيدخلش bundle بتاع Edge أصلًا.

[[@vercel/otel]]: wrapper بيعمل الـ SDK والـ exporter (بيقرا [[OTEL_EXPORTER_OTLP_ENDPOINT]] زي أي SDK)، وبيدعم Edge، وعلى Vercel بيبعت للـ integrations بتاعة Vercel. مناسب لأغلب الحالات.

الـ spans اللي Next بيطلّعها لوحده: span للطلب ([[GET /products/[id]]])، وللـ render، ولكل [[fetch]] في السيرفر، و [[generateMetadata]]. و [[NEXT_OTEL_VERBOSE=1]] بيطلّع أكتر. والـ custom spans بنفس [[trace.getTracer("shop-web").startActiveSpan]] من الدرس اللي فات، في أي Server Component أو Server Action أو Route Handler.

الـ propagation: الـ fetch من السيرفر بيحط [[traceparent]] لوحده، فلو الـ API بتاعك عليه OTel، الـ trace بيكمل. ومن المتصفح للسيرفر ده موضوع تاني (browser instrumentation) ومش بيحصل لوحده.

الملف مكانه جذر المشروع جنب [[app/]]، أو جوه [[src/]] لو المشروع بيستخدم [[src/]]. في نسخ Next القديمة (١٣ و ١٤) كان محتاج [[experimental.instrumentationHook]] في [[next.config]]، وفي النسخ الحالية مش محتاج.

الاختبار الصح يبقى بـ [[next build]] و [[next start]]، لأن [[next dev]] بيطلّع spans زيادة للـ compile وأرقام مش شبه الإنتاج.`,
            when: "أي Next.js فيه Server Components بتجيب داتا، أو Route Handlers، أو بيكلّم API باك إند منفصل وعايز trace واحد من أول الطلب لحد القاعدة.",
            mistakes: R`تعمل import لـ NodeSDK في أول [[instrumentation.ts]] من غير شرط [[NEXT_RUNTIME]] فالـ build يقع بأخطاء modules مش موجودة في Edge. وتحط الملف جوه [[app/]] فمبيتقراش. وتفتكر إن الـ spans هتيجي من المتصفح لوحدها. وتقيس بـ [[next dev]]. وتحط مفتاح الـ backend في متغير [[NEXT_PUBLIC_]].`
          },
          lines: [
            "wrapper جاهز من Vercel.",
            "دالة بتتنادى مرة لما السيرفر يقوم.",
            "سجّل OTel باسم الخدمة (بيشتغل على Node و Edge).",
            "قفلة.",
            "البديل: نفس الدالة بس بتحمّل ملف Node...",
            "...لو الـ runtime هو Node بس.",
            "dynamic import عشان الكود ميدخلش bundle الـ Edge.",
            "قفلة الشرط.",
            "قفلة.",
            "الـ SDK.",
            "exporter بـ OTLP HTTP (بيقرا الـ endpoint من البيئة).",
            "الـ resource.",
            "اسم الـ attribute القياسي.",
            "SDK جديد.",
            "اسم الخدمة.",
            "ابعت بـ OTLP (مع batch).",
            "قفلة.",
            "ابدأ."
          ],
          sol: R`بعد [[npm start]] وفتح الصفحة، في Jaeger هتلاقي خدمة [[shop-web]]، و trace root اسمه زي [[GET /products/[id]]] (بالـ route مش الـ URL الحقيقي)، وتحته spans زي [[render route (app) /products/[id]]] و [[fetch GET https://api.example.com/...]] بمدة الـ fetch. الأسماء بالظبط ممكن تختلف شوية حسب نسخة Next.

ولو الـ API اللي بتعمله fetch عليه OTel وبيبعت لنفس Jaeger، هتلاقي spans بتاعته في نفس الـ trace تحت الـ fetch span.

الـ custom span في Server Action يظهر باسمه (مثلًا [[checkout.createOrder]]) تحت span الطلب اللي فيه الـ action.

الغلطات الشائعة: مفيش خدمة في Jaeger خالص، وده غالبًا عشان الملف مش في المكان الصح (جوه [[app/]] بدل جذر المشروع أو [[src/]])، أو المتغير [[OTEL_EXPORTER_OTLP_ENDPOINT]] مش واصل لـ [[npm start]]. أو الـ build بيقع بـ [[Module not found: Can't resolve 'fs']]، ودي NodeSDK اتعملها import من غير شرط [[NEXT_RUNTIME]].`,
          solCode: R`// app/checkout/actions.ts
"use server";
import { trace, SpanStatusCode } from "@opentelemetry/api";

const tracer = trace.getTracer("shop-web");

export async function createOrder(formData: FormData) {
  return tracer.startActiveSpan("checkout.createOrder", async (span) => {
    try {
      span.setAttribute("cart.items", Number(formData.get("items") ?? 0));
      const res = await fetch(process.env.API_URL + "/orders", { method: "POST", body: formData });
      span.setAttribute("http.response.status_code", res.status);
      return await res.json();
    } catch (err) {
      span.recordException(err as Error);
      span.setStatus({ code: SpanStatusCode.ERROR });
      throw err;
    } finally {
      span.end();
    }
  });
}`
        }
      ]
    },
    {
      t: "التكلفة والاعتمادية",
      l: 3,
      n: "فاتورة مفهومة، وموارد مش منسية، وخطة لما حاجة كبيرة تقع",
      items: [
        {
          cmd: "cost optimization",
          title: "الفاتورة كبيرة: تبدأ منين",
          desc: R`ابدأ بسؤال «الفلوس رايحة فين؟» (Cost Explorer مقسّم بالخدمة)، وبعدين بالترتيب: امسح اللي مش مستخدم، وصغّر اللي أكبر من احتياجه، واستخدم Graviton، واقفل بيئات التطوير بالليل، وبعدها Savings Plans للي شغال دايمًا و Spot للشغل اللي يستحمل يتقطع.

وخد بالك من نقل البيانات للنت (egress): أول ١٠٠ جيجا في الشهر ببلاش على مستوى الحساب، وبعدها حوالي ٠.٠٩ دولار للجيجا، وده ممكن يبقى أغلى من السيرفرات نفسها.`,
          example: R`aws ce get-cost-and-usage --time-period Start=2026-09-01,End=2026-09-29 --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=SERVICE
aws compute-optimizer get-ec2-instance-recommendations --query "instanceRecommendations[].[instanceArn,finding,recommendationOptions[0].instanceType]" --output table
aws ec2 describe-spot-price-history --instance-types t4g.small --product-descriptions "Linux/UNIX" --max-items 3
aws ec2 create-vpc-endpoint --vpc-id vpc-0abc1234 --service-name com.amazonaws.eu-central-1.s3 --route-table-ids rtb-0abc1234`,
          try: "افتح Cost Explorer وقسّم آخر ٣ شهور بالخدمة وبعدين بالـ usage type. دوّر على بنود فيها [[DataTransfer-Out]] و [[NatGateway]] و [[PublicIPv4]]، واكتب لكل بند: ليه موجود، وممكن يقل إزاي.",
          deep: {
            why: "فواتير الـ cloud بتكبر بهدوء: سيرفر أكبر من اللازم من يوم التجربة، ولوجات من غير retention، و NAT Gateway بيعدّي عليه كل الترافيك لـ S3. كل واحد لوحده صغير، ومع بعض نص الفاتورة.",
            how: R`right-sizing: Compute Optimizer (محتاج تفعّله) بيبص على استخدام الـ CPU والرام لأسابيع ويقولك «أكبر من اللازم، جرّب t4g.small». و Graviton ([[t4g]] و [[m7g]]) أرخص بحوالي ٢٠٪ لنفس الأداء، ومعظم تطبيقات Node و Python بتشتغل عليه من غير تعديل (بس ابني image لـ arm64).

الالتزام: Savings Plans بتلتزم فيها بمبلغ في الساعة لسنة أو ٣، وبتاخد خصم كبير (لحد ٧٢٪) على EC2 و Fargate و Lambda. ومتلتزمش غير على الحد الأدنى اللي متأكد إنه شغال دايمًا.

Spot: سيرفرات AWS الفاضية بخصم لحد ٩٠٪، بس ممكن تتسحب بإنذار دقيقتين. مناسبة لـ workers و CI و batch، ومش لقاعدة بيانات.

الشبكة: الداخل ببلاش والخارج للنت بفلوس، وبين الـ AZs بسنت للجيجا في كل اتجاه، و NAT Gateway بياخد على الساعة وعلى كل جيجا بتعدّي. الـ VPC endpoint لـ S3 (نوع gateway، في آخر سطر) ببلاش، وبيخلّي الترافيك من private subnets لـ S3 ميعدّيش على الـ NAT. و CloudFront قدام S3 بيقلل الـ egress لأن النقل من S3 لـ CloudFront ببلاش.

وحط tags ([[project]] و [[env]]) على كل حاجة وفعّلها كـ cost allocation tags، فتعرف كل مشروع بيكلّف كام. والـ Cost Explorer API نفسه بسنت لكل طلب، فمتحطوش في cron كل دقيقة.`,
            when: "مراجعة شهرية للفاتورة، وقبل أي التزام سنوي، وأول ما بند يزيد فجأة.",
            mistakes: "تشتري Savings Plan لـ ٣ سنين على سيرفرات هتقفلها بعد شهرين. وتحط الـ API في private subnet وكل رفعة لـ S3 تعدّي على NAT. وتصغّر الـ instance على الـ CPU بس وتنسى الرام فالتطبيق يقع OOM. وتقارن سعر السيرفر وتنسى الـ egress."
          },
          lines: [
            "التكلفة الشهر ده مقسومة على الخدمات (كل طلب للـ API ده بسنت).",
            "Compute Optimizer: السيرفرات اللي أكبر من احتياجها والنوع المقترح.",
            "آخر أسعار Spot لنوع معين.",
            "طريق مباشر ببلاش من الـ VPC لـ S3، من غير NAT."
          ],
          sol: R`الجدول اللي هتطلع بيه شكله كده (الأرقام مثال):

[[EUC1-NatGateway-Hours]] و [[NatGateway-Bytes]]: موجود لأن الـ private subnets بتطلع للإنترنت من خلاله (ونازل لـ ECR و S3 كمان). يقل بـ VPC endpoint لـ S3 (ببلاش، gateway endpoint) و ECR، أو NAT واحد بدل واحد لكل AZ في dev، أو تمسحه لو مفيش private subnets فعلًا.
[[PublicIPv4:InUseAddress]] و [[IdleAddress]]: كل IP عام حوالي ٣.٦ دولار في الشهر. يقل بإنك تمسح Elastic IPs مش مربوطة، وتحط السيرفرات ورا load balancer واحد بدل IP لكل واحد.
[[DataTransfer-Out-Bytes]]: ترافيك طالع للإنترنت، غالبًا صور وملفات. يقل بـ CloudFront قدام S3 (الخروج من CloudFront أرخص وليه شريحة مجانية) وضغط الصور.

الغلطة الشائعة: تبص على الخدمة بس فتلاقي «EC2-Other» كبير ومش فاهم هو إيه؛ ده بالظبط ليه تقسّم بالـ usage type: جواه NAT و EBS و IPs. وخلي بالك إن أوامر [[aws ce]] نفسها بتتحاسب (حوالي سنت لكل طلب)، فمتحطهاش في loop كل دقيقة.`,
          solCode: R`aws ce get-cost-and-usage --time-period Start=2026-07-01,End=2026-10-01 --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=USAGE_TYPE --query "ResultsByTime[].Groups[].[Keys[0],Metrics.UnblendedCost.Amount]" --output text | sort -k2 -g -r | head -20`
        },
        {
          cmd: "امسح اللي مش مستخدم",
          title: "موارد منسية بتتحاسب كل ساعة",
          desc: R`بعد أي تجربة، الحاجات دي بتفضل تتحاسب لو ممسحتهاش: السيرفرات (حتى الواقفة: الديسك والـ IP)، والـ volumes اللي مش متوصلة، والـ Elastic IPs، والـ snapshots، و NAT Gateways، و load balancers، وقواعد RDS، والـ buckets.

تحذير: كل أمر مسح هنا نهائي. اتأكد من [[get-caller-identity]] والـ region والـ ID قبل ما تدوس Enter، وخد snapshot أخير لأي حاجة فيها داتا.`,
          example: R`aws ec2 describe-volumes --filters Name=status,Values=available --query "Volumes[].[VolumeId,Size,CreateTime]" --output table
aws ec2 describe-addresses --query "Addresses[?AssociationId==null].[AllocationId,PublicIp]" --output table
aws ec2 terminate-instances --instance-ids i-0abc1234567890def
aws ec2 delete-volume --volume-id vol-0abc1234567890def
aws ec2 release-address --allocation-id eipalloc-0abc1234567890def
aws rds delete-db-instance --db-instance-identifier myapp-db-restored --final-db-snapshot-identifier myapp-db-restored-final
aws s3 rb s3://myapp-old-assets --force`,
          try: "بعد ما تخلص تجارب الدروس، لف على كل region (الـ loop في درس «Budgets و free tier») ودوّر على: instances، و volumes متاحة، و Elastic IPs مش مربوطة، و NAT Gateways، و load balancers، و RDS. وامسح بعد ما تتأكد. أو افتح Resource Explorer أو Tag Editor في الكونسول يعرضلك كل حاجة في كل الـ regions.",
          flag: "danger",
          deep: {
            why: "AWS مبيمسحش حاجة لوحده ومبيسألكش «لسه محتاجها؟». Elastic IP مش مربوط، و NAT Gateway في VPC تجربة، وقاعدة RDS اتعملت من استرجاع، ممكن يفضلوا شهور. وأول مرة تعرف بيهم هي الفاتورة.",
            how: R`[[status=available]] في الـ volumes يعني «مش متوصل بأي سيرفر»: غالبًا فضل بعد terminate لأن [[DeleteOnTermination]] كان false. و [[AssociationId==null]] في الـ addresses يعني IP محجوز ومش مربوط، وبيتحاسب.

الترتيب مهم: terminate للسيرفر الأول، وبعدين الـ volumes اللي فضلت، وبعدين الـ IPs. و NAT Gateway قبل الـ VPC.

[[delete-db-instance]] مع [[--final-db-snapshot-identifier]] بياخد snapshot أخير قبل المسح، وده اللي يرجّعك لو غلطت. والبديل [[--skip-final-snapshot]] معناه مفيش رجوع. ولو القاعدة عليها deletion protection لازم تقفلها الأول بـ [[modify-db-instance]]، وده مقصود.

[[s3 rb --force]] بيمسح كل الـ objects وبعدين الـ bucket. ولو الـ versioning شغال، النسخ القديمة بتفضل ومش هيقدر يمسح الـ bucket، فلازم تمسح الـ versions الأول أو تحط lifecycle rule تمسحها.

والأحسن من المسح بإيدك: كل حاجة اتعملت بـ Terraform، فـ [[terraform destroy]] بيمسح كل اللي عمله. وكل حاجة عليها tags فتعرف بتاعة مين.`,
            when: "آخر كل تجربة، وفي المراجعة الشهرية للفاتورة، وقبل ما تقفل مشروع.",
            mistakes: "تمسح في region غلط أو حساب غلط (الإنتاج بدل الـ dev). و [[--skip-final-snapshot]] على قاعدة فيها داتا. وتمسح السيرفر وتفتكر إن الـ Elastic IP والـ volume راحوا معاه. و [[s3 rb --force]] على bucket فيه باك أب."
          },
          lines: [
            "الديسكات اللي مش متوصلة بأي سيرفر.",
            "الـ Elastic IPs اللي مش مربوطة (بتتحاسب).",
            "امسح السيرفر نهائيًا.",
            "امسح ديسك فاضل.",
            "رجّع الـ IP لـ AWS.",
            "امسح القاعدة بعد snapshot أخير.",
            "امسح الـ bucket وكل اللي فيه."
          ],
          sol: R`السكربت تحت بيلف على كل region ويطبع بس اللي فيه حاجة. على حساب نضيف المفروض ميطبعش غير أسماء الـ regions. أي سطر تحتها زي [[volumes: vol-0abc... 8]] أو [[eips: eipalloc-...]] أو [[nat: nat-...]] ده مورد بيتحاسب. امسحه بالأوامر اللي في المثال، واستخدم [[aws ec2 delete-nat-gateway]] و [[aws elbv2 delete-load-balancer]] للباقي.

وبعد المسح، شغّل السكربت تاني: الـ NAT Gateway بيفضل ظاهر بحالة [[deleted]] شوية، والـ instance بـ [[terminated]] حوالي ساعة، ودول مش بيتحاسبوا. وفي الكونسول، Resource Explorer (بعد ما تفعّله) أو Tag Editor بـ All regions و All resource types بيعرضوا نفس الصورة من غير سكربت.

الغلطة الشائعة: تمسح الـ instance وتفتكر إن كده خلصت، والديسك فضل [[available]] لأن [[DeleteOnTermination]] كان false، أو الـ Elastic IP فضل محجوز. وتانية: [[delete-db-instance]] من غير snapshot نهائي لقاعدة فيها حاجة مهمة، أو بـ snapshot نهائي لقاعدة تجربة فيفضل الـ snapshot يتحاسب شهور.`,
          solCode: R`for r in $(aws ec2 describe-regions --query "Regions[].RegionName" --output text); do
  echo "== $r"
  aws ec2 describe-instances --region $r --filters Name=instance-state-name,Values=pending,running,stopped --query "Reservations[].Instances[].InstanceId" --output text | sed 's/^/instances: /' | grep -v ': $'
  aws ec2 describe-volumes --region $r --filters Name=status,Values=available --query "Volumes[].[VolumeId,Size]" --output text | sed 's/^/volumes: /' | grep -v ': $'
  aws ec2 describe-addresses --region $r --query "Addresses[?AssociationId==null].AllocationId" --output text | sed 's/^/eips: /' | grep -v ': $'
  aws ec2 describe-nat-gateways --region $r --filter Name=state,Values=available --query "NatGateways[].NatGatewayId" --output text | sed 's/^/nat: /' | grep -v ': $'
  aws elbv2 describe-load-balancers --region $r --query "LoadBalancers[].LoadBalancerName" --output text | sed 's/^/lb: /' | grep -v ': $'
  aws rds describe-db-instances --region $r --query "DBInstances[].DBInstanceIdentifier" --output text | sed 's/^/rds: /' | grep -v ': $'
done`
        },
        {
          cmd: "HA و DR",
          title: "السيستم يفضل شغال لو مبنى وقع، ويرجع لو region وقعت",
          desc: R`High availability معناها مفيش نقطة واحدة لو وقعت كل حاجة تقع (نسختين من التطبيق أو أكتر في AZs مختلفة، وقاعدة بيانات Multi-AZ)، و disaster recovery هي خطتك لو حاجة أكبر حصلت زي region كلها أو حد مسح الداتا.

الـ DR بيتقاس برقمين: RPO (أقصى داتا ممكن تضيع، مثلًا ٥ دقايق) و RTO (أقصى وقت لحد ما ترجع، مثلًا ساعة)، وكل ما الرقمين يصغروا التكلفة بتكبر. تحذير: Multi-AZ بيضاعف سعر القاعدة، والـ failover بيوقفها لحظات.`,
          example: R`aws rds modify-db-instance --db-instance-identifier myapp-db --multi-az --apply-immediately
aws rds reboot-db-instance --db-instance-identifier myapp-db --force-failover
aws autoscaling update-auto-scaling-group --auto-scaling-group-name myapp-web --min-size 2 --max-size 6 --desired-capacity 2
aws s3api put-bucket-versioning --bucket myapp-assets --versioning-configuration Status=Enabled
aws rds copy-db-snapshot --source-db-snapshot-identifier arn:aws:rds:eu-central-1:123456789012:snapshot:myapp-before-migration-42 --target-db-snapshot-identifier myapp-dr-copy --source-region eu-central-1 --kms-key-id alias/myapp-dr --region eu-west-1`,
          try: "على قاعدة تجربة: فعّل Multi-AZ، وشغّل سكربت بيعمل query كل ثانية، واعمل [[--force-failover]]. احسب التطبيق وقف قد إيه، وشوف رجع لوحده ولا محتاج restart (مكتبة الاتصال بتعيد المحاولة؟).",
          flag: "danger",
          deep: {
            why: "الـ AZ بتقع أحيانًا، والسيرفر الواحد بيقع أكتر. والـ DR مش للكوارث بس: الأشهر إن حد يمسح داتا أو migration تبوّظ جدول. ومن غير خطة ورقمين واضحين، هتكتشف وقت الأزمة إن الباك أب عمره يومين أو إن الاسترجاع بياخد ٦ ساعات.",
            how: R`HA على AWS: الـ load balancer نفسه في أكتر من AZ. و Auto Scaling group بحد أدنى ٢ موزعين على AZs، ولو سيرفر فشل في الـ health check بيتشال ويتعمل غيره. والتطبيق لازم stateless: الـ sessions في Redis أو قاعدة البيانات (أو JWT)، والملفات في S3 مش على ديسك السيرفر.

RDS Multi-AZ: نسخة standby في AZ تانية بتاخد كل كتابة بشكل متزامن. لو الأساسية وقعت، الـ DNS بتاع القاعدة بيتحول للـ standby (عادةً دقيقة أو اتنين). والتطبيق لازم يعيد الاتصال، فالـ pool لازم يكون متظبط على كده. والـ standby مش بيستقبل قراية في النوع العادي.

استراتيجيات الـ DR من الأرخص للأغلى: backup & restore (باك أب في region تانية، و RTO ساعات)، و pilot light (القاعدة متكررة في region تانية والباقي يتعمل وقت الحاجة)، و warm standby (نسخة صغيرة شغالة)، و active-active (الاتنين شغالين، و RTO تقريبًا صفر، وأغلى وأعقد بكتير).

[[copy-db-snapshot]] لـ region تانية بيتنفذ في الـ region اللي رايح لها، والـ snapshot المتشفّر محتاج مفتاح KMS هناك ([[--kms-key-id]]). و S3 versioning بيحمي من المسح والكتابة فوق الملفات، و Cross-Region Replication بينسخ لـ region تانية. و AWS Backup بيجمع ده كله في خطط بمواعيد.

وأهم قاعدة: باك أب مجرّبتش تسترجعه = مش باك أب. حط تمرين استرجاع كل كام شهر وقيس الـ RTO الحقيقي.`,
            when: "Multi-AZ وحد أدنى ٢ لأي إنتاج بيدفع. وخطة DR مكتوبة برقمين قبل ما تحتاجها. ولمشروع صغير، باك أب يومي في region تانية بـ RTO ساعات غالبًا كفاية.",
            mistakes: "تفتكر إن Multi-AZ باك أب: لو حد مسح جدول، المسح بيتنسخ للـ standby في نفس اللحظة. وسيرفرين والـ sessions في رام كل واحد فاليوزر بيخرج كل شوية. والباك أب في نفس الحساب ونفس الـ region، فلو الحساب اتخترق أو الـ region وقعت راح الاتنين. والرقمين RPO و RTO محدش حددهم فكل واحد فاكرهم حاجة."
          },
          lines: [
            "شغّل نسخة احتياطي متزامنة في AZ تانية (بيضاعف السعر).",
            "جرّب الـ failover بنفسك: القاعدة هتقف لحظات.",
            "على الأقل سيرفرين دايمًا، ولحد ٦ وقت الضغط.",
            "احتفظ بكل نسخة من كل ملف: المسح والكتابة فوق يترجعوا.",
            "انسخ snapshot لـ region تانية (أيرلندا) بمفتاح تشفير من هناك."
          ],
          sol: R`السكربت تحت بيعمل اتصال جديد كل ثانية ويطبع الوقت و IP السيرفر اللي رد. قبل الـ failover هتلاقي نفس الـ IP. بعد [[--force-failover]] هتلاقي سطور [[FAIL]] (connection refused أو timeout) لفترة، والمتوقع حسب AWS حوالي دقيقة لدقيقتين في Multi-AZ instance العادي، وبعدين السطور ترجع بـ IP مختلف: ده الـ standby اللي بقى primary، والـ endpoint (الاسم) هو هو لأن DNS بتاعه اتحدّث.

السكربت رجع لوحده لأنه بيفتح اتصال جديد كل مرة. التطبيق بتاعك ممكن ميرجعش: لو الـ pool ماسك اتصالات قديمة للسيرفر اللي وقع، أول طلبات بعد الـ failover هتفشل لحد ما الـ pool يكتشف إنها ميتة ويفتح جديدة، ولو المكتبة أو الـ runtime كاشين الـ DNS (زي JVM بإعدادات قديمة) ممكن تفضل تكلّم الـ IP القديم لحد restart. لو ده حصل، النتيجة اللي تكتبها: «التطبيق محتاج retry وإعدادات pool»، مش «Multi-AZ مش شغال».

والغلطة الشائعة في التجربة: تنسى إن Multi-AZ بيضاعف سعر القاعدة، فتسيبه شغال على قاعدة تجربة. رجّعه بـ [[--no-multi-az]] بعد ما تخلص.`,
          solCode: R`export PGCONNECT_TIMEOUT=2
while true; do
  if out=$(psql "$DATABASE_URL" -Atc "select inet_server_addr()" 2>&1); then echo "$(date +%T) OK $out"; else echo "$(date +%T) FAIL"; fi
  sleep 1
done
# في ترمنال تاني:
aws rds reboot-db-instance --db-instance-identifier myapp-db --force-failover
aws rds describe-events --source-identifier myapp-db --source-type db-instance --duration 30 --query "Events[].[Date,Message]" --output table`
        }
      ]
    },
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
          sol: R`مثال لإجابة صريحة لمشروع صغير على VPS:

الحالي: الباك أب [[pg_dump]] يومي الساعة ٣ الصبح على نفس السيرفر. يعني RPO الحقيقي لحد ٢٤ ساعة، ولو الديسك نفسه راح يبقى RPO لانهائي (الباك أب راح معاه). والـ RTO: عمري ما استرجعت، فمعرفوش؛ التقدير: سيرفر جديد وتسطيب وتنزيل الباك أب ٣ لـ ٤ ساعات.

المفروض: RPO ساعة و RTO ساعتين مثلًا (اسأل: خسارة يوم طلبات تكلف قد إيه؟). ده محتاج: باك أب لـ مكان تاني (S3 أو R2 في حساب منفصل) كل ساعة أو WAL archiving، أو قاعدة مُدارة فيها PITR، وسكربت أو Terraform بيقوّم السيرفر، وتجربة استرجاع حقيقية كل شهر بتقيس الوقت.

الغلطة الشائعة: تكتب RPO = «يوم» لأن الباك أب يومي وتنسى إن الباك أب على نفس الديسك، أو تكتب RTO رقم متخيّل من غير ما تكون جربت استرجاع ولو مرة. والفرق اللي الانترفيوير بيدوّر عليه: Multi-AZ ده HA مش DR، ومبيحميش من [[DELETE]] من غير [[WHERE]].`
        }
      ]
    }
  ]
});

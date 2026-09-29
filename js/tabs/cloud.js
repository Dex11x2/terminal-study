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
// ولو محتاج تكتب ${ جوه R`...` اكتبها $__{ والصفحة بترجّعها.

TAB("cloud", {
  label: "Cloud و DevOps",
  prompt: "$ ",
  lab: R`aws --version
aws configure
aws sts get-caller-identity`,
  labText: "افتح حساب AWS مجاني وفعّل MFA و budget alert من أول يوم (درس في المستوى ١). جرّب على منطقة واحدة وامسح كل حاجة بعد التجربة.",
  levels: {"1":["الأساس","يعني إيه cloud، و IAM، و regions، والتكلفة، و AWS CLI"],"2":["الخدمات","EC2 و S3 و RDS و CloudFront و Lambda و Cloudflare و Vercel"],"3":["DevOps","containers في الـ cloud، و Kubernetes، و Terraform، والمراقبة، و SRE، وأسئلة الانترفيو"]},
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
          ]
        },
        {
          cmd: "VPS ولا managed ولا PaaS",
          title: "فريق صغير: يستضيف مشروعه فين؟",
          desc: R`مفيش اختيار صح دايمًا: VPS أرخص وفيه تحكم كامل بس الصيانة كلها عليك، و PaaS أسرع بداية وأغلى مع الكبر، و managed cloud مرن وقوي بس معقّد ومحتاج حد فاهم.

الدالة دي مش قاعدة مقدّسة، هي طريقة تفكير: حجم الفريق، وشكل الترافيك، ومحتاج سيرفر خاص ولا لأ، والميزانية.`,
          example: R`function pickHosting({ devs, traffic, needsServer, budgetUsd }) {
  if (devs <= 2 && !needsServer) return "PaaS: Vercel + Neon أو Supabase";
  if (budgetUsd < 20) return "VPS واحد + Docker Compose + باك أب برا السيرفر";
  if (traffic === "spiky") return "serverless: Lambda أو Vercel Functions";
  return "managed: ECS Fargate + RDS + CloudFront";
}
console.log(pickHosting({ devs: 1, traffic: "steady", needsServer: false, budgetUsd: 0 }));
console.log(pickHosting({ devs: 2, traffic: "steady", needsServer: true, budgetUsd: 10 }));
console.log(pickHosting({ devs: 6, traffic: "steady", needsServer: true, budgetUsd: 400 }));`,
          try: "شغّل الدالة على ٣ مشاريع عملتها قبل كده. لو النتيجة مختلفة عن اللي عملته فعلًا، اكتب ليه، وهل اختيارك كان أحسن ولا لأ.",
          flag: "script",
          deep: {
            why: "أغلب المشاريع الصغيرة بتقع في غلطة من اتنين: Kubernetes لموقع فيه ١٠٠ زائر في اليوم، أو VPS محدش بيحدّثه ولا بيعمل له باك أب لحد ما الديسك يبوظ. الاختيار الصح بيوفر فلوس ووقت ووجع دماغ.",
            how: R`VPS (Hetzner أو DigitalOcean أو Hostinger): سعر ثابت وقليل، وبتعمل اللي انت عايزه: Docker و cron و WebSockets و workers. بس انت الـ sysadmin: تحديثات، وفايروول، وباك أب، ومراقبة. ولو السيرفر وقع الموقع كله وقع. التفاصيل في تاب VPS وتاب Docker.

PaaS (Vercel و Netlify و Supabase و Neon): بتعمل push والموقع يطلع، و preview لكل branch، و SSL تلقائي. بس السعر بيقفز مع الترافيك، وفيه حدود (مدة الدالة، وحجم الطلب)، وحاجات زي WebSockets طويلة أو شغل خلفي بالساعات مش مكانها.

managed cloud (ECS و RDS على AWS): تقدر تبني أي حاجة وتكبر لأي حجم، ومعاك Multi-AZ وباك أب تلقائي. بس فيه عشرات الإعدادات (VPC و IAM و security groups)، والفاتورة معقدة، ومحتاج حد يفهمها.

طريق شائع ومعقول: تبدأ PaaS أو VPS، ولما الترافيك أو الفريق يكبر تنقل الأجزاء اللي محتاجة لـ AWS. وخلي التطبيق من الأول «سهل النقل»: Docker، ومتغيرات بيئة، والملفات في object storage مش على الديسك.`,
            when: "في أول يوم من أي مشروع، وكل ما الفاتورة أو وقت الصيانة يزيد بشكل ملحوظ.",
            mistakes: "تختار AWS عشان «الشركات الكبيرة بتستخدمه» وانت لوحدك، فتقضي أسبوع في VPC و IAM بدل ما تبني المنتج. وتحط موقع تجاري على خطة Hobby في Vercel وهي للاستخدام الشخصي غير التجاري بس. وتحفظ الملفات اللي المستخدمين بيرفعوها على ديسك الـ VPS، فلما تنقل أو تكبّر لازم تنقلها بإيدك."
          },
          lines: [
            "دالة بتاخد وصف المشروع.",
            "فريق صغير ومش محتاج سيرفر خاص: منصة جاهزة.",
            "ميزانية قليلة: سيرفر واحد وانت اللي بتديره.",
            "ترافيك بيقفز وينزل: ادفع على الطلب.",
            "غير كده: managed على AWS.",
            "قفلة الدالة.",
            "مطوّر واحد ومش محتاج سيرفر: PaaS.",
            "محتاج سيرفر وميزانيته ١٠ دولار: VPS.",
            "فريق أكبر وميزانية: managed."
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
        },
        {
          cmd: "presigned URL",
          title: "المتصفح يرفع الملف على S3 من غير ما يعدي على سيرفرك",
          desc: R`بدل ما الملف يعدي من المتصفح لسيرفرك وبعدين لـ S3، السيرفر بيعمل «إذن رفع» مؤقت (URL موقّع) لملف واحد باسم ونوع محددين، والمتصفح يرفع عليه مباشرة بـ PUT.

السيرفر بيتحقق من اليوزر والنوع ويختار الاسم، و S3 بيشيل الملف نفسه. وفي المتصفح: [[await fetch(url, { method: "PUT", headers: { "Content-Type": file.type }, body: file })]] وبعدها يبعت الـ [[key]] للـ API.`,
          example: R`import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { randomUUID } from "node:crypto";

const s3 = new S3Client({ region: "eu-central-1" });
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
            "الكلاينت مرة واحدة، وبياخد صلاحياته من الـ role.",
            "الأنواع المسموحة بس.",
            "route محمي: لازم اليوزر يبقى مسجّل دخول.",
            "نوع مش مسموح؟ ارفض.",
            "السيرفر هو اللي يختار الاسم: فولدر لكل يوزر واسم عشوائي.",
            "وصف الرفع: الـ bucket والاسم والنوع (المتصفح لازم يبعت نفس النوع).",
            "وقّع لمدة ٥ دقايق، وخلّي الـ Content-Type جزء من التوقيع (SDK v3 مش بيوقّعه لوحده).",
            "رجّع الـ URL والـ key للمتصفح.",
            "قفلة الـ route."
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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

الـ traces: X-Ray أو OpenTelemetry. كل طلب ليه trace id بيتنقل في الهيدرز بين الخدمات، فتشوف «الطلب ده قعد ٢ ثانية منهم ١.٨ في query واحدة».

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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          }
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
          ]
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
          }
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          ]
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
          }
        }
      ]
    }
  ]
});

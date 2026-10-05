// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
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
      - uses: actions/checkout@v7
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
  dataCollection: { userInfo: false, cookies: false },
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

[[dataCollection: { userInfo: false, cookies: false }]]: ميبعتش IPs والكوكيز وبيانات اليوزر تلقائي. ده في SDK نسخة 11 (الحالية). في نسخة 10 وقبلها كان [[sendDefaultPii: false]] وكان هو الافتراضي، إنما في 11 اتشال وبيتجاهل في صمت، والافتراضي بقى إنه يبعت الـ IP والكوكيز، فلازم تقفلهم بنفسك. بيانات العملاء لما تطلع لخدمة برا دي مسؤولية قانونية.

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
          sol: R`بعد ما تفتح الـ route، خلال ثواني هيظهر issue في Sentry عنوانه [[Error: test sentry]]، وجواه: الـ stack trace لحد السطر اللي فيه [[throw]] في ملفك، وقسم Request فيه الـ URL والـ method والـ headers (من غير IP والكوكيز لأن [[userInfo: false]] و [[cookies: false]])، و tags فيها [[environment]] و [[release]] (لو [[GIT_SHA]] متسجل). واليوزر نفسه هيشوف 500 عادي، لأن Sentry بيسجّل الخطأ وبيسيب الـ error handler التاني يرد.

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
    }
]);

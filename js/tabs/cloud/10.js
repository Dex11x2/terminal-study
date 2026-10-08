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
          teach: R`## الفكرة: ملف بيوصف البنية، و Terraform بيعملها

الملف ده مش أوامر بتتنفذ بالترتيب. هو وصف: «عايز bucket اسمه كذا، وعليه قفل يمنع الوصول العام». و Terraform بيقرا الوصف، ويقارنه باللي موجود فعلًا، ويعمل الفرق بس.

اتجرّب بـ Terraform v1.16.5 (الـ image الرسمي [[hashicorp/terraform]] في Docker) و AWS provider v6.68.0، والـ AWS نفسه كان LocalStack 4.9 (محاكي لـ AWS بيشتغل في Docker بمفاتيح وهمية). الملف اللي في المثال هو هو من غير تعديل، والإعدادات اللي بتوجّهه لـ LocalStack كانت في ملف تاني جنبه اسمه [[override.tf]] (Terraform بيدمج أي ملف اسمه كده فوق الـ blocks اللي بنفس الاسم). في حسابك الحقيقي مش محتاج الملف ده.

---

## ١. الـ provider

~~~hcl
provider "aws" {
  region = "eu-central-1"
}
~~~

- [[provider]] نوع الـ block. الـ provider هو الـ plugin اللي بيعرف يكلّم خدمة معينة. [[aws]] هنا معناه «هات الـ plugin بتاع AWS» (Terraform بينزّله في [[terraform init]]، الدرس الجاي).
- [[{ }]] جسم الـ block، وجواه إعدادات بشكل [[name = value]].
- [[region = "eu-central-1"]] كل حاجة هتتعمل في فرانكفورت. النصوص بين [[" "]] دايمًا.

والصلاحيات؟ مش مكتوبة هنا عمدًا. الـ provider بياخدها من نفس الأماكن اللي الـ AWS CLI بياخد منها: [[AWS_PROFILE]] أو متغيرات البيئة أو الـ role. المفتاح عمره ما يتكتب في ملف [[.tf]] لأن الملف ده رايح Git.

---

## ٢. أول resource: الـ bucket

~~~hcl
resource "aws_s3_bucket" "assets" {
  bucket = "myapp-assets"
}
~~~

الـ block ده ليه اسمين بعد كلمة [[resource]]، ودي أكتر حاجة بتلخبط:

| الحتة | معناها | مين اللي بيحددها |
|---|---|---|
| [[aws_s3_bucket]] | النوع: bucket في S3 | الـ provider (البادئة [[aws_]] = تبع AWS) |
| [[assets]] | اسمه جوه Terraform بس | انت، وبيستخدم عشان تشاور عليه |
| [[bucket = "myapp-assets"]] | اسمه الحقيقي في AWS | انت، ولازم يبقى فريد في كل AWS |

يعني [[assets]] زي اسم متغير في الكود، و [[myapp-assets]] هو اللي هتشوفه في الكونسول. والعنوان الكامل للمورد جوه Terraform: [[aws_s3_bucket.assets]] (النوع نقطة الاسم).

---

## ٣. التاني: قفل الوصول العام

~~~hcl
resource "aws_s3_bucket_public_access_block" "assets" {
  bucket                  = aws_s3_bucket.assets.id
  block_public_acls       = true
  ...
}
~~~

في AWS provider الحديث، كل إعداد للـ bucket مورد لوحده (versioning، و encryption، و public access block...). والاسم [[assets]] اتكرر عادي، لأن النوع مختلف، فالعنوان مختلف: [[aws_s3_bucket_public_access_block.assets]].

### السطر المهم: [[aws_s3_bucket.assets.id]]

ده مش نص بين [[" "]]، ده **مرجع**. اتقرا من الشمال:

~~~text
aws_s3_bucket . assets . id
النوع           الاسم     الخاصية (id بتاع الـ bucket = اسمه في AWS)
~~~

الـ id ده مش معروف غير بعد ما الـ bucket يتعمل، فالـ plan بيكتبه [[(known after apply)]]. والأهم: Terraform فهم من المرجع ده إن المورد التاني **معتمد** على الأول، فلازم الـ bucket يتعمل الأول. [[terraform graph]] بيطبع العلاقة دي:

~~~text الناتج
"aws_s3_bucket_public_access_block.assets" -> "aws_s3_bucket.assets";
~~~

السهم معناه «محتاج». انت مكتبتش ترتيب في أي حتة، المرجع هو اللي عمله.

### الأربع خانات [[true]]

| الخانة | بتمنع إيه |
|---|---|
| [[block_public_acls]] | أي حد يحط ACL عامة جديدة على الـ bucket أو ملف فيه |
| [[block_public_policy]] | أي bucket policy جديدة بتفتحه للعالم |
| [[ignore_public_acls]] | الـ ACLs العامة الموجودة أصلًا: S3 يتجاهلها |
| [[restrict_public_buckets]] | لو فيه policy عامة موجودة، الوصول يبقى لحسابك وخدمات AWS بس |

الأربعة مع بعض = «الـ bucket ده مقفول مهما حد غلط بعدين». والمسافات قبل [[=]] للمحاذاة بس، و [[terraform fmt]] بيحطها لوحده.

---

## ٤. نشغّله: [[validate]] و [[plan]]

~~~bash
terraform init
terraform validate
terraform plan
~~~

~~~text الناتج (مختصر)
Success! The configuration is valid.

  # aws_s3_bucket.assets will be created
  + resource "aws_s3_bucket" "assets" {
      + arn                         = (known after apply)
      + bucket                      = "myapp-assets"
      + force_destroy               = false
      + region                      = "eu-central-1"
      ...
    }

  # aws_s3_bucket_public_access_block.assets will be created
  + resource "aws_s3_bucket_public_access_block" "assets" {
      + block_public_acls       = true
      + bucket                  = (known after apply)
      ...
    }

Plan: 2 to add, 0 to change, 0 to destroy.
~~~

- [[+]] قبل كل مورد = هيتعمل جديد.
- الخانات اللي مكتبتهاش (زي [[force_destroy = false]]) ليها قيمة افتراضية، والـ plan بيوريهالك.
- [[bucket = (known after apply)]] في التاني: ده المرجع، لسه ملوش قيمة.
- [[Plan: 2 to add]] = موردين، زي ما كتبنا.

---

## ٥. الحل: [[variable]] و [[output]] و [[$__{var.env}]]

~~~hcl
variable "env" {
  default = "dev"
}

resource "aws_s3_bucket" "assets" {
  bucket = "myapp-assets-$__{var.env}"
}

output "bucket_arn" {
  value = aws_s3_bucket.assets.arn
}
~~~

| الحتة | معناها |
|---|---|
| [[variable "env"]] | مدخل اسمه [[env]]. [[default]] قيمته لو محدش بعت حاجة |
| [[var.env]] | القيمة بتاعته جوه الكود |
| [[$__{ }]] جوه نص | حط القيمة في النص ده (interpolation) |
| [[output "bucket_arn"]] | قيمة تتطبع بعد التطبيق |
| [[.arn]] | الـ ARN (Amazon Resource Name): العنوان الكامل للمورد في AWS |

~~~text terraform plan
      + bucket                      = "myapp-assets-dev"
Plan: 2 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + bucket_arn = (known after apply)
~~~

ومع [[terraform plan -var env=prod]] السطر بقى [[bucket = "myapp-assets-prod"]]. نفس الكود عمل بيئة تانية بتغيير متغير، وده كل الهدف.

ولو نسيت block الـ [[variable]] واستخدمت [[var.env]]:

~~~text الناتج
Error: Reference to undeclared input variable

  on main.tf line 7, in resource "aws_s3_bucket" "assets":
   7:   bucket = "myapp-assets-$__{var.env}"

An input variable with the name "env" has not been declared. This variable
can be declared with a variable "env" {} block.
~~~

---

## الخلاصة

| الحاجة | معناها |
|---|---|
| [[provider "aws"]] | الـ plugin اللي بيكلّم AWS، والصلاحيات من البيئة مش من الملف |
| [[resource "TYPE" "NAME"]] | مورد واحد: النوع من الـ provider، والاسم ليك انت |
| [[TYPE.NAME.attr]] | مرجع لخاصية مورد تاني، ومنه Terraform بيعرف الترتيب |
| [[variable]] و [[var.x]] | مدخلات، فنفس الكود يعمل dev و prod |
| [[output]] | قيم تطلع بعد التطبيق |

والأهم: الاسم اللي بعد النوع ([[assets]]) اسم جوه Terraform بس، لو غيّرته Terraform هيفهم إن ده مورد جديد ويمسح القديم. لو عايز تغيّره استخدم [[moved]] block.`,
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
          teach: R`## الفكرة: ٧ أوامر، دورة حياة البنية كلها

المثال هو الدورة الكاملة بالترتيب: جهّز، ونسّق، وافحص، وشوف هيعمل إيه، ونفّذ، وبص على اللي اتعمل، وامسح. كل الأوامر دي اتشغّلت فعلًا على ملف الـ bucket من الدرس اللي فات (نسخة الحل بـ [[var.env]])، بـ Terraform v1.16.5 في Docker و LocalStack 4.9 مكان AWS. والنواتج تحت حقيقية.

---

## ١. [[terraform init]]: جهّز الفولدر

~~~text الناتج
Initializing provider plugins...
- Finding latest version of hashicorp/aws...
- Installing hashicorp/aws v6.68.0...
- Installed hashicorp/aws v6.68.0 (signed by HashiCorp)

Terraform has created a lock file .terraform.lock.hcl to record the provider
selections it made above. Include this file in your version control repository
...
Terraform has been successfully initialized!
~~~

عمل حاجتين في الفولدر:

| الحاجة | هي إيه | Git؟ |
|---|---|---|
| [[.terraform/]] | الـ provider نفسه (برنامج). هنا كان حجمه حوالي ٨٠٠ ميجا | لأ، في [[.gitignore]] |
| [[.terraform.lock.hcl]] | النسخة اللي اتنزلت بالظبط وبصمتها | آه، زي [[package-lock.json]] |

[[init]] بتعمله أول مرة، وبعد أي تغيير في الـ providers أو الـ backend. وتعمله كام مرة ما تحب، مش بيغيّر حاجة في AWS.

---

## ٢. [[terraform fmt -recursive]]: نسّق

[[fmt]] من format. بيظبط المسافات والمحاذاة على الشكل الرسمي. و [[-recursive]] يعني والفولدرات اللي جوه كمان (الـ modules مثلًا). خرّبنا المسافات في سطر وشغّلناه:

~~~text الناتج
main.tf
~~~

بيطبع أسماء الملفات اللي عدّلها بس، ومش بيطبع حاجة لو كله سليم. وفي الـ CI بتستخدم [[terraform fmt -check -recursive]]: مش بيعدّل، بيفشل لو فيه ملف مش متنسّق.

---

## ٣. [[terraform validate]]: افحص من غير ما تكلّم AWS

~~~text الناتج
Success! The configuration is valid.
~~~

بيتأكد من الـ syntax، والأسماء، والأنواع، والمراجع ([[var.env]] متعرّف؟ [[aws_s3_bucket.assets]] موجود؟). مش بيسأل AWS عن حاجة، فبيشتغل في الـ CI من غير صلاحيات. لكنه مش بيعرف إن اسم الـ bucket محجوز لحد تاني مثلًا، دي بتظهر في الـ apply.

---

## ٤. [[terraform plan -out=tfplan]]: شوف واحفظ

[[plan]] بيعمل ٣ حاجات: يقرا الـ state (اللي Terraform عمله قبل كده)، ويسأل AWS عن الحالة الحقيقية (اسمها refresh)، ويقارن الاتنين بالكود. وبيطبع الفرق بالرموز دي:

| الرمز | المعنى |
|---|---|
| [[+]] | هيتعمل جديد |
| [[~]] | هيتعدّل في مكانه |
| [[-]] | هيتمسح |
| [[-/+]] | هيتمسح ويتعمل من جديد (replace) |

و [[-out=tfplan]] بيحفظ الـ plan في ملف اسمه [[tfplan]] (الاسم براحتك):

~~~text الناتج (آخره)
Plan: 2 to add, 0 to change, 0 to destroy.

Saved the plan to: tfplan

To perform exactly these actions, run the following command to apply:
    terraform apply "tfplan"
~~~

ليه نحفظه؟ عشان بين ما انت بتقرا الـ plan وبين ما تطبّق، حد ممكن يغيّر حاجة. الملف بيضمن إن اللي هيتنفذ هو بالظبط اللي انت شفته.

> ملف [[tfplan]] فيه قيم الـ state (ممكن يبقى فيها أسرار)، فمكانه مش Git.

---

## ٥. [[terraform apply tfplan]]: نفّذ

~~~text الناتج
aws_s3_bucket.assets: Creating...
aws_s3_bucket.assets: Creation complete after 0s [id=myapp-assets-dev]
aws_s3_bucket_public_access_block.assets: Creating...
aws_s3_bucket_public_access_block.assets: Creation complete after 0s [id=myapp-assets-dev]

Apply complete! Resources: 2 added, 0 changed, 0 destroyed.

Outputs:

bucket_arn = "arn:aws:s3:::myapp-assets-dev"
~~~

- الـ bucket الأول وبعده الـ access block، بسبب المرجع ([[aws_s3_bucket.assets.id]]).
- [[id=myapp-assets-dev]] الـ id الحقيقي اللي AWS رجّعه.
- مع ملف plan مش بيسأل [[yes]]. من غير ملف ([[terraform apply]] بس) بيعمل plan جديد ويستنى تكتب [[yes]].
- الـ ARN بتاع S3 من غير region ولا رقم حساب ([[arn:aws:s3:::]]) لأن أسماء الـ buckets فريدة على مستوى AWS كله.

وبعدها ظهر ملف جديد في الفولدر: [[terraform.tfstate]]. ده ذاكرة Terraform (الدرس الجاي). ولو شغّلت [[plan]] تاني على طول:

~~~text الناتج
aws_s3_bucket.assets: Refreshing state... [id=myapp-assets-dev]
aws_s3_bucket_public_access_block.assets: Refreshing state... [id=myapp-assets-dev]

No changes. Your infrastructure matches the configuration.
~~~

ده معنى «بيعمل الفرق بس»: الكود والواقع متطابقين، فمفيش حاجة تتعمل.

---

## ٦. [[terraform state list]]

~~~text الناتج
aws_s3_bucket.assets
aws_s3_bucket_public_access_block.assets
~~~

الموارد اللي Terraform مسؤول عنها، بعناوينها جوه Terraform. أي حاجة مش في القايمة دي (bucket عملته بالكونسول مثلًا) Terraform مش شايفها أصلًا.

---

## ٧. التجربة: غيّر الاسم وشوف [[-/+]]

~~~bash
terraform plan -var env=staging
~~~

~~~text الناتج (السطور المهمة)
  # aws_s3_bucket.assets must be replaced
-/+ resource "aws_s3_bucket" "assets" {
      ~ bucket                      = "myapp-assets-dev" -> "myapp-assets-staging" # forces replacement
  # aws_s3_bucket_public_access_block.assets must be replaced
      ~ bucket                  = "myapp-assets-dev" -> (known after apply) # forces replacement
Plan: 2 to add, 0 to change, 2 to destroy.
~~~

اقرا السطر ده كويس: [[~]] على الخانة، بس [[# forces replacement]] جنبها، والمورد كله [[-/+]]. يعني S3 مبيسمحش تغيّر اسم bucket، فالطريقة الوحيدة: امسح القديم واعمل جديد. والـ access block تابع له فاتمسح معاه. [[2 to destroy]] في سطر الخلاصة هو اللي لازم عينك تقف عنده.

---

## ٨. [[terraform destroy]]

حطينا ملف جوه الـ bucket الأول، وبعدين:

~~~text الناتج
Plan: 0 to add, 0 to change, 2 to destroy.

Do you really want to destroy all resources?
  Terraform will destroy all your managed infrastructure, as shown above.
  There is no undo. Only 'yes' will be accepted to confirm.

  Enter a value: yes

aws_s3_bucket_public_access_block.assets: Destroying... [id=myapp-assets-dev]
aws_s3_bucket_public_access_block.assets: Destruction complete after 0s
aws_s3_bucket.assets: Destroying... [id=myapp-assets-dev]

Error: deleting S3 Bucket (myapp-assets-dev): ... api error BucketNotEmpty: The bucket you tried to delete is not empty
~~~

لاحظ ٣ حاجات:

1. بيسأل، ومش بيقبل غير [[yes]] بالظبط (أي حاجة تانية = [[Destroy cancelled.]]).
2. المسح بالترتيب العكسي: التابع (الـ access block) الأول، وبعدين الـ bucket.
3. S3 رفض يمسح bucket فيه ملفات، وده حماية. فضّيناه ([[aws s3 rm s3://myapp-assets-dev --recursive]]) وشغّلنا [[destroy]] تاني:

~~~text الناتج
aws_s3_bucket.assets: Destroying... [id=myapp-assets-dev]
aws_s3_bucket.assets: Destruction complete after 0s

Destroy complete! Resources: 1 destroyed.
~~~

[[1 destroyed]] مش ٢، لأن الـ access block اتمسح في المحاولة الأولى، والـ state فاكر ده.

---

## الخلاصة

| الأمر | بيعمل إيه | بيكلّم AWS؟ |
|---|---|---|
| [[init]] | ينزّل الـ providers ويكتب الـ lock file | لأ |
| [[fmt -recursive]] | ينسّق الملفات | لأ |
| [[validate]] | يفحص الكود | لأ |
| [[plan -out=tfplan]] | يقارن ويحفظ اللي هيتعمل | يقرا بس |
| [[apply tfplan]] | ينفّذ الـ plan المحفوظ بالظبط | آه، بيغيّر |
| [[state list]] | الموارد اللي Terraform بيديرها | لأ |
| [[destroy]] | يمسح كل اللي في الـ state بعد [[yes]] | آه، بيمسح |

القاعدة: اقرا سطر [[Plan: X to add, Y to change, Z to destroy]] قبل أي apply، ولو [[Z]] مش صفر، دوّر على كل [[-]] و [[-/+]] واعرف ليه.`,
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
          teach: R`## الفكرة: الـ state هو ذاكرة Terraform، والـ block ده بيقول يحفظها فين

بعد أول [[apply]] بيظهر في الفولدر ملف [[terraform.tfstate]]. ده اللي بيربط [[aws_s3_bucket.assets]] اللي في الكود بالـ bucket الحقيقي [[myapp-assets-dev]] في AWS. والـ block اللي في المثال بيعمل حاجتين: يثبّت نسخ Terraform والـ provider، وينقل الملف ده من جهازك لـ S3 مع قفل (lock).

كل اللي تحت اتشغّل فعلًا: Terraform v1.16.5 في Docker، والـ S3 كان LocalStack 4.9. الـ block هو هو، والإعدادات اللي بتوجّه الـ backend لـ LocalStack (مفاتيح [[test]] وعنوان الـ endpoint) كانت في ملف جنبه اتبعت بـ [[-backend-config]]، وده مش محتاجه مع AWS الحقيقي.

---

## ١. الملف من جوه

بعد [[apply]] بالـ state المحلي، ده أول الملف:

~~~json terraform.tfstate (أوله)
{
  "version": 4,
  "terraform_version": "1.16.5",
  "serial": 3,
  "lineage": "1fe69403-fc75-21a7-2cba-c2fb2cc656a7",
  "outputs": {
    "bucket_arn": { "value": "arn:aws:s3:::myapp-assets-dev", "type": "string" }
  },
  "resources": [
    {
      "mode": "managed",
      "type": "aws_s3_bucket",
      "name": "assets",
      "instances": [ { "attributes": { "arn": "arn:aws:s3:::myapp-assets-dev", ... } } ]
~~~

| الخانة | معناها |
|---|---|
| [[serial]] | رقم بيزيد مع كل كتابة، عشان Terraform يعرف أنهي نسخة أحدث |
| [[lineage]] | بصمة ثابتة للـ state ده من أول ما اتعمل، عشان ميتخلطش بـ state بيئة تانية |
| [[resources]] | كل مورد: النوع والاسم وكل خصائصه الحقيقية |

كل خصائص المورد متخزنة هنا كنص عادي. لو المورد قاعدة بيانات، الباسورد هيبقى هنا. عشان كده الملف ده مكانه مش Git.

---

## ٢. [[required_version]] و [[required_providers]]

~~~hcl
terraform {
  required_version = ">= 1.11"
  required_providers {
    aws = { source = "hashicorp/aws", version = "~> 6.0" }
  }
~~~

- [[terraform { }]] block إعدادات Terraform نفسه، مش مورد.
- [[required_version = ">= 1.11"]] لو حد شغّل نسخة أقدم من 1.11، Terraform يرفض يشتغل. ليه 1.11؟ لأن [[use_lockfile]] (تحت) بقى رسمي من النسخة دي.
- [[aws = { ... }]] الـ provider اللي اسمه [[aws]] جوه الكود:
  - [[source = "hashicorp/aws"]] جاي منين: من الـ Terraform Registry، صاحبه [[hashicorp]].
  - [[version = "~> 6.0"]] أي 6.x (6.0 و 6.68...) بس مش 7.0. [[~>]] اسمه pessimistic constraint: آخر رقم مكتوب بس هو اللي يزيد.

[[terraform providers]] بيوريك القيد ده:

~~~text الناتج
Providers required by configuration:
.
└── provider[registry.terraform.io/hashicorp/aws] ~> 6.0
~~~

والـ lock file ([[.terraform.lock.hcl]]) بيثبّت النسخة بالظبط اللي اتنزلت جوه القيد ده (هنا 6.68.0)، فكل الفريق والـ CI ياخدوا نفس النسخة.

---

## ٣. [[backend "s3"]]

~~~hcl
  backend "s3" {
    bucket       = "myapp-tfstate"
    key          = "prod/terraform.tfstate"
    region       = "eu-central-1"
    use_lockfile = true
    encrypt      = true
  }
~~~

| الخانة | معناها |
|---|---|
| [[bucket]] | الـ bucket اللي الـ state هيتحفظ فيه. لازم يبقى موجود قبل كده |
| [[key]] | مسار الملف جوه الـ bucket. [[prod/]] لبيئة و [[staging/]] لبيئة تانية |
| [[region]] | region الـ bucket ده (ممكن يبقى غير region الموارد نفسها) |
| [[use_lockfile = true]] | قفل: ملف [[.tflock]] جنب الـ state طول ما فيه عملية شغالة |
| [[encrypt = true]] | الملف يتشفّر وهو متخزّن في S3 |

> جوه الـ backend مينفعش تستخدم [[var.x]]. القيم ثابتة، أو تتبعت وقت [[init]] بـ [[-backend-config]].

### الـ bucket نفسه اتعمل بإيدك الأول

~~~bash
aws s3api create-bucket --bucket myapp-tfstate --create-bucket-configuration LocationConstraint=eu-central-1
aws s3api put-bucket-versioning --bucket myapp-tfstate --versioning-configuration Status=Enabled
~~~

[[LocationConstraint]] لازم مع أي region غير [[us-east-1]]. والـ versioning عشان كل نسخة من الـ state تفضل محفوظة، فلو حاجة باظت ترجع للنسخة اللي قبلها.

---

## ٤. [[terraform init -migrate-state]]: انقل الملف

كان عندنا state محلي فيه الـ bucket. ضفنا الـ block وشغّلنا:

~~~text الناتج
Pre-existing state was found while migrating the previous "local" backend to the
newly configured "s3" backend. No existing state was found in the newly
configured "s3" backend. Do you want to copy this state to the new "s3"
backend? Enter "yes" to copy and "no" to start with an empty state.

  Enter a value: yes

Successfully configured the backend "s3"! Terraform will automatically
use this backend unless the backend configuration changes.
~~~

وبعدها:

~~~text aws s3api list-object-versions --bucket myapp-tfstate
prod/terraform.tfstate           AaEbRsz859UX.r0JIhOxB2A2O339P30y   3944
prod/terraform.tfstate.tflock    AaEbRsz7VrNtAeOeQMck9g0waZCxggsd   231
~~~

- الـ state بقى في [[prod/terraform.tfstate]] (٣٩٤٤ بايت).
- الـ [[.tflock]] اتعمل وقت الـ init واتمسح بعدها. بيظهر هنا لأن الـ versioning بيحتفظ بأي حاجة اتكتبت.
- [[terraform.tfstate]] المحلي بقى ٠ بايت، وجنبه [[terraform.tfstate.backup]] فيه النسخة القديمة.
- [[terraform plan]] بعدها قال [[No changes]]، يعني Terraform لسه فاكر كل حاجة، بس من S3.

---

## ٥. الـ lock: اتنين في نفس اللحظة

فتحنا [[terraform apply]] في ترمنال وسيبناه واقف عند [[Enter a value:]] (هو ماسك الـ lock). وفي التاني [[terraform plan]]:

~~~text الناتج
Error: Error acquiring the state lock

Error message: operation error S3: PutObject, https response error
StatusCode: 412, ...
api error PreconditionFailed: At least one of the pre-conditions you
specified did not hold
Lock Info:
  ID:        53ef929b-bc49-3069-7fff-927fe3bb9450
  Path:      myapp-tfstate/prod/terraform.tfstate
  Operation: OperationTypeApply
  Who:       root@de09cf996713
  Version:   1.16.5
  Created:   2026-10-08 11:30:45.473013785 +0000 UTC
~~~

إزاي القفل ده شغال؟ Terraform بيحاول يكتب [[.tflock]] بشرط «اكتبه بس لو مش موجود». الملف كان موجود (التاني ماسكه)، فـ S3 رفض بـ [[412 PreconditionFailed]]. ومن غير DynamoDB خالص.

| السطر | معناه |
|---|---|
| [[ID]] | رقم الـ lock، ده اللي بيتكتب في [[terraform force-unlock ID]] |
| [[Path]] | الـ bucket والمسار |
| [[Operation]] | الماسك بيعمل إيه: هنا [[apply]] |
| [[Who]] | اليوزر والجهاز (هنا container) |
| [[Created]] | من إمتى ماسكه |

ولما الأول اتقفل ([[Apply cancelled.]])، الـ lock اتشال، و [[plan]] اشتغل عادي.

---

## الخلاصة

| الحاجة | ليه |
|---|---|
| [[required_version]] | الكل يشغّل نسخة Terraform مناسبة |
| [[~> 6.0]] + lock file | نفس نسخة الـ provider عند الكل |
| [[backend "s3"]] + [[key]] لكل بيئة | الـ state مشترك ومش على لابتوب حد |
| [[use_lockfile]] | اتنين ميكتبوش في نفس الوقت |
| versioning على الـ bucket | ترجع لو الـ state باظ |

والـ state فيه أسرار: [[terraform.tfstate]] و [[*.tfstate.backup]] و [[.terraform/]] في [[.gitignore]] دايمًا.`,
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
          sol: R`[[terraform init -migrate-state]] بيسألك [[Do you want to copy this state to the new "s3" backend?]]، تكتب [[yes]]، وبعدها [[Successfully configured the backend "s3"!]]. وفي الـ bucket هتلاقي [[prod/terraform.tfstate]]، ومع versioning كل apply بيعمل version جديدة ترجع لها لو الـ state باظ. وتقدر تمسح [[terraform.tfstate]] المحلي بعد ما تتأكد إن [[terraform plan]] بيقول [[No changes]].

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
          teach: R`## الفكرة: «مين يقدر يلبس الـ role دي؟»

أي IAM role ليها حاجتين: صلاحيات (تقدر تعمل إيه)، و **trust policy** (مين مسموح له يلبسها أصلًا). المثال هو الـ trust policy، وبتقول: «اللي يلبسني هو توكن من GitHub، معمول لـ AWS، وجاي من repo [[myorg/myapp]] على branch [[main]] بس».

اتجرّب كده: الـ JSON اتفحص، والـ provider والـ role والـ policy اتعملوا بأوامر الـ solCode على LocalStack 4.9 (محاكي AWS في Docker، رقم الحساب فيه [[000000000000]])، وعملنا [[AssumeRoleWithWebIdentity]] بتوكن تجربة شكله زي توكن GitHub. والـ workflow عدّى من [[actionlint]] (أداة بتفحص ملفات GitHub Actions). اللي محتاج GitHub و AWS حقيقيين (التوكن الحقيقي ورسايل الرفض) من الـ docs ومكتوب كده تحت.

---

## ١. الرحلة كلها في ٤ خطوات

1. الـ job في GitHub Actions بيطلب من GitHub توكن (JWT: نص موقّع فيه معلومات). ده مسموح بس لو الـ workflow فيه [[id-token: write]].
2. الـ action [[configure-aws-credentials]] بيبعت التوكن ده لـ STS (Security Token Service: الخدمة اللي بتدّي مفاتيح مؤقتة) ويطلب يلبس الـ role.
3. AWS يتأكد إن التوقيع من GitHub فعلًا (بالـ provider اللي سجّلته مرة واحدة)، وبعدين يقارن التوكن بالـ trust policy.
4. لو مطابق: مفاتيح مؤقتة لمدة ساعة. لو لأ: رفض.

---

## ٢. التوكن نفسه شكله إيه؟

الـ JWT ٣ أجزاء بينهم نقط، والجزء الأوسط JSON. ده الجزء الأوسط من توكن التجربة (نفس الخانات اللي GitHub بيحطها، حسب الـ docs):

~~~json
{
  "iss": "https://token.actions.githubusercontent.com",
  "aud": "sts.amazonaws.com",
  "sub": "repo:myorg/myapp:ref:refs/heads/main",
  "repository": "myorg/myapp",
  "ref": "refs/heads/main",
  "iat": 1791459222,
  "exp": 1791459522
}
~~~

| الخانة (claim) | معناها |
|---|---|
| [[iss]] | issuer: مين اللي عمل التوكن (GitHub) |
| [[aud]] | audience: التوكن معمول لمين (هنا STS بتاع AWS) |
| [[sub]] | subject: مين صاحبه: الـ repo والـ branch |
| [[iat]] و [[exp]] | وقت الإصدار والانتهاء (ثواني من 1970). التوكن بيعيش دقايق |

الـ trust policy بتشتغل على [[aud]] و [[sub]] بالظبط.

---

## ٣. الـ trust policy سطر سطر

~~~json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
~~~

- [[Version]] إصدار لغة الـ policies، وده التاريخ الثابت اللي بيتكتب دايمًا. مش تاريخ النهارده.
- [[Statement]] قايمة قواعد (الأقواس المربعة في JSON معناها قايمة)، وهنا قاعدة واحدة.
- [[Effect: Allow]] القاعدة دي بتسمح.

~~~json
    "Principal": { "Federated": "arn:aws:iam::123456789012:oidc-provider/token.actions.githubusercontent.com" },
    "Action": "sts:AssumeRoleWithWebIdentity",
~~~

- [[Principal]] مين اللي القاعدة عنه. [[Federated]] يعني هوية من برا AWS، والـ ARN ده هو الـ OIDC provider اللي سجّلته في حسابك ([[123456789012]] رقم حسابك).
- [[Action]] الفعل المسموح: يلبس الـ role بتوكن ويب (OIDC = OpenID Connect، المعيار اللي التوكن ده ماشي عليه).

~~~json
    "Condition": {
      "StringEquals": {
        "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
        "token.actions.githubusercontent.com:sub": "repo:myorg/myapp:ref:refs/heads/main"
      }
    }
~~~

- [[Condition]] شروط لازم تتحقق كلها.
- [[StringEquals]] مقارنة نص بالظبط، حرف بحرف.
- [[token.actions.githubusercontent.com:aud]] اسم الخانة [[aud]] في التوكن اللي جاي من الـ provider ده.
- سطر الـ [[sub]] هو **القفل الحقيقي**: repo واحد، و branch واحد.

من غير سطر الـ [[sub]]، أي repo على GitHub كله (حتى بتاع حد غريب) يقدر يطلب توكن [[aud]] بتاعه [[sts.amazonaws.com]] ويلبس الـ role بتاعتك.

### أشكال الـ [[sub]] (من docs GitHub)

| الـ workflow شغال إزاي | الـ [[sub]] |
|---|---|
| push على branch | [[repo:myorg/myapp:ref:refs/heads/main]] |
| job عليه [[environment: production]] | [[repo:myorg/myapp:environment:production]] |
| [[pull_request]] | [[repo:myorg/myapp:pull_request]] |

---

## ٤. الأوامر اللي في الحل

~~~bash
aws iam create-open-id-connect-provider --url https://token.actions.githubusercontent.com --client-id-list sts.amazonaws.com
~~~

بتسجّل GitHub كمصدر هويات موثوق في الحساب. [[--client-id-list]] هي قيم الـ [[aud]] المقبولة. على LocalStack:

~~~text الناتج
{
    "OpenIDConnectProviderArn": "arn:aws:iam::000000000000:oidc-provider/token.actions.githubusercontent.com"
}
~~~

ده بالظبط الـ ARN اللي بيتكتب في [[Principal.Federated]].

~~~bash
aws iam create-role --role-name github-readonly --assume-role-policy-document file://trust-github.json
aws iam put-role-policy --role-name github-readonly --policy-name list-site --policy-document '{...s3:ListBucket...}'
~~~

- [[--assume-role-policy-document]] هي الـ trust policy. و [[file://]] يعني «اقرا من الملف ده».
- [[put-role-policy]] الصلاحيات نفسها (inline policy): [[s3:ListBucket]] على [[arn:aws:s3:::myapp-site]] بس. الـ ListBucket بيتدّى على الـ bucket نفسه، مش على [[myapp-site/*]] (دي للملفات اللي جواه).

وبعدين لبسنا الـ role بتوكن التجربة:

~~~bash
aws sts assume-role-with-web-identity --role-arn arn:aws:iam::000000000000:role/github-readonly --role-session-name GitHubActions --web-identity-token "$TOK" --duration-seconds 3600
~~~

~~~text الناتج
{
    "Credentials": {
        "AccessKeyId": "LSIAQAAAAAAAAR5A...",
        "SecretAccessKey": "JeunR6BA...",
        "SessionToken": "FQoGZXIvYXdz...",
        "Expiration": "2026-10-08T12:33:43.046209Z"
    },
    "AssumedRoleUser": {
        "AssumedRoleId": "ARO123EXAMPLE123:GitHubActions",
        "Arn": "arn:aws:sts::000000000000:assumed-role/github-readonly/GitHubActions"
    }
}
~~~

- ٣ قيم مع بعض: المفتاح، والسر، و [[SessionToken]]. المفاتيح المؤقتة مش بتشتغل من غير الـ session token.
- [[Expiration]] بعد ساعة ([[--duration-seconds 3600]]). بعدها المفاتيح ميتة، حتى لو اتسرّبت.
- الـ ARN بتاع [[assumed-role/ROLE/SESSION]]: ده اللي [[aws sts get-caller-identity]] بيطبعه جوه الـ job، و [[GitHubActions]] هو اسم الجلسة اللي الـ action بيحطه.

> LocalStack المجاني مش بيتحقق من التوقيع ولا من الـ Condition: جرّبنا توكن [[sub]] بتاعه [[refs/heads/feature-x]] واتقبل برضه. في AWS الحقيقي ده بيترفض برسالة [[Not authorized to perform sts:AssumeRoleWithWebIdentity]] (من الـ docs).

---

## ٥. الـ workflow

~~~yaml
permissions:
  id-token: write
  contents: read
~~~

[[id-token: write]] الإذن اللي بيخلّي GitHub يدّي الـ job توكن. والاسم فيه [[write]] لأنه «إذن إنك تطلب توكن»، مش كتابة في حاجة.

~~~yaml
      - uses: aws-actions/configure-aws-credentials@v6
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-readonly
          aws-region: eu-central-1
~~~

[[@v6]] نسخة الـ action (آخر إصدار وقت الكتابة 6.3.0). والـ action بيعمل الخطوات ٢ و ٤ اللي فوق ويحط المفاتيح متغيرات بيئة للـ steps اللي بعده، فـ [[aws sts get-caller-identity]] و [[aws s3 ls]] يشتغلوا من غير ما تكتب مفتاح.

و [[actionlint]] على الملف عدّى من غير أخطاء. وجرّبنا نكتب اسم input غلط ([[role-to-asume]]):

~~~text الناتج
whoami.yml:12:11: input "role-to-asume" is not defined in action "aws-actions/configure-aws-credentials@v6". available inputs are ... "role-to-assume", ...
~~~

بس [[actionlint]] مش بيمسك نسيان [[id-token: write]]. ده بيظهر وقت التشغيل بس.

---

## الخلاصة

| الحتة | دورها |
|---|---|
| OIDC provider | AWS يثق في توقيع GitHub |
| [[Principal.Federated]] | القاعدة للتوكنات اللي جاية من الـ provider ده |
| [[aud]] = [[sts.amazonaws.com]] | التوكن معمول لـ AWS |
| [[sub]] = repo + branch | **مين بالظبط**: أهم سطر |
| [[id-token: write]] | الـ job يقدر يطلب توكن |
| المفاتيح الراجعة | مؤقتة لساعة، ومفيش سر متخزن في GitHub |`,
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
          teach: R`## الفكرة: ٣ أجزاء: إمتى، وبأنهي صلاحيات، وإيه الخطوات

الملف ده بيقول لـ GitHub: «مع كل push على main، شغّل جهاز Ubuntu، هات الكود، البس الـ role بتاعة الـ deploy، ابني الموقع، وارفعه على S3، وامسح [[index.html]] من كاش CloudFront».

اتجرّب كده: الملف عدّى من [[actionlint]] من غير أخطاء. وخطوات الـ shell نفسها اتشغّلت: [[npm ci && npm run build]] على مشروع صغير بيطلّع [[dist/]]، والـ [[aws s3 sync]] و [[aws s3 cp]] على LocalStack 4.9. الـ CloudFront مش موجود في LocalStack المجاني، فـ [[create-invalidation]] وتشغيل الـ workflow على GitHub نفسه من الـ docs.

---

## ١. [[on]]: إمتى يشتغل

~~~yaml
on: { push: { branches: [main] } }
~~~

نفس الكلام ده مكتوب بالشكل الطويل:

~~~yaml
on:
  push:
    branches: [main]
~~~

[[{ }]] في YAML طريقة تكتب object في سطر واحد، و [[branches]] قيمتها قايمة (الأقواس المربعة) فيها عنصر واحد. المعنى: push على branch [[main]] بس. push على أي branch تاني أو PR مش هيشغّله.

---

## ٢. [[permissions]]

~~~yaml
permissions:
  id-token: write
  contents: read
~~~

أول ما تكتب [[permissions]] بإيدك، أي صلاحية مش مكتوبة بتبقى [[none]]. فلازم الاتنين:

| الصلاحية | ليه |
|---|---|
| [[id-token: write]] | الـ job يقدر يطلب توكن OIDC من GitHub (الدرس اللي فات) |
| [[contents: read]] | [[actions/checkout]] يقدر يقرا الكود |

---

## ٣. الـ job

~~~yaml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
~~~

- [[jobs]] قايمة الشغلانات، و [[deploy]] اسم الـ job (براحتك).
- [[runs-on: ubuntu-latest]] جهاز Ubuntu جديد ونضيف لكل تشغيل (runner)، وعليه AWS CLI و Node جاهزين.
- [[steps]] الخطوات بالترتيب. كل [[- ]] خطوة.

---

## ٤. الخطوات الجاهزة: [[uses]]

~~~yaml
      - uses: actions/checkout@v7
      - uses: aws-actions/configure-aws-credentials@v6
        with:
          role-to-assume: arn:aws:iam::123456789012:role/github-deploy
          aws-region: eu-central-1
~~~

- [[uses]] شغّل action جاهز (كود حد تاني على GitHub). [[@v7]] النسخة: ثبّتها، متكتبش [[@main]].
- [[actions/checkout@v7]] بينزّل كود الـ repo على الـ runner (آخر إصدار وقت الكتابة 7.0.1).
- [[configure-aws-credentials@v6]] بياخد توكن OIDC ويبدّله بمفاتيح مؤقتة للـ role، ويحطهم في [[AWS_ACCESS_KEY_ID]] و [[AWS_SECRET_ACCESS_KEY]] و [[AWS_SESSION_TOKEN]] للخطوات اللي بعده.
- [[with]] المدخلات بتاعة الـ action: الـ role والـ region.

> الـ role اسمها [[github-deploy]] مش [[github-readonly]] بتاعة الدرس اللي فات: role لكل شغلانة، بصلاحياتها بس.

---

## ٥. أول [[run]]: ابني وارفع الـ assets

~~~bash
npm ci && npm run build && aws s3 sync dist/assets s3://myapp-site/assets --cache-control "public,max-age=31536000,immutable"
~~~

ده ٣ أوامر مربوطين بـ [[&&]]: «شغّل اللي بعدي **بس لو** اللي قبلي نجح». يعني لو الـ build وقع، مفيش رفع لملفات ناقصة. جرّبنا build بايظ:

~~~text الناتج
npm error Missing script: "nosuch"
exit code: 1
~~~

ومحصلش رفع. والـ step كلها فشلت بـ exit code غير صفر، فالـ workflow وقف.

### [[npm ci]]

بيسطّب نفس النسخ اللي في [[package-lock.json]] بالظبط، وبيمسح [[node_modules]] الأول. ده المناسب للـ CI بدل [[npm install]] (اللي ممكن يحدّث الـ lock).

### [[npm run build]]

~~~text الناتج (مشروع التجربة)
built dist/assets/index-01b46e2e.js
~~~

اسم الملف فيه hash ([[01b46e2e]]) محسوب من المحتوى. أي تغيير في الكود = اسم جديد. ده اللي هيخلّي الكاش الطويل آمن.

### [[aws s3 sync dist/assets s3://myapp-site/assets]]

[[sync]] بيقارن الفولدر المحلي بالـ bucket ويرفع الجديد والمتغير بس:

~~~text أول مرة
upload: dist/assets/index-01b46e2e.js to s3://myapp-site/assets/index-01b46e2e.js
~~~

~~~text تاني مرة على طول
(مفيش ولا سطر: كل حاجة موجودة)
~~~

### [[--cache-control "public,max-age=31536000,immutable"]]

ده الهيدر اللي S3 هيرجّعه مع كل ملف من دول. اتأكدنا منه بعد الرفع:

~~~text aws s3api head-object ... --key assets/index-01b46e2e.js
public,max-age=31536000,immutable    text/javascript
~~~

| الحتة | معناها |
|---|---|
| [[public]] | أي كاش (المتصفح أو CloudFront) يخزّنه |
| [[max-age=31536000]] | لمدة ٣١٥٣٦٠٠٠ ثانية = ٣٦٥ × ٢٤ × ٦٠ × ٦٠ = سنة |
| [[immutable]] | الملف ده مش هيتغير أبدًا، فالمتصفح ميسألش تاني حتى مع refresh |

آمن ليه؟ لأن الاسم بيتغير مع المحتوى، فالنسخة الجديدة اسمها جديد أصلًا.

---

## ٦. تاني [[run]]: [[index.html]] و CloudFront

~~~bash
aws s3 cp dist/index.html s3://myapp-site/index.html --cache-control no-cache && aws cloudfront create-invalidation --distribution-id E1ABCDEF2GHIJK --paths "/index.html"
~~~

### [[aws s3 cp ... --cache-control no-cache]]

[[cp]] ملف واحد. و [[no-cache]] مش معناها «متخزنش»، معناها «خزّن بس اسأل السيرفر قبل كل استخدام». ليه؟ [[index.html]] هو اللي فيه اسم ملف الـ JS الجديد، فلازم يتجدد مع كل deploy:

~~~text الناتج
upload: dist/index.html to s3://myapp-site/index.html
no-cache    text/html
~~~

### [[aws cloudfront create-invalidation]]

CloudFront ممكن يكون شايل نسخة قديمة من [[index.html]] على الـ edge. الـ invalidation بيقوله «ارمي النسخة دي من الكاش». [[--distribution-id]] رقم الـ distribution بتاعتك، و [[--paths "/index.html"]] الملف ده بس، مش [[/*]] (الـ assets أسماءها جديدة، مش محتاجة). الرد (من الـ docs) JSON فيه [[Invalidation.Status: InProgress]] وبيخلص في دقايق. على LocalStack المجاني:

~~~text الناتج
An error occurred (InternalFailure) when calling the CreateInvalidation operation: The API for service 'cloudfront' is either not included in your current license plan or has not yet been emulated by LocalStack.
~~~

### ليه الـ assets الأول و index.html الأخير؟

لو [[index.html]] الجديد اترفع الأول، أي حد يفتح الموقع في الثواني دي هيطلب [[index-NEW.js]] وهو لسه مترفعش = صفحة بيضا. بالترتيب ده، الملفات الجديدة موجودة قبل ما أي حد يشاور عليها.

---

## الخلاصة

| الجزء | بيعمل إيه |
|---|---|
| [[on: push: branches]] | يشتغل مع push على main بس |
| [[permissions]] | توكن OIDC + قراية الكود، ولا حاجة تانية |
| [[checkout]] ثم [[configure-aws-credentials]] | الكود، وبعدين مفاتيح مؤقتة من الـ role |
| [[npm ci && npm run build && sync]] | ابني، ولو نجح ارفع الـ assets بكاش سنة |
| [[cp index.html --cache-control no-cache]] | الـ HTML يتسأل عنه كل مرة |
| [[create-invalidation]] | CloudFront يرمي النسخة القديمة من الـ HTML |

ومفيش أي مفتاح AWS مكتوب في أي حتة.`,
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
    }
]);

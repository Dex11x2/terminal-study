// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
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
          teach: R`## الفكرة: الـ CLI لازم يعرف «انت مين» قبل أي أمر

كل أمر [[aws ...]] بيتبعت لـ AWS موقّع بمفاتيح. السؤال كله: المفاتيح دي جاية منين؟ المثال بيوريك ٣ طرق تجيبها (login و SSO و configure)، وإزاي تختار بينهم بالـ profile، وإزاي تتأكد انت مين.

اتجرّب بـ AWS CLI 2.37 في صورة [[amazon/aws-cli]] الرسمية، بملف config فيه profiles وهمية ومن غير حساب AWS. فالأوامر اللي محتاجة متصفح وحساب حقيقي ([[aws login]] و [[sso login]]) شكلها من الـ docs ومن الـ help، والباقي ناتجه حقيقي.

---

## ١. [[aws --version]]

~~~text الناتج
aws-cli/2.37.10 Python/3.14.6 Linux/6.6.87.2-microsoft-standard-WSL2 docker/x86_64.amzn.2023
~~~

| الحتة | معناها |
|---|---|
| [[aws-cli/2.37.10]] | النسخة. أول رقم [[2]] يعني v2، و [[aws login]] محتاج 2.32 أو أحدث |
| [[Python/3.14.6]] | الـ CLI مكتوب Python، وv2 جايب نسخته معاه فمش محتاج تسطّبها |
| [[Linux/...]] | النظام. هنا Linux جوه WSL عشان Docker على ويندوز |
| [[docker/...]] | اتسطّب إزاي (هنا صورة Docker). على ويندوز هتلاقي [[exe/AMD64]] |

---

## ٢. [[aws login --profile personal]]

| الحتة | معناها |
|---|---|
| [[login]] | ادخل من المتصفح بنفس دخول الكونسول |
| [[--profile personal]] | احفظ النتيجة باسم [[personal]]. الـ profile مجرد اسم لمجموعة إعدادات |

حسب الـ help: كل مرة بتعمل [[login]] الـ CLI بياخد مفاتيح مؤقتة و refresh token، ويجدد المفاتيح لوحده طول ما الـ refresh token صالح. وفيه [[--remote]] لو انت على سيرفر بـ SSH ومفيش متصفح: بيطبع رابط تفتحه على جهازك وتلزق الكود. والنتيجة في [[~/.aws/config]] سطر [[login_session]]:

~~~text ~/.aws/config
[profile personal]
login_session = arn:aws:iam::123456789012:user/ali
region = eu-central-1
~~~

و [[~]] يعني فولدر اليوزر بتاعك ([[C:\Users\ali]] على ويندوز). مفيش أي مفتاح مكتوب هنا: المفاتيح المؤقتة في [[~/.aws/login/cache]].

---

## ٣. [[aws configure sso --profile work]] و [[aws sso login --profile work]]

ده لو الشركة عاملة IAM Identity Center (اسمه القديم AWS SSO = Single Sign-On: دخول واحد لكل الحسابات). [[configure sso]] بيسألك عن رابط البداية والـ region، ويفتح المتصفح، وبعدين تختار الحساب والـ role، ويكتب كده:

~~~text ~/.aws/config
[profile work]
sso_session = mycompany
sso_account_id = 111122223333
sso_role_name = Developer
region = eu-central-1

[sso-session mycompany]
sso_start_url = https://mycompany.awsapps.com/start
sso_region = eu-central-1
sso_registration_scopes = sso:account:access
~~~

| السطر | معناه |
|---|---|
| [[sso_session]] | اسم جلسة الدخول، ممكن كذا profile يشاركوها |
| [[sso_account_id]] | الحساب اللي هتشتغل عليه |
| [[sso_role_name]] | الـ role (الـ permission set) اللي هتلبسها |
| [[sso_start_url]] | رابط بوابة الشركة |

وبعدها [[aws sso login --profile work]] كل ما الجلسة تخلص (غالبًا كل كام ساعة). لو نسيته، أي أمر بيرجّع:

~~~text الناتج من غير sso login
aws: [ERROR]: Error loading SSO Token: Token for mycompany does not exist
~~~

---

## ٤. [[aws configure list-profiles]]

~~~text الناتج
default
personal
work
~~~

بيقرا الملفين ويطبع كل الأسامي. [[default]] ده اللي بيتستخدم لما متحددش profile.

---

## ٥. [[export AWS_PROFILE=work]]

[[export]] في bash بيعمل متغير بيئة للترمنال ده وأي برنامج يشتغل منه. فكل أمر [[aws]] بعدها هيروح لـ [[work]] من غير [[--profile]]. والأمر [[aws configure list]] بيقولك هو جاب الـ profile منين:

~~~text الناتج
NAME       : VALUE                    : TYPE             : LOCATION
profile    : work                     : env              : ['AWS_PROFILE', 'AWS_DEFAULT_PROFILE']
~~~

[[TYPE: env]] يعني من متغير بيئة. وفي PowerShell نفس الحاجة: [[$env:AWS_PROFILE = "work"]].

---

## ٦. [[aws sts get-caller-identity]]

[[sts]] هي Security Token Service، و [[get-caller-identity]] «أنا مين؟». أمر مبيحتاجش أي صلاحية، فبيشتغل مع أي هوية. على LocalStack طلع:

~~~text الناتج
{
    "UserId": "AKIAIOS...EXAMPLE",
    "Account": "000000000000",
    "Arn": "arn:aws:iam::000000000000:root"
}
~~~

| الخانة | معناها |
|---|---|
| [[UserId]] | رقم داخلي للهوية |
| [[Account]] | رقم الحساب (١٢ رقم). على LocalStack أصفار |
| [[Arn]] | اسم الهوية الكامل. [[:root]] هنا لأن LocalStack بيعتبر المفتاح الوهمي root، وعلى حسابك هتلاقي [[user/ali]] أو [[assumed-role/...]] |

---

## ٧. [[aws logout --profile personal]]

~~~text الناتج
Removed cached login credentials for profile 'personal'. Note, any local developer tools that have already loaded the access token may continue to use it until its expiration. Access tokens expire in 15 minutes.
~~~

بيمسح المفاتيح المؤقتة من الكاش. ولاحظ التحذير: أي برنامج كان خد المفتاح يقدر يكمّل بيه لحد ما يخلص، وده بعد ١٥ دقيقة بالكتير.

---

## والطريقة القديمة: [[aws configure]]

مش في المثال، بس لازم تعرف هي بتكتب إيه. جرّبناها بمفاتيح وهمية:

~~~text ~/.aws/credentials
[old]
aws_access_key_id = FAKEKEYID123
aws_secret_access_key = fakeSecret456
~~~

ده مفتاح **دايم** مكتوب نص عادي على الديسك: أي حد يقرا الملف معاه حسابك لحد ما تمسح المفتاح من IAM. وحتى الـ CLI نفسه بقى بيطبع وانت بتعمله: [[Tip: You can deliver temporary credentials ... by running the command 'aws login']].

---

## الخلاصة

| الطريقة | المفاتيح فين | بتموت؟ | إمتى |
|---|---|---|---|
| [[aws login]] | [[~/.aws/login/cache]] | أيوه، وبتتجدد لحد ١٢ ساعة | حسابك الشخصي |
| [[configure sso]] + [[sso login]] | كاش الـ SSO | أيوه | فريق أو أكتر من حساب |
| [[aws configure]] | [[~/.aws/credentials]] | لأ، لحد ما تمسحه | آخر حل، لأداة مبتدعمش غيره |

> قبل أي أمر خطير: [[aws sts get-caller-identity]]. متغير [[AWS_PROFILE]] منسي في ترمنال مفتوح هو أسهل طريقة تمسح حاجة في prod وانت فاكر نفسك في dev.`,
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
          teach: R`## الفكرة: نعمل «هوية» لسيرفر، من غير ولا مفتاح

المثال بيبني role لسيرفر EC2 في ٥ خطوات، وبعدين يتأكد من جوه السيرفر إنه شايفها. كل خطوة بتجاوب سؤال: مين يلبسها؟ تعمل إيه؟ وتتربط بالسيرفر إزاي؟

اتجرّب بـ AWS CLI 2.37 على LocalStack (محاكي AWS في Docker بمفاتيح وهمية). أوامر IAM كلها اشتغلت هناك ونواتجها تحت. اللي متجرّبش: السطر الأخير من جوه سيرفر EC2 حقيقي، وده كتبنا شكله من الـ docs وعملنا نفس الحركة بـ [[sts assume-role]] عشان تشوف الناتج.

---

## قبل الأوامر: الـ trust policy

~~~json
{"Version":"2012-10-17","Statement":[{"Effect":"Allow","Principal":{"Service":"ec2.amazonaws.com"},"Action":"sts:AssumeRole"}]}
~~~

| الخانة | معناها |
|---|---|
| [[Effect: Allow]] | اسمح |
| [[Principal]] | لمين؟ الـ principal هو «اللي بيطلب» |
| [[Service: ec2.amazonaws.com]] | لخدمة EC2 نفسها |
| [[Action: sts:AssumeRole]] | إنها «تلبس» الـ role دي. [[sts]] هي الخدمة اللي بتطلّع المفاتيح المؤقتة |

يعني الملف ده مش بيدّي صلاحية على حاجة، هو بيقول **مين** مسموح يبقى الـ role. ده ملف [[trust-ec2.json]] اللي في الـ try.

---

## ١. [[aws iam create-role ...]]

~~~bash
aws iam create-role --role-name myapp-ec2 --assume-role-policy-document file://trust-ec2.json
~~~

| الحتة | معناها |
|---|---|
| [[create-role]] | اعمل role |
| [[--role-name myapp-ec2]] | اسمها |
| [[--assume-role-policy-document]] | الـ trust policy (اسمها الرسمي في الـ API كده) |
| [[file://trust-ec2.json]] | من الملف |

الرد JSON طويل. بـ [[--query "Role.[RoleName,Arn]"]] طلّعنا المهم:

~~~text الناتج
[
    "myapp-ec2",
    "arn:aws:iam::000000000000:role/myapp-ec2"
]
~~~

الـ ARN (Amazon Resource Name) هو العنوان الكامل: [[arn:aws:iam::ACCOUNT:role/NAME]]. خانة الـ region فاضية ([[::]]) لأن IAM خدمة global.

---

## ٢. [[aws iam attach-role-policy ...]]

~~~bash
aws iam attach-role-policy --role-name myapp-ec2 --policy-arn arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore
~~~

[[attach]] يعني «اربط policy موجودة». الـ ARN فيه [[aws]] مكان رقم الحساب، ودي علامة إنها **AWS managed policy**: AWS كاتبها وبتحدّثها. ودي بالذات بتسمح للسيرفر يتدار بـ Session Manager (ترمنال من غير SSH). الأمر مبيطبعش حاجة لو نجح، ونتأكد:

~~~text aws iam list-attached-role-policies --role-name myapp-ec2
{
    "AttachedPolicies": [
        {
            "PolicyName": "AmazonSSMManagedInstanceCore",
            "PolicyArn": "arn:aws:iam::aws:policy/AmazonSSMManagedInstanceCore"
        }
    ]
}
~~~

---

## ٣. [[aws iam put-role-policy ...]]

~~~bash
aws iam put-role-policy --role-name myapp-ec2 --policy-name s3-uploads --policy-document file://s3-uploads.json
~~~

[[put]] مش [[attach]]: دي **inline policy**، مكتوبة جوه الـ role نفسها وبتتمسح معاها، مش policy مستقلة ليها ARN. مناسبة للصلاحية اللي خاصة بالتطبيق ده بس. والملف [[s3-uploads.json]] هو مثال الدرس الجاي (رفع وقراية في [[uploads/]]). برضه مبيطبعش حاجة:

~~~text aws iam list-role-policies --role-name myapp-ec2
{
    "PolicyNames": [
        "s3-uploads"
    ]
}
~~~

| النوع | الأمر | بيتعرض بـ |
|---|---|---|
| managed (مستقلة) | [[attach-role-policy]] | [[list-attached-role-policies]] |
| inline (جوه الـ role) | [[put-role-policy]] | [[list-role-policies]] |

---

## ٤ و ٥. الـ instance profile

~~~bash
aws iam create-instance-profile --instance-profile-name myapp-ec2
aws iam add-role-to-instance-profile --instance-profile-name myapp-ec2 --role-name myapp-ec2
~~~

EC2 مبيتربطش بـ role مباشرة، بيتربط بـ «instance profile»، وده غلاف بيشيل role واحدة. الكونسول بيعمله لوحده بنفس الاسم، والـ CLI لأ. أول أمر:

~~~text الناتج
{
    "InstanceProfile": {
        "Path": "/",
        "InstanceProfileName": "myapp-ec2",
        "InstanceProfileId": "zlejq27pv6iln4ghjtc6",
        "Arn": "arn:aws:iam::000000000000:instance-profile/myapp-ec2",
        "CreateDate": "2026-10-08T09:57:09.419416+00:00",
        "Roles": [],
        "Tags": []
    }
}
~~~

لاحظ [[Roles: []]]: الغلاف فاضي. التاني بيحط الـ role جواه، وبعدها:

~~~text aws iam get-instance-profile --instance-profile-name myapp-ec2 --query "InstanceProfile.Roles[].RoleName"
[
    "myapp-ec2"
]
~~~

وبعدين بتربط الـ profile بالسيرفر وانت بتعمله ([[--iam-instance-profile Name=myapp-ec2]] في درس run-instances) أو بعدها بـ [[associate-iam-instance-profile]] (في الـ solCode).

---

## ٦. من جوه السيرفر: [[aws sts get-caller-identity]]

على EC2 حقيقي، الـ CLI بيسأل عنوان داخلي [[169.254.169.254]] (اسمه IMDS = Instance Metadata Service) فيرجع بمفاتيح مؤقتة للـ role. ده اللي الـ solCode بيعمله بإيده بـ [[curl]]: أول طلب [[PUT]] بياخد token (ده IMDSv2)، والتاني بيسأل عن الـ role بالـ token.

ومعندناش EC2، فعملنا نفس الحركة اللي EC2 بيعملها: [[aws sts assume-role]] على الـ role باسم جلسة شبه رقم سيرفر، وبالمفاتيح اللي رجعت سألنا «أنا مين؟»:

~~~text الناتج
{
    "UserId": "AROAQAAAAAAAKZYDUEDQB:i-0abc1234567890def",
    "Account": "000000000000",
    "Arn": "arn:aws:sts::000000000000:assumed-role/myapp-ec2/i-0abc1234567890def"
}
~~~

| الحتة في الـ Arn | معناها |
|---|---|
| [[arn:aws:sts]] | الهوية دي جاية من STS، يعني مؤقتة |
| [[assumed-role/myapp-ec2]] | حد لابس الـ role دي |
| [[/i-0abc1234567890def]] | اسم الجلسة، وعلى EC2 بيبقى رقم السيرفر |

والمفاتيح نفسها كان معاها [[Expiration]] بعد ساعة بالظبط من وقت الطلب. على EC2 الـ SDK بيجددها لوحده قبل ما تخلص.

---

## الخلاصة

| الخطوة | الأمر | بتجاوب على |
|---|---|---|
| ١ | [[create-role]] + trust policy | مين يلبسها؟ (EC2) |
| ٢ | [[attach-role-policy]] | صلاحية جاهزة من AWS |
| ٣ | [[put-role-policy]] | صلاحية مكتوبة على قد التطبيق |
| ٤ و ٥ | [[create-instance-profile]] + [[add-role-to-instance-profile]] | الغلاف اللي بيتربط بالسيرفر |
| ٦ | [[get-caller-identity]] من جوه | اتأكد إن السيرفر شايف الـ role |

> user = شخص بباسورد أو مفتاح دايم. role = هوية من غير مفاتيح، بتتلبس وتطلّع مفاتيح بتموت لوحدها. الكود على AWS دايمًا role.`,
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
          teach: R`## الفكرة: ملف بيرد على سؤال واحد

كل طلب لـ AWS بيتسأل عنه: «الهوية دي تقدر تعمل **الفعل** ده على **المورد** ده؟». الـ policy ملف JSON بيرد على السؤال ده بقواعد. المثال فيه قاعدتين: واحدة بتسمح بحاجة محددة جدًا، والتانية بتمنع حاجة خطيرة منع صريح.

الـ JSON نفسه اتجرّب على LocalStack: [[aws iam create-policy --policy-document file://s3-uploads.json]] قبله ورجّع [[v1]]، ونسخ فيها غلطات اترفضت (تحت). أما **تقييم** الطلبات (مين يكسب Allow ولا Deny) فمن الـ docs الرسمية بتاعة IAM، لأن محاكي LocalStack المجاني بيرجّع [[explicitDeny]] لكل حاجة ومينفعش نعتمد عليه.

---

## ١. الغلاف: [[Version]] و [[Statement]]

~~~json
{
  "Version": "2012-10-17",
  "Statement": [ ... ]
}
~~~

| الخانة | معناها |
|---|---|
| [[{ }]] | object: مجموعة خانات بأسامي |
| [[Version]] | نسخة **لغة** الـ policy، مش تاريخ كتابتها. دايمًا [[2012-10-17]] |
| [[Statement]] | قايمة القواعد. [[[ ]]] في JSON يعني قايمة |

جرّبنا نكتب [[2024-01-01]] مكان النسخة، و LocalStack رفض:

~~~text الناتج
An error occurred (MalformedPolicyDocument) when calling the CreatePolicy operation: Syntax errors in policy.
~~~

---

## ٢. القاعدة الأولى: اسمح بحاجة صغيرة

~~~json
{
  "Effect": "Allow",
  "Action": ["s3:PutObject", "s3:GetObject"],
  "Resource": "arn:aws:s3:::myapp-assets/uploads/*"
}
~~~

| الخانة | القيمة | معناها |
|---|---|---|
| [[Effect]] | [[Allow]] | اسمح. القيمتين الوحيدتين [[Allow]] و [[Deny]] (جرّبنا [[Block]] واترفضت بنفس الرسالة) |
| [[Action]] | [[s3:PutObject]] | الخدمة، وبعد [[:]] اسم الفعل: ارفع ملف |
| | [[s3:GetObject]] | نزّل ملف. وقايمة [[[ ]]] لأنهم اتنين |
| [[Resource]] | ARN | على أنهي حاجة |

### الـ ARN حتة حتة

~~~text
arn : aws : s3 : (region) : (account) : myapp-assets/uploads/*
~~~

| الحتة | معناها |
|---|---|
| [[arn]] | Amazon Resource Name، أول كل عنوان |
| [[aws]] | الـ partition (AWS العادي) |
| [[s3]] | الخدمة |
| [[::]] | خانتين فاضيين: الـ region والحساب. اسم الـ bucket فريد في الدنيا، فمش محتاجهم |
| [[myapp-assets]] | الـ bucket |
| [[/uploads/*]] | أي ملف اسمه بيبدأ بـ [[uploads/]]. النجمة [[*]] يعني «أي حاجة» |

يعني [[uploads/a.png]] و [[uploads/42/cv.pdf]] داخلين، و [[avatars/a.png]] لأ.

---

## ٣. القاعدة التانية: امنع صراحةً

~~~json
{
  "Effect": "Deny",
  "Action": "s3:DeleteObject",
  "Resource": "arn:aws:s3:::myapp-assets/*"
}
~~~

[[Action]] هنا نص مش قايمة، لأنه فعل واحد، والاتنين مقبولين. و [[myapp-assets/*]] يعني كل الملفات في الـ bucket، مش [[uploads/]] بس.

ليه نمنع حاجة محدش سمح بيها أصلًا؟ لأن الـ Deny الصريح بيكسب **أي** Allow في **أي** policy تانية على نفس الهوية. فلو حد بعد سنة ضاف للـ role policy فيها [[s3:*]]، المسح لسه ممنوع.

---

## ٤. AWS بيقيّم إزاي (من الـ docs)

لكل طلب، بالترتيب ده:

1. فيه [[Deny]] صريح يغطي الطلب في أي policy؟ **ممنوع** ([[explicitDeny]]). خلاص، مش بيكمّل.
2. فيه [[Allow]] يغطيه؟ **مسموح** ([[allowed]]).
3. مفيش ولا ده ولا ده؟ **ممنوع** افتراضي ([[implicitDeny]]).

نطبّق على تلات طلبات (نفس اللي في الـ sol، والنتيجة المتوقعة من [[simulate-principal-policy]] على AWS حقيقي حسب الـ docs):

| الطلب | المورد | القاعدة اللي بتطابق | النتيجة |
|---|---|---|---|
| [[s3:DeleteObject]] | [[uploads/a.png]] | الـ Deny (المسح في كل الـ bucket) | [[explicitDeny]] |
| [[s3:PutObject]] | [[uploads/a.png]] | الـ Allow | [[allowed]] |
| [[s3:PutObject]] | [[avatars/a.png]] | ولا واحدة | [[implicitDeny]] |

الفرق بين آخر اتنين ممنوعين مهم: [[implicitDeny]] بيتحل بإنك تضيف Allow، و [[explicitDeny]] مش هيتحل غير لو شلت الـ Deny نفسه.

---

## ٥. JSON بايظ

لو نسيت الفاصلة اللي بعد [["s3:PutObject"]] في القايمة، الملف نفسه مبقاش JSON، و LocalStack رجّع نفس [[MalformedPolicyDocument]]. AWS الحقيقي ممكن يكتب الرسالة بشكل تاني، بس الكود نفسه. فاتأكد من الـ JSON قبل ما ترفعه، وأي محرر كويس بيلوّن الغلطة.

---

## الخلاصة

~~~text
Version     دايمًا 2012-10-17
Effect      Allow أو Deny
Action      service:Verb، واحد أو قايمة
Resource    ARN. bucket/* للملفات، bucket من غير /* للـ bucket نفسه
الترتيب     Deny صريح  >  Allow  >  ممنوع افتراضي
~~~

> least privilege: ابدأ بالأفعال اللي الكود بينادي عليها فعلًا وعلى المسار اللي محتاجه بس، وزوّد لما يطلع AccessDenied واضح.`,
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
          teach: R`## الفكرة: قيس، وبعدين اسأل حسابك

المثال ٣ أجزاء: loop بيقيس السرعة لـ ٤ regions قريبة من مصر بـ [[curl]] (مش محتاج حساب AWS خالص)، وأمر بيقولك الـ regions المفعّلة في حسابك، وأمر بيعرض الـ AZs جوه region.

الـ loop اتشغّل فعلًا من جهاز في مصر (bash جوه Docker، وكمان PowerShell بـ [[curl.exe]]). أمر الـ AZs اتشغّل على LocalStack (محاكي AWS). و [[account list-regions]] مش موجود في LocalStack المجاني، فشكله من الـ help والـ docs.

---

## ١. الـ loop

~~~bash
for r in eu-central-1 eu-south-1 me-central-1 me-south-1; do
  echo "$r $(curl -o /dev/null -s -w '%{time_connect}' https://ec2.$r.amazonaws.com)"
done
~~~

### أسماء الـ regions

| الاسم | المكان | ليه في القايمة |
|---|---|---|
| [[eu-central-1]] | فرانكفورت | مفعّلة افتراضي وفيها كل الخدمات |
| [[eu-south-1]] | ميلانو | قريبة، بس opt-in |
| [[me-central-1]] | الإمارات | opt-in |
| [[me-south-1]] | البحرين | opt-in |

الاسم نفسه منطقة ([[eu]] أوروبا، [[me]] الشرق الأوسط) واتجاه ([[central]] و [[south]]) ورقم.

### [[for r in ...; do ... done]]

لف على الـ ٤ أسامي، وكل مرة حط الاسم في المتغير [[r]]. والـ [[;]] قبل [[do]] بتفصل الأمرين لو على نفس السطر.

### جوه: [[curl ...]]

نفكّه حتة حتة:

| الحتة | معناها |
|---|---|
| [[curl]] | ابعت طلب HTTP |
| [[https://ec2.$r.amazonaws.com]] | عنوان خدمة EC2 في الـ region دي. [[$r]] بتتبدل بالاسم، فأول لفة [[ec2.eu-central-1.amazonaws.com]] |
| [[-o /dev/null]] | الرد نفسه ارميه. [[/dev/null]] «سلة زبالة» في لينكس |
| [[-s]] | silent: من غير شريط التحميل |
| [[-w '%{time_connect}']] | write-out: بعد ما تخلص اطبع الرقم ده بس |
| [[%{time_connect}]] | الوقت بالثواني من أول الطلب لحد ما اتصال TCP اتفتح |

يعني إحنا مش مهتمين بالرد خالص، مهتمين بـ «الرحلة لهناك خدت قد إيه». و [[time_connect]] بيشمل كمان وقت الـ DNS (تحويل الاسم لـ IP)، عشان كده أول لفة ممكن تطلع أبطأ.

### [[echo "$r $( ... )"]]

[[$( ... )]] شغّل اللي جوه وحط ناتجه مكانه، و [[echo]] يطبع الاسم والرقم في سطر واحد.

### الناتج الحقيقي، مرتين ورا بعض

~~~text اللفة الأولى
eu-central-1 0.143765
eu-south-1 0.327135
me-central-1 0.253274
me-south-1 0.000000
~~~

~~~text اللفة التانية
eu-central-1 0.112699
eu-south-1 0.093055
me-central-1 0.146421
me-south-1 0.000000
~~~

نقرا الأرقام:

- الرقم بالثواني، فـ [[0.112699]] يعني حوالي ١١٣ مللي ثانية.
- ميلانو طلعت ٣٢٧ في الأولى و ٩٣ في التانية! رقم واحد ممكن يكون صدفة زحمة أو DNS بطيء، وده ليه الـ try بيقولك قيس كذا مرة.
- [[me-south-1 0.000000]] مش «سريع جدًا»: الاتصال **فشل**. شغّلنا [[curl -sS]] (اللي بيطبع الخطأ) على البحرين لوحدها وطلع [[curl: (7) Failed to connect to ec2.me-south-1.amazonaws.com:443 after 21111 ms]]. الاسم اتحوّل لـ IP عادي، بس الاتصال مفتحش من الشبكة دي وقت التجربة.
- الأرقام دي من Docker على ويندوز، وده بيزوّد شوية. المهم المقارنة بين الـ regions، مش الرقم نفسه.

### على ويندوز

الـ loop ده bash، فشغّله في Git Bash أو WSL. وفي PowerShell نفس الفكرة بـ [[curl.exe]] (الـ curl الحقيقي اللي جاي مع ويندوز، و [[NUL]] بدل [[/dev/null]]):

~~~powershell
foreach ($r in "eu-central-1","eu-south-1","me-central-1") { "$r $(curl.exe -o NUL -s -w '%{time_connect}' https://ec2.$r.amazonaws.com)" }
~~~

~~~text الناتج
eu-central-1 0.177484
eu-south-1 0.162886
me-central-1 0.260285
~~~

---

## ٢. [[aws account list-regions ...]]

~~~bash
aws account list-regions --region-opt-status-contains ENABLED_BY_DEFAULT ENABLED --query "Regions[].RegionName"
~~~

| الحتة | معناها |
|---|---|
| [[account list-regions]] | الـ regions وحالة كل واحدة في حسابك |
| [[--region-opt-status-contains]] | فلتر بالحالة. الـ help بيقول الحالات: [[ENABLED]] و [[ENABLING]] و [[DISABLING]] و [[DISABLED]] و [[ENABLED_BY_DEFAULT]] |
| [[ENABLED_BY_DEFAULT ENABLED]] | قيمتين بمسافة: المفعّلة لوحدها + اللي انت فعّلتها |

فالنتيجة قايمة أسامي فيها فرانكفورت و [[us-east-1]] وغيرهم، ومش هتلاقي فيها [[me-central-1]] إلا لو فعّلتها من Account settings. (من الـ docs.)

---

## ٣. [[aws ec2 describe-availability-zones ...]]

~~~bash
aws ec2 describe-availability-zones --region eu-central-1 --query "AvailabilityZones[].ZoneName"
~~~

~~~text الناتج
[
    "eu-central-1a",
    "eu-central-1b",
    "eu-central-1c"
]
~~~

٣ AZs: اسم الـ region وبعده حرف. ومن غير [[--query]] كل AZ ليها تفاصيل أكتر:

~~~text أول AZ كاملة
{
    "Messages": [],
    "RegionName": "eu-central-1",
    "ZoneName": "eu-central-1a",
    "ZoneId": "euc1-az1",
    "ZoneType": "availability-zone",
    "State": "available"
}
~~~

| الخانة | معناها |
|---|---|
| [[ZoneName]] | الاسم اللي بتشوفه. الحرف [[a]] ممكن يشاور على مبنى مختلف في حساب تاني |
| [[ZoneId]] | الـ ID الثابت للمبنى نفسه في كل الحسابات. لو بتنسّق مع حساب تاني، قارن الـ ID مش الاسم |
| [[ZoneType]] | [[availability-zone]] عادية (فيه كمان local zones أصغر) |
| [[State]] | [[available]] شغالة |

---

## الخلاصة

~~~text
region   مدينة (eu-central-1)، مستقلة تمامًا عن التانية
AZ       مبنى أو أكتر جوه الـ region (eu-central-1a)، بكهربا وشبكة لوحده
opt-in   regions جديدة (البحرين والإمارات وميلانو) لازم تتفعّل الأول
القياس   time_connect أكتر من مرة، و 0.000000 يعني فشل مش سرعة
~~~`,
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
          teach: R`## الفكرة: نفس الشكل في كل خدمة

الـ ٦ أوامر شكلهم واحد: [[aws <الخدمة> <فعل قراية> --query "..." --output ...]]. لو فهمت التلات حتت دول، تقدر تسأل أي خدمة من الـ ٢٠٠. وكلهم قراية بس ([[describe]] و [[list]] و [[ls]])، مبيغيّروش ولا بيكلّفوا حاجة.

اتجرّبوا بـ AWS CLI 2.37 على LocalStack (محاكي AWS في Docker) بعد ما عملنا فيه سيرفر وهمي و bucket ودالة Lambda. RDS و CloudFront مش موجودين في LocalStack المجاني، فشكلهم من الـ docs.

---

## ١. أول أمر، حتة حتة

~~~bash
aws ec2 describe-instances --query "Reservations[].Instances[].[InstanceId,InstanceType,State.Name]" --output table
~~~

| الحتة | معناها |
|---|---|
| [[ec2]] | الخدمة: EC2 (Elastic Compute Cloud)، السيرفرات |
| [[describe-instances]] | اوصف السيرفرات. [[describe]] = قراية |
| [[--query "..."]] | طلّع جزء من الرد بلغة اسمها JMESPath |
| [[--output table]] | اعرضه جدول |

### من غير [[--query]]

الرد JSON طويل جدًا (عشرات الخانات لكل سيرفر). أوله:

~~~text الناتج (أول سطور)
{
    "Reservations": [
        {
            "ReservationId": "r-cf21273375b76a70e",
            "OwnerId": "000000000000",
...
~~~

السيرفرات جوه [[Instances]]، وده جوه [[Reservations]] (كل مرة شغّلت سيرفرات بأمر واحد = reservation).

### الـ [[--query]] حتة حتة

| الحتة | معناها |
|---|---|
| [[Reservations[]]] | لف على كل الـ reservations |
| [[.Instances[]]] | وفي كل واحدة لف على السيرفرات، وحطهم كلهم في قايمة واحدة |
| [[.[InstanceId,InstanceType,State.Name]]] | ومن كل سيرفر هات ٣ خانات بالترتيب ده |
| [[State.Name]] | النقطة يعني «ادخل جوه»: خانة [[Name]] جوه [[State]] |

### الـ [[--output]] بأشكاله التلاتة

على نفس السيرفر الوهمي (في [[us-east-1]]):

~~~text --output table
------------------------------------------------
|               DescribeInstances              |
+----------------------+------------+----------+
|  i-a6ae19e65a7050a15 |  t3.micro  |  running |
+----------------------+------------+----------+
~~~

~~~text --output json (الافتراضي)
[
    [
        "i-a6ae19e65a7050a15",
        "t3.micro",
        "running"
    ]
]
~~~

~~~text --output text
i-a6ae19e65a7050a15	t3.micro	running
~~~

[[table]] للعين، و [[json]] للبرامج و jq، و [[text]] (سطر لكل سيرفر وبين الخانات Tab) لسكربتات bash.

### فلتر بـ [[?]]

~~~bash
aws ec2 describe-instances --query "Reservations[].Instances[?State.Name=='running'].InstanceId" --output text
~~~

~~~text الناتج
i-a6ae19e65a7050a15
~~~

[[[?شرط]]] يعني «خد بس اللي الشرط ده صح عليه»، و [[==]] يساوي، والقيمة بين [[']] لأنها نص.

> الأمر من غير [[--region]] بيسأل الـ region الافتراضية بس. السيرفر ده في [[us-east-1]]، فلو سألت فرانكفورت هيرجع جدول فاضي.

---

## ٢. [[aws s3 ls]]

~~~text الناتج
2026-10-08 10:01:59 myapp-assets-ali-7
~~~

كل bucket في سطر: تاريخ الإنشاء والاسم. ومفيش [[--query]] هنا لأن [[aws s3]] أوامر «مريحة» بتطبع نص جاهز (التفاصيل في درس «aws s3»). وعلى حساب فاضي مبيطبعش ولا سطر.

---

## ٣. [[aws rds describe-db-instances ...]]

نفس الشكل: [[DBInstances[]]] و [[DBInstanceIdentifier]] (اسم القاعدة في AWS) و [[DBInstanceStatus]] (زي [[available]] أو [[creating]] أو [[stopped]]). من الـ docs، لأن LocalStack رجّع [[InternalFailure ... not included in your current license plan]].

---

## ٤. [[aws lambda list-functions ...]]

~~~text الناتج
-------------------------
|     ListFunctions     |
+--------+--------------+
|  hello |  nodejs22.x  |
+--------+--------------+
~~~

هنا الفعل [[list]] مش [[describe]]، والقايمة اسمها [[Functions]] مباشرة من غير غلاف. [[Runtime]] نسخة Node (LocalStack اللي عندنا مبيدعمش [[nodejs24.x]] لسه، فالدالة اتعملت بـ 22).

---

## ٥. [[aws cloudfront list-distributions ...]]

[[DistributionList.Items[]]]: القايمة جوه [[Items]] جوه [[DistributionList]]، ومن كل distribution الـ [[Id]] (زي [[E1ABCDEF2GHIJK]]) و [[DomainName]] (زي [[d111111abcdef8.cloudfront.net]]). و [[--output text]] بيطبع كل واحدة في سطر. من الـ docs.

---

## ٦. [[aws route53 list-hosted-zones ...]]

~~~text الناتج
[]
~~~

[[[]]] قايمة فاضية: مفيش دومينات. ولو فيه، كل اسم بيخلص بنقطة زي [[example.com.]]، وده الشكل الكامل للدومين في DNS.

---

## والـ try: [[aws logs describe-log-groups]]

~~~text --query "logGroups[].[logGroupName,retentionInDays,storedBytes]" --output table
---------------------------------------
|          DescribeLogGroups          |
+--------------------+-------+--------+
|  /aws/lambda/hello |  None |  1315  |
+--------------------+-------+--------+
~~~

[[/aws/lambda/hello]] اتعمل لوحده لما الدالة اشتغلت. و [[None]] في [[retentionInDays]] يعني «احتفظ للأبد»، وده بيتحاسب مع الوقت. و [[1315]] حجم اللوجات بالبايت. لاحظ [[logGroups]] بحرف صغير في الأول، و [[Reservations]] بكبير: كل خدمة ليها أسامي، فشغّل الأمر من غير [[--query]] الأول وشوف.

---

## الخلاصة

| الجزء | بيعمل إيه |
|---|---|
| [[aws <service> describe-*/list-*]] | اقرا من الخدمة |
| [[--query "A[].B[].[x,y]"]] | فك القوايم، وهات خانات معينة |
| [[--query "A[?x=='v']"]] | فلتر |
| [[--output table/json/text]] | للعين / للبرامج / لـ bash |
| [[--region]] | أغلب الخدمات بترد عن region واحدة بس |`,
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
    }
]);

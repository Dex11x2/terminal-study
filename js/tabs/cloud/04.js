// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
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
          teach: R`## الفكرة: بابين، وكل باب ليه قايمة «مسموح»

بنعمل ٢ security groups: [[myapp-web]] للسيرفرات و [[myapp-db]] لقاعدة البيانات. السيرفرات تقبل HTTPS من الدنيا كلها و SSH من بيتك بس، والقاعدة تقبل Postgres من السيرفرات بس. وفي الآخر نتأكد.

اتجرّب بـ AWS CLI 2.37 على LocalStack (محاكي AWS في Docker): عملنا VPC بـ [[aws ec2 create-vpc --cidr-block 10.0.0.0/16]]، وشغّلنا الأوامر كلها. الأرقام زي [[sg-2fd47a4e6782a0e53]] طلعت من المحاكي، والمثال بيكتبها مختصرة ([[sg-0web1111]]) عشان تتقري.

---

## ١. [[aws ec2 create-security-group ...]]

~~~bash
aws ec2 create-security-group --group-name myapp-web --description "web servers" --vpc-id vpc-0abc1234
~~~

| الحتة | معناها |
|---|---|
| [[--group-name myapp-web]] | الاسم |
| [[--description "web servers"]] | وصف، **إجباري**، ومينفعش يتغير بعدين |
| [[--vpc-id vpc-0abc1234]] | جوه أنهي VPC (شبكتك الخاصة في AWS). الـ security group مش بيعدي برا الـ VPC بتاعه |

~~~text الناتج
{
    "GroupId": "sg-2fd47a4e6782a0e53",
    "SecurityGroupArn": "arn:aws:ec2:eu-central-1:000000000000:security-group/sg-2fd47a4e6782a0e53"
}
~~~

[[GroupId]] هو اللي كل الأوامر الجاية محتاجاه. والـ solCode بيخزّنه في متغير بدل ما تنسخه: [[WEB=$(aws ec2 create-security-group ... --query GroupId --output text)]].

وأول ما يتعمل، مفيش أي قاعدة دخول: كل حاجة داخلة ممنوعة.

---

## ٢. [[--port 443 --cidr 0.0.0.0/0]]: HTTPS من أي مكان

~~~bash
aws ec2 authorize-security-group-ingress --group-id sg-0web1111 --protocol tcp --port 443 --cidr 0.0.0.0/0
~~~

| الحتة | معناها |
|---|---|
| [[authorize-security-group-ingress]] | ضيف قاعدة «اسمح» للداخل (ingress = داخل) |
| [[--group-id]] | على أنهي group |
| [[--protocol tcp]] | البروتوكول. HTTPS و SSH و Postgres كلهم TCP |
| [[--port 443]] | البورت. 443 = HTTPS |
| [[--cidr 0.0.0.0/0]] | من أنهي عناوين |

### CIDR يعني إيه؟

CIDR طريقة تكتب بيها رينج عناوين: عنوان، و [[/]]، ورقم بيقول **كام bit من الأول ثابتين** من الـ 32.

| CIDR | الثابت | يعني |
|---|---|---|
| [[0.0.0.0/0]] | ولا bit | كل عناوين IPv4 في الدنيا |
| [[10.0.0.0/16]] | أول رقمين | من [[10.0.0.0]] لـ [[10.0.255.255]]، ٦٥٥٣٦ عنوان |
| [[203.0.113.7/32]] | الـ 32 كلهم | العنوان ده بس |

~~~text الناتج
{
    "Return": true,
    "SecurityGroupRules": [
        {
            "SecurityGroupRuleId": "sgr-baf605859f8aa2acb",
            "GroupId": "sg-2fd47a4e6782a0e53",
            "IsEgress": false,
            "IpProtocol": "tcp",
            "FromPort": 443,
            "ToPort": 443,
            "CidrIpv4": "0.0.0.0/0",
            "Tags": []
        }
    ]
}
~~~

[[Return: true]] اتضافت. [[IsEgress: false]] يعني قاعدة دخول مش خروج. و [[FromPort]] و [[ToPort]] رينج بورتات، و [[--port 443]] بيحط الاتنين 443.

---

## ٣. SSH من بيتك بس

~~~bash
aws ec2 authorize-security-group-ingress --group-id sg-0web1111 --protocol tcp --port 22 --cidr 203.0.113.7/32
~~~

نفس الأمر، بورت 22 (SSH)، و [[/32]] = عنوان واحد. حط الـ IP العام بتاعك (بتعرفه من [[curl -s https://checkip.amazonaws.com]]). و [[203.0.113.7]] من رينج محجوز للأمثلة.

---

## ٤. القاعدة الذكية: [[--source-group]]

~~~bash
aws ec2 authorize-security-group-ingress --group-id sg-0db22222 --protocol tcp --port 5432 --source-group sg-0web1111
~~~

بدل [[--cidr]]، [[--source-group sg-0web1111]] يعني: «اسمح لـ 5432 (Postgres) من **أي حاجة لابسة** الـ group بتاع السيرفرات». مش IP. فلو عملت ١٠ سيرفرات جديدة بعناوين جديدة، كلهم يوصلوا للقاعدة من غير ما تلمس القاعدة، وأي حاجة تانية في الدنيا لأ.

---

## ٥. اتأكد: [[describe-security-groups]]

~~~bash
aws ec2 describe-security-groups --group-ids sg-0db22222 --query "SecurityGroups[].IpPermissions"
~~~

~~~text الناتج
[
    [
        {
            "IpProtocol": "tcp",
            "FromPort": 5432,
            "ToPort": 5432,
            "UserIdGroupPairs": [
                {
                    "UserId": "000000000000",
                    "GroupId": "sg-2fd47a4e6782a0e53"
                }
            ],
            "IpRanges": [],
            "Ipv6Ranges": [],
            "PrefixListIds": []
        }
    ]
]
~~~

| الخانة | معناها |
|---|---|
| [[IpPermissions]] | قواعد الدخول |
| [[UserIdGroupPairs]] | القواعد اللي بالـ group: هنا group السيرفرات ([[sg-2fd4...]]) |
| [[IpRanges: []]] | **مفيش** ولا CIDR. ده اللي عايزه للقاعدة |
| [[Ipv6Ranges]] و [[PrefixListIds]] | عناوين IPv6 وقوايم عناوين جاهزة، فاضيين |

والـ query اللي في الـ solCode بتطلّع الـ CIDRs بس، والمطلوب قايمة فاضية:

~~~text --query "SecurityGroups[].IpPermissions[].IpRanges[].CidrIp"
[]
~~~

### الخروج

~~~text --query "SecurityGroups[].IpPermissionsEgress"
[
    [
        {
            "IpProtocol": "-1",
            "UserIdGroupPairs": [],
            "IpRanges": [
                {
                    "CidrIp": "0.0.0.0/0"
                }
            ],
            "Ipv6Ranges": [],
            "PrefixListIds": []
        }
    ]
]
~~~

[[-1]] يعني كل البروتوكولات، لكل مكان. ده الافتراضي لأي group، وطبيعي.

### لو ضفت نفس القاعدة مرتين

~~~text الناتج
An error occurred (InvalidPermission.Duplicate) when calling the AuthorizeSecurityGroupIngress operation: The specified rule already exists
~~~

---

## الخلاصة

| القاعدة | على | من | ليه |
|---|---|---|---|
| tcp 443 | web | [[0.0.0.0/0]] | الموقع للكل |
| tcp 22 | web | [[IP/32]] | SSH من بيتك بس (أو Session Manager ومن غير 22 خالص) |
| tcp 5432 | db | [[--source-group web]] | القاعدة من السيرفرات بس |

> «اسمح» بس ومفيش «امنع»، واللي مش مسموح ممنوع. و stateful: الرد على طلب دخل بيخرج لوحده. والقاعدة عمرها ما تشوف [[0.0.0.0/0]].`,
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
          teach: R`## الفكرة: كل اللي السيرفر محتاجه، في أمر واحد

قبل ما السيرفر يقوم لازم ٤ حاجات تبقى جاهزة: مفتاح تدخل بيه، ورقم صورة النظام، وفايروول (درس security groups)، و role (درس IAM users و roles). المثال بيجهّز أول اتنين، وبعدين [[run-instances]] بيجمع الكل، وفي الآخر بنتأكد إن السيرفر قام وإن سكربت أول تشغيل اشتغل.

اتجرّب بـ AWS CLI 2.37 على LocalStack (محاكي AWS في Docker). المحاكي بيعمل سجل سيرفر وهمي بكل الإعدادات، بس مفيش Ubuntu حقيقي بيقوم، فسطر [[ssh]] والـ cloud-init من الـ docs. ورقم الـ AMI من LocalStack مش من Canonical.

---

## ١. [[aws ec2 create-key-pair ... > myapp-key.pem]]

~~~bash
aws ec2 create-key-pair --key-name myapp-key --key-type ed25519 --query KeyMaterial --output text > myapp-key.pem
~~~

| الحتة | معناها |
|---|---|
| [[create-key-pair]] | اعمل مفتاحين: عام (AWS بيحطه على السيرفر) وخاص (ليك انت) |
| [[--key-name myapp-key]] | اسمه في AWS |
| [[--key-type ed25519]] | نوع حديث وقصير وآمن. الافتراضي [[rsa]] |
| [[--query KeyMaterial]] | من الرد هات المفتاح الخاص بس |
| [[--output text]] | من غير علامات JSON، عشان الملف يبقى مفتاح سليم |
| [[> myapp-key.pem]] | اكتب الناتج في ملف بدل الشاشة |

~~~text أول سطر في الملف
-----BEGIN OPENSSH PRIVATE KEY-----
~~~

الملف ٨ سطور. والمفتاح الخاص ده بيتطبع **مرة واحدة**: AWS مبيحتفظش بيه، ولو ضاع مفيش طريقة ترجّعه.

---

## ٢. [[chmod 400 myapp-key.pem]]

~~~text ls -l قبل وبعد
-rw-r--r-- 1 root root 388 Oct  8 10:10 myapp-key.pem
-r-------- 1 root root 388 Oct  8 10:10 myapp-key.pem
~~~

[[400]] = صاحب الملف يقرا بس ([[r--]])، والباقيين ولا حاجة ([[---]] [[---]]). و [[ssh]] بيرفض يستخدم مفتاح خاص غيرك يقدر يقراه. على ويندوز الصلاحيات شغالة بطريقة تانية، و OpenSSH بتاع ويندوز بيشتكي لو يوزرز تانيين ليهم صلاحية على الملف.

---

## ٣. [[AMI=$(aws ssm get-parameter ...)]]

~~~bash
AMI=$(aws ssm get-parameter --name /aws/service/canonical/ubuntu/server/24.04/stable/current/amd64/hvm/ebs-gp3/ami-id --query Parameter.Value --output text)
~~~

الـ AMI (Amazon Machine Image) صورة ديسك جاهزة، ورقمها زي [[ami-0abc...]] مختلف في كل region وبيتغير مع كل تحديث. فبدل ما تحفظ رقم، بتسأل Parameter Store العام اللي Canonical (الشركة اللي ورا Ubuntu) بتحدّثه.

### المسار حتة حتة

| الحتة | معناها |
|---|---|
| [[/aws/service/canonical]] | parameters عامة نشرتها Canonical |
| [[ubuntu/server/24.04]] | Ubuntu Server 24.04 |
| [[stable/current]] | آخر نسخة مستقرة |
| [[amd64]] | معالجات Intel و AMD. لـ Graviton ([[t4g]]) بيبقى [[arm64]] |
| [[hvm/ebs-gp3]] | نوع الـ virtualization، وديسك gp3 |
| [[ami-id]] | الرقم |

و [[AMI=$( ... )]] بيحط الناتج في متغير، فبعدين تكتب [[$AMI]]. المسار ده مش موجود في LocalStack (رجّع [[ParameterNotFound]])، فاستخدمنا رقم صورة من صور المحاكي نفسه.

---

## ٤. [[aws ec2 run-instances ...]]

الأمر الطويل، نفكّه خيار خيار:

| الخيار | معناه |
|---|---|
| [[--image-id $AMI]] | من الصورة دي |
| [[--instance-type t3.small]] | الحجم: [[t]] burstable، [[3]] الجيل، [[small]] = ٢ vCPU و ٢ جيجا. ومعالج Intel/AMD فبيمشي مع AMI الـ [[amd64]] |
| [[--key-name myapp-key]] | حط المفتاح العام ده على السيرفر |
| [[--security-group-ids sg-0web1111]] | الفايروول |
| [[--iam-instance-profile Name=myapp-ec2]] | الـ role (عن طريق الـ instance profile) |
| [[--user-data file://init.sh]] | سكربت يشتغل كـ root أول ما السيرفر يقوم، مرة واحدة |
| [[--metadata-options HttpTokens=required]] | IMDSv2 إجباري: مفاتيح الـ role محتاجة token الأول، وده بيقفل هجمات SSRF |
| [[--tag-specifications "..."]] | حط tag اسمه [[Name]] قيمته [[myapp-web]] على السيرفر وهو بيتعمل |

و [[ResourceType=instance,Tags=[{Key=Name,Value=myapp-web}]]] ده «shorthand» بتاع الـ CLI: طريقة أقصر من JSON لنفس البيانات. والعلامات حواليه عشان الـ shell ميلمسش الأقواس.

الرد JSON طويل جدًا. طلّعنا منه أهم حاجات بـ [[--query]]:

~~~text الناتج
[
    "i-2827653dc2301a915",
    "t3.small",
    "pending",
    "required",
    "arn:aws:iam::000000000000:instance-profile/myapp-ec2",
    "myapp-key"
]
~~~

رقم السيرفر، والحجم، والحالة [[pending]] (لسه بيقوم)، و IMDSv2 [[required]]، والـ instance profile، والمفتاح. كل خيار وصل.

---

## ٥. [[aws ec2 describe-instances --filters ...]]

~~~bash
aws ec2 describe-instances --filters Name=tag:Name,Values=myapp-web --query "Reservations[].Instances[].[InstanceId,PublicIpAddress,State.Name]" --output table
~~~

[[--filters Name=tag:Name,Values=myapp-web]]: فلتر من ناحية AWS (مش [[--query]] اللي بيفلتر عندك)، يعني «السيرفرات اللي الـ tag [[Name]] بتاعها [[myapp-web]]».

~~~text الناتج
----------------------------------------------------
|                 DescribeInstances                |
+----------------------+----------------+----------+
|  i-2827653dc2301a915 |  54.214.78.54  |  running |
+----------------------+----------------+----------+
~~~

الحالة بقت [[running]] والـ IP العام ظهر (ده عنوان وهمي من المحاكي). الـ IP ده بيتغير لو عملت stop و start.

---

## ٦. [[ssh -i myapp-key.pem ubuntu@... "tail -n 20 /var/log/cloud-init-output.log"]]

| الحتة | معناها |
|---|---|
| [[-i myapp-key.pem]] | ادخل بالمفتاح ده (identity) |
| [[ubuntu@]] | اليوزر الافتراضي في صور Ubuntu |
| [[tail -n 20]] | آخر ٢٠ سطر |
| [[/var/log/cloud-init-output.log]] | ناتج سكربت الـ user data |

cloud-init هو البرنامج اللي بيقرا الـ user data ويشغّله. حسب الـ docs، لو السكربت خلص هتلاقي في الآخر سطر زي [[Cloud-init v. 24.x finished at ...]]. ولو فشل، السيرفر بيقوم عادي ومحدش بيقولك، فاللوج ده الطريقة الوحيدة تعرف.

### الـ [[init.sh]] اللي في الـ solCode

| السطر | معناه |
|---|---|
| [[#!/bin/bash]] | شغّل الملف بـ bash. من غيره cloud-init ممكن ميعرفش يشغّله |
| [[set -euxo pipefail]] | [[e]] اقف عند أول خطأ، [[u]] متغير مش موجود = خطأ، [[x]] اطبع كل أمر قبل ما يتنفذ (فيظهر في اللوج)، و [[pipefail]] خطأ في أي حتة من pipe يوقف |
| [[curl -fsSL https://get.docker.com ... sh]] | نزّل سكربت تسطيب Docker الرسمي وشغّله |
| [[usermod -aG docker ubuntu]] | ضيف [[ubuntu]] لجروب [[docker]] عشان يشغّل docker من غير sudo |
| [[systemctl enable --now docker]] | شغّل Docker دلوقتي ومع كل boot |

---

## الخلاصة

| الخطوة | الأمر | ليه |
|---|---|---|
| ١ | [[create-key-pair]] + [[chmod 400]] | مفتاح الدخول، بيتطبع مرة واحدة |
| ٢ | [[ssm get-parameter]] | آخر AMI من غير رقم محفوظ |
| ٣ | [[run-instances]] | الصورة والحجم والمفتاح والفايروول والـ role والسكربت و IMDSv2 والاسم |
| ٤ | [[describe-instances --filters]] | الـ IP والحالة |
| ٥ | [[ssh ... cloud-init-output.log]] | السكربت نجح؟ |

> السيرفر بيتحاسب بالثانية طول ما هو شغال، والـ IP العام كمان. خلصت التجربة؟ [[aws ec2 terminate-instances --instance-ids i-...]].`,
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
          teach: R`## الفكرة: التكبير ٣ طبقات، وكل طبقة ليها أمر

الديسك زي علبة جواها درج جواه ورق. لما تكبّر العلبة (الـ volume في AWS)، الدرج (الـ partition) لسه بحجمه القديم، والورق (الـ filesystem) لسه بحجمه القديم. فكل طبقة محتاجة أمر لوحدها، بالترتيب ده:

| الطبقة | بالإنجليزي | الأمر | بيتنفّذ فين |
|---|---|---|---|
| العلبة | EBS volume | [[aws ec2 modify-volume]] | جهازك (AWS CLI) |
| الدرج | partition | [[growpart]] | على السيرفر |
| الورق | filesystem (ext4) | [[resize2fs]] | على السيرفر |

أوامر AWS اتجرّبت بـ AWS CLI 2.37 على LocalStack (محاكي AWS في Docker) على الديسك بتاع السيرفر الوهمي من الدرس اللي فات. و [[growpart]] و [[resize2fs]] اتجرّبوا فعلًا على Ubuntu 24.04 في Docker، بس على **ملفات صورة ديسك** بدل ديسك حقيقي (الأدوات دي بتشتغل على ملفات كمان، فمش محتاجين صلاحيات root على الجهاز). و [[df -h /]] على سيرفر حقيقي من الـ docs.

---

## ١. [[aws ec2 describe-volumes --filters ...]]

~~~bash
aws ec2 describe-volumes --filters Name=attachment.instance-id,Values=i-0abc1234567890def --query "Volumes[].[VolumeId,Size,VolumeType]"
~~~

[[--filters Name=attachment.instance-id,Values=...]] يعني «الديسكات المتوصلة بالسيرفر ده».

~~~text الناتج
[
    [
        "vol-84e39db33a737a500",
        8,
        "gp2"
    ]
]
~~~

رقم الـ volume، والحجم بالجيجا (8 الافتراضي)، والنوع. المحاكي حط [[gp2]]، وعلى AWS صورة Ubuntu اللي في الدرس اللي فات ([[ebs-gp3]]) بتطلّع [[gp3]]، وده الأرخص والأحسن.

---

## ٢. [[aws ec2 create-snapshot ...]]

~~~bash
aws ec2 create-snapshot --volume-id vol-0abc1234567890def --description "before upgrade"
~~~

~~~text الناتج
{
    "Tags": [],
    "SnapshotId": "snap-19b17d93f2e2acf01",
    "VolumeId": "vol-84e39db33a737a500",
    "State": "pending",
    "StartTime": "2026-10-08T10:13:31+00:00",
    "Progress": "60%",
    "OwnerId": "000000000000",
    "Description": "before upgrade",
    "VolumeSize": 8,
    "Encrypted": false
}
~~~

[[State: pending]] يعني لسه بيتنسخ، بس اللحظة اتسجلت خلاص: الـ snapshot هو الديسك زي ما كان وقت الأمر. و [[Encrypted: false]] لأن الديسك نفسه مش متشفّر. ده زرار الرجوع لو أي حاجة باظت.

---

## ٣. [[aws ec2 modify-volume --volume-id ... --size 40]]

~~~text الناتج
{
    "VolumeModification": {
        "VolumeId": "vol-84e39db33a737a500",
        "ModificationState": "modifying",
        "TargetSize": 40,
        "TargetVolumeType": "gp2",
        "OriginalSize": 8,
        "OriginalVolumeType": "gp2",
        "Progress": 0,
        "StartTime": "2026-10-08T10:13:32+00:00"
    }
}
~~~

من [[OriginalSize: 8]] لـ [[TargetSize: 40]] والسيرفر شغال. والحالة بتتابعها بـ [[describe-volumes-modifications]] (في الـ solCode): [[modifying]] ثم [[optimizing]] ثم [[completed]]. من أول [[optimizing]] نظام التشغيل بيشوف الحجم الجديد.

---

## ٤. [[sudo growpart /dev/nvme0n1 1]]

| الحتة | معناها |
|---|---|
| [[sudo]] | بصلاحيات root |
| [[growpart]] | مد partition لآخر المساحة الفاضية (من باكدج [[cloud-guest-utils]]، موجود في صور Ubuntu على AWS) |
| [[/dev/nvme0n1]] | الديسك كله. [[nvme]] لأن الأنواع الحديثة بتوصّل الديسك كـ NVMe، و [[0n1]] أول ديسك |
| [[1]] | رقم الـ partition (مسافة، مش [[p1]]) |

جرّبناه على صورة ديسك ٦٤ ميجا فيها partition واحد، وبعدين كبّرنا الملف لـ ٩٦ ميجا (زي ما [[modify-volume]] بيعمل):

~~~text الناتج
CHANGED: partition=1 start=2048 old: size=129024 end=131071 new: size=194527 end=196574
~~~

الأرقام دي بالـ **sectors** (كل sector ٥١٢ بايت). [[start=2048]] الـ partition بيبدأ بعد أول ميجا. والحجم من [[129024]] sector (حوالي ٦٣ ميجا) بقى [[194527]] (حوالي ٩٥ ميجا). وشغّلناه تاني:

~~~text الناتج لو مفيش مساحة جديدة
NOCHANGE: partition 1 is size 194527. it cannot be grown
~~~

ده نفس اللي هتشوفه لو شغّلت [[growpart]] قبل ما AWS يخلّص التكبير.

---

## ٥. [[sudo resize2fs /dev/nvme0n1p1]]

[[resize2fs]] بيمد filesystem من نوع ext2/3/4 (ده نوع Ubuntu) على المساحة اللي حواليه. و [[nvme0n1p1]] = الـ partition الأول ([[p1]]) من الديسك ده. جرّبناه على صورة filesystem من ٦٤ ميجا كبّرناها لـ ٩٦:

~~~text الناتج
resize2fs 1.47.0 (5-Feb-2023)
Resizing the filesystem on fs.img to 24576 (4k) blocks.
The filesystem on fs.img is now 24576 (4k) blocks long.
~~~

الحجم بالـ blocks، وكل block هنا ٤ كيلو ([[4k]]). فـ [[24576]] × ٤ كيلو = ٩٦ ميجا بالظبط. قبلها كان [[16384]] block = ٦٤ ميجا.

ولو شغّلته على حاجة مش ext4 (جرّبنا على صورة الديسك اللي فيها partition table):

~~~text الناتج
resize2fs: Bad magic number in super-block while trying to open /tmp/disk.img
Couldn't find valid filesystem superblock.
~~~

ونفس الرسالة دي هتطلع على Amazon Linux، لأن الـ filesystem هناك XFS، والأمر بتاعه [[sudo xfs_growfs -d /]].

---

## ٦. [[df -h /]]

اتأكد إن المساحة اللي البرامج شايفاها كبرت (الـ docs): عمود [[Size]] يقرّب من ٣٩G، و [[Avail]] زاد. لو لسه بالحجم القديم يبقى نسيت [[resize2fs]].

---

## الخلاصة

| الأمر | بيكبّر | لو نسيته |
|---|---|---|
| [[create-snapshot]] | (أمان قبل أي حاجة) | مفيش رجوع |
| [[modify-volume --size 40]] | الديسك في AWS | |
| [[growpart /dev/nvme0n1 1]] | الـ partition | [[lsblk]] يوري الديسك كبير والـ partition صغير |
| [[resize2fs /dev/nvme0n1p1]] | الـ filesystem (ext4) | [[df]] لسه بالحجم القديم |

> مينفعش تصغّر volume، وبين كل تعديل والتاني لازم تستنى (حوالي ٦ ساعات). و [[lsblk]] قبل أي حاجة عشان تعرف الأسامي الصح.`,
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
          teach: R`## الفكرة: أمر واحد طويل، وكل خيار قرار

[[create-db-instance]] أمر واحد مكسور على ٨ سطور، وكل سطر فيه قرار: الحجم، والباسورد فين، والشبكة، والتشفير، والباك أب. بعده أمر بيستنى القاعدة تقوم، وأمر بيجيب العنوان.

RDS مش موجود في LocalStack المجاني، ومفيش حساب AWS هنا، فالنواتج من الـ docs الرسمية. اللي اتجرّب فعلًا بـ AWS CLI 2.37: الأمر بكل خياراته **اتقبل** (الـ CLI بيرفض أي خيار غلط قبل ما يبعت حاجة، وده وصل لحد السيرفر)، والقيم الافتراضية اللي تحت من [[aws rds create-db-instance help]].

---

## ١. الـ [[\]] في آخر السطور

~~~bash
aws rds create-db-instance \
  --db-instance-identifier myapp-db \
~~~

[[\]] في آخر السطر في bash يعني «الأمر لسه مكمّل في السطر اللي جاي». فالـ ٨ سطور أمر واحد، متقسّم عشان يتقري. لازم يبقى آخر حرف في السطر (مسافة بعده تبوّظه). وفي PowerShell نفس الحركة بـ [[$__bt]] (backtick) بدل [[\]].

---

## ٢. الخيارات سطر سطر

### الاسم والمحرك

| الخيار | معناه |
|---|---|
| [[--db-instance-identifier myapp-db]] | اسم الـ instance في AWS. ده مش اسم الـ database جوه Postgres |
| [[--engine postgres]] | المحرك. ومن غير [[--engine-version]] بياخد النسخة الافتراضية وقتها |

### الحجم

| الخيار | معناه |
|---|---|
| [[--db-instance-class db.t4g.micro]] | [[db.]] = نوع لـ RDS، [[t]] burstable، [[4]] الجيل، [[g]] Graviton (ARM)، [[micro]] = ٢ vCPU و ١ جيجا رام |
| [[--allocated-storage 20]] | ٢٠ جيجا ديسك (أقل حاجة لـ gp3) |
| [[--storage-type gp3]] | نوع الديسك، نفس gp3 بتاع EBS |

### الباسورد

| الخيار | معناه |
|---|---|
| [[--master-username myapp_admin]] | اسم يوزر الأدمن جوه Postgres |
| [[--manage-master-user-password]] | RDS يولّد باسورد ويحطه في Secrets Manager |

الـ help بيقول عن الخيار التاني: «Specifies whether to manage the master user password with Amazon Web Services Secrets Manager». يعني الباسورد عمره ما بيتكتب في الترمنال، فميفضلش في الـ history.

### الشبكة

| الخيار | معناه |
|---|---|
| [[--db-subnet-group-name myapp-private]] | مجموعة subnets **خاصة** (من غير طريق للنت) في AZs مختلفة. لازم تتعمل قبلها |
| [[--vpc-security-group-ids sg-0db22222]] | الفايروول بتاع القاعدة: 5432 من السيرفرات بس (درس security groups) |
| [[--no-publicly-accessible]] | مفيش IP عام. [[--no-]] قدام أي خيار boolean في الـ CLI = عكسه |

### الأمان والباك أب

| الخيار | معناه |
|---|---|
| [[--storage-encrypted]] | الديسك والباك أب والـ snapshots متشفّرين (بمفتاح KMS) |
| [[--backup-retention-period 7]] | احتفظ بالباك أب التلقائي ٧ أيام |

الـ help بيقول: [[Default: 1]]، و [[0]] بيقفل الباك أب، وأقصى حاجة [[35]]. فمن غير الخيار ده من الـ CLI هتلاقي يوم واحد بس.

### لو كتبت خيار غلط

جرّبنا [[--master-user-pasword]] (ناقصها حرف):

~~~text الناتج
aws: [ERROR]: Unknown options: --master-user-pasword, x
~~~

الـ CLI بيرفض قبل ما يبعت أي حاجة، فمفيش قاعدة نص معمولة.

### الرد

حسب الـ docs، الأمر بيرجع على طول بـ JSON فيه [[DBInstance]] و [[DBInstanceStatus: creating]]. القاعدة نفسها بتاخد من ٥ لـ ١٥ دقيقة تقوم.

---

## ٣. [[aws rds wait db-instance-available --db-instance-identifier myapp-db]]

[[wait]] أوامر بتسأل AWS كل شوية (لـ RDS كل ٣٠ ثانية، لحد ٦٠ مرة) لحد ما الحالة تبقى [[available]]. مبتطبعش حاجة لو نجحت. والـ help بيقول: «will exit with a return code of 255 after 60 failed checks»، يعني بعد ٦٠ مرة × ٣٠ ثانية = نص ساعة بتخرج بكود خطأ [[255]]. فايدتها في السكربتات: الأمر اللي بعدها ميشتغلش قبل ما القاعدة تبقى جاهزة.

---

## ٤. [[aws rds describe-db-instances ... --query "DBInstances[0].[...]"]]

~~~bash
aws rds describe-db-instances --db-instance-identifier myapp-db --query "DBInstances[0].[Endpoint.Address,EngineVersion,MasterUserSecret.SecretArn]"
~~~

[[DBInstances[0]]] أول (وهنا الوحيدة) قاعدة، ومنها ٣ حاجات:

| الخانة | مثال (من الـ docs) | معناها |
|---|---|---|
| [[Endpoint.Address]] | [[myapp-db.abc123xyz.eu-central-1.rds.amazonaws.com]] | الـ host اللي التطبيق بيتصل بيه، على بورت 5432 |
| [[EngineVersion]] | [[17.6]] | النسخة اللي اتعملت. أول رقم بيحدد الـ parameter group family ([[postgres17]]) |
| [[MasterUserSecret.SecretArn]] | [[arn:aws:secretsmanager:eu-central-1:...:secret:rds!db-...]] | مكان الباسورد في Secrets Manager |

والباسورد نفسه بتجيبه بـ [[aws secretsmanager get-secret-value --secret-id ARN]] (موجود في درس «RDS من جهازك»).

---

## الخلاصة

| القرار | الخيار | ليه |
|---|---|---|
| الحجم | [[db.t4g.micro]] + ٢٠ جيجا gp3 | أرخص حاجة للتجربة |
| الباسورد | [[--manage-master-user-password]] | محدش يكتبه ولا يشوفه |
| الشبكة | subnet group خاصة + security group + [[--no-publicly-accessible]] | مقفولة عن النت |
| التشفير | [[--storage-encrypted]] | الداتا والباك أب |
| الباك أب | [[--backup-retention-period 7]] | الافتراضي من الـ CLI يوم واحد |

> القاعدة بتتحاسب بالساعة من أول ما تقوم، حتى لو محدش بيستخدمها. خلصت التجربة؟ امسحها.`,
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
          teach: R`## الفكرة: نوعين باك أب، واسترجاع بيعمل قاعدة جديدة

المثال ٤ أوامر: خد snapshot بإيدك، اعرض الـ snapshots، اعرف أقرب لحظة تقدر ترجعلها، وارجع للحظة معينة. أهم حاجة تفهمها: الاسترجاع **عمره ما بيلمس** القاعدة الأصلية، بيعمل instance جديدة جنبها.

RDS مش موجود في LocalStack المجاني ومفيش حساب AWS هنا، فالنواتج من الـ docs. اللي اتجرّب بـ AWS CLI 2.37: الأوامر بخياراتها اتقبلت، وقيود [[--restore-time]] من الـ help، وتحويل الوقت لـ UTC بـ [[date]] على Ubuntu 24.04.

### النوعين

| | automated backup | manual snapshot |
|---|---|---|
| مين بيعمله | RDS كل يوم لوحده | انت بـ [[create-db-snapshot]] |
| بيسمح بـ | الرجوع لأي ثانية في المدة (PITR) | الرجوع للحظة الـ snapshot بس |
| بيفضل لحد | مدة الاحتفاظ ([[--backup-retention-period]]) | ما تمسحه بإيدك، حتى لو القاعدة اتمسحت |

PITR = Point-In-Time Recovery: استرجاع لنقطة في الزمن.

---

## ١. [[aws rds create-db-snapshot ...]]

~~~bash
aws rds create-db-snapshot --db-instance-identifier myapp-db --db-snapshot-identifier myapp-before-migration-42
~~~

| الحتة | معناها |
|---|---|
| [[--db-instance-identifier myapp-db]] | خد snapshot من القاعدة دي |
| [[--db-snapshot-identifier myapp-before-migration-42]] | اسم الـ snapshot. اسم بيقول **ليه** اتعمل (قبل migration رقم ٤٢) بيوفّر عليك تخمين بعد شهر |

الرد (من الـ docs) فيه [[DBSnapshot]] و [[Status: creating]].

---

## ٢. [[aws rds describe-db-snapshots ... --output table]]

~~~bash
aws rds describe-db-snapshots --db-instance-identifier myapp-db --query "DBSnapshots[].[DBSnapshotIdentifier,SnapshotCreateTime,Status]" --output table
~~~

جدول، كل snapshot في سطر: اسمه، ووقته، وحالته ([[creating]] ثم [[available]]). ومن غير [[--snapshot-type manual]] هتلاقي كمان الـ snapshots التلقائية، وأساميها بتبدأ بـ [[rds:myapp-db-]] وبعدها التاريخ.

---

## ٣. [[aws rds describe-db-instances ... --query "DBInstances[0].LatestRestorableTime"]]

بيرجّع وقت واحد بالـ UTC، زي [[2026-09-28T10:35:00+00:00]] (شكله من الـ docs). ده **آخر** لحظة تقدر ترجعلها، وغالبًا متأخرة عن دلوقتي بحوالي ٥ دقايق، لأن لوجات التعديلات بتترفع على دفعات.

---

## ٤. [[aws rds restore-db-instance-to-point-in-time ...]]

~~~bash
aws rds restore-db-instance-to-point-in-time --source-db-instance-identifier myapp-db --target-db-instance-identifier myapp-db-restored --restore-time 2026-09-28T10:00:00Z --db-subnet-group-name myapp-private --vpc-security-group-ids sg-0db22222 --no-publicly-accessible
~~~

| الخيار | معناه |
|---|---|
| [[--source-db-instance-identifier myapp-db]] | ارجع بتاريخ القاعدة دي |
| [[--target-db-instance-identifier myapp-db-restored]] | في instance **جديدة** بالاسم ده، وبعنوان جديد |
| [[--restore-time 2026-09-28T10:00:00Z]] | للحظة دي |
| [[--db-subnet-group-name]] و [[--vpc-security-group-ids]] و [[--no-publicly-accessible]] | نفس شبكة وفايروول الأصلية |

### الوقت: [[2026-09-28T10:00:00Z]]

| الحتة | معناها |
|---|---|
| [[2026-09-28]] | التاريخ |
| [[T]] | فاصل بين التاريخ والساعة (ISO 8601) |
| [[10:00:00]] | الساعة |
| [[Z]] | UTC (اسمها Zulu) |

الـ help بيقول القيود صريحة: [[Must be a time in Universal Coordinated Time (UTC) format]] و [[Must be before the latest restorable time for the DB instance]]. يعني لو قلت «الساعة ١ الضهر بتوقيت مصر»، لازم تحوّلها الأول. [[date]] بيعملها (اتجرّب على Ubuntu، و [[+0300]] هو فرق توقيت مصر الصيفي):

~~~bash
date -u -d "2026-09-28 13:00 +0300" +%Y-%m-%dT%H:%M:%SZ
~~~

~~~text الناتج
2026-09-28T10:00:00Z
~~~

| الحتة | معناها |
|---|---|
| [[-u]] | اطبع بالـ UTC |
| [[-d "..."]] | الوقت ده بدل دلوقتي |
| [[+%Y-%m-%dT%H:%M:%SZ]] | الشكل: سنة-شهر-يوم T ساعة:دقيقة:ثانية Z |

ومن غير [[-d]] بيطبع الوقت دلوقتي بنفس الشكل، وده اللي الـ solCode بيعمله قبل المسح عشان تعرف ترجع لإمتى بالظبط:

~~~text date -u +%Y-%m-%dT%H:%M:%SZ
2026-10-08T10:15:41Z
~~~

### ليه الشبكة لازم تتكتب تاني؟

الـ instance الجديدة مبتورثش الـ security group ولا الـ parameter group من الأصلية تلقائيًا بالضرورة، فلو نسيتهم ممكن تطلع على الإعدادات الافتراضية والتطبيق ميعرفش يوصلها، وتفتكر الباك أب بايظ. اكتبهم صريح.

---

## بعد الاسترجاع

1. استنى [[aws rds wait db-instance-available --db-instance-identifier myapp-db-restored]].
2. هات العنوان الجديد ([[Endpoint.Address]]).
3. يا تنقل التطبيق عليه، يا (الأغلب) تاخد [[pg_dump]] للجدول اللي باظ وترجّعه في الأصلية.
4. امسح [[myapp-db-restored]]، لأنها بتتحاسب بالساعة زي الأصلية.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[create-db-snapshot]] | نسخة يدوية بتفضل لحد ما تمسحها |
| [[describe-db-snapshots]] | القايمة وحالتها |
| [[LatestRestorableTime]] | آخر لحظة تقدر ترجعلها |
| [[restore-db-instance-to-point-in-time]] | instance جديدة بالداتا زي ما كانت في لحظة بالـ UTC |

> الباك أب اللي عمرك ما جرّبت ترجّعه مش باك أب. جرّب الاسترجاع على قاعدة تجربة قبل اليوم اللي تحتاجه فيه.`,
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
          teach: R`## الفكرة: نفق من جهازك لحد القاعدة، عن طريق سيرفر جوه الـ VPC

القاعدة في private subnet، فجهازك مش شايفها خالص. بس فيه سيرفر EC2 جوه نفس الـ VPC **شايفها**. فبتفتح «نفق»: أي حاجة تدخل بورت 5433 على جهازك، تطلع من ناحية السيرفر على القاعدة 5432.

~~~text
psql على جهازك  ──►  localhost:5433  ══ نفق ══►  سيرفر EC2  ──►  القاعدة:5432
~~~

المثال: هات عنوان القاعدة، افتح النفق (Session Manager)، اتصل بـ psql، والسطر الأخير طريقة تانية للنفق (SSH). كله محتاج حساب AWS وسيرفر وقاعدة حقيقيين، فالنواتج من الـ docs. اللي اتجرّب هنا: إن PowerShell 5.1 بيبوّظ الـ JSON بتاع [[--parameters]] (تحت).

---

## ١. [[aws rds describe-db-instances ... --query "DBInstances[0].Endpoint.Address" --output text]]

بيطبع الـ host بس، من غير علامات (بسبب [[--output text]])، زي [[myapp-db.abc123xyz.eu-central-1.rds.amazonaws.com]]. الاسم ده DNS بيتحوّل لـ IP خاص زي [[10.0.2.15]]، ومن جهازك مش هتقدر توصله مباشرة.

---

## ٢. [[aws ssm start-session ...]]: النفق من غير أي بورت مفتوح

~~~bash
aws ssm start-session --target i-0abc1234567890def --document-name AWS-StartPortForwardingSessionToRemoteHost --parameters '{"host":["myapp-db.abc123xyz.eu-central-1.rds.amazonaws.com"],"portNumber":["5432"],"localPortNumber":["5433"]}'
~~~

| الحتة | معناها |
|---|---|
| [[ssm]] | AWS Systems Manager |
| [[start-session]] | افتح جلسة Session Manager |
| [[--target i-0abc...]] | السيرفر اللي هنعدي عليه |
| [[--document-name AWS-StartPortForwardingSessionToRemoteHost]] | نوع الجلسة: «وصّل بورت عندي بـ host تاني من ناحية السيرفر». من غيره بتاخد ترمنال عادي |
| [[--parameters '{...}']] | إعدادات النوع ده |

### الـ parameters

| الخانة | القيمة | معناها |
|---|---|---|
| [[host]] | عنوان RDS | السيرفر يوصّل لمين |
| [[portNumber]] | [[5432]] | على أنهي بورت عنده |
| [[localPortNumber]] | [[5433]] | البورت اللي هيتفتح على جهازك |

كل قيمة جوه [[[ ]]] ونص بين علامتين، حتى الأرقام: ده الشكل اللي الـ API طالبه. و 5433 مش 5432 عشان لو عندك Postgres محلي على 5432 ميتلخبطش معاه.

### ليه مفيش بورت مفتوح؟

على السيرفر برنامج اسمه SSM agent، هو اللي **بيطلع** لـ AWS ويفتح اتصال. الـ security group مش محتاجة أي قاعدة دخول، ولا 22. وكل جلسة بتتسجل في CloudTrail. الشروط (من الـ docs): الـ role بتاعة السيرفر فيها [[AmazonSSMManagedInstanceCore]]، و [[session-manager-plugin]] متسطّب على جهازك.

### الناتج (من الـ docs)

~~~text الناتج
Starting session with SessionId: ali-0a1b2c3d4e5f6a7b8
Port 5433 opened for sessionId ali-0a1b2c3d4e5f6a7b8.
Waiting for connections...
~~~

وبيفضل مفتوح لحد ما تقفله بـ Ctrl+C. فالأمر الجاي في ترمنال تاني.

### على ويندوز: خلي بالك من العلامات

جرّبنا نبعت نفس شكل الـ JSON لبرنامج على ويندوز ونطبعه زي ما وصل:

~~~text PowerShell 7
{"host":["myapp-db"],"portNumber":["5432"]}
~~~

~~~text Windows PowerShell 5.1
{host:[myapp-db],portNumber:[5432]}
~~~

PowerShell 5.1 بيشيل العلامات [["]] الداخلية وهو بيبعت لبرنامج خارجي، فالـ CLI بياخد JSON بايظ. الحل: PowerShell 7، أو الـ shorthand اللي الـ docs بتاعة AWS نفسها بتستخدمه: [[--parameters host=myapp-db.abc123xyz.eu-central-1.rds.amazonaws.com,portNumber=5432,localPortNumber=5433]].

---

## ٣. [[psql "postgresql://myapp_admin@localhost:5433/postgres?sslmode=require"]]

نفك الـ URL:

| الحتة | معناها |
|---|---|
| [[postgresql://]] | النوع |
| [[myapp_admin@]] | اليوزر. مفيش باسورد في الـ URL، فـ psql هيسألك |
| [[localhost:5433]] | النفق على جهازك |
| [[/postgres]] | اسم الـ database (الافتراضية) |
| [[?sslmode=require]] | الاتصال لازم يبقى مشفّر |

[[require]] بيشفّر من غير ما يتأكد من الشهادة. ليه مش [[verify-full]]؟ لأن الشهادة مكتوب فيها اسم RDS، وانت متصل بـ [[localhost]]، فالتحقق من الاسم هيفشل. التشفير لسه شغال لحد RDS نفسه. وحسب الـ docs psql بيطبع أول ما يتصل سطر زي [[SSL connection (protocol: TLSv1.3, ...)]].

---

## ٤. [[ssh -i myapp-key.pem -N -L 5433:HOST:5432 ubuntu@203.0.113.10]]: البديل

| الحتة | معناها |
|---|---|
| [[-i myapp-key.pem]] | المفتاح |
| [[-N]] | متفتحش shell، النفق بس |
| [[-L 5433:HOST:5432]] | Local forward: البورت [[5433]] عندي، يروح لـ [[HOST:5432]] **من ناحية السيرفر** |
| [[ubuntu@203.0.113.10]] | السيرفر اللي بنعدي عليه |

نفس النتيجة، بس محتاج بورت 22 مفتوح لـ IP بيتك في الـ security group، ومفيش تسجيل مركزي للجلسات.

---

## الخلاصة

| | Session Manager | SSH tunnel |
|---|---|---|
| بورت مفتوح على السيرفر | ولا واحد | 22 |
| محتاج على جهازك | [[session-manager-plugin]] | [[ssh]] (موجود) |
| تسجيل الجلسات | CloudTrail | لوج sshd على السيرفر بس |
| الأمر | [[aws ssm start-session ... PortForwarding...]] | [[ssh -N -L 5433:HOST:5432]] |

> بورت مختلف لكل بيئة (5433 للإنتاج و 5432 للمحلي)، عشان متشغّلش migration على الإنتاج وانت فاكر نفسك على جهازك. وقفل النفق لما تخلص.`,
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
    }
]);

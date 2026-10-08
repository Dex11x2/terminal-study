// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
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
          teach: R`## الفكرة: ٤ أوامر: اسأل، واقترح، وقارن، ووفّر

كل سطر بيجاوب سؤال: الفلوس رايحة فين؟ أنهي سيرفر أكبر من اللازم؟ Spot بكام؟ وآخر سطر مش سؤال، ده توفير فعلي: طريق ببلاش من الـ VPC لـ S3.

اللي اتجرّب بـ AWS CLI 2.37.10 على LocalStack 4.9: [[describe-spot-price-history]] و [[create-vpc-endpoint]] (على VPC و route table عملناهم للتجربة)، والـ [[sort]] اللي في الحل على أوبونتو 24.04. خدمتي Cost Explorer ([[ce]]) و Compute Optimizer مش موجودين في LocalStack المجاني ([[InternalFailure]])، فشكل نواتجهم من الـ docs.

---

## ١. [[aws ce get-cost-and-usage]]: الفلوس رايحة فين

~~~bash
aws ce get-cost-and-usage --time-period Start=2026-09-01,End=2026-09-29 --granularity MONTHLY --metrics UnblendedCost --group-by Type=DIMENSION,Key=SERVICE
~~~

| الحتة | معناها |
|---|---|
| [[ce]] | Cost Explorer |
| [[--time-period Start=...,End=...]] | من أول سبتمبر لحد ٢٩. الـ [[End]] **مش** داخل في الفترة |
| [[--granularity MONTHLY]] | رقم لكل شهر ([[DAILY]] رقم لكل يوم) |
| [[--metrics UnblendedCost]] | التكلفة زي ما اتحسبت في وقتها، من غير توزيع الخصومات |
| [[--group-by Type=DIMENSION,Key=SERVICE]] | قسّمها بالخدمة: EC2 لوحده، و S3 لوحده... |

الرد (من الـ docs) فيه [[ResultsByTime]]، وجواه [[Groups]]: كل group فيه [[Keys]] (اسم الخدمة) و [[Metrics.UnblendedCost.Amount]] (المبلغ بالدولار كنص).

### الحل: بالـ usage type ومترتب

~~~bash
aws ce get-cost-and-usage ... --group-by Type=DIMENSION,Key=USAGE_TYPE --query "ResultsByTime[].Groups[].[Keys[0],Metrics.UnblendedCost.Amount]" --output text | sort -k2 -g -r | head -20
~~~

- [[Key=USAGE_TYPE]] بدل [[SERVICE]]: بند EC2 الكبير بيتفك لـ [[BoxUsage]] (السيرفر) و [[NatGateway-Hours]] و [[PublicIPv4]]...
- [[--query "...[Keys[0],Metrics...Amount]"]] اسم البند والمبلغ بس، و [[--output text]] كل بند في سطر بينهم Tab.
- [[sort -k2 -g -r]] رتّب بالعمود التاني ([[-k2]]) كرقم ([[-g]]) من الكبير للصغير ([[-r]]).
- [[head -20]] أكبر ٢٠ بند.

ليه [[-g]] مش [[-n]]؟ [[-g]] (general numeric) بيفهم كمان الشكل العلمي زي [[1.2e1]] (يعني ١٢) أو [[6.7E-8]]، و [[-n]] لأ. فلو أي مبلغ صغير جه بالشكل ده، [[-n]] هيرتبه غلط. جرّبنا على أوبونتو:

~~~text sort -k2 -n -r
b   10
a   9
c   1.2e1
~~~

[[-n]] قرا [[1.2e1]] كأنه ١.٢ فحطه الأخير. وبـ [[-g]] على سطور مثال (الأرقام مش من حساب حقيقي):

~~~text sort -k2 -g -r
EUC1-NatGateway-Hours            34.56
EUC1-BoxUsage:t3.medium          30.3744
EUC1-DataTransfer-Out-Bytes      1.2e1
EUC1-PublicIPv4:InUseAddress     3.6
EUC1-TimedStorage-ByteHrs        0.0021
~~~

[[EUC1]] اختصار الـ region (eu-central-1). ولاحظ إن الـ NAT ممكن يطلع أغلى من السيرفر نفسه.

> كل طلب لـ Cost Explorer API بحوالي سنت (من الـ docs)، فمتحطوش في loop.

---

## ٢. [[compute-optimizer]]: أنهي سيرفر أكبر من اللازم

~~~bash
aws compute-optimizer get-ec2-instance-recommendations --query "instanceRecommendations[].[instanceArn,finding,recommendationOptions[0].instanceType]" --output table
~~~

لكل سيرفر ٣ خانات: الـ ARN، و [[finding]] (من الـ docs: [[OVER_PROVISIONED]] أكبر من اللازم، أو [[UNDER_PROVISIONED]] أصغر، أو [[OPTIMIZED]])، و [[recommendationOptions[0].instanceType]] أول نوع مقترح. محتاج تفعّل الخدمة الأول، وبيبص على أسابيع من الاستخدام قبل ما يقترح.

---

## ٣. [[describe-spot-price-history]]

~~~bash
aws ec2 describe-spot-price-history --instance-types t4g.small --product-descriptions "Linux/UNIX" --max-items 3
~~~

| الحتة | معناها |
|---|---|
| [[t4g.small]] | [[t]] = burstable، و [[4]] = الجيل، و [[g]] = Graviton (معالج ARM من AWS)، و [[small]] = الحجم |
| [[--product-descriptions "Linux/UNIX"]] | السعر بيختلف حسب نظام التشغيل |
| [[--max-items 3]] | آخر ٣ أسعار بس |

~~~text الناتج (LocalStack)
"AvailabilityZone": "eu-central-1a",
"InstanceType": "t4g.small",
"ProductDescription": "Linux/UNIX (Amazon VPC)",
"SpotPrice": "0.00001",
~~~

الشكل هو هو، بس السعر من المحاكي ([[0.00001]]). في AWS السعر بالدولار للساعة، ومختلف لكل AZ، وبيتغير مع الطلب. قارنه بسعر الـ on-demand لنفس النوع عشان تعرف الخصم.

---

## ٤. [[create-vpc-endpoint]]: S3 من غير NAT

~~~bash
aws ec2 create-vpc-endpoint --vpc-id vpc-0abc1234 --service-name com.amazonaws.eu-central-1.s3 --route-table-ids rtb-0abc1234
~~~

| الحتة | معناها |
|---|---|
| [[--vpc-id]] | الشبكة بتاعتك |
| [[--service-name com.amazonaws.eu-central-1.s3]] | الخدمة: S3 في فرانكفورت |
| [[--route-table-ids]] | جداول التوجيه اللي هيتضاف لها الطريق (بتاعة الـ private subnets) |

~~~text الناتج (LocalStack)
vpce-444b0ded3486b8e22   com.amazonaws.eu-central-1.s3   available   rtb-6531d47481f5bd475
~~~

وبعدها جدول التوجيه بقى فيه سطر جديد:

~~~text aws ec2 describe-route-tables
"DestinationPrefixListId": "pl-a06e80643bd7c612d",
"GatewayId": "vpce-444b0ded3486b8e22",
~~~

يعني: أي ترافيك رايح لعناوين S3 ([[pl-...]] = prefix list، قايمة عناوين S3 في الـ region) يروح للـ endpoint، مش للـ NAT. ونوعه gateway (الافتراضي من غير [[--vpc-endpoint-type]]) وده ببلاش، بينما NAT Gateway بياخد على الساعة وعلى كل جيجا.

---

## الخلاصة

| السطر | السؤال |
|---|---|
| [[ce get-cost-and-usage]] بالـ SERVICE ثم USAGE_TYPE | الفلوس رايحة فين بالظبط؟ |
| [[compute-optimizer]] | مين أكبر من احتياجه؟ |
| [[describe-spot-price-history]] | Spot بكام لنوع معين؟ |
| [[create-vpc-endpoint]] لـ S3 | ترافيك S3 ميعدّيش على الـ NAT |

ورتّب بـ [[sort -g]] مش [[-n]] لما الأرقام ممكن تيجي بالشكل العلمي.`,
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
          teach: R`## الفكرة: دوّر الأول، وبعدين امسح بالترتيب

أول سطرين **بيدوّروا** بس (مبيغيّروش حاجة): ديسكات مش متوصلة، و IPs مش مربوطة. والخمسة اللي بعدهم **بيمسحوا** نهائي: سيرفر، وديسك، و IP، وقاعدة بيانات، و bucket.

اتجرّب بـ AWS CLI 2.37.10 على LocalStack 4.9: عملنا ديسك 8 جيجا و Elastic IP وسيرفر، ودوّرنا ومسحنا. وسكربت الحل (اللفة على كل الـ regions) اتشغّل كامل جوه container الـ aws-cli. RDS و ELB مش موجودين في LocalStack المجاني ([[InternalFailure]])، فسطر الـ RDS من الـ docs.

> على حسابك الحقيقي: قبل أي سطر مسح، [[aws sts get-caller-identity]] (أنهي حساب؟) و [[aws configure get region]] (أنهي region؟).

---

## ١. الديسكات اللي مش متوصلة

~~~bash
aws ec2 describe-volumes --filters Name=status,Values=available --query "Volumes[].[VolumeId,Size,CreateTime]" --output table
~~~

| الحتة | معناها |
|---|---|
| [[--filters Name=status,Values=available]] | الديسكات اللي حالتها [[available]]، يعني مش متوصلة بأي سيرفر. المتوصل حالته [[in-use]] |
| [[--query "Volumes[].[...]"]] | لكل ديسك: الـ ID، والحجم بالجيجا، وإمتى اتعمل |
| [[--output table]] | جدول |

~~~text الناتج
-------------------------------------------------------------
|                      DescribeVolumes                      |
+------------------------+----+-----------------------------+
|  vol-ad110fb77c653e4d2 |  8 |  2026-10-08T13:52:50+00:00  |
+------------------------+----+-----------------------------+
~~~

[[CreateTime]] بيقولك من إمتى الديسك ده بيتحاسب وهو مش متوصل بحاجة.

---

## ٢. الـ Elastic IPs اللي مش مربوطة

~~~bash
aws ec2 describe-addresses --query "Addresses[?AssociationId==null].[AllocationId,PublicIp]" --output table
~~~

هنا الفلتر جوه الـ [[--query]] نفسه: [[[?AssociationId==null]]] معناها «خد بس اللي [[AssociationId]] بتاعهم فاضي»، يعني الـ IP محجوز ومش مربوط بسيرفر. [[?]] في JMESPath = فلتر.

~~~text الناتج
|  eipalloc-937e7a2ea9398f62c |  127.27.255.160  |
~~~

(الـ IP ده من المحاكي.) كل IPv4 عام بيتحاسب بالساعة، مربوط أو لأ.

---

## ٣. المسح بالترتيب

~~~bash
aws ec2 terminate-instances --instance-ids i-0abc1234567890def
~~~

~~~text الناتج (LocalStack، بـ --query)
i-c169685fa1ae124cc    running    shutting-down
~~~

الـ ID، والحالة اللي كان فيها، والحالة دلوقتي. [[terminate]] مش [[stop]]: الـ stop بيوقف السيرفر والديسك فاضل يتحاسب، والـ terminate بيمسحه خالص. وبعدها بيفضل ظاهر بحالة [[terminated]] شوية، ومش بيتحاسب.

~~~bash
aws ec2 delete-volume --volume-id vol-0abc1234567890def
aws ec2 release-address --allocation-id eipalloc-0abc1234567890def
~~~

الاتنين مبيطبعوش حاجة لو نجحوا (exit code 0). ولو شغّلت المسح تاني على نفس الديسك:

~~~text الناتج
An error occurred (InvalidVolume.NotFound) when calling the DeleteVolume operation: The volume 'vol-ad110fb77c653e4d2' does not exist.
~~~

[[release-address]] بيرجّع الـ IP لـ AWS. ده IP مش هيرجعلك تاني، فلو حاجة (DNS أو whitelist عند عميل) متعلقة بيه، غيّرها الأول.

الترتيب: السيرفر الأول (عشان الديسك يبقى [[available]] والـ IP يتفك)، وبعدين الديسكات اللي فضلت، وبعدين الـ IPs.

---

## ٤. قاعدة البيانات (من الـ docs)

~~~bash
aws rds delete-db-instance --db-instance-identifier myapp-db-restored --final-db-snapshot-identifier myapp-db-restored-final
~~~

[[--final-db-snapshot-identifier]] اسم snapshot أخير بياخده قبل المسح، وده طريق الرجوع. والبديل [[--skip-final-snapshot]] معناه مفيش رجوع. وخد بالك إن الـ snapshot ده نفسه بيتحاسب على التخزين لحد ما تمسحه.

---

## ٥. الـ bucket: [[s3 rb --force]]

[[rb]] = remove bucket. من غير [[--force]] على bucket فيه ملفات:

~~~text الناتج
remove_bucket failed: s3://myapp-old-assets An error occurred (BucketNotEmpty) ...
~~~

ومع [[--force]]: بيمسح كل ملف وبعدين الـ bucket:

~~~text الناتج
delete: s3://myapp-old-assets/a.txt
delete: s3://myapp-old-assets/img/b.txt
remove_bucket: myapp-old-assets
~~~

### ولو الـ versioning شغال؟

جرّبنا bucket عليه versioning ورفعنا نفس الملف مرتين:

~~~text aws s3 rb s3://myapp-vers --force
delete: s3://myapp-vers/a.txt
remove_bucket failed: s3://myapp-vers An error occurred (BucketNotEmpty) ... You must delete all versions in the bucket.
~~~

الـ [[delete]] حط «علامة مسح» (delete marker) بس، والنسختين القديمتين لسه موجودين. [[list-object-versions]] ورّانا ٣ حاجات بنفس الاسم [[a.txt]]: نسختين وعلامة المسح. مسحناهم واحدة واحدة بـ [[s3api delete-object --version-id]]، وبعدها [[rb]] نجح.

---

## ٦. الحل: لفة على كل الـ regions

~~~bash
for r in $(aws ec2 describe-regions --query "Regions[].RegionName" --output text); do
  echo "== $r"
  aws ec2 describe-volumes --region $r --filters Name=status,Values=available --query "Volumes[].[VolumeId,Size]" --output text | sed 's/^/volumes: /' | grep -v ': $'
  ...
done
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[$(aws ec2 describe-regions ...)]] | أسماء كل الـ regions المفعّلة، مفصولة بمسافات |
| [[for r in ...; do ... done]] | كرر لكل region، والاسم في [[$r]] |
| [[--region $r]] | الأمر ده في الـ region دي بالذات |
| [[sed 's/^/volumes: /']] | حط [[volumes: ]] في أول كل سطر ([[^]] = أول السطر) |
| [[grep -v ': $']] | [[-v]] = اطبع اللي **مش** مطابق. و [[': $']] = سطر بينتهي بـ [[: ]] (يعني [[volumes: ]] لوحدها ومفيش نتيجة) |

يعني لو مفيش حاجة، السطر الفاضي بيختفي، وميتطبعش غير اسم الـ region. على LocalStack بعد ما مسحنا كل حاجة، أسطر EC2 كلها فاضية، وسطرين [[elbv2]] و [[rds]] طلعوا [[InternalFailure]] في كل region (مش موجودين في المحاكي). على حساب حقيقي نضيف المفروض تشوف [[== region]] بس.

---

## الخلاصة

| الأمر | بيعمل إيه | يترجع؟ |
|---|---|---|
| [[describe-volumes]] بـ [[status=available]] | ديسكات مش متوصلة | قراية بس |
| [[describe-addresses]] بـ [[AssociationId==null]] | IPs مش مربوطة | قراية بس |
| [[terminate-instances]] | يمسح السيرفر | لأ |
| [[delete-volume]] | يمسح الديسك | لأ |
| [[release-address]] | يرجّع الـ IP | لأ |
| [[delete-db-instance --final-db-snapshot-identifier]] | يمسح القاعدة بعد snapshot | من الـ snapshot |
| [[s3 rb --force]] | يمسح الملفات والـ bucket (مش النسخ القديمة) | لأ |`,
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
          teach: R`## الفكرة: ٥ أوامر، كل واحد بيقفل نقطة فشل

| السطر | بيحمي من إيه |
|---|---|
| [[--multi-az]] | وقوع الـ AZ (المبنى) اللي فيه القاعدة |
| [[--force-failover]] | مش حماية: ده **تمرين** إن الحماية شغالة |
| [[--min-size 2]] | وقوع سيرفر تطبيق |
| S3 versioning | مسح أو كتابة فوق ملف بالغلط |
| [[copy-db-snapshot]] لـ region تانية | وقوع region كاملة أو ضياع الحساب |

اللي اتجرّب: [[put-bucket-versioning]] على LocalStack 4.9 بـ AWS CLI 2.37. RDS و Auto Scaling مش موجودين في LocalStack المجاني ([[InternalFailure]])، فأوامرهم من الـ docs. وسكربت الحل اتجرّب على Postgres 16 في Docker مع «failover» معمول بإيدنا (تحت).

---

## ١. [[modify-db-instance --multi-az]]

~~~bash
aws rds modify-db-instance --db-instance-identifier myapp-db --multi-az --apply-immediately
~~~

- [[--multi-az]] اعمل نسخة standby في AZ تانية، وكل كتابة بتتكتب في الاتنين قبل ما القاعدة ترد بـ «تمام» (synchronous). فلو الأساسية وقعت، مفيش داتا ضاعت.
- [[--apply-immediately]] دلوقتي، مش في الـ maintenance window الجاية. التحويل لـ Multi-AZ نفسه مش بيوقف القاعدة (حسب الـ docs)، بس ممكن يبطّأها وهو بينسخ.

والسعر تقريبًا الضعف: انت بتدفع لسيرفرين.

---

## ٢. [[reboot-db-instance --force-failover]]

~~~bash
aws rds reboot-db-instance --db-instance-identifier myapp-db --force-failover
~~~

restart، بس بدل ما الأساسية ترجع، الـ standby تبقى هي الأساسية. ده نفس اللي بيحصل لو الـ AZ وقعت فعلًا، فبتعرف التطبيق بتاعك هيعمل إيه. الـ endpoint (اسم الـ DNS بتاع القاعدة) هو هو، بس بيشاور على IP تاني.

### الحل: سكربت يقيس الوقفة

~~~bash
export PGCONNECT_TIMEOUT=2
while true; do
  if out=$(psql "$DATABASE_URL" -Atc "select inet_server_addr()" 2>&1); then echo "$(date +%T) OK $out"; else echo "$(date +%T) FAIL"; fi
  sleep 1
done
~~~

| الحتة | معناها |
|---|---|
| [[PGCONNECT_TIMEOUT=2]] | لو الاتصال مخلصش في ثانيتين، اعتبره فشل (بدل ما يستنى كتير) |
| [[while true; do ... done]] | كرر للأبد (Ctrl+C يوقفه) |
| [[out=$(psql ...)]] | شغّل psql وحط ناتجه في [[out]] |
| [[-A]] و [[-t]] | من غير محاذاة ومن غير عناوين: القيمة بس |
| [[-c "select inet_server_addr()"]] | اسأل السيرفر: IP بتاعك إيه؟ |
| [[2>&1]] | الأخطاء كمان تروح لـ [[out]] بدل الشاشة |
| [[if ...; then OK; else FAIL; fi]] | psql نجح؟ اطبع الـ IP. فشل؟ اطبع FAIL |
| [[date +%T]] | الوقت ساعة:دقيقة:ثانية |

**التجربة:** على شبكة Docker، Postgres اسمه [[db]]، والسكربت بيكلّم [[postgres://postgres@db/postgres]]. وفي النص مسحنا الـ container، وقومنا واحد جديد بنفس الاسم [[db]] بس بـ IP مختلف. ده تقليد للي RDS بيعمله: الاسم ثابت والـ IP بيتغير.

~~~text الناتج
14:03:48 OK 172.18.0.3
14:03:49 OK 172.18.0.3
14:03:55 FAIL
14:03:56 FAIL
14:03:57 FAIL
14:03:58 OK 172.18.0.5
14:03:59 OK 172.18.0.5
~~~

- من [[49]] لـ [[55]] مفيش سطور: psql كان مستني الـ timeout.
- [[FAIL]] ٣ مرات: مفيش حد بالاسم ده.
- رجع لوحده بـ IP جديد ([[.5]] بدل [[.3]]) لأن السكربت بيفتح اتصال جديد كل مرة، فبيسأل الـ DNS من الأول.

في RDS الحقيقي الوقفة (حسب AWS) عادةً دقيقة أو اتنين. والتطبيق بتاعك مش زي السكربت: الـ pool ماسك اتصالات قديمة، فلازم يكتشف إنها ماتت ويفتح جديدة.

---

## ٣. [[update-auto-scaling-group]]

~~~bash
aws autoscaling update-auto-scaling-group --auto-scaling-group-name myapp-web --min-size 2 --max-size 6 --desired-capacity 2
~~~

| الخانة | معناها |
|---|---|
| [[--min-size 2]] | أقل عدد سيرفرات، حتى لو مفيش ترافيك. لو واحد وقع، فيه التاني |
| [[--max-size 6]] | أقصى عدد وقت الضغط (سقف للفاتورة) |
| [[--desired-capacity 2]] | العدد المطلوب دلوقتي |

والـ group موزّع على أكتر من AZ، فـ ٢ = واحد في كل مبنى.

---

## ٤. [[put-bucket-versioning]]

~~~bash
aws s3api put-bucket-versioning --bucket myapp-assets --versioning-configuration Status=Enabled
aws s3api get-bucket-versioning --bucket myapp-assets
~~~

~~~text الناتج
{
    "Status": "Enabled"
}
~~~

من هنا ورايح، أي ملف يتكتب فوقه أو يتمسح، النسخة القديمة بتفضل (شفنا ده في الدرس اللي فات: المسح بقى «علامة» بس). وكل نسخة بتتحاسب تخزين، فحط lifecycle rule يمسح النسخ القديمة بعد مدة.

---

## ٥. [[copy-db-snapshot]] لـ region تانية

~~~bash
aws rds copy-db-snapshot --source-db-snapshot-identifier arn:aws:rds:eu-central-1:123456789012:snapshot:myapp-before-migration-42 --target-db-snapshot-identifier myapp-dr-copy --source-region eu-central-1 --kms-key-id alias/myapp-dr --region eu-west-1
~~~

| الحتة | معناها |
|---|---|
| [[--source-db-snapshot-identifier arn:...]] | الـ snapshot الأصلي بالـ ARN الكامل (لازم ARN لما يبقى من region تانية) |
| [[--target-db-snapshot-identifier]] | اسم النسخة الجديدة |
| [[--source-region eu-central-1]] | جاي منين |
| [[--region eu-west-1]] | الأمر نفسه بيتنفذ في أيرلندا: النسخة بتتعمل هناك |
| [[--kms-key-id alias/myapp-dr]] | مفتاح تشفير في أيرلندا. مفاتيح KMS مربوطة بالـ region، فالـ snapshot المتشفّر محتاج مفتاح من هناك |

---

## الخلاصة

| المستوى | الأداة | الرقم المهم |
|---|---|---|
| سيرفر | Auto Scaling بـ [[min-size 2]] | ولا ثانية لو الـ health check شغال |
| AZ | RDS Multi-AZ | failover دقيقة أو اتنين |
| ملف | S3 versioning | ترجّع أي نسخة |
| region | snapshot في region تانية | الـ RPO = عمر آخر نسخة |

وأي حاجة من دول من غير تمرين ([[--force-failover]]، أو استرجاع حقيقي) مجرد افتراض.`,
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
    }
]);

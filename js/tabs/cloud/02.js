// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
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
          teach: R`## الفكرة: ٣ أوامر بتكلّم Route 53، و ٢ بيسألوا الدنيا

أول ٣ سطور في المثال بيكلّموا Route 53 نفسه: اعرض الـ zones، وطبّق تغيير، واعرض الـ records. وآخر سطرين بـ [[dig]] بيسألوا الـ DNS العادي اللي أي زائر بيسأله: الكلام وصل للناس ولا لأ؟

أوامر [[aws route53]] جرّبناها على LocalStack 4.9 (محاكي AWS على الجهاز) بـ [[amazon/aws-cli]] جوه Docker، و [[dig]] اتشغّل على دومينات حقيقية من [[ubuntu:24.04]] (باكدج [[dnsutils]]) في أكتوبر ٢٠٢٦. الـ ID [[Z0123456789ABCDEFGHIJ]] اللي في المثال مثال، و LocalStack بيدّي IDs شكلها مختلف.

---

## ١. [[aws route53 list-hosted-zones ...]]

~~~bash
aws route53 list-hosted-zones --query "HostedZones[].[Id,Name]" --output table
~~~

| الحتة | معناها |
|---|---|
| [[route53]] | الخدمة (الاسم جاي من بورت الـ DNS: 53) |
| [[list-hosted-zones]] | اعرض كل الـ hosted zones. الـ zone هو «ملف» الـ records بتاع دومين واحد |
| [[--query]] | فلتر بلغة JMESPath على الرد قبل ما يتطبع |
| [[HostedZones[].[Id,Name]]] | من كل عنصر في قايمة [[HostedZones]] هات [[Id]] و [[Name]] بس |
| [[--output table]] | اطبعه جدول بدل JSON |

~~~text الناتج (LocalStack)
--------------------------------------------------------
|                    ListHostedZones                   |
+-------------------------------------+----------------+
|  /hostedzone/AFK0PLHUQJUC6L2FXVT3AJ |  example.com.  |
+-------------------------------------+----------------+
~~~

لاحظ حاجتين:

- الـ Id بييجي ومعاه [[/hostedzone/]] في الأول. الأوامر التانية بتقبل الـ ID من غيرها ([[AFK0PLHUQJUC6L2FXVT3AJ]])، وده اللي بتحطه في [[--hosted-zone-id]].
- الاسم [[example.com.]] بنقطة في الآخر. دي «الجذر» (root) بتاع الـ DNS، وكل اسم كامل بيخلص بيها حتى لو مش بنكتبها.

---

## ٢. [[aws route53 change-resource-record-sets ...]]

~~~bash
aws route53 change-resource-record-sets --hosted-zone-id Z0123456789ABCDEFGHIJ --change-batch file://www.json
~~~

| الحتة | معناها |
|---|---|
| [[change-resource-record-sets]] | غيّر records (record set = كل الـ records اللي ليها نفس الاسم والنوع) |
| [[--hosted-zone-id]] | في أنهي zone |
| [[--change-batch]] | التغييرات نفسها، JSON |
| [[file://www.json]] | اقرا الـ JSON من ملف [[www.json]] في الفولدر الحالي، بدل ما تكتبه في الأمر |

### جوه [[www.json]] (الـ solCode)

| السطر | معناه |
|---|---|
| [["Action": "UPSERT"]] | اعمله لو مش موجود، وعدّله لو موجود (update + insert). فيه كمان [[CREATE]] و [[DELETE]] |
| [["Name": "www.example.com"]] | الاسم اللي بنظبطه |
| [["Type": "A"]] | سجل عنوان IPv4 |
| [["AliasTarget"]] | بدل ما تكتب IP، شاور على مورد AWS |
| [["HostedZoneId": "Z2FDTNDATAQYW2"]] | رقم ثابت معناه «الهدف CloudFront». ده **مش** الـ zone بتاعك |
| [["DNSName"]] | اسم الـ distribution |
| [["EvaluateTargetHealth": false]] | متربطش الرد بـ health check للهدف |

~~~text الناتج (LocalStack)
{
    "ChangeInfo": {
        "Id": "/change/C2682N5HXP0BZ4",
        "Status": "INSYNC",
        "SubmittedAt": "2010-09-10T01:36:41.958000+00:00"
    }
}
~~~

في AWS الحقيقي الحالة الأول [[PENDING]] (التغيير لسه بيتوزع على كل سيرفرات Route 53)، وبعد أقل من دقيقة غالبًا [[INSYNC]]. LocalStack بيرد [[INSYNC]] على طول وبتاريخ ثابت قديم، فمتاخدش التاريخ ده بجد. والـ solCode بيستنى بـ [[aws route53 wait resource-record-sets-changed --id $CHANGE]]: الأمر ده بيفضل يسأل لحد ما الحالة تبقى [[INSYNC]].

> جرّبنا كمان نضيف [[TTL]] للـ alias. AWS الحقيقي بيرفض ده بـ [[InvalidChangeBatch]] (الـ alias ملوش TTL، بياخد TTL الهدف)، بس LocalStack قبله من غير اعتراض. يعني المحاكي مش بيمسك كل الأخطاء، والكلام عن الرفض من الـ docs.

---

## ٣. [[aws route53 list-resource-record-sets ...]]

~~~bash
aws route53 list-resource-record-sets --hosted-zone-id Z0123456789ABCDEFGHIJ --query "ResourceRecordSets[].[Name,Type,TTL]" --output table
~~~

~~~text الناتج (LocalStack)
---------------------------------------
|       ListResourceRecordSets        |
+-------------------+------+----------+
|  example.com.     |  NS  |  172800  |
|  example.com.     |  SOA |  900     |
|  www.example.com. |  A   |  None    |
+-------------------+------+----------+
~~~

| السطر | جه منين |
|---|---|
| [[NS]] | اتعمل لوحده مع الـ zone: أسماء الـ nameservers بتوع Route 53 للدومين ده. دول اللي بتنسخهم عند المسجّل |
| [[SOA]] | اتعمل لوحده برضه (Start of Authority): بيانات إدارية عن الـ zone |
| [[A]] بـ [[None]] | السجل بتاعنا. [[None]] في عمود TTL لأنه alias، والـ alias ملوش TTL خاص بيه |

والأرقام: [[172800]] ثانية = يومين (مدة احتفاظ الناس بإجابة الـ NS)، و [[900]] = ربع ساعة.

---

## ٤. [[dig +short NS example.com]]

[[dig]] (Domain Information Groper) بيسأل الـ DNS ويطبع الرد. [[NS]] نوع السجل اللي بنسأل عنه، و [[+short]] يعني «الإجابة بس» من غير التفاصيل.

~~~bash
dig +short NS example.com
~~~

~~~text الناتج الحقيقي (أكتوبر ٢٠٢٦)
elliott.ns.cloudflare.com.
hera.ns.cloudflare.com.
~~~

[[example.com]] الحقيقي الـ DNS بتاعه على Cloudflare. ولو دومين على Route 53، الأسامي بتبقى بالشكل ده (ده [[awsstatic.com]] بتاع AWS نفسها):

~~~text dig +short NS awsstatic.com
ns-1523.awsdns-62.org.
ns-1942.awsdns-50.co.uk.
ns-555.awsdns-05.net.
ns-417.awsdns-52.com.
~~~

٤ أسامي على ٤ نطاقات مختلفة ([[.org]] و [[.co.uk]] و [[.net]] و [[.com]])، عشان لو نطاق منهم فيه مشكلة الباقي يرد. ده اللي بتدوّر عليه بعد النقل: لو لسه شايف nameservers المسجّل القديم، يبقى الـ zone الجديد محدش بيسأله.

---

## ٥. [[dig +short www.example.com]]

من غير نوع، [[dig]] بيسأل عن [[A]]:

~~~text الناتج الحقيقي
172.66.147.243
104.20.23.154
~~~

ومن غير [[+short]] تشوف الـ TTL:

~~~text dig www.example.com (جزء من الناتج)
;; ANSWER SECTION:
www.example.com.	300	IN	A	172.66.147.243
www.example.com.	300	IN	A	104.20.23.154
~~~

| العمود | معناه |
|---|---|
| [[www.example.com.]] | الاسم |
| [[300]] | الـ TTL: الرد ده يتحفظ ٣٠٠ ثانية (٥ دقايق) |
| [[IN]] | Internet، الـ class الوحيد اللي هتستخدمه |
| [[A]] | النوع |
| آخر عمود | القيمة: IPv4 |

### alias ولا CNAME؟ الفرق باين في [[dig]]

ده موقعين بتوع AWS الاتنين ورا CloudFront:

~~~text dig aws.amazon.com +noall +answer (مختصر)
aws.amazon.com.		60	IN	CNAME	tp.8e49140c2-frontier.amazon.com.
tp.8e49140c2-frontier.amazon.com. 60 IN	CNAME	dr49lng3n1n2s.cloudfront.net.
dr49lng3n1n2s.cloudfront.net. 60 IN	A	3.175.196.58
...
~~~

~~~text dig d0.awsstatic.com +noall +answer
d0.awsstatic.com.	55	IN	A	108.159.102.30
d0.awsstatic.com.	55	IN	A	108.159.102.17
d0.awsstatic.com.	55	IN	A	108.159.102.63
d0.awsstatic.com.	55	IN	A	108.159.102.68
~~~

الأول CNAME: الرد بيقول «روح اسأل عن اسم تاني» لحد ما يوصل لـ [[cloudfront.net]]. التاني شكله alias: IPs على طول ومفيش أي اسم [[cloudfront.net]] في النص، لأن Route 53 حل السلسلة جوه ورجّع العناوين بس. ([[+noall +answer]] يعني «اخفي كل حاجة إلا الـ ANSWER section».) وده اللي الـ sol بيقوله: بعد الـ alias هتشوف IPs، مش اسم cloudfront.

---

## على ويندوز من غير [[dig]]

PowerShell فيه [[Resolve-DnsName]] (اتشغّل في [[pwsh]] على ويندوز 11):

~~~powershell
Resolve-DnsName www.example.com -Type A
Resolve-DnsName example.com -Type NS
~~~

~~~text الناتج
Name            Type TTL Section IPAddress
----            ---- --- ------- ---------
www.example.com A    293 Answer  172.66.147.243
www.example.com A    293 Answer  104.20.23.154

Name          Type   TTL NameHost
----          ----   --- --------
example.com     NS 21593 elliott.ns.cloudflare.com
example.com     NS 21593 hera.ns.cloudflare.com
~~~

الـ TTL هنا [[293]] مش [[300]]: الرد جه من كاش الـ resolver، وده الوقت **الفاضل** قبل ما يتمسح. و [[nslookup www.example.com]] موجود في ويندوز ولينكس والماك لو عايز أمر واحد في كل حتة.

| عايز | لينكس والماك | ويندوز |
|---|---|---|
| الـ IPs | [[dig +short NAME]] | [[Resolve-DnsName NAME -Type A]] |
| الـ nameservers | [[dig +short NS NAME]] | [[Resolve-DnsName NAME -Type NS]] |
| بالـ TTL | [[dig NAME]] | [[Resolve-DnsName]] (عمود TTL) |

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| هات الـ zone ID | [[list-hosted-zones]] |
| غيّر | [[change-resource-record-sets]] + JSON فيه [[UPSERT]] |
| استنى | [[wait resource-record-sets-changed]] لحد [[INSYNC]] |
| راجع جوه Route 53 | [[list-resource-record-sets]] |
| راجع من برا | [[dig +short NS]] ثم [[dig +short]] |

> الـ alias شكله [[A]] عادي من برا، ملوش TTL، و [[HostedZoneId]] بتاعه هو بتاع الهدف ([[Z2FDTNDATAQYW2]] لـ CloudFront)، مش بتاع الـ zone بتاعك.`,
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
          teach: R`## الفكرة: ٤ أسئلة تتأكد بيهم إن Cloudflare في النص صح، وسطر يقفل الباب

المثال مفيهوش أي إعداد، الإعداد نفسه (البرتقاني و SSL mode) من الداشبورد. المثال بيتأكد: الـ DNS بيرجّع مين؟ الرد عدّى على Cloudflare؟ الشهادة على سيرفرك سليمة؟ فيه redirect loop؟ وآخر سطر بيسمح للويب من Cloudflare بس.

[[myapp.example.com]] و [[203.0.113.10]] أمثلة (الـ [[203.0.113.x]] رينج محجوز للتوثيق). فجرّبنا نفس الأوامر على [[example.com]] الحقيقي، اللي بقى ورا Cloudflare، من [[ubuntu:24.04]] جوه Docker في أكتوبر ٢٠٢٦. وسطر [[ufw]] مشغّلناهوش (بيغيّر فايروول الجهاز): طبعناه بـ [[echo]] بدل ما ينفّذ.

---

## ١. [[dig +short myapp.example.com]]

~~~text dig +short example.com
172.66.147.243
104.20.23.154
~~~

إزاي تعرف إن دول IPs بتاعة Cloudflare؟ قارنهم بالقايمة اللي Cloudflare بينشرها (السطر الأخير في المثال بيجيبها):

| الـ IP | جوه رينج Cloudflare |
|---|---|
| [[104.20.23.154]] | [[104.16.0.0/13]] (من 104.16 لحد 104.23) |
| [[172.66.147.243]] | [[172.64.0.0/13]] (من 172.64 لحد 172.71) |

الـ [[/13]] معناها إن أول ١٣ bit من العنوان ثابتين والباقي متغير، فالرينج ده فيه حوالي نص مليون عنوان. لو [[dig]] رجّع IP سيرفرك نفسه، يبقى السجل رمادي (DNS only) ومفيش Cloudflare في النص.

---

## ٢. [[curl -sI ... | grep -i -E "..."]]

~~~bash
curl -sI https://myapp.example.com | grep -i -E "^server|cf-ray|cf-cache-status"
~~~

| الحتة | معناها |
|---|---|
| [[-s]] | silent: من غير شريط التقدم |
| [[-I]] | اطلب الـ headers بس (طلب HEAD) |
| [[grep -i]] | دوّر من غير ما تفرّق بين الحروف الكبيرة والصغيرة |
| [[-E]] | regex موسّع، فـ [[|]] جوه الكلام تبقى «أو» |
| [[^server]] | [[^]] يعني «في أول السطر»، عشان ميطلعش أي سطر فيه كلمة server في النص |

~~~text الناتج على example.com
server: cloudflare
cf-cache-status: HIT
cf-ray: a4747604fd3fad9d-MRS
~~~

| الـ header | معناه |
|---|---|
| [[server: cloudflare]] | اللي رد عليك هو Cloudflare، مش Nginx بتاعك |
| [[cf-ray]] | رقم الطلب جوه Cloudflare (بتديه للدعم لو فيه مشكلة). آخر ٣ حروف كود المطار بتاع الـ data center اللي رد: [[MRS]] مارسيليا، و [[CAI]] القاهرة |
| [[cf-cache-status: HIT]] | الصفحة جت من كاش Cloudflare (درس [[Cloudflare cache و WAF]]) |

ليه مارسيليا مش القاهرة؟ لأن الطلب طالع من Docker Desktop والشبكة وصّلته لأقرب data center ليها هي. ده طبيعي: الـ Anycast بيوصّلك لأقرب واحد من ناحية الشبكة مش الخريطة.

---

## ٣. سطر [[openssl]]: كلّم سيرفرك من غير Cloudflare

ده أطول سطر. هنفكّه من الشمال لليمين، زي ما البيانات بتمشي.

~~~bash
echo | openssl s_client -connect 203.0.113.10:443 -servername myapp.example.com 2>/dev/null | openssl x509 -noout -subject -issuer -enddate
~~~

### الخطوة ١: [[echo |]]

[[openssl s_client]] بعد ما يتصل بيستنى منك تكتب حاجة تبعتها للسيرفر. [[echo]] بيبعتله سطر فاضي ويقفل، فالأمر يخلص لوحده بدل ما يفضل مستني.

### الخطوة ٢: [[openssl s_client -connect IP:443 -servername NAME]]

| الحتة | معناها |
|---|---|
| [[s_client]] | اعمل TLS client: اتصل واعمل handshake |
| [[-connect 203.0.113.10:443]] | على IP سيرفرك **مباشرة** وبورت HTTPS. بكده بتعدّي Cloudflare وتشوف الشهادة اللي Cloudflare نفسه هيشوفها |
| [[-servername myapp.example.com]] | الـ SNI: «أنا عايز شهادة الدومين ده». سيرفر عليه كذا موقع بيختار الشهادة على حسبه |

### الخطوة ٣: [[2>/dev/null]]

[[s_client]] بيطبع كلام كتير عن الاتصال على الـ stderr (القناة رقم ٢). [[2>]] بيحوّلها لـ [[/dev/null]] (سلة زبالة لينكس)، فاللي بيعدّي في الـ pipe هو الشهادة بس.

### الخطوة ٤: [[openssl x509 -noout -subject -issuer -enddate]]

[[x509]] هو اسم شكل الشهادات. الأمر بيقرا الشهادة اللي جاية من الـ pipe، و [[-noout]] يعني «متطبعش الشهادة نفسها» (كلام base64 طويل)، وبعدين ٣ حاجات بس:

~~~text الناتج (على IP بتاع example.com)
subject=CN = example.com
issuer=C = US, O = SSL Corporation, CN = Cloudflare TLS Issuing ECC CA 3
notAfter=Dec 25 22:56:35 2026 GMT
~~~

| السطر | معناه | المطلوب عشان Full (strict) |
|---|---|---|
| [[subject=CN = ...]] | الشهادة دي لأنهي اسم (CN = Common Name) | نفس الدومين |
| [[issuer=]] | مين أصدرها | جهة موثوقة: Let's Encrypt أو Cloudflare Origin CA |
| [[notAfter=]] | بتخلص إمتى | في المستقبل |

في تجربتنا الـ IP ده بتاع Cloudflare نفسه، فالشهادة بتاعة Cloudflare (ودي الشهادة اللي الزائر بيشوفها). على سيرفرك الحقيقي هتشوف شهادة Let's Encrypt أو Origin CA.

### جرّبنا نغلط في [[-servername]]

بنفس الـ IP واسم مش موجود ([[nothing.invalid]])، السيرفر مرجّعش أي شهادة، و [[x509]] طبع [[Could not read certificate from <stdin>]]. يعني الـ [[-servername]] مش زينة: من غيره أو بيه غلط، ممكن السيرفر يرجّع شهادة تانية أو ولا حاجة.

---

## ٤. [[curl -sIL --max-redirs 5 http://...]]: فيه loop؟

| الحتة | معناها |
|---|---|
| [[-L]] | لو الرد redirect، روح للعنوان الجديد |
| [[--max-redirs 5]] | بحد أقصى ٥ مرات، عشان الـ loop ميلفّش للأبد |
| [[http://]] | بنبدأ HTTP عمدًا عشان نشوف التحويل لـ HTTPS |
| [[grep -i -E "^HTTP|^location"]] | سطر الحالة وسطر العنوان الجديد بس |

~~~text curl -sIL --max-redirs 5 http://www.cloudflare.com
HTTP/1.1 301 Moved Permanently
Location: https://www.cloudflare.com/
HTTP/2 103 
HTTP/2 200 
~~~

ده الشكل السليم: [[301]] لـ https مرة واحدة، وبعدين [[200]]. (الـ [[103]] اسمه Early Hints: رد مبدئي بيقول للمتصفح «ابدأ حمّل الملفات دي»، وبعده الرد الحقيقي.) ولو عندك loop هتشوف [[301]] و [[Location]] نفس العنوان ٥ مرات، وبعدها curl يقف بـ [[Maximum (5) redirects followed]].

---

## ٥. الـ loop بتاع [[ufw]]

~~~bash
for ip in $(curl -s https://www.cloudflare.com/ips-v4); do sudo ufw allow from $ip to any port 80,443 proto tcp; done
~~~

| الحتة | معناها |
|---|---|
| [[$(curl -s .../ips-v4)]] | نفّذ الأمر ده الأول وحط ناتجه مكانه: قايمة رينجات Cloudflare، سطر لكل واحد |
| [[for ip in ...; do ...; done]] | لكل رينج في القايمة، حطه في [[$ip]] ونفّذ اللي بين [[do]] و [[done]] |
| [[sudo ufw allow from $ip]] | اسمح بالدخول من الرينج ده |
| [[to any port 80,443 proto tcp]] | على أي عنوان في السيرفر، للبورتات 80 و 443، بروتوكول TCP |

القايمة نفسها (أكتوبر ٢٠٢٦) ١٥ رينج:

~~~text curl -s https://www.cloudflare.com/ips-v4
173.245.48.0/20
103.21.244.0/22
...
104.16.0.0/13
104.24.0.0/14
172.64.0.0/13
131.0.72.0/22
~~~

وبـ [[echo]] قدام [[sudo]] عشان نشوف الأوامر من غير ما تتنفذ:

~~~text أول ٣ أوامر
sudo ufw allow from 173.245.48.0/20 to any port 80,443 proto tcp
sudo ufw allow from 103.21.244.0/22 to any port 80,443 proto tcp
sudo ufw allow from 103.22.200.0/22 to any port 80,443 proto tcp
~~~

> لو عملت [[wc -l]] على القايمة هيقولك ١٤ مش ١٥: آخر سطر مفيش بعده newline، و [[wc -l]] بيعدّ علامات السطر الجديد. والـ [[for]] بيقرا الـ ١٥ عادي.

بعد ما تضيفهم، امسح قاعدة [[allow 80]] و [[allow 443]] العامة القديمة، وإلا السماح ده ملوش لازمة. والرينجات دي بتتغير نادرًا، فشغّل الـ loop تاني كل كام شهر (وفيه [[ips-v6]] لو السيرفر عليه IPv6).

---

## على ويندوز

PowerShell فيه [[curl.exe]] الحقيقي، و [[Resolve-DnsName]] بدل [[dig]]، و [[Select-String]] بدل [[grep]]:

~~~powershell
curl.exe -sI https://example.com | Select-String -Pattern "^server|cf-ray|cf-cache-status"
~~~

~~~text الناتج (pwsh على ويندوز 11)
Server: cloudflare
cf-cache-status: HIT
CF-RAY: a47477c8b9588741-MRS
~~~

[[Select-String]] مش بيفرّق بين الحروف الكبيرة والصغيرة من نفسه، فمش محتاج [[-i]]. والأسامي هنا بحروف كبيرة ([[Server]] و [[CF-RAY]]) لأن [[curl.exe]] بتاع ويندوز اتكلم HTTP/1.1، والـ HTTP/2 بيبعت أسامي الـ headers small دايمًا. المعنى واحد.

وأمر [[openssl]] والـ [[ufw]] أوامر سيرفر لينكس، فشغّلهم على السيرفر نفسه أو في WSL.

---

## الخلاصة

| السؤال | الأمر | الإجابة السليمة |
|---|---|---|
| السجل برتقاني؟ | [[dig +short]] | IPs من رينجات Cloudflare |
| الطلب عدّى على Cloudflare؟ | [[curl -sI]] | [[server: cloudflare]] و [[cf-ray]] |
| شهادة سيرفرك تنفع لـ strict؟ | [[openssl s_client -connect IP:443 -servername NAME]] | الاسم صح، جهة موثوقة، مش منتهية |
| فيه loop؟ | [[curl -sIL --max-redirs 5 http://...]] | [[301]] مرة واحدة ثم [[200]] |
| اقفل الباب | loop على [[ips-v4]] بـ [[ufw allow]] | 80 و 443 من Cloudflare بس |`,
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
          teach: R`## الفكرة: سطرين تسأل بيهم «اتكاش ولا لأ؟»، وأمر يمسح من الكاش

أول سطرين بيطلبوا ملف ثابت وبعدين API ويبصوا على header واحد: [[cf-cache-status]]. والأمر التالت (مكسور على ٣ سطور) بيكلّم Cloudflare API ويقوله «ارمي الملف ده من الكاش».

[[myapp.example.com]] مثال، فجرّبنا نفس الـ [[curl]] على مواقع حقيقية ورا Cloudflare، من [[ubuntu:24.04]] جوه Docker في أكتوبر ٢٠٢٦. والـ Cache Rules و WAF rules بتتعمل من الداشبورد، فدي من الـ docs.

---

## ١. [[curl -sI .../assets/app.js | grep -i cf-cache-status]]

[[-s]] من غير شريط تقدّم، و [[-I]] الـ headers بس، و [[grep -i]] يدوّر من غير ما يفرّق بين الحروف الكبيرة والصغيرة.

جرّبناه على ملف JS حقيقي من موقع Cloudflare نفسه (ضفنا [[cache-control]] للـ grep):

~~~text الناتج
HTTP/2 200
cf-cache-status: HIT
cache-control: public, max-age=31536000, immutable
~~~

[[HIT]]: الملف جه من كاش الـ data center، والسيرفر الأصلي (الـ origin) محدش كلّمه. و [[max-age=31536000]] = سنة بالثواني، و [[immutable]] يعني «الملف ده مش هيتغير أبدًا» (اسمه فيه hash زي [[MkjUBwT7]]، فأي تعديل = اسم جديد).

### أول طلب [[MISS]]

عشان نشوف ملف «جديد» على الكاش، طلبنا [[example.com]] بـ query string عشوائي ([[?teach=]] ورقم)، لأن Cloudflare افتراضيًا بيحط الـ query string في مفتاح الكاش، فكل رقم جديد = نسخة جديدة:

~~~text الطلب الأول ثم التاني بنفس الرقم
cf-cache-status: MISS
--
age: 0
cf-cache-status: HIT
~~~

[[MISS]]: مكانش في الكاش، فـ Cloudflare جابه من الـ origin واحتفظ بيه. التاني [[HIT]] و [[age: 0]] (النسخة عمرها أقل من ثانية).

> [[example.com]] صفحة HTML ومع ذلك بتتكاش. ده معناه إن صاحبها عامل Cache Rule. الافتراضي في Cloudflare إن HTML ميتكاشش.

---

## ٢. [[curl -sI .../api/me | grep -i cf-cache-status]]

نفس الأمر على API. القيم اللي ممكن تشوفها:

| القيمة | معناها | شفناها فين |
|---|---|---|
| [[HIT]] | من الكاش | ملف JS على [[www.cloudflare.com]] |
| [[MISS]] | مش في الكاش، اتجاب واتحفظ | أول طلب بـ query جديد |
| [[DYNAMIC]] | Cloudflare مش بيعتبره قابل للكاش أصلًا (الافتراضي لـ HTML و JSON) | صفحة [[www.udemy.com]] الرئيسية |
| [[BYPASS]] | فيه قاعدة أو header قال «متكاشش» | [[discord.com/api/v10/users/@me]] رجّع [[401]] و [[BYPASS]] |
| [[EXPIRED]] | كان في الكاش بس مدته خلصت، فاتجاب تاني | |
| من غير header خالص | الطلب مش بيعدّي على كاش Cloudflare | صفحة [[www.cloudflare.com]] بـ [[cache-control: no-store]] |

ولـ API بيانات يوزر، اللي عايزه [[DYNAMIC]] أو [[BYPASS]]: لو شفت [[HIT]] على [[/api/me]] يبقى فيه يوزر بيشوف بيانات يوزر تاني.

---

## ٣. أمر الـ purge: [[curl -X POST ...]]

~~~bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" \
  -H "Authorization: Bearer YOUR_TOKEN" -H "Content-Type: application/json" \
  --data '{"files":["https://myapp.example.com/index.html"]}'
~~~

### الـ [[\]] في آخر السطر

الأمر طويل، فاتكسر على ٣ سطور. [[\]] في آخر السطر معناها «الأمر لسه مكمّل في السطر اللي جاي»، ولازم تبقى آخر حرف (من غير مسافة بعدها). في PowerShell العلامة دي هي الـ backtick مش [[\]].

### الحتت

| الحتة | معناها |
|---|---|
| [[-X POST]] | نوع الطلب POST (curl افتراضيًا GET) |
| [[/client/v4/]] | النسخة الرابعة من Cloudflare API |
| [[zones/YOUR_ZONE_ID]] | الـ zone = الدومين في Cloudflare. الـ ID في صفحة Overview بتاعة الدومين |
| [[purge_cache]] | العملية: امسح من الكاش |
| [[-H "Authorization: Bearer YOUR_TOKEN"]] | [[-H]] = header. و Bearer يعني «اللي معاه التوكن ده». API token بصلاحية Cache Purge بس |
| [[-H "Content-Type: application/json"]] | الـ body اللي جاي JSON |
| [[--data '...']] | الـ body. العلامات [[' ']] عشان الشل ميلمسش علامات [["]] اللي جوه |
| [[{"files":[...]}]] | قايمة URLs كاملة تتمسح |

### الرد

بتوكن حقيقي الرد (من الـ docs):

~~~text رد ناجح
{"success":true,"errors":[],"messages":[],"result":{"id":"..."}}
~~~

وبعتنا الأمر زي ما هو بالكلام الحرفي [[YOUR_ZONE_ID]] و [[YOUR_TOKEN]] (من غير حساب)، فرجع:

~~~text الرد الحقيقي
{"result":null,"success":false,"errors":[{"code":7003,"message":"Could not route to /client/v4/zones/YOUR_ZONE_ID/purge_cache, perhaps your object identifier is invalid?"}],"messages":[]}
~~~

نفس شكل الرد في الحالتين: [[success]] و [[errors]] و [[messages]] و [[result]]. فالسكربت بيبص على [[success]]. والخطأ [[7003]] معناه إن الـ zone ID مش مفهوم (المفروض ٣٢ حرف hex).

بدل [[files]] ممكن [[{"purge_everything":true}]] (كله)، بس ده بيرمي كل الكاش فأول موجة طلبات تروح كلها للـ origin.

---

## الـ WAF: جرّبناه من برا

قاعدة WAF بتتكتب في الداشبورد، بس تقدر تشوف أثرها من [[curl]]. طلبنا [[/wp-login.php]] من [[www.cloudflare.com]] (مش WordPress):

~~~text curl -sI https://www.cloudflare.com/wp-login.php
HTTP/2 403
cf-mitigated: challenge
server: cloudflare
cf-ray: a47479356cdde1e5-MRS
~~~

[[403]] من [[server: cloudflare]] نفسه، يعني الطلب اتوقف قبل الـ origin. و [[cf-mitigated: challenge]] بيقول إن الإجراء كان challenge (اختبار «انت بني آدم؟»)، و [[curl]] مبيعرفش يعدّيه. لو الإجراء Block كان هيبقى [[403]] برضه بصفحة «Sorry, you have been blocked». وده اللي الـ solCode بيطبعه بـ [[-o /dev/null -w "%{http_code}\n"]]: [[-o /dev/null]] ارمي الـ body، و [[-w]] اطبع بعد الطلب رقم الحالة بس.

---

## على ويندوز

نفس الأوامر بـ [[curl.exe]] و [[Select-String]] بدل [[grep]]. وأمر الـ purge في PowerShell أسهل بـ [[Invoke-RestMethod]] (من الـ docs، محتاج token حقيقي):

~~~powershell
Invoke-RestMethod -Method Post -Uri "https://api.cloudflare.com/client/v4/zones/YOUR_ZONE_ID/purge_cache" -Headers @{ Authorization = "Bearer YOUR_TOKEN" } -ContentType "application/json" -Body '{"files":["https://myapp.example.com/index.html"]}'
~~~

---

## الخلاصة

| عايز | اعمل |
|---|---|
| تعرف اتكاش ولا لأ | [[curl -sI URL]] وبص على [[cf-cache-status]] |
| ملفات ثابتة | المفروض [[HIT]] بعد أول [[MISS]] |
| API وصفحات اليوزر | المفروض [[DYNAMIC]] أو [[BYPASS]]، أبدًا [[HIT]] |
| ترمي ملف من الكاش | [[purge_cache]] بـ [[files]] و API token محدود |
| تتأكد إن WAF شغال | [[curl]] على المسار الممنوع: [[403]] من [[server: cloudflare]] |`,
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
          teach: R`## الفكرة: ابني فولدر [[dist]]، وارفعه

موقع Vite في الآخر مجرد ملفات. أول سطرين بيعملوا المشروع ويبنوه، والتالت بيربط wrangler بحسابك، والرابع والخامس بيرفعوا نفس الفولدر مرة production ومرة preview، والأخير طريقة Workers بدل Pages.

اللي اتجرّب هنا (ويندوز 11، Node 24، أكتوبر ٢٠٢٦): عمل المشروع والبناء بجد (طلع Vite 8.3.3 و React 19)، و wrangler 4.148.0 متسطّب في المشروع، وشغّلنا الموقع على الجهاز بالطريقتين ([[wrangler pages dev]] و [[wrangler dev]]) عشان نشوف الـ SPA fallback. أما [[wrangler login]] و [[deploy]] محتاجين حساب Cloudflare، فدول من الـ docs.

---

## ١. [[npm create vite@latest my-site -- --template react-ts]]

| الحتة | معناها |
|---|---|
| [[npm create vite@latest]] | شغّل أحدث نسخة من باكدج [[create-vite]] (أي [[npm create X]] بيشغّل [[create-X]]) |
| [[my-site]] | اسم الفولدر اللي هيتعمل |
| [[--]] | اللي بعدها يروح لـ [[create-vite]] مش لـ npm نفسه |
| [[--template react-ts]] | قالب React بـ TypeScript |

~~~text الناتج
◇  Scaffolding project in ...\my-site...
└  Done. Now run:
  cd my-site
  npm install
  npm run dev
~~~

> لو بتشغّله في سكربت ضيف [[--no-interactive]]، وإلا النسخ الجديدة ممكن تسألك أسئلة وتستنى.

---

## ٢. [[cd my-site && npm i && npm run build]]

[[&&]] معناها «لو اللي قبلي نجح، كمّل». [[npm i]] بيسطّب الباكدجات، و [[npm run build]] بيشغّل سكربت [[build]] من [[package.json]]، وهو هنا [[tsc -b && vite build]]: اتأكد من أنواع TypeScript الأول، وبعدين ابني.

~~~text الناتج
vite v8.3.3 building client environment for production...
✓ 20 modules transformed.
dist/index.html                   0.45 kB │ gzip:  0.29 kB
dist/assets/index-D64VDMd1.css    4.10 kB │ gzip:  1.47 kB
dist/assets/index-CVtPK4EU.js   222.44 kB │ gzip: 69.28 kB
✓ built in 485ms
~~~

| اللي في [[dist]] | ليه |
|---|---|
| [[index.html]] | صفحة واحدة بس، فيها [[<div id="root">]] فاضي و [[<script>]] بيشاور على الـ JS |
| [[assets/index-CVtPK4EU.js]] | كل كود React متجمّع. الحروف دي hash من محتوى الملف: أي تعديل = اسم جديد، فالكاش يقدر يحتفظ بيه سنة |
| عمود [[gzip]] | الحجم بعد الضغط، وده اللي بينزل فعلًا على النت (٦٩ كيلو بدل ٢٢٢) |

ده كل الموقع. مفيش سيرفر، فأي CDN يقدر يخدمه.

---

## ٣. [[npx wrangler login]]

[[npx]] بيشغّل باكدج من غير ما تسطّبه global. و [[wrangler]] هو CLI بتاع Cloudflare للـ Workers و Pages. [[login]] بيفتح المتصفح، توافق، و wrangler يحفظ token على جهازك. من غيره:

~~~text npx wrangler whoami (من غير login)
You are not authenticated. Please run $__btwrangler login$__bt.
~~~

وفي GitHub Actions مفيش متصفح: بتحط [[CLOUDFLARE_API_TOKEN]] و [[CLOUDFLARE_ACCOUNT_ID]] كـ secrets بدل [[login]] (من الـ docs).

---

## ٤. [[npx wrangler pages deploy dist --project-name my-site --branch main]]

| الحتة | معناها |
|---|---|
| [[pages deploy]] | ارفع فولدر كـ deployment على Pages (اسمها Direct Upload) |
| [[dist]] | الفولدر |
| [[--project-name my-site]] | اسم المشروع، وبيبقى جزء من الـ URL: [[my-site.pages.dev]] |
| [[--branch main]] | اسم الـ branch. لو هو الـ production branch بتاع المشروع = production، أي اسم تاني = preview |

الـ flags دي موجودة في [[wrangler pages deploy --help]] (اتشغّل). الرفع نفسه من الـ docs: بيطبع عدد الملفات اللي اترفعت، والـ URL.

## ٥. نفس الأمر بـ [[--branch feature-x]]

نفس الفولدر، بس كـ preview على [[feature-x.my-site.pages.dev]]. الـ production مش بيتلمس، فتبعت اللينك لحد يراجع قبل ما تنشر.

---

## ٦. [[npx wrangler deploy]] (Workers static assets)

هنا مفيش [[dist]] في الأمر: wrangler بيقرا كل حاجة من [[wrangler.jsonc]] (الـ solCode):

| السطر | معناه |
|---|---|
| [["name": "my-site"]] | اسم الـ Worker، والـ URL هيبقى [[my-site.SUBDOMAIN.workers.dev]] |
| [["compatibility_date"]] | «اشتغل بسلوك الـ runtime زي ما كان في التاريخ ده»، عشان تحديثات Cloudflare متكسرش كودك |
| [["assets": { "directory": "./dist" }]] | الملفات الثابتة من الفولدر ده |
| [["not_found_handling": "single-page-application"]] | أي مسار مش ملف، رجّع [[index.html]] |

و [[.jsonc]] يعني JSON بتعليقات ([[//]]).

### جرّبناه على الجهاز بـ [[wrangler dev]]

[[wrangler dev]] بيشغّل نفس الإعداد محليًا بـ workerd (نفس الـ runtime بتاع Cloudflare) على [[http://127.0.0.1:8787]]، من غير حساب:

~~~text مع not_found_handling: "single-page-application"
/                          200 text/html
/about                     200 text/html          (ده index.html)
/dashboard/settings        200 text/html          (index.html برضه)
/assets/index-CVtPK4EU.js  200 text/javascript
/assets/nope.js            200 text/html          (!)
~~~

~~~text نفس الملفات من غير not_found_handling
/          200 text/html
/about     404
~~~

يعني من غير السطر ده، أي refresh على [[/about]] = 404، وده بالظبط اللي التجربة بتطلب تصلّحه.

> لاحظ [[/assets/nope.js]]: ملف JS مش موجود رجع [[index.html]] بـ 200! لو رفعت HTML قديم بيشاور على JS اتمسح، المتصفح هياخد HTML مكان الـ JS ويطلع في الـ console [[Unexpected token '<']] بدل 404 واضح. ده تمن الـ SPA mode.

---

## Pages والـ SPA: جرّبناه بـ [[wrangler pages dev]]

[[wrangler pages dev dist]] بيشغّل الفولدر بقواعد Pages:

~~~text الناتج
/           200 text/html
/about      200 text/html
/dashboard  200 text/html
~~~

وبعدين حطينا [[404.html]] في [[dist]]:

~~~text بعد ما ضفنا dist/404.html
/about -> 404 <h1>not here</h1>
~~~

ده اللي الدرس بيقوله: Pages بيعتبر المشروع SPA طول ما مفيش [[404.html]]. أول ما الملف ده يظهر، المسارات المش موجودة بقت 404.

---

## الطريقتين جنب بعض

| | Pages | Workers static assets |
|---|---|---|
| الرفع | [[wrangler pages deploy dist]] | [[wrangler deploy]] |
| الإعداد | flags + ملفات [[_redirects]] و [[_headers]] | [[wrangler.jsonc]] |
| الـ SPA | تلقائي لو مفيش [[404.html]] | [[not_found_handling]] |
| preview | [[--branch]] | versions و preview URLs |
| تجربة محلية | [[wrangler pages dev dist]] | [[wrangler dev]] |

## الخلاصة

1. [[npm run build]] بيطلّع [[dist]]: ده الموقع كله.
2. ارفعه بـ [[pages deploy]] أو [[deploy]]، و [[--branch]] غير الـ production = preview.
3. جرّب الـ refresh على مسار داخلي **قبل** ما تنشر، بـ [[wrangler dev]] أو [[wrangler pages dev]] على جهازك.`,
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
          teach: R`## الفكرة: نفس كود S3، بـ ٣ إعدادات مختلفة

الملف بيعمل client بيكلّم R2 بلغة S3، وبعدين بيعمل رابطين موقّعين: واحد للرفع (٥ دقايق) وواحد للتنزيل (ساعة)، ويطبع حاجتين منهم.

اتشغّل فعلًا بـ Node 24 على ويندوز 11 و [[@aws-sdk/client-s3]] نسخة 3.1147.0، بمتغيرات وهمية زي التجربة (من غير حساب R2). التوقيع بيتحسب على الجهاز فالرابط بيطلع، بس الرفع الحقيقي عليه محتاج حساب، فده من الـ docs.

---

## ١. الـ imports

~~~js
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
~~~

| الاسم | هو إيه |
|---|---|
| [[S3Client]] | الـ client: فيه العنوان والمفاتيح والإعدادات |
| [[PutObjectCommand]] | وصف عملية «ارفع ملف» |
| [[GetObjectCommand]] | وصف عملية «هات ملف» |
| [[getSignedUrl]] | بدل ما ينفّذ العملية، بيطلّع رابط موقّع لها حد تاني يقدر ينفّذه |

الـ [[{ }]] حوالين الأسامي معناها «هات الحاجات دي بالاسم من الباكدج». والاتنين باكدجات منفصلة، فبتسطّبهم الاتنين: [[npm i @aws-sdk/client-s3 @aws-sdk/s3-request-presigner]].

---

## ٢. الـ client: ٤ إعدادات

~~~js
const r2 = new S3Client({
  region: "auto",
  endpoint: "https://" + process.env.R2_ACCOUNT_ID + ".r2.cloudflarestorage.com",
  credentials: { accessKeyId: process.env.R2_ACCESS_KEY_ID, secretAccessKey: process.env.R2_SECRET_ACCESS_KEY },
  requestChecksumCalculation: "WHEN_REQUIRED",
});
~~~

| الإعداد | في S3 | في R2 |
|---|---|---|
| [[region]] | زي [["eu-central-1"]] | [["auto"]]: R2 بيختار المكان |
| [[endpoint]] | مش محتاجه (الـ SDK عارف عناوين AWS) | عنوان حسابك على R2 |
| [[credentials]] | مفاتيح IAM | مفاتيح R2 API token |
| [[requestChecksumCalculation]] | الافتراضي تمام | [["WHEN_REQUIRED"]] (تحت ليه) |

[[process.env.R2_ACCOUNT_ID]] يعني «اقرا متغير البيئة ده». المفاتيح عمرها ما تتكتب في الكود.

### جرّبنا ننسى متغير

شغّلنا الملف من غير [[R2_ACCOUNT_ID]]:

~~~text الناتج
https://myapp-uploads.undefined.r2.cloudflarestorage.com/avatars/42.webp
~~~

[[undefined]] جوه العنوان ومفيش أي error! الـ JavaScript حوّل المتغير الناقص لكلمة [["undefined"]] وهو بيلزق النصوص. فلو شفت [[undefined]] في لوج أو error بتاع DNS، دوّر على متغير بيئة ناقص.

---

## ٣. ليه [[requestChecksumCalculation: "WHEN_REQUIRED"]]؟

عملنا نفس رابط الرفع مرتين، مرة بالإعداد ومرة من غيره، وطبعنا كل حتة في الـ query string:

~~~text بالإعداد WHEN_REQUIRED
X-Amz-Algorithm          AWS4-HMAC-SHA256
X-Amz-Content-Sha256     UNSIGNED-PAYLOAD
X-Amz-Credential         test/20261008/auto/s3/aws4_request
X-Amz-Date               20261008T103951Z
X-Amz-Expires            300
X-Amz-Signature          2b8c8137ed5d...
X-Amz-SignedHeaders      host
x-id                     PutObject
~~~

~~~text من غيره (الافتراضي)
...
X-Amz-SignedHeaders      host
x-amz-checksum-crc32     AAAAAA==
x-amz-sdk-checksum-algorithm CRC32
x-id                     PutObject
~~~

الافتراضي زوّد [[x-amz-checksum-crc32=AAAAAA==]]. CRC32 بصمة صغيرة لمحتوى الملف، و [[AAAAAA==]] هي بصمة ملف **فاضي** (٤ bytes أصفار مكتوبة base64)، لأن وقت عمل الرابط مفيش ملف. فالرابط بيقول «الملف اللي هيترفع لازم يبقى فاضي»، وأي صورة حقيقية تترفض. [[WHEN_REQUIRED]] = «احسب checksum بس لما العملية نفسها تطلبه».

### نقرا باقي الرابط

| الحتة | معناها |
|---|---|
| [[X-Amz-Algorithm]] | طريقة التوقيع: AWS Signature Version 4 بـ HMAC-SHA256 |
| [[X-Amz-Credential]] | المفتاح (الـ Access Key ID) / التاريخ / الـ region / الخدمة. لاحظ [[auto]] و [[s3]] |
| [[X-Amz-Date]] | وقت التوقيع بتوقيت UTC |
| [[X-Amz-Expires]] | الصلاحية بالثواني من وقت التوقيع |
| [[X-Amz-SignedHeaders]] | الـ headers اللي داخلة في التوقيع: [[host]] بس |
| [[X-Amz-Signature]] | التوقيع نفسه، محسوب بالـ Secret Key. الـ secret **مش** في الرابط |
| [[UNSIGNED-PAYLOAD]] | محتوى الملف مش داخل في التوقيع (ما هو لسه مش موجود) |

> [[SignedHeaders=host]] بس معناها إن الـ [[ContentType]] اللي في الأمر مش جزء من التوقيع، فالمتصفح يقدر يرفع بأي نوع. لو عايز تجبره، [[getSignedUrl(r2, put, { expiresIn: 300, signableHeaders: new Set(["content-type"]) })]]، وجرّبناها: الرابط بقى فيه [[content-type;host]].

---

## ٤. الأمرين والرابطين

~~~js
const put = new PutObjectCommand({ Bucket: "myapp-uploads", Key: "avatars/42.webp", ContentType: "image/webp" });
const uploadUrl = await getSignedUrl(r2, put, { expiresIn: 300 });
const get = new GetObjectCommand({ Bucket: "myapp-uploads", Key: "avatars/42.webp" });
const downloadUrl = await getSignedUrl(r2, get, { expiresIn: 3600 });
~~~

| الحتة | معناها |
|---|---|
| [[Bucket]] | اسم الـ bucket |
| [[Key]] | مسار الملف جوه الـ bucket. مفيش فولدرات حقيقية، [[avatars/]] جزء من الاسم |
| [[ContentType]] | نوع الملف اللي هيتخزن معاه، وبيتبعت للي ينزّله بعدين |
| [[await]] | [[getSignedUrl]] بترجّع Promise، فبنستنى النتيجة. والـ [[await]] على أعلى مستوى في الملف شغالة لأنه [[.mjs]] (ES module) |
| [[expiresIn: 300]] | ٣٠٠ ثانية = ٥ دقايق: كفاية للرفع، وقصيرة لو الرابط اتسرّب |
| [[expiresIn: 3600]] | ساعة للتنزيل |

---

## ٥. سطرين الطباعة

~~~js
console.log(uploadUrl.split("?")[0]);
console.log(new URL(downloadUrl).searchParams.get("X-Amz-Expires"));
~~~

- [[split("?")]] بيقسم النص عند [[?]]، و [[[0]]] بياخد اللي قبلها: العنوان من غير التوقيع.
- [[new URL(...)]] بيحلل الرابط، و [[searchParams.get("X-Amz-Expires")]] بيجيب قيمة واحدة من الـ query.

~~~bash
R2_ACCOUNT_ID=0123456789abcdef0123456789abcdef R2_ACCESS_KEY_ID=test R2_SECRET_ACCESS_KEY=test node r2.mjs
~~~

~~~text الناتج
https://myapp-uploads.0123456789abcdef0123456789abcdef.r2.cloudflarestorage.com/avatars/42.webp
3600
~~~

الـ SDK حط اسم الـ bucket في أول الـ host لوحده ([[myapp-uploads.ACCOUNT.r2...]])، ودي اسمها virtual-hosted style. و [[3600]] هي صلاحية رابط التنزيل.

في bash، [[NAME=value node r2.mjs]] بيحط المتغيرات للأمر ده بس. في PowerShell بتتكتب الأول (اتجرّب في pwsh وطلع نفس الناتج بالظبط):

~~~powershell
$env:R2_ACCOUNT_ID="0123456789abcdef0123456789abcdef"; $env:R2_ACCESS_KEY_ID="test"; $env:R2_SECRET_ACCESS_KEY="test"; node r2.mjs
~~~

---

## ٦. الرفع الفعلي (من الـ docs)

~~~bash
curl -X PUT -H "Content-Type: image/webp" --upload-file avatar.webp "UPLOAD_URL_FROM_THE_SCRIPT"
~~~

[[-X PUT]] نوع الطلب، و [[--upload-file]] ابعت محتوى الملف ده كـ body، والرابط بين [["..."]] لأن فيه [[&]] (من غيرها الشل يفتكرها «شغّل في الخلفية»). مع مفاتيح حقيقية بيرجّع 200. ومع مفاتيح [[test]] بيرجّع 403 لأن R2 مش لاقي المفتاح ده ([[InvalidAccessKeyId]]).

---

## الخلاصة

| من S3 لـ R2 | غيّر |
|---|---|
| [[region]] | [["auto"]] |
| [[endpoint]] | [[https://ACCOUNT_ID.r2.cloudflarestorage.com]] |
| المفاتيح | R2 API token على bucket واحد |
| presigned PUT | [[requestChecksumCalculation: "WHEN_REQUIRED"]] |

> الرابط الموقّع بيتعمل على جهازك من غير ما يكلّم R2، فطلوعه مش دليل إن المفاتيح صح. الدليل الحقيقي أول PUT عليه.`,
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

مع حساب حقيقي: [[curl -X PUT -H "Content-Type: image/webp" --upload-file a.webp "UPLOAD_URL"]] يرجّع 200، والملف يظهر في الـ bucket. لو رجّع 403 [[SignatureDoesNotMatch]]، غالبًا الـ Secret Access Key غلط، أو الرابط اتنسخ ناقص أو اتعدّل. والـ Content-Type مش داخل في التوقيع افتراضيًا (الرابط فيه [[X-Amz-SignedHeaders=host]] بس في SDK v3 الحالي)، فلو عايز تجبر المتصفح يرفع بنفس النوع ضيف [[signableHeaders: new Set(["content-type"])]] في options بتاعة [[getSignedUrl]]، وساعتها أي نوع مختلف هيترفض.`,
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
          teach: R`## الفكرة: دالة واحدة بتاخد طلب وترجّع رد

الـ Worker كله object فيه دالة [[fetch]]. Cloudflare بيناديها مع كل طلب، وهي بتبص على المسار وتقرر: JSON، أو ملف من R2، أو 404.

جرّبناه بطريقتين (أكتوبر ٢٠٢٦): الأول [[test.mjs]] بتاع الـ solCode بـ Node 24 على ويندوز (env وهمي)، والتاني [[wrangler dev]] (wrangler 4.148.0) جوه [[node:22-slim]] بـ R2 محلي حقيقي فيه ملف. النشر نفسه ([[wrangler deploy]]) محتاج حساب، فده من الـ docs.

---

## ١. [[export default { async fetch(request, env, ctx) {...} }]]

~~~js
export default {
  async fetch(request, env, ctx) {
~~~

| الحتة | معناها |
|---|---|
| [[export default]] | ده الحاجة الأساسية اللي الملف بيطلّعها. Cloudflare بيعمل لها import |
| [[{ ... }]] | object، وجواه دوال باسم الحدث: [[fetch]] للطلبات (وفيه [[scheduled]] للـ cron مثلًا) |
| [[async]] | الدالة فيها [[await]]، وبترجّع Promise |
| [[request]] | الطلب: [[Request]] عادي زي اللي في المتصفح |
| [[env]] | المتغيرات والأسرار والـ bindings ([[GREETING]] و [[BUCKET]]) |
| [[ctx]] | أدوات زي [[ctx.waitUntil()]]. مش مستخدم هنا، بس لازم مكانه عشان الترتيب |

---

## ٢. [[const url = new URL(request.url)]]

[[request.url]] نص كامل زي [["https://myapp.example.workers.dev/files/a.txt"]]. و [[new URL()]] بيحلله لحتت، ومنها [[url.pathname]] = [["/files/a.txt"]] (المسار من غير الدومين والـ query).

---

## ٣. مسار [[/api/hello]]

~~~js
if (url.pathname === "/api/hello") {
  const country = request.cf?.country ?? "unknown";
  return Response.json({ hello: env.GREETING, country });
}
~~~

### [[request.cf?.country ?? "unknown"]]: من جوه لبرة

| الحتة | معناها |
|---|---|
| [[request.cf]] | object بيضيفه Cloudflare للطلب: البلد والمدينة والـ data center وغيرهم. برا Cloudflare مش موجود ([[undefined]]) |
| [[?.]] | optional chaining: لو اللي قبلي [[undefined]]، متكملش وارجع [[undefined]] بدل ما تضرب error |
| [[.country]] | كود البلد بحرفين، زي [[EG]] |
| [[??]] | لو اللي على الشمال [[null]] أو [[undefined]]، خد اللي على اليمين |

### [[Response.json({ hello: env.GREETING, country })]]

بيعمل رد JSON جاهز: الـ body بـ [[JSON.stringify]] و header [[content-type: application/json]]. و [[{ ..., country }]] اختصار لـ [[country: country]].

---

## ٤. مسار [[/files/]]: R2 من غير SDK

~~~js
if (url.pathname.startsWith("/files/")) {
  const obj = await env.BUCKET.get(url.pathname.slice(7));
  if (!obj) return new Response("not found", { status: 404 });
  return new Response(obj.body, { headers: { "content-type": obj.httpMetadata?.contentType ?? "application/octet-stream" } });
}
~~~

| الحتة | معناها |
|---|---|
| [[startsWith("/files/")]] | المسار بيبدأ بكده؟ |
| [[slice(7)]] | شيل أول ٧ حروف. [["/files/"]] طولها ٧ بالظبط، فيفضل [["a.txt"]] |
| [[env.BUCKET]] | الـ binding: الـ bucket اللي في [[wrangler.jsonc]] باسم [[BUCKET]]. مفيش مفاتيح ولا endpoint |
| [[.get(key)]] | هات الملف. بترجّع [[null]] لو مش موجود |
| [[!obj]] | لو مفيش ملف، 404 |
| [[obj.body]] | محتوى الملف كـ stream: بيتبعت للزائر وهو بيتقري، من غير ما يتحمّل كله في الذاكرة |
| [[obj.httpMetadata?.contentType]] | النوع اللي الملف اتخزن بيه |
| [["application/octet-stream"]] | لو مفيش نوع: «bytes وخلاص»، والمتصفح هيعرض تحميل |

---

## ٥. أي حاجة تانية: [[return new Response("not found", { status: 404 })]]

[[new Response(body, options)]] بيعمل رد بإيدك. والنص العادي بياخد [[text/plain;charset=UTF-8]] لوحده.

---

## التجربة الأولى: [[test.mjs]] في Node

Node 18+ فيه [[Request]] و [[Response]] نفسهم، فبنعمل import للـ Worker وننادي [[fetch]] بإيدنا، بـ env وهمي: [[GREETING]] نص، و [[BUCKET]] object فيه [[get]] بيرجّع ملف لـ [["a.txt"]] بس.

~~~text node test.mjs
/api/hello 200 application/json {"hello":"ahlan","country":"unknown"}
/files/a.txt 200 text/plain hi from r2
/files/b.txt 404 text/plain;charset=UTF-8 not found
/x 404 text/plain;charset=UTF-8 not found
~~~

[[unknown]] لأن [[new Request()]] في Node مفيهوش [[cf]]، فالـ [[??]] اشتغلت. وشلنا [[BUCKET]] من الـ env وجرّبنا:

~~~text الناتج
/api/hello 200 application/json {"hello":"ahlan","country":"unknown"}
TypeError: Cannot read properties of undefined (reading 'get')
~~~

ده الخطأ اللي الـ sol بيتكلم عنه: [[env.BUCKET]] مش موجود، فـ [[.get]] على [[undefined]].

---

## التجربة التانية: [[wrangler dev]] بـ R2 محلي

[[wrangler.jsonc]] اللي استخدمناه:

~~~json
{
  "name": "myapp-worker",
  "main": "worker.mjs",
  "compatibility_date": "2026-09-01",
  "vars": { "GREETING": "ahlan" },
  "r2_buckets": [{ "binding": "BUCKET", "bucket_name": "myapp-uploads" }]
}
~~~

[[main]] ملف الكود، و [[vars]] بيبقى [[env.GREETING]]، و [[r2_buckets]] بيربط [[env.BUCKET]] بـ bucket اسمه [[myapp-uploads]]. وبعدين حطينا ملف في الـ bucket المحلي وشغّلنا:

~~~bash
npx wrangler r2 object put myapp-uploads/a.txt --file a.txt --content-type text/plain --local
npx wrangler dev
~~~

~~~text الناتج
Creating object "a.txt" in bucket "myapp-uploads".
Upload complete.

Binding                           Resource                  Mode
env.BUCKET (myapp-uploads)        R2 Bucket                 local
env.GREETING ("ahlan")            Environment Variable      local
~~~

[[--local]] يعني الـ bucket على جهازك (جوه فولدر [[.wrangler/state]])، مش على Cloudflare. وطلبنا الـ ٤ مسارات من [[http://127.0.0.1:8787]]:

~~~text الناتج
/api/hello 200 application/json {"hello":"ahlan","country":"EG"}
/files/a.txt 200 text/plain hi from local r2
/files/b.txt 404 text/plain;charset=UTF-8 not found
/x 404 text/plain;charset=UTF-8 not found
~~~

لاحظ [[country: "EG"]]: [[wrangler dev]] بيملا [[request.cf]] ببيانات حقيقية حسب الـ IP بتاعك، فالمسار بيشتغل محليًا زي الإنتاج.

> على ويندوز، في فولدر مساره طويل جدًا، نفس التجربة رجّعت [[500]] [[internal error]] على مسارات R2 وأمر [[r2 object put]] فشل. نفس الملفات في لينكس اشتغلت. لو حصلك كده، جرّب المشروع في فولدر مساره قصير أو في WSL.

---

## الخلاصة

| المسار | بيعمل إيه | الرد |
|---|---|---|
| [[/api/hello]] | JSON من [[env]] و [[request.cf]] | 200 |
| [[/files/KEY]] موجود | [[env.BUCKET.get(KEY)]] | 200 بنوع الملف |
| [[/files/KEY]] مش موجود | [[get]] رجّع [[null]] | 404 |
| أي حاجة تانية | | 404 |

> الـ Worker هو [[Request]] داخل و [[Response]] خارج. عشان كده بيتجرّب في Node بـ env وهمي، أو بـ [[wrangler dev]] بالـ bindings الحقيقية محليًا.`,
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
          teach: R`## الفكرة: ملف بيقول «كل hostname يروح فين»

المثال ملف [[config.yml]] بتاع [[cloudflared]]: رقم الـ tunnel، ومكان مفتاحه، وقايمة قواعد [[ingress]] بتتقري من فوق لتحت. ده شكل الـ tunnel اللي بتديره من ملف (locally-managed). لو بتديره من الداشبورد، نفس القواعد بتتكتب هناك باسم Public hostnames، والسيرفر عليه token بس.

جرّبنا [[cloudflared]] نسخة 2026.10.0 (الـ binary الرسمي لـ Linux) جوه [[ubuntu:24.04]]: التحقق من الملف، و «الطلب ده هيروح لأنهي قاعدة؟»، وملف غلط. الاتنين دول بيشتغلوا على الجهاز من غير حساب. أما تشغيل الـ tunnel نفسه ([[tunnel run]]) محتاج حساب Cloudflare، فده من الـ docs.

---

## ١. السطرين الأولانيين

~~~yaml
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /etc/cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json
~~~

| السطر | معناه |
|---|---|
| [[tunnel:]] | رقم الـ tunnel، UUID (رقم عشوائي فريد بالشكل ده). بيطلع من [[cloudflared tunnel create NAME]] |
| [[credentials-file:]] | ملف JSON فيه سر الـ tunnel، [[tunnel create]] بيعمله. اللي معاه الملف ده يقدر يشغّل الـ tunnel من أي جهاز، فمكانه السيرفر بس |

---

## ٢. [[ingress:]]: القواعد

~~~yaml
ingress:
  - hostname: api.example.com
    service: http://localhost:3000
  - hostname: app.example.com
    service: http://localhost:8080
  - service: http_status:404
~~~

في YAML، [[- ]] في أول السطر معناها «عنصر في قايمة»، والسطر اللي تحته بنفس المسافة جزء من نفس العنصر. فدي ٣ قواعد:

| # | [[hostname]] | [[service]] | المعنى |
|---|---|---|---|
| 0 | [[api.example.com]] | [[http://localhost:3000]] | طلبات الـ API تروح للبرنامج اللي على بورت 3000 في نفس السيرفر |
| 1 | [[app.example.com]] | [[http://localhost:8080]] | الـ frontend على 8080 |
| 2 | (مفيش) | [[http_status:404]] | أي حاجة تانية: رد 404 من غير ما تكلّم أي برنامج |

[[localhost]] هنا من وجهة نظر [[cloudflared]] نفسه. لو [[cloudflared]] على السيرفر مباشرة، يبقى السيرفر. لو هو جوه container، يبقى الـ container نفسه، وعشان كده الـ solCode بيكتب [[http://api:3000]] (اسم الـ service في compose).

---

## ٣. اتأكد من الملف: [[ingress validate]]

~~~bash
cloudflared tunnel --config config.yml ingress validate
~~~

| الحتة | معناها |
|---|---|
| [[tunnel]] | أوامر الـ tunnels |
| [[--config config.yml]] | الملف ده (الافتراضي [[~/.cloudflared/config.yml]]) |
| [[ingress validate]] | اتأكد إن القواعد سليمة، من غير ما تشغّل حاجة |

~~~text الناتج
Validating rules from /tmp/cf/config.yml
OK
~~~

وشلنا القاعدة الأخيرة (الـ catch-all) وجرّبنا تاني:

~~~text الناتج
Validation failed: The last ingress rule must match all URLs (i.e. it should not have a hostname or path filter)
~~~

و exit code [[1]]، فلو حاطه في سكربت deploy هيقف قبل ما يشغّل ملف بايظ. ده اللي الدرس بيقوله: آخر قاعدة لازم من غير hostname.

---

## ٤. الطلب ده رايح فين؟ [[ingress rule URL]]

~~~bash
cloudflared tunnel --config config.yml ingress rule https://api.example.com/healthz
~~~

~~~text الناتج
Using rules from /tmp/cf/config.yml
Matched rule #0
	hostname: api.example.com
	service: http://localhost:3000
~~~

وبنفس الطريقة:

| الـ URL | القاعدة | الخدمة |
|---|---|---|
| [[https://api.example.com/healthz]] | [[#0]] | [[http://localhost:3000]] |
| [[https://app.example.com/]] | [[#1]] | [[http://localhost:8080]] |
| [[https://x.example.com/]] | [[#2]] | [[http_status:404]] |

الترقيم من صفر، وأول قاعدة تطابق تكسب. فلو حطيت الـ catch-all فوق، كل حاجة هتاخد 404 (والـ validate هيرفض ده برضه لأنها مش الأخيرة).

---

## ٥. الـ solCode: الإنتاج بـ Docker Compose

~~~yaml
  tunnel:
    image: cloudflare/cloudflared:latest
    command: tunnel --no-autoupdate run
    environment:
      - TUNNEL_TOKEN=$__{TUNNEL_TOKEN}
    restart: unless-stopped
~~~

| السطر | معناه |
|---|---|
| [[image: cloudflare/cloudflared]] | الـ image الرسمية |
| [[tunnel --no-autoupdate run]] | شغّل الـ tunnel. [[--no-autoupdate]] لأن الـ container بيتحدّث بـ image جديدة، مش بإنه يحدّث نفسه |
| [[TUNNEL_TOKEN=$__{TUNNEL_TOKEN}]] | الـ token من متغير بيئة على السيرفر (ملف [[.env]] جنب الـ compose مش على Git). [[tunnel run --help]] بيقول إن [[--token]] بيتقري من [[$TUNNEL_TOKEN]] |
| [[restart: unless-stopped]] | لو وقع أو السيرفر عمل restart، يقوم تاني |

وخدمة [[api]] مفيهاش [[ports:]] خالص: محدش من برا يوصلها، والوحيد اللي بيكلّمها هو [[cloudflared]] على شبكة compose الداخلية.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| نسخة [[cloudflared]] | [[cloudflared --version]] |
| تتأكد من [[config.yml]] | [[cloudflared tunnel ingress validate]] |
| تعرف طلب رايح لأنهي خدمة | [[cloudflared tunnel ingress rule URL]] |
| تشغّل (محتاج حساب) | [[cloudflared tunnel run]] أو [[cloudflared service install TOKEN]] |

> القواعد من فوق لتحت، أول واحدة تطابق تكسب، والأخيرة من غير hostname. و [[localhost]] معناه المكان اللي [[cloudflared]] نفسه شغال فيه.`,
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
          teach: R`## الفكرة: ٧ أوامر هي دورة حياة مشروع على Vercel

سطّب، اربط الفولدر بمشروع، حط سر، نزّل المتغيرات لجهازك، انشر preview، انشر production، اقرا اللوجات. والعادي إن أغلب الـ deploys بتحصل لوحدها من GitHub، والـ CLI للحاجات اللي بتعملها بإيدك.

اللي اتشغّل هنا: Vercel CLI نسخة 63.1.0 بـ Node 24 على ويندوز ([[--version]] و [[--help]] بتاع الأوامر). كل الأوامر التانية بتكلّم حساب Vercel، فشكل ناتجها من الـ docs.

---

## ١. [[npm i -g vercel]]

[[-g]] (global) يعني سطّبه مرة على الجهاز كله، فأمر [[vercel]] يشتغل من أي فولدر. ولو مش عايز تسطّب global، [[npx vercel]] بيعمل نفس الحاجة.

~~~text npx vercel --version
Vercel CLI 63.1.0
~~~

---

## ٢. [[vercel link]]

بيسألك: أنهي حساب (scope)، وتربط بمشروع موجود ولا تعمل جديد. وبعدها بيعمل فولدر [[.vercel/]] فيه [[project.json]] (رقم المشروع ورقم الحساب). كل الأوامر الجاية بتعرف المشروع منه. والفولدر ده بيتحط في [[.gitignore]] لوحده.

---

## ٣. [[vercel env add DATABASE_URL production]]

| الحتة | معناها |
|---|---|
| [[env add]] | ضيف متغير بيئة |
| [[DATABASE_URL]] | اسمه |
| [[production]] | لأنهي بيئة. التلاتة: [[production]] و [[preview]] و [[development]] |

القيمة مش في الأمر: بيسألك عليها (فمتبقاش في history الترمنال). والـ help بيوري إنك تقدر تديه كذا بيئة مرة واحدة:

~~~text من vercel env --help
  add     name [environment]          Add an Environment Variable
  pull    [filename]                  Pull Environment Variables into a
                                      local file (default: .env.local)
    $ vercel env add API_URL production,preview,development
~~~

> المتغير الجديد مش بيوصل للـ deploy الشغال دلوقتي. بيتقري وقت الـ build، فلازم deploy جديد.

---

## ٤. [[vercel env pull .env.local]]

بينزّل متغيرات بيئة [[development]] في ملف [[.env.local]] على جهازك، و Next.js بيقراه لوحده مع [[npm run dev]]. والـ help بيقول إن [[.env.local]] هو الاسم الافتراضي أصلًا، فـ [[vercel env pull]] لوحده نفس الحاجة. الملف ده فيه أسرار: مكانه [[.gitignore]].

---

## ٥. [[vercel]]

من غير أي حاجة = [[vercel deploy]]: ارفع الفولدر الحالي، و Vercel يبنيه، ويديك URL preview لوحده (شكله [[myapp-abc123-team.vercel.app]]). الـ production مش بيتلمس.

## ٦. [[vercel --prod]]

نفس الرفع، بس الـ deploy ده يبقى production، والدومين بتاعك يشاور عليه.

| | [[vercel]] | [[vercel --prod]] | push على GitHub |
|---|---|---|---|
| البيئة | preview | production | preview لأي branch، و production للـ branch الرئيسي |
| المتغيرات | Preview | Production | حسب البيئة |
| الدومين | URL خاص بيه | الدومين بتاعك + URL خاص | نفس الكلام |

كل deploy نسخة مستقلة ثابتة (immutable) ليها URL لوحدها. عشان كده الـ preview القديم بيفضل بالمتغيرات القديمة.

---

## ٧. [[vercel logs https://myapp-abc123.vercel.app]]

بيعرض لوجات الطلبات لـ deploy معين (بالـ URL أو الـ ID). ومن الـ help:

~~~text من vercel logs --help
  ▲ vercel logs [url|deploymentId] [options]
  Display request logs for a project.
  Use --follow to stream live runtime logs from a deployment.
  Source types: λ = serverless, ε = edge/middleware, ◇ = static/external
~~~

[[--follow]] بيفضل مفتوح ويطبع اللوجات وهي بتحصل. وفيه [[--branch]] و [[--environment]] للفلترة. والرموز اللي في الآخر بتقولك الطلب اتخدم منين: دالة serverless، ولا edge، ولا ملف ثابت.

---

## Netlify: نفس الفكرة

| Vercel | Netlify |
|---|---|
| [[vercel link]] | [[netlify link]] |
| [[vercel env add NAME]] | [[netlify env:set NAME VALUE]] |
| [[vercel]] | [[netlify deploy]] (draft URL) |
| [[vercel --prod]] | [[netlify deploy --prod]] |

(أوامر Netlify من الـ docs.)

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[vercel link]] | يربط الفولدر بمشروع ([[.vercel/]]) |
| [[vercel env add NAME ENV]] | متغير لبيئة، بيسأل عن القيمة |
| [[vercel env pull]] | متغيرات development في [[.env.local]] |
| [[vercel]] | deploy preview |
| [[vercel --prod]] | deploy production |
| [[vercel logs URL]] | لوجات deploy معين |

> أي تغيير في المتغيرات = deploy جديد عشان يبان. والحدود اللي في الـ desc (٥ دقايق للدالة، و ٤.٥ ميجا للطلب) بتحدد إيه اللي ميتعملش على Vercel أصلًا.`,
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
          teach: R`## الفكرة: ٤ connection strings، والفرق بينهم في الهوست والبورت

المثال مفيهوش أوامر، فيه ٤ متغيرات بيئة: لكل منصة واحد عن طريق الـ pooler (للتطبيق) وواحد مباشر (للـ migrations). لو فهمت تقرا الـ URL، هتعرف تفرّق بينهم من نظرة.

الحسابات والـ REF ([[abcdefghijklmnop]]) والباسورد أمثلة. اللي اتشغّل هنا: فكّينا الـ ٤ URLs بـ [[new URL()]] في Node 24، وسألنا الـ DNS الحقيقي عن هوستات Supabase و Neon من [[ubuntu:24.04]] (أكتوبر ٢٠٢٦). الاتصال الفعلي محتاج مشروع، فاللي عن سلوك الـ pooler من الـ docs.

---

## ١. تشريح connection string

~~~text
postgresql://postgres.abcdefghijklmnop:YOUR_PASSWORD@aws-0-eu-central-1.pooler.supabase.com:6543/postgres
~~~

| الحتة | هنا | معناها |
|---|---|---|
| [[postgresql://]] | | البروتوكول (و [[postgres://]] نفس المعنى) |
| اليوزر | [[postgres.abcdefghijklmnop]] | اسم اليوزر، وفي Supabase pooler بيبقى [[postgres.]] + رقم المشروع، عشان الـ pooler يعرف يوصّلك لأنهي مشروع |
| [[:]] ثم الباسورد | [[YOUR_PASSWORD]] | لو فيه رموز زي [[@]] أو [[#]] لازم تتكتب encoded ([[%40]] و [[%23]]) |
| [[@]] ثم الهوست | [[aws-0-eu-central-1.pooler.supabase.com]] | السيرفر |
| [[:6543]] | | البورت |
| [[/postgres]] | | اسم قاعدة البيانات |
| [[?sslmode=require]] | (في Neon) | إعدادات إضافية: لازم اتصال مشفّر |

---

## ٢. فكّيناهم بالكود

~~~js
const u = new URL(s);
console.log(name, "user=" + u.username, "host=" + u.hostname, "port=" + (u.port || "(default 5432)"), "db=" + u.pathname.slice(1), u.search);
~~~

[[new URL()]] بيفهم أي URL مش بس http. و [[u.port]] بيرجع نص فاضي لو مفيش بورت، فـ [[||]] بتحط الكلام اللي بعدها. و [[pathname.slice(1)]] بيشيل الـ [[/]] من أول اسم القاعدة.

~~~text الناتج
DATABASE_URL     user=postgres.abcdefghijklmnop host=aws-0-eu-central-1.pooler.supabase.com port=6543 db=postgres
DIRECT_URL       user=postgres host=db.abcdefghijklmnop.supabase.co port=5432 db=postgres
NEON_POOLED_URL  user=app host=ep-cool-name-123456-pooler.eu-central-1.aws.neon.tech port=(default 5432) db=neondb ?sslmode=require
NEON_DIRECT_URL  user=app host=ep-cool-name-123456.eu-central-1.aws.neon.tech port=(default 5432) db=neondb ?sslmode=require
~~~

### نقرا الجدول

| المتغير | إزاي تعرف إنه pooler ولا مباشر | يستخدمه مين |
|---|---|---|
| [[DATABASE_URL]] (Supabase) | الهوست فيه [[pooler.supabase.com]] والبورت [[6543]] = transaction mode | التطبيق والدوال |
| [[DIRECT_URL]] (Supabase) | [[db.REF.supabase.co]] وبورت [[5432]] = Postgres نفسه | الـ migrations |
| [[NEON_POOLED_URL]] | الهوست فيه [[-pooler]] | التطبيق والدوال |
| [[NEON_DIRECT_URL]] | نفس الهوست من غير [[-pooler]] | الـ migrations |

لاحظ إن Neon مفيهوش بورت مكتوب، فالـ driver بياخد الافتراضي [[5432]] في الاتنين، والفرق كله في كلمة [[-pooler]]. أما Supabase فالفرق في الهوست **والبورت**: نفس هوست الـ pooler على [[5432]] = session mode، وعلى [[6543]] = transaction mode.

---

## ٣. سألنا الـ DNS: الهوستات دي بتشاور على إيه؟

~~~text dig +short aws-0-eu-central-1.pooler.supabase.com
pool-tcp-eu-central-1-fc90801-b77715c9537e506c.elb.eu-central-1.amazonaws.com.
18.198.30.239
52.59.152.35
~~~

الـ pooler بتاع Supabase في فرانكفورت ([[eu-central-1]]) هو load balancer على AWS ([[elb.eu-central-1.amazonaws.com]])، يعني نقطة دخول واحدة لكل المشاريع في الـ region دي، وعشان كده اسم المشروع جوه اليوزر.

~~~text dig +short ep-cool-name-123456-pooler.eu-central-1.aws.neon.tech
eu-central-1.aws.neon.tech.
52.57.171.9
3.126.212.11
~~~

الاسم ده مخترع ومع ذلك رد! Neon عامل wildcard DNS: أي [[ep-...]] بيشاور على بوابة الـ region كلها. البوابة بتعرف أنهي قاعدة انت عايزها من اسم الهوست اللي بيتبعت جوه الـ TLS (اسمه SNI). عشان كده [[sslmode=require]] مش رفاهية في Neon: من غير TLS مفيش SNI، والبوابة متعرفش توصّلك.

---

## ٤. الـ solCode: عدّ الاتصالات

~~~sql
SELECT usename, application_name, state, count(*)
FROM pg_stat_activity
WHERE backend_type = 'client backend'
GROUP BY 1, 2, 3
ORDER BY 4 DESC;
~~~

| الحتة | معناها |
|---|---|
| [[pg_stat_activity]] | view فيه صف لكل process شغال في Postgres، يعني لكل اتصال |
| [[usename]] | اليوزر (مكتوبة كده من غير r، ده اسمها الحقيقي) |
| [[application_name]] | اسم البرنامج اللي فاتح الاتصال لو بعته |
| [[state]] | [[active]] (بينفّذ دلوقتي) أو [[idle]] (فاتح ومستني) |
| [[WHERE backend_type = 'client backend']] | اتصالات العملاء بس، من غير processes Postgres الداخلية |
| [[GROUP BY 1, 2, 3]] | جمّع بأول ٣ أعمدة (بالترتيب مش بالاسم) |
| [[ORDER BY 4 DESC]] | رتّب بالعمود الرابع ([[count]]) من الكبير للصغير |

والسطر اللي بعده بيضرب ٥٠ طلب مع بعض:

~~~bash
seq 50 | xargs -P 50 -I{} curl -s -o /dev/null https://myapp.example.com/api/items
~~~

[[seq 50]] بيطبع الأرقام من 1 لـ 50، و [[xargs]] بيشغّل أمر لكل سطر، و [[-P 50]] يعني ٥٠ في نفس الوقت، و [[-I{}]] بيحدد علامة لمكان الرقم (مش مستخدمة هنا، بس بتخلي [[xargs]] يشغّل أمر منفصل لكل سطر). و [[-o /dev/null]] بيرمي الرد. فيه درس كامل لـ [[xargs]] في تاب bash.

وانت بتشغّل الـ ٥٠، شغّل الـ SQL كذا مرة: بالمباشر من serverless العدد بيطلع، وبالـ pooler بيفضل صغير.

---

## الخلاصة

| | Supabase | Neon |
|---|---|---|
| للتطبيق (pooler) | [[REGION.pooler.supabase.com:6543]]، اليوزر [[postgres.REF]] | الهوست فيه [[-pooler]] |
| للـ migrations (مباشر) | [[db.REF.supabase.co:5432]] (IPv6 بس من غير add-on) | نفس الهوست من غير [[-pooler]] |
| بديل مباشر على IPv4 | الـ pooler على [[5432]] (session mode) | المباشر شغال على IPv4 |

> transaction mode = الاتصال الحقيقي بيرجع للـ pool بعد كل transaction، فاللي بيعيش أطول من كده (prepared statements و [[SET]] و [[LISTEN]]) مش مضمون.`,
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
          teach: R`## الفكرة: ملف واحد بيوصف ٣ حاجات وبيربطهم ببعض

[[render.yaml]] فيه قسمين: [[services]] (الـ API والـ worker) و [[databases]] (Postgres). والحتة الذكية إن الخدمتين بياخدوا عنوان القاعدة منها بالاسم، من غير ما تنسخه بإيدك.

اتجرّب هنا (ويندوز 11، Node 24): قرينا الملف بمكتبة [[yaml]] عشان نتأكد إنه YAML سليم ونشوف Render هيفهمه إزاي، وشغّلنا [[server.ts]] بتاع الـ solCode (كـ JavaScript) جوه [[node:22-slim]] بـ [[PORT]] زي Render. الـ Blueprint نفسه والـ deploy محتاجين حساب Render، فدول من الـ docs.

---

## ١. شكل YAML في سطرين

- [[key: value]] = خانة وقيمتها.
- المسافات في أول السطر هي اللي بتقول مين جوه مين (مسافتين لكل مستوى، ومينفعش Tab).
- [[- ]] في أول السطر = عنصر جديد في قايمة.

فـ [[services:]] قايمة فيها عنصرين (كل واحد بيبدأ بـ [[- type:]])، و [[databases:]] قايمة فيها عنصر واحد.

قريناه بالكود وطبعنا الملخص:

~~~text الناتج
service web shop-api | envVars: DATABASE_URL<-db:shop-db.connectionString, JWT_SECRET<-generated
service worker shop-worker | envVars: DATABASE_URL<-db:shop-db.connectionString
database shop-db frankfurt basic-256mb
~~~

يعني: خدمتين، والاتنين [[DATABASE_URL]] بتاعهم جاي من [[shop-db]]، و [[JWT_SECRET]] متولّد. لو فيه مسافة غلط في الملف كان الـ parse هيفشل أو الشكل هيطلع مختلف، فده اختبار سريع قبل ما ترفع.

---

## ٢. خدمة [[web]]: سطر سطر

~~~yaml
  - type: web
    name: shop-api
    runtime: node
    region: frankfurt
    plan: starter
~~~

| الخانة | معناها |
|---|---|
| [[type: web]] | خدمة بتستقبل HTTP وليها URL. التانيين: [[worker]] و [[cron]] و [[keyvalue]] |
| [[name: shop-api]] | الاسم، والـ URL بيبقى [[shop-api-xxxx.onrender.com]] |
| [[runtime: node]] | Render يبني بـ Node من غير Dockerfile. أو [[docker]] لو عندك Dockerfile |
| [[region: frankfurt]] | المكان. الافتراضي [[oregon]] في أمريكا |
| [[plan: starter]] | حجم الـ instance وسعرها. [[free]] بتنام بعد ربع ساعة |

~~~yaml
    buildCommand: npm ci && npm run build
    preDeployCommand: npx prisma migrate deploy
    startCommand: node dist/server.js
    healthCheckPath: /healthz
~~~

الترتيب اللي Render بيشغّلهم بيه:

| # | الخانة | بيحصل إيه | لو فشل |
|---|---|---|---|
| ١ | [[buildCommand]] | [[npm ci]] (تسطيب بالظبط من [[package-lock.json]]) ثم البناء | الـ deploy يقف، والقديم شغال |
| ٢ | [[preDeployCommand]] | الـ migrations، مرة واحدة | الـ deploy يقف، والقديم شغال |
| ٣ | [[startCommand]] | تشغيل النسخة الجديدة | |
| ٤ | [[healthCheckPath]] | Render يسأل [[/healthz]] لحد ما يرد 200 | الترافيك يفضل على القديم |

وبعد ٤ بس الترافيك يتنقل للجديد.

### [[PORT]]: جرّبناه

Render بيحط رقم البورت في متغير [[PORT]] (القيمة الافتراضية عندهم [[10000]] حسب الـ docs). الـ solCode بيقراه:

~~~js
app.listen(Number(process.env.PORT ?? 3000), "0.0.0.0");
~~~

[[process.env.PORT]] نص، و [[Number()]] بيحوّله رقم، و [[?? 3000]] لو مش موجود (على جهازك). و [[0.0.0.0]] يعني «اسمع على كل الشبكات»، مش [[localhost]] بس اللي محدش من برا الـ container يوصله. شغّلناه بـ [[PORT=10000]]:

~~~text الناتج
curl -i localhost:10000/healthz  ->  HTTP/1.1 200 OK  /  ok
curl localhost:3000/healthz      ->  000 (مفيش حد بيسمع)
~~~

لو كنت كاتب [[3000]] ثابتة، Render هيفضل يسأل على [[10000]] ومحدش يرد، والـ deploy يفشل بـ timeout. ده أول غلطة في الـ sol.

---

## ٣. [[envVars]]: الربط بالقاعدة

~~~yaml
    envVars:
      - key: DATABASE_URL
        fromDatabase:
          name: shop-db
          property: connectionString
      - key: JWT_SECRET
        generateValue: true
~~~

| الخانة | معناها |
|---|---|
| [[key]] | اسم متغير البيئة جوه التطبيق |
| [[fromDatabase.name: shop-db]] | من القاعدة اللي اسمها كده في [[databases]] تحت |
| [[property: connectionString]] | هات الـ connection string الداخلي (شبكة Render الخاصة) |
| [[generateValue: true]] | Render يولّد قيمة عشوائية مرة واحدة ويحفظها |

والـ YAML ده لما اتقرا بقى JSON كده:

~~~text
{"key":"DATABASE_URL","fromDatabase":{"name":"shop-db","property":"connectionString"}}
~~~

---

## ٤. خدمة [[worker]]

نفس الخانات تقريبًا، والفرق:

| | [[web]] | [[worker]] |
|---|---|---|
| URL وبورت | أيوه | لأ |
| [[startCommand]] | [[node dist/server.js]] | [[node dist/worker.js]] |
| [[healthCheckPath]] | موجود | مفيش (مفيش HTTP) |
| [[preDeployCommand]] | موجود | مش محتاجه: الـ migrations اتعملت مرة في الـ web |

نفس [[buildCommand]] لأنهم نفس الريبو، وكل خدمة بتبني نسختها.

---

## ٥. [[databases]]

~~~yaml
databases:
  - name: shop-db
    region: frankfurt
    plan: basic-256mb
~~~

[[name]] هو اللي [[fromDatabase]] بيشاور عليه، و [[region]] لازم نفس الخدمات عشان الشبكة الداخلية، و [[basic-256mb]] خطة مدفوعة صغيرة (٢٥٦ ميجا رام) فيها باك أب ومبتتمسحش بعد ٣٠ يوم زي المجانية.

---

## ٦. الـ worker في الـ solCode

~~~js
setInterval(async () => {
  const count = await prisma.order.count();
  console.log(JSON.stringify({ msg: "worker tick", orders: count }));
}, 10_000);
~~~

[[setInterval(fn, 10_000)]] نفّذ الدالة كل ١٠ ثواني ([[10_000]] = 10000، والـ [[_]] بس عشان القراية). و [[prisma.order.count()]] بيعدّ الصفوف في جدول الطلبات. و [[JSON.stringify]] بيطبع اللوج سطر JSON واحد، فأي أداة لوجات تقدر تفلتره.

---

## الخلاصة

| عايز | في [[render.yaml]] |
|---|---|
| API ليه URL | [[type: web]] + [[healthCheckPath]] |
| شغل في الخلفية | [[type: worker]] |
| migrations قبل التبديل | [[preDeployCommand]] |
| عنوان القاعدة من غير نسخ | [[fromDatabase]] + [[connectionString]] |
| سر عشوائي | [[generateValue: true]] |
| سر انت عارفه | [[sync: false]] وتحطه من الداشبورد |

> كله في نفس الـ [[region]]، والتطبيق يسمع على [[process.env.PORT]] و [[0.0.0.0]].`,
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
          teach: R`## الفكرة: مشروع، وجواه قاعدة وخدمتين بيشاوروا عليها

الأوامر بتبني المشروع من الترمنال خطوة خطوة: سجّل دخول، اعمل مشروع، ضيف Postgres، ضيف خدمتين متغيرهم بيشاور على القاعدة، ارفع الكود، وبعدين راجع واقرا اللوجات وشغّل أمر بمتغيرات الإنتاج.

اتجرّب هنا: Railway CLI نسخة 5.64.0 على ويندوز ([[--version]] و [[--help]] لكل أمر)، وتجربة الـ quoting في bash و PowerShell. كل أمر بيكلّم الحساب (من [[login]] لـ [[run]]) من الـ docs: من غير login أي أمر بيرد [[Unauthorized. Please login with $__btrailway login$__bt]].

---

## ١. [[npm i -g @railway/cli]] و [[railway login]]

الباكدج اسمه [[@railway/cli]] والأمر اسمه [[railway]]:

~~~text railway --version
railway 5.64.0
~~~

[[login]] بيفتح المتصفح وبيحفظ token على جهازك. في CI بدل [[login]] بتحط [[RAILWAY_TOKEN]] كـ secret.

---

## ٢. [[railway init --name shop]]

[[init]] مشروع جديد، و [[--name]] (أو [[-n]]) اسمه. وبيربط الفولدر الحالي بيه، فالأوامر الجاية مش محتاجة تقول أنهي مشروع. ولو المشروع موجود من الداشبورد: [[railway link]].

---

## ٣. [[railway add --database postgres]]

من [[railway add --help]]:

~~~text
  -d, --database <DATABASE>
          The name of the database to add
          [possible values: postgres, mysql, redis, mongo]
~~~

بيعمل خدمة قاعدة بيانات مُدارة اسمها [[Postgres]] (بالـ P كابيتال)، وفيها متغيرات جاهزة زي [[DATABASE_URL]] و [[DATABASE_PUBLIC_URL]].

---

## ٤. [[railway add --service api --variables '...']]

~~~bash
railway add --service api --variables 'DATABASE_URL=$__{{Postgres.DATABASE_URL}}'
~~~

| الحتة | معناها |
|---|---|
| [[--service api]] | خدمة جديدة فاضية اسمها [[api]] (الكود هيجي بعدين بـ [[up]] أو من GitHub) |
| [[--variables]] | متغير بالشكل [[KEY=VALUE]]، وينفع تكررها لكذا متغير |
| [[DATABASE_URL=]] | اسم المتغير جوه الخدمة |
| [[$__{{Postgres.DATABASE_URL}}]] | reference variable: «القيمة هي [[DATABASE_URL]] بتاع خدمة اسمها [[Postgres]]» |

### ليه علامات [[' ']] ومش [[" "]]؟

[[$__{...}]] ليها معنى عند الشل نفسه (متغيرات)، فلازم الشل يعدّيها لـ Railway زي ما هي. جرّبنا:

~~~text bash
$ echo 'DATABASE_URL=$__{{Postgres.DATABASE_URL}}'
DATABASE_URL=$__{{Postgres.DATABASE_URL}}

$ echo "DATABASE_URL=$__{{Postgres.DATABASE_URL}}"
bash: DATABASE_URL=$__{{Postgres.DATABASE_URL}}: bad substitution
~~~

~~~text PowerShell 7 (نفس السطرين في ملف .ps1)
DATABASE_URL=$__{{Postgres.DATABASE_URL}}         (بالـ ' ')
ParserError: Use $__bt{ instead of { in variable names.   (بالـ " ")
~~~

العلامة المفردة [[' ']] في bash و PowerShell معناها «نص حرفي، متلمسش أي حاجة جواه». والمزدوجة [[" "]] بتخلي الشل يحاول يفك [[$]]، فيضرب error. وفي الحالتين الغلط ده أحسن من إنه ينجح بقيمة فاضية.

---

## ٥. [[railway add --service worker --variables '...']]

نفس الكلام لخدمة تانية اسمها [[worker]]. الاتنين بيشاوروا على نفس القاعدة، ولو القاعدة اتغيرت (باسورد جديد مثلًا) الاتنين بيتحدّثوا لوحدهم في الـ deploy الجاي.

---

## ٦. [[railway up --service api]]

[[up]] بيرفع الفولدر الحالي (من غير GitHub)، و Railway يبنيه (بـ Railpack، أو بـ Dockerfile لو موجود) وينشره على الخدمة اللي في [[--service]]. وفيه [[-d]] ([[--detach]]): ارفع وارجع على طول من غير ما تفضل تتابع لوج البناء.

---

## ٧. [[railway variables --service api]]

بيعرض متغيرات الخدمة **بعد** فك الـ references، فهتشوف [[DATABASE_URL]] بقيمة حقيقية فيها [[postgres.railway.internal]] (الشبكة الداخلية). لو شفت النص [[$__{{Postgres.DATABASE_URL}}]] زي ما هو، يبقى الـ reference ما اتفكش: اسم الخدمة غلط.

## ٨. [[railway logs --service worker]]

لوجات آخر deploy للخدمة دي. ومن الـ help: [[-d]] لوج الـ deployment (البناء) بدل لوج التشغيل، و [[-n]] عدد السطور.

---

## ٩. [[railway run npx prisma migrate dev]]

من [[railway run --help]]:

~~~text
Run a local command using variables from the active environment
  -s, --service <SERVICE>          Service to pull variables from (defaults to linked service)
  -e, --environment <ENVIRONMENT>  Environment to pull variables from (defaults to linked environment)
~~~

يعني الأمر بيشتغل **على جهازك**، بس بمتغيرات الخدمة والـ environment المربوطين. فـ [[prisma]] هيكلّم قاعدة Railway نفسها. خلي بالك من حاجتين:

- [[DATABASE_URL]] الداخلي ([[.railway.internal]]) مش بيتوصل من جهازك. عشان كده محتاج [[DATABASE_PUBLIC_URL]] للأوامر دي.
- [[migrate dev]] أمر تطوير (ممكن يطلب reset للقاعدة لو فيه اختلاف). على environment الإنتاج الصح [[migrate deploy]]، وأي أمر بيمسح هيمسح الإنتاج.

---

## الـ solCode: [[railway.json]]

| الخانة | معناها |
|---|---|
| [["$schema"]] | رابط وصف الملف، فالـ editor يكمّل لك ويعلّم على الغلط |
| [["startCommand"]] | أمر التشغيل (بدل [[npm start]] الافتراضي) |
| [["preDeployCommand"]] | قايمة أوامر قبل التبديل: الـ migrations |
| [["healthcheckPath"]] | Railway يستنى المسار ده يرد 200 قبل ما ينقل الترافيك |

الملف ده في الريبو، فالإعداد بيتراجع في PR زي الكود، بدل ما يبقى في الداشبورد بس.

---

## الخلاصة

| الأمر | بيعمل إيه |
|---|---|
| [[railway init -n NAME]] | مشروع جديد ويربط الفولدر |
| [[railway add -d postgres]] | قاعدة مُدارة |
| [[railway add -s NAME -v 'K=$__{{Svc.VAR}}']] | خدمة بمتغير بيشاور على خدمة تانية |
| [[railway up -s NAME]] | ارفع وابني |
| [[railway variables -s NAME]] | المتغيرات بعد الفك |
| [[railway logs -s NAME]] | اللوجات |
| [[railway run CMD]] | أمر على جهازك بمتغيرات الخدمة |

> الـ reference بين [[' ']] دايمًا، واسم الخدمة جواه حساس للحروف الكبيرة والصغيرة.`,
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
          teach: R`## الفكرة: [[fly.toml]] بيوصف الـ app، والـ CLI بينفّذ

المثال ملف [[fly.toml]] بعد ما [[fly launch]] عمله وعدّلناه: اسم الـ app ومكانه، والـ migrations، ونوعين من الـ Machines (web و worker) من نفس الـ image، وإعدادات HTTP، ومقاس الـ Machine.

اتجرّب هنا: flyctl نسخة v0.4.114 (Linux) جوه [[ubuntu:24.04]]، و [[--help]] بتاع [[launch]]. أي أمر بيكلّم Fly (حتى [[fly config validate]] و [[fly platform regions]]) بيرد [[Error: no access token available. Please login with 'flyctl auth login']]، فدول من الـ docs. والملف نفسه قريناه بمكتبة TOML في Node عشان نشوف هيتفهم إزاي.

---

## ١. شكل TOML في سطرين

| الشكل | معناه |
|---|---|
| [[key = "value"]] | خانة وقيمتها |
| [[[section]]] (قوس واحد) | قسم: كل الخانات اللي تحته لحد القسم الجاي تبعه |
| قوسين مزدوجين (زي اللي قبل [[vm]] في آخر الملف) | عنصر في **قايمة** أقسام. لو كررته يبقى عنصرين |

قرينا الملف بـ [[smol-toml]] وطبعناه JSON:

~~~text الناتج (مختصر)
{ "app": "shop-api", "primary_region": "fra", "build": {},
  "deploy": { "release_command": "npx prisma migrate deploy" },
  "processes": { "app": "node dist/server.js", "worker": "node dist/worker.js" },
  "http_service": { "internal_port": 8080, "force_https": true, "auto_stop_machines": "stop",
                    "auto_start_machines": true, "min_machines_running": 1, "processes": [ "app" ] },
  "vm": [ { "size": "shared-cpu-1x", "memory": "512mb" } ] }
~~~

لاحظ إن [[vm]] طلع **قايمة** فيها عنصر واحد، و [[build]] طلع [[{}]] فاضي.

---

## ٢. أول سطرين و [[build]]

~~~toml
app = "shop-api"
primary_region = "fra"

[build]
~~~

| السطر | معناه |
|---|---|
| [[app]] | اسم الـ app، فريد على Fly كله، والدومين [[shop-api.fly.dev]] |
| [[primary_region = "fra"]] | فرانكفورت. أكواد الـ regions ٣ حروف (غالبًا كود مطار): [[ams]] أمستردام، [[iad]] فيرجينيا |
| [[[build]]] فاضي | مفيش إعدادات بناء خاصة، فـ Fly يستخدم الـ [[Dockerfile]] اللي في الريبو |

---

## ٣. [[[deploy]]] و [[release_command]]

~~~toml
[deploy]
  release_command = "npx prisma migrate deploy"
~~~

Fly بيقوّم Machine مؤقتة من الـ image الجديدة، يشغّل فيها الأمر ده، ويمسحها. لو الأمر فشل، الـ deploy بيقف والـ Machines القديمة فاضلة زي ما هي. ده نفس دور [[preDeployCommand]] في Render.

---

## ٤. [[[processes]]]: نوعين Machines من image واحدة

~~~toml
[processes]
  app = "node dist/server.js"
  worker = "node dist/worker.js"
~~~

كل سطر = «مجموعة» (process group) باسم وأمر تشغيل. [[fly deploy]] بيعمل Machines للاتنين من نفس الـ image، وكل مجموعة بتتكبّر لوحدها: [[fly scale count app=2]] أو [[fly scale count worker=3]].

---

## ٥. [[[http_service]]]: مين بيستقبل من النت

~~~toml
[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = "stop"
  auto_start_machines = true
  min_machines_running = 1
  processes = ["app"]
~~~

| الخانة | معناها |
|---|---|
| [[internal_port = 8080]] | البورت اللي التطبيق بيسمع عليه **جوه** الـ container. الـ proxy بتاع Fly بيستقبل على 80 و 443 ويبعت هنا |
| [[force_https = true]] | أي طلب HTTP يتحوّل لـ HTTPS |
| [[auto_stop_machines = "stop"]] | لو مفيش طلبات فترة، الـ proxy يوقّف الـ Machine (مبتتحاسبش على CPU والرام وهي واقفة) |
| [[auto_start_machines = true]] | أول طلب يجي، الـ proxy يقوّمها |
| [[min_machines_running = 1]] | سيب واحدة صاحية دايمًا في الـ primary region، فمحدش يستنى قومة |
| [[processes = ["app"]]] | القواعد دي لمجموعة [[app]] بس. الـ worker ملوش HTTP |

[[["app"]]] قايمة TOML فيها عنصر واحد. ولو نسيت السطر ده، القواعد بتتطبق على كل المجموعات، فالـ worker هيتعامل كـ web وهيتوقف لما مفيش طلبات، أو يفشل في الـ health check لأنه مش بيسمع على 8080.

---

## ٦. مقاس الـ Machine

~~~toml
[[vm]]
  size = "shared-cpu-1x"
  memory = "512mb"
~~~

| الخانة | معناها |
|---|---|
| [[shared-cpu-1x]] | CPU واحد مشترك مع Machines تانية على نفس السيرفر: أرخص حاجة، ويكفي API خفيف |
| [[memory = "512mb"]] | نص جيجا. لو التطبيق عدّاها هيتقتل (OOM) ويقوم تاني |

القوسين المزدوجين هنا لأن [[vm]] قايمة: تقدر تدي كل process group مقاس مختلف بعنصر تاني فيه [[processes = ["worker"]]].

---

## ٧. أوامر الـ solCode

| الأمر | بيعمل إيه |
|---|---|
| [[fly launch --no-deploy]] | اعمل الـ app و [[fly.toml]] (ودوكرفايل لو مش موجود) من غير ما تنشر، عشان تعدّل الأول. الـ flag موجودة في [[fly launch --help]] |
| [[fly secrets set DATABASE_URL="..."]] | سر متشفّر عند Fly، بيوصل للـ Machines كمتغير بيئة. بيعمل restart للـ Machines عشان ياخدوه |
| [[fly deploy]] | ابني الـ image، شغّل [[release_command]]، وحدّث الـ Machines واحدة واحدة |
| [[fly status]] | الـ Machines: المجموعة والـ region والحالة ([[started]] أو [[stopped]]) |
| [[fly scale count app=2]] | خلّي مجموعة app اتنين |
| [[fly logs]] | لوجات لايف من كل الـ Machines |

والـ [[DATABASE_URL]] في [[fly secrets]] مش في [[fly.toml]]: الملف ده على Git، والأسرار لأ.

---

## الخلاصة

| عايز | في [[fly.toml]] |
|---|---|
| مكان الـ app | [[primary_region]] |
| migrations قبل التحديث | [[[deploy]]] [[release_command]] |
| web و worker من image واحدة | [[[processes]]] |
| HTTP للـ web بس | [[processes = ["app"]]] جوه [[[http_service]]] |
| توفير وقت الفراغ | [[auto_stop_machines]] + [[min_machines_running]] |
| المقاس | قسم [[vm]] |

> [[internal_port]] لازم يساوي البورت اللي التطبيق بيسمع عليه فعلًا. ده أشهر سبب لفشل أول deploy.`,
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
          teach: R`## الفكرة: ٦ أوامر على VPS جديد، وواحد منهم بيسطّب كل حاجة

ادخل السيرفر، شغّل سكربت تسطيب **واحد** (Coolify أو Dokploy)، اتأكد إن الـ containers قامت، افتح البورتات اللي محتاجها، واتأكد إن الدومين بيشاور على السيرفر.

السكربتين دول بيسطّبوا Docker ويغيّروا السيرفر كله، فمشغّلناهمش هنا (ولا في container). اللي عملناه: نزّلنا السكربتين وقرينا جواهم بـ [[grep]] (أكتوبر ٢٠٢٦) عشان نعرف بيعملوا إيه بالظبط، وجرّبنا [[docker ps --format]] و [[dig]] بجد. و [[ufw]] من الـ docs.

---

## ١. [[ssh root@203.0.113.10]]

[[ssh]] بيفتح ترمنال على السيرفر. [[root]] اليوزر، و [[203.0.113.10]] الـ IP (رينج محجوز للأمثلة، حط IP سيرفرك). السكربتين محتاجين root، والاتنين بيتأكدوا من ده في أولهم:

~~~text من سكربت Coolify
if [ $EUID != 0 ]; then
    echo "Please run this script as root or with sudo"
~~~

~~~text من سكربت Dokploy
    if [ "$(id -u)" != "0" ]; then
        echo "This script must be run as root" >&2
~~~

[[$EUID]] و [[id -u]] رقم اليوزر، و [[0]] دايمًا root.

---

## ٢. [[curl -fsSL https://cdn.coollabs.io/coolify/install.sh | sudo bash]]

### الحتت

| الحتة | معناها |
|---|---|
| [[-f]] | fail: لو السيرفر رد بخطأ (404 مثلًا) متطبعش صفحة الخطأ. من غيرها bash ممكن ينفّذ صفحة HTML |
| [[-s]] | silent |
| [[-S]] | بس اطبع الخطأ لو حصل (مع [[-s]]) |
| [[-L]] | لو فيه redirect، روح وراه |
| [[| sudo bash]] | ابعت السكربت لـ bash ينفّذه كـ root |

### السكربت ده فيه إيه؟

١٢٣٥ سطر. أهم حاجات لقيناها:

~~~text grep على install.sh بتاع Coolify
567:        apt-get install -y curl wget git jq openssl >/dev/null
635:        apt-get install -y openssh-server >/dev/null
686:    curl -fsSL https://get.docker.com | sh 2>&1 || true
1215:    printf '  Public IPv4   %shttp://%s:8000%s\n' ...
~~~

يعني: بيسطّب أدوات، و SSH server (Coolify بيدير السيرفرات عن طريق SSH حتى السيرفر نفسه)، و Docker من سكربت Docker الرسمي، وفي الآخر بيطبع رابط اللوحة على بورت [[8000]]. والـ compose بتاعه ([[docker-compose.yml]] على نفس الـ CDN) فيه ٣ containers:

~~~text container_name في docker-compose.yml
coolify
coolify-db       (postgres:15-alpine)
coolify-redis    (redis:7-alpine)
~~~

و [[coolify-proxy]] (Traefik) بيتعمل بعدين من جوه اللوحة.

> «نزّل سكربت من النت ونفّذه root» معناه إنك بتثق في المصدر ثقة كاملة. العادة الكويسة: نزّله الأول بـ [[curl -fsSL URL -o install.sh]]، بص عليه، وبعدين شغّله.

---

## ٣. [[curl -sSL https://dokploy.com/install.sh | sh]]

نفس الفكرة لـ Dokploy (٤٠٨ سطر). من جواه:

~~~text grep على install.sh بتاع Dokploy
129:    if ss -tulnp | grep ':3000 ' >/dev/null; then
131:        echo "Dokploy requires port 3000 to be available. ..."
142:      curl -sSL https://get.docker.com | sh -s -- --version $DOCKER_VERSION
247:        docker swarm init --advertise-addr $advertise_addr
281:    --name dokploy-postgres \
311:      --name dokploy \
332:        --name dokploy-traefik \
~~~

| السطر | بيعمل إيه |
|---|---|
| ١٢٩ | بيتأكد إن بورت [[3000]] فاضي ([[ss -tulnp]] بيعرض البورتات اللي فيها حد بيسمع)، لأن اللوحة عليه |
| ١٤٢ | Docker بنسخة محددة |
| ٢٤٧ | [[docker swarm init]]: بيحوّل Docker لوضع Swarm (عشان يقدر يوزّع على كذا سيرفر بعدين) |
| ٢٨١ و ٣١١ | [[dokploy-postgres]] و [[dokploy]] كـ Swarm services |
| ٣٣٢ | Traefik كـ container عادي |

العمود ده هو الفرق الحقيقي بينهم: Coolify = Docker Compose عادي، و Dokploy = Docker Swarm.

> واحد بس! الاتنين عايزين بورت 80 و 443 لـ Traefik بتاعهم، فلو سطّبت الاتنين على نفس السيرفر هيتخانقوا.

---

## ٤. [[docker ps --format "table {{.Names}}\t{{.Status}}"]]

[[docker ps]] بيعرض الـ containers الشغالة، و [[--format]] بيختار الأعمدة:

| الحتة | معناها |
|---|---|
| [[table]] | اطبع جدول بعناوين |
| [[{{.Names}}]] | اسم الـ container (الأقواس المزدوجة دي صيغة Go templates) |
| [[\t]] | Tab بين العمودين |
| [[{{.Status}}]] | الحالة: [[Up 26 minutes]] أو [[Restarting]] أو [[Exited]] |

جرّبناه على containers التجربة بتاعتنا (وزوّدنا [[--filter name=teach-cloud02]] عشان يعرض بتوعنا بس):

~~~text الناتج
NAMES               STATUS
teach-cloud02-ls    Up 26 minutes (healthy)
teach-cloud02-net   Up 27 minutes
~~~

[[(healthy)]] معناها إن الـ container ليه health check وبيعدّيه. على سيرفر Coolify هتشوف [[coolify]] و [[coolify-db]] و [[coolify-redis]] بـ [[Up]]. ولو حاجة [[Restarting]]، اقرا لوجها: [[docker logs coolify]].

---

## ٥. [[sudo ufw allow 22,80,443/tcp]]

[[ufw]] (Uncomplicated Firewall) واجهة سهلة لفايروول لينكس. [[allow 22,80,443/tcp]] افتح SSH و HTTP و HTTPS. ولوحة التحكم ([[8000]] أو [[3000]]) مش في القايمة عمدًا: بعد ما تحطها على دومين بـ HTTPS مش محتاج البورت ده مفتوح للعالم.

> Docker بيكتب قواعد الفايروول بتاعته بنفسه، فأي container بـ [[-p 3000:3000]] أو [[ports:]] بيبقى مفتوح للنت حتى لو [[ufw]] مش سامح بيه. تفاصيل في تاب Docker.

---

## ٦. [[dig +short api.example.com]]

لازم يرجّع IP السيرفر **قبل** ما تطلب شهادة، لأن Let's Encrypt بيتأكد إن الدومين بيشاور عليك. جرّبناه على [[api.example.com]] الحقيقي:

~~~text الناتج
(ولا سطر)
~~~

[[+short]] لما مفيش إجابة بيطبع ولا حاجة. ومن غير [[+short]] تشوف السبب:

~~~text dig api.example.com
;; ->>HEADER<<- opcode: QUERY, status: NXDOMAIN, id: 12697
~~~

[[NXDOMAIN]] = «الاسم ده مش موجود». لو ده اللي طلعلك على دومينك، يبقى لسه معملتش سجل A، والشهادة هتفشل ([[TRAEFIK DEFAULT CERT]] في المتصفح).

---

## الخلاصة

| الخطوة | الأمر | السليم |
|---|---|---|
| ادخل | [[ssh root@IP]] | |
| سطّب (واحد بس) | سكربت Coolify أو Dokploy | لوحة على 8000 أو 3000 |
| اتأكد | [[docker ps --format ...]] | كله [[Up]] |
| فايروول | [[ufw allow 22,80,443/tcp]] | (وافتكر إن Docker بيعدّيه) |
| الدومين | [[dig +short api.example.com]] | IP السيرفر، مش فاضي |

> أول حاجة بعد ما تفتح اللوحة: اعمل حساب الأدمن.`,
          lines: [
            "ادخل السيرفر الجديد.",
            "سكربت تسطيب Coolify الرسمي (Docker + اللوحة على بورت 8000).",
            "أو سكربت Dokploy الرسمي (اللوحة على بورت 3000). اختار واحد بس.",
            "اتأكد إن containers اللوحة شغالة.",
            "SSH والويب بس (وافتكر إن Docker بيعدّي ufw في البورتات اللي بيفتحها).",
            "اتأكد إن الدومين بيشاور على السيرفر قبل ما تطلب شهادة."
          ],
          sol: R`بعد التسطيب، [[docker ps]] المفروض يوريك containers اللوحة: في Coolify أسماء زي [[coolify]] و [[coolify-db]] و [[coolify-redis]] و [[coolify-proxy]] (ده Traefik)، وفي Dokploy [[dokploy-traefik]] كـ container عادي، و [[dokploy]] و [[dokploy-postgres]] كـ Docker Swarm services، فأساميهم في [[docker ps]] بتيجي بزيادة زي [[dokploy.1.abc123...]] (سكربت التسطيب الحالي مبقاش فيه Redis).

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
          teach: R`## الفكرة: فلوس + (ساعات × سعر الساعة)

السكربت بيحسب لكل طريقة تشغيل رقم واحد: الفاتورة الشهرية + تمن الوقت اللي بتصرفه على الصيانة. وسعر ساعتك بييجي من الترمنال، فتقدر تشوف القرار بيتغير إزاي.

اتشغّل بـ Node 24 على ويندوز 11، والـ solCode كمان. الأرقام اللي جوه للتوضيح مش أسعار حقيقية.

---

## ١. [[const HOURLY = Number(process.argv[2] ?? 15)]]

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[process.argv]] | قايمة بكل كلمة في أمر التشغيل |
| [[[2]]] | التالتة (العد من صفر) |
| [[?? 15]] | لو مش موجودة ([[undefined]])، خد 15 |
| [[Number(...)]] | الـ argv دايمًا نص ([["5"]])، فبنحوّله رقم |

ليه [[[2]]]؟ عملنا ملف [[argv.mjs]] فيه سطر واحد بيطبع [[process.argv]]، وشغّلناه بـ [[node argv.mjs 5]]:

~~~text الناتج
[
  'C:\\Program Files\\nodejs\\node.exe',
  'C:\\Users\\ali\\...\\argv.mjs',
  '5'
]
~~~

[[[0]]] البرنامج، و [[[1]]] السكربت، و [[[2]]] أول حاجة انت كتبتها، ولاحظ إنها [['5']] بين علامات تنصيص: نص مش رقم. (والـ [[\\]] اللي في المسارات هي طريقة كتابة [[\]] جوه نص JavaScript.)

---

## ٢. [[setups]]: ٣ طرق في object واحد

~~~js
const setups = {
  "PaaS (Render/Railway)": { bill: { api: 25, worker: 25, postgres: 20, redis: 10 }, opsHours: 0.5 },
  "VPS + Coolify": { bill: { vps: 16, backups: 3, offsite: 1 }, opsHours: 3 },
  "VPS بإيدك": { bill: { vps: 16, backups: 3, offsite: 1 }, opsHours: 5 },
};
~~~

كل مفتاح اسم طريقة (بين [[" "]] لأن فيه مسافات)، وقيمته فيها:

| الخانة | معناها |
|---|---|
| [[bill]] | بنود الفاتورة بالدولار في الشهر. في الـ PaaS كل خدمة بند لوحدها |
| [[opsHours]] | ساعات صيانة في الشهر: تحديثات، باك أب، مشاكل |

لاحظ إن الـ VPS بالطريقتين نفس الفلوس بالظبط (٢٠)، والفرق كله في الساعات: Coolify بيوفّر عليك كتابة Nginx و systemd بإيدك.

---

## ٣. [[const sum = (o) => Object.values(o).reduce((a, b) => a + b, 0)]]

| الحتة | معناها |
|---|---|
| [[(o) => ...]] | دالة بتاخد object وترجّع اللي بعد السهم |
| [[Object.values(o)]] | القيم بس: [[{ vps: 16, backups: 3, offsite: 1 }]] تبقى [[[16, 3, 1]]] |
| [[.reduce((a, b) => a + b, 0)]] | ابدأ بـ [[0]]، وكل مرة زوّد العنصر اللي جاي: 0+16، ثم 16+3، ثم 19+1 = 20 |

---

## ٤. الحلقة

~~~js
for (const [name, s] of Object.entries(setups)) {
  const cash = sum(s.bill);
  const time = s.opsHours * HOURLY;
  console.log(name.padEnd(22), "فلوس", cash, "+ وقت", time, "=", cash + time, "دولار");
}
~~~

- [[Object.entries(setups)]] بيرجّع أزواج [[[الاسم, القيمة]]]، و [[const [name, s]]] بيفكّ كل زوج لمتغيرين.
- [[cash]] مجموع الفاتورة، و [[time]] الساعات × سعر الساعة.
- [[padEnd(22)]] بيزوّد مسافات لحد ما الاسم يبقى ٢٢ حرف، فالأعمدة تبقى تحت بعض.

### الناتج بـ ٣ أسعار ساعة

~~~text node cost.mjs 5
PaaS (Render/Railway)  فلوس 80 + وقت 2.5 = 82.5 دولار
VPS + Coolify          فلوس 20 + وقت 15 = 35 دولار
VPS بإيدك              فلوس 20 + وقت 25 = 45 دولار
~~~

~~~text node cost.mjs 15
PaaS (Render/Railway)  فلوس 80 + وقت 7.5 = 87.5 دولار
VPS + Coolify          فلوس 20 + وقت 45 = 65 دولار
VPS بإيدك              فلوس 20 + وقت 75 = 95 دولار
~~~

~~~text node cost.mjs 40
PaaS (Render/Railway)  فلوس 80 + وقت 20 = 100 دولار
VPS + Coolify          فلوس 20 + وقت 120 = 140 دولار
VPS بإيدك              فلوس 20 + وقت 200 = 220 دولار
~~~

| سعر الساعة | الأرخص | ليه |
|---|---|---|
| ٥ | VPS + Coolify (٣٥) | الوقت رخيص، فالفرق في الفاتورة (٦٠ دولار) هو اللي بيحكم |
| ١٥ | VPS + Coolify (٦٥)، بس الـ VPS بإيدك (٩٥) بقى أغلى من الـ PaaS (٨٧.٥) | ٥ ساعات بقت أغلى من الـ ٦٠ دولار فرق |
| ٤٠ | PaaS (١٠٠) | نص ساعة صيانة بس، والوقت غالي |

ومن غير رقم ([[node cost.mjs]]) بياخد ١٥، فالناتج نفس سطر الـ ١٥.

---

## ٥. الـ solCode: نقطة القلب بالمعادلة

~~~js
const [, , hourly = "15", paasBill = "80", vpsBill = "20", vpsHours = "4"] = process.argv;
~~~

ده فكّ (destructuring) للـ argv: الفاصلتين في الأول بيتجاهلوا [[[0]]] و [[[1]]] (node والسكربت)، والباقي ليه قيم افتراضية لو مكتبتهوش. فـ [[node break-even.mjs 30 120 20 3]] = سعر ساعة ٣٠، فاتورة PaaS ١٢٠، VPS ٢٠، و ٣ ساعات.

نقطة القلب هي سعر الساعة اللي التكلفتين بيتساووا عنده:

~~~text
paasBill + 0.5 × h  =  vpsBill + vpsHours × h
paasBill − vpsBill  =  (vpsHours − 0.5) × h
h  =  (paasBill − vpsBill) / (vpsHours − 0.5)
~~~

والكود هو السطر الأخير بالظبط، و [[toFixed(1)]] بيقرّب لرقم عشري واحد (وبيرجّع نص).

~~~text node break-even.mjs
PaaS: 87.5 | VPS: 80 | الـ VPS أرخص
الاختيار بيقلب عند سعر ساعة 17.1 دولار
~~~

بالأرقام الافتراضية: (80 − 20) / (4 − 0.5) = 60 / 3.5 = 17.14. يعني تحت ١٧.١ دولار في الساعة الـ VPS أرخص، وفوقها الـ PaaS.

~~~text node break-even.mjs 30 120 20 3
PaaS: 135 | VPS: 110 | الـ VPS أرخص
الاختيار بيقلب عند سعر ساعة 40.0 دولار
~~~

(120 − 20) / (3 − 0.5) = 100 / 2.5 = 40. ولاحظ إن [[toFixed]] كتب [[40.0]] مش [[40]].

> نقطة القلب مش بتعتمد على سعر ساعتك خالص: [[node break-even.mjs 10]] طلّع برضه [[17.1]]. سعر الساعة بيحدد انت على أنهي ناحية منها بس.

---

## الخلاصة

| لو زوّدت | النتيجة |
|---|---|
| سعر ساعتك | الـ PaaS تكسب |
| عدد الخدمات (بنود PaaS) | الـ VPS يكسب، ونقطة القلب تعلى |
| ساعات صيانة الـ VPS | نقطة القلب تنزل، يعني الـ PaaS تكسب أسرع |

> الأرقام في المثال للتوضيح. حط فاتورتك الحقيقية، والساعات اللي بتصرفها فعلًا (تحديثات وباك أب واسترجاع مجرّب)، مش «صفر لأنه شغال لوحده».`,
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
          teach: R`## الفكرة: repository، دخول، بناء، اسم كامل، رفع، مراجعة

٦ أوامر بالترتيب اللي هتعمله بيه أول مرة. اللي بعد كده في كل deploy: الـ build والـ tag والـ push بس (والـ login لو الـ token خلص).

اتجرّب هنا: [[docker build --platform linux/amd64]] و [[docker tag]] على Docker Desktop (ويندوز 11) بـ image تجربة من [[nginx:alpine]]. أوامر [[aws ecr]] من الـ docs: ECR مش موجود في LocalStack المجاني، وجرّبناه فرد [[The API for service 'ecr' is either not included in your current license plan]]. والـ push محتاج حساب.

---

## ١. [[aws ecr create-repository ...]]

~~~bash
aws ecr create-repository --repository-name myapp-api --image-scanning-configuration scanOnPush=true
~~~

| الحتة | معناها |
|---|---|
| [[ecr]] | Elastic Container Registry |
| [[create-repository]] | repository = مكان لـ image واحدة بكل نسخها (tags) |
| [[--repository-name myapp-api]] | اسمه |
| [[--image-scanning-configuration scanOnPush=true]] | افحص كل image أول ما تترفع على ثغرات معروفة. الصيغة [[key=value]] اختصار الـ CLI بدل JSON |

الرد (من الـ docs) فيه [[repositoryUri]]: [[123456789012.dkr.ecr.eu-central-1.amazonaws.com/myapp-api]]. ده الاسم اللي هتستخدمه في كل حاجة بعد كده.

---

## ٢. [[aws ecr get-login-password ... | docker login ...]]

~~~bash
aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.eu-central-1.amazonaws.com
~~~

| الحتة | معناها |
|---|---|
| [[get-login-password]] | AWS يدّيك باسورد مؤقت (١٢ ساعة) بالصلاحيات اللي انت شغال بيها |
| [[--region eu-central-1]] | الـ registry في الـ region دي |
| [[|]] | ابعت الباسورد للأمر اللي بعده على طول، من غير ما يتطبع |
| [[--username AWS]] | اليوزر ثابت دايمًا [[AWS]] |
| [[--password-stdin]] | اقرا الباسورد من الـ pipe، مش من الأمر |
| آخر حتة | عنوان الـ registry: [[ACCOUNT.dkr.ecr.REGION.amazonaws.com]] |

ليه [[--password-stdin]] مش [[-p]]؟ أي حاجة مكتوبة في الأمر بتتحفظ في history الترمنال وبتبان في قايمة الـ processes. والـ pipe بيعدّي الباسورد من غير ما يتكتب في أي حتة. والناتج لو نجح: [[Login Succeeded]].

---

## ٣. [[docker build --platform linux/amd64 -t myapp-api:1.4.0 .]]

| الحتة | معناها |
|---|---|
| [[--platform linux/amd64]] | ابني لـ Linux على معالج x86-64 (اللي Fargate الافتراضي عليه) |
| [[-t myapp-api:1.4.0]] | الاسم والـ tag. الـ tag رقم نسخة، مش [[latest]] |
| [[.]] | الـ build context: الفولدر الحالي (وفيه الـ Dockerfile) |

بنينا image تجربة بنفس الطريقة وسألنا Docker هي اتبنت لإيه:

~~~bash
docker build --platform linux/amd64 -t teach-cloud02-api:1.4.0 .
docker image inspect teach-cloud02-api:1.4.0 --format '{{.Os}}/{{.Architecture}}'
~~~

~~~text الناتج
linux/amd64
~~~

على Mac بـ Apple Silicon من غير [[--platform]] كانت هتطلع [[linux/arm64]]، و Fargate x86 هيرفض يشغّلها ([[exec format error]]). ودي أسرع طريقة تتأكد قبل الـ push.

---

## ٤. [[docker tag myapp-api:1.4.0 ACCOUNT.dkr.ecr.../myapp-api:1.4.0]]

[[docker tag]] مبيعملش نسخة: بيدّي نفس الـ image اسم تاني. جرّبنا وبعدين [[docker images]]:

~~~text الناتج
123456789012.dkr.ecr.eu-central-1.amazonaws.com/teach-cloud02-api:1.4.0 932b2693021c 93.6MB
teach-cloud02-api:1.4.0 932b2693021c 93.6MB
~~~

نفس الـ ID ([[932b2693021c]])، يعني image واحدة باسمين، والـ ٩٣.٦ ميجا مش متحسوبين مرتين. أول جزء في الاسم (قبل أول [[/]]) هو اللي بيقول لـ Docker «ارفع على السيرفر ده»، فمن غير الاسم الطويل [[docker push]] هيحاول يرفع على Docker Hub.

---

## ٥. [[docker push ACCOUNT.dkr.ecr.../myapp-api:1.4.0]]

بيرفع الـ layers (طبقات الـ image). اللي موجود قبل كده على ECR مش بيترفع تاني ([[Layer already exists]])، فالـ push التاني بيبقى أسرع بكتير. من غير الخطوة ٢ هتاخد [[no basic auth credentials]] (من الـ docs).

---

## ٦. [[aws ecr describe-images ...]]

~~~bash
aws ecr describe-images --repository-name myapp-api --query "imageDetails[].[imageTags[0],imageSizeInBytes]" --output table
~~~

[[imageDetails[]]] كل الـ images، ومن كل واحدة [[imageTags[0]]] (أول tag) و [[imageSizeInBytes]] (الحجم بالـ byte). الحجم هنا **مضغوط** (زي ما اتخزن على ECR)، فهتلاقيه أصغر من الرقم اللي [[docker images]] بيقوله على جهازك. والتخزين بيتحاسب بالجيجا في الشهر، وده سبب الـ lifecycle policy.

---

## الـ solCode: الـ lifecycle policy

| الخانة | معناها |
|---|---|
| [["rulePriority": 1]] | ترتيب القاعدة: الأصغر يتطبق الأول |
| [["tagStatus": "any"]] | أي image، عليها tag أو لأ |
| [["countType": "imageCountMoreThan", "countNumber": 20]] | لو العدد زاد عن ٢٠ (رقم مش نص) |
| [["action": { "type": "expire" }]] | امسح الأقدم لحد ما يبقوا ٢٠ |

و [[start-lifecycle-policy-preview]] ثم [[get-lifecycle-policy-preview]] بيوروك هيمسح إيه **قبل** ما يمسح.

---

## الخلاصة

| كل deploy | الأمر |
|---|---|
| (لو الـ token خلص) | [[get-login-password | docker login --password-stdin]] |
| ابني للمعالج الصح | [[docker build --platform linux/amd64 -t NAME:VERSION .]] |
| الاسم الكامل | [[docker tag]] لـ [[ACCOUNT.dkr.ecr.REGION.amazonaws.com/REPO:VERSION]] |
| ارفع | [[docker push]] |

> tag برقم نسخة أو commit SHA، والـ [[--platform]] بيطابق اللي هتشغّل عليه.`,
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
          teach: R`## الفكرة: أمر واحد = service و load balancer و autoscaling

[[create-express-gateway-service]] هو ECS Express Mode: بتديه image ودورين IAM، وهو يعمل كل الباقي في حسابك. الأمر مكسور على ٧ سطور، وآخر سطر في المثال أمر تاني بيعرض الـ clusters.

اتجرّب هنا بـ aws-cli 2.37.10 (جوه [[amazon/aws-cli]]): [[help]] بتاع الأمر عشان القيم الافتراضية، وتشغيل الأمر على endpoint مش موجود عشان نتأكد إن الـ CLI قبل كل الـ parameters (من غير ما يكلّم AWS). ECS مش موجود في LocalStack المجاني، والإنشاء الحقيقي بيعمل ALB بيتحاسب بالساعة، فالرد والكونسول من الـ docs.

---

## ١. [[\]] في آخر كل سطر

الأمر طويل، فاتكسر. [[\]] في آخر السطر = «لسه مكمّل». ولازم تبقى آخر حرف من غير مسافة بعدها. في PowerShell بدلها backtick، وفي CMD [[^]].

---

## ٢. الـ parameters واحد واحد

### [[--service-name myapp-api]]

اسم الـ service. من الـ help: لو مكتبتهوش ECS بيولّد اسم، والاسم بيدخل في الـ ARN ومش بيتغير بعد كده.

### [[--execution-role-arn ...ecsTaskExecutionRole]]

الدور اللي **ECS نفسه** بيستخدمه، مش الكود بتاعك. من الـ help:

~~~text
This role is required for Amazon ECS to pull container images from Amazon ECR,
send container logs to Amazon CloudWatch Logs, and retrieve sensitive data from
... Systems Manager Parameter Store or ... Secrets Manager
~~~

يعني: يسحب الـ image، يكتب اللوجات، يقرا الأسرار. والكود جوه الـ container بياخد صلاحياته من [[--task-role-arn]] (مش في المثال) لو محتاج يكلّم S3 مثلًا.

### [[--infrastructure-role-arn ...ecsInfrastructureRoleForExpressServices]]

الدور اللي ECS بيعمل بيه البنية: load balancer و security groups و target group و autoscaling. ده الوحيد الإجباري في الـ help (من غير أقواس [[[ ]]]).

### [[--primary-container '{...}']]

~~~text
'{"image":"123456789012.dkr.ecr.eu-central-1.amazonaws.com/myapp-api:1.4.0","containerPort":3000}'
~~~

JSON بين [[' ']] عشان الشل ميلمسش علامات [["]] اللي جواه. [[image]] الاسم الكامل من ECR (درس [[ECR]])، و [[containerPort]] البورت اللي التطبيق بيسمع عليه جوه الـ container. الـ help بيقول الافتراضي [[80]]، فلو تطبيقك على 3000 ونسيته، الـ health check هيفشل.

### [[--health-check-path /health]]

الـ load balancer بيسأل المسار ده، ولازم يرد 200. الافتراضي في الـ help [[/ping]]، فلو تطبيقك مفيهوش [[/ping]] لازم تكتب المسار بتاعك.

### [[--scaling-target '{"minTaskCount":1,"maxTaskCount":4}']]

من نسخة لـ ٤ حسب الضغط. ومن الـ help، فيه خانتين تانيين اختياريين: [[autoScalingMetric]] ([[AVERAGE_CPU]] أو [[AVERAGE_MEMORY]] أو [[REQUEST_COUNT_PER_TARGET]]) و [[autoScalingTargetValue]] (الافتراضي ٦٠، يعني لو متوسط الـ CPU عدّى ٦٠٪ زوّد نسخة).

### اللي مش مكتوب بياخد افتراضي

| الـ parameter | الافتراضي (من الـ help) |
|---|---|
| [[--cluster]] | الـ cluster اللي اسمه [[default]] |
| [[--cpu]] | [[256]] = ربع vCPU |
| [[--memory]] | [[512]] ميجا |
| [[--cpu-architecture]] | [[X86_64]]، فالـ image لازم [[linux/amd64]] |
| [[--network-configuration]] | الـ default VPC |

---

## ٣. جرّبنا الـ CLI يقبل الأمر

شغّلنا نفس الأمر بالظبط بـ [[--endpoint-url http://127.0.0.1:9]] (عنوان مفيش حد عليه)، عشان الـ CLI يفحص الـ parameters ويقف قبل ما يكلّم أي حد:

~~~text الناتج
aws: [ERROR]: Could not connect to the endpoint URL: "http://127.0.0.1:9/"
~~~

وصل لمرحلة الاتصال، يعني كل الـ parameters والـ JSON مقبولين. وبعدين غلطنا في اسم خانة ([[minTasks]] بدل [[minTaskCount]]):

~~~text الناتج
aws: [ERROR]: An error occurred (ParamValidation): Parameter validation failed:
Unknown parameter in scalingTarget: "minTasks", must be one of: minTaskCount, maxTaskCount, autoScalingMetric, autoScalingTargetValue
~~~

الـ CLI بيمسك الغلط ده على جهازك وبيقولك الأسامي الصح. فلو الأمر فشل بـ [[ParamValidation]]، المشكلة في الكتابة مش في الحساب.

---

## ٤. [[aws ecs list-clusters]]

بيرجّع ARNs بتاعة الـ clusters في الـ region. بعد الأمر الأول هتلاقي [[.../cluster/default]] (اتعمل لوحده لو مكانش موجود). شكل الـ ARN:

~~~text
arn:aws:ecs:eu-central-1:123456789012:cluster/default
 │   │    │   │            │            └ نوع المورد/اسمه
 │   │    │   │            └ رقم الحساب
 │   │    │   └ الـ region
 │   │    └ الخدمة
 │   └ partition (aws العادي)
 └ Amazon Resource Name
~~~

---

## ٥. الـ solCode: الـ URL والمسح

| الأمر | بيعمل إيه |
|---|---|
| [[describe-express-gateway-service --query "service.activeConfigurations[0].ingressPaths[0].endpoint"]] | الـ URL العام اللي الـ ALB بيرد عليه |
| [[delete-express-gateway-service]] | امسح الـ service وكل اللي اتعمل معاه |
| [[aws elbv2 describe-load-balancers]] | اتأكد إن الـ ALB اختفى فعلًا، لأنه بيتحاسب بالساعة |

---

## الخلاصة

| الحتة | اللي يهمك |
|---|---|
| [[--infrastructure-role-arn]] | إجباري: بيه ECS يعمل الشبكة والـ ALB |
| [[--execution-role-arn]] | سحب الـ image واللوجات والأسرار |
| [[containerPort]] | الافتراضي 80، اكتب بورتك |
| [[--health-check-path]] | الافتراضي [[/ping]]، اكتب مسارك |
| [[--scaling-target]] | أقل وأكتر عدد نسخ |

> App Runner اتقفل للعملاء الجداد من ٣٠ أبريل ٢٠٢٦، و AWS بتوجّه لـ Express Mode بداله. والفرق: Express Mode بياخد image جاهزة بس، مش كود من الريبو.`,
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
          teach: R`## الفكرة: cluster على جهازك، وأهم ٦ أسئلة تسألها لـ k8s

أول سطر بيعمل cluster، والباقي هي الأوامر اللي هتكتبها كل يوم: فيه nodes إيه؟ فيه pods إيه؟ الـ pod ده ماله؟ اللوجات؟ ادخل جواه، وارجع للنسخة اللي فاتت.

كل ده اتشغّل فعلًا (أكتوبر ٢٠٢٦): kind v0.33.0 و kubectl v1.36.1 على Docker Desktop في ويندوز 11، والـ cluster طلع Kubernetes v1.37.0. عملنا الـ cluster باسم [[teach-cloud02]] بدل [[dev]]، وملف الإعدادات (kubeconfig) في فولدر التجربة عشان منلمسش إعدادات kubectl اللي على الجهاز. والأوامر نفسها هي هي في PowerShell و bash.

---

## ١. [[kind create cluster --name dev]]

[[kind]] = Kubernetes IN Docker: بيشغّل «سيرفر» k8s كامل كـ container. [[--name]] اسم الـ cluster.

~~~text الناتج (آخره)
 ✓ Starting control-plane 🕹️
 ✓ Installing CNI 🔌
 ✓ Installing StorageClass 💾
Set kubectl context to "kind-teach-cloud02"
~~~

| السطر | معناه |
|---|---|
| control-plane | «المخ»: الـ API server وقاعدة etcd والـ scheduler والـ controllers |
| CNI | Container Network Interface: البرنامج اللي بيدّي كل pod عنوان IP |
| StorageClass | طريقة عمل ديسكات للـ pods |
| [[Set kubectl context]] | kubectl بقى بيكلّم الـ cluster ده. الـ context اسمه [[kind-]] + اسم الـ cluster |

أول مرة kind بيسحب image اسمها [[kindest/node]] (عندنا كانت ١.٣٤ جيجا)، فبتاخد وقت.

---

## ٢. [[kubectl get nodes]]

~~~text الناتج
NAME                          STATUS   ROLES           AGE   VERSION
teach-cloud02-control-plane   Ready    control-plane   26s   v1.37.0
~~~

node واحدة بتعمل كل حاجة (في الإنتاج الـ control plane لوحده والـ workers لوحدهم). [[STATUS]] لازم [[Ready]]. وشفناها في الأول [[NotReady]] لمدة ثواني، لحد ما الـ CNI اشتغل.

---

## ٣. [[kubectl get pods -A]]

[[-A]] = [[--all-namespaces]]. الـ namespace زي فولدر جوه الـ cluster. من غير [[-A]] بيعرض [[default]] بس. على cluster جديد لسه قايم:

~~~text الناتج (مختصر)
NAMESPACE            NAME                                         READY   STATUS    RESTARTS   AGE
kube-system          coredns-559f6c778d-mmmfm                     0/1     Pending   0          2s
kube-system          etcd-teach-cloud02-control-plane             0/1     Running   0          12s
kube-system          kube-apiserver-teach-cloud02-control-plane   0/1     Running   0          10s
kube-system          kindnet-q5r8l                                1/1     Running   0          2s
...
~~~

| العمود | معناه |
|---|---|
| [[READY]] | كام container جاهز من كام. [[0/1]] لسه بيقوم |
| [[STATUS]] | [[Pending]] (مستني مكان أو شبكة)، [[Running]]، [[CrashLoopBackOff]]، [[ImagePullBackOff]] |
| [[RESTARTS]] | اتعاد تشغيله كام مرة. رقم بيزيد = مشكلة |

كل اللي في [[kube-system]] هو k8s نفسه شغال كـ pods.

---

## التجربة: k8s بيصلّح لوحده

~~~bash
kubectl create deployment web --image=nginx:alpine --replicas=3
kubectl delete pod web-6bd469df5c-64sx2
~~~

وفي نفس الوقت كان شغال [[kubectl get pods -w]] ([[-w]] = watch: اطبع أي تغيير أول ما يحصل):

~~~text الناتج
web-6bd469df5c-64sx2   1/1     Terminating         0          23s
web-6bd469df5c-4h2fq   0/1     Pending             0          0s
web-6bd469df5c-4h2fq   0/1     ContainerCreating   0          0s
web-6bd469df5c-4h2fq   1/1     Running             0          1s
~~~

في ثانية: pod جديد باسم جديد ([[4h2fq]]) بدل اللي اتمسح. الاسم نفسه ٣ حتت: [[web]] (الـ Deployment) + [[6bd469df5c]] (الـ ReplicaSet، بيتغير مع كل نسخة) + [[4h2fq]] (عشوائي لكل pod). و [[kubectl get rs]] بيوري اللي عمل كده:

~~~text الناتج
NAME             DESIRED   CURRENT   READY   AGE
web-6bd469df5c   3         3         3       32s
~~~

---

## ٤. [[kubectl describe pod NAME]]

عشان نشوف شكله وفيه مشكلة، غيّرنا الـ image لحاجة مش موجودة ([[kubectl set image deploy/api nginx=nginx:does-not-exist]])، و [[describe]] للـ pod الجديد:

~~~text الناتج (مختصر)
Status:           Pending
    State:          Waiting
      Reason:       ErrImagePull
Events:
  Type     Reason     Age                From               Message
  Normal   Scheduled  32s                default-scheduler  Successfully assigned default/api-... to teach-cloud02-control-plane
  Normal   Pulling    15s (x2 over 31s)  kubelet            Pulling image "nginx:does-not-exist"
  Warning  Failed     13s (x2 over 29s)  kubelet            Failed to pull image "nginx:does-not-exist": ... NotFound
  Normal   BackOff    3s (x2 over 28s)   kubelet            Back-off pulling image "nginx:does-not-exist"
  Warning  Failed     3s (x2 over 28s)   kubelet            Error: ImagePullBackOff
~~~

اقرا الـ Events من فوق لتحت، هي القصة: اتحط على node، حاول يسحب، فشل ([[NotFound]])، استنى (BackOff)، حاول تاني ([[x2]] = حصلت مرتين). [[ErrImagePull]] أول فشل، و [[ImagePullBackOff]] يعني «فشل وأنا مستني قبل المحاولة الجاية»، والانتظار بيطول كل مرة.

والمهم: الـ pods القديمة فضلت [[Running]]. الـ Deployment مش بيقفل القديم غير لما الجديد يبقى جاهز، فالموقع مش وقع.

---

## ٥. [[kubectl logs -f deploy/api]]

[[deploy/api]] بدل اسم pod: kubectl بيختار pod من الـ Deployment. و [[-f]] = follow (يفضل مفتوح). جرّبناه بـ [[--tail=3]] (آخر ٣ سطور):

~~~text الناتج
Found 2 pods, using pod/api-77966c779-f95vh
2026/10/08 11:05:28 [notice] 1#1: start worker process 47
2026/10/08 11:05:28 [notice] 1#1: start worker process 48
~~~

لاحظ أول سطر: فيه ٢ pods واختار **واحد**. اللوجات اللي على التاني مش هتظهر. لكل الـ pods: [[kubectl logs -l app=api]] ([[-l]] = بالـ label).

---

## ٦. [[kubectl exec -it deploy/api -- sh]]

| الحتة | معناها |
|---|---|
| [[exec]] | نفّذ أمر جوه container شغال |
| [[-it]] | interactive + terminal: ترمنال تكتب فيه |
| [[--]] | اللي بعدها هو الأمر اللي هيتنفذ جوه، مش flags لـ kubectl |
| [[sh]] | الشل. images زي alpine مفيهاش bash |

جرّبناه بأمر بدل الترمنال:

~~~bash
kubectl exec deploy/api -- sh -c 'hostname; nginx -v'
~~~

~~~text الناتج
api-77966c779-f95vh
nginx version: nginx/1.31.6
~~~

الـ [[hostname]] جوه الـ pod هو اسم الـ pod نفسه.

---

## ٧. [[kubectl rollout undo deployment/api]]

بعد الـ image الغلط، [[kubectl rollout history deploy/api]] كان فيه revision 1 و 2. الـ undo رجّع 1:

~~~text الناتج
deployment.apps/api rolled back
deployment "api" successfully rolled out
NAME                   READY   STATUS        RESTARTS   AGE
api-57566589f9-6lv97   0/1     Terminating   0          32s
api-77966c779-f95vh    1/1     Running       0          38s
~~~

الـ pod البايظ بيتقفل، والقدام فضلوا زي ما هما (نفس الـ ReplicaSet [[77966c779]]).

---

## على ويندوز

kubectl بييجي مع Docker Desktop، و kind ملف [[kind.exe]] واحد. والأوامر هي هي في PowerShell. بس [[$(...)]] و [[head]] و [[cut]] اللي في الـ solCode bash. في PowerShell بدلهم:

~~~powershell
kubectl delete (kubectl get pods -l app=web -o name | Select-Object -First 1)
~~~

~~~text الناتج (pwsh)
pod "web-6bd469df5c-f5lxx" deleted from default namespace
~~~

[[-o name]] بيطبع [[pod/web-...]]، و [[kubectl delete]] بيقبل الشكل ده زي ما هو، فمش محتاج [[cut]]. بس من غير كلمة [[pod]] قبله: جرّبنا [[kubectl delete pod (...)]] ورفض بـ [[there is no need to specify a resource type as a separate argument]]، لأن النوع مكتوب في الاسم أصلًا.

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| بكلّم أنهي cluster؟ | [[kubectl config current-context]] |
| الـ nodes؟ | [[kubectl get nodes]] |
| الـ pods؟ | [[kubectl get pods -A]] |
| الـ pod ده ماله؟ | [[kubectl describe pod NAME]]، والـ Events في الآخر |
| اللوجات؟ | [[kubectl logs -f deploy/NAME]] |
| ادخل جوه | [[kubectl exec -it deploy/NAME -- sh]] |
| ارجع | [[kubectl rollout undo deployment/NAME]] |
| امسح الـ cluster | [[kind delete cluster --name dev]] |`,
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

أخطاء شائعة: [[kind: command not found]] أو [[Cannot connect to the Docker daemon]] (kind محتاج Docker شغال). و [[ImagePullBackOff]] لو كتبت اسم image غلط. ولو [[kubectl]] بيكلّم cluster تاني (مثلًا شغل)، شوف [[kubectl config current-context]] قبل ما تمسح أي حاجة. (الكلام ده اتجرّب بـ kind v0.33.0 على Docker Desktop في ويندوز، بـ cluster اسمه [[teach-cloud02]]، فالأسامي عندك هتبقى [[dev]] بدل كده.)`,
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
          teach: R`## الفكرة: ملف بيقول «عايز إيه»، مش «اعمل إيه»

الملف ده Deployment: «عايز ٣ pods من الـ image دي، كل واحد عليه label [[app: api]]، ومتبعتلهمش ترافيك غير لما يبقوا جاهزين، ودي حدود الرام والـ CPU». و [[kubectl apply]] بيبعته، و k8s يفضل يقارن الواقع بيه ويصلّح.

اتجرّب على kind (Kubernetes v1.37.0) على Docker Desktop في ويندوز 11، بنسخة الـ solCode ([[nginx:alpine]] على بورت 80)، وجرّبنا كمان الأخطاء اللي في الـ sol واحد واحد. الـ image الأصلية [[ghcr.io/myorg/myapp-api]] مثال مش موجود.

---

## ١. الهيدر: [[apiVersion]] و [[kind]] و [[metadata]]

~~~yaml
apiVersion: apps/v1
kind: Deployment
metadata: { name: api }
~~~

| السطر | معناه |
|---|---|
| [[apiVersion: apps/v1]] | النوع ده موجود في مجموعة [[apps]] نسخة [[v1]]. الـ Pod والـ Service في [[v1]] بس (المجموعة الأساسية) |
| [[kind: Deployment]] | نوع الحاجة |
| [[metadata: { name: api }]] | اسمها. و [[{ }]] في YAML طريقة كتابة object في سطر واحد، زي JSON |

---

## ٢. [[spec]]: اللي انت عايزه

~~~yaml
spec:
  replicas: 3
  selector: { matchLabels: { app: api } }
  template:
    metadata: { labels: { app: api } }
~~~

| السطر | معناه |
|---|---|
| [[replicas: 3]] | ٣ نسخ شغالين دايمًا |
| [[selector.matchLabels]] | «الـ pods بتوعي هما اللي عليهم [[app: api]]» |
| [[template]] | قالب كل pod هيتعمل |
| [[template.metadata.labels]] | كل pod جديد بيتعلّم [[app: api]] |

الـ [[selector]] والـ [[labels]] لازم يتطابقوا. جرّبنا نخليهم مختلفين ([[app: sel]] و [[app: other]]):

~~~text الناتج
The Deployment "sel" is invalid: spec.template.metadata.labels: Invalid value: {"app":"other"}: $__btselector$__bt does not match template $__btlabels$__bt
~~~

k8s رفضه قبل ما يعمل أي حاجة: Deployment مش هيلاقي الـ pods اللي هو نفسه عاملها.

---

## ٣. الـ container

~~~yaml
    spec:
      containers:
        - name: api
          image: ghcr.io/myorg/myapp-api:1.4.0
~~~

[[containers]] قايمة ([[- ]])، لأن الـ pod ممكن يبقى فيه أكتر من container. [[image]] بنسخة محددة [[1.4.0]]: لو [[latest]] مش هتعرف إيه اللي شغال، والـ rollback ملوش معنى.

### [[envFrom]]

~~~yaml
          envFrom: [{ configMapRef: { name: api-config } }, { secretRef: { name: api-secrets } }]
~~~

«خد كل مفتاح في الـ ConfigMap [[api-config]] والـ Secret [[api-secrets]] وحطه متغير بيئة» (الدرس الجاي). جرّبناه والاتنين مش موجودين:

~~~text الناتج
NAME                    READY   STATUS                       RESTARTS   AGE
envt-5495cbcf7d-fsfkd   0/1     CreateContainerConfigError   0          8s
~~~

وفي الـ Events: [[Error: configmap "api-config" not found]]. الـ container مش بيقوم أصلًا، لأن إعداداته ناقصة.

### [[readinessProbe]]

~~~yaml
          readinessProbe: { httpGet: { path: /health, port: 3000 } }
~~~

k8s بيبعت [[GET /health]] على بورت 3000 جوه الـ pod، ولو مردّش 2xx أو 3xx، الـ pod مش «Ready» ومش بياخد ترافيك. والقيم اللي مش مكتوبة بتاخد افتراضي، [[kubectl describe pod]] بيوريها:

~~~text الناتج
    Readiness:    http-get http://:3000/health delay=0s timeout=1s period=10s #success=1 #failure=3
~~~

| القيمة | معناها |
|---|---|
| [[delay=0s]] | ابدأ تسأل على طول |
| [[timeout=1s]] | لو مردّش في ثانية = فشل |
| [[period=10s]] | اسأل كل ١٠ ثواني |
| [[#failure=3]] | ٣ مرات فشل ورا بعض = مش جاهز |

جرّبنا الـ probe ده على nginx (اللي بيسمع على 80 ومفيهوش [[/health]]):

~~~text kubectl get deploy probe (بعد ٢٦ ثانية)
NAME    READY   UP-TO-DATE   AVAILABLE   AGE
probe   0/3     3            0           26s
~~~

الـ pods [[Running]] بس [[0/1]]: شغالين ومحدش هيبعتلهم ترافيك. ده بالظبط غلطة الـ sol.

### [[resources]]

~~~yaml
          resources: { requests: { cpu: 100m, memory: 128Mi }, limits: { memory: 256Mi } }
~~~

| الحتة | معناها |
|---|---|
| [[requests]] | اللي الـ scheduler بيحجزه على الـ node قبل ما يحط الـ pod |
| [[cpu: 100m]] | [[m]] = milli: ١٠٠ من ١٠٠٠ = عُشر CPU |
| [[memory: 128Mi]] | [[Mi]] = mebibyte (١٠٢٤ × ١٠٢٤ byte) |
| [[limits.memory: 256Mi]] | لو عدّاها الـ container يتقتل ([[OOMKilled]]) |

مفيش [[limits.cpu]] عمدًا: لما الـ CPU يخلص التطبيق بيبطأ بس مش بيتقتل، وكتير من الفرق بتسيبه من غير حد.

---

## ٤. [[kubectl apply -f k8s/]]

[[-f]] ملف أو فولدر (كل ملفات YAML اللي فيه).

~~~text الناتج
deployment.apps/api created
deployment "api" successfully rolled out
NAME   READY   UP-TO-DATE   AVAILABLE   AGE
api    3/3     3            3           2s
~~~

([[successfully rolled out]] من [[kubectl rollout status deploy/api]]، بيستنى لحد ما كله Ready.)

وبعدين غيّرنا [[replicas]] لـ 5 وعملنا [[apply]] مرتين:

~~~text الناتج
deployment.apps/api configured
deployment.apps/api unchanged
~~~

أول مرة [[configured]] (فيه فرق، اتطبّق)، والتانية [[unchanged]] (الواقع زي الملف). ده معنى «الحالة المطلوبة»: نفس الملف تطبّقه ١٠ مرات والنتيجة واحدة.

---

## ٥. [[kubectl expose]] والـ Service

~~~bash
kubectl expose deployment api --port 80 --target-port 80
~~~

[[expose]] بيعمل Service بنفس الـ selector بتاع الـ Deployment. [[--port]] البورت اللي الـ Service بيسمع عليه، و [[--target-port]] البورت جوه الـ pod.

~~~text kubectl get svc api
NAME   TYPE        CLUSTER-IP      EXTERNAL-IP   PORT(S)   AGE
api    ClusterIP   10.96.132.159   <none>        80/TCP    0s
~~~

~~~text kubectl get endpointslices -l kubernetes.io/service-name=api
NAME        ADDRESSTYPE   PORTS   ENDPOINTS                             AGE
api-4drjg   IPv4          80      10.244.0.15,10.244.0.17,10.244.0.16   0s
~~~

الـ Service ليه IP ثابت ([[ClusterIP]]، من جوه الـ cluster بس)، والـ EndpointSlice هي قايمة IPs الـ pods الجاهزة اللي بيوزّع عليها. pod مش Ready = مش في القايمة.

ومن pod تاني جوه الـ cluster، الاسم بيشتغل كـ DNS:

~~~bash
kubectl run curl --image=nginx:alpine --rm -i --restart=Never -- sh -c "wget -qO- http://api.default.svc.cluster.local | grep -o '<title>.*</title>'"
~~~

~~~text الناتج
<title>Welcome to nginx!</title>
~~~

[[api]] لوحده اشتغل كمان (نفس الـ namespace).

---

## ٦. [[kubectl port-forward svc/api 8080:80]]

بيفتح بورت 8080 على **جهازك** ويوصّله بالـ Service جوه الـ cluster. ده للتجربة والتشخيص، مش للإنتاج.

~~~text الناتج
Forwarding from 127.0.0.1:8080 -> 80
Forwarding from [::1]:8080 -> 80
Handling connection for 8080
~~~

و [[http://localhost:8080]] رد [[200]] بصفحة [[Welcome to nginx!]]. الأمر بيفضل شغال لحد ما تقفله بـ Ctrl+C.

---

## الخلاصة

| الحتة | لو غلطت فيها |
|---|---|
| [[selector]] ≠ [[labels]] | الـ apply نفسه بيترفض |
| [[envFrom]] لحاجة مش موجودة | [[CreateContainerConfigError]] |
| [[readinessProbe]] على مسار أو بورت غلط | [[Running]] بس [[0/1]]، ومفيش ترافيك |
| من غير [[resources]] | الـ scheduler بيرص pods أكتر من اللي الـ node يشيله |
| [[latest]] | مش عارف إيه اللي شغال |

> [[apply]] = «خلّي الواقع زي الملف». [[configured]] لو فيه فرق، و [[unchanged]] لو مفيش.`,
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
          teach: R`## الفكرة: الإعدادات برا الـ image، وتتقري مرة واحدة

أول سطرين بيعملوا ConfigMap و Secret، والتالت بيثبت إن الـ Secret مش متشفّر، والرابع بيحدّثه من غير ما يضرب error، وآخر سطرين بيعيدوا تشغيل الـ pods عشان ياخدوا القيم الجديدة.

كل ده اتشغّل على kind (Kubernetes v1.37.0) على Docker Desktop في ويندوز 11، مع Deployment الدرس اللي فات (nginx) وفيه [[envFrom]]. وملف [[.env.production]] اللي استخدمناه فيه قيم تجربة:

~~~text .env.production
DATABASE_URL=postgresql://app:s3cret@db:5432/shop
JWT_SECRET=dev-only-not-real
QUOTED="with quotes"
~~~

---

## ١. [[kubectl create configmap api-config --from-literal=...]]

| الحتة | معناها |
|---|---|
| [[create configmap]] | اعمل ConfigMap |
| [[api-config]] | اسمه، وده اللي الـ Deployment بيشاور عليه في [[configMapRef]] |
| [[--from-literal=NODE_ENV=production]] | مفتاح وقيمته مكتوبين في الأمر. أول [[=]] بعد الـ flag جزء منه، والتاني بيفصل المفتاح عن القيمة |

~~~text الناتج
configmap/api-config created
~~~

---

## ٢. [[kubectl create secret generic api-secrets --from-env-file=.env.production]]

| الحتة | معناها |
|---|---|
| [[secret generic]] | Secret عادي (فيه أنواع تانية: [[tls]] للشهادات و [[docker-registry]] لباسورد registry) |
| [[--from-env-file]] | كل سطر [[KEY=VALUE]] في الملف = مفتاح في الـ Secret |

~~~text الناتج
secret/api-secrets created
~~~

### القيمة بتتخزن زي ما هي مكتوبة

[[QUOTED="with quotes"]] اتخزنت بعلامات التنصيص نفسها:

~~~text kubectl get secret api-secrets -o jsonpath='{.data.QUOTED}' | base64 -d
"with quotes"
~~~

[[--from-env-file]] مش بيشيل التنصيص زي ما مكتبات [[dotenv]] بتعمل. فلو باسورد القاعدة مكتوب بين [[" "]]، التطبيق هياخده بالعلامات ويفشل يتصل. اكتب القيم في الملف من غير تنصيص.

---

## ٣. [[kubectl get secret ... -o jsonpath='{.data.DATABASE_URL}' | base64 -d]]

من جوه لبرة:

### الخطوة ١: الـ Secret متخزن إزاي

~~~text kubectl get secret api-secrets -o yaml (جزء)
data:
  DATABASE_URL: cG9zdGdyZXNxbDovL2FwcDpzM2NyZXRAZGI6NTQzMi9zaG9w
  JWT_SECRET: ZGV2LW9ubHktbm90LXJlYWw=
~~~

القيم شكلها متلخبط، بس دي base64: طريقة كتابة أي bytes بحروف وأرقام بس. مفيش مفتاح ولا باسورد. والـ [[=]] في الآخر حشو عشان الطول يبقى مضاعف ٤.

### الخطوة ٢: [[-o jsonpath='{.data.DATABASE_URL}']]

[[-o jsonpath]] بيطلع خانة واحدة: [[.data]] ثم [[.DATABASE_URL]]. والعلامات [[' ']] عشان الشل ميلمسش الـ [[{ }]].

~~~text الناتج
cG9zdGdyZXNxbDovL2FwcDpzM2NyZXRAZGI6NTQzMi9zaG9w
~~~

### الخطوة ٣: [[| base64 -d]]

[[-d]] = decode:

~~~text الناتج
postgresql://app:s3cret@db:5432/shop
~~~

الباسورد [[s3cret]] قدامك. أي حد عنده صلاحية [[get secrets]] في الـ namespace يقدر يعمل كده.

### على ويندوز (PowerShell مفيهوش [[base64]])

~~~powershell
[Text.Encoding]::UTF8.GetString([Convert]::FromBase64String((kubectl get secret api-secrets -o jsonpath='{.data.DATABASE_URL}')))
~~~

من جوه لبرة: [[kubectl ...]] بيرجّع النص، و [[[Convert]::FromBase64String]] بيحوّله bytes، و [[[Text.Encoding]::UTF8.GetString]] بيحوّل الـ bytes نص. وطلّع نفس الـ URL (اتجرّب في pwsh).

---

## ٤. [[create ... --dry-run=client -o yaml | kubectl apply -f -]]

لو عملت [[create]] تاني:

~~~text الناتج
error: failed to create secret secrets "api-secrets" already exists
~~~

الحل سطر واحد بـ ٣ حتت:

| الحتة | معناها |
|---|---|
| [[--dry-run=client]] | متبعتش حاجة للـ cluster، اعمل الـ object على جهازك بس |
| [[-o yaml]] | واطبعه YAML |
| [[| kubectl apply -f -]] | خد الـ YAML ده وطبّقه. [[-]] بعد [[-f]] معناها «اقرا من الـ stdin» بدل ملف |

~~~text الناتج
Warning: resource secrets/api-secrets is missing the kubectl.kubernetes.io/last-applied-configuration annotation ...
secret/api-secrets configured
~~~

الـ Warning ده بيظهر **مرة واحدة** لأن الـ Secret اتعمل بـ [[create]] مش [[apply]]، و kubectl بيصلّحه لوحده. وبعد كده نفس السطر بيطبع [[configured]] أو [[unchanged]] من غير تحذير. عشان كده السطر ده بيتحط في سكربتات: بيشتغل سواء موجود أو لأ.

---

## ٥. التغيير مش بيوصل لوحده

الـ pods شغالة، وجوه واحد منهم:

~~~text kubectl exec deploy/api -- env | grep -E "LOG_LEVEL|NODE_ENV|JWT"
LOG_LEVEL=info
NODE_ENV=production
JWT_SECRET=dev-only-not-real
~~~

غيّرنا [[LOG_LEVEL]] لـ [[debug]] بنفس طريقة [[--dry-run]] (أول سطر في الـ solCode)، وسألنا تاني:

~~~text الناتج
configmap/api-config configured
LOG_LEVEL=info
~~~

لسه [[info]]. متغيرات البيئة بتتنسخ جوه الـ process وقت ما بيبدأ، ومحدش بيغيّرها بعد كده.

---

## ٦. [[kubectl rollout restart deployment/api]] و [[rollout status]]

~~~text الناتج
deployment.apps/api restarted
Waiting for deployment "api" rollout to finish: 1 out of 3 new replicas have been updated...
Waiting for deployment "api" rollout to finish: 2 out of 3 new replicas have been updated...
Waiting for deployment "api" rollout to finish: 1 old replicas are pending termination...
deployment "api" successfully rolled out
~~~

و [[env]] بعدها: [[LOG_LEVEL=debug]].

إزاي [[restart]] بيعمل rolling update والـ image زي ما هي؟ بيحط annotation فيها الوقت جوه قالب الـ pod، والقالب اتغير، فالـ Deployment بيعمل ReplicaSet جديد:

~~~text kubectl get deploy api -o jsonpath='{.spec.template.metadata.annotations}'
{"kubectl.kubernetes.io/restartedAt":"2026-10-08T14:11:04+03:00"}
~~~

وزي أي rolling update: جديد يبقى Ready، قديم يتقفل، واحد واحد، فمفيش لحظة من غير pods. و [[rollout status]] بيفضل مستني لحد ما يخلص (أو يفشل)، فمفيد في CI بعد أي deploy.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| إعدادات عادية | [[create configmap NAME --from-literal=K=V]] |
| أسرار من ملف | [[create secret generic NAME --from-env-file=FILE]] (من غير تنصيص في الملف) |
| تقرا سر | [[get secret NAME -o jsonpath='{.data.K}' | base64 -d]] |
| تعمل أو تحدّث | [[create ... --dry-run=client -o yaml | kubectl apply -f -]] |
| الـ pods ياخدوا الجديد | [[rollout restart]] ثم [[rollout status]] |

> Secret = base64، مش تشفير. احميه بـ RBAC و encryption at rest، ومترفعهوش على Git.`,
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

أخطاء شائعة: تعمل [[kubectl create configmap]] تاني عشان تغيّر القيمة فتاخد [[error: failed to create configmap: configmaps "api-config" already exists]]؛ الطريقة هي [[--dry-run=client -o yaml | kubectl apply -f -]]. و [[.env.production]] فيه سطر بعلامات تنصيص، فالقيمة تتخزن بالتنصيص نفسه. ولو [[env]] مطبعش المتغير خالص، الـ Deployment مفيهوش [[envFrom]] أو اسم الـ ConfigMap فيه مختلف.`,
          solCode: R`kubectl create configmap api-config --from-literal=NODE_ENV=production --from-literal=LOG_LEVEL=debug --dry-run=client -o yaml | kubectl apply -f -
kubectl exec deploy/api -- env | grep LOG_LEVEL
kubectl rollout restart deployment/api
kubectl rollout status deployment/api
kubectl exec deploy/api -- env | grep LOG_LEVEL`
        }
      ]
    }
]);

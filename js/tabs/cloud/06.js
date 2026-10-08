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
    }
]);

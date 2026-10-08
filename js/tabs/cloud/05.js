// تكملة تاب cloud: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/cloud/01.js (شرح حقول الدرس في أوله)
MORE("cloud", [
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
          teach: R`## الفكرة: ملف فيه حتتين، كل حتة بتشتغل في وقت مختلف

الكود ١١ سطر، بس مقسوم نصين: اللي **برا** الـ handler بيشتغل مرة واحدة لما Lambda تجهّز البيئة (cold start)، واللي **جوه** بيشتغل مع كل طلب. العدّاد [[invocations]] و [[envAgeMs]] معمولين مخصوص عشان تشوف الفرق ده بعينك.

اتجرّب مرتين: محليًا بـ [[local.mjs]] من الـ solCode في [[node:22-slim]]، وعلى LocalStack (محاكي AWS في Docker بيشغّل كل بيئة Lambda في container لوحده). LocalStack اللي عندنا مبيدعمش [[nodejs24.x]] لسه، فالدالة اتعملت بـ [[nodejs22.x]]، والكود هو هو.

---

## ١. برا الـ handler

~~~js
const startedAt = Date.now();
let invocations = 0;
~~~

| السطر | معناه |
|---|---|
| [[const startedAt = Date.now()]] | وقت ما البيئة قامت، بالمللي ثانية من سنة ١٩٧٠. [[const]] لأنه مش هيتغير |
| [[let invocations = 0]] | عدّاد. [[let]] لأنه هيزيد |

السطرين دول بيتنفذوا لما الملف يتحمّل، يعني **مرة لكل بيئة**. وده نفس المكان اللي بتعمل فيه SDK clients واتصالات قاعدة البيانات، عشان متتعملش مع كل طلب.

---

## ٢. الـ handler

~~~js
export const handler = async (event) => {
~~~

| الحتة | معناها |
|---|---|
| [[export]] | خلّي الدالة ظاهرة برا الملف، عشان Lambda تلاقيها |
| [[const handler]] | الاسم. Lambda بتدوّر على اللي في إعداد [[--handler index.handler]] (الدرس الجاي) |
| [[async]] | الدالة بترجّع Promise. في Node 24 لازم async، الـ callback اتشال |
| [[(event)]] | الحدث اللي شغّل الدالة: طلب HTTP، أو ملف في S3، أو رسالة |

### جوه

~~~js
invocations += 1;
const name = event.queryStringParameters?.name ?? "world";
~~~

- [[+= 1]] زوّد واحد.
- [[event.queryStringParameters]] اللي بعد [[?]] في الـ URL (من API Gateway أو function URL)، زي [[{ name: "Ali" }]].
- [[?.]] (optional chaining): لو [[queryStringParameters]] مش موجودة أصلًا (طلب من غير [[?]])، متضربش error، رجّع [[undefined]].
- [[??]] (nullish coalescing): لو اللي على الشمال [[undefined]] أو [[null]]، خد [["world"]].

### الرد

~~~js
return {
  statusCode: 200,
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ hello: name, invocations, envAgeMs: Date.now() - startedAt }),
};
~~~

| الخانة | معناها |
|---|---|
| [[statusCode: 200]] | كود HTTP: تمام |
| [[headers]] | headers الرد. هنا بنقول إن الـ body JSON |
| [[body]] | لازم **نص**، فـ [[JSON.stringify]] بيحوّل الـ object لنص |
| [[invocations]] | اختصار لـ [[invocations: invocations]] |
| [[envAgeMs]] | البيئة دي بقالها كام مللي ثانية: دلوقتي ناقص وقت ما قامت |

API Gateway بياخد الـ object ده ويحوّله لرد HTTP حقيقي.

---

## ٣. محليًا: [[local.mjs]]

الـ solCode بيستورد الـ handler وينادي عليه ٥ مرات في نفس الـ process، فالـ module بيتحمّل مرة واحدة زي بيئة Lambda واحدة:

~~~text الناتج
{"hello":"Ali","invocations":1,"envAgeMs":0}
{"hello":"Ali","invocations":2,"envAgeMs":11}
{"hello":"Ali","invocations":3,"envAgeMs":11}
{"hello":"Ali","invocations":4,"envAgeMs":11}
{"hello":"Ali","invocations":5,"envAgeMs":11}
~~~

العدّاد بيزيد لأن [[let invocations]] اتعمل مرة واحدة. و [[envAgeMs]] ثابت تقريبًا لأن الـ ٥ نداءات خلصوا في نفس الـ ١١ مللي.

---

## ٤. على LocalStack

### ورا بعض

~~~text out.json بعد كل طلب (٣ طلبات ورا بعض، بينهم ثواني)
{"statusCode":200,"headers":{"content-type":"application/json"},"body":"{\"hello\":\"Ali\",\"invocations\":1,\"envAgeMs\":13}"}
{"statusCode":200,"headers":{"content-type":"application/json"},"body":"{\"hello\":\"Ali\",\"invocations\":2,\"envAgeMs\":8279}"}
{"statusCode":200,"headers":{"content-type":"application/json"},"body":"{\"hello\":\"Ali\",\"invocations\":3,\"envAgeMs\":10106}"}
~~~

نفس البيئة خدمت التلاتة (warm)، فالعدّاد زاد، و [[envAgeMs]] بقى بالثواني: البيئة عايشة بقالها ٨ ثم ١٠ ثواني.

### في نفس اللحظة، بعد ما البيئة نامت

بعد شوية ما حد ناداها، بعتنا ٣ طلبات مع بعض ([[&]] في bash بيشغّل الأمر في الخلفية من غير ما يستنى، و [[wait]] بيستنى الكل):

~~~text الناتج
{"hello":"P1","invocations":1,"envAgeMs":10}
{"hello":"P2","invocations":1,"envAgeMs":7}
{"hello":"P3","invocations":1,"envAgeMs":7}
~~~

التلاتة [[invocations: 1]]! و [[docker ps]] ورّى ٣ containers للدالة شغالين. يعني:

1. البيئة القديمة اتقفلت لما محدش استخدمها (فكلهم cold start).
2. كل طلب متزامن خد بيئة لوحده، لأن البيئة الواحدة بتخدم طلب واحد في المرة.

وده بالظبط ليه متعتمدش على متغير في الذاكرة كعدّاد أو كاش مشترك: كل بيئة ليها نسختها.

> اللي فوق من LocalStack. على AWS نفسه نفس السلوك حسب الـ docs، والمدة اللي البيئة بتفضل فيها صاحية مش مضمونة ومش منشورة.

---

## الخلاصة

| المكان | بيتنفذ إمتى | حط فيه |
|---|---|---|
| برا الـ handler | مرة لكل بيئة (cold start) | imports، و SDK clients، واتصالات |
| جوه الـ handler | مع كل طلب | الشغل نفسه |
| متغير عام | بيفضل طول ما البيئة عايشة | كاش بسيط بحذر، ومش بيانات يوزر أبدًا |

> الرد لـ HTTP: [[statusCode]] و [[body]] نص. والدالة [[async]].`,
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
          teach: R`## الفكرة: ٤ أجزاء لازم يتجمعوا

دالة شغالة على URL محتاجة ٤ حاجات: **كود** (zip)، و **role** الدالة تشتغل بيها، و **trigger** يناديها (API Gateway)، و **إذن** للـ trigger إنه يناديها. المثال بيعمل الأربعة بالترتيب، وفي الآخر بيتابع اللوجات.

اتجرّب بـ AWS CLI 2.37 على LocalStack (محاكي AWS في Docker): الـ zip والـ role والدالة والـ invoke والإذن واللوجات كلهم اشتغلوا ونواتجهم تحت. API Gateway v2 مش موجود في LocalStack المجاني، فـ [[create-api]] من الـ docs. ونسخة LocalStack دي مبتدعمش [[nodejs24.x]]، فالدالة اتعملت بـ [[nodejs22.x]] (والـ CLI نفسه بيقبل [[nodejs24.x]]، لقيناها في قايمة الـ help).

---

## ١. [[zip fn.zip index.mjs]]

~~~text الناتج
  adding: index.mjs (deflated 33%)
~~~

[[zip]] (على Ubuntu اتسطّب بـ [[apt-get install zip]]) بيعمل ملف مضغوط اسمه [[fn.zip]] فيه [[index.mjs]]. [[deflated 33%]] يعني الملف اتضغط وبقى أصغر بالتلت. والمهم إن الملف في **أول** الـ zip مش جوه فولدر:

~~~text unzip -l fn.zip
  Length      Date    Time    Name
---------  ---------- -----   ----
      358  2026-10-08 09:48   index.mjs
~~~

و [[.mjs]] بيقول لـ Node «ده ES module»، عشان [[export]] تشتغل من غير [[package.json]]. على ويندوز: [[Compress-Archive index.mjs fn.zip]] في PowerShell.

---

## قبلها: الـ role ([[lambda-basic]])

الـ try بيقولك تعملها. اتعملت كده (نفس فكرة درس IAM users و roles، بس الـ trust لـ [[lambda.amazonaws.com]]):

~~~bash
aws iam create-role --role-name lambda-basic --assume-role-policy-document file://trust-lambda.json
aws iam attach-role-policy --role-name lambda-basic --policy-arn arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole
~~~

[[AWSLambdaBasicExecutionRole]] بتسمح للدالة تكتب لوجات في CloudWatch بس. من غيرها الدالة بتشتغل بس مفيش ولا سطر لوج.

---

## ٢. [[aws lambda create-function ...]]

~~~bash
aws lambda create-function --function-name hello --runtime nodejs24.x --handler index.handler --zip-file fileb://fn.zip --role arn:aws:iam::123456789012:role/lambda-basic
~~~

| الخيار | معناه |
|---|---|
| [[--function-name hello]] | الاسم |
| [[--runtime nodejs24.x]] | البيئة: Node 24 |
| [[--handler index.handler]] | الملف [[index]] (من غير امتداد) والدالة [[handler]] اللي جواه |
| [[--zip-file fileb://fn.zip]] | الكود. [[fileb://]] = اقرا الملف كـ **binary** (بايتات)، و [[file://]] للنصوص |
| [[--role arn:...]] | الـ role اللي الدالة هتلبسها |

طلّعنا من الرد أهم خانات بـ [[--query]]:

~~~text الناتج
[
    "hello",
    "nodejs22.x",
    "index.handler",
    "Pending",
    128,
    3
]
~~~

[[Pending]] يعني لسه بتتجهّز (بتبقى [[Active]] بعد ثواني، و [[aws lambda wait function-active-v2]] بيستنى). و [[128]] الرام بالميجا و [[3]] أقصى مدة بالثواني: دول الافتراضي لو مكتبتش [[--memory-size]] و [[--timeout]].

لو كتبت runtime المحاكي مش عارفه:

~~~text الناتج بـ nodejs24.x على LocalStack 4.9
InvalidParameterValueException ... Value nodejs24.x at 'runtime' failed to satisfy constraint
~~~

على AWS نفسه [[nodejs24.x]] شغال.

---

## ٣. [[aws lambda invoke ...]]

~~~bash
aws lambda invoke --function-name hello --cli-binary-format raw-in-base64-out --payload '{"queryStringParameters":{"name":"Ali"}}' out.json && cat out.json
~~~

| الحتة | معناها |
|---|---|
| [[--cli-binary-format raw-in-base64-out]] | في CLI v2 الـ payload بيتعامل كـ base64 افتراضيًا. ده بيقوله «اللي أنا كاتبه JSON عادي» |
| [[--payload '...']] | الـ event اللي الدالة هتستلمه. شكله زي اللي API Gateway بيبعته |
| [[out.json]] | رد الدالة يتكتب هنا |
| [[&& cat out.json]] | لو نجح، اطبع الملف |

~~~text الناتج
{
    "StatusCode": 200,
    "ExecutedVersion": "$LATEST"
}
{"statusCode":200,"headers":{"content-type":"application/json"},"body":"{\"hello\":\"Ali\",\"invocations\":1,\"envAgeMs\":13}"}
~~~

أول JSON من الـ CLI: [[StatusCode: 200]] النداء نفسه نجح. التاني من [[out.json]]: اللي الدالة رجّعته. و [[\"]] جوه الـ body لأن الـ body نص فيه JSON، فالعلامات اللي جواه متهرّبة.

---

## ٤. [[aws apigatewayv2 create-api ... --target ...]]

~~~bash
aws apigatewayv2 create-api --name hello-api --protocol-type HTTP --target arn:aws:lambda:eu-central-1:123456789012:function:hello
~~~

| الخيار | معناه |
|---|---|
| [[apigatewayv2]] | API Gateway النسخة التانية (HTTP APIs) |
| [[--protocol-type HTTP]] | HTTP API (أرخص وأبسط من REST API) |
| [[--target ARN]] | ده «quick create»: route افتراضي [[$default]] بيوصّل **كل** الطلبات للدالة دي، و stage بيعمل deploy لوحده |

الرد (من الـ docs) فيه [[ApiId]] زي [[a1b2c3d4e5]] و [[ApiEndpoint]] زي [[https://a1b2c3d4e5.execute-api.eu-central-1.amazonaws.com]].

---

## ٥. [[aws lambda add-permission ...]]

~~~bash
aws lambda add-permission --function-name hello --statement-id apigw --action lambda:InvokeFunction --principal apigateway.amazonaws.com --source-arn "arn:aws:execute-api:eu-central-1:123456789012:a1b2c3d4e5/*"
~~~

| الخيار | معناه |
|---|---|
| [[--statement-id apigw]] | اسم للقاعدة دي (عشان تمسحها بعدين) |
| [[--action lambda:InvokeFunction]] | مسموح ينادي الدالة |
| [[--principal apigateway.amazonaws.com]] | لخدمة API Gateway |
| [[--source-arn ".../a1b2c3d4e5/*"]] | بس من الـ API ده ([[*]] = أي stage وأي route). من غيره أي API في أي حساب يقدر |

~~~text الناتج
{
    "Statement": "{\"Sid\": \"apigw\", \"Effect\": \"Allow\", \"Action\": \"lambda:InvokeFunction\", \"Resource\": \"arn:aws:lambda:eu-central-1:000000000000:function:hello\", \"Principal\": {\"Service\": \"apigateway.amazonaws.com\"}, \"Condition\": {\"ArnLike\": {\"AWS:SourceArn\": \"arn:aws:execute-api:eu-central-1:000000000000:a1b2c3d4e5/*\"}}}"
}
~~~

ده policy JSON (نفس لغة درس IAM policy) اتضافت **على الدالة نفسها**، اسمها resource-based policy. و [[--source-arn]] بقى [[Condition]] بـ [[ArnLike]]. من غير الخطوة دي API Gateway بيرجّع 500 والدالة عمرها ما بتتنادى.

### البديل: function URL

جرّبناه على LocalStack: [[aws lambda create-function-url-config --function-name hello --auth-type NONE]] رجّع URL للدالة، وطلبه بـ [[curl]] و [[?name=Ali]] رجّع الـ body بس، من غير الغلاف:

~~~text الناتج
{"hello":"Ali","invocations":4,"envAgeMs":35300}
~~~

ده نفس اللي المتصفح بيشوفه من API Gateway: [[statusCode]] بقى كود الرد، و [[headers]] بقت headers، و [[body]] هو الصفحة.

---

## ٦. [[aws logs tail /aws/lambda/hello --since 10m --follow]]

| الحتة | معناها |
|---|---|
| [[/aws/lambda/hello]] | الـ log group اللي Lambda بتعمله لوحده |
| [[--since 10m]] | من آخر ١٠ دقايق |
| [[--follow]] | فضل مفتوح واطبع الجديد أول ما ييجي (زي [[tail -f]]) |

~~~text الناتج (من غير --follow)
... START RequestId: 66bbaf01-da0d-4379-ac21-4949d8ae61cd Version: $LATEST
... END RequestId: 66bbaf01-da0d-4379-ac21-4949d8ae61cd
... REPORT RequestId: 66bbaf01-da0d-4379-ac21-4949d8ae61cd	Duration: 5.32 ms	Billed Duration: 6 ms	Memory Size: 128 MB	Max Memory Used: 128 MB
~~~

كل طلب ٣ سطور. و [[REPORT]]:

| الخانة | معناها |
|---|---|
| [[Duration: 5.32 ms]] | الـ handler خد قد إيه |
| [[Billed Duration: 6 ms]] | اللي هتدفعه، متقرّب لفوق لأقرب مللي |
| [[Memory Size: 128 MB]] | الرام اللي اديتها للدالة |
| [[Max Memory Used]] | أقصى رام استخدمتها فعلًا (المحاكي بيكتب الحد نفسه) |

وعلى AWS أول طلب في بيئة جديدة بيبقى فيه كمان [[Init Duration]]: وقت الـ cold start (من الـ docs، المحاكي مبيكتبوش).

---

## الخلاصة

| الجزء | الأمر | لو ناقص |
|---|---|---|
| الكود | [[zip]] + [[create-function]] | [[Runtime.ImportModuleError]] لو الملف جوه فولدر |
| الـ role | [[create-role]] + [[AWSLambdaBasicExecutionRole]] | مفيش لوجات |
| الـ trigger | [[apigatewayv2 create-api --target]] | مفيش URL |
| الإذن | [[add-permission]] | 500 من API Gateway |
| المتابعة | [[logs tail --follow]] | |

> وكل تعديل بعد كده: zip جديد و [[aws lambda update-function-code --function-name hello --zip-file fileb://fn.zip]].`,
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
          teach: R`## الفكرة: دالة بتبعت إيميل واحد، والشغل الحقيقي قبلها

الكود دالة صغيرة [[sendResetCode(to, code)]] بتبعت كود استرجاع الباسورد. الكود نفسه سهل؛ اللي بيخلّي الإيميل يوصل الـ inbox هو التوثيق اللي في الـ try (DKIM والخروج من الـ sandbox).

SES v2 مش موجود في LocalStack المجاني، ومفيش حساب AWS، فالإرسال الحقيقي من الـ docs. اللي اتجرّب: شغّلنا الدالة نفسها بـ AWS SDK v3 في [[node:22-slim]] وضفنا middleware بيطبع الطلب اللي الـ SDK بيبعته قبل ما يخرج، فشفنا بالظبط إيه اللي بيروح لـ SES. والطلب وصل LocalStack ورجع [[InternalFailure]] (الخدمة مش في الخطة المجانية).

---

## ١. الـ import والكلاينت

~~~js
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const ses = new SESv2Client({ region: "eu-central-1" });
~~~

| الحتة | معناها |
|---|---|
| [[@aws-sdk/client-sesv2]] | باكدج SES النسخة 2 من الـ API ([[npm i @aws-sdk/client-sesv2]]). فيه v1 أقدم ([[client-ses]]) بأسامي تانية |
| [[SESv2Client]] | الكلاينت |
| [[SendEmailCommand]] | عملية «ابعت إيميل» |
| [[region: "eu-central-1"]] | لازم تبقى نفس الـ region اللي وثّقت فيها الدومين. كل region في SES ليها توثيق و sandbox لوحدها |

الكلاينت برا الدالة: بيتعمل مرة واحدة ويتستخدم مع كل إيميل (ولو الكود ده في Lambda، مرة لكل بيئة).

---

## ٢. الدالة

~~~js
export async function sendResetCode(to, code) {
  await ses.send(new SendEmailCommand({ ... }));
}
~~~

[[export]] عشان باقي التطبيق يستوردها، و [[async]] لأن الإرسال بياخد وقت. [[ses.send(...)]] بيبعت الأمر لـ SES، و [[await]] بيستنى الرد: لو SES رفض (مثلًا الإيميل مش موثّق)، الـ error بيطلع من هنا للي نادى الدالة.

---

## ٣. جسم الأمر

~~~js
FromEmailAddress: "MyApp <no-reply@example.com>",
Destination: { ToAddresses: [to] },
Content: { Simple: {
  Subject: { Data: "كود استرجاع الباسورد" },
  Body: { Text: { Data: $__btالكود بتاعك: $__{code}. صالح ١٠ دقايق.$__bt } },
} },
~~~

| الخانة | معناها |
|---|---|
| [[FromEmailAddress]] | المرسل. [[MyApp]] الاسم اللي بيظهر، والإيميل بين [[< >]] لازم على دومين انت موثّقه |
| [[Destination.ToAddresses]] | قايمة مستقبلين. [[[to]]] قايمة فيها واحد |
| [[Content.Simple]] | إيميل «بسيط»: عنوان ونص، و SES بيبني الرسالة. (فيه [[Raw]] لو هتبنيها بإيدك بمرفقات، و [[Template]] لقوالب محفوظة) |
| [[Subject.Data]] | العنوان |
| [[Body.Text.Data]] | النص العادي. وممكن تضيف [[Body.Html.Data]] جنبه |

و [[$__bt...$__{code}...$__bt]] template literal: [[code]] بيتحط جوه النص.

### اللي بيتبعت فعلًا

الـ middleware طبع الطلب لما نادينا [[sendResetCode("you@gmail.com", "482913")]]:

~~~text الطلب
POST /v2/email/outbound-emails
{
  "Content": {
    "Simple": {
      "Subject": {
        "Data": "كود استرجاع الباسورد"
      },
      "Body": {
        "Text": {
          "Data": "الكود بتاعك: 482913. صالح ١٠ دقايق."
        }
      }
    }
  },
  "FromEmailAddress": "MyApp <no-reply@example.com>",
  "Destination": {
    "ToAddresses": [
      "you@gmail.com"
    ]
  }
}
~~~

يعني الـ SDK مجرد حاجة بتحوّل الـ object لطلب HTTP: [[POST]] على [[/v2/email/outbound-emails]] والجسم JSON بنفس أسامي الخانات. والعربي اتبعت UTF-8 عادي. وعلى AWS الحقيقي الرد بيبقى فيه [[MessageId]] (من الـ docs).

---

## ٤. التوثيق (الـ try)

~~~bash
aws sesv2 create-email-identity --email-identity example.com
~~~

بيرجّع (من الـ docs) ٣ tokens في [[DkimAttributes.Tokens]]. كل token بيبقى سجل CNAME في الـ DNS:

~~~text
TOKEN._domainkey.example.com   CNAME   TOKEN.dkim.amazonses.com
~~~

| الكلمة | معناها |
|---|---|
| DKIM | DomainKeys Identified Mail: SES بيوقّع كل إيميل، و Gmail بيجيب المفتاح من الـ DNS ويتأكد إنه من عندك ومتعدّلش |
| SPF | قايمة السيرفرات المسموح لها تبعت باسم الدومين |
| DMARC | سجل بيقول للمستقبل يعمل إيه لو DKIM و SPF فشلوا |
| sandbox | الحالة الافتراضية: تبعت لإيميلات موثّقة بس، و ٢٠٠ في اليوم، وواحد في الثانية |

وبعدها [[aws sesv2 get-email-identity --email-identity example.com]] لحد ما [[DkimAttributes.Status]] يبقى [[SUCCESS]].

---

## الخلاصة

| الخطوة | فين | ليه |
|---|---|---|
| وثّق الدومين (٣ CNAME) | DNS | DKIM: الإيميل يبان إنه منك |
| وثّق إيميلك | SES | في الـ sandbox ده الوحيد اللي تقدر تبعتله |
| [[new SESv2Client({ region })]] | الكود، مرة واحدة | نفس region التوثيق |
| [[ses.send(new SendEmailCommand(...))]] | الكود، لكل إيميل | From على دومينك، و To، و Subject و Body |
| production access | الكونسول | تبعت لأي حد |

> الـ [[await]] مهم: من غيره الدالة ترجع قبل ما SES يرد، وأي رفض بيضيع من غير ما حد يعرف.`,
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
          teach: R`## الفكرة: خزّن مرة، واقرا بالـ role

المثال نصين: ٣ أوامر لـ Parameter Store (خزّن سر، اقراه، اعرض كل أسرار بيئة)، وأمرين لـ Secrets Manager (نفس الفكرة بخدمة تانية). والـ solCode سكربت بيقرا السر ويشغّل التطبيق بيه.

اتجرّب كله بـ AWS CLI 2.37 على LocalStack (محاكي AWS في Docker)، بقيم وهمية: [[db-url.txt]] فيه [[postgres://myapp:fake-pass-123@db.internal:5432/myapp]]. اللي متجرّبش: رسالة AccessDenied (المحاكي مش بيطبّق صلاحيات IAM افتراضيًا)، فدي من الـ docs.

---

## ١. [[aws ssm put-parameter ...]]

~~~bash
aws ssm put-parameter --name /myapp/prod/DATABASE_URL --type SecureString --value file://db-url.txt
~~~

| الحتة | معناها |
|---|---|
| [[ssm]] | Systems Manager، و Parameter Store جزء منه |
| [[put-parameter]] | خزّن قيمة |
| [[--name /myapp/prod/DATABASE_URL]] | الاسم على شكل مسار: التطبيق/البيئة/المتغير |
| [[--type SecureString]] | اتشفّر بـ KMS. الأنواع التانية [[String]] و [[StringList]] من غير تشفير |
| [[--value file://db-url.txt]] | القيمة من الملف ده، مش مكتوبة في الأمر |

~~~text الناتج
{
    "Version": 1
}
~~~

[[Version: 1]] أول نسخة. كل ما تكتب فوقها (بـ [[--overwrite]]) الرقم بيزيد، والنسخ القديمة بتفضل.

### ليه [[file://]]؟

لو كتبت [[--value "postgres://...:pass@..."]] الباسورد يفضل في [[~/.bash_history]]، ويبان في [[ps]] لأي يوزر على الجهاز وقت ما الأمر شغال. الملف بيتقري جوه الـ CLI ومبيظهرش في أي حتة من دول. وبعدها امسح الملف.

---

## ٢. [[aws ssm get-parameter ... --with-decryption ...]]

~~~bash
aws ssm get-parameter --name /myapp/prod/DATABASE_URL --with-decryption --query Parameter.Value --output text
~~~

~~~text الناتج
postgres://myapp:fake-pass-123@db.internal:5432/myapp
~~~

[[--with-decryption]] فك التشفير قبل ما ترجّع، و [[--query Parameter.Value --output text]] القيمة بس من غير JSON، جاهزة تتحط في متغير. ومن غير [[--with-decryption]]:

~~~text الناتج على LocalStack
kms:alias/aws/ssm:postgres://myapp:fake-pass-123@db.internal:5432/myapp
~~~

المحاكي بيكتب «مشفّر» بالشكل ده بس. على AWS الحقيقي بترجع نص طويل base64 مالوش معنى (من الـ docs). و [[alias/aws/ssm]] هو مفتاح KMS الافتراضي اللي AWS عامله لـ SSM.

وباقي بيانات الـ parameter:

~~~text --query "Parameter.[Type,Version,ARN]"
[
    "SecureString",
    1,
    "arn:aws:ssm:eu-central-1:000000000000:parameter/myapp/prod/DATABASE_URL"
]
~~~

الـ ARN ده اللي هتكتبه في الـ policy بتاعة الـ role، أو في [[secrets]] بتاعة ECS.

---

## ٣. [[aws ssm get-parameters-by-path --path /myapp/prod ...]]

ضفنا [[/myapp/prod/JWT_SECRET]] و [[/myapp/dev/DATABASE_URL]] كمان:

~~~text الناتج
[
    "/myapp/prod/DATABASE_URL",
    "/myapp/prod/JWT_SECRET"
]
~~~

كل اللي تحت [[/myapp/prod]] بس، والـ dev مطلعش. وده سبب الأسامي اللي على شكل مسار: الـ role بتاعة سيرفر الإنتاج تاخد صلاحية على [[parameter/myapp/prod/*]]، وسيرفر الـ dev ميشوفهاش. (و [[--query "Parameters[].Name"]] بيطبع الأسامي بس، فمفيش قيمة طلعت على الشاشة.)

---

## ٤. [[aws secretsmanager create-secret ...]]

~~~bash
aws secretsmanager create-secret --name myapp/prod/stripe --secret-string file://stripe.json
~~~

[[--secret-string]] قيمة نصية، وهنا JSON فيه أكتر من مفتاح في سر واحد:

~~~text الناتج
{
    "ARN": "arn:aws:secretsmanager:eu-central-1:000000000000:secret:myapp/prod/stripe-OmfbAy",
    "Name": "myapp/prod/stripe",
    "VersionId": "0eb2fad8-9857-42c3-acf3-9066f3f61f58"
}
~~~

لاحظ آخر الـ ARN: [[-OmfbAy]]. Secrets Manager بيزوّد ٦ حروف عشوائية، عشان لو مسحت سر وعملت واحد بنفس الاسم، الـ ARN القديم ميشاورش على الجديد. فلو كتبت ARN في policy، حط [[-??????]] أو [[*]] في الآخر. والأسامي هنا من غير [[/]] في الأول، بعكس Parameter Store.

---

## ٥. [[aws secretsmanager get-secret-value ...]]

~~~text الناتج
{"secretKey":"sk_test_fake123","webhookSecret":"whsec_fake456"}
~~~

[[SecretString]] النص زي ما اتخزّن، والتطبيق يعمله [[JSON.parse]] وياخد اللي محتاجه. مفيش [[--with-decryption]] هنا: Secrets Manager دايمًا بيفك التشفير لو معاك الصلاحية.

---

## ٦. الـ solCode: سكربت التشغيل

| السطر | معناه |
|---|---|
| [[set -euo pipefail]] | اقف عند أول خطأ، والمتغير الناقص خطأ |
| [[DATABASE_URL=$(aws ssm get-parameter ...)]] | حط القيمة في متغير |
| [[export DATABASE_URL]] | خلّيه متغير بيئة يوصل للبرامج اللي هتشتغل من السكربت |
| [[printf %s "$DATABASE_URL" ... wc -c]] | عدد الحروف، مش القيمة. [[printf %s]] من غير سطر جديد في الآخر |
| [[exec node server.js]] | شغّل التطبيق **مكان** السكربت (نفس الـ process)، فإشارات الإيقاف توصله مباشرة |

~~~text الناتج
DATABASE_URL loaded (53 chars)
~~~

٥٣ حرف = طول [[postgres://myapp:fake-pass-123@db.internal:5432/myapp]]. القيمة نفسها مبتتطبعش أبدًا، عشان متتسربش في اللوج.

### ليه [[set -e]] مهم؟

غيّرنا الاسم لـ [[/myapp/staging/...]] (مش موجود):

~~~text مع set -euo pipefail
aws: [ERROR]: An error occurred (ParameterNotFound) when calling the GetParameter operation: Parameter /myapp/staging/DATABASE_URL not found.
~~~

السكربت وقف بكود [[254]]، والتطبيق مقامش. ومن غير [[set -e]]:

~~~text من غير set -e
aws: [ERROR]: An error occurred (ParameterNotFound) ...
DATABASE_URL loaded (0 chars)
~~~

كمّل عادي بمتغير فاضي، والتطبيق كان هيقوم ويقع بخطأ اتصال غامض بدل الرسالة الواضحة.

---

## الخلاصة

| | Parameter Store ([[SecureString]]) | Secrets Manager |
|---|---|---|
| السعر | ببلاش (standard) | ٠.٤ دولار للسر في الشهر |
| الاسم | [[/app/env/NAME]] | [[app/env/name]]، والـ ARN آخره ٦ حروف عشوائية |
| القراية | [[get-parameter --with-decryption]] | [[get-secret-value]] |
| ميزة زيادة | [[get-parameters-by-path]] | rotation تلقائي |

> القيمة من ملف مش من الأمر، والسكربت بـ [[set -euo pipefail]]، ومتطبعش السر أبدًا. وتغيير السر مش بيوصل للتطبيق غير بعد restart.`,
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
]);

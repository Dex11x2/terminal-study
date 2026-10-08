// تكملة تاب career: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/career/01.js (شرح حقول الدرس في أوله)
MORE("career", [
    {
      t: "الـ portfolio والـ GitHub",
      l: 1,
      n: "مشاريع قليلة بس كل واحد بيثبت حاجة، و README بيبيع، وبروفايل GitHub نضيف، وتاريخ commits محترم، وموقع portfolio صفحة واحدة",
      items: [
        {
          cmd: "٢–٣ مشاريع",
          title: "أنهي مشاريع تستاهل تتحط في الـ portfolio؟ (ومش todo app تاني)",
          desc: R`اللي بيفرز الـ CV (recruiter أو tech lead) بيدّي مشاريعك دقيقة أو اتنين. في الدقيقة دي بيدوّر على دليل إنك تقدر تبني حاجة حقيقية تشتغل، مش إنك خلّصت كورسات. فـ ٢ أو ٣ مشاريع قوية أحسن بكتير من ١٠ مشاريع صغيرة: الكتير بيخبّي القوي.

المشروع يستاهل لو فيه أغلب دول: بيحل مشكلة لحد حقيقي (حتى لو محل قريبك أو عيادة)، ومنشور وليه live link، وفيه جزء صعب بجد (auth وأدوار، أو دفع، أو realtime، أو background jobs، أو منع تعارض في الداتابيز)، وفيه اختبارات و CI، وانت تقدر تشرح كل سطر فيه. وكل مشروع يثبت حاجة مختلفة: واحد UI قوي، وواحد backend وداتابيز، وواحد full-stack منشور.

المشاريع اللي في «تاب المشاريع» معمولة بالظبط للغرض ده. ونسخ الـ tutorials (Netflix clone، و todo، و weather app) مفيدة للتعلم، بس في الـ portfolio مبتثبتش حاجة، إلا لو زوّدت عليها حاجة كبيرة من عندك.`,
          example: R`Project                  | Real user?        | Live? | Hard part                          | Tests/CI | Explain every line? | Keep?
todo-app                 | no                | no    | none                               | no       | yes                 | no
clinic-booking           | yes, uncle's clinic | yes | no double booking (DB constraint)  | yes      | yes                 | YES
weather-dashboard        | no                | yes   | caching a slow external API        | no       | yes                 | maybe: add tests
netflix-clone (tutorial) | no                | yes   | copied from a video                | no       | partly              | no
shop-api                 | no                | yes   | auth, roles, payment webhooks      | yes      | yes                 | YES`,
          try: "اكتب كل المشاريع اللي عملتها في جدول زي ده بصراحة. اختار ٢ أو ٣ «YES» كل واحد بيثبت حاجة مختلفة. ولكل «maybe» اكتب الحاجة الناقصة بالظبط (live link؟ اختبارات؟ جزء صعب؟) وقدّر هتاخد قد إيه.",
          flag: "script",
          deep: {
            why: "الـ junior مالوش خبرة شغل يتحكم عليه بيها، فالمشاريع هي الخبرة. والسؤال اللي في دماغ اللي بيفرز: «لو اديته ticket حقيقي، هيعرف يخلّصه؟». مشروع منشور فيه auth ومنع تعارض واختبارات بيجاوب «آه». عشرة tutorials بيجاوبوا «مش عارف».",
            how: R`الجزء الصعب هو اللي هتتسأل فيه في الانترفيو، فاختاره بحيث يبقى حكاية: «كان فيه مشكلة إن مريضين يحجزوا نفس الميعاد في نفس الثانية، فحطيت unique constraint على (الدكتور، الميعاد) وبقيت أمسك الـ error وأرجّع رسالة». دي الحكاية اللي في درس «problem → decisions → results» في «تاب الانترفيو».

المستخدم الحقيقي مش لازم يبقى شركة: قريب عنده محل، أو جمعية، أو فريق الكورة بتاعك. حتى ١٠ يوزرز حقيقيين بيدّوك حاجات مستحيل تجيلك من tutorial: bugs حقيقية، وطلبات تعديل، ورقم تكتبه في الـ CV.

ولو كل مشاريعك tutorials، مش مشكلة، بس ابدأ واحد جديد: خد مشروع من «تاب المشاريع»، أو مشكلة لحد تعرفه، واقفله بـ live link واختبارات قبل ما تبدأ التاني.`,
            when: "قبل ما تكتب الـ CV أو تعمل موقع portfolio، لأن الاتنين مبنيين على الاختيار ده. وراجع الاختيار كل ما تخلّص مشروع أقوى: القديم يتشال من الـ pins.",
            mistakes: R`تحط كل حاجة عملتها عشان «تبان شغّال». تحط مشروع مش شغال (الـ live link بيرجّع 500، أو الـ free tier نام). تحط مشروع جماعي من غير ما تقول دورك انت إيه بالظبط. وتحط مشروع مش فاكر كوده: أول سؤال في الانترفيو «ليه عملت كذا هنا؟» هيكشفك.`
          },
          teach: R`## الجدول ده اختبار لكل مشروع

كل عمود سؤال، والعمود الأخير الحكم. نفك الأعمدة:

| العمود | السؤال | ليه مهم |
|---|---|---|
| [[Real user?]] | فيه حد حقيقي بيستخدمه؟ | بيجيب bugs وطلبات حقيقية، ورقم تكتبه في الـ CV |
| [[Live?]] | فيه لينك شغال؟ | اللي بيفرز هيدوس، مش هيشغّله عنده |
| [[Hard part]] | فيه حاجة صعبة بجد؟ | دي اللي هتتسأل فيها في الانترفيو |
| [[Tests/CI]] | فيه اختبارات بتشتغل لوحدها؟ | دليل إنك بتشتغل زي فريق |
| [[Explain every line?]] | تقدر تشرح كل سطر؟ | أول سؤال «ليه عملت كذا؟» هيكشف الإجابة |
| [[Keep?]] | يتحط ولا لأ | النتيجة |

---

## نقرا ٣ صفوف

~~~text
clinic-booking           | yes, uncle's clinic | yes | no double booking (DB constraint)  | yes      | yes                 | YES
~~~

كل الخانات «yes»، والجزء الصعب ليه اسم واضح: منع حجزين في نفس الميعاد بـ constraint في الداتابيز. ده مشروع بيتحكي.

~~~text
weather-dashboard        | no                | yes   | caching a slow external API        | no       | yes                 | maybe: add tests
~~~

[[maybe]] معاها الحاجة الناقصة بالظبط ([[add tests]])، مش «أحسّنه».

~~~text
netflix-clone (tutorial) | no                | yes   | copied from a video                | no       | partly              | no
~~~

شكله حلو ومنشور، بس [[partly]] في عمود الشرح كفاية إنه يتشال.

---

## الخلاصة

- ٢ أو ٣ «YES»، وكل واحد بيثبت حاجة مختلفة (UI، و backend، و full-stack).
- كل «maybe» جنبها حاجة واحدة محددة ووقت.
- عمودين متكدبش فيهم: «Real user?» و «Explain every line?».`,
          lines: [
            "الأعمدة: المعايير اللي بتفرّق مشروع portfolio عن تمرين.",
            "todo app: مفيش يوزر ولا جزء صعب. يتشال.",
            "مشروع حقيقي لعيادة، ومنشور، وفيه مشكلة حقيقية اتحلّت: ده أقوى مشروع.",
            "كويس بس ناقص اختبارات: ساعات شغل قليلة تحوّله لـ YES.",
            "tutorial منسوخ ومش فاهم كل سطر فيه: يتشال مهما كان شكله حلو.",
            "backend فيه auth وأدوار ودفع واختبارات: بيثبت حاجة مختلفة عن مشروع العيادة."
          ],
          sol: R`النتيجة الصح: ٢ أو ٣ مشاريع «YES» مختلفين عن بعض، ولكل «maybe» سطر فيه حاجة واحدة محددة («اختبارات للـ API بتاع الطقس، يومين»)، مش «أحسّنه».

لو طلعلك صفر YES، دي نتيجة مفيدة مش فشل: معناها إن أول خطوة في الكارير مشروع واحد جديد تقفله صح، مش CV. اختار واحد من «تاب المشاريع» أو مشكلة حقيقية لحد تعرفه.

الغلط الشائع: كل المشاريع طالعة YES. ارجع لعمود «Real user?» وعمود «Explain every line?» وكن صادق: لو مش هتقدر تشرح الـ auth بتاعه في الانترفيو، مش YES.`
        },
        {
          cmd: "README بيبيع",
          title: "الـ README اللي بيبيع المشروع فيه إيه؟",
          desc: R`الـ README هو صفحة المشروع. اللي بيفرز بيفتح الـ repo ويقرا أول ١٠ سطور، ولو مفهمش المشروع بيعمل إيه ومشافوش شغال، بيقفل. فالترتيب مهم: جملة واحدة المشروع بيعمل إيه ولمين، وبعدها على طول live link (ولو فيه login، حساب demo)، وصورة أو GIF قصير للـ flow الأساسي.

بعد كده الحاجات اللي بتفرّق مهندس عن منفّذ: الـ features مكتوبة كحاجات اليوزر يقدر يعملها، والأدوات ومعاها سبب اختيار كل واحدة، والقرارات والـ trade-offs (أصعب مشكلة واتحلت إزاي)، وإزاي أشغّله عندي بأوامر أنسخها، والاختبارات، والحاجات الناقصة اللي انت عارفها. الأخيرة دي بتبيّن إنك فاهم مشروعك مش بتخبّي.

نفس الفكرة في درس «README بالافتراضات» في «تاب الانترفيو» للـ take-home، بس هنا القارئ مستعجل أكتر، فالصورة والـ live link فوق.`,
          example: R`# Project name
One sentence: what it does and for whom.
**Live:** https://your-app.example.com · **Demo login:** demo@example.com / demo1234
![Main flow](docs/demo.gif)
## Features
- 3 to 5 bullets, each one something the user can do
## Tech and why
- Each tool with one reason you chose it
## Decisions and trade-offs
- The hardest problem and how you solved it
## Run locally
$__bt$__bt$__bt bash
cp .env.example .env && docker compose up -d db && npm ci && npm run dev
$__bt$__bt$__bt
## Tests
- npm test (and what is covered)
## Limitations and next steps
- What you know is missing, honestly`,
          try: R`اكتب README لأقوى مشروع عندك بالشكل ده، واعمل GIF للـ flow الأساسي (أي أداة screen recording، أقل من ١٥ ثانية). وبعدين ادّي الـ repo لحد مايعرفوش، واديله دقيقة واحدة: لازم يقولك المشروع بيعمل إيه، ويفتح الـ live link. وبعدين خليه يشغّله عنده من الـ README بس من غير ما تساعده.`,
          flag: "script",
          deep: {
            why: "الـ README بيشتغل وانت مش موجود. محدش هيفتح الكود عشان يعرف المشروع بيعمل إيه، وقليلين هيشغّلوه. الصورة والـ live link بيخلّوا حد يشوف شغلك في ١٠ ثواني، وجزء القرارات هو اللي بيطلّع أسئلة الانترفيو اللي انت جاهز لها أصلًا.",
            how: R`الجملة الأولى: فعل ومستخدم ومشكلة. «Online booking for a small clinic» أحسن من «A MERN stack web application». الـ stack مكانه تحت.

الـ GIF: ٥ لـ ١٥ ثانية للـ flow الأهم بس، وحطه في فولدر [[docs/]] في الـ repo عشان ميضيعش. ولو حجمه كبير، صورتين screenshots كفاية.

الـ demo login: حساب بصلاحيات محدودة وداتا وهمية، واعمل له reset دوري لو الناس ممكن تبوّظ الداتا. ومتحطش أبدًا باسورد حقيقي أو مفتاح API في الـ README.

«Run locally»: أوامر تتنسخ وتشتغل، وملف [[.env.example]] فيه كل المتغيرات بقيم وهمية. جرّبها بنفسك في فولدر جديد بعد [[git clone]]، لأن الغلطة الأشهر إن حاجة شغالة عندك بس بسبب ملف مش في الـ repo.

الـ Limitations: سطرين صادقين («Arabic UI only»، «No online payments yet») بيدّوا انطباع أحسن من إنك تدّعي إنه كامل، وبيدّوا الإنترفيوير سؤال سهل: «لو هتعمل الدفع، هتعمله إزاي؟».`,
            when: "لكل مشروع في الـ pins. وحدّثه مع كل ميزة كبيرة، وكل ما الـ live link يتغير.",
            mistakes: R`README الـ template الافتراضي بتاع create-react-app أو Next.js زي ما هو. live link بايظ. صور من نسخة قديمة. «Run locally» ناقص خطوة الداتابيز. قايمة ٢٠ technology من غير ولا سبب. و README طويل جدًا بيشرح الكود سطر سطر: ده مكانه تعليقات أو docs، مش أول صفحة.`
          },
          teach: R`## الترتيب هو الرسالة

القارئ مستعجل وبيقرا أول ١٠ سطور. فكل حتة في الـ template مكانها مقصود. نفكها من فوق لتحت:

~~~text
# Project name
One sentence: what it does and for whom.
~~~

[[#]] في Markdown عنوان كبير. والجملة اللي تحته أهم سطر: **فعل ومستخدم ومشكلة**. قارن:

| ضعيف | قوي |
|---|---|
| A MERN stack web application | Online booking for a small clinic |

~~~text
**Live:** https://your-app.example.com · **Demo login:** demo@example.com / demo1234
~~~

[[**...**]] تقيل. اللينك وحساب demo فوق، عشان يشوفه شغال في ١٠ ثواني. والحساب ده بصلاحيات محدودة وداتا وهمية، ومتحطش هنا أبدًا باسورد حقيقي.

~~~text
![Main flow](docs/demo.gif)
~~~

[[![نص](مسار)]] صورة في Markdown. النص اللي بين [[[ ]]] بيظهر لو الصورة محمّلتش ولقارئ الشاشة. والـ GIF جوه فولدر [[docs/]] في نفس الـ repo عشان ميضيعش.

---

## الأقسام اللي تحت

| القسم | بيكتب فيه إيه | ليه |
|---|---|---|
| [[## Features]] | ٣ لـ ٥ حاجات اليوزر يقدر يعملها | اليوزر مش المكتبات |
| [[## Tech and why]] | كل أداة وسببها | بيطلّع أسئلة انت جاهز لها |
| [[## Decisions and trade-offs]] | أصعب مشكلة واتحلت إزاي | ده اللي بيفرّق مهندس عن منفّذ |
| [[## Run locally]] | أوامر تتنسخ وتشتغل | حد يشغّله من غير ما يسألك |
| [[## Tests]] | إزاي تشغّلها وبتغطي إيه | دليل جودة |
| [[## Limitations and next steps]] | الناقص بصراحة | بيبيّن إنك فاهم مشروعك |

---

## صندوق الأوامر

~~~bash
cp .env.example .env && docker compose up -d db && npm ci && npm run dev
~~~

- [[cp .env.example .env]]: انسخ ملف المتغيرات الوهمي لملف حقيقي.
- [[docker compose up -d db]]: شغّل الداتابيز بس في الخلفية ([[-d]] = detached).
- [[npm ci]]: سطّب نفس النسخ اللي في [[package-lock.json]] بالظبط.
- [[npm run dev]]: شغّل المشروع.
- [[&&]]: «لو اللي قبلي نجح، كمّل». لو خطوة فشلت السلسلة تقف.

الأوامر دي template، والمهم إنك تجرّب الأوامر الحقيقية بتاعتك في فولدر جديد بعد [[git clone]]، لأن أشهر غلطة حاجة شغالة عندك بس.

---

## الخلاصة

- الجملة الأولى: مين بيستخدمه ولإيه، والـ stack تحت.
- live link وصورة فوق.
- القرارات والحدود بصراحة: دول أقوى من أي قايمة features.`,
          lines: [
            "جملة واحدة: بيعمل إيه ولمين. ده أهم سطر.",
            "الـ live link وحساب demo بصلاحيات محدودة وداتا وهمية.",
            "GIF قصير للـ flow الأساسي، محفوظ في الـ repo.",
            "الـ features كحاجات اليوزر يعملها، مش أسماء مكتبات.",
            "كل أداة ومعاها سبب: ده اللي بيطلّع أسئلة الانترفيو.",
            "أصعب مشكلة والحل: الجزء اللي بيفرّق مهندس عن منفّذ.",
            "بداية الـ code block.",
            "كل الأوامر من أول clone لحد ما يشتغل، ومجرّبة في فولدر جديد.",
            "نهاية الـ code block.",
            "إزاي تشغّل الاختبارات وبتغطي إيه.",
            "الناقص بصراحة: بيبيّن إنك فاهم مشروعك."
          ],
          sol: R`الـ README نجح لو الشخص في الدقيقة الأولى قال المشروع بيعمل إيه بكلامه هو، وفتح الـ live link. لو قال «ده موقع React» بس، يبقى الجملة الأولى محتاجة تتكتب تاني بمستخدم ومشكلة.

وفي التشغيل من الـ README، غالبًا هيقف في خطوة: متغير ناقص في [[.env.example]]، أو migration مش مكتوبة، أو نسخة Node مختلفة. كل وقفة هي سطر ناقص في الـ README، زوّده. ولو خلّص من غير ما يسألك، الـ README تمام.

تحت مثال مكتوب كامل لمشروع العيادة. الغلط الشائع: الـ Limitations فاضية، أو مكتوب فيها «more features».`,
          solCode: R`# Clinic Booking
Online booking for a small clinic: patients pick a free slot, the doctor sees the day's list.

**Live:** https://clinic-demo.example.com · **Demo login:** demo@example.com / demo1234

![Booking a slot](docs/booking.gif)

## Features
- Book, cancel and reschedule without calling the clinic
- No double booking, even when two patients click the same slot at the same second
- Doctor dashboard with today's appointments
- SMS reminder the evening before

## Tech and why
- Next.js + TypeScript: one codebase for pages and API, types shared end to end
- PostgreSQL + Prisma: relational data, and a unique constraint does the hard part
- Docker, Nginx and GitHub Actions on a small VPS: every push to main is tested and deployed

## Decisions and trade-offs
- Double booking is prevented by a unique index on (doctor_id, starts_at), not by checking first in code: a check-then-insert races under load.
- Reminders run in a background job, so a slow SMS provider never slows down booking.
- Slots are generated from working hours per day instead of stored for months ahead: less data, and changing hours is one setting.

## Run locally
$__bt$__bt$__bt bash
cp .env.example .env
docker compose up -d db
npm ci && npx prisma migrate dev && npm run seed && npm run dev
$__bt$__bt$__bt

## Tests
- npm test: 48 unit and integration tests, including two concurrent bookings for the same slot
- Run in GitHub Actions on every pull request

## Limitations and next steps
- Arabic UI only
- No online payment yet; patients pay at the clinic
- One clinic per deployment`
        },
        {
          cmd: "GitHub profile",
          title: "بروفايل GitHub: الـ profile README والـ pinned repos",
          desc: R`لما حد يدوس على لينك GitHub اللي في الـ CV بيشوف ٣ حاجات: الصورة والاسم والـ bio، وبعدين الـ profile README لو موجود، وبعدين الـ pinned repos. دي الـ ٥ ثواني بتوعك.

الـ profile README: repo عام اسمه نفس الـ username بتاعك بالظبط، وفيه [[README.md]]. GitHub بيعرضه فوق البروفايل أوتوماتيك. اكتب فيه مين انت في سطرين، و ٢ أو ٣ مشاريع بلينكات، وازاي يكلموك. من غير عداد زيارات ولا ٤٠ badge.

الـ pins: GitHub بيسمح بـ ٦ repos متثبّتة (Customize your pins). حط المشاريع اللي اخترتها في الدرس اللي فات بس، ولكل repo: description بجملة، ولينك الـ live في خانة الـ website، و topics. والـ repos القديمة اللي مش عايزها تبان: اعملها archive أو private. وخانة الـ contributions الخضرا متقلقش منها: محدش بيتعين بسببها.`,
          example: R`gh auth status
gh repo create YOUR_USERNAME --public --add-readme --clone -d "About me"
gh repo edit YOUR_USERNAME/clinic-booking -d "Online clinic booking with no double booking" -h https://clinic-demo.example.com --add-topic nextjs --add-topic postgresql
gh repo list --source --limit 100 --json name,description,homepageUrl --jq '.[] | select(.description == "" or .homepageUrl == "") | .name'
gh repo archive YOUR_USERNAME/old-tutorial-clone`,
          try: R`اعمل الـ profile README (غيّر [[YOUR_USERNAME]] باسمك)، واكتب فيه ٦ سطور بالكتير. وبعدين شغّل أمر [[gh repo list]] وصلّح كل repo من المشاريع المختارة طلع في النتيجة. وثبّت الـ pins من صفحة البروفايل. وفي الآخر افتح بروفايلك من متصفح private وبص عليه ٥ ثواني كأنك recruiter.`,
          deep: {
            why: "الـ CV بيقول انت عملت إيه، و GitHub المفروض يثبت ده. بروفايل فيه ٣٠ repo اسمهم test1 و my-app و untitled بيخلّي المشاريع القوية تضيع، واللي بيفرز مش هيدوّر.",
            how: R`[[gh auth status]] بيتأكد إنك مسجل دخول (لو لأ: [[gh auth login]]). و [[gh repo create]] باسم الـ username بيعمل الـ repo الخاص بالبروفايل، و [[--clone]] بينزّله عندك تعدّل الـ README وتعمل push.

[[gh repo edit]] بيظبط الـ description والـ homepage والـ topics من غير ما تفتح الإعدادات. والـ topics بتظهر كـ tags وبتخلّي الـ repo يطلع في البحث بالـ technology.

[[gh repo list --source]] بيجيب الـ repos بتاعتك من غير الـ forks، و [[--json]] مع [[--jq]] بيفلتر الناقصين. والـ archive بيخلّي الـ repo read-only وعليه علامة إنه قديم، من غير ما تمسحه.

الـ pins نفسها من الموقع: صفحة البروفايل، ثم «Customize your pins». وتقدر تثبّت repos من organizations انت مساهم فيها، ودي حاجة قوية لو ساهمت في open source.`,
            when: "مرة واحدة دلوقتي، وبعدين كل ما تخلّص مشروع يستاهل pin. وقبل ما تقدّم على أي وظيفة، افتح البروفايل كأنك غريب.",
            mistakes: R`صورة كرتون أو مفيش اسم حقيقي. الـ profile README مليان badges وإحصائيات ومفيهوش جملة مفيدة. pins لـ forks معملتش فيها حاجة. repos فيها [[.env]] أو مفاتيح API (راجع درس «commit history»). ومسح repos قديمة فيها تاريخ مهم بدل ما تعملها archive.`
          },
          teach: R`## ٥ أوامر، كل واحد بيصلّح حاجة في البروفايل

[[gh]] هو GitHub CLI: بيكلّم GitHub من الترمنال بدل الموقع. اتأكدت من الـ flags من [[gh --help]] بنسخة 2.97. الأوامر اللي بتغيّر في حسابك (create و edit و archive) متشغّلتش هنا عشان متعدّلش حساب حقيقي، وشكلها من الـ manual الرسمي.

---

## ١. [[gh auth status]]

بيقولك انت داخل بأنهي حساب. شغّلته:

~~~text الناتج (الحساب متخبّي)
github.com
  ✓ Logged in to github.com account XXX (keyring)
  - Active account: true
  - Git operations protocol: https
  - Token: gho_****
  - Token scopes: 'gist', 'read:org', 'repo', 'workflow'
~~~

- [[keyring]]: التوكن محفوظ في خزنة الباسوردات بتاعة النظام.
- [[Token scopes]]: الصلاحيات. [[repo]] لازمة عشان تعمل وتعدّل repos.

لو مش داخل، [[gh auth login]].

---

## ٢. repo البروفايل

~~~bash
gh repo create YOUR_USERNAME --public --add-readme --clone -d "About me"
~~~

| الحتة | معناها |
|---|---|
| [[YOUR_USERNAME]] | اسم الـ repo لازم يبقى **نفس** الـ username بالظبط، ده اللي بيخلّي GitHub يعرضه فوق البروفايل |
| [[--public]] | عام، وإلا مش هيظهر |
| [[--add-readme]] | يعمل [[README.md]] فيه |
| [[--clone]] | ينزّله عندك في الفولدر الحالي |
| [[-d "About me"]] | الـ description ([[-d]] = description) |

---

## ٣. تظبيط مشروع

~~~bash
gh repo edit YOUR_USERNAME/clinic-booking -d "..." -h https://clinic-demo.example.com --add-topic nextjs --add-topic postgresql
~~~

- [[OWNER/REPO]]: صاحب الـ repo واسمه.
- [[-h]] هنا **مش** help: في [[gh repo edit]] هو اختصار [[--homepage]]، اللينك اللي بيظهر جنب الـ description.
- [[--add-topic]] بيتكرر لكل topic. الـ topics بتظهر كـ tags وبيتدوّر بيها.

---

## ٤. مين ناقصه حاجة

~~~bash
gh repo list --source --limit 100 --json name,description,homepageUrl --jq '.[] | select(.description == "" or .homepageUrl == "") | .name'
~~~

| الحتة | بتعمل إيه |
|---|---|
| [[--source]] | الـ repos بتاعتك بس، من غير الـ forks |
| [[--limit 100]] | لحد ١٠٠ (الافتراضي ٣٠ بس) |
| [[--json name,description,homepageUrl]] | رجّع الحقول دي كـ JSON |
| [[--jq '...']] | فلتر على الـ JSON ده |

والـ jq من جوه:

- [[.[]]]: لف على كل عنصر في المصفوفة.
- [[select(... or ...)]]: سيب بس اللي الـ description فاضي **أو** اللينك فاضي.
- [[.name]]: اطبع الاسم بس.

جرّبته على organization عامة ([[gh repo list cli ...]] بـ [[--limit 30]]) عشان أشوف الفلتر شغال:

~~~text الناتج (أول ٤)
gh-webhook
gh-extension-precompile
safeexec
scoop-gh
~~~

على حسابك هيطلّع الـ repos اللي محتاجة تتصلّح.

---

## ٥. archive

~~~bash
gh repo archive YOUR_USERNAME/old-tutorial-clone
~~~

بيخلّي الـ repo read-only وعليه علامة «Archived»، من غير ما يتمسح. وهيسألك تأكيد (y/N) قبل ما ينفّذ، و [[-y]] بيعدّي السؤال.

---

## الخلاصة

| الأمر | بيصلّح إيه |
|---|---|
| [[gh auth status]] | تتأكد من الحساب |
| [[gh repo create USERNAME]] | الـ profile README |
| [[gh repo edit]] | description ولينك و topics |
| [[gh repo list ... --jq]] | يلاقي الناقص |
| [[gh repo archive]] | يخبّي القديم من غير مسح |

والـ pins نفسها من الموقع بس: صفحة البروفايل، ثم «Customize your pins».`,
          lines: [
            "اتأكد إن gh مسجل دخول بحسابك.",
            "اعمل repo البروفايل: نفس اسم الـ username، عام، فيه README، وانزله عندك.",
            "ظبّط description ولينك live و topics لمشروع من المختارين.",
            "هات الـ repos بتاعتك (من غير forks) اللي ناقصها description أو لينك.",
            "اعمل archive لـ repo قديم: يفضل موجود بس واضح إنه مش شغال عليه."
          ],
          sol: R`بعد الـ push، افتح [[github.com/YOUR_USERNAME]]: المفروض الـ README يظهر فوق البروفايل في مربع لوحده. لو مظهرش، غالبًا الـ repo اسمه مختلف عن الـ username في حرف أو كابيتال، أو الـ repo private.

أمر [[gh repo list]] المفروض مايطلعش ولا واحد من المشاريع المختارة بعد ما تصلّحهم. لو طلّع repos قديمة كتير، دي مرشّحة للـ archive.

وفي نظرة الـ ٥ ثواني، المفروض تعرف: انت مين، وبتعمل إيه، وأقوى مشروع فين. تحت مثال للـ profile README. الغلط الشائع: README طويل بيحكي قصتك من الأول، أو فاضي غير «Hi there 👋».`,
          solCode: R`## Hi, I'm Mona 👋
Junior full-stack developer in Cairo. I build web apps that small businesses actually use.

- **Clinic Booking**: online booking for a real clinic, no double booking · [live](https://clinic-demo.example.com) · [code](https://github.com/mona/clinic-booking)
- **Shop API**: REST API with auth, roles and payment webhooks · [docs](https://shop-api.example.com/docs) · [code](https://github.com/mona/shop-api)

Stack: TypeScript, React, Next.js, Node.js, PostgreSQL, Docker
Reach me: mona@example.com · [LinkedIn](https://www.linkedin.com/in/mona-example) · [Portfolio](https://mona.example.com)`
        },
        {
          cmd: "commit history",
          title: "تاريخ commits شكله احترافي: إيه اللي بيبان منه؟",
          desc: R`ناس كتير بتفتح الـ commits مش الكود. وبيبان منها حاجات: commit واحد اسمه «initial commit» فيه المشروع كله بيوحي إنه منسوخ. ورسايل زي «fix» و «asd» و «final final 2» بتقول إنك مش متعود تشتغل في فريق. وملف [[.env]] أو [[node_modules]] جوه الـ repo بيقول إنك مش عارف أساسيات.

القواعد بسيطة: commit لكل خطوة منطقية واحدة، ورسالة بصيغة الأمر بتقول إيه اللي اتغير (و Conventional Commits زي [[feat:]] و [[fix:]] لو حابب)، و [[.gitignore]] من أول يوم. ونضّف تاريخك المحلي قبل الـ push (زي [[--amend]])، بس متعدّلش تاريخ اتعمله push وحد تاني بيشتغل عليه. التفاصيل في «تاب Git».`,
          example: R`git log --oneline -15
git log --stat -1
git add -p
git commit -m "feat(booking): prevent double booking with a unique index"
git commit --amend --no-edit
git log --all --oneline -- .env
git ls-files | grep -E "node_modules/|(^|/)\.env$"`,
          try: R`شغّل أول أمر وآخر أمرين على أقوى مشروع عندك. عدّ الرسايل اللي مبتقولش حاجة («fix»، «update»، «wip»). ولو الأمر السادس أو السابع طلّع أي حاجة، اعرف ليه وصلّحها. ومن النهارده، في المشروع الجاي، اكتب كل رسالة بحيث حد يفهم التغيير من السطر ده بس.`,
          deep: {
            why: "في الشغل الـ git log هو تاريخ المشروع، والناس بتدوّر فيه عشان تفهم «ليه السطر ده كده؟». اللي بيقرا تاريخك في الـ portfolio بيتخيّل إزاي هتشتغل في الـ repo بتاعه. والـ secrets المتسربة مش شكل بس: bots بتدوّر على مفاتيح في repos عامة باستمرار.",
            how: R`[[git log --oneline]] بيوريك الرسايل بس، وده اللي الناس بتشوفه. [[--stat -1]] بيوريك آخر commit لمس أنهي ملفات: لو commit اسمه «fix typo» ولمس ١٥ ملف، الرسالة كدابة.

[[git add -p]] بيعرض كل تغيير لوحده وتختار (y أو n)، فتقسّم شغل ساعتين لكذا commit منطقي بدل commit واحد فيه كل حاجة.

[[--amend --no-edit]] بيضيف اللي عملته [[add]] للـ commit الأخير من غير ما يغيّر رسالته: مثالي لـ «نسيت ملف». بس بيغيّر الـ hash، فمتستخدمهوش على commit اتعمله push لـ branch مشترك.

[[git log --all -- .env]] بيدوّر في كل التاريخ، حتى لو الملف اتمسح بعدين. لو طلّع commits، المفاتيح اللي فيه اعتبرها اتسربت: الغيها واعمل غيرها من لوحة الخدمة. مسحها من التاريخ خطوة تانية مش بديل. و [[git ls-files]] بيوريك الملفات المتتبّعة دلوقتي.`,
            when: "كل commit. والتنضيف (amend، أو rebase تفاعلي) قبل الـ push بس. وفي الشغل، الفريق غالبًا بيعمل squash merge، فعنوان الـ PR بيبقى هو الرسالة على main.",
            mistakes: R`تعمل [[git add .]] كل مرة فيدخل كل حاجة. تكتب الرسالة عن اللي انت عملته («worked on stuff») بدل اللي اتغير. تعمل force push على main عشان تنضّف. تمسح [[.env]] من الكود وتفتكر إن المشكلة اتحلت وهو لسه في التاريخ. وتعمل commits مزيفة عشان المربعات الخضرا: أي حد بيبص بجد بيلاحظ.`
          },
          teach: R`## ٧ أوامر: ٤ بيقروا التاريخ، و ٣ بيكتبوه صح

جرّبتهم كلهم في repo تجريبي على ويندوز (Git 2.56) فيه ٤ commits، منهم واحد اسمه [[wip]] ضاف [[.env]] بالغلط وواحد مسحه.

---

## ١. [[git log --oneline -15]]

[[--oneline]]: كل commit في سطر (أول ٧ حروف من الـ hash والرسالة)، و [[-15]]: آخر ١٥ بس.

~~~text الناتج
eeaf2bd feat(booking): prevent double booking with a unique index
ff4323d remove env
cbd9a6a wip
bae846c chore: add gitignore and schema
~~~

ده بالظبط اللي الناس بتشوفه. [[wip]] (work in progress) مبتقولش حاجة.

---

## ٢. [[git log --stat -1]]

[[--stat]]: الملفات اللي اتلمست وكام سطر، و [[-1]]: آخر commit بس.

~~~text الناتج
    feat(booking): prevent double booking with a unique index

 README.md  | 1 +
 api.js     | 1 +
 schema.sql | 2 +-
 3 files changed, 3 insertions(+), 1 deletion(-)
~~~

[[+]] سطر اتزاد و [[-]] سطر اتشال. لو الرسالة «fix typo» والـ stat فيه ١٥ ملف، الرسالة كدابة.

---

## ٣. [[git add -p]]

[[-p]] = patch: بيعرض كل تغيير (hunk) لوحده ويسألك:

~~~text الناتج
@@ -1 +1 @@
-create table bookings (id int);
+create table bookings (id int, doctor_id int, starts_at timestamptz);
(1/1) Stage this hunk [y,n,q,a,d,e,p,P,?]?
~~~

[[y]] ضيفه، و [[n]] سيبه، و [[q]] اخرج، و [[?]] يشرح الباقي. كده تقسّم شغل ساعتين لكذا commit.

---

## ٤. الرسالة

~~~bash
git commit -m "feat(booking): prevent double booking with a unique index"
~~~

| الحتة | معناها |
|---|---|
| [[feat]] | النوع: ميزة جديدة. ([[fix]] تصليح، و [[chore]] حاجة جانبية) |
| [[(booking)]] | الـ scope: الجزء اللي اتغير |
| [[prevent ...]] | فعل أمر بحروف صغيرة: «اعمل كذا»، مش «I did» |
| [[with a unique index]] | إزاي، في كلمتين |

---

## ٥. [[git commit --amend --no-edit]]

نسيت [[README.md]]؟ اعمله [[add]] وبعدين الأمر ده: بيدخله في آخر commit، و [[--no-edit]] يعني من غير ما يفتح الرسالة. الـ hash اتغيّر عندي من [[5abe03f]] لـ [[eeaf2bd]]، وعشان كده ممنوع على commit اتعمله push لـ branch مشترك.

---

## ٦. [[git log --all --oneline -- .env]]

[[--all]] كل الـ branches، و [[--]] معناها «اللي بعدي مسار ملف مش اسم branch».

~~~text الناتج
ff4323d remove env
cbd9a6a wip
~~~

الملف اتمسح، بس لسه في التاريخ: أي حد يعمل checkout لـ [[cbd9a6a]] يشوفه. فالمفاتيح اللي كانت فيه اعتبرها اتسربت وغيّرها.

---

## ٧. [[git ls-files | grep -E "node_modules/|(^|/)\.env$"]]

[[git ls-files]] الملفات المتتبّعة **دلوقتي**، و [[grep -E]] بيدوّر بـ regex: [[node_modules/]] أو [[.env]] في أول المسار أو بعد [[/]] وفي آخر السطر ([[$]]). و [[\.]] نقطة حقيقية.

في الـ repo التجريبي مطلعش ولا سطر (و grep رجّع exit code 1 يعني «ملقتش»)، وده المطلوب.

---

## الخلاصة

| الأمر | السؤال |
|---|---|
| [[log --oneline]] | الرسايل بتقول حاجة؟ |
| [[log --stat -1]] | الرسالة على قد التغيير؟ |
| [[add -p]] | كل commit حاجة واحدة |
| [[commit --amend]] | تصليح آخر commit قبل الـ push بس |
| [[log --all -- .env]] | سر اتسرب في أي وقت؟ |
| [[ls-files]] | حاجة متتبّعة مكانهاش هنا؟ |`,
          lines: [
            "آخر ١٥ رسالة: ده اللي الناس بتشوفه في دقيقة.",
            "آخر commit لمس أنهي ملفات وبكام سطر.",
            "اختار التغييرات جزء جزء، عشان كل commit يبقى حاجة واحدة.",
            "رسالة بتقول إيه اللي اتغير، بصيغة Conventional Commits.",
            "ضيف اللي نسيته للـ commit الأخير من غير ما تغيّر رسالته (قبل الـ push بس).",
            "هل .env اتعمله commit في أي وقت، حتى لو اتمسح بعدين؟",
            "هل فيه node_modules أو .env متتبّعين دلوقتي؟ المفروض ميطلعش حاجة."
          ],
          sol: R`في مشروع نضيف: الأمرين الأخيرين ميطلعوش ولا سطر. لو [[git ls-files]] طلّع [[node_modules/]]، زوّده في [[.gitignore]] وشغّل [[git rm -r --cached node_modules]] واعمل commit. ولو [[.env]] ظهر في التاريخ، أول خطوة تغيير كل مفتاح فيه، مش مسح الملف.

وفي الرسايل، أغلب الناس بتلاقي نص رسايلها أو أكتر مبتقولش حاجة، وده عادي في المشاريع الشخصية. التاريخ القديم سيبه (إعادة كتابته مخاطرة ومش فارقة كتير)، والمهم الـ commits الجديدة تبقى زي «fix(auth): keep users logged in after token refresh».

الغلط الشائع: تحاول تعمل rebase لكل تاريخ المشروع عشان يبان حلو، وتبوّظ حاجة. اللي يفرق فعلًا: آخر ٣٠ commit شكلهم كويس، ومفيش secrets.`
        },
        {
          cmd: "portfolio site",
          title: "موقع portfolio بسيط: محتاج إيه بالظبط؟",
          desc: R`صفحة واحدة كفاية: اسمك وبتعمل إيه في جملة، و ٢ أو ٣ كروت للمشاريع (صورة، وجملة، والـ stack، ولينك Live ولينك Code)، ونبذة قصيرة، وإزاي يكلموك (إيميل، و LinkedIn، و GitHub)، ولينك للـ CV كـ PDF. سريعة، وشغالة على الموبايل، والصور ليها [[alt]]، والـ title والـ description مكتوبين عشان اللينك يبان كويس لما يتبعت.

الاستضافة ببلاش في أماكن كتير (GitHub Pages، و Vercel، و Netlify، و Cloudflare Pages، والشروط بتتغير فاتأكد). ودومين باسمك اختياري ورخيص نسبيًا، وبيبان احترافي في الـ CV. والأهم: متقضيش شهرين في animations. الموقع مش هو الـ portfolio، المشاريع هي. الموقع مجرد لافتة بتشاور عليها. ولو معندكش وقت، الـ GitHub profile README كفاية في الأول.`,
          example: R`<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mona Adel · Full-stack Developer</title>
<meta name="description" content="Junior full-stack developer in Cairo: React, Node.js, PostgreSQL. Projects, CV and contact."></head>
<body>
<header><h1>Mona Adel</h1><p>Junior full-stack developer. I build web apps that small businesses actually use.</p></header>
<main>
<article>
<img src="clinic.webp" alt="Clinic booking: a patient picking a free slot" width="640" height="360" loading="lazy">
<h2>Clinic Booking</h2><p>Online booking for a real clinic, with no double booking. Next.js, PostgreSQL, Docker.</p>
<a href="https://clinic-demo.example.com">Live</a> · <a href="https://github.com/mona/clinic-booking">Code</a>
</article>
</main>
<footer><a href="mailto:mona@example.com">mona@example.com</a> · <a href="https://www.linkedin.com/in/mona-example">LinkedIn</a> · <a href="cv.pdf">CV (PDF)</a></footer>
</body>
</html>`,
          try: R`اعمل الصفحة دي لنفسك بمشاريعك (زوّد CSS بسيط من «تاب HTML و CSS»)، وارفعها على GitHub Pages أو أي استضافة static. وبعدين افتحها على الموبايل، وشغّل Lighthouse من DevTools، وابعت اللينك لنفسك على WhatsApp وشوف الـ preview.`,
          flag: "script",
          deep: {
            why: "لينك واحد في الـ CV وفي LinkedIn بيودّي لكل حاجة: المشاريع شغالة، والكود، والـ CV، وإزاي تكلمك. وكمان هو نفسه مشروع frontend صغير: لو بطيء أو بايظ على الموبايل، ده بيقول حاجة عن شغلك.",
            how: R`الـ HTML من غير framework كفاية جدًا لصفحة زي دي، وأسرع حاجة ممكنة. ولو عايز تستخدم Next.js أو Astro عشان تتعلم، تمام، بس النتيجة لازم تبقى static وسريعة.

[[width]] و [[height]] على الصورة بيمنعوا الصفحة تتنطط وهي بتحمّل (CLS)، و [[loading="lazy"]] للصور اللي تحت. وصيغة [[webp]] أو [[avif]] وحجم مناسب، مش صورة ٤MB.

الـ [[title]] والـ [[description]] هما اللي بيظهروا في Google وفي الـ preview. ولو عايز صورة في الـ preview لما اللينك يتبعت، زوّد وسوم Open Graph ([[og:title]] و [[og:image]]).

GitHub Pages: repo فيه [[index.html]]، ومن Settings ثم Pages اختار الـ branch. وبيبقى على [[username.github.io]]، أو دومينك لو ربطته.`,
            when: "بعد ما يبقى عندك مشروعين يستاهلوا على الأقل. قبل كده، وقتك في المشاريع أنفع.",
            mistakes: R`موقع فيه loader بياخد ٣ ثواني، أو animations بتتقل الموبايل. أقسام «Skills» فيها progress bars (React 85%). لينكات مشاريع بايظة. مفيش إيميل واضح. تصميم منسوخ من template مشهور زي ما هو. وتأجيل التقديم على الشغل لحد ما الموقع «يخلص».`
          },
          teach: R`## صفحة HTML واحدة، كل وسم ليه سبب

مش محتاج framework. نفك الصفحة من فوق لتحت.

---

## الـ head: اللي بيظهر برا الصفحة

~~~html
<!doctype html>
<html lang="en">
~~~

[[doctype]] بيقول للمتصفح «HTML حديث». و [[lang="en"]] لغة الصفحة: قارئ الشاشة بينطق صح، والمتصفح يعرض ترجمة لو اللغة مختلفة.

~~~html
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
~~~

[[charset]] الترميز عشان الحروف متطلعش رموز غريبة. و [[viewport]] أهم سطر للموبايل: من غيره الموبايل بيعرض الصفحة كأنها شاشة كمبيوتر مصغّرة.

~~~html
<title>Mona Adel · Full-stack Developer</title>
<meta name="description" content="...">
~~~

الـ [[title]] اسم التاب وعنوان نتيجة Google والـ preview. والـ [[description]] السطر اللي تحته في نتايج البحث.

---

## الـ body: المحتوى

| الوسم | دوره |
|---|---|
| [[header]] و [[h1]] | اسمك، وجملة بتعمل إيه ولمين |
| [[main]] | المحتوى الأساسي، وقارئ الشاشة يقدر يقفز له |
| [[article]] | كارت مشروع واحد قايم بذاته |
| [[h2]] | اسم المشروع |
| [[footer]] | التواصل |

---

## سطر الصورة

~~~html
<img src="clinic.webp" alt="Clinic booking: a patient picking a free slot" width="640" height="360" loading="lazy">
~~~

- [[webp]] صيغة أصغر بكتير من PNG لنفس الشكل.
- [[alt]] وصف الصورة لقارئ الشاشة ولو الصورة محمّلتش. بيوصف اللي فيها، مش «image».
- [[width]] و [[height]]: المتصفح يحجز المكان قبل ما الصورة تيجي، فالصفحة متتنططش (ده اسمه CLS).
- [[loading="lazy"]]: متحمّلهاش غير لما اليوزر يقرّب منها.

---

## اللينكات

~~~html
<a href="mailto:mona@example.com">mona@example.com</a> · <a href="cv.pdf">CV (PDF)</a>
~~~

[[mailto:]] بيفتح برنامج الإيميل على طول. و [[cv.pdf]] مسار نسبي: الملف جنب [[index.html]] في نفس الفولدر. وخلي بالك إن GitHub Pages بيفرّق بين [[CV.pdf]] و [[cv.pdf]].

---

## الخلاصة

- [[viewport]] و [[title]] و [[description]] و [[alt]]: الأربعة دول ميتنسوش.
- الصور بمقاسات و [[lazy]] وصيغة خفيفة.
- الصفحة لافتة بتشاور على المشاريع، مش هي المشروع.`,
          lines: [
            "نوع المستند: HTML5.",
            "لغة الصفحة إنجليزي، عشان قارئ الشاشة والترجمة.",
            "الـ charset، والـ viewport عشان الموبايل.",
            "العنوان اللي بيظهر في التاب وفي Google.",
            "الوصف اللي بيظهر في نتايج البحث وأحيانًا في الـ preview.",
            "بداية المحتوى.",
            "اسمك وجملة بتقول بتعمل إيه ولمين.",
            "المحتوى الأساسي: المشاريع.",
            "كارت مشروع.",
            "صورة بـ alt بيوصفها، ومقاساتها، وتتحمّل لما تقرّب.",
            "اسم المشروع وجملة ومعاها الـ stack.",
            "لينك الـ live ولينك الكود.",
            "نهاية الكارت.",
            "نهاية المحتوى.",
            "التواصل: إيميل و LinkedIn والـ CV.",
            "نهاية الـ body.",
            "نهاية الصفحة."
          ],
          sol: R`المفروض تفتح الصفحة على الموبايل من غير scroll عرضي، وكل لينك يفتح حاجة شغالة. و Lighthouse على صفحة زي دي المفروض يدّي أرقام عالية (غالبًا ٩٠ أو أكتر) في Performance و Accessibility و SEO. لو Performance قليل، أول مشتبه فيه حجم الصور. ولو Accessibility قليل، غالبًا [[alt]] ناقص أو ألوان النص مش واضحة على الخلفية.

في WhatsApp، المفروض يظهر الـ title. لو مفيش صورة في الـ preview، ده متوقع من غير [[og:image]]، زوّدها لو حابب.

الغلط الشائع: الصفحة شغالة عندك بس صورها مش ظاهرة بعد الرفع، عشان المسار فيه حروف كابيتال مختلفة (GitHub Pages بيفرّق بينهم) أو مسار بيبدأ بـ [[/]] والموقع في sub-folder.`
        }
      ]
    },
    {
      t: "الـ CV",
      l: 1,
      n: "صفحة واحدة بالإنجليزي، و bullets بأثر مش مهام، وتتقري صح في الـ ATS، والفرق بين CV لشركة محلية وشركة برا",
      items: [
        {
          cmd: "CV صفحة واحدة",
          title: "CV مطوّر junior: صفحة واحدة فيها إيه وبأنهي ترتيب؟",
          desc: R`صفحة واحدة، بالإنجليزي (ده الطبيعي لوظايف البرمجة في مصر وبرا)، والأحدث فوق. أول قراية للـ CV غالبًا ثواني، فالمهم يتلاقى من غير تدوير.

الترتيب للـ junior: الـ header (الاسم، والمسمى اللي بتقدّم عليه، والمدينة، والإيميل، والتليفون، ولينكات LinkedIn و GitHub والـ portfolio). وبعدين Summary من سطرين (اختياري). وبعدين Skills متقسّمة (Languages، و Frontend، و Backend، و Tools) وفيها بس اللي تقدر تتسأل فيه. وبعدين Projects، وده أهم قسم للـ junior، ويبقى قبل Experience لو خبرتك مش في البرمجة. وبعدين Experience (تدريب، وفريلانس، وأي شغل حقيقي). وبعدين Education والكورسات المهمة (برنامج تدريب طويل، مش كل كورس أونلاين). وفي الآخر Languages.`,
          example: R`MONA ADEL
Junior Full-stack Developer · Cairo, Egypt · mona@example.com · +20 100 000 0000
linkedin.com/in/mona-example · github.com/mona · mona.example.com
SUMMARY: 2 lines. What you build, your main stack, what you want next
SKILLS: Languages · Frontend · Backend · Databases · Tools (only what you can be interviewed on)
PROJECTS: 2 or 3, each with a live link, the stack and 2 or 3 impact bullets
EXPERIENCE: internships, freelance, part-time; role, company, dates, 2 or 3 bullets each
EDUCATION: degree, university, year; long training programs; GPA only if it helps
LANGUAGES: Arabic (native), English (professional working)`,
          try: R`اكتب الـ CV بتاعك بالترتيب ده في Google Docs أو Word (مش Canva بتصميم معقّد)، وخليه صفحة واحدة. وبعدين اطبعه أو صدّره PDF، واديه لحد ١٠ ثواني بس، واسأله: «أنا بعمل إيه؟ وأقوى مشروع ليا إيه؟». لو مجاوبش الاتنين، الترتيب أو الكلام محتاج يتعدّل.`,
          flag: "script",
          deep: {
            why: "على الإعلان الواحد بييجي CVs كتير، واللي بيفرز بيعمل مسح سريع: المسمى، والـ stack، والمشاريع. لو الحاجات دي مستخبية في الصفحة التانية أو وسط فقرة، بيعدّي. والصفحة الواحدة للـ junior بتجبرك تختار أقوى حاجاتك بس.",
            how: R`الـ header: لينكات تشتغل كـ hyperlinks في الـ PDF، ومن غير عنوان الشارع (المدينة كفاية). والمسمى يطابق الوظيفة: لو بتقدّم Frontend، اكتب Frontend.

الـ Summary: سطرين محددين («Junior full-stack developer building booking and e-commerce apps with React, Node.js and PostgreSQL. Looking for a team with strong code review.»). مش «Hard-working, passionate».

الـ Projects: كل مشروع سطر عنوان (الاسم، والـ stack، ولينك)، وتحته ٢ أو ٣ bullets بأثر (الدرس الجاي).

الـ Experience: حتى الشغل مش البرمجة ممكن يتكتب لو فيه حاجة قريبة (دعم فني، أو data entry عملت له أتمتة). والتواريخ بنفس الشكل في كل حتة (Mar 2025 – Aug 2025).

الـ Education: الكلية والسنة. ولو خريج جديد، التعليم ممكن يطلع فوق شوية. وبرامج التدريب الطويلة المعروفة في السوق عندك اذكرها باسمها.

الملف: PDF، واسمه [[Mona-Adel-CV.pdf]] مش [[cv_final_v3.pdf]].`,
            when: "قبل أول تقديم، وبعدين نسخة معدّلة لكل نوع وظيفة (Frontend، و Backend، و Full-stack)، وتحديث كل ما تخلّص مشروع أو تبدأ شغل.",
            mistakes: R`CV صفحتين أو تلاتة لـ junior. عمودين وأيقونات وصورة ودواير مهارات. Skills فيها ٣٠ حاجة منهم ١٠ جرّبتهم مرة. المشاريع من غير لينكات. إيميل مش احترافي ([[koko_2003@...]]). أخطاء إملائية في الإنجليزي (شغّل spell check). وتبعت ملف Word بدل PDF فالتنسيق يبوظ عند اللي فاتحه.`
          },
          teach: R`## الـ CV ده ٩ سطور، كل سطر قسم

الترتيب نفسه هو النصيحة: الأهم للـ junior فوق. نفك كل قسم:

| القسم | فيه إيه | ليه هنا |
|---|---|---|
| [[MONA ADEL]] | الاسم | أكبر حاجة، أول حاجة |
| السطر التاني | المسمى، والمدينة، والإيميل، والتليفون | [[Junior Full-stack Developer]] يطابق الوظيفة اللي بتقدّم عليها |
| السطر التالت | LinkedIn و GitHub والـ portfolio | لينكات تشتغل في الـ PDF |
| [[SUMMARY]] | سطرين: بتبني إيه، بإيه، عايز إيه | اختياري، ومن غير «passionate» |
| [[SKILLS]] | متقسّمة: Languages و Frontend و Backend ... | اللي تقدر تتسأل فيه بس |
| [[PROJECTS]] | ٢–٣ مشاريع بلينك و bullets | **أهم قسم للـ junior** |
| [[EXPERIENCE]] | تدريب وفريلانس وأي شغل | بعد المشاريع لو خبرتك قليلة |
| [[EDUCATION]] | الكلية والسنة | الـ GPA بس لو بيساعد |
| [[LANGUAGES]] | مستوى صادق | الانترفيو هيختبره |

---

## كلمات في المثال

- **·** (نقطة في النص): فاصل بين المعلومات في سطر واحد بدل أعمدة.
- [[(only what you can be interviewed on)]]: القاعدة الذهبية للـ Skills. أي كلمة هنا سؤال محتمل.
- [[English (professional working)]]: مستوى من مقياس LinkedIn، معناه «أشتغل بيها يوميًا». أصدق من «fluent» لو مش fluent فعلًا.

---

## من مثال الحل: قسم Projects

~~~text
Clinic Booking · Next.js, TypeScript, PostgreSQL, Docker · clinic-demo.example.com
- Built online booking used by a real clinic (~40 appointments a week), replacing phone bookings.
~~~

سطر العنوان: الاسم، والـ stack، واللينك. وتحته bullet بفعل ماضي ([[Built]])، ورقم، وأثر. تفاصيل الـ bullets في الدرس الجاي.

---

## الخلاصة

- صفحة واحدة، عمود واحد، PDF، اسمه [[Mona-Adel-CV.pdf]].
- المسمى فوق يطابق الإعلان.
- المشاريع قبل الخبرة لو خبرتك مش في البرمجة.
- لو مش لاقي مكان: شيل أضعف bullet، متصغّرش الخط.`,
          lines: [
            "الاسم، أكبر حاجة في الصفحة.",
            "المسمى اللي بتقدّم عليه، والمدينة، والإيميل والتليفون.",
            "لينكات LinkedIn و GitHub والـ portfolio، تشتغل كـ hyperlinks.",
            "سطرين: بتعمل إيه، وبإيه، وعايز إيه.",
            "المهارات متقسّمة، واللي تقدر تتسأل فيه بس.",
            "المشاريع: أهم قسم للـ junior، ومعاها لينكات و bullets بأثر.",
            "الخبرة: أي شغل حقيقي، بنفس شكل التواريخ.",
            "التعليم وبرامج التدريب الطويلة.",
            "اللغات بمستوى صادق."
          ],
          sol: R`لو اللي قرا الـ CV قال في ١٠ ثواني «انت full-stack بـ React و Node، وعملت نظام حجز لعيادة»، الـ CV شغال. لو قال «انت خريج هندسة» بس، يبقى الـ Education واخد المساحة الأولى أو المشاريع مستخبية.

تحت مثال كامل لـ junior. لاحظ: مفيش كلمة «passionate»، وكل مشروع ليه لينك، والـ Skills قصيرة، والصفحة مش مليانة لآخرها.

الغلط الشائع: تحاول تملا الصفحة لآخر سطر بتصغير الخط لـ ٩. الأحسن تشيل أضعف bullet.`,
          solCode: R`MONA ADEL
Junior Full-stack Developer · Cairo, Egypt · mona@example.com · +20 100 000 0000
linkedin.com/in/mona-example · github.com/mona · mona.example.com

SUMMARY
Junior full-stack developer building booking and e-commerce apps with React, Node.js and PostgreSQL.
Looking for a product team with strong code review where I can own features end to end.

SKILLS
Languages: TypeScript, JavaScript, SQL, HTML, CSS
Frontend: React, Next.js, Tailwind CSS, React Testing Library
Backend: Node.js, Express, Prisma, REST APIs, JWT auth
Databases and tools: PostgreSQL, Redis, Docker, Git, GitHub Actions, Linux (Ubuntu), Nginx

PROJECTS
Clinic Booking · Next.js, TypeScript, PostgreSQL, Docker · clinic-demo.example.com
- Built online booking used by a real clinic (~40 appointments a week), replacing phone bookings.
- Prevented double booking under concurrent requests with a unique index and a retry-safe API.
- Set up CI/CD with GitHub Actions: 48 tests on every pull request, automatic deploy to a VPS.

Shop API · Express, Prisma, PostgreSQL, Jest · shop-api.example.com/docs
- Designed a REST API with role-based access (customer, staff, admin) and OpenAPI docs.
- Handled payment webhooks idempotently, so retried events never charge or ship twice.

EXPERIENCE
Freelance Web Developer · Self-employed · Mar 2025 – Present
- Delivered 3 websites for local businesses, from written scope to deploy and a monthly maintenance plan.

EDUCATION
B.Sc. Computer Science · Cairo University · 2025

LANGUAGES
Arabic (native) · English (professional working)`
        },
        {
          cmd: "bullets بأثر",
          title: "إزاي تكتب bullet بأثر مش قايمة مهام؟",
          desc: R`الـ bullet الضعيف بيوصف مسؤولية: «Responsible for the frontend». القوي بيقول عملت إيه، وبإيه، والنتيجة: فعل ماضي قوي (Built، و Designed، و Cut، و Automated)، وبعدين الحاجة، وبعدين الأداة أو الطريقة، وبعدين الأثر برقم أو بحاجة ملموسة. وفيه صيغة مشهورة بتتنسب لـ recruiters في Google: «Accomplished X, as measured by Y, by doing Z».

والـ junior بيقول «معنديش أرقام». عندك: أرقام تقدر تقيسها بنفسك. Lighthouse قبل وبعد، وزمن الـ response، وعدد الاختبارات، وحجم الـ bundle، وعدد اليوزرز الحقيقيين ولو ١٠، ووقت اتوفّر على حد. بس أبدًا متألّفش رقم: كل رقم في الـ CV سؤال في الانترفيو («قست الـ 1.6s دي إزاي؟»).`,
          example: R`Before: Responsible for the frontend of the project.
After:  Built the booking UI in React and TypeScript, used by ~40 patients a week at a local clinic.
Before: Worked on the backend using Node.js.
After:  Designed a REST API (Express, PostgreSQL) with role-based auth, covered by 60+ integration tests in CI.
Before: Improved website performance.
After:  Cut home page LCP from 4.1s to 1.6s (Lighthouse, mobile) by resizing images and caching API responses.
Before: Used Git and GitHub.
After:  (delete it: Git is expected; show it with a clean repo, not a bullet)`,
          try: R`خد ٥ bullets من الـ CV بتاعك (أو من المشاريع اللي اخترتها) واكتبهم تاني بالشكل ده. ولكل bullet مفيهوش رقم، اقيس رقم حقيقي النهارده: شغّل Lighthouse، أو عدّ الاختبارات بـ [[npm test]]، أو اسأل صاحب المحل كام واحد بيستخدمه.`,
          flag: "script",
          deep: {
            why: "مسؤولية زي «worked on backend» ممكن تبقى ساعتين أو سنة، ومبتفرّقش بينك وبين أي حد تاني. الأثر هو اللي بيفرّق، وهو اللي بيفتح أسئلة الانترفيو في حاجات انت عارفها كويس.",
            how: R`الأفعال: ابدأ كل bullet بفعل ماضي مختلف. Built، و Designed، و Implemented، و Automated، و Reduced، و Cut، و Migrated، و Replaced. وابعد عن «Helped with» و «Participated in» إلا لو ده فعلًا دورك، وساعتها قول الجزء بتاعك انت.

الأرقام اللي ينفع تقيسها لوحدك: Lighthouse (Performance، و LCP) قبل وبعد التحسين، وزمن الـ endpoint بـ [[curl -w]] (زي درس «DNS → TCP → TLS → HTTP → render» في «تاب الانترفيو»)، وعدد الاختبارات والـ coverage، وحجم الـ bundle، وعدد الـ queries في صفحة قبل وبعد حل N+1. واكتب إزاي قست بين قوسين لو مش واضح.

الأثر من غير رقم برضه ينفع لو ملموس: «replacing phone bookings»، أو «so retried payment events never charge twice». المهم يبقى نتيجة مش نشاط.

وكل bullet سطر واحد أو سطرين بالكتير، و ٢ لـ ٣ لكل مشروع. الأقوى الأول.`,
            when: "كل bullet في Projects و Experience. وفي LinkedIn نفس الـ bullets تقريبًا.",
            mistakes: R`أرقام متألّفة أو مبالغ فيها («improved performance by 300%») من غير ما تعرف تشرحها. bullets كلها بتبدأ بـ «Responsible for». قايمة أدوات في كل bullet («using React, Redux, Axios, Tailwind, ...») بدل ما تبقى في الـ Skills. وتحويل مشروع جماعي لـ «Built» كأنك عملته لوحدك: في الانترفيو هتتسأل عن جزء مش بتاعك.`
          },
          teach: R`## الـ bullet الكويس ٤ حتت بالترتيب

~~~text
Cut home page LCP from 4.1s to 1.6s (Lighthouse, mobile) by resizing images and caching API responses.
~~~

| الحتة | في المثال | دورها |
|---|---|---|
| فعل ماضي قوي | [[Cut]] | عملت إيه انت |
| الحاجة | [[home page LCP]] | على إيه |
| الرقم أو الأثر | [[from 4.1s to 1.6s]] | النتيجة |
| إزاي قست | [[(Lighthouse, mobile)]] | عشان الرقم يتصدّق |
| الطريقة | [[by resizing images and caching API responses]] | الأداة أو الأسلوب |

[[LCP]] = Largest Contentful Paint: الوقت لحد ما أكبر حاجة في الصفحة تظهر. و [[s]] ثواني.

---

## قبل وبعد: ليه الأول ضعيف

| قبل | المشكلة | بعد |
|---|---|---|
| [[Responsible for the frontend]] | مسؤولية مش فعل، ومفيش نتيجة | [[Built the booking UI ... used by ~40 patients a week]] |
| [[Worked on the backend using Node.js]] | أداة من غير ما عملت بيها إيه | [[Designed a REST API ... covered by 60+ integration tests in CI]] |
| [[Improved website performance]] | «حسّنت» من غير رقم | الـ LCP من ٤.١ لـ ١.٦ |
| [[Used Git and GitHub]] | حاجة متوقعة من أي حد | تتشال |

---

## كلمات الإنجليزي

- [[~40]]: تقريبًا ٤٠. استخدم [[~]] لو الرقم تقديري، عشان متتمسكش في رقم مضبوط.
- [[60+]]: أكتر من ٦٠.
- [[covered by]]: متغطي بـ (اختبارات).
- الفعل في الماضي ([[Built]] مش [[Build]] ولا [[Building]]) عشان ده حاجة خلصت.

---

## الخلاصة

- فعل، حاجة، رقم أو أثر، إزاي.
- كل رقم لازم تعرف قسته إزاي، لأنه هيتسأل.
- اختبار سريع: لو حطيت اسم أي زميل مكانك والـ bullet لسه صح، يبقى مسؤولية مش أثر.`,
          lines: [
            "قبل: مسؤولية، مفيهاش عملت إيه ولا النتيجة.",
            "بعد: فعل، والحاجة، والأداة، ومستخدمين حقيقيين.",
            "قبل: أداة من غير أي حاجة عملتها بيها.",
            "بعد: قرار تصميم (الأدوار)، ودليل على الجودة (اختبارات في CI).",
            "قبل: «حسّنت» من غير أي رقم.",
            "بعد: رقم قبل وبعد، وقست إزاي، وعملت إيه بالظبط.",
            "قبل: حاجة كل مطوّر المفروض يعرفها.",
            "بعد: تتشال. الـ bullet ده بياخد مكان حاجة أهم."
          ],
          sol: R`الـ bullet المكتوب صح بيعدّي الاختبار ده: لو شلت اسمك وحطيت اسم أي حد تاني من نفس الكورس، هيبقى لسه صح؟ لو آه، يبقى لسه مسؤولية مش أثر.

وفي القياس، أغلب الناس بتكتشف رقم كويس مكانتش واخدة بالها منه (عدد الاختبارات، أو Lighthouse عالي). ولو الرقم طلع وحش (LCP ٥ ثواني)، ده مش حاجة تخبيها: ده مشروع تحسين صغير هيطلّعلك bullet ممتاز بعد يومين.

تحت إعادة كتابة لـ bullets ضعيفة شائعة جدًا. الغلط الشائع: الـ bullet بقى ٣ سطور عشان تحط كل حاجة. سطر أو اتنين.`,
          solCode: R`Before: Developed a responsive e-commerce website.
After:  Built a responsive store (Next.js, Stripe test mode) with cart, checkout and order emails; Lighthouse mobile 94.

Before: Implemented authentication.
After:  Implemented email login with refresh-token rotation and rate-limited password reset (Express, Redis).

Before: Wrote unit tests.
After:  Added 35 unit and integration tests for pricing and coupons, catching 2 rounding bugs before release.

Before: Worked with a team of 4 students on a graduation project.
After:  Owned the backend of a 4-person graduation project: API design, PostgreSQL schema and deploy with Docker.

Before: Created an admin dashboard.
After:  Built an admin dashboard that replaced a shared Excel sheet, saving the owner ~3 hours a week on order tracking.`
        },
        {
          cmd: "ATS",
          title: "الـ ATS: إزاي الـ CV بتاعك يتقري صح من السيستم ومن الـ recruiter؟",
          desc: R`الـ ATS (applicant tracking system) هو السيستم اللي الشركة بتستقبل فيه التقديمات. بيحوّل الـ CV لنص ويحطه في خانات، والـ recruiter بيدوّر ويفلتر بالكلمات (React، و Node.js، و PostgreSQL). الخرافة المشهورة إن «السيستم بيرفض ٧٥٪ لوحده». غالبًا بني آدم هو اللي بيقرر، بس لو النص طلع بايظ أو الكلمات مش موجودة، انت مش هتطلع في البحث بتاعه أصلًا.

القواعد: PDF نصي (تقدر تحدد الكلام وتنسخه)، مش صورة ولا تصميم متحوّل لأشكال. عمود واحد. عناوين عادية (Experience، و Projects، و Skills). المعلومات المهمة مش جوه جداول أو أيقونات أو header الصفحة. واستخدم نفس الكلمات اللي في الإعلان لو هي صح عنك: لو مكتوب «PostgreSQL» متكتبش «Postgres» بس. وعدّل ترتيب المهارات والـ bullets لكل إعلان في ١٠ دقايق.`,
          example: R`sudo apt install poppler-utils
pdftotext -layout Mona-Adel-CV.pdf cv.txt
head -30 cv.txt
for k in React TypeScript Next.js Node.js PostgreSQL Docker REST Jest; do grep -qi -- "$k" cv.txt && echo "✓ $k" || echo "✗ $k"; done`,
          try: R`حوّل الـ CV بتاعك لنص بـ [[pdftotext]] (على ويندوز استخدم WSL). اقرا الناتج: الترتيب صح؟ فيه كلام ناقص أو حروف غريبة؟ وبعدين خد إعلان وظيفة حقيقي، وغيّر الكلمات في الـ loop لأهم ٨ حاجات في الإعلان، وشوف مين ناقص.`,
          deep: {
            why: "لو الـ CV شكله حلو بس النص جواه متلخبط، السيستم بيسجّل خانات فاضية أو غلط، والـ recruiter اللي بيدوّر بـ «React» مش هيلاقيك حتى لو React أقوى حاجة عندك. و [[pdftotext]] بيوريك تقريبًا اللي أي parser بسيط هيشوفه.",
            how: R`[[pdftotext]] من حزمة poppler-utils بيطلّع النص من الـ PDF، و [[-layout]] بيحاول يحافظ على الترتيب. لو الناتج فاضي، الـ PDF صورة (غالبًا متصدّر من أداة تصميم كـ image). ولو الأعمدة متداخلة (سطر من الشمال وسطر من اليمين)، ده اللي هيحصل في ATS كتير.

الـ loop بيدوّر على كل كلمة من غير فرق كابيتال وسمول ([[-i]])، و [[-q]] من غير طباعة، و [[--]] عشان لو الكلمة بدأت بـ [[-]]. ✗ معناها الكلمة مش موجودة: لو انت فعلًا عارفها، زوّدها في Skills أو في bullet بيثبتها. ولو مش عارفها، متزوّدهاش.

الـ tailoring: نسخة أساسية لكل نوع وظيفة، ولكل تقديم مهم: رتّب الـ Skills بحيث اللي في الإعلان يبقى الأول، وقدّم المشروع الأقرب للوظيفة، وخلّي المسمى في الـ header زي الإعلان. ١٠ دقايق مش ساعة.`,
            when: "قبل أول تقديم لأي CV جديد أو template جديد، وقبل كل تقديم مهم لتظبيط الكلمات.",
            mistakes: R`template من Canva بعمودين وأيقونات بدل الكلام (📧 بدل Email). كلمات بيضا مستخبية في الـ CV عشان «تضحك على الـ ATS»: الـ recruiter بيشوفها في النص وده بيقفل الموضوع. تحشي كل كلمات الإعلان حتى اللي متعرفهاش. واختصارات غير مشهورة، أو كتابة «JS» بس والإعلان «JavaScript».`
          },
          teach: R`## ٤ أوامر بتوريك الـ CV بعين السيستم

الـ ATS بيحوّل الـ PDF لنص الأول. [[pdftotext]] بيعمل نفس الحكاية تقريبًا، فاللي هيطلعلك هو تقريبًا اللي السيستم شايفه. جرّبتهم في Ubuntu 24.04 (Docker) على PDF تجريبي فيه CV صغير.

---

## ١. التسطيب

~~~bash
sudo apt install poppler-utils
~~~

[[poppler-utils]] حزمة أدوات PDF، منها [[pdftotext]]. و [[sudo]] لأن التسطيب محتاج صلاحيات admin. في Docker انت root أصلًا فمش محتاج [[sudo]]، ولازم [[apt-get update]] الأول. على ويندوز استخدم WSL.

~~~text
pdftotext version 24.02.0
~~~

---

## ٢. [[pdftotext -layout Mona-Adel-CV.pdf cv.txt]]

اقرا الـ PDF، واكتب النص في [[cv.txt]]. و [[-layout]] بيحاول يحافظ على مكان الكلام في الصفحة.

## ٣. [[head -30 cv.txt]]

أول ٣٠ سطر:

~~~text الناتج
MONA ADEL
Junior Full-stack Developer - Cairo, Egypt - mona@example.com
SKILLS
Languages: TypeScript, JavaScript, SQL
Frontend: React, Next.js
Backend: Node.js, Express, PostgreSQL
Tools: Docker, Git
~~~

نص نضيف وبنفس الترتيب: ده CV هيتقري صح. وتلات حالات وحشة:

| اللي شايفه | معناه |
|---|---|
| الملف فاضي | الـ PDF صورة، اعمله تاني من Docs أو Word |
| سطور متداخلة من عمودين | الـ CV بعمودين، حوّله لعمود واحد |
| [[Syntax Error: Document stream is empty]] | الملف مش PDF أصلًا أو فاضي (ده اللي طلع لما ادّيته ملف فاضي) |

---

## ٤. الـ loop

~~~bash
for k in React TypeScript Next.js Node.js PostgreSQL Docker REST Jest; do grep -qi -- "$k" cv.txt && echo "✓ $k" || echo "✗ $k"; done
~~~

| الحتة | معناها |
|---|---|
| [[for k in ...; do ...; done]] | لف على كل كلمة، والكلمة الحالية في [[$k]] |
| [[grep -q]] | دوّر من غير ما تطبع، بس رجّع نجح أو فشل |
| [[-i]] | من غير فرق بين كابيتال وسمول |
| [[--]] | اللي بعدي كلمة بحث مش option، حتى لو بدأت بـ [[-]] |
| [[&& echo "✓ $k"]] | لو لقاها |
| [[|| echo "✗ $k"]] | لو ملقاهاش |

~~~text الناتج
✓ React
✓ TypeScript
✓ Next.js
✓ Node.js
✓ PostgreSQL
✓ Docker
✗ REST
✗ Jest
~~~

[[REST]] و [[Jest]] ناقصين. لو انت عارفهم فعلًا، زوّدهم في Skills أو في bullet بيثبتهم.

> خلي بالك: [[grep]] بيدوّر على حروف جوه أي كلمة، فـ [[REST]] مع [[-i]] هتطلع ✓ لو الـ CV فيه كلمة زي «interested». و [[.]] في [[Node.js]] معناها «أي حرف» (جرّبتها: [[Nodexjs]] اتطابقت). الأداة دي فحص سريع، مش حكم نهائي.

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| طلّع النص | [[pdftotext -layout]] |
| اقراه بعينك | [[head -30]] |
| دوّر على كلمات الإعلان | [[grep -qi]] في loop |

- PDF نصي، عمود واحد، عناوين عادية.
- نفس كلمات الإعلان لو هي صح عنك، ومتحشيش كلمات متعرفهاش.`,
          lines: [
            "تسطيب pdftotext (على Ubuntu أو WSL).",
            "طلّع النص من الـ PDF مع الحفاظ على الترتيب.",
            "اقرا أول ٣٠ سطر: ده تقريبًا اللي السيستم شايفه.",
            "لكل كلمة مهمة من الإعلان: ✓ لو موجودة في الـ CV، و ✗ لو ناقصة."
          ],
          sol: R`لو الـ CV معمول في Docs أو Word ومتصدّر PDF، الناتج المفروض يبقى نص نضيف بنفس الترتيب تقريبًا. لو طلع ملف فاضي، الـ PDF صورة، واعمله تاني من أداة نصية. ولو الكلام متداخل، عندك عمودين: حوّلهم لعمود واحد.

وفي الكلمات، غالبًا هتلاقي ١ لـ ٣ ✗. قسّمهم: حاجة انت عارفها ومش كاتبها (زوّدها فورًا، ويا سلام لو في bullet بدل Skills بس)، وحاجة مكتوبة بشكل مختلف («Postgres» بدل «PostgreSQL»، وده بيتحل بكتابة الاتنين أو صيغة الإعلان)، وحاجة متعرفهاش (سيبها، وحطها في قايمة التعلم لو بتتكرر في الإعلانات).

الغلط الشائع: كلمة زي [[Node.js]] بتطلع ✓ عشان الـ [[.]] في grep بتطابق أي حرف. مش مشكلة هنا، بس اعرف إنها regex.`
        },
        {
          cmd: "محلي ولا برا",
          title: "CV لشركة محلية ولا لشركة برا: إيه اللي يتشال وإيه اللي يتغير؟",
          desc: R`في الحالتين بالإنجليزي. CV بالعربي نادرًا ما هتحتاجه في وظيفة برمجة، إلا لو الجهة نفسها بتطلبه. الفرق في كام سطر.

الشركات المحلية في مصر كتير منها بتسأل عن موقف التجنيد للشباب (أدّى الخدمة، أو إعفاء، أو تأجيل)، وناس كتير بتحطه سطر في الـ CV عشان ميتسألش عليه، أو بيتطلب في استمارة التقديم. ولو برا أو remote: متحطش صورة ولا تاريخ ميلاد ولا الحالة الاجتماعية (في أسواق كتير زي أمريكا وإنجلترا ده مش متعارف عليه، وفي أسواق تانية أقل حساسية، فشوف السوق اللي بتقدّم فيه). واكتب المنطقة الزمنية وإنك متاح remote.

وفي كل الحالات شيل: الرقم القومي، والديانة، والعنوان بالشارع، و «References available upon request»، ونسب المهارات (React 80%)، و Microsoft Office، والصفات العامة («hard worker»). واللغات بمستوى صادق، لأن الانترفيو هيختبره.`,
          example: R`Both:          name, title, email, phone, LinkedIn, GitHub, portfolio, city and country
Local (Egypt): Military status: Completed / Exempted (men; many local companies ask)
Local (Egypt): phone as +20 1xx xxx xxxx, and "Cairo, Egypt" instead of a full address
Abroad/remote: "Cairo, Egypt (UTC+2, UTC+3 in summer) · Open to remote"
Abroad/remote: no photo, no date of birth, no marital status
Remove always: national ID, religion, "References available upon request", skill bars (React 80%)
Remove always: Microsoft Office, "hard-working", a generic objective paragraph
Languages:     Arabic (native), English (professional working): exact, the interview will test it`,
          try: R`اعمل نسختين من الـ CV: واحدة محلية وواحدة remote، بالفروق دي بس. وبعدين افتح إعلانين حقيقيين (واحد محلي وواحد remote) واقرا الـ requirements: هل فيه حاجة زي موقف التجنيد، أو ساعات overlap، أو مستوى إنجليزي محدد؟ زوّدها في النسخة المناسبة لو بتنطبق عليك.`,
          flag: "script",
          deep: {
            why: "كل سطر مالوش لازمة بياخد مكان من صفحة واحدة، وبعض السطور بتضر: صورة في CV لشركة في سوق مش متعود عليها ممكن تتشاف غريبة، وسؤال التجنيد لو متجاوبش في شركة محلية ممكن يأخّر الفرز. والشركة اللي برا أول قلقها في الـ junior: هل هيبقى متاح في ساعات شغلنا، وإنجليزيته كفاية؟",
            how: R`المنطقة الزمنية: مصر UTC+2 في الشتا و UTC+3 في الصيف (التوقيت الصيفي رجع من ٢٠٢٣). اكتبها كده، أو اكتب «Cairo (EET/EEST)». والشركة بتحسب منها ساعات الـ overlap (درس «remote لبرا»).

مستوى الإنجليزي: مصطلحات زي «professional working proficiency» (من مقياس LinkedIn) أو مستويات CEFR زي B2 و C1 لو عندك شهادة. متكتبش «fluent» لو بتتلخبط في الكلام.

موقف التجنيد: سطر قصير في آخر الـ CV أو جنب البيانات الشخصية. ولو «تأجيل»، اعرف هيخلص إمتى، لأنه هيتسأل.

الصورة في الشركات المحلية: شائعة ومش مشكلة غالبًا، بس مش ضرورية. لو حطيتها، تبقى صورة رسمية بسيطة.`,
            when: "أول ما تبدأ تقدّم في النوعين. وراجع الإعلان نفسه كل مرة: أحيانًا بيطلب حاجة صريحة (زي «must overlap 4 hours with CET»).",
            mistakes: R`نفس الـ CV بالصورة وتاريخ الميلاد لكل الشركات برا. «Fluent English» وانت محتاج تترجم في دماغك. تحط عنوانك الكامل ورقمك القومي. تنسى رمز الدولة في التليفون ([[+20]]) في الـ CV اللي رايح برا. وتكتب CV بالعربي لشركة برمجة لأنك «مرتاح أكتر».`
          },
          teach: R`## المثال ٣ أنواع سطور

كل سطر بيبدأ بمين ينطبق عليه: [[Both]] (الاتنين)، و [[Local (Egypt)]]، و [[Abroad/remote]]، و [[Remove always]] (يتشال من أي CV).

---

## سطور النسخة المحلية

~~~text
Local (Egypt): Military status: Completed / Exempted (men; many local companies ask)
~~~

[[Military status]] موقف التجنيد. [[Completed]] أدّى الخدمة، و [[Exempted]] إعفاء، و [[Postponed]] تأجيل (ولو تأجيل، اعرف بيخلص إمتى).

~~~text
Local (Egypt): phone as +20 1xx xxx xxxx, and "Cairo, Egypt" instead of a full address
~~~

[[+20]] كود مصر الدولي. والمدينة كفاية، العنوان بالشارع مالوش لازمة.

---

## سطور النسخة الـ remote

~~~text
Abroad/remote: "Cairo, Egypt (UTC+2, UTC+3 in summer) · Open to remote"
~~~

[[UTC]] التوقيت العالمي المرجعي. مصر [[UTC+2]] في الشتا و [[UTC+3]] في الصيف (التوقيت الصيفي). اتأكدت في Ubuntu:

~~~text الناتج
Mon 10:00 EEST +0300     (5 Oct 2026)
Mon 10:00 EET +0200      (7 Dec 2026)
~~~

[[EET]] = Eastern European Time و [[EEST]] = نفسه في الصيف (S = Summer).

---

## سطور تتشال دايمًا

| السطر | ليه يتشال |
|---|---|
| national ID و religion | بيانات حساسة مالهاش علاقة بالشغل |
| [[References available upon request]] | مفهومة ضمنًا، وبتاخد سطر |
| [[React 80%]] | النسبة مالهاش معنى: ٨٠٪ من إيه؟ |
| Microsoft Office و [[hard-working]] | كلام كل الناس بتكتبه |

---

## الخلاصة

- النسختين بالإنجليزي، ومختلفين في ٣ لـ ٥ سطور بس.
- المحلي: موقف التجنيد. الـ remote: المنطقة الزمنية و «Open to remote»، ومن غير صورة وتاريخ ميلاد.
- مستوى الإنجليزي بصدق.`,
          lines: [
            "الحاجات الثابتة في النسختين.",
            "موقف التجنيد: كتير من الشركات المحلية بتسأل عليه.",
            "التليفون برمز الدولة والمدينة بس.",
            "المنطقة الزمنية وإنك متاح remote: أول سؤال في دماغ الشركة اللي برا.",
            "حاجات شخصية مش متعارف عليها في أسواق كتير برا.",
            "حاجات تتشال من أي CV: مش آمنة أو مالهاش معنى.",
            "حشو بياخد مكان من غير ما يقول حاجة.",
            "مستوى اللغة بصدق."
          ],
          sol: R`المفروض النسختين يبقوا مختلفين في ٣ لـ ٥ سطور بس، والباقي واحد. لو لقيت نفسك بتكتب CV جديد من الأول، ده كتير.

في الإعلانات: الإعلان الـ remote غالبًا فيه حاجة عن الـ time zone أو «async communication» أو الإنجليزي. والمحلي أحيانًا فيه موقف التجنيد أو السن أو المنطقة (قريب من المكتب). اللي ينطبق عليك يروح في النسخة المناسبة، واللي مش بينطبق (زي مكان بعيد) قرار تقديم مش سطر CV.

الغلط الشائع: تنسى تحدّث النسختين لما تزوّد مشروع. خلي في فولدر career ملف واحد أساسي والنسختين منه.`
        }
      ]
    }
]);

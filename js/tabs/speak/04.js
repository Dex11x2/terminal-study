// تكملة تاب speak: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/speak/01.js (شرح حقول الدرس في أوله)
MORE("speak", [
    {
      t: "تشرح كودك وتعمل demo",
      l: 2,
      n: "تشرح PR بصوتك (context ← what ← why ← trade-offs)، وتمشّي حد في الكود، وتعمل demo لفيتشر، وتحوّل ملاحظاتك المكتوبة لكلام طبيعي",
      items: [
        {
          cmd: "تشرح PR بصوتك",
          title: "تشرح PR أو فيتشر بصوتك في دقيقتين: context ← what ← why ← trade-offs",
          desc: R`الموقف: في اجتماع أو مكالمة review، حد قالك [[Can you walk us through your PR?]]. والغلطة المشهورة إنك تفتح الـ diff وتقرا الكود سطر سطر. الناس مش محتاجة الكود، محتاجة الصورة.

الترتيب اللي بيشتغل دايمًا (ونفس ترتيب وصف PR المكتوب في درس [[وصف PR]] في «تاب إنجليزي للمبرمج: قراية وكتابة»):
١) Context: المشكلة إيه، وليه بنعمل ده. [[So the problem was...]]
٢) What: عملت إيه على مستوى عالي. [[What I did is...]]
٣) Why: ليه الطريقة دي. [[I went with X because...]]
٤) Trade-offs: التمن أو الحاجة اللي مش مثالية. [[The downside is...]]
٥) What to look at: عايز الريفيو يركز فين. [[I'd love feedback on...]]

وكل جزء جملة أو اتنين. دقيقتين بالكتير، وبعدين [[Any questions?]].`,
          example: R`Context:  So the problem was that the orders page took about five seconds to load for big customers.
What:  What I did is add pagination on the API, twenty orders per page, and an index on customer_id.
Why:  I went with cursor pagination instead of offset, because offset gets slow on large tables.
Trade-off:  The downside is that you can't jump to page ten directly; you can only go next and previous.
Trade-off:  I think that's fine for this page, but let me know if the product team disagrees.
Result:  On staging, the page now loads in under half a second.
Review:  I'd love feedback on the cursor encoding in orders.service.ts. That's the tricky part.
Close:  That's pretty much it. Any questions?`,
          try: R`خد آخر PR أو commit كبير عملته (أو فيتشر في مشروعك)، واكتب ٥ سطور بالترتيب ده (سطر لكل جزء)، وبعدين سجّل نفسك بتشرحه من غير ما تبص على الورقة، في أقل من دقيقتين. اسمع وعدّ: قلت [[because]] كام مرة؟ (لو صفر، مفيش why.)`,
          flag: "script",
          deep: {
            why: R`الشرح ده بيتطلب منك في الـ code review، و sprint demo، و الانترفيو («walk me through a project»). والترتيب ده بيوري إنك فاهم ليه عملت اللي عملته، مش بس نفذت. والـ trade-offs بالذات هي علامة الـ mid/senior: الـ junior بيقول «عملت X»، والأحسن بيقول «عملت X بدل Y، والتمن كان Z».`,
            how: R`عبارات لكل جزء:
Context: [[So the problem was...]]، [[The goal here is...]]، [[Users were complaining that...]].
What: [[What I did is...]]، [[The main change is...]]، [[At a high level, ...]].
Why: [[I went with X because...]]، [[I chose X over Y since...]]، [[The reason is...]].
Trade-offs: [[The downside is...]]، [[The trade-off is...]]، [[One thing I'm not 100% happy with is...]]، [[A limitation is...]].
Review: [[I'd love feedback on...]]، [[The tricky part is...]]، [[Could you take a closer look at...]].
Close: [[That's pretty much it]]، [[Happy to go into more detail]]، [[Any questions?]].

وكلمات الربط اللي بتخلي الكلام يمشي: [[so]]، و [[and then]]، و [[because]]، و [[but]]، و [[which means]]. في الكلام دي أهم من الـ grammar المظبوط.

ولو حد سأل سؤال مش عارف إجابته: درس «مش عارف في اجتماع».`,
            when: "code review بالصوت، و sprint demo، و walkthrough لزميل جديد، و «tell me about a project» في الانترفيو.",
            mistakes: R`تقرا الـ diff سطر سطر. تبدأ بالتفاصيل ([[So in line 12 I changed...]]) قبل الصورة الكبيرة. مفيش [[why]] خالص. تخبّي الـ trade-off (هيتكشف في الـ review، والأحسن تقوله انت). وتطوّل ٧ دقايق: خلّي التفاصيل للأسئلة.`
          },
          teach: R`## الفكرة: الصورة قبل الكود، والسبب قبل التفاصيل

المثال ٨ سطور، كل سطر بيبدأ باسم الجزء ([[Context:]] و [[What:]] و [[Why:]]...)، وده نفس ترتيب أي شرح PR بالصوت.

---

## ١. Context: المشكلة (السطر الأول)

~~~text Context
So the problem was that the orders page took about five seconds to load for big customers.
~~~

[[So the problem was that...]] = المشكلة كانت إن. و [[about]] = تقريبًا (أمانة). الجملة بتقول المشكلة من ناحية اليوزر، مش من ناحية الكود.

## ٢. What: عملت إيه (السطر التاني)

[[What I did is add pagination on the API, twenty orders per page, and an index on customer_id.]]: [[What I did is + فعل]] تركيبة سهلة بتبدأ بيها أي شرح. و [[customer_id]] بتتقري «customer underscore I D» أو «customer I D».

## ٣. Why: ليه الطريقة دي (السطر التالت)

[[I went with cursor pagination instead of offset, because offset gets slow on large tables.]]: [[went with]] = اخترت. و [[instead of]] = بدل. و [[because]] = السبب. لو مفيش [[because]] في شرحك، مفيش why.

## ٤. Trade-off: التمن (السطر ٤ و ٥)

[[The downside is that you can't jump to page ten directly; you can only go next and previous.]]: [[The downside is]] = العيب. وبعدها [[I think that's fine for this page, but let me know if the product team disagrees.]]: بتقول رأيك وبتفتح الباب للاعتراض.

## ٥. Result و Review و Close (آخر ٣ سطور)

| الجزء | الجملة | الحتة المهمة |
|---|---|---|
| Result | [[On staging, the page now loads in under half a second.]] | رقم بعد التغيير |
| Review | [[I'd love feedback on the cursor encoding in orders.service.ts. That's the tricky part.]] | [[I'd love feedback on]] = عايز رأيكم في. [[tricky]] = صعبة |
| Close | [[That's pretty much it. Any questions?]] | [[pretty much]] = تقريبًا |

[[orders.service.ts]] بتتقري «orders dot service dot T S».

---

## الخلاصة

| الجزء | جملة البداية |
|---|---|
| Context | [[So the problem was...]] |
| What | [[What I did is...]] |
| Why | [[I went with X because...]] |
| Trade-off | [[The downside is...]] |
| Review | [[I'd love feedback on...]] |
| Close | [[Any questions?]] |

دقيقتين بالكتير. التفاصيل للأسئلة، ومتقراش الـ diff سطر سطر.`,
          lines: [
            R`السياق: «المشكلة كانت إن صفحة الأوردرات بتاخد ٥ ثواني للعملاء الكبار».`,
            R`عملت إيه: «ضفت pagination في الـ API، ٢٠ أوردر في الصفحة، و index على customer_id».`,
            R`ليه: «اخترت cursor pagination بدل offset، لأن offset بيبطأ مع الجداول الكبيرة». went with = اخترت.`,
            R`التمن: «العيب إنك متقدرش تروح لصفحة ١٠ على طول؛ بس next و previous».`,
            R`«أظن ده تمام للصفحة دي، بس قولولي لو فريق المنتج مش موافق».`,
            R`النتيجة: «على الـ staging، الصفحة بقت بتحمّل في أقل من نص ثانية».`,
            R`«عايز رأيكم في الـ cursor encoding في الملف ده. دي الحتة الصعبة». tricky = صعبة/خادعة.`,
            R`الختام: «هو ده تقريبًا. فيه أسئلة؟»`
          ],
          sol: R`مثال لـ ٥ سطور لـ PR بسيط:
[[So the problem was that users could submit the signup form twice and create duplicate accounts.]]
[[What I did is disable the button while the request is pending, and add a unique constraint on email in the database.]]
[[I added both because the button alone doesn't protect against a slow network or a script.]]
[[The downside is that the user now sees a database error if it still happens, so I mapped it to a friendly message.]]
[[I'd love feedback on the error mapping. That's pretty much it. Any questions?]]

في التسجيل: [[because]] مرة على الأقل، و [[downside]] أو [[trade-off]] مرة. والمدة ٤٠–٩٠ ثانية. التسجيل الضعيف: [[I changed the form and the database. That's it.]] من غير ولا سبب.`
        },
        {
          cmd: "تمشي حد في الكود",
          title: "تمشّي زميل في الكود: «This function takes... and returns...»",
          desc: R`موقف تاني غير شرح الـ PR: زميل جديد، أو حد هيكمّل شغلك، وعايزك [[walk him through the codebase]]. هنا بتشرح الكود نفسه وانت بتشارك الشاشة. والسر: من برا لجوه. الأول الفولدرات والصورة الكبيرة، وبعدين flow واحد من أوله لآخره (مثلًا request واحد من الـ route للداتابيز)، وبعدين التفاصيل.

والجمل اللي بتوصف كود بسيطة جدًا وبتتكرر: [[This function takes X and returns Y]]. و [[This is where we...]]. و [[This gets called when...]]. و [[It reads from... and writes to...]]. و [[If X, it..., otherwise it...]]. و [[This is just a helper for...]]. ومع الجمل دي تقدر تشرح أي كود بإنجليزي بسيط.`,
          example: R`Let's start with the big picture. The app has three main folders: routes, services and db.
Let's follow one request from start to finish: creating an order.
It starts here, in the orders route. This just validates the body and calls the service.
This function takes the cart and the user ID, and returns the new order.
First it checks the stock. If something is out of stock, it throws a 409.
Otherwise, it opens a transaction and writes the order and the items.
This gets called by the payment webhook later, when the payment succeeds.
This file is just a helper for formatting prices; you can ignore it for now.
The part I'd be careful with is this retry logic. It's a bit fragile.
Does that make sense so far? Any questions before we go deeper?`,
          try: R`اختار flow واحد من مشروعك (login، أو إضافة للـ cart، أو رفع صورة)، وسجّل فيديو ٣ دقايق بتمشّي فيه «زميل جديد» في الكود من أول الـ request لحد الداتابيز. لازم تستخدم [[This function takes... and returns...]] مرتين على الأقل، و [[If... otherwise...]] مرة، و [[Does that make sense?]] مرة.`,
          flag: "script",
          deep: {
            why: R`الـ knowledge transfer ده بيحصل كتير: onboarding، وقبل أجازة، ولما حد يمسك تاسك انت بدأتها. واللي بيشرح كويس بياخد ثقة الفريق بسرعة. وفي انترفيو الـ take-home، أحيانًا بيطلبوا منك تمشّيهم في الكود اللي سلمته.`,
            how: R`الأفعال اللي بتوصف كود: [[takes]] (بياخد parameters)، و [[returns]]، و [[calls]] (بينادي)، و [[gets called by]] (بيتنادى من)، و [[reads from]] و [[writes to]]، و [[checks]]، و [[throws]]، و [[handles]]، و [[loops over]] (بيلف على)، و [[maps X to Y]]، و [[wraps]] (بيغلّف).

وأدوات الربط: [[First]] و [[Then]] و [[After that]] و [[Finally]]، و [[If ... otherwise ...]]، و [[When ... , it ...]]، و [[Once ... , ...]] (أول ما).

التحذيرات: [[The part I'd be careful with is...]]، و [[This is a bit fragile]] (هش)، و [[This is legacy code]] (قديم)، و [[There's a known issue here]]، و [[Don't touch this unless...]] (بهزار نص جد).

كل ٣–٤ دقايق وقّف واسأل: [[Does that make sense so far?]] أو [[Any questions before we go deeper?]]. الزميل غالبًا مش هيقاطعك لو محتاج يسأل.`,
            when: "onboarding لحد جديد، و handover قبل أجازة، وشرح take-home في انترفيو، و pair programming.",
            mistakes: R`تبدأ بأول ملف في الفولدر بالترتيب الأبجدي بدل flow حقيقي. وتقرا كل سطر. و [[This function it takes]] (فاعلين: [[This function takes]]). و [[This function return]] من غير s. و [[Is it clear?]] (بتتسمع زي امتحان؛ [[Does that make sense?]] ألطف).`
          },
          teach: R`## الفكرة: من برا لجوه، و flow واحد من أوله لآخره

المثال ١٠ جمل بترتيب جلسة شرح حقيقية: الصورة الكبيرة، وبعدين request واحد ماشي في الكود، وبعدين التحذيرات، وسؤال تأكيد.

---

## ١. الصورة الكبيرة (أول سطرين)

[[Let's start with the big picture. The app has three main folders: routes, services and db.]]: [[the big picture]] = الصورة الكبيرة. وبعدين [[Let's follow one request from start to finish: creating an order.]]: [[follow]] = نمشي وراه. اختيار flow واحد أحسن من إنك تفتح كل الملفات.

## ٢. وصف الكود (السطر ٣ لـ ٦)

| الجملة | التركيبة اللي تقدر تعيد استخدامها |
|---|---|
| [[It starts here, in the orders route. This just validates the body and calls the service.]] | [[This just + فعل]] = ده بس بيعمل كذا |
| [[This function takes the cart and the user ID, and returns the new order.]] | [[takes X and returns Y]]: الجملة الأساسية لأي دالة |
| [[First it checks the stock. If something is out of stock, it throws a 409.]] | [[First]] + [[If ..., it ...]] |
| [[Otherwise, it opens a transaction and writes the order and the items.]] | [[Otherwise]] = غير كده |

الأفعال: [[validates]] و [[calls]] و [[takes]] و [[returns]] و [[checks]] و [[throws]] و [[writes]]: كلها بـ s لأن الفاعل [[it]] أو [[this function]]. والغلط المشهور [[This function return]] من غير s، أو [[This function it takes]] (فاعلين). و [[409]] = four oh nine (Conflict).

## ٣. مين بينادي مين (السطر ٧ و ٨)

[[This gets called by the payment webhook later, when the payment succeeds.]]: [[gets called by]] = بيتنادى من. و [[This file is just a helper for formatting prices; you can ignore it for now.]]: [[helper]] = دالة مساعدة، و [[ignore it for now]] = متشغلش بالك بيه دلوقتي (بيوفر وقت الزميل).

## ٤. التحذير وسؤال التأكيد (آخر سطرين)

[[The part I'd be careful with is this retry logic. It's a bit fragile.]]: [[fragile]] = هش، أي تعديل ممكن يكسره. و [[Does that make sense so far? Any questions before we go deeper?]]: [[so far]] = لحد هنا. ألطف من [[Is it clear?]] اللي بتتسمع زي امتحان.

---

## الخلاصة

| عايز تقول | الجملة |
|---|---|
| الدالة بتعمل إيه | [[This function takes X and returns Y.]] |
| شرط | [[If X, it ... Otherwise, it ...]] |
| مين بينادي | [[This gets called by ...]] |
| تجاهل ده | [[This is just a helper for ...]] |
| خلي بالك | [[The part I'd be careful with is ...]] |
| تأكد | [[Does that make sense so far?]] |`,
          lines: [
            R`«نبدأ بالصورة الكبيرة. التطبيق فيه ٣ فولدرات أساسية».`,
            R`«هنمشي ورا request واحد من أوله لآخره: إنشاء أوردر». follow = نمشي ورا.`,
            R`«بيبدأ هنا في الـ route. ده بيعمل validation للـ body وبينادي الـ service بس».`,
            R`«الدالة دي بتاخد الـ cart والـ user ID، وبترجّع الأوردر الجديد». الجملة الأساسية لوصف أي دالة.`,
            R`«الأول بتشيك على المخزون. لو حاجة خلصانة، بترمي 409». throw = ترمي خطأ.`,
            R`«غير كده، بتفتح transaction وبتكتب الأوردر والعناصر». otherwise = غير كده.`,
            R`«الدالة دي بيناديها الـ webhook بتاع الدفع بعدين، لما الدفع ينجح».`,
            R`«الملف ده مجرد helper لتنسيق الأسعار؛ ممكن تتجاهله دلوقتي».`,
            R`«الحتة اللي هاخد بالي منها هي الـ retry logic دي. هشة شوية». fragile = هش.`,
            R`«مفهوم لحد هنا؟ فيه أسئلة قبل ما ندخل أعمق؟»`
          ],
          sol: R`مثال لشرح flow الـ login (جزء منه):
[[Let's follow the login flow. It starts in the login form component. When the user submits, it calls the login function in auth.ts. This function takes the email and password and sends them to /api/login. On the server, the route checks the password with bcrypt. If it's correct, it creates a session and sets an HttpOnly cookie; otherwise it returns a 401. Does that make sense so far?]]

راجع الفيديو: فيه flow واحد من أوله لآخره؟ و [[takes... returns...]] مرتين؟ و [[If... otherwise...]]؟ ووقفت تسأل؟ المدة ٢–٤ دقايق.

الفيديو الضعيف: بيفتح كل ملف في الفولدر ويقول [[This is the utils file, this is the config file...]] من غير ما يقول إزاي بيشتغلوا مع بعض.`
        },
        {
          cmd: "demo",
          title: "تعمل demo لفيتشر قدام الفريق أو العميل: قبل وأثناء ولو حاجة وقعت",
          desc: R`الـ demo (في آخر الـ sprint أو لعميل) مش شرح كود: ده قصة من وجهة نظر اليوزر. الناس عايزة تشوف «اليوزر يقدر يعمل إيه دلوقتي مكانش يقدر يعمله قبل كده».

الترتيب: ١) جملة عن المشكلة أو الهدف. ٢) ورّي من ناحية اليوزر خطوة خطوة، وانت بتقول بتعمل إيه. ٣) حالة غلط واحدة (validation أو error) عشان يبان إنك فكرت فيها. ٤) إيه اللي لسه مش خلصان. ٥) أسئلة.

ولو حاجة وقعت (وهتقع مرة، ده قانون الـ demos): متتوترش ومتفضلش تصلّح قدامهم. [[Looks like the demo gods aren't with me today]] (جملة مشهورة بهزار)، وبعدين [[Let me show you the screenshots instead]] أو [[I'll send a recording after the call]].`,
          example: R`Today I'm going to show you the new password reset flow.
Before this, users had to email support to reset their password. Now they can do it themselves.
So I'm on the login page, and I click "Forgot password".
I enter my email and hit send. You can see the confirmation message here.
Now I'll open the email. The link expires after 30 minutes, for security.
Let me show you what happens if the link is expired. We show a clear message and a button to try again.
What's not done yet: the email template still needs the final design.
Hmm, looks like staging is a bit slow today. Let me refresh.
If it doesn't load, I'll send you a short recording after the call.
That's the demo. Any questions or feedback?`,
          try: R`اعمل demo مسجّل (Loom أو OBS) لفيتشر واحدة في مشروعك، أقل من ٣ دقايق، بالترتيب الخماسي. ولازم فيه: جملة [[Before this... Now...]]، وحالة error واحدة، وجملة [[What's not done yet]]. ولو حاجة وقعت أثناء التسجيل، متوقفش: اتعامل معاها بجملة من الجمل وكمّل.`,
          flag: "script",
          deep: {
            why: R`الـ demo هو اللحظة اللي شغلك بيتشاف فيها من المدير والعميل والـ product. demo واضح بيخلي شغل أسبوعين يبان، و demo ملخبط بيخلي نفس الشغل يبان ناقص. وفي الانترفيو (portfolio review) نفس المهارة.`,
            how: R`اتكلم بلغة اليوزر مش الكود: [[the user can now...]] مش [[I added an endpoint that...]] (إلا لو الجمهور مبرمجين وسألوا).

قبل الـ demo: جهّز الداتا (يوزر تجريبي، ومنتجات)، وافتح التابات، واقفل الإشعارات، وجرّب الـ flow مرة قبلها بـ ١٠ دقايق. وجهّز backup: screenshots أو فيديو.

وانت بتعمل demo: قول قبل ما تدوس ([[Now I'll click Save]]). واستنى ثانية بعد كل خطوة مهمة عشان الناس تشوف. ولو فيه loading: [[This takes a second...]].

الأسئلة اللي هتيجي: [[What happens if...?]]. لو عارف: جاوب أو ورّي. لو مش عارف: [[Good question, I haven't tested that case. I'll check and get back to you.]]، واكتبها.

والـ feedback: [[Thanks, that's a good point. I'll add it to the ticket.]] حتى لو مش موافق، متتناقشش في الـ demo؛ ناقش بعدين.`,
            when: "sprint review، و demo لعميل، و portfolio review في انترفيو، و فيديو لـ README.",
            mistakes: R`تشرح الكود بدل الفيتشر. وتصلّح bug قدام الناس ١٠ دقايق. و [[Sorry sorry, it was working yesterday!]] (كل الناس بتقولها، بس الأحسن جملة الـ backup). وداتا تجريبية فيها كلام غريب أو «test test asdf». وتنسى تقول إيه اللي لسه مخلصش، فالعميل يفتكر إنه خلص.`
          },
          teach: R`## الفكرة: قصة من ناحية اليوزر، مش شرح كود

المثال ١٠ جمل بالترتيب الخماسي: الهدف، وقبل وبعد، والخطوات، وحالة error، واللي لسه، ولو حاجة وقعت، والختام.

---

## ١. الهدف وقبل/بعد (أول سطرين)

[[Today I'm going to show you the new password reset flow.]]: جملة واحدة بتقول هتشوفوا إيه. و [[Before this, users had to email support to reset their password. Now they can do it themselves.]]: [[Before this... Now...]] أقوى تركيبة في أي demo، بتوري القيمة في ثانيتين. و [[had to]] = كانوا مضطرين.

## ٢. الخطوات وانت بتعملها (السطر ٣ و ٤ و ٥)

| الجملة | الحتة المهمة |
|---|---|
| [[So I'm on the login page, and I click "Forgot password".]] | [[I'm on]] = أنا في صفحة. بتوصف وانت بتعمل |
| [[I enter my email and hit send. You can see the confirmation message here.]] | [[hit]] = تدوس. [[You can see]] = بتشاور |
| [[Now I'll open the email. The link expires after 30 minutes, for security.]] | [[expires]] = بينتهي. و [[for security]] = السبب |

الأفعال حاضر بسيط ([[I click]] و [[I enter]]) لأنك بتوصف اللي بيحصل دلوقتي قدامهم.

## ٣. حالة error (السطر ٦)

[[Let me show you what happens if the link is expired. We show a clear message and a button to try again.]]: حالة غلط واحدة بتوري إنك فكرت فيها. [[what happens if]] = إيه اللي بيحصل لو.

## ٤. اللي لسه (السطر ٧)

[[What's not done yet: the email template still needs the final design.]]: [[not done yet]] = لسه مخلصش. لو منسيتهاش، العميل مش هيفتكر إن كل حاجة خلصت.

## ٥. لو حاجة وقعت (السطر ٨ و ٩)

[[Hmm, looks like staging is a bit slow today. Let me refresh.]] وبعدين [[If it doesn't load, I'll send you a short recording after the call.]]: جملتين بيحولوا المشكلة لحاجة عادية. [[looks like]] = شكله. [[recording]] «ري-**كور**-دِنگ».

## ٦. الختام (آخر سطر)

[[That's the demo. Any questions or feedback?]]

---

## الخلاصة

| الجزء | الجملة |
|---|---|
| الهدف | [[Today I'm going to show you...]] |
| القيمة | [[Before this, ... Now ...]] |
| الخطوة | [[I click... You can see...]] |
| error | [[Let me show you what happens if...]] |
| الناقص | [[What's not done yet: ...]] |
| backup | [[I'll send you a short recording after the call.]] |`,
          lines: [
            R`«النهارده هوريكم flow الـ password reset الجديد».`,
            R`قبل وبعد: «قبل كده اليوزرز كانوا بيبعتوا للـ support. دلوقتي يقدروا يعملوها بنفسهم».`,
            R`«أنا في صفحة الـ login، وهدوس Forgot password». وصف الخطوة وانت بتعملها.`,
            R`«هكتب إيميلي وأدوس send. تقدروا تشوفوا رسالة التأكيد هنا». hit = تدوس.`,
            R`«هفتح الإيميل. اللينك بيخلص بعد نص ساعة، للأمان». expires = بينتهي.`,
            R`حالة error: «خليني أوريكم لو اللينك خلص: بنعرض رسالة واضحة وزرار نجرّب تاني».`,
            R`«اللي لسه مخلصش: قالب الإيميل محتاج التصميم النهائي».`,
            R`حاجة وقعت: «الـ staging بطيء شوية النهارده. خليني أعمل refresh».`,
            R`الـ backup: «لو محمّلش، هبعتلكم تسجيل قصير بعد المكالمة».`,
            R`«ده الـ demo. فيه أسئلة أو feedback؟»`
          ],
          sol: R`الـ demo الكويس (مثال لفيتشر بحث):
[[Today I'll show you the new search. Before this, users had to scroll through all products. Now they can search by name or category. I'll type "shoes"... and you can see the results update as I type. If there are no results, we show a message with suggestions. What's not done yet is search by price. Any questions?]]

راجع التسجيل: أقل من ٣ دقايق؟ فيه before/now؟ فيه حالة error؟ فيه «not done yet»؟ بتقول قبل ما تدوس؟

لو حاجة وقعت أثناء التسجيل وكمّلت بجملة backup، ده أحسن تدريب ممكن: سيبه في الفيديو. الـ demo الضعيف: كله [[and this... and this...]] من غير ما تقول اليوزر بيستفيد إيه.`
        },
        {
          cmd: "من مكتوب لمتكلم",
          title: "تحوّل ملاحظاتك المكتوبة لكلام طبيعي: جمل أقصر و contractions وكلمات ربط",
          desc: R`كتير من اللي إنجليزيتهم ضعيفة بيكتبوا اللي هيقولوه الأول، ودي فكرة ممتازة. المشكلة إنهم بيقروه زي ما هو، فيبان «آلي» وتقيل. الكتابة والكلام ليهم قواعد مختلفة، فمحتاج تحوّل.

١) قسّم الجمل الطويلة: جملة الكتابة اللي فيها [[which]] و [[however]] وفاصلتين تبقى ٣ جمل قصيرة.
٢) contractions: [[it is]] ← [[it's]]، و [[we will]] ← [[we'll]]، و [[do not]] ← [[don't]].
٣) كلمات رسمية ← كلمات كلام: [[however]] ← [[but]]، و [[therefore]] ← [[so]]، و [[in order to]] ← [[to]]، و [[utilize]] ← [[use]]، و [[approximately]] ← [[about]]، و [[regarding]] ← [[about]].
٤) ابدأ بكلمة ربط: [[So,]] و [[Basically,]] و [[Also,]] و [[The thing is,]].
٥) متحفظش جمل: احفظ النقط (bullets) بس، وقول الجمل كل مرة من جديد.`,
          example: R`Written:  The migration, which was scheduled for Friday, has been postponed due to issues identified in staging.
Spoken:  So, the migration was planned for Friday. But we found some issues on staging. So we're moving it.
Written:  It is recommended that we utilize a queue in order to process the emails asynchronously.
Spoken:  I think we should use a queue. That way the emails go out in the background.
Written:  However, this approach will not scale; therefore, an alternative is required.
Spoken:  The thing is, this won't scale. So we need another approach.
Written:  Regarding the deadline, approximately two additional days will be needed.
Spoken:  About the deadline: I'll need about two more days.
Notes, not sentences:  migration → moved (staging issues) → new date Tue → need QA sign-off`,
          try: R`خد رسالة أو وصف PR كتبته بالإنجليزي (أو فقرة من README)، وحوّلها لكلام بالـ ٥ خطوات. اكتب النسخة المتكلمة، وبعدين اكتب النقط بس (bullets زي آخر سطر). ارمي النسخة المكتوبة، وسجّل نفسك وانت بتقول الكلام من النقط بس.`,
          flag: "script",
          deep: {
            why: R`اللي بيقرا نص رسمي في اجتماع بيبان متوتر وبعيد، والناس بتفصل. واللي بيتكلم بجمل قصيرة بسيطة بيبان واثق، حتى لو فيه غلطات grammar. وحاجة مهمة: الجمل القصيرة أسهل كمان في النطق والتنفس، فالتوتر بيقل.`,
            how: R`اختبار سريع: لو الجملة أطول من نَفَس واحد، قسّمها. ولو فيها كلمة عمرك ما سمعتها في مكالمة ([[henceforth]] و [[aforementioned]] و [[kindly]])، غيّرها.

الأمريكان والبريطانيين في الشغل بيتكلموا بسيط جدًا: [[So basically we need to...]] و [[The thing is...]] و [[Here's the problem...]] و [[Long story short...]] (من الآخر). ودي جمل بتديك ثانية تفكر في الجملة الجاية.

الـ passive في الكتابة ([[has been postponed]]) بيتحول active في الكلام ([[we're moving it]]). والكلام بيقول مين: [[we]] و [[I]] و [[the client]].

الـ bullets: كلمة أو اتنين لكل فكرة، وأسهم للترتيب. الورقة دي مسموح تبص عليها في الاجتماع. النص الكامل ممنوع.`,
            when: "قبل أي اجتماع مهم، أو presentation، أو demo، أو انترفيو: اكتب، وحوّل، واحتفظ بالنقط بس.",
            mistakes: R`تقرا نص مكتوب بصوت رتيب وعينك على الورقة. تحفظ كلمة بكلمة وتتوه لو حد قاطعك. تستخدم [[however]] و [[therefore]] في كل جملة. و [[kindly note that]] في الكلام (رسمية جدًا وغريبة). والعكس: كلام «عامي» زيادة ([[gonna]] و [[wanna]] مقبولين في الكلام بس ركز على الوضوح الأول).`
          },
          teach: R`## الفكرة: نفس المعنى، جمل أقصر وكلمات أبسط

المثال ٤ أزواج «Written / Spoken» وسطر نقط. في كل زوج هنشوف إيه اللي اتغير بالظبط.

---

## ١. الزوج الأول: الجملة الطويلة اتقسمت

| المكتوب | المتكلم |
|---|---|
| [[The migration, which was scheduled for Friday, has been postponed due to issues identified in staging.]] | [[So, the migration was planned for Friday. But we found some issues on staging. So we're moving it.]] |

اللي اتغير: [[which]] اتشالت والجملة بقت ٣. و passive ([[has been postponed]]) بقى active بفاعل ([[we're moving it]]). و [[due to]] بقت [[But]]. و [[So]] في الأول بتدّيك ثانية تفكر.

## ٢. الزوج التاني: كلمات رسمية اتشالت

[[It is recommended that we utilize a queue in order to process the emails asynchronously.]] ← [[I think we should use a queue. That way the emails go out in the background.]]

| رسمي | كلام |
|---|---|
| [[It is recommended that]] | [[I think we should]] |
| [[utilize]] | [[use]] |
| [[in order to]] | [[to]] أو جملة جديدة |
| [[asynchronously]] | [[in the background]] |

[[That way]] = كده (عشان كده). بتربط الفكرة بالنتيجة ببساطة.

## ٣. الزوج التالت: however و therefore

[[However, this approach will not scale; therefore, an alternative is required.]] ← [[The thing is, this won't scale. So we need another approach.]]

[[However]] بقت [[The thing is]]، و [[therefore]] بقت [[So]]، و [[will not]] بقت [[won't]] (contraction). و [[scale]] = يستحمل زيادة الحمل.

## ٤. الزوج الرابع: regarding و approximately

[[Regarding the deadline, approximately two additional days will be needed.]] ← [[About the deadline: I'll need about two more days.]]

[[Regarding]] و [[approximately]] الاتنين بقوا [[about]]، و [[additional]] بقت [[more]]، والـ passive ([[will be needed]]) بقى [[I'll need]].

## ٥. النقط (آخر سطر)

~~~text Notes, not sentences
migration → moved (staging issues) → new date Tue → need QA sign-off
~~~

دي اللي تحتفظ بيه قدامك في الاجتماع: كلمات وأسهم. [[Tue]] = Tuesday، و [[QA sign-off]] = موافقة فريق الاختبار. من النقط دي بتقول الكلام كل مرة بجمل جديدة، فمش بتبان بتقرا.

---

## الخلاصة

| المكتوب | المتكلم |
|---|---|
| جملة بـ which وفواصل | ٣ جمل قصيرة |
| passive | we / I + فعل |
| however / therefore | but / so / the thing is |
| utilize / approximately / regarding | use / about / about |
| it is / will not | it's / won't |

احفظ النقط مش النص.`,
          lines: [
            R`مكتوب: جملة طويلة فيها which و passive و due to.`,
            R`متكلم: ٣ جمل قصيرة، و we بدل passive، و so و but.`,
            R`مكتوب: It is recommended و utilize و in order to.`,
            R`متكلم: I think we should use. و That way = كده.`,
            R`مكتوب: However و therefore.`,
            R`متكلم: The thing is و So. و won't بدل will not.`,
            R`مكتوب: Regarding و approximately و additional.`,
            R`متكلم: About و about و more. بسيطة ومباشرة.`,
            R`النقط اللي تحتفظ بيها: كلمات وأسهم، مش جمل.`
          ],
          sol: R`مثال: الرسالة المكتوبة [[We have identified the root cause of the login failures, which was related to an expired certificate. It has been renewed, and monitoring has been added to prevent recurrence.]]

المتكلمة: [[So, we found out why login was failing. Basically, a certificate expired. We renewed it, and it's working now. We also added monitoring, so we'll get an alert before it happens again.]]

النقط: [[login failing → cert expired → renewed → working → added alert]]

راجع التسجيل: قلت الكلام من النقط بس؟ الجمل قصيرة؟ فيها [[so]] و [[basically]]؟ لو التسجيل طالع نفس النسخة المكتوبة كلمة بكلمة، انت حفظت؛ جرّب تقوله مرة تانية بكلام مختلف شوية.`
        }
      ]
    },
    {
      t: "تقديرات وخلاف وتاخد دورك في الاجتماع",
      l: 2,
      n: "تدّي تقدير من غير ما تتزنق، و «That's doable, but...»، وتختلف بأدب، وتقول «مش عارف» صح، وتقاطع وتاخد دورك، وتلخّص الاجتماع بـ action items",
      items: [
        {
          cmd: "estimates",
          title: "«How long will it take?»: تدّي تقدير بافتراضات ومدى، مش رقم واحد",
          desc: R`أصعب سؤال في الاجتماع للـ junior: [[How long will this take?]]. والغلطتين المشهورتين: رقم متفائل جدًا عشان تبان سريع ([[One day!]])، أو [[I don't know]] وخلاص.

الإجابة الصح فيها ٣ حاجات: مدى مش رقم ([[two to three days]])، وافتراض ([[assuming the API is ready]])، ومخاطرة لو فيه ([[if we need to change the schema, add a day]]). ولو محتاج تفكر: [[Let me look into it and give you an estimate by end of day.]] دي إجابة محترمة جدًا.

كلمات التقدير: [[roughly]] و [[about]] و [[around]] (تقريبًا)، و [[a ballpark]] (رقم تقريبي جدًا: [[Can you give me a ballpark?]])، و [[at least]] و [[at most]]، و [[best case / worst case]]، و [[realistically]] (بواقعية).`,
          example: R`Q: How long do you think this will take?
A: Roughly two to three days, assuming the design is final.
A: If we also need to change the database schema, I'd add another day.
A: Best case, I can have it done by Wednesday. Realistically, Thursday.
A: I'm not sure yet. Let me look into it and give you an estimate by end of day.
Q: Can you give me a ballpark?
A: A ballpark would be one to two weeks, but I'd like to break it down first.
A: The unknown part is the payment provider. I haven't worked with their API before.
A: I'll update you tomorrow if it looks bigger than I thought.`,
          try: R`خد ٣ فيتشرز من مشروعك أو من «تاب المشاريع» (مثلًا: login بـ Google، أو export لـ CSV، أو notifications)، ولكل واحدة قول بصوت عالي تقدير فيه: مدى، وافتراض، ومخاطرة. وبعدين قول للأصعب فيهم جملة «مش متأكد، هرجعلك».`,
          flag: "script",
          deep: {
            why: R`التقديرات هي أكتر مصدر لفقدان الثقة في المبرمجين: وعد بيوم، وخلص في أسبوع. والتقدير اللي فيه افتراضات بيحميك: لو الافتراض اتكسر (التصميم اتغير)، الكل عارف إن التقدير اتغير. ودي مش فهلوة، دي الطريقة المهنية.`,
            how: R`قبل ما ترد: قسّم في دماغك (أو على ورقة) الحاجة لأجزاء، وقدّر كل جزء، وجمّعهم، وزوّد هامش للمجهول (المبرمجين عمومًا بيقللوا التقدير).

عبارات الافتراض: [[assuming...]]، و [[as long as...]]، و [[if ... , then ...]]، و [[that depends on...]].

عبارات المجهول: [[The unknown part is...]]، و [[I haven't worked with X before]]، و [[That's the risky part]].

الـ follow-up: [[I'll update you if it looks bigger]]. ولو فعلًا طلع أكبر، قول بدري (درس [[follow up و تأخير]] في «تاب إنجليزي للمبرمج: قراية وكتابة»).

ولو حد ضغط ([[Can't you do it in one day?]]): درس «That's doable, but» الجاي.

وخلي بالك من الفرق: [[effort]] (قد إيه شغل: ٣ أيام شغل) و [[duration]] (هيخلص إمتى: لو عندك تاسكات تانية، ٣ أيام شغل ممكن تبقى أسبوع).`,
            when: "sprint planning، ولما مديرك أو العميل يسأل «هتخلص إمتى؟»، وفي الانترفيو (take-home: «how long did it take you?»).",
            mistakes: R`[[Tomorrow inshallah]] لحاجة كبيرة. و [[I don't know]] من غير «هرجعلك». ورقم واحد من غير افتراض. و [[It's easy]] (أخطر جملة: كل حاجة easy لحد ما تبدأ). وتقدير effort على إنه duration. و [[2-3 days]] وبعدين تسكت ومتقولش لما يطلع ٥.`
          },
          teach: R`## الفكرة: مدى + افتراض + مخاطرة، أو «هرجعلك»

المثال حوار: سؤالين (Q) وردود (A) بتوري ٤ أنواع إجابات: تقدير كامل، وأحسن حالة/واقعي، وهرجعلك، ورقم تقريبي.

---

## ١. التقدير الكامل (السطر ٢ و ٣)

~~~text A
Roughly two to three days, assuming the design is final.
If we also need to change the database schema, I'd add another day.
~~~

| الحتة | وظيفتها |
|---|---|
| [[Roughly]] | تقريبًا: بيقول إنه تقدير مش وعد |
| [[two to three days]] | مدى مش رقم واحد |
| [[assuming the design is final]] | افتراض: لو اتكسر، التقدير اتغير |
| [[If we also need to..., I'd add another day.]] | مخاطرة بتمنها. [[I'd]] = I would |

## ٢. أحسن حالة وواقعي (السطر ٤)

[[Best case, I can have it done by Wednesday. Realistically, Thursday.]]: [[Best case]] = أحسن حالة، و [[Realistically]] = بواقعية «ري-أ-**لِس**-تِك-لي». و [[have it done by]] = تبقى خلصانة قبل.

## ٣. مش عارف لسه (السطر ٥)

[[I'm not sure yet. Let me look into it and give you an estimate by end of day.]]: [[look into it]] = أبص عليها وأدرسها. ده رد محترم جدًا، بشرط تدّي ميعاد ([[by end of day]]) وترجع فعلًا. و [[estimate]] الاسم «**إس**-تِ-مِت»، والفعل «**إس**-تِ-ميْت».

## ٤. الرقم التقريبي (السطر ٦ و ٧)

[[Can you give me a ballpark?]] = رقم تقريبي جدًا. الرد: [[A ballpark would be one to two weeks, but I'd like to break it down first.]]: [[break it down]] = أقسّمها لأجزاء.

## ٥. المجهول والمتابعة (آخر سطرين)

[[The unknown part is the payment provider. I haven't worked with their API before.]]: [[The unknown part]] = الجزء المجهول. و [[I'll update you tomorrow if it looks bigger than I thought.]]: وعد بالمتابعة.

---

## الخلاصة

| الحتة | الكلمة |
|---|---|
| تقريبي | [[roughly]] / [[about]] / [[a ballpark]] |
| مدى | [[two to three days]] |
| افتراض | [[assuming...]] |
| مخاطرة | [[If ..., I'd add...]] |
| مش عارف | [[Let me look into it and get back to you by...]] |

[[It's easy]] و [[Tomorrow inshallah]] لحاجة كبيرة: أخطر جملتين.`,
          lines: [
            R`السؤال: «تفتكر هتاخد قد إيه؟»`,
            R`مدى + افتراض: «تقريبًا ٢ لـ ٣ أيام، بافتراض إن التصميم نهائي».`,
            R`مخاطرة: «لو كمان محتاجين نغير الـ schema، هزوّد يوم».`,
            R`أحسن حالة وواقعي: «أحسن حالة الأربع، بواقعية الخميس».`,
            R`«مش متأكد لسه. هبص عليها وأديك تقدير آخر اليوم».`,
            R`«ممكن رقم تقريبي؟» ballpark = تقريبي جدًا.`,
            R`«رقم تقريبي أسبوع لاتنين، بس عايز أقسّمها الأول». break it down = أقسّمها.`,
            R`«الجزء المجهول هو مزوّد الدفع. مشتغلتش مع الـ API بتاعهم قبل كده».`,
            R`«هبلّغك بكرة لو طلعت أكبر من اللي فاكره».`
          ],
          sol: R`نماذج:
[[Login with Google: about one day, assuming we use the library we already have for auth. If we need to merge accounts with the same email, add half a day.]]
[[Export to CSV: a few hours for the basic version. If it has to handle 100,000 rows, I'd need to stream it, so maybe a day.]]
[[Notifications: I'm not sure yet. It depends on whether we need push notifications or just email. Let me look into it and get back to you tomorrow.]]

راجع: كل تقدير فيه مدى أو [[about]]؟ فيه [[assuming]] أو [[if]]؟ والأخير فيه وعد برد بميعاد؟ الإجابة الضعيفة: [[One day]] للتلاتة.`
        },
        {
          cmd: "That's doable, but",
          title: "«That's doable, but...»: تقول لأ أو تتفاوض على الوقت في الاجتماع",
          desc: R`الدرس المكتوب في [[تقول لأ بأدب]] في «تاب إنجليزي للمبرمج: قراية وكتابة». هنا نفس الفكرة بالكلام، في اجتماع، والكل بيبصلك. والفرق إنك مفيش وقت تفكر، فمحتاج جمل «تشتري» بيها ثانيتين وتفتح التفاوض.

الجملة الأشهر: [[That's doable, but...]] = ممكن، بس.... بتقول «آه» وبعدين الشرط أو التمن. وأخواتها: [[I can do that if...]]، و [[That would mean...]] (يعني كده...)، و [[Something would have to give]] (حاجة لازم تتشال)، و [[What's the priority?]].

والفكرة الأساسية زي المكتوب: متقولش «لأ» ناشفة، ومتقولش «آه» وانت عارف إنها مستحيلة. قول التمن واسيبهم يختاروا.`,
          example: R`That's doable, but it means the search feature moves to next sprint.
I can do that by Friday if we skip the admin export for now.
That would mean cutting the tests, and I'd rather not do that for payments.
Hmm, that's tight. Can I get back to you after I check the API docs?
I see why it's important. What if we ship a simple version on Friday and improve it next week?
If we add this, something else has to give. Which one is more important?
To be honest, I don't think Friday is realistic. Tuesday is more likely.
I'm happy to try, but I want to flag the risk now rather than on Thursday.`,
          try: R`تخيّل مديرك قالك في اجتماع: [[Can we also add dark mode before the release on Thursday?]] ودا محتاج يومين وانت عندك يوم ونص. قول بصوت عالي ٣ ردود مختلفة (سجّلهم): واحد بـ [[That's doable, but...]]، وواحد بـ [[What if we...]]، وواحد بـ [[To be honest...]].`,
          flag: "script",
          deep: {
            why: R`في مصر ثقافة «حاضر» قوية، وفي فرق برا دي بتتفهم «وعد». ولو الوعد ماتنفذش، الثقة بتقع. واللي بيقول التمن في الاجتماع، قدام الكل، بيبان senior وبيحمي نفسه والفريق.`,
            how: R`اشتري وقت: [[Hmm, let me think.]]، و [[That's tight.]] (ضيق)، و [[Good question.]]. وبعدين الجملة.

التمن: [[That means X moves to next sprint]]، و [[We'd have to skip X]]، و [[The risk is Y]]، و [[It would cost us Z]].

البديل: [[What if we...?]]، و [[How about a simpler version first?]]، و [[Could we do X now and Y later?]]، و [[An MVP by Friday, the full thing next week.]]

الأولوية: [[Which one is more important?]]، و [[What's the priority here?]]. دي بترجع القرار للي عنده السلطة.

التحذير: [[I want to flag a risk...]] = عايز أنبه لخطر. و [[rather than on Thursday]] = بدل ما أقولها الخميس. دي بتوري إنك بتفكر قدام.

والنبرة: هادية، ومش دفاعية. ابتسامة صغيرة مع [[That's tight]] بتفرق.`,
            when: "planning، ولما حد يزود scope في نص الـ sprint، ولما يتطلب deadline مش واقعي.",
            mistakes: R`[[Impossible!]] (درامية). و [[OK]] وانت عارف إنها مستحيلة. و [[I will try]] (بتتفهم «آه»). ودفاع طويل عن نفسك ([[Because I have too much work and nobody helps me and...]]). و [[No, I can't]] من غير بديل ولا سبب.`
          },
          teach: R`## الفكرة: متقولش لأ ومتقولش آه: قول التمن وسيبهم يختاروا

المثال ٨ ردود على طلب مستعجل. كل رد بيستخدم تركيبة مختلفة.

---

## ١. التركيبات واحدة واحدة

| الجملة | التركيبة | معناها |
|---|---|---|
| [[That's doable, but it means the search feature moves to next sprint.]] | [[That's doable, but it means...]] | ممكن، بس التمن كذا |
| [[I can do that by Friday if we skip the admin export for now.]] | [[I can ... if we ...]] | ممكن بشرط |
| [[That would mean cutting the tests, and I'd rather not do that for payments.]] | [[That would mean...]] + [[I'd rather not]] | يعني كذا، وأفضّل لأ |
| [[Hmm, that's tight. Can I get back to you after I check the API docs?]] | [[that's tight]] + وقت | ضيق، أرجعلك |
| [[I see why it's important. What if we ship a simple version on Friday and improve it next week?]] | [[What if we...?]] | بديل |
| [[If we add this, something else has to give. Which one is more important?]] | [[something has to give]] + أولوية | لازم نشيل حاجة، أنهي؟ |
| [[To be honest, I don't think Friday is realistic. Tuesday is more likely.]] | [[To be honest]] | بصراحة + بديل |
| [[I'm happy to try, but I want to flag the risk now rather than on Thursday.]] | [[flag the risk]] | أنبّه للخطر بدري |

## ٢. كلمات محتاجة شرح

- [[doable]] «**دو**-أ-بل» = ممكن يتعمل.
- [[tight]] = ضيق (وقت).
- [[ship]] = ننزّل للناس.
- [[something has to give]] = تعبير: حاجة لازم تتضحى بيها.
- [[I'd rather not]] = أفضّل منعملش (مؤدبة أكتر من [[I don't want]]).
- [[flag]] كفعل = أعلّم على / أنبّه.
- [[rather than]] = بدل.

## ٣. ليه التركيبات دي شغالة

كل جملة فيها حاجتين: **آه بشكل ما** (doable، I can، happy to try)، و **تمن أو بديل**. كده انت مش بترفض، وفي نفس الوقت مش بتوعد بحاجة مستحيلة. والقرار بيرجع للي عنده السلطة ([[Which one is more important?]]).

---

## الخلاصة

- اشتري وقت: [[Hmm, that's tight.]]
- قول التمن: [[That's doable, but it means...]]
- اقترح: [[What if we...?]]
- رجّع القرار: [[Which one is more important?]]
- ابعد عن [[I will try]] (بتتفهم «آه»)، و [[Impossible!]] (درامية).`,
          lines: [
            R`«ممكن، بس يعني البحث هيتنقل للـ sprint الجاي». doable = ممكن يتعمل.`,
            R`«أقدر أخلصها الجمعة لو أجّلنا الـ admin export دلوقتي».`,
            R`«ده معناه نشيل الاختبارات، وأفضّل منعملش كده في الدفع». rather not = أفضّل لأ.`,
            R`«امم، ده ضيق. ممكن أرجعلك بعد ما أشوف الـ docs؟» tight = ضيق.`,
            R`«فاهم إنها مهمة. إيه رأيك ننزّل نسخة بسيطة الجمعة ونحسّنها الأسبوع الجاي؟»`,
            R`«لو ضفنا دي، حاجة تانية لازم تتشال. أنهي أهم؟» something has to give = لازم تضحية.`,
            R`«بصراحة، مش شايف الجمعة واقعية. التلات أقرب».`,
            R`«مستعد أحاول، بس عايز أنبّه للخطر دلوقتي بدل الخميس». flag = أنبّه.`
          ],
          sol: R`٣ ردود نموذجية:
[[That's doable, but it means the notifications fix moves to after the release. Is that OK?]]
[[What if we ship dark mode for the main pages on Thursday, and the settings pages next week?]]
[[To be honest, I don't think a full dark mode is realistic by Thursday. It needs about two days, and I have one and a half. I'd rather do it properly next week.]]

راجع التسجيل: كل رد فيه تمن أو بديل؟ النبرة هادية؟ مفيش [[I will try]]؟ الإجابة الضعيفة: [[OK, I will try my best]]، ودي في الحقيقة وعد مش هيتنفذ.`
        },
        {
          cmd: "disagree بأدب",
          title: "تختلف في رأي تقني في اجتماع: «I see your point, but...»",
          desc: R`الخلاف التقني عادي وصحي في أي فريق كويس، والشركات برا بتتوقع منك تقول رأيك حتى لو junior. بس الطريقة بتفرق جدًا: الإنجليزي في الشغل «ناعم» أكتر من العربي. الجملة اللي بتتقال بالعربي عادي («لأ، ده غلط») بتتسمع بالإنجليزي عدوانية.

التركيبة: ١) اعترف بالرأي التاني: [[I see your point]] أو [[That makes sense]] أو [[I agree that...]]. ٢) قدّم رأيك كرأي مش كحقيقة: [[I'm not sure that...]] أو [[My concern is...]] أو [[I wonder if...]]. ٣) السبب أو الداتا. ٤) اقتراح أو سؤال: [[What if we...?]] أو [[Could we test both?]].

ولو القرار اتاخد عكس رأيك: [[OK, I'm happy to go with that.]] ده الـ «disagree and commit» اللي فيه درس كامل في «تاب الانترفيو»: [[disagree and commit]].`,
          example: R`I see your point, but I'm worried about the extra complexity.
That makes sense for now. My concern is what happens when we have ten times more users.
I agree that Redis would be faster. I'm just not sure we need it yet.
I wonder if we could solve this with an index first, before adding a cache.
Could we measure it first? Then we'll know if the query is really the problem.
I might be missing something, but wouldn't this break the mobile app?
I see it a bit differently. For me, the bigger risk is the migration, not the performance.
OK, fair enough. I'm happy to go with that. Let's revisit it if we see problems.`,
          try: R`اختار خلاف تقني حقيقي (مثلًا: tabs ولا spaces، أو REST ولا GraphQL، أو ORM ولا SQL خام، أو monorepo). سجّل نفسك وانت بترد على زميل رأيه عكسك في ٣–٤ جمل بالتركيبة الرباعية. وبعدين سجّل الجملة اللي بتقولها لو القرار اتاخد عكسك.`,
          flag: "script",
          deep: {
            why: R`الـ junior اللي عمره ما بيختلف بيبان مش بيفكر، واللي بيختلف بشكل ناشف بيبان صعب في الشغل. والتوازن ده من أهم حاجات الـ culture fit، ومتقيّم في الانترفيو بسؤال مباشر («tell me about a disagreement»، وليه قصة كاملة في درس «STAR: خلاف»).`,
            how: R`الـ softeners (مليّنات): [[I think]]، و [[I feel like]]، و [[maybe]]، و [[I'm not sure]]، و [[I might be wrong, but]]، و [[a bit]]. بتحوّل الحقيقة لرأي، ودي بتفتح نقاش بدل ما تقفله.

الأسئلة بدل الجمل: [[Wouldn't this break...?]] أقوى وألطف من [[This will break...]]. وسؤال [[What would happen if...?]] بيخلي التاني يكتشف المشكلة بنفسه.

الداتا: [[Could we measure it first?]]، و [[Do we have numbers on that?]]، و [[Let's try both and compare]]. الخلاف بالداتا بيتحل، الخلاف بالرأي بيطول.

الإنهاء: [[Fair enough]] = ماشي، منطقي. و [[Let's revisit it if...]] = نرجعلها لو.... و [[I'm happy to go with that]] = موافق أمشي بيها.

ولو الخلاف سخن: [[Maybe we can take this offline and come back with a proposal?]] = نكمّل بعدين بره الاجتماع.`,
            when: "code review بالصوت، و design discussions، و planning. مش في الـ standup (الـ standup للـ updates).",
            mistakes: R`[[No, you're wrong.]] و [[This is wrong.]] (ناشفة جدًا بالإنجليزي). و [[With all due respect...]] (بتتسمع إن اللي جاي إهانة!). و [[I am disagree]] (الصح [[I disagree]]، والأحسن [[I see it differently]]). وتسكت في الاجتماع وتشتكي بعده. وتفضل تجادل بعد ما القرار اتاخد.`
          },
          teach: R`## الفكرة: اعترف بالرأي التاني، وقدّم رأيك كقلق مش كحقيقة

المثال ٨ جمل، كل واحدة بتستخدم «مليّن» (softener) مختلف. هنفك كل واحدة لـ «اعتراف» و «رأي».

---

## ١. الجمل والتركيبة

| الجملة | الاعتراف | الرأي |
|---|---|---|
| [[I see your point, but I'm worried about the extra complexity.]] | [[I see your point]] | [[I'm worried about]] |
| [[That makes sense for now. My concern is what happens when we have ten times more users.]] | [[That makes sense for now]] | [[My concern is]] |
| [[I agree that Redis would be faster. I'm just not sure we need it yet.]] | [[I agree that]] | [[I'm just not sure]] |
| [[I wonder if we could solve this with an index first, before adding a cache.]] | | [[I wonder if]] = اقتراح لطيف |
| [[Could we measure it first? Then we'll know if the query is really the problem.]] | | سؤال بداتا |
| [[I might be missing something, but wouldn't this break the mobile app?]] | [[I might be missing something]] | سؤال بدل اتهام |
| [[I see it a bit differently. For me, the bigger risk is the migration, not the performance.]] | | [[I see it a bit differently]] |
| [[OK, fair enough. I'm happy to go with that. Let's revisit it if we see problems.]] | قبول القرار | [[revisit]] = نرجعلها |

## ٢. ليه السؤال أقوى من الجملة

[[wouldn't this break the mobile app?]] بتخلي التاني يفكر ويكتشف بنفسه. [[This will break the mobile app.]] بتخليه يدافع. نفس المعلومة، رد فعل مختلف.

و [[Could we measure it first?]]: الخلاف بالداتا بيتحل، الخلاف بالرأي بيطول.

## ٣. كلمات

[[concern]] «كَن-**سِرن**» = قلق. [[complexity]] «كَم-**پلِك**-سِ-تي». [[fair enough]] = منطقي، ماشي. [[go with]] = نمشي بـ.

---

## الخلاصة

| المرحلة | الجملة |
|---|---|
| اعتراف | [[I see your point]] / [[That makes sense]] |
| رأي | [[My concern is...]] / [[I wonder if...]] |
| داتا | [[Could we measure it first?]] |
| قبول | [[Fair enough. I'm happy to go with that.]] |

وابعد عن [[No, you're wrong]] و [[With all due respect]] (بتتسمع إن اللي جاي إهانة) و [[I am disagree]].`,
          lines: [
            R`«فاهم وجهة نظرك، بس قلقان من التعقيد الزيادة». I see your point = فاهمك.`,
            R`«منطقي دلوقتي. قلقي هو لما يبقى عندنا ١٠ أضعاف اليوزرز». concern = قلق.`,
            R`«موافق إن Redis أسرع. بس مش متأكد إننا محتاجينه دلوقتي».`,
            R`«بتساءل لو ممكن نحلها بـ index الأول، قبل ما نضيف cache». I wonder if = اقتراح لطيف.`,
            R`«ممكن نقيس الأول؟ ساعتها هنعرف لو الـ query هي المشكلة فعلًا».`,
            R`«يمكن فايتني حاجة، بس مش ده هيكسر تطبيق الموبايل؟» سؤال بدل اتهام.`,
            R`«أنا شايفها مختلف شوية. بالنسبالي الخطر الأكبر في الـ migration».`,
            R`«ماشي، منطقي. موافق نمشي بيها. نرجعلها لو شفنا مشاكل». revisit = نرجع نبص.`
          ],
          sol: R`مثال (ORM ولا SQL خام، وزميلك عايز SQL خام):
[[I see your point: raw SQL gives us more control, and it's faster for complex reports. My concern is that we're a small team, and Prisma gives us type safety and migrations for free. What if we use Prisma for most things and raw SQL just for the heavy reports?]]

ولو القرار اتاخد عكسك: [[OK, fair enough. I'm happy to go with raw SQL. Let's revisit it in a couple of months if the queries get hard to maintain.]]

راجع: فيه اعتراف بالرأي التاني؟ رأيك متقدم كـ «concern» مش حقيقة؟ فيه اقتراح؟ الإجابة الضعيفة: [[No, ORM is better because it's better.]]`
        },
        {
          cmd: "مش عارف في اجتماع",
          title: "حد سألك سؤال ومش عارف الإجابة: «I'm not sure, let me check»",
          desc: R`هيحصل كتير، خصوصًا في أول شغلك: حد في الاجتماع يسأل [[Why is this endpoint slow?]] أو [[What happens if the payment fails twice?]] وانت مش عارف. والغلطتين: إنك تخترع إجابة، أو تسكت وتتوتر.

الإجابة الصح: ١) قول إنك مش متأكد، بوضوح. ٢) قول اللي انت عارفه (لو فيه). ٣) قول هتعمل إيه وإمتى. [[I'm not sure, to be honest. I know the retry logic is in the webhook handler, but I haven't tested that case. Let me check and get back to you by tomorrow.]]

دي إجابة قوية جدًا، مش ضعيفة. الـ «I don't know» اللي معاها خطة هي أكتر حاجة بتبني ثقة. والإجابة المخترعة اللي بتطلع غلط هي أكتر حاجة بتهدها.`,
          example: R`Good question. I'm not sure, to be honest.
I don't know off the top of my head. Let me check and get back to you.
I know the retry logic is in the webhook handler, but I haven't tested that case.
My guess is it's the missing index, but I'd need to confirm that.
I'd rather not guess. I'll look into it after the call and update the ticket.
That's outside my area. Omar would know better. Omar, any idea?
I'll find out and post the answer in the channel by tomorrow morning.
I'm not sure what you mean by "sync". Do you mean the cron job or the webhook?`,
          try: R`اطلب من حد (أو AI) يسألك ٥ أسئلة تقنية صعبة عن مشروعك أو عن حاجة بتذاكرها، وجاوب على الأسئلة اللي مش متأكد منها بالتركيبة التلاتية (مش متأكد + اللي أعرفه + هعمل إيه). ممنوع تخترع. سجّل.`,
          flag: "script",
          deep: {
            why: R`في ثقافة الشغل برا، [[I don't know, but I'll find out]] جملة محترمة جدًا ومتوقعة. والتخمين اللي بيتقدم كحقيقة لما يطلع غلط بيخلّي الناس تشك في كل كلامك بعد كده. وفي الانترفيو، الإنترفيوير أحيانًا بيسأل سؤال عارف إنك مش هتعرفه عشان يشوف هتعمل إيه.`,
            how: R`عبارات «مش عارف»: [[I'm not sure]]، و [[I don't know off the top of my head]] (مش في دماغي دلوقتي)، و [[I'd need to check]]، و [[I haven't looked into that yet]].

عبارات «اللي أعرفه»: [[What I do know is...]]، و [[I know that..., but...]]، و [[My guess is..., but I'd need to confirm]] (تخمين معلن إنه تخمين = تمام).

عبارات الخطة: [[Let me check and get back to you]]، و [[I'll look into it after the call]]، و [[I'll find out and post it in the channel by...]]. والأهم: اعمل كده فعلًا.

توجيه لحد تاني: [[Omar would know better]]، و [[That's more of a question for the backend team]].

ولو السؤال نفسه مش واضح (مش الإجابة): اسأل عن السؤال ([[Do you mean X or Y?]]). ساعات بتكتشف إنك عارف الإجابة.`,
            when: "أي سؤال في اجتماع أو review أو انترفيو، مش متأكد من إجابته.",
            mistakes: R`تخترع إجابة بثقة. و [[I don't know]] وتسكت (من غير خطة). و [[It's not my fault]] أو [[Nobody told me]] (دفاعي). و [[I will search]] (الأوضح [[I'll look into it]]). وتقول [[let me check]] ومترجعش خالص: دي أسوأ من إنك متقولهاش.`
          },
          teach: R`## الفكرة: مش متأكد + اللي تعرفه + هتعمل إيه وإمتى

المثال ٨ جمل بتغطي الـ ٣ أجزاء، وتوجيه لحد تاني، وتوضيح السؤال نفسه.

---

## ١. «مش متأكد» (أول سطرين)

[[Good question. I'm not sure, to be honest.]]: [[Good question]] بتشتري ثانية، و [[to be honest]] بتخلي الاعتراف واضح. و [[I don't know off the top of my head. Let me check and get back to you.]]: [[off the top of my head]] = من الذاكرة حالًا. و [[get back to you]] = أرجعلك.

## ٢. «اللي أعرفه» (السطر ٣ و ٤)

| الجملة | التركيبة |
|---|---|
| [[I know the retry logic is in the webhook handler, but I haven't tested that case.]] | [[I know..., but I haven't...]] |
| [[My guess is it's the missing index, but I'd need to confirm that.]] | تخمين معلن إنه تخمين |

[[My guess is... but I'd need to confirm]] = مسموح تخمّن، بشرط تقول إنه تخمين. المشكلة في التخمين اللي بيتقدم كحقيقة.

## ٣. «هعمل إيه» (السطر ٥ و ٧)

[[I'd rather not guess. I'll look into it after the call and update the ticket.]] و [[I'll find out and post the answer in the channel by tomorrow morning.]]: فعل محدد ([[update the ticket]] و [[post in the channel]]) + ميعاد ([[by tomorrow morning]]). [[find out]] = أعرف.

## ٤. حد تاني يعرف (السطر ٦)

[[That's outside my area. Omar would know better. Omar, any idea?]]: [[outside my area]] = برا تخصصي. وبتوجّه السؤال بالاسم.

## ٥. السؤال نفسه مش واضح (آخر سطر)

[[I'm not sure what you mean by "sync". Do you mean the cron job or the webhook?]]: [[what you mean by X]] (ترتيب عادي لأنه جوه جملة). وسؤال اختيار ([[X or Y?]]) أسهل يتجاوب.

---

## الخلاصة

| الجزء | الجملة |
|---|---|
| مش متأكد | [[I'm not sure, to be honest.]] |
| اللي أعرفه | [[What I do know is...]] / [[My guess is..., but I'd need to confirm.]] |
| الخطة | [[Let me check and get back to you by...]] |
| حد تاني | [[X would know better.]] |

وأهم حاجة: لو قلت [[let me check]]، ارجع فعلًا.`,
          lines: [
            R`«سؤال حلو. مش متأكد بصراحة». بيشتري ثانية ويعترف.`,
            R`«مش في دماغي دلوقتي. هشوف وأرجعلك». off the top of my head = من الذاكرة حالًا.`,
            R`اللي تعرفه: «عارف إن الـ retry في الـ webhook handler، بس مجربتش الحالة دي».`,
            R`تخمين معلن: «تخميني إنه الـ index الناقص، بس محتاج أتأكد».`,
            R`«أفضّل مخمّنش. هبص عليها بعد المكالمة وأحدّث التيكت».`,
            R`«دي برا منطقتي. عمر هيعرف أحسن. عمر، عندك فكرة؟»`,
            R`«هعرف وأكتب الإجابة في القناة قبل بكرة الصبح».`,
            R`السؤال مش واضح: «مش فاهم قصدك بـ sync. قصدك الـ cron job ولا الـ webhook؟»`
          ],
          sol: R`مثال لسؤال صعب: [[How would your app handle 10,000 users at the same time?]]
إجابة كويسة: [[To be honest, I haven't load-tested it, so I'm not sure. What I do know is that the database has indexes on the main queries, and the API is stateless, so we could run more instances. My guess is the first bottleneck would be the database connections, but I'd need to test that with a tool like k6 to confirm.]]

راجع: ولا إجابة مخترعة؟ كل «مش عارف» معاها حاجة تعرفها أو خطة؟ التسجيل الضعيف: [[Yes, it can handle it]] من غير أي أساس، أو [[I don't know]] وسكوت.`
        },
        {
          cmd: "تقاطع وتاخد دورك",
          title: "تاخد دورك في الكلام وتقاطع بأدب: «Can I jump in?» و «Sorry, go ahead»",
          desc: R`في اجتماع فيه ٥–٦ أشخاص بيتكلموا إنجليزي بسرعة، الـ junior اللي إنجليزيته ضعيفة غالبًا بيفضل ساكت لأنه مستني «فرصة». والفرصة مش هتيجي لوحدها. محتاج جمل تدخل بيها الكلام بأدب.

الدخول: [[Can I jump in here?]] أو [[Sorry to interrupt, but...]] أو [[Can I add something?]] أو [[Just a quick question...]]. ولو في Zoom أو Meet: استخدم زرار «raise hand» أو اكتب في الشات [[Quick question when there's a moment]].

لما حد يقاطعك: [[Sorry, can I just finish this point?]] (بأدب، وبنبرة هادية). ولما تتكلموا مع بعض: [[Sorry, go ahead]].

والرجوع لنقطة فاتت: [[Going back to what Sara said...]] أو [[Just to go back to the caching point for a second...]].`,
          example: R`Can I jump in here for a second?
Sorry to interrupt, but I think that affects the mobile app too.
Can I add something? We had the same problem last month.
Just a quick question before we move on: who owns the migration?
Sorry, can I just finish this point? It's quick.
Oh sorry, go ahead. / No, please, you go first.
Going back to what Sara said about caching, I think she's right.
Building on Omar's idea, what if we also log the failed payments?
I haven't heard from Lina yet. Lina, what do you think?`,
          try: R`اتفرج على podcast أو panel تقني على YouTube فيه ٣ أشخاص أو أكتر بيتكلموا (مثلًا من Syntax أو أي مؤتمر). كل ما حد يقاطع حد أو ياخد دوره، وقّف واكتب الجملة اللي استخدمها. وبعدين قول ٥ جمل من المثال بصوت عالي بنبرة واثقة، وسجّل.`,
          flag: "script",
          deep: {
            why: R`اللي مبيتكلمش في الاجتماعات بيبان مش فاهم أو مش مهتم، حتى لو هو أشطر واحد في الفريق. وفي تقييمات الأداء، «communication» و «visibility» بيتحسبوا. والجمل دي بتخليك تدخل الكلام من غير ما تبان قليل الذوق.`,
            how: R`التوقيت: ادخل في آخر جملة حد، مش في نصها. استنى نفَس أو سكتة صغيرة. ولو الكلام ماشي بسرعة، [[Can I jump in?]] بصوت أعلى شوية، وبعدين استنى ثانية.

[[Building on...]] = بكمّل على فكرة فلان: ألطف طريقة تدخل بيها لأنك بتدعم حد مش بتعارضه.

[[Going back to...]] = مفيدة جدًا للي بيفكر ببطء بالإنجليزي: مش لازم ترد على طول، ممكن ترجع للنقطة بعد دقيقتين.

والعكس: لو انت اللي بتدير الاجتماع أو شايف حد ساكت: [[I haven't heard from X yet. What do you think?]] دي بتبين إنك team player.

في الشات: كتير من الاجتماعات الـ remote الناس بتكتب في الشات وهي بتسمع. ده مكان كويس لو الكلام صعب عليك: [[+1 to Sara's point]] أو [[Quick question: ...]].`,
            when: "أي اجتماع فيه أكتر من ٣ أشخاص: planning، و retro، و design review.",
            mistakes: R`تسكت الاجتماع كله. تقاطع في نص جملة حد من غير [[sorry]]. و [[Wait wait wait]] (بتتسمع حادة). و [[Let me talk]] (أمر). وتتكلم مع حد في نفس الوقت وتكمّل بدل ما تقول [[sorry, go ahead]]. وتبدأ نقطة جديدة خالص وسط نقاش تاني من غير [[before we move on]] أو [[on a different topic]].`
          },
          teach: R`## الفكرة: جملة دخول مؤدبة، وجملة تحمي دورك، وجملة ترجع بيها لنقطة فاتت

المثال ٩ جمل لـ ٤ مواقف: تدخل الكلام، وحد قاطعك، واتكلمتوا مع بعض، وتبني على كلام حد أو تدّي حد دوره.

---

## ١. تدخل الكلام (أول ٤ سطور)

| الجملة | قوتها |
|---|---|
| [[Can I jump in here for a second?]] | الأشهر. [[jump in]] = أدخل الكلام |
| [[Sorry to interrupt, but I think that affects the mobile app too.]] | أقوى، لحاجة مهمة. الأهمية للي بعد [[but]] |
| [[Can I add something? We had the same problem last month.]] | لطيفة، بتضيف مش بتعارض |
| [[Just a quick question before we move on: who owns the migration?]] | [[before we move on]] = قبل ما نكمّل. و [[owns]] = مسؤول عن |

[[interrupt]] «إن-تَ-**رَپت**» الضغط على الآخر.

## ٢. حد قاطعك (السطر ٥)

[[Sorry, can I just finish this point? It's quick.]]: بأدب ونبرة هادية. [[just]] بتليّن الطلب. و [[It's quick]] بتطمّنه.

## ٣. اتكلمتوا في نفس الوقت (السطر ٦)

[[Oh sorry, go ahead.]] أو [[No, please, you go first.]]

## ٤. تبني وترجع وتدّي دور (آخر ٣ سطور)

| الجملة | الأداة | ليه مفيدة |
|---|---|---|
| [[Going back to what Sara said about caching, I think she's right.]] | [[Going back to...]] | مش لازم ترد على طول؛ ترجع للنقطة بعد دقيقتين |
| [[Building on Omar's idea, what if we also log the failed payments?]] | [[Building on...]] | بتدعم حد وتضيف |
| [[I haven't heard from Lina yet. Lina, what do you think?]] | تدّي حد دوره | بتوري إنك team player |

[[Going back to]] بالذات مفيدة للي بيفكر بالإنجليزي ببطء: بتشيل ضغط «لازم أرد دلوقتي».

---

## الخلاصة

| الموقف | الجملة |
|---|---|
| تدخل | [[Can I jump in here?]] |
| مهم | [[Sorry to interrupt, but...]] |
| حد قاطعك | [[Sorry, can I just finish this point?]] |
| اتكلمتوا مع بعض | [[Sorry, go ahead.]] |
| نقطة فاتت | [[Going back to what X said...]] |

ادخل في آخر جملة حد، مش في نصها. ومرة واحدة في الاجتماع كفاية كبداية.`,
          lines: [
            R`«ممكن أدخل هنا ثانية؟» jump in = أدخل الكلام.`,
            R`«آسف إني بقاطع، بس أظن ده بيأثر على تطبيق الموبايل كمان».`,
            R`«ممكن أضيف حاجة؟ حصلتلنا نفس المشكلة الشهر اللي فات».`,
            R`«سؤال سريع قبل ما نكمّل: مين مسؤول عن الـ migration؟» owns = مسؤول عن.`,
            R`لما حد يقاطعك: «آسف، ممكن أكمّل النقطة دي؟ سريعة».`,
            R`لما تتكلموا مع بعض: «آسف، اتفضل» أو «لا، اتفضل انت الأول».`,
            R`«نرجع لكلام سارة عن الـ caching، أظن معاها حق».`,
            R`«بناءً على فكرة عمر، إيه رأيكم نسجّل كمان الدفعات الفاشلة؟» building on = بكمّل على.`,
            R`تدّي حد تاني دور: «لسه مسمعناش من لينا. لينا، رأيك إيه؟»`
          ],
          sol: R`الجمل اللي هتلاقيها في الـ podcasts: [[Can I jump in?]]، و [[Yeah, and also...]]، و [[To add to that...]]، و [[Sorry, go ahead]]، و [[I was going to say...]]، و [[Right, right, and...]]. لاحظ إنهم بيستخدموا [[Yeah, and...]] كتير عشان يدخلوا: ده بيدعم الكلام قبل ما يضيف.

التسجيل الواثق: [[Can I jump in here?]] بنبرة طالعة وسرعة عادية، مش مهموسة. و [[Sorry to interrupt, but...]] بتتقال بسرعة، الأهمية للي بعد [[but]].

علامة التحسن الحقيقية: في الاجتماع الجاي، اتكلم مرة واحدة على الأقل بجملة من دول. مرة واحدة كفاية للأسبوع الأول.`
        },
        {
          cmd: "So to recap",
          title: "تلخّص آخر الاجتماع: «So to recap...» و action items ومين هيعمل إيه",
          desc: R`أكتر مهارة بتفرق بين حد «حاضر» وحد «بيقود» في أي اجتماع: التلخيص في الآخر. دقيقة واحدة بتقول فيها: قررنا إيه، ومين هيعمل إيه، وإمتى. ولو انت الـ junior اللي بيعمل ده، ده بيتلاحظ جدًا.

الجمل: [[So to recap...]] أو [[Just to summarize...]] أو [[Before we wrap up, let me make sure we're on the same page]]. وبعدين: [[We agreed that...]]، و [[Action items: ...]]، و [[I'll ... by ...]]، و [[Omar will ...]]، و [[The open question is ...]]. وآخرها: [[Did I miss anything?]] و [[I'll post the notes in the channel.]]

وخلي بالك: التلخيص بتاعك لازم يكون بـ «مين» و «إمتى»: [[someone should look at the logs]] مش action item. [[Omar will check the logs by Wednesday]] هو الـ action item.`,
          example: R`OK, before we wrap up, let me quickly recap.
We agreed to go with cursor pagination and skip the page numbers for now.
Action items: I'll update the API and open a PR by Wednesday.
Omar will check how the mobile app uses the endpoint.
Sara will ask the product team if page numbers are a must-have.
The open question is whether we need to support old app versions.
Did I miss anything?
Great. I'll post the notes in the channel after the call.
Thanks, everyone!`,
          try: R`اتفرج على أي اجتماع أو podcast تقني ١٠ دقايق (أو استخدم آخر اجتماع حضرته)، واكتب recap بالشكل ده: قرار واحد، و ٣ action items (مين + إيه + إمتى)، وسؤال مفتوح. قوله بصوت عالي في أقل من دقيقة، وبعدين اكتبه كرسالة Slack.`,
          flag: "script",
          deep: {
            why: R`اجتماعات كتير بتخلص والكل فاكر إن حد تاني هيعمل الحاجة. والتلخيص بيمنع ده. واللي بيلخّص بيتشاف إنه منظم وفاهم، وده بيسرّع الترقية. وكمان للي إنجليزيته ضعيفة: التلخيص بيخليك تتأكد إنك فهمت الاجتماع صح (لو غلط، هيصححوك).`,
            how: R`اكتب وانت بتسمع: ٣ عناوين على ورقة: Decisions و Actions و Questions. كل ما حد يقول [[OK, let's do that]] دي decision. كل ما حد يقول [[I'll...]] أو [[Can you...]] دي action. وقرب الآخر هيبقى التلخيص جاهز.

صيغة الـ action item: [[Who + will + verb + what + by when]]. [[I'll update the API by Wednesday.]]

ولو محدش حدد مين: [[Who's going to take the logs?]] أو [[Should I take that one?]] (لو عايز تاخدها).

والجمل اللي بتنهي الاجتماع: [[Let's wrap up]]، و [[I think we're done]]، و [[Let's call it here]]، و [[I'll let you go]] (مؤدبة، يعني مش هعطلكم أكتر).

ورسالة الـ Slack بعدها بنفس الشكل: [[Notes from today's call:]] وبعدين bullets.`,
            when: "آخر أي اجتماع فيه قرارات، وخصوصًا مع عميل (التلخيص المكتوب بعد المكالمة بيحميك من «مش ده اللي اتفقنا عليه»).",
            mistakes: R`[[We will do it]] (مين؟ إمتى؟). وتلخيص طويل بيعيد الاجتماع كله. وإنك متسألش [[Did I miss anything?]]. وتقول [[I'll post the notes]] ومتبعتهاش. و [[Recap]] بعد ما الناس بدأت تخرج (قولها قبل آخر ٣ دقايق).`
          },
          teach: R`## الفكرة: قرار + مين هيعمل إيه وإمتى + سؤال مفتوح

المثال ٩ جمل بترتيب التلخيص: الإعلان، والقرار، و ٣ action items، والسؤال المفتوح، والتأكيد، والقفلة.

---

## ١. الإعلان (السطر الأول)

[[OK, before we wrap up, let me quickly recap.]]: [[wrap up]] = ننهي. و [[recap]] «ري-كاپ» = ألخّص. قولها قبل آخر ٣ دقايق، مش والناس بتخرج.

## ٢. القرار (السطر التاني)

[[We agreed to go with cursor pagination and skip the page numbers for now.]]: [[We agreed to]] + فعل. و [[skip ... for now]] = نسيب ... دلوقتي.

## ٣. الـ action items (السطر ٣ و ٤ و ٥)

| الجملة | مين | إيه | إمتى |
|---|---|---|---|
| [[Action items: I'll update the API and open a PR by Wednesday.]] | I | update + open a PR | by Wednesday |
| [[Omar will check how the mobile app uses the endpoint.]] | Omar | check | (مفيش: الأحسن تضيف) |
| [[Sara will ask the product team if page numbers are a must-have.]] | Sara | ask | (مفيش) |

الصيغة: [[Who + will + verb + what + by when]]. لاحظ إن سطر عمر وسارة من غير ميعاد؛ في الحقيقة اسأل [[By when?]] أو اقترح ([[by Thursday?]]). و [[must-have]] = ضروري (عكسها [[nice-to-have]]).

## ٤. المفتوح والتأكيد (السطر ٦ و ٧)

[[The open question is whether we need to support old app versions.]]: [[whether]] = هل (مع إنه مش سؤال مباشر، فالترتيب عادي). و [[Did I miss anything?]] = نسيت حاجة؟ ده بيدّي فرصة حد يصحّح.

## ٥. القفلة (آخر سطرين)

[[Great. I'll post the notes in the channel after the call.]] و [[Thanks, everyone!]]: وعد بملخص مكتوب، وابعته فعلًا.

---

## الخلاصة

| الجزء | الجملة |
|---|---|
| ابدأ | [[So to recap...]] / [[Before we wrap up...]] |
| قرار | [[We agreed to...]] |
| action | [[I'll ... by ...]] / [[Omar will ... by ...]] |
| مفتوح | [[The open question is...]] |
| تأكيد | [[Did I miss anything?]] |

[[Someone should look at the logs]] مش action item؛ [[Omar will check the logs by Wednesday]] هو.`,
          lines: [
            R`«تمام، قبل ما نقفل، خليني ألخّص بسرعة». wrap up = ننهي.`,
            R`القرار: «اتفقنا نمشي بالـ cursor pagination ونشيل أرقام الصفحات دلوقتي».`,
            R`action item ليك: «هحدّث الـ API وأفتح PR قبل الأربع».`,
            R`action item لعمر: «عمر هيشوف تطبيق الموبايل بيستخدم الـ endpoint إزاي».`,
            R`«سارة هتسأل فريق المنتج لو أرقام الصفحات لازمة». must-have = ضروري.`,
            R`السؤال المفتوح: «هل محتاجين ندعم إصدارات التطبيق القديمة».`,
            R`«نسيت حاجة؟»`,
            R`«تمام. هنزّل الملاحظات في القناة بعد المكالمة».`,
            R`«شكرًا يا جماعة!»`
          ],
          sol: R`مثال recap:
[[So to recap: we agreed to launch the beta on the 15th. Action items: I'll fix the signup bug by Tuesday. Mona will prepare the onboarding emails by Thursday. Ahmed will set up the analytics before launch. The open question is the pricing page; we'll decide next week. Did I miss anything?]]

رسالة Slack:
[[Notes from today's call:]]
[[- Decision: beta launch on the 15th]]
[[- Me: fix signup bug (Tue)]]
[[- Mona: onboarding emails (Thu)]]
[[- Ahmed: analytics (before launch)]]
[[- Open: pricing page, decide next week]]

راجع: كل action فيه اسم وميعاد؟ أقل من دقيقة بالصوت؟ التلخيص الضعيف: [[So we discussed many things and we will work on them.]]`
        }
      ]
    }
]);

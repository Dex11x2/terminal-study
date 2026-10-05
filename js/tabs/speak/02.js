// تكملة تاب speak: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/speak/01.js (شرح حقول الدرس في أوله)
MORE("speak", [
    {
      t: "مكالمات الفيديو والـ screen share",
      l: 2,
      n: "you're on mute و can you hear me، وتشارك شاشتك وتشاور على حاجة، ولما النت يقطع أو تدخل متأخر أو تمشي بدري",
      items: [
        {
          cmd: "you're on mute",
          title: "«You're on mute» و «Can you hear me?»: جمل المكالمة من أولها لآخرها",
          desc: R`كل مكالمة Zoom أو Google Meet أو Teams فيها نفس الـ ١٠ مواقف: حد بيتكلم وهو mute، وحد صوته واطي، وحد مش سامع، وصدى، وحد عايز يتكلم، ونهاية المكالمة. ولو الجمل دي جاهزة في دماغك، أول دقيقة في أي مكالمة هتعدّي من غير توتر.

أهم ٥: [[Can you hear me?]] (أول ما تدخل)، و [[You're on mute.]] (لحد بيتكلم ومحدش سامعه)، و [[Sorry, I was on mute.]] (لما تكون انت)، و [[You're breaking up.]] (صوته بيقطع)، و [[I'll drop off now, thanks everyone.]] (وانت خارج).

وفيه مواقف بتتقال بجمل ثابتة محدش بيغيّرها، فاحفظها زي ما هي: [[Go ahead]] (اتفضل اتكلم)، و [[Sorry, go ahead]] (لما اتنين يتكلموا مع بعض)، و [[You first]]، و [[Let's give it a minute for others to join]].`,
          example: R`Can you hear me OK?
Yes, I can hear you. / Sorry, I can't hear you. Could you check your mic?
You're on mute.
Sorry, I was on mute. As I was saying, the build is green now.
You're breaking up a little. Could you repeat that?
There's an echo. I think someone's mic is on; could everyone else mute?
Your voice is a bit low. Could you move closer to the mic?
Sorry, go ahead. / No, you go first.
Let's give it a minute for others to join.
I have a hard stop at 4, so I'll need to drop off then.
I'll drop off now. Thanks, everyone!`,
          try: R`افتح Google Meet لوحدك (ابدأ اجتماع وادخله من الموبايل واللابتوب مع بعض) وقول كل جملة بصوت عالي في مكانها: اعمل mute واتكلم وبعدين قول [[Sorry, I was on mute]]، وهكذا. وبعدين اكتب في [[phrases.md]] أهم ٥ جمل ليك، وحطهم في sticky note جنب الشاشة أول أسبوعين.`,
          flag: "script",
          deep: {
            why: R`المواقف دي بتحصل في أول دقيقة من كل مكالمة تقريبًا، ولو اتلخبطت فيها، التوتر بيكمّل معاك باقي الاجتماع. والجمل ثابتة جدًا، يعني ٣٠ دقيقة تدريب بتحل المشكلة للأبد.`,
            how: R`[[hard stop]] = لازم أمشي في الميعاد ده بالظبط (عندي حاجة بعدها). قولها في أول المكالمة مش في آخرها: [[Just so you know, I have a hard stop at 4.]]

[[breaking up]] = صوتك بيقطع (للنت). [[cut out]] = قطع ثانية. [[frozen]] = الصورة واقفة: [[You're frozen]]. [[lag]] = تأخير: [[There's a bit of a lag.]]

لما اتنين يتكلموا في نفس الوقت (بيحصل كتير مع الـ lag): [[Sorry, go ahead]] أو [[After you]]. ولو انت كنت عايز تقول حاجة مهمة: [[Sorry, just one quick thing...]].

في الآخر: [[Thanks, everyone. Talk soon.]] أو [[Have a good one!]] أو [[Have a great weekend!]] (يوم الخميس أو الجمعة حسب فريقك). و [[I'll drop off]] أو [[I'll hop off]] = هخرج من المكالمة.`,
            when: "أول وآخر دقيقة في كل مكالمة، وأي مشكلة صوت.",
            mistakes: R`[[Open your mic]] (الصح [[unmute]]). و [[I can't hear you good]]. و [[Your voice is cutting]] (الصح [[You're breaking up]] أو [[Your audio is cutting out]]). و [[I will go now bye]] فجأة من غير شكر. وتفضل تتكلم ٢ دقيقة وانت mute ومحدش يقولك: لما تبدأ تتكلم، بص على أيقونة المايك.`
          },
          lines: [
            R`«سامعني كويس؟» أول جملة لما تدخل.`,
            R`«آه سامعك» أو «مش سامعك، ممكن تشوف المايك؟»`,
            R`«انت على mute». بتقولها لحد بيتكلم ومحدش سامعه.`,
            R`«آسف، كنت mute. زي ما كنت بقول، الـ build بقى أخضر». As I was saying = نرجع للي كنت بقوله.`,
            R`«صوتك بيقطع شوية، ممكن تعيد؟» breaking up = بيقطع.`,
            R`«فيه صدى. أظن مايك حد مفتوح؛ ممكن الباقي يعمل mute؟»`,
            R`«صوتك واطي شوية، ممكن تقرّب من المايك؟»`,
            R`لما اتنين يتكلموا مع بعض: «آسف، اتفضل» أو «لا، انت الأول».`,
            R`«نستنى دقيقة لحد ما الباقي يدخل».`,
            R`«لازم أمشي الساعة ٤ بالظبط، فهخرج ساعتها». hard stop = ميعاد مقفول.`,
            R`«هخرج دلوقتي. شكرًا يا جماعة!» drop off = أخرج من المكالمة.`
          ],
          sol: R`لو عملت التمرين صح، المفروض تكون قلت كل جملة مرة على الأقل في موقفها الحقيقي (mute حقيقي، صدى حقيقي لو الجهازين جنب بعض). ده أهم من الحفظ: المخ بيربط الجملة بالموقف.

أهم ٥ للـ sticky note (لو هتختار):
[[Can you hear me OK?]]
[[Sorry, I was on mute.]]
[[You're breaking up. Could you repeat that?]]
[[Sorry, go ahead.]]
[[I'll drop off now. Thanks, everyone!]]

لو حاسس إنك مش محتاج الورقة بعد أسبوع، شيلها. ولو لسه بتبص عليها، سيبها: ده مش غش، ده نفس فكرة الـ cheat sheet اللي المبرمجين بيستخدموها لأي أداة جديدة.`
        },
        {
          cmd: "can you see my screen",
          title: "تشارك شاشتك وتشاور: «Can you see my screen?» و «Let me zoom in»",
          desc: R`الـ screen share هو نص الشغل التقني في المكالمات: تشرح كود، أو bug، أو تعمل demo، أو حد بيساعدك. والمشكلة إنك بتعمل حاجتين مع بعض: بتحرّك الماوس، وبتتكلم إنجليزي. فالجمل لازم تبقى أوتوماتيك.

البداية: [[Let me share my screen.]] وبعدين [[Can you see my screen?]] أو [[Can everyone see my screen?]]. ولو شاركت الشاشة الغلط: [[Oops, wrong window. One sec.]]

التشاور: [[As you can see here...]]، و [[If you look at line 42...]]، و [[This part here...]] (والماوس على الحتة)، و [[On the left / on the right / at the top / at the bottom]]، و [[Let me zoom in.]] (الخط صغير: دايمًا كبّر الخط في VS Code قبل ما تشارك).

النهاية: [[I'll stop sharing now.]] أو [[Let me stop sharing.]]`,
          example: R`Let me share my screen. Can you see it?
Can you see my VS Code, or is it still showing the browser?
Oops, wrong window. One second.
Is the font big enough? Let me zoom in.
As you can see here, the request fails with a 401.
If you look at line 42, we never await this promise.
This part on the left is the request, and on the right is the response.
Let me scroll down a bit. OK, here.
Could you share your screen? It'll be easier to see the error.
I'll stop sharing now.`,
          try: R`اعمل فيديو ٢ دقيقة بـ OBS أو Loom أو حتى Zoom recording لنفسك، بتشارك فيه شاشتك وتشرح ملف كود من مشروعك. استخدم ٥ جمل على الأقل من المثال. وبعدين اتفرج على الفيديو: كام مرة سكتّ وانت بتدوّر على حاجة؟ الماوس كان بيشاور على اللي بتقوله؟`,
          flag: "script",
          deep: {
            why: R`في الـ remote، الـ screen share هو الـ «تعالى اقعد جنبي» بتاع المكتب. ولو إنت سلس فيه، الناس هتحب تشتغل معاك pair، ودي أسرع طريقة تتعلم بيها. وفي الانترفيو، الـ live coding كله screen share.`,
            how: R`قبل ما تشارك: اقفل الإشعارات (Slack والواتساب)، واقفل التابات اللي فيها حاجة شخصية، وكبّر الخط في VS Code ([[Ctrl + =]]) والمتصفح. وشارك نافذة واحدة بدل الشاشة كلها لو ممكن.

وانت بتشارك: اتكلم قبل ما تحرك الماوس: [[I'm going to open the user service now]] وبعدين افتح. كده الناس بتلحقك. والسكوت وانت بتدوّر: [[Let me find it... one sec... here it is.]] أحسن من صمت ١٠ ثواني.

كلمات الأماكن: [[at the top]]، و [[at the bottom]]، و [[on the left / right]]، و [[in the sidebar]]، و [[in the terminal]]، و [[in the console]]، و [[in the Network tab]]، و [[line 42]]، و [[this function here]]. وأفعال: [[scroll up / down]]، و [[click on]]، و [[hover over]]، و [[open]]، و [[switch to]] (تنقل لنافذة تانية).

لو حد تاني بيشارك وعايز يشاور على حاجة: [[Could you scroll up a bit?]]، و [[Could you go back to the previous file?]]، و [[Could you zoom in? It's a bit small on my side.]]`,
            when: "شرح bug لزميل، و code walkthrough، و demo، و live coding، و pair programming.",
            mistakes: R`تشارك الشاشة كلها وعليها إشعار واتساب شخصي. وخط صغير جدًا ([[Can you zoom in?]] أول تعليق هتسمعه). و [[Do you see my screen?]] (مقبولة، بس [[Can you see]] أشهر). وتحرك الماوس بسرعة وتقول [[here... and here... and here]] من غير ما تقول إيه اللي هناك. وتنسى تعمل [[stop sharing]].`
          },
          lines: [
            R`«خليني أشارك شاشتي. شايفينها؟»`,
            R`«شايفين الـ VS Code ولا لسه ظاهر المتصفح؟»`,
            R`«أوبس، نافذة غلط. ثانية واحدة».`,
            R`«الخط كبير كفاية؟ خليني أكبّر». zoom in = تكبير.`,
            R`«زي ما انتوا شايفين هنا، الـ request بيفشل بـ 401».`,
            R`«لو بصيتوا على سطر ٤٢، إحنا مش بنعمل await للـ promise دي».`,
            R`«الجزء اللي على الشمال ده الـ request، واللي على اليمين الـ response».`,
            R`«خليني أنزل شوية. أيوه، هنا».`,
            R`«ممكن تشارك شاشتك؟ هيبقى أسهل نشوف الخطأ».`,
            R`«هوقف المشاركة دلوقتي».`
          ],
          sol: R`الفيديو الكويس:
١) بيبدأ بجملة بتقول هتشرح إيه: [[I'm going to walk you through the auth middleware in my project.]]
٢) الخط كبير ومقروء.
٣) قبل كل حركة جملة: [[Now I'll open the routes file.]]
٤) الماوس بيشاور على اللي بيتقال: [[This line here checks the token.]]
٥) بيخلص بـ [[That's it. I'll stop sharing now.]]

المتوقع في أول فيديو: ٢–٤ فترات سكوت وانت بتدوّر على ملف. الحل: [[Let me find it... one sec]]، وجهّز الملفات مفتوحة في tabs قبل ما تبدأ. والفيديو الضعيف: كله [[here]] و [[this]] من غير أسماء، فاللي بيتفرج مش عارف انت فين.`
        },
        {
          cmd: "النت قطع",
          title: "النت قطع، واتأخرت، ومحتاج تمشي بدري: جمل الطوارئ",
          desc: R`في مصر النت والكهربا مش مضمونين ١٠٠٪، وده بيحصل للكل. المهم إزاي تتعامل معاه باحترافية: تبلّغ بسرعة، ومن غير اعتذار طويل، وتقول الحل.

قبل المكالمة لو متوقع مشكلة: [[Heads-up: my internet is a bit unstable today, so I might keep my camera off.]] (heads-up = تنبيه مسبق).

لو وقعت ورجعت: [[Sorry, I got disconnected. What did I miss?]] أو [[Sorry about that, my connection dropped. Where were we?]]. ولو مش قادر ترجع: ابعت في الشات أو Slack على طول: [[My internet is down. I'll join from my phone in 2 minutes.]]

التأخير: ابعت قبل الميعاد مش بعده: [[Running 5 minutes late, sorry! Please start without me.]]. والمشي بدري: قوله في الأول: [[I need to leave 10 minutes early today.]]`,
          example: R`Heads-up: my internet is a bit unstable today, so I'll keep my camera off.
Sorry, I got disconnected. What did I miss?
Sorry about that, my connection dropped. Where were we?
I think I lost you for a second. Could you repeat the last part?
My internet is down. I'll join from my phone in two minutes.
There's a power cut in my area. I'll be back online in about 30 minutes.
Running five minutes late, sorry! Please start without me.
Sorry I'm late. Please don't let me interrupt; I'll catch up.
I need to leave ten minutes early today, so could we cover my part first?`,
          try: R`اكتب ٣ رسايل Slack جاهزة وحطها في Notes على الموبايل (عشان لو النت وقع تبعتها من الموبايل): (١) النت وقع وهتدخل من الموبايل. (٢) الكهربا قطعت ومش عارف هترجع إمتى. (٣) متأخر ١٠ دقايق. وبعدين قول بصوت عالي جملة [[Sorry, I got disconnected. What did I miss?]] بـ ٣ نبرات: مرتبك، وعادي، وواثق. خلّي الأخيرة هي نبرتك.`,
          flag: "script",
          deep: {
            why: R`اللي بيختفي من مكالمة من غير ما يقول، أو بيرجع ويعتذر دقيقتين، بيبان مش محترف. واللي بيبعت سطر في الشات ويرجع ويقول [[What did I miss?]] ويكمل عادي، محدش بيفتكر إنه وقع أصلًا. والشركات اللي بتوظف من مصر عارفة إن الموضوع ده بيحصل؛ اللي بيفرق إزاي بتتعامل معاه.`,
            how: R`[[What did I miss?]] = فاتني إيه؟ و [[Where were we?]] = كنا فين؟ و [[I'll catch up]] = هلحق/هفهم لوحدي بعدين (من الـ notes أو التسجيل).

تجهيزات: خلي الموبايل فيه تطبيق Zoom/Meet/Teams متسجّل دخول، وباقة نت احتياطي، وشاحن. ولو الكهربا بتقطع في منطقتك في مواعيد معروفة، ده سبب كويس تطلب مواعيد اجتماعات مناسبة: [[Could we move the standup 30 minutes earlier? There are scheduled power cuts in my area at that time.]]

الاعتذار: جملة واحدة ([[Sorry about that]]) وبعدين كمّل. متحكيش القصة كلها.

ولو فاتك جزء مهم وانت مكسوف تطلب إعادة: [[Is there a recording, or could someone share the notes?]]`,
            when: "أي مشكلة نت أو كهربا أو تأخير. جهّز الرسايل من قبلها.",
            mistakes: R`تختفي من غير رسالة. و [[Sorry sorry sorry, the internet in Egypt is very bad...]] وقصة طويلة. و [[The electricity is cut]] (الأوضح [[There's a power cut]] أو [[power outage]]). و [[I'm late 5 minutes]] (الصح [[I'm running 5 minutes late]] أو [[I'll be 5 minutes late]]). وتقول إنك هتمشي بدري في آخر الاجتماع بدل أوله.`
          },
          lines: [
            R`تنبيه مسبق: «النت مش مستقر النهارده، فهقفل الكاميرا». heads-up = تنبيه.`,
            R`«آسف، اتقطعت. فاتني إيه؟»`,
            R`«آسف، النت وقع. كنا فين؟»`,
            R`«أظن فقدتك ثانية. ممكن تعيد آخر جزء؟» (لو الطرف التاني اللي قطع).`,
            R`«النت واقع. هدخل من الموبايل في دقيقتين».`,
            R`«الكهربا قاطعة في منطقتي. هرجع أونلاين في حوالي نص ساعة». power cut = قطع كهربا.`,
            R`«هتأخر ٥ دقايق، آسف! ابدأوا من غيري». running late = متأخر.`,
            R`«آسف على التأخير. كملوا متوقفوش عشاني؛ هلحق». catch up = ألحق.`,
            R`«محتاج أمشي بدري ١٠ دقايق النهارده، ممكن نبدأ بالجزء بتاعي؟» cover = نغطي/نتكلم في.`
          ],
          sol: R`الرسايل الجاهزة:
(١) [[My internet just went down. Joining from my phone in 2 minutes.]]
(٢) [[Power cut in my area, not sure how long it'll take. I'll catch up from the notes and update you on Slack.]]
(٣) [[Running about 10 minutes late, sorry! Please start without me.]]

النبرة الواثقة: [[Sorry, I got disconnected. What did I miss?]] بسرعة عادية، ونبرة نازلة في [[disconnected]]، وطالعة في [[miss?]]، ومن غير ضحكة متوترة. التسجيل الضعيف: الجملة متقطعة بـ [[ehh]] أو بتبدأ بـ [[Sorry, sorry...]] مكررة.`
        }
      ]
    },
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
    },
    {
      t: "مع مديرك وعميلك",
      l: 2,
      n: "الـ 1:1 مع مديرك: تطلب feedback وتقول انت محتاج إيه، ومكالمة عميل: تسأل عن المتطلبات وتأكد عليها",
      items: [
        {
          cmd: "1:1 وفيدباك",
          title: "الـ 1:1 مع مديرك: تطلب feedback وتقول محتاج إيه وتستقبل نقد",
          desc: R`الـ 1:1 (one-on-one) = اجتماع أسبوعي أو كل أسبوعين بينك وبين مديرك لوحدكم. ده مش standup: ده وقتك انت. والـ junior المصري غالبًا بيدخله ساكت ومستني المدير يتكلم، فبيخلص في ٥ دقايق من غير فايدة.

جهّز ٣ حاجات: ١) حاجة ماشية كويس أو اتعلمتها. ٢) حاجة صعبة أو محتاج فيها مساعدة. ٣) سؤال عن التطور أو feedback: [[Is there anything I should be doing differently?]] أو [[What would you like to see from me in the next month?]].

واستقبال النقد: متدافعش على طول. [[Thanks, that's helpful]] وبعدين سؤال يوضح: [[Could you give me an example?]]، وبعدين خطة: [[I'll try to ... next time]]. حتى لو مش موافق، اشكر الأول، وناقش بعدين بهدوء.`,
          example: R`One thing that went well this week: I finally understood how our auth flow works.
One thing I'm struggling with is estimating tasks. I keep underestimating them.
Is there anything I should be doing differently?
What would you like to see from me in the next month?
I'd like to get more experience with the backend. Is there a task I could pick up?
Thanks, that's really helpful. Could you give me an example so I understand better?
That's fair. Next time, I'll ask for help after an hour instead of a whole day.
I see what you mean. Can I share some context on why I did it that way?`,
          try: R`حضّر 1:1 حقيقي أو متخيّل: اكتب الـ ٣ نقط (حاجة كويسة، وحاجة صعبة، وسؤال feedback)، وقولهم بصوت عالي. وبعدين تخيّل المدير قالك: [[Your PRs are too big and hard to review.]] سجّل ردك: شكر + سؤال + خطة.`,
          flag: "script",
          deep: {
            why: R`الـ 1:1 هو أهم اجتماع لكارير الـ junior: هنا بتطلب مهام أصعب، وبتعرف انت فين، وبتبني علاقة مع اللي بيقرر ترقيتك. والـ feedback اللي بتطلبه بنفسك بيتقال بصراحة أكتر من اللي بيجي في تقييم آخر السنة.`,
            how: R`عبارات الصعوبة (من غير ما تبان بتشتكي): [[One thing I'm struggling with is...]]، و [[I'd like some help with...]]، و [[I'm finding X a bit challenging]].

عبارات الطلب: [[I'd like to get more experience with...]]، و [[Could I pick up...?]]، و [[Would it be possible to pair with someone on...?]].

عبارات الـ feedback: [[Is there anything I should be doing differently?]]، و [[How am I doing so far?]]، و [[What's one thing I could improve?]] (سؤال محدد بيجيب إجابة محددة).

استقبال النقد: [[Thanks, that's helpful]]، و [[That's fair]] (معاك حق)، و [[I see what you mean]]، و [[Could you give me an example?]]. ولو عايز توضح: [[Can I share some context?]] (مش [[But I...]] على طول).

ولو الـ 1:1 بالإنجليزي وصعب عليك: ابعت النقط مكتوبة قبلها بساعة ([[Here are a few things I'd like to discuss]]). المديرين بيحبوا ده.`,
            when: "كل 1:1، وبعد أول شهر في أي شغل (اطلب feedback حتى لو محدش عرض)، وبعد أي مشروع كبير.",
            mistakes: R`تدخل من غير ولا نقطة. [[Everything is fine]] كل مرة. تدافع على طول ([[No, but that's because...]]). تعيط أو تتضايق قدامه من نقد عادي. وتطلب «ترقية» من غير ما تسأل «إيه المطلوب عشان أوصل للمستوى الجاي؟» (ده السؤال الصح: [[What would I need to show to get to the next level?]]).`
          },
          lines: [
            R`حاجة كويسة: «حاجة مشيت كويس الأسبوع ده: أخيرًا فهمت الـ auth flow».`,
            R`حاجة صعبة: «حاجة صعبة عليا هي تقدير التاسكات. دايمًا بقدّر أقل». struggling with = بعاني مع.`,
            R`«فيه حاجة المفروض أعملها بشكل مختلف؟»`,
            R`«تحب تشوف مني إيه الشهر الجاي؟»`,
            R`طلب: «عايز خبرة أكتر في الـ backend. فيه تاسك أقدر آخدها؟» pick up = آخد.`,
            R`استقبال نقد: «شكرًا، ده مفيد جدًا. ممكن مثال عشان أفهم أكتر؟»`,
            R`«معاك حق. المرة الجاية هطلب مساعدة بعد ساعة بدل يوم كامل». fair = منطقي/عادل.`,
            R`لو عايز توضّح: «فاهم قصدك. ممكن أشرح السياق ليه عملتها كده؟»`
          ],
          sol: R`نموذج الـ ٣ نقط:
[[One thing that went well: I shipped the search feature, and I learned a lot about indexes.]]
[[One thing I'm struggling with is reading other people's code quickly.]]
[[Is there anything I should be doing differently? And what would you like to see from me next month?]]

الرد على [[Your PRs are too big]]:
[[Thanks, that's helpful. Could you give me an example of a PR that was too big? ... That's fair. From now on, I'll try to keep PRs under 300 lines and split big features into smaller PRs.]]

الرد الضعيف: [[But the feature was big, so the PR was big.]] (دفاع فوري). حتى لو فيه جزء صح، ابدأ بالشكر والسؤال.`
        },
        {
          cmd: "مكالمة عميل",
          title: "مكالمة مع عميل: تسأل عن المتطلبات صح وتأكد عليها قبل ما تبدأ",
          desc: R`لو بتشتغل فريلانس أو في شركة outsourcing، هتكلم عملاء. والعميل غالبًا مش تقني، وبيقول [[I want an app like Uber but for...]]. شغلك في المكالمة: تفهم هو عايز إيه فعلًا، وتكتب، وتأكد عليه.

الأسئلة المفتوحة الأول: [[Could you tell me more about...?]]، و [[Who will be using it?]]، و [[What problem are you trying to solve?]]، و [[How do you do it today?]]. وبعدين أسئلة محددة: [[Do you need X or is Y enough?]]، و [[What's the deadline?]]، و [[What's most important for the first version?]].

وفي الآخر التأكيد (زي «So to recap»)، ومعاه الحاجات اللي مش في الـ scope: [[Just to be clear, the first version won't include...]]. وبعدها إيميل مكتوب (درس [[إيميل لعميل]] في «تاب إنجليزي للمبرمج: قراية وكتابة»). وتفاصيل الـ scope المكتوب في «تاب الشغل والكارير»: [[scope مكتوب]].`,
          example: R`Thanks for your time today. Could you tell me a bit about your business?
What problem are you trying to solve with this app?
Who will be using it: your staff, your customers, or both?
How do you handle bookings today? Excel? WhatsApp?
What's the most important thing for the first version?
Do you need online payments at launch, or can customers pay at the clinic for now?
Do you have a deadline in mind?
Let me make sure I got this right: customers book online, you confirm by SMS, and payment stays at the clinic.
Just to be clear, the first version won't include a mobile app. Is that OK?
I'll send you a summary and a quote by Thursday.`,
          try: R`اعمل «رول بلاي» مع صاحب أو AI: هو عميل عنده مطعم عايز «موقع للأوردرات». انت تسأل ٦ أسئلة على الأقل (٣ مفتوحة و ٣ محددة)، وفي الآخر تأكيد بـ [[Let me make sure I got this right]] وجملة [[Just to be clear, the first version won't include...]]. سجّل المكالمة.`,
          flag: "script",
          deep: {
            why: R`أغلب مشاكل الفريلانس (شغل زيادة ببلاش، وعميل زعلان) سببها سوء فهم في أول مكالمة. والأسئلة الصح بتوري للعميل إنك محترف وبتفكر في بيزنس مش كود بس، ودي اللي بتخليه يختارك.`,
            how: R`الأسئلة المفتوحة بتبدأ بـ [[What]] و [[How]] و [[Who]] و [[Could you tell me about]]. والمحددة بتبدأ بـ [[Do you need...]] و [[Is it OK if...]] و [[Which one...]].

سؤال [[How do you do it today?]] ذهبي: بيوريك الـ workflow الحقيقي، وبيطلع مشاكل العميل مقالهاش.

الأولويات: [[What's a must-have and what's a nice-to-have?]] = إيه الضروري وإيه اللي «لو حصل كويس». ده بيسهّل تقسيم الشغل لمراحل.

كلمات تقنية للعميل: بسّطها. مش [[We'll use a REST API with JWT]]، بل [[Your customers will log in with their email, and their data will be secure.]]

الفلوس والوقت: [[I'll send you a quote]] (عرض سعر)، و [[an estimate]]، و [[milestones]] (مراحل)، و [[a deposit]] (مقدم). وتفاصيل التسعير في «تاب الشغل والكارير»: [[التسعير]].`,
            when: "أول مكالمة مع أي عميل، وأي مكالمة فيها طلب جديد.",
            mistakes: R`تسمع وتقول [[OK, no problem]] على كل حاجة. متسألش عن الـ deadline والميزانية. تستخدم كلام تقني العميل مش فاهمه. متأكدش في الآخر. ومتبعتش ملخص مكتوب (فكل واحد فاكر حاجة مختلفة). و [[What is your budget?]] في أول دقيقة (اسألها بعد ما تفهم المشروع).`
          },
          lines: [
            R`«شكرًا على وقتك. ممكن تحكيلي شوية عن البيزنس بتاعك؟»`,
            R`«إيه المشكلة اللي عايز تحلها بالتطبيق ده؟»`,
            R`«مين هيستخدمه: الموظفين، ولا العملاء، ولا الاتنين؟»`,
            R`«بتتعامل مع الحجوزات إزاي النهارده؟ Excel؟ WhatsApp؟» السؤال الذهبي.`,
            R`«إيه أهم حاجة في النسخة الأولى؟»`,
            R`«محتاج دفع أونلاين من أول يوم، ولا العملاء يدفعوا في العيادة دلوقتي؟»`,
            R`«عندك deadline في دماغك؟»`,
            R`التأكيد: «خليني أتأكد إني فهمت: العملاء بيحجزوا أونلاين، وانت بتأكد بـ SMS، والدفع في العيادة».`,
            R`برا الـ scope: «عشان نبقى واضحين، النسخة الأولى مش هيبقى فيها تطبيق موبايل. تمام؟»`,
            R`الخطوة الجاية: «هبعتلك ملخص وعرض سعر قبل الخميس». quote = عرض سعر.`
          ],
          sol: R`أسئلة كويسة للمطعم:
مفتوحة: [[How do you take orders today?]]، و [[Who will manage the orders on your side?]]، و [[What's the biggest problem with the current way?]]
محددة: [[Do you need delivery tracking, or just order and pickup?]]، و [[Do you want online payment or cash on delivery?]]، و [[Do you need Arabic and English?]]

التأكيد: [[Let me make sure I got this right: customers order from the website, you get a notification on a tablet, and they pay cash on delivery. Just to be clear, the first version won't include delivery tracking or a mobile app. Is that OK?]]

راجع: فيه [[How do you ... today?]]؟ فيه سؤال أولوية؟ فيه تأكيد وحاجة برا الـ scope؟ المكالمة الضعيفة: العميل اتكلم ٩٠٪ وانت قلت [[OK]] و [[no problem]] بس.`
        }
      ]
    },
    {
      t: "تعرّف نفسك وتحكي مشروعك بالإنجليزي",
      l: 3,
      n: "Tell me about yourself بـ ٣ نسخ جاهزة للـ junior (خريج جديد، وجاي من مجال تاني، و self-taught / freelancer)، وتحكي مشروعك في دقيقتين",
      items: [
        {
          cmd: "about yourself: ٣ نسخ",
          title: "Tell me about yourself للـ junior: ٣ نسخ جاهزة تفصّلها على نفسك",
          desc: R`الهيكل نفسه (present ← proof ← how I work ← future ← why you) مشروح في درس [[tell me about yourself]] في «تاب الانترفيو». هنا ٣ نسخ إنجليزي كاملة بجمل بسيطة، لـ ٣ أنواع من الـ juniors، تاخد اللي شبهك وتغيّر التفاصيل.

قواعد اللغة للإجابة دي: ١) جمل قصيرة، كل جملة فكرة. ٢) الحاضر للي انت عليه ([[I'm a...]] و [[I work with...]])، والماضي للي عملته ([[I built...]] و [[I graduated...]])، والمستقبل لللي عايزه ([[I'd like to...]] و [[I'm looking for...]]). ٣) رقم واحد على الأقل. ٤) آخر جملة عن الشركة دي.

والمدة ٦٠–٩٠ ثانية. ومتحفظهاش كلمة بكلمة: احفظ الجمل الـ ٦ كنقط، وقولها كل مرة بكلام قريب.`,
          example: R`[Fresh graduate] I'm a junior full-stack developer. I graduated in Computer Science from Cairo University this summer.
[Fresh graduate] For my graduation project, I built a clinic booking system with React, Node and PostgreSQL. It's used by two clinics now.
[Fresh graduate] I enjoy the backend side most, especially designing APIs and writing tests.
[Fresh graduate] I'm looking for a team where I can learn from senior engineers, and your focus on healthcare products really interests me.
[Career switcher] I'm a front-end developer, and before that I worked in accounting for three years.
[Career switcher] I taught myself JavaScript and React, and I built a budgeting app that about 200 people use.
[Career switcher] My accounting background helps me understand business requirements and talk to non-technical people.
[Career switcher] I'd like to join a fintech team like yours, where I can use both skills.
[Freelancer] I'm a web developer, and for the last two years I've worked as a freelancer.
[Freelancer] I've delivered around ten projects for small businesses, mostly Next.js sites with online payments.
[Freelancer] I handle everything from the first client call to deployment, so I'm used to owning a project end to end.
[Freelancer] Now I want to work on a bigger product with a team, and learn how things are done at scale.`,
          try: R`اختار النسخة الأقرب ليك، وغيّر كل التفاصيل لتفاصيلك الحقيقية (الجامعة، المشروع، الرقم، الشركة). اكتبها في ٥–٦ جمل. سجّلها ٣ مرات في ٣ أيام من النقط بس (مش من النص). قارن التسجيل الأول بالتالت: المدة، وعدد الـ [[ehh]]، والنطق (اسم الـ stack من درس «Linux و SQL و Nginx»).`,
          flag: "script",
          deep: {
            why: R`أول سؤال في كل انترفيو تقريبًا، ولو بدأت بثقة، الباقي بيبقى أسهل. وللي إنجليزيته ضعيفة ده أكتر سؤال يستاهل تحضير، لأنه ١٠٠٪ جاي، وإجابته عنك انت، فتقدر تجهّزها بالظبط.`,
            how: R`عبارات مفيدة:
البداية: [[I'm a ... developer]]، و [[I work mainly with ...]]، و [[I recently graduated in ...]].
الدليل: [[I built ...]]، و [[It's used by ...]]، و [[I was responsible for ...]].
التميّز: [[I enjoy ...]]، و [[I'm good at ...]]، و [[What I bring is ...]]، و [[My background in X helps me ...]].
المستقبل: [[I'm looking for ...]]، و [[I'd like to grow in ...]]، و [[Now I want to ...]].
الشركة: [[Your focus on X really interests me]]، و [[I read about your ... and ...]].

الـ career switcher: المجال القديم ميزة مش عيب. قوله في جملة وقول بيفيدك إزاي.

الـ freelancer: متقولش [[freelancer]] كأنك بتعتذر. قول عدد المشاريع ونوع العملاء، وإنك [[own projects end to end]]. وقول ليه عايز فريق دلوقتي (التعلم، والـ scale) مش «عشان الفريلانس مفيهوش فلوس».

وجهّز نسخة ٣٠ ثانية: أول جملتين وآخر جملة بس.`,
            when: "أول كل انترفيو، و recruiter call، وأي networking event، ولما تقابل فريق جديد أول يوم.",
            mistakes: R`[[My name is ... and I am from Egypt]] (هو عارف اسمك من الـ CV). و [[I am a hard worker and passionate]] من غير دليل. وتحكي من الثانوي. و [[I have 0 experience]] (قول اللي عملته، مش اللي معملتوش). و [[I finished my graduation]] (الصح [[I graduated]]). وتحفظ النص فتقوله بسرعة وبنبرة واحدة.`
          },
          lines: [
            R`خريج جديد، الحاضر: «أنا junior full-stack، اتخرجت حاسبات من جامعة القاهرة الصيف ده».`,
            R`الدليل: «مشروع التخرج نظام حجز عيادات بـ React و Node و PostgreSQL، وعيادتين بيستخدموه».`,
            R`التميّز: «بحب الـ backend أكتر، خصوصًا تصميم الـ APIs وكتابة الاختبارات».`,
            R`المستقبل والشركة: «بدوّر على فريق أتعلم فيه من seniors، وتركيزكم على منتجات الصحة بيهمني».`,
            R`جاي من مجال تاني، الحاضر: «أنا front-end، وقبلها اشتغلت محاسب ٣ سنين».`,
            R`الدليل: «علّمت نفسي JS و React، وعملت تطبيق ميزانية بيستخدمه حوالي ٢٠٠ شخص».`,
            R`الميزة: «خلفيتي في المحاسبة بتساعدني أفهم متطلبات البيزنس وأتكلم مع ناس مش تقنيين».`,
            R`الشركة: «عايز أنضم لفريق fintech زيكم، أستخدم فيه المهارتين».`,
            R`فريلانسر، الحاضر: «أنا web developer، وآخر سنتين شغال فريلانس».`,
            R`الدليل: «سلّمت حوالي ١٠ مشاريع لبيزنس صغيرة، أغلبها Next.js بدفع أونلاين».`,
            R`الميزة: «بمسك كل حاجة من أول مكالمة مع العميل للـ deploy، فمتعود أمسك مشروع من أوله لآخره». end to end = من الأول للآخر.`,
            R`المستقبل: «عايز أشتغل على منتج أكبر مع فريق، وأتعلم الحاجات بتتعمل إزاي على scale كبير».`
          ],
          sol: R`نموذج لخريج جديد بعد التفصيل:
[[I'm a junior back-end developer. I graduated from Ain Shams University in 2025, in Computer Science. For my graduation project, I built an attendance system with Node, Express and PostgreSQL, and my faculty used it for one semester with about 400 students. I enjoy working with databases, and I wrote the tests and the CI for that project myself. Now I'm looking for a team where I can learn from experienced engineers, and I like that your team builds tools for schools.]]

المدة المتوقعة: ٥٠–٧٠ ثانية. راجع: فيه رقم (٤٠٠)؟ آخر جملة عن الشركة؟ الأزمنة صح ([[graduated]] و [[built]] ماضي، و [[enjoy]] و [[I'm looking]] حاضر)؟

بين التسجيل الأول والتالت: المدة غالبًا بتقل، والـ [[ehh]] بتقل للنص. ولو التالت نفس الأول كلمة بكلمة، انت حافظ نص: قوله مرة بترتيب مختلف شوية.`
        },
        {
          cmd: "walk me through a project",
          title: "«Walk me through a project you're proud of»: تحكي مشروعك بالإنجليزي في دقيقتين",
          desc: R`السؤال التاني الأشهر بعد «Tell me about yourself». الهيكل مشروح في درس [[problem → decisions → results]] في «تاب الانترفيو»: المشكلة، ودورك، والقرارات والـ trade-offs، والنتيجة، وهتغير إيه. هنا اللغة.

الجمل اللي هتحتاجها: المشكلة [[The problem was that...]]، والدور [[I was responsible for...]] أو [[I built it alone]]، والقرار [[I chose X over Y because...]]، والتمن [[The trade-off was...]]، والصعوبة [[The hardest part was...]]، والنتيجة [[As a result...]]، والدرس [[If I did it again, I would...]].

وأهم نقطة لغة: [[would]] في الجملة الأخيرة: [[If I did it again, I would add tests earlier]]. دي الصيغة الصح للـ «لو رجع بيا الزمن». ومتقولش [[If I will do it again]].`,
          example: R`The project I'm most proud of is a booking system for a small clinic.
The problem was that they managed appointments on paper, and patients often came at the same time.
I built it alone, from the database design to the deployment.
I chose PostgreSQL over MongoDB because the data is very relational: patients, doctors, appointments.
The hardest part was preventing double bookings when two people book the same slot at the same time.
I solved it with a unique constraint on doctor and time, and I handle the error with a clear message.
The trade-off was that I kept the UI very simple, because the deadline was three weeks.
As a result, the clinic stopped using paper, and double bookings went to zero.
If I did it again, I would add automated tests from day one; I added them late and it was painful.`,
          try: R`اكتب قصة مشروعك في ٩ جمل بنفس الترتيب، بتفاصيلك الحقيقية. وبعدين جهّز إجابات لـ ٣ follow-ups متوقعة بالإنجليزي: [[Why did you choose X?]]، و [[What would you do differently?]]، و [[How would it handle more users?]]. سجّل القصة والإجابات.`,
          flag: "script",
          deep: {
            why: R`ده السؤال اللي الإنترفيوير بيحكم منه على مستواك التقني الحقيقي: مش «بتعرف React؟» لكن «بتفكر إزاي؟». وللي إنجليزيته ضعيفة، ده سؤال تقدر تحضّره ١٠٠٪ لأنه عن مشروعك.`,
            how: R`اختار مشروع فيه قرار حقيقي (اخترت حاجة بدل حاجة لسبب) وصعوبة حقيقية (مش «كان صعب أتعلم React»). والأحسن لو فيه يوزرز حقيقيين أو رقم.

الأزمنة: القصة كلها ماضي بسيط ([[built]] و [[chose]] و [[solved]])، إلا لو المشروع لسه شغال ([[It's used by...]] و [[It handles...]]).

الـ follow-ups:
[[Why X?]] → [[Because ... . The alternative was Y, but ...]]
[[What would you do differently?]] → [[I would ...]] (بـ would)
[[How would it scale?]] → [[Right now it handles ... . If it grew, I'd first look at ... , because ...]]
[[What was your role?]] (لو فريق) → [[I owned the ... part. Specifically, I ...]]

وخلي بالك من كلمات الفخر: [[I'm proud of]] عادي تقولها، بس الدليل أهم من الكلمة.`,
            when: "كل انترفيو تقريبًا، ومع الـ recruiter بشكل أقصر، وفي أي portfolio review.",
            mistakes: R`قايمة technologies من غير قصة ([[I used React, Node, Mongo, Redis, Docker...]]). و [[we]] طول الوقت في مشروع فريق من غير ما تقول انت عملت إيه. و [[If I will do it again, I will...]] (الصح [[If I did it again, I would...]]). ومشروع tutorial منسوخ (الإنترفيوير هيعرف من أول سؤال follow-up).`
          },
          lines: [
            R`«المشروع اللي فخور بيه أكتر: نظام حجز لعيادة صغيرة».`,
            R`المشكلة: «كانوا بيسجلوا المواعيد على ورق، والمرضى كتير كانوا بييجوا في نفس الوقت».`,
            R`الدور: «عملته لوحدي، من تصميم الداتابيز للـ deployment».`,
            R`القرار: «اخترت PostgreSQL بدل MongoDB لأن الداتا relational جدًا». chose X over Y = اخترت X بدل Y.`,
            R`الصعوبة: «أصعب حاجة كانت منع الحجز المزدوج لما اتنين يحجزوا نفس الميعاد في نفس اللحظة».`,
            R`الحل: «حلّيتها بـ unique constraint على الدكتور والوقت، وبتعامل مع الخطأ برسالة واضحة».`,
            R`التمن: «خليت الواجهة بسيطة جدًا لأن الـ deadline كان ٣ أسابيع».`,
            R`النتيجة: «العيادة بطّلت ورق، والحجز المزدوج بقى صفر». As a result = والنتيجة.`,
            R`الدرس بـ would: «لو عملته تاني، كنت هضيف اختبارات من أول يوم؛ ضفتها متأخر وكان متعب». painful = متعب.`
          ],
          sol: R`إجابات نموذجية للـ follow-ups (لمشروع زي المثال):
[[Why PostgreSQL?]] → [[Because the data has clear relations, and I needed constraints and transactions to prevent double bookings. MongoDB could work, but I'd have to handle that logic myself.]]
[[What would you do differently?]] → [[I would write tests from the start, and I would add SMS reminders earlier, because no-shows were the next big problem.]]
[[How would it handle more users?]] → [[Right now it's one clinic, so the load is tiny. If it grew to many clinics, I'd first add indexes on the appointment queries, and then look at caching the doctors' schedules.]]

راجع التسجيل: القصة ٩٠–١٢٠ ثانية؟ فيها [[because]] مرتين على الأقل؟ فيها [[would]] في آخرها؟ الإجابة الضعيفة: [[I made a clinic app with React and Node. It was good.]]`
        }
      ]
    }
]);

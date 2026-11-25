// كورس الألماني A1. نفس حقول الدروس في التابات التانية (cmd و title و desc و teach و deep و try و practice و ref)،
// والجديد إن الشرح والحلول فيهم fences اللغة (js/lang.js):
//   ~~~de [Lena=f Tom=m] عنوان      سطور ألماني بصوت (و «Lena: …» بصوتها، و «… || عربي» ترجمة تحت السطر)
//   ~~~words عنوان                  كروت كلمات: «der Name, die Namen | الاسم | Wie ist Ihr Name?»، وبتدخل «اختبرني»
//   ~~~dictate و ~~~speak            إملا بيتصحح لوحده، وتسجيل صوتك تقارنه بالأصل
//   ~~~yt <id> عنوان و ~~~prompt     فيديو Easy German بمهام، وطلب تصحيح جاهز لـ Claude أو ChatGPT
// كل سطر ألماني ليه ملف صوت في audio/de/ بيتعمل بـ node tools/de/de.js audio (Piper، وبعده whisper بيسمعه ويتأكد)،
// وكل جملة بتعدّي على LanguageTool (node tools/de/de.js lt). المنهج: syllabus/de-a1.md.
// cmd لازم يفضل فريد ومايتغيّرش (التقدم محفوظ بيه)، وجوه R`...` اكتب $__{ بدل ${ و $__bt بدل الـ backtick.

TAB("dea1", {
  label: "ألماني A1",
  prompt: "",
  levels: {"1":["A1.1: البداية","تعرّف نفسك، والأرقام، والوقت، والأكل والشرب والتسوق"],"2":["A1.2: الحياة اليومية","السكن، والشغل، والصحة، والمواصلات، والمصالح الحكومية"],"3":["الامتحان","٣ امتحانات تجريبية كاملة بشكل Goethe و ÖSD و telc"]},
  categories: [
    {
      t: "تعرّف نفسك (Sich vorstellen)",
      l: 1,
      n: R`أول موقف في أي مكان في ألمانيا: تسلّم، وتقول اسمك ومنين وساكن فين وبتتكلم إيه، وتتهجّى اسمك، وتقول رقم تليفونك. وده بالظبط أول جزء في امتحان الكلام في Goethe و telc (و ÖSD قريب منه).`,
      goal: [R`تسلّم وتودّع صح حسب الوقت والشخص، وتسأل «عامل إيه؟» وترد`, R`تعرّف نفسك في ٦ جمل: اسمك، ومنين، وساكن فين، ولغاتك، وسنك، ورقمك`, R`تختار [[Sie]] ولا [[du]]، وتصرّف [[sein]] و [[heißen]] و [[kommen]] و [[wohnen]] و [[sprechen]]`, R`تتهجّى اسمك وإيميلك بالحروف الألماني، وتفهم حد بيتهجّى لك`, R`تقول وتفهم الأرقام من ٠ لـ ١٠٠ ورقم تليفون`, R`تعدّي «Sprechen Teil 1» و «Schreiben Teil 1» في امتحان A1`],
      time: "حوالي ٨ ساعات: ساعة لكل درس، والباقي للتمارين والمهام والتسجيل",
      projects: [
        { lvl: 'صغير', t: R`كارت تعريف (Steckbrief)`, what: R`اكتب كارت عن نفسك بالألماني: ٦ سطور على الأقل (اسمك، منين، ساكن فين، لغاتك، سنك، رقم تليفون أو إيميل). استخدم بس اللي في دروس الوحدة.`,
          done: R`الـ ٦ سطور مكتوبين، وكل فعل في مكانه التاني، وكل اسم بحرف كبير، وقريتهم بصوت عالي من غير ما تقف`,
          sol: R`**نسخة نموذجية** (شخصية متخيّلة: كريم منصور):

~~~de Steckbrief
Ich heiße Karim Mansour. || اسمي كريم منصور.
Ich komme aus Ägypten. || أنا من مصر.
Ich wohne in Alexandria. || ساكن في إسكندرية.
Ich spreche Arabisch, Englisch und ein bisschen Deutsch. || بتكلم عربي وإنجليزي وشوية ألماني.
Ich bin 24 Jahre alt. || عندي ٢٤ سنة.
Meine Telefonnummer ist 0176 3482 950. || رقم تليفوني ...
~~~

**ليه كده:** كل جملة فيها فعل واحد في المكان التاني ([[heiße]] و [[komme]] و [[wohne]] و [[spreche]] و [[bin]] و [[ist]]). [[Ägypten]] و [[Alexandria]] و [[Telefonnummer]] أسامي، فبحرف كبير. و [[Arabisch]] بحرف كبير لأنها هنا اسم اللغة.

**الغلطة الشائعة:** [[Ich bin Karim Mansour heißen]] (فعلين). أو [[Ich komme von Ägypten]]: البلد بعد [[aus]]، و [[von]] لحاجة تانية هتيجي بعدين. أو [[Ich habe 24 Jahre]] (ترجمة حرفية من الفرنساوي أو العربي «ليّ ٢٤ سنة»): في الألماني [[Ich bin 24 Jahre alt]].` },
        { lvl: 'صغير', t: R`استمارة تسجيل في كورس ألماني`, what: R`املا الاستمارة دي ببياناتك (أو ببيانات شخصية متخيّلة): [[Familienname]]، [[Vorname]]، [[Land]]، [[Wohnort]]، [[Sprachen]]، [[Telefon]]، [[E-Mail]]. وبعدين اتهجّى بصوت عالي اسم العيلة والإيميل.`,
          done: R`كل خانة فيها حاجة، والإيميل اتهجّى حرف حرف بالأسامي الألماني للحروف (و @ اتقالت [[at]])`,
          sol: R`**نسخة نموذجية:**

| Familienname | Vorname | Land | Wohnort | Sprachen | Telefon | E-Mail |
|---|---|---|---|---|---|---|
| Said | Nour | Ägypten | Hamburg | Arabisch, Englisch | 0152 6610 437 | nour.said@mail.de |

**تهجّي الإيميل بصوت عالي:**

~~~de
N, O, U, R, Punkt, S, A, I, D, at, M, A, I, L, Punkt, D, E || نقطة = Punkt، و @ = at
~~~

**ليه كده:** [[Familienname]] هو اسم العيلة (اللي في آخر اسمك في الباسبور)، و [[Vorname]] اسمك إنت. في الاستمارات الألماني العيلة بتيجي الأول غالبًا، فاقرا اسم الخانة قبل ما تكتب. والإيميل بيتقال [[at]] (بتتنطق «إت») و [[Punkt]] للنقطة.

**الغلطة الشائعة:** تكتب اسمك كله في [[Vorname]]، أو تكتب الجنسية ([[ägyptisch]]) في خانة [[Land]]: الخانة عايزة اسم البلد [[Ägypten]].` },
        { lvl: 'متوسط', t: R`سجّل نفسك دقيقة كاملة`, what: R`سجّل نفسك (بالموبايل أو بزرار «سجّل صوتك» في الدروس) وإنت بتعرّف نفسك دقيقة كاملة بالكلمات المفتاحية بتاعة الامتحان: [[Name]]، [[Alter]]، [[Land]]، [[Wohnort]]، [[Sprachen]]، [[Beruf]]، [[Hobby]]. بعدين اسمع التسجيل وقارن بالنموذج.`,
          done: R`التسجيل دقيقة، فيه كل الكلمات المفتاحية، ومن غير وقفة أطول من ٣ ثواني`,
          sol: R`**نموذج بالصوت** (ليلى، شخصية متخيّلة):

~~~de Layla=f
Layla: Guten Tag! Mein Name ist Layla Farouk. || نهارك سعيد! اسمي ليلى فاروق.
Layla: Ich bin 31 Jahre alt. || عندي ٣١ سنة.
Layla: Ich komme aus Ägypten, aus Kairo. || أنا من مصر، من القاهرة.
Layla: Jetzt wohne ich in Köln. || دلوقتي ساكنة في كولونيا.
Layla: Ich spreche Arabisch, Englisch und ein bisschen Deutsch. || بتكلم عربي وإنجليزي وشوية ألماني.
Layla: Ich bin Ingenieurin von Beruf. || شغلتي مهندسة.
Layla: Mein Hobby ist Fotografieren. || هوايتي التصوير.
~~~

**ليه النموذج ده كويس:** بيبدأ بتحية، وكل كلمة مفتاحية ليها جملة كاملة بفعل في المكان التاني، ومفيش كلمة أعلى من A1. [[Beruf]] و [[Hobby]] مش في دروس الوحدة دي بالتفصيل: [[Ich bin … von Beruf]] قالب ثابت تحفظه، والمهن بتيجي في وحدة الشغل.

**مقارنة بتسجيلك:** اسمع النموذج وبعدين تسجيلك. علّم على: (١) كل الكلمات المفتاحية اتقالت؟ (٢) فيه جملة من غير فعل؟ (٣) نطقت [[W]] في [[wohne]] زي ڤ مش و؟ (٤) [[ch]] في [[ich]] طالعة خفيفة (مش ش ومش خ)؟` },
        { lvl: 'متوسط', t: R`حوار مع جار جديد`, what: R`إنت لسه ساكن في عمارة جديدة وقابلت جارك على السلم. اكتب حوار ٨ سطور: تحية، تعريف بنفسك، سؤالين عنه، ورد على سؤال منه، ووداع. استخدم [[Sie]] لأنه أول مرة.`,
          done: R`٨ سطور، كلهم بـ [[Sie]] (مفيش [[du]] ولا [[dich]])، والسؤالين بكلمة W، والحوار بيخلص بوداع`,
          sol: R`**نسخة نموذجية:**

~~~de Herr_Lang=m Amr=m
Amr: Guten Abend! Ich bin der neue Nachbar. || مساء الخير! أنا الجار الجديد.
Herr_Lang: Guten Abend! Willkommen! Wie heißen Sie? || مساء النور! أهلًا بيك! اسم حضرتك إيه؟
Amr: Ich heiße Amr Nabil. Und Sie? || اسمي عمرو نبيل. وحضرتك؟
Herr_Lang: Mein Name ist Lang, Peter Lang. Woher kommen Sie? || اسمي لانج، بيتر لانج. حضرتك منين؟
Amr: Ich komme aus Ägypten. Wohnen Sie schon lange hier? || أنا من مصر. حضرتك ساكن هنا من زمان؟
Herr_Lang: Ja, schon zehn Jahre. || أيوه، بقالي عشر سنين.
Amr: Schön! Auf Wiedersehen, Herr Lang! || حلو! مع السلامة يا أستاذ لانج!
Herr_Lang: Auf Wiedersehen! Bis bald! || مع السلامة! أشوفك قريب!
~~~

**ليه كده:** ده هدف في منهج كورسات الاندماج: تعرّف نفسك لجيرانك كساكن جديد (12.4.1). الجار بيتنادى [[Herr]] واسم العيلة، مش اسمه الأول. و [[schon lange]] و [[der neue Nachbar]] زيادة صغيرة مفهومة من الموقف، وهتتشرح في وحدة السكن.

**الغلطة الشائعة:** [[Herr Peter]]: الأستاذ بيتنادى باسم العيلة بس، [[Herr Lang]].` },
        { lvl: 'كبير', t: R`محاكاة «Sprechen Teil 1» كاملة بالوقت`, what: R`اعمل امتحان الكلام الجزء الأول زي الحقيقة: (١) تعرّف نفسك بالكلمات المفتاحية في دقيقة، (٢) حد يطلب منك تتهجّى كلمة (اطلب من صاحبك أو من موديل AI يختار كلمة من الكارت)، (٣) حد يطلب منك رقم (تليفونك أو رقم بيتك). سجّل كله، وقيّم نفسك بمعايير Goethe اللي في درس الامتحان، وابعت النص لموديل AI بالطلب الجاهز هناك.`,
          done: R`التسجيل فيه التلات حاجات، وقيّمت نفسك على ٣ نقط، وصلّحت كل غلطة الموديل طلّعها وسجّلت تاني`,
          sol: R`**الامتحان بالترتيب، والنموذج بالصوت:**

~~~de Prüfer=m Karim=m
Prüfer: Bitte stellen Sie sich vor. || عرّف نفسك من فضلك.
Karim: Mein Name ist Karim Mansour. Ich bin 24 Jahre alt. Ich komme aus Ägypten und wohne jetzt in Leipzig. Ich spreche Arabisch, Englisch und ein bisschen Deutsch. Ich bin Student. Mein Hobby ist Fußball. || ...
Prüfer: Danke. Buchstabieren Sie bitte Ihren Namen. || شكرًا. اتهجّى اسمك من فضلك.
Karim: M, A, N, S, O, U, R. || ...
Prüfer: Und wie ist Ihre Telefonnummer? || ورقم تليفونك؟
Karim: 0176 3482 950: null, eins, sieben, sechs, drei, vier, acht, zwei, neun, fünf, null. || ...
~~~

**التقييم:** الجزء ده عليه ٣ نقط في Goethe: النقط على إنك تقدّم المعلومات المطلوبة بشكل مفهوم، وتتهجّى صح، وتقول الرقم صح. الأخطاء الصغيرة في القواعد مبتنزّلش النقطة لو الكلام مفهوم (التفاصيل في درس الامتحان).

**ليه كده:** الرقم اتقال رقم رقم، وده أسلم في الامتحان (مش لازم تجمعهم «سبعة وتلاتين»). والتهجّي بأسامي الحروف الألماني ([[U]] بتتنطق «أو»، مش «يو» زي الإنجليزي).

**الغلطة الشائعة:** تتهجّى بالإنجليزي من التعوّد: [[A]] «إيه» و [[E]] «إي» و [[I]] «آي». في الألماني [[A]] «آ» و [[E]] «إيه» و [[I]] «إي». ودي أكتر غلطة بتضيّع نقطة التهجّي.` },
        { lvl: 'فكرة', t: R`بروفايل على تطبيق تبادل لغات`, what: R`اعمل بروفايل بالألماني على تطبيق تبادل لغات (Tandem أو HelloTalk أو أي واحد): ٤–٦ جمل عن نفسك، وجملة بتقول عايز تتكلم مع مين. وابعت رسالة أولى لحد بيتكلم ألماني.`,
          done: R`البروفايل مكتوب بالألماني من غير مترجم، والرسالة الأولى اتبعتت، ورديت على أول رد`,
          sol: R`**نسخة نموذجية للبروفايل والرسالة الأولى:**

~~~de Profil
Hallo! Ich heiße Mona. || أهلًا! اسمي منى.
Ich komme aus Ägypten und wohne in Kairo. || أنا من مصر وساكنة في القاهرة.
Ich spreche Arabisch und Englisch. || بتكلم عربي وإنجليزي.
Ich lerne Deutsch. || بتعلم ألماني.
Ich suche Partner für Deutsch und Arabisch. || بدوّر على حد نتبادل ألماني وعربي.
~~~

~~~de Erste Nachricht
Hallo Jan! Ich bin Mona aus Kairo. Ich lerne Deutsch. Du lernst Arabisch, richtig? || أهلًا يا يان! أنا منى من القاهرة. بتعلم ألماني. وإنت بتتعلم عربي، صح؟
~~~

**ليه كده:** في تطبيقات التبادل الناس بتقول [[du]] لبعض من أول رسالة، فالرسالة بـ [[du]] (عكس الحوار مع الجار). و [[lernen]] و [[suchen]] أفعال عادية بنفس نهايات [[wohnen]].

**الأمان:** متكتبش رقم تليفونك ولا عنوانك في البروفايل، وخلّي الكلام جوه التطبيق لحد ما تعرف الشخص.` },
      ],
      items: [
        {
          cmd: "Hallo! Guten Tag!",
          title: "التحية والوداع، و «عامل إيه؟»",
          desc: R`التحية في الألماني بتتغيّر حسب **الوقت** ([[Guten Morgen]] و [[Guten Tag]] و [[Guten Abend]]) وحسب **الشخص** (رسمي ولا صاحبك). والوداع كمان: [[Auf Wiedersehen]] رسمي و [[Tschüss]] مع أي حد تقريبًا.

و «عامل إيه؟» ليها شكلين: [[Wie geht es Ihnen?]] لحد بتقوله «حضرتك»، و [[Wie geht's?]] لصاحبك. والرد [[Danke, gut]]، وبعدها ترجّع السؤال [[Und Ihnen?]] أو [[Und dir?]].`,
          teach: R`## الموقف

أول يوم في كورس الألماني في ألمانيا. الساعة ٩ الصبح، والمدرّسة داخلة الفصل، وبعد الكورس هتقابل زميلك في الشارع. هتسلّم إزاي على الاتنين؟ (هدف في منهج كورسات الاندماج: تسلّم وترد السلام وتودّع، D 1.1 و D 1.6 و D 2.1.)

## اسمع: الصبح مع المدرّسة (رسمي)

دوس ▶ جنب كل سطر، والسلحفاة 🐢 بتقوله أبطأ. اسمع الحوار مرتين: مرة وإنت باصص على الترجمة، ومرة من غيرها.

~~~de Frau_Weber=f Tarek=m
Frau_Weber: Guten Morgen! || صباح الخير!
Tarek: Guten Morgen, Frau Weber! || صباح النور يا أستاذة ڤيبر!
Frau_Weber: Wie geht es Ihnen? || حضرتك عامل إيه؟
Tarek: Danke, gut. Und Ihnen? || كويس، شكرًا. وحضرتك؟
Frau_Weber: Auch gut, danke. || كويسة برضه، شكرًا.
~~~

## اسمع: بعد الكورس مع زميلك (مش رسمي)

~~~de Mia=f Tarek=m
Mia: Hallo, Tarek! || أهلًا يا طارق!
Tarek: Hallo, Mia! Wie geht's? || أهلًا يا ميا! عاملة إيه؟
Mia: Super! Und dir? || تمام جدًا! وإنت؟
Tarek: Es geht. || ماشي الحال.
Mia: Tschüss! Bis morgen! || باي! أشوفك بكرة!
Tarek: Tschüss! || باي!
~~~

لاحظ الفرق: مع المدرّسة [[Frau Weber]] و [[Ihnen]]، ومع ميا اسمها الأول و [[dir]]. ده نفس الفرق بين «حضرتك» و «إنت» عندنا.

## الكلمات

~~~words التحية والوداع
Guten Morgen! | صباح الخير (لحد الضهر تقريبًا) | Guten Morgen, Frau Weber!
Guten Tag! | نهارك سعيد (من الضهر لحد المغرب، والأسلم مع أي حد رسمي) | Guten Tag, Herr Klein!
Guten Abend! | مساء الخير | Guten Abend! Wie geht es Ihnen?
Hallo! | أهلًا (مع أي حد تقريبًا) | Hallo, wie geht's?
Tschüss! | باي | Tschüss, bis morgen!
Auf Wiedersehen! | مع السلامة (رسمي) | Auf Wiedersehen, Herr Klein!
Gute Nacht! | تصبح على خير (وإنت رايح تنام بس) | Gute Nacht, Mama!
Bis morgen! | أشوفك بكرة | Tschüss, bis morgen!
danke | شكرًا | Danke, gut.
bitte | من فضلك، وكمان «العفو» | Danke! Bitte!
gut | كويس | Mir geht es gut.
Wie geht's? | عامل إيه؟ (مش رسمي) | Hallo, Mia! Wie geht's?
Wie geht es Ihnen? | حضرتك عامل إيه؟ (رسمي) | Guten Tag! Wie geht es Ihnen?
~~~

## القاعدة ١: التحية حسب الوقت

| الوقت | التحية | مع صحابك |
|---|---|---|
| الصبح لحد حوالي ١١ | [[Guten Morgen!]] | [[Morgen!]] أو [[Hallo!]] |
| من الضهر لحد المغرب | [[Guten Tag!]] | [[Hallo!]] |
| بالليل | [[Guten Abend!]] | [[Hallo!]] أو [[Abend!]] |
| وإنت رايح تنام | [[Gute Nacht!]] | [[Gute Nacht!]] أو [[Nacht!]] |

[[Gute Nacht]] **مش تحية.** دي زي «تصبح على خير»: بتتقال في آخر اليوم وإنت مروّح أو رايح تنام. لو داخل محل الساعة ٩ بالليل تقول [[Guten Abend!]].

## القاعدة ٢: الوداع

| الموقف | الوداع |
|---|---|
| رسمي (موظف، دكتور، ممتحن) | [[Auf Wiedersehen!]] |
| مع أي حد تقريبًا (المحل، الزمايل، الصحاب) | [[Tschüss!]] |
| هتشوفه قريب | [[Bis morgen!]] (بكرة) أو [[Bis bald!]] (قريب) أو [[Bis später!]] (كمان شوية) |
| في التليفون الرسمي | [[Auf Wiederhören!]] (بنسمع، مش بنشوف) |

## القاعدة ٣: «عامل إيه؟» والرد

السؤال الرسمي [[Wie geht es Ihnen?]] والمش رسمي [[Wie geht's?]] (وده اختصار [[Wie geht es dir?]]). الرد من الأحسن للأوحش:

~~~de الردود
Sehr gut, danke! || كويس جدًا، شكرًا!
Gut, danke. || كويس، شكرًا.
Es geht. || ماشي الحال.
Nicht so gut. || مش أحسن حاجة.
Schlecht. || وحش.
~~~

وبعد الرد ترجّع السؤال: [[Und Ihnen?]] (حضرتك) أو [[Und dir?]] (إنت). الكلمتين دول [[Ihnen]] و [[dir]] من حالة اسمها Dativ هتتشرح في وحدتها. دلوقتي احفظ الجمل زي ما هي.

## مقارنة بالعربي والإنجليزي

- [[Guten Tag]] حرفيًا «يوم كويس»، زي [[Good day]] القديمة في الإنجليزي. وبيتقال في مكان «السلام عليكم» الرسمية: في المصلحة والمحل والعيادة.
- [[Wie geht's?]] بين الصحاب سؤال بجد: ممكن صاحبك يحكيلك فعلًا هو عامل إيه، مش زي [[How are you?]] اللي غالبًا بتتقال من غير ما حد يستنى إجابة. والكاشير في السوبرماركت مش هيسألك السؤال ده أصلًا: هيقول [[Hallo]] أو [[Guten Tag]] بس.
- في جنوب ألمانيا والنمسا هتسمع [[Grüß Gott!]] (تحية) و [[Servus!]] (مع الصحاب، للتحية والوداع)، وفي سويسرا [[Grüezi!]]. امتحان ÖSD فيه نصوص من النمسا وسويسرا، فاعرفهم لما تسمعهم.

~~~de من النمسا وسويسرا وجنوب ألمانيا
Grüß Gott! || السلام عليكم (جنوب ألمانيا والنمسا)
Servus! || أهلًا، وكمان باي (مع الصحاب)
Grüezi! || السلام عليكم (سويسرا)
~~~

## النطق: ٣ حاجات للعرب بالذات

- [[ch]] بعد [[a]] و [[o]] و [[u]] زي **خ** عندنا بالظبط: [[Nacht]] «ناخت». دي ميزة ليك، الأجانب التانيين بيتعبوا فيها.
- [[W]] في الألماني صوت **ڤ** (زي V في الإنجليزي)، مش «و»: [[Wie]] «ڤي»، و [[Wiedersehen]] «ڤيدرزيهن». لو قلت «وي» هتتفهم بس هتبان أجنبي.
- [[ü]] في [[Tschüss]]: قول «إي» وإنت مدوّر شفايفك كأنك هتقول «أو». جرّب بالسلحفاة كذا مرة.

## قول بصوتك

~~~speak
Guten Morgen! || صباح الخير!
Guten Tag! Wie geht es Ihnen? || نهارك سعيد! حضرتك عامل إيه؟
Danke, gut. Und Ihnen? || كويس، شكرًا. وحضرتك؟
Gute Nacht! || تصبح على خير!
Tschüss! Bis morgen! || باي! أشوفك بكرة!
Auf Wiedersehen! || مع السلامة!
~~~

## إملا

~~~dictate
Guten Abend!
Wie geht es Ihnen?
f: Danke, gut. Und dir?
Auf Wiedersehen!
f: Tschüss, bis bald!
~~~

## من الحياة الحقيقية: Easy German

~~~yt aRlakaPVrEw Learn Basic German Greetings & Farewells in Slow German
- **قبل ما تشغّله:** اكتب من دماغك ٣ تحيات و ٢ وداع من الدرس.
- **وإنت بتتفرج:** علّم على كل واحدة منهم أول ما تسمعها، واكتب أي تحية أو وداع جديد مش في جدول الكلمات.
- **بعده:** قول كل حاجة جديدة كتبتها بصوت عالي ٣ مرات، وبعدين دوّر عليها في [DWDS](https://www.dwds.de) عشان تعرف بتتقال فين.
~~~`,
          deep: {
            why: R`التحية أول حاجة بتتقال في أي موقف، وأول ثواني في امتحان الكلام. لو قلت [[Hallo]] للممتحن مش غلط، بس [[Guten Tag]] بتبيّن إنك عارف الفرق بين الرسمي والمش رسمي، وده من معايير «مناسبة الكلام للموقف» في CEFR (A1: «يعمل تواصل اجتماعي بأبسط صيغ الأدب: التحية والوداع»).`,
            how: R`بتسأل نفسك سؤالين: (١) الساعة كام؟ فيختار [[Morgen]] أو [[Tag]] أو [[Abend]]. (٢) الشخص ده بقوله «حضرتك»؟ فلو أيوه: [[Guten …]] واسم العيلة و [[Ihnen]] و [[Auf Wiedersehen]]. لو لأ: [[Hallo]] والاسم الأول و [[dir]] و [[Tschüss]].`,
            when: R`[[Hallo]] و [[Tschüss]] بقوا ينفعوا في أماكن كتير حتى مع ناس متعرفهمش (المحل، الكافيه، الجيم). [[Guten Tag]] و [[Auf Wiedersehen]] للمصالح الحكومية، والدكتور، والبنك، ومقابلة الشغل، والممتحن. ولو مش متأكد: الرسمي عمره ما هيضايق حد.`,
            mistakes: R`- [[Gute Nacht]] كتحية بالليل: غلط، دي «تصبح على خير».
- [[Guten Morgen]] الساعة ٣ العصر: الناس هتضحك وتصحّحلك [[Guten Tag]].
- ترد على [[Wie geht es Ihnen?]] بـ [[Und dir?]]: لخبطت الرسمي بالمش رسمي. لازم [[Und Ihnen?]].
- تكتب [[Tschüs]] أو [[Tschüß]]: الاتنين موجودين، والشكل المستخدم أكتر النهارده [[Tschüss]].
- [[Danke, gut]] من غير ما ترجّع السؤال: مش غلط، بس [[Und Ihnen?]] هي الأدب العادي.`
          },
          try: R`طول يومك النهارده، كل ما تسلّم على حد أو تودّعه بالعربي، قول في دماغك الجملة الألماني المناسبة (الوقت والشخص). وفي الآخر سجّل نفسك في «قول بصوتك» وقارن بالأصل.`,
          practice: [
            { lvl: 'سريع', t: R`**التحية المناسبة:** قول التحية في كل موقف: (١) الساعة ٨ الصبح، داخل عيادة الدكتور. (٢) الساعة ٢ الضهر، في مكتب الجوازات. (٣) الساعة ٨ بالليل، بتقابل جارك على السلم. (٤) الساعة ١١ بالليل، رايح تنام وبتكلم مامتك.`,
              done: R`الأربع إجابات مختلفين، ومفيش [[Gute Nacht]] غير في الرابعة`,
              sol: R`~~~de
Guten Morgen! || (١) الصبح
Guten Tag! || (٢) الضهر
Guten Abend! || (٣) بالليل وإنت لسه في نص اليوم
Gute Nacht! || (٤) وإنت رايح تنام
~~~

**ليه:** التحية بتتحدد بالوقت، و [[Gute Nacht]] بس لما اليوم بيخلص. في (٣) الجار ممكن يقولك [[Hallo]] كمان، وده عادي، بس [[Guten Abend]] أأمن مع حد لسه متعرفوش.` },
            { lvl: 'تطبيق', t: R`**رتّب الحوار:** السطور دي من حوار بين موظفة في مكتب وزبون، بس متلخبطة: [[Danke, gut. Und Ihnen?]] / [[Auf Wiedersehen!]] / [[Guten Tag! Wie geht es Ihnen?]] / [[Auch gut, danke. Auf Wiedersehen!]] / [[Guten Tag!]]. رتّبهم واكتب مين بيقول إيه.`,
              done: R`الحوار بيبدأ بتحية وبيخلص بـ [[Auf Wiedersehen]]، وكل سؤال بعده رده`,
              sol: R`~~~de Kundin=f Herr_Ali=m
Herr_Ali: Guten Tag!
Kundin: Guten Tag! Wie geht es Ihnen?
Herr_Ali: Danke, gut. Und Ihnen?
Kundin: Auch gut, danke. Auf Wiedersehen!
Herr_Ali: Auf Wiedersehen!
~~~

**ليه الترتيب ده:** التحية الأول وبعدها ردها، وبعدين السؤال ([[Wie geht es Ihnen?]]) والرد عليه ([[Danke, gut]]) ورجوع السؤال ([[Und Ihnen?]])، وبعدين [[Auch gut]] (كويس **برضه**: [[auch]] = برضه)، ونهاية بالوداع من الاتنين. ولاحظ إن [[Auch gut]] مينفعش تيجي قبل [[Und Ihnen?]]: «برضه» معناها إن حد قال «كويس» قبلها.` },
            { lvl: 'تطبيق', t: R`**صلّح الغلط:** كل جملة فيها غلطة في الموقف أو في الكتابة. لاقيها وصلّحها: (١) داخل محل الساعة ٩ بالليل: [[Gute Nacht!]] (٢) لمديرك الجديد: [[Hallo! Wie geht's?]] (٣) [[Guten morgen, Frau Weber!]] (٤) ممتحن سألك [[Wie geht es Ihnen?]] وإنت رديت [[Gut, danke. Und dir?]]`,
              done: R`لقيت الـ ٤ أغلاط، وقلت سبب كل واحد في كلمتين`,
              sol: R`~~~de
Guten Abend! || (١) Gute Nacht للنوم بس
Guten Tag! Wie geht es Ihnen? || (٢) المدير الجديد رسمي
Guten Morgen, Frau Weber! || (٣) Morgen اسم، فحرف كبير
Gut, danke. Und Ihnen? || (٤) الممتحن بـ Sie، فالرد Ihnen
~~~

**ليه:** (٣) هي الغلطة اللي محدش بياخد باله منها: في الألماني **كل اسم بحرف كبير**، و [[Morgen]] هنا اسم (الصبح). ده بيفرق في الكتابة وفي الإملا في الامتحان.` },
            { lvl: 'تحدي', t: R`**حوارين بنفسك:** اكتب حوار رسمي (٤ سطور) مع موظفة في البنك الساعة ١٠ الصبح، وحوار مش رسمي (٤ سطور) مع صاحبك بالليل. بعدين قول الاتنين بصوت عالي وسجّلهم.`,
              done: R`الرسمي فيه [[Ihnen]] و [[Auf Wiedersehen]]، والمش رسمي فيه [[dir]] أو [[Wie geht's]] و [[Tschüss]]، والتحيات مناسبة للوقت`,
              sol: R`**نسخة نموذجية:**

~~~de Bankangestellte=f Omar=m في البنك، الساعة ١٠ الصبح
Omar: Guten Morgen!
Bankangestellte: Guten Morgen! Wie geht es Ihnen?
Omar: Danke, sehr gut. Und Ihnen?
Bankangestellte: Gut, danke.
~~~

~~~de Lea=f Omar=m مع صاحبتك بالليل
Lea: Hallo, Omar! Wie geht's?
Omar: Hallo, Lea! Es geht. Und dir?
Lea: Super! Tschüss, bis morgen!
Omar: Tschüss!
~~~

**ليه:** الحوار الأول كله «حضرتك» ([[Ihnen]])، والتاني «إنت» ([[dir]]). والتحية في الاتنين حسب الوقت: [[Guten Morgen]] الصبح، و [[Hallo]] مع الصاحب في أي وقت.` },
            { lvl: 'تطبيق', t: R`**اشرحها:** صاحبك بيقول «[[Wie geht's]] و [[Wie geht es Ihnen]] نفس الحاجة». اشرحله الفرق في سطرين، بمثال.`,
              done: R`الشرح فيه مين بنقوله كل واحدة، ومثال لكل واحدة`,
              sol: R`**إجابة نموذجية:** المعنى واحد («عامل إيه؟»)، بس [[Wie geht es Ihnen?]] للي بتقوله «حضرتك» (الدكتور، الموظف، الممتحن)، و [[Wie geht's?]] لصاحبك أو حد من العيلة. مثال: لجارك الكبير [[Guten Tag! Wie geht es Ihnen?]]، ولزميلك في الكورس [[Hallo! Wie geht's?]].` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Prüfungsziele, Testbeschreibung (Sprachhandlungen: soziale Konventionen، ص ٥٥ وما بعدها)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: D 1.1 و D 1.6 (ص ٥٥ و ٥٧)، و D 2.1 (ص ٥٧)", url: "https://www.goethe.de/resources/files/pdf209/rahmencurriculum-integrationskurs_20171.pdf" },
            { t: "DWDS: Tschüss", url: "https://www.dwds.de/wb/tsch%C3%BCss" },
            { t: "DWDS: Grüß Gott", url: "https://www.dwds.de/wb/Gr%C3%BC%C3%9F%20Gott" },
            { t: "Easy German: Greetings & Farewells in Slow German", url: "https://www.youtube.com/watch?v=aRlakaPVrEw" },
          ],
        },
        {
          cmd: "Ich heiße …",
          title: "اسمك، و sein و heißen، و Sie ولا du",
          pre: ["dea1/Hallo! Guten Tag!"],
          desc: R`تقول اسمك بتلات طرق: [[Ich heiße Karim]] و [[Mein Name ist Karim Mansour]] و [[Ich bin Karim]]. وتسأل [[Wie heißen Sie?]] (رسمي) أو [[Wie heißt du?]] (مش رسمي).

وهنا أول قاعدة كبيرة في الألماني: **الفعل بيتغيّر حسب مين بيعمله** ([[ich heiße]] و [[du heißt]] و [[Sie heißen]])، زي العربي بالظبط (أنا اسمي، إنت اسمك). وأهم فعل في اللغة [[sein]] («يكون») شاذ ولازم يتحفظ: [[ich bin]] و [[du bist]] و [[Sie sind]].`,
          teach: R`## الموقف

أول حصة في الكورس، والمدرّس بيطلب من كل واحد يعرّف نفسه، وبعدها في البريك بتتعرّف على زميلة. (D 1.2: تعرّف نفسك، وتعرّف حد تاني، وترد بأدب.)

~~~de Herr_Braun=m Nadia=f
Herr_Braun: Guten Morgen! Mein Name ist Braun. Ich bin Ihr Lehrer. || صباح الخير! اسمي براون. أنا مدرّسكم.
Herr_Braun: Wie heißen Sie? || اسم حضرتك إيه؟
Nadia: Ich heiße Nadia Khalil. || اسمي نادية خليل.
Herr_Braun: Freut mich, Frau Khalil! || تشرفنا يا مدام خليل!
Nadia: Freut mich auch! || الشرف ليّا!
~~~

~~~de Nadia=f Ben=m في البريك
Ben: Hallo! Ich bin Ben. Und du? Wie heißt du? || أهلًا! أنا بن. وإنتي؟ اسمك إيه؟
Nadia: Ich heiße Nadia. || اسمي نادية.
Ben: Freut mich, Nadia! Das ist Sara. || تشرفنا يا نادية! دي سارة.
Nadia: Hallo, Sara! || أهلًا يا سارة!
~~~

## الكلمات

~~~words الاسم والتعارف
der Name, die Namen | الاسم | Mein Name ist Nadia Khalil.
der Vorname, die Vornamen | الاسم الأول | Mein Vorname ist Nadia.
der Familienname, die Familiennamen | اسم العيلة | Mein Familienname ist Khalil.
heißen | يكون اسمه | Ich heiße Karim.
sein | يكون | Ich bin Lehrer.
Herr | أستاذ (قبل اسم العيلة لراجل) | Guten Tag, Herr Braun!
Frau | مدام، أستاذة (قبل اسم العيلة لست) | Guten Tag, Frau Khalil!
Freut mich! | تشرفنا! | Freut mich, Frau Khalil!
Das ist … | ده / دي … (لما تعرّف حد) | Das ist Sara.
~~~

اللون بيقولك نوع الاسم: [[der]] أزرق (مذكر)، و [[die]] أحمر (مؤنث)، و [[das]] أخضر (محايد). وبعد الفصلة الجمع. المعلومة دي بتتحفظ مع الكلمة من أول يوم، والقاعدة الكاملة في وحدة جاية.

## القاعدة ١: تلات طرق تقول اسمك

| الجملة | امتى |
|---|---|
| [[Ich heiße Karim Mansour.]] | الأشهر، في أي موقف |
| [[Mein Name ist Karim Mansour.]] | رسمي شوية (التليفون، المكتب، الامتحان) |
| [[Ich bin Karim.]] | مش رسمي، غالبًا بالاسم الأول بس |

وتسأل: [[Wie heißen Sie?]] أو [[Wie ist Ihr Name?]] (رسمي)، و [[Wie heißt du?]] (مش رسمي). لاحظ: «اسمك إيه؟» في الألماني [[Wie]] (إزاي) مش [[Was]] (إيه): [[Was ist Ihr Name?]] مفهومة بس غريبة.

## القاعدة ٢: الفعل بيتغيّر حسب الفاعل

الفعل في القاموس بيخلص بـ [[-en]]: [[heißen]]، [[wohnen]]، [[kommen]]. ده «المصدر». لما تستخدمه بتشيل [[-en]] وتحط نهاية حسب الفاعل:

| الفاعل | المعنى | heißen | sein (شاذ) |
|---|---|---|---|
| [[ich]] | أنا | [[heiße]] | [[bin]] |
| [[du]] | إنت/إنتي (صاحبك) | [[heißt]] | [[bist]] |
| [[er]] / [[sie]] / [[es]] | هو / هي / (للحاجة) | [[heißt]] | [[ist]] |
| [[wir]] | إحنا | [[heißen]] | [[sind]] |
| [[ihr]] | إنتو (صحابك) | [[heißt]] | [[seid]] |
| [[sie]] / [[Sie]] | هم / حضرتك (وحضراتكم) | [[heißen]] | [[sind]] |

~~~de sein: ركّز في النطق
ich bin, du bist, er ist, sie ist
wir sind, ihr seid, sie sind, Sie sind
~~~

- [[du heißt]] مش [[du heißst]]: الفعل جذره بيخلص بـ [[ß]] (صوت س)، ونهاية [[du]] هي [[-st]]، فالـ s بتاعة النهاية بتختفي.
- [[sie]] بحرف صغير = «هي» أو «هم». و [[Sie]] بحرف كبير = «حضرتك». في الكلام مش هتفرّق غير من الفعل والموقف: [[sie heißt]] (هي) لكن [[Sie heißen]] (حضرتك).

## القاعدة ٣: Sie ولا du؟

| [[Sie]] (حضرتك) | [[du]] (إنت) |
|---|---|
| أي حد كبير متعرفوش | الصحاب والعيلة |
| الموظفين، والدكتور، والمدرّس، والممتحن | الأطفال، والطلبة مع بعض |
| الشغل في الأول (إلا لو الشركة كلها بـ [[du]]) | زمايل الكورس غالبًا |
| بتنادي بـ [[Herr]] / [[Frau]] + اسم العيلة | بتنادي بالاسم الأول |

لو حد قالك [[Sag ruhig du!]] أو [[Wir können uns duzen.]] يبقى بيعرض عليك [[du]]. والأكبر سنًا أو الأعلى في الشغل هو اللي بيعرض عادة. (D 1.4 في منهج الاندماج: تعرض [[du]] وترد على العرض.)

~~~de Frau_Weber=f Tarek=m عرض «du»
Frau_Weber: Wir können uns duzen. Ich bin Anna. || ممكن نقول لبعض «إنت». أنا آنا.
Tarek: Gern! Ich bin Tarek. || بكل سرور! أنا طارق.
~~~

## مقارنة بالعربي والإنجليزي

- **زي العربي:** الفعل بيتغيّر مع الفاعل (أكتب، تكتب، يكتب)، فإحساسك بالقاعدة دي موجود. الإنجليزي فيه تغيير واحد بس ([[he works]])، فاللي متعود على الإنجليزي بينسى النهايات.
- **[[Sie]]** زي «حضرتك»: بنكلّم الشخص بصيغة تانية غير «إنت». بس في الألماني صيغة «حضرتك» هي نفس صيغة الجمع «هم» ([[Sie sind]] = [[sie sind]]).
- **[[Herr Braun]]** زي «أستاذ فلان» بس باسم العيلة **بس**: [[Herr Ahmed]] (لو أحمد اسمك الأول) غلط، والصح [[Herr Mansour]].

## النطق

- [[ei]] في [[heiße]] و [[nein]] بتتنطق «آي». و [[ie]] في [[Sie]] و [[wie]] بتتنطق «إي» طويلة. القاعدة: الحرف التاني هو اللي بيتنطق بالاسم: [[ei]] = اسم حرف [[I]] بالإنجليزي، [[ie]] = اسم [[E]] بالإنجليزي.
- [[ß]] زي **س**: [[heiße]] «هايسه».
- [[ch]] في [[ich]] و [[mich]] صوت خفيف بين «ش» و «خ» (زي ما تقول «هيه» بنَفَس قوي). مش «إخ» ومش «إش».

~~~de اسمع الفرق
heißen, Sie, wie, mein, Name
ich, mich, Ihr Lehrer
~~~

## قول بصوتك

~~~speak
Ich heiße Karim Mansour. || اسمي كريم منصور.
Mein Name ist Nadia Khalil. || اسمي نادية خليل.
Wie heißen Sie? || اسم حضرتك إيه؟
Wie heißt du? || اسمك إيه؟
Freut mich! || تشرفنا!
Das ist Sara. || دي سارة.
~~~

## إملا

~~~dictate
Wie heißen Sie?
f: Ich heiße Nadia.
Mein Name ist Braun.
f: Das ist Herr Braun.
Freut mich!
~~~

## من الحياة الحقيقية: Easy German

~~~yt wqw336j-F3E German Verbs: Sein (Full Conjugation for Beginners)
- **قبل ما تشغّله:** اكتب تصريف [[sein]] كله من دماغك (٦ أشكال).
- **وإنت بتتفرج:** صحّح اللي كتبته، وعلّم على أي شكل نطقه طلع غير ما كنت متخيّل.
- **بعده:** قول ٣ جمل عن نفسك بـ [[ich bin]] (اسمك، شغلك، من أنهي مدينة).
~~~`,
          deep: {
            why: R`الاسم أول معلومة في امتحان الكلام والاستمارة. والتصريف (الفعل بيتغيّر مع الفاعل) فكرة هتقابلها في كل جملة ألماني بعد كده، و [[sein]] أكتر فعل بيتستخدم في اللغة. فلو اتحفظ صح من أول يوم، نص الجمل اللي جاية هتطلع صح لوحدها.`,
            how: R`الفعل العادي: مصدر [[heißen]] ← جذر [[heiß-]] ← نهاية الفاعل ([[-e]] و [[-st]] و [[-t]] و [[-en]] و [[-t]] و [[-en]]). و [[sein]] مالوش جذر ثابت، فبيتحفظ جدول. والسؤال عن الاسم بيبدأ بـ [[Wie]] وبعده الفعل على طول: [[Wie heißen Sie?]].`,
            when: R`[[Sie]] مع أي حد كبير متعرفوش أو في موقف رسمي، و [[du]] مع الصحاب والعيلة والأطفال وزمايل الكورس. في الامتحان الممتحن بيكلمك بـ [[Sie]]، فرد عليه بـ [[Sie]]. ولو مش متأكد، ابدأ بـ [[Sie]] لحد ما حد يعرض عليك [[du]].`,
            mistakes: R`- [[Ich bin heiße Karim]]: فعلين في جملة واحدة. يا [[Ich heiße Karim]] يا [[Ich bin Karim]].
- [[Was ist Ihr Name?]]: مفهومة بس مش طبيعية. الألمان بيقولوا [[Wie]].
- [[du heißst]]: الصح [[du heißt]].
- [[sie]] بحرف صغير وإنت تقصد «حضرتك»: في الكتابة ده غلط بيغيّر المعنى لـ «هي» أو «هم».
- [[Herr Karim]] لما كريم اسمك الأول: [[Herr]] و [[Frau]] قبل اسم العيلة بس.
- [[Frau]] لست متجوزة بس: لأ، [[Frau]] لأي ست كبيرة. كلمة [[Fräulein]] القديمة (للبنت) متستخدمهاش.`
          },
          try: R`اكتب جدول تصريف [[sein]] و [[heißen]] من دماغك على ورقة، وقارنه بالجدول فوق. وبعدين قول ٤ جمل: اسمك بالتلات طرق، وجملة بتعرّف بيها حد تاني ([[Das ist …]]).`,
          practice: [
            { lvl: 'سريع', t: R`**كمّل بشكل sein الصح:** (١) [[Ich ___ Karim.]] (٢) [[Wer ___ Sie?]] (٣) [[Das ___ Frau Weber.]] (٤) [[Wir ___ im Deutschkurs.]] (٥) [[___ du Ben?]] (٦) [[Ihr ___ Studenten.]]`,
              done: R`الست إجابات صح من غير ما تبص على الجدول`,
              sol: R`~~~de
Ich bin Karim.
Wer sind Sie?
Das ist Frau Weber.
Wir sind im Deutschkurs.
Bist du Ben?
Ihr seid Studenten.
~~~

**ليه:** [[Sie]] (حضرتك) وجمع [[wir]] بياخدوا نفس الشكل [[sind]]. و [[das]] ([[Das ist …]]) بيعامل معاملة «هو/هي» فـ [[ist]]. و [[ihr]] لوحدها بـ [[seid]] (بـ d، مش t). في (٥) السؤال بنعم أو لأ: الفعل الأول [[Bist du …?]].` },
            { lvl: 'سريع', t: R`**كمّل بشكل heißen الصح:** (١) [[Wie ___ du?]] (٢) [[Ich ___ Mona.]] (٣) [[Er ___ Jonas.]] (٤) [[Wie ___ Sie?]] (٥) [[Wir ___ Amr und Nour.]]`,
              done: R`الخمس إجابات صح، و (١) و (٣) بنفس الشكل`,
              sol: R`~~~de
Wie heißt du?
Ich heiße Mona.
Er heißt Jonas.
Wie heißen Sie?
Wir heißen Amr und Nour.
~~~

**ليه:** [[du]] و [[er]] الاتنين [[heißt]]: نهاية [[du]] العادية [[-st]]، بس الجذر [[heiß-]] بيخلص بصوت س، فبتبقى [[-t]] بس. ده بيحصل مع أي فعل جذره بيخلص بـ [[s]] أو [[ß]] أو [[z]].` },
            { lvl: 'تطبيق', t: R`**Sie ولا du؟** قول السؤال عن الاسم لكل واحد: (١) طفل عنده ٧ سنين في الحديقة. (٢) موظفة في البلدية. (٣) زميلك في الكورس. (٤) جار عنده ٦٠ سنة. (٥) طالبة في الجامعة في نفس سنك.`,
              done: R`كل إجابة فيها السؤال كامل، و [[Sie]] للتانية والرابعة`,
              sol: R`~~~de
Wie heißt du? || (١) طفل
Wie heißen Sie? || (٢) موظفة
Wie heißt du? || (٣) زميل الكورس
Wie heißen Sie? || (٤) جار كبير متعرفوش
Wie heißt du? || (٥) طالبة في سنك
~~~

**ليه:** الطلبة والشباب في سن بعض بيقولوا [[du]] لبعض على طول، وكمان الأطفال. الموظف والكبير اللي متعرفوش [[Sie]]. وفي (٤) لو الجار هو اللي قالك [[Sag ruhig du]] تقدر تقول [[du]] بعد كده.` },
            { lvl: 'تطبيق', t: R`**صلّح الغلط:** (١) [[Ich bin heiße Omar.]] (٢) [[Wie heißst du?]] (٣) [[Guten Tag, Herr Omar!]] (لو عمر اسمه الأول، واسم عيلته Hassan) (٤) [[Wie heißen sie?]] (وإنت بتكلّم الموظف) (٥) [[Was ist dein Name, Frau Weber?]]`,
              done: R`صلّحت الخمسة، وعرفت سبب كل واحدة`,
              sol: R`~~~de
Ich heiße Omar.
Wie heißt du?
Guten Tag, Herr Hassan!
Wie heißen Sie?
Wie ist Ihr Name, Frau Weber?
~~~

**ليه:** (١) فعلين: واحد بس. (٢) [[heißt]] مش [[heißst]]. (٣) [[Herr]] قبل اسم العيلة. (٤) «حضرتك» = [[Sie]] بحرف كبير. (٥) غلطتين: [[Wie]] مش [[Was]]، و [[Frau Weber]] رسمي، فـ [[Ihr Name]] (اسم حضرتك) مش [[dein Name]] (اسمك).` },
            { lvl: 'تحدي', t: R`**عرّف تلات ناس:** إنت في حفلة الكورس ومعاك صاحبك يوسف وزميلتك ليزا ومدرّسك الأستاذ براون. اكتب ٤–٦ سطور: بتعرّف نفسك لمدرّس من فصل تاني، وبتعرّف يوسف وليزا والأستاذ براون لبعض.`,
              done: R`استخدمت [[Das ist …]] لكل واحد، و [[Herr Braun]] (مش اسمه الأول)، وفيه [[Freut mich]] مرة على الأقل`,
              sol: R`**نسخة نموذجية:**

~~~de Frau_Roth=f Karim=m
Karim: Guten Abend! Ich heiße Karim. || مساء الخير! اسمي كريم.
Frau_Roth: Guten Abend! Mein Name ist Roth. Freut mich! || مساء النور! اسمي روت. تشرفنا!
Karim: Freut mich auch! Das ist Herr Braun, mein Lehrer. || الشرف ليّا! ده الأستاذ براون، مدرّسي.
Karim: Und das sind Yusuf und Lisa. || ودول يوسف وليزا.
~~~

**ليه:** [[Das ist]] لواحد، و [[Das sind]] لاتنين أو أكتر (زي «ده» و «دول»). ومدرّستك [[Frau Roth]] بتقول اسم عيلتها بس ([[Mein Name ist Roth]])، وده عادي في المواقف الرسمية.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Prüfungsziele (Grammatik: Verb، Personalpronomen، ص ١٠٠ وما بعدها)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: D 1.2 و D 1.4 (ص ٥٥ و ٥٦)", url: "https://www.goethe.de/resources/files/pdf209/rahmencurriculum-integrationskurs_20171.pdf" },
            { t: "Wiktionary: Flexion von sein", url: "https://de.wiktionary.org/wiki/Flexion:sein" },
            { t: "Wiktionary: Flexion von heißen", url: "https://de.wiktionary.org/wiki/Flexion:hei%C3%9Fen" },
            { t: "DWDS: duzen", url: "https://www.dwds.de/wb/duzen" },
            { t: "Easy German: German Verbs: Sein", url: "https://www.youtube.com/watch?v=wqw336j-F3E" },
          ],
        },
        {
          cmd: "Das Alphabet",
          title: "الحروف، وتتهجّى اسمك (buchstabieren)",
          pre: ["dea1/Ich heiße …"],
          desc: R`الحروف الألماني هي نفس الـ ٢٦ حرف بتوع الإنجليزي، ومعاهم [[ä]] و [[ö]] و [[ü]] و [[ß]]. بس **أسامي الحروف مختلفة**: [[A]] «آ» و [[E]] «إيه» و [[I]] «إي» و [[J]] «يوت» و [[V]] «فاو» و [[W]] «ڤيه» و [[Z]] «تسِت».

والتهجّي (buchstabieren) بتحتاجه في أي مكان: تليفون، مصلحة، دكتور، والامتحان بيطلبه في أول جزء في الكلام. واسمك العربي بالذات هتتهجّاه كتير، لأن الألمان مش هيعرفوا يكتبوه من السمع.`,
          teach: R`## الموقف

في مكتب تسجيل السكن (Bürgeramt) الموظفة بتكتب اسمك، ومش فاهمة هو [[Mansur]] ولا [[Mansour]] ولا [[Manssour]]. فبتقولك: [[Können Sie das bitte buchstabieren?]] (ممكن تتهجّاه من فضلك؟).

~~~de Beamtin=f Karim=m
Beamtin: Wie ist Ihr Familienname? || اسم العيلة؟
Karim: Mansour. || منصور.
Beamtin: Können Sie das bitte buchstabieren? || ممكن تتهجّاه من فضلك؟
Karim: M, A, N, S, O, U, R. || ...
Beamtin: Danke. || شكرًا.
~~~

## الحروف بأساميها

اسمع كل سطر، وكرّر ورا الصوت. الحروف اللي بتفرق عن الإنجليزي عليها ⚠ في الجدول تحت.

~~~de الحروف
A, B, C, D, E, F, G
H, I, J, K, L, M, N
O, P, Q, R, S, T, U
V, W, X, Y, Z
Ä, Ö, Ü, ß
~~~

| الحرف | بيتنطق | ملحوظة |
|---|---|---|
| [[A]] | آ | ⚠ مش «إيه» زي الإنجليزي |
| [[E]] | إيه | ⚠ مش «إي» |
| [[I]] | إي | ⚠ مش «آي» |
| [[J]] | يوت | ⚠ |
| [[R]] | إر (من الزور) | |
| [[U]] | أو | ⚠ مش «يو» |
| [[V]] | فاو | ⚠ |
| [[W]] | ڤيه | ⚠ مش «دبليو» |
| [[Y]] | إبسيلون | |
| [[Z]] | تسِت | ⚠ مش «زِد» |
| [[ß]] | إس تسِت | (Eszett) |
| [[Ä]] / [[Ö]] / [[Ü]] | زي ما بتتنطق في الكلمة | وممكن تقول [[A Umlaut]] |

## إزاي تتهجّى

- حرف حرف بأسامي الحروف: [[Nour]] ← [[N, O, U, R]].
- حرفين ورا بعض: [[zwei S]] أو [[Doppel-S]]. يعني [[Hassan]] ← [[H, A, zwei S, A, N]].
- الحرف الكبير مش لازم تقوله، إلا لو مهم (في الباسوورد مثلًا: [[großes M]]).
- الإيميل: [[@]] اسمها [[at]] (بتتنطق «إت»)، والنقطة [[Punkt]]، والشرطة [[Bindestrich]]، والشرطة اللي تحت [[Unterstrich]].

~~~de إيميل
N, O, U, R, Punkt, S, A, I, D, at, M, A, I, L, Punkt, D, E
~~~

## في التليفون: «A wie Aachen»

في التليفون الحروف بتتلخبط (B و P، و M و N)، فبيقولوا كلمة لكل حرف: [[M wie München]] (م زي ميونخ). القايمة الرسمية الجديدة في ألمانيا (DIN 5009 من ٢٠٢٢) أسامي مدن، والقديمة أسامي ناس ولسه بتتسمع كتير:

| الحرف | الجديدة (٢٠٢٢) | القديمة |
|---|---|---|
| [[A]] | [[Aachen]] | [[Anton]] |
| [[B]] | [[Berlin]] | [[Berta]] |
| [[D]] | [[Düsseldorf]] | [[Dora]] |
| [[M]] | [[München]] | [[Martha]] |
| [[N]] | [[Nürnberg]] | [[Nordpol]] |
| [[O]] | [[Offenbach]] | [[Otto]] |
| [[S]] | [[Salzwedel]] | [[Samuel]] |
| [[U]] | [[Unna]] | [[Ulrich]] |

~~~de بالتليفون
M wie München, A wie Aachen, N wie Nürnberg. || م زي ميونخ، آ زي آخن، ن زي نورنبرج.
~~~

مش لازم تحفظ القايمة كلها في A1. المهم تفهم الجملة لما تسمعها، وتقدر تقول [[M wie …]] بأي مدينة أو اسم تعرفه.

## أسئلة التهجّي

~~~de
Können Sie das bitte buchstabieren? || ممكن تتهجّاه من فضلك؟
Wie schreibt man das? || بيتكتب إزاي؟
Wie bitte? || نعم؟ (لما متسمعش كويس)
Noch einmal, bitte. || مرة كمان، من فضلك.
Langsam, bitte. || براحة، من فضلك.
~~~

[[Können Sie …?]] جملة جاهزة دلوقتي، والفعل [[können]] (يقدر) ليه وحدة لوحده بعدين. والجمل التلاتة الأخيرة هتنقذك في أي موقف مسمعتش فيه كويس (A 4.2 في منهج الاندماج: تطلب إعادة، وتطلب يتكلم أبطأ).

## الكلمات

~~~words التهجّي
das Alphabet, die Alphabete | الحروف (الأبجدية) | Das Alphabet hat 26 Buchstaben.
der Buchstabe, die Buchstaben | الحرف | Mein Name hat sechs Buchstaben.
buchstabieren | يتهجّى | Können Sie das bitte buchstabieren?
schreiben | يكتب | Wie schreibt man das?
Wie bitte? | نعم؟ (مسمعتش) | Wie bitte? Noch einmal, bitte.
langsam | براحة، بالراحة | Langsam, bitte.
noch einmal | مرة كمان | Noch einmal, bitte.
der Punkt, die Punkte | النقطة | Nour Punkt Said.
~~~

## النطق للعرب

- [[R]] الألماني من الزور، قريب من **غ** خفيفة، مش «ر» العربي الملفوفة: [[Rostock]]. وفي آخر الكلمة بيبقى شبه «آ»: [[Lehrer]] «ليرا».
- [[Z]] = **تس** دايمًا: [[Zahl]] «تسال». ده من أكتر الحروف اللي العرب بيغلطوا فيها (بيقولوها ز).
- [[S]] قبل حرف متحرك = **ز**: [[Sie]] «زي»، [[Salzwedel]] «زالتسڤيدل». و [[ß]] و [[ss]] = **س**.
- [[V]] غالبًا **ف**: [[Vater]] «فاتر»، [[Völklingen]].
- [[ö]] زي «إيه» بشفايف مدوّرة، و [[ü]] زي «إي» بشفايف مدوّرة.

## قول بصوتك

~~~speak
A, E, I, O, U || الحروف المتحركة
J, V, W, Z || الحروف اللي بتفرق
M, A, N, S, O, U, R || تهجّي منصور
Können Sie das bitte buchstabieren? || ممكن تتهجّاه؟
Noch einmal, bitte. || مرة كمان.
~~~

## إملا: اسمع التهجّي واكتب الكلمة

~~~dictate
B, E, R, L, I, N => Berlin
S, A, L, A, H => Salah
W, E, B, E, R => Weber
Y, A, S, M, I, N => Yasmin
J, E, N, A => Jena
~~~

الصوت بيتهجّى حرف حرف، وإنت تكتب الكلمة كاملة (أول حرف كبير، لأنها أسامي).

## من الحياة الحقيقية: Easy German

~~~yt hAkxKMlYUI4 German Alphabet & Pronunciation - Full Guide
- **قبل ما تشغّله:** قول الحروف كلها مرة من دماغك وسجّل نفسك.
- **وإنت بتتفرج:** وقّف بعد كل حرف وقول ورا المتكلم، وعلّم على الحروف اللي كنت بتقولها غلط في تسجيلك.
- **بعده:** سجّل الحروف تاني، واسمع التسجيلين ورا بعض.
~~~`,
          deep: {
            why: R`في الامتحان (Goethe و telc، الجزء الأول في الكلام) الممتحن بيطلب منك تتهجّى كلمة، وده عليه نقطة. وفي الحياة، اسمك العربي ليه كذا كتابة بالحروف اللاتيني (Mohamed و Muhammad و Mohammed)، فمن غير تهجّي هيتكتب غلط في عقد الشقة أو التأمين، وده ممكن يعمل مشكلة في المصالح.`,
            how: R`كل حرف بيتقال باسمه الألماني، والحروف المتكررة [[zwei …]] أو [[Doppel-…]]. في التليفون أو الدوشة: الحرف و [[wie]] وكلمة بتبدأ بيه. ولما متفهمش اللي بيتهجّى: [[Wie bitte?]] أو [[Noch einmal, bitte]] أو [[Langsam, bitte]].`,
            when: R`أي حاجة بتتكتب بإيد حد تاني من سمعك: اسمك، واسم الشارع، والإيميل، ورقم الحجز، والباسوورد اللي بيقوله الدعم الفني. وأي اسم أجنبي أو غريب.`,
            mistakes: R`- تتهجّى بأسامي الحروف الإنجليزي: [[A]] «إيه» و [[E]] «إي» و [[I]] «آي». ودي بتلخبط الحروف التلاتة.
- [[Z]] «زِد» أو «زي»: في الألماني «تسِت».
- [[J]] «جيه»: في الألماني «يوت»، وكمان [[J]] في الكلمات صوت «ي»: [[Jasmin]] «ياسمين».
- [[W]] «دبليو»: في الألماني «ڤيه».
- تنسى [[zwei S]] في اسم زي [[Hassan]]، فيتكتب [[Hasan]].`
          },
          try: R`اتهجّى اسمك الكامل وإيميلك بصوت عالي وسجّل نفسك. اسمع التسجيل وإنت باصص على جدول الحروف: علّم على أي حرف نطقته بالإنجليزي.`,
          practice: [
            { lvl: 'سريع', t: R`**أسامي الحروف:** قول اسم كل حرف بالألماني واكتبه بالعربي زي ما بيتنطق: [[A]] و [[E]] و [[I]] و [[J]] و [[U]] و [[V]] و [[W]] و [[Z]].`,
              done: R`التمانية من غير ولا واحد بالنطق الإنجليزي`,
              sol: R`| الحرف | النطق |
|---|---|
| [[A]] | آ |
| [[E]] | إيه |
| [[I]] | إي |
| [[J]] | يوت |
| [[U]] | أو |
| [[V]] | فاو |
| [[W]] | ڤيه |
| [[Z]] | تسِت |

~~~de
A, E, I, J, U, V, W, Z
~~~

**ليه:** دول الحروف اللي اسمها في الألماني مختلف تمامًا عن الإنجليزي. [[A]] و [[E]] و [[I]] بالذات بيتلخبطوا، لأن [[E]] الألماني زي [[A]] الإنجليزي، و [[I]] الألماني زي [[E]] الإنجليزي.` },
            { lvl: 'تطبيق', t: R`**اتهجّى الأسامي دي** (اكتب التهجّي زي ما هتقوله): (١) [[Hassan]] (٢) [[Yasmin]] (٣) [[Weiß]] (٤) [[Jülich]] (٥) [[zaid.ali@post.de]]`,
              done: R`كل تهجّي كامل، وفيه [[zwei S]] و [[Eszett]] و [[Punkt]] و [[at]] في مكانهم`,
              sol: R`~~~de
H, A, zwei S, A, N
Y, A, S, M, I, N
W, E, I, Eszett
J, Ü, L, I, C, H
Z, A, I, D, Punkt, A, L, I, at, P, O, S, T, Punkt, D, E
~~~

**ليه:** [[ss]] بتتقال [[zwei S]]، و [[ß]] اسمها [[Eszett]]. و [[Ü]] بتتقال زي صوتها. والإيميل كل نقطة [[Punkt]] و [[@]] [[at]]. وفي (٢) [[Y]] اسمها [[Ypsilon]].` },
            { lvl: 'تطبيق', t: R`**اسمع واكتب:** صاحبك (أو موديل AI بصوت، أو إنت بالسلحفاة في درس الحروف) يتهجّى لك ٥ أسامي من الجدول الجديد للتليفون (Aachen، Berlin، Düsseldorf، München، Unna) من غير ما تشوفها، وإنت تكتبها. بعدين قارن.`,
              done: R`الخمسة مكتوبين صح، ومن غير ما تقول [[Wie bitte?]] أكتر من مرتين`,
              sol: R`~~~de
A, A, C, H, E, N
B, E, R, L, I, N
D, Ü, zwei S, E, L, D, O, R, F
M, Ü, N, C, H, E, N
U, zwei N, A
~~~

**ليه:** [[Aachen]] فيها [[A]] مرتين في الأول (ممكن تتقال [[zwei A]])، و [[Düsseldorf]] فيها [[ü]] و [[ss]]. و [[Unna]] [[zwei N]]. ولو حرف فاتك: [[Noch einmal, bitte]] أحسن من إنك تخمّن.` },
            { lvl: 'تحدي', t: R`**بالتليفون:** اتهجّى اسم عيلتك بطريقة التليفون ([[M wie München]])، لكل حرف كلمة. استخدم الجدول الجديد لو الحرف فيه، وأي مدينة أو اسم ألماني تعرفه للباقي.`,
              done: R`كل حرف ليه كلمة بتبدأ بيه، والجملة مقرية بصوت عالي من غير وقفة`,
              sol: R`**نموذج لاسم [[Farouk]]:**

~~~de
F wie Frankfurt, A wie Aachen, R wie Rostock, O wie Offenbach, U wie Unna, K wie Köln.
~~~

**ليه:** دول كلهم من جدول DIN 5009 الجديد (المدن). أي كلمة بتبدأ بالحرف بتنفع في الحقيقة، بس المدن دي اللي الموظفين متعودين عليها. ولو اسمك فيه [[ou]]، ده حرفين: [[O wie …, U wie …]].` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Sprechen Teil 1 (ص ٤٤): تعرّف نفسك وتتهجّى", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Wikipedia: Buchstabiertafel (DIN 5009:2022 والقايمة القديمة و ÖNORM)", url: "https://de.wikipedia.org/wiki/Buchstabiertafel" },
            { t: "Rahmencurriculum für Integrationskurse: A 4.2 (ص ٣٦) و 1.2.2 (ص ٧٧)", url: "https://www.goethe.de/resources/files/pdf209/rahmencurriculum-integrationskurs_20171.pdf" },
            { t: "DWDS: buchstabieren", url: "https://www.dwds.de/wb/buchstabieren" },
            { t: "Easy German: German Alphabet & Pronunciation", url: "https://www.youtube.com/watch?v=hAkxKMlYUI4" },
          ],
        },
        {
          cmd: "Ich komme aus …",
          title: "منين، وساكن فين، وبتتكلم لغات إيه (والسؤال بـ W)",
          pre: ["dea1/Ich heiße …"],
          desc: R`تلات أسئلة بتيجي بعد الاسم على طول: [[Woher kommen Sie?]] (منين؟) و [[Wo wohnen Sie?]] (ساكن فين؟) و [[Welche Sprachen sprechen Sie?]] (بتتكلم لغات إيه؟). والرد: [[Ich komme aus Ägypten]] و [[Ich wohne in Berlin]] و [[Ich spreche Arabisch und Englisch]].

وهنا قاعدتين هتمشي بيهم في كل جملة: **الأفعال العادية** ليها نفس النهايات ([[komme]] و [[kommst]] و [[kommt]])، و **الفعل دايمًا في المكان التاني** في الجملة العادية وفي سؤال W.`,
          teach: R`## الموقف

في أول يوم في الكورس الكل بيعرّف نفسه أكتر: جاي منين، وساكن فين دلوقتي، وبيتكلم إيه. (A 1.1 و A 5.2 في منهج الاندماج: تتكلم ببساطة عن نفسك وبلدك، وتقول بتتكلم لغات إيه.)

~~~de Herr_Braun=m Nadia=f Ben=m
Herr_Braun: Frau Khalil, woher kommen Sie? || مدام خليل، حضرتك منين؟
Nadia: Ich komme aus Ägypten, aus Kairo. || أنا من مصر، من القاهرة.
Herr_Braun: Und wo wohnen Sie jetzt? || وساكنة فين دلوقتي؟
Nadia: Ich wohne in Hamburg. || ساكنة في هامبورج.
Herr_Braun: Welche Sprachen sprechen Sie? || بتتكلمي لغات إيه؟
Nadia: Ich spreche Arabisch, Englisch und ein bisschen Deutsch. || بتكلم عربي وإنجليزي وشوية ألماني.
Ben: Ich komme aus der Schweiz. Ich spreche Französisch und Deutsch. || أنا من سويسرا. بتكلم فرنساوي وألماني.
~~~

## الكلمات

~~~words البلد والسكن واللغة
kommen | ييجي | Ich komme aus Ägypten.
wohnen | يسكن | Ich wohne in Hamburg.
sprechen | يتكلم | Ich spreche Arabisch.
das Land, die Länder | البلد | Mein Land ist Ägypten.
die Stadt, die Städte | المدينة | Kairo ist eine Stadt.
die Sprache, die Sprachen | اللغة | Ich spreche drei Sprachen.
Ägypten | مصر | Ich komme aus Ägypten.
Arabisch | العربي (اللغة) | Ich spreche Arabisch.
Deutsch | الألماني (اللغة) | Ich lerne Deutsch.
Englisch | الإنجليزي (اللغة) | Sprechen Sie Englisch?
ein bisschen | شوية | Ich spreche ein bisschen Deutsch.
woher | منين | Woher kommen Sie?
wo | فين | Wo wohnen Sie?
jetzt | دلوقتي | Jetzt wohne ich in Hamburg.
~~~

## كلمات زيادة: ناس وبلاد

كلمات بتيجي مع «منين؟». [[fremd]] هنا معناها «مش من المكان ده»: [[Ich bin fremd hier]] = أنا مش من هنا (وبتقولها لما تسأل على طريق).

~~~words ناس وبلاد
der Mensch, die Menschen | الإنسان، الناس | Hier wohnen Menschen aus vielen Ländern.
die Welt | العالم | Ich möchte die Welt sehen.
die Heimat | البلد الأصلي | Meine Heimat ist Ägypten.
der Ausländer, die Ausländer | الأجنبي | In Berlin leben viele Ausländer.
ausländisch | أجنبي (صفة) | Die Firma ist ausländisch.
fremd | غريب، مش من هنا | Entschuldigung, ich bin fremd hier.
international | دولي | Die Schule ist international.
kulturell | ثقافي | Am Wochenende gibt es ein kulturelles Programm.
~~~

## القاعدة ١: الأفعال العادية

[[kommen]] و [[wohnen]] و [[lernen]] و [[machen]] وأغلب الأفعال: بتشيل [[-en]] وتحط النهاية:

| الفاعل | النهاية | kommen | wohnen |
|---|---|---|---|
| [[ich]] | [[-e]] | [[komme]] | [[wohne]] |
| [[du]] | [[-st]] | [[kommst]] | [[wohnst]] |
| [[er]] / [[sie]] / [[es]] | [[-t]] | [[kommt]] | [[wohnt]] |
| [[wir]] | [[-en]] | [[kommen]] | [[wohnen]] |
| [[ihr]] | [[-t]] | [[kommt]] | [[wohnt]] |
| [[sie]] / [[Sie]] | [[-en]] | [[kommen]] | [[wohnen]] |

احفظ النهايات كسطر: **e، st، t، en، t، en**. هي هي في مئات الأفعال.

## القاعدة ٢: sprechen بيغيّر حرف في du و er

[[sprechen]] عادي في كل حاجة، **إلا** [[du]] و [[er/sie/es]]: الـ [[e]] بتبقى [[i]].

~~~de sprechen
ich spreche, du sprichst, er spricht
wir sprechen, ihr sprecht, sie sprechen
~~~

أفعال تانية بتعمل كده هتقابلها ([[essen]] ← [[du isst]]، و [[geben]] ← [[du gibst]]). القاموس بيقولك: DWDS و Wiktionary بيكتبوا شكل [[er]] جنب الفعل.

## القاعدة ٣: الفعل في المكان التاني

في الجملة العادية الفعل **تاني حاجة**، مهما كان أول حاجة إيه:

| ١ | ٢ (الفعل) | الباقي |
|---|---|---|
| [[Ich]] | [[wohne]] | [[jetzt in Hamburg.]] |
| [[Jetzt]] | [[wohne]] | [[ich in Hamburg.]] |
| [[In Hamburg]] | [[wohne]] | [[ich jetzt.]] |

وفي **سؤال W** ([[Wie]] و [[Wo]] و [[Woher]] و [[Wer]] و [[Was]] و [[Welche]]) كلمة السؤال أول حاجة والفعل تاني:

| ١ (W) | ٢ (الفعل) | الباقي |
|---|---|---|
| [[Woher]] | [[kommen]] | [[Sie?]] |
| [[Wo]] | [[wohnst]] | [[du?]] |
| [[Welche Sprachen]] | [[sprichst]] | [[du?]] |

وفي **السؤال بنعم أو لأ** الفعل **أول** حاجة: [[Kommen Sie aus Ägypten?]] ← [[Ja]] أو [[Nein]].

## القاعدة ٤: aus و in

- منين: [[aus]] + البلد أو المدينة: [[aus Ägypten]]، [[aus Kairo]].
- ساكن فين: [[in]] + المدينة أو البلد: [[in Hamburg]]، [[in Deutschland]].
- شوية بلاد اسمها معاها أداة، فبتتغيّر بعد [[aus]] و [[in]]. احفظهم كده دلوقتي، والسبب (Dativ) في وحدته:

~~~de بلاد بأداة
aus der Schweiz, in der Schweiz || سويسرا
aus der Türkei, in der Türkei || تركيا
aus dem Irak, im Irak || العراق
aus dem Sudan, im Sudan || السودان
aus den USA, in den USA || أمريكا
~~~

## مقارنة بالعربي والإنجليزي

- **اللغة بحرف كبير:** [[Ich spreche Arabisch]]. في الإنجليزي كمان ([[Arabic]])، بس في الألماني السبب إنها اسم.
- **الفعل التاني** حاجة مش موجودة في العربي ولا الإنجليزي. الإنجليزي بيقول [[Now I live in Hamburg]] (الفعل تالت)، والألماني لازم [[Jetzt wohne ich in Hamburg]]. لو كتبت [[Jetzt ich wohne]] ده أشهر غلط للي جاي من الإنجليزي.
- [[Woher]] = [[wo]] (فين) + [[her]] (من ناحية)، زي «منين» = «من» + «أين».

## النطق

- [[w]] في [[wohne]] و [[wo]] = ڤ.
- [[ch]] في [[spricht]] و [[ich]] الخفيفة. وفي [[Sprache]] و [[Sprachen]] (بعد [[a]]) = خ.
- [[sp]] في أول الكلمة = «شب»: [[sprechen]] «شبريخن». ونفس الحاجة [[st]] = «شت»: [[Stadt]] «شتات».
- [[ä]] في [[Länder]] و [[Städte]] = «إيه» مفتوحة.

## قول بصوتك

~~~speak
Ich komme aus Ägypten. || أنا من مصر.
Ich wohne jetzt in Hamburg. || ساكن دلوقتي في هامبورج.
Ich spreche Arabisch und ein bisschen Deutsch. || بتكلم عربي وشوية ألماني.
Woher kommen Sie? || حضرتك منين؟
Wo wohnst du? || ساكن فين؟
Welche Sprachen sprichst du? || بتتكلم لغات إيه؟
~~~

## إملا

~~~dictate
Woher kommen Sie?
f: Ich komme aus Ägypten.
Wo wohnst du?
f: Ich wohne in Berlin.
Sprechen Sie Englisch?
~~~

## من الحياة الحقيقية: Easy German

~~~yt huwi-cjPPXU Introduce Yourself in Slow German
- **قبل ما تشغّله:** اكتب ٤ أسئلة متوقع تسمعها (اسم، منين، ساكن فين، لغات).
- **وإنت بتتفرج:** علّم على أي سؤال منهم سمعته، واكتب الإجابات اللي فهمتها.
- **بعده:** جاوب على نفس الأسئلة عن نفسك بصوت عالي وسجّل نفسك.
~~~`,
          deep: {
            why: R`[[Woher kommen Sie?]] تاني سؤال بعد الاسم في أي تعارف وفي الامتحان. وقاعدة «الفعل في المكان التاني» أهم قاعدة ترتيب في الألماني: كل جملة هتكتبها بعد كده ماشية عليها، والممتحن بيلاحظها على طول.`,
            how: R`الفعل العادي: جذر + نهاية ([[e، st، t، en، t، en]]). و [[sprechen]] بيغيّر [[e]] لـ [[i]] في [[du]] و [[er]]. والترتيب: حاجة واحدة (فاعل أو وقت أو مكان أو كلمة W) ← الفعل ← الباقي. ولو الجملة بدأت بوقت أو مكان، الفاعل بيتنقل بعد الفعل.`,
            when: R`[[aus]] للأصل (جاي منين)، و [[in]] للمكان اللي إنت فيه (ساكن فين). و [[Wo]] للمكان، و [[Woher]] للأصل. و [[Welche Sprachen]] لما الإجابة أكتر من حاجة.`,
            mistakes: R`- [[Jetzt ich wohne in Hamburg]]: الفعل لازم تاني: [[Jetzt wohne ich in Hamburg]].
- [[Ich komme von Ägypten]]: البلد بعد [[aus]].
- [[Wo kommen Sie?]]: «منين» = [[Woher]].
- [[du sprechst]] و [[er sprecht]]: الصح [[du sprichst]] و [[er spricht]].
- [[Ich spreche arabisch]] بحرف صغير: اسم اللغة هنا بحرف كبير.
- [[aus Schweiz]] أو [[aus Türkei]]: البلاد دي بأداة: [[aus der Schweiz]]، [[aus der Türkei]].`
          },
          try: R`جاوب على التلات أسئلة عن نفسك بجملة كاملة لكل واحد. بعدين اكتب كل جملة مرة تانية وابدأها بحاجة غير [[Ich]] (زي [[Jetzt]] أو [[In …]])، واتأكد إن الفعل لسه تاني.`,
          practice: [
            { lvl: 'سريع', t: R`**صرّف:** (١) [[du ___ (wohnen) in Köln.]] (٢) [[Er ___ (kommen) aus dem Irak.]] (٣) [[Wir ___ (sprechen) Arabisch.]] (٤) [[___ du (sprechen) Englisch?]] (٥) [[Sie ___ (wohnen) in Wien.]] (حضرتك) (٦) [[Sara ___ (sprechen) Französisch.]]`,
              done: R`الست أشكال صح، و (٤) و (٦) فيهم [[i]]`,
              sol: R`~~~de
Du wohnst in Köln.
Er kommt aus dem Irak.
Wir sprechen Arabisch.
Sprichst du Englisch?
Sie wohnen in Wien.
Sara spricht Französisch.
~~~

**ليه:** [[wohnen]] و [[kommen]] عاديين. [[sprechen]] بيبقى [[sprichst]] مع [[du]] و [[spricht]] مع [[er/sie]] (وسارة = [[sie]]). وفي (٤) سؤال بنعم أو لأ، فالفعل أول الجملة.` },
            { lvl: 'تطبيق', t: R`**رتّب الكلمات في جملة:** (١) [[in Berlin / ich / jetzt / wohne]] (ابدأ بـ [[Jetzt]]) (٢) [[kommen / woher / Sie]] (٣) [[spricht / Deutsch / er / ein bisschen]] (٤) [[aus Ägypten / Sie / kommen]] (سؤال نعم أو لأ) (٥) [[Sprachen / sprichst / welche / du]]`,
              done: R`في كل جملة الفعل في مكانه: تاني في (١) و (٢) و (٣) و (٥)، وأول في (٤)`,
              sol: R`~~~de
Jetzt wohne ich in Berlin.
Woher kommen Sie?
Er spricht ein bisschen Deutsch.
Kommen Sie aus Ägypten?
Welche Sprachen sprichst du?
~~~

**ليه:** في (١) [[Jetzt]] خدت المكان الأول، فالفاعل [[ich]] اتنقل بعد الفعل. وفي (٥) [[Welche Sprachen]] كلمتين بس بيحسبوا مكان واحد، والفعل بعدهم.` },
            { lvl: 'تطبيق', t: R`**صلّح الغلط:** (١) [[Jetzt ich wohne in Bonn.]] (٢) [[Wo kommst du?]] (٣) [[Ich komme von Syrien.]] (٤) [[Er sprecht Arabisch.]] (٥) [[Ich spreche englisch.]] (٦) [[Sie kommt aus Schweiz.]]`,
              done: R`الست جمل صح، وعارف سبب كل غلطة`,
              sol: R`~~~de
Jetzt wohne ich in Bonn.
Woher kommst du?
Ich komme aus Syrien.
Er spricht Arabisch.
Ich spreche Englisch.
Sie kommt aus der Schweiz.
~~~

**ليه:** (١) الفعل تاني. (٢) «منين» [[Woher]]. (٣) البلد بعد [[aus]]. (٤) [[spricht]] بـ [[i]]. (٥) اسم اللغة بحرف كبير. (٦) [[die Schweiz]] بأداة، فـ [[aus der Schweiz]]. و [[Syrien]] من غير أداة زي أغلب البلاد.` },
            { lvl: 'تطبيق', t: R`**أسئلة للإجابات:** اكتب السؤال لكل إجابة (بـ [[Sie]]): (١) [[Ich komme aus Marokko.]] (٢) [[Ich wohne in München.]] (٣) [[Ich spreche Arabisch und Französisch.]] (٤) [[Ja, ich spreche ein bisschen Deutsch.]] (٥) [[Ich heiße Ali.]]`,
              done: R`خمس أسئلة، أربعة منهم بكلمة W، والرابع بالفعل الأول`,
              sol: R`~~~de
Woher kommen Sie?
Wo wohnen Sie?
Welche Sprachen sprechen Sie?
Sprechen Sie Deutsch?
Wie heißen Sie?
~~~

**ليه:** الإجابة بـ [[Ja]] معناها إن السؤال كان بنعم أو لأ، فمفيش كلمة W والفعل أول. والباقي كلمة W مناسبة للمعلومة: بلد ← [[Woher]]، مدينة ساكن فيها ← [[Wo]]، لغات ← [[Welche Sprachen]]، اسم ← [[Wie]].` },
            { lvl: 'تحدي', t: R`**عرّف زميلك:** إنت في الكورس وبتعرّف زميلتك الجديدة للفصل. اكتب ٥ جمل عنها (اسمها، منين، ساكنة فين، بتتكلم إيه) بـ [[sie]] (هي)، وابدأ جملتين على الأقل بحاجة غير [[Sie]] أو اسمها.`,
              done: R`٥ جمل، كل الأفعال بشكل [[sie]] (هي)، وجملتين بادئين بحاجة تانية والفعل لسه تاني`,
              sol: R`**نسخة نموذجية:**

~~~de
Das ist Amina. || دي أمينة.
Sie kommt aus dem Sudan. || هي من السودان.
Jetzt wohnt sie in Leipzig. || دلوقتي ساكنة في لايبزيج.
Sie spricht Arabisch und Englisch. || بتتكلم عربي وإنجليزي.
Und Deutsch spricht sie ein bisschen. || وألماني بتتكلم شوية.
~~~

**ليه:** [[sie]] (هي) بتاخد نهاية [[-t]] زي [[er]]: [[kommt]] و [[wohnt]] و [[spricht]]. وفي الجملة ٣ و ٥ بدأنا بـ [[Jetzt]] و [[Deutsch]]، فـ [[sie]] جت بعد الفعل.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Grammatik (Präsens، Verbzweitstellung، W-Fragen، aus + Dativ، ص ١٠٠ وما بعدها)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: A 1.1 (ص ٣١) و A 5.2 (ص ٣٧)", url: "https://www.goethe.de/resources/files/pdf209/rahmencurriculum-integrationskurs_20171.pdf" },
            { t: "Wiktionary: Flexion von sprechen", url: "https://de.wiktionary.org/wiki/Flexion:sprechen" },
            { t: "Wiktionary: Flexion von wohnen", url: "https://de.wiktionary.org/wiki/Flexion:wohnen" },
            { t: "Easy German: Introduce Yourself in Slow German", url: "https://www.youtube.com/watch?v=huwi-cjPPXU" },
          ],
        },
        {
          cmd: "Die Zahlen 0–100",
          title: "الأرقام من ٠ لـ ١٠٠، ورقم التليفون، وعندك كام سنة",
          pre: ["dea1/Ich komme aus …"],
          desc: R`الأرقام من ٠ لـ ١٢ بتتحفظ، ومن ١٣ لـ ١٩ «تلاتة + عشرة» ([[dreizehn]])، والعشرات بـ [[-zig]] ([[zwanzig]] و [[dreißig]]). والأهم: من ٢١ لـ ٩٩ **الآحاد قبل العشرات** زي العربي بالظبط: [[einundzwanzig]] = «واحد وعشرين».

وبيها تقول سنك ([[Ich bin 24 Jahre alt]]) ورقم تليفونك (رقم رقم أو اتنين اتنين)، وده المطلوب في الجزء الأول من امتحان الكلام.`,
          teach: R`## الموقف

في الكورس المدرّس بيعمل قايمة: اسمك وسنك ورقم تليفونك. (CEFR A1: «يقول أرقام وكميات وأسعار بشكل محدود»، و Goethe Sprechen Teil 1: الممتحن بيطلب منك رقم.)

~~~de Herr_Braun=m Nadia=f
Herr_Braun: Wie alt sind Sie, Frau Khalil? || حضرتك عندك كام سنة؟
Nadia: Ich bin 29 Jahre alt. || عندي ٢٩ سنة.
Herr_Braun: Und wie ist Ihre Telefonnummer? || ورقم تليفونك؟
Nadia: 0157 2846 130. || ...
Herr_Braun: Noch einmal, bitte. Langsam. || مرة كمان، براحة.
Nadia: Null, eins, fünf, sieben, zwei, acht, vier, sechs, eins, drei, null. || ...
~~~

## ٠ لـ ١٢: بتتحفظ

~~~de 0–12
null, eins, zwei, drei, vier, fünf, sechs
sieben, acht, neun, zehn, elf, zwölf
~~~

## ١٣ لـ ١٩: الرقم + zehn

~~~de 13–19
dreizehn, vierzehn, fünfzehn, sechzehn
siebzehn, achtzehn, neunzehn
~~~

⚠ اتنين شاذين: [[sechzehn]] (مش [[sechszehn]]: الـ [[s]] بتقع) و [[siebzehn]] (مش [[siebenzehn]]: [[en]] بتقع).

## العشرات: -zig

~~~de العشرات
zwanzig, dreißig, vierzig, fünfzig
sechzig, siebzig, achtzig, neunzig, hundert
~~~

⚠ [[zwanzig]] (مش [[zweizig]])، و [[dreißig]] بـ [[ß]] (مش [[-zig]])، و [[sechzig]] و [[siebzig]] بيقعوا حروف زي ١٦ و ١٧.

## ٢١ لـ ٩٩: زي العربي

الآحاد + [[und]] + العشرات، في كلمة واحدة: [[einundzwanzig]] (واحد وعشرين). العربي بيقولها كده بالظبط، فمش محتاج تقلب حاجة في دماغك. الإنجليزي هو اللي بيقلب ([[twenty-one]]).

~~~de
einundzwanzig || ٢١ = واحد و عشرين
zweiunddreißig || ٣٢ = اتنين و تلاتين
siebenundvierzig || ٤٧ = سبعة و أربعين
neunundneunzig || ٩٩ = تسعة و تسعين
~~~

- [[eins]] بتبقى [[ein]] جوه الرقم: [[einundzwanzig]] (مش [[einsundzwanzig]]).
- وبتتكتب كلمة واحدة، مهما طولت.

## سنك

[[Wie alt sind Sie?]] / [[Wie alt bist du?]] ← [[Ich bin 24 Jahre alt.]] (أو [[Ich bin 24.]])

في الألماني السن بفعل [[sein]] («أنا ٢٤ سنة كبير»)، مش «عندي» زي العربي، ولا «ليّا» زي الفرنساوي. [[Ich habe 24 Jahre]] غلط.

## رقم التليفون

بيتقال رقم رقم، أو اتنين اتنين. الاتنين مفهومين، ورقم رقم أسهل ليك في الأول. وفي التليفون كتير بيقولوا [[zwo]] بدل [[zwei]] عشان متتلخبطش مع [[drei]].

~~~de
null, eins, sieben, sechs, drei, vier, acht, zwei || رقم رقم
null, eins, sieben, sechs, vierunddreißig, zweiundachtzig || اتنين اتنين
~~~

## الكلمات

~~~words الأرقام والسن
die Zahl, die Zahlen | الرقم (العدد) | Die Zahl ist zwölf.
die Nummer, die Nummern | الرقم (رقم تليفون أو بيت) | Wie ist Ihre Nummer?
die Telefonnummer, die Telefonnummern | رقم التليفون | Meine Telefonnummer ist 0176 3482 950.
das Jahr, die Jahre | السنة | Ich bin 24 Jahre alt.
alt | عنده سن، كبير في السن | Wie alt bist du?
Wie alt sind Sie? | حضرتك عندك كام سنة؟ | Wie alt sind Sie? Ich bin 31.
null | صفر | Null, eins, fünf, sieben.
und | و | einundzwanzig
hundert | مية | Ich zähle bis hundert.
~~~

## النطق

- [[zwei]] «تسڤاي» و [[zehn]] «تسين» و [[zwölf]] «تسڤولف»: [[z]] = تس دايمًا.
- [[vier]] «فير» ([[v]] = ف)، و [[sieben]] «زيبن» ([[s]] أول الكلمة = ز).
- [[acht]] «آخت» (خ)، و [[sechs]] «زِكس» ([[chs]] = كس).
- [[fünf]] و [[zwölf]]: [[ü]] و [[ö]] بالشفايف المدوّرة.

## قول بصوتك

~~~speak
eins, zwei, drei, vier, fünf || ١ لـ ٥
sechzehn, siebzehn, sechzig, siebzig || الشواذ
dreiundzwanzig || ٢٣
Ich bin 24 Jahre alt. || عندي ٢٤ سنة.
Wie alt sind Sie? || حضرتك عندك كام سنة؟
~~~

## إملا

~~~dictate اسمع واكتب الرقم بالحروف
f: siebzehn
achtundfünfzig
f: dreißig
Ich bin zweiunddreißig Jahre alt.
f: Wie alt bist du?
~~~

اكتب الأرقام بالحروف: لو كتبت [[17]] هيطلع غلط، ودي بالقصد، عشان تتعوّد على شكل الكلمة. في الامتحان نفسه الأرقام بالأرقام عادي.

## من الحياة الحقيقية: Easy German

~~~yt QCGdeH4hYdo Counting in German from 1 - 100
- **قبل ما تشغّله:** عِد من ١ لـ ٢٠ بصوت عالي وسجّل نفسك.
- **وإنت بتتفرج:** عِد مع الفيديو، ووقّف عند ١٦ و ١٧ و ٣٠ و ٦٠ و ٧٠ وقولهم ٣ مرات.
- **بعده:** قول سنك وسن ٣ حد من عيلتك بالألماني.
~~~`,
          deep: {
            why: R`الأرقام في كل حتة: السن، والتليفون، والعنوان، والسعر، والوقت، ورقم الأتوبيس. وفي الامتحان الممتحن بيطلب منك رقم في أول جزء، وفي السمع كتير من الأسئلة إجابتها رقم (سعر، ميعاد، رصيف). ولو الرقم اتسمع غلط، الإجابة كلها غلط.`,
            how: R`٠–١٢ حفظ، و ١٣–١٩ رقم + [[zehn]]، والعشرات رقم + [[zig]] (إلا [[zwanzig]] و [[dreißig]])، و ٢١–٩٩ آحاد + [[und]] + عشرات، و [[eins]] جوه الرقم [[ein]]. والسن: [[Ich bin … Jahre alt]].`,
            when: R`رقم التليفون رقم رقم لما حد بيكتب وراك (أوضح)، واتنين اتنين لما بتقوله بسرعة. و [[zwo]] في التليفون أو لما فيه دوشة. ولما متسمعش: [[Noch einmal, bitte]] أو [[Langsam, bitte]].`,
            mistakes: R`- [[sechszehn]] و [[siebenzehn]]: الصح [[sechzehn]] و [[siebzehn]].
- [[zweizig]] و [[dreizig]]: الصح [[zwanzig]] و [[dreißig]].
- [[einsundzwanzig]]: الصح [[einundzwanzig]].
- [[zwanzig eins]] (ترتيب الإنجليزي): الصح [[einundzwanzig]].
- [[Ich habe 24 Jahre]]: الصح [[Ich bin 24 Jahre alt]].
- تسمع [[siebzig]] (٧٠) وتكتب ١٧ ([[siebzehn]]): ركّز في الآخر: [[-zehn]] ولا [[-zig]].`
          },
          try: R`عِد من ٠ لـ ٣٠ بصوت عالي، وبعدين قول سنك ورقم تليفونك مرتين: مرة رقم رقم ومرة اتنين اتنين. سجّل وقارن بالأصل في «قول بصوتك».`,
          practice: [
            { lvl: 'سريع', t: R`**اكتب الأرقام بالحروف:** ١٢، ١٦، ١٧، ٢٠، ٢١، ٣٠، ٤٥، ٦٧، ٧٧، ٩٩`,
              done: R`العشرة صح، ومن غير [[sechs]] جوه ١٦ ولا [[sieben]] جوه ١٧`,
              sol: R`~~~de
zwölf, sechzehn, siebzehn, zwanzig, einundzwanzig
dreißig, fünfundvierzig, siebenundsechzig, siebenundsiebzig, neunundneunzig
~~~

**ليه:** [[sechzehn]] و [[siebzehn]] بيقعوا حروف، بس [[siebenundsechzig]] لأ: [[sieben]] هنا آحاد كاملة، والـ «سبعين» بس هي اللي بتقصر ([[siebzig]]). و [[einundzwanzig]] [[ein]] مش [[eins]].` },
            { lvl: 'تطبيق', t: R`**اقرا الأرقام دي بصوت عالي وسجّلها:** ٣٣، ٥٨، ٨١، ١٩، ٩٠، ٦٤. بعدين اسمعها في الحل وقارن.`,
              done: R`الستة اتقالوا من غير ما تقلب الآحاد والعشرات، و ١٩ و ٩٠ مختلفين في النطق`,
              sol: R`~~~de
dreiunddreißig, achtundfünfzig, einundachtzig
neunzehn, neunzig, vierundsechzig
~~~

**ليه:** [[neunzehn]] (١٩) و [[neunzig]] (٩٠) بيتلخبطوا كتير في السمع: الفرق في الآخر بس، [[-zehn]] «تسين» و [[-zig]] «تسيش». و [[dreißig]] الوحيدة بـ [[ß]].` },
            { lvl: 'تطبيق', t: R`**أرقام تليفون:** قول الأرقام دي رقم رقم واكتبها بالحروف: (١) 0176 2953 (٢) 0221 840 37`,
              done: R`كل رقم اتكتب حرف حرف من غير ما تجمع أرقام`,
              sol: R`~~~de
null, eins, sieben, sechs, zwei, neun, fünf, drei
null, zwei, zwei, eins, acht, vier, null, drei, sieben
~~~

**ليه:** رقم رقم هو الأسلم في الامتحان ولما حد بيكتب وراك. وممكن تقول [[zwo]] بدل [[zwei]] في التليفون، والاتنين صح.` },
            { lvl: 'تطبيق', t: R`**اسأل وجاوب عن السن:** اكتب السؤال والإجابة لكل شخص: (١) إنت (بـ [[du]] لصاحبك) ٢٢ سنة. (٢) الأستاذ براون (بـ [[Sie]]) ٥٤ سنة. (٣) أختك (اسمها لينا) ١٧ سنة: اكتب جملة عنها.`,
              done: R`السؤالين بـ [[Wie alt]] والفعل الصح، والإجابات بـ [[bin]] و [[ist]] و [[Jahre alt]]`,
              sol: R`~~~de
Wie alt bist du? Ich bin zweiundzwanzig Jahre alt.
Wie alt sind Sie? Ich bin vierundfünfzig Jahre alt.
Lina ist siebzehn Jahre alt.
~~~

**ليه:** السن دايمًا بـ [[sein]]: [[bin]] لـ [[ich]]، و [[bist]] لـ [[du]]، و [[sind]] لـ [[Sie]]، و [[ist]] لـ لينا (هي). و [[siebzehn]] من غير [[en]].` },
            { lvl: 'تحدي', t: R`**إملا من موديل AI أو صاحب:** اطلب من حد يقول لك ١٠ أرقام عشوائية بين ١٣ و ٩٩ بالألماني بسرعة عادية، واكتبها بالأرقام. ركّز في الأزواج اللي بتتلخبط: ١٣/٣٠، ١٤/٤٠، ١٦/٦٠، ١٧/٧٠، ١٩/٩٠.`,
              done: R`٩ من ١٠ صح على الأقل، ومفيش لخبطة بين [[-zehn]] و [[-zig]]`,
              sol: R`**طلب جاهز لموديل AI يعمل التمرين:**

~~~text
اكتبلي ١٠ أرقام عشوائية بين ١٣ و ٩٩ بالألماني بالحروف بس (من غير الأرقام)، ونصهم على الأقل من الأزواج دي: 13/30, 14/40, 16/60, 17/70, 19/90. متقوليش الإجابة لحد ما أبعتلك إجاباتي بالأرقام، وبعدين صحّحهم.
~~~

**وعشان تسمع (مش تقرا):** اطلبه في وضع الصوت في التطبيق، أو استخدم «اسمع» على السطور دي:

~~~de
dreizehn, dreißig, vierzehn, vierzig, sechzehn
sechzig, siebzehn, siebzig, neunzehn, neunzig
~~~

**ليه:** الفرق كله في آخر الكلمة. [[-zehn]] نطقها طويل «تسين»، و [[-zig]] قصيرة «تسيش». ده بالظبط اللي بيتمتحن في السمع (أسعار ومواعيد).` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Wortgruppenliste، Zahlen (ص ٧٨)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "CEFR Companion volume: Information exchange، A1 (يقول أرقام وكميات وأسعار)", url: "https://rm.coe.int/16809ea0d4" },
            { t: "DWDS: sechzehn", url: "https://www.dwds.de/wb/sechzehn" },
            { t: "DWDS: siebzehn", url: "https://www.dwds.de/wb/siebzehn" },
            { t: "Easy German: Counting in German from 1 - 100", url: "https://www.youtube.com/watch?v=QCGdeH4hYdo" },
          ],
        },
        {
          cmd: "Prüfung: Sprechen Teil 1",
          title: "تدريب الامتحان: تعرّف نفسك وتتهجّى وتقول رقم، وتملا استمارة",
          pre: ["dea1/Hallo! Guten Tag!", "dea1/Ich heiße …", "dea1/Das Alphabet", "dea1/Ich komme aus …", "dea1/Die Zahlen 0–100"],
          desc: R`كل اللي في الوحدة دي بيتمتحن في **أول جزء من امتحان الكلام**: في Goethe و telc الممتحن بيديك كلمات مفتاحية ([[Name?]] و [[Alter?]] و [[Land?]] و [[Wohnort?]] و [[Sprachen?]] و [[Beruf?]] و [[Hobby?]])، وتعرّف نفسك بيها، وبعدين يطلب منك تتهجّى كلمة وتقول رقم. وفي ÖSD بتختار ٤ مواضيع من ٦.

ونفس المعلومات بتتكتب في **أول جزء من امتحان الكتابة**: استمارة فيها ٥ خانات بتملاها من نص.`,
          teach: R`## شكل الجزء ده في التلات امتحانات

| الامتحان | المطلوب | النقط |
|---|---|---|
| Goethe A1، Sprechen Teil 1 | تعرّف نفسك بالكلمات المفتاحية، وتتهجّى، وتقول رقم | ٣ |
| telc A1 für Zuwanderer، Sprechen Teil A | نفس الفكرة من ورقة كلمات (حوالي ٣ دقايق) | ٦ |
| ÖSD Zertifikat A1، Sprechen Aufgabe 1 | تختار ٤ مواضيع من ٦ وتتكلم عنهم، وقبلها ١٠ دقايق تحضير | من ٢٥ للكلام كله |

## الكلمات المفتاحية وجملة لكل واحدة

~~~de Karte
Name: Ich heiße … / Mein Name ist … || الاسم
Alter: Ich bin … Jahre alt. || السن
Land: Ich komme aus … || البلد
Wohnort: Ich wohne in … || ساكن فين
Sprachen: Ich spreche … || اللغات
Beruf: Ich bin … von Beruf. || الشغلانة
Hobby: Mein Hobby ist … || الهواية
~~~

[[Beruf]] و [[Hobby]] قوالب جاهزة دلوقتي. الشغلانات بتيجي في وحدة الشغل، والهوايات في وحدة الوقت الفاضي. لو لسه مش عارف شغلانتك بالألماني: [[Ich bin Student]] (طالب) أو [[Ich bin Studentin]] (طالبة) أو [[Ich arbeite]] (بشتغل) كفاية في الأول.

## نموذج كامل بالصوت

~~~de Prüferin=f Yusuf=m
Prüferin: Guten Tag! Bitte stellen Sie sich vor. || نهارك سعيد! عرّف نفسك من فضلك.
Yusuf: Guten Tag! Mein Name ist Yusuf Adel. || نهارك سعيد! اسمي يوسف عادل.
Yusuf: Ich bin 27 Jahre alt. || عندي ٢٧ سنة.
Yusuf: Ich komme aus Ägypten, aus Assiut. || أنا من مصر، من أسيوط.
Yusuf: Jetzt wohne ich in Dresden. || دلوقتي ساكن في درسدن.
Yusuf: Ich spreche Arabisch, Englisch und ein bisschen Deutsch. || بتكلم عربي وإنجليزي وشوية ألماني.
Yusuf: Ich bin Koch von Beruf. || شغلتي طباخ.
Yusuf: Mein Hobby ist Fußball. || هوايتي الكورة.
Prüferin: Danke. Buchstabieren Sie bitte Ihren Vornamen. || شكرًا. اتهجّى اسمك الأول.
Yusuf: Y, U, S, U, F. || ...
Prüferin: Und wie ist Ihre Telefonnummer? || ورقم تليفونك؟
Yusuf: Null, eins, sechs, null, vier, sieben, zwei, acht, eins, fünf. || ...
Prüferin: Danke schön. || شكرًا جزيلًا.
~~~

## المعايير: إزاي بيتحسب

الجزء ده في Goethe عليه ٣ نقط: إنك تقدّم المعلومات المطلوبة (بالكلمات المفتاحية) بشكل مفهوم، وإنك تتهجّى صح، وإنك تقول الرقم صح. الأخطاء الصغيرة اللي مبتبوّظش الفهم مش هي المهمة في A1. اللي بيضيّع النقطة: إنك تسكت، أو تقول كلمة من غير جملة ([[Ägypten.]] بس)، أو التهجّي يطلع بأسامي الحروف الإنجليزي فالممتحن يكتب كلمة تانية.

**اختبر نفسك على تسجيلك:**

| السؤال | نعم / لأ |
|---|---|
| كل كلمة مفتاحية ليها جملة كاملة بفعل؟ | |
| الفعل في المكان التاني في كل جملة؟ | |
| التهجّي بأسامي الحروف الألماني (A «آ»، E «إيه»، I «إي»، U «أو»)؟ | |
| الرقم اتقال رقم رقم من غير وقفة طويلة؟ | |
| رديت على الممتحن بـ [[Sie]]؟ | |

## قول بصوتك: إنت في الامتحان

اسمع كل سؤال من الممتحنة، وسجّل إجابتك عن نفسك (مش النموذج):

~~~speak
Bitte stellen Sie sich vor. || عرّف نفسك.
Buchstabieren Sie bitte Ihren Familiennamen. || اتهجّى اسم عيلتك.
Wie ist Ihre Telefonnummer? || رقم تليفونك؟
Wie ist Ihre Hausnummer? || رقم بيتك؟
~~~

## صحّح كلامك بموديل AI

اكتب إجابتك (النص اللي قلته)، وانسخ الطلب ده ومعاه إجابتك، والصقه في Claude أو ChatGPT:

~~~prompt طلب تصحيح: Goethe A1، Sprechen Teil 1
Du bist Prüfer für das Goethe-Zertifikat A1 (Start Deutsch 1). Bewerte meine Antwort für Sprechen Teil 1 (sich vorstellen mit den Stichwörtern Name, Alter, Land, Wohnort, Sprachen, Beruf, Hobby).
Antworte auf Ägyptisch-Arabisch, deutsche Wörter auf Deutsch.
1. Welche Stichwörter fehlen?
2. Liste jeden Fehler: der falsche Satz, der richtige Satz, und warum (ein Satz).
3. Ist alles auf A1-Niveau? Markiere Wörter über A1.
4. Gib mir eine verbesserte Version meiner Antwort, nur mit A1-Wörtern.
5. Punkte: maximal 3. Sag mir, wie viele Punkte ich wahrscheinlich bekomme und warum.
~~~

## الكتابة: Schreiben Teil 1 (الاستمارة)

في امتحان Goethe (و telc Schreiben A) بتقرا نص قصير عن شخص، وتملا ٥ خانات في استمارة من المعلومات اللي في النص. مثال من عندنا:

> صاحبتك **Mona Fathy** عايزة تسجّل في كورس ألماني في مدرسة لغات في Bremen. هي من مصر، ساكنة في **Bremen** في شارع **Lindenstraße 12**. بتتكلم عربي وإنجليزي. عندها ولد عنده ٤ سنين، ومحتاجة حضانة وقت الكورس. هتدفع كاش. رقمها **0151 2236 874**.

| الخانة | الإجابة |
|---|---|
| [[Familienname]] | (١) ___ |
| [[Vorname]] | Mona |
| [[Herkunftsland]] | (٢) ___ |
| [[Wohnort]] | (٣) ___ |
| [[Sprachen]] | (٤) ___ |
| [[Kinderbetreuung]] | (٥) [[ja]] ☐ [[nein]] ☐ |
| [[Zahlung]] | [[bar]] |

(الإجابات تحت في التمرين الأول.) لاحظ إن خانة [[Vorname]] و [[Zahlung]] متمليين كمثال، زي الامتحان الحقيقي.`,
          deep: {
            why: R`الجزء ده أسهل نقط في الامتحان كله: الأسئلة معروفة من قبلها، وإجابتها عن نفسك، فتقدر تحضّرها ١٠٠٪. وكمان هو أول انطباع عند الممتحن، فلو بدأت بثقة، باقي الامتحان بيبقى أسهل عليك.`,
            how: R`حضّر جملة جاهزة لكل كلمة مفتاحية، واحفظ تهجّي اسمك واسم عيلتك ومدينتك. قول رقم تليفونك ورقم بيتك رقم رقم. وفي الاستمارة: اقرا أسامي الخانات الأول، وبعدين دوّر على كل معلومة في النص، واكتب كلمة أو اتنين بس (مش جملة).`,
            when: R`نفس المهارة بتستخدمها في: مكتب تسجيل السكن، والبنك، والدكتور، وأول يوم في الكورس، ومقابلة مع جار. والاستمارة نفس شكل استمارات المصالح الحكومية والفندق والجيم.`,
            mistakes: R`- تحفظ فقرة طويلة وتقولها بسرعة من غير ما تفكر: الممتحن ممكن يسألك سؤال زيادة عن حاجة قلتها، فلازم تكون فاهم كل جملة.
- تقول كلمة بس بدل جملة ([[Ägypten.]]): قول [[Ich komme aus Ägypten.]]
- تنسى [[Sie]] مع الممتحن.
- في الاستمارة: تكتب الجنسية ([[ägyptisch]]) في خانة البلد، أو تكتب جملة كاملة في الخانة، أو تنقل معلومة من النص للخانة الغلط (العنوان في خانة المدينة).
- في الاستمارة: تنسى إن [[ja]]/[[nein]] بيتعلّم عليهم بعلامة، مش بيتكتب جنبهم كلام.`
          },
          try: R`حضّر كارت الكلمات المفتاحية لنفسك (جملة لكل واحدة)، وسجّل الامتحان كله: تعريف + تهجّي اسم عيلتك + رقم تليفونك. وابعت النص للطلب الجاهز فوق.`,
          practice: [
            { lvl: 'سريع', t: R`**املا الاستمارة** اللي في الشرح (الخانات ١ لـ ٥) من النص بتاع منى.`,
              done: R`الخمس خانات فيهم كلمة أو اتنين، ومفيش جملة كاملة`,
              sol: R`| الخانة | الإجابة |
|---|---|
| [[Familienname]] | (١) [[Fathy]] |
| [[Herkunftsland]] | (٢) [[Ägypten]] |
| [[Wohnort]] | (٣) [[Bremen]] |
| [[Sprachen]] | (٤) [[Arabisch, Englisch]] |
| [[Kinderbetreuung]] | (٥) [[ja]] ☒ |

**ليه:** [[Herkunftsland]] = البلد اللي جاية منه ([[Herkunft]] = الأصل)، فـ [[Ägypten]] مش [[ägyptisch]]. و [[Wohnort]] المدينة بس، مش الشارع. و [[Kinderbetreuung]] (رعاية الأطفال): عندها ولد ومحتاجة حضانة، فـ [[ja]]. والرقم مش مطلوب في الاستمارة دي، فمتحطوش في أي خانة.` },
            { lvl: 'تطبيق', t: R`**جملة لكل كلمة مفتاحية:** اكتب جملتك الحقيقية لكل واحدة من السبعة: [[Name]]، [[Alter]]، [[Land]]، [[Wohnort]]، [[Sprachen]]، [[Beruf]]، [[Hobby]]. لـ [[Beruf]] استخدم [[Ich bin Student/Studentin]] أو [[Ich arbeite]] أو اكتب شغلتك بالألماني من قاموس.`,
              done: R`سبع جمل كاملة، كل واحدة بفعل في المكان التاني`,
              sol: R`**نموذج** (طالبة متخيّلة اسمها رنا):

~~~de Rana=f
Rana: Ich heiße Rana Ibrahim.
Rana: Ich bin 20 Jahre alt.
Rana: Ich komme aus Ägypten.
Rana: Ich wohne in Mansoura.
Rana: Ich spreche Arabisch und Englisch.
Rana: Ich bin Studentin.
Rana: Mein Hobby ist Lesen.
~~~

**ليه:** [[Studentin]] لأنها بنت ([[-in]] للمؤنث). و [[Lesen]] (القراية) هنا اسم من الفعل [[lesen]]، فبحرف كبير. ولو شغلتك مش عارفها: DWDS أو Wiktionary، واكتب الكلمة مع [[-in]] لو إنتي ست ([[Lehrerin]]، [[Ärztin]]).` },
            { lvl: 'تطبيق', t: R`**صلّح الإجابة دي** (من طالب في امتحان تجريبي): [[Hallo! Name Ahmed. I am 25 years. Ich komme von Ägypten. Ich wohne Berlin. Ich sprechen Arabisch und english.]]`,
              done: R`صلّحت ٦ أغلاط على الأقل، والإجابة بقت ألماني كلها`,
              sol: R`~~~de Ahmed=m
Ahmed: Guten Tag! Mein Name ist Ahmed.
Ahmed: Ich bin 25 Jahre alt.
Ahmed: Ich komme aus Ägypten.
Ahmed: Ich wohne in Berlin.
Ahmed: Ich spreche Arabisch und Englisch.
~~~

**الأغلاط:** (١) [[Hallo]] للممتحن مش غلط بس [[Guten Tag]] أنسب. (٢) [[Name Ahmed]] من غير فعل. (٣) جملة إنجليزي كاملة: ممنوع تهرب للإنجليزي في الامتحان. (٤) [[von]] بدل [[aus]]. (٥) [[wohne Berlin]] من غير [[in]]. (٦) [[ich sprechen]]: [[ich spreche]]. (٧) [[english]]: [[Englisch]] بحرف كبير وبالكتابة الألماني.` },
            { lvl: 'تحدي', t: R`**امتحان ÖSD:** في ÖSD بتختار ٤ مواضيع من ٦ وتتكلم عن كل واحد جملتين على الأقل. المواضيع: [[Name]]، [[Wohnort]]، [[Sprachen]]، [[Familie]]، [[Beruf]]، [[Freizeit]]. اختار ٤، وقول ٨ جمل، وسجّل نفسك في دقيقة ونص.`,
              done: R`٤ مواضيع، جملتين على الأقل لكل واحد، والتسجيل ما بين دقيقة ودقيقة ونص`,
              sol: R`**نموذج** (٤ مواضيع: Name و Wohnort و Sprachen و Beruf):

~~~de Hana=f
Hana: Ich heiße Hana. Mein Familienname ist Mostafa.
Hana: Ich wohne in Wien. Wien ist schön.
Hana: Ich spreche Arabisch und Englisch. Ich lerne Deutsch.
Hana: Ich bin Krankenschwester von Beruf. Ich arbeite in Wien.
~~~

**ليه:** الجملة التانية في كل موضوع بتزوّد معلومة صغيرة بكلمات A1 ([[schön]] و [[lerne]] و [[arbeite]]) بدل ما تعيد نفس الجملة. و [[Familie]] و [[Freizeit]] اتسابوا لأنهم في وحدات جاية، والامتحان بيسمحلك تختار.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Sprechen Teil 1 (ص ٤٤) والتقييم (ص ٤٥)، Schreiben Teil 1 (ص ٣٧)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Goethe-Zertifikat A1: Übungssatz 01 (امتحان تجريبي رسمي ببلاش)", url: "https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_uebungssatz01.pdf" },
            { t: "ÖSD Zertifikat A1: Modellsatzbroschüre (Sprechen Aufgabe 1، ص ٢٤)", url: "https://www.osd.at/wp-content/uploads/2024/09/ZA1-Modellsatzbroschure_WEB.pdf" },
            { t: "telc Deutsch A1 für Zuwanderer: Übungstest 1 (Mündliche Prüfung Teil A، ص ٢٥)", url: "https://shop.telc.net/media/catalog/product/file//2/0/20201225_5069-b00-010104_web.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: 11.3.1 (ص ١٥١): تسلّم على الممتحن وتعرّف نفسك", url: "https://www.goethe.de/resources/files/pdf209/rahmencurriculum-integrationskurs_20171.pdf" },
          ],
        },
      ],
    },
  ],
});

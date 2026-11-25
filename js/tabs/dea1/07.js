MORE("dea1", [
    {
      t: "الصحة (Gesundheit)",
      l: 2,
      pre: ["dea1/Rufen Sie bitte an!", "dea1/Können Sie mir helfen?"],
      n: R`تقول إيه اللي بيوجعك وإنت حاسس بإيه، وتاخد ميعاد عند الدكتور وتملا بياناتك، وتفهم كلام الدكتور وتعليماته، وتشتري الدوا من الصيدلية وتفهم إمتى تاخده، وتعيش صحي، وتطلب الإسعاف لو حصل حاجة. والقواعد هنا: [[mir]] و [[dir]] مع [[wehtun]] و [[es geht]]، و [[seit]] ([[seit drei Tagen]])، و [[sollen]] ([[Sie sollen viel trinken]])، وحروف الوقت [[nach]] و [[vor]] و [[für]] ([[nach dem Essen]]، [[für eine Woche]])، و [[gut]]/[[besser]]/[[am besten]]. والوحدة بتنتهي بتدريب Hören Teil 1 و Lesen Teil 3 و Sprechen Teil 3 على موضوع الصحة.`,
      goal: [R`تقول حاسس بإيه وإيه اللي بيوجعك ([[Mir geht es nicht gut]]، [[Mein Kopf tut weh]]، [[Ich habe Fieber]])، وتسمّي أجزاء الجسم`, R`تاخد ميعاد عند الدكتور في التليفون، وتدّي بياناتك في الاستقبال وتملا الاستمارة`, R`تفهم أسئلة الدكتور وتجاوبها ([[Seit wann?]] ← [[Seit drei Tagen]])، وتفهم المطلوب منك بـ [[sollen]]`, R`تشتري دوا وتفهم إمتى وإزاي تاخده ([[dreimal am Tag nach dem Essen]]، [[für eine Woche]])، وتقرا أهم حاجة في نشرة الدوا`, R`تتكلم عن عاداتك الصحية ([[oft]]، [[manchmal]]، [[nie]]، [[besser]])، وتطلب الإسعاف وتقول فين وإيه اللي حصل`, R`تحل Hören Teil 1 و Lesen Teil 3 و Sprechen Teil 3 على موضوع الصحة`],
      time: "حوالي ١٠ ساعات",
      projects: [
        { lvl: 'صغير', t: R`خريطة الجسم`, what: R`ارسم شكل إنسان بسيط واكتب عليه ١٢ جزء من الجسم بأداتهم وجمعهم. وبعدين اكتب ٤ جمل بـ [[tut weh]] و [[tun weh]] عن حاجات بتوجع الناس كتير.`,
          done: R`١٢ جزء بالأداة والجمع، وجملتين بـ [[tut weh]] (مفرد) وجملتين بـ [[tun weh]] (جمع)`,
          sol: R`**نسخة نموذجية:**

~~~text Körper
der Kopf, die Köpfe       das Auge, die Augen
das Ohr, die Ohren        die Nase, die Nasen
der Mund, die Münder      der Zahn, die Zähne
der Hals, die Hälse       der Rücken, die Rücken
der Bauch, die Bäuche     der Arm, die Arme
die Hand, die Hände       das Bein, die Beine
der Fuß, die Füße
~~~

~~~de
Mein Kopf tut weh.
Der Rücken tut mir weh.
Meine Füße tun weh.
Die Augen tun mir weh.
~~~

**ليه كده:** [[tut weh]] لما اللي بيوجع حاجة واحدة ([[der Kopf]]، [[der Rücken]])، و [[tun weh]] لما جمع ([[die Füße]]، [[die Augen]]). وفيه شكلين: [[Mein Kopf tut weh]] (دماغي بتوجعني) أو [[Der Kopf tut mir weh]] (الدماغ بتوجعني). و [[mir]] هنا Dativ زي [[es geht mir gut]].` },
        { lvl: 'صغير', t: R`استمارة عند الدكتور`, what: R`اكتب استمارة مريض بسيطة بالألماني (٨ خانات) واملاها ببياناتك أو بيانات شخص متخيّل: الاسم، وتاريخ الميلاد، والعنوان، والتليفون، والتأمين الصحي، والحساسية، والأدوية اللي بياخدها، وبيشتكي من إيه.`,
          done: R`٨ خانات بأساميهم الألماني، وكل خانة متملية صح (التاريخ بالشكل الألماني، والتليفون أرقام)`,
          sol: R`**نسخة نموذجية:**

~~~text Patientenbogen
Name, Vorname:        Hassan, Karim
Geburtsdatum:         14.03.1996
Adresse:              Lindenstraße 12, 50667 Köln
Telefon:              0176 1234567
Krankenkasse:         AOK
Allergien:            keine
Medikamente:          keine
Beschwerden:          Kopfschmerzen, Fieber seit 2 Tagen
~~~

**ليه كده:** في ألمانيا التاريخ يوم.شهر.سنة بنقط ([[14.03.1996]]). و [[Krankenkasse]] = شركة التأمين الصحي (كل اللي ساكن في ألمانيا لازم يبقى عنده تأمين). و [[Allergien]] = حساسية، و [[keine]] = مفيش. و [[Beschwerden]] = بتشتكي من إيه. والاستمارة دي هدف بالاسم في منهج الاندماج، وشبه Schreiben Teil 1.` },
        { lvl: 'متوسط', t: R`مكالمة لعيادة`, what: R`اكتب مكالمة (١٠ سطور) مع ممرضة الاستقبال في عيادة: إنت عيان من يومين، وعايز ميعاد النهارده. هي تقولك مفيش النهارده وتقترح بكرة، وإنت تقول إن الموضوع مستعجل، فتقولك تيجي وتستنى. وسجّل الدورين.`,
          done: R`المكالمة فيها اسمك، والشكوى بـ [[seit]]، و [[Ich brauche einen Termin]]، واقتراح ورد، وكلمة [[dringend]] أو [[sehr schlimm]]، والممرضة بتقول تجيب إيه معاك`,
          sol: R`~~~de Praxis=f Omar=m
Praxis: Praxis Doktor Weber, guten Morgen! || عيادة دكتور فيبر، صباح الخير!
Omar: Guten Morgen, mein Name ist Omar Said. Ich brauche bitte einen Termin. || صباح الخير، اسمي عمر سعيد. محتاج ميعاد لو سمحتي.
Praxis: Was haben Sie denn? || عندك إيه؟
Omar: Ich habe seit zwei Tagen hohes Fieber und Halsschmerzen. || عندي سخونية عالية من يومين ووجع في الزور.
Praxis: Heute ist leider alles voll. Geht es morgen um neun? || النهارده للأسف مليان. ينفع بكرة الساعة ٩؟
Omar: Es ist leider dringend. Es geht mir sehr schlecht. || للأسف مستعجل. أنا تعبان أوي.
Praxis: Gut, dann kommen Sie heute um elf Uhr. Sie müssen aber ein bisschen warten. || ماشي، يبقى تعالى النهارده الساعة ١١. بس هتستنى شوية.
Omar: Kein Problem. Vielen Dank! || مفيش مشكلة. شكرًا جدًا!
Praxis: Bringen Sie bitte Ihre Versichertenkarte mit. || هات كارت التأمين بتاعك معاك لو سمحت.
Omar: Ja, mache ich. Bis später! || حاضر. أشوفك كمان شوية!
~~~

**ليه كده:** [[seit zwei Tagen]]: بعد [[seit]] Dativ، والجمع بياخد [[-n]] ([[Tagen]]). و [[hohes Fieber]] صفة قبل الاسم (A2، خدها كده). و [[Es ist dringend]] = مستعجل، وده بيخلّي العيادة تدخّلك نفس اليوم. و [[die Versichertenkarte]] = كارت التأمين، لازم تجيبه في كل زيارة.` },
        { lvl: 'متوسط', t: R`فهم روشتة ونشرة دوا`, what: R`اكتب ورقة تعليمات زي اللي الصيدلي بيكتبها على علبة الدوا لـ ٣ أدوية (أقراص، ونقط، ومرهم): كام مرة في اليوم، وقبل ولا بعد الأكل، ولمدة قد إيه. وبعدين اكتب ٣ جمل تشرح فيهم لحد من عيلتك ياخد الدوا إزاي.`,
          done: R`٣ أدوية، وكل واحد فيه عدد مرات و [[vor]]/[[nach]] أو وقت و [[für]] + مدة، و ٣ جمل بالأمر لـ [[du]]`,
          sol: R`~~~text Einnahme
Tabletten:  3 x täglich 1 Tablette, nach dem Essen, für 7 Tage
Tropfen:    2 x täglich 10 Tropfen, vor dem Frühstück und vor dem Schlafen
Salbe:      morgens und abends auf den Rücken
~~~

~~~de
Nimm dreimal am Tag eine Tablette nach dem Essen, eine Woche lang.
Nimm die Tropfen vor dem Frühstück und vor dem Schlafen.
Mach morgens und abends die Salbe auf den Rücken.
~~~

**ليه كده:** [[3 x täglich]] بيتقري [[dreimal täglich]] = ٣ مرات في اليوم. و [[nach dem Essen]] و [[vor dem Schlafen]]: بعد [[nach]] و [[vor]] Dativ ([[das Essen]] ← [[dem Essen]]). و [[für 7 Tage]] و [[eine Woche lang]] الاتنين معناهم «لمدة». والأمر لـ [[du]]: [[Nimm]]، [[Mach]]، زي ما اتعلمت في وحدة الشغل.` },
        { lvl: 'كبير', t: R`امتحان Sprechen Teil 3 بموضوع الصحة`, what: R`اعمل ٨ كروت صور لحاجات في العيادة والصيدلية (دوا، كوباية مية، استمارة، قلم، كارت التأمين، كرسي، مناديل، ميزان حرارة)، واقلبهم. لكل كارت: اطلب الحاجة بطريقة مختلفة، ورد على الطلب. وسجّل وصحّح بالمعايير.`,
          done: R`٨ طلبات، كلهم طلبات مش أسئلة معلومة، و ٤ أشكال مختلفة على الأقل (الحاجة + [[bitte]]، [[Geben Sie mir …]]، [[Können Sie …?]]، [[Ich hätte gern …]])، و ٨ ردود`,
          sol: R`~~~de
Die Tabletten, bitte! Ja, hier, bitte. || كارت دوا
Kann ich bitte ein Glas Wasser haben? Natürlich. || كارت مية
Geben Sie mir bitte das Formular. Bitte schön. || كارت استمارة
Haben Sie einen Kuli für mich? Ja, hier. || كارت قلم
Hier ist meine Versichertenkarte. Danke schön. || كارت التأمين
Kann ich mich bitte setzen? Ja, natürlich. || كارت كرسي
Ein Taschentuch, bitte! Gern. || كارت مناديل
Ich hätte gern ein Fieberthermometer. Gern, das kostet acht Euro. || كارت ميزان حرارة
~~~

**ليه كده:** [[Haben Sie einen Kuli für mich?]] شكلها سؤال بس معناها «اديني قلم»، ومع [[für mich]] بقت طلب واضح. و [[Hier ist meine Versichertenkarte]] مش طلب، دي إنك **بتدّي** حاجة، والممتحن بيقبلها كرد فعل على الصورة بس الأحسن تطلب: [[Brauchen Sie meine Versichertenkarte?]]. و [[Kann ich mich bitte setzen?]] = ممكن أقعد؟ ([[sich setzen]] جاي في A2، خدها كده).` },
        { lvl: 'فكرة', t: R`اعرف نظام الدكاترة في ألمانيا`, what: R`دوّر (بالعربي أو الإنجليزي أو الألماني) واكتب صفحة صغيرة لنفسك تجاوب على: يعني إيه [[Hausarzt]]؟ وإمتى تروح [[Facharzt]]؟ و [[Notaufnahme]] بتاعة المستشفى لإيه؟ وأرقام الطوارئ إيه؟ و [[116 117]] بيعمل إيه؟ وفين بتلاقي صيدلية فاتحة بالليل ([[Notdienst]])؟`,
          done: R`إجابة على الست أسئلة، وكل كلمة ألماني بمعناها، ورقمين الطوارئ صح`,
          sol: R`**الإجابات (من مصادر رسمية، اتأكد منها وإنت بتدوّر):**

| السؤال | الإجابة |
|---|---|
| [[der Hausarzt]] | دكتور العيلة: أول حد تروحله في أي حاجة، وهو اللي بيحوّلك |
| [[der Facharzt]] | الدكتور المتخصص (عيون، أسنان، جلدية…)، وغالبًا محتاج ميعاد بدري جدًا |
| [[die Notaufnahme]] | الطوارئ في المستشفى: للحاجات الخطيرة بس |
| [[112]] | الإسعاف والمطافي |
| [[110]] | البوليس |
| [[116 117]] | دكتور الطوارئ بالليل وفي الأجازات لما الحاجة مش خطيرة لدرجة الإسعاف |
| [[Notdienst-Apotheke]] | صيدلية النبطشية بالليل والأجازات، مكتوب اسمها على باب أي صيدلية |

**ليه المشروع ده:** منهج الاندماج بيطلب بالاسم إنك تفهم نظام العلاج (دكتور العيلة والتأمين) وتلاقي معلومات العلاج. والأرقام دي ممكن تفرق في موقف حقيقي. والكلمات دي أغلبها مش في قايمة A1، بس هتشوفها في أي حتة في ألمانيا.` },
      ],
      items: [
        {
          cmd: "Mir geht es nicht gut",
          title: "مش كويس: أجزاء الجسم، و tut weh، والعيا",
          pre: ["dea1/Können Sie mir helfen?", "dea1/Hallo! Guten Tag!"],
          desc: R`[[Wie geht es dir?]] — [[Nicht so gut. Mein Kopf tut weh, und ich habe Fieber.]]

هنا هتتعلم أجزاء الجسم، وإزاي تقول إيه اللي بيوجعك ([[Der Rücken tut mir weh]])، وإيه اللي عندك ([[Ich habe Husten]]، [[Ich habe Kopfschmerzen]]). و [[mir]] اللي في [[Mir geht es gut]] هي هي اللي في [[tut mir weh]]: Dativ.`,
          teach: R`## الموقف

ليا بتشوف زميلها في الكورس شكله تعبان. (Rahmencurriculum: يسأل حد عامل إيه ويرد، ويقول حاسس بإيه وفين بيوجعه.)

~~~de Lea=f Sami=m
Lea: Hallo Sami! Wie geht es dir? Du siehst müde aus. || أهلًا سامي! عامل إيه؟ شكلك تعبان.
Sami: Mir geht es nicht gut. Ich habe Kopfschmerzen. || أنا مش كويس. عندي صداع.
Lea: Oh nein! Hast du auch Fieber? || لأ! وعندك سخونية كمان؟
Sami: Ja, ein bisschen. Und mein Hals tut weh. || آه، شوية. وزوري بيوجعني.
Lea: Du bist krank! Geh nach Hause und trink viel Tee. || إنت عيان! روّح واشرب شاي كتير.
Sami: Ja, das mache ich. Danke! || آه، هعمل كده. شكرًا!
Lea: Gute Besserung! || ألف سلامة!
~~~

## Wie geht es …? و mir/dir/Ihnen

| السؤال | الإجابة |
|---|---|
| [[Wie geht es dir?]] | [[Mir geht es gut / nicht so gut / schlecht.]] |
| [[Wie geht es Ihnen?]] | [[Danke, gut. Und Ihnen?]] |
| [[Wie geht es deiner Mutter?]] | [[Es geht ihr besser.]] |

- [[es geht]] بعده Dativ: [[mir]] (ليّا)، [[dir]] (ليك)، [[ihm]] (ليه)، [[ihr]] (ليها)، [[Ihnen]] (لحضرتك).
- [[besser]] = أحسن: [[Mir geht es schon besser]] (بقيت أحسن).
- **مقارنة بالعربي:** «عامل إيه؟» بتتقال من غير ما تستنى إجابة بجد. في ألمانيا [[Wie geht es dir?]] لصاحب أو زميل بتستنى إجابة حقيقية، فقول بجد لو تعبان.

## Was tut weh? الجسم

| | |
|---|---|
| [[der Kopf]] الدماغ | [[der Hals]] الزور، الرقبة |
| [[das Auge]] العين | [[das Ohr]] الودن |
| [[die Nase]] المناخير | [[der Mund]] البُق |
| [[der Zahn]] السنة | [[der Rücken]] الضهر |
| [[der Bauch]] البطن | [[der Arm]] الدراع |
| [[die Hand]] الإيد | [[das Bein]] الرجل |
| [[der Fuß]] القدم | |

## tut weh و tun weh

[[wehtun]] (يوجع) بيتقسم، وبيتصرّف حسب **الحاجة اللي بتوجع**:

~~~de
Mein Kopf tut weh. || دماغي بتوجعني.
Meine Füße tun weh. || رجليا بتوجعني.
Der Rücken tut mir weh. || ضهري بيوجعني.
Tut dir der Bauch weh? || بطنك بتوجعك؟
Wo tut es weh? || بيوجعك فين؟
~~~

- مفرد ← [[tut weh]]، جمع ← [[tun weh]].
- فيه شكلين: [[Mein Kopf tut weh]] أو [[Der Kopf tut mir weh]] (والتاني فيه [[mir]] Dativ). الاتنين صح.
- الدكتور هيسأل: [[Wo tut es weh?]] وتقدر تشاور وتقول [[Hier!]].

## Ich habe … : Schmerzen و Fieber و Husten

~~~de
Ich habe Kopfschmerzen. || عندي صداع.
Ich habe Bauchschmerzen. || عندي وجع في بطني.
Ich habe Fieber. || عندي سخونية.
Ich habe Husten und Schnupfen. || عندي كحة وزكام.
Ich bin erkältet. || أنا متبرّد.
~~~

- [[die Schmerzen]] (الوجع) غالبًا جمع، وبتتركّب مع الجزء: [[Kopf]] + [[Schmerzen]] = [[Kopfschmerzen]]، و [[Rückenschmerzen]]، و [[Zahnschmerzen]]، و [[Halsschmerzen]].
- [[Ich habe Fieber]] (مش «Ich bin Fieber»). و [[Ich bin krank]] و [[Ich bin müde]] و [[Ich bin erkältet]] بـ [[sein]] لأنها حالة.
- **Gute Besserung!** = ألف سلامة، وده اللي بيتقال لأي حد عيان.

## الكلمات: الجسم

~~~words الجسم
der Kopf, die Köpfe | الدماغ | Mein Kopf tut weh.
der Hals, die Hälse | الزور، الرقبة | m: Mein Hals tut weh.
das Ohr, die Ohren | الودن | m: Das Ohr tut mir weh.
die Nase, die Nasen | المناخير | Meine Nase ist zu.
der Mund, die Münder | البُق | Machen Sie bitte den Mund auf.
der Zahn, die Zähne | السنة | Ich habe Zahnschmerzen.
der Rücken, die Rücken | الضهر | Der Rücken tut mir weh.
der Bauch, die Bäuche | البطن | Ich habe Bauchschmerzen.
der Arm, die Arme | الدراع | Der Arm tut mir weh.
die Hand, die Hände | الإيد | Waschen Sie oft die Hände!
das Bein, die Beine | الرجل (من فوق) | Das Bein tut mir weh.
der Fuß, die Füße | القدم | Meine Füße tun weh.
~~~

**[[das Bein]] و [[der Fuß]]:** في العربي «رجلي» للاتنين. في الألماني [[das Bein]] من الوِرك للكعب، و [[der Fuß]] القدم بس. و [[Meine Nase ist zu]] = مناخيري مسدودة.

## الكلمات: العيا

~~~words العيا
krank | عيان | Ich bin krank.
müde | تعبان، نعسان | Du siehst müde aus.
das Fieber | السخونية | Ich habe hohes Fieber.
die Schmerzen (Plural) | الوجع | Ich habe starke Schmerzen.
der Husten | الكحة | Ich habe Husten.
wehtun | يوجع | Mein Kopf tut weh.
schlecht | وحش، تعبان | Mir geht es schlecht.
besser | أحسن | Es geht mir schon besser.
~~~

## قول بصوتك

~~~speak
Wie geht es dir? || عامل إيه؟
Mir geht es nicht gut. || أنا مش كويس.
Mein Kopf tut weh. || دماغي بتوجعني.
Ich habe Fieber und Husten. || عندي سخونية وكحة.
Gute Besserung! || ألف سلامة!
~~~

## سمع: بيشتكي من إيه؟

~~~hear
m: Ich habe seit gestern Bauchschmerzen. Kopfschmerzen habe ich nicht.
? Was tut dem Mann weh? || الراجل بيوجعه إيه؟
- der Kopf
- der Bauch *
- der Rücken

m: Meine Tochter ist krank. Sie hat Fieber und Husten, aber Halsschmerzen hat sie nicht.
? Was hat die Tochter nicht? || البنت معندهاش إيه؟
- Fieber
- Husten
- Halsschmerzen *

m: Danke, mir geht es schon besser. Morgen komme ich wieder zur Arbeit.
? Wie geht es dem Mann? || الراجل عامل إيه؟
- schlecht
- besser *
- sehr schlecht
~~~

## إملا

~~~dictate
Mir geht es nicht gut.
f: Mein Kopf tut weh.
Ich habe Fieber.
f: Gute Besserung!
~~~

## فيديو: المشاعر

~~~yt tNrwiUGHMiU Easy German: Emotions in Slow German
- **قبل ما تشغّله:** اكتب ٣ إجابات مختلفة على [[Wie geht es dir?]]: كويس، ونص نص، ووحش.
- **وإنت بتتفرج:** اكتب أي كلمة بتوصف إحساس (فرحان، تعبان، زعلان…).
- **بعده:** اختار ٣ كلمات منهم وقول بيهم جمل عن نفسك النهارده.
~~~`,
          deep: {
            why: R`منهج الاندماج بيطلب بالاسم إنك تقول حاسس بإيه وفين بيوجعك وتسمّي أجزاء الجسم للدكتور. والصحة موضوع ثابت في الامتحانات (Sprechen Teil 2 و 3، ورسايل العيادة في Hören Teil 3). وفي الحياة: لما تبقى عيان، مش هيبقى عندك وقت تدوّر في القاموس.`,
            how: R`[[Wie geht es dir/Ihnen?]] ← [[Mir geht es …]] (Dativ). الوجع: [[Mein … tut weh]] (مفرد) أو [[Meine … tun weh]] (جمع)، أو [[Der … tut mir weh]]. والأعراض: [[Ich habe Fieber/Husten/…schmerzen]]، والحالة: [[Ich bin krank/müde/erkältet]].`,
            when: R`[[Wie geht es dir?]] لأي حد تعرفه. [[Wo tut es weh?]] هتسمعها من الدكتور. [[Gute Besserung!]] لأي حد عيان، في الكلام أو في رسالة. و [[Du siehst müde aus]] لما حد شكله تعبان.`,
            mistakes: R`- [[Ich geht es gut]]: ← [[Mir geht es gut]].
- [[Mein Kopf tun weh]]: مفرد ← [[tut weh]]. و [[Meine Füße tut weh]] ← [[tun weh]].
- [[Ich bin Fieber]]: ← [[Ich habe Fieber]].
- [[Ich habe Schmerz Kopf]]: الكلمة مركّبة ← [[Kopfschmerzen]].
- [[mein Fuß]] وإنت قصدك الرجل كلها: ← [[mein Bein]].
- تقول [[Gut]] بس وإنت تعبان: الألمان هيصدّقوك.`
          },
          try: R`شاور على ١٠ أجزاء في جسمك وقول اسم كل واحد بأداته. وبعدين قول ٤ جمل عن آخر مرة كنت عيان فيها: كان عندك إيه وإيه اللي كان بيوجعك (بالمضارع عادي دلوقتي).`,
          practice: [
            { lvl: 'سريع', t: R`**الأداة والجمع:** (١) Kopf (٢) Hand (٣) Auge (٤) Fuß (٥) Bein (٦) Zahn (٧) Ohr (٨) Bauch`,
              done: R`التمانية صح بالأداة والجمع`,
              sol: R`~~~de
der Kopf, die Köpfe
die Hand, die Hände
das Auge, die Augen
der Fuß, die Füße
das Bein, die Beine
der Zahn, die Zähne
das Ohr, die Ohren
der Bauch, die Bäuche
~~~

**ليه:** أغلب أجزاء الجسم المذكر جمعها ¨ + [[-e]] ([[Köpfe]]، [[Füße]]، [[Zähne]]، [[Bäuche]]). و [[die Hand]] ← [[Hände]]. والمحايد [[Auge]] و [[Ohr]] ← [[-n]]/[[-en]]، و [[Bein]] ← [[-e]].` },
            { lvl: 'تطبيق', t: R`**tut ولا tun؟** (١) Mein Rücken ___ weh. (٢) Meine Augen ___ weh. (٣) ___ dir der Kopf weh? (٤) Die Zähne ___ mir weh. (٥) Wo ___ es weh?`,
              done: R`الخمسة صح، و [[tun]] مع الجمع بس`,
              sol: R`~~~de
Mein Rücken tut weh.
Meine Augen tun weh.
Tut dir der Kopf weh?
Die Zähne tun mir weh.
Wo tut es weh?
~~~

**ليه:** الفعل بيتبع **اللي بيوجع**، مش إنت: [[der Rücken]] و [[der Kopf]] و [[es]] مفرد ← [[tut]]، و [[die Augen]] و [[die Zähne]] جمع ← [[tun]]. و [[weh]] دايمًا في الآخر.` },
            { lvl: 'تطبيق', t: R`**قول عندك إيه:** حوّل الكلام ده لجمل: (١) دماغي بتوجعني جامد. (٢) عندي كحة من امبارح. (٣) أنا تعبان ونعسان. (٤) زوري بيوجعني ومعنديش سخونية. (٥) أختي عيانة.`,
              done: R`الخمسة صح، و [[haben]] مع الأعراض و [[sein]] مع الحالة`,
              sol: R`~~~de
Ich habe starke Kopfschmerzen.
Ich habe seit gestern Husten.
Ich bin müde.
Mein Hals tut weh, aber ich habe kein Fieber.
Meine Schwester ist krank.
~~~

**ليه:** [[starke Kopfschmerzen]] = صداع جامد (صفة قبل الاسم، خدها كده). و [[seit gestern]] = من امبارح، وده الدرس التالت. و [[kein Fieber]] = مفيش سخونية (نفي حاجة من غير أداة). و [[krank]] و [[müde]] حالة ← [[sein]].` },
            { lvl: 'تحدي', t: R`**رسالة لصاحبك:** صاحبك بعتلك [[Hey, kommst du heute zum Fußball?]]. رد عليه في ٤ جمل: إنك مش هتقدر، وليه (إيه اللي عندك وإيه اللي بيوجعك)، وإنت ناوي تعمل إيه. وبعدين اكتب رده عليك (جملتين).`,
              done: R`ردك فيه [[leider]] وعرضين على الأقل و [[tut weh]]، ورده فيه [[Gute Besserung]]`,
              sol: R`~~~de
Hey, leider kann ich heute nicht kommen.
Mir geht es nicht gut. Ich habe Fieber und mein Kopf tut weh.
Ich bleibe heute im Bett.
Vielleicht nächste Woche!
~~~

~~~de
Oh, das tut mir leid! Gute Besserung!
Trink viel Tee und schlaf gut!
~~~

**ليه كده:** [[leider kann ich … nicht kommen]]: الإطار بتاع [[können]]. و [[im Bett bleiben]] = يفضل في السرير. و [[Das tut mir leid]] (أنا آسف/زعلان عشانك) فيها نفس [[tun]] و [[mir]] بتوع [[tut mir weh]]، بس المعنى مختلف خالص. و [[Trink]] و [[schlaf]] أمر لـ [[du]].` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Wortliste، الجسم والصحة (ص ٧٦)، و Personalpronomen im Dativ (es geht mir) (ص ١٠٠)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: Gesundheit (8.2.2 و 8.3.1، ص ١٣٢–١٣٣)", url: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/KonzepteLeitfaeden/rahmencurriculum-integrationskurs.pdf" },
            { t: "DWDS: wehtun", url: "https://www.dwds.de/wb/wehtun" },
            { t: "DWDS: Schmerz", url: "https://www.dwds.de/wb/Schmerz" },
            { t: "DWDS: Besserung", url: "https://www.dwds.de/wb/Besserung" },
          ],
        },
        {
          cmd: "Ich brauche einen Termin",
          title: "ميعاد عند الدكتور: التليفون والاستقبال والاستمارة",
          pre: ["dea1/Mir geht es nicht gut", "dea1/Hast du am Samstag Zeit?"],
          desc: R`في ألمانيا غالبًا مش بتروح الدكتور من غير ميعاد: [[Ich brauche einen Termin, bitte.]] وفي الاستقبال: [[Haben Sie Ihre Versichertenkarte dabei?]]

هنا هتعمل المكالمة كلها، وتفهم مواعيد العيادة ([[Sprechzeiten]])، وتدّي بياناتك وتملا الاستمارة، وتسأل حد يرشّحلك دكتور.`,
          teach: R`## الموقف

منى بتتصل بعيادة دكتور العيلة. (Rahmencurriculum: يدّي بياناته في الاستقبال، ويملا استمارة عند الدكتور.)

~~~de Praxis=m Mona=f
Praxis: Praxis Doktor Klein, guten Tag! || عيادة دكتور كلاين، أهلًا!
Mona: Guten Tag, hier ist Mona Adel. Ich brauche bitte einen Termin. || أهلًا، أنا منى عادل. محتاجة ميعاد لو سمحتي.
Praxis: Waren Sie schon einmal bei uns? || جيتي عندنا قبل كده؟
Mona: Nein, ich bin neu in Köln. || لأ، أنا جديدة في كولونيا.
Praxis: Kein Problem. Geht es am Donnerstag um zehn Uhr? || مفيش مشكلة. ينفع الخميس الساعة ١٠؟
Mona: Donnerstag ist gut. || الخميس كويس.
Praxis: Bringen Sie bitte Ihre Versichertenkarte mit. Und kommen Sie zehn Minuten früher. || هاتي كارت التأمين معاكي. وتعالي قبلها بعشر دقايق.
Mona: Gut, das mache ich. Vielen Dank! || ماشي، هعمل كده. شكرًا جدًا!
~~~

## المكالمة: جمل جاهزة

| إنت | العيادة |
|---|---|
| [[Ich brauche einen Termin.]] | [[Wann haben Sie Zeit?]] |
| [[Ich habe starke Schmerzen. Es ist dringend.]] | [[Kommen Sie bitte sofort.]] |
| [[Geht es auch am Nachmittag?]] | [[Nein, leider nur vormittags.]] |
| [[Ich kann leider nicht kommen. Ich muss den Termin absagen.]] | [[Kein Problem. Danke für den Anruf.]] |

- [[der Termin]] = الميعاد، و [[einen Termin machen]] = ياخد ميعاد، و [[den Termin absagen]] = يلغي الميعاد ([[absagen]] بيتقسم).
- في ألمانيا لو مش هتروح ميعاد، **لازم تلغيه** قبلها. عيادات كتير بتحاسبك على الميعاد اللي مرحتهوش.

## Sprechzeiten: مواعيد العيادة

~~~text Praxis Dr. Klein, Allgemeinmedizin
Sprechzeiten:
Mo, Di, Do   8–12 Uhr und 15–18 Uhr
Mi, Fr       8–12 Uhr
Termine nach Vereinbarung · Tel. 0221 334455
~~~

- [[die Sprechzeiten]] = مواعيد العيادة. و [[Mi, Fr 8–12 Uhr]] = الأربع والجمعة الصبح بس.
- [[nach Vereinbarung]] = بميعاد سابق. و [[Allgemeinmedizin]] = طب عام (دكتور العيلة).
- ودي بالظبط نوع اليافطات اللي في Lesen Teil 3، وهتشوفها تاني في درس الامتحان.

## في الاستقبال

~~~de Arzthelferin=f Karim=m
Arzthelferin: Guten Morgen! Haben Sie einen Termin? || صباح الخير! عندك ميعاد؟
Karim: Ja, um neun Uhr. Mein Name ist Karim Hassan. || آه، الساعة ٩. اسمي كريم حسن.
Arzthelferin: Ihre Versichertenkarte, bitte. || كارت التأمين لو سمحت.
Karim: Hier, bitte. || اتفضلي.
Arzthelferin: Danke. Füllen Sie bitte dieses Formular aus. Dann nehmen Sie bitte im Wartezimmer Platz. || شكرًا. املا الاستمارة دي لو سمحت. وبعدين اقعد في أوضة الانتظار.
~~~

- [[die Arzthelferin]] = الممرضة أو مساعدة الدكتور في الاستقبال.
- [[ausfüllen]] = يملا (استمارة)، وبيتقسم: [[Füllen Sie … aus]].
- [[Nehmen Sie Platz]] = اتفضل اقعد. و [[das Wartezimmer]] = أوضة الانتظار.

## الاستمارة (Patientenbogen)

| الخانة | معناها | مثال |
|---|---|---|
| [[Name, Vorname]] | اسم العيلة، الاسم | [[Hassan, Karim]] |
| [[Geburtsdatum]] | تاريخ الميلاد | [[14.03.1996]] |
| [[Krankenkasse]] | التأمين الصحي | [[AOK]] |
| [[Allergien]] | حساسية | [[keine]] / [[Penicillin]] |
| [[Medikamente]] | أدوية بتاخدها | [[keine]] |
| [[Beschwerden]] | بتشتكي من إيه | [[Husten seit einer Woche]] |
| [[Unterschrift]] | الإمضا | |

ودي نفس طريقة Schreiben Teil 1: معلومات من كلام، تنقلها لخانات.

## ترشيح دكتور

~~~de
Kennst du einen guten Zahnarzt? || تعرف دكتور أسنان كويس؟
Mein Hausarzt ist sehr nett. Die Praxis ist in der Bergstraße. || دكتور العيلة بتاعي لطيف جدًا. العيادة في شارع برج.
Spricht der Arzt auch Englisch? || الدكتور بيتكلم إنجليزي كمان؟
~~~

## الكلمات

~~~words الدكتور والميعاد
der Arzt, die Ärzte | الدكتور | Ich gehe zum Arzt.
der Doktor, die Doktoren | الدكتور (في الكلام واللقب) | Die Praxis von Doktor Klein ist hier.
die Praxis, die Praxen | العيادة | Die Praxis ist am Mittwochnachmittag zu.
der Termin, die Termine | الميعاد | Ich brauche einen Termin.
der Zahnarzt, die Zahnärzte | دكتور الأسنان | Kennst du einen guten Zahnarzt?
das Wartezimmer, die Wartezimmer | أوضة الانتظار | Bitte warten Sie im Wartezimmer.
die Versichertenkarte, die Versichertenkarten | كارت التأمين | Ihre Versichertenkarte, bitte.
ausfüllen | يملا (استمارة) | Bitte füllen Sie das Formular aus.
absagen | يلغي (ميعاد) | Ich muss den Termin absagen.
~~~

[[zum Arzt]] = للدكتور ([[zu dem]]، Dativ، وجاي في وحدة المواصلات). و [[beim Arzt]] = عند الدكتور ([[bei dem]]).

## قول بصوتك

~~~speak
Ich brauche bitte einen Termin. || محتاج ميعاد لو سمحت.
Es ist dringend. || مستعجل.
Geht es auch am Nachmittag? || ينفع بعد الضهر؟
Hier ist meine Versichertenkarte. || ده كارت التأمين بتاعي.
Ich muss den Termin leider absagen. || للأسف لازم ألغي الميعاد.
~~~

## سمع: العيادة بتقول إيه؟

~~~hear
f: Praxis Doktor Klein. Leider ist der Doktor heute nicht da. Rufen Sie bitte morgen ab acht Uhr wieder an.
? Wann soll man wieder anrufen? || المفروض تتصل تاني إمتى؟
- heute
- morgen ab acht Uhr *
- morgen um zehn Uhr

m: Ihr Termin ist am Dienstag um fünfzehn Uhr. Bitte bringen Sie Ihre Versichertenkarte mit.
? Wann ist der Termin? || الميعاد إمتى؟
- am Dienstag um fünf Uhr
- am Dienstag um fünfzehn Uhr *
- am Donnerstag um fünfzehn Uhr

f: Hallo, hier ist Lea Schmidt. Ich kann morgen leider nicht kommen. Ich muss meinen Termin absagen.
? Was möchte Lea? || ليا عايزة إيه؟
- einen Termin machen
- den Termin absagen *
- später kommen
~~~

## إملا

~~~dictate
Ich brauche einen Termin.
f: Haben Sie einen Termin?
Ich muss den Termin absagen.
f: Bitte füllen Sie das Formular aus.
~~~

## فيديو: عند الدكتور

~~~yt EQ3vQS3JUNQ DW Deutschtrainer: At the doctor's
- **قبل ما تشغّله:** اكتب ٣ جمل هتقولها في الاستقبال.
- **وإنت بتتفرج:** الفيديو من DW (Deutsche Welle) الرسمية. اكتب كل كلمة عن الدكتور أو الجسم بتسمعها.
- **بعده:** قارن كلماتك بكلمات الدرس، وزوّد اللي ناقص في كشكولك بأداته.
~~~`,
          deep: {
            why: R`منهج الاندماج بيطلب إنك تدّي بياناتك في الاستقبال وتملا استمارة الدكتور، وتسأل عن ترشيحات دكاترة. ورسايل العيادات (ميعاد، إلغاء، مواعيد) من أكتر الحاجات في Hören Teil 3، ويافطة مواعيد العيادة من أكتر يافطات Lesen Teil 3.`,
            how: R`المكالمة: اسمك ← [[Ich brauche einen Termin]] ← الشكوى ← الميعاد ([[Geht es …?]]). الاستقبال: الميعاد واسمك ← [[Versichertenkarte]] ← الاستمارة ([[ausfüllen]]) ← [[Wartezimmer]]. والإلغاء: [[Ich muss den Termin absagen]].`,
            when: R`[[Es ist dringend]] لما الحاجة متستناش أيام. [[Waren Sie schon einmal bei uns?]] هتتسأل أول مرة في أي عيادة. و [[absagen]] قبل الميعاد بيوم على الأقل.`,
            mistakes: R`- تروح العيادة من غير ميعاد وتتفاجئ: اتصل الأول (إلا لو مستعجل).
- [[Ich ausfülle das Formular]]: ← [[Ich fülle das Formular aus]].
- تنسى كارت التأمين: مش هتتكشف عادي من غيره.
- [[Ich gehe zu Arzt]]: ← [[zum Arzt]].
- متلغيش الميعاد اللي مش هتروحه: ممكن تتحاسب عليه.
- [[Wann haben Sie Zeit?]] تجاوبها [[Ja]]: جاوب بيوم وساعة.`
          },
          try: R`اتصل (بصوتك) بعيادة متخيّلة: اسمك، وعندك إيه من إمتى، وعايز ميعاد إمتى، وهتجيب إيه معاك. وبعدين املا استمارة الدرس ببياناتك.`,
          practice: [
            { lvl: 'سريع', t: R`**رتّب المكالمة:** (أ) Bringen Sie bitte Ihre Versichertenkarte mit. (ب) Ich brauche bitte einen Termin. (ج) Praxis Doktor Klein, guten Tag! (د) Geht es am Montag um neun? (هـ) Ja, das passt. Danke!`,
              done: R`الترتيب صح`,
              sol: R`**الترتيب:** ج، ب، د، هـ، أ.

~~~de
Praxis Doktor Klein, guten Tag!
Ich brauche bitte einen Termin.
Geht es am Montag um neun?
Ja, das passt. Danke!
Bringen Sie bitte Ihre Versichertenkarte mit.
~~~

**ليه:** العيادة بترد باسمها، وإنت بتطلب، وهي بتقترح ميعاد، وإنت بتوافق، وفي الآخر بتقولك تجيب إيه. و [[Das passt]] = مناسب.` },
            { lvl: 'تطبيق', t: R`**اقرا اليافطة وجاوب:** في اليافطة اللي في الدرس (Praxis Dr. Klein): (١) Kann man am Mittwoch um sechzehn Uhr kommen? (٢) Ist die Praxis am Donnerstagnachmittag offen? (٣) Kann man ohne Termin kommen?`,
              done: R`التلاتة صح بجمل كاملة`,
              sol: R`~~~de
Nein, am Mittwoch ist die Praxis nur von acht bis zwölf Uhr offen.
Ja, am Donnerstag ist sie von fünfzehn bis achtzehn Uhr offen.
Nein, man braucht einen Termin.
~~~

**ليه:** (١) الأربع الصبح بس. (٢) الخميس فيه ١٥–١٨. (٣) [[Termine nach Vereinbarung]] = بميعاد. وفي الحقيقة لو مستعجل بيقبلوك، بس اليافطة نفسها بتقول ميعاد.` },
            { lvl: 'تطبيق', t: R`**املا الاستمارة من الكلام:** [[Hallo, ich heiße Nora Fawzi und bin am 2. Mai 1990 geboren. Meine Krankenkasse ist die TK. Ich habe eine Allergie gegen Penicillin. Ich nehme keine Medikamente. Seit drei Tagen habe ich Ohrenschmerzen.]]`,
              done: R`الخانات الستة صح (الاسم، والتاريخ بالشكل الألماني، والتأمين، والحساسية، والأدوية، والشكوى)`,
              sol: R`~~~text Patientenbogen
Name, Vorname:   Fawzi, Nora
Geburtsdatum:    02.05.1990
Krankenkasse:    TK
Allergien:       Penicillin
Medikamente:     keine
Beschwerden:     Ohrenschmerzen seit 3 Tagen
~~~

**ليه:** في الاستمارات اسم العيلة الأول وبعده فاصلة. والتاريخ [[02.05.1990]] (يوم.شهر.سنة). و [[eine Allergie gegen …]] = حساسية من … . ودي نفس طريقة Schreiben Teil 1: بتنقل من كلام لخانات من غير جمل.` },
            { lvl: 'تحدي', t: R`**إلغاء وميعاد جديد:** اكتب رسالة صوتية (٥ جمل) لأنسرماشين العيادة: إنت مين، وميعادك إمتى، ومش هتقدر تيجي ليه، وعايز ميعاد تاني إمتى، ورقمك.`,
              done: R`٥ جمل فيهم [[absagen]] مقسوم صح، وسبب، واقتراح ميعاد بـ [[Geht es …?]] أو [[Ich möchte …]]، ورقم تليفون`,
              sol: R`~~~de Karim=m
Karim: Guten Tag, hier ist Karim Hassan. || أهلًا، أنا كريم حسن.
Karim: Ich habe morgen um neun Uhr einen Termin bei Doktor Klein. || عندي ميعاد بكرة الساعة ٩ عند دكتور كلاين.
Karim: Leider muss ich den Termin absagen. Ich muss arbeiten. || للأسف لازم ألغي الميعاد. عندي شغل.
Karim: Geht es vielleicht am Freitag am Nachmittag? || ينفع يمكن الجمعة بعد الضهر؟
Karim: Meine Nummer ist null eins sieben sechs, eins zwei drei vier fünf sechs sieben. Danke! || رقمي ... شكرًا!
~~~

**ليه كده:** [[muss … absagen]]: [[müssen]] في التاني و [[absagen]] كلمة واحدة في الآخر. و [[einen Termin bei Doktor Klein]] = ميعاد عند دكتور كلاين ([[bei]] + الاسم). والرقم رقم رقم عشان يتكتب صح. ودي نفس رسايل Hören Teil 3، بس إنت اللي بتقولها.` },
          ],
          ref: [
            { t: "Rahmencurriculum für Integrationskurse: Gesundheit (8.1.1 و 8.2.2 و 8.2.5، ص ١٣١–١٣٣)", url: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/KonzepteLeitfaeden/rahmencurriculum-integrationskurs.pdf" },
            { t: "Goethe-Zertifikat A1: Hören Teil 3 و Lesen Teil 3 و Schreiben Teil 1 (ص ٢٧ و ٣٢ و ٣٧)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "DWDS: Termin", url: "https://www.dwds.de/wb/Termin" },
            { t: "DWDS: absagen", url: "https://www.dwds.de/wb/absagen" },
            { t: "DWDS: Praxis", url: "https://www.dwds.de/wb/Praxis" },
          ],
        },
        {
          cmd: "Seit wann haben Sie das?",
          title: "عند الدكتور: seit، وتعليمات الكشف، و sollen",
          pre: ["dea1/Ich brauche einen Termin", "dea1/Rufen Sie bitte an!", "dea1/Hier darf man nicht rauchen"],
          desc: R`الدكتور هيسألك: [[Seit wann haben Sie die Schmerzen?]] — [[Seit drei Tagen.]] وهيقولك: [[Machen Sie bitte den Mund auf.]] وفي الآخر: [[Sie sollen drei Tage im Bett bleiben.]]

هنا [[seit]] (من وقت كذا ولسه) بعده Dativ، والأمر اللي اتعلمته في تعليمات الكشف، وفعل مساعد جديد: [[sollen]] (المفروض، الدكتور قال).`,
          teach: R`## الموقف

كريم عند الدكتور. (Rahmencurriculum: يفهم المعلومات المهمة في كلام الدكتور وتعليماته البسيطة.)

~~~de Arzt=m Karim=m
Arzt: Guten Tag, Herr Hassan. Was fehlt Ihnen denn? || أهلًا يا أستاذ حسن. عندك إيه؟
Karim: Ich habe Halsschmerzen und Husten. || عندي وجع في الزور وكحة.
Arzt: Seit wann haben Sie das? || من إمتى عندك ده؟
Karim: Seit vier Tagen. Seit gestern habe ich auch Fieber. || من ٤ أيام. ومن امبارح عندي سخونية كمان.
Arzt: Machen Sie bitte den Mund auf und sagen Sie „Aaah“. || افتح بُقك لو سمحت وقول «آآآه».
Arzt: Ihr Hals ist sehr rot. Sie haben eine Grippe. || زورك أحمر أوي. عندك إنفلونزا.
Karim: Muss ich zu Hause bleiben? || لازم أقعد في البيت؟
Arzt: Ja, Sie sollen eine Woche zu Hause bleiben und viel trinken. Ich schreibe Sie krank. || آه، المفروض تقعد في البيت أسبوع وتشرب كتير. هكتبلك إجازة مرضي.
~~~

## Was fehlt Ihnen? أسئلة الدكتور

| الدكتور بيسأل | إنت بتقول |
|---|---|
| [[Was fehlt Ihnen?]] / [[Was haben Sie?]] | [[Ich habe Husten.]] |
| [[Wo tut es weh?]] | [[Hier.]] / [[Der Rücken tut weh.]] |
| [[Seit wann haben Sie das?]] | [[Seit drei Tagen.]] |
| [[Haben Sie Fieber?]] | [[Ja, achtunddreißig Grad.]] |
| [[Nehmen Sie Medikamente?]] | [[Nein, keine.]] |
| [[Haben Sie Allergien?]] | [[Ja, gegen Penicillin.]] |

[[Was fehlt Ihnen?]] حرفيًا «إيه اللي ناقصك؟»، بس معناها «عندك إيه؟». وهتسمعها كتير من الدكاترة.

## seit: من وقت كذا (ولسه)

[[seit]] للحاجة اللي **بدأت في الماضي ولسه مستمرة**، والفعل **مضارع**:

~~~de
Ich habe seit gestern Fieber. || عندي سخونية من امبارح (ولسه).
Ich wohne seit zwei Jahren in Köln. || ساكن في كولونيا من سنتين.
Ich lerne seit einem Monat Deutsch. || بتعلّم ألماني من شهر.
Seit einer Woche tut mein Rücken weh. || ضهري بيوجعني من أسبوع.
~~~

- بعد [[seit]] Dativ: [[der Monat]] ← [[seit einem Monat]]، [[die Woche]] ← [[seit einer Woche]]، والجمع ← [[seit zwei Jahren]]، [[seit drei Tagen]] (بـ [[-n]]).
- **الفخ للمصريين والإنجليز:** في الإنجليزي «I have had …» (ماضي). في الألماني **مضارع**: [[Ich habe seit drei Tagen Fieber]] مش «Ich hatte…». لأن الحاجة لسه موجودة.
- [[Seit wann …?]] = من إمتى؟

## تعليمات الكشف: الأمر لـ Sie

~~~de
Machen Sie bitte den Mund auf. || افتح بُقك لو سمحت.
Atmen Sie tief ein. || خد نفس عميق.
Legen Sie sich bitte hin. || نام على السرير لو سمحت.
Zeigen Sie mir bitte den Arm. || ورّيني دراعك لو سمحت.
Bitte warten Sie draußen. || استنى برّه لو سمحت.
~~~

ده الأمر لـ [[Sie]] اللي اتعلمته في وحدة الشغل: الفعل الأول و [[Sie]] بعده، والجزء المقسوم ([[auf]]، [[ein]]، [[hin]]) في الآخر. و [[sich hinlegen]] (ينام/يتمدّد) فيه [[sich]] جاي في A2، خدها كده.

## sollen: المفروض

| [[ich soll]] | [[du sollst]] | [[er/sie soll]] | [[wir sollen]] | [[ihr sollt]] | [[sie/Sie sollen]] |
|---|---|---|---|---|---|

[[sollen]] = حد تاني (الدكتور، المدير، القواعد) قال إنك تعمل كده:

~~~de
Sie sollen viel Wasser trinken. || المفروض تشرب مية كتير.
Ich soll drei Tage im Bett bleiben. || المفروض أفضل في السرير ٣ أيام.
Der Arzt sagt, ich soll keinen Sport machen. || الدكتور بيقول المفروض معملش رياضة.
Soll ich morgen wiederkommen? || المفروض أرجع بكرة؟
~~~

| | الفرق |
|---|---|
| [[Ich muss im Bett bleiben.]] | لازم (مفيش اختيار) |
| [[Ich soll im Bett bleiben.]] | الدكتور قالي كده |
| [[Soll ich …?]] | تحب أعمل كذا؟ / المفروض أعمل كذا؟ |

ونفس الإطار: [[soll]] في التاني والمصدر في الآخر. و [[ich soll]] و [[er soll]] من غير [[-t]].

## krankschreiben: الإجازة المرضي

[[Ich schreibe Sie krank.]] = هكتبلك إجازة مرضي. الدكتور بيدّيك ورقة ([[die Krankmeldung]]) وإنت بتبعتها للشغل. ودي اللي اتكلمنا عنها في وحدة الشغل: لو عيان ٣ أيام أو أكتر، أغلب الشغلانات بتطلبها.

## الكلمات

~~~words عند الدكتور
seit | من وقت (ولسه) | Ich habe seit gestern Fieber.
sollen | المفروض | Sie sollen viel trinken.
fehlen | ناقص، (عندك إيه؟) | m: Was fehlt Ihnen?
die Grippe | الإنفلونزا | Sie haben eine Grippe.
erkältet | متبرّد | Ich bin erkältet.
das Bett, die Betten | السرير | Bleiben Sie im Bett.
gesund | سليم، صحي | Bald sind Sie wieder gesund.
krankschreiben | يكتب إجازة مرضي | Ich schreibe Sie krank.
~~~

## قول بصوتك

~~~speak
Ich habe seit drei Tagen Husten. || عندي كحة من ٣ أيام.
Seit gestern habe ich Fieber. || من امبارح عندي سخونية.
Soll ich zu Hause bleiben? || المفروض أقعد في البيت؟
Ich soll viel Wasser trinken. || المفروض أشرب مية كتير.
Machen Sie bitte den Mund auf. || افتح بُقك لو سمحت.
~~~

## سمع: الدكتور قال إيه؟

~~~hear
f: Sie haben eine Grippe. Sie sollen fünf Tage zu Hause bleiben und viel Tee trinken.
? Wie lange soll der Mann zu Hause bleiben? || الراجل المفروض يقعد في البيت قد إيه؟
- drei Tage
- fünf Tage *
- eine Woche

f: Ich habe seit zwei Wochen Rückenschmerzen, aber seit gestern ist es schlimmer.
? Seit wann hat die Frau Rückenschmerzen? || الست عندها وجع في ضهرها من إمتى؟
- seit gestern
- seit zwei Tagen
- seit zwei Wochen *

f: Sie dürfen eine Woche keinen Sport machen. Aber Sie sollen jeden Tag spazieren gehen.
? Was soll man jeden Tag machen? || المفروض يعمل إيه كل يوم؟
- Sport machen
- spazieren gehen *
- im Bett bleiben
~~~

## إملا

~~~dictate
Seit wann haben Sie das?
f: Ich habe seit gestern Fieber.
Sie sollen viel trinken.
f: Machen Sie bitte den Mund auf.
~~~`,
          deep: {
            why: R`فهم كلام الدكتور وتعليماته هدف بالاسم في منهج الاندماج. و [[sollen]] في قايمة أفعال A1 المساعدة، و Goethe بيستخدمها كتير في جمل القراية والسمع ([[Was soll Lea machen?]]). و [[seit]] من أكتر حروف الوقت في الكلام اليومي («من إمتى؟»).`,
            how: R`[[seit]] + Dativ + **مضارع** لحاجة لسه مستمرة. الأمر لـ [[Sie]] في تعليمات الكشف. و [[sollen]] بيتصرّف في التاني والمصدر في الآخر، ومعناه إن حد تاني قال.`,
            when: R`[[Seit wann …?]] أول سؤال عند أي دكتور. [[Soll ich …?]] لما تسأل الدكتور تعمل إيه. [[Der Arzt sagt, ich soll …]] لما تحكي لحد كلام الدكتور. و [[muss]] لو حاجة ملهاش بديل.`,
            mistakes: R`- [[Ich hatte seit drei Tagen Fieber]] وهو لسه عندك: ← [[Ich habe seit drei Tagen Fieber]].
- [[seit drei Tage]]: Dativ جمع ← [[seit drei Tagen]].
- [[seit eine Woche]]: ← [[seit einer Woche]].
- [[er sollt]]: ← [[er soll]].
- [[Sie sollen bleiben zu Hause]]: ← [[Sie sollen zu Hause bleiben]].
- [[Machen Sie auf den Mund]]: ← [[Machen Sie den Mund auf]].`
          },
          try: R`مثّل الكشف كله بصوتك (إنت الدكتور وإنت المريض): الدكتور يسأل ٤ أسئلة ويدّي تعليمتين كشف ويقول ٢ حاجات بـ [[sollen]]، والمريض يجاوب بـ [[seit]].`,
          practice: [
            { lvl: 'سريع', t: R`**seit + Dativ:** (١) seit ___ Tag (واحد) (٢) seit zwei ___ (Tag) (٣) seit ___ Woche (واحدة) (٤) seit drei ___ (Monat) (٥) seit ___ Jahr (واحد)`,
              done: R`الخمسة صح، و [[-en]]/[[-n]] في الجمع`,
              sol: R`~~~de
seit einem Tag
seit zwei Tagen
seit einer Woche
seit drei Monaten
seit einem Jahr
~~~

**ليه:** بعد [[seit]] Dativ: المذكر والمحايد ← [[einem]] ([[der Tag]]، [[der Monat]]، [[das Jahr]])، والمؤنث ← [[einer]] ([[die Woche]]). والجمع في Dativ بياخد [[-n]]: [[Tagen]]، [[Monaten]]، [[Jahren]].` },
            { lvl: 'تطبيق', t: R`**الدكتور قال إيه؟** حوّل كلام الدكتور لجمل بـ [[soll]] عن نفسك: (١) „Trinken Sie viel Wasser!" (٢) „Bleiben Sie drei Tage zu Hause!" (٣) „Machen Sie eine Woche keinen Sport!" (٤) „Kommen Sie am Montag wieder!"`,
              done: R`٤ جمل بـ [[Ich soll …]] والمصدر في الآخر، و [[wiederkommen]] كلمة واحدة`,
              sol: R`~~~de
Ich soll viel Wasser trinken.
Ich soll drei Tage zu Hause bleiben.
Ich soll eine Woche keinen Sport machen.
Ich soll am Montag wiederkommen.
~~~

**ليه:** الأمر لـ [[Sie]] (من الدكتور) بيبقى [[Ich soll …]] لما تحكيه. والفعل المقسوم ([[Kommen Sie … wieder]]) بيرجع كلمة واحدة في الآخر مع [[soll]]: [[wiederkommen]].` },
            { lvl: 'تطبيق', t: R`**صلّح الغلط:** (١) [[Ich hatte seit zwei Tagen Kopfschmerzen.]] (والوجع لسه موجود) (٢) [[Ich wohne seit drei Jahre hier.]] (٣) [[Er sollt viel schlafen.]] (٤) [[Seit wann du hast das?]] (٥) [[Sie sollen nehmen die Tabletten.]]`,
              done: R`الخمسة صح وعارف السبب`,
              sol: R`~~~de
Ich habe seit zwei Tagen Kopfschmerzen.
Ich wohne seit drei Jahren hier.
Er soll viel schlafen.
Seit wann hast du das?
Sie sollen die Tabletten nehmen.
~~~

**ليه:** (١) الحاجة لسه موجودة ← مضارع. (٢) Dativ جمع ← [[Jahren]]. (٣) [[er soll]] من غير [[-t]]. (٤) بعد [[Seit wann]] الفعل على طول. (٥) المصدر في الآخر.` },
            { lvl: 'تحدي', t: R`**احكي لصاحبك:** إنت رجعت من الدكتور. اكتب ٥ جمل لصاحبك على واتساب: عندك إيه، ومن إمتى، والدكتور قال إيه (بـ [[soll]] مرتين)، وهترجع الشغل إمتى.`,
              done: R`٥ جمل فيهم [[seit]] + Dativ و [[soll]] مرتين وحاجة واحدة على الأقل بالماضي ([[war]] أو Perfekt)`,
              sol: R`~~~de
Ich war heute beim Arzt.
Ich habe seit Montag eine Grippe.
Ich soll eine Woche zu Hause bleiben.
Ich soll auch viel schlafen und Tee trinken.
Am nächsten Montag gehe ich wieder zur Arbeit.
~~~

**ليه كده:** [[war … beim Arzt]] ماضي ([[beim]] = [[bei dem]]). و [[seit Montag]] من غير أداة لأن الأيام بعد [[seit]] بتتقال كده. و [[soll]] مرتين بحاجتين مختلفتين. و [[Am nächsten Montag]] = الاتنين الجاي ([[nächsten]] صفة، خدها كده).` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Modalverben (sollen) و Imperativ (ص ١٠٠)، والصحة (ص ٧٦)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: Gesundheit، كلام الدكتور وتعليماته (8.2.2.3 و 8.2.4.2، ص ١٣٢)", url: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/KonzepteLeitfaeden/rahmencurriculum-integrationskurs.pdf" },
            { t: "DWDS: seit", url: "https://www.dwds.de/wb/seit" },
            { t: "DWDS: sollen", url: "https://www.dwds.de/wb/sollen" },
            { t: "DWDS: fehlen", url: "https://www.dwds.de/wb/fehlen" },
          ],
        },
        {
          cmd: "Dreimal am Tag nach dem Essen",
          title: "في الصيدلية: الدوا، وإمتى تاخده، و nach/vor/für",
          pre: ["dea1/Seit wann haben Sie das?", "dea1/Am Montag um acht"],
          desc: R`الصيدلي هيقولك: [[Nehmen Sie dreimal am Tag eine Tablette nach dem Essen, eine Woche lang.]] ولازم تفهم كل كلمة: كام مرة، وقبل ولا بعد الأكل، ولمدة قد إيه.

هنا حروف الوقت اللي بتيجي مع الدوا: [[nach]] و [[vor]] + Dativ ([[nach dem Essen]]، [[vor dem Schlafen]])، و [[für]] + Akkusativ ([[für eine Woche]])، و [[einmal]]/[[zweimal]]/[[dreimal]]. وهتقرا أهم حاجة في نشرة الدوا.`,
          teach: R`## الموقف

منى في الصيدلية بالروشتة. (Rahmencurriculum: يفهم تعليمات الصيدلي، ويفهم أهم حاجة في نشرة الدوا.)

~~~de Apotheker=m Mona=f
Apotheker: Guten Tag! Was kann ich für Sie tun? || أهلًا! أقدر أساعدك في إيه؟
Mona: Guten Tag! Ich habe hier ein Rezept. || أهلًا! معايا روشتة.
Apotheker: Danke. Hier sind Ihre Tabletten. Nehmen Sie dreimal am Tag eine Tablette. || شكرًا. اتفضلي الأقراص. خدي قرص ٣ مرات في اليوم.
Mona: Vor oder nach dem Essen? || قبل ولا بعد الأكل؟
Apotheker: Nach dem Essen, mit einem Glas Wasser. Und nehmen Sie sie bitte für sieben Tage. || بعد الأكل، بكوباية مية. وخديها لمدة ٧ أيام لو سمحتي.
Mona: Und haben Sie auch etwas gegen Husten? || وعندك حاجة للكحة كمان؟
Apotheker: Ja, diesen Saft. Zweimal täglich einen Löffel, vor dem Schlafen. || آه، الشراب ده. معلقة مرتين في اليوم، قبل النوم.
Mona: Was kostet das? || بكام ده؟
Apotheker: Mit Rezept zahlen Sie fünf Euro. Gute Besserung! || بالروشتة هتدفعي ٥ يورو. ألف سلامة!
~~~

## كام مرة؟

| | |
|---|---|
| [[einmal am Tag]] / [[einmal täglich]] | مرة في اليوم |
| [[zweimal am Tag]] | مرتين في اليوم |
| [[dreimal täglich]] | ٣ مرات في اليوم |
| [[morgens]] / [[mittags]] / [[abends]] | الصبح / الضهر / بالليل |
| [[jeden Tag]] | كل يوم |

[[-mal]] بيتلزق في الرقم: [[einmal]]، [[zweimal]]، [[zehnmal]]. وعلى العلبة بتلاقيه مكتوب [[3 x täglich]].

## nach و vor: قبل وبعد (+ Dativ)

~~~de
Nehmen Sie die Tablette nach dem Essen. || خد القرص بعد الأكل.
Nehmen Sie die Tropfen vor dem Frühstück. || خد النقط قبل الفطار.
Vor dem Schlafen trinke ich einen Tee. || قبل النوم بشرب شاي.
Nach der Arbeit gehe ich zur Apotheke. || بعد الشغل هروح الصيدلية.
~~~

- بعد [[nach]] و [[vor]] (للوقت) Dativ: [[das Essen]] ← [[nach dem Essen]]، [[die Arbeit]] ← [[nach der Arbeit]]، [[der Kurs]] ← [[vor dem Kurs]].
- [[das Schlafen]] و [[das Essen]]: الفعل بيبقى اسم بحرف كبير و [[das]] (النوم، الأكل).
- **فخ [[vor]]:** [[vor dem Essen]] = قبل الأكل. و [[vor drei Tagen]] = من ٣ أيام (حصلت وخلصت). أما [[seit drei Tagen]] = من ٣ أيام ولسه.

## für: لمدة (+ Akkusativ)

~~~de
Nehmen Sie die Tabletten für eine Woche. || خد الأقراص لمدة أسبوع.
Ich fahre für zwei Wochen nach Ägypten. || هسافر مصر لمدة أسبوعين.
Ich bin für drei Tage krankgeschrieben. || واخد إجازة مرضي ٣ أيام.
~~~

| | المعنى | مثال |
|---|---|---|
| [[seit]] + Dativ | من وقت كذا ولسه | [[seit einer Woche krank]] |
| [[für]] + Akkusativ | لمدة (لقدام) | [[für eine Woche]] |
| [[vor]] + Dativ | من (حصلت وخلصت) / قبل | [[vor einer Woche]]، [[vor dem Essen]] |

## في الصيدلية

- **[[das Rezept]]** = الروشتة. أدوية كتير في ألمانيا بتتباع بروشتة بس ([[rezeptpflichtig]])، والتأمين بيدفع معظمها وإنت بتدفع مبلغ صغير.
- حاجات زي البرد والصداع بتشتريها من غير روشتة: [[Haben Sie etwas gegen Kopfschmerzen?]] (عندك حاجة للصداع؟).
- [[gegen]] = ضد، وبتستخدمه مع العيا: [[ein Medikament gegen Husten]].
- [[die Apotheke]] غير [[die Drogerie]]: الدوا من الأولى بس، والتانية للصابون والشامبو والحاجات دي.

## نشرة الدوا (Beipackzettel)

~~~read أهم حاجة في نشرة الدوا
Erwachsene: 3 x täglich 1 Tablette nach dem Essen. || الكبار: قرص ٣ مرات في اليوم بعد الأكل
Kinder unter 12 Jahren: 2 x täglich 1/2 Tablette. || العيال أقل من ١٢ سنة: نص قرص مرتين في اليوم
Nicht mit Alkohol nehmen. || متاخدوش مع الكحول
Nicht länger als 7 Tage nehmen. || متاخدوش أكتر من ٧ أيام
? Ein Kind mit zehn Jahren nimmt dreimal täglich eine Tablette. || عيل عنده ١٠ سنين بياخد قرص ٣ مرات في اليوم
- Richtig
- Falsch *
? Erwachsene nehmen die Tabletten nach dem Essen. || الكبار بياخدوا الأقراص بعد الأكل
- Richtig *
- Falsch
? Man darf die Tabletten zwei Wochen lang nehmen. || مسموح تاخد الأقراص أسبوعين
- Richtig
- Falsch *
~~~

**ليه الإجابات كده:** (١) تحت ١٢ ← نص قرص مرتين. (٢) [[nach dem Essen]]. (٣) [[Nicht länger als 7 Tage]] = مش أكتر من ٧ أيام، والأسبوعين ١٤.

## الكلمات

~~~words الصيدلية
die Apotheke, die Apotheken | الصيدلية | Die Apotheke ist neben der Praxis.
das Rezept, die Rezepte | الروشتة | Ich habe ein Rezept.
die Tablette, die Tabletten | القرص | Nehmen Sie eine Tablette.
das Medikament, die Medikamente | الدوا | Nehmen Sie Medikamente?
die Tropfen (Plural) | النقط | Nehmen Sie zehn Tropfen.
nehmen | ياخد | Nehmen Sie die Tabletten nach dem Essen.
nach | بعد | Nach dem Essen trinke ich Tee.
vor | قبل | Vor dem Schlafen lese ich.
gegen | ضد (عيا) | Haben Sie etwas gegen Husten?
täglich | يومي، في اليوم | Nehmen Sie die Tropfen täglich.
~~~

## قول بصوتك

~~~speak
Ich habe hier ein Rezept. || معايا روشتة.
Haben Sie etwas gegen Kopfschmerzen? || عندك حاجة للصداع؟
Vor oder nach dem Essen? || قبل ولا بعد الأكل؟
Dreimal am Tag eine Tablette. || قرص ٣ مرات في اليوم.
Wie lange soll ich die Tabletten nehmen? || آخد الأقراص لمدة قد إيه؟
~~~

## سمع: تاخده إزاي؟

~~~hear
m: Nehmen Sie die Tabletten zweimal am Tag, morgens und abends, nach dem Essen.
? Wann nimmt man die Tabletten? || بتاخد الأقراص إمتى؟
- vor dem Essen
- nach dem Essen *
- in der Nacht

f: Diesen Saft nehmen Sie dreimal täglich, für fünf Tage. Nicht länger!
? Wie lange nimmt man den Saft? || بتاخد الشراب لمدة قد إيه؟
- drei Tage
- fünf Tage *
- eine Woche

m: Für dieses Medikament brauchen Sie ein Rezept. Gehen Sie bitte zuerst zum Arzt.
? Was braucht die Person? || الشخص محتاج إيه؟
- ein Rezept *
- Geld
- einen Termin in der Apotheke
~~~

## إملا

~~~dictate
Ich habe hier ein Rezept.
f: Nehmen Sie die Tablette nach dem Essen.
Dreimal am Tag.
f: Haben Sie etwas gegen Husten?
~~~`,
          deep: {
            why: R`فهم تعليمات الصيدلي ونشرة الدوا هدف بالاسم في منهج الاندماج، وده موقف ممكن يبقى خطير لو فهمته غلط. و [[nach]] و [[vor]] + Dativ و [[für]] + Akkusativ للوقت في قايمة قواعد Goethe A1 بالأمثلة دي بالظبط ([[nach dem Essen]]، [[für drei Wochen]]).`,
            how: R`كام مرة: [[einmal]]/[[zweimal]]/[[dreimal]] [[am Tag]] أو [[täglich]]. إمتى: [[vor]]/[[nach]] + Dativ. لمدة: [[für]] + Akkusativ أو [[… lang]]. ومن غير روشتة: [[Haben Sie etwas gegen …?]]`,
            when: R`[[Vor oder nach dem Essen?]] اسألها دايمًا لو الصيدلي مقالش. [[Wie lange?]] قبل ما تمشي. و [[gegen]] لأي عيا. و [[Apotheke]] للدوا، و [[Drogerie]] للحاجات التانية.`,
            mistakes: R`- [[nach das Essen]]: Dativ ← [[nach dem Essen]].
- [[für einer Woche]]: [[für]] + Akkusativ ← [[für eine Woche]].
- [[drei mal]] كلمتين: ← [[dreimal]].
- تخلط [[vor drei Tagen]] (حصلت وخلصت) و [[seit drei Tagen]] (لسه).
- [[Haben Sie etwas für Kopfschmerzen?]] مفهومة، بس الأطبع [[gegen Kopfschmerzen]].
- تدوّر على دوا في [[Drogerie]]: الدوا في [[Apotheke]].`
          },
          try: R`طلّع أي علبة دوا في بيتك واقرا النشرة: دوّر على كام مرة وإمتى ولمدة قد إيه، وقولهم بالألماني بجمل زي اللي في الدرس.`,
          practice: [
            { lvl: 'سريع', t: R`**nach/vor + Dativ:** (١) nach ___ Essen (٢) vor ___ Arbeit (٣) nach ___ Kurs (٤) vor ___ Frühstück (٥) nach ___ Schule`,
              done: R`الخمسة صح، و [[dem]] للمذكر والمحايد و [[der]] للمؤنث`,
              sol: R`~~~de
nach dem Essen
vor der Arbeit
nach dem Kurs
vor dem Frühstück
nach der Schule
~~~

**ليه:** Dativ: [[das Essen]] و [[der Kurs]] و [[das Frühstück]] ← [[dem]]، و [[die Arbeit]] و [[die Schule]] ← [[der]].` },
            { lvl: 'تطبيق', t: R`**اقرا العلبة وقول:** (١) [[1 x täglich morgens]] (٢) [[3 x täglich nach dem Essen]] (٣) [[2 x täglich 15 Tropfen, für 10 Tage]] (٤) [[abends vor dem Schlafen]]`,
              done: R`الأربعة جمل كاملة بـ [[Nehmen Sie …]]`,
              sol: R`~~~de
Nehmen Sie die Tablette einmal täglich, morgens.
Nehmen Sie die Tabletten dreimal täglich nach dem Essen.
Nehmen Sie zweimal täglich fünfzehn Tropfen, für zehn Tage.
Nehmen Sie das Medikament abends vor dem Schlafen.
~~~

**ليه:** [[1 x]] بيتقري [[einmal]]، و [[3 x]] ← [[dreimal]]. والأمر لـ [[Sie]] لأنك بتقول تعليمات زي الصيدلي.` },
            { lvl: 'تطبيق', t: R`**seit ولا für ولا vor؟** (١) Ich bin ___ zwei Tagen krank. (لسه) (٢) Nehmen Sie das ___ eine Woche. (٣) Ich war ___ einem Monat beim Arzt. (حصلت) (٤) Trinken Sie den Tee ___ dem Schlafen. (٥) Er wohnt ___ fünf Jahren in Wien.`,
              done: R`الخمسة صح بالمعنى والـ Dativ/Akkusativ`,
              sol: R`~~~de
Ich bin seit zwei Tagen krank.
Nehmen Sie das für eine Woche.
Ich war vor einem Monat beim Arzt.
Trinken Sie den Tee vor dem Schlafen.
Er wohnt seit fünf Jahren in Wien.
~~~

**ليه:** لسه مستمر ← [[seit]] + Dativ. لمدة لقدام ← [[für]] + Akkusativ. حصلت وخلصت ← [[vor]] + Dativ ومعاها ماضي ([[war]]). وقبل حاجة ← [[vor]] + Dativ.` },
            { lvl: 'تحدي', t: R`**في الصيدلية:** اكتب حوار (٨ سطور) في صيدلية: إنت عندك زكام وصداع ومعاكش روشتة. الصيدلي يسألك من إمتى، ويديك حاجتين، ويقولك تاخدهم إزاي، وتسأله بكام.`,
              done: R`٨ سطور، فيهم [[gegen]] و [[seit]] و [[nach]]/[[vor]] + Dativ و [[für]] أو [[… lang]] وسعر`,
              sol: R`~~~de Apothekerin=f Ali=m
Apothekerin: Guten Tag! Was kann ich für Sie tun? || أهلًا! أقدر أساعدك في إيه؟
Ali: Haben Sie etwas gegen Schnupfen und Kopfschmerzen? || عندك حاجة للزكام والصداع؟
Apothekerin: Seit wann haben Sie das? || من إمتى عندك ده؟
Ali: Seit gestern. || من امبارح.
Apothekerin: Hier sind Nasentropfen und Tabletten gegen Kopfschmerzen. || اتفضل نقط للمناخير وأقراص للصداع.
Apothekerin: Die Tropfen dreimal täglich, die Tabletten nur bei Schmerzen, nach dem Essen. || النقط ٣ مرات في اليوم، والأقراص بس لما يوجعك، بعد الأكل.
Ali: Wie lange soll ich die Tropfen nehmen? || آخد النقط لمدة قد إيه؟
Apothekerin: Höchstens eine Woche. Das macht zwölf Euro fünfzig. || أسبوع بالكتير. الحساب ١٢٫٥٠.
~~~

**ليه كده:** [[gegen Schnupfen]] من غير روشتة. و [[nur bei Schmerzen]] = بس لما يبقى فيه وجع ([[bei]] + Dativ). و [[Höchstens eine Woche]] = أسبوع بالكتير. و [[Das macht …]] السعر، زي ما اتعلمت في وحدة التسوق.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Präposition temporal (nach + Dativ: nach dem Essen، vor + Dativ، für + Akkusativ: für drei Wochen) (ص ١٠٠)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: Gesundheit، نشرة الدوا وتعليمات الصيدلي (8.2.4، ص ١٣٢)", url: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/KonzepteLeitfaeden/rahmencurriculum-integrationskurs.pdf" },
            { t: "DWDS: Apotheke", url: "https://www.dwds.de/wb/Apotheke" },
            { t: "DWDS: Rezept", url: "https://www.dwds.de/wb/Rezept" },
            { t: "DWDS: Beipackzettel", url: "https://www.dwds.de/wb/Beipackzettel" },
          ],
        },
        {
          cmd: "Ruf schnell einen Krankenwagen!",
          title: "صحتك والطوارئ: oft/nie، و besser/am besten، و 112",
          pre: ["dea1/Dreimal am Tag nach dem Essen", "dea1/Ich esse gern Fisch"],
          desc: R`[[Wie oft machst du Sport?]] — [[Zweimal in der Woche. Ich esse auch mehr Obst.]] ولو حصلت حاجة: [[Hilfe! Ruf schnell einen Krankenwagen!]]

هنا هتتكلم عن عاداتك ([[immer]]، [[oft]]، [[manchmal]]، [[nie]])، وتقارن ([[gut]] ← [[besser]] ← [[am besten]])، وتعرف أرقام الطوارئ وإزاي تتصل وتقول فين وإيه اللي حصل.`,
          teach: R`## الموقف ١: عادات صحية

~~~de Nora=f Omar=m
Nora: Du siehst gut aus! Machst du jetzt Sport? || شكلك حلو! بتعمل رياضة دلوقتي؟
Omar: Ja, ich gehe dreimal in der Woche schwimmen. || آه، بروح أعوم ٣ مرات في الأسبوع.
Nora: Toll! Ich habe nie Zeit für Sport. || حلو! أنا عمري ما بلاقي وقت للرياضة.
Omar: Ich esse auch weniger Zucker und mehr Gemüse. Ich schlafe jetzt viel besser. || وكمان باكل سكر أقل وخضار أكتر. وبقيت بنام أحسن بكتير.
Nora: Vielleicht gehe ich mal mit! || يمكن أجي معاك مرة!
~~~

## كام مرة؟ immer, oft, manchmal, nie

| | المعنى |
|---|---|
| [[immer]] | دايمًا |
| [[oft]] | كتير |
| [[manchmal]] | ساعات |
| [[selten]] | نادرًا |
| [[nie]] | أبدًا، عمر ما |

~~~de
Ich frühstücke immer. || أنا دايمًا بفطر.
Ich trinke oft Wasser. || بشرب مية كتير.
Ich esse manchmal Süßigkeiten. || ساعات باكل حلويات.
Ich rauche nie. || عمري ما بدخّن.
Wie oft machst du Sport? Zweimal in der Woche. || بتعمل رياضة كام مرة؟ مرتين في الأسبوع.
~~~

مكانها بعد الفعل زي [[gern]]. و [[Wie oft?]] = كام مرة؟ والإجابة [[einmal/zweimal in der Woche]] أو [[jeden Tag]].

## mehr و weniger، و besser

| | | |
|---|---|---|
| [[viel]] كتير | [[mehr]] أكتر | [[am meisten]] أكتر حاجة |
| [[gut]] كويس | [[besser]] أحسن | [[am besten]] أحسن حاجة |
| [[gern]] بحب | [[lieber]] بحب أكتر | [[am liebsten]] بحب أكتر حاجة |

~~~de
Ich soll mehr Wasser trinken. || المفروض أشرب مية أكتر.
Ich esse weniger Fleisch. || باكل لحمة أقل.
Mir geht es heute besser. || النهارده أحسن.
Am besten schläfst du acht Stunden. || الأحسن تنام ٨ ساعات.
~~~

[[gut]] و [[viel]] و [[gern]] شاذين (زي العربي «كويس ← أحسن»)، وده اللي Goethe بيطلبه في A1 من المقارنة. وصفات تانية جاية في A2.

## الموقف ٢: طوارئ

~~~de Leitstelle=m Mona=f
Leitstelle: Notruf, Feuerwehr und Rettungsdienst. Wo ist der Notfall? || الطوارئ، المطافي والإسعاف. الحالة فين؟
Mona: In der Bergstraße zwölf, in Köln. Ein Mann ist auf der Treppe gefallen. || شارع برج ١٢، في كولونيا. راجل وقع على السلم.
Leitstelle: Was ist passiert? Ist er verletzt? || إيه اللي حصل؟ متعوّر؟
Mona: Ja, sein Bein tut sehr weh. Er kann nicht aufstehen. || آه، رجله بتوجعه أوي. مش قادر يقوم.
Leitstelle: Wie heißen Sie? || اسمك إيه؟
Mona: Mona Adel. Meine Nummer ist null eins sieben sechs, eins zwei drei vier fünf sechs sieben. || منى عادل. رقمي ...
Leitstelle: Der Krankenwagen kommt. Bleiben Sie bei dem Mann. || الإسعاف جاية. خليكي جنب الراجل.
~~~

## أرقام الطوارئ في ألمانيا

| الرقم | لإيه |
|---|---|
| [[112]] | الإسعاف والمطافي ([[Rettungsdienst]] و [[Feuerwehr]]) |
| [[110]] | البوليس ([[Polizei]]) |
| [[116 117]] | دكتور الطوارئ بالليل والأجازات، للحاجات المش خطيرة |

**الأسئلة اللي هتتسألها (واتكلم بالترتيب ده):**
1. [[Wo?]] فين بالظبط: الشارع ورقم البيت والمدينة.
2. [[Was ist passiert?]] إيه اللي حصل.
3. [[Wie viele Personen?]] كام واحد.
4. [[Wer ruft an?]] اسمك ورقمك.
5. **متقفلش** لحد ما هم يقولوا.

ومن غير ألماني كفاية؟ قول [[Notfall!]] والعنوان، وده لوحده بيبعت إسعاف. و [[Hilfe!]] = إلحقوني.

## الكلمات

~~~words الصحة والطوارئ
der Sport | الرياضة | Ich mache gern Sport.
immer | دايمًا | Ich frühstücke immer.
oft | كتير | Ich gehe oft spazieren.
manchmal | ساعات | Manchmal trinke ich Kaffee.
nie | أبدًا | Ich rauche nie.
besser | أحسن | Mir geht es besser.
am besten | الأحسن | Am besten bleibst du im Bett.
der Notfall, die Notfälle | حالة طوارئ | Das ist ein Notfall!
der Krankenwagen, die Krankenwagen | الإسعاف | Ruf einen Krankenwagen!
die Polizei | البوليس | Die Polizei kommt sofort.
die Hilfe | المساعدة | Ich brauche Hilfe!
~~~

## كلمات زيادة: الحريقة

في الحريقة بتقول [[Feuer!]] وتتصل بـ ١١٢. و [[eilig]] = مستعجل: [[Ich habe es eilig]].

~~~words الحريقة
das Feuer | النار، الحريقة | m: Hilfe, Feuer!
eilig | مستعجل | Ich habe es eilig.
~~~

## تحكي حادثة حصلت (بالماضي)

بعد الحادثة الدكتور أو البوليس أو التأمين هيسألك: حصل إيه؟ فين؟ إمتى؟ والإجابة بالـ Perfekt اللي اتعلمته في وحدة الشغل، وأغلب أفعال الحركة بـ [[sein]].

~~~de Polizistin=f Mann=m
Polizistin: Was ist passiert? || حصل إيه؟
Mann: Ich bin mit dem Fahrrad gefahren. Ein Auto ist bei Rot gefahren. || كنت راكب العجلة. عربية عدّت الإشارة وهي حمرا.
Mann: Ich bin gefallen, und mein Arm tut weh. || وقعت، ودراعي بيوجعني.
Polizistin: Wo war das? || ده كان فين؟
Mann: Hier, an der Ampel, um acht Uhr. || هنا، عند الإشارة، الساعة ٨.
~~~

- [[Was ist passiert?]] = حصل إيه؟ ([[passieren]] بـ [[sein]]).
- [[Ich bin gefallen]] من [[fallen]] (يقع)، و [[Ich bin gefahren]] من [[fahren]]: الحركة بـ [[sein]].
- [[verletzt]] = متعوّر: [[Ist jemand verletzt?]] (فيه حد اتعوّر؟).

**وتاخد ملاحظات (Notizen):** لو حد بيحكيلك أو بتكلم التأمين، اكتب كلمات بس، مش جمل:

~~~text Notizen: Unfall
Was?    Fahrrad – Auto
Wo?     Ampel, Hauptstraße
Wann?   Montag, 8 Uhr
Wer?    Herr Lang (Arm verletzt)
~~~

الأسئلة الأربعة [[Was? Wo? Wann? Wer?]] بتكفي لأي ملاحظات: حادثة، أو ميعاد، أو رسالة تليفون.

~~~words الحادثة
der Unfall, die Unfälle | الحادثة | Ich hatte einen Unfall.
passieren | يحصل | m: Was ist passiert?
fallen | يقع | Das Kind ist gefallen.
verletzt | متعوّر | m: Zum Glück ist niemand verletzt.
die Notiz, die Notizen | الملاحظة | Ich mache mir Notizen.
~~~

## قول بصوتك

~~~speak
Wie oft machst du Sport? || بتعمل رياضة كام مرة؟
Ich esse mehr Obst und weniger Zucker. || باكل فاكهة أكتر وسكر أقل.
Danke, mir geht es schon viel besser. || شكرًا، بقيت أحسن بكتير.
Hilfe! Das ist ein Notfall! || إلحقوني! دي حالة طوارئ!
Ruf schnell einen Krankenwagen! || اتصل بالإسعاف بسرعة!
~~~

## سمع: كام مرة؟ وفين؟

~~~hear
f: Ich mache zweimal in der Woche Yoga, aber ich gehe nie joggen.
? Was macht die Frau nie? || الست عمرها ما بتعمل إيه؟
- Yoga
- joggen *
- schwimmen

m: Hallo, hier ist ein Notfall in der Schulstraße fünf. Eine Frau ist krank und kann nicht sprechen.
? Wo ist der Notfall? || الحالة فين؟
- in der Schulstraße fünf *
- in der Schulstraße fünfzehn
- in der Bergstraße fünf

f: Gestern war ich sehr krank. Heute geht es mir besser, aber am besten bleibe ich noch einen Tag zu Hause.
? Was macht die Frau heute? || الست هتعمل إيه النهارده؟
- Sie geht zur Arbeit.
- Sie bleibt zu Hause. *
- Sie geht zum Arzt.
~~~

## إملا

~~~dictate
Wie oft machst du Sport?
f: Mir geht es besser.
Das ist ein Notfall!
f: Ruf einen Krankenwagen!
~~~`,
          deep: {
            why: R`طلب الإسعاف وقول فين وإيه اللي حصل هدف بالاسم في منهج الاندماج، وممكن ينقذ حياة. والمقارنة ([[gut]]، [[besser]]؛ [[gern]]، [[lieber]]) والتكرار ([[oft]]، [[nie]]) في قايمة Goethe A1، وبتستخدمهم في Sprechen Teil 2 (أسئلة عن عاداتك).`,
            how: R`التكرار بعد الفعل: [[Ich rauche nie]]. والسؤال: [[Wie oft …?]]. والمقارنة الشاذة: [[gut]]/[[besser]]/[[am besten]]، [[viel]]/[[mehr]]، و [[weniger]] = أقل. والطوارئ: [[112]] ← فين، إيه اللي حصل، كام واحد، مين بيتكلم.`,
            when: R`[[Wie oft …?]] لما تسأل عن عادة. [[Am besten …]] لما تنصح حد. و [[112]] لأي حاجة خطيرة، و [[110]] للبوليس، و [[116 117]] لما محتاج دكتور بالليل والحاجة مش خطيرة.`,
            mistakes: R`- [[Ich nie rauche]]: الفعل في التاني ← [[Ich rauche nie]].
- [[gut ← guter]]: المقارنة شاذة ← [[besser]].
- [[mehr gut]]: ← [[besser]].
- في التليفون تقول اللي حصل الأول وتنسى العنوان: العنوان الأول.
- تقفل السكة قبل ما يقولولك: استنى.
- [[Ich habe nie Zeit für Sport]] صح، بس [[Ich habe keine Zeit]] = مفيش وقت النهارده، و [[nie]] = عمر ما.`
          },
          try: R`قول ٦ جمل عن عاداتك الصحية بكلمات التكرار (حاجة [[immer]]، وحاجة [[oft]]، وحاجة [[manchmal]]، وحاجة [[nie]])، وجملتين بـ [[mehr]]/[[weniger]]. وبعدين مثّل مكالمة ١١٢ لحادثة متخيّلة بالترتيب الصح.`,
          practice: [
            { lvl: 'سريع', t: R`**رتّب من الأكتر للأقل:** manchmal / immer / nie / oft / selten`,
              done: R`الترتيب صح ومعنى كل واحدة`,
              sol: R`**الترتيب:** immer ← oft ← manchmal ← selten ← nie.

**المعاني:** دايمًا، كتير، ساعات، نادرًا، أبدًا. و [[selten]] مش في قايمة A1 بس بتتقال كتير بين [[manchmal]] و [[nie]].` },
            { lvl: 'تطبيق', t: R`**besser ولا mehr ولا lieber؟** (١) Heute geht es mir ___ als gestern. (٢) Du sollst ___ Wasser trinken. (٣) Ich trinke ___ Tee als Kaffee. (٤) Was ist ___ für den Rücken: schwimmen oder joggen? (٥) Am ___ isst du viel Gemüse.`,
              done: R`الخمسة صح`,
              sol: R`~~~de
Heute geht es mir besser als gestern.
Du sollst mehr Wasser trinken.
Ich trinke lieber Tee als Kaffee.
Was ist besser für den Rücken: schwimmen oder joggen?
Am besten isst du viel Gemüse.
~~~

**ليه:** [[besser]] من [[gut]] (كويس). [[mehr]] من [[viel]] (كمية). [[lieber]] من [[gern]] (بحب). و [[als]] = من (في المقارنة): [[besser als gestern]] = أحسن من امبارح. و [[Am besten]] في الأول والفعل بعدها على طول.` },
            { lvl: 'تطبيق', t: R`**مكالمة ١١٢:** رتّب اللي هتقوله: (أ) Mein Name ist Karim Hassan. (ب) Ein Kind ist vom Fahrrad gefallen. (ج) In der Lindenstraße drei in Bonn. (د) Ein Kind ist verletzt. (هـ) Das Knie blutet sehr.`,
              done: R`العنوان الأول، وبعده اللي حصل، وبعده الإصابة، والاسم في الآخر`,
              sol: R`**الترتيب:** ج، ب، د، هـ، أ.

~~~de
In der Lindenstraße drei in Bonn.
Ein Kind ist vom Fahrrad gefallen.
Ein Kind ist verletzt.
Das Knie blutet sehr.
Mein Name ist Karim Hassan.
~~~

**ليه:** الأسئلة بتتسأل بالترتيب ده: فين، إيه اللي حصل، كام واحد ومتعوّر إزاي، مين بيتكلم. ولو المكالمة اتقطعت، أهم حاجة (العنوان) تكون وصلت. و [[ist … gefallen]] Perfekt بـ [[sein]] (حركة).` },
            { lvl: 'تحدي', t: R`**نصيحة لصاحب:** صاحبك بيقولك [[Ich bin immer müde und mein Rücken tut oft weh.]]. اكتب ٥ نصايح بـ [[Am besten …]] و [[mehr]]/[[weniger]] والأمر لـ [[du]]، ومنهم واحدة بـ [[nie]] أو [[immer]].`,
              done: R`٥ نصايح، فيهم [[Am besten]] بالفعل بعدها على طول، و [[mehr]] أو [[weniger]]، وأمر لـ [[du]]، وكلمة تكرار`,
              sol: R`~~~de
Am besten gehst du früher ins Bett.
Trink mehr Wasser und weniger Kaffee.
Mach jeden Tag zehn Minuten Sport.
Sitz nie den ganzen Tag am Computer.
Und geh zum Arzt, wenn es nicht besser wird!
~~~

**ليه كده:** [[Am besten gehst du …]]: بعد [[Am besten]] الفعل وبعده الفاعل. و [[Trink]] و [[Mach]] و [[Sitz]] و [[geh]] أمر لـ [[du]]. و [[wenn es nicht besser wird]] = لو مبقاش أحسن: جملة بـ [[wenn]] والفعل في آخرها، دي A2، خدها كده عشان طبيعية جدًا هنا.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Komparation (gern، lieber؛ gut، besser) و Häufigkeit (ص ٧٠ و ١٠٠)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: Gesundheit، طلب الإسعاف (8.2.6.1، ص ١٣٣)", url: "https://www.bamf.de/SharedDocs/Anlagen/DE/Integration/Integrationskurse/Kurstraeger/KonzepteLeitfaeden/rahmencurriculum-integrationskurs.pdf" },
            { t: "DWDS: Notfall", url: "https://www.dwds.de/wb/Notfall" },
            { t: "DWDS: besser", url: "https://www.dwds.de/wb/besser" },
            { t: "DWDS: manchmal", url: "https://www.dwds.de/wb/manchmal" },
          ],
        },
        {
          cmd: "Prüfung: Hören Teil 1, Lesen Teil 3, Sprechen Teil 3",
          title: "تدريب الامتحان: حوارات عند الدكتور، ويافطات العيادة، وطلبات",
          pre: ["dea1/Prüfung: Lesen Teil 1, Hören Teil 1", "dea1/Prüfung: Lesen Teil 2 und 3", "dea1/Prüfung: Sprechen Teil 2 und 3, Hören Teil 2"],
          desc: R`تلات أجزاء من الامتحان على موضوع الصحة: **Hören Teil 1** (حوارات قصيرة، كل واحد مرتين، واختيار من ٣)، و **Lesen Teil 3** (يافطات على عيادة وصيدلية: صح ولا غلط)، و **Sprechen Teil 3** (تطلب حاجة وترد).

الأجزاء دي اتدربت عليها قبل كده، والنهارده نفس الطريقة بكلمات الوحدة دي.`,
          teach: R`## Hören Teil 1: حوارات عند الدكتور

افتكر: اقرا السؤال والتلات اختيارات الأول، والتلاتة غالبًا بيتقالوا، والسمع التاني للتأكيد.

~~~hear Frau=f Mann=m Hören Teil 1
Frau: Wann haben Sie Zeit? Am Montag um neun?
Mann: Montag geht leider nicht. Geht es am Dienstag?
Frau: Ja, am Dienstag um halb zehn.
? Wann ist der Termin? || الميعاد إمتى؟
- am Montag um neun
- am Dienstag um neun
- am Dienstag um halb zehn *

Frau: Was haben Sie denn?
Mann: Ich habe Halsschmerzen. Fieber habe ich nicht, aber ich habe Husten.
? Was hat der Mann nicht? || الراجل معندوش إيه؟
- Halsschmerzen
- Fieber *
- Husten

Frau: Nehmen Sie die Tabletten morgens und abends.
Mann: Vor dem Essen?
Frau: Nein, immer nach dem Essen.
? Wie oft nimmt man die Tabletten? || بياخد الأقراص كام مرة؟
- einmal am Tag
- zweimal am Tag *
- dreimal am Tag

Mann: Wo ist hier eine Apotheke?
Frau: Gleich hier links, neben der Bank. Die Apotheke am Bahnhof ist heute geschlossen.
? Wo ist die Apotheke offen? || الصيدلية المفتوحة فين؟
- neben der Bank *
- am Bahnhof
- rechts
~~~

**الفخاخ:** (١) يومين وساعتين اتقالوا، والميعاد بعد التصحيح. (٢) [[Fieber habe ich nicht]]: الفاعل بعد الفعل، و [[nicht]] في الآخر. (٣) [[morgens und abends]] = مرتين، و «قبل الأكل» اتنفت. (٤) فيه صيدليتين، وواحدة مقفولة.

## Lesen Teil 3: يافطات العيادة والصيدلية

~~~read Lesen Teil 3
An der Tür einer Zahnarztpraxis || على باب عيادة أسنان
Montag bis Freitag 8–13 Uhr. Dienstag und Donnerstag auch 15–19 Uhr. || الاتنين للجمعة ٨–١، والتلات والخميس كمان ٣–٧
? Am Dienstag kann man um siebzehn Uhr zum Zahnarzt gehen. || يوم التلات ممكن تروح الساعة ٥
- Richtig *
- Falsch
In der Apotheke || في الصيدلية
Notdienst heute: Stern-Apotheke, Bahnhofstraße 4, bis 8 Uhr morgens. || صيدلية النبطشية النهارده: ...، لحد ٨ الصبح
? Heute Nacht ist die Stern-Apotheke offen. || الليلة صيدلية شتيرن مفتوحة
- Richtig *
- Falsch
Im Wartezimmer || في أوضة الانتظار
Bitte schalten Sie Ihr Handy aus. Danke! || اقفل الموبايل لو سمحت. شكرًا!
? Im Wartezimmer darf man telefonieren. || في أوضة الانتظار مسموح تتكلم في التليفون
- Richtig
- Falsch *
Am Krankenhaus || عند المستشفى
Besuchszeit: täglich 14–18 Uhr. Kinder unter 12 Jahren nur mit Erwachsenen. || الزيارة: كل يوم ٢–٦. العيال تحت ١٢ مع كبار بس
? Ein Kind mit acht Jahren kann allein Besuch machen. || عيل عنده ٨ سنين يقدر يزور لوحده
- Richtig
- Falsch *
~~~

**ليه الإجابات كده:** (١) التلات فيه ١٥–١٩، و ١٧ جواها. (٢) [[Notdienst]] لحد ٨ الصبح، يعني طول الليل. (٣) [[Handy ausschalten]] = تقفل الموبايل، يعني متتكلمش. (٤) تحت ١٢ مع كبار بس.

## Sprechen Teil 3: طلبات في العيادة

| الصورة | الطلب | الرد |
|---|---|---|
| ميزان حرارة | [[Haben Sie ein Fieberthermometer für mich?]] | [[Ja, hier, bitte.]] |
| كوباية مية | [[Ein Glas Wasser, bitte!]] | [[Gern.]] |
| ورقة وقلم | [[Geben Sie mir bitte einen Kuli.]] | [[Bitte schön.]] |
| شباك | [[Können Sie bitte das Fenster aufmachen?]] | [[Ja, natürlich.]] |
| مناديل | [[Ein Taschentuch, bitte!]] | [[Hier, bitte.]] |

**افتكر:** طلب، مش سؤال معلومة: [[Gibt es hier Wasser?]] سؤال معلومة، و [[Ein Glas Wasser, bitte!]] طلب.

## صحّح نفسك بموديل AI

~~~prompt طلب تصحيح: Goethe A1، Sprechen Teil 3 (Thema Gesundheit)
Du bist Prüfer für das Goethe-Zertifikat A1 (Start Deutsch 1), Sprechen Teil 3.
Ich habe zu Bildkarten (Thema: beim Arzt, in der Apotheke) Bitten formuliert und auf Bitten reagiert.
Pro Bitte maximal 2 Punkte, pro Reaktion maximal 1 Punkt. Eine Frage nach Information statt einer Bitte zählt nicht als Bitte.
Volle Punktzahl: verständlich und passend. Halbe Punktzahl: verständlich, aber mit Mängeln. 0: unverständlich oder nicht passend.
Antworte auf Ägyptisch-Arabisch, deutsche Wörter auf Deutsch. Gib Punkte mit Grund, korrigiere jeden Fehler in einem Satz und zeig eine bessere Version nur mit A1-Wörtern.
Meine Sätze:
~~~`,
          deep: {
            why: R`الصحة موضوع ثابت في امتحانات A1: مواعيد العيادات في Hören و Lesen، وطلبات في Sprechen Teil 3. والأجزاء التلاتة دي مع بعض ١٠ نقط في السمع والقراية و ٦ في الكلام. والتكرار على مواضيع مختلفة هو اللي بيخلّي الطريقة أوتوماتيك يوم الامتحان.`,
            how: R`Hören Teil 1: السؤال والاختيارات قبل الصوت، والتصحيح ([[nicht …]]، [[Nein, …]]) بيغيّر الإجابة. Lesen Teil 3: المكان ← الجملة ← ترجم اليافطة لجملة بـ [[man]]. Sprechen Teil 3: الحاجة + [[bitte]] أو [[Können Sie …?]]، والرد [[Ja, gern]].`,
            when: R`بعد كل وحدة، اعمل جولة سريعة: ٤ حوارات، و ٤ يافطات، و ٤ طلبات على موضوعها. وقبل الامتحان بأسبوعين، Übungssatz 01 و 02 كاملين بالوقت.`,
            mistakes: R`- تختار أول ميعاد اتقال: الميعاد اللي بعد التصحيح هو الصح.
- [[morgens und abends]] تفهمها مرة: دي مرتين.
- في اليافطة تتلخبط بين الأيام: اقرا كل يوم ومواعيده لوحده.
- [[Notdienst]] تفهمها «مقفول»: معناها مفتوح بالليل.
- في Sprechen Teil 3 تسأل [[Haben Sie Wasser?]]: الأحسن [[Ein Glas Wasser, bitte!]]
- تنسى الرد لما زميلك يطلب منك: الرد عليه نقطة.`
          },
          try: R`حل الحوارات الأربعة واليافطات الأربعة من غير ما تفتح النص أو الترجمة، واكتب نوع الفخ في كل غلط. وبعدين قول طلبات الجدول الخمسة بصوتك وصحّحها بالطلب الجاهز.`,
          practice: [
            { lvl: 'سريع', t: R`**طلب ولا سؤال؟** أنهي دول طلب هياخد درجة Teil 3؟ (١) [[Gibt es hier Tabletten?]] (٢) [[Die Tabletten, bitte!]] (٣) [[Wo ist das Wartezimmer?]] (٤) [[Können Sie mir bitte das Rezept geben?]] (٥) [[Haben Sie Zeit?]]`,
              done: R`(٢) و (٤) بس، وعارف ليه التلاتة التانيين لأ`,
              sol: R`**(٢) و (٤) بس.**

**ليه:** (١) و (٣) أسئلة معلومة (فيه؟ فين؟)، و (٥) سؤال مالوش علاقة بحاجة في صورة. أما (٢) الحاجة + [[bitte]]، و (٤) [[Können Sie mir bitte … geben?]]: طلبين واضحين.` },
            { lvl: 'تطبيق', t: R`**يافطة زيادة:**

~~~read
An der Tür der Praxis
Praxis vom 5. bis 16. August geschlossen. Vertretung: Dr. Weber, Marktplatz 2.
? Am zehnten August kann man zu Dr. Weber gehen.
- Richtig *
- Falsch
? Die Praxis ist im August drei Wochen zu.
- Richtig
- Falsch *
~~~`,
              done: R`الاتنين صح، وعارف يعني إيه [[Vertretung]]`,
              sol: R`**الإجابات:** Richtig، Falsch.

**ليه:** (١) العيادة مقفولة من ٥ لـ ١٦، و [[Vertretung]] = الدكتور اللي بيغطّي مكانه (Dr. Weber)، فيوم ١٠ تروحله. (٢) من ٥ لـ ١٦ = حوالي أسبوعين مش ٣. ويافطات الأجازة دي ([[Urlaub]]، [[Vertretung]]) منتشرة جدًا على العيادات في الصيف.` },
            { lvl: 'تطبيق', t: R`**حوار زيادة (مرتين بس):**

~~~hear Frau=f Mann=m
Mann: Wie geht es Ihrem Sohn?
Frau: Besser, danke. Er hat kein Fieber mehr. Aber er hustet noch ein bisschen.
? Was hat der Sohn noch? || الابن لسه عنده إيه؟
- Fieber
- Husten *
- Kopfschmerzen
~~~`,
              done: R`صح من أول أو تاني سمع`,
              sol: R`**الإجابة:** Husten.

**ليه:** [[kein Fieber mehr]] = السخونية راحت. و [[er hustet noch]] = لسه بيكح ([[husten]] الفعل، و [[der Husten]] الاسم). و [[Wie geht es Ihrem Sohn?]]: [[Ihrem]] Dativ بعد [[es geht]].` },
            { lvl: 'تحدي', t: R`**اعمل جولة Hören Teil 1:** اكتب ٣ حوارات قصيرة (٢–٣ سطور) عن الصحة، ولكل واحد سؤال و ٣ اختيارات، والتلات اختيارات **كلهم** يتقالوا في الحوار وواحد بس صح.`,
              done: R`٣ حوارات، وكل حوار فيه التلات اختيارات مذكورين، والفرق بتصحيح أو نفي`,
              sol: R`**نموذج لحوار واحد:**

~~~hear Frau=f Mann=m
Frau: Kommen Sie am Mittwoch oder am Donnerstag?
Mann: Am Mittwoch arbeite ich. Donnerstag geht auch nicht. Ich komme am Freitag.
? Wann kommt der Mann? || الراجل جاي إمتى؟
- am Mittwoch
- am Donnerstag
- am Freitag *
~~~

**ليه ده سؤال كويس:** التلات أيام اتقالوا، واليومين الأولانيين اتنفوا بطريقتين مختلفتين ([[arbeite ich]] سبب، و [[geht auch nicht]] نفي). ولو اكتفيت بسمعة واحدة سريعة ممكن تمسك [[Mittwoch]] أو [[Donnerstag]]. وكده بالظبط بيعمل Goethe.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Hören Teil 1 (ص ٢٧)، و Lesen Teil 3 (ص ٣٢)، و Sprechen Teil 3 (ص ٤٤)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Goethe-Zertifikat A1: Übungssatz 01 (امتحان تجريبي رسمي ببلاش)", url: "https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_uebungssatz01.pdf" },
            { t: "DWDS: Notdienst", url: "https://www.dwds.de/wb/Notdienst" },
            { t: "DWDS: Vertretung", url: "https://www.dwds.de/wb/Vertretung" },
          ],
        },
      ],
    },
]);

MORE("dea1", [
    {
      t: "الأكل والشرب والتسوق (Essen, Trinken, Einkaufen)",
      l: 1,
      pre: ["dea1/Die Zahlen 0–100"],
      n: R`بتحب تاكل وتشرب إيه، وإزاي تطلب في المخبز والكافيه والمطعم، وتلاقي حاجتك في السوبرماركت، وتسأل عن السعر وتدفع. وهنا أول قاعدة كبيرة في الألماني: الـ **Akkusativ** ([[Ich möchte einen Kaffee]])، ومعاها [[kein]]. والوحدة بتنتهي بجزئين الكلام التاني والتالت في Goethe (تسأل وتجاوب، وتطلب حاجة)، وإعلانات السوبرماركت في السمع.`,
      goal: [R`تقول بتحب تاكل وتشرب إيه وبتحبه أكتر ([[Ich esse gern Fisch]]، [[Ich trinke lieber Tee]])`, R`تطلب في المخبز والكافيه بـ [[Ich möchte]] و [[Ich hätte gern]] و [[Ich nehme]]، وتعرف إمتى [[einen]] وإمتى [[eine]] و [[ein]]`, R`تسأل في السوبرماركت عن حاجة، وتقول «مفيش» بـ [[kein]] وتفرّقه عن [[nicht]]`, R`تسأل عن السعر وتقوله وتفهمه ([[zwei Euro neunundvierzig]])، وتطلب كمية ([[ein Kilo]]، [[200 Gramm]])، وتدفع كاش أو بالكارت`, R`تطلب في المطعم وتدفع، وتعرف [[zusammen oder getrennt]] والبقشيش`, R`تحل Sprechen Teil 2 و Teil 3 و Hören Teil 2 بالمعايير`],
      time: "حوالي ٩ ساعات",
      projects: [
        { lvl: 'صغير', t: R`التلاجة وورقة الطلبات`, what: R`افتح تلاجتك (أو تخيّلها) واكتب ٥ جمل باللي فيها ([[Ich habe noch Milch]]) و ٣ جمل باللي خلص ([[Ich habe keinen Käse mehr]]). وبعدين اكتب ورقة طلبات (Einkaufszettel) بالكميات.`,
          done: R`٥ جمل بحاجات موجودة، و ٣ بـ [[kein … mehr]] والأداة صح ([[keinen]] / [[keine]] / [[kein]])، وورقة طلبات فيها ٥ حاجات بكمياتها`,
          sol: R`**نسخة نموذجية:**

~~~de
Ich habe noch Milch und Butter.
Ich habe noch drei Eier.
Ich habe noch Tomaten und Käse.
Ich habe keinen Reis mehr.
Ich habe keine Kartoffeln mehr.
Ich habe kein Brot mehr.
~~~

~~~text Einkaufszettel
1 kg Reis
2 kg Kartoffeln
1 Brot
6 Eier
1 l Milch
~~~

**ليه كده:** [[der Reis]] مذكر، فـ [[keinen Reis]]. و [[Kartoffeln]] جمع، فـ [[keine]]. و [[das Brot]] محايد، فـ [[kein Brot]]. و [[mehr]] بعد [[kein]] معناها «خلاص مبقاش فيه». وفي ورقة الطلبات الألمان بيكتبوا [[kg]] و [[l]] مختصرة، وبيقروها [[Kilo]] و [[Liter]].` },
        { lvl: 'صغير', t: R`منيو كافيه بالأسعار`, what: R`اعمل منيو لكافيه متخيّل: ٤ مشروبات و ٤ أكلات بالأسعار (بالشكل الألماني [[2,80 €]])، وبعدين قول كل سعر بصوت عالي وسجّله.`,
          done: R`٨ حاجات بالأسعار مكتوبة بفاصلة مش نقطة، وكل سعر اتقال صح ([[zwei Euro achtzig]])`,
          sol: R`**نسخة نموذجية:**

~~~text Café Mond
Getränke
Kaffee ........... 2,80 €
Tee .............. 2,20 €
Orangensaft ...... 3,50 €
Wasser ........... 1,90 €

Essen
Brötchen mit Käse  3,20 €
Kuchen ........... 3,90 €
Suppe ............ 5,50 €
Salat ............ 7,80 €
~~~

~~~de
Der Kaffee kostet zwei Euro achtzig.
Der Orangensaft kostet drei Euro fünfzig.
Die Suppe kostet fünf Euro fünfzig.
Der Salat kostet sieben Euro achtzig.
~~~

**ليه كده:** في ألمانيا السعر بفاصلة ([[2,80 €]]) والعملة بعد الرقم. وبيتقال: اليورو، وبعدين السنتات من غير كلمة [[Cent]]. وكلمة [[Euro]] مبتتجمعش: [[zwei Euro]] مش «Euros».` },
        { lvl: 'متوسط', t: R`في المخبز وفي السوق: سجّل الدورين`, what: R`اكتب حوارين (٦–٨ سطور كل واحد): واحد في المخبز (عيش وكيكة وقهوة، [[für hier oder zum Mitnehmen]])، وواحد في السوق (كيلو ونص كيلو، وسؤال عن السعر). وبعدين سجّل نفسك بالدورين.`,
          done: R`الحوارين فيهم [[Ich möchte]] أو [[Ich hätte gern]]، وكمية، وسؤال عن السعر، والسعر الإجمالي صح بالحساب، و [[einen]] في مكانها`,
          sol: R`**نسخة نموذجية:**

~~~de Verkäuferin=f Kunde=m
Verkäuferin: Guten Morgen! Was darf es sein? || صباح الخير! تحب تاخد إيه؟
Kunde: Guten Morgen! Ich möchte drei Brötchen und einen Kaffee, bitte. || صباح الخير! عايز ٣ عيش وقهوة لو سمحتي.
Verkäuferin: Für hier oder zum Mitnehmen? || هنا ولا تيك أواي؟
Kunde: Zum Mitnehmen, bitte. Was kostet der Kuchen? || تيك أواي. الكيكة بكام؟
Verkäuferin: Ein Stück kostet zwei Euro fünfzig. || الحتة باتنين يورو ونص.
Kunde: Dann nehme ich ein Stück. || خلاص هاخد حتة.
Verkäuferin: Das macht sechs Euro achtzig. || كده ستة يورو وتمانين.
~~~

~~~de Verkäufer=m Kundin=f
Verkäufer: Guten Tag! Was möchten Sie? || أهلًا! عايزة إيه؟
Kundin: Ich hätte gern ein Kilo Tomaten. Was kosten die Äpfel? || عايزة كيلو طماطم. التفاح بكام؟
Verkäufer: Das Kilo kostet drei Euro. || الكيلو بتلاتة يورو.
Kundin: Dann ein halbes Kilo Äpfel, bitte. || يبقى نص كيلو تفاح لو سمحت.
Verkäufer: Noch etwas? || حاجة تانية؟
Kundin: Nein, danke. Das ist alles. || لأ شكرًا. كده بس.
Verkäufer: Die Tomaten zwei Euro fünfzig, die Äpfel ein Euro fünfzig. Das macht vier Euro. || الطماطم ٢٫٥٠ والتفاح ١٫٥٠. كده ٤ يورو.
~~~

**ليه كده:** [[einen Kaffee]] لأن [[der Kaffee]] مذكر وجاي بعد [[möchte]]. و [[ein Stück]] و [[ein Kilo]] و [[ein halbes Kilo]] محايد فمفيش تغيير. والحساب: العيش والقهوة ٤٫٣٠ (سعر متخيّل) + الكيكة ٢٫٥٠ = ٦٫٨٠، والطماطم ٢٫٥٠ + نص كيلو تفاح ١٫٥٠ = ٤.` },
        { lvl: 'متوسط', t: R`عشا في مطعم، والحساب منفصل`, what: R`اكتب حوار مطعم (١٠–١٢ سطر) لاتنين صحاب: يطلبوا مشروب وأكل، والجرسون يسأل الأكل عامل إيه، وبعدين يطلبوا الحساب منفصل، وكل واحد يدفع بالبقشيش.`,
          done: R`الحوار فيه طلب مشروب وأكل، و [[Schmeckt es?]]، و [[getrennt]]، وكل واحد بيقول المبلغ اللي هيدفعه بالبقشيش أو [[Stimmt so]]`,
          sol: R`**نسخة نموذجية:**

~~~de Kellner=m Omar=m Mona=f
Kellner: Guten Abend! Was möchten Sie trinken? || مساء الخير! تحبوا تشربوا إيه؟
Omar: Ein Wasser, bitte. || مية لو سمحت.
Mona: Und für mich einen Apfelsaft. || وأنا عصير تفاح.
Kellner: Und was möchten Sie essen? || وتحبوا تاكلوا إيه؟
Omar: Ich nehme den Fisch mit Reis. || هاخد السمك بالرز.
Mona: Ich hätte gern die Suppe und einen Salat. || أنا عايزة الشوربة وسلطة.
Kellner: Schmeckt es Ihnen? || الأكل عاجبكم؟
Mona: Ja, sehr gut, danke! || آه، حلو جدًا، شكرًا!
Omar: Wir möchten bitte zahlen. || عايزين ندفع لو سمحت.
Kellner: Zusammen oder getrennt? || مع بعض ولا كل واحد لوحده؟
Omar: Getrennt, bitte. || كل واحد لوحده.
Kellner: Der Fisch und das Wasser: sechzehn Euro zwanzig. || السمك والمية: ١٦٫٢٠.
Omar: Achtzehn, bitte. || خليهم ١٨.
Kellner: Danke schön! Und Sie? || شكرًا! وحضرتك؟
Mona: Hier sind zwölf Euro. Stimmt so. || اتفضل ١٢ يورو. خلّي الباقي.
~~~

**ليه كده:** [[für mich]] = «ليّا» (Akkusativ بعد [[für]]). و [[den Fisch]] لأن [[der Fisch]] مذكر ومفعول. والبقشيش في ألمانيا بيتقال مع الدفع: بتقول المبلغ كله ([[Achtzehn, bitte]]) أو تدّي فلوس وتقول [[Stimmt so]] (خلّي الباقي). ومش بتسيبه على الترابيزة زي ناس كتير في مصر.` },
        { lvl: 'كبير', t: R`امتحان Sprechen Teil 2 و Teil 3 بالكروت`, what: R`اكتب ٦ كروت كلمات (موضوع «Essen und Trinken») و ٦ كروت صور (ارسم أو اكتب اسم الحاجة)، واقلبهم. لكل كارت كلمات: اسأل سؤال بصوت عالي وجاوبه. ولكل كارت صورة: اطلب الحاجة ورد على الطلب. سجّل كله، وصحّح بالمعايير (٦ + ٦).`,
          done: R`١٢ كارت، وكل سؤال سؤال حقيقي بفعل (مش كلمة بس)، وكل طلب طلب مش سؤال معلومة، و ١٠ من ١٢ على الأقل في التصحيح`,
          sol: R`**كروت الكلمات (Teil 2) بأسئلة وإجابات نموذجية:**

~~~de
Was isst du zum Frühstück? Ich esse Brot mit Käse. || كارت Frühstück
Was trinkst du gern? Ich trinke gern Tee. || كارت Getränk
Isst du gern Obst? Ja, ich esse gern Bananen. || كارت Obst
Kochst du gern? Nein, nicht so gern. || كارت Kochen
Wann kaufst du ein? Am Samstag. || كارت Supermarkt
Gehst du oft ins Restaurant? Nein, nur am Wochenende. || كارت Restaurant
~~~

**كروت الصور (Teil 3) بطلبات وردود:**

~~~de
Ein Glas Wasser, bitte! Ja, gern. Hier, bitte. || صورة كوباية مية
Gib mir bitte das Salz! Hier, bitte. || صورة ملح
Können Sie mir bitte die Speisekarte geben? Ja, natürlich. || صورة منيو
Ich möchte bitte ein Brot. Tut mir leid, ich habe kein Brot. || صورة عيش
Einen Kaffee, bitte! Gern. || صورة قهوة
Gib mir bitte einen Apfel! Bitte schön. || صورة تفاحة
~~~

**إزاي تصحح:** في Teil 2 كل سؤال ٢ وكل إجابة ١، وفي Teil 3 كل طلب ٢ وكل رد ١. ولو السؤال أو الطلب مفهوم بس فيه غلط بيلخبط شوية، النص. ولو مش مفهوم، صفر. **الكلمة لوحدها بنبرة سؤال ([[Frühstück?]]) مش سؤال.**` },
        { lvl: 'فكرة', t: R`اقرا كتالوج سوبرماركت ألماني حقيقي`, what: R`ادخل على موقع أي سوبرماركت ألماني واكتب في البحث [[Prospekt]] أو [[Angebote]] (عروض الأسبوع). طلّع ١٠ حاجات تعرفها بأسعارها وكمياتها، واكتب لكل واحدة جملة ([[Ein Kilo Äpfel kostet …]]). وقارن ٣ منهم بسعرهم عندك في مصر.`,
          done: R`١٠ حاجات بالسعر والكمية والأداة، و ١٠ جمل بـ [[kostet]] أو [[kosten]] صح، و ٣ مقارنات`,
          sol: R`**نسخة نموذجية** (الأسعار هنا للتوضيح، كل أسبوع بتتغيّر):

~~~de
Ein Kilo Bananen kostet ein Euro neunundneunzig.
Die Butter kostet zwei Euro neunundzwanzig.
Sechs Eier kosten zwei Euro neunundvierzig.
Ein Liter Milch kostet ein Euro neunzehn.
~~~

**كلمات هتشوفها في أي كتالوج:** [[Angebot]] (عرض)، [[statt]] (بدل: السعر القديم)، [[je]] (للواحدة)، [[Stück]] (حتة)، [[Packung]] (علبة)، [[1 kg = 2,49 €]] (سعر الكيلو مكتوب جنب كل حاجة بالقانون). آخر ٣ مش في قايمة A1 بس هتقابلهم كل يوم.

**ليه كده:** ده هدف في منهج الاندماج (7.1.1.2: يطلّع معلومات من إعلانات الجرايد والكتالوجات). وخلي بالك: [[kostet]] لما الفاعل مفرد ([[ein Kilo]]، [[die Butter]])، و [[kosten]] لما جمع ([[sechs Eier]]).` },
      ],
      items: [
        {
          cmd: "Ich esse gern Fisch",
          title: "بتحب تاكل إيه؟ الأكل والشرب، و gern و lieber",
          desc: R`أكتر سؤال هتسمعه في أول أسبوع مع ناس جديدة: [[Was isst du gern?]] (بتحب تاكل إيه؟). والإجابة سهلة: فعل + [[gern]]: [[Ich esse gern Fisch]]، و [[Ich trinke nicht gern Kaffee]].

وفيه حاجتين لازم تاخد بالك منهم من أول يوم: [[essen]] بيتغيّر مع [[du]] و [[er]] ([[du isst]]، [[er isst]])، والأكل بشكل عام بيتقال **من غير أداة**: [[Ich esse gern Fisch]] مش «den Fisch».`,
          teach: R`## الموقف

أول يوم في الكورس، وفي البريك زميلتك بتسألك بتحب تاكل إيه. (Goethe: موضوع «Essen und Trinken»، و CEFR A1: يقول بيحب إيه ومبيحبش إيه.)

~~~de Lea=f Sami=m
Lea: Was isst du gern? || بتحب تاكل إيه؟
Sami: Ich esse gern Fisch und Reis. Und du? || بحب السمك والرز. وإنتي؟
Lea: Ich esse gern Gemüse. Fleisch esse ich nicht so gern. || بحب الخضار. اللحمة مش أوي.
Sami: Und was trinkst du gern? || وبتحبي تشربي إيه؟
Lea: Kaffee. Und du? || قهوة. وإنت؟
Sami: Ich trinke lieber Tee. || أنا بحب الشاي أكتر.
~~~

## essen و trinken

| | [[essen]] (ياكل) | [[trinken]] (يشرب) |
|---|---|---|
| [[ich]] | [[esse]] | [[trinke]] |
| [[du]] | [[isst]] ⚠ | [[trinkst]] |
| [[er]] / [[sie]] / [[es]] | [[isst]] ⚠ | [[trinkt]] |
| [[wir]] | [[essen]] | [[trinken]] |
| [[ihr]] | [[esst]] | [[trinkt]] |
| [[sie]] / [[Sie]] | [[essen]] | [[trinken]] |

- [[trinken]] عادي زي [[wohnen]].
- [[essen]] الـ **e بتبقى i** مع [[du]] و [[er]]: [[du isst]] و [[er isst]] (بـ [[ss]] الاتنين، ونفس الكلمة).
- [[ihr esst]]: الـ e بترجع، يعني التغيير بس مع [[du]] و [[er/sie/es]]. وده نفس اللي هتشوفه في [[nehmen]] الدرس الجاي.

## gern: بحب أعمل كذا

[[gern]] بعد الفعل، و [[nicht gern]] للعكس:

~~~de
Ich esse gern Reis. || بحب آكل رز.
Ich trinke gern Tee. || بحب أشرب شاي.
Ich esse nicht gern Fleisch. || مبحبش آكل لحمة.
Isst du gern Fisch? || بتحب تاكل سمك؟
~~~

وعشان تقارن: [[gern]] ← [[lieber]] (أكتر) ← [[am liebsten]] (أكتر حاجة):

~~~de
Ich trinke gern Kaffee. || بحب القهوة.
Ich trinke lieber Tee. || بحب الشاي أكتر.
Am liebsten trinke ich Saft. || أكتر حاجة بحبها العصير.
~~~

ولما الجملة بتبدأ بـ [[Am liebsten]]، الفعل بييجي على طول بعدها (المكان التاني)، زي [[Am Montag habe ich…]].

## mögen: بحب (الحاجة نفسها)

[[mögen]] بتاخد الحاجة على طول من غير فعل تاني:

| [[ich mag]] | [[du magst]] | [[er/sie mag]] | [[wir mögen]] | [[Sie mögen]] |
|---|---|---|---|---|

~~~de
Ich mag Kaffee. || بحب القهوة.
Magst du Fisch? || بتحب السمك؟
Sie mag Schokolade. || هي بتحب الشوكولاتة.
~~~

- [[ich mag]] و [[er mag]] **نفس الشكل** ومن غير [[-t]] في [[er]].
- [[Ich esse gern Fisch]] و [[Ich mag Fisch]] تقريبًا نفس المعنى. والأسهل في الأول: [[gern]] مع أي فعل.

## من غير أداة: Ich esse gern Fisch

لما بتتكلم عن الأكل **بشكل عام** (مش حاجة معينة قدامك)، مفيش أداة خالص:

~~~de
Ich esse gern Fisch. || بحب السمك (أي سمك).
Ich trinke Wasser. || بشرب مية.
Zum Frühstück esse ich Brot mit Käse. || على الفطار باكل عيش بالجبنة.
~~~

وده زي العربي في «بحب **ال**سمك»؟ لأ: العربي بيحط «ال»، والألماني لأ. فـ [[Ich esse gern den Fisch]] معناها السمكة المعينة دي، مش السمك عمومًا. (Goethe: «Nullartikel: Ich esse gern Fleisch».)

## الوجبات

~~~de
das Frühstück: Zum Frühstück trinke ich Tee. || الفطار: على الفطار بشرب شاي.
das Mittagessen: Zum Mittagessen esse ich Reis. || الغدا: على الغدا باكل رز.
das Abendessen: Zum Abendessen esse ich Brot. || العشا: على العشا باكل عيش.
~~~

[[zum]] + الوجبة = «على الـ…». وفي ألمانيا الغدا الساعة ١٢ أو ١ (مش ٤ زي مصر)، والعشا غالبًا عيش وجبنة وحاجات باردة ([[Abendbrot]]).

## الكلمات: أكل

~~~words أكل
das Brot, die Brote | العيش (الرغيف) | Ich esse Brot mit Käse.
das Brötchen, die Brötchen | عيش صغير (الفينو الألماني) | Zum Frühstück esse ich zwei Brötchen.
die Butter | الزبدة | Ich esse Brot mit Butter.
der Käse | الجبنة | Der Käse ist gut.
das Ei, die Eier | البيضة | Ich esse ein Ei.
das Fleisch | اللحمة | Ich esse nicht gern Fleisch.
das Hähnchen, die Hähnchen | الفراخ | Ich esse gern Hähnchen mit Reis.
der Fisch, die Fische | السمك | Isst du gern Fisch?
der Reis | الرز | Wir essen oft Reis.
die Kartoffel, die Kartoffeln | البطاطس | Ich esse gern Kartoffeln.
das Gemüse | الخضار | Gemüse ist gesund.
das Obst | الفاكهة | Ich esse viel Obst.
der Apfel, die Äpfel | التفاحة | Der Apfel ist rot.
die Banane, die Bananen | الموزة | Ich esse eine Banane.
die Tomate, die Tomaten | الطماطماية | Ich brauche Tomaten.
der Salat, die Salate | السلطة | Der Salat ist frisch.
die Suppe, die Suppen | الشوربة | Die Suppe ist heiß.
der Kuchen, die Kuchen | الكيكة | Der Kuchen ist sehr gut.
~~~

## الكلمات: شرب ووجبات

~~~words شرب ووجبات
das Wasser | المية | Ich trinke viel Wasser.
der Kaffee | القهوة | Trinkst du Kaffee?
der Tee | الشاي | Ich trinke lieber Tee.
die Milch | اللبن | Ich trinke Kaffee mit Milch.
der Saft, die Säfte | العصير | Am liebsten trinke ich Saft.
das Bier | البيرة | Er trinkt kein Bier.
der Wein | النبيت | Ich trinke keinen Wein.
das Getränk, die Getränke | المشروب | Was ist dein Lieblingsgetränk?
das Frühstück | الفطار | Das Frühstück ist um sieben Uhr.
essen | ياكل (du isst، er isst) | Was isst du gern?
trinken | يشرب | Ich trinke gern Tee.
mögen | يحب (ich mag، du magst) | Magst du Fisch?
gern | بحب (أعمل كذا) | Ich koche gern.
lieber | أحسن، بحب أكتر | Ich trinke lieber Wasser.
der Hunger | الجوع | Ich habe Hunger.
der Durst | العطش | Hast du auch Durst?
~~~

## كلمات زيادة: أكل وطعم

[[riechen]] بتستخدمها للحاجة اللي ريحتها: [[Das riecht gut!]] = ريحته حلوة. و [[bitter]] = مر.

~~~words أكل وطعم
die Birne, die Birnen | الكمترى | m: Ich esse gern Birnen.
der Schinken, die Schinken | لحم مدخّن (جامبون) | m: Ich esse keinen Schinken.
bitter | مر | Der Kaffee ist bitter.
riechen | يشم، ريحته | Das riecht gut!
~~~

[[Ich habe Hunger]] = أنا جعان (حرفيًا «عندي جوع»)، زي [[Ich habe Zeit]]. ومتقولش [[Ich bin hungrig]] في الأول: صح، بس أقل استخدام في الكلام.

## مقارنة بالعربي: أكلنا بالألماني

مفيش كلمة ألماني لـ «فول» أو «كشري»، فبتقول الاسم وتشرحه بكلمات بتعرفها:

~~~de
Mein Lieblingsessen ist Koschari. || أكلتي المفضلة الكشري.
Das ist Reis mit Nudeln und Linsen. || ده رز بمكرونة وعدس.
Zum Frühstück esse ich oft Ful. || على الفطار باكل فول كتير.
~~~

[[Lieblings-]] قبل أي اسم = «المفضّل»: [[Lieblingsessen]] و [[Lieblingsgetränk]]. وكلمة مركّبة من كلمتين بتعرفهم، والأداة بتاعة الكلمة الأخيرة ([[das Essen]] ← [[das Lieblingsessen]]).

## قول بصوتك

~~~speak
Was isst du gern? || بتحب تاكل إيه؟
Ich esse gern Hähnchen mit Reis. || بحب الفراخ بالرز.
Ich trinke lieber Tee. || بحب الشاي أكتر.
Er isst nicht gern Fisch. || هو مبيحبش السمك.
Ich habe Durst. || أنا عطشان.
~~~

## سمع: بيحبوا إيه؟

~~~hear
f: Ich esse gern Obst, aber Fleisch esse ich nicht gern.
? Was isst sie nicht gern? || هي مبتحبش تاكل إيه؟
- Obst
- Fleisch *
- Fisch

m: Ich trinke gern Kaffee. Aber am liebsten trinke ich Tee.
? Was trinkt er am liebsten? || بيحب يشرب إيه أكتر حاجة؟
- Tee *
- Kaffee
- Wasser

f: Zum Frühstück esse ich ein Brötchen mit Butter und trinke Milch.
? Was trinkt sie zum Frühstück? || بتشرب إيه على الفطار؟
- Kaffee
- Saft
- Milch *
~~~

## إملا

~~~dictate
Ich esse gern Fisch.
f: Was trinkst du gern?
Er isst nicht gern Gemüse.
Ich habe Hunger.
~~~`,
          deep: {
            why: R`الأكل من أول المواضيع في أي امتحان A1: في Goethe «Essen und Trinken» موضوع ثابت في Sprechen Teil 2، وفي ÖSD من المواضيع اللي بتختار منها وإنت بتعرّف نفسك. وفي الحياة: الكانتين والعزومة والسوبرماركت كل يوم.`,
            how: R`فعل + [[gern]] ([[Ich esse gern …]])، والعكس [[nicht gern]]، والمقارنة [[lieber]] و [[am liebsten]]. والأكل عمومًا من غير أداة. و [[essen]]: [[du isst]] و [[er isst]]. و [[mögen]]: [[ich mag]] و [[er mag]] نفس الشكل.`,
            when: R`[[gern]] مع أي فعل ([[Ich koche gern]]، [[Ich lese gern]]). و [[mögen]] مع الحاجة على طول ([[Ich mag Tee]]). و [[Ich habe Hunger]] و [[Ich habe Durst]] لما تكون جعان أو عطشان دلوقتي.`,
            mistakes: R`- [[du esst]] أو [[er esst]]: الصح [[du isst]] و [[er isst]].
- [[Ich gern esse Fisch]]: الفعل المكان التاني، و [[gern]] بعده: [[Ich esse gern Fisch]].
- [[Ich esse gern den Fisch]] وإنت قصدك السمك عمومًا: من غير أداة.
- [[Am liebsten ich trinke Tee]]: بعد [[Am liebsten]] الفعل على طول: [[Am liebsten trinke ich Tee]].
- [[Ich bin Hunger]]: الصح [[Ich habe Hunger]].
- [[er magt]]: الصح [[er mag]].`
          },
          try: R`قول ٥ جمل عن أكلك النهارده: فطرت إيه، وبتحب إيه، ومبتحبش إيه، وبتحب إيه أكتر ([[lieber]]). وجرّب السمع والإملا لحد ما تجاوب كله صح.`,
          practice: [
            { lvl: 'سريع', t: R`**صرّف:** [[du]] ___ (essen) Fisch؟ / [[er]] ___ (trinken) Tee. / [[ich]] ___ (mögen) Kaffee. / [[sie]] (هي) ___ (essen) kein Fleisch. / [[ihr]] ___ (essen) gern Reis.`,
              done: R`الخمسة صح، و [[isst]] مع [[du]] و [[sie]] (هي)، و [[esst]] مع [[ihr]]`,
              sol: R`~~~de
Isst du Fisch?
Er trinkt Tee.
Ich mag Kaffee.
Sie isst kein Fleisch.
Ihr esst gern Reis.
~~~

**ليه:** [[essen]] بيتغيّر مع [[du]] و [[er/sie/es]] بس ([[isst]])، ومع [[ihr]] بيرجع [[esst]]. و [[ich mag]] من غير أي نهاية. والسؤال من غير كلمة سؤال: الفعل الأول ([[Isst du …?]]).` },
            { lvl: 'تطبيق', t: R`**gern ولا lieber ولا am liebsten:** اكتب ٣ جمل عن نفسك في المشروبات، وبعدين ٣ في الأكل، بالترتيب ده: [[gern]]، [[lieber]]، [[am liebsten]].`,
              done: R`٦ جمل، والجملتين اللي بـ [[Am liebsten]] الفعل فيهم بعدها على طول`,
              sol: R`~~~de
Ich trinke gern Wasser.
Ich trinke lieber Saft.
Am liebsten trinke ich Tee.
Ich esse gern Kartoffeln.
Ich esse lieber Reis.
Am liebsten esse ich Hähnchen.
~~~

**ليه:** [[lieber]] و [[am liebsten]] مكانهم زي [[gern]] بعد الفعل. ولما تبدأ بـ [[Am liebsten]] (عشان تأكّد عليها)، الفعل لازم يفضل في المكان التاني، فالفاعل [[ich]] يروح بعده.` },
            { lvl: 'تطبيق', t: R`**صلّح الغلط:** (١) [[Du esst gern Obst.]] (٢) [[Ich gern trinke Kaffee.]] (٣) [[Ich bin Durst.]] (٤) [[Am liebsten ich esse Fisch.]] (٥) [[Er magt Tee.]]`,
              done: R`الخمسة صح وعارف السبب`,
              sol: R`~~~de
Du isst gern Obst.
Ich trinke gern Kaffee.
Ich habe Durst.
Am liebsten esse ich Fisch.
Er mag Tee.
~~~

**ليه:** (١) [[du isst]]. (٢) الفعل المكان التاني و [[gern]] بعده. (٣) العطش «عندي»: [[haben]]. (٤) الفعل بعد [[Am liebsten]] على طول. (٥) [[er mag]] من غير [[-t]].` },
            { lvl: 'تحدي', t: R`**اشرح أكلة مصرية لألماني:** اكتب ٤ جمل عن أكلتك المفضلة (اسمها، فيها إيه، بتاكلها إمتى، وبتحبها ليه أو مع إيه) بكلمات الدرس بس، وسجّلها بصوتك.`,
              done: R`٤ جمل، فيها [[Lieblingsessen]]، والمكونات بكلمات من القايمة، ووقت الأكل بـ [[zum]]`,
              sol: R`**نسخة نموذجية:**

~~~de Nora=f
Nora: Mein Lieblingsessen ist Molokhia. || أكلتي المفضلة الملوخية.
Nora: Das ist eine Suppe aus Gemüse. || دي شوربة من الخضار.
Nora: Ich esse Molokhia mit Reis und Hähnchen. || باكلها برز وفراخ.
Nora: Zum Mittagessen esse ich das oft am Freitag. || باكلها على الغدا كتير يوم الجمعة.
~~~

**ليه كده:** اسم الأكلة زي ما هو، والشرح بكلمات معروفة ([[Suppe]] و [[Gemüse]] و [[Reis]] و [[Hähnchen]]). و [[aus]] هنا = «من» (معمولة من)، و [[mit]] = «بـ». و [[das]] في الجملة الأخيرة بترجع على الأكلة. ودي بالظبط المهارة اللي هتحتاجها كتير: تشرح حاجة ملهاش اسم بالألماني.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Wortliste، Essen und Trinken (ص ٧٦) و Nullartikel و Komparation gern/lieber (ص ١٠٠)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "CEFR Companion volume: Informal discussion، A1 (يقول بيحب إيه ومبيحبش إيه)", url: "https://rm.coe.int/16809ea0d4" },
            { t: "DWDS: essen", url: "https://www.dwds.de/wb/essen" },
            { t: "DWDS: gern", url: "https://www.dwds.de/wb/gern" },
            { t: "DWDS: mögen", url: "https://www.dwds.de/wb/m%C3%B6gen" },
          ],
        },
        {
          cmd: "Ich möchte einen Kaffee",
          title: "تطلب في المخبز والكافيه: möchte، وأول Akkusativ (einen)",
          pre: ["dea1/Ich esse gern Fisch"],
          desc: R`في المخبز أو الكافيه بتقول: [[Ich möchte einen Kaffee, bitte]] أو [[Ich hätte gern ein Brötchen]].

وهنا أول قاعدة كبيرة في الألماني: الحاجة اللي **بتطلبها أو بتاخدها** (المفعول به) اسمها **Akkusativ**، ولما تكون مذكر ([[der]]) أداتها بتتغيّر: [[ein Kaffee]] ← [[einen Kaffee]]. المؤنث والمحايد والجمع مبيتغيّروش. يعني قاعدة واحدة بس تحفظها: **المذكر بياخد n.**`,
          teach: R`## الموقف

الصبح في مخبز ألماني (Bäckerei). ده من أكتر الأماكن اللي هتتكلم فيها ألماني في أول شهر. (CEFR A1: يطلب أكل وشرب بتعبيرات بسيطة.)

~~~de Verkäuferin=f Kunde=m
Verkäuferin: Guten Morgen! Was darf es sein? || صباح الخير! تحب تاخد إيه؟
Kunde: Ich möchte zwei Brötchen, bitte. || عايز ٢ عيش لو سمحتي.
Verkäuferin: Gern. Sonst noch etwas? || حاضر. حاجة تانية؟
Kunde: Ja, einen Kaffee und eine Brezel. || آه، قهوة وبريتزل.
Verkäuferin: Für hier oder zum Mitnehmen? || هنا ولا تيك أواي؟
Kunde: Zum Mitnehmen, bitte. || تيك أواي لو سمحتي.
~~~

## تطلب إزاي: ٣ طرق

~~~de
Ich möchte einen Kaffee, bitte. || عايز قهوة لو سمحت.
Ich hätte gern einen Tee. || ممكن شاي؟ (حرفيًا: كنت أحب يبقى عندي)
Ich nehme ein Wasser. || هاخد مية.
~~~

- [[Ich möchte …]]: الأشهر، وتنفع في كل مكان.
- [[Ich hätte gern …]]: أكتر أدب شوية، وبتسمعها كتير في المحلات. احفظها جملة جاهزة.
- [[Ich nehme …]]: لما تكون بتختار من حاجات قدامك (منيو، فاترينة).

وفي الآخر [[bitte]]. ومن غيرها الطلب بيبان ناشف.

## möchten و nehmen

| | [[möchten]] (عايز) | [[nehmen]] (ياخد) |
|---|---|---|
| [[ich]] | [[möchte]] | [[nehme]] |
| [[du]] | [[möchtest]] | [[nimmst]] ⚠ |
| [[er]] / [[sie]] / [[es]] | [[möchte]] | [[nimmt]] ⚠ |
| [[wir]] | [[möchten]] | [[nehmen]] |
| [[ihr]] | [[möchtet]] | [[nehmt]] |
| [[sie]] / [[Sie]] | [[möchten]] | [[nehmen]] |

- [[ich möchte]] و [[er möchte]] **نفس الشكل**، زي [[ich mag]] و [[er mag]].
- [[nehmen]] زي [[essen]]: e ← i مع [[du]] و [[er]]، وكمان الـ h بتروح والـ m بتتكرر: [[du nimmst]] و [[er nimmt]].

~~~de
Was möchtest du? || عايز إيه؟
Was nimmst du? || هتاخد إيه؟
Sie möchte einen Tee. || هي عايزة شاي.
Er nimmt ein Brötchen. || هو هياخد عيش.
~~~

## Akkusativ: الحاجة اللي بتاخدها

في الجملة [[Ich möchte einen Kaffee]]:
- [[Ich]] هو اللي **بيعمل** (الفاعل) = **Nominativ** (الشكل العادي اللي اتعلمته لحد دلوقتي).
- [[einen Kaffee]] هو الحاجة اللي **بتتطلب** (المفعول به) = **Akkusativ**.

| | مذكر [[der]] | مؤنث [[die]] | محايد [[das]] | جمع |
|---|---|---|---|---|
| Nominativ: [[Das ist …]] | [[ein Kaffee]] | [[eine Brezel]] | [[ein Brötchen]] | [[zwei Brötchen]] |
| Akkusativ: [[Ich möchte …]] | **[[einen Kaffee]]** | [[eine Brezel]] | [[ein Brötchen]] | [[zwei Brötchen]] |

**التغيير الوحيد في المذكر: [[ein]] ← [[einen]].** والباقي زي ما هو. فلو حافظ أداة الكلمة ([[der Kaffee]])، القاعدة سهلة.

~~~de
Das ist ein Kaffee. Ich möchte einen Kaffee. || ده قهوة. عايز قهوة.
Das ist ein Tee. Ich nehme einen Tee. || ده شاي. هاخد شاي.
Das ist eine Suppe. Ich möchte eine Suppe. || دي شوربة. عايز شوربة.
Das ist ein Ei. Ich nehme ein Ei. || دي بيضة. هاخد بيضة.
~~~

ودي مش أول مرة تشوفه: [[Ich habe einen Termin]] في الوحدة اللي فاتت كانت Akkusativ برضه ([[der Termin]]).

## أفعال بتاخد Akkusativ

أغلب الأفعال اللي ليها «حاجة» بعدها: [[möchten]]، [[nehmen]]، [[haben]]، [[essen]]، [[trinken]]، [[kaufen]]، [[brauchen]]، [[bestellen]]، [[suchen]]، [[finden]].

~~~de
Ich esse einen Apfel. || باكل تفاحة.
Wir brauchen einen Tisch. || محتاجين ترابيزة.
Er kauft einen Kuchen. || بيشتري كيكة.
Hast du einen Kuli? || معاك قلم؟
~~~

وفيه فعل مهم **مبياخدش** Akkusativ: [[sein]]. فـ [[Das ist ein Kaffee]] (Nominativ، مفيش n).

## السؤال: Was?

[[Was möchten Sie?]] و [[Was nimmst du?]]: الإجابة Akkusativ. وفيه كلمة سؤال للأشخاص في الـ Akkusativ: [[Wen]] (مين، كمفعول)، ودي هتيجي لما نتكلم عن الناس.

## جمل المحل الجاهزة

~~~de
Was darf es sein? || تحب تاخد إيه؟ (البياع بيقولها)
Sonst noch etwas? || حاجة تانية؟
Nein, danke. Das ist alles. || لأ شكرًا، كده بس.
Für hier oder zum Mitnehmen? || هنا ولا تيك أواي؟
Ein Stück Kuchen, bitte. || حتة كيكة لو سمحت.
~~~

## الكلمات

~~~words في المخبز والكافيه
die Bäckerei, die Bäckereien | المخبز | Die Bäckerei öffnet um sechs.
das Café, die Cafés | الكافيه | Wir gehen ins Café.
möchten | عايز (ich möchte، du möchtest) | Ich möchte einen Tee.
nehmen | ياخد (du nimmst، er nimmt) | Ich nehme ein Brötchen.
das Glas, die Gläser | الكوباية (الإزاز) | Ein Glas Wasser, bitte.
die Flasche, die Flaschen | الإزازة | Eine Flasche Wasser, bitte.
das Stück, die Stücke | الحتة | Ein Stück Kuchen, bitte.
noch | كمان، لسه | Noch einen Kaffee, bitte.
etwas | حاجة | Sonst noch etwas?
alles | كل حاجة | Das ist alles.
kaufen | يشتري | Ich kaufe Brot.
brauchen | يحتاج | Ich brauche einen Kuli.
~~~

## كلمات زيادة: في الكافيه

[[anbieten]] فعل بينفصل: [[Darf ich Ihnen etwas anbieten?]] = أقدّم لحضرتك حاجة؟ و [[Pommes frites]] جمع دايمًا، وفي الكلام بيقولوا [[Pommes]] بس.

~~~words في الكافيه
anbieten | يعرض، يقدّم | Darf ich Ihnen einen Kaffee anbieten?
die Pommes frites | بطاطس محمّرة (جمع) | m: Einmal Pommes frites, bitte.
~~~

## مقارنة بالعربي

العربي مبيغيّرش «قهوة» لما تبقى مفعول: «القهوة سخنة» و «عايز قهوة» نفس الكلمة. والألماني بيغيّر الأداة بس، ومع المذكر بس. فكّر فيها كإنها «علامة» صغيرة على المفعول: الحرف [[n]]. (والفصحى عندها حاجة شبهها: «شربتُ قهوةً» بالفتحة على المفعول.)

## قول بصوتك

~~~speak
Ich möchte einen Kaffee, bitte. || عايز قهوة لو سمحت.
Ich hätte gern eine Brezel. || ممكن بريتزل؟
Ich nehme ein Stück Kuchen. || هاخد حتة كيكة.
Zum Mitnehmen, bitte. || تيك أواي.
Das ist alles, danke. || كده بس، شكرًا.
~~~

## سمع: طلبوا إيه؟

~~~hear
m: Guten Tag! Ich möchte einen Tee und ein Stück Kuchen, bitte.
? Was möchte er? || عايز إيه؟
- Kaffee und Kuchen
- Tee und Kuchen *
- Tee und ein Brötchen

f: Ich hätte gern drei Brötchen. Und einen Kaffee zum Mitnehmen.
? Wie viele Brötchen möchte sie? || عايزة كام عيش؟
- zwei
- drei *
- vier

m: Für mich bitte ein Wasser. Nein, kein Wasser, einen Saft!
? Was trinkt er? || هيشرب إيه؟
- Wasser
- Saft *
- Kaffee
~~~

## إملا

~~~dictate
Ich möchte einen Kaffee.
f: Was nimmst du?
Ich hätte gern ein Brötchen.
Sonst noch etwas?
~~~

## فيديو: Akkusativ

~~~yt p4whuXE_f94 A1 - Lesson 26: Accusative case
- **قبل ما تشغّله:** اكتب ٥ أسامي بتعرف أداتها، ٣ منهم مذكر، واطلبهم بـ [[Ich möchte …]].
- **وإنت بتتفرج:** اكتب كل جملة فيها [[den]] أو [[einen]] بتسمعها.
- **بعده:** صحّح الجمل الخمسة بتاعتك: المذكر بس هو اللي اتغيّر؟
~~~`,
          deep: {
            why: R`تقريبًا كل جملة فيها «حاجة» بتاخدها أو بتشتريها أو بتاكلها هي Akkusativ. ولو غلطت فيه الناس هتفهمك، بس في الامتحان (خصوصًا telc Sprachbausteine) بيتسأل عليه مباشرة. وفي Goethe Sprechen Teil 3 كل طلب تقريبًا Akkusativ ([[Einen Kaffee, bitte!]]).`,
            how: R`اعرف أداة الكلمة ([[der/die/das]]). لو مذكر وهي المفعول: [[ein]] ← [[einen]]. غير كده زي ما هي. والمفعول هو اللي بعد أفعال زي [[möchten]] و [[nehmen]] و [[haben]] و [[kaufen]] و [[brauchen]]، مش بعد [[sein]].`,
            when: R`[[Ich möchte]] في أي طلب، و [[Ich hätte gern]] في المحلات (أدب زيادة)، و [[Ich nehme]] لما تختار من منيو أو فاترينة. و [[Für hier oder zum Mitnehmen?]] في أي مخبز أو كافيه.`,
            mistakes: R`- [[Ich möchte ein Kaffee]]: [[der Kaffee]] مذكر، فـ [[einen Kaffee]].
- [[Ich möchte einen Suppe]]: [[die Suppe]] مؤنث، فـ [[eine]] زي ما هي.
- [[Das ist einen Kaffee]]: بعد [[sein]] مفيش Akkusativ، فـ [[ein Kaffee]].
- [[du nehmst]] أو [[er nehmt]]: الصح [[du nimmst]] و [[er nimmt]].
- [[er möchtet]]: الصح [[er möchte]].
- تطلب من غير [[bitte]]: مش غلط قواعد، بس بيبان قليل الذوق.`
          },
          try: R`اختار ٥ حاجات من كلمات الدرس اللي فات واطلبهم بصوت عالي بالتلات طرق ([[Ich möchte]]، [[Ich hätte gern]]، [[Ich nehme]]). وقبل كل طلب قول الأداة في دماغك: مذكر؟ يبقى [[einen]].`,
          practice: [
            { lvl: 'سريع', t: R`**einen ولا eine ولا ein:** Ich möchte ___ Apfel. / Ich nehme ___ Banane. / Ich hätte gern ___ Ei. / Wir brauchen ___ Tisch. / Er kauft ___ Brot. / Sie möchte ___ Saft.`,
              done: R`الستة صح، وعارف أداة كل كلمة`,
              sol: R`~~~de
Ich möchte einen Apfel.
Ich nehme eine Banane.
Ich hätte gern ein Ei.
Wir brauchen einen Tisch.
Er kauft ein Brot.
Sie möchte einen Saft.
~~~

**ليه:** [[der Apfel]] و [[der Tisch]] و [[der Saft]] مذكر ← [[einen]]. و [[die Banane]] مؤنث ← [[eine]]. و [[das Ei]] و [[das Brot]] محايد ← [[ein]].` },
            { lvl: 'تطبيق', t: R`**Nominativ ولا Akkusativ؟** كمّل: (١) Das ist ___ Kaffee. (٢) Ich trinke ___ Kaffee. (٣) ___ Tee ist heiß. (٤) Hast du ___ Kuli? (٥) Das ist ___ Kuli.`,
              done: R`الخمسة صح، وعارف ليه (١) و (٣) و (٥) من غير n`,
              sol: R`~~~de
Das ist ein Kaffee.
Ich trinke einen Kaffee.
Der Tee ist heiß.
Hast du einen Kuli?
Das ist ein Kuli.
~~~

**ليه:** بعد [[sein]] (ده إيه؟) Nominativ: (١) و (٥). و (٣) [[Der Tee]] هو الفاعل (هو اللي سخن)، فـ Nominativ. و (٢) و (٤) المفعول بعد [[trinken]] و [[haben]]، ومذكر، فـ [[einen]].` },
            { lvl: 'تطبيق', t: R`**صرّف وكمّل:** (١) Was ___ du? (nehmen) (٢) Er ___ einen Tee. (möchten) (٣) Ihr ___ zwei Brötchen. (nehmen) (٤) Sie (هي) ___ eine Suppe. (nehmen) (٥) ___ Sie noch etwas? (möchten)`,
              done: R`الخمسة صح، و [[nimmst]] و [[nimmt]] بالـ mm`,
              sol: R`~~~de
Was nimmst du?
Er möchte einen Tee.
Ihr nehmt zwei Brötchen.
Sie nimmt eine Suppe.
Möchten Sie noch etwas?
~~~

**ليه:** [[nehmen]] بيتغيّر مع [[du]] و [[er/sie]] بس ([[nimmst]]، [[nimmt]])، ومع [[ihr]] عادي [[nehmt]]. و [[er möchte]] من غير نهاية. و [[Sie]] الرسمي زي الجمع [[möchten]].` },
            { lvl: 'تحدي', t: R`**اطلب لاتنين:** إنت وصاحبك في كافيه. قول للبياع طلبك وطلب صاحبك (٣ حاجات لكل واحد، فيهم مذكر ومؤنث ومحايد)، بـ [[Ich möchte …]] و [[Mein Freund möchte …]]، واختم بـ [[Zum Mitnehmen]] أو [[Für hier]].

~~~hear
f: Was darf es sein?
? Was fragt die Verkäuferin? || البياعة بتسأل عن إيه؟
- Was du möchtest *
- Wie viel es kostet
- Wo du wohnst
~~~`,
              done: R`٦ حاجات، وكل مذكر بـ [[einen]]، و [[möchte]] من غير t مع صاحبك، والسمع صح`,
              sol: R`**نسخة نموذجية:**

~~~de
Ich möchte einen Kaffee, eine Brezel und ein Stück Kuchen.
Mein Freund möchte einen Tee, einen Apfelsaft und ein Brötchen.
Für hier, bitte.
~~~

**ليه:** [[einen Kaffee]] و [[einen Tee]] و [[einen Apfelsaft]] (مذكر، و [[Apfelsaft]] أداته من آخر كلمة [[der Saft]]). و [[eine Brezel]] مؤنث، و [[ein Stück]] و [[ein Brötchen]] محايد. و [[Mein Freund möchte]] زي [[er möchte]]. و [[Was darf es sein?]] = «تحب تاخد إيه؟».` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Kasus Akkusativ، unbestimmter Artikel، ich möchte / ich hätte gern (ص ١٠٠)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "CEFR Companion volume: Obtaining goods and services، A1 (يطلب أكل وشرب)", url: "https://rm.coe.int/16809ea0d4" },
            { t: "DWDS: nehmen", url: "https://www.dwds.de/wb/nehmen" },
            { t: "DWDS: Brötchen", url: "https://www.dwds.de/wb/Br%C3%B6tchen" },
            { t: "Learn German: A1 Lesson 26، Accusative case", url: "https://www.youtube.com/watch?v=p4whuXE_f94" },
          ],
        },
        {
          cmd: "Wo finde ich Reis?",
          title: "في السوبرماركت: تسأل عن حاجة، و kein ولا nicht، و den",
          pre: ["dea1/Ich möchte einen Kaffee"],
          desc: R`في السوبرماركت هتسأل [[Wo finde ich Reis?]] (الرز فين؟)، وممكن تسمع [[Leider haben wir keinen Reis mehr]] (للأسف الرز خلص).

[[kein]] هو النفي بتاع الأسامي: بيحل مكان [[ein]] أو مكان «مفيش أداة»، وبيتغيّر زيه بالظبط ([[keinen]] مع المذكر في الـ Akkusativ). و [[nicht]] لكل حاجة تانية: الفعل، والصفة، والاسم اللي معاه [[der]]. وفي الدرس ده كمان الأداة المعرّفة في الـ Akkusativ: [[der]] ← [[den]].`,
          teach: R`## الموقف

إنت في السوبرماركت ومش لاقي الرز. (منهج الاندماج 7.2.1.1: يسأل عن منتج: فين، وبكام.)

~~~de Kunde=m Mitarbeiterin=f
Kunde: Entschuldigung, wo finde ich Reis? || لو سمحتي، ألاقي الرز فين؟
Mitarbeiterin: Reis ist da hinten links. || الرز هناك ورا على الشمال.
Kunde: Danke. Und haben Sie auch Fisch? || شكرًا. وعندكم سمك كمان؟
Mitarbeiterin: Nein, leider haben wir keinen Fisch. || لأ، للأسف معندناش سمك.
Kunde: Schade. Dann nehme ich den Käse hier. || خسارة. خلاص هاخد الجبنة دي.
~~~

## تسأل عن حاجة

~~~de
Wo finde ich Reis? || ألاقي الرز فين؟
Wo ist die Milch? || اللبن فين؟
Wo sind die Eier? || البيض فين؟
Haben Sie Brot? || عندكم عيش؟
~~~

- [[Wo ist …?]] للمفرد، و [[Wo sind …?]] للجمع.
- الإجابة: [[da]] (هناك)، [[hier]] (هنا)، [[da hinten]] (هناك ورا)، [[links]] (شمال)، [[rechts]] (يمين).

## kein: النفي بتاع الأسامي

[[kein]] = «مفيش / مش … خالص». بيحل مكان [[ein]]، أو مكان الاسم اللي من غير أداة:

~~~de
Das ist ein Apfel. Das ist kein Apfel. || دي تفاحة. دي مش تفاحة.
Ich habe Zeit. Ich habe keine Zeit. || عندي وقت. معنديش وقت.
Ich esse Fleisch. Ich esse kein Fleisch. || باكل لحمة. مباكلش لحمة.
~~~

وبيتغيّر **زي [[ein]] بالظبط**، والجمع [[keine]]:

| | مذكر | مؤنث | محايد | جمع |
|---|---|---|---|---|
| Nominativ | [[kein Apfel]] | [[keine Banane]] | [[kein Ei]] | [[keine Eier]] |
| Akkusativ | **[[keinen Apfel]]** | [[keine Banane]] | [[kein Ei]] | [[keine Eier]] |

~~~de
Wir haben keinen Fisch. || معندناش سمك.
Ich habe keine Milch. || معنديش لبن.
Er trinkt kein Bier. || مبيشربش بيرة.
Wir haben keine Eier. || معندناش بيض.
~~~

## kein … mehr: خلص

[[mehr]] بعد [[kein]] = «خلاص مبقاش فيه»:

~~~de
Wir haben keinen Reis mehr. || الرز خلص.
Ich habe kein Geld mehr. || الفلوس خلصت.
~~~

## nicht ولا kein؟

| استخدم | لما | مثال |
|---|---|---|
| [[kein]] | اسم مع [[ein]]، أو اسم من غير أداة | [[Ich habe keinen Hunger.]] |
| [[nicht]] | فعل | [[Ich koche nicht.]] |
| [[nicht]] | صفة | [[Der Kaffee ist nicht heiß.]] |
| [[nicht]] | اسم مع [[der/die/das]] | [[Ich nehme den Käse nicht.]] |
| [[nicht]] | اسم شخص أو مكان | [[Das ist nicht Anna.]] |

~~~de
Ich trinke keinen Kaffee. || مبشربش قهوة (خالص).
Ich trinke nicht gern Kaffee. || مبحبش أشرب قهوة.
Der Kaffee ist nicht gut. || القهوة مش حلوة.
~~~

السؤال اللي يفرّق: «لو الجملة إيجابية، كان فيه [[ein]] أو مفيش أداة قبل الاسم؟» لو آه: [[kein]]. لو لأ: [[nicht]].

## den: الأداة المعرّفة في الـ Akkusativ

نفس القاعدة: المذكر بس بيتغيّر، [[der]] ← [[den]]:

| | مذكر | مؤنث | محايد | جمع |
|---|---|---|---|---|
| Nominativ | [[der Käse]] | [[die Milch]] | [[das Brot]] | [[die Eier]] |
| Akkusativ | **[[den Käse]]** | [[die Milch]] | [[das Brot]] | [[die Eier]] |

~~~de
Der Käse ist gut. Ich nehme den Käse. || الجبنة حلوة. هاخد الجبنة.
Die Milch ist frisch. Ich kaufe die Milch. || اللبن طازة. هشتري اللبن.
~~~

[[ein]] لحاجة أول مرة نتكلم عنها، و [[der]] لحاجة معروفة أو قدامك ([[den Käse hier]] = الجبنة دي).

## ihn و sie و es: بدل الاسم

لو مش عايز تكرر الاسم: [[den Käse]] ← [[ihn]]، و [[die Milch]] ← [[sie]]، و [[das Brot]] ← [[es]]، والجمع ← [[sie]].

~~~de
Der Käse ist gut. Ich nehme ihn. || الجبنة حلوة. هاخدها.
Die Suppe ist kalt. Ich esse sie nicht. || الشوربة باردة. مش هاكلها.
Wo ist das Brot? Ich finde es nicht. || العيش فين؟ مش لاقيه.
~~~

خلي بالك: الضمير بيتبع **أداة الكلمة الألماني** مش العربي: [[der Käse]] مذكر، فـ [[ihn]]، مع إن «الجبنة» مؤنث في العربي.

## Es gibt: فيه

[[Es gibt]] + Akkusativ = «فيه»:

~~~de
Es gibt heute Fisch. || فيه سمك النهارده.
Es gibt keinen Kuchen mehr. || الكيكة خلصت.
~~~

## وصفة: سلطة بطاطس (Kartoffelsalat)

الوصفات بالألماني ليها شكل ثابت: **المكونات** بالكمية، وبعدها **الخطوات**. والخطوات غالبًا بتتكتب بالفعل في **آخر الجملة ومن غير فاعل** (المصدر)، كأنها أوامر مختصرة.

~~~read Kartoffelsalat für 4 Personen
Zutaten: 1 Kilo Kartoffeln, 1 Zwiebel, 2 Gurken, 4 Esslöffel Öl, 2 Esslöffel Essig, Salz, Pfeffer || المكونات: كيلو بطاطس، بصلة، ٢ خيار، ٤ معالق زيت، ٢ معلقة خل، ملح، فلفل
1. Die Kartoffeln 20 Minuten kochen. || ١. البطاطس تتسلق ٢٠ دقيقة.
2. Die Kartoffeln schälen und in Scheiben schneiden. || ٢. البطاطس تتقشر وتتقطع شرايح.
3. Die Zwiebel und die Gurken klein schneiden. || ٣. البصل والخيار يتقطعوا صغير.
4. Öl, Essig, Salz und Pfeffer mischen. || ٤. الزيت والخل والملح والفلفل يتخلطوا.
5. Alles zusammen in eine Schüssel geben. Guten Appetit! || ٥. كله يتحط في طبق واحد. بالهنا والشفا!
? Man braucht zwei Zwiebeln. || محتاج بصلتين
- Richtig
- Falsch *
? Die Kartoffeln kocht man zwanzig Minuten. || البطاطس بتتسلق ٢٠ دقيقة
- Richtig *
- Falsch
? Das Rezept ist für vier Personen. || الوصفة لأربع أشخاص
- Richtig *
- Falsch
~~~

- [[Die Kartoffeln kochen]] = «البطاطس: تتسلق». الفعل في الآخر بالمصدر، ومن غير [[ich]] ولا [[Sie]]. ده شكل الوصفات والإرشادات (زي اللي على علبة الدوا).
- لو حد بيشرحلك بالكلام، هيقول بالأمر: [[Kochen Sie die Kartoffeln zwanzig Minuten]] (هتتعلمه في وحدة الشغل)، أو بـ [[man]]: [[Man kocht die Kartoffeln]].
- [[der Esslöffel]] (معلقة أكل) = [[EL]] في الوصفات، و [[der Teelöffel]] (معلقة شاي) = [[TL]]. و [[eine Prise Salz]] = رشة ملح.

~~~words الوصفة
das Rezept, die Rezepte | الوصفة | Das Rezept ist ganz einfach.
die Zutat, die Zutaten | المكوّن | m: Wir brauchen nur fünf Zutaten.
kochen | يطبخ، يسلق | Die Kartoffeln kochen zwanzig Minuten.
schneiden | يقطّع | m: Ich schneide die Zwiebel.
schälen | يقشّر | Die Kartoffeln schälen.
mischen | يخلط | m: Öl und Essig mischen.
die Zwiebel, die Zwiebeln | البصلة | Ich brauche eine Zwiebel.
der Esslöffel, die Esslöffel | المعلقة الكبيرة | m: Zwei Esslöffel Öl, bitte.
die Schüssel, die Schüsseln | الطبق العميق، البولة | Alles in eine Schüssel geben.
~~~

## الكلمات

~~~words في السوبرماركت
der Supermarkt, die Supermärkte | السوبرماركت | Ich gehe in den Supermarkt.
das Geschäft, die Geschäfte | المحل | Das Geschäft ist geschlossen.
der Laden, die Läden | المحل الصغير | Der Laden ist klein.
der Kiosk, die Kioske | الكشك | Am Kiosk gibt es Zeitungen.
die Lebensmittel | المواد الغذائية | Lebensmittel kaufe ich im Supermarkt.
finden | يلاقي | Ich finde den Reis nicht.
suchen | يدوّر على | Ich suche die Milch.
kein | مفيش، مش (مع الاسم) | Ich habe keine Zeit.
nicht | مش (مع الفعل والصفة) | Ich koche nicht.
mehr | تاني، أكتر | Wir haben keinen Reis mehr.
es gibt | فيه | Es gibt heute Fisch.
das Öl | الزيت | Wir brauchen Öl.
das Salz | الملح | Ich brauche Salz und Öl.
der Kühlschrank, die Kühlschränke | التلاجة | Die Milch ist im Kühlschrank.
links | شمال | Der Reis ist links.
rechts | يمين | Die Eier sind rechts.
~~~

## مقارنة بالعربي

العربي عنده «مش» واحدة لكل حاجة («مش تفاحة»، «مش سخن»، «مش باكل»). الألماني عنده اتنين: [[kein]] قبل الاسم (زي «مفيش» و «ولا»)، و [[nicht]] لباقي الحاجات. وفكرة حلوة تفتكرها: [[kein]] = «[[k]] + [[ein]]»، يعني بيطلع بس مكان [[ein]].

## قول بصوتك

~~~speak
Entschuldigung, wo finde ich Reis? || لو سمحت، ألاقي الرز فين؟
Wir haben keinen Fisch mehr. || السمك خلص.
Ich trinke keinen Kaffee. || مبشربش قهوة.
Der Käse ist gut. Ich nehme ihn. || الجبنة حلوة. هاخدها.
Es gibt keine Eier mehr. || البيض خلص.
~~~

## سمع: فيه ولا مفيش؟

~~~hear
f: Brot haben wir leider nicht mehr. Aber wir haben noch Brötchen.
? Was gibt es noch? || لسه فيه إيه؟
- Brot
- Brötchen *
- Kuchen

m: Die Milch ist da hinten rechts, und die Eier sind links.
? Wo ist die Milch? || اللبن فين؟
- links
- hinten rechts *
- vorne rechts

f: Ich trinke keinen Kaffee. Ich trinke nur Tee.
? Was trinkt die Frau? || الست بتشرب إيه؟
- Kaffee
- Kaffee und Tee
- nur Tee *
~~~

## إملا

~~~dictate
Wo finde ich Reis?
f: Wir haben keinen Fisch.
Ich trinke keinen Kaffee.
Ich nehme den Käse.
~~~

## من الحياة الحقيقية: Easy German

~~~yt 15Gnw3raoQw Easy German 6: Grocery shopping
- **قبل ما تشغّله:** اكتب ٥ حاجات بتشتريها كل أسبوع بأداتها.
- **وإنت بتتفرج:** الناس بتتكلم بسرعة عادية (مش لمتعلمين). اكتب أي اسم أكل تسمعه، حتى لو مش فاهم الجملة.
- **بعده:** اكتب ٣ جمل: حاجة بتشتريها، وحاجة مبتشتريهاش ([[kein]])، وحاجة مبتحبهاش ([[nicht gern]]).
~~~`,
          deep: {
            why: R`النفي في كل كلام: «معنديش وقت»، «مباكلش لحمة»، «مش فاهم». واللخبطة بين [[kein]] و [[nicht]] من أشهر أخطاء المبتدئين، وبتتسأل عليها في telc Sprachbausteine وفي أي اختبار تحديد مستوى. و [[den]] و [[ihn]] بيكمّلوا Akkusativ اللي بدأ الدرس اللي فات.`,
            how: R`[[kein]] = [[k]] + [[ein]]: مكان [[ein]] أو مكان «مفيش أداة»، وبيتصرّف زيه ([[keinen]] مع المذكر Akkusativ، و [[keine]] للمؤنث والجمع). [[nicht]] لأي حاجة تانية. والأداة المعرّفة: [[der]] ← [[den]] في الـ Akkusativ، والضمير [[ihn]].`,
            when: R`[[kein]] لما تنفي وجود حاجة ([[Ich habe keine Zeit]]، [[Es gibt keinen Reis]]). و [[nicht]] لما تنفي فعل أو وصف أو حاجة معيّنة ([[Ich nehme den Käse nicht]]). و [[kein … mehr]] لما حاجة خلصت.`,
            mistakes: R`- [[Ich habe nicht Zeit]]: الصح [[Ich habe keine Zeit]].
- [[Ich esse nicht Fleisch]]: الصح [[Ich esse kein Fleisch]].
- [[Wir haben kein Fisch]]: [[der Fisch]] مذكر Akkusativ، فـ [[keinen Fisch]].
- [[Ich nehme der Käse]]: الصح [[den Käse]].
- [[Der Käse? Ich nehme sie]]: بتفكّر بالعربي («الجبنة» مؤنث). [[der Käse]] ← [[ihn]].
- [[Der Kaffee ist kein heiß]]: الصفة بـ [[nicht]]: [[nicht heiß]].`
          },
          try: R`افتح التلاجة أو الدولاب وقول ٣ حاجات موجودة ([[Ich habe noch …]]) و ٣ مش موجودة ([[Ich habe keinen/keine/kein …]]). وجرّب السمع والإملا.`,
          practice: [
            { lvl: 'سريع', t: R`**keinen ولا keine ولا kein:** Ich habe ___ Hunger. / Wir haben ___ Milch. / Er isst ___ Ei. / Ich brauche ___ Kartoffeln. / Es gibt ___ Kuchen mehr.`,
              done: R`الخمسة صح`,
              sol: R`~~~de
Ich habe keinen Hunger.
Wir haben keine Milch.
Er isst kein Ei.
Ich brauche keine Kartoffeln.
Es gibt keinen Kuchen mehr.
~~~

**ليه:** [[der Hunger]] و [[der Kuchen]] مذكر بعد [[haben]] و [[es gibt]] ← [[keinen]]. و [[die Milch]] ← [[keine]]. و [[das Ei]] ← [[kein]]. و [[Kartoffeln]] جمع ← [[keine]].` },
            { lvl: 'تطبيق', t: R`**kein ولا nicht:** انفي الجمل دي: (١) Ich habe Zeit. (٢) Ich koche gern. (٣) Der Tee ist heiß. (٤) Das ist ein Apfel. (٥) Ich nehme den Fisch. (٦) Wir trinken Wein.`,
              done: R`الستة صح، وعارف ليه (٢) و (٣) و (٥) بـ [[nicht]]`,
              sol: R`~~~de
Ich habe keine Zeit.
Ich koche nicht gern.
Der Tee ist nicht heiß.
Das ist kein Apfel.
Ich nehme den Fisch nicht.
Wir trinken keinen Wein.
~~~

**ليه:** (١) و (٦) اسم من غير أداة ← [[kein]] ([[die Zeit]] ← [[keine]]، و [[der Wein]] ← [[keinen]]). (٤) [[ein]] ← [[kein]]. (٢) نفي الفعل و [[gern]] ← [[nicht]] قبل [[gern]]. (٣) صفة ← [[nicht]]. (٥) [[den Fisch]] معرّف ← [[nicht]] في الآخر.` },
            { lvl: 'تطبيق', t: R`**ihn ولا sie ولا es:** (١) Der Apfel ist rot. Ich esse ___. (٢) Die Milch ist alt. Ich trinke ___ nicht. (٣) Das Brot ist frisch. Ich kaufe ___. (٤) Wo ist der Kuli? Ich finde ___ nicht. (٥) Die Eier sind hier. Ich nehme ___.`,
              done: R`الخمسة صح، والضمير على أداة الكلمة الألماني`,
              sol: R`~~~de
Der Apfel ist rot. Ich esse ihn.
Die Milch ist alt. Ich trinke sie nicht.
Das Brot ist frisch. Ich kaufe es.
Wo ist der Kuli? Ich finde ihn nicht.
Die Eier sind hier. Ich nehme sie.
~~~

**ليه:** [[der]] ← [[ihn]]، و [[die]] ← [[sie]]، و [[das]] ← [[es]]، والجمع ← [[sie]]. و [[der Apfel]] مذكر في الألماني مع إن «التفاحة» مؤنث في العربي.` },
            { lvl: 'تحدي', t: R`**حوار في السوبرماركت:** اكتب حوار (٦ سطور) بتسأل فيه عن ٣ حاجات: واحدة موجودة (فين؟)، وواحدة مش موجودة ([[kein]])، وواحدة خلصت ([[kein … mehr]])، وفي الآخر تاخد حاجة تانية بـ [[den]] أو [[ihn]].

~~~hear
m: Tomaten gibt es heute leider nicht. Aber die Kartoffeln sind sehr gut.
? Was gibt es heute nicht? || إيه اللي مش موجود النهارده؟
- Kartoffeln
- Tomaten *
- Äpfel
~~~`,
              done: R`٦ سطور فيهم [[Wo …?]] و [[kein]] و [[kein … mehr]] و [[den]] أو [[ihn]]، والسمع صح`,
              sol: R`**نسخة نموذجية:**

~~~de Kundin=f Mitarbeiter=m
Kundin: Entschuldigung, wo sind die Eier? || لو سمحت، البيض فين؟
Mitarbeiter: Die Eier sind da hinten rechts. || البيض هناك ورا على اليمين.
Kundin: Danke. Haben Sie auch Fisch? || شكرًا. وعندكم سمك؟
Mitarbeiter: Nein, wir haben keinen Fisch. Und Hähnchen gibt es heute auch nicht mehr. || لأ، معندناش سمك. والفراخ كمان خلصت النهارده.
Kundin: Schade. Und der Käse hier? || خسارة. والجبنة دي؟
Mitarbeiter: Der ist sehr gut. Nehmen Sie ihn! || دي حلوة جدًا. خديها!
~~~

**ليه كده:** [[keinen Fisch]] لأن [[der Fisch]] مذكر. و [[Hähnchen gibt es … nicht mehr]]: هنا [[nicht mehr]] بتنفي الجملة (والاسم في الأول عشان التأكيد)، و [[Es gibt kein Hähnchen mehr]] نفس المعنى. و [[Der ist sehr gut]] في الكلام بدل [[Er ist]]. و [[ihn]] بترجع على [[der Käse]].` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Negativartikel kein، Negation mit nicht und kein، Personalpronomen im Akkusativ (ص ١٠٠)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Rahmencurriculum für Integrationskurse: Einkaufen، 7.2.1 (يسأل عن منتج: السعر، الرف، القسم)", url: "https://www.goethe.de/resources/files/pdf209/rahmencurriculum-integrationskurs_20171.pdf" },
            { t: "DWDS: kein", url: "https://www.dwds.de/wb/kein" },
            { t: "DWDS: geben (es gibt)", url: "https://www.dwds.de/wb/geben" },
            { t: "Easy German 6: Grocery shopping", url: "https://www.youtube.com/watch?v=15Gnw3raoQw" },
          ],
        },
        {
          cmd: "Was kostet das?",
          title: "بكام؟ الأسعار والكميات، والدفع كاش أو بالكارت",
          pre: ["dea1/Wo finde ich Reis?", "dea1/Die Zahlen 0–100"],
          desc: R`[[Was kostet das?]] (ده بكام؟) و [[Was kosten die Äpfel?]] (التفاح بكام؟). والسعر بيتقال: اليورو، وبعدين السنتات من غير كلمة [[Cent]]: [[2,49 €]] = [[zwei Euro neunundvierzig]].

وفي الدرس كمان الكميات ([[ein Kilo Tomaten]]، [[200 Gramm Käse]]، [[eine Flasche Wasser]]، ومن غير «من» بين الكمية والحاجة)، والكاشير ([[Bar oder mit Karte?]])، وشوية لبس ومقاسات وألوان.`,
          teach: R`## الموقف

في السوق، وبعدين على الكاشير في السوبرماركت. (CEFR A1: يتعامل مع الأرقام والكميات والأسعار، ومنهج الاندماج 7.2.1.2: يقول الأرقام بوضوح ويكرر السعر.)

~~~de Verkäufer=m Kundin=f
Verkäufer: Guten Tag! Was möchten Sie? || أهلًا! عايزة إيه؟
Kundin: Was kosten die Tomaten? || الطماطم بكام؟
Verkäufer: Ein Kilo kostet zwei Euro fünfzig. || الكيلو باتنين ونص.
Kundin: Dann hätte ich gern ein Kilo. Und zweihundert Gramm Käse. || طب عايزة كيلو. و ٢٠٠ جرام جبنة.
Verkäufer: Noch etwas? || حاجة تانية؟
Kundin: Nein, danke. Das ist alles. || لأ شكرًا، كده بس.
Verkäufer: Das macht fünf Euro zwanzig. || كده ٥٫٢٠ يورو.
~~~

## السعر: يتكتب إزاي ويتقال إزاي

| مكتوب | بيتقال |
|---|---|
| 1,00 € | [[ein Euro]] |
| 2,50 € | [[zwei Euro fünfzig]] |
| 2,49 € | [[zwei Euro neunundvierzig]] |
| 0,99 € | [[neunundneunzig Cent]] |
| 10,05 € | [[zehn Euro fünf]] |
| 19,90 € | [[neunzehn Euro neunzig]] |

- **فاصلة مش نقطة**: [[2,50 €]]. والعملة بعد الرقم.
- [[Euro]] و [[Cent]] **مبيتجمعوش**: [[zwei Euro]] و [[fünfzig Cent]].
- لو أقل من يورو: السنتات بس + [[Cent]].

~~~de
Das kostet ein Euro. || ده بيورو.
Das kostet zwei Euro fünfzig. || ده باتنين ونص.
Das kostet neunundneunzig Cent. || ده بـ ٩٩ سنت.
Das kostet neunzehn Euro neunzig. || ده بـ ١٩٫٩٠.
~~~

## kostet ولا kosten؟

الفعل بيتبع الحاجة: مفرد [[kostet]]، جمع [[kosten]].

~~~de
Was kostet der Käse? || الجبنة بكام؟
Was kosten die Äpfel? || التفاح بكام؟
Die Banane kostet dreißig Cent. || الموزة بـ ٣٠ سنت.
Sechs Eier kosten zwei Euro. || ٦ بيضات باتنين يورو.
~~~

و [[Das macht …]] = «كده الحساب …» (الكاشير بيقولها في الآخر).

## الكميات

| الكمية | مثال | ملاحظة |
|---|---|---|
| [[das Kilo]] | [[ein Kilo Tomaten]] | كيلو |
| [[das Pfund]] | [[ein Pfund Kartoffeln]] | ٥٠٠ جرام (في الكلام في ألمانيا) |
| [[das Gramm]] | [[zweihundert Gramm Käse]] | جرام |
| [[der Liter]] | [[ein Liter Milch]] | لتر |
| [[die Flasche]] | [[eine Flasche Wasser]] | إزازة |
| [[das Glas]] | [[ein Glas Marmelade]] | برطمان، أو كوباية |
| [[das Stück]] | [[ein Stück Kuchen]] | حتة |

- **مفيش «من» ولا أداة** بين الكمية والحاجة: [[ein Kilo Tomaten]] (حرفيًا «كيلو طماطم»، زي العربي بالظبط).
- الكمية نفسها بتاخد Akkusativ لو مفعول: [[Ich möchte einen Liter Milch]] ([[der Liter]] مذكر).
- [[Kilo]] و [[Gramm]] و [[Liter]] مبيتجمعوش بعد رقم: [[zwei Kilo]] و [[zweihundert Gramm]].

## نص وربع

~~~de
ein halbes Kilo Äpfel || نص كيلو تفاح
ein Viertelkilo Käse || ربع كيلو جبنة
anderthalb Kilo Kartoffeln || كيلو ونص بطاطس
~~~

[[halb]] قبل اسم بيتصرّف: [[ein halbes Kilo]] (محايد)، [[eine halbe Stunde]] (مؤنث). احفظهم جاهزين. و [[Viertelkilo]] كلمة واحدة ([[das Viertelkilo]]). و [[anderthalb]] = واحد ونص.

## غالي ولا رخيص

~~~de
Das ist zu teuer! || ده غالي أوي!
Das ist billig. || ده رخيص.
Die Äpfel sind heute im Angebot. || التفاح عليه عرض النهارده.
~~~

[[zu]] قبل الصفة = «زيادة عن اللزوم»: [[zu teuer]] (غالي زيادة)، [[zu groß]] (كبير زيادة).

## على الكاشير

~~~de Kassiererin=f Kunde=m
Kassiererin: Das macht zwölf Euro achtzig. || كده ١٢٫٨٠.
Kassiererin: Zahlen Sie bar oder mit Karte? || هتدفع كاش ولا بالكارت؟
Kunde: Bar, bitte. Hier sind zwanzig Euro. || كاش. اتفضلي ٢٠ يورو.
Kassiererin: Und sieben Euro zwanzig zurück. || والباقي ٧٫٢٠.
Kassiererin: Möchten Sie den Kassenbon? || عايز الفاتورة؟
Kunde: Nein, danke. Tschüss! || لأ، شكرًا. سلام!
~~~

- [[bar]] = كاش، و [[mit Karte]] = بالكارت.
- [[zurück]] = الباقي (حرفيًا «راجع»).
- في ألمانيا كتير من المحلات الصغيرة والمخابز لسه بتحب الكاش، فاسأل قبل ما تطلب: [[Kann ich mit Karte zahlen?]]

## لبس ومقاسات وألوان

~~~de Kunde=m Verkäuferin=f
Kunde: Was kostet die Jacke? || الجاكت بكام؟
Verkäuferin: Neunundvierzig Euro. Welche Größe haben Sie? || ٤٩ يورو. مقاسك كام؟
Kunde: Größe M. Haben Sie die Jacke auch in Schwarz? || مقاس M. عندكم الجاكت ده أسود؟
Verkäuferin: Ja, hier. Und die Schuhe hier kosten nur dreißig Euro. || آه، اتفضل. والجزمة دي بـ ٣٠ يورو بس.
~~~

- الألوان: [[schwarz]] (أسود)، [[weiß]] (أبيض)، [[grau]] (رمادي)، [[rot]] (أحمر)، [[blau]] (أزرق)، [[gelb]] (أصفر)، [[grün]] (أخضر)، [[braun]] (بني).
- بعد [[in]] اللون بحرف كبير: [[in Schwarz]]، [[in Blau]]. وبعد [[sein]] صغير: [[Die Jacke ist schwarz]].
- [[der Schuh, die Schuhe]]: الجزمة اتنين، فـ [[Die Schuhe kosten …]] جمع.

## الأرقام الكبيرة: من ١٠٠ لـ ١٠٠٠

في المحل والإيجار والتليفون هتقابل أرقام أكبر من ١٠٠. وهي سهلة: **المية الأول، وبعدها الرقم الصغير زي ما اتعلمته** (الآحاد قبل العشرات).

| الرقم | بالألماني | إزاي اتعمل |
|---|---|---|
| 100 | [[hundert]] (أو [[einhundert]]) | |
| 101 | [[hunderteins]] | ١٠٠ + ١ |
| 120 | [[hundertzwanzig]] | ١٠٠ + ٢٠ |
| 199 | [[hundertneunundneunzig]] | ١٠٠ + (٩ و ٩٠) |
| 250 | [[zweihundertfünfzig]] | ٢ × ١٠٠ + ٥٠ |
| 345 | [[dreihundertfünfundvierzig]] | ٣ × ١٠٠ + (٥ و ٤٠) |
| 999 | [[neunhundertneunundneunzig]] | ٩ × ١٠٠ + (٩ و ٩٠) |
| 1000 | [[tausend]] (أو [[eintausend]]) | |

- الرقم كله **كلمة واحدة** في الكتابة: [[dreihundertfünfundvierzig]]. محدش بيكتبه كده غير في الشيكات، بس بتسمعه كده.
- ترتيب الكلام: **المية ← الآحاد ← العشرات**. يعني ٣٤٥ = «تلتمية وخمسة وأربعين»، زي ما بنقولها بالعربي بالظبط.
- [[Das kostet hundertneunundneunzig Euro]] = ١٩٩ يورو. و [[Die Miete ist siebenhundertfünfzig Euro]] = ٧٥٠.

~~~dictate الأرقام الكبيرة
Das kostet hundertzwanzig Euro. => 120
f: Die Miete ist siebenhundertfünfzig Euro. => 750
Ihr Zimmer hat die Nummer dreihundertfünfundvierzig. => 345
f: Der Fernseher kostet neunhundertneunundneunzig Euro. => 999
~~~

اكتب الرقم بس بالأرقام (مثلًا [[120]]).

## الكلمات

~~~words أسعار وكميات ودفع
kosten | يتكلف، سعره | Was kostet das?
der Preis, die Preise | السعر | Der Preis ist gut.
teuer | غالي | Das ist zu teuer.
billig | رخيص | Die Bananen sind billig.
das Angebot, die Angebote | العرض | Die Äpfel sind im Angebot.
das Geld | الفلوس | Ich habe kein Geld mehr.
bar | كاش | Ich zahle bar.
die Karte, die Karten | الكارت | Kann ich mit Karte zahlen?
die Kasse, die Kassen | الكاشير | Bitte zahlen Sie an der Kasse.
zahlen | يدفع | Wir zahlen zusammen.
bezahlen | يدفع (حاجة معيّنة) | Ich bezahle den Kaffee.
halb | نص | Ich nehme ein halbes Kilo.
die Kleidung | اللبس | Die Kleidung ist hier billig.
die Jacke, die Jacken | الجاكت | Die Jacke ist schwarz.
der Schuh, die Schuhe | الجزمة (الفردة) | Die Schuhe sind neu.
die Größe, die Größen | المقاس | Welche Größe haben Sie?
die Farbe, die Farben | اللون | Welche Farbe möchten Sie?
~~~

## كلمات زيادة: لبس ووزن

[[sich anziehen]] = يلبس هدومه، و [[etwas anziehen]] = يلبس حاجة: [[Ich ziehe eine Jacke an]]. والفعل بينفصل زي [[aufstehen]].

~~~words لبس ووزن
(sich) anziehen | يلبس | Ich ziehe eine Jacke an.
das Gewicht | الوزن | Das Gewicht ist zwei Kilo.
~~~

## مقارنة بالعربي

«كيلو طماطم» و [[ein Kilo Tomaten]] نفس التركيب بالظبط، من غير «من». والسعر: إحنا بنقول «اتنين جنيه ونص» أو «اتنين وخمسين»، والألماني [[zwei Euro fünfzig]]: نفس الترتيب، الكبير وبعدين الصغير. والفرق الوحيد: الألماني مبيقولش «و» بين اليورو والسنتات.

## قول بصوتك

~~~speak
Was kostet das? || ده بكام؟
Was kosten die Tomaten? || الطماطم بكام؟
Ich hätte gern ein Kilo Äpfel. || عايز كيلو تفاح.
Das ist zu teuer. || ده غالي أوي.
Kann ich mit Karte zahlen? || ممكن أدفع بالكارت؟
~~~

## سمع: بكام؟

~~~hear
f: Das macht sieben Euro neunzig, bitte.
? Wie viel kostet es? || الحساب كام؟
- 7,19 €
- 9,70 €
- 7,90 € *

m: Die Bananen kosten heute nur ein Euro neunundzwanzig das Kilo.
? Was kostet ein Kilo Bananen? || كيلو الموز بكام؟
- 1,29 € *
- 1,92 €
- 2,19 €

f: Ich hätte gern ein halbes Kilo Käse und einen Liter Milch.
? Wie viel Käse möchte sie? || عايزة جبنة قد إيه؟
- 1 kg
- 500 g *
- 250 g
~~~

## إملا

~~~dictate
Was kostet das?
f: Das macht zwölf Euro.
Ich hätte gern ein Kilo Tomaten.
Zahlen Sie bar oder mit Karte?
~~~`,
          deep: {
            why: R`الأسعار والكميات من أكتر الحاجات اللي بيتسأل عليها في السمع في التلات امتحانات (Goethe بيقول في وصف السمع: «Zeitpunkt, Ort, Preis»)، والاختيارات بتبقى أرقام شبه بعض بالقصد ([[7,90]] و [[9,70]]). وفي الحياة: كل يوم.`,
            how: R`السعر: يورو + السنتات من غير [[Cent]] ([[zwei Euro fünfzig]])، وأقل من يورو [[… Cent]]. الكمية + الحاجة من غير «من» ([[ein Kilo Tomaten]]). [[kostet]] للمفرد و [[kosten]] للجمع. والدفع: [[bar]] أو [[mit Karte]].`,
            when: R`[[Was kostet …?]] في أي محل. [[Ich hätte gern + كمية]] في السوق والجزارة وعند الجبنة. [[Das macht …]] هتسمعها على الكاشير. و [[Haben Sie das auch in …?]] لما تسأل عن لون أو مقاس.`,
            mistakes: R`- [[zwei Euros]]: [[Euro]] مبيتجمعش.
- [[Was kostet die Äpfel?]]: جمع، فـ [[kosten]].
- [[ein Kilo von Tomaten]]: من غير [[von]].
- [[zwei Euro und fünfzig]]: مفهومة، بس الطبيعي من غير [[und]].
- [[2.50 €]] بنقطة: في ألمانيا فاصلة [[2,50 €]].
- [[neunundneunzig Euro]] وإنت قصدك ٠٫٩٩: لأ، ده ٩٩ يورو. الصح [[neunundneunzig Cent]].
- تسمع [[siebzehn]] وتكتب ٧٠: [[siebzehn]] = ١٧، و [[siebzig]] = ٧٠. خلي بالك من [[-zehn]] و [[-zig]].`
          },
          try: R`خد أي فاتورة أو منيو عندك وقول كل سعر فيها بالألماني (حوّله يورو بالأرقام اللي فيها). وجرّب السمع والإملا.`,
          practice: [
            { lvl: 'سريع', t: R`**قول السعر:** 3,50 € / 0,79 € / 12,99 € / 1,00 € / 45,10 € / 8,05 €`,
              done: R`الستة صح، و [[0,79]] بـ [[Cent]]`,
              sol: R`~~~de
drei Euro fünfzig
neunundsiebzig Cent
zwölf Euro neunundneunzig
ein Euro
fünfundvierzig Euro zehn
acht Euro fünf
~~~

**ليه:** اليورو وبعده السنتات من غير كلمة [[Cent]]، إلا لو أقل من يورو. و [[1,00 €]] = [[ein Euro]] (مش [[eins Euro]]: [[eins]] بس لما الرقم لوحده). و [[8,05]] = [[acht Euro fünf]] (الصفر مبيتقالش).` },
            { lvl: 'تطبيق', t: R`**كمّل بالكمية:** إنت في السوق. اطلب: (١) ١ كيلو طماطم (٢) ٥٠٠ جرام جبنة بطريقتين (٣) ١ لتر لبن (٤) ٢ إزازة مية (٥) حتة كيكة. ابدأ كل طلب بـ [[Ich hätte gern …]].`,
              done: R`الخمسة صح، و [[einen Liter]]، و [[zwei Flaschen]]، ومفيش [[von]]`,
              sol: R`~~~de
Ich hätte gern ein Kilo Tomaten.
Ich hätte gern ein Pfund Käse.
Ich hätte gern fünfhundert Gramm Käse.
Ich hätte gern einen Liter Milch.
Ich hätte gern zwei Flaschen Wasser.
Ich hätte gern ein Stück Kuchen.
~~~

**ليه:** [[der Liter]] مذكر ومفعول ← [[einen Liter]]. و [[Flasche]] بتتجمع ([[zwei Flaschen]]) لأنها حاجة بتتعد، بس [[Kilo]] و [[Gramm]] لأ. و [[ein Pfund]] = نص كيلو في ألمانيا.` },
            { lvl: 'تطبيق', t: R`**kostet ولا kosten، واحسب:** (١) Der Käse ___ drei Euro. (٢) Die Eier ___ zwei Euro. (٣) Was ___ die Schuhe? (٤) Ein Kilo Äpfel ___ zwei Euro fünfzig. وبعدين: الحاجات الأربعة دي (الجبنة والبيض وكيلو التفاح وجزمة بـ ٣٠) الحساب كام؟ قولها بالألماني.`,
              done: R`الأربعة صح، والحساب [[siebenunddreißig Euro fünfzig]]`,
              sol: R`~~~de
Der Käse kostet drei Euro.
Die Eier kosten zwei Euro.
Was kosten die Schuhe?
Ein Kilo Äpfel kostet zwei Euro fünfzig.
Das macht siebenunddreißig Euro fünfzig.
~~~

**ليه:** (١) و (٤) الفاعل مفرد ([[der Käse]]، [[ein Kilo]]: الكيلو هو الفاعل مش التفاح) ← [[kostet]]. (٢) و (٣) جمع ← [[kosten]]. والحساب: ٣ + ٢ + ٢٫٥٠ + ٣٠ = ٣٧٫٥٠.` },
            { lvl: 'تحدي', t: R`**سمع الأسعار الصعبة:** الأرقام اللي شبه بعض (١٧ و ٧٠، و ٢٩ و ٩٢) هي فخ الامتحان.

~~~hear
m: Der Saft kostet ein Euro siebzehn.
? Was kostet der Saft? || العصير بكام؟
- 1,70 €
- 1,17 € *
- 7,10 €

f: Zusammen macht das vierunddreißig Euro.
? Wie viel ist es? || الحساب كام؟
- 43 €
- 34 € *
- 24 €

m: Die Jacke kostet heute nicht neunundfünfzig, sondern neununddreißig Euro.
? Was kostet die Jacke heute? || الجاكت بكام النهارده؟
- 59 €
- 49 €
- 39 € *
~~~`,
              done: R`التلاتة صح من أول أو تاني سمع`,
              sol: R`**الإجابات:** ١٫١٧ و ٣٤ و ٣٩.

**ليه:** [[siebzehn]] = ١٧ (بـ [[-zehn]])، و [[siebzig]] = ٧٠ (بـ [[-zig]]). و [[vierunddreißig]]: الآحاد الأول ([[vier]] = ٤) وبعدين العشرات ([[dreißig]] = ٣٠)، يعني ٣٤ مش ٤٣، زي العربي «أربعة وتلاتين». والتالتة فيها [[nicht … sondern …]]: السعر القديم ٥٩ فخ، والجديد ٣٩.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Wortgruppenliste، Währungen و Maße und Gewichte و Farben و Bruchzahlen (ص ٧٨)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "CEFR Companion volume: Obtaining goods and services، A1 (الأرقام والكميات والأسعار)", url: "https://rm.coe.int/16809ea0d4" },
            { t: "Rahmencurriculum für Integrationskurse: Einkaufen، 7.2.1.2 (يقول الأرقام بوضوح، ويكرر السعر)", url: "https://www.goethe.de/resources/files/pdf209/rahmencurriculum-integrationskurs_20171.pdf" },
            { t: "DWDS: kosten", url: "https://www.dwds.de/wb/kosten" },
            { t: "DWDS: Pfund", url: "https://www.dwds.de/wb/Pfund" },
          ],
        },
        {
          cmd: "Die Rechnung, bitte!",
          title: "في المطعم: تطلب، والأكل عامل إيه، وتدفع، والبقشيش",
          pre: ["dea1/Ich möchte einen Kaffee", "dea1/Was kostet das?"],
          desc: R`في المطعم الألماني الحوار ليه ترتيب ثابت تقريبًا: [[Was möchten Sie trinken?]] ← [[Was möchten Sie essen?]] ← [[Schmeckt es?]] ← [[Zahlen, bitte!]] ← [[Zusammen oder getrennt?]].

ومعاه شوية حاجات ثقافية مهمة: بتدفع للجرسون على الترابيزة (مش على الكاشير)، والبقشيش بيتقال مع الدفع ([[Achtzehn, bitte]] أو [[Stimmt so]])، والمية مش ببلاش زي ما إنت متعود.`,
          teach: R`## الموقف

إنت وصاحبتك داخلين مطعم بالليل. (CEFR A1: يطلب أكل وشرب، ومنهج الاندماج D: التعامل في الأماكن العامة.)

~~~de Kellner=m Tarek=m Hana=f
Kellner: Guten Abend! Ein Tisch für zwei? || مساء الخير! ترابيزة لاتنين؟
Tarek: Ja, bitte. || آه، لو سمحت.
Kellner: Hier ist die Speisekarte. Was möchten Sie trinken? || اتفضلوا المنيو. تحبوا تشربوا إيه؟
Hana: Eine Cola, bitte. || كولا لو سمحت.
Tarek: Für mich ein Wasser. || وأنا مية.
Kellner: Und was möchten Sie essen? || وتحبوا تاكلوا إيه؟
Hana: Ich nehme die Tomatensuppe. || هاخد شوربة الطماطم.
Tarek: Und ich hätte gern das Hähnchen mit Kartoffeln. || وأنا عايز الفراخ بالبطاطس.
Kellner: Gern. || حاضر.
~~~

## تطلب

~~~de
Die Speisekarte, bitte. || المنيو لو سمحت.
Ich nehme die Suppe. || هاخد الشوربة.
Ich hätte gern einen Salat. || عايز سلطة.
Für mich einen Tee, bitte. || وأنا شاي لو سمحت.
Was können Sie empfehlen? || تنصحنا بإيه؟
~~~

- هنا بتختار من المنيو، فأغلب الوقت [[den/die/das]]: [[Ich nehme die Suppe]] (الشوربة اللي في المنيو).
- [[Für mich …]] = «وأنا…» لما كل واحد بيطلب. و [[für]] دايمًا بعدها Akkusativ: [[für mich]]، [[für dich]]، [[für den Mann]].
- [[Was können Sie empfehlen?]] جملة جاهزة (و [[können]] ليه درس بعدين).

## الأكل عامل إيه؟

الجرسون هيعدّي ويسأل:

~~~de
Schmeckt es Ihnen? || الأكل عاجبكم؟
Ja, sehr gut, danke! || آه، حلو جدًا، شكرًا!
Das ist lecker! || ده جميل! (طعمه حلو)
Die Suppe ist leider kalt. || الشوربة للأسف باردة.
~~~

- [[schmecken]] = طعمه: [[Das schmeckt gut]] (طعمه حلو)، [[Der Kaffee schmeckt nicht]] (القهوة طعمها مش حلو).
- [[Schmeckt es Ihnen?]] و [[Schmeckt es dir?]] جمل جاهزة دلوقتي ([[Ihnen]] و [[dir]] Dativ، وده بعدين).
- [[Guten Appetit!]] = بالهنا والشفا (قبل الأكل).

## تدفع

~~~de Tarek=m Kellner=m Hana=f
Tarek: Entschuldigung! Wir möchten bitte zahlen. || لو سمحت! عايزين ندفع.
Kellner: Zusammen oder getrennt? || مع بعض ولا كل واحد لوحده؟
Tarek: Getrennt, bitte. || كل واحد لوحده.
Kellner: Das Hähnchen und das Wasser: fünfzehn Euro sechzig. || الفراخ والمية: ١٥٫٦٠.
Tarek: Siebzehn, bitte. || خليهم ١٧.
Kellner: Danke! Und Sie? || شكرًا! وحضرتك؟
Hana: Die Suppe und die Cola. Hier sind zehn Euro. Stimmt so. || الشوربة والكولا. اتفضل ١٠ يورو. خلّي الباقي.
~~~

- [[Zahlen, bitte!]] أو [[Die Rechnung, bitte!]] أو [[Wir möchten bitte zahlen]]: التلاتة صح.
- [[zusammen]] = مع بعض (حساب واحد)، و [[getrennt]] = كل واحد بيدفع اللي أكله. وفي ألمانيا [[getrennt]] عادي جدًا حتى بين الصحاب.
- **البقشيش (Trinkgeld):** حوالي ٥–١٠٪، وبيتقال وإنت بتدفع: الحساب ١٥٫٦٠ ← [[Siebzehn, bitte]] (يعني خد ١٧ والباقي ليك). أو تدّي فلوس وتقول [[Stimmt so]] (خلّي الباقي).

## ثقافة: إيه الفرق عن مصر؟

- بتشاور للجرسون أو تقول [[Entschuldigung!]]. متصقفش ومتعملش «پسس».
- المية مبتجيش لوحدها ومش ببلاش غالبًا: بتطلبها وبتدفعها. ولو طلبت [[Wasser]] ممكن يسألك [[still oder mit Kohlensäure?]] (عادية ولا فوّارة).
- الحساب مبيجيش لوحده: لازم تطلبه.
- في المطاعم العادية الدفع على الترابيزة مع الجرسون نفسه.

## الوجبات والأوقات

~~~de
Wir frühstücken um sieben Uhr. || بنفطر الساعة سبعة.
Um zwölf Uhr essen wir zu Mittag. || الساعة اتناشر بنتغدى.
Am Abend essen wir zu Abend. || بالليل بنتعشى.
~~~

[[frühstücken]] فعل، و [[zu Mittag essen]] و [[zu Abend essen]] تعبيرات جاهزة.

## الكلمات

~~~words في المطعم
das Restaurant, die Restaurants | المطعم | Das Restaurant ist neu.
die Speisekarte, die Speisekarten | المنيو | Die Speisekarte, bitte.
der Tisch, die Tische | الترابيزة | Ein Tisch für zwei, bitte.
frei | فاضي | Ist hier noch frei?
der Platz, die Plätze | المكان، الكرسي | Hier ist ein Platz frei.
bestellen | يطلب (أوردر) | Wir möchten bestellen.
empfehlen | ينصح بـ | Was können Sie empfehlen?
schmecken | طعمه | Das schmeckt sehr gut.
lecker | جميل الطعم | Der Kuchen ist lecker.
der Appetit | الشهية | Guten Appetit!
die Rechnung, die Rechnungen | الحساب، الفاتورة | Die Rechnung, bitte!
zusammen | مع بعض | Zahlen Sie zusammen?
getrennt | كل واحد لوحده | Wir zahlen bitte getrennt.
das Mittagessen | الغدا | Das Mittagessen ist um zwölf.
das Abendessen | العشا | Zum Abendessen gibt es Fisch.
kochen | يطبخ | Ich koche gern.
heiß | سخن | Der Tee ist heiß.
kalt | بارد | Das Wasser ist kalt.
~~~

## كلمات زيادة: رأيك في المكان

[[zufrieden mit]] + Dativ = راضي عن: [[Sind Sie mit dem Essen zufrieden?]]

~~~words رأيك في المكان
zufrieden | راضي | Sind Sie mit dem Essen zufrieden?
~~~

## مقارنة بالعربي

في مصر «الحساب عليّا» عادة حلوة، وفي ألمانيا [[getrennt]] هو العادي، ومش معناها بخل. ولو عايز تعزم حد: [[Ich lade dich ein]] (أنا عازمك). والبقشيش في مصر بتسيبه على الترابيزة أو في الدفتر، وفي ألمانيا بتقوله بصوتك وإنت بتدفع.

## قول بصوتك

~~~speak
Die Speisekarte, bitte. || المنيو لو سمحت.
Ich nehme das Hähnchen mit Reis. || هاخد الفراخ بالرز.
Für mich ein Wasser, bitte. || وأنا مية لو سمحت.
Wir möchten bitte zahlen. || عايزين ندفع لو سمحت.
Getrennt, bitte. || كل واحد لوحده.
~~~

## سمع: في المطعم

~~~hear
m: Zusammen oder getrennt?
? Was fragt der Kellner? || الجرسون بيسأل عن إيه؟
- Wie man zahlt *
- Was man trinkt
- Wo man sitzt

f: Die Rechnung, bitte. Das Hähnchen und der Tee. Ach, und noch ein Wasser.
? Was bezahlt die Frau? || الست بتدفع إيه؟
- Hähnchen und Tee
- Hähnchen, Tee und Wasser *
- Hähnchen und Wasser

m: Das macht elf Euro vierzig. Zwölf, bitte. Stimmt so.
? Wie viel Trinkgeld gibt der Mann? || الراجل بيدّي بقشيش قد إيه؟
- 40 Cent
- 60 Cent *
- 1,40 €
~~~

## إملا

~~~dictate
Die Rechnung, bitte!
f: Zusammen oder getrennt?
Ich nehme die Suppe.
Das schmeckt sehr gut.
~~~

## من الحياة الحقيقية

~~~yt Veao2W0O8Js Ordering Food & Drinks in German: Essential Phrases for A1 Learners
- **قبل ما تشغّله:** اكتب الـ ٥ جمل اللي هتقولهم في المطعم بالترتيب (طلب مشروب، وأكل، والطعم، والحساب، والبقشيش).
- **وإنت بتتفرج:** علّم على كل جملة من جملك لما تسمعها.
- **بعده:** اكتب جملتين جداد سمعتهم ومكانوش في الدرس.
~~~`,
          deep: {
            why: R`المطعم والكافيه موقف ثابت في كتب A1 وفي الامتحانات (حوار قصير في Hören Teil 1، وطلبات في Sprechen Teil 3). وغير اللغة، فيه عادات لو مش عارفها هتتحرج: الحساب بتطلبه، و [[getrennt]] عادي، والبقشيش بيتقال.`,
            how: R`الترتيب: مشروب ← أكل ← [[Schmeckt es?]] ← [[Zahlen, bitte]] ← [[Zusammen oder getrennt?]] ← المبلغ بالبقشيش. والطلب من المنيو غالبًا بالأداة المعرّفة ([[Ich nehme die Suppe]])، ولما تكون بتطلب لنفسك وسط ناس: [[Für mich …]].`,
            when: R`[[Ist hier noch frei?]] في كافيه زحمة قبل ما تقعد جنب حد. [[Stimmt so]] لما المبلغ اللي معاك قريب من الحساب. [[Siebzehn, bitte]] لما عايز باقي بس مش كله.`,
            mistakes: R`- [[Die Rechnung, bitte]] وتستنى الحساب ييجي لوحده من الأول: لازم تطلبه.
- [[Für ich ein Wasser]]: بعد [[für]] Akkusativ: [[für mich]].
- [[Ich zahle zusammen]] وإنت لوحدك: [[zusammen]] لما فيه أكتر من واحد.
- [[Das schmeckt lecker]]: مفهومة بس مكررة (اتنين بنفس المعنى). [[Das schmeckt gut]] أو [[Das ist lecker]].
- تسيب البقشيش على الترابيزة وتمشي: مش غلط، بس مش العادة. قوله وإنت بتدفع.
- [[Stimmt so]] والمبلغ أقل من الحساب: [[Stimmt so]] معناها «خلّي الباقي»، فلازم تكون إديت أكتر.`
          },
          try: R`افتح منيو أي مطعم (حتى بالعربي) واطلب منه بالألماني بصوت عالي: مشروب وأكل، وبعدين اطلب الحساب وادفع بالبقشيش. وجرّب السمع والإملا.`,
          practice: [
            { lvl: 'سريع', t: R`**رتّب الحوار:** (أ) [[Getrennt, bitte.]] (ب) [[Was möchten Sie trinken?]] (ج) [[Zusammen oder getrennt?]] (د) [[Ein Wasser, bitte.]] (هـ) [[Wir möchten bitte zahlen.]] (و) [[Schmeckt es Ihnen?]] (ز) [[Ja, sehr gut!]]`,
              done: R`الترتيب صح من الأول للآخر`,
              sol: R`**الترتيب:** (ب) ← (د) ← (و) ← (ز) ← (هـ) ← (ج) ← (أ).

~~~de Kellner=m Gast=f
Kellner: Was möchten Sie trinken?
Gast: Ein Wasser, bitte.
Kellner: Schmeckt es Ihnen?
Gast: Ja, sehr gut!
Gast: Wir möchten bitte zahlen.
Kellner: Zusammen oder getrennt?
Gast: Getrennt, bitte.
~~~

**ليه:** المطعم ليه ترتيب ثابت: الشرب، وبعدين الأكل، والجرسون بيسأل عن الطعم وإنت بتاكل، وبعدين إنت اللي بتطلب الحساب، وهو يسأل مع بعض ولا لوحدكم.` },
            { lvl: 'تطبيق', t: R`**البقشيش:** الحساب كام والبقشيش كام؟ قول المبلغ اللي هتدفعه بالألماني (حوالي ١٠٪، مقرّب): (١) ٨٫٥٠ (٢) ١٣٫٢٠ (٣) ٢٧٫٨٠ (٤) ٤٫٦٠`,
              done: R`الأربعة بمبلغ معقول (٥–١٠٪ مقرّب) وبالألماني صح`,
              sol: R`~~~de
Neun Euro fünfzig, bitte.
Fünfzehn, bitte.
Dreißig, bitte.
Fünf, bitte. Stimmt so.
~~~

**ليه:** (١) ٨٫٥٠ + ١ تقريبًا = ٩٫٥٠ (أو [[Neun, bitte]] لو عايز ٥٪). (٢) ١٣٫٢٠ ← ١٥ (حوالي ١٤٪، مقبول، أو [[Vierzehn, bitte]]). (٣) ٢٧٫٨٠ ← ٣٠. (٤) ٤٫٦٠ ← إديته ٥ وقلت [[Stimmt so]]. مفيش رقم واحد صح: المهم إنك تقول المبلغ الكلي، مش البقشيش لوحده.` },
            { lvl: 'تطبيق', t: R`**اطلب بالأداة الصح:** المنيو فيه: [[der Salat]]، [[die Suppe]]، [[das Hähnchen]]، [[der Fisch]]، [[die Kartoffeln]]. اكتب ٤ طلبات بـ [[Ich nehme …]] أو [[Ich hätte gern …]] أو [[Für mich …]]، واحد فيهم بـ [[einen]].`,
              done: R`٤ طلبات، والمذكر المعرّف بـ [[den]]، وطلب واحد بـ [[einen]]`,
              sol: R`~~~de
Ich nehme den Salat.
Ich hätte gern die Suppe.
Für mich das Hähnchen mit Kartoffeln.
Und noch einen Salat, bitte.
~~~

**ليه:** من المنيو الحاجة معروفة، فـ [[den Salat]] (مذكر Akkusativ)، و [[die Suppe]] و [[das Hähnchen]] زي ما هم. و [[noch einen Salat]] = سلطة كمان واحدة (مش السلطة المعيّنة)، فـ [[einen]].` },
            { lvl: 'تحدي', t: R`**مشكلة في المطعم:** اكتب ٤ سطور: الأكل جه بارد، وإنت بتقول للجرسون بأدب، وهو بيعتذر وبيقول هيجيب غيره، وإنت بتشكره.

~~~hear
f: Entschuldigung, die Suppe ist leider kalt.
? Was ist das Problem? || المشكلة إيه؟
- Die Suppe ist kalt. *
- Die Suppe ist teuer.
- Es gibt keine Suppe.
~~~`,
              done: R`٤ سطور، فيهم [[Entschuldigung]] و [[leider]] و [[kalt]]، والجرسون بيعتذر، والسمع صح`,
              sol: R`**نسخة نموذجية:**

~~~de Gast=m Kellnerin=f
Gast: Entschuldigung, der Fisch ist leider kalt. || لو سمحتي، السمك للأسف بارد.
Kellnerin: Oh, das tut mir leid! Ich bringe Ihnen einen neuen Fisch. || آسفة جدًا! هجيبلك سمك جديد.
Gast: Danke, das ist nett. || شكرًا، ذوق منك.
Kellnerin: Kein Problem. Guten Appetit! || ولا يهمك. بالهنا!
~~~

**ليه كده:** [[leider]] بتخلّي الشكوى مؤدبة. و [[Das tut mir leid]] = أنا آسف (جاهزة). و [[einen neuen Fisch]] فيه صفة بعد [[einen]] (التصريف ده في A2)، فهنا افهمها بس. ودي من أهداف منهج الاندماج (C: التعامل مع خلاف بأدب، و «Beschwerde» في Goethe).` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Wortliste، Lokale (Restaurant, Café) (ص ٧٦)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "CEFR Companion volume: Obtaining goods and services، A1 (يطلب أكل وشرب بتعبيرات بسيطة)", url: "https://rm.coe.int/16809ea0d4" },
            { t: "DWDS: schmecken", url: "https://www.dwds.de/wb/schmecken" },
            { t: "DWDS: Trinkgeld", url: "https://www.dwds.de/wb/Trinkgeld" },
            { t: "lingoni GERMAN: Ordering Food & Drinks in German", url: "https://www.youtube.com/watch?v=Veao2W0O8Js" },
          ],
        },
        {
          cmd: "Prüfung: Sprechen Teil 2 und 3, Hören Teil 2",
          title: "تدريب الامتحان: تسأل وتجاوب، وتطلب حاجة، وإعلانات السوبرماركت",
          pre: ["dea1/Ich esse gern Fisch", "dea1/Ich möchte einen Kaffee", "dea1/Was kostet das?"],
          desc: R`**Sprechen Teil 2 في Goethe:** كل واحد بيسحب كارت عليه كلمة من موضوع (زي «Essen und Trinken»)، ويسأل زميله سؤال بالكلمة دي، والزميل يجاوب. السؤال عليه ٢ والإجابة ١، ومرتين: ٦ نقط.

**Sprechen Teil 3:** كارت عليه صورة حاجة (كوباية مية، ملح…)، وإنت بتطلبها من زميلك وهو يرد. الطلب عليه ٢ والرد ١: ٦ نقط. والأهم إن الطلب يبقى **طلب** مش سؤال معلومة.

**Hören Teil 2:** إعلانات في سوبرماركت أو محطة، **مرة واحدة بس**، وإنت بتقول صح ولا غلط.`,
          teach: R`## Sprechen: إزاي بيمشي

الامتحان الشفهي في Goethe جماعي: لحد ٤ متقدمين قاعدين في دايرة مع ٢ ممتحنين، ومفيش وقت تحضير. Teil 1 اتدربت عليه في الوحدة الأولى، والنهارده Teil 2 و Teil 3. والمعيار الأساسي حسب وصف Goethe نفسه: **الكلام مفهوم ولا لأ، مش عدد الأخطاء**. يعني جملة فيها غلط صغير بس مفهومة بتاخد الدرجة كاملة.

| الحاجة | الدرجة |
|---|---|
| مفهوم ومناسب للمهمة | الدرجة كاملة |
| مفهوم بس فيه حاجة بتلخبط (نطق، ترتيب، كلمة غلط) | نص الدرجة |
| مش مفهوم أو مش اللي المهمة طالباه | ٠ |

## Teil 2: تسأل وتجاوب

الممتحن بيقول الموضوع، مثلًا **«Essen und Trinken»**، وإنت بتسحب كارت عليه كلمة، مثلًا [[Frühstück]]. وتسأل زميلك سؤال **عن الموضوع** بالكلمة دي:

~~~de Prüfling_A=f Prüfling_B=m
Prüfling_A: Was isst du zum Frühstück? || بتاكل إيه على الفطار؟
Prüfling_B: Ich esse Brot mit Käse und trinke Tee. || باكل عيش بجبنة وبشرب شاي.
Prüfling_B: Trinkst du gern Kaffee? || بتحبي القهوة؟
Prüfling_A: Nein, ich trinke lieber Tee. || لأ، بحب الشاي أكتر.
~~~

**السؤال (٢ نقطة):** لازم يبقى سؤال حقيقي بفعل:
- بكلمة سؤال: [[Was …?]]، [[Wann …?]]، [[Wo …?]]، [[Wie viel …?]]
- أو ييجي الفعل الأول: [[Trinkst du gern Kaffee?]]
- **مش** الكلمة لوحدها بنبرة سؤال ([[Frühstück?]]): دي مش جملة.

**الإجابة (١ نقطة):** جملة واحدة مفهومة كفاية. [[Ja]] لوحدها ضعيفة، والأحسن [[Ja, ich trinke gern Kaffee]].

## أسئلة جاهزة لكروت «Essen und Trinken» و «Einkaufen»

~~~de
Was isst du gern? || كارت Essen
Was trinkst du zum Frühstück? || كارت Frühstück
Isst du gern Obst? || كارت Obst
Kochst du gern? || كارت Kochen
Was kostet ein Kaffee in Kairo? || كارت Kaffee
Wo kaufst du Brot? || كارت Brot
Wann gehst du einkaufen? || كارت Supermarkt
Gehst du oft ins Restaurant? || كارت Restaurant
~~~

خلي بالك: الكارت ممكن يكون عليه كلمة مش عن الأكل بالظبط (زي [[Geld]] في موضوع «Einkaufen»)، والسؤال لازم يربط الاتنين: [[Bezahlst du bar oder mit Karte?]]

## Teil 3: تطلب حاجة وترد

كارت عليه **صورة** حاجة، وإنت بتطلبها من زميلك. وزميلك بيرد بالكلام أو بالحركة (بيمدّ إيده كإنه بيديك الحاجة)، والاتنين مقبولين.

~~~de
Ein Glas Wasser, bitte! || كوباية مية لو سمحت!
Gib mir bitte das Salz! || ادّيني الملح لو سمحت!
Können Sie mir bitte die Speisekarte geben? || ممكن تديني المنيو لو سمحت؟
Ich möchte bitte einen Apfel. || عايز تفاحة لو سمحت.
~~~

**٤ أشكال آمنة للطلب:**
1. الحاجة + [[bitte]]: [[Einen Kaffee, bitte!]] (أسهل حاجة، ومذكر ← [[einen]]).
2. [[Gib mir bitte …!]] مع [[du]]، أو [[Geben Sie mir bitte …!]] مع [[Sie]]. ([[mir]] = ليّا، جاهزة.)
3. [[Kannst du mir bitte … geben?]] أو [[Können Sie mir bitte … geben?]]: شكلها سؤال بس معناها طلب، ومقبولة.
4. [[Ich möchte bitte …]] أو [[Ich hätte gern …]].

**الفخ:** [[Hast du Salz?]] أو [[Wo ist das Salz?]] دول **أسئلة معلومة** مش طلبات، والممتحن هيقولك تعيد. اطلب الحاجة نفسها.

**الرد (١ نقطة):**

~~~de
Ja, gern. Hier, bitte. || حاضر، اتفضل.
Ja, natürlich. || أكيد.
Bitte schön. || اتفضل.
Tut mir leid, ich habe kein Salz. || آسف، معنديش ملح.
~~~

## Hören Teil 2: إعلانات السوبرماركت

الإعلانات **بتتسمع مرة واحدة**، وعلى كل واحد جملة: صح ولا غلط. اقرا الجملة **قبل** الإعلان، وركّز على الحاجة اللي هي بتسأل عنها (سعر؟ رقم كاشير؟ دقايق؟).

~~~hear
f: Liebe Kundinnen und Kunden, heute im Angebot: ein Kilo Äpfel für nur ein Euro neunundneunzig.
? Ein Kilo Äpfel kostet heute 1,99 €. || كيلو التفاح النهارده بـ ١٫٩٩
- Richtig *
- Falsch

m: Liebe Kunden, unser Supermarkt schließt in fünfzehn Minuten. Bitte kommen Sie zur Kasse.
? Der Supermarkt schließt in fünfzig Minuten. || السوبرماركت بيقفل بعد ٥٠ دقيقة
- Richtig
- Falsch *

f: Achtung, bitte! Kasse vier ist jetzt geöffnet.
? Man kann jetzt an Kasse vier bezahlen. || تقدر تدفع دلوقتي في كاشير ٤
- Richtig *
- Falsch

m: Die kleine Mia sucht ihre Mama. Mia wartet an der Information.
? Mia wartet an Kasse eins. || ميا مستنية عند كاشير ١
- Richtig
- Falsch *

f: Heute in unserer Bäckerei: zehn Brötchen für nur zwei Euro.
? Zehn Brötchen kosten heute zwei Euro. || ١٠ عيش النهارده باتنين يورو
- Richtig *
- Falsch
~~~

**الفخاخ اللي فاتت:** [[fünfzehn]] و [[fünfzig]] (١٥ و ٥٠). والإعلان بيقول مكان ([[Information]]) والجملة مكان تاني ([[Kasse eins]]). وكلمات الإعلانات اللي بتتكرر: [[Liebe Kundinnen und Kunden]] (عملاءنا الأعزاء)، [[im Angebot]] (عليه عرض)، [[geöffnet]] و [[geschlossen]].

## صحّح نفسك بموديل AI

سجّل إجاباتك لـ Teil 2 و Teil 3 واكتبها (أو خلي الموبايل يكتبها)، وابعتها:

~~~prompt طلب تصحيح: Goethe A1، Sprechen Teil 2 و Teil 3
Du bist Prüfer für das Goethe-Zertifikat A1 (Start Deutsch 1), Sprechen.
Teil 2 (Thema: Essen und Trinken): Ich habe zu Wortkarten Fragen gestellt und Antworten gegeben. Pro Frage maximal 2 Punkte, pro Antwort maximal 1 Punkt.
Teil 3: Ich habe zu Bildkarten Bitten formuliert und reagiert. Pro Bitte maximal 2 Punkte, pro Reaktion maximal 1 Punkt. Eine Frage statt einer Bitte zählt nicht als Bitte.
Volle Punktzahl: verständlich und passend. Halbe Punktzahl: verständlich, aber mit Mängeln. 0: unverständlich oder nicht passend. Wichtig ist die Verständlichkeit, nicht die Zahl der Fehler.
Antworte auf Ägyptisch-Arabisch, deutsche Wörter auf Deutsch.
1. Punkte für jede Frage, Antwort, Bitte und Reaktion, mit Grund.
2. Jeder Fehler: falsch, richtig, warum (ein Satz).
3. Eine bessere Version nur mit A1-Wörtern.
Meine Sätze:
~~~`,
          deep: {
            why: R`Teil 2 و Teil 3 مع بعض ١٢ نقطة من ١٥ في الكلام، يعني ٢٠ من ٢٥ بعد ما بيتحسبوا. وهما الأسهل في التحضير: المواضيع محدودة (أكل، تسوق، ويك إند، سكن…)، والأسئلة والطلبات شكلها ثابت. وفي telc Sprechen Teil B و C نفس الفكرة تقريبًا.`,
            how: R`Teil 2: كلمة الكارت + الموضوع ← سؤال بفعل (بكلمة سؤال أو الفعل الأول)، والإجابة جملة كاملة. Teil 3: الحاجة اللي في الصورة ← طلب بـ [[bitte]] ([[Einen Kaffee, bitte!]]، [[Gib mir bitte …!]]، [[Können Sie mir bitte … geben?]])، والرد [[Ja, gern. Hier, bitte.]]. Hören Teil 2: اقرا الجملة قبل، وركّز على الرقم أو المكان.`,
            when: R`التدريب ده بينفع بعد كل وحدة: كل وحدة جاية فيها موضوع جديد لـ Teil 2 (السكن، الشغل، الصحة…). اعمل كروت لكل موضوع وانت بتخلص الوحدة.`,
            mistakes: R`- [[Frühstück?]] بنبرة سؤال بدل جملة: ٠ للسؤال.
- سؤال ملوش علاقة بالموضوع: الكارت [[Brot]] والسؤال [[Wie heißt du?]].
- في Teil 3: [[Hast du Wasser?]] (سؤال معلومة) بدل [[Ein Glas Wasser, bitte!]] (طلب).
- [[Ein Kaffee, bitte]] بدل [[Einen Kaffee]]: مفهومة فغالبًا كاملة أو نص، بس صحّها.
- إجابة بكلمة واحدة: [[Ja.]] صح بس ضعيفة؛ قول جملة.
- تتكسف وتسكت: لو مش فاهم، قول [[Wie bitte?]] أو [[Noch einmal, bitte]]، ودي مسموحة.
- في السمع: تكتب [[fünfzig]] لما الإعلان قال [[fünfzehn]]، وانت مسمعتهوش غير مرة.`
          },
          try: R`اعمل ٦ كروت كلمات و ٦ كروت صور (مشروع «امتحان Sprechen Teil 2 و Teil 3» في الوحدة)، واسأل واطلب بصوت عالي، وصحّح بالطلب الجاهز. وحل إعلانات السوبرماركت الخمسة من غير ما تفتح النص.`,
          practice: [
            { lvl: 'سريع', t: R`**سؤال ولا مش سؤال؟** أنهي دول هياخدوا ٢ في Teil 2 (موضوع «Essen und Trinken»)؟ (١) [[Kaffee?]] (٢) [[Trinkst du gern Kaffee?]] (٣) [[Was isst du am Abend?]] (٤) [[Obst gern?]] (٥) [[Wie alt bist du?]]`,
              done: R`(٢) و (٣) بس، وعارف ليه التلاتة التانيين لأ`,
              sol: R`**(٢) و (٣) بس.**

**ليه:** (١) و (٤) كلمات من غير فعل، فمش جملة سؤال. و (٥) سؤال صح، بس ملوش علاقة بموضوع الأكل ولا بالكارت. ولو عايز تصلّحهم:

~~~de
Trinkst du gern Kaffee?
Isst du gern Obst?
~~~` },
            { lvl: 'تطبيق', t: R`**حوّل لطلب:** الأسئلة دي مش هتاخد درجة الطلب في Teil 3. حوّل كل واحد لطلب: (١) [[Hast du einen Kuli?]] (٢) [[Wo ist die Speisekarte?]] (٣) [[Haben Sie Wasser?]] (٤) [[Gibt es Brot?]]`,
              done: R`الأربعة طلبات بـ [[bitte]]، والمذكر بـ [[einen]]`,
              sol: R`~~~de
Gib mir bitte einen Kuli!
Die Speisekarte, bitte!
Ein Glas Wasser, bitte!
Können Sie mir bitte ein Brot geben?
~~~

**ليه:** الطلب بيقول «اديني الحاجة»، مش بيسأل هي موجودة ولا لأ. و [[der Kuli]] مذكر مفعول ← [[einen Kuli]]. و [[Können Sie mir bitte … geben?]] شكلها سؤال بس معناها طلب، فمقبولة.` },
            { lvl: 'تطبيق', t: R`**Teil 2 كامل:** الموضوع «Einkaufen»، والكروت: [[Supermarkt]]، [[Geld]]، [[Obst]]، [[Wochenende]]. اكتب سؤال وإجابة لكل كارت.`,
              done: R`٤ أسئلة كلها عن التسوق وبفعل، و ٤ إجابات جمل كاملة`,
              sol: R`~~~de
Wo ist ein Supermarkt? Da hinten links.
Bezahlst du bar oder mit Karte? Ich bezahle mit Karte.
Wo kaufst du Obst? Ich kaufe Obst auf dem Markt.
Kaufst du am Wochenende ein? Ja, am Samstag.
~~~

**ليه:** كل سؤال بيربط كلمة الكارت بالتسوق: [[Geld]] ← الدفع، و [[Wochenende]] ← إمتى بتشتري. و [[auf dem Markt]] (في السوق) جاهزة دلوقتي (Dativ بعدين). و [[Ja, am Samstag]] إجابة قصيرة بس كاملة المعنى، فبتاخد النقطة.` },
            { lvl: 'تحدي', t: R`**إعلانات أصعب** (مرة واحدة بس، زي الامتحان):

~~~hear
m: Liebe Kundinnen und Kunden, Kasse drei ist geschlossen. Bitte gehen Sie zu Kasse fünf.
? Kasse fünf ist geschlossen. || كاشير ٥ مقفول
- Richtig
- Falsch *

f: Heute im Angebot: Bananen, nicht ein Euro neunundsiebzig, sondern nur ein Euro neunundzwanzig.
? Die Bananen kosten heute 1,29 €. || الموز النهارده بـ ١٫٢٩
- Richtig *
- Falsch

m: Unser Supermarkt ist am Sonntag geschlossen. Von Montag bis Samstag sind wir von acht bis zweiundzwanzig Uhr für Sie da.
? Am Sonntag kann man im Supermarkt einkaufen. || تقدر تشتري من السوبرماركت يوم الحد
- Richtig
- Falsch *
~~~`,
              done: R`التلاتة صح من أول سمع`,
              sol: R`**الإجابات:** غلط، صح، غلط.

**ليه:** (١) التلاتة اللي مقفول، والخمسة هي اللي بتروحلها. (٢) [[nicht … sondern …]]: السعر الجديد ١٫٢٩. (٣) الحد [[geschlossen]]. وفي ألمانيا فعلًا أغلب المحلات مقفولة يوم الحد بالقانون، فدي معلومة هتحتاجها في الحياة كمان.` },
          ],
          ref: [
            { t: "Goethe-Zertifikat A1: Sprechen، الأجزاء والتقييم (ص ٤٤–٥٢)، و Hören Teil 2 (ص ٢٨)", url: "https://goethe.de/pro/relaunch/prf/et/Pruefungsziele_Testbeschreibung_A1_SD1.pdf" },
            { t: "Goethe-Zertifikat A1: Übungssatz 01 (امتحان تجريبي رسمي ببلاش)", url: "https://www.goethe.de/pro/relaunch/prf/materialien/A1_sd1/sd_1_uebungssatz01.pdf" },
            { t: "telc Deutsch A1 für Zuwanderer: Übungstest (Sprechen Teil B و C)", url: "https://shop.telc.net/media/catalog/product/file//2/0/20201225_5069-b00-010104_web.pdf" },
            { t: "CEFR Companion volume: Obtaining goods and services، A1", url: "https://rm.coe.int/16809ea0d4" },
          ],
        },
      ],
    },
]);

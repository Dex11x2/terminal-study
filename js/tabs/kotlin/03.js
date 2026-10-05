// تكملة تاب kotlin: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/kotlin/01.js (شرح حقول الدرس في أوله)
MORE("kotlin", [
    {
      t: "Compose: بناء الشاشة",
      l: 2,
      n: "الواجهة دوال @Composable: Text و Button، و Column و Row و Box، والـ Modifier، و LazyColumn للستات، و Material 3 والثيم",
      items: [
        {
          cmd: "مقدمة Jetpack Compose",
          title: "Jetpack Compose: يعني إيه @Composable، وإزاي تعمل Preview؟",
          desc: R`[[Jetpack Compose]] هو طريقة Android الحديثة لبناء الواجهة، و Google بتعتبره الافتراضي لأي تطبيق جديد. بدل ما ترسم الشاشة في XML وتربطها بالكود، بتكتبها كلها Kotlin.

كل حتة واجهة هي دالة عليها [[@Composable]]. علامة [[@]] دي اسمها annotation: معلومة زيادة للمترجم، وهنا بتقوله «دي دالة بترسم UI». وبالعرف اسمها بيبدأ بحرف كبير (زي كلاس) لأنها بتمثل حاجة على الشاشة.

الفكرة (اسمها declarative UI): انت مش بتقول «غيّر النص ده لكذا». انت بتقول «الشاشة شكلها كذا حسب الداتا دي». ولما الداتا تتغير، Compose بينادي الدالة تاني ويرسم الجديد. ده اسمه [[recomposition]].

أول عناصر:
• [[Text("...")]]: نص.
• [[Button(onClick = { ... }) { Text("...") }]]: زرار. [[onClick]] lambda بتتنفذ لما تدوس، والـ lambda التانية (برا الأقواس) محتوى الزرار.
• [[Image]] و [[Icon]]: صور وأيقونات.

و [[modifier: Modifier = Modifier]]: العرف إن أي composable بتاعك ياخد modifier اختياري، عشان اللي بيستخدمه يقدر يظبط المسافة والحجم من برا (درس الـ Modifier).

[[@Preview]] فوق composable مبياخدش parameters بيخلي Android Studio يرسمه في تاب Split أو Design من غير ما تشغّل التطبيق.`,
          example: R`// الـ imports: androidx.compose.material3.* و androidx.compose.runtime.Composable و androidx.compose.ui.tooling.preview.Preview
@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(text = "أهلًا يا $name", modifier = modifier)
}
@Composable
fun HelloButton() {
    Button(onClick = { Log.d("Btn", "اتداس") }) {
        Text("دوس هنا")
    }
}
@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    Column {
        Greeting("Sara")
        HelloButton()
    }
}`,
          try: R`حط الكود في ملف [[Greeting.kt]] جنب MainActivity، وافتح وضع Split فوق يمين المحرر. غيّر الاسم في الـ Preview وشوف الرسم بيتحدث. وبعدين ناديه من [[setContent]] في MainActivity وشغّل، ودوس الزرار وشوف الـ log في Logcat بـ [[tag:Btn]].`,
          flag: "script",
          deep: {
            why: R`Compose بيقلل كمية الكود كتير عن XML، ومفيش ربط بين ملفين (مفيش findViewById ولا ID غلط يوقع التطبيق)، والـ state بيتعرض لوحده. وكل المكتبات والأمثلة الجديدة من Google بتطلع بـ Compose. بس XML لسه في مشاريع كتير شغالة، فهتتعلمه كمان في آخر المستوى ده.`,
            how: R`plugin مترجم Compose ([[org.jetbrains.kotlin.plugin.compose]]) بيعدّل كل دالة [[@Composable]] وقت الترجمة: بيضيفلها parameter مخفي اسمه [[Composer]] بيتتبع مكانها في الشجرة، وبيسجّل هي قرت أنهي state. لما state يتغير، الـ Composer بيعرف بالظبط أنهي دوال يعيد ندهها، والباقي بيتنط (skipping).

عشان كده:
• composable مينفعش يتنادى غير من composable تاني (لأنه محتاج الـ Composer).
• الدالة ممكن تتنادى كتير جدًا وبأي ترتيب، فلازم تبقى سريعة ومن غير side effects (متعملش نداء شبكة أو تكتب في متغير برا جواها). الحاجات دي ليها أدوات خاصة زي [[LaunchedEffect]].

و Material 3 ([[androidx.compose.material3]]) هي المكتبة اللي فيها Button و Text و Card وغيرهم بتصميم Google الحالي.`,
            when: "أي شاشة جديدة في أي تطبيق جديد. والـ Preview لكل composable شغال عليه عشان تشوف التغيير في ثانية.",
            mistakes: R`تنادي composable من [[onClick]]: الـ onClick مش composable، فيقول [[@Composable invocations can only happen from the context of a @Composable function]]. الصح إنك تغيّر state في الـ onClick، والشاشة ترسم على أساسه. وتعمل شغل تقيل (قراية ملف، sort لليستة كبيرة) جوه الـ composable نفسه فيتعاد مع كل recomposition.`
          },
          lines: [
            R`[[@Composable]]: دالة بترسم UI.`,
            R`بتاخد الاسم، و [[modifier]] اختياري افتراضيه [[Modifier]] الفاضي.`,
            "نص فيه الاسم، وبنعدّي الـ modifier ليه.",
            "قفلة.",
            "composable تاني.",
            "دالة الزرار.",
            R`[[Button]]: الـ onClick بيكتب log لما اليوزر يدوس.`,
            "محتوى الزرار: نص.",
            "قفلة محتوى الزرار.",
            "قفلة الدالة.",
            R`[[@Preview]]: ارسمه في Android Studio بخلفية بيضا.`,
            "لازم composable كمان.",
            "دالة preview من غير parameters.",
            R`[[Column]]: حط اللي جوه تحت بعض (الدرس الجاي).`,
            "التحية.",
            "الزرار.",
            "قفلة Column.",
            "قفلة."
          ],
          sol: R`في الـ Preview هتشوف «أهلًا يا Sara» وتحتها زرار «دوس هنا». ومع كل تعديل وحفظ الـ Preview بيتحدث في ثواني.

ولما تشغّل وتدوس، Logcat هيطلّع سطر زي: [[D/Btn: اتداس]] (D معناها Debug).

ولو الـ Preview قال [[Render problem]]: اعمل Build ثم Refresh. ولو الـ composable بياخد parameters مالهاش قيمة افتراضية، الـ Preview مش هيعرف يرسمه مباشرة: اعمل دالة preview صغيرة بتناديه بقيم ثابتة زي ما المثال عامل.`,
          solCode: R`class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            NotesTheme {
                Scaffold { innerPadding ->
                    Column(Modifier.padding(innerPadding)) {
                        Greeting("Sara")
                        HelloButton()
                    }
                }
            }
        }
    }
}`
        },
        {
          cmd: "Column و Row و Box",
          title: "Column و Row و Box: ترتّب العناصر تحت بعض وجنب بعض وفوق بعض",
          desc: R`٣ layouts أساسية:
• [[Column]]: العناصر تحت بعض (رأسي).
• [[Row]]: جنب بعض (أفقي). وفي العربي (RTL) بتبدأ من اليمين لوحدها.
• [[Box]]: فوق بعض، زي صورة وعليها badge في الركن.

والتحكم في المكان:
• في Column: [[verticalArrangement]] (التوزيع على المحور الرأسي، زي [[Arrangement.spacedBy(8.dp)]] مسافة ثابتة بين العناصر، أو [[SpaceBetween]]) و [[horizontalAlignment]] (المحاذاة على العرض).
• في Row العكس: [[horizontalArrangement]] و [[verticalAlignment]].
• في Box: [[contentAlignment]] لكل العناصر، أو [[Modifier.align(...)]] لعنصر واحد.

[[Spacer(Modifier.width(12.dp))]]: مسافة فاضية.
[[Modifier.weight(1f)]] جوه Row أو Column: العنصر ده ياخد كل المساحة الفاضية. ولو عنصرين ليهم weight 1f يتقسموها نص ونص. الـ [[f]] بعد الرقم معناها Float.

[[dp]] وحدة المسافات والأحجام: density-independent pixels، يعني نفس الحجم الحقيقي تقريبًا على أي شاشة. و [[sp]] للخطوط، وبتكبر لو اليوزر مكبّر الخط من الإعدادات.`,
          example: R`@Composable
fun ProfileHeader(name: String, city: String) {
    Row(
        modifier = Modifier.fillMaxWidth().padding(16.dp),
        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier.size(56.dp).clip(CircleShape).background(MaterialTheme.colorScheme.primary),
            contentAlignment = Alignment.Center
        ) {
            Text(name.take(1), color = MaterialTheme.colorScheme.onPrimary)
        }
        Spacer(Modifier.width(12.dp))
        Column(modifier = Modifier.weight(1f)) {
            Text(name, style = MaterialTheme.typography.titleMedium)
            Text(city, style = MaterialTheme.typography.bodySmall)
        }
        TextButton(onClick = { }) { Text("تعديل") }
    }
}`,
          try: R`اعمل composable لكارت منتج: صورة مربعة (Box ملوّن مكانها) على جنب، وجنبها Column فيه الاسم والسعر، وتحت الكارت كله Row فيه زرارين «ضيف للسلة» و «مفضلة» واخدين نفس العرض بـ [[weight(1f)]].`,
          flag: "script",
          deep: {
            why: R`كل شاشة في أي تطبيق هي Column و Row و Box جوه بعض. لو اتقنت الـ arrangement والـ alignment والـ weight، هتعمل أي تصميم يجيلك من Figma.`,
            how: R`Compose بيقيس كل عنصر مرة واحدة بس (single pass)، فالـ layouts المتداخلة مش مشكلة في الأداء زي ما كانت في XML القديم.

الأب بيدي كل ابن «قيود» (constraints): أقل وأكتر عرض وطول مسموح. والابن بيختار مقاسه جواها. [[fillMaxWidth()]] بتقول «خد أكبر عرض مسموح».

[[weight]] بيتحسب بعد العناصر اللي ملهاش weight: Row بيقيس الـ Box والـ Spacer والزرار الأول، واللي فاضل بيروح للـ Column.

ولو العناصر أكتر من الشاشة، Column و Row مبيعملوش scroll لوحدهم. محتاج [[Modifier.verticalScroll(rememberScrollState())]] لكام عنصر، أو [[LazyColumn]] للستات الطويلة (الدرس بعد الجاي).

ولما تحتاج layout أعقد (عناصر بتترص على كذا سطر): [[FlowRow]]، أو [[ConstraintLayout]] من مكتبة منفصلة.`,
            when: "Column للفورم والشاشات العادية، و Row لسطر فيه أيقونة ونص وزرار، و Box للطبقات (badge، أو loading فوق المحتوى، أو زرار عايم).",
            mistakes: R`تحط [[fillMaxWidth]] على عنصر جوه Row وتستغرب إن اللي بعده اختفى: خد العرض كله. استخدم [[weight(1f)]]. وتحط [[weight]] برا Row أو Column فمش هيلاقيها (هي متاحة بس جوه الـ scope بتاعهم). وتخلط arrangement و alignment: الـ arrangement على المحور الرئيسي (رأسي في Column)، والـ alignment على المحور التاني.`
          },
          lines: [
            R`[[@Composable]].`,
            "بياخد الاسم والمدينة.",
            R`[[Row]]: جنب بعض.`,
            "واخد العرض كله ومسافة 16dp من كل ناحية.",
            "العناصر في نص الارتفاع.",
            "قفلة parameters الـ Row.",
            R`[[Box]] للصورة الرمزية.`,
            R`56dp، مقصوص دايرة بـ [[clip(CircleShape)]]، ولونه primary من الثيم.`,
            "اللي جواه في النص بالظبط.",
            "قفلة parameters الـ Box.",
            R`أول حرف من الاسم بلون مناسب فوق الـ primary.`,
            "قفلة Box.",
            "مسافة 12dp.",
            R`[[Column]] بياخد كل العرض الفاضي بـ [[weight(1f)]].`,
            "الاسم بخط العناوين.",
            "المدينة بخط صغير.",
            "قفلة Column.",
            R`زرار نصي على الطرف التاني، والـ onClick فاضي مؤقتًا.`,
            "قفلة Row.",
            "قفلة الدالة."
          ],
          sol: R`الشكل: دايرة ملونة فيها أول حرف، وجنبها الاسم والمدينة تحت بعض، والزرار في الطرف التاني. في العربي الترتيب بيتقلب لوحده: الدايرة على اليمين والزرار على الشمال.

وحل التجربة تحت. لاحظ إن الزرارين ليهم [[weight(1f)]] فبياخدوا نفس العرض، و [[Arrangement.spacedBy]] بتحط مسافة بينهم.`,
          solCode: R`@Composable
fun ProductCard(name: String, price: Double) {
    Card(modifier = Modifier.fillMaxWidth().padding(16.dp)) {
        Column(Modifier.padding(16.dp)) {
            Row(verticalAlignment = Alignment.CenterVertically) {
                Box(Modifier.size(64.dp).background(Color.LightGray))
                Spacer(Modifier.width(12.dp))
                Column {
                    Text(name, style = MaterialTheme.typography.titleMedium)
                    Text("$price ج.م", color = MaterialTheme.colorScheme.primary)
                }
            }
            Spacer(Modifier.height(12.dp))
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                Button(onClick = { }, modifier = Modifier.weight(1f)) { Text("ضيف للسلة") }
                OutlinedButton(onClick = { }, modifier = Modifier.weight(1f)) { Text("مفضلة") }
            }
        }
    }
}`
        },
        {
          cmd: "التنسيق والـ Modifiers في Compose",
          title: "الـ Modifier: الحجم والمسافة والخلفية والضغط، وليه الترتيب بيفرق؟",
          desc: R`الـ [[Modifier]] سلسلة تعديلات على أي عنصر: الحجم، والمسافة، والخلفية، والشكل، والضغط. بتبدأ بـ [[Modifier]] وتسلسل بالنقطة:
[[Modifier.padding(8.dp).background(Color.Red).clickable { }]]

أشهرهم:
• الحجم: [[size(48.dp)]] و [[width]] و [[height]] و [[fillMaxWidth()]] و [[fillMaxSize()]].
• المسافة: [[padding(16.dp)]]، أو [[padding(horizontal = 12.dp, vertical = 6.dp)]].
• الشكل: [[background(color)]] و [[clip(RoundedCornerShape(12.dp))]] و [[border(1.dp, Color.Gray)]].
• التفاعل: [[clickable { }]].

أهم قاعدة: الترتيب بيفرق، لأن كل modifier بيلف اللي بعده. اقرا السلسلة من الشمال لليمين كأنك بتلف طبقات:
• [[background]] ثم [[padding]]: اللون تحت المسافة كمان (المسافة جوه اللون).
• [[padding]] ثم [[background]]: المسافة برا اللون (زي margin).

وعشان كده في Compose مفيش margin: الـ padding قبل الـ background هو الـ margin.

والقاعدة التانية: اللي بيعمل composable بيستقبل [[modifier: Modifier = Modifier]] ويحطه على أول عنصر جواه (الـ root). كده اللي بيستخدمه يقدر يتحكم في مكانه من برا.`,
          example: R`@Composable
fun Tag(text: String, onClick: () -> Unit, modifier: Modifier = Modifier) {
    Text(
        text = text,
        modifier = modifier
            .clip(RoundedCornerShape(12.dp))
            .background(MaterialTheme.colorScheme.secondaryContainer)
            .clickable { onClick() }
            .padding(horizontal = 12.dp, vertical = 6.dp)
    )
}
@Composable
fun OrderDemo() {
    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Box(Modifier.background(Color.Yellow).padding(16.dp)) { Text("background الأول") }
        Box(Modifier.padding(16.dp).background(Color.Yellow)) { Text("padding الأول") }
        Tag("Kotlin", onClick = { }, modifier = Modifier.padding(start = 16.dp))
    }
}`,
          try: R`في الـ Tag بدّل مكان [[.clickable]] و [[.padding(...)]] الأخيرة، ودوس على طرف الـ tag في الـ emulator: هتلاحظ إن منطقة الضغط صغرت. وبعدين حط [[border(2.dp, Color.Red)]] في ٣ أماكن مختلفة في السلسلة وقارن.`,
          flag: "script",
          deep: {
            why: R`أغلب مشاكل الشكل في Compose («ليه المسافة دي برا اللون؟» أو «ليه الضغط على جزء بس؟») سببها ترتيب الـ modifiers. ولما تفهم إنها طبقات بتتلف، هتعرف تعمل أي شكل.`,
            how: R`كل modifier بيلف اللي بعده في سلسلة. [[padding]] بيصغّر المساحة اللي بيديها للي بعده. فـ [[clickable]] قبل [[padding]] معناها إن منطقة الضغط تشمل المسافة (الأحسن للمستخدم)، وبعدها معناها إن المسافة مش بتستجيب.

و [[clip]] لازم ييجي قبل [[background]] و [[clickable]]، عشان اللون وتأثير الضغط (ripple) يتقصوا على الشكل الدايري.

الـ Modifier immutable: كل نقطة بترجّع Modifier جديد، فتقدر تعمل [[val cardModifier = Modifier.padding(8.dp)]] وتعيد استخدامه.

ولمساحة الضغط: Material بيوصي إن أي حاجة بتتداس متقلش عن 48dp. [[minimumInteractiveComponentSize()]] بتضمن ده.`,
            when: "في كل composable تقريبًا. واستقبل modifier في أي composable هيتستخدم في أكتر من مكان.",
            mistakes: R`[[padding]] بعد [[clickable]] وتستغرب إن الضغط على الأطراف مش شغال. و [[clip]] بعد [[background]] فاللون يطلع مربع. وتعمل composable من غير parameter [[modifier]]، فاللي بيستخدمه يلفه في Box زيادة عشان يحط padding. وتحط الـ modifier اللي جاي من برا على عنصر جوه مش على الـ root.`
          },
          lines: [
            R`[[@Composable]].`,
            R`tag بياخد نص، و [[onClick]] نوعه [[() -> Unit]]، و modifier اختياري.`,
            R`[[Text]].`,
            "النص.",
            "بنبدأ من الـ modifier اللي جاي من برا.",
            R`[[clip]] الأول: قص على شكل مستطيل بأركان دايرية.`,
            "لون الخلفية من الثيم (متقصوص على الشكل).",
            R`[[clickable]] قبل الـ padding: المسافة جوه منطقة الضغط.`,
            "المسافة الداخلية حوالين النص.",
            "قفلة Text.",
            "قفلة.",
            R`[[@Composable]].`,
            "composable للمقارنة.",
            "عناصر تحت بعض بمسافة 8dp.",
            "اللون الأول: الأصفر واخد النص والمسافة.",
            "المسافة الأول: المسافة برا والأصفر على النص بس.",
            R`الـ Tag، ومن برا بنزوّد مسافة من البداية ([[start]] بتبقى يمين في العربي).`,
            "قفلة Column.",
            "قفلة."
          ],
          sol: R`الـ Box الأول: مستطيل أصفر كبير والنص جواه بمسافة. التاني: مستطيل أصفر صغير على قد النص، ومسافة فاضية حواليه. ده الفرق بين padding و margin.

ولما تحط [[clickable]] بعد الـ padding الأخيرة: الضغط على النص نفسه بس هو اللي بيشتغل، والأطراف لأ، وتأثير الـ ripple بيظهر على مساحة النص بس.

والـ border: قبل الـ clip بيطلع مربع حوالين الشكل، وبعد الـ clip وقبل الـ padding بيطلع على حواف الشكل الدايرية، وبعد الـ padding بيطلع جوه حوالين النص بس.`
        },
        {
          cmd: "LazyColumn",
          title: "LazyColumn: لستة طويلة بترسم اللي ظاهر بس، و items و key",
          desc: R`لو عندك ١٠٠٠ ملاحظة وحطيتهم في Column، Compose هيرسم الألف مرة واحدة والتطبيق هيبقى تقيل. [[LazyColumn]] بترسم اللي ظاهر على الشاشة بس، ولما تعمل scroll بترسم الجديد وتشيل اللي خرج.

جوه LazyColumn مش بتكتب composables على طول، بتستخدم دوال بتوصف المحتوى:
• [[item { }]]: عنصر واحد (عنوان مثلًا).
• [[items(list) { note -> ... }]]: عنصر لكل حاجة في الـ List. [[note ->]] اسم العنصر.
• [[key = { it.id }]]: مفتاح فريد لكل عنصر. ده بيخلي Compose يعرف العنصر لو اتحرك أو اتمسح، فيحافظ على الـ state بتاعه والـ scroll صح.

وفيه [[LazyRow]] أفقي، و [[LazyVerticalGrid(columns = GridCells.Fixed(2))]] للشبكة.

و [[contentPadding]] مسافة حوالين المحتوى كله (من غير ما تقص الـ scroll)، و [[verticalArrangement = Arrangement.spacedBy(8.dp)]] مسافة بين العناصر.

و [[Card(onClick = { })]] كارت Material بيتداس.`,
          example: R`data class Note(val id: Long, val title: String)
@Composable
fun NotesList(notes: List<Note>, onNoteClick: (Note) -> Unit, modifier: Modifier = Modifier) {
    LazyColumn(
        modifier = modifier,
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        item {
            Text("ملاحظاتك ($__{notes.size})", style = MaterialTheme.typography.titleLarge)
        }
        items(notes, key = { it.id }) { note ->
            Card(onClick = { onNoteClick(note) }, modifier = Modifier.fillMaxWidth()) {
                Text(note.title, modifier = Modifier.padding(16.dp))
            }
        }
    }
}`,
          try: R`اعمل List فيها ٢٠٠ ملاحظة بـ [[List(200) { Note(it.toLong(), "ملاحظة رقم $it") }]] واعرضها. ضيف [[item]] في الآخر فيه «خلصت». وبعدين حوّلها لـ [[LazyVerticalGrid(columns = GridCells.Fixed(2))]] وشوف الفرق.`,
          flag: "script",
          deep: {
            why: R`أغلب شاشات التطبيقات لستات: رسايل، منتجات، أوردرات، إشعارات. و LazyColumn هي البديل الأبسط بكتير لـ RecyclerView في XML (اللي كان محتاج Adapter و ViewHolder وكلاسات كتير).`,
            how: R`الـ block اللي جوه LazyColumn مش composable: هو DSL بيسجّل «فيه عنصر هنا، وده شكله». والـ LazyColumn بيقيس الشاشة ويرسم بس العناصر اللي داخلة في المساحة، وكام عنصر زيادة قبل وبعد.

من غير [[key]]، Compose بيعرف العناصر بمكانها (الأول، التاني...). لو مسحت أول عنصر، كله بيتزق، والـ state اللي جوه العناصر (زي checkbox متعلّم) ممكن ينتقل للعنصر الغلط. مع [[key]] بيعرفهم بالـ id.

والـ key لازم يبقى فريد، ولازم ينفع يتحفظ في Bundle (رقم أو نص). لو اتكرر التطبيق بيقع بـ [[IllegalArgumentException: Key ... was already used]].

[[rememberLazyListState()]] بيديك مكان الـ scroll، و [[animateScrollToItem(0)]] (من coroutine) بترجع لأول اللستة. و [[Modifier.animateItem()]] على العنصر بيعمل animation لما يتحرك أو يتمسح.`,
            when: R`أي لستة عدد عناصرها مش ثابت أو ممكن يكبر. ولو ٥ عناصر ثابتة، Column عادي أبسط.`,
            mistakes: R`تحط LazyColumn جوه Column عليه [[verticalScroll]]: بيقع بـ [[Vertically scrollable component was measured with an infinity maximum height constraints]]. خلي اللستة نفسها هي اللي بتعمل scroll، وحط العناوين جواها بـ [[item]]. وتنسى [[key]] في لستة بتتمسح منها عناصر. وتعمل sort أو filter تقيل جوه الـ LazyColumn block: اعمله في الـ ViewModel.`
          },
          lines: [
            "الـ data class بتاع الملاحظة.",
            R`[[@Composable]].`,
            R`بياخد الملاحظات، و lambda بتتنادى لما واحدة تتداس.`,
            R`[[LazyColumn]].`,
            "الـ modifier اللي جاي من برا.",
            "مسافة حوالين المحتوى كله.",
            "8dp بين كل عنصر والتاني.",
            "قفلة الـ parameters.",
            R`[[item]]: عنصر واحد في الأول.`,
            "عنوان فيه العدد.",
            "قفلة item.",
            R`[[items]]: عنصر لكل ملاحظة، والـ id هو المفتاح.`,
            "كارت بيتداس، وبيبلّغ مين اللي اتداس.",
            "العنوان جوه الكارت.",
            "قفلة الكارت.",
            "قفلة items.",
            "قفلة LazyColumn.",
            "قفلة."
          ],
          sol: R`اللستة بتعمل scroll ناعم حتى بـ ٢٠٠ عنصر (ولو بـ ١٠٠٠٠)، لأن اللي بيترسم فعلًا هو اللي على الشاشة بس. و [[List(200) { ... }]] بتعمل List بـ 200 عنصر، و [[it]] جوه الـ lambda هو الـ index.

مع [[LazyVerticalGrid]] جوه الـ block بتستخدم نفس [[item]] و [[items]]، والعناصر بتترص عمودين. ولو عايز العنوان ياخد العرض كله: [[item(span = { GridItemSpan(maxLineSpan) }) { ... }]].`,
          solCode: R`@Composable
fun NotesGrid() {
    val notes = remember { List(200) { Note(it.toLong(), "ملاحظة رقم $it") } }
    LazyVerticalGrid(
        columns = GridCells.Fixed(2),
        contentPadding = PaddingValues(16.dp),
        horizontalArrangement = Arrangement.spacedBy(8.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(notes, key = { it.id }) { note ->
            Card { Text(note.title, Modifier.padding(16.dp)) }
        }
        item(span = { GridItemSpan(maxLineSpan) }) {
            Text("خلصت", Modifier.padding(16.dp))
        }
    }
}`
        },
        {
          cmd: "Material 3 و Theme",
          title: "Material 3: الثيم والألوان و dark mode و Scaffold و TopAppBar",
          desc: R`[[MaterialTheme]] بيلف التطبيق كله ويدي كل العناصر ٣ حاجات:
• [[colorScheme]]: الألوان بأسماء ليها معنى: [[primary]] (لون البراند)، و [[onPrimary]] (اللي بيتكتب فوقه)، و [[surface]] و [[background]] و [[error]] و [[secondaryContainer]]...
• [[typography]]: أحجام الخطوط: [[headlineSmall]] و [[titleMedium]] و [[bodyLarge]] و [[labelSmall]]...
• [[shapes]]: أشكال الأركان.

وفي الكود بتقرا منه: [[MaterialTheme.colorScheme.primary]] بدل ما تكتب لون ثابت. كده الـ dark mode بيشتغل لوحده، ولو غيّرت لون البراند بيتغير في كل حتة.

المشروع الجديد بيعمل ملف [[ui/theme/Theme.kt]] فيه composable زي [[NotesTheme]]:
• [[isSystemInDarkTheme()]]: الموبايل على الوضع الليلي؟
• dynamic color: من Android 12، الألوان ممكن تتاخد من خلفية موبايل اليوزر ([[dynamicLightColorScheme(context)]]).
• غير كده بتستخدم ألوانك: [[lightColorScheme(primary = ...)]].

و [[Scaffold]] الهيكل الجاهز للشاشة: [[topBar]] و [[bottomBar]] و [[floatingActionButton]] و [[snackbarHost]]، وبيديك [[padding]] لازم تحطه على المحتوى عشان ميتداريش تحت البارات.

و [[@OptIn(ExperimentalMaterial3Api::class)]]: بعض الـ APIs متعلّمة experimental (ممكن تتغير في نسخة جاية)، والـ OptIn بيقول «عارف ومستعد». و [[::class]] معناها «الكلاس نفسه كقيمة».`,
          example: R`@Composable
fun NotesTheme(darkTheme: Boolean = isSystemInDarkTheme(), content: @Composable () -> Unit) {
    val context = LocalContext.current
    val colors = when {
        Build.VERSION.SDK_INT >= Build.VERSION_CODES.S ->
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        darkTheme -> darkColorScheme(primary = Color(0xFF8AB4F8))
        else -> lightColorScheme(primary = Color(0xFF1A73E8))
    }
    MaterialTheme(colorScheme = colors, typography = Typography(), content = content)
}
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen() {
    Scaffold(
        topBar = { TopAppBar(title = { Text("ملاحظاتي") }) },
        floatingActionButton = { FloatingActionButton(onClick = { }) { Text("+") } }
    ) { padding ->
        Text(
            "أهلًا",
            modifier = Modifier.padding(padding).padding(16.dp),
            color = MaterialTheme.colorScheme.primary,
            style = MaterialTheme.typography.headlineSmall
        )
    }
}`,
          try: R`اعمل Preview لـ HomeScreen مرتين: [[@Preview(uiMode = Configuration.UI_MODE_NIGHT_YES)]] ومن غيرها، والاتنين ملفوفين في [[NotesTheme]]. بعدين جرّب [[Material Theme Builder]] من Google (أداة أونلاين) تطلّع ألوان من لون البراند، وحط الـ colorScheme الناتج في الثيم.`,
          flag: "script",
          deep: {
            why: R`تطبيق ألوانه مكتوبة ثابتة في كل حتة هيطلع شكله وحش في الـ dark mode، وتغيير البراند هيبقى في ١٠٠ ملف. الثيم بيخلي الشكل متسق، والـ Material components (الأزرار والكروت والـ text fields) شكلها جاهز ومظبوط للـ accessibility.`,
            how: R`[[MaterialTheme]] بيحط القيم في [[CompositionLocal]]: طريقة Compose لتعدية قيمة لكل اللي تحت في الشجرة من غير ما تعديها parameter parameter. [[LocalContext.current]] نفس الفكرة: بيجيب الـ Context من الشجرة.

[[content: @Composable () -> Unit]]: parameter نوعه composable lambda. ده اللي بيخلي [[NotesTheme { ... }]] تتكتب بالشكل ده (trailing lambda).

[[Color(0xFF1A73E8)]]: اللون بالـ hex، و [[FF]] في الأول هي الشفافية (FF = مش شفاف خالص).

[[Build.VERSION.SDK_INT >= Build.VERSION_CODES.S]]: فحص نسخة Android وقت التشغيل (S هو Android 12)، لأن الـ dynamic color مش موجود قبلها. وده الشكل اللي هتستخدمه مع أي API أحدث من الـ minSdk.

وكل component بياخد ألوانه الافتراضية من الـ scheme: الـ Button بياخد primary، والـ Card بياخد surfaceContainer... فلو ظبطت الـ scheme صح، نادرًا ما هتحدد لون بإيدك.`,
            when: R`مرة في أول المشروع تظبط الثيم، وبعدين في كل composable استخدم [[MaterialTheme.colorScheme]] و [[MaterialTheme.typography]] بدل القيم الثابتة.`,
            mistakes: R`[[Color.Black]] للنص في كل حتة فيختفي في الـ dark mode. وتنسى [[padding]] اللي جاي من Scaffold فالمحتوى يبقى تحت الـ TopAppBar. وتحط الـ Scaffold جوه composable جوه الثيم وكمان ثيم تاني جواه.`
          },
          lines: [
            R`[[@Composable]].`,
            R`الثيم: dark افتراضيه من إعدادات الموبايل، و [[content]] الشاشة اللي جواه.`,
            R`الـ Context من الشجرة (محتاجينه للـ dynamic color).`,
            R`[[when]] لاختيار الألوان.`,
            "Android 12 وطالع:",
            "ألوان من خلفية اليوزر، ليلي أو نهاري.",
            "أقدم من 12 وليلي: ألواننا الليلية.",
            "غير كده: ألواننا النهارية.",
            "قفلة when.",
            R`[[MaterialTheme]] بالألوان والخطوط، وجواه المحتوى.`,
            "قفلة.",
            R`[[@OptIn]]: TopAppBar ممكن يبقى متعلّم experimental.`,
            R`[[@Composable]].`,
            "شاشة.",
            R`[[Scaffold]].`,
            "بار فوق فيه العنوان.",
            "زرار عايم.",
            R`[[padding]]: المسافة اللي البارات واخداها.`,
            "نص.",
            "المحتوى.",
            "مسافة البارات ثم مسافتنا.",
            "لون من الثيم.",
            "خط من الثيم.",
            "قفلة Text.",
            "قفلة Scaffold.",
            "قفلة."
          ],
          sol: R`في الـ Preview الليلي الخلفية غامقة والنص فاتح لوحده، من غير ما تغيّر سطر في HomeScreen. ده لأن كل الألوان جاية من الـ colorScheme.

ملاحظة: الـ Preview مبيعرضش الـ dynamic color بألوان خلفية حقيقية، فممكن تشوف ألوان افتراضية. جرّب على emulator Android 12+ وغيّر الخلفية وشوف ألوان التطبيق بتتغير.`,
          solCode: R`@Preview(name = "Light")
@Preview(name = "Dark", uiMode = Configuration.UI_MODE_NIGHT_YES)
@Composable
fun HomePreview() {
    NotesTheme {
        HomeScreen()
    }
}`
        }
      ]
    },
    {
      t: "Compose: الـ state والتنقل",
      l: 2,
      n: "remember و mutableStateOf و rememberSaveable، ورفع الـ state لفوق، والتنقل بين الشاشات، والـ ViewModel و StateFlow",
      items: [
        {
          cmd: "remember و state",
          title: "remember و mutableStateOf و rememberSaveable: الشاشة تتحدث لوحدها إزاي؟",
          desc: R`في Compose الشاشة دالة في الـ state: لما الـ state يتغير، الدالة بتتنادى تاني (recomposition) والشاشة ترسم القيمة الجديدة. بس Compose لازم «يعرف» إن القيمة اتغيرت. متغير Kotlin عادي ([[var count = 0]]) مش هيحرّك حاجة.

• [[mutableStateOf(0)]]: صندوق قيمة Compose بيراقبه. أي composable قرا قيمته، هيتعاد رسمه لما تتغير.
• [[remember { ... }]]: افتكر القيمة دي بين مرات الرسم. من غيرها، كل recomposition هيعمل صندوق جديد بصفر.
• [[by]]: بدل ما تكتب [[count.value]] و [[count.value = 1]]، الـ [[by]] (اسمها property delegate) بتخليك تكتب [[count]] و [[count++]] على طول. محتاجة import لـ [[getValue]] و [[setValue]] (Android Studio بيقترحهم).
• [[mutableIntStateOf(0)]]: نسخة للأرقام من غير boxing (أخف شوية).

بس [[remember]] بتنسى لما الـ Activity تتعمل من الأول (rotation مثلًا). [[rememberSaveable]] بتحفظ القيمة في الـ Bundle فبتعيش بعد الـ rotation وبعد ما النظام يقتل التطبيق في الخلفية. استخدمها لأي حاجة اليوزر كتبها أو اختارها.

و [[OutlinedTextField(value, onValueChange)]]: الـ text field في Compose مبيحفظش النص لوحده. انت بتديله [[value]]، ولما اليوزر يكتب بيناديلك [[onValueChange]] بالنص الجديد وانت اللي تحدّث الـ state. لو محدثتهوش، الكتابة مش هتظهر.`,
          example: R`@Composable
fun Counter() {
    var count by remember { mutableIntStateOf(0) }
    var name by rememberSaveable { mutableStateOf("") }
    Column(Modifier.padding(16.dp), verticalArrangement = Arrangement.spacedBy(8.dp)) {
        Text("العدد: $count")
        Button(onClick = { count++ }) { Text("زوّد") }
        OutlinedTextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("اسمك") }
        )
        if (name.isNotBlank()) {
            Text("أهلًا يا $name")
        }
    }
}`,
          try: R`شغّل الـ Counter، زوّد العدد لـ 5 واكتب اسمك، وبعدين لف الـ emulator. هتلاقي الاسم فضل والعدد رجع صفر. غيّر [[remember]] لـ [[rememberSaveable]] في العدد وجرّب تاني. وبعدين شيل [[remember]] خالص ([[var count by mutableIntStateOf(0)]]) وشوف Android Studio هيقول إيه.`,
          flag: "script",
          deep: {
            why: R`ده قلب Compose كله. أي حاجة بتتغير على الشاشة (نص بيتكتب، checkbox، tab مختار، dialog مفتوح) هي state. ولو حطيتها في متغير عادي أو نسيت remember، الشاشة مش هتتحدث أو هتتصفّر، وده أكتر سؤال بيتسأل من المبتدئين.`,
            how: R`[[mutableStateOf]] بيرجّع [[MutableState<T>]]: object فيه [[value]]. لما composable يقرا [[value]] وهو بيترسم، نظام اسمه snapshot بيسجّل «الـ composable ده بيعتمد على الـ state ده». ولما حد يكتب قيمة جديدة، Compose بيعلّم الـ composable ده إنه محتاج يترسم تاني في الـ frame الجاي. والقيمة الجديدة لازم تبقى «مختلفة» (بـ ==) عشان يحصل recomposition.

[[remember]] بيخزن القيمة في الـ Composition نفسه في مكان الـ composable. لو الـ composable اختفى من الشاشة (if بقت false)، الـ remember بتاعه بيتنسي.

[[rememberSaveable]] بيستخدم الـ saved instance state بتاع الـ Activity، فالقيمة لازم تتحفظ في Bundle (نصوص وأرقام و Parcelable). لأي حاجة تانية محتاج [[Saver]].

ولو عندك List بتتغير: [[mutableStateListOf()]]، أو الأحسن List عادية read-only جوه mutableStateOf وتبدّلها بواحدة جديدة.`,
            when: R`[[remember]] لـ state صغير ومؤقت يخص الـ UI (animation، dropdown مفتوح). [[rememberSaveable]] لأي حاجة اليوزر هيزعل لو ضاعت. والـ state الحقيقي بتاع الشاشة (داتا من السيرفر) مكانه الـ ViewModel.`,
            mistakes: R`[[var count = 0]] جوه composable: مبيتحدثش. و [[mutableStateOf]] من غير [[remember]]: بيتصفّر مع كل رسمة (Android Studio بيحذّرك: [[Creating a state object during composition without using remember]]). و [[val list = remember { mutableListOf<String>() }]] وتعمل [[add]]: الـ MutableList العادية Compose مش بيراقبها، فالشاشة مش هتتحدث.`
          },
          lines: [
            R`[[@Composable]].`,
            "شاشة.",
            R`عدد: [[remember]] بيفتكره بين الرسمات، و [[by]] عشان نكتب count على طول.`,
            R`اسم: [[rememberSaveable]] فبيعيش بعد الـ rotation.`,
            "عمود بمسافات.",
            "قراية count: الـ Text ده هيترسم تاني لما يتغير.",
            "كل ضغطة بتغيّر الـ state، فالشاشة بتتحدث.",
            "حقل كتابة.",
            "القيمة اللي بتظهر جواه من الـ state.",
            "لما اليوزر يكتب: نحدّث الـ state بالنص الجديد (it).",
            "العنوان الصغير فوق الحقل.",
            "قفلة الحقل.",
            "لو فيه اسم...",
            "...اعرض الترحيب.",
            "قفلة if.",
            "قفلة Column.",
            "قفلة."
          ],
          sol: R`بعد اللفة: الاسم موجود (rememberSaveable) والعدد صفر (remember اتنسى مع الـ Activity القديمة). ولما تغيّر العدد لـ [[rememberSaveable { mutableIntStateOf(0) }]] الاتنين بيفضلوا.

ولما تشيل remember، Android Studio بيعلّم السطر بالأحمر بـ lint اسمه [[UnrememberedMutableState]]، ولو شغّلت: العدد مش هيزيد أبدًا، لأن كل ضغطة بتعمل recomposition وكل recomposition بيعمل state جديد بصفر.`
        },
        {
          cmd: "state hoisting",
          title: "state hoisting: تطلّع الـ state لفوق وتخلي الـ composable يبلّغ بالأحداث",
          desc: R`الـ composable اللي جواه state بتاعه صعب تتحكم فيه من برا وصعب تختبره. الحل اسمه [[state hoisting]] (رفع الـ state): الـ composable ياخد القيمة كـ parameter، ولما حاجة تحصل يبلّغ بـ lambda:
[[SearchBox(query: String, onQueryChange: (String) -> Unit)]]

القاعدة بتتقال كده: الـ state بينزل لتحت، والأحداث بتطلع لفوق. ده اسمه unidirectional data flow (الداتا ماشية في اتجاه واحد). وده نفس اللي [[TextField]] نفسه بيعمله: [[value]] و [[onValueChange]].

النتيجة:
• [[SearchBox]] بقى stateless: بيرسم اللي اتبعتله وبس. تقدر تعمله Preview بأي قيمة، وتستخدمه في أي شاشة.
• [[ProductsScreen]] هو صاحب الـ state ([[query]])، فيقدر يستخدمه في حاجة تانية (الفلترة).

ترفع الـ state لحد فين؟ لأقرب أب مشترك لكل اللي محتاجينه. هنا الـ query محتاجها الـ SearchBox والفلترة، فمكانها ProductsScreen. ولو محتاجها كمان منطق business أو API، يطلع للـ ViewModel.`,
          example: R`@Composable
fun SearchBox(query: String, onQueryChange: (String) -> Unit, modifier: Modifier = Modifier) {
    OutlinedTextField(
        value = query,
        onValueChange = onQueryChange,
        placeholder = { Text("دوّر...") },
        singleLine = true,
        modifier = modifier.fillMaxWidth()
    )
}
@Composable
fun ProductsScreen(all: List<String>) {
    var query by rememberSaveable { mutableStateOf("") }
    val shown = all.filter { it.contains(query, ignoreCase = true) }
    Column(Modifier.padding(16.dp)) {
        SearchBox(query = query, onQueryChange = { query = it })
        Text("$__{shown.size} نتيجة")
        shown.forEach { Text(it) }
    }
}`,
          try: R`اعمل [[QuantityPicker(quantity: Int, onQuantityChange: (Int) -> Unit)]] فيه زرار [[-]] ورقم وزرار [[+]]، ومينزلش تحت 1. استخدمه في شاشة فيها سعر الوحدة 85، والإجمالي بيتحسب تحت. واعمله Preview بكمية 3 من غير أي state.`,
          flag: "script",
          deep: {
            why: R`لما الـ state يبقى في مكان واحد، فيه «مصدر حقيقة واحد» (single source of truth): مفيش نسختين من نفس القيمة يختلفوا عن بعض. والـ composables الـ stateless أسهل تتختبر وتتعاد استخدامها وتتعرض في Preview.`,
            how: R`[[onValueChange = onQueryChange]]: بنعدّي الـ lambda نفسها من غير ما نلفها، لأن النوع واحد [[(String) -> Unit]].

[[all.filter { ... }]] جوه الـ composable بتتحسب مع كل recomposition. للستة صغيرة مش مشكلة. للكبيرة: [[val shown = remember(all, query) { all.filter { ... } }]] بتتحسب بس لما all أو query يتغيروا، أو الأحسن الفلترة تبقى في الـ ViewModel.

[[shown.forEach { Text(it) }]] جوه Column: شغال للعدد الصغير، ولستة طويلة استخدم LazyColumn.

وفي الشاشات الكبيرة النمط المعتاد: composable «route» بيكلم الـ ViewModel ويجيب الـ state، وجواه composable «screen» stateless بياخد الـ state والـ lambdas. الـ screen هو اللي بتعمله Preview واختبار UI.`,
            when: R`أي composable هيتستخدم في أكتر من مكان، أو محتاج تعمله Preview أو اختبار، أو الـ state بتاعه محتاجه حد تاني. والـ state اللي محدش برا محتاجه (زي dropdown مفتوح ولا لأ) ينفع يفضل جوه.`,
            mistakes: R`ترفع كل حاجة لفوق لحد الـ Activity من غير لازمة. أو العكس: تحط state جوه SearchBox وكمان نسخة في الشاشة ويختلفوا. وتنسى تنادي [[onValueChange]] فالـ text field يبقى مقفول (اليوزر بيكتب ومفيش حاجة بتظهر).`
          },
          lines: [
            R`[[@Composable]].`,
            R`stateless: بياخد القيمة والـ lambda، ومفيش state جواه.`,
            "حقل الكتابة.",
            "القيمة من برا.",
            "أي كتابة بتطلع لفوق على طول.",
            "النص الباهت لما الحقل فاضي.",
            "سطر واحد.",
            "عرض كامل.",
            "قفلة.",
            "قفلة.",
            R`[[@Composable]].`,
            "الشاشة صاحبة الـ state.",
            "الـ state هنا.",
            R`الفلترة، و [[ignoreCase]] عشان الحروف الكبيرة والصغيرة.`,
            "عمود.",
            "بنبعت القيمة ونستقبل التغيير.",
            "عدد النتايج.",
            "كل نتيجة في سطر.",
            "قفلة Column.",
            "قفلة."
          ],
          sol: R`لما تكتب في الـ SearchBox، الحدث بيطلع للشاشة، الشاشة تغيّر [[query]]، و Compose يعيد رسم الاتنين: الـ SearchBox بالنص الجديد، واللستة متفلترة.

وحل التجربة تحت: [[QuantityPicker]] مفيهوش [[remember]] خالص، فتقدر تعمله Preview بـ [[QuantityPicker(3, { })]]. و [[coerceAtLeast(1)]] بتمنع النزول تحت 1.`,
          solCode: R`@Composable
fun QuantityPicker(quantity: Int, onQuantityChange: (Int) -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        OutlinedButton(onClick = { onQuantityChange((quantity - 1).coerceAtLeast(1)) }) { Text("-") }
        Text("$quantity", Modifier.padding(horizontal = 16.dp))
        OutlinedButton(onClick = { onQuantityChange(quantity + 1) }) { Text("+") }
    }
}

@Composable
fun CartLine(unitPrice: Int = 85) {
    var qty by rememberSaveable { mutableIntStateOf(1) }
    Column(Modifier.padding(16.dp)) {
        QuantityPicker(quantity = qty, onQuantityChange = { qty = it })
        Text("الإجمالي: $__{qty * unitPrice} ج.م")
    }
}

@Preview
@Composable
fun QuantityPickerPreview() {
    QuantityPicker(quantity = 3, onQuantityChange = { })
}`
        },
        {
          cmd: "Navigation Compose",
          title: "تتنقل بين الشاشات إزاي؟ (Navigation Compose بـ routes من نوع @Serializable)",
          desc: R`في تطبيق Compose غالبًا Activity واحدة، والشاشات composables. مكتبة [[Navigation Compose]] ([[androidx.navigation:navigation-compose]]) بتدير مين ظاهر، والـ back stack (لستة الشاشات اللي ورا بعض، والـ Back بيرجع للي قبلها).

من نسخة 2.8 الـ routes بقت type-safe: كل شاشة نوع Kotlin عليه [[@Serializable]]:
• شاشة من غير بيانات: [[@Serializable object Home]].
• شاشة محتاجة بيانات: [[@Serializable data class NoteDetails(val id: Long)]].

الأجزاء:
• [[rememberNavController()]]: اللي بيتحكم في التنقل.
• [[NavHost(navController, startDestination = Home) { ... }]]: المكان اللي الشاشة الحالية بتترسم فيه، وجواه الخريطة.
• [[composable<Home> { ... }]]: «لما الـ route يبقى Home ارسم ده». الـ [[< >]] هنا بتحدد النوع.
• [[navController.navigate(NoteDetails(5))]]: روح للشاشة دي.
• [[backStackEntry.toRoute<NoteDetails>()]]: اقرا البيانات اللي اتبعتت.
• [[navController.popBackStack()]]: ارجع.

[[@Serializable]] محتاجة plugin الـ kotlinx.serialization في Gradle ([[org.jetbrains.kotlin.plugin.serialization]]) ومكتبة [[kotlinx-serialization-json]].

والعرف المهم: الشاشة نفسها متعرفش حاجة عن الـ navController. بتاخد lambdas زي [[onOpenNote: (Long) -> Unit]]، والـ NavHost هو اللي يقرر يعمل إيه. كده الشاشة تتعمل Preview وتتختبر لوحدها.`,
          example: R`@Serializable
object Home
@Serializable
data class NoteDetails(val id: Long)
@Composable
fun AppNavHost() {
    val navController = rememberNavController()
    NavHost(navController = navController, startDestination = Home) {
        composable<Home> {
            HomeScreen(onOpenNote = { id -> navController.navigate(NoteDetails(id)) })
        }
        composable<NoteDetails> { backStackEntry ->
            val route = backStackEntry.toRoute<NoteDetails>()
            NoteDetailsScreen(id = route.id, onBack = { navController.popBackStack() })
        }
    }
}`,
          try: R`اعمل شاشتين: HomeScreen فيها ٣ أزرار لملاحظات 1 و 2 و 3، و NoteDetailsScreen بتعرض «ملاحظة رقم X» وزرار رجوع. وصّلهم بالـ NavHost ده. جرّب زرار Back بتاع الموبايل، وبعدين ضيف شاشة Settings من غير بيانات.`,
          flag: "script",
          deep: {
            why: R`أي تطبيق حقيقي فيه كذا شاشة. والـ type-safe routes بتخلي المترجم يمسك الغلط: لو الشاشة محتاجة [[id]] ونسيته، مش هيترجم. في النسخ القديمة كانت الـ routes نصوص زي [["details/{id}"]] وأي غلطة إملائية بتقع وقت التشغيل.`,
            how: R`الـ Navigation بيحوّل الـ route object لـ URL داخلي من اسم الكلاس والـ properties بتاعته (بـ kotlinx.serialization)، ويحفظ الـ back stack في الـ saved state، فبيعيش بعد الـ rotation و process death.

كل entry في الـ back stack ليه lifecycle و ViewModelStore بتوعه: [[viewModel()]] جوه [[composable<NoteDetails>]] بيعمل ViewModel يعيش طول ما الشاشة دي في الـ stack، ويتمسح لما تخرج منها. وفي الـ ViewModel تقدر تقرا الـ route بـ [[savedStateHandle.toRoute<NoteDetails>()]].

خيارات التنقل: [[navigate(Home) { popUpTo<Home> { inclusive = true } }]] عشان تمسح اللي ورا (بعد login مثلًا)، و [[launchSingleTop = true]] عشان متفتحش نفس الشاشة مرتين فوق بعض.

وفيه مكتبة أحدث من Google اسمها [[Navigation 3]] ([[androidx.navigation3]]، stable من نوفمبر 2025): الـ back stack فيها بقى List انت اللي ماسكها ([[rememberNavBackStack(Home)]] و [[backStack.add(NoteDetails(5))]]) و [[NavDisplay]] بيعرض آخر عنصر. فكرتها أقرب لروح Compose، وبتدّي تحكم أكبر في الشاشات الكبيرة. Navigation Compose لسه هي اللي في أغلب المشاريع الموجودة، فاعرف الاتنين.`,
            when: "أي تطبيق فيه أكتر من شاشة. ولو شاشة واحدة فيها tabs بسيطة، ممكن state عادي يكفي.",
            mistakes: R`تبعت الـ navController للشاشات نفسها فتبقى مربوطة بالـ navigation ومتتعملش Preview. وتبعت object كبير (المنتج كله) في الـ route: ابعت الـ id بس، والشاشة تجيب الباقي من الـ repository. وتنسى plugin الـ serialization فيقع بـ [[Serializer for class 'NoteDetails' is not found]].`
          },
          lines: [
            "الـ annotation اللي بتخلي النوع ينفع route.",
            "شاشة البداية من غير بيانات.",
            "نفس الـ annotation.",
            "شاشة التفاصيل ومعاها id.",
            R`[[@Composable]].`,
            "الـ NavHost بتاع التطبيق.",
            "اللي بيتحكم في التنقل، ومتفتكر بين الرسمات.",
            "المكان اللي الشاشة الحالية بتترسم فيه، والبداية Home.",
            R`لما الـ route يبقى Home.`,
            R`الشاشة بتبلّغ بالـ id، والـ NavHost هو اللي ينقل.`,
            "قفلة.",
            R`لما الـ route يبقى NoteDetails.`,
            R`[[toRoute]]: نقرا البيانات اللي اتبعتت.`,
            "نعرض الشاشة، والرجوع بـ popBackStack.",
            "قفلة.",
            "قفلة NavHost.",
            "قفلة."
          ],
          sol: R`دوسة على «ملاحظة 2» بتفتح التفاصيل بـ [[id = 2]]، و Back (زرار الموبايل أو زرارك) بيرجع للـ Home. لاحظ إن الـ Back بتاع النظام شغال لوحده من غير ما تكتب حاجة، لأن الـ NavHost بيسمعه.

ولو دوست على نفس الملاحظة كذا مرة بسرعة، ممكن تتفتح كذا نسخة فوق بعض. الحل [[navController.navigate(NoteDetails(id)) { launchSingleTop = true }]].

وحل التجربة تحت (مع Settings).`,
          solCode: R`@Serializable
object Settings

@Composable
fun HomeScreen(onOpenNote: (Long) -> Unit, onOpenSettings: () -> Unit) {
    Column(Modifier.padding(16.dp)) {
        for (id in 1L..3L) {
            Button(onClick = { onOpenNote(id) }) { Text("ملاحظة $id") }
        }
        TextButton(onClick = onOpenSettings) { Text("الإعدادات") }
    }
}

@Composable
fun NoteDetailsScreen(id: Long, onBack: () -> Unit) {
    Column(Modifier.padding(16.dp)) {
        Text("ملاحظة رقم $id")
        Button(onClick = onBack) { Text("رجوع") }
    }
}

// في الـ NavHost:
// composable<Home> { HomeScreen(onOpenNote = { navController.navigate(NoteDetails(it)) }, onOpenSettings = { navController.navigate(Settings) }) }
// composable<Settings> { Text("الإعدادات") }`
        },
        {
          cmd: "الـ ViewModel وحفظ البيانات",
          title: "ViewModel و StateFlow: الـ state يعيش بعد الـ rotation والشاشة تقراه بـ collectAsStateWithLifecycle",
          desc: R`الـ [[ViewModel]] كلاس بيمسك state الشاشة والمنطق بتاعها، وبيعيش أطول من الـ Activity: لما الموبايل يلف والـ Activity تتعمل من الأول، نفس الـ ViewModel بيفضل بالداتا اللي فيه. وبيتمسح بس لما الشاشة تخرج نهائيًا.

والشاشة بتقرا منه state بنمط ثابت:
• [[private val _uiState = MutableStateFlow(CartUiState())]]: نسخة بتتغير، و [[private]] فمحدش يغيّرها غير الـ ViewModel. الـ [[_]] في أول الاسم عرف للنسخة الداخلية.
• [[val uiState: StateFlow<CartUiState> = _uiState.asStateFlow()]]: نسخة للقراية بس للشاشة.
• [[_uiState.update { it.copy(...) }]]: تحديث آمن: خد القيمة الحالية ([[it]]) ورجّع نسخة جديدة بـ [[copy]].

[[StateFlow]] (من مكتبة kotlinx.coroutines) قيمة بتتغير مع الوقت، وأي حد بيسمعها بيوصله كل قيمة جديدة. ودايمًا معاها قيمة حالية ([[value]]).

في Compose:
• [[viewModel()]]: بيجيب الـ ViewModel، أو بيعمله أول مرة بس. محتاجة مكتبة [[lifecycle-viewmodel-compose]].
• [[collectAsStateWithLifecycle()]]: بيحوّل الـ StateFlow لـ Compose state، وبيوقف السمع لما الشاشة تبقى في الخلفية. محتاجة [[lifecycle-runtime-compose]].

والشاشة بتبعت أحداث بنداء دوال: [[viewModel.addItem(50.0)]]. الـ state بينزل والأحداث بتطلع، نفس فكرة state hoisting بالظبط.`,
          example: R`data class CartUiState(val count: Int = 0, val total: Double = 0.0)
class CartViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(CartUiState())
    val uiState: StateFlow<CartUiState> = _uiState.asStateFlow()
    fun addItem(price: Double) {
        _uiState.update { it.copy(count = it.count + 1, total = it.total + price) }
    }
    fun clear() {
        _uiState.value = CartUiState()
    }
}
@Composable
fun CartScreen(viewModel: CartViewModel = viewModel()) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
    Column(Modifier.padding(16.dp)) {
        Text("في السلة: $__{state.count} - الإجمالي: $__{state.total}")
        Button(onClick = { viewModel.addItem(50.0) }) { Text("ضيف منتج بـ 50") }
        TextButton(onClick = viewModel::clear) { Text("فضّي السلة") }
    }
}`,
          try: R`ضيف ٣ منتجات ولف الـ emulator: العدد فاضل 3. بعدين جرّب من Android Studio: شغّل التطبيق، دوس Home، ومن Logcat دوس على زرار Terminate Application (المربع الأحمر)، وارجع للتطبيق من الـ recents. العدد هيرجع صفر. ده الفرق بين config change و process death.`,
          flag: "script",
          deep: {
            why: R`من غير ViewModel أي داتا جبتها من السيرفر هتتجاب تاني مع كل لفة، وأي نداء شغال هيتلغي. وكمان الـ ViewModel بيفصل المنطق عن الرسم: الـ Composable يرسم بس، والـ ViewModel يقرر. وده اللي بيخلي المنطق يتختبر بـ unit test عادي من غير موبايل.`,
            how: R`[[viewModel()]] بيدوّر في [[ViewModelStore]] بتاع أقرب [[ViewModelStoreOwner]] (الـ Activity، أو entry الـ navigation). الـ Store ده النظام بيحافظ عليه عبر الـ configuration changes، وبيمسحه (وبينادي [[onCleared()]]) لما الـ owner يخلص فعلًا.

ولو الـ ViewModel محتاج parameters (repository مثلًا)، [[viewModel()]] لوحدها مش هتعرف تعمله. الحل factory، أو Hilt ([[hiltViewModel()]]، المستوى ٣).

process death: لو النظام قتل التطبيق في الخلفية، الـ ViewModel كمان بيروح. اللي لازم يعيش (زي نص بيتكتب أو id الشاشة) حطه في [[SavedStateHandle]]: الـ ViewModel ياخده في الـ constructor، و [[savedStateHandle.getStateFlow("query", "")]] بترجّع StateFlow متحفوظ.

[[update { }]] أأمن من [[_uiState.value = _uiState.value.copy(...)]] لو فيه أكتر من coroutine بيعدّلوا في نفس الوقت، لأنها بتعيد المحاولة لو القيمة اتغيرت في النص.

[[viewModel::clear]]: function reference للدالة على الـ object ده، بدل [[{ viewModel.clear() }]].`,
            when: "كل شاشة فيها state مش تافه أو داتا جاية من برا. الشاشات الصغيرة جدًا (dialog بسيط) ممكن rememberSaveable يكفي.",
            mistakes: R`تحط [[Context]] أو Activity أو View في الـ ViewModel: هو عايش أطول منهم فبيمسكهم في الذاكرة (memory leak). لو محتاج Context للـ resources، الأحسن متحتاجهوش (رجّع ids والشاشة تحوّلها)، أو [[AndroidViewModel]] بالـ Application context. وتعرض [[MutableStateFlow]] public فالشاشة تغيّره من برا. وتستخدم [[collectAsState()]] بدل [[collectAsStateWithLifecycle()]] فالسمع يفضل شغال والتطبيق في الخلفية.`
          },
          lines: [
            "الـ UI state كله في data class واحد بقيم افتراضية.",
            R`الـ ViewModel بيورث من [[ViewModel]].`,
            R`النسخة الداخلية اللي بتتغير، [[private]].`,
            "النسخة اللي الشاشة بتقراها (read-only).",
            "حدث من الشاشة.",
            R`[[update]]: نسخة جديدة بالعدد والإجمالي الجديد.`,
            "قفلة.",
            "حدث تاني.",
            "نرجع للحالة الأولى.",
            "قفلة.",
            "قفلة الكلاس.",
            R`[[@Composable]].`,
            R`الشاشة بتاخد الـ ViewModel، وافتراضيًا [[viewModel()]] بيجيبه أو يعمله.`,
            "نسمع الـ StateFlow كـ Compose state (وبيقف في الخلفية).",
            "عمود.",
            "بنعرض من الـ state.",
            "الضغطة حدث بيطلع للـ ViewModel.",
            R`function reference بـ [[::]].`,
            "قفلة Column.",
            "قفلة."
          ],
          sol: R`بعد اللفة: [[في السلة: 3 - الإجمالي: 150.0]] زي ما هو، لأن الـ Activity الجديدة خدت نفس الـ ViewModel.

بعد Terminate: الـ process اتقتل وكل الـ objects راحت، فالعدد صفر. لو عايز السلة تعيش بعد كده: [[SavedStateHandle]] لحاجة صغيرة، أو الأصح للسلة تتحفظ في DataStore أو Room (دروس جاية).`,
          solCode: R`// نسخة بـ SavedStateHandle: viewModel() بيبعته لوحده لو موجود في الـ constructor
class CartViewModel(private val savedState: SavedStateHandle) : ViewModel() {
    val count: StateFlow<Int> = savedState.getStateFlow("count", 0)

    fun addItem() {
        savedState["count"] = count.value + 1
    }
}`
        }
      ]
    }
]);

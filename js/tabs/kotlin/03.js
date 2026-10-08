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
          teach: R`## الكود ده بيعمل إيه؟

بيعرّف ٣ دوال واجهة: [[Greeting]] بتكتب تحية، و [[HelloButton]] زرار بيكتب سطر log لما يتداس، و [[GreetingPreview]] بتحطهم تحت بعض عشان Android Studio يرسمهم في الـ Preview.

> فين اتجرّب: مفيش emulator ولا موبايل هنا، فاتعمل حاجتين: (١) نفس الكود اتبنى في مشروع Android حقيقي ([[assembleDebug]] بـ AGP 9.4.1 و Compose 1.10.6) وطلع [[app-debug.apk]] من غير أخطاء. (٢) اتشغّل فعلًا على **Compose Multiplatform 1.12.1 للـ Desktop** (نفس Compose بس على JVM) جوه [[docker run --rm eclipse-temurin:21-jdk]]، باختبار UI بيرسم الشاشة من غير شاشة (headless) ويدوس على الزرار. الـ Preview نفسه في Android Studio من الـ docs.

---

## ١. [[@Composable]]: الدالة دي بترسم

~~~kotlin
@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(text = "أهلًا يا $name", modifier = modifier)
}
~~~

| الحتة | معناها |
|---|---|
| [[@Composable]] | annotation: علامة للمترجم إن الدالة دي جزء من الواجهة |
| [[fun Greeting]] | دالة Kotlin عادية، واسمها بحرف كبير بالعرف لأنها «حاجة على الشاشة» |
| [[name: String]] | الداتا اللي هتترسم |
| [[modifier: Modifier = Modifier]] | parameter اختياري، وقيمته الافتراضية [[Modifier]] الفاضي (مفيش أي تعديل) |
| [[Text(text = ..., modifier = modifier)]] | composable جاهز من Material 3 بيرسم نص، وبنعدّيله الـ modifier اللي جالنا من برا |

لاحظ إن الدالة **مبترجّعش** حاجة (مفيش [[: View]] ولا [[return]]). هي بتنادي [[Text]] وخلاص، و Compose هو اللي بيسجّل «هنا فيه نص» في شجرة الواجهة.

### الـ [[@Composable]] بتعمل إيه فعلًا؟

plugin مترجم Compose بيغيّر توقيع الدالة. بصينا على الـ bytecode بـ [[javap]] بعد الترجمة:

~~~text الناتج (javap على الكلاس المترجم)
public static final void Greeting(java.lang.String, androidx.compose.ui.Modifier, androidx.compose.runtime.Composer, int, int);
public static final void HelloButton(androidx.compose.runtime.Composer, int);
public static final void GreetingPreview(androidx.compose.runtime.Composer, int);
~~~

كل دالة خدت parameter زيادة اسمه [[Composer]] (اللي بيتتبع مكانها في الشجرة) وأرقام [[int]] (معلومات عن أنهي parameters اتغيرت وأنهي ليها قيمة افتراضية). عشان كده composable مينفعش يتنادى من دالة عادية: مفيش [[Composer]] تبعته.

---

## ٢. [[Button]] وفيه lambdaتين

~~~kotlin
@Composable
fun HelloButton() {
    Button(onClick = { Log.d("Btn", "اتداس") }) {
        Text("دوس هنا")
    }
}
~~~

- [[onClick = { ... }]]: lambda عادية (مش composable) بتتنفذ لما اليوزر يدوس.
- [[Log.d("Btn", "اتداس")]]: بيكتب سطر في Logcat. [[d]] = debug، و [[Btn]] الـ tag اللي هتفلتر بيه، والتاني الرسالة. ([[Log]] من [[android.util]]، Android بس.)
- [[{ Text("دوس هنا") }]] اللي برا القوسين: trailing lambda (درس lambdas)، وهي **composable** lambda: محتوى الزرار. ممكن تحط فيها أيقونة ونص جنب بعض.

في نسخة الـ Desktop بدّلنا [[Log.d]] بـ [[println("D/Btn: اتداس")]] (لأن [[Log]] مش موجود برا Android)، والاختبار داس على الزرار:

~~~text الناتج
D/Btn: اتداس
~~~

### الغلطة المشهورة: composable جوه [[onClick]]

جربنا نكتب [[Button(onClick = { Greeting("x") })]]، والمترجم رفض (نفس الرسالة على Desktop و Android):

~~~text الناتج
e: Bad.kt:10:24 @Composable invocations can only happen from the context of a @Composable function
~~~

ليه؟ [[onClick]] بتتنفذ بعدين لما حد يدوس، مش وقت الرسم، فمفيش [[Composer]]. الصح: الـ onClick يغيّر state، والشاشة ترسم على أساسه (درس remember و state).

---

## ٣. [[@Preview]] و [[Column]]

~~~kotlin
@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    Column {
        Greeting("Sara")
        HelloButton()
    }
}
~~~

- [[@Preview]]: annotation تانية فوق [[@Composable]]. Android Studio بيدوّر عليها ويرسم الدالة في وضع Split أو Design. [[showBackground = true]] خلفية بيضا بدل الشفافة.
- الدالة **من غير parameters**، لأن الـ Preview مش عارف يبعت إيه. عشان كده بنعمل دالة preview صغيرة بتنادي [[Greeting("Sara")]] بقيمة ثابتة.
- [[Column { ... }]]: حط اللي جوه تحت بعض (الدرس الجاي).

الاختبار طبع شجرة الواجهة اللي Compose عملها (الـ density هنا 1 فالـ px = dp):

~~~text الناتج (printToString على الشجرة)
Node #1 at (l=0.0, t=0.0, r=99.0, b=64.0)px
 |-Node #3 at (l=0.0, t=0.0, r=69.0, b=16.0)px
 | Text = '[أهلًا يا Sara]'
 |-Node #4 at (l=0.0, t=20.0, r=99.0, b=60.0)px
   Role = 'Button'
   Text = '[دوس هنا]'
   Actions = [..., OnClick, ...]
~~~

النص فوق (من 0 لـ 16)، والزرار تحته (من 20 لـ 60)، والزرار ارتفاعه 40dp، وده الارتفاع الافتراضي لـ Material Button. ده بالظبط اللي الـ Preview هيرسمه.

---

## ٤. الـ solCode: [[MainActivity]]

~~~kotlin
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
~~~

| الحتة | معناها |
|---|---|
| [[setContent { }]] | الجسر بين الـ Activity و Compose: كل اللي جوه هو شاشة التطبيق |
| [[NotesTheme { }]] | الثيم (الألوان والخطوط)، درس Material 3 |
| [[Scaffold { innerPadding -> }]] | هيكل الشاشة، وبيديك [[innerPadding]] = المساحة اللي الـ status bar والبارات واخدينها |
| [[Modifier.padding(innerPadding)]] | عشان المحتوى ميتداريش ورا الـ status bar بعد [[enableEdgeToEdge()]] |

الكود ده اتبنى في الـ APK من غير أخطاء. الرسم على الموبايل نفسه من الـ docs.

---

## الخلاصة

- الواجهة دوال [[@Composable]] مبترجّعش حاجة، والمترجم بيزوّدلها [[Composer]] مخفي (شفناه بـ [[javap]]).
- composable يتنادى من composable بس. [[onClick]] مش composable.
- [[modifier: Modifier = Modifier]] في كل composable بتاعك، وتعدّيه لأول عنصر جواه.
- [[@Preview]] على دالة من غير parameters بتنادي الحقيقية بقيم ثابتة.`,
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
          teach: R`## الكود ده بيعمل إيه؟

بيرسم «هيدر بروفايل»: دايرة ملونة فيها أول حرف من الاسم، وجنبها الاسم والمدينة تحت بعض، وزرار «تعديل» في الطرف التاني. يعني [[Row]] جواه [[Box]] و [[Spacer]] و [[Column]] وزرار.

> فين اتجرّب: على Compose Multiplatform 1.12.1 للـ Desktop في [[docker run --rm eclipse-temurin:21-jdk]]. حطينا الـ composable جوه مساحة عرضها 360dp (عرض موبايل عادي)، وضفنا [[Modifier.testTag(...)]] على كل حتة عشان الاختبار يقيس مكانها ومقاسها بالظبط. الـ density هنا 1، فكل رقم تحت بالـ dp.

---

## ١. الـ [[Row]] من برا

~~~kotlin
Row(
    modifier = Modifier.fillMaxWidth().padding(16.dp),
    verticalAlignment = Alignment.CenterVertically
) {
~~~

- [[Row]]: العناصر اللي جواه جنب بعض أفقيًا.
- [[Modifier.fillMaxWidth()]]: خد كل العرض اللي الأب سامح بيه (360).
- [[.padding(16.dp)]]: 16dp فاضيين من الأربع نواحي. [[dp]] = density-independent pixels: نفس الحجم الحقيقي تقريبًا على أي شاشة. و [[16.dp]] extension property على Int بيحوّل الرقم لـ Dp.
- [[verticalAlignment = Alignment.CenterVertically]]: العناصر الأقصر من الـ Row تتحط في نص الارتفاع. في Row، المحور الرئيسي أفقي (ده للـ arrangement)، والتاني رأسي (ده للـ alignment).

---

## ٢. الدايرة: [[Box]]

~~~kotlin
Box(
    modifier = Modifier.size(56.dp).clip(CircleShape).background(MaterialTheme.colorScheme.primary),
    contentAlignment = Alignment.Center
) {
    Text(name.take(1), color = MaterialTheme.colorScheme.onPrimary)
}
~~~

| الحتة | معناها |
|---|---|
| [[size(56.dp)]] | عرض وطول 56 |
| [[clip(CircleShape)]] | قص اللي بعده على شكل دايرة |
| [[background(...primary)]] | لون الخلفية: لون البراند من الثيم |
| [[contentAlignment = Alignment.Center]] | اللي جوه الـ Box في النص بالظبط |
| [[name.take(1)]] | أول حرف من النص ([[take(n)]] أول n حروف) |
| [[onPrimary]] | اللون اللي بيتقري فوق الـ primary |

---

## ٣. [[Spacer]] و [[weight]] و الزرار

~~~kotlin
Spacer(Modifier.width(12.dp))
Column(modifier = Modifier.weight(1f)) {
    Text(name, style = MaterialTheme.typography.titleMedium)
    Text(city, style = MaterialTheme.typography.bodySmall)
}
TextButton(onClick = { }) { Text("تعديل") }
~~~

- [[Spacer(Modifier.width(12.dp))]]: مسافة فاضية عرضها 12.
- [[Modifier.weight(1f)]]: «خد كل اللي فاضل». الـ [[f]] معناها Float. وده متاح بس جوه [[Row]] أو [[Column]] (اسمه scoped modifier).
- [[TextButton]]: زرار من غير خلفية، نص بس.

---

## ٤. الأرقام الحقيقية (360dp عرض)

~~~text الناتج (اتجاه LTR)
row: left=16.0.dp top=16.0.dp width=328.0.dp height=56.0.dp
box: left=16.0.dp top=16.0.dp width=56.0.dp height=56.0.dp
col: left=84.0.dp top=24.0.dp width=202.0.dp height=40.0.dp
btn: left=286.0.dp top=24.0.dp width=58.0.dp height=40.0.dp
~~~

اقرا الأرقام:

- الـ Row عرضه 328 = 360 ناقص 16 من كل ناحية، وارتفاعه 56 = أطول حاجة جواه (الـ Box).
- الـ Box بيبدأ من 16 (بعد الـ padding)، ويخلص عند 72. بعده الـ Spacer 12، فالـ Column بيبدأ عند **84**.
- الزرار عرضه 58 (على قد نصه). الـ Row بيقيس الـ Box والـ Spacer والزرار **الأول**، واللي فاضل بيروح للـ Column: 328 − 56 − 12 − 58 = **202**.
- الـ Column والزرار ارتفاعهم 40 فبيبدأوا من 24 مش 16: ده الـ [[CenterVertically]] ((56 − 40) ÷ 2 = 8 زيادة).

### نفس الكود بالعربي (RTL)

حطينا [[LocalLayoutDirection provides LayoutDirection.Rtl]] (اللي بيحصل لوحده لما لغة الموبايل عربي):

~~~text الناتج (اتجاه RTL)
row: left=16.0.dp top=16.0.dp width=328.0.dp height=56.0.dp
box: left=288.0.dp top=16.0.dp width=56.0.dp height=56.0.dp
col: left=74.0.dp top=24.0.dp width=202.0.dp height=40.0.dp
btn: left=16.0.dp top=24.0.dp width=58.0.dp height=40.0.dp
~~~

الدايرة بقت على اليمين (288 لـ 344) والزرار على الشمال (16)، ومن غير ما نغيّر سطر. عشان كده بنقول «start» و «end» مش «left» و «right».

---

## ٥. الـ solCode: [[ProductCard]]

~~~kotlin
Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
    Button(onClick = { }, modifier = Modifier.weight(1f)) { Text("ضيف للسلة") }
    OutlinedButton(onClick = { }, modifier = Modifier.weight(1f)) { Text("مفضلة") }
}
~~~

- [[Card]]: سطح Material بأركان دايرية وخلفية مختلفة شوية.
- [[Arrangement.spacedBy(8.dp)]]: 8dp بين كل عنصرين (ده الـ arrangement على المحور الرئيسي الأفقي).
- الزرارين ليهم [[weight(1f)]] فبيتقسموا العرض نص ونص:

~~~text الناتج
b1: left=32.0.dp top=112.0.dp width=144.0.dp height=40.0.dp
b2: left=184.0.dp top=112.0.dp width=144.0.dp height=40.0.dp
~~~

الحساب: 360 − 16×2 (padding الكارت) − 16×2 (padding جوه الكارت) = 296، ناقص 8 المسافة = 288، على اتنين = **144** لكل زرار. وأول واحد بيبدأ عند 32 (16 + 16).

و [[Text("$price ج.م")]] مع [[450.0]] طلع [[450.0 ج.م]] (الـ Double بيتكتب بـ [[.0]]).

---

## ٦. [[weight]] برا Row أو Column

جربنا [[Box(Modifier.weight(1f))]] في composable عادي، والمترجم رفض:

~~~text الناتج
e: Bad.kt:18:18 Expression 'weight' of type 'Float' cannot be invoked as a function. Function 'invoke()' is not found.
~~~

الرسالة غريبة شوية، بس معناها إن [[weight]] مش موجودة هنا، لأنها معرّفة جوه [[RowScope]] و [[ColumnScope]] بس.

---

## الخلاصة

| عايز | استخدم |
|---|---|
| تحت بعض | [[Column]] |
| جنب بعض | [[Row]] (وبيتقلب لوحده في العربي) |
| فوق بعض | [[Box]] |
| توزيع على المحور الرئيسي | [[verticalArrangement]] في Column، [[horizontalArrangement]] في Row |
| محاذاة على المحور التاني | [[horizontalAlignment]] في Column، [[verticalAlignment]] في Row |
| العنصر ياخد الباقي | [[Modifier.weight(1f)]] |

والـ Row بيقيس اللي ملوش weight الأول، وبعدين يدّي الباقي لأصحاب الـ weight.`,
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
          teach: R`## الكود ده بيعمل إيه؟

جزئين: [[Tag]] «شارة» نصها جوه شكل بأركان دايرية وبتتداس، و [[OrderDemo]] بيحط Boxين أصفر جنب بعض بنفس الـ modifiers بس بترتيب مختلف، عشان تشوف بعينك إن الترتيب بيغيّر الشكل.

> فين اتجرّب: Compose Multiplatform 1.12.1 للـ Desktop في [[docker run --rm eclipse-temurin:21-jdk]]، باختبار UI headless: قسنا مقاس كل حاجة، وصورنا الـ Box وقرينا لون pixels معينة، ودوسنا في أماكن محددة وعدّينا [[onClick]] اتنادى كام مرة. الـ density 1 فالأرقام كلها dp.

---

## ١. توقيع [[Tag]]

~~~kotlin
fun Tag(text: String, onClick: () -> Unit, modifier: Modifier = Modifier) {
~~~

- [[onClick: () -> Unit]]: parameter نوعه دالة. [[()]] مبتاخدش حاجة، و [[-> Unit]] مبترجّعش حاجة. اللي بيستخدم الـ Tag هو اللي يقرر يحصل إيه.
- [[modifier: Modifier = Modifier]]: العرف: modifier من برا، افتراضيه فاضي.

---

## ٢. السلسلة: كل نقطة طبقة

~~~kotlin
modifier = modifier
    .clip(RoundedCornerShape(12.dp))
    .background(MaterialTheme.colorScheme.secondaryContainer)
    .clickable { onClick() }
    .padding(horizontal = 12.dp, vertical = 6.dp)
~~~

بنبدأ من [[modifier]] (اللي جاي من برا، بحرف صغير) مش [[Modifier]]، عشان أي حاجة اللي بيستخدمنا حطها تفضل موجودة، وبعدين بنزوّد. اقرا من فوق لتحت كأنك داخل من برا لجوه:

| الترتيب | الحتة | بتعمل إيه |
|---|---|---|
| ١ | [[clip(RoundedCornerShape(12.dp))]] | أي حاجة بعدي تترسم مقصوصة على مستطيل أركانه دايرية بنص قطر 12 |
| ٢ | [[background(...secondaryContainer)]] | لون خلفية من الثيم، ومقصوص بسبب الـ clip اللي قبله |
| ٣ | [[clickable { onClick() }]] | المساحة دي كلها بتستقبل الضغط، وتأثير الـ ripple مقصوص كمان |
| ٤ | [[padding(horizontal = 12.dp, vertical = 6.dp)]] | 12 يمين وشمال و 6 فوق وتحت، **جوه** اللون ومنطقة الضغط |

ومقاس الـ Tag الحقيقي طلع 72 × 36: النص [[Kotlin]] نفسه 48 × 24، زايد 12+12 عرض و 6+6 طول.

---

## ٣. [[OrderDemo]]: نفس الحاجتين بترتيب عكسي

~~~kotlin
Box(Modifier.background(Color.Yellow).padding(16.dp)) { Text("background الأول") }
Box(Modifier.padding(16.dp).background(Color.Yellow)) { Text("padding الأول") }
~~~

صورنا كل Box وقرينا لون pixel عند (2,2) (في الهامش) وعند (20,20) (جوه):

~~~text الناتج
b1: left=0.0.dp top=0.0.dp width=171.0.dp height=56.0.dp pixel(2,2)=#FFFFFF00 pixel(20,20)=#FFFFFF00
b2: left=0.0.dp top=64.0.dp width=140.0.dp height=56.0.dp pixel(2,2)=#00000000 pixel(20,20)=#FFFFFF00
~~~

اللون مكتوب hex بالشكل [[#AARRGGBB]]: [[FF]] شفافية كاملة (مش شفاف)، و [[FFFF00]] أحمر + أخضر = أصفر. و [[#00000000]] شفاف خالص.

- **b1** ([[background]] الأول): الأصفر على المساحة كلها حتى الهامش، فالـ padding بقى «مسافة جوه اللون».
- **b2** ([[padding]] الأول): الهامش شفاف، والأصفر بيبدأ بعد 16. يعني الـ padding هنا اشتغل **margin**.

المقاسين 171 و 140 لأن كل Box = نصه + 16 من كل ناحية (النص الأول عرضه 139 والتاني 108). اللي اختلف مكان اللون، مش المقاس.

~~~kotlin
Tag("Kotlin", onClick = { }, modifier = Modifier.padding(start = 16.dp))
~~~

الـ [[padding(start = 16.dp)]] جه من برا، ولأنه أول السلسلة جوه الـ Tag (قبل الـ clip) بقى margin: الـ Tag اتحط عند [[left=16]]. و [[start]] بتبقى يمين في العربي.

---

## ٤. منطقة الضغط: جربنا التجربة بتاعة الدرس

حطينا الـ Tag عند (20,20) ودوسنا في ٣ أماكن: ركن الهامش (23,23)، وطرف الهامش (24,38)، والنص (56,38). وبعدين عملنا نسخة [[TagSwapped]] فيها [[.padding(...)]] قبل [[.clickable]]:

~~~text الناتج
Tag (clickable then padding) click at outer corner (23,23) -> onClick called 1 time(s)
Tag (clickable then padding) click at outer edge (24,38) -> onClick called 1 time(s)
Tag (clickable then padding) click at center (56,38) -> onClick called 1 time(s)
TagSwapped (padding then clickable) bounds: left=32.0.dp top=26.0.dp width=48.0.dp height=24.0.dp
TagSwapped (padding then clickable) click at outer corner (23,23) -> onClick called 0 time(s)
TagSwapped (padding then clickable) click at outer edge (24,38) -> onClick called 0 time(s)
TagSwapped (padding then clickable) click at center (56,38) -> onClick called 1 time(s)
~~~

في النسخة المعكوسة منطقة الضغط بقت 48 × 24 بس (على قد النص)، والضغط على الأطراف الملونة مبيعملش حاجة. ده ليه الأحسن [[clickable]] **قبل** الـ padding.

---

## ٥. [[clip]] قبل [[background]]

لو كتبت [[.background(...).clip(...)]]، الخلفية اترسمت خلاص قبل القص، فهتطلع مستطيل بأركان حادة. القص بيأثر بس على اللي **بعده** في السلسلة. (ده من منطق السلسلة اللي شفناه فوق، ومش متصوّر في الاختبار.)

---

## الخلاصة

| الترتيب | النتيجة |
|---|---|
| [[background]] ثم [[padding]] | المسافة جوه اللون (padding عادي) |
| [[padding]] ثم [[background]] | المسافة برا اللون (margin) |
| [[clickable]] ثم [[padding]] | الضغط شغال على المساحة كلها |
| [[padding]] ثم [[clickable]] | الضغط على النص بس |
| [[clip]] ثم [[background]] و [[clickable]] | اللون والـ ripple مقصوصين على الشكل |

- السلسلة بتتقري من برا لجوه، وكل modifier بيأثر على اللي بعده.
- ابدأ من [[modifier]] اللي جاي من برا، وحطه على أول عنصر (الـ root).`,
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
          teach: R`## الكود ده بيعمل إيه؟

بيعرض لستة ملاحظات: عنوان فيه العدد، وتحته كارت لكل ملاحظة بيتداس. الفرق عن [[Column]] إن [[LazyColumn]] بيرسم اللي ظاهر بس.

> فين اتجرّب: Compose Multiplatform 1.12.1 للـ Desktop في [[docker run --rm eclipse-temurin:21-jdk]]، باختبار UI headless بـ 200 ملاحظة في مساحة 360 × 640dp (شاشة موبايل). الاختبار عدّ الكروت اللي Compose عملها فعلًا قبل وبعد الـ scroll.

---

## ١. الـ data class

~~~kotlin
data class Note(val id: Long, val title: String)
~~~

كل ملاحظة ليها [[id]] فريد (هنستخدمه كـ key) وعنوان. [[Long]] رقم صحيح كبير (64 bit).

---

## ٢. التوقيع

~~~kotlin
fun NotesList(notes: List<Note>, onNoteClick: (Note) -> Unit, modifier: Modifier = Modifier) {
~~~

- [[notes: List<Note>]]: الداتا جاية من برا (الـ composable مش بيجيبها بنفسه).
- [[onNoteClick: (Note) -> Unit]]: دالة بتاخد [[Note]]. اللستة بتبلّغ «دي اللي اتداست»، والأب يقرر (يفتح شاشة مثلًا).

---

## ٣. الـ parameters بتاعة [[LazyColumn]]

~~~kotlin
LazyColumn(
    modifier = modifier,
    contentPadding = PaddingValues(16.dp),
    verticalArrangement = Arrangement.spacedBy(8.dp)
) {
~~~

| الحتة | معناها |
|---|---|
| [[contentPadding = PaddingValues(16.dp)]] | 16 حوالين المحتوى كله. الفرق عن [[Modifier.padding]]: المحتوى بيعدّي تحت المسافة دي وهو بيعمل scroll بدل ما يتقص |
| [[verticalArrangement = Arrangement.spacedBy(8.dp)]] | 8 بين كل عنصرين |

---

## ٤. جوه الـ block: [[item]] و [[items]]

~~~kotlin
    item {
        Text("ملاحظاتك ($__{notes.size})", style = MaterialTheme.typography.titleLarge)
    }
    items(notes, key = { it.id }) { note ->
        Card(onClick = { onNoteClick(note) }, modifier = Modifier.fillMaxWidth()) {
            Text(note.title, modifier = Modifier.padding(16.dp))
        }
    }
~~~

- الـ block ده **مش** composable، هو قايمة بتوصف العناصر (DSL). عشان كده مبتكتبش [[Text]] فيه على طول، لازم جوه [[item]].
- [[item { }]]: عنصر واحد. و [[$__{notes.size}]] string template بيحط عدد العناصر (درس string templates).
- [[items(notes, key = { it.id }) { note -> }]]: عنصر لكل ملاحظة. [[key]] lambda بترجّع مفتاح كل عنصر، و [[it]] هو العنصر. و [[note ->]] اسمه جوه المحتوى.
- [[Card(onClick = ...)]]: كارت Material بيتداس. لما يتداس بنادي [[onNoteClick(note)]] بالملاحظة بتاعته.

---

## ٥. «بيرسم اللي ظاهر بس»: الأرقام

~~~text الناتج (200 ملاحظة، مساحة 640dp)
composed note cards: 10 first=ملاحظة رقم 0 last=ملاحظة رقم 9
after scrollToIndex(150): 11 first=ملاحظة رقم 148 last=ملاحظة رقم 158
clicked = Note(id=152, title=ملاحظة رقم 152)
header still composed after scroll: 0
~~~

- من 200 ملاحظة، Compose عمل **10 كروت بس**: اللي داخلين في الـ 640dp.
- بعد الـ scroll لعنصر رقم 150 (العنصر صفر هو العنوان، فده ملاحظة 149): الموجودين 11 كارت حواليه، وكل اللي قبل اتشالوا، حتى العنوان ([[0]]).
- دوسنا على كارت 152 فالـ lambda وصلها الـ [[Note]] الصح.

ولو حطيت الـ 200 في [[Column]] عادي، الـ 200 هيتعملوا مرة واحدة.

---

## ٦. لو الـ key اتكرر

جربنا ملاحظتين بنفس الـ [[id = 1]]:

~~~text الناتج
java.lang.IllegalArgumentException: Key "1" was already used. If you are using LazyColumn/Row please make sure you provide a unique key for each item.
~~~

الـ key لازم يبقى فريد. ومن غير key خالص، Compose بيعرف العناصر بترتيبها، فلو اتمسح عنصر من فوق، الـ state اللي جوه العناصر (checkbox مثلًا) ممكن ينتقل للعنصر الغلط.

## ٧. LazyColumn جوه Column بيعمل scroll

جربنا [[Column(Modifier.verticalScroll(rememberScrollState())) { ...; NotesList(...) }]]:

~~~text الناتج
java.lang.IllegalStateException: Vertically scrollable component was measured with an infinity maximum height constraints, which is disallowed. One of the common reasons is nesting layouts like LazyColumn and Column(Modifier.verticalScroll()). If you want to add a header before the list of items please add a header as a separate item() before the main items() inside the LazyColumn scope. ...
~~~

الـ Column اللي بيعمل scroll بيقول لابنه «طولك مفتوح لما لا نهاية»، و LazyColumn مش هيعرف يحسب يرسم كام عنصر. الحل زي ما الرسالة بتقول: العنوان يبقى [[item]] جوه الـ LazyColumn، زي المثال.

---

## ٨. الـ solCode: [[LazyVerticalGrid]]

~~~kotlin
val notes = remember { List(200) { Note(it.toLong(), "ملاحظة رقم $it") } }
LazyVerticalGrid(
    columns = GridCells.Fixed(2),
    ...
) {
    items(notes, key = { it.id }) { note -> Card { Text(note.title, Modifier.padding(16.dp)) } }
    item(span = { GridItemSpan(maxLineSpan) }) { Text("خلصت", Modifier.padding(16.dp)) }
}
~~~

- [[List(200) { ... }]]: List بـ 200 عنصر، و [[it]] جوه الـ lambda هو الـ index (0 لـ 199). و [[it.toLong()]] لأن الـ id نوعه Long.
- [[remember { }]]: متعملش الـ List من جديد مع كل recomposition (درس remember).
- [[GridCells.Fixed(2)]]: عمودين ثابتين.
- [[span = { GridItemSpan(maxLineSpan) }]]: العنصر ده ياخد عرض السطر كله ([[maxLineSpan]] = عدد الأعمدة).

~~~text الناتج
grid composed: 20 first=ملاحظة رقم 0 last=ملاحظة رقم 19
row of 0: left=32.0.dp top=32.0.dp width=97.0.dp height=24.0.dp
row of 1: left=200.0.dp top=32.0.dp width=97.0.dp height=24.0.dp
~~~

20 كارت بس (10 صفوف × 2)، وملاحظة 0 في العمود الأول (عند 32) و 1 في التاني (عند 200). الأرقام دي مكان النص جوه الكارت (16 contentPadding + 16 padding النص).

---

## الخلاصة

- [[LazyColumn]] للستات اللي ممكن تكبر، و [[Column]] لكام عنصر ثابتين.
- جوه الـ block: [[item]] لعنصر واحد، و [[items(list, key = { it.id })]] للستة.
- الـ key فريد دايمًا، وإلا [[IllegalArgumentException]].
- متحطش LazyColumn جوه حاجة بتعمل scroll في نفس الاتجاه.`,
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

وكل component بياخد ألوانه الافتراضية من الـ scheme: الـ Button بياخد primary، والـ Card بياخد surfaceContainerHighest... فلو ظبطت الـ scheme صح، نادرًا ما هتحدد لون بإيدك.`,
            when: R`مرة في أول المشروع تظبط الثيم، وبعدين في كل composable استخدم [[MaterialTheme.colorScheme]] و [[MaterialTheme.typography]] بدل القيم الثابتة.`,
            mistakes: R`[[Color.Black]] للنص في كل حتة فيختفي في الـ dark mode. وتنسى [[padding]] اللي جاي من Scaffold فالمحتوى يبقى تحت الـ TopAppBar. وتحط الـ Scaffold جوه composable جوه الثيم وكمان ثيم تاني جواه.`
          },
          teach: R`## الكود ده بيعمل إيه؟

جزئين: [[NotesTheme]] بيختار ألوان التطبيق (ليلي ولا نهاري، ومن خلفية الموبايل لو Android 12+) ويلف بيها كل اللي جواه، و [[HomeScreen]] شاشة فيها بار فوق وزرار عايم ونص بلون الثيم.

> فين اتجرّب: الكود كله زي ما هو (بالـ [[LocalContext]] و [[Build.VERSION]] والـ dynamic color والـ Preview الليلي) اتبنى في APK حقيقي بـ AGP 9.4.1 و Compose 1.10.6 من غير أخطاء. والرسم والألوان اتشغّلوا على Compose Multiplatform 1.12.1 للـ Desktop في [[docker run --rm eclipse-temurin:21-jdk]]، بنسخة من الثيم **من غير** جزء الـ dynamic color (ده Android بس). شكل الـ dynamic color على موبايل حقيقي من الـ docs.

---

## ١. توقيع الثيم

~~~kotlin
fun NotesTheme(darkTheme: Boolean = isSystemInDarkTheme(), content: @Composable () -> Unit) {
~~~

- [[darkTheme: Boolean = isSystemInDarkTheme()]]: القيمة الافتراضية **نداء دالة**: [[isSystemInDarkTheme()]] بترجّع [[true]] لو الموبايل على الوضع الليلي. وتقدر تبعت [[true]] أو [[false]] بإيدك (في الـ Preview مثلًا).
- [[content: @Composable () -> Unit]]: parameter نوعه **composable lambda**: دالة مبتاخدش حاجة ومبترجّعش، وعليها [[@Composable]] فينفع ترسم. ده اللي بيخلّيك تكتب [[NotesTheme { HomeScreen() }]] (trailing lambda).

---

## ٢. اختيار الألوان بـ [[when]]

~~~kotlin
val context = LocalContext.current
val colors = when {
    Build.VERSION.SDK_INT >= Build.VERSION_CODES.S ->
        if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
    darkTheme -> darkColorScheme(primary = Color(0xFF8AB4F8))
    else -> lightColorScheme(primary = Color(0xFF1A73E8))
}
~~~

| الحتة | معناها |
|---|---|
| [[LocalContext.current]] | هات الـ [[Context]] (الـ Activity) من الشجرة. [[Local...]] اسمها CompositionLocal: قيمة متاحة لكل اللي تحت من غير ما تتبعت parameter |
| [[when { }]] من غير قيمة | كل سطر شرط، وأول شرط [[true]] هو اللي بيكسب (درس if و when) |
| [[Build.VERSION.SDK_INT]] | رقم نسخة Android اللي التطبيق شغال عليها دلوقتي |
| [[Build.VERSION_CODES.S]] | ثابت = 31 = Android 12. قبله مفيش dynamic color |
| [[dynamicDarkColorScheme(context)]] | ألوان محسوبة من خلفية موبايل اليوزر |
| [[darkColorScheme(primary = ...)]] | scheme ليلي جاهز، وغيّرنا الـ primary بس |
| [[Color(0xFF1A73E8)]] | لون hex: [[0x]] يعني الرقم hex، و [[FF]] الشفافية (مش شفاف خالص)، و [[1A73E8]] الأزرق |

جربنا الـ [[Color]] والشفافية:

~~~text الناتج
Color(0xFF1A73E8) = Color(0.101960786, 0.4509804, 0.9098039, 1.0, sRGB IEC61966-2.1)
Color(0x801A73E8).alpha = 0.5019608
~~~

كل قناة بتتخزن رقم من 0 لـ 1: [[0x1A]] = 26، و 26 ÷ 255 = 0.102. و [[80]] في الشفافية = 128 ÷ 255 ≈ 0.5، يعني نص شفاف.

### الألوان اللي طلعت (Desktop، من غير dynamic)

~~~text الناتج
light primary=#FF1A73E8 onPrimary=#FFFFFFFF background=#FFFEF7FF onBackground=#FF1D1B20 surface=#FFFEF7FF
dark  primary=#FF8AB4F8 onPrimary=#FF381E72 background=#FF141218 onBackground=#FFE6E0E9 surface=#FF141218
light card=#FFE6E0E9 (surfaceContainerHighest=#FFE6E0E9 surfaceContainer=#FFF3EDF7) button=#FF1A73E8
dark  card=#FF36343B (surfaceContainerHighest=#FF36343B surfaceContainer=#FF211F26) button=#FF8AB4F8
~~~

- الـ [[primary]] بقى لوننا في الحالتين، وباقي الألوان من الـ scheme الافتراضي: الخلفية فاتحة في النهاري ([[FEF7FF]]) وغامقة في الليلي ([[141218]]).
- لاحظ إن [[onPrimary]] الليلي فضل اللون الافتراضي ([[381E72]] بنفسجي غامق)، لأننا غيّرنا [[primary]] بس. لو غيّرت الـ primary لازم تراجع الـ [[on...]] بتاعه، وده اللي أداة Material Theme Builder بتعمله لوحدها.
- الزرار خد [[primary]] لوحده، والكارت خد [[surfaceContainerHighest]] لوحده. محدش فيهم اتكتبله لون.

---

## ٣. [[MaterialTheme(...)]]

~~~kotlin
MaterialTheme(colorScheme = colors, typography = Typography(), content = content)
~~~

بيحط الألوان والخطوط في الشجرة، وبعدين ينادي [[content]]. أي حد تحت يقرا [[MaterialTheme.colorScheme.primary]] أو [[MaterialTheme.typography.headlineSmall]]. و [[Typography()]] الأحجام الافتراضية:

~~~text الناتج
typography: headlineSmall=24.0.sp titleMedium=16.0.sp bodyLarge=16.0.sp bodySmall=12.0.sp labelSmall=11.0.sp
~~~

[[sp]] (scale-independent pixels) زي dp بس بتكبر لو اليوزر مكبّر الخط من الإعدادات.

---

## ٤. [[HomeScreen]]: [[Scaffold]]

~~~kotlin
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HomeScreen() {
    Scaffold(
        topBar = { TopAppBar(title = { Text("ملاحظاتي") }) },
        floatingActionButton = { FloatingActionButton(onClick = { }) { Text("+") } }
    ) { padding ->
~~~

- [[@OptIn(ExperimentalMaterial3Api::class)]]: [[TopAppBar]] متعلّم experimental. جربنا نشيل الـ OptIn والمترجم رفض (على Android و Desktop):

~~~text الناتج
e: Bad.kt:14:5 This material API is experimental and is likely to change or to be removed in the future.
~~~

و [[ExperimentalMaterial3Api::class]]: [[::class]] معناها «الكلاس نفسه كقيمة»، مش object منه.
- [[topBar = { ... }]] و [[floatingActionButton = { ... }]]: كل خانة composable lambda، والـ Scaffold بيحط كل واحدة في مكانها.
- [[{ padding -> }]]: المحتوى، والـ Scaffold بيبعتله [[PaddingValues]] = المساحة اللي البارات واخداها.

~~~kotlin
    Text(
        "أهلًا",
        modifier = Modifier.padding(padding).padding(16.dp),
        color = MaterialTheme.colorScheme.primary,
        style = MaterialTheme.typography.headlineSmall
    )
~~~

[[padding(padding)]] الأول (عشان البار)، وبعده [[padding(16.dp)]] مسافتنا. قسنا في مساحة 360 × 640:

~~~text الناتج
Scaffold padding: top=64.0.dp bottom=0.0.dp start=0.0.dp
title: left=16.0.dp top=18.0.dp width=88.0.dp height=28.0.dp
text أهلًا: left=16.0.dp top=80.0.dp width=34.0.dp height=32.0.dp
fab: left=288.0.dp top=568.0.dp width=56.0.dp height=56.0.dp
~~~

- الـ [[TopAppBar]] ارتفاعه 64، فالـ Scaffold بعت [[top=64]].
- النص بدأ عند 80 = 64 + 16. لو نسيت [[padding(padding)]] كان هيبقى عند 16، **تحت** البار.
- الـ FAB حجمه 56 في الركن: 360 − 16 − 56 = 288، و 640 − 16 − 56 = 568.

---

## ٥. الـ solCode: Previewين

~~~kotlin
@Preview(name = "Light")
@Preview(name = "Dark", uiMode = Configuration.UI_MODE_NIGHT_YES)
@Composable
fun HomePreview() { NotesTheme { HomeScreen() } }
~~~

[[@Preview]] ينفع تتكرر، وكل واحدة بترسم نسخة. و [[uiMode = Configuration.UI_MODE_NIGHT_YES]] بيخلي [[isSystemInDarkTheme()]] ترجّع [[true]] جوه الـ Preview ده. ([[Configuration]] من [[android.content.res]].) الكود ده اتبنى، والرسم في Android Studio من الـ docs.

---

## الخلاصة

- اقرا الألوان والخطوط من [[MaterialTheme.colorScheme]] و [[MaterialTheme.typography]]، متكتبش [[Color.Black]] ثابت.
- لو غيّرت [[primary]]، راجع [[onPrimary]] كمان.
- [[Build.VERSION.SDK_INT >= Build.VERSION_CODES.S]] قبل أي API من Android 12.
- حط [[padding]] اللي جاي من [[Scaffold]] على المحتوى.
- [[TopAppBar]] محتاج [[@OptIn(ExperimentalMaterial3Api::class)]].`,
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
          teach: R`## الكود ده بيعمل إيه؟

شاشة فيها عدّاد بزرار «زوّد»، وحقل تكتب فيه اسمك، ولو كتبت حاجة يظهر «أهلًا يا ...». الاتنين state: قيم بتتغير، والشاشة بتترسم من جديد لما تتغير.

> فين اتجرّب: Compose Multiplatform 1.12.1 للـ Desktop في [[docker run --rm eclipse-temurin:21-jdk]] باختبار UI headless: داس وكتب، وعدّ الدالة اتنادت كام مرة. ولفة الموبايل (الـ Activity بتتعمل من الأول) عملناها بإننا حفظنا الـ saveable state، ورمينا الشاشة، وبنيناها تاني من المحفوظ: ده نفس اللي Android بيعمله مع الـ Bundle. وتحذير Android Studio اتجاب من [[lintDebug]] حقيقي على مشروع Android. اللفة على emulator نفسها من الـ docs.

---

## ١. سطر العدّاد

~~~kotlin
var count by remember { mutableIntStateOf(0) }
~~~

فكّه من جوه لبرة:

### [[mutableIntStateOf(0)]]

بيعمل صندوق فيه رقم ابتدائه 0، و Compose **بيراقبه**: أي composable قرا القيمة وهو بيترسم، بيتسجّل إنه معتمد عليها. ولما القيمة تتغير، بيتعاد رسمه. ونسخة [[Int]] مخصوص عشان الرقم يتخزن [[int]] عادي من غير ما يتلف في object ([[mutableStateOf(0)]] كانت هتشتغل برضه).

### [[remember { ... }]]

الدالة [[Counter]] بتتنادى من الأول مع كل تغيير. [[remember]] بتقول: أول مرة نفّذ الـ lambda واحفظ الناتج في الـ Composition، وكل مرة بعدها رجّع **نفس** الصندوق.

### [[var count by ...]]

[[by]] اسمها property delegate: بدل ما تكتب [[count.value]] و [[count.value++]]، تكتب [[count]] و [[count++]] على طول. و [[var]] لأننا هنغيّره. (محتاجة import لـ [[androidx.compose.runtime.getValue]] و [[setValue]].)

---

## ٢. القراية والكتابة

~~~kotlin
Text("العدد: $count")
Button(onClick = { count++ }) { Text("زوّد") }
~~~

الـ [[Text]] **بيقرا** [[count]]، والـ [[onClick]] **بيكتب**. دوسنا ٣ مرات وعدّينا [[Counter]] اتنادت كام مرة:

~~~text الناتج
Counter ran 1 time(s) at start
after 3 clicks: 'العدد: 3' shown; Counter ran 4 time(s)
~~~

مرة في الأول، ومرة مع كل ضغطة: ده الـ recomposition. (الـ [[Column]] inline function، فالقراية بتتحسب على [[Counter]] كلها.)

---

## ٣. الاسم: [[rememberSaveable]] و [[OutlinedTextField]]

~~~kotlin
var name by rememberSaveable { mutableStateOf("") }
...
OutlinedTextField(
    value = name,
    onValueChange = { name = it },
    label = { Text("اسمك") }
)
if (name.isNotBlank()) {
    Text("أهلًا يا $name")
}
~~~

| الحتة | معناها |
|---|---|
| [[rememberSaveable]] | زي [[remember]]، وكمان بتتحفظ في الـ saved state (الـ Bundle على Android)، فتعيش بعد اللفة |
| [[value = name]] | الحقل بيعرض اللي في الـ state، مش بيحفظ نص لوحده |
| [[onValueChange = { name = it }]] | لما اليوزر يكتب، الحقل بيبعتلك النص الجديد في [[it]] وانت تحطه في الـ state |
| [[label = { Text("اسمك") }]] | العنوان الصغير فوق الحقل (composable lambda) |
| [[name.isNotBlank()]] | فيه حرف غير المسافات؟ |

~~~text الناتج
greeting before typing exists? 0
after typing: 'أهلًا يا Sara' shown
~~~

الترحيب مكانش موجود خالص (الـ [[if]] كانت false)، ولما كتبنا [[Sara]] الـ state اتغير والـ [[if]] بقت true فظهر.

### لو مش هتحدّث الـ state

جربنا [[OutlinedTextField(value = "", onValueChange = { })]] وكتبنا [[abc]]:

~~~text الناتج
field without updating state, after typing abc: ''
~~~

الحقل فضل فاضي: هو بيعرض [[value]] بس، واحنا مغيّرناهاش.

---

## ٤. اللفة: [[remember]] ضد [[rememberSaveable]]

زوّدنا العدد لـ 5 وكتبنا [[Sara]]، وبعدين حفظنا الـ saved state ورمينا الشاشة وبنيناها تاني (اللي بيحصل في اللفة):

~~~text الناتج
before recreate: العدد: 5
saved bundle-like map: {-1jgo2q1b35o7=..., 1hj85izr3ywmo=[MutableState(value=Sara)@517716394]}
after recreate: 'العدد: 0' , field='Sara'
~~~

- المحفوظ فيه الاسم بس ([[MutableState(value=Sara)]]) ومفتاح تاني فيه حاجة داخلية بتاعة الحقل نفسه (شلنا قيمته من الناتج). العدد مش موجود، لأنه [[remember]].
- بعد البناء تاني: العدد رجع **0** والاسم فضل **Sara**. وده بالظبط اللي التجربة بتقوله، ولو غيّرت العدد لـ [[rememberSaveable]] هيتحفظ هو كمان.
- المفاتيح الغريبة دي Compose بيعملها من مكان الـ composable في الشجرة.

---

## ٥. التجربة: شيل [[remember]]

~~~kotlin
var count by mutableIntStateOf(0)
~~~

على مشروع Android، [[lintDebug]] وقّف البناء:

~~~text الناتج
State.kt:31: Error: Creating a state object during composition without using remember [UnrememberedMutableState from androidx.compose.runtime]
~~~

ولو شغّلت برضه (على Desktop، مفيش lint):

~~~text الناتج
no remember after 3 clicks: 'من غير remember: 0', NoRemember ran 4 time(s)
~~~

الدالة اتنادت ٤ مرات (يعني الضغطة **غيّرت** الـ state وعملت recomposition)، بس كل recomposition بيعمل صندوق جديد بصفر، فالرقم عمره ما بيزيد.

### وكمان: [[mutableListOf]] جوه [[remember]]

جربنا [[val list = remember { mutableListOf<String>() }]] وزرار بيعمل [[list.add("x")]] ٣ مرات:

~~~text الناتج
mutableListOf after 3 adds: 'العناصر: 0'
~~~

اللستة نفسها فيها ٣، بس Compose مش بيراقب [[MutableList]] العادية، فمحدش عمل recomposition. استخدم [[mutableStateListOf()]] أو List read-only جوه [[mutableStateOf]].

---

## الخلاصة

| الكود | النتيجة |
|---|---|
| [[var count = 0]] | مبيتحدثش أبدًا |
| [[mutableStateOf(0)]] من غير remember | بيتصفّر مع كل رسمة (و lint بيقول Error) |
| [[remember { mutableStateOf(0) }]] | بيعيش بين الرسمات، ويضيع في اللفة |
| [[rememberSaveable { mutableStateOf(0) }]] | بيعيش بعد اللفة كمان |

والـ text field: [[value]] من الـ state، و [[onValueChange]] يحدّث الـ state.`,
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
          teach: R`## الكود ده بيعمل إيه؟

شاشة بحث: حقل تكتب فيه، وتحته عدد النتايج والمنتجات اللي اسمها فيه اللي كتبته. الحقل نفسه ([[SearchBox]]) **ملوش** state: الشاشة ([[ProductsScreen]]) هي اللي ماسكة النص، وبتبعته للحقل، والحقل بيبلّغها لما اليوزر يكتب.

> فين اتجرّب: Compose Multiplatform 1.12.1 للـ Desktop في [[docker run --rm eclipse-temurin:21-jdk]]، باختبار UI headless كتب في الحقل وداس على الأزرار، وطبع كل النصوص اللي على الشاشة بعد كل خطوة.

---

## ١. [[SearchBox]]: stateless

~~~kotlin
@Composable
fun SearchBox(query: String, onQueryChange: (String) -> Unit, modifier: Modifier = Modifier) {
    OutlinedTextField(
        value = query,
        onValueChange = onQueryChange,
        placeholder = { Text("دوّر...") },
        singleLine = true,
        modifier = modifier.fillMaxWidth()
    )
}
~~~

| الحتة | معناها |
|---|---|
| [[query: String]] | النص اللي هيتعرض: **نازل** من فوق |
| [[onQueryChange: (String) -> Unit]] | دالة بتاخد النص الجديد: الحدث **طالع** لفوق |
| [[onValueChange = onQueryChange]] | بنعدّي الدالة نفسها من غير ما نلفها في [[{ }]]، لأن النوعين واحد [[(String) -> Unit]] |
| [[placeholder = { Text("دوّر...") }]] | نص باهت بيظهر لما الحقل فاضي، ويختفي أول ما تكتب |
| [[singleLine = true]] | سطر واحد، و Enter مش بيعمل سطر جديد |
| [[modifier.fillMaxWidth()]] | الـ modifier اللي جاي من برا، وفوقه عرض كامل |

مفيش [[remember]] ولا [[mutableStateOf]] هنا خالص. ده معنى stateless.

---

## ٢. [[ProductsScreen]]: صاحب الـ state

~~~kotlin
var query by rememberSaveable { mutableStateOf("") }
val shown = all.filter { it.contains(query, ignoreCase = true) }
~~~

- [[query]] متخزن هنا بـ [[rememberSaveable]] (درس remember)، فبيعيش بعد لفة الموبايل.
- [[all.filter { }]]: بيرجّع List جديدة فيها اللي الشرط بتاعه true (درس map و filter).
- [[it.contains(query, ignoreCase = true)]]: الاسم فيه النص ده؟ و [[ignoreCase = true]] يخلي [[mo]] تلاقي [[Mouse]] و [[Monitor]].
- و [[shown]] [[val]] عادي مش state: بيتحسب من جديد في كل recomposition من [[query]].

~~~kotlin
Column(Modifier.padding(16.dp)) {
    SearchBox(query = query, onQueryChange = { query = it })
    Text("$__{shown.size} نتيجة")
    shown.forEach { Text(it) }
}
~~~

- [[SearchBox(query = query, onQueryChange = { query = it })]]: ابعت القيمة، ولما يجيلك نص جديد ([[it]]) حطه في الـ state.
- [[$__{shown.size}]]: عدد العناصر. و [[shown.forEach { Text(it) }]]: سطر لكل نتيجة.

### اللي حصل فعلًا

بـ 5 منتجات، وبعدين كتبنا [[mo]]:

~~~text الناتج
start: [دوّر..., 5 نتيجة, Laptop, Mouse, Keyboard, Monitor, Mousepad]
after typing 'mo': [3 نتيجة, Mouse, Monitor, Mousepad]
~~~

الرحلة: الكتابة → الحقل نادى [[onQueryChange("mo")]] → الشاشة عملت [[query = "mo"]] → recomposition → الحقل اترسم بـ [[mo]] (فالـ placeholder اختفى)، و [[shown]] اتحسبت تاني فطلع 3. ده الـ unidirectional data flow: الـ state نازل والحدث طالع.

---

## ٣. الـ solCode: [[QuantityPicker]]

~~~kotlin
@Composable
fun QuantityPicker(quantity: Int, onQuantityChange: (Int) -> Unit) {
    Row(verticalAlignment = Alignment.CenterVertically) {
        OutlinedButton(onClick = { onQuantityChange((quantity - 1).coerceAtLeast(1)) }) { Text("-") }
        Text("$quantity", Modifier.padding(horizontal = 16.dp))
        OutlinedButton(onClick = { onQuantityChange(quantity + 1) }) { Text("+") }
    }
}
~~~

- نفس الشكل: القيمة [[quantity]] نازلة، و [[onQuantityChange]] طالعة.
- [[(quantity - 1).coerceAtLeast(1)]]: احسب الأقل بواحد، ولو طلع أقل من 1 رجّع 1. يعني الكمية عمرها ما تنزل تحت 1.

و [[CartLine]] صاحب الـ state:

~~~kotlin
var qty by rememberSaveable { mutableIntStateOf(1) }
QuantityPicker(quantity = qty, onQuantityChange = { qty = it })
Text("الإجمالي: $__{qty * unitPrice} ج.م")
~~~

~~~text الناتج
start: [-, 1, +, الإجمالي: 85 ج.م]
after '-': [-, 1, +, الإجمالي: 85 ج.م]
after '+' x2: [-, 3, +, الإجمالي: 255 ج.م]
~~~

[[-]] عند 1 فضلت 1 ([[coerceAtLeast]])، و [[+]] مرتين بقت 3، والإجمالي 3 × 85 = 255.

### وليه ده مريح في الـ Preview؟

جربنا [[QuantityPicker(quantity = 3, onQuantityChange = { })]] لوحده ودوسنا [[+]]:

~~~text الناتج
stateless picker(3) after '+': [-, 3, +]
~~~

فضلت 3، لأن محدش بيغيّر القيمة. يعني الـ composable بيرسم اللي اتبعتله وبس، وده بالظبط اللي محتاجه في Preview أو اختبار: تبعتله أي قيمة وتشوف شكله.

---

## الخلاصة

- stateless composable = قيمة نازلة + lambda طالعة، ومفيش [[remember]] جواه.
- الـ state يتحط في أقرب أب مشترك لكل اللي محتاجينه (هنا [[ProductsScreen]] لأن الحقل والفلترة الاتنين محتاجين [[query]]).
- لو الحقل مش بيكتب: انت ناسي تحدّث الـ state في [[onValueChange]].
- نفس الشكل اللي [[TextField]] نفسه ماشي بيه: [[value]] و [[onValueChange]].`,
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
          teach: R`## الكود ده بيعمل إيه؟

بيعرّف شاشتين كـ «routes» (أنواع Kotlin)، وبيعمل [[NavHost]] يعرض شاشة البداية [[Home]]، ولما اليوزر يختار ملاحظة يروح لـ [[NoteDetails]] ومعاه الـ id، وزرار الرجوع يرجّعه.

> فين اتجرّب: الكود ده مع الـ solCode اتبنى في APK حقيقي بـ [[androidx.navigation:navigation-compose:2.9.8]] ومعاه plugin الـ serialization. واتشغّل على Compose Multiplatform 1.12.1 للـ Desktop بنسخة JetBrains من نفس المكتبة ([[org.jetbrains.androidx.navigation:navigation-compose:2.9.2]]، نفس الـ API) في [[docker run --rm eclipse-temurin:21-jdk]]، باختبار UI headless بيدوس وبيطبع الـ back stack بعد كل خطوة. زرار Back بتاع الموبايل نفسه من الـ docs.

---

## ١. الـ routes

~~~kotlin
@Serializable
object Home
@Serializable
data class NoteDetails(val id: Long)
~~~

- [[@Serializable]]: annotation من kotlinx.serialization. الـ plugin بيولّد كود يحوّل الـ object لنص ويرجّعه، والـ Navigation بيستخدم ده عشان يحفظ الـ route ويقراه.
- [[object Home]]: شاشة مش محتاجة بيانات، فـ object واحد يكفي (درس object).
- [[data class NoteDetails(val id: Long)]]: شاشة محتاجة [[id]]، فكل مرة بتعمل واحد بالـ id بتاعه: [[NoteDetails(2)]].

الـ Navigation بيحوّل الاسم والـ properties لـ route داخلي. ده اللي طبعناه:

~~~text الناتج
start route: l8.Home; stack=[null, l8.Home]
~~~

[[l8.Home]] اسم الكلاس كامل بالـ package. و [[null]] الأولانية هي الـ graph نفسه (الحاوية اللي فيها كل الشاشات)، وبعدها الشاشة الحالية.

---

## ٢. [[rememberNavController]] و [[NavHost]]

~~~kotlin
val navController = rememberNavController()
NavHost(navController = navController, startDestination = Home) {
~~~

| الحتة | معناها |
|---|---|
| [[rememberNavController()]] | بيعمل الـ [[NavHostController]] اللي بيمسك الـ back stack، و [[remember]] عشان ميتعملش من جديد مع كل رسمة |
| [[NavHost(...)]] | المكان اللي الشاشة الحالية بتترسم فيه |
| [[startDestination = Home]] | أول شاشة. بنبعت الـ object نفسه، مش نص |
| [[{ ... }]] | الخريطة: أنهي route يرسم أنهي شاشة |

---

## ٣. [[composable<Home>]]

~~~kotlin
composable<Home> {
    HomeScreen(onOpenNote = { id -> navController.navigate(NoteDetails(id)) })
}
~~~

- [[composable<Home>]]: [[< >]] بتحدد النوع (generic). «لما الـ route يبقى [[Home]] ارسم ده».
- الشاشة بتاخد lambda [[onOpenNote]]، ومتعرفش حاجة عن الـ [[navController]]. الـ NavHost هو اللي بيقرر: [[navController.navigate(NoteDetails(id))]] = حط شاشة جديدة فوق الـ stack.

دوسنا «ملاحظة 2»:

~~~text الناتج
after click 'ملاحظة 2': route=l8.NoteDetails/{id}; stack=[null, l8.Home, l8.NoteDetails/{id}]
~~~

الـ route بقى [[l8.NoteDetails/{id}]]: اسم الكلاس وبعده [[{id}]] مكان القيمة (زي URL). و [[Home]] لسه في الـ stack تحتها، عشان الرجوع.

---

## ٤. [[composable<NoteDetails>]] و [[toRoute]]

~~~kotlin
composable<NoteDetails> { backStackEntry ->
    val route = backStackEntry.toRoute<NoteDetails>()
    NoteDetailsScreen(id = route.id, onBack = { navController.popBackStack() })
}
~~~

- [[backStackEntry]]: الخانة دي في الـ stack، وفيها الـ arguments اللي اتبعتت.
- [[toRoute<NoteDetails>()]]: رجّع الـ arguments [[NoteDetails]] تاني، فتقرا [[route.id]] كـ [[Long]] على طول. الشاشة عرضت «ملاحظة رقم 2».
- [[navController.popBackStack()]]: شيل الشاشة اللي فوق وارجع للي تحتها:

~~~text الناتج
after رجوع: route=l8.Home; stack=[null, l8.Home]
~~~

---

## ٥. نفس الشاشة مرتين و [[launchSingleTop]]

نادينا [[navigate(NoteDetails(1))]] مرتين ورا بعض (زي دوستين سريعتين):

~~~text الناتج
navigate(NoteDetails(1)) twice: stack=[null, l8.Home, l8.NoteDetails/{id}, l8.NoteDetails/{id}]
with launchSingleTop twice: stack=[null, l8.Home, l8.NoteDetails/{id}]
~~~

من غير حاجة اتفتحت نسختين فوق بعض (واليوزر هيحتاج يدوس Back مرتين). مع [[navigate(NoteDetails(id)) { launchSingleTop = true }]] لو نفس الشاشة فوق خلاص، مش بيزوّد واحدة. الـ [[{ }]] بعد [[navigate]] lambda بتظبط خيارات التنقل.

---

## ٦. الـ solCode: شاشة Settings

~~~kotlin
@Serializable
object Settings
...
for (id in 1L..3L) {
    Button(onClick = { onOpenNote(id) }) { Text("ملاحظة $id") }
}
TextButton(onClick = onOpenSettings) { Text("الإعدادات") }
~~~

- [[1L..3L]]: range من 1 لـ 3 كـ [[Long]] ([[L]] = Long)، عشان [[id]] يطلع من نفس نوع [[onOpenNote: (Long) -> Unit]].
- [[onClick = onOpenSettings]]: بنعدّي الدالة على طول لأن النوعين [[() -> Unit]].
- وفي الـ NavHost (التعليق في آخر الـ solCode): [[composable<Settings> { Text("الإعدادات") }]] و [[onOpenSettings = { navController.navigate(Settings) }]].

~~~text الناتج
after الإعدادات: route=l8.Settings
~~~

[[Settings]] object فالـ route اسمه بس، من غير [[{...}]].

> ملحوظة: الـ [[HomeScreen]] في المثال بياخد [[onOpenNote]] بس، وفي الـ solCode بقى بياخد [[onOpenSettings]] كمان، فلازم تعدّل سطر [[composable<Home>]] زي التعليق.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| route من غير بيانات | [[@Serializable object Home]] |
| route ببيانات | [[@Serializable data class NoteDetails(val id: Long)]] |
| روح | [[navController.navigate(NoteDetails(5))]] |
| اقرا البيانات | [[backStackEntry.toRoute<NoteDetails>()]] |
| ارجع | [[navController.popBackStack()]] |
| متكررش نفس الشاشة | [[navigate(...) { launchSingleTop = true }]] |

والشاشات تاخد lambdas، والـ [[navController]] يفضل في الـ NavHost بس.`,
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
          teach: R`## الكود ده بيعمل إيه؟

سلة مشتريات: [[CartViewModel]] ماسك العدد والإجمالي في [[StateFlow]]، و [[CartScreen]] بيعرضهم وفيه زرار «ضيف» وزرار «فضّي». الشاشة بتقرا الـ state وبتبعت أحداث، والـ ViewModel هو اللي بيغيّر.

> فين اتجرّب: الكود كله اتبنى في APK حقيقي (lifecycle 2.10.0). واتشغّل على Compose Multiplatform 1.12.1 للـ Desktop بنسخة JetBrains من نفس المكتبات (lifecycle 2.11.0) في [[docker run --rm eclipse-temurin:21-jdk]]: الـ ViewModel لوحده كـ unit test، والشاشة باختبار UI headless. «اللفة» عملناها بإننا شلنا الشاشة ورجعناها وسبنا الـ [[ViewModelStore]] زي ما هو، وده اللي Android بيعمله مع الـ Activity. اللفة و Terminate على emulator من الـ docs.

---

## ١. الـ UI state

~~~kotlin
data class CartUiState(val count: Int = 0, val total: Double = 0.0)
~~~

كل اللي الشاشة محتاجة تعرضه في object واحد، وكل الخانات [[val]] بقيم افتراضية. فـ [[CartUiState()]] = سلة فاضية. وعشان هو [[data class]] عندك [[copy]] و [[toString]] حلو.

---

## ٢. الـ ViewModel: نسختين من نفس الـ state

~~~kotlin
class CartViewModel : ViewModel() {
    private val _uiState = MutableStateFlow(CartUiState())
    val uiState: StateFlow<CartUiState> = _uiState.asStateFlow()
~~~

| الحتة | معناها |
|---|---|
| [[: ViewModel()]] | بيورث من [[ViewModel]] (من مكتبة lifecycle) |
| [[MutableStateFlow(CartUiState())]] | «قيمة بتتغير مع الوقت» تقدر تكتب فيها، وابتداؤها سلة فاضية |
| [[private val _uiState]] | محدش برا الكلاس يقدر يوصلها. و [[_]] في الأول عرف لاسم النسخة الداخلية |
| [[val uiState: StateFlow<CartUiState>]] | النسخة اللي الشاشة بتشوفها. نوعها [[StateFlow]] (مفيهوش [[value =]]) فالقراية بس |
| [[.asStateFlow()]] | بيلف الـ Mutable في واجهة للقراية بس، فمحدش يعمل cast ويكتب |

---

## ٣. الأحداث: [[update]] و [[value =]]

~~~kotlin
fun addItem(price: Double) {
    _uiState.update { it.copy(count = it.count + 1, total = it.total + price) }
}
fun clear() {
    _uiState.value = CartUiState()
}
~~~

- [[update { }]]: بيديك القيمة الحالية في [[it]]، وانت ترجّع الجديدة. و [[it.copy(count = ...)]] نسخة من الـ data class بخانتين متغيرين والباقي زي ما هو.
- [[value = CartUiState()]]: حط قيمة جديدة على طول، ومش محتاج القديمة.

جربنا الـ ViewModel لوحده من غير أي شاشة:

~~~text الناتج
initial: CartUiState(count=0, total=0.0)
after 3 addItem: CartUiState(count=3, total=150.0)
after clear: CartUiState(count=0, total=0.0)
~~~

وده سبب كبير للـ ViewModel: المنطق بيتختبر بـ unit test عادي.

---

## ٤. الشاشة

~~~kotlin
@Composable
fun CartScreen(viewModel: CartViewModel = viewModel()) {
    val state by viewModel.uiState.collectAsStateWithLifecycle()
~~~

- [[viewModel: CartViewModel = viewModel()]]: الـ parameter اسمه [[viewModel]]، وافتراضيه نداء الدالة [[viewModel()]] (من [[lifecycle-viewmodel-compose]]): دوّر في الـ [[ViewModelStore]] على [[CartViewModel]]، ولو مش موجود اعمله. والنوع بيتعرف من نوع الـ parameter.
- [[collectAsStateWithLifecycle()]]: بيسمع الـ StateFlow ويحوّله لـ Compose state، فكل قيمة جديدة تعمل recomposition. و «WithLifecycle» يعني بيقف لما الشاشة تروح الخلفية.
- [[val state by ...]]: نفس [[by]] بتاعة درس remember، فتكتب [[state.count]] على طول.

~~~kotlin
Text("في السلة: $__{state.count} - الإجمالي: $__{state.total}")
Button(onClick = { viewModel.addItem(50.0) }) { Text("ضيف منتج بـ 50") }
TextButton(onClick = viewModel::clear) { Text("فضّي السلة") }
~~~

- الضغطة بتنادي دالة في الـ ViewModel (حدث طالع)، والـ state الجديد بينزل للـ Text.
- [[viewModel::clear]]: function reference: «الدالة [[clear]] بتاعة الـ object ده» كقيمة، بدل [[{ viewModel.clear() }]].

### «اللفة»: الشاشة اتشالت والـ store فضل

~~~text الناتج
CartViewModel created #695
after 3 clicks: في السلة: 3 - الإجمالي: 150.0
screen removed (store kept)
screen back: في السلة: 3 - الإجمالي: 150.0
onCleared #695
store cleared
CartViewModel created #897
screen back after clear: في السلة: 0 - الإجمالي: 0.0
~~~

- الـ ViewModel اتعمل **مرة واحدة** (#695). لما الشاشة اتشالت ورجعت، [[viewModel()]] لقاه في الـ store فرجّع نفسه، والعدد فضل 3. ده اللي بيحصل في اللفة: الـ Activity بتتعمل من الأول بس الـ store بيعيش.
- لما مسحنا الـ store (اللي بيحصل لما الشاشة تخرج نهائيًا)، اتنادت [[onCleared()]]، والمرة الجاية اتعمل ViewModel جديد (#897) بصفر. (الأرقام دي [[identityHashCode]] عشان نفرّق بين الـ objects.)
- و [[150.0]] مكتوبة بـ [[.0]] لأن [[total]] [[Double]].

---

## ٥. الـ solCode: [[SavedStateHandle]]

~~~kotlin
class CartViewModel(private val savedState: SavedStateHandle) : ViewModel() {
    val count: StateFlow<Int> = savedState.getStateFlow("count", 0)

    fun addItem() {
        savedState["count"] = count.value + 1
    }
}
~~~

- [[SavedStateHandle]]: map (key/value) بيتحفظ مع الـ saved state، فبيعيش حتى لو النظام قتل الـ process.
- [[getStateFlow("count", 0)]]: [[StateFlow]] للمفتاح [[count]]، وافتراضيه 0.
- [[savedState["count"] = ...]]: كتابة بالأقواس المربعة (operator [[set]])، والـ StateFlow بيتحدث لوحده.

~~~text الناتج
SavedStateHandle count=2 keys=[count]
restored handle count=5
~~~

بعد [[addItem()]] مرتين المفتاح [[count]] اتحفظ بـ 2. ولما عملنا handle جديد من map فيها [[count = 5]] (زي ما النظام بيرجّعه بعد process death)، الـ ViewModel بدأ من 5 مش 0.

على Android، [[viewModel()]] بتعرف تعمل ViewModel الـ constructor بتاعه [[SavedStateHandle]] لوحدها (الـ factory الافتراضي بتاع الـ Activity والـ navigation). الكود اتبنى، والسلوك ده من الـ docs.

---

## الخلاصة

- [[private val _uiState = MutableStateFlow(...)]] جوه، و [[val uiState: StateFlow = _uiState.asStateFlow()]] برا.
- غيّر بـ [[update { it.copy(...) }]].
- في الشاشة: [[viewModel()]] و [[collectAsStateWithLifecycle()]].
- الـ ViewModel بيعيش في اللفة، ويموت مع الـ process: اللي لازم يعيش بعدها يتحط في [[SavedStateHandle]] أو DataStore أو Room.`,
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

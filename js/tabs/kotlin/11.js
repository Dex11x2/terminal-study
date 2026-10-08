// تكملة تاب kotlin: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/kotlin/01.js (شرح حقول الدرس في أوله)
MORE("kotlin", [
    {
      t: "عالم Java و XML",
      l: 2,
      n: "مشاريع كتير شغالة لسه بـ Java وواجهات XML: تقراها، وتشتغل فيها بـ ViewBinding، وتخلي Java و Kotlin يعيشوا في نفس المشروع",
      items: [
        {
          cmd: "Android بـ Java: كلاس Activity و XML",
          title: "Android الكلاسيكي: Activity بـ Java، وواجهة XML، و findViewById و setOnClickListener",
          desc: R`قبل Compose (وقبل Kotlin)، الطريقة كانت كده، ولسه موجودة في تطبيقات كتير شغالة في شركات:

١. الواجهة في ملف XML جوه [[res/layout/activity_main.xml]]. كل عنصر View: [[TextView]] و [[Button]] و [[EditText]] و [[ImageView]]، جوه layouts زي [[LinearLayout]] و [[ConstraintLayout]]. والعنصر اللي هتتعامل معاه من الكود بتديله id: [[android:id="@+id/txtTitle"]] (الـ [[+]] معناها «اعمل id جديد بالاسم ده»).

٢. الـ Activity في Java بتورث من [[AppCompatActivity]]، وفي [[onCreate]] بتربط الـ layout بـ [[setContentView(R.layout.activity_main)]].

٣. بتجيب العنصر بـ [[findViewById(R.id.txtTitle)]]، وبتغيّره بإيدك: [[title.setText("...")]]. ده اسمه imperative UI: انت اللي بتقول «غيّر ده»، بعكس Compose.

٤. الأحداث بـ [[setOnClickListener(v -> { ... })]]. الـ [[->]] في Java هو الـ lambda (زي Kotlin بالظبط بس من غير [[{ }]] برا).

حاجات Java هتلاحظها: [[;]] في آخر كل سطر، والنوع قبل الاسم ([[TextView title]])، و [[@Override]] annotation اختيارية (في Kotlin [[override]] إجبارية)، و [[public]] و [[protected]] مكتوبين صريح، ومفيش null safety: أي [[findViewById]] بـ id غلط بيرجّع null ويقع بـ NullPointerException.

وفي Java [[int clicks = 0;]] field عادي، ولو الموبايل لف بيضيع زي أي متغير في الـ Activity.`,
          example: R`import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private int clicks = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        // اربط ملف الـ XML بالشاشة دي
        setContentView(R.layout.activity_main);
        TextView title = findViewById(R.id.txtTitle);
        Button button = findViewById(R.id.btnClick);
        button.setOnClickListener(v -> {
            clicks++;
            title.setText("دوست " + clicks + " مرة");
        });
    }
}`,
          try: R`اعمل مشروع جديد بقالب Empty Views Activity واختار Language = Java. حط الـ layout اللي في الحل تحت في [[activity_main.xml]] والكود في MainActivity، وشغّل. بعدين غيّر [[R.id.txtTitle]] لـ id مش موجود في الـ layout (ID لعنصر في layout تاني) وشوف بيقع إزاي.`,
          flag: "script",
          deep: {
            why: R`Android من 2008 لحد حوالي 2019 كان أغلبه Java و XML، ومشاريع كبيرة كتير لسه فيها آلاف الشاشات بالشكل ده. في الشغل هتقابل إصلاح bug في شاشة XML، أو نقل شاشة لـ Compose، أو مكتبة Java. فلازم تقرا الكود ده بسهولة حتى لو مش هتكتب مشاريع جديدة بيه.`,
            how: R`[[setContentView]] بيعمل inflate للـ XML: بيقرا الملف ويعمل object لكل عنصر (TextView و Button...) في شجرة اسمها View hierarchy. و [[findViewById]] بيدوّر في الشجرة على الـ id. لو لقاه رجّعه، ولو ملقاهوش رجّع null.

[[R.id.txtTitle]] رقم int في كلاس [[R]] اللي بيتولد وقت البناء (زي الـ resources).

الـ lambda [[v -> { ... }]] بتعمل implement لـ interface اسمه [[View.OnClickListener]] فيه دالة واحدة [[onClick(View v)]]. قبل Java 8 كان لازم تكتب anonymous class كاملة: [[new View.OnClickListener() { @Override public void onClick(View v) { ... } }]]، وهتلاقيها في كود قديم.

والـ lambda في Java بتقدر تستخدم [[title]] (متغير local) لأنه «effectively final» (متغيرش بعد ما اتعمل). وبتغيّر [[clicks]] لأنه field في الكلاس مش local.

وللستات في XML كان فيه [[RecyclerView]] مع [[Adapter]] و [[ViewHolder]]، وده أعقد بكتير من LazyColumn.`,
            when: "صيانة مشاريع قديمة، أو مكتبات Java، أو شغل في شركة بتنقل تطبيقها تدريجيًا. ومشروع جديد ابدأه Kotlin و Compose.",
            mistakes: R`[[findViewById]] قبل [[setContentView]]: كل حاجة null والتطبيق يقع بـ NullPointerException. و id موجود بس في layout تاني: نفس النتيجة. وتعمل شغل شبكة جوه onCreate على الـ main thread: [[NetworkOnMainThreadException]].`
          },
          teach: R`## الكود بيعمل إيه؟

شاشة Android بالطريقة القديمة: الواجهة في ملف XML فيه [[TextView]] و [[Button]]، والـ Activity بـ Java بتجيب الاتنين بالـ id، وكل ما تدوس الزرار العداد بيزيد والنص بيتغير لـ «دوست 1 مرة» و «دوست 2 مرة»...

### اتجرّب فين؟

مفيش emulator هنا، فالشاشة نفسها والضغط من الـ docs. اللي اتعمل: الـ Activity والـ layout اللي في الحل (solCode) اتترجموا زي ما هم في مشروع Android حقيقي (AGP 9.4.1 و [[compileSdk 36]] و [[appcompat]]) بـ [[./gradlew assembleDebug]]: الـ XML اتعمله inflate check وطلّع [[R.id.txtTitle]] و [[R.id.btnClick]]، والـ Java اترجمت بـ javac. وقواعد Java نفسها (الـ lambda والمتغيرات) اتجرّبت بـ [[javac]] في [[docker run --rm eclipse-temurin:21-jdk]].

---

## ١. الـ layout (solCode): [[res/layout/activity_main.xml]]

~~~xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="16dp">
~~~

- [[<?xml ...?>]]: سطر تعريف ملف XML والـ encoding بتاعه. موجود في أول أي ملف XML.
- [[LinearLayout]]: View بيرص اللي جواه ورا بعض، زي [[Column]] أو [[Row]] في Compose.
- [[xmlns:android="..."]]: **namespace**: بيقول إن أي attribute أوله [[android:]] جاي من Android. بيتكتب مرة واحدة في أول عنصر.
- [[layout_width]] و [[layout_height]]: [[match_parent]] = «خد كل مساحة الأب»، و [[wrap_content]] = «على قد اللي جوايا».
- [[gravity="center"]]: حط اللي جوايا في النص.
- [[orientation="vertical"]]: فوق بعض (و [[horizontal]] جنب بعض).
- [[padding="16dp"]]: مسافة جوه الحواف. [[dp]] وحدة بتطلع نفس الحجم على كل الشاشات.

~~~xml
    <TextView
        android:id="@+id/txtTitle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/start"
        android:textSize="20sp" />
~~~

- [[android:id="@+id/txtTitle"]]: اسم العنصر عشان الكود يوصله. [[@]] = resource، و [[+]] = «اعمل id جديد بالاسم ده»، و [[id/]] نوعه. من غير id الكود ميقدرش يوصل للعنصر.
- [[android:text="@string/start"]]: النص من [[res/values/strings.xml]] (درس AndroidManifest و res). في المشروع اللي اتترجم حطيت [[<string name="start">ابدأ</string>]] و [[<string name="press">دوس</string>]]، ومن غيرهم البناء بيفشل لأن الـ resource مش موجود.
- [[textSize="20sp"]]: [[sp]] زي dp بس بيكبر لو اليوزر كبّر الخط من الإعدادات. للنصوص دايمًا sp.
- [[/>]]: العنصر مقفول ومفيش جواه حاجة.

والـ [[Button]] نفس الفكرة بـ id اسمه [[btnClick]]. و [[</LinearLayout>]] في الآخر بيقفل الأب.

---

## ٢. الـ imports

~~~java
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
~~~

- [[Bundle]]: شنطة key-value فيها الـ state المحفوظ (لو الـ Activity اتعملت من الأول).
- [[android.widget.Button]] و [[TextView]]: كلاسات الـ Views. كل عنصر في الـ XML بيبقى object من الكلاس اللي بنفس اسمه.
- [[AppCompatActivity]]: الـ Activity الأب من [[androidx.appcompat]]: بيدّي نفس الشكل والمميزات على النسخ القديمة.

ولو الكلاس في package تاني غير الـ namespace بتاع التطبيق، محتاج كمان [[import com.example.app.R;]] عشان [[R]]. في المشروع اللي اتترجم كان الكلاس في [[com.example.k04.java]] فاحتجته.

---

## ٣. الكلاس والـ field

~~~java
public class MainActivity extends AppCompatActivity {
    private int clicks = 0;
~~~

- [[public class MainActivity]]: في Java اسم الكلاس الـ public لازم يبقى نفس اسم الملف: [[MainActivity.java]].
- [[extends AppCompatActivity]]: الوراثة في Java بكلمة [[extends]] (في Kotlin [[:]]).
- [[private int clicks = 0;]]: field. النوع الأول ([[int]] بحرف صغير، رقم primitive) وبعدين الاسم. مفيش [[val]] و [[var]]: لو عايزه ثابت تكتب [[final]].

---

## ٤. [[onCreate]]

~~~java
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
~~~

- [[@Override]]: بنعيد تعريف دالة موجودة في الأب. في Java اختيارية (بس لو كتبتها والاسم غلط، المترجم بيقولك)، وفي Kotlin [[override]] إجبارية.
- [[protected]]: متاحة للكلاس وولاده (والـ package). نفس اللي في الأب، ومينفعش تضيّقها.
- [[void]]: مبترجعش حاجة (زي [[Unit]]).
- [[onCreate]]: أول دالة بتتنادى لما الشاشة تتعمل (درس Activity و lifecycle).
- [[super.onCreate(...)]]: نادي نسخة الأب الأول. لو نسيتها التطبيق بيقع بـ [[SuperNotCalledException]] (من الـ docs).

~~~java
        // اربط ملف الـ XML بالشاشة دي
        setContentView(R.layout.activity_main);
~~~

[[setContentView(R.layout.activity_main)]]: اقرا ملف [[activity_main.xml]] واعمل object لكل عنصر فيه (ده اسمه **inflate**)، واعرضهم. [[R.layout.activity_main]] رقم int في كلاس [[R]] اللي بيتولد وقت البناء من أسماء الملفات.

---

## ٥. [[findViewById]]

~~~java
        TextView title = findViewById(R.id.txtTitle);
        Button button = findViewById(R.id.btnClick);
~~~

- [[TextView title = ...]]: متغير local: النوع، الاسم، القيمة.
- [[findViewById(R.id.txtTitle)]]: دوّر في العناصر اللي اتعملت على العنصر اللي الـ id بتاعه ده. [[R.id.txtTitle]] الرقم اللي اتولّد من [[@+id/txtTitle]].
- لو الـ id مش موجود في الـ layout اللي اتعمله inflate، بيرجّع [[null]]، وأول ما تنادي عليه دالة التطبيق بيقع بـ [[NullPointerException]]. وده اللي الـ try بيوريهولك: الرسالة اللي في الحل ([[Attempt to invoke virtual method ... on a null object reference]]) هي شكل NPE على Android.
- ولازم ييجي **بعد** [[setContentView]]: قبله مفيش عناصر أصلًا.

---

## ٦. الضغط: [[setOnClickListener]]

~~~java
        button.setOnClickListener(v -> {
            clicks++;
            title.setText("دوست " + clicks + " مرة");
        });
    }
}
~~~

- [[setOnClickListener(...)]]: «لما حد يدوس، نفّذ ده». بتاخد object بينفّذ [[View.OnClickListener]]، وده interface فيه دالة واحدة [[onClick(View v)]].
- [[v -> { ... }]]: lambda في Java. [[v]] الـ parameter (الـ View اللي اتداس، يعني الزرار)، و [[->]] بعدها الجسم. في Kotlin نفس الفكرة بتتكتب [[{ v -> ... }]].
- [[clicks++]]: زوّد واحد.
- [["دوست " + clicks + " مرة"]]: [[+]] بين نص ورقم بيلزقهم نص واحد (Java مفيهاش string templates).
- [[title.setText(...)]]: غيّر النص **بإيدك**. ده الـ imperative UI: انت اللي بتقول للـ View يتغير، بعكس Compose اللي بيرسم من الـ state.
- [[});]]: [[}]] تقفل الـ lambda، و [[)]] تقفل [[setOnClickListener(]]، و [[;]] آخر الجملة.

### ليه الـ lambda تقدر تستخدم [[title]] وتغيّر [[clicks]]؟

- [[title]] متغير local، والـ lambda في Java تقدر تقرا متغير local بس لو «effectively final» (اتحط مرة ومتغيرش).
- [[clicks]] field في الكلاس مش local، فتقدر تغيّره عادي.

جرّبت lambda بتغيّر متغير local بـ [[javac]]:

~~~text الناتج
Lam.java:9: error: local variables referenced from a lambda expression must be final or effectively final
            local++;
            ^
~~~

عشان كده العداد field مش local جوه onCreate.

### الشكل القديم قبل Java 8

~~~java
button.setOnClickListener(new View.OnClickListener() {
    @Override
    public void onClick(View v) {
        clicks++;
    }
});
~~~

ده **anonymous class**: كلاس من غير اسم بينفّذ الـ interface في نفس المكان. نفس معنى الـ lambda بالظبط، وهتلاقيه كتير في كود قديم.

---

## ٧. لما تلف الموبايل (من الـ docs)

الـ rotation بيدمر الـ Activity ويعملها من جديد: [[onCreate]] بتتنادى تاني، و [[clicks]] بيرجع 0، والنص بيرجع لـ [[@string/start]]. في Compose ده نفس سبب [[rememberSaveable]] والـ ViewModel.

---

## الخلاصة

| الخطوة | Java + XML | Compose |
|---|---|---|
| الواجهة | ملف [[res/layout/*.xml]] | دوال [[@Composable]] |
| تعرضها | [[setContentView(R.layout.x)]] | [[setContent { }]] |
| توصل لعنصر | [[findViewById(R.id.x)]] (ممكن null) | مش محتاج |
| تغيّره | [[title.setText(...)]] بإيدك | تغيّر الـ state |
| الضغط | [[setOnClickListener(v -> { })]] | [[onClick = { }]] |

- [[findViewById]] بعد [[setContentView]]، وبـ id موجود في نفس الـ layout، وإلا NullPointerException.`,
          lines: [
            R`[[Bundle]]: الـ state المتحفوظ.`,
            "الزرار.",
            "النص.",
            "الـ Activity الأب (فيها دعم الثيمات القديمة).",
            R`كلاس بيورث بـ [[extends]].`,
            R`field عادي (مفيش [[val]] و [[var]] في Java، النوع قبل الاسم).`,
            R`[[@Override]]: بنغيّر دالة الأب.`,
            "onCreate بالـ syntax بتاع Java.",
            "الأب الأول.",
            "اربط ملف activity_main.xml.",
            R`هات الـ TextView بالـ id (ممكن يرجع null).`,
            "هات الزرار.",
            R`حدث الضغط بـ lambda: [[v]] هو الزرار نفسه.`,
            "زوّد العداد.",
            R`غيّر النص بإيدك ([[+]] بتلزق النصوص).`,
            "قفلة الـ lambda والـ setOnClickListener.",
            "قفلة onCreate.",
            "قفلة الكلاس."
          ],
          sol: R`كل دوسة بتغيّر النص: «دوست 1 مرة» ثم «دوست 2 مرة»... ولو لفيت الموبايل العداد بيرجع صفر والنص بيرجع للي في الـ XML، لأن الـ Activity اتعملت من الأول.

ولما تحط id مش في الـ layout: التطبيق بيقع أول ما يفتح بـ [[java.lang.NullPointerException: Attempt to invoke virtual method 'void android.widget.Button.setOnClickListener(...)' on a null object reference]]. الرسالة دي هتشوفها كتير في المشاريع القديمة، وأول سؤال يبقى: الـ id ده في الـ layout ده فعلًا؟`,
          solCode: R`<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:gravity="center"
    android:orientation="vertical"
    android:padding="16dp">

    <TextView
        android:id="@+id/txtTitle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/start"
        android:textSize="20sp" />

    <Button
        android:id="@+id/btnClick"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/press" />
</LinearLayout>`
        },
        {
          cmd: "ViewBinding",
          title: "ViewBinding بـ Kotlin بدل findViewById، و Compose جوه شاشة XML",
          desc: R`لو شغال على مشروع XML بـ Kotlin، متستخدمش [[findViewById]]. استخدم [[ViewBinding]]: Gradle بيولّد كلاس لكل layout فيه property لكل عنصر ليه id.

• تفعّله: [[buildFeatures { viewBinding = true }]] في [[app/build.gradle.kts]].
• [[activity_main.xml]] بيطلع منه [[ActivityMainBinding]]، و [[txt_title]] أو [[txtTitle]] بيبقى [[binding.txtTitle]].
• [[ActivityMainBinding.inflate(layoutInflater)]] بيعمل الـ views، و [[setContentView(binding.root)]] بيعرضها.

المكسب: النوع صح (TextView مش View)، ومفيش null لو الـ id مش في الـ layout ده، لأن الـ property مش هتبقى موجودة أصلًا والكود مش هيترجم.

[[private lateinit var binding: ActivityMainBinding]]: [[lateinit]] (من درس null safety) لأن الـ binding مينفعش يتعمل غير في onCreate، ومش عايزينه nullable.

و Compose جوه XML: حط [[<androidx.compose.ui.platform.ComposeView android:id="@+id/composeView" .../>]] في الـ layout، و [[binding.composeView.setContent { ... }]]. وده الطريق المعتاد لنقل تطبيق قديم لـ Compose شاشة شاشة أو حتة حتة. والعكس كمان موجود: [[AndroidView]] بيحط View قديم جوه Compose (زي خريطة أو WebView).

وهتلاقي في مشاريع قديمة جدًا [[kotlin-android-extensions]] (synthetics، كنت بتكتب [[txtTitle.text]] على طول): اتشالت من سنين، ولو قابلتها انقلها لـ ViewBinding.`,
          example: R`class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private var clicks = 0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.btnClick.setOnClickListener {
            clicks++
            binding.txtTitle.text = "دوست $clicks مرة"
        }
        binding.composeView.setContent {
            MaterialTheme {
                Text("أنا Compose جوه XML")
            }
        }
    }
}`,
          try: R`خد مشروع الدرس اللي فات، ضيف Kotlin Activity بالكود ده، وفعّل viewBinding، وضيف ComposeView في الـ layout تحت الزرار. جرّب تكتب [[binding.]] وشوف الـ autocomplete بيقترح إيه. وبعدين جرّب تغيّر الـ Text اللي في الـ Compose لـ Button بيزوّد نفس العداد.`,
          flag: "script",
          deep: {
            why: R`أغلب المشاريع اللي بتتنقل من Java لـ Kotlin بتعدّي بالمرحلة دي: Kotlin مع XML و ViewBinding، وبعدين Compose جوه XML في الشاشات الجديدة. لو بتدوّر على شغل، فرصتك تقابل الشكل ده كبيرة.`,
            how: R`لكل layout، Gradle بيولّد كلاس في [[build/generated]] اسمه من اسم الملف بـ PascalCase وفي الآخر Binding. جواه [[root]] (أول عنصر) و property لكل view ليه id، والأسماء بتتحول لـ camelCase ([[btn_click]] تبقى [[btnClick]]).

في الـ Fragments (شاشات صغيرة جوه Activity في عالم XML) لازم تمسح الـ binding في [[onDestroyView]] ([[_binding = null]])، لأن الـ Fragment بيعيش أطول من الـ View بتاعه، وإلا memory leak.

[[binding.txtTitle.text = "..."]]: في Kotlin الـ getter و setter بتوع Java ([[getText]] و [[setText]]) بيتقروا كـ property ([[text]]). ده جزء من الـ interop (الدرس الجاي).

[[DataBinding]] حاجة تانية أتقل: بتكتب expressions جوه الـ XML. هتشوفها في مشاريع، بس Google بتوصي بـ ViewBinding للجديد.`,
            when: "أي شاشة XML بـ Kotlin. و ComposeView لما تضيف حاجة جديدة في شاشة قديمة.",
            mistakes: R`تنسى [[setContentView(binding.root)]] وتعمل [[setContentView(R.layout.activity_main)]]: كده فيه نسختين من الـ views، واللي بتعدّل فيها مش اللي ظاهرة. وتنسى تفعّل [[viewBinding]] فـ [[ActivityMainBinding]] مش موجود ([[Unresolved reference]]). وتمسك الـ binding في Fragment بعد onDestroyView.`
          },
          teach: R`## الكود بيعمل إيه؟

نفس شاشة الدرس اللي فات (TextView وزرار وعداد)، بس بـ Kotlin، وبدل [[findViewById]] بنستخدم كلاس اسمه [[ActivityMainBinding]] Gradle بيولّده من ملف الـ XML. وفي الآخر بنحط حتة Compose جوه نفس الشاشة القديمة عن طريق [[ComposeView]].

### اتجرّب فين؟

مفيش emulator، فالشاشة والضغط من الـ docs. اللي اتعمل: المثال والحل اتترجموا في مشروع Android حقيقي (AGP 9.4.1 و Kotlin 2.4.20 و [[compileSdk 36]]) بـ [[viewBinding = true]] ونفس [[activity_main.xml]] بتاع الدرس اللي فات + [[ComposeView]] بـ id اسمه [[composeView]]. وقريت الكلاس اللي اتولّد فعلًا: [[build/generated/data_binding_base_class_source_out/debug/out/com/example/k04/databinding/ActivityMainBinding.java]].

---

## ١. التفعيل والـ layout

في [[app/build.gradle.kts]] جوه [[android { }]]:

~~~kotlin
buildFeatures {
    viewBinding = true
}
~~~

وفي [[activity_main.xml]] تحت الزرار:

~~~xml
<androidx.compose.ui.platform.ComposeView
    android:id="@+id/composeView"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content" />
~~~

[[ComposeView]] View عادي بالاسم الكامل بتاعه (package + كلاس)، لأنه مش من الـ Views الأساسية زي TextView. هو «فتحة» Compose بيرسم جواها.

---

## ٢. الكلاس اللي اتولّد

من [[activity_main.xml]] اتولّد [[ActivityMainBinding]]: اسم الملف بـ PascalCase (أول كل كلمة كابيتال ومن غير [[_]]) + [[Binding]]. ده جزء منه زي ما هو:

~~~java
public final class ActivityMainBinding implements ViewBinding {
  @NonNull
  private final LinearLayout rootView;

  @NonNull
  public final Button btnClick;

  @NonNull
  public final ComposeView composeView;

  @NonNull
  public final TextView txtTitle;
~~~

- field لكل عنصر **ليه id** بس، بنفس النوع بالظبط ([[Button]] مش [[View]]). الـ [[LinearLayout]] ملوش id، فمش ليه field غير [[rootView]].
- [[@NonNull]] على كله: Kotlin شايفاهم مش nullable (درس التكامل بين Java و Kotlin).
- لو الـ id مكتوب [[txt_title]] في الـ XML، الـ field بيبقى [[txtTitle]] (camelCase).

وجرّبت أكتب [[binding.txtSubtitle]] (id مش موجود في الـ layout):

~~~text الناتج
e: file:///w/app/src/main/java/com/example/k04/Bad.kt:6:7 Unresolved reference 'txtSubtitle' on receiver of type 'ActivityMainBinding'.
~~~

الغلطة دي اتمسكت **وقت الترجمة**. مع [[findViewById]] نفس الغلطة كانت null و crash وقت التشغيل.

---

## ٣. الـ Activity سطر سطر

~~~kotlin
class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private var clicks = 0
~~~

- [[: AppCompatActivity()]]: الوراثة في Kotlin بـ [[:]]، والأقواس بتنادي constructor الأب.
- [[private lateinit var binding: ActivityMainBinding]]: [[lateinit]] = «هحط فيه قيمة بعدين، قبل ما استخدمه». الـ binding مينفعش يتعمل في الـ constructor (لسه مفيش [[layoutInflater]])، فبيتعمل في [[onCreate]]. ولو استخدمته قبلها: [[UninitializedPropertyAccessException]].
- [[private var clicks = 0]]: العداد، والنوع [[Int]] متستنتج.

~~~kotlin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
~~~

[[override]] إجبارية في Kotlin. و [[Bundle?]] nullable لأن أول مرة مفيش state محفوظ.

~~~kotlin
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
~~~

- [[layoutInflater]]: الـ [[LayoutInflater]] بتاع الـ Activity، الأداة اللي بتحوّل XML لـ Views. في Kotlin [[getLayoutInflater()]] بتاعة Java بتتقري property.
- [[ActivityMainBinding.inflate(...)]]: static في الكلاس المولّد. جواه بيعمل [[inflater.inflate(R.layout.activity_main, ...)]] وبعدين [[bind(root)]] اللي بيدوّر على كل id مرة واحدة ويحطهم في الـ fields.
- [[setContentView(binding.root)]]: اعرض الـ root ([[getRoot()]] في Java). لازم **الـ root ده بالذات**، مش [[R.layout.activity_main]]: لو عملت كده هيتعمل inflate تاني ونسخة تانية من الـ Views هي اللي تظهر، والـ binding بيعدّل في نسخة مش ظاهرة.

~~~kotlin
        binding.btnClick.setOnClickListener {
            clicks++
            binding.txtTitle.text = "دوست $clicks مرة"
        }
~~~

- [[binding.btnClick]]: الزرار بنوعه الصح، من غير بحث ومن غير null.
- [[setOnClickListener { }]]: [[View.OnClickListener]] interface فيه دالة واحدة، فـ Kotlin بتقبل lambda مكانه (SAM conversion)، ولأنها آخر parameter بتتكتب برا الأقواس (trailing lambda). مش محتاجين [[v]] فمكتبناهوش.
- [[binding.txtTitle.text = ...]]: [[setText()]] / [[getText()]] بتوع Java بقوا property اسمها [[text]].
- [["دوست $clicks مرة"]]: string template بدل [[+]] بتاع Java.

~~~kotlin
        binding.composeView.setContent {
            MaterialTheme {
                Text("أنا Compose جوه XML")
            }
        }
    }
}
~~~

- [[binding.composeView.setContent { }]]: نفس [[setContent]] اللي في [[ComponentActivity]]، بس على View واحد. اللي جوه الـ lambda composables عادية.
- [[MaterialTheme { }]]: ثيم Material 3، عشان الألوان والخطوط.
- [[Text(...)]]: هيظهر تحت الزرار جوه الشاشة القديمة.

ده الطريق المعتاد للانتقال لـ Compose حتة حتة: الشاشة القديمة زي ما هي، والجديد جوه ComposeView.

---

## ٤. حل التجربة (solCode): عداد واحد للاتنين

~~~kotlin
    private val clicks = mutableIntStateOf(0)
~~~

[[mutableIntStateOf(0)]]: state بتاع Compose نوعه Int (من غير boxing). Compose بيراقبه، فأي composable بيقرا [[clicks.intValue]] بيترسم تاني لما يتغير.

~~~kotlin
        binding.btnClick.setOnClickListener { increment() }
        binding.composeView.setContent {
            MaterialTheme {
                Button(onClick = { increment() }) { Text("Compose: $__{clicks.intValue}") }
            }
        }
    }

    private fun increment() {
        clicks.intValue++
        binding.txtTitle.text = "دوست $__{clicks.intValue} مرة"
    }
~~~

- الزرار القديم والـ [[Button]] بتاع Compose الاتنين بينادوا [[increment()]].
- [[clicks.intValue++]]: Compose بيلاحظ، فنص الـ Button بيتحدث لوحده.
- [[binding.txtTitle.text = ...]]: الـ TextView القديم **مش** بيراقب state، فلازم نحدّثه بإيدك. ده الفرق بين النظامين في سطرين.

الكود ده اتترجم في نفس المشروع.

---

## الخلاصة

| findViewById | ViewBinding |
|---|---|
| [[findViewById<TextView>(R.id.txtTitle)]] | [[binding.txtTitle]] |
| ممكن يرجّع null وقت التشغيل | id مش موجود = خطأ ترجمة |
| ممكن تحط نوع غلط | النوع من الـ XML |
| [[setContentView(R.layout.x)]] | [[setContentView(binding.root)]] |

- فعّله بـ [[buildFeatures { viewBinding = true }]]، والكلاس اسمه من اسم الملف + [[Binding]].
- [[ComposeView]] + [[setContent { }]] = Compose جوه XML.`,
          lines: [
            R`Activity بـ Kotlin بتورث من [[AppCompatActivity]].`,
            R`[[lateinit]]: هيتعمل في onCreate.`,
            "عداد.",
            R`[[override]] إجبارية في Kotlin.`,
            "الأب الأول.",
            R`[[inflate]]: اعمل كل الـ views من الـ XML.`,
            R`اعرض الـ [[root]].`,
            R`الزرار بالاسم ونوعه صح، والـ lambda trailing.`,
            "زوّد.",
            R`[[text]] property بدل [[setText]].`,
            "قفلة الـ listener.",
            R`الـ [[ComposeView]] اللي في الـ XML: نحط فيه Compose.`,
            "ثيم Material.",
            "composable عادي.",
            "قفلة الثيم.",
            "قفلة setContent.",
            "قفلة onCreate.",
            "قفلة الكلاس."
          ],
          sol: R`الـ autocomplete بعد [[binding.]] بيقترح [[root]] و [[txtTitle]] و [[btnClick]] و [[composeView]]: كل عنصر ليه id. والنص اللي في Compose بيظهر تحت الزرار عادي جوه شاشة XML.

وحل التجربة: العداد لازم يبقى state يشوفه الاتنين. أبسط حاجة [[mutableIntStateOf]] كـ property في الـ Activity، والزرار القديم والجديد بيغيّروه، والـ TextView بيتحدث بإيدك في الـ listener. ده بيوضح ليه الأحسن تحط الـ state في ViewModel لما تخلط النظامين.`,
          solCode: R`class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private val clicks = mutableIntStateOf(0)

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.btnClick.setOnClickListener { increment() }
        binding.composeView.setContent {
            MaterialTheme {
                Button(onClick = { increment() }) { Text("Compose: $__{clicks.intValue}") }
            }
        }
    }

    private fun increment() {
        clicks.intValue++
        binding.txtTitle.text = "دوست $__{clicks.intValue} مرة"
    }
}`
        },
        {
          cmd: "التكامل بين Java و Kotlin في أندرويد",
          title: "Java و Kotlin في نفس المشروع: تنادي ده من ده إزاي؟ (@Nullable و @JvmStatic و @JvmOverloads)",
          desc: R`Java و Kotlin بيترجموا لنفس الـ bytecode، فممكن يبقوا في نفس المشروع ونفس الـ module، وكل واحد ينادي التاني على طول. وده اللي خلّى الشركات تنقل لـ Kotlin تدريجيًا: الشاشات الجديدة Kotlin، والقديم Java زي ما هو.

من Kotlin تنادي Java:
• الكلاس والدوال زي ما هم: [[PriceFormatter.formatEgp(150.0)]].
• الـ getters و setters بتتقري كـ properties: [[user.getName()]] تبقى [[user.name]].
• المشكلة: Java ملهاش null safety. القيمة اللي جاية من Java من غير annotation نوعها [[String!]] (platform type): المترجم مش عارف هي nullable ولا لأ، وسايبلك المسؤولية.
• الحل: في Java حط [[@NonNull]] أو [[@Nullable]] (من [[androidx.annotation]]). Kotlin بتقراهم وتعامل النوع [[String]] أو [[String?]].

من Java تنادي Kotlin:
• دالة top-level في [[Utils.kt]] بتتنادى [[UtilsKt.format(...)]]. و [[@file:JvmName("Utils")]] يغيّر الاسم.
• دالة في [[companion object]] بتتنادى [[User.Companion.create()]]، إلا لو عليها [[@JvmStatic]] فتبقى [[User.create()]].
• الـ default arguments Java مبتفهمهاش. [[@JvmOverloads]] بيعمل نسخة لكل احتمال.
• الـ property [[val name]] بتبان في Java [[getName()]].`,
          example: R`package com.sara.shop.utils;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import java.util.Locale;

public class PriceFormatter {
    @NonNull
    public static String formatEgp(double amount) {
        return String.format(Locale.US, "%.2f ج.م", amount);
    }

    @Nullable
    public static String findCoupon(@NonNull String code) {
        return code.equals("EID") ? "خصم 10%" : null;
    }
}`,
          try: R`في مشروع Kotlin، اعمل الملف ده [[PriceFormatter.java]]، وناديه من Kotlin: [[PriceFormatter.formatEgp(99.5)]] و [[PriceFormatter.findCoupon("X")?.length]]. جرّب تشيل [[?.]] وشوف المترجم يعترض. بعدين شيل [[@Nullable]] من Java، واعمل [[val c: String = PriceFormatter.findCoupon("X")]] وشغّل.`,
          flag: "script",
          deep: {
            why: R`أي مشروع Android عمره أكتر من كام سنة فيه Java. وكمان مكتبات Java كتير (OkHttp كان Java، و Retrofit Java، و Glide Java). فهم حدود الـ interop بيمنع crashes غريبة في النقطة اللي اللغتين بيتقابلوا فيها.`,
            how: R`Gradle بيترجم الاتنين مع بعض: مترجم Kotlin بيقرا ملفات Java عشان يفهم الأنواع، وبعدين [[javac]] بيترجم Java وهو شايف الـ classes بتاعة Kotlin.

الـ platform type [[String!]] مش حاجة تقدر تكتبها، المترجم بس بيعرضها في الـ hints. لو حطيته في متغير [[String]] وجه null، Kotlin بتحط فحص وترمي [[NullPointerException]] في السطر ده بالظبط (أحسن من إنه يقع بعيد).

أسماء في Kotlin هي كلمات محجوزة في Java أو العكس: لو دالة Java اسمها [[is]] أو [[in]] أو [[object]]، بتناديها من Kotlin بين backticks.

[[@Throws(IOException::class)]] على دالة Kotlin: عشان Java تعرف إنها بترمي checked exception (Java بتجبر الـ catch، و Kotlin معندهاش الفكرة دي).

وأدوات مساعدة: Android Studio فيه Code ثم Convert Java File to Kotlin File. بيدّي نقطة بداية كويسة، بس راجع الناتج (بيحط [[!!]] كتير ولازم تنضّف).`,
            when: "أي مشروع فيه اللغتين، أو مكتبة Java بتستخدمها من Kotlin، أو مكتبة Kotlin هتتنادى من Java.",
            mistakes: R`تثق في قيمة جاية من Java من غير annotations وتحطها في نوع مش nullable. وتنسى [[@JvmStatic]] وتستغرب [[Companion]] في كود Java. وتحوّل ملف كبير بالـ converter وتعمل commit من غير مراجعة وكله [[!!]].`
          },
          teach: R`## الكود بيعمل إيه؟

المثال كلاس Java فيه دالتين [[static]]: واحدة بتنسّق السعر بالجنيه ومبترجعش null أبدًا، وواحدة بتدوّر على كوبون وممكن ترجّع null. والـ annotations [[@NonNull]] و [[@Nullable]] بتقول لـ Kotlin الفرق ده. والحل (solCode) الجهة التانية: كود Kotlin متظبط عشان Java تناديه بشكل طبيعي.

### اتجرّب فين؟

الاتنين اتشغّلوا جوه [[docker run --rm eclipse-temurin:21-jdk]]: الـ Java بـ [[javac]] (Java 21) مع [[androidx.annotation]] ([[annotation-jvm-1.9.1.jar]]) على الـ classpath، والـ Kotlin بـ [[kotlinc]] 2.4.20 وهو شايف الـ classes بتاعة Java. ونفس الملفات اتترجمت كمان جوه مشروع Android حقيقي (AGP 9.4.1) فيه Java و Kotlin في نفس الـ module.

---

## ١. الـ Java سطر سطر

~~~java
package com.sara.shop.utils;
~~~

[[package]]: الكلاس ده في «فولدر» اسمه [[com.sara.shop.utils]]. وفي Java مكان الملف لازم يطابقه: [[com/sara/shop/utils/PriceFormatter.java]]. والـ [[;]] آخر كل جملة في Java إجباري.

~~~java
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import java.util.Locale;
~~~

- [[@NonNull]] و [[@Nullable]]: annotations من مكتبة [[androidx.annotation]] (موجودة في أي مشروع Android). لوحدها مبتعملش حاجة وقت التشغيل، هي معلومة للأدوات والمترجم.
- [[Locale]]: إعدادات اللغة والبلد، وبتأثر على شكل الأرقام.

~~~java
public class PriceFormatter {
    @NonNull
    public static String formatEgp(double amount) {
        return String.format(Locale.US, "%.2f ج.م", amount);
    }
~~~

- [[public class]]: كلاس متاح لأي حد. في Java لازم تكتب [[public]]، وفي Kotlin هو الافتراضي.
- [[@NonNull]] فوق الدالة: «اللي بترجّعه عمره ما يبقى null».
- [[public static String formatEgp(double amount)]]: بالترتيب: متاحة للكل، [[static]] (تتنادى باسم الكلاس من غير object، زي [[companion object]] في Kotlin)، بترجّع [[String]]، اسمها، وبتاخد [[double]] اسمه amount. في Java النوع قبل الاسم.
- [[String.format(Locale.US, "%.2f ج.م", amount)]]: [[%.2f]] يعني «رقم عشري برقمين بعد العلامة». و [[Locale.US]] عشان العلامة العشرية تبقى نقطة والأرقام إنجليزي حتى لو لغة الموبايل عربي أو ألماني.

~~~java
    @Nullable
    public static String findCoupon(@NonNull String code) {
        return code.equals("EID") ? "خصم 10%" : null;
    }
}
~~~

- [[@Nullable]]: «ممكن ترجّع null».
- [[@NonNull String code]]: الـ parameter نفسه مينفعش يبقى null.
- [[code.equals("EID")]]: مقارنة النصوص في Java بـ [[equals]]، مش [[==]] (اللي في Java بيقارن العنوان في الذاكرة). في Kotlin [[==]] بتنادي [[equals]] لوحدها.
- [[شرط ? أ : ب]]: الـ ternary operator: لو الشرط true خد أ، غير كده ب. Kotlin مفيهاش ده، وبتستخدم [[if (شرط) أ else ب]] كتعبير.

---

## ٢. من Kotlin: الـ annotations بتعمل إيه

~~~kotlin
import com.sara.shop.utils.PriceFormatter
fun main() {
    val p = PriceFormatter.formatEgp(99.5)
    println(p)
    println(PriceFormatter.findCoupon("EID"))
    println(PriceFormatter.findCoupon("X")?.length)
}
~~~

~~~text الناتج
99.50 ج.م
خصم 10%
null
~~~

- [[PriceFormatter.formatEgp(99.5)]]: الدوال الـ [[static]] بتتنادى من Kotlin باسم الكلاس زي ما هي. وبسبب [[@NonNull]]، Kotlin شايفة النوع [[String]].
- [[findCoupon("X")?.length]]: بسبب [[@Nullable]] النوع [[String?]]، فلازم [[?.]] (درس null safety): لو null رجّع null من غير ما تكمل.

شيلت [[?.]] وكتبت [[findCoupon("X").length]]:

~~~text الناتج
use2.kt:3:43: error: only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type 'String?'.
~~~

المترجم مسك الغلطة قبل التشغيل. ده كل المكسب من [[@Nullable]].

---

## ٣. من غير annotation: الـ platform type [[String!]]

شيلت [[@Nullable]] من الـ Java وعدت ترجمته. دلوقتي Kotlin مش عارفة الدالة ممكن ترجّع null ولا لأ، فالنوع بقى **platform type**، والـ IDE بيعرضه [[String!]] (مش syntax تقدر تكتبه). المترجم بيسيبك تعامله زي ما انت عايز، والمسؤولية عليك.

نفس السطر [[findCoupon("X").length]] اترجم من غير ولا كلمة، ووقع وقت التشغيل:

~~~text الناتج
Exception in thread "main" java.lang.NullPointerException: Cannot invoke "String.length()" because the return value of "com.sara.shop.utils.PriceFormatter.findCoupon(String)" is null
	at Use2Kt.main(use2.kt:3)
~~~

والتجربة اللي في الـ try ([[val c: String = PriceFormatter.findCoupon("X")]]):

~~~text الناتج
EID: خصم 10%
Exception in thread "main" java.lang.NullPointerException: findCoupon(...) must not be null
	at Use3Kt.main(use3.kt:5)
~~~

- مع [[EID]] اشتغل عادي، فالـ bug بيستخبى لحد ما قيمة null تيجي.
- لما حطيت platform type في متغير [[String]]، Kotlin حطت فحص في السطر ده بالظبط، فالـ crash بيشاور على المكان الصح (سطر 5) ورسالته [[must not be null]]، مش بعدين في حتة بعيدة.
- ونفس السطر والـ [[@Nullable]] موجودة: المترجم رفض: [[initializer type mismatch: expected 'String', actual 'String?']].

| الـ Java | Kotlin شايفة | لو جه null |
|---|---|---|
| [[@NonNull String]] | [[String]] | مش المفروض يحصل |
| [[@Nullable String]] | [[String?]] | المترجم بيجبرك تتعامل معاه |
| [[String]] من غير annotation | [[String!]] (platform type) | crash وقت التشغيل |

---

## ٤. الجهة التانية: Java تنادي Kotlin (solCode)

~~~kotlin
@file:JvmName("Prices")
package com.sara.shop.utils

@JvmOverloads
fun discount(price: Double, percent: Int = 10): Double = price * (100 - percent) / 100

class Coupon private constructor(val code: String) {
    companion object {
        @JvmStatic
        fun of(code: String) = Coupon(code.uppercase())
    }
}
~~~

### [[@file:JvmName("Prices")]]

الدالة [[discount]] top-level (مش جوه كلاس). بس الـ JVM مفيهوش دوال برا كلاس، فـ Kotlin بتحطها في كلاس اسمه من اسم الملف + [[Kt]]: [[PricesKt]]. [[@file:JvmName]] (لازم أول سطر، قبل [[package]]) بيغيّر الاسم لـ [[Prices]]. اتأكدت: كتبت [[PricesKt.discount(200.0)]] في Java:

~~~text الناتج
Bad.java:4: error: cannot find symbol
        double a = PricesKt.discount(200.0);
~~~

### [[@JvmOverloads]]

Java مفيهاش default arguments، فكانت هتشوف [[discount(double, int)]] بس. [[@JvmOverloads]] بيولّد نسخة لكل عدد parameters. شفت الكلاس المترجم بـ [[javap]] (أداة في الـ JDK بتعرض شكل الـ class):

~~~text الناتج
public final class com.sara.shop.utils.Prices {
  public static final double discount(double, int);
  public static double discount$default(double, int, int, java.lang.Object);
  public static final double discount(double);
}
~~~

[[discount(double)]] هي النسخة اللي [[@JvmOverloads]] عملها. و [[discount$default]] دالة داخلية Kotlin بتستخدمها للقيم الافتراضية.

### [[class Coupon private constructor(val code: String)]]

- [[private constructor]]: محدش يعمل Coupon بـ [[Coupon("...")]] من برا. لازم يعدّي على [[of]] اللي بتعمل [[uppercase()]] الأول.
- [[val code]] بتبان لـ Java كـ getter: [[getCode()]] (في javap فوق: [[public final java.lang.String getCode();]]).

### [[@JvmStatic]]

من غيره، Java بتنادي دوال الـ companion عن طريق field اسمه [[Companion]]: [[Coupon.Companion.of("x")]]. ومعاه بيتعمل كمان [[static]] حقيقية على الكلاس نفسه: [[public static final com.sara.shop.utils.Coupon of(java.lang.String);]]، فتبقى [[Coupon.of("eid")]].

### كود Java اللي في التعليقات، متشغّل

~~~java
double a = Prices.discount(200.0);
double b = Prices.discount(200.0, 25);
Coupon c = Coupon.of("eid");
String code = c.getCode();
System.out.println(a + " " + b + " " + code);
~~~

~~~text الناتج
180.0 150.0 EID
~~~

- [[discount(200.0)]]: الـ percent الافتراضي 10، فـ [[200 * 90 / 100 = 180.0]].
- [[discount(200.0, 25)]]: [[200 * 75 / 100 = 150.0]].
- [[Coupon.of("eid").getCode()]]: [[EID]] لأن [[of]] كبّرت الحروف.
- و [[Coupon.Companion.of("x")]] لسه شغالة كمان (طلعت [[X]]).

---

## الخلاصة

| عايز | اعمل |
|---|---|
| Kotlin تعرف إن قيمة Java ممكن تبقى null | [[@Nullable]] في Java |
| Kotlin تعرف إنها مش null | [[@NonNull]] في Java |
| اسم كلاس الدوال top-level يبقى نضيف | [[@file:JvmName("...")]] |
| Java تستخدم الـ default arguments | [[@JvmOverloads]] |
| Java تنادي دالة companion من غير [[.Companion]] | [[@JvmStatic]] |
| Java تقرا [[val name]] | [[getName()]] لوحدها |

- قيمة جاية من Java من غير annotation = [[String!]]: عاملها كأنها [[String?]].`,
          lines: [
            "الـ package.",
            R`[[@NonNull]] من androidx.`,
            R`[[@Nullable]].`,
            R`[[Locale]] عشان الأرقام تطلع بالشكل الإنجليزي في أي لغة.`,
            "كلاس Java.",
            R`الدالة دي عمرها ما ترجّع null: Kotlin هتشوف النوع [[String]].`,
            R`[[static]]: تتنادى باسم الكلاس.`,
            "نص برقمين بعد العلامة.",
            "قفلة.",
            R`ممكن ترجّع null: Kotlin هتشوف [[String?]].`,
            "والـ parameter مش nullable.",
            "خصم للكود EID، و null لغيره.",
            "قفلة.",
            "قفلة الكلاس."
          ],
          sol: R`[[PriceFormatter.formatEgp(99.5)]] بترجّع [["99.50 ج.م"]] ونوعها [[String]]. و [[findCoupon("X")?.length]] بترجّع null، ومن غير [[?.]] المترجم بيقول [[only safe (?.) or non-null asserted (!!.) calls are allowed on a nullable receiver of type 'String?']].

ومن غير [[@Nullable]]: المترجم بيسكت (platform type)، بس وقت التشغيل السطر بيقع بـ [[NullPointerException]] لأن القيمة null اتحطت في String. ده بالظبط الـ crash اللي الـ annotations بتمنعه.

والجهة التانية (Kotlin تتنادى من Java) في الكود تحت.`,
          solCode: R`// Kotlin
@file:JvmName("Prices")
package com.sara.shop.utils

@JvmOverloads
fun discount(price: Double, percent: Int = 10): Double = price * (100 - percent) / 100

class Coupon private constructor(val code: String) {
    companion object {
        @JvmStatic
        fun of(code: String) = Coupon(code.uppercase())
    }
}

// Java
// double a = Prices.discount(200.0);       // بالقيمة الافتراضية بفضل @JvmOverloads
// double b = Prices.discount(200.0, 25);
// Coupon c = Coupon.of("eid");            // من غير .Companion بفضل @JvmStatic
// String code = c.getCode();               // الـ val بتبان getter`
        }
      ]
    }
]);

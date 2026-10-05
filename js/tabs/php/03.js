// تكملة تاب php: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/php/01.js (شرح حقول الدرس في أوله)
MORE("php", [
    {
      t: "OOP في PHP الحديث",
      l: 3,
      n: "كلاسات بأنواع، و readonly، و interfaces، و enums، و property hooks: نفس أفكار TypeScript بصيغة PHP",
      items: [
        {
          cmd: "class",
          title: "object بيحمي بياناته: constructor promotion و readonly",
          desc: R`الكلاس قالب، و [[new]] بيعمل object منه. constructor promotion (PHP 8): [[public function __construct(public readonly int $amount)]] بيعرّف property ويملاها في سطر واحد. و [[readonly]] (8.1) معناها القيمة بتتحط مرة واحدة ومحدش يقدر يغيّرها بعد كده، فالـ object ثابت: أي عملية بترجّع object جديد.

والفلوس بتتخزن int بالقرش (10000 = 100 جنيه)، مش float. و [[new Money(10000)->add(...)]] من غير أقواس حوالين [[new]] ميزة جديدة في PHP 8.4.`,
          example: R`<?php
declare(strict_types=1);
final class Money {
    public function __construct(
        public readonly int $amount,
        public readonly string $currency = 'EGP',
    ) {
        if ($amount < 0) throw new InvalidArgumentException('المبلغ سالب');
    }
    public function add(Money $other): self {
        return new self($this->amount + $other->amount, $this->currency);
    }
}
$total = new Money(10000)->add(new Money(5000));
echo $total->amount;`,
          try: R`ضيف [[$total->amount = 1;]] واقرا [[Cannot modify readonly property]]. وجرّب [[new Money(-5)]]. وبعدين اطبع [[0.1 + 0.2 == 0.3]] بـ [[var_dump]] عشان تعرف ليه الفلوس مش float.`,
          flag: "script",
          deep: {
            why: "array زي [[['amount' => 100]]] أي حد يحط فيه أي حاجة: مبلغ سالب، أو نص، أو key غلط. الكلاس بيحط القواعد في مكان واحد: الـ constructor بيرفض القيم الغلط، والأنواع بتتفحص، و readonly بتضمن إن محدش يغيّر المبلغ من وراك بعد ما اتعمل.",
            how: R`الـ visibility: [[public]] أي حد، و [[protected]] الكلاس وأولاده، و [[private]] الكلاس بس. [[$this]] الـ object الحالي، و [[self]] الكلاس نفسه، و [[static]] الكلاس اللي اتنادى فعلًا (مع الوراثة).

[[readonly]] لازم يبقى معاها نوع، وبتتملي مرة من جوه الكلاس بس. أي محاولة تانية: [[Error]]. و [[readonly class]] (8.2) بتخلي كل الـ properties readonly. عشان «تعدّل» object ثابت بترجّع نسخة جديدة، زي [[add]] هنا.

الـ objects بتتبعت بالـ handle، مش بتتنسخ زي الـ arrays: لو اديت object لدالة وغيّرت فيه، الأصل بيتغير. وده سبب تاني إن readonly مريحة.

[[final]] بيمنع حد يورث من الكلاس. ابدأ بيه، وشيله لما تحتاج وراثة فعلًا.

و float مش دقيق في الكسور: [[0.1 + 0.2]] مش بالظبط [[0.3]]. الفلوس بالقرش كـ int، أو [[DECIMAL]] في القاعدة، أو [[BcMath\Number]] في 8.4.`,
            when: "أي بيانات ليها قواعد: مبلغ، إيميل، فترة زمنية، إعدادات. ده اسمه value object.",
            mistakes: R`كل الـ properties [[public]] ومن غير أنواع، فأي حد يكتب فيها أي حاجة. و getter و setter لكل property زي Java من غير سبب. و float للفلوس. و properties مش متعرّفة (dynamic properties) اتعملت deprecated في 8.2.`
          },
          lines: [
            "بداية الملف.",
            "أنواع صارمة.",
            "كلاس محدش يورث منه.",
            "constructor...",
            "...property عامة للقراية، متتغيرش، بتتعرّف وتتملي هنا.",
            "...وعملة بقيمة افتراضية.",
            "جسم الـ constructor.",
            "قاعدة: مبلغ سالب مرفوض.",
            "قفلة.",
            "الجمع بيرجّع object جديد من نفس النوع.",
            "مبيعدّلش الحالي، بيعمل واحد جديد.",
            "قفلة.",
            "قفلة الكلاس.",
            "PHP 8.4: [[new]] وبعدها method على طول.",
            "15000 (يعني 150 جنيه)."
          ],
          sol: R`المثال بيطبع [[15000]]. [[$total->amount = 1;]]: [[Error: Cannot modify readonly property Money::$amount]]. عشان تغيّر مبلغ لازم تعمل object جديد، زي ما [[add]] بتعمل.

[[new Money(-5)]]: [[InvalidArgumentException: المبلغ سالب]]. الـ constructor هو الباب الوحيد، فمستحيل يبقى عندك Money سالب في أي حتة في الكود.

[[var_dump(0.1 + 0.2 == 0.3)]] بيطلّع [[bool(false)]]، لأن [[0.1 + 0.2]] فعليًا [[0.30000000000000004441]]. عشان كده المبلغ [[int]] بالقروش (10000 = 100 جنيه)، وفي القاعدة [[DECIMAL(10,2)]] أو [[INT]] مش [[FLOAT]]. ولو [[new Money(10000)->add(...)]] من غير أقواس حوالين [[new]] طلّع Parse error، يبقى انت على PHP أقدم من 8.4.`
        },
        {
          cmd: "interface و abstract",
          title: "عقد يلتزم بيه كذا كلاس، وأساس مشترك بينهم",
          desc: R`الـ interface عقد: أسماء methods وأنواعها من غير تنفيذ، والكلاس ممكن ينفّذ أكتر من interface. الـ abstract class أساس فيه كود مشترك و methods ناقصة لازم الابن يكمّلها، والكلاس يورث من واحد بس.

الفايدة الكبيرة: دالة بتاخد [[PaymentGateway]] (الـ interface) مش كلاس معين، فتقدر تديها بوابة دفع حقيقية في الإنتاج و fake في الاختبار من غير ما تغيّر سطر فيها.`,
          example: R`<?php
interface PaymentGateway {
    public function charge(int $amount): string;
}
abstract class BaseGateway implements PaymentGateway {
    public function __construct(protected string $apiKey) {}
    protected function log(string $msg): void { error_log(static::class . ": $msg"); }
}
final class FakeGateway extends BaseGateway {
    public function charge(int $amount): string {
        $this->log("charge $amount");
        return 'txn_' . bin2hex(random_bytes(4));
    }
}
function checkout(PaymentGateway $gw): string { return $gw->charge(500); }
echo checkout(new FakeGateway('YOUR_KEY'));`,
          try: R`شيل method [[charge]] من [[FakeGateway]] واقرا الغلطة: PHP بيرفض الكلاس من قبل ما يشتغل. بعدين اعمل كلاس تاني [[LoggingGateway]] بينفّذ الـ interface مباشرة من غير الـ abstract، وابعته لـ [[checkout]].`,
          flag: "script",
          deep: {
            why: "لو [[checkout]] بتعمل [[new RealGateway()]] جواها، مستحيل تختبرها من غير ما تدفع فلوس حقيقية، ومستحيل تغيّر بوابة الدفع من غير ما تفتح كل الدوال. الـ interface بيفصل «محتاج حد يعمل charge» عن «مين بالظبط».",
            how: R`[[implements]] للـ interfaces (أكتر من واحد مسموح)، و [[extends]] للكلاس (واحد بس). الكلاس اللي مبينفّذش كل methods الـ interface لازم يبقى abstract، وإلا PHP بيرفضه.

الـ abstract class ينفع يبقى فيه constructor و properties و methods كاملة (زي [[log]]) و methods [[abstract]] من غير جسم. ومينفعش تعمل منه [[new]].

[[static::class]] جوه الأب بيرجّع اسم الكلاس الفعلي ([[FakeGateway]])، مش [[BaseGateway]]. ده late static binding.

ده تطبيق لـ dependency inversion: الكود العالي ([[checkout]]) بيعتمد على abstraction، والتفاصيل (Paymob أو Stripe أو Fake) بتتحقن من برّه. و Laravel مبني على الفكرة دي: الـ container بيربط interface بكلاس.`,
            when: "لما يبقى فيه أكتر من تنفيذ فعلًا (بوابتين دفع، تخزين محلي و S3، إيميل حقيقي و fake)، أو محتاج تستبدل حاجة في الاختبار.",
            mistakes: R`interface لكل كلاس حتى لو ليه تنفيذ واحد وعمره ما هيتبدّل: تعقيد من غير فايدة. وسلاسل وراثة طويلة (A يورث B يورث C) عشان تشارك كود: غالبًا التركيب (object جوه object) أو trait أحسن.`
          },
          lines: [
            "بداية الملف.",
            "العقد.",
            "أي بوابة دفع لازم يبقى فيها charge بالشكل ده.",
            "قفلة.",
            "أساس مشترك بينفّذ العقد جزئيًا.",
            "مفتاح الـ API، متاح للأبناء.",
            "method مشتركة، و [[static::class]] اسم الكلاس الفعلي.",
            "قفلة.",
            "تنفيذ حقيقي للعقد.",
            "الـ method اللي العقد طالبها.",
            "بيستخدم كود الأب.",
            "رقم عملية وهمي.",
            "قفلة.",
            "قفلة.",
            "الدالة عايزة أي حاجة بتنفّذ العقد.",
            "ابعتلها الـ fake."
          ],
          sol: R`من غير [[charge]] في [[FakeGateway]]: [[Fatal error: Class FakeGateway contains 1 abstract method and must therefore be declared abstract or implement the remaining methods (PaymentGateway::charge)]]، والغلطة بتطلع أول ما PHP يوصل لتعريف الكلاس (قبل ما [[checkout]] يتنادى أصلًا)، مش لما حد ينادي [[charge]]: PHP بيفحص إن الكلاس مكمّل كل الـ methods وهو بيعرّفه.

[[LoggingGateway]] بيعدّي لـ [[checkout]] عادي رغم إنه مش وارث من [[BaseGateway]]، لأن [[checkout]] طالب الـ interface بس. الناتج مثلًا [[txn_26a81e2e]] للأول و [[log_500]] للتاني، وسطر [[FakeGateway: charge 500]] من [[error_log]] بيظهر في الترمنال.`,
          solCode: R`final class LoggingGateway implements PaymentGateway {
    public function charge(int $amount): string {
        echo "[LoggingGateway] charge $amount\n";
        return 'log_' . $amount;
    }
}
echo checkout(new FakeGateway('YOUR_KEY')), "\n";
echo checkout(new LoggingGateway()), "\n";`
        },
        {
          cmd: "trait",
          title: "شارك methods بين كلاسات ملهاش علاقة ببعض",
          desc: R`الـ trait مجموعة methods و properties بتتنسخ جوه الكلاس بـ [[use]]، كأنك كتبتها فيه بإيدك. مش نوع، ومش وراثة: الكلاس ممكن ياخد كذا trait، ويفضل يورث من أي كلاس هو عايزه.

مثال مشهور: [[SoftDeletes]] و [[HasFactory]] في Laravel، سلوك صغير بيتكرر في موديلات كتير.`,
          example: R`<?php
trait HasTimestamps {
    public ?DateTimeImmutable $createdAt = null;
    public function touch(): void {
        $this->createdAt ??= new DateTimeImmutable();
    }
}
trait SoftDeletes {
    public ?DateTimeImmutable $deletedAt = null;
    public function softDelete(): void { $this->deletedAt = new DateTimeImmutable(); }
    public function trashed(): bool { return $this->deletedAt !== null; }
}
class Post {
    use HasTimestamps, SoftDeletes;
}
$p = new Post();
$p->touch();
$p->softDelete();
var_dump($p->trashed());`,
          try: R`ضيف [[class Comment { use SoftDeletes; }]] وجرّب نفس الـ methods. بعدين اعمل method اسمها [[touch]] في trait تاني وخلي [[Post]] ياخد الاتنين: هتاخد غلطة تعارض، وحلها بـ [[insteadof]].`,
          flag: "script",
          deep: {
            why: "PHP فيه وراثة واحدة بس. لو [[Post]] و [[Comment]] و [[User]] محتاجين نفس الـ soft delete، ومش منطقي يورثوا من نفس الأب، الـ trait بيدّيهم الكود من غير ما يلزق أشجار الوراثة في بعض.",
            how: R`وقت الـ compile، PHP بينسخ محتوى الـ trait جوه الكلاس. فـ [[$this]] جوه الـ trait هو الـ object بتاع الكلاس اللي استخدمه.

الـ trait مش نوع: مينفعش [[function f(SoftDeletes $x)]]، و [[$p instanceof SoftDeletes]] دايمًا false. لو محتاج نوع، اعمل interface والـ trait ينفّذ الـ methods بتاعته. و [[class_uses($p)]] بيقولك الكلاس بيستخدم أنهي traits.

التعارض: لو traitين فيهم نفس الـ method، [[use A, B { A::touch insteadof B; B::touch as touchB; }]]. والـ trait ممكن يبقى فيه [[abstract]] methods يطلبها من الكلاس، و static methods.`,
            when: "سلوك صغير ومستقل بيتكرر في كلاسات مختلفة: timestamps، soft delete، logging، تحويل لـ array.",
            mistakes: R`trait بيفترض إن الكلاس فيه property معينة من غير ما يقول (اعتماد مستخبي). و traits ضخمة فيها نص منطق التطبيق، فالكلاس بقى ١٠ traits ومحدش فاهم الـ method دي جاية منين. وتستخدم trait مكان interface وانت محتاج نوع.`
          },
          lines: [
            "بداية الملف.",
            "trait أول.",
            "property هتتنسخ في الكلاس.",
            "method...",
            "...بتحط الوقت لو مش موجود.",
            "قفلة.",
            "قفلة.",
            "trait تاني.",
            "property.",
            "مسح منطقي (من غير DELETE).",
            "اتمسح؟",
            "قفلة.",
            "كلاس عادي...",
            "...بياخد الاتنين.",
            "قفلة.",
            "object.",
            "من الـ trait الأول.",
            "من التاني.",
            "true."
          ],
          sol: R`[[Comment]] بياخد [[softDelete]] و [[trashed]] زي [[Post]] بالظبط: [[trashed()]] false في الأول و true بعد [[softDelete()]].

trait تاني فيه [[touch]] ومن غير حل: [[Fatal error: Trait method Touchable::touch has not been applied as Post::touch, because of collision with HasTimestamps::touch]]. الحل بـ [[insteadof]] بتختار واحدة، و [[as]] بتدّي التانية اسم تاني لو محتاجها.

لو كتبت [[as]] لوحدها من غير [[insteadof]] هيفضل التعارض، لأن [[as]] بتضيف اسم جديد بس ومبتحلّش الاسم الأصلي.`,
          solCode: R`<?php
trait Touchable {
    public function touch(): void { echo "Touchable::touch\n"; }
}
class Post {
    use HasTimestamps, SoftDeletes, Touchable {
        HasTimestamps::touch insteadof Touchable;
        Touchable::touch as touchLog;
    }
}
class Comment { use SoftDeletes; }
$p = new Post();
$p->touch();     // بتاعة HasTimestamps
$p->touchLog();  // Touchable::touch
$c = new Comment();
$c->softDelete();
var_dump($c->trashed()); // bool(true)`
        },
        {
          cmd: "enum",
          title: "لستة قيم ثابتة بدل نصوص متفرقة في الكود",
          desc: R`[[enum]] (PHP 8.1) نوع ليه قيم محددة بس. الـ backed enum كل حالة ليها قيمة ([[string]] أو [[int]]) بتتخزن في القاعدة. [[from()]] بيحوّل من القيمة للـ enum ويرمي لو غلط، و [[tryFrom()]] بيرجّع null. والـ enum ممكن يبقى فيه methods، زي [[label()]] للنص العربي.

كده الـ status نوع: دالة بتاخد [[OrderStatus]] مستحيل يوصلها [['payed']] بغلطة إملائية.`,
          example: R`<?php
enum OrderStatus: string {
    case Pending = 'pending';
    case Paid = 'paid';
    case Shipped = 'shipped';
    public function label(): string {
        return match ($this) {
            self::Pending => 'في الانتظار',
            self::Paid    => 'اتدفع',
            self::Shipped => 'اتشحن',
        };
    }
}
$status = OrderStatus::from($row['status']);
echo $status->label(), ' ', $status->value;
$filter = OrderStatus::tryFrom($_GET['status'] ?? '') ?? OrderStatus::Pending;`,
          try: R`ضيف [[case Cancelled = 'cancelled';]] ومتضيفهاش في [[match]]: أول ما تنادي [[label()]] عليها هتاخد [[UnhandledMatchError]]، فمش هتنسى. وجرّب [[OrderStatus::from('nope')]] واقرا الـ ValueError، وقارنها بـ [[tryFrom]].`,
          flag: "script",
          deep: {
            why: "الحالات كنصوص ([['pending']] و [['paid']]) بتبقى متفرقة في عشرين ملف، وكل ملف بيعمل allowlist بإيده، وغلطة إملائية واحدة بتعدّي. الـ enum بيجمّعهم في مكان واحد ونوع واحد.",
            how: R`الحالات objects ثابتة (singletons)، فالمقارنة [[===]]: [[$status === OrderStatus::Paid]]. ومقارنتها بنص [[$status === 'paid']] دايمًا false؛ قارن بـ [[->value]] أو حوّل النص الأول.

[[->value]] القيمة اللي في القاعدة، و [[->name]] اسم الحالة ([[Paid]])، و [[OrderStatus::cases()]] كل الحالات (مفيد لـ dropdown). و [[json_encode]] بيطلّع القيمة.

[[from]] بيرمي [[ValueError]]، فمع أي قيمة جاية من المستخدم استخدم [[tryFrom]] وقرر انت تعمل إيه لو null.

والـ enum ينفع ينفّذ interface ويبقى فيه constants و static methods، بس مفيهوش properties ولا [[new]].

في القاعدة: عمود [[VARCHAR]] بيخزن الـ value أبسط من عمود [[ENUM]] في MySQL، لأن إضافة حالة في [[ENUM]] محتاجة [[ALTER TABLE]].`,
            when: "status، و role، ونوع اشتراك، وأي حقل ليه قيم محددة معروفة.",
            mistakes: R`في مشروع حقيقي حالات العميل كانت نصوص زي [['pending']] و [['active']] و [['hold']]، ومعاها allowlist بـ [[in_array]] متكررة في كذا endpoint، وحالة اسمها [['unactive']] (غلطة إملائية) عايشة في القاعدة للأبد. enum واحد كان هيجمّعهم ويخلي الغلطة في مكان واحد يتصلّح. و [[from($_GET[...])]] مباشرة فأي قيمة غلط = صفحة 500.`
          },
          lines: [
            "بداية الملف.",
            "enum قيمه نصوص.",
            "حالة وقيمتها في القاعدة.",
            "حالة.",
            "حالة.",
            "method على الـ enum.",
            "match على الحالة نفسها.",
            "نص عربي.",
            "نص عربي.",
            "نص عربي.",
            "قفلة الـ match.",
            "قفلة الـ method.",
            "قفلة الـ enum.",
            "من القيمة اللي في القاعدة (بيرمي لو غلط).",
            "«اتدفع paid».",
            "من الرابط: null لو غلط، فخد الافتراضي."
          ],
          sol: R`بعد ما تضيف [[Cancelled]] من غير ما تعدّل [[match]]: الكود شغال عادي لحد ما حد ينادي [[OrderStatus::Cancelled->label()]]، ساعتها [[Fatal error: Uncaught UnhandledMatchError: Unhandled match case of type OrderStatus]] والـ stack trace بيشاور على [[label()]]. أدوات زي PHPStan بتمسكها قبل ما تشغّل.

[[OrderStatus::from('nope')]]: [[ValueError: "nope" is not a valid backing value for enum OrderStatus]]. و [[OrderStatus::tryFrom('nope')]] بيرجّع [[NULL]] من غير غلطة. [[from]] للقيم اللي جاية من قاعدتك (لو غلط يبقى bug)، و [[tryFrom]] + [[??]] للي جاي من المستخدم زي [[$_GET]].

ملاحظة: [[$row]] في المثال جاي من القاعدة، فعشان تجرّبه لوحده عرّفه الأول: [[$row = ['status' => 'paid'];]] والناتج [[اتدفع paid]].`
        },
        {
          cmd: "property hooks",
          title: "PHP 8.4: property بتتحقق وتتحسب لوحدها من غير getters",
          desc: R`property hooks: بتكتب [[get]] أو [[set]] جوه الـ property نفسها. [[set => strtolower(trim($value))]] بيتنفّذ مع كل تخصيص، حتى جوه الكلاس، والناتج هو اللي بيتخزن. و property فيها [[get]] بس ومش بتستخدم نفسها بتبقى محسوبة (virtual)، زي computed property.

و asymmetric visibility: [[public private(set) int $id]] يعني أي حد يقرا، والكلاس بس يكتب.`,
          example: R`<?php
class User {
    public private(set) int $id;
    public string $email {
        set => strtolower(trim($value));
    }
    public string $displayName {
        get => $this->name !== '' ? $this->name : strstr($this->email, '@', true);
    }
    public function __construct(int $id, string $email, public string $name = '') {
        $this->id = $id;
        $this->email = $email;
    }
}
$u = new User(1, '  Sara@Example.com ');
echo $u->email, ' / ', $u->displayName;`,
          try: R`جرّب [[$u->id = 5;]] و [[$u->displayName = 'x';]] واقرا الرسالتين. وبعدين [[$u->email = ' ALI@EXAMPLE.COM';]] واطبعه: الـ hook اشتغل على التخصيص من برّه كمان.`,
          flag: "script",
          deep: {
            why: "قبل 8.4 كنت بتختار: property عامة (سهلة بس مفيش تحقق)، أو private ومعاها [[getEmail()]] و [[setEmail()]] لكل حاجة. الـ hooks بتدّيك الاتنين: تكتب [[$u->email]] عادي، والتحقق بيحصل لوحده.",
            how: R`نوعين: backed property ليها قيمة متخزنة، والـ [[set]] بيحدد إيه اللي يتخزن (الشكل القصير [[set => expr]] بيخزن ناتج التعبير، والشكل الطويل [[set { $this->email = ...; }]] بتخزن بإيدك). و virtual property: الـ hooks مش بتلمس الـ property نفسها، فمفيش قيمة متخزنة. لو ليها [[get]] بس، الكتابة فيها Error.

الـ hooks بتشتغل حتى جوه الـ constructor، عشان كده الإيميل اتنضّف من أول ما الـ object اتعمل.

[[private(set)]] و [[protected(set)]]: القراية حسب الـ visibility الأولى، والكتابة حسب اللي بين القوسين. ده بديل لـ readonly لما محتاج الكلاس نفسه يغيّر القيمة بعدين.

والـ interfaces في 8.4 تقدر تطلب property: [[public string $email { get; }]].`,
            when: "تنضيف أو تحقق بسيط وقت التخصيص، وقيم محسوبة من properties تانية. لو المنطق تقيل (query، API)، method عادية أوضح.",
            mistakes: R`تعمل query أو شغل تقيل جوه [[get]]، والـ property بتتقري في loop ١٠٠٠ مرة. وتنسى إن الـ [[set]] بيشتغل جوه الكلاس كمان. وتحاول تخلي property فيها hooks [[readonly]]: ممنوع. والأهم: الكود ده محتاج PHP 8.4، فاتأكد من نسخة السيرفر قبل ما تستخدمه (تاب VPS، درس [[php -l]]).`
          },
          lines: [
            "بداية الملف.",
            "كلاس.",
            "الكل يقرا، والكلاس بس يكتب.",
            "property فيها hook...",
            "...أي قيمة بتتخزن صغيرة ومن غير مسافات.",
            "قفلة.",
            "property محسوبة (مش متخزنة)...",
            "...الاسم لو موجود، وإلا اللي قبل @ في الإيميل.",
            "قفلة.",
            "constructor، والاسم promoted.",
            "مسموح: جوه الكلاس.",
            "الـ hook بيشتغل هنا كمان.",
            "قفلة.",
            "قفلة الكلاس.",
            "إيميل بمسافات وحروف كبيرة.",
            "«sara@example.com / sara»."
          ],
          sol: R`[[$u->id = 5;]]: [[Error: Cannot modify private(set) property User::$id from global scope]]. القراية مسموحة من برّه والكتابة من جوه الكلاس بس.

[[$u->displayName = 'x';]]: [[Error: Property User::$displayName is read-only]]. الـ property دي ليها [[get]] بس ومش متخزنة أصلًا (virtual)، فمفيش مكان تتكتب فيه.

[[$u->email = ' ALI@EXAMPLE.COM';]] وبعدين [[echo $u->email]]: [[ali@example.com]]، و [[displayName]] بقت [[ali]]. الـ [[set]] hook بيشتغل على أي تخصيص، من الـ constructor أو من برّه. والناتج الأول للمثال: [[sara@example.com / sara]].`
        }
      ]
    },
    {
      t: "Composer وتنظيم المشروع",
      l: 3,
      n: "Composer للمكتبات والـ autoload، وملف دخول واحد بيوزّع الطلبات على controllers و views",
      items: [
        {
          cmd: "composer require",
          title: "سطّب مكتبات PHP وثبّت نسخها",
          desc: R`Composer هو npm بتاع PHP. [[composer require vendor/package]] بيسطّب المكتبة في [[vendor/]] ويكتبها في [[composer.json]]، والنسخ المضبوطة بتتسجل في [[composer.lock]]. الاتنين يتعملهم commit، و [[vendor/]] لأ.

على السيرفر: [[composer install --no-dev --optimize-autoloader]] بيسطّب بالظبط اللي في الـ lock من غير أدوات التطوير. ولو نسخة PHP على الاستضافة أقدم من جهازك، [[platform.php]] بيخلي Composer يختار نسخ مكتبات شغالة عليها.`,
          example: R`composer init
composer require phpmailer/phpmailer
composer require --dev phpunit/phpunit
composer config platform.php 8.3
composer install
composer install --no-dev --optimize-autoloader
composer update phpmailer/phpmailer
composer outdated --direct
composer audit`,
          try: R`في فولدر فاضي: [[composer init]] واقبل الافتراضي، وبعدين [[composer require phpmailer/phpmailer]]، وافتح [[composer.json]] و [[composer.lock]] وقارن النسخة في الاتنين. امسح [[vendor/]] وشغّل [[composer install]]: رجع زي ما كان.`,
          deep: {
            why: "من غير Composer بتنزّل المكتبات zip وتحطها في المشروع، ومحدش عارف أنهي نسخة، والتحديث كابوس. نفس المشكلة اللي npm بيحلها في JavaScript (تاب «Node و npm»).",
            how: R`[[composer.json]] فيه القيود: [[^7.0]] يعني أي 7.x. و [[composer.lock]] فيه النسخة بالظبط اللي اتسطبت وتاريخها. [[install]] بيقرا الـ lock (نفس النسخ عند الكل)، و [[update]] بيتجاهله ويجيب أحدث نسخة تناسب القيود ويكتب lock جديد.

[[--dev]]: مكتبات للتطوير بس (اختبارات، أدوات فحص)، و [[--no-dev]] على السيرفر بيسيبها. و [[--optimize-autoloader]] (أو [[-o]]) بيبني classmap جاهز لكل الكلاسات، أسرع في الإنتاج.

[[platform.php]] في [[composer.json]]: بتقول لـ Composer «افترض إن PHP نسختها 8.3» حتى لو جهازك 8.4، فمش هيختار مكتبة محتاجة أحدث من السيرفر.

[[composer audit]] بيقارن مكتباتك بقاعدة الثغرات المعروفة. و [[composer outdated --direct]] بيوريك المكتبات اللي انت طلبتها بس ولها نسخ أحدث.

على استضافة مشتركة من غير Composer: شغّل [[composer install --no-dev -o]] عندك وارفع [[vendor/]] مع الـ deploy، أو ارفع [[composer.phar]] وشغّله بـ [[php composer.phar]] لو فيه SSH.`,
            when: "من أول مكتبة. حتى لو مفيش مكتبات خالص، Composer مفيد للـ autoload بتاع كلاساتك (الدرس الجاي).",
            mistakes: R`commit لـ [[vendor/]]. و [[composer update]] على السيرفر فيجيب نسخ عمرها ما اتجربت. وتتجاهل الـ lock (مش في git) فكل واحد عنده نسخ مختلفة. وتسطّب مكتبة محتاجة PHP أحدث من الاستضافة وتكتشف على السيرفر.`
          },
          lines: [
            "اعمل composer.json بأسئلة.",
            "سطّب مكتبة وضيفها للمشروع.",
            "مكتبة للتطوير بس.",
            "افترض نسخة PHP بتاعة السيرفر وانت بتختار النسخ.",
            "سطّب بالظبط اللي في composer.lock.",
            "للإنتاج: من غير أدوات التطوير، و autoload أسرع.",
            "حدّث مكتبة واحدة واكتب lock جديد.",
            "إيه اللي ليه نسخ أحدث (من اللي انت طلبته بس).",
            "دوّر على ثغرات معروفة في مكتباتك."
          ],
          sol: R`[[composer.json]] فيه [["phpmailer/phpmailer": "^7.1"]] (قيد: أي 7.x من 7.1 وطالع)، و [[composer.lock]] فيه النسخة بالظبط [["version": "v7.1.1"]] ومعاها الـ commit hash. ده الفرق: json = المسموح، lock = اللي اتسطّب فعلًا.

بعد [[rm -rf vendor]] و [[composer install]]: [[Installing phpmailer/phpmailer (v7.1.1)]] نفس النسخة من الـ lock، حتى لو نزلت 7.2 في الوقت ده. [[composer update]] هو اللي بيتجاهل الـ lock ويجيب أحدث نسخة مسموحة.

الغلط الشائع: ترفع [[vendor/]] على git وتنسى [[composer.lock]]. العكس هو الصح: [[vendor/]] في [[.gitignore]] و [[composer.lock]] في git (للمشاريع والمواقع).`
        },
        {
          cmd: "PSR-4 autoload",
          title: "كلاساتك تتحمّل لوحدها من غير require لكل ملف",
          desc: R`PSR-4 قاعدة بتربط الـ namespace بالفولدر: [[App\\]] → [[src/]]، فكلاس [[App\Controllers\PostController]] يبقى في [[src/Controllers/PostController.php]]. تكتبها في [[composer.json]]، وتشغّل [[composer dump-autoload]] مرة، وبعدها [[require]] واحد لـ [[vendor/autoload.php]] وأي كلاس بيتحمّل أول ما تستخدمه.

و [[files]] للدوال العادية (زي [[e()]] و [[view()]]) اللي عايزها تتحمّل دايمًا.`,
          example: R`{
  "autoload": {
    "psr-4": { "App\\": "src/" },
    "files": ["src/helpers.php"]
  }
}
// src/Controllers/PostController.php
<?php
namespace App\Controllers;
use App\Models\PostRepository;
final class PostController { }
// public/index.php
<?php
require dirname(__DIR__) . '/vendor/autoload.php';
$controller = new App\Controllers\PostController();`,
          try: R`اعمل الفولدرات والملفات، وشغّل [[composer dump-autoload]]، وافتح [[public/index.php]]. بعدين غيّر اسم الملف لـ [[postController.php]] (p صغيرة): على ويندوز هيشتغل، وعلى سيرفر Linux هيقع بـ [[Class not found]].`,
          flag: "script",
          deep: {
            why: "مشروع فيه ٥٠ كلاس محتاج ٥٠ سطر require، وترتيبهم مهم، وأي نسيان = Class not found. الـ autoload بيخلي PHP يجيب الملف لوحده وقت الحاجة، فمفيش require غير سطر واحد.",
            how: R`تحت الغطا: PHP فيه [[spl_autoload_register()]]. لما الكود يستخدم كلاس مش متعرّف، PHP بينادي الدوال المسجلة دي بالاسم الكامل. Composer بيسجّل دالة بتشيل [[App\]] من أول الاسم، وتحوّل باقي [[\]] لـ [[/]]، وتضيف [[src/]] و [[.php]]، وتعمل require. ده lazy: الكلاس اللي مستخدمتوش في الطلب ده مبيتحمّلش.

[[use App\Models\PostRepository;]] مجرد اختصار للاسم وقت الـ compile، مبيحمّلش حاجة.

جوه ملف فيه [[namespace]]، أي كلاس من غير [[\]] في أوله بيتدوّر عليه في نفس الـ namespace: [[new DateTime()]] جوه [[App\Controllers]] يبقى [[App\Controllers\DateTime]] ويقع. اكتب [[\DateTime]] أو [[use DateTime;]]. الدوال مختلفة: لو مش لاقيها في الـ namespace بترجع للعامة، فـ [[strlen]] شغالة عادي.

[[composer dump-autoload]] محتاجه لما تغيّر قسم [[autoload]] في composer.json. الكلاسات الجديدة في فولدرات PSR-4 بتتلاقي لوحدها، إلا لو عامل [[--classmap-authoritative]] ([[-a]])، ساعتها أي كلاس مش في الـ classmap مبيتلاقيش ولازم dump تاني. أما [[-o]] لوحده فلو الكلاس مش في الـ classmap بيرجع يدوّر بقواعد PSR-4 عادي.`,
            when: "أي مشروع فيه أكتر من كام كلاس. وده نفس اللي Laravel وأي مكتبة PHP حديثة بتعمله.",
            mistakes: R`اسم الملف أو الفولدر مختلف في حالة الحروف عن الكلاس: ويندوز مش فارق معاه، والسيرفر Linux بيفرق، فبيشتغل عندك ويقع بعد الـ deploy. و [[new DateTime]] من غير [[\]] جوه namespace. وتخلط require يدوي مع autoload لنفس الكلاس فيتعرّف مرتين.`
          },
          lines: [
            "composer.json.",
            "قسم الـ autoload.",
            R`أي كلاس يبدأ بـ App\\ في فولدر src.`,
            "ملف دوال بيتحمّل مع كل طلب.",
            "قفلة.",
            "قفلة.",
            "ملف الكلاس.",
            "الـ namespace = الفولدر (Controllers).",
            "اختصار لاسم كلاس تاني (مبيحمّلوش).",
            "اسم الكلاس = اسم الملف بالظبط.",
            "ملف الدخول.",
            "السطر الوحيد اللي فيه require.",
            "الكلاس اتحمّل لوحده."
          ],
          sol: R`بعد [[composer dump-autoload]] ([[Generated autoload files]]) الصفحة بتشتغل من غير ولا [[require]] للكلاسات: [[App\Controllers\PostController]] = [[src/]] + [[Controllers/PostController.php]].

بعد تغيير الاسم لـ [[postController.php]]: على Linux [[Fatal error: Uncaught Error: Class "App\Controllers\PostController" not found]]. الـ autoloader بيدوّر على [[PostController.php]] بالحرف، ونظام ملفات Linux بيفرّق بين الكبير والصغير. على Windows و macOS (افتراضيًا) هيلاقيه، فالغلطة مبتظهرش غير لما ترفع.

ولو [[composer dump-autoload -o]] شغّلته، هيطبعلك تحذير إن الملف [[does not comply with psr-4 autoloading standard]]، فحطه في CI عشان تمسكها بدري.`
        },
        {
          cmd: "front controller",
          title: "ملف دخول واحد بيوزّع كل الطلبات",
          desc: R`بدل ما كل صفحة ملف [[.php]] لوحده، كل الطلبات بتروح لـ [[public/index.php]]، وهو بيبص على الـ method والمسار ويقرر مين يرد (router). كده الـ bootstrap والجلسة والأمان في مكان واحد، والروابط نضيفة زي [[/posts/42]].

على Apache: [[.htaccess]] في [[public]] يحوّل أي طلب مش لملف موجود لـ [[index.php]]. وعلى [[php -S]]: [[php -S localhost:8000 -t public public/index.php]].`,
          example: R`<?php
if (PHP_SAPI === 'cli-server' && is_file(__DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))) return false;
require dirname(__DIR__) . '/vendor/autoload.php';
use App\Controllers\PostController;
$routes = [
    ['GET',  '#^/$#',            fn() => (new PostController())->index()],
    ['GET',  '#^/posts/(\d+)$#', fn($id) => (new PostController())->show((int) $id)],
    ['POST', '#^/posts$#',       fn() => (new PostController())->store()],
];
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
foreach ($routes as [$method, $pattern, $action]) {
    if ($_SERVER['REQUEST_METHOD'] === $method && preg_match($pattern, $path, $m)) {
        echo $action(...array_slice($m, 1));
        exit;
    }
}
http_response_code(404);
echo 'الصفحة مش موجودة';`,
          try: R`شغّل [[php -S localhost:8000 -t public public/index.php]] وافتح [[/]] و [[/posts/1]] و [[/posts/abc]] (404) و [[/style.css]] (الملف نفسه، بسبب أول سطر). ضيف route جديد [[/about]].`,
          flag: "script",
          deep: {
            why: "مع ملف لكل صفحة، كل ملف لازم يفتكر يعمل require للإعدادات ويبدأ الجلسة ويتحقق من الدخول. نسيان واحد = صفحة مكشوفة. ملف دخول واحد بيعمل الحاجات دي مرة، وكل الـ URLs بتعدّي عليه.",
            how: R`على Apache، الـ [[.htaccess]] في [[public]] فيه ٤ سطور: [[RewriteEngine On]]، وشرطين [[RewriteCond %{REQUEST_FILENAME} !-f]] و [[!-d]] (مش ملف ولا فولدر موجود)، و [[RewriteRule ^ index.php [QSA,L]]]. الصور والـ CSS بتتخدم مباشرة، والباقي لـ PHP. على Nginx: [[try_files $uri $uri/ /index.php?$query_string;]] (تاب Nginx).

أول سطر في المثال للـ [[php -S]] بس: لما السيرفر ده بياخد router، كل الطلبات بتروحله حتى الملفات، و [[return false]] بيقوله «ابعت الملف زي ما هو».

الـ router: كل route = method + regex + دالة. [[#^/posts/(\d+)$#]] بيطابق المسار كله، والرقم بين القوسين بيطلع في [[$m[1]]]. [[array_slice($m, 1)]] بيشيل التطابق الكامل ويسيب الأجزاء، و [[...]] بيبعتهم arguments.

في الحقيقي بتلف الـ dispatch في [[try]]: [[catch (NotFound)]] → 404، وأي حاجة تانية تروح للـ exception handler (500). وفيه مكتبات router جاهزة (زي FastRoute) بتعمل ده أسرع وبـ [[{id}]] بدل regex. و Laravel [[Route::get()]] نفس الفكرة بالظبط.

وعلى الاستضافة: الدومين لازم يشاور على [[public]] مش جذر المشروع، أو [[public_html]] يبقى هو [[public]]، و [[src]] و [[vendor]] و [[config.php]] فوقه.`,
            when: "أي مشروع أكبر من كام صفحة، وأي API. وده الشكل اللي كل frameworks بتاع PHP ماشية عليه.",
            mistakes: R`تحط المشروع كله جوه [[public_html]] وتعتمد على [[.htaccess]] يقفل [[src]] و [[config.php]]. و [[preg_match]] من غير [[^]] و [[$]] فـ [[/posts/1/delete]] يطابق route غلط. وتنسى إن الـ regex بيرجّع نصوص، فالـ controller محتاج [[(int)]].`
          },
          lines: [
            "بداية الملف.",
            "على php -S بس: لو ملف موجود (CSS، صورة) ابعته زي ما هو.",
            "autoload.",
            "اختصار اسم الكلاس.",
            "الـ routes: method و regex للمسار ودالة.",
            "الرئيسية.",
            "بوست برقمه، والرقم بيتبعت للدالة.",
            "إنشاء بوست (POST بس).",
            "قفلة.",
            "المسار من غير query string.",
            "لف على الـ routes، وفك كل واحد لـ ٣ متغيرات.",
            "الـ method مطابقة والمسار مطابق؟",
            "نادي الدالة بالأجزاء اللي اتمسكت واطبع الناتج.",
            "خلاص.",
            "قفلة.",
            "قفلة.",
            "مفيش route: 404.",
            "رسالة."
          ],
          sol: R`[[/]] بيرجّع ناتج [[index()]] بـ 200، و [[/posts/1]] ناتج [[show(1)]]، و [[/posts/abc]] [[404]] و [[الصفحة مش موجودة]] لأن [[\d+]] أرقام بس، و [[/style.css]] بيرجّع الملف نفسه لأن أول سطر رجّع [[false]] فالسيرفر المدمج خدمه كملف.

[[/about]]: route جديد بـ regex [[#^/about$#]]. خلي بالك من [[^]] و [[$]]: من غيرهم [[/about-us]] و [[/x/about]] هيتطابقوا. ولو كل الطلبات رجّعت 404، غالبًا نسيت [[public/index.php]] في آخر أمر [[php -S]]، أو الـ controller مفيهوش [[index()]] و [[show()]] لسه.`,
          solCode: R`$routes = [
    ['GET',  '#^/$#',            fn() => (new PostController())->index()],
    ['GET',  '#^/posts/(\d+)$#', fn($id) => (new PostController())->show((int) $id)],
    ['POST', '#^/posts$#',       fn() => (new PostController())->store()],
    ['GET',  '#^/about$#',       fn() => 'صفحة عن الموقع'],
];`
        },
        {
          cmd: "MVC",
          title: "افصل القاعدة عن المنطق عن الـ HTML",
          desc: R`MVC تقسيم مسؤوليات: الـ Model بيكلم القاعدة (repository فيه PDO)، والـ View قالب بيطبع بس (وكل طباعة بـ [[e()]])، والـ Controller بيقرا الطلب ويسأل الـ Model ويختار الـ View. الـ router بينادي الـ controller.

دالة [[view()]] صغيرة بتحمّل القالب وتمسك الـ output في string بـ [[ob_start()]]، فالـ controller بيرجّع HTML زي ما بيرجّع JSON.`,
          example: R`// src/Controllers/PostController.php
namespace App\Controllers;
use App\Models\PostRepository;
final class PostController {
    public function __construct(private PostRepository $posts = new PostRepository()) {}
    public function show(int $id): string {
        $post = $this->posts->find($id) ?? throw new \App\NotFound();
        return view('posts/show', ['post' => $post]);
    }
}
// src/helpers.php
function view(string $name, array $data = []): string {
    extract($data);
    ob_start();
    require dirname(__DIR__) . "/views/$name.php";
    return ob_get_clean();
}`,
          try: R`اعمل [[views/posts/show.php]] فيه [[<h1><?= e($post['title']) ?></h1>]] و [[src/Models/PostRepository.php]] فيه [[find()]] بـ PDO، ووصّلهم بالـ router. بعدين اكتب اختبار بيدّي الـ controller repository وهمي (array بدل القاعدة).`,
          flag: "script",
          deep: {
            why: "صفحة PHP فيها SQL و if و HTML مخلوطين بتبقى سهلة في الأول ومستحيلة بعد سنة: تغيير شكل الصفحة بيلمس SQL، ومفيش طريقة تختبر المنطق من غير متصفح. الفصل بيخلي كل جزء يتغير لوحده.",
            how: R`الرحلة: [[index.php]] (front controller) → router → [[PostController::show]] → [[PostRepository::find]] (PDO و prepared statement) → [[view('posts/show')]] → HTML → الرد.

[[new]] في قيمة افتراضية لـ parameter (PHP 8.1) بيخلي الـ controller يشتغل لوحده، وفي نفس الوقت تقدر تديله repository تاني في الاختبار. ده dependency injection من غير container.

[[extract($data)]] بيحوّل [[['post' => ...]]] لمتغير [[$post]] جوه القالب. آمن هنا لأن الـ keys انت اللي كاتبها. و [[ob_start()]] بيبدأ يمسك أي طباعة، و [[ob_get_clean()]] بيرجّعها كنص ويقفل.

الـ view متعملش query ولا تقرر حاجة: بتطبع اللي اتبعتلها بس. ولـ layout مشترك: الـ view بترجّع المحتوى، و [[views/layout.php]] بيطبعه جوه الـ header والـ footer.

ده بالظبط اللي Laravel بيقدّمه جاهز: Eloquent كـ Model، و Blade كـ View، و Controllers، و [[Route]].`,
            when: "أول ما المشروع يعدّي كام صفحة، أو لما تبدأ تكرر نفس الـ queries في أكتر من مكان.",
            mistakes: R`[[extract($_POST)]]: المستخدم يقدر يكتب فوق أي متغير في الـ scope. و SQL جوه الـ views. و controller فيه ٥٠٠ سطر منطق (خليه رفيع، والمنطق في classes خدمة). و HTML بيتطبع بـ [[echo]] جوه الـ controller.`
          },
          lines: [
            "الـ namespace بتاع الـ controllers.",
            "الـ Model اللي هنستخدمه.",
            "الـ controller.",
            "الـ repository بيتحقن، وليه قيمة افتراضية (PHP 8.1).",
            "action لعرض بوست.",
            "هات البوست أو ارمي NotFound (الـ router يحوّلها 404).",
            "رجّع HTML من القالب.",
            "قفلة.",
            "قفلة الكلاس.",
            "دالة عامة لعرض القوالب.",
            "حوّل الـ array لمتغيرات جوه القالب.",
            "ابدأ امسك أي طباعة.",
            "حمّل القالب (بيطبع في الـ buffer).",
            "رجّع اللي اتطبع كنص.",
            "قفلة."
          ],
          sol: R`[[/posts/1]] بيطلّع [[<h1>أول بوست &lt;b&gt;عريض&lt;/b&gt;</h1>]]: العنوان من القاعدة ومتأمّن بـ [[e()]]. و [[/posts/999]] من غير ما تمسك [[NotFound]] بيطلع 500، فامسكه في الـ router ورجّع 404.

الاختبار بيطبع [[OK: 2 اختبارات عدّوا]] من غير ما يلمس القاعدة، لأن الـ controller بياخد الـ repository من الـ constructor. عشان الـ fake يورث منه، [[PostRepository]] متبقاش [[final]]، أو الأحسن تعمل interface. ولو العربي طلع [[Ø£ÙˆÙ„]]، الصف اتخزن من client charset غلط، مش مشكلة في الكود.`,
          solCode: R`<?php // src/Models/PostRepository.php
namespace App\Models;
class PostRepository {
    public function find(int $id): ?array {
        $stmt = db()->prepare('SELECT id, title FROM posts WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->fetch() ?: null;
    }
}

<?php // tests/PostControllerTest.php  (php -d zend.assertions=1 tests/PostControllerTest.php)
require dirname(__DIR__) . '/vendor/autoload.php';
use App\Controllers\PostController;
use App\Models\PostRepository;
final class FakePostRepository extends PostRepository {
    public function __construct(private array $rows) {}
    public function find(int $id): ?array { return $this->rows[$id] ?? null; }
}
$c = new PostController(new FakePostRepository([1 => ['id' => 1, 'title' => '<b>تجربة</b>']]));
assert($c->show(1) === "<h1>&lt;b&gt;تجربة&lt;/b&gt;</h1>\n");
try { $c->show(2); assert(false); } catch (App\NotFound) {}
echo "OK: 2 اختبارات عدّوا\n";

// public/index.php: جوه الـ foreach
try {
    echo $action(...array_slice($m, 1));
} catch (App\NotFound) {
    http_response_code(404);
    echo 'مش موجود';
}
exit;`
        }
      ]
    },
    {
      t: "الأمان والأداء و Laravel",
      l: 3,
      n: "مراجعة أمان قبل أي deploy، و OPcache للسرعة، وإمتى تسيب PHP الخام لـ Laravel",
      items: [
        {
          cmd: "security checklist",
          title: "راجع مشروع PHP قبل ما يطلع: أشهر الثغرات في دقيقة",
          desc: R`الثغرات المشهورة في PHP وحماية كل واحدة: SQL injection ← prepared statements. XSS ← [[e()]] على كل طباعة. CSRF ← token في كل POST. session fixation ← [[session_regenerate_id(true)]] عند الدخول. file inclusion ← عمرك ما تعمل [[include]] لاسم جاي من المستخدم. رفع ملفات ← finfo واسم عشوائي وبره الـ webroot. وكمان: الأسرار بره git، و [[display_errors]] مقفول.

الأوامر دي بتدوّر على الأماكن المشبوهة في مشروع قديم في ثواني. كل نتيجة مش أكيد ثغرة، بس لازم تبصلها.`,
          example: R`grep -rnE '(mysqli_query|->query)\(.*\$' --include='*.php' .
grep -rnE 'echo\s+\$_(GET|POST|REQUEST|COOKIE)' --include='*.php' .
grep -rnE '(include|require)(_once)?\s*\(?\s*\$_' --include='*.php' .
grep -rnE '\b(md5|sha1)\(' --include='*.php' .
grep -rnE '\b(uniqid|rand|mt_rand)\(' --include='*.php' .
grep -rLE 'csrf' --include='*.php' admin/
git ls-files | grep -E 'config\.php$|\.env$'`,
          try: R`شغّلهم على مشروع PHP قديم عندك، واعمل جدول: الملف، والسطر، ونوع المشكلة، والتصليح. ابدأ بالـ SQL لأنه الأخطر.`,
          deep: {
            why: "أغلب مواقع PHP اللي بتتخترق مش بسبب حاجة معقدة: query ملزوق، أو فولدر رفع بينفّذ PHP، أو باسورد في git. قايمة ثابتة بتراجعها قبل كل إطلاق بتقفل ٩٠٪ من ده.",
            how: R`file inclusion (LFI): [[include "pages/" . $_GET['p'] . ".php"]] ومستخدم يبعت [[?p=../../config]] فيتحمّل ملف إعداداتك، أو ملف log فيه كود حطه هو. الحل allowlist: [[$pages = ['home' => 'home.php', 'about' => 'about.php'];]] وتختار منها، ولو مش موجود 404. وتحميل ملفات من روابط ([[allow_url_include]]) مقفول افتراضيًا، سيبه مقفول.

open redirect: [[header('Location: ' . $_GET['next'])]] بيخلي لينك موقعك يودّي لموقع تصيّد. اقبل مسار بيبدأ بـ [[/]] والحرف التاني مش [[/]] ولا [[\]]، ومفيهوش tab ولا أي control character: المتصفح بيعامل [[/\evil.com]] زي [[//evil.com]]، وبيشيل الـ tab من الرابط فـ [[/%09/evil.com]] يبقى [[//evil.com]] برضه. والأحسن allowlist للمسارات المسموحة.

عشوائية ضعيفة: [[rand]] و [[mt_rand]] و [[uniqid]] متتخمنش بسهولة للإنسان بس سهلة للمهاجم. أي token أو اسم ملف أو كود: [[random_bytes]] أو [[random_int]].

المقارنات: [[==]] مع hashes أو tokens ممكن تعدّي حاجات غلط ([["0e1" == "0e2"]])؛ [[hash_equals]] للأسرار و [[===]] لأي حاجة تانية.

الصلاحيات: كل endpoint بيتحقق مين الطالب ومن حقه على العنصر ده ولا لأ (IDOR)، مش بس إن اللينك مستخبي.

وطبقات فوق الكود: HTTPS، و headers زي [[X-Content-Type-Options]] و [[Content-Security-Policy]] (تاب الأمان و Nginx)، و PHP نسخة لسه بتاخد تحديثات أمنية، و [[composer audit]].`,
            when: "قبل أول إطلاق، وقبل أي deploy كبير، ولما تستلم مشروع PHP قديم من حد تاني.",
            mistakes: R`في مشروع حقيقي المراجعة دي كانت هتطلّع في ساعة: queries بـ escape ولزق، وأكواد بـ [[rand()]]، وأسماء ملفات بـ [[uniqid()]]، وتوكن «افتكرني» متخزن زي ما هو، و endpoint بيرجّع نص غلطة القاعدة، وصفحة صور محمية بالـ Referer. ولا واحدة فيهم محتاجة هاكر محترف. والغلطة الأكبر: تعتبر نتايج grep هي كل الثغرات؛ هي البداية بس.`
          },
          lines: [
            "queries فيها متغير جوه نص الـ SQL (مرشح لـ SQL injection).",
            "طباعة مباشرة لبيانات المستخدم من غير escape (XSS).",
            "include أو require لقيمة من المستخدم (file inclusion).",
            "hashing ضعيف (للباسورد: password_hash).",
            "عشوائية ضعيفة (للأسرار: random_bytes و random_int).",
            "ملفات الأدمن اللي مفيهاش كلمة csrf خالص.",
            "أسرار متتبعة في git."
          ],
          sol: R`على مشروع قديم الأوامر بتطلّع سطور بالشكل ده، وكل سطر يبقى صف في الجدول:

[[./login.php:2: mysqli_query($conn, "SELECT ... WHERE email = '$_POST[email]'")]]: SQL injection، التصليح prepared statement. [[./admin/delete.php:2: $db->query('DELETE ... id = ' . $_POST['id'])]]: نفس الحكاية. [[./login.php:4: echo $_GET['msg'];]]: XSS، التصليح [[e()]]. [[./login.php:5: include $_GET['page'] . '.php';]]: file inclusion، التصليح whitelist بأسماء الصفحات. [[md5(...)]] على باسورد: [[password_hash]]. [[uniqid()]] كـ token: [[bin2hex(random_bytes(32))]]. و [[grep -rL csrf admin/]] بيطلّع الملفات اللي مفيهاش كلمة csrf خالص، زي [[admin/delete.php]]. و [[git ls-files]] لو طلّع [[config.php]] يبقى السر في git، والتصليح [[git rm --cached]] وغيّر السر.

الـ grep بيطلّع false positives (مثلًا [[->query]] على نص ثابت مفيهوش input، أو [[md5]] لـ cache key مش باسورد)، فكل سطر اقراه بعينك. وغيابه مش ضمان: [[$sql = "..." . $id; $db->query($sql);]] على سطرين مش هيظهر، فدوّر كمان على [[\$sql\s*=.*\$_]] وافتح كل ملف فيه [[query]].`,
          solCode: R`| الملف:السطر        | المشكلة           | التصليح                                   |
|--------------------|-------------------|-------------------------------------------|
| login.php:2        | SQL injection     | prepare + execute(['email' => $email])    |
| admin/delete.php:2 | SQL injection     | prepare + (int) id + شرط user_id          |
| login.php:4        | XSS               | echo e($_GET['msg'] ?? '')                |
| login.php:5        | file inclusion    | match ($page) { 'home' => ..., ... }      |
| login.php:3        | md5 للباسورد      | password_hash / password_verify           |
| login.php:3        | uniqid كـ token   | bin2hex(random_bytes(32))                 |
| admin/delete.php   | مفيش CSRF         | csrf_ok() أول الملف                       |
| config.php         | سر في git         | .gitignore + git rm --cached + غيّر السر |`
        },
        {
          cmd: "OPcache",
          title: "خلّي PHP ميعيدش ترجمة الكود مع كل طلب",
          desc: R`كل طلب PHP بيقرا الملفات ويحوّلها لـ opcodes (تعليمات داخلية) وبعدين ينفّذها. OPcache بيحفظ الـ opcodes دي في الذاكرة المشتركة، فالطلبات اللي بعدها بتنفّذ على طول من غير ترجمة. غالبًا متفعّل على السيرفرات، والصفحة دي بتتأكد وتوريك الأرقام.

في الإنتاج ممكن تقفل فحص تاريخ الملفات ([[validate_timestamps=0]]) لسرعة أكتر، بس ساعتها لازم تعمل reload لـ PHP-FPM بعد كل deploy.`,
          example: R`<?php
if (!function_exists('opcache_get_status')) exit("OPcache مش متسطّب\n");
$s = opcache_get_status(false);
if ($s === false) exit("OPcache مقفول\n");
$st = $s['opcache_statistics'];
printf("scripts: %d\n", $st['num_cached_scripts']);
printf("hit rate: %.1f%%\n", $st['opcache_hit_rate']);
printf("memory used: %.1f MB\n", $s['memory_usage']['used_memory'] / 1048576);
printf("validate_timestamps: %s\n", ini_get('opcache.validate_timestamps'));`,
          try: R`شغّل [[php -d opcache.enable_cli=1 -S localhost:8000]] (السيرفر المدمج بيتبع [[opcache.enable_cli]] وهي مقفولة افتراضيًا، ولو الـ extension مش متحمّل عندك ضيف كمان [[-d zend_extension=opcache]]) وافتح الصفحة كذا مرة: الـ hit rate بيطلع. وبعدين ارفعها على السيرفر، شوف الأرقام، وامسحها.`,
          flag: "script",
          deep: {
            why: "مشروع بـ Composer أو framework بيحمّل مئات الملفات في كل طلب. من غير OPcache كل طلب بيترجمهم من الأول، وده أغلب وقت الطلب في مشاريع كتير.",
            how: R`القيم الافتراضية: [[opcache.enable=1]] (للويب)، و [[opcache.enable_cli=0]] (عشان كده الترمنال بيقولك مقفول)، و [[memory_consumption=128]] ميجا، و [[max_accelerated_files=10000]]، و [[validate_timestamps=1]] مع [[revalidate_freq=2]]: كل ثانيتين بيبص على تاريخ الملف ولو اتغير يترجمه تاني.

مع [[validate_timestamps=0]] بيوفّر الفحص ده خالص، بس أي تعديل في الكود مش هيبان لحد ما تعمل [[sudo systemctl reload php8.4-fpm]] (الاسم حسب النسخة). و [[opcache_reset()]] من الترمنال مبيأثرش على FPM، لأن كل SAPI ليه ذاكرته.

لو الـ hit rate واطي أو الذاكرة مليانة: زوّد [[memory_consumption]] و [[max_accelerated_files]] (مشاريع Laravel الكبيرة بتعدّي 10000 ملف بسهولة).

JIT: من PHP 8.4 الافتراضي [[opcache.jit=disable]]. بيفيد الحسابات التقيلة، ونادرًا بيفرق في موقع أغلب وقته مستني القاعدة.

وباقي الأداء غالبًا مش في PHP: query من غير index، أو N+1، أو صور كبيرة. [[EXPLAIN]] على الـ queries البطيئة (تاب «SQL و Prisma»)، و cache للنتايج التقيلة (APCu أو Redis)، و [[composer install -o]].

على الاستضافة المشتركة OPcache في إيد الاستضافة، وغالبًا متفعّل. تشوفه من [[phpinfo()]] أو الصفحة دي.`,
            when: "مرة على كل سيرفر جديد تتأكد إنه شغال. وضبط [[validate_timestamps]] لما يكون عندك deploy script بيعمل reload.",
            mistakes: R`[[validate_timestamps=0]] من غير reload في الـ deploy: الكود الجديد اترفع والموقع شغال بالقديم، وتقعد ساعة تدوّر على bug مش موجود. وتسيب صفحة الحالة دي (أو [[phpinfo()]]) مرفوعة، وهي بتكشف إعدادات السيرفر.`
          },
          lines: [
            "بداية الملف.",
            "الإضافة مش متحمّلة أصلًا.",
            "الحالة من غير لستة الملفات.",
            "متحمّلة بس مقفولة (زي الترمنال).",
            "الإحصائيات.",
            "عدد الملفات المحفوظة مترجمة.",
            "نسبة الطلبات اللي لقت الملف جاهز.",
            "الذاكرة المستخدمة بالميجا.",
            "بيفحص تاريخ الملفات ولا لأ."
          ],
          sol: R`مع [[php -S]] العادي على Linux هتلاقي [[scripts: 0]] و [[hit rate: 0.0%]] مهما عملت refresh، لأن السيرفر المدمج بيتبع [[opcache.enable_cli]] وهي [[0]]. شغّل [[php -d opcache.enable_cli=1 -S localhost:8000]]: أول طلب [[scripts: 1]] و [[hit rate: 0.0%]] (لسه بيترجم)، وبعدين 50% ثم 66.7% ثم 75% ثم 80%... الملف بقى في الذاكرة وكل طلب بعد كده hit. و [[memory used]] حوالي 9 MB، و [[validate_timestamps: 1]].

على السيرفر الحقيقي (PHP-FPM) الأرقام أكبر بكتير: مئات أو آلاف scripts لو فيه framework، و hit rate فوق 99%. لو أقل من كده بعد ما الموقع اشتغل شوية، غالبًا [[memory_consumption]] أو [[max_accelerated_files]] صغيرين. ولو طلّع [[OPcache مقفول]] من الترمنال ده طبيعي ([[enable_cli=0]])، افتحها من المتصفح. وامسح الصفحة بعدها لأنها بتكشف مسارات ملفاتك.`
        },
        {
          cmd: "php artisan",
          title: "إمتى تسيب PHP الخام وتروح لـ Laravel",
          desc: R`Laravel (النسخة 13 نزلت مارس 2026 ومحتاجة PHP 8.3 أو أحدث) بيدّيك جاهز كل اللي عملناه بإيدنا: router، و controllers، و ORM اسمه Eloquent، و migrations، و Blade بيعمل escape لوحده، و CSRF، وجلسات، و auth، و queues، وإيميل، و validation. و [[artisan]] أداة الترمنال بتاعته.

القاعدة: موقع فيه login وقاعدة ولوحة أدمن وإيميلات وأكتر من كام صفحة ← Laravel. صفحة هبوط، أو موقع صغير على استضافة مشتركة، أو سكربت ← PHP خام. واللي فهم التاب ده هيفهم Laravel بسرعة، لأن كل «سحر» فيه له مقابل هنا.`,
          example: R`composer create-project laravel/laravel myapp
cd myapp
php artisan make:model Post -mc
php artisan migrate
php artisan route:list
php artisan tinker
composer run dev`,
          try: R`اعمل مشروع، وموديل [[Post]] بـ migration و controller، وضيف في الـ migration [[$table->string('title');]]، وشغّل [[migrate]]. وفي [[tinker]]: [[App\Models\Post::create(['title' => 'أول بوست'])]]، هتاخد MassAssignmentException؛ اقرا ليه، وحلها بـ [[$fillable]].`,
          deep: {
            why: "مشروع حقيقي بـ PHP خام بيخليك تكتب router و CSRF و validation و migrations و queue بنفسك، وكل واحدة فيها مكان لغلطة أمنية. Laravel مجرّب على ملايين المشاريع ومتحدّث، فوقتك يروح في المشروع نفسه.",
            how: R`رحلة الطلب في Laravel هي نفس اللي عملناه: [[public/index.php]] (front controller) → [[bootstrap/app.php]] → middleware (جلسة، CSRF، auth) → router → controller → Eloquent → Blade view → response.

Routes في [[routes/web.php]]: [[Route::get('/posts/{post}', [PostController::class, 'show']);]]. و [[{post}]] مع [[show(Post $post)]] بيجيب البوست بالـ id لوحده أو 404 (route model binding).

Eloquent: كل جدول كلاس. [[Post::where('published', true)->latest()->paginate(10)]] بيبني prepared statement. والعلاقات [[$user->posts]]، و [[with('user')]] بيحل N+1.

Migrations: ملفات PHP بتوصف تغيير الجدول ([[Schema::create('posts', ...)]] و [[$table->id()]] و [[$table->timestamps()]])، و [[php artisan migrate]] بيطبّق اللي ماتطبقش، و [[migrate:rollback]] بيرجّع. ده الشكل الصح لسكربتات الـ migration اليدوية.

Blade: [[{{ $post->title }}]] بيعمل escape لوحده (نفس [[e()]])، و [[{!! $html !!}]] من غير escape (خطر)، و [[@csrf]] بيحط الـ token في الفورم.

الإعدادات في [[.env]]، والمشروع الجديد بيبدأ على SQLite؛ لـ MySQL غيّر [[DB_CONNECTION=mysql]] وباقي [[DB_*]]. و [[make:model Post -mc]]: موديل ومعاه migration و controller. و [[tinker]] REPL فيه كل كلاسات المشروع. و [[composer run dev]] بيشغّل السيرفر و Vite مع بعض.`,
            when: "مشروع هيكبر، أو فيه فريق، أو محتاج auth وأدوار وإيميلات و jobs. PHP الخام للصغير، وللتعلّم، وللسكربتات.",
            mistakes: R`تبدأ بـ Laravel قبل ما تفهم PHP نفسه، فكل حاجة تبان سحر ومش عارف تصلّح. وعلى الاستضافة تخلي الدومين يشاور على فولدر المشروع مش [[public]]، فـ [[.env]] بكل أسراره يبقى على رابط. و [[Post::create($request->all())]] من غير [[$fillable]]. و N+1 مع Eloquent في loop من غير [[with()]].`
          },
          lines: [
            "مشروع Laravel جديد في فولدر myapp.",
            "ادخله.",
            "موديل Post ومعاه migration و controller.",
            "طبّق الـ migrations على القاعدة.",
            "كل الـ routes والـ controllers بتاعتها.",
            "REPL فيه كل كلاسات المشروع.",
            "شغّل سيرفر التطوير و Vite مع بعض."
          ],
          sol: R`[[make:model Post -mc]] بيعمل [[app/Models/Post.php]] و migration و [[PostController]]. بعد [[$table->string('title');]] و [[migrate]] بيطبع [[..._create_posts_table ...... DONE]].

في tinker، [[App\Models\Post::create(['title' => 'أول بوست'])]]: [[Illuminate\Database\Eloquent\MassAssignmentException  Add [title] to fillable property to allow mass assignment on [App\Models\Post].]] Laravel بيرفض يملا أعمدة من array إلا اللي انت سامح بيها، عشان لو عملت [[Post::create($request->all())]] محدش يبعت [[is_admin=1]] أو [[user_id]] حد تاني.

بعد [[protected $fillable = ['title'];]] في الموديل (واقفل tinker وافتحه تاني عشان يقرا التعديل): بيرجّع [[App\Models\Post]] فيه [[title: "أول بوست"]] و [[created_at]] و [[updated_at]] و [[id: 1]]. الغلط الشائع: تحل المشكلة بـ [[$guarded = []]] فتفتح كل الأعمدة.`,
          solCode: R`<?php // app/Models/Post.php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Post extends Model
{
    protected $fillable = ['title'];
}`
        }
      ]
    }
]);

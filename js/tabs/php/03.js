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
          teach: R`## المثال بيعمل إيه؟

بيعرّف كلاس [[Money]] بيمثّل مبلغ فلوس بالقرش، بيرفض المبلغ السالب، ومحدش يقدر يغيّر قيمته بعد ما يتعمل. وبعدين بيجمع ١٠٠ جنيه على ٥٠ جنيه ويطبع الناتج. كل الأوامر اتشغّلت جوه Docker على [[php:8.4-cli]].

---

## ١. أول سطرين

~~~php
<?php
declare(strict_types=1);
~~~

[[declare(strict_types=1)]] بيقول لـ PHP: «متحوّلش الأنواع لوحدك في الملف ده». من غيره، لو بعت النص [['100']] لـ parameter نوعه [[int]]، PHP بيحوّله رقم ويكمّل ساكت. معاه بيرمي غلطة:

~~~text الناتج (new Money('100') مع strict_types)
TypeError: Money::__construct(): Argument #1 ($amount) must be of type int, string given
~~~

> خلي بالك: [[strict_types]] بيتحسب حسب الملف اللي **بينادي** الدالة، مش الملف اللي هي متعرّفة فيه. جربناها من ملف مفيهوش السطر ده: [[new Money('100')]] عدّت ساكتة واتحوّلت [[100]].

---

## ٢. [[final class Money]]

~~~php
final class Money {
~~~

- [[class]]: قالب. بيوصف شكل الـ object (البيانات اللي فيه) والدوال اللي بتشتغل عليه (اسمها methods).
- [[Money]]: اسم الكلاس، والعادة إنه يبدأ بحرف كبير.
- [[final]]: محدش يقدر يعمل كلاس يورث منه. جربنا [[class X extends Money {}]]:

~~~text الناتج
Fatal error: Class X cannot extend final class Money in /app/class3.php on line 3
~~~

---

## ٣. الـ constructor و constructor promotion

~~~php
    public function __construct(
        public readonly int $amount,
        public readonly string $currency = 'EGP',
    ) {
~~~

[[__construct]] (شرطتين تحت قبلها) دالة خاصة PHP بينفّذها لوحده أول ما تكتب [[new Money(...)]]. وظيفتها تجهّز الـ object.

الحتة الجديدة إن الـ parameters نفسها مكتوب قبلها [[public readonly]]. ده اسمه **constructor promotion** (من PHP 8): PHP بيعمل property بنفس الاسم ويحط فيها القيمة لوحده. يعني السطرين دول بيعملوا نفس اللي كان بيتكتب زمان كده:

~~~php
public readonly int $amount;
public function __construct(int $amount) {
    $this->amount = $amount;
}
~~~

| الكلمة | معناها |
|---|---|
| [[public]] | أي حد برّه الكلاس يقدر يقرا [[$total->amount]] |
| [[readonly]] | القيمة بتتحط مرة واحدة بس (PHP 8.1)، وأي كتابة بعدها غلطة |
| [[int]] | النوع: رقم صحيح بس. وعلى readonly النوع إجباري |
| [[$amount]] | اسم الـ property |
| [[= 'EGP']] | قيمة افتراضية لو محدش بعت عملة |
| الفاصلة بعد آخر parameter | مسموحة (من PHP 8)، بتسهّل إضافة parameter جديد |

---

## ٤. القاعدة جوه الـ constructor

~~~php
        if ($amount < 0) throw new InvalidArgumentException('المبلغ سالب');
    }
~~~

[[throw]] بيرمي exception ويوقف التنفيذ. و [[InvalidArgumentException]] كلاس exception جاهز في PHP معناه «القيمة اللي اتبعتت غلط». جربنا [[new Money(-5)]]:

~~~text الناتج
Fatal error: Uncaught InvalidArgumentException: المبلغ سالب in /app/classdef.php:8
Stack trace:
#0 /app/class6.php(7): Money->__construct(-5)
~~~

ولأن الـ constructor هو الباب الوحيد لعمل [[Money]]، مستحيل يبقى عندك object فيه مبلغ سالب.

---

## ٥. [[add]]: بترجّع object جديد

~~~php
    public function add(Money $other): self {
        return new self($this->amount + $other->amount, $this->currency);
    }
}
~~~

| الحتة | معناها |
|---|---|
| [[Money $other]] | الـ parameter لازم يكون object من [[Money]] |
| [[: self]] | الدالة بترجّع object من نفس الكلاس |
| [[$this]] | الـ object اللي اتنادت عليه الدالة |
| [[->]] | «هات من الـ object ده» property أو method |
| [[new self(...)]] | اعمل object جديد من نفس الكلاس |

[[add]] مبتغيّرش [[$this->amount]] (أصلًا مينفعش، readonly). بتحسب المجموع وتعمل [[Money]] جديد. جربنا [[$b = $a->add(...)]] وبعدين [[var_dump($a === $b, $a->amount)]]:

~~~text الناتج
bool(false)
int(100)
~~~

يعني [[$a]] زي ما هو (100)، و [[$b]] object تاني خالص.

---

## ٦. السطر الأخير: [[new]] من غير أقواس (PHP 8.4)

~~~php
$total = new Money(10000)->add(new Money(5000));
echo $total->amount;
~~~

الترتيب: [[new Money(5000)]] الأول (لأنه argument)، وبعدين [[new Money(10000)]]، وبعدين [[->add(...)]] عليه، والناتج يتحط في [[$total]]. قبل 8.4 كان لازم تكتب [[(new Money(10000))->add(...)]] بأقواس حوالين [[new]]، وإلا Parse error.

~~~text الناتج
15000
~~~

يعني ١٥٠ جنيه، لأن المبلغ بالقرش. ولو عملت [[var_dump($total)]]:

~~~text الناتج
object(Money)#3 (2) {
  ["amount"]=>
  int(15000)
  ["currency"]=>
  string(3) "EGP"
}
~~~

[[#3]] رقم الـ object: ده التالت اللي اتعمل (5000 ثم 10000 ثم المجموع).

---

## ٧. ليه int بالقرش مش float؟

~~~php
var_dump(0.1 + 0.2 == 0.3);
printf("%.20f\n", 0.1 + 0.2);
~~~

~~~text الناتج
bool(false)
0.30000000000000004441
~~~

الكمبيوتر بيخزن الـ float بالـ binary، و [[0.1]] مالهاش تمثيل مظبوط فيه (زي ١/٣ في العشري). فالفرق الصغير ده بيتجمّع مع كل عملية. الـ int مفيهوش المشكلة دي: [[10000 + 5000]] هي [[15000]] بالظبط.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| constructor promotion | property وقيمتها في سطر واحد |
| [[readonly]] | القيمة تتحط مرة، والتعديل [[Error: Cannot modify readonly property]] |
| قاعدة في الـ constructor | مفيش object غلط يتعمل أصلًا |
| [[add]] بترجّع [[new self]] | بدل ما تعدّل، اعمل نسخة جديدة |
| [[final]] | محدش يورث من الكلاس |
| الفلوس | [[int]] بالقرش، مش float |`,
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
          teach: R`## المثال بيعمل إيه؟

٣ طبقات: عقد ([[interface]]) بيقول «أي بوابة دفع لازم يبقى فيها [[charge]]»، وأساس مشترك ([[abstract class]]) فيه كود بيتكرر، وكلاس حقيقي ([[FakeGateway]]) بيكمّل الناقص. ودالة [[checkout]] بتشتغل مع أي حاجة بتنفّذ العقد. اتشغّل جوه Docker على [[php:8.4-cli]].

---

## ١. الـ interface: العقد

~~~php
interface PaymentGateway {
    public function charge(int $amount): string;
}
~~~

- [[interface]]: لستة methods بأسمائها وأنواعها **من غير جسم** (مفيش [[{ }]]، السطر بيخلص بـ [[;]]).
- [[charge(int $amount): string]]: أي كلاس عايز يبقى [[PaymentGateway]] لازم يبقى فيه method بالاسم ده، بتاخد رقم وترجّع نص (رقم العملية).
- كل methods الـ interface لازم تبقى [[public]].

الـ interface مبيعملش حاجة لوحده. هو مجرد وعد.

---

## ٢. الـ abstract class: أساس مشترك

~~~php
abstract class BaseGateway implements PaymentGateway {
    public function __construct(protected string $apiKey) {}
    protected function log(string $msg): void { error_log(static::class . ": $msg"); }
}
~~~

| الحتة | معناها |
|---|---|
| [[abstract]] | كلاس ناقص: مينفعش تعمل منه [[new]] |
| [[implements PaymentGateway]] | بيوعد إنه هيلتزم بالعقد. ولأنه abstract، مسموح يسيب [[charge]] للابن |
| [[protected string $apiKey]] | constructor promotion؛ و [[protected]] يعني الكلاس ده واللي بيورثوا منه بس يشوفوه |
| [[protected function log]] | method كاملة بيورثها كل الأبناء |
| [[: void]] | الدالة مبترجّعش حاجة |
| [[error_log(...)]] | بيكتب رسالة في الـ log. في الترمنال بتطلع على الـ stderr |
| [[static::class]] | اسم الكلاس **الفعلي** اللي اتعمل منه الـ object (late static binding) |
| [[.]] | لزق نصوص |

جربنا [[new BaseGateway('k')]]:

~~~text الناتج
Cannot instantiate abstract class BaseGateway
~~~

وجربنا ننادي [[log]] من برّه: [[(new FakeGateway('k'))->log('x')]]:

~~~text الناتج
Call to protected method BaseGateway::log() from global scope
~~~

---

## ٣. الكلاس الحقيقي

~~~php
final class FakeGateway extends BaseGateway {
    public function charge(int $amount): string {
        $this->log("charge $amount");
        return 'txn_' . bin2hex(random_bytes(4));
    }
}
~~~

- [[extends BaseGateway]]: بيورث الـ constructor و [[log]]. والوراثة من كلاس واحد بس.
- [[charge]]: ده الجزء الناقص اللي العقد طالبه.
- [[$this->log(...)]]: بينادي method الأب كأنها بتاعته.
- [[random_bytes(4)]]: ٤ بايت عشوائية آمنة، و [[bin2hex]] بيحوّلهم لـ ٨ حروف hex (0-9 و a-f)، فيطلع حاجة زي [[txn_555d050f]].

---

## ٤. الدالة بتطلب العقد، مش الكلاس

~~~php
function checkout(PaymentGateway $gw): string { return $gw->charge(500); }
echo checkout(new FakeGateway('YOUR_KEY'));
~~~

[[PaymentGateway $gw]] معناها: «ابعتلي أي object بينفّذ العقد ده». [[checkout]] متعرفش ولا يهمها هو Fake ولا Stripe ولا Paymob.

~~~text الناتج
FakeGateway: charge 500
txn_555d050f
~~~

السطر الأول من [[error_log]]، و [[static::class]] طلّع [[FakeGateway]] مش [[BaseGateway]] رغم إن الكود مكتوب في الأب. والسطر التاني رقم العملية، وبيتغير كل مرة.

ولو بعتنا حاجة مش بتنفّذ العقد: [[checkout(new stdClass)]]:

~~~text الناتج
checkout(): Argument #1 ($gw) must be of type PaymentGateway, stdClass given
~~~

---

## ٥. لو الكلاس مكمّلش العقد

شلنا [[charge]] من [[FakeGateway]] وحطينا بعد الكلاس [[echo "before\n";]]:

~~~text الناتج
Fatal error: Class FakeGateway contains 1 abstract method and must therefore be declared abstract or implement the remaining methods (PaymentGateway::charge) in /app/if2.php on line 9
~~~

و [[before]] مطلعتش خالص: PHP بيفحص الكلاس وهو بيعرّفه، قبل ما أي سطر تاني يشتغل.

---

## ٦. الحل: كلاس من غير الأساس

~~~php
final class LoggingGateway implements PaymentGateway {
    public function charge(int $amount): string {
        echo "[LoggingGateway] charge $amount\n";
        return 'log_' . $amount;
    }
}
echo checkout(new FakeGateway('YOUR_KEY')), "\n";
echo checkout(new LoggingGateway()), "\n";
~~~

[[LoggingGateway]] مش وارث من [[BaseGateway]] خالص، بس بينفّذ العقد، فـ [[checkout]] قبلته. والفاصلة في [[echo a, b]] بتطبع الاتنين ورا بعض.

~~~text الناتج
FakeGateway: charge 500
txn_41f8f46a
[LoggingGateway] charge 500
log_500
~~~

و [[instanceof]] بيأكد: [[new FakeGateway('k') instanceof PaymentGateway]] طلعت [[bool(true)]]، لأن الأب نفّذ العقد فالابن كمان.

---

## الخلاصة

| | [[interface]] | [[abstract class]] |
|---|---|---|
| فيه كود؟ | لأ، أسماء وأنواع بس | آه، ومعاه methods ناقصة |
| properties و constructor | لأ (من 8.4 ممكن يطلب property بـ hooks، درس «property hooks») | آه |
| الكلاس ياخد كام؟ | كذا واحد بـ [[implements]] | واحد بس بـ [[extends]] |
| [[new]] منه | لأ | لأ |
| الفايدة | دالة تطلب «أي حد بيعمل كذا» | كود مشترك بين الأبناء |`,
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
          teach: R`## المثال بيعمل إيه؟

بيعمل traitين: واحد بيسجّل وقت الإنشاء، والتاني بيعمل «مسح منطقي» (soft delete: نعلّم الصف إنه اتمسح من غير ما نمسحه من القاعدة). وبعدين كلاس [[Post]] بياخد الاتنين بسطر واحد. اتشغّل جوه Docker على [[php:8.4-cli]].

---

## ١. أول trait

~~~php
trait HasTimestamps {
    public ?DateTimeImmutable $createdAt = null;
    public function touch(): void {
        $this->createdAt ??= new DateTimeImmutable();
    }
}
~~~

[[trait]] شكله زي الكلاس، بس مينفعش تعمل منه [[new]]. هو حتة كود مستنية كلاس ياخدها.

| الحتة | معناها |
|---|---|
| [[?DateTimeImmutable]] | النوع: object تاريخ ووقت، و [[?]] قبله يعني «أو [[null]]» |
| [[DateTimeImmutable]] | كلاس جاهز في PHP للتاريخ، و immutable يعني أي تعديل بيرجّع object جديد |
| [[= null]] | القيمة في الأول: لسه متعملش |
| [[??=]] | «حط القيمة دي **لو** الخانة [[null]] بس». يعني [[touch]] أول مرة بتحط الوقت، والمرات اللي بعدها مبتغيّرش حاجة |
| [[new DateTimeImmutable()]] | من غير arguments = دلوقتي |

جربنا [[touch()]] مرتين وقارنّا: [[var_dump($first === $p->createdAt)]] طلعت [[bool(true)]]، يعني التانية مغيّرتش الوقت.

---

## ٢. التاني trait

~~~php
trait SoftDeletes {
    public ?DateTimeImmutable $deletedAt = null;
    public function softDelete(): void { $this->deletedAt = new DateTimeImmutable(); }
    public function trashed(): bool { return $this->deletedAt !== null; }
}
~~~

- [[softDelete]]: بتحط وقت المسح في [[$deletedAt]]. في Laravel الخانة دي عمود [[deleted_at]] في الجدول، والصف بيفضل موجود.
- [[trashed]]: [[!==]] يعني «مش متطابق»، فبترجّع [[true]] لو فيه وقت مسح.

---

## ٣. الكلاس بياخدهم بـ [[use]]

~~~php
class Post {
    use HasTimestamps, SoftDeletes;
}
~~~

[[use]] **جوه** الكلاس معناها «انسخ محتوى الـ traits دي هنا». (و [[use]] **برّه** الكلاس في أول الملف حاجة تانية خالص: اختصار لاسم namespace، هتشوفها في درس PSR-4.)

PHP بينسخ الكود وقت الـ compile، فـ [[Post]] بقى فيه properties و methods كأنك كتبتها فيه بإيدك. جربنا [[get_object_vars($p)]] بعد [[touch()]]:

~~~text الناتج
Array
(
    [createdAt] => DateTimeImmutable Object
        (
            [date] => 2026-10-07 16:32:59.890007
            [timezone_type] => 3
            [timezone] => UTC
        )

    [deletedAt] =>
)
~~~

الـ properties الاتنين بقوا جوه الـ object نفسه. والوقت UTC لأن جوه الـ container مفيش timezone متظبطة.

---

## ٤. الاستخدام

~~~php
$p = new Post();
$p->touch();
$p->softDelete();
var_dump($p->trashed());
~~~

~~~text الناتج
bool(true)
~~~

و [[$p->trashed()]] قبل [[softDelete()]] كانت [[bool(false)]].

---

## ٥. الـ trait مش نوع

~~~php
print_r(class_uses($p));
var_dump($p instanceof SoftDeletes);
~~~

~~~text الناتج
Array
(
    [HasTimestamps] => HasTimestamps
    [SoftDeletes] => SoftDeletes
)
bool(false)
~~~

[[class_uses]] بيقولك الكلاس بياخد أنهي traits، بس [[instanceof]] بيقول لأ: الـ trait نسخ كود، مش نوع زي الـ interface.

---

## ٦. تعارض اسمين

لو trait تالت فيه [[touch]] برضه:

~~~php
trait Touchable {
    public function touch(): void { echo "Touchable::touch\n"; }
}
class Post { use HasTimestamps, SoftDeletes, Touchable; }
~~~

~~~text الناتج
Fatal error: Trait method Touchable::touch has not been applied as Post::touch, because of collision with HasTimestamps::touch in /app/tr3.php on line 6
~~~

PHP مش هيختار لوحده. الحل بقوسين بعد [[use]]:

~~~php
class Post {
    use HasTimestamps, SoftDeletes, Touchable {
        HasTimestamps::touch insteadof Touchable;
        Touchable::touch as touchLog;
    }
}
~~~

| السطر | معناه |
|---|---|
| [[HasTimestamps::touch insteadof Touchable;]] | [[touch]] تيجي من [[HasTimestamps]] **بدل** [[Touchable]] |
| [[Touchable::touch as touchLog;]] | وخلي [[touch]] بتاعة [[Touchable]] موجودة باسم تاني [[touchLog]] |
| [[::]] | «الـ method دي من الـ trait ده» |

~~~php
$p = new Post();
$p->touch();
$p->touchLog();
$c = new Comment();   // class Comment { use SoftDeletes; }
$c->softDelete();
var_dump($c->trashed());
~~~

~~~text الناتج
Touchable::touch
bool(true)
~~~

[[touch()]] مطبعتش حاجة (بتاعة [[HasTimestamps]] بتحط الوقت بس)، و [[touchLog()]] طبعت. و [[Comment]] خد [[SoftDeletes]] لوحده واشتغل.

جربنا كمان [[as]] لوحدها من غير [[insteadof]]: نفس الـ Fatal error بتاع التعارض، لأن [[as]] بتضيف اسم جديد بس والاسم [[touch]] لسه متعارض.

---

## الخلاصة

| | trait | وراثة ([[extends]]) | interface |
|---|---|---|---|
| بينقل كود؟ | آه، بينسخه | آه | لأ |
| الكلاس ياخد كام؟ | كذا واحد | واحد | كذا واحد |
| نوع ([[instanceof]])؟ | لأ | آه | آه |
| التعارض | [[insteadof]] و [[as]] | الابن بيكتب فوق الأب | مفيش كود يتعارض |`,
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
          teach: R`## المثال بيعمل إيه؟

بيعرّف نوع اسمه [[OrderStatus]] ليه ٣ حالات بس (في الانتظار، اتدفع، اتشحن)، كل حالة ليها قيمة نصية بتتخزن في القاعدة ونص عربي للعرض. وبعدين بيحوّل قيمة جاية من القاعدة وقيمة جاية من الرابط لـ enum. اتشغّل جوه Docker على [[php:8.4-cli]]، ومعرّفين قبله [[$row = ['status' => 'paid'];]] عشان يشتغل لوحده.

---

## ١. تعريف الـ enum

~~~php
enum OrderStatus: string {
    case Pending = 'pending';
    case Paid = 'paid';
    case Shipped = 'shipped';
~~~

| الحتة | معناها |
|---|---|
| [[enum]] | نوع ليه قيم محددة بس (PHP 8.1) |
| [[: string]] | backed enum: كل حالة ليها قيمة نصية (ممكن [[int]] بدلها) |
| [[case Paid]] | حالة اسمها [[Paid]]، وده اللي بتكتبه في الكود |
| [[= 'paid']] | القيمة اللي بتتخزن في القاعدة أو تيجي في الرابط |

الاسم ([[name]]) للكود، والقيمة ([[value]]) للتخزين. لو غيّرت الاسم بعدين القاعدة متتأثرش.

---

## ٢. method جوه الـ enum

~~~php
    public function label(): string {
        return match ($this) {
            self::Pending => 'في الانتظار',
            self::Paid    => 'اتدفع',
            self::Shipped => 'اتشحن',
        };
    }
}
~~~

- [[$this]] هنا الحالة نفسها اللي اتنادت عليها الدالة (مثلًا [[OrderStatus::Paid]]).
- [[self::Paid]]: [[self]] يعني الـ enum ده نفسه، و [[::]] بيوصل لحالة جواه.
- [[match]] بيقارن بـ [[===]] ويرجّع النص المطابق (درس [[match]]). ومفيش [[default]] عن قصد، الفايدة في الخطوة ٦.

---

## ٣. من القيمة للـ enum: [[from]]

~~~php
$status = OrderStatus::from($row['status']);
echo $status->label(), ' ', $status->value;
~~~

[[OrderStatus::from('paid')]] بيدوّر على الحالة اللي قيمتها [['paid']] ويرجّعها. وبعدين [[->label()]] و [[->value]]:

~~~text الناتج
اتدفع paid
~~~

جربنا قيمة مش موجودة [[OrderStatus::from('nope')]]:

~~~text الناتج
Fatal error: Uncaught ValueError: "nope" is not a valid backing value for enum OrderStatus in /app/en1.php:26
~~~

ولو شغّلت المثال من غير [[$row]] خالص، هتشوف سلسلة: [[Warning: Undefined variable $row]]، وبعدها [[Warning: Trying to access array offset on null]]، وبعدها [[Deprecated: OrderStatus::from(): Passing null to parameter #1 ($value) of type string|int is deprecated]]، وفي الآخر [[ValueError: "0" is not a valid backing value]].

---

## ٤. من الرابط: [[tryFrom]] و [[??]]

~~~php
$filter = OrderStatus::tryFrom($_GET['status'] ?? '') ?? OrderStatus::Pending;
~~~

من جوه لبرة:

1. [[$_GET['status'] ?? '']]: قيمة [[?status=]] من الرابط، ولو مش موجودة نص فاضي. (في الترمنال [[$_GET]] فاضي، فطلعت [['']].)
2. [[OrderStatus::tryFrom('')]]: زي [[from]] بس لو القيمة غلط بيرجّع [[null]] بدل ما يرمي. جربنا [[var_dump(OrderStatus::tryFrom('nope'))]] وطلعت [[NULL]].
3. [[?? OrderStatus::Pending]]: لو [[null]]، خد [[Pending]].

~~~text الناتج (var_dump($filter))
enum(OrderStatus::Pending)
~~~

القاعدة: [[from]] للقيم اللي جاية من قاعدتك (لو غلط يبقى bug لازم يبان)، و [[tryFrom]] للي جاي من المستخدم (لو غلط مش مشكلتك، اختار افتراضي).

---

## ٥. المقارنة و [[name]] و [[cases]]

جربنا:

~~~php
echo $status->name, "\n";
var_dump($status === OrderStatus::Paid, $status === 'paid', $status == 'paid');
echo json_encode(['s' => $status]), "\n";
print_r(array_map(fn($c) => $c->value, OrderStatus::cases()));
~~~

~~~text الناتج
Paid
bool(true)
bool(false)
bool(false)
{"s":"paid"}
Array
(
    [0] => pending
    [1] => paid
    [2] => shipped
)
~~~

- [[->name]] اسم الحالة في الكود.
- [[=== OrderStatus::Paid]] صح، لأن كل حالة object واحد بس في البرنامج كله. لكن مقارنتها بالنص [['paid']] (حتى بـ [[==]]) دايمًا false: قارن بـ [[->value]].
- [[json_encode]] بيطلّع القيمة، فالـ API بيرجّع [["paid"]] لوحده.
- [[cases()]] كل الحالات بالترتيب، مفيدة لـ dropdown.

ومينفعش [[new OrderStatus()]]: [[Cannot instantiate enum OrderStatus]].

---

## ٦. حالة جديدة نسيتها في [[match]]

ضيفنا [[case Cancelled = 'cancelled';]] ومضيفناهاش في [[label()]]:

~~~php
echo OrderStatus::Paid->label(), "\n";
echo OrderStatus::Cancelled->label(), "\n";
~~~

~~~text الناتج
اتدفع

Fatal error: Uncaught UnhandledMatchError: Unhandled match case OrderStatus::Cancelled in /app/en2.php:9
Stack trace:
#0 /app/en2.php(14): OrderStatus->label()
~~~

السطر الأول اشتغل عادي، والغلطة طلعت بس لما الحالة الجديدة اتعرضت، وفيها اسم الحالة بالظبط. عشان كده بلاش [[default]] في [[match]] على enum: من غيره مستحيل تنسى حالة وتعدّي بصمت.

---

## الخلاصة

| | بيعمل إيه | لو القيمة غلط |
|---|---|---|
| [[OrderStatus::from($v)]] | القيمة → الحالة | [[ValueError]] |
| [[OrderStatus::tryFrom($v)]] | القيمة → الحالة | [[null]] |
| [[$s->value]] | القيمة اللي في القاعدة | |
| [[$s->name]] | اسم الحالة في الكود | |
| [[OrderStatus::cases()]] | كل الحالات | |
| [[$s === OrderStatus::Paid]] | المقارنة الصح | |`,
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
          sol: R`بعد ما تضيف [[Cancelled]] من غير ما تعدّل [[match]]: الكود شغال عادي لحد ما حد ينادي [[OrderStatus::Cancelled->label()]]، ساعتها [[Fatal error: Uncaught UnhandledMatchError: Unhandled match case OrderStatus::Cancelled]] (PHP 8.4 بيكتب اسم الحالة نفسها) والـ stack trace بيشاور على [[label()]]. أدوات زي PHPStan بتمسكها قبل ما تشغّل.

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
          teach: R`## المثال بيعمل إيه؟

كلاس [[User]] فيه ٣ properties بـ ٣ سلوكيات: [[id]] الكل يقراه والكلاس بس يكتبه، و [[email]] بيتنضّف لوحده مع كل تخصيص، و [[displayName]] مش متخزن أصلًا وبيتحسب كل ما تقراه. الكود ده كله PHP 8.4، واتشغّل جوه Docker على [[php:8.4-cli]].

---

## ١. asymmetric visibility: [[public private(set)]]

~~~php
class User {
    public private(set) int $id;
~~~

كلمتين visibility بدل واحدة:

| الحتة | بتتحكم في | معناها |
|---|---|---|
| [[public]] | القراية | أي حد يقرا [[$u->id]] |
| [[private(set)]] | الكتابة | الكلاس نفسه بس يكتب |
| [[int $id]] | النوع والاسم | من غير قيمة افتراضية: بيتملي في الـ constructor |

جربنا الكتابة من برّه [[$u->id = 5;]]:

~~~text الناتج
Cannot modify private(set) property User::$id from global scope
~~~

[[global scope]] يعني «من كود برّه أي كلاس». والفرق عن [[readonly]]: الكلاس يقدر يغيّر [[$id]] تاني بعدين لو احتاج.

---

## ٢. [[set]] hook: تنضيف مع كل تخصيص

~~~php
    public string $email {
        set => strtolower(trim($value));
    }
~~~

بدل [[;]] بعد اسم الـ property فيه أقواس [[{ }]] جواها hook:

- [[set]]: كود بيشتغل كل ما حد يكتب في [[$email]].
- [[$value]]: متغير جاهز فيه القيمة اللي اتبعتت.
- [[=>]] الشكل القصير: ناتج التعبير هو اللي بيتخزن.
- [[trim]]: بيشيل المسافات من الأول والآخر.
- [[strtolower]]: بيصغّر الحروف (to lower case).

يعني [['  Sara@Example.com ']] بتتخزن [['sara@example.com']].

---

## ٣. [[get]] hook: property محسوبة (virtual)

~~~php
    public string $displayName {
        get => $this->name !== '' ? $this->name : strstr($this->email, '@', true);
    }
~~~

مفيش [[set]] هنا، والـ [[get]] مبيقراش [[$this->displayName]] نفسها، فـ PHP مبيحجزلهاش مكان خالص: كل ما تقرا [[$u->displayName]] الكود ده بيشتغل.

من جوه لبرة:

1. [[$this->name !== '']]: الاسم مش فاضي؟
2. [[? $this->name]]: لو آه، رجّع الاسم.
3. [[: strstr($this->email, '@', true)]]: لو لأ، اللي قبل [[@]] في الإيميل. ([[? :]] ده الـ ternary: شرط ؟ لو صح : لو غلط.)

[[strstr]] بيدوّر على حرف في نص. من غير التالت بيرجّع من الحرف للآخر، و [[true]] بيرجّع اللي **قبله**:

~~~text الناتج
strstr('sara@example.com', '@')        → @example.com
strstr('sara@example.com', '@', true)  → sara
~~~

جربنا الكتابة فيها [[$u->displayName = 'x';]]:

~~~text الناتج
Property User::$displayName is read-only
~~~

---

## ٤. الـ constructor

~~~php
    public function __construct(int $id, string $email, public string $name = '') {
        $this->id = $id;
        $this->email = $email;
    }
}
~~~

- [[public string $name = '']] promoted (درس [[class]])، والباقي parameters عادية.
- [[$this->id = $id]] مسموح، لأننا جوه الكلاس.
- [[$this->email = $email]] الـ [[set]] hook بيشتغل هنا كمان، مش من برّه بس.

---

## ٥. التشغيل

~~~php
$u = new User(1, '  Sara@Example.com ');
echo $u->email, ' / ', $u->displayName;
~~~

~~~text الناتج
sara@example.com / sara
~~~

الإيميل اتنضّف من أول ما الـ object اتعمل، و [[displayName]] رجع [[sara]] لأن مفيش اسم. ومع اسم [[new User(2, 'x@y.com', 'Omar')]] طلع [[Omar]].

و [[var_dump($u)]] بيأكد إن [[displayName]] مش متخزنة:

~~~text الناتج
object(User)#1 (3) {
  ["id"]=>
  int(1)
  ["email"]=>
  string(16) "sara@example.com"
  ["name"]=>
  string(0) ""
}
~~~

٣ properties بس، و [[16]] طول النص بالحروف.

وتخصيص من برّه: [[$u->email = ' ALI@EXAMPLE.COM';]]:

~~~text الناتج
ali@example.com / ali
~~~

---

## ٦. hooks مع [[readonly]] ممنوع

~~~php
class A { public readonly string $e { set => strtolower($value); } }
~~~

~~~text الناتج
Fatal error: Hooked properties cannot be readonly in /app/ph2.php on line 2
~~~

لو عايز «يتكتب جوه بس»، استخدم [[private(set)]] بداله.

---

## الخلاصة

| الشكل | بيعمل إيه | الكتابة من برّه |
|---|---|---|
| [[public private(set) int $id]] | قراية للكل، كتابة للكلاس | [[Cannot modify private(set) property]] |
| [[{ set => ...; }]] | القيمة بتتعدّل قبل ما تتخزن، من جوه ومن برّه | مسموحة وبتتنضّف |
| [[{ get => ...; }]] لوحده | محسوبة ومش متخزنة | [[is read-only]] |
| hooks + [[readonly]] | ممنوع | |

وكل ده محتاج PHP 8.4: على 8.3 الملف كله Parse error (ده من الـ docs).`,
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
composer config platform.php 8.3
composer require phpmailer/phpmailer
composer require --dev phpunit/phpunit
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
          teach: R`## المثال بيعمل إيه؟

٩ أوامر هي دورة حياة المكتبات في أي مشروع PHP: تعمل ملف المشروع، تقول نسخة PHP على السيرفر، تسطّب مكتبة ومكتبة تطوير، وبعدين تسطّب على السيرفر، وتحدّث، وتدوّر على نسخ أحدث وثغرات. كله اتشغّل جوه Docker على الصورة الرسمية [[composer:2]] (Composer 2.10.3 وجواها PHP 8.5).

> هتلاقي مع أغلب الأوامر سطر [[Composer could not detect the root package (ali/demo) version, defaulting to '1.0.0']]. ده تنبيه عادي لمشروع لسه مفيهوش git، تجاهله.

---

## ١. [[composer init]]

بيسألك أسئلة (اسم المشروع، الوصف، المؤلف...) ويكتب [[composer.json]]. شغّلناه بـ [[--no-interaction --name ali/demo]] عشان ياخد الافتراضي من غير أسئلة:

~~~text الناتج
Writing ./composer.json
~~~

~~~text composer.json
{
    "name": "ali/demo",
    "require": {}
}
~~~

[[ali/demo]] اسم المشروع بصيغة [[vendor/package]]: صاحبه / اسمه. ونفس الصيغة لكل مكتبة: [[phpmailer/phpmailer]].

---

## ٢. [[composer config platform.php 8.3]]

بيكتب في [[composer.json]]:

~~~text composer.json (جزء)
"config": {
    "platform": {
        "php": "8.3"
    }
}
~~~

يعني: «وانت بتختار نسخ المكتبات، اعتبر إن PHP نسخته 8.3» حتى لو جهازك أحدث. ولازم يتعمل **قبل** أي [[require]]. جربنا الترتيب العكسي (سطّبنا PHPUnit الأول وبعدين حطينا platform): Composer كان اختار PHPUnit 13.4.1 اللي محتاج PHP 8.4، وبعدها [[composer update]] رفض:

~~~text الناتج (الترتيب الغلط)
phpunit/phpunit 13.4.1 requires php >=8.4.1 -> your php version (8.3; overridden via config.platform, actual: 8.5.11) does not satisfy that requirement.
~~~

---

## ٣. [[composer require phpmailer/phpmailer]]

~~~text الناتج
./composer.json has been updated
Running composer update phpmailer/phpmailer
Loading composer repositories with package information
Updating dependencies
Lock file operations: 1 install, 0 updates, 0 removals
  - Locking phpmailer/phpmailer (v7.1.1)
Writing lock file
Installing dependencies from lock file (including require-dev)
Package operations: 1 install, 0 updates, 0 removals
  - Downloading phpmailer/phpmailer (v7.1.1)
  - Installing phpmailer/phpmailer (v7.1.1): Extracting archive
Generating autoload files
No security vulnerability advisories found.
Using version ^7.1 for phpmailer/phpmailer
~~~

السطور بالترتيب:

| السطر | معناه |
|---|---|
| [[composer.json has been updated]] | ضاف المكتبة في [[require]] |
| [[Loading composer repositories]] | بيسأل Packagist (مخزن مكتبات PHP، زي npm registry) |
| [[Locking ... (v7.1.1)]] | قرر النسخة وكتبها في [[composer.lock]] |
| [[Installing ...]] | نزّلها وفكّها في [[vendor/phpmailer/phpmailer]] |
| [[Generating autoload files]] | عمل [[vendor/autoload.php]] (درس PSR-4) |
| [[No security vulnerability advisories found]] | فحص الثغرات لوحده بعد التسطيب |
| [[Using version ^7.1]] | القيد اللي اتكتب في composer.json |

### [[^7.1]] يعني إيه؟

الـ [[^]] (caret) معناها «أي نسخة من 7.1 وطالع بس من غير ما توصل 8»: 7.1.1 و 7.2 و 7.9 مسموحين، و 8.0 لأ. لأن النسخة الكبيرة (أول رقم) هي اللي بتكسر الكود القديم.

و [[composer.lock]] فيه النسخة بالظبط:

~~~text composer.lock (جزء)
"name": "phpmailer/phpmailer",
"version": "v7.1.1",
~~~

يعني [[composer.json]] = المسموح، و [[composer.lock]] = اللي اتسطّب فعلًا.

---

## ٤. [[composer require --dev phpunit/phpunit]]

[[--dev]] بيكتبها في قسم تاني [[require-dev]]: مكتبات للتطوير بس (هنا PHPUnit للاختبارات). وهنا [[platform.php]] اشتغلت:

~~~text الناتج
Cannot use phpunit/phpunit's latest version 13.4.1 as it requires php >=8.4.1 which is not satisfied by your platform.
...
Lock file operations: 25 installs, 0 updates, 0 removals
  - Locking phpunit/phpunit (12.5.38)
...
Using version ^12.5 for phpunit/phpunit
~~~

اختار 12.5.38 اللي شغالة على 8.3. و [[25 installs]] لأن PHPUnit نفسه محتاج ٢٤ مكتبة تانية (اسمها transitive dependencies)، وكلهم اتسجلوا في الـ lock.

---

## ٥. [[composer install]]

مسحنا [[vendor/]] من الجهاز وشغّلناه:

~~~text الناتج
Installing dependencies from lock file (including require-dev)
Verifying lock file contents can be installed on current platform.
Package operations: 26 installs, 0 updates, 0 removals
  - Installing phpmailer/phpmailer (v7.1.1): Extracting archive
  - Installing phpunit/phpunit (12.5.38): Extracting archive
...
~~~

[[from lock file]]: [[install]] مبيسألش عن نسخ جديدة، بيسطّب اللي في الـ lock بالحرف. عشان كده [[vendor/]] مبيترفعش على git: أي حد يعمل clone ويشغّل [[composer install]] ياخد نفس النسخ بالظبط. و ٢٦ = phpmailer + phpunit + الـ ٢٤ بتوعه.

---

## ٦. [[composer install --no-dev --optimize-autoloader]]

ده أمر السيرفر:

~~~text الناتج
Installing dependencies from lock file
Package operations: 0 installs, 0 updates, 25 removals
Generating optimized autoload files
~~~

- [[--no-dev]]: من غير [[require-dev]]، فشال الـ ٢٥ بتوع PHPUnit وفضل [[vendor/phpmailer]] بس.
- [[--optimize-autoloader]] (أو [[-o]]): [[optimized autoload files]] يعني عمل classmap: لستة جاهزة «الكلاس ده في الملف ده» بدل ما يدوّر كل مرة.

---

## ٧. [[composer update phpmailer/phpmailer]]

[[update]] عكس [[install]]: بيتجاهل الـ lock ويدوّر على أحدث نسخة تناسب [[^7.1]]، ويكتب lock جديد. واسم المكتبة بيحدده عليها بس. هنا مكانش فيه أحدث:

~~~text الناتج
Updating dependencies
Nothing to modify in lock file
Installing dependencies from lock file (including require-dev)
Package operations: 25 installs, 0 updates, 0 removals
~~~

لاحظ إنه رجّع الـ ٢٥ بتوع PHPUnit: [[update]] بيسطّب الـ dev كمان افتراضيًا. عشان كده [[update]] مكانه جهازك، و [[install --no-dev]] مكانه السيرفر.

---

## ٨. [[composer outdated --direct]]

~~~text الناتج
All your direct dependencies are up to date
~~~

[[--direct]]: المكتبات اللي انت كاتبها في composer.json بس، مش الـ ٢٤ اللي تحت PHPUnit. وليه PHPUnit 13 مظهرش كنسخة أحدث؟ لأن [[platform.php]] بتقول 8.3، فـ 13 مش متاحة أصلًا للمشروع ده.

---

## ٩. [[composer audit]]

~~~text الناتج
No security vulnerability advisories found.
~~~

بيقارن كل نسخة في الـ lock بقاعدة الثغرات المعروفة. ولو لقى حاجة بيطبع اسم المكتبة والثغرة وبيخرج بكود غير صفر، فينفع يتحط في CI يوقف الـ deploy.

---

## الخلاصة

| الأمر | بيقرا | بيكتب | فين |
|---|---|---|---|
| [[require]] | Packagist | json + lock + vendor | جهازك |
| [[install]] | lock | vendor | أي مكان |
| [[install --no-dev -o]] | lock | vendor من غير dev | السيرفر |
| [[update]] | Packagist + قيود json | lock + vendor | جهازك |
| [[config platform.php]] | | json | أول المشروع |

و git: [[composer.json]] و [[composer.lock]] آه، و [[vendor/]] لأ.`,
          lines: [
            "اعمل composer.json بأسئلة.",
            "افترض نسخة PHP بتاعة السيرفر (قبل أي require، عشان النسخ تتختار على أساسها).",
            "سطّب مكتبة وضيفها للمشروع.",
            "مكتبة للتطوير بس.",
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
          teach: R`## المثال بيعمل إيه؟

المثال ٣ ملفات في صندوق واحد: [[composer.json]] بيقول «الكلاسات اللي اسمها بيبدأ بـ [[App\]] موجودة في [[src/]]»، وملف كلاس في المكان الصح، وملف دخول بيعمل [[require]] واحد بس ويستخدم الكلاس. الـ [[composer dump-autoload]] اتشغّل في صورة [[composer:2]]، و [[public/index.php]] على [[php:8.4-cli]]، جوه Docker.

---

## ١. [[composer.json]]: القاعدة

~~~text composer.json
{
  "autoload": {
    "psr-4": { "App\\": "src/" },
    "files": ["src/helpers.php"]
  }
}
~~~

| الحتة | معناها |
|---|---|
| [["autoload"]] | إعدادات تحميل الكلاسات بتاعة مشروعك انت (مش المكتبات) |
| [["psr-4"]] | PSR-4 قاعدة متفق عليها (PSR = PHP Standards Recommendation) بتربط الـ namespace بالفولدر |
| [["App\\": "src/"]] | الـ namespace [[App\]] = فولدر [[src/]]. الـ [[\\]] لأن [[\]] في JSON لازم تتكتب مرتين |
| [["files"]] | ملفات بتتحمّل مع كل طلب، للدوال العادية (الدوال مبتتحمّلش بالـ autoload، الكلاسات بس) |

وبعدها:

~~~bash
composer dump-autoload
~~~

~~~text الناتج
Generating autoload files
Generated autoload files
~~~

بيكتب فولدر [[vendor/composer/]]، وجواه مثلًا [[autoload_psr4.php]] فيه القاعدة دي بالظبط:

~~~text vendor/composer/autoload_psr4.php (جزء)
return array(
    'App\\' => array($baseDir . '/src'),
);
~~~

---

## ٢. ملف الكلاس

~~~php
// src/Controllers/PostController.php
<?php
namespace App\Controllers;
use App\Models\PostRepository;
final class PostController { }
~~~

- السطر الأول تعليق بيقول اسم الملف ومكانه، مش جزء من الكود.
- [[namespace App\Controllers;]]: «الكلاسات اللي في الملف ده اسمها الكامل بيبدأ بـ [[App\Controllers\]]». الـ namespace زي الفولدر للأسامي، عشان كلاسين اسمهم [[User]] من مكتبتين ميتخانقوش.
- [[use App\Models\PostRepository;]]: اختصار: من هنا ورايح اكتب [[PostRepository]] بدل الاسم الطويل. **مبيحمّلش** الملف.
- [[final class PostController]]: اسم الكلاس لازم يطابق اسم الملف بالحرف.

### إزاي الاسم بيتحوّل لمسار؟

~~~text
App\Controllers\PostController
App\  →  src/                        (من القاعدة)
Controllers\PostController  →  Controllers/PostController.php
النتيجة: src/Controllers/PostController.php
~~~

---

## ٣. ملف الدخول

~~~php
// public/index.php
<?php
require dirname(__DIR__) . '/vendor/autoload.php';
$controller = new App\Controllers\PostController();
~~~

- [[__DIR__]]: فولدر الملف الحالي ([[/app/public]]).
- [[dirname(...)]]: الفولدر اللي فوقه ([[/app]]).
- [[. '/vendor/autoload.php']]: لزق المسار، فيبقى [[/app/vendor/autoload.php]]. ده الـ [[require]] الوحيد في المشروع كله.
- [[new App\Controllers\PostController()]]: أول ما PHP يشوف كلاس مش متعرّف، بيسأل الـ autoloader، فيحمّل الملف ويكمّل.

ضيفنا للتجربة [[var_dump($controller)]] و [[get_included_files()]] (لستة كل الملفات اللي اتحمّلت):

~~~text الناتج
object(App\Controllers\PostController)#2 (0) {
}
Array
(
    [0] => public/index.php
    [1] => vendor/autoload.php
    [2] => vendor/composer/autoload_real.php
    [3] => vendor/composer/ClassLoader.php
    [4] => vendor/composer/autoload_static.php
    [5] => src/helpers.php
    [6] => src/Controllers/PostController.php
)
~~~

لاحظ ٣ حاجات:

1. [[src/helpers.php]] اتحمّل لوحده من قسم [["files"]]، قبل أي حاجة تانية.
2. [[PostController.php]] اتحمّل بس لما استخدمناه.
3. [[PostRepository]] **مش** في اللستة: [[use]] مبيحمّلش، والكلاس عمره ما اتستخدم.

---

## ٤. حالة الحروف: بيشتغل عندك ويقع على السيرفر

غيّرنا اسم الملف لـ [[postController.php]] (p صغيرة) على نظام ملفات Linux جوه الـ container:

~~~text الناتج
Fatal error: Uncaught Error: Class "App\Controllers\PostController" not found in /p/public/index.php:3
~~~

الـ autoloader بيدوّر على [[PostController.php]] بالحرف، و Linux بيعتبر [[P]] و [[p]] اسمين مختلفين. أما Windows و macOS فنظام الملفات افتراضيًا مش بيفرّق، فالملف هيتلاقي عندك (ده من الـ docs، Windows مفيهوش PHP هنا نجرب عليه). يعني الغلطة مبتظهرش غير بعد الـ deploy.

والحل يمسكها بدري: [[composer dump-autoload -o]] بيفحص كل ملف:

~~~text الناتج
Generating optimized autoload files
Class App\Controllers\PostController located in ./src/Controllers/postController.php does not comply with psr-4 autoloading standard (rule: App\ => ./src). Skipping.
Generated optimized autoload files containing 1 classes
~~~

[[Skipping]]: مدخلوش الـ classmap. حط الأمر ده في CI.

---

## ٥. كلاسات PHP نفسها جوه namespace

~~~php
namespace App\Controllers;
echo strlen('abc'), "\n";
echo (new \DateTime('2026-01-01'))->format('Y'), "\n";
new DateTime();
~~~

~~~text الناتج
3
2026

Fatal error: Uncaught Error: Class "App\Controllers\DateTime" not found in /p/dt.php:5
~~~

جوه namespace، أي كلاس من غير [[\]] في أوله بيتدوّر عليه **جوه الـ namespace ده**. [[\DateTime]] بالشرطة معناها «من البداية» (الـ global namespace). أما الدوال زي [[strlen]] فلو ملقتهاش في الـ namespace بترجع للعامة لوحدها.

---

## الخلاصة

| الحاجة | بتعمل إيه |
|---|---|
| [["psr-4": {"App\\": "src/"}]] | [[App\X\Y]] → [[src/X/Y.php]] |
| [["files"]] | ملفات دوال بتتحمّل دايمًا |
| [[composer dump-autoload]] | بعد أي تغيير في قسم [[autoload]] |
| [[-o]] | classmap أسرع + تحذير للملفات المخالفة |
| [[require .../vendor/autoload.php]] | الـ require الوحيد |
| [[use]] | اختصار اسم، مبيحمّلش |
| [[\DateTime]] | كلاسات PHP جوه namespace محتاجة [[\]] أو [[use DateTime;]] |`,
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
          teach: R`## المثال بيعمل إيه؟

ده [[public/index.php]]: الملف الوحيد اللي الطلبات بتوصله. فيه لستة routes (method + شكل المسار + دالة)، وبيلف عليها لحد ما يلاقي واحد مطابق وينفّذه، ولو مفيش يرجّع 404. جربناه بـ [[php -S]] جوه Docker على [[php:8.4-cli]] (port 5910 على الجهاز)، ومعاه [[PostController]] صغير فيه [[index]] و [[show]] و [[store]] بيرجّعوا نص، و [[public/style.css]].

---

## ١. أول سطر: للسيرفر المدمج بس

~~~php
if (PHP_SAPI === 'cli-server' && is_file(__DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH))) return false;
~~~

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[$_SERVER['REQUEST_URI']]] | الرابط اللي اتطلب، زي [[/style.css]] أو [[/posts/7?x=1]] |
| [[parse_url(..., PHP_URL_PATH)]] | خد المسار بس من غير [[?x=1]] |
| [[__DIR__ . ...]] | لزقه على فولدر [[public]]: [[/app/public/style.css]] |
| [[is_file(...)]] | الملف ده موجود فعلًا؟ |
| [[PHP_SAPI === 'cli-server']] | احنا شغالين على [[php -S]]؟ (SAPI = Server API، طريقة تشغيل PHP) |
| [[return false]] | قول للسيرفر المدمج «ابعت الملف زي ما هو» |

ليه؟ لما [[php -S]] بياخد ملف router في آخره، **كل** الطلبات بتروحله حتى الـ CSS. شلنا السطر ده وطلبنا [[/style.css]]:

~~~text الناتج (من غير أول سطر)
HTTP/1.1 404 Not Found

الصفحة مش موجودة
~~~

ومعاه:

~~~text الناتج
HTTP/1.1 200 OK
Content-Type: text/css; charset=UTF-8

body { color: red; }
~~~

على Apache أو Nginx السطر ده مبيعملش حاجة: [[.htaccess]] أو [[try_files]] بيخدموا الملفات قبل ما توصل PHP.

---

## ٢. الـ autoload والاختصار

~~~php
require dirname(__DIR__) . '/vendor/autoload.php';
use App\Controllers\PostController;
~~~

نفس درس PSR-4: [[require]] واحد، و [[use]] عشان نكتب [[PostController]] بس.

---

## ٣. جدول الـ routes

~~~php
$routes = [
    ['GET',  '#^/$#',            fn() => (new PostController())->index()],
    ['GET',  '#^/posts/(\d+)$#', fn($id) => (new PostController())->show((int) $id)],
    ['POST', '#^/posts$#',       fn() => (new PostController())->store()],
];
~~~

كل route array من ٣ حاجات:

1. الـ method: [['GET']] للفتح، [['POST']] للفورم.
2. regex للمسار:
  - [[#]] في الأول والآخر: حدود الـ regex (بدل [[/]] عشان المسار نفسه فيه [[/]]).
  - [[^]] بداية النص و [[$]] آخره: المسار كله لازم يطابق، مش جزء منه.
  - [[(\d+)]]: [[\d]] رقم، و [[+]] واحد أو أكتر، والقوسين معناهم «امسك الجزء ده».
3. الدالة: [[fn() => ...]] arrow function (دالة في سطر). [[(new PostController())->index()]] يعمل object وينادي method.

و [[(int) $id]] لأن أي حاجة بتتمسك من الـ regex نص.

---

## ٤. المسار الحالي

~~~php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
~~~

[[/posts/7?x=1]] → [[/posts/7]]، فالـ query string ميبوظش المطابقة. جربناها: [[/posts/7?x=1]] طلّعت [[بوست رقم 7]].

---

## ٥. اللفة

~~~php
foreach ($routes as [$method, $pattern, $action]) {
    if ($_SERVER['REQUEST_METHOD'] === $method && preg_match($pattern, $path, $m)) {
        echo $action(...array_slice($m, 1));
        exit;
    }
}
~~~

- [[as [$method, $pattern, $action]]]: كل route بيتفك لـ ٣ متغيرات (array destructuring).
- [[$_SERVER['REQUEST_METHOD']]]: [[GET]] أو [[POST]]...
- [[preg_match($pattern, $path, $m)]]: بيرجّع [[1]] لو طابق، ويحط التطابقات في [[$m]].

جربنا [[preg_match('#^/posts/(\d+)$#', '/posts/42', $m)]]:

~~~text الناتج
$m                  → [0 => '/posts/42', 1 => '42']
array_slice($m, 1)  → [0 => '42']
~~~

[[$m[0]]] التطابق كله، و [[$m[1]]] اللي بين القوسين. [[array_slice($m, 1)]] بيشيل الأول، و [[...]] (spread) بيبعت كل عنصر كـ argument، فـ [[$action('42')]]. وبعدها [[exit]] عشان ميكمّلش.

---

## ٦. مفيش route

~~~php
http_response_code(404);
echo 'الصفحة مش موجودة';
~~~

[[http_response_code(404)]] بيغيّر رقم الحالة اللي بيرجع للمتصفح (الافتراضي 200).

---

## ٧. النتايج

| الطلب | الرد | ليه |
|---|---|---|
| [[GET /]] | 200 [[كل البوستات]] | أول route |
| [[GET /posts/1]] | 200 [[بوست رقم 1]] | [[(\d+)]] مسك [[1]] |
| [[GET /posts/abc]] | 404 [[الصفحة مش موجودة]] | [[abc]] مش أرقام |
| [[GET /style.css]] | 200 الملف نفسه | أول سطر رجّع [[false]] |
| [[POST /posts]] | 200 [[اتعمل بوست]] | route الـ POST |
| [[GET /posts]] | 404 | المسار ده متعرّف لـ POST بس |

---

## ٨. route جديد [[/about]]

~~~php
    ['GET',  '#^/about$#',       fn() => 'صفحة عن الموقع'],
~~~

[[/about]] رجّعت [[صفحة عن الموقع]]، و [[/about-us]] رجّعت 404 بفضل [[$]]. ولو شلت [[^]] و [[$]] الـ regex بيدوّر على أي جزء: جربنا [[preg_match('#/posts/(\d+)#', '/posts/1/delete')]] ورجّعت [[1]] (طابق غلط).

---

## الخلاصة

| الجزء | دوره |
|---|---|
| أول سطر | [[php -S]] بس: الملفات الموجودة تتخدم زي ما هي |
| [[$routes]] | method + regex + دالة لكل صفحة |
| [[parse_url]] | المسار من غير query string |
| [[preg_match]] + [[array_slice]] + [[...]] | الأجزاء اللي اتمسكت تبقى arguments |
| [[http_response_code(404)]] | لو مفيش route |

والتشغيل: [[php -S localhost:8000 -t public public/index.php]]: [[-t public]] جذر الموقع، والملف الأخير هو الـ router.`,
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
          teach: R`## المثال بيعمل إيه؟

ملفين: controller بيجيب بوست من الـ Model ويرجّع HTML من الـ View، ودالة [[view()]] بتحوّل ملف قالب لنص. عشان نشغّله عملنا مشروع صغير كامل: [[PostRepository]] بـ PDO على SQLite، و [[views/posts/show.php]]، و [[App\NotFound]]، والـ router من الدرس اللي فات. اتشغّل جوه Docker على [[php:8.4-cli]] (السيرفر على port 5911).

---

## ١. الـ controller

~~~php
namespace App\Controllers;
use App\Models\PostRepository;
final class PostController {
    public function __construct(private PostRepository $posts = new PostRepository()) {}
~~~

- [[private PostRepository $posts]]: constructor promotion (درس [[class]])، و [[private]] يعني الكلاس بس يشوفه.
- [[= new PostRepository()]]: قيمة افتراضية فيها [[new]] (مسموح من PHP 8.1). يعني [[new PostController()]] من غير arguments بيستخدم الـ repository الحقيقي، و [[new PostController($fake)]] بيستخدم اللي انت بعته. ده dependency injection.
- [[{}]] فاضية: الـ promotion عمل كل الشغل.

~~~php
    public function show(int $id): string {
        $post = $this->posts->find($id) ?? throw new \App\NotFound();
        return view('posts/show', ['post' => $post]);
    }
}
~~~

| الحتة | معناها |
|---|---|
| [[$this->posts->find($id)]] | اسأل الـ Model: البوست ده موجود؟ بيرجّع array أو [[null]] |
| [[?? throw ...]] | لو [[null]]، ارمي exception. ([[throw]] بقى ينفع جوه تعبير من PHP 8) |
| [[\App\NotFound]] | الـ [[\]] في الأول: الاسم من البداية، مش [[App\Controllers\App\NotFound]] |
| [[view('posts/show', [...])]] | اعرض القالب ده، وابعتله متغير اسمه [[post]] |

الـ controller مفيهوش SQL ولا HTML: بيسأل ويختار بس.

---

## ٢. الـ Model (من الـ solCode)

~~~php
class PostRepository {
    public function find(int $id): ?array {
        $stmt = db()->prepare('SELECT id, title FROM posts WHERE id = :id');
        $stmt->execute(['id' => $id]);
        return $stmt->fetch() ?: null;
    }
}
~~~

- [[db()]] دالة في [[helpers.php]] بترجّع object PDO واحد (عندنا SQLite، وفي MySQL نفس الكود).
- [[prepare]] + [[:id]] + [[execute]]: prepared statement، القيمة منفصلة عن الـ SQL (درس [[prepare / execute]]).
- [[fetch()]] بيرجّع الصف أو [[false]] لو مفيش. و [[?: null]] بيحوّل [[false]] لـ [[null]] عشان النوع [[?array]].

---

## ٣. [[view()]]: القالب يبقى نص

~~~php
function view(string $name, array $data = []): string {
    extract($data);
    ob_start();
    require dirname(__DIR__) . "/views/$name.php";
    return ob_get_clean();
}
~~~

خطوة خطوة:

1. [[extract($data)]]: كل key في الـ array يبقى متغير. الـ key [[post]] → المتغير [[$post]]. جربناه (بـ array فيها key اسمه [[post]] وقيمته array فيها [[title]]، وبعدين [[var_dump($post)]]):

~~~text الناتج
array(1) {
  ["title"]=>
  string(1) "x"
}
~~~

2. [[ob_start()]]: ob = output buffering. من دلوقتي أي [[echo]] أو HTML بيتحجز في الذاكرة بدل ما يروح للمتصفح.
3. [[require ".../views/$name.php"]]: يشغّل القالب، وطباعته كلها بتتحجز. [[$name]] جوه نص بـ [["..."]] بيتبدّل بقيمته: [[views/posts/show.php]]. والقالب بيشوف [[$post]] لأن [[require]] جوه دالة بيشتغل في نفس الـ scope بتاعها.
4. [[ob_get_clean()]]: رجّع اللي اتحجز كنص، وقفل الـ buffer.

جربنا الفكرة لوحدها: [[ob_start(); echo "<p>hi</p>"; $x = ob_get_clean(); echo strtoupper($x);]]:

~~~text الناتج
<P>HI</P>
~~~

الطباعة اتمسكت في [[$x]] واتعدّلت قبل ما تطلع.

---

## ٤. الـ View

~~~php
<h1><?= e($post['title']) ?></h1>
~~~

[[<?=]] اختصار [[<?php echo]]، و [[e()]] هي [[htmlspecialchars]] (درس [[htmlspecialchars]]). القالب بيطبع بس.

---

## ٥. التشغيل

حطينا في القاعدة بوست عنوانه [[أول بوست <b>عريض</b>]] وطلبنا [[/posts/1]]:

~~~text الناتج
HTTP/1.1 200 OK
Content-type: text/html; charset=UTF-8

<h1>أول بوست &lt;b&gt;عريض&lt;/b&gt;</h1>
~~~

الرحلة: router → [[PostController::show(1)]] → [[PostRepository::find(1)]] → [[view('posts/show')]] → النص ده. و [[<b>]] اتحوّلت [[&lt;b&gt;]] فبتظهر كنص مش كـ bold.

و [[/posts/999]] مع الـ [[try / catch (App\NotFound)]] اللي في الـ solCode:

~~~text الناتج
HTTP/1.1 404 Not Found

مش موجود
~~~

ومن غير [[catch]]، مع [[display_errors=0]]:

~~~text الناتج
HTTP/1.0 500 Internal Server Error
~~~

---

## ٦. الاختبار من غير قاعدة

~~~php
final class FakePostRepository extends PostRepository {
    public function __construct(private array $rows) {}
    public function find(int $id): ?array { return $this->rows[$id] ?? null; }
}
$c = new PostController(new FakePostRepository([1 => ['id' => 1, 'title' => '<b>تجربة</b>']]));
assert($c->show(1) === "<h1>&lt;b&gt;تجربة&lt;/b&gt;</h1>\n");
try { $c->show(2); assert(false); } catch (App\NotFound) {}
echo "OK: 2 اختبارات عدّوا\n";
~~~

- [[FakePostRepository]] بيورث من الحقيقي ويكتب فوق [[find]]: بيدوّر في array بدل القاعدة. عشان كده [[PostRepository]] في الـ solCode مش [[final]].
- [[assert(شرط)]]: لو الشرط false بيرمي [[AssertionError]]. وبيشتغل بس لو [[zend.assertions=1]]، عشان كده الأمر [[php -d zend.assertions=1 tests/PostControllerTest.php]] ([[-d]] بيغيّر إعداد ini للتشغيل ده بس).
- [[\n]] في آخر النص المتوقع: ملف القالب بيخلص بسطر جديد بعد [[</h1>]].
- [[catch (App\NotFound) {}]]: من PHP 8 ينفع [[catch]] من غير متغير. ولو [[show(2)]] مرماش، [[assert(false)]] هيفشل الاختبار.

~~~text الناتج
OK: 2 اختبارات عدّوا
~~~

---

## الخلاصة

| الجزء | الملف | بيعمل إيه | ممنوع فيه |
|---|---|---|---|
| Model | [[src/Models/PostRepository.php]] | SQL و PDO | HTML |
| View | [[views/posts/show.php]] | طباعة بـ [[e()]] | SQL وقرارات |
| Controller | [[src/Controllers/PostController.php]] | يسأل الـ Model ويختار الـ View | SQL و [[echo]] |
| [[view()]] | [[src/helpers.php]] | [[extract]] + [[ob_start]] + [[require]] + [[ob_get_clean]] | [[extract($_POST)]] |`,
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
          sol: R`[[/posts/1]] بيطلّع [[<h1>أول بوست &lt;b&gt;عريض&lt;/b&gt;</h1>]]: العنوان من القاعدة ومتأمّن بـ [[e()]]. و [[/posts/999]] من غير ما تمسك [[NotFound]] بيطلع 500 مع [[display_errors=0]] (زي الإنتاج)، ومع [[display_errors]] مفتوح (التطوير) بيطلع 200 ونص [[Fatal error: Uncaught App\NotFound]] في الصفحة، لأن طباعة الغلطة بتبعت الـ headers الأول. في الحالتين غلط، فامسكه في الـ router ورجّع 404.

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
          teach: R`## المثال بيعمل إيه؟

٧ أوامر بتدوّر في كل ملفات [[.php]] على أشكال كود معروف إنها خطر. كل أمر سؤال: «فين بنلزق متغير في SQL؟»، «فين بنطبع اللي المستخدم بعته من غير escape؟»... وهكذا. عشان نشوف الناتج بجد عملنا مشروع قديم صغير فيه الغلطات دي (login.php و admin/delete.php و admin/edit.php و config.php و cache.php)، وشغّلنا الـ grep جوه Docker على [[ubuntu:24.04]] (GNU grep)، و [[git ls-files]] في صورة فيها git. ونفس الأوامر شغالة في Git Bash على ويندوز (جربنا ٢ و ٦ فيه وطلّعوا نفس النتيجة).

---

## ١. الحاجات المشتركة في كل أمر

~~~bash
grep -rnE 'PATTERN' --include='*.php' .
~~~

| الحتة | معناها |
|---|---|
| [[grep]] | دوّر على نص جوه ملفات |
| [[-r]] | recursive: الفولدر ده وكل اللي جواه |
| [[-n]] | اطبع رقم السطر |
| [[-E]] | Extended regex: [[( )]] و [[|]] و [[?]] شغالين من غير [[\]] |
| [[--include='*.php']] | ملفات PHP بس |
| [[.]] | ابدأ من الفولدر الحالي |
| [[' ']] | الـ pattern بين علامات تنصيص مفردة عشان الـ shell ميلمسش [[$]] |

وجوه الـ regex: [[\$]] يعني علامة [[$]] نفسها (من غير [[\]] معناها «آخر السطر»)، و [[.*]] أي حاجة، و [[\s]] مسافة، و [[\b]] حدود كلمة، و [[\(]] قوس عادي.

كل سطر في الناتج شكله [[الملف:رقم السطر:السطر نفسه]].

---

## ٢. SQL injection

~~~bash
grep -rnE '(mysqli_query|->query)\(.*\$' --include='*.php' .
~~~

يعني: [[mysqli_query(]] أو [[->query(]]، وبعدها في نفس السطر [[$]] (متغير جوه الـ query).

~~~text الناتج
./admin/delete.php:2:$db->query('DELETE FROM posts WHERE id = ' . $_POST['id']);
./login.php:2:$r = mysqli_query($conn, "SELECT * FROM users WHERE email = '$_POST[email]'");
~~~

الاتنين بيلزقوا بيانات المستخدم في نص الـ SQL. و [[cache.php]] فيه [[$db->query('SELECT id FROM posts')]] ومطلعش، لأن مفيش [[$]] بعد القوس. والتصليح: [[prepare]] + [[execute]].

---

## ٣. XSS

~~~bash
grep -rnE 'echo\s+\$_(GET|POST|REQUEST|COOKIE)' --include='*.php' .
~~~

[[echo]] وبعدها مسافة وبعدها [[$_GET]] أو [[$_POST]] أو [[$_REQUEST]] أو [[$_COOKIE]] على طول:

~~~text الناتج
./login.php:4:echo $_GET['msg'];
~~~

[[?msg=<script>...</script>]] هيتنفّذ في متصفح أي حد يفتح اللينك. التصليح: [[echo e($_GET['msg'] ?? '');]].

---

## ٤. file inclusion

~~~bash
grep -rnE '(include|require)(_once)?\s*\(?\s*\$_' --include='*.php' .
~~~

من الشمال: [[include]] أو [[require]]، و [[(_once)?]] يعني [[_once]] ممكن تيجي أو لأ، و [[\s*\(?\s*]] مسافات وقوس اختياري، وبعدين [[$_]] (أول [[$_GET]] وأخواتها):

~~~text الناتج
./login.php:5:include $_GET['page'] . '.php';
~~~

[[?page=../../config]] يحمّل ملف إعداداتك. التصليح: allowlist بأسماء الصفحات.

---

## ٥. hashing ضعيف

~~~bash
grep -rnE '\b(md5|sha1)\(' --include='*.php' .
~~~

~~~text الناتج
./cache.php:2:$key = md5($url);
./login.php:3:$hash = md5($_POST['password']); $token = uniqid();
~~~

هنا أول false positive: [[md5($url)]] مفتاح cache، مش باسورد، فمفيهوش مشكلة. أما [[md5]] على باسورد فلازم [[password_hash]]. عشان كده كل سطر تقراه بعينك.

---

## ٦. عشوائية ضعيفة

~~~bash
grep -rnE '\b(uniqid|rand|mt_rand)\(' --include='*.php' .
~~~

~~~text الناتج
./cache.php:4:$code = mt_rand(1000, 9999);
./login.php:3:$hash = md5($_POST['password']); $token = uniqid();
~~~

[[uniqid()]] مبني على الوقت، و [[mt_rand]] ممكن يتخمّن. أي token أو كود تأكيد: [[bin2hex(random_bytes(32))]] أو [[random_int(1000, 9999)]].

---

## ٧. فورمات أدمن من غير CSRF

~~~bash
grep -rLE 'csrf' --include='*.php' admin/
~~~

[[-L]] (كبيرة) عكس العادي: اطبع أسماء الملفات اللي **مفيهاش** الكلمة خالص. ومفيش [[-n]] لأن مفيش سطر نطبعه.

~~~text الناتج
admin/delete.php
~~~

[[admin/edit.php]] فيه [[csrf_ok()]] فمطلعش.

---

## ٨. أسرار في git

~~~bash
git ls-files | grep -E 'config\.php$|\.env$'
~~~

[[git ls-files]] بيطبع كل الملفات اللي git بيتابعها، والـ [[|]] (pipe) بيبعتها لـ [[grep]]. و [[\.]] نقطة عادية، و [[$]] هنا آخر السطر (الاسم بيخلص بكده).

~~~text الناتج
config.php
~~~

يعني الباسورد اللي في [[config.php]] موجودة في تاريخ git. التصليح: [[.gitignore]] + [[git rm --cached config.php]]، و**غيّر السر نفسه** لأنه لسه في الـ commits القديمة.

---

## الخلاصة

| # | بيدوّر على | لقى | التصليح |
|---|---|---|---|
| ١ | متغير جوه query | login.php:2 و admin/delete.php:2 | [[prepare]] + [[execute]] |
| ٢ | [[echo $_GET]] | login.php:4 | [[e()]] |
| ٣ | [[include $_GET]] | login.php:5 | allowlist |
| ٤ | [[md5]] و [[sha1]] | login.php:3 (و cache.php:2 مش مشكلة) | [[password_hash]] |
| ٥ | [[uniqid]] و [[rand]] | login.php:3 و cache.php:4 | [[random_bytes]] و [[random_int]] |
| ٦ | ملفات أدمن من غير csrf | admin/delete.php | token في كل POST |
| ٧ | أسرار في git | config.php | [[git rm --cached]] وغيّر السر |

الـ grep بداية مش نهاية. جربنا ملف فيه الحالتين دول: [[$db->query($sql);]] طلع، بس اللزق نفسه في سطر [[$sql = "..." . $_GET["id"];]] اللي فوقه لازم تروحله بإيدك. و [[$db->query(]] والـ SQL في السطر اللي تحته مطلعش خالص، لأن grep بيشوف سطر سطر.`,
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

الـ grep بيطلّع false positives (مثلًا [[->query]] على نص ثابت مفيهوش input، أو [[md5]] لـ cache key مش باسورد)، فكل سطر اقراه بعينك. وغيابه مش ضمان: [[$db->query(]] والـ SQL في السطر اللي تحته مش هيظهر خالص، و [[$db->query($sql);]] بيظهر بس اللزق نفسه ([[$sql = "..." . $id;]]) في سطر تاني لازم تدوّر عليه، فدوّر كمان على [[\$sql\s*=.*\$_]] وافتح كل ملف فيه [[query]].`,
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
          try: R`شغّلها مرة من الترمنال [[php index.php]] (هتقول مقفول)، وبعدين [[php -S localhost:8000]] في نفس الفولدر (السيرفر المدمج بيتبع [[opcache.enable]] زي الويب، مش [[enable_cli]]؛ ولو طلّع «مش متسطّب» ضيف [[-d zend_extension=opcache]]) وافتح الصفحة كذا مرة: الـ hit rate بيطلع. وبعدين ارفعها على السيرفر، شوف الأرقام، وامسحها.`,
          flag: "script",
          deep: {
            why: "مشروع بـ Composer أو framework بيحمّل مئات الملفات في كل طلب. من غير OPcache كل طلب بيترجمهم من الأول، وده أغلب وقت الطلب في مشاريع كتير.",
            how: R`القيم الافتراضية: [[opcache.enable=1]] (للويب)، و [[opcache.enable_cli=0]] (عشان كده [[php index.php]] من الترمنال بيقولك مقفول، أما [[php -S]] فبيتبع [[opcache.enable]] زي الويب)، و [[memory_consumption=128]] ميجا، و [[max_accelerated_files=10000]]، و [[validate_timestamps=1]] مع [[revalidate_freq=2]]: كل ثانيتين بيبص على تاريخ الملف ولو اتغير يترجمه تاني.

مع [[validate_timestamps=0]] بيوفّر الفحص ده خالص، بس أي تعديل في الكود مش هيبان لحد ما تعمل [[sudo systemctl reload php8.4-fpm]] (الاسم حسب النسخة). و [[opcache_reset()]] من الترمنال مبيأثرش على FPM، لأن كل SAPI ليه ذاكرته.

لو الـ hit rate واطي أو الذاكرة مليانة: زوّد [[memory_consumption]] و [[max_accelerated_files]] (مشاريع Laravel الكبيرة بتعدّي 10000 ملف بسهولة).

JIT: من PHP 8.4 الافتراضي [[opcache.jit=disable]]. بيفيد الحسابات التقيلة، ونادرًا بيفرق في موقع أغلب وقته مستني القاعدة.

وباقي الأداء غالبًا مش في PHP: query من غير index، أو N+1، أو صور كبيرة. [[EXPLAIN]] على الـ queries البطيئة (تاب «SQL و Prisma»)، و cache للنتايج التقيلة (APCu أو Redis)، و [[composer install -o]].

على الاستضافة المشتركة OPcache في إيد الاستضافة، وغالبًا متفعّل. تشوفه من [[phpinfo()]] أو الصفحة دي.`,
            when: "مرة على كل سيرفر جديد تتأكد إنه شغال. وضبط [[validate_timestamps]] لما يكون عندك deploy script بيعمل reload.",
            mistakes: R`[[validate_timestamps=0]] من غير reload في الـ deploy: الكود الجديد اترفع والموقع شغال بالقديم، وتقعد ساعة تدوّر على bug مش موجود. وتسيب صفحة الحالة دي (أو [[phpinfo()]]) مرفوعة، وهي بتكشف إعدادات السيرفر.`
          },
          teach: R`## المثال بيعمل إيه؟

صفحة صغيرة بتسأل OPcache عن حالته وتطبع ٤ أرقام: كام ملف محفوظ مترجم، ونسبة الطلبات اللي لقت الملف جاهز، والذاكرة المستخدمة، وهل بيفحص تاريخ الملفات. اتشغّلت جوه Docker على [[php:8.4-cli]]، من الترمنال ومن [[php -S]] (port 5912).

---

## ١. OPcache بيوفّر إيه؟

كل طلب PHP من غير OPcache بيعدّي على ٣ خطوات:

| الخطوة | بتعمل إيه |
|---|---|
| ١. قراية | يقرا ملف [[.php]] من الديسك |
| ٢. ترجمة (compile) | يحوّل الكود لـ opcodes: تعليمات صغيرة جوه PHP |
| ٣. تنفيذ | ينفّذ الـ opcodes |

OPcache بيحفظ ناتج الخطوة ٢ في shared memory (ذاكرة مشتركة بين كل عمليات PHP)، فالطلب الجاي بيروح على الخطوة ٣ على طول.

---

## ٢. هل هو موجود؟

~~~php
<?php
if (!function_exists('opcache_get_status')) exit("OPcache مش متسطّب\n");
~~~

[[function_exists]] بترجّع [[true]] لو الدالة متعرّفة. الدالة دي جاية من الـ extension، فلو مش موجودة يبقى OPcache مش متحمّل أصلًا. و [[exit("...")]] بيطبع الرسالة ويوقف.

في [[php:8.4-cli]] متحمّل جاهز: [[php -m]] بيطلّع [[Zend OPcache]]، ومتفعّل بملف [[docker-php-ext-opcache.ini]] في [[conf.d]].

---

## ٣. هل هو شغال؟

~~~php
$s = opcache_get_status(false);
if ($s === false) exit("OPcache مقفول\n");
~~~

[[opcache_get_status(false)]] بيرجّع array فيها كل حاجة، و [[false]] معناها «من غير لستة الملفات» (ممكن تبقى آلاف). ولو OPcache مقفول بترجّع [[false]].

من الترمنال [[php index.php]]:

~~~text الناتج
OPcache مقفول
~~~

ليه؟ القيم الافتراضية (طبعناها بـ [[ini_get]]):

~~~text الناتج
opcache.enable='1'
opcache.enable_cli='0'
opcache.memory_consumption='128'
opcache.max_accelerated_files='10000'
opcache.validate_timestamps='1'
opcache.revalidate_freq='2'
opcache.jit='disable'
~~~

[[enable]] للويب ([[1]])، و [[enable_cli]] للترمنال ([[0]])، لأن سكربت الترمنال بيشتغل مرة ويقفل، فمفيش طلب جاي يستفيد.

---

## ٤. الأرقام

~~~php
$st = $s['opcache_statistics'];
printf("scripts: %d\n", $st['num_cached_scripts']);
printf("hit rate: %.1f%%\n", $st['opcache_hit_rate']);
printf("memory used: %.1f MB\n", $s['memory_usage']['used_memory'] / 1048576);
printf("validate_timestamps: %s\n", ini_get('opcache.validate_timestamps'));
~~~

[[printf]] بيطبع نص بقالب: [[%d]] رقم صحيح، و [[%.1f]] رقم عشري برقم واحد بعد العلامة، و [[%s]] نص، و [[%%]] علامة [[%]] نفسها.

| المفتاح | معناه |
|---|---|
| [[num_cached_scripts]] | عدد الملفات المحفوظة مترجمة |
| [[opcache_hit_rate]] | hits ÷ (hits + misses) × 100. hit = لقى الملف جاهز، miss = ترجمه |
| [[used_memory]] | بالبايت، و [[÷ 1048576]] (يعني 1024 × 1024) يحوّلها ميجا |
| [[validate_timestamps]] | [[1]]: بيبص على تاريخ الملف عشان لو اتعدّل |

---

## ٥. من [[php -S]]

~~~bash
php -S localhost:8000
~~~

السيرفر المدمج اسمه [[cli-server]] مش [[cli]]، فبيتبع [[opcache.enable]] زي الويب. فتحنا الصفحة ٥ مرات:

~~~text الناتج
-- 1
scripts: 1
hit rate: 0.0%
memory used: 8.7 MB
-- 2
scripts: 1
hit rate: 50.0%
-- 3
hit rate: 66.7%
-- 4
hit rate: 75.0%
-- 5
hit rate: 80.0%
~~~

الحساب: أول طلب miss (ترجم الملف وحفظه)، والباقي hits. بعد ٥ طلبات: ٤ ÷ ٥ = 80%. ولو كملت هتقرّب من 100% ومش هتوصلها، لأن الـ miss الأولاني محسوب. و [[8.7 MB]] مش حجم الملف ده، دي الذاكرة اللي OPcache حاجزها لنفسه (بيانات داخلية) حتى قبل أي ملف.

---

## ٦. على سيرفر حقيقي

الصفحة دي بتترفع على السيرفر (PHP-FPM) وتتفتح من المتصفح، وبعدين **تتمسح** لأنها بتكشف إعدادات. الأرقام هناك (من الـ docs والتجربة العادية): مئات أو آلاف scripts مع framework، و hit rate فوق 99%.

و [[validate_timestamps]]:

| القيمة | بيحصل إيه | بعد الـ deploy |
|---|---|---|
| [[1]] (افتراضي) | كل [[revalidate_freq]] ثانية (2) بيبص على تاريخ الملف | التعديل بيبان لوحده خلال ثانيتين |
| [[0]] | مبيبصش خالص، أسرع شوية | لازم [[sudo systemctl reload php8.4-fpm]] وإلا الكود القديم يفضل شغال |

---

## الخلاصة

| الإعداد | الافتراضي | معناه |
|---|---|---|
| [[opcache.enable]] | 1 | الويب و [[php -S]] |
| [[opcache.enable_cli]] | 0 | [[php file.php]] من الترمنال |
| [[memory_consumption]] | 128 | ميجا للـ opcodes |
| [[max_accelerated_files]] | 10000 | أقصى عدد ملفات |
| [[validate_timestamps]] | 1 | يفحص التعديلات |
| [[jit]] | disable | JIT مقفول افتراضيًا من 8.4 |`,
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
          sol: R`[[php index.php]] من الترمنال بيطبع [[OPcache مقفول]] لأن [[opcache.enable_cli=0]]. أما [[php -S localhost:8000]] (اتجرب على [[php:8.4-cli]]) فاسمه [[cli-server]] مش [[cli]]، وبيتبع [[opcache.enable=1]] زي الويب: أول طلب [[scripts: 1]] و [[hit rate: 0.0%]] (لسه بيترجم)، وبعدين 50% ثم 66.7% ثم 75% ثم 80%... الملف بقى في الذاكرة وكل طلب بعد كده hit. و [[memory used]] حوالي 9 MB، و [[validate_timestamps: 1]].

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
          teach: R`## المثال بيعمل إيه؟

٧ أوامر بتعمل مشروع Laravel جديد، وتضيف جدول بوستات بالموديل والـ controller بتاعه، وتطبّقه على القاعدة، وتجرّب الكود من الترمنال. [[composer create-project]] اتشغّل جوه Docker في صورة [[composer:2]]، وأوامر [[artisan]] على [[php:8.4-cli]] (Laravel Framework 13.35.0، والمشروع بيبدأ على SQLite فمحتجناش MySQL).

---

## ١. [[composer create-project laravel/laravel myapp]]

[[create-project]] بينزّل قالب مشروع جاهز ([[laravel/laravel]]) في فولدر جديد اسمه [[myapp]]، وبعدين بيعمل [[composer install]] جواه، وبيشغّل سكربتات ما بعد التسطيب. الناتج طويل؛ أهم سطوره:

~~~text الناتج (مختصر)
Creating a "laravel/laravel" project at "./myapp"
Installing laravel/laravel (v13.11.0)
Package operations: 109 installs, 0 updates, 0 removals
> @php artisan key:generate --ansi
   INFO  Application key set successfully.
> @php -r "file_exists('database/database.sqlite') || touch('database/database.sqlite');"
> @php artisan migrate --graceful --ansi
  0001_01_01_000000_create_users_table ........ 131.53ms DONE
  0001_01_01_000001_create_cache_table ........ 61.18ms DONE
  0001_01_01_000002_create_jobs_table ......... 110.87ms DONE
~~~

| السطر | معناه |
|---|---|
| [[laravel/laravel (v13.11.0)]] | نسخة القالب (الهيكل)، والـ framework نفسه [[laravel/framework]] مكتبة جوه [[vendor]] |
| [[109 installs]] | Laravel ومكتباته |
| [[key:generate]] | بيكتب [[APP_KEY]] عشوائي في [[.env]]، بيتستخدم في تشفير الجلسات والكوكيز |
| [[database.sqlite]] | بيعمل ملف القاعدة لو مش موجود. و [[.env]] فيه [[DB_CONNECTION=sqlite]] |
| [[migrate]] | بيعمل الجداول الأساسية: users و cache و jobs |

> السطور اللي بتبدأ بـ [[>]] دي سكربتات مكتوبة في [[composer.json]] تحت [["scripts"]]، و [[@php]] معناها «شغّل بنفس PHP».

---

## ٢. [[cd myapp]]

ادخل فولدر المشروع. كل أوامر [[artisan]] لازم تتشغّل من هنا، لأن [[artisan]] ملف PHP في جذر المشروع.

---

## ٣. [[php artisan make:model Post -mc]]

[[php artisan]] = شغّل ملف [[artisan]] بـ PHP. و [[make:model]] بيعمل كلاس موديل. و [[-mc]] اختصار [[-m]] (migration) + [[-c]] (controller):

~~~text الناتج
   INFO  Model [app/Models/Post.php] created successfully.
   INFO  Migration [database/migrations/2026_10_07_165537_create_posts_table.php] created successfully.
   INFO  Controller [app/Http/Controllers/PostController.php] created successfully.
~~~

- الموديل [[Post]] (مفرد) بيتربط لوحده بجدول [[posts]] (جمع).
- اسم الـ migration فيه التاريخ والوقت، عشان تتنفّذ بالترتيب.

الـ migration اللي اتعملت فيها:

~~~php
Schema::create('posts', function (Blueprint $table) {
    $table->id();
    $table->timestamps();
});
~~~

[[id()]] عمود رقم بيزيد لوحده، و [[timestamps()]] عمودين [[created_at]] و [[updated_at]]. ضيفنا تحت [[id()]]:

~~~php
$table->string('title');
~~~

يعني عمود نصي [[title]] (في MySQL بيبقى [[VARCHAR(255)]]).

---

## ٤. [[php artisan migrate]]

بيبص في جدول [[migrations]] على اللي اتطبق قبل كده، وينفّذ الجديد بس:

~~~text الناتج
   INFO  Running migrations.

  2026_10_07_165537_create_posts_table ......... 109.53ms DONE
~~~

الـ ٣ القديمة متنفذتش تاني.

---

## ٥. [[php artisan route:list]]

~~~text الناتج
  GET|HEAD  / ............................................... routes/web.php:5
  GET|HEAD  storage/{path} storage.local › vendor/laravel/framework/src/Illum…
  PUT       storage/{path} storage.local.upload › vendor/laravel/framework/sr…
  GET|HEAD  up vendor/laravel/framework/src/Illuminate/Foundation/Configurati…

                                                            Showing [4] routes
~~~

كل سطر route: الـ method، والمسار، ومين بيرد. [[/]] متعرّف في [[routes/web.php]] سطر 5، و [[up]] صفحة health check جاهزة. و [[PostController]] لسه مش ظاهر لأننا مربطناهوش بـ route. ده نفس جدول [[$routes]] اللي عملناه بإيدنا في درس front controller.

---

## ٦. [[php artisan tinker]]

REPL: بتكتب PHP سطر سطر وكل كلاسات المشروع جاهزة. جربنا الأمر بـ [[--execute]] (ينفّذ سطر ويقفل):

~~~php
App\Models\Post::create(['title' => 'أول بوست'])
~~~

~~~text الناتج
   Illuminate\Database\Eloquent\MassAssignmentException  Add [title] to fillable property to allow mass assignment on [App\Models\Post].
~~~

[[create([...])]] بيملا أعمدة من array مرة واحدة (mass assignment). و Laravel بيرفض أي عمود انت مسمحتش بيه صراحة، عشان لو حد عمل [[Post::create($request->all())]] محدش يبعت [[user_id]] أو [[is_admin]] من الفورم.

### الحل (الـ solCode)

~~~php
class Post extends Model
{
    protected $fillable = ['title'];
}
~~~

[[protected $fillable]]: لستة الأعمدة المسموح تتملي بـ [[create]]. جربنا تاني:

~~~text الناتج
array:4 [
  "title" => "أول بوست"
  "updated_at" => "2026-10-07T16:56:21.000000Z"
  "created_at" => "2026-10-07T16:56:21.000000Z"
  "id" => 1
]
~~~

[[created_at]] و [[updated_at]] اتملوا لوحدهم، و [[id]] من القاعدة. وجربنا [[Post::create(['title' => 'x', 'id' => 99])]]: الـ id طلع [[2]] مش [[99]]، لأن [[id]] مش في [[$fillable]] فاتجاهل بصمت.

---

## ٧. [[composer run dev]]

[[composer run]] بيشغّل سكربت من [[composer.json]]. في Laravel 13 السكربت [[dev]] بينادي [[php artisan dev]]، اللي بيشغّل مع بعض: [[artisan serve]] (السيرفر)، و [[queue:listen]] (الـ jobs)، و [[pail]] (اللوجات، مش على Windows)، و Vite (للـ CSS و JS) لو فيه [[package.json]]. جربناه في container مفيهوش Node:

~~~text الناتج
sh: 1: npx: not found
~~~

يعني محتاج Node و npm متسطبين وتعمل [[npm install]] الأول. على جهازك العادي هتفتح [[http://localhost:8000]].

---

## الخلاصة

| الأمر | بيعمل إيه | المقابل في PHP الخام |
|---|---|---|
| [[composer create-project]] | مشروع جاهز | الفولدرات و autoload بإيدك |
| [[make:model Post -mc]] | موديل + migration + controller | [[PostRepository]] و [[PostController]] |
| [[migrate]] | يطبّق تغييرات الجداول | سكربتات SQL بإيدك |
| [[route:list]] | كل الـ routes | جدول [[$routes]] |
| [[tinker]] | REPL فيه المشروع | [[php -a]] |
| [[$fillable]] | الأعمدة المسموحة في [[create]] | allowlist بإيدك |
| [[composer run dev]] | سيرفر و queue و Vite | [[php -S]] |`,
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

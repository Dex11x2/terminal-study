// تكملة تاب spring: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/spring/01.js (شرح حقول الدرس في أوله)
MORE("spring", [
    {
      t: "Generics والـ Collections",
      l: 1,
      n: "List و Map و Set، والـ generics بقيودها، والترتيب بـ Comparator",
      items: [
        {
          cmd: "List و Map و Set",
          title: "الـ arrays والـ objects بتوع JS: إيه اللي يقابلهم في Java؟",
          desc: R`[[List]] زي الـ array في JS (بترتيب، وبتكبر)، والتنفيذ المعتاد [[ArrayList]]. و [[Map]] زي [[Map]] في JS (مفتاح وقيمة)، والتنفيذ المعتاد [[HashMap]]، و [[TreeMap]] لو عايز المفاتيح مرتبة. و [[Set]] زي [[Set]] في JS، و [[HashSet]] أشهرها.

المتغير نوعه الـ interface ([[List<String>]])، والقيمة التنفيذ ([[new ArrayList<>()]]). و [[List.of(...)]] و [[Map.of(...)]] بيعملوا collections ثابتة متتعدلش: أي [[add]] عليها بيرمي exception وقت التشغيل.`,
          example: R`void main() {
    List<String> tags = new ArrayList<>(List.of("java", "spring"));
    tags.add("jpa");
    Map<String, Integer> stock = new HashMap<>();
    stock.put("pen", 10);
    stock.merge("pen", 5, Integer::sum);
    stock.putIfAbsent("book", 1);
    Set<String> seen = new HashSet<>(List.of("a", "b", "a"));
    IO.println(tags + " " + tags.get(0) + " " + tags.size());
    IO.println(stock.get("pen") + " " + stock.getOrDefault("cup", 0));
    IO.println(seen.size() + " " + seen.contains("a"));
    for (var e : new TreeMap<>(stock).entrySet()) IO.println(e.getKey() + "=" + e.getValue());
    List<String> fixed = List.of("x", "y");
    fixed.add("z");
}`,
          try: R`اكتب method [[wordCount(String text)]] بترجع [[Map<String, Integer>]] بعدد كل كلمة (من غير حالة الحروف). جرّبها على [["the cat and The dog and THE end"]]. ولو اتنين كلمات عددهم زي بعض، ترتيبهم في الناتج مضمون؟`,
          flag: "script",
          deep: {
            why: R`كل كود backend فيه ليستات ومابات: نتايج queries، وتجميع، وعدّ، وإزالة تكرار. واختيار النوع الصح (List ولا Set، و HashMap ولا TreeMap) بيفرق في السرعة والصحة، وبيتسأل في الانترفيو.`,
            how: R`[[ArrayList]] array جوه بيكبر لوحده: [[get(i)]] سريع O(1)، والإضافة في الآخر O(1) في المتوسط، والإضافة أو المسح من النص O(n). وفيه [[LinkedList]] بس نادرًا ما بتكون أحسن.

[[HashMap]] بيحسب [[hashCode]] للمفتاح ويحطه في bucket: [[get]] و [[put]] O(1) في المتوسط، ومفيش ترتيب مضمون (درس HashMap من جوه في الانترفيو). [[LinkedHashMap]] بيحافظ على ترتيب الإضافة (زي Map في JS)، و [[TreeMap]] بيرتب بالمفتاح O(log n).

methods مفيدة: [[getOrDefault]]، و [[putIfAbsent]]، و [[merge(key, 1, Integer::sum)]] (أنضف طريقة للعدّ)، و [[computeIfAbsent(key, k -> new ArrayList<>())]] لتجميع قيم تحت مفتاح.

[[List.of]] و [[Map.of]] (Java 9+) immutable وكمان مبيقبلوش null. و [[Arrays.asList]] القديمة حجمها ثابت بس [[set]] شغالة: متلخبطش بينهم.`,
            when: R`List لأي ليستة مرتبة. Set لما التكرار ممنوع أو محتاج [[contains]] سريع. Map للبحث بمفتاح والتجميع. [[List.of]] للثوابت ولما ترجع list من method ومش عايز حد يعدّل.`,
            mistakes: R`[[List.of(...)]] وبعدين [[add]]: [[UnsupportedOperationException]] وقت التشغيل مش compile. وتعتمد على ترتيب [[HashMap]] في تست فيعدّي عندك ويقع في CI. وتعدّل list وانت بتلف عليها بـ for-each: [[ConcurrentModificationException]] (استخدم [[removeIf]]). و [[map.get(k)]] بيرجع null لو مش موجود، فـ [[int n = map.get(k);]] ممكن يعمل NullPointerException.`
          },
          lines: [
            "main.",
            R`list تتعدّل، بادئة بقيمتين. النوع الـ interface والقيمة ArrayList.`,
            R`[[add]] زي [[push]].`,
            R`map من String لـ Integer (مش int: الـ generics محتاجة objects).`,
            R`[[put]] زي [[set]] في JS.`,
            R`[[merge]]: لو المفتاح موجود اجمع ٥ على القديم. [[15]].`,
            "حط قيمة لو المفتاح مش موجود بس.",
            R`set من list فيها تكرار: [[a]] و [[b]] بس.`,
            R`[[[java, spring, jpa] java 3]]: الـ toString بتاع الـ collections مقروء.`,
            R`[[15 0]]: [[getOrDefault]] بدل null.`,
            R`[[2 true]].`,
            R`[[TreeMap]] بيرتب المفاتيح، و [[entrySet]] زي [[Object.entries]]: [[book=1]] وبعدين [[pen=15]].`,
            R`list ثابتة.`,
            R`[[UnsupportedOperationException]] وقت التشغيل.`,
            "قفلة."
          ],
          sol: R`الحل تحت: بيطبع [[{and=2, cat=1, dog=1, end=1, the=3}]] مرتب لأننا استخدمنا [[TreeMap]].

لو استخدمت [[HashMap]] الترتيب مش مضمون: ممكن يطلع بأي شكل، وممكن يتغير بين إصدارات Java أو لو الحجم اتغير. لو محتاج ترتيب الإضافة استخدم [[LinkedHashMap]]، ولو مرتب أبجديًا [[TreeMap]]، ولو مرتب بالعدد لازم تعمل sort للـ entries (درس Comparator). و [[split("\\s+")]] بيقسم على أي مسافات حتى لو أكتر من واحدة.`,
          solCode: R`static Map<String, Integer> wordCount(String text) {
    Map<String, Integer> counts = new TreeMap<>();
    for (String w : text.toLowerCase().split("\\s+")) {
        counts.merge(w, 1, Integer::sum);
    }
    return counts;
}

void main() {
    IO.println(wordCount("the cat and The dog and THE end"));
}`
        },
        {
          cmd: "generics",
          title: "class و method بيشتغلوا مع أي نوع، ومن غير ما تخسر الفحص",
          desc: R`نفس فكرة الـ generics في TS: [[record Page<T>(List<T> items, ...)]] صفحة من أي حاجة، و [[<T extends Comparable<T>> T max(List<T> list)]] method بتشتغل مع أي نوع ينفع يتقارن (زي [[T extends ...]] في TS).

والجديد عليك: الـ wildcards. [[List<? extends Number>]] يعني «list من أي نوع أرقام» (Integer أو Double...)، لأن في Java [[List<Integer>]] مش [[List<Number>]] حتى لو Integer هو Number. والأنواع دي بتتمسح وقت التشغيل (type erasure)، زي TS بس للـ generics بس.`,
          example: R`record Page<T>(List<T> items, int page, long total) {
    <R> Page<R> map(java.util.function.Function<T, R> fn) {
        return new Page<>(items.stream().map(fn).toList(), page, total);
    }
}

static <T extends Comparable<T>> T max(List<T> list) {
    T best = list.get(0);
    for (T x : list) if (x.compareTo(best) > 0) best = x;
    return best;
}

static double sum(List<? extends Number> nums) {
    double s = 0;
    for (Number n : nums) s += n.doubleValue();
    return s;
}

void main() {
    Page<Integer> ids = new Page<>(List.of(1, 2, 3), 1, 3);
    Page<String> labels = ids.map(id -> "task-" + id);
    IO.println(labels);
    IO.println(max(List.of(3, 9, 4)) + " " + max(List.of("b", "z", "a")));
    IO.println(sum(List.of(1, 2.5, 3L)));
    List<String> a = new ArrayList<>();
    List<Integer> b = new ArrayList<>();
    IO.println(a.getClass() == b.getClass());
}`,
          try: R`جرّب [[max(List.of(new Object()))]] واقرا الخطأ. وبعدين غيّر [[sum(List<? extends Number> nums)]] لـ [[sum(List<Number> nums)]] وجرّب تبعتلها [[List<Integer>]] متعرّفة في متغير: [[List<Integer> ints = List.of(1, 2); sum(ints);]].`,
          flag: "script",
          deep: {
            why: R`كل الـ collections و Spring Data ([[JpaRepository<Task, Long>]]) و [[ResponseEntity<T>]] و [[Optional<T>]] generics. لازم تقرا signatures زي [[<S extends T> S save(S entity)]] من غير ما تتخض، وتكتب helpers بسيطة زي [[Page<T>]] و [[ApiResponse<T>]].`,
            how: R`الـ generics بتتفحص وقت الـ compile، وبعدين بتتمسح: [[List<String>]] و [[List<Integer>]] وقت التشغيل الاتنين [[ArrayList]] بس (عشان كده آخر سطر [[true]]). النتايج: مينفعش [[new T()]]، ولا [[instanceof List<String>]]، ولا [[List<int>]] (primitives مش مسموحة، لازم wrapper).

الـ invariance: [[List<Integer>]] مش subtype من [[List<Number>]]. لو كانت، كنت هتقدر تعمل [[numbers.add(2.5)]] على list أصلها Integer. عشان كده الـ wildcards:
[[? extends Number]]: تقرا منها كـ Number، بس متقدرش تضيف (producer).
[[? super Integer]]: تضيف فيها Integer، بس لما تقرا بتاخد Object (consumer).
القاعدة اللي بتتحفظ: PECS، Producer Extends Consumer Super.

و [[<>]] (diamond) بيخلي الـ compiler يستنتج النوع من الشمال: [[new ArrayList<>()]].`,
            when: R`استخدمها في كل الـ collections. واكتبها لما عندك كود بيتكرر لكذا نوع (wrapper لـ response، أو result، أو صفحة). ومتعقدهاش: لو الـ signature محتاج ٣ wildcards عشان تفهمه، غالبًا في طريقة أبسط.`,
            mistakes: R`raw types: [[List list = new ArrayList();]] من غير [[<>]]: الـ compiler بيطلّع warning بس، والفحص كله راح، وده في كود قديم كتير. وتفتكر إن [[List<Object>]] بتاخد أي list: لأ، [[List<?>]] هي اللي بتاخد. و [[max(List<T>)]] مع list فاضية: [[IndexOutOfBoundsException]].`
          },
          lines: [
            R`record generic: [[T]] نوع العناصر.`,
            R`method generic جواه: [[<R>]] نوع جديد، و [[Function<T, R>]] دالة من T لـ R.`,
            R`[[stream().map(fn).toList()]] (درس streams)، والـ diamond [[<>]] استنتج [[Page<R>]].`,
            "قفلة.",
            "قفلة الـ record.",
            R`[[T extends Comparable<T>]]: أي نوع يعرف يقارن نفسه (String و Integer و LocalDate...).`,
            "أول عنصر.",
            R`[[compareTo]] بترجع موجب لو الأول أكبر.`,
            "النتيجة من نفس النوع T.",
            "قفلة.",
            R`wildcard: list من Integer أو Double أو Long، أي نوع تحت Number.`,
            "المجموع.",
            R`كل عنصر Number فيه [[doubleValue()]].`,
            "رجوع.",
            "قفلة.",
            "main.",
            "صفحة أرقام.",
            R`[[map]] حوّلتها لصفحة strings، والنوع اتفحص.`,
            R`[[Page[items=[task-1, task-2, task-3], page=1, total=3]]].`,
            R`نفس الـ method مع أرقام ومع strings: [[9 z]].`,
            R`Integer و Double و Long في list واحدة: [[6.5]].`,
            "list strings.",
            "list أرقام.",
            R`[[true]]: وقت التشغيل الاتنين ArrayList، والـ generic اتمسح.`,
            "قفلة."
          ],
          sol: R`[[max(List.of(new Object()))]]: خطأ compile [[method max ... cannot be applied to given types]] وتحته [[reason: inference variable E has incompatible bounds]] و [[upper bounds: Comparable<T>,Object]]. بالبلدي: T لازم يبقى Comparable، و Object مش Comparable. الـ constraint اشتغل: Object مبيعرفش يقارن نفسه.

ومع [[sum(List<Number> nums)]] و [[sum(ints)]]: [[method sum ... cannot be applied to given types]] وتحته [[reason: argument mismatch; List<Integer> cannot be converted to List<Number>]]. ده الـ invariance. لو كتبت [[sum(List.of(1, 2))]] مباشرة هيعدّي، لأن الـ compiler هيستنتج [[List<Number>]] للـ literal نفسه. رجّع [[? extends Number]] والاتنين يشتغلوا.`
        },
        {
          cmd: "Comparator",
          title: "ترتّب objects بأكتر من حقل، وتمسح من list وانت بتلف عليها",
          desc: R`[[Comparator.comparing(User::age)]] بيرتب بحقل، و [[.thenComparing(...)]] بحقل تاني لو الأول متساوي، و [[.reversed()]] أو [[Comparator.reverseOrder()]] للعكس. أنضف بكتير من [[(a, b) => a.age - b.age]] اللي بتكتبها في JS.

و [[list.sort(...)]] بيرتب في مكانه، و [[stream().sorted(...)]] بيرجع نسخة. وعشان تمسح عناصر بشرط: [[removeIf]]. أما [[remove]] جوه for-each فبيوقع البرنامج.`,
          example: R`record User(String name, int age, String city) {}

void main() {
    var users = new ArrayList<>(List.of(
        new User("Sara", 27, "Cairo"),
        new User("Omar", 22, "Alex"),
        new User("Mona", 27, "Alex")));
    users.sort(Comparator.comparingInt(User::age));
    IO.println(users.stream().map(User::name).toList());
    users.sort(Comparator.comparing(User::city).thenComparing(User::age, Comparator.reverseOrder()));
    IO.println(users.stream().map(User::name).toList());
    var adults = new ArrayList<>(users);
    adults.removeIf(u -> u.age() < 25);
    IO.println(adults.size());
    for (User u : users) if (u.age() > 25) users.remove(u);
}`,
          try: R`رتّب الـ users بالاسم من غير حالة الحروف ([[String.CASE_INSENSITIVE_ORDER]])، وبعدين بالسن تنازلي ولو متساويين بالاسم. وضيف user اسمه [[null]] وشوف إيه اللي بيحصل، وصلّحه بـ [[Comparator.nullsLast]].`,
          flag: "script",
          deep: {
            why: R`الترتيب في كل حتة: جداول، وليدربورد، وتقارير. والطرح [[a - b]] اللي متعود عليه من JS ممكن يعمل overflow مع أرقام كبيرة في Java. والمسح أثناء اللف من أشهر أخطاء المبتدئين.`,
            how: R`[[Comparator<T>]] functional interface فيه [[compare(a, b)]] بيرجع سالب أو صفر أو موجب. [[comparing(keyExtractor)]] بيبني واحد من دالة بتطلّع المفتاح، و [[comparingInt]] نفس الحكاية من غير boxing. و [[thenComparing]] بيتنادى بس لو الأول قال متساويين.

[[List.sort]] و [[Collections.sort]] stable: العناصر المتساوية بتحافظ على ترتيبها القديم. عشان كده في أول ترتيب، Sara فضلت قبل Mona (الاتنين ٢٧).

[[ConcurrentModificationException]]: الـ iterator بتاع ArrayList بيحفظ عدد التعديلات (modCount)، ولو الـ list اتغيرت من برّه الـ iterator بيرمي exception في الخطوة الجاية. الحلول: [[removeIf]]، أو [[Iterator.remove()]]، أو تبني list جديدة بـ stream و filter.`,
            when: R`[[Comparator.comparing]] في أي ترتيب. وفي JPA الأحسن الداتابيز ترتب ([[ORDER BY]] أو [[Sort.by("createdAt")]] في Spring Data) بدل ما تجيب كله وترتب في Java.`,
            mistakes: R`[[(a, b) -> a.getBalance() - b.getBalance()]] مع [[long]] كبيرة: overflow وترتيب غلط؛ استخدم [[Long.compare]] أو [[comparingLong]]. وتنسى إن [[reversed()]] في نص سلسلة بيعكس كل اللي قبله مش آخر حقل بس. و [[remove]] جوه for-each.`
          },
          lines: [
            "record بتلات حقول.",
            "main.",
            R`list تتعدّل من [[List.of]].`,
            "سارة ٢٧ القاهرة.",
            "عمر ٢٢ اسكندرية.",
            "منى ٢٧ اسكندرية.",
            R`ترتيب بالسن. [[User::age]] method reference (درس lambdas).`,
            R`[[[Omar, Sara, Mona]]]: الترتيب stable فسارة فضلت قبل منى.`,
            "بالمدينة، وجوه نفس المدينة بالسن تنازلي.",
            R`[[[Mona, Omar, Sara]]]: اسكندرية الأول (منى ٢٧ ثم عمر ٢٢)، وبعدين القاهرة.`,
            "نسخة.",
            R`[[removeIf]]: المسح بشرط بأمان.`,
            R`[[2]].`,
            R`[[remove]] جوه for-each: [[ConcurrentModificationException]].`,
            "قفلة."
          ],
          sol: R`الحل تحت (كتبنا [[sara]] بحرف صغير عشان نختبر الـ case-insensitive): الناتج [[[Mona, Omar, sara]]] وبعدين [[[Mona, sara, Omar]]] (منى وسارة ٢٧ فمرتبين بالاسم، وبعدين عمر ٢٢)، وبعد ما ضفنا null: [[[Mona, Omar, sara, null]]]. لو استخدمت [[Comparator.comparing(User::name)]] العادي، [[sara]] كانت هتيجي بعد [[Omar]] و [[Mona]] برضه هنا بالصدفة، بس [["sara"]] و [["Sara"]] مش هيترتبوا جنب بعض مع أسماء تانية، لأن الحروف الكبيرة كلها قبل الصغيرة في الترتيب العادي.

لو ضفت user اسمه null ورتبت بالاسم: [[NullPointerException]] جوه الـ comparator. الحل: [[Comparator.comparing(User::name, Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER))]]، فالـ null بيروح للآخر. ولاحظ إن [[comparingInt(User::age).reversed()]] جت الأول لوحدها، لأن [[reversed()]] بتعكس كل السلسلة اللي قبلها.`,
          solCode: R`record User(String name, int age, String city) {}

void main() {
    var users = new ArrayList<>(List.of(
        new User("sara", 27, "Cairo"), new User("Omar", 22, "Alex"), new User("Mona", 27, "Alex")));
    users.sort(Comparator.comparing(User::name, String.CASE_INSENSITIVE_ORDER));
    IO.println(users.stream().map(User::name).toList());
    users.sort(Comparator.comparingInt(User::age).reversed()
        .thenComparing(User::name, String.CASE_INSENSITIVE_ORDER));
    IO.println(users.stream().map(User::name).toList());
    users.add(new User(null, 30, "Giza"));
    users.sort(Comparator.comparing(User::name, Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER)));
    IO.println(users.stream().map(User::name).toList());
}`
        }
      ]
    },
    {
      t: "Lambdas و Streams و Optional",
      l: 1,
      n: "الدوال كقيم، و map و filter و reduce بتوع Java، والتعامل مع القيمة اللي ممكن متكونش موجودة",
      items: [
        {
          cmd: "lambdas",
          title: "تبعت دالة لدالة: lambdas و method references",
          desc: R`الـ lambda في Java [[x -> x * 2]] (سهم بشرطة، مش [[=>]]). بس في Java مفيش نوع اسمه «دالة»: الـ lambda لازم تتحط مكان interface فيه method واحدة (functional interface)، وهي بتبقى تنفيذ الـ method دي.

فيه interfaces جاهزة في [[java.util.function]]: [[Function<T, R>]] (بياخد ويرجع)، و [[Predicate<T>]] (بيرجع boolean)، و [[Consumer<T>]] (بياخد ومبيرجعش)، و [[Supplier<T>]] (مبياخدش وبيرجع). و method reference [[String::length]] اختصار لـ [[s -> s.length()]].`,
          example: R`import java.util.function.*;

@FunctionalInterface
interface PriceRule { long apply(long cents); }

void main() {
    Function<String, Integer> len = s -> s.length();
    Predicate<Integer> isEven = n -> n % 2 == 0;
    Supplier<List<String>> fresh = ArrayList::new;
    BiFunction<Long, Long, Long> add = Long::sum;
    PriceRule tenOff = c -> c * 90 / 100;
    PriceRule minus5 = c -> c - 500;
    IO.println(len.apply("spring") + " " + isEven.test(4) + " " + fresh.get() + " " + add.apply(2L, 3L));
    IO.println(minus5.apply(tenOff.apply(10_000)));
    int discount = 10;
    Function<Integer, Integer> apply = p -> p - discount;
    IO.println(apply.apply(100));
}`,
          try: R`ضيف [[discount = 20;]] بعد سطر الـ lambda الأخيرة واقرا الخطأ. وبعدين اعمل [[List<PriceRule>]] فيها الاتنين وطبّقهم على السعر بالترتيب في loop.`,
          flag: "script",
          deep: {
            why: R`Streams و Optional و Spring Security config ([[auth -> auth.anyRequest()...]]) و Comparators كلها lambdas. لازم تكون مرتاح تقرا [[http.authorizeHttpRequests(a -> a.requestMatchers(...))]] من غير ما تتلخبط.`,
            how: R`الـ compiler بيبص على المكان اللي فيه الـ lambda (target type): لو المطلوب [[Predicate<Integer>]]، يبقى الـ lambda تنفيذ لـ [[test(Integer)]] وبترجع boolean. نفس الـ lambda ممكن تبقى أنواع مختلفة حسب المكان. و [[@FunctionalInterface]] annotation اختيارية بتخلي الـ compiler يتأكد إن فيه method abstract واحدة بس.

أشكال الـ method reference: [[Integer::parseInt]] (static)، و [[String::length]] (method على الباراميتر)، و [[user::getName]] (على object معين)، و [[ArrayList::new]] (constructor).

الـ capture: الـ lambda تقدر تقرا متغيرات محلية من برّه بس لو final أو effectively final (محدش غيّرها). في JS الـ closure بيشوف أحدث قيمة، في Java القيمة بتتنسخ وقت عمل الـ lambda، فمنعوا التغيير عشان ميبقاش فيه لخبطة. الحقول (fields) مش عليها القيد ده.

والأنواع الـ primitive ليها نسخ خاصة من غير boxing: [[IntPredicate]] و [[ToLongFunction]] وغيرهم.`,
            when: R`callbacks وأي حاجة بتاخد سلوك: ترتيب، وفلترة، ومعالجة events. لو الـ lambda بقت أكتر من ٣ سطور، طلّعها method واستخدم method reference.`,
            mistakes: R`تعدّل متغير محلي من جوه lambda ([[count++]] جوه forEach): خطأ compile؛ استخدم stream بـ [[count()]] أو [[sum()]]. وتكتب interface جديد لكل lambda وفيه واحد جاهز في [[java.util.function]]. وتحط checked exception جوه lambda في stream: الـ interfaces الجاهزة مبتسمحش بيها (درس الأخطاء).`
          },
          lines: [
            R`الـ interfaces الجاهزة للدوال.`,
            R`annotation بتتأكد إن فيه method واحدة.`,
            "functional interface بتاعنا.",
            "main.",
            R`[[Function<String, Integer>]]: بياخد String ويرجع Integer. نداءها [[apply]].`,
            R`[[Predicate]]: بيرجع boolean. نداءها [[test]].`,
            R`[[Supplier]] مع constructor reference.`,
            R`[[Long::sum]] static method reference.`,
            R`lambda بقت PriceRule: خصم ١٠٪.`,
            "خصم ٥ جنيه (٥٠٠ قرش).",
            R`[[6 true [] 5]].`,
            R`تركيب القاعدتين: ١٠٠٠٠ → ٩٠٠٠ → [[8500]].`,
            "متغير محلي.",
            "الـ lambda بتقراه (effectively final).",
            R`[[90]].`,
            "قفلة."
          ],
          sol: R`[[discount = 20;]] بعد الـ lambda: [[local variables referenced from a lambda expression must be final or effectively final]]. المتغير بقى بيتغير، فالـ lambda مينفعش تمسكه.

وتطبيق القواعد بالترتيب زي الكود تحت: [[8500]]. لاحظ إن [[rules]] ليستة سلوكيات، وده Strategy pattern بكود قصير جدًا. لو عكست الترتيب (الـ ٥ الأول وبعدين ١٠٪) الناتج [[8550]]، فالترتيب جزء من المنطق.`,
          solCode: R`@FunctionalInterface
interface PriceRule { long apply(long cents); }

void main() {
    List<PriceRule> rules = List.of(c -> c * 90 / 100, c -> c - 500);
    long price = 10_000;
    for (PriceRule r : rules) price = r.apply(price);
    IO.println(price);
}`
        },
        {
          cmd: "streams",
          title: "map و filter و reduce بتوع Java، والتجميع بـ groupingBy",
          desc: R`الـ Stream API هو [[map]] و [[filter]] و [[reduce]] اللي متعود عليهم في JS، بس بتبدأ بـ [[.stream()]] وبتنتهي بعملية نهائية: [[toList()]] أو [[count()]] أو [[sum()]] أو [[collect(...)]]. من غير العملية النهائية مفيش حاجة بتتنفذ أصلًا (lazy).

و [[Collectors.groupingBy]] بيعمل اللي بتعمله بـ [[reduce]] معقد في JS: يجمّع حسب مفتاح ويحسب مجموع أو عدد لكل مجموعة، زي [[GROUP BY]] في SQL.`,
          example: R`record Order(String customer, String city, long total, boolean paid) {}

void main() {
    var orders = List.of(
        new Order("Sara", "Cairo", 500, true),
        new Order("Omar", "Alex", 1200, true),
        new Order("Sara", "Cairo", 300, false),
        new Order("Mona", "Alex", 800, true));
    long paidTotal = orders.stream().filter(Order::paid).mapToLong(Order::total).sum();
    List<String> bigCustomers = orders.stream()
        .filter(o -> o.total() >= 800)
        .map(Order::customer)
        .distinct()
        .sorted()
        .toList();
    Map<String, Long> byCity = orders.stream()
        .collect(Collectors.groupingBy(Order::city, TreeMap::new, Collectors.summingLong(Order::total)));
    IO.println(paidTotal);
    IO.println(bigCustomers);
    IO.println(byCity);
    IO.println(orders.stream().anyMatch(o -> !o.paid()));
}`,
          try: R`من نفس الـ orders طلّع: (١) عدد الطلبات لكل عميل [[Map<String, Long>]]، (٢) أكبر طلب (استخدم [[max]] مع Comparator، ولاحظ إنها بترجع Optional)، (٣) أسماء العملاء مفصولين بـ [[", "]] في string واحد.`,
          flag: "script",
          deep: {
            why: R`تحويل الـ entities لـ DTOs في كل controller: [[tasks.stream().map(TaskResponse::from).toList()]]. والتقارير والتجميع الصغير. والكود بيبقى قريب من الـ JS اللي انت متعود عليه.`,
            how: R`الـ stream pipeline: مصدر ([[list.stream()]])، وعمليات وسيطة lazy ([[filter]] و [[map]] و [[sorted]] و [[distinct]] و [[limit]])، وعملية نهائية واحدة بتشغّل كله. العناصر بتعدّي على السلسلة واحد واحد، مش كل خطوة بتعمل list جديدة زي JS. والـ stream بيتستخدم مرة واحدة بس.

[[mapToLong]] و [[mapToInt]] بيدوك stream أرقام primitive فيه [[sum()]] و [[average()]] من غير boxing.

[[toList()]] (Java 16) بترجع list ثابتة. [[collect(Collectors.toList())]] القديمة بترجع ArrayList تتعدّل. و [[Collectors]] فيها [[groupingBy]] و [[partitioningBy]] (قسمين بشرط) و [[joining(", ")]] و [[toMap]] و [[counting()]].

و [[parallelStream()]] موجودة بس نادرًا ما تفيد في backend (الـ requests أصلًا شغالة بالتوازي).`,
            when: R`تحويل وفلترة وتجميع على داتا في الذاكرة. أما لو الداتا في الداتابيز، فلتر وجمّع هناك ([[WHERE]] و [[GROUP BY]] أو query method)، ومتجيبش ١٠٠ ألف صف عشان تعمل filter في Java.`,
            mistakes: R`تستخدم الـ stream مرتين: [[IllegalStateException: stream has already been operated upon or closed]]. وتعدّل حاجة برّه من جوه [[map]] أو [[forEach]] (side effects). و [[Collectors.toMap]] مع مفاتيح متكررة: [[IllegalStateException: Duplicate key]] إلا لو اديته merge function. و stream طويل ومعقد بدل for loop واضح: مش كل حاجة لازم تبقى stream.`
          },
          lines: [
            "record للطلب.",
            "main.",
            "أربع طلبات.",
            "سارة، مدفوع.",
            "عمر، مدفوع.",
            "سارة، مش مدفوع.",
            "منى، مدفوع.",
            R`filter بـ method reference، وبعدين مجموع: ٥٠٠ + ١٢٠٠ + ٨٠٠.`,
            "stream تاني (كل stream مرة واحدة).",
            "الطلبات الكبيرة.",
            R`اسم العميل. زي [[map]] في JS.`,
            "من غير تكرار.",
            "ترتيب أبجدي.",
            "عملية نهائية: list ثابتة.",
            "التجميع بالمدينة.",
            R`[[groupingBy]] بمفتاح المدينة، في TreeMap مرتب، والقيمة مجموع الـ totals.`,
            R`[[2500]].`,
            R`[[[Mona, Omar]]].`,
            R`[[{Alex=2000, Cairo=800}]].`,
            R`[[anyMatch]] زي [[some]] في JS: [[true]].`,
            "قفلة."
          ],
          sol: R`الناتج من الحل تحت:

[[{Mona=1, Omar=1, Sara=2}]]: [[counting()]] بترجع Long.

[[Order[customer=Omar, city=Alex, total=1200, paid=true]]]: [[max]] بترجع [[Optional<Order>]] لأن الـ list ممكن تبقى فاضية، فلازم [[orElseThrow()]] أو [[orElse]].

[[Mona, Omar, Sara]]: [[distinct]] شالت سارة المكررة، و [[joining]] زي [[join(", ")]] في JS.`,
          solCode: R`record Order(String customer, String city, long total, boolean paid) {}

void main() {
    var orders = List.of(new Order("Sara", "Cairo", 500, true), new Order("Omar", "Alex", 1200, true),
        new Order("Sara", "Cairo", 300, false), new Order("Mona", "Alex", 800, true));
    Map<String, Long> perCustomer = orders.stream()
        .collect(Collectors.groupingBy(Order::customer, TreeMap::new, Collectors.counting()));
    Order biggest = orders.stream().max(Comparator.comparingLong(Order::total)).orElseThrow();
    String names = orders.stream().map(Order::customer).distinct().sorted().collect(Collectors.joining(", "));
    IO.println(perCustomer);
    IO.println(biggest);
    IO.println(names);
}`
        },
        {
          cmd: "Optional",
          title: "method ممكن متلاقيش حاجة: ترجع null ولا Optional؟",
          desc: R`[[Optional<User>]] صندوق يا فيه User يا فاضي. بدل ما [[findById]] ترجع null وتنسى تفحص، النوع نفسه بيقولك «ممكن متلاقيش»، وبيجبرك تقرر: [[orElse(default)]]، أو [[orElseThrow(...)]]، أو [[map]] للتحويل، أو [[ifPresent]].

ده اللي Spring Data بيرجعه: [[repository.findById(id)]] نوعها [[Optional<Task>]]، والشكل المعتاد في الـ service: [[findById(id).orElseThrow(() -> new NotFoundException(...))]]. قريب من [[user?.name ?? "guest"]] في JS بس بـ methods.`,
          example: R`record User(long id, String name, String email) {}

Map<Long, User> db = Map.of(1L, new User(1, "Sara", "sara@example.com"), 2L, new User(2, "Omar", null));

Optional<User> findById(long id) {
    return Optional.ofNullable(db.get(id));
}

void main() {
    IO.println(findById(1).map(User::name).orElse("guest"));
    IO.println(findById(9).map(User::name).orElse("guest"));
    IO.println(findById(2).map(User::email).orElse("no email"));
    findById(1).ifPresent(u -> IO.println("found " + u.id()));
    User u = findById(9).orElseThrow(() -> new NoSuchElementException("user 9 not found"));
}`,
          try: R`جرّب [[findById(9).get()]] وشوف الـ exception. وبعدين اكتب [[Optional<String> emailDomain(long id)]] بترجع الـ domain بتاع الإيميل ([["example.com"]]) أو فاضي، من غير ولا [[if]] ولا null check (استخدم [[map]] و [[filter]]).`,
          flag: "script",
          deep: {
            why: R`[[NullPointerException]] أشهر exception في Java. Java مفيهاش [[strictNullChecks]] زي TS، فـ Optional هو الطريقة إن الـ signature نفسه يقول «القيمة دي ممكن متكونش موجودة». لما تشوف [[Optional<Task>]] مش هتنسى الحالة الفاضية.`,
            how: R`[[Optional.of(x)]] (x مينفعش يبقى null)، و [[Optional.ofNullable(x)]] (فاضي لو null)، و [[Optional.empty()]].

[[map(f)]]: لو فيه قيمة طبّق f، ولو f رجّعت null بقى فاضي (عشان كده Omar اللي إيميله null طلع [["no email"]]). و [[flatMap]] لو f نفسها بترجع Optional. و [[filter]] بيفضّيه لو الشرط مش متحقق.

[[orElse(x)]] بيحسب x دايمًا حتى لو فيه قيمة، و [[orElseGet(() -> x)]] بيحسبه بس لو فاضي؛ فرق مهم لو x استعلام أو object تقيل. و [[orElseThrow()]] من غير باراميتر بيرمي [[NoSuchElementException]]، ومع supplier بيرمي الـ exception بتاعك.

[[get()]] من غير ما تفحص بيرمي [[NoSuchElementException: No value present]]، فاستخدامه بيضيّع الفايدة كلها.`,
            when: R`نوع رجوع لـ methods ممكن متلاقيش (find و search و parse). مش للحقول، ولا باراميترات methods، ولا جوه collections (list فاضية أحسن من [[Optional<List>]])، ولا في الـ entities. Jackson بيعرف يحوّل Optional بس الـ DTOs الأحسن تبقى نوع عادي ممكن يبقى null.`,
            mistakes: R`[[if (opt.isPresent()) { opt.get() }]]: ده null check بشكل أطول؛ استخدم map و orElse. و method نوعها Optional وبترجع [[null]]: أسوأ الاتنين. و [[orElse(repository.save(...))]] وتستغرب إن الـ save بيتنفذ دايمًا: استخدم [[orElseGet]].`
          },
          lines: [
            "record فيه email ممكن يبقى null.",
            R`داتابيز وهمية. [[Map.of]] مبيقبلش null كقيمة، بس القيمة هنا User (وجواه null عادي).`,
            R`نوع الرجوع بيقول «ممكن متلاقيش».`,
            R`[[ofNullable]]: لو [[get]] رجّعت null يبقى Optional فاضي.`,
            "قفلة.",
            "main.",
            R`موجود: [[Sara]].`,
            R`مش موجود: [[guest]].`,
            R`موجود بس الإيميل null، و [[map]] بتحوّل null لفاضي: [[no email]].`,
            R`[[ifPresent]]: نفّذ لو موجود بس: [[found 1]].`,
            R`[[orElseThrow]] بـ exception بتاعنا. ده الشكل اللي هتكتبه في كل service.`,
            "قفلة."
          ],
          sol: R`[[findById(9).get()]]: [[NoSuchElementException: No value present]]. متستخدمش [[get()]] من غير ما تبقى متأكد، واستخدم [[orElseThrow]] برسالة واضحة.

و [[emailDomain]] تحت: [[Optional[example.com]]] لـ 1، و [[Optional.empty]] لـ 2 (إيميل null) و 9 (مش موجود). [[map(User::email)]] بتفضّي لو null، و [[filter]] بتفضّي لو مفيش [[@]]، و [[map]] التانية بتقص. كل خطوة بتعدّي الفاضي زي ما هو، زي [[?.]] في JS.`,
          solCode: R`record User(long id, String name, String email) {}

Map<Long, User> db = Map.of(1L, new User(1, "Sara", "sara@example.com"), 2L, new User(2, "Omar", null));

Optional<User> findById(long id) { return Optional.ofNullable(db.get(id)); }

Optional<String> emailDomain(long id) {
    return findById(id)
        .map(User::email)
        .filter(e -> e.contains("@"))
        .map(e -> e.substring(e.indexOf('@') + 1));
}

void main() {
    IO.println(emailDomain(1) + " " + emailDomain(2) + " " + emailDomain(9));
}`
        }
      ]
    },
    {
      t: "الأخطاء (exceptions)",
      l: 1,
      n: "checked و unchecked، و try-with-resources، و exceptions بتاعتك",
      items: [
        {
          cmd: "checked و unchecked",
          title: "ليه Java بتجبرك تمسك بعض الأخطاء، وبعضها لأ؟",
          desc: R`في Java فيه نوعين exceptions. الـ checked (زي [[IOException]]): الـ compiler بيجبرك يا تمسكها بـ [[try/catch]]، يا تكتب [[throws IOException]] في الـ signature. والـ unchecked (أي حاجة تحت [[RuntimeException]] زي [[IllegalArgumentException]] و [[NullPointerException]]): مش لازم تتمسك.

الفكرة الأصلية: checked للحاجات اللي برّه تحكّمك وممكن تتعافى منها (ملف مش موجود، شبكة وقعت)، و unchecked للغلطات في الكود نفسه. عمليًا، الكود الحديث و Spring بيميلوا للـ unchecked، و Spring بيحوّل أخطاء الداتابيز لـ [[DataAccessException]] وهي unchecked.`,
          example: R`import java.io.IOException;
import java.nio.file.*;

static String readConfig(Path path) throws IOException {
    return Files.readString(path);
}

static int parsePort(String raw) {
    return Integer.parseInt(raw.strip());
}

void main() {
    try {
        IO.println(readConfig(Path.of("missing.txt")));
    } catch (NoSuchFileException e) {
        IO.println("no file: " + e.getMessage());
    } catch (IOException e) {
        throw new UncheckedIOException(e);
    }
    IO.println(parsePort(" 8080 "));
    try {
        parsePort("abc");
    } catch (NumberFormatException e) {
        IO.println(e.getMessage());
    } finally {
        IO.println("finally runs always");
    }
}`,
          try: R`شيل [[throws IOException]] من [[readConfig]] واقرا الخطأ. وبعدين رجّعه وشيل الـ try/catch حوالين النداء. وأخيرًا بدّل ترتيب الـ catch (خلي [[IOException]] قبل [[NoSuchFileException]]).`,
          flag: "script",
          deep: {
            why: R`هتقابل الـ checked exceptions في أول مرة تقرا ملف أو تعمل HTTP call، وهتقابلها في الانترفيو («checked ولا unchecked؟»). وفي Spring هتحتاج تفهمها عشان [[@Transactional]] بيتعامل معاهم بشكل مختلف: بيعمل rollback على الـ unchecked بس افتراضيًا (درس فخاخ @Transactional).`,
            how: R`الشجرة: [[Throwable]] فوق الكل، وتحته [[Error]] (مشاكل في الـ JVM زي [[OutOfMemoryError]]، متمسكهاش) و [[Exception]]. تحت [[Exception]] فيه [[RuntimeException]] ودي وكل اللي تحتها unchecked، والباقي checked.

الـ catch بيتجرب بالترتيب، والأول اللي النوع بتاعه يطابق بيمسك. عشان كده الأخص ([[NoSuchFileException]] وهي IOException) لازم قبل الأعم، والـ compiler بيطلّع خطأ لو العكس. وتقدر تمسك كذا نوع في catch واحد: [[catch (IOException | SQLException e)]].

[[finally]] بيتنفذ دايمًا، سواء حصل exception أو لأ أو حتى لو فيه return.

[[UncheckedIOException]] طريقة شائعة تلف checked جوه unchecked لما مش هتعرف تتعافى منها، ومعاها الـ cause الأصلي فالـ stack trace كامل. الـ lambdas في streams مبتسمحش بـ checked exceptions، فهتحتاج الحركة دي كتير.`,
            when: R`اعمل throw لـ unchecked في كودك للأخطاء المنطقية (not found، و validation، و conflict)، وخلي [[@ControllerAdvice]] يحوّلها لـ HTTP response (درس الأخطاء في المستوى ٢). وامسك الـ checked في الحدود (ملفات وشبكة) ولفّها أو تعامل معاها.`,
            mistakes: R`[[catch (Exception e) {}]] فاضي: الغلطة اختفت ومحدش هيعرف. وأقل منه سوءًا [[e.printStackTrace()]] في الإنتاج بدل logger. و [[throws Exception]] على كل method عشان الـ compiler يسكت. وتلف exception من غير الـ cause: [[new RuntimeException("failed")]] بدل [[new RuntimeException("failed", e)]] فتضيع السبب الأصلي.`
          },
          lines: [
            "الـ checked exception الأشهر.",
            R`[[Files]] و [[Path]] للملفات.`,
            R`[[throws IOException]]: الـ method بتقول «ممكن أرمي ده، واللي بيناديني يتصرف».`,
            R`[[readString]] بترمي IOException (checked).`,
            "قفلة.",
            R`مفيش [[throws]]: [[parseInt]] بترمي [[NumberFormatException]] وهي unchecked.`,
            "تحويل string لـ int.",
            "قفلة.",
            "main.",
            R`[[try]] زي JS.`,
            "الملف مش موجود.",
            R`الأخص الأول: [[NoSuchFileException]] نوع من IOException.`,
            R`[[no file: missing.txt]].`,
            R`أي IOException تانية.`,
            R`نلفها في unchecked ونرميها، ومعاها الأصل.`,
            "قفلة.",
            R`[[8080]].`,
            "try تاني.",
            "string مش رقم.",
            R`نمسك unchecked لأننا عارفين نتصرف.`,
            R`[[For input string: "abc"]].`,
            R`[[finally]]: بيتنفذ في كل الحالات.`,
            R`[[finally runs always]].`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`١. من غير [[throws IOException]]: [[error: unreported exception IOException; must be caught or declared to be thrown]] على سطر [[Files.readString]]. الـ compiler بيجبرك تقرر.

٢. من غير الـ try/catch حوالين النداء: نفس الخطأ بس على سطر النداء في main. المسؤولية اتنقلت للي بينادي. (أو اكتب [[void main() throws IOException]]، ولو الملف مش موجود البرنامج هيقع بـ stack trace.)

٣. [[IOException]] قبل [[NoSuchFileException]]: [[error: exception NoSuchFileException has already been caught]]. الـ catch الأعم بيمسك كل حاجة قبل ما الأخص يتوصله.`
        },
        {
          cmd: "try-with-resources و custom exceptions",
          title: "تقفل الملفات والاتصالات لوحدها، وتعمل exception بمعلومات مفيدة",
          desc: R`أي حاجة لازم تتقفل بعد ما تخلص (ملف، أو connection، أو stream) بتتفتح في [[try (...)]]: Java بتقفلها أوتوماتيك في الآخر، حتى لو حصل exception. زي [[await using]] في JS الحديث.

والـ exception بتاعك: class بيورث من [[RuntimeException]] (غالبًا)، وفيه رسالة واضحة، ولو محتاج حقول زيادة (المبلغ الناقص، أو الـ id) ضيفها. وفي Spring كل exception من دول بيتحول لـ HTTP status برسالة مفهومة في مكان واحد.`,
          example: R`import java.io.*;
import java.nio.file.*;

class InsufficientFundsException extends RuntimeException {
    private final long missing;
    InsufficientFundsException(long missing) {
        super("missing " + missing + " cents");
        this.missing = missing;
    }
    long missing() { return missing; }
}

void withdraw(long balance, long amount) {
    if (amount > balance) throw new InsufficientFundsException(amount - balance);
}

void main() throws IOException {
    Path file = Files.writeString(Path.of("notes.txt"), "line 1\nline 2\n");
    try (BufferedReader reader = Files.newBufferedReader(file)) {
        IO.println(reader.readLine());
    }
    try {
        withdraw(100, 250);
    } catch (InsufficientFundsException e) {
        IO.println(e.getMessage() + " / " + e.missing());
    }
    Files.delete(file);
}`,
          try: R`اعمل class اسمه [[Resource]] بيعمل implements لـ [[AutoCloseable]] وبيطبع [["open"]] في الـ constructor و [["close"]] في [[close()]]. استخدمه في try-with-resources وارمي exception من جوه الـ try: [["close"]] اتطبعت قبل ولا بعد الـ catch؟`,
          flag: "script",
          deep: {
            why: R`connection مفتوحة ومتقفلتش = connection pool بيخلص بعد ساعة والتطبيق يهنج (أشهر مشاكل الإنتاج). والـ exceptions العامة ([[RuntimeException("error")]]) بتخلي الـ API يرجع 500 لكل حاجة، والـ logs مش مفهومة.`,
            how: R`أي class بينفذ [[AutoCloseable]] (فيه [[close()]]) ينفع في try-with-resources. Java بتنادي [[close()]] بعد الـ try block بالعكس من ترتيب الفتح، وقبل الـ catch و finally. ولو الـ try رمى exception والـ close كمان رمى، الأصلي هو اللي بيطلع والتاني بيتحط جواه كـ suppressed ([[getSuppressed()]]).

الـ custom exception: بيورث من [[RuntimeException]] عشان متجبرش كل اللي فوق يكتبوا throws، و [[super(message)]] للرسالة، وكمان [[super(message, cause)]] لو بتلف exception تاني.

في Spring غالبًا مش هتفتح connections بإيدك (Spring و Hibernate بيعملوا كده)، بس هتفتح ملفات و HTTP clients و streams.`,
            when: R`try-with-resources مع أي [[Closeable]] أو [[AutoCloseable]]، دايمًا. و custom exceptions لكل خطأ business ليه معنى: [[NotFoundException]] و [[InsufficientFundsException]] و [[DuplicateEmailException]]، عشان تتحول لـ 404 و 422 و 409 في مكان واحد.`,
            mistakes: R`تفتح stream أو reader وتقفله في آخر الـ try بإيدك: لو حصل exception قبله مش هيتقفل. و exception لكل حاجة صغيرة لحد ما يبقى عندك ٥٠ class. وتستخدم exceptions للـ flow العادي (زي «لو المستخدم مش موجود اعمل واحد»): الأبطأ والأصعب في القراية؛ استخدم Optional.`
          },
          lines: [
            "الـ IO القديم (Reader).",
            R`[[Files]].`,
            R`exception بتاعنا، unchecked لأنه تحت RuntimeException.`,
            "معلومة زيادة: المبلغ الناقص.",
            "constructor.",
            R`[[super]] بيحط الرسالة اللي [[getMessage()]] هترجعها.`,
            "الحقل.",
            "قفلة.",
            "getter.",
            "قفلة الـ class.",
            "method بترمي الـ exception بتاعنا.",
            R`[[throw new]] زي JS.`,
            "قفلة.",
            R`main بتقول إنها ممكن ترمي IOException (checked).`,
            "نكتب ملف تجربة.",
            R`try-with-resources: الـ reader هيتقفل لوحده.`,
            R`[[line 1]].`,
            "هنا الـ reader اتقفل.",
            "try عادي.",
            "سحب أكتر من الرصيد.",
            "نمسك النوع بتاعنا بالظبط.",
            R`[[missing 150 cents / 150]].`,
            "قفلة.",
            "نمسح ملف التجربة.",
            "قفلة."
          ],
          sol: R`الترتيب: [[open]]، وبعدين [[close]]، وبعدين [[caught: boom]]، وبعدين [[finally]]. الـ close بيتنادى أول ما الـ try block يخلص (حتى لو بـ exception)، وقبل الـ catch. ده مهم: جوه الـ catch الـ resource مقفول خلاص، فمتحاولش تستخدمه هناك.`,
          solCode: R`class Resource implements AutoCloseable {
    Resource() { IO.println("open"); }
    @Override public void close() { IO.println("close"); }
}

void main() {
    try (var r = new Resource()) {
        throw new IllegalStateException("boom");
    } catch (IllegalStateException e) {
        IO.println("caught: " + e.getMessage());
    } finally {
        IO.println("finally");
    }
}`
        }
      ]
    },
    {
      t: "تطبيقات ديسكتوب بـ Java (JavaFX و Swing)",
      l: 1,
      n: "برنامج ليه شباك وزراير على الكمبيوتر، وبعدين jar أو installer يتسطّب من غير ما اليوزر يكون عنده Java",
      items: [
        {
          cmd: "تطبيقات ديسكتوب: واجهات JavaFX و Swing",
          title: "تعمل برنامج ديسكتوب بشباك وزرار بـ Java إزاي، وتختار JavaFX ولا Swing؟",
          desc: R`Java مش للسيرفرات بس: تقدر تعمل بيها برنامج ليه شباك وزراير يشتغل على Windows و macOS و Linux. IntelliJ IDEA نفسه و NetBeans و Apache JMeter برامج ديسكتوب مكتوبة بـ Java.

عندك مكتبتين:
• [[Swing]]: جوه الـ JDK من زمان ([[javax.swing]])، فمش محتاج تنزّل أي حاجة. شكلها الافتراضي قديم شوية، بس ثابتة ومستخدمة في برامج كبيرة وأدوات داخلية كتير.
• [[JavaFX]]: أحدث، وفيها تنسيق بـ CSS، وتصميم الشاشات في ملفات FXML، و animations. بس من Java 11 مبقتش جوه الـ JDK: بتضيفها كمكتبة اسمها OpenJFX (من Maven أو Gradle، أو SDK بتنزّله من openjfx.io).
لو هتبدأ برنامج جديد، JavaFX غالبًا الاختيار الأريح. ولو بتعدّل برنامج قديم، غالبًا هتلاقيه Swing.

برنامج JavaFX شكله ثابت:
• الكلاس بيورث من [[Application]] ([[extends]] من درس «extends و abstract»).
• JavaFX بينادي دالة [[start]] وبيديك [[Stage]]: ده الشباك نفسه (العنوان وزراير القفل).
• جوه الشباك [[Scene]]: المحتوى كله، ومقاسه.
• والمحتوى عناصر (اسمها nodes) زي [[Label]] (كلام) و [[Button]] (زرار)، جوه layout زي [[VBox]] اللي بيرصهم تحت بعض.
• [[main]] بتنادي [[launch]]، و launch هي اللي بتجهّز JavaFX وتنادي start.

[[e -> message.setText(...)]] ده lambda (درس «lambdas»): الكود اللي يتنفذ لما الزرار يتضغط. و [[@Override]] بتقول إن start دي بتاعة Application وانت بتكتب نسختك منها.

الدرس الجاي بيحوّل البرنامج لملف تقدر تديه لحد يسطّبه.`,
          example: R`import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

// البرنامج بيورث من Application
public class DesktopApp extends Application {
  // JavaFX بينادي start وبيديك الشباك (Stage)
  @Override
  public void start(Stage stage) {
    Label message = new Label("Hello from JavaFX!");
    Button button = new Button("Click me");
    button.setOnAction(e -> message.setText("Button clicked!"));

    // VBox بيرص العناصر تحت بعض بمسافة 15 بيكسل
    VBox root = new VBox(15, message, button);
    Scene scene = new Scene(root, 360, 200);

    stage.setTitle("My first JavaFX app");
    stage.setScene(scene);
    stage.show();
  }

  public static void main(String[] args) {
    launch(args);
  }
}`,
          try: R`أسهل طريق: في IntelliJ IDEA اعمل New Project واختار JavaFX من القايمة الشمال (بيعمل مشروع Maven فيه JavaFX جاهزة). اعمل class جديدة اسمها [[DesktopApp]] جنب الكلاس اللي اتعمل، والصق الكود تحت سطر الـ [[package]]، واضغط Run الأخضر جنب [[main]]. اضغط الزرار وشوف الكلام بيتغير. ولو مش عايز تنزّل JavaFX دلوقتي، جرّب نسخة Swing اللي تحت في الحل: بتشتغل بـ [[java SwingApp.java]] على طول.`,
          flag: "script",
          deep: {
            why: R`فيه برامج مكانها الكمبيوتر مش المتصفح: برنامج كاشير في محل، أو أداة بتشتغل على ملفات كتير على الجهاز، أو برنامج لازم يشتغل من غير نت. ولو انت عارف Java أصلًا، تقدر تعملها من غير ما تتعلم لغة تانية، ونفس الكود يشتغل على الأنظمة التلاتة.`,
            how: R`JavaFX بيبني الشاشة شجرة: الـ Stage جواه Scene، والـ Scene جواها root (هنا VBox)، والـ root جواه الـ Label والـ Button. لما تغيّر حاجة في الشجرة (زي [[setText]]) JavaFX بيرسم التغيير في الفريم الجاي، وبيستخدم كارت الشاشة في الرسم لما يقدر.

كل حاجة ليها علاقة بالواجهة لازم تحصل على thread واحد اسمه JavaFX Application Thread. [[start]] والـ lambda بتاعة الزرار بيشتغلوا عليه أصلًا، فمفيش مشكلة هنا. بس لو عملت شغل تقيل (تحميل ملف كبير) على thread تاني وعايز تحدّث الواجهة بعده، استخدم [[Platform.runLater(() -> ...)]].

ليه مش [[java DesktopApp.java]] على طول زي باقي دروس Java؟ لأن JavaFX مش جوه الـ JDK. لو نزّلت الـ SDK من openjfx.io بتترجم وتشغّل كده:
[[javac --module-path PATH_TO_FX/lib --add-modules javafx.controls -d out DesktopApp.java]]
[[java --module-path PATH_TO_FX/lib --add-modules javafx.controls -cp out DesktopApp]]
وطريقة الملف الواحد ([[java DesktopApp.java]]) مع JavaFX بتفشل بـ [[ClassNotFoundException: DesktopApp]] حتى لو ضفت الـ module-path، عشان كده بنترجم الأول.`,
            when: "أدوات داخلية لشركة، أو برامج نقاط بيع، أو برامج لازم تشتغل offline أو تتعامل مع ملفات وأجهزة متوصلة بالكمبيوتر. لو البرنامج محتاج يتفتح من أي مكان ومن الموبايل، غالبًا موقع ويب أنسب.",
            mistakes: R`تحاول [[java DesktopApp.java]] من غير JavaFX فيطلعلك [[package javafx.application does not exist]]. تحدّث الواجهة من thread تاني فيطلعلك [[IllegalStateException: Not on FX application thread]] أو الواجهة تتصرف غلط: استخدم [[Platform.runLater]]. وتعمل شغل تقيل جوه الـ lambda بتاعة الزرار، فالشباك كله يهنّج لحد ما يخلص.`
          },
          lines: [
            R`[[Application]]: الأساس اللي أي برنامج JavaFX بيورث منه.`,
            R`[[Scene]]: المحتوى اللي جوه الشباك.`,
            R`[[Button]]: زرار.`,
            R`[[Label]]: كلام بيتعرض.`,
            R`[[VBox]]: layout بيرص العناصر تحت بعض.`,
            R`[[Stage]]: الشباك نفسه.`,
            R`الكلاس بيورث من Application.`,
            R`[[@Override]]: هنكتب نسختنا من start.`,
            R`JavaFX بينادي start ويديك الشباك في [[stage]].`,
            R`[[new Label(...)]]: كلام أوله «Hello from JavaFX!».`,
            R`زرار مكتوب عليه «Click me».`,
            R`لما الزرار يتضغط، غيّر كلام الـ Label. [[e]] هو الـ event (مش مستخدم هنا).`,
            R`VBox: مسافة 15 بين العناصر، وجواه الكلام والزرار.`,
            R`المحتوى بمقاس 360 عرض × 200 طول.`,
            R`العنوان اللي فوق في شريط الشباك.`,
            R`حط المحتوى في الشباك.`,
            R`اعرض الشباك.`,
            R`آخر start.`,
            R`[[main]] نقطة البداية.`,
            R`[[launch]] بيجهّز JavaFX وينادي start.`,
            R`آخر main.`,
            R`آخر الكلاس.`
          ],
          sol: R`بيفتح شباك صغير عنوانه «My first JavaFX app»، فيه فوق «Hello from JavaFX!» وتحته زرار «Click me»، الاتنين على الشمال لأن VBox بيرص من فوق ومن الشمال افتراضيًا. لما تضغط الزرار الكلام بيبقى «Button clicked!». والبرنامج بيقفل لما تقفل الشباك.

لو طلعلك [[package javafx.application does not exist]] أو [[JavaFX runtime components are missing]]، يبقى JavaFX مش متضافة للمشروع: استخدم مشروع IntelliJ بتاع JavaFX أو أوامر [[--module-path]] اللي في «إزاي».

نسخة Swing من نفس البرنامج (احفظها [[SwingApp.java]] وشغّلها بـ [[java SwingApp.java]]، مش محتاجة أي حاجة غير الـ JDK): بتفتح شباك فيه الكلام والزرار جنب بعض في سطر واحد في نص الشباك من فوق، لأن [[JPanel]] بيرص العناصر جنب بعض افتراضيًا. نفس الفكرة بالظبط: شباك ([[JFrame]])، وعناصر، و lambda للزرار. و [[SwingUtilities.invokeLater]] هي اللي بتخلي الواجهة تتعمل على الـ thread بتاعها، زي [[Platform.runLater]] في JavaFX.`,
          solCode: R`import javax.swing.*;

public class SwingApp {
  public static void main(String[] args) {
    SwingUtilities.invokeLater(() -> {
      JFrame frame = new JFrame("My first Swing app");
      JLabel message = new JLabel("Hello from Swing!");
      JButton button = new JButton("Click me");
      button.addActionListener(e -> message.setText("Button clicked!"));
      JPanel panel = new JPanel();
      panel.add(message);
      panel.add(button);
      frame.add(panel);
      frame.setSize(360, 200);
      frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
      frame.setVisible(true);
    });
  }
}`
        },
        {
          cmd: "تحزيم ونشر برنامج ديسكتوب بـ jpackage",
          title: "تدّي برنامج Java لحد يسطّبه من غير ما يكون عنده Java إزاي؟ (jar و jpackage)",
          desc: R`لما البرنامج يخلص، مش هتبعت للناس ملفات [[.java]] ولا [[.class]]. عندك خطوتين:

١) ملف [[jar]]: كل الـ [[.class]] بتوع البرنامج متجمعين في ملف واحد (هو zip في الحقيقة)، وجواه سطر بيقول أنهي class فيها [[main]]. بيشتغل بـ [[java -jar app.jar]]، أو بدبل كليك عند ناس كتير. بس لازم الجهاز يكون عليه Java بنسخة مناسبة.

٢) [[jpackage]]: أداة جوه الـ JDK (من Java 16). بتاخد الـ jar، وتحط جنبه Java runtime خاص بالبرنامج (معمول بأداة اسمها [[jlink]])، وتطلّع installer عادي للنظام:
• Windows: [[.exe]] أو [[.msi]]. محتاج WiX Toolset متسطّب.
• macOS: [[.dmg]] أو [[.pkg]].
• Linux: [[.deb]] أو [[.rpm]].
اللي هيسطّب البرنامج مش محتاج يعرف إن فيه Java أصلًا.

حاجتين لازم تعرفهم قبل ما تبدأ:
• jpackage بيعمل installer للنظام اللي شغال عليه بس: الـ [[.exe]] لازم يتعمل على Windows، والـ [[.dmg]] على Mac. عشان كده الفرق بتعمل الـ installers على CI فيه أجهزة من الأنظمة التلاتة.
• الحجم: لأن جوه البرنامج Java runtime، حتى برنامج صغير بيطلع عشرات الميجات. تقدر تصغّره بإنك تحدد الـ modules اللي محتاجها بـ [[--add-modules]].

المثال بيحزّم نسخة Swing من الدرس اللي فات ([[SwingApp.java]] اللي في الحل هناك)، لأنها مش محتاجة أي مكتبة برا الـ JDK. برنامج JavaFX نفس الخطوات، بس بتزوّد لـ jpackage مكان JavaFX ([[--module-path]] لفولدر الـ jmods بتاعها) و [[--add-modules javafx.controls]].`,
          example: R`# ترجم الكود لـ bytecode في فولدر bin
javac -d bin SwingApp.java

# اجمعه في jar في فولدر dist، وقول فيه مين الكلاس اللي فيها main
jar --create --file dist/app.jar --main-class SwingApp -C bin .

# جرّب الـ jar
java -jar dist/app.jar

# installer لويندوز (على Windows، و WiX متسطّب)
jpackage --input dist --main-jar app.jar --name MyDesktopApp --type exe --win-shortcut --win-dir-chooser`,
          try: R`في فولدر فيه [[SwingApp.java]] نفّذ أول ٣ أوامر، واتأكد إن الشباك فتح من الـ jar. بعدين جرّب jpackage من غير installer خالص، وده بيشتغل على أي نظام ومش محتاج WiX: [[jpackage --input dist --main-jar app.jar --name MyDesktopApp --type app-image]]، وشغّل البرنامج من الفولدر اللي اتعمل، وشوف حجمه. ولو على Windows ومسطّب WiX، جرّب الأمر الرابع.`,
          flag: "script",
          deep: {
            why: R`أكبر مشكلة كانت في برامج Java الديسكتوب إن اليوزر لازم يسطّب Java الأول، وبالنسخة الصح. jpackage بيحل ده: كل برنامج معاه الـ runtime بتاعه، فمش فارق إيه اللي متسطّب على الجهاز، والبرنامج بيتسطّب ويتشال زي أي برنامج تاني.`,
            how: R`[[javac -d bin]] بيحط الـ [[.class]] في فولدر bin. [[jar --create]] بيجمعهم، و [[--main-class]] بيكتب في ملف جوه الـ jar اسمه [[MANIFEST.MF]] سطر [[Main-Class: SwingApp]]، ودا اللي بيخلي [[java -jar]] يعرف يبدأ منين. و [[-C bin .]] معناها «خش فولدر bin وخد كل اللي فيه».

jpackage بياخد كل اللي في فولدر [[--input]] (عشان كده بنحط الـ jar لوحده في dist، مش في فولدر فيه الكود كله)، ويعمل runtime بـ jlink، ويحطهم مع launcher (البرنامج اللي اليوزر بيدوس عليه) في installer. [[--win-shortcut]] بيعمل اختصار على الديسكتوب، و [[--win-dir-chooser]] بيخلي اليوزر يختار مكان التسطيب.

ومن غير ما تحدد modules، jpackage بيحط runtime كبير فيه modules كتير. لو شغّلت [[jdeps --print-module-deps dist/app.jar]] هيقولك البرنامج محتاج إيه بالظبط (هنا [[java.base,java.desktop]])، وتبعتهم لـ jpackage بـ [[--add-modules java.desktop]]. في تجربة على Linux بـ JDK 21، فولدر app-image لنسخة Swing دي طلع حوالي 160 ميجا من غير تحديد، وحوالي 90 ميجا مع [[--add-modules java.desktop]]، والـ installer بيبقى أصغر لأنه مضغوط.`,
            when: "لما تسلّم برنامج ديسكتوب لناس مش مبرمجين: عميل، أو موظفين في شركة. للتجربة بينك وبين مبرمجين تانيين الـ jar كفاية.",
            mistakes: R`تبعت ملفات [[.class]] أو الكود نفسه لليوزر. تشغّل jpackage بـ [[--input .]] فيتحط في البرنامج كل اللي في الفولدر (الكود والـ bin وأي حاجة تانية). تحاول تعمل [[.exe]] من Linux أو Mac، أو من غير WiX فيطلعلك error إنه مش لاقي الأدوات. وتنسى [[--main-class]] في الـ jar فيطلعلك [[no main manifest attribute, in dist/app.jar]].`
          },
          lines: [
            R`ترجم [[SwingApp.java]]، و [[-d bin]] معناها حط الـ [[.class]] في فولدر bin.`,
            R`اعمل [[dist/app.jar]] من محتوى bin، واكتب فيه إن البداية من [[SwingApp]].`,
            R`شغّل الـ jar زي ما اليوزر هيشغّله لو عنده Java.`,
            R`اعمل installer اسمه MyDesktopApp من الـ jar اللي في dist، مع اختصار على الديسكتوب واختيار مكان التسطيب.`
          ],
          sol: R`بعد أول أمرين هتلاقي [[bin/SwingApp.class]] و [[dist/app.jar]] (حجمه أقل من 2 كيلو). [[java -jar dist/app.jar]] بيفتح نفس شباك Swing.

[[--type app-image]] بيعمل فولدر اسمه [[MyDesktopApp]]، والبرنامج جواه: على Windows [[MyDesktopApp\MyDesktopApp.exe]]، وعلى Linux [[MyDesktopApp/bin/MyDesktopApp]]، وعلى Mac [[MyDesktopApp.app]]. دوس عليه: نفس الشباك، من غير ما يستخدم Java اللي على جهازك. حجم الفولدر حوالي 160 ميجا لأن جواه runtime كامل تقريبًا. أعد الأمر وزوّد [[--add-modules java.desktop]] (بعد ما تمسح الفولدر القديم) وهتلاقيه حوالي 90 ميجا.

والأمر الرابع على Windows بيطلّع [[MyDesktopApp-1.0.exe]] (1.0 هي النسخة الافتراضية، وتغيّرها بـ [[--app-version]]). لو طلعلك إنه مش لاقي WiX، سطّبه وزوّده للـ PATH وجرّب تاني.`
        }
      ]
    },
    {
      t: "Maven و Gradle",
      l: 2,
      n: "الـ package.json والـ npm بتوع Java: ملف المشروع، والمكتبات، وأوامر الـ build",
      items: [
        {
          cmd: "pom.xml",
          title: "ملف المشروع في Maven: المكتبات والإصدارات فين؟",
          desc: R`[[pom.xml]] هو [[package.json]] بتاع Maven: اسم المشروع، ونسخة Java، والمكتبات (dependencies)، والـ plugins اللي بتعمل build. المكتبات بتتحمّل من Maven Central (زي npm registry) وبتتخزن في [[~/.m2/repository]] مرة واحدة لكل الجهاز، مش [[node_modules]] لكل مشروع.

في Spring Boot الـ pom بيورث من [[spring-boot-starter-parent]]: ده بيحدد إصدارات كل المكتبات المتوافقة مع بعض، فانت بتكتب المكتبة من غير version. والـ starters ([[spring-boot-starter-webmvc]] و [[spring-boot-starter-data-jpa]]...) كل واحد بيجيب مجموعة مكتبات متظبطة مع بعض.`,
          example: R`<project>
  <modelVersion>4.0.0</modelVersion>
  <parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>4.1.1</version>
  </parent>
  <groupId>com.example</groupId>
  <artifactId>tasks-api</artifactId>
  <version>0.0.1-SNAPSHOT</version>
  <properties>
    <java.version>25</java.version>
  </properties>
  <dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-webmvc</artifactId>
    </dependency>
    <dependency>
      <groupId>org.postgresql</groupId>
      <artifactId>postgresql</artifactId>
      <scope>runtime</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <artifactId>spring-boot-starter-webmvc-test</artifactId>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>`,
          try: R`في مشروع من start.spring.io شغّل [[./mvnw dependency:tree]] ودوّر على [[jackson]] و [[tomcat]]: جم منين وانت مكتبتهمش؟ وبعدين ضيف [[<version>1.0</version>]] على [[spring-boot-starter-webmvc]] وشوف Maven بيقول إيه.`,
          flag: "script",
          deep: {
            why: R`كل مشروع Java في الشغل بيبدأ من الملف ده. لو فهمته هتعرف تضيف مكتبة، وتعرف ليه مكتبتين بيتخانقوا على إصدار، وليه التست مش شايف مكتبة معينة.`,
            how: R`كل مكتبة ليها إحداثيات: [[groupId]] (الشركة، زي scope في npm) و [[artifactId]] (الاسم) و [[version]]. والـ scope: [[compile]] (الافتراضي، زي dependencies)، و [[runtime]] (مش محتاجها وقت الـ compile، زي driver الداتابيز)، و [[test]] (زي devDependencies بس للتستات)، و [[provided]].

الـ parent بيعمل حاجتين: dependencyManagement (جدول إصدارات مجرّبة مع بعض، اسمه BOM) وإعدادات plugins جاهزة. لو محتاج إصدار مختلف لمكتبة، بتغيّر property زي [[<postgresql.version>]] بدل ما تكتب version على الـ dependency.

Maven بيحل الـ transitive dependencies (مكتبات المكتبات) لوحده، ولو فيه نسختين من نفس المكتبة بياخد الأقرب في الشجرة. وده سبب مشاكل [[NoSuchMethodError]] الغريبة، و [[dependency:tree]] هو اللي بيكشفها.

في Spring Boot 4 الـ starters اتقسمت أكتر: [[spring-boot-starter-webmvc]] (الاسم القديم [[spring-boot-starter-web]] لسه موجود بس deprecated)، ولكل starter غالبًا starter تست خاص بيه زي [[spring-boot-starter-webmvc-test]].`,
            when: R`كل ما تضيف مكتبة. واستخدم start.spring.io أو صفحة المكتبة على Maven Central عشان تجيب الإحداثيات الصح.`,
            mistakes: R`تكتب [[<version>]] لمكتبة الـ parent بيديرها فتكسر التوافق. وتحط مكتبة تست من غير [[<scope>test</scope>]] فتدخل في الـ jar النهائي. وتنسى [[runtime]] للـ driver ده مش غلط كبير بس بيوضح النية. وتنسخ dependency من مقالة قديمة لـ Boot 2 فيها [[javax.*]]: من Boot 3 كل حاجة بقت [[jakarta.*]].`
          },
          lines: [
            "بداية ملف المشروع.",
            "نسخة صيغة الـ pom، ثابتة دايمًا 4.0.0.",
            R`الأب: منه بتيجي إصدارات كل المكتبات.`,
            "الـ group بتاع Spring Boot.",
            "الـ parent الرسمي.",
            R`إصدار Spring Boot. في سبتمبر ٢٠٢٦ آخر إصدار مستقر 4.1.x.`,
            "قفلة الـ parent.",
            R`الـ group بتاع مشروعك، عادة الدومين بالعكس.`,
            "اسم المشروع.",
            R`[[SNAPSHOT]] يعني نسخة لسه بتتطور.`,
            "إعدادات.",
            R`نسخة Java اللي هيتعمل بيها compile.`,
            "قفلة.",
            "المكتبات.",
            "مكتبة.",
            "من Spring Boot.",
            R`starter الويب: Spring MVC و Tomcat و Jackson. من غير version لأن الـ parent بيحدده.`,
            "قفلة.",
            "مكتبة.",
            "driver بتاع PostgreSQL.",
            "الاسم.",
            R`[[runtime]]: الكود مش بيستخدمه مباشرة، بس لازم يبقى موجود وقت التشغيل.`,
            "قفلة.",
            "مكتبة.",
            "من Spring Boot.",
            R`أدوات التست: JUnit و Mockito و AssertJ و MockMvc.`,
            R`[[test]]: متاحة للتستات بس، ومش هتدخل الـ jar.`,
            "قفلة.",
            "قفلة المكتبات.",
            "قفلة الملف."
          ],
          sol: R`في [[dependency:tree]] هتلاقي [[tomcat-embed-core]] تحت [[spring-boot-starter-tomcat]] تحت [[spring-boot-starter-webmvc]]، و Jackson تحت starter الـ JSON. مكتبتهمش لأن الـ starter جابهم (transitive). وفي Spring Boot 4 هتلاقي Jackson 3 ([[tools.jackson.core:jackson-databind]]) بدل [[com.fasterxml.jackson]] القديم.

ولما تكتب [[<version>1.0</version>]] على الـ starter: Maven هيحاول يجيب [[spring-boot-starter-webmvc:1.0]] ومش هيلاقيها، فالـ build يقع بـ [[Could not find artifact]]. ولو كتبت version موجودة بس مختلفة عن الـ parent، الـ build ممكن يعدّي ويقع وقت التشغيل بسبب عدم توافق. القاعدة: سيب الـ parent يحدد.`
        },
        {
          cmd: "mvnw",
          title: "تعمل build وتشغّل وتختبر المشروع بأوامر Maven",
          desc: R`[[mvnw]] (Maven wrapper) سكربت جوه المشروع بيحمّل نسخة Maven المظبوطة لوحده، فمش محتاج تسطّب Maven، وكل الفريق والـ CI بيستخدموا نفس النسخة. زي [[npx]] بالظبط.

الأوامر الأساسية: [[./mvnw spring-boot:run]] يشغّل (زي [[npm run dev]])، و [[./mvnw test]] التستات، و [[./mvnw package]] يطلّع jar في [[target/]] تشغّله بـ [[java -jar]] (زي [[npm run build]]). على ويندوز [[mvnw.cmd]].`,
          example: R`./mvnw spring-boot:run
./mvnw test
./mvnw test -Dtest=TaskControllerTest
./mvnw clean package -DskipTests
java -jar target/tasks-api-0.0.1-SNAPSHOT.jar
./mvnw dependency:tree
./mvnw versions:display-dependency-updates`,
          try: R`في مشروع من start.spring.io شغّل [[./mvnw package]] وشوف الـ jar طلع فين وحجمه كام ([[ls -lh target/*.jar]]). شغّله بـ [[java -jar]]، وبعدين بـ [[java -jar target/*.jar --server.port=9090]]. إيه اللي اتغير؟`,
          deep: {
            why: R`ده اللي هتكتبه كل يوم، وهو نفسه اللي بيتكتب في Dockerfile والـ CI. والـ jar الواحد اللي فيه كل حاجة (fat jar) هو طريقة الـ deploy العادية لـ Spring Boot.`,
            how: R`Maven بيشتغل بـ lifecycle phases بالترتيب: [[validate]] ← [[compile]] ← [[test]] ← [[package]] ← [[verify]] ← [[install]]. لما تطلب [[package]] بيعدّي على اللي قبله كله، فالتستات بتشتغل إلا لو [[-DskipTests]]. و [[clean]] بيمسح [[target/]].

[[spring-boot:run]] ده goal من الـ plugin بتاع Spring Boot: بيعمل compile ويشغّل من غير ما يعمل jar. والـ plugin نفسه في [[package]] بيعمل repackage: بيحط كودك وكل المكتبات في jar واحد ومعاه launcher. عشان كده الحجم عشرات الميجات.

[[-D]] بيحط system property: [[-Dtest=...]] يختار تست، و [[-DskipTests]] يتخطاهم. والـ arguments بعد [[java -jar app.jar]] زي [[--server.port=9090]] بتغيّر أي إعداد في Spring (درس الإعدادات).`,
            when: R`[[spring-boot:run]] أو زرار Run في IntelliJ وانت بتطوّر. [[test]] قبل كل push. [[package]] في الـ CI والـ Docker. و [[dependency:tree]] لما مكتبة تتصرف غريب.`,
            mistakes: R`تستخدم [[mvn]] المتسطّب على جهازك بدل [[./mvnw]] فتشتغل بنسخة مختلفة عن الـ CI. و [[-DskipTests]] كعادة فالتستات تبوظ ومحدش ياخد باله. وتنسى إن [[./mvnw]] محتاج صلاحية تشغيل على لينكس ([[chmod +x mvnw]]) لو اتنسخ من ويندوز. وتشغّل بـ JDK غلط: Maven بياخد [[JAVA_HOME]].`
          },
          lines: [
            "شغّل التطبيق وانت بتطوّر.",
            "شغّل كل التستات.",
            R`تست class واحد بس.`,
            R`امسح القديم واعمل jar من غير تستات (في Docker مثلًا بعد ما الـ CI اختبر).`,
            "شغّل الـ jar: ده كل اللي محتاجه السيرفر، Java بس.",
            "شجرة المكتبات ومين جاب مين.",
            "إيه المكتبات اللي ليها إصدارات أحدث."
          ],
          sol: R`الـ jar بيطلع في [[target/]] باسم [[artifactId-version.jar]]، وحجمه غالبًا بين ٢٠ و ٦٠ ميجا حسب الـ starters، لأن فيه Tomcat و Spring وكل المكتبات. (هتلاقي كمان [[.jar.original]] صغير: ده كودك بس قبل الـ repackage.)

مع [[--server.port=9090]] اللوج هيقول [[Tomcat started on port 9090]] بدل 8080: أي إعداد في [[application.yaml]] ينفع يتغير من الـ command line أو من environment variable ([[SERVER_PORT=9090]]) من غير ما تعيد build. ولو لقيت [[Port 8080 was already in use]]، فيه نسخة تانية شغالة.`
        },
        {
          cmd: "Gradle",
          title: "نفس المشروع بـ Gradle: build.gradle.kts",
          desc: R`Gradle هو البديل التاني الشائع (وهو اللي Android بيستخدمه). بدل XML، الـ build مكتوب كود بـ Kotlin DSL في [[build.gradle.kts]]، وأقصر بكتير. وفيه wrapper برضه: [[./gradlew]].

الأوامر المقابلة: [[./gradlew bootRun]] للتشغيل، و [[./gradlew test]]، و [[./gradlew bootJar]] يطلّع الـ jar في [[build/libs/]]. والـ scopes بقت أسماء configurations: [[implementation]] و [[runtimeOnly]] و [[testImplementation]].`,
          example: R`plugins {
    java
    id("org.springframework.boot") version "4.1.1"
    id("io.spring.dependency-management") version "1.1.7"
}
group = "com.example"
java {
    toolchain { languageVersion = JavaLanguageVersion.of(25) }
}
repositories { mavenCentral() }
dependencies {
    implementation("org.springframework.boot:spring-boot-starter-webmvc")
    runtimeOnly("org.postgresql:postgresql")
    testImplementation("org.springframework.boot:spring-boot-starter-webmvc-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}
tasks.withType<Test> { useJUnitPlatform() }`,
          try: R`اعمل مشروع من start.spring.io واختار «Gradle - Kotlin». شغّل [[./gradlew bootJar]] مرتين ورا بعض وقارن الوقت. وبعدين [[./gradlew dependencies --configuration runtimeClasspath]].`,
          flag: "script",
          deep: {
            why: R`هتلاقي الاتنين في الشركات بنسب قريبة، والمهم تعرف تقرا الاتنين. Gradle أسرع في المشاريع الكبيرة بسبب الكاش والـ incremental builds، و Maven أبسط وأثبت.`,
            how: R`Gradle بيبني graph من الـ tasks ([[compileJava]] و [[test]] و [[bootJar]]...)، وكل task بيعرف مدخلاته ومخرجاته، فلو ماتغيرش حاجة بيقول [[UP-TO-DATE]] ومبيعيدش. وفيه daemon بيفضل شغال في الخلفية عشان المرات الجاية تبقى أسرع.

الـ toolchain بيقول «اعمل compile بـ Java 25» حتى لو Gradle نفسه شغال بـ JDK تاني، و Gradle بيدوّر على JDK مناسب على الجهاز.

الـ plugin [[io.spring.dependency-management]] بيعمل نفس شغل الـ parent في Maven: إصدارات المكتبات من غير ما تكتبها. و [[testRuntimeOnly("org.junit.platform:junit-platform-launcher")]] مطلوبة في Gradle الحديث عشان JUnit يشتغل.`,
            when: R`لو المشروع أو الفريق عنده اختيار موجود امشي عليه. في مشروع جديد: Maven لو عايز أبسط حاجة، و Gradle لو المشروع كبير أو multi-module أو عندك خبرة Kotlin.`,
            mistakes: R`تخلط Groovy DSL ([[build.gradle]] بـ [[implementation '...']]) و Kotlin DSL ([[build.gradle.kts]] بـ [[implementation("...")]]): الأمثلة على النت نصها ده ونصها ده. وتسطّب Gradle globally بإصدار مختلف عن الـ wrapper. وتنسى إن الـ jar في [[build/libs]] مش [[target]] وانت بتكتب Dockerfile.`
          },
          lines: [
            "الـ plugins.",
            "دعم Java الأساسي.",
            R`plugin بتاع Spring Boot: بيضيف [[bootRun]] و [[bootJar]].`,
            "إدارة إصدارات المكتبات من الـ BOM بتاع Boot.",
            "قفلة.",
            R`زي [[groupId]].`,
            "إعدادات Java.",
            R`اعمل compile بـ Java 25.`,
            "قفلة.",
            R`المكتبات من Maven Central.`,
            "المكتبات.",
            R`[[implementation]] زي compile scope.`,
            R`[[runtimeOnly]] زي runtime.`,
            R`[[testImplementation]] زي test.`,
            "الـ launcher بتاع JUnit، مطلوب لتشغيل التستات.",
            "قفلة.",
            R`شغّل التستات بـ JUnit 5/6 (Jupiter).`
          ],
          sol: R`أول [[bootJar]] بياخد وقت (تحميل Gradle والمكتبات والـ daemon)، والتاني ثواني وهتلاقي [[BUILD SUCCESSFUL]] والـ tasks كلها [[UP-TO-DATE]]، لأن مفيش مدخلات اتغيرت. الـ jar في [[build/libs/]].

و [[dependencies --configuration runtimeClasspath]] بيطبع نفس فكرة [[mvn dependency:tree]]: الشجرة الكاملة، والإصدارات اللي اتحلت بـ [[->]] لو فيه أكتر من نسخة اتطلبت.`
        }
      ]
    },
    {
      t: "أول تطبيق Spring Boot",
      l: 2,
      n: "تعمل المشروع، وتفهم الـ auto-configuration، وإزاي Spring بيعمل الـ objects ويوصّلها ببعض",
      items: [
        {
          cmd: "start.spring.io",
          title: "تعمل مشروع Spring Boot جديد وتفهم شكله",
          desc: R`start.spring.io هو [[npm create vite]] بتاع Spring: تختار Maven أو Gradle، و Java 25، والـ dependencies (Spring Web و Spring Data JPA و PostgreSQL Driver و Validation و Flyway...)، وتنزّل zip فيه مشروع جاهز. ونفس الحاجة موجودة جوه IntelliJ و VS Code.

المشروع فيه: [[src/main/java]] للكود، و [[src/main/resources/application.properties]] (أو [[.yaml]]) للإعدادات، و [[src/test/java]] للتستات، والـ wrapper ([[mvnw]]). والـ packages بالدومين بالعكس: [[com.example.tasks]].`,
          example: R`curl https://start.spring.io/starter.zip -d type=maven-project -d javaVersion=25 -d groupId=com.example -d artifactId=tasks-api -d dependencies=web,data-jpa,postgresql,validation,flyway,actuator -o tasks-api.zip
unzip tasks-api.zip -d tasks-api && cd tasks-api
tree src
./mvnw spring-boot:run`,
          try: R`اعمل مشروع فيه Spring Web بس، وشغّله، وافتح [[localhost:8080]]. إيه اللي ظهر؟ وبعدين ضيف PostgreSQL Driver و Spring Data JPA من غير أي إعدادات وشغّل تاني: التطبيق قام؟`,
          deep: {
            why: R`البداية الصح بتوفّر ساعات: إصدارات متوافقة، وهيكل كل مطور Java يعرفه، و wrapper، وتست جاهز بيتأكد إن التطبيق بيقوم.`,
            how: R`الـ package الأساسي فيه class عليه [[@SpringBootApplication]] (الدرس الجاي)، وكل الكود لازم يبقى في الـ package ده أو تحته عشان Spring يلاقيه. التنظيم الشائع: package لكل feature ([[tasks]] و [[users]]) جواه controller و service و repository و entity، أحسن من package لكل نوع ([[controllers]] و [[services]]) في المشاريع الكبيرة.

الـ dependency IDs في الـ API ([[web]] و [[data-jpa]]...) هي نفس اللي في الواجهة. وفيه starters مهمة للتطوير: [[devtools]] (restart أوتوماتيك لما تحفظ) و [[docker-compose]] (بيشغّل [[compose.yaml]] اللي في المشروع لوحده وبيوصّل الـ datasource).

التطبيق فيه Tomcat جواه (embedded server)، فمش محتاج تسطّب server: [[java -jar]] بيفتح بورت 8080.`,
            when: R`كل مشروع جديد. ولو بتضيف feature لمشروع موجود، استخدم الموقع عشان تعرف اسم الـ starter الصح وبعدين ضيفه للـ pom.`,
            mistakes: R`تحط classes برّه الـ package الأساسي فـ Spring ميلاقيهاش (الـ endpoint يرجع 404 من غير أي خطأ). وتختار كل الـ dependencies «عشان لو احتجتها»: كل starter بيعمل auto-configuration، و JPA من غير داتابيز بيوقع التطبيق. وتنزّل مثال من النت بـ Spring Boot 2 و [[javax]].`
          },
          lines: [
            R`بيطلب zip من الموقع بالاختيارات: Maven و Java 25 والـ starters. (دي نفس اختيارات الواجهة.)`,
            "فك الملف وادخل الفولدر.",
            "شوف الهيكل.",
            "شغّل."
          ],
          sol: R`مع Spring Web بس: التطبيق بيقوم على 8080، و [[localhost:8080]] بيعرض «Whitelabel Error Page» بـ 404، لأن مفيش controller لسه. ده طبيعي ومعناه إن Tomcat شغال.

ولما تضيف JPA و PostgreSQL من غير إعدادات: التطبيق بيقع وقت البداية بـ [[APPLICATION FAILED TO START]] و [[Failed to configure a DataSource: 'url' attribute is not specified]]. الـ auto-configuration شاف JPA فحاول يوصّل بداتابيز ومش لاقي عنوان. الحل: [[spring.datasource.url]] (درس الـ entities)، أو starter [[docker-compose]] مع [[compose.yaml]] فيه postgres.`
        },
        {
          cmd: "@SpringBootApplication",
          title: "إزاي Spring بيشغّل Tomcat ويوصّل الداتابيز من غير ما تكتب حاجة؟",
          desc: R`[[@SpringBootApplication]] على الـ main class بيجمع ٣ حاجات: [[@Configuration]] (الـ class ده ممكن يعرّف beans)، و [[@ComponentScan]] (دوّر في الـ package ده وتحته على classes عليها [[@Component]] و [[@Service]] و [[@RestController]]...)، و [[@EnableAutoConfiguration]].

الـ auto-configuration هي السحر: Spring Boot بيبص على المكتبات الموجودة والإعدادات، ويعمل الحاجات المعتادة لوحده. لقى Tomcat و Spring MVC؟ يشغّل web server. لقى driver وعنوان داتابيز؟ يعمل connection pool. وأي حاجة تعرّفها انت بنفسك بتكسب على الافتراضي.`,
          example: R`package com.example.tasks;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TasksApplication {
  public static void main(String[] args) {
    SpringApplication.run(TasksApplication.class, args);
  }
}`,
          try: R`شغّل التطبيق بـ [[--debug]] ([[./mvnw spring-boot:run -Dspring-boot.run.arguments=--debug]] أو [[java -jar app.jar --debug]]) ودوّر في اللوج على «CONDITIONS EVALUATION REPORT». لاقي [[DataSourceAutoConfiguration]] في أنهي قسم، وليه.`,
          flag: "script",
          deep: {
            why: R`في Spring القديم كنت بتكتب مئات السطور XML عشان توصّل كل حاجة. Boot بيعمل الافتراضي المعقول وانت بتغيّر اللي محتاجه بس. لكن لو مفهمتش الآلية، أول ما حاجة متشتغلش هتحس إنه سحر أسود.`,
            how: R`[[SpringApplication.run]] بيعمل الـ ApplicationContext: الحاوية اللي فيها كل الـ beans (الـ objects اللي Spring بيديرها). بيقرا الإعدادات، ويعمل scan للـ components، وبعدين يحمّل الـ auto-configurations.

كل auto-configuration class فيه شروط: [[@ConditionalOnClass(DataSource.class)]] (لو المكتبة موجودة)، و [[@ConditionalOnMissingBean]] (لو انت معملتش واحد)، و [[@ConditionalOnProperty]] (لو إعداد معين). عشان كده لو عرّفت [[@Bean ObjectMapper]] أو [[@Bean SecurityFilterChain]] بتاعك، الافتراضي بيتلغي.

والتقرير اللي بيطلع بـ [[--debug]] بيقسم الـ configurations لـ Positive matches (اشتغلت وليه) و Negative matches (مااشتغلتش وليه). ودي أداة التشخيص الأهم لما حاجة «مش بتتعمل لوحدها». وفي Actuator فيه endpoint [[/actuator/conditions]] بنفس المعلومات.`,
            when: R`كل تطبيق فيه واحد بس. وبتحتاج تفهمه لما: حاجة مش بتتعمل أوتوماتيك، أو عايز تلغي حاجة ([[@SpringBootApplication(exclude = ...)]])، أو bean متعرّف مرتين.`,
            mistakes: R`كذا class عليهم [[@SpringBootApplication]]. والـ main class في package أعمق من الكود ([[com.example.tasks.app]] والـ controllers في [[com.example.tasks.web]]) فالـ scan مش بيشوفهم. وتعمل [[exclude]] لـ auto-configuration عشان خطأ بدل ما تفهم الخطأ.

في الانترفيو: «Spring Boot بيعمل auto-configuration إزاي؟» الإجابة: conditional beans بتتحمّل من قايمة في الـ jars ([[META-INF/spring/...AutoConfiguration.imports]])، وشروط على الـ classpath والـ beans والـ properties، وكودك بيكسب.`
          },
          lines: [
            R`الـ package الأساسي: كل الكود تحته.`,
            R`[[SpringApplication]] اللي بيشغّل كل حاجة.`,
            "الـ annotation.",
            R`configuration و component scan و auto-configuration في annotation واحدة.`,
            "الـ class الرئيسي.",
            R`[[main]] العادي بتاع Java.`,
            R`بيعمل الـ context ويشغّل Tomcat، ويفضل شغال لحد ما توقفه.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`في التقرير هتلاقي قسمين: Positive matches و Negative matches. في مشروعنا (فيه JPA و datasource) لقينا تحت Positive matches: [[DataSourceAutoConfiguration matched:]] وتحتها [[@ConditionalOnClass found required classes 'javax.sql.DataSource', ...]] و [[@ConditionalOnMissingBean (types: io.r2dbc.spi.ConnectionFactory ...) did not find any beans]].

ولو المشروع فيه Web بس: مش هتلاقي [[DataSourceAutoConfiguration]] في التقرير خالص. في Spring Boot 4 الـ auto-configurations اتقسمت على modules، و JDBC في module لوحده بييجي مع starter الـ JPA أو JDBC، فمن غيرهم الـ class مش موجود أصلًا عشان يتقيّم. في Boot 3 كنت هتلاقيه في Negative matches بسبب [[did not find required class]].

الدرس: كل حاجة Boot بيعملها ليها شرط مكتوب، والتقرير بيقولك بالظبط ليه اتعملت أو لأ. (الـ [[-Dspring-boot.run.arguments]] بيعدّي arguments للتطبيق من Maven.)`
        },
        {
          cmd: "beans و DI",
          title: "Spring بيعمل الـ objects ويوصّلها ببعض: dependency injection",
          desc: R`الـ bean object بيديره Spring: هو اللي بيعمله، وبيديله اللي محتاجه، وبيقفله في الآخر. بتقول لـ Spring «اعمل ده» بطريقتين: annotation على الـ class ([[@Service]] و [[@Component]] و [[@Repository]] و [[@RestController]])، أو method عليها [[@Bean]] جوه class عليه [[@Configuration]] (للـ objects من مكتبات مش بتاعتك، زي [[Clock]]).

والـ dependency injection: الـ class بيكتب اللي محتاجه في الـ constructor، و Spring بيدوّر على bean من النوع ده ويبعته. انت عمرك ما بتكتب [[new GreetingService(...)]]. ده نفس فكرة درس الـ interfaces في المستوى الأول، بس Spring هو اللي بيعمل الـ [[new]]. (لو استخدمت NestJS، نفس الفكرة بالظبط.)`,
          example: R`@Configuration
public class AppConfig {
    @Bean
    Clock clock() {
        return Clock.systemUTC();
    }
}

@Service
public class GreetingService {
    private final Clock clock;

    public GreetingService(Clock clock) {
        this.clock = clock;
    }

    public String greet(String name) {
        int hour = LocalTime.now(clock).getHour();
        return (hour < 12 ? "Good morning, " : "Good evening, ") + name;
    }
}

@RestController
public class HelloController {
    private final GreetingService greetings;

    public HelloController(GreetingService greetings) {
        this.greetings = greetings;
    }

    @GetMapping("/hello")
    public String hello(@RequestParam(defaultValue = "world") String name) {
        return greetings.greet(name);
    }
}`,
          try: R`اعمل الـ ٣ classes (كل واحد في ملف في الـ package الأساسي) وافتح [[localhost:8080/hello?name=Sara]]. وبعدين شيل [[@Service]] من GreetingService وشغّل: اقرا رسالة الخطأ كاملة. وأخيرًا اكتب unit test لـ [[GreetingService]] من غير Spring خالص، بـ [[Clock.fixed(...)]] الساعة ٩ الصبح.`,
          flag: "script",
          deep: {
            why: R`لو كل class بيعمل [[new]] للي محتاجه، مستحيل تبدّل حاجة في التست (الساعة، أو الـ payment gateway، أو الإيميل). الـ DI بيخلي كل class يطلب اللي محتاجه بس، فتقدر في التست تبعتله fake. ومعظم Spring (الـ transactions والـ security والـ caching) شغال عن طريق إن Spring هو اللي بيعمل الـ objects.`,
            how: R`وقت البداية Spring بيجمع تعريفات كل الـ beans، ويرتبهم حسب مين محتاج مين، ويعملهم. الـ constructor injection: لو فيه constructor واحد، Spring بيستخدمه لوحده من غير [[@Autowired]].

الـ beans افتراضيًا singleton: نسخة واحدة للتطبيق كله، مشتركة بين كل الـ requests (درس bean scopes في الانترفيو). عشان كده الحقول تبقى [[final]] ومفيش state بتتغير.

لو فيه أكتر من bean من نفس النوع (مثلًا اتنين implementations لـ [[PaymentGateway]])، Spring مش هيعرف يختار: [[NoUniqueBeanDefinitionException]]. الحل [[@Primary]] على واحد، أو [[@Qualifier("paymob")]] في الـ constructor، أو تطلب [[List<PaymentGateway>]] تاخدهم كلهم.

[[@Component]] و [[@Service]] و [[@Repository]] كلهم نفس الحاجة تقريبًا، الفرق في المعنى (و [[@Repository]] بيحوّل أخطاء الداتابيز لـ exceptions بتاعة Spring). و [[@RestController]] = [[@Controller]] + إن الرجوع يبقى JSON.`,
            when: R`[[@Service]] للـ business logic، و [[@RestController]] للـ HTTP، و [[@Repository]] (أو interfaces بتورث من JpaRepository، مش محتاجة annotation) للداتابيز. و [[@Bean]] للحاجات من مكتبات تانية أو اللي محتاجة إعداد (Clock، و HTTP client، و ObjectMapper مخصوص).`,
            mistakes: R`field injection: [[@Autowired private GreetingService greetings;]]: شائع في الكود القديم، بس بيخبي الـ dependencies وبيمنع [[final]] وبيصعّب التست من غير Spring؛ استخدم الـ constructor. و circular dependency (A محتاج B و B محتاج A): Spring Boot بيرفضها افتراضيًا، والحل تصميم أحسن مش [[@Lazy]]. وتعمل [[new MyService()]] بإيدك فتلاقي كل حاجة جواه null ومفيش transactions.`
          },
          lines: [
            R`[[@Configuration]]: class فيه تعريفات beans.`,
            "بداية الـ class.",
            R`[[@Bean]]: الـ method دي بترجع object، و Spring يسجّله كـ bean.`,
            R`الـ bean نوعه [[Clock]] (من Java نفسها) واسمه clock.`,
            "الساعة الحقيقية بتوقيت UTC.",
            "قفلة.",
            "قفلة.",
            R`[[@Service]]: Spring هيعمل object من الـ class ده.`,
            "بداية الـ class.",
            R`الـ dependency: [[final]] لأنها بتتحط مرة في الـ constructor.`,
            R`الـ constructor بيطلب Clock، و Spring بيبعت الـ bean اللي عرّفناه فوق.`,
            "بيحفظه.",
            "قفلة.",
            R`الـ business logic.`,
            R`الساعة من الـ Clock المحقون، مش من [[LocalTime.now()]] مباشرة، عشان التست يقدر يثبّتها.`,
            "الرسالة حسب الوقت.",
            "قفلة.",
            "قفلة.",
            R`[[@RestController]]: bean كمان، والـ methods بترجع body الـ response.`,
            "بداية.",
            "الـ dependency.",
            R`Spring بيحقن [[GreetingService]] هنا.`,
            "بيحفظه.",
            "قفلة.",
            R`[[GET /hello]] بيروح للـ method دي.`,
            R`[[?name=...]] من الـ URL، واختيارية بقيمة افتراضية.`,
            "بيسلّم الشغل للـ service.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[/hello?name=Sara]] بيرجع [[Good morning, Sara]] أو [[Good evening, Sara]] حسب الساعة بتوقيت UTC (مش توقيت مصر! ده بالظبط سبب إننا خلينا الـ Clock bean: تقدر تغيّره لـ [[Clock.system(ZoneId.of("Africa/Cairo"))]] في مكان واحد).

من غير [[@Service]]: التطبيق مش بيقوم، و [[APPLICATION FAILED TO START]] و [[Parameter 0 of constructor in ...HelloController required a bean of type '...GreetingService' that could not be found.]] ومعاها [[Action: Consider defining a bean of type ...]].

والتست تحت: مفيش Spring خالص، بس [[new]] وبتبعت ساعة ثابتة. بيشتغل في أجزاء من الثانية. ده مكسب الـ constructor injection.`,
          solCode: R`import static org.assertj.core.api.Assertions.assertThat;

import java.time.*;
import org.junit.jupiter.api.Test;

class GreetingServiceTest {
    @Test
    void morningGreeting() {
        Clock nineAm = Clock.fixed(Instant.parse("2026-09-30T09:00:00Z"), ZoneOffset.UTC);
        var service = new GreetingService(nineAm);
        assertThat(service.greet("Sara")).isEqualTo("Good morning, Sara");
    }
}`
        }
      ]
    }
]);

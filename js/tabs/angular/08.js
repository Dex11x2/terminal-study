// تكملة تاب angular: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/angular/01.js (شرح حقول الدرس في أوله)
MORE("angular", [
    {
      t: "RxJS اللي هتقابله في الشغل",
      l: 2,
      n: "Observable و pipe و switchMap و debounceTime، و async pipe و toSignal بين العالمين",
      items: [
        {
          cmd: "Observable و subscribe",
          title: "Observable يعني إيه، وليه مش Promise",
          desc: R`RxJS مكتبة Angular معتمد عليها من زمان: [[HttpClient]] و [[valueChanges]] في الفورمات و [[router.events]] كلهم بيرجّعوا Observable. حتى مع الـ signals، هتقابلها في كل مشروع شغال.

الـ Observable زي Promise بيطلّع قيم مع الوقت، بس فيه ٣ فروق: بيطلّع قيم كتير مش واحدة (كل ضغطة، كل حرف)، و lazy: مش بيبدأ غير لما حد يعمل [[subscribe]]، ولكل subscriber تشغيلة لوحده. و cancellable: [[unsubscribe()]] بيوقفه.

والـ subscriber بياخد ٣ callbacks: [[next]] لكل قيمة، و [[error]] لو حصل خطأ، و [[complete]] لما يخلص. والعُرف إن اسم المتغير بيخلص بـ [[$]].`,
          example: R`import { Observable, interval } from 'rxjs';
const nums$ = new Observable<number>((sub) => {
  console.log('بدأ');
  sub.next(1);
  sub.next(2);
  sub.complete();
});
console.log('قبل subscribe');
nums$.subscribe({ next: (v) => console.log('وصل', v), complete: () => console.log('خلص') });
nums$.subscribe((v) => console.log('التاني', v));
const sub = interval(500).subscribe((n) => console.log('tick', n));
setTimeout(() => sub.unsubscribe(), 1600);`,
          try: R`احفظه [[scripts/rx1.mts]] في مشروع Angular (rxjs متسطّب) وشغّله بـ [[node scripts/rx1.mts]]. قبل ما تشغّل، اكتب الترتيب اللي متوقعه. بعدين امسح سطر الـ [[unsubscribe]] وشوف إيه اللي بيحصل.`,
          flag: "script",
          deep: {
            why: R`الـ Promise ممتاز لحاجة بتحصل مرة: طلب ورد. بس الواجهة مليانة حاجات بتحصل كتير: المستخدم بيكتب، و websocket بيبعت، والراوتر بيتنقل، وتايمر. Observable بيوحّد كل ده في شكل واحد، وبيديك operators تركّبهم (الدروس الجاية). والأهم للـ HTTP: الإلغاء. لو المستخدم خرج من الصفحة، الطلب بيتلغي فعلًا.`,
            how: R`الدالة اللي بتديها لـ [[new Observable]] مش بتشتغل غير لما حد يعمل subscribe، وبتشتغل من الأول لكل subscriber (cold). عشان كده «بدأ» اتطبعت مرتين. ده نفس سبب إن [[http.get]] بيبعت طلب جديد مع كل subscribe.

[[complete]] أو [[error]] بيقفلوا الـ Observable: مفيش قيم بعدهم. الـ HTTP بيعمل next مرة و complete، فهو شبه Promise. أما [[interval]] و [[valueChanges]] و [[fromEvent]] مش بيخلصوا أبدًا لوحدهم، فلو عملت subscribe ومعملتش unsubscribe، الـ callback هيفضل شغال بعد ما الـ component يتقفل: memory leak، وأحيانًا كود بيشتغل على component ميت.

فيه كمان Subject: Observable تقدر تعمل له [[next()]] من برا، و [[BehaviorSubject]] بيفتكر آخر قيمة ويديها لأي subscriber جديد. ده كان «الـ state» في Angular قبل الـ signals، وهتلاقيه في services كتير (المستوى ٣).

و [[firstValueFrom(obs$)]] بيحوّل Observable لـ Promise لو عايز [[await]].`,
            when: R`في Angular الحديث: الـ HTTP والـ streams (بحث، websocket، أحداث). والـ state العادي signals. وأي subscribe بإيدك لازم يبقى معاه خطة للـ unsubscribe (درس async و toSignal).`,
            mistakes: R`تعمل [[subscribe]] ومتعملش unsubscribe على حاجة مش بتخلص. وتفتكر إن [[http.get()]] بيبعت الطلب لوحده. وتعمل subscribe مرتين على نفس الـ HTTP Observable فتبعت طلبين. وفي الانترفيو: «الفرق بين Observable و Promise؟» lazy مقابل eager، وقيم كتير مقابل قيمة، و cancellable، والـ operators.`
          },
          teach: R`## الفكرة: نعمل Observable بإيدنا ونشوف إمتى بيشتغل

المثال مش Angular: TypeScript عادي بيستخدم مكتبة [[rxjs]] (اللي متسطّبة مع أي مشروع Angular). بيعمل Observable بإيده عشان نشوف ٣ حاجات: إنه مش بيبدأ غير مع [[subscribe]]، وإن كل subscriber ليه تشغيلة لوحده، وإن اللي مش بيخلص لازم يتقفل بـ [[unsubscribe]]. اتشغّل على Windows بـ [[node scripts/rx1.mts]] جوه مشروع Angular 22.2 (Node 24 بيشغّل TypeScript مباشرة لما الامتداد [[.mts]]، وبيشيل الأنواع وبس) و [[rxjs]] 7.8.2.

---

## ١. الـ import

~~~ts
import { Observable, interval } from 'rxjs';
~~~

- [[Observable]]: الكلاس اللي بنعمل منه stream.
- [[interval]]: دالة جاهزة بتعمل Observable بيطلّع [[0]] و [[1]] و [[2]]... كل فترة، ومش بيخلص أبدًا.

---

## ٢. Observable بإيدنا

~~~ts
const nums$ = new Observable<number>((sub) => {
  console.log('بدأ');
  sub.next(1);
  sub.next(2);
  sub.complete();
});
~~~

- [[nums$]]: العُرف إن اسم أي Observable بيخلص بـ [[$]] (stream). مجرد اسم، مش syntax.
- [[new Observable<number>(...)]]: Observable بيطلّع أرقام. الدالة اللي جواه بتتحفظ ومبتشتغلش دلوقتي.
- [[sub]]: الـ subscriber، أي حد عمل subscribe. بنكلّمه بـ ٣ methods:

| الـ method | معناها |
|---|---|
| [[sub.next(1)]] | ابعت قيمة |
| [[sub.complete()]] | خلصت، مفيش قيم تاني |
| [[sub.error(err)]] | حصل خطأ (وده كمان بيقفل) |

---

## ٣. subscribe مرتين

~~~ts
console.log('قبل subscribe');
nums$.subscribe({ next: (v) => console.log('وصل', v), complete: () => console.log('خلص') });
nums$.subscribe((v) => console.log('التاني', v));
~~~

- الـ subscribe الأول بياخد object فيه الـ callbacks اللي محتاجها بس: [[next]] لكل قيمة و [[complete]] للنهاية (ومحطيناش [[error]]).
- التاني بياخد دالة واحدة، وده اختصار لـ [[{ next: ... }]].

~~~text الناتج (node scripts/rx1.mts)
قبل subscribe
بدأ
وصل 1
وصل 2
خلص
بدأ
التاني 1
التاني 2
~~~

- «قبل subscribe» الأول، رغم إن الـ Observable اتعمل قبلها. ده معنى **lazy**: الدالة مبتشتغلش غير مع [[subscribe]].
- «بدأ» اتطبعت **مرتين**: كل subscribe شغّل الدالة من الأول. ده اسمه **cold** Observable. وده بالظبط ليه [[http.get()]] بيبعت طلب جديد مع كل subscribe.
- كل ده sync: القيم وصلت فورًا لأن [[next]] اتنادت على طول.

---

## ٤. Observable مش بيخلص

~~~ts
const sub = interval(500).subscribe((n) => console.log('tick', n));
setTimeout(() => sub.unsubscribe(), 1600);
~~~

- [[interval(500)]]: رقم كل 500ms (نص ثانية).
- [[subscribe]] بيرجّع [[Subscription]]، حفظناه في [[sub]] عشان نقدر نقفله.
- [[setTimeout(fn, 1600)]]: بعد 1.6 ثانية، [[sub.unsubscribe()]] يوقف الاشتراك.

~~~text الناتج (تكملة)
tick 0
tick 1
tick 2
~~~

٣ ticks بس: عند 500 و 1000 و 1500، والـ unsubscribe عند 1600 قبل الرابعة (2000). وبعدها البرنامج خلص لوحده، لأن مفيش حاجة شغالة.

### الـ try: من غير [[unsubscribe]]

شلنا السطر الأخير وشغّلناه في Git Bash بـ [[timeout 3 node scripts/rx1b.mts]] ([[timeout 3]] بيقفله بعد ٣ ثواني):

~~~text الناتج (آخر ٤ سطور)
tick 1
tick 2
tick 3
tick 4
~~~

مبيقفش لوحده خالص، ولولا الـ timeout كان هيفضل شغال (Ctrl+C). في component، ده معناه callback شغال بعد ما الصفحة اتقفلت: memory leak.

---

## الخلاصة

| | Promise | Observable |
|---|---|---|
| بيبدأ إمتى | أول ما يتعمل (eager) | مع [[subscribe]] بس (lazy) |
| كام قيمة | واحدة | أي عدد |
| كذا حد بيستناه | نفس النتيجة | كل subscriber تشغيلة لوحده (cold) |
| الإلغاء | مفيش | [[unsubscribe()]] |
| النهاية | resolve أو reject | [[complete]] أو [[error]]، أو أبدًا ([[interval]]) |`,
          lines: [
            R`[[interval]] بيطلّع رقم كل فترة ومش بيخلص.`,
            "Observable بإيدنا عشان نشوف بيحصل إيه.",
            "بيتطبع مع كل subscribe، مش لما يتعمل.",
            "قيمة.",
            "قيمة تانية.",
            "خلص: مفيش قيم بعد كده.",
            "قفلة.",
            "دي بتتطبع الأول: الـ Observable لسه مبدأش.",
            R`أول subscriber بالـ ٣ callbacks (اللي محتاجهم بس).`,
            "subscriber تاني: تشغيلة جديدة من الأول.",
            R`subscribe بيرجّع [[Subscription]] نحفظه.`,
            R`بعد 1.6 ثانية نوقفه، وإلا هيفضل شغال للأبد.`
          ],
          sol: R`الناتج بالظبط (اتشغّل في الـ lab):

[[قبل subscribe]] ثم [[بدأ]] و [[وصل 1]] و [[وصل 2]] و [[خلص]]، ثم [[بدأ]] تاني و [[التاني 1]] و [[التاني 2]]، وبعدين [[tick 0]] و [[tick 1]] و [[tick 2]] والبرنامج يخلص.

«قبل subscribe» أول واحدة لأن الـ Observable lazy. و«بدأ» مرتين لأنه cold: كل subscriber بتشغيلة. و ٣ ticks بس (عند 500 و 1000 و 1500) لأن الـ unsubscribe عند 1600.

من غير الـ unsubscribe: الـ ticks مش بتقف، والبرنامج مش بيخلص خالص (ctrl+c). ده بالظبط الـ memory leak اللي بيحصل في component بيعمل subscribe على interval أو valueChanges ويتقفل.`
        },
        {
          cmd: "pipe و operators",
          title: "تحوّل القيم بـ pipe و map و filter و tap و catchError",
          desc: R`الـ operators دوال بتاخد Observable وترجّع Observable جديد متعدّل، وبتتركّب جوه [[.pipe(...)]] بالترتيب زي خط إنتاج:

[[map]] يحوّل كل قيمة (زي [[Array.map]])، و [[filter]] يعدّي اللي بيحقق شرط، و [[tap]] يعمل حاجة جانبية (log) من غير ما يغيّر القيمة، و [[catchError]] يمسك الخطأ ويرجّع Observable بديل.

ومعاهم [[of(1, 2)]] بيعمل Observable من قيم، و [[from([...])]] من array أو Promise، و [[throwError]] بيعمل واحد بيطلّع خطأ.`,
          example: R`import { from, of, filter, map, tap, catchError, throwError, firstValueFrom } from 'rxjs';
from([5, 12, 30, 7]).pipe(
  filter((n) => n > 6),
  map((n) => n * 2),
  tap((n) => console.log('tap', n)),
).subscribe((n) => console.log('النتيجة', n));
throwError(() => new Error('السيرفر وقع')).pipe(
  catchError((e) => of('بديل: ' + e.message)),
).subscribe((v) => console.log(v));
const first = await firstValueFrom(of('أ', 'ب', 'ج'));
console.log('أول قيمة:', first);`,
          try: R`شغّله بـ [[node]] زي الدرس اللي فات، واكتب الناتج المتوقع الأول. بعدين اكتب service method بترجّع [[http.get<ApiResponse>('/api/products')]] والرد شكله [[{ data: Product[], total: number }]]، وحوّله بـ map لـ [[Product[]]] بس، ولو فيه خطأ رجّع array فاضية.`,
          flag: "script",
          deep: {
            why: R`الـ API نادرًا بيرجّع الشكل اللي الشاشة محتاجاه بالظبط: الداتا جوه [[data]]، والتواريخ strings، وعايز تفلتر أو ترتب. الـ operators بتخليك تعمل التحويل ده في الـ service مرة واحدة، والـ component ياخد الشكل النهائي. و [[catchError]] بيحط خطة للفشل في نفس المكان.`,
            how: R`كل operator بيعمل subscribe على اللي قبله ويطلّع قيم للي بعده. القيمة بتعدّي الخط كله قبل ما اللي بعدها تبدأ، عشان كده «tap 24» وبعدين «النتيجة 24»، مش كل الـ taps الأول.

[[catchError]] لازم يرجّع Observable: [[of(fallback)]] يكمّل بقيمة بديلة، أو [[throwError(() => err)]] يعيد رمي الخطأ (يمكن بعد ما تسجّله). وبعد catchError الـ Observable الأصلي خلص؛ لو ده stream مستمر (بحث)، الخطأ هيقفله، فمكان الـ catchError مهم (الدرس الجاي).

[[tap]] للـ side effects بس: log، أو تحديث loading signal. متغيّرش القيمة جواه.

والترتيب بيفرق: [[filter]] قبل [[map]] غير [[map]] قبل [[filter]]. وفيه operators تانية هتقابلها: [[take(1)]] (خد أول قيمة واقفل)، و [[startWith]]، و [[distinctUntilChanged]]، و [[retry(2)]]، و [[finalize]] (بيشتغل لما يخلص أو يقع أو unsubscribe).`,
            when: R`تحويل ردود الـ API في الـ services، والتعامل مع الأخطاء، وأي stream محتاج فلترة أو تحويل. لو القيمة خلاص بقت signal، استخدم [[computed]] بدل operators.`,
            mistakes: R`تعمل [[.subscribe()]] وجواها تحويلات و ifs بدل ما تحطهم في pipe. و [[catchError(() => [])]] فترجع array مش Observable (بيشتغل بالصدفة لأن array تتحوّل، بس خلي بالك وأوضح [[of([])]]). و [[map]] بيرجّع Observable (زي [[map(q => this.api.search(q))]]) فيبقى عندك Observable جوه Observable: ده محتاج switchMap.`
          },
          teach: R`## الفكرة: خط إنتاج القيم بتعدّي عليه

[[pipe]] بياخد operators ويركّبهم ورا بعض: كل قيمة طالعة من الـ Observable بتعدّي على الأول، وبعدين التاني، وهكذا، واللي يوصل للآخر هو اللي الـ subscriber بيشوفه. المثال فيه ٣ أجزاء: فلترة وتحويل، ومسك خطأ، وتحويل Observable لـ Promise. اتشغّل على Windows بـ [[node scripts/rx2.mts]] جوه مشروع Angular 22.2 ([[rxjs]] 7.8.2). والـ solCode اتجرّب في التطبيق نفسه مع API بـ Node.

---

## ١. الـ import

~~~ts
import { from, of, filter, map, tap, catchError, throwError, firstValueFrom } from 'rxjs';
~~~

كله من [[rxjs]] مباشرة. نوعين:

| النوع | الأسامي | بيعمل إيه |
|---|---|---|
| بيعمل Observable | [[from]] و [[of]] و [[throwError]] | نقطة البداية |
| operators | [[filter]] و [[map]] و [[tap]] و [[catchError]] | بيتحطوا جوه [[pipe]] |
| بيحوّل لـ Promise | [[firstValueFrom]] | عشان [[await]] |

---

## ٢. الجزء الأول: فلترة وتحويل

~~~ts
from([5, 12, 30, 7]).pipe(
  filter((n) => n > 6),
  map((n) => n * 2),
  tap((n) => console.log('tap', n)),
).subscribe((n) => console.log('النتيجة', n));
~~~

### [[from([5, 12, 30, 7])]]

بيعمل Observable بيطلّع عناصر الـ array واحد واحد، وبعدين complete.

### الـ operators بالترتيب

1. [[filter((n) => n > 6)]]: عدّي اللي الشرط بتاعه [[true]] بس. الـ 5 بتقف هنا.
2. [[map((n) => n * 2)]]: بدّل كل قيمة بنتيجة الدالة. زي [[Array.map]] بالظبط.
3. [[tap((n) => console.log('tap', n))]]: اعمل حاجة جانبية (هنا log) وسيب القيمة زي ما هي.

### القيم وهي بتعدّي

| القيمة | بعد [[filter]] | بعد [[map]] | اللي بيتطبع |
|---|---|---|---|
| 5 | وقفت | | |
| 12 | 12 | 24 | tap 24، النتيجة 24 |
| 30 | 30 | 60 | tap 60، النتيجة 60 |
| 7 | 7 | 14 | tap 14، النتيجة 14 |

~~~text الناتج (node scripts/rx2.mts)
tap 24
النتيجة 24
tap 60
النتيجة 60
tap 14
النتيجة 14
~~~

لاحظ الترتيب: «tap 24» وبعدها على طول «النتيجة 24»، مش كل الـ taps الأول. كل قيمة بتعدّي الخط **كله** قبل ما اللي بعدها تبدأ.

---

## ٣. الجزء التاني: مسك الخطأ

~~~ts
throwError(() => new Error('السيرفر وقع')).pipe(
  catchError((e) => of('بديل: ' + e.message)),
).subscribe((v) => console.log(v));
~~~

- [[throwError(() => new Error(...))]]: Observable مبيطلّعش قيم، بيطلّع خطأ على طول. بياخد دالة بترجّع الخطأ (مش الخطأ نفسه).
- [[catchError((e) => ...)]]: لو وصل خطأ، نادي الدالة دي بيه. ولازم ترجّع **Observable** يكمّل مكان القديم.
- [[of('بديل: ' + e.message)]]: [[of]] بيعمل Observable من القيم اللي بتديهاله، هنا قيمة واحدة.

~~~text الناتج
بديل: السيرفر وقع
~~~

الـ subscriber استلم القيمة البديلة في [[next]] عادي، ومعرفش إن حصل خطأ أصلًا.

---

## ٤. الجزء التالت: [[firstValueFrom]]

~~~ts
const first = await firstValueFrom(of('أ', 'ب', 'ج'));
console.log('أول قيمة:', first);
~~~

- [[of('أ', 'ب', 'ج')]]: ٣ قيم.
- [[firstValueFrom(...)]]: بيعمل subscribe، ياخد أول قيمة، يعمل unsubscribe، ويرجّعها في Promise.
- [[await]]: استنى الـ Promise. ([[await]] برا أي دالة ده top-level await، شغال لأن [[.mts]] ملف ES module.)

~~~text الناتج
أول قيمة: أ
~~~

---

## ٥. الـ solCode: service بتظبط شكل الرد

~~~ts
type ApiResponse = { data: Product[]; total: number };
list() {
  return this.http.get<ApiResponse>('/api/products').pipe(
    map((res) => res.data),
    catchError((err) => {
      console.error('products failed', err);
      return of([] as Product[]);
    }),
  );
}
~~~

- [[type ApiResponse]]: شكل الرد اللي جاي: المنتجات جوه [[data]]، وجنبها [[total]].
- [[map((res) => res.data)]]: الـ component عايز الـ array بس، فبنطلّعها هنا مرة واحدة.
- [[catchError]]: لو الطلب فشل، سجّل الخطأ ورجّع array فاضية. و [[as Product[]]] عشان TypeScript يعرف إن [[[]]] دي array منتجات مش [[never[]]].

جرّبناها على endpoint بيرجّع الشكل ده، وعلى واحد بيرجّع 500:

~~~text الناتج (Chrome)
[res] 200 GET /api/wrapped
ok: 5 products, first = {"id":1,"name":"قلم","price":10}
[res] 500 GET /api/broken
products failed 500
broken: []
~~~

الـ component في الحالتين استلم array، ومحتاجش يعرف حاجة عن [[data]] ولا عن الخطأ.

---

## الخلاصة

| الـ operator | بيعمل إيه | بيرجّع |
|---|---|---|
| [[filter(fn)]] | يعدّي اللي [[fn]] بتاعه true | نفس القيم أو أقل |
| [[map(fn)]] | يبدّل كل قيمة | قيم جديدة |
| [[tap(fn)]] | side effect (log) | نفس القيم من غير تغيير |
| [[catchError(fn)]] | يمسك الخطأ | Observable بديل ([[of(...)]] أو [[throwError]]) |
| [[firstValueFrom(obs$)]] | مش operator | Promise بأول قيمة |`,
          lines: [
            R`كل الـ operators بتتعمل import من [[rxjs]] مباشرة.`,
            R`Observable بيطلّع الأرقام دي واحد ورا التاني.`,
            "عدّي الأكبر من 6 بس.",
            "ضاعفهم.",
            "اطبع وسيب القيمة زي ما هي.",
            "اللي بيوصل هنا الناتج النهائي.",
            "Observable بيطلّع خطأ على طول.",
            R`امسك الخطأ وكمّل بقيمة بديلة بـ [[of]].`,
            "هيطبع البديل مش خطأ.",
            R`حوّل لـ Promise وخد أول قيمة ([[firstValueFrom]] بتعمل unsubscribe بعدها).`,
            "أ."
          ],
          sol: R`الناتج (اتشغّل في الـ lab): [[tap 24]]، [[النتيجة 24]]، [[tap 60]]، [[النتيجة 60]]، [[tap 14]]، [[النتيجة 14]]، [[بديل: السيرفر وقع]]، [[أول قيمة: أ]].

الـ 5 اتفلترت. وكل قيمة بتعدّي الخط كله قبل اللي بعدها. والخطأ ماوصلش للـ subscribe كخطأ لأن catchError بدّله.

الـ service:`,
          solCode: R`type ApiResponse = { data: Product[]; total: number };
list() {
  return this.http.get<ApiResponse>('/api/products').pipe(
    map((res) => res.data),
    catchError((err) => {
      console.error('products failed', err);
      return of([] as Product[]);
    }),
  );
}`
        },
        {
          cmd: "switchMap و debounceTime",
          title: "بحث وانت بتكتب: debounceTime و distinctUntilChanged و switchMap",
          desc: R`أشهر pattern في RxJS، وسؤال انترفيو ثابت: input بحث بيكلّم API.

[[debounceTime(300)]]: استنى لحد ما المستخدم يبطّل كتابة ٣٠٠ms. [[distinctUntilChanged()]]: متبعتش لو نفس الكلمة اللي فاتت. [[switchMap(q => api.search(q))]]: لكل كلمة ابعت طلب، ولو جت كلمة جديدة والطلب القديم لسه شغال، الغيه.

ولما تبقى عندك قيمة (كلمة) ومحتاج تعمل بيها Observable (طلب)، دي «higher-order mapping»، وفيه ٤ أنواع: [[switchMap]] (الغي القديم)، و [[mergeMap]] (شغّلهم كلهم مع بعض)، و [[concatMap]] (بالدور)، و [[exhaustMap]] (تجاهل الجديد لحد ما القديم يخلص).`,
          example: R`@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  template: $__bt
    <input [formControl]="q" placeholder="دوّر..." />
    @for (p of results(); track p.id) { <p>{{ p.name }}</p> }
  $__bt,
})
export class Search {
  private api = inject(ProductsApi);
  q = new FormControl('', { nonNullable: true });
  results = toSignal(
    this.q.valueChanges.pipe(
      debounceTime(300),
      map((s) => s.trim()),
      distinctUntilChanged(),
      switchMap((s) => (s.length < 2 ? of([]) : this.api.list(s).pipe(catchError(() => of([]))))),
    ),
    { initialValue: [] as Product[] },
  );
}`,
          try: R`من غير API، شغّل النسخة دي بـ node واتوقع الناتج: Subject اسمه [[typed$]] عليه نفس الـ pipe، و [[fakeApi(q)]] بيطبع «طلب: q» ويرجّع [[timer(400).pipe(map(() => 'نتايج ' + q))]]. ابعت [[l]] و [[la]] و [[lap]] كل ١٠٠ms، وبعدين [[laptop]] عند 800ms، و [[lap]] عند 1150ms. بعدين بدّل switchMap بـ mergeMap وقارن.`,
          flag: "script",
          deep: {
            why: R`من غير الـ pattern ده: كل حرف = طلب (١٠ طلبات لكلمة واحدة)، والردود ممكن توصل بترتيب غلط: طلب «lap» يتأخر ويوصل بعد طلب «laptop»، فالشاشة تعرض نتايج كلمة قديمة وهو كاتب كلمة جديدة. ده race condition حقيقي بيحصل في الإنتاج. ٣ operators بيحلوه كله.`,
            how: R`[[valueChanges]] بيطلّع كل تغيير. [[debounceTime]] بيعمل timer مع كل قيمة، ولو جت قيمة قبل ما يخلص يبدأ من الأول، فبيعدّي بس القيمة اللي بعدها سكوت ٣٠٠ms. ده نفس [[debounce]] في «تاب JavaScript» بس كـ operator.

[[switchMap]] بياخد القيمة ويرجّع Observable (الطلب)، ويعمل subscribe عليه. لما قيمة جديدة توصل، بيعمل unsubscribe من القديم (والـ HttpClient بيلغي الطلب فعلًا، هتشوفه canceled في Network) ويبدأ الجديد. فمستحيل رد قديم يوصل.

مكان [[catchError]] مهم: هو جوه الـ switchMap على الطلب نفسه. لو حطيته برا بعد switchMap، أول خطأ هيقفل الـ stream كله والبحث يبطّل يشتغل خالص.

اختيار النوع: switchMap للقراية (بحث، فلتر، تفاصيل حسب id). [[concatMap]] للحفظ بالترتيب (autosave). [[exhaustMap]] لزرار submit (تجاهل الضغطات لحد ما الطلب يخلص). [[mergeMap]] لما الطلبات مستقلة وعايزهم متوازيين (رفع ملفات).`,
            when: R`أي input بيكلّم API، و autocomplete، وفلاتر بتتغير بسرعة. ولو الـ source signal مش Observable: [[toObservable(this.query)]] الأول، أو [[httpResource]] (فيه switch من جوه) مع [[debounced]] signal لو محتاج debounce.`,
            mistakes: R`[[mergeMap]] في البحث: الردود بتوصل بأي ترتيب. و [[switchMap]] في POST بيحفظ: ضغطتين ورا بعض = الأول ممكن يتلغي من الـ client بس السيرفر يكون استلمه. و catchError برا الـ switchMap فالبحث يموت بعد أول خطأ. وفي الانترفيو: «الفرق بين switchMap و mergeMap و concatMap و exhaustMap» سؤال شبه أكيد.`
          },
          teach: R`## الفكرة: من حروف بتتكتب لطلبات قليلة ومرتبة

المستخدم بيكتب حرف حرف، وكل حرف تغيير. الـ pipe في المثال بيحوّل الحروف دي لطلبات API بـ ٣ قواعد: استنى لما يبطّل كتابة، ومتطلبش نفس الكلمة مرتين ورا بعض، ولو جت كلمة جديدة الغي طلب القديمة. اتجرّب مرتين: الـ component في Angular 22.2 على Windows مع API بـ Node بيتأخر 500ms في الرد والكتابة بـ Playwright في Chrome headless، والـ solCode بـ [[node scripts/rx3.mts]].

---

## ١. الـ template

~~~html
<input [formControl]="q" placeholder="دوّر..." />
@for (p of results(); track p.id) { <p>{{ p.name }}</p> }
~~~

- [[[formControl]="q"]]: input مربوط بـ control لوحده من غير [[<form>]] (ده سبب [[ReactiveFormsModule]] في imports).
- [[results()]]: signal فيها المنتجات. كل اللي تحت هدفه يملا الـ signal دي.

---

## ٢. الـ control

~~~ts
private api = inject(ProductsApi);
q = new FormControl('', { nonNullable: true });
~~~

[[ProductsApi]] هي الـ service من درس HttpClient، و [[list(q)]] بتعمل [[GET /api/products?q=...]]. و [[q]] نوعه [[FormControl<string>]].

---

## ٣. الـ pipe من فوق لتحت

~~~ts
results = toSignal(
  this.q.valueChanges.pipe(
    debounceTime(300),
    map((s) => s.trim()),
    distinctUntilChanged(),
    switchMap((s) => (s.length < 2 ? of([]) : this.api.list(s).pipe(catchError(() => of([]))))),
  ),
  { initialValue: [] as Product[] },
);
~~~

### [[this.q.valueChanges]]

Observable من الـ control بيطلّع القيمة الجديدة مع كل تغيير: «ل»، «لا»، «لاب».

### [[debounceTime(300)]]

مع كل قيمة بيبدأ عدّاد 300ms. لو جت قيمة تانية قبل ما العدّاد يخلص، يرمي القديمة ويبدأ من الأول. فاللي بيعدّي بس القيمة اللي بعدها سكوت 300ms.

### [[map((s) => s.trim())]]

[[trim()]] بيشيل المسافات من الأول والآخر، فـ «لاب » تبقى «لاب».

### [[distinctUntilChanged()]]

لو القيمة زي اللي **قبلها مباشرة**، متعدّيهاش.

### [[switchMap(...)]]

ده قلب الموضوع. بياخد كل كلمة ويرجّع Observable (الطلب)، ويعمل subscribe عليه، والقيم اللي طالعة منه هي اللي بتكمّل. ولو كلمة جديدة وصلت والطلب القديم لسه شغال، بيعمل unsubscribe منه، و [[HttpClient]] بيلغي الطلب في المتصفح فعلًا.

وجواه:

- [[s.length < 2 ? of([]) : ...]]: أقل من حرفين؟ رجّع array فاضية من غير طلب.
- [[this.api.list(s).pipe(catchError(() => of([])))]]: اطلب، ولو فشل رجّع فاضية. الـ [[catchError]] هنا **جوه** الـ switchMap على الطلب نفسه، فالخطأ بيقفل الطلب ده بس. لو كان برا، أول خطأ كان هيقفل الـ stream كله والبحث يبطّل يشتغل.

### [[toSignal(..., { initialValue: [] as Product[] })]]

بيعمل subscribe على الـ pipe كله ويحط النتايج في signal. و [[as Product[]]] لأن [[of([])]] نوعه array فاضية، فبنقول لـ TypeScript إن النوع [[Product[]]].

---

## ٤. اللي حصل فعلًا

Chrome بيعمل encode للعربي في الـ URL ([[%D9%84%D8%A7%D8%A8]])، فكتبناه هنا مفكوك:

~~~text الناتج (Chrome)، والسطور العربي وصف اللي عملناه
t=0ms     كتبنا ل ثم لا ثم لاب (100ms بين كل حرف)
[req] GET /api/products?q=لاب
[res] 200 GET /api/products?q=لاب
t=1351ms  results: [ 'لابتوب', 'شنطة لابتوب' ]
t=1367ms  زوّدنا مسافة
          (مفيش طلب)
t=1876ms  شلنا المسافة وكتبنا توب، وبعد 350ms مسحنا ٣ حروف (رجعنا لـ لاب)
[req] GET /api/products?q=لابتوب
[req] GET /api/products?q=لاب
[failed] GET /api/products?q=لابتوب net::ERR_ABORTED
[res] 200 GET /api/products?q=لاب
t=3597ms  results: [ 'لابتوب', 'شنطة لابتوب' ]
t=4119ms  خلّيناها ل (حرف واحد): results: []
~~~

| اللي حصل | مين عمله |
|---|---|
| ٣ حروف = طلب واحد | [[debounceTime]] |
| المسافة مطلعتش طلب | [[trim]] خلّاها «لاب» تاني، و [[distinctUntilChanged]] وقفها |
| طلب «لابتوب» اتلغى ([[ERR_ABORTED]]) | [[switchMap]] لما وصلت «لاب» |
| «ل» فضّت النتايج من غير طلب | [[s.length < 2]] |

---

## ٥. الـ solCode: نفس الكلام من غير Angular

~~~ts
const typed$ = new Subject<string>();
const fakeApi = (q: string) => { console.log('  طلب:', q); return timer(400).pipe(map(() => $__btنتايج "$__{q}"$__bt)); };
~~~

- [[Subject]]: Observable تقدر تبعتله قيم من برا بـ [[typed$.next('l')]]. هنا بيمثّل الـ input.
- [[fakeApi]]: «طلب» وهمي: بيطبع إنه اتبعت، و [[timer(400)]] بيطلّع قيمة بعد 400ms، و [[map]] بيحوّلها لنص النتيجة.

~~~ts
typed$.pipe(debounceTime(300), distinctUntilChanged(), switchMap((q) => fakeApi(q))).subscribe((r) => console.log(r));
['l', 'la', 'lap'].forEach((k, i) => setTimeout(() => typed$.next(k), i * 100));
setTimeout(() => typed$.next('laptop'), 800);
setTimeout(() => typed$.next('lap'), 1150);
~~~

(في الـ solCode الـ pipe مكتوب على كذا سطر، هنا اتلم في سطر.) [[forEach((k, i) => ...)]] بيبعت [[l]] عند 0 و [[la]] عند 100 و [[lap]] عند 200.

~~~text الناتج (node scripts/rx3.mts)
  طلب: lap
نتايج "lap"
  طلب: laptop
  طلب: lap
نتايج "lap"
~~~

الخط الزمني:

| الوقت (ms) | اللي حصل |
|---|---|
| 0، 100، 200 | l و la و lap. الـ debounce بيعيد العد كل مرة |
| 500 | سكوت 300ms بعد lap: «طلب: lap» |
| 900 | «نتايج lap» (400ms بعد الطلب) |
| 800 → 1100 | laptop، وسكوت 300ms: «طلب: laptop» |
| 1150 → 1450 | lap، وسكوت: «طلب: lap»، فـ switchMap يلغي laptop (كان هيخلص عند 1500) |
| 1850 | «نتايج lap» |

ونفس الكود بـ [[mergeMap]] بدل [[switchMap]]:

~~~text الناتج (mergeMap)
  طلب: lap
نتايج "lap"
  طلب: laptop
  طلب: lap
نتايج "laptop"
نتايج "lap"
~~~

[[mergeMap]] مش بيلغي حاجة: نتيجة laptop ظهرت رغم إن المستخدم كان كتب lap خلاص.

---

## الخلاصة

| الـ operator | السؤال اللي بيجاوبه |
|---|---|
| [[debounceTime(300)]] | خلّص كتابة؟ |
| [[distinctUntilChanged()]] | الكلمة اتغيرت فعلًا؟ |
| [[switchMap]] | فيه طلب قديم؟ الغيه وابعت الجديد |
| [[catchError]] جوه الـ switchMap | الطلب فشل؟ كمّل البحث عادي |
| [[mergeMap]] / [[concatMap]] / [[exhaustMap]] | كلهم شغالين / بالدور / تجاهل الجديد لحد ما القديم يخلص |`,
          lines: [
            "الـ decorator.",
            "الـ selector.",
            R`[[ReactiveFormsModule]] عشان [[[formControl]]].`,
            "بداية الـ template.",
            "input مربوط بـ control لوحده.",
            "النتايج من signal.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "الـ API service.",
            R`control نوعه [[string]].`,
            R`[[toSignal]] بيحوّل الـ stream كله لـ signal.`,
            "كل تغيير في الـ input.",
            "استنى لحد ما يبطّل كتابة ٣٠٠ms.",
            "شيل المسافات.",
            "متعيدش نفس الكلمة.",
            R`أقل من حرفين: فاضي. غير كده: اطلب، والغي القديم، ولو فشل رجّع فاضي من غير ما تموّت الـ stream.`,
            "قفلة الـ pipe.",
            R`قيمة لحد أول نتيجة، والنوع صريح عشان [[of([])]].`,
            "قفلة toSignal.",
            "قفلة."
          ],
          sol: R`مع switchMap (اتشغّل في الـ lab):

[[طلب: lap]] ← [[نتايج "lap"]] ← [[طلب: laptop]] ← [[طلب: lap]] ← [[نتايج "lap"]].

[[l]] و [[la]] مابقوش طلبات خالص (debounce). وطلب [[laptop]] اتبعت بس نتيجته عمرها ما ظهرت: [[lap]] وصلت وهو شغال فاتلغى. ولاحظ إن [[lap]] التانية عدّت distinctUntilChanged لأن اللي قبلها مباشرة كانت [[laptop]].

مع mergeMap: [[طلب: lap]] ← [[نتايج "lap"]] ← [[طلب: laptop]] ← [[طلب: lap]] ← [[نتايج "laptop"]] ← [[نتايج "lap"]]. نتيجة laptop ظهرت رغم إن المستخدم بقى كاتب lap. هنا الترتيب طلع صح بالصدفة لأن كل الطلبات ٤٠٠ms؛ لو laptop اتأخر أكتر، كانت هتظهر آخر حاجة وتغطي النتيجة الصح.`,
          solCode: R`import { Subject, debounceTime, distinctUntilChanged, switchMap, timer, map } from 'rxjs';
const typed$ = new Subject<string>();
const fakeApi = (q: string) => { console.log('  طلب:', q); return timer(400).pipe(map(() => $__btنتايج "$__{q}"$__bt)); };
typed$.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap((q) => fakeApi(q)),
).subscribe((r) => console.log(r));
['l', 'la', 'lap'].forEach((k, i) => setTimeout(() => typed$.next(k), i * 100));
setTimeout(() => typed$.next('laptop'), 800);
setTimeout(() => typed$.next('lap'), 1150);`
        },
        {
          cmd: "async pipe و toSignal",
          title: "تعرض Observable في الـ template من غير subscribe بإيدك",
          desc: R`٣ طرق تستهلك Observable في component من غير ما تنسى الـ unsubscribe:

[[async]] pipe: [[{{ user$ | async }}]] أو [[@for (p of (products$ | async) ?? []; ...)]]. بتعمل subscribe وتعمل unsubscribe لما الـ component يتقفل. ده الشكل اللي هتلاقيه في كل مشروع قديم.

[[toSignal(obs$, { initialValue })]] من [[@angular/core/rxjs-interop]]: بيحوّله لـ signal تستخدمها في الـ template و computed. ده الشكل الحديث.

[[takeUntilDestroyed()]]: لو لازم تعمل subscribe بإيدك (عشان side effect)، حطه في الـ pipe وهيقفل لوحده مع الـ component.

والعكس: [[toObservable(signal)]] لو عندك signal ومحتاج operators.`,
          example: R`@Component({
  selector: 'app-async-demo',
  imports: [AsyncPipe],
  template: $__bt
    @for (p of (products$ | async) ?? []; track p.id) { <p>{{ p.name }}</p> }
    <p>{{ products().length }} منتج - {{ seconds() }} ثانية</p>
  $__bt,
})
export class AsyncDemo {
  private api = inject(ProductsApi);
  products$ = this.api.list();
  products = toSignal(this.api.list(), { initialValue: [] });
  seconds = signal(0);
  constructor() {
    interval(1000).pipe(takeUntilDestroyed()).subscribe(() => this.seconds.update((s) => s + 1));
  }
}`,
          try: R`حط الـ component ده في صفحة، وافتح Network: كام طلب لـ [[/api/products]]؟ ليه؟ بعدين اتنقل لصفحة تانية وارجع، وحط [[console.log]] في الـ subscribe بتاع الـ interval: بيقف لما تخرج؟ جرّب تشيل [[takeUntilDestroyed()]] وكرر.`,
          flag: "script",
          deep: {
            why: R`أكتر bug في كود Angular القديم: [[subscribe]] في [[ngOnInit]] من غير unsubscribe، فكل مرة تفتح الصفحة يتضاف subscriber جديد، وبعد ١٠ مرات فيه ١٠ callbacks شغالين. الطرق التلاتة دي بتربط عمر الـ subscription بعمر الـ component أوتوماتيك.`,
            how: R`[[async]] pipe بتعمل subscribe أول ما الـ template يترسم، وبترجّع [[null]] لحد أول قيمة (عشان كده [[?? []]])، وبتعمل [[markForCheck]] مع كل قيمة جديدة فبتشتغل مع OnPush، وبتعمل unsubscribe في الـ destroy.

كل [[| async]] = subscribe منفصل. لو كتبت [[products$ | async]] في مكانين على HTTP Observable = طلبين. الحل: [[@let products = products$ | async;]] مرة واحدة، أو [[toSignal]].

[[toSignal]] بيعمل subscribe فورًا (لازم في injection context) ويعمل unsubscribe مع الـ destroy. من غير [[initialValue]]، النوع بيبقى [[T | undefined]]. ولو الـ Observable بيطلّع قيمة sync (زي BehaviorSubject) استخدم [[requireSync: true]]. ولو الـ Observable وقع بخطأ، قراية الـ signal بترمي الخطأ.

[[takeUntilDestroyed()]] بيستخدم [[DestroyRef]]: من غير argument لازم injection context (constructor)، وبرا منه اديله [[this.destroyRef]]. وده بديل الـ pattern القديم [[private destroy$ = new Subject<void>()]] مع [[takeUntil(this.destroy$)]] و [[ngOnDestroy]] (المستوى ٣).`,
            when: R`[[toSignal]] في الكود الجديد لأي Observable عايز تعرضه. [[async]] pipe هتفضل تقابلها وتكتبها في مشاريع قديمة. و [[takeUntilDestroyed]] لأي subscribe بإيدك عشان side effect (مثلًا [[valueChanges]] بتحفظ draft).`,
            mistakes: R`[[this.api.list().subscribe(p => this.products = p)]] في component: مع zoneless و OnPush (الافتراضي في 22) الشاشة مش هتتحدّث لأن [[products]] خاصية عادية، غير كده unsubscribe منسي. وتستخدم [[| async]] على نفس الـ HTTP مرتين. و [[toSignal]] جوه method: NG0203. و [[takeUntilDestroyed()]] مش آخر operator فـ operators بعده (زي switchMap) تفضل شغالة.`
          },
          teach: R`## الفكرة: ٣ طرق، وكلهم بيقفلوا لوحدهم

المثال component واحد بيستخدم الطرق التلاتة: [[async]] pipe في الـ template، و [[toSignal]] في الكلاس، و [[subscribe]] بإيدك ومعاه [[takeUntilDestroyed()]]. والهدف واحد: الـ subscription يموت لما الـ component يموت. اتجرّب في Angular 22.2 على Windows، مع API بـ Node، في Chrome headless، واتنقلنا بين الصفحات بالراوتر.

---

## ١. الـ decorator والـ template

~~~ts
imports: [AsyncPipe],
~~~

[[AsyncPipe]] من [[@angular/common]]، ومن غيرها [[| async]] مش هيتعرف.

~~~html
@for (p of (products$ | async) ?? []; track p.id) { <p>{{ p.name }}</p> }
<p>{{ products().length }} منتج - {{ seconds() }} ثانية</p>
~~~

### [[(products$ | async) ?? []]] من جوه لبرة

1. [[products$]]: Observable خام من الكلاس.
2. [[| async]]: pipe بتعمل subscribe عليه، وترجّع آخر قيمة وصلت. ولحد أول قيمة بترجّع [[null]].
3. [[?? []]]: الـ nullish operator: لو اللي على الشمال [[null]] أو [[undefined]]، خد [[[]]]. من غيره [[@for]] هيلف على [[null]].
4. الأقواس حوالين [[products$ | async]] عشان الـ pipe يتنفذ الأول.

### السطر التاني

[[products()]] و [[seconds()]] signals عادية بتتقرا بـ [[()]].

---

## ٢. الكلاس

~~~ts
private api = inject(ProductsApi);
products$ = this.api.list();
products = toSignal(this.api.list(), { initialValue: [] });
seconds = signal(0);
~~~

- [[products$ = this.api.list()]]: Observable للطلب، ولسه مفيش طلب. الـ [[async]] pipe هي اللي هتعمل subscribe.
- [[toSignal(this.api.list(), { initialValue: [] })]]: من [[@angular/core/rxjs-interop]]. بيعمل subscribe **دلوقتي** (عشان كده لازم يتكتب كـ field أو في الـ constructor)، ويحط القيمة في signal، ويعمل unsubscribe لما الـ component يتقفل. و [[initialValue]] قيمة الـ signal لحد الرد.

### الـ constructor

~~~ts
constructor() {
  interval(1000).pipe(takeUntilDestroyed()).subscribe(() => this.seconds.update((s) => s + 1));
}
~~~

- [[interval(1000)]]: رقم كل ثانية، ومش بيخلص لوحده أبدًا.
- [[takeUntilDestroyed()]]: operator من [[@angular/core/rxjs-interop]]. بيقفل الـ stream لما الـ component يتعمله destroy. من غير argument لازم يتكتب في injection context (الـ constructor مثلًا)، لأنه بيعمل [[inject(DestroyRef)]] من جوه.
- [[this.seconds.update((s) => s + 1)]]: زوّد العدّاد واحد.

---

## ٣. اللي حصل فعلًا

زوّدنا [[console.log('tick', ...)]] جوه الـ subscribe زي ما الـ try بيقول:

~~~text الناتج (Chrome): فتحنا /async
[req] GET /api/products?q=
[req] GET /api/products?q=
[res] 200 GET /api/products?q=
tick 1
[res] 200 GET /api/products?q=
tick 2
TEXT: قلم / كشكول / مسطرة / لابتوب / شنطة لابتوب / 5 منتج - 2 ثانية
--- leave to /login
--- back to /async
[req] GET /api/products?q=
[req] GET /api/products?q=
tick 1
~~~

- **طلبين** مش واحد: [[| async]] عمل subscribe، و [[toSignal]] عمل subscribe تاني. الـ HTTP Observable «cold»، فكل subscribe = طلب. ولو كتبت [[| async]] مرتين في الـ template يبقوا ٣.
- لما خرجنا لـ [[/login]]: الـ ticks **وقفت**. [[takeUntilDestroyed]] قفل الـ interval.
- لما رجعنا: component جديد، والعدّاد بدأ من 1، وطلبين جداد.

### من غير [[takeUntilDestroyed()]]

component تاني نفس الـ interval بس من غير الـ operator:

~~~text الناتج (Chrome): /leak
leak tick 1
leak tick 2
--- leave to /login
leak tick 3
leak tick 4
--- back to /leak
leak tick 5
leak tick 1
leak tick 6
leak tick 2
leak tick 7
~~~

الـ component القديم اتقفل من الشاشة، بس الـ interval بتاعه لسه شغال (3 و 4 وهو برا الصفحة). ولما رجعنا بقى فيه اتنين: القديم (5 و 6 و 7) والجديد (1 و 2). ده الـ memory leak، وبيكبر مع كل دخول وخروج.

---

## ٤. ليه مش [[subscribe]] وتحط في property؟

جرّبنا الشكل اللي في الكود القديم:

~~~ts
products: Product[] = [];
constructor() { inject(ProductsApi).list().subscribe((p) => { this.products = p; console.log('subscribe got', p.length); }); }
~~~

مع template فيه [[{{ products.length }} منتج]]:

~~~text الناتج (Chrome)
subscribe got 5
TEXT: 0 منتج
~~~

البيانات وصلت، والشاشة فضلت «0 منتج». Angular 22 من غير zone.js (zoneless)، فمحدش بيقول للشاشة تتحدّث لما property عادية تتغير. الـ signal ([[toSignal]]) والـ [[async]] pipe الاتنين بيبلّغوا Angular، فالشاشة بتتحدّث.

---

## الخلاصة

| الطريقة | بتعمل subscribe إمتى | بتقفل إمتى | تستخدمها إمتى |
|---|---|---|---|
| الـ [[async]] pipe في الـ template | لما الـ template يترسم | مع الـ destroy | كود قديم، أو template بسيط |
| [[toSignal(obs$, { initialValue })]] | فورًا (injection context) | مع الـ destroy | الكود الجديد: signal تقراها في أي حتة |
| [[.pipe(takeUntilDestroyed()).subscribe(...)]] | انت | مع الـ destroy | side effect (حفظ، log) مش عرض |
| [[toObservable(signal)]] | | | العكس: signal محتاج operators |

وكل subscribe على HTTP Observable = طلب جديد.`,
          lines: [
            "الـ decorator.",
            "الـ selector.",
            R`[[AsyncPipe]] لازم تتعمل import.`,
            "بداية الـ template.",
            R`[[async]] بترجّع null لحد أول رد، فبنحط [[?? []]].`,
            "من الـ signal ومن الـ interval.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "الـ API.",
            "Observable خام، الـ async pipe هتعمل subscribe.",
            R`[[toSignal]]: subscribe دلوقتي، و unsubscribe مع الـ destroy.`,
            "signal بتعدّ الثواني.",
            "الـ constructor injection context.",
            R`subscribe بإيدنا، بس [[takeUntilDestroyed]] بيقفله مع الـ component.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`في Network: طلبين لـ [[/api/products]]، واحد من [[| async]] وواحد من [[toSignal]]، لأن كل واحد عمل subscribe لوحده على Observable بارد. ولو الـ template فيه [[| async]] مرتين، هيبقوا ٣.

مع [[takeUntilDestroyed()]]: الـ log بيقف أول ما تخرج من الصفحة، ولما ترجع بيبدأ من 0. من غيره: بعد ما تخرج الـ log مكمّل، ولما ترجع هتلاقي سطرين كل ثانية (القديم والجديد)، وكل مرة تدخل وتخرج بيزيدوا. ده الـ leak.

ملحوظة من الـ lab: الـ component ده بيعمل طلب HTTP في الـ constructor، ولما التطبيق كان عليه SSR و prerender، الـ build وقع بـ Unable to handle request: '/api/products?q=' لأن الـ URL نسبي ومفيش سيرفر وقت الـ build. ده موضوع درس SSR في المستوى ٣.`
        }
      ]
    }
]);

// تكملة تاب angular: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/angular/01.js (شرح حقول الدرس في أوله)
MORE("angular", [
    {
      t: "الـ components والـ templates",
      l: 1,
      n: "كلاس عليه @Component، و template فيه bindings، و input و output و model بين الأب والابن",
      items: [
        {
          cmd: "@Component",
          title: "شكل الـ component: selector و template و imports",
          desc: R`الـ component في Angular كلاس TypeScript عليه decorator اسمه [[@Component]]. الـ decorator بيقول: الـ tag اسمه إيه ([[selector]])، والـ HTML بتاعه ([[template]] أو [[templateUrl]])، والـ CSS ([[styles]] أو [[styleUrl]])، وبيستخدم components تانية إيه ([[imports]]).

الكلاس نفسه فيه البيانات والدوال، والـ template بيقرا منهم. زي function component في React، بس هنا الـ HTML منفصل عن الكود، ومش JSX.

وكل component في Angular الحديث standalone: بيعلن اللي محتاجه في [[imports]] بتاعته، من غير NgModule.`,
          example: R`import { Component, signal } from '@angular/core';
@Component({
  selector: 'app-hello',
  template: $__bt
    <h1>أهلا يا {{ name() }}</h1>
    <p>عندك {{ count() }} رسالة</p>
  $__bt,
  styles: $__bth1 { color: teal; }$__bt,
})
export class Hello {
  protected readonly name = signal('سارة');
  protected readonly count = signal(3);
}
// في app.ts: imports: [Hello] وفي الـ template: <app-hello />`,
          try: R`اعمل الـ component ده في [[src/app/hello.ts]]، وضيفه في [[imports]] بتاع [[App]]، واكتب [[<app-hello />]] في app.html. بعدين امسح [[Hello]] من الـ imports وشوف الـ build بيقول إيه.`,
          flag: "script",
          deep: {
            why: "الشاشة بتتقسم لقطع صغيرة كل واحدة مسؤولة عن حتة: هيدر، وكارت منتج، وسلة. كل قطعة ليها HTML و CSS ومنطق، ولو في ملف واحد ضخم محدش هيعرف يلاقي حاجة. الـ component بيجمع التلاتة في وحدة واحدة ليها اسم تستخدمه زي tag.",
            how: R`الـ compiler بيقرا الـ decorator وقت الـ build ويحوّل الـ template لتعليمات JS بتعمل الـ DOM وتحدّثه. عشان كده لو كتبت [[<app-hello />]] وانت ناسي تحطه في [[imports]]، الـ build بيقع بـ NG8001: 'app-hello' is not a known element. ده مش خطأ runtime، ده من الـ compiler.

الـ styles معزولة افتراضيًا (Emulated encapsulation): Angular بيضيف attribute زي [[_ngcontent-ng-c123]] على العناصر ويعدّل الـ CSS بتاعك عشان يطبّق عليها بس. فـ [[h1 { color: teal }]] هنا مش هيلوّن كل h1 في الموقع.

[[protected]] على الخصايص معناها «الـ template يقدر يشوفها، بس كلاس تاني من برا لأ»، والـ CLI بيولّدها كده. و [[readonly]] عشان متعيّنش الـ signal نفسه بقيمة تانية بالغلط.

والـ self-closing [[<app-hello />]] مسموح من Angular 15.1.`,
            when: "أي حتة في الشاشة ليها معنى لوحدها أو بتتكرر. في الأول template صغير inline جوه الـ .ts مريح، ولما يكبر عن ١٠ سطور تقريبًا انقله لـ [[templateUrl]].",
            mistakes: R`تنسى تحط الـ component في [[imports]] بتاع الأب (NG8001). وتكتب [[{{ name }}]] على signal من غير قوسين: الـ build بيعدّي بتحذيرين (NG8109 و NG8117) والصفحة بتطبع [[[Signal (name): سارة]]]، الصح [[{{ name() }}]]. وتتوقع إن CSS الـ component يأثر على component جوّاه: لأ، العزل بيمنعه. وفي كود قديم هتلاقي [[standalone: false]] أو components متعرفة في NgModule، وده الشكل القديم (المستوى ٣).`
          },
          teach: R`## الفكرة: كلاس عادي + decorator بيقول لـ Angular «ده component»

المثال ٣ حتت: سطر import، وdecorator فيه الإعدادات، وكلاس فيه البيانات. اتشغّل في مشروع Angular 22.2 ([[ng serve]] و [[ng build]]) واتفحص في Chrome headless.

---

## ١. الـ import

~~~text hello.ts
import { Component, signal } from '@angular/core';
~~~

[[@angular/core]] قلب Angular. بناخد منه [[Component]] (الـ decorator) و [[signal]] (علبة لقيمة بتتغير، ليها درس كامل بعد شوية). الأقواس [[{ }]] معناها «هات الحاجات دي بالاسم» (named imports).

---

## ٢. الـ decorator: [[@Component({...})]]

الـ decorator دالة بتتكتب بـ [[@]] فوق الكلاس على طول، وبتضيف له معلومات. هنا بتاخد object فيه الإعدادات:

### [[selector: 'app-hello']]

اسم الـ tag اللي هتكتبه في HTML أي component تاني: [[<app-hello />]]. الشرطة في الاسم مش ديكور: أي custom element في HTML لازم يبقى فيه شرطة عشان ميتخانقش مع tags المتصفح، و [[app-]] هو الـ prefix بتاع المشروع.

### [[template]]

الـ HTML نفسه، مكتوب بين علامتين backtick (template string في TypeScript) عشان يبقى على كذا سطر:

~~~text template
<h1>أهلا يا {{ name() }}</h1>
<p>عندك {{ count() }} رسالة</p>
~~~

- [[{{ }}]] اسمها interpolation: «اطبع قيمة الـ expression ده كنص».
- [[name()]] بالقوسين: الـ signal بتتقري كأنها دالة.

### [[styles]]

[[h1 { color: teal; }]]: CSS خاص بالـ component ده. ولو الـ HTML أو الـ CSS كبروا، بتنقلهم لملفات وتكتب [[templateUrl: './hello.html']] و [[styleUrl: './hello.css']] زي اللي [[ng g c]] بيولّده.

---

## ٣. الكلاس

~~~text hello.ts
export class Hello {
  protected readonly name = signal('سارة');
  protected readonly count = signal(3);
}
~~~

| الكلمة | معناها |
|---|---|
| [[export]] | عشان ملف تاني يقدر يعمل [[import { Hello }]] |
| [[class Hello]] | اسم الكلاس، من غير كلمة Component في آخره (الشكل الحديث) |
| [[protected]] | الـ template يشوفها، بس كود من برا الكلاس لأ |
| [[readonly]] | متقدرش تكتب [[this.name = ...]] وتبدّل الـ signal نفسها؛ بتغيّر القيمة اللي جواها بـ [[set]] |
| [[signal('سارة')]] | signal قيمتها الأولى سارة، ونوعها اتعرف لوحده: string |

---

## ٤. نستخدمه: [[imports: [Hello]]]

في [[app.ts]] (زي الـ solCode):

~~~text app.ts
@Component({
  selector: 'app-root',
  imports: [Hello],
  template: $__bt<app-hello />$__bt,
})
export class App {}
~~~

[[imports]] هي قايمة الـ components (والـ directives والـ pipes) اللي الـ template ده مسموح يستخدمها. ده معنى standalone: كل component بيعلن اللي محتاجه بنفسه.

### الناتج في المتصفح

~~~text الـ DOM في Chrome
<app-hello _nghost-ng-c4047523299="">
  <h1 _ngcontent-ng-c4047523299="">أهلا يا سارة</h1>
  <p _ngcontent-ng-c4047523299="">عندك 3 رسالة</p>
</app-hello>
~~~

ولون الـ h1 طلع [[rgb(0, 128, 128)]]، وده teal.

### الـ attributes الغريبة دي إيه؟

دي آلية عزل الـ CSS. Angular حط [[_nghost-...]] على الـ tag نفسه و [[_ngcontent-...]] على كل عنصر جواه، وعدّل الـ CSS بتاعك لده:

~~~text الـ style اللي اتحط في الصفحة
h1[_ngcontent-ng-c4047523299] {
  color: teal;
}
~~~

يعني الـ h1 اللي عليه الـ attribute ده بس، مش كل h1 في الموقع. الرقم بيتولّد لكل component.

---

## ٥. لو نسيت [[imports]]

شلنا [[Hello]] من [[imports]] وسبنا [[<app-hello />]] في الـ template، و [[ng build]]:

~~~text الناتج
Application bundle generation failed.

X [ERROR] NG8001: 'app-hello' is not a known element:
1. If 'app-hello' is an Angular component, then verify that it is included in the '@Component.imports' of this component.
2. If 'app-hello' is a Web Component then add 'CUSTOM_ELEMENTS_SCHEMA' to the '@Component.schemas' of this component to suppress this message.

    src/app/app.ts:7:13:
      7 │   template: $__bt<app-hello /><router-outlet />$__bt,
        ╵              ~~~~~~~~~~~~~
~~~

اقرا الرسالة: الـ compiler مش عارف [[app-hello]]، واقترح حلين: لو component حطه في الـ imports (ده حالتنا)، ولو Web Component (عنصر معمول من غير Angular) قوله يتجاهله. والسهم تحت بيشاور على السطر والعمود بالظبط. والـ build وقع، يعني الغلطة مش هتوصل للمستخدم.

والعكس: [[Hello]] في [[imports]] والـ template مش بيستخدمه:

~~~text الناتج
▲ [WARNING] NG8113: Hello is not used within the template of App
~~~

تحذير بس، والـ build بيكمّل. شيله عشان الـ bundle.

---

## ٦. لو نسيت القوسين: [[{{ name }}]]

~~~text الناتج
▲ [WARNING] NG8109: name is a function and should be invoked: name()
▲ [WARNING] NG8117: Function in text interpolation should be invoked: name().
~~~

والصفحة طبعت:

~~~text الناتج في Chrome
أهلا يا [Signal (name): سارة]
~~~

اللي اتطبع وصف الـ signal نفسها مش القيمة. الـ compiler حذّرك، فاقرا التحذيرات.

---

## الخلاصة

| الحتة | شغلتها |
|---|---|
| [[@Component({...})]] | يحوّل الكلاس لـ component |
| [[selector]] | اسم الـ tag، فيه شرطة |
| [[template]] / [[templateUrl]] | الـ HTML |
| [[styles]] / [[styleUrl]] | CSS معزول للـ component ده بس |
| [[imports]] | اللي الـ template ده بيستخدمه، وإلا NG8001 |
| [[{{ x() }}]] | اطبع قيمة signal، بالقوسين |`,
          lines: [
            R`[[Component]] الـ decorator، و [[signal]] عشان البيانات اللي بتتغير.`,
            "الـ decorator: كل الإعدادات جوه object.",
            R`الاسم اللي هتكتبه في HTML: [[<app-hello />]].`,
            "الـ HTML inline بين backticks.",
            R`[[{{ }}]] بيطبع قيمة. [[name()]] بتقرا الـ signal.`,
            "نفس الفكرة لرقم.",
            "قفلة الـ template.",
            "CSS خاص بالـ component ده بس.",
            "قفلة الـ decorator.",
            R`الكلاس. اسمه [[Hello]] من غير كلمة Component في الشكل الحديث.`,
            R`بيانات الـ component. [[protected]] يعني الـ template يشوفها.`,
            "رقم في signal.",
            "قفلة الكلاس."
          ],
          sol: R`لما يبقى في الـ imports هتشوف «أهلا يا سارة» بلون teal و «عندك 3 رسالة». وافتح DevTools: هتلاقي [[<app-hello _nghost-...>]] والـ h1 عليه [[_ngcontent-...]]، ودي آلية عزل الـ CSS.

لما تمسحه من الـ imports، [[ng serve]] بيطلّع:

[[NG8001: 'app-hello' is not a known element]] ومعاه اقتراح: If 'app-hello' is an Angular component, then verify that it is included in the '@Component.imports' of this component. والعكس: لو [[Hello]] في [[imports]] والـ template مش بيستخدمه، الـ build بيعدّي بتحذير [[NG8113: Hello is not used within the template of App]]. الخطأ بيطلع في الـ build، مش بعد ما تفتح الصفحة، وده من فوايد الـ AOT compiler.`,
          solCode: R`// app.ts
import { Component } from '@angular/core';
import { Hello } from './hello';
@Component({
  selector: 'app-root',
  imports: [Hello],
  template: $__bt<app-hello />$__bt,
})
export class App {}`
        },
        {
          cmd: "bindings",
          title: "{{ }} و [prop] و (event) و #ref في الـ template",
          desc: R`الـ template بيتكلم مع الكلاس بـ ٤ أشكال:

[[{{ expr }}]] interpolation: بتطبع قيمة كنص.

[[[prop]="expr"]] property binding: بتحط قيمة في خاصية DOM ([[[disabled]]] و [[[src]]])، أو [[[class.active]]] و [[[style.width.px]]].

[[(event)="handler()"]] event binding: بتسمع لحدث. [[$event]] هو الـ event نفسه، و [[(keyup.enter)]] بيسمع لـ Enter بس.

[[#box]] template reference: اسم لعنصر تقدر تستخدمه في نفس الـ template.

الأقواس المربعة = البيانات داخلة للعنصر، والقوسين العاديين = حدث طالع منه.`,
          example: R`@Component({
  selector: 'app-bindings',
  template: $__bt
    <img [src]="photo" [alt]="title" />
    <button [disabled]="saving()" (click)="save()">حفظ</button>
    <p [class.error]="failed()" [style.font-size.px]="16">{{ status() }}</p>
    <input #box (keyup.enter)="greet(box.value)" />
  $__bt,
})
export class Bindings {
  protected photo = '/logo.png';
  protected title = 'لوجو المحل';
  protected saving = signal(false);
  protected failed = signal(false);
  protected status = signal('جاهز');
  protected save() { this.saving.set(true); this.status.set('بيحفظ...'); }
  protected greet(v: string) { this.status.set('أهلا ' + v); }
}`,
          try: R`حط الـ component واكتب اسمك في الـ input واضغط Enter. بعدين اضغط حفظ وشوف الزرار اتقفل. وجرّب تكتب [[disabled="saving()"]] من غير أقواس مربعة، وشوف الزرار بيبقى إيه.`,
          flag: "script",
          deep: {
            why: "محتاج طريقة توصّل البيانات بالشاشة في الاتجاهين من غير ما تكتب querySelector و addEventListener بإيدك. الـ bindings بتقول لـ Angular «الخاصية دي مربوطة بالقيمة دي»، وهو اللي يحدّثها لما القيمة تتغير.",
            how: R`[[[disabled]="saving()"]] مش HTML attribute، دي property على الـ DOM element ([[button.disabled = true]]). الفرق مهم: الـ attribute نص ثابت في HTML، والـ property قيمة JS حية. لو محتاج attribute فعلًا (زي [[aria-label]] أو [[colspan]]) اكتب [[[attr.aria-label]]].

من غير أقواس، [[disabled="saving()"]] بتبقى نص ثابت "saving()"، ووجود attribute [[disabled]] أصلًا بيقفل الزرار أيًا كانت قيمته.

الـ expressions في الـ template JS محدودة: تقرا وتنادي دوال وتستخدم [[?.]] و [[??]] و ternary، بس متعملش [[new]] ولا assignments معقدة. والـ compiler بيفحص أنواعها (strict templates شغال افتراضيًا)، فلو كتبت [[greet(box.valu)]] هيطلع خطأ build.

[[(keyup.enter)]] pseudo-event من Angular: بيفلتر المفتاح بدالك. وفيه [[(keydown.control.s)]] وغيره.`,
            when: R`interpolation للنص، و [[[prop]]] لأي حاجة مش نص أو خاصية DOM، و [[(event)]] لأي تفاعل. و [[#ref]] لما محتاج قيمة عنصر في نفس الـ template من غير ما تخزنها في الكلاس.`,
            mistakes: R`[[[src]="'/logo.png'"]] بدل [[src="/logo.png"]]: لو القيمة ثابتة مش محتاج binding. و [[(click)="save"]] من غير قوسين: مش هيحصل حاجة، لازم تنادي الدالة [[save()]]. و [[{{ }}]] جوه [[[prop]]]: متخلطهمش، اختار واحد. وتعدّل state جوه expression في الـ template (زي [[{{ count = count + 1 }}]]): ممنوع ومش منطقي.`
          },
          teach: R`## الفكرة: ٤ رموز، كل واحد ليه اتجاه

| الرمز | الاسم | الاتجاه |
|---|---|---|
| [[{{ x }}]] | interpolation | من الكلاس للشاشة، كنص |
| [[[prop]="x"]] | property binding | من الكلاس لخاصية في العنصر |
| [[(event)="f()"]] | event binding | من العنصر للكلاس، لما حاجة تحصل |
| [[#name]] | template reference | اسم للعنصر جوه الـ template نفسه |

افتكرها كده: الأقواس المربعة **داخلة** للعنصر، والقوسين العاديين **طالعين** منه. المثال اتشغّل في [[ng serve]] (Angular 22.2) واتفحص في Chrome headless بـ Playwright. (المثال من غير سطر import: محتاج [[import { Component, signal } from '@angular/core';]] فوق.)

---

## ١. [[<img [src]="photo" [alt]="title" />]]

[[[src]="photo"]] معناها: خاصية [[src]] بتاعة الصورة = قيمة [[photo]] من الكلاس. اللي جوه علامات التنصيص **expression** (كود)، مش نص. فـ [[photo]] هنا اسم خاصية، قيمتها [['/logo.png']].

~~~text الـ DOM في Chrome
<img src="/logo.png" alt="لوجو المحل">
~~~

(والصورة طلعت 404 لأن مفيش [[logo.png]] في [[public/]]، وده طبيعي في التجربة.)

> القيمة هنا ثابتة، فكان ممكن [[src="/logo.png"]] من غير binding. الـ binding مفيد لما القيمة جاية من الكلاس أو بتتغير.

---

## ٢. [[<button [disabled]="saving()" (click)="save()">]]

حتتين على نفس العنصر:

### [[[disabled]="saving()"]]

[[disabled]] هنا **property** على عنصر الـ DOM، يعني [[button.disabled = false]] أو [[true]] حسب [[saving()]]. في الأول [[saving]] بـ [[false]]:

~~~text الـ DOM في الأول
<button>حفظ</button>          button.disabled = false
~~~

### [[(click)="save()"]]

لما الزرار يتداس، نفّذ [[save()]]. لاحظ القوسين بعد [[save]]: انت بتكتب كود بيتنفّذ، فلازم تنادي الدالة.

و [[save()]] في الكلاس:

~~~text bindings.ts
protected save() { this.saving.set(true); this.status.set('بيحفظ...'); }
~~~

[[set]] بتحط قيمة جديدة في الـ signal، و Angular بيحدّث كل حتة في الشاشة بتقراها. بعد الضغطة:

~~~text الـ DOM بعد الضغط
<button disabled="">حفظ</button>      button.disabled = true
<p style="font-size: 16px;">بيحفظ...</p>
~~~

---

## ٣. [[<p [class.error]="failed()" [style.font-size.px]="16">]]

شكلين مختصرين للـ property binding:

| الشكل | معناه |
|---|---|
| [[[class.error]="failed()"]] | حط class اسمه [[error]] لو القيمة [[true]]، وشيله لو [[false]] |
| [[[style.font-size.px]="16"]] | [[style.fontSize = '16px']]. الـ [[.px]] في الآخر هي الوحدة |

[[failed()]] بـ [[false]]، فمفيش class، والـ style اتحط:

~~~text الـ DOM
<p style="font-size: 16px;">جاهز</p>
~~~

و [[{{ status() }}]] جوّاه بيطبع النص من الـ signal.

---

## ٤. [[<input #box (keyup.enter)="greet(box.value)" />]]

- [[#box]]: اسم للـ input ده، تقدر تستخدمه في أي حتة في نفس الـ template. [[box]] هنا هو عنصر الـ DOM نفسه ([[HTMLInputElement]])، فـ [[box.value]] هو المكتوب جواه.
- [[(keyup.enter)]]: حدث [[keyup]] (رفع الصباع من على زرار)، بس لو الزرار Enter. الفلترة دي من Angular، مش من المتصفح.
- [[greet(box.value)]]: ابعت النص لـ [[greet]].

كتبنا «سارة» ودوسنا Enter:

~~~text الناتج
after enter p: أهلا سارة
~~~

### والـ template متفحوص بالأنواع

غلطنا وكتبنا [[box.valu]]، و [[ng build]]:

~~~text الناتج
X [ERROR] TS2551: Property 'valu' does not exist on type 'HTMLInputElement'. Did you mean 'value'?

      8 │     <input #box (keyup.enter)="greet(box.valu)" />
        ╵                                          ~~~~
~~~

الـ compiler عارف إن [[box]] نوعه [[HTMLInputElement]] وفحص الاسم، زي TypeScript في ملف [[.ts]] بالظبط.

---

## ٥. الكلاس

| السطر | ليه كده |
|---|---|
| [[protected photo = '/logo.png']] | خاصية عادية: مش هتتغير، فمش محتاجة signal |
| [[protected saving = signal(false)]] | بتتغير والشاشة لازم تعرف، فـ signal |
| [[protected greet(v: string)]] | [[v: string]] نوع الـ parameter |
| [[this.status.set('أهلا ' + v)]] | [[+]] بيلزق نصين |

---

## ٦. التجربة: [[disabled="saving()"]] من غير أقواس

~~~text الـ DOM من أول لحظة
<button disabled="saving()">حفظ</button>      button.disabled = true
~~~

من غير أقواس مربعة ده بقى HTML attribute عادي قيمته **النص** «saving()»، و Angular مش بيقيّمه. وفي HTML مجرد وجود attribute [[disabled]] بيقفل الزرار أيًا كانت قيمته، فالزرار اتقفل من الأول ومعرفناش ندوس عليه خالص.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تطبع قيمة | [[{{ status() }}]] |
| خاصية من الكلاس | [[[disabled]="saving()"]] |
| class بشرط | [[[class.error]="failed()"]] |
| style بوحدة | [[[style.font-size.px]="16"]] |
| تسمع لحدث | [[(click)="save()"]] بالقوسين |
| Enter بس | [[(keyup.enter)]] |
| عنصر من الـ template | [[#box]] وبعدين [[box.value]] |
| attribute حقيقي | [[[attr.aria-label]="x"]] |`,
          lines: [
            "الـ decorator.",
            "اسم الـ tag.",
            "بداية الـ template.",
            R`property binding: [[src]] و [[alt]] جايين من الكلاس.`,
            R`الزرار مقفول لو [[saving()]] بـ true، والضغط بينادي [[save()]].`,
            R`class [[error]] بيتحط لو [[failed()]] بـ true، وحجم الخط 16px، والنص من [[status()]].`,
            R`[[#box]] اسم للـ input، و Enter بيبعت قيمته لـ [[greet]].`,
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "خاصية عادية مش signal لأنها مش هتتغير.",
            "نفس الكلام.",
            "حالة الحفظ في signal عشان الشاشة تتحدّث لما تتغير.",
            "حالة الخطأ.",
            "النص اللي بيظهر.",
            R`[[set]] بتغيّر قيمة الـ signal، والشاشة بتتحدّث لوحدها.`,
            "بتاخد النص من الـ input.",
            "قفلة الكلاس."
          ],
          sol: R`لما تكتب «سارة» وتضغط Enter، النص تحت بيبقى «أهلا سارة». ولما تضغط حفظ، الزرار بيبقى رمادي ومقفول والنص «بيحفظ...».

لما تكتب [[disabled="saving()"]] من غير أقواس، الزرار بيبقى مقفول من أول لحظة ومش هيتفتح أبدًا. السبب: ده بقى HTML attribute قيمته النص "saving()"، ومجرد وجود attribute [[disabled]] بيقفل الزرار. نفس الحكاية مع [[disabled="false"]]: برضه مقفول. عشان كده القيم الـ boolean دايمًا بـ [[[disabled]]].`
        },
        {
          cmd: "input() و output()",
          title: "تبعت بيانات للـ component الابن، وتسمع منه",
          desc: R`الأب بيبعت بيانات للابن عن طريق [[input()]]، والابن بيبلّغ الأب بحاجة حصلت عن طريق [[output()]]. زي props و callbacks في React بالظبط، بس بشكل مختلف:

في الابن: [[product = input.required<Product>()]] و [[added = output<number>()]].

في الأب: [[<app-product-card [product]="p" (added)="onAdd($event)" />]].

[[input()]] بترجع signal للقراية بس: بتقراها [[product()]] ومتقدرش تعمل لها set من جوه الابن.`,
          example: R`import { Component, computed, input, output } from '@angular/core';
export type Product = { id: number; name: string; price: number };
@Component({
  selector: 'app-product-card',
  template: $__bt
    <h3>{{ product().name }}</h3>
    <p>{{ priceLabel() }}</p>
    <button (click)="added.emit(product().id)">أضف للسلة</button>
  $__bt,
})
export class ProductCard {
  product = input.required<Product>();
  currency = input('EGP');
  added = output<number>();
  priceLabel = computed(() => $__bt$__{this.product().price} $__{this.currency()}$__bt);
}
// في الأب: <app-product-card [product]="p" (added)="onAdd($event)" />`,
          try: R`استخدم الكارت في [[App]] مع منتج، واعمل [[onAdd(id: number)]] بتطبع الـ id في الـ console. وبعدين امسح [[[product]="p"]] من الأب وشوف الخطأ. وجرّب [[currency="USD"]] من غير أقواس.`,
          flag: "script",
          deep: {
            why: "الـ component اللي بيعرض كارت منتج مينفعش يعرف المنتج جاي منين ولا السلة بتتحفظ فين، وإلا مش هتعرف تستخدمه في صفحة تانية. بيستقبل البيانات من برا، ويقول «حد داس على الزرار» ويسيب الأب يقرر يعمل إيه. ده بيخليه قابل لإعادة الاستخدام وسهل تختبره.",
            how: R`[[input.required<T>()]] معناها الأب لازم يبعتها، ولو نسي الـ compiler بيطلّع NG8008: Required input 'product' from component ProductCard must be specified. و [[input('EGP')]] ليها قيمة افتراضية ونوعها اتستنتج string.

ولأن الـ input signal، تقدر تبني عليه [[computed]] وهيتحسب تاني لوحده لما الأب يبعت قيمة جديدة. ده بيغنيك عن [[ngOnChanges]] اللي كانت في الشكل القديم.

[[output<number>()]] بيرجع [[OutputEmitterRef]]، و [[.emit(7)]] بتبعت 7، والأب بيستلمها في [[$event]]. مفيش bubbling زي DOM events: الـ output بيوصل للأب المباشر بس.

في الكود القديم هتلاقي [[@Input() product!: Product]] و [[@Output() added = new EventEmitter<number>()]]. نفس الفكرة بـ decorators، والـ migration [[ng g @angular/core:signal-input-migration]] بيحوّلها.`,
            when: R`أي component بيعرض بيانات جاية من برا أو بيبلّغ عن تفاعل. لو البيانات محتاجها components كتير بعيدة عن بعض، متعدّيهاش input ورا input: حطها في service (درس الـ services).`,
            mistakes: R`تحاول [[this.product.set(...)]] جوه الابن: input للقراية بس، ولو محتاج الاتجاهين استخدم [[model()]] (الدرس الجاي). وتكتب [[[currency]="USD"]] فيدوّر على متغير اسمه USD؛ النص الثابت من غير أقواس [[currency="USD"]] أو [[[currency]="'USD'"]]. وتقرا [[this.product()]] في الـ constructor: الـ input لسه ماتحطش. الـ compiler في 22 بيمسكها وقت الـ build ([[NG8118: product is a required input and does not have a value in this context]])، ولو عدّت بطريقة ما، بتقع وقت التشغيل بـ NG0950. اقراه في computed أو في الـ template أو بعد ngOnInit.`
          },
          teach: R`## الفكرة: الأب بيبعت بـ [[[ ]]]، والابن بيرد بـ [[( )]]

~~~text الاتجاهين
الأب (App)                                   الابن (ProductCard)
[product]="p"         ───── input ─────►     product = input.required<Product>()
(added)="onAdd($event)" ◄──── output ─────    added.emit(7)
~~~

اتشغّل الابن من المثال والأب من الـ solCode في [[ng serve]] (Angular 22.2) واتفحص في Chrome.

---

## ١. الـ imports والنوع

~~~text card.ts
import { Component, computed, input, output } from '@angular/core';
export type Product = { id: number; name: string; price: number };
~~~

[[input]] و [[output]] و [[computed]] دوال من core. و [[type Product]] بيوصف شكل المنتج: object فيه [[id]] رقم و [[name]] نص و [[price]] رقم. [[export]] عشان الأب كمان يستخدم النوع.

---

## ٢. الـ inputs

~~~text card.ts
product = input.required<Product>();
currency = input('EGP');
~~~

| السطر | معناه |
|---|---|
| [[input.required<Product>()]] | input **إجباري**، نوعه [[Product]]. الـ [[<Product>]] ده generic: بيقول نوع القيمة |
| [[input('EGP')]] | اختياري، ولو الأب مبعتهوش قيمته [['EGP']]، ونوعه string اتعرف من القيمة |

الاتنين signals للقراية: بتقراهم [[product()]] و [[currency()]]، ومفيش [[set]].

---

## ٣. الـ output

~~~text card.ts
added = output<number>();
~~~

[[output<number>()]] قناة بيبعت منها الابن رقم للأب. وفي الـ template:

~~~text template
<button (click)="added.emit(product().id)">أضف للسلة</button>
~~~

لما الزرار يتداس: [[product().id]] = 7، و [[emit(7)]] بتبعته.

---

## ٤. [[computed]] من اتنين inputs

~~~text card.ts
priceLabel = computed(() => $__bt$__{this.product().price} $__{this.currency()}$__bt);
~~~

- [[() =>]] arrow function بترجّع القيمة.
- النص بين backticks template literal، و [[$__{...}]] بتحط قيمة جوه النص.
- [[computed]] بتعرف لوحدها إنها بتقرا [[product]] و [[currency]]، فلو الأب بعت قيمة جديدة لأي واحد فيهم، [[priceLabel]] بتتحسب تاني.

---

## ٥. الأب (الـ solCode)

~~~text app.ts
template: $__bt<app-product-card [product]="p" currency="USD" (added)="onAdd($event)" />$__bt,
~~~

| الحتة | معناها |
|---|---|
| [[[product]="p"]] | ابعت قيمة [[p]] من كلاس الأب |
| [[currency="USD"]] | من غير أقواس = النص «USD» كما هو |
| [[(added)="onAdd($event)"]] | لما الابن يعمل [[emit]]، نادي [[onAdd]] |
| [[$event]] | القيمة اللي اتبعتت في [[emit]]: هنا الرقم 7، مش event من المتصفح |

### الناتج في Chrome

~~~text الناتج
قلم
10 USD
أضف للسلة
~~~

ودوسنا الزرار:

~~~text الـ Console
added 7
~~~

---

## ٦. الأخطاء اللي الـ compiler بيمسكها

### الأب نسي input إجباري

شلنا [[[product]="p"]]:

~~~text ng build
X [ERROR] NG8008: Required input 'product' from component ProductCard must be specified.

      6 │   template: $__bt<app-product-card currency="USD" (added)="onAdd($event...
        ╵               ~~~~~~~~~~~~~~~~
~~~

### أقواس على نص ثابت

كتبنا [[[currency]="USD"]]:

~~~text ng build
X [ERROR] TS2339: Property 'USD' does not exist on type 'CardParent'.
~~~

الأقواس المربعة خلّت [[USD]] كود، فدوّر على خاصية اسمها [[USD]] في الأب. النص الثابت يا إما من غير أقواس، يا إما [[[currency]="'USD'"]] بعلامات تنصيص جوه.

### قراية input في الـ constructor

زوّدنا [[constructor() { console.log(this.product()); }]]:

~~~text ng build
X [ERROR] NG8118: $__btproduct$__bt is a required $__btinput$__bt and does not have a value in this context.
~~~

الـ constructor بيشتغل قبل ما الأب يحط القيم، والـ compiler مسك ده. اقراه في [[computed]] أو في الـ template.

---

## الخلاصة

| الحاجة | في الابن | في الأب |
|---|---|---|
| بيانات داخلة إجبارية | [[x = input.required<T>()]] | [[[x]="value"]] |
| بيانات داخلة بقيمة افتراضية | [[x = input('EGP')]] | [[x="USD"]] أو مفيش |
| حدث طالع | [[done = output<number>()]] و [[done.emit(7)]] | [[(done)="f($event)"]] |
| القراية | [[x()]] | — |`,
          lines: [
            R`[[input]] و [[output]] و [[computed]] كلهم من core.`,
            "نوع المنتج.",
            "الـ decorator.",
            "الـ selector.",
            "بداية الـ template.",
            R`بنقرا الـ input كـ signal: [[product()]].`,
            R`قيمة محسوبة من اتنين inputs.`,
            R`الضغطة بتبعت الـ id للأب بـ [[emit]].`,
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "input إجباري: الأب لازم يبعته.",
            "input اختياري بقيمة افتراضية.",
            "output بيبعت رقم.",
            R`[[computed]] بتتحسب تاني لوحدها لما أي input يتغير.`,
            "قفلة الكلاس."
          ],
          sol: R`لما تضغط «أضف للسلة» الـ console بيطبع 7 (أو الـ id اللي بعته). [[$event]] في الأب هو نفس الرقم اللي اتبعت في [[emit]]، مش event من المتصفح.

لما تمسح [[[product]="p"]]: خطأ build [[NG8008: Required input 'product' from component ProductCard must be specified]].

[[currency="USD"]] من غير أقواس شغال وبيبعت النص "USD"، فالكارت يعرض [[10 USD]]. لو كتبت [[[currency]="USD"]] هيطلع خطأ Property 'USD' does not exist on type 'App' لأنه بيعتبرها اسم متغير.`,
          solCode: R`@Component({
  selector: 'app-root',
  imports: [ProductCard],
  template: $__bt<app-product-card [product]="p" currency="USD" (added)="onAdd($event)" />$__bt,
})
export class App {
  p: Product = { id: 7, name: 'قلم', price: 10 };
  onAdd(id: number) { console.log('added', id); }
}`
        },
        {
          cmd: "model()",
          title: "two-way binding بـ [( )] و model()",
          desc: R`ساعات الابن محتاج يغيّر قيمة جاية من الأب: عدّاد كمية، أو toggle، أو input مخصوص. بدل input و output منفصلين، فيه [[model()]]: signal الابن يقدر يقراه ويعمل له set، والأب يربطه بـ [[[(value)]="qty"]].

الشكل [[[( )]]] اسمه «banana in a box»: أقواس مربعة (داخل) جواها قوسين (طالع). ولو الأب بعت signal، القيمة بتتحدّث عنده لوحدها.

وده نفس اللي بيحصل في [[[(ngModel)]]] على input عادي (template-driven forms)، اللي هتلاقيه كتير في الكود القديم.`,
          example: R`import { Component, model, signal } from '@angular/core';
@Component({
  selector: 'app-counter',
  template: $__bt
    <button (click)="value.update(v => v - 1)" [disabled]="value() <= 1">-</button>
    <span>{{ value() }}</span>
    <button (click)="value.update(v => v + 1)">+</button>
  $__bt,
})
export class Counter {
  value = model(1);
}
@Component({
  selector: 'app-cart-line',
  imports: [Counter],
  template: $__bt<app-counter [(value)]="qty" /> <p>الكمية: {{ qty() }}</p>$__bt,
})
export class CartLine {
  protected qty = signal(2);
}`,
          try: R`شغّل [[CartLine]] واضغط + و - وشوف «الكمية» في الأب بتتغير. بعدين غيّر الأب لـ [[[value]="qty()"]] بس (من غير الأقواس العادية) وشوف إيه اللي بطّل يتحدّث.`,
          flag: "script",
          deep: {
            why: R`من غير two-way binding، كل عداد أو toggle محتاج input اسمه value و output اسمه valueChange، والأب يكتب [[[value]="qty()" (valueChange)="qty.set($event)"]] في كل مرة. [[model()]] بيختصر ده لسطر واحد في الابن وسطر في الأب.`,
            how: R`[[model(1)]] بيعمل حاجتين: input اسمه [[value]]، و output اسمه [[valueChange]]. لما الابن يعمل [[value.set(...)]] أو [[update]]، Angular بيبعت الـ output تلقائيًا. و [[[(value)]="qty"]] في الأب اختصار لـ [[[value]="qty()" (valueChange)="qty.set($event)"]].

لو الأب بعت signal ([[qty]] من غير قوسين)، Angular بيحدّثه مباشرة. ولو بعت خاصية عادية، بيعيّنها. ولو بعت [[[value]="qty()"]] بس، الابن بياخد القيمة أول مرة، وتعديلاته بتفضل عنده والأب مش بيعرف.

[[update(fn)]] بتاخد القيمة القديمة وترجع الجديدة، أحسن من [[set(value() + 1)]] لما القيمة الجديدة معتمدة على القديمة.`,
            when: R`components شبه form controls: عداد، و toggle، و date picker، و rating. للبيانات العادية اللي الابن بيعرضها بس، [[input()]] كفاية. ولو الابن بيعمل حدث مش «تغيير قيمة» (زي «اتحذف»)، [[output()]].`,
            mistakes: R`تكتب [[[(value)]="qty()"]] بالقوسين: ده بيبعت القيمة مش الـ signal، والـ compiler بيعترض. و [[[(ngModel)]]] من غير [[FormsModule]] في imports: NG8002 Can't bind to 'ngModel'. وتستخدم model لكل حاجة فكل الـ components تعدّل بيانات بعض ومحدش يعرف مين غيّر إيه: خليها للحالات اللي فعلًا two-way.`
          },
          teach: R`## الفكرة: [[model()]] = input + output في سطر واحد

المثال فيه component اتنين في ملف واحد: [[Counter]] (الابن، عداد) و [[CartLine]] (الأب، سطر في السلة). الأب بيدي العداد الكمية، والعداد بيغيّرها، والأب بيعرف. اتشغّل في [[ng serve]] (Angular 22.2) واتفحص في Chrome بضغطات حقيقية.

---

## ١. الابن: [[Counter]]

~~~text model.ts
export class Counter {
  value = model(1);
}
~~~

[[model(1)]] بتعمل signal زي [[signal(1)]]، بس فيها حاجتين زيادة:

| اللي بيتعمل | اسمه | شغلته |
|---|---|---|
| input | [[value]] | الأب يقدر يبعت قيمة |
| output | [[valueChange]] | أي [[set]] أو [[update]] من الابن بيتبعت للأب |

و [[1]] القيمة الافتراضية لو الأب مبعتش حاجة. والفرق عن [[input()]]: الابن يقدر يكتب فيها.

### الـ template

~~~text template
<button (click)="value.update(v => v - 1)" [disabled]="value() <= 1">-</button>
<span>{{ value() }}</span>
<button (click)="value.update(v => v + 1)">+</button>
~~~

- [[value.update(v => v - 1)]]: [[update]] بتاخد دالة، بتديها القيمة الحالية [[v]]، واللي ترجّعه يبقى القيمة الجديدة. [[v => v - 1]] arrow function بترجّع [[v - 1]].
- [[[disabled]="value() <= 1"]]: زرار الناقص بيتقفل لما القيمة تبقى 1 أو أقل، فالكمية متنزلش تحت 1.
- [[{{ value() }}]]: الرقم الحالي.

---

## ٢. الأب: [[CartLine]]

~~~text model.ts
@Component({
  selector: 'app-cart-line',
  imports: [Counter],
  template: $__bt<app-counter [(value)]="qty" /> <p>الكمية: {{ qty() }}</p>$__bt,
})
export class CartLine {
  protected qty = signal(2);
}
~~~

### [[[(value)]="qty"]]: الـ banana in a box

الأقواس المربعة برا (داخل) والعادية جوه (طالع). وهو اختصار للشكل ده:

~~~text اللي Angular بيفهمه
[value]="qty()"   (valueChange)="qty.set($event)"
~~~

يعني: ابعت قيمة [[qty]] للعداد، ولما العداد يبعت قيمة جديدة حطها في [[qty]]. ولاحظ إننا كاتبين [[qty]] **من غير** قوسين: بنسلّم الـ signal نفسها، مش قيمتها.

### الناتج بالضغطات

~~~text الناتج (Chrome)
start          2 | الكمية: 2 | minus disabled: false
after +        3 | الكمية: 3 | minus disabled: false
after -        2 | الكمية: 2 | minus disabled: false
after - again  1 | الكمية: 1 | minus disabled: true
~~~

- العمود الأول رقم العداد، والتاني نص الأب: الاتنين بيتغيروا مع بعض.
- بدأ من 2 مش 1: الأب بعت 2 فغطّى الافتراضي.
- عند 1 زرار الناقص اتقفل.

---

## ٣. التجربة: [[[value]="qty()"]] بس

~~~text الناتج (Chrome)
start          2 | الكمية: 2
after +        3 | الكمية: 2
after -        2 | الكمية: 2
after - again  1 | الكمية: 2
~~~

العداد بيتغير (لأن الـ model جواه signal بيتحدّث)، بس الأب فاضل 2: بعت القيمة مرة، ومحدش بيسمع لـ [[valueChange]].

---

## ٤. غلطة: [[[(value)]="qty()"]]

~~~text ng build
X [ERROR] NG5002: Unsupported expression in a two-way binding

      16 │   template: $__bt<app-counter [(value)]="qty()" /> ...
         ╵                           ~~~~~~~~~~~~~~~~~
~~~

[[qty()]] قيمة (الرقم 2)، ومينفعش تكتب فيه حاجة. الـ two-way محتاج حاجة يكتب فيها: signal ([[qty]]) أو خاصية عادية.

---

## الخلاصة

| الحاجة | الشكل |
|---|---|
| في الابن | [[value = model(1)]]، وتغيّرها بـ [[set]] أو [[update]] |
| في الأب | [[[(value)]="qty"]]: الـ signal من غير قوسين |
| اختصار لـ | [[[value]="qty()" (valueChange)="qty.set($event)"]] |
| [[[value]="qty()"]] | اتجاه واحد: الأب مش بيعرف بالتغيير |`,
          lines: [
            R`[[model]] للـ two-way و [[signal]] للأب.`,
            "الـ decorator.",
            "الـ selector.",
            "بداية الـ template.",
            R`ينقّص واحد، ومقفول عند 1.`,
            "القيمة الحالية.",
            "يزوّد واحد.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            R`[[model(1)]]: input اسمه value قيمته الافتراضية 1، ومعاه output اسمه valueChange.`,
            "قفلة.",
            "الأب.",
            "الـ selector.",
            "لازم يعمل import للعدّاد.",
            R`[[[(value)]="qty"]] بيبعت الـ signal نفسه، فأي تغيير في العدّاد بيوصل هنا.`,
            "قفلة.",
            "الكلاس.",
            "القيمة الأصلية عند الأب.",
            "قفلة."
          ],
          sol: R`مع [[[(value)]="qty"]]: الرقم في العدّاد والـ «الكمية: X» اللي تحته بيتغيروا مع بعض. تبدأ 2، وبعد + تبقى 3.

مع [[[value]="qty()"]] بس: العدّاد نفسه بيتغير (لأن الـ model جواه signal بيتحدّث)، بس «الكمية» في الأب بتفضل 2. الأب بعت القيمة مرة واحدة ومش بيسمع لـ [[valueChange]]. وده اختبار حقيقي اتعمل بـ TestBed: بعد ضغطة + على [[[(value)]]]، النص بقى «الكمية: 3».`
        }
      ]
    }
]);

// تكملة تاب angular: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/angular/01.js (شرح حقول الدرس في أوله)
MORE("angular", [
    {
      t: "Material و CDK واللغات",
      l: 2,
      n: "مكونات جاهزة من Angular Material، وأدوات CDK، و i18n، و RTL للعربي",
      items: [
        {
          cmd: "Angular Material",
          title: "تستخدم components جاهزة: زراير و form fields و snackbar",
          desc: R`Angular Material مكتبة components رسمية من فريق Angular بتصميم Material 3: زراير، و inputs، و tables، و dialogs، و datepicker، و menus، وكلها accessible وشغالة RTL.

بتتضاف بـ [[ng add @angular/material]]: بيسطّب ويعمل ملف theme ويضيف الخطوط. وكل component بتعمل import للـ module أو الـ component بتاعه في [[imports]].

في الشركات المصرية هتلاقي Material، أو PrimeNG (شائع جدًا في الـ enterprise لأن عنده tables و components كتير جاهزة)، أو Bootstrap.`,
          example: R`@Component({
  selector: 'app-product-form',
  imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
  template: $__bt
    <mat-form-field appearance="outline">
      <mat-label>اسم المنتج</mat-label>
      <input matInput [value]="name()" (input)="name.set($any($event.target).value)" />
      <mat-hint>٣ حروف على الأقل</mat-hint>
    </mat-form-field>
    <button matButton="filled" (click)="save()"><mat-icon>save</mat-icon> حفظ</button>
    <button matButton="outlined">إلغاء</button>
  $__bt,
})
export class ProductForm {
  private snack = inject(MatSnackBar);
  name = signal('');
  save() { this.snack.open('اتحفظ', 'تمام', { duration: 2000 }); }
}`,
          try: R`اعمل [[ng add @angular/material]] وبص على الملفات اللي اتغيرت. حط الـ component ده، وبعدين غيّر [[color-scheme: light]] في [[material-theme.scss]] لـ [[dark]]. وفي الآخر اعمل [[MatDialog]] بيسأل «متأكد؟» قبل الحذف.`,
          flag: "script",
          deep: {
            why: "بناء datepicker أو table فيها sort و pagination أو dialog accessible من الصفر بياخد أسابيع، وغالبًا هيبقى فيه مشاكل keyboard و screen reader. Material بيديك ده جاهز ومتختبر، وبنفس نسخة Angular، ومتوافق مع الـ updates.",
            how: R`[[ng add]] (في الـ lab على 22.2) عمل [[src/material-theme.scss]] فيه [[mat.theme((color: (primary: mat.$azure-palette, tertiary: mat.$blue-palette), typography: Roboto, density: 0))]]، وضافه في [[angular.json]] styles، وضاف لينكات Roboto و Material Symbols في [[index.html]].

الـ theme مبني على CSS variables ([[--mat-sys-primary]] و [[--mat-sys-surface]])، فتقدر تستخدمها في CSS بتاعك عشان ألوانك تمشي مع الـ theme، والـ dark mode بيبقى بـ [[color-scheme]].

الزراير في النسخ الحديثة بـ [[matButton="filled"]] و [[matButton="outlined"]] و [[matButton="tonal"]]، وفي الكود القديم هتلاقي [[mat-raised-button]] و [[mat-flat-button]]، ولسه شغالين.

[[MatSnackBar]] و [[MatDialog]] services بتعمل لها inject وتفتح بيها. [[dialog.open(ConfirmDialog, { data })]] بيرجّع ref، و [[afterClosed()]] Observable بالنتيجة.

[[mat-form-field]] مع [[matInput]] بيشتغل مع reactive forms وبيعرض [[<mat-error>]] لوحده لما الحقل invalid و touched.`,
            when: "لوحات تحكم وأنظمة داخلية وأي تطبيق مش محتاج تصميم براند مميز جدًا. لو الديزاين مخصوص خالص، CDK لوحده (الدرس الجاي) + CSS بتاعك، أو Tailwind.",
            mistakes: R`تنسى تعمل import للـ module فالـ tag يظهر كـ HTML عادي من غير شكل، أو NG8001. وتعدّل شكل Material بـ [[::ng-deep]] وselectors داخلية بتتكسر مع كل update: استخدم الـ tokens والـ theme API. وتخلط Material و PrimeNG و Bootstrap في نفس المشروع: bundle تقيل وشكل متلخبط.`
          },
          teach: R`## الفكرة: components جاهزة بتتعمل import زي أي component

Angular Material مكتبة components رسمية. بتسطّبها مرة بـ [[ng add]]، وبعدها أي component محتاج حاجة منها بيعمل import للـ module بتاعها في [[imports]] ويستخدم الـ tags والـ attributes بتاعتها. اتجرّب على Angular 22.2 و [[@angular/material]] 22.2.2 على Windows، والصفحة في Chrome headless.

---

## ١. [[ng add @angular/material]]

~~~powershell
npx ng add @angular/material --skip-confirmation
~~~

([[--skip-confirmation]] عشان ميسألش «تسطّب؟». من غيرها بيسألك وتقول Y.)

~~~text الناتج (آخره)
› Found compatible package version: 22.2.2.
UPDATE package.json (847 bytes)
✔ Packages installed successfully.
CREATE src/material-theme.scss (1179 bytes)
UPDATE angular.json (2012 bytes)
UPDATE src/index.html (647 bytes)
~~~

| الملف | اتعمل فيه إيه |
|---|---|
| [[package.json]] | [[@angular/material]] و [[@angular/cdk]] بنفس نسخة Angular |
| [[src/material-theme.scss]] | الـ theme (تحت) |
| [[angular.json]] | ضاف الملف ده لـ [[styles]]: [[["src/material-theme.scss", "src/styles.css"]]] |
| [[src/index.html]] | لينكات خط Roboto وأيقونات Material Symbols من Google Fonts |

### الـ theme

~~~text src/material-theme.scss (مختصر)
html {
  @include mat.theme((
    color: (primary: mat.$azure-palette, tertiary: mat.$blue-palette),
    typography: Roboto,
    density: 0,
  ));
}
body {
  color-scheme: light;
  background-color: var(--mat-sys-surface);
  color: var(--mat-sys-on-surface);
}
~~~

- [[mat.theme(...)]]: Sass mixin بيطلّع CSS variables لكل الألوان والخطوط، اسمها [[--mat-sys-...]].
- [[primary]]: اللون الأساسي (أزرق azure). و [[density: 0]]: المسافات العادية (أرقام سالبة = أضيق).
- [[color-scheme: light]]: الوضع الفاتح. والـ variables نفسها مكتوبة بـ [[light-dark(...)]]: قرينا [[--mat-sys-primary]] في المتصفح وطلعت [[light-dark(#005cbb, #abc7ff)]]، يعني لون للفاتح ولون للغامق، والمتصفح بيختار حسب [[color-scheme]].

---

## ٢. الـ component

~~~ts
imports: [MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule],
~~~

كل حاجة ليها module من مسار لوحده: [[@angular/material/button]] و [[/form-field]] و [[/input]] و [[/icon]]. فالـ bundle بياخد اللي استخدمته بس.

### حقل الإدخال

~~~html
<mat-form-field appearance="outline">
  <mat-label>اسم المنتج</mat-label>
  <input matInput [value]="name()" (input)="name.set($any($event.target).value)" />
  <mat-hint>٣ حروف على الأقل</mat-hint>
</mat-form-field>
~~~

- [[<mat-form-field appearance="outline">]]: الحاوية: إطار حوالين الحقل. ([[fill]] شكل تاني بخلفية.)
- [[<mat-label>]]: العنوان: جوه الحقل وهو فاضي، وبيطلع فوق على الإطار لما تكتب.
- [[matInput]]: attribute بيخلي الـ input العادي يشتغل جوه الحاوية.
- [[[value]="name()"]] و [[(input)="name.set(...)"]]: ربط يدوي بالـ signal. [[$event.target]] العنصر اللي حصل عليه الحدث، و [[$any(...)]] بيقول للـ template compiler «متفحصش النوع هنا» عشان [[.value]] مش موجودة على [[EventTarget]].
- [[<mat-hint>]]: سطر مساعدة تحت الحقل.

### الزراير

~~~html
<button matButton="filled" (click)="save()"><mat-icon>save</mat-icon> حفظ</button>
<button matButton="outlined">إلغاء</button>
~~~

- [[matButton="filled"]]: زرار مليان بلون الـ primary (الأساسي في الصفحة). [[outlined]]: إطار بس.
- [[<mat-icon>save</mat-icon>]]: الأيقونة بالاسم، من خط Material Symbols اللي [[ng add]] ضافه.

### الـ snackbar

~~~ts
private snack = inject(MatSnackBar);
save() { this.snack.open('اتحفظ', 'تمام', { duration: 2000 }); }
~~~

[[MatSnackBar]] service (مش tag). [[open(رسالة, زرار, إعدادات)]]، و [[duration: 2000]] = تختفي بعد ثانيتين.

---

## ٣. اللي حصل فعلًا

~~~text الناتج (Chrome)
form-field classes: mat-form-field-appearance-outline
after typing: mat-form-field-appearance-outline mat-focused
buttons: ... mdc-button--unelevated mat-mdc-unelevated-button || ... mdc-button--outlined mat-mdc-outlined-button
body bg (light): rgb(250, 249, 253)
snackbar: اتحفظ / تمام
snackbar after 2.7s count: 0
~~~

- Material بيحط classes لوحده على العناصر حسب الحالة ([[mat-focused]] لما الحقل عليه الـ focus).
- الـ snackbar ظهر بالرسالة والزرار، واختفى بعد المدة.

### الـ try: الوضع الغامق

غيّرنا [[color-scheme: light]] لـ [[dark]] في [[material-theme.scss]]:

~~~text الناتج
light:  body bg: rgb(250, 249, 253) | color: rgb(26, 27, 31)
dark:   body bg: rgb(18, 19, 22)    | color: rgb(227, 226, 230)
~~~

سطر واحد قلب الخلفية والنص وكل ألوان Material، لأنهم كلهم [[light-dark(...)]].

---

## ٤. الـ solCode: dialog «متأكد؟»

~~~html
<h2 mat-dialog-title>متأكد؟</h2>
<mat-dialog-content>هتحذف {{ data.name }}</mat-dialog-content>
<mat-dialog-actions>
  <button matButton [mat-dialog-close]="false">لأ</button>
  <button matButton="filled" [mat-dialog-close]="true">احذف</button>
</mat-dialog-actions>
~~~

- component عادي بيتفتح جوه dialog. [[mat-dialog-title]] و [[mat-dialog-content]] و [[mat-dialog-actions]] أماكن العنوان والمحتوى والزراير.
- [[[mat-dialog-close]="true"]]: الضغطة تقفل الـ dialog وترجّع [[true]] لمين فتحه.
- [[data = inject<{ name: string }>(MAT_DIALOG_DATA)]]: البيانات اللي اتبعتت للـ dialog.

~~~ts
this.dialog.open(ConfirmDialog, { data: p }).afterClosed()
  .subscribe((ok) => { if (ok) this.store.remove(p.id); });
~~~

- [[dialog.open(Component, { data })]]: افتح وابعت [[p]].
- [[afterClosed()]]: Observable بيطلّع النتيجة لما يتقفل.

~~~text الناتج (Chrome)
dialog: متأكد؟ / هتحذف كشكول / لأ / احذف
احذف  → afterClosed: true      → store.remove(2)
لأ    → afterClosed: false
Esc   → afterClosed: undefined
~~~

لاحظ إن [[Esc]] (أو الضغط برا الـ dialog) بيرجّع [[undefined]]، فـ [[if (ok)]] بيعامله زي «لأ». ده سبب إننا مكتبناش [[ok !== false]].

---

## الخلاصة

| الحاجة | إزاي |
|---|---|
| التسطيب | [[ng add @angular/material]]: package و theme و خطوط |
| استخدام component | import الـ module في [[imports]] بتاع الـ component |
| الألوان | CSS variables [[--mat-sys-*]]، و [[color-scheme]] للفاتح والغامق |
| زراير | [[matButton="filled"]] و [[outlined]] و [[tonal]] |
| snackbar و dialog | services بـ [[inject]]، و [[afterClosed()]] بالنتيجة |`,
          lines: [
            "الـ decorator.",
            "الـ selector.",
            "كل component من Material بتعمل import للي محتاجه.",
            "بداية الـ template.",
            "حاوية الحقل بشكل outline.",
            "العنوان اللي بيطلع فوق لما تكتب.",
            R`[[matInput]] بيخلي الـ input يشتغل جوه الحاوية.`,
            "سطر مساعدة تحت الحقل.",
            "قفلة.",
            R`زرار filled (الأساسي) وجواه أيقونة.`,
            "زرار outlined.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "الـ snackbar service.",
            "اسم المنتج.",
            "رسالة صغيرة تحت، بتختفي بعد ثانيتين.",
            "قفلة."
          ],
          sol: R`[[ng add]] بيطبع [[CREATE src/material-theme.scss]] و [[UPDATE angular.json]] و [[UPDATE src/index.html]] و [[UPDATE package.json]] ([[@angular/material]] و [[@angular/cdk]] بنفس نسخة Angular، 22.2 في الـ lab). الحقل بيظهر بإطار، والـ label بيطلع فوق لما تكتب، والزرار بيطلّع snackbar «اتحفظ».

مع [[color-scheme: dark]] الخلفية والألوان كلها بتقلب، و [[light dark]] بيتبع إعدادات الجهاز.

الـ dialog:`,
          solCode: R`@Component({
  imports: [MatDialogModule, MatButtonModule],
  template: $__bt
    <h2 mat-dialog-title>متأكد؟</h2>
    <mat-dialog-content>هتحذف {{ data.name }}</mat-dialog-content>
    <mat-dialog-actions>
      <button matButton [mat-dialog-close]="false">لأ</button>
      <button matButton="filled" [mat-dialog-close]="true">احذف</button>
    </mat-dialog-actions>
  $__bt,
})
export class ConfirmDialog { data = inject<{ name: string }>(MAT_DIALOG_DATA); }
// في الصفحة:
private dialog = inject(MatDialog);
remove(p: Product) {
  this.dialog.open(ConfirmDialog, { data: p }).afterClosed()
    .subscribe((ok) => { if (ok) this.store.remove(p.id); });
}`
        },
        {
          cmd: "CDK",
          title: "CDK: drag and drop و breakpoints و overlay من غير شكل Material",
          desc: R`الـ CDK (Component Dev Kit) هو الأساس اللي Material مبني عليه، بس من غير أي تصميم: سلوكيات جاهزة تركّب عليها شكلك. أشهرهم:

[[@angular/cdk/drag-drop]]: ترتيب list بالسحب أو نقل بين lists (Kanban). و [[@angular/cdk/layout]]: [[BreakpointObserver]] يقولك الشاشة موبايل ولا لأ. و [[@angular/cdk/overlay]]: عناصر عايمة (dropdown و tooltip). و [[@angular/cdk/a11y]]: focus trap و live announcer. و [[@angular/cdk/bidi]]: اتجاه RTL. و [[@angular/cdk/scrolling]]: virtual scroll للستات الطويلة.`,
          example: R`@Component({
  selector: 'app-board',
  imports: [CdkDropList, CdkDrag],
  template: $__bt
    <ul cdkDropList (cdkDropListDropped)="drop($event)" [class.compact]="isHandset()">
      @for (t of tasks(); track t) { <li cdkDrag>{{ t }}</li> }
    </ul>
  $__bt,
})
export class Board {
  tasks = signal(['تصميم', 'تنفيذ', 'اختبار', 'رفع']);
  isHandset = toSignal(
    inject(BreakpointObserver).observe(Breakpoints.Handset).pipe(map((r) => r.matches)),
    { initialValue: false },
  );
  drop(e: CdkDragDrop<string[]>) {
    this.tasks.update((list) => {
      const copy = [...list];
      moveItemInArray(copy, e.previousIndex, e.currentIndex);
      return copy;
    });
  }
}`,
          try: R`حط الـ board واسحب العناصر. صغّر الشاشة (DevTools device mode) وشوف [[isHandset()]] بيتغير. بعدين اعمل عمودين («لسه» و «خلص») وانقل بينهم بـ [[transferArrayItem]] و [[cdkDropListConnectedTo]].`,
          flag: "script",
          deep: {
            why: "السحب والإفلات، والـ dropdown اللي بيتحط صح حتى عند حافة الشاشة، والـ focus trap جوه modal: كلها حاجات شكلها سهلة وتفاصيلها كتير جدًا (touch، و scroll، و keyboard، و screen readers). الـ CDK بيحلهم من غير ما يفرض عليك شكل، فينفع مع تصميم الشركة أو Tailwind.",
            how: R`[[cdkDropList]] حاوية، و [[cdkDrag]] كل عنصر بيتسحب. لما تفلت، بيطلع [[(cdkDropListDropped)]] ومعاه [[previousIndex]] و [[currentIndex]]. الـ CDK مش بيغيّر الـ array بتاعتك: انت اللي بتعيد الترتيب. [[moveItemInArray]] بتعدّل الـ array نفسها (mutable)، عشان كده عملنا نسخة الأول وبعدين رجّعناها في [[update]] علشان الـ signal تحس.

[[BreakpointObserver.observe()]] بيرجّع Observable بيطلّع كل ما الـ media query تتغير، و [[Breakpoints.Handset]] media queries جاهزة. [[toSignal]] بيحوّله signal.

الـ drag-drop بيحط classes زي [[cdk-drag-preview]] و [[cdk-drag-placeholder]] و [[cdk-drag-animating]] تقدر تستايلها.`,
            when: "Kanban و ترتيب قوايم و رفع ملفات بالسحب، وأي layout بيتغير بين موبايل وديسكتوب في الكود مش CSS بس، و dropdowns و tooltips بشكل خاص، و virtual scroll لقوايم فيها آلاف العناصر.",
            mistakes: R`تفتكر إن الـ drop بيغيّر الترتيب لوحده فتستغرب إن العنصر بيرجع مكانه. و [[moveItemInArray(this.tasks(), ...)]] على الـ array اللي جوه الـ signal مباشرة: اتعدّلت بس الـ signal محستش. وتستخدم BreakpointObserver لحاجة CSS media query تحلها أبسط.`
          },
          teach: R`## الفكرة: سلوك جاهز من غير شكل

المثال قايمة مهام بتترتب بالسحب (من [[@angular/cdk/drag-drop]])، وبتاخد class زيادة لما الشاشة موبايل (من [[@angular/cdk/layout]]). الـ CDK بيدّيك السلوك بس: الشكل كله CSS بتاعك. اتجرّب على Angular 22.2 و [[@angular/cdk]] 22.2.2 (اتسطّب مع Material) على Windows، والسحب اتعمل بالماوس بـ Playwright في Chrome headless.

---

## ١. الـ imports

~~~ts
imports: [CdkDropList, CdkDrag],
~~~

directives standalone من [[@angular/cdk/drag-drop]]: [[CdkDropList]] للحاوية و [[CdkDrag]] للعنصر اللي بيتسحب. ومن نفس المسار [[CdkDragDrop]] (نوع الحدث) و [[moveItemInArray]] و [[transferArrayItem]] (دوال مساعدة).

---

## ٢. الـ template

~~~html
<ul cdkDropList (cdkDropListDropped)="drop($event)" [class.compact]="isHandset()">
  @for (t of tasks(); track t) { <li cdkDrag>{{ t }}</li> }
</ul>
~~~

- [[cdkDropList]]: الـ [[<ul>]] بقى حاوية تقدر تفلت فيها.
- [[(cdkDropListDropped)="drop($event)"]]: لما تفلت عنصر، نادي [[drop]] ومعاه تفاصيل الحدث.
- [[[class.compact]="isHandset()"]]: حط class اسمه [[compact]] لو [[isHandset()]] بـ [[true]].
- [[cdkDrag]]: الـ [[<li>]] بقى بيتسحب.
- [[track t]]: النصوص نفسها مختلفة، فتنفع كـ مفتاح.

---

## ٣. الـ breakpoint

~~~ts
isHandset = toSignal(
  inject(BreakpointObserver).observe(Breakpoints.Handset).pipe(map((r) => r.matches)),
  { initialValue: false },
);
~~~

من جوه لبرة:

1. [[inject(BreakpointObserver)]]: service من [[@angular/cdk/layout]].
2. [[.observe(Breakpoints.Handset)]]: Observable بيطلّع نتيجة كل ما الشاشة تدخل أو تخرج من الـ media query. [[Breakpoints.Handset]] media queries جاهزة لمقاسات الموبايل.
3. [[.pipe(map((r) => r.matches))]]: النتيجة object، وإحنا عايزين [[matches]] بس ([[true]] / [[false]]).
4. [[toSignal(..., { initialValue: false })]]: حوّله signal.

~~~text الناتج (Chrome)
desktop 1280px: ul class = "cdk-drop-list"
phone 390px portrait: ul class = "cdk-drop-list compact"
~~~

و [[cdk-drop-list]] ده class الـ CDK حطه لوحده على الحاوية.

---

## ٤. [[drop]]

~~~ts
drop(e: CdkDragDrop<string[]>) {
  this.tasks.update((list) => {
    const copy = [...list];
    moveItemInArray(copy, e.previousIndex, e.currentIndex);
    return copy;
  });
}
~~~

- [[CdkDragDrop<string[]>]]: نوع الحدث، و [[string[]]] نوع بيانات الحاوية. أهم حاجتين فيه [[previousIndex]] (العنصر كان فين) و [[currentIndex]] (اتفلت فين).
- [[[...list]]]: نسخة من الـ array.
- [[moveItemInArray(copy, from, to)]]: بتنقل العنصر **جوه نفس الـ array** (بتعدّلها مكانها). عشان كده بنديها النسخة.
- [[return copy]]: الـ array الجديدة هي القيمة الجديدة للـ signal، فالشاشة تتحدّث.

سحبنا «تصميم» (الأول) ونزّلناه على التالت:

~~~text الناتج (Chrome)
dropped previousIndex=0 currentIndex=2
after drag: [ 'تنفيذ', 'اختبار', 'تصميم', 'رفع' ]
~~~

### من غير [[drop]]

خلّينا [[drop]] متعملش حاجة وسحبنا تاني:

~~~text الناتج
while dragging: [ 'تصميم', 'تنفيذ', 'اختبار', 'رفع' ] | preview exists: 1 | placeholder: 1
after drop:     [ 'تصميم', 'تنفيذ', 'اختبار', 'رفع' ]
~~~

وانت بتسحب، الـ CDK بيعمل نسخة عايمة بتمشي مع الماوس (class [[cdk-drag-preview]]) ومكان فاضي في القايمة ([[cdk-drag-placeholder]]). بس لما تفلت، العنصر بيرجع مكانه، لأن الـ CDK **مش بيلمس بياناتك**: الترتيب الحقيقي هو اللي في الـ signal.

---

## ٥. الـ solCode: عمودين

~~~html
<div cdkDropList #todoList="cdkDropList" [cdkDropListData]="todo()" [cdkDropListConnectedTo]="[doneList]" (cdkDropListDropped)="drop($event)">
~~~

- [[#todoList="cdkDropList"]]: template reference variable: اسم للـ directive نفسه عشان العمود التاني يشاور عليه.
- [[[cdkDropListData]="todo()"]]: الـ array بتاعة العمود ده، وبتوصل في الحدث كـ [[e.container.data]].
- [[[cdkDropListConnectedTo]="[doneList]"]]: مسموح تسحب من هنا لـ [[doneList]]. والعمود التاني متوصل بـ [[todoList]].

~~~ts
drop(e: CdkDragDrop<string[]>) {
  if (e.previousContainer === e.container) {
    moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
  } else {
    transferArrayItem(e.previousContainer.data, e.container.data, e.previousIndex, e.currentIndex);
  }
  this.todo.set([...this.todo()]);
  this.done.set([...this.done()]);
}
~~~

- نفس العمود؟ رتّب. عمود تاني؟ [[transferArrayItem(من, إلى, from, to)]] بتشيل العنصر من array وتحطه في التانية.
- الدالتين بيعدّلوا الـ arrays اللي **جوه** الـ signals مكانها، والـ signals مبتحسش. فالسطرين الأخيرين بيحطوا نسخة جديدة في كل signal.

~~~text الناتج (Chrome)
start               todo=["تصميم","تنفيذ","اختبار"] done=[]
after تنفيذ -> done  todo=["تصميم","اختبار"] done=["تنفيذ"]
after تصميم -> done  todo=["اختبار"] done=["تنفيذ","تصميم"]
~~~

---

## الخلاصة

| الحاجة | اللي يفضل في دماغك |
|---|---|
| [[cdkDropList]] + [[cdkDrag]] | حاوية وعناصر بتتسحب |
| [[(cdkDropListDropped)]] | انت اللي بترتب البيانات، الـ CDK بيقولك من فين لفين بس |
| [[moveItemInArray]] و [[transferArrayItem]] | بيعدّلوا الـ array مكانها، فادّي الـ signal array جديدة |
| [[BreakpointObserver.observe(...)]] | Observable بـ [[matches]]، و [[toSignal]] يحوّله |
| الشكل | CSS بتاعك، و classes زي [[cdk-drag-preview]] و [[cdk-drag-placeholder]] |`,
          lines: [
            "الـ decorator.",
            "الـ selector.",
            "directives الـ drag-drop.",
            "بداية الـ template.",
            R`الحاوية، والحدث لما تفلت، و class لو موبايل.`,
            R`كل عنصر بيتسحب. [[track t]] لأن العناصر strings مختلفة.`,
            "قفلة.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "المهام.",
            R`signal من Observable بتاع الـ breakpoints.`,
            R`[[true]] لو الشاشة موبايل.`,
            "لحد أول قيمة.",
            "قفلة.",
            "لما يفلت.",
            "حدّث الـ signal.",
            "نسخة جديدة.",
            "حرّك العنصر في النسخة.",
            "رجّعها كقيمة جديدة.",
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`السحب بيشتغل بالماوس واللمس، والعنصر بيتحط مكانه الجديد. ولو شلت [[drop]] (أو نسيت تحدّث الـ signal)، العنصر بيرجع مكانه القديم بعد الإفلات، لأن الـ CDK مش بيلمس بياناتك. [[isHandset()]] بتبقى true في device mode بتاع موبايل.

عمودين:`,
          solCode: R`<div cdkDropList #todoList="cdkDropList" [cdkDropListData]="todo()" [cdkDropListConnectedTo]="[doneList]" (cdkDropListDropped)="drop($event)">
  @for (t of todo(); track t) { <div cdkDrag>{{ t }}</div> }
</div>
<div cdkDropList #doneList="cdkDropList" [cdkDropListData]="done()" [cdkDropListConnectedTo]="[todoList]" (cdkDropListDropped)="drop($event)">
  @for (t of done(); track t) { <div cdkDrag>{{ t }}</div> }
</div>
// الكلاس: todo = signal([...]); done = signal<string[]>([]);
drop(e: CdkDragDrop<string[]>) {
  if (e.previousContainer === e.container) {
    moveItemInArray(e.container.data, e.previousIndex, e.currentIndex);
  } else {
    transferArrayItem(e.previousContainer.data, e.container.data, e.previousIndex, e.currentIndex);
  }
  // الـ arrays اتعدّلت في مكانها، فنسخة جديدة عشان الـ signals تحس
  this.todo.set([...this.todo()]);
  this.done.set([...this.done()]);
}`
        },
        {
          cmd: "i18n",
          title: "تترجم التطبيق بـ i18n و $localize، أو بمكتبة runtime",
          desc: R`Angular فيه ترجمة رسمية ([[@angular/localize]]): بتعلّم النصوص في الـ template بـ [[i18n]]، وفي الكود بـ [[$localize]]، وبتطلّعهم في ملف XLIFF بـ [[ng extract-i18n]]، وبتترجم الملف، و [[ng build --localize]] بيطلّع نسخة كاملة لكل لغة ([[dist/.../ar]] و [[dist/.../en-US]]).

ده سريع جدًا (الترجمة متحطة وقت الـ build)، بس تغيير اللغة = تحميل نسخة تانية من الموقع.

البديل الشائع جدًا في الشركات: مكتبة runtime زي Transloco أو ngx-translate: ملفات JSON وبتبدّل اللغة من غير reload، زي react-i18next في «تاب React».`,
          example: R`ng add @angular/localize
# في الـ template:
<h1 i18n="@@homeTitle">Welcome to our shop</h1>
<p i18n>{count(), plural, =0 {No items} =1 {One item} other {{{count()}} items}}</p>
<button i18n-title title="Save your cart">Save</button>
# في الكود:
alert($localize$__bt:@@cartSaved:Your cart was saved$__bt);
ng extract-i18n --output-path src/locale
cp src/locale/messages.xlf src/locale/messages.ar.xlf
# angular.json جوه المشروع: "i18n": { "sourceLocale": "en-US", "locales": { "ar": "src/locale/messages.ar.xlf" } }
ng build --localize`,
          try: R`اعمل الخطوات دي، وافتح [[messages.ar.xlf]] وزوّد [[<target>...</target>]] بعد كل [[<source>]]، وضيف [[target-language="ar"]] على [[<file>]]. اعمل [[ng build --localize]] وافتح [[dist/shop/browser/ar/index.html]]: إيه اللي اتغير في [[<html>]]؟`,
          deep: {
            why: R`تطبيقات كتير في مصر والخليج لازم تبقى عربي وإنجليزي. لو النصوص مكتوبة في الـ template مباشرة، الترجمة بعدين بتبقى كابوس. التعليم بـ [[i18n]] من الأول بيخلي أي نص قابل للترجمة، والـ plural بيتعامل مع قواعد كل لغة (العربي فيه zero و one و two و few و many و other).`,
            how: R`[[ng add @angular/localize]] بيضيف [[@angular/localize/init]] في الـ polyfills والأنواع في tsconfig. [[ng extract-i18n]] بيقرا كل [[i18n]] و [[$localize]] ويعمل [[messages.xlf]]، وكل رسالة ليها id: من [[@@homeTitle]] لو كتبته (ثابت، أحسن)، أو hash من النص (بيتغير لو غيّرت حرف).

[[ng build --localize]] بيعمل build واحد وبعدين ينسخه لكل لغة ويبدّل النصوص، وبيحط [[lang]] و [[dir]] على [[<html>]] لوحده. في الـ lab: [[dist/shop/browser/ar/index.html]] طلع فيه [[<html lang="ar" dir="rtl">]] والنصوص عربي. والسيرفر (Nginx) بيوجّه [[/ar/]] و [[/en/]] للفولدر الصح، ومحتاج [[baseHref]] لكل لغة (بيتظبط لوحده مع [[--localize]]).

الـ ICU plural [[{count, plural, =0 {...} other {...}}]] بيختار الصيغة حسب الرقم وقواعد اللغة.

[[ng serve]] بيشغّل لغة واحدة؛ لتجربة العربي: [[ng serve --configuration=ar]] بعد ما تعمل configuration فيها [[localize: ["ar"]]].`,
            when: R`الرسمي: لما اللغات معروفة ومش محتاج تبدّل من غير reload، وعايز أسرع أداء و SEO لكل لغة. Transloco/ngx-translate: لما عايز زرار يبدّل اللغة فورًا، أو الترجمات بتيجي من API/CMS، وده اللي هتلاقيه في أغلب المشاريع المصرية.`,
            mistakes: R`تسيب الـ ids تتولّد من النص فأي تعديل إملائي في الإنجليزي يضيّع الترجمة العربي. وتنسى [[target-language]] فالـ build يطلّع تحذير. وتلزق نصوص بـ [[+]] في الكود بدل [[$localize]] بـ placeholders فالترجمة تبقى مستحيلة (ترتيب الكلام بيختلف في العربي). وتترجم وتنسى الـ RTL (الدرس الجاي).`
          },
          teach: R`## الفكرة: علّم، طلّع، ترجم، ابني

الترجمة الرسمية في Angular ٤ خطوات: بتعلّم النصوص اللي محتاجة ترجمة، والـ CLI بيطلّعها في ملف، وانت (أو المترجم) بتكتب جنب كل نص ترجمته، وبعدين الـ build بيطلّع نسخة كاملة من الموقع لكل لغة. المثال فيه الخطوات دي بالترتيب. اتجرّب كله على Windows في مشروع Angular 22.2 ([[@angular/localize]] 22.2.1)، والنسختين اتفتحوا في Chrome headless من سيرفر static صغير.

---

## ١. [[ng add @angular/localize]]

~~~text الناتج (آخره)
› Found compatible package version: 22.2.1.
UPDATE src/main.ts (273 bytes)
UPDATE tsconfig.app.json (445 bytes)
UPDATE tsconfig.spec.json (451 bytes)
UPDATE angular.json (2019 bytes)
~~~

| الملف | اتضاف فيه |
|---|---|
| [[angular.json]] | [["polyfills": ["@angular/localize/init"]]]: الكود اللي بيعرّف [[$localize]] وقت التشغيل |
| [[tsconfig.app.json]] | [["types": ["@angular/localize"]]]: عشان TypeScript يعرف [[$localize]] |
| [[src/main.ts]] | سطر [[/// <reference types="@angular/localize" />]] للسبب نفسه |

---

## ٢. تعليم النصوص

~~~html
<h1 i18n="@@homeTitle">Welcome to our shop</h1>
<p i18n>{count(), plural, =0 {No items} =1 {One item} other {{{count()}} items}}</p>
<button i18n-title title="Save your cart">Save</button>
~~~

### [[i18n="@@homeTitle"]]

[[i18n]] (= internationalization: i وبعدها ١٨ حرف وبعدها n) attribute بيقول «النص اللي جوه العنصر ده للترجمة». و [[@@homeTitle]] id ثابت انت اختاره. من غيره الـ id بيتعمل من النص نفسه (hash)، فلو غيّرت حرف في الإنجليزي الـ id يتغير والترجمة تضيع.

### الـ plural (ICU)

~~~text شكل الـ ICU message
{count(), plural, =0 {No items} =1 {One item} other {{{count()}} items}}
 └ القيمة  └ النوع  └ الحالات: =رقم بالظبط، أو فئة زي other
~~~

- [[count()]]: الرقم اللي بنختار على أساسه (signal في الكلاس).
- [[=0 {...}]] و [[=1 {...}]]: نص لرقم معين.
- [[other {...}]]: أي رقم تاني. و [[{{count()}}]] جواه interpolation عادي.

### [[i18n-title]]

[[i18n-]] وبعده اسم attribute: ترجم الـ attribute ده. هنا [[title]] (النص اللي بيظهر لما الماوس يقف على الزرار). كلمة «Save» نفسها مش متعلّمة، فهتفضل إنجليزي.

### في الكود: [[$localize]]

~~~ts
alert($localize$__bt:@@cartSaved:Your cart was saved$__bt);
~~~

[[$localize]] tagged template (دالة بتتكتب قبل الـ backtick على طول). [[:@@cartSaved:]] في الأول هو الـ id، والباقي النص.

---

## ٣. [[ng extract-i18n --output-path src/locale]]

~~~text الناتج
Application bundle generation complete. [3.744 seconds]
Extraction Complete. (Messages: 4)
~~~

بيعمل build عشان يلاقي كل الرسايل، ويكتبهم في [[src/locale/messages.xlf]] (XLIFF: صيغة XML للترجمة):

~~~xml src/locale/messages.xlf (مختصر)
<file source-language="en-US" datatype="plaintext" original="ng2.template">
  <trans-unit id="homeTitle" datatype="html">
    <source>Welcome to our shop</source>
  </trans-unit>
  <trans-unit id="6358580996267558411" datatype="html">
    <source>{VAR_PLURAL, plural, =0 {No items} =1 {One item} other {<x id="INTERPOLATION"/> items}}</source>
  </trans-unit>
  <trans-unit id="3928037272347022963" datatype="html">
    <source>Save your cart</source>
  </trans-unit>
  <trans-unit id="cartSaved" datatype="html">
~~~

- ٤ رسايل: العنوان، والـ plural، والـ title، واللي في الكود.
- اللي ليهم [[@@]] الـ id بتاعهم اسمك ([[homeTitle]] و [[cartSaved]])، والباقي رقم طويل (hash).
- في الـ plural الـ [[count()]] بقى [[VAR_PLURAL]]، والـ interpolation بقى [[<x id="INTERPOLATION"/>]]: placeholders المترجم بيسيبهم زي ما هم.

---

## ٤. الترجمة

~~~powershell
cp src/locale/messages.xlf src/locale/messages.ar.xlf
~~~

([[cp]] في PowerShell اسم تاني لـ [[Copy-Item]]، وفي bash أمر أصلي.) وفي النسخة العربي:

1. [[target-language="ar"]] على [[<file>]].
2. [[<target>...</target>]] بعد كل [[<source>]]:

~~~xml messages.ar.xlf (الإضافات)
<source>Welcome to our shop</source>
<target>أهلا بيك في المحل</target>

<target>{VAR_PLURAL, plural, =0 {مفيش حاجة} =1 {حاجة واحدة} =2 {حاجتين} few {<x id="INTERPOLATION"/> حاجات} other {<x id="INTERPOLATION"/> حاجة}}</target>
~~~

العربي في الـ plural ليه فئات زيادة: [[few]] (من 3 لـ 10) و [[many]] (من 11 لـ 99)، فالترجمة ممكن يبقى فيها حالات مش في الإنجليزي.

---

## ٥. [[angular.json]]

~~~json جوه "projects": { "shop": { ... } }
"i18n": { "sourceLocale": "en-US", "locales": { "ar": "src/locale/messages.ar.xlf" } }
~~~

- [[sourceLocale]]: لغة النصوص المكتوبة في الكود.
- [[locales]]: كل لغة وملف ترجمتها.

---

## ٦. [[ng build --localize]]

بيعمل build مرة، وبعدين ينسخ الناتج لكل لغة ويحط الترجمة مكان النص. قرينا الملفات اللي طلعت:

~~~text الناتج
folders: ar en-US
ar     <html lang="ar" dir="rtl">      <base href="/ar/">
en-US  <html lang="en-US" dir="ltr">   <base href="/en-US/">
~~~

- فولدر لكل لغة جوه [[browser]].
- [[lang]] و [[dir]] اتحطوا لوحدهم، و Angular عارف إن العربي RTL.
- [[base href]] اتظبط لكل لغة، فالسيرفر يوجّه [[/ar/]] لفولدر [[ar]].

وفتحنا الصفحة في النسختين ودوسنا على [[+]] لحد 11، والزرار اللي فيه [[$localize]]:

~~~text الناتج (Chrome)
[en-US] h1: Welcome to our shop | title: Save your cart
[en-US] plural: 0 -> No items | 1 -> One item | 2 -> 2 items | 3 -> 3 items | 11 -> 11 items
  [en-US] alert: Your cart was saved
[ar] h1: أهلا بيك في المحل | title: احفظ السلة
[ar] plural: 0 -> مفيش حاجة | 1 -> حاجة واحدة | 2 -> حاجتين | 3 -> 3 حاجات | 11 -> 11 حاجة
  [ar] alert: السلة اتحفظت
~~~

- 3 اختارت [[few]] (حاجات)، و 11 مكانش ليها [[many]] في ترجمتنا فراحت لـ [[other]] (حاجة). ده الـ plural بقواعد اللغة.
- مفيش أي كود اتغير بين النسختين: الترجمة اتحطت وقت الـ build.

---

## الخلاصة

| الخطوة | الأمر / العلامة |
|---|---|
| تسطيب | [[ng add @angular/localize]] |
| تعليم في الـ template | [[i18n="@@id"]] و [[i18n-title]] و ICU plural |
| تعليم في الكود | [[$localize]] مع [[:@@id:]] |
| طلّع الرسايل | [[ng extract-i18n --output-path src/locale]] |
| ترجم | نسخة [[.ar.xlf]] فيها [[target-language]] و [[<target>]] |
| ابني | [[i18n]] في [[angular.json]]، و [[ng build --localize]]: فولدر لكل لغة |`,
          lines: [
            R`بيسطّب [[@angular/localize]] ويضيفه في الـ polyfills و tsconfig.`,
            R`نص للترجمة بـ id ثابت [[homeTitle]].`,
            R`plural: الصيغة بتتغير حسب [[count()]].`,
            R`[[i18n-title]] بيترجم الـ attribute [[title]].`,
            R`[[$localize]] للنصوص في الكود، و [[:@@id:]] للـ id.`,
            R`بيطلّع كل الرسايل في [[src/locale/messages.xlf]].`,
            "نسخة للترجمة العربي، هتزوّد فيها targets.",
            R`build لكل لغة في فولدر لوحده.`
          ],
          sol: R`[[ng extract-i18n]] بيطبع [[Extraction Complete. (Messages: 4)]] (في الـ lab)، وفي الملف [[<trans-unit id="homeTitle">]] و [[<trans-unit id="cartSaved">]] وواحد بـ id رقمي طويل للـ plural وواحد للـ title.

بعد [[ng build --localize]]: فيه فولدرين [[ar]] و [[en-US]] جوه [[dist/shop/browser]]، و [[ar/index.html]] فيه [[<html lang="ar" dir="rtl">]]، والعنوان «أهلا بيك في المحل» (اللي كتبته في الـ target). [[dir="rtl"]] اتحط لوحده لأن Angular عارف إن العربي RTL. لو لقيت الإنجليزي في نسخة ar، اتأكد إن فيه [[<target>]] وإن الـ id مطابق.`
        },
        {
          cmd: "RTL",
          title: "تخلي التطبيق يشتغل صح بالعربي: dir و logical CSS و Directionality",
          desc: R`العربي من اليمين للشمال، ومش كفاية تترجم النص: الـ layout كله لازم يتعكس. ٣ حاجات:

[[<html lang="ar" dir="rtl">]]: المتصفح بيعكس الـ flex والـ text-align والـ scrollbars لوحده.

CSS logical properties: [[margin-inline-start]] بدل [[margin-left]]، و [[padding-inline-end]] و [[border-inline-start]] و [[text-align: start]]. دول بيتعكسوا لوحدهم مع الـ dir.

[[Directionality]] من [[@angular/cdk/bidi]]: لو الكود محتاج يعرف الاتجاه (مثلًا اتجاه slider أو animation). و Material و CDK بيقروه لوحدهم.`,
          example: R`@Component({
  selector: 'app-rtl',
  template: $__bt
    <div class="card"><span class="badge">جديد</span> {{ label() }}</div>
    <button (click)="toggle()">{{ lang() === 'ar' ? 'English' : 'عربي' }}</button>
  $__bt,
  styles: $__bt
    .card { padding-inline-start: 16px; border-inline-start: 4px solid teal; text-align: start; }
    .badge { margin-inline-end: 8px; }
  $__bt,
})
export class Rtl {
  private doc = inject(DOCUMENT);
  protected dir = inject(Directionality);
  lang = signal<'ar' | 'en'>('ar');
  label = signal('منتج');
  toggle() {
    this.lang.update((l) => (l === 'ar' ? 'en' : 'ar'));
    this.doc.documentElement.lang = this.lang();
    this.doc.documentElement.dir = this.lang() === 'ar' ? 'rtl' : 'ltr';
  }
}`,
          try: R`حط الـ component ودوس الزرار: الخط الأخضر بيروح فين؟ بعدين غيّر [[border-inline-start]] لـ [[border-left]] وكرر. وافتح أي صفحة فيها Material form field أو menu وقلب الـ dir.`,
          flag: "script",
          deep: {
            why: R`تطبيق عربي بـ [[margin-left]] في كل حتة بيبان «مقلوب»: الأيقونات في الناحية الغلط، والمسافات لازقة في الحرف الغلط. ده من أكتر الحاجات اللي بتبان في تطبيقات البنوك والحكومة المصرية. والـ logical properties بتخليك تكتب CSS مرة واحدة يشتغل للاتجاهين.`,
            how: R`الـ [[dir]] بيتورث: لو على [[<html>]] كل الصفحة بتتأثر، ولو على عنصر ([[<div dir="ltr">]]) بس هو واللي جواه، ومفيد لأرقام أو كود وسط نص عربي.

[[inline]] = الاتجاه اللي النص ماشي فيه (أفقي)، و [[start]] = بداية السطر: يمين في RTL وشمال في LTR. و [[block]] = الرأسي.

[[inject(DOCUMENT)]] بدل [[document]] مباشرة عشان يشتغل مع SSR (على السيرفر فيه document وهمي). و [[DOCUMENT]] بقى يتعمل له import من [[@angular/core]] في النسخ الحديثة (قبلها كان من common).

[[Directionality]] بيقرا [[dir]] من [[<html>]] و [[<body>]] وقت ما يتعمل. عشان يسمع للتغييرات جوه جزء من الصفحة، حط [[dir]] directive بتاع CDK ([[Dir]] من [[@angular/cdk/bidi]]) على العنصر، وده بيطلّع [[dirChange]].

الأيقونات الاتجاهية (سهم رجوع) لازم تتعكس: [[:dir(rtl) .icon-back { transform: scaleX(-1) }]] أو [[[dir=rtl] .icon-back]].`,
            when: R`أي تطبيق هيتعرض بالعربي، حتى لو دلوقتي إنجليزي بس: اكتب logical properties من الأول، مش هتكلّفك حاجة. و [[dir="ltr"]] على الحاجات اللي لازم تفضل LTR: أرقام تليفونات، و IBAN، وكود، وإيميلات.`,
            mistakes: R`[[margin-left]] و [[float: right]] و [[left: 0]] في كل حتة. وتقلب بـ [[transform: scaleX(-1)]] على الصفحة كلها (النص بيتقلب!). وتنسى الأيقونات الاتجاهية. وتقرا [[dir.value]] مرة وتفتكره هيتحدّث لوحده مع تغيير [[document.dir]] من غير الـ [[Dir]] directive.`
          },
          teach: R`## الفكرة: CSS بيتكلم عن «البداية» و«النهاية» مش «شمال» و«يمين»

المثال كارت عليه خط ملوّن في أول السطر، و badge جنبه مسافة، وزرار بيقلب الصفحة بين عربي وإنجليزي. الـ CSS مكتوب بـ logical properties، فنفس السطور بتشتغل في الاتجاهين. اتجرّب على Angular 22.2 على Windows في Chrome headless (عرض الصفحة 600px)، وقرينا الـ CSS المحسوب ومكان العناصر بعد كل ضغطة.

---

## ١. الـ template

~~~html
<div class="card"><span class="badge">جديد</span> {{ label() }}</div>
<button (click)="toggle()">{{ lang() === 'ar' ? 'English' : 'عربي' }}</button>
~~~

- الكارت: badge مكتوب فيه «جديد»، وبعده النص من [[label()]].
- الزرار: لو اللغة [[ar]] اكتب «English» (اللي هتروحله)، غير كده «عربي».

---

## ٢. الـ styles

~~~text styles
.card { padding-inline-start: 16px; border-inline-start: 4px solid teal; text-align: start; }
.badge { margin-inline-end: 8px; }
~~~

### الكلمات

| الكلمة | معناها |
|---|---|
| [[inline]] | الاتجاه اللي السطر ماشي فيه (أفقي في العربي والإنجليزي) |
| [[block]] | الاتجاه التاني (رأسي): السطور تحت بعض |
| [[start]] | أول السطر: يمين في RTL، وشمال في LTR |
| [[end]] | آخر السطر: شمال في RTL، ويمين في LTR |

فـ [[padding-inline-start: 16px]] = مسافة جوه الكارت من ناحية أول السطر. و [[border-inline-start]] = خط من ناحية أول السطر. و [[margin-inline-end]] على الـ badge = مسافة بعده في اتجاه القراية. و [[text-align: start]] = ابدأ الكلام من أول السطر.

RTL = right to left (من اليمين للشمال)، و LTR = left to right.

---

## ٣. الكلاس

~~~ts
private doc = inject(DOCUMENT);
protected dir = inject(Directionality);
lang = signal<'ar' | 'en'>('ar');
label = signal('منتج');
~~~

- [[inject(DOCUMENT)]]: الـ [[document]] بتاع الصفحة، من [[@angular/core]]. ليه مش [[document]] مباشرة؟ لأن مع SSR الكود بيشتغل على السيرفر ومفيش [[document]] حقيقي، و Angular بيدّيك واحد بديل.
- [[inject(Directionality)]]: من [[@angular/cdk/bidi]] (bidi = bidirectional، الاتجاهين). بيقولك الاتجاه في [[dir.value]].
- [[signal<'ar' | 'en'>('ar')]]: النوع قيمتين بس، فلو كتبت [['fr']] الـ compiler يعترض.

### [[toggle()]]

~~~ts
this.lang.update((l) => (l === 'ar' ? 'en' : 'ar'));
this.doc.documentElement.lang = this.lang();
this.doc.documentElement.dir = this.lang() === 'ar' ? 'rtl' : 'ltr';
~~~

- اقلب اللغة.
- [[documentElement]] هو عنصر [[<html>]]. [[lang]] عليه بيقول للمتصفح والقارئ الصوتي اللغة إيه، و [[dir]] بيقلب اتجاه الصفحة كلها.

---

## ٤. اللي حصل فعلًا

~~~text الناتج (Chrome، الـ CSS المحسوب)
AR : dir=rtl | border-left=0px  border-right=4px | padding-left=0px  padding-right=16px | badge margin-left=8px margin-right=0px | badge x=560
EN : dir=ltr | border-left=4px  border-right=0px | padding-left=16px padding-right=0px  | badge margin-left=0px margin-right=8px | badge x=43
~~~

- في العربي الخط والمسافة طلعوا **يمين**، والـ badge في أقصى اليمين (x=560 من 600) والمسافة على شماله.
- بعد الضغطة نفس الـ CSS طلّع الخط **شمال**، والـ badge في الشمال والمسافة على يمينه.
- ولا سطر CSS اتغير. المتصفح هو اللي ترجم [[start]] و [[end]] حسب [[dir]].

### الـ try: [[border-left]] بدل [[border-inline-start]]

~~~text الناتج
EN border-left: border-left=4px border-right=0px
AR border-left: border-left=4px border-right=0px
~~~

الخط فضل شمال في الحالتين، يعني في العربي بقى في **آخر** السطر. ده الفرق بين physical (شمال/يمين ثابت) و logical (أول/آخر السطر).

### [[Directionality]] بيقرا مرة واحدة

~~~text الناتج: dir.value
<html> من غير dir وقت التشغيل          dir.value = ltr  (وفضلت ltr بعد كل toggle)
<html dir="rtl"> وقت التشغيل            dir.value = rtl
بعد toggle (html dir=ltr)               dir.value = rtl
~~~

[[Directionality]] بيقرا [[dir]] من [[<body>]] أو [[<html>]] مرة لما يتعمل، ومش بيسمع لتغييرات بعدها. عشان كده لو بتبدّل الاتجاه وانت شغال، حط الـ directive [[Dir]] ([[[dir]="..."]]) على عنصر أب في الـ template، وده اللي Material و CDK اللي جواه بيسمعوله.

---

## الخلاصة

| بدل | استخدم |
|---|---|
| [[margin-left]] / [[margin-right]] | [[margin-inline-start]] / [[margin-inline-end]] |
| [[padding-left]] | [[padding-inline-start]] |
| [[border-left]] | [[border-inline-start]] |
| [[text-align: left]] | [[text-align: start]] |
| [[document]] | [[inject(DOCUMENT)]] |
| [[dir]] على [[<html>]] | بيقلب الصفحة كلها، و [[Directionality]] بيقراه مرة |`,
          lines: [
            "الـ decorator.",
            "الـ selector.",
            "بداية الـ template.",
            "كارت فيه badge ونص.",
            "زرار بيبدّل اللغة.",
            "قفلة.",
            "الـ CSS.",
            R`[[inline-start]] = يمين في العربي وشمال في الإنجليزي.`,
            R`المسافة بعد الـ badge في اتجاه القراية.`,
            "قفلة.",
            "قفلة.",
            "الكلاس.",
            R`[[DOCUMENT]] بدل [[document]] عشان SSR.`,
            R`[[Directionality]] من الـ CDK.`,
            "اللغة الحالية.",
            "النص.",
            "التبديل.",
            "اقلب اللغة.",
            R`[[lang]] على [[<html>]] (للقارئ الصوتي والخطوط).`,
            R`[[dir]] على [[<html>]]: كل الصفحة بتتعكس.`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`في العربي الخط الأخضر على اليمين والمسافة بين الـ badge والنص على شماله. لما تدوس English، الخط بيروح شمال والمسافة يمين، من غير ولا سطر CSS زيادة.

مع [[border-left]]: الخط بيفضل شمال في الحالتين، فالعربي بيبان غلط (الخط في آخر السطر مش أوله). ده الفرق بين physical و logical.

Material form fields والـ menus بتتعكس هي كمان، لأنها بتقرا الاتجاه. لو menu فتحت في الناحية الغلط بعد التبديل، ده لأن [[Directionality]] اتقرا مرة: حط [[dir]] على عنصر أب في الـ template واربطه بـ signal ([[<div [dir]="lang() === 'ar' ? 'rtl' : 'ltr'">]] مع [[Dir]] في imports).`
        }
      ]
    }
]);

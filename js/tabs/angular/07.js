// تكملة تاب angular: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/angular/01.js (شرح حقول الدرس في أوله)
MORE("angular", [
    {
      t: "الفورمات",
      l: 2,
      n: "reactive forms بأنواع (الموجود في كل شركة)، و signal forms (الجديد في 22)",
      items: [
        {
          cmd: "reactive forms",
          title: "فورم بـ FormGroup و Validators و formControlName",
          desc: R`الـ reactive forms هي الطريقة الأشهر في شغل Angular: الفورم متعرّف في الكلاس كـ [[FormGroup]] فيه [[FormControl]] لكل حقل ومعاه [[Validators]]، والـ template بيتربط بيه بـ [[[formGroup]]] و [[formControlName]].

كل control عنده state: [[value]] و [[valid]] و [[invalid]] و [[touched]] و [[dirty]] و [[errors]]. والفورم كلها نفس الحاجة للكل.

[[NonNullableFormBuilder]] بيختصر الكتابة، وبيخلي [[reset()]] يرجّع القيمة الأولى مش null.`,
          example: R`@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  template: $__bt
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="email" type="email" />
      @if (form.controls.email.touched && form.controls.email.hasError('email')) {
        <small>الإيميل شكله غلط</small>
      }
      <input formControlName="password" type="password" />
      <label><input type="checkbox" formControlName="remember" /> افتكرني</label>
      <button [disabled]="form.pending">دخول</button>
    </form>
  $__bt,
})
export class Login {
  private fb = inject(NonNullableFormBuilder);
  form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
    remember: this.fb.control(false),
  });
  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    console.log(this.form.getRawValue());
  }
}`,
          try: R`اعمل الفورم، واكتب إيميل غلط واخرج من الحقل. بعدين دوس دخول والفورم فاضية. زوّد رسالة لـ [[minLength]] بتقول الطول المطلوب والحالي (بص على [[form.controls.password.errors]]).`,
          flag: "script",
          deep: {
            why: R`الفورمات في تطبيقات البنوك والـ ERP ضخمة: ٣٠ حقل، و validation معقد، وحقول بتظهر وتختفي، وقوايم بتتضاف. الـ reactive forms بتحط كل ده في الكلاس، فتقدر تختبره من غير DOM، وتسمع لتغييرات أي حقل ([[valueChanges]] Observable)، وتعدّل القيم من الكود. والشكل التاني، template-driven بـ [[ngModel]]، أبسط للفورمات الصغيرة بس بيتعب مع الكبيرة.`,
            how: R`[[fb.group({ email: ['', validators] })]] بيعمل [[FormGroup]] فيه [[FormControl<string>]]. الـ directive [[formControlName="email"]] بتربط الـ input بالـ control في الاتجاهين، وبتحدّث [[touched]] لما تخرج من الحقل و [[dirty]] لما تكتب.

الـ validators functions بتاخد الـ control وترجّع [[null]] (تمام) أو object زي [[{ minlength: { requiredLength: 8, actualLength: 3 } }]]. عشان كده [[hasError('email')]].

Angular بيحط classes على الـ inputs لوحده: [[ng-invalid]] و [[ng-touched]] و [[ng-dirty]]، فتقدر تلوّنهم بـ CSS: [[input.ng-invalid.ng-touched { border-color: red }]].

[[(ngSubmit)]] بدل [[(submit)]] بيمنع الـ reload. و [[getRawValue()]] بترجع كل القيم حتى الحقول الـ disabled، أما [[value]] بتسيبها.

[[markAllAsTouched()]] بيخلي كل رسايل الخطأ تظهر لما يدوس submit على فورم ناقصة.`,
            when: "أي فورم متوسطة أو كبيرة، أو فيها منطق (حقل معتمد على حقل)، أو محتاج تختبرها. وده الشكل اللي هتلاقيه في معظم المشاريع الموجودة في الشغل.",
            mistakes: R`تنسى [[ReactiveFormsModule]] في imports: NG8002 Can't bind to 'formGroup'. وتعرض رسالة الخطأ من غير [[touched]] فالفورم تبقى حمرا قبل ما يكتب أي حاجة. وتقفل الزرار بـ [[[disabled]="form.invalid"]] من غير ما تقول للمستخدم ليه: الأحسن تسيبه مفتوح وتعمل [[markAllAsTouched]]. وتستخدم [[FormBuilder]] العادي فالـ [[reset()]] يحط null وتتفاجئ.`
          },
          teach: R`## الفكرة: الفورم متعرّفة في الكلاس، والـ template بيتربط بيها

في الـ reactive forms انت بتبني الفورم في TypeScript: object فيه حقل لكل input ومعاه شروطه. والـ template مش بيعرّف حاجة، بيقول بس «الـ input ده تبع الحقل الفلاني». اتجرّب في Angular 22.2 على Windows، والفورم اتملت واتضغط عليها بـ Playwright في Chrome headless.

---

## ١. الكلاس: بناء الفورم

~~~ts
private fb = inject(NonNullableFormBuilder);
form = this.fb.group({
  email: this.fb.control('', [Validators.required, Validators.email]),
  password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
  remember: this.fb.control(false),
});
~~~

### [[NonNullableFormBuilder]]

builder (أداة بتختصر الكتابة) من [[@angular/forms]]. بدل [[new FormGroup({ email: new FormControl('', ...) })]] بتكتب [[fb.group]] و [[fb.control]]. وكلمة NonNullable معناها إن [[reset()]] بيرجّع كل حقل لقيمته الأولى مش [[null]].

### [[fb.group({...})]] و [[fb.control(...)]]

- [[group]] بيعمل [[FormGroup]]: مجموعة حقول بأسامي، هنا [[email]] و [[password]] و [[remember]].
- [[control('', [...])]] بيعمل [[FormControl]]: أول argument القيمة الأولى ([['']] نص فاضي، أو [[false]])، والتاني array من الـ validators.
- النوع بيتستنتج من القيمة الأولى: [[email]] نوعه [[FormControl<string>]] و [[remember]] نوعه [[FormControl<boolean>]].

### الـ [[Validators]]

| الـ validator | بيعترض لما | الخطأ اللي بيطلع |
|---|---|---|
| [[Validators.required]] | الحقل فاضي | [[{"required":true}]] |
| [[Validators.email]] | النص مش بشكل إيميل (والفاضي مش بيعترض عليه) | [[{"email":true}]] |
| [[Validators.minLength(8)]] | أقل من ٨ حروف | [[{"minlength":{"requiredLength":8,"actualLength":3}}]] |

الأخطاء دي اتطبعت فعلًا من [[form.controls.email.errors]] و [[form.controls.password.errors]].

---

## ٢. الـ template: الربط

~~~html
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="email" type="email" />
~~~

- [[imports: [ReactiveFormsModule]]] في الـ decorator: فيه الـ directives [[formGroup]] و [[formControlName]]. من غيره الـ build بيقع:

~~~text الناتج (ng build من غير ReactiveFormsModule)
X [ERROR] NG8002: Can't bind to 'formGroup' since it isn't a known property of 'form'.
    src/app/l/l04-login.ts:8:10:
      8 │     <form [formGroup]="form" (ngSubmit)="submit()">
~~~

- [[[formGroup]="form"]]: الـ [[<form>]] ده هو الـ [[FormGroup]] اللي اسمه [[form]] في الكلاس. الأقواس المربعة = property binding.
- [[(ngSubmit)="submit()"]]: لما الفورم تتبعت (Enter أو زرار جواها)، نادي [[submit()]]، ومن غير ما الصفحة تعمل reload.
- [[formControlName="email"]]: الـ input ده مربوط بالحقل [[email]] في الاتجاهين: اللي بيتكتب بيروح للـ control، و [[setValue]] من الكود بيظهر في الـ input.

### رسالة الخطأ

~~~html
@if (form.controls.email.touched && form.controls.email.hasError('email')) {
  <small>الإيميل شكله غلط</small>
}
~~~

- [[form.controls.email]]: الـ control نفسه.
- [[touched]]: المستخدم دخل الحقل وخرج منه. من غيرها الرسالة تظهر قبل ما يكتب حاجة.
- [[hasError('email')]]: فيه خطأ اسمه [[email]] في [[errors]]؟

### الـ checkbox والزرار

- [[<input type="checkbox" formControlName="remember" />]]: مع checkbox القيمة [[true]] أو [[false]].
- [[[disabled]="form.pending"]]: [[pending]] بتبقى [[true]] بس وفيه async validator شغال (بيسأل السيرفر مثلًا). هنا مفيش، فالزرار دايمًا مفتوح.

---

## ٣. [[submit()]]

~~~ts
submit() {
  if (this.form.invalid) { this.form.markAllAsTouched(); return; }
  console.log(this.form.getRawValue());
}
~~~

- [[form.invalid]]: أي حقل فيه خطأ؟
- [[markAllAsTouched()]]: اعتبر كل الحقول اتلمست، فكل رسايل الخطأ اللي شرطها [[touched]] تظهر. و [[return]] يوقف.
- [[getRawValue()]]: كل القيم كـ object بأنواعها.

---

## ٤. اللي حصل فعلًا

~~~text الناتج (Chrome)
start classes email: ng-untouched ng-pristine ng-invalid
--- submit empty
email errors: {"required":true} touched: true
--- type abc + blur
text: الإيميل شكله غلط  محتاج 8 حروف، كتبت 3  افتكرني  دخول
classes email: ng-invalid ng-touched ng-dirty
--- valid
[console.log] {email: ali@example.com, password: 12345678, remember: true}
--- reset
{"email":"","password":"","remember":false}
~~~

- في الأول الـ input عليه classes حطها Angular: [[ng-untouched]] (ملمسش)، و [[ng-pristine]] (متكتبش فيه)، و [[ng-invalid]] (فاضي و required). تقدر تلوّن بيها: [[input.ng-invalid.ng-touched { border-color: red }]].
- لما دوسنا «دخول» والفورم فاضية: [[touched]] بقت [[true]]، بس رسالة «الإيميل شكله غلط» **مظهرتش**، لأن الخطأ [[required]] مش [[email]]. لو عايز رسالة للفاضي، زوّد [[@if]] لـ [[hasError('required')]].
- بعد ما كتبنا [[abc]] وخرجنا: الـ classes بقت [[ng-invalid ng-touched ng-dirty]] والرسالتين ظهروا (التانية من الـ solCode).
- [[reset()]] رجّع [[email]] لـ [['']] مش [[null]]، بفضل [[NonNullableFormBuilder]].

---

## ٥. الـ solCode: رسالة الطول

~~~html
@if (form.controls.password.touched && form.controls.password.errors?.['minlength']; as e) {
  <small>محتاج {{ e.requiredLength }} حروف، كتبت {{ e.actualLength }}</small>
}
~~~

- [[errors?.['minlength']]]: [[?.]] لأن [[errors]] بتبقى [[null]] لما مفيش أخطاء، و [[['minlength']]] (حروف صغيرة) هو اسم الخطأ اللي [[Validators.minLength]] بيطلّعه.
- [[; as e]]: احفظ نتيجة الشرط (الـ object [[{ requiredLength, actualLength }]]) في متغير اسمه [[e]] تستخدمه جوه.
- النتيجة: «محتاج 8 حروف، كتبت 3».

---

## الخلاصة

| الحاجة | فين |
|---|---|
| الحقول والـ validators | في الكلاس: [[fb.group]] و [[fb.control]] |
| الربط | [[[formGroup]]] على الفورم و [[formControlName]] على كل input، و [[ReactiveFormsModule]] في imports |
| الأخطاء | [[errors]] و [[hasError()]]، وتظهر بعد [[touched]] |
| الإرسال | [[(ngSubmit)]]، ولو invalid اعمل [[markAllAsTouched()]] |
| [[reset()]] | بيرجّع القيم الأولى مع [[NonNullableFormBuilder]] |`,
          lines: [
            "الـ decorator.",
            "الـ selector.",
            R`[[ReactiveFormsModule]] فيه [[formGroup]] و [[formControlName]].`,
            "بداية الـ template.",
            R`الفورم مربوطة بالـ [[FormGroup]]، و [[ngSubmit]] من غير reload.`,
            R`input مربوط بـ control اسمه email.`,
            "الرسالة تظهر بس لو لمسه ولو فيه خطأ email.",
            "الرسالة.",
            "قفلة.",
            "كلمة السر.",
            "checkbox مربوط بـ boolean.",
            R`مقفول وهو بيفحص async validators بس.`,
            "قفلة الفورم.",
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "builder مفيهوش null.",
            "الفورم.",
            R`control قيمته الأولى نص فاضي ومعاه validators. [[fb.control]] من الـ NonNullable builder نوعه [[FormControl<string>]].`,
            "مطلوب و ٨ حروف على الأقل.",
            R`boolean من غير validators.`,
            "قفلة.",
            "لما يعمل submit.",
            "ناقصة؟ اظهر كل الأخطاء ووقّف.",
            R`القيم بأنواعها: [[{ email: string; password: string; remember: boolean }]].`,
            "قفلة.",
            "قفلة."
          ],
          sol: R`لما تكتب [[abc]] وتخرج: الرسالة بتظهر، والـ input عليه [[ng-invalid ng-touched ng-dirty]]. لما تدوس دخول والفورم فاضية: [[markAllAsTouched]] بيخلي كل الحقول touched، ومفيش console.log. ده اتأكد في الـ lab: بعد [[submit()]] على فورم فاضية، [[email.touched]] بقت true، وبعد [[setValue]] بقيم صح [[valid]] بقت true، و [[reset()]] رجّعت [[email]] لـ [['']] مش null.

رسالة الـ minLength:`,
          solCode: R`@if (form.controls.password.touched && form.controls.password.errors?.['minlength']; as e) {
  <small>محتاج {{ e.requiredLength }} حروف، كتبت {{ e.actualLength }}</small>
}`
        },
        {
          cmd: "typed forms و FormArray",
          title: "أنواع الفورم، و FormArray لحقول بتتضاف، و validator بتاعك",
          desc: R`من Angular 14 الفورمات typed: [[new FormControl('')]] نوعها [[FormControl<string | null>]]، ومع [[nonNullable: true]] بتبقى [[FormControl<string>]]. و [[form.value]] و [[getRawValue()]] بيطلعوا بأنواع، فلو غيّرت اسم حقل الـ compiler هيعرّفك.

[[FormArray]] لحقول عددها بيتغير: أصناف في طلب، أو أرقام تليفونات. وبتلف عليها بـ @for في الـ template.

والـ validator بتاعك دالة: بتاخد control وترجّع [[null]] أو object بالخطأ.`,
          example: R`function egyptianPhone(c: AbstractControl<string>): ValidationErrors | null {
  return /^01[0125]\d{8}$/.test(c.value) ? null : { phone: true };
}
export class OrderForm {
  form = new FormGroup({
    phone: new FormControl('', { nonNullable: true, validators: [Validators.required, egyptianPhone] }),
    items: new FormArray([new FormControl('', { nonNullable: true })]),
    notes: new FormControl<string | null>(null),
  });
  addItem() { this.form.controls.items.push(new FormControl('', { nonNullable: true })); }
}
// template:
<form [formGroup]="form">
  <input formControlName="phone" />
  <div formArrayName="items">
    @for (item of form.controls.items.controls; track $index) { <input [formControl]="item" /> }
  </div>
  <button type="button" (click)="addItem()">صنف كمان</button>
</form>`,
          try: R`جرّب [[form.controls.phone.setValue('0101234567')]] (١٠ أرقام) و [[hasError('phone')]]، وبعدين رقم صح. زوّد صنفين واطبع [[form.getRawValue().items]]. وبعدين اكتب [[const x: number = form.value.phone]] وشوف الـ compiler.`,
          flag: "script",
          deep: {
            why: R`قبل الـ typed forms كان [[form.value]] نوعه [[any]]: تغيّر اسم حقل من [[phone]] لـ [[mobile]] والكود اللي بيقراه يفضل يـ compile ويبعت undefined للسيرفر. الأنواع بتمسك ده. و FormArray موجودة لأن فورمات كتير حقيقية فيها «ضيف واحد كمان».`,
            how: R`النوع بيتستنتج من القيمة الأولى. [[new FormControl('')]] نوعها [[string | null]] لأن [[reset()]] من غير nonNullable بيحط null. [[nonNullable: true]] بيخلي reset يرجّع [['']]، والنوع [[string]] بس.

[[form.value]] نوعه [[Partial<...>]] (كل حاجة ممكن undefined) لأن الحقول الـ disabled بتتشال منه. [[getRawValue()]] فيه كل حاجة ومن غير Partial، فغالبًا هو اللي تبعته للـ API.

[[formArrayName="items"]] بيدخل جوه الـ array، و [[[formControl]="item"]] بيربط كل عنصر. [[track $index]] مقبول هنا لأن الـ controls نفسهم مش ليهم id، بس لو بتحذف من النص الأحسن [[track item]] (الـ control object نفسه ثابت).

الـ validator على مستوى الـ group (مثلًا كلمة السر = التأكيد) بيتحط في [[new FormGroup({...}, { validators: [matchPasswords] })]] وبياخد الـ group كله. والـ async validators (هل الإيميل موجود؟) بيرجّعوا Observable، وأثناءهم [[form.pending]] بـ true.

في الكود القديم هتلاقي [[UntypedFormGroup]] و [[UntypedFormControl]]: دول اللي الـ migration حطهم لما المشروع اتنقل لـ 14، ونوعهم any.`,
            when: R`دايمًا [[nonNullable]] إلا لو null قيمة ليها معنى. FormArray لأي قايمة المستخدم بيزوّد فيها. و validator بتاعك لأي قاعدة بتتكرر (رقم قومي ١٤ رقم، موبايل مصري، IBAN).`,
            mistakes: R`تبعت [[form.value]] للـ API وفيه حقل disabled فيختفي من الـ body. وتعمل [[form.controls.items.value.push(...)]]: ده بيعدّل array عادية مش بيضيف control. وتستخدم [[Untyped...]] في كود جديد. وتنسى [[type="button"]] على زرار الإضافة جوه الـ form فيعمل submit.`
          },
          teach: R`## الفكرة: ٣ حاجات في مثال واحد

المثال فورم طلب فيه: validator بتاعنا لرقم الموبايل المصري، و [[FormArray]] لأصناف بتتضاف بزرار، وحقل نوعه مكتوب صريح لأنه ممكن يبقى [[null]]. المرة دي الفورم مكتوبة بـ [[new FormGroup]] و [[new FormControl]] مباشرة من غير builder. اتجرّب في Angular 22.2 على Windows، والقيم اتقرت من الفورم في Chrome headless.

---

## ١. الـ validator بتاعك

~~~ts
function egyptianPhone(c: AbstractControl<string>): ValidationErrors | null {
  return /^01[0125]\d{8}$/.test(c.value) ? null : { phone: true };
}
~~~

- الـ validator مجرد دالة: بتاخد الـ control وترجّع [[null]] لو تمام، أو object بالخطأ لو مش تمام.
- [[AbstractControl<string>]]: أي control قيمته string. [[AbstractControl]] هو الأب لـ [[FormControl]] و [[FormGroup]] و [[FormArray]].
- [[ValidationErrors | null]]: نوع الرجوع. [[ValidationErrors]] يعني object أي مفاتيح فيه.
- [[{ phone: true }]]: اسم الخطأ [[phone]]، وده اللي [[hasError('phone')]] بيدوّر عليه.

### الـ regex: [[/^01[0125]\d{8}$/]]

| الحتة | معناها |
|---|---|
| [[^]] | بداية النص |
| [[01]] | لازم يبدأ بـ 01 |
| [[[0125]]] | رقم واحد من دول: 0 أو 1 أو 2 أو 5 (010 و 011 و 012 و 015) |
| [[\d{8}]] | ٨ أرقام ([[\d]] = digit) |
| [[$]] | آخر النص، فمفيش حاجة زيادة |

و [[.test(c.value)]] بيرجّع [[true]] أو [[false]].

---

## ٢. الفورم

~~~ts
form = new FormGroup({
  phone: new FormControl('', { nonNullable: true, validators: [Validators.required, egyptianPhone] }),
  items: new FormArray([new FormControl('', { nonNullable: true })]),
  notes: new FormControl<string | null>(null),
});
~~~

### [[phone]]

- [[new FormControl('', {...})]]: القيمة الأولى [['']]، والإعدادات في object.
- [[nonNullable: true]]: النوع [[FormControl<string>]] (من غيرها [[string | null]])، و [[reset()]] بيرجّعه [['']].
- [[validators: [...]]]: الـ validator بتاعنا جنب [[required]] عادي. بنمرر الدالة نفسها [[egyptianPhone]] من غير [[()]].

### [[items]]

[[new FormArray([...])]]: array من controls، بيبدأ بـ control واحد فاضي. ده اللي هنضيف عليه.

### [[notes]]

[[new FormControl<string | null>(null)]]: لو كتبت [[new FormControl(null)]] بس، TypeScript هيستنتج النوع [[null]] وبس، ومش هتعرف تحط فيه نص. فبتكتب النوع صريح بين [[< >]].

### [[addItem()]]

~~~ts
addItem() { this.form.controls.items.push(new FormControl('', { nonNullable: true })); }
~~~

[[form.controls.items]] هو الـ [[FormArray]]، و [[.push(...)]] بيضيف control جديد. ده **غير** [[items.value.push]] اللي بيعدّل array عادية ملهاش علاقة بالفورم.

---

## ٣. الـ template

~~~html
<form [formGroup]="form">
  <input formControlName="phone" />
  <div formArrayName="items">
    @for (item of form.controls.items.controls; track $index) { <input [formControl]="item" /> }
  </div>
  <button type="button" (click)="addItem()">صنف كمان</button>
</form>
~~~

- [[formArrayName="items"]]: «ادخل جوه الـ array اللي اسمها [[items]]».
- [[form.controls.items.controls]]: الـ controls اللي جوه الـ array، ونلف عليهم بـ [[@for]].
- [[track $index]]: الـ controls ملهاش id، فبنتابع بالترتيب.
- [[[formControl]="item"]]: اربط الـ input ده بالـ control object نفسه (مش بالاسم زي [[formControlName]]).
- [[type="button"]]: أي [[<button>]] جوه [[<form>]] نوعه الافتراضي [[submit]]. من غيرها، الضغطة هتعمل submit.

---

## ٤. اللي حصل فعلًا

~~~text الناتج (Chrome)
empty phone errors: {"required":true,"phone":true}
'0101234567' hasError('phone'): true
'01312345678' hasError('phone'): true
'01012345678' valid: true
~~~

- الفاضي فيه خطأين مع بعض: [[required]]، و [[phone]] لأن الـ regex مش بيقبل نص فاضي.
- ١٠ أرقام: غلط. و 013: غلط لأن 3 مش في [[[0125]]]. و ١١ رقم بـ 010: صح.

بعد ضغطتين على «صنف كمان»: الـ inputs بقوا ٤ (موبايل + ٣ أصناف)، وكتبنا «كشكول» في التاني:

~~~text الناتج
inputs before: 2
inputs after 2 clicks: 4
["","كشكول",""]
~~~

### [[value]] و [[getRawValue()]]

قفلنا حقل [[notes]] بـ [[disable()]]:

~~~text الناتج
value:       {"phone":"01012345678","items":["","قلم",""],"notes":null}
notes disabled -> value: {"phone":"01012345678","items":["","قلم",""]}
getRawValue: {"phone":"01012345678","items":["","قلم",""],"notes":null}
after reset: {"phone":"","items":["","",""],"notes":null}
~~~

- [[value]] بيشيل أي حقل disabled، عشان كده نوعه [[Partial<...>]] (كل حاجة ممكن تبقى [[undefined]]).
- [[getRawValue()]] فيه كل الحقول.
- [[reset()]] بيفضّي القيم بس **مش** بيشيل الأصناف اللي اتضافت: لسه ٣.

### الـ try: الـ compiler

~~~ts
const x: number = o.form.value.phone;
~~~

~~~text الناتج (ng build)
X [ERROR] TS2322: Type 'string | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.
~~~

الـ compiler عارف إن [[phone]] نص، وكمان إنه ممكن يبقى [[undefined]] (بسبب الـ Partial). ده كله من غير ما تكتب نوع واحد بإيدك.

---

## الخلاصة

| الحاجة | اللي يفضل في دماغك |
|---|---|
| validator بتاعك | دالة: [[null]] = تمام، object = اسم الخطأ |
| [[nonNullable: true]] | النوع من غير [[null]]، و [[reset()]] للقيمة الأولى |
| [[FormArray]] | [[.push(control)]] للإضافة، و [[formArrayName]] + [[[formControl]]] في الـ template |
| [[value]] | من غير الحقول الـ disabled، ونوعه Partial |
| [[getRawValue()]] | كل حاجة، وده اللي غالبًا تبعته للـ API |`,
          lines: [
            R`validator: بياخد control نوعه string ويرجّع null أو خطأ.`,
            R`موبايل مصري: 010 أو 011 أو 012 أو 015 وبعدهم ٨ أرقام.`,
            "قفلة.",
            "الكلاس.",
            "الفورم.",
            R`[[FormControl<string>]] مطلوب ولازم يطابق الـ validator.`,
            R`array من controls، بيبدأ بواحد.`,
            R`حقل null مسموح فيه، فالنوع مكتوب صريح.`,
            "قفلة.",
            R`بيضيف control جديد للـ array.`,
            "قفلة.",
            R`الـ [[FormGroup]] نفسه.`,
            R`حقل عادي بالاسم.`,
            R`ادخل جوه [[items]].`,
            R`لف على الـ controls واربط كل واحد بـ [[[formControl]]].`,
            "قفلة.",
            R`[[type="button"]] عشان ميعملش submit.`,
            "قفلة."
          ],
          sol: R`[[0101234567]] (١٠ أرقام): [[hasError('phone')]] بـ true. [[01012345678]]: valid. ده اللي اتأكد في الـ lab. بعد [[addItem()]] مرتين، [[getRawValue().items]] بترجع array فيها ٣ strings.

[[const x: number = form.value.phone]] بيطلّع [[Type 'string | undefined' is not assignable to type 'number']]. لاحظ الـ [[undefined]]: ده من [[form.value]] اللي نوعه Partial. مع [[form.getRawValue().phone]] النوع [[string]] بس.`
        },
        {
          cmd: "signal forms",
          title: "signal forms: الفورم model في signal والـ validation schema (جديد في 22)",
          desc: R`في Angular 22 نزل شكل جديد stable للفورمات في [[@angular/forms/signals]]: البيانات في signal عادية، و [[form(model, schema)]] بيعمل «شجرة حقول» (FieldTree) بنفس شكلها، وكل حقل بيتربط بـ [[[formField]]] في الـ template.

الـ validation في الـ schema: [[required(p.email)]] و [[email(p.email)]] و [[minLength(p.password, 8)]]، وكل حقل عنده signals: [[value()]] و [[valid()]] و [[touched()]] و [[errors()]].

مفيش FormGroup ولا FormControl ولا valueChanges: كله signals. ده الاتجاه الجديد، بس الـ reactive forms هتفضل في المشاريع الموجودة سنين، فلازم تعرف الاتنين.`,
          example: R`import { FormField, email, form, minLength, required, submit } from '@angular/forms/signals';
@Component({
  selector: 'app-signup',
  imports: [FormField],
  template: $__bt
    <input type="email" [formField]="f.email" />
    @if (f.email().touched() && f.email().invalid()) {
      @for (e of f.email().errors(); track e.kind) { <small>{{ e.message }}</small> }
    }
    <input type="password" [formField]="f.password" />
    <button (click)="save()" [disabled]="f().submitting()">سجّل</button>
  $__bt,
})
export class Signup {
  model = signal({ email: '', password: '' });
  f = form(this.model, (p) => {
    required(p.email, { message: 'الإيميل مطلوب' });
    email(p.email, { message: 'الإيميل شكله غلط' });
    minLength(p.password, 8, { message: '٨ حروف على الأقل' });
  });
  async save() {
    await submit(this.f, async () => {
      console.log('هنبعت', this.model());
      return undefined;
    });
  }
}`,
          try: R`اعمل الفورم واكتب في الإيميل، وحط [[{{ model() | json }}]] تحت: بيتحدّث مع كل حرف؟ بعدين اعمل [[model.set({ email: 'a@b.com', password: '12345678' })]] من زرار وشوف الـ inputs. وفي الآخر زوّد حقل [[confirm]] و validation إنه زي الـ password (بص على [[validate]] في الدوكس).`,
          flag: "script",
          deep: {
            why: R`الـ reactive forms اتعملت قبل الـ signals: الـ state في FormControl منفصل عن بياناتك، والتغييرات Observables، والأنواع اتضافت بعدين. الـ signal forms بتخلي بياناتك هي مصدر الحقيقة: الـ model signal، وأي تعديل في الـ input بيكتب فيه مباشرة، وأي تعديل فيه بيظهر في الـ input. والـ validation متعرّفة مرة في schema تقدر تعيد استخدامها.`,
            how: R`[[form(this.model, schemaFn)]] مش بيعمل نسخة: بيقرا ويكتب في [[model]] نفسه. [[f.email]] حقل، و [[f.email()]] الـ state بتاعه ([[value]] و [[errors]] و [[touched]] و [[dirty]] و [[disabled]] و [[invalid]]). و [[f()]] الـ state بتاع الفورم كلها.

[[[formField]="f.email"]] directive بتربط الـ input الـ native في الاتجاهين وبتحدّث touched. وتقدر تعمل component بتاعك يشتغل معاها لو عمل implement لـ [[FormValueControl]] (فيه [[value = model()]]).

الـ errors array من objects فيها [[kind]] ([['required']] و [['email']] و [['minLength']]) و [[message]] لو حطيتها. ولما الإيميل فاضي بيطلع [[required]] بس، لأن [[email]] مش بيعترض على الفاضي.

[[submit(form, action)]] بيعمل touched لكل الحقول، ولو الفورم valid بينادي الـ action، و [[f().submitting()]] بـ true وهو شغال. ولو الـ action رجّعت errors (من السيرفر مثلًا) بتتحط على الحقول.

وفيه [[validateAsync]] و [[validateHttp]] للـ async، و [[disabled(p.x, () => cond)]] و [[hidden]] للمنطق، و [[validateStandardSchema]] لو عايز تستخدم schema من Zod.`,
            when: R`فورمات جديدة في مشروع على 22 والفريق موافق. في مشروع موجود مليان reactive forms، خليك على نفس الشكل عشان الاتساق، وفيه compat layer ([[@angular/forms/signals/compat]]) لو عايز تخلط. وفي الانترفيو ٢٠٢٦ اعرف تقول الفرق.`,
            mistakes: R`تنسى [[FormField]] في imports: [[[formField]]] مش هيتعرف. وتكتب [[f.email().value]] وتفتكره قيمة: ده signal، الصح [[f.email().value()]]. وتعمل [[model().email = 'x']] (mutation) فالفورم متحسش؛ اعمل [[model.update(m => ({ ...m, email: 'x' }))]] أو [[f.email().value.set('x')]]. وتدوّر على دروس قديمة فيها [[[field]]] أو [[Control]]: دي كانت أسامي الـ experimental في 21 واتغيرت.`
          },
          teach: R`## الفكرة: بياناتك signal، والفورم «شجرة» فوقها

في الـ signal forms مفيش [[FormGroup]] ولا [[FormControl]]. بتعمل signal عادية فيها البيانات، و [[form()]] بيبني فوقها حقل لكل مفتاح، وكل حقل عنده حالة (valid و touched و errors) كلها signals. الكتابة في الـ input بتغيّر الـ signal مباشرة، والعكس. اتجرّب في Angular 22.2 على Windows ([[@angular/forms/signals]] جاية مع [[@angular/forms]]، مفيش install زيادة)، والفورم اتملت بـ Playwright في Chrome headless.

---

## ١. الـ import

~~~ts
import { FormField, email, form, minLength, required, submit } from '@angular/forms/signals';
~~~

| الاسم | هو إيه |
|---|---|
| [[form]] | الدالة اللي بتبني الفورم من signal |
| [[required]] و [[email]] و [[minLength]] | قواعد validation بتتحط في الـ schema |
| [[submit]] | دالة بتتعامل مع الإرسال |
| [[FormField]] | الـ directive اللي اسمها [[[formField]]] في الـ template |

---

## ٢. الكلاس

~~~ts
model = signal({ email: '', password: '' });
f = form(this.model, (p) => {
  required(p.email, { message: 'الإيميل مطلوب' });
  email(p.email, { message: 'الإيميل شكله غلط' });
  minLength(p.password, 8, { message: '٨ حروف على الأقل' });
});
~~~

### [[model = signal({...})]]

البيانات نفسها، signal عادية (درس «signal و computed»). دي «مصدر الحقيقة»: الفورم بتقرا منها وتكتب فيها، مش بتعمل نسخة.

### [[form(this.model, (p) => {...})]]

- أول argument: الـ signal.
- التاني: دالة اسمها **schema**، بتتنادى مرة واحدة عشان تسجّل القواعد. الـ [[p]] (path) شكله زي الـ model: [[p.email]] و [[p.password]]، وبيستخدم بس عشان تقول «القاعدة دي على الحقل ده».
- النتيجة [[f]]: شجرة حقول (FieldTree). [[f.email]] حقل الإيميل، و [[f.password]] حقل الباسورد.

### القواعد

- [[required(p.email, { message })]]: لازم يتملا، والرسالة اللي هتظهر.
- [[email(p.email, ...)]]: لازم شكل إيميل. والفاضي مش بيعترض عليه (ده شغل [[required]]).
- [[minLength(p.password, 8, ...)]]: ٨ حروف على الأقل.

---

## ٣. الحقل والـ state بتاعه: [[f.email]] ولا [[f.email()]]؟

| تكتب | تاخد |
|---|---|
| [[f.email]] | الحقل نفسه، وده اللي بتديه لـ [[[formField]]] |
| [[f.email()]] | الـ state بتاعه: object فيه signals |
| [[f.email().value()]] | القيمة دلوقتي |
| [[f.email().touched()]] و [[invalid()]] و [[errors()]] | الحالة |
| [[f()]] | state الفورم كلها: [[valid()]] و [[submitting()]] |

[[f.email().value]] من غير [[()]] نوعه function (اتأكدنا بـ [[typeof]] في المتصفح)، يعني signal لسه مقريتهاش.

---

## ٤. الـ template

~~~html
<input type="email" [formField]="f.email" />
@if (f.email().touched() && f.email().invalid()) {
  @for (e of f.email().errors(); track e.kind) { <small>{{ e.message }}</small> }
}
<input type="password" [formField]="f.password" />
<button (click)="save()" [disabled]="f().submitting()">سجّل</button>
~~~

- [[[formField]="f.email"]]: اربط الـ input ده بحقل الإيميل في الاتجاهين، وحدّث [[touched]] لما يخرج منه. محتاج [[FormField]] في [[imports]].
- [[errors()]]: array، كل عنصر فيه [[kind]] (نوع الخطأ: [['required']] أو [['email']] أو [['minLength']]) و [[message]]. ونلف عليها بـ [[@for]] ونتابع بـ [[kind]].
- [[f().submitting()]]: [[true]] طول ما الـ action بتاع [[submit]] شغال، فالزرار يتقفل وميتضغطش مرتين.

---

## ٥. [[save()]] و [[submit]]

~~~ts
async save() {
  await submit(this.f, async () => {
    console.log('هنبعت', this.model());
    return undefined;
  });
}
~~~

- [[submit(this.f, action)]]: بيعمل touched لكل الحقول (فالأخطاء تظهر)، ولو الفورم valid بينادي الـ [[action]].
- الـ action [[async]]: هنا بتعمل log، وفي الحقيقة بتبعت للسيرفر.
- [[return undefined]]: «مفيش أخطاء من السيرفر». لو رجّعت أخطاء، بتتحط على الحقول.

---

## ٦. اللي حصل فعلًا

~~~text الناتج (Chrome)
start valid: false | email errors: [{"kind":"required","message":"الإيميل مطلوب"}]
--- click سجّل (empty)
touched: true | smalls: [ 'الإيميل مطلوب' ]
--- type "bad"
model: { "email": "bad", "password": "" } | errors: [{"kind":"email","message":"الإيميل شكله غلط"}]
--- click املا (model.set)
input value: a@b.com | valid: true
--- click سجّل (valid)
[console.log] هنبعت {email: a@b.com, password: 12345678}
~~~

- في الأول: خطأ [[required]] بس، من غير [[email]]، لأن الحقل فاضي.
- «سجّل» والفورم فاضية: [[submit]] عمل touched، فالرسالة ظهرت، والـ action متناداش (مفيش «هنبعت»).
- كتبنا [[bad]] في الـ input: الـ [[model()]] نفسه بقى فيه [[bad]] (الـ try: [[{{ model() | json }}]] محتاج [[JsonPipe]] في imports)، والخطأ اتغير لـ [[email]].
- زرار بيعمل [[model.set({ email: 'a@b.com', password: '12345678' })]]: الـ input اتملا لوحده، والفورم بقت valid.
- «سجّل» تاني: الـ action اشتغل.

---

## ٧. الـ solCode: حقل التأكيد

~~~ts
validate(p.confirm, ({ value, valueOf }) =>
  value() === valueOf(p.password) ? undefined : { kind: 'mismatch', message: 'مش زي كلمة السر' },
);
~~~

- [[validate(path, fn)]]: قاعدة بتاعتك. الدالة بتاخد context، وبنفك منه حاجتين:
  - [[value]]: signal بقيمة الحقل ده ([[confirm]]).
  - [[valueOf(p.password)]]: قيمة حقل تاني.
- لو متساويين [[undefined]] (مفيش خطأ)، غير كده object فيه [[kind]] و [[message]].

~~~text الناتج
confirm errors: [{"kind":"mismatch","message":"مش زي كلمة السر"}] valid: false
after fix: [] valid: true
~~~

---

## الخلاصة

| الحاجة | reactive forms | signal forms |
|---|---|---|
| البيانات | جوه الـ controls | signal بتاعتك |
| بناء الفورم | [[fb.group]] | [[form(model, schema)]] |
| الربط | [[formControlName]] | [[[formField]]] |
| الحالة | [[control.touched]] | [[f.email().touched()]] |
| الإرسال | [[(ngSubmit)]] + [[markAllAsTouched]] | [[submit(f, action)]] |`,
          lines: [
            "كل حاجة من الباكدج الجديدة.",
            "الـ decorator.",
            "الـ selector.",
            R`[[FormField]] هو الـ directive بتاع [[[formField]]].`,
            "بداية الـ template.",
            "input مربوط بحقل الإيميل في الاتجاهين.",
            R`كل حاجة signals: [[f.email()]] الـ state، و [[touched()]] و [[invalid()]].`,
            R`[[errors()]] array، وكل خطأ فيه [[kind]] و [[message]].`,
            "قفلة.",
            "حقل كلمة السر.",
            R`[[f()]] state الفورم كلها، و [[submitting()]] وهي بتتبعت.`,
            "قفلة الـ template.",
            "قفلة الـ decorator.",
            "الكلاس.",
            "البيانات نفسها: signal عادية.",
            R`[[form]] بيبني حقول بنفس شكل الـ model، والدالة هي الـ schema.`,
            "مطلوب ورسالته.",
            "شكل إيميل.",
            "طول أدنى.",
            "قفلة الـ schema.",
            "الإرسال.",
            R`[[submit]] بيعمل touched للكل، ولو valid ينادي الـ action.`,
            R`الـ [[model()]] فيه القيم الحالية.`,
            R`[[undefined]] = مفيش أخطاء من السيرفر.`,
            "قفلة.",
            "قفلة.",
            "قفلة."
          ],
          sol: R`[[{{ model() | json }}]] بيتحدّث مع كل حرف (محتاج [[JsonPipe]] في imports). و [[model.set(...)]] بيملا الـ inputs على طول. ده اتأكد في الـ lab: الفورم في الأول invalid وأخطاء الإيميل [[[{"kind":"required","message":"الإيميل مطلوب"}]]] (من غير email لأن الحقل فاضي). بعد [[value.set]] بقيم صح الفورم بقت valid والـ input نفسه عرض القيمة، ولما كتبنا [[bad]] في الـ input الـ [[model().email]] بقى [[bad]] والأخطاء [[['email']]].

حقل التأكيد:`,
          solCode: R`import { validate } from '@angular/forms/signals';
model = signal({ email: '', password: '', confirm: '' });
f = form(this.model, (p) => {
  required(p.email);
  minLength(p.password, 8);
  validate(p.confirm, ({ value, valueOf }) =>
    value() === valueOf(p.password) ? undefined : { kind: 'mismatch', message: 'مش زي كلمة السر' },
  );
});`
        }
      ]
    }
]);

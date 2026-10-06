// تكملة تاب ts: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/ts/01.js (شرح حقول الدرس في أوله)
MORE("ts", [
    {
      t: "الأنواع في React و Express و Prisma",
      l: 3,
      n: "props و events و state، و req.body اللي نوعه any، وأنواع القاعدة الجاهزة، ورد API من غير كذب",
      items: [
        {
          cmd: "props و ComponentProps",
          title: "تكتب أنواع props لكومبوننت React، وتلف عنصر HTML بكل خصايصه",
          desc: R`props الكومبوننت object عادي، فنوعها [[type Props = { ... }]] وبتعمله destructuring في الباراميتر. و [[children]] نوعها [[ReactNode]]: أي حاجة تتعرض (نص، أو JSX، أو null، أو ليستة).

ولو بتعمل كومبوننت بيلف عنصر HTML (زرار أو input)، [[ComponentProps<"button">]] بيدّيك كل خصايص الزرار الأصلية ([[onClick]] و [[disabled]] و [[type]] و aria)، وتضيف عليها بتاعتك.`,
          example: R`import type { ComponentProps, ReactNode } from "react";
type CardProps = { title: string; footer?: ReactNode; children: ReactNode };
export function Card({ title, footer, children }: CardProps) {
  return <section><h2>{title}</h2>{children}{footer}</section>;
}
type ButtonProps = ComponentProps<"button"> & { variant?: "primary" | "ghost" };
export function Button({ variant = "primary", className = "", ...rest }: ButtonProps) {
  return <button className={$__btbtn btn-$__{variant} $__{className}$__bt} {...rest} />;
}
export function Page() {
  return <Card title="الطلبات"><Button onClick={() => alert("تم")} disabled>احفظ</Button></Card>;
}`,
          try: R`امسح [[title]] من [[<Card>]] واقرا الخطأ. وبعدين جرّب [[<Button onClik={...}>]] بغلطة إملائية، و [[<Button variant="danger">]].`,
          flag: "script",
          deep: {
            why: "من غير أنواع للـ props، كل استخدام للكومبوننت محتاج تفتح الملف تشوف بياخد إيه. ومع الأنواع، المحرر بيكمّلك الـ props، و TS بيمسك prop ناقص أو متكتب غلط في كل الأماكن مرة واحدة لما تغيّر الكومبوننت.",
            how: R`الكومبوننت في React 19 دالة عادية بتاخد object واحد، فالنوع بيتكتب على الباراميتر: [[function Card(props: CardProps)]] أو بالـ destructuring. و [[React.FC]] كان منتشر زمان، بس مش محتاجه، والدالة العادية أوضح.

[[ReactNode]] أوسع نوع للمحتوى: string و number و JSX و null و undefined و boolean و arrays منهم. و [[ReactElement]] أضيق: JSX بس. للـ children غالبًا ReactNode.

[[ComponentProps<"button">]] بيطلّع نوع props العنصر من تعريفات React ([[@types/react]]). ومع React 19، [[ref]] بقى prop عادي، فالنوع ده فيه [[ref]] كمان، وتقدر تمرّره من غير [[forwardRef]]. ولكومبوننت تاني: [[ComponentProps<typeof Card>]] بيطلّع props بتاعته.

و [[&]] بتدمج النوعين. ولو عايز تغيّر نوع prop موجود (مثلًا [[type]])، استخدم [[Omit<ComponentProps<"button">, "type">]] الأول، لأن [[&]] مع تعارض بيطلّع never.`,
            when: "كل كومبوننت. و [[ComponentProps]] لأي كومبوننت بيلف عنصر HTML (Button و Input و Link) أو بيمد كومبوننت تاني. والتفاصيل في تاب «React».",
            mistakes: R`[[children: JSX.Element]] فالنص العادي أو null يترفض. و [[props: any]]. وتعرّف [[onClick]] و [[disabled]] و [[type]] بإيدك بدل ComponentProps، فتنسى [[aria-label]] وتلاقي نفسك بتضيف prop كل أسبوع. وتوزّع [[...rest]] قبل props بتاعتك فتتعمل override.`
          },
          teach: R`## الفكرة في سطرين

كومبوننت React دالة بتاخد object واحد (الـ props)، فنوعها بيتكتب على الباراميتر زي أي دالة. والمثال فيه كومبوننتين: [[Card]] بأنواع مكتوبة بإيدك، و [[Button]] بياخد كل خصايص [[<button>]] الأصلية من React نفسه.

اتجرّب على ويندوز 11 بـ Node 24 و React 19.3 و [[@types/react]] 19.3، في ملف [[app.tsx]] و tsconfig فيه [["jsx": "react-jsx"]]. الأخطاء من TypeScript 6.0.3 و 7.0.2، والـ HTML الناتج من [[renderToStaticMarkup]] (دالة في [[react-dom/server]] بترسم الكومبوننت لنص HTML) بـ [[npx tsx]].

---

## ١. الـ import

~~~text app.tsx
import type { ComponentProps, ReactNode } from "react";
~~~

- [[import type]]: الاتنين أنواع بس، فالسطر كله بيتمسح من الـ JS.
- [[.tsx]]: امتداد ملف TS فيه JSX (الـ HTML اللي جوه الكود). من غيره TS مش هيفهم [[<section>]].

---

## ٢. أنواع الـ Card

~~~text app.tsx
type CardProps = { title: string; footer?: ReactNode; children: ReactNode };
~~~

- [[title: string]]: إجباري.
- [[footer?: ReactNode]]: [[?]] = اختياري. و [[ReactNode]] = «أي حاجة React يقدر يعرضها»: نص، رقم، JSX، [[null]]، أو ليستة منهم.
- [[children]]: اسم خاص في React: اللي بتكتبه **بين** فتحة الكومبوننت وقفلته بيوصل هنا.

---

## ٣. الـ Card نفسه

~~~text app.tsx
export function Card({ title, footer, children }: CardProps) {
  return <section><h2>{title}</h2>{children}{footer}</section>;
}
~~~

- [[{ title, footer, children }: CardProps]]: destructuring: بنفك الـ object لمتغيرات، والنوع للـ object كله بعد [[:]].
- [[{title}]] جوه JSX: الأقواس المعقوفة معناها «حط قيمة JS هنا».

رسمناه بـ [[<Card title="t" footer={<small>f</small>}>نص</Card>]]:

~~~text الناتج: renderToStaticMarkup
<section><h2>t</h2>نص<small>f</small></section>
~~~

---

## ٤. نوع الـ Button: [[ComponentProps]] و [[&]]

~~~text app.tsx
type ButtonProps = ComponentProps<"button"> & { variant?: "primary" | "ghost" };
~~~

من جوه لبرّه:

1. [[ComponentProps<"button">]]: نوع من React بيطلّع **كل** الـ props اللي [[<button>]] العادي بياخدها: [[onClick]] و [[disabled]] و [[type]] و [[className]] و [[aria-label]]... كلهم من غير ما تكتبهم.
2. [[{ variant?: "primary" | "ghost" }]]: prop بتاعنا: اختياري، وقيمته واحدة من الكلمتين بس.
3. [[&]] (intersection): النوع لازم يبقى فيه الاتنين مع بعض.

---

## ٥. الـ Button نفسه

~~~text app.tsx
export function Button({ variant = "primary", className = "", ...rest }: ButtonProps) {
  return <button className={$__btbtn btn-$__{variant} $__{className}$__bt} {...rest} />;
}
~~~

- [[variant = "primary"]]: default جوه الـ destructuring: لو مبعتهوش يبقى primary.
- [[className = ""]]: نفس الفكرة، عشان منكتبش [[undefined]] في النص.
- [[...rest]]: «الباقي». كل props تانية (onClick و disabled و type...) بتتجمع في object اسمه [[rest]].
- [[$__btbtn btn-$__{variant} $__{className}$__bt]]: template string: [[$__{...}]] بتحط قيمة جوه النص.
- [[{...rest}]] على [[<button>]]: spread: وزّع كل اللي في [[rest]] كـ props على الزرار الحقيقي.
- [[/>]]: الزرار مقفول على نفسه، و [[children]] (لو اتبعتت) جوه [[rest]] فبتتوزّع برضه.

رسمنا [[<Button variant="ghost" className="wide" type="submit" aria-label="save">x</Button>]]:

~~~text الناتج
<button class="btn btn-ghost wide" type="submit" aria-label="save">x</button>
~~~

[[type]] و [[aria-label]] معرّفناهمش في أي حتة، و TS قبلهم و React وصّلهم للزرار.

---

## ٦. الاستخدام

~~~text app.tsx
export function Page() {
  return <Card title="الطلبات"><Button onClick={() => alert("تم")} disabled>احفظ</Button></Card>;
}
~~~

~~~text الناتج
<section><h2>الطلبات</h2><button class="btn btn-primary " disabled="">احفظ</button></section>
~~~

- [[variant]] مش مبعوت، فبقى [[btn-primary]]، والمسافة اللي في الآخر هي [[className]] الفاضي.
- [[disabled]] لوحدها = [[disabled={true}]].
- [[onClick]] مش بيظهر في HTML ثابت، بس اتوصّل للزرار.

---

## ٧. الأخطاء اللي الأنواع بتمسكها

~~~text bad.tsx
<Card><Button>x</Button></Card>
<Button onClik={() => {}}>x</Button>
<Button variant="danger">x</Button>
~~~

~~~text الناتج: npx tsc (TS 6.0.3)
error TS2741: Property 'title' is missing in type '{ children: Element; }' but required in type 'CardProps'.
error TS2322: Type '{ children: string; onClik: () => void; }' is not assignable to type 'IntrinsicAttributes & ClassAttributes<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement> & { ...; }'.
  Property 'onClik' does not exist on type '...'. Did you mean 'onClick'?
error TS2322: Type '"danger"' is not assignable to type '"primary" | "ghost" | undefined'.
~~~

1. [[title]] ناقص: TS2741.
2. [[onClik]] غلطة إملائية: TS عرف إن [[onClick]] هو المقصود، لأن [[ComponentProps<"button">]] جايب كل الأسماء الحقيقية ([[ButtonHTMLAttributes]] اللي في الرسالة).
3. [["danger"]] مش من الكلمتين.

TS 7.0.2 طلّع نفس الأخطاء بنفس الأكواد، والفرق إنه كتب [["ghost" | "primary" | undefined]] و [[{ onClik: ...; children: string; }]] بترتيب تاني.

---

## الخلاصة

| الحاجة | النوع |
|---|---|
| props عادية | [[type Props = {...}]] على الباراميتر |
| محتوى يتعرض ([[children]] و slots) | [[ReactNode]] |
| كومبوننت بيلف عنصر HTML | [[ComponentProps<"button"> & {...}]] و [[...rest]] |
| props كومبوننت تاني | [[ComponentProps<typeof Card>]] |`,
          lines: [
            R`[[import type]]: أنواع بس، وبتتمسح من الـ JS.`,
            "props الكارت: عنوان، و footer اختياري، و children.",
            "destructuring في الباراميتر مع النوع.",
            R`[[ReactNode]] يتعرض في أي مكان في JSX.`,
            "قفلة.",
            R`كل خصايص [[<button>]] الأصلية، وفوقها [[variant]].`,
            R`خد اللي يخصك، والباقي في [[rest]].`,
            "ووزّع الباقي على الزرار الحقيقي: onClick و disabled و type وغيرهم شغالين من غير ما تعرّفهم.",
            "قفلة.",
            "استخدام.",
            R`[[title]] إجباري، والزرار بياخد [[onClick]] و [[disabled]] زي [[<button>]] العادي.`,
            "قفلة."
          ],
          sol: R`من غير [[title]]: Property 'title' is missing in type '{ children: Element; }' but required in type 'CardProps' (TS2741).

و [[onClik]]: Property 'onClik' does not exist on type 'IntrinsicAttributes & ... ButtonHTMLAttributes<HTMLButtonElement> & ...'. Did you mean 'onClick'?، يعني [[ComponentProps<"button">]] جايب كل خصايص الزرار الحقيقية ومسك الغلطة. و [[variant="danger"]]: Type '"danger"' is not assignable to type '"ghost" | "primary" | undefined'.`
        },
        {
          cmd: "useState و events",
          title: "أنواع الـ state وأحداث الفورم والـ input في React",
          desc: R`[[useState(0)]] بيستنتج number لوحده. محتاج تكتب النوع بس لما القيمة الأولية مش بتوصف كل الاحتمالات: [[useState<User | null>(null)]] و [[useState<string[]>([])]].

والـ events ليها أنواع من React: [[React.ChangeEvent<HTMLInputElement>]] للـ input، و [[React.SubmitEvent<HTMLFormElement>]] للفورم، و [[React.MouseEvent<HTMLButtonElement>]] للزرار. ولو الـ handler مكتوب inline في JSX، النوع بيتستنتج لوحده.`,
          example: R`import { useState } from "react";
type User = { id: string; name: string };
type Status = "idle" | "saving" | "error";
export function ProfileForm() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value);
  const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("saving");
    setUser({ id: "1", name });
  };
  return <form onSubmit={onSubmit}><input value={name} onChange={onChange} />{user?.name} {status}</form>;
}`,
          try: R`شيل [[<User | null>]] من السطر الخامس وشوف [[setUser({...})]] بيطلّع إيه (النوع بقى null بس). وبعدين اكتب الـ onChange inline في JSX من غير نوع ولاحظ إن [[e]] اتعرف لوحده.`,
          flag: "script",
          deep: {
            why: "أغلب أخطاء React اليومية: state بيبدأ null وحد يقرا [[user.name]] قبل ما يتحمّل، أو [[e.target.value]] في event مش معروف نوعه، أو status متكتب غلط. الأنواع هنا بتمسك الـ bugs دي قبل ما تفتح المتصفح.",
            how: R`[[useState<T>]] generic: من غير ما تحدد، T بيتستنتج من القيمة الأولية. [[useState(null)]] لوحدها T بقى [[null]] وبس، فمش هتقدر تحط User بعدين، وعشان كده [[<User | null>]]. و [[useState([])]] بيطلّع [[never[]]]، فلازم [[<Item[]>]]. و [[useState("idle")]] بيطلّع string، فأي كلمة تعدّي.

وللحالات المترابطة (loading و data و error)، discriminated union في state واحدة أنضف من ٣ states منفصلين: [[useState<FetchState>({ status: "idle" })]]، و react.dev نفسه بيقترح الشكل ده.

الـ events في React synthetic: [[currentTarget]] نوعه T بالظبط (العنصر اللي عليه الـ handler). و [[target]] في أغلب الـ events نوعه [[EventTarget]] بس، لأن الـ event ممكن يكون جاي من عنصر جوه. و [[ChangeEvent]] استثناء في @types/react: [[target]] فيه متعرّف [[EventTarget & T]] زي currentTarget بالظبط. عشان كده [[e.currentTarget.value]] هي العادة الأأمن في كل الـ events.

وفي @types/react 19.2.10 وأحدث، [[FormEvent]] بقى deprecated (الاسم كان مضلل)، والبديل [[SubmitEvent]] للـ submit، و [[ChangeEvent]] أو [[InputEvent]] للتغيير. الكود القديم لسه شغال، بس المحرر هيشطب عليه. ولو نسختك أقدم من 19.2.10، [[SubmitEvent]] مش هتلاقيه، فحدّث @types/react.

وأسهل طريقة تعرف نوع أي event: اكتب الـ handler inline ([[onChange={(e) => ...}]]) وحط الماوس على [[e]].`,
            when: "[[useState<T>]] لما القيمة الأولية null أو [] أو union. وأنواع الـ events لما الـ handler دالة منفصلة. والتفاصيل الكاملة للـ hooks في تاب «React».",
            mistakes: R`[[useState<any[]>([])]]: في مشروع حقيقي كانت متكررة، وبتقفل الفحص على الليستة كلها. و [[useState<number>(0)]]: زيادة. و [[(e: any) => ...]] للـ events. و [[e.target.value]] على select أو checkbox وتستغرب النوع.`
          },
          teach: R`## الفكرة في سطرين

[[useState]] generic: نوع الـ state بيتستنتج من القيمة الأولية، ومحتاج تكتبه بإيدك بس لما القيمة دي مش بتوصف كل الاحتمالات. والـ handlers اللي متكتبة في متغير لوحدها محتاجة نوع الـ event.

اتجرّب على ويندوز 11 بـ Node 24 و React 19.3 و [[@types/react]] 19.3 (tsconfig فيه [["jsx": "react-jsx"]]). الأنواع من TypeScript 6.0.3 و 7.0.2: كل نوع تحت طلّعناه بإننا حطينا القيمة في متغير [[boolean]] بالعمد، و TS كتب نوعها في رسالة الخطأ.

---

## ١. الأنواع

~~~text app.tsx
import { useState } from "react";
type User = { id: string; name: string };
type Status = "idle" | "saving" | "error";
~~~

- [[import { useState }]]: import عادي (مش [[type]]) لأن [[useState]] دالة حقيقية.
- [[Status]]: union من ٣ كلمات. الـ state هيبقى واحدة منهم بس.

---

## ٢. التلات states

~~~text app.tsx
const [user, setUser] = useState<User | null>(null);
const [name, setName] = useState("");
const [status, setStatus] = useState<Status>("idle");
~~~

[[useState]] بترجّع ليستة من اتنين: القيمة، ودالة تغيّرها. و [[const [a, b] =]] destructuring بيفكهم.

| السطر | نوع القيمة | ليه |
|---|---|---|
| [[useState<User | null>(null)]] | [[{ id: string; name: string; } | null]] | [[<...>]] بتحدد النوع بنفسك: هيبدأ null وبعدين User |
| [[useState("")]] | [[string]] | TS استنتجه من [[""]]، مش محتاج تكتب |
| [[useState<Status>("idle")]] | [[Status]] | من غيره كان هيبقى [[string]] |

ونوع [[setStatus]]:

~~~text الناتج
Dispatch<SetStateAction<Status>>
~~~

يعني دالة بتاخد [[Status]] أو دالة بترجّع [[Status]]. فلو كتبت [[setStatus("saved")]]:

~~~text الناتج: npx tsc
error TS2345: Argument of type '"saved"' is not assignable to parameter of type 'SetStateAction<Status>'.
~~~

---

## ٣. ليه [[<User | null>]] لازمة

جرّبنا [[useState(null)]] من غير نوع:

~~~text bad.tsx
const [user, setUser] = useState(null);
setUser({ id: "1", name });
...{user?.name}
~~~

~~~text الناتج (TS 6 و 7)
bad.tsx(5,13): error TS2353: Object literal may only specify known properties, and 'id' does not exist in type '(prevState: null) => null'.
bad.tsx(7,36): error TS2339: Property 'name' does not exist on type 'never'.
~~~

النوع اتستنتج [[null]] وبس، فمفيش أي قيمة تانية تتحط. وبعد [[?.]] (اللي بتشيل null) مفضلش حاجة، فبقى [[never]]. ونفس الحكاية مع [[useState([])]]: نوعها [[never[]]]، ليستة مينفعش يتحط فيها حاجة، فاكتب [[useState<Item[]>([])]].

---

## ٤. الـ input handler

~~~text app.tsx
const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value);
~~~

- [[React.ChangeEvent<...>]]: نوع event التغيير من React. [[React.]] بتشتغل من غير ما تعمل import لـ React لأن [[@types/react]] معرّف namespace عام اسمه [[React]] للأنواع.
- [[<HTMLInputElement>]]: الـ event جاي من [[<input>]]. ده نوع من المتصفح (lib DOM).
- [[e.currentTarget]]: العنصر اللي عليه الـ handler، ونوعه [[HTMLInputElement]] بالظبط، فـ [[.value]] نوعها [[string]].
- [[setName(...)]]: [[name]] نوعها string، فماشي.

---

## ٥. الـ submit handler

~~~text app.tsx
const onSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
  e.preventDefault();
  setStatus("saving");
  setUser({ id: "1", name });
};
~~~

- [[React.SubmitEvent<HTMLFormElement>]]: event الـ submit بتاع [[<form>]]. موجود في [[@types/react]] من 19.2.10، وجوه الملف لقينا [[FormEvent]] القديم عليه [[@deprecated FormEvent doesn't actually exist.]]. [[tsc]] نفسه مش بيطلّع خطأ على deprecated، المحرر بس بيشطب عليه.
- [[e.preventDefault()]]: امنع المتصفح يعمل reload للصفحة (السلوك الافتراضي للفورم).
- [[setStatus("saving")]]: لازم واحدة من Status.
- [[setUser({ id: "1", name })]]: لازم شكل User كامل. [[name]] هنا اختصار لـ [[name: name]].

---

## ٦. الـ JSX

~~~text app.tsx
return <form onSubmit={onSubmit}><input value={name} onChange={onChange} />{user?.name} {status}</form>;
~~~

- [[onSubmit={onSubmit}]] و [[onChange={onChange}]]: TS بيتأكد إن نوع الـ handler ماشي مع الـ prop.
- [[user?.name]]: [[?.]] (optional chaining): لو [[user]] null رجّع undefined بدل ما تقع. ومن غيرها TS كان هيقولك [[error TS18047: 'user' is possibly 'null'.]] (جرّبناها).

رسمناه بـ [[renderToStaticMarkup]] من [[react-dom/server]]:

~~~text الناتج: npx tsx
<form><input value=""/> idle</form>
~~~

[[user]] لسه null فمفيش اسم، و [[status]] لسه idle.

---

## ٧. الـ handler الـ inline بياخد نوعه لوحده

~~~text probe.tsx
<input onChange={(ev) => { ... }} />
~~~

من غير ما نكتب نوع لـ [[ev]]:

~~~text الناتج
ChangeEvent<HTMLInputElement, HTMLInputElement>
~~~

TS جاب النوع من الـ prop [[onChange]] نفسها. عشان كده أسهل طريقة تعرف نوع أي event: اكتبه inline وحط الماوس عليه. (الـ argument التاني هو نوع [[target]]، وفي ChangeEvent هو نفس العنصر.)

---

## الخلاصة

| الموقف | اكتب |
|---|---|
| قيمة أولية بتوصف النوع كله ([[""]] و [[0]]) | ولا حاجة |
| بيبدأ [[null]] | [[useState<User | null>(null)]] |
| ليستة فاضية | [[useState<Item[]>([])]] |
| كلمات محددة | [[useState<Status>("idle")]] |
| handler في متغير | [[React.ChangeEvent<HTMLInputElement>]] و [[React.SubmitEvent<HTMLFormElement>]] |
| handler inline | ولا حاجة |

نفس النتايج بالظبط في TS 6.0.3 و 7.0.2.`,
          lines: [
            "الـ hook.",
            "نوع المستخدم.",
            "حالات محددة.",
            "الكومبوننت.",
            "بيبدأ null، فلازم تقول إنه ممكن يبقى User بعدين.",
            R`[[""]] كفاية: TS استنتج string.`,
            "من غير النوع، TS هيستنتج string وأي كلمة هتعدّي.",
            R`نوع الـ event للـ input: [[currentTarget.value]] نوعها string.`,
            R`submit الفورم. في @types/react 19.2.10+ اسمه [[SubmitEvent]]، و [[FormEvent]] القديم deprecated.`,
            "امنع الـ reload.",
            "لازم قيمة من Status.",
            "لازم شكل User كامل.",
            "قفلة الـ handler.",
            R`[[user?.name]] لأن user ممكن يبقى null.`,
            "قفلة."
          ],
          sol: R`من غير [[<User | null>]]، [[useState(null)]] نوعه [[null]] بس. فـ [[setUser({ id: "1", name })]] بتطلّع Object literal may only specify known properties, and 'id' does not exist in type '(prevState: null) => null'، و [[user?.name]] في الـ JSX بتطلّع Property 'name' does not exist on type 'never'.

ولما تكتب [[onChange={(e) => setName(e.currentTarget.value)}]] جوه الـ JSX، حط الماوس على [[e]] هتلاقيه [[ChangeEvent<HTMLInputElement, HTMLInputElement>]] لوحده. الـ handler المكتوب inline بياخد نوعه من الـ prop، والمفصول في متغير لازم تكتبله النوع.`
        },
        {
          cmd: "Express + Zod",
          title: "req.body نوعه any: تتحقق منه وتاخد نوع حقيقي",
          desc: R`في Express، [[req.body]] نوعه [[any]] وقيمته أي حاجة العميل بعتها. الحل: middleware بياخد schema من Zod، يعمل [[safeParse]] على الـ body، ولو فشل يرجّع 400، ولو نجح يحط الداتا المفحوصة مكان الـ body.

والـ handler نفسه بتكتب نوع الـ body فيه بـ [[Request<Params, ResBody, ReqBody>]]. وتفاصيل Express نفسه في تاب «Backend بـ Node».`,
          example: R`import express, { type Request, type Response, type NextFunction } from "express";
import * as z from "zod";
const CreateOrder = z.object({ productId: z.string().min(1), qty: z.number().int().min(1).max(10) });
type CreateOrder = z.infer<typeof CreateOrder>;
const validate = (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
  const r = schema.safeParse(req.body);
  if (!r.success) return res.status(400).json({ errors: z.flattenError(r.error).fieldErrors });
  req.body = r.data;
  next();
};
const app = express();
app.use(express.json());
app.post("/orders", validate(CreateOrder), (req: Request<{}, {}, CreateOrder>, res: Response) => {
  res.status(201).json({ productId: req.body.productId, qty: req.body.qty });
});`,
          try: R`ابعت [[curl -X POST localhost:3000/orders -H "Content-Type: application/json" -d '{"productId":"p1","qty":50}']] وشوف الـ 400. وبعدين شيل [[validate(CreateOrder)]] من الـ route ولاحظ إن TS مش هيعترض، وده بالظبط ليه النوع لوحده مش حماية.`,
          flag: "script",
          deep: {
            why: R`[[req.body]] أخطر مكان في أي API: أي حد يقدر يبعت أي حاجة. وفي مشروع حقيقي كان فيه [[const { month, year } = req.body as { month: number; year: number }]]: النوع بيقول number، والعميل بعت [["5"]] أو ماباعتش حاجة، والكود كمّل وحسب غلط أو كتب في القاعدة قيمة بايظة. و [[(req.body as any)[field]]] في مكان تاني أسوأ.`,
            how: R`[[@types/express]] بيعرّف [[Request<P, ResBody, ReqBody, ReqQuery>]]، و [[ReqBody]] افتراضيًا [[any]]. وتقدر تكتب [[Request<{}, {}, CreateOrder>]] عشان تاخد autocomplete جوه الـ handler، بس ده annotation مش فحص: TS مش هيعرف إن فيه middleware فحصت قبله. عشان كده ترتيب الـ route مهم، والـ validate لازم يبقى قبل الـ handler.

بديل أبسط ومن غير ثقة في الترتيب: جوه الـ handler نفسه [[const data = CreateOrder.parse(req.body)]]، ومعاه error middleware بيحوّل ZodError لـ 400. وفي Express 5، أي خطأ بيترمي جوه handler async بيروح للـ error middleware لوحده.

والـ query و params strings دايمًا ([[?page=2]] بتيجي [["2"]])، فاستخدم [[z.coerce.number()]] ليهم. و [[req.query]] في Express 5 getter، فمتقدرش تعمل [[req.query = ...]]: خزّن الناتج في متغير أو في [[res.locals]].

والأنواع المشتركة بين الـ front والـ back (زي [[CreateOrder]]) مكانها باكدج shared في monorepo، فالـ form في React والـ route في Express بيستخدموا نفس الـ schema.`,
            when: "كل route فيه body أو query أو params من المستخدم، من غير استثناء. وكمان webhooks جاية من خدمات خارجية.",
            mistakes: R`[[req.body as Type]]: فحص بالكلام. وتنسى [[express.json()]] فالـ body يبقى undefined وتفتكر الـ validation هي اللي غلط. وترجع [[r.error]] كله للعميل. و [[z.number()]] على query param فيفشل دايمًا لأنه string.`
          },
          teach: R`## الفكرة في سطرين

[[req.body]] في Express نوعه [[any]] وفيه أي حاجة العميل بعتها. المثال بيعمل middleware بياخد أي schema من Zod ويفحص الـ body قبل ما يوصل للـ handler: لو غلط يرجّع 400، ولو سليم يحط الداتا النضيفة مكانه.

اتجرّب على ويندوز 11 بـ Node 24 و Express 5.2.1 و [[@types/express]] 5.0.6 و Zod 4.6.5: السيرفر اشتغل بـ [[npx tsx app.ts]] على بورت جانبي، والطلبات بـ [[curl]]. والأنواع من TypeScript 6.0.3 و 7.0.2 (الاتنين عدّوا الملف من غير أخطاء).

---

## ١. الـ imports

~~~text app.ts
import express, { type Request, type Response, type NextFunction } from "express";
import * as z from "zod";
~~~

- [[express]] (من غير أقواس): الـ default export، الدالة اللي بتعمل التطبيق.
- [[{ type Request, ... }]]: [[type]] جوه الأقواس قبل كل اسم معناها «ده نوع بس»، فبيتمسح من الـ JS. ده المطلوب مع [[verbatimModuleSyntax]].
- [[Request]] و [[Response]]: أنواع الطلب والرد. و [[NextFunction]]: نوع [[next]] اللي بتعدّي للـ middleware اللي بعدك.

---

## ٢. الـ schema والنوع بنفس الاسم

~~~text app.ts
const CreateOrder = z.object({ productId: z.string().min(1), qty: z.number().int().min(1).max(10) });
type CreateOrder = z.infer<typeof CreateOrder>;
~~~

- [[productId]]: نص مش فاضي. [[qty]]: رقم صحيح من 1 لـ 10.
- السطر التاني نوع اسمه [[CreateOrder]] برضه. ده مسموح في TS: القيم والأنواع في مكانين منفصلين، فـ [[CreateOrder]] في مكان قيمة يعني الـ schema، وفي مكان نوع يعني [[{ productId: string; qty: number }]].

---

## ٣. الـ middleware: دالة بترجّع دالة

~~~text app.ts
const validate = (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
~~~

فيه سهمين [[=>]]:

1. [[validate(schema)]]: بتاخد schema...
2. ...وبترجّع دالة [[(req, res, next) => {...}]]، ودي شكل أي middleware في Express.

كده [[validate(CreateOrder)]] بيطلّع middleware جاهز للـ schema دي، وتقدر تعمل [[validate(OtherSchema)]] لأي route تاني. و [[z.ZodType]] = «أي schema من Zod».

---

## ٤. جسم الـ middleware

~~~text app.ts
  const r = schema.safeParse(req.body);
  if (!r.success) return res.status(400).json({ errors: z.flattenError(r.error).fieldErrors });
  req.body = r.data;
  next();
};
~~~

- [[schema.safeParse(req.body)]]: افحص من غير ما ترمي (درس safeParse).
- [[res.status(400)]]: 400 = Bad Request، «الطلب نفسه غلط». و [[.json({...})]] بيبعت الرد JSON.
- [[return]]: عشان منكمّلش للـ [[next()]]. من غيره كان هيحاول يكمّل والرد اتبعت خلاص.
- [[req.body = r.data]]: حط النسخة المفحوصة. دي من غير المفاتيح الزيادة.
- [[next()]]: كمّل للي بعدك، يعني الـ handler.

---

## ٥. التطبيق والـ route

~~~text app.ts
const app = express();
app.use(express.json());
app.post("/orders", validate(CreateOrder), (req: Request<{}, {}, CreateOrder>, res: Response) => {
  res.status(201).json({ productId: req.body.productId, qty: req.body.qty });
});
~~~

- [[express.json()]]: middleware بيقرا الـ body لو الـ header [[Content-Type: application/json]] ويحوّله object. من غيره [[req.body]] بيبقى [[undefined]].
- [[app.post("/orders", A, B)]]: طلبات POST على المسار ده تعدّي على A الأول وبعدين B، بالترتيب.
- [[Request<{}, {}, CreateOrder>]]: [[Request]] generic بـ ٣ أنواع بالترتيب: params ([[{}]] = مفيش)، ونوع الرد، ونوع الـ body. فـ [[req.body.qty]] بقت [[number]] في المحرر.
- [[201]]: Created، «اتعمل حاجة جديدة».

---

## ٦. التشغيل

~~~text curl
curl -X POST localhost:3917/orders -H "Content-Type: application/json" -d '{"productId":"p1","qty":50}'
~~~

- [[-X POST]]: نوع الطلب. [[-H]]: header. [[-d]]: الـ body.

| الـ body اللي اتبعت | الرد | الـ status |
|---|---|---|
| [[{"productId":"p1","qty":50}]] | [[{"errors":{"qty":["Too big: expected number to be <=10"]}}]] | 400 |
| [[{"productId":"p1","qty":2}]] | [[{"productId":"p1","qty":2}]] | 201 |
| [[{"qty":"lots"}]] | [[{"errors":{"productId":["Invalid input: expected string, received undefined"],"qty":["Invalid input: expected number, received string"]}}]] | 400 |
| [[{"productId":"p1","qty":2,"admin":true}]] | [[{"productId":"p1","qty":2}]] | 201 |

الأخير مهم: [[admin]] اتشالت قبل ما توصل للـ handler.

وبعتنا [[x]] من غير header الـ JSON: [[express.json()]] متدخلش، [[req.body]] فضل [[undefined]]، فالرد [[{"errors":{}}]] بـ 400. الفحص رفضه، بس [[fieldErrors]] فاضية لأن المشكلة في الـ body كله مش في حقل (دي بتروح في [[formErrors]]).

---

## ٧. النوع لوحده مش حماية

عملنا route تاني [[/raw]] بنفس الـ handler ونفس [[Request<{}, {}, CreateOrder>]] بس **من غير** [[validate]]. [[tsc]] عدّاه من غير ولا خطأ، و:

~~~text الناتج: curl -X POST localhost:3917/raw ... -d '{"qty":"lots"}'
{"qty":"lots"}  [201]
~~~

الـ handler فاكر إن [[qty]] رقم، وهي [["lots"]]، و [[productId]] مش موجودة أصلًا. [[Request<{}, {}, CreateOrder>]] وعد للمحرر، والـ schema هي اللي بتفحص فعلًا.

---

## الخلاصة

- [[req.body]] نوعه [[any]]: افحصه بـ schema قبل أي استخدام.
- [[validate(schema)]] دالة بترجّع middleware، وتتحط في الـ route **قبل** الـ handler.
- [[Request<Params, ResBody, ReqBody>]] بيدّيك autocomplete بس، مش فحص.
- [[express.json()]] لازم، وإلا الـ body يبقى [[undefined]].`,
          lines: [
            R`Express وأنواعه. و [[type]] جوه الـ import للأنواع بس.`,
            "Zod.",
            "schema للطلب: منتج وكمية من ١ لـ ١٠.",
            "النوع من الـ schema بنفس الاسم (مسموح: واحد قيمة وواحد نوع).",
            "middleware عام: بياخد أي schema ويرجّع handler.",
            "فحص الـ body من غير throw.",
            "فشل: 400 بأخطاء كل حقل، ومتكمّلش.",
            "نجاح: حط الداتا المفحوصة (من غير مفاتيح زيادة) مكان الـ body.",
            "كمّل للـ handler.",
            "قفلة.",
            "التطبيق.",
            R`من غيرها [[req.body]] بيبقى undefined في Express 5.`,
            R`الـ route: الـ validation الأول، وبعدين handler نوع الـ body فيه [[CreateOrder]] (التالت في [[Request<Params, ResBody, ReqBody>]]).`,
            R`[[req.body.qty]] نوعها number ومفحوصة فعلًا.`,
            "قفلة."
          ],
          sol: R`الـ curl بيرجّع [[400]] والـ body: [[{"errors":{"qty":["Too big: expected number to be <=10"]}}]]. ومع [["qty":2]] بيرجّع [[201]] و [[{"productId":"p1","qty":2}]].

بعد ما تشيل [[validate(CreateOrder)]]، [[npx tsc --noEmit]] مش بيطلّع ولا خطأ، والـ handler لسه شايف [[req.body.qty]] على إنه number. بس الـ request نفسه بيرجع [[201]] وفيه [["qty":50]]، وحتى [[{"qty":"lots"}]] من غير productId بيعدّي. [[Request<{}, {}, CreateOrder>]] وعد بس، والـ schema هي اللي بتفحص فعلًا.`
        },
        {
          cmd: "declare global",
          title: "تضيف req.user على نوع Request بتاع Express في كل المشروع",
          desc: R`middleware الـ auth بيحط [[req.user]]، بس TS ميعرفش إن [[Request]] فيه user. بدل ما تعمل [[interface AuthRequest extends Request]] وتستخدمه في كل handler، تقدر تضيف الخاصية على نوع Express نفسه مرة واحدة: ده اسمه module augmentation.

وده شغال بسبب declaration merging في الـ interfaces (درس type و interface في المستوى ١).`,
          example: R`// src/types/express.d.ts
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: "admin" | "user" };
    }
  }
}
export {};
// أي handler في المشروع:
app.get("/me", (req, res) => {
  if (!req.user) return res.status(401).json({ error: "سجّل دخول" });
  res.json({ id: req.user.id, role: req.user.role });
});`,
          try: R`امسح سطر [[export {}]] وشغّل [[npx tsc --noEmit]] واقرا الخطأ. وبعدين اتأكد إن الملف جوه [[include]] في tsconfig، لأن لو برّه TS مش هيشوف الإضافة.`,
          flag: "script",
          deep: {
            why: R`في مشروع حقيقي كان فيه [[interface AuthRequest extends Request { user?: AuthenticatedUser }]] وكل handler مكتوب [[(req: AuthRequest, res: Response)]]. ده شغال، بس كل route لازم يفتكر يستخدم AuthRequest، ولما تمرر الـ handler لـ [[router.get]] ساعات الأنواع مبتركبش. الإضافة على النوع الأصلي بتحل ده مرة واحدة.`,
            how: R`module augmentation: بتفتح نوع معرّف في مكتبة وتضيف عليه. بيشتغل مع [[interface]] بس (مش [[type]])، لأن الـ interfaces اللي بنفس الاسم في نفس الـ scope بتتدمج.

و [[@types/express]] (من خلال [[@types/express-serve-static-core]] اللي بيتسطب معاه) معرّف [[namespace Express { interface Request {} }]] في الـ global scope مخصوص عشان تعمل كده، والـ Request اللي بتستخدمه بيورث منه. فـ [[declare global { namespace Express { ... } }]] بيضيف على الأصل.

وللمكتبات اللي أنواعها جوه module مش global، بتستخدم [[declare module "lib-name" { interface X { ... } }]] في ملف فيه import أو export. وزيها إضافة خاصية على [[Window]]: [[declare global { interface Window { dataLayer?: unknown[] } }]].

الملف لازم يبقى module (فيه [[export {}]] أو أي import)، ولازم يبقى جوه [[include]]. و tsx مبيفحصش أنواع أصلًا، فالإضافة دي بتبان في المحرر و [[tsc --noEmit]] بس.

وخلي بالك: ده بيقول إن [[user]] موجود في كل request في المشروع كله، حتى اللي مفيهوش auth middleware. عشان كده خليه اختياري ([[?]]) وافحصه.`,
            when: "[[req.user]] و [[req.requestId]] في Express، وخصايص على [[window]] من scripts خارجية (analytics)، وإضافة session أو user على أنواع مكتبات auth.",
            mistakes: R`[[user: AuthUser]] من غير [[?]]، فـ TS يفتكره موجود في routes مفيهاش auth. وتنسى [[export {}]]. والملف برّه [[include]] فمفيش أثر. و [[(req as any).user]] في كل حتة بدل الإضافة دي.`
          },
          teach: R`## الفكرة في سطرين

ملف [[.d.ts]] صغير بيفتح نوع [[Request]] بتاع Express ويضيف عليه [[user]]. بعدها أي handler في المشروع يقدر يقرا [[req.user]] بنوعه، من غير ما تكتب نوع مخصوص في كل route.

اتجرّب على ويندوز 11 بـ Node 24 و Express 5.2.1 و [[@types/express]] 5.0.6: الأنواع بـ [[npx tsc -p . --noEmit]] من TypeScript 6.0.3 و 7.0.2، والسيرفر بـ [[npx tsx]] والطلبات بـ [[curl]]. المشروع فيه [[src/types/express.d.ts]] (المثال) و [[src/app.ts]]، والـ tsconfig فيه [["include": ["src"]]].

---

## ١. [[.d.ts]] يعني إيه

[[d]] = declaration. ملف فيه أنواع بس ومفيهوش كود بيتشغّل. TS بيقراه وقت الفحص، ومبيطلّعش منه JS خالص.

---

## ٢. [[declare global]]

~~~text src/types/express.d.ts
declare global {
~~~

- [[declare]]: «أنا بوصف حاجة موجودة، مش بعملها».
- [[global]]: الـ scope العام، اللي كل الملفات شايفاه. احنا محتاجينه لأن Express عرّف الـ namespace بتاعه هناك.

---

## ٣. [[namespace Express]] و [[interface Request]]

~~~text src/types/express.d.ts
  namespace Express {
    interface Request {
      user?: { id: string; role: "admin" | "user" };
    }
  }
}
~~~

- [[namespace Express]]: اسم مجموعة أنواع. لقيناه في [[node_modules/@types/express-serve-static-core/index.d.ts]] (باكدج بتتسطب مع [[@types/express]]):

~~~text index.d.ts (من @types/express-serve-static-core)
    namespace Express {
        // These open interfaces may be extended in an application-specific manner via declaration merging.
        interface Request {}
~~~

  يعني Express ساب [[interface Request {}]] فاضي مخصوص عشانك، و [[Request]] اللي بتستخدمه في الـ handlers بيورث منه.
- [[interface Request]] بنفس الاسم: الـ interfaces اللي بنفس الاسم في نفس المكان بتتدمج (declaration merging). فـ [[user]] اتضافت على الأصلي. ده مينفعش بـ [[type]].
- [[user?:]]: اختيارية، لأن مش كل request عدّى على الـ auth.

---

## ٤. [[export {}]]: السطر اللي شكله ملوش لازمة

~~~text src/types/express.d.ts
export {};
~~~

بيصدّر ولا حاجة، بس وجوده بيخلي الملف **module** مش script. و [[declare global]] مبتشتغلش غير جوه module. شلناه وفحصنا:

~~~text الناتج: npx tsc -p . --noEmit (skipLibCheck: true)
src/app.ts(8,12): error TS2339: Property 'user' does not exist on type 'Request<{}, any, any, ParsedQs, Record<string, any>>'.
...
~~~

TS2339 على كل [[req.user]] في المشروع، ومن غير أي كلمة عن الملف نفسه، لأن [[skipLibCheck]] بيقفل فحص ملفات [[.d.ts]] كلها، حتى بتاعتك. ولما فحصنا بـ [[--skipLibCheck false]] ظهر السبب الحقيقي:

~~~text الناتج
src/types/express.d.ts(1,9): error TS2669: Augmentations for the global scope can only be directly nested in external modules or ambient module declarations.
~~~

نفس الأخطاء بالظبط في TS 6 و 7.

---

## ٥. الاستخدام في handler عادي

~~~text src/app.ts
app.get("/me", (req, res) => {
  if (!req.user) return res.status(401).json({ error: "سجّل دخول" });
  res.json({ id: req.user.id, role: req.user.role });
});
~~~

- [[(req, res)]] من غير أي نوع: TS عارفهم من [[app.get]]، و [[req]] فيه [[user]] دلوقتي.
- [[if (!req.user)]]: لو مفيش user. و [[401]] = Unauthorized، «سجّل دخول الأول».
- بعد الـ [[if]] اللي فيها [[return]]، TS عارف إن [[req.user]] موجود، فـ [[.id]] و [[.role]] متاحين بنوعهم.

وفي التجربة ضفنا middleware صغير بيحط [[req.user]] لو الـ header [[Authorization: Bearer t1]]، و route تاني من غير الفحص:

~~~text src/app.ts
app.get("/bad", (req, res) => {
  res.json({ id: req.user.id });
});
~~~

~~~text الناتج: npx tsc -p . --noEmit
src/app.ts(12,18): error TS18048: 'req.user' is possibly 'undefined'.
~~~

ده بالظبط فايدة الـ [[?]]: TS بيجبرك تفحص.

---

## ٦. التشغيل

| الطلب | الرد | الـ status |
|---|---|---|
| [[curl localhost:3918/me]] | [[{"error":"سجّل دخول"}]] | 401 |
| نفس الطلب مع [[-H "Authorization: Bearer t1"]] | [[{"id":"u1","role":"admin"}]] | 200 |
| [[curl localhost:3918/bad]] (tsx مبيفحصش أنواع فاشتغل) | صفحة خطأ فيها [[TypeError: Cannot read properties of undefined (reading 'id')]] | 500 |

الصف الأخير هو الخطأ اللي [[tsc]] حذّر منه، بس وقت التشغيل.

---

## الخلاصة

- [[declare global { namespace Express { interface Request {...} } }]] بيضيف على نوع Express الأصلي بالـ declaration merging.
- الملف لازم يبقى module ([[export {}]]) وجوه [[include]].
- مع [[skipLibCheck]] غلطة الملف نفسه مش بتظهر، واللي بيظهر TS2339 على الاستخدام بس.
- خلي الخاصية اختيارية ([[?]]) وافحصها.`,
          lines: [
            "ادخل على الـ scope العام (global).",
            R`[[@types/express]] بيعرّف namespace اسمه Express مخصوص عشان تضيف عليه.`,
            "نفس اسم الـ interface: TS هيدمجه مع الأصلي.",
            R`[[user]] اختياري، لأن مش كل route عليه auth.`,
            "قفلة.",
            "قفلة.",
            "قفلة.",
            R`سطر مهم: بيخلي الملف module، و [[declare global]] مبتشتغلش غير جوه module.`,
            "handler عادي، من غير أي نوع مخصوص.",
            R`TS عارف إن [[req.user]] ممكن يبقى undefined، فبيجبرك تفحص.`,
            R`بعد الفحص، [[user]] موجود بنوعه.`,
            "قفلة."
          ],
          sol: R`من غير [[export {}]] الملف بيبقى script مش module. لو [[skipLibCheck]] مقفول هتشوف على الملف نفسه: Augmentations for the global scope can only be directly nested in external modules or ambient module declarations (TS2669). ومع [[skipLibCheck: true]] (الأشهر) الخطأ ده مش بيظهر، واللي بيظهر بس: Property 'user' does not exist on type 'Request<...>' (TS2339) على كل [[req.user]]، وده بيلخبط لأن السبب مش باين.

ونفس خطأ TS2339 بيظهر لو الملف برّه [[include]]. بعد ما ترجّع [[export {}]] والملف جوه include، [[npx tsc --noEmit]] مش بيطلّع حاجة.`
        },
        {
          cmd: "Prisma types",
          title: "أنواع جداولك جاهزة بعد generate، ونوع لكل query",
          desc: R`[[prisma generate]] بيطلّع client فيه نوع لكل model ([[User]] و [[Order]]) ولكل input ([[Prisma.UserCreateInput]] و [[Prisma.UserWhereInput]]). ونتيجة كل query نوعها محسوب من الـ [[select]] و [[include]] اللي كتبتهم: لو اخترت [[id]] و [[name]] بس، النتيجة مفيهاش [[email]].

ولو محتاج النوع ده برّه الـ query (لـ props أو دالة)، [[Prisma.UserGetPayload<...>]] مع [[satisfies]].`,
          example: R`import type { Prisma, User } from "@/generated/prisma/client";
import { db } from "@/lib/db";
const userCard = {
  select: { id: true, name: true, _count: { select: { orders: true } } },
} satisfies Prisma.UserDefaultArgs;
type UserCard = Prisma.UserGetPayload<typeof userCard>;
export async function listUsers(role?: User["role"]): Promise<UserCard[]> {
  const where: Prisma.UserWhereInput = role ? { role } : {};
  return db.user.findMany({ where, ...userCard });
}
export function greet(u: UserCard) {
  return $__bt$__{u.name} عنده $__{u._count.orders} طلب$__bt;
}`,
          try: R`ضيف [[email: true]] للـ select واستخدم [[u.email]] في [[greet]] من غير ما تلمس أي نوع. وبعدين غيّر اسم عمود في [[schema.prisma]]، وشغّل [[npx prisma generate]] ثم [[npx tsc --noEmit]]: كل مكان بيستخدم الاسم القديم هيطلع.`,
          flag: "script",
          deep: {
            why: "القاعدة هي مصدر الحقيقة لشكل الداتا. لو كتبت أنواع الجداول بإيدك، أول migration هتخليها كدب. Prisma بيولّد الأنواع من الـ schema نفسها، فتغيير عمود بيوصل لكل الكود وقت الـ typecheck.",
            how: R`[[prisma generate]] بيقرا [[schema.prisma]] ويكتب كود TS: الـ client ونوع لكل model و enum و input. وفي Prisma 7 مع generator [[prisma-client]]، الكود بيتكتب في الفولدر اللي في [[output]] (زي [[src/generated/prisma]]) وبتستورد منه مباشرة، مش من [[@prisma/client]] زي زمان. والـ enums بتطلع object بـ [[as const]] ونوع بنفس الاسم.

كل method ([[findMany]] و [[findUnique]] و [[create]]) generic على الـ args: نوع الناتج بيتحسب من [[select]] و [[include]]. و [[findUnique]] بيرجع [[T | null]]، و [[findMany]] بيرجع [[T[]]].

و [[Prisma.UserGetPayload<Args>]] بيحسب نفس النوع ده برّه الـ query. و [[satisfies Prisma.UserDefaultArgs]] بيفحص الـ args من غير ما يوسّع نوعها. لو استخدمت annotation ([[const userCard: Prisma.UserDefaultArgs]]) بدل satisfies، النوع هيبقى عام والـ payload هيطلع غلط.

والـ inputs ([[Prisma.UserCreateInput]] و [[Prisma.UserWhereInput]]) مفيدين في دوال بتبني queries. بس مش بديل عن Zod: دي أنواع وقت الكتابة، والداتا من العميل لسه محتاجة فحص قبل ما توصل هنا.

وتفاصيل prisma generate و migrate في تاب «SQL و Prisma» و «Node و npm».`,
            when: "أي مشروع Prisma: props الكومبوننتات اللي بتعرض نتيجة query، و service functions، والـ DTOs. وشغّل [[prisma generate]] بعد أي تعديل في الـ schema، وفي CI قبل [[tsc]].",
            mistakes: R`تكتب [[type User = {...}]] بإيدك جنب Prisma. وتستخدم [[User]] (الموديل الكامل) كنوع لنتيجة query فيها select، فتفتكر [[email]] موجودة وهي مش موجودة. وفي مشروع حقيقي كان فيه [[role as Prisma.UserWhereInput["role"]]] على string جاية من الـ URL: ده بيعدّي أي string للقاعدة، والصح type guard أو [[z.enum]]. وتنسى [[prisma generate]] في CI أو Docker فالأنواع تبقى قديمة.`
          },
          teach: R`## الفكرة في سطرين

[[prisma generate]] بيقرا [[schema.prisma]] ويكتب ملفات TS فيها نوع لكل جدول ولكل query. والمثال بيعرّف شكل query مرة واحدة ([[userCard]])، ويطلّع منه نوع النتيجة، ويستخدم النوع ده في دالة تانية.

اتجرّب على ويندوز 11 بـ Node 24 و Prisma 7.10 مع SQLite (adapter [[@prisma/adapter-better-sqlite3]])، في مشروع فيه model [[User]] (id و name و email و role) و model [[Order]]، و [[role]] enum فيه [[ADMIN]] و [[USER]]. الـ tsconfig فيه [["moduleResolution": "bundler"]] و [["paths": { "@/*": ["./src/*"] }]] زي Next. الأنواع من TypeScript 6.0.3 و 7.0.2، والتشغيل بـ [[npx tsx]].

---

## ١. اللي [[prisma generate]] بيعمله

~~~text الناتج: npx prisma generate
✔ Generated Prisma Client (7.10.0) to .\src\generated\prisma in 37ms
~~~

الفولدر ده جه من [[output = "../src/generated/prisma"]] في الـ generator. وجواه مثلًا [[enums.ts]]:

~~~text src/generated/prisma/enums.ts
export const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER'
} as const

export type Role = (typeof Role)[keyof typeof Role]
~~~

الـ enum بيطلع object بـ [[as const]] ونوع بنفس الاسم، مش [[enum]] بتاع TS.

---

## ٢. الـ imports

~~~text src/users.ts
import type { Prisma, User } from "@/generated/prisma/client";
import { db } from "@/lib/db";
~~~

- [[import type]]: [[Prisma]] (namespace فيه أنواع الـ inputs والـ payloads) و [[User]] (نوع صف كامل من الجدول) أنواع بس.
- [[@/...]]: الـ alias من [[paths]].
- [[db]]: الـ client نفسه، قيمة حقيقية. في المشروع ده [[src/lib/db.ts]] فيه [[new PrismaClient({ adapter: new PrismaBetterSqlite3({ url: "file:./dev.db" }) })]]، لأن Prisma 7 محتاج adapter للقاعدة.

---

## ٣. شكل الـ query كقيمة

~~~text src/users.ts
const userCard = {
  select: { id: true, name: true, _count: { select: { orders: true } } },
} satisfies Prisma.UserDefaultArgs;
~~~

- [[select]]: الأعمدة اللي عايزها. [[true]] = هاتها.
- [[_count: { select: { orders: true } }]]: مش عمود، ده عدد الـ orders المرتبطة بكل user.
- [[satisfies Prisma.UserDefaultArgs]]: افحص إن ده args صح لـ User، **وسيب النوع الدقيق**. لو كتبنا اسم عمود غلط:

~~~text الناتج: npx tsc -p . (select: { id: true, nam: true })
error TS2561: Object literal may only specify known properties, but 'nam' does not exist in type 'UserSelect<DefaultArgs>'. Did you mean to write 'name'?
~~~

---

## ٤. نوع النتيجة من الشكل

~~~text src/users.ts
type UserCard = Prisma.UserGetPayload<typeof userCard>;
~~~

- [[typeof userCard]]: نوع الـ object الدقيق (فيه إن [[id]] و [[name]] [[true]]).
- [[UserGetPayload<...>]]: بيحسب «لو عملت query بالـ args دي، النتيجة شكلها إيه».

~~~text الناتج (TS 6.0.3)
{ id: number; name: string; _count: { orders: number; }; }
~~~

مفيش [[email]] ولا [[role]]، لأنهم مش في الـ select. (TS 7.0.2 كتبه [[{ _count: { orders: number; }; id: number; name: string; }]]، ترتيب بس.)

**ليه satisfies مش annotation؟** جرّبنا [[const annotated: Prisma.UserDefaultArgs = { select: { id: true, name: true } }]] و [[UserGetPayload<typeof annotated>]]:

~~~text الناتج
{ id: number; name: string; email: string; role: Role; }
~~~

الـ annotation خلّت النوع [[UserDefaultArgs]] العام، فـ Prisma مبقاش عارف انت اخترت إيه، ورجّع الموديل كامل. يعني النوع بيقول [[email]] موجودة وهي مش موجودة وقت التشغيل.

---

## ٥. الدالة

~~~text src/users.ts
export async function listUsers(role?: User["role"]): Promise<UserCard[]> {
  const where: Prisma.UserWhereInput = role ? { role } : {};
  return db.user.findMany({ where, ...userCard });
}
~~~

- [[role?: User["role"]]]: [[User["role"]]] = «نوع خاصية role في User» (indexed access)، يعني [[Role]]. و [[?]] اختياري. جرّبنا [[const r: User["role"] = "OTHER"]]:

~~~text الناتج
error TS2322: Type '"OTHER"' is not assignable to type 'Role'.
~~~

- [[Promise<UserCard[]>]]: الدالة async، فبترجّع Promise بليستة UserCard.
- [[Prisma.UserWhereInput]]: نوع الفلتر. [[role ? { role } : {}]]: لو فيه role فلتر بيه، ولو لأ [[{}]] = هات الكل. واسم عمود غلط بيتمسك:

~~~text الناتج (where: { rol: "ADMIN" })
error TS2561: Object literal may only specify known properties, but 'rol' does not exist in type 'UserWhereInput'. Did you mean to write 'role'?
~~~

- [[{ where, ...userCard }]]: [[...userCard]] بيفرد [[select]] جوه الـ args، فالنتيجة بنفس الشكل بالظبط، و TS متأكد إنها [[UserCard[]]].

---

## ٦. استخدام النوع برّه الـ query

~~~text src/users.ts
export function greet(u: UserCard) {
  return $__bt$__{u.name} عنده $__{u._count.orders} طلب$__bt;
}
~~~

[[u.name]] و [[u._count.orders]] متاحين. ولما جرّبنا [[u.email]]:

~~~text الناتج
error TS2339: Property 'email' does not exist on type '{ id: number; name: string; _count: { orders: number; }; }'.
~~~

---

## ٧. التشغيل

عملنا user اسمه Sara (ADMIN وعندها طلبين) و Omar (USER من غير طلبات)، وبعدين:

~~~text الناتج: npx tsx src/main.ts
[
  { id: 1, name: 'Sara', _count: { orders: 2 } },
  { id: 2, name: 'Omar', _count: { orders: 0 } }
]
[ 'Sara عنده 2 طلب', 'Omar عنده 0 طلب' ]
[ { id: 1, name: 'Sara', _count: { orders: 2 } } ]
~~~

الأول [[listUsers()]]، والتاني [[map(greet)]]، والتالت [[listUsers("ADMIN")]]. والنتيجة الحقيقية بنفس شكل [[UserCard]] بالظبط: مفيش [[email]].

---

## الخلاصة

| الحاجة | منين |
|---|---|
| صف كامل من جدول | [[User]] |
| نوع عمود | [[User["role"]]] |
| فلتر | [[Prisma.UserWhereInput]] |
| شكل query قابل لإعادة الاستخدام | [[{...} satisfies Prisma.UserDefaultArgs]] |
| نتيجة الـ query دي | [[Prisma.UserGetPayload<typeof args>]] |

- الأنواع بتتحسب من الـ [[select]]، فمتستخدمش [[User]] لنتيجة فيها select.
- [[satisfies]] مش annotation، وإلا النوع يرجع للموديل الكامل.
- غيّرت الـ schema؟ [[prisma generate]] وبعدين [[tsc]].`,
          lines: [
            R`أنواع Prisma 7 من الـ client اللي اتولّد (المسار حسب [[output]] في schema.prisma).`,
            "الـ client نفسه (instance واحد في المشروع).",
            "شكل الـ query كـ object لوحده...",
            "...id و name وعدد الطلبات بس...",
            R`...و [[satisfies]] بيتأكد إنه args صح للـ User من غير ما يضيّع النوع الدقيق.`,
            R`نوع النتيجة محسوب من الـ select: [[{ id; name; _count: { orders } }]].`,
            R`[[User["role"]]]: نوع الـ enum من الموديل.`,
            R`[[WhereInput]] نوع الفلتر: أي عمود غلط أو قيمة غلط يطلع خطأ.`,
            R`نفس الـ select، فالنتيجة مطابقة لـ [[UserCard]].`,
            "قفلة.",
            "دالة (أو props لكومبوننت) بتاخد النوع ده.",
            R`TS عارف إن فيه name و _count بس. لو كتبت [[u.email]] هيطلع خطأ، لأنها مش في الـ select.`,
            "قفلة."
          ],
          sol: R`بعد [[email: true]] في الـ select، [[u.email]] في [[greet]] بيشتغل ونوعه string من غير ما تلمس [[UserCard]]، لأن [[UserGetPayload]] بيتحسب من الـ select. ولو كتبت [[u.role]] من غير ما تختاره هتاخد Property 'role' does not exist on type '{ id: number; name: string; email: string; _count: { orders: number; }; }'.

ولو غيّرت [[name]] لـ [[fullName]] وعملت generate و tsc: أول خطأ بيطلع في الـ select نفسه: Object literal may only specify known properties, and 'name' does not exist in type 'UserSelect<DefaultArgs>'. ولما تصلّحه لـ [[fullName: true]]، الخطأ بيتنقل لـ [[u.name]] في [[greet]]. يعني TS بيوديك من مكان للتاني لحد ما كل حاجة تتصلح. ولو مطلعش حاجة، غالبًا نسيت [[prisma generate]] والأنواع لسه القديمة.`
        },
        {
          cmd: "typed fetch",
          title: "رد API خارجي: تديله نوع من غير ما تكذب على TS",
          desc: R`[[await res.json()]] نوعها [[any]]، و [[as User]] بعدها مجرد أمنية. الطريقة الآمنة: اعتبر الرد [[unknown]]، وافحصه بـ schema، والنوع يطلع من الفحص. كده لو الـ API غيّر شكله، الخطأ يطلع واضح عند الحدود، مش [[undefined]] في نص الـ UI.

واعمل helper واحد بياخد الـ schema ويرجّع داتا مفحوصة، وافحص [[res.ok]] قبل ما تقرا الـ body.`,
          example: R`import * as z from "zod";
async function getJson<S extends z.ZodType>(url: string, schema: S): Promise<z.infer<S>> {
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error($__bt$__{url} رجّع $__{res.status}$__bt);
  const body: unknown = await res.json();
  return schema.parse(body);
}
const Repo = z.object({ full_name: z.string(), stargazers_count: z.number() });
const repo = await getJson("https://api.github.com/repos/microsoft/typescript", Repo);
console.log(repo.full_name, repo.stargazers_count);`,
          try: R`غيّر [[stargazers_count: z.number()]] لـ [[z.string()]] وشغّل: هتشوف ZodError بيقولك الحقل والنوع المتوقع. ده بالظبط اللي كان هيحصل لو الـ API غيّر شكله، بس برسالة واضحة.`,
          flag: "script",
          deep: {
            why: R`في مشروع حقيقي كان فيه helper بالشكل ده: [[fetchTeam<T = any>(path): Promise<T | null>]] بيرجّع [[(await r.json()) as T]]. شكله typed، بس T بيختارها اللي بينادي، ومفيش أي فحص. لو السيرفر التاني رجّع شكل مختلف، TS هيفضل مقتنع إن كل حاجة تمام، والخطأ يطلع في الـ UI كـ undefined.`,
            how: R`TS مبيعرفش حاجة عن الشبكة: [[Response.json()]] متعرّفة إنها [[Promise<any>]] في أنواع المتصفح (lib dom، ودي بتتحمل افتراضي لو مكتبتش [[lib]]، حتى في مشروع Node)، وفي أنواع Node لوحدها (من غير dom) بترجع [[Promise<unknown>]]. وفي الحالتين أي نوع تحطه بـ [[as]] أو generic كلام بس ومفيش فحص وقت التشغيل، ومع [[unknown]] حتى الـ annotation مش هتعدّي من غير [[as]].

الحدود (boundaries) هي الأماكن اللي الداتا بتدخل فيها كودك من برّه: رد API، و request body، و localStorage، و env، ورسايل WebSocket، و JSON من AI. القاعدة: جوه كودك ثق في الأنواع، وعند الحدود افحص. و Zod بيعمل الفحص ويطلّع النوع في خطوة.

و [[schema.parse]] بترجع نسخة من غير المفاتيح اللي مش في الـ schema، فالـ schema اللي فيها اللي محتاجه بس بتحميك كمان من داتا زيادة. ولو الـ API بيرجّع أشكال مختلفة حسب الحالة، اعمل schema لكل حالة و [[z.discriminatedUnion]].

ولو مش عايز Zod في الـ bundle بتاع الـ front (حجمه مهم)، فيه بدائل أصغر، أو اكتب type guard بإيدك، أو على الأقل خليه [[unknown]] وافحص الحقول اللي بتستخدمها. المهم متبدأش بـ [[as]].

ولو الـ API بتاعك انت (نفس الـ monorepo)، الـ schemas المشتركة بين الـ front والـ back بتدّيك نفس النوع في الناحيتين من غير نسخ.`,
            when: "أي fetch لـ API خارجي أو بتاعك، وأي JSON.parse، وأي داتا مخزنة في المتصفح، وناتج AI المطلوب JSON.",
            mistakes: R`[[const data: User[] = await res.json()]]: annotation على any، يعني [[as]] متنكّر. و generic [[fetchJson<T>]] من غير schema. وتقرا الـ body من غير ما تفحص [[res.ok]]، فتحاول تعمل parse لصفحة خطأ HTML. و schema بكل حقول الرد (١٠٠ حقل) وانت محتاج ٣: أي تغيير تافه في الـ API يكسر التطبيق.`
          },
          teach: R`## الفكرة في سطرين

[[getJson]] helper واحد بياخد URL و schema، وبيرجّع الداتا مفحوصة ونوعها طالع من الـ schema. كده كل fetch في المشروع بيعدّي على فحص حقيقي، مش [[as]].

اتجرّب على ويندوز 11 بـ Node 24 و Zod 4.6.5، بـ [[npx tsx app.ts]] على GitHub API الحقيقي، والأنواع من TypeScript 6.0.3 و 7.0.2.

---

## ١. المشكلة: [[res.json()]] نوعها إيه؟

جرّبنا الكود ده:

~~~text probe.ts
const res = await fetch("https://example.com");
const j = await res.json();
j.anything.goes();
const typed: { a: number } = await res.json();
~~~

| الإعداد | نوع [[res.json()]] | النتيجة |
|---|---|---|
| من غير [[lib]] (الافتراضي بيجيب أنواع المتصفح DOM) | [[any]] | ولا خطأ، حتى [[j.anything.goes()]] |
| [["lib": ["es2024"]]] مع [["types": ["node"]]] بس | [[unknown]] | خطأين |

~~~text الناتج: الحالة التانية (TS 6 و 7)
probe.ts(3,1): error TS18046: 'j' is of type 'unknown'.
probe.ts(4,7): error TS2322: Type 'unknown' is not assignable to type '{ a: number; }'.
~~~

في الحالتين مفيش أي فحص وقت التشغيل. [[any]] بيسكت عن كل حاجة، و [[unknown]] بيجبرك تفحص. احنا هنعامله [[unknown]] بإيدنا في الحالتين.

---

## ٢. توقيع الدالة

~~~text app.ts
async function getJson<S extends z.ZodType>(url: string, schema: S): Promise<z.infer<S>> {
~~~

من الشمال لليمين:

- [[async]]: الدالة بترجّع Promise وتقدر تستخدم [[await]] جواها.
- [[<S extends z.ZodType>]]: generic اسمه [[S]]، و [[extends z.ZodType]] معناها «لازم يبقى schema من Zod». مع كل نداء، [[S]] بيبقى نوع الـ schema اللي اتبعتت بالظبط.
- [[schema: S]]: الباراميتر نوعه S، فمنه TS بيعرف S.
- [[Promise<z.infer<S>>]]: هترجّع شكل الداتا بتاعة الـ schema دي. ده اللي بيربط النوع اللي راجع بالفحص اللي حصل.

---

## ٣. الطلب

~~~text app.ts
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
~~~

- [[fetch(url, {...})]]: طلب HTTP، مدمج في Node 18+.
- [[AbortSignal.timeout(10_000)]]: إشارة بتلغي الطلب بعد 10000 ملّي ثانية (١٠ ثواني). من غيرها لو السيرفر علّق هتستنى للأبد. و [[_]] في [[10_000]] فاصل للقراية بس، الرقم 10000.

---

## ٤. فحص الـ status

~~~text app.ts
  if (!res.ok) throw new Error($__bt$__{url} رجّع $__{res.status}$__bt);
~~~

- [[res.ok]]: [[true]] لو الـ status من 200 لـ 299.
- لو لأ، ارمي خطأ فيه الـ URL والـ status، بدل ما تحاول تقرا صفحة خطأ كأنها داتا. جرّبنا repo مش موجود:

~~~text الناتج
Error: https://api.github.com/repos/microsoft/no-such-repo-xyz رجّع 404
~~~

---

## ٥. الـ body [[unknown]] والفحص

~~~text app.ts
  const body: unknown = await res.json();
  return schema.parse(body);
}
~~~

- [[: unknown]]: حتى لو [[res.json()]] بيرجّع [[any]]، احنا قلنا صراحة «منعرفش ده إيه».
- [[schema.parse(body)]]: الفحص الحقيقي. لو الشكل سليم بترجّع الداتا بنوع [[z.infer<S>]]، ولو لأ بترمي [[ZodError]].

---

## ٦. الاستخدام

~~~text app.ts
const Repo = z.object({ full_name: z.string(), stargazers_count: z.number() });
const repo = await getJson("https://api.github.com/repos/microsoft/typescript", Repo);
console.log(repo.full_name, repo.stargazers_count);
~~~

- [[Repo]]: schema لحقلين بس من رد فيه أكتر من ٨٠ حقل. والباقي بيتشال في الـ parse.
- [[await]] برّه أي دالة (top-level await): مسموح لأن الملف ESM.
- نوع [[repo]]:

~~~text الناتج (TS 6 و 7)
{ full_name: string; stargazers_count: number; }
~~~

TS عرف ده من [[Repo]] اللي اتبعتت، من غير ما نكتب أي نوع.

~~~text الناتج: npx tsx app.ts
microsoft/TypeScript 111366
~~~

(عدد النجوم وقت التجربة، هيختلف عندك.)

---

## ٧. لو الـ API غيّر شكله

غيّرنا [[stargazers_count]] لـ [[z.string()]]، كأن الرد بقى غير المتوقع:

~~~text الناتج
  return schema.parse(body);
                ^

ZodError: [
  {
    "expected": "string",
    "code": "invalid_type",
    "path": [
      "stargazers_count"
    ],
    "message": "Invalid input: expected string, received number"
  }
]
~~~

الخطأ عند الحدود، وفيه اسم الحقل والمتوقع والجاي. من غير الفحص كان الكود هيكمّل بنوع غلط ويقع بعدين في مكان ملوش علاقة.

(على ويندوز ظهر بعد الخطأ سطر [[Assertion failed: ... async.c]] من Node نفسه وهو بيقفل بعد exception فيه طلب شبكة. ملوش علاقة بالكود.)

---

## الخلاصة

| خطوة | ليه |
|---|---|
| [[AbortSignal.timeout]] | متستناش للأبد |
| [[if (!res.ok) throw]] | متقراش صفحة خطأ كأنها داتا |
| [[const body: unknown]] | متثقش في [[any]] |
| [[schema.parse(body)]] | فحص حقيقي، والنوع طالع منه |
| [[<S extends z.ZodType>]] و [[z.infer<S>]] | helper واحد لكل الـ schemas |`,
          lines: [
            "Zod.",
            "generic على الـ schema: نوع الرجوع هو نوع الـ schema نفسها.",
            "timeout عشان متستناش للأبد.",
            "4xx أو 5xx: متحاولش تقرا الـ body كأنه نجح.",
            R`الـ body [[unknown]] صراحة، مش any.`,
            "الفحص الحقيقي: لو الشكل غلط يترمي ZodError فيه المشكلة بالظبط.",
            "قفلة.",
            "schema للحاجات اللي هتستخدمها بس، مش الرد كله.",
            R`[[repo]] نوعها طالع من الـ schema، ومفحوص فعلًا.`,
            "آمن."
          ],
          sol: R`الناتج: [[ZodError]] وفيه [["expected": "string"]] و [["code": "invalid_type"]] و [["path": [ "stargazers_count" ]]] و [["message": "Invalid input: expected string, received number"]]، والـ stack بيشاور على [[schema.parse(body)]]. قبل التعديل كان بيطبع [[microsoft/TypeScript]] وجنبه عدد النجوم.

لو طلعلك [[Error: https://api.github.com/repos/microsoft/typescript رجّع 403]] بدل كده، ده GitHub مش Zod: الـ API من غير توكن ليه حد صغير في الساعة (أو الشبكة عندك حاجباه). استنى شوية، أو ابعت header [[Authorization]] بتوكن، أو جرّب على API تاني.`
        },
        {
          cmd: "branded types",
          title: "تفرّق بين UserId و OrderId مع إن الاتنين string",
          desc: R`بسبب structural typing، [[type UserId = string]] و [[type OrderId = string]] نفس النوع، فتقدر تبعت order id لدالة مستنية user id و TS ساكت. الـ branded type بيضيف علامة وهمية: [[string & { readonly __brand: "UserId" }]]، فالنوعين يبقوا مختلفين وقت الفحص، ووقت التشغيل الاتنين string عادي.

والطريقة الوحيدة تعمل قيمة branded تبقى دالة بتفحص (أو schema)، فالعلامة معناها «القيمة دي اتفحصت».`,
          example: R`type Brand<T, B extends string> = T & { readonly __brand: B };
type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;
const toUserId = (s: string): UserId => {
  if (!s.startsWith("usr_")) throw new Error("user id غلط");
  return s as UserId;
};
function getUser(id: UserId) { return id; }
const uid = toUserId("usr_123");
const oid = "ord_9" as OrderId;
getUser(uid);
getUser(oid); // خطأ: OrderId مش UserId
getUser("usr_1"); // خطأ: string عادي مش متفحص`,
          try: R`جرّب [[uid.toUpperCase()]]: شغالة، لأنه لسه string. وبعدين في Zod: [[z.string().startsWith("usr_").brand<"UserId">()]] وخد منه [[z.infer]]، وقارن النوع.`,
          flag: "script",
          deep: {
            why: "في مشروع فيه users و orders و products، كل الـ ids strings أو أرقام. [[deleteOrder(userId)]] بدل [[deleteOrder(orderId)]] غلطة سهلة جدًا، والنتيجة ممكن تبقى مسح داتا غلط، و TS مش هيقول حاجة. الـ brands بتخلي النوع يفرّق بينهم. ونفس الفكرة لـ «string اتعمله sanitize» أو «مبلغ بالقرش مش بالجنيه».",
            how: R`TS structural: نوعين بنفس الشكل هما نفس النوع. الـ brand بيضيف خاصية وهمية ([[__brand]]) بقيمة literal مختلفة، فالشكل بقى مختلف. مفيش object فعلًا فيه الخاصية دي: ده كدب متحكم فيه، و [[as]] بيتعمل مرة واحدة جوه الدالة اللي بتفحص.

والقيمة branded لسه string: كل methods الـ string شغالة، وتتبعت لأي حاجة مستنية string. الحماية في اتجاه واحد: string عادي مش هيدخل مكان UserId.

و Zod فيه [[.brand<"UserId">()]]: الـ schema بتفحص، والنوع الطالع branded. كده الـ brand بيتعمل عند الحدود تلقائيًا.

ده مش ميزة رسمية في TS (TS مفيهوش nominal types)، هو نمط. استخدمه في الأماكن اللي الغلط فيها غالي بس، مش على كل string.`,
            when: "ids من أنواع مختلفة في نفس الـ service، وفلوس بعملات أو وحدات مختلفة، وقيم لازم تتفحص قبل ما تتستخدم (email متأكد منه، HTML متنضف).",
            mistakes: R`brands على كل حاجة فالكود يتملي [[as]] وتحويلات. و [[as UserId]] في كل مكان بدل دالة واحدة بتفحص، فالعلامة فقدت معناها. وتفتكر إن الـ brand موجود وقت التشغيل.`
          },
          teach: R`## الفكرة في سطرين

TS بيقارن الأنواع بالشكل، فـ [[type UserId = string]] و [[type OrderId = string]] نفس الحاجة بالظبط. الـ brand بيضيف خاصية **وهمية** مختلفة لكل واحد، فالشكلين يبقوا مختلفين وقت الفحص، ووقت التشغيل الاتنين string عادي.

اتجرّب على ويندوز 11 بـ Node 24: الأخطاء من TypeScript 6.0.3 و 7.0.2 (نفس الرسايل بالحرف)، والتشغيل بـ [[npx tsx]]، و Zod 4.6.5 للـ solCode.

---

## ١. الـ helper

~~~text app.ts
type Brand<T, B extends string> = T & { readonly __brand: B };
~~~

- [[Brand<T, B>]]: نوع generic بياخد نوعين: [[T]] الأصلي (string مثلًا)، و [[B]] اسم العلامة.
- [[B extends string]]: الاسم لازم يبقى string، زي [["UserId"]].
- [[T & {...}]]: intersection: القيمة لازم تبقى [[T]] **و** فيها الخاصية دي.
- [[readonly __brand: B]]: خاصية اسمها [[__brand]] ونوعها اسم العلامة بالظبط. [[readonly]] عشان محدش يكتب فيها. والـ [[__]] في أول الاسم عادة معناها «داخلي، متلمسوش».

مفيش string في الدنيا فيه خاصية [[__brand]]. ده كدب متحكم فيه: النوع بيقول إنها موجودة وهي مش موجودة.

---

## ٢. نوعين مختلفين

~~~text app.ts
type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;
~~~

[[UserId]] = [[string & { readonly __brand: "UserId" }]]، و [[OrderId]] نفس الحكاية بـ [["OrderId"]]. الخاصية الوهمية مختلفة، فالشكل مختلف.

---

## ٣. الباب الوحيد: دالة بتفحص

~~~text app.ts
const toUserId = (s: string): UserId => {
  if (!s.startsWith("usr_")) throw new Error("user id غلط");
  return s as UserId;
};
~~~

- [[(s: string): UserId]]: بتاخد string عادي وبترجّع UserId.
- [[s.startsWith("usr_")]]: فحص حقيقي وقت التشغيل: النص بيبدأ بـ [[usr_]]؟ لو لأ ارمي خطأ. جرّبنا [[toUserId("ord_1")]]:

~~~text الناتج
user id غلط
~~~

- [[s as UserId]]: هنا بس بنكدب على TS، بعد ما فحصنا. ده المكان الوحيد في المشروع اللي فيه [[as UserId]]، فالعلامة معناها «القيمة دي عدّت على الفحص».

---

## ٤. الاستخدام والأخطاء

~~~text app.ts
function getUser(id: UserId) { return id; }
const uid = toUserId("usr_123");
const oid = "ord_9" as OrderId;
getUser(uid);
getUser(oid);
getUser("usr_1");
~~~

- [[getUser(uid)]]: [[uid]] جاية من [[toUserId]]، فنوعها UserId. عدّت.
- [[getUser(oid)]]:

~~~text الناتج: npx tsc (TS 6 و 7)
app.ts(12,9): error TS2345: Argument of type 'OrderId' is not assignable to parameter of type 'UserId'.
  Type 'OrderId' is not assignable to type '{ readonly __brand: "UserId"; }'.
    Types of property '__brand' are incompatible.
      Type '"OrderId"' is not assignable to type '"UserId"'.
~~~

اقرا الرسالة من فوق لتحت: كل سطر بيوضّح اللي فوقه. في الآخر السبب الحقيقي: [[__brand]] قيمتها [["OrderId"]] مش [["UserId"]].

- [[getUser("usr_1")]]: حتى لو النص صح، هو string عادي مش متفحص:

~~~text الناتج
app.ts(13,9): error TS2345: Argument of type 'string' is not assignable to parameter of type 'UserId'.
  Type 'string' is not assignable to type '{ readonly __brand: "UserId"; }'.
~~~

---

## ٥. وقت التشغيل: string عادي

~~~text الناتج: console.log(uid, typeof uid, uid.toUpperCase(), uid.length)
usr_123 string USR_123 7
~~~

كل methods الـ string شغالة، و [[const plain: string = uid]] بتعدّي (UserId نوع أضيق من string). والـ JS اللي [[tsc]] طلّعه:

~~~text app.js
const toUserId = (s) => {
    if (!s.startsWith("usr_"))
        throw new Error("user id غلط");
    return s;
};
function getUser(id) { return id; }
const uid = toUserId("usr_123");
const oid = "ord_9";
~~~

[[Brand]] و [[UserId]] و [[as UserId]] اختفوا. اللي فضل هو الفحص اللي كتبناه بإيدنا.

---

## ٦. الـ solCode: نفس الفكرة بـ Zod

~~~text sol.ts
const UserIdSchema = z.string().startsWith("usr_").brand<"UserId">();
type UserId = z.infer<typeof UserIdSchema>;
~~~

- [[.startsWith("usr_")]]: الفحص.
- [[.brand<"UserId">()]]: بعد الفحص، النوع الطالع يبقى branded.

~~~text الناتج: نوع UserId (TS 6 و 7)
string & $brand<"UserId">
~~~

Zod بيستخدم نوع [[$brand]] بتاعه، مش [[__brand]] بتاعنا، فالنوعين مش بيتبدلوا.

~~~text sol.ts
getUser(UserIdSchema.parse("usr_5"));
console.log(UserIdSchema.safeParse("ord_1").success);
~~~

- [[parse]] بيفحص ويرجّع قيمة branded، فـ [[getUser]] قبلها.
- [[safeParse("ord_1").success]]: [[false]]، يعني الـ brand مش بيتدّى من غير فحص.

ولما جرّبنا [[getUser("usr_1")]]:

~~~text الناتج
sol.ts(9,9): error TS2345: Argument of type 'string' is not assignable to parameter of type 'string & $brand<"UserId">'.
  Type 'string' is not assignable to type '$brand<"UserId">'.
~~~

---

## الخلاصة

| | بإيدك | بـ Zod |
|---|---|---|
| النوع | [[Brand<string, "UserId">]] | [[z.infer<typeof Schema>]] |
| الفحص | دالة [[toUserId]] فيها [[as]] مرة واحدة | [[.brand<"UserId">()]] بعد القواعد |
| وقت التشغيل | string عادي | string عادي |

- الحماية في اتجاه واحد: string عادي مش هيدخل مكان UserId، و UserId يدخل مكان string عادي.
- اختار طريقة واحدة في المشروع، لأن الاتنين مش بيتبدلوا.`,
          lines: [
            R`helper: النوع الأصلي وعلامة باسم. و [[__brand]] مش موجودة وقت التشغيل.`,
            "string معلّم UserId.",
            "string معلّم OrderId.",
            "الباب الوحيد لـ UserId: دالة بتفحص.",
            "الفحص الحقيقي.",
            R`[[as]] هنا مقبولة: مكان واحد، وبعد فحص.`,
            "قفلة.",
            "دالة مستنية UserId بس.",
            "UserId متفحص.",
            "OrderId (هنا بـ as للتبسيط).",
            "مقبول.",
            "مرفوض: نفس الـ string بس العلامة مختلفة.",
            R`مرفوض: لازم يعدّي على [[toUserId]] الأول.`
          ],
          sol: R`[[uid.toUpperCase()]] بتشتغل وبترجع [[USR_123]]: [[UserId]] لسه string ونوع زيادة مش موجود وقت التشغيل.

ومن Zod النوع بيطلع [[string & $brand<"UserId">]]، مش نفس [[Brand<string, "UserId">]] بتاعنا. عشان كده مش بيتبدلوا: [[getUser(zid)]] بيطلّع Property '__brand' is missing، والعكس برضه خطأ. اختار طريقة واحدة في المشروع. و [[UserIdSchema.safeParse("ord_1").success]] بترجع [[false]]، يعني Zod بيفحص فعلًا قبل ما يدّي الـ brand.`,
          solCode: R`import * as z from "zod";
const UserIdSchema = z.string().startsWith("usr_").brand<"UserId">();
type UserId = z.infer<typeof UserIdSchema>; // string & $brand<"UserId">
function getUser(id: UserId) { return id; }
getUser(UserIdSchema.parse("usr_5"));
// getUser("usr_1"); // خطأ: string عادي مش UserId
console.log(UserIdSchema.safeParse("ord_1").success); // false`
        }
      ]
    }
]);

// تكملة تاب pydata: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pydata/01.js (شرح حقول الدرس في أوله)
MORE("pydata", [
    {
      t: "pandas: تقرا الداتا وتفحصها",
      l: 1,
      n: "DataFrame جدول أعمدته Series، بتقراه من CSV أو Excel أو JSON، وأول حاجة تعملها إنك تبص عليه قبل ما تصدّقه",
      items: [
        {
          cmd: "read_csv",
          title: "تقرا CSV و Excel و JSON في DataFrame",
          desc: R`[[pd.read_csv("file.csv")]] بيقرا الملف في **DataFrame**: جدول ليه أعمدة بأسامي وصفوف بأرقام (index)، وكل عمود فيه **Series** بنوع واحد. ومعاه [[pd.read_excel]] (محتاج [[openpyxl]]) و [[pd.read_json]].

أهم الخيارات: [[dtype={"phone": str}]] عشان الأرقام اللي أولها صفر متضيعش، و [[encoding="cp1256"]] لملفات Excel العربي القديمة، و [[usecols]] و [[nrows]] عشان تقرا جزء بس.`,
          example: R`import pandas as pd
df = pd.read_csv("orders_raw.csv")
print(df.shape)
print(df.head(3))
print(df.dtypes)
print(type(df), type(df["city"]))
print(pd.read_csv("phones.csv"))
print(pd.read_csv("phones.csv", dtype={"phone": str}))
win = pd.read_csv("orders_win.csv", encoding="cp1256")
xl = pd.read_excel("orders.xlsx", sheet_name="يناير")
items = pd.read_json("items.json")
print(pd.read_csv("orders_raw.csv", usecols=["order_id", "qty"], nrows=2))`,
          try: R`اعمل ملف [[students.csv]] فيه عمود [[id]] قيمه زي [[007]] و [[012]]، وعمود [[name]] بأسامي عربي. اقراه مرة عادي ومرة بـ [[dtype={"id": str}]] وقارن. وبعدين احفظه من Notepad بـ encoding تاني (ANSI على ويندوز عربي) وشوف الخطأ اللي بيطلع.`,
          flag: "script",
          deep: {
            why: R`أغلب الداتا اللي هتقابلها في الشغل جاية في ملفات: CSV من نظام تاني، أو Excel من المحاسبة، أو JSON من API. و [[read_csv]] بيحوّل أي واحد منهم لجدول واحد تقدر تفلتره وتجمعه وترسمه. ومشاكل القراية (الصفر اللي ضاع، والعربي اللي باظ) لو عدّت من هنا هتبوّظ كل اللي بعدها من غير ما تاخد بالك.`,
            how: R`[[read_csv]] بيقرا أول سطر كأسامي أعمدة، وبيخمّن نوع كل عمود من قيمه: لو كله أرقام صحيحة يبقى [[int64]]، وفيه عشري يبقى [[float64]]، وغير كده نص. التخمين ده هو اللي بيشيل الصفر من [[01012345678]] (بيبقى رقم [[1012345678]]). الحل إنك تقوله النوع بنفسك بـ [[dtype]].

في pandas 3 النصوص بقى ليها نوع خاص اسمه [[str]] (قبل كده كانت [[object]])، والـ Series بتاعة نص بتطبع [[dtype: str]].

الـ encoding: الملف مجرد bytes، والـ encoding هو القاموس اللي بيحوّلها لحروف. pandas بيفترض UTF-8. ملفات Excel العربي القديمة ("CSV" من ويندوز عربي) غالبًا [[cp1256]]، فلو قريتها كـ UTF-8 هتاخد [[UnicodeDecodeError]].

[[read_excel]] بيقرا شيت واحد ([[sheet_name]] بالاسم أو الرقم، و [[sheet_name=None]] بيرجّع dict فيه كل الشيتات). و [[read_json]] بيفهم list من objects (كل object صف).`,
            when: R`أول سطر في أي تحليل. ولو الملف كبير: [[usecols]] تقرا الأعمدة اللي محتاجها بس، و [[nrows=1000]] تجرّب على عينة، و [[chunksize]] تقرا حتة حتة (درس الأداء). ولو الداتا في قاعدة بيانات: [[pd.read_sql]] (المستوى ٢).`,
            mistakes: R`تسيب pandas يخمّن نوع أرقام التليفونات والأكواد البريدية وأكواد المنتجات فيضيع الصفر اللي على الشمال. وتفتح CSV عربي بالـ encoding الغلط وتلاقي رموز غريبة. وتنسى [[sep=";"]] لملفات Excel الأوروبي فيطلع كل الصف عمود واحد. وتفتكر إن [[read_excel]] شغال من غير [[pip install openpyxl]].`
          },
          teach: R`## المثال بيعمل إيه؟

بنقرا ملف طلبات حقيقي الشكل ومتلخبط ([[orders_raw.csv]])، ونبص على شكله وأنواعه، وبعدين نشوف ٣ مشاكل قراية مشهورة (الصفر اللي بيضيع، والـ encoding، والأنواع)، ونقرا Excel و JSON. اتشغّل بـ pandas 3.1 و Python 3.13 في Docker.

الملف ده هنستخدمه في الدروس الجاية لحد ما ننضفه خالص، فاحفظه زي ما هو بـ UTF-8:

~~~text orders_raw.csv
order_id,date,customer,city,phone,product,qty,price,status
1001,2026-01-05,أحمد علي,القاهرة,01012345678,شاي,2,"1,200 ج.م",تم
1002,05/01/2026,سارة محمد,القاهره,٠١١٢٣٤٥٦٧٨٩,بن,١,350,تم
1003,2026-01-07, محمود حسن ,Cairo,+201234567890,سكر,5,90,ملغي
1004,2026-01-07,منى إبراهيم,الإسكندرية,01155555555,شاي,,1200,تم
1005,٢٠٢٦-٠١-٠٩,يوسف أحمد,اسكندرية,0100 111 2222,بن,3,350 جنيه,تم
1003,2026-01-07, محمود حسن ,Cairo,+201234567890,سكر,5,90,ملغي
1006,2026-01-10,هبة سمير,الجيزة,,زيت,2,,تم
1007,not a date,عمر خالد,giza,01099998888,زيت,1,150,قيد التنفيذ
1008,2026-01-12,ليلى فؤاد,القاهرة,01222223333,شاي,4,1200,تم
~~~

فيه تواريخ بـ ٣ أشكال، وأرقام عربي (٠١٢)، ومدن مكتوبة بأكتر من طريقة، وسعر فيه فاصلة وكلمة «ج.م»، وخلايا فاضية، وصف متكرر. ده الطبيعي في الشغل. و [[,"1,200 ج.م",]] بين علامتين تنصيص لأن جواها فاصلة، والتنصيص بيقول للـ CSV «دي خلية واحدة».

---

## ١. القراية وأول نظرة

~~~python
import pandas as pd
df = pd.read_csv("orders_raw.csv")
print(df.shape)
print(df.head(3))
~~~

~~~text الناتج
(9, 9)
   order_id        date     customer     city          phone product qty      price status
0      1001  2026-01-05     أحمد علي  القاهرة    01012345678     شاي   2  1,200 ج.م     تم
1      1002  05/01/2026    سارة محمد  القاهره    ٠١١٢٣٤٥٦٧٨٩      بن   ١        350     تم
2      1003  2026-01-07   محمود حسن     Cairo  +201234567890     سكر   5         90   ملغي
~~~

- [[df]] الاسم المعتاد لأي DataFrame.
- [[shape]] = [[(9, 9)]]: ٩ صفوف و ٩ أعمدة. سطر العناوين مش محسوب.
- [[head(3)]]: أول ٣ صفوف (من غير رقم: ٥). والعمود اللي على الشمال خالص ([[0 1 2]]) ده الـ **index**: رقم الصف اللي pandas عمله لوحده، مش من الملف.

> لو الترمنال ضيق pandas بيخبّي أعمدة من النص ويكتب مكانها [[...]] وتحت [[[2 rows x 9 columns]]]. النواتج في التاب ده اتطبعت بعرض ١٢٠ حرف. عشان تشوف كل الأعمدة في سكربت: [[pd.set_option("display.width", 120)]] و [[pd.set_option("display.max_columns", None)]] في أوله. وفي Jupyter الجدول بيظهر HTML كامل من غير المشكلة دي.

---

## ٢. الأنواع: [[dtypes]]

~~~python
print(df.dtypes)
~~~

~~~text الناتج
order_id    int64
date          str
customer      str
city          str
phone         str
product       str
qty           str
price         str
status        str
dtype: object
~~~

| العمود | النوع | ليه |
|---|---|---|
| [[order_id]] | [[int64]] | كله أرقام صحيحة |
| [[qty]] | [[str]] مش رقم! | فيه [[١]] بالعربي، و pandas مبيعرفهاش رقم |
| [[price]] | [[str]] | فيه [[1,200 ج.م]] و [[350 جنيه]] |
| [[date]] | [[str]] | pandas مبيحوّلش التواريخ لوحده |

[[str]] ده نوع النصوص الجديد في pandas 3 (في pandas 2 كان بيطبع [[object]]). والسطر الأخير [[dtype: object]] نوع الـ Series اللي فيها الأنواع نفسها، مش مهم. الخلاصة: الأرقام اللي فيها أي حاجة غريبة بتتقري نص، وده اللي هنصلّحه في درس [[astype و to_datetime]].

---

## ٣. DataFrame و Series

~~~python
print(type(df), type(df["city"]))
~~~

~~~text الناتج
<class 'pandas.DataFrame'> <class 'pandas.Series'>
~~~

[[df["city"]]] (اسم العمود بين قوسين مربعين) بيرجّع **Series**: عمود واحد ومعاه الـ index. الـ DataFrame = Series كتير جنب بعض، شايلين نفس الـ index.

---

## ٤. الصفر اللي بيضيع

ملف [[phones.csv]] فيه:

~~~text phones.csv
name,phone
A,01012345678
B,01155555555
~~~

~~~python
print(pd.read_csv("phones.csv"))
print(pd.read_csv("phones.csv", dtype={"phone": str}))
~~~

~~~text الناتج
  name       phone
0    A  1012345678
1    B  1155555555
  name        phone
0    A  01012345678
1    B  01155555555
~~~

المرة الأولى pandas شاف أرقام بس، فقراها int، والصفر اللي على الشمال **اختفى**. [[dtype={"phone": str}]] (dict: اسم العمود ونوعه) بيقوله «ده نص، متخمّنش». القاعدة: أي حاجة مش هتعمل عليها حساب (تليفون، رقم قومي، كود) تتقري نص. (في ملفنا الأصلي التليفونات فيها [[+]] ومسافات فاتقرت نص لوحدها.)

---

## ٥. الـ encoding

ملف [[orders_win.csv]] محفوظ بـ [[cp1256]] (الـ encoding العربي بتاع ويندوز القديم، اللي Excel ساعات بيحفظ بيه):

~~~text الناتج: pd.read_csv("orders_win.csv")
UnicodeDecodeError: 'utf-8' codec can't decode byte 0xc3 in position 0: invalid continuation byte
~~~

pandas افترض UTF-8، والـ byte ده ([[0xc3]]) معناه حرف عربي في cp1256 بس مش sequence سليمة في UTF-8. الحل:

~~~python
win = pd.read_csv("orders_win.csv", encoding="cp1256")
~~~

~~~text الناتج: print(win)
   order_id customer
0         1     أحمد
1         2     سارة
~~~

| الـ encoding | هتقابله فين |
|---|---|
| [[utf-8]] | الافتراضي، وأي حاجة حديثة |
| [[utf-8-sig]] | UTF-8 وفي أوله BOM (Excel بيحفظ بيه «CSV UTF-8») |
| [[cp1256]] | ويندوز عربي القديم |

---

## ٦. Excel و JSON

~~~python
xl = pd.read_excel("orders.xlsx", sheet_name="يناير")
items = pd.read_json("items.json")
~~~

~~~text الناتج: print(xl) و print(items)
   order_id customer  total
0      2001     كريم    450
1      2002    نادية   1200
  sku name  price
0  T1  شاي     60
1  C1   بن    350
~~~

- [[read_excel]] محتاج [[pip install openpyxl]] لملفات [[.xlsx]]. و [[sheet_name]] اسم الشيت (أو رقمه من صفر)، و [[sheet_name=None]] بيرجّع dict فيه كل الشيتات.
- [[items.json]] كان list من objects: [[[{"sku": "T1", "name": "شاي", "price": 60}, ...]]]. كل object بقى صف، والمفاتيح بقت أعمدة. (لو الـ JSON متداخل جواه objects: [[pd.json_normalize]].)

---

## ٧. تقرا جزء بس

~~~python
print(pd.read_csv("orders_raw.csv", usecols=["order_id", "qty"], nrows=2))
~~~

~~~text الناتج
   order_id qty
0      1001   2
1      1002   ١
~~~

[[usecols]] الأعمدة اللي عايزها بس، و [[nrows]] أول كام صف. مع ملف فيه ملايين الصفوف ده الفرق بين ثانية ودقيقة، وبين ذاكرة تكفي وذاكرة تخلص.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| CSV | [[pd.read_csv("f.csv")]] |
| Excel (شيت معيّن) | [[pd.read_excel("f.xlsx", sheet_name="...")]] |
| JSON | [[pd.read_json("f.json")]] |
| عمود يفضل نص | [[dtype={"col": str}]] |
| عربي قديم | [[encoding="cp1256"]] |
| فاصل غير الفاصلة | [[sep=";"]] |
| جزء بس | [[usecols=[...]]] و [[nrows=n]] |

- بعد أي قراية: [[shape]] و [[head()]] و [[dtypes]]. لو عمود أرقام طلع [[str]] يبقى فيه حاجة غريبة.`,
          lines: [
            R`pandas باسمها المختصر [[pd]].`,
            R`يقرا الملف في DataFrame.`,
            R`[[(9, 9)]]: صفوف وأعمدة.`,
            "أول ٣ صفوف.",
            R`نوع كل عمود: [[qty]] و [[price]] طلعوا نص.`,
            R`[[DataFrame]] والعمود الواحد [[Series]].`,
            "التليفون اتقرا رقم والصفر ضاع.",
            R`[[dtype]]: العمود ده نص، والصفر فضل.`,
            R`ملف عربي محفوظ بـ cp1256.`,
            R`شيت اسمه «يناير» من ملف Excel (محتاج openpyxl).`,
            "list من objects بقت جدول.",
            "عمودين وأول صفين بس."
          ],
          sol: R`من غير [[dtype]] عمود [[id]] بيتقري [[int64]] و [[007]] بتبقى [[7]] و [[012]] بتبقى [[12]]. ومع [[dtype={"id": str}]] بيفضلوا زي ما هما. ولو حفظت الملف بـ ANSI على ويندوز عربي (يعني cp1256) وقريته عادي هتاخد [[UnicodeDecodeError: 'utf-8' codec can't decode byte ...]]، والحل [[encoding="cp1256"]].`,
          solCode: R`import pandas as pd
print(pd.read_csv("students.csv"))                      # id: 7, 12
print(pd.read_csv("students.csv", dtype={"id": str}))   # id: 007, 012
print(pd.read_csv("students.csv", encoding="cp1256"))   # لو الملف ANSI`
        },
        {
          cmd: "head و info و describe",
          title: "تفحص الداتا: الأنواع والناقص والمكرر والتوزيع",
          desc: R`[[df.info()]] بيقولك لكل عمود عدد القيم الموجودة ونوعه، و [[df.describe()]] بيلخّص الأرقام (المتوسط والأقل والأكبر)، و [[df["city"].value_counts()]] بيعد كل قيمة، و [[df.isna().sum()]] عدد الناقص في كل عمود، و [[df.duplicated().sum()]] الصفوف المتكررة.

دول أول ٥ أوامر بعد أي قراية. هما اللي بيقولولك الداتا محتاجة تنضيف إيه قبل ما تحسب أي حاجة.`,
          example: R`import pandas as pd
df = pd.read_csv("orders_raw.csv")
df.info()
print(df.describe())
print(df.describe(exclude="number"))
print(df["city"].value_counts())
print(df.isna().sum())
print(df.duplicated().sum(), df["order_id"].duplicated().sum())
print(df[df.duplicated(keep=False)])
print(df.tail(2))
print(df.sample(2, random_state=1))`,
          try: R`على نفس الملف: هات عدد الطلبات لكل [[status]] ونسبتها بـ [[value_counts(normalize=True)]]، وهات عدد المنتجات المختلفة بـ [[nunique()]]. وقول من [[value_counts]] بتاعة المدن: كام مدينة حقيقية فيه فعلًا؟`,
          flag: "script",
          deep: {
            why: R`الأرقام اللي بتطلع من داتا وسخة بتبقى غلط وشكلها مقنع. لو في صف متكرر هتحسب الطلب مرتين، ولو «القاهره» و «القاهرة» مدينتين هتطلع القاهرة أقل من حقيقتها. الأوامر دي بتكشف ده في ثواني قبل ما تبني عليه.`,
            how: R`[[info()]] بيطبع (مش بيرجّع حاجة) عدد الصفوف، ولكل عمود [[Non-Null Count]] (القيم الموجودة) و [[Dtype]]، والذاكرة. لو [[Non-Null]] أقل من عدد الصفوف يبقى فيه ناقص.

[[describe()]] من غير باراميتر بيلخّص الأعمدة الرقمية بس: [[count]] و [[mean]] و [[std]] (الانحراف المعياري: القيم بعيدة عن المتوسط قد إيه في المتوسط) و [[min]] و [[25%]] و [[50%]] (الوسيط median) و [[75%]] و [[max]]. و [[exclude="number"]] بيلخّص النصوص: [[unique]] (كام قيمة مختلفة) و [[top]] (الأكتر تكرار) و [[freq]] (اتكررت كام مرة).

[[isna()]] بترجّع DataFrame من True و False، و [[.sum()]] عليها بتعد الـ True في كل عمود (True = 1). و [[duplicated()]] بتعلّم كل صف شبه صف **قبله** بالظبط في كل الأعمدة، و [[keep=False]] بتعلّم كل النسخ.`,
            when: R`بعد أي قراية، وبعد أي merge (عشان تتأكد إن عدد الصفوف متغيرش بالغلط)، وقبل ما تبعت أرقام لحد.`,
            mistakes: R`تكتب [[print(df.info())]] فيطلعلك [[None]] في الآخر ([[info]] بتطبع بنفسها). وتبص على [[describe()]] وتفتكر إن مفيش أعمدة تانية (النصوص مش بتظهر من غير [[exclude]] أو [[include="all"]]). وتعتمد على [[head()]] بس: المشاكل غالبًا في النص أو الآخر، فبص على [[sample()]] و [[tail()]] كمان. وتمسح المكرر بـ [[duplicated()]] على كل الأعمدة والصفين مختلفين في مسافة زيادة بس.`
          },
          teach: R`## المثال بيعمل إيه؟

بنفحص [[orders_raw.csv]] (من الدرس اللي فات) بالأوامر اللي بتكشف مشاكله: الأنواع، والناقص، والمكرر، والقيم المكتوبة بأكتر من شكل. اتشغّل بـ pandas 3.1 في Docker.

---

## ١. [[info()]]: الصورة الكاملة في سطور

~~~python
df.info()
~~~

~~~text الناتج
<class 'pandas.DataFrame'>
RangeIndex: 9 entries, 0 to 8
Data columns (total 9 columns):
 #   Column    Non-Null Count  Dtype
---  ------    --------------  -----
 0   order_id  9 non-null      int64
 1   date      9 non-null      str
 2   customer  9 non-null      str
 3   city      9 non-null      str
 4   phone     8 non-null      str
 5   product   9 non-null      str
 6   qty       8 non-null      str
 7   price     8 non-null      str
 8   status    9 non-null      str
dtypes: int64(1), str(8)
memory usage: 1.4 KB
~~~

| السطر | معناه |
|---|---|
| [[RangeIndex: 9 entries, 0 to 8]] | ٩ صفوف، والـ index أرقام من ٠ لـ ٨ |
| [[Non-Null Count]] | القيم **الموجودة**: [[phone]] و [[qty]] و [[price]] فيهم ٨ من ٩، يعني خلية فاضية في كل واحد |
| [[Dtype]] | [[qty]] و [[price]] نص مع إنهم أرقام، فلازم نحوّلهم |
| [[memory usage]] | الذاكرة اللي الجدول واخدها |

[[info()]] بتطبع بنفسها، فمن غير [[print]].

---

## ٢. [[describe()]]: ملخص الأرقام

~~~text الناتج: print(df.describe())
          order_id
count     9.000000
mean   1004.333333
std       2.345208
min    1001.000000
25%    1003.000000
50%    1004.000000
75%    1006.000000
max    1008.000000
~~~

عمود واحد بس، لأن ده العمود الرقمي الوحيد دلوقتي. وملخص [[order_id]] ملوش معنى أصلًا (رقم الطلب مش كمية)، بس بيعلّمك تقرا الجدول:

| الصف | معناه |
|---|---|
| [[count]] | عدد القيم الموجودة |
| [[mean]] | المتوسط |
| [[std]] | الانحراف المعياري: القيم بعيدة عن المتوسط قد إيه في المتوسط |
| [[min]] و [[max]] | الأصغر والأكبر |
| [[25%]] و [[50%]] و [[75%]] | الربع والنص (الـ median) والتلات أرباع: ربع القيم أقل من [[25%]] |

## ٣. ملخص النصوص

~~~text الناتج: print(df.describe(exclude="number"))
              date     customer     city          phone product qty price status
count            9            9        9              8       9   8     8      9
unique           7            8        7              7       4   6     6      3
top     2026-01-07   محمود حسن   القاهرة  +201234567890     شاي   2    90     تم
freq             3            2        2              2       3   2     2      6
~~~

[[exclude="number"]]: كل الأعمدة ما عدا الأرقام. [[unique]] كام قيمة مختلفة، و [[top]] الأكتر، و [[freq]] كام مرة. وهنا أول مشكلة: [[customer]] فيها ٨ أسامي مختلفة في ٩ صفوف، و «محمود حسن» اتكرر مرتين، و [[city]] فيها ٧ قيم مختلفة مع إن عندنا ٣ مدن بس.

---

## ٤. [[value_counts()]]: عد كل قيمة

~~~text الناتج: print(df["city"].value_counts())
city
القاهرة       2
Cairo         2
القاهره       1
الإسكندرية    1
اسكندرية      1
الجيزة        1
giza          1
Name: count, dtype: int64
~~~

دلوقتي المشكلة واضحة: القاهرة مكتوبة ٣ أشكال (القاهرة، القاهره بالهاء، Cairo)، والإسكندرية شكلين، والجيزة شكلين. لو جمّعنا المبيعات بالمدينة دلوقتي هيطلع ٧ مدن. التصليح في درس «تنضيف داتا حقيقية».

---

## ٥. الناقص والمكرر

~~~text الناتج: print(df.isna().sum())
order_id    0
date        0
customer    0
city        0
phone       1
product     0
qty         1
price       1
status      0
dtype: int64
~~~

[[isna()]] بتحط True مكان كل خلية فاضية، و [[sum()]] بتعدهم (True = 1). نفس الأرقام اللي في [[info]] بس بشكل أوضح.

~~~python
print(df.duplicated().sum(), df["order_id"].duplicated().sum())
print(df[df.duplicated(keep=False)])
~~~

~~~text الناتج
1 1
   order_id        date     customer   city          phone product qty price status
2      1003  2026-01-07   محمود حسن   Cairo  +201234567890     سكر   5    90   ملغي
5      1003  2026-01-07   محمود حسن   Cairo  +201234567890     سكر   5    90   ملغي
~~~

- [[duplicated()]]: True لكل صف نسخة من صف **قبله** في كل الأعمدة. فيه ١.
- [[df["order_id"].duplicated()]]: نفس الفكرة على عمود واحد. رقم طلب متكرر = مشكلة حتى لو باقي الصف مختلف.
- [[keep=False]] بيعلّم كل النسخ (الأصل والمكرر) عشان تشوفهم جنب بعض. و [[df[mask]]] بيجيب الصفوف اللي قصادها True (نفس فكرة numpy).

---

## ٦. [[tail]] و [[sample]]

~~~text الناتج: print(df.tail(2)) و print(df.sample(2, random_state=1))
   order_id        date   customer     city        phone product qty price       status
7      1007  not a date   عمر خالد     giza  01099998888     زيت   1   150  قيد التنفيذ
8      1008  2026-01-12  ليلى فؤاد  القاهرة  01222223333     شاي   4  1200           تم
   order_id        date     customer     city          phone product qty price status
8      1008  2026-01-12    ليلى فؤاد  القاهرة    01222223333     شاي   4  1200     تم
2      1003  2026-01-07   محمود حسن     Cairo  +201234567890     سكر   5    90   ملغي
~~~

[[tail]] آخر صفوف، و [[sample]] صفوف عشوائية، و [[random_state=1]] عشان نفس العينة تطلع كل مرة. [[tail]] هو اللي كشف [[not a date]]: [[head]] لوحده مكانش هيوريها.

---

## الخلاصة: قايمة الفحص

| السؤال | الأمر |
|---|---|
| الأنواع صح؟ فيه ناقص؟ | [[df.info()]] |
| الأرقام منطقية؟ | [[df.describe()]] |
| النصوص مكتوبة بشكل واحد؟ | [[df["col"].value_counts()]] |
| كام ناقص في كل عمود؟ | [[df.isna().sum()]] |
| فيه تكرار؟ | [[df.duplicated().sum()]] |
| شكل الصفوف من النص والآخر؟ | [[df.sample(5)]] و [[df.tail()]] |

اللي اكتشفناه في الملف: نوع [[qty]] و [[price]] غلط، و ٣ خلايا فاضية، وصف متكرر، و ٣ مدن مكتوبين ٧ أشكال، وتاريخ مش تاريخ. ده اللي هنصلّحه في الدروس الجاية.`,
          lines: [
            "pandas.",
            "الملف المتلخبط من الدرس اللي فات.",
            R`الأنواع وعدد الموجود في كل عمود (بتطبع لوحدها).`,
            "ملخص الأعمدة الرقمية.",
            R`ملخص النصوص: [[unique]] و [[top]] و [[freq]].`,
            R`عد كل مدينة: ٣ مدن مكتوبين ٧ أشكال.`,
            "عدد الناقص في كل عمود.",
            "الصفوف المتكررة كلها، ورقم الطلب المتكرر.",
            R`[[keep=False]]: هات الأصل والمكرر جنب بعض.`,
            "آخر صفين.",
            R`صفين عشوائيين، و [[random_state]] يثبّت العينة.`
          ],
          sol: R`[[df["status"].value_counts()]]: [[تم]] ٦، و [[ملغي]] ٢، و [[قيد التنفيذ]] ١. ومع [[normalize=True]] بتبقى نسب: [[0.666667]] و [[0.222222]] و [[0.111111]] (مجموعهم ١). و [[df["product"].nunique()]] = [[4]] (شاي وبن وسكر وزيت).

والمدن: [[value_counts]] طلّع ٧ قيم، بس الحقيقية ٣ بس: القاهرة (القاهرة و القاهره و Cairo = ٤ صفوف بالمكرر)، والإسكندرية (الإسكندرية و اسكندرية)، والجيزة (الجيزة و giza).`,
          solCode: R`import pandas as pd
df = pd.read_csv("orders_raw.csv")
print(df["status"].value_counts())
print(df["status"].value_counts(normalize=True))
print(df["product"].nunique())    # 4`
        },
        {
          cmd: "loc و iloc و filter",
          title: "تختار أعمدة وصفوف، وتفلتر بشرط، وتضيف عمود",
          desc: R`[[df["col"]]] عمود، و [[df[["a", "b"]]]] كذا عمود، و [[df.loc[صفوف, أعمدة]]] بالـ **أسامي** (والشرط)، و [[df.iloc[صفوف, أعمدة]]] بالـ **أرقام** (أماكن). والفلترة: [[df[df["price"] > 100]]]، والشروط بتتجمع بـ [[&]] (و) و [[|]] (أو) وكل شرط بين قوسين.

ولما تعدّل صفوف معينة اكتبها في خطوة واحدة: [[df.loc[شرط, "col"] = قيمة]]. في pandas 3 التعديل على نسخة متفلترة ([[df[شرط]["col"] = ...]]) مبيوصلش للأصل أبدًا.`,
          example: R`import pandas as pd
df = pd.DataFrame({
    "product": ["شاي", "بن", "سكر", "زيت", "أرز"],
    "city": ["القاهرة", "الجيزة", "القاهرة", "الإسكندرية", "الجيزة"],
    "price": [60, 350, 45, 150, 40],
    "qty": [10, 2, 30, 4, 25],
})
print(df["price"].max(), df[["product", "price"]].shape)
print(df.loc[1, "product"], df.iloc[1, 0], df.iloc[-1].tolist())
cols = ["product", "price"]
print(df.loc[df["price"] > 100, cols])
print(df[(df["city"] == "القاهرة") & (df["qty"] >= 20)])
print(df[df["city"].isin(["الجيزة", "الإسكندرية"])]["product"].tolist())
print(df.query("price < 100 and city == 'الجيزة'"))
df["total"] = df["price"] * df["qty"]
df.loc[df["qty"] < 5, "note"] = "كمية قليلة"
print(df.sort_values("total", ascending=False).head(3))
cheap = df[df["price"] < 50]
cheap["price"] = 0
print(df["price"].tolist())`,
          try: R`على نفس الجدول: هات المنتجات اللي سعرها بين ٤٠ و ١٠٠ بـ [[between]]، وهات المنتجات اللي **مش** في القاهرة بـ [[~]]. وبعدين خلّي سعر كل منتج تحت ٥٠ صفر في الأصل نفسه (مش في نسخة)، واطبع المتوسط الجديد.`,
          flag: "script",
          deep: {
            why: R`أغلب شغل التحليل «هات الصفوف اللي فيها كذا، والأعمدة دي بس». ولو اتعلمت الطريقة الصح من الأول (mask و [[loc]]) هتكتب سطر واحد بدل loop، وهتتجنب أشهر غلطة في pandas: تعدّل نسخة وتفتكر إنك عدّلت الأصل.`,
            how: R`[[df["price"] > 100]] بترجّع Series من True و False (mask) بنفس الـ index، و [[df[mask]]] بيجيب الصفوف اللي قصادها True. نفس فكرة numpy.

[[&]] و [[|]] و [[~]] بيشتغلوا عنصر عنصر على الـ masks. و [[and]] و [[or]] بتوع Python مبيشتغلوش: بيسألوا «الـ Series كلها True ولا False؟» فبترمي [[ValueError: The truth value of a Series is ambiguous]]. والأقواس حوالين كل شرط لازمة لأن [[&]] أولويته أعلى من [[>]] و [[==]].

[[loc]] بيشتغل بالـ **labels**: اسم الصف (الـ index) واسم العمود، والـ slice فيه بيشمل الآخر ([[loc[0:1]]] = صفين). [[iloc]] بالـ **مكان** زي list عادية، والـ slice مش بيشمل الآخر ([[iloc[0:1]]] = صف واحد)، و [[-1]] آخر صف.

Copy-on-Write (الافتراضي في pandas 3): أي نتيجة فلترة بتتصرف كأنها نسخة مستقلة. فـ [[cheap["price"] = 0]] بيعدّل [[cheap]] بس، و [[df[mask]["price"] = 0]] (اسمها chained assignment) مبتعملش حاجة وبتطلّع [[ChainedAssignmentError]]. التعديل في الأصل: [[df.loc[mask, "price"] = 0]] في خطوة واحدة.`,
            when: R`في كل تحليل: فلترة فترة زمنية أو مدينة أو حالة، واختيار الأعمدة اللي داخلة في تقرير، وإضافة عمود محسوب (إجمالي، نسبة، تصنيف). و [[query]] لما الشرط طويل وعايزه يتقري زي جملة.`,
            mistakes: R`[[and]] بدل [[&]]، أو تنسى الأقواس حوالين كل شرط. وتخلط [[loc]] و [[iloc]] بعد [[sort_values]] (الـ index بيفضل الأصلي، فـ [[loc[0]]] مش أول صف بعد الترتيب). وتعدّل بـ chained assignment وتستغرب إن الأصل متغيرش. وتكتب [[df.price]] بدل [[df["price"]]]: بتشتغل، بس مش مع الأسامي اللي فيها مسافة أو عربي، ومينفعش تعمل بيها عمود جديد.`
          },
          teach: R`## المثال بيعمل إيه؟

جدول منتجات صغير، بنختار منه أعمدة وصفوف بكل الطرق، ونفلتر بشروط، ونضيف أعمدة، ونرتّب، وفي الآخر نشوف ليه التعديل على نسخة متفلترة مبيوصلش للأصل. اتشغّل بـ pandas 3.1 في Docker.

---

## ١. نعمل الجدول من dict

~~~python
df = pd.DataFrame({
    "product": ["شاي", "بن", "سكر", "زيت", "أرز"],
    ...
})
~~~

[[pd.DataFrame(dict)]]: كل مفتاح اسم عمود، وكل list قيم العمود. كل الـ lists لازم نفس الطول (٥). والـ index اتعمل لوحده من ٠ لـ ٤.

---

## ٢. عمود وكذا عمود

~~~python
print(df["price"].max(), df[["product", "price"]].shape)
~~~

~~~text الناتج
350 (5, 2)
~~~

- [[df["price"]]]: قوس واحد = عمود واحد = **Series**، و [[.max()]] أكبر قيمة.
- [[df[["product", "price"]]]]: قوسين = **list** أسامي جوه الأقواس = **DataFrame** فيه العمودين دول. الـ shape [[(5, 2)]].

---

## ٣. [[loc]] و [[iloc]]

~~~python
print(df.loc[1, "product"], df.iloc[1, 0], df.iloc[-1].tolist())
~~~

~~~text الناتج
بن بن ['أرز', 'الجيزة', np.int64(40), np.int64(25)]
~~~

| الكود | بيدوّر بإيه | النتيجة |
|---|---|---|
| [[df.loc[1, "product"]]] | صف اسمه (index) [[1]]، عمود اسمه [[product]] | بن |
| [[df.iloc[1, 0]]] | الصف رقم ١ في المكان، العمود رقم ٠ | بن |
| [[df.iloc[-1]]] | آخر صف (زي list) | الصف كله كـ Series |

هنا الاتنين طلعوا نفس الحاجة لأن الـ index أرقام من ٠ بالترتيب. بعد [[sort_values]] أو فلترة الفرق بيبان: [[loc]] بيدوّر على **الاسم** وده بيفضل ماشي مع الصف، و [[iloc]] على **المكان** الحالي. و [[tolist()]] حوّلت الصف لـ list، والأرقام ظهرت [[np.int64(40)]] لأنها جاية من numpy.

والـ slicing بيختلف: جرّبنا [[df.loc[0:1]]] طلّع **صفين** (٠ و ١، الآخر داخل)، و [[df.iloc[0:1]]] صف واحد (زي Python).

---

## ٤. الفلترة بشرط

~~~python
cols = ["product", "price"]
print(df.loc[df["price"] > 100, cols])
~~~

~~~text الناتج
  product  price
1      بن    350
3     زيت    150
~~~

من جوه لبرة:

1. [[df["price"] > 100]]: mask من True و False لكل صف.
2. [[cols]] list بأسامي الأعمدة اللي عايزينها، و [[df.loc[mask, cols]]]: الصفوف اللي قصادها True، والعمودين دول بس. لاحظ إن الـ index فضل [[1]] و [[3]] (الأصلي).

## ٥. شرطين: [[&]]

~~~python
print(df[(df["city"] == "القاهرة") & (df["qty"] >= 20)])
~~~

~~~text الناتج
  product     city  price  qty
2     سكر  القاهرة     45   30
~~~

[[&]] = «و» عنصر عنصر، و [[|]] = «أو»، و [[~]] = «مش». وكل شرط **لازم** بين قوسين. جرّبنا الغلطتين:

~~~text الناتج: and بدل & ، أو من غير أقواس
ValueError: The truth value of a Series is ambiguous. Use a.empty, a.item(), a.any() or a.all().
~~~

[[and]] بتاع Python بيسأل «الـ Series دي كلها True؟» ومفيش إجابة واحدة. ومن غير أقواس [[100 & df["qty"]]] بيتحسب الأول (أولوية [[&]] أعلى) فالشرط كله بيبوظ بنفس الخطأ.

## ٦. [[isin]] و [[query]]

~~~python
print(df[df["city"].isin(["الجيزة", "الإسكندرية"])]["product"].tolist())
print(df.query("price < 100 and city == 'الجيزة'"))
~~~

~~~text الناتج
['بن', 'زيت', 'أرز']
  product    city  price  qty
4     أرز  الجيزة     40   25
~~~

- [[isin([...])]]: القيمة واحدة من دول (بدل [[|]] كتير). والـ [[["product"]]] بعد الفلترة بياخد العمود ده من النتيجة، و [[tolist()]] list عادية (هنا قراية بس، مفيش تعديل، فده تمام).
- [[query("...")]]: الشرط كنص، وجواه [[and]] و [[or]] عادي. النص العربي جوه بين [[' ']] لأن الـ string الخارجي بـ [[" "]].

---

## ٧. أعمدة جديدة

~~~python
df["total"] = df["price"] * df["qty"]
df.loc[df["qty"] < 5, "note"] = "كمية قليلة"
print(df.sort_values("total", ascending=False).head(3))
~~~

~~~text الناتج
  product     city  price  qty  total        note
2     سكر  القاهرة     45   30   1350         NaN
4     أرز   الجيزة     40   25   1000         NaN
1      بن   الجيزة    350    2    700  كمية قليلة
~~~

- [[df["total"] = ...]]: عمود جديد = سعر × كمية لكل صف (vectorized، من غير for).
- [[df.loc[mask, "note"] = "..."]]: عمود جديد اسمه [[note]]، القيمة اتحطت في الصفوف اللي الكمية فيها أقل من ٥ بس، والباقي [[NaN]] (فاضي).
- [[sort_values("total", ascending=False)]]: ترتيب تنازلي. والـ index فضل الأصلي ([[2 4 1]]): ده اللي بيخلي [[loc]] و [[iloc]] مختلفين بعد الترتيب.

---

## ٨. التعديل على نسخة

~~~python
cheap = df[df["price"] < 50]
cheap["price"] = 0
print(df["price"].tolist())
~~~

~~~text الناتج
[60, 350, 45, 150, 40]
~~~

[[cheap]] نتيجة فلترة، وفي pandas 3 (Copy-on-Write) دي بتتصرف كنسخة مستقلة: عدّلناها، والأصل [[df]] زي ما هو (٤٥ و ٤٠ لسه موجودين). من غير أي تحذير، لأن ده سلوك مقصود.

والأخطر لو كتبتها في سطر واحد (chained assignment):

~~~text الناتج: df[df["price"] < 50]["price"] = 0
ChainedAssignmentError: A value is being set on a copy of a DataFrame or Series through chained assignment.
Such chained assignment never works to update the original DataFrame or Series, ...
Try using '.loc[row_indexer, col_indexer] = value' instead, to perform the assignment in a single step.
~~~

ده تحذير مش خطأ: الكود بيكمل، والأصل **متغيرش**. الصح:

~~~python
df.loc[df["price"] < 50, "price"] = 0
~~~

وبعدها جرّبنا: الأسعار بقت [[[60, 350, 0]]] في الأصل.

> في pandas 2 كان فيه [[SettingWithCopyWarning]] والنتيجة ساعات بتعدّل الأصل وساعات لأ. pandas 3 خلاها قاعدة واحدة: التعديل في الأصل بـ [[loc]] بس.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| عمود / كذا عمود | [[df["a"]]] / [[df[["a", "b"]]]] |
| بالاسم / بالمكان | [[df.loc[row, col]]] / [[df.iloc[i, j]]] |
| فلترة | [[df[df["a"] > 5]]] أو [[df.loc[mask, cols]]] |
| شرطين مع بعض (و) | [[(...) & (...)]] |
| عكس الشرط (مش) | [[~(...)]] |
| واحدة من قايمة | [[df["a"].isin([...])]] |
| عمود محسوب | [[df["c"] = df["a"] * df["b"]]] |
| تعديل صفوف معينة | [[df.loc[mask, "col"] = value]] |
| ترتيب | [[df.sort_values("c", ascending=False)]] |

- «أو» بين شرطين: [[(...) | (...)]]، وكل شرط بين قوسين.
- قوس واحد Series، وقوسين DataFrame.
- [[loc]] أسامي والـ slice شامل الآخر، و [[iloc]] أماكن زي Python.
- التعديل في الأصل بـ [[loc]] في خطوة واحدة، مش على نتيجة فلترة.`,
          lines: [
            "pandas.",
            R`جدول من dict: كل مفتاح عمود...`,
            "اسم المنتج.",
            "المدينة.",
            "السعر.",
            "الكمية.",
            "قفلة الـ dict والـ DataFrame.",
            R`عمود واحد Series، وعمودين DataFrame بـ shape [[(5, 2)]].`,
            R`بالاسم وبالمكان، وآخر صف كـ list.`,
            "الأعمدة اللي عايزينها في list.",
            R`فلترة بشرط، والعمودين دول بس.`,
            R`شرطين بـ [[&]]، وكل شرط بين قوسين.`,
            R`[[isin]]: المدينة واحدة من دول.`,
            R`نفس الفلترة كنص بـ [[query]].`,
            "عمود محسوب للصفوف كلها.",
            R`عمود جديد في الصفوف اللي عدّت الشرط بس، والباقي NaN.`,
            "أعلى ٣ في الإجمالي.",
            "نتيجة فلترة (نسخة).",
            R`التعديل على [[cheap]] بس.`,
            R`الأصل زي ما هو: [[[60, 350, 45, 150, 40]]].`
          ],
          sol: R`[[between(40, 100)]] شاملة الطرفين: شاي (٦٠) وسكر (٤٥) وأرز (٤٠). و [[~(df["city"] == "القاهرة")]] جابت بن وزيت وأرز. وبعد [[df.loc[df["price"] < 50, "price"] = 0]] الأسعار بقت [[[60, 350, 0, 150, 0]]] والمتوسط [[112.0]] (= ٥٦٠ ÷ ٥). لو كتبت [[df[df["price"] < 50]["price"] = 0]] هتاخد [[ChainedAssignmentError]] والمتوسط هيفضل [[129.0]].`,
          solCode: R`print(df[df["price"].between(40, 100)]["product"].tolist())   # ['شاي', 'سكر', 'أرز']
print(df[~(df["city"] == "القاهرة")]["product"].tolist())      # ['بن', 'زيت', 'أرز']
df.loc[df["price"] < 50, "price"] = 0
print(df["price"].tolist(), df["price"].mean())               # [60, 350, 0, 150, 0] 112.0`
        },
      ]
    }
]);

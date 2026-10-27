// تكملة تاب pydata: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pydata/01.js (شرح حقول الدرس في أوله)
MORE("pydata", [
    {
      t: "التجميع والدمج",
      l: 2,
      n: "groupby يلخّص لكل مجموعة، و merge يربط جدولين بمفتاح، و pivot_table يعمل جدول ملخّص زي Excel، و resample يجمّع بالوقت",
      items: [
        {
          cmd: "groupby و agg",
          title: "تلخّص لكل مدينة أو منتج: مجموع وعدد ومتوسط",
          desc: R`[[df.groupby("city")["total"].sum()]] بيقسم الصفوف مجموعات حسب المدينة، وياخد عمود [[total]] من كل مجموعة، ويجمعه. ده نفس [[GROUP BY]] في SQL (درس [[GROUP BY]] في تاب SQL و Prisma).

ولأكتر من ملخص مع بعض بأسامي واضحة: [[.agg(orders=("order_id", "count"), revenue=("total", "sum"))]]. و [[transform("sum")]] بيرجّع ناتج المجموعة جنب كل صف (عشان نسبة الصف من مجموعته).`,
          example: R`import pandas as pd
df = pd.read_csv("sales.csv", parse_dates=["date"])
print(df.head(3))
print(df.groupby("city")["total"].sum().sort_values(ascending=False))
summary = df.groupby("city").agg(
    orders=("order_id", "count"),
    revenue=("total", "sum"),
    avg_order=("total", "mean"),
    max_qty=("qty", "max"),
).round(1)
print(summary)
print(df.groupby(["city", "category"], as_index=False)["total"].sum())
df["city_share"] = df["total"] / df.groupby("city")["total"].transform("sum")
print(df[["city", "total", "city_share"]].head(3).round(4))
print(df.groupby("product")["total"].sum().nlargest(2))`,
          try: R`على [[sales.csv]]: اعمل جدول لكل **منتج** فيه إجمالي الكمية والإيراد، ورتّبه بالإيراد تنازلي. وبعدين هات إيراد كل **شهر** بـ [[df["date"].dt.month]] كمفتاح للـ groupby. أنهي شهر كان الأقل؟`,
          flag: "script",
          deep: {
            why: R`أغلب أسئلة الإدارة «لكل»: مبيعات لكل مدينة، وطلبات لكل عميل، ومتوسط لكل منتج. من غير groupby هتلف بـ for وتعمل dict وتجمع فيه بإيدك. مع groupby سطر واحد، وأسرع بكتير لأنه vectorized.`,
            how: R`groupby بيشتغل في ٣ خطوات اسمها split-apply-combine: **يقسم** الصفوف مجموعات حسب قيمة المفتاح، و**يطبّق** الدالة على كل مجموعة لوحدها، و**يجمع** النتايج في جدول واحد المفتاح فيه بقى الـ index.

[[agg]] بـ named aggregation: كل باراميتر اسمه هو اسم العمود الجديد، وقيمته tuple فيها (العمود، الدالة). الدوال المشهورة: [[sum]] و [[mean]] و [[count]] (بيعد الموجود مش الناقص) و [[size]] (بيعد الصفوف كلها) و [[min]] و [[max]] و [[median]] و [[nunique]] و [[first]].

المفتاح ممكن يبقى أكتر من عمود ([[["city", "category"]]]) فالـ index بيبقى **MultiIndex** (مستويين). و [[as_index=False]] بيخلي المفاتيح أعمدة عادية بدل index، وده أسهل في الحفظ والـ merge.

[[transform]] بيحسب نفس الحاجة لكل مجموعة، بس بيرجّع Series بنفس طول الجدول الأصلي: كل صف جنبه ناتج مجموعته. والصفوف اللي المفتاح فيها ناقص بتتشال من الـ groupby إلا لو [[dropna=False]].`,
            when: R`أي تقرير «لكل حاجة». و [[transform]] للنسبة من المجموعة، أو المقارنة بمتوسط المجموعة ([[df["total"] > df.groupby("city")["total"].transform("mean")]]: الطلبات الأكبر من متوسط مدينتها). ولو عايز النتيجة جدول بمدن في الأعمدة: [[pivot_table]] (الدرس الجاي).`,
            mistakes: R`تنسى [[["total"]]] قبل [[sum()]] فيحاول يجمع كل الأعمدة. وتستخدم [[count]] وانت عايز عدد الصفوف وفيه ناقص (الفرق بين [[count]] و [[size]]). وتنسى إن الصفوف اللي مفتاحها NaN اتشالت من الملخص من غير ما تقول (الإجمالي يطلع أقل). وتعمل [[apply]] بدالة Python على كل مجموعة وفيه دالة جاهزة أسرع.`
          },
          teach: R`## المثال بيعمل إيه؟

بنلخّص ٦٠٠ طلب (٦ شهور، ٣ مدن، ٥ منتجات): إجمالي كل مدينة، وجدول ملخص فيه كذا رقم لكل مدينة، والتجميع بمفتاحين، ونسبة كل طلب من مدينته، وأعلى منتجين. اتشغّل بـ pandas 3.1 في Docker.

الداتا متولدة بسكربت عشوائي بـ seed ثابت، فلو شغّلته عندك هتطلع نفس الأرقام بالظبط. الملف ده هنستخدمه في كل دروس المستوى ٢:

~~~python make_sales.py
import numpy as np
import pandas as pd
rng = np.random.default_rng(7)
n = 600
products = pd.DataFrame({
    "product": ["شاي", "بن", "سكر", "زيت", "أرز"],
    "category": ["مشروبات", "مشروبات", "بقالة", "بقالة", "بقالة"],
    "price": [60, 350, 45, 150, 40],
})
sales = pd.DataFrame({
    "order_id": np.arange(1, n + 1),
    "date": pd.Timestamp("2026-01-01") + pd.to_timedelta(rng.integers(0, 181, n), unit="D"),
    "city": rng.choice(["القاهرة", "الجيزة", "الإسكندرية"], n, p=[0.5, 0.3, 0.2]),
    "product": rng.choice(products["product"], n),
    "qty": rng.integers(1, 11, n),
})
sales = sales.merge(products, on="product").sort_values(["date", "order_id"])
sales["order_id"] = np.arange(1, n + 1)
sales["total"] = sales["qty"] * sales["price"]
sales.to_csv("sales.csv", index=False)
~~~

باختصار: [[rng.integers(0, 181, n)]] رقم يوم عشوائي من أول يناير لآخر يونيو، و [[rng.choice(..., p=[...])]] مدينة عشوائية بنسب (القاهرة ٥٠٪)، و [[merge]] بيجيب السعر والتصنيف لكل منتج (الدرس الجاي)، و [[total]] = الكمية × السعر.

---

## ١. القراية مع التواريخ

~~~python
df = pd.read_csv("sales.csv", parse_dates=["date"])
print(df.head(3))
~~~

~~~text الناتج
   order_id       date        city product  qty category  price  total
0         1 2026-01-01      الجيزة     شاي    3  مشروبات     60    180
1         2 2026-01-01  الإسكندرية     سكر    6    بقالة     45    270
2         3 2026-01-01     القاهرة     شاي    6  مشروبات     60    360
~~~

[[parse_dates=["date"]]]: حوّل العمود ده لتاريخ وانت بتقرا (الشكل هنا ISO ثابت فمفيش تخمين خطر). النوع بقى [[datetime64[us]]].

---

## ٢. أبسط groupby

~~~python
print(df.groupby("city")["total"].sum().sort_values(ascending=False))
~~~

~~~text الناتج
city
القاهرة       189950
الجيزة        128645
الإسكندرية     79175
Name: total, dtype: int64
~~~

من جوه لبرة:

1. [[df.groupby("city")]]: قسّم الـ ٦٠٠ صف ٣ مجموعات. لوحده مبيحسبش حاجة، بيرجّع object مستني تقوله تعمل إيه.
2. [[["total"]]]: من كل مجموعة خد العمود ده بس.
3. [[.sum()]]: اجمعه. النتيجة Series: الـ index المدن، والقيم الإجمالي.
4. [[.sort_values(ascending=False)]]: من الأكبر.

ومجموع التلاتة = ٣٩٧٧٧٠ = [[df["total"].sum()]] بالظبط (اتأكدنا)، يعني مفيش صف ضاع.

---

## ٣. كذا ملخص مع بعض: [[agg]]

~~~python
summary = df.groupby("city").agg(
    orders=("order_id", "count"),
    revenue=("total", "sum"),
    avg_order=("total", "mean"),
    max_qty=("qty", "max"),
).round(1)
~~~

~~~text الناتج
            orders  revenue  avg_order  max_qty
city
الإسكندرية     106    79175      746.9       10
الجيزة         179   128645      718.7       10
القاهرة        315   189950      603.0       10
~~~

| الباراميتر | معناه |
|---|---|
| [[orders=("order_id", "count")]] | عمود جديد اسمه [[orders]] = عدد قيم [[order_id]] في المجموعة |
| [[revenue=("total", "sum")]] | مجموع [[total]] |
| [[avg_order=("total", "mean")]] | متوسط قيمة الطلب |
| [[max_qty=("qty", "max")]] | أكبر كمية في طلب واحد |
| [[.round(1)]] | رقم واحد بعد العلامة |

قراية النتيجة: القاهرة فيها طلبات أكتر بكتير (٣١٥)، بس متوسط الطلب فيها **أقل** (٦٠٣ مقابل ٧٤٧ في الإسكندرية). ده نوع الملاحظة اللي الجدول ده معمول عشانها. (والأرقام عشوائية فمتدوّرش على سبب حقيقي.)

[[count]] بيعد القيم **الموجودة** في العمود، و [[size()]] بيعد الصفوف كلها. هنا الاتنين ١٠٦ و ١٧٩ و ٣١٥ لأن مفيش ناقص، بس في داتا فيها ناقص هيختلفوا.

---

## ٤. مفتاحين

~~~python
print(df.groupby(["city", "category"], as_index=False)["total"].sum())
~~~

~~~text الناتج
         city category   total
0  الإسكندرية    بقالة   26025
1  الإسكندرية  مشروبات   53150
2      الجيزة    بقالة   44995
3      الجيزة  مشروبات   83650
4     القاهرة    بقالة   82800
5     القاهرة  مشروبات  107150
~~~

- list من عمودين: مجموعة لكل **تركيبة** (٣ مدن × ٢ تصنيف = ٦).
- [[as_index=False]]: المفاتيح تفضل أعمدة عادية. من غيرها الـ index بيبقى **MultiIndex** (مستويين: المدينة ثم التصنيف)، وده أصعب في الفلترة والحفظ.

---

## ٥. [[transform]]: ناتج المجموعة جنب كل صف

~~~python
df["city_share"] = df["total"] / df.groupby("city")["total"].transform("sum")
print(df[["city", "total", "city_share"]].head(3).round(4))
~~~

~~~text الناتج
         city  total  city_share
0      الجيزة    180      0.0014
1  الإسكندرية    270      0.0034
2     القاهرة    360      0.0019
~~~

[[transform("sum")]] بيحسب مجموع كل مدينة، بس بدل ما يرجّع ٣ أرقام، بيرجّع ٦٠٠ رقم: لكل صف إجمالي **مدينته**. فالقسمة بقت صف على صف. أول صف: ١٨٠ ÷ ١٢٨٦٤٥ (إجمالي الجيزة) = ٠٫٠٠١٤، يعني الطلب ده ٠٫١٤٪ من مبيعات الجيزة.

## ٦. أعلى قيم

~~~text الناتج: print(df.groupby("product")["total"].sum().nlargest(2))
product
بن     206150
زيت     90900
Name: total, dtype: int64
~~~

[[nlargest(2)]] = أكبر ٢ (أسرع وأوضح من [[sort_values().head()]]).

---

## الخلاصة

| عايز | اكتب |
|---|---|
| رقم واحد لكل مجموعة | [[df.groupby("a")["x"].sum()]] |
| كذا رقم بأسامي | [[df.groupby("a").agg(name=("x", "sum"), ...)]] |
| مفتاحين والنتيجة أعمدة | [[df.groupby(["a", "b"], as_index=False)["x"].sum()]] |
| ناتج المجموعة جنب كل صف | [[df.groupby("a")["x"].transform("sum")]] |
| عدد الصفوف | [[size()]] (و [[count]] للموجود بس) |
| أعلى n | [[.nlargest(n)]] |

- split ثم apply ثم combine: المفتاح بيبقى الـ index إلا لو [[as_index=False]].
- اتأكد إن مجموع المجموعات = المجموع الكلي.`,
          lines: [
            "pandas.",
            R`ملف المبيعات، والتاريخ يتقري تاريخ.`,
            "أول ٣ صفوف.",
            "إجمالي كل مدينة، من الأكبر.",
            R`ملخص لكل مدينة بـ [[agg]]:`,
            "عدد الطلبات...",
            "الإيراد...",
            "متوسط الطلب...",
            "أكبر كمية...",
            "قفلة، وتقريب لرقم واحد.",
            "الجدول.",
            R`مفتاحين، والنتيجة أعمدة عادية.`,
            R`نسبة كل طلب من إجمالي مدينته بـ [[transform]].`,
            "أول ٣ صفوف بالنسبة.",
            "أعلى منتجين في الإيراد."
          ],
          sol: R`لكل منتج بالإيراد: بن ٥٨٩ وحدة و ٢٠٦١٥٠، ثم زيت ٦٠٦ و ٩٠٩٠٠، ثم شاي ٦٣٠ و ٣٧٨٠٠، ثم سكر ٧٣٦ و ٣٣١٢٠، ثم أرز ٧٤٥ و ٢٩٨٠٠. لاحظ إن الأرز أكتر كمية وأقل إيراد (سعره ٤٠).

وبالشهر: ١ = ٦٢٥٥٥، و ٢ = ٦٩٤٨٠، و ٣ = ٧٠١٧٥، و ٤ = ٧٤٨١٥، و ٥ = ٥٢١٩٠، و ٦ = ٦٨٥٥٥. أقل شهر مايو (٥). والـ groupby بيقبل Series كمفتاح مش بس اسم عمود، فـ [[df["date"].dt.month]] اشتغلت من غير ما تعمل عمود جديد.`,
          solCode: R`by_product = df.groupby("product").agg(qty=("qty", "sum"), revenue=("total", "sum"))
print(by_product.sort_values("revenue", ascending=False))
by_month = df.groupby(df["date"].dt.month)["total"].sum()
print(by_month, by_month.idxmin())    # ... 5`
        },
        {
          cmd: "merge و concat",
          title: "تربط جدولين بمفتاح، وتلزق ملفات تحت بعض",
          desc: R`[[orders.merge(customers, on="customer_id", how="left")]] بيجيب لكل طلب بيانات عميله، زي [[JOIN]] في SQL (درس [[LEFT JOIN]] في تاب SQL و Prisma). و [[how]] بتحدد مين يفضل لو ملوش مقابل: [[inner]] (الافتراضي) و [[left]] و [[right]] و [[outer]].

و [[indicator=True]] بيقولك كل صف جه منين، و [[validate="many_to_one"]] بيرمي خطأ لو المفتاح متكرر في جدول المفروض إنه فريد. و [[pd.concat([jan, feb])]] بيلزق جداول **تحت** بعض (ملف لكل شهر).`,
          example: R`import pandas as pd
customers = pd.DataFrame({
    "customer_id": [1, 2, 3, 4],
    "name": ["أحمد", "سارة", "محمود", "منى"],
    "city": ["القاهرة", "الجيزة", "القاهرة", "الإسكندرية"],
})
orders = pd.DataFrame({
    "order_id": [101, 102, 103, 104, 105],
    "customer_id": [1, 1, 2, 3, 9],
    "total": [250, 90, 400, 60, 120],
})
print(orders.merge(customers, on="customer_id"))
print(orders.merge(customers, on="customer_id", how="left"))
full = customers.merge(orders, on="customer_id", how="outer", indicator=True)
print(full["_merge"].value_counts())
print(customers[~customers["customer_id"].isin(orders["customer_id"])])
jan = pd.DataFrame({"order_id": [1, 2], "total": [100, 200]})
feb = pd.DataFrame({"order_id": [3], "total": [50], "coupon": ["EID"]})
print(pd.concat([jan, feb], ignore_index=True))
dup = pd.concat([customers, customers.iloc[[0]]])
print(len(orders.merge(dup, on="customer_id")))
orders.merge(dup, on="customer_id", validate="many_to_one")`,
          try: R`هات لكل **عميل** (الأربعة كلهم، حتى منى اللي ملهاش طلبات) إجمالي اللي اشتراه، ورتّبهم تنازلي. منى لازم تظهر بـ [[0]] مش تختفي. وبعدين جرّب تعمل merge على عمود [[id]] نوعه نص في جدول ورقم في التاني، وشوف الخطأ.`,
          flag: "script",
          deep: {
            why: R`الداتا الحقيقية متقسّمة على جداول (طلبات، عملاء، منتجات) زي قاعدة البيانات بالظبط، والتقرير محتاج يجمعهم. والـ merge الغلط من أخطر الأخطاء: مفتاح متكرر بيضاعف الصفوف فالإجمالي يطلع أكبر من الحقيقي، و inner بيمسح الصفوف اللي ملهاش مقابل فالإجمالي يطلع أقل. والاتنين من غير أي رسالة.`,
            how: R`[[merge]] بيدوّر لكل صف في الشمال على الصفوف اللي ليها نفس قيمة المفتاح في اليمين، ويحطهم جنب بعض. لو لقى ٢ يعمل صفين (ده التكرار). و [[how]]: [[inner]] اللي ليه مقابل في الاتنين بس، و [[left]] كل صفوف الشمال (واللي ملوش مقابل ياخد NaN في أعمدة اليمين)، و [[right]] العكس، و [[outer]] الكل.

لو اسم المفتاح مختلف: [[left_on="customer_id", right_on="id"]]. ولو فيه عمود بنفس الاسم في الاتنين ومش مفتاح، pandas بيزوّد [[_x]] و [[_y]] (غيّرهم بـ [[suffixes=("_order", "_cust")]]).

[[validate]] بيتأكد من شكل العلاقة قبل الـ merge: [["one_to_one"]] أو [["one_to_many"]] أو [["many_to_one"]]. «one» معناها المفتاح فريد في الجدول ده، ولو مش فريد بيرمي [[MergeError]].

[[concat]] مش بيدوّر على مفتاح: بيحط الجداول تحت بعض ويطابق الأعمدة بالاسم، والعمود اللي مش موجود في جدول ياخد NaN. و [[ignore_index=True]] يعمل index جديد من ٠، و [[keys=[...]]] يعلّم كل جزء جه منين.`,
            when: R`[[merge]] لما تجيب معلومة من جدول تاني (اسم العميل، سعر المنتج). و [[how="left"]] هو الأكتر استخدام: الجدول الأساسي يفضل كامل. و [[outer]] مع [[indicator]] لمقارنة قايمتين (مين في دي ومش في دي). و [[concat]] لما عندك ملف لكل شهر أو فرع بنفس الأعمدة.`,
            mistakes: R`مفتاح متكرر في جدول العملاء (نفس العميل مكتوب مرتين) فالطلبات تتضاعف. و [[inner]] الافتراضي يمسح الطلبات اللي عميلها مش موجود من غير ما تحس. ومفتاح نوعه نص في جدول ورقم في التاني (pandas بيرفض). ومسافات زيادة في المفتاح ([[«C1 »]] و [[«C1»]] مش زي بعض). وتعمل [[concat]] على جداول أسامي أعمدتها مختلفة شوية فيطلع عمودين بدل واحد.`
          },
          teach: R`## المثال بيعمل إيه؟

جدول عملاء (٤) وجدول طلبات (٥)، وفيه طلب لعميل رقم ٩ مش موجود، وعميلة (منى) ملهاش طلبات. بنربطهم بكل الطرق ونشوف الفرق، وبنكشف التكرار قبل ما يضاعف الأرقام، وبنلزق ملفين شهريين. اتشغّل بـ pandas 3.1 في Docker.

---

## ١. [[inner]] (الافتراضي)

~~~python
print(orders.merge(customers, on="customer_id"))
~~~

~~~text الناتج
   order_id  customer_id  total   name     city
0       101            1    250   أحمد  القاهرة
1       102            1     90   أحمد  القاهرة
2       103            2    400   سارة   الجيزة
3       104            3     60  محمود  القاهرة
~~~

- [[orders.merge(customers, ...)]]: [[orders]] على الشمال و [[customers]] على اليمين.
- [[on="customer_id"]]: العمود اللي بنطابق بيه (موجود بنفس الاسم في الاتنين).
- أحمد ظهر مرتين لأن ليه طلبين: ده الطبيعي في علاقة one-to-many.
- الطلب ١٠٥ **اختفى** (عميل ٩ مش موجود)، ومنى اختفت. الإجمالي هنا ٨٠٠ بدل ٩٢٠.

## ٢. [[how="left"]]

~~~text الناتج: print(orders.merge(customers, on="customer_id", how="left"))
   order_id  customer_id  total   name     city
0       101            1    250   أحمد  القاهرة
1       102            1     90   أحمد  القاهرة
2       103            2    400   سارة   الجيزة
3       104            3     60  محمود  القاهرة
4       105            9    120    NaN      NaN
~~~

كل الطلبات فضلت، و ١٠٥ خد NaN في الاسم والمدينة. ده غالبًا اللي انت عايزه: الطلبات هي الأساس، والإجمالي ٩٢٠ صح.

| [[how]] | مين بيفضل |
|---|---|
| [[inner]] | اللي ليه مقابل في الاتنين |
| [[left]] | كل الشمال |
| [[right]] | كل اليمين |
| [[outer]] | الكل من الناحيتين |

---

## ٣. [[outer]] و [[indicator]]: مين ناقصه إيه

~~~python
full = customers.merge(orders, on="customer_id", how="outer", indicator=True)
print(full["_merge"].value_counts())
~~~

~~~text الناتج
_merge
both          4
left_only     1
right_only    1
Name: count, dtype: int64
~~~

[[indicator=True]] زوّد عمود اسمه [[_merge]]: [[both]] ليه مقابل، و [[left_only]] في الشمال بس (منى: عميلة ملهاش طلبات)، و [[right_only]] في اليمين بس (طلب ١٠٥: طلب عميله مش موجود). ده أسرع طريقة تراجع بيها قايمتين على بعض.

## ٤. من غير merge: [[isin]]

~~~text الناتج: print(customers[~customers["customer_id"].isin(orders["customer_id"])])
   customer_id name        city
3            4  منى  الإسكندرية
~~~

العملاء اللي رقمهم **مش** ([[~]]) في أرقام الطلبات: اللي عمرهم ما اشتروا.

---

## ٥. [[concat]]: تحت بعض

~~~python
print(pd.concat([jan, feb], ignore_index=True))
~~~

~~~text الناتج
   order_id  total coupon
0         1    100    NaN
1         2    200    NaN
2         3     50    EID
~~~

- الأعمدة اتطابقت بالاسم، و [[coupon]] موجود في فبراير بس فيناير خد NaN.
- [[ignore_index=True]]: index جديد ٠ و ١ و ٢. من غيرها هيبقى ٠ و ١ و ٠ (كل جدول بالـ index بتاعه)، وده بيلخبط [[loc]] بعد كده.
- ملف لكل شهر في فولدر: [[pd.concat([pd.read_csv(f) for f in sorted(Path("data").glob("*.csv"))], ignore_index=True)]] (درس [[glob و rglob]] في تاب Python).

---

## ٦. فخ المفتاح المتكرر

~~~python
dup = pd.concat([customers, customers.iloc[[0]]])
print(len(orders.merge(dup, on="customer_id")))
~~~

~~~text الناتج
6
~~~

- [[customers.iloc[[0]]]]: الصف الأول كـ DataFrame (القوسين المزدوجين = list فيها مكان واحد، فبيرجّع جدول مش Series).
- [[dup]]: جدول العملاء وأحمد متكرر فيه (اللي بيحصل لما حد يسجّل مرتين).
- الـ inner كان ٤ صفوف، بقى ٦: طلبات أحمد الاتنين اتضاعفوا لأن كل طلب لقى **اتنين** أحمد. إجمالي أحمد بقى ٦٨٠ بدل ٣٤٠، ومن غير أي تحذير.

الحماية: [[validate]].

~~~python
orders.merge(dup, on="customer_id", validate="many_to_one")
~~~

~~~text الناتج
MergeError: Merge keys are not unique in right dataset; not a many-to-one merge
~~~

[[many_to_one]]: «كتير في الشمال (طلبات كتير لنفس العميل) مقابل واحد في اليمين (العميل فريد)». اليمين طلع فيه تكرار فرفض. مع [[customers]] الأصلي نفس السطر عدّى وطلّع ٤ صفوف.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| معلومة من جدول تاني والأساس يفضل كامل | [[a.merge(b, on="key", how="left")]] |
| مفتاح باسمين مختلفين | [[left_on="x", right_on="y"]] |
| مين ناقصه إيه | [[how="outer", indicator=True]] |
| تتأكد إن المفتاح فريد | [[validate="many_to_one"]] |
| جداول تحت بعض | [[pd.concat([a, b], ignore_index=True)]] |

- بعد أي merge: قارن عدد الصفوف والإجمالي باللي قبله.`,
          lines: [
            "pandas.",
            "جدول العملاء:",
            "رقم العميل (المفتاح، فريد).",
            "الاسم.",
            "المدينة.",
            "قفلة.",
            "جدول الطلبات:",
            "رقم الطلب.",
            R`رقم العميل: ١ مكرر (طلبين)، و ٩ مش موجود.`,
            "قيمة الطلب.",
            "قفلة.",
            R`[[inner]]: طلب ١٠٥ ومنى اختفوا.`,
            R`[[left]]: كل الطلبات، و ١٠٥ بـ NaN.`,
            R`[[outer]] مع علامة كل صف جه منين.`,
            R`[[both]] ٤ و [[left_only]] ١ و [[right_only]] ١.`,
            "العملاء اللي ملهمش طلبات.",
            "يناير.",
            R`فبراير وفيه عمود زيادة [[coupon]].`,
            "تحت بعض بـ index جديد.",
            "جدول عملاء فيه أحمد مرتين.",
            "الصفوف بقت ٦ بدل ٤: التكرار ضاعف الطلبات.",
            R`[[validate]] بيرفض: [[MergeError]] (آخر سطر عشان بيوقف السكربت).`
          ],
          sol: R`ابدأ من [[customers]] بـ [[how="left"]] عشان كل العملاء يفضلوا، وبعدين groupby. منى بتاخد [[total]] = NaN، و [[sum()]] بيتجاهل الـ NaN فبيطلع [[0.0]]. النتيجة: سارة ٤٠٠، أحمد ٣٤٠، محمود ٦٠، منى ٠. (والأرقام float لأن NaN دخل العمود.)

ولو المفتاح نص في جدول ورقم في التاني: [[ValueError: You are trying to merge on str and int64 columns for key 'id'. If you wish to proceed you should use pd.concat]]. الحل: وحّد النوع قبلها، مثلًا [[df["id"] = df["id"].astype(int)]].`,
          solCode: R`spend = (customers.merge(orders, on="customer_id", how="left")
         .groupby("name", as_index=False)["total"].sum()
         .sort_values("total", ascending=False))
print(spend)
#     name  total
# 1   سارة  400.0
# 0   أحمد  340.0
# 2  محمود   60.0
# 3    منى    0.0`
        },
        {
          cmd: "pivot_table و melt",
          title: "جدول ملخص زي Pivot Table في Excel، وتحويل عريض لطويل",
          desc: R`[[df.pivot_table(index="month", columns="city", values="total", aggfunc="sum")]] بيعمل جدول: الشهور صفوف، والمدن أعمدة، وفي كل خانة إجمالي الشهر ده في المدينة دي. و [[margins=True]] بيزوّد صف وعمود للإجمالي. و [[pd.crosstab]] نفس الفكرة للعدّ.

و [[melt]] العكس: جدول «عريض» (عمود لكل شهر) يبقى «طويل» (عمود واحد للشهر وعمود للقيمة)، وده الشكل اللي groupby والرسم بيحبوه.`,
          example: R`import pandas as pd
df = pd.read_csv("sales.csv", parse_dates=["date"])
df["month"] = df["date"].dt.to_period("M")
table = df.pivot_table(index="month", columns="city", values="total", aggfunc="sum", margins=True, margins_name="الإجمالي")
print(table)
print(pd.crosstab(df["city"], df["category"]))
print(pd.crosstab(df["city"], df["category"], normalize="index").round(2))
wide = pd.DataFrame({"product": ["شاي", "بن"], "jan": [100, 200], "feb": [120, 180]})
long = wide.melt(id_vars="product", var_name="month", value_name="sales")
print(long)
print(long.pivot(index="product", columns="month", values="sales"))`,
          try: R`اعمل جدول المنتجات صفوف والمدن أعمدة، وفي كل خانة إجمالي **الكمية**. وبعدين حوّله نسب: كل منتج، المدن بتاخد قد إيه من كميته (الصف مجموعه ١). أنهي منتج القاهرة بتاخد أكبر نسبة منه؟`,
          flag: "script",
          deep: {
            why: R`المدير مش عايز ١٨ صف (٦ شهور × ٣ مدن) تحت بعض، عايز جدول يقراه بعينه: الشهور نازلة والمدن جنب بعض والإجمالي في الآخر. ده بالظبط الـ Pivot Table بتاع Excel، بس هنا بيتعمل بسطر وبيتعاد على داتا الشهر الجاي من غير ما تسحب وتحدد.`,
            how: R`[[pivot_table]] = groupby على مفتاحين ([[index]] و [[columns]]) وبعدين «يفرد» المفتاح التاني أعمدة. [[values]] العمود اللي بيتحسب، و [[aggfunc]] الدالة ([["sum"]] أو [["mean"]] أو [["count"]] أو list منهم). والخانة اللي ملهاش داتا بتبقى NaN إلا لو [[fill_value=0]].

[[crosstab(a, b)]] بيعد كل تركيبة من قيمتين. و [[normalize="index"]] بيقسم كل صف على مجموعه (كل صف يبقى ١)، و [[="columns"]] كل عمود، و [[=True]] الكل.

[[pivot]] (من غير [[_table]]) بيعيد الترتيب بس من غير حساب، فلو فيه تكرار في (index, columns) بيرمي [[ValueError: Index contains duplicate entries, cannot reshape]]. و [[melt]] بيعمل العكس: [[id_vars]] الأعمدة اللي تفضل زي ما هي، وكل باقي الأعمدة بتنزل صفوف: اسم العمود القديم في [[var_name]] وقيمته في [[value_name]].

[[dt.to_period("M")]] بيحوّل التاريخ لـ «الشهر» نفسه (period) مش يوم معيّن، فبيتطبع [[2026-01]] وبيترتب صح.`,
            when: R`تقارير شهرية بمقارنة فروع، وأي «جدول × جدول». و [[melt]] لما الداتا جاية من Excel عريضة (عمود لكل شهر أو لكل سنة) وعايز تعمل عليها groupby أو ترسمها بـ seaborn.`,
            mistakes: R`[[pivot]] بدل [[pivot_table]] وفيه تكرار (خطأ). وتنسى [[aggfunc]] فتاخد المتوسط (ده الافتراضي في [[pivot_table]] مش المجموع). وأعمدة الشهور كنص ([[«jan»]] و [[«feb»]]) فبتترتب أبجدي ([[feb]] قبل [[jan]]). وتحفظ الجدول بـ [[margins]] وبعدين تعمل عليه حسابات فالإجمالي يتحسب مرتين.`
          },
          teach: R`## المثال بيعمل إيه؟

بنعمل من [[sales.csv]] (درس [[groupby و agg]]) جدول إيراد شهري × مدينة بإجماليات، وجدول عدّ للطلبات بالمدينة والتصنيف (أرقام ونسب)، وبعدين بنحوّل جدول صغير من عريض لطويل وبالعكس. اتشغّل بـ pandas 3.1 في Docker.

---

## ١. عمود الشهر

~~~python
df["month"] = df["date"].dt.to_period("M")
~~~

[[to_period("M")]] (M = Month): بدل ٢٠٢٦-٠١-١٥ بيبقى [[2026-01]] ونوعه [[period[M]]]. كل الطلبات في نفس الشهر بقى ليها نفس القيمة، فينفع نجمّع بيها، وبتترتب صح كتواريخ.

---

## ٢. [[pivot_table]]

~~~python
table = df.pivot_table(index="month", columns="city", values="total", aggfunc="sum", margins=True, margins_name="الإجمالي")
print(table)
~~~

~~~text الناتج
city      الإسكندرية  الجيزة  القاهرة  الإجمالي
month
2026-01        16680   12510    33365     62555
2026-02        15240   29865    24375     69480
2026-03        10645   27940    31590     70175
2026-04        13660   26845    34310     74815
2026-05        13645    6545    32000     52190
2026-06         9305   24940    34310     68555
الإجمالي       79175  128645   189950    397770
~~~

| الباراميتر | دوره |
|---|---|
| [[index="month"]] | قيم الشهر بقت **صفوف** |
| [[columns="city"]] | قيم المدينة بقت **أعمدة** |
| [[values="total"]] | العمود اللي بيتحسب في كل خانة |
| [[aggfunc="sum"]] | الحساب: مجموع. (من غيره الافتراضي **mean**) |
| [[margins=True]] | صف وعمود للإجمالي |
| [[margins_name]] | اسمهم (الافتراضي [[All]]) |

اقرا الجدول: الجيزة في مايو ٦٥٤٥ بس، أقل من ربع أي شهر تاني ليها، وده اللي نزّل إجمالي مايو. ده النوع من الملاحظات اللي الجدول ده بيطلّعه في ثانية. وعمود الإجمالي ٣٩٧٧٧٠ نفس [[df["total"].sum()]].

---

## ٣. [[crosstab]]: عدّ

~~~python
print(pd.crosstab(df["city"], df["category"]))
print(pd.crosstab(df["city"], df["category"], normalize="index").round(2))
~~~

~~~text الناتج
category    بقالة  مشروبات
city
الإسكندرية     65       41
الجيزة        106       73
القاهرة       209      106
category    بقالة  مشروبات
city
الإسكندرية   0.61     0.39
الجيزة       0.59     0.41
القاهرة      0.66     0.34
~~~

- الأول: عدد الطلبات لكل (مدينة، تصنيف). ومجموع صف الإسكندرية ١٠٦ = عدد طلباتها من درس groupby.
- [[normalize="index"]]: كل صف اتقسم على مجموعه، فكل صف مجموعه ١: ٦١٪ من طلبات الإسكندرية بقالة. كده المقارنة بين المدن عادلة رغم إن القاهرة طلباتها أكتر بكتير.

---

## ٤. عريض وطويل: [[melt]]

~~~python
wide = pd.DataFrame({"product": ["شاي", "بن"], "jan": [100, 200], "feb": [120, 180]})
long = wide.melt(id_vars="product", var_name="month", value_name="sales")
print(long)
~~~

~~~text الناتج
  product month  sales
0     شاي   jan    100
1      بن   jan    200
2     شاي   feb    120
3      بن   feb    180
~~~

- [[wide]]: الشكل اللي بييجي من Excel غالبًا: عمود لكل شهر.
- [[id_vars="product"]]: العمود اللي يفضل زي ما هو.
- كل عمود تاني ([[jan]] و [[feb]]) نزل صفوف: اسمه في عمود [[month]] ([[var_name]]) وقيمته في [[sales]] ([[value_name]]). ٢ منتج × ٢ شهر = ٤ صفوف.

الشكل الطويل هو اللي ينفع معاه [[groupby("month")]] وأي رسم بـ seaborn. القاعدة: كل صف «ملاحظة واحدة»، وكل عمود «نوع معلومة واحد».

## ٥. ونرجّعه: [[pivot]]

~~~text الناتج: print(long.pivot(index="product", columns="month", values="sales"))
month    feb  jan
product
بن       180  200
شاي      120  100
~~~

- رجع عريض. بس [[feb]] جت قبل [[jan]]: الأعمدة نص فاتترتبت أبجديًا. لو الشهور تواريخ أو periods بتترتب صح (زي الجدول الأولاني).
- [[pivot]] مبيحسبش: لو فيه صفين لنفس (منتج، شهر) بيرمي [[ValueError: Index contains duplicate entries, cannot reshape]] (جرّبناها). ساعتها [[pivot_table]] بـ aggfunc.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| جدول ملخص بحساب | [[df.pivot_table(index=, columns=, values=, aggfunc="sum")]] |
| بإجمالي | [[margins=True]] |
| خانات فاضية صفر | [[fill_value=0]] |
| عدّ تركيبات | [[pd.crosstab(a, b)]] |
| نسب كل صف | [[normalize="index"]] |
| عريض لطويل | [[df.melt(id_vars=..., var_name=..., value_name=...)]] |
| طويل لعريض من غير حساب | [[df.pivot(index=, columns=, values=)]] |

- [[pivot_table]] الافتراضي بتاعه mean مش sum.`,
          lines: [
            "pandas.",
            "ملف المبيعات.",
            R`عمود الشهر كـ period: [[2026-01]].`,
            "الشهور صفوف والمدن أعمدة والإيراد في الخانات، مع إجماليات.",
            "الجدول.",
            "عدد الطلبات لكل مدينة وتصنيف.",
            "نفس الجدول نسب، كل صف مجموعه ١.",
            "جدول عريض: عمود لكل شهر.",
            "عريض لطويل: عمود للشهر وعمود للقيمة.",
            "٤ صفوف.",
            R`ورجعناه عريض بـ [[pivot]].`
          ],
          sol: R`[[pivot_table]] بـ [[values="qty"]] و [[aggfunc="sum"]] بيطلّع لكل منتج كميته في كل مدينة (مثلًا الأرز: ٨٧ و ٢٢٠ و ٤٣٨). وأسهل طريقة للنسب [[pd.crosstab]] بـ [[values]] و [[aggfunc]] و [[normalize="index"]]:

أرز: الإسكندرية ٠٫١٢، الجيزة ٠٫٣٠، القاهرة ٠٫٥٩. والقاهرة بتاخد أكبر نسبة من **الأرز** (٥٩٪)، وأقل نسبة من البن (٤٣٪). (الأرقام مقرّبة فممكن الصف يطلع ١٫٠١.)`,
          solCode: R`qty = df.pivot_table(index="product", columns="city", values="qty", aggfunc="sum")
print(qty)
share = pd.crosstab(df["product"], df["city"], values=df["qty"], aggfunc="sum", normalize="index").round(2)
print(share)
print(share["القاهرة"].idxmax())    # أرز`
        },
        {
          cmd: "resample و rolling",
          title: "time series: تجمّع باليوم والأسبوع والشهر، ومتوسط متحرك ونسبة نمو",
          desc: R`لما التاريخ يبقى الـ index، [[resample("D")]] بيجمّع باليوم و [[("W-SAT")]] بالأسبوع (بينتهي السبت) و [[("ME")]] بالشهر (Month End)، وبيعمل صف حتى للأيام اللي مفيهاش بيع. و [[rolling(7).mean()]] متوسط آخر ٧ أيام (بيهدّي التذبذب)، و [[pct_change()]] نسبة التغيير عن اللي قبله، و [[shift(1)]] قيمة امبارح جنب النهارده.

و [[daily.loc["2026-03"]]] بيجيب شهر مارس كله بالنص بس.`,
          example: R`import pandas as pd
df = pd.read_csv("sales.csv", parse_dates=["date"])
daily = df.set_index("date")["total"].resample("D").sum()
print(daily.head())
print(len(daily), daily.loc["2026-03"].sum())
monthly = daily.resample("ME").sum()
print(monthly)
print(monthly.pct_change().round(3))
print(daily.resample("W-SAT").sum().head(3))
print(daily.rolling(7).mean().iloc[5:9].round(1))
print(daily.shift(1).head(3))
ts = pd.Timestamp("2026-03-01 10:00", tz="UTC")
print(ts.tz_convert("Africa/Cairo"))`,
          try: R`من [[daily]]: هات أحسن أسبوع (بينتهي السبت) وإيراده بـ [[idxmax()]] و [[max()]]. وهات المتوسط المتحرك لآخر ٣٠ يوم في آخر يوم في الداتا. وعد كام يوم مفيهوش ولا طلب.`,
          flag: "script",
          deep: {
            why: R`أي داتا ليها تاريخ (مبيعات، زيارات، قراءات حساسات) أول سؤال فيها «ماشية إزاي مع الوقت؟». والجواب محتاج تجميع بفترات متساوية، ومقارنة كل فترة باللي قبلها، وتنعيم الضوضاء اليومية عشان الاتجاه يبان. pandas معمولة أصلًا عشان ده (الاسم جاي من panel data في الاقتصاد).`,
            how: R`[[set_index("date")]] بيخلي التاريخ هو الـ index (DatetimeIndex)، وده شرط [[resample]] (من غيره: [[TypeError: Only valid with DatetimeIndex...]])، أو استخدم [[df.resample("ME", on="date")]].

[[resample]] زي groupby بس المجموعات **فترات وقت** متساوية، وبيعمل كل الفترات من أول تاريخ لآخر تاريخ حتى الفاضية (مجموعها صفر). الرموز: [["D"]] يوم، و [["W-SAT"]] أسبوع بينتهي السبت (الافتراضي [["W"]] = الأحد)، و [["ME"]] آخر الشهر و [["MS"]] أوله، و [["QE"]] ربع سنة، و [["YE"]] سنة، و [["h"]] ساعة.

[[rolling(7)]] نافذة بتتحرك: لكل يوم خد آخر ٧ قيم (هو والـ ٦ قبله) وطبّق الدالة. أول ٦ أيام NaN لأن مفيش ٧ قيم (إلا لو [[min_periods=1]]). [[shift(1)]] بيزق القيم صف لتحت، فكل يوم جنبه قيمة اللي قبله. و [[pct_change()]] = (الحالي - اللي قبله) ÷ اللي قبله.

الـ timezone: [[tz="UTC"]] بيقول الوقت ده بتوقيت إيه، و [[tz_convert]] بيحوّله لمنطقة تانية بنفس اللحظة. واسم منطقة مصر في قاعدة البيانات العالمية [[Africa/Cairo]] (بيعرف التوقيت الصيفي لوحده).`,
            when: R`تقارير يومية وأسبوعية وشهرية، ورسم الاتجاه (المتوسط المتحرك فوق القيم اليومية)، ومقارنة الشهر باللي قبله. وخزّن الأوقات UTC وحوّلها لـ Africa/Cairo في العرض بس (نفس قاعدة درس [[datetime و zoneinfo]] في تاب Python و FastAPI).`,
            mistakes: R`[[groupby(df["date"])]] بدل [[resample]] فالأيام اللي مفيهاش بيع تختفي والمتوسط اليومي يطلع أعلى من الحقيقي. و [[resample("M")]] القديم (في pandas الجديدة اسمه [["ME"]]). والأسبوع الافتراضي بينتهي الأحد وانت عايز أسبوع الشغل المصري. وتقارن [[pct_change]] بين شهر ٣١ يوم وشهر ٢٨ يوم من غير ما تاخد بالك. وتخلط تواريخ من غير timezone بتواريخ UTC.`
          },
          teach: R`## المثال بيعمل إيه؟

بنحوّل الـ ٦٠٠ طلب من [[sales.csv]] لسلسلة يومية، ونجمّعها بالشهر والأسبوع، ونحسب نسبة النمو الشهري، والمتوسط المتحرك، وقيمة امبارح، ونحوّل وقت من UTC لتوقيت القاهرة. اتشغّل بـ pandas 3.1 في Docker.

---

## ١. سلسلة يومية

~~~python
daily = df.set_index("date")["total"].resample("D").sum()
print(daily.head())
~~~

~~~text الناتج
date
2026-01-01     930
2026-01-02     280
2026-01-03    1910
2026-01-04    2795
2026-01-05     760
Freq: D, Name: total, dtype: int64
~~~

من جوه لبرة:

1. [[df.set_index("date")]]: التاريخ بقى الـ index بدل ٠، ١، ٢... (شرط لـ resample).
2. [[["total"]]]: العمود ده بس.
3. [[.resample("D")]]: قسّم بالأيام ([[D]] = Day).
4. [[.sum()]]: إجمالي كل يوم. ٤ طلبات يوم ١ يناير مجموعهم ٩٣٠.

[[Freq: D]] تحت معناها إن الـ index فيه يوم لكل يوم من غير فجوات.

## ٢. الأيام الفاضية والقطع بالشهر

~~~text الناتج: print(len(daily), daily.loc["2026-03"].sum())
181 70175
~~~

- ١٨١ يوم = من ١ يناير لـ ٣٠ يونيو كاملين. بس الطلبات كانت في ١٧١ يوم مختلف بس: [[resample]] عمل صف للـ ١٠ أيام اللي مفيهاش بيع وحط فيهم صفر. لو كنت عملت [[groupby("date")]] كانوا هيختفوا، والمتوسط اليومي يطلع أعلى من الحقيقي.
- [[daily.loc["2026-03"]]]: نص الشهر بس بيجيب كل أيام مارس (partial string indexing). وإجماليها نفس رقم مارس في جدول درس [[pivot_table و melt]].

---

## ٣. بالشهر، ونسبة النمو

~~~python
monthly = daily.resample("ME").sum()
print(monthly.pct_change().round(3))
~~~

~~~text الناتج
date
2026-01-31      NaN
2026-02-28    0.111
2026-03-31    0.010
2026-04-30    0.066
2026-05-31   -0.302
2026-06-30    0.314
Freq: ME, Name: total, dtype: float64
~~~

- [[ME]] = Month End: كل شهر بيتسمى بآخر يوم فيه (و [[MS]] بأوله).
- [[pct_change()]]: فبراير = (٦٩٤٨٠ - ٦٢٥٥٥) ÷ ٦٢٥٥٥ = ٠٫١١١ يعني زيادة ١١٪. ومايو ‎-٣٠٪، ويونيو رجع +٣١٪. يناير NaN لأن مفيش شهر قبله.

## ٤. بالأسبوع

~~~text الناتج: print(daily.resample("W-SAT").sum().head(3))
date
2026-01-03     3120
2026-01-10    12185
2026-01-17    11275
Freq: W-SAT, Name: total, dtype: int64
~~~

[[W-SAT]]: أسبوع بينتهي السبت (الأحد لحد السبت). أول «أسبوع» ٣ أيام بس (١ لـ ٣ يناير) عشان كده رقمه صغير: خد بالك من أول وآخر فترة لما تقارن.

---

## ٥. المتوسط المتحرك

~~~text الناتج: print(daily.rolling(7).mean().iloc[5:9].round(1))
date
2026-01-06       NaN
2026-01-07    1195.0
2026-01-08    1282.1
2026-01-09    1306.4
Freq: D, Name: total, dtype: float64
~~~

- [[rolling(7)]]: لكل يوم خد آخر ٧ أيام (هو و ٦ قبله) و [[mean()]] متوسطهم.
- ٧ يناير أول يوم عنده ٧ أيام كاملة فأول قيمة. و ٦ يناير NaN.
- [[iloc[5:9]]]: الصفوف من ٥ لـ ٨ بالمكان، عشان نشوف أول قيمة بتظهر.

الفايدة: المبيعات اليومية بتطلع وتنزل جامد، والمتوسط المتحرك بيوريك الاتجاه. لما ترسمهم الاتنين (الدرس الجاي) الفرق بيبان.

## ٦. [[shift]]: امبارح جنب النهارده

~~~text الناتج: print(daily.shift(1).head(3))
date
2026-01-01      NaN
2026-01-02    930.0
2026-01-03    280.0
Freq: D, Name: total, dtype: float64
~~~

القيم اتزقت يوم لقدام: يوم ٢ جنبه ٩٣٠ (بتاعة يوم ١). فـ [[daily - daily.shift(1)]] = الفرق عن امبارح، و [[daily.shift(7)]] = نفس اليوم الأسبوع اللي فات.

---

## ٧. الـ timezone

~~~python
ts = pd.Timestamp("2026-03-01 10:00", tz="UTC")
print(ts.tz_convert("Africa/Cairo"))
~~~

~~~text الناتج
2026-03-01 12:00:00+02:00
~~~

- [[pd.Timestamp(..., tz="UTC")]]: لحظة معيّنة بتوقيت UTC.
- [[tz_convert("Africa/Cairo")]]: **نفس اللحظة** بتوقيت القاهرة: الساعة ١٢، و [[+02:00]] الفرق عن UTC في التاريخ ده. ومع عمود كامل: [[s.dt.tz_convert("Africa/Cairo")]]، ولو العمود ملوش timezone أصلًا: [[s.dt.tz_localize("UTC")]] الأول.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تجميع بالوقت | [[s.resample("D" أو "W-SAT" أو "ME").sum()]] |
| من غير set_index | [[df.resample("ME", on="date")["x"].sum()]] |
| فترة بالنص | [[s.loc["2026-03"]]] |
| نسبة التغيير | [[s.pct_change()]] |
| متوسط متحرك | [[s.rolling(7).mean()]] |
| قيمة امبارح | [[s.shift(1)]] |
| توقيت القاهرة | [[tz_convert("Africa/Cairo")]] |

- [[resample]] بيحط صفر للفترات الفاضية، و groupby لأ.`,
          lines: [
            "pandas.",
            "المبيعات والتاريخ تاريخ.",
            "التاريخ index، وإجمالي كل يوم (حتى الأيام الفاضية).",
            "أول ٥ أيام.",
            R`١٨١ يوم، وإجمالي مارس بالنص بس.`,
            R`بالشهر ([[ME]] = آخر الشهر).`,
            "إجمالي كل شهر.",
            "نسبة التغيير عن الشهر اللي قبله.",
            "بالأسبوع المنتهي السبت.",
            "متوسط آخر ٧ أيام.",
            "قيمة امبارح جنب كل يوم.",
            "لحظة بتوقيت UTC.",
            R`نفس اللحظة في القاهرة: [[12:00:00+02:00]].`
          ],
          sol: R`أحسن أسبوع انتهى السبت [[2026-04-18]] بإيراد [[26950]]. والمتوسط المتحرك لآخر ٣٠ يوم في ٣٠ يونيو = [[2285.2]]. والأيام اللي مفيهاش طلبات [[10]]: [[(daily == 0).sum()]] بيعد الـ True (الأيام اللي قيمتها صفر)، وده نفس الفرق بين ١٨١ يوم و ١٧١ تاريخ مختلف في الطلبات.`,
          solCode: R`weekly = daily.resample("W-SAT").sum()
print(weekly.idxmax(), weekly.max())          # 2026-04-18 00:00:00 26950
print(daily.rolling(30).mean().iloc[-1].round(1))   # 2285.2
print((daily == 0).sum())                       # 10`
        },
      ]
    }
]);

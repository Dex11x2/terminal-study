// تكملة تاب pydata: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pydata/01.js (شرح حقول الدرس في أوله)
MORE("pydata", [
    {
      t: "الأداء",
      l: 2,
      n: "vectorize بدل apply و iterrows، والأنواع الأصغر، والقراية حتة حتة، وإمتى polars أو DuckDB تستاهل",
      items: [
        {
          cmd: "vectorize بدل apply",
          title: "ليه apply و iterrows بطيئين، وتكتب نفس الحاجة vectorized",
          desc: R`[[df["price"] * df["qty"]]] على مليون صف خد ٠٫٠٠٤ ثانية، ونفس الحساب بـ [[df.apply(..., axis=1)]] خد ٦ ثواني، و [[iterrows]] على عُشر الصفوف بس خد ٣ ثواني. القاعدة: أي عملية على عمود كله اكتبها على العمود، والشروط بـ [[np.where]] (اختيارين) أو [[np.select]] (أكتر).

وللذاكرة: [[astype("category")]] للنصوص المتكررة، و [[usecols]] و [[dtype]] في القراية، و [[chunksize]] لملف أكبر من الذاكرة.`,
          example: R`import time
import numpy as np
import pandas as pd
rng = np.random.default_rng(0)
n = 1_000_000
df = pd.DataFrame({
    "price": rng.integers(10, 500, n),
    "qty": rng.integers(1, 10, n),
    "city": rng.choice(["القاهرة", "الجيزة", "الإسكندرية"], n),
})
def timeit(label, fn):
    t = time.perf_counter()
    fn()
    print(f"{label:<12}{time.perf_counter() - t:8.3f}s")
timeit("iterrows", lambda: [r.price * r.qty for _, r in df.head(100_000).iterrows()])
timeit("apply", lambda: df.apply(lambda r: r["price"] * r["qty"], axis=1))
timeit("vectorized", lambda: df["price"] * df["qty"])
timeit("apply if", lambda: df["price"].apply(lambda p: "غالي" if p > 300 else "عادي"))
timeit("np.where", lambda: np.where(df["price"] > 300, "غالي", "عادي"))
cond = [df["price"] < 100, df["price"] < 300]
print(np.select(cond, ["رخيص", "متوسط"], default="غالي")[:4], df["price"].head(4).tolist())
print(round(df.memory_usage(deep=True).sum() / 1e6, 1), "MB")
df["city"] = df["city"].astype("category")
print(round(df.memory_usage(deep=True).sum() / 1e6, 1), "MB")`,
          try: R`قبل سطر الـ category: اعمل عمود [[shipping]]: لو المدينة القاهرة ٣٠، والجيزة ٤٠، والباقي ٦٠. مرة بـ [[apply]] ودالة فيها if، ومرة بـ [[map]] بـ dict، ومرة بـ [[np.select]]، وقيس التلاتة. وبعدين قيس [[apply]] و [[map]] تاني على العمود بعد ما بقى category. وفي الآخر عمود [[discount]]: ١٠٪ من الإجمالي لو الكمية ٥ أو أكتر، وإلا صفر، من غير apply.`,
          flag: "script",
          deep: {
            why: R`الكود اللي بيشتغل على ١٠٠٠ صف في ثانية ممكن ياخد ساعة على مليون صف لو مكتوب بـ loop. والفرق مش في الجهاز، في الطريقة. وأغلب الناس بتكتب [[apply]] لأنها شبه for اللي متعودين عليه، فده أكتر سبب بيخلي سكربتات pandas بطيئة.`,
            how: R`[[df["price"] * df["qty"]]] بتتنفذ في numpy بكود C على الـ array كلها مرة واحدة (درس [[vectorized و broadcasting]]). [[apply(func, axis=1)]] بينادي دالة Python مرة لكل صف، وكل مرة بيعمل Series للصف ده (object جديد بـ index)، فمليون صف = مليون Series ومليون نداء. و [[iterrows]] نفس الحكاية وأسوأ. و [[Series.apply]] على عمود واحد أخف (مفيش Series لكل صف) بس لسه نداء Python لكل قيمة.

[[np.where(cond, a, b)]] بيحسب الشرط كـ mask مرة واحدة ويختار. و [[np.select([cond1, cond2], [v1, v2], default=v3)]] بيمشي على الشروط بالترتيب: أول شرط صح هو اللي بيكسب (زي if/elif/else). و [[s.map(dict)]] بيبدّل كل قيمة بقيمتها في الـ dict (اللي مش موجودة تبقى NaN).

الذاكرة: [[memory_usage(deep=True)]] بيحسب حجم النصوص الحقيقي. والنص في pandas 3 بيتخزن بـ pyarrow (أخف من object القديم)، والـ category أخف بكتير لأن كل قيمة بتتخزن مرة. و [[int64]] لأرقام من ١ لـ ٩ ممكن تبقى [[int8]] (بايت بدل ٨).

[[read_csv(chunksize=N)]] بيرجّع iterator: كل لفة DataFrame فيه N صف، فبتجمّع النتيجة حتة حتة والذاكرة ثابتة.`,
            when: R`دايمًا ابدأ vectorized. [[apply]] مقبولة لما الدالة مفيهاش بديل vectorized (مكتبة خارجية بتاخد قيمة واحدة) والداتا صغيرة. وقيس قبل ما تحسّن: [[%timeit]] في Jupyter أو [[time.perf_counter]].`,
            mistakes: R`[[iterrows]] عشان تعدّل صفوف (بطيء، والتعديل على الصف مش بيوصل للجدول أصلًا). و [[apply]] عشان حساب بسيط زي ضرب أو مقارنة. و [[np.where]] متداخلة ٤ مرات بدل [[np.select]]. وتحسّن الأداء قبل ما تقيس. وتنسى إن [[map]] بيطلّع NaN للقيم اللي مش في الـ dict.`
          },
          teach: R`## المثال بيعمل إيه؟

جدول مليون صف (سعر وكمية ومدينة)، وبنحسب نفس الحاجة بطرق مختلفة ونقيس الوقت، وبعدين بنقيس الذاكرة قبل وبعد category. اتشغّل بـ pandas 3.1 و numpy 2.5 و Python 3.13 في Docker على جهاز فيه ١٦ core. الأرقام هتختلف عندك، بس النسب بينها هي هي.

---

## ١. الداتا

~~~python
rng = np.random.default_rng(0)
n = 1_000_000
df = pd.DataFrame({
    "price": rng.integers(10, 500, n),
    ...
})
~~~

[[rng.integers(10, 500, n)]]: مليون رقم صحيح عشوائي من ١٠ لـ ٤٩٩ (الآخر مش داخل). و [[rng.choice([...], n)]]: مليون اختيار عشوائي من القايمة.

## ٢. دالة القياس

~~~python
def timeit(label, fn):
    t = time.perf_counter()
    fn()
    print(f"{label:<12}{time.perf_counter() - t:8.3f}s")
~~~

- [[fn]]: دالة من غير باراميترات، بنناديها ونقيس قد إيه خدت. عشان كده كل سطر بعد كده بيبعت [[lambda: ...]]: الكود جوه الـ lambda مبيتنفذش غير لما [[fn()]] تتنادى.
- [[{label:<12}]]: الاسم بعرض ١٢ حرف ومحاذي للشمال، و [[{...:8.3f}]] الرقم بعرض ٨ و ٣ أرقام بعد العلامة، عشان الأرقام تيجي تحت بعض.

---

## ٣. النتايج

~~~text الناتج
iterrows       3.155s
apply          6.110s
vectorized     0.004s
apply if       0.137s
np.where       0.007s
~~~

| الطريقة | الوقت | ليه |
|---|---|---|
| [[iterrows]] على **١٠٠ ألف** بس | ٣٫٢ ث (يعني حوالي ٣٠ ث للمليون) | بيعمل Series لكل صف، و for في Python |
| [[df.apply(..., axis=1)]] | ٦٫١ ث | دالة Python لكل صف، و Series لكل صف |
| [[df["price"] * df["qty"]]] | ٠٫٠٠٤ ث | عملية واحدة في C على العمودين |
| [[s.apply(lambda p: ...)]] | ٠٫١٤ ث | عمود واحد: مفيش Series لكل صف، بس لسه نداء لكل قيمة |
| [[np.where]] | ٠٫٠٠٧ ث | الشرط mask مرة واحدة |

يعني الـ vectorized أسرع من [[apply(axis=1)]] حوالي ١٥٠٠ مرة هنا.

- [[for _, r in df.iterrows()]]: كل لفة بترجّع (index، الصف كـ Series). و [[_]] اسم متعارف عليه لقيمة مش هنستخدمها. و [[r.price]] العمود ده في الصف.
- [[axis=1]] في [[apply]]: «ابعت كل **صف** للدالة». من غيرها بيبعت كل عمود.

---

## ٤. أكتر من شرطين: [[np.select]]

~~~python
cond = [df["price"] < 100, df["price"] < 300]
print(np.select(cond, ["رخيص", "متوسط"], default="غالي")[:4], df["price"].head(4).tolist())
~~~

~~~text الناتج
['غالي' 'غالي' 'متوسط' 'متوسط'] [426, 322, 260, 142]
~~~

- [[cond]]: list من الشروط بالترتيب، كل واحد mask.
- لكل صف: أول شرط صح بيكسب. ١٤٢ أقل من ٣٠٠ بس مش أقل من ١٠٠ فبقى «متوسط». و ٤٢٦ مفيش شرط صح فخد الـ [[default]]. ده بالظبط if / elif / else، بس على المليون صف مرة واحدة.

---

## ٥. الذاكرة: category

~~~python
print(round(df.memory_usage(deep=True).sum() / 1e6, 1), "MB")
df["city"] = df["city"].astype("category")
~~~

~~~text الناتج
39.3 MB
17.0 MB
~~~

- [[memory_usage(deep=True)]]: حجم كل عمود بالـ bytes، و [[deep=True]] بيحسب النصوص نفسها مش بس المؤشرات ليها. و [[/ 1e6]] = ÷ مليون = ميجا.
- العمود ده فيه ٣ قيم بس متكررة مليون مرة. كـ category كل صف بقى رقم صغير (byte واحد) بيشاور على واحدة من الـ ٣، فالجدول كله نزل للنص تقريبًا. والعمودين الرقميين (٨ ميجا لكل واحد) لسه [[int64]]؛ لو حوّلت [[qty]] لـ [[int8]] هتوفّر ٧ ميجا كمان.

---

## ٦. ملف أكبر من الذاكرة: [[chunksize]]

مش في المثال، بس اتجرّب على ملف ٥ مليون صف (٥٩ ميجا):

~~~python
total = 0
for chunk in pd.read_csv("big.csv", chunksize=1_000_000, usecols=["qty", "total"]):
    total += chunk.loc[chunk["qty"] > 5, "total"].sum()
~~~

كل لفة DataFrame مليون صف بس، فالذاكرة القصوى نزلت من ٤٦٦ ميجا (قراية الملف كله) لـ ١٩٦ ميجا، والنتيجة نفسها بالظبط. وكل ما الملف يكبر الفرق يكبر: القراية كلها بتكبر مع الملف، والـ chunks ثابتة.

---

## الخلاصة

| بدل | اكتب |
|---|---|
| [[apply(lambda r: r.a * r.b, axis=1)]] | [[df["a"] * df["b"]]] |
| [[apply]] فيها if/else | [[np.where(cond, x, y)]] |
| if / elif / else | [[np.select([c1, c2], [v1, v2], default=v3)]] |
| [[apply]] بـ dict أو قاموس | [[s.map(dict)]] |
| [[iterrows]] | أي واحدة من اللي فوق |
| نصوص متكررة | [[astype("category")]] |
| ملف كبير | [[usecols]] و [[dtype]] و [[chunksize]] |

- قيس الأول، وبعدين حسّن.`,
          lines: [
            "القياس.",
            "numpy.",
            "pandas.",
            "مولّد أرقام عشوائية بـ seed ثابت.",
            "مليون صف.",
            "الجدول:",
            "سعر عشوائي.",
            "كمية عشوائية.",
            "مدينة عشوائية.",
            "قفلة.",
            "دالة صغيرة تقيس وقت أي دالة:",
            "الساعة قبل.",
            "نفّذ.",
            "اطبع الاسم والوقت.",
            "loop على الصفوف (١٠٠ ألف بس).",
            R`[[apply]] على كل صف.`,
            "نفس الحساب على العمودين مرة واحدة.",
            R`[[apply]] على عمود واحد فيها if.`,
            R`نفس الشرط بـ [[np.where]].`,
            "شرطين بالترتيب...",
            R`...و [[np.select]]: أول شرط صح يكسب، وإلا default.`,
            "الذاكرة قبل.",
            "المدينة category.",
            "الذاكرة بعد."
          ],
          sol: R`على العمود النص (مليون صف، في Docker): [[apply]] حوالي ٠٫٤٨ ث، و [[map]] ٠٫٣١ ث، و [[np.select]] ٠٫٠٢ ث. الـ [[map]] بيبدّل كل قيمة بقيمتها في الـ dict، والإسكندرية مش فيه فبتبقى NaN و [[fillna(60)]] بتملاها؛ بس لسه بيدوّر في dict لكل صف. و [[np.select]] مقارنتين vectorized فكسب.

وعلى العمود بعد category: [[apply]] نزلت لـ ٠٫٠٠١ ث و [[map]] ٠٫٠٠٨ ث، لأن pandas بيطبّق الدالة على الـ **٣ قيم المختلفة** بس، وبعدين يوزّع النتيجة على المليون صف بالأكواد. ده سبب كمان تستخدم category.

والخصم: [[np.where(df["qty"] >= 5, df["price"] * df["qty"] * 0.10, 0)]]: أول ٣ صفوف [[[340.8, 225.4, 234.0]]] (٤٢٦ × ٨ × ٠٫١ = ٣٤٠٫٨).`,
          solCode: R`f = lambda c: 30 if c == "القاهرة" else 40 if c == "الجيزة" else 60
timeit("apply", lambda: df["city"].apply(f))
timeit("map", lambda: df["city"].map({"القاهرة": 30, "الجيزة": 40}).fillna(60))
timeit("select", lambda: np.select([df["city"] == "القاهرة", df["city"] == "الجيزة"], [30, 40], default=60))
df["discount"] = np.where(df["qty"] >= 5, df["price"] * df["qty"] * 0.10, 0)`
        },
        {
          cmd: "polars و DuckDB",
          title: "إمتى تسيب pandas لـ polars أو DuckDB (وإمتى لأ)",
          desc: R`**polars** مكتبة DataFrame تانية مكتوبة بـ Rust، بتشتغل على كل الـ cores و lazy (بتخطط الاستعلام كله قبل ما تقرا). و **DuckDB** قاعدة بيانات تحليلية جوه الـ process بتاعك: بتكتب SQL على ملف CSV أو Parquet أو حتى DataFrame مباشرة. الاتنين بيبانوا لما الداتا تبقى ملايين الصفوف أو أكبر من الذاكرة.

اتقاسوا هنا على ملف ٥ مليون صف (٥٩ ميجا): كلهم خلصوا في أقل من ثانية، والفرق الحقيقي كان في الذاكرة. فمتغيّرش أداة عشان ملف صغير.`,
          example: R`import duckdb
import pandas as pd
import polars as pl
pdf = pd.read_csv("big.csv")
print(pdf[pdf["qty"] > 5].groupby("city")["total"].sum().to_dict())
r2 = (pl.scan_csv("big.csv")
        .filter(pl.col("qty") > 5)
        .group_by("city")
        .agg(pl.col("total").sum())
        .sort("city")
        .collect())
print(r2)
r3 = duckdb.sql("SELECT city, SUM(total)::BIGINT AS total FROM 'big.csv' WHERE qty > 5 GROUP BY city ORDER BY city").df()
print(r3)
print(duckdb.sql("SELECT city, COUNT(*) AS n FROM pdf GROUP BY city ORDER BY city").fetchall())`,
          try: R`اعمل [[big.csv]] بالسكربت اللي في الشرح، وقيس كل طريقة لوحدها في process منفصلة (وقت وذاكرة). وبعدين احفظ الملف Parquet واعمل نفس الاستعلام بـ DuckDB على [[big.parquet]] وقارن الوقت.`,
          flag: "script",
          deep: {
            why: R`pandas بيقرا الملف كله في الذاكرة الأول، وأغلب عملياته على core واحد. ده ممتاز لحد مئات الآلاف أو كام مليون صف. بعد كده (ملف ٥ جيجا، أو ١٠٠ مليون صف) الذاكرة بتخلص أو الوقت بيبقى دقايق. هنا polars و DuckDB بيفرقوا فعلًا. وقبلها الفرق ثواني مش مستاهلة إنك تتعلم API جديد وتغيّر كود شغال.`,
            how: R`polars: [[scan_csv]] (مش [[read_csv]]) بيرجّع **LazyFrame**: مجرد خطة. كل [[.filter]] و [[.group_by]] بيزوّد خطوة، و [[.collect()]] بيشغّل الخطة كلها مرة واحدة بعد ما يحسّنها: يقرا الأعمدة المحتاجة بس، ويفلتر وهو بيقرا، ويوزّع الشغل على كل الـ cores. والتعبيرات زي [[pl.col("qty") > 5]] بتتوصف مش بتتنفذ في Python.

DuckDB: محرك SQL عمودي (columnar) جوه الـ process (من غير سيرفر، زي SQLite بس للتحليل). [[FROM 'big.csv']] بيقرا الملف مباشرة وهو ماشي (streaming)، و [[FROM pdf]] بيستعلم على DataFrame اسمه [[pdf]] موجود في الكود من غير ما ينسخه. و [[.df()]] بيرجّع pandas، و [[.pl()]] polars، و [[.fetchall()]] list من tuples. و [[SUM]] بيرجّع نوع كبير (HUGEINT)، وعشان كده [[::BIGINT]] (cast) عشان يرجع int عادي مش float.

Parquet بيفرق مع الاتنين أكتر من CSV: الأعمدة مضغوطة ومنفصلة، فبيقروا العمودين المحتاجين بس.`,
            when: R`الداتا صغيرة (لحد كام مليون صف وبتكفي الذاكرة براحة): pandas، ومعاه ecosystem كامل (scikit-learn و seaborn وكل الأمثلة على النت). ملفات كبيرة جدًا أو pipeline تقيل بيتكرر: polars. بتحب SQL، أو عايز تستعلم على ملفات CSV و Parquet كتير من غير ما تحمّلها: DuckDB. والاتنين بيحوّلوا من وإلى pandas بسطر، فتقدر تستخدمهم في الحتة التقيلة بس.`,
            mistakes: R`تقيس على ملف صغير وتقول «polars أسرع ١٠ مرات» والفرق ٠٫٣ ثانية. و [[pl.read_csv]] بدل [[scan_csv]] فتخسر الـ lazy. وتكتب كود polars بعقلية pandas ([[df["col"]]] و [[apply]]) فتخسر السرعة. وتنسى إن نتيجة DuckDB على CSV بتتحسب كل مرة من الملف (لو هتستعلم كتير: حوّله Parquet أو جدول DuckDB).`
          },
          teach: R`## المثال بيعمل إيه؟

نفس السؤال ٣ مرات: «إجمالي [[total]] لكل مدينة في الطلبات اللي كميتها أكتر من ٥»، مرة بـ pandas ومرة بـ polars ومرة بـ DuckDB، على ملف ٥ مليون صف. اتشغّل في Docker بـ pandas 3.1 و polars 2.1 و DuckDB 2.0 (من [[pip install polars duckdb]]) على جهاز فيه ١٦ core.

الملف اتعمل بالسكربت ده (٥٩ ميجا):

~~~python make_big.py
import numpy as np, pandas as pd
rng = np.random.default_rng(1)
n = 5_000_000
qty = rng.integers(1, 11, n)
pd.DataFrame({"city": rng.choice(["Cairo", "Giza", "Alex"], n), "qty": qty, "total": qty * rng.integers(40, 351, n)}).to_csv("big.csv", index=False)
~~~

---

## ١. pandas

~~~python
pdf = pd.read_csv("big.csv")
print(pdf[pdf["qty"] > 5].groupby("city")["total"].sum().to_dict())
~~~

~~~text الناتج
{'Alex': 1298270220, 'Cairo': 1298909135, 'Giza': 1301661273}
~~~

اقرا الملف كله، وفلتر، وجمّع. كل ده اتعلمناه.

## ٢. polars (lazy)

~~~python
r2 = (pl.scan_csv("big.csv")
        .filter(pl.col("qty") > 5)
        .group_by("city")
        .agg(pl.col("total").sum())
        .sort("city")
        .collect())
~~~

~~~text الناتج
shape: (3, 2)
┌───────┬────────────┐
│ city  ┆ total      │
│ ---   ┆ ---        │
│ str   ┆ i64        │
╞═══════╪════════════╡
│ Alex  ┆ 1298270220 │
│ Cairo ┆ 1298909135 │
│ Giza  ┆ 1301661273 │
└───────┴────────────┘
~~~

| الخطوة | معناها |
|---|---|
| [[pl.scan_csv]] | متقراش لسه، اعمل خطة (LazyFrame) |
| [[.filter(pl.col("qty") > 5)]] | [[pl.col("qty")]] تعبير بيوصف العمود، مش العمود نفسه |
| [[.group_by("city").agg(...)]] | زي groupby/agg في pandas |
| [[.sort("city")]] | ترتيب |
| [[.collect()]] | **دلوقتي** حسّن الخطة ونفّذها |

الأقواس اللي حوالين الكلام كله بتخلي Python يقبل السلسلة على كذا سطر. و polars مفيهاش index خالص، والطباعة بتقول نوع كل عمود ([[i64]] = int64). ونفس الأرقام بالظبط.

## ٣. DuckDB

~~~python
r3 = duckdb.sql("SELECT city, SUM(total)::BIGINT AS total FROM 'big.csv' WHERE qty > 5 GROUP BY city ORDER BY city").df()
print(duckdb.sql("SELECT city, COUNT(*) AS n FROM pdf GROUP BY city ORDER BY city").fetchall())
~~~

~~~text الناتج
    city       total
0   Alex  1298270220
1  Cairo  1298909135
2   Giza  1301661273
[('Alex', 1666522), ('Cairo', 1664199), ('Giza', 1669279)]
~~~

- [[FROM 'big.csv']]: اسم الملف بين علامتين كأنه جدول. DuckDB بيعرف إنه CSV وبيخمّن الأنواع.
- [[::BIGINT]]: تحويل نوع في SQL. من غيرها [[SUM]] بيرجّع نوع كبير جدًا (HUGEINT)، و pandas بيستلمه float فطلع [[1.298270e+09]] في أول تجربة.
- [[.df()]]: النتيجة pandas DataFrame.
- [[FROM pdf]]: DuckDB شاف متغير اسمه [[pdf]] في الكود (الـ DataFrame بتاع pandas) واستعلم عليه مباشرة. ده بيخليك تكتب SQL على أي DataFrame.
- [[.fetchall()]]: النتيجة list من tuples.

---

## ٤. القياس بأمانة

كل واحدة اتشغّلت في process لوحدها (عشان الذاكرة متتلخبطش)، والوقت فيه القراية والحساب، والذاكرة هي أقصى RAM استخدمتها الـ process:

| الطريقة | الوقت | أقصى RAM |
|---|---|---|
| pandas ([[read_csv]] كله) | ٠٫٧٢ لـ ٠٫٧٩ ث | ٤٦٦ ميجا |
| pandas بـ [[usecols]] و [[dtype]] صغيرة | ١٫٠١ ث | ٢١٧ ميجا |
| pandas بـ [[chunksize]] | ٠٫٩٣ ث | ١٩٦ ميجا |
| polars ([[scan_csv]]) | ٠٫٣٨ لـ ٠٫٤٣ ث | ٣٣٠ ميجا |
| DuckDB على الـ CSV | ٠٫٩٦ لـ ١٫٠٩ ث | ٢١٩ ميجا |

اللي نفهمه:

1. على ملف ٥٩ ميجا **كلهم أقل من ثانية**. الفرق في الوقت مش هيغيّر يومك. (والـ DuckDB هنا وقته فيه تحميل المكتبة نفسها.)
2. الفرق الحقيقي الذاكرة: pandas العادي استخدم حوالي ٨ أضعاف حجم الملف. لو الملف ٥ جيجا ده معناه ٤٠ جيجا RAM، وهنا polars و DuckDB (أو pandas بالـ chunks) بيفرقوا.
3. pandas 3 نفسه بقى أسرع من زمان (النصوص بقت بـ pyarrow)، فالفجوة اللي بتقراها في مقالات قديمة أصغر النهارده.

---

## إمتى إيه؟

| الموقف | الأداة |
|---|---|
| داتا بتكفي الذاكرة براحة، ومحتاج scikit-learn و seaborn | pandas |
| ملفات بالجيجات، أو pipeline تقيل بيتكرر كل يوم | polars |
| بتفكر بـ SQL، أو بتستعلم على ملفات CSV و Parquet كتير | DuckDB |
| حتة واحدة تقيلة في كود pandas | DuckDB على الـ DataFrame ([[FROM df]]) أو [[pl.from_pandas(df)]]، وارجع بـ [[.df()]] أو [[.to_pandas()]] |

## الخلاصة

- [[pl.scan_csv(...).filter(...).group_by(...).agg(...).collect()]]: lazy، ومتنساش [[collect]].
- [[duckdb.sql("SELECT ... FROM 'file.csv'").df()]]: SQL على ملف أو DataFrame.
- قيس على داتاك الحقيقية قبل ما تغيّر، والذاكرة غالبًا أهم من الثواني.`,
          lines: [
            "DuckDB.",
            "pandas.",
            R`polars باسمها المعتاد [[pl]].`,
            "pandas: اقرا الملف كله.",
            "فلتر وجمّع.",
            R`polars: خطة lazy من الملف...`,
            "فلتر...",
            "جمّع بالمدينة...",
            "مجموع الإجمالي...",
            "رتّب...",
            R`...و [[collect]]: نفّذ.`,
            "النتيجة جدول polars.",
            R`DuckDB: SQL على الملف مباشرة، والنتيجة pandas.`,
            "نفس الأرقام.",
            R`SQL على الـ DataFrame [[pdf]] اللي في الكود.`
          ],
          sol: R`النتايج في الجدول اللي في الشرح (القيم هتختلف حسب جهازك). وعشان القياس يبقى عادل كل واحدة في process لوحدها، وفي آخرها [[resource.getrusage(resource.RUSAGE_SELF).ru_maxrss]] (على لينكس بالكيلوبايت) بيقول أقصى ذاكرة.

و Parquet: [[pd.read_csv("big.csv").to_parquet("big.parquet")]] وبعدين [[FROM 'big.parquet']]. اتجرّب في Docker: الملف بقى ١٠٫٧ ميجا بدل ٥٩، و DuckDB على Parquet خد ٠٫٥١ لـ ٠٫٧١ ث و ١٧٠ ميجا RAM، مقابل ١٫١١ لـ ١٫١٧ ث و ٢٢٠ ميجا على الـ CSV، ونفس الأرقام بالظبط. السبب: Parquet مضغوط ومتخزن عمود عمود وبأنواعه، فمفيش تحليل نص (parsing) ولا تخمين أنواع.`,
          solCode: R`# measure.py: python measure.py polars
import sys, time, resource
t = time.perf_counter()
if sys.argv[1] == "polars":
    import polars as pl
    pl.scan_csv("big.csv").filter(pl.col("qty") > 5).group_by("city").agg(pl.col("total").sum()).collect()
elif sys.argv[1] == "duckdb":
    import duckdb
    duckdb.sql("SELECT city, SUM(total) FROM 'big.parquet' WHERE qty > 5 GROUP BY city").df()
print(f"{time.perf_counter() - t:.2f}s", resource.getrusage(resource.RUSAGE_SELF).ru_maxrss // 1024, "MB")`
        },
      ]
    }
]);

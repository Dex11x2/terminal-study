// تكملة تاب pydata: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pydata/01.js (شرح حقول الدرس في أوله)
MORE("pydata", [
    {
      t: "الرسم والتقارير",
      l: 2,
      n: "matplotlib للرسم و seaborn فوقيه للرسوم الإحصائية، وتصدير CSV و Excel و Parquet، وقراية وكتابة قاعدة بيانات، ومشروع تحليل كامل",
      items: [
        {
          cmd: "matplotlib",
          title: "ترسم خط وأعمدة وتحفظ الصورة",
          desc: R`[[fig, ax = plt.subplots()]] بيعمل لوحة ([[fig]]) فيها رسمة ([[ax]])، و [[ax.plot(x, y)]] خط و [[ax.barh(labels, values)]] أعمدة أفقية، و [[ax.set_title]] و [[ax.legend()]] للعنوان والمفتاح، و [[fig.savefig("report.png", dpi=120)]] تحفظها صورة. في Jupyter الرسمة بتظهر تحت الخلية لوحدها.

في matplotlib 3.11 (اللي اتجرّب هنا) العربي في العناوين طلع متوصّل وفي الاتجاه الصح من غير أي مكتبة زيادة.`,
          example: R`import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd
df = pd.read_csv("sales.csv", parse_dates=["date"])
daily = df.set_index("date")["total"].resample("D").sum()
by_city = df.groupby("city")["total"].sum().sort_values() / 1000
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4))
ax1.plot(daily.index, daily.values, alpha=0.3, label="يومي")
ax1.plot(daily.index, daily.rolling(7).mean(), label="متوسط ٧ أيام")
ax1.set_title("الإيراد اليومي (جنيه)")
ax1.tick_params(axis="x", rotation=30)
ax1.legend()
ax2.barh(by_city.index, by_city.values, color="#2a7f62")
ax2.bar_label(ax2.containers[0], fmt="%.1f")
ax2.set_title("إيراد كل مدينة (ألف جنيه)")
fig.tight_layout()
fig.savefig("report.png", dpi=120)
plt.close(fig)`,
          try: R`ارسم إيراد كل **شهر** كأعمدة رأسية ([[ax.bar]]) وعلى كل عمود رقمه بالألف، وزوّد خط أفقي بالمتوسط الشهري بـ [[ax.axhline]]. واحفظها [[monthly.png]]. وبعدين جرّب نفس الرسمة في سطر واحد من pandas: [[monthly.plot(kind="bar")]].`,
          flag: "script",
          deep: {
            why: R`جدول فيه ١٨١ رقم يومي محدش هيقراه، بس خط واحد بيوريك في ثانية إن فيه أيام شاذة، والمتوسط المتحرك فوقيه بيوريك الاتجاه. والرسمة بتتحفظ صورة تتحط في تقرير أو إيميل أو صفحة. و matplotlib هي الأساس: pandas و seaborn بيرسموا بيها من جوه.`,
            how: R`[[Figure]] هي اللوحة كلها (الحجم بالبوصة في [[figsize]])، و [[Axes]] رسمة واحدة جواها ليها محاور وعنوان. [[plt.subplots(1, 2)]] بيرجّع اللوحة و array فيها رسمتين (صف واحد وعمودين)، و [[(ax1, ax2)]] بيفكهم في متغيرين.

[[matplotlib.use("Agg")]] بيختار backend من غير شاشة (Agg بيرسم صور بس)، ولازم ييجي قبل [[import pyplot]]. ده للسكربتات والسيرفرات و Docker. في Jupyter متكتبوش.

[[alpha]] الشفافية (٠ لـ ١)، و [[label]] الاسم اللي يظهر في [[legend()]]. و [[bar_label]] بيكتب القيمة على كل عمود، و [[ax.containers[0]]] أول مجموعة أعمدة اترسمت. و [[tight_layout()]] بيظبط المسافات عشان العناوين متتقصّش. و [[dpi]] (dots per inch) دقة الصورة: [[figsize=(11, 4)]] × ١٢٠ = صورة ١٣٢٠ × ٤٨٠ بكسل.

[[plt.close(fig)]] بيمسح اللوحة من الذاكرة. في سكربت بيعمل رسوم كتير من غيرها الذاكرة بتكبر (matplotlib بيحذّرك بعد ٢٠ لوحة مفتوحة).

pandas عنده [[df.plot()]] و [[s.plot(kind="bar")]] اللي بيرجّعوا [[ax]] عادي، فتقدر ترسم بسطر وتكمّل التظبيط بـ matplotlib.`,
            when: R`رسوم التقارير الثابتة (صور في PDF أو إيميل أو Excel). ولو عايز رسوم إحصائية سريعة (توزيع، مقارنة مجموعات): seaborn فوق matplotlib. ولو عايز رسمة تفاعلية في صفحة ويب: مكتبات زي Plotly (من الـ docs)، أو ابعت الداتا JSON وارسمها في الفرونت.`,
            mistakes: R`[[plt.plot]] و [[plt.title]] (الطريقة القديمة اللي بتشتغل على «الرسمة الحالية») في سكربت فيه كذا رسمة فالعنوان يروح للرسمة الغلط. و [[savefig]] بعد [[plt.show()]] فتتحفظ صورة فاضية. وتنسى [[Agg]] على سيرفر من غير شاشة. ورسم بخطوط على حاجة مش وقت (مدن) والأعمدة هي الصح. ومحور y مش بادئ من صفر في رسم أعمدة فالفرق يبان أكبر من حقيقته.`
          },
          teach: R`## المثال بيعمل إيه؟

لوحة فيها رسمتين جنب بعض: الإيراد اليومي ومعاه المتوسط المتحرك (من درس [[resample و rolling]])، وإيراد كل مدينة أعمدة أفقية وعلى كل عمود رقمه. وبنحفظها صورة. اتشغّل بـ matplotlib 3.11 و pandas 3.1 في Docker، والصورة اللي طلعت اتفتحت واتراجعت.

---

## ١. الـ backend

~~~python
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
~~~

- [[matplotlib.use("Agg")]]: «ارسم صور بس، من غير شباك». Docker والسيرفرات مفيهمش شاشة. لازم قبل [[import matplotlib.pyplot]]. في Jupyter أو على جهازك متكتبوش.
- [[pyplot as plt]]: الواجهة اللي فيها [[subplots]] و [[close]]، و [[plt]] اسمها المعتاد.

---

## ٢. الداتا

~~~python
daily = df.set_index("date")["total"].resample("D").sum()
by_city = df.groupby("city")["total"].sum().sort_values() / 1000
~~~

- [[daily]]: إيراد كل يوم (١٨١ قيمة).
- [[by_city]]: إيراد كل مدينة، مترتب من الأصغر (عشان في الأعمدة الأفقية الأكبر يطلع فوق)، و [[/ 1000]] بالألف عشان الأرقام تبقى قصيرة على المحور.

---

## ٣. اللوحة والرسمتين

~~~python
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(11, 4))
~~~

| الحتة | معناها |
|---|---|
| [[plt.subplots(1, 2)]] | لوحة فيها صف واحد وعمودين من الرسوم |
| [[figsize=(11, 4)]] | العرض والطول بالبوصة |
| [[fig]] | اللوحة كلها: بنحفظها |
| [[(ax1, ax2)]] | الرسمتين، كل واحدة [[Axes]] ليها محاورها وعنوانها |

---

## ٤. الخطين

~~~python
ax1.plot(daily.index, daily.values, alpha=0.3, label="يومي")
ax1.plot(daily.index, daily.rolling(7).mean(), label="متوسط ٧ أيام")
ax1.set_title("الإيراد اليومي (جنيه)")
ax1.tick_params(axis="x", rotation=30)
ax1.legend()
~~~

- [[ax1.plot(x, y)]]: خط. x التواريخ، و y القيم. matplotlib بيفهم التواريخ وبيكتبها على المحور.
- [[alpha=0.3]]: الخط اليومي شفاف ٣٠٪ عشان المتوسط يبان فوقيه.
- الخط التاني: المتوسط المتحرك. أول ٦ أيام NaN فمبتترسمش (الخط بيبدأ متأخر شوية).
- [[tick_params(axis="x", rotation=30)]]: التواريخ على محور x مايلة ٣٠ درجة. في أول تجربة من غيرها التواريخ ركبت على بعض.
- [[legend()]]: المفتاح، من الـ [[label]] بتاع كل خط.

## ٥. الأعمدة

~~~python
ax2.barh(by_city.index, by_city.values, color="#2a7f62")
ax2.bar_label(ax2.containers[0], fmt="%.1f")
ax2.set_title("إيراد كل مدينة (ألف جنيه)")
~~~

- [[barh]]: أعمدة **أفقية** (h = horizontal). الأسامي على المحور الرأسي، فالأسامي الطويلة (الإسكندرية) مبتتلخبطش. و [[bar]] للرأسي.
- [[color]]: لون واحد لكل الأعمدة بكود hex.
- [[ax2.containers[0]]]: الأعمدة اللي لسه اترسمت كمجموعة، و [[bar_label]] كتب قيمة كل عمود جنبه بشكل [[%.1f]] (رقم واحد بعد العلامة).

اللي اترسم على الأعمدة: [[189.9]] و [[128.6]] و [[79.2]]. (القاهرة ١٨٩٫٩٥ بالظبط، و [[%.1f]] قرّبها لـ ١٨٩٫٩ لأن الرقم متخزّن في float كـ ١٨٩٫٩٤٩٩٩...)

---

## ٦. الحفظ

~~~python
fig.tight_layout()
fig.savefig("report.png", dpi=120)
plt.close(fig)
~~~

- [[tight_layout()]]: يظبط المسافات بين الرسمتين والعناوين.
- [[savefig]]: الامتداد بيحدد النوع ([[.png]] أو [[.svg]] أو [[.pdf]]). [[dpi=120]] × [[(11, 4)]] بوصة = صورة ١٣٢٠ × ٤٨٠ بكسل، وحجمها طلع حوالي ٩٠ KB.
- [[plt.close(fig)]]: امسحها من الذاكرة.

## ٧. العربي

العناوين والمدن والمفتاح طلعوا عربي متوصّل ومن اليمين للشمال في matplotlib 3.11 بالخط الافتراضي (DejaVu Sans، فيه حروف عربي). النسخ القديمة من matplotlib كانت مشهورة إنها بتطلّع العربي حروف مقطعة ومقلوبة، وكان الحل مكتبتين [[arabic-reshaper]] و [[python-bidi]]. لو شفت ده: حدّث matplotlib الأول.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| لوحة فيها n رسوم | [[fig, axes = plt.subplots(rows, cols, figsize=(w, h))]] |
| خط / أعمدة / أفقي | [[ax.plot]] / [[ax.bar]] / [[ax.barh]] |
| عنوان ومحاور | [[ax.set_title]] و [[ax.set_xlabel]] و [[ax.set_ylabel]] |
| أرقام على الأعمدة | [[ax.bar_label(ax.containers[0])]] |
| مفتاح | [[label=...]] ثم [[ax.legend()]] |
| حفظ | [[fig.tight_layout()]] ثم [[fig.savefig("x.png", dpi=120)]] |
| من غير شاشة | [[matplotlib.use("Agg")]] قبل pyplot |

- كل حاجة على [[ax]] (الرسمة) و [[fig]] (اللوحة)، مش على [[plt]] العامة.`,
          lines: [
            "matplotlib نفسها.",
            R`backend من غير شاشة (Docker وسيرفر). قبل pyplot.`,
            R`واجهة الرسم باسم [[plt]].`,
            "pandas.",
            "المبيعات.",
            "إيراد كل يوم.",
            "إيراد كل مدينة بالألف، من الأصغر.",
            "لوحة فيها رسمتين جنب بعض.",
            "الخط اليومي شفاف.",
            "المتوسط المتحرك ٧ أيام.",
            "العنوان.",
            "التواريخ مايلة عشان متركبش على بعض.",
            "المفتاح.",
            "أعمدة أفقية بلون واحد.",
            "القيمة على كل عمود.",
            "العنوان.",
            "ظبط المسافات.",
            "احفظ صورة.",
            "امسح اللوحة من الذاكرة."
          ],
          sol: R`[[monthly = daily.resample("ME").sum() / 1000]]، وبعدين [[ax.bar]] بأسامي الشهور ([[strftime("%Y-%m")]] عشان تبقى قصيرة)، و [[bar_label]] بـ [[fmt="%.1f"]]، و [[ax.axhline(monthly.mean(), linestyle="--")]] خط أفقي عند المتوسط (٦٦٫٣ ألف). يناير (٦٢٫٦) ومايو (٥٢٫٢) هما اللي تحت الخط، ومايو أبعدهم بكتير.

و [[monthly.plot(kind="bar")]] بيرسم نفس الأعمدة في سطر وبيرجّع [[ax]]، فتكمّل عليه [[ax.set_title]] و [[ax.figure.savefig]]. بس أسامي الشهور هتطلع التاريخ كامل بالساعة، فالأحسن تغيّر الـ index الأول.`,
          solCode: R`monthly = daily.resample("ME").sum() / 1000
fig, ax = plt.subplots(figsize=(7, 4))
ax.bar(monthly.index.strftime("%Y-%m"), monthly.values)
ax.bar_label(ax.containers[0], fmt="%.1f")
ax.axhline(monthly.mean(), color="gray", linestyle="--", label="المتوسط")
ax.set_title("الإيراد الشهري (ألف جنيه)")
ax.legend()
fig.tight_layout()
fig.savefig("monthly.png", dpi=120)`
        },
        {
          cmd: "seaborn",
          title: "رسوم إحصائية من DataFrame في سطر: توزيع ومقارنة مجموعات",
          desc: R`seaborn مبنية فوق matplotlib وبتاخد الـ DataFrame نفسه وأسامي الأعمدة: [[sns.histplot(data=df, x="total")]] توزيع قيمة، و [[sns.boxplot(data=df, x="city", y="total")]] مقارنة التوزيع بين مجموعات، و [[sns.barplot(..., hue="category")]] أعمدة ملوّنة بعمود تالت. والناتج [[ax]] عادي بتاع matplotlib، فالعنوان والحفظ زي الدرس اللي فات.

التسطيب: [[pip install seaborn]]. ومش لازمة لو matplotlib و [[df.plot()]] كفاية.`,
          example: R`import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
df = pd.read_csv("sales.csv", parse_dates=["date"])
df["month"] = df["date"].dt.month
sns.set_theme(style="whitegrid")
fig, axes = plt.subplots(1, 3, figsize=(15, 4))
sns.histplot(data=df, x="total", bins=30, ax=axes[0])
sns.boxplot(data=df, x="city", y="total", ax=axes[1])
sns.barplot(data=df, x="month", y="total", hue="category", estimator="sum", errorbar=None, ax=axes[2])
axes[0].set_title("توزيع قيمة الطلب")
axes[1].set_title("قيمة الطلب في كل مدينة")
axes[2].set_title("الإيراد الشهري لكل تصنيف")
fig.tight_layout()
fig.savefig("seaborn.png", dpi=100)
print(df.groupby("city")["total"].describe()[["25%", "50%", "75%", "max"]])`,
          try: R`ارسم [[sns.scatterplot]] لـ [[qty]] على محور x و [[total]] على y، ولوّن بالمنتج ([[hue="product"]]). إيه الشكل اللي بيطلع لكل منتج وليه؟ وبعدين جرّب [[sns.relplot(..., col="city")]] اللي بيعمل رسمة لكل مدينة لوحده.`,
          flag: "script",
          deep: {
            why: R`في matplotlib عشان ترسم أعمدة لكل شهر ملوّنة بالتصنيف لازم تعمل groupby وتحسب أماكن الأعمدة بإيدك. seaborn بتعمل التجميع والألوان والمفتاح لوحدها من «الشكل الطويل» (درس [[pivot_table و melt]]). والـ boxplot والـ histogram هما أسرع طريقة تفهم بيها توزيع الأرقام قبل ما تثق في المتوسط.`,
            how: R`كل دوال seaborn بتاخد [[data=df]] وأسامي أعمدة لـ [[x]] و [[y]] و [[hue]] (اللون). الدوال «على مستوى الرسمة» (axes-level) زي [[histplot]] و [[boxplot]] و [[barplot]] و [[scatterplot]] و [[lineplot]] بتاخد [[ax=]] وترسم جواه. والدوال «على مستوى اللوحة» (figure-level) زي [[relplot]] و [[displot]] و [[catplot]] بتعمل لوحة كاملة ([[FacetGrid]]) وتقدر تقسمها رسمة لكل قيمة بـ [[col=]].

[[barplot]] الافتراضي بيرسم **المتوسط** ومعاه خط الخطأ (confidence interval). [[estimator="sum"]] يخليه مجموع، و [[errorbar=None]] يشيل الخط.

الـ boxplot: الصندوق من الربع الأول (٢٥٪) للتالت (٧٥٪)، والخط اللي جواه الـ median، والشوارب لحد ١٫٥ × طول الصندوق، والنقط برّه دي القيم «الشاذة» (outliers).

[[sns.set_theme(style="whitegrid")]] بيغيّر شكل كل الرسوم بعدها (خلفية بيضا وخطوط شبكة).`,
            when: R`الاستكشاف: أول ما تقرا داتا ارسم histogram لكل عمود رقمي و boxplot للأرقام مقسومة بالفئات. وفي التقارير لما الرسمة فيها تقسيم بعمود تالت (hue). ولرسمة بسيطة (خط أو أعمدة) matplotlib أو [[df.plot]] كفاية.`,
            mistakes: R`[[barplot]] من غير [[estimator="sum"]] وتفتكره مجموع وهو متوسط. وتدّي seaborn جدول «عريض» (عمود لكل شهر) بدل الطويل. وتنسى إن [[set_theme]] بيأثر على كل الرسوم اللي بعده في نفس الـ process. وتقرا الـ boxplot على إن الصندوق هو كل الداتا (هو النص اللي في الوسط بس).`
          },
          teach: R`## المثال بيعمل إيه؟

٣ رسوم إحصائية من [[sales.csv]] في لوحة واحدة: توزيع قيمة الطلب، ومقارنة التوزيع بين المدن، والإيراد الشهري مقسوم بالتصنيف. اتشغّل بـ seaborn 0.13 و matplotlib 3.11 في Docker، والصورة اتفتحت واتراجعت.

---

## ١. الإعداد

~~~python
import seaborn as sns
df["month"] = df["date"].dt.month
sns.set_theme(style="whitegrid")
fig, axes = plt.subplots(1, 3, figsize=(15, 4))
~~~

- [[sns]]: الاسم المعتاد لـ seaborn.
- [[month]]: رقم الشهر (١ لـ ٦) عشان نجمّع بيه.
- [[set_theme(style="whitegrid")]]: شكل عام لكل الرسوم الجاية: خلفية بيضا وشبكة رمادي.
- [[axes]]: array فيها ٣ رسوم، و [[axes[0]]] الأولى.

---

## ٢. التوزيع: [[histplot]]

~~~python
sns.histplot(data=df, x="total", bins=30, ax=axes[0])
~~~

- [[data=df]] و [[x="total"]]: الجدول واسم العمود. مفيش [[df["total"]]].
- [[bins=30]]: قسّم المدى من أصغر لأكبر قيمة لـ ٣٠ خانة، وارسم عدد الطلبات في كل خانة.
- [[ax=axes[0]]]: ارسم في الرسمة الأولى.

اللي بان: أغلب الطلبات تحت ٥٠٠، وفيه «ديل» طويل لحد ٣٥٠٠ (طلبات البن الكبيرة). يعني المتوسط (٦٦٣) هيبقى أعلى بكتير من الطلب «العادي» (الـ median ٣٦٠). ده سبب تشوف التوزيع قبل ما تقول «متوسط الطلب ٦٦٣».

---

## ٣. المقارنة: [[boxplot]]

~~~python
sns.boxplot(data=df, x="city", y="total", ax=axes[1])
~~~

صندوق لكل مدينة. ونقرا أرقامه من الجدول اللي طبعناه في آخر سطر:

~~~text الناتج: print(df.groupby("city")["total"].describe()[["25%", "50%", "75%", "max"]])
              25%    50%    75%     max
city
الإسكندرية  240.0  405.0  862.5  3500.0
الجيزة      240.0  360.0  900.0  3500.0
القاهرة     180.0  320.0  600.0  3500.0
~~~

| حتة الرسمة | الرقم | مثال القاهرة |
|---|---|---|
| أسفل الصندوق | ٢٥٪ من الطلبات أقل منه | ١٨٠ |
| الخط اللي جوه | الـ median | ٣٢٠ |
| أعلى الصندوق | ٧٥٪ أقل منه | ٦٠٠ |
| الشوارب | لحد ١٫٥ × ارتفاع الصندوق | |
| النقط | قيم شاذة برّه الشوارب | لحد ٣٥٠٠ |

القاهرة صندوقها أوطى: طلباتها أصغر في العادي، وده نفس اللي طلع من [[avg_order]] في درس groupby. و [[describe()]] على groupby بيدي الملخص كله لكل مجموعة، والقوسين المربعين المزدوجين في الآخر (list أسامي) اختاروا ٤ أعمدة بس من الملخص.

---

## ٤. أعمدة ملوّنة: [[barplot]] بـ [[hue]]

~~~python
sns.barplot(data=df, x="month", y="total", hue="category", estimator="sum", errorbar=None, ax=axes[2])
~~~

| الباراميتر | معناه |
|---|---|
| [[x="month"]] | عمود لكل شهر |
| [[y="total"]] | الطول من [[total]] |
| [[hue="category"]] | جوه كل شهر عمود لكل تصنيف بلون، ومفتاح لوحده |
| [[estimator="sum"]] | الطول = **المجموع**. من غيرها seaborn بيرسم المتوسط |
| [[errorbar=None]] | شيل خط الخطأ الأسود اللي فوق كل عمود |

seaborn عمل الـ groupby بنفسه من الجدول الطويل: ٦ شهور × ٢ تصنيف = ١٢ عمود. والمشروبات أعلى في كل الشهور (البن غالي).

---

## ٥. العناوين والحفظ

[[axes[0].set_title(...)]] وباقي التظبيط وال [[savefig]] زي matplotlib بالظبط، لأن seaborn رسمت على نفس الـ [[ax]]. والعناوين العربي طلعت سليمة. بس أسامي المحاور ([[total]] و [[city]]) جاية من أسامي الأعمدة؛ لو عايزها عربي: [[axes[1].set_xlabel("المدينة")]].

---

## الخلاصة

| عايز | اكتب |
|---|---|
| توزيع عمود | [[sns.histplot(data=df, x="col")]] |
| توزيع لكل مجموعة | [[sns.boxplot(data=df, x="group", y="col")]] |
| أعمدة بمجموع | [[sns.barplot(..., estimator="sum", errorbar=None)]] |
| تقسيم بلون | [[hue="col"]] |
| علاقة بين رقمين | [[sns.scatterplot(data=df, x=, y=)]] |
| رسمة لكل قيمة | [[sns.relplot(..., col="col")]] |

- [[barplot]] الافتراضي متوسط مش مجموع.
- seaborn عايزة الجدول الطويل، وبترسم على [[ax]] بتاع matplotlib.`,
          lines: [
            "matplotlib.",
            "من غير شاشة.",
            "pyplot.",
            "pandas.",
            R`seaborn باسم [[sns]].`,
            "المبيعات.",
            "رقم الشهر.",
            "شكل عام: خلفية بيضا وشبكة.",
            "لوحة فيها ٣ رسوم.",
            "توزيع قيمة الطلب في ٣٠ خانة.",
            "صندوق لكل مدينة.",
            "إيراد كل شهر مقسوم بالتصنيف (مجموع مش متوسط).",
            "عنوان الأولى.",
            "عنوان التانية.",
            "عنوان التالتة.",
            "ظبط المسافات.",
            "احفظ.",
            "أرقام الصناديق نفسها."
          ],
          sol: R`كل منتج بيطلع **خط مستقيم من النقط**: [[total]] = [[qty]] × سعر ثابت، فالنقط بتاعة البن على خط ميله ٣٥٠ (لحد ٣٥٠٠ عند ١٠)، والزيت ميله ١٥٠، والشاي والسكر والأرز قريبين من بعض تحت (٦٠ و ٤٥ و ٤٠). يعني الرسمة كشفت إن [[total]] مش معلومة جديدة: محسوبة من عمودين تانيين. ودي حاجة مهمة في الـ machine learning بعدين (متدّيش الموديل عمود محسوب من الإجابة).

و [[relplot(..., col="city")]] بيرجّع [[FacetGrid]] (لوحة كاملة) مش [[ax]]، فبتحفظه بـ [[g.savefig]].`,
          solCode: R`fig, ax = plt.subplots(figsize=(6, 4))
sns.scatterplot(data=df, x="qty", y="total", hue="product", ax=ax)
fig.savefig("scatter.png", dpi=100)
g = sns.relplot(data=df, x="qty", y="total", col="city", hue="product", height=3)
g.savefig("by_city.png")`
        },
        {
          cmd: "to_excel و to_csv",
          title: "تصدّر النتيجة: CSV يفتحه Excel بالعربي، و Excel بكذا شيت، و Parquet",
          desc: R`[[df.to_csv("x.csv", index=False, encoding="utf-8-sig")]] بيحفظ CSV يفتحه Excel والعربي سليم، و [[pd.ExcelWriter]] مع [[to_excel(xl, sheet_name=...)]] بيعمل ملف Excel واحد فيه كذا شيت (محتاج [[openpyxl]])، و [[to_parquet]] بيحفظ الجدول بأنواعه (التاريخ يفضل تاريخ) وأصغر بكتير، للداتا اللي هتتقري تاني بالكود.

[[index=False]] في الكل، وإلا هتلاقي عمود أرقام زيادة ملوش اسم.`,
          example: R`import os
import pandas as pd
df = pd.read_csv("sales.csv", parse_dates=["date"])
summary = df.groupby("city", as_index=False).agg(orders=("order_id", "count"), revenue=("total", "sum"))
summary.to_csv("summary.csv", index=False, encoding="utf-8-sig")
print(open("summary.csv", "rb").read()[:20])
with pd.ExcelWriter("report.xlsx") as xl:
    summary.to_excel(xl, sheet_name="ملخص", index=False)
    df.to_excel(xl, sheet_name="الطلبات", index=False)
back = pd.read_excel("report.xlsx", sheet_name=None)
print(list(back), back["ملخص"].shape, back["الطلبات"].shape)
df.to_parquet("sales.parquet")
print(pd.read_parquet("sales.parquet").dtypes["date"])
for f in ["sales.csv", "sales.parquet", "report.xlsx"]:
    print(f, os.path.getsize(f))`,
          try: R`اعمل ملف [[by_city.xlsx]] فيه شيت لكل مدينة، وفي كل شيت طلبات المدينة دي بس من غير عمود [[city]]. (لف على [[df.groupby("city")]]: كل لفة بترجّع الاسم والجدول.) وبعدين جرّب تسمّي شيت [[«مبيعات/يناير»]].`,
          flag: "script",
          deep: {
            why: R`التحليل بيخلص بملف حد تاني هيفتحه: المدير في Excel، أو سكربت تاني، أو dashboard. ولو الملف اتفتح والعربي رموز، أو التاريخ بقى نص، أو فيه عمود أرقام غريب، الشغل كله هيبان غلط. والصيغة الصح لكل مستخدم بتفرق.`,
            how: R`CSV مجرد نص: مفيش أنواع ولا شيتات ولا تنسيق. لما بتقراه تاني التاريخ بيرجع نص لحد ما تقول [[parse_dates]]. و Excel على ويندوز بيفتح CSV بالـ encoding القديم للنظام إلا لو لقى في أول الملف الـ BOM ([[EF BB BF]])، وده اللي [[utf-8-sig]] بيحطه.

[[pd.ExcelWriter("file.xlsx")]] بيفتح ملف، و [[with]] بيقفله ويحفظه في الآخر (درس [[with و context managers]] في تاب Python و FastAPI). وكل [[to_excel]] جواه بيكتب شيت. Excel ليه قواعد: اسم الشيت لحد ٣١ حرف ومن غير [[/ \ ? * [ ] :]]، وأقصى عدد صفوف ١٬٠٤٨٬٥٧٦. والتواريخ بتتكتب تواريخ حقيقية في Excel.

Parquet صيغة عمودية مضغوطة (محتاجة [[pyarrow]]): بتحفظ نوع كل عمود، وبتقرا أعمدة معينة من غير ما تقرا الملف كله، وأصغر بكتير. بس مش بتتفتح في Excel. وعشان كده: CSV أو Excel للبشر، و Parquet للكود.`,
            when: R`CSV بـ [[utf-8-sig]]: لأي حد هيفتحه في Excel، أو نظام تاني بيستورد CSV. Excel بشيتات: تقرير فيه ملخص وتفاصيل. Parquet: الداتا المنضّفة اللي التحليل الجاي هيقراها (بدل ما تنضّف من الأول كل مرة)، وأي ملف كبير.`,
            mistakes: R`تنسى [[index=False]]. و CSV عربي بـ [[utf-8]] من غير sig فيتفتح في Excel رموز. وتكتب ملف Excel مفتوح في Excel على ويندوز فترمي [[PermissionError]]. واسم شيت فيه [[/]] أو أطول من ٣١ حرف. وتحفظ ملايين الصفوف في Excel (مش هيتفتح). وتبعت Parquet لحد غير مبرمج.`
          },
          teach: R`## المثال بيعمل إيه؟

بنعمل ملخص لكل مدينة ونصدّره CSV، وبعدين ملف Excel فيه شيتين (الملخص والطلبات كلها)، وبعدين Parquet، ونقارن الأحجام ونقرا الملفات تاني نتأكد. اتشغّل بـ pandas 3.1 و openpyxl 3.1 و pyarrow في Docker.

---

## ١. CSV لـ Excel

~~~python
summary.to_csv("summary.csv", index=False, encoding="utf-8-sig")
print(open("summary.csv", "rb").read()[:20])
~~~

~~~text الناتج
b'\xef\xbb\xbfcity,orders,reven'
~~~

- [[index=False]]: من غيرها أول عمود في الملف هيبقى ٠ و ١ و ٢ من غير اسم.
- [[encoding="utf-8-sig"]]: UTF-8 وفي الأول ٣ bytes علامة (BOM).
- [[open(..., "rb")]]: افتح الملف **bytes** (r = read، و b = binary)، و [[[:20]]] أول ٢٠ byte. الـ [[b'...']] معناها bytes، و [[\xef\xbb\xbf]] هما الـ BOM: كل [[\x]] بعدها رقمين hex = byte واحد. بعدهم على طول [[city,orders,...]].

من غير [[-sig]] (جرّبنا [[to_csv]] عادي) الملف بيبدأ بـ [[b'ord']] على طول. Python و pandas بيقروه عادي، بس Excel على ويندوز هيفتح العربي رموز.

---

## ٢. Excel بشيتين

~~~python
with pd.ExcelWriter("report.xlsx") as xl:
    summary.to_excel(xl, sheet_name="ملخص", index=False)
    df.to_excel(xl, sheet_name="الطلبات", index=False)
~~~

- [[pd.ExcelWriter("report.xlsx")]]: افتح ملف Excel للكتابة (بيستخدم openpyxl لوحده لـ [[.xlsx]]).
- [[with ... as xl:]]: الملف بيتحفظ ويتقفل لما الـ block يخلص، حتى لو حصل خطأ.
- كل [[to_excel(xl, sheet_name=...)]] بيكتب شيت. الأسامي عربي عادي.

## ٣. نقراه تاني

~~~python
back = pd.read_excel("report.xlsx", sheet_name=None)
print(list(back), back["ملخص"].shape, back["الطلبات"].shape)
~~~

~~~text الناتج
['ملخص', 'الطلبات'] (3, 3) (600, 8)
~~~

[[sheet_name=None]] بيرجّع dict: اسم كل شيت ← جدوله. و [[list(dict)]] بيدي المفاتيح. الشيتين فيهم كل الصفوف. وفتحنا الملف بـ openpyxl نفسه: خانة التاريخ في الطلبات متخزنة **تاريخ** حقيقي (تنسيقها [[YYYY-MM-DD HH:MM:SS]]) مش نص، فـ Excel يقدر يرتّب ويفلتر بيه.

---

## ٤. Parquet

~~~python
df.to_parquet("sales.parquet")
print(pd.read_parquet("sales.parquet").dtypes["date"])
~~~

~~~text الناتج
datetime64[us]
~~~

رجع **تاريخ** من غير [[parse_dates]]: Parquet بيحفظ نوع كل عمود. ولو قريت [[sales.csv]] من غير [[parse_dates]] العمود بيرجع [[str]] (جرّبناها).

## ٥. الأحجام

~~~text الناتج
sales.csv 35423
sales.parquet 12104
report.xlsx 26991
~~~

نفس الـ ٦٠٠ صف: Parquet حوالي تلت الـ CSV، لأنه بيخزّن كل عمود لوحده مضغوط (عمود المدن فيه ٣ قيم بس متكررة، فبيضغط كويس جدًا). والفرق بيكبر مع الملفات الكبيرة. و [[os.path.getsize]] الحجم بالـ bytes.

---

## الخلاصة

| لمين | اكتب |
|---|---|
| حد هيفتحه في Excel (CSV) | [[to_csv("x.csv", index=False, encoding="utf-8-sig")]] |
| تقرير Excel بشيتات | [[with pd.ExcelWriter("x.xlsx") as xl:]] ثم [[to_excel(xl, sheet_name=..., index=False)]] |
| كل شيتات ملف | [[pd.read_excel("x.xlsx", sheet_name=None)]] |
| الكود (بأنواعه وأصغر) | [[to_parquet("x.parquet")]] و [[read_parquet]] |

- اسم الشيت لحد ٣١ حرف ومن غير [[/]] و [[\]] و [[?]] و [[*]] و [[:]] والأقواس المربعة.`,
          lines: [
            R`[[os]] عشان حجم الملفات.`,
            "pandas.",
            "المبيعات.",
            "ملخص لكل مدينة.",
            R`CSV يفتحه Excel بالعربي ([[utf-8-sig]]).`,
            "أول ٢٠ byte: الـ BOM ثم العناوين.",
            "ملف Excel مفتوح للكتابة:",
            R`شيت «ملخص».`,
            R`شيت «الطلبات».`,
            "اقرا كل الشيتات في dict.",
            "أسامي الشيتات وحجم كل واحد.",
            "Parquet بالأنواع.",
            "التاريخ رجع تاريخ.",
            "لكل ملف...",
            "...اطبع حجمه بالـ bytes."
          ],
          sol: R`[[for city, part in df.groupby("city"):]]: كل لفة [[city]] اسم المدينة و [[part]] صفوفها. والنتيجة ٣ شيتات: الإسكندرية [[(106, 7)]]، والجيزة [[(179, 7)]]، والقاهرة [[(315, 7)]] (٧ أعمدة لأننا شلنا [[city]] بـ [[drop(columns="city")]]).

واسم شيت فيه [[/]]: [[ValueError: Invalid character / found in sheet title]]. استبدلها بـ [[-]].`,
          solCode: R`with pd.ExcelWriter("by_city.xlsx") as xl:
    for city, part in df.groupby("city"):
        part.drop(columns="city").to_excel(xl, sheet_name=city, index=False)
print({k: v.shape for k, v in pd.read_excel("by_city.xlsx", sheet_name=None).items()})`
        },
        {
          cmd: "read_sql و to_sql",
          title: "pandas مع قاعدة بيانات: تكتب جدول وتقرا نتيجة استعلام",
          desc: R`[[df.to_sql("sales", con, if_exists="replace", index=False)]] بيكتب الـ DataFrame كجدول في قاعدة البيانات، و [[pd.read_sql("SELECT ...", con, params=(...))]] بيرجّع نتيجة أي استعلام كـ DataFrame. والقيم اللي جاية من برّه بتتبعت في [[params]] مكان [[?]]، مش جوه النص بـ f-string.

المثال على SQLite (جوه Python من غير أي تسطيب). ولـ PostgreSQL أو MySQL: نفس الكود بس الاتصال بيبقى [[sqlalchemy.create_engine(...)]] (من الـ docs). و SQL نفسه في تاب SQL و Prisma.`,
          example: R`import sqlite3
import pandas as pd
df = pd.read_csv("sales.csv", parse_dates=["date"])
con = sqlite3.connect("shop.db")
print(df.to_sql("sales", con, if_exists="replace", index=False))
query = """
    SELECT city, COUNT(*) AS orders, SUM(total) AS revenue
    FROM sales
    WHERE date >= ?
    GROUP BY city
    ORDER BY revenue DESC
"""
top = pd.read_sql(query, con, params=("2026-04-01",))
print(top)
print(pd.read_sql("SELECT typeof(date) AS t, date FROM sales LIMIT 1", con))
beans = pd.read_sql("SELECT * FROM sales WHERE product = ?", con, params=("بن",), parse_dates=["date"])
print(beans.shape, beans["date"].dtype)
con.close()`,
          try: R`بـ SQL بس (من غير groupby في pandas): هات متوسط الكمية لكل منتج مترتب تنازلي، مقرّب لرقمين. وبعدين قارن: اكتب الاستعلام بـ f-string والمدينة [[x' OR '1'='1]] مرة، وبـ [[params]] مرة، وشوف كام صف رجع في كل واحدة.`,
          flag: "script",
          deep: {
            why: R`الداتا في الشغل غالبًا في قاعدة بيانات مش ملفات. و pandas بيخليك تسحب نتيجة استعلام في جدول تحلله وترسمه، أو تحط نتيجة تنضيف في جدول يقراه تطبيق أو dashboard. وأحيانًا SQL أسرع: لو الجدول ١٠ مليون صف، خلّي قاعدة البيانات تعمل الـ GROUP BY وترجّعلك ٣ صفوف بدل ما تسحب الـ ١٠ مليون.`,
            how: R`[[sqlite3.connect("shop.db")]] بيفتح (أو يعمل) ملف قاعدة بيانات SQLite. [[to_sql]] بيعمل [[CREATE TABLE]] من أنواع الأعمدة ويعمل [[INSERT]] لكل الصفوف، وبيرجّع عدد الصفوف اللي اتكتبت. و [[if_exists]]: [["fail"]] (الافتراضي: خطأ لو الجدول موجود) أو [["replace"]] (امسحه واعمله تاني) أو [["append"]] (زوّد عليه).

[[read_sql(query, con, params=...)]] بيبعت الاستعلام والقيم **منفصلين**، وقاعدة البيانات بتحط القيمة مكان [[?]] كقيمة مش ككود، فمفيش SQL injection (درس [[2. SQL Injection]] في تاب الأمان). في SQLite العلامة [[?]]، وفي PostgreSQL مع psycopg [[%s]] أو [[%(name)s]].

SQLite مفيهاش نوع تاريخ: التاريخ بيتخزن **نص** ([[typeof]] قالت [[text]])، عشان كده [[parse_dates]] لما تقرا. والمقارنة [[date >= '2026-04-01']] بتشتغل صح لأن شكل ISO بيترتب كنص زي التاريخ بالظبط.

لـ PostgreSQL (من الـ docs): [[pip install sqlalchemy psycopg]]، و [[engine = create_engine("postgresql+psycopg://user:pass@localhost/db")]]، وبعدين [[pd.read_sql(text, engine)]]. والباسورد من environment variable مش في الكود.`,
            when: R`تحليل على داتا في قاعدة البيانات (سحب نتيجة استعلام)، أو حفظ داتا منضّفة في جدول، أو تجربة SQL على ملف CSV بسرعة (اكتبه في SQLite واستعلم). ولو الداتا كبيرة: خلّي الـ SQL يعمل الفلترة والتجميع، و pandas للخطوات اللي بعدها.`,
            mistakes: R`f-string جوه SQL بقيمة جاية من مستخدم (SQL injection). و [[to_sql]] بـ [[if_exists="replace"]] على جدول إنتاج فيه indexes و constraints (بيتمسح ويتعمل من غير حاجة منهم). وتسحب الجدول كله بـ [[SELECT *]] وتفلتر في pandas. وتنسى إن التواريخ في SQLite نص. وتسيب الاتصال مفتوح ([[con.close()]] أو [[with]]).`
          },
          teach: R`## المثال بيعمل إيه؟

بنكتب الـ ٦٠٠ طلب في جدول SQLite، وبنسحب منه ملخص بـ SQL فيه شرط من برّه، وبنشوف إزاي التاريخ اتخزن، وبنقرا جزء من الجدول بالأنواع الصح. اتشغّل بـ Python 3.13 (SQLite جاية معاه) و pandas 3.1 في Docker.

---

## ١. الاتصال والكتابة

~~~python
import sqlite3
con = sqlite3.connect("shop.db")
print(df.to_sql("sales", con, if_exists="replace", index=False))
~~~

~~~text الناتج
600
~~~

- [[sqlite3]]: من المكتبة الأساسية. SQLite قاعدة بيانات كاملة في **ملف واحد** من غير سيرفر.
- [[connect("shop.db")]]: افتح الملف (ولو مش موجود اعمله). [[con]] هو الاتصال اللي كل حاجة بتعدّي منه.
- [[to_sql("sales", con, ...)]]: اعمل جدول اسمه [[sales]] وحط فيه كل الصفوف. رجّع ٦٠٠ = عدد الصفوف.
- [[if_exists="replace"]]: لو الجدول موجود امسحه واعمله تاني (عشان تشغّل السكربت كذا مرة). و [[index=False]]: متكتبش الـ index كعمود.

---

## ٢. استعلام فيه قيمة من برّه

~~~python
query = """
    SELECT city, COUNT(*) AS orders, SUM(total) AS revenue
    FROM sales
    WHERE date >= ?
    GROUP BY city
    ORDER BY revenue DESC
"""
top = pd.read_sql(query, con, params=("2026-04-01",))
print(top)
~~~

~~~text الناتج
         city  orders  revenue
0     القاهرة     169   100620
1      الجيزة      97    58330
2  الإسكندرية      54    36610
~~~

- [[""" ... """]]: نص على كذا سطر، عشان الـ SQL يتقري.
- الاستعلام نفسه: إيراد وعدد طلبات كل مدينة من أول أبريل، مترتب. نفس اللي عملناه بـ groupby، والأرقام طابقت لما عملناه بـ pandas ([[df[df["date"] >= "2026-04-01"].groupby("city")...]]).
- [[?]]: مكان قيمة، و [[params=("2026-04-01",)]] القيمة. الفاصلة جوه القوس لأن [[params]] لازم tuple حتى لو قيمة واحدة.
- [[read_sql]]: النتيجة DataFrame، أسامي الأعمدة من [[AS]].

### ليه [[params]] مش f-string؟

جرّبنا المدينة [[x' OR '1'='1]] (قيمة ممكن مستخدم يكتبها):

| الطريقة | الصفوف |
|---|---|
| [[f"... WHERE city = '{evil}'"]] | ٦٠٠: الاستعلام بقى [[city = 'x' OR '1'='1']] والشرط بقى صح دايمًا |
| [["... WHERE city = ?"]] مع [[params=(evil,)]] | صفر: القيمة اتعاملت كنص مدينة غريبة |

ده **SQL injection**. في تقرير داخلي النتيجة أرقام غلط، وفي تطبيق ممكن تبقى تسريب داتا أو مسح جداول.

---

## ٣. التاريخ في SQLite

~~~text الناتج: print(pd.read_sql("SELECT typeof(date) AS t, date FROM sales LIMIT 1", con))
      t                 date
0  text  2026-01-01 00:00:00
~~~

[[typeof]] دالة في SQLite بتقول نوع القيمة المتخزنة: [[text]]. SQLite مفيهاش نوع تاريخ، فـ pandas كتبه نص بشكل ISO. والمقارنة بـ [[>=]] اشتغلت صح لأن الشكل ده بيترتب كنص زي ترتيب التواريخ بالظبط.

## ٤. القراية بالأنواع

~~~python
beans = pd.read_sql("SELECT * FROM sales WHERE product = ?", con, params=("بن",), parse_dates=["date"])
print(beans.shape, beans["date"].dtype)
con.close()
~~~

~~~text الناتج
(111, 8) datetime64[us]
~~~

١١١ طلب بن، و [[parse_dates]] رجّع العمود تاريخ. و [[con.close()]] بيقفل الملف.

---

## ٥. PostgreSQL بدل SQLite (من الـ docs)

نفس [[read_sql]] و [[to_sql]]، بس الاتصال SQLAlchemy engine:

~~~python
import os
from sqlalchemy import create_engine
engine = create_engine(os.environ["DATABASE_URL"])   # postgresql+psycopg://user:pass@host/db
df = pd.read_sql("SELECT * FROM orders WHERE created_at >= %(d)s", engine, params={"d": "2026-04-01"})
~~~

ده محتاج [[pip install sqlalchemy psycopg]] وسيرفر Postgres شغال، فمتجرّبش هنا. والرابط من environment variable (درس [[os.environ و .env]] في تاب Python) مش مكتوب في الكود.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تفتح SQLite | [[con = sqlite3.connect("x.db")]] |
| تكتب جدول | [[df.to_sql("t", con, if_exists="replace", index=False)]] |
| تزوّد على جدول | [[if_exists="append"]] |
| تقرا نتيجة استعلام | [[pd.read_sql("SELECT ...", con)]] |
| قيمة من برّه | [[?]] في SQLite + [[params=(v,)]] |
| تواريخ | [[parse_dates=["col"]]] |

- عمرك ما تحط قيمة من برّه في SQL بـ f-string.`,
          lines: [
            "SQLite من المكتبة الأساسية.",
            "pandas.",
            "المبيعات.",
            R`افتح (أو اعمل) ملف قاعدة البيانات.`,
            R`اكتب الجدول، وبيرجّع عدد الصفوف: [[600]].`,
            "الاستعلام في نص على كذا سطر:",
            "المدينة وعدد الطلبات والإيراد...",
            "من جدول المبيعات...",
            R`من تاريخ معيّن، و [[?]] مكان القيمة...`,
            "لكل مدينة...",
            "من الأكبر.",
            "قفلة النص.",
            R`نفّذ والقيمة في [[params]].`,
            "النتيجة DataFrame.",
            R`التاريخ متخزن [[text]] في SQLite.`,
            "طلبات البن والتاريخ يرجع تاريخ.",
            R`[[(111, 8)]] و [[datetime64[us]]].`,
            "اقفل الاتصال."
          ],
          sol: R`[[SELECT product, AVG(qty) AS avg_qty FROM sales GROUP BY product ORDER BY avg_qty DESC]] وبعدين [[.round(2)]]: شاي ٥٫٧٨، زيت ٥٫٦٦، سكر ٥٫٦٦، بن ٥٫٣١، أرز ٥٫٢١ (نفس أرقام [[groupby("product")["qty"].mean()]]).

وبالـ f-string والقيمة [[x' OR '1'='1]] رجع [[600]] صف (كل الجدول)، وبـ [[params]] رجع [[0]].`,
          solCode: R`con = sqlite3.connect("shop.db")
avg = pd.read_sql("SELECT product, AVG(qty) AS avg_qty FROM sales GROUP BY product ORDER BY avg_qty DESC", con)
print(avg.round(2))
evil = "x' OR '1'='1"
print(len(pd.read_sql(f"SELECT * FROM sales WHERE city = '{evil}'", con)))          # 600
print(len(pd.read_sql("SELECT * FROM sales WHERE city = ?", con, params=(evil,))))   # 0`
        },
        {
          cmd: "مشروع تحليل مبيعات",
          title: "سكربت تحليل كامل: يقرا ويتأكد ويلخّص ويرسم ويطلّع تقرير Excel",
          desc: R`كل اللي فات في سكربت واحد مترتب في ٣ دوال: [[load]] (قراية وفحص وتجهيز)، و [[summarize]] (المؤشرات والجدول الشهري)، و [[report]] (الرسمة وملف Excel فيه شيت للملخص وشيت للجدول والرسمة جواه). بيتشغّل بـ [[python analyze.py]] ويطلّع فولدر [[out/]].

ده الشكل اللي بيتحوّل له أي notebook استكشاف لما تحتاجه كل شهر: دوال صغيرة، وفحوصات بترمي خطأ بدري، ومخرجات في مكان واحد.`,
          example: R`from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import pandas as pd
from openpyxl.drawing.image import Image
OUT = Path("out")
def load(path):
    df = pd.read_csv(path, parse_dates=["date"]).drop_duplicates("order_id")
    assert df["total"].ge(0).all(), "فيه طلب قيمته سالبة"
    df["month"] = df["date"].dt.to_period("M").astype(str)
    return df
def summarize(df):
    kpis = pd.Series({
        "عدد الطلبات": len(df),
        "الإيراد": df["total"].sum(),
        "متوسط الطلب": round(df["total"].mean(), 1),
        "أحسن مدينة": df.groupby("city")["total"].sum().idxmax(),
        "أحسن منتج": df.groupby("product")["total"].sum().idxmax(),
    })
    monthly = df.pivot_table(index="month", columns="city", values="total", aggfunc="sum")
    return kpis, monthly
def report(kpis, monthly):
    OUT.mkdir(exist_ok=True)
    ax = monthly.plot(kind="bar", figsize=(8, 4), title="الإيراد الشهري لكل مدينة", rot=0)
    ax.figure.tight_layout()
    ax.figure.savefig(OUT / "monthly.png", dpi=100)
    with pd.ExcelWriter(OUT / "report.xlsx") as xl:
        kpis.to_frame("القيمة").to_excel(xl, sheet_name="ملخص")
        monthly.to_excel(xl, sheet_name="شهري")
        xl.sheets["شهري"].add_image(Image(OUT / "monthly.png"), "F2")
if __name__ == "__main__":
    kpis, monthly = summarize(load("sales.csv"))
    print(kpis)
    report(kpis, monthly)
    print(sorted(p.name for p in OUT.iterdir()))`,
          try: R`طوّر السكربت: (١) اسم ملف الداتا ييجي من الترمنال ([[python analyze.py sales.csv]]) بـ [[sys.argv]]، والافتراضي [[sales.csv]]. (٢) شيت تالت «المنتجات» فيه إيراد كل منتج مترتب. (٣) شغّله على ملف مش موجود وشوف الرسالة.`,
          flag: "script",
          deep: {
            why: R`الـ notebook ممتاز وانت بتستكشف، بس التقرير الشهري لازم يتشغّل بأمر واحد، على ملف الشهر الجديد، ويطلّع نفس الشكل كل مرة، ويقف بصوت عالي لو الداتا فيها حاجة غلط بدل ما يطلّع أرقام غلط بهدوء. ده الفرق بين «تحليل عملته مرة» و «أداة الفريق بيعتمد عليها».`,
            how: R`كل دالة ليها شغلانة واحدة وبترجّع نتيجتها، فتقدر تختبر [[summarize]] لوحدها بـ pytest على جدول صغير (درس [[pytest لسكربت]] في تاب Python). و [[if __name__ == "__main__":]] معناها الجزء ده يشتغل لما الملف يتشغّل مباشرة، مش لما حد يعمله import (درس [[if __name__ == "__main__":]] في تاب Python).

[[assert شرط, "رسالة"]] بيرمي [[AssertionError]] بالرسالة لو الشرط مش متحقق. هنا بيمنع تقرير فيه قيمة سالبة. (assert بيتلغي لو Python اتشغّل بـ [[-O]]، فللفحوصات المهمة في الإنتاج [[if ...: raise ValueError(...)]].)

[[pd.Series(dict)]] بيعمل عمود من dict: المفاتيح index والقيم قيم، و [[to_frame("القيمة")]] بيحوّله جدول بعمود واحد عشان يتكتب في Excel. و [[monthly.plot(kind="bar")]] رسمة pandas بترجّع [[ax]] بتاع matplotlib، و [[ax.figure]] اللوحة بتاعته.

[[xl.sheets["شهري"]]] هو الـ worksheet بتاع openpyxl نفسه جوه الـ ExcelWriter، و [[add_image(Image(path), "F2")]] بيحط الصورة وركنها الشمال فوق عند الخانة F2 (جنب الجدول).`,
            when: R`أي تقرير بيتكرر (أسبوعي، شهري). والخطوة الجاية: يتشغّل لوحده بـ cron أو Task Scheduler (درس [[cron و Task Scheduler]] في تاب Python)، أو يبقى endpoint في FastAPI بيرجّع الملف.`,
            mistakes: R`سكربت واحد طويل من غير دوال فمتقدرش تختبر حتة منه. وفحوصات مفيش (التقرير طلع والداتا ناقصة نص الشهر). ومسارات ثابتة لملفات على جهازك ([[C:\Users\...]]). وتنسى [[Agg]] فالسكربت يقع على السيرفر. وتعمل التقرير والملف مفتوح في Excel فيقع بـ [[PermissionError]].`
          },
          teach: R`## المثال بيعمل إيه؟

سكربت [[analyze.py]] بيقرا [[sales.csv]] (درس [[groupby و agg]])، ويتأكد إنها سليمة، ويطلّع ٥ مؤشرات وجدول إيراد شهري لكل مدينة، ويرسم الجدول، ويكتب كل ده في [[out/report.xlsx]] والرسمة جوه الشيت. اتشغّل بـ Python 3.13 و pandas 3.1 و matplotlib 3.11 و openpyxl 3.1 في Docker، والملف الناتج اتفتح بـ openpyxl واتراجع.

---

## ١. الـ imports والثابت

~~~python
from pathlib import Path
import matplotlib
matplotlib.use("Agg")
import pandas as pd
from openpyxl.drawing.image import Image
OUT = Path("out")
~~~

- [[Path]]: مسارات بطريقة شغالة على ويندوز ولينكس (درس [[pathlib]] في تاب Python و FastAPI). [[OUT / "monthly.png"]] بيعمل [[out/monthly.png]].
- [[Agg]]: من غير شاشة (السكربت هيتشغّل على سيرفر أو في cron).
- [[Image]] من openpyxl: صورة تتحط في شيت Excel.

---

## ٢. [[load]]: اقرا واتأكد وجهّز

~~~python
def load(path):
    df = pd.read_csv(path, parse_dates=["date"]).drop_duplicates("order_id")
    assert df["total"].ge(0).all(), "فيه طلب قيمته سالبة"
    df["month"] = df["date"].dt.to_period("M").astype(str)
    return df
~~~

- [[drop_duplicates("order_id")]]: رقم الطلب لازم يبقى فريد، فلو اتكرر خليه مرة (الصف الأول).
- [[df["total"].ge(0)]]: [[ge]] = greater or equal، يعني [[>= 0]] لكل صف. و [[.all()]]: كلهم True؟
- [[assert شرط, "رسالة"]]: لو الشرط False السكربت يقف بـ [[AssertionError: فيه طلب قيمته سالبة]]. أحسن ما تطلع أرقام غلط.
- [[month]]: الشهر كـ period ثم [[astype(str)]] نص زي [[2026-01]] عشان يتكتب في Excel ويبان على الرسمة نضيف.

## ٣. [[summarize]]: المؤشرات

~~~python
kpis = pd.Series({
    "عدد الطلبات": len(df),
    "الإيراد": df["total"].sum(),
    "متوسط الطلب": round(df["total"].mean(), 1),
    "أحسن مدينة": df.groupby("city")["total"].sum().idxmax(),
    "أحسن منتج": df.groupby("product")["total"].sum().idxmax(),
})
monthly = df.pivot_table(index="month", columns="city", values="total", aggfunc="sum")
return kpis, monthly
~~~

- [[pd.Series(dict)]]: عمود: أسامي المؤشرات في الـ index وقيمها جنبها.
- [[idxmax()]]: **اسم** (index) أكبر قيمة مش القيمة نفسها: المدينة صاحبة أكبر إيراد.
- [[monthly]]: نفس جدول درس [[pivot_table و melt]] من غير إجماليات.
- [[return kpis, monthly]]: بترجّع الاتنين tuple، واللي بينادي بيفكهم.

---

## ٤. [[report]]: الرسمة والـ Excel

~~~python
OUT.mkdir(exist_ok=True)
ax = monthly.plot(kind="bar", figsize=(8, 4), title="الإيراد الشهري لكل مدينة", rot=0)
ax.figure.tight_layout()
ax.figure.savefig(OUT / "monthly.png", dpi=100)
~~~

- [[mkdir(exist_ok=True)]]: اعمل [[out]] ولو موجود متشتكيش.
- [[monthly.plot(kind="bar")]]: رسمة pandas: عمود لكل شهر، وجواه عمود لكل مدينة (لأن المدن أعمدة في الجدول)، والمفتاح لوحده. و [[rot=0]] أسامي الشهور عدلة مش مايلة.
- [[ax.figure]]: اللوحة اللي الرسمة جواها، ومنها بنحفظ.

~~~python
with pd.ExcelWriter(OUT / "report.xlsx") as xl:
    kpis.to_frame("القيمة").to_excel(xl, sheet_name="ملخص")
    monthly.to_excel(xl, sheet_name="شهري")
    xl.sheets["شهري"].add_image(Image(OUT / "monthly.png"), "F2")
~~~

- [[to_frame("القيمة")]]: الـ Series بقت جدول بعمود اسمه «القيمة». والـ index (أسامي المؤشرات) اتكتب لأننا مقلناش [[index=False]]، وده مقصود هنا.
- [[monthly.to_excel]]: الـ index (الشهور) اتكتب عمود أول.
- [[xl.sheets["شهري"]]]: الشيت نفسه كـ object بتاع openpyxl، و [[add_image(..., "F2")]] بيحط الصورة عند F2، يمين الجدول (الجدول واخد A لـ D).

---

## ٥. التشغيل

~~~python
if __name__ == "__main__":
    kpis, monthly = summarize(load("sales.csv"))
    print(kpis)
    report(kpis, monthly)
    print(sorted(p.name for p in OUT.iterdir()))
~~~

~~~text الناتج: python analyze.py
عدد الطلبات        600
الإيراد         397770
متوسط الطلب      663.0
أحسن مدينة     القاهرة
أحسن منتج           بن
dtype: object
['monthly.png', 'report.xlsx']
~~~

- [[summarize(load(...))]]: من جوه لبرة: اقرا، وبعدين لخّص.
- [[dtype: object]]: الـ Series فيها أرقام ونصوص مع بعض، فنوعها object (أي حاجة).
- [[OUT.iterdir()]]: الملفات اللي في [[out]]، و [[sorted(... for ...)]] أساميهم مترتبة.

وفتحنا [[report.xlsx]] بـ openpyxl: شيتين [[['ملخص', 'شهري']]]، وفي «شهري» صورة واحدة، وصف يناير [[('2026-01', 16680, 12510, 33365)]] نفس الـ pivot. والرسمة نفسها أعمدة لكل شهر، والجيزة في مايو باينة واقعة.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| دوال [[load]] و [[summarize]] و [[report]] | كل واحدة شغلانة، وتتختبر لوحدها |
| [[assert]] / [[raise]] في الـ load | الداتا الغلط توقف التقرير بدري |
| [[OUT]] ثابت فوق | كل المخرجات في مكان واحد |
| [[if __name__ == "__main__":]] | يتشغّل كسكربت، ويتعمله import في الاختبارات |
| [[Agg]] | يشتغل على سيرفر من غير شاشة |

- نفس السكربت على ملف الشهر الجاي = نفس التقرير في ثانية.`,
          lines: [
            "مسارات.",
            "matplotlib...",
            "...من غير شاشة.",
            "pandas.",
            "صورة لـ Excel من openpyxl.",
            "فولدر المخرجات.",
            "دالة القراية:",
            "اقرا، ورقم الطلب ميتكررش.",
            "مفيش طلب بقيمة سالبة، وإلا قف.",
            R`عمود الشهر كنص [[2026-01]].`,
            "رجّع الجدول.",
            "دالة التلخيص:",
            "المؤشرات في Series:",
            "عدد الطلبات.",
            "الإيراد.",
            "متوسط الطلب.",
            R`المدينة صاحبة أكبر إيراد ([[idxmax]]).`,
            "المنتج صاحب أكبر إيراد.",
            "قفلة الـ dict.",
            "جدول الشهور × المدن.",
            "رجّع الاتنين.",
            "دالة التقرير:",
            R`اعمل [[out]] لو مش موجود.`,
            "رسمة أعمدة من الجدول مباشرة.",
            "ظبط المسافات.",
            "احفظ الصورة.",
            "ملف Excel:",
            R`شيت «ملخص».`,
            R`شيت «شهري».`,
            "والصورة جواه عند F2.",
            "لما الملف يتشغّل مباشرة:",
            "اقرا ولخّص.",
            "اطبع المؤشرات.",
            "اعمل التقرير.",
            R`الملفات اللي اتعملت: [[['monthly.png', 'report.xlsx']]].`
          ],
          sol: R`[[import sys]] وبعدين [[sys.argv[1] if len(sys.argv) > 1 else "sales.csv"]] ([[sys.argv]] list فيها اسم السكربت ثم الكلام اللي بعده، درس [[input() و sys.argv]] في تاب Python). والمنتجات: [[df.groupby("product")["total"].sum().sort_values(ascending=False)]] وتتبعت لـ [[report]] وتتكتب بـ [[to_excel(xl, sheet_name="المنتجات")]]. النتيجة ٣ شيتات [[['ملخص', 'شهري', 'المنتجات']]] والمنتجات: بن ٢٠٦١٥٠، زيت ٩٠٩٠٠، شاي ٣٧٨٠٠، سكر ٣٣١٢٠، أرز ٢٩٨٠٠.

وعلى ملف مش موجود: [[FileNotFoundError: [Errno 2] No such file or directory: 'nothere.csv']]. ولو عايز رسالة أوضح: افحص [[Path(path).exists()]] في الأول واطبع رسالة واخرج بـ [[sys.exit(1)]].`,
          solCode: R`import sys
# ...
def report(kpis, monthly, products):
    # ... نفس الكود، وجوه الـ with:
    #     products.to_excel(xl, sheet_name="المنتجات")
    ...
if __name__ == "__main__":
    df = load(sys.argv[1] if len(sys.argv) > 1 else "sales.csv")
    kpis, monthly = summarize(df)
    products = df.groupby("product")["total"].sum().sort_values(ascending=False)
    report(kpis, monthly, products)`
        },
      ]
    }
]);

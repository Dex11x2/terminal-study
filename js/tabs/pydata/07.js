// تكملة تاب pydata: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/pydata/01.js (شرح حقول الدرس في أوله)
MORE("pydata", [
    {
      t: "machine learning بـ scikit-learn",
      l: 3,
      n: "موديل بيتعلم من أمثلة: تقسّم الداتا تدريب واختبار، وتقيس صح، وتقارن بخط أساس، وتحمي نفسك من الحفظ (overfitting) والتسريب (leakage)",
      items: [
        {
          cmd: "LinearRegression",
          title: "أول موديل: تتوقع سعر شقة من مساحتها وأوضتها وعمرها",
          desc: R`machine learning هنا معناه: عندك أمثلة فيها المدخلات ([[X]]: المساحة والأوض والعمر) والإجابة ([[y]]: السعر)، والموديل بيتعلم العلاقة من أمثلة **التدريب** ([[fit]])، وبعدين بيتوقع لأمثلة مشافهاش ([[predict]]). وبتقيس على أمثلة **اختبار** اتشالت على جنب من الأول بـ [[train_test_split]].

ده اسمه regression (الإجابة رقم). والمقياس [[MAE]]: متوسط الغلط بالجنيه. وأي رقم ملوش معنى من غير مقارنة بـ **baseline**: موديل غبي بيقول المتوسط دايمًا.`,
          example: R`import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.dummy import DummyRegressor
from sklearn.metrics import mean_absolute_error, r2_score
df = pd.read_csv("flats.csv")
X = df[["area", "rooms", "age"]]
y = df["price"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(X_train.shape, X_test.shape)
model = LinearRegression()
model.fit(X_train, y_train)
pred = model.predict(X_test)
print("MAE:", round(mean_absolute_error(y_test, pred)))
print("R2:", round(r2_score(y_test, pred), 3))
print(dict(zip(X.columns, model.coef_.round())), round(model.intercept_))
base = DummyRegressor().fit(X_train, y_train)
print("baseline MAE:", round(mean_absolute_error(y_test, base.predict(X_test))))
new = pd.DataFrame({"area": [120], "rooms": [3], "age": [5]})
print(model.predict(new).round(-3))`,
          try: R`درّب نفس الموديل على [[area]] بس ([[df[["area"]]]] بقوسين) وقارن الـ MAE و R2. وبعدين جرّب [[df["area"]]] بقوس واحد وشوف الخطأ وليه.`,
          flag: "script",
          deep: {
            why: R`فيه أسئلة مينفعش تكتب لها if: «الشقة دي تستاهل كام؟» أو «العميل ده هيمشي؟». بس عندك آلاف الأمثلة القديمة بإجاباتها. الـ ML بيستخرج القاعدة من الأمثلة. و scikit-learn هي المكتبة الأساسية لده في Python: كل الموديلات ليها نفس الواجهة ([[fit]] و [[predict]])، فلو فهمت واحد فهمت الباقي.`,
            how: R`[[LinearRegression]] بتدوّر على معادلة: السعر = رقم ثابت (intercept) + معامل × المساحة + معامل × الأوض + معامل × العمر، والمعاملات بتتختار بحيث مجموع مربعات الغلط على التدريب يبقى أقل ما يمكن. بعد [[fit]] المعاملات في [[model.coef_]] والثابت في [[model.intercept_]] (الشَرطة في الآخر عُرف في scikit-learn لأي حاجة اتعلمت من الداتا).

[[train_test_split]] بيخلط الصفوف ويقسمهم: ٨٠٪ تدريب و ٢٠٪ اختبار. و [[random_state=42]] بيثبّت الخلطة عشان النتيجة تتكرر. الاختبار لازم يفضل «مشافهوش» الموديل خالص لحد القياس، وإلا الرقم كداب.

المقاييس: [[MAE]] (Mean Absolute Error) متوسط |الحقيقي − المتوقع| بنفس وحدة السعر. و [[R2]] من ١ لتحت: ١ معناها كامل، و ٠ معناها مش أحسن من المتوسط، وبالسالب أسوأ منه. و [[DummyRegressor]] بيتوقع متوسط التدريب لكل حاجة: ده الحد الأدنى اللي أي موديل لازم يعدّيه.

[[X]] لازم ٢ بُعد (جدول: صفوف × أعمدة) حتى لو عمود واحد، و [[y]] بُعد واحد.`,
            when: R`أي توقع لرقم: سعر، أو مدة توصيل، أو استهلاك. ابدأ دايمًا بـ baseline، وبعدين موديل بسيط (خطي)، وبعدين جرّب أعقد لو الفرق يستاهل. والموديل الخطي ميزته إنه مفهوم: كل معامل بيقول الخاصية دي بتأثر قد إيه.`,
            mistakes: R`تقيس على نفس داتا التدريب (الرقم هيطلع حلو وكداب). ومتقارنش بـ baseline. وتفسّر المعاملات كأنها سبب ونتيجة (معامل الأوض سالب مش معناه إن أوضة زيادة بتقلل السعر: المساحة والأوض مرتبطين ببعض). و [[X]] بُعد واحد ([[df["area"]]]) فيرمي خطأ. وتفتكر إن R2 = ٠٫٨٧ يعني «صح ٨٧٪».`
          },
          teach: R`## المثال بيعمل إيه؟

بندرّب موديل خطي على ٤٠٠ شقة يتوقع السعر من المساحة والأوض والعمر، ونقيسه على ١٠٠ شقة مشافهاش، ونقارنه بموديل غبي، ونقرا المعادلة اللي اتعلمها، ونتوقع سعر شقة جديدة. اتشغّل بـ scikit-learn 1.9 و pandas 3.1 في Docker.

الداتا متولدة بسكربت عشان الأرقام تتكرر عندك (القاعدة الحقيقية جواه: السعر = المساحة × ٢٠ ألف × معامل المدينة × (١ − العمر ÷ ١٠٠) + ضوضاء عشوائية):

~~~python make_ml.py
import numpy as np
import pandas as pd
rng = np.random.default_rng(42)
n = 500
area = rng.integers(60, 251, n)
rooms = np.clip(area // 45 + rng.integers(-1, 2, n), 1, 6)
age = rng.integers(0, 31, n)
city = rng.choice(["القاهرة", "الجيزة", "الإسكندرية"], n)
factor = pd.Series(city).map({"القاهرة": 1.2, "الجيزة": 1.0, "الإسكندرية": 0.9}).to_numpy()
price = (area * 20_000 * factor * (1 - age / 100) + rng.normal(0, 200_000, n)).round(-3)
pd.DataFrame({"area": area, "rooms": rooms, "age": age, "city": city, "price": price}).to_csv("flats.csv", index=False)
m = 1000
orders = rng.poisson(4, m)
days = rng.integers(0, 120, m)
complaints = rng.poisson(0.5, m)
logit = -1.0 - 0.5 * orders + 0.03 * days + 0.8 * complaints
churn = (rng.random(m) < 1 / (1 + np.exp(-logit))).astype(int)
pd.DataFrame({"orders_per_month": orders, "days_since_last": days, "complaints": complaints, "churned": churn}).to_csv("churn.csv", index=False)
~~~

بيعمل ملفين: [[flats.csv]] (٥٠٠ شقة) للدرس ده، و [[churn.csv]] (١٠٠٠ عميل) للدرس الجاي.

~~~text flats.csv (أول ٣ صفوف)
area,rooms,age,city,price
77,1,25,الجيزة,1007000.0
207,4,22,القاهرة,4060000.0
185,5,17,القاهرة,3692000.0
~~~

---

## ١. X و y

~~~python
X = df[["area", "rooms", "age"]]
y = df["price"]
~~~

| الاسم | إيه | الشكل |
|---|---|---|
| [[X]] | المدخلات (features): الحاجات اللي هنعرفها عن أي شقة جديدة | جدول [[(500, 3)]] |
| [[y]] | الإجابة (target): اللي عايزين نتوقعه | عمود [[(500,)]] |

[[X]] كابيتال و [[y]] صغير: عُرف من الرياضة (مصفوفة ومتجه). المدينة متشالة دلوقتي لأنها نص، والموديل عايز أرقام (درس [[Pipeline و ColumnTransformer]]).

## ٢. التقسيم

~~~python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
print(X_train.shape, X_test.shape)
~~~

~~~text الناتج
(400, 3) (100, 3)
~~~

- [[test_size=0.2]]: ٢٠٪ اختبار. الصفوف بتتخلط الأول، فالاختبار عينة عشوائية.
- [[random_state=42]]: نفس الخلطة كل مرة.
- بيرجّع ٤ حاجات بالترتيب ده، وبنفكهم في ٤ متغيرات.

القاعدة: الـ ١٠٠ دول **ممنوع** الموديل يشوفهم وهو بيتعلم. هما الامتحان.

---

## ٣. التدريب والتوقع

~~~python
model = LinearRegression()
model.fit(X_train, y_train)
pred = model.predict(X_test)
~~~

- [[LinearRegression()]]: موديل فاضي لسه.
- [[fit(X, y)]]: اتعلم من الـ ٤٠٠ مثال. بعدها الموديل جواه المعادلة.
- [[predict(X_test)]]: توقع سعر الـ ١٠٠ شقة اللي مشافهمش. [[pred]] array فيها ١٠٠ رقم.

## ٤. القياس

~~~text الناتج
MAE: 347168
R2: 0.869
~~~

- [[mean_absolute_error(y_test, pred)]]: في المتوسط الموديل بيغلط ٣٤٧ ألف جنيه (لفوق أو لتحت) في شقة مشافهاش. والأسعار نفسها من نص مليون لحوالي ٥٫٨ مليون.
- [[r2_score]] = ٠٫٨٦٩: الموديل بيفسّر حوالي ٨٧٪ من **اختلاف** الأسعار عن متوسطها. مش «صح ٨٧٪».

## ٥. المعادلة اللي اتعلمها

~~~text الناتج: print(dict(zip(X.columns, model.coef_.round())), round(model.intercept_))
{'area': np.float64(18082.0), 'rooms': np.float64(-25731.0), 'age': np.float64(-34136.0)} 550066
~~~

[[zip(X.columns, model.coef_)]] بيحط كل عمود جنب معامله. المعادلة:

~~~text
السعر ≈ 550066 + 18082 × المساحة − 25731 × الأوض − 34136 × العمر
~~~

- كل متر زيادة ≈ ١٨ ألف (القاعدة الحقيقية ٢٠ ألف × معامل المدينة، والموديل مش عارف المدينة).
- كل سنة عمر ≈ ٣٤ ألف أقل.
- الأوض بالسالب! مش معناها إن أوضة زيادة بتقلل السعر: الأوض أصلًا جاية من المساحة (الـ generator بيحسبها منها)، فالموديل بيستخدم المساحة للحكاية كلها والأوض بتصلّح فرق صغير. المعاملات مش سبب ونتيجة.

## ٦. خط الأساس

~~~text الناتج: baseline MAE
baseline MAE: 1009668
~~~

[[DummyRegressor()]] بيتوقع متوسط أسعار التدريب لكل شقة. غلطه مليون جنيه في المتوسط، يعني موديلنا قلّل الغلط لحوالي التلت. من غير الرقم ده الـ ٣٤٧ ألف ملهاش معنى.

## ٧. شقة جديدة

~~~python
new = pd.DataFrame({"area": [120], "rooms": [3], "age": [5]})
print(model.predict(new).round(-3))
~~~

~~~text الناتج
[2472000.]
~~~

الشقة الجديدة لازم تيجي **بنفس الأعمدة وبنفس الأسامي** اللي اتدرّب عليها، كجدول (حتى لو صف واحد). و [[round(-3)]] لأقرب ألف.

---

## الخلاصة

| الخطوة | الكود |
|---|---|
| المدخلات والإجابة | [[X = df[[...]]]] و [[y = df["target"]]] |
| تقسيم | [[train_test_split(X, y, test_size=0.2, random_state=42)]] |
| تدريب | [[model.fit(X_train, y_train)]] |
| توقع | [[model.predict(X_test)]] |
| قياس | [[mean_absolute_error]] و [[r2_score]] على الاختبار بس |
| مقارنة | [[DummyRegressor]] |

- كل موديلات scikit-learn نفس الواجهة: [[fit]] ثم [[predict]].
- الرقم على داتا الاختبار، ومقارن بـ baseline، وإلا ملوش معنى.`,
          lines: [
            "pandas.",
            "دالة التقسيم.",
            "الموديل الخطي.",
            "الموديل الغبي (خط الأساس).",
            "المقاييس.",
            "الشقق.",
            R`المدخلات: جدول ٣ أعمدة (لاحظ القوسين).`,
            "الإجابة: السعر.",
            R`٨٠٪ تدريب و ٢٠٪ اختبار، بخلطة ثابتة.`,
            R`[[(400, 3) (100, 3)]].`,
            "موديل فاضي.",
            "اتعلم من التدريب.",
            "توقع للاختبار.",
            "متوسط الغلط بالجنيه.",
            "R2: الموديل فسّر قد إيه من الاختلاف.",
            "المعاملات والثابت.",
            "الموديل اللي بيقول المتوسط دايمًا.",
            "غلطه: الرقم اللي لازم نعدّيه.",
            "شقة جديدة بنفس الأعمدة.",
            "سعرها المتوقع."
          ],
          sol: R`على [[area]] بس: [[MAE]] = ٤١٨٢٧٤ و [[R2]] = ٠٫٨٠١ (أسوأ من ٣٤٧١٦٨ و ٠٫٨٦٩ بالتلات أعمدة: العمر بيفرق)، والمعامل ١٨٣٤٨ للمتر.

و [[df["area"]]] بقوس واحد بيرجّع Series بُعد واحد، و scikit-learn عايز جدول ٢ بُعد للـ X: [[ValueError: Expected a 2-dimensional container but got <class 'pandas.Series'> instead. Pass a DataFrame containing a single row (i.e. single sample) or a single column (i.e. single feature) instead.]]`,
          solCode: R`X_train, X_test, y_train, y_test = train_test_split(df[["area"]], df["price"], test_size=0.2, random_state=42)
m = LinearRegression().fit(X_train, y_train)
p = m.predict(X_test)
print(round(mean_absolute_error(y_test, p)), round(r2_score(y_test, p), 3))   # 418274 0.801`
        },
        {
          cmd: "LogisticRegression",
          title: "classification: العميل ده هيمشي ولا لأ؟ و accuracy مش كفاية",
          desc: R`لما الإجابة **فئة** (هيمشي أو لأ، spam أو لأ) ده classification. [[LogisticRegression]] بيدّي لكل عميل احتمال ([[predict_proba]])، و [[predict]] بيقول «هيمشي» لو الاحتمال ٠٫٥ أو أكتر.

و accuracy لوحدها بتضحك عليك: لو ٦٥٪ من العملاء مش بيمشوا، موديل بيقول «مش هيمشي» لكله دقته ٦٥٪ وهو مبيعملش حاجة. عشان كده [[confusion_matrix]] و precision و recall، وعشان كده [[stratify=y]] في التقسيم.`,
          example: R`import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
df = pd.read_csv("churn.csv")
X = df.drop(columns="churned")
y = df["churned"]
print(y.value_counts(normalize=True).round(2))
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
clf = LogisticRegression().fit(X_train, y_train)
pred = clf.predict(X_test)
print("accuracy:", round(accuracy_score(y_test, pred), 3))
print("always 0:", round((y_test == 0).mean(), 3))
print(confusion_matrix(y_test, pred))
print(classification_report(y_test, pred, digits=2))
print(clf.predict_proba(X_test.head(3)).round(2))
pred30 = (clf.predict_proba(X_test)[:, 1] >= 0.3).astype(int)
print(confusion_matrix(y_test, pred30))`,
          try: R`درّب نفس الموديل بـ [[class_weight="balanced"]] وقارن الـ confusion matrix والـ recall والـ accuracy باللي في المثال. وبعدين اطبع [[clf.coef_]] جنب أسامي الأعمدة: أنهي خاصية بتزوّد احتمال المشي وأنهي بتقلله؟`,
          flag: "script",
          deep: {
            why: R`أغلب أسئلة الـ ML في الشغل «نعم أو لأ»: العميل هيلغي الاشتراك؟ العملية دي احتيال؟ الإيميل spam؟ وتمن الغلط في الناحيتين مش واحد: إنك تفوّت عميل هيمشي (ومتكلموش) غالبًا أغلى من إنك تكلم عميل مكانش هيمشي. فلازم تعرف الموديل بيغلط **إزاي** مش بس **قد إيه**.`,
            how: R`[[LogisticRegression]] بيحسب رقم من معادلة خطية (زي الدرس اللي فات) ويدخّله في دالة اسمها sigmoid بتحوّل أي رقم لاحتمال بين ٠ و ١. معامل موجب = الخاصية دي بتزوّد احتمال الفئة ١.

[[predict_proba]] بيرجّع عمودين: احتمال ٠ واحتمال ١ (مجموعهم ١). و [[[:, 1]]] العمود التاني. [[predict]] = احتمال ١ ≥ ٠٫٥. وتقدر تغيّر الحد ده بإيدك.

الـ confusion matrix في scikit-learn: الصفوف الحقيقة والأعمدة التوقع، بالترتيب ٠ ثم ١:

[[[TN, FP], [FN, TP]]]: TN مش هيمشي وقلنا مش هيمشي، و FP مش هيمشي وقلنا هيمشي (إنذار كداب)، و FN هيمشي وقلنا لأ (فوّتناه)، و TP هيمشي وقلناه.

precision (للفئة ١) = TP ÷ (TP + FP): من اللي قلنا عليهم هيمشوا، كام فعلًا مشيوا. recall = TP ÷ (TP + FN): من اللي مشيوا فعلًا، مسكنا كام. و f1 متوسط بيجمعهم. و [[stratify=y]] بيخلي نسبة الـ ١ في التدريب والاختبار زي الداتا كلها.`,
            when: R`أي سؤال نعم أو لأ، أو فئة من كذا فئة (نفس الكود بيشتغل). ارفع الـ recall (حد أقل من ٠٫٥ أو [[class_weight="balanced"]]) لما تفويت الحالة أغلى (احتيال، مرض، عميل مهم هيمشي)، وارفع الـ precision لما الإنذار الكداب أغلى (حظر حساب بالغلط).`,
            mistakes: R`تحكم بالـ accuracy على داتا غير متوازنة. ومتعملش [[stratify]] فالاختبار يطلع نسبته مختلفة. وتقرا الـ confusion matrix بالمقلوب (الصفوف الحقيقة). وتسيب الحد ٠٫٥ وهو مش مناسب لشغلك. وتنسى إن الاحتمالات من موديل ضعيف مش «احتمالات حقيقية» تتبني عليها قرارات بالأرقام.`
          },
          teach: R`## المثال بيعمل إيه؟

١٠٠٠ عميل من [[churn.csv]] (اتعمل بـ [[make_ml.py]] في درس [[LinearRegression]]): لكل واحد عدد طلباته في الشهر، وأيام من آخر طلب، وعدد شكاويه، وهل مشي ([[churned]] = ١) ولا لأ. بندرّب موديل يتوقع مين هيمشي، ونقيسه بأكتر من طريقة، ونغيّر الحد. اتشغّل بـ scikit-learn 1.9 في Docker.

~~~text churn.csv (أول ٣ صفوف)
orders_per_month,days_since_last,complaints,churned
3,62,1,1
5,71,1,0
3,77,0,0
~~~

---

## ١. X و y والتوازن

~~~python
X = df.drop(columns="churned")
y = df["churned"]
print(y.value_counts(normalize=True).round(2))
~~~

~~~text الناتج
churned
0    0.65
1    0.35
Name: proportion, dtype: float64
~~~

- [[drop(columns="churned")]]: كل الأعمدة ما عدا الإجابة.
- ٦٥٪ مكملين و ٣٥٪ مشيوا. الداتا مش متوازنة، وده هيفرق في القياس.

## ٢. التقسيم بـ [[stratify]]

~~~python
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=0, stratify=y)
~~~

[[stratify=y]]: خلّي نسبة الـ ١ في التدريب والاختبار ٣٥٪ زي الكل. من غيرها ممكن الاختبار (٢٥٠ عميل) يطلع ٢٥٪ أو ٤٥٪ بالصدفة.

---

## ٣. التدريب والـ accuracy

~~~text الناتج
accuracy: 0.76
always 0: 0.652
~~~

- [[accuracy_score]]: ٧٦٪ من التوقعات صح.
- [[(y_test == 0).mean()]]: لو قلنا «مش هيمشي» لكل الناس هنبقى صح ٦٥٫٢٪. فالموديل كسب ١١ نقطة بس فوق الغباء. ده مش واضح من الـ ٧٦٪ لوحدها.

## ٤. الـ confusion matrix

~~~text الناتج
[[139  24]
 [ 36  51]]
~~~

|  | توقعنا: مش هيمشي (٠) | توقعنا: هيمشي (١) |
|---|---|---|
| **الحقيقة: مكمّل (٠)** | ١٣٩ صح (TN) | ٢٤ إنذار كداب (FP) |
| **الحقيقة: مشي (١)** | ٣٦ فوّتناهم (FN) | ٥١ مسكناهم (TP) |

من ٨٧ عميل مشيوا فعلًا، الموديل مسك ٥١ بس وفوّت ٣٦.

## ٥. [[classification_report]]

~~~text الناتج
              precision    recall  f1-score   support

           0       0.79      0.85      0.82       163
           1       0.68      0.59      0.63        87

    accuracy                           0.76       250
~~~

للفئة ١ (اللي بيمشوا):

- **precision** = ٥١ ÷ (٥١ + ٢٤) = ٠٫٦٨: من اللي قلنا هيمشوا، ٦٨٪ مشيوا فعلًا.
- **recall** = ٥١ ÷ (٥١ + ٣٦) = ٠٫٥٩: من اللي مشيوا، مسكنا ٥٩٪.
- **f1**: متوسط (توافقي) للاتنين.
- **support**: عددهم في الاختبار (٨٧).

## ٦. الاحتمالات

~~~text الناتج: print(clf.predict_proba(X_test.head(3)).round(2))
[[0.85 0.15]
 [0.18 0.82]
 [0.75 0.25]]
~~~

لكل عميل: احتمال ٠ واحتمال ١. التاني ٨٢٪ هيمشي، فـ [[predict]] قال ١. و [[[:, 1]]] = كل الصفوف، العمود التاني (احتمال المشي).

## ٧. نغيّر الحد

~~~python
pred30 = (clf.predict_proba(X_test)[:, 1] >= 0.3).astype(int)
~~~

~~~text الناتج
[[111  52]
 [ 13  74]]
~~~

«أي حد احتمال مشيه ٣٠٪ أو أكتر نعتبره هيمشي». [[>= 0.3]] بيدّي True و False، و [[astype(int)]] بيحوّلهم ١ و ٠. النتيجة: مسكنا ٧٤ من ٨٧ (recall ٠٫٨٥ بدل ٠٫٥٩)، بس الإنذار الكداب زاد من ٢٤ لـ ٥٢. لو تمن تفويت عميل أعلى من تمن مكالمة زيادة، الحد ده أحسن، مع إن الـ accuracy نزلت.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تقسيم بنفس النسب | [[train_test_split(..., stratify=y)]] |
| فئة | [[clf.predict(X)]] |
| احتمال | [[clf.predict_proba(X)[:, 1]]] |
| حد غير ٠٫٥ | [[(proba >= 0.3).astype(int)]] |
| تشوف الغلط إزاي | [[confusion_matrix(y_true, y_pred)]] |
| precision و recall | [[classification_report(y_true, y_pred)]] |

- قارن الـ accuracy بـ «اقول الفئة الأكبر دايمًا».
- precision: لما قلت نعم، كنت صح قد إيه. recall: من كل النعم، مسكت قد إيه.`,
          lines: [
            "pandas.",
            "التقسيم.",
            "الموديل.",
            "المقاييس.",
            "العملاء.",
            "المدخلات: كل الأعمدة ما عدا الإجابة.",
            R`الإجابة: ٠ أو ١.`,
            "نسبة كل فئة: ٦٥٪ و ٣٥٪.",
            R`تقسيم بنفس النسبة في الناحيتين ([[stratify]]).`,
            "درّب.",
            R`توقع (حد ٠٫٥).`,
            R`الدقة: [[0.76]].`,
            "دقة اللي بيقول «مش هيمشي» دايمًا: ٠٫٦٥٢.",
            "الغلط بالتفصيل.",
            "precision و recall لكل فئة.",
            "احتمالات أول ٣ عملاء.",
            "حد ٣٠٪ بدل ٥٠٪.",
            "مسكنا أكتر، وإنذارات كدابة أكتر."
          ],
          sol: R`بـ [[class_weight="balanced"]] (بيدّي أمثلة الفئة الصغيرة وزن أكبر في التدريب): الـ confusion matrix بقت [[[[117  46] [ 17  70]]]]، يعني recall للفئة ١ = ٧٠ ÷ ٨٧ = ٠٫٨، و precision = ٧٠ ÷ ١١٦ = ٠٫٦، والـ accuracy نزلت لـ ٠٫٧٤٨. نفس فكرة تنزيل الحد: بتمسك أكتر وبتغلط في إنذارات أكتر.

والمعاملات: [[orders_per_month]] ‎-0.453 (طلبات أكتر = احتمال مشي أقل)، و [[days_since_last]] 0.03 لكل يوم (غياب أطول = احتمال أعلى، والرقم صغير لأن الوحدة يوم والمدى لحد ١٢٠)، و [[complaints]] 0.746 (كل شكوى بتزوّد الاحتمال كتير). ودي نفس الإشارات اللي الـ generator اتعمل بيها (-0.5 و 0.03 و 0.8).`,
          solCode: R`bal = LogisticRegression(class_weight="balanced").fit(X_train, y_train)
pb = bal.predict(X_test)
print(confusion_matrix(y_test, pb))        # [[117  46] [ 17  70]]
print(classification_report(y_test, pb))
print(dict(zip(X.columns, clf.coef_[0].round(3))))`
        },
        {
          cmd: "overfitting و cross_val_score",
          title: "الموديل اللي حفظ الإجابات: overfitting، وتقيس بـ cross-validation",
          desc: R`**overfitting** = الموديل حفظ داتا التدريب بدل ما يفهم القاعدة: غلطه على التدريب قليل جدًا وعلى الاختبار كبير. بتكشفه لما تقارن الرقمين، وبتعالجه بموديل أبسط (هنا [[max_depth]] للشجرة) أو داتا أكتر.

و [[cross_val_score(model, X, y, cv=5)]] بيقسم الداتا ٥ أجزاء، ويدرّب ٥ مرات كل مرة بيختبر على جزء مختلف، فبتاخد ٥ أرقام بدل رقم واحد ممكن يكون حظ.`,
          example: R`import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.tree import DecisionTreeRegressor
from sklearn.metrics import mean_absolute_error
df = pd.read_csv("flats.csv")
X, y = df[["area", "rooms", "age"]], df["price"]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
for depth in [1, 3, 5, 10, None]:
    tree = DecisionTreeRegressor(max_depth=depth, random_state=0).fit(X_train, y_train)
    tr = mean_absolute_error(y_train, tree.predict(X_train))
    te = mean_absolute_error(y_test, tree.predict(X_test))
    print(f"depth={str(depth):<5} train={tr:>9,.0f}  test={te:>9,.0f}")
scores = cross_val_score(DecisionTreeRegressor(max_depth=5, random_state=0), X, y, cv=5, scoring="neg_mean_absolute_error")
print((-scores).round(-3), round(-scores.mean(), -3))`,
          try: R`قارن ٣ موديلات بـ [[cross_val_score]] و [[cv=5]] على نفس [[X]] و [[y]]: [[DecisionTreeRegressor(max_depth=5)]] و [[RandomForestRegressor(random_state=0)]] (من [[sklearn.ensemble]]) و [[LinearRegression()]]. مين الأحسن هنا؟ وليه ممكن الموديل الخطي البسيط يكسب؟`,
          flag: "script",
          deep: {
            why: R`أسهل حاجة في الـ ML إنك تعمل موديل بيطلع رقم ممتاز على الداتا اللي اتدرّب عليها. وده بالظبط اللي بيوقع ناس كتير: الموديل يتنشر ويطلع ضعيف على الداتا الحقيقية. فهم overfitting وطريقة القياس الصح هو الفرق بين موديل بيشتغل وموديل بيضحك عليك.`,
            how: R`الشجرة (Decision Tree) بتسأل أسئلة نعم/لأ متتالية ([[area <= 150؟]] ثم [[age <= 12؟]]...) وكل ورقة في الآخر بتتوقع متوسط الأسعار اللي وصلتلها. [[max_depth]] أقصى عدد أسئلة. شجرة من غير حد بتفضل تقسم لحد ما كل ورقة فيها شقة أو اتنين، يعني حفظت الأسعار بالضوضاء اللي فيها.

فيه طرفين: موديل بسيط زيادة (underfitting) غلطه عالي في الاتنين، وموديل معقد زيادة (overfitting) غلطه قليل في التدريب وعالي في الاختبار. الصح في النص، وبتلاقيه بالتجربة.

[[cross_val_score]] بـ [[cv=5]] (K-fold): الداتا ٥ أجزاء، وكل مرة ٤ تدريب وواحد اختبار، فكل صف اتختبر مرة. المتوسط أثبت من تقسيمة واحدة. و scikit-learn بيعتبر «أكبر أحسن» دايمًا، فمقاييس الغلط بتيجي بالسالب ([[neg_mean_absolute_error]])، وعشان كده [[-scores]].

ولما تختار بين موديلات أو إعدادات بالـ cross-validation، سيب اختبار نهائي على جنب متلمسوش غير مرة في الآخر (وإلا انت نفسك عملت overfit على الاختبار بكتر التجريب).`,
            when: R`كل مرة تختار موديل أو إعداد ([[max_depth]]، عدد الشجر...): قارن تدريب واختبار، واستخدم cross-validation. و [[GridSearchCV]] بيجرّب إعدادات كتير بالـ cross-validation لوحده (من الـ docs). ولو الداتا time series، التقسيم العشوائي غلط: [[TimeSeriesSplit]] (التدريب دايمًا قبل الاختبار في الوقت).`,
            mistakes: R`تبص على رقم التدريب بس. وتجرّب ١٠٠ إعداد على نفس الاختبار وتختار الأحسن (overfit على الاختبار). وتفتكر إن الموديل الأعقد دايمًا أحسن. وتنسى الإشارة السالبة في [[neg_...]]. وتقسيم عشوائي لداتا فيها وقت (المستقبل بيتسرّب للتدريب).`
          },
          teach: R`## المثال بيعمل إيه؟

بندرّب ٥ أشجار قرار على [[flats.csv]] (درس [[LinearRegression]])، كل واحدة أعمق من اللي قبلها، ونقارن غلط كل واحدة على التدريب وعلى الاختبار. وبعدين نقيس واحدة بالـ cross-validation. اتشغّل بـ scikit-learn 1.9 في Docker.

---

## ١. الشجرة و [[max_depth]]

~~~python
for depth in [1, 3, 5, 10, None]:
    tree = DecisionTreeRegressor(max_depth=depth, random_state=0).fit(X_train, y_train)
~~~

- [[DecisionTreeRegressor]]: شجرة قرار بتتوقع رقم. بتسأل سؤال على خاصية (المساحة أقل من كذا؟) وتقسم، وتسأل تاني في كل ناحية، ولحد ما توصل لورقة بتقول متوسط الأسعار اللي فيها.
- [[max_depth]]: أقصى عدد أسئلة من فوق لتحت. [[1]] = سؤال واحد (ورقتين بس)، و [[None]] = من غير حد.
- [[random_state=0]]: لما فيه تعادل بين تقسيمتين، الاختيار يبقى ثابت.
- [[.fit(...)]] بترجّع الموديل نفسه، فينفع تكتبها في نفس السطر.

## ٢. الغلط في الناحيتين

~~~python
tr = mean_absolute_error(y_train, tree.predict(X_train))
te = mean_absolute_error(y_test, tree.predict(X_test))
print(f"depth={str(depth):<5} train={tr:>9,.0f}  test={te:>9,.0f}")
~~~

[[:>9,.0f]]: عرض ٩ محاذي لليمين ([[>]])، و [[,]] فاصلة الآلاف، و [[.0f]] من غير كسور. و [[str(depth)]] عشان [[None]] تتطبع.

~~~text الناتج
depth=1     train=  561,766  test=  565,577
depth=3     train=  361,096  test=  392,815
depth=5     train=  285,471  test=  398,675
depth=10    train=   47,646  test=  479,207
depth=None  train=    6,862  test=  446,280
~~~

| العمق | التدريب | الاختبار | التشخيص |
|---|---|---|---|
| ١ | ٥٦٢ ألف | ٥٦٦ ألف | بسيط زيادة (underfitting): غلطان في الاتنين |
| ٣ | ٣٦١ ألف | ٣٩٣ ألف | أحسن اختبار، والفرق صغير |
| ٥ | ٢٨٥ ألف | ٣٩٩ ألف | الفرق بيكبر |
| ١٠ | ٤٨ ألف | ٤٧٩ ألف | **overfitting**: حفظ التدريب |
| من غير حد | ٧ آلاف | ٤٤٦ ألف | حفظ تقريبًا كل شقة |

العمق ١٠ غلطه على التدريب أقل ١٠ مرات من العمق ٣، وعلى الشقق الجديدة أسوأ. ده overfitting بالظبط: الشجرة اتعلمت الضوضاء العشوائية اللي في الأسعار كأنها قاعدة. (التدريب من غير حد مش صفر لأن فيه شقق بنفس المساحة والأوض والعمر وأسعار مختلفة، فالشجرة مش قادرة تفرّقهم.)

---

## ٣. cross-validation

~~~python
scores = cross_val_score(DecisionTreeRegressor(max_depth=5, random_state=0), X, y, cv=5, scoring="neg_mean_absolute_error")
print((-scores).round(-3), round(-scores.mean(), -3))
~~~

~~~text الناتج
[407000. 370000. 393000. 380000. 428000.] 395000.0
~~~

- [[cross_val_score]] بياخد موديل **مش متدرّب** والداتا **كلها** ([[X]] و [[y]] مش التدريب بس).
- [[cv=5]]: قسّم ٥ أجزاء، ودرّب ٥ مرات، كل مرة اختبر على جزء مختلف.
- [[scoring="neg_mean_absolute_error"]]: MAE بالسالب (scikit-learn بيعتبر الرقم الأكبر أحسن دايمًا)، و [[-scores]] بيرجّعها موجبة.

الـ ٥ أرقام من ٣٧٠ لـ ٤٢٨ ألف: نفس الموديل بيدّي أرقام مختلفة بـ ٦٠ ألف حسب أنهي شقق وقعت في الاختبار. يعني رقم تقسيمة واحدة (٣٩٩ ألف فوق) فيه حظ، والمتوسط ٣٩٥ ألف أثبت.

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تكشف overfitting | قارن MAE على [[X_train]] وعلى [[X_test]] |
| تبسّط الشجرة | [[max_depth=3]] (أو [[min_samples_leaf]]) |
| قياس أثبت | [[cross_val_score(model, X, y, cv=5, scoring=...)]] |
| مقاييس الغلط | [[neg_...]] وبعدين [[-scores]] |

- غلط قليل على التدريب مش إنجاز. المهم الاختبار.
- الموديل الأعقد مش دايمًا أحسن.`,
          lines: [
            "pandas.",
            "التقسيم والـ cross-validation.",
            "شجرة القرار.",
            "المقياس.",
            "الشقق.",
            "المدخلات والإجابة في سطر.",
            "تدريب واختبار.",
            "لكل عمق...",
            "درّب شجرة بالعمق ده.",
            "غلطها على التدريب.",
            "وعلى الاختبار.",
            "اطبعهم جنب بعض.",
            R`٥ تقسيمات للشجرة بعمق ٥.`,
            R`الـ ٥ أرقام ومتوسطهم ([[-]] عشان المقياس بالسالب).`
          ],
          sol: R`المتوسطات (MAE، ٥ أجزاء): الشجرة بعمق ٥ = ٣٩٥ ألف، و Random Forest = ٣٧٧ ألف، و **LinearRegression = ٣٤٩ ألف**. الخطي كسب.

ليه؟ القاعدة اللي الداتا اتعملت بيها قريبة من خطية (السعر بيزيد مع المساحة بمعدل شبه ثابت)، والشجرة بتقرّب أي علاقة بسلالم، فمحتاجة داتا كتير عشان تقرّب خط مستقيم كويس، و ٥٠٠ شقة مش كتير. والـ Random Forest (متوسط ١٠٠ شجرة كل واحدة على عينة مختلفة) أحسن من شجرة واحدة لأن المتوسط بيقلل الحفظ، بس برضه مكسبش الخط. الدرس: جرّب البسيط الأول، ومتفترضش إن الأعقد أحسن.`,
          solCode: R`from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
for name, m in [("tree5", DecisionTreeRegressor(max_depth=5, random_state=0)),
                ("forest", RandomForestRegressor(random_state=0)),
                ("linear", LinearRegression())]:
    s = -cross_val_score(m, X, y, cv=5, scoring="neg_mean_absolute_error")
    print(name, round(s.mean(), -3))
# tree5 395000.0 / forest 377000.0 / linear 349000.0`
        },
        {
          cmd: "Pipeline و ColumnTransformer",
          title: "تجهيز الداتا والموديل في object واحد: نصوص وناقص و scaling من غير تسريب",
          desc: R`الموديل عايز أرقام من غير ناقص. [[ColumnTransformer]] بيجهّز كل نوع أعمدة بطريقته: الأرقام [[SimpleImputer]] (يملا الناقص) ثم [[StandardScaler]]، والنصوص [[OneHotEncoder]] (عمود ٠/١ لكل قيمة). و [[Pipeline]] بيلزق التجهيز والموديل في object واحد ليه [[fit]] و [[predict]].

الفايدة الكبيرة: التجهيز بيتعلّم من داتا التدريب بس (مفيش **data leakage**)، ونفس الخطوات بالظبط بتتطبق على أي داتا جديدة، والـ object كله بيتحفظ في ملف واحد.`,
          example: R`import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
df = pd.read_csv("flats.csv")
X, y = df.drop(columns="price"), df["price"]
pre = ColumnTransformer([
    ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), ["area", "rooms", "age"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["city"]),
])
model = Pipeline([("pre", pre), ("reg", LinearRegression())])
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model.fit(X_train, y_train)
print("MAE:", round(mean_absolute_error(y_test, model.predict(X_test))))
print(model.named_steps["pre"].get_feature_names_out())
print((-cross_val_score(model, X, y, cv=5, scoring="neg_mean_absolute_error")).round(-3))
new = pd.DataFrame({"area": [120], "rooms": [None], "age": [5], "city": ["المنصورة"]})
print(model.predict(new).round(-3))`,
          try: R`بدّل [[LinearRegression()]] بـ [[RandomForestRegressor(random_state=0)]] جوه نفس الـ Pipeline (التجهيز زي ما هو) وقارن متوسط الـ cross-validation. وبعدين اطبع معاملات الموديل الخطي جنب أسامي الأعمدة بعد التجهيز: المدينة بتفرق قد إيه؟`,
          flag: "script",
          deep: {
            why: R`الداتا الحقيقية فيها نصوص (المدينة) وناقص وأرقام بمقاييس مختلفة (مساحة بالمئات وعمر بالعشرات). لو جهّزتها بإيدك بـ pandas قبل الموديل، هتقع في واحدة من غلطتين: تجهّز على الداتا كلها قبل التقسيم (التسريب: الاختبار «سرّب» معلومات للتدريب فالرقم أحسن من الحقيقة)، أو تنسى خطوة لما توصل لـ API الإنتاج فالموديل ياخد داتا بشكل غير اللي اتدرّب عليه. الـ Pipeline بيحل الاتنين.`,
            how: R`كل خطوة تجهيز في scikit-learn ليها [[fit]] (اتعلم: المتوسط، الـ median، القيم الموجودة) و [[transform]] (طبّق). الـ Pipeline لما تعمله [[fit(X_train)]] بيعمل [[fit]] و [[transform]] لكل خطوة بالترتيب على التدريب بس، وبعدين [[fit]] للموديل. ولما تعمله [[predict(X)]] بيعمل [[transform]] بس بالأرقام اللي اتعلمها، ثم [[predict]].

[[SimpleImputer(strategy="median")]] بيحفظ median كل عمود من التدريب ويملا بيه. و [[StandardScaler]] بيحوّل كل عمود لـ (القيمة − المتوسط) ÷ الانحراف المعياري، فكل الأعمدة تبقى على نفس المقياس (مهم لموديلات كتير، ومش مهم للأشجار). و [[OneHotEncoder]] بيعمل عمود لكل مدينة فيه ١ لو الصف ده المدينة دي و ٠ غير كده، و [[handle_unknown="ignore"]] بيخلي مدينة جديدة مشافهاش كل أعمدتها صفر بدل ما يرمي [[ValueError: Found unknown categories]].

[[ColumnTransformer]] بيطبّق كل تجهيز على أعمدته ويلزق النتايج جنب بعض. و [[make_pipeline]] نسخة مختصرة من [[Pipeline]] بتسمّي الخطوات لوحدها. و [[cross_val_score]] على الـ Pipeline كله بيعيد التجهيز جوه كل تقسيمة، فالقياس نضيف.`,
            when: R`دايمًا، أول ما يبقى فيه أي تجهيز. وبالذات قبل ما تحفظ الموديل للإنتاج: الـ Pipeline هو اللي يتحفظ، مش الموديل لوحده (الدرس الجاي).`,
            mistakes: R`[[StandardScaler().fit(X)]] على الداتا كلها قبل [[train_test_split]] (تسريب). و [[pd.get_dummies]] على التدريب والاختبار كل واحد لوحده فالأعمدة تطلع مختلفة. وتنسى [[handle_unknown="ignore"]] فأول مدينة جديدة توقع الـ API. وتحفظ الموديل من غير التجهيز. وتحط عمود محسوب من الإجابة في [[X]] (زي [[total]] لو بتتوقع [[qty]]): تسريب برضه.`
          },
          teach: R`## المثال بيعمل إيه؟

نفس الشقق من [[flats.csv]]، بس المرة دي بندخّل المدينة (نص) كمان، وبنجهّز الأعمدة جوه Pipeline، وندرّب ونقيس، ونتوقع لشقة فيها خانة ناقصة ومدينة الموديل مشافهاش. اتشغّل بـ scikit-learn 1.9 في Docker.

---

## ١. التجهيز: [[ColumnTransformer]]

~~~python
pre = ColumnTransformer([
    ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), ["area", "rooms", "age"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["city"]),
])
~~~

list من tuples، كل واحدة (اسم، تجهيز، أعمدة):

| الاسم | التجهيز | الأعمدة | بيعمل إيه |
|---|---|---|---|
| [[num]] | [[SimpleImputer(strategy="median")]] | الأرقام | الخانة الناقصة تتملا بالـ median بتاع التدريب |
| | ثم [[StandardScaler()]] | | كل عمود: (القيمة − المتوسط) ÷ الانحراف، فيبقى حوالين الصفر |
| [[cat]] | [[OneHotEncoder(handle_unknown="ignore")]] | المدينة | عمود لكل مدينة فيه ٠ أو ١ |

و [[make_pipeline(a, b)]] = خطوتين ورا بعض للأعمدة دي.

ليه OneHot ومش نرقّم المدن ١ و ٢ و ٣؟ الترقيم بيقول للموديل إن الإسكندرية «ضعف» الجيزة، وده ملوش معنى. عمود لكل مدينة بيخلي الموديل يتعلم تأثير كل مدينة لوحده.

## ٢. الـ Pipeline

~~~python
model = Pipeline([("pre", pre), ("reg", LinearRegression())])
~~~

التجهيز ثم الموديل، كل واحد باسم. [[model]] دلوقتي object واحد ليه [[fit]] و [[predict]] زي أي موديل.

---

## ٣. التدريب والقياس

~~~python
model.fit(X_train, y_train)
print("MAE:", round(mean_absolute_error(y_test, model.predict(X_test))))
~~~

~~~text الناتج
MAE: 218316
~~~

[[fit]]: التجهيز اتعلم الـ median والمتوسطات والمدن **من الـ ٤٠٠ بتوع التدريب بس**، وبعدين الموديل اتدرّب على الناتج. [[predict]] على الاختبار: طبّق نفس التجهيز بنفس الأرقام ثم توقع.

الغلط نزل من ٣٤٧ ألف (من غير المدينة، درس [[LinearRegression]]) لـ ٢١٨ ألف. المدينة كانت معلومة ناقصة مهمة.

## ٤. الأعمدة بعد التجهيز

~~~text الناتج: print(model.named_steps["pre"].get_feature_names_out())
['num__area' 'num__rooms' 'num__age' 'cat__city_الإسكندرية'
 'cat__city_الجيزة' 'cat__city_القاهرة']
~~~

[[named_steps["pre"]]] بيجيب الخطوة بالاسم. الـ ٤ أعمدة بقوا ٦: ٣ أرقام متظبطة، و ٣ أعمدة للمدن. والاسم بيبدأ باسم التجهيز ([[num__]] و [[cat__]]).

## ٥. cross-validation للـ Pipeline كله

~~~text الناتج
[174000. 203000. 209000. 227000. 230000.]
~~~

[[cross_val_score(model, X, y, ...)]] على الـ Pipeline: في كل تقسيمة من الـ ٥ التجهيز بيتعلم من جزء التدريب بتاعها بس. ده اللي بيمنع التسريب. المتوسط حوالي ٢٠٩ ألف.

---

## ٦. شقة فيها ناقص ومدينة جديدة

~~~python
new = pd.DataFrame({"area": [120], "rooms": [None], "age": [5], "city": ["المنصورة"]})
print(model.predict(new).round(-3))
~~~

~~~text الناتج
[2439000.]
~~~

- [[rooms]] ناقصة: الـ imputer حط الـ median بتاع التدريب.
- [[المنصورة]] مكانتش في التدريب: [[handle_unknown="ignore"]] خلّى أعمدة المدن التلاتة أصفار. من غيرها: [[ValueError: Found unknown categories ['المنصورة'] in column 0 during transform]] (جرّبناها).
- التوقع اشتغل، بس خد بالك: «كل المدن صفر» معناها «مدينة متوسطة» تقريبًا، مش المنصورة الحقيقية. الموديل ميعرفش اللي مشافهوش.

---

## الخلاصة

| الحتة | ليه |
|---|---|
| [[SimpleImputer]] | الموديلات مبتقبلش NaN |
| [[StandardScaler]] | الأرقام على نفس المقياس |
| [[OneHotEncoder(handle_unknown="ignore")]] | النصوص لأعمدة ٠/١، والجديد ميوقعش |
| [[ColumnTransformer]] | كل نوع أعمدة بتجهيزه |
| [[Pipeline]] | التجهيز والموديل object واحد: fit مرة، و predict بنفس الخطوات |

- التجهيز يتعلم من التدريب بس. الـ Pipeline بيضمن ده لوحده.
- اللي هيتحفظ وينزل الإنتاج هو الـ Pipeline كله.`,
          lines: [
            "pandas.",
            "مجمّع التجهيزات.",
            "ملي الناقص.",
            "الموديل.",
            "المقياس.",
            "التقسيم والـ cross-validation.",
            "الـ Pipeline.",
            "الـ scaling والـ one-hot.",
            "الشقق.",
            "المدخلات (ومعاها المدينة) والإجابة.",
            "التجهيز:",
            "الأرقام: املا الناقص بالـ median ثم scaling.",
            "المدينة: عمود لكل مدينة، والجديدة متوقعش.",
            "قفلة.",
            "التجهيز ثم الموديل في object واحد.",
            "تدريب واختبار.",
            "التجهيز والموديل اتعلموا من التدريب بس.",
            R`[[MAE: 218316]].`,
            "أسامي الأعمدة بعد التجهيز.",
            "cross-validation للـ Pipeline كله.",
            "شقة فيها خانة ناقصة ومدينة جديدة.",
            "التوقع اشتغل."
          ],
          sol: R`متوسط الـ cross-validation: الخطي ٢٠٩ ألف، و Random Forest ٢٠٥ ألف. المرة دي الغابة كسبت بفرق صغير، لأن تأثير المدينة **بيضرب** في السعر (معامل ١٫٢ للقاهرة) والشجر بيمسك التفاعلات دي، والخط بيجمع بس. والتجهيز زي ما هو اشتغل مع الاتنين (الـ scaling مش لازم للشجر بس مبيضرش).

والمعاملات (موديل المثال) بعد التقريب: [[cat__city_القاهرة]] ‎+445 ألف، و [[cat__city_الجيزة]] ‎-83 ألف، و [[cat__city_الإسكندرية]] ‎-362 ألف: الفرق بين القاهرة والإسكندرية لنفس الشقة حوالي ٨٠٠ ألف. ومعامل [[num__area]] ‎+943 ألف بقى «لكل انحراف معياري» مش لكل متر، بسبب الـ scaling.`,
          solCode: R`from sklearn.ensemble import RandomForestRegressor
forest = Pipeline([("pre", pre), ("reg", RandomForestRegressor(random_state=0))])
print(-cross_val_score(forest, X, y, cv=5, scoring="neg_mean_absolute_error").mean())   # ~205000
names = model.named_steps["pre"].get_feature_names_out()
print(dict(zip(names, model.named_steps["reg"].coef_.round(-3))))`
        },
        {
          cmd: "joblib و FastAPI",
          title: "تحفظ الموديل في ملف وتقدّمه API بـ FastAPI",
          desc: R`[[joblib.dump(model, "model.joblib")]] بيحفظ الـ Pipeline كله (التجهيز والموديل) في ملف، و [[joblib.load]] بيرجّعه. والـ API بيحمّله **مرة واحدة** وقت التشغيل (في [[lifespan]])، ويستقبل الطلب كـ Pydantic model بيفحص المدخلات، ويحوّله DataFrame بنفس الأعمدة، ويرجّع التوقع.

الأساس بتاع FastAPI و Pydantic في تاب «Python و FastAPI» (دروس [[fastapi dev]] و [[BaseModel و Field]]). وتحذير: [[joblib.load]] بيشغّل كود، فمتحمّلش ملف موديل من مصدر مش واثق فيه.`,
          example: R`from contextlib import asynccontextmanager
from typing import Literal
import joblib
import pandas as pd
from fastapi import FastAPI
from pydantic import BaseModel, Field
class Flat(BaseModel):
    area: int = Field(gt=20, le=1000)
    rooms: int = Field(ge=1, le=10)
    age: int = Field(ge=0, le=100)
    city: Literal["القاهرة", "الجيزة", "الإسكندرية"]
ml = {}
@asynccontextmanager
async def lifespan(app: FastAPI):
    ml.update(joblib.load("flat_price.joblib"))
    yield
    ml.clear()
app = FastAPI(lifespan=lifespan)
@app.post("/predict")
def predict(flat: Flat) -> dict[str, float | str]:
    row = pd.DataFrame([flat.model_dump()], columns=ml["columns"])
    price = ml["model"].predict(row)[0]
    return {"price": round(float(price), -3), "model_sklearn": ml["sklearn"]}
# في الترمنال (بعد python train.py اللي في الشرح):
# fastapi run serve.py
# curl -X POST localhost:8000/predict -H "Content-Type: application/json" -d '{"area": 120, "rooms": 3, "age": 5, "city": "القاهرة"}'`,
          try: R`زوّد endpoint [[POST /predict/batch]] بياخد list من الشقق ([[list[Flat]]]) ويرجّع list أسعار في طلب واحد (الـ DataFrame يبقى كذا صف و [[predict]] مرة واحدة). وبعدين ابعت شقة مساحتها ٥ ومدينتها «المنصورة» وشوف الرد ورقمه.`,
          flag: "script",
          deep: {
            why: R`الموديل اللي في notebook محدش يقدر يستخدمه. عشان التطبيق (موقع، أو موبايل، أو نظام تاني) يسأل «الشقة دي بكام؟» لازم الموديل يبقى خدمة: API بياخد JSON ويرجّع JSON. و FastAPI مناسب لده لأنه Python (نفس بيئة الموديل)، و Pydantic بيمنع الداتا الغلط توصل للموديل أصلًا (الموديل مش هيرفض مساحة سالبة، هيطلّع رقم غريب وخلاص).`,
            how: R`[[joblib]] بيحفظ objects بتاعة Python بـ pickle (بيتعامل مع arrays الكبيرة أحسن). بنحفظ dict فيه الموديل ونسخة scikit-learn وترتيب الأعمدة، عشان لما نحمّله نعرف اتعمل بإيه. pickle لما بيتحمّل بيقدر يشغّل أي كود جواه، فملف موديل من برّه = كود من برّه. ونسخة scikit-learn وقت التحميل لازم تبقى نفس نسخة الحفظ (لو مختلفة بيطلع [[InconsistentVersionWarning]] والنتايج ممكن تبوظ، من الـ docs)، فثبّت النسخة في [[requirements.txt]].

[[lifespan]]: دالة async فيها [[yield]]؛ اللي قبله بيتنفذ مرة وقت ما السيرفر يقوم، واللي بعده وقت ما يقفل. فالموديل بيتحمّل مرة مش مع كل طلب.

[[Flat]] Pydantic model: [[Field(gt=20)]] أكبر من ٢٠، و [[ge]] أكبر من أو يساوي، و [[le]] أصغر من أو يساوي، و [[Literal[...]]] لازم واحدة من القيم دي بالظبط. أي طلب مخالف بيرجع [[422]] بتفاصيل كل غلطة من غير ما الدالة تتنادى.

[[flat.model_dump()]] بيحوّله dict، و [[pd.DataFrame([dict], columns=...)]] جدول صف واحد، و [[columns=ml["columns"]]] بيرتّب الأعمدة زي التدريب بالظبط. و [[predict(row)[0]]] أول (وحيد) توقع، و [[float(...)]] بيحوّل [[np.float64]] لـ float عادي يتحوّل JSON.

الـ endpoint [[def]] مش [[async def]] لأن [[predict]] شغل CPU متزامن: FastAPI بيشغّل الـ def في thread pool فمبيوقفش السيرفر (درس [[def ولا async def]] في تاب Python و FastAPI).`,
            when: R`أي موديل هيستخدمه نظام تاني. ولو التوقعات ممكن تتحسب مقدّمًا (كل العملاء مرة في اليوم): script بـ cron بيكتب النتايج في قاعدة البيانات أبسط من API. ولو الموديل تقيل أو الطلبات كتير: workers أكتر ([[fastapi run --workers 4]]) أو batch endpoint.`,
            mistakes: R`تحمّل الموديل جوه الـ endpoint (كل طلب يقرا الملف). وتحفظ الموديل من غير التجهيز. وترتيب أعمدة مختلف عن التدريب. ومن غير validation فيوصل الموديل [[area = -5]] ويرجّع سعر بالسالب بثقة. و [[joblib.load]] لملف من المستخدم أو من النت. ونسخة scikit-learn على السيرفر غير اللي اتدرّب بيها. وترجّع [[np.float64]] فـ JSON يقع.`
          },
          teach: R`## المثال بيعمل إيه؟

خطوتين: [[train.py]] بيدرّب الـ Pipeline بتاع الدرس اللي فات على كل الشقق ويحفظه، و [[serve.py]] (المثال) API بيحمّله ويتوقع لأي شقة تيجيله. اتشغّل في Docker بـ scikit-learn 1.9 و FastAPI 0.162، والطلبات بـ [[curl]] من برّه الـ container.

---

## ١. الحفظ: [[train.py]]

~~~python train.py
import joblib
import pandas as pd
import sklearn
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LinearRegression
from sklearn.pipeline import Pipeline, make_pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
df = pd.read_csv("flats.csv")
X, y = df.drop(columns="price"), df["price"]
pre = ColumnTransformer([
    ("num", make_pipeline(SimpleImputer(strategy="median"), StandardScaler()), ["area", "rooms", "age"]),
    ("cat", OneHotEncoder(handle_unknown="ignore"), ["city"]),
])
model = Pipeline([("pre", pre), ("reg", LinearRegression())]).fit(X, y)
joblib.dump({"model": model, "sklearn": sklearn.__version__, "columns": list(X.columns)}, "flat_price.joblib")
~~~

- نفس الـ Pipeline، بس المرة دي [[fit(X, y)]] على **كل** الداتا: القياس خلص في الدرس اللي فات، ودلوقتي عايزين أحسن موديل ممكن.
- [[joblib.dump(obj, path)]]: احفظ أي object في ملف. حفظنا dict فيه الموديل، و [[sklearn.__version__]] (النسخة اللي اتدرّب بيها: [[1.9.1]])، وترتيب الأعمدة.
- الملف طلع ٣٫٥ KB بس: موديل خطي = كام رقم.

---

## ٢. شكل الطلب: Pydantic

~~~python
class Flat(BaseModel):
    area: int = Field(gt=20, le=1000)
    rooms: int = Field(ge=1, le=10)
    age: int = Field(ge=0, le=100)
    city: Literal["القاهرة", "الجيزة", "الإسكندرية"]
~~~

| الحقل | القاعدة |
|---|---|
| [[area]] | رقم صحيح، أكبر من ٢٠ ([[gt]] = greater than) ولحد ١٠٠٠ ([[le]] = less or equal) |
| [[rooms]] | من ١ لـ ١٠ ([[ge]] = greater or equal) |
| [[age]] | من ٠ لـ ١٠٠ |
| [[city]] | [[Literal]]: واحدة من التلاتة دول بالظبط، لأن الموديل متدرّبش على غيرهم |

ده بيحمي الموديل: الموديل الخطي لو جاله [[area = -5]] هيطلّع رقم بثقة. هنا الطلب بيترفض قبل ما يوصله.

## ٣. التحميل مرة واحدة: [[lifespan]]

~~~python
ml = {}
@asynccontextmanager
async def lifespan(app: FastAPI):
    ml.update(joblib.load("flat_price.joblib"))
    yield
    ml.clear()
app = FastAPI(lifespan=lifespan)
~~~

- [[ml]]: dict عام هيشيل الموديل وبياناته.
- [[@asynccontextmanager]]: بيحوّل الدالة اللي فيها [[yield]] لـ context manager. اللي **قبل** [[yield]] بيتنفذ وقت ما السيرفر يقوم (حمّل الملف)، واللي **بعده** وقت ما يقفل.
- [[ml.update(...)]]: حط مفاتيح الـ dict المتحمّل ([[model]] و [[sklearn]] و [[columns]]) جوه [[ml]].
- [[FastAPI(lifespan=lifespan)]]: قول للتطبيق يستخدمها.

## ٤. الـ endpoint

~~~python
@app.post("/predict")
def predict(flat: Flat) -> dict[str, float | str]:
    row = pd.DataFrame([flat.model_dump()], columns=ml["columns"])
    price = ml["model"].predict(row)[0]
    return {"price": round(float(price), -3), "model_sklearn": ml["sklearn"]}
~~~

1. [[flat: Flat]]: FastAPI بيقرا الـ JSON ويفحصه بالـ class. لو سليم الدالة تتنادى.
2. [[flat.model_dump()]]: dict، و [[pd.DataFrame([...], columns=...)]] جدول صف واحد، و [[columns=ml["columns"]]] بياخد الأعمدة دي بس وبترتيب التدريب.
3. [[predict(row)[0]]]: الموديل بيرجّع array، وإحنا عايزين أول قيمة.
4. [[float(price)]]: [[np.float64]] لـ float عادي يتحوّل JSON من غير مشاكل. و [[round(..., -3)]] لأقرب ألف.
5. [[def]] مش [[async def]]: الحساب شغل CPU، و FastAPI بيشغّل الـ [[def]] في thread لوحده.

---

## ٥. التشغيل والطلبات

~~~bash
fastapi run serve.py
curl -X POST localhost:8000/predict -H "Content-Type: application/json" -d '{"area": 120, "rooms": 3, "age": 5, "city": "القاهرة"}'
~~~

~~~text الناتج
{"price":2883000.0,"model_sklearn":"1.9.1"}
~~~

[[fastapi run]] (مش [[dev]]): وضع الإنتاج على 0.0.0.0:8000. نفس الشقة في درس [[Pipeline و ColumnTransformer]] من غير مدينة كانت ٢٫٤٤ مليون، وفي القاهرة ٢٫٨٨ مليون. ولو شغّلته من PowerShell، علامات التنصيص في [[-d]] بتتعامل بطريقة تانية، فالأسهل تجرّب من [[/docs]] في المتصفح.

وطلب غلط (مساحة ٥ ومدينة المنصورة):

~~~text الناتج (422)
{"detail":[{"type":"greater_than","loc":["body","area"],"msg":"Input should be greater than 20","input":5,"ctx":{"gt":20}},{"type":"literal_error","loc":["body","city"],"msg":"Input should be 'القاهرة', 'الجيزة' or 'الإسكندرية'","input":"المنصورة","ctx":{"expected":"'القاهرة', 'الجيزة' or 'الإسكندرية'"}}]}
~~~

الغلطتين اترجعوا مع بعض، كل واحدة بمكانها ([[loc]]) والقاعدة اللي اتكسرت، والموديل متلمسش. ولوج السيرفر:

~~~text الناتج (اللوج)
INFO:     172.17.0.1:42002 - "POST /predict HTTP/1.1" 200 OK
INFO:     172.17.0.1:42016 - "POST /predict HTTP/1.1" 422 Unprocessable Content
~~~

---

## ٦. قبل الإنتاج

| الحاجة | ليه |
|---|---|
| ثبّت [[scikit-learn==1.9.1]] في requirements | الموديل المحفوظ مربوط بالنسخة |
| متحمّلش ملف موديل من مصدر مش واثق فيه | [[joblib.load]] (pickle) بيقدر يشغّل كود |
| [[GET /health]] بيقول الموديل متحمّل | للـ load balancer و Docker healthcheck |
| اختبارات بـ TestClient | درس [[TestClient و conftest]] في تاب Python |
| Dockerfile | درس [[Dockerfile]] في تاب Python |

---

## الخلاصة

| عايز | اكتب |
|---|---|
| تحفظ | [[joblib.dump({"model": m, ...}, "m.joblib")]] |
| تحمّل مرة وقت التشغيل | [[lifespan]] و [[joblib.load]] قبل [[yield]] |
| تفحص المدخلات | Pydantic: [[Field(gt=, le=)]] و [[Literal[...]]] |
| صف للموديل | [[pd.DataFrame([flat.model_dump()], columns=cols)]] |
| رد JSON | [[float(...)]] على قيم numpy |

- احفظ الـ Pipeline كله، وحمّله مرة، وافحص المدخلات قبل الموديل.`,
          lines: [
            R`[[asynccontextmanager]] عشان الـ lifespan.`,
            R`[[Literal]] للقيم المسموحة.`,
            "تحميل الموديل.",
            "pandas.",
            "FastAPI.",
            "Pydantic.",
            "شكل الطلب:",
            "المساحة من ٢١ لـ ١٠٠٠.",
            "الأوض من ١ لـ ١٠.",
            "العمر من ٠ لـ ١٠٠.",
            "المدينة واحدة من التلاتة بس.",
            "مكان الموديل في الذاكرة.",
            "context manager للتشغيل والقفل:",
            "...الدالة.",
            "حمّل الملف مرة وقت التشغيل.",
            "السيرفر شغال هنا.",
            "وقت القفل: فضّي.",
            "التطبيق بالـ lifespan.",
            "endpoint بـ POST:",
            R`الطلب [[Flat]]، والرد dict.`,
            "صف واحد بترتيب أعمدة التدريب.",
            "التوقع.",
            "السعر لأقرب ألف، ونسخة scikit-learn."
          ],
          sol: R`الـ batch: [[def predict_batch(flats: list[Flat])]]، و [[pd.DataFrame([f.model_dump() for f in flats], columns=ml["columns"])]] جدول فيه كل الشقق، و [[predict]] مرة واحدة على الجدول (أسرع بكتير من طلب لكل شقة)، وترجّع [[[round(float(p), -3) for p in prices]]]. و Pydantic بيفحص كل عنصر في الـ list، ولو واحد غلط الـ [[loc]] في الرد بيقول رقمه ([[["body", 2, "area"]]]).

والشقة الغلط: [[422 Unprocessable Content]] ومعاه غلطتين: [[Input should be greater than 20]] للمساحة، و [[Input should be 'القاهرة', 'الجيزة' or 'الإسكندرية']] للمدينة.`,
          solCode: R`@app.post("/predict/batch")
def predict_batch(flats: list[Flat]) -> list[float]:
    rows = pd.DataFrame([f.model_dump() for f in flats], columns=ml["columns"])
    prices = ml["model"].predict(rows)
    return [round(float(p), -3) for p in prices]`
        },
      ]
    }
]);

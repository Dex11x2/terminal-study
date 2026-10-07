// تكملة تاب files: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/files/01.js (شرح حقول الدرس في أوله)
MORE("files", [
    {
      t: "ملفات المشاريع في اللغات التانية",
      l: 2,
      n: "نفس فكرة package.json في Python و Java و Android و .NET: requirements.txt و pyproject.toml، و pom.xml و build.gradle، و AndroidManifest.xml و strings.xml، و .csproj و .sln و appsettings.json",
      items: [
        {
          cmd: "requirements.txt و pyproject.toml",
          title: "مشروع Python بيحدد مكتباته إزاي: requirements.txt ولا pyproject.toml؟",
          desc: R`فيه طريقتين هتقابلهم في مشاريع Python:

[[requirements.txt]] (القديمة والبسيطة): ليستة مكتبات، واحدة في كل سطر، و [[pip install -r requirements.txt]] بيسطّبها. قواعده:
• [[fastapi==0.115.6]]: نسخة بالظبط.
• [[pydantic~=2.10]]: متوافقة (2.10 وطالع لحد قبل 3).
• [[uvicorn[standard]>=0.32,<1.0]]: [[[standard]]] حاجات إضافية (extras)، و [[,]] بين شرطين.
• [[python-dotenv]]: أي نسخة (متعملهاش في production).
• [[#]] تعليق، و [[-r other.txt]] يقرا ملف تاني (زي [[requirements-dev.txt]]).
• [[pip freeze > requirements.txt]] بيكتب كل اللي متسطّب بالنسخ بالظبط (ده بيبقى شبه lock file).

[[pyproject.toml]] (الحديثة، TOML، درس [[.toml]]): ملف واحد بيوصف المشروع كله، زي [[package.json]]:
• [[[project]]]: الاسم والنسخة والوصف و [[requires-python]] و [[dependencies]] (ليستة بنفس صيغة requirements).
• [[[project.optional-dependencies]]]: مجموعات إضافية زي [[dev]]، وبتتسطّب بـ [[pip install -e ".[dev]"]].
• [[[project.scripts]]]: أوامر بتتعمل لما المشروع يتسطّب ([[gym-api = "gym_api.main:run"]] يعني اعمل أمر اسمه gym-api بينادي الدالة دي).
• [[[build-system]]]: الأداة اللي هتبني المشروع (hatchling أو setuptools).
• [[[tool.xxx]]]: إعدادات الأدوات كلها في نفس الملف: [[[tool.ruff]]] و [[[tool.pytest.ini_options]]] و [[[tool.mypy]]].
وأدوات زي uv و Poetry بتستخدمه وبتعمل lock file جنبه ([[uv.lock]] و [[poetry.lock]]).

وأي واحدة فيهم بتتسطّب جوه virtual environment، مش على Python بتاع النظام:
[[python3 -m venv .venv]] وبعدين [[source .venv/bin/activate]] (على ويندوز [[.venv\Scripts\activate]]). و [[.venv/]] في [[.gitignore]].

ملفات قديمة ممكن تقابلها: [[setup.py]] و [[setup.cfg]] (قبل pyproject)، و [[Pipfile]] و [[Pipfile.lock]] (pipenv)، و [[environment.yml]] (conda).`,
          example: R`[project]
name = "gym-api"
version = "1.4.0"
description = "API لحجز مواعيد الجيم"
requires-python = ">=3.11"
dependencies = [
    "fastapi>=0.115",
    "uvicorn[standard]>=0.32",
]
[project.optional-dependencies]
dev = ["pytest>=8", "ruff"]
[project.scripts]
gym-api = "gym_api.main:run"
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
[tool.ruff]
line-length = 100`,
          flag: "script",
          try: R`اعمل فولدر فيه المثال في [[pyproject.toml]]، و [[src/gym_api/__init__.py]] فاضي، و [[src/gym_api/main.py]] فيه [[def run(): print("gym-api شغال")]]. بعدين: [[python3 -m venv .venv]] و [[source .venv/bin/activate]] و [[pip install -e ".[dev]"]] و [[gym-api]]. وفي فولدر تاني جرّب [[requirements.txt]] فيه [[fastapi==0.115.6]] و [[pip install -r requirements.txt]] و [[pip freeze]].`,
          deep: {
            why: R`requirements.txt كان مجرد ليستة لـ pip، مفيهوش اسم المشروع ولا نسخته ولا إعدادات الأدوات، فكل أداة عملت ملف إعدادات لوحدها ([[setup.py]] و [[setup.cfg]] و [[pytest.ini]] و [[.flake8]]...). [[pyproject.toml]] (PEP 621) جمّع ده كله في ملف واحد بصيغة واضحة.`,
            how: R`[[pip install -e .]] بيقرا [[[build-system]]] وينزّل أداة البناء (hatchling)، اللي بتقرا [[[project]]] وتسطّب الـ [[dependencies]]، وتعمل أوامر [[[project.scripts]]] في [[.venv/bin/]]. و [[-e]] (editable) معناها إن أي تعديل في الكود يبان علطول من غير تسطيب تاني. والـ venv فولدر فيه نسخة Python ومكتباتها بس للمشروع ده.`,
            when: R`[[pyproject.toml]] لأي مشروع جديد (ومع uv أو Poetry). و [[requirements.txt]] هتلاقيه في مشاريع كتير وفي Dockerfiles ([[pip install -r requirements.txt]])، وبعض المنصات بتطلبه.`,
            mistakes: R`[[pip install]] بره الـ venv فتلخبط Python بتاع النظام (والتوزيعات الجديدة بترفض: [[error: externally-managed-environment]]). [[pip freeze]] بره الـ venv فيكتب كل مكتبات الجهاز. مكتبات من غير نسخ في production. وعلى أوبونتو [[python3 -m venv]] بيقع لو [[python3-venv]] مش متسطّب: [[The virtual environment was not created successfully because ensurepip is not available]]، والحل [[sudo apt install python3-venv]].`
          },
          teach: R`## الفكرة

المثال [[pyproject.toml]] لمشروع Python اسمه [[gym-api]]: بيقول اسمه ونسخته ومكتباته، وبيعمل أمر في الترمنال اسمه [[gym-api]]، وفيه إعدادات أداة ruff. هنقراه قسم قسم (الصيغة TOML، درس [[.toml]])، وبعدين نسطّبه في virtual environment ونشغّل الأمر. اتجرّب على ويندوز بـ Python 3.14.3 (PowerShell 7 و Windows PowerShell 5.1)، وأول خطوتين (الـ venv) اتجرّبوا كمان على لينكس جوه Docker بـ Python 3.13. المشروع فيه [[src/gym_api/__init__.py]] فاضي و [[src/gym_api/main.py]] فيه دالة [[run()]] بتطبع [[gym-api شغال]].

---

## ١. [[[project]]]

~~~text
[project]
name = "gym-api"
version = "1.4.0"
description = "API لحجز مواعيد الجيم"
requires-python = ">=3.11"
~~~

[[[project]]] بين أقواس مربعة = قسم (table في TOML). وكل سطر تحته [[key = "value"]]، والنصوص لازم تنصيص.

| المفتاح | معناه |
|---|---|
| [[name]] | الاسم اللي هيتسطّب بيه ([[pip show gym-api]]) |
| [[version]] | النسخة |
| [[description]] | سطر وصف ([[Summary]] في [[pip show]]) |
| [[requires-python]] | أقل نسخة Python. pip بيرفض يسطّب على أقدم |

## ٢. [[dependencies]]

~~~text
dependencies = [
    "fastapi>=0.115",
    "uvicorn[standard]>=0.32",
]
~~~

array في TOML ([[[ ]]])، على كذا سطر، والفاصلة بعد آخر عنصر مسموحة (عكس JSON). كل عنصر نص بنفس صيغة [[requirements.txt]]:

- [[fastapi>=0.115]]: fastapi نسخة 0.115 أو أحدث.
- [[uvicorn[standard]]]: [[[standard]]] اسمها **extras**: حاجات إضافية اختيارية جوه المكتبة (هنا مكتبات أسرع للسيرفر).

علامات النسخ في Python:

| العلامة | معناها | زي npm |
|---|---|---|
| [[==1.2.3]] | بالظبط | [[1.2.3]] |
| [[>=1.2]] | دي أو أحدث | [[>=1.2]] |
| [[~=2.10]] | من 2.10 لحد قبل 3 | [[^2.10]] تقريبًا |
| [[>=0.32,<1.0]] | [[,]] = «و» بين شرطين | |

## ٣. [[[project.optional-dependencies]]]

~~~text
[project.optional-dependencies]
dev = ["pytest>=8", "ruff"]
~~~

النقطة في اسم القسم معناها «جوه [[project]]». مجموعة اسمها [[dev]] مش بتتسطّب غير لما تطلبها: [[pip install -e ".[dev]"]]. زي [[devDependencies]] في npm. و [["ruff"]] من غير نسخة = أي نسخة.

## ٤. [[[project.scripts]]]

~~~text
[project.scripts]
gym-api = "gym_api.main:run"
~~~

اعمل أمر في الترمنال اسمه [[gym-api]]، ولما يتكتب ينادي:

~~~text
gym_api.main : run
───┬─── ─┬─    ─┬─
package  file   function
~~~

يعني الدالة [[run]] في [[gym_api/main.py]]. الاسم فيه [[_]] مش [[-]] لأن أسامي الـ modules في Python مينفعش فيها [[-]].

## ٥. [[[build-system]]]

~~~text
[build-system]
requires = ["hatchling"]
build-backend = "hatchling.build"
~~~

pip نفسه مبيعرفش يبني مشروع. القسم ده بيقوله: «نزّل [[hatchling]] الأول، واستخدم الـ module اللي اسمه [[hatchling.build]] عشان تبني». و hatchling بيلاقي الكود في [[src/gym_api]] لوحده.

## ٦. [[[tool.ruff]]]

~~~text
[tool.ruff]
line-length = 100
~~~

أي أداة ليها [[[tool.اسمها]]]. ruff (linter) بيقرا القسم ده بدل ملف إعدادات لوحده: طول السطر المسموح ١٠٠ حرف بدل ٨٨.

---

## ٧. الـ virtual environment

~~~powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
~~~

- [[-m venv]]: شغّل الـ module اللي اسمه [[venv]].
- [[.venv]]: اسم الفولدر اللي هيتعمل. جواه نسخة Python ومكتبات المشروع ده بس.
- [[Activate.ps1]]: بيغيّر الـ PATH في الترمنال ده بحيث [[python]] و [[pip]] يبقوا اللي جوه [[.venv]].

~~~text (Get-Command python).Source بعدها
C:\Users\ali\...\py\.venv\Scripts\python.exe
~~~

ونفس الحكاية اشتغلت في Windows PowerShell 5.1. وعلى لينكس (Python 3.13 في Docker) الأمر [[python3 -m venv .venv]] ثم [[. .venv/bin/activate]] (أو [[source]])، و [[which python pip]] طبع:

~~~text الناتج
/w/.venv/bin/python
/w/.venv/bin/pip
~~~

| | ويندوز | لينكس والماك |
|---|---|---|
| الأمر | [[python]] | [[python3]] |
| التفعيل | [[.venv\Scripts\Activate.ps1]] | [[source .venv/bin/activate]] |
| الأوامر المتسطّبة | [[.venv\Scripts\]] | [[.venv/bin/]] |

---

## ٨. التسطيب: [[pip install -e ".[dev]"]]

- [[-e]] (editable): سطّب المشروع «بالإشارة» للفولدر، فأي تعديل في الكود يبان علطول من غير تسطيب تاني.
- [[.]]: المشروع اللي في الفولدر الحالي.
- [[[dev]]]: ومعاه مجموعة [[dev]].
- التنصيص حوالين [[".[dev]"]] عشان بعض الـ shells (زي zsh) بتفهم [[[ ]]] كـ pattern.

بعدها:

~~~text gym-api
gym-api شغال
~~~

~~~text pip show gym-api (أول ٣ سطور)
Name: gym-api
Version: 1.4.0
Summary: API لحجز مواعيد الجيم
~~~

والأمر [[gym-api]] نفسه ملف اتعمل في [[.venv\Scripts\gym-api.exe]] (على لينكس [[.venv/bin/gym-api]]). ومجموعة [[dev]] اتسطّبت: [[ruff --version]] طبع [[ruff 0.16.10]] و [[pytest --version]] طبع [[pytest 9.1.1]].

---

## ٩. و [[requirements.txt]]؟

في فولدر تاني [[requirements.txt]] فيه سطر واحد [[fastapi==0.115.6]]، وفي venv جديد:

~~~powershell
pip install -r requirements.txt
pip freeze
~~~

[[-r]] (requirement file): اقرا الليستة من الملف. و [[pip freeze]] بيطبع كل اللي متسطّب في الـ venv بالنسخ بالظبط:

~~~text الناتج
annotated-types==0.8.0
anyio==4.15.1
fastapi==0.115.6
idna==3.20
pydantic==2.13.5
pydantic_core==2.46.5
starlette==0.41.3
typing-inspection==0.4.4
typing_extensions==4.16.0
~~~

طلبنا مكتبة واحدة، واتسطّب ٩: fastapi محتاجة starlette و pydantic، وهما محتاجين الباقي. [[pip freeze > requirements.txt]] بيحفظ الليستة دي كلها، وده أقرب حاجة لـ lock file في requirements. والأرقام دي وقت التجربة، هتلاقي أحدث.

---

## الخلاصة

| القسم | زي في npm |
|---|---|
| [[[project]]] (name و version) | [[name]] و [[version]] |
| [[dependencies]] | [[dependencies]] |
| [[[project.optional-dependencies]]] [[dev]] | [[devDependencies]] |
| [[[project.scripts]]] | [[bin]] |
| [[[tool.xxx]]] | إعدادات الأدوات |

وأي تسطيب جوه [[.venv]]، و [[.venv/]] في [[.gitignore]].`,
          lines: [
            R`بداية معلومات المشروع.`,
            R`الاسم اللي هيتسطّب بيه.`,
            R`النسخة.`,
            R`وصف.`,
            R`أقل نسخة Python.`,
            R`المكتبات اللي محتاجها: array على كذا سطر.`,
            R`مكتبة بشرط نسخة (نفس صيغة requirements).`,
            R`[[[standard]]] حاجات إضافية من المكتبة، و [[,]] في الآخر مسموحة في TOML.`,
            R`قفل الـ array.`,
            R`مجموعات اختيارية.`,
            R`مجموعة [[dev]]: أدوات التطوير.`,
            R`أوامر هتتعمل مع التسطيب.`,
            R`أمر [[gym-api]] بينادي [[run()]] في [[gym_api/main.py]].`,
            R`أداة البناء.`,
            R`تتنزّل الأول.`,
            R`الـ module اللي pip بيستخدمه.`,
            R`إعدادات أداة ruff في نفس الملف.`,
            R`طول السطر المسموح.`
          ],
          sol: R`[[pip install -e ".[dev]"]] بيسطّب fastapi و uvicorn و pytest و ruff ومكتباتهم، والمشروع نفسه. وبعدها [[gym-api]] بيطبع [[gym-api شغال]]، و [[pip show gym-api]] بيطبع:
[[Name: gym-api]]
[[Version: 1.4.0]]
[[Summary: API لحجز مواعيد الجيم]]

و [[pip freeze]] بعد [[pip install -r requirements.txt]] بيطبع كل حاجة اتسطّبت بالظبط، مش بس fastapi: [[annotated-types==...]] و [[anyio==...]] و [[fastapi==0.115.6]] و [[pydantic==...]] و [[starlette==...]]، وده الفرق بين «اللي طلبته» و «اللي اتسطّب».`
        },
        {
          cmd: "pom.xml و build.gradle",
          title: "pom.xml (Maven) و build.gradle.kts (Gradle) جواهم إيه؟",
          desc: R`مشاريع Java و Kotlin بتتبني بواحدة من أداتين، وكل واحدة ليها ملف:

[[pom.xml]] (Maven): XML (درس [[.xml]]). أهم الأجزاء:
• [[<groupId>]] و [[<artifactId>]] و [[<version>]]: هوية المشروع (اسمها coordinates). groupId غالبًا الدومين بالمقلوب [[com.gym]].
• [[<packaging>]]: [[jar]] أو [[war]].
• [[<properties>]]: متغيرات وإعدادات، زي نسخة Java.
• [[<dependencies>]]: كل [[<dependency>]] بالـ coordinates بتاعتها، و [[<scope>test</scope>]] يعني للاختبارات بس.
• [[<parent>]] (في Spring Boot): ياخد الإعدادات والنسخ من مشروع أب.
• [[<build><plugins>]]: أدوات البناء.
الأوامر: [[mvn package]] (يبني الـ jar في [[target/]])، و [[mvn test]]، و [[mvn dependency:tree]]. و [[mvnw]] و [[mvnw.cmd]] (Maven Wrapper) بيشغّلوا نسخة Maven محددة من غير ما تسطّبها.

[[build.gradle.kts]] (Gradle بـ Kotlin) أو [[build.gradle]] (Gradle بـ Groovy، الأقدم): كود مش XML، أقصر ومرن أكتر. ده الافتراضي في Android:
• [[plugins { ... }]]: نوع المشروع (java و application و com.android.application).
• [[dependencies { implementation("group:artifact:version") }]]: نفس الـ coordinates في سطر. [[testImplementation]] للاختبارات.
• [[repositories { mavenCentral() }]]: المكتبات بتتنزل منين.
• جنبه: [[settings.gradle.kts]] (اسم المشروع والـ modules)، و [[gradle.properties]] (إعدادات)، و [[gradlew]] و [[gradlew.bat]] و [[gradle/wrapper/]] (Gradle Wrapper)، و [[gradle/libs.versions.toml]] (كتالوج النسخ في مكان واحد).
الأوامر: [[./gradlew build]] (الناتج في [[build/]])، و [[./gradlew test]]، و [[./gradlew dependencies]].

[[target/]] و [[build/]] و [[.gradle/]] في [[.gitignore]]. والـ wrapper ([[mvnw]] و [[gradlew]] وفولدراتهم) بيتعمله commit.`,
          example: R`<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.gym</groupId>
  <artifactId>gym-api</artifactId>
  <version>1.4.0</version>
  <packaging>jar</packaging>
  <properties>
    <maven.compiler.release>21</maven.compiler.release>
  </properties>
  <dependencies>
    <dependency>
      <groupId>com.google.code.gson</groupId>
      <artifactId>gson</artifactId>
      <version>2.11.0</version>
    </dependency>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>5.11.3</version>
      <scope>test</scope>
    </dependency>
  </dependencies>
</project>`,
          flag: "script",
          try: R`اعمل فولدر فيه المثال في [[pom.xml]]، و [[src/main/java/com/gym/App.java]] فيه [[package com.gym;]] و class [[App]] بـ main بتطبع حاجة. ابنيه بـ [[mvn -q package]] (أو Docker: [[docker run --rm -v "$PWD":/w -w /w maven:3.9-eclipse-temurin-21 mvn -q package]]) وبص في [[target/]] وشغّل [[java -cp target/gym-api-1.4.0.jar com.gym.App]]. ولو عندك مشروع Android افتح [[app/build.gradle.kts]] وطلّع فيه الـ dependencies والـ plugins.`,
          deep: {
            why: R`مشروع Java فيه مئات المكتبات، ومحدش هيكتب [[javac -cp]] بكل المسارات بإيده. Maven جه بفكرة «convention over configuration»: الكود في [[src/main/java]] والاختبارات في [[src/test/java]] والناتج في [[target]]، والملف بيقول بس اللي مختلف. Gradle جه بعده بكود بدل XML وبناء أسرع (بيبني اللي اتغير بس).`,
            how: R`[[mvn package]] بيقرا الـ pom، وينزّل كل dependency (ومكتباتها) من Maven Central لـ [[~/.m2/repository]] مرة واحدة، ويمشي على مراحل ثابتة (lifecycle): compile ثم test ثم package. Gradle بيشغّل الـ [[build.gradle.kts]] ككود Kotlin يبني «graph» من المهام (tasks)، وبيخزن نتايجها في [[.gradle/]] و [[build/]] عشان يعيد بس اللي اتغير.`,
            when: R`Spring Boot (الاتنين، Maven أشهر شوية)، و Android (Gradle بس)، وأي مشروع Java أو Kotlin.`,
            mistakes: R`تحط نسخة Java في الملف مختلفة عن الـ JDK اللي عندك ([[release version 21 not supported]]). تعدّل [[build.gradle.kts]] في Android Studio ومتعملش Sync. تعمل commit لـ [[target/]] أو [[build/]]. وتنسى [[mvnw]] أو [[gradlew]] فكل واحد في الفريق يبني بنسخة مختلفة.`
          },
          teach: R`## الفكرة

المثال [[pom.xml]] لمشروع Java اسمه [[gym-api]] فيه مكتبتين: Gson (لـ JSON) و JUnit (للاختبارات). والحل فيه نفس المشروع بـ Gradle. هنقرا الملفين حتة حتة.

> مفيش Java ولا Maven ولا Gradle على الجهاز اللي اتجرّب عليه، فأوامر [[mvn]] و [[gradle]] ونواتجها من docs الأدوات دي (maven.apache.org و docs.gradle.org). اللي اتجرّب فعلًا: إن [[pom.xml]] XML سليم، وقرايته بـ Python 3.14 على ويندوز (تحت).

---

## ١. السطور الأولى: XML و namespaces

~~~text
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
~~~

- [[<?xml ...?>]]: الـ declaration: نسخة XML والترميز (درس [[.xml]]).
- [[<project>]]: الـ root، كل الملف جواه. POM = Project Object Model.
- [[xmlns="..."]]: الـ namespace الافتراضي: كل التاجات هنا «بتاعة Maven POM 4.0.0» (درس xmlns). الرابط اسم مش صفحة لازم تفتح.
- [[xmlns:xsi="..."]]: namespace تاني اختصاره [[xsi]] (XML Schema Instance).
- [[xsi:schemaLocation]]: زوج «namespace ← ملف الـ schema بتاعه». المحرر (IntelliJ أو VS Code) بينزّل الـ [[.xsd]] ويكمّلك التاجات ويعلّم على الغلط.

السطر طويل فاتقسم على ٣ سطور، وده عادي في XML: المسافات بين الـ attributes ملهاش معنى.

## ٢. هوية المشروع (coordinates)

~~~text
  <modelVersion>4.0.0</modelVersion>
  <groupId>com.gym</groupId>
  <artifactId>gym-api</artifactId>
  <version>1.4.0</version>
  <packaging>jar</packaging>
~~~

| التاج | معناه |
|---|---|
| [[modelVersion]] | نسخة صيغة الـ POM، دايمًا [[4.0.0]] |
| [[groupId]] | مين عامله: دومين بالمقلوب ([[gym.com]] ← [[com.gym]]) |
| [[artifactId]] | اسم المشروع |
| [[version]] | نسخته |
| [[packaging]] | الناتج: [[jar]] (Java ARchive، zip فيه الـ classes) أو [[war]] لسيرفرات الويب القديمة |

التلاتة [[groupId:artifactId:version]] مع بعض اسمهم coordinates: العنوان الفريد للمشروع في أي repository. وهي نفسها الطريقة اللي بتطلب بيها أي مكتبة.

## ٣. [[<properties>]]

~~~text
  <properties>
    <maven.compiler.release>21</maven.compiler.release>
  </properties>
~~~

إعدادات بأسامي. [[maven.compiler.release]] بيقول لـ plugin الـ compiler: اعمل compile لـ Java 21. لو الـ JDK اللي عندك أقدم من 21 البناء بيقع (الرسالة في الـ docs: [[release version 21 not supported]]).

## ٤. [[<dependencies>]]

~~~text
    <dependency>
      <groupId>com.google.code.gson</groupId>
      <artifactId>gson</artifactId>
      <version>2.11.0</version>
    </dependency>
    <dependency>
      <groupId>org.junit.jupiter</groupId>
      <artifactId>junit-jupiter</artifactId>
      <version>5.11.3</version>
      <scope>test</scope>
    </dependency>
~~~

كل [[<dependency>]] = مكتبة بالـ coordinates بتاعتها. و [[<scope>]]:

| الـ scope | المكتبة متاحة في |
|---|---|
| (مش مكتوب) = [[compile]] | الكود والاختبارات والتشغيل |
| [[test]] | [[src/test/java]] بس، ومتدخلش الناتج |
| [[provided]] | الـ compile بس، والسيرفر هيوفّرها وقت التشغيل |
| [[runtime]] | التشغيل بس (زي driver قاعدة بيانات) |

قرينا الملف بـ Python عشان نتأكد إنه XML سليم ونطلّع الـ coordinates:

~~~text الناتج (Python 3.14 على ويندوز)
com.google.code.gson:gson:2.11.0 compile
org.junit.jupiter:junit-jupiter:5.11.3 test
~~~

ولاحظ: عشان الـ [[xmlns]]، أي أداة بتقرا الملف لازم تدوّر على التاجات بالـ namespace ([[{http://maven.apache.org/POM/4.0.0}project]] هو اسم الـ root الحقيقي)، مش [[project]] بس.

---

## ٥. البناء (من الـ docs)

~~~bash
mvn package
~~~

[[mvn]] بيقرا الـ pom ويمشي على مراحل ثابتة اسمها lifecycle: [[validate]] ← [[compile]] ← [[test]] ← [[package]]. لما تطلب [[package]] كل اللي قبلها بيتعمل. أول مرة بينزّل المكتبات لـ [[~/.m2/repository]]، وفي الآخر:

~~~text الناتج (من الـ docs)
[INFO] BUILD SUCCESS
~~~

والناتج في [[target/gym-api-1.4.0.jar]]: الاسم [[artifactId-version.jar]]. والمسارات ثابتة بالعُرف (convention): الكود في [[src/main/java]]، والاختبارات في [[src/test/java]]، والناتج في [[target/]]. عشان كده الـ pom مفيهوش أي مسار.

## ٦. نفس المشروع بـ Gradle (الـ solCode)

~~~text build.gradle.kts
plugins {
    java
    application
}
~~~

[[plugins]]: نوع المشروع. [[java]] = مشروع Java عادي (compile و test و jar)، و [[application]] = فيه main وتقدر تشغّله بـ [[gradle run]].

~~~text
group = "com.gym"
version = "1.4.0"
~~~

نفس [[groupId]] و [[version]]. والـ [[artifactId]] بييجي من [[rootProject.name]] في [[settings.gradle.kts]].

~~~text
java { toolchain { languageVersion = JavaLanguageVersion.of(21) } }
~~~

زي [[maven.compiler.release]]، بس أقوى: Gradle بيدوّر على JDK 21 متسطّب على الجهاز (وممكن ينزّله لوحده لو ظبطت plugin التنزيل في [[settings.gradle.kts]]، حسب الـ docs) حتى لو الـ JDK اللي شغّال بيه مختلف. والأقواس المعووجة جوه بعض = إعدادات جوه إعدادات.

~~~text
repositories { mavenCentral() }
~~~

المكتبات تتنزل منين. Maven بيستخدم Maven Central افتراضيًا، Gradle لازم تقوله.

~~~text
dependencies {
    implementation("com.google.code.gson:gson:2.11.0")
    testImplementation("org.junit.jupiter:junit-jupiter:5.11.3")
}
~~~

نفس الـ coordinates بس في نص واحد بـ [[:]]. [[implementation]] = [[compile]] في Maven، و [[testImplementation]] = [[<scope>test</scope>]].

~~~text
application { mainClass = "com.gym.App" }
~~~

الـ class اللي فيها [[main]]: [[com.gym]] الـ package و [[App]] الـ class. ده اللي [[gradle run]] بيشغّله.

| Maven ([[pom.xml]]) | Gradle ([[build.gradle.kts]]) |
|---|---|
| [[<groupId>]] و [[<version>]] | [[group]] و [[version]] |
| [[<artifactId>]] | [[rootProject.name]] في settings |
| [[maven.compiler.release]] | [[java { toolchain ... }]] |
| [[<dependency>]] | [[implementation("g:a:v")]] |
| [[<scope>test</scope>]] | [[testImplementation]] |
| [[mvn package]] ← [[target/]] | [[./gradlew build]] ← [[build/]] |

---

## الخلاصة

- أي مكتبة Java ليها عنوان من ٣ حتت: [[groupId:artifactId:version]].
- Maven: XML وطويل بس كل حاجة ليها مكان ثابت. Gradle: كود Kotlin أقصر، وهو الأساسي في Android.
- [[target/]] و [[build/]] و [[.gradle/]] في [[.gitignore]]، والـ wrappers ([[mvnw]] و [[gradlew]]) بيتعملهم commit عشان الكل يبني بنفس النسخة.`,
          lines: [
            R`الـ declaration.`,
            R`الـ root ومعاه الـ namespace بتاع Maven (درس xmlns)...`,
            R`...و namespace تاني اسمه [[xsi]]...`,
            R`...بيقول فين الـ schema اللي الملف ده ماشي عليها (المحررات بتستخدمها للتكملة والفحص).`,
            R`نسخة صيغة الـ POM، دايمًا 4.0.0.`,
            R`المجموعة: دومين بالمقلوب.`,
            R`اسم المشروع.`,
            R`نسخته.`,
            R`الناتج jar.`,
            R`إعدادات.`,
            R`نسخة Java اللي الكود بيتعمله compile ليها.`,
            R`قفل.`,
            R`المكتبات.`,
            R`مكتبة.`,
            R`groupId بتاعها.`,
            R`artifactId.`,
            R`النسخة.`,
            R`قفل.`,
            R`مكتبة تانية.`,
            R`JUnit...`,
            R`...للاختبارات.`,
            R`النسخة.`,
            R`[[test]]: متدخلش الـ jar النهائي.`,
            R`قفل.`,
            R`قفل [[dependencies]].`,
            R`قفل الـ root.`
          ],
          sol: R`[[mvn package]] بيطبع سطور [[[INFO]]] كتير (أول مرة بينزّل المكتبات والـ plugins وده بياخد وقت) وفي الآخر [[[INFO] BUILD SUCCESS]]. وفي [[target/]] هتلاقي [[classes/]] و [[gym-api-1.4.0.jar]] (الاسم من [[artifactId]] و [[version]]).

[[java -cp target/gym-api-1.4.0.jar com.gym.App]] بيشغّل الـ main ويطبع اللي فيها. أما [[java -jar target/gym-api-1.4.0.jar]] فبيقول [[no main manifest attribute, in target/gym-api-1.4.0.jar]]، لأن Maven مبيحطش [[Main-Class]] في الـ manifest غير لو ظبطت plugin (Spring Boot بيعمل ده لوحده).

ونفس المشروع بـ Gradle (Kotlin DSL) شكله كده، ومعاه [[settings.gradle.kts]] فيه سطر واحد [[rootProject.name = "gym-api"]]. و [[gradle run]] (أو [[./gradlew run]]) بيبني ويشغّل [[com.gym.App]] ويطبع نفس الناتج:`,
          solCode: R`plugins {
    java
    application
}
group = "com.gym"
version = "1.4.0"
java { toolchain { languageVersion = JavaLanguageVersion.of(21) } }
repositories { mavenCentral() }
dependencies {
    implementation("com.google.code.gson:gson:2.11.0")
    testImplementation("org.junit.jupiter:junit-jupiter:5.11.3")
}
application { mainClass = "com.gym.App" }`
        },
        {
          cmd: "AndroidManifest.xml و strings.xml",
          title: "AndroidManifest.xml و res/values/strings.xml جواهم إيه، وليه ' بتوقّع الـ build؟",
          desc: R`أي تطبيق Android فيه ملفات XML كتير جنب الكود (Kotlin أو Java). أهمهم اتنين:

[[app/src/main/AndroidManifest.xml]]: بطاقة التطبيق للنظام:
• [[<manifest>]] الـ root، وعليه [[xmlns:android]] (درس xmlns) عشان كل الـ attributes بتبدأ بـ [[android:]].
• [[<uses-permission>]]: الصلاحيات: [[INTERNET]] (من غيرها مفيش أي طلب للنت)، و [[CAMERA]]، و [[POST_NOTIFICATIONS]].
• [[<application>]]: اسم التطبيق ([[android:label]]) والأيقونة والـ theme.
• [[<activity>]]: كل شاشة، و [[android:exported="true"]] لو ممكن تتفتح من بره التطبيق.
• [[<intent-filter>]] فيه [[MAIN]] و [[LAUNCHER]]: دي الشاشة اللي بتفتح لما تدوس على الأيقونة.
• [[@string/app_name]] و [[@mipmap/ic_launcher]]: مراجع لملفات في [[res/]] بدل ما تكتب القيمة.

[[app/src/main/res/values/strings.xml]]: كل نصوص التطبيق في مكان واحد، وده اللي بيخلي الترجمة سهلة: نسخة عربي في [[res/values-ar/strings.xml]] بنفس الأسامي، والنظام بيختار على حسب لغة الموبايل.
• [[<string name="app_name">بوابة الجيم</string>]]، وفي Kotlin بتقراه [[getString(R.string.app_name)]].
• [[%1$s]] و [[%d]]: أماكن لقيم بتتحط وقت التشغيل ([[getString(R.string.welcome, name)]]).
• قواعد Android فوق قواعد XML: [[']] لازم [[\']]، و [["]] لازم [[\"]]، و [[&]] لازم [[&amp;]]، و [[<]] لازم [[&lt;]]، و [[@]] أو [[?]] في أول النص لازم [[\@]] و [[\?]].

وملفات تانية في [[res/]]: [[layout/*.xml]] (الشاشات بالـ Views القديمة)، و [[drawable/*.xml]] (أشكال وأيقونات vector)، و [[values/colors.xml]] و [[themes.xml]]. وفي Compose الحديث الشاشات بتتكتب Kotlin بس، والـ manifest والـ strings لسه زي ما هما. التفاصيل في تاب Kotlin و Android.`,
          example: R`<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    <uses-permission android:name="android.permission.INTERNET" />
    <application
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:theme="@style/Theme.Gym">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>`,
          flag: "script",
          try: R`لو عندك مشروع Android: افتح [[AndroidManifest.xml]] وقارنه بالمثال، وافتح [[res/values/strings.xml]] وضيف [[<string name="note">Don't forget</string>]] من غير backslash واعمل Build وشوف الغلط، وبعدين صلّحه. لو مفيش: احفظ المثال وملف strings اللي في الحل وافحصهم كـ XML بـ [[python3 -c "import xml.etree.ElementTree as ET; ET.parse('AndroidManifest.xml'); print('OK')"]].`,
          deep: {
            why: R`النظام لازم يعرف عن التطبيق حاجات قبل ما يشغّله: صلاحياته، وأول شاشة، وأيقونته. الـ manifest هو المكان ده. وفصل النصوص في [[strings.xml]] بيخلي الترجمة وتغيير الكلام من غير ما تلمس الكود.`,
            how: R`وقت الـ build، أداة اسمها AAPT2 بتقرا كل ملفات [[res/]] وتعمل لكل واحد رقم في class اسمها [[R]] ([[R.string.app_name]])، وبتحوّل الـ XML لصيغة binary جوه الـ APK. وبتدمج الـ manifest بتاعك مع manifests المكتبات (manifest merging). عشان كده غلط [[']] في strings بيوقف الـ build كله.`,
            when: R`كل تطبيق Android: صلاحية جديدة، أو شاشة جديدة، أو نص جديد في الواجهة.`,
            mistakes: R`تنسى [[INTERNET]] فكل طلبات الشبكة تقع بـ [[SecurityException]] أو [[Permission denied]]. تكتب [[Don't]] من غير [[\']] في strings فيقع الـ build ([[Apostrophe not preceded by \]]). تكتب النص مباشرة في الكود أو الـ layout بدل [[@string/]] (Android Studio بيحذرك [[Hardcoded string]]). وتنسى [[android:exported]] على activity فيها intent-filter فالـ build يرفض من Android 12.`
          },
          teach: R`## الفكرة

المثال [[AndroidManifest.xml]] لتطبيق فيه شاشة واحدة وصلاحية النت، والحل فيه [[strings.xml]]. هنقرا الاتنين تاج تاج.

> مفيش Android SDK على الجهاز اللي اتجرّب عليه، فرسايل الـ build (AAPT2) من docs Android. اللي اتجرّب فعلًا: الملفين اتفحصوا كـ XML بـ Python 3.14 على ويندوز، واتجرّبت قواعد XML نفسها ([[&]] و [[']]).

---

## ١. الـ root و [[xmlns:android]]

~~~text
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
~~~

- [[<manifest>]]: الـ root، كل الملف جواه.
- [[xmlns:android="..."]]: بيعرّف prefix اسمه [[android]] للـ namespace ده (درس xmlns). من غيره أي [[android:name]] تحت هيبقى غلط. والسطر ده نفسه في كل ملفات Android.

## ٢. [[<uses-permission>]]

~~~text
    <uses-permission android:name="android.permission.INTERNET" />
~~~

- [[android:name]]: اسم الصلاحية الكامل. [[INTERNET]] من غيرها التطبيق ميقدرش يفتح أي اتصال شبكة.
- [[/>]] في الآخر: تاج **self-closing**، يعني مفتوح ومقفول في نفس الوقت ومفيش حاجة جواه. زي [[<x></x>]] بالظبط.

## ٣. [[<application>]]

~~~text
    <application
        android:label="@string/app_name"
        android:icon="@mipmap/ic_launcher"
        android:theme="@style/Theme.Gym">
~~~

الـ attributes على كذا سطر للقراية بس، و [[>]] في الآخر بتقفل تاج **الفتح** (التاج نفسه بيتقفل تحت بـ [[</application>]]).

| الـ attribute | القيمة | معناها |
|---|---|---|
| [[android:label]] | [[@string/app_name]] | اسم التطبيق تحت الأيقونة |
| [[android:icon]] | [[@mipmap/ic_launcher]] | الأيقونة |
| [[android:theme]] | [[@style/Theme.Gym]] | الألوان والشكل العام |

[[@]] في أول القيمة معناها **مرجع** لـ resource: [[@string/app_name]] = النص اللي اسمه [[app_name]] في [[res/values/strings.xml]]، و [[@mipmap/ic_launcher]] = صورة في فولدرات [[res/mipmap-*]] (فيه نسخة لكل كثافة شاشة)، و [[@style/...]] في [[themes.xml]].

## ٤. [[<activity>]]

~~~text
        <activity
            android:name=".MainActivity"
            android:exported="true">
~~~

- activity = شاشة.
- [[.MainActivity]]: الـ class اللي فيها كود الشاشة. النقطة في الأول معناها «جوه الـ package بتاع التطبيق»، فلو الـ package [[com.gym.portal]] تبقى [[com.gym.portal.MainActivity]].
- [[android:exported="true"]]: تطبيقات تانية (زي الـ launcher اللي بيعرض الأيقونات) تقدر تفتحها. ومن Android 12 (حسب الـ docs) لازم تكتبه صراحة على أي activity فيها [[<intent-filter>]]، وإلا الـ build يرفض.

## ٥. [[<intent-filter>]]

~~~text
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
~~~

intent = «طلب» بيتبعت للنظام («افتح كذا»). والـ filter بيقول الشاشة دي بترد على أنهي طلبات:

- [[action.MAIN]]: دي نقطة البداية للتطبيق.
- [[category.LAUNCHER]]: اعرضها في قايمة التطبيقات.

الاتنين مع بعض = «الشاشة اللي بتفتح لما تدوس على الأيقونة».

## ٦. القفل

~~~text
        </activity>
    </application>
</manifest>
~~~

كل تاج اتفتح بيتقفل بنفس الاسم وبالترتيب العكسي.

---

## ٧. [[strings.xml]] (الـ solCode)

~~~text res/values/strings.xml
<resources>
    <string name="app_name">بوابة الجيم</string>
    <string name="welcome">أهلًا يا %1$s</string>
    <string name="note">Don\'t forget &amp; come early</string>
    <string name="items_count">عندك %d منتج</string>
</resources>
~~~

- [[<resources>]]: الـ root لأي ملف في [[res/values]].
- [[name="app_name"]]: الاسم اللي الكود بيستخدمه: [[R.string.app_name]] في Kotlin، و [[@string/app_name]] في XML.
- [[%1$s]]: مكان لقيمة: [[1]] رقم الـ argument الأول، و [[$]] فاصل، و [[s]] نص. فـ [[getString(R.string.welcome, "علي")]] ← «أهلًا يا علي». والرقم مهم في الترجمة: لو لغة تانية محتاجة ترتيب مختلف للقيم.
- [[%d]]: رقم صحيح (d = decimal).
- [[\']] و [[&amp;]]: الـ escaping (تحت).

## ٨. ليه [[']] بتوقّع الـ build؟

فيه طبقتين قواعد فوق بعض:

**الطبقة الأولى: XML نفسه.** [[&]] لوحدها ممنوعة لأنها بداية entity ([[&amp;]] و [[&lt;]]، درس XML entities). جرّبنا ملف فيه [[Don't forget & come]]:

~~~text الناتج (Python)
xml.etree.ElementTree.ParseError: not well-formed (invalid token): line 2, column 38
~~~

[[column 38]] مكان الـ [[&]] بالظبط. وده الملف مش XML أصلًا.

**الطبقة التانية: Android.** [[Don't forget]] من غير [[&]] XML سليم عادي، و Python قراه:

~~~text الناتج
Don't forget
~~~

بس AAPT2 (الأداة اللي بتحوّل [[res/]] وقت الـ build) عنده قواعد زيادة: [[']] لوحدها ممنوعة لأن Android بيستخدم التنصيص في تنسيق النصوص. ورسالته حسب docs Android فيها [[Apostrophe not preceded by \]]. فبتكتب [[\']]. ولاحظ إن XML مبيعرفش [[\']]، فـ Python قرا سطر الحل بالـ backslash زي ما هو:

~~~text الناتج (Python على strings.xml)
Don\'t forget &amp; come early   ← في الملف
Don\'t forget & come early        ← اللي Python قراه
~~~

[[&amp;]] اتحولت [[&]] (شغل XML)، و [[\']] فضلت (شغل Android وقت الـ build).

| الحرف | XML | Android كمان |
|---|---|---|
| [[&]] | [[&amp;]] | |
| [[<]] | [[&lt;]] | |
| [[']] | مسموح | [[\']] |
| [["]] | مسموح جوه النص | [[\"]] |
| [[@]] أو [[?]] في أول النص | مسموح | [[\@]] و [[\?]] (عشان ميتقريش مرجع) |

والملفين الكاملين اتفحصوا بـ [[ET.parse]]، والـ root بتاعهم طلع [[manifest]] و [[resources]] من غير أخطاء.

---

## الخلاصة

- الـ manifest = بطاقة التطبيق للنظام: الصلاحيات ([[uses-permission]])، والشاشات ([[activity]])، وأنهي شاشة بتفتح من الأيقونة ([[MAIN]] + [[LAUNCHER]]).
- [[@type/name]] = مرجع لملف في [[res/]].
- [[strings.xml]] = كل النصوص، ونسخة لكل لغة في [[values-ar]] وغيره.
- [[']] ← [[\']] (Android)، و [[&]] ← [[&amp;]] (XML).`,
          lines: [
            R`الـ declaration.`,
            R`الـ root، والـ namespace اللي بيخلي [[android:]] تشتغل.`,
            R`صلاحية النت. self-closing بـ [[/>]].`,
            R`بداية التطبيق، والـ attributes على كذا سطر للقراية.`,
            R`الاسم: مرجع لـ [[strings.xml]].`,
            R`الأيقونة من [[res/mipmap]].`,
            R`الـ theme، و [[>]] بتقفل تاج الفتح.`,
            R`شاشة.`,
            R`[[.MainActivity]]: النقطة يعني جوه package التطبيق.`,
            R`ممكن تتفتح من بره (من الـ launcher).`,
            R`إمتى الشاشة دي تتفتح.`,
            R`[[MAIN]]: نقطة البداية.`,
            R`[[LAUNCHER]]: تظهر في قايمة التطبيقات.`,
            R`قفل.`,
            R`قفل الشاشة.`,
            R`قفل التطبيق.`,
            R`قفل الـ root.`
          ],
          sol: R`الملفين سليمين كـ XML ([[OK]]). وملف [[strings.xml]] صح شكله كده (لاحظ [[\']] و [[&amp;]] و [[%1$s]]):

لو كتبت [[Don't]] من غير [[\]] الـ build بيقع برسالة فيها [[Apostrophe not preceded by \]]. ولو كتبت [[&]] لوحدها بيقع قبلها كـ XML غلط أصلًا.`,
          solCode: R`<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">بوابة الجيم</string>
    <string name="welcome">أهلًا يا %1$s</string>
    <string name="note">Don\'t forget &amp; come early</string>
    <string name="items_count">عندك %d منتج</string>
</resources>`
        },
        {
          cmd: ".csproj و .sln و appsettings.json",
          title: "مشروع .NET فيه إيه: .cs و .csproj و .sln و appsettings.json؟",
          desc: R`مشاريع C# و .NET ليها ملفاتها. التفاصيل في تاب C# و .NET.

• [[.cs]]: كود C#. ملف لكل class غالبًا، واسم الملف زي اسم الـ class بالعُرف (مش إجباري زي Java). و [[Program.cs]] نقطة البداية.
• [[.csproj]]: ملف المشروع، XML. في .NET الحديث (SDK-style) بقى قصير جدًا:
  [[<Project Sdk="Microsoft.NET.Sdk.Web">]]: نوع المشروع (Web أو Console أو Worker).
  [[<TargetFramework>net8.0</TargetFramework>]]: نسخة .NET.
  [[<Nullable>enable</Nullable>]] و [[<ImplicitUsings>]]: إعدادات اللغة.
  [[<PackageReference Include="..." Version="..." />]]: مكتبة من NuGet ([[dotnet add package X]] بيكتبها).
  وكل ملفات [[.cs]] اللي في الفولدر بتدخل المشروع لوحدها، مش محتاج تكتبها.
• [[.sln]] (Solution): بيجمّع كذا مشروع ([[Api]] و [[Domain]] و [[Tests]]) عشان Visual Studio و [[dotnet build]] يتعاملوا معاهم مرة واحدة. صيغته نص خاص مش XML، وبيتعدّل بـ [[dotnet sln add]] مش بإيدك. والجديد [[.slnx]] (XML وأبسط).
• [[appsettings.json]]: إعدادات التطبيق (JSON، و .NET بيقبل فيه تعليقات). و [[appsettings.Development.json]] بيغطي عليه وانت بتطوّر، و [[appsettings.Production.json]] على السيرفر. والقيم بتتقري في الكود بـ [[builder.Configuration["Jwt:Issuer"]]] أو تتربط بـ class.
• [[Properties/launchSettings.json]]: البورت وإعدادات التشغيل على جهازك.
• [[bin/]] و [[obj/]]: الناتج والملفات المؤقتة، في [[.gitignore]].
• [[.dll]]: الناتج: C# بيتحول لـ IL (زي bytecode بتاع Java) جوه [[.dll]]، و [[dotnet app.dll]] بيشغّله (المستوى ٣).

ترتيب الإعدادات: [[appsettings.json]] ثم [[appsettings.{Environment}.json]] ثم User Secrets ثم متغيرات البيئة ثم الـ command line، والأخير يكسب. ومتغير بيئة زي [[ConnectionStrings__Default]] ([[__]] بدل [[:]]) بيغطي على [[ConnectionStrings:Default]] اللي في الملف. عشان كده الباسوردات الحقيقية متتكتبش في [[appsettings.json]]: على جهازك [[dotnet user-secrets set]]، وعلى السيرفر متغيرات بيئة.`,
          example: R`<Project Sdk="Microsoft.NET.Sdk.Web">
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.11" />
  </ItemGroup>
</Project>`,
          flag: "script",
          try: R`لو عندك .NET SDK (أو Docker: [[docker run --rm -it -v "$PWD":/w -w /w mcr.microsoft.com/dotnet/sdk:8.0 bash]]): [[dotnet new webapi -n Gym.Api]] وافتح [[Gym.Api/Gym.Api.csproj]] و [[appsettings.json]]. بعدين جوه الفولدر [[dotnet add package Microsoft.EntityFrameworkCore --version 8.0.11]] وشوف الـ csproj اتغير إزاي. واعمل solution: [[dotnet new sln -n Gym]] و [[dotnet sln Gym.sln add Gym.Api/Gym.Api.csproj]] و [[dotnet build Gym.sln]].`,
          deep: {
            why: R`زمان ملفات [[.csproj]] كانت مئات السطور فيها كل ملف بالاسم، وكل ما تضيف ملف يبقى فيه conflict. الـ SDK-style projects (من .NET Core) قلبتها: الافتراضيات المنطقية جوه الـ SDK، والملف بيقول بس الاستثناءات. و [[appsettings.json]] بديل [[web.config]] القديم (XML).`,
            how: R`[[dotnet build]] بيقرا الـ [[.csproj]] (هو في الحقيقة ملف MSBuild)، ويستورد إعدادات الـ SDK المكتوب في [[Sdk="..."]]، وينزّل الـ NuGet packages (restore) لـ [[~/.nuget/packages]]، ويعمل compile لكل [[.cs]] في الفولدر لـ [[bin/Debug/net8.0/Gym.Api.dll]]. ووقت التشغيل الـ configuration بيقرا المصادر بالترتيب ويدمجها.`,
            when: R`أي مشروع ASP.NET Core أو C# أو Unity (Unity بيعمل الـ csproj لوحده) أو MAUI.`,
            mistakes: R`تحط connection string فيه باسورد حقيقي في [[appsettings.json]] وتعمله commit. تعدّل [[.sln]] بإيدك وتبوّظه. تعمل commit لـ [[bin/]] و [[obj/]]. وتنسى إن [[appsettings.Development.json]] مبيتقريش غير لما [[ASPNETCORE_ENVIRONMENT=Development]].`
          },
          teach: R`## الفكرة

المثال ملف [[.csproj]] لمشروع ASP.NET Core Web API، والحل فيه [[appsettings.json]]. هنقرا الاتنين سطر سطر، ونشوف إعدادات .NET بتتقري منين وبأنهي ترتيب.

> مفيش .NET SDK على الجهاز اللي اتجرّب عليه، فأوامر [[dotnet]] ونواتجها من docs مايكروسوفت (learn.microsoft.com). اللي اتجرّب فعلًا: الـ [[.csproj]] اتفحص كـ XML و [[appsettings.json]] كـ JSON بـ Python 3.14 على ويندوز، والاتنين سليمين.

---

## ١. [[<Project Sdk="Microsoft.NET.Sdk.Web">]]

~~~text
<Project Sdk="Microsoft.NET.Sdk.Web">
~~~

- [[<Project>]]: الـ root. الملف ده في الحقيقة ملف MSBuild (أداة البناء بتاعة .NET).
- [[Sdk="..."]]: نوع المشروع. الـ SDK ده بيجيب معاه كل الافتراضيات: إزاي يتبني، وأنهي ملفات تدخل، وإيه المكتبات الأساسية.

| الـ Sdk | للمشروع |
|---|---|
| [[Microsoft.NET.Sdk]] | Console أو مكتبة |
| [[Microsoft.NET.Sdk.Web]] | ASP.NET Core (API أو موقع) |
| [[Microsoft.NET.Sdk.Worker]] | خدمة شغالة في الخلفية |

ومفيش [[<?xml ...?>]] في أول الملف: الـ declaration اختياري في XML، و .NET مبيكتبوش.

## ٢. [[<PropertyGroup>]]: إعدادات

~~~text
  <PropertyGroup>
    <TargetFramework>net8.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>
~~~

| التاج | معناه |
|---|---|
| [[TargetFramework]] | الكود بيتبني لأنهي .NET. [[net8.0]] = .NET 8 (نسخة LTS) |
| [[Nullable]] | [[enable]]: الـ compiler يحذّرك لو ممكن تستخدم [[null]] من غير ما تفحصه. [[string]] مش هتقبل null، و [[string?]] تقبل |
| [[ImplicitUsings]] | [[enable]]: الـ [[using]] الشائعة ([[System]] و [[System.Linq]]...) بتتضاف لكل ملف لوحدها |

## ٣. [[<ItemGroup>]]: عناصر

~~~text
  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.11" />
  </ItemGroup>
</Project>
~~~

- [[<ItemGroup>]]: مجموعة «حاجات» (مكتبات أو ملفات).
- [[<PackageReference>]]: مكتبة من NuGet (الـ registry بتاع .NET، زي npm). [[Include]] اسمها، و [[Version]] نسختها بالظبط.
- [[/>]]: self-closing.

ومفيش أي سطر بيقول «الملفات دي تدخل المشروع»: في الـ SDK-style projects كل ملف [[.cs]] في الفولدر وفولدراته بيدخل لوحده.

السطر ده بيتكتب بالأمر (من الـ docs):

~~~bash
dotnet add package Microsoft.EntityFrameworkCore --version 8.0.11
~~~

---

## ٤. [[appsettings.json]] (الـ solCode)

~~~text
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
~~~

[[Logging:LogLevel]]: يكتب logs قد إيه. [[Default: Information]] لكودك، و [[Microsoft.AspNetCore: Warning]] للـ framework نفسه (عشان ميغرقكش بسطر لكل request). المستويات من الأقل للأخطر: [[Trace]] و [[Debug]] و [[Information]] و [[Warning]] و [[Error]] و [[Critical]].

~~~text
  "ConnectionStrings": {
    "Default": "Host=localhost;Database=gym;Username=app;Password=dev"
  },
~~~

رابط قاعدة البيانات بصيغة [[key=value;key=value]] (PostgreSQL هنا). [[Password=dev]] باسورد تطوير بس، والحقيقي مكانه مش هنا (تحت).

~~~text
  "Jwt": {
    "Issuer": "gym-api",
    "ExpiresMinutes": 60
  },
  "AllowedHosts": "*"
}
~~~

- [[Jwt]]: قسم بتاعنا احنا، .NET مبيعرفوش، والكود بيقراه.
- [[60]] من غير تنصيص: رقم.
- [[AllowedHosts: "*"]]: أي اسم دومين مسموح يوصل للسيرفر.

قرايناه بـ Python واتأكدنا إن الـ JSON سليم:

~~~text الناتج
gym-api Host=localhost;Database=gym;Username=app;Password=dev
~~~

### إزاي الكود بيقرا القيم

الأقسام المتداخلة بتتقري بـ [[:]] بينها:

~~~text
builder.Configuration["Jwt:Issuer"]                 ← "gym-api"
builder.Configuration["ConnectionStrings:Default"]  ← "Host=localhost;..."
~~~

---

## ٥. الإعدادات بتيجي منين (الترتيب)

.NET بيقرا ٥ مصادر بالترتيب ده، و**الأخير يكسب** لو نفس المفتاح اتكرر (من الـ docs):

| # | المصدر | إمتى |
|---|---|---|
| 1 | [[appsettings.json]] | دايمًا |
| 2 | [[appsettings.Development.json]] | لو [[ASPNETCORE_ENVIRONMENT=Development]] |
| 3 | User Secrets ([[dotnet user-secrets set]]) | على جهازك في Development بس |
| 4 | متغيرات البيئة | دايمًا |
| 5 | الـ command line ([[--Jwt:Issuer=x]]) | دايمًا |

ومتغير البيئة مينفعش فيه [[:]] على كل الأنظمة، فبيتكتب [[__]] (شرطتين تحت):

~~~text
ConnectionStrings__Default=Host=db;Password=REAL
~~~

ده بيغطي على [[ConnectionStrings:Default]] اللي في الملف. عشان كده الباسورد الحقيقي في متغير بيئة على السيرفر، والملف فيه قيم تطوير بس.

---

## ٦. باقي ملفات المشروع (من الـ docs)

| الملف | فيه |
|---|---|
| [[Program.cs]] | نقطة البداية |
| [[Gym.Api.csproj]] | المشروع (المثال) |
| [[Gym.sln]] | بيجمّع كذا مشروع، بيتعدّل بـ [[dotnet sln add]] |
| [[Properties/launchSettings.json]] | البورت والـ environment على جهازك |
| [[bin/]] و [[obj/]] | ناتج البناء، في [[.gitignore]] |

[[dotnet build]] بيطلّع [[bin/Debug/net8.0/Gym.Api.dll]]: الكود متحوّل لـ IL (Intermediate Language)، و [[dotnet Gym.Api.dll]] بيشغّله.

---

## الخلاصة

- [[.csproj]] = نوع المشروع ([[Sdk]]) + نسخة .NET + المكتبات. كل [[.cs]] بيدخل لوحده.
- [[appsettings.json]] = إعدادات التطبيق، و [[:]] بين الأقسام في الكود، و [[__]] في متغيرات البيئة.
- الترتيب: الملف ← ملف البيئة ← user secrets ← متغيرات البيئة ← command line، والأخير يكسب.
- الأسرار عمرها ما تتكتب في [[appsettings.json]] اللي في Git.`,
          lines: [
            R`نوع المشروع: Web API (الـ SDK بيحدد الافتراضيات).`,
            R`مجموعة إعدادات.`,
            R`نسخة .NET.`,
            R`فحص الـ null في C#.`,
            R`[[using]] الشائعة بتتضاف لوحدها.`,
            R`قفل.`,
            R`مجموعة عناصر.`,
            R`مكتبة من NuGet بنسختها (self-closing).`,
            R`قفل.`,
            R`قفل الـ root.`
          ],
          sol: R`[[dotnet new webapi -n Gym.Api]] (SDK 8) بيعمل [[Gym.Api.csproj]] فيه نفس [[PropertyGroup]] اللي في المثال، وفي الـ [[ItemGroup]] مكتبتين: [[Microsoft.AspNetCore.OpenApi]] و [[Swashbuckle.AspNetCore]]. وبعد [[dotnet add package]] اتضاف سطر:
[[<PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.11" />]]
و [[dotnet sln add]] بيطبع [[Project $__btGym.Api/Gym.Api.csproj$__bt added to the solution.]]
و [[dotnet build Gym.sln]] بيخلص بـ [[Build succeeded.]] و [[0 Warning(s)]] و [[0 Error(s)]]، والناتج في [[Gym.Api/bin/Debug/net8.0/]]: [[Gym.Api.dll]] و [[Gym.Api.deps.json]] و [[Gym.Api.runtimeconfig.json]] و [[Gym.Api]] (ملف تشغيل للينكس).

و [[appsettings.json]] اللي بيتعمل مع الـ webapi شبه ده (وده بعد ما ضفنا connection string و Jwt):`,
          solCode: R`{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "ConnectionStrings": {
    "Default": "Host=localhost;Database=gym;Username=app;Password=dev"
  },
  "Jwt": {
    "Issuer": "gym-api",
    "ExpiresMinutes": 60
  },
  "AllowedHosts": "*"
}`
        }
      ]
    }
]);

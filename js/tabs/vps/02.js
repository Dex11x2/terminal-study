// تكملة تاب vps: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/vps/01.js (شرح حقول الدرس في أوله)
MORE("vps", [
    {
      t: "tmux: جلسات مش بتقفل",
      l: 1,
      n: "لو الـ ssh اتقطع وانت بتعمل حاجة طويلة، tmux بيخليها شغالة",
      items: [
        {
          cmd: "tmux",
          title: "شغّل واخرج وارجع",
          desc: R`كل الاختصارات بتبدأ بـ Ctrl+B وبعدين حرف. Ctrl+B ثم D تسيب الجلسة شغالة وتخرج، و [[attach]] ترجعلها. Ctrl+B ثم % يقسم الشاشة بالطول، وثم " بالعرض، وثم الأسهم للتنقل بينهم.`,
          example: R`sudo apt install -y tmux
tmux new -s work
tmux ls
tmux attach -t work
tmux kill-session -t work`,
          try: "افتح جلسة وشغّل [[htop]] جواها، اعمل Ctrl+B ثم D، اخرج من ssh خالص، ادخل تاني واعمل attach. هتلاقي htop لسه شغال.",
          deep: {
            why: "بتشغّل على السيرفر حاجة بتاخد وقت (باك أب، أو build، أو تحديث كبير)، والنت يقطع ثانية، فالـ ssh يقفل، فالأمر يموت في نصه. tmux بيحل ده.",
            how: R`عادةً الأوامر اللي بتشغّلها مربوطة بالترمنال اللي فتحته، فلو قفل تقفل معاه (شرحنا ده في nohup).

tmux برنامج بيشتغل على السيرفر نفسه، وجواه ترمنال خاص بيه. انت بتتفرج عليه من خلال ssh. فلو الـ ssh قطع، tmux نفسه وكل اللي جواه فاضلين شغالين على السيرفر عادي. ترجع تدخل وتعمل [[attach]]، فتلاقي كل حاجة زي ما سبتها، حتى اللي كان مكتوب على الشاشة.

كل الاختصارات بتبدأ بـ Ctrl+B (اسمها prefix)، تسيبها، وبعدين تدوس الحرف. Ctrl+B ثم D (من detach): تخرج وتسيب كل حاجة شغالة. و [[tmux ls]] يعرض الجلسات، و [[attach -t اسم]] ترجع لجلسة.

وكمان تقدر تقسم الشاشة وتفتح كذا ترمنال جنب بعض في نفس الجلسة: لوج شغال في نص، وانت بتكتب أوامر في النص التاني.`,
            when: "أي حاجة هتاخد أكتر من دقيقتين على السيرفر. ولما تحتاج تتابع لوج وتكتب أوامر في نفس الوقت.",
            mistakes: "إنك تقفل الجلسة بـ [[exit]] جواها وانت كنت عايز تخرج بس. [[exit]] بيقفلها خالص، وده غير Ctrl+B ثم D."
          },
          teach: R`## جلسة شغالة على السيرفر، وانت بتتفرج عليها

tmux (من terminal multiplexer: حاجة بتشغّل كذا ترمنال جوه ترمنال واحد) برنامج بيعيش على السيرفر. انت بتفتح جلسة جواه، وتسيبها، وترجعلها بعدين حتى لو الـ ssh قطع في النص. اتجرّب كله من كونتينر لابتوب داخل بـ ssh على كونتينر [[ubuntu:24.04]] شغال كسيرفر، و tmux نسخته [[3.4]].

---

## ١. [[sudo apt install -y tmux]]

تسطيب عادي من apt (درس [[apt install]]). على أغلب صور أوبونتو للسيرفرات بيبقى متسطّب أصلًا.

---

## ٢. [[tmux new -s work]]

| الحتة | معناها |
|---|---|
| [[new]] | اعمل جلسة جديدة (اختصار [[new-session]]) |
| [[-s work]] | سمّيها work (s من session name) |

الشاشة بتتمسح ويبان شريط أخضر تحت:

~~~text الشريط اللي تحت
[work] 0:top*                                        "my-server" 14:48 06-Oct-26
~~~

| الحتة | معناها |
|---|---|
| [[[work]]] | اسم الجلسة |
| [[0:top*]] | نافذة رقم 0 شغال فيها [[top]]، و [[*]] يعني دي النافذة اللي قدامك |
| [[my-server]] | اسم الجهاز |
| الباقي | الساعة والتاريخ |

جوه الجلسة ده ترمنال عادي. شغّلت فيه [[top]] (برنامج زي htop بس أبسط، بيعرض العمليات لايف).

### الخروج من غير ما تقفل: Ctrl+B ثم D

اضغط Ctrl+B، **سيبهم**، وبعدين اضغط D. الـ Ctrl+B اسمها **prefix**: بتقول لـ tmux «الحرف الجاي ليك انت، مش للبرنامج اللي جوه». و D من detach (افصل):

~~~text الناتج
[detached (from session work)]
~~~

رجعت للشيل العادي، و top لسه شغال جوه الجلسة.

---

## ٣. [[tmux ls]]

[[ls]] اختصار [[list-sessions]]. خرجت من ssh خالص، ودخلت تاني، وكتبته:

~~~text الناتج
work: 1 windows (created Tue Oct  6 14:48:40 2026)
~~~

الجلسة عايشة، فيها نافذة واحدة. وده لأن tmux بيشتغل كعملية لوحدها على السيرفر مش مربوطة بالـ ssh:

~~~text ps على السيرفر بعد ما الـ ssh قفل
    288 root     tmux new -s work
    300 root     top
~~~

---

## ٤. [[tmux attach -t work]]

[[attach]] ارجع اتفرج على جلسة، و [[-t work]] (t من target) أنهي جلسة. هتلاقي top شغال زي ما سبته، وكل اللي كان على الشاشة. ولو عندك جلسة واحدة بس، [[tmux attach]] لوحدها كفاية.

---

## ٥. [[tmux kill-session -t work]]

بيقفل الجلسة وكل اللي جواها (top هنا مات معاها). مش بيطبع حاجة لو نجح، وبعده:

~~~text tmux ls
no server running on /tmp/tmux-0/default
~~~

يعني مفيش جلسات خالص. و [[/tmp/tmux-0]] فولدر tmux بتاع اليوزر رقم 0 (root)؛ ليوزر عادي هتلاقيه [[tmux-1000]] مثلًا. ولو حاولت attach ساعتها: [[no sessions]].

---

## الاختصارات

كلها Ctrl+B الأول، تسيبها، وبعدين الحرف:

| بعد Ctrl+B | بيعمل إيه |
|---|---|
| [[d]] | detach: اخرج وسيبها شغالة |
| [[%]] | قسّم الشاشة نصين جنب بعض |
| [["]] | قسّم الشاشة نصين فوق بعض |
| الأسهم | اتنقل بين الأجزاء |
| [[c]] | نافذة جديدة (create) |
| [[0]] لـ [[9]] | روح لنافذة بالرقم |

---

## الخلاصة

~~~text
tmux new -s اسم          جلسة جديدة
Ctrl+B ثم d              اخرج وهي شغالة
tmux ls                  الجلسات الموجودة
tmux attach -t اسم       ارجع لجلسة
tmux kill-session -t اسم اقفلها خالص (زي exit جواها)
~~~

> tmux بيعيش لو الـ ssh قطع، بس **مش** بيعيش بعد reboot للسيرفر.`,
          lines: [
            "سطّب tmux.",
            "افتح جلسة جديدة اسمها work.",
            "اعرض الجلسات الموجودة.",
            "ارجع لجلسة work.",
            "اقفل الجلسة خالص."
          ],
          sol: R`بعد [[Ctrl+B]] ثم [[D]] بيطبع [[[detached (from session work)]]] وترجع للشيل العادي. وبعد ما تخرج من SSH وتدخل تاني: [[tmux ls]] بيطبع [[work: 1 windows (created ...)]]، و [[tmux attach -t work]] بيرجّعك لـ htop زي ما سيبته بالظبط وشغال.

ده لأن الجلسة شغالة على السيرفر نفسه مش مربوطة بالـ SSH، فقطع الاتصال مابيقتلهاش. نفس الفكرة لأمر طويل زي [[docker compose build]].

الأغلاط الشائعة: [[no server running on /tmp/tmux-1000/default]]: مفيش جلسات (اتقفلت أو السيرفر اتعمله reboot؛ tmux مش بيعيش بعد reboot). و [[sessions should be nested with care]]: انت أصلًا جوه tmux. و Ctrl+B و D مع بعض مش هيشتغل؛ لازم تسيب Ctrl+B الأول وبعدين D.`
        }
      ]
    },
    {
      t: "vim بالحد الأدنى",
      l: 1,
      n: "هتلاقيه على أي سيرفر حتى لو nano مش موجود",
      items: [
        {
          cmd: "vim",
          title: "ادخل وعدّل واخرج",
          desc: "vim ليه وضعين: وضع أوامر (اللي بتبدأ فيه) ووضع كتابة. [[i]] تبدأ تكتب، و Esc ترجع للأوامر. من وضع الأوامر: [[:w]] حفظ، [[:q]] خروج، [[:wq]] الاتنين، [[:q!]] خروج من غير حفظ، [[/كلمة]] بحث، [[dd]] يمسح سطر، و [[u]] تراجع.",
          example: "vim test.txt",
          try: "افتح ملف، اكتب 3 سطور، امسح واحد بـ dd، ارجعه بـ u، واحفظ واخرج بـ :wq.",
          deep: {
            why: "vim موجود على كل سيرفر لينكس تقريبًا، حتى لو nano مش موجود. وأوامر كتير (زي [[crontab -e]] و [[git commit]]) ممكن تفتحهولك لوحدها. لازم على الأقل تعرف تعدّل وتحفظ وتخرج.",
            how: R`vim مختلف عن أي محرر اتعاملت معاه، لأن ليه «أوضاع» (modes).

لما يفتح، بتبقى في وضع الأوامر (Normal mode): الحروف اللي بتكتبها مش بتتكتب في الملف، دي أوامر. مثلًا [[dd]] بيمسح السطر، و [[u]] بيتراجع. عشان كده ناس كتير بتفتحه، تكتب، وتلاقي حاجات غريبة بتحصل.

عشان تكتب، دوس [[i]] (من insert)، وتحت هيظهر INSERT. دلوقتي اكتب عادي. ولما تخلص، دوس Esc ترجع لوضع الأوامر.

ومن وضع الأوامر، أي حاجة بتبدأ بـ [[:]] بتتكتب تحت: [[:w]] حفظ، و [[:q]] خروج، و [[:wq]] حفظ وخروج، و [[:q!]] خروج من غير حفظ (الـ [[!]] معناها «أيوه متأكد، سيب التعديلات»).

القاعدة لو اتلخبطت: Esc كذا مرة، وبعدين [[:q!]]، وتبدأ من الأول.`,
            when: "لما nano مش موجود، أو أمر يفتحلك vim لوحده. ولو حبيته، vim أسرع بكتير في التعديل لما تتعوّد عليه، بس ده اختياري.",
            mistakes: "إنك تكتب علطول من غير [[i]]، فالحروف تتنفذ كأوامر وتبوّظ الملف. لو حصل، Esc وبعدين [[:q!]] يخرجك من غير ما يحفظ الضرر."
          },
          teach: R`## أمر واحد، والباقي جوه vim

المثال سطر واحد: [[vim test.txt]]. [[vim]] اختصار Vi IMproved (نسخة محسّنة من محرر قديم اسمه vi)، و [[test.txt]] الملف. لو موجود بيفتحه، ولو مش موجود بيفتح صفحة فاضية وبيعمله أول ما تحفظ. كل اللي بعد كده مفاتيح بتدوسها جوه vim. جربت التسلسل ده بالظبط على vim [[9.1]] في كونتينر [[ubuntu:24.04]].

---

## ١. الفتح

~~~bash
vim test.txt
~~~

الشاشة بتتملى بعلامات [[~]] على الشمال: كل [[~]] سطر مش موجود في الملف. وتحت:

~~~text السطر اللي تحت
"test.txt" [New]
~~~

[[[New]]] يعني ملف جديد لسه متحفظش. انت دلوقتي في **Normal mode** (وضع الأوامر): أي حرف تدوسه أمر، مش كتابة.

---

## ٢. [[i]]: ابدأ تكتب

[[i]] من insert. تحت هيظهر:

~~~text السطر اللي تحت
-- INSERT --
~~~

دلوقتي اكتب عادي. كتبت ٣ سطور:

~~~text
line one
line two
line three
~~~

---

## ٣. Esc: ارجع لوضع الأوامر

[[-- INSERT --]] بتختفي. أي حرف من هنا أمر تاني.

---

## ٤. [[dd]] ثم [[u]]

حرّك المؤشر بالأسهم لسطر [[line two]] واكتب [[dd]] (d من delete، ومرتين يعني «السطر كله»): السطر بيختفي. وبعدين [[u]] (undo):

~~~text السطر اللي تحت
1 more line; before #2  1 second ago
~~~

يعني رجع سطر واحد، و [[before #2]] إنك رجعت لما قبل التعديل رقم ٢.

---

## ٥. الأوامر اللي بتبدأ بـ [[:]]

لما تكتب [[:]] في وضع الأوامر، المؤشر بينزل لآخر سطر تكتب فيه أمر، و Enter تنفّذه:

| الأمر | معناه |
|---|---|
| [[:w]] | write: احفظ |
| [[:q]] | quit: اخرج |
| [[:wq]] | احفظ واخرج |
| [[:q!]] | اخرج ومتحفظش. الـ [[!]] يعني «متأكد، سيب التعديلات» |

جربت [[:q]] بعد التعديل من غير حفظ:

~~~text الناتج
E37: No write since last change (add ! to override)
~~~

vim رافض يخرج عشان متضيعش شغلك، وبيقولك ضيف [[!]] لو عايز تخرج فعلًا. ولما كتبت [[:wq]]:

~~~text الناتج
"test.txt" [New] 3L, 29B written
~~~

[[3L]] يعني ٣ سطور (Lines)، و [[29B]] يعني ٢٩ بايت: ٢٦ حرف و ٣ أسطر جديدة.

~~~bash
wc -l test.txt
~~~

~~~text الناتج
3 test.txt
~~~

---

## ٦. البحث: [[/كلمة]]

من وضع الأوامر، [[/two]] و Enter بيودّي المؤشر لأول [[two]]، و [[n]] (next) للي بعدها.

---

## لو فتحت ملف نظام من غير sudo

جربت أفتح [[/etc/hosts]] بيوزر عادي. تحت بيكتب [[[readonly]]]، ولما عدّلت وكتبت [[:w]]:

~~~text الناتج
E45: 'readonly' option is set (add ! to override)
~~~

متكتبش [[:w!]] هنا، مش هتقدر تحفظ برضه لأنك مش root. اخرج بـ [[:q!]] وافتح بـ [[sudo vim /etc/hosts]].

---

## الخلاصة

~~~text
i        ابدأ تكتب (-- INSERT -- تحت)
Esc      ارجع لوضع الأوامر
dd       امسح السطر
u        تراجع
/كلمة    دوّر
:wq      احفظ واخرج
:q!      اخرج من غير حفظ
~~~

> لو اتلخبطت: Esc مرتين، وبعدين [[:q!]] و Enter. ده بيخرجك من أي حاجة.`,
          lines: ["افتح (أو اعمل) ملف test.txt في vim. اضغط i عشان تكتب، و Esc ثم [[:wq]] تحفظ وتخرج."],
          sol: R`بعد [[:wq]] الملف فيه التلات سطور. [[cat test.txt]] بيوريهم، و [[wc -l test.txt]] بيطبع [[3 test.txt]].

التسلسل: [[vim test.txt]]، و [[i]] (تحت هيظهر [[-- INSERT --]])، واكتب التلات سطور، و [[Esc]]، وحط المؤشر على سطر و [[dd]] (السطر يختفي)، و [[u]] (يرجع، وتحت يطبع [[1 more line; before #2]])، و [[:wq]] (تحت [["test.txt" [New] 3L, 29B written]]).

الأغلاط الشائعة: تكتب [[dd]] أو [[:wq]] وانت لسه في INSERT فيتكتبوا كنص: اضغط Esc الأول. و [[E37: No write since last change]] لما تكتب [[:q]] بعد تعديل: يا [[:wq]] يا [[:q!]]. ولو فتحت ملف في [[/etc]] من غير sudo، تحت هيكتب [[[readonly]]]، ولما تحاول [[:w]] هيطلع [[E45: 'readonly' option is set (add ! to override)]]: اخرج بـ [[:q!]] وافتحه بـ [[sudo vim]].`
        }
      ]
    },
    {
      t: "اليوزرز",
      l: 2,
      n: "متشتغلش بـ root. اعمل يوزر عادي وادّيله sudo",
      items: [
        {
          cmd: "adduser",
          title: "اعمل يوزر بصلاحيات sudo",
          desc: "[[adduser]] بيعمل اليوزر والـ home بتاعه ويطلب باسورد. [[usermod -aG sudo]] بيضيفه لجروب sudo. الـ [[-a]] مهمة جدًا: من غيرها هيشيله من كل الجروبات التانية.",
          example: R`sudo adduser deploy
sudo usermod -aG sudo deploy
groups deploy
su - deploy`,
          try: "اعمل يوزر deploy، ادخله بـ [[su -]]، وجرب [[sudo whoami]]. المفروض يطبع root.",
          deep: {
            why: "الشغل بـ root طول الوقت خطير: أي غلطة صغيرة ليها صلاحيات كاملة، ولو حد سرق دخولك يبقى مالك السيرفر. الصح يوزر عادي، ولما تحتاج صلاحيات تطلبها بـ sudo.",
            how: R`[[adduser deploy]] بيعمل اليوزر، ويعمله فولدر [[/home/deploy]]، ويطلب باسورد (مهم حتى لو هتدخل بمفتاح، لأن sudo هيطلبه).

بس اليوزر الجديد صلاحياته عادية ومش هيقدر يستخدم sudo. هنا [[usermod -aG sudo deploy]]: ضيفه لجروب اسمه sudo، وأي حد في الجروب ده مسموحله يستخدم sudo.

والحرفين دول مهمين جدًا: [[-G]] يعني «الجروبات بتاعته هي دي»، و [[-a]] (من append) يعني «ضيف على اللي عنده». من غير [[-a]]، هيبقى في جروب sudo بس، وكل جروباته التانية هتتشال.

[[groups deploy]] يوريك جروباته. و [[su - deploy]] بتخليك تبقى اليوزر ده جوه نفس الترمنال عشان تجرّب، و [[exit]] ترجّعك.`,
            when: "أول حاجة بعد ما تستلم أي سيرفر جديد، قبل أي حاجة تانية.",
            mistakes: "نسيان [[-a]]. وإنك تعمل اليوزر وتقفل root قبل ما تتأكد إن اليوزر الجديد بيدخل وبيستخدم sudo فعلًا، فتقفل على نفسك."
          },
          teach: R`## ٤ خطوات: اعمل، ادّي صلاحية، اتأكد، جرّب

هنعمل يوزر اسمه [[deploy]] (الاسم المشهور لليوزر اللي بيشغّل المواقع، وتقدر تختار أي اسم)، وندّيله حق استخدام [[sudo]]. اتجرّب كله على كونتينر [[ubuntu:24.04]] شغال كسيرفر، وانا داخل كـ root.

---

## ١. [[sudo adduser deploy]]

[[adduser]] سكربت أوبونتو اللطيف لعمل يوزر: بيعمل كل حاجة ويسألك الباقي. الناتج الحقيقي:

~~~text الناتج
info: Adding user $__btdeploy' ...
info: Selecting UID/GID from range 1000 to 59999 ...
info: Adding new group $__btdeploy' (1001) ...
info: Adding new user $__btdeploy' (1001) with group $__btdeploy (1001)' ...
info: Creating home directory $__bt/home/deploy' ...
info: Copying files from $__bt/etc/skel' ...
New password:
Retype new password:
passwd: password updated successfully
Changing the user information for deploy
Enter the new value, or press ENTER for the default
	Full Name []:
	Room Number []:
	Work Phone []:
	Home Phone []:
	Other []:
Is the information correct? [Y/n] Y
info: Adding new user $__btdeploy' to supplemental / extra groups $__btusers' ...
info: Adding user $__btdeploy' to group $__btusers' ...
~~~

### نقرا اللي حصل

| السطر | معناه |
|---|---|
| [[UID/GID]] | كل يوزر ليه رقم (User ID) وكل جروب ليه رقم (Group ID). لينكس بيتعامل بالأرقام، والأسامي للبني آدمين |
| [[Adding new group deploy (1001)]] | عمل جروب بنفس اسم اليوزر، رقمه 1001 (الـ 1000 واخده يوزر [[ubuntu]] اللي جاي مع الصورة) |
| [[Creating home directory /home/deploy]] | فولدره الخاص |
| [[Copying files from /etc/skel]] | [[skel]] من skeleton: ملفات البداية زي [[.bashrc]] بتتنسخ لكل يوزر جديد |
| [[New password]] | الباسورد. **مش هيظهر أي حاجة وانت بتكتب**، ولا نجوم، وده طبيعي |
| [[Full Name]] والباقي | معلومات اختيارية، Enter على كلها |
| [[extra groups users]] | أوبونتو بيضيفه لجروب [[users]] العام |

ليه الباسورد مهم حتى لو هتدخل بمفتاح؟ لأن [[sudo]] هيطلبه منك قبل أي أمر بصلاحيات root.

جربت أعمله تاني:

~~~text الناتج
fatal: The user $__btdeploy' already exists.
~~~

---

## ٢. [[sudo usermod -aG sudo deploy]]

[[usermod]] من user modify: عدّل يوزر موجود.

| الحتة | معناها |
|---|---|
| [[-G sudo]] | الجروبات الإضافية بتاعته هي: [[sudo]] |
| [[-a]] | append: **ضيف** على اللي عنده، متشيلش حاجة |
| [[deploy]] | اليوزر |

وجروب [[sudo]] ده جروب خاص: أوبونتو مظبوط إن أي حد فيه يقدر يستخدم الأمر [[sudo]].

### ليه [[-a]] مهمة كده؟

جربت على يوزر تجربة كان في جروبين [[sudo]] و [[users]]، وعملت [[usermod -G sudo]] من غير [[-a]]:

~~~text الناتج
demo : demo sudo users      قبل
demo : demo sudo            بعد usermod -G sudo من غير -a
~~~

جروب [[users]] راح. [[-G]] لوحدها معناها «الجروبات دي **بس**». ولو اليوزر كان في جروب [[docker]] مثلًا، كان هيتشال منه.

---

## ٣. [[groups deploy]]

بيطبع اليوزر وجروباته بعد [[:]]:

~~~text قبل usermod
deploy : deploy users
~~~

~~~text بعد usermod
deploy : deploy sudo users
~~~

[[deploy]] الأولى جروبه الأساسي، والباقي الإضافية. ولو عايز الأرقام كمان: [[id deploy]]:

~~~text الناتج
uid=1001(deploy) gid=1001(deploy) groups=1001(deploy),27(sudo),100(users)
~~~

---

## ٤. [[su - deploy]]

[[su]] من switch user: بدّل ليوزر تاني في نفس الترمنال. و [[-]] لوحدها معناها «زي ما يكون لسه داخل»: يروح الـ home بتاعه ويحمّل إعداداته. من غيرها هتفضل في فولدرك القديم وبإعداداتك.

جربت وجوه كتبت أوامر:

~~~text الناتج
To run a command as administrator (user "root"), use "sudo <command>".
See "man sudo_root" for details.

deploy@my-server:~$ whoami; pwd
deploy
/home/deploy
deploy@my-server:~$ sudo whoami
[sudo] password for deploy:
root
deploy@my-server:~$ exit
logout
~~~

- الرسالة اللي فوق أوبونتو بيطبعها لأي يوزر في جروب sudo لحد ما يستخدم sudo أول مرة.
- الـ prompt بقى [[$]] بدل [[#]]: يوزر عادي.
- [[whoami]] (أنا مين؟) طبع [[deploy]]، و [[sudo whoami]] طبع [[root]]: يعني sudo شغال.
- sudo طلب باسورد **deploy** مش root.
- [[exit]] رجّعني لـ root.

---

## الخلاصة

| الخطوة | الأمر | اتأكد بـ |
|---|---|---|
| ١ | [[sudo adduser deploy]] | [[id deploy]] |
| ٢ | [[sudo usermod -aG sudo deploy]] | [[groups deploy]] فيها sudo |
| ٣ | [[su - deploy]] ثم [[sudo whoami]] | يطبع [[root]] |

> متقفلش دخول root إلا لما الخطوات دي كلها تنجح، ويوزرك يدخل بالمفتاح (الدرس الجاي).`,
          lines: [
            "اعمل يوزر اسمه deploy، وهيسألك على باسورد ومعلومات (الباقي ممكن تسيبه فاضي بـ Enter).",
            "ضيف deploy ([[-a]] append) لجروب ([[-G]]) اسمه sudo، فيقدر يستخدم sudo.",
            "اتأكد إن sudo ظهر في جروباته.",
            "بدّل ليوزر deploy في نفس الترمنال. الـ [[-]] بتحمّل إعداداته كاملة كأنه لسه داخل."
          ],
          sol: R`[[sudo adduser deploy]] بيسألك باسورد مرتين وبعدين بيانات (Full Name وغيره، سيبها فاضية بـ Enter). و [[groups deploy]] بعد usermod بيطبع [[deploy : deploy sudo users]]. جربتها على أوبونتو 24.04 وطلعت كده ([[users]] بيتضاف افتراضيًا).

[[su - deploy]] بيغيّر الـ prompt لـ [[deploy@server:~$]]، و [[sudo whoami]] بيسأل عن باسورد deploy (مش root) وبعدين بيطبع [[root]]. و [[exit]] بيرجّعك.

الغلط الشائع: [[deploy is not in the sudoers file]]: الـ usermod اتعمل بعد ما دخلت بـ su، فالجلسة القديمة مش شايفة الجروب. اعمل [[exit]] وادخل تاني. ولو نسيت [[-a]] في [[usermod -aG]]، اليوزر هيتشال من كل الجروبات التانية.`
        },
        {
          cmd: "نقل مفتاح SSH",
          title: "خلّي اليوزر الجديد يدخل بنفس مفتاحك",
          desc: R`الدخول بمفتاح SSH بيشتغل بملف اسمه [[authorized_keys]] جوه فولدر [[.ssh]] بتاع كل يوزر، وفيه المفاتيح العامة المسموحلها تدخل. انت دخلت كـ root بمفتاحك، فالمفتاح ده في [[/root/.ssh]]، واليوزر الجديد deploy لسه معندوش.

[[rsync]] بينسخ الفولدر كله: [[--archive]] بيحافظ على الصلاحيات والتواريخ زي ما هي، و [[--chown=deploy:deploy]] بيخلي صاحب الملفات المنسوخة deploy (اليوزر:الجروب). ده مهم لأن SSH بيرفض المفتاح لو الملف ملك حد تاني أو صلاحياته مفتوحة زيادة. و [[~/.ssh]] من غير [[/]] في الآخر معناها انسخ الفولدر نفسه جوه [[/home/deploy]].

بعدها جرّب [[ssh deploy@IP]] من نافذة جديدة على جهازك، وسيب نافذة root مفتوحة لحد ما الدخول ينجح.`,
          example: R`sudo rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy
ssh deploy@203.0.113.10`,
          try: "ادخل بـ deploy من جهازك مباشرة.",
          deep: {
            why: "انت دخلت السيرفر كـ root بمفتاح SSH. اليوزر الجديد لسه ملوش مفاتيح، فمش هتعرف تدخل بيه من جهازك من غير باسورد.",
            how: R`المفاتيح المسموحلها تدخل أي يوزر متحطة في ملف [[~/.ssh/authorized_keys]] جوه فولدره. فالفكرة إنك تنسخ نفس الملف من root لليوزر الجديد.

ليه مش [[cp]] عادي؟ لأن الملفات هتتنسخ وصاحبها root، واليوزر deploy مش هيعرف يقراها، و SSH بيرفض المفاتيح لو الصلاحيات مش مظبوطة. [[rsync --archive]] بيحافظ على الصلاحيات، و [[--chown=deploy:deploy]] بيغيّر المالك وهو بينسخ. كل ده في أمر واحد.

وبعدين الاختبار المهم: من نافذة جديدة على جهازك، [[ssh deploy@IP]]. ولو دخل، تمام. وسيب نافذة root مفتوحة لحد ما تتأكد.`,
            when: "مرة واحدة، بعد adduser على طول.",
            mistakes: "تنسخ بـ [[cp]] والصلاحيات تبوظ، فالدخول يفشل بـ «Permission denied (publickey)». وتقفل نافذة root قبل ما تختبر."
          },
          teach: R`## مفتاحك عند root، وعايزينه عند deploy

لما بتدخل بمفتاح، السيرفر بيدوّر على المفتاح العام بتاعك في ملف [[authorized_keys]] جوه فولدر [[.ssh]] بتاع **اليوزر اللي بتدخل بيه**. root عنده الملف ده، و deploy لأ. فهننسخه. اتجرّب على كونتينرين: سيرفر [[my-server]] على [[203.0.113.10]]، ولابتوب فيه يوزر [[ali]] ومفتاح تجربة.

---

## ١. [[sudo rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy]]

بيتشغّل **على السيرفر** وانت داخل كـ root. نفكه:

| الحتة | معناها |
|---|---|
| [[sudo]] | محتاج صلاحيات عشان يكتب في فولدر يوزر تاني ويغيّر صاحب الملفات |
| [[rsync]] | أداة نسخ (remote sync) بتنسخ محلي أو بين أجهزة |
| [[--archive]] | انسخ كل حاجة جوه الفولدر، وحافظ على الصلاحيات والتواريخ زي ما هي (مختصرها [[-a]]) |
| [[--chown=deploy:deploy]] | خلّي صاحب الملفات الجديدة اليوزر [[deploy]] والجروب [[deploy]] (change owner) |
| [[~/.ssh]] | المصدر: فولدر [[.ssh]] في الـ home بتاعك (هنا [[/root/.ssh]]) |
| [[/home/deploy]] | الوجهة |

الأمر مش بيطبع حاجة لو نجح. والنتيجة:

~~~text ls -la /home/deploy/.ssh
drwx------ 2 deploy deploy 4096 Oct  6 14:38 .
drwxr-x--- 3 deploy deploy 4096 Oct  6 14:51 ..
-rw------- 1 deploy deploy   92 Oct  6 14:38 authorized_keys
~~~

نقرا العمود الأول والتالت والرابع:

| السطر | الصلاحيات | معناها | الصاحب |
|---|---|---|---|
| [[.]] (الفولدر نفسه) | [[drwx------]] (700) | deploy بس يدخله ويقرا ويكتب فيه | deploy deploy |
| [[authorized_keys]] | [[-rw-------]] (600) | deploy بس يقراه ويكتب فيه | deploy deploy |

و [[--archive]] حافظ على التاريخ الأصلي (14:38)، و [[--chown]] غيّر الصاحب.

### الـ [[/]] في آخر المصدر بتفرق

جربت الاتنين:

~~~text الناتج
rsync -a ~/.ssh  /tmp/t1    ->  /tmp/t1/.ssh            الفولدر نفسه اتنسخ
rsync -a ~/.ssh/ /tmp/t2    ->  /tmp/t2/authorized_keys  اللي جواه بس
~~~

إحنا عايزين الأولى: [[/home/deploy/.ssh]].

### ليه مش [[cp]]؟

جربت [[cp -r ~/.ssh /home/deploy/]] بدل rsync:

~~~text الناتج
-rw------- 1 root   root     92 Oct  6 14:51 authorized_keys
~~~

الملف ملك root وصلاحيته 600، فـ deploy مش قادر يقراه. والدخول فشل:

~~~text من اللابتوب
deploy@203.0.113.10: Permission denied (publickey,password).
~~~

والسبب الحقيقي ظهر في لوج الـ ssh على السيرفر ([[sudo journalctl -u ssh -n 3]]، أو [[/var/log/auth.log]] على سيرفر فيه rsyslog):

~~~text الناتج
sshd[541]: Could not open user 'deploy' authorized keys '/home/deploy/.ssh/authorized_keys': Permission denied
~~~

وجربت العكس: الملف ملك deploy بس صلاحياته مفتوحة زيادة (666، أي حد يكتب فيه):

~~~text الناتج
sshd[610]: Authentication refused: bad ownership or modes for file /home/deploy/.ssh/authorized_keys
~~~

sshd رافض، لأن لو أي يوزر تاني يقدر يكتب في الملف، يقدر يضيف مفتاحه ويدخل بدالك.

---

## ٢. [[ssh deploy@203.0.113.10]]

ده بيتشغّل **على جهازك**، في نافذة جديدة، وسيب نافذة root مفتوحة. نفس مفتاحك، بس يوزر تاني:

~~~text الناتج
deploy@my-server:~$ ls -la ~/.ssh
...
-rw------- 1 deploy deploy   92 Oct  6 14:38 authorized_keys
deploy@my-server:~$ exit
logout
Connection to 203.0.113.10 closed.
~~~

دخل من غير باسورد، والـ prompt [[deploy@my-server:~$]].

---

## الخلاصة

| الشرط عشان المفتاح يشتغل | القيمة |
|---|---|
| مكان الملف | [[/home/deploy/.ssh/authorized_keys]] |
| صاحب الملف والفولدر | [[deploy]] |
| صلاحية الفولدر | 700 |
| صلاحية الملف | 600 (أو 644) |

> لو الدخول فشل، اللوج على السيرفر بيقولك السبب بالظبط. والإصلاح: [[sudo chown -R deploy:deploy /home/deploy/.ssh]] و [[sudo chmod 700]] للفولدر و [[600]] للملف.`,
          lines: [
            "انسخ فولدر [[.ssh]] بتاع root (اللي فيه المفاتيح المسموحة) لفولدر deploy، وخلّي deploy صاحبه ([[--chown]]).",
            "من جهازك في نافذة جديدة: جرّب تدخل بـ deploy."
          ],
          sol: R`[[ssh deploy@203.0.113.10]] من جهازك بيدخل على طول من غير باسورد، والـ prompt [[deploy@server:~$]]. و [[ls -la ~/.ssh]] جوه بيوري [[authorized_keys]] ملك [[deploy deploy]].

وده شغال لأن [[rsync --chown=deploy:deploy]] نسخ نفس [[authorized_keys]] بتاع root وخلّى deploy صاحبه. لو صاحب الملف root، sshd بيرفض المفتاح.

الغلط الشائع: [[Permission denied (publickey)]] مع إن الملف موجود: الصلاحيات أوسع من اللازم. لازم [[~/.ssh]] تبقى 700 و [[authorized_keys]] 600 وملك deploy: [[sudo chmod 700 /home/deploy/.ssh && sudo chmod 600 /home/deploy/.ssh/authorized_keys]]. و [[sudo tail /var/log/auth.log]] على السيرفر بيقولك السبب ([[bad ownership or modes]]).`
        },
        {
          cmd: "passwd / deluser",
          title: "غيّر الباسورد أو امسح يوزر",
          desc: R`[[sudo passwd deploy]] بيغيّر باسورد اليوزر deploy: هيسألك الجديد مرتين، ومش هيظهر أي حاجة وانت بتكتب، وده طبيعي. من غير اسم ([[passwd]] بس) بيغيّر باسوردك انت وبيسألك القديم الأول، إنما مع sudo مش محتاج تعرف القديم.

[[deluser olduser]] بيمسح اليوزر من النظام، فمحدش يقدر يدخل بيه تاني. [[--remove-home]] بيمسح كمان فولدره [[/home/olduser]] بكل اللي فيه، ودي مالهاش رجوع. من غيرها الفولدر بيفضل، وده مفيد لو محتاج ملفاته.

قبل المسح اتأكد إن مفيش برنامج شغال باليوزر ده ([[ps -u olduser]])، وخد نسخة من أي حاجة مهمة في فولدره.`,
          example: R`sudo passwd deploy
sudo deluser --remove-home olduser`,
          try: "اعمل يوزر تجربة وامسحه.",
          flag: "danger",
          deep: {
            why: "تغيير باسوردات، ومسح يوزرز مبقاش ليهم لازمة، زي موظف ساب أو يوزر تجربة. كل يوزر زيادة على السيرفر باب زيادة.",
            how: R`[[passwd]] من غير اسم بيغيّر باسوردك انت. [[sudo passwd اسم]] بيغيّر باسورد أي يوزر، لأن root مش محتاج يعرف الباسورد القديم.

والباسوردات مش متخزنة زي ما هي. متخزنة كـ hash (بصمة) في ملف [[/etc/shadow]] اللي root بس يقدر يقراه. ولما تكتب باسورد، النظام بيعمله hash ويقارن البصمات.

[[deluser]] بيمسح اليوزر من النظام. من غير [[--remove-home]] فولدره بيفضل موجود (مفيد لو محتاج ملفاته). ومعاه بيتمسح.

قبل ما تمسح يوزر، اتأكد إن مفيش خدمة شغالة بيه ([[ps -u اسم]])، ومفيش ملفات مهمة في فولدره.`,
            when: "حد في الفريق ساب. يوزر تجربة خلص دوره. أو باسورد اتكشف ولازم يتغير.",
            mistakes: "[[--remove-home]] على يوزر في فولدره حاجات مهمة. خد باك أب الأول لو مش متأكد."
          },
          teach: R`## أمرين: باسورد جديد، ويوزر يتمسح

اتجرّبوا على كونتينر [[ubuntu:24.04]] شغال كسيرفر، كـ root، على يوزر [[deploy]] من درس adduser ويوزر تجربة اسمه [[olduser]].

---

## ١. [[sudo passwd deploy]]

[[passwd]] (من password) بيغيّر الباسورد. ومع اسم يوزر بعده بيغيّر باسورد اليوزر ده، ودي محتاجة [[sudo]]. root مش محتاج يعرف الباسورد القديم، فمش بيسأل عليه:

~~~text الناتج
New password:
Retype new password:
passwd: password updated successfully
~~~

ولا حرف بيظهر وانت بتكتب، وده عن قصد: محدش واقف وراك يعدّ الحروف. والتكرار عشان لو غلطت في حرف متتقفلش برّه:

~~~text الناتج لو الاتنين مختلفين
Sorry, passwords do not match.
passwd: Authentication token manipulation error
passwd: password unchanged
~~~

[[password unchanged]] يعني الباسورد القديم لسه شغال، جرّب تاني.

### الباسورد بيتحفظ فين؟

مش بيتحفظ زي ما هو. بيتحفظ **hash** (بصمة بتتحسب منه ومينفعش ترجع منها للباسورد) في [[/etc/shadow]]، ودي ملف root بس يقراه:

~~~text sudo grep deploy /etc/shadow (أوله بس)
deploy:$y$j9T$Vz86krcOE3MzL9vwRCq7J.$vh5...
~~~

[[$y$]] معناها نوع الـ hash اسمه yescrypt. ولما تدخل باسورد، النظام بيحسب البصمة ويقارنها باللي هنا.

---

## ٢. [[sudo deluser --remove-home olduser]]

| الحتة | معناها |
|---|---|
| [[deluser]] | امسح يوزر (سكربت أوبونتو، زي adduser) |
| [[--remove-home]] | وامسح فولدره [[/home/olduser]] بكل اللي فيه، ومفيش رجوع |
| [[olduser]] | اليوزر |

~~~text الناتج
info: Looking for files to backup/remove ...
info: Removing files ...
info: Removing crontab ...
info: Removing user $__btolduser' ...
~~~

بيمسح فولدره، والـ crontab بتاعه (مهامه المجدولة)، وبعدين اليوزر نفسه. ونتأكد:

~~~text الناتج
$ id olduser
id: 'olduser': no such user
$ ls /home
deploy  ubuntu
~~~

### لو اليوزر لسه شغال بيه حاجة

شغّلت عملية [[sleep]] باليوزر ده، وجربت أمسحه:

~~~text الناتج
info: Removing files ...
info: Removing crontab ...
info: Removing user $__btolduser' ...
userdel: user olduser is currently used by process 880
fatal: $__bt/usr/sbin/userdel olduser' returned error code 8. Exiting.
~~~

خد بالك من الترتيب: **الملفات اتمسحت الأول**، وبعدين مسح اليوزر هو اللي فشل. يعني الفولدر راح واليوزر لسه موجود. عشان كده اسأل قبل ما تمسح:

~~~bash
ps -u olduser
~~~

~~~text الناتج
    PID TTY          TIME CMD
    741 ?        00:00:00 systemd
    742 ?        00:00:00 (sd-pam)
    749 ?        00:00:00 sleep
~~~

[[-u]] يعني عمليات اليوزر ده. لو فيه حاجة، [[sudo pkill -u olduser]] بيقفلها كلها، وبعدين امسح.

> في صورة أوبونتو المتصغّرة (زي كونتينر Docker) [[--remove-home]] بيطلب باكدج [[perl]] الأول. على VPS عادي perl موجود.

---

## الخلاصة

~~~text
sudo passwd اسم                    باسورد جديد ليوزر (مرتين، ومش بيظهر)
passwd                             باسوردك انت (بيسأل القديم الأول)
ps -u اسم                          فيه حاجة شغالة بيه؟
sudo deluser اسم                   امسح اليوزر وسيب فولدره
sudo deluser --remove-home اسم     امسحه وامسح فولدره (مفيش رجوع)
~~~`,
          lines: ["غيّر باسورد deploy (هيسألك الجديد مرتين).", "امسح يوزر olduser وفولدره كله."],
          sol: R`[[sudo adduser testuser]] بعدين [[sudo deluser --remove-home testuser]] بيطبع [[info: Removing files ...]] و [[info: Removing crontab ...]] و [[info: Removing user 'testuser' ...]]. وبعدها [[id testuser]] بيطبع [[no such user]]، و [[ls /home]] مابقاش فيه الفولدر. جربتها بالظبط.

و [[sudo passwd deploy]] بيسأل الباسورد الجديد مرتين ويطبع [[passwd: password updated successfully]].

الغلط الشائع: [[userdel: user testuser is currently used by process 1234]]: فيه جلسة أو عملية شغالة باليوزر ده، اقفلها الأول ([[sudo pkill -u testuser]]). و [[deluser]] من غير [[--remove-home]] بيسيب الفولدر وملفاته.`
        }
      ]
    },
    {
      t: "تأمين SSH",
      l: 2,
      n: "أول حاجة بتتهاجم في أي سيرفر جديد",
      items: [
        {
          cmd: "sshd_config",
          title: "اقفل الدخول بـ root والباسورد",
          desc: "قبل ما تقفل: اتأكد إنك بتدخل بالمفتاح باليوزر الجديد، وسيب نافذة ssh الحالية مفتوحة لحد ما تجرب الدخول من نافذة جديدة، وإلا ممكن تقفل على نفسك. [[sshd -t]] يختبر الملف، و [[sshd -T]] يوريك الإعدادات اللي اتطبقت فعلًا. لو التغيير مأثرش، بص في [[/etc/ssh/sshd_config.d/]]، لأن في سيرفرات فيها ملف هناك (زي [[50-cloud-init.conf]]) بيغطي على إعدادك، فالأضمن تكتب السطرين في ملف [[00-hardening.conf]] جوه الفولدر ده. وعلى أوبونتو 24.04 لو غيّرت [[Port]]: الاستماع بقى على [[ssh.socket]]، فلازم [[sudo systemctl daemon-reload]] وبعدين [[sudo systemctl restart ssh.socket]]، وافتح البورت الجديد في ufw قبلها.",
          example: R`sudo nano /etc/ssh/sshd_config
# عدّل السطرين دول:
# PermitRootLogin no
# PasswordAuthentication no
ls /etc/ssh/sshd_config.d/
sudo sshd -t
sudo systemctl restart ssh
sudo sshd -T | grep -Ei "permitrootlogin|passwordauthentication"`,
          try: "على سيرفر التجربة بس: اقفل root، وجرب [[ssh root@IP]] من نافذة جديدة (المفروض يرفض)، و [[ssh deploy@IP]] (المفروض يدخل).",
          flag: "danger",
          deep: {
            why: "أول ما سيرفر جديد يطلع على النت، في خلال دقايق بتبدأ بوتات تجرّب تدخل عليه بباسوردات مشهورة، وأغلبها بتجرّب اليوزر root. لو قفلت الدخول بالباسورد وبـ root، البوتات دي مالهاش أي فرصة.",
            how: R`[[sshd]] هو البرنامج اللي على السيرفر بيستقبل اتصالات SSH (الـ d في الآخر معناها daemon، يعني خدمة شغالة في الخلفية). وإعداداته في [[/etc/ssh/sshd_config]].

السطرين المهمين: [[PermitRootLogin no]]، يعني محدش يدخل كـ root مباشرة، حتى بمفتاح. هتدخل بيوزرك وتستخدم sudo. و [[PasswordAuthentication no]]، يعني الدخول بالمفاتيح بس، فحتى لو حد عرف باسوردك مش هيقدر يدخل.

والسطر اللي بيبدأ بـ [[#]] يبقى متعطل، فلازم تشيل الـ [[#]].

وفيه فخ: فولدر [[sshd_config.d]] ملفاته بتتقرا الأول، لأن أول سطر في الملف الأساسي [[Include /etc/ssh/sshd_config.d/*.conf]]، و sshd بياخد أول قيمة يلاقيها لكل إعداد، فأي ملف هناك بيغطي على اللي كتبته. بعض شركات الاستضافة بتحط فيه ملف بيشغّل الباسورد تاني. عشان كده [[sshd -T]] مهم: بيوريك الإعدادات الفعلية بعد ما كل الملفات اتقرت.

[[sshd -t]] بيختبر الملف قبل الريستارت. لو فيه غلطة وعملت ريستارت، sshd ممكن ميقومش، ومحدش هيقدر يدخل.`,
            when: "مرة واحدة، بعد ما تتأكد إن يوزرك الجديد بيدخل بالمفتاح.",
            mistakes: "أخطر غلطة في الـ VPS كله: تقفل الباسورد قبل ما مفتاحك يشتغل، أو تقفل نافذتك الوحيدة قبل ما تجرّب. خطوات الأمان: نافذة مفتوحة دايمًا، وجرّب من نافذة جديدة، وبعدين اقفل. ولو اتقفلت برّه، أغلب شركات الاستضافة عندها «console» من موقعها بتدخلك من غير SSH."
          },
          teach: R`## عدّل، شوف مين بيغطي عليك، اختبر، طبّق، اتأكد

اتجرّب كله على كونتينر [[ubuntu:24.04]] فيه systemd و openssh-server شغال كسيرفر على [[203.0.113.10]]، ولابتوب في كونتينر تاني بمفتاح تجربة. واليوزر [[deploy]] كان بيدخل بالمفتاح قبل ما نبدأ (الدرس اللي فات)، ونافذة root مفتوحة.

---

## ١. [[sudo nano /etc/ssh/sshd_config]]

[[nano]] محرر بسيط: تكتب على طول، و Ctrl+O تحفظ (O من output) و Enter، و Ctrl+X تخرج. و [[sudo]] لأن الملف ملك root.

[[sshd]] اسم البرنامج اللي بيستقبل اتصالات ssh على السيرفر ([[d]] من daemon: برنامج شغال في الخلفية). و [[_config]] إعداداته. هتلاقي السطرين دول كده:

~~~text قبل التعديل (برقم السطر)
42:#PermitRootLogin prohibit-password
66:#PasswordAuthentication yes
~~~

الـ [[#]] في أول السطر معناها «متعطل، ده مجرد تذكير بالقيمة الافتراضية». فبتشيل الـ [[#]] وتغيّر القيمة:

~~~text بعد التعديل
42:PermitRootLogin no
66:PasswordAuthentication no
~~~

| الإعداد | القيمة | معناها |
|---|---|---|
| [[PermitRootLogin]] | [[no]] | ممنوع حد يدخل كـ root مباشرة، حتى بمفتاح |
| [[PasswordAuthentication]] | [[no]] | الدخول بالمفاتيح بس، الباسورد مرفوض |

[[prohibit-password]] (الافتراضي) كانت معناها «root يدخل بمفتاح بس».

---

## ٢. [[ls /etc/ssh/sshd_config.d/]]

السطر ١٢ في الملف نفسه:

~~~text
12:Include /etc/ssh/sshd_config.d/*.conf
~~~

[[Include]] معناها «اقرا كل ملفات [[.conf]] في الفولدر ده **هنا**»، يعني قبل سطر ٤٢ وسطر ٦٦. و sshd بياخد **أول قيمة** يلاقيها لكل إعداد. فلو فيه ملف هناك بيقول [[PasswordAuthentication yes]]، هو اللي هيكسب.

جربت ده: عملت ملف [[50-cloud-init.conf]] (ده اسم الملف اللي سيرفرات cloud كتير بتيجي بيه) فيه [[PasswordAuthentication yes]]:

~~~text الناتج
50-cloud-init.conf
passwordauthentication yes        مع إن الملف الأساسي بيقول no
~~~

الحل الأضمن: اكتب السطرين في ملف اسمه بيبدأ بـ [[00-]]، لأن الملفات بتتقرا بالترتيب الأبجدي فبيتقرا الأول:

~~~text sshd_config.d/00-hardening.conf
PermitRootLogin no
PasswordAuthentication no
~~~

~~~text الناتج بعد إضافته
00-hardening.conf
50-cloud-init.conf
permitrootlogin no
passwordauthentication no
~~~

---

## ٣. [[sudo sshd -t]]

[[-t]] من test: اقرا الإعدادات كلها واتأكد إنها سليمة، **من غير** ما تطبّق حاجة. لو سليمة مش بيطبع حاجة. ولو فيه غلطة بيقولك فين:

~~~text قيمة غلط
/etc/ssh/sshd_config line 132: unsupported option "nope".
~~~

~~~text اسم إعداد غلط في ملف جوه sshd_config.d
/etc/ssh/sshd_config.d/x.conf: line 1: Bad configuration option: PermitRotLogin
/etc/ssh/sshd_config.d/x.conf: terminating, 1 bad configuration options
~~~

ليه ده مهم؟ لو عملت restart بملف بايظ، sshd مش هيقوم، ومحدش هيعرف يدخل السيرفر تاني.

---

## ٤. [[sudo systemctl restart ssh]]

[[systemctl]] أداة systemd اللي بتدير الخدمات، و [[restart]] اقفل الخدمة وشغّلها تاني، و [[ssh]] اسم الخدمة على أوبونتو. مش بيطبع حاجة لو نجح. والاتصالات المفتوحة دلوقتي (نافذتك) مش بتتقطع، الإعدادات الجديدة بتتطبق على الاتصالات الجديدة بس.

---

## ٥. [[sudo sshd -T | grep -Ei "permitrootlogin|passwordauthentication"]]

من جوه لبرة:

| الحتة | معناها |
|---|---|
| [[sshd -T]] | T كابيتال: اطبع **كل** الإعدادات الفعلية بعد ما كل الملفات اتقرت (أكتر من ١٠٠ سطر، بحروف صغيرة) |
| [[|]] | ابعت الناتج للأمر اللي بعدي |
| [[grep]] | سيب السطور اللي فيها الكلام ده بس |
| [[-E]] | extended: عشان [[|]] جوه الكلام تبقى «أو» |
| [[-i]] | متفرّقش بين الحروف الكبيرة والصغيرة |

~~~text قبل التعديل
permitrootlogin without-password
passwordauthentication yes
~~~

~~~text بعد التعديل
permitrootlogin no
passwordauthentication no
~~~

[[without-password]] اسم قديم لـ [[prohibit-password]]، نفس المعنى.

---

## الاختبار الحقيقي: من نافذة جديدة

من اللابتوب:

~~~text الناتج
$ ssh root@203.0.113.10
root@203.0.113.10: Permission denied (publickey).
$ ssh deploy@203.0.113.10
deploy@my-server:~$                     دخل
$ ssh -o PubkeyAuthentication=no deploy@203.0.113.10
deploy@203.0.113.10: Permission denied (publickey).
~~~

في الأخير قفلت المفتاح عمدًا ([[-o PubkeyAuthentication=no]]) عشان أجرّب الباسورد: مرفوض، والرسالة بتقول [[(publickey)]] بس، يعني السيرفر مبقاش بيعرض الباسورد أصلًا. قبل التعديل كانت [[(publickey,password)]].

---

## الخلاصة

| الخطوة | الأمر | لو نجح |
|---|---|---|
| ١ | عدّل [[sshd_config]] (أو ملف [[00-hardening.conf]]) | |
| ٢ | [[ls /etc/ssh/sshd_config.d/]] | تعرف مين ممكن يغطي عليك |
| ٣ | [[sudo sshd -t]] | مفيش ناتج |
| ٤ | [[sudo systemctl restart ssh]] | مفيش ناتج |
| ٥ | [[sudo sshd -T | grep ...]] | [[no]] و [[no]] |
| ٦ | من نافذة جديدة: root يترفض و deploy يدخل | |

> على أوبونتو 24.04 الاستماع على البورت بقى من [[ssh.socket]]: لو غيّرت [[Port]] لازم [[sudo systemctl daemon-reload]] وبعدين [[sudo systemctl restart ssh.socket]] (من دليل أوبونتو، ومجرّبتهوش هنا).`,
          lines: [
            "افتح ملف إعدادات SSH تعدّله.",
            "شوف فيه ملفات إضافية ممكن تغطي على إعداداتك ولا لأ.",
            "اختبر الملف ([[-t]] من test). لو مطبعش حاجة يبقى سليم.",
            "طبّق الإعدادات بريستارت لخدمة ssh.",
            "اعرض الإعدادات الفعلية ([[-T]] كابيتال)، وسيب بس السطرين المهمين. [[-E]] عشان [[|]] تبقى «أو»، و [[-i]] من غير فرق بين الحروف."
          ],
          sol: R`[[sudo sshd -t]] مابيطبعش حاجة لو الملف سليم. و [[sudo sshd -T | grep -Ei "permitrootlogin|passwordauthentication"]] بعد التعديل بيطبع [[permitrootlogin no]] و [[passwordauthentication no]]. (قبل التعديل على أوبونتو بيبقى [[permitrootlogin without-password]].)

من نافذة جديدة: [[ssh root@IP]] بيطلع [[Permission denied (publickey)]]، و [[ssh deploy@IP]] بيدخل عادي. سيب النافذة القديمة مفتوحة لحد ما تتأكد.

الغلط الشائع: [[sshd -T]] لسه بيقول [[passwordauthentication yes]] مع إنك غيرته: فيه ملف في [[/etc/ssh/sshd_config.d/]] (زي [[50-cloud-init.conf]]) بيقول yes، و sshd بياخد أول قيمة يلاقيها، والـ Include في أول الملف. جربتها: Include فيه yes قبل سطر no، والنتيجة yes. عدّل الملف ده. ولو كتبت قيمة غلط، [[sshd -t]] بيقول [[unsupported option]] ورقم السطر.`
        }
      ]
    }
]);

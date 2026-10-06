// تكملة تاب zsh: الأقسام دي بتتضاف للتاب اللي اتعرّف في js/tabs/zsh/01.js (شرح حقول الدرس في أوله)
MORE("zsh", [
    {
      t: "شكّل zsh بتاعك",
      l: 2,
      n: "الـ prompt بإيدك من غير إضافات، وبعدين ثيمات جاهزة من Oh My Zsh و Powerlevel10k",
      items: [
        {
          cmd: "PROMPT",
          title: "اكتب الـ prompt بتاعك بإيدك",
          desc: R`الـ prompt هو النص اللي zsh بيطبعه قبل كل أمر (زي [[sara shop %]])، وشكله متخزن في متغير اسمه [[PROMPT]] (نفس دور [[PS1]] في bash). بتكتب فيه نص عادي ورموز بتبدأ بـ [[%]]، و zsh بيبدّل كل رمز بقيمته كل مرة يطبع السطر: اسمك، والفولدر، والساعة، وكمان اسم الـ git branch.

الرموز الأساسية:
• [[%n]] اسم اليوزر، و [[%m]] اسم الجهاز لحد أول نقطة (على الماك حاجة زي [[Saras-MacBook-Pro]])، و [[%M]] الاسم كامل.
• [[%~]] الفولدر الحالي بمساره، والـ home بيتكتب [[~]]. و [[%1~]] آخر جزء بس (اسم الفولدر)، و [[%2~]] آخر جزئين.
• [[%#]] بتطلع [[%]] لو انت يوزر عادي و [[#]] لو انت root، فتعرف من شكل السطر إنك شغال بصلاحيات كاملة.
• [[%T]] الساعة بنظام 24 ([[14:05]])، و [[%*]] نفس الساعة بالثواني، و [[%D]] التاريخ بشكل سنة-شهر-يوم ([[26-10-02]]).

الألوان: [[%F{green}]] بتبدأ لون للكلام اللي بعدها، و [[%f]] بترجّع اللون العادي. اللون بالاسم ([[black]] و [[red]] و [[green]] و [[yellow]] و [[blue]] و [[magenta]] و [[cyan]] و [[white]]) أو برقم من 0 لـ 255 لو الترمنال بيدعم 256 لون، زي [[%F{240}]] رمادي. و [[%B]] بتبدأ خط عريض و [[%b]] بتقفله. لو نسيت [[%f]] أو [[%b]] اللون هيكمّل على الأمر اللي بتكتبه.

[[RPROMPT]] prompt تاني بيظهر على يمين نفس السطر، وبيختفي لوحده لو الأمر اللي بتكتبه طوّل ووصل له. مكان مناسب للساعة.

اسم الـ branch: zsh جاي معاه أداة اسمها [[vcs_info]] بتعرف انت جوه repo ولا لأ. [[autoload -Uz vcs_info]] بتحمّلها (شرح autoload في مستوى ٣). [[precmd() { vcs_info }]] بتعرّف function اسمها [[precmd]]: الاسم وبعده [[()]]، والجسم بين [[{ }]]. والاسم ده خاص: zsh بيشغّلها قبل ما يطبع كل prompt، فاسم الـ branch بيتحدّث بعد كل أمر. [[zstyle ':vcs_info:git:*' formats '%F{yellow}(%b)%f ']] بتحدد شكل الناتج: [[':vcs_info:git:*']] معناها «الإعداد ده لـ vcs_info جوه repo بتاع git»، و [[%b]] جوه formats معناها اسم الـ branch (مش bold هنا، دي رموز vcs_info نفسها). والناتج بيتحط في متغير اسمه [[vcs_info_msg_0_]]، وبيبقى فاضي برّه أي repo.

[[setopt prompt_subst]] بتخلي zsh يفك المتغيرات جوه الـ PROMPT كل مرة يطبعه، زي [[$__{vcs_info_msg_0_}]] ([[$__{...}]] قيمة المتغير، زي [[$name]] بس بأقواس). وعشان كده الـ PROMPT بين علامات تنصيص مفردة [['...']]: المتغير بيتحفظ زي ما هو ويتفك وقت الطباعة. بعلامات مزدوجة [["..."]] الشيل بيفكه مرة واحدة وقت التعريف، والـ branch يفضل متجمّد على القديم.

[[print -P]] بتطبع نص وهي بتفك رموز الـ prompt ([[-P]] = prompt)، فتجرّب بيها أي رمز من غير ما تغيّر حاجة. وكل اللي بتكتبه في الترمنال بيروح لما تقفله: عشان يفضل، حط السطور في [[~/.zshrc]]. ولو عندك Oh My Zsh، حطها بعد سطر [[source $ZSH/oh-my-zsh.sh]] أو خلي [[ZSH_THEME=""]]، وإلا الثيم هيكتب فوق الـ PROMPT بتاعك.`,
          example: R`print -P '%n %m %~ %1~ %# %T %*'
PROMPT='%B%F{green}%n%f%b %F{blue}%1~%f %# '
RPROMPT='%F{240}%*%f'
autoload -Uz vcs_info
precmd() { vcs_info }
setopt prompt_subst
zstyle ':vcs_info:git:*' formats '%F{yellow}(%b)%f '
PROMPT='%B%F{green}%n%f%b %F{blue}%1~%f $__{vcs_info_msg_0_}%# '`,
          try: R`اعمل prompt فيه اسم الفولدر بالأزرق واسم الـ branch بالأصفر، وادخل repo واعمل [[git switch -c test]] وشوف الـ branch اتغير لوحده، واخرج لفولدر عادي وشوف القوسين اختفوا. وبعدين خليه دايم في [[~/.zshrc]].`,
          deep: {
            why: "الـ prompt بتشوفه قبل كل أمر، فلو فيه الفولدر والـ branch هتبطّل تكتب [[pwd]] و [[git status]] كل شوية عشان تعرف انت فين. ولما تكتبه بإيدك من غير إضافات، الترمنال بيفتح بسرعة وانت فاهم كل حرف فيه وتعرف تصلّحه.",
            how: R`قبل كل سطر zsh بيشغّل [[precmd]]، وبعدين يقرا [[PROMPT]] ويبدّل كل رمز [[%]] بقيمته، ولو [[prompt_subst]] شغالة بيفك كمان [[$...]] و [[$(...)]] جواه. عشان كده vcs_info بيلحق يحط اسم الـ branch في [[vcs_info_msg_0_]] قبل الطباعة.

رموز تانية مفيدة: [[%?]] الـ exit code بتاع آخر أمر، و [[%(?.ok.fail)]] شرط: لو آخر أمر نجح اطبع [[ok]] وإلا [[fail]]. فـ [[%(?.%F{green}.%F{red})%#%f]] بتخلي علامة [[%]] خضرا وتقلب حمرا لما أمر يفشل. و [[%K{blue}]] لون خلفية و [[%k]] بتقفله. و [[setopt transient_rprompt]] بتشيل الـ RPROMPT من السطور القديمة بعد Enter، فالنسخ من الترمنال يبقى أنضف.

جوه formats بتاع vcs_info: [[%b]] الـ branch، و [[%r]] اسم الـ repo، و [[%s]] نوع الـ VCS ([[git]]). ولو عايزه يعلّم على التعديلات: [[zstyle ':vcs_info:*' check-for-changes true]] وبعدها [[%u]] بتطلع [[U]] لو فيه تعديلات مش staged و [[%c]] بتطلع [[S]] لو فيه staged. ده بيخلي الـ prompt أبطأ في repo ضخم.`,
            when: "أول ما تتعود على الترمنال وتعرف انت عايز تشوف إيه قدامك. ولو عايز شكل جاهز بأيقونات وألوان كتير من غير ما تكتب حاجة، شوف الدرس الجاي.",
            mistakes: R`تكتب الـ PROMPT بعلامات تنصيص مزدوجة فالـ branch يتجمّد على اللي كان وقت التعريف، أو تنسى [[setopt prompt_subst]] فيظهر [[$__{vcs_info_msg_0_}]] مكتوب بالنص. وتنسى [[%f]] أو [[%b]] فاللون يسيح على كل اللي بتكتبه. وتحط الـ PROMPT في [[~/.zshrc]] قبل سطر Oh My Zsh فالثيم يمسحه. ولو أداة تانية معرّفة [[precmd]] قبلك، تعريف جديد بنفس الاسم بيمسح بتاعها: الأأمن [[autoload -Uz add-zsh-hook]] وبعدها [[add-zsh-hook precmd vcs_info]]، دي بتضيف من غير ما تمسح.`
          },
          teach: R`## متغير واحد اسمه PROMPT، فيه نص ورموز

الـ prompt مش حاجة سحرية: zsh قبل كل أمر بيقرا متغير اسمه [[PROMPT]]، ويبدّل كل رمز بيبدأ بـ [[%]] بقيمته، ويطبع الناتج. المثال ٨ سطور: نجرّب الرموز، ونبني prompt بسيط، وبعدين نضيف اسم الـ branch. كل الناتج اتشغّل في zsh 5.9 على أوبونتو 24.04 (Docker) كيوزر [[sara]] والجهاز اسمه [[sara-mbp.local]]، والرموز هي هي على الماك.

---

## ١. [[print -P '%n %m %~ %1~ %# %T %*']]

[[print]] أمر zsh بيطبع زي [[echo]]، و [[-P]] (من prompt) بتخليه يفك رموز الـ prompt. فبتجرّب أي رمز من غير ما تغيّر حاجة. العلامات المفردة بتمنع الشيل يلمس النص قبل print. من جوه [[~/projects/shop]]:

~~~zsh
print -P '%n %m %~ %1~ %# %T %*'
~~~

~~~text الناتج
sara sara-mbp ~/projects/shop shop % 9:31 9:31:43
~~~

| الرمز | طلع | معناه |
|---|---|---|
| [[%n]] | [[sara]] | اسم اليوزر (n من name) |
| [[%m]] | [[sara-mbp]] | اسم الجهاز لحد أول نقطة (m من machine). [[%M]] طلع الكامل [[sara-mbp.local]] |
| [[%~]] | [[~/projects/shop]] | الفولدر الحالي، والـ home مكتوب [[~]] |
| [[%1~]] | [[shop]] | آخر جزء واحد بس من المسار. [[%2~]] طلع [[projects/shop]] |
| [[%#]] | [[%]] | [[%]] ليوزر عادي و [[#]] لـ root |
| [[%T]] | [[9:31]] | الساعة بنظام ٢٤ |
| [[%*]] | [[9:31:43]] | الساعة بالثواني |

---

## ٢. [[PROMPT='%B%F{green}%n%f%b %F{blue}%1~%f %# ']]

هنا بنحط قيمة في المتغير. [[=]] من غير مسافات حواليها (لو حطيت مسافة الشيل هيفتكر [[PROMPT]] أمر). نقرا القيمة حتة حتة:

| الحتة | معناها |
|---|---|
| [[%B]] | ابدأ خط عريض (Bold) |
| [[%F{green}]] | ابدأ لون الكلام (Foreground) أخضر |
| [[%n]] | اسمك |
| [[%f]] | ارجع للون العادي |
| [[%b]] | اقفل العريض |
| مسافة | مسافة عادية |
| [[%F{blue}%1~%f]] | اسم الفولدر بالأزرق، وبعدين رجوع للون العادي |
| [[ %# ]] | مسافة، و [[%]]، ومسافة قبل ما تكتب |

كل رمز بيفتح حاجة ليه رمز بيقفلها (صغير بدل كبير). جربت أطبع القيمة بـ [[print -P "$PROMPT" | cat -v]] ([[cat -v]] بيعرض أكواد الألوان المخفية كنص):

~~~text الناتج
^[[1m^[[32msara^[[39m^[[0m ^[[34mshop^[[39m %
~~~

دي أكواد الترمنال: [[1m]] عريض، و [[32m]] أخضر، و [[34m]] أزرق، و [[39m]] لون عادي، و [[0m]] رجّع كل حاجة. يعني zsh ترجم [[%F{green}]] لكود الترمنال بتاعه. والـ prompt اللي هتشوفه: **sara** shop % بالألوان.

---

## ٣. [[RPROMPT='%F{240}%*%f']]

[[RPROMPT]] (R من right) prompt على يمين نفس السطر. [[240]] رقم لون من ٢٥٦ لون (رمادي). جربته في ترمنال بيدعم ٢٥٦ لون ([[TERM=xterm-256color]]) فطلع الكود [[38;5;240]]، وفي ترمنال ٨ ألوان بس zsh اتجاهل اللون وطبع الساعة عادي. Terminal و iTerm2 على الماك بيدعموا ٢٥٦.

---

## ٤ لـ ٨: اسم الـ branch

### ٤. [[autoload -Uz vcs_info]]

[[vcs_info]] function جاية مع zsh بتعرف انت جوه repo (git أو غيره) ولا لأ. [[autoload]] بتسجّل اسمها وتحمّلها أول ما تتنادي. [[-U]] متستخدمش الـ aliases وانت بتحمّلها، و [[-z]] حمّلها بطريقة zsh العادية.

### ٥. [[precmd() { vcs_info }]]

تعريف function: الاسم، و [[()]]، والجسم بين [[{ }]]. اسم [[precmd]] محجوز: zsh بيشغّلها لوحده قبل ما يطبع كل prompt. فـ vcs_info بتشتغل بعد كل أمر وتجيب اسم الـ branch الجديد.

### ٦. [[setopt prompt_subst]]

[[setopt]] بتشغّل option. [[prompt_subst]] بتقول لـ zsh: «وانت بتطبع الـ PROMPT، فك المتغيرات اللي جواه كمان»، مش رموز [[%]] بس.

### ٧. [[zstyle ':vcs_info:git:*' formats '%F{yellow}(%b)%f ']]

[[zstyle]] أداة إعدادات. [[':vcs_info:git:*']] معناها «الإعداد ده لـ vcs_info لما يكون repo بتاع git»، و [[formats]] اسم الإعداد، والقيمة هي الشكل: [[%b]] هنا معناها اسم الـ branch (رموز vcs_info نفسها، مش bold). النتيجة بتتحط في متغير اسمه [[vcs_info_msg_0_]]. جربت أشغّل precmd بإيدي وأطبع المتغير:

~~~text الناتج
msg=[%F{yellow}(main)%f ]
~~~

يعني المتغير شايل الشكل برموزه، والـ PROMPT هو اللي هيترجم الألوان.

### ٨. [[PROMPT='... $__{vcs_info_msg_0_}%# ']]

نفس الـ prompt بتاع سطر ٢، وقبل [[%#]] [[$__{vcs_info_msg_0_}]]: [[$__{...}]] قيمة المتغير، زي [[$name]] بس الأقواس بتحدد الاسم بالظبط. والعلامات **مفردة** عشان المتغير يتحفظ كنص ويتفك وقت الطباعة، كل مرة. الناتج (من غير ألوان):

~~~text الناتج
shop (main) %
shop (test) %
~ %
~~~

السطر الأول على main، والتاني بعد [[git switch -c test]]، والتالت في الـ home (مش repo) فالمتغير فاضي والقوسين اختفوا.

---

## الخلاصة

| السطر | دوره |
|---|---|
| [[print -P '...']] | جرّب رموز من غير ما تغيّر حاجة |
| [[PROMPT='...']] | الـ prompt الشمال |
| [[RPROMPT='...']] | الـ prompt اليمين |
| [[autoload -Uz vcs_info]] | حمّل أداة معلومات الـ repo |
| [[precmd() { vcs_info }]] | حدّثها قبل كل prompt |
| [[setopt prompt_subst]] | اسمح بالمتغيرات جوه الـ PROMPT |
| [[zstyle ... formats ...]] | شكل اسم الـ branch |

وكل ده بيروح لما تقفل الترمنال، إلا لو حطيته في [[~/.zshrc]].`,
          lines: [
            "جرّب الرموز من غير ما تغيّر حاجة: اسمك، والجهاز، والمسار، واسم الفولدر، و [[%]]، والساعة مرتين (من غير وبالثواني).",
            "prompt جديد: اسمك عريض بالأخضر، واسم الفولدر بالأزرق، وبعدين [[%]] ومسافة. بيتطبق من السطر الجاي على طول.",
            "الساعة بالثواني على يمين السطر بلون رمادي (240 من الـ 256 لون).",
            "حمّل vcs_info اللي جاي مع zsh.",
            "function بتشتغل قبل كل prompt وبتحدّث معلومات الـ repo.",
            "اسمح بفك المتغيرات جوه الـ PROMPT كل مرة يتطبع.",
            "شكل معلومة git: اسم الـ branch بين قوسين بالأصفر وبعده مسافة.",
            "الـ prompt النهائي ومعاه الـ branch. العلامات المفردة هي اللي بتخلي الـ branch يتحدّث."
          ],
          sol: R`جربت المثال ده بالحرف في zsh 5.9 على لينكس (الرموز نفسها على الماك)، كيوزر اسمه sara والجهاز اسمه [[sara-mbp.local]]: أول سطر طبع [[sara sara-mbp ~/projects/shop shop % 10:26 10:26:47]]. جوه repo على main الـ prompt بقى [[sara shop (main) %]] بالألوان، وعلى اليمين الساعة بالثواني. بعد [[git switch -c test]] الأمر اللي بعده طلع [[sara shop (test) %]] لوحده، وفي فولدر مش repo طلع [[sara Downloads %]] من غير قوسين.

لو شفت [[$__{vcs_info_msg_0_}]] مكتوبة بالنص في الـ prompt، يبقى ناقص [[setopt prompt_subst]]. ولو الـ branch مش بيتغير بعد switch، يبقى الـ PROMPT متعرّف بعلامات مزدوجة أو [[precmd]] مش متعرّفة. (جربت الغلطتين في نفس الاختبار: من غير prompt_subst طلع النص زي ما هو، وبالعلامات المزدوجة فضل [[(main)]] بعد ما الـ branch اتغير.) ولما تحطهم في [[~/.zshrc]] اعمل [[source ~/.zshrc]] أو افتح ترمنال جديد.`,
          solCode: R`# في آخر ~/.zshrc (بعد سطر oh-my-zsh لو موجود)
autoload -Uz vcs_info
precmd() { vcs_info }
setopt prompt_subst
zstyle ':vcs_info:git:*' formats '%F{yellow}(%b)%f '
PROMPT='%B%F{green}%n%f%b %F{blue}%1~%f $__{vcs_info_msg_0_}%# '
RPROMPT='%F{240}%*%f'
# وبعدين في الترمنال
source ~/.zshrc
cd ~/projects/shop && git switch -c test`
        },
        {
          cmd: "ZSH_THEME و Powerlevel10k",
          title: "ثيمات جاهزة للـ prompt",
          desc: R`لو مش عايز تكتب الـ prompt بإيدك، Oh My Zsh جاي معاه أكتر من 140 ثيم جاهز بتختار منهم بسطر [[ZSH_THEME]] في [[~/.zshrc]]. و Powerlevel10k ثيم مشهور من برّه بيسألك كام سؤال ويبنيلك prompt فيه الـ branch وحالة git ومدة آخر أمر وأيقونات.

تسطيب Oh My Zsh نفسه في درس «Oh My Zsh» في المستوى الأول. ثيماته في [[~/.oh-my-zsh/themes]]، كل ثيم ملف اسمه [[name.zsh-theme]]، واللي بتكتبه في [[ZSH_THEME]] هو الاسم من غير الامتداد، والافتراضي [[robbyrussell]]. وفيه قيم وأوامر خاصة:
• [[ZSH_THEME="random"]] ثيم عشوائي مع كل ترمنال وبيطبع اسمه، و [[echo $RANDOM_THEME]] بتقولك هو مين.
• [[ZSH_THEME=""]] من غير ثيم خالص، لو هتكتب [[PROMPT]] بإيدك (الدرس اللي فات).
• [[omz theme use agnoster]] بتجرّب ثيم في الترمنال ده بس، و [[omz theme set agnoster]] بتكتبه في [[~/.zshrc]] بدالك وبتعمل نسخة احتياطي باسم [[~/.zshrc.bck]].

في المثال [[^]] جوه grep معناها «أول السطر»، و [[|]] بتبعت ناتج ls لـ [[wc -l]] اللي بتعد السطور، يعني عدد ملفات الثيمات.

Powerlevel10k بيتسطب كإضافة لـ Oh My Zsh: [[git clone --depth=1]] بينزّل آخر نسخة بس من غير تاريخ الـ commits كله. [[$__{ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}]] معناها «قيمة [[ZSH_CUSTOM]]، ولو مش متعرّف خد [[~/.oh-my-zsh/custom]]»، و [[:-]] هي اللي بتعمل «ولو فاضي خد دي». ده فولدر إضافاتك اللي Oh My Zsh مش بيلمسه وهو بيتحدّث. والقيمة [["powerlevel10k/powerlevel10k"]] معناها فولدر اسمه powerlevel10k وجواه ملف ثيم بنفس الاسم.

[[exec zsh]] بتبدّل الشيل الحالي بواحد جديد بيقرا [[~/.zshrc]] من الأول. أول مرة Powerlevel10k بيفتح wizard اسمه [[p10k configure]] (وتشغّله تاني في أي وقت): يسألك شايف رموز معينة ولا لأ عشان يعرف الخط بتاعك، وبعدين تختار الشكل، ويحفظ اختياراتك في [[~/.p10k.zsh]] ويضيف سطر يقراه في آخر [[~/.zshrc]].

Instant prompt من ضمن أسئلة الـ wizard: بيطبع الـ prompt فورًا وباقي [[~/.zshrc]] بيكمّل تحميل، وعشان كده بيحط block في أول الملف. أي حاجة في الـ zshrc بتسأل (باسورد أو [[y/n]]) لازم تتنقل فوق الـ block ده، لأن الإدخال تحته مقفول لحد ما التحميل يخلص.

الأيقونات محتاجة خط فيه الرموز دي (Nerd Font). Powerlevel10k بيرشّح [[MesloLGS NF]]: ٤ ملفات (Regular و Bold و Italic و Bold Italic) من صفحته على GitHub، تسطّبهم بدبل كليك وتختار الخط في إعدادات الترمنال (Terminal أو iTerm2 أو VS Code). في iTerm2، [[p10k configure]] بيعرض يسطّبه لوحده. ومن غيره هتشوف مربعات مكان الأيقونات (درس «Nerd Font» في تاب اختصارات النظام بيشرح الخطوط دي).

خد بالك: صفحة Powerlevel10k على GitHub مكتوب في أولها إن دعم المشروع محدود جدًا: مفيش features جديدة، ومعظم الـ bugs مش هتتصلح، وأسئلة المساعدة مش هيترد عليها. لسه شغال وناس كتير بتستخدمه، بس انت بتعتمد على حاجة مش بتتطور.`,
          example: R`grep '^ZSH_THEME' ~/.zshrc
ls ~/.oh-my-zsh/themes | wc -l
omz theme use agnoster
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "$__{ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"
omz theme set powerlevel10k/powerlevel10k
exec zsh
p10k configure`,
          try: R`جرّب ٣ ثيمات بـ [[omz theme use]] (مثلًا agnoster و af-magic و ys) وشوف الفرق. وبعدين سطّب MesloLGS NF وظبطه في الترمنال، وسطّب Powerlevel10k وكمّل [[p10k configure]] لحد الآخر.`,
          deep: {
            why: "الثيم بيوفّرلك وقت تظبيط: الـ branch وحالة git ونسخة Node أو Python والوقت بشكل مقروء من أول يوم. و Powerlevel10k بيجيب حالة git ببرنامج صغير شغال في الخلفية (gitstatus)، فالـ prompt بيفضل سريع حتى في repo كبير.",
            how: R`Oh My Zsh وهو بيحمّل بيدوّر على الثيم في [[$ZSH_CUSTOM/themes]] الأول وبعدين في [[~/.oh-my-zsh/themes]]. فلو نسخت ثيم جاهز لـ custom وعدّلته، نسختك هي اللي بتتحمل ومش بتتمسح مع التحديث. وملف الثيم نفسه zsh عادي بيعرّف [[PROMPT]] و [[RPROMPT]] بنفس الرموز اللي في الدرس اللي فات.

Powerlevel10k بيكتب كل إعداداته في [[~/.p10k.zsh]] (ملف طويل وفيه شرح لكل جزء)، فتقدر تعدّل بإيدك: مثلًا تدوّر على [[POWERLEVEL9K_LEFT_PROMPT_ELEMENTS]] وتشيل أو تضيف عناصر. ونفس الملف فيه [[POWERLEVEL9K_INSTANT_PROMPT]]: [[verbose]] بيحذرك لو حاجة طبعت وقت التحميل، و [[quiet]] بيسكت التحذير، و [[off]] بيقفل الـ instant prompt خالص.

ولو عايز بديل مش مربوط بـ zsh: Starship، prompt واحد بيشتغل في zsh و bash و PowerShell بنفس ملف الإعدادات، ومحتاج Nerd Font برضه.`,
            when: "لو عايز prompt مرتب بسرعة ومش فارق معاك تفهم كل رمز. ولو بتحب تتحكم في كل حرف، الدرس اللي فات أخف وأسرع.",
            mistakes: R`تسطّب Powerlevel10k والخط مش متظبط في الترمنال، فالـ wizard يعرض رموز مكسورة وتختار إجابات غلط: ظبط الخط الأول. وتكتب [[PROMPT]] بتاعك في [[~/.zshrc]] وفيه ثيم شغال، فواحد يكتب فوق التاني. وتسيب سطر بيسأل باسورد تحت block الـ instant prompt، فالترمنال يبان واقف. وتكتب [[ZSH_THEME="powerlevel10k"]] من غير [[/powerlevel10k]] فيطلع [[[oh-my-zsh] theme 'powerlevel10k' not found]].`
          },
          teach: R`## الثيم = ملف بيعرّف PROMPT بدالك

الدرس اللي فات كتبنا [[PROMPT]] بإيدنا. الثيم ملف zsh جاهز بيعمل نفس الحاجة، و Oh My Zsh بيحمّله حسب سطر [[ZSH_THEME]]. المثال: نعرف الثيم الحالي، ونعدّ الثيمات، ونجرّب واحد، وبعدين نسطّب Powerlevel10k. السطور من ١ لـ ٥ اتشغّلت في zsh 5.9 على أوبونتو 24.04 (Docker) فيه Oh My Zsh، والـ wizard بتاع آخر سطر تفاعلي فمكتوب من صفحة المشروع.

---

## ١. [[grep '^ZSH_THEME' ~/.zshrc]]

[[grep]] بيطبع السطور اللي فيها الكلام. و [[^]] معناها «أول السطر»، فبيمسك السطر اللي **بيبدأ** بـ ZSH_THEME بس، مش التعليقات اللي فيها الكلمة في النص:

~~~text الناتج
ZSH_THEME="robbyrussell"
~~~

---

## ٢. [[ls ~/.oh-my-zsh/themes | wc -l]]

[[ls]] بيطبع أسامي الملفات، كل اسم في سطر لما الناتج رايح لـ pipe. و [[|]] بتبعته لـ [[wc -l]] اللي بيعد السطور:

~~~text الناتج
143
~~~

يعني ١٤٣ ملف. أول ٣ منهم: [[3den.zsh-theme]] و [[Soliah.zsh-theme]] و [[adben.zsh-theme]]. اللي بتكتبه في [[ZSH_THEME]] هو الاسم من غير [[.zsh-theme]].

---

## ٣. [[omz theme use agnoster]]

[[omz]] أمر Oh My Zsh نفسه. [[theme use]] بتحمّل الثيم في الترمنال ده بس، ومش بتلمس [[~/.zshrc]]. جوه repo الـ prompt بقى (الأسهم اللي بين الأجزاء متشالة هنا):

~~~text الشكل
sara@sara-mbp  ~/projects/shop  test
~~~

بين الأجزاء دي agnoster بيحط أسهم ملونة وأيقونة branch، ودي رموز Powerline، محتاجة خط فيه الرموز دي، وإلا هتظهر مربعات فاضية. ولما الترمنال مكانش ضابط UTF-8 (أول تجربة في Docker)، agnoster طلع [[character not in range]]. ولو كتبت اسم غلط:

~~~text الناتج
omz::theme::use: nosuchtheme theme not found
~~~

---

## ٤. [[git clone --depth=1 ... "$__{ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"]]

### [[git clone URL folder]]

بينزّل repo من GitHub في الفولدر اللي بعده. و [[--depth=1]] معناها «آخر commit بس»، من غير التاريخ كله، فالتنزيل أصغر.

### المسار: [[$__{ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}]]

| الحتة | معناها |
|---|---|
| [[$__{...}]] | قيمة متغير |
| [[ZSH_CUSTOM]] | اسم المتغير: فولدر إضافاتك اللي Oh My Zsh مش بيلمسه وهو بيتحدّث |
| [[:-]] | «لو المتغير فاضي أو مش موجود، خد اللي بعدي» |
| [[$HOME/.oh-my-zsh/custom]] | القيمة البديلة |

جربت أطبعه في نفس الشيل:

~~~text الناتج
/home/sara/.oh-my-zsh/custom/themes/powerlevel10k
~~~

والـ clone طبع [[Cloning into '/home/sara/.oh-my-zsh/custom/themes/powerlevel10k'...]]. المسار كله بين علامات تنصيص عشان لو فيه مسافة ميتقسمش.

---

## ٥. [[omz theme set powerlevel10k/powerlevel10k]]

[[set]] (عكس [[use]]) بيكتب في [[~/.zshrc]] نفسه. والاسم [[powerlevel10k/powerlevel10k]] معناه: فولدر [[powerlevel10k]] (اللي عملناه في [[themes]])، وجواه ثيم بنفس الاسم.

~~~text الناتج
omz::theme::set: 'powerlevel10k/powerlevel10k' theme set correctly.
~~~

وبعدها [[grep '^ZSH_THEME' ~/.zshrc]] طلع:

~~~text الناتج
ZSH_THEME="powerlevel10k/powerlevel10k" # set by $__btomz$__bt
~~~

و [[ls ~/.zshrc*]] وراني ملف جديد [[~/.zshrc.bck]]: نسخة من الملف قبل التعديل.

---

## ٦. [[exec zsh]]

[[exec]] بتبدّل الشيل الحالي ببرنامج تاني في نفس الترمنال، من غير ما تفتح شيل جوه شيل. فـ [[exec zsh]] = zsh جديد بيقرا [[~/.zshrc]] من الأول بالثيم الجديد. (الفرق عن [[source]]: الشيل الجديد بيبدأ نضيف، من غير بواقي الثيم القديم.)

---

## ٧. [[p10k configure]] (من الـ docs)

أول مرة Powerlevel10k بيتحمّل بيفتح الـ wizard ده لوحده، و [[p10k configure]] بتفتحه تاني في أي وقت. بيسألك أسئلة بالحروف:

1. أسئلة عن رموز معينة («Does this look like a diamond?»): عشان يعرف الخط بتاعك فيه الأيقونات ولا لأ.
2. اختيار الشكل والألوان وعدد السطور.
3. Instant prompt: يطبع الـ prompt فورًا وباقي الإعداد يكمّل بعده.
4. في الآخر: يكتب اختياراتك في [[~/.p10k.zsh]] ويضيف سطر في [[~/.zshrc]] يقراه.

و [[q]] في أي سؤال بتخرج من غير ما يغيّر حاجة.

---

## الخلاصة

| عايز | الأمر |
|---|---|
| تعرف الثيم الحالي | [[grep '^ZSH_THEME' ~/.zshrc]] |
| تجرّب ثيم في الترمنال ده بس | [[omz theme use NAME]] |
| تثبّت ثيم (بيعدّل الـ zshrc ويعمل [[.zshrc.bck]]) | [[omz theme set NAME]] |
| تسطّب ثيم من برّه | [[git clone]] في [[$ZSH_CUSTOM/themes]] |
| تطبّق من الأول | [[exec zsh]] |
| تغيّر شكل Powerlevel10k | [[p10k configure]] |`,
          lines: [
            "اعرف الثيم الحالي: السطر اللي بيبدأ بـ ZSH_THEME.",
            "عدد ملفات الثيمات اللي جاية مع Oh My Zsh.",
            "جرّب agnoster في الترمنال ده بس. محتاج خط فيه رموز Powerline أو Nerd Font.",
            "نزّل Powerlevel10k في فولدر الثيمات بتاعك (custom).",
            R`اكتب [[ZSH_THEME="powerlevel10k/powerlevel10k"]] في [[~/.zshrc]] مكان القيمة القديمة.`,
            "شيل جديد بيقرا الإعداد. أول مرة الـ wizard بيفتح لوحده.",
            "افتح الـ wizard تاني في أي وقت عشان تغيّر الشكل."
          ],
          sol: R`جربت الخطوات دي في zsh 5.9 على لينكس (Docker) بنفس Oh My Zsh اللي على الماك: [[grep '^ZSH_THEME' ~/.zshrc]] طبع [[ZSH_THEME="robbyrussell"]]، و [[ls ~/.oh-my-zsh/themes | wc -l]] طبع 143 (منهم [[example.zsh-theme]]). اسم غلط في [[omz theme use]] بيطبع [[nosuchtheme theme not found]]. وبعد الـ clone، [[omz theme set powerlevel10k/powerlevel10k]] طبع [['powerlevel10k/powerlevel10k' theme set correctly.]] وغيّر السطر لـ [[ZSH_THEME="powerlevel10k/powerlevel10k" # set by $__btomz$__bt]]، و [[type p10k]] قال إنها function جاية من [[custom/themes/powerlevel10k]]، يعني الثيم اتحمّل. ومع [[ZSH_THEME="random"]] كل ترمنال جديد طبع سطر زي [[[oh-my-zsh] Random theme 'awesomepanda' loaded]].

الـ wizard نفسه تفاعلي ومكمّلتوش هنا. حسب صفحة المشروع والكود بتاعه: أول سؤال [[Does this look like a diamond (rotated square)?]] وتحته رمز. لو شايف مربع فاضي أو علامة استفهام، الخط مش متظبط: دوس [[q]] تخرج من غير ما يغيّر حاجة، وظبط MesloLGS NF في الترمنال، وارجع [[p10k configure]]. وفي الآخر بيسألك [[Apply changes to ~/.zshrc?]] وبعدها بيكتب [[~/.p10k.zsh]].`
        }
      ]
    },
    {
      t: "Homebrew",
      l: 1,
      n: "مدير البرامج بتاع الماك، زي apt في أوبونتو",
      items: [
        {
          cmd: "brew install",
          title: "سطّب Homebrew وأي أداة",
          desc: R`Homebrew هو مدير البرامج للماك، زي [[apt]] في أوبونتو: بتكتب اسم الأداة وهو ينزّلها ويسطّبها هي والحاجات اللي محتاجاها. مش بييجي مع الماك، فبتسطّبه مرة واحدة بأول سطر (من موقع brew.sh). [[curl]] بينزّل سكربت التسطيب، و [[$(...)]] بتحط اللي نزل كنص، و [[bash -c]] بتشغّل النص ده. فلاجات curl: [[-f]] يفشل لو السيرفر رد بـ error، و [[-s]] من غير شريط تقدم، و [[-S]] يطبع الخطأ لو حصل، و [[-L]] يتبع التحويلات.

في آخر التسطيب هيطبع قسم [[Next steps]] فيه أوامر بتضيف brew للـ PATH. نفّذها، وإلا [[brew]] هيقولك command not found. بعدها [[brew install]] بتاخد اسم أداة أو أكتر، و [[@24]] بعد الاسم معناها نسخة رئيسية معينة (node 24). ومتشغّلش brew بـ [[sudo]]، هو أصلًا بيرفض.`,
          example: R`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install tree htop wget
brew install node@24`,
          try: "سطّب tree و htop وجرب [[tree -L 2]].",
          deep: {
            why: "Homebrew هو مدير الـ packages للماك. مش موجود على الماك افتراضيًا، بيتسطّب مرة واحدة.",
            how: R`[[brew install node]] بيسطّب node. [[brew install git ffmpeg postgresql]] كذا package مرة واحدة.

Homebrew بيحط كل شئ في مسار واحد ([[/opt/homebrew]] على Apple Silicon، [[/usr/local]] على Intel). وبيتأكد إن مافيش package يأثر على الـ system packages بتاعة الماك.

بعد تسطيب بعض الـ packages، Homebrew بيقولك «Caveats» (تنبيهات): أحيانًا محتاج تضيف شئ للـ PATH أو تشغّل أمر معين. اقراهم دايمًا.`,
            when: "تسطيب أي أداة development على الماك.",
            mistakes: R`نسيان إن PATH بحاجة لـ Homebrew prefix. على Apple Silicon لازم تضيف [[eval "$(/opt/homebrew/bin/brew shellenv)"]] في [[.zshrc]].`
          },
          teach: R`## سطر يسطّب brew، وسطر يسطّب بيه أي حاجة

Homebrew بيشتغل على الماك وعلى لينكس كمان بنفس الأوامر. عشان كده قدرت أشغّل المثال كله فعلًا: على أوبونتو 24.04 جوه Docker، كيوزر عادي اسمه [[sara]] (Homebrew 7.0.8). الفرق الوحيد المهم إن مكان التسطيب على لينكس [[/home/linuxbrew/.linuxbrew]]، وعلى الماك [[/opt/homebrew]] (Apple Silicon) أو [[/usr/local]] (Intel)، ودي من توثيق Homebrew.

---

## ١. سطر التسطيب

~~~zsh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
~~~

نفس فكرة سطر Oh My Zsh، من جوه لبرة:

| الخطوة | الحتة | بتعمل إيه |
|---|---|---|
| ١ | [[curl -fsSL URL]] | تنزّل سكربت التسطيب وتطبعه ([[-f]] تفشل لو error، و [[-s]] من غير شريط تقدم، و [[-S]] اطبع الخطأ، و [[-L]] اتبع التحويل) |
| ٢ | [[$(...)]] | تحط السكربت اللي نزل كنص هنا |
| ٣ | [[/bin/bash -c "..."]] | تشغّل النص ده بـ bash. المسار الكامل [[/bin/bash]] عشان يشتغل بـ bash حتى لو انت في zsh |

### اللي بيطبعه

بيقول هيعمل إيه، ويطلب باسورد اليوزر بتاعك مرة (بيستخدم [[sudo]] عشان يعمل فولدر التسطيب بس)، وبعدين بينزّل. أهم جزء في الآخر:

~~~text الناتج (آخره)
==> Installation successful!
...
==> Next steps:
- Run these commands in your terminal to add Homebrew to your PATH:
    echo >> /home/sara/.zshrc
    echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv zsh)"' >> /home/sara/.zshrc
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv zsh)"
~~~

على ماك Apple Silicon نفس السطور بس المسار [[/opt/homebrew/bin/brew]].

### ليه لازم الـ Next steps؟

brew اتسطّب في فولدر مش في الـ PATH. قبلها جربت:

~~~text الناتج
zsh: command not found: brew
~~~

و [[brew shellenv zsh]] بيطبع سطور [[export]] بتظبط المتغيرات:

~~~text الناتج (أهم سطرين)
export HOMEBREW_PREFIX="/home/linuxbrew/.linuxbrew";
export PATH="/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin$__{PATH+:$PATH}";
~~~

و [[eval "$(...)"]] بينفّذ السطور دي في الشيل الحالي. السطر اللي فيه [[>> ~/.zshrc]] بيحطه في الإعدادات عشان كل ترمنال جديد يعمله لوحده. بعدها [[which brew]] طلع [[/home/linuxbrew/.linuxbrew/bin/brew]].

---

## ٢. [[brew install tree htop wget]]

[[install]] وبعدها اسم أو أكتر، مفصولين بمسافات. brew بيجيب كل باكدج **ومعاها الحاجات اللي محتاجاها** (dependencies):

~~~text الناتج (جزء)
==> Installing wget dependency: openssl@4
==> Pouring openssl@4--4.0.3.x86_64_linux.bottle.tar.gz
🍺  /home/linuxbrew/.linuxbrew/Cellar/openssl@4/4.0.3: 6,829 files, 30.2MB
...
==> Installing wget
🍺  /home/linuxbrew/.linuxbrew/Cellar/wget/1.25.0_2: 92 files, 5.2MB
==> Caveats
==> htop
htop requires root privileges to correctly display all running processes,
so you will need to run $__btsudo htop$__bt.
~~~

| الكلمة | معناها |
|---|---|
| [[dependency]] | باكدج تانية الأداة محتاجاها، بتتسطب الأول |
| [[bottle]] | نسخة متبنية جاهزة (بدل ما brew يبني من الكود) |
| [[Pouring]] | «بيصب» الـ bottle، يعني بيفكها في مكانها |
| [[Cellar]] | الفولدر اللي فيه كل باكدج بنسخها: [[Cellar/wget/1.25.0_2]] |
| [[Caveats]] | تنبيهات لازم تقراها بعد التسطيب |

جربت بعدها [[tree -L 2 -I node_modules]] في مشروع ([[-L 2]] مستويين بس، و [[-I]] تجاهل فولدر):

~~~text الناتج
.
|-- index.js
|-- notes.txt
$__bt-- src
    |-- api
    |-- app.js
    $__bt-- utils

4 directories, 3 files
~~~

---

## ٣. [[brew install node@24]]

[[@24]] جزء من اسم الباكدج: نسخة 24 الرئيسية من node. اسم [[node]] لوحده بيبقى أحدث نسخة (وقت التجربة كانت 26). التسطيب طلع:

~~~text الناتج (آخره)
==> Installing node@24
🍺  /home/linuxbrew/.linuxbrew/Cellar/node@24/24.21.0_1: 2,103 files, 105.9MB
~~~

وفي التجربة دي [[which node]] طلع [[/home/linuxbrew/.linuxbrew/bin/node]] على طول. بعض النسخ القديمة بتكون keg-only (مش بتتحط في الـ PATH عشان متتخانقش مع النسخة الأحدث)، وساعتها الـ Caveats بتقولك تضيف إيه. اقراها دايمًا.

---

## و [[sudo]]؟

متكتبش [[sudo brew]]. جربت فالـ PATH بتاع sudo مكانش فيه brew أصلًا ([[sudo: brew: command not found]])، وبالمسار الكامل رفض:

~~~text الناتج
Error: Need to download https://formulae.brew.sh/api/... but cannot as root! Run $__btbrew update$__bt without $__btsudo$__bt first then try again.
~~~

---

## الخلاصة

| الخطوة | الأمر |
|---|---|
| تسطيب brew (مرة واحدة) | سطر [[curl]] من brew.sh |
| حطه في الـ PATH | سطور Next steps ([[eval "$(... brew shellenv zsh)"]]) |
| تسطيب أدوات | [[brew install a b c]] |
| نسخة رئيسية معينة | [[brew install node@24]] |
| بعد كل تسطيب | اقرا [[Caveats]] |`,
          lines: [
            "سطّب Homebrew نفسه (مرة واحدة). بيطلب باسورد الماك.",
            "سطّب ٣ أدوات مرة واحدة.",
            "نسخة معينة من node (بعض الباكدجات بتحتاج تضيفها للـ PATH، اقرا الـ Caveats بعد التسطيب)."
          ],
          sol: R`بعد [[brew install tree htop]]، [[tree -L 2]] في فولدر مشروع بيطبع الفولدرات ومستوى واحد جواها، وفي الآخر سطر زي [[5 directories, 12 files]]. و [[htop]] بيفتح شاشة ملونة بالعمليات، q للخروج.

لو [[brew]] نفسه قال [[command not found]] بعد التسطيب، يبقى مشغّلتش السطرين اللي طبعهم في الآخر ([[eval "$(/opt/homebrew/bin/brew shellenv)"]] على Apple Silicon)، ودول بيضيفوا brew للـ PATH. على ماك Intel مكانه [[/usr/local/bin]] ومفيش المشكلة دي غالبًا. ولو [[tree]] طبع آلاف السطور، ضيف [[-I node_modules]].

(أمر التسطيب و [[brew install tree htop wget]] و [[tree -L 2]] اتجربوا على Homebrew للينكس (أوبونتو 24.04 في Docker)، وطبع في Next steps سطر [[eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv zsh)"]]. مسار [[/opt/homebrew]] بتاع الماك من توثيق Homebrew.)`
        },
        {
          cmd: "brew --cask",
          title: "برامج بواجهة",
          desc: R`Homebrew فيه نوعين: formula ودي أدوات سطر أوامر زي git و tree، و cask ودي تطبيقات بواجهة رسومية زي VS Code و Docker Desktop و Chrome. [[--cask]] بتقول لـ brew إن الاسم ده تطبيق، فهو بينزّل ملف الـ dmg أو الـ pkg بنفسه ويحط التطبيق في [[/Applications]] من غير ما تسحب وتفلت بإيدك.

الاسم في brew مش دايمًا زي اسم التطبيق: VS Code اسمه [[visual-studio-code]] و Chrome اسمه [[google-chrome]]، فدوّر الأول بـ [[brew search --cask]]. ولو التطبيق متسطب قبل كده من dmg، brew هيرفض ويقولك إنه موجود. و [[brew uninstall --cask]] بتشيله.`,
          example: R`brew install --cask visual-studio-code
brew install --cask docker-desktop`,
          try: "دوّر على تطبيق بتستخدمه بـ [[brew search --cask]] واعرف اسمه.",
          deep: {
            why: "Homebrew Cask بيسطّب تطبيقات ذات واجهة رسومية (GUI apps) زي VS Code وGoogle Chrome وDocker.",
            how: R`[[brew install --cask google-chrome]] بيسطّب Chrome. [[brew install --cask visual-studio-code docker-desktop iterm2]] كذا تطبيق.

الفرق: [[brew install]] للـ CLI tools. [[brew install --cask]] للـ GUI apps.

[[brew list --cask]] بيعرض الـ casks المسطّبة. [[brew uninstall --cask app-name]] بيشيله.

وفيه موقع [[formulae.brew.sh]] للبحث عن الـ packages.`,
            when: "تجهيز ماك جديد للتطوير. تسطيب Docker Desktop أو VS Code.",
            mistakes: "[[brew install chrome]] مش شغال. الاسم الصح [[google-chrome]] وتاخده من الـ formulae.brew.sh."
          },
          teach: R`## نفس [[brew install]]، بس لتطبيق بواجهة

الفرق كله في كلمة واحدة: [[--cask]]. من غيرها brew بيدوّر على **formula** (أداة سطر أوامر بتتبني وتتحط في [[Cellar]])، ومعاها بيدوّر على **cask** (تطبيق ماك جاهز بيتنزل من موقع الشركة ويتحط في [[/Applications]]).

> الـ casks ماك بس. جربت على Homebrew للينكس (أوبونتو 24.04 في Docker) فرفض، فشرح الماك هنا من توثيق Homebrew.

---

## ١. [[brew install --cask visual-studio-code]]

| الحتة | معناها |
|---|---|
| [[brew install]] | سطّب |
| [[--cask]] | الاسم اللي جاي تطبيق، مش أداة |
| [[visual-studio-code]] | اسم الـ cask (token): حروف صغيرة وشرطة بدل المسافة |

على الماك، حسب توثيق Homebrew، brew بينزّل ملف التطبيق (zip أو dmg أو pkg)، ويتأكد من الـ checksum بتاعه، وينقل [[Visual Studio Code.app]] لـ [[/Applications]]. يعني نفس اللي كنت هتعمله بإيدك من الموقع.

وعلى لينكس، التجربة طلعت:

~~~text الناتج على لينكس
Error: visual-studio-code: visual-studio-code: This cask requires macOS.
~~~

---

## ٢. [[brew install --cask docker-desktop]]

نفس الشكل. الاسم [[docker-desktop]] مش [[docker]]: لأن [[docker]] من غير cask اسم formula لأداة سطر الأوامر بس، من غير التطبيق ولا المحرك اللي بيشغّل الـ containers.

---

## الاسم الصح منين؟

الاسم مش دايمًا اسم التطبيق. جربت على لينكس اسم غلط من غير cask:

~~~zsh
brew install chrome
~~~

~~~text الناتج
Warning: No available formula with the name "chrome". Did you mean chroma or chrony?
==> Searching for similarly named formulae and casks...
==> Formulae
chrome-cli
chrome-devtools-mcp
...
~~~

brew بيقترح أسامي قريبة. على الماك [[brew search --cask chrome]] بيطبع تحت [[==> Casks]] أسامي زي [[google-chrome]] (من الـ docs)، وده اللي تكتبه. وفيه موقع formulae.brew.sh تدوّر فيه من المتصفح.

---

## الخلاصة

| | formula | cask |
|---|---|---|
| إيه هو | أداة سطر أوامر (git و tree و node) | تطبيق بواجهة (VS Code و Chrome و Docker Desktop) |
| الأمر | [[brew install NAME]] | [[brew install --cask NAME]] |
| بيتحط فين | [[Cellar]] جوه فولدر brew | [[/Applications]] |
| على لينكس | شغال | لأ: [[This cask requires macOS]] |
| تشيله | [[brew uninstall NAME]] | [[brew uninstall --cask NAME]] |`,
          lines: ["برنامج بواجهة (GUI) بيتسطب بـ [[--cask]].", "Docker Desktop."],
          sol: R`[[brew search --cask chrome]] مثلًا بيطبع تحت [[==> Casks]] أسامي زي [[google-chrome]] و [[google-chrome@beta]]. الاسم ده اللي تكتبه في [[brew install --cask google-chrome]]. و [[brew info --cask google-chrome]] يوريك النسخة والموقع الرسمي قبل ما تسطب.

الاسم في brew مش دايمًا زي اسم التطبيق: VS Code اسمه [[visual-studio-code]]. ولو التطبيق متسطب قبل كده من dmg، brew هيقولك إن فيه app موجود بالفعل في Applications، إما امسحه الأول أو استخدم [[--force]] وانت عارف انت بتعمل إيه.

(ده ماك بس: الأسماء ورسالة التطبيق الموجود من توثيق Homebrew، مش متجربة هنا.)`
        },
        {
          cmd: "brew upgrade",
          title: "حدّث كل حاجة",
          desc: R`Homebrew شغال بكتالوج: لستة بكل البرامج المتاحة ونسخها، متخزّنة عندك. [[brew update]] بتحدّث الكتالوج ده بس ومش بتلمس برامجك، زي [[apt update]]. [[brew outdated]] بتقارن اللي متسطب عندك بالكتالوج وتطبع اللي ليه نسخة أحدث، ولو مطبعتش حاجة يبقى كله محدّث.

[[brew upgrade]] من غير اسم بتحدّث كل اللي في اللستة دي، ومع اسم ([[brew upgrade node]]) بتحدّث حاجة واحدة. و [[brew cleanup]] بتمسح النسخ القديمة والملفات المتنزلة اللي مبقتش محتاجها، وده ممكن يوفّر جيجات.

خد بالك: الترقية ممكن تنقل حاجة زي postgresql أو node لنسخة رئيسية جديدة وتبوّظ مشروع شغال. لو عايز تثبّت حاجة على نسختها: [[brew pin postgresql@16]].`,
          example: R`brew update
brew outdated
brew upgrade
brew cleanup`,
          try: "اعرف إيه اللي محتاج تحديث عندك بـ [[brew outdated]].",
          deep: {
            why: "تحديث الـ packages المسطّبة. زي apt upgrade في لينكس.",
            how: R`[[brew update]] بيجيب آخر لستة packages (تحديث Homebrew نفسه). [[brew upgrade]] بيحدّث كل المسطّبات.

[[brew upgrade node]] لـ package واحدة. [[brew outdated]] بيوريك اللي فيه تحديث.

[[brew cleanup]] بيمسح النسخ القديمة وبيوفّر مساحة.

وتقدر تعمل كل ده مرة واحدة: [[brew update && brew upgrade && brew cleanup]]. ممكن تحطها في cron أسبوعي.`,
            when: "بانتظام عشان تفضل محدّث وآمن.",
            mistakes: "تحديث قاعدة بيانات غير متوقع: [[brew upgrade postgresql]] ممكن يغيّر version رئيسية وبياناتك مش هتشتغل. اتأكد إيه اللي هيتحدّث."
          },
          teach: R`## ٤ خطوات بالترتيب: حدّث اللستة، شوف القديم، رقّي، نضّف

الأوامر الأربعة دي بتتكتب بالترتيب ده بالظبط، وكل واحد بيعتمد على اللي قبله. جربتهم على Homebrew 7.0.8 على أوبونتو 24.04 (Docker)، بعد تسطيب جديد، فالنتايج كانت هادية. شكل الناتج لما يبقى فيه تحديثات من توثيق Homebrew، ومكتوب ده جنبه.

---

## ١. [[brew update]]

brew عنده **كتالوج**: لستة بكل الباكدجات وآخر نسخة من كل واحدة، متخزنة عندك. [[update]] بتجيب أحدث نسخة من الكتالوج ده (ومن brew نفسه)، ومش بتلمس أي برنامج متسطّب:

~~~text الناتج
==> Updating Homebrew...
Already up-to-date.
~~~

[[Already up-to-date]] يعني الكتالوج اللي عندك هو آخر واحد. ده زي [[apt update]] على أوبونتو.

---

## ٢. [[brew outdated]]

بتقارن كل اللي متسطّب عندك بالكتالوج، وتطبع اللي ليه نسخة أحدث. في التجربة مطبعتش حاجة:

~~~zsh
brew outdated
echo $?
~~~

~~~text الناتج
0
~~~

مفيش ولا سطر، و exit code صفر: كله محدّث. ولما يكون فيه، كل سطر بيبقى شكله زي ده (من الـ docs):

~~~text الشكل
node (24.1.0) < 24.8.0
~~~

النسخة اللي عندك بين القوسين، و [[<]] يعني «أقدم من»، وبعدها النسخة الجديدة. وحسب [[brew outdated --help]]: النسخ بتتطبع بس لما الناتج رايح للشاشة، ولو بتبعته لـ pipe بيطبع الأسامي بس.

> لو نسيت [[brew update]] الأول، المقارنة بتبقى مع كتالوج قديم وممكن متشوفش التحديثات الجديدة. (brew بيعمل update لوحده قبل install و upgrade لو بقاله فترة، بس متعتمدش على ده.)

---

## ٣. [[brew upgrade]]

من غير اسم: رقّي **كل** حاجة ظهرت في outdated. ومع اسم ([[brew upgrade node]]) حاجة واحدة. في التجربة مفيش حاجة قديمة فخلص ساكت بـ exit code صفر.

ولو عايز تمنع باكدج من الترقية: [[brew pin]]. جربتها:

~~~zsh
brew pin tree
brew list --pinned
brew unpin tree
~~~

~~~text الناتج
tree
~~~

[[list --pinned]] بيطبع المتثبّت. و [[unpin]] بيرجّعها عادي.

---

## ٤. [[brew cleanup]]

كل ترقية بتسيب النسخة القديمة في [[Cellar]]، وكمان ملفات التنزيل في الـ cache. [[cleanup]] بتمسح القديم ده. في التجربة مكانش فيه قديم فخلص من غير ما يطبع. على جهاز بقاله شهور من غير cleanup، بيطبع سطور [[Removing:]] لكل حاجة بيمسحها وفي الآخر المساحة اللي وفّرها (من الـ docs). ولو عايز تشوف هيمسح إيه من غير ما يمسح: [[brew cleanup -n]].

---

## الخلاصة

| الأمر | بيعمل إيه | زي أوبونتو |
|---|---|---|
| [[brew update]] | يحدّث الكتالوج بس | [[apt update]] |
| [[brew outdated]] | يطبع اللي ليه نسخة أحدث (فاضي = كله تمام) | [[apt list --upgradable]] |
| [[brew upgrade]] | يرقّي كله، أو حاجة واحدة بالاسم | [[apt upgrade]] |
| [[brew cleanup]] | يمسح النسخ القديمة والتنزيلات | [[apt autoclean]] |
| [[brew pin NAME]] | يمنع حاجة من الترقية | [[apt-mark hold]] |`,
          lines: [
            "حدّث كتالوج Homebrew (زي apt update).",
            "إيه اللي فيه نسخة أحدث.",
            "حدّث كله (زي apt upgrade).",
            "امسح النسخ القديمة ووفّر مساحة."
          ],
          sol: R`[[brew outdated]] بيطبع سطر لكل حاجة قديمة زي [[node (24.1.0) < 24.8.0]]، ولو كله محدث مش بيطبع أي حاجة، وده معناه إنك تمام.

اعمل [[brew update]] الأول، وإلا الأداة هتقارن بلستة قديمة ومش هتشوف التحديثات الجديدة. وخد بالك إن الـ casks اللي بتحدث نفسها (زي Chrome) ممكن متظهرش هنا، [[brew outdated --greedy]] بيعرضها. وقبل [[brew upgrade]] في يوم شغل مهم، فكّر إن ترقية postgresql أو node ممكن تغيّر سلوك مشروعك.

(ده ماك بس: شكل [[brew outdated]] و [[--greedy]] و [[brew pin]] من توثيق Homebrew (بيطبع النسخ لما يكون في ترمنال، وبيطبع الأسامي بس لما الناتج رايح pipe)، مش متجرب هنا.)`
        },
        {
          cmd: "brew list / info",
          title: "اعرف متسطب إيه",
          desc: R`دول الأوامر اللي بتعرف بيها إيه اللي عندك وإيه المتاح. [[brew list]] بتطبع كل اللي سطّبته بـ brew، و [[--formula]] أو [[--cask]] بعدها تحصر النوع. [[brew search postgres]] بتدوّر في الكتالوج على أي اسم فيه الكلمة دي، فتعرف الاسم الصح (زي [[postgresql@16]]) قبل ما تسطّب.

[[brew info node]] بتطبع النسخة المتاحة، ولو متسطبة فين مكانها وحجمها، والاعتماديات، وأي Caveats (تعليمات لازم تعملها بعد التسطيب). و [[brew uninstall wget]] بتشيل الأداة، ومن Homebrew 4.3 بتشيل لوحدها كمان الاعتماديات اللي اتسطبت معاها ومبقاش حد محتاجها (اللي كان [[brew autoremove]] بيعمله بإيدك).`,
          example: R`brew list
brew search postgres
brew info node
brew uninstall wget`,
          try: "اعرض معلومات أي حاجة متسطبة عندك.",
          deep: {
            why: "تعرف إيه المسطّب وأين ومتى آخر تحديث.",
            how: R`[[brew list]] كل الـ packages المسطّبة. [[brew list --formula]] الـ CLI tools بس. [[brew list --cask]] الـ GUI apps.

[[brew info node]] معلومات عن package: الـ version، وتاريخ آخر تحديث، والـ dependencies.

[[brew deps --tree node]] يعرض الـ dependencies كشجرة.

[[brew doctor]] بيشوف لو فيه مشاكل في إعداد Homebrew. مفيد لو حاجة مش شغالة.`,
            when: "بعد مشاكل تسطيب. التأكد من version معين. مراجعة ما هو مسطّب.",
            mistakes: "[[brew list]] بيطلع كتير. افلتر بـ [[brew list | grep git]]."
          },
          teach: R`## ٤ أسئلة لـ brew: عندي إيه؟ فيه إيه؟ ده إيه؟ شيله

كلهم قراية ما عدا الأخير. جربتهم على Homebrew 7.0.8 على أوبونتو 24.04 (Docker)، بعد ما سطّبت [[tree]] و [[htop]] و [[wget]] و [[node@24]]. الأوامر وشكل الناتج هما هما على الماك، والأرقام والأسامي هتختلف حسب اللي عندك.

---

## ١. [[brew list]]

بتطبع كل باكدج متسطّبة، اسم في سطر:

~~~text الناتج (أوله)
brotli
bzip2
c-ares
ca-certificates
expat
...
~~~

طلع ٣٦ اسم، مع إني سطّبت ٤ بس. الباقي dependencies اتسطبت معاهم. عشان تشوف اللي انت طلبته بس:

~~~zsh
brew leaves
~~~

~~~text الناتج
htop
node@24
tree
wget
~~~

[[leaves]] (الأوراق) يعني الباكدجات اللي مفيش حاجة تانية محتاجاها. و [[brew list --formula]] أو [[--cask]] بيحصروا النوع.

---

## ٢. [[brew search postgres]]

بتدوّر في الكتالوج كله (مش اللي عندك بس) على أي اسم فيه الكلمة:

~~~text الناتج
check_postgres
postgres-language-server
postgresql-hll
postgresql@12
postgresql@13
postgresql@14
postgresql@15
postgresql@16
postgresql@17
postgresql@18
postgrest
qt-postgresql
postgis
~~~

كده عرفت إن الاسم الصح [[postgresql@16]] مثلًا، مش [[postgres]]. (على الماك بيطلع كمان قسم [[==> Casks]] للتطبيقات.)

---

## ٣. [[brew info node]]

بطاقة الباكدج. جربتها على [[tree]] الأول لأنها قصيرة:

~~~text الناتج
==> tree: stable 2.3.2 (bottled)
Display directories as trees (with optional color/HTML output)
https://oldmanprogrammer.net/source.php?dir=projects/tree
Installed (on request)
From: https://github.com/Homebrew/homebrew-core/blob/HEAD/Formula/t/tree.rb
License: GPL-2.0-or-later
==> Installed Versions
tree 2.3.2 (9 files, 223.4KB) [Linked]
~~~

| السطر | معناه |
|---|---|
| [[stable 2.3.2]] | آخر نسخة في الكتالوج |
| [[(bottled)]] | فيه نسخة جاهزة، مش هيبني من الكود |
| [[Installed (on request)]] | متسطبة، وانت اللي طلبتها (مش dependency) |
| [[From:]] | ملف الـ formula: وصفة التسطيب نفسها |
| [[Installed Versions]] | النسخة اللي عندك، وعدد الملفات والحجم |
| [[[Linked]]] | أوامرها متحطة في [[bin]] جوه فولدر brew، يعني في الـ PATH |

ولـ [[node]]:

~~~text الناتج (أوله)
==> node: stable 26.10.0 (bottled), HEAD
Open-source, cross-platform JavaScript runtime environment
https://nodejs.org/
Aliases: node.js, node@26, nodejs, npm
Not installed
...
==> Installed Versions
node@24 24.21.0_1 (2,103 files, 105.9MB) [Linked]
==> Dependencies
Required (20): abseil, ada-url, brotli, c-ares, ...
~~~

[[Not installed]] لأن [[node]] (اللي هو 26) مش متسطّب، اللي عندي [[node@24]]. و [[HEAD]] يعني ينفع تسطّب من آخر كود على GitHub. و [[Dependencies]] اللي هيتسطب معاه. وأي [[Caveats]] بتظهر في آخر البطاقة.

اسم غلط:

~~~text الناتج
Error: No available formula with the name "nosuchthing".
~~~

---

## ٤. [[brew uninstall wget]]

~~~text الناتج (مختصر)
Uninstalling /home/linuxbrew/.linuxbrew/Cellar/wget/1.25.0_2... (92 files, 5.2MB)
Warning: The following may be wget configuration files and have not been removed!
  /home/linuxbrew/.linuxbrew/etc/wgetrc
==> Autoremoving 6 unneeded formulae:
libidn2
libpsl
libunistring
libxcrypt
openssl@4
util-linux
~~~

٣ حاجات حصلت:

1. شال wget نفسه من [[Cellar]].
2. **ساب** ملفات الإعداد (في [[etc]]) لو حبيت ترجع تسطّبه. تمسحها بإيدك لو عايز.
3. شال لوحده الـ dependencies اللي مبقاش حد محتاجها. ده سلوك brew الجديد (من نسخة 4.3)؛ ولو المتغير [[HOMEBREW_NO_AUTOREMOVE]] متعرّف مش بيعمل كده، وساعتها [[brew autoremove]] بيعملها بإيدك. بعدها جربت [[brew autoremove -n]] ([[-n]] = وريني من غير ما تمسح) فمطبعش حاجة: مفيش بواقي.

---

## الخلاصة

| السؤال | الأمر |
|---|---|
| متسطّب عندي إيه (كله) | [[brew list]] |
| اللي أنا طلبته بس | [[brew leaves]] |
| الاسم الصح لحاجة | [[brew search WORD]] |
| تفاصيل ونسخة و Caveats | [[brew info NAME]] |
| شيل حاجة | [[brew uninstall NAME]] (وبيشيل الـ dependencies اللي مبقاش ليها لازمة) |`,
          lines: ["المسطّب.", "دوّر على باكدج.", "تفاصيل باكدج ونسخته ومتسطب ولا لأ.", "شيل باكدج."],
          sol: R`[[brew info tree]] (أو أي حاجة من [[brew list]]) بيطبع أول سطر زي [[==> tree: stable 2.3.2 (bottled)]]، ووصف والموقع الرسمي، و [[Installed (on request)]]، وتحت [[==> Installed Versions]] النسخة اللي عندك وعدد ملفاتها وحجمها زي [[tree 2.3.2 (9 files, 223.4KB) [Linked]]]، وقسم Dependencies لو ليها اعتمادات. على الماك مكانها بيبقى [[/opt/homebrew/Cellar/tree/2.3.2]].

لو قالك [[Not installed]] يبقى الأداة مش متسطبة لسه، والمعلومات اللي فوق عن النسخة المتاحة. ولو كتبت اسم غلط هيقولك [[Error: No available formula with the name "..."]]، دوّر الأول بـ [[brew search]].

(جربت الأوامر دي على Homebrew للينكس (أوبونتو 24.04 في Docker)، ونفس الأوامر ونفس الشكل على الماك. الأرقام هتختلف عندك.)`
        },
        {
          cmd: "brew services",
          title: "خدمات في الخلفية (بديل systemctl)",
          desc: R`فيه برامج زي Postgres و Redis و Nginx مش أوامر تشغّلها وتخلص، دي سيرفرات لازم تفضل شغالة في الخلفية. [[brew services]] بتديرهم على الماك زي [[systemctl]] على لينكس، ومن جوه بتعمل ده بملفات launchd (نظام الخدمات بتاع الماك).

[[start]] بتشغّل الخدمة دلوقتي وكمان بتسجّلها تقوم لوحدها مع كل login. [[stop]] بتوقفها وتلغي التسجيل. [[list]] بتطبع كل خدمة وحالتها: [[started]] شغالة، و [[none]] مش متسجلة، و [[error]] حاولت تقوم ووقعت. و [[@16]] جزء من اسم الباكدج، يعني نسخة 16 من postgres.

لو عايز الخدمة تشتغل دلوقتي بس من غير ما تقوم مع الجهاز كل مرة: [[brew services run]].`,
          example: R`brew install postgresql@16
brew services start postgresql@16
brew services list
brew services stop postgresql@16`,
          try: "سطّب redis وشغّله بـ brew services واختبره بـ [[redis-cli ping]].",
          deep: {
            why: "تشغيل وإيقاف خدمات زي PostgreSQL وRedis وMongoDB. على الماك بيشتغلوا كـ LaunchAgents.",
            how: R`[[brew services list]] بيعرض الخدمات وحالتها. [[brew services start postgresql@16]] بيشغّلها. [[brew services stop]] بيوقّفها. [[brew services restart]] بيعيد تشغيل.

[[brew services start postgresql@16]] كمان بيخليها تشتغل مع كل restart للماك.

بديل: [[pg_ctl start]] أو [[redis-server]] بيشغّل مؤقتًا من غير ما يتسجّل كـ service.`,
            when: "تشغيل قاعدة بيانات محلية. تشغيل Redis للتطوير.",
            mistakes: "تحاول تشغّل postgresql القديم والجديد في نفس الوقت. بيتخانقوا على البورت."
          },
          teach: R`## برنامج لازم يفضل شغال، و brew بيسجّله عند الماك

Postgres مش أمر بيخلص ويرجعلك الـ prompt، ده سيرفر لازم يفضل شغال في الخلفية. على الماك، اللي بيشغّل البرامج دي وبيصحّيها مع الـ login اسمه **launchd**، وبيقرا ملفات إعداد اسمها plist. [[brew services]] بيكتبلك الملف ده ويكلّم launchd بدالك.

> على لينكس [[brew services]] بيستخدم systemd بدل launchd. جربته جوه Docker ومشتغلش لأن الـ container مفيهوش systemd، فالكلام عن الماك هنا من [[brew services --help]] (اتطبعت فعلًا من نفس الـ brew) ومن كود brew services نفسه.

---

## ١. [[brew install postgresql@16]]

تسطيب عادي زي أي باكدج (درس brew install). [[@16]] النسخة الرئيسية 16. الباكدج دي فيها «service»: وصفة بتقول brew يشغّل السيرفر إزاي.

---

## ٢. [[brew services start postgresql@16]]

[[brew services --help]] بيقول عن [[start]]:

~~~text من brew services --help
start:
  Start the service formula immediately and register it to launch at login (or boot).
~~~

يعني حاجتين: شغّلها **دلوقتي**، و**سجّلها** تقوم لوحدها مع كل login. على الماك ده بيعمل ملف في [[~/Library/LaunchAgents]] اسمه [[homebrew.mxcl.postgresql@16.plist]]، ويطبع (من كود brew):

~~~text الشكل
==> Successfully started $__btpostgresql@16$__bt (label: homebrew.mxcl.postgresql@16)
~~~

[[label]] اسم الخدمة عند launchd. ولو كتبت [[sudo brew services start]] بيتسجّل في [[/Library/LaunchDaemons]] ويقوم مع تشغيل الجهاز نفسه حتى من غير login، وده نادرًا ما تحتاجه على جهاز تطوير.

---

## ٣. [[brew services list]]

جدول بأربع أعمدة (من كود brew services):

~~~text الشكل
Name          Status  User File
postgresql@16 started sara ~/Library/LaunchAgents/homebrew.mxcl.postgresql@16.plist
redis         none
~~~

| العمود | معناه |
|---|---|
| [[Name]] | اسم الباكدج |
| [[Status]] | الحالة (تحت) |
| [[User]] | اليوزر اللي شغّالة بيه |
| [[File]] | ملف الـ plist، بيظهر بس لو متسجّلة |

والحالات:

| الحالة | معناها |
|---|---|
| [[started]] | شغالة دلوقتي |
| [[none]] | مش متسجّلة خالص |
| [[stopped]] | متسجّلة بس مش شغالة، وآخر مرة قفلت عادي |
| [[error]] + رقم | حاولت تقوم ووقعت، والرقم هو الـ exit code |
| [[scheduled]] | متسجّلة تشتغل في مواعيد |

لو شفت [[error]]، أشهر سبب إن حاجة تانية ماسكة البورت (5432 لـ Postgres)، زي Postgres تاني أو container.

---

## ٤. [[brew services stop postgresql@16]]

~~~text من brew services --help
stop:
  Stop the service formula immediately and unregister it from launching at login (or boot).
~~~

بيوقفها **ويلغي** التسجيل، فمش هتقوم مع الـ login الجاي.

---

## الأوامر التانية من نفس الـ help

| الأمر | بيعمل إيه |
|---|---|
| [[run]] | شغّلها دلوقتي **من غير** ما تسجّلها |
| [[restart]] | وقّف وشغّل وسجّل |
| [[kill]] | وقّفها دلوقتي بس تفضل متسجّلة |
| [[info]] | تفاصيل الخدمات |
| [[cleanup]] | امسح تسجيل الخدمات اللي مبقتش موجودة |

---

## الخلاصة

| عايز | الأمر | زي لينكس |
|---|---|---|
| تشتغل دلوقتي وكل login | [[brew services start NAME]] | [[systemctl enable --now]] |
| تشتغل دلوقتي بس | [[brew services run NAME]] | [[systemctl start]] |
| توقف ومتقومش تاني | [[brew services stop NAME]] | [[systemctl disable --now]] |
| الحالة | [[brew services list]] | [[systemctl status]] |`,
          lines: [
            "سطّب Postgres 16.",
            "شغّله كخدمة دايمة (بتقوم مع الماك). زي systemctl enable --now.",
            "الخدمات وحالتها.",
            "وقّفه."
          ],
          sol: R`[[brew install redis]] وبعدين [[brew services start redis]] يطبع [[==> Successfully started $__btredis$__bt (label: homebrew.mxcl.redis)]]. [[brew services list]] يوريك redis بحالة [[started]]. و [[redis-cli ping]] يرد [[PONG]].

لو ping قالت [[Could not connect to Redis at 127.0.0.1:6379: Connection refused]]، بص في [[brew services list]]: لو الحالة [[error]] يبقى فيه حاجة تانية ماسكة بورت 6379 (زي Redis في Docker)، اعرفها بـ [[lsof -i :6379]]. وخد بالك إن start بيخليها تقوم مع كل boot، ولو عايزها تشتغل دلوقتي بس استخدم [[brew services run redis]].

(ده ماك بس: [[start]] و [[run]] و [[list]] وحالاتها من [[brew services --help]] وكود brew services نفسه، مش متجربة هنا لأن الـ container مفيهوش systemd ولا launchd. [[redis-cli ping]] و [[PONG]] نفس الكلام على أي نظام.)`
        }
      ]
    }
]);

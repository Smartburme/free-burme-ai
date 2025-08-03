# free-burme-ai
website 
# Free-Burme-AI Chat Bot Website 

## Project အချက်အလက်
မြန်မာဘာသာစကားဖြင့် အသုံးပြုနိုင်သော AI Chatbot Website တစ်ခုဖြစ်ပြီး HTML, CSS နှင့် JavaScript တို့ဖြင့် တည်ဆောက်ထားပါမည်။

### အဓိက လုပ်ဆောင်ချက်များ:
- စကားပြောဆိုခြင်း
- ပုံများထုတ်လုပ်ခြင်း
- ကုဒ်များရေးသားခြင်း
- Link များမှ အချက်အလက်ရှာဖွေခြင်း
- Local Storage တွင် စကားပြောမှတ်တမ်းသိမ်းဆည်းခြင်း

## Project ဖွဲ့စည်းပုံ

```
free-burme-ai/
├── index.html                # အဓိက ဝင်ပေါက်
├── assets/
│   ├── css/
│   │   ├── style.css         # အဓိက style sheet
│   │   └── responsive.css    # Mobile အတွက် style
│   ├── js/
│   │   ├── main.js           # အခြေခံလုပ်ဆောင်ချက်များ
│   │   ├── chat.js           # စကားပြောလုပ်ဆောင်ချက်
│   │   ├── image-gen.js      # ပုံထုတ်လုပ်ခြင်း
│   │   ├── code-editor.js    # ကုဒ်ရေးသားခြင်း
│   │   ├── search.js         # Link များမှရှာဖွေခြင်း
│   │   └── storage.js        # Local storage လုပ်ဆောင်ချက်
│   └── images/
│       ├── logo.png          # Website logo
│       └── icons/            # Icon များ
├── docs/                     # မှတ်တမ်းများ
└── README.md                 # Project အကြောင်း
```

## HTML (index.html) အခြေခံဖွဲ့စည်းပုံ

```html
<!DOCTYPE html>
<html lang="my">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Free Burme AI - မြန်မာ့ AI စကားပြောဖော်</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/responsive.css">
</head>
<body>
    <header>
        <div class="logo">
            <img src="assets/images/logo.png" alt="Free Burme AI">
            <h1>Free Burme AI</h1>
        </div>
        <nav>
            <button id="theme-toggle">အရောင်ပြောင်းမည်</button>
        </nav>
    </header>

    <main>
        <div class="sidebar">
            <button id="new-chat">စကားစပြောမည်</button>
            <div class="history-list" id="chat-history">
                <!-- LocalStorage မှ စကားပြောမှတ်တမ်းများ ဖော်ပြမည် -->
            </div>
        </div>

        <div class="chat-container">
            <div class="chat-display" id="chat-display">
                <!-- စကားပြောစာတိုများ ဖော်ပြမည် -->
            </div>

            <div class="input-area">
                <div class="mode-selector">
                    <button class="active" data-mode="chat">စကားပြော</button>
                    <button data-mode="image">ပုံထုတ်မည်</button>
                    <button data-mode="code">ကုဒ်ရေးမည်</button>
                </div>

                <div class="input-group" id="chat-input">
                    <textarea placeholder="သင့်စကားစုကိုရိုက်ထည့်ပါ..." id="user-input"></textarea>
                    <button id="send-btn">ပို့မည်</button>
                </div>

                <div class="input-group hidden" id="image-input">
                    <textarea placeholder="သင်လိုချင်သောပုံ၏ အကြောင်းရေးပါ..." id="image-prompt"></textarea>
                    <button id="generate-btn">ပုံထုတ်မည်</button>
                </div>

                <div class="input-group hidden" id="code-input">
                    <textarea placeholder="သင်ရေးလိုသော ကုဒ်၏ အကြောင်းရေးပါ..." id="code-prompt"></textarea>
                    <button id="code-generate-btn">ကုဒ်ရေးမည်</button>
                    <select id="language-select">
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="html">HTML</option>
                        <option value="css">CSS</option>
                        <option value="php">PHP</option>
                    </select>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <p>© 2023 Free Burme AI. All rights reserved.</p>
    </footer>

    <script src="assets/js/storage.js"></script>
    <script src="assets/js/main.js"></script>
    <script src="assets/js/chat.js"></script>
    <script src="assets/js/image-gen.js"></script>
    <script src="assets/js/code-editor.js"></script>
    <script src="assets/js/search.js"></script>
</body>
</html>
```

## အဓိက လုပ်ဆောင်ချက်များ အကောင်အထည်ဖော်ခြင်း

၁။ **စကားပြောလုပ်ဆောင်ချက်**:
   - LocalStorage တွင် စကားပြောမှတ်တမ်းများသိမ်းဆည်းခြင်း
   - ဘေးဘားတွင် စကားပြောမှတ်တမ်းများဖော်ပြခြင်း
   - Markdown format များအား အထောက်အပံ့ပေးခြင်း

၂။ **ပုံထုတ်လုပ်ခြင်း**:
   - စာသားမှ ပုံထုတ်လုပ်သည့်စနစ်
   - ပုံများအား စကားပြောနေရာတွင် ဖော်ပြခြင်း
   - ပုံထုတ်လုပ်ရန် အမိန့်များအား မှတ်တမ်းတင်ခြင်း

၃။ **ကုဒ်ရေးသားခြင်း**:
   - Syntax highlighting ပါဝင်ခြင်း
   - Programming language ရွေးချယ်နိုင်ခြင်း
   - ကုဒ်များအား copy ကူးနိုင်ခြင်း

၄။ **Link-based ရှာဖွေခြင်း**:
   - URL များမှ အချက်အလက်များဖတ်ရှုခြင်း
   - Webpage အကြောင်းအကျဉ်းချုပ်ခြင်း
   - အရေးကြီးသော အပိုင်းများဖော်ပြခြင်း

၅။ **Local Storage**:
   - အရေးကြီးသော အချက်အလက်များအား လုံခြုံစွာသိမ်းဆည်းခြင်း
   - ရက်စွဲ/အချိန်အလိုက် စီမံခန့်ခွဲခြင်း
   - မှတ်တမ်းများအား ရှာဖွေနိုင်ခြင်း

## နောက်ထပ်လုပ်ဆောင်ရန်

၁။ CSS file များအား ဖန်တီးရန်
၂။ JavaScript module များအား အကောင်အထည်ဖော်ရန်
၃။ မြန်မာဘာသာစကားနှင့် RTL styling ထည့်သွင်းရန်
၄။ LocalStorage စနစ်အား စမ်းသပ်ရန်
၅။ Mobile devices များအတွက် responsive design ပြုလုပ်ရန်

ဤ project ၏ အထူးအစိတ်အပိုင်းတစ်ခုခုနှင့်ပတ်သက်၍ ပိုမိုရှင်းလင်းစွာ ရှင်းပြပေးရန် လိုအပ်ပါက ပြောပါနိုင်ပါသည်။ JavaScript module များအတွက် နမူနာ code များ လိုအပ်ပါက လည်း ပြောပါနိုင်ပါသည်။

# Free Burme Ai
# Project Structure 
```
free-burme-ai/
│
├── index.html                # Main HTML file (တစ်ခုတည်းသော HTML ဖိုင်)
├── styles/
│   ├── main.css              # အဓိက style sheet
│   ├── components/           # Component တွေအတွက် style
│   │   ├── navbar.css
│   │   ├── sidebar.css
│   │   └── chat-window.css
│   └── pages/               # Page အလိုက် style
│       ├── chat.css
│       ├── image-gen.css
│       └── coder.css
│
├── scripts/
│   ├── main.js               # အဓိက application logic
│   ├── router/               # Page routing system
│   │   ├── router.js
│   │   └── routes.js
│   ├── pages/                # Page အလိုက် logic
│   │   ├── chat.js           # Main Chat Bot
│   │   ├── image-gen.js      # Image Generator
│   │   ├── coder.js          # Code Generator
│   │   ├── public-chat.js    # Public Chat Group
│   │   ├── friends-chat.js   # Friends Chat
│   │   └── friends-list.js   # Friends List
│   ├── components/           # UI Components
│   │   ├── navbar.js
│   │   ├── sidebar.js
│   │   └── settings-modal.js
│   ├── services/             # Backend services
│   │   ├── api.js            # GitHub auto-run API connection
│   │   └── auth.js           # Authentication
│   └── utils/               # Utility functions
│       ├── helpers.js
│       └── storage.js        # LocalStorage management
│
├── assets/
│   ├── images/               # Static images
│   ├── icons/                # SVG/icons
│   └── fonts/                # Custom fonts
│
└── templates/               # Dynamic content templates
    ├── pages/               # Page templates
    │   ├── chat.html
    │   ├── image-gen.html
    │   ├── coder.html
    │   ├── public-chat.html
    │   ├── friends-chat.html
    │   └── friends-list.html
    └── components/          # Component templates
        ├── navbar.html
        ├── sidebar.html
        └── settings-modal.html

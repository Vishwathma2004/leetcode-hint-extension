# 🔍 LeetCode Hint Fetcher Extension

The **LeetCode Hint Fetcher** is a Chrome Extension powered by Gemini (Google Generative AI) that provides users with hints, ideas, and algorithmic approaches to LeetCode problems directly from the problem page.

## ✨ Features

- 🚀 Automatically fetches the problem name from LeetCode.
- 💡 Provides plain-text hints and algorithmic strategies using Google Gemini API.
- 🧠 Optional: Users can paste their code and choose a programming language.
- 🔒 Secure API key management using `.env` and server deployment.

## 📁 Project Structure

```
leet_extension/
├── front-end/
│   ├── popup.html
│   ├── popup.js
│   ├── style.css
│   ├── icon.png
│   ├── content.js
│   └── manifest.json
├── hint-backend/
│   ├── server.js
│   ├── package.json
│   └── .env (ignored)
└── README.md
```


## 🌐 Live Backend

Your backend is deployed on Render:

https://leetcode-hint-extension.onrender.com

> It uses Gemini (Google Generative AI) to respond to prompts based on problem names and user-provided code.

## 🛠️ How to Use

1. Clone the repository  
   git clone https://github.com/Vishwathma2004/leetcode-hint-extension.git  
   cd leet_extension

2. Run the backend locally (optional)  
   cd hint-backend  
   npm install  
   node server.js

3. Load the Chrome Extension  
   - Go to chrome://extensions/  
   - Enable Developer Mode  
   - Click "Load Unpacked"  
   - Select the `front-end` directory

4. Usage  
   - Visit a LeetCode problem  
   - Click the extension icon  
   - Paste your code (optional), select a language  
   - Click "Fetch Hints"  
   - Receive hints instantly powered by Gemini ✨

## 🔐 Environment Setup

Inside `hint-backend/.env`, include your Gemini API key like:

GEMINI_API_KEY=your_google_generative_ai_key



## 📦 Dependencies

- express  
- cors  
- dotenv  
- body-parser  
- @google/generative-ai  
- showdown

## 📜 License

MIT License — feel free to use and adapt with credit.

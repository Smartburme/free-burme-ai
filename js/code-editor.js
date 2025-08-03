document.getElementById('code-generate-btn').addEventListener('click', generateCode);

function generateCode() {
    const prompt = document.getElementById('code-prompt').value.trim();
    const language = document.getElementById('language-select').value;
    
    if (!prompt) return;
    
    // Show loading state
    const generateBtn = document.getElementById('code-generate-btn');
    generateBtn.disabled = true;
    generateBtn.textContent = 'ကုဒ်ရေးနေသည်...';
    
    // In a real app, this would call your code generation API
    setTimeout(() => {
        // Simulate different code responses based on language
        const codeExamples = {
            python: `# ${prompt}\ndef solution():\n    print("Hello from Python!")\n    return True`,
            javascript: `// ${prompt}\nfunction solution() {\n  console.log("Hello from JavaScript!");\n  return true;\n}`,
            html: `<!-- ${prompt} -->\n<div class="container">\n  <h1>Hello from HTML</h1>\n</div>`,
            css: `/* ${prompt} */\n.container {\n  width: 100%;\n  background-color: #f0f0f0;\n}`,
            php: `<?php\n// ${prompt}\nfunction solution() {\n  echo "Hello from PHP!";\n  return true;\n}\n?>`
        };
        
        const generatedCode = codeExamples[language] || codeExamples['python'];
        
        // Add code to chat
        const chatDisplay = document.getElementById('chat-display');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai';
        messageDiv.innerHTML = `
            <p>သင့်အတွက် ${language} ကုဒ်:</p>
            <pre><code class="language-${language}">${generatedCode}</code></pre>
            <button class="copy-btn">ကုဒ်ကိုကူးမည်</button>
        `;
        chatDisplay.appendChild(messageDiv);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
        
        // Add copy functionality
        messageDiv.querySelector('.copy-btn').addEventListener('click', function() {
            navigator.clipboard.writeText(generatedCode);
            this.textContent = 'ကူးပြီးပါပြီ!';
            setTimeout(() => {
                this.textContent = 'ကုဒ်ကိုကူးမည်';
            }, 2000);
        });
        
        // Save to history
        saveChatToHistory(`[${language} ကုဒ်ရေးရန်] ${prompt}`, `<pre><code>${generatedCode}</code></pre>`);
        
        // Reset button
        generateBtn.disabled = false;
        generateBtn.textContent = 'ကုဒ်ရေးမည်';
        document.getElementById('code-prompt').value = '';
    }, 1500);
}

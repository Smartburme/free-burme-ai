// Chat functionality
document.getElementById('send-btn').addEventListener('click', sendMessage);
document.getElementById('user-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input');
    const message = userInput.value.trim();
    
    if (message === '') return;
    
    // Add user message to chat
    addMessage('user', message);
    
    // Clear input
    userInput.value = '';
    
    // Simulate AI response (in real app, this would call your API)
    setTimeout(() => {
        const responses = [
            "ကျေးဇူးပြု၍ မေးခွန်းမေးပါ။",
            "ကျွန်တော် နားလည်ပါတယ်။",
            "ဒီမေးခွန်းကို ဖြေကြားနိုင်ပါတယ်။",
            "ကျေးဇူးပြု၍ နောက်ထပ်ရှင်းပြပါ။"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage('ai', randomResponse);
        
        // Save to chat history
        saveChatToHistory(message, randomResponse);
    }, 1000);
}

function addMessage(sender, text) {
    const chatDisplay = document.getElementById('chat-display');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatDisplay.appendChild(messageDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
}

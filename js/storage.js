// Save chat to history
function saveChatToHistory(userMessage, aiResponse) {
    const chatId = Date.now().toString();
    const chatData = {
        id: chatId,
        title: userMessage.substring(0, 30) + (userMessage.length > 30 ? '...' : ''),
        timestamp: new Date().toLocaleString(),
        messages: [
            { sender: 'user', content: userMessage },
            { sender: 'ai', content: aiResponse }
        ]
    };
    
    // Get existing chats or initialize empty array
    const chats = JSON.parse(localStorage.getItem('chatHistory')) || [];
    
    // Add new chat
    chats.unshift(chatData);
    
    // Save back to localStorage
    localStorage.setItem('chatHistory', JSON.stringify(chats));
    
    // Update history list in UI
    updateHistoryList();
}

// Update chat history list in sidebar
function updateHistoryList() {
    const historyList = document.getElementById('chat-history');
    const chats = JSON.parse(localStorage.getItem('chatHistory')) || [];
    
    // Clear current list
    historyList.innerHTML = '';
    
    // Add each chat to the list
    chats.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = 'history-item';
        chatItem.innerHTML = `
            <h4>${chat.title}</h4>
            <small>${chat.timestamp}</small>
        `;
        chatItem.addEventListener('click', () => loadChat(chat.id));
        historyList.appendChild(chatItem);
    });
}

// Load a specific chat from history
function loadChat(chatId) {
    const chats = JSON.parse(localStorage.getItem('chatHistory')) || [];
    const chat = chats.find(c => c.id === chatId);
    
    if (!chat) return;
    
    // Clear current chat
    document.getElementById('chat-display').innerHTML = '';
    
    // Add all messages from the chat
    chat.messages.forEach(msg => {
        addMessage(msg.sender, msg.content);
    });
}

// Initialize history list on page load
document.addEventListener('DOMContentLoaded', updateHistoryList);

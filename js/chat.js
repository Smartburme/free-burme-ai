// Improved chat.js with API integration
const API_URL = process.env.API_URL || 'https://free-burme-ai-api.vercel.app/api/chat';

document.addEventListener('DOMContentLoaded', () => {
  const chatDisplay = document.getElementById('chat-display');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');

  // Load chat history
  const loadHistory = () => {
    const history = localStorage.getItem('chatHistory');
    return history ? JSON.parse(history) : [];
  };

  // Save chat to history
  const saveToHistory = (sender, message) => {
    const history = loadHistory();
    history.push({ sender, message, timestamp: new Date().toISOString() });
    localStorage.setItem('chatHistory', JSON.stringify(history));
  };

  // Display message
  const displayMessage = (sender, message) => {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<p>${message}</p>`;
    chatDisplay.appendChild(messageDiv);
    chatDisplay.scrollTop = chatDisplay.scrollHeight;
  };

  // Get AI response
  const getAIResponse = async (userMessage) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      
      if (!response.ok) throw new Error('API error');
      const data = await response.json();
      return data.reply;
    } catch (error) {
      console.error('Error:', error);
      return 'တောင်းပန်ပါသည်၊ အမှားတစ်ခုဖြစ်ပွားခဲ့ပါသည်။';
    }
  };

  // Send message handler
  const handleSendMessage = async () => {
    const message = userInput.value.trim();
    if (!message) return;

    // Display user message
    displayMessage('user', message);
    saveToHistory('user', message);
    userInput.value = '';

    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message ai typing';
    typingIndicator.innerHTML = 'AI စဉ်းစားနေသည်...';
    chatDisplay.appendChild(typingIndicator);

    // Get and display AI response
    const aiResponse = await getAIResponse(message);
    typingIndicator.remove();
    displayMessage('ai', aiResponse);
    saveToHistory('ai', aiResponse);
  };

  // Event listeners
  sendBtn.addEventListener('click', handleSendMessage);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  // Load previous messages
  loadHistory().forEach(msg => {
    displayMessage(msg.sender, msg.message);
  });
});

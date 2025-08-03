/**
 * Free-Burme-AI Chat Module
 * GitHub Auto-Run နှင့် အလိုအလျောက် အလုပ်လုပ်နိုင်သော Version
 */

class ChatBot {
  constructor() {
    // API Configuration
    this.apiBaseUrl = this.getApiUrl();
    this.isGitHubEnv = window.location.host.includes('github.io');
    
    // DOM Elements
    this.chatDisplay = document.getElementById('chat-display');
    this.userInput = document.getElementById('user-input');
    this.sendBtn = document.getElementById('send-btn');
    this.modeSelector = document.querySelector('.mode-selector');
    
    // State Management
    this.currentMode = 'chat';
    this.isTyping = false;
    
    // Initialize
    this.init();
  }

  // Initialize chat bot
  init() {
    this.loadChatHistory();
    this.setupEventListeners();
    this.setupGitHubActions();
    
    // Welcome message
    if (!localStorage.getItem('chat_first_visit')) {
      this.addMessage('ai', 'မင်္ဂလာပါ! Free-Burme-AI မှ ကြိုဆိုပါသည်။ ဘာကူညီရမလဲ?');
      localStorage.setItem('chat_first_visit', 'true');
    }
  }

  // Get appropriate API URL based on environment
  getApiUrl() {
    if (this.isGitHubEnv) {
      return 'https://free-burme-ai-api.vercel.app/api';
    }
    return window.location.hostname === 'localhost' 
      ? 'http://localhost:3000/api' 
      : 'https://api.free-burme-ai.com';
  }

  // Setup GitHub Actions integration
  setupGitHubActions() {
    if (this.isGitHubEnv) {
      console.log('GitHub Pages Environment Detected');
      // Additional GitHub-specific initialization
    }
  }

  // Event listeners setup
  setupEventListeners() {
    // Send message on button click
    this.sendBtn.addEventListener('click', () => this.handleSendMessage());
    
    // Send message on Enter key
    this.userInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleSendMessage();
      }
    });
    
    // Mode switching
    this.modeSelector.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        this.switchMode(e.target.dataset.mode);
      }
    });
  }

  // Handle sending messages
  async handleSendMessage() {
    const message = this.userInput.value.trim();
    if (!message || this.isTyping) return;
    
    // Add user message
    this.addMessage('user', message);
    this.saveToHistory('user', message);
    this.userInput.value = '';
    
    // Show typing indicator
    this.showTypingIndicator();
    
    try {
      // Get AI response
      let response;
      
      if (this.currentMode === 'chat') {
        response = await this.getChatResponse(message);
      } 
      else if (this.currentMode === 'image') {
        response = await this.getImageResponse(message);
      }
      else if (this.currentMode === 'code') {
        response = await this.getCodeResponse(message);
      }
      
      // Add AI response
      this.addMessage('ai', response);
      this.saveToHistory('ai', response);
      
    } catch (error) {
      console.error('Chat Error:', error);
      this.addMessage('ai', 'တောင်းပန်ပါသည်၊ အမှားတစ်ခုဖြစ်နေပါသည်။ ကျေးဇူးပြု၍ နောက်မှထပ်ကြိုးစားပေးပါ။');
    } finally {
      this.hideTypingIndicator();
    }
  }

  // Get chat response from API
  async getChatResponse(message) {
    const response = await fetch(`${this.apiBaseUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        language: 'my',
        history: this.getRecentHistory()
      })
    });
    
    if (!response.ok) throw new Error('API request failed');
    const data = await response.json();
    return data.reply;
  }

  // Get image generation response
  async getImageResponse(prompt) {
    const response = await fetch(`${this.apiBaseUrl}/generate-image`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    
    if (!response.ok) throw new Error('Image generation failed');
    const data = await response.json();
    return `<img src="${data.imageUrl}" alt="Generated: ${prompt}" class="generated-image">`;
  }

  // Get code generation response
  async getCodeResponse(prompt) {
    const language = document.getElementById('language-select').value;
    const response = await fetch(`${this.apiBaseUrl}/generate-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, language })
    });
    
    if (!response.ok) throw new Error('Code generation failed');
    const data = await response.json();
    return `
      <div class="code-block">
        <pre><code class="language-${language}">${data.code}</code></pre>
        <button class="copy-code">Copy Code</button>
      </div>
    `;
  }

  // UI Methods
  addMessage(sender, content) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.innerHTML = `<p>${this.formatContent(content)}</p>`;
    
    // Add to chat display with animation
    messageDiv.style.opacity = '0';
    this.chatDisplay.appendChild(messageDiv);
    
    setTimeout(() => {
      messageDiv.style.transition = 'opacity 0.3s ease';
      messageDiv.style.opacity = '1';
    }, 10);
    
    this.scrollToBottom();
  }

  showTypingIndicator() {
    this.isTyping = true;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai typing';
    typingDiv.innerHTML = `
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
    this.chatDisplay.appendChild(typingDiv);
    this.scrollToBottom();
    return typingDiv;
  }

  hideTypingIndicator() {
    this.isTyping = false;
    const typingIndicator = document.querySelector('.typing');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  scrollToBottom() {
    this.chatDisplay.scrollTop = this.chatDisplay.scrollHeight;
  }

  // Format message content
  formatContent(content) {
    // Simple markdown formatting
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }

  // History Management
  loadChatHistory() {
    const history = localStorage.getItem('free-burme-ai-history');
    if (history) {
      JSON.parse(history).forEach(msg => {
        this.addMessage(msg.sender, msg.content);
      });
    }
  }

  saveToHistory(sender, content) {
    const history = JSON.parse(localStorage.getItem('free-burme-ai-history') || '[]');
    history.push({ sender, content, timestamp: new Date().toISOString() });
    
    // Keep only last 50 messages
    const trimmedHistory = history.slice(-50);
    localStorage.setItem('free-burme-ai-history', JSON.stringify(trimmedHistory));
  }

  getRecentHistory() {
    const history = JSON.parse(localStorage.getItem('free-burme-ai-history') || '[]');
    return history.slice(-5); // Return last 5 messages for context
  }

  // Mode Switching
  switchMode(mode) {
    this.currentMode = mode;
    
    // Update UI
    document.querySelectorAll('.mode-selector button').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    document.querySelectorAll('.input-group').forEach(group => {
      group.classList.toggle('hidden', group.id !== `${mode}-input`);
    });
    
    // Focus on input field
    const inputField = document.getElementById(`${mode}-input`).querySelector('textarea');
    inputField.focus();
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.chatBot = new ChatBot();
  
  // GitHub Actions logging
  if (window.location.host.includes('github.io')) {
    console.log('Free-Burme-AI ChatBot initialized on GitHub Pages');
  }
});

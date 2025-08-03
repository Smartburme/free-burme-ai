export function init() {
    console.log('Friends Chat page initialized');
    
    const chatHeader = document.getElementById('friendChatHeader');
    const chatMessages = document.getElementById('friendChatMessages');
    const messageInput = document.getElementById('friendMessageInput');
    const sendBtn = document.getElementById('sendFriendMessageBtn');
    const backBtn = document.getElementById('backToFriendsBtn');
    
    // Extract friend ID from URL hash
    const friendId = parseInt(window.location.hash.split('/')[2]);
    
    // Sample friends data
    const friends = [
        { id: 1, name: 'မင်းထက်အောင်', status: 'online' },
        { id: 2, name: 'အေးချမ်းမြ', status: 'online' },
        { id: 3, name: 'ဇင်မာလွင်', status: 'offline' },
        { id: 4, name: 'ကျော်ဇေယျ', status: 'offline' }
    ];
    
    // Sample chat history
    const chatHistories = {
        1: [
            { sender: 'friend', text: 'ဟိုင်း၊ ဘယ်လိုနေလဲ?', time: '10:30 AM' },
            { sender: 'you', text: 'အေးပါတယ်။ မင်းရော?', time: '10:32 AM' },
            { sender: 'friend', text: 'ငါလည်းအေးတာပဲ။ Project လေးဘယ်လိုရှိလဲ?', time: '10:33 AM' }
        ],
        2: [
            { sender: 'friend', text: 'မင်္ဂလာပါ!', time: 'Yesterday' },
            { sender: 'you', text: 'မင်္ဂလာပါ! ဘာတွေလုပ်နေလဲ?', time: 'Yesterday' }
        ],
        3: [],
        4: []
    };
    
    // Get friend info
    const friend = friends.find(f => f.id === friendId);
    
    if (!friend) {
        // Friend not found, redirect to friends list
        window.location.hash = '#/friends';
        return;
    }
    
    // Set up chat UI
    chatHeader.innerHTML = `
        <button id="backToFriendsBtn" class="back-btn">
            <i class="fas fa-arrow-left"></i>
        </button>
        <div class="friend-info">
            <h2>${friend.name}</h2>
            <p>${friend.status === 'online' ? 'Online' : 'Offline'}</p>
        </div>
    `;
    
    // Load chat history
    const history = chatHistories[friendId] || [];
    renderMessages(history);
    
    // Back button
    backBtn.addEventListener('click', () => {
        window.location.hash = '#/friends';
    });
    
    // Send message
    function sendMessage() {
        const text = messageInput.value.trim();
        if (text) {
            const newMessage = {
                sender: 'you',
                text: text,
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            
            // Add to chat history
            if (!chatHistories[friendId]) {
                chatHistories[friendId] = [];
            }
            chatHistories[friendId].push(newMessage);
            
            // Render message
            renderMessage(newMessage);
            messageInput.value = '';
            
            // Simulate friend reply
            if (friend.status === 'online') {
                setTimeout(() => {
                    const replies = [
                        'ဟုတ်ကဲ့',
                        'အေးပါတယ်',
                        'ဘာဖြစ်တာလဲ?',
                        'နောက်မှပြန်ပြောမယ်',
                        'ကျေးဇူးတင်ပါတယ်'
                    ];
                    const randomReply = replies[Math.floor(Math.random() * replies.length)];
                    
                    const replyMessage = {
                        sender: 'friend',
                        text: randomReply,
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    
                    chatHistories[friendId].push(replyMessage);
                    renderMessage(replyMessage);
                }, 1000 + Math.random() * 3000);
            }
        }
    }
    
    // Render all messages
    function renderMessages(messages) {
        chatMessages.innerHTML = '';
        messages.forEach(msg => renderMessage(msg));
        scrollToBottom();
    }
    
    // Render single message
    function renderMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${message.sender}`;
        
        if (message.sender === 'you') {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-text">${message.text}</div>
                    <div class="message-time">${message.time}</div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="message-content">
                    <div class="message-text">${message.text}</div>
                    <div class="message-time">${message.time}</div>
                </div>
            `;
        }
        
        chatMessages.appendChild(messageDiv);
        scrollToBottom();
    }
    
    // Scroll to bottom of chat
    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
              }

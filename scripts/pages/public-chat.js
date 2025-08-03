export function init() {
    console.log('Public Chat page initialized');
    
    const chatContainer = document.getElementById('publicChatContainer');
    const messageInput = document.getElementById('publicMessageInput');
    const sendBtn = document.getElementById('sendPublicMessageBtn');
    const roomSelect = document.getElementById('chatRoomSelect');
    
    // Sample public chat rooms
    const chatRooms = [
        { id: 'general', name: 'General Discussion' },
        { id: 'tech', name: 'Technology' },
        { id: 'myanmar', name: 'Myanmar Language' },
        { id: 'help', name: 'Help & Support' }
    ];
    
    // Populate room select
    chatRooms.forEach(room => {
        const option = document.createElement('option');
        option.value = room.id;
        option.textContent = room.name;
        roomSelect.appendChild(option);
    });
    
    // Simulate joining a chat room
    function joinRoom(roomId) {
        const room = chatRooms.find(r => r.id === roomId);
        if (!room) return;
        
        // Clear chat
        chatContainer.innerHTML = '';
        
        // Add welcome message
        addSystemMessage(`You joined ${room.name}`);
        
        // Simulate some existing messages
        setTimeout(() => {
            addMessage('user1', 'Hello everyone!', '10:30 AM');
            addMessage('user2', 'Hi there! How are you?', '10:31 AM');
        }, 500);
    }
    
    // Add message to chat
    function addMessage(sender, text, time) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'public-message';
        messageDiv.innerHTML = `
            <div class="message-header">
                <span class="sender">${sender}</span>
                <span class="time">${time}</span>
            </div>
            <div class="message-content">${text}</div>
        `;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Add system message
    function addSystemMessage(text) {
        const systemDiv = document.createElement('div');
        systemDiv.className = 'system-message';
        systemDiv.textContent = text;
        chatContainer.appendChild(systemDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // Send message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            addMessage('You', message, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            messageInput.value = '';
            
            // Simulate response
            setTimeout(() => {
                const randomUser = `user${Math.floor(Math.random() * 5) + 1}`;
                const responses = [
                    'Interesting!',
                    'Thanks for sharing',
                    'What do you mean by that?',
                    'I agree!',
                    'Can you explain more?'
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomUser, randomResponse, new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
            }, 1000 + Math.random() * 2000);
        }
    }
    
    // Event listeners
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
    
    roomSelect.addEventListener('change', (e) => {
        joinRoom(e.target.value);
    });
    
    // Join default room
    joinRoom('general');
}

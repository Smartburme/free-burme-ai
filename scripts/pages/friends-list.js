export function init() {
    console.log('Friends List page initialized');
    
    const friendsList = document.getElementById('friendsList');
    const searchInput = document.getElementById('friendSearch');
    const addFriendBtn = document.getElementById('addFriendBtn');
    const addFriendModal = document.getElementById('addFriendModal');
    const addFriendForm = document.getElementById('addFriendForm');
    
    // Sample friends data
    let friends = [
        { id: 1, name: 'မင်းထက်အောင်', status: 'online', lastSeen: '' },
        { id: 2, name: 'အေးချမ်းမြ', status: 'online', lastSeen: '' },
        { id: 3, name: 'ဇင်မာလွင်', status: 'offline', lastSeen: '2 hours ago' },
        { id: 4, name: 'ကျော်ဇေယျ', status: 'offline', lastSeen: '1 day ago' }
    ];
    
    // Render friends list
    function renderFriends(filter = '') {
        friendsList.innerHTML = '';
        
        const filteredFriends = friends.filter(friend => 
            friend.name.toLowerCase().includes(filter.toLowerCase())
        );
        
        if (filteredFriends.length === 0) {
            friendsList.innerHTML = '<p class="no-friends">No friends found</p>';
            return;
        }
        
        filteredFriends.forEach(friend => {
            const friendElement = document.createElement('div');
            friendElement.className = `friend-item ${friend.status}`;
            friendElement.innerHTML = `
                <div class="friend-avatar">
                    <i class="fas fa-user"></i>
                    <span class="status-indicator"></span>
                </div>
                <div class="friend-info">
                    <h3>${friend.name}</h3>
                    <p>${friend.status === 'online' ? 'Online' : `Last seen ${friend.lastSeen}`}</p>
                </div>
                <button class="chat-btn" data-id="${friend.id}">
                    <i class="fas fa-comment"></i>
                </button>
            `;
            friendsList.appendChild(friendElement);
        });
        
        // Add event listeners to chat buttons
        document.querySelectorAll('.chat-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const friendId = parseInt(btn.dataset.id);
                startChatWithFriend(friendId);
            });
        });
    }
    
    // Search friends
    searchInput.addEventListener('input', (e) => {
        renderFriends(e.target.value);
    });
    
    // Start chat with friend
    function startChatWithFriend(friendId) {
        const friend = friends.find(f => f.id === friendId);
        if (friend) {
            window.location.hash = `#/friends-chat/${friendId}`;
        }
    }
    
    // Add friend modal
    addFriendBtn.addEventListener('click', () => {
        addFriendModal.style.display = 'block';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === addFriendModal) {
            addFriendModal.style.display = 'none';
        }
    });
    
    // Add friend form submission
    addFriendForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('friendUsername').value.trim();
        
        if (username) {
            // Simulate adding friend
            const newFriend = {
                id: friends.length + 1,
                name: username,
                status: 'offline',
                lastSeen: 'just now'
            };
            
            friends.unshift(newFriend);
            renderFriends();
            addFriendModal.style.display = 'none';
            addFriendForm.reset();
            
            // Show success message
            alert(`Friend request sent to ${username}`);
        }
    });
    
    // Initial render
    renderFriends();
}

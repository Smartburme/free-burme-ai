import { loadPage } from './router/router.js';
import { initSettingsModal } from './components/settings-modal.js';

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize router
    loadPage();
    
    // Initialize settings modal
    initSettingsModal();
    
    // Highlight active menu item
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // New chat button functionality
    const newChatBtn = document.getElementById('newChatBtn');
    newChatBtn.addEventListener('click', () => {
        // Implement new chat functionality
        console.log('New chat started');
        window.location.hash = '#/chat';
        loadPage();
    });
});

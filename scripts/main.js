/**
 * Free-Burme-AI Main Application Script
 * Handles core application initialization and global functionality
 */

import { loadPage } from './router/router.js';
import { initSettingsModal } from './components/settings-modal.js';
import { initAuth } from './services/auth.js';

// Application state
const appState = {
    currentPage: null,
    userPreferences: {
        darkMode: false,
        language: 'my'
    },
    activeChats: []
};

// DOM Elements cache
const domElements = {
    navbar: document.querySelector('.navbar'),
    sidebar: document.querySelector('.sidebar'),
    mainContent: document.getElementById('mainContent'),
    settingsBtn: document.getElementById('settingsBtn'),
    newChatBtn: document.getElementById('newChatBtn'),
    menuItems: document.querySelectorAll('.menu-item')
};

/**
 * Initialize the application
 */
async function initApp() {
    try {
        // Load user preferences from localStorage
        loadPreferences();
        
        // Initialize authentication
        await initAuth();
        
        // Initialize router
        setupRouter();
        
        // Initialize UI components
        setupUI();
        
        // Load initial page based on URL
        loadInitialPage();
        
        console.log('Free-Burme-AI initialized successfully');
    } catch (error) {
        console.error('Application initialization failed:', error);
        showErrorScreen();
    }
}

/**
 * Load user preferences from localStorage
 */
function loadPreferences() {
    const savedPrefs = localStorage.getItem('userPreferences');
    if (savedPrefs) {
        appState.userPreferences = JSON.parse(savedPrefs);
        applyPreferences();
    }
}

/**
 * Apply user preferences to the UI
 */
function applyPreferences() {
    // Apply dark mode if enabled
    if (appState.userPreferences.darkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // Apply language preference
    document.documentElement.lang = appState.userPreferences.language;
}

/**
 * Set up the router and event listeners
 */
function setupRouter() {
    // Load initial page and handle hash changes
    window.addEventListener('load', loadPage);
    window.addEventListener('hashchange', handleRouteChange);
}

/**
 * Handle route changes
 */
function handleRouteChange() {
    // Update active menu item
    updateActiveMenuItem();
    
    // Load the new page
    loadPage();
}

/**
 * Set up UI components and event listeners
 */
function setupUI() {
    // Settings button
    domElements.settingsBtn.addEventListener('click', () => {
        initSettingsModal(appState.userPreferences);
    });
    
    // New chat button
    domElements.newChatBtn.addEventListener('click', startNewChat);
    
    // Menu items
    domElements.menuItems.forEach(item => {
        item.addEventListener('click', handleMenuItemClick);
    });
}

/**
 * Update the active menu item based on current route
 */
function updateActiveMenuItem() {
    const currentPath = window.location.hash.substring(2).split('/')[0] || 'chat';
    
    domElements.menuItems.forEach(item => {
        const itemPage = item.dataset.page;
        item.classList.toggle('active', itemPage === currentPath);
    });
}

/**
 * Handle menu item clicks
 */
function handleMenuItemClick(e) {
    e.preventDefault();
    const menuItem = e.currentTarget;
    
    // Update active state
    domElements.menuItems.forEach(item => item.classList.remove('active'));
    menuItem.classList.add('active');
    
    // Update URL hash
    const targetPage = menuItem.dataset.page;
    window.location.hash = `#/${targetPage}`;
}

/**
 * Start a new chat session
 */
function startNewChat() {
    // In a real implementation, this would reset chat state
    console.log('Starting new chat session');
    window.location.hash = '#/chat';
}

/**
 * Load the initial page based on URL
 */
function loadInitialPage() {
    if (!window.location.hash) {
        window.location.hash = '#/chat';
    } else {
        loadPage();
    }
}

/**
 * Show error screen if initialization fails
 */
function showErrorScreen() {
    domElements.mainContent.innerHTML = `
        <div class="error-screen">
            <h1>Application Error</h1>
            <p>Sorry, we couldn't initialize the application. Please try refreshing the page.</p>
            <button id="reloadBtn" class="btn-primary">Reload Page</button>
        </div>
    `;
    
    document.getElementById('reloadBtn').addEventListener('click', () => {
        window.location.reload();
    });
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', initApp);

// Export for testing purposes
export { appState, domElements };

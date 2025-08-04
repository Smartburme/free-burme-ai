/**
 * Free-Burme-AI Main Application Entry Point
 * GitHub Auto-Run API နဲ့ချိတ်ဆက်ထားသော Version
 */

// Core Modules
import { initializeRouter } from './router/router.js';
import { setupAuth } from './services/auth.js';
import { connectToAPI } from './services/api.js';

// UI Components
import { initNavbar } from './components/navbar.js';
import { initSidebar } from './components/sidebar.js';
import { initSettingsModal } from './components/settings-modal.js';

// Application State
const AppState = {
  currentUser: null,
  preferences: {
    darkMode: localStorage.getItem('darkMode') === 'true',
    language: localStorage.getItem('lang') || 'my',
    theme: localStorage.getItem('theme') || 'default'
  },
  apiConnection: null,
  currentPage: null,
  notifications: []
};

// DOM Cache
const DOM = {
  appContainer: document.querySelector('.app-container'),
  mainContent: document.getElementById('mainContent'),
  loadingIndicator: document.createElement('div')
};

/**
 * Application Initialization
 */
async function initApplication() {
  try {
    // 1. Setup Loading Indicator
    setupLoadingIndicator();
    
    // 2. Initialize Services
    await initializeServices();
    
    // 3. Setup UI Components
    setupUIComponents();
    
    // 4. Initialize Router
    await initializeRouter();
    
    // 5. Finalize Setup
    finalizeSetup();
    
    console.log('Free-Burme-AI initialized successfully with GitHub API connection');
    
  } catch (error) {
    console.error('Application initialization failed:', error);
    showFatalError(error);
  }
}

/**
 * Initialize Core Services
 */
async function initializeServices() {
  // 1. Authentication
  AppState.currentUser = await setupAuth();
  
  // 2. API Connection (GitHub Auto-Run)
  AppState.apiConnection = await connectToAPI({
    baseUrl: 'https://api.github.com',
    token: 'ghp_your_token_here', // GitHub token should be secured
    autoRun: true
  });
  
  // 3. Load User Preferences
  loadPreferences();
}

/**
 * Setup UI Components
 */
function setupUIComponents() {
  initNavbar(AppState);
  initSidebar(AppState);
  initSettingsModal(AppState);
  
  // Theme Setup
  if (AppState.preferences.darkMode) {
    document.body.classList.add('dark-mode');
  }
}

/**
 * Setup Loading Indicator
 */
function setupLoadingIndicator() {
  DOM.loadingIndicator.className = 'app-loading';
  DOM.loadingIndicator.innerHTML = `
    <div class="loading-spinner">
      <i class="fas fa-robot"></i>
      <p>Free-Burme-AI စတင်နေပါသည်...</p>
    </div>
  `;
  DOM.appContainer.appendChild(DOM.loadingIndicator);
}

/**
 * Finalize Setup
 */
function finalizeSetup() {
  // Remove Loading Indicator
  setTimeout(() => {
    DOM.loadingIndicator.classList.add('fade-out');
    setTimeout(() => DOM.loadingIndicator.remove(), 500);
  }, 1000);
  
  // Update UI State
  updateUIState();
}

/**
 * Load User Preferences
 */
function loadPreferences() {
  // Language
  document.documentElement.lang = AppState.preferences.language;
  
  // Theme
  const theme = AppState.preferences.theme;
  document.body.setAttribute('data-theme', theme);
  
  console.log('User preferences loaded:', AppState.preferences);
}

/**
 * Update UI State
 */
function updateUIState() {
  // Update User Info
  if (AppState.currentUser) {
    const userElements = document.querySelectorAll('.user-info');
    userElements.forEach(el => {
      el.querySelector('.username').textContent = AppState.currentUser.name;
    });
  }
  
  // Update Active Page
  if (AppState.currentPage) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      item.classList.toggle('active', item.dataset.page === AppState.currentPage);
    });
  }
}

/**
 * Show Fatal Error
 */
function showFatalError(error) {
  DOM.mainContent.innerHTML = `
    <div class="error-container">
      <div class="error-icon">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <h2>အက်ပ်စတင်ရာတွင် အမှားတစ်ခုဖြစ်နေပါသည်</h2>
      <p class="error-message">${error.message}</p>
      <div class="error-actions">
        <button id="reloadBtn" class="btn-primary">
          <i class="fas fa-sync-alt"></i> ပြန်လည်စတင်မည်
        </button>
        <button id="reportBtn" class="btn-secondary">
          <i class="fas fa-bug"></i> အမှားကိုသတင်းပို့မည်
        </button>
      </div>
    </div>
  `;
  
  document.getElementById('reloadBtn').addEventListener('click', () => {
    window.location.reload();
  });
  
  document.getElementById('reportBtn').addEventListener('click', () => {
    window.open(
      `https://github.com/your-repo/issues/new?title=App+Error&body=${encodeURIComponent(error.stack)}`,
      '_blank'
    );
  });
}

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', initApplication);

// Export for testing
export { AppState, DOM, initApplication };

export function initSettingsModal() {
    const modal = document.getElementById('settingsModal');
    const settingsBtn = document.getElementById('settingsBtn');
    const closeBtn = document.getElementById('closeSettingsBtn');
    const modalContent = document.querySelector('.modal-content');
    
    // Current settings tab
    let currentTab = null;
    
    // Tab components
    const tabs = {
        profile: {
            title: 'Edit Profile',
            content: `
                <div class="settings-tab-content">
                    <div class="form-group">
                        <label for="profileName">Name</label>
                        <input type="text" id="profileName" placeholder="Enter your name">
                    </div>
                    <div class="form-group">
                        <label for="profileBio">Bio</label>
                        <textarea id="profileBio" rows="3" placeholder="Tell us about yourself"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="profilePhoto">Profile Photo</label>
                        <input type="file" id="profilePhoto" accept="image/*">
                    </div>
                    <button id="saveProfileBtn" class="btn-primary">Save Changes</button>
                </div>
            `,
            init: function() {
                // Load current profile data
                document.getElementById('profileName').value = localStorage.getItem('profileName') || '';
                document.getElementById('profileBio').value = localStorage.getItem('profileBio') || '';
                
                // Save button
                document.getElementById('saveProfileBtn').addEventListener('click', saveProfile);
            }
        },
        language: {
            title: 'Language Settings',
            content: `
                <div class="settings-tab-content">
                    <div class="form-group">
                        <label for="appLanguage">App Language</label>
                        <select id="appLanguage">
                            <option value="my">မြန်မာ</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="aiLanguage">AI Response Language</label>
                        <select id="aiLanguage">
                            <option value="my">မြန်မာ</option>
                            <option value="en">English</option>
                            <option value="mixed">Mixed</option>
                        </select>
                    </div>
                    <button id="saveLanguageBtn" class="btn-primary">Save Preferences</button>
                </div>
            `,
            init: function() {
                // Load current language settings
                document.getElementById('appLanguage').value = localStorage.getItem('appLanguage') || 'my';
                document.getElementById('aiLanguage').value = localStorage.getItem('aiLanguage') || 'my';
                
                // Save button
                document.getElementById('saveLanguageBtn').addEventListener('click', saveLanguage);
            }
        },
        about: {
            title: 'About Free-Burme-AI',
            content: `
                <div class="settings-tab-content">
                    <div class="about-logo">
                        <i class="fas fa-robot"></i>
                        <h3>Free-Burme-AI</h3>
                    </div>
                    <div class="about-info">
                        <p>Version: 1.0.0</p>
                        <p>Developed for Myanmar users</p>
                        <p>Powered by GitHub AI</p>
                    </div>
                    <div class="about-links">
                        <a href="#" class="about-link">
                            <i class="fas fa-book"></i> Documentation
                        </a>
                        <a href="#" class="about-link">
                            <i class="fas fa-shield-alt"></i> Privacy Policy
                        </a>
                        <a href="#" class="about-link">
                            <i class="fas fa-question-circle"></i> Help Center
                        </a>
                    </div>
                </div>
            `,
            init: function() {
                // No initialization needed for about tab
            }
        }
    };
    
    // Save profile function
    function saveProfile() {
        const name = document.getElementById('profileName').value;
        const bio = document.getElementById('profileBio').value;
        
        localStorage.setItem('profileName', name);
        localStorage.setItem('profileBio', bio);
        
        alert('Profile saved successfully!');
    }
    
    // Save language function
    function saveLanguage() {
        const appLanguage = document.getElementById('appLanguage').value;
        const aiLanguage = document.getElementById('aiLanguage').value;
        
        localStorage.setItem('appLanguage', appLanguage);
        localStorage.setItem('aiLanguage', aiLanguage);
        
        alert('Language preferences saved!');
    }
    
    // Open tab function
    function openTab(tabName) {
        if (!tabs[tabName]) return;
        
        currentTab = tabName;
        const tab = tabs[tabName];
        
        modalContent.innerHTML = `
            <span class="close-btn" id="closeSettingsBtn">&times;</span>
            <h2>${tab.title}</h2>
            ${tab.content}
        `;
        
        // Reinitialize close button
        document.getElementById('closeSettingsBtn').addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        // Initialize tab
        tab.init();
    }
    
    // Open modal with default tab
    settingsBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        openTab('profile'); // Default to profile tab
    });
    
    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Settings menu items
    document.getElementById('profileBtn').addEventListener('click', () => openTab('profile'));
    document.getElementById('languageBtn').addEventListener('click', () => openTab('language'));
    document.getElementById('aboutBtn').addEventListener('click', () => openTab('about'));
}

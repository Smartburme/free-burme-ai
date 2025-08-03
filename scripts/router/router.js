export async function loadPage() {
    const path = window.location.hash.substring(2) || 'chat';
    const mainContent = document.getElementById('mainContent');
    
    try {
        // Load the appropriate page template
        const response = await fetch(`templates/pages/${path}.html`);
        if (!response.ok) throw new Error('Page not found');
        
        const html = await response.text();
        mainContent.innerHTML = html;
        
        // Load the corresponding JS module
        const module = await import(`../pages/${path}.js`);
        if (module.init) module.init();
    } catch (error) {
        console.error('Error loading page:', error);
        mainContent.innerHTML = `
            <div class="error-message">
                <h2>404 - Page Not Found</h2>
                <p>The requested page could not be loaded.</p>
            </div>
        `;
    }
}

// Handle hash changes
window.addEventListener('hashchange', loadPage);

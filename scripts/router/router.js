import { routes } from './routes.js';

export async function loadPage() {
    const path = window.location.hash.substring(2).split('/');
    const mainPath = path[0] || 'chat';
    const route = routes[mainPath] || routes['chat'];
    
    const mainContent = document.getElementById('mainContent');
    
    try {
        // Load the template
        const response = await fetch(`templates/pages/${route.template}.html`);
        if (!response.ok) throw new Error('Template not found');
        
        const html = await response.text();
        mainContent.innerHTML = html;
        
        // Update page title
        document.title = `${route.title} | Free-Burme-AI`;
        
        // Initialize the page with any additional parameters
        const params = path.slice(1);
        await route.init(params);
        
    } catch (error) {
        console.error('Error loading page:', error);
        mainContent.innerHTML = `
            <div class="error-message">
                <h2>404 - Page Not Found</h2>
                <p>The requested page could not be loaded.</p>
                <button id="goHomeBtn" class="btn-primary">Go to Home</button>
            </div>
        `;
        
        document.getElementById('goHomeBtn').addEventListener('click', () => {
            window.location.hash = '#/chat';
        });
    }
}

// Handle hash changes
window.addEventListener('hashchange', loadPage);

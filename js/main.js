// Theme toggle functionality
document.getElementById('theme-toggle').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Mode switching between chat/image/code
const modeButtons = document.querySelectorAll('.mode-selector button');
modeButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons
        modeButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Hide all input groups
        document.querySelectorAll('.input-group').forEach(group => {
            group.classList.add('hidden');
        });
        
        // Show selected input group
        const mode = this.getAttribute('data-mode');
        document.getElementById(`${mode}-input`).classList.remove('hidden');
    });
});

// Initialize theme from localStorage
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
}

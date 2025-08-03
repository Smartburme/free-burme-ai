export function init() {
    console.log('Code Generator page initialized');
    
    const codeForm = document.getElementById('codeForm');
    const codeInput = document.getElementById('codePrompt');
    const languageSelect = document.getElementById('languageSelect');
    const codeResult = document.getElementById('codeResult');
    const copyBtn = document.getElementById('copyCodeBtn');
    const loadingIndicator = document.getElementById('codeLoading');
    
    codeForm.addEventListener('submit', generateCode);
    copyBtn.addEventListener('click', copyCode);
    
    async function generateCode(e) {
        e.preventDefault();
        
        const prompt = codeInput.value.trim();
        const language = languageSelect.value;
        
        if (!prompt) {
            alert('Please describe what code you want to generate');
            return;
        }
        
        try {
            // Show loading
            loadingIndicator.style.display = 'block';
            codeResult.innerHTML = '';
            
            // Simulate API call (replace with actual GitHub API integration)
            const generatedCode = await simulateCodeGeneration(prompt, language);
            
            // Display result
            codeResult.innerHTML = `<pre><code>${generatedCode}</code></pre>`;
            Prism.highlightAll(); // Assuming Prism.js is loaded for syntax highlighting
        } catch (error) {
            console.error('Code generation error:', error);
            codeResult.innerHTML = `<p class="error">Error generating code: ${error.message}</p>`;
        } finally {
            loadingIndicator.style.display = 'none';
        }
    }
    
    function copyCode() {
        const codeElement = codeResult.querySelector('code');
        if (codeElement) {
            navigator.clipboard.writeText(codeElement.textContent)
                .then(() => {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyBtn.textContent = originalText;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy code:', err);
                });
        }
    }
    
    function simulateCodeGeneration(prompt, language) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // This is a placeholder - replace with actual API call
                const codeExamples = {
                    'python': `# ${prompt}\ndef solution():\n    # Your code here\n    pass`,
                    'javascript': `// ${prompt}\nfunction solution() {\n    // Your code here\n}`,
                    'html': `<!-- ${prompt} -->\n<div class="container">\n    <!-- Your code here -->\n</div>`
                };
                
                resolve(codeExamples[language] || codeExamples['python']);
            }, 1500);
        });
    }
}

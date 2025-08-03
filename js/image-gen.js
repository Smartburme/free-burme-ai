document.getElementById('generate-btn').addEventListener('click', generateImage);

function generateImage() {
    const prompt = document.getElementById('image-prompt').value.trim();
    if (!prompt) return;
    
    // Show loading state
    const generateBtn = document.getElementById('generate-btn');
    generateBtn.disabled = true;
    generateBtn.textContent = 'ပုံထုတ်နေသည်...';
    
    // In a real app, this would call your image generation API
    setTimeout(() => {
        // Simulate API response
        const mockImages = [
            "https://via.placeholder.com/512/FF5733/FFFFFF?text=Generated+Image+1",
            "https://via.placeholder.com/512/33FF57/FFFFFF?text=Generated+Image+2",
            "https://via.placeholder.com/512/3357FF/FFFFFF?text=Generated+Image+3"
        ];
        
        const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
        
        // Add image to chat
        const chatDisplay = document.getElementById('chat-display');
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message ai';
        messageDiv.innerHTML = `
            <p>သင့်အတွက် ပုံထုတ်လုပ်ပြီးပါပြီ:</p>
            <img src="${randomImage}" alt="Generated image from prompt: ${prompt}" class="generated-image">
            <p class="image-prompt">Prompt: ${prompt}</p>
        `;
        chatDisplay.appendChild(messageDiv);
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
        
        // Save to history
        saveChatToHistory(`[ပုံထုတ်ရန်] ${prompt}`, `<img src="${randomImage}" alt="Generated image">`);
        
        // Reset button
        generateBtn.disabled = false;
        generateBtn.textContent = 'ပုံထုတ်မည်';
        document.getElementById('image-prompt').value = '';
    }, 2000);
}

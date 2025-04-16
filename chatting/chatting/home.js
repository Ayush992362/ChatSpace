let currentUser = '';
//three dots
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}
//user data store
function openChat(user) {
    currentUser = user;
    const chatHistoryDiv = document.getElementById('chat-history');
    chatHistoryDiv.innerHTML = '';

    const chatHistory = JSON.parse(localStorage.getItem(user)) || [];

    chatHistory.forEach(message => {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        chatHistoryDiv.appendChild(messageElement);
    });

    document.getElementById('message-input').value = '';
}
//send message
function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();
    if (message && currentUser) {
        
        const chatHistory = JSON.parse(localStorage.getItem(currentUser)) || [];
        chatHistory.push(message);

        localStorage.setItem(currentUser, JSON.stringify(chatHistory));

        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        document.getElementById('chat-history').appendChild(messageElement);

        messageInput.value = '';
    }
}
//search user 
document.querySelector('.search-box input').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    const chatItems = document.querySelectorAll('.chat-list li');

    chatItems.forEach(item => {
        const userName = item.textContent.toLowerCase();
        if (userName.includes(searchQuery)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});



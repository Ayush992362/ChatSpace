// Register a new user and save to localStorage
function registerUser() {
    const username = document.getElementById('registration-username').value.trim();
    if (username) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (!users.includes(username)) {
            users.push({ username: username }); // Store username as an object with a username property
            localStorage.setItem('users', JSON.stringify(users));
            updateChatList(users);
            document.getElementById('registration-username').value = ''; // Clear input after registration
            
            // Redirect to the login page
            window.location.href = 'login.html';
        } else {
            alert('Username already exists.');
        }
    } else {
        alert('Please enter a username.');
    }
}

// Update chat list
function updateChatList(users) {
    const chatList = document.querySelector('.chat-list');
    chatList.innerHTML = '';

    users.forEach((user) => {
        const listItem = document.createElement('li');
        listItem.textContent = user.username;
        chatList.appendChild(listItem);
    });
}

// Initial chat list update on page load
document.addEventListener('DOMContentLoaded', function() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    updateChatList(users);
});

// Search functionality
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

// Track the selected friend's ID
let selectedFriendId = null;

// Function to handle friend selection
function handleFriendSelection(event) {
    const friendId = event.target.getAttribute('data-id');
    selectedFriendId = friendId;
    document.getElementById('chat-with').textContent = `Chatting with ${event.target.textContent}`;
    loadMessages();
}

// Attach event listeners to friends list items
function attachFriendListeners() {
    document.querySelectorAll('#friends-list li').forEach(friend => {
        friend.addEventListener('click', handleFriendSelection);
    });
}

// Search Functionality
document.getElementById('search-bar').addEventListener('input', function() {
    let filter = this.value.toLowerCase();
    let friendsList = document.querySelectorAll('#friends-list li');
    
    friendsList.forEach(function(friend) {
        let text = friend.textContent.toLowerCase();
        if (text.includes(filter)) {
            friend.style.display = '';
        } else {
            friend.style.display = 'none';
        }
    });
});

// Save Messages to Local Storage
function sendMessage() {
    if (selectedFriendId === null) {
        alert('Please select a friend to chat with.');
        return;
    }

    let messageInput = document.getElementById('message-input');
    let message = messageInput.value.trim();
    
    if (message) {
        let chatMessages = document.getElementById('chat-messages');
        
        // Append new message to chat window with user style
        let messageElement = document.createElement('div');
        messageElement.className = 'message user-message'; // Add user-message class
        messageElement.innerHTML = `<strong>You:</strong> ${message}`; // Prepend "You:"
        chatMessages.appendChild(messageElement);

        // Retrieve existing messages and append the new one
        let storedMessages = JSON.parse(localStorage.getItem(`messages_${selectedFriendId}`)) || [];
        storedMessages.push({ sender: 'user', content: message });
        localStorage.setItem(`messages_${selectedFriendId}`, JSON.stringify(storedMessages));

        // Clear input field
        messageInput.value = '';
    } else {
        console.log('Message is empty. Not sending.');
    }
}

// Load Messages from Local Storage
function loadMessages() {
    if (selectedFriendId === null) return;

    let chatMessages = document.getElementById('chat-messages');
    chatMessages.innerHTML = ''; // Clear current messages

    let storedMessages = JSON.parse(localStorage.getItem(`messages_${selectedFriendId}`)) || [];
    
    storedMessages.forEach(function(message) {
        let messageElement = document.createElement('div');
        messageElement.className = message.sender === 'user' ? 'message user-message' : 'message friend-message';
        messageElement.innerHTML = message.sender === 'user' ? `<strong>You:</strong> ${message.content}` : message.content;
        chatMessages.appendChild(messageElement);
    });
}

// Toggle Friend Request Dropdown
function toggleFriendRequestDropdown() {
    closeAllDropdowns();
    let friendRequests = document.getElementById('friend-requests');
    friendRequests.style.display = friendRequests.style.display === 'block' ? 'none' : 'block';
}

// Event listener for friend request buttons
document.getElementById('friend-requests').addEventListener('click', function(event) {
    if (event.target.classList.contains('accept-btn')) {
        // Handle Accept button
        let friendRequest = event.target.closest('.friend-request');
        let friendName = friendRequest.querySelector('.friend-name').textContent.trim(); // Get friend name
        addFriendToList(friendName);
        friendRequest.remove(); // Remove from friend requests
    } else if (event.target.classList.contains('decline-btn')) {
        // Handle Decline button
        event.target.closest('.friend-request').remove(); // Remove from friend requests
    }
});

// Function to add a friend to the friends list
function addFriendToList(name) {
    let friendsList = document.querySelector('#friends-list');
    let newFriend = document.createElement('li');
    newFriend.textContent = name;
    newFriend.setAttribute('data-id', name.toLowerCase().replace(/\s+/g, '-')); // Assign a unique ID
    friendsList.appendChild(newFriend);
    attachFriendListeners(); // Re-attach listeners to include the new friend
}

// Toggle Three-Dot Menu
function toggleThreeDotMenu() {
    closeAllDropdowns();
    let optionsDropdown = document.querySelector('#options-button + .dropdown-content');
    optionsDropdown.style.display = optionsDropdown.style.display === 'block' ? 'none' : 'block';
}

// Close All Dropdowns
function closeAllDropdowns() {
    document.querySelectorAll('.dropdown-content').forEach(dropdown => {
        dropdown.style.display = 'none';
    });
}

// Event Listener for Clicking Outside Dropdowns
document.addEventListener('click', function(event) {
    const friendRequestDropdown = document.getElementById('friend-requests');
    const optionsDropdown = document.querySelector('#options-button + .dropdown-content');

    if (!event.target.closest('.dropdown') && !event.target.closest('#friend-requests') && !event.target.closest('#options-button')) {
        closeAllDropdowns();
    }
});

// Send Message on Enter Key Press
document.getElementById('message-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault(); // Prevent default Enter key behavior (e.g., new line in input field)
        sendMessage();
    }
});

// Attach event listeners to dropdown buttons
document.getElementById('friend-request-btn').addEventListener('click', toggleFriendRequestDropdown);
document.getElementById('options-button').addEventListener('click', toggleThreeDotMenu);

// Attach event listener to Send button
document.getElementById('send-button').addEventListener('click', sendMessage);

// Initialize: If a friend is pre-selected, load messages for that friend
window.addEventListener('load', function() {
    attachFriendListeners(); // Ensure listeners are set up

    // Optionally, you could set a default selected friend if needed
    if (selectedFriendId) {
        loadMessages();
    }
});


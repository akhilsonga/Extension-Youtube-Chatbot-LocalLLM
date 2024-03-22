// Function to send YouTube URL to Flask backend
// Function to send YouTube URL to Flask backend
function sendYouTubeUrlToBackend(youtubeUrl) {
    console.log('Sending YouTube URL:', youtubeUrl); // Log the YouTube URL before sending it

    fetch('http://127.0.0.1:5000/process_youtube_url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ youtube_url: youtubeUrl })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Server response:', data); // Log the server response
        // Handle the response from the backend
    })
    .catch(error => {
        console.error('Error sending YouTube URL:', error); // Log any errors that occur
    });
}

// Function to handle user input and respond
function handleUserInput(input) {
    if (input.toLowerCase() === 'hello') {
        return 'Hi there!';
    } else {
        // Assuming user input is a YouTube URL, send it to the backend
        sendYouTubeUrlToBackend(input);
        // You can also return a response immediately if needed
        return 'Processing the YouTube URL...';
    }
}

// Function to display the chat conversation
function displayChatMessage(message, isUser) {
    const chatContainer = document.getElementById('chat-container');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    if (isUser) {
        messageElement.classList.add('user-message');
    } else {
        messageElement.classList.add('bot-message');
    }
    chatContainer.appendChild(messageElement);
    // Scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;
    // Save the message to local storage
    saveMessageToLocalStorage(message, isUser);
}

// Function to save message to local storage
function saveMessageToLocalStorage(message, isUser) {
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.push({ message: message, isUser: isUser });
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
}

// Function to load chat history from local storage
function loadChatHistoryFromLocalStorage() {
    let chatHistory = JSON.parse(localStorage.getItem('chatHistory')) || [];
    chatHistory.forEach(function(item) {
        displayChatMessage(item.message, item.isUser);
    });
}

// Function to clear chat history and remove from local storage
function clearChat() {
    localStorage.removeItem('chatHistory');
    document.getElementById('chat-container').innerHTML = ''; // Clear chat container
}

// Load chat history when the page is opened or refreshed
document.addEventListener('DOMContentLoaded', function() {
    loadChatHistoryFromLocalStorage();
});

// Get user input and respond
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const userInput = event.target.value.trim();
        const response = handleUserInput(userInput);
        displayChatMessage('User: ' + userInput, true);
        displayChatMessage(response, false); // Display the response from the backend
        event.target.value = '';
    }
});

// Add event listener to clear chat button
document.getElementById('clear-chat-btn').addEventListener('click', function() {
    clearChat();
});

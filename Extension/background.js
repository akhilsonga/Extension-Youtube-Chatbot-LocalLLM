// Listen for messages from the content script or other parts of the extension
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'sendYouTubeUrl') {
        // Send the YouTube URL to the Flask backend
        sendYouTubeUrlToBackend(message.youtubeUrl, sendResponse);
        // Return true to indicate that sendResponse will be called asynchronously
        return true;
    }
});

// Function to send YouTube URL to Flask backend
function sendYouTubeUrlToBackend(youtubeUrl, callback) {
    fetch('http://127.0.0.1:5000/process_youtube_url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ youtube_url: youtubeUrl })
    })
    .then(response => response.json())
    .then(data => {
        // Pass the response back to the content script or popup
        callback(data);
    })
    .catch(error => {
        console.error('Error:', error);
        // Pass an error message back to the content script or popup
        callback({ error: 'Failed to communicate with the server.' });
    });
}

$('.button').click(function() {
      // Increment the click count in the label
    $('.label').html(function(i, val) {
        return val*1+1;
    });
  // Get the user's IP address (replace with your actual IP fetching function)
  let userIP = getUserIP();

  // Send a POST request to the backend to record the click
  fetch('/supa.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ip_address: userIP })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Update the click count on the frontend (e.g., using a WebSocket or Server-Sent Events)
    $('.label').text(data.totalClicks);
  })
  .catch(error => {
    console.error('Error sending click data:', error);
  });
});

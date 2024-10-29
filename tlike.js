toggleLike() {
  this.liked = !this.liked;

  // Get user IP address (replace with your preferred method)
  this.ipAddress = await getIpAddress();

  const data = {
    liked: this.liked,
    ipAddress: this.ipAddress,
  };

  // Send like/unlike data with POST request using Fetch API
  fetch('/your-endpoint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Like/Unlike response:', data);
  })
  .catch(error => {
    console.error('Error sending like/unlike data:', error);
  });

  // Animation code (optional, use CSS for better performance)
  // ...
}

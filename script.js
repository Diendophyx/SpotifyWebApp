const clientId = 'eb391e2da91f454abf0fe9c14ca33224'; // Replace with your Spotify client ID
const clientSecret = '1a3a8900128b48a0a8737ecddd8f0350'; // Replace with your Spotify client secret
const redirectUri = 'http://localhost:3000/callback'; // Replace with your redirect URI

// Function to get authorization code
function getAuthorizationCode() {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=user-top-read`;   

  window.location.href = authUrl;
}

function handleAuthorizationCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
  
    if (code) {
      getAccessToken(code);
    } else {
      console.error('Authorization code not found');
    }
  }

function getAccessToken(code) {
    const clientId = 'eb391e2da91f454abf0fe9c14ca33224';
    const clientSecret = '1a3a8900128b48a0a8737ecddd8f0350';
    const redirectUri = 'http://localhost:3000/callback';
  
    const   
   encodedCredentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  
    const data = new FormData();
    data.append('code', code);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', redirectUri);   
  
  
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${encodedCredentials}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(data)   
  
    };
  
    fetch('https://accounts.spotify.com/api/token', options)
      .then(response => response.json())
      .then(data => {
        // Handle the access token here
        console.log(data.access_token);
      })
      .catch(error => {
        console.error('Error fetching access token:', error);
      });
  }

// Function to fetch top tracks
function getTopTracks(accessToken) {
  // Implement logic to fetch user's top tracks using access token
}

function getTopTracks(accessToken) {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    };
  
    fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5', options)
      .then(response => response.json())
      .then(data => {
        displayTopTracks(data.items);
      })
      .catch(error => {
        console.error('Error fetching top tracks:', error);
      });
  }

// Function to display top tracks
function displayTopTracks(tracks) {
    // Sample track data (replace with actual data from Spotify API)
    const sampleTracks = [
      { name: 'Track 1', artists: [{ name: 'Artist 1' }] },
      { name: 'Track 2', artists: [{ name: 'Artist 2' }] },
      // ... more tracks
    ];
  
    // Replace this with your actual code to display the tracks
    console.log(sampleTracks);
  }

// Trigger authorization flow
getAuthorizationCode();
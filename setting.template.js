module.exports = {
    clientId: 'CLIENT-ID', // replace
    clientSecret: 'CLIENT-SECRET', // replace
    redirectUri: 'http://localhost:3000/callback', // add to callback url
    scopes: [
        'user-read-private',
        'playlist-modify-public',
        'playlist-modify-private'
    ],
    playlist_id: 'PLAYLIST-ID', // replace with https://open.spotify.com/playlist/{PLAYLIST_ID}?si=XXXXXXXXXXX
};

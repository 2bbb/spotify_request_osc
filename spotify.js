const exec = require('child_process').execSync;

const express = require('express');
const app = express();
app.listen(3000, () => console.log('listen on 3000'));

const SpotifyWebApi = require('spotify-web-api-node');

const setting = require('./setting.js');

let authorizationCode;

app.get('/login', function(req, res) {
    scopes = setting.scopes.join(' ');
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' + '&client_id=' + setting.clientId + (scopes ? '&scope=' + encodeURIComponent(scopes) : '') + '&redirect_uri=' + encodeURIComponent(setting.redirectUri));
});

app.get('/callback', function(req, res) {
    res.send('<html><body><script>window.close();</script></body></html>');
    console.log(req.query);
    authorizationCode = req.query.code;
});

const spotifyApi = new SpotifyWebApi(setting);

async function login() {
    exec('open http://localhost:3000/login');
    while(!authorizationCode) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    try {
        const response = await spotifyApi.authorizationCodeGrant(authorizationCode);
        spotifyApi.setRefreshToken(response.body.refresh_token);
        console.log(response);
        // cache.update(response.body);
        return response.body.access_token;
    } catch(err) {
        console.error('on authorizationCodeGrant', err);
        throw err;
    }
}

async function addTrack(uri) {
    try {
        await spotifyApi.refreshAccessToken();
        spotifyApi.setAccessToken(response.body.access_token);
    } catch(err) {
        console.log('failure to refresh');
    }
    try {
        console.log('track will be added: ', uri);
        const response = await spotifyApi.addTracksToPlaylist(
            setting.playlist_id,
            [ uri ]
        );
        console.log('track was added: ', response);
    } catch(err) {
        console.error('error on addTrack: ', err);
    }
}
const OSC = require('node-osc');
const server = new OSC.Server(22222, '0.0.0.0');
const client = new OSC.Server('localhost', 22223);

async function main() {
    try {
        access_token = await login();
        spotifyApi.setAccessToken(access_token);
    } catch(err) {
        console.log('Something went wrong!: ', err.message);
    }
    setInterval(async () => {
        try {
            const response = await spotifyApi.refreshAccessToken();
            spotifyApi.setAccessToken(response.body.access_token);
            console.log('access token is refreshed');
        } catch(err) {
            console.error('failure to refresh access token:', err);
        }
    }, 120000);
    server.on('message', ([address, ...packet], rinfo) => {
        console.log('on message', address, packet, rinfo);
        if(address == '/spotify') {
            if(packet.length) {
                addTrack(packet[0]);
            }
        }
    });
}

main();

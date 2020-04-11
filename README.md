# spotify request

## setup

```bash
cd /path/to/this_repository
npm i
cp setting.template.js setting.js
# edit setting.js
node spotify.js
# open maxpat spotify_hub.maxpat
```

## OSC
* port 22222
* message
    * /spotify SPOTIFY_TRACK_URI_SCHEME
        * ex. `/spotify spotify:track:1qg0mXvBVqXRNXyUMirn06`

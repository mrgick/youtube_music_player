
const CORS = [
    'https://docker-nginx-cors.onrender.com/'
]

let CORS_set = 0
function get_ytdl(error = false) {

    if (error) {
        ++CORS_set
        if (CORS_set > CORS.length) {
            CORS_set = CORS[0]
        }
    }

    return window.require('ytdl-core-browser')({
        proxyUrl: CORS[CORS_set]
    });
}


const CORS = [
    'https://youtube-cores.herokuapp.com/',
    'https://ytdlcors.herokuapp.com/',
    'https://cors-anywhere.herokuapp.com/'
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

function get_ytpl(error = false) {

    if (error) {
        ++CORS_set
        if (CORS_set > CORS.length) {
            CORS_set = CORS[0]
        }
    }

    return window.require('ytpl-browser')({
        proxyUrl: CORS[CORS_set]
    });
}

function get_ytsr(error = false) {

    if (error) {
        ++CORS_set
        if (CORS_set > CORS.length) {
            CORS_set = CORS[0]
        }
    }

    return window.require('ytsr-browser')({
        proxyUrl: CORS[CORS_set]
    });
}
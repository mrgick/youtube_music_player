async function get_data_from_video(url) {

    let info,
        ytdl = get_ytdl()

    try {
        info = await ytdl.getInfo(url)
    } catch (error) {
        console.log(error)
        ytdl = get_ytdl(error = true)
        info = await ytdl.getInfo(url)
    }

    console.log(info);
    let audio = ytdl.chooseFormat(info.formats, {
        quality: 'highestaudio',
        filter: 'audioonly'
    })

    if (audio.url) {
        return {
            audio: audio.url,
            title: info.videoDetails.title,
            image: info.videoDetails.thumbnails.at(-2),
            next: info.related_videos[0].id
        }
    } else {
        return null
    }
}

let CORS_set = 0
function get_ytdl(error = false) {

    const CORS = [
        'https://ytdlcors.herokuapp.com/',
        'https://cors-anywhere.herokuapp.com/'
    ]

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
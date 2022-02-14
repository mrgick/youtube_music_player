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

async function get_playlist(url) {

    let info,
        ytpl = get_ytpl()

    try {
        info = await ytpl(url)
    } catch (error) {
        console.log(error)
        ytdl = get_ytpl(error = true)
        info = await ytpl(url)
    }

    console.log(info);
    return info
}

async function search_youtube(word) {
    let info,
        ytsr = get_ytsr()

    try {
        info = await ytsr(word)
    } catch (error) {
        console.log(error)
        ytdl = get_ytsr(error = true)
        info = await ytsr(word)
    }

    console.log(info);
    return info
}
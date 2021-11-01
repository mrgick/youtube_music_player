async function get_data_from_video(url, ytdl) {
    let info = await ytdl.getInfo(url);
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
            next: info.related_videos[1].id
        }
    } else {
        return null
    }
}

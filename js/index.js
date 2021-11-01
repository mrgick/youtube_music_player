let next_recomended_video

async function set_video() {

    let ytdl = window.require('ytdl-core-browser')({
        proxyUrl: 'https://cors-anywhere.herokuapp.com/'
    });

    let url = video_url_yt.value ? video_url_yt.value : null

    if (url == null) {
        return
    }

    let video = await get_data_from_video(url, ytdl)
    if (video == null) {
        return
    }

    console.log(video);
    title_player.innerHTML = video.title
    image_player.src = video.image.url
    audio_player.src = video.audio
    next_recomended_video = video.next
    audio_player.play()

}

function find_next_video() {
    video_url_yt.value = 'https://www.youtube.com/watch?v=' + next_recomended_video
    set_video()
}

window.onload = function () {
    audio_player.addEventListener('ended', (event) => {
        console.log('Video stopped either because 1) it was over, ' +
            'or 2) no further data is available.');
        find_next_video()
    });
}
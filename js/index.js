let next_video = ''
let prev_video = ''

async function set_video() {

    let url = video_url_yt.value ? video_url_yt.value : null

    if (url == null) {
        return
    }

    let video = await get_data_from_video(url)
    if (video == null) {
        return
    }

    console.log(video);
    title_player.innerHTML = video.title
    image_player.src = video.image.url
    next_video = video.next
    audio_player.src = video.audio
    audio_player.play()
    set_volume()
}

function find_next_video(prev = false, next = false) {
    if (prev && prev_video != '') {
        if (video_url_yt.value) {
            next_video = video_url_yt.value.split('=')[1]
        }
        video_url_yt.value = 'https://www.youtube.com/watch?v=' + prev_video
        set_video()
    }
    else if (next && next_video != '') {
        if (video_url_yt.value) {
            prev_video = video_url_yt.value.split('=')[1]
        } 
        video_url_yt.value = 'https://www.youtube.com/watch?v=' + next_video
        set_video()
    }
    console.log(prev_video, next_video);
}

function set_volume() {
    audio_player.volume = volume_control.value / 1000
}

audio_player.addEventListener('ended', (event) => {
    console.log('Video stopped either because 1) it was over, ' +
        'or 2) no further data is available.');
    find_next_video(false, true)
});

audio_player.addEventListener("timeupdate", () => {
    let per = Math.round(audio_player.currentTime / audio_player.duration * 100)
    //console.log(per);
    progress_bar.value = per
});

progress_bar.addEventListener('change', (event) => {
    if (audio_player.duration) {
        audio_player.currentTime = (progress_bar.value / 100 * audio_player.duration)
    }
});

volume_control.addEventListener('change', (event) => {
    set_volume()
});


btn_stop_play.addEventListener('click', (event) => {
    //console.log(audio_player.paused);
    if (audio_player.paused) {
        audio_player.play()
    } else {
        audio_player.pause()
    }
})

btn_next.addEventListener('click', (event) => {
    find_next_video(false, true)
})

btn_prev.addEventListener('click', (event) => {
    find_next_video(true, false)
})
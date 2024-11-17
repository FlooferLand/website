use std::convert::From;
use std::string::ToString;
use web_sys::HtmlAudioElement;
use web_sys::wasm_bindgen::JsCast;
use web_sys::wasm_bindgen::prelude::Closure;
use yew::prelude::*;

#[derive(Properties, PartialEq)]
pub struct MediaPlayerProps {}

#[function_component(MediaPlayer)]
pub fn media_player(props: &MediaPlayerProps) -> Html {
    const DEFAULT_VOLUME: f64 = 0.3;
    let audio_ref = use_node_ref();
    let playlist = use_state(|| vec![
        "enasong.mp3".to_string(),
        "beepboxwitch.mp3".to_string(),
        "Mihro boss fight.mp3".to_string(),
        "stars remaster.mp3".to_string(),
        "thingsmaygetbetter.mp3".to_string(),
    ]);
    let playing = use_state(|| false);
    let current_track = use_state(|| 0);

    let play_or_pause_audio = {
        let audio_ref = audio_ref.clone();
        let playing = playing.clone();
        Callback::from(move |_| {
            let Some(audio) = audio_ref.cast::<HtmlAudioElement>() else { return };
            if !*playing {
                let _ = audio.play();
                playing.set(true);
            } else {
                let _ = audio.pause();
                playing.set(false);
            }
        })
    };
    let set_volume = {
        let audio_ref = audio_ref.clone();
        Callback::from(move |event: InputEvent| {
            let input = event.target_unchecked_into::<web_sys::HtmlInputElement>();
            if let Some(audio) = audio_ref.cast::<HtmlAudioElement>() {
                audio.set_volume(input.value_as_number());
            }
        })
    };

    // Set default volume on initial render
    use_effect_with(audio_ref.clone(), |audio_ref| {
        if let Some(audio) = audio_ref.cast::<HtmlAudioElement>() {
            audio.set_volume(DEFAULT_VOLUME);
        }
    });
    
    // Automatically play the next track when the current track ends
    {
        let current_track = current_track.clone();
        let playlist_len = playlist.len();
        use_effect_with(audio_ref.clone(), move |audio_ref| {
            if let Some(audio) = audio_ref.cast::<HtmlAudioElement>() {
                let on_ended = Closure::wrap(Box::new(move |_event: Event| {
                    current_track.set((*current_track + 1) % playlist_len);
                }) as Box<dyn FnMut(_)>);

                audio
                    .set_onended(Some(on_ended.as_ref().unchecked_ref()));

                // Keep the closure alive
                on_ended.forget();
            }
        });
    }

    // Update audio on track change
    {
        let audio_ref = audio_ref.clone();
        let current_track = current_track.clone();
        let playlist = playlist.clone();
        use_effect_with((audio_ref.clone(), current_track.clone()), move |(audio_ref, current_track)| {
            if let Some(audio) = audio_ref.cast::<HtmlAudioElement>() {
                audio.set_src(&format!("/static/audio/music/{}", &playlist[*current_track.clone()]));
                let _ = audio.play();
            }
        });
    }

    html!(<div class={classes!("media-player")}>
        <audio id="mp-audio" ref={audio_ref} />
        <p id="mp-name" style="display: inline-block">{&playlist[*current_track.clone()]}</p>
        <button id="mp-play" onclick={play_or_pause_audio}>{if *playing { "Pause" } else { "Play" }}</button>
        <input id="mp-volume" type="range" min="0.0" max="1.0" step="0.01" value={DEFAULT_VOLUME.to_string()} oninput={set_volume}/>
        <p style="display: block"><i>{"(work in progress!)"}</i></p>
    </div>)
}
use web_sys::window;
use crate::media_player::MediaPlayer;
use crate::social::SocialLinkSection;
use yew::{html, Html};
use yew_macro::classes;
use yew_router::prelude::*;
use crate::birthday_counter::BirthdayCounter;
use crate::interests_list::InterestsListSection;
use crate::webring::WebRing;

#[derive(Routable, Clone, PartialEq)]
pub enum Route {
    #[at("/")]
    Home,

    #[at("/games")]
    Games,

    #[at("/blog")]
    Blog,

    #[at("/login")]
    Login,
    
    #[at("/email")]
    Email,

    #[not_found]
    #[at("/404")]
    NotFound,
}

pub fn switch(route: Route) -> Html {
    let is_mobile = {
        let window = window();
        window.map(|w| {
            let width = w.inner_width().unwrap_or_default().as_f64().unwrap_or_default();
            let height = w.inner_height().unwrap_or_default().as_f64().unwrap_or_default();
            height > width
        }).unwrap_or(false)
    };
    
    match route {
        Route::Home => {
            html!(<>
                <div class={classes!("user_icon")}>
                    <div style="--img: url(https://avatars.githubusercontent.com/u/76737186)" />
                </div>
                <p> {"haii i'm Floof. I'm a trans-fem furry software and game developer from Europe!"} </p>
                <p> {"I make games, music, art, 3D models, and some other stuff!"} </p>
                
                <div style={ if !is_mobile { "display:grid; grid-template-columns: repeat(4, 1fr);" } else { "" } }>
                    <MediaPlayer />
                    <BirthdayCounter />
                    <WebRing />
                </div>
                
                <hr/>
                <div style={ if !is_mobile { "display: flex" } else { "" } }>
                    <InterestsListSection />
                    <SocialLinkSection />
                </div>
            </>)
        }
        
        Route::Email => {
            html!(<>
                <h3> { "my e-mail address!!" } </h3>
                <p> <i> { "note: this page is extra silly to fight against bots" } </i> </p>
                <p style="display: inline-block">
                    { "Contact me at " }
                    <span style="color: pink">
                        {"yunaflarf"} <div class={classes!("dot_warner")}/> {"contact"} { " at " } {"gmail"} <div class={classes!("dot_warner")}/> {"com"}
                    </span>
                </p>
            </>)
        }
        
        Route::NotFound => {
            html!(<>
                <h2> {"404"} </h2>
                <p> {"Page not found"} </p>
            </>)
        }

        // Redirects (for now)
        Route::Games | Route::Blog | Route::Login => {
            html!(<>
                <h3>{"Missing content"}</h3>
                <br/>
            </>)
        }
    }
}

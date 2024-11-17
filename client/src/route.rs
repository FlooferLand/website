use yew::{html, Html};
use yew_router::prelude::*;
use crate::media_player::MediaPlayer;
use crate::social::SocialLinkSection;

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

    #[not_found]
    #[at("/404")]
    NotFound,
}

pub fn switch(route: Route) -> Html {
    match route {
        Route::Home => {
            let card = html!(<a href={"https://flooferland.carrd.co#text02"}>{"https://flooferland.carrd.co"}</a>);
            html!(<>
                <img width={64} style={""} src={"https://avatars.githubusercontent.com/u/76737186"} />
                <p> {"haii i'm Floof. I'm a trans-fem furry software and game developer from Europe!"} </p>
                <p> {"I make games, music, art, 3D models, and some other stuff!"} </p>
                <p> {"View more about me on" } <a href={card}>{card}</a> {"please!"} <i> {"(currently still migrating things))"} </i> </p>
                
                <MediaPlayer />
                
                <hr/>
                <SocialLinkSection />
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

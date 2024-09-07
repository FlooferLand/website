use yew::{html, Html};
use yew_router::prelude::*;

#[derive(Routable, Clone, PartialEq)]
pub enum Route {
    #[at("/")]
    Home,

    #[not_found]
    #[at("/404")]
    NotFound,
}

pub fn switch(route: Route) -> Html {
    match route {
        Route::Home => {
            html!(<>
                <p> {"haii i'm Floof. I like playing games, making games, and making music"} </p>
            </>)
        }
        Route::NotFound => {
            html!(<>
                <h2> {"404"} </h2>
                <p> {"Page not found"} </p>
            </>)
        }
    }
}

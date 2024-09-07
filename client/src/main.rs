mod route;
mod navbar;

use yew::prelude::*;
use yew_router::prelude::*;
use yew_router::{BrowserRouter, Switch};
use crate::navbar::{NavBar, NavButton};
use crate::route::{switch, Route};

#[function_component(App)]
fn app() -> Html {
    html! { <>
        <div>
            <NavBar>
                <NavButton name={"Home"} route={Route::Home} />
                <NavButton name={"Test"} route={Route::NotFound} />
            </NavBar>
        </div>
        <BrowserRouter>
            <Switch<Route> render={switch} />
        </BrowserRouter>
    </> }
}

fn main() {
    yew::Renderer::<App>::new().render();
}

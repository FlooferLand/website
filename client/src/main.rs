mod media_player;
mod navbar;
mod route;
mod social;
mod interests_list;
mod birthday_counter;

use crate::navbar::{NavBar, NavButton};
use crate::route::{switch, Route};
use yew::prelude::*;
use yew_router::{BrowserRouter, Switch};

#[function_component(App)]
fn app() -> Html {
    let login_tooltip_visible = use_state(|| false);
    let on_mouse_over = {
        let visible = login_tooltip_visible.clone();
        Callback::from(move |_| {
            visible.set(true);
        })
    };
    let on_mouse_out = {
        let visible = login_tooltip_visible.clone();
        Callback::from(move |_| {
            visible.set(false);
        })
    };

    html! {
        <div id={"body-inner"}>
            <div>
                <NavBar>
                    <NavButton name={"Home"} route={Route::Home} />
                    <NavButton name={"Games"} route={Route::Games} />
                    <NavButton name={"Blog"} route={Route::Blog} />

                    <NavButton
                        name={"Login"}
                        route={Route::Login}
                        right={true}
                        on_mouse_over={on_mouse_over}
                        on_mouse_out={on_mouse_out}
                    />
                    if *login_tooltip_visible {
                        <p style="float: right; color: white">
                            { "Not implemented yet!" }
                        </p>
                    }
                </NavBar>
            </div>
            <div id={"route-content"}>
                <BrowserRouter>
                    <Switch<Route> render={switch} />
                </BrowserRouter>

                <hr/>
                <footer>
                    <p>{"Built using Rust, Yew and Actix-Web"}</p>
                </footer>
            </div>
        </div>
    }
}

fn main() {
    yew::Renderer::<App>::new().render();
}

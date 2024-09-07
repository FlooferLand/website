use yew::prelude::*;
use yew_router::Routable;
use crate::route::Route;

#[derive(Properties, PartialEq)]
pub struct NavbarProps {
    pub children: Html
}

#[function_component(NavBar)]
pub fn navbar(props: &NavbarProps) -> Html {
    html! {
        <div class="nav-bar">
            <ul>
                { props.children.clone() }
            </ul>
            <br/>
        </div>
    }
}

#[derive(Properties, PartialEq)]
pub struct NavbuttonProps {
    pub name: String,
    pub route: Route
}

#[function_component(NavButton)]
pub fn navbutton(props: &NavbuttonProps) -> Html {
    html! {
        <li class="nav-button">
            <a href={ props.route.clone().to_path() }>{ &props.name }</a>
        </li>
    }
}

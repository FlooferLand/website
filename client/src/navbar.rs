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
        <div class={classes!("navbar")}>
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
    pub route: Route,
    #[prop_or(false)] pub right: bool,
    #[prop_or(None)] pub on_mouse_over: Option<Callback<MouseEvent>>,
    #[prop_or(None)] pub on_mouse_out: Option<Callback<MouseEvent>>
}

#[function_component(NavButton)]
pub fn navbutton(props: &NavbuttonProps) -> Html {
    html! {
        <li class={classes!("navbutton")} style={format!("float: {};", if props.right { "right" } else { "left" })}>
            <a
                href={ props.route.clone().to_path() }
                onmouseover={&props.on_mouse_over.clone().unwrap_or_default()}
                onmouseout={&props.on_mouse_out.clone().unwrap_or_default()}
            >
                { &props.name }
            </a>
        </li>
    }
}

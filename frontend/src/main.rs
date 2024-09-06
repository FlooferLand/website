use yew::prelude::*;

#[function_component(App)]
fn app() -> Html {
    html! { <>
        <h1>{ "Welcome to my website!" }</h1>
        <p>{ "(Very work in progress yippe)" }</p>
    </> }
}

fn main() {
    yew::Renderer::<App>::new().render();
}

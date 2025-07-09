use yew::Html;
use yew_macro::{function_component, html};

#[function_component(WebRing)]
pub fn web_ring() -> Html {
	html! { <div class={"web-ring"}>
		<p> {"Part of the Very Tiny Guys web ring!"} </p>
		<a href={"https://flooferland.com"} style={"margin: 8px"}>
			<img src={"https://flooferland.com/assets/branding/webring.webp"} alt={""} style={"image-rendering: pixelated"} />
		</a>
		<a href={"https://winnerwind.in"} style={"margin: 8px"}>
			<img src={"https://assets.winnerwind.in/branding/button.gif"} alt={""} style={"image-rendering: pixelated"} />
		</a>
		<a href={"https://michdev.nekoweb.org"} style={"margin: 8px"}>
			<img src={"https://michdev.nekoweb.org/michdev-site.png"} alt={""} style={"image-rendering: pixelated"} />
		</a>
	</div> }
}

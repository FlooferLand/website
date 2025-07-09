use yew::{function_component, html, Html, Properties};
use yew_macro::classes;

#[derive(Properties, PartialEq)]
struct EntryProps {
	pub children: Html,
}

#[function_component(Entry)]
fn entry(props: &EntryProps) -> Html {
	html!(<li>
		<p> { props.children.clone() } </p>
	</li>)
}
#[function_component(InterestsListSection)]
pub fn interests_list_section() -> Html {
	let interests = markdown::to_html(include_str!("../assets/markdown/interests.md"));
	html!(<div style="flex: 1">
        <h3>{ "About me" }</h3>
		<div class={classes!("gradient_text", "interests_list")}> { Html::from_html_unchecked(interests.into()) } </div>
	</div>)
}

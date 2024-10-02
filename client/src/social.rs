use yew::prelude::*;
use yew_icons::{Icon, IconId};

#[derive(Properties, PartialEq)]
pub struct SocialButtonProps {
    #[prop_or(None)] pub icon: Option<IconId>,
    pub name: String,
    pub description: String,
    pub url: String
}

#[function_component(SocialButton)]
pub fn social_button(props: &SocialButtonProps) -> Html {
    html!(<li class={classes!("socials-button")}>
        if let Some(icon) = props.icon {
            <Icon icon_id={icon} />
        }
        <a href={props.url.clone()}>{&props.name}</a>
        <p><span>{&props.description}</span></p>
    </li>)
}

#[function_component(SocialLinkSection)]
pub fn social_link_section() -> Html {
    html!(<>
        <h3> {"Socials"} </h3>
        <ol class={classes!("socials-list")}>
            <SocialButton
                icon={IconId::BootstrapGithub}
                url={"https://github.com/FlooferLand"}
                name={"GitHub"}
                description={"My code projects are here!"}
            />
            <SocialButton
                icon={IconId::SimpleIconsKofi}
                url={"https://ko-fi.com/flooferland"}
                name={"Ko-Fi"}
                description={"(please donate)"}
            />
            <SocialButton
                icon={IconId::SimpleIconsItchdotio}
                url={"https://flooferland.itch.io"}
                name={"Itch.io"}
                description={"My games"}
            />
            <SocialButton
                icon={IconId::LucideGamepad}
                url={"https://flooferland.newgrounds.com"}
                name={"NewGrounds"}
                description={"My games (on the web) as well as music!"}
            />
            <SocialButton
                icon={IconId::BootstrapEye}
                url={"https://odysee.com/@FlooferLand"}
                name={"Odysee"}
                description={"YouTube-like videos (sometimes)"}
            />
            <SocialButton
                icon={IconId::SimpleIconsReddit}
                url={"https://reddit.com/u/FlooferLand"}
                name={"Reddit"}
                description={"Silly degenerate platform"}
            />
            <SocialButton
                icon={IconId::LucideMail}
                url={"mailto:yunaflarf.contact@gmail.com"}
                name={"Email"}
                description={"Silly degenerate platform"}
            />
        </ol>
    </>)
}

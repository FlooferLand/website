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
        { props.description.split("\n").map(|e| html!(<p><span>{e}</span></p>)).collect::<Html>() }
    </li>)
}

#[function_component(SocialLinkSection)]
pub fn social_link_section() -> Html {
    html!(<>
        <h3> {"Socials"} </h3>
        <ol class={classes!("socials-list")}>
            <SocialButton
                icon={IconId::SimpleIconsItchdotio}
                url={"https://flooferland.itch.io"}
                name={"Itch.io"}
                description={"My games"}
            />
            <SocialButton
                icon={IconId::BootstrapGithub}
                url={"https://github.com/FlooferLand"}
                name={"GitHub"}
                description={"My nerdy code projects"}
            />
            <SocialButton
                icon={IconId::LucideGamepad}
                url={"https://flooferland.newgrounds.com"}
                name={"Newgrounds"}
                description={"My games (on the web) as well as music and animations!"}
            />
            <SocialButton
                icon={IconId::SimpleIconsTumblr}
                url={"https://flooferland.tumblr.com"}
                name={"Tumblr"}
                description={"My blogs, posts, devlogs, hot takes, etc!\nAsk me questions here!"}
            />
            <SocialButton
                icon={IconId::SimpleIconsMastodon}
                url={"https://fandom.garden/@FlooferLand"}
                name={"Mastodon"}
                description={"Twitter but better"}
            />
            <SocialButton
                icon={IconId::SimpleIconsDiscord}
                url={"https://discord.com/flooferland"}
                name={"Discord"}
                description={"Contact me for personal stuff here! (being friends, etc)"}
            />
            <SocialButton
                icon={IconId::SimpleIconsKofi}
                url={"https://ko-fi.com/flooferland"}
                name={"Ko-Fi"}
                description={"Please donate here dear lord I am a broke 18 y/o and making stuff online isn't sustainable I am going to perish"}
            />
            <SocialButton
                icon={IconId::LucideMail}
                url={"mailto:yunaflarf.contact@gmail.com"}
                name={"Email"}
                description={"Contact me for business stuff here! (collabs, business questions, comissions, etc)"}
            />
            <SocialButton
                icon={IconId::BootstrapEye}
                url={"https://odysee.com/@FlooferLand"}
                name={"Odysee"}
                description={"Videos (sometimes)"}
            />
            <SocialButton
                icon={IconId::SimpleIconsYoutube}
                url={"https://youtube.com/@FlooferLand"}
                name={"YouTube"}
                description={"YouTube videos (sometimes)"}
            />
            <SocialButton
                icon={IconId::SimpleIconsReddit}
                url={"https://reddit.com/u/FlooferLand"}
                name={"Reddit"}
                description={"Silly degenerate platform"}
            />
        </ol>
    </>)
}

use chrono::{Utc, DateTime, Datelike, TimeZone};
use chrono_humanize::{Accuracy, Humanize, Tense};
use yew::Html;
use yew_macro::{classes, function_component, html, Properties};

#[derive(Properties, PartialEq)]
pub struct BirthdayCounterProps {}

#[function_component(BirthdayCounter)]
pub fn birthday_counter(_props: &BirthdayCounterProps) -> Html {
    let birthday = Utc.with_ymd_and_hms(2006, 04, 19, 0, 0, 0).unwrap();
    let now = Utc::now();
    let difference = now - birthday.with_year(now.year()).unwrap();
    let age = now.years_since(birthday).unwrap();
    
    let time_between: String = chrono_humanize::HumanTime::from(difference).to_text_en(Accuracy::Rough, Tense::Present);
    
    html!(<div class={classes!("birthday_counter")}>
        <h2>{"I'm "}{age}{" years old!"}</h2>
        <p>{time_between}{" until my birthday"}</p>
        <sub>{"April 19th 2006"}</sub>
    </div>)
}
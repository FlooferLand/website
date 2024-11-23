use actix_web::{get, web, HttpResponse, Responder};
use chrono::{Datelike, NaiveDate, Utc};
use serde::Deserialize;

#[derive(Deserialize)]
struct AgeQuery {
	date: String
}

#[get("age")]
pub async fn get_age(query: web::Query<AgeQuery>) -> impl Responder {
	let svg = match NaiveDate::parse_from_str(&query.date, "%d-%m-%Y") {
		Ok(date) => {
			let now = Utc::now().date_naive();
			let mut age = now.year() - date.year();
			if now.ordinal() < date.ordinal() {
				age -= 1;
			}
			
			include_str!("../assets/templates/badges/age.svg")
				.replace("{}", &age.to_string())
		},
		err => {
			let ye = &err.unwrap_or_default().to_string();
			include_str!("../assets/templates/badges/invalid.svg")
				.replace("{SIZE_X}", &(ye.len() as i32 * 20).to_string())
				.replace("{}", &ye)
		}
	};
	
	HttpResponse::Ok()
		.content_type("image/svg+xml")
		.body(svg)
}
use actix_web::{HttpRequest, Responder, get, web};
use askama::Template;
use serde::Deserialize;

use crate::pages::handle_route;

#[derive(Template)]
#[template(path = "audio_embed.html")]
struct AudioEmbed {
    path: String,
    mime: Option<String>
}

#[derive(Deserialize)]
struct QueryData {
    pub path: String
}

#[get("/audio_embed")]
pub async fn audio_embed(req: HttpRequest, data: web::Query<QueryData>) -> impl Responder {
    let guess = mime_guess::from_ext(&data.path);
    let template = AudioEmbed {
        path: data.path.to_owned(),
        mime: guess.first().map(|mime| mime.to_string())
    };
    handle_route(req, template)
}

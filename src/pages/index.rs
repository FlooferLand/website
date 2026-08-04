use actix_web::{HttpResponse, Responder, get};
use askama::Template;

use crate::{extensions::AskamaTemplateExtra, floof::Floof};

#[derive(Template)]
#[template(path = "pages/index.html")]
pub struct IndexPage {
    pub floof: Floof
}

#[get("/")]
pub async fn index() -> impl Responder {
    let template = IndexPage { floof: Floof::new() };
    HttpResponse::Ok()
        .content_type("text/html")
        .body(template.render_page())
}

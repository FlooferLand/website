use actix_web::{HttpRequest, Responder, get};
use askama::Template;

use crate::{floof::Floof, pages::handle_route};

#[derive(Template)]
#[template(path = "pages/index.html")]
pub struct IndexPage {
    pub floof: Floof
}

#[get("/")]
pub async fn index(req: HttpRequest) -> impl Responder {
    handle_route(req, IndexPage { floof: Floof::new() })
}

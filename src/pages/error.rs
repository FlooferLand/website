use actix_web::{HttpRequest, Responder, get};
use askama::Template;

use crate::pages::handle_route;

#[derive(Template)]
#[template(path = "pages/error.html")]
pub struct ErrorPage {
    pub name: String,
    pub info: Option<String>
}

#[get("/404")]
pub async fn error_404(req: HttpRequest) -> impl Responder {
    let template = ErrorPage {
        name: "404 not found".to_owned(),
        info: Some("".to_owned())
    };
    handle_route(req, template)
}
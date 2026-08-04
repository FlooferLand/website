use actix_web::{HttpResponse, Responder, get};
use askama::Template;

use crate::extensions::AskamaTemplateExtra;

#[derive(Template)]
#[template(path = "pages/error.html")]
pub struct ErrorPage {
    pub name: String,
    pub info: Option<String>
}

#[get("/404")]
pub async fn error_404() -> impl Responder {
    let template = ErrorPage {
        name: "404 not found".to_owned(),
        info: Some("".to_owned())
    };
    HttpResponse::Ok()
        .content_type("text/html")
        .body(template.render_page())
}
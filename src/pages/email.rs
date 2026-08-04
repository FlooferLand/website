use actix_web::{HttpResponse, Responder, get};
use askama::Template;

use crate::extensions::AskamaTemplateExtra;

#[derive(Template)]
#[template(path = "pages/email.html")]
struct EmailPage {

}

#[get("/email")]
pub async fn email() -> impl Responder {
    let template = EmailPage { };
    HttpResponse::Ok()
        .content_type("text/html")
        .body(template.render_page())
}

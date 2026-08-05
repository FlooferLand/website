use actix_web::{HttpRequest, Responder, get};
use askama::Template;

use crate::pages::handle_route;

#[derive(Template)]
#[template(path = "pages/email.html")]
struct EmailPage {

}

#[get("/email")]
pub async fn email(req: HttpRequest) -> impl Responder {
    let template = EmailPage { };
    handle_route(req, template)
}

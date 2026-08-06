use actix_web::{HttpRequest, HttpResponse};
use askama::Template;

use crate::extensions::AskamaTemplateExtra;

pub mod index;
pub mod email;
pub mod error;
pub mod audio_embed;

pub fn handle_route(_req: HttpRequest, template: impl Template) -> HttpResponse {
    // Debugging only
    // println!("{}", _req.headers().join("\n\t"));

    HttpResponse::Ok()
        .content_type("text/html")
        .body(template.render_page())
}

use actix_web::{HttpResponse, Responder, get};
#[allow(dead_code)]
use actix_web::{web, App, HttpServer};
use crate::{badges::get_age, compiler::SiteCompiler};

mod badges;
mod extensions;
mod templates;
mod compiler;
mod pages;
mod floof;

const ADDRESS: (&str, u16) = ("0.0.0.0", 8080);

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::thread::spawn(move || { SiteCompiler::setup_and_watch()});

    // Server
    println!("Server started at http://{}:{}/", "127.0.0.1", ADDRESS.1);
    HttpServer::new(|| {
        let mut app = App::new();

        // Client assets (must be the first)
        // Uses assets stored on GitHub when in release mode to sneakily save on bandwidth >:)
        /*#[cfg(not(debug_assertions))] {
            app = app.route("/assets/{filename:.*}", web::get().to(assets_redirect));
        }
        #[cfg(debug_assertions)] {
            app = app.service(
                actix_files::Files::new("/assets", "./build/assets").show_files_listing(),
            );
        }*/
        app = app.service(
            actix_files::Files::new("/assets", "./build/assets").show_files_listing(),
        );
        
        // HTML routes (must be the last)
        app
            .service(pages::email::email)
            .service(pages::error::error_404)
            .service(pages::index::index)
            .service(pages::audio_embed::audio_embed)
            .service(
                web::scope("/badges")
                    .service(get_age),
            )
            .service(
                web::scope("/api")
                    .service(api_index),
            )
    })
    .bind(ADDRESS)?
    .run()
    .await
}

#[get("/")]
pub async fn api_index() -> impl Responder {
    HttpResponse::Ok()
        .content_type("text/html")
        .body("<div> <h1>Actix!</h1> <p>This is the endpoint for my website's API!</p> </div>")
}

/*#[allow(dead_code)]
async fn assets_redirect(path: web::Path<String>) -> impl Responder {
    const ASSETS_DOMAIN: &str =
        "https://raw.githubusercontent.com/FlooferLand/website/refs/heads/main/build/assets";
    let full_url = format!("{ASSETS_DOMAIN}/{}", path.into_inner());
    HttpResponse::PermanentRedirect()
        .insert_header(("Location", full_url))
        .finish()
}*/

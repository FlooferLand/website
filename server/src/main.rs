mod blog;
mod paths;
mod badges;

use crate::blog::get_blogs;
use actix_web::{get, web, App, HttpRequest, HttpResponse, HttpServer, Responder};
use actix_web_lab::web::spa;
use crate::badges::get_age;

const ADDRESS: (&str, u16) = ("0.0.0.0", 8080);

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Server started at http://{}:{}/", "127.0.0.1:8080", ADDRESS.1);
    HttpServer::new(|| {
        let mut app = App::new();

        // Client assets (must be the first)
        // Uses assets stored on GitHub when in release mode to sneakily save on bandwidth >:)
        #[cfg(not(debug_assertions))] {
            app = app.route("/assets/{filename:.*}", web::get().to(assets_redirect));
        }
        #[cfg(debug_assertions)] {
            app = app.service(
                actix_files::Files::new("/assets", "../client/assets").show_files_listing(),
            );
        }

        // Badge service
        app = app.service(
            web::scope("/badges")
                .service(get_age),
        );
        
        // API service
        app = app.service(
            web::scope("/api")
                .service(api_home)
                .service(web::scope("/blog").service(get_blogs)),
        );

        // Work in progress redirects (TO REMOVE!!)
        app = app.route(
            "/games",
            web::get().to(|_: HttpRequest| simple_redirect("https://flooferland.netlify.app/")),
        );
        app = app.route(
            "/blog",
            web::get().to(|_: HttpRequest| simple_redirect("https://flooferland.tumblr.com/")),
        );
        app = app.route(
            "/carrd",
            web::get().to(|_: HttpRequest| simple_redirect("https://flooferland.carrd.co/")),
        );

        // Client (must be the last)
        app = app.service(
            spa()
                .index_file("../client/dist/index.html")
                .static_resources_mount("/")
                .static_resources_location("../client/dist/")
                .finish(),
        );

        app
    })
    .bind(ADDRESS)?
    .run()
    .await
}

#[get("/")]
async fn api_home() -> impl Responder {
    HttpResponse::Ok()
        .content_type("text/html")
        .body("<div> <h1>Actix!</h1> <p>This is the endpoint for my website's API!</p> </div>")
}

async fn simple_redirect(url: &str) -> impl Responder {
    HttpResponse::TemporaryRedirect()
        .insert_header(("Location", url))
        .finish()
}

#[allow(dead_code)]
async fn assets_redirect(path: web::Path<String>) -> impl Responder {
    const ASSETS_DOMAIN: &str =
        "https://raw.githubusercontent.com/FlooferLand/website/refs/heads/main/client/assets";
    let full_url = format!("{ASSETS_DOMAIN}/{}", path.into_inner());
    HttpResponse::PermanentRedirect()
        .insert_header(("Location", full_url))
        .finish()
}

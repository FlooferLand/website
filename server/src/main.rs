mod blog;
mod paths;

use actix_web::{get, web, App, HttpRequest, HttpResponse, HttpServer, Responder};
use actix_web_lab::web::spa;
use crate::blog::get_blogs;

const ADDRESS: (&str, u16) = ("0.0.0.0", 8080);

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Server started at http://{}:{}/", ADDRESS.0, ADDRESS.1);
    HttpServer::new(|| {
        let mut app = App::new();

        // Client assets (must be the first)
        // Uses assets stored on GitHub when in release mode to sneakily save on bandwidth >:)
        #[cfg(not(debug_assertions))] {
            app = app.route("/static/{filename:.*}", web::get().to(assets_redirect));
            app = app.service(
                spa()
                    .index_file("../client/dist/index.html")
                    .static_resources_mount("/")
                    .static_resources_location("../client/dist/")
                    .finish()
            );
        }
        #[cfg(debug_assertions)] {
            app = app.service(actix_files::Files::new("/static", "../client/static").show_files_listing());
        }

        // Client (must be the second)
        app = app.service(
            spa()
                .index_file("../client/dist/index.html")
                .static_resources_mount("/")
                .static_resources_location("../client/dist/")
                .finish()
        );
        
        // API service
        app = app.service(
            web::scope("/api")
                .service(api_home)
                .service(
                    web::scope("/blog")
                        .service(get_blogs)
                )
        );
        
        // Work in progress redirects (TO REMOVE!!)
        app = app.route("/games", web::get().to(|_: HttpRequest| simple_redirect("https://flooferland.netlify.app/")));
        app = app.route("/blog", web::get().to(|_: HttpRequest| simple_redirect("https://flooferland.tumblr.com/")));
        
        app
    }).bind(ADDRESS)?.run().await
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
    const ASSETS_DOMAIN: &str = "https://raw.githubusercontent.com/FlooferLand/website/refs/heads/main/client/static";
    let full_url = format!("{ASSETS_DOMAIN}/{}", path.into_inner());
    HttpResponse::PermanentRedirect()
        .insert_header(("Location", full_url))
        .finish()
}

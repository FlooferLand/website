mod blog;
mod paths;

use actix_web::{get, web, App, HttpResponse, HttpServer, Responder};
use actix_web_lab::web::spa;
use crate::blog::get_blogs;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Server started");
    HttpServer::new(|| {
        App::new()
            .service(
                web::scope("/api")
                    .service(home)
                    .service(
                        web::scope("/blog")
                            .service(get_blogs)
                    )
            )

            // Client (must be the last service)
            .service(
                spa()
                    .index_file("./client/dist/index.html")
                    .static_resources_mount("/")
                    .static_resources_location("./client/dist/")
                    .finish()
            )
    }).bind(("0.0.0.0", 8080))?.run().await
}

#[get("/")]
async fn home() -> impl Responder {
    HttpResponse::Ok()
        .content_type("text/html")
        .body("<div> <h1>Actix!</h1> <p>This is the endpoint for my website's API!</p> </div>")
}

use actix_web::{get, App, HttpResponse, HttpServer, Responder};
use actix_web_lab::web::spa;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(home)
            .service(  // Yew front-end
                spa()
                    .index_file("./frontend/dist/index.html")
                    .static_resources_mount("/")
                    .static_resources_location("./frontend/dist/")
                    .finish()
            )
    }).bind(("0.0.0.0", 8080))?.run().await
}

#[get("/api")]
async fn home() -> impl Responder {
    HttpResponse::Ok().body("Hello from Actix!")
}

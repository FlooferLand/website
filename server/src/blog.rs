use actix_web::{get, HttpResponse, Responder};

// TODO: Move to the Actix JSON deserializer instead of the serde_json one
#[get("/get")]
pub async fn get_blogs() -> impl Responder {
    if let Ok(blogs) = serde_json::to_string(&util::get_blogs()) {
        HttpResponse::Ok()
            .content_type("application/json")
            .body(blogs)
    } else {
        HttpResponse::InternalServerError()
            .finish()
    }
}

mod util {
    use std::path::Path;
    use cached::proc_macro::cached;
    use crate::paths;
    use common::blog::BlogMetadata;

    #[cached]
    pub(crate) fn get_blogs() -> Vec<BlogMetadata> {
        let mut response = Vec::new();
        if let Ok(blog_dir) = std::fs::read_dir(paths::BLOG) {
            for dir in blog_dir {
                let Ok(dir) = dir else { continue };
                let dir = dir.path();
                if !dir.is_dir() { continue }
                let Some(id) = dir.file_name() else { continue };
                let Ok(metadata) = get_blog_metadata(id.to_string_lossy().to_string()) else { continue };
                if metadata.published {
                    response.push(metadata.clone());
                }
            }
        }
        response
    }

    #[cached]
    pub(crate) fn get_blog_metadata(id: String) -> Result<BlogMetadata, String> {
        let path = Path::new(paths::BLOG).join(id).join("/metadata.yml");
        if let Ok(metadata) = std::fs::read_to_string(&path) {
            println!("{}", metadata);
            serde_yml::from_str::<BlogMetadata>(&metadata).map_err(|e| e.to_string())
        } else {
            Err(format!("Failed to read string at path \"{}\"", path.display()))
        }
    }

    #[cached]
    pub(crate) fn get_blog(id: String) -> Option<(BlogMetadata, String)> {
        let path = Path::new(paths::BLOG).join(&id);
        let markdown_path = path.join("/index.md");
        let Ok(metadata) = get_blog_metadata(id) else { return None };
        let Ok(markdown) = std::fs::read_to_string(markdown_path) else { return None };

        let html = markdown::to_html(&markdown);
        Some((metadata, html))
    }
}

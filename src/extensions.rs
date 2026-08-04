use askama::Template;

use crate::{pages::error::ErrorPage, templates::MiniTemplater};

pub trait AskamaTemplateExtra {
    fn render_safe(self) -> String;
    fn render_page(self) -> String;
}

impl <T> AskamaTemplateExtra for T where T: askama::Template {
    fn render_safe(self) -> String {
        match self.render() {
            Ok(v) => v,
            Err(err) => {
                ErrorPage {
                    name: "Failed to render template".to_owned(),
                    info: Some(err.to_string())
                }.render().unwrap()
            }
        }
    }

    fn render_page(self) -> String {
        let html = self.render_safe();
        match MiniTemplater::compile(&html) {
            Ok(v) => v,
            Err(err) => {
                println!("Failed to optimize page: {err}");
                html
            },
        }
    }
}

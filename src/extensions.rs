#![allow(unused)]
use actix_web::http::header::HeaderMap;
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

pub trait CollectionExtra {
    fn join(&self, sep: &str) -> String;
}
impl CollectionExtra for Vec<String> {
    fn join(&self, sep: &str) -> String {
        let mut out = String::new();
        for (i, elem) in self.iter().enumerate() {
            out += elem;
            if i < self.len() {
                out += sep;
            }
        }
        out
    }
}
impl CollectionExtra for HeaderMap {
    fn join(&self, sep: &str) -> String {
        let mut out = String::new();
        for (i, (name, value)) in self.iter().enumerate() {
            out += &format!("\"{}\": \"{}\"", name, value.to_str().unwrap_or("?"));
            if i < self.len() {
                out += sep;
            }
        }
        out
    }
}

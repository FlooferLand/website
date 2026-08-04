#![allow(dead_code)]

use anyhow::Context;
use lol_html::{AsciiCompatibleEncoding, Settings, element};
use markup_fmt::config::LanguageOptions;

pub struct MiniTemplater;
impl MiniTemplater {
    pub fn compile(page: &str) -> anyhow::Result<String> {
        let settings = Settings::new()
            .with_encoding(AsciiCompatibleEncoding::utf_8())
            .with_enable_esi_tags(true)
            .with_strict(true)
            .append_element_content_handler(element!(
                "fl\\:component",
                |el| {
                    let Some(path) = el.get_attribute("path") else { return Ok(()) };
                    let file = std::fs::read_to_string(format!("components/{path}.xhtml"))?;
                    el.replace(&file, lol_html::html_content::ContentType::Html);
                    Ok(())
                }
            ));

        let text = lol_html::rewrite_str(&page, settings).context("Failed to rewrite HTML")?;
        
        // Cleanup
        let options = markup_fmt::config::FormatOptions {
                language: LanguageOptions {
                    html_void_self_closing: Some(false),
                    .. Default::default()
                },
                .. Default::default()
            };
        let text = markup_fmt::format_text(
            &text,
            markup_fmt::Language::Html,
            &options,
            |code, _| Ok(code.into()),
        ).context("Failed to format HTML")?;

        // XML compatibility
        // let doc = xmloxide::html::parse_html(&text).context("Text should be valid XML")?;
        // let text = xmloxide::serial::serialize(&doc);
        // let text = text.replace(r#"<?xml version="1.0"?>"#, "");

        Ok(text)
    }
}

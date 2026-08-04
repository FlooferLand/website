use std::path::Path;

use fs_extra::dir::CopyOptions;
use sasso::{FsImporter, OutputStyle};
use walkdir::WalkDir;

pub struct SiteCompiler;
impl SiteCompiler {
    pub fn compile() {
        let _ = std::fs::remove_dir_all("./build");
        let _ = std::fs::create_dir_all("./build");
        fs_extra::dir::copy("./assets", "./build", &CopyOptions::default()).unwrap();

        println!("Building styles");
        let styles_dir = Path::new("./build/assets/styles");
        for entry in WalkDir::new(&styles_dir).into_iter().filter_map(|e| e.ok()) {
            if !entry.file_type().is_file() { continue }
            let Some(ext) = entry.path().extension() else { continue };
            if !ext.eq_ignore_ascii_case("scss") { continue };

            let err_format = |word: &str|
                format!("Failed to {word} style '{}'", entry.path().display());

            println!("|- {}", entry.path().display());
            let scss = std::fs::read_to_string(entry.path()).expect(&err_format("read"));
            let importer = FsImporter::new(vec![styles_dir.to_path_buf()]);
            let options = &sasso::Options::new()
                .with_style(OutputStyle::Expanded)
                .with_syntax(sasso::Syntax::Scss)
                .with_importer(&importer);
            let css = sasso::compile(&scss, options).expect(&err_format("compile"));
            if !css.is_empty() {
                std::fs::write(entry.path().with_extension("css"), css).expect(&err_format("write"));
                std::fs::remove_file(entry.path()).unwrap();
            }
        }       
    }
}

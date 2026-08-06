use std::{path::Path, time::Duration};

use anyhow::bail;
use fs_extra::dir::CopyOptions;
use notify_debouncer_full::{new_debouncer, notify::RecursiveMode};
use sasso::{FsImporter, OutputStyle};
use walkdir::{DirEntry, WalkDir};

pub struct SiteCompiler;
impl SiteCompiler {
    pub fn setup_and_watch() -> anyhow::Result<()> {
        // Spawning a watcher
        let (tx, rx) = std::sync::mpsc::channel();
        let mut debouncer = new_debouncer(Duration::from_millis(200), None, tx).unwrap();
        debouncer.watch(Path::new("./assets"), RecursiveMode::Recursive)?;

        // Compiling on a change
        Self::compile();
        for res in rx {
            match res {
                Ok(events) => {
                    let has_changed = events.iter().any(|ev|
                        ev.kind.is_create() || ev.kind.is_modify() || ev.kind.is_remove()
                    );
                    if has_changed {
                        Self::compile();
                    }
                },
                Err(errors) =>
                    println!("Error watching file(s): {}", errors.iter().map(|e| e.to_string()).collect::<Vec<String>>().join(", ")),
            }
        }

        Ok(())
    }

    pub fn compile() {
        let _ = std::fs::remove_dir_all("./build");
        let _ = std::fs::create_dir_all("./build");
        fs_extra::dir::copy("./assets", "./build", &CopyOptions::default()).unwrap();

        let mut style_info = Vec::new();
        let mut style_errors = Vec::new();
        let styles_dir = Path::new("./build/assets/styles");
        for entry in WalkDir::new(&styles_dir).into_iter().filter_map(|e| e.ok()) {
            if !entry.file_type().is_file() { continue }
            let Some(ext) = entry.path().extension() else { continue };
            if !ext.eq_ignore_ascii_case("scss") { continue };
            match Self::compile_style(entry, styles_dir) {
                Ok(info) => style_info.push(info),
                Err(err) => style_errors.push(err.to_string())
            }
        }
        if style_info.len() > 0 {
            println!("Built style(s): {}", style_info.join(", "))
        } else {
            println!("No styles built")
        }
        for error in style_errors {
            println!("/!\\ {}", error)
        }

    }

    fn compile_style(entry: DirEntry, styles_dir: &Path) -> anyhow::Result<String> {
        let err_format = |word: &str, info: &str|
            format!("Failed to {word} style '{}': {info}", entry.path().display());
        let out = entry.path().with_extension("").file_name().unwrap().to_string_lossy().to_string();

        let scss = match std::fs::read_to_string(entry.path()) {
            Ok(v) => v,
            Err(err) => bail!(err_format("read", &err.to_string())),
        };
        let importer = FsImporter::new(vec![styles_dir.to_path_buf()]);
        let options = &sasso::Options::new()
            .with_style(OutputStyle::Expanded)
            .with_syntax(sasso::Syntax::Scss)
            .with_importer(&importer);
        let css = match sasso::compile(&scss, options) {
            Ok(v) => v,
            Err(err) => bail!(err_format("compile", &err.to_string()))
        };
        if !css.is_empty() {
            if let Err(err) = std::fs::write(entry.path().with_extension("css"), css) {
                bail!(err_format("write", &err.to_string()))
            };
            let _ = std::fs::remove_file(entry.path());
        }
        Ok(out)
    }
}

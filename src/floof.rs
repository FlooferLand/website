use chrono::{DateTime, Utc};

pub struct Floof {
    pub age: u8
}
impl Floof {
    pub fn new() -> Self {
        let age = Utc::now().years_since(DateTime::from_timestamp(1145437200, 0).unwrap_or_default()).unwrap_or_default() as u8;
        Self { age }
    }
}
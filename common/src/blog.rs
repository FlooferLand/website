use chrono::Utc;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct BlogMetadata {
    pub id: String,
    pub title: String,
    pub description: String,
    pub date: chrono::DateTime<Utc>,
    pub keywords: Vec<String>,
    pub published: bool
}

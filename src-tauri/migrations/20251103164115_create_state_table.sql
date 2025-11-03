CREATE TABLE IF NOT EXISTS states (
    state_id INTEGER PRIMARY KEY,
    file_id INTEGER NOT NULL,
    model_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (file_id) REFERENCES files (file_id)
)
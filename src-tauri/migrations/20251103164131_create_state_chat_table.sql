CREATE TABLE IF NOT EXISTS state_chat(
    state_chat_id INTEGER PRIMARY KEY,
    state_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(state_id) REFERENCES states (state_id)
)
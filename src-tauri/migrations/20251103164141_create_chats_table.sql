CREATE TABLE IF NOT EXISTS chats(
    chat_id INTEGER PRIMARY KEY,
    user_type TEXT NOT NULL,
    chat_seq INTEGER NOT NULL,
    state_chat_id INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(state_chat_id) REFERENCES state_chat (state_chat_id)
)
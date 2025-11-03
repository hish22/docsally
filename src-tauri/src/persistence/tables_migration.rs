use tauri_plugin_sql::Migration;

pub fn state_system_table_migrations() -> Vec<Migration> {
    vec![
        Migration {
            version: 1,
            description: "create_file_table",
            sql: include_str!("../../migrations/20251103164100_create_file_table.sql"),
            kind: tauri_plugin_sql::MigrationKind::Up,
        },
        Migration {
            version: 2,
            description: "create_state_table",
            sql: include_str!("../../migrations/20251103164115_create_state_table.sql"),
            kind: tauri_plugin_sql::MigrationKind::Up,
        },
        Migration {
            version: 3,
            description: "create_chats_table",
            sql: include_str!("../../migrations/20251103164141_create_chats_table.sql"),
            kind: tauri_plugin_sql::MigrationKind::Up,
        },
        Migration {
            version: 4,
            description: "create_state_chat_table",
            sql: include_str!("../../migrations/20251103164131_create_state_chat_table.sql"),
            kind: tauri_plugin_sql::MigrationKind::Up,
        },
    ]
}

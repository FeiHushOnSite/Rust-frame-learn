use std::sync::{Arc, Mutex};
use tauri::command;
use crate::controller::auth_controller::login_command;
use crate::controller::manage_controller::manage_command;
use crate::controller::notice_controller::notice_command;
use crate::controller::role_controller::role_command;
use crate::controller::rule_controller::rule_command;
use crate::controller::skus_controller::skus_command;
use crate::controller::coupon_controller::coupon_command;

pub mod controller {
    pub mod auth_controller;
    pub mod manage_controller;
    pub mod notice_controller;
    pub mod rule_controller;
    pub mod role_controller;
    pub mod skus_controller;
    pub mod coupon_controller;
}

pub mod utils {
    pub mod token;
    pub mod time;
}

pub mod service;
pub mod model;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .manage(AppState {
            todos: Arc::new(Mutex::new(Vec::new())),
        })
        .invoke_handler(tauri::generate_handler![add_todo,
            get_todos,
            login_command,
            manage_command,
            notice_command,
            rule_command,
            role_command,
            skus_command,
            coupon_command,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[command]
fn add_todo(todo: String, state: tauri::State<AppState>) -> TodoItem {
    let mut todos = state.todos.lock().unwrap();
    let new_todo = TodoItem {
        id: todos.len() + 1,
        description: todo,
    };
    todos.push(new_todo.clone());
    new_todo
}

#[command]
fn get_todos(state: tauri::State<AppState>) -> Vec<TodoItem> {
    let todos = state.todos.lock().unwrap();
    todos.clone()
}

// 定义一个全局的待办事项
struct AppState {
    todos: Arc<Mutex<Vec<TodoItem>>>,
}

// 待办事项的结构体
#[derive(Clone, serde::Serialize)]
struct TodoItem {
    id: usize,
    description: String,
}

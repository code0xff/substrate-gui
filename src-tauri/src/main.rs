// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[derive(serde::Deserialize, serde::Serialize, Debug, Clone)]
struct ProcessStatus {
    cpu_usage: f32,
    memory: u64,
    start_time: u64,
}

#[tauri::command]
async fn check_status(pid: u32) -> Result<ProcessStatus, String> {
    let mut system = sysinfo::System::new_all();
    system.refresh_all();
    if let Some(process) = system.process(sysinfo::Pid::from_u32(pid)) {
        let cpu_usage = process.cpu_usage();
        let memory = process.memory();
        let start_time = process.start_time();
        let status = ProcessStatus {
            cpu_usage,
            memory,
            start_time,
        };
        Ok(status)
    } else {
        Err(format!("Not exist pid: {}", pid))
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![check_status])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

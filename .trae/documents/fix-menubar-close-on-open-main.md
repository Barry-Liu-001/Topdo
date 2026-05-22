# 修复：点击"打开 Topdo"时关闭菜单栏预览窗口

## 问题分析

在 `MenuBarPanel.vue` 的 `openMain` 函数（第 95-98 行）中：

```javascript
async function openMain() {
  await invoke('show_main_window');
  await getCurrentWindow().hide();
}
```

代码已经调用了 `getCurrentWindow().hide()` 来隐藏菜单栏窗口。但 `getCurrentWindow()` 返回的是当前 JS 上下文所在的窗口，在 menubar 窗口中应该正确返回 menubar 窗口。

**可能的问题**：`show_main_window` 是一个 Tauri 命令，它会 `set_focus()` 主窗口。当主窗口获得焦点后，`getCurrentWindow().hide()` 可能因为焦点转移导致执行失败或被忽略。更可能的是 `hide()` 执行了但窗口没有真正隐藏（例如因为 `always_on_top` 的 menubar 窗口在主窗口之上仍然可见）。

**根本原因**：`show_main_window` 命令（lib.rs 第 3049-3056 行）只负责显示主窗口，没有同时隐藏 menubar 窗口。而前端的 `getCurrentWindow().hide()` 可能存在时序问题——主窗口的 `show` + `set_focus` 可能触发 menubar 窗口的焦点丢失事件，导致 `hide()` 不生效。

## 修复方案

在 Rust 端的 `show_main_window` 命令中，增加隐藏 menubar 窗口的逻辑。这样无论前端是否成功隐藏，Rust 端都会确保 menubar 窗口被关闭。

### 修改文件

**`src-tauri/src/lib.rs`** — `show_main_window` 函数（第 3049-3056 行）

修改前：
```rust
fn show_main_window(app: AppHandle) -> Result<(), String> {
  let window = get_main_window(&app)?;
  set_window_mode_internal(&app, "panel")?;
  window.unminimize().map_err(|err| err.to_string())?;
  window.show().map_err(|err| err.to_string())?;
  window.set_focus().map_err(|err| err.to_string())?;
  Ok(())
}
```

修改后：
```rust
fn show_main_window(app: AppHandle) -> Result<(), String> {
  let window = get_main_window(&app)?;
  set_window_mode_internal(&app, "panel")?;
  window.unminimize().map_err(|err| err.to_string())?;
  window.show().map_err(|err| err.to_string())?;
  window.set_focus().map_err(|err| err.to_string())?;
  if let Some(menubar) = app.get_webview_window(MENUBAR_WINDOW_LABEL) {
    let _ = menubar.hide();
  }
  Ok(())
}
```

## 实施步骤

1. 修改 `lib.rs` 中的 `show_main_window` 函数，增加隐藏 menubar 窗口逻辑
2. 构建验证
3. 打包 app
4. 打开 app 验证

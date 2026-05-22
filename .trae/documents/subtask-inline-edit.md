# 子项在列表中支持双击编辑

## 需求

当前列表中的子项（subtask）仅展示文本，双击后应进入内联编辑模式，可修改子任务文本，回车保存、Esc 取消。开发完后打包 .app。

## 现状

- 子项在 `TaskItem.vue` 的 `.subtask-inline-list` 区域展示
- 每个子项渲染为 `<span class="subtask-inline-text">{{ item.text }}</span>`
- 已有 `subTasksDraft`、`subTasksDirty`、`toggleSubTaskInline`、`saveDetailDrafts` 等逻辑

## 实现方案

### 步骤 1：模板 — 子项文本改为可编辑模式

将 `<span>` 改为条件渲染：
- 非编辑状态：`<span>` 显示文本，`@dblclick.stop.prevent` 进入编辑
- 编辑状态：`<input>` 内联输入框，`@blur` 保存，`@keydown.enter.prevent` 保存，`@keydown.esc.prevent` 取消

需要新增一个响应式变量 `editingSubTaskId: ref<string | null>(null)` 和 `editingSubTaskDraft: ref<string>('')` 来追踪当前正在编辑的子项。

### 步骤 2：逻辑 — 添加编辑相关方法

- `startSubTaskInlineEdit(id: string)`：记录编辑中的子项 ID，初始化 draft 文本
- `commitSubTaskInlineEdit()`：将 draft 写回 subTasksDraft，自动保存到 store，清空编辑状态
- `cancelSubTaskInlineEdit()`：放弃修改，清空编辑状态

### 步骤 3：样式 — 编辑输入框样式

新增 `.subtask-inline-edit-input` 样式，与详情面板中的 `.detail-subtask-input` 风格一致：
- 无边框、透明背景
- 字号 11px，与展示文本一致
- focus 时无 outline

### 步骤 4：打包 .app

运行 `CI=false pnpm tauri build --bundles app`

## 涉及文件

| 文件 | 改动内容 |
|------|---------|
| `src/components/TaskItem.vue` | 模板：子项文本条件渲染 + input；逻辑：编辑方法；样式：输入框样式 |

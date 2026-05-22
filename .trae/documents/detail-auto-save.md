# 任务详情页实时保存

## 需求

当前任务详情页需要手动点击"保存"按钮才能保存修改，用户希望改为实时保存：修改任何字段后自动保存，移除"保存"按钮，关闭面板时也不需要保存操作。

## 现状

- 详情页 header 有"保存"按钮，调用 `saveDetailDrafts()`
- `saveDetailDrafts()` 会先 `addSubTask()`（将待添加的子任务加入），然后调用 `store.updateTaskDetails()` 保存所有字段，最后 `expanded.value = false` 关闭面板
- 各 draft 变量（nameDraft、priorityDraft、notesDraft、dueDateDraft、dueTimeDraft、recurrenceDraft、reminderDraft、subTasksDraft）通过 watch 同步 props.task 的变化
- 部分字段已有独立的保存逻辑（如 `toggleSubTaskInline` 直接调用 `store.updateTaskDetails`）

## 实现方案

### 步骤 1：移除"保存"按钮

将详情页 header 中的"保存"按钮移除，只保留"返回"按钮和"任务详情"标题。

### 步骤 2：添加防抖自动保存函数

新增 `autoSaveDetails()` 函数，使用防抖（debounce 500ms），在 draft 变量变化时自动调用 `store.updateTaskDetails()` 保存。防抖避免频繁请求。

### 步骤 3：为各 draft 变量添加 watch 触发自动保存

对以下变量添加 watch（仅当 `expanded` 为 true 时触发）：
- `nameDraft` — 任务名称
- `priorityDraft` — 优先级
- `notesDraft` — 备注
- `dueDateDraft` / `dueTimeDraft` — 截止日期
- `recurrenceDraft` — 重复规则（deep watch）
- `reminderDraft` — 提醒
- `subTasksDraft` — 子任务（deep watch，且 `subTasksDirty` 为 true 时）

### 步骤 4：修改 `handleBack()` 逻辑

关闭面板前先执行一次 flush（立即执行防抖中的待执行函数），确保最后的修改已保存。

### 步骤 5：修改 `saveDetailDrafts()` 逻辑

移除 `expanded.value = false`（不再自动关闭面板），改为仅做保存操作。保留此函数供其他地方调用。

## 涉及文件

| 文件 | 改动内容 |
|------|---------|
| `src/components/TaskItem.vue` | 移除保存按钮；添加防抖自动保存；添加 watch；修改 handleBack |

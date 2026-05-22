# 列表中不展示优先级分组标题

## 需求

移除任务列表中"紧急"、"重要"、"普通"等分组标题行（`.task-group__header`），任务仍按优先级排序但不显示分割标题。

## 现状

- `TaskList.vue` 中 `groupedTasks` computed 将任务按优先级分组（紧急/重要/普通/已完成）
- 模板中 `v-for="group in groupedTasks"` 循环渲染每个分组，每组包含一个 `.task-group__header` 标题行
- 分组支持拖拽排序（dragover/drop 事件绑定在分组上）

## 实现方案

### 步骤 1：修改模板 — 移除分组标题，扁平化任务列表

将 `v-for="group in groupedTasks"` 的嵌套循环改为扁平化的单层循环：
- 新增 `flatTasks` computed，将所有分组的任务按顺序合并为一个数组
- 模板改为 `v-for="task in flatTasks"`，直接渲染任务项
- 移除 `.task-group__header` 和 `.task-group` 容器
- 保留拖拽功能（dragstart/dragend/dragover/drop 绑定在 `.task-draggable` 上）

### 步骤 2：调整拖拽逻辑

当前拖拽有分组级别的 dragover/drop 事件（用于跨优先级拖放），移除分组容器后需要调整：
- 拖拽排序仍通过任务级别的 dragover/drop 实现
- 跨优先级拖放通过 onDropOnTask 中更新任务优先级实现（已有此逻辑）

### 步骤 3：移除分组标题样式

移除 `.task-group__header` 样式（可选，不影响功能）

### 步骤 4：打包 .app

## 涉及文件

| 文件 | 改动内容 |
|------|---------|
| `src/components/TaskList.vue` | 模板：扁平化任务列表，移除分组标题；逻辑：新增 flatTasks computed；样式：移除分组标题样式 |

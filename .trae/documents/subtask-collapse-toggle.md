# 列表中点击主任务时折叠子项

## 需求

在任务列表中，点击主任务卡片时，子项列表应折叠/展开切换。

## 现状

- 子项列表 `.subtask-inline-list` 始终展示（`v-if="subTaskTotal > 0 && !inlineEditing"`）
- 点击主任务卡片触发 `emit('focus', task.record_id)`
- 已有 `expanded` ref 控制详情面板展开/收起

## 实现方案

### 步骤 1：新增 `subtasksCollapsed` ref

添加 `const subtasksCollapsed = ref(true)`，默认折叠。

### 步骤 2：修改子项列表 v-if 条件

将 `v-if="subTaskTotal > 0 && !inlineEditing"` 改为 `v-if="subTaskTotal > 0 && !inlineEditing && !subtasksCollapsed"`。

### 步骤 3：点击主任务卡片时切换折叠状态

在卡片的 `@click` 事件中，除了 `emit('focus')` 外，切换 `subtasksCollapsed`：
- 如果详情面板未展开，点击切换子项折叠/展开
- 如果详情面板已展开，点击收起详情面板（已有逻辑）

### 步骤 4：展开详情面板时自动展开子项

当 `expanded` 变为 true 时，自动将 `subtasksCollapsed` 设为 false（因为详情面板展开后子项在卡片下方展示更直观）。

### 步骤 5：打包 .app 并 commit

## 涉及文件

| 文件 | 改动内容 |
|------|---------|
| `src/components/TaskItem.vue` | 新增 subtasksCollapsed ref；修改子项列表 v-if；修改卡片点击逻辑 |

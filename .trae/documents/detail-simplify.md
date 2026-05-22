# 任务详情页精简 + 列表卡片展示状态/优先级

## 需求

1. 移除任务详情页的 header 行（"返回"按钮 + "任务详情"标题）
2. 移除任务详情页的状态/优先级标签行（"进行中"、"重要"等 badge）
3. 将状态和优先级信息展示在任务列表卡片中

## 现状

- 详情页 header：`<header class="edit-header">` 包含返回按钮、"任务详情"标题、空的 detail-more-wrap
- 详情页状态栏：`<div class="task-status-bar">` 包含状态 badge、过期 badge、优先级 badge
- 任务卡片：`.task-card` 中有左侧 priority-bar（彩色竖线），但无文字状态/优先级标签
- 卡片 meta 行：显示截止日期、重复、子任务进度，但无状态/优先级文字

## 实现方案

### 步骤 1：移除详情页 header 和状态栏

从模板中删除：
- `<header class="edit-header">...</header>` 整个 header
- `<div class="task-status-bar">...</div>` 整个状态栏

### 步骤 2：修改 handleBack 逻辑

移除 header 后，用户通过点击卡片外部或其他方式关闭详情面板。当前 `onTaskContentClick` 已有 `expanded.value = !expanded.value` 逻辑，点击卡片即可收起。`handleBack` 函数保留但不再被模板引用。

### 步骤 3：在任务卡片 meta 行中增加状态和优先级标签

在 `.task-meta-line` 中，在现有 badge 之前添加状态和优先级 badge：
- 状态 badge：显示当前状态文字（待启动/进行中/已完成），使用不同颜色
- 优先级 badge：显示优先级文字（紧急/重要/普通），使用不同颜色

### 步骤 4：调整详情面板样式

移除 header 和状态栏后，详情面板顶部需要调整：
- 增加顶部内边距或圆角保持美观
- `.detail-body` 成为面板的第一个子元素

### 步骤 5：打包 .app

## 涉及文件

| 文件 | 改动内容 |
|------|---------|
| `src/components/TaskItem.vue` | 模板：移除 header 和状态栏，卡片 meta 行增加状态/优先级 badge；样式：调整详情面板顶部 |

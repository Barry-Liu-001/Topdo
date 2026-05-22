# 列表文字换行展示

## 需求

任务列表中，任务名称和子任务文本超过宽度时换行展示，而非省略号截断。

## 现状

- `.task-name`：`white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` — 单行截断
- `.subtask-inline-text`：`white-space: nowrap; overflow: hidden; text-overflow: ellipsis;` — 单行截断
- `.task-content`：`overflow: hidden;` — 阻止内容溢出

## 实现方案

### 步骤 1：修改 `.task-name` 样式

移除 `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`，改为允许换行。

### 步骤 2：修改 `.subtask-inline-text` 样式

移除 `white-space: nowrap; overflow: hidden; text-overflow: ellipsis;`，改为允许换行。

### 步骤 3：修改 `.task-content` 样式

移除 `overflow: hidden;`，允许内容撑开高度。

### 步骤 4：打包 .app 并 commit

## 涉及文件

| 文件 | 改动内容 |
|------|---------|
| `src/components/TaskItem.vue` | 修改 `.task-name`、`.subtask-inline-text`、`.task-content` 样式，移除截断改为换行 |

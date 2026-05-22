# 设置中增加"统计摘要行"显示开关

## 需求分析

当前 `StatsBar.vue` 中有一行统计摘要：

```
今日完成 {{ taskStore.todayCompletedCount }} 项 · 本周 {{ taskStore.weekCompletedCount }} 项 · 🔥连续 {{ taskStore.completionStreak }} 天
```

用户希望在设置页面中增加一个开关，控制该统计摘要行是否展示。

## 现状

- **统计摘要行**：位于 `StatsBar.vue` 的 `.stats-summary` 按钮中（第 19-21 行）
- **设置页面**：`Settings.vue`，已有多个 toggle 开关（习惯模块、截止提醒、宠物模式等）
- **设置存储**：`appStore.ts`，使用 localStorage 存储开关状态，模式为 `key: '1'/'0'`，默认值在 `load()` 中处理

## 实现方案

### 步骤 1：appStore.ts — 添加 `statsSummaryEnabled` 状态

- 新增 localStorage key：`topdo_stats_summary_enabled`
- 在 state 中添加 `statsSummaryEnabled: true`（默认展示）
- 在 `load()` 中读取 localStorage 值
- 新增 `setStatsSummaryEnabled(enabled: boolean)` action

### 步骤 2：Settings.vue — 添加"统计摘要"开关

- 在设置页面中"习惯模块"和"截止提醒"所在的 `settings-group` 中，新增一行 setting-row
- 图标使用 `bar-chart` 或 `chart`（需确认 Icon 组件是否支持），如不支持则用现有图标如 `list`
- 开关绑定到 `appStore.statsSummaryEnabled`，通过 computed get/set 调用 `setStatsSummaryEnabled`

### 步骤 3：StatsBar.vue — 根据开关控制摘要行显示

- 引入 `useAppStore`
- 在 `appStore.load()` 已被调用的前提下，用 `appStore.statsSummaryEnabled` 控制 `.stats-summary` 按钮的 `v-if`

## 涉及文件

| 文件 | 改动内容 |
|------|---------|
| `src/stores/appStore.ts` | 新增 `statsSummaryEnabled` 状态、localStorage 读写、setter action |
| `src/components/Settings.vue` | 新增"统计摘要"toggle 开关行 |
| `src/components/StatsBar.vue` | 用 `v-if` 控制统计摘要行显示 |

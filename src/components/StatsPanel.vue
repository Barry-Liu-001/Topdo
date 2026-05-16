<template>
  <div class="stats-panel task-scrollbar">
    <header class="stats-header">
      <h2>本周统计</h2>
      <span>{{ weekRange }}</span>
    </header>

    <div class="stats-cards">
      <StatCard compact :value="taskStore.weekCompletedCount" label="本周完成" highlight />
      <StatCard compact :value="taskStore.completionStreak" label="连续天数" />
      <StatCard compact :value="taskStore.todayCompletedCount" label="今日完成" />
      <StatCard compact :value="taskStore.totalTaskCount" label="累计任务" />
    </div>

    <BarChart title="近 7 天完成" :summary="`合计 ${totalRecentCount} 项`" :data="chartData" :height="88" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useTaskStore } from '../stores/taskStore';
import BarChart from './ui/BarChart.vue';
import StatCard from './ui/StatCard.vue';

const taskStore = useTaskStore();

function formatMonthDay(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

const weekRange = computed(() => {
  const now = new Date();
  const day = now.getDay() || 7;
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - day + 1);
  const end = new Date(start.getFullYear(), start.getMonth(), start.getDate() + 6);
  return `${formatMonthDay(start)} - ${formatMonthDay(end)}`;
});
const totalRecentCount = computed(() => taskStore.recentCompletionStats.reduce((sum, day) => sum + day.count, 0));
const chartData = computed(() => taskStore.recentCompletionStats.map((day, index, list) => ({
  label: index === list.length - 1 ? '今天' : day.label,
  value: day.count,
  isToday: index === list.length - 1
})));
</script>

<style scoped>
.stats-panel {
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100% + 8px);
  z-index: 20;
  max-height: min(560px, calc(100vh - 132px));
  min-height: 0;
  overflow-y: auto;
  padding: 16px;
  display: grid;
  gap: 16px;
  border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
  border-radius: 18px;
  background: color-mix(in srgb, var(--bg-solid) 96%, transparent);
  box-shadow: 0 18px 42px rgba(15, 23, 42, 0.14);
  backdrop-filter: blur(18px);
}

.stats-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.stats-header h2 {
  margin: 0;
  font-size: 18px;
  line-height: 1;
  font-weight: 750;
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

.stats-header span {
  font-size: 12px;
  color: var(--text-tertiary);
}

.stats-cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}
</style>

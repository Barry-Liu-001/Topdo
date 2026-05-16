<template>
  <article class="stat-card" :class="{ 'stat-card--highlight': highlight, 'stat-card--compact': compact }">
    <div class="stat-card__value">{{ value }}</div>
    <div class="stat-card__label">{{ label }}</div>
    <div v-if="trend" class="stat-card__trend" :class="`stat-card__trend--${trendTone}`">{{ trend }}</div>
  </article>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  value: string | number;
  label: string;
  trend?: string;
  trendTone?: 'green' | 'amber' | 'blue' | 'muted';
  highlight?: boolean;
  compact?: boolean;
}>(), {
  trend: '',
  trendTone: 'muted',
  highlight: false,
  compact: false
});
</script>

<style scoped>
.stat-card {
  min-width: 0;
  padding: 14px;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg-solid);
}

.stat-card--highlight {
  background: var(--stat-highlight-bg);
  border-color: var(--stat-highlight-border);
}

.stat-card__value {
  font-size: 28px;
  line-height: 1;
  font-weight: 750;
  letter-spacing: -0.03em;
  color: var(--text-primary);
}

.stat-card__label {
  margin-top: 5px;
  font-size: 12px;
  color: var(--text-tertiary);
}

.stat-card__trend {
  margin-top: 9px;
  font-size: 11px;
  line-height: 1.3;
}

.stat-card__trend--green { color: var(--accent-green); }
.stat-card__trend--amber { color: var(--accent-amber); }
.stat-card__trend--blue { color: var(--accent-blue); }
.stat-card__trend--muted { color: var(--text-secondary); }

.stat-card--compact {
  padding: 10px;
  border-radius: 10px;
}

.stat-card--compact .stat-card__value {
  font-size: 22px;
}

.stat-card--compact .stat-card__label {
  margin-top: 4px;
  font-size: 10px;
  white-space: nowrap;
}
</style>

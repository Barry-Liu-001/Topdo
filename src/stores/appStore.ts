import { defineStore } from 'pinia';

const HABIT_MODULE_KEY = 'topdo_habit_module_enabled';
const HABIT_GUIDE_KEY = 'topdo_habit_module_guide_seen';
const REMINDER_ENABLED_KEY = 'topdo_reminder_enabled';
const AUTO_UPDATE_ENABLED_KEY = 'topdo_auto_update_enabled';
const STATS_SUMMARY_ENABLED_KEY = 'topdo_stats_summary_enabled';

export const useAppStore = defineStore('app', {
  state: () => ({
    currentMode: 'tasks' as 'tasks' | 'habits',
    habitModuleEnabled: false,
    habitGuideVisible: false,
    reminderEnabled: true,
    autoUpdateEnabled: true,
    statsSummaryEnabled: true
  }),
  actions: {
    load() {
      try {
        this.habitModuleEnabled = localStorage.getItem(HABIT_MODULE_KEY) === '1';
      } catch {
        this.habitModuleEnabled = false;
      }
      try {
        const storedReminder = localStorage.getItem(REMINDER_ENABLED_KEY);
        this.reminderEnabled = storedReminder === null ? true : storedReminder === '1';
      } catch {
        this.reminderEnabled = true;
      }
      try {
        const storedAutoUpdate = localStorage.getItem(AUTO_UPDATE_ENABLED_KEY);
        this.autoUpdateEnabled = storedAutoUpdate === null ? true : storedAutoUpdate === '1';
      } catch {
        this.autoUpdateEnabled = true;
      }
      try {
        const storedStatsSummary = localStorage.getItem(STATS_SUMMARY_ENABLED_KEY);
        this.statsSummaryEnabled = storedStatsSummary === null ? true : storedStatsSummary === '1';
      } catch {
        this.statsSummaryEnabled = true;
      }
      if (!this.habitModuleEnabled) this.currentMode = 'tasks';
    },
    setHabitModuleEnabled(enabled: boolean) {
      this.habitModuleEnabled = enabled;
      try {
        localStorage.setItem(HABIT_MODULE_KEY, enabled ? '1' : '0');
      } catch {
        // ignore
      }
      if (!enabled) {
        this.currentMode = 'tasks';
        return;
      }
      try {
        const seen = localStorage.getItem(HABIT_GUIDE_KEY) === '1';
        this.habitGuideVisible = !seen;
        if (!seen) localStorage.setItem(HABIT_GUIDE_KEY, '1');
      } catch {
        this.habitGuideVisible = true;
      }
    },
    switchMode(mode: 'tasks' | 'habits') {
      if (mode === 'habits' && !this.habitModuleEnabled) return;
      this.currentMode = mode;
    },
    toggleMode() {
      if (!this.habitModuleEnabled) return;
      this.currentMode = this.currentMode === 'tasks' ? 'habits' : 'tasks';
    },
    dismissHabitGuide() {
      this.habitGuideVisible = false;
    },
    setReminderEnabled(enabled: boolean) {
      this.reminderEnabled = enabled;
      try {
        localStorage.setItem(REMINDER_ENABLED_KEY, enabled ? '1' : '0');
      } catch {
        // ignore
      }
    },
    setAutoUpdateEnabled(enabled: boolean) {
      this.autoUpdateEnabled = enabled;
      try {
        localStorage.setItem(AUTO_UPDATE_ENABLED_KEY, enabled ? '1' : '0');
      } catch {
        // ignore
      }
    },
    setStatsSummaryEnabled(enabled: boolean) {
      this.statsSummaryEnabled = enabled;
      try {
        localStorage.setItem(STATS_SUMMARY_ENABLED_KEY, enabled ? '1' : '0');
      } catch {
        // ignore
      }
    }
  }
});

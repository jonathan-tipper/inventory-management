<template>
  <aside class="sidebar" :class="{ collapsed }">
    <div class="sidebar-brand">
      <span class="brand-mark">C</span>
      <div v-if="!collapsed" class="brand-text">
        <span class="brand-name">{{ t('nav.companyName') }}</span>
        <span class="brand-subtitle">{{ t('nav.subtitle') }}</span>
      </div>
    </div>

    <nav class="sidebar-nav">
      <router-link
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="sidebar-link"
        active-class="sidebar-link-active"
        :title="t(item.labelKey)"
      >
        <svg
          class="sidebar-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path :d="item.icon" />
        </svg>
        <span class="sidebar-label">{{ t(item.labelKey) }}</span>
      </router-link>
    </nav>

    <button
      class="sidebar-toggle"
      type="button"
      @click="collapsed = !collapsed"
      :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          :d="collapsed ? 'M6 4l4 4-4 4' : 'M10 4l-4 4 4 4'"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  </aside>
</template>

<script>
import { ref } from 'vue'
import { useI18n } from '../composables/useI18n'
import { navItems } from '../config/nav'

export default {
  name: 'SidebarNav',
  setup() {
    const { t } = useI18n()
    const collapsed = ref(false)

    return {
      t,
      navItems,
      collapsed
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: var(--sidebar-width);
  min-width: var(--sidebar-width);
  background: var(--sidebar-bg);
  color: var(--sidebar-fg-muted);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  flex-shrink: 0;
  transition: width 0.15s ease, min-width 0.15s ease;
  z-index: 100;
}

.sidebar.collapsed {
  width: var(--sidebar-width-collapsed);
  min-width: var(--sidebar-width-collapsed);
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem;
  min-height: 70px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.16);
}

.sidebar.collapsed .sidebar-brand {
  justify-content: center;
  padding: 1.25rem 0;
}

.brand-mark {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--accent);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.brand-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.brand-name {
  font-size: 0.938rem;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.01em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.brand-subtitle {
  font-size: 0.688rem;
  color: var(--sidebar-fg-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  padding: 0.75rem 0.625rem;
  overflow-y: auto;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.625rem 0.75rem;
  color: var(--sidebar-fg-muted);
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background 0.15s ease, color 0.15s ease;
}

.sidebar-link:hover {
  background: rgba(148, 163, 184, 0.1);
  color: #e2e8f0;
}

.sidebar-link-active {
  background: var(--sidebar-active-bg);
  color: var(--sidebar-active-fg);
}

.sidebar.collapsed .sidebar-link {
  justify-content: center;
}

.sidebar-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.sidebar-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0.5rem 0.625rem 0.75rem;
  padding: 0.5rem;
  background: transparent;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 8px;
  color: var(--sidebar-fg-muted);
  cursor: pointer;
  transition: all 0.15s ease;
}

.sidebar-toggle:hover {
  background: rgba(148, 163, 184, 0.1);
  color: #e2e8f0;
}

/* Automatic icon-only collapse below 768px - no toggle needed at this width */
@media (max-width: 768px) {
  .sidebar {
    width: var(--sidebar-width-collapsed) !important;
    min-width: var(--sidebar-width-collapsed) !important;
  }

  .sidebar .brand-text,
  .sidebar .sidebar-label {
    display: none;
  }

  .sidebar .sidebar-brand {
    justify-content: center;
    padding: 1.25rem 0;
  }

  .sidebar .sidebar-link {
    justify-content: center;
  }

  .sidebar-toggle {
    display: none;
  }
}
</style>

<template>
  <header class="shell-topbar">
    <div class="shell-topbar-controls">
      <LanguageSwitcher />
      <ProfileMenu
        @show-profile-details="$emit('show-profile-details')"
        @show-tasks="$emit('show-tasks')"
      />
    </div>
    <FilterBar />
  </header>
</template>

<script>
import FilterBar from './FilterBar.vue'
import ProfileMenu from './ProfileMenu.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

export default {
  name: 'ShellTopBar',
  components: {
    FilterBar,
    ProfileMenu,
    LanguageSwitcher
  },
  emits: ['show-profile-details', 'show-tasks']
}
</script>

<style scoped>
.shell-topbar {
  position: sticky;
  top: 0;
  z-index: 90;
  background: var(--surface);
  border-bottom: 1px solid var(--border-subtle);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.05);
}

.shell-topbar-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem 0;
}
</style>

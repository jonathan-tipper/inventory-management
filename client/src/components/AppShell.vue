<template>
  <div class="app-shell">
    <SidebarNav />

    <div class="shell-body">
      <ShellTopBar
        @show-profile-details="$emit('open-profile-details')"
        @show-tasks="$emit('open-tasks')"
      />
      <main class="shell-content">
        <router-view />
      </main>
    </div>

    <ProfileDetailsModal
      :is-open="showProfileDetails"
      @close="$emit('close-profile-details')"
    />

    <TasksModal
      :is-open="showTasks"
      :tasks="tasks"
      @close="$emit('close-tasks')"
      @add-task="$emit('add-task', $event)"
      @delete-task="$emit('delete-task', $event)"
      @toggle-task="$emit('toggle-task', $event)"
    />
  </div>
</template>

<script>
import SidebarNav from './SidebarNav.vue'
import ShellTopBar from './ShellTopBar.vue'
import ProfileDetailsModal from './ProfileDetailsModal.vue'
import TasksModal from './TasksModal.vue'

export default {
  name: 'AppShell',
  components: {
    SidebarNav,
    ShellTopBar,
    ProfileDetailsModal,
    TasksModal
  },
  props: {
    showProfileDetails: {
      type: Boolean,
      default: false
    },
    showTasks: {
      type: Boolean,
      default: false
    },
    tasks: {
      type: Array,
      default: () => []
    }
  },
  emits: [
    'open-profile-details',
    'close-profile-details',
    'open-tasks',
    'close-tasks',
    'add-task',
    'delete-task',
    'toggle-task'
  ]
}
</script>

<style scoped>
.app-shell {
  display: flex;
  min-height: 100vh;
}

.shell-body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.shell-content {
  flex: 1;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 1.5rem 2rem;
}
</style>

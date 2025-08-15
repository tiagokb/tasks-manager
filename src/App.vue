<script setup lang="ts">

import Modal from '@/components/Modal.vue'

</script>

<template>

  <header class="flex flex-row w-full justify-between bg-secondary text-on-secondary py-1">
    <p class="px-4"><a href="https://github.com/tiagokb/tasks-manager" target="_blank">Github Page</a></p>
    <h1><strong>Task Manager Demo</strong></h1>
    <nav class="px-4">
      <RouterLink to="/">Home</RouterLink>
      <span> | </span>
      <RouterLink to="/tasks">Tasks</RouterLink>
    </nav>
  </header>
  <main>
    <RouterView />
    <Modal />
  </main>
</template>

<style scoped></style>

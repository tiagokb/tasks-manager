<script setup lang="ts">

</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center bg-surface text-on-surface text-center px-4">
    <h1 class="text-4xl md:text-5xl font-bold mb-6 ">
      Bem-vindo ao Task Manager
    </h1>
    <p class="text-lg md:text-xl mb-8">
      Aqui você pode gerenciar milhares de tarefas de forma rápida e eficiente.
    </p>
    <RouterLink
      to="/tasks"
      class="btn btn-primary"
    >
      Ver Tarefas
    </RouterLink>
  </div>
</template>

<style scoped>

</style>

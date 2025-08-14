<script setup lang="ts">

</script>

<template>
  <div class="h-screen flex flex-col items-center justify-center bg-gray-100 text-center px-4">
    <h1 class="text-4xl md:text-5xl font-bold text-blue-600 mb-6">
      Bem-vindo ao Task Manager
    </h1>
    <p class="text-lg md:text-xl text-gray-700 mb-8">
      Aqui você pode gerenciar milhares de tarefas de forma rápida e eficiente.
    </p>
    <RouterLink
      to="/tasks"
      class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
    >
      Ver Tarefas
    </RouterLink>
  </div>
</template>

<style scoped>

</style>

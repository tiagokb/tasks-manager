<script setup lang="ts">

import { useAttrs } from 'vue'

interface Props {
  id: string,
  label: string,
  errorMessage?: string
}

const props = defineProps<Props>()
const model = defineModel()
const attrs = useAttrs()
</script>

<template>
  <div class="flex flex-col gap-1 w-auto">
    <label :for="props.id" class="label">{{ props.label }}</label>
    <input
      :id="props.id"
      v-model="model"
      v-bind="attrs"
      class="input"
    />
    <span v-if="errorMessage" class="text-danger text-sm">{{ errorMessage }}</span>
  </div>
</template>

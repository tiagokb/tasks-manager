<script setup lang="ts">

import { useAttrs } from 'vue'

interface Props {
  id: string,
  label: string
}

const props = defineProps<Props>()
const model = defineModel()
const attrs = useAttrs()

</script>

<template>
  <div class="flex flex-col gap-1 w-auto">
    <label :for="props.id" class="label">{{ props.label }}</label>
    <select
      :id="props.id"
      v-model="model"
      v-bind="attrs"
      class="input"
    >
      <slot></slot>
    </select>
  </div>
</template>

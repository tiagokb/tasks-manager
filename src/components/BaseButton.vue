<script setup lang="ts">

import { useAttrs } from 'vue'

interface Props {
  buttonType: 'primary' | 'secondary' | 'outline' | 'ghost'
}

const props = defineProps<Props>()
const attrs = useAttrs()

</script>

<template>
  <button
    :class="['btn', `btn-${props.buttonType}`]"
    v-bind="attrs"
  >
    <slot />
  </button>
</template>

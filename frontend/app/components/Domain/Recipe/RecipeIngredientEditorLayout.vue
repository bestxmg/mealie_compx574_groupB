<template>
  <div v-if="header" class="d-flex pt-2 align-center">
    <slot name="dragHandle" />
    <slot v-if="!breakpoints.mdAndDown.value" name="form" />
    <slot name="contextMenu" />
  </div>
  <slot v-else-if="!breakpoints.mdAndDown.value" name="form" />
  <slot v-if="breakpoints.mdAndDown.value" name="form" />
</template>

<script setup lang="ts">
defineProps<{ header: boolean }>();
const breakpoints = useBreakpoints();
</script>

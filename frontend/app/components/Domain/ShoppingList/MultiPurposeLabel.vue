<template>
  <Tag
    v-bind="$attrs"
    :style="label.color ? { backgroundColor: label.color, color: '#fff' } : undefined"
    class="text-truncate"
    style="max-width: 100%"
  >
    {{ label.name }}
  </Tag>
</template>

<script setup lang="ts">
import Tag from "primevue/tag";
import type { MultiPurposeLabelSummary } from "~/lib/api/types/recipe";

defineProps<{
  label: MultiPurposeLabelSummary;
}>();
</script>

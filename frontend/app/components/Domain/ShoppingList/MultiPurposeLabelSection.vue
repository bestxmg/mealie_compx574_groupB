<template>
  <div class="d-flex justify-space-between align-center mx-2">
    <div class="handle">
      <span class="mr-2">
        <AppIcon
          :icon="$globals.icons.tags"
          :style="labelColor ? { color: labelColor } : undefined"
        />
      </span>
      {{ modelValue.label.name }}
    </div>
    <div
      style="min-width: 72px"
      class="ml-auto text-right"
    >
      <!-- The Vuetify v-menu here had an activator but no menu items -- it was a drag
           handle icon, not an actual functioning menu. Kept as a plain button to match. -->
      <Button
        size="small"
        text
        rounded
        class="ml-2 handle"
      >
        <AppIcon :icon="$globals.icons.arrowUpDown" />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import AppIcon from "~/components/global/AppIcon.vue";
import type { ShoppingListMultiPurposeLabelOut } from "~/lib/api/types/household";

const props = defineProps<{
  useColor?: boolean;
}>();
const modelValue = defineModel<ShoppingListMultiPurposeLabelOut>({ required: true });

const labelColor = ref<string | undefined>(props.useColor ? modelValue.value.label.color : undefined);
</script>

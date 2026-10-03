<template>
  <div v-if="items.length > 0">
    <h2
      v-if="title"
      class="mt-4"
    >
      {{ title }}
    </h2>
    <Tag
      v-for="category in items.slice(0, limit)"
      :key="category.name"
      class="recipe-chip mr-1 mt-1"
      :class="{ 'recipe-chip--small': small }"
      severity="info"
      role="button"
      tabindex="0"
      @click.prevent="selectItem(category)"
      @keydown.enter.prevent="selectItem(category)"
      @keydown.space.prevent="selectItem(category)"
    >
      {{ truncateText(category.name) }}
    </Tag>
  </div>
</template>

<script setup lang="ts">
import Tag from "primevue/tag";
import type { RecipeCategory, RecipeTag, RecipeTool } from "~/lib/api/types/recipe";
import { truncateText as truncatePlainText } from "~/lib/sanitize/text";

export type UrlPrefixParam = "tags" | "categories" | "tools";

interface Props {
  truncate?: boolean;
  items?: RecipeCategory[] | RecipeTag[] | RecipeTool[];
  title?: boolean;
  urlPrefix?: UrlPrefixParam;
  limit?: number;
  small?: boolean;
  maxWidth?: string | null;
}
const props = withDefaults(defineProps<Props>(), {
  truncate: false,
  items: () => [],
  title: false,
  urlPrefix: "categories",
  limit: 999,
  small: false,
  maxWidth: null,
});

const emit = defineEmits(["item-selected"]);

function selectItem(category: RecipeCategory | RecipeTag | RecipeTool) {
  emit("item-selected", category, props.urlPrefix);
}

function truncateText(text: string, length = 20, clamp = "...") {
  if (!props.truncate) return text;
  return truncatePlainText(text, length, clamp);
}
</script>

<style scoped>
/* Restores Mealie's solid teal, square-cornered chip (the old v-chip look). Set as CSS
   variables here (one stylesheet) rather than PrimeVue's per-instance `dt` prop, which
   injects a <style> element for every chip. Aura's Tag default (0.75rem) matches the old
   small v-chip, so the default size is set explicitly to match the old default v-chip. */
.recipe-chip {
  --p-tag-info-background: #007a99;
  --p-tag-info-color: #ffffff;
  --p-tag-border-radius: 0;
  --p-tag-font-size: 0.875rem;
  --p-tag-padding: 0.25rem 0.75rem;
  cursor: pointer;
}

.recipe-chip--small {
  --p-tag-font-size: 0.75rem;
  --p-tag-padding: 0.125rem 0.5rem;
}
</style>

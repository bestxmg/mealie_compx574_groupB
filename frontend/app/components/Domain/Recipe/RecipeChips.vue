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
      class="mr-1 mt-1"
      :style="{ cursor: 'pointer', fontSize: small ? '0.75rem' : undefined }"
      :dt="tagTokens"
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
import { MealieColors } from "~/theme/mealie-preset";

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

// PrimeVue's Tag is a plain <span> with Aura's pale, rounded "info" look by default.
// Restore Mealie's solid teal, square-cornered chip and the keyboard focus/activation
// the old clickable v-chip had built in.
const tagTokens = {
  root: { borderRadius: "0" },
  info: { background: MealieColors.accent, color: "#ffffff" },
};

function truncateText(text: string, length = 20, clamp = "...") {
  if (!props.truncate) return text;
  return truncatePlainText(text, length, clamp);
}
</script>

<style></style>

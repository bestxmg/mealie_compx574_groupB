<!--
  Renders an @mdi/js icon (a raw SVG path string, e.g. from $globals.icons.*) as an inline
  SVG. Replaces Vuetify's <v-icon> now that iconfont: "mdiSvg" no longer has a renderer --
  Mealie's icon *set* (MDI) is unchanged, only the rendering mechanism is.
-->
<template>
  <svg
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    class="app-icon"
    aria-hidden="true"
  >
    <path
      :d="icon"
      fill="currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    icon: string;
    size?: string | number;
  }>(),
  {
    // Scales with the parent's font-size by default, matching how Vuetify's font-icon
    // sizing worked -- callers that need a fixed size still pass an explicit size prop.
    size: "1em",
  },
);
</script>

<style scoped>
.app-icon {
  display: inline-block;
  flex-shrink: 0;
  vertical-align: middle;
}
</style>

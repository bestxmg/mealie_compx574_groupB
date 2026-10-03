<template>
  <Button
    v-if="isFavorite || showAlways"
    v-tooltip.bottom="isFavorite ? $t('recipe.remove-from-favorites') : $t('recipe.add-to-favorites')"
    rounded
    :severity="buttonStyle ? 'info' : 'secondary'"
    :variant="buttonStyle ? undefined : 'text'"
    class="recipe-favorite-badge"
    size="small"
    @click.prevent="toggleFavorite"
  >
    <template #icon>
      <AppIcon
        :icon="isFavorite ? $globals.icons.heart : $globals.icons.heartOutline"
        :size="!buttonStyle ? '1.5rem' : '2.25rem'"
      />
    </template>
  </Button>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import AppIcon from "~/components/global/AppIcon.vue";
import { useUserSelfRatings } from "~/composables/use-users";
import { useUserApi } from "~/composables/api";

interface Props {
  recipeId?: string;
  showAlways?: boolean;
  buttonStyle?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
  recipeId: "",
  showAlways: false,
  buttonStyle: false,
});

const { userRatings, refreshUserRatings } = useUserSelfRatings();

const isFavorite = computed(() => {
  const rating = userRatings.value.find(r => r.recipeId === props.recipeId);
  return rating?.isFavorite || false;
});

async function toggleFavorite() {
  const api = useUserApi();
  const auth = useMealieAuth();

  if (!auth.user.value) return;
  if (!isFavorite.value) {
    await api.users.addFavorite(auth.user.value?.id, props.recipeId);
  }
  else {
    await api.users.removeFavorite(auth.user.value?.id, props.recipeId);
  }
  await refreshUserRatings();
}
</script>

<style scoped>
/* Aura's text "secondary" is neutral grey; the heart uses Mealie's secondary colour.
   Set as a CSS variable here (one stylesheet) rather than PrimeVue's per-instance `dt`
   prop, which injects a <style> element for every button. The "info" (buttonStyle)
   colours come from MealiePreset. */
.recipe-favorite-badge {
  --p-button-text-secondary-color: #973542;
}
</style>

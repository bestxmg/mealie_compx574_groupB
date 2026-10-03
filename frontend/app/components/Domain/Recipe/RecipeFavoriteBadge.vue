<template>
  <Button
    v-if="isFavorite || showAlways"
    v-tooltip.bottom="isFavorite ? $t('recipe.remove-from-favorites') : $t('recipe.add-to-favorites')"
    rounded
    :severity="buttonStyle ? 'info' : 'secondary'"
    :variant="buttonStyle ? undefined : 'text'"
    :dt="buttonTokens"
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
import { MealieColors } from "~/theme/mealie-preset";
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

// Aura's "secondary" severity is neutral grey and "info" is sky blue; neither matches
// Mealie's palette (MealiePreset only overrides "primary"). Override locally via
// PrimeVue's `dt` prop rather than extending the shared preset, since this is the only
// place these two severities need Mealie's actual brand colors.
const buttonTokens = {
  text: { secondary: { color: MealieColors.secondary } },
  info: { background: MealieColors.info, borderColor: MealieColors.info, color: "#ffffff" },
};

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

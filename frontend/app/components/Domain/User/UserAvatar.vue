<template>
  <span
    v-if="userId"
    v-tooltip.top="tooltip && user ? user.fullName : undefined"
  >
    <Avatar
      :image="imageURL"
      shape="circle"
      :style="{ width: `${avatarSize}px`, height: `${avatarSize}px` }"
      @error="error = true"
    />
  </span>
</template>

<script setup lang="ts">
import Avatar from "primevue/avatar";
import { useUserStore } from "~/composables/store/use-user-store";

const props = defineProps({
  userId: {
    type: String,
    required: true,
  },
  list: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "42",
  },
  tooltip: {
    type: Boolean,
    default: true,
  },
});

const error = ref(false);

const auth = useMealieAuth();
const { store: users } = useUserStore();
const user = computed(() => {
  return users.value.find(user => user.id === props.userId);
});

// Vuetify's v-avatar defaulted to 48px when no explicit size was given (the `list` case);
// PrimeVue's Avatar needs an explicit size either way.
const avatarSize = computed(() => (props.list ? 48 : Number(props.size)));

const imageURL = computed(() => {
  // Note: auth.user is a ref now
  const authUser = auth.user.value;
  const key = authUser?.cacheKey ?? "";
  return `/api/media/users/${props.userId}/profile.webp?cacheKey=${key}`;
});
</script>

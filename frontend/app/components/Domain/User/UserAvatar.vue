<template>
  <Avatar
    v-if="userId"
    v-tooltip.top="tooltip && user ? user.fullName : undefined"
    shape="circle"
    :aria-label="accessibleName"
    :style="avatarStyle"
    class="user-avatar"
  >
    <img
      :src="imageURL"
      :alt="accessibleName"
      class="user-avatar-image"
    >
  </Avatar>
</template>

<script setup lang="ts">
import Avatar from "primevue/avatar";
import Tooltip from "primevue/tooltip";
import { useUserStore } from "~/composables/store/use-user-store";

const vTooltip = Tooltip;

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

const auth = useMealieAuth();
const { store: users } = useUserStore();
const user = computed(() => {
  return users.value.find(user => user.id === props.userId);
});

const imageURL = computed(() => {
  // Note: auth.user is a ref now
  const authUser = auth.user.value;
  const key = authUser?.cacheKey ?? "";
  return `/api/media/users/${props.userId}/profile.webp?cacheKey=${key}`;
});

const i18n = useI18n();
const accessibleName = computed(() => user.value?.fullName || i18n.t("user.user"));

const avatarStyle = computed(() => {
  const dimension = props.list ? "48px" : cssSize(props.size);
  return { width: dimension, height: dimension, minWidth: dimension };
});

function cssSize(size: string) {
  return /^\d+(?:\.\d+)?$/.test(size) ? `${size}px` : size;
}
</script>

<style scoped>
.user-avatar {
  overflow: hidden;
  flex-shrink: 0;
}

.user-avatar-image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

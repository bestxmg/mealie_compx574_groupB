<template>
  <PrimeAvatar
    v-if="userId"
    v-prime-tooltip.right="{ value: user?.fullName ?? '', disabled: !user || !tooltip }"
    shape="circle"
    :style="avatarStyle"
  >
    <img
      :src="imageURL"
      :alt="user?.fullName || $t('user.user')"
      class="user-avatar__image"
      @load="error = false"
      @error="error = true"
    >
  </PrimeAvatar>
</template>

<script setup lang="ts">
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

const avatarStyle = computed(() => {
  const dimension = props.list
    ? "40px"
    : /^\d+(\.\d+)?$/.test(props.size) ? `${props.size}px` : props.size;
  return {
    width: dimension,
    height: dimension,
  };
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
</script>

<style scoped>
.user-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

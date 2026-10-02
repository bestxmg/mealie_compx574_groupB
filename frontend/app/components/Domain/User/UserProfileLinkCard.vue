<template>
  <PrimeCard class="user-profile-link-card">
    <template #content>
      <NuxtLink
        :to="link.to"
        class="user-profile-link-card__main"
      >
        <div class="user-profile-link-card__layout">
          <div class="user-profile-link-card__copy">
            <div class="user-profile-link-card__title">
              <slot name="title" />
            </div>
            <div class="user-profile-link-card__text">
              <slot />
            </div>
          </div>
          <div class="user-profile-link-card__image">
            <PrimeImage
              :src="image"
              alt=""
              :image-style="{ width: '150px', height: '125px', objectFit: 'cover' }"
            />
          </div>
        </div>
      </NuxtLink>
    </template>
    <template #footer>
      <PrimeDivider />
      <div class="user-profile-link-card__actions">
        <NuxtLink :to="link.to">
          <PrimeButton
            as="span"
            variant="text"
            severity="info"
          >
            {{ link.text }}
          </PrimeButton>
        </NuxtLink>
      </div>
    </template>
  </PrimeCard>
</template>

<script setup lang="ts">
interface LinkProp {
  text: string;
  url?: string;
  to: string;
}

defineProps({
  link: {
    type: Object as () => LinkProp,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: "",
  },
});
</script>

<style scoped>
.user-profile-link-card {
  height: 100%;
  margin-top: 1rem;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
}

.user-profile-link-card :deep(.p-card-body) {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.user-profile-link-card :deep(.p-card-content) {
  flex: 1;
  display: flex;
  padding: 0;
}

.user-profile-link-card :deep(.p-card-footer) {
  margin-top: auto;
  padding: 0;
}

.user-profile-link-card__main {
  flex: 1;
  color: inherit;
  text-decoration: none;
}

.user-profile-link-card__main:focus-visible,
.user-profile-link-card__actions a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 2px;
  border-radius: 0.25rem;
}

.user-profile-link-card__layout {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.user-profile-link-card__copy {
  min-width: 0;
}

.user-profile-link-card__title {
  padding: 1rem 1rem 0;
  font-size: 1rem;
  font-weight: 500;
}

.user-profile-link-card__text {
  display: flex;
  flex-direction: row;
  margin-bottom: auto;
  padding: 1rem;
}

.user-profile-link-card__image {
  order: -1;
  padding: 0.5rem;
  margin: 0 auto;
}

.user-profile-link-card__actions {
  display: flex;
  padding: 0.5rem;
}

@media (min-width: 960px) {
  .user-profile-link-card__layout {
    flex-direction: row;
  }

  .user-profile-link-card__image {
    order: 0;
    padding: 0.5rem 2.5rem;
    margin: auto 0;
  }
}
</style>

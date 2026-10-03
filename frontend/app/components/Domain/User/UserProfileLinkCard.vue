<template>
  <NuxtLink
    :to="link.to"
    class="profile-card-link"
  >
    <Card
      :pt="cardPassThrough"
    >
      <template #content>
        <div
          v-if="smAndDown"
          class="profile-image profile-image-mobile"
        >
          <img
            :src="image"
            alt=""
            width="150"
            height="125"
          >
        </div>
        <div class="profile-card-main">
          <div class="profile-card-copy">
            <div class="profile-card-title">
              <slot name="title" />
            </div>
            <div class="profile-card-description">
              <slot name="default" />
            </div>
          </div>
          <div
            v-if="mdAndUp"
            class="profile-image profile-image-desktop"
          >
            <img
              :src="image"
              alt=""
              width="150"
              height="125"
            >
          </div>
        </div>
      </template>
      <template #footer>
        <div class="profile-card-footer">
          <span class="profile-card-action">
            {{ link.text }}
          </span>
        </div>
      </template>
    </Card>
  </NuxtLink>
</template>

<script setup lang="ts">
import Card from "primevue/card";

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

const { smAndDown, mdAndUp } = useBreakpoints();
const cardPassThrough = {
  root: { class: "profile-link-card" },
  body: { class: "profile-card-body" },
  content: { class: "profile-card-content" },
  footer: { class: "profile-card-footer" },
};
</script>

<style scoped>
.profile-card-link {
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;
}

.profile-link-card {
  height: 100%;
  border: 1px solid var(--p-content-border-color);
  background: var(--p-content-background);
  color: var(--p-content-color);
  transition:
    border-color 0.15s,
    background-color 0.15s;
}

.profile-card-body {
  display: flex;
  height: 100%;
  flex-direction: column;
  padding: 0.5rem;
}

.profile-card-content {
  flex: 1 0 auto;
  padding: 0;
}

.profile-card-footer {
  padding: 0;
}

.profile-image {
  flex: 0 0 auto;
  width: 150px;
  height: 125px;
}

.profile-image img {
  display: block;
  width: 150px;
  height: 125px;
  object-fit: contain;
}

.profile-image-mobile {
  margin: 0 auto;
  padding: 0.5rem;
}

.profile-card-main {
  display: flex;
  justify-content: space-between;
}

.profile-card-copy {
  min-width: 0;
}

.profile-card-title {
  margin: 0;
  padding: 0 0 0.25rem;
  font-size: 1rem;
  font-weight: 500;
}

.profile-card-description {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: auto;
}

.profile-image-desktop {
  align-self: center;
  margin: auto 0;
  padding: 0.5rem 2.5rem;
}

.profile-card-footer {
  border-top: 1px solid var(--p-content-border-color);
}

.profile-card-action {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  border-radius: var(--p-border-radius);
  color: var(--p-primary-color);
  font-weight: 500;
}

.profile-card-link:hover .profile-card-action {
  background: var(--p-highlight-background);
  color: var(--p-highlight-color);
}

.profile-card-link:hover .profile-link-card {
  border-color: var(--p-primary-color);
}

.profile-card-link:focus-visible {
  outline: 2px solid var(--p-focus-ring-color);
  outline-offset: 2px;
}
</style>

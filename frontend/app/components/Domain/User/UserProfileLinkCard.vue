<template>
  <Card
    :pt="{ body: { class: 'h-100 d-flex flex-column' } }"
    style="border: 1px solid lightgrey"
    class="mt-4"
  >
    <template #content>
      <NuxtLink
        :to="link.to"
        class="text-decoration-none"
        style="color: inherit"
      >
        <div
          v-if="!breakpoints.mdAndUp.value"
          class="pa-2 mx-auto"
        >
          <img
            width="150"
            height="125"
            :src="image"
            style="object-fit: contain"
          >
        </div>
        <div class="d-flex justify-space-between">
          <div>
            <div class="text-subtitle-1 pb-0">
              <slot name="title" />
            </div>
            <div class="d-flex justify-center align-center">
              <div class="d-flex flex-row mb-auto">
                <slot name="default" />
              </div>
            </div>
          </div>
          <div
            v-if="breakpoints.mdAndUp.value"
            class="py-2 px-10 my-auto"
          >
            <img
              width="150"
              height="125"
              :src="image"
              style="object-fit: contain"
            >
          </div>
        </div>
      </NuxtLink>
    </template>
    <template #footer>
      <Button
        text
        severity="info"
        :as="'router-link'"
        :to="link.to"
      >
        {{ link.text }}
      </Button>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Button from "primevue/button";
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

// Original showed the image above the text on small screens (<960px, Vuetify's smAndDown)
// and beside it on medium+ (mdAndUp); the two thresholds are complementary here so one check
// covers both branches.
const breakpoints = useBreakpoints();
</script>

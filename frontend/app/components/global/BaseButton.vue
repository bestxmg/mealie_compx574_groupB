<template>
  <Button
    :severity="disabled ? undefined : color ? mapColorToSeverity(color) : btnAttrs.severity"
    :size="small || xSmall ? 'small' : undefined"
    :loading="loading"
    :disabled="disabled"
    :variant="disabled ? 'text' : btnStyle.outlined ? 'outlined' : btnStyle.text ? 'text' : undefined"
    :as="to ? 'router-link' : 'button'"
    :to="to || undefined"
    v-bind="$attrs"
    @click="download ? downloadFile() : undefined"
  >
    <template
      v-if="!iconRight"
      #icon
    >
      <slot name="icon">
        <AppIcon
          :icon="icon || btnAttrs.icon"
          size="1.25rem"
        />
      </slot>
    </template>
    <slot name="default">
      {{ text || btnAttrs.text }}
    </slot>
    <AppIcon
      v-if="iconRight"
      :icon="icon || btnAttrs.icon"
      size="1.25rem"
    />
  </Button>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import AppIcon from "~/components/global/AppIcon.vue";
import { useUserApi } from "~/composables/api";

const props = defineProps({
  cancel: {
    type: Boolean,
    default: false,
  },
  create: {
    type: Boolean,
    default: false,
  },
  update: {
    type: Boolean,
    default: false,
  },
  edit: {
    type: Boolean,
    default: false,
  },
  save: {
    type: Boolean,
    default: false,
  },
  delete: {
    type: Boolean,
    default: false },
  download: {
    type: Boolean,
    default: false,
  },
  downloadUrl: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  small: {
    type: Boolean,
    default: false,
  },
  xSmall: {
    type: Boolean,
    default: false,
  },
  secondary: {
    type: Boolean,
    default: false,
  },
  minor: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
  text: {
    type: String,
    default: null,
  },
  icon: {
    type: String,
    default: null,
  },
  iconRight: {
    type: Boolean,
    default: false,
  },
});

const i18n = useI18n();
const { $globals } = useNuxtApp();

// PrimeVue's Button uses "severity" (its built-in palette names), not raw color strings.
// Vuetify's "success"/"info"/"error"/"warning" already match PrimeVue's severity names 1:1;
// only "grey" (used by cancel) doesn't exist in PrimeVue and maps to "secondary" instead.
const buttonOptions = {
  create: {
    text: i18n.t("general.create"),
    icon: $globals.icons.createAlt,
    severity: "success",
  },
  update: {
    text: i18n.t("general.update"),
    icon: $globals.icons.edit,
    severity: "success",
  },
  save: {
    text: i18n.t("general.save"),
    icon: $globals.icons.save,
    severity: "success",
  },
  edit: {
    text: i18n.t("general.edit"),
    icon: $globals.icons.edit,
    severity: "info",
  },
  delete: {
    text: i18n.t("general.delete"),
    icon: $globals.icons.delete,
    severity: "danger",
  },
  cancel: {
    text: i18n.t("general.cancel"),
    icon: $globals.icons.close,
    severity: "secondary",
  },
  download: {
    text: i18n.t("general.download"),
    icon: $globals.icons.download,
    severity: "info",
  },
};

const btnAttrs = computed(() => {
  if (props.delete) {
    return buttonOptions.delete;
  }
  if (props.update) {
    return buttonOptions.update;
  }
  if (props.edit) {
    return buttonOptions.edit;
  }
  if (props.cancel) {
    return buttonOptions.cancel;
  }
  if (props.save) {
    return buttonOptions.save;
  }
  if (props.download) {
    return buttonOptions.download;
  }
  return buttonOptions.create;
});

const buttonStyles = {
  defaults: { text: false, outlined: false },
  secondary: { text: false, outlined: true },
  minor: { text: true, outlined: false },
};

// Callers still pass Vuetify's color names via the `color` prop (e.g. color="error").
// PrimeVue's severity names differ in two spots: "error" -> "danger", "grey" -> "secondary".
function mapColorToSeverity(vuetifyColor: string): string {
  const map: Record<string, string> = { error: "danger", grey: "secondary", gray: "secondary" };
  return map[vuetifyColor] ?? vuetifyColor;
}

const btnStyle = computed(() => {
  if (props.secondary) {
    return buttonStyles.secondary;
  }
  if (props.minor || props.cancel) {
    return buttonStyles.minor;
  }
  return buttonStyles.defaults;
});

const api = useUserApi();
function downloadFile() {
  api.utils.download(props.downloadUrl);
}
</script>

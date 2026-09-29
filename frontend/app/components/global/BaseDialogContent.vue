<template>
  <div
    class="flex align-items-center gap-2 w-full"
    :class="isMobile ? 'flex-column align-items-stretch' : ''"
  >
    <slot name="card-actions">
      <Button
        text
        severity="secondary"
        @click="emit('cancel')"
      >
        {{ cancelLabel }}
      </Button>
      <div
        v-if="!isMobile"
        class="flex-grow-1"
      />
      <slot name="custom-card-action" />
      <BaseButton
        v-if="canDelete"
        delete
        @click="emit('delete')"
      />
      <BaseButton
        v-if="canConfirm"
        :color="color"
        type="submit"
        :disabled="submitDisabled"
        @click="emit('confirm')"
      >
        <template #icon>
          <AppIcon :icon="$globals.icons.check" />
        </template>
        {{ $t("general.confirm") }}
      </BaseButton>
      <BaseButton
        v-if="canSubmit"
        type="submit"
        :disabled="submitDisabled || loading"
        @click="emit('submit')"
      >
        {{ submitLabel }}
        <template
          v-if="submitIcon"
          #icon
        >
          {{ submitIcon }}
        </template>
      </BaseButton>
    </slot>
  </div>
</template>

<script setup lang="ts">
import Button from "primevue/button";
import AppIcon from "~/components/global/AppIcon.vue";
import { useGlobalI18n } from "~/composables/use-global-i18n";

interface DialogContentProps {
  color?: string;
  loading?: boolean;
  isMobile?: boolean;

  // submit
  submitIcon?: string | null;
  submitText?: string;
  submitDisabled?: boolean;

  // cancel
  cancelText?: string;

  // actions
  canDelete?: boolean;
  canConfirm?: boolean;
  canSubmit?: boolean;
}

interface DialogContentEmits {
  (e: "submit" | "cancel" | "confirm" | "delete"): void;
}

const props = withDefaults(defineProps<DialogContentProps>(), {
  color: "primary",
  loading: false,
  isMobile: false,

  // submit
  submitIcon: null,
  submitDisabled: false,

  // actions
  canDelete: false,
  canConfirm: false,
  canSubmit: false,
});
const emit = defineEmits<DialogContentEmits>();

const i18n = useGlobalI18n();

const submitLabel = computed(() => props.submitText ?? i18n.t("general.create"));
const cancelLabel = computed(() => props.cancelText ?? i18n.t("general.cancel"));
</script>

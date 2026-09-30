<template>
  <div>
    <slot
      name="activator"
      v-bind="{ open }"
    />
    <Dialog
      v-model:visible="dialog"
      modal
      :position="bottomSheet && isMobile ? 'bottom' : (top ? 'top' : 'center')"
      :style="{ width: isMobile ? '100%' : dialogWidth }"
      :maximizable="false"
      :class="[top ? 'top-dialog' : '', bottomSheet && isMobile ? 'bottom-sheet-dialog' : '']"
      @keydown.enter="submitOnEnter"
      @update:visible="(val) => !val && emit('cancel')"
      @keydown.esc="emit('cancel')"
    >
      <template #header>
        <div class="flex align-items-center gap-2">
          <AppIcon
            v-if="icon"
            :icon="icon"
          />
          <span class="font-bold">{{ title }}</span>
        </div>
      </template>

      <ProgressBar
        v-if="loading"
        mode="indeterminate"
        style="height: 4px"
        class="mb-3"
      />

      <slot v-bind="{ submitEvent }" />

      <template #footer>
        <BaseDialogContent
          :color="color"
          :loading="loading"
          :is-mobile="isMobile"
          :submit-icon="submitIcon"
          :submit-text="submitText"
          :submit-disabled="submitDisabled"
          :cancel-text="cancelText"
          :can-delete="canDelete"
          :can-confirm="canConfirm"
          :can-submit="canSubmit"
          @cancel="bindings.onCancel"
          @confirm="bindings.onConfirm"
          @submit="bindings.onSubmit"
          @delete="bindings.onDelete"
        >
          <template #card-actions>
            <slot name="card-actions" />
          </template>
          <template #custom-card-action>
            <slot name="custom-card-action" />
          </template>
        </BaseDialogContent>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Dialog from "primevue/dialog";
import ProgressBar from "primevue/progressbar";
import AppIcon from "~/components/global/AppIcon.vue";

const { xs: isMobile } = useBreakpoints();

interface DialogProps {
  modelValue: boolean;
  color?: string;
  title?: string;
  icon?: string | null;
  width?: number | string;
  maxWidth?: number | string | null;
  loading?: boolean;
  top?: boolean | null;
  keepOpen?: boolean;
  bottomSheet?: boolean;

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
  disableSubmitOnEnter?: boolean;
}

interface DialogEmits {
  (e: "update:modelValue", value: boolean): void;
  (e: "submit" | "cancel" | "confirm" | "delete" | "close"): void;
}

const props = withDefaults(defineProps<DialogProps>(), {
  color: "primary",
  title: "Modal Title",
  icon: null,
  width: "500",
  maxWidth: null,
  loading: false,
  top: null,
  keepOpen: false,
  bottomSheet: false,

  // submit
  submitIcon: null,
  submitDisabled: false,

  // actions
  canDelete: false,
  canConfirm: false,
  canSubmit: false,
  disableSubmitOnEnter: false,
});
const emit = defineEmits<DialogEmits>();

const dialog = computed({
  get: () => props.modelValue,
  set: val => emit("update:modelValue", val),
});

// PrimeVue's Dialog wants a CSS width, not a bare number like Vuetify's :width="500" did.
const dialogWidth = computed(() => {
  const w = props.maxWidth ?? props.width ?? "500";
  return typeof w === "number" || /^\d+$/.test(String(w)) ? `${w}px` : String(w);
});

const submitted = ref(false);

const determineClose = computed(() => {
  return submitted.value && !props.loading && !props.keepOpen;
});

watch(determineClose, (shouldClose) => {
  if (shouldClose) {
    submitted.value = false;
    dialog.value = false;
  }
});

watch(dialog, (val) => {
  if (val) submitted.value = false;
  if (!val) emit("close");
});

function submitEvent() {
  emit("submit");
  submitted.value = true;
}

function submitOnEnter() {
  if (props.disableSubmitOnEnter) {
    return;
  }

  if (props.canConfirm) {
    if (!props.submitDisabled) {
      emit("confirm");
      dialog.value = false;
    }
    return;
  }

  submitEvent();
}

function deleteEvent() {
  emit("delete");
  submitted.value = true;
}

function open() {
  dialog.value = true;
}

const bindings = {
  onCancel: () => {
    emit("cancel");
    dialog.value = false;
  },
  onConfirm: () => {
    emit("confirm");
    dialog.value = false;
  },
  onSubmit: submitEvent,
  onDelete: deleteEvent,
};
</script>

<style>
.top-dialog {
  position: fixed;
  top: 0;
}

.bottom-sheet-dialog .p-dialog-content {
  border-radius: 1.25rem 1.25rem 0 0;
}
</style>

<template>
  <div class="password-strength__container">
    <div class="password-strength__content">
      <strong> {{ $t("user.password-strength", { strength: pwStrength.strength.value }) }}</strong>
      <PrimeProgressBar
        :value="pwStrength.score.value"
        :show-value="false"
        :class="`password-strength__bar password-strength__bar--${pwStrength.color.value}`"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePasswordStrength } from "~/composables/use-passwords";

const modelValue = defineModel<string>({ default: "" });
const i18n = useI18n();

const pwStrength = usePasswordStrength(modelValue, i18n);
</script>

<style scoped>
.password-strength__bar {
  height: 15px;
  border-radius: 9999px;
  overflow: hidden;
}

.password-strength__bar--error :deep(.p-progressbar-value) {
  background-color: var(--p-red-500);
}

.password-strength__bar--warning :deep(.p-progressbar-value) {
  background-color: var(--p-orange-500);
}

.password-strength__bar--info :deep(.p-progressbar-value) {
  background-color: var(--p-blue-500);
}

.password-strength__bar--success :deep(.p-progressbar-value) {
  background-color: var(--p-green-500);
}

.password-strength__container {
  display: flex;
  padding-bottom: 1.5rem;
  margin-top: -0.25rem;
  margin-left: 2.5rem;
}

.password-strength__content {
  flex-basis: 500px;
}
</style>

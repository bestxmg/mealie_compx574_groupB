<template>
  <div class="password-strength">
    <div class="password-strength-content">
      <strong> {{ $t("user.password-strength", { strength: pwStrength.strength.value }) }}</strong>
      <ProgressBar
        :value="pwStrength.score.value"
        :severity="pwStrength.color.value"
        :show-value="false"
        class="password-strength-bar"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProgressBar from "primevue/progressbar";
import { usePasswordStrength } from "~/composables/use-passwords";

const modelValue = defineModel<string>({ default: "" });
const i18n = useI18n();

const pwStrength = usePasswordStrength(modelValue, i18n);
</script>

<style scoped>
.password-strength {
  display: flex;
  margin: -0.25rem 0 1.5rem 2.5rem;
}

.password-strength-content {
  flex-basis: 500px;
  max-width: 100%;
}

.password-strength-bar {
  height: 15px;
  border-radius: 9999px;
  overflow: hidden;
}
</style>

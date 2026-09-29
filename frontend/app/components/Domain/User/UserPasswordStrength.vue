<template>
  <div class="d-flex pb-6 mt-n1 ml-10">
    <div style="flex-basis: 500px">
      <strong> {{ $t("user.password-strength", { strength: pwStrength.strength.value }) }}</strong>
      <ProgressBar
        :value="pwStrength.score.value"
        :show-value="false"
        style="height: 15px"
        :pt="{ value: { style: { backgroundColor: pwStrength.color.value } } }"
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

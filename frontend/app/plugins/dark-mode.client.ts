import { useDark } from "@vueuse/core";

export default defineNuxtPlugin((nuxtApp) => {
  const isDark = useDark({
    onChanged: (v) => {
      console.log(`changing theme to ${v ? "dark" : "light"} using @vueuse/useDark`);
      document.documentElement.classList.toggle("dark", v);
      const $vuetify = nuxtApp.vueApp.$nuxt.$vuetify;
      if ($vuetify)
        $vuetify.theme.toggle();
    },
  });

  document.documentElement.classList.toggle("dark", isDark.value);

  nuxtApp.hook("vuetify:ready", (vuetify) => {
    vuetify.theme.change(isDark.value ? "dark" : "light");
  });

  return {
    provide: {},
  };
});

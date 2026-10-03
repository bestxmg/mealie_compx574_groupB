import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

// Mirrors mealie's current Vuetify palette (see frontend/vuetify.options.js) so the
// PrimeVue swap changes the component library, not the brand colors.
export const MealiePreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{orange.50}",
      100: "{orange.100}",
      200: "{orange.200}",
      300: "{orange.300}",
      400: "{orange.400}",
      500: "#E58325",
      600: "#cc7420",
      700: "#b3651c",
      800: "#995617",
      900: "#804713",
      950: "#66380f",
    },
    colorScheme: {
      light: {
        surface: {
          0: "#ffffff",
        },
      },
    },
  },
  components: {
    // Aura's "info" severity is sky blue; Mealie's info is #1976d2 (same in light and dark
    // mode). Every state is overridden, or hover/press/focus would fall back to sky blue.
    button: {
      root: {
        info: {
          background: "#1976d2",
          hoverBackground: "#1565c0",
          activeBackground: "#0d47a1",
          borderColor: "#1976d2",
          hoverBorderColor: "#1565c0",
          activeBorderColor: "#0d47a1",
          color: "#ffffff",
          hoverColor: "#ffffff",
          activeColor: "#ffffff",
          focusRing: {
            color: "#1976d2",
            shadow: "none",
          },
        },
      },
    },
  },
});

// Named brand colors used directly by components (severity props etc. use these names).
export const MealieColors = {
  primary: "#E58325",
  accent: "#007A99",
  secondary: "#973542",
  success: "#43A047",
  info: "#1976d2",
  warning: "#FF6D00",
  error: "#EF5350",
};

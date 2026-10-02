import { definePreset } from "@primeuix/themes";
import Aura from "@primeuix/themes/aura";

const MealiePrimeVueTheme = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{orange.50}",
      100: "{orange.100}",
      200: "{orange.200}",
      300: "{orange.300}",
      400: "{orange.400}",
      500: "{orange.500}",
      600: "{orange.600}",
      700: "{orange.700}",
      800: "{orange.800}",
      900: "{orange.900}",
      950: "{orange.950}",
    },
    colorScheme: {
      light: {
        primary: {
          color: "#E58325",
          contrastColor: "#ffffff",
          hoverColor: "#cc7320",
          activeColor: "#b3661d",
        },
        highlight: {
          background: "#fff4e8",
          focusBackground: "#ffe4c9",
          color: "#8b4e19",
          focusColor: "#713f15",
        },
      },
      dark: {
        primary: {
          color: "#E58325",
          contrastColor: "#1E1E1E",
          hoverColor: "#f09a45",
          activeColor: "#f5ad64",
        },
        highlight: {
          background: "rgba(229, 131, 37, 0.16)",
          focusBackground: "rgba(229, 131, 37, 0.24)",
          color: "#f3a354",
          focusColor: "#ffc17f",
        },
      },
    },
  },
});

export default MealiePrimeVueTheme;

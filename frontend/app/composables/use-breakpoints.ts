// Drop-in replacement for Vuetify's useDisplay()/$vuetify.display, so call sites across
// the app don't need to change as Vuetify is removed component by component.
// Breakpoints match Vuetify 3's defaults: https://vuetifyjs.com/en/features/display-and-platform/
const BREAKPOINTS = {
  xs: 600,
  sm: 960,
  md: 1264,
  lg: 1904,
} as const;

function matches(query: string) {
  const isMatch = ref(import.meta.client ? window.matchMedia(query).matches : false);

  if (import.meta.client) {
    const mql = window.matchMedia(query);
    const onChange = () => {
      isMatch.value = mql.matches;
    };
    mql.addEventListener("change", onChange);
    onUnmounted(() => mql.removeEventListener("change", onChange));
  }

  return isMatch;
}

export function useBreakpoints() {
  return {
    xs: matches(`(max-width: ${BREAKPOINTS.xs - 1}px)`),
    smAndUp: matches(`(min-width: ${BREAKPOINTS.xs}px)`),
    smAndDown: matches(`(max-width: ${BREAKPOINTS.sm - 1}px)`),
    mdAndUp: matches(`(min-width: ${BREAKPOINTS.sm}px)`),
    mdAndDown: matches(`(max-width: ${BREAKPOINTS.md - 1}px)`),
    lgAndUp: matches(`(min-width: ${BREAKPOINTS.md}px)`),
    lgAndDown: matches(`(max-width: ${BREAKPOINTS.lg - 1}px)`),
  };
}

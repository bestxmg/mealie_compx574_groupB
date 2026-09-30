// Drop-in replacement for Vuetify's useDisplay()/$vuetify.display, so call sites across
// the app don't need to change as Vuetify is removed component by component.
//
// This wraps @vueuse/core's own useBreakpoints() rather than hand-rolling matchMedia
// listeners: it already ships a Vuetify-matching preset (breakpointsVuetifyV3), and
// already handles SSR and listener cleanup. An earlier version of this file hand-typed
// the breakpoint pixel values and got them wrong (md: 1264 instead of 960, lg: 1904
// instead of 1280) -- delegating removes that whole class of mistake.
import { breakpointsVuetifyV3, useBreakpoints as useVueUseBreakpoints } from "@vueuse/core";

export function useBreakpoints() {
  const bp = useVueUseBreakpoints(breakpointsVuetifyV3);
  return {
    xs: bp.smaller("sm"),
    smAndUp: bp.greaterOrEqual("sm"),
    smAndDown: bp.smaller("md"),
    mdAndUp: bp.greaterOrEqual("md"),
    mdAndDown: bp.smaller("lg"),
    lgAndUp: bp.greaterOrEqual("lg"),
    lgAndDown: bp.smaller("xl"),
  };
}

import VueTippy from "vue-tippy";
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTippy, {
    theme: "dark",
    directive: "tippy", // => v-tippy
    component: "tippy", // => <tippy/>
    defaultProps: {
      // duration: 50,
      placement: "auto-end",
      allowHTML: true,
      arrow: false,
    },
  });
});

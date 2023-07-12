// formkit.config.js
import {
  createProPlugin,
  rating,
  toggle,
  autocomplete,
  datepicker,
  dropdown,
  mask,
  repeater,
  slider,
  taglist,
  transferlist,
} from "@formkit/pro";
import { generateClasses } from "@formkit/themes";
import { genesisIcons } from "@formkit/icons";
import { en } from "@formkit/i18n";
import { DefaultConfigOptions } from "@formkit/vue";
import customTheme from "@/theme.formkit";
const pro = createProPlugin("fk-7aaf953c8dd", {
  rating,
  toggle,
  autocomplete,
  datepicker,
  dropdown,
  mask,
  repeater,
  slider,
  taglist,
  transferlist,
});

const config: DefaultConfigOptions = {
  plugins: [pro],
  locales: { en },
  locale: "en",
  icons: {
    ...genesisIcons,
  },
  config: {
    classes: generateClasses(customTheme),
  },
};

export default config;

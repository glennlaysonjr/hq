// formkit.config.js
import { generateClasses } from "@formkit/themes";
import { genesisIcons } from "@formkit/icons";
import { en } from "@formkit/i18n";
import { DefaultConfigOptions } from "@formkit/vue";
import customTheme from "@/theme.formkit";

const config: DefaultConfigOptions = {
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

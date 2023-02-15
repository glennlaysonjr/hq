import { createAutoAnimatePlugin } from "@formkit/addons";
import { clone } from "@formkit/utils";

import {
  add,
  arrowDown,
  arrowUp,
  check,
  circle,
  close,
  down,
  fileDoc,
  spinner,
  star,
  trash,
} from "@formkit/icons";
import { createProPlugin, inputs, mask, taglist } from "@formkit/pro";
import { generateClasses } from "@formkit/themes";
import { createInput, DefaultConfigOptions } from "@formkit/vue";
import { form } from "./components/Inputs/form";
import OneTimePassword from "./components/Inputs/OneTimePassword.vue";
import PhoneNumberInput from "./components/Inputs/PhoneNumberInput.vue";
import PhoneMask from "./components/Common/PhoneMask.vue";

const pro = createProPlugin("fk-405606afa2d", inputs, mask, taglist);

const textClassification = {
  outer: "relative",
  label: "",
  inner: "min-w-full",
  input:
    "peer min-w-full !placeholder-transparent !pt-[20px] !pb-[12px] max-w-md border border-black/25 !rounded-[4px] overflow-hidden focus:ring-transparent formkit-invalid:border-red-500 focus-within:border-black transition",
  help: "text-xs text-gray-500",
  messages: "list-none p-0 mt-0 mb-0",
  message: "text-red-500 mb-0 text-xs",
  wrapper: "min-w-full floating-label",
};

const moveLabelPlugin = function (node) {
  node.on("created", () => {
    const inputDefinition = clone(node.props.definition);
    const originalSchema = inputDefinition.schema;
    const higherOrderSchema = (extensions) => {
      extensions.label = { $el: null, children: null };
      extensions.suffix = {
        $el: "label",
        children: "$label",
        attrs: {
          class: "$classes.floating",
          for: "$id",
        },
      };
      return originalSchema(extensions);
    };

    inputDefinition.schema = higherOrderSchema;
    node.props.definition = inputDefinition;
  });
};

const config: DefaultConfigOptions = {
  plugins: [pro, createAutoAnimatePlugin(), moveLabelPlugin],
  inputs: {
    form,
    otp: createInput(OneTimePassword, {
      props: ["digits"],
    }),
    tel: createInput(PhoneNumberInput),
    phoneMask: createInput(PhoneMask, {
      props: ["calling"],
    }),
  },
  config: {
    classes: generateClasses({
      text: {
        ...textClassification,
        inner: textClassification.inner + " flex ",
      },
      password: textClassification,
      number: textClassification,
      otp: {
        ...textClassification,
        inner:
          "w-full rounded-lg mb-1  formkit-invalid:border-red-500  transition flex flex-row gap-2",
        digit:
          "w-1/6 h-[75px] p-2 rounded text-center  text-gray-700 border border-gray-200 formkit-invalid:border-red-500 focus-within:border-black transition focus:ring-0 shadow-card",
      },
      button: {
        input:
          "px-9 py-3 bg-black text-white font-bold [&_.formkit-floating]:hidden",
      },
      submit: {
        input:
          "px-9 py-3 bg-black text-white font-bold [&_.formkit-floating]:hidden",
      },
      form: textClassification,
      select: textClassification,
      tel: {
        ...textClassification,
        inner:
          "max-w-md border border-gray-200 rounded-lg mb-1 formkit-invalid:border-red-500 focus-within:border-black transition",
      },
      url: textClassification,
      dropdown: {
        outer: "max-w-md w-full",
        wrapper: "border border-[#999999] rounded-[4px]",
        inner: "py-2 pt-2 pb-1",
        placeholder: "",
        selection: "min-w-[100px]",
      },
      toggle: {
        inner: "$reset inline-block mr-2",
        input: "peer fixed left-[999em] opacity-0 pointer-events-none",
        thumb:
          "relative left-0 aspect-square rounded-full transition-all w-5 bg-white !curser-pointer",
        track:
          "px-[2px] py-[1px] focus-within:!shadow-none focus:!shadow-none !shadow-none",
        wrapper: "flex flex-wrap items-center mb-1",
        outer: "[&_.formkit-floating]:hidden",
      },
      autocomplete: {
        outer:
          " w-full group !rounded-[4px] focus:ring-transparent focus-within:border-black",
        wrapper: "relative !max-w-full",
        inner: "w-full !rounded-[4px] transition flex grow",
        input:
          "peer !placeholder-transparent w-full !pt-[20px] !pb-[12px] !border-0 !rounded-[4px] overflow-hidden transition focus:!border-0 focus:!ring-0 focus-within:!ring-0  focus:!ring-transparent focus-within:!ring-transparent",
      },
      mask: {
        outer: "relative",
        label: "",
        inner: "min-w-full",
        input:
          "peer min-w-full !placeholder-transparent !pt-[20px] !pb-[12px] max-w-md border border-black/25 !rounded-[4px] overflow-hidden focus:ring-0 focus:ring-transparent formkit-invalid:border-red-500 focus-within:border-black transition",
      },
    }),
  },
  icons: {
    close,
    down,
    fileDoc,
    check,
    circle,
    spinner,
    star,
    trash,
    add,
    arrowUp,
    arrowDown,
    checkboxDecorator: check,
  },
};

export default config;

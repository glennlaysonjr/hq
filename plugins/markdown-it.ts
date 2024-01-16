// @/plugins/markdownit.ts
import { componentPlugin } from "@mdit-vue/plugin-component";
import md from "markdown-it";
import markdownItAttrs from "markdown-it-attrs";
import blockEmbedPlugin from "markdown-it-block-embed";
import copyCode from "markdown-it-code-copy";
import taskCheckbox from "markdown-it-task-checkbox";

export default defineNuxtPlugin(() => {
  const renderer = md({ html: true })
    .use(markdownItAttrs, {
      leftDelimiter: "{",
      rightDelimiter: "}",
      allowedAttributes: [], // empty array = all attributes are allowed
    })
    .use(blockEmbedPlugin, {
      containerClassName: "video-embed",
    })
    .use(taskCheckbox, {
      disabled: true,
      divWrap: false,
      divClass: "checkbox",
      idPrefix: "cbx_",
      ulClass: "task-list",
      liClass: "task-list-item",
    })
    .use(copyCode, {
      iconStyle: "font-size: 21px; opacity: 0.4;",
      iconClass: "mdi mdi-content-copy",
      buttonStyle:
        "position: absolute; top: 7.5px; right: 6px; cursor: pointer; outline: none;",
      buttonClass: "copy-code-button",
    })
    .use(componentPlugin, {
      // options
    });

  return {
    provide: {
      mdRenderer: renderer,
    },
  };
});

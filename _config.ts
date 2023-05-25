import lume from "lume/mod.ts";
import basePath from "lume/plugins/base_path.ts";
import date from "lume/plugins/date.ts";
import esbuild from "lume/plugins/esbuild.ts";
import metas from "lume/plugins/metas.ts";
import sheets from "lume/plugins/sheets.ts";

import autoDependency from "oi-lume-utils/processors/auto-dependency.ts";

const site = lume({
  src: "./src",
  location: new URL(
    "https://open-innovations.github.io/register-of-members-interests-proto/",
  ),
  components: {
    cssFile: "/assets/css/components.css",
    jsFile: "/assets/js/components.js",
  },
});

site.copy([".css"]);

site.process([".html"], autoDependency);

function objectToList(
  o: { [k: string]: Record<string, unknown> },
  id_field = "id",
) {
  return Object.entries(o).map(([k, v]) => ({ [id_field]: k, ...v }));
}
site.filter("listify", objectToList);

site.use(basePath());
site.use(date());
site.use(esbuild({
  extensions: [".ts", ".js"],
  options: {
    bundle: true,
    format: "iife",
    minify: true,
    keepNames: false,
    platform: "browser",
    target: "es6",
    treeShaking: true,
  },
}));
site.use(sheets());
site.use(metas({
  defaultPageData: {
    title: "title", // Use the `title` value as fallback.
  },
}));

export default site;

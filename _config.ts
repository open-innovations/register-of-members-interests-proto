import lume from "lume/mod.ts";
import basePath from "lume/plugins/base_path.ts";
import date from "lume/plugins/date.ts";
import esbuild from 'lume/plugins/esbuild.ts';
import sheets from "lume/plugins/sheets.ts";

import autoDependency from 'oi-lume-utils/processors/auto-dependency.ts';

const site = lume({
  src: "./src",
  location: new URL('https://open-innovations.github.io/register-of-members-interests-proto/'),
  components: {
    cssFile: "/assets/css/components.css",
    jsFile: "/assets/js/components.js",
  },
});

site.copy([".css"]);

site.process(['.html'], autoDependency)

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
    incremental: true,
    treeShaking: true,
  },
}));
site.use(sheets());

export default site;

import lume from "lume/mod.ts";
import basePath from "lume/plugins/base_path.ts";
import sheets from "lume/plugins/sheets.ts";
import date from "lume/plugins/date.ts";

const site = lume({
  src: "./src",
  location: new URL('https://open-innovations.github.io/register-of-members-interests-proto/'),
  components: {
    cssFile: "/assets/css/components.css",
    jsFile: "/assets/js/components.js",
  },
});

site.copy([".css"]);

site.use(basePath());
site.use(date());
site.use(sheets());

export default site;

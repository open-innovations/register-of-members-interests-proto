export const layout = "layouts/ruleset.njk";
export const tags = ["ruleset"];

export default function* ({ rulesets }) {
  for (const [ruleset, config] of Object.entries(rulesets)) {
    if (!config?.draft)
      yield {
        ...config,
        title: `Ruleset: ${ config.name }`,
        current_ruleset: ruleset,
        url: `/ruleset/${ruleset}/`,
      };
  }
}

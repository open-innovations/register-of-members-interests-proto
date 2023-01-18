export const layout = "layouts/ruleset.njk";
export const tags = ["ruleset"];

export default function* ({ rulesets, scopes }) {
  for (const [ruleset, config] of Object.entries(rulesets)) {
    if (!config?.draft)
      yield {
        ...config,
        scope_name: scopes[config.scope].name,
        title: `Ruleset: ${ config.name }`,
        current_ruleset: ruleset,
        url: `/ruleset/${ruleset}/`,
      };
  }
}

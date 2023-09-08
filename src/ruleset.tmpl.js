import { descend } from "./_helpers/descend.ts";

export const layout = "layouts/ruleset.njk";
export const tags = ["ruleset"];

export default function* ({ rulesets, scopes, features }) {
  /** Build flat features file */
  const flatFeatures = descend(['', features]).reduce((result, { path, ...rest }) => ({ ...result, [path]: rest }), {});

  /**
   * Calculates direct and transitive features
   * 
   * @param available List of available features
   * @returns string[]
   */
  function calculateFeatures(available) {
    /** Initialise the result with the list of available features */
    const result = [...available];

    /** Iterate around the features, following the trail to find transitively enabled features. */
    let featuresLength = undefined;
    do {
      featuresLength = result.length;

      /** For each currently known feature,
       * find which features that enables
       * then flatten the array
       * and filter out any that are already known
       */
      const transitive = result
        .map(f => flatFeatures[f]?.enables || [])
        .flat()
        .filter(f => !result.includes(f));

      /** Add the transitive list back to the array */
      result.push(...transitive);

      /** Loop until the array doesn't get any longer */
    } while (result.length !== featuresLength)

    /** That's all folks! */
    return result;
  }

  for (const [ruleset, config] of Object.entries(rulesets)) {
    // If not a draft ruleset
    if (config?.draft !== true) {
      // Yield the page data for the current page
      yield {
        ...config,
        available: calculateFeatures(Object.keys(config.available)),
        scope_name: scopes[config.scope].name,
        title: `Ruleset: ${ config.name }`,
        current_ruleset: ruleset,
        url: `/ruleset/${ruleset}/`,
      };
    }
  }
}

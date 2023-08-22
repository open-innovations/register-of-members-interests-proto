export default function (
  { id, current_ruleset: currentRuleset, competency, rulesets, text, search },
) {
  const ruleset = rulesets[currentRuleset];
  if (ruleset === undefined) throw "Unknown ruleset";

  const scopeRegex = new RegExp(`^${ruleset.scope}\.`);

  let result = "";

  const dependencies = (
    competency[id]?.dependencies
    || []
  ).filter(x => x.match(scopeRegex));

  result += 'data-required-features="' + dependencies + '"';

  // Get get page for current ruleset
  const page = search.page(`ruleset current_ruleset=${currentRuleset}`);
  const { available } = page.data;
  
  // Test for enabled enabled features
  const isEnabled = (dependency) => available.includes(dependency);

  function scoreDependencies(dependency) {
    if (isEnabled(dependency)) return 1;
    return 0;
  }

  const score = dependencies.length > 0
    ? dependencies.map(scoreDependencies)
      .reduce((total, current) => total * current, 1)
    : undefined;

  if (score !== undefined) result += ' data-score="' + score + '" aria-label="' + (score==1 ? "Possible" : "Not possible") + ": " + id + ": " + text + '"';

  return result;
}

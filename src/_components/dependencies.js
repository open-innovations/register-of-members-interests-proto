export default function (
  { id, current_ruleset: currentRuleset, competency, rulesets, text },
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

  const features = Object.keys(ruleset.available);

  function scoreDependencies(dependency) {
    if (features.includes(dependency)) return 1;
    return 0;
  }

  const score = dependencies.length > 0
    ? dependencies.map(scoreDependencies)
      .reduce((total, current) => total * current, 1)
    : undefined;

  if (score !== undefined) result += ' data-score="' + score + '" aria-label="' + (score==1 ? "Possible" : "Not possible") + ": " + id + ": " + text + '"';

  return result;
}

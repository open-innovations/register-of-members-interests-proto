export default function (
  { id, current_state: currentState, competency, states, text },
) {
  const state = states[currentState];
  if (state === undefined) throw "Unknown state";

  const scopeRegex = new RegExp(`^${state.scope}\.`);

  let result = "";

  const dependencies = (
    competency[id]?.dependencies
    || []
  ).filter(x => x.match(scopeRegex));

  result += 'data-required-features="' + dependencies + '"';

  const features = Object.keys(state.available);

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

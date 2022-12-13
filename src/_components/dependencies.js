export default function (
  { id, current_state: currentState, competency, states, text },
) {
  const state = states[currentState];
  if (state === undefined) throw "Unknown state";

  let result = "";

  const dependencies = competency[id]?.dependencies || [];
  result += 'data-required-features="' + dependencies + '"';

  const features = Object.keys(state.available);
  const score = dependencies.length > 0
    ? dependencies.map((dependency) => features.includes(dependency) && 1 || 0)
      .reduce((total, current) => total * current, 1)
    : undefined;
	console.log(id)
  if (score !== undefined) result += ' data-score="' + score + '" aria-label="' + (score==1 ? "Possible" : "Not possible") + ": " + id + ": " + text + '"';

  return result;
}

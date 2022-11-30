export const layout = "layouts/state.njk";
export const tags = ["state"];

export default function* ({ states }) {
  for (const [state, config] of Object.entries(states)) {
    if (!config?.draft)
      yield {
        ...config,
        current_state: state,
        url: `/state/${state}/`,
      };
  }
}

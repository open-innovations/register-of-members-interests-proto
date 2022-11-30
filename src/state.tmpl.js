export const layout = 'layouts/state.njk';
export const tags = ['state'];

export default function*({ states }) {
  for (const state of Object.keys(states)) {
    console.log(state);
    yield {
      current_state: state,
      url: `/state/${state}/`,
    };
  }
}
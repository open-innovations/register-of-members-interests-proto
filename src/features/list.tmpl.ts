export const layout = 'layouts/feature-list.njk';

function isAFeature(entry: Record<string, unknown>) {
  const nonObjectChildren = Object.values(entry).filter(x => typeof x !== 'object').length;
  return nonObjectChildren > 0;
}

function descend([key, value]: [string, unknown], parentNamespace: (string | undefined) = undefined): Record<string, unknown>[] | undefined {
  const namespace = [parentNamespace, key].filter(x => x).join('.');
  if (!value) return;
  const { description } = value;
  if (isAFeature(value)) return [{ path: namespace, description }];
  return Object.entries(value).map((e) => descend(e, namespace)).flat().filter(x => x);
}

export default function* ({ features }) {
  for (const [scope, entries] of Object.entries(features)) {
    const featureList = descend([scope, entries]);
    yield {
      url: `/features/${scope}/`,
      scope: scope,
      features: entries,
      featureList,
    }
  }
}
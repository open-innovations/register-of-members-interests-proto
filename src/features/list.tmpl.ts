import { FeatureTreeNode, descend } from "../_helpers/descend.ts";

export const layout = 'layouts/feature-list.njk';

export default function* ({ features, scopes }: { features: FeatureTreeNode, scopes: Record<string, { name: string}> }) {
  for (const [scope, entries] of Object.entries(features)) {
    const featureList = descend([scope, entries]);
    yield {
      url: `/features/${scope}/`,
      scope: scope,
      scope_name: scopes[scope].name,
      features: entries,
      featureList,
    }
  }
}
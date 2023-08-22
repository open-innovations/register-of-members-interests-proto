 
/**
 * This is what a leaf node describing a feature looks like
 */
type Feature = {
  description: string;
  type?: string;
  format?: string;
  enables?: string[];
}

/**
 * A flattened leaf feature node includes path information, which is a namespaced name
 */
type FlattenedFeature = {
  path: string;
} & Pick<Feature, 'description' | 'enables'>;

/**
 * A non-leaf (or potential leaf) node contains other BranchNodes
 */
export type FeatureTreeNode = Feature | {
  [nodeName: string]: FeatureTreeNode;
}

/**
 * Tests if a given node is a feature.
 * 
 * The test is that if the entry has only non-object children, it's a feature.
 * TODO check if this is sufficent.
 * 
 * @param entry A node to test for feature-y-ness
 * @returns 
 */
function isAFeature(entry: FeatureTreeNode) {
  const nonObjectChildren =
    Object.values(entry).filter((x) => typeof x !== "object").length;
  return nonObjectChildren > 0;
}

/**
 * Flattens a tree into an array of objects with an additional namespaced path property.
 * 
 * @param [key, value] First key and features to descend
 * @param parentNamespace 
 * @returns List of feature objects with additional path parameter
 */
export function descend(
  [key, value]: [string, FeatureTreeNode],
  parentNamespace: string | undefined = undefined,
): FlattenedFeature[] {
  // Construct namespace from parentNamespace and key
  const namespace = [parentNamespace, key].filter((x) => x).join(".");

  // If value is undefined, we're done here
  if (!value) return [];

  // If it's a feature
  if (isAFeature(value)) {
    // Grab the details we want to propagage from the value
    const { description, enables = [] } = value as Feature;

    // and return these details
    return [{
      path: namespace,
      description,
      enables,
    }];
  }

  // Else descend into the next layer
  return Object.entries(value)
    .map((e) => descend(e, namespace))
    .flat()
    .filter((x) => x);
}

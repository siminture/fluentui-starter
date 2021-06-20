import { isArray } from "lodash";

/**
 * Brian: Recursively walks a route tree and adds context to each route of parents and children.
 * I'm unsure at this point if it's worth the trouble, but maybe it's cool if you need to worry
 * about breadcrumbs. It also may complicate my hope to enhance with Ionic routing features such
 * as stacks.
 *
 * @param node
 * @param parent
 * @param nodeProcessor
 * @param childrenKey
 * @param parentKey
 * @returns {*}
 */
export function hierarchize(
  node,
  parent,
  nodeProcessor,
  childrenKey = "children",
  parentKey = "parent"
) {
  node[parentKey] = parent;
  nodeProcessor && nodeProcessor(node, parent);
  if (isArray(node[childrenKey])) {
    node[childrenKey].forEach((child) =>
      hierarchize(child, node, nodeProcessor, childrenKey, parentKey)
    );
  }
  return node;
}

export function getParents(node, parents = [], parentKey = "parent") {
  const nodes = [node, ...parents];
  if (node[parentKey]) return getParents(node[parentKey], nodes, parentKey);
  return nodes;
}

export function findNode(node, matcher, childrenKey = "children") {
  if (matcher(node)) return node;
  else if (node[childrenKey]) {
    for (let child of node[childrenKey]) {
      let found = findNode(child, matcher, childrenKey);
      if (found) return found;
    }
  }
  return null;
}

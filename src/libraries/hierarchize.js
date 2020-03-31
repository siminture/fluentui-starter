import isArray from 'lodash/isArray';

export default function hierarchize(
  nodes,
  parent,
  nodeProcessor,
  childrenKey = 'children',
  parentKey = 'parent'
) {
  nodes.forEach(node => {
    node[parentKey] = parent;
    nodeProcessor && nodeProcessor(node, parent);
    isArray(node[childrenKey]) &&
      hierarchize(
        node[childrenKey],
        node,
        nodeProcessor,
        childrenKey,
        parentKey
      );
  });
}

export function findHierarchical(nodes, matcher, childrenKey = 'children') {
  for (let node of nodes) {
    if (matcher(node)) return node;
    else if (node[childrenKey]) {
      let found = findHierarchical(node[childrenKey], matcher, childrenKey);
      if (found) return found;
    }
  }
  return null;
}

export function getParents(node, parents = [], parentKey = 'parent') {
  const nodes = [node, ...parents];
  if (node[parentKey]) return getParents(node[parentKey], nodes, parentKey);
  return nodes;
}

//
// export function hierarchize2(
//   node,
//   parent,
//   nodeProcessor,
//   childrenKey = 'children',
//   parentKey = 'parent'
// ) {
//   node[parentKey] = parent;
//   nodeProcessor && nodeProcessor(node, parent);
//   if (isArray(node[childrenKey])) {
//     forEach(node[childrenKey], child =>
//       hierarchize2(child, node, nodeProcessor, childrenKey, parentKey)
//     );
//   }
// }

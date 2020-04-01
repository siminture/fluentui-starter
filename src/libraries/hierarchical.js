import isArray from 'lodash/isArray';

// export function hierarchizeArray(
//   nodes,
//   parent,
//   nodeProcessor,
//   childrenKey = 'children',
//   parentKey = 'parent'
// ) {
//   nodes.forEach(node => {
//     node[parentKey] = parent;
//     nodeProcessor && nodeProcessor(node, parent);
//     isArray(node[childrenKey]) &&
//       hierarchizeArray(
//         node[childrenKey],
//         node,
//         nodeProcessor,
//         childrenKey,
//         parentKey
//       );
//   });
// }

// export function findInArray(nodes, matcher, childrenKey = 'children') {
//   for (let node of nodes) {
//     if (matcher(node)) return node;
//     else if (node[childrenKey]) {
//       let found = findInArray(node[childrenKey], matcher, childrenKey);
//       if (found) return found;
//     }
//   }
//   return null;
// }

export function hierarchize(
  node,
  parent,
  nodeProcessor,
  childrenKey = 'children',
  parentKey = 'parent'
) {
  node[parentKey] = parent;
  nodeProcessor && nodeProcessor(node, parent);
  if (isArray(node[childrenKey])) {
    node[childrenKey].forEach(child =>
      hierarchize(child, node, nodeProcessor, childrenKey, parentKey)
    );
  }
  return node;
}

export function getParents(node, parents = [], parentKey = 'parent') {
  const nodes = [node, ...parents];
  if (node[parentKey]) return getParents(node[parentKey], nodes, parentKey);
  return nodes;
}

export function findNode(node, matcher, childrenKey = 'children') {
  if (matcher(node)) return node;
  else if (node[childrenKey]) {
    for (let child of node[childrenKey]) {
      let found = findNode(child, matcher, childrenKey);
      if (found) return found;
    }
  }
  return null;
}

const isRadio = node => node.tagName === 'INPUT' && node.type === 'radio';

const findSelectedRadio = (node, nodes) => (
  nodes
    .filter(isRadio)
    .filter(el => el.name === node.name)
    .filter(el => el.checked)[0]
  || node
);

const pickFirstFocus = (nodes) => {
  if (nodes[0] && nodes.length > 1) {
    if (isRadio(nodes[0]) && nodes[0].name) {
      return findSelectedRadio(nodes[0], nodes);
    }
  }
  return nodes[0];
};

export const pickFocusable = (nodes, index) => {
  if (nodes.length > 1) {
    if (isRadio(nodes[index]) && nodes[index].name) {
      return nodes.indexOf(findSelectedRadio(nodes[index], nodes));
    }
  }
  return index;
};


export default pickFirstFocus;

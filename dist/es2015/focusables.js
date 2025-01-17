import { getAllAffectedNodes } from './utils/all-affected';
import { getTabbableNodes } from './utils/DOMutils';
import { isGuard, isNotAGuard } from './utils/is';
import { getTopCommonParent } from './utils/parenting';
export var getFocusabledIn = function(topNode) {
  var entries = getAllAffectedNodes(topNode).filter(isNotAGuard);
  var commonParent = getTopCommonParent(topNode, topNode, entries);
  var outerNodes = getTabbableNodes([commonParent], true);
  var innerElements = getTabbableNodes(entries)
    .filter(function(_a) {
      var node = _a.node;
      return isNotAGuard(node);
    })
    .map(function(_a) {
      var node = _a.node;
      return node;
    });
  return outerNodes.map(function(_a) {
    var node = _a.node,
      index = _a.index;
    return {
      node: node,
      index: index,
      lockItem: innerElements.indexOf(node) >= 0,
      guard: isGuard(node),
    };
  });
};

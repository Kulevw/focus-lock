'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getFocusabledIn = void 0;
var all_affected_1 = require('./utils/all-affected');
var DOMutils_1 = require('./utils/DOMutils');
var is_1 = require('./utils/is');
var parenting_1 = require('./utils/parenting');
exports.getFocusabledIn = function(topNode) {
  var entries = all_affected_1.getAllAffectedNodes(topNode).filter(is_1.isNotAGuard);
  var commonParent = parenting_1.getTopCommonParent(topNode, topNode, entries);
  var outerNodes = DOMutils_1.getTabbableNodes([commonParent], true);
  var innerElements = DOMutils_1.getTabbableNodes(entries)
    .filter(function(_a) {
      var node = _a.node;
      return is_1.isNotAGuard(node);
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
      guard: is_1.isGuard(node),
    };
  });
};

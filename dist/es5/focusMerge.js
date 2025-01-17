'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getFocusMerge = void 0;
var solver_1 = require('./solver');
var all_affected_1 = require('./utils/all-affected');
var DOMutils_1 = require('./utils/DOMutils');
var firstFocus_1 = require('./utils/firstFocus');
var is_1 = require('./utils/is');
var parenting_1 = require('./utils/parenting');
var findAutoFocused = function(autoFocusables) {
  return function(node) {
    return node.autofocus || (node.dataset && !!node.dataset.autofocus) || autoFocusables.indexOf(node) >= 0;
  };
};
var reorderNodes = function(srcNodes, dstNodes) {
  var remap = new Map();
  dstNodes.forEach(function(entity) {
    return remap.set(entity.node, entity);
  });
  return srcNodes
    .map(function(node) {
      return remap.get(node);
    })
    .filter(is_1.isDefined);
};
exports.getFocusMerge = function(topNode, lastNode) {
  var activeElement = document && document.activeElement;
  var entries = all_affected_1.getAllAffectedNodes(topNode).filter(is_1.isNotAGuard);
  var commonParent = parenting_1.getTopCommonParent(activeElement || topNode, topNode, entries);
  var anyFocusable = DOMutils_1.getAllTabbableNodes(entries);
  var innerElements = DOMutils_1.getTabbableNodes(entries).filter(function(_a) {
    var node = _a.node;
    return is_1.isNotAGuard(node);
  });
  if (!innerElements[0]) {
    innerElements = anyFocusable;
    if (!innerElements[0]) {
      return undefined;
    }
  }
  var outerNodes = DOMutils_1.getAllTabbableNodes([commonParent]).map(function(_a) {
    var node = _a.node;
    return node;
  });
  var orderedInnerElements = reorderNodes(outerNodes, innerElements);
  var innerNodes = orderedInnerElements.map(function(_a) {
    var node = _a.node;
    return node;
  });
  var newId = solver_1.newFocus(innerNodes, outerNodes, activeElement, lastNode);
  if (newId === solver_1.NEW_FOCUS) {
    var autoFocusable = anyFocusable
      .map(function(_a) {
        var node = _a.node;
        return node;
      })
      .filter(findAutoFocused(parenting_1.allParentAutofocusables(entries)));
    return {
      node:
        autoFocusable && autoFocusable.length
          ? firstFocus_1.pickFirstFocus(autoFocusable)
          : firstFocus_1.pickFirstFocus(innerNodes),
    };
  }
  if (newId === undefined) {
    return newId;
  }
  return orderedInnerElements[newId];
};

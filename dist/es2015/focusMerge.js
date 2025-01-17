import { NEW_FOCUS, newFocus } from './solver';
import { getAllAffectedNodes } from './utils/all-affected';
import { getAllTabbableNodes, getTabbableNodes } from './utils/DOMutils';
import { pickFirstFocus } from './utils/firstFocus';
import { isDefined, isNotAGuard } from './utils/is';
import { allParentAutofocusables, getTopCommonParent } from './utils/parenting';
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
    .filter(isDefined);
};
export var getFocusMerge = function(topNode, lastNode) {
  var activeElement = document && document.activeElement;
  var entries = getAllAffectedNodes(topNode).filter(isNotAGuard);
  var commonParent = getTopCommonParent(activeElement || topNode, topNode, entries);
  var anyFocusable = getAllTabbableNodes(entries);
  var innerElements = getTabbableNodes(entries).filter(function(_a) {
    var node = _a.node;
    return isNotAGuard(node);
  });
  if (!innerElements[0]) {
    innerElements = anyFocusable;
    if (!innerElements[0]) {
      return undefined;
    }
  }
  var outerNodes = getAllTabbableNodes([commonParent]).map(function(_a) {
    var node = _a.node;
    return node;
  });
  var orderedInnerElements = reorderNodes(outerNodes, innerElements);
  var innerNodes = orderedInnerElements.map(function(_a) {
    var node = _a.node;
    return node;
  });
  var newId = newFocus(innerNodes, outerNodes, activeElement, lastNode);
  if (newId === NEW_FOCUS) {
    var autoFocusable = anyFocusable
      .map(function(_a) {
        var node = _a.node;
        return node;
      })
      .filter(findAutoFocused(allParentAutofocusables(entries)));
    return {
      node: autoFocusable && autoFocusable.length ? pickFirstFocus(autoFocusable) : pickFirstFocus(innerNodes),
    };
  }
  if (newId === undefined) {
    return newId;
  }
  return orderedInnerElements[newId];
};

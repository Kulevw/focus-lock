'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.allParentAutofocusables = exports.getTopCommonParent = exports.getCommonParent = void 0;
var array_1 = require('./array');
var DOMutils_1 = require('./DOMutils');
var getParents = function(node, parents) {
  if (parents === void 0) {
    parents = [];
  }
  parents.push(node);
  if (node.parentNode) {
    getParents(node.parentNode, parents);
  }
  return parents;
};
exports.getCommonParent = function(nodeA, nodeB) {
  var parentsA = getParents(nodeA);
  var parentsB = getParents(nodeB);
  for (var i = 0; i < parentsA.length; i += 1) {
    var currentParent = parentsA[i];
    if (parentsB.indexOf(currentParent) >= 0) {
      return currentParent;
    }
  }
  return false;
};
exports.getTopCommonParent = function(baseActiveElement, leftEntry, rightEntries) {
  var activeElements = array_1.asArray(baseActiveElement);
  var leftEntries = array_1.asArray(leftEntry);
  var activeElement = activeElements[0];
  var topCommon = false;
  leftEntries.filter(Boolean).forEach(function(entry) {
    topCommon = exports.getCommonParent(topCommon || entry, entry) || topCommon;
    rightEntries.filter(Boolean).forEach(function(subEntry) {
      var common = exports.getCommonParent(activeElement, subEntry);
      if (common) {
        if (!topCommon || common.contains(topCommon)) {
          topCommon = common;
        } else {
          topCommon = exports.getCommonParent(common, topCommon);
        }
      }
    });
  });
  return topCommon;
};
exports.allParentAutofocusables = function(entries) {
  return entries.reduce(function(acc, node) {
    return acc.concat(DOMutils_1.parentAutofocusables(node));
  }, []);
};

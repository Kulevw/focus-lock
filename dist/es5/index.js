'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.focusPrevElement = exports.focusNextElement = exports.getAllAffectedNodes = exports.constants = exports.getFocusabledIn = exports.focusMerge = exports.focusIsHidden = exports.focusInside = exports.tabHook = void 0;
var tslib_1 = require('tslib');
var constants = tslib_1.__importStar(require('./constants'));
exports.constants = constants;
var focusables_1 = require('./focusables');
Object.defineProperty(exports, 'getFocusabledIn', {
  enumerable: true,
  get: function() {
    return focusables_1.getFocusabledIn;
  },
});
var focusInside_1 = require('./focusInside');
Object.defineProperty(exports, 'focusInside', {
  enumerable: true,
  get: function() {
    return focusInside_1.focusInside;
  },
});
var focusIsHidden_1 = require('./focusIsHidden');
Object.defineProperty(exports, 'focusIsHidden', {
  enumerable: true,
  get: function() {
    return focusIsHidden_1.focusIsHidden;
  },
});
var focusMerge_1 = require('./focusMerge');
Object.defineProperty(exports, 'focusMerge', {
  enumerable: true,
  get: function() {
    return focusMerge_1.getFocusMerge;
  },
});
var setFocus_1 = require('./setFocus');
var sibling_1 = require('./sibling');
Object.defineProperty(exports, 'focusNextElement', {
  enumerable: true,
  get: function() {
    return sibling_1.focusNextElement;
  },
});
Object.defineProperty(exports, 'focusPrevElement', {
  enumerable: true,
  get: function() {
    return sibling_1.focusPrevElement;
  },
});
var tabHook_1 = tslib_1.__importDefault(require('./tabHook'));
exports.tabHook = tabHook_1.default;
var all_affected_1 = require('./utils/all-affected');
Object.defineProperty(exports, 'getAllAffectedNodes', {
  enumerable: true,
  get: function() {
    return all_affected_1.getAllAffectedNodes;
  },
});
exports.default = setFocus_1.setFocus;

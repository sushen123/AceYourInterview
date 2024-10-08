"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/mixin-deep";
exports.ids = ["vendor-chunks/mixin-deep"];
exports.modules = {

/***/ "(ssr)/./node_modules/mixin-deep/index.js":
/*!******************************************!*\
  !*** ./node_modules/mixin-deep/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isExtendable = __webpack_require__(/*! is-extendable */ \"(ssr)/./node_modules/is-extendable/index.js\");\nvar forIn = __webpack_require__(/*! for-in */ \"(ssr)/./node_modules/for-in/index.js\");\n\nfunction mixinDeep(target, objects) {\n  var len = arguments.length, i = 0;\n  while (++i < len) {\n    var obj = arguments[i];\n    if (isObject(obj)) {\n      forIn(obj, copy, target);\n    }\n  }\n  return target;\n}\n\n/**\n * Copy properties from the source object to the\n * target object.\n *\n * @param  {*} `val`\n * @param  {String} `key`\n */\n\nfunction copy(val, key) {\n  if (!isValidKey(key)) {\n    return;\n  }\n\n  var obj = this[key];\n  if (isObject(val) && isObject(obj)) {\n    mixinDeep(obj, val);\n  } else {\n    this[key] = val;\n  }\n}\n\n/**\n * Returns true if `val` is an object or function.\n *\n * @param  {any} val\n * @return {Boolean}\n */\n\nfunction isObject(val) {\n  return isExtendable(val) && !Array.isArray(val);\n}\n\n/**\n * Returns true if `key` is a valid key to use when extending objects.\n *\n * @param  {String} `key`\n * @return {Boolean}\n */\n\nfunction isValidKey(key) {\n  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';\n};\n\n/**\n * Expose `mixinDeep`\n */\n\nmodule.exports = mixinDeep;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvbWl4aW4tZGVlcC9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixtQkFBbUIsbUJBQU8sQ0FBQyxrRUFBZTtBQUMxQyxZQUFZLG1CQUFPLENBQUMsb0RBQVE7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxHQUFHO0FBQ2YsWUFBWSxRQUFRO0FBQ3BCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxLQUFLO0FBQ2pCLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxRQUFRO0FBQ3BCLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGV2ZWxldmF0ZS8uL25vZGVfbW9kdWxlcy9taXhpbi1kZWVwL2luZGV4LmpzPzA2NmIiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNFeHRlbmRhYmxlID0gcmVxdWlyZSgnaXMtZXh0ZW5kYWJsZScpO1xudmFyIGZvckluID0gcmVxdWlyZSgnZm9yLWluJyk7XG5cbmZ1bmN0aW9uIG1peGluRGVlcCh0YXJnZXQsIG9iamVjdHMpIHtcbiAgdmFyIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGkgPSAwO1xuICB3aGlsZSAoKytpIDwgbGVuKSB7XG4gICAgdmFyIG9iaiA9IGFyZ3VtZW50c1tpXTtcbiAgICBpZiAoaXNPYmplY3Qob2JqKSkge1xuICAgICAgZm9ySW4ob2JqLCBjb3B5LCB0YXJnZXQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGFyZ2V0O1xufVxuXG4vKipcbiAqIENvcHkgcHJvcGVydGllcyBmcm9tIHRoZSBzb3VyY2Ugb2JqZWN0IHRvIHRoZVxuICogdGFyZ2V0IG9iamVjdC5cbiAqXG4gKiBAcGFyYW0gIHsqfSBgdmFsYFxuICogQHBhcmFtICB7U3RyaW5nfSBga2V5YFxuICovXG5cbmZ1bmN0aW9uIGNvcHkodmFsLCBrZXkpIHtcbiAgaWYgKCFpc1ZhbGlkS2V5KGtleSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgb2JqID0gdGhpc1trZXldO1xuICBpZiAoaXNPYmplY3QodmFsKSAmJiBpc09iamVjdChvYmopKSB7XG4gICAgbWl4aW5EZWVwKG9iaiwgdmFsKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzW2tleV0gPSB2YWw7XG4gIH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYHZhbGAgaXMgYW4gb2JqZWN0IG9yIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSAge2FueX0gdmFsXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICovXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gaXNFeHRlbmRhYmxlKHZhbCkgJiYgIUFycmF5LmlzQXJyYXkodmFsKTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYGtleWAgaXMgYSB2YWxpZCBrZXkgdG8gdXNlIHdoZW4gZXh0ZW5kaW5nIG9iamVjdHMuXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSBga2V5YFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xuXG5mdW5jdGlvbiBpc1ZhbGlkS2V5KGtleSkge1xuICByZXR1cm4ga2V5ICE9PSAnX19wcm90b19fJyAmJiBrZXkgIT09ICdjb25zdHJ1Y3RvcicgJiYga2V5ICE9PSAncHJvdG90eXBlJztcbn07XG5cbi8qKlxuICogRXhwb3NlIGBtaXhpbkRlZXBgXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBtaXhpbkRlZXA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/mixin-deep/index.js\n");

/***/ })

};
;
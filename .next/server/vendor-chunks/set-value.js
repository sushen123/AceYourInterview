"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/set-value";
exports.ids = ["vendor-chunks/set-value"];
exports.modules = {

/***/ "(ssr)/./node_modules/set-value/index.js":
/*!*****************************************!*\
  !*** ./node_modules/set-value/index.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*!\n * set-value <https://github.com/jonschlinkert/set-value>\n *\n * Copyright (c) 2014-2015, 2017, Jon Schlinkert.\n * Released under the MIT License.\n */\n\n\n\nvar split = __webpack_require__(/*! split-string */ \"(ssr)/./node_modules/split-string/index.js\");\nvar extend = __webpack_require__(/*! extend-shallow */ \"(ssr)/./node_modules/extend-shallow/index.js\");\nvar isPlainObject = __webpack_require__(/*! is-plain-object */ \"(ssr)/./node_modules/is-plain-object/index.js\");\nvar isObject = __webpack_require__(/*! is-extendable */ \"(ssr)/./node_modules/set-value/node_modules/is-extendable/index.js\");\n\nmodule.exports = function(obj, prop, val) {\n  if (!isObject(obj)) {\n    return obj;\n  }\n\n  if (Array.isArray(prop)) {\n    prop = [].concat.apply([], prop).join('.');\n  }\n\n  if (typeof prop !== 'string') {\n    return obj;\n  }\n\n  var keys = split(prop, {sep: '.', brackets: true}).filter(isValidKey);\n  var len = keys.length;\n  var idx = -1;\n  var current = obj;\n\n  while (++idx < len) {\n    var key = keys[idx];\n    if (idx !== len - 1) {\n      if (!isObject(current[key])) {\n        current[key] = {};\n      }\n      current = current[key];\n      continue;\n    }\n\n    if (isPlainObject(current[key]) && isPlainObject(val)) {\n      current[key] = extend({}, current[key], val);\n    } else {\n      current[key] = val;\n    }\n  }\n\n  return obj;\n};\n\nfunction isValidKey(key) {\n  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2V0LXZhbHVlL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsZ0VBQWM7QUFDbEMsYUFBYSxtQkFBTyxDQUFDLG9FQUFnQjtBQUNyQyxvQkFBb0IsbUJBQU8sQ0FBQyxzRUFBaUI7QUFDN0MsZUFBZSxtQkFBTyxDQUFDLHlGQUFlOztBQUV0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDBCQUEwQix5QkFBeUI7QUFDbkQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QjtBQUM5QixNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGV2ZWxldmF0ZS8uL25vZGVfbW9kdWxlcy9zZXQtdmFsdWUvaW5kZXguanM/YWI5ZCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIHNldC12YWx1ZSA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvc2V0LXZhbHVlPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCAyMDE3LCBKb24gU2NobGlua2VydC5cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzcGxpdCA9IHJlcXVpcmUoJ3NwbGl0LXN0cmluZycpO1xudmFyIGV4dGVuZCA9IHJlcXVpcmUoJ2V4dGVuZC1zaGFsbG93Jyk7XG52YXIgaXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJ2lzLXBsYWluLW9iamVjdCcpO1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnaXMtZXh0ZW5kYWJsZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgdmFsKSB7XG4gIGlmICghaXNPYmplY3Qob2JqKSkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheShwcm9wKSkge1xuICAgIHByb3AgPSBbXS5jb25jYXQuYXBwbHkoW10sIHByb3ApLmpvaW4oJy4nKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgcHJvcCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgdmFyIGtleXMgPSBzcGxpdChwcm9wLCB7c2VwOiAnLicsIGJyYWNrZXRzOiB0cnVlfSkuZmlsdGVyKGlzVmFsaWRLZXkpO1xuICB2YXIgbGVuID0ga2V5cy5sZW5ndGg7XG4gIHZhciBpZHggPSAtMTtcbiAgdmFyIGN1cnJlbnQgPSBvYmo7XG5cbiAgd2hpbGUgKCsraWR4IDwgbGVuKSB7XG4gICAgdmFyIGtleSA9IGtleXNbaWR4XTtcbiAgICBpZiAoaWR4ICE9PSBsZW4gLSAxKSB7XG4gICAgICBpZiAoIWlzT2JqZWN0KGN1cnJlbnRba2V5XSkpIHtcbiAgICAgICAgY3VycmVudFtrZXldID0ge307XG4gICAgICB9XG4gICAgICBjdXJyZW50ID0gY3VycmVudFtrZXldO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGlzUGxhaW5PYmplY3QoY3VycmVudFtrZXldKSAmJiBpc1BsYWluT2JqZWN0KHZhbCkpIHtcbiAgICAgIGN1cnJlbnRba2V5XSA9IGV4dGVuZCh7fSwgY3VycmVudFtrZXldLCB2YWwpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50W2tleV0gPSB2YWw7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07XG5cbmZ1bmN0aW9uIGlzVmFsaWRLZXkoa2V5KSB7XG4gIHJldHVybiBrZXkgIT09ICdfX3Byb3RvX18nICYmIGtleSAhPT0gJ2NvbnN0cnVjdG9yJyAmJiBrZXkgIT09ICdwcm90b3R5cGUnO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/set-value/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/set-value/node_modules/is-extendable/index.js":
/*!********************************************************************!*\
  !*** ./node_modules/set-value/node_modules/is-extendable/index.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("/*!\n * is-extendable <https://github.com/jonschlinkert/is-extendable>\n *\n * Copyright (c) 2015, Jon Schlinkert.\n * Licensed under the MIT License.\n */\n\n\n\nmodule.exports = function isExtendable(val) {\n  return typeof val !== 'undefined' && val !== null\n    && (typeof val === 'object' || typeof val === 'function');\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc2V0LXZhbHVlL25vZGVfbW9kdWxlcy9pcy1leHRlbmRhYmxlL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RldmVsZXZhdGUvLi9ub2RlX21vZHVsZXMvc2V0LXZhbHVlL25vZGVfbW9kdWxlcy9pcy1leHRlbmRhYmxlL2luZGV4LmpzPzYzMzgiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBpcy1leHRlbmRhYmxlIDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9pcy1leHRlbmRhYmxlPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNSwgSm9uIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzRXh0ZW5kYWJsZSh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgIT09ICd1bmRlZmluZWQnICYmIHZhbCAhPT0gbnVsbFxuICAgICYmICh0eXBlb2YgdmFsID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/set-value/node_modules/is-extendable/index.js\n");

/***/ })

};
;
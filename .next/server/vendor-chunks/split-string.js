"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/split-string";
exports.ids = ["vendor-chunks/split-string"];
exports.modules = {

/***/ "(ssr)/./node_modules/split-string/index.js":
/*!********************************************!*\
  !*** ./node_modules/split-string/index.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("/*!\n * split-string <https://github.com/jonschlinkert/split-string>\n *\n * Copyright (c) 2015-2017, Jon Schlinkert.\n * Released under the MIT License.\n */\n\n\n\nvar extend = __webpack_require__(/*! extend-shallow */ \"(ssr)/./node_modules/split-string/node_modules/extend-shallow/index.js\");\n\nmodule.exports = function(str, options, fn) {\n  if (typeof str !== 'string') {\n    throw new TypeError('expected a string');\n  }\n\n  if (typeof options === 'function') {\n    fn = options;\n    options = null;\n  }\n\n  // allow separator to be defined as a string\n  if (typeof options === 'string') {\n    options = { sep: options };\n  }\n\n  var opts = extend({sep: '.'}, options);\n  var quotes = opts.quotes || ['\"', \"'\", '`'];\n  var brackets;\n\n  if (opts.brackets === true) {\n    brackets = {\n      '<': '>',\n      '(': ')',\n      '[': ']',\n      '{': '}'\n    };\n  } else if (opts.brackets) {\n    brackets = opts.brackets;\n  }\n\n  var tokens = [];\n  var stack = [];\n  var arr = [''];\n  var sep = opts.sep;\n  var len = str.length;\n  var idx = -1;\n  var closeIdx;\n\n  function expected() {\n    if (brackets && stack.length) {\n      return brackets[stack[stack.length - 1]];\n    }\n  }\n\n  while (++idx < len) {\n    var ch = str[idx];\n    var next = str[idx + 1];\n    var tok = { val: ch, idx: idx, arr: arr, str: str };\n    tokens.push(tok);\n\n    if (ch === '\\\\') {\n      tok.val = keepEscaping(opts, str, idx) === true ? (ch + next) : next;\n      tok.escaped = true;\n      if (typeof fn === 'function') {\n        fn(tok);\n      }\n      arr[arr.length - 1] += tok.val;\n      idx++;\n      continue;\n    }\n\n    if (brackets && brackets[ch]) {\n      stack.push(ch);\n      var e = expected();\n      var i = idx + 1;\n\n      if (str.indexOf(e, i + 1) !== -1) {\n        while (stack.length && i < len) {\n          var s = str[++i];\n          if (s === '\\\\') {\n            s++;\n            continue;\n          }\n\n          if (quotes.indexOf(s) !== -1) {\n            i = getClosingQuote(str, s, i + 1);\n            continue;\n          }\n\n          e = expected();\n          if (stack.length && str.indexOf(e, i + 1) === -1) {\n            break;\n          }\n\n          if (brackets[s]) {\n            stack.push(s);\n            continue;\n          }\n\n          if (e === s) {\n            stack.pop();\n          }\n        }\n      }\n\n      closeIdx = i;\n      if (closeIdx === -1) {\n        arr[arr.length - 1] += ch;\n        continue;\n      }\n\n      ch = str.slice(idx, closeIdx + 1);\n      tok.val = ch;\n      tok.idx = idx = closeIdx;\n    }\n\n    if (quotes.indexOf(ch) !== -1) {\n      closeIdx = getClosingQuote(str, ch, idx + 1);\n      if (closeIdx === -1) {\n        arr[arr.length - 1] += ch;\n        continue;\n      }\n\n      if (keepQuotes(ch, opts) === true) {\n        ch = str.slice(idx, closeIdx + 1);\n      } else {\n        ch = str.slice(idx + 1, closeIdx);\n      }\n\n      tok.val = ch;\n      tok.idx = idx = closeIdx;\n    }\n\n    if (typeof fn === 'function') {\n      fn(tok, tokens);\n      ch = tok.val;\n      idx = tok.idx;\n    }\n\n    if (tok.val === sep && tok.split !== false) {\n      arr.push('');\n      continue;\n    }\n\n    arr[arr.length - 1] += tok.val;\n  }\n\n  return arr;\n};\n\nfunction getClosingQuote(str, ch, i, brackets) {\n  var idx = str.indexOf(ch, i);\n  if (str.charAt(idx - 1) === '\\\\') {\n    return getClosingQuote(str, ch, idx + 1);\n  }\n  return idx;\n}\n\nfunction keepQuotes(ch, opts) {\n  if (opts.keepDoubleQuotes === true && ch === '\"') return true;\n  if (opts.keepSingleQuotes === true && ch === \"'\") return true;\n  return opts.keepQuotes;\n}\n\nfunction keepEscaping(opts, str, idx) {\n  if (typeof opts.keepEscaping === 'function') {\n    return opts.keepEscaping(str, idx);\n  }\n  return opts.keepEscaping === true || str[idx + 1] === '\\\\';\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3BsaXQtc3RyaW5nL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixhQUFhLG1CQUFPLENBQUMsOEZBQWdCOztBQUVyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsS0FBSztBQUNiO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGV2ZWxldmF0ZS8uL25vZGVfbW9kdWxlcy9zcGxpdC1zdHJpbmcvaW5kZXguanM/MTExMyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIHNwbGl0LXN0cmluZyA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvc3BsaXQtc3RyaW5nPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNS0yMDE3LCBKb24gU2NobGlua2VydC5cbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBleHRlbmQgPSByZXF1aXJlKCdleHRlbmQtc2hhbGxvdycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0ciwgb3B0aW9ucywgZm4pIHtcbiAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhwZWN0ZWQgYSBzdHJpbmcnKTtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGZuID0gb3B0aW9ucztcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuXG4gIC8vIGFsbG93IHNlcGFyYXRvciB0byBiZSBkZWZpbmVkIGFzIGEgc3RyaW5nXG4gIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICBvcHRpb25zID0geyBzZXA6IG9wdGlvbnMgfTtcbiAgfVxuXG4gIHZhciBvcHRzID0gZXh0ZW5kKHtzZXA6ICcuJ30sIG9wdGlvbnMpO1xuICB2YXIgcXVvdGVzID0gb3B0cy5xdW90ZXMgfHwgWydcIicsIFwiJ1wiLCAnYCddO1xuICB2YXIgYnJhY2tldHM7XG5cbiAgaWYgKG9wdHMuYnJhY2tldHMgPT09IHRydWUpIHtcbiAgICBicmFja2V0cyA9IHtcbiAgICAgICc8JzogJz4nLFxuICAgICAgJygnOiAnKScsXG4gICAgICAnWyc6ICddJyxcbiAgICAgICd7JzogJ30nXG4gICAgfTtcbiAgfSBlbHNlIGlmIChvcHRzLmJyYWNrZXRzKSB7XG4gICAgYnJhY2tldHMgPSBvcHRzLmJyYWNrZXRzO1xuICB9XG5cbiAgdmFyIHRva2VucyA9IFtdO1xuICB2YXIgc3RhY2sgPSBbXTtcbiAgdmFyIGFyciA9IFsnJ107XG4gIHZhciBzZXAgPSBvcHRzLnNlcDtcbiAgdmFyIGxlbiA9IHN0ci5sZW5ndGg7XG4gIHZhciBpZHggPSAtMTtcbiAgdmFyIGNsb3NlSWR4O1xuXG4gIGZ1bmN0aW9uIGV4cGVjdGVkKCkge1xuICAgIGlmIChicmFja2V0cyAmJiBzdGFjay5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBicmFja2V0c1tzdGFja1tzdGFjay5sZW5ndGggLSAxXV07XG4gICAgfVxuICB9XG5cbiAgd2hpbGUgKCsraWR4IDwgbGVuKSB7XG4gICAgdmFyIGNoID0gc3RyW2lkeF07XG4gICAgdmFyIG5leHQgPSBzdHJbaWR4ICsgMV07XG4gICAgdmFyIHRvayA9IHsgdmFsOiBjaCwgaWR4OiBpZHgsIGFycjogYXJyLCBzdHI6IHN0ciB9O1xuICAgIHRva2Vucy5wdXNoKHRvayk7XG5cbiAgICBpZiAoY2ggPT09ICdcXFxcJykge1xuICAgICAgdG9rLnZhbCA9IGtlZXBFc2NhcGluZyhvcHRzLCBzdHIsIGlkeCkgPT09IHRydWUgPyAoY2ggKyBuZXh0KSA6IG5leHQ7XG4gICAgICB0b2suZXNjYXBlZCA9IHRydWU7XG4gICAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZuKHRvayk7XG4gICAgICB9XG4gICAgICBhcnJbYXJyLmxlbmd0aCAtIDFdICs9IHRvay52YWw7XG4gICAgICBpZHgrKztcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChicmFja2V0cyAmJiBicmFja2V0c1tjaF0pIHtcbiAgICAgIHN0YWNrLnB1c2goY2gpO1xuICAgICAgdmFyIGUgPSBleHBlY3RlZCgpO1xuICAgICAgdmFyIGkgPSBpZHggKyAxO1xuXG4gICAgICBpZiAoc3RyLmluZGV4T2YoZSwgaSArIDEpICE9PSAtMSkge1xuICAgICAgICB3aGlsZSAoc3RhY2subGVuZ3RoICYmIGkgPCBsZW4pIHtcbiAgICAgICAgICB2YXIgcyA9IHN0clsrK2ldO1xuICAgICAgICAgIGlmIChzID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgIHMrKztcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChxdW90ZXMuaW5kZXhPZihzKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGkgPSBnZXRDbG9zaW5nUXVvdGUoc3RyLCBzLCBpICsgMSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlID0gZXhwZWN0ZWQoKTtcbiAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoICYmIHN0ci5pbmRleE9mKGUsIGkgKyAxKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChicmFja2V0c1tzXSkge1xuICAgICAgICAgICAgc3RhY2sucHVzaChzKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChlID09PSBzKSB7XG4gICAgICAgICAgICBzdGFjay5wb3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY2xvc2VJZHggPSBpO1xuICAgICAgaWYgKGNsb3NlSWR4ID09PSAtMSkge1xuICAgICAgICBhcnJbYXJyLmxlbmd0aCAtIDFdICs9IGNoO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY2ggPSBzdHIuc2xpY2UoaWR4LCBjbG9zZUlkeCArIDEpO1xuICAgICAgdG9rLnZhbCA9IGNoO1xuICAgICAgdG9rLmlkeCA9IGlkeCA9IGNsb3NlSWR4O1xuICAgIH1cblxuICAgIGlmIChxdW90ZXMuaW5kZXhPZihjaCkgIT09IC0xKSB7XG4gICAgICBjbG9zZUlkeCA9IGdldENsb3NpbmdRdW90ZShzdHIsIGNoLCBpZHggKyAxKTtcbiAgICAgIGlmIChjbG9zZUlkeCA9PT0gLTEpIHtcbiAgICAgICAgYXJyW2Fyci5sZW5ndGggLSAxXSArPSBjaDtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChrZWVwUXVvdGVzKGNoLCBvcHRzKSA9PT0gdHJ1ZSkge1xuICAgICAgICBjaCA9IHN0ci5zbGljZShpZHgsIGNsb3NlSWR4ICsgMSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjaCA9IHN0ci5zbGljZShpZHggKyAxLCBjbG9zZUlkeCk7XG4gICAgICB9XG5cbiAgICAgIHRvay52YWwgPSBjaDtcbiAgICAgIHRvay5pZHggPSBpZHggPSBjbG9zZUlkeDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBmbih0b2ssIHRva2Vucyk7XG4gICAgICBjaCA9IHRvay52YWw7XG4gICAgICBpZHggPSB0b2suaWR4O1xuICAgIH1cblxuICAgIGlmICh0b2sudmFsID09PSBzZXAgJiYgdG9rLnNwbGl0ICE9PSBmYWxzZSkge1xuICAgICAgYXJyLnB1c2goJycpO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgYXJyW2Fyci5sZW5ndGggLSAxXSArPSB0b2sudmFsO1xuICB9XG5cbiAgcmV0dXJuIGFycjtcbn07XG5cbmZ1bmN0aW9uIGdldENsb3NpbmdRdW90ZShzdHIsIGNoLCBpLCBicmFja2V0cykge1xuICB2YXIgaWR4ID0gc3RyLmluZGV4T2YoY2gsIGkpO1xuICBpZiAoc3RyLmNoYXJBdChpZHggLSAxKSA9PT0gJ1xcXFwnKSB7XG4gICAgcmV0dXJuIGdldENsb3NpbmdRdW90ZShzdHIsIGNoLCBpZHggKyAxKTtcbiAgfVxuICByZXR1cm4gaWR4O1xufVxuXG5mdW5jdGlvbiBrZWVwUXVvdGVzKGNoLCBvcHRzKSB7XG4gIGlmIChvcHRzLmtlZXBEb3VibGVRdW90ZXMgPT09IHRydWUgJiYgY2ggPT09ICdcIicpIHJldHVybiB0cnVlO1xuICBpZiAob3B0cy5rZWVwU2luZ2xlUXVvdGVzID09PSB0cnVlICYmIGNoID09PSBcIidcIikgcmV0dXJuIHRydWU7XG4gIHJldHVybiBvcHRzLmtlZXBRdW90ZXM7XG59XG5cbmZ1bmN0aW9uIGtlZXBFc2NhcGluZyhvcHRzLCBzdHIsIGlkeCkge1xuICBpZiAodHlwZW9mIG9wdHMua2VlcEVzY2FwaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG9wdHMua2VlcEVzY2FwaW5nKHN0ciwgaWR4KTtcbiAgfVxuICByZXR1cm4gb3B0cy5rZWVwRXNjYXBpbmcgPT09IHRydWUgfHwgc3RyW2lkeCArIDFdID09PSAnXFxcXCc7XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/split-string/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/split-string/node_modules/extend-shallow/index.js":
/*!************************************************************************!*\
  !*** ./node_modules/split-string/node_modules/extend-shallow/index.js ***!
  \************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar isExtendable = __webpack_require__(/*! is-extendable */ \"(ssr)/./node_modules/is-extendable/index.js\");\nvar assignSymbols = __webpack_require__(/*! assign-symbols */ \"(ssr)/./node_modules/assign-symbols/index.js\");\n\nmodule.exports = Object.assign || function(obj/*, objects*/) {\n  if (obj === null || typeof obj === 'undefined') {\n    throw new TypeError('Cannot convert undefined or null to object');\n  }\n  if (!isObject(obj)) {\n    obj = {};\n  }\n  for (var i = 1; i < arguments.length; i++) {\n    var val = arguments[i];\n    if (isString(val)) {\n      val = toObject(val);\n    }\n    if (isObject(val)) {\n      assign(obj, val);\n      assignSymbols(obj, val);\n    }\n  }\n  return obj;\n};\n\nfunction assign(a, b) {\n  for (var key in b) {\n    if (hasOwn(b, key)) {\n      a[key] = b[key];\n    }\n  }\n}\n\nfunction isString(val) {\n  return (val && typeof val === 'string');\n}\n\nfunction toObject(str) {\n  var obj = {};\n  for (var i in str) {\n    obj[i] = str[i];\n  }\n  return obj;\n}\n\nfunction isObject(val) {\n  return (val && typeof val === 'object') || isExtendable(val);\n}\n\n/**\n * Returns true if the given `key` is an own property of `obj`.\n */\n\nfunction hasOwn(obj, key) {\n  return Object.prototype.hasOwnProperty.call(obj, key);\n}\n\nfunction isEnum(obj, key) {\n  return Object.prototype.propertyIsEnumerable.call(obj, key);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvc3BsaXQtc3RyaW5nL25vZGVfbW9kdWxlcy9leHRlbmQtc2hhbGxvdy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYixtQkFBbUIsbUJBQU8sQ0FBQyxrRUFBZTtBQUMxQyxvQkFBb0IsbUJBQU8sQ0FBQyxvRUFBZ0I7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHNCQUFzQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZXZlbGV2YXRlLy4vbm9kZV9tb2R1bGVzL3NwbGl0LXN0cmluZy9ub2RlX21vZHVsZXMvZXh0ZW5kLXNoYWxsb3cvaW5kZXguanM/ZjVjZiJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbnZhciBpc0V4dGVuZGFibGUgPSByZXF1aXJlKCdpcy1leHRlbmRhYmxlJyk7XG52YXIgYXNzaWduU3ltYm9scyA9IHJlcXVpcmUoJ2Fzc2lnbi1zeW1ib2xzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbihvYmovKiwgb2JqZWN0cyovKSB7XG4gIGlmIChvYmogPT09IG51bGwgfHwgdHlwZW9mIG9iaiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgfVxuICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcbiAgICBvYmogPSB7fTtcbiAgfVxuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB2YWwgPSBhcmd1bWVudHNbaV07XG4gICAgaWYgKGlzU3RyaW5nKHZhbCkpIHtcbiAgICAgIHZhbCA9IHRvT2JqZWN0KHZhbCk7XG4gICAgfVxuICAgIGlmIChpc09iamVjdCh2YWwpKSB7XG4gICAgICBhc3NpZ24ob2JqLCB2YWwpO1xuICAgICAgYXNzaWduU3ltYm9scyhvYmosIHZhbCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmo7XG59O1xuXG5mdW5jdGlvbiBhc3NpZ24oYSwgYikge1xuICBmb3IgKHZhciBrZXkgaW4gYikge1xuICAgIGlmIChoYXNPd24oYiwga2V5KSkge1xuICAgICAgYVtrZXldID0gYltrZXldO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpO1xufVxuXG5mdW5jdGlvbiB0b09iamVjdChzdHIpIHtcbiAgdmFyIG9iaiA9IHt9O1xuICBmb3IgKHZhciBpIGluIHN0cikge1xuICAgIG9ialtpXSA9IHN0cltpXTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuICh2YWwgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHx8IGlzRXh0ZW5kYWJsZSh2YWwpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gYGtleWAgaXMgYW4gb3duIHByb3BlcnR5IG9mIGBvYmpgLlxuICovXG5cbmZ1bmN0aW9uIGhhc093bihvYmosIGtleSkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KTtcbn1cblxuZnVuY3Rpb24gaXNFbnVtKG9iaiwga2V5KSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwob2JqLCBrZXkpO1xufVxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/split-string/node_modules/extend-shallow/index.js\n");

/***/ })

};
;
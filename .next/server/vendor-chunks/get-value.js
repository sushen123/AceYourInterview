/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/get-value";
exports.ids = ["vendor-chunks/get-value"];
exports.modules = {

/***/ "(ssr)/./node_modules/get-value/index.js":
/*!*****************************************!*\
  !*** ./node_modules/get-value/index.js ***!
  \*****************************************/
/***/ ((module) => {

eval("/*!\n * get-value <https://github.com/jonschlinkert/get-value>\n *\n * Copyright (c) 2014-2015, Jon Schlinkert.\n * Licensed under the MIT License.\n */\n\nmodule.exports = function(obj, prop, a, b, c) {\n  if (!isObject(obj) || !prop) {\n    return obj;\n  }\n\n  prop = toString(prop);\n\n  // allowing for multiple properties to be passed as\n  // a string or array, but much faster (3-4x) than doing\n  // `[].slice.call(arguments)`\n  if (a) prop += '.' + toString(a);\n  if (b) prop += '.' + toString(b);\n  if (c) prop += '.' + toString(c);\n\n  if (prop in obj) {\n    return obj[prop];\n  }\n\n  var segs = prop.split('.');\n  var len = segs.length;\n  var i = -1;\n\n  while (obj && (++i < len)) {\n    var key = segs[i];\n    while (key[key.length - 1] === '\\\\') {\n      key = key.slice(0, -1) + '.' + segs[++i];\n    }\n    obj = obj[key];\n  }\n  return obj;\n};\n\nfunction isObject(val) {\n  return val !== null && (typeof val === 'object' || typeof val === 'function');\n}\n\nfunction toString(val) {\n  if (!val) return '';\n  if (Array.isArray(val)) {\n    return val.join('.');\n  }\n  return val;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZ2V0LXZhbHVlL2luZGV4LmpzIiwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGV2ZWxldmF0ZS8uL25vZGVfbW9kdWxlcy9nZXQtdmFsdWUvaW5kZXguanM/YTdiOCJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIGdldC12YWx1ZSA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvZ2V0LXZhbHVlPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgcHJvcCwgYSwgYiwgYykge1xuICBpZiAoIWlzT2JqZWN0KG9iaikgfHwgIXByb3ApIHtcbiAgICByZXR1cm4gb2JqO1xuICB9XG5cbiAgcHJvcCA9IHRvU3RyaW5nKHByb3ApO1xuXG4gIC8vIGFsbG93aW5nIGZvciBtdWx0aXBsZSBwcm9wZXJ0aWVzIHRvIGJlIHBhc3NlZCBhc1xuICAvLyBhIHN0cmluZyBvciBhcnJheSwgYnV0IG11Y2ggZmFzdGVyICgzLTR4KSB0aGFuIGRvaW5nXG4gIC8vIGBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cylgXG4gIGlmIChhKSBwcm9wICs9ICcuJyArIHRvU3RyaW5nKGEpO1xuICBpZiAoYikgcHJvcCArPSAnLicgKyB0b1N0cmluZyhiKTtcbiAgaWYgKGMpIHByb3AgKz0gJy4nICsgdG9TdHJpbmcoYyk7XG5cbiAgaWYgKHByb3AgaW4gb2JqKSB7XG4gICAgcmV0dXJuIG9ialtwcm9wXTtcbiAgfVxuXG4gIHZhciBzZWdzID0gcHJvcC5zcGxpdCgnLicpO1xuICB2YXIgbGVuID0gc2Vncy5sZW5ndGg7XG4gIHZhciBpID0gLTE7XG5cbiAgd2hpbGUgKG9iaiAmJiAoKytpIDwgbGVuKSkge1xuICAgIHZhciBrZXkgPSBzZWdzW2ldO1xuICAgIHdoaWxlIChrZXlba2V5Lmxlbmd0aCAtIDFdID09PSAnXFxcXCcpIHtcbiAgICAgIGtleSA9IGtleS5zbGljZSgwLCAtMSkgKyAnLicgKyBzZWdzWysraV07XG4gICAgfVxuICAgIG9iaiA9IG9ialtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59O1xuXG5mdW5jdGlvbiBpc09iamVjdCh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gbnVsbCAmJiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHZhbCA9PT0gJ2Z1bmN0aW9uJyk7XG59XG5cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbCkge1xuICBpZiAoIXZhbCkgcmV0dXJuICcnO1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgcmV0dXJuIHZhbC5qb2luKCcuJyk7XG4gIH1cbiAgcmV0dXJuIHZhbDtcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/get-value/index.js\n");

/***/ })

};
;
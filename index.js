/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 69);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(76);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.3' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(32)('wks');
var uid = __webpack_require__(20);
var Symbol = __webpack_require__(6).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(2);
var ctx = __webpack_require__(26);
var hide = __webpack_require__(12);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && key in exports) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var IE8_DOM_DEFINE = __webpack_require__(48);
var toPrimitive = __webpack_require__(27);
var dP = Object.defineProperty;

exports.f = __webpack_require__(10) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(51);
var defined = __webpack_require__(29);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(14)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 11 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var createDesc = __webpack_require__(16);
module.exports = __webpack_require__(10) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(50);
var enumBugKeys = __webpack_require__(33);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 18 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Point; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);

/**
 * Author se7en.
 */
var Point = function Point() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Point);

  this.x = x;
  this.y = y;
  this.name = "point";
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(29);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(83)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(60)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Matrix; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shape_Point__ = __webpack_require__(19);




/**
 *
 * | a | b | tx|
 * | c | d | ty|
 * | 0 | 0 | 1 |
 *
 * @class
 * @memberof PIXI
 */

var Matrix = function () {
  /**
   * @param {number} [a=1] - x scale
   * @param {number} [b=0] - y skew
   * @param {number} [c=0] - x skew
   * @param {number} [d=1] - y scale
   * @param {number} [tx=0] - x translation
   * @param {number} [ty=0] - y translation
   */
  function Matrix() {
    var a = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var c = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var d = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
    var tx = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var ty = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Matrix);

    /**
     * @member {number}
     * @default 1
     */
    this.a = a;

    /**
     * @member {number}
     * @default 0
     */
    this.b = b;

    /**
     * @member {number}
     * @default 0
     */
    this.c = c;

    /**
     * @member {number}
     * @default 1
     */
    this.d = d;

    /**
     * @member {number}
     * @default 0
     */
    this.tx = tx;

    /**
     * @member {number}
     * @default 0
     */
    this.ty = ty;

    this.array = null;
  }

  /**
   * Creates a Matrix object based on the given array. The Element to Matrix mapping order is as follows:
   *
   * a = array[0]
   * b = array[1]
   * c = array[3]
   * d = array[4]
   * tx = array[2]
   * ty = array[5]
   *
   * @param {number[]} array - The array that the matrix will be populated from.
   */


  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Matrix, [{
    key: 'fromArray',
    value: function fromArray(array) {
      if (array === undefined || array.length === 0) array = [1, 0, 0, 0, 1, 0];
      this.a = array[0];
      this.b = array[1];
      this.c = array[3];
      this.d = array[4];
      this.tx = array[2];
      this.ty = array[5];
    }
  }, {
    key: 'fromCssArray',
    value: function fromCssArray(array) {
      if (array === undefined || array.length === 0) array = [1, 0, 0, 1, 0, 0];
      this.a = array[0];
      this.c = array[1];
      this.b = array[2];
      this.d = array[3];
      this.tx = array[4];
      this.ty = array[5];
    }
    /**
     * sets the matrix properties
     *
     * @param {number} a - Matrix component
     * @param {number} b - Matrix component
     * @param {number} c - Matrix component
     * @param {number} d - Matrix component
     * @param {number} tx - Matrix component
     * @param {number} ty - Matrix component
     *
     * @return {Matrix} This matrix. Good for chaining method calls.
     */

  }, {
    key: 'set',
    value: function set(a, b, c, d, tx, ty) {
      this.a = a;
      this.b = b;
      this.c = c;
      this.d = d;
      this.tx = tx;
      this.ty = ty;

      return this;
    }
  }, {
    key: 'toCssArray',
    value: function toCssArray() {
      var array = new Array(6);
      array[0] = this.a;
      array[1] = this.b;
      array[2] = this.c;
      array[3] = this.d;
      array[4] = this.tx;
      array[5] = this.ty;
      return array;
    }

    /**
     * Creates an array from the current Matrix object.
     *
     * @param {boolean} transpose - Whether we need to transpose the matrix or not
     * @param {Float32Array} [out=new Float32Array(9)] - If provided the array will be assigned to out
     * @return {number[]} the newly created array which contains the matrix
     */

  }, {
    key: 'toArray',
    value: function toArray(transpose, out) {
      if (!this.array) {
        this.array = new Float32Array(9);
      }

      var array = out || this.array;

      if (transpose) {
        array[0] = this.a;
        aarray[1] = this.b;
        array[2] = 0;
        array[3] = this.c;
        array[4] = this.d;
        array[5] = 0;
        array[6] = this.tx;
        array[7] = this.ty;
        array[8] = 1;
      } else {
        array[0] = this.a;
        array[1] = this.c;
        array[2] = this.tx;
        array[3] = this.b;
        array[4] = this.d;
        array[5] = this.ty;
        array[6] = 0;
        array[7] = 0;
        array[8] = 1;
      }

      return array;
    }

    /**
     * Get a new position with the current transformation applied.
     * Can be used to go from a child's coordinate space to the world coordinate space. (e.g. rendering)
     *
     * @param {Point} pos - The origin
     * @param {Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
     * @return {Point} The new point, transformed through this matrix
     */

  }, {
    key: 'apply',
    value: function apply(pos, newPos) {
      newPos = newPos || new __WEBPACK_IMPORTED_MODULE_2__shape_Point__["a" /* Point */]();

      var x = pos.x;
      var y = pos.y;

      newPos.x = this.a * x + this.c * y + this.tx;
      newPos.y = this.b * x + this.d * y + this.ty;

      return newPos;
    }

    /**
     * Get a new position with the inverse of the current transformation applied.
     * Can be used to go from the world coordinate space to a child's coordinate space. (e.g. input)
     *
     * @param {PIXI.Point} pos - The origin
     * @param {PIXI.Point} [newPos] - The point that the new position is assigned to (allowed to be same as input)
     * @return {PIXI.Point} The new point, inverse-transformed through this matrix
     */

  }, {
    key: 'applyInverse',
    value: function applyInverse(pos, newPos) {
      newPos = newPos || new __WEBPACK_IMPORTED_MODULE_2__shape_Point__["a" /* Point */]();

      var id = 1 / (this.a * this.d + this.c * -this.b);

      var x = pos.x;
      var y = pos.y;

      newPos.x = this.d * id * x + -this.c * id * y + (this.ty * this.c - this.tx * this.d) * id;
      newPos.y = this.a * id * y + -this.b * id * x + (-this.ty * this.a + this.tx * this.b) * id;

      return newPos;
    }

    /**
     * Translates the matrix on the x and y.
     *
     * @param {number} x How much to translate x by
     * @param {number} y How much to translate y by
     * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
     */

  }, {
    key: 'translate',
    value: function translate(x, y) {
      this.tx += x;
      this.ty += y;

      return this;
    }

    /**
     * Applies a scale transformation to the matrix.
     *
     * @param {number} x The amount to scale horizontally
     * @param {number} y The amount to scale vertically
     * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
     */

  }, {
    key: 'scale',
    value: function scale(x, y) {
      this.a *= x;
      this.d *= y;
      this.c *= x;
      this.b *= y;
      this.tx *= x;
      this.ty *= y;

      return this;
    }

    /**
     * Applies a rotation transformation to the matrix.
     *
     * @param {number} angle - The angle in radians.
     * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
     */

  }, {
    key: 'rotate',
    value: function rotate(angle) {
      var cos = Math.cos(angle);
      var sin = Math.sin(angle);

      var a1 = this.a;
      var c1 = this.c;
      var tx1 = this.tx;

      this.a = a1 * cos - this.b * sin;
      this.b = a1 * sin + this.b * cos;
      this.c = c1 * cos - this.d * sin;
      this.d = c1 * sin + this.d * cos;
      this.tx = tx1 * cos - this.ty * sin;
      this.ty = tx1 * sin + this.ty * cos;

      return this;
    }

    /**
     * Appends the given Matrix to this Matrix.
     *
     * @param {PIXI.Matrix} matrix - The matrix to append.
     * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
     */

  }, {
    key: 'append',
    value: function append(matrix) {
      var a1 = this.a;
      var b1 = this.b;
      var c1 = this.c;
      var d1 = this.d;

      this.a = matrix.a * a1 + matrix.b * c1;
      this.b = matrix.a * b1 + matrix.b * d1;
      this.c = matrix.c * a1 + matrix.d * c1;
      this.d = matrix.c * b1 + matrix.d * d1;

      this.tx = matrix.tx * a1 + matrix.ty * c1 + this.tx;
      this.ty = matrix.tx * b1 + matrix.ty * d1 + this.ty;

      return this;
    }

    /**
     * Sets the matrix based on all the available properties
     *
     * @param {number} x - Position on the x axis
     * @param {number} y - Position on the y axis
     * @param {number} pivotX - Pivot on the x axis
     * @param {number} pivotY - Pivot on the y axis
     * @param {number} scaleX - Scale on the x axis
     * @param {number} scaleY - Scale on the y axis
     * @param {number} rotation - Rotation in radians
     * @param {number} skewX - Skew on the x axis
     * @param {number} skewY - Skew on the y axis
     * @return {Matrix} This matrix. Good for chaining method calls.
     */

  }, {
    key: 'setTransform',
    value: function setTransform(x, y, pivotX, pivotY, scaleX, scaleY, rotation, skewX, skewY) {
      var sr = Math.sin(rotation);
      var cr = Math.cos(rotation);
      var cy = Math.cos(skewY);
      var sy = Math.sin(skewY);
      var nsx = -Math.sin(skewX);
      var cx = Math.cos(skewX);

      var a = cr * scaleX;
      var b = sr * scaleX;
      var c = -sr * scaleY;
      var d = cr * scaleY;

      this.a = cy * a + sy * c;
      this.b = cy * b + sy * d;
      this.c = nsx * a + cx * c;
      this.d = nsx * b + cx * d;

      this.tx = x + (pivotX * a + pivotY * c);
      this.ty = y + (pivotX * b + pivotY * d);

      return this;
    }

    /**
     * Prepends the given Matrix to this Matrix.
     *
     * @param {PIXI.Matrix} matrix - The matrix to prepend
     * @return {PIXI.Matrix} This matrix. Good for chaining method calls.
     */

  }, {
    key: 'prepend',
    value: function prepend(matrix) {
      var tx1 = this.tx;

      if (matrix.a !== 1 || matrix.b !== 0 || matrix.c !== 0 || matrix.d !== 1) {
        var a1 = this.a;
        var c1 = this.c;

        this.a = a1 * matrix.a + this.b * matrix.c;
        this.b = a1 * matrix.b + this.b * matrix.d;
        this.c = c1 * matrix.a + this.d * matrix.c;
        this.d = c1 * matrix.b + this.d * matrix.d;
      }

      this.tx = tx1 * matrix.a + this.ty * matrix.c + matrix.tx;
      this.ty = tx1 * matrix.b + this.ty * matrix.d + matrix.ty;

      return this;
    }

    /**
     * Decomposes the matrix (x, y, scaleX, scaleY, and rotation) and sets the properties on to a transform.
     *
     * @param {Transform|TransformStatic} transform - The transform to apply the properties to.
     * @return {Transform|TransformStatic} The transform with the newly applied properties
     */

  }, {
    key: 'decompose',
    value: function decompose(transform) {
      // sort out rotation / skew..
      var a = this.a;
      var b = this.b;
      var c = this.c;
      var d = this.d;

      var skewX = -Math.atan2(-c, d);
      var skewY = Math.atan2(b, a);

      var delta = Math.abs(skewX + skewY);

      if (delta < 0.00001) {
        transform.rotation = skewY;

        if (a < 0 && d >= 0) {
          transform.rotation += transform.rotation <= 0 ? Math.PI : -Math.PI;
        }

        transform.skew.x = transform.skew.y = 0;
      } else {
        transform.skew.x = skewX;
        transform.skew.y = skewY;
      }

      // next set scale
      transform.scale.x = Math.sqrt(a * a + b * b);
      transform.scale.y = Math.sqrt(c * c + d * d);

      // next set position
      transform.position.x = this.tx;
      transform.position.y = this.ty;

      return transform;
    }

    /**
     * Inverts this matrix
     *
     * @return {Matrix} This matrix. Good for chaining method calls.
     */

  }, {
    key: 'invert',
    value: function invert() {
      var a1 = this.a;
      var b1 = this.b;
      var c1 = this.c;
      var d1 = this.d;
      var tx1 = this.tx;
      var n = a1 * d1 - b1 * c1;

      this.a = d1 / n;
      this.b = -b1 / n;
      this.c = -c1 / n;
      this.d = a1 / n;
      this.tx = (c1 * this.ty - d1 * tx1) / n;
      this.ty = -(a1 * this.ty - b1 * tx1) / n;

      return this;
    }

    /**
     * Resets this Matix to an identity (default) matrix.
     *
     * @return {Matrix} This matrix. Good for chaining method calls.
     */

  }, {
    key: 'identity',
    value: function identity() {
      this.a = 1;
      this.b = 0;
      this.c = 0;
      this.d = 1;
      this.tx = 0;
      this.ty = 0;

      return this;
    }

    /**
     * Creates a new Matrix object with the same values as this one.
     *
     * @return {Matrix} A copy of this matrix. Good for chaining method calls.
     */

  }, {
    key: 'clone',
    value: function clone() {
      var matrix = new Matrix();

      matrix.a = this.a;
      matrix.b = this.b;
      matrix.c = this.c;
      matrix.d = this.d;
      matrix.tx = this.tx;
      matrix.ty = this.ty;

      return matrix;
    }

    /**
     * Changes the values of the given matrix to be the same as the ones in this matrix
     *
     * @param {Matrix} matrix - The matrix to copy from.
     * @return {Matrix} The matrix given in parameter with its values updated.
     */

  }, {
    key: 'copy',
    value: function copy(matrix) {
      matrix.a = this.a;
      matrix.b = this.b;
      matrix.c = this.c;
      matrix.d = this.d;
      matrix.tx = this.tx;
      matrix.ty = this.ty;

      return matrix;
    }

    /**
     * A default (identity) matrix
     *
     * @static
     * @const
     */

  }], [{
    key: 'IDENTITY',
    get: function get() {
      return new Matrix();
    }

    /**
     * A temp matrix
     *
     * @static
     * @const
     */

  }, {
    key: 'TEMP_MATRIX',
    get: function get() {
      return new Matrix();
    }
  }]);

  return Matrix;
}();



/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(119);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(72);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(13);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 28 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 30 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(32)('keys');
var uid = __webpack_require__(20);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});
module.exports = function (key) {
  return store[key] || (store[key] = {});
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 34 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Rectangle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Point__ = __webpack_require__(19);


/**
 * Author se7en.
 */


/**
 * rect类
 */

var Rectangle = function () {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Rectangle, [{
        key: "x",
        get: function get() {
            return this._x;
        },
        set: function set(value) {
            this._x = value * 1;
        }
    }, {
        key: "y",
        get: function get() {
            return this._y;
        },
        set: function set(value) {
            this._y = value * 1;
        }
    }, {
        key: "width",
        get: function get() {
            return this._width;
        },
        set: function set(value) {
            this._width = value * 1;
        }
    }, {
        key: "height",
        get: function get() {
            return this._height;
        },
        set: function set(value) {
            this._height = value * 1;
        }
    }]);

    function Rectangle(_ref) {
        var _ref$x = _ref.x,
            x = _ref$x === undefined ? 0 : _ref$x,
            _ref$y = _ref.y,
            y = _ref$y === undefined ? 0 : _ref$y,
            _ref$width = _ref.width,
            width = _ref$width === undefined ? 0 : _ref$width,
            _ref$height = _ref.height,
            height = _ref$height === undefined ? 0 : _ref$height;

        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Rectangle);

        this._x = x;
        this._y = y;
        this._width = width;
        this._height = height;
        this.name = "polygon";
    }

    /**
     *返回水平中线
     * @returns {*}
     */


    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Rectangle, [{
        key: "set",
        value: function set(_ref2) {
            var _ref2$x = _ref2.x,
                x = _ref2$x === undefined ? 0 : _ref2$x,
                _ref2$y = _ref2.y,
                y = _ref2$y === undefined ? 0 : _ref2$y,
                _ref2$width = _ref2.width,
                width = _ref2$width === undefined ? 0 : _ref2$width,
                _ref2$height = _ref2.height,
                height = _ref2$height === undefined ? 0 : _ref2$height;

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
    }, {
        key: "toJson",
        value: function toJson() {
            return [this.x, this.y, this.width, this.height];
        }
    }, {
        key: "plane",
        get: function get() {
            return this.y + this.height / 2;
        },
        set: function set(value) {
            this.y = value - this.height / 2;
        }

        /**
         * 返回垂直中线
         * @returns {*}
         */

    }, {
        key: "vertical",
        get: function get() {
            return this.x + this.width / 2;
        },
        set: function set(value) {
            this.x = value - this.width / 2;
        }

        /**
         * 返回顶点集合
         * @returns {[null,null,null,null]}
         */

    }, {
        key: "points",
        get: function get() {
            return [new __WEBPACK_IMPORTED_MODULE_2__Point__["a" /* Point */](this.x, this.y), new __WEBPACK_IMPORTED_MODULE_2__Point__["a" /* Point */](this.x + this.width, this.y), new __WEBPACK_IMPORTED_MODULE_2__Point__["a" /* Point */](this.x + this.width, this.y + this.height), new __WEBPACK_IMPORTED_MODULE_2__Point__["a" /* Point */](this.x, this.y + this.height)];
        }
    }]);

    return Rectangle;
}();



/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ObservablePoint; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);


/**
 * The Point object represents a location in a two-dimensional coordinate system, where x represents
 * the horizontal axis and y represents the vertical axis.
 * An observable point is a point that triggers a callback when the point's position is changed.
 *
 * @class
 * @memberof PIXI
 */
var ObservablePoint = function () {
    /**
     * @param {Function} cb - callback when changed
     * @param {object} scope - owner of callback
     * @param {number} [x=0] - position of the point on the x axis
     * @param {number} [y=0] - position of the point on the y axis
     */
    function ObservablePoint(cb, scope) {
        var x = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var y = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ObservablePoint);

        this._x = x;
        this._y = y;

        this.cb = cb;
        this.scope = scope;
    }

    /**
     * Sets the point to a new x and y position.
     * If y is omitted, both x and y will be set to x.
     *
     * @param {number} [x=0] - position of the point on the x axis
     * @param {number} [y=0] - position of the point on the y axis
     */


    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ObservablePoint, [{
        key: "set",
        value: function set(x, y) {
            var _x = x || 0;
            var _y = y || (y !== 0 ? _x : 0);

            if (this._x !== _x || this._y !== _y) {
                this._x = _x;
                this._y = _y;
                this.cb.call(this.scope);
            }
        }

        /**
         * Copies the data from another point
         *
         * @param {ObservablePoint} point - point to copy from
         */

    }, {
        key: "copy",
        value: function copy(point) {
            if (this._x !== point.x || this._y !== point.y) {
                this._x = point.x;
                this._y = point.y;
                this.cb.call(this.scope);
            }
        }

        /**
         * The position of the displayObject on the x axis relative to the local coordinates of the parent.
         *
         * @member {number}
         */

    }, {
        key: "x",
        get: function get() {
            return this._x;
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
            if (this._x !== value) {
                this._x = value;
                this.cb.call(this.scope);
            }
        }

        /**
         * The position of the displayObject on the x axis relative to the local coordinates of the parent.
         *
         * @member {number}
         */

    }, {
        key: "y",
        get: function get() {
            return this._y;
        },
        set: function set(value) // eslint-disable-line require-jsdoc
        {
            if (this._y !== value) {
                this._y = value;
                this.cb.call(this.scope);
            }
        }
    }]);

    return ObservablePoint;
}();

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(59);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(9);
var dPs = __webpack_require__(85);
var enumBugKeys = __webpack_require__(33);
var IE_PROTO = __webpack_require__(31)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(49)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(86).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(7).f;
var has = __webpack_require__(11);
var TAG = __webpack_require__(3)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(87);
var global = __webpack_require__(6);
var hide = __webpack_require__(12);
var Iterators = __webpack_require__(15);
var TO_STRING_TAG = __webpack_require__(3)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(3);


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(6);
var core = __webpack_require__(2);
var LIBRARY = __webpack_require__(38);
var wksExt = __webpack_require__(42);
var defineProperty = __webpack_require__(7).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(18);
var createDesc = __webpack_require__(16);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(27);
var has = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(48);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(10) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(100);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(104);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(59);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TEXTURE_TYPE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return COMP_TYPE; });
/**
 * texture 类型常量
 */
var TEXTURE_TYPE = ["VText", "VImage", "VAudio", "VVideo"];
/**
 *
 */
var COMP_TYPE = ["DisplayObject", "Container", "Stage"];

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = stageDataTransform;
/* harmony export (immutable) */ __webpack_exports__["a"] = componentData;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__resourceManager_ResourceManager__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_dataConfig__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__animation_AnimationManager__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__action_ActionManager__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__domRender_defaultStyle_json__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__domRender_defaultStyle_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__domRender_defaultStyle_json__);








var stage = null;

function stageDataTransform(data) {
  var resource = new __WEBPACK_IMPORTED_MODULE_2__resourceManager_ResourceManager__["a" /* ResourceManager */](data.resource);
  return { main: componentData(data.main.pages[0]), resource: resource };
}

function componentData(data) {
  var parent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  var exports = { Container: __WEBPACK_IMPORTED_MODULE_1__core__["b" /* Container */], DisplayObject: __WEBPACK_IMPORTED_MODULE_1__core__["c" /* DisplayObject */], Stage: __WEBPACK_IMPORTED_MODULE_1__core__["d" /* Stage */] };
  var comp = null;
  data.texture.style = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, __WEBPACK_IMPORTED_MODULE_6__domRender_defaultStyle_json__["commonStyle"], __WEBPACK_IMPORTED_MODULE_6__domRender_defaultStyle_json__["defaultStyle"][data.texture.type], data.texture.style);
  var cls = __WEBPACK_IMPORTED_MODULE_3__config_dataConfig__["a" /* COMP_TYPE */][data.type];
  comp = new exports[cls](data);
  comp.children = [];
  if (__WEBPACK_IMPORTED_MODULE_1__core__["f" /* id */] <= comp.id) Object(__WEBPACK_IMPORTED_MODULE_1__core__["g" /* setID */])(comp.id + 1);
  if (data.children === undefined) data.children = [];
  data.children.map(function (value) {
    comp.children.push(componentData(value, comp));
  });
  if (__WEBPACK_IMPORTED_MODULE_3__config_dataConfig__["a" /* COMP_TYPE */][data.type] === "Stage") {
    stage = comp;
    comp.actionManager = new __WEBPACK_IMPORTED_MODULE_5__action_ActionManager__["a" /* ActionManager */](data.actionList);
    comp.animationManager = new __WEBPACK_IMPORTED_MODULE_4__animation_AnimationManager__["a" /* AnimationManager */](data.animationList);
  }
  comp.parent = parent;
  comp.stage = stage;
  return comp;
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(10) && !__webpack_require__(14)(function () {
  return Object.defineProperty(__webpack_require__(49)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(13);
var document = __webpack_require__(6).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(11);
var toIObject = __webpack_require__(8);
var arrayIndexOf = __webpack_require__(74)(false);
var IE_PROTO = __webpack_require__(31)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(28);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(30);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DisplayObject__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Texture__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Container__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Stage__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Bounds__ = __webpack_require__(55);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__DisplayObject__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_1__Texture__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__Container__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_3__Stage__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_0__DisplayObject__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_0__DisplayObject__["c"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__Bounds__["a"]; });








/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DisplayObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return id; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return setID; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Bounds__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__math_dataType_ObservablePoint__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__math_shape_Rectangle__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__math_dataType_TransformStatic__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__math_dataType_Matrix__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Texture__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__domRender_Style__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__config_dataConfig__ = __webpack_require__(46);



/**
 * Author se7en.
 * @type {number}
 */



var id = 0;

function getID() {
  return id++;
}

function setID(value) {
  id = value;
}








/**
 * DisplayObject类
 */

var DisplayObject = function () {
  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(DisplayObject, [{
    key: "x",


    /**
     * The position of the displayObject on the x axis relative to the local coordinates of the parent.
     * An alias to position.x
     *
     * @member {number}
     */
    get: function get() {
      return this.rectangle.x;
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      // this.transform.position.x = value;
      this.rectangle.x = value;
      this.updateTransform();
    }

    /**
     * The position of the displayObject on the y axis relative to the local coordinates of the parent.
     * An alias to position.y
     *
     * @member {number}
     */

  }, {
    key: "y",
    get: function get() {
      return this.rectangle.y;
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      // this.transform.position.y = value;

      this.rectangle.y = value;
      this.updateTransform();
    }

    /**
     * The coordinate of the object relative to the local coordinates of the parent.
     * Assignment by value since pixi-v4.
     *
     * @member {PIXI.Point|PIXI.ObservablePoint}
     */

  }, {
    key: "position",
    get: function get() {
      // this.updateTransform();
      return this.transform.position;
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this.transform.position.copy(value);
    }

    /**
     * The scale factor of the object.
     * Assignment by value since pixi-v4.
     *
     * @member {PIXI.Point|PIXI.ObservablePoint}
     */

  }, {
    key: "scale",
    get: function get() {
      // this.updateTransform();
      return this.transform.scale;
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this.transform.scale.copy(value);
    }

    /**
     * The pivot point of the displayObject that it rotates around
     * Assignment by value since pixi-v4.
     *
     * @member {PIXI.Point|PIXI.ObservablePoint}
     */

  }, {
    key: "pivot",
    get: function get() {
      // this.updateTransform();
      return this.transform.pivot;
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this.transform.pivot.copy(value);
    }

    /**
     * The skew factor for the object in radians.
     * Assignment by value since pixi-v4.
     *
     * @member {PIXI.ObservablePoint}
     */

  }, {
    key: "skew",
    get: function get() {
      // this.updateTransform();
      return this.transform.skew;
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this.transform.skew.copy(value);
    }

    /**
     * The rotation of the object in radians.
     *
     * @member {number}
     */

  }, {
    key: "rotation",
    get: function get() {
      // this.updateTransform();
      // this.getBounds(false);
      return this.transform.rotation;
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this.transform.rotation = value;
      this.updateTransform();
    }
  }, {
    key: "bounds",
    get: function get() {
      return this._bounds;
    },
    set: function set(value) {
      this._bounds = value;
    }
  }, {
    key: "stage",
    get: function get() {
      return this._stage;
    },
    set: function set(value) {
      this._stage = value;
    }
  }, {
    key: "type",
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_10__config_dataConfig__["a" /* COMP_TYPE */][this._type];
    },
    set: function set(value) {
      this._type = value;
    }
  }, {
    key: "id",
    get: function get() {
      return this._id;
    },
    set: function set(value) {
      this._id = value;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    },
    set: function set(value) {
      this._name = value;
    }
  }, {
    key: "rectangle",
    get: function get() {
      return this._rectangle;
    }
  }, {
    key: "visible",
    get: function get() {
      return this._visible;
    },
    set: function set(value) {
      this._visible = value;
    }
  }, {
    key: "transform",
    get: function get() {
      return this._transform;
    }
  }]);

  function DisplayObject(_ref) {
    var _ref$texture = _ref.texture,
        texture = _ref$texture === undefined ? null : _ref$texture,
        _ref$visible = _ref.visible,
        visible = _ref$visible === undefined ? true : _ref$visible,
        _ref$id = _ref.id,
        id = _ref$id === undefined ? getID() : _ref$id,
        _ref$name = _ref.name,
        name = _ref$name === undefined ? this._id : _ref$name,
        _ref$rectangle = _ref.rectangle,
        rectangle = _ref$rectangle === undefined ? {} : _ref$rectangle,
        transform = _ref.transform,
        type = _ref.type,
        edit = _ref.edit;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, DisplayObject);

    this._id = id;
    this._name = name;
    this._visible = visible;
    this._rectangle = new __WEBPACK_IMPORTED_MODULE_5__math_shape_Rectangle__["a" /* Rectangle */]({ x: rectangle[0], y: rectangle[1], width: rectangle[2], height: rectangle[3] });
    this._transform = new __WEBPACK_IMPORTED_MODULE_6__math_dataType_TransformStatic__["a" /* TransformStatic */]();
    this._transform.setTransformFromArray(transform);
    this._texture = new __WEBPACK_IMPORTED_MODULE_8__Texture__["a" /* Texture */](texture);
    this._parent = null;
    this._stage = null;
    this._bounds = new __WEBPACK_IMPORTED_MODULE_3__Bounds__["a" /* Bounds */]();
    this._type = type;
    this.isMounted = true;
    this.enter = {};
    this.leave = {};
    this._boundsID = 0;
    this._lastBoundsID = -1;
    this._boundsRect = new __WEBPACK_IMPORTED_MODULE_5__math_shape_Rectangle__["a" /* Rectangle */]({ x: 0, y: 0, width: 0, height: 0 });
    this._localBoundsRect = null;
    this.tempDisplayObjectParent = null;
    this._destroyed = false;
    this._anchor = new __WEBPACK_IMPORTED_MODULE_4__math_dataType_ObservablePoint__["a" /* ObservablePoint */](this._onAnchorUpdate, this);
    this.vertexData = new Float32Array(8);
    this._x = 0;
    this._y = 0;
    /**
     * This is used to calculate the bounds of the object IF it is a trimmed sprite
     *
     * @private
     * @member {Float32Array}
     */
    this.vertexTrimmedData = null;

    this._transformID = -1;
    this._textureID = -1;

    this._transformTrimmedID = -1;
    this._textureTrimmedID = -1;
    this.edit = edit || {
      "layer": {
        "lock": false,
        "hide": false
      },
      "control": {
        "permission": [1, 1, 1, 1]
      }
    };
  }

  /**
   * Called when the anchor position updates.
   *
   * @private
   */


  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(DisplayObject, [{
    key: "_onAnchorUpdate",
    value: function _onAnchorUpdate() {
      this._transformID = -1;
      this._transformTrimmedID = -1;
    }

    /**
     * @private
     * @member {PIXI.DisplayObject}
     */

  }, {
    key: "updateTransform",


    /**
     * Updates the object transform for rendering
     *
     * TODO - Optimization pass!
     */
    value: function updateTransform() {
      this.transform.updateTransform(this.parent.transform);
      // multiply the alphas..
      // this.getBounds(true);
      this._bounds.updateID++;
      this._calculateBounds();
    }

    /**
     * recursively updates transform of all objects from the root to this one
     * internal function for toLocal()
     */

  }, {
    key: "_recursivePostUpdateTransform",
    value: function _recursivePostUpdateTransform() {
      if (this.parent) {
        this.parent._recursivePostUpdateTransform();
        this.transform.updateTransform(this.parent.transform);
      } else {
        this.transform.updateTransform(this._tempDisplayObjectParent.transform);
      }
    }

    /**
     * Retrieves the bounds of the displayObject as a rectangle object.
     *
     * @param {boolean} skipUpdate - setting to true will stop the transforms of the scene graph from
     *  being updated. This means the calculation returned MAY be out of date BUT will give you a
     *  nice performance boost
     * @param {Rectangle} rect - Optional rectangle to store the result of the bounds calculation
     * @return {Rectangle} the rectangular bounding area
     */

  }, {
    key: "getBounds",
    value: function getBounds(skipUpdate, rect) {
      if (!skipUpdate) {
        if (!this.parent) {
          this.parent = this._tempDisplayObjectParent;
          this.updateTransform();
          this.parent = null;
        } else {
          this._recursivePostUpdateTransform();
          this.updateTransform();
        }
      }
      // if (this._boundsID !== this._lastBoundsID)
      // {
      //   this.calculateBounds();
      // }

      if (!rect) {
        if (!this._boundsRect) {
          this._boundsRect = new __WEBPACK_IMPORTED_MODULE_5__math_shape_Rectangle__["a" /* Rectangle */]({ x: 0, y: 0, width: 1, height: 1 });
        }

        rect = this._boundsRect;
      }
      // this._boundsRect = this._bounds.getRectangle(rect);
      return this._bounds.getRectangle(rect);
    }
  }, {
    key: "calculateVertices",
    value: function calculateVertices() {
      // if (this._transformID === this.transform._worldID) {
      //   return;
      // }
      //
      // this._transformID = this.transform._worldID;
      // this._textureID = this._texture._updateID;

      // set the vertex data

      // const texture = this._texture;
      var wt = this.transform.worldTransform;
      var a = wt.a;
      var b = wt.b;
      var c = wt.c;
      var d = wt.d;
      var tx = wt.tx;
      var ty = wt.ty;
      var vertexData = this.vertexData;
      // const trim = texture.trim;
      // const orig = texture.orig;
      var anchor = this._anchor;

      //
      // // if (trim)
      // // {
      // // if the sprite is trimmed and is not a tilingsprite then we need to add the extra
      // // space before transforming the sprite coords.
      // // w1 = trim.x - (anchor._x * orig.width);
      // // w0 = w1 + trim.width;
      // //
      // // h1 = trim.y - (anchor._y * orig.height);
      // // h0 = h1 + trim.height;
      // // }
      // // else
      // // {
      // w1 = -0.5 * this.rectangle.width;
      // w0 = w1 + this.rectangle.width;
      //
      // h1 = -0.5 * this.rectangle.height;
      // h0 = h1 + this.rectangle.height;
      // // }


      // let w0 = -this.rectangle.width/2;
      // let w1 = this.rectangle.width/2;
      // let h0 = -this.rectangle.height/2;
      // let h1 = this.rectangle.height/2;
      var w0 = this.rectangle.x + this.rectangle.width;
      var w1 = this.rectangle.x;
      var h0 = this.rectangle.y + this.rectangle.height;
      var h1 = this.rectangle.y;
      // xy
      vertexData[0] = a * w1 + c * h1 + tx;
      vertexData[1] = d * h1 + b * w1 + ty;
      // xy
      vertexData[2] = a * w0 + c * h1 + tx;
      vertexData[3] = d * h1 + b * w0 + ty;

      // xy
      vertexData[4] = a * w0 + c * h0 + tx;
      vertexData[5] = d * h0 + b * w0 + ty;

      // xy
      vertexData[6] = a * w1 + c * h0 + tx;
      vertexData[7] = d * h0 + b * w1 + ty;
    }

    /**
     * Updates the bounds of the sprite.
     *
     * @private
     */

  }, {
    key: "_calculateBounds",
    value: function _calculateBounds() {
      this.calculateVertices();
      this._bounds.clear();
      this._bounds.addQuad(this.vertexData);
      console.log(this._bounds);
      // const trim = this._texture.trim;
      // const orig = this._texture.orig;
      //
      // First lets check to see if the current texture has a trim..
      // if (!trim || (trim.width === orig.width && trim.height === orig.height))
      // {
      //   no trim! lets use the usual calculations..
      // this.calculateVertices();
      // this._bounds.addQuad(this.vertexData);
      // }
      // else
      // {
      // lets calculate a special trimmed bounds...
      // this.calculateTrimmedVertices();
      // this._bounds.addQuad(this.vertexTrimmedData);
      // }
    }

    /**
     * Retrieves the local bounds of the displayObject as a rectangle object
     *
     * @param {PIXI.Rectangle} [rect] - Optional rectangle to store the result of the bounds calculation
     * @return {PIXI.Rectangle} the rectangular bounding area
     */

  }, {
    key: "getLocalBounds",
    value: function getLocalBounds(rect) {
      var transformRef = this.transform;
      var parentRef = this.parent;

      this.parent = null;
      this.transform = this._tempDisplayObjectParent.transform;

      if (!rect) {
        if (!this._localBoundsRect) {
          this._localBoundsRect = new __WEBPACK_IMPORTED_MODULE_5__math_shape_Rectangle__["a" /* Rectangle */]();
        }

        rect = this._localBoundsRect;
      }

      var bounds = this.getBounds(false, rect);

      this.parent = parentRef;
      this.transform = transformRef;

      return bounds;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // this.removeAllListeners();
      if (this.parent) {
        this.parent.removeChild(this);
      }
      // this.transform = null;

      this.parent = null;

      this._bounds = null;
      // this._currentBounds = null;
      // this._mask = null;
      //
      // this.filterArea = null;
      //
      // this.interactive = false;
      // this.interactiveChildren = false;

      this._destroyed = true;
    }

    /**
     * 转换为原始数据
     * @returns {*}
     */

  }, {
    key: "toJson",
    value: function toJson() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, {
        id: this.id,
        name: this.name,
        visible: this.visible,
        rectangle: this.rectangle.toJson(),
        transform: this.transform.toJson(),
        texture: this.texture.toJson(),
        type: this._type
      });
    }
  }, {
    key: "getDescents",
    value: function getDescents() {
      return false;
    }
  }, {
    key: "getAnimationData",
    value: function getAnimationData() {}
  }, {
    key: "_tempDisplayObjectParent",
    get: function get() {
      if (this.tempDisplayObjectParent === null) {
        this.tempDisplayObjectParent = new DisplayObject({ texture: {} });
      }

      return this.tempDisplayObjectParent;
    }
  }, {
    key: "boundsRect",
    get: function get() {
      return this.getBounds(true);
    }
  }, {
    key: "parent",
    get: function get() {
      return this._parent;
    },
    set: function set(value) {
      this._parent = value;
    }
  }, {
    key: "texture",
    get: function get() {
      return this._texture;
    },
    set: function set(value) {
      this._texture = value;
    }
  }, {
    key: "toStyle",
    get: function get() {
      return new __WEBPACK_IMPORTED_MODULE_9__domRender_Style__["a" /* Style */]().toStyle(this);
    }
  }, {
    key: "toTransform",
    get: function get() {
      return new __WEBPACK_IMPORTED_MODULE_9__domRender_Style__["a" /* Style */]().toTransfrom(this);
    }
  }]);

  return DisplayObject;
}();



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bounds; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math_shape_Rectangle__ = __webpack_require__(35);




/**
 * 'Builder' pattern for bounds rectangles
 * Axis-Aligned Bounding Box
 * It is not a shape! Its mutable thing, no 'EMPTY' or that kind of problems
 *
 * @class
 * @memberof PIXI
 */

var Bounds = function () {
    /**
     *
     */
    function Bounds() {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Bounds);

        /**
         * @member {number}
         * @default 0
         */
        this.minX = Infinity;

        /**
         * @member {number}
         * @default 0
         */
        this.minY = Infinity;

        /**
         * @member {number}
         * @default 0
         */
        this.maxX = -Infinity;

        /**
         * @member {number}
         * @default 0
         */
        this.maxY = -Infinity;

        this.rect = null;
    }

    /**
     * Checks if bounds are empty.
     *
     * @return {boolean} True if empty.
     */


    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Bounds, [{
        key: "isEmpty",
        value: function isEmpty() {
            return this.minX > this.maxX || this.minY > this.maxY;
        }

        /**
         * Clears the bounds and resets.
         *
         */

    }, {
        key: "clear",
        value: function clear() {
            this.updateID++;

            this.minX = Infinity;
            this.minY = Infinity;
            this.maxX = -Infinity;
            this.maxY = -Infinity;
        }

        /**
         * Can return Rectangle.EMPTY constant, either construct new rectangle, either use your rectangle
         * It is not guaranteed that it will return tempRect
         *
         * @param {PIXI.Rectangle} rect - temporary object will be used if AABB is not empty
         * @returns {PIXI.Rectangle} A rectangle of the bounds
         */

    }, {
        key: "getRectangle",
        value: function getRectangle(rect) {
            if (this.minX > this.maxX || this.minY > this.maxY) {
                return __WEBPACK_IMPORTED_MODULE_2__math_shape_Rectangle__["a" /* Rectangle */].EMPTY;
            }

            rect = rect || new __WEBPACK_IMPORTED_MODULE_2__math_shape_Rectangle__["a" /* Rectangle */]({ x: 0, y: 0, width: 1, height: 1 });

            rect.x = this.minX;
            rect.y = this.minY;
            rect.width = this.maxX - this.minX;
            rect.height = this.maxY - this.minY;

            return rect;
        }

        /**
         * This function should be inlined when its possible.
         *
         * @param {PIXI.Point} point - The point to add.
         */

    }, {
        key: "addPoint",
        value: function addPoint(point) {
            this.minX = Math.min(this.minX, point.x);
            this.maxX = Math.max(this.maxX, point.x);
            this.minY = Math.min(this.minY, point.y);
            this.maxY = Math.max(this.maxY, point.y);
        }

        /**
         * Adds a quad, not transformed
         *
         * @param {Float32Array} vertices - The verts to add.
         */

    }, {
        key: "addQuad",
        value: function addQuad(vertices) {
            var minX = this.minX;
            var minY = this.minY;
            var maxX = this.maxX;
            var maxY = this.maxY;

            var x = vertices[0];
            var y = vertices[1];

            minX = x < minX ? x : minX;
            minY = y < minY ? y : minY;
            maxX = x > maxX ? x : maxX;
            maxY = y > maxY ? y : maxY;

            x = vertices[2];
            y = vertices[3];
            minX = x < minX ? x : minX;
            minY = y < minY ? y : minY;
            maxX = x > maxX ? x : maxX;
            maxY = y > maxY ? y : maxY;

            x = vertices[4];
            y = vertices[5];
            minX = x < minX ? x : minX;
            minY = y < minY ? y : minY;
            maxX = x > maxX ? x : maxX;
            maxY = y > maxY ? y : maxY;

            x = vertices[6];
            y = vertices[7];
            minX = x < minX ? x : minX;
            minY = y < minY ? y : minY;
            maxX = x > maxX ? x : maxX;
            maxY = y > maxY ? y : maxY;

            this.minX = minX;
            this.minY = minY;
            this.maxX = maxX;
            this.maxY = maxY;
        }

        /**
         * Adds sprite frame, transformed.
         *
         * @param {PIXI.TransformBase} transform - TODO
         * @param {number} x0 - TODO
         * @param {number} y0 - TODO
         * @param {number} x1 - TODO
         * @param {number} y1 - TODO
         */

    }, {
        key: "addFrame",
        value: function addFrame(transform, x0, y0, x1, y1) {
            var matrix = transform.worldTransform;
            var a = matrix.a;
            var b = matrix.b;
            var c = matrix.c;
            var d = matrix.d;
            var tx = matrix.tx;
            var ty = matrix.ty;

            var minX = this.minX;
            var minY = this.minY;
            var maxX = this.maxX;
            var maxY = this.maxY;

            var x = a * x0 + c * y0 + tx;
            var y = b * x0 + d * y0 + ty;

            minX = x < minX ? x : minX;
            minY = y < minY ? y : minY;
            maxX = x > maxX ? x : maxX;
            maxY = y > maxY ? y : maxY;

            x = a * x1 + c * y0 + tx;
            y = b * x1 + d * y0 + ty;
            minX = x < minX ? x : minX;
            minY = y < minY ? y : minY;
            maxX = x > maxX ? x : maxX;
            maxY = y > maxY ? y : maxY;

            x = a * x0 + c * y1 + tx;
            y = b * x0 + d * y1 + ty;
            minX = x < minX ? x : minX;
            minY = y < minY ? y : minY;
            maxX = x > maxX ? x : maxX;
            maxY = y > maxY ? y : maxY;

            x = a * x1 + c * y1 + tx;
            y = b * x1 + d * y1 + ty;
            minX = x < minX ? x : minX;
            minY = y < minY ? y : minY;
            maxX = x > maxX ? x : maxX;
            maxY = y > maxY ? y : maxY;

            this.minX = minX;
            this.minY = minY;
            this.maxX = maxX;
            this.maxY = maxY;
        }

        /**
         * Add an array of vertices
         *
         * @param {PIXI.TransformBase} transform - TODO
         * @param {Float32Array} vertices - TODO
         * @param {number} beginOffset - TODO
         * @param {number} endOffset - TODO
         */

    }, {
        key: "addVertices",
        value: function addVertices(transform, vertices, beginOffset, endOffset) {
            var matrix = transform.worldTransform;
            var a = matrix.a;
            var b = matrix.b;
            var c = matrix.c;
            var d = matrix.d;
            var tx = matrix.tx;
            var ty = matrix.ty;

            var minX = this.minX;
            var minY = this.minY;
            var maxX = this.maxX;
            var maxY = this.maxY;

            for (var i = beginOffset; i < endOffset; i += 2) {
                var rawX = vertices[i];
                var rawY = vertices[i + 1];
                var x = a * rawX + c * rawY + tx;
                var y = d * rawY + b * rawX + ty;

                minX = x < minX ? x : minX;
                minY = y < minY ? y : minY;
                maxX = x > maxX ? x : maxX;
                maxY = y > maxY ? y : maxY;
            }

            this.minX = minX;
            this.minY = minY;
            this.maxX = maxX;
            this.maxY = maxY;
        }

        /**
         * Adds other Bounds
         *
         * @param {PIXI.Bounds} bounds - TODO
         */

    }, {
        key: "addBounds",
        value: function addBounds(bounds) {
            var minX = this.minX;
            var minY = this.minY;
            var maxX = this.maxX;
            var maxY = this.maxY;

            this.minX = bounds.minX < minX ? bounds.minX : minX;
            this.minY = bounds.minY < minY ? bounds.minY : minY;
            this.maxX = bounds.maxX > maxX ? bounds.maxX : maxX;
            this.maxY = bounds.maxY > maxY ? bounds.maxY : maxY;
        }

        /**
         * Adds other Bounds, masked with Bounds
         *
         * @param {PIXI.Bounds} bounds - TODO
         * @param {PIXI.Bounds} mask - TODO
         */

    }, {
        key: "addBoundsMask",
        value: function addBoundsMask(bounds, mask) {
            var _minX = bounds.minX > mask.minX ? bounds.minX : mask.minX;
            var _minY = bounds.minY > mask.minY ? bounds.minY : mask.minY;
            var _maxX = bounds.maxX < mask.maxX ? bounds.maxX : mask.maxX;
            var _maxY = bounds.maxY < mask.maxY ? bounds.maxY : mask.maxY;

            if (_minX <= _maxX && _minY <= _maxY) {
                var minX = this.minX;
                var minY = this.minY;
                var maxX = this.maxX;
                var maxY = this.maxY;

                this.minX = _minX < minX ? _minX : minX;
                this.minY = _minY < minY ? _minY : minY;
                this.maxX = _maxX > maxX ? _maxX : maxX;
                this.maxY = _maxY > maxY ? _maxY : maxY;
            }
        }

        /**
         * Adds other Bounds, masked with Rectangle
         *
         * @param {PIXI.Bounds} bounds - TODO
         * @param {PIXI.Rectangle} area - TODO
         */

    }, {
        key: "addBoundsArea",
        value: function addBoundsArea(bounds, area) {
            var _minX = bounds.minX > area.x ? bounds.minX : area.x;
            var _minY = bounds.minY > area.y ? bounds.minY : area.y;
            var _maxX = bounds.maxX < area.x + area.width ? bounds.maxX : area.x + area.width;
            var _maxY = bounds.maxY < area.y + area.height ? bounds.maxY : area.y + area.height;

            if (_minX <= _maxX && _minY <= _maxY) {
                var minX = this.minX;
                var minY = this.minY;
                var maxX = this.maxX;
                var maxY = this.maxY;

                this.minX = _minX < minX ? _minX : minX;
                this.minY = _minY < minY ? _minY : minY;
                this.maxX = _maxX > maxX ? _maxX : maxX;
                this.maxY = _maxY > maxY ? _maxY : maxY;
            }
        }
    }]);

    return Bounds;
}();



/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransformStatic; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ObservablePoint__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__TransformBase__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Matrix__ = __webpack_require__(24);









/**
 * Transform that takes care about its versions
 *
 * @class
 * @extends TransformBase
 */
var TransformStatic = function (_TransformBase) {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_inherits___default()(TransformStatic, _TransformBase);

  /**
   *
   */
  function TransformStatic() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, TransformStatic);

    /**
     * The coordinate of the object relative to the local coordinates of the parent.
     *
     * @member {ObservablePoint}
     */
    var _this = __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_possibleConstructorReturn___default()(this, (TransformStatic.__proto__ || __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_get_prototype_of___default()(TransformStatic)).call(this));

    _this.position = new __WEBPACK_IMPORTED_MODULE_5__ObservablePoint__["a" /* ObservablePoint */](_this.onChange, _this, 0, 0);

    /**
     * The scale factor of the object.
     *
     * @member {ObservablePoint}
     */
    _this.scale = new __WEBPACK_IMPORTED_MODULE_5__ObservablePoint__["a" /* ObservablePoint */](_this.onChange, _this, 1, 1);

    /**
     * The pivot point of the displayObject that it rotates around
     *
     * @member {ObservablePoint}
     */
    _this.pivot = new __WEBPACK_IMPORTED_MODULE_5__ObservablePoint__["a" /* ObservablePoint */](_this.onChange, _this, 0, 0);

    /**
     *
     *
     * The skew amount, on the x and y axis.
     *
     * @member {ObservablePoint}
     */
    _this.skew = new __WEBPACK_IMPORTED_MODULE_5__ObservablePoint__["a" /* ObservablePoint */](_this.updateSkew, _this, 0, 0);

    _this._rotation = 0;

    _this._cx = 1; // cos rotation + skewY;
    _this._sx = 0; // sin rotation + skewY;
    _this._cy = 0; // cos rotation + Math.PI/2 - skewX;
    _this._sy = 1; // sin rotation + Math.PI/2 - skewX;

    _this._localID = 0;
    _this._currentLocalID = 0;
    _this._rotateDeg = 0;
    return _this;
  }

  /**
   * Called when a value changes.
   *
   * @private
   */


  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(TransformStatic, [{
    key: 'onChange',
    value: function onChange() {
      this._localID++;
      this.updateTransform(this);
    }

    /**
     * Called when skew or rotation changes
     *
     * @private
     */

  }, {
    key: 'updateSkew',
    value: function updateSkew() {
      this._cx = Math.cos(this._rotation + this.skew._y);
      this._sx = Math.sin(this._rotation + this.skew._y);
      this._cy = -Math.sin(this._rotation - this.skew._x); // cos, added PI/2
      this._sy = Math.cos(this._rotation - this.skew._x); // sin, added PI/2

      this._localID++;
      this.updateTransform(this);
    }

    /**
     * Updates only local matrix
     */

  }, {
    key: 'updateLocalTransform',
    value: function updateLocalTransform() {
      var lt = this.localTransform;

      if (this._localID !== this._currentLocalID) {
        // get the matrix values of the displayobject based on its transform properties..
        lt.a = this._cx * this.scale._x;
        lt.b = this._sx * this.scale._x;
        lt.c = this._cy * this.scale._y;
        lt.d = this._sy * this.scale._y;

        lt.tx = this.position._x - (this.pivot._x * lt.a + this.pivot._y * lt.c);
        lt.ty = this.position._y - (this.pivot._x * lt.b + this.pivot._y * lt.d);
        this._currentLocalID = this._localID;
        // force an update..
        this._parentID = -1;
      }
    }
  }, {
    key: 'setTransformFromArray',
    value: function setTransformFromArray(array) {
      array = array && array.length === 9 ? array : [0, 0, 1, 1, 0, 0, 0, 0, 0];
      this.setTransform(array[0], array[1], array[2], array[3], array[4], array[5], array[6], array[7], array[8]);
    }
  }, {
    key: 'setTransform',
    value: function setTransform() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var scaleX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var scaleY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
      var rotation = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var skewX = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
      var skewY = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
      var pivotX = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
      var pivotY = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : 0;

      this.position.x = x;
      this.position.y = y;
      this.scale.x = !scaleX ? 1 : scaleX;
      this.scale.y = !scaleY ? 1 : scaleY;
      this.rotation = rotation;
      this.skew.x = skewX;
      this.skew.y = skewY;
      this.pivot.x = pivotX;
      this.pivot.y = pivotY;

      return this;
    }

    /**
     * Updates the values of the object and applies the parent's transform.
     *
     * @param {Transform} parentTransform - The transform of the parent of this object
     */

  }, {
    key: 'updateTransform',
    value: function updateTransform(parentTransform) {
      var lt = this.localTransform;

      if (this._localID !== this._currentLocalID) {
        // get the matrix values of the displayobject based on its transform properties..
        lt.a = this._cx * this.scale._x;
        lt.b = this._sx * this.scale._x;
        lt.c = this._cy * this.scale._y;
        lt.d = this._sy * this.scale._y;

        lt.tx = this.position._x - (this.pivot._x * lt.a + this.pivot._y * lt.c);
        lt.ty = this.position._y - (this.pivot._x * lt.b + this.pivot._y * lt.d);
        this._currentLocalID = this._localID;

        // force an update..
        this._parentID = -1;
      }

      if (this._parentID !== parentTransform._worldID) {
        // concat the parent matrix with the objects transform.
        var pt = parentTransform.worldTransform;
        var wt = this.worldTransform;

        wt.a = lt.a * pt.a + lt.b * pt.c;
        wt.b = lt.a * pt.b + lt.b * pt.d;
        wt.c = lt.c * pt.a + lt.d * pt.c;
        wt.d = lt.c * pt.b + lt.d * pt.d;
        wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx;
        wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty;

        this._parentID = parentTransform._worldID;

        // update the id of the transform..
        this._worldID++;
      }
    }

    /**
     * Decomposes a matrix and sets the transforms properties based on it.
     *
     * @param {Matrix} matrix - The matrix to decompose
     */

  }, {
    key: 'setFromMatrix',
    value: function setFromMatrix(matrix) {
      matrix.decompose(this);
      this._localID++;
    }
  }, {
    key: 'setFromCssArray',
    value: function setFromCssArray(array) {
      var matrix = new __WEBPACK_IMPORTED_MODULE_7__Matrix__["a" /* Matrix */]();
      // matrix.fromCssArray(array);
      // let matrix1 = matrix.toArray(false);
      // let matrix2 = new Matrix();
      matrix.fromArray(array);
      this.setFromMatrix(matrix);
      // this.localTransform = matrix;
    }

    /**
     * The rotation of the object in radians.
     *
     * @member {number}
     */

  }, {
    key: 'toJson',
    value: function toJson() {
      var temp = [];
      temp[0] = this.position.x;
      temp[1] = this.position.y;
      temp[2] = this.scale.x;
      temp[3] = this.scale.y;
      temp[4] = this.rotation;
      temp[5] = this.skew.x;
      temp[6] = this.skew.y;
      temp[7] = this.pivot.x;
      temp[8] = this.pivot.y;
      return temp;
    }
  }, {
    key: 'rotation',
    get: function get() {
      return this._rotateDeg;
    },
    set: function set(value) // eslint-disable-line require-jsdoc
    {
      this._rotateDeg = value;
      this._rotation = value * 2 * Math.PI / 360;
      this.updateSkew();
    }
  }]);

  return TransformStatic;
}(__WEBPACK_IMPORTED_MODULE_6__TransformBase__["a" /* default */]);

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(11);
var toObject = __webpack_require__(21);
var IE_PROTO = __webpack_require__(31)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(4);
var core = __webpack_require__(2);
var fails = __webpack_require__(14);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(81);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(90);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(38);
var $export = __webpack_require__(4);
var redefine = __webpack_require__(61);
var hide = __webpack_require__(12);
var has = __webpack_require__(11);
var Iterators = __webpack_require__(15);
var $iterCreate = __webpack_require__(84);
var setToStringTag = __webpack_require__(40);
var getPrototypeOf = __webpack_require__(57);
var ITERATOR = __webpack_require__(3)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = (!BUGGY && $native) || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(50);
var hiddenKeys = __webpack_require__(33).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Texture; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_entries__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_entries___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_entries__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_slicedToArray__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_slicedToArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_slicedToArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__config_dataConfig__ = __webpack_require__(46);







var Texture = function () {
  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(Texture, [{
    key: 'content',
    get: function get() {
      return this._content;
    },
    set: function set(value) {
      this._content = value;
    }
  }, {
    key: 'type',
    get: function get() {
      return __WEBPACK_IMPORTED_MODULE_5__config_dataConfig__["b" /* TEXTURE_TYPE */][this._type];
    },
    set: function set(value) {
      this._type = value;
    }
  }, {
    key: 'style',
    get: function get() {
      return this._style;
    },
    set: function set(value) {
      this._style = value;
    }
  }]);

  function Texture(_ref) {
    var _ref$content = _ref.content,
        content = _ref$content === undefined ? {} : _ref$content,
        _ref$type = _ref.type,
        type = _ref$type === undefined ? -1 : _ref$type,
        _ref$style = _ref.style,
        style = _ref$style === undefined ? {} : _ref$style;

    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, Texture);

    this._content = content;
    this._type = type;
    this._style = style;
  }

  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(Texture, [{
    key: 'toJson',
    value: function toJson() {
      var temp = {};
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_get_iterator___default()(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_entries___default()(this.style)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref2 = _step.value;

          var _ref3 = __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_slicedToArray___default()(_ref2, 2);

          var key = _ref3[0];
          var value = _ref3[1];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return { content: this.content, type: this._type, style: this.style };
    }
  }]);

  return Texture;
}();



/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(66);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(15);
module.exports = __webpack_require__(2).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(28);
var TAG = __webpack_require__(3)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Container; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__DisplayObject__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__utils_dataFunc__ = __webpack_require__(47);











/**
 * 容器类
 */

var Container = function (_DisplayObject) {
  __WEBPACK_IMPORTED_MODULE_7_babel_runtime_helpers_inherits___default()(Container, _DisplayObject);

  function Container(obj) {
    __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_classCallCheck___default()(this, Container);

    var _this = __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Container.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(Container)).call(this, obj));

    _this.children = [];
    return _this;
  }

  /**
   * 获取子孙元素
   */


  __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_createClass___default()(Container, [{
    key: "getDescents",
    value: function getDescents() {
      var descents = [].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(this.children));
      descents.map(function (value) {
        if (value.getDescents()) {
          descents = [].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(descents), __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(value.getDescents()));
        }
      });
      return [].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(descents));
    }

    /**
     * 遍历子孙元素 找到id元素
     * @param id
     * @returns {T}
     */

  }, {
    key: "getDescentById",
    value: function getDescentById(id) {
      var temp = [].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(this.getDescents()), [this]);
      return temp.find(function (value) {
        return value.id === id;
      });
    }
  }, {
    key: "getDescentsByName",
    value: function getDescentsByName(name) {
      return this.getDescents().filter(function (value) {
        return value.name === name;
      });
    }

    /**
     * 添加子元素
     * @param obj
     */

  }, {
    key: "addChild",
    value: function addChild(obj) {
      var child = obj.isMounted ? obj : Object(__WEBPACK_IMPORTED_MODULE_9__utils_dataFunc__["a" /* componentData */])(obj, this);
      this.children.push(child);
      return child;
    }

    /**
     * Recalculates the bounds of the container.
     *
     */

  }, {
    key: "calculateBounds",
    value: function calculateBounds() {
      this._bounds.clear();

      this._calculateBounds();

      for (var i = 0; i < this.children.length; i++) {
        var child = this.children[i];

        if (!child.visible) {
          continue;
        }

        child.calculateBounds();

        // // TODO: filter+mask, need to mask both somehow
        // if (child._mask)
        // {
        //   child._mask.calculateBounds();
        //   this._bounds.addBoundsMask(child._bounds, child._mask._bounds);
        // }
        // else if (child.filterArea)
        // {
        //   this._bounds.addBoundsArea(child._bounds, child.filterArea);
        // }
        // else
        // {
        this._bounds.addBounds(child._bounds);
        // }
      }

      this._lastBoundsID = this._boundsID;
    }
  }, {
    key: "_calculateBounds",
    value: function _calculateBounds() {}
    // FILL IN//


    /**
     * 重新排序
     * @param array
     */

  }, {
    key: "reorder",
    value: function reorder(array) {
      this.children = null;
      this.children = array;
    }

    /**
     * 删除子对象
     * @param displayObject
     */

  }, {
    key: "removeChild",
    value: function removeChild(displayObject) {
      this.children.splice(this.getIndex(displayObject), 1);
    }
  }, {
    key: "destroyChild",
    value: function destroyChild(displayObject) {
      displayObject.destroy();
    }

    /**
     * 通过id删除子对象
     * @param id
     */

  }, {
    key: "removeChildById",
    value: function removeChildById(id) {
      this.destroyChild(this.getChildById(id));
    }

    /**
     * 删除多个子对象
     * @param arr
     */

  }, {
    key: "removeChildren",
    value: function removeChildren(arr) {
      var _this2 = this;

      if (arr.length < 0) {
        console.error('No selected components!');
      } else {
        arr.map(function (value) {
          return _this2.destroyChild(value);
        });
      }
    }

    /**
     * 获取index
     * @param displayObject
     * @returns {number}
     */

  }, {
    key: "getIndex",
    value: function getIndex(displayObject) {
      return this.children.indexOf(displayObject);
    }

    /**
     * 清空子对象
     */

  }, {
    key: "removeAllChildren",
    value: function removeAllChildren() {
      this.children = [];
    }

    /**
     * 通过name获取子对象
     * @param name
     * @returns {Array.<DisplayObject>}
     */

  }, {
    key: "getChildrenByName",
    value: function getChildrenByName(name) {
      return this.children.filter(function (value) {
        return value.name === name;
      });
    }

    /**
     * 通过id获取子对象
     * @param id
     * @returns {DisplayObject}
     */

  }, {
    key: "getChildById",
    value: function getChildById(id) {
      return this.children.find(function (value) {
        return value.id === id;
      });
    }

    /**
     * 上移一层
     * @param id
     */

  }, {
    key: "uplevel",
    value: function uplevel(id) {
      var index = this.children.indexOf(this.getChildById(id));
      if (index === this.children.length - 1) {
        console.log("It`s always top!!!");
      } else {
        var temp = this.children.splice(index, 1);
        this.children.splice(index + 1, 0, temp[0]);
      }
    }
  }, {
    key: "toplevel",
    value: function toplevel(arr) {
      var _this3 = this;

      var temp = [];
      arr.map(function (value) {
        temp.push({ index: _this3.getIndex(value), value: value });
      });
      temp.sort(function (a, b) {
        return b.index - a.index;
      });
      temp.map(function (value) {
        _this3.removeChild(value.value);
        _this3.addChildAt(_this3.children.length, value.value);
      });
    }

    /**
     * 下移一层
     * @param id
     */

  }, {
    key: "downlevel",
    value: function downlevel(id) {
      var index = this.children.indexOf(this.getChildById(id));
      if (index === 0) {
        console.log("It`s always bottom!!!");
      } else {
        var temp = this.children.splice(index, 1);
        this.children.splice(index - 1, 0, temp[0]);
      }
    }
  }, {
    key: "bottomlevel",
    value: function bottomlevel(arr) {
      var _this4 = this;

      var temp = [];
      arr.map(function (value) {
        temp.push({ index: _this4.getIndex(value), value: value });
      });
      temp.sort(function (a, b) {
        return a.index - b.index;
      });
      temp.map(function (value) {
        _this4.removeChild(value.value);
        _this4.addChildAt(0, value.value);
      });
    }

    /**
     * 在index位置添加子对象
     * @param index
     * @param child
     */

  }, {
    key: "addChildAt",
    value: function addChildAt(index, child) {
      this.children.splice(index, 0, child.isMounted ? child : Object(__WEBPACK_IMPORTED_MODULE_9__utils_dataFunc__["a" /* componentData */])(child, this));
    }

    /**
     * 转换为原始数据
     * @returns {*}
     */

  }, {
    key: "toJson",
    value: function toJson() {
      var temp = [];
      this.children.map(function (value) {
        return temp.push(value.toJson());
      });
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_get___default()(Container.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_2_babel_runtime_core_js_object_get_prototype_of___default()(Container.prototype), "toJson", this).call(this), { children: temp });
    }
  }]);

  return Container;
}(__WEBPACK_IMPORTED_MODULE_8__DisplayObject__["a" /* DisplayObject */]);



/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(22);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(126);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_dataFunc__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__math_arithmetic_SAT__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__math_dataType_TransformStatic__ = __webpack_require__(56);





exports.dataBox = { stageDataTransform: __WEBPACK_IMPORTED_MODULE_0__utils_dataFunc__["b" /* stageDataTransform */], componentData: __WEBPACK_IMPORTED_MODULE_0__utils_dataFunc__["a" /* componentData */], DisplayObject: __WEBPACK_IMPORTED_MODULE_1__core__["c" /* DisplayObject */], Container: __WEBPACK_IMPORTED_MODULE_1__core__["b" /* Container */], Texture: __WEBPACK_IMPORTED_MODULE_1__core__["e" /* Texture */], Stage: __WEBPACK_IMPORTED_MODULE_1__core__["d" /* Stage */], SAT: __WEBPACK_IMPORTED_MODULE_2__math_arithmetic_SAT__["a" /* SAT */], Bounds: __WEBPACK_IMPORTED_MODULE_1__core__["a" /* Bounds */], transform: __WEBPACK_IMPORTED_MODULE_3__math_dataType_TransformStatic__["a" /* TransformStatic */] };

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(71);
module.exports = __webpack_require__(2).Object.assign;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(4);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(73) });


/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(34);
var pIE = __webpack_require__(18);
var toObject = __webpack_require__(21);
var IObject = __webpack_require__(51);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(14)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(8);
var toLength = __webpack_require__(52);
var toAbsoluteIndex = __webpack_require__(75);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(30);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(77), __esModule: true };

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(78);
var $Object = __webpack_require__(2).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(10), 'Object', { defineProperty: __webpack_require__(7).f });


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(80);
module.exports = __webpack_require__(2).Object.getPrototypeOf;


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(21);
var $getPrototypeOf = __webpack_require__(57);

__webpack_require__(58)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(82), __esModule: true };

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
__webpack_require__(41);
module.exports = __webpack_require__(42).f('iterator');


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(30);
var defined = __webpack_require__(29);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(39);
var descriptor = __webpack_require__(16);
var setToStringTag = __webpack_require__(40);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(12)(IteratorPrototype, __webpack_require__(3)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(7);
var anObject = __webpack_require__(9);
var getKeys = __webpack_require__(17);

module.exports = __webpack_require__(10) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(6).document;
module.exports = document && document.documentElement;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(88);
var step = __webpack_require__(89);
var Iterators = __webpack_require__(15);
var toIObject = __webpack_require__(8);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(60)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(91), __esModule: true };

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(92);
__webpack_require__(97);
__webpack_require__(98);
__webpack_require__(99);
module.exports = __webpack_require__(2).Symbol;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(6);
var has = __webpack_require__(11);
var DESCRIPTORS = __webpack_require__(10);
var $export = __webpack_require__(4);
var redefine = __webpack_require__(61);
var META = __webpack_require__(93).KEY;
var $fails = __webpack_require__(14);
var shared = __webpack_require__(32);
var setToStringTag = __webpack_require__(40);
var uid = __webpack_require__(20);
var wks = __webpack_require__(3);
var wksExt = __webpack_require__(42);
var wksDefine = __webpack_require__(43);
var enumKeys = __webpack_require__(94);
var isArray = __webpack_require__(95);
var anObject = __webpack_require__(9);
var isObject = __webpack_require__(13);
var toIObject = __webpack_require__(8);
var toPrimitive = __webpack_require__(27);
var createDesc = __webpack_require__(16);
var _create = __webpack_require__(39);
var gOPNExt = __webpack_require__(96);
var $GOPD = __webpack_require__(44);
var $DP = __webpack_require__(7);
var $keys = __webpack_require__(17);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(62).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(18).f = $propertyIsEnumerable;
  __webpack_require__(34).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(38)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(12)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(20)('meta');
var isObject = __webpack_require__(13);
var has = __webpack_require__(11);
var setDesc = __webpack_require__(7).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(14)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(17);
var gOPS = __webpack_require__(34);
var pIE = __webpack_require__(18);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(28);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(8);
var gOPN = __webpack_require__(62).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 97 */
/***/ (function(module, exports) {



/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43)('asyncIterator');


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(43)('observable');


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(101), __esModule: true };

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(102);
module.exports = __webpack_require__(2).Object.setPrototypeOf;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(4);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(103).set });


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(13);
var anObject = __webpack_require__(9);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(26)(Function.call, __webpack_require__(44).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(106);
var $Object = __webpack_require__(2).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(39) });


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Matrix__ = __webpack_require__(24);




/**
 * Generic class to deal with traditional 2D matrix transforms
 *
 * @class
 */

var TransformBase = function () {
  /**
   *
   */
  function TransformBase() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, TransformBase);

    /**
     * The global matrix transform. It can be swapped temporarily by some functions like getLocalBounds()
     *
     * @member {Matrix}
     */
    this.worldTransform = new __WEBPACK_IMPORTED_MODULE_2__Matrix__["a" /* Matrix */]();

    /**
     * The local matrix transform
     *
     * @member {Matrix}
     */
    this.localTransform = new __WEBPACK_IMPORTED_MODULE_2__Matrix__["a" /* Matrix */]();

    this._worldID = 0;
    this._parentID = 0;
  }

  /**
   * TransformBase does not have decomposition, so this function wont do anything
   */


  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(TransformBase, [{
    key: 'updateLocalTransform',
    value: function updateLocalTransform() {}
    // empty


    /**
     * Updates the values of the object and applies the parent's transform.
     *
     * @param {TransformBase} parentTransform - The transform of the parent of this object
     */

  }, {
    key: 'updateTransform',
    value: function updateTransform(parentTransform) {
      var pt = parentTransform.worldTransform;
      var wt = this.worldTransform;
      var lt = this.localTransform;

      // concat the parent matrix with the objects transform.
      wt.a = lt.a * pt.a + lt.b * pt.c;
      wt.b = lt.a * pt.b + lt.b * pt.d;
      wt.c = lt.c * pt.a + lt.d * pt.c;
      wt.d = lt.c * pt.b + lt.d * pt.d;
      wt.tx = lt.tx * pt.a + lt.ty * pt.c + pt.tx;
      wt.ty = lt.tx * pt.b + lt.ty * pt.d + pt.ty;

      this._worldID++;
    }
  }]);

  return TransformBase;
}();

/**
 * Updates the values of the object and applies the parent's transform.
 * @param  parentTransform {Transform} The transform of the parent of this object
 *
 */


/* harmony default export */ __webpack_exports__["a"] = (TransformBase);
TransformBase.prototype.updateWorldTransform = TransformBase.prototype.updateTransform;

TransformBase.IDENTITY = new TransformBase();

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(110);
module.exports = __webpack_require__(2).Object.entries;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(4);
var $entries = __webpack_require__(111)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

var getKeys = __webpack_require__(17);
var toIObject = __webpack_require__(8);
var isEnum = __webpack_require__(18).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) if (isEnum.call(O, key = keys[i++])) {
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);
__webpack_require__(23);
module.exports = __webpack_require__(113);


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(9);
var get = __webpack_require__(65);
module.exports = __webpack_require__(2).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(115);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(64);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(116), __esModule: true };

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(41);
__webpack_require__(23);
module.exports = __webpack_require__(117);


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(66);
var ITERATOR = __webpack_require__(3)('iterator');
var Iterators = __webpack_require__(15);
module.exports = __webpack_require__(2).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Style; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);




var Style = function () {
  function Style() {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Style);

    this.transform = null;
    this.rectangle = null;
    this.texture = {};
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Style, [{
    key: 'isDigit',
    value: function isDigit(value) {
      var patrn = /^[0-9]*$/;
      value = value.replace('.', '');
      if (patrn.exec(value) === null || value === "") {
        return false;
      } else {
        return true;
      }
    }
  }, {
    key: 'toStyle',
    value: function toStyle(obj) {
      var _ref = [obj.transform, obj.rectangle, obj.texture];
      this.transform = _ref[0];
      this.rectangle = _ref[1];
      this.texture = _ref[2];

      var temp = {};
      temp.left = this.rectangle.x;
      temp.top = this.rectangle.y;
      temp.width = this.rectangle.width;
      temp.height = this.rectangle.height;
      // temp.transform = "matrix(" + this.transform.localTransform.toCssArray() +")";
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(temp, this.texture.style);
      var self = this;
      return new Proxy(temp, {
        get: function get(target, key) {
          return target[key];
        },
        set: function set(target, key, value) {
          if (self.isDigit(value)) {
            self.texture.style[key] = parseFloat(value);
          } else {
            self.texture.style[key] = value;
          }
          return true;
        }
      });
    }
  }, {
    key: 'toTransfrom',
    value: function toTransfrom(obj) {
      var temp = {};
      temp.transform = "matrix(" + obj.transform.localTransform.toCssArray() + ")";
      return temp;
    }
  }, {
    key: 'toJson',
    value: function toJson(obj) {}
  }]);

  return Style;
}();



/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(120), __esModule: true };

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
__webpack_require__(121);
module.exports = __webpack_require__(2).Array.from;


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(26);
var $export = __webpack_require__(4);
var toObject = __webpack_require__(21);
var call = __webpack_require__(122);
var isArrayIter = __webpack_require__(123);
var toLength = __webpack_require__(52);
var createProperty = __webpack_require__(124);
var getIterFn = __webpack_require__(65);

$export($export.S + $export.F * !__webpack_require__(125)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(9);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(15);
var ITERATOR = __webpack_require__(3)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(7);
var createDesc = __webpack_require__(16);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(3)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(127), __esModule: true };

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(128);
var $Object = __webpack_require__(2).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(8);
var $getOwnPropertyDescriptor = __webpack_require__(44).f;

__webpack_require__(58)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 129 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Stage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Container__ = __webpack_require__(67);









var Stage = function (_Container) {
  __WEBPACK_IMPORTED_MODULE_6_babel_runtime_helpers_inherits___default()(Stage, _Container);

  function Stage(obj) {
    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, Stage);

    var _this = __WEBPACK_IMPORTED_MODULE_4_babel_runtime_helpers_possibleConstructorReturn___default()(this, (Stage.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Stage)).call(this, obj));

    _this.modelId = obj.modelId || 0;
    _this.source = {
      id: -1,
      type: 0
    };
    _this.rectangle.set({
      x: 0,
      y: 0,
      width: obj.width === 0 ? 1920 : obj.width,
      height: obj.height === 0 ? 1080 : obj.height
    });
    return _this;
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(Stage, [{
    key: "toJson",
    value: function toJson() {
      var stage = __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({
        width: this.rectangle.width,
        height: this.rectangle.height,
        modelId: this.modelId,
        source: this.source,
        animationList: this.animationManager.toJson(),
        actionList: this.actionManager.toJson()
      }, __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Stage.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Stage.prototype), "toJson", this).call(this));
      return {
        "version": "0.0.1",
        "isEdited": true,
        "pages": [stage]
      };
    }
  }, {
    key: "getComponentById",
    value: function getComponentById(id) {
      if (id === this.id) return this;
      return __WEBPACK_IMPORTED_MODULE_5_babel_runtime_helpers_get___default()(Stage.prototype.__proto__ || __WEBPACK_IMPORTED_MODULE_1_babel_runtime_core_js_object_get_prototype_of___default()(Stage.prototype), "getDescentById", this).call(this, id);
    }
  }]);

  return Stage;
}(__WEBPACK_IMPORTED_MODULE_7__Container__["a" /* Container */]);



/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResourceManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Resource__ = __webpack_require__(131);






var ResourceManager = function () {
  function ResourceManager(obj) {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_classCallCheck___default()(this, ResourceManager);

    this.list = [];
    this.version = obj.version || "";
    this._RA = false;
    obj.list.map(function (value) {
      Object(__WEBPACK_IMPORTED_MODULE_4__Resource__["c" /* setResourceId */])(__WEBPACK_IMPORTED_MODULE_4__Resource__["b" /* resourceId */] < value.id ? value.id : __WEBPACK_IMPORTED_MODULE_4__Resource__["b" /* resourceId */] + 1);
      _this.add(value);
    });
  }

  __WEBPACK_IMPORTED_MODULE_3_babel_runtime_helpers_createClass___default()(ResourceManager, [{
    key: "add",
    value: function add(obj) {
      var temp = this.pack(obj);
      this.list.push(temp);
      return temp;
    }
  }, {
    key: "pack",
    value: function pack(obj) {
      return new __WEBPACK_IMPORTED_MODULE_4__Resource__["a" /* Resource */](obj, this._RA);
    }
  }, {
    key: "getIndex",
    value: function getIndex(obj) {
      return this.list.indexOf(obj);
    }
  }, {
    key: "remove",
    value: function remove(id) {
      this.list.splice(this.getIndex(this.getResourceById(id)), 1);
    }
  }, {
    key: "getResourceById",
    value: function getResourceById(id) {
      return this.list.find(function (value) {
        return value.id === id;
      });
    }
  }, {
    key: "update",
    value: function update(resource) {}
  }, {
    key: "changeStatus",
    value: function changeStatus(isEditing) {
      this._RA = isEditing;
      this.list.map(function (value) {
        value._RA = isEditing;
      });
    }
  }, {
    key: "toJson",
    value: function toJson() {
      var arr = [];
      this.list.map(function (value) {
        arr = [].concat(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_toConsumableArray___default()(arr), [value.toJson()]);
      });
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, { version: this.version, list: arr });
    }
  }]);

  return ResourceManager;
}();



/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Resource; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return resourceId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return setResourceId; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);



var resourceId = 0;
function setResourceId(value) {
  resourceId = value;
}
function getResouceId() {
  return resourceId++;
}

var Resource = function () {
  function Resource(obj, bool) {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, Resource);

    this.id = obj.id === undefined ? getResouceId() : obj.id;
    this.ext = obj.ext;
    this.name = obj.name;
    this.host = obj.host;
    this.src = obj.src;
    this._RA = bool;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(Resource, [{
    key: 'getAbsolutePath',
    value: function getAbsolutePath() {
      return this._RA ? this.host + this.src.substr(1) : '.' + this.src;
    }
  }, {
    key: 'toJson',
    value: function toJson() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, { id: this.id, ext: this.ext, name: this.name, host: this.host, src: this.src });
    }
  }, {
    key: 'change',
    value: function change(obj) {
      __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()(this, { ext: obj.ext, name: obj.name, host: obj.host, src: obj.src });
    }
  }]);

  return Resource;
}();



/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Animation__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PlayList__ = __webpack_require__(135);






var AnimationManager = function () {
    function AnimationManager() {
        var _this = this;

        var animations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, AnimationManager);

        this.animationList = [];
        animations.map(function (value) {
            _this.add(value);
        });
        this._playList = new __WEBPACK_IMPORTED_MODULE_4__PlayList__["a" /* PlayList */]();
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(AnimationManager, [{
        key: "add",
        value: function add(obj) {
            var temp = this.pack(obj);
            this.animationList.push(temp);
            return temp;
        }
    }, {
        key: "getPlayList",
        value: function getPlayList(obj) {
            var actions = this.getAnimation(obj);
            if (actions !== null) {
                this._playList.update(actions);
                return this._playList;
            } else {
                return false;
            }
        }
    }, {
        key: "pack",
        value: function pack(obj) {
            return new __WEBPACK_IMPORTED_MODULE_3__Animation__["a" /* Animation */](obj);
        }
    }, {
        key: "getAnimationBySourceId",
        value: function getAnimationBySourceId(arr, id) {
            return arr.filter(function (value) {
                return value.sourceId === id;
            });
        }
    }, {
        key: "getAnimationByEventType",
        value: function getAnimationByEventType(arr, type) {
            return arr.filter(function (value) {
                return value.eventType === type;
            });
        }
    }, {
        key: "remove",
        value: function remove(obj) {
            var _this2 = this;

            this.animationList.map(function (value) {
                if (value.equal(obj)) {
                    _this2._delete(value);
                }
            });
        }
    }, {
        key: "getIndex",
        value: function getIndex(animationUnit) {
            return this.animationList.indexOf(animationUnit);
        }
    }, {
        key: "_delete",
        value: function _delete(animationUnit) {
            this.animationList.splice(this.getIndex(animationUnit), 1);
        }
    }, {
        key: "getAnimation",
        value: function getAnimation(_ref) {
            var sourceId = _ref.sourceId,
                eventType = _ref.eventType;

            var temp = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(this.animationList));
            temp = this.getAnimationBySourceId(temp, sourceId);
            temp = this.getAnimationByEventType(temp, eventType);
            return temp;
        }
    }, {
        key: "toJson",
        value: function toJson() {
            var temp = [];
            this.animationList.map(function (value) {
                temp.push(value.toJson());
            });
            return temp;
        }
    }]);

    return AnimationManager;
}();



/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Animation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__AnimationUnit__ = __webpack_require__(134);




var Animation = function () {
  function Animation(_ref) {
    var sourceId = _ref.sourceId,
        eventType = _ref.eventType,
        animations = _ref.animations;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Animation);

    this.sourceId = sourceId;
    this.eventType = eventType;
    this.animations = this.animationPack(animations);
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Animation, [{
    key: "animationPack",
    value: function animationPack(arr) {
      var temp = [];
      arr.map(function (value) {
        temp.push(new __WEBPACK_IMPORTED_MODULE_2__AnimationUnit__["a" /* AnimationUnit */](value));
      });
      return temp;
    }
  }, {
    key: "pack",
    value: function pack(obj) {
      return new __WEBPACK_IMPORTED_MODULE_2__AnimationUnit__["a" /* AnimationUnit */](obj);
    }
  }, {
    key: "add",
    value: function add(obj) {
      var temp = this.pack(obj);
      this.animations.push(temp);
      return temp;
    }
  }, {
    key: "equal",
    value: function equal(obj) {
      return this.sourceId === obj.sourceId && this.eventType === obj.eventType;
    }
  }, {
    key: "remove",
    value: function remove(obj) {
      this._delete(obj);
    }
  }, {
    key: "_delete",
    value: function _delete(obj) {
      var _this = this;

      this.animations.map(function (value) {
        if (value.equal(obj)) {
          _this.animations.splice(_this.animations.indexOf(value), 1);
        }
      });
    }
  }, {
    key: "toJson",
    value: function toJson() {
      var temp = [];
      this.animations.map(function (value) {
        temp.push(value.toJson());
      });
      return {
        sourceId: this.sourceId,
        eventType: this.eventType,
        animations: temp
      };
    }
  }]);

  return Animation;
}();



/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AnimationUnit; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);




var AnimationUnit = function () {
  function AnimationUnit(_ref) {
    var targetId = _ref.targetId,
        animationType = _ref.animationType,
        _ref$delayTime = _ref.delayTime,
        delayTime = _ref$delayTime === undefined ? null : _ref$delayTime,
        _ref$runTime = _ref.runTime,
        runTime = _ref$runTime === undefined ? null : _ref$runTime,
        _ref$animationName = _ref.animationName,
        animationName = _ref$animationName === undefined ? null : _ref$animationName,
        _ref$name = _ref.name,
        name = _ref$name === undefined ? null : _ref$name;

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, AnimationUnit);

    this.targetId = targetId;
    this.animationType = animationType;
    this.delayTime = delayTime;
    this.runTime = runTime;
    this.animationName = animationName;
    this.name = name;
  }

  __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(AnimationUnit, [{
    key: "change",
    value: function change(_ref2) {
      var targetId = _ref2.targetId,
          animationType = _ref2.animationType,
          delayTime = _ref2.delayTime,
          runTime = _ref2.runTime,
          animationName = _ref2.animationName,
          name = _ref2.name;

      this.targetId = targetId || this.targetId;
      this.animationType = animationType || this.animationType;
      this.delayTime = delayTime || this.delayTime;
      this.runTime = runTime || this.runTime;
      this.animationName = animationName || this.animationName;
      this.name = name || this.name;
    }
  }, {
    key: "equal",
    value: function equal(obj) {
      return obj.targetId === this.targetId && obj.animationType === this.animationType && obj.delayTime === this.delayTime && obj.runTime === this.runTime && obj.animationName === this.animationName;
    }
  }, {
    key: "toJson",
    value: function toJson() {
      return __WEBPACK_IMPORTED_MODULE_0_babel_runtime_core_js_object_assign___default()({}, {
        targetId: this.targetId,
        animationType: this.animationType,
        delayTime: this.delayTime,
        runTime: this.runTime,
        animationName: this.animationName
      });
    }
  }]);

  return AnimationUnit;
}();



/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlayList; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);



var PlayList = function () {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(PlayList, [{
        key: "playlist",
        get: function get() {
            return this._playlist;
        },
        set: function set(value) {
            this._playlist = value;
        }
    }]);

    function PlayList() {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, PlayList);

        this._playlist = [];
        this._index = 0;
        this._length = 0;
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(PlayList, [{
        key: "update",
        value: function update(obj) {
            this._playlist = obj;
            this._length = obj.length;
        }
    }, {
        key: "changeList",
        value: function changeList(arr) {
            this._playlist = null;
            this._playlist = arr;
        }
    }, {
        key: "upward",
        value: function upward(obj) {
            var index = this._playlist.indexOf(obj);
            if (index >= 0 && index < this._playlist.length - 1) {
                var temp = this._playlist.splice(index, 1);
                this._playlist.splice(index - 1, 0, temp[0]);
            } else {
                console.log("Already first index!!!");
            }
        }
    }, {
        key: "downward",
        value: function downward(obj) {
            var index = this._playlist.indexOf(obj);
            if (index >= 0 && index < this._playlist.length - 1) {
                var temp = this._playlist.splice(index, 1);
                this._playlist.splice(index + 1, 0, temp[0]);
            } else {
                console.log("Already last index!!!");
            }
        }
    }, {
        key: "play",
        value: function play() {
            if (this._index < this._length) {
                var temp = this._index;
                this._index++;
                return this._playlist[temp];
            } else {
                this._index = 0;
                return this._playlist[this._index];
            }
        }
    }, {
        key: "playBack",
        value: function playBack() {
            if (this._index > 0) {
                var temp = this._index;
                this._index--;
                return this._playlist[temp];
            } else {
                this._index = this._length;
                return this._playlist[this._index];
            }
        }
    }, {
        key: "autoPlay",
        value: function autoPlay() {
            var runTime = this.play();
        }
    }, {
        key: "_nextTick",
        value: function _nextTick() {}
    }]);

    return PlayList;
}();



/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionManager; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ActionItem__ = __webpack_require__(137);





var ActionManager = function () {
    function ActionManager() {
        var _this = this;

        var actionList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

        __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_classCallCheck___default()(this, ActionManager);

        this.actionList = [];
        actionList.map(function (value) {
            _this.add(value);
        });
    }

    __WEBPACK_IMPORTED_MODULE_2_babel_runtime_helpers_createClass___default()(ActionManager, [{
        key: "pack",
        value: function pack(obj) {
            return new __WEBPACK_IMPORTED_MODULE_3__ActionItem__["a" /* ActionItem */](obj);
        }
    }, {
        key: "add",
        value: function add(obj) {
            var temp = this.pack(obj);
            this.actionList.push(temp);
            return temp;
        }
    }, {
        key: "remove",
        value: function remove(obj) {
            var _this2 = this;

            this.actionList.map(function (value) {
                if (value.equal(obj)) {
                    _this2._delete(value);
                }
            });
        }
    }, {
        key: "getIndex",
        value: function getIndex(actionUnit) {
            return this.actionList.indexOf(actionUnit);
        }
    }, {
        key: "_delete",
        value: function _delete(actionUnit) {
            this.actionList.splice(this.getIndex(actionUnit), 1);
        }
    }, {
        key: "removeAllChildren",
        value: function removeAllChildren() {
            this.actionList = [];
        }
    }, {
        key: "getActionBySourceId",
        value: function getActionBySourceId(arr, id) {
            return arr.filter(function (value) {
                return value.sourceId === id;
            });
        }
    }, {
        key: "getActionByEventType",
        value: function getActionByEventType(arr, type) {
            return arr.filter(function (value) {
                return value.eventType === type;
            });
        }
    }, {
        key: "getAction",
        value: function getAction(_ref) {
            var sourceId = _ref.sourceId,
                eventType = _ref.eventType;

            var temp = [].concat(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_toConsumableArray___default()(this.actionList));
            temp = this.getActionBySourceId(temp, sourceId);
            temp = this.getActionByEventType(temp, eventType);
            return temp;
        }
    }, {
        key: "toJson",
        value: function toJson() {
            var temp = [];
            this.actionList.map(function (value) {
                temp.push(value.toJson());
            });
            return temp;
        }
    }]);

    return ActionManager;
}();



/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionItem; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Action__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__math_dataType_ObservablePoint__ = __webpack_require__(36);





var ActionItem = function () {
  function ActionItem(_ref) {
    var _this = this;

    var sourceId = _ref.sourceId,
        eventType = _ref.eventType,
        _ref$actions = _ref.actions,
        actions = _ref$actions === undefined ? [] : _ref$actions;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, ActionItem);

    this.sourceId = sourceId;
    this.eventType = eventType;
    this.actions = [];
    actions.map(function (value) {
      _this.add(value);
    });
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(ActionItem, [{
    key: "pack",
    value: function pack(obj) {
      return new __WEBPACK_IMPORTED_MODULE_2__Action__["a" /* Action */](obj);
    }
  }, {
    key: "add",
    value: function add(obj) {
      var temp = this.pack(obj);
      this.actions.push(temp);
      return temp;
    }
  }, {
    key: "equal",
    value: function equal(obj) {
      return this.sourceId === obj.sourceId && this.eventType === obj.eventType;
    }
  }, {
    key: "remove",
    value: function remove(obj) {
      this._delete(obj);
    }
  }, {
    key: "_delete",
    value: function _delete(obj) {
      var _this2 = this;

      this.actions.map(function (value) {
        if (value.equal(obj)) {
          _this2.actions.splice(_this2.actions.indexOf(value), 1);
        }
      });
    }
  }, {
    key: "toJson",
    value: function toJson() {
      var temp = [];
      this.actions.map(function (value) {
        temp.push(value.toJson());
      });
      return {
        sourceId: this.sourceId,
        eventType: this.eventType,
        actions: temp
      };
    }
  }]);

  return ActionItem;
}();



/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Action; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);



var Action = function () {
  function Action(_ref) {
    var targetId = _ref.targetId,
        actionType = _ref.actionType,
        actionProps = _ref.actionProps;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Action);

    var _ref2 = [targetId, actionType, actionProps];
    this.targetId = _ref2[0];
    this.actionType = _ref2[1];
    this.actionProps = _ref2[2];
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Action, [{
    key: "equal",
    value: function equal(obj) {
      return this.targetId === obj.targetId && this.actionType === obj.actionType && this.actionProps === obj.actionProps;
    }
  }, {
    key: "toJson",
    value: function toJson() {
      return {
        targetId: this.targetId,
        actionType: this.actionType,
        actionProps: this.actionProps
      };
    }
  }]);

  return Action;
}();



/***/ }),
/* 139 */
/***/ (function(module, exports) {

module.exports = {"commonStyle":{"opacity":1,"borderStyle":"none","borderColor":"rgba(0, 0, 0, 0)","borderWidth":0,"borderRadius":0,"backgroundColor":"rgba(0, 0, 0, 0)","backgroundSize":"cover","backgroundImage":""},"defaultStyle":[{"textDecoration":"none","fontWeight":"normal","fontStyle":"normal","textAlign":"center","lineHeight":200,"fontSize":36,"fontFamily":"SimSun","color":"rgba(0, 0, 0, 1)"},{},{},{}]}

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SAT; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shape_Vector__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shape_Point__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shape_Circle__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shape_Polygon__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shape_Rectangle__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__dataType_Matrix__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shape_Line__ = __webpack_require__(144);


/**
 * Author se7en.
 */
/**
 * 非规则多边形碰撞算法SAT
 */








var SAT = function () {
  function SAT() {
    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, SAT);

    this.point = __WEBPACK_IMPORTED_MODULE_3__shape_Point__["a" /* Point */];
    this.vector = __WEBPACK_IMPORTED_MODULE_2__shape_Vector__["a" /* Vector */];
    this.circle = __WEBPACK_IMPORTED_MODULE_4__shape_Circle__["a" /* Circle */];
    this.polygon = __WEBPACK_IMPORTED_MODULE_5__shape_Polygon__["a" /* Polygon */];
    this.rectangle = __WEBPACK_IMPORTED_MODULE_6__shape_Rectangle__["a" /* Rectangle */];
    this.matrix = __WEBPACK_IMPORTED_MODULE_7__dataType_Matrix__["a" /* Matrix */];
    this.line = __WEBPACK_IMPORTED_MODULE_8__shape_Line__["a" /* Line */];
  }

  /**
   *
   * @param obj1
   * @param obj2
   * @returns {boolean}
   */


  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(SAT, [{
    key: "sat",
    value: function sat(obj1, obj2) {
      var szaxis = [];
      if (obj1.name === "polygon") {
        szaxis = this.getUniqueAxis(obj1.points, szaxis);
      }
      if (obj2.name === "polygon") {
        szaxis = this.getUniqueAxis(obj2.points, szaxis);
      }
      if (obj1.name === "circle" && obj2.name === "circle") {
        szaxis = [new this.vector(obj2.x - obj1.x, obj2.y - obj1.y).getUnit()];
      }
      var i = void 0;
      var extreme1 = void 0,
          extreme2 = void 0;
      for (i = 0; i < szaxis.length; i++) {
        switch (obj1.name) {
          case "point":
            extreme1 = this.getPointProjection(obj1, szaxis[i]);
            break;
          case "circle":
            extreme1 = this.getCircleProjection(obj1, szaxis[i]);
            break;
          case "polygon":
            extreme1 = this.getProjection(obj1, szaxis[i]);
        }
        switch (obj2.name) {
          case "point":
            extreme2 = this.getPointProjection(obj2, szaxis[i]);
            break;
          case "circle":
            extreme2 = this.getCircleProjection(obj2, szaxis[i]);
            break;
          case "polygon":
            extreme2 = this.getProjection(obj2, szaxis[i]);
        }
        if (!this.overlop(extreme1, extreme2)) return false;
      }
      return true;
    }
  }, {
    key: "getUniqueAxis",
    value: function getUniqueAxis(points) {
      var curaxis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var i = void 0,
          j = 0;
      var b = false;
      var nor = new __WEBPACK_IMPORTED_MODULE_2__shape_Vector__["a" /* Vector */](0, 0);
      var segment = new this.vector(0, 0);
      for (i = 0; i < points.length; i++) {
        if (i >= points.length - 1) {
          segment.x = points[0].x - points[i].x;
          segment.y = points[0].y - points[i].y;
        } else {
          segment.x = points[i + 1].x - points[i].x;
          segment.y = points[i + 1].y - points[i].y;
        }
        nor = segment.getUnit().getNormal();
        if (nor.x <= 0) {
          if (nor.x === 0) {
            if (nor.y < 0) nor.y *= -1;
          } else {
            nor.x *= -1;
            nor.y *= -1;
          }
        }
        b = true;
        //这里边数比较多可能会有些消耗，可以修改为二分法查找，这里只为演示功能，简单处理
        for (j = 0; j < curaxis.length; j++) {
          if (curaxis[j].x !== nor.x) continue;
          if (curaxis[j].y !== nor.y) continue;
          b = false;
          break;
        }
        if (!b) continue;
        curaxis.push(nor);
      }
      return curaxis;
    }

    /**
     * 获得点在轴的投影最大、最小值
     * @param points
     * @param axis
     * @returns {{min: number, max: number}}
     */

  }, {
    key: "getProjection",
    value: function getProjection(obj, axis) {
      var _this = this;

      var points = obj.points;
      var projection = { min: 0, max: 0 };
      var n = void 0,
          min = void 0,
          max = 0;
      min = new __WEBPACK_IMPORTED_MODULE_2__shape_Vector__["a" /* Vector */](points[0].x, points[0].y).dot(axis);
      max = min;
      points.map(function (point) {
        n = new _this.vector(point.x, point.y).dot(axis);
        if (n < min) min = n;
        if (n > max) max = n;
      });
      projection.min = min;
      projection.max = max;
      return projection;
    }

    /**
     * 获得圆在轴的投影最大、最小值
     * @param circle
     * @param axis
     * @returns {{min: number, max: number}}
     */

  }, {
    key: "getCircleProjection",
    value: function getCircleProjection(circle, axis) {
      var centerProjection = new this.vector(circle.x, circle.y).dot(axis);
      return {
        min: centerProjection - circle.r,
        max: centerProjection + circle.r
      };
    }

    /**
     * 获得点在投影轴上的值
     * @param point
     * @param axis
     * @returns {number}
     */

  }, {
    key: "getPointProjection",
    value: function getPointProjection(point, axis) {
      return new this.vector(point.x, point.y).dot(axis);
    }

    /**
     * 判断是否
     * @param poly1
     * @param poly2
     * @returns {boolean}
     */

  }, {
    key: "overlop",
    value: function overlop(poly1, poly2) {
      if (poly1.min > poly2.max) return false;
      if (poly1.max < poly2.min) return false;
      if ((poly1.min - poly2.min) * (poly1.max - poly2.max) < 0) return true;
      return true;
    }
  }]);

  return SAT;
}();



/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Vector; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);



/**
 * Author se7en.
 */
/**
 *
 * 向量类
 */
var Vector = function () {
  function Vector() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Vector);

    this.x = x;
    this.y = y;
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Vector, [{
    key: "set",
    value: function set() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      this.x = x;
      this.y = y;
    }

    /**
     * 返回法向量
     * @returns {Vector}
     */

  }, {
    key: "getNormal",
    value: function getNormal() {
      return new Vector(this.y, -this.x);
    }

    /**
     * 向量点乘
     * @param vector:{Vector}
     * @returns {number}
     */

  }, {
    key: "dot",
    value: function dot(vector) {
      return this.x * vector.x + this.y * vector.y;
    }

    /**
     * 返回向量的模
     * @returns {number}
     */

  }, {
    key: "getNorm",
    value: function getNorm() {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    /**
     * 返回单位向量
     * @returns {Vector}
     */

  }, {
    key: "getUnit",
    value: function getUnit() {
      return new Vector(this.x / this.getNorm(), this.y / this.getNorm());
    }

    /**
     * 返回向量旋转角度
     * @param vector
     * @returns {number}
     */

  }, {
    key: "angleWith",
    value: function angleWith(vector) {
      return Math.acos(this.dot(vector) / (this.getNorm() * vector.getNorm()));
    }
  }]);

  return Vector;
}();



/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Circle; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);


/**
 * Author se7en.
 */
var Circle = function Circle() {
    var point = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { x: 0, y: 0 };
    var r = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Circle);

    this.x = point.x;
    this.y = point.y;
    this.r = r;
    this.name = "circle";
};



/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Polygon; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Point__ = __webpack_require__(19);


/**
 * Author se7en.
 */


var Polygon = function () {
  function Polygon() {
    var points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Polygon);

    this.name = "polygon";
    this.isConcave = false;
    this.points = points.map(function (value, key) {
      points[key] = new __WEBPACK_IMPORTED_MODULE_2__Point__["a" /* Point */](value[0], value[1]);
    });
  }

  __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Polygon, [{
    key: "convexfy",
    value: function convexfy() {
      var temp = [];
      return temp;
    }

    // getNextConcaveIndex(p,starindex = 0) {
    //   if(p.length <= 3) return -1;
    //   let curdir = 0;
    //   let nextpos = 0;
    //   let nmax = p.length + starindex;
    //   for(let i = starindex;i < nmax;i++) {
    //     curdir = getMutiPtClockDir(p[(i + p.length) % p.length],p[(i - 1 + p.length) % p.length],p[(i + 1 + p.length) % p.length]);
    //     if(curdir == POLYDIR.ANTICLOCKWISE) return i % p.length;
    //   }
    //   return -1;
    // }

  }]);

  return Polygon;
}();



/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Line; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Point__ = __webpack_require__(19);




var Line = function () {
    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Line, [{
        key: "c",
        get: function get() {
            return this._c;
        },
        set: function set(value) {
            this._c = value;
        }

        /**
         * Ax+By+C=0
         */

    }]);

    function Line() {
        __WEBPACK_IMPORTED_MODULE_0_babel_runtime_helpers_classCallCheck___default()(this, Line);

        this._a = 0;
        this._b = 0;
        this._c = 0;
        this._x = 0;
        this._y = 0;
    }

    __WEBPACK_IMPORTED_MODULE_1_babel_runtime_helpers_createClass___default()(Line, [{
        key: "getIntersection",
        value: function getIntersection(line) {
            if (this.a * line.b - this.b * line.a !== 0) {
                var intersect = new __WEBPACK_IMPORTED_MODULE_2__Point__["a" /* Point */]();
                intersect.x = (line.b * this.c - this.b * line.c) / ((this.b * line.a - line.b * this.a) * (this.b * line.a - line.b * this.a));
                this.x = intersect.x;
                intersect.y = this.y;
                return intersect;
            } else {
                return null;
            }
        }
    }, {
        key: "setFromPoints",
        value: function setFromPoints(arr) {
            if (arr.length <= 0) {
                arr = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
            } else if (arr.length === 1) {
                arr.push({ x: 0, y: 0 });
            }
            this._fromTwoPoints(arr);
        }
    }, {
        key: "_fromTwoPoints",
        value: function _fromTwoPoints(arr) {
            this.a = arr[1].y - arr[0].y;
            this.b = arr[0].x - arr[1].x;
            this.c = arr[1].x * arr[0].y - arr[1].y * arr[0].x;
        }
    }, {
        key: "x",
        get: function get() {
            if (this.a === 0) return Infinity;
            return -(this.b * this._y + this.c) / this.a;
        },
        set: function set(value) {
            this._x = value;
        }
    }, {
        key: "y",
        get: function get() {
            if (this.b === 0) return Infinity;
            return -(this.a * this.x + this.c) / this.b;
        },
        set: function set(value) {
            this._y = value;
        }
    }, {
        key: "k",
        get: function get() {
            return this.a;
        },
        set: function set(value) {
            this._key = value;
        }
    }, {
        key: "a",
        get: function get() {
            return this._a;
        },
        set: function set(value) {
            this._a = value;
        }
    }, {
        key: "b",
        get: function get() {
            return this._b;
        },
        set: function set(value) {
            this._b = value;
        }
    }]);

    return Line;
}();



/***/ })
/******/ ]);
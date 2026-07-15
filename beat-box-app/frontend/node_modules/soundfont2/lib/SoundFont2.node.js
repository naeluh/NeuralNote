module.exports =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/chunk.ts":
/*!**********************!*\
  !*** ./src/chunk.ts ***!
  \**********************/
/*! exports provided: SF2Chunk */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SF2Chunk", function() { return SF2Chunk; });
/* harmony import */ var _riff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./riff */ "./src/riff/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony import */ var _chunks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./chunks */ "./src/chunks/index.ts");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var SF2Chunk =
/*#__PURE__*/
function (_RIFFChunk) {
  _inherits(SF2Chunk, _RIFFChunk);

  /**
   * All sub-chunks of this `SF2Chunk` as `SF2Chunk`.
   */
  function SF2Chunk(chunk) {
    var _this;

    _classCallCheck(this, SF2Chunk);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(SF2Chunk).call(this, chunk.id, chunk.length, chunk.buffer, chunk.subChunks));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "subChunks", void 0);

    _this.subChunks = chunk.subChunks.map(function (subChunk) {
      return new SF2Chunk(subChunk);
    });
    return _this;
  }
  /**
   * Get meta data from the chunk. This assumes the chunk is a LIST chunk, containing INFO
   * sub-chunks.
   */


  _createClass(SF2Chunk, [{
    key: "getMetaData",
    value: function getMetaData() {
      if (this.id !== 'LIST') {
        throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]('Unexpected chunk ID', "'LIST'", "'".concat(this.id, "'"));
      }

      var info = this.subChunks.reduce(function (target, chunk) {
        if (chunk.id === 'ifil' || chunk.id === 'iver') {
          // ifil and iver length must be 4 bytes
          if (chunk.length !== _constants__WEBPACK_IMPORTED_MODULE_1__["SF_VERSION_LENGTH"]) {
            throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]("Invalid size for the '".concat(chunk.id, "' sub-chunk"));
          }

          target[chunk.id] = "".concat(chunk.getInt16(), ".").concat(chunk.getInt16(2));
        } else {
          target[chunk.id] = chunk.getString();
        }

        return target;
      }, {});

      if (!info.ifil) {
        throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]("Missing required 'ifil' sub-chunk");
      }

      if (!info.INAM) {
        throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]("Missing required 'INAM' sub-chunk");
      }

      return {
        version: info.ifil,
        soundEngine: info.isng || 'EMU8000',
        name: info.INAM,
        rom: info.irom,
        romVersion: info.iver,
        creationDate: info.ICRD,
        author: info.IENG,
        product: info.IPRD,
        copyright: info.ICOP,
        comments: info.ICMT,
        createdBy: info.ISFT
      };
    }
    /**
     * Get the sample data as a unsigned 8-bit buffer from the chunk. This assumes the chunk is a
     * LIST chunk containing a smpl sub-chunk.
     */

  }, {
    key: "getSampleData",
    value: function getSampleData() {
      if (this.id !== 'LIST') {
        throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]('Unexpected chunk ID', "'LIST'", "'".concat(this.id, "'"));
      }

      var sampleChunk = this.subChunks[0];

      if (sampleChunk.id !== 'smpl') {
        throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]('Invalid chunk signature', "'smpl'", "'".concat(sampleChunk.id, "'"));
      }

      return sampleChunk.buffer;
    }
    /**
     * Get the preset data from the chunk. This assumes the chunk is a LIST chunk containing the
     * preset data sub-chunks.
     */

  }, {
    key: "getPresetData",
    value: function getPresetData() {
      if (this.id !== 'LIST') {
        throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]('Unexpected chunk ID', "'LIST'", "'".concat(this.id, "'"));
      }

      return {
        presetHeaders: Object(_chunks__WEBPACK_IMPORTED_MODULE_2__["getPresetHeaders"])(this.subChunks[0]),
        presetZones: Object(_chunks__WEBPACK_IMPORTED_MODULE_2__["getZones"])(this.subChunks[1], 'pbag'),
        presetModulators: Object(_chunks__WEBPACK_IMPORTED_MODULE_2__["getModulators"])(this.subChunks[2], 'pmod'),
        presetGenerators: Object(_chunks__WEBPACK_IMPORTED_MODULE_2__["getGenerators"])(this.subChunks[3], 'pgen'),
        instrumentHeaders: Object(_chunks__WEBPACK_IMPORTED_MODULE_2__["getInstrumentHeaders"])(this.subChunks[4]),
        instrumentZones: Object(_chunks__WEBPACK_IMPORTED_MODULE_2__["getZones"])(this.subChunks[5], 'ibag'),
        instrumentModulators: Object(_chunks__WEBPACK_IMPORTED_MODULE_2__["getModulators"])(this.subChunks[6], 'imod'),
        instrumentGenerators: Object(_chunks__WEBPACK_IMPORTED_MODULE_2__["getGenerators"])(this.subChunks[7], 'igen'),
        sampleHeaders: Object(_chunks__WEBPACK_IMPORTED_MODULE_2__["getSampleHeaders"])(this.subChunks[8])
      };
    }
  }]);

  return SF2Chunk;
}(_riff__WEBPACK_IMPORTED_MODULE_0__["RIFFChunk"]);

/***/ }),

/***/ "./src/chunks/generators.ts":
/*!**********************************!*\
  !*** ./src/chunks/generators.ts ***!
  \**********************************/
/*! exports provided: getGenerators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGenerators", function() { return getGenerators; });
/* harmony import */ var _riff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/riff */ "./src/riff/index.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/types */ "./src/types/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/constants */ "./src/constants.ts");



/**
 * An array of GeneratorTypes that cannot be specified for presets. If one of these generator types
 * is found, the generator should be ignored.
 */

var PRESET_TYPES_BLACKLIST = [_types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].StartAddrsOffset, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].EndAddrsOffset, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].StartLoopAddrsOffset, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].EndLoopAddrsOffset, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].StartAddrsCoarseOffset, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].EndAddrsCoarseOffset, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].StartLoopAddrsCoarseOffset, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].KeyNum, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].Velocity, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].EndLoopAddrsCoarseOffset, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].SampleModes, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].ExclusiveClass, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].OverridingRootKey];
/**
 * An array of GeneratorTypes that cannot be specified for instruments. If one of these generator
 * types is found, the generator should be ignored.
 */

var INSTRUMENT_TYPES_BLACKLIST = [_types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].Unused1, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].Unused2, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].Unused3, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].Unused4, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].Reserved1, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].Reserved2, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].Reserved3];
/**
 * These GeneratorTypes specify a range of key numbers or velocity.
 */

var RANGE_TYPES = [_types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].KeyRange, _types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"].VelRange];
/**
 * Get all generators for either an preset generator chunk or a instrument generator chunk.
 *
 * TODO: Check if generator chunk is valid, by following the rules defined in the spec. See for
 * example: https://github.com/FluidSynth/fluidsynth/blob/v2.0.3/src/sfloader/fluid_sffile.c
 *
 * @param {SF2Chunk} chunk - The input chunk
 * @param {string} type - The type, can be 'pgen' or 'igen'
 */

var getGenerators = function getGenerators(chunk, type) {
  if (chunk.id !== type) {
    throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]('Unexpected chunk ID', "'".concat(type, "'"), "'".concat(chunk.id, "'"));
  }

  if (chunk.length % _constants__WEBPACK_IMPORTED_MODULE_2__["SF_GENERATOR_SIZE"]) {
    throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]("Invalid size for the '".concat(type, "' sub-chunk"));
  }

  return chunk.iterate(function (iterator) {
    var id = iterator.getInt16(); // Ignore invalid IDs

    if (!_types__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"][id]) {
      return null;
    }

    if (type === 'pgen' && PRESET_TYPES_BLACKLIST.includes(id)) {
      return null;
    }

    if (type === 'igen' && INSTRUMENT_TYPES_BLACKLIST.includes(id)) {
      return null;
    }

    if (RANGE_TYPES.includes(id)) {
      return {
        id: id,
        range: {
          lo: iterator.getByte(),
          hi: iterator.getByte()
        }
      };
    }

    return {
      id: id,
      value: iterator.getInt16BE()
    };
  });
};

/***/ }),

/***/ "./src/chunks/index.ts":
/*!*****************************!*\
  !*** ./src/chunks/index.ts ***!
  \*****************************/
/*! exports provided: getInstrumentHeaders, getPresetHeaders, getSampleHeaders, getGenerators, getModulators, getZones, getItemsInZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _instruments__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instruments */ "./src/chunks/instruments/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getInstrumentHeaders", function() { return _instruments__WEBPACK_IMPORTED_MODULE_0__["getInstrumentHeaders"]; });

/* harmony import */ var _presets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./presets */ "./src/chunks/presets/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPresetHeaders", function() { return _presets__WEBPACK_IMPORTED_MODULE_1__["getPresetHeaders"]; });

/* harmony import */ var _samples__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./samples */ "./src/chunks/samples/index.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSampleHeaders", function() { return _samples__WEBPACK_IMPORTED_MODULE_2__["getSampleHeaders"]; });

/* harmony import */ var _generators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./generators */ "./src/chunks/generators.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getGenerators", function() { return _generators__WEBPACK_IMPORTED_MODULE_3__["getGenerators"]; });

/* harmony import */ var _modulators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modulators */ "./src/chunks/modulators.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getModulators", function() { return _modulators__WEBPACK_IMPORTED_MODULE_4__["getModulators"]; });

/* harmony import */ var _zones__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./zones */ "./src/chunks/zones.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getZones", function() { return _zones__WEBPACK_IMPORTED_MODULE_5__["getZones"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getItemsInZone", function() { return _zones__WEBPACK_IMPORTED_MODULE_5__["getItemsInZone"]; });








/***/ }),

/***/ "./src/chunks/instruments/headers.ts":
/*!*******************************************!*\
  !*** ./src/chunks/instruments/headers.ts ***!
  \*******************************************/
/*! exports provided: getInstrumentHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInstrumentHeaders", function() { return getInstrumentHeaders; });
/* harmony import */ var _riff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/riff */ "./src/riff/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/constants */ "./src/constants.ts");



/**
 * Get all instrument headers from a `inst` sub-chunk.
 *
 * @param {SF2Chunk} chunk - The input chunk
 */
var getInstrumentHeaders = function getInstrumentHeaders(chunk) {
  if (chunk.id !== 'inst') {
    throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]('Unexpected chunk ID', "'inst'", "'".concat(chunk.id, "'"));
  }

  if (chunk.length % _constants__WEBPACK_IMPORTED_MODULE_1__["SF_INSTRUMENT_HEADER_SIZE"]) {
    throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]("Invalid size for the 'inst' sub-chunk");
  }

  return chunk.iterate(function (iterator) {
    return {
      name: iterator.getString(),
      bagIndex: iterator.getInt16()
    };
  });
};

/***/ }),

/***/ "./src/chunks/instruments/index.ts":
/*!*****************************************!*\
  !*** ./src/chunks/instruments/index.ts ***!
  \*****************************************/
/*! exports provided: getInstrumentHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./headers */ "./src/chunks/instruments/headers.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getInstrumentHeaders", function() { return _headers__WEBPACK_IMPORTED_MODULE_0__["getInstrumentHeaders"]; });



/***/ }),

/***/ "./src/chunks/modulators.ts":
/*!**********************************!*\
  !*** ./src/chunks/modulators.ts ***!
  \**********************************/
/*! exports provided: getModulators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getModulators", function() { return getModulators; });
/* harmony import */ var _riff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/riff */ "./src/riff/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/constants */ "./src/constants.ts");


/**
 * Get the modulator enumerator value from a 16-bit integer.
 *
 * @param {number} value - The 16-bit integer
 */

var getModulatorValue = function getModulatorValue(value) {
  return {
    type: value >> 10 & 0x3f,
    polarity: value >> 9 & 1,
    direction: value >> 8 & 1,
    palette: value >> 7 & 1,
    index: value & 0x7f
  };
};
/**
 * Get the modulators from either a `pmod` (presets) or `imod` (instruments) chunk.
 *
 * @param {SF2Chunk} chunk - The input chunk
 * @param {string} type - The type of chunk, either 'pmod' or 'imod'
 */


var getModulators = function getModulators(chunk, type) {
  if (chunk.id !== type) {
    throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]('Unexpected chunk ID', "'".concat(type, "'"), "'".concat(chunk.id, "'"));
  }

  if (chunk.length % _constants__WEBPACK_IMPORTED_MODULE_1__["SF_MODULATOR_SIZE"]) {
    throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]("Invalid size for the '".concat(type, "' sub-chunk"));
  }

  return chunk.iterate(function (iterator) {
    return {
      source: getModulatorValue(iterator.getInt16BE()),
      id: iterator.getInt16BE(),
      value: iterator.getInt16BE(),
      valueSource: getModulatorValue(iterator.getInt16BE()),
      transform: iterator.getInt16BE()
    };
  });
};

/***/ }),

/***/ "./src/chunks/presets/headers.ts":
/*!***************************************!*\
  !*** ./src/chunks/presets/headers.ts ***!
  \***************************************/
/*! exports provided: getPresetHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPresetHeaders", function() { return getPresetHeaders; });
/* harmony import */ var _riff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/riff */ "./src/riff/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/constants */ "./src/constants.ts");



/**
 * Get all preset headers from a `phdr` sub-chunk.
 *
 * @param {SF2Chunk} chunk - The input chunk
 */
var getPresetHeaders = function getPresetHeaders(chunk) {
  if (chunk.id !== 'phdr') {
    throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]('Invalid chunk ID', "'phdr'", "'".concat(chunk.id, "'"));
  }

  if (chunk.length % _constants__WEBPACK_IMPORTED_MODULE_1__["SF_PRESET_HEADER_SIZE"]) {
    throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]("Invalid size for the 'phdr' sub-chunk");
  }

  return chunk.iterate(function (iterator) {
    return {
      name: iterator.getString(),
      preset: iterator.getInt16(),
      bank: iterator.getInt16(),
      bagIndex: iterator.getInt16(),
      library: iterator.getUInt32(),
      genre: iterator.getUInt32(),
      morphology: iterator.getUInt32()
    };
  });
};

/***/ }),

/***/ "./src/chunks/presets/index.ts":
/*!*************************************!*\
  !*** ./src/chunks/presets/index.ts ***!
  \*************************************/
/*! exports provided: getPresetHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./headers */ "./src/chunks/presets/headers.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getPresetHeaders", function() { return _headers__WEBPACK_IMPORTED_MODULE_0__["getPresetHeaders"]; });



/***/ }),

/***/ "./src/chunks/samples/headers.ts":
/*!***************************************!*\
  !*** ./src/chunks/samples/headers.ts ***!
  \***************************************/
/*! exports provided: getSampleHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSampleHeaders", function() { return getSampleHeaders; });
/* harmony import */ var _riff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/riff */ "./src/riff/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/constants */ "./src/constants.ts");



/**
 * Get all sample headers from a `shdr` sub-chunk.
 *
 * @param {SF2Chunk} chunk - The input chunk
 */
var getSampleHeaders = function getSampleHeaders(chunk) {
  if (chunk.id !== 'shdr') {
    throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]('Unexpected chunk ID', "'shdr'", "'".concat(chunk.id, "'"));
  }

  if (chunk.length % _constants__WEBPACK_IMPORTED_MODULE_1__["SF_SAMPLE_HEADER_SIZE"]) {
    throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]("Invalid size for the 'shdr' sub-chunk");
  }

  return chunk.iterate(function (iterator) {
    return {
      name: iterator.getString(),
      start: iterator.getUInt32(),
      end: iterator.getUInt32(),
      startLoop: iterator.getUInt32(),
      endLoop: iterator.getUInt32(),
      sampleRate: iterator.getUInt32(),
      originalPitch: iterator.getByte(),
      pitchCorrection: iterator.getChar(),
      link: iterator.getInt16(),
      type: iterator.getInt16()
    };
  });
};

/***/ }),

/***/ "./src/chunks/samples/index.ts":
/*!*************************************!*\
  !*** ./src/chunks/samples/index.ts ***!
  \*************************************/
/*! exports provided: getSampleHeaders */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./headers */ "./src/chunks/samples/headers.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSampleHeaders", function() { return _headers__WEBPACK_IMPORTED_MODULE_0__["getSampleHeaders"]; });



/***/ }),

/***/ "./src/chunks/zones.ts":
/*!*****************************!*\
  !*** ./src/chunks/zones.ts ***!
  \*****************************/
/*! exports provided: getZones, getItemsInZone */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getZones", function() { return getZones; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getItemsInZone", function() { return getItemsInZone; });
/* harmony import */ var _riff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/riff */ "./src/riff/index.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/constants */ "./src/constants.ts");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ~/types */ "./src/types/index.ts");



/**
 * Get the preset or instrument zones from a chunk.
 *
 * @param {SF2Chunk} chunk - The input chunk
 * @param {string} type - The type of chunk ('pbag' or 'ibag')
 */

var getZones = function getZones(chunk, type) {
  if (chunk.id !== type) {
    throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]('Unexpected chunk ID', "'".concat(type, "'"), "'".concat(chunk.id, "'"));
  }

  if (chunk.length % _constants__WEBPACK_IMPORTED_MODULE_1__["SF_BAG_SIZE"]) {
    throw new _riff__WEBPACK_IMPORTED_MODULE_0__["ParseError"]("Invalid size for the '".concat(type, "' sub-chunk"));
  }

  return chunk.iterate(function (iterator) {
    return {
      generatorIndex: iterator.getInt16(),
      modulatorIndex: iterator.getInt16()
    };
  });
};
/**
 * Get all modulators, generators and the instrument (for presets) or sample (for instruments) in a
 * preset or instrument.
 *
 * @template T
 * @template R
 * @param {T} headers - The preset or instrument headers
 * @param {Zone[]} zones - All zones for the preset or instrument
 * @param {Modulator[]} itemModulators - All modulators for the preset or instrument
 * @param {Generator[]} itemGenerators - All generators for the preset or instrument
 * @param {R[]} references - The instruments or samples to reference in the zone
 * @param {GeneratorType} referenceType - The generator type to reference it by
 */

var getItemsInZone = function getItemsInZone(headers, zones, itemModulators, itemGenerators, references, referenceType) {
  var items = [];

  for (var i = 0; i < headers.length; i++) {
    var _header = headers[i];
    var next = headers[i + 1];
    var start = _header.bagIndex;
    var end = next ? next.bagIndex : zones.length;
    var zoneItems = [];

    var _globalZone = void 0;

    for (var j = start; j < end; j++) {
      var modulators = getModulators(j, zones, itemModulators);
      var generators = getGenerators(j, zones, itemGenerators);
      var keyRange = generators[_types__WEBPACK_IMPORTED_MODULE_2__["GeneratorType"].KeyRange] && generators[_types__WEBPACK_IMPORTED_MODULE_2__["GeneratorType"].KeyRange].range;
      var referenceId = generators[referenceType];

      if (!referenceId) {
        if (j - start === 0) {
          // first item without reference = global zone
          // Spec 7.3: If a preset has more than one zone, the first zone may be a global zone.
          // A global zone is determined by the fact that the last generator in the list is not an Instrument generator.
          // Spec 7.9: "Unless the zone is a global zone, the last generator in the list is a “sampleID” generator"
          _globalZone = {
            keyRange: keyRange,
            modulators: modulators,
            generators: generators
          };
        }

        continue;
      }

      var reference = references[referenceId.value];

      if (!reference) {
        continue;
      }

      zoneItems.push({
        keyRange: keyRange,
        modulators: modulators,
        generators: generators,
        reference: reference
      });
    }

    items.push({
      header: _header,
      globalZone: _globalZone,
      zones: zoneItems
    });
  }

  return items;
};
/**
 * Get all modulators from a zone, based on the index. The end index is the modulator index of the
 * next zone, or the total zone length if the current zone is the last one.
 *
 * @param {number} index - The index
 * @param {Zone[]} zones - ALl zones for the preset or instrument
 * @param {Modulator[]} modulators - All modulators for the preset or instrument
 */

var getModulators = function getModulators(index, zones, modulators) {
  var zone = zones[index];
  var next = zones[index + 1];
  var start = zone.modulatorIndex;
  var end = next ? next.modulatorIndex : zones.length;
  return getZone(start, end, modulators);
};
/**
 * Get all generators from a zone, based on the index. The end index is the generators index of the
 * next zone, or the total zone length if the current zone is the last one.
 *
 * @param {number} index - The index
 * @param {Zone[]} zones - ALl zones for the preset or instrument
 * @param {Generator[]} generators - All generators for the preset or instrument
 */


var getGenerators = function getGenerators(index, zones, generators) {
  var zone = zones[index];
  var next = zones[index + 1];
  var start = zone.generatorIndex;
  var end = next ? next.generatorIndex : zones.length;
  return getZone(start, end, generators);
};
/**
 * Returns all modulators or generators as a key-value object, where the key is the `GeneratorType`
 * of the modulator or generator.
 *
 * @template T
 * @param {number} start - The start index
 * @param {number} end - The end index
 * @param {T[]} items - The modulators or generators
 */


var getZone = function getZone(start, end, items) {
  var itemsObject = {};

  for (var i = start; i < end; i++) {
    var item = items[i];

    if (item) {
      itemsObject[item.id] = item;
    }
  }

  return itemsObject;
};

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! exports provided: SF_VERSION_LENGTH, SF_PRESET_HEADER_SIZE, SF_BAG_SIZE, SF_MODULATOR_SIZE, SF_GENERATOR_SIZE, SF_INSTRUMENT_HEADER_SIZE, SF_SAMPLE_HEADER_SIZE, DEFAULT_SAMPLE_RATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SF_VERSION_LENGTH", function() { return SF_VERSION_LENGTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SF_PRESET_HEADER_SIZE", function() { return SF_PRESET_HEADER_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SF_BAG_SIZE", function() { return SF_BAG_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SF_MODULATOR_SIZE", function() { return SF_MODULATOR_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SF_GENERATOR_SIZE", function() { return SF_GENERATOR_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SF_INSTRUMENT_HEADER_SIZE", function() { return SF_INSTRUMENT_HEADER_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SF_SAMPLE_HEADER_SIZE", function() { return SF_SAMPLE_HEADER_SIZE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SAMPLE_RATE", function() { return DEFAULT_SAMPLE_RATE; });
var SF_VERSION_LENGTH = 4;
var SF_PRESET_HEADER_SIZE = 38;
var SF_BAG_SIZE = 4;
var SF_MODULATOR_SIZE = 10;
var SF_GENERATOR_SIZE = 4;
var SF_INSTRUMENT_HEADER_SIZE = 22;
var SF_SAMPLE_HEADER_SIZE = 46;
var DEFAULT_SAMPLE_RATE = 22050;

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/types/index.ts");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _types__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _types__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _chunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk */ "./src/chunk.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SF2Chunk", function() { return _chunk__WEBPACK_IMPORTED_MODULE_1__["SF2Chunk"]; });

/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/constants.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SF_VERSION_LENGTH", function() { return _constants__WEBPACK_IMPORTED_MODULE_2__["SF_VERSION_LENGTH"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SF_PRESET_HEADER_SIZE", function() { return _constants__WEBPACK_IMPORTED_MODULE_2__["SF_PRESET_HEADER_SIZE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SF_BAG_SIZE", function() { return _constants__WEBPACK_IMPORTED_MODULE_2__["SF_BAG_SIZE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SF_MODULATOR_SIZE", function() { return _constants__WEBPACK_IMPORTED_MODULE_2__["SF_MODULATOR_SIZE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SF_GENERATOR_SIZE", function() { return _constants__WEBPACK_IMPORTED_MODULE_2__["SF_GENERATOR_SIZE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SF_INSTRUMENT_HEADER_SIZE", function() { return _constants__WEBPACK_IMPORTED_MODULE_2__["SF_INSTRUMENT_HEADER_SIZE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SF_SAMPLE_HEADER_SIZE", function() { return _constants__WEBPACK_IMPORTED_MODULE_2__["SF_SAMPLE_HEADER_SIZE"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_SAMPLE_RATE", function() { return _constants__WEBPACK_IMPORTED_MODULE_2__["DEFAULT_SAMPLE_RATE"]; });

/* harmony import */ var _soundFont2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./soundFont2 */ "./src/soundFont2.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SoundFont2", function() { return _soundFont2__WEBPACK_IMPORTED_MODULE_3__["SoundFont2"]; });






/***/ }),

/***/ "./src/riff/chunkIterator.ts":
/*!***********************************!*\
  !*** ./src/riff/chunkIterator.ts ***!
  \***********************************/
/*! exports provided: ChunkIterator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChunkIterator", function() { return ChunkIterator; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ~/utils */ "./src/utils/index.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * A utility class to quickly iterate over a buffer.
 */

var ChunkIterator =
/*#__PURE__*/
function () {
  function ChunkIterator(chunk) {
    var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, ChunkIterator);

    _defineProperty(this, "target", []);

    _defineProperty(this, "chunk", void 0);

    _defineProperty(this, "position", 0);

    this.chunk = chunk;
    this.position = start;
  }
  /**
   * Get the position from the iterator.
   */


  _createClass(ChunkIterator, [{
    key: "iterate",

    /**
     * Iterate over the chunk.
     *
     * @param {Function} callback - The callback that is called every iteration
     */
    value: function iterate(callback) {
      while (this.position < this.chunk.length) {
        var object = callback(this);

        if (object) {
          this.target.push(object);
        }
      }
    }
    /**
     * Get a string from the buffer.
     *
     * @param {number} length - The length of the string. If no length is specified, a default of 20
     *   is assumed
     */

  }, {
    key: "getString",
    value: function getString() {
      var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 20;
      var text = Object(_utils__WEBPACK_IMPORTED_MODULE_0__["getStringFromBuffer"])(this.getBuffer(this.position, length));
      this.position += length;
      return text;
    }
    /**
     * Get a signed 16-bit integer from the chunk.
     */

  }, {
    key: "getInt16",
    value: function getInt16() {
      return this.chunk.buffer[this.position++] | this.chunk.buffer[this.position++] << 8;
    }
    /**
     * Get a signed 16-bit integer from the chunk in the big-endian format.
     */

  }, {
    key: "getInt16BE",
    value: function getInt16BE() {
      return this.getInt16() << 16 >> 16;
    }
    /**
     * Get an unsigned 32-bit integer from the chunk.
     */

  }, {
    key: "getUInt32",
    value: function getUInt32() {
      return (this.chunk.buffer[this.position++] | this.chunk.buffer[this.position++] << 8 | this.chunk.buffer[this.position++] << 16 | this.chunk.buffer[this.position++] << 24) >>> 0;
    }
    /**
     * Get a single byte from the chunk.
     */

  }, {
    key: "getByte",
    value: function getByte() {
      return this.chunk.buffer[this.position++];
    }
    /**
     * Get a signed char from the chunk.
     */

  }, {
    key: "getChar",
    value: function getChar() {
      return this.chunk.buffer[this.position++] << 24 >> 24;
    }
    /**
     * Skip ahead in the buffer.
     *
     * @param {number} length
     */

  }, {
    key: "skip",
    value: function skip(length) {
      this.position += length;
    }
    /**
     * Get a part of the buffer from start to start + length.
     *
     * @param {number} start
     * @param {number} length
     */

  }, {
    key: "getBuffer",
    value: function getBuffer(start, length) {
      return this.chunk.buffer.subarray(start, start + length);
    }
  }, {
    key: "currentPosition",
    get: function get() {
      return this.position;
    }
  }]);

  return ChunkIterator;
}();

/***/ }),

/***/ "./src/riff/index.ts":
/*!***************************!*\
  !*** ./src/riff/index.ts ***!
  \***************************/
/*! exports provided: ChunkIterator, ParseError, parseBuffer, getChunk, getChunkLength, getSubChunks, getChunkId, RIFFChunk */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _chunkIterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunkIterator */ "./src/riff/chunkIterator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ChunkIterator", function() { return _chunkIterator__WEBPACK_IMPORTED_MODULE_0__["ChunkIterator"]; });

/* harmony import */ var _parseError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parseError */ "./src/riff/parseError.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ParseError", function() { return _parseError__WEBPACK_IMPORTED_MODULE_1__["ParseError"]; });

/* harmony import */ var _parser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parser */ "./src/riff/parser.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseBuffer", function() { return _parser__WEBPACK_IMPORTED_MODULE_2__["parseBuffer"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getChunk", function() { return _parser__WEBPACK_IMPORTED_MODULE_2__["getChunk"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getChunkLength", function() { return _parser__WEBPACK_IMPORTED_MODULE_2__["getChunkLength"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getSubChunks", function() { return _parser__WEBPACK_IMPORTED_MODULE_2__["getSubChunks"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getChunkId", function() { return _parser__WEBPACK_IMPORTED_MODULE_2__["getChunkId"]; });

/* harmony import */ var _riffChunk__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./riffChunk */ "./src/riff/riffChunk.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RIFFChunk", function() { return _riffChunk__WEBPACK_IMPORTED_MODULE_3__["RIFFChunk"]; });






/***/ }),

/***/ "./src/riff/parseError.ts":
/*!********************************!*\
  !*** ./src/riff/parseError.ts ***!
  \********************************/
/*! exports provided: ParseError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParseError", function() { return ParseError; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

/**
 * Error class used for all errors encountered during the parsing of the SoundFont 2 file.
 */
var ParseError =
/*#__PURE__*/
function (_Error) {
  _inherits(ParseError, _Error);

  function ParseError(message, expected, received) {
    _classCallCheck(this, ParseError);

    return _possibleConstructorReturn(this, _getPrototypeOf(ParseError).call(this, "".concat(message).concat(expected && received ? ", expected ".concat(expected, ", received ").concat(received) : "")));
  }

  return ParseError;
}(_wrapNativeSuper(Error));

/***/ }),

/***/ "./src/riff/parser.ts":
/*!****************************!*\
  !*** ./src/riff/parser.ts ***!
  \****************************/
/*! exports provided: parseBuffer, getChunk, getChunkLength, getSubChunks, getChunkId */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseBuffer", function() { return parseBuffer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getChunk", function() { return getChunk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getChunkLength", function() { return getChunkLength; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSubChunks", function() { return getSubChunks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getChunkId", function() { return getChunkId; });
/* harmony import */ var _parseError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseError */ "./src/riff/parseError.ts");
/* harmony import */ var _utils_buffer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/utils/buffer */ "./src/utils/buffer.ts");
/* harmony import */ var _riffChunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./riffChunk */ "./src/riff/riffChunk.ts");



/**
 * Attempts to parse a RIFF file from a raw buffer.
 *
 * @param {Uint8Array} buffer - The input buffer
 */

var parseBuffer = function parseBuffer(buffer) {
  var id = getChunkId(buffer);

  if (id !== 'RIFF') {
    throw new _parseError__WEBPACK_IMPORTED_MODULE_0__["ParseError"]('Invalid file format', 'RIFF', id);
  }

  var signature = getChunkId(buffer, 8);

  if (signature !== 'sfbk') {
    throw new _parseError__WEBPACK_IMPORTED_MODULE_0__["ParseError"]('Invalid signature', 'sfbk', signature);
  }

  var newBuffer = buffer.subarray(8);
  var subChunks = getSubChunks(newBuffer.subarray(4));
  return new _riffChunk__WEBPACK_IMPORTED_MODULE_2__["RIFFChunk"](id, newBuffer.length, newBuffer, subChunks);
};
/**
 * Get a RIFF chunk from a buffer.
 *
 * @param {Buffer} buffer - The input buffer
 * @param {number} start - Where to start reading the buffer
 */

var getChunk = function getChunk(buffer, start) {
  var id = getChunkId(buffer, start);
  var length = getChunkLength(buffer, start + 4); // RIFF and LIST chunks can have sub-chunks

  var subChunks = [];

  if (id === 'RIFF' || id === 'LIST') {
    subChunks = getSubChunks(buffer.subarray(start + 12));
  }

  return new _riffChunk__WEBPACK_IMPORTED_MODULE_2__["RIFFChunk"](id, length, buffer.subarray(start + 8), subChunks);
};
/**
 * Get the length of a chunk, based on the RIFF length specifier.
 *
 * @param {Buffer} buffer - The input buffer
 * @param {number} start - Where to start reading the buffer for the length
 */

var getChunkLength = function getChunkLength(buffer, start) {
  buffer = buffer.subarray(start, start + 4);
  return (buffer[0] | buffer[1] << 8 | buffer[2] << 16 | buffer[3] << 24) >>> 0;
};
/**
 * Get all sub-chunks in a buffer. This will read until the end of the buffer and return any
 * sub-chunks found in it.
 *
 * @param {Buffer} buffer - The input buffer
 */

var getSubChunks = function getSubChunks(buffer) {
  var chunks = [];
  var index = 0;

  while (index <= buffer.length - 8) {
    var subChunk = getChunk(buffer, index);
    chunks.push(subChunk);
    index += 8 + subChunk.length;
    index = index % 2 ? index + 1 : index;
  }

  return chunks;
};
/**
 * Get the chunk ID (fourCC) from the buffer. This assumes the fourCC code is formatted as an UTF-8
 * string.
 *
 * @param {Buffer} buffer - The input buffer
 * @param {number} start - Where to start reading the chunk ID from the buffer
 */

var getChunkId = function getChunkId(buffer) {
  var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Object(_utils_buffer__WEBPACK_IMPORTED_MODULE_1__["getStringFromBuffer"])(buffer.subarray(start, start + 4));
};

/***/ }),

/***/ "./src/riff/riffChunk.ts":
/*!*******************************!*\
  !*** ./src/riff/riffChunk.ts ***!
  \*******************************/
/*! exports provided: RIFFChunk */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RIFFChunk", function() { return RIFFChunk; });
/* harmony import */ var _chunkIterator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chunkIterator */ "./src/riff/chunkIterator.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ~/utils */ "./src/utils/index.ts");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



var RIFFChunk =
/*#__PURE__*/
function () {
  /**
   * The chunk ID (fourCC).
   */

  /**
   * The length of the chunk.
   */

  /**
   * The raw buffer of the chunk.
   */

  /**
   * The sub-chunks of the chunk. If the chunk is not a RIFF or LIST chunk, this will be an empty
   * array.
   */
  function RIFFChunk(id, length, buffer, subChunks) {
    _classCallCheck(this, RIFFChunk);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "length", void 0);

    _defineProperty(this, "buffer", void 0);

    _defineProperty(this, "subChunks", void 0);

    this.id = id;
    this.length = length;
    this.buffer = buffer;
    this.subChunks = subChunks;
  }
  /**
   * Get a string from the buffer. If no position and no length is specified, it returns the whole
   * buffer as a string.
   *
   * @param {number} [position]
   * @param {number} [length]
   */


  _createClass(RIFFChunk, [{
    key: "getString",
    value: function getString() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var length = arguments.length > 1 ? arguments[1] : undefined;
      return Object(_utils__WEBPACK_IMPORTED_MODULE_1__["getStringFromBuffer"])(this.getBuffer(position, length || this.length - position));
    }
    /**
     * Get a signed 16-bit integer from the buffer.
     *
     * @param {number} [position]
     */

  }, {
    key: "getInt16",
    value: function getInt16() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return this.buffer[position++] | this.buffer[position] << 8;
    }
    /**
     * Get an unsigned 32-bit integer from the buffer.
     *
     * @param {number} [position]
     */

  }, {
    key: "getUInt32",
    value: function getUInt32() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return (this.buffer[position++] | this.buffer[position++] << 8 | this.buffer[position++] << 16 | this.buffer[position] << 24) >>> 0;
    }
    /**
     * Get a byte from the buffer.
     *
     * @param {number} [position]
     */

  }, {
    key: "getByte",
    value: function getByte() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return this.buffer[position];
    }
    /**
     * Get a char from the buffer.
     *
     * @param {number} [position]
     */

  }, {
    key: "getChar",
    value: function getChar() {
      var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return this.buffer[position] << 24 >> 24;
    }
    /**
     * Get a chunk iterator for the chunk.
     *
     * @param {number} [start] - The position where to start iterating. Defaults to 0.
     */

  }, {
    key: "iterator",
    value: function iterator() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return new _chunkIterator__WEBPACK_IMPORTED_MODULE_0__["ChunkIterator"](this, start);
    }
    /**
     * Utility function to quickly iterate over a function.
     *
     * @template T
     * @param {(iterator: ChunkIterator): T} callback - The callback that returns an instance of the
     *   specified return type
     * @param {number} [start] - The optional index where to start iterating over the chunk
     */

  }, {
    key: "iterate",
    value: function iterate(callback) {
      var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var iterator = new _chunkIterator__WEBPACK_IMPORTED_MODULE_0__["ChunkIterator"](this, start);
      iterator.iterate(callback);
      return iterator.target;
    }
    /**
     * Get a buffer from `start` to `start` + `length`. The buffer is not copied (e.g. when using
     * .slice()), so any modifications to the buffer are done to the original buffer too.
     *
     * @param {number} start
     * @param {number} length
     */

  }, {
    key: "getBuffer",
    value: function getBuffer(start, length) {
      return this.buffer.subarray(start, start + length);
    }
  }]);

  return RIFFChunk;
}();

/***/ }),

/***/ "./src/soundFont2.ts":
/*!***************************!*\
  !*** ./src/soundFont2.ts ***!
  \***************************/
/*! exports provided: SoundFont2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SoundFont2", function() { return SoundFont2; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/types/index.ts");
/* harmony import */ var _chunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./chunk */ "./src/chunk.ts");
/* harmony import */ var _riff__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./riff */ "./src/riff/index.ts");
/* harmony import */ var _chunks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./chunks */ "./src/chunks/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/utils/index.ts");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var SoundFont2 =
/*#__PURE__*/
function () {
  _createClass(SoundFont2, null, [{
    key: "from",

    /**
     * Create a new `SoundFont2` instance from a raw input buffer.
     *
     * @param {Uint8Array} buffer
     * @deprecated Replaced with `new SoundFont2(buffer: Uint8Array);`
     */
    value: function from(buffer) {
      return new SoundFont2(buffer);
    }
    /**
     * The raw RIFF chunk data.
     */

  }]);

  /**
   * Load a SoundFont2 file from a `Uint8Array` or a `SF2Chunk`. The recommended way is to use a
   * Uint8Array, loading a SoundFont2 from a `SF2Chunk` only exists for backwards compatibility and
   * will likely be removed in a future version.
   *
   * @param {Uint8Array|SF2Chunk} chunk
   */
  function SoundFont2(chunk) {
    _classCallCheck(this, SoundFont2);

    _defineProperty(this, "chunk", void 0);

    _defineProperty(this, "metaData", void 0);

    _defineProperty(this, "sampleData", void 0);

    _defineProperty(this, "samples", void 0);

    _defineProperty(this, "presetData", void 0);

    _defineProperty(this, "instruments", void 0);

    _defineProperty(this, "presets", void 0);

    _defineProperty(this, "banks", void 0);

    if (!(chunk instanceof _chunk__WEBPACK_IMPORTED_MODULE_1__["SF2Chunk"])) {
      var parsedBuffer = Object(_riff__WEBPACK_IMPORTED_MODULE_2__["parseBuffer"])(chunk);
      chunk = new _chunk__WEBPACK_IMPORTED_MODULE_1__["SF2Chunk"](parsedBuffer);
    }

    if (chunk.subChunks.length !== 3) {
      throw new _riff__WEBPACK_IMPORTED_MODULE_2__["ParseError"]('Invalid sfbk structure', '3 chunks', "".concat(chunk.subChunks.length, " chunks"));
    }

    this.chunk = chunk;
    this.metaData = chunk.subChunks[0].getMetaData();
    this.sampleData = chunk.subChunks[1].getSampleData();
    this.presetData = chunk.subChunks[2].getPresetData();
    this.samples = this.getSamples();
    this.instruments = this.getInstruments();
    this.presets = this.getPresets();
    this.banks = this.getBanks();
  }
  /**
   * Get the key data by MIDI bank, preset and key number. May return null if no instrument was
   * found for the given inputs. Note that this does not process any of the generators that are
   * specific to the key number.
   *
   * The result is memoized based on all arguments, to prevent having to check all presets,
   * instruments etc. every time.
   *
   * @param {number} memoizedKeyNumber - The MIDI key number
   * @param {number} [memoizedBankNumber] - The bank index number, defaults to 0
   * @param {number} [memoizedPresetNumber] - The preset number, defaults to 0
   */


  _createClass(SoundFont2, [{
    key: "getKeyData",
    value: function getKeyData(memoizedKeyNumber) {
      var _this = this;

      var memoizedBankNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var memoizedPresetNumber = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      // Get a memoized version of the function
      return Object(_utils__WEBPACK_IMPORTED_MODULE_4__["memoize"])(function (keyNumber, bankNumber, presetNumber) {
        var bank = _this.banks[bankNumber];

        if (bank) {
          var preset = bank.presets[presetNumber];

          if (preset) {
            var presetZones = preset.zones.filter(function (zone) {
              return _this.isKeyInRange(zone, keyNumber);
            });

            if (presetZones.length > 0) {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = presetZones[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var presetZone = _step.value;
                  var instrument = presetZone.instrument;
                  var instrumentZones = instrument.zones.filter(function (zone) {
                    return _this.isKeyInRange(zone, keyNumber);
                  });

                  if (instrumentZones.length > 0) {
                    var _iteratorNormalCompletion2 = true;
                    var _didIteratorError2 = false;
                    var _iteratorError2 = undefined;

                    try {
                      for (var _iterator2 = instrumentZones[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var instrumentZone = _step2.value;
                        var sample = instrumentZone.sample;

                        var generators = _objectSpread({}, presetZone.generators, instrumentZone.generators);

                        var modulators = _objectSpread({}, presetZone.modulators, instrumentZone.modulators);

                        return {
                          keyNumber: keyNumber,
                          preset: preset,
                          instrument: instrument,
                          sample: sample,
                          generators: generators,
                          modulators: modulators
                        };
                      }
                    } catch (err) {
                      _didIteratorError2 = true;
                      _iteratorError2 = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                          _iterator2.return();
                        }
                      } finally {
                        if (_didIteratorError2) {
                          throw _iteratorError2;
                        }
                      }
                    }
                  }
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            }
          }
        }

        return null;
      })(memoizedKeyNumber, memoizedBankNumber, memoizedPresetNumber);
    }
    /**
     * Checks if a MIDI key number is in the range of a zone.
     *
     * @param {ZoneItems} zone - The zone to check
     * @param {number} keyNumber - The MIDI key number, must be between 0 and 127
     */

  }, {
    key: "isKeyInRange",
    value: function isKeyInRange(zone, keyNumber) {
      return zone.keyRange === undefined || zone.keyRange.lo <= keyNumber && zone.keyRange.hi >= keyNumber;
    }
    /**
     * Parse the presets to banks.
     */

  }, {
    key: "getBanks",
    value: function getBanks() {
      return this.presets.reduce(function (target, preset) {
        var bankNumber = preset.header.bank;

        if (!target[bankNumber]) {
          target[bankNumber] = {
            presets: []
          };
        }

        target[bankNumber].presets[preset.header.preset] = preset;
        return target;
      }, []);
    }
    /**
     * Parse the raw preset data to presets.
     */

  }, {
    key: "getPresets",
    value: function getPresets() {
      var _this$presetData = this.presetData,
          presetHeaders = _this$presetData.presetHeaders,
          presetZones = _this$presetData.presetZones,
          presetGenerators = _this$presetData.presetGenerators,
          presetModulators = _this$presetData.presetModulators;
      var presets = Object(_chunks__WEBPACK_IMPORTED_MODULE_3__["getItemsInZone"])(presetHeaders, presetZones, presetModulators, presetGenerators, this.instruments, _types__WEBPACK_IMPORTED_MODULE_0__["GeneratorType"].Instrument);
      return presets.filter(function (preset) {
        return preset.header.name !== 'EOP';
      }).map(function (preset) {
        return {
          header: preset.header,
          globalZone: preset.globalZone,
          zones: preset.zones.map(function (zone) {
            return {
              keyRange: zone.keyRange,
              generators: zone.generators,
              modulators: zone.modulators,
              instrument: zone.reference
            };
          })
        };
      });
    }
    /**
     * Parse the raw instrument data (found in the preset data) to instruments.
     */

  }, {
    key: "getInstruments",
    value: function getInstruments() {
      var _this$presetData2 = this.presetData,
          instrumentHeaders = _this$presetData2.instrumentHeaders,
          instrumentZones = _this$presetData2.instrumentZones,
          instrumentModulators = _this$presetData2.instrumentModulators,
          instrumentGenerators = _this$presetData2.instrumentGenerators;
      var instruments = Object(_chunks__WEBPACK_IMPORTED_MODULE_3__["getItemsInZone"])(instrumentHeaders, instrumentZones, instrumentModulators, instrumentGenerators, this.samples, _types__WEBPACK_IMPORTED_MODULE_0__["GeneratorType"].SampleId);
      return instruments.filter(function (instrument) {
        return instrument.header.name !== 'EOI';
      }).map(function (instrument) {
        return {
          header: instrument.header,
          globalZone: instrument.globalZone,
          zones: instrument.zones.map(function (zone) {
            return {
              keyRange: zone.keyRange,
              generators: zone.generators,
              modulators: zone.modulators,
              sample: zone.reference
            };
          })
        };
      });
    }
    /**
     * Parse the raw sample data and sample headers to samples.
     */

  }, {
    key: "getSamples",
    value: function getSamples() {
      var _this2 = this;

      return this.presetData.sampleHeaders.filter(function (sample) {
        return sample.name !== 'EOS';
      }).map(function (header) {
        // Sample rate must be above 0
        if (header.name !== 'EOS' && header.sampleRate <= 0) {
          throw new Error("Illegal sample rate of ".concat(header.sampleRate, " hz in sample '").concat(header.name, "'"));
        } // Original pitch cannot be between 128 and 254


        if (header.originalPitch >= 128 && header.originalPitch <= 254) {
          header.originalPitch = 60;
        }

        header.startLoop -= header.start;
        header.endLoop -= header.start; // Turns the Uint8Array into a Int16Array

        var data = new Int16Array(new Uint8Array(_this2.sampleData.subarray(header.start * 2, header.end * 2)).buffer);
        return {
          header: header,
          data: data
        };
      });
    }
  }]);

  return SoundFont2;
}();

/***/ }),

/***/ "./src/types/bank.ts":
/*!***************************!*\
  !*** ./src/types/bank.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/types/generator.ts":
/*!********************************!*\
  !*** ./src/types/generator.ts ***!
  \********************************/
/*! exports provided: GeneratorType, DEFAULT_GENERATOR_VALUES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneratorType", function() { return GeneratorType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_GENERATOR_VALUES", function() { return DEFAULT_GENERATOR_VALUES; });
var _DEFAULT_GENERATOR_VA;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Generator (or modulator) types. These are defined in a specific order, following the spec. The
 * enum ID corresponds with the ID in the spec, so the unused and reserved fields should not be
 * removed.
 */
var GeneratorType;
/**
 * All unused generators.
 */

(function (GeneratorType) {
  GeneratorType[GeneratorType["StartAddrsOffset"] = 0] = "StartAddrsOffset";
  GeneratorType[GeneratorType["EndAddrsOffset"] = 1] = "EndAddrsOffset";
  GeneratorType[GeneratorType["StartLoopAddrsOffset"] = 2] = "StartLoopAddrsOffset";
  GeneratorType[GeneratorType["EndLoopAddrsOffset"] = 3] = "EndLoopAddrsOffset";
  GeneratorType[GeneratorType["StartAddrsCoarseOffset"] = 4] = "StartAddrsCoarseOffset";
  GeneratorType[GeneratorType["ModLFOToPitch"] = 5] = "ModLFOToPitch";
  GeneratorType[GeneratorType["VibLFOToPitch"] = 6] = "VibLFOToPitch";
  GeneratorType[GeneratorType["ModEnvToPitch"] = 7] = "ModEnvToPitch";
  GeneratorType[GeneratorType["InitialFilterFc"] = 8] = "InitialFilterFc";
  GeneratorType[GeneratorType["InitialFilterQ"] = 9] = "InitialFilterQ";
  GeneratorType[GeneratorType["ModLFOToFilterFc"] = 10] = "ModLFOToFilterFc";
  GeneratorType[GeneratorType["ModEnvToFilterFc"] = 11] = "ModEnvToFilterFc";
  GeneratorType[GeneratorType["EndAddrsCoarseOffset"] = 12] = "EndAddrsCoarseOffset";
  GeneratorType[GeneratorType["ModLFOToVolume"] = 13] = "ModLFOToVolume";
  GeneratorType[GeneratorType["Unused1"] = 14] = "Unused1";
  GeneratorType[GeneratorType["ChorusEffectsSend"] = 15] = "ChorusEffectsSend";
  GeneratorType[GeneratorType["ReverbEffectsSend"] = 16] = "ReverbEffectsSend";
  GeneratorType[GeneratorType["Pan"] = 17] = "Pan";
  GeneratorType[GeneratorType["Unused2"] = 18] = "Unused2";
  GeneratorType[GeneratorType["Unused3"] = 19] = "Unused3";
  GeneratorType[GeneratorType["Unused4"] = 20] = "Unused4";
  GeneratorType[GeneratorType["DelayModLFO"] = 21] = "DelayModLFO";
  GeneratorType[GeneratorType["FreqModLFO"] = 22] = "FreqModLFO";
  GeneratorType[GeneratorType["DelayVibLFO"] = 23] = "DelayVibLFO";
  GeneratorType[GeneratorType["FreqVibLFO"] = 24] = "FreqVibLFO";
  GeneratorType[GeneratorType["DelayModEnv"] = 25] = "DelayModEnv";
  GeneratorType[GeneratorType["AttackModEnv"] = 26] = "AttackModEnv";
  GeneratorType[GeneratorType["HoldModEnv"] = 27] = "HoldModEnv";
  GeneratorType[GeneratorType["DecayModEnv"] = 28] = "DecayModEnv";
  GeneratorType[GeneratorType["SustainModEnv"] = 29] = "SustainModEnv";
  GeneratorType[GeneratorType["ReleaseModEnv"] = 30] = "ReleaseModEnv";
  GeneratorType[GeneratorType["KeyNumToModEnvHold"] = 31] = "KeyNumToModEnvHold";
  GeneratorType[GeneratorType["KeyNumToModEnvDecay"] = 32] = "KeyNumToModEnvDecay";
  GeneratorType[GeneratorType["DelayVolEnv"] = 33] = "DelayVolEnv";
  GeneratorType[GeneratorType["AttackVolEnv"] = 34] = "AttackVolEnv";
  GeneratorType[GeneratorType["HoldVolEnv"] = 35] = "HoldVolEnv";
  GeneratorType[GeneratorType["DecayVolEnv"] = 36] = "DecayVolEnv";
  GeneratorType[GeneratorType["SustainVolEnv"] = 37] = "SustainVolEnv";
  GeneratorType[GeneratorType["ReleaseVolEnv"] = 38] = "ReleaseVolEnv";
  GeneratorType[GeneratorType["KeyNumToVolEnvHold"] = 39] = "KeyNumToVolEnvHold";
  GeneratorType[GeneratorType["KeyNumToVolEnvDecay"] = 40] = "KeyNumToVolEnvDecay";
  GeneratorType[GeneratorType["Instrument"] = 41] = "Instrument";
  GeneratorType[GeneratorType["Reserved1"] = 42] = "Reserved1";
  GeneratorType[GeneratorType["KeyRange"] = 43] = "KeyRange";
  GeneratorType[GeneratorType["VelRange"] = 44] = "VelRange";
  GeneratorType[GeneratorType["StartLoopAddrsCoarseOffset"] = 45] = "StartLoopAddrsCoarseOffset";
  GeneratorType[GeneratorType["KeyNum"] = 46] = "KeyNum";
  GeneratorType[GeneratorType["Velocity"] = 47] = "Velocity";
  GeneratorType[GeneratorType["InitialAttenuation"] = 48] = "InitialAttenuation";
  GeneratorType[GeneratorType["Reserved2"] = 49] = "Reserved2";
  GeneratorType[GeneratorType["EndLoopAddrsCoarseOffset"] = 50] = "EndLoopAddrsCoarseOffset";
  GeneratorType[GeneratorType["CoarseTune"] = 51] = "CoarseTune";
  GeneratorType[GeneratorType["FineTune"] = 52] = "FineTune";
  GeneratorType[GeneratorType["SampleId"] = 53] = "SampleId";
  GeneratorType[GeneratorType["SampleModes"] = 54] = "SampleModes";
  GeneratorType[GeneratorType["Reserved3"] = 55] = "Reserved3";
  GeneratorType[GeneratorType["ScaleTuning"] = 56] = "ScaleTuning";
  GeneratorType[GeneratorType["ExclusiveClass"] = 57] = "ExclusiveClass";
  GeneratorType[GeneratorType["OverridingRootKey"] = 58] = "OverridingRootKey";
  GeneratorType[GeneratorType["Unused5"] = 59] = "Unused5";
  GeneratorType[GeneratorType["EndOper"] = 60] = "EndOper";
})(GeneratorType || (GeneratorType = {}));

/**
 * The default value for all generator types (where applicable).
 */
var DEFAULT_GENERATOR_VALUES = (_DEFAULT_GENERATOR_VA = {}, _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.StartAddrsOffset, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.EndAddrsOffset, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.StartLoopAddrsOffset, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.EndLoopAddrsOffset, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.StartAddrsCoarseOffset, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.ModLFOToPitch, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.VibLFOToPitch, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.ModEnvToPitch, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.InitialFilterFc, 13500), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.InitialFilterQ, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.ModLFOToFilterFc, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.ModEnvToFilterFc, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.EndAddrsCoarseOffset, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.ModLFOToVolume, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.ChorusEffectsSend, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.ReverbEffectsSend, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.Pan, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.DelayModLFO, -12000), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.FreqModLFO, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.DelayVibLFO, -12000), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.FreqVibLFO, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.DelayModEnv, -12000), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.AttackModEnv, -12000), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.HoldModEnv, -12000), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.DecayModEnv, -12000), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.SustainModEnv, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.ReleaseModEnv, -12000), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.KeyNumToModEnvHold, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.KeyNumToModEnvDecay, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.DelayVolEnv, -12000), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.AttackVolEnv, -12000), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.HoldVolEnv, -12000), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.DecayVolEnv, -12000), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.SustainVolEnv, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.ReleaseVolEnv, -12000), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.KeyNumToVolEnvHold, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.KeyNumToVolEnvDecay, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.StartLoopAddrsCoarseOffset, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.KeyNum, -1), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.Velocity, -1), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.InitialAttenuation, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.EndLoopAddrsCoarseOffset, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.CoarseTune, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.FineTune, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.SampleModes, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.ScaleTuning, 100), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.ExclusiveClass, 0), _defineProperty(_DEFAULT_GENERATOR_VA, GeneratorType.OverridingRootKey, -1), _DEFAULT_GENERATOR_VA);
/**
 * Describes a range of MIDI key numbers (for the `keyRange` generator) or MIDI velocities (for the
 * `velRange` generator) with a minimum (lo) and maximum (hi) value.
 */

/***/ }),

/***/ "./src/types/index.ts":
/*!****************************!*\
  !*** ./src/types/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bank__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bank */ "./src/types/bank.ts");
/* harmony import */ var _bank__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_bank__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _bank__WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _bank__WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _generator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./generator */ "./src/types/generator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GeneratorType", function() { return _generator__WEBPACK_IMPORTED_MODULE_1__["GeneratorType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_GENERATOR_VALUES", function() { return _generator__WEBPACK_IMPORTED_MODULE_1__["DEFAULT_GENERATOR_VALUES"]; });

/* harmony import */ var _instrument__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./instrument */ "./src/types/instrument.ts");
/* harmony import */ var _instrument__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_instrument__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _instrument__WEBPACK_IMPORTED_MODULE_2__) if(["default","GeneratorType","DEFAULT_GENERATOR_VALUES"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _instrument__WEBPACK_IMPORTED_MODULE_2__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _key__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./key */ "./src/types/key.ts");
/* harmony import */ var _key__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_key__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _key__WEBPACK_IMPORTED_MODULE_3__) if(["default","GeneratorType","DEFAULT_GENERATOR_VALUES"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _key__WEBPACK_IMPORTED_MODULE_3__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _metaData__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./metaData */ "./src/types/metaData.ts");
/* harmony import */ var _metaData__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_metaData__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _metaData__WEBPACK_IMPORTED_MODULE_4__) if(["default","GeneratorType","DEFAULT_GENERATOR_VALUES"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _metaData__WEBPACK_IMPORTED_MODULE_4__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _modulator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modulator */ "./src/types/modulator.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ControllerType", function() { return _modulator__WEBPACK_IMPORTED_MODULE_5__["ControllerType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ControllerPolarity", function() { return _modulator__WEBPACK_IMPORTED_MODULE_5__["ControllerPolarity"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ControllerDirection", function() { return _modulator__WEBPACK_IMPORTED_MODULE_5__["ControllerDirection"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ControllerPalette", function() { return _modulator__WEBPACK_IMPORTED_MODULE_5__["ControllerPalette"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return _modulator__WEBPACK_IMPORTED_MODULE_5__["Controller"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TransformType", function() { return _modulator__WEBPACK_IMPORTED_MODULE_5__["TransformType"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_INSTRUMENT_MODULATORS", function() { return _modulator__WEBPACK_IMPORTED_MODULE_5__["DEFAULT_INSTRUMENT_MODULATORS"]; });

/* harmony import */ var _preset__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./preset */ "./src/types/preset.ts");
/* harmony import */ var _preset__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_preset__WEBPACK_IMPORTED_MODULE_6__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _preset__WEBPACK_IMPORTED_MODULE_6__) if(["default","GeneratorType","DEFAULT_GENERATOR_VALUES","ControllerType","ControllerPolarity","ControllerDirection","ControllerPalette","Controller","TransformType","DEFAULT_INSTRUMENT_MODULATORS"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _preset__WEBPACK_IMPORTED_MODULE_6__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _presetData__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./presetData */ "./src/types/presetData.ts");
/* harmony import */ var _presetData__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_presetData__WEBPACK_IMPORTED_MODULE_7__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _presetData__WEBPACK_IMPORTED_MODULE_7__) if(["default","GeneratorType","DEFAULT_GENERATOR_VALUES","ControllerType","ControllerPolarity","ControllerDirection","ControllerPalette","Controller","TransformType","DEFAULT_INSTRUMENT_MODULATORS"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _presetData__WEBPACK_IMPORTED_MODULE_7__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _sample__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./sample */ "./src/types/sample.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SampleType", function() { return _sample__WEBPACK_IMPORTED_MODULE_8__["SampleType"]; });

/* harmony import */ var _zone__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./zone */ "./src/types/zone.ts");
/* harmony import */ var _zone__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_zone__WEBPACK_IMPORTED_MODULE_9__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _zone__WEBPACK_IMPORTED_MODULE_9__) if(["default","GeneratorType","DEFAULT_GENERATOR_VALUES","ControllerType","ControllerPolarity","ControllerDirection","ControllerPalette","Controller","TransformType","DEFAULT_INSTRUMENT_MODULATORS","SampleType"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _zone__WEBPACK_IMPORTED_MODULE_9__[key]; }) }(__WEBPACK_IMPORT_KEY__));











/***/ }),

/***/ "./src/types/instrument.ts":
/*!*********************************!*\
  !*** ./src/types/instrument.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/types/key.ts":
/*!**************************!*\
  !*** ./src/types/key.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/types/metaData.ts":
/*!*******************************!*\
  !*** ./src/types/metaData.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/types/modulator.ts":
/*!********************************!*\
  !*** ./src/types/modulator.ts ***!
  \********************************/
/*! exports provided: ControllerType, ControllerPolarity, ControllerDirection, ControllerPalette, Controller, TransformType, DEFAULT_INSTRUMENT_MODULATORS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControllerType", function() { return ControllerType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControllerPolarity", function() { return ControllerPolarity; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControllerDirection", function() { return ControllerDirection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ControllerPalette", function() { return ControllerPalette; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Controller", function() { return Controller; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransformType", function() { return TransformType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_INSTRUMENT_MODULATORS", function() { return DEFAULT_INSTRUMENT_MODULATORS; });
/* harmony import */ var _generator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./generator */ "./src/types/generator.ts");

var ControllerType;

(function (ControllerType) {
  ControllerType[ControllerType["Linear"] = 0] = "Linear";
  ControllerType[ControllerType["Concave"] = 1] = "Concave";
  ControllerType[ControllerType["Convex"] = 2] = "Convex";
  ControllerType[ControllerType["Switch"] = 3] = "Switch";
})(ControllerType || (ControllerType = {}));

var ControllerPolarity;

(function (ControllerPolarity) {
  ControllerPolarity[ControllerPolarity["Unipolar"] = 0] = "Unipolar";
  ControllerPolarity[ControllerPolarity["Bipolar"] = 1] = "Bipolar";
})(ControllerPolarity || (ControllerPolarity = {}));

var ControllerDirection;

(function (ControllerDirection) {
  ControllerDirection[ControllerDirection["Increasing"] = 0] = "Increasing";
  ControllerDirection[ControllerDirection["Decreasing"] = 1] = "Decreasing";
})(ControllerDirection || (ControllerDirection = {}));

var ControllerPalette;

(function (ControllerPalette) {
  ControllerPalette[ControllerPalette["GeneralController"] = 0] = "GeneralController";
  ControllerPalette[ControllerPalette["MidiController"] = 1] = "MidiController";
})(ControllerPalette || (ControllerPalette = {}));

var Controller;

(function (Controller) {
  Controller[Controller["NoController"] = 0] = "NoController";
  Controller[Controller["NoteOnVelocity"] = 2] = "NoteOnVelocity";
  Controller[Controller["NoteOnKeyNumber"] = 3] = "NoteOnKeyNumber";
  Controller[Controller["PolyPressure"] = 10] = "PolyPressure";
  Controller[Controller["ChannelPressure"] = 13] = "ChannelPressure";
  Controller[Controller["PitchWheel"] = 14] = "PitchWheel";
  Controller[Controller["PitchWheelSensitivity"] = 16] = "PitchWheelSensitivity";
  Controller[Controller["Link"] = 127] = "Link";
})(Controller || (Controller = {}));

var TransformType;

(function (TransformType) {
  TransformType[TransformType["Linear"] = 0] = "Linear";
  TransformType[TransformType["Absolute"] = 2] = "Absolute";
})(TransformType || (TransformType = {}));

/**
 * The default modulators at instrument level. Implementing these is up to the consumer of this
 * library. To override these modulators, other modulators have to be defined explicitly.
 */
var DEFAULT_INSTRUMENT_MODULATORS = [// MIDI note-on velocity to initial attenuation
{
  id: _generator__WEBPACK_IMPORTED_MODULE_0__["GeneratorType"].InitialAttenuation,
  source: {
    type: ControllerType.Concave,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Decreasing,
    palette: ControllerPalette.GeneralController,
    index: Controller.NoteOnVelocity
  },
  value: 960,
  valueSource: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Increasing,
    palette: ControllerPalette.GeneralController,
    index: Controller.NoController
  },
  transform: TransformType.Linear
}, // MIDI note-on velocity to filter cutoff
{
  id: _generator__WEBPACK_IMPORTED_MODULE_0__["GeneratorType"].InitialFilterFc,
  source: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Decreasing,
    palette: ControllerPalette.GeneralController,
    index: Controller.NoteOnVelocity
  },
  value: -2400,
  // cents
  valueSource: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Increasing,
    palette: ControllerPalette.GeneralController,
    index: Controller.NoController
  },
  transform: TransformType.Linear
}, // MIDI channel pressure to vibrato LFO pitch depth
{
  id: _generator__WEBPACK_IMPORTED_MODULE_0__["GeneratorType"].VibLFOToPitch,
  source: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Increasing,
    palette: ControllerPalette.GeneralController,
    index: Controller.ChannelPressure
  },
  value: 50,
  // cents / max excursion
  valueSource: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Increasing,
    palette: ControllerPalette.GeneralController,
    index: Controller.NoController
  },
  transform: TransformType.Linear
}, // MIDI continuous controller 1 to vibrato LFO pitch depth
{
  id: _generator__WEBPACK_IMPORTED_MODULE_0__["GeneratorType"].VibLFOToPitch,
  source: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Increasing,
    palette: ControllerPalette.MidiController,
    index: 1
  },
  value: 50,
  valueSource: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Increasing,
    palette: ControllerPalette.GeneralController,
    index: Controller.NoController
  },
  transform: TransformType.Linear
}, // MIDI continuous controller 7 to initial attenuation
{
  id: _generator__WEBPACK_IMPORTED_MODULE_0__["GeneratorType"].InitialAttenuation,
  source: {
    type: ControllerType.Concave,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Decreasing,
    palette: ControllerPalette.MidiController,
    index: 7
  },
  value: 960,
  valueSource: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Increasing,
    palette: ControllerPalette.GeneralController,
    index: Controller.NoController
  },
  transform: TransformType.Linear
}, // MIDI continuous controller 10 to pan position
{
  id: _generator__WEBPACK_IMPORTED_MODULE_0__["GeneratorType"].InitialAttenuation,
  source: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Bipolar,
    direction: ControllerDirection.Increasing,
    palette: ControllerPalette.MidiController,
    index: 10
  },
  value: 1000,
  // tenths of a percent
  valueSource: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Increasing,
    palette: ControllerPalette.GeneralController,
    index: Controller.NoController
  },
  transform: TransformType.Linear
}, // MIDI continuous controller 11 to initial attenuation
{
  id: _generator__WEBPACK_IMPORTED_MODULE_0__["GeneratorType"].InitialAttenuation,
  source: {
    type: ControllerType.Concave,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Decreasing,
    palette: ControllerPalette.MidiController,
    index: 11
  },
  value: 960,
  valueSource: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Increasing,
    palette: ControllerPalette.GeneralController,
    index: Controller.NoController
  },
  transform: TransformType.Linear
}, // MIDI continuous controller 91 to reverb effects send
{
  id: _generator__WEBPACK_IMPORTED_MODULE_0__["GeneratorType"].ReverbEffectsSend,
  source: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Increasing,
    palette: ControllerPalette.MidiController,
    index: 91
  },
  value: 200,
  // tenths of a percent
  valueSource: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Increasing,
    palette: ControllerPalette.GeneralController,
    index: Controller.NoController
  },
  transform: TransformType.Linear
}, // MIDI continuous controller 93 to chorus effects send
{
  id: _generator__WEBPACK_IMPORTED_MODULE_0__["GeneratorType"].ChorusEffectsSend,
  source: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Increasing,
    palette: ControllerPalette.MidiController,
    index: 93
  },
  value: 200,
  // tenths of a percent
  valueSource: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Increasing,
    palette: ControllerPalette.GeneralController,
    index: Controller.NoController
  },
  transform: TransformType.Linear
}, // MIDI pitch wheel to initial pitch controlled by MIDI pitch wheel sensitivity
{
  id: _generator__WEBPACK_IMPORTED_MODULE_0__["GeneratorType"].CoarseTune,
  source: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Bipolar,
    direction: ControllerDirection.Increasing,
    palette: ControllerPalette.GeneralController,
    index: Controller.PitchWheel
  },
  value: 12700,
  // cents
  valueSource: {
    type: ControllerType.Linear,
    polarity: ControllerPolarity.Unipolar,
    direction: ControllerDirection.Increasing,
    palette: ControllerPalette.GeneralController,
    index: Controller.PitchWheelSensitivity
  },
  transform: TransformType.Linear
}];

/***/ }),

/***/ "./src/types/preset.ts":
/*!*****************************!*\
  !*** ./src/types/preset.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/types/presetData.ts":
/*!*********************************!*\
  !*** ./src/types/presetData.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/types/sample.ts":
/*!*****************************!*\
  !*** ./src/types/sample.ts ***!
  \*****************************/
/*! exports provided: SampleType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SampleType", function() { return SampleType; });
/**
 * SoundFont2 samples are in the WAV format, meaning that they consist of a signed 16-bit array,
 * instead of a unsigned 8-bit array, which is read by default. The sample data in the `smpl`
 * sub-chunk is parsed as Int16Array before creating a sample.
 */

/**
 * The sample type, found in the `type` field in the header.
 */
var SampleType;

(function (SampleType) {
  SampleType[SampleType["EOS"] = 0] = "EOS";
  SampleType[SampleType["Mono"] = 1] = "Mono";
  SampleType[SampleType["Right"] = 2] = "Right";
  SampleType[SampleType["Left"] = 4] = "Left";
  SampleType[SampleType["Linked"] = 8] = "Linked";
  SampleType[SampleType["RomMono"] = 32769] = "RomMono";
  SampleType[SampleType["RomRight"] = 32770] = "RomRight";
  SampleType[SampleType["RomLeft"] = 32772] = "RomLeft";
  SampleType[SampleType["RomLinked"] = 32776] = "RomLinked";
})(SampleType || (SampleType = {}));

/***/ }),

/***/ "./src/types/zone.ts":
/*!***************************!*\
  !*** ./src/types/zone.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/utils/buffer.ts":
/*!*****************************!*\
  !*** ./src/utils/buffer.ts ***!
  \*****************************/
/*! exports provided: getStringFromBuffer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStringFromBuffer", function() { return getStringFromBuffer; });
/**
 * Convert a UTF-8 encoded buffer into a string. This will read the full buffer as UTF-8 encoded
 * string and return anything before the first NULL character. The output text is trimmed of any
 * preceding or following spaces.
 *
 * @param {Buffer} buffer - The input buffer
 */
var getStringFromBuffer = function getStringFromBuffer(buffer) {
  var decoded = new TextDecoder('utf8').decode(buffer);
  var nullIndex = decoded.indexOf('\0');
  return (nullIndex === -1 ? decoded : decoded.slice(0, nullIndex)).trim();
};

/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/*! exports provided: getStringFromBuffer, memoize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buffer */ "./src/utils/buffer.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getStringFromBuffer", function() { return _buffer__WEBPACK_IMPORTED_MODULE_0__["getStringFromBuffer"]; });

/* harmony import */ var _memoize__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./memoize */ "./src/utils/memoize.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "memoize", function() { return _memoize__WEBPACK_IMPORTED_MODULE_1__["memoize"]; });




/***/ }),

/***/ "./src/utils/memoize.ts":
/*!******************************!*\
  !*** ./src/utils/memoize.ts ***!
  \******************************/
/*! exports provided: memoize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "memoize", function() { return memoize; });
/**
 * Returns a memoized function for the original function. Function arguments are serialized as a
 * JSON string and stored in an in-memory object.
 *
 * @template T
 * @template U
 * @param {(...originalArgs: T[]) => U} originalFunction
 */
var memoize = function memoize(originalFunction) {
  var memo = {};
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var serializedArgs = JSON.stringify(args);

    if (serializedArgs in memo) {
      return memo[serializedArgs];
    }

    var output = originalFunction.apply(void 0, args);
    memo[serializedArgs] = output;
    return output;
  };
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9Tb3VuZEZvbnQyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL1NvdW5kRm9udDIvLi9zcmMvY2h1bmsudHMiLCJ3ZWJwYWNrOi8vU291bmRGb250Mi8uL3NyYy9jaHVua3MvZ2VuZXJhdG9ycy50cyIsIndlYnBhY2s6Ly9Tb3VuZEZvbnQyLy4vc3JjL2NodW5rcy9pbmRleC50cyIsIndlYnBhY2s6Ly9Tb3VuZEZvbnQyLy4vc3JjL2NodW5rcy9pbnN0cnVtZW50cy9oZWFkZXJzLnRzIiwid2VicGFjazovL1NvdW5kRm9udDIvLi9zcmMvY2h1bmtzL2luc3RydW1lbnRzL2luZGV4LnRzIiwid2VicGFjazovL1NvdW5kRm9udDIvLi9zcmMvY2h1bmtzL21vZHVsYXRvcnMudHMiLCJ3ZWJwYWNrOi8vU291bmRGb250Mi8uL3NyYy9jaHVua3MvcHJlc2V0cy9oZWFkZXJzLnRzIiwid2VicGFjazovL1NvdW5kRm9udDIvLi9zcmMvY2h1bmtzL3ByZXNldHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vU291bmRGb250Mi8uL3NyYy9jaHVua3Mvc2FtcGxlcy9oZWFkZXJzLnRzIiwid2VicGFjazovL1NvdW5kRm9udDIvLi9zcmMvY2h1bmtzL3NhbXBsZXMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vU291bmRGb250Mi8uL3NyYy9jaHVua3Mvem9uZXMudHMiLCJ3ZWJwYWNrOi8vU291bmRGb250Mi8uL3NyYy9jb25zdGFudHMudHMiLCJ3ZWJwYWNrOi8vU291bmRGb250Mi8uL3NyYy9pbmRleC50cyIsIndlYnBhY2s6Ly9Tb3VuZEZvbnQyLy4vc3JjL3JpZmYvY2h1bmtJdGVyYXRvci50cyIsIndlYnBhY2s6Ly9Tb3VuZEZvbnQyLy4vc3JjL3JpZmYvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vU291bmRGb250Mi8uL3NyYy9yaWZmL3BhcnNlRXJyb3IudHMiLCJ3ZWJwYWNrOi8vU291bmRGb250Mi8uL3NyYy9yaWZmL3BhcnNlci50cyIsIndlYnBhY2s6Ly9Tb3VuZEZvbnQyLy4vc3JjL3JpZmYvcmlmZkNodW5rLnRzIiwid2VicGFjazovL1NvdW5kRm9udDIvLi9zcmMvc291bmRGb250Mi50cyIsIndlYnBhY2s6Ly9Tb3VuZEZvbnQyLy4vc3JjL3R5cGVzL2dlbmVyYXRvci50cyIsIndlYnBhY2s6Ly9Tb3VuZEZvbnQyLy4vc3JjL3R5cGVzL2luZGV4LnRzIiwid2VicGFjazovL1NvdW5kRm9udDIvLi9zcmMvdHlwZXMvbW9kdWxhdG9yLnRzIiwid2VicGFjazovL1NvdW5kRm9udDIvLi9zcmMvdHlwZXMvc2FtcGxlLnRzIiwid2VicGFjazovL1NvdW5kRm9udDIvLi9zcmMvdXRpbHMvYnVmZmVyLnRzIiwid2VicGFjazovL1NvdW5kRm9udDIvLi9zcmMvdXRpbHMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vU291bmRGb250Mi8uL3NyYy91dGlscy9tZW1vaXplLnRzIl0sIm5hbWVzIjpbIlNGMkNodW5rIiwiY2h1bmsiLCJpZCIsImxlbmd0aCIsImJ1ZmZlciIsInN1YkNodW5rcyIsIm1hcCIsInN1YkNodW5rIiwiUGFyc2VFcnJvciIsImluZm8iLCJyZWR1Y2UiLCJ0YXJnZXQiLCJTRl9WRVJTSU9OX0xFTkdUSCIsImdldEludDE2IiwiZ2V0U3RyaW5nIiwiaWZpbCIsIklOQU0iLCJ2ZXJzaW9uIiwic291bmRFbmdpbmUiLCJpc25nIiwibmFtZSIsInJvbSIsImlyb20iLCJyb21WZXJzaW9uIiwiaXZlciIsImNyZWF0aW9uRGF0ZSIsIklDUkQiLCJhdXRob3IiLCJJRU5HIiwicHJvZHVjdCIsIklQUkQiLCJjb3B5cmlnaHQiLCJJQ09QIiwiY29tbWVudHMiLCJJQ01UIiwiY3JlYXRlZEJ5IiwiSVNGVCIsInNhbXBsZUNodW5rIiwicHJlc2V0SGVhZGVycyIsImdldFByZXNldEhlYWRlcnMiLCJwcmVzZXRab25lcyIsImdldFpvbmVzIiwicHJlc2V0TW9kdWxhdG9ycyIsImdldE1vZHVsYXRvcnMiLCJwcmVzZXRHZW5lcmF0b3JzIiwiZ2V0R2VuZXJhdG9ycyIsImluc3RydW1lbnRIZWFkZXJzIiwiZ2V0SW5zdHJ1bWVudEhlYWRlcnMiLCJpbnN0cnVtZW50Wm9uZXMiLCJpbnN0cnVtZW50TW9kdWxhdG9ycyIsImluc3RydW1lbnRHZW5lcmF0b3JzIiwic2FtcGxlSGVhZGVycyIsImdldFNhbXBsZUhlYWRlcnMiLCJSSUZGQ2h1bmsiLCJQUkVTRVRfVFlQRVNfQkxBQ0tMSVNUIiwiR2VuZXJhdG9yVHlwZSIsIlN0YXJ0QWRkcnNPZmZzZXQiLCJFbmRBZGRyc09mZnNldCIsIlN0YXJ0TG9vcEFkZHJzT2Zmc2V0IiwiRW5kTG9vcEFkZHJzT2Zmc2V0IiwiU3RhcnRBZGRyc0NvYXJzZU9mZnNldCIsIkVuZEFkZHJzQ29hcnNlT2Zmc2V0IiwiU3RhcnRMb29wQWRkcnNDb2Fyc2VPZmZzZXQiLCJLZXlOdW0iLCJWZWxvY2l0eSIsIkVuZExvb3BBZGRyc0NvYXJzZU9mZnNldCIsIlNhbXBsZU1vZGVzIiwiRXhjbHVzaXZlQ2xhc3MiLCJPdmVycmlkaW5nUm9vdEtleSIsIklOU1RSVU1FTlRfVFlQRVNfQkxBQ0tMSVNUIiwiVW51c2VkMSIsIlVudXNlZDIiLCJVbnVzZWQzIiwiVW51c2VkNCIsIlJlc2VydmVkMSIsIlJlc2VydmVkMiIsIlJlc2VydmVkMyIsIlJBTkdFX1RZUEVTIiwiS2V5UmFuZ2UiLCJWZWxSYW5nZSIsInR5cGUiLCJTRl9HRU5FUkFUT1JfU0laRSIsIml0ZXJhdGUiLCJpdGVyYXRvciIsImluY2x1ZGVzIiwicmFuZ2UiLCJsbyIsImdldEJ5dGUiLCJoaSIsInZhbHVlIiwiZ2V0SW50MTZCRSIsIlNGX0lOU1RSVU1FTlRfSEVBREVSX1NJWkUiLCJiYWdJbmRleCIsImdldE1vZHVsYXRvclZhbHVlIiwicG9sYXJpdHkiLCJkaXJlY3Rpb24iLCJwYWxldHRlIiwiaW5kZXgiLCJTRl9NT0RVTEFUT1JfU0laRSIsInNvdXJjZSIsInZhbHVlU291cmNlIiwidHJhbnNmb3JtIiwiU0ZfUFJFU0VUX0hFQURFUl9TSVpFIiwicHJlc2V0IiwiYmFuayIsImxpYnJhcnkiLCJnZXRVSW50MzIiLCJnZW5yZSIsIm1vcnBob2xvZ3kiLCJTRl9TQU1QTEVfSEVBREVSX1NJWkUiLCJzdGFydCIsImVuZCIsInN0YXJ0TG9vcCIsImVuZExvb3AiLCJzYW1wbGVSYXRlIiwib3JpZ2luYWxQaXRjaCIsInBpdGNoQ29ycmVjdGlvbiIsImdldENoYXIiLCJsaW5rIiwiU0ZfQkFHX1NJWkUiLCJnZW5lcmF0b3JJbmRleCIsIm1vZHVsYXRvckluZGV4IiwiZ2V0SXRlbXNJblpvbmUiLCJoZWFkZXJzIiwiem9uZXMiLCJpdGVtTW9kdWxhdG9ycyIsIml0ZW1HZW5lcmF0b3JzIiwicmVmZXJlbmNlcyIsInJlZmVyZW5jZVR5cGUiLCJpdGVtcyIsImkiLCJoZWFkZXIiLCJuZXh0Iiwiem9uZUl0ZW1zIiwiZ2xvYmFsWm9uZSIsImoiLCJtb2R1bGF0b3JzIiwiZ2VuZXJhdG9ycyIsImtleVJhbmdlIiwicmVmZXJlbmNlSWQiLCJyZWZlcmVuY2UiLCJwdXNoIiwiem9uZSIsImdldFpvbmUiLCJpdGVtc09iamVjdCIsIml0ZW0iLCJERUZBVUxUX1NBTVBMRV9SQVRFIiwiQ2h1bmtJdGVyYXRvciIsInBvc2l0aW9uIiwiY2FsbGJhY2siLCJvYmplY3QiLCJ0ZXh0IiwiZ2V0U3RyaW5nRnJvbUJ1ZmZlciIsImdldEJ1ZmZlciIsInN1YmFycmF5IiwibWVzc2FnZSIsImV4cGVjdGVkIiwicmVjZWl2ZWQiLCJFcnJvciIsInBhcnNlQnVmZmVyIiwiZ2V0Q2h1bmtJZCIsInNpZ25hdHVyZSIsIm5ld0J1ZmZlciIsImdldFN1YkNodW5rcyIsImdldENodW5rIiwiZ2V0Q2h1bmtMZW5ndGgiLCJjaHVua3MiLCJTb3VuZEZvbnQyIiwicGFyc2VkQnVmZmVyIiwibWV0YURhdGEiLCJnZXRNZXRhRGF0YSIsInNhbXBsZURhdGEiLCJnZXRTYW1wbGVEYXRhIiwicHJlc2V0RGF0YSIsImdldFByZXNldERhdGEiLCJzYW1wbGVzIiwiZ2V0U2FtcGxlcyIsImluc3RydW1lbnRzIiwiZ2V0SW5zdHJ1bWVudHMiLCJwcmVzZXRzIiwiZ2V0UHJlc2V0cyIsImJhbmtzIiwiZ2V0QmFua3MiLCJtZW1vaXplZEtleU51bWJlciIsIm1lbW9pemVkQmFua051bWJlciIsIm1lbW9pemVkUHJlc2V0TnVtYmVyIiwibWVtb2l6ZSIsImtleU51bWJlciIsImJhbmtOdW1iZXIiLCJwcmVzZXROdW1iZXIiLCJmaWx0ZXIiLCJpc0tleUluUmFuZ2UiLCJwcmVzZXRab25lIiwiaW5zdHJ1bWVudCIsImluc3RydW1lbnRab25lIiwic2FtcGxlIiwidW5kZWZpbmVkIiwiSW5zdHJ1bWVudCIsIlNhbXBsZUlkIiwiZGF0YSIsIkludDE2QXJyYXkiLCJVaW50OEFycmF5IiwiREVGQVVMVF9HRU5FUkFUT1JfVkFMVUVTIiwiTW9kTEZPVG9QaXRjaCIsIlZpYkxGT1RvUGl0Y2giLCJNb2RFbnZUb1BpdGNoIiwiSW5pdGlhbEZpbHRlckZjIiwiSW5pdGlhbEZpbHRlclEiLCJNb2RMRk9Ub0ZpbHRlckZjIiwiTW9kRW52VG9GaWx0ZXJGYyIsIk1vZExGT1RvVm9sdW1lIiwiQ2hvcnVzRWZmZWN0c1NlbmQiLCJSZXZlcmJFZmZlY3RzU2VuZCIsIlBhbiIsIkRlbGF5TW9kTEZPIiwiRnJlcU1vZExGTyIsIkRlbGF5VmliTEZPIiwiRnJlcVZpYkxGTyIsIkRlbGF5TW9kRW52IiwiQXR0YWNrTW9kRW52IiwiSG9sZE1vZEVudiIsIkRlY2F5TW9kRW52IiwiU3VzdGFpbk1vZEVudiIsIlJlbGVhc2VNb2RFbnYiLCJLZXlOdW1Ub01vZEVudkhvbGQiLCJLZXlOdW1Ub01vZEVudkRlY2F5IiwiRGVsYXlWb2xFbnYiLCJBdHRhY2tWb2xFbnYiLCJIb2xkVm9sRW52IiwiRGVjYXlWb2xFbnYiLCJTdXN0YWluVm9sRW52IiwiUmVsZWFzZVZvbEVudiIsIktleU51bVRvVm9sRW52SG9sZCIsIktleU51bVRvVm9sRW52RGVjYXkiLCJJbml0aWFsQXR0ZW51YXRpb24iLCJDb2Fyc2VUdW5lIiwiRmluZVR1bmUiLCJTY2FsZVR1bmluZyIsIkNvbnRyb2xsZXJUeXBlIiwiQ29udHJvbGxlclBvbGFyaXR5IiwiQ29udHJvbGxlckRpcmVjdGlvbiIsIkNvbnRyb2xsZXJQYWxldHRlIiwiQ29udHJvbGxlciIsIlRyYW5zZm9ybVR5cGUiLCJERUZBVUxUX0lOU1RSVU1FTlRfTU9EVUxBVE9SUyIsIkNvbmNhdmUiLCJVbmlwb2xhciIsIkRlY3JlYXNpbmciLCJHZW5lcmFsQ29udHJvbGxlciIsIk5vdGVPblZlbG9jaXR5IiwiTGluZWFyIiwiSW5jcmVhc2luZyIsIk5vQ29udHJvbGxlciIsIkNoYW5uZWxQcmVzc3VyZSIsIk1pZGlDb250cm9sbGVyIiwiQmlwb2xhciIsIlBpdGNoV2hlZWwiLCJQaXRjaFdoZWVsU2Vuc2l0aXZpdHkiLCJTYW1wbGVUeXBlIiwiZGVjb2RlZCIsIlRleHREZWNvZGVyIiwiZGVjb2RlIiwibnVsbEluZGV4IiwiaW5kZXhPZiIsInNsaWNlIiwidHJpbSIsIm9yaWdpbmFsRnVuY3Rpb24iLCJtZW1vIiwiYXJncyIsInNlcmlhbGl6ZWRBcmdzIiwiSlNPTiIsInN0cmluZ2lmeSIsIm91dHB1dCJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlD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QyxjQUFjLElBQUlGLElBQXRCLEVBQTRCO0FBQzFCLGFBQU9BLElBQUksQ0FBQ0UsY0FBRCxDQUFYO0FBQ0Q7O0FBRUQsUUFBTUcsTUFBTSxHQUFHTixnQkFBZ0IsTUFBaEIsU0FBb0JFLElBQXBCLENBQWY7QUFDQUQsUUFBSSxDQUFDRSxjQUFELENBQUosR0FBdUJHLE1BQXZCO0FBQ0EsV0FBT0EsTUFBUDtBQUNELEdBVEQ7QUFVRCxDQWZNLEMiLCJmaWxlIjoiU291bmRGb250Mi5ub2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXgudHNcIik7XG4iLCJpbXBvcnQgeyBQYXJzZUVycm9yLCBSSUZGQ2h1bmsgfSBmcm9tICcuL3JpZmYnO1xuaW1wb3J0IHsgTWV0YURhdGEsIFByZXNldERhdGEgfSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFNGX0lORk9fQ0hVTktTLCBTRl9WRVJTSU9OX0xFTkdUSCB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7XG4gIGdldEdlbmVyYXRvcnMsXG4gIGdldEluc3RydW1lbnRIZWFkZXJzLFxuICBnZXRNb2R1bGF0b3JzLFxuICBnZXRQcmVzZXRIZWFkZXJzLFxuICBnZXRTYW1wbGVIZWFkZXJzLFxuICBnZXRab25lc1xufSBmcm9tICcuL2NodW5rcyc7XG5cbmV4cG9ydCBjbGFzcyBTRjJDaHVuayBleHRlbmRzIFJJRkZDaHVuayB7XG4gIC8qKlxuICAgKiBBbGwgc3ViLWNodW5rcyBvZiB0aGlzIGBTRjJDaHVua2AgYXMgYFNGMkNodW5rYC5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBzdWJDaHVua3M6IFNGMkNodW5rW107XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNodW5rOiBSSUZGQ2h1bmspIHtcbiAgICBzdXBlcihjaHVuay5pZCwgY2h1bmsubGVuZ3RoLCBjaHVuay5idWZmZXIsIGNodW5rLnN1YkNodW5rcyk7XG5cbiAgICB0aGlzLnN1YkNodW5rcyA9IGNodW5rLnN1YkNodW5rcy5tYXAoc3ViQ2h1bmsgPT4gbmV3IFNGMkNodW5rKHN1YkNodW5rKSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IG1ldGEgZGF0YSBmcm9tIHRoZSBjaHVuay4gVGhpcyBhc3N1bWVzIHRoZSBjaHVuayBpcyBhIExJU1QgY2h1bmssIGNvbnRhaW5pbmcgSU5GT1xuICAgKiBzdWItY2h1bmtzLlxuICAgKi9cbiAgcHVibGljIGdldE1ldGFEYXRhKCk6IE1ldGFEYXRhIHtcbiAgICBpZiAodGhpcy5pZCAhPT0gJ0xJU1QnKSB7XG4gICAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcignVW5leHBlY3RlZCBjaHVuayBJRCcsIGAnTElTVCdgLCBgJyR7dGhpcy5pZH0nYCk7XG4gICAgfVxuXG4gICAgY29uc3QgaW5mbyA9IHRoaXMuc3ViQ2h1bmtzLnJlZHVjZTx7IFtrZXkgaW4gU0ZfSU5GT19DSFVOS1NdPzogc3RyaW5nIH0+KCh0YXJnZXQsIGNodW5rKSA9PiB7XG4gICAgICBpZiAoY2h1bmsuaWQgPT09ICdpZmlsJyB8fCBjaHVuay5pZCA9PT0gJ2l2ZXInKSB7XG4gICAgICAgIC8vIGlmaWwgYW5kIGl2ZXIgbGVuZ3RoIG11c3QgYmUgNCBieXRlc1xuICAgICAgICBpZiAoY2h1bmsubGVuZ3RoICE9PSBTRl9WRVJTSU9OX0xFTkdUSCkge1xuICAgICAgICAgIHRocm93IG5ldyBQYXJzZUVycm9yKGBJbnZhbGlkIHNpemUgZm9yIHRoZSAnJHtjaHVuay5pZH0nIHN1Yi1jaHVua2ApO1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldFtjaHVuay5pZCBhcyBTRl9JTkZPX0NIVU5LU10gPSBgJHtjaHVuay5nZXRJbnQxNigpfS4ke2NodW5rLmdldEludDE2KDIpfWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRbY2h1bmsuaWQgYXMgU0ZfSU5GT19DSFVOS1NdID0gY2h1bmsuZ2V0U3RyaW5nKCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSwge30pO1xuXG4gICAgaWYgKCFpbmZvLmlmaWwpIHtcbiAgICAgIHRocm93IG5ldyBQYXJzZUVycm9yKGBNaXNzaW5nIHJlcXVpcmVkICdpZmlsJyBzdWItY2h1bmtgKTtcbiAgICB9XG5cbiAgICBpZiAoIWluZm8uSU5BTSkge1xuICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoYE1pc3NpbmcgcmVxdWlyZWQgJ0lOQU0nIHN1Yi1jaHVua2ApO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICB2ZXJzaW9uOiBpbmZvLmlmaWwsXG4gICAgICBzb3VuZEVuZ2luZTogaW5mby5pc25nIHx8ICdFTVU4MDAwJyxcbiAgICAgIG5hbWU6IGluZm8uSU5BTSxcbiAgICAgIHJvbTogaW5mby5pcm9tLFxuICAgICAgcm9tVmVyc2lvbjogaW5mby5pdmVyLFxuICAgICAgY3JlYXRpb25EYXRlOiBpbmZvLklDUkQsXG4gICAgICBhdXRob3I6IGluZm8uSUVORyxcbiAgICAgIHByb2R1Y3Q6IGluZm8uSVBSRCxcbiAgICAgIGNvcHlyaWdodDogaW5mby5JQ09QLFxuICAgICAgY29tbWVudHM6IGluZm8uSUNNVCxcbiAgICAgIGNyZWF0ZWRCeTogaW5mby5JU0ZUXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHNhbXBsZSBkYXRhIGFzIGEgdW5zaWduZWQgOC1iaXQgYnVmZmVyIGZyb20gdGhlIGNodW5rLiBUaGlzIGFzc3VtZXMgdGhlIGNodW5rIGlzIGFcbiAgICogTElTVCBjaHVuayBjb250YWluaW5nIGEgc21wbCBzdWItY2h1bmsuXG4gICAqL1xuICBwdWJsaWMgZ2V0U2FtcGxlRGF0YSgpOiBVaW50OEFycmF5IHtcbiAgICBpZiAodGhpcy5pZCAhPT0gJ0xJU1QnKSB7XG4gICAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcignVW5leHBlY3RlZCBjaHVuayBJRCcsIGAnTElTVCdgLCBgJyR7dGhpcy5pZH0nYCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2FtcGxlQ2h1bmsgPSB0aGlzLnN1YkNodW5rc1swXTtcbiAgICBpZiAoc2FtcGxlQ2h1bmsuaWQgIT09ICdzbXBsJykge1xuICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoJ0ludmFsaWQgY2h1bmsgc2lnbmF0dXJlJywgYCdzbXBsJ2AsIGAnJHtzYW1wbGVDaHVuay5pZH0nYCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNhbXBsZUNodW5rLmJ1ZmZlcjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHByZXNldCBkYXRhIGZyb20gdGhlIGNodW5rLiBUaGlzIGFzc3VtZXMgdGhlIGNodW5rIGlzIGEgTElTVCBjaHVuayBjb250YWluaW5nIHRoZVxuICAgKiBwcmVzZXQgZGF0YSBzdWItY2h1bmtzLlxuICAgKi9cbiAgcHVibGljIGdldFByZXNldERhdGEoKTogUHJlc2V0RGF0YSB7XG4gICAgaWYgKHRoaXMuaWQgIT09ICdMSVNUJykge1xuICAgICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoJ1VuZXhwZWN0ZWQgY2h1bmsgSUQnLCBgJ0xJU1QnYCwgYCcke3RoaXMuaWR9J2ApO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBwcmVzZXRIZWFkZXJzOiBnZXRQcmVzZXRIZWFkZXJzKHRoaXMuc3ViQ2h1bmtzWzBdKSxcbiAgICAgIHByZXNldFpvbmVzOiBnZXRab25lcyh0aGlzLnN1YkNodW5rc1sxXSwgJ3BiYWcnKSxcbiAgICAgIHByZXNldE1vZHVsYXRvcnM6IGdldE1vZHVsYXRvcnModGhpcy5zdWJDaHVua3NbMl0sICdwbW9kJyksXG4gICAgICBwcmVzZXRHZW5lcmF0b3JzOiBnZXRHZW5lcmF0b3JzKHRoaXMuc3ViQ2h1bmtzWzNdLCAncGdlbicpLFxuICAgICAgaW5zdHJ1bWVudEhlYWRlcnM6IGdldEluc3RydW1lbnRIZWFkZXJzKHRoaXMuc3ViQ2h1bmtzWzRdKSxcbiAgICAgIGluc3RydW1lbnRab25lczogZ2V0Wm9uZXModGhpcy5zdWJDaHVua3NbNV0sICdpYmFnJyksXG4gICAgICBpbnN0cnVtZW50TW9kdWxhdG9yczogZ2V0TW9kdWxhdG9ycyh0aGlzLnN1YkNodW5rc1s2XSwgJ2ltb2QnKSxcbiAgICAgIGluc3RydW1lbnRHZW5lcmF0b3JzOiBnZXRHZW5lcmF0b3JzKHRoaXMuc3ViQ2h1bmtzWzddLCAnaWdlbicpLFxuICAgICAgc2FtcGxlSGVhZGVyczogZ2V0U2FtcGxlSGVhZGVycyh0aGlzLnN1YkNodW5rc1s4XSlcbiAgICB9O1xuICB9XG59XG4iLCJpbXBvcnQgeyBTRjJDaHVuayB9IGZyb20gJ34vY2h1bmsnO1xuaW1wb3J0IHsgUGFyc2VFcnJvciB9IGZyb20gJ34vcmlmZic7XG5pbXBvcnQgeyBHZW5lcmF0b3IsIEdlbmVyYXRvclR5cGUgfSBmcm9tICd+L3R5cGVzJztcbmltcG9ydCB7IFNGX0dFTkVSQVRPUl9TSVpFIH0gZnJvbSAnfi9jb25zdGFudHMnO1xuXG4vKipcbiAqIEFuIGFycmF5IG9mIEdlbmVyYXRvclR5cGVzIHRoYXQgY2Fubm90IGJlIHNwZWNpZmllZCBmb3IgcHJlc2V0cy4gSWYgb25lIG9mIHRoZXNlIGdlbmVyYXRvciB0eXBlc1xuICogaXMgZm91bmQsIHRoZSBnZW5lcmF0b3Igc2hvdWxkIGJlIGlnbm9yZWQuXG4gKi9cbmNvbnN0IFBSRVNFVF9UWVBFU19CTEFDS0xJU1Q6IG51bWJlcltdID0gW1xuICBHZW5lcmF0b3JUeXBlLlN0YXJ0QWRkcnNPZmZzZXQsXG4gIEdlbmVyYXRvclR5cGUuRW5kQWRkcnNPZmZzZXQsXG4gIEdlbmVyYXRvclR5cGUuU3RhcnRMb29wQWRkcnNPZmZzZXQsXG4gIEdlbmVyYXRvclR5cGUuRW5kTG9vcEFkZHJzT2Zmc2V0LFxuICBHZW5lcmF0b3JUeXBlLlN0YXJ0QWRkcnNDb2Fyc2VPZmZzZXQsXG4gIEdlbmVyYXRvclR5cGUuRW5kQWRkcnNDb2Fyc2VPZmZzZXQsXG4gIEdlbmVyYXRvclR5cGUuU3RhcnRMb29wQWRkcnNDb2Fyc2VPZmZzZXQsXG4gIEdlbmVyYXRvclR5cGUuS2V5TnVtLFxuICBHZW5lcmF0b3JUeXBlLlZlbG9jaXR5LFxuICBHZW5lcmF0b3JUeXBlLkVuZExvb3BBZGRyc0NvYXJzZU9mZnNldCxcbiAgR2VuZXJhdG9yVHlwZS5TYW1wbGVNb2RlcyxcbiAgR2VuZXJhdG9yVHlwZS5FeGNsdXNpdmVDbGFzcyxcbiAgR2VuZXJhdG9yVHlwZS5PdmVycmlkaW5nUm9vdEtleVxuXTtcblxuLyoqXG4gKiBBbiBhcnJheSBvZiBHZW5lcmF0b3JUeXBlcyB0aGF0IGNhbm5vdCBiZSBzcGVjaWZpZWQgZm9yIGluc3RydW1lbnRzLiBJZiBvbmUgb2YgdGhlc2UgZ2VuZXJhdG9yXG4gKiB0eXBlcyBpcyBmb3VuZCwgdGhlIGdlbmVyYXRvciBzaG91bGQgYmUgaWdub3JlZC5cbiAqL1xuY29uc3QgSU5TVFJVTUVOVF9UWVBFU19CTEFDS0xJU1Q6IG51bWJlcltdID0gW1xuICBHZW5lcmF0b3JUeXBlLlVudXNlZDEsXG4gIEdlbmVyYXRvclR5cGUuVW51c2VkMixcbiAgR2VuZXJhdG9yVHlwZS5VbnVzZWQzLFxuICBHZW5lcmF0b3JUeXBlLlVudXNlZDQsXG4gIEdlbmVyYXRvclR5cGUuUmVzZXJ2ZWQxLFxuICBHZW5lcmF0b3JUeXBlLlJlc2VydmVkMixcbiAgR2VuZXJhdG9yVHlwZS5SZXNlcnZlZDNcbl07XG5cbi8qKlxuICogVGhlc2UgR2VuZXJhdG9yVHlwZXMgc3BlY2lmeSBhIHJhbmdlIG9mIGtleSBudW1iZXJzIG9yIHZlbG9jaXR5LlxuICovXG5jb25zdCBSQU5HRV9UWVBFUzogbnVtYmVyW10gPSBbR2VuZXJhdG9yVHlwZS5LZXlSYW5nZSwgR2VuZXJhdG9yVHlwZS5WZWxSYW5nZV07XG5cbi8qKlxuICogR2V0IGFsbCBnZW5lcmF0b3JzIGZvciBlaXRoZXIgYW4gcHJlc2V0IGdlbmVyYXRvciBjaHVuayBvciBhIGluc3RydW1lbnQgZ2VuZXJhdG9yIGNodW5rLlxuICpcbiAqIFRPRE86IENoZWNrIGlmIGdlbmVyYXRvciBjaHVuayBpcyB2YWxpZCwgYnkgZm9sbG93aW5nIHRoZSBydWxlcyBkZWZpbmVkIGluIHRoZSBzcGVjLiBTZWUgZm9yXG4gKiBleGFtcGxlOiBodHRwczovL2dpdGh1Yi5jb20vRmx1aWRTeW50aC9mbHVpZHN5bnRoL2Jsb2IvdjIuMC4zL3NyYy9zZmxvYWRlci9mbHVpZF9zZmZpbGUuY1xuICpcbiAqIEBwYXJhbSB7U0YyQ2h1bmt9IGNodW5rIC0gVGhlIGlucHV0IGNodW5rXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFRoZSB0eXBlLCBjYW4gYmUgJ3BnZW4nIG9yICdpZ2VuJ1xuICovXG5leHBvcnQgY29uc3QgZ2V0R2VuZXJhdG9ycyA9IChjaHVuazogU0YyQ2h1bmssIHR5cGU6ICdwZ2VuJyB8ICdpZ2VuJyk6IEdlbmVyYXRvcltdID0+IHtcbiAgaWYgKGNodW5rLmlkICE9PSB0eXBlKSB7XG4gICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoJ1VuZXhwZWN0ZWQgY2h1bmsgSUQnLCBgJyR7dHlwZX0nYCwgYCcke2NodW5rLmlkfSdgKTtcbiAgfVxuXG4gIGlmIChjaHVuay5sZW5ndGggJSBTRl9HRU5FUkFUT1JfU0laRSkge1xuICAgIHRocm93IG5ldyBQYXJzZUVycm9yKGBJbnZhbGlkIHNpemUgZm9yIHRoZSAnJHt0eXBlfScgc3ViLWNodW5rYCk7XG4gIH1cblxuICByZXR1cm4gY2h1bmsuaXRlcmF0ZTxHZW5lcmF0b3I+KGl0ZXJhdG9yID0+IHtcbiAgICBjb25zdCBpZCA9IGl0ZXJhdG9yLmdldEludDE2KCk7XG5cbiAgICAvLyBJZ25vcmUgaW52YWxpZCBJRHNcbiAgICBpZiAoIUdlbmVyYXRvclR5cGVbaWRdKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ3BnZW4nICYmIFBSRVNFVF9UWVBFU19CTEFDS0xJU1QuaW5jbHVkZXMoaWQpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBpZiAodHlwZSA9PT0gJ2lnZW4nICYmIElOU1RSVU1FTlRfVFlQRVNfQkxBQ0tMSVNULmluY2x1ZGVzKGlkKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKFJBTkdFX1RZUEVTLmluY2x1ZGVzKGlkKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQsXG4gICAgICAgIHJhbmdlOiB7XG4gICAgICAgICAgbG86IGl0ZXJhdG9yLmdldEJ5dGUoKSxcbiAgICAgICAgICBoaTogaXRlcmF0b3IuZ2V0Qnl0ZSgpXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkLFxuICAgICAgdmFsdWU6IGl0ZXJhdG9yLmdldEludDE2QkUoKVxuICAgIH07XG4gIH0pO1xufTtcbiIsImV4cG9ydCAqIGZyb20gJy4vaW5zdHJ1bWVudHMnO1xuZXhwb3J0ICogZnJvbSAnLi9wcmVzZXRzJztcbmV4cG9ydCAqIGZyb20gJy4vc2FtcGxlcyc7XG5leHBvcnQgKiBmcm9tICcuL2dlbmVyYXRvcnMnO1xuZXhwb3J0ICogZnJvbSAnLi9tb2R1bGF0b3JzJztcbmV4cG9ydCAqIGZyb20gJy4vem9uZXMnO1xuIiwiaW1wb3J0IHsgU0YyQ2h1bmsgfSBmcm9tICd+L2NodW5rJztcbmltcG9ydCB7IFBhcnNlRXJyb3IgfSBmcm9tICd+L3JpZmYnO1xuaW1wb3J0IHsgU0ZfSU5TVFJVTUVOVF9IRUFERVJfU0laRSB9IGZyb20gJ34vY29uc3RhbnRzJztcbmltcG9ydCB7IEluc3RydW1lbnRIZWFkZXIgfSBmcm9tICd+L3R5cGVzJztcblxuLyoqXG4gKiBHZXQgYWxsIGluc3RydW1lbnQgaGVhZGVycyBmcm9tIGEgYGluc3RgIHN1Yi1jaHVuay5cbiAqXG4gKiBAcGFyYW0ge1NGMkNodW5rfSBjaHVuayAtIFRoZSBpbnB1dCBjaHVua1xuICovXG5leHBvcnQgY29uc3QgZ2V0SW5zdHJ1bWVudEhlYWRlcnMgPSAoY2h1bms6IFNGMkNodW5rKTogSW5zdHJ1bWVudEhlYWRlcltdID0+IHtcbiAgaWYgKGNodW5rLmlkICE9PSAnaW5zdCcpIHtcbiAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcignVW5leHBlY3RlZCBjaHVuayBJRCcsIGAnaW5zdCdgLCBgJyR7Y2h1bmsuaWR9J2ApO1xuICB9XG5cbiAgaWYgKGNodW5rLmxlbmd0aCAlIFNGX0lOU1RSVU1FTlRfSEVBREVSX1NJWkUpIHtcbiAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcihgSW52YWxpZCBzaXplIGZvciB0aGUgJ2luc3QnIHN1Yi1jaHVua2ApO1xuICB9XG5cbiAgcmV0dXJuIGNodW5rLml0ZXJhdGU8SW5zdHJ1bWVudEhlYWRlcj4oaXRlcmF0b3IgPT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiBpdGVyYXRvci5nZXRTdHJpbmcoKSxcbiAgICAgIGJhZ0luZGV4OiBpdGVyYXRvci5nZXRJbnQxNigpXG4gICAgfTtcbiAgfSk7XG59O1xuIiwiZXhwb3J0ICogZnJvbSAnLi9oZWFkZXJzJztcbiIsImltcG9ydCB7IFNGMkNodW5rIH0gZnJvbSAnfi9jaHVuayc7XG5pbXBvcnQgeyBNb2R1bGF0b3IsIENvbnRyb2xsZXJWYWx1ZSB9IGZyb20gJ34vdHlwZXMnO1xuaW1wb3J0IHsgUGFyc2VFcnJvciB9IGZyb20gJ34vcmlmZic7XG5pbXBvcnQgeyBTRl9NT0RVTEFUT1JfU0laRSB9IGZyb20gJ34vY29uc3RhbnRzJztcblxuLyoqXG4gKiBHZXQgdGhlIG1vZHVsYXRvciBlbnVtZXJhdG9yIHZhbHVlIGZyb20gYSAxNi1iaXQgaW50ZWdlci5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSBUaGUgMTYtYml0IGludGVnZXJcbiAqL1xuY29uc3QgZ2V0TW9kdWxhdG9yVmFsdWUgPSAodmFsdWU6IG51bWJlcik6IENvbnRyb2xsZXJWYWx1ZSA9PiB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogKHZhbHVlID4+IDEwKSAmIDB4M2YsXG4gICAgcG9sYXJpdHk6ICh2YWx1ZSA+PiA5KSAmIDEsXG4gICAgZGlyZWN0aW9uOiAodmFsdWUgPj4gOCkgJiAxLFxuICAgIHBhbGV0dGU6ICh2YWx1ZSA+PiA3KSAmIDEsXG4gICAgaW5kZXg6IHZhbHVlICYgMHg3ZlxuICB9O1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIG1vZHVsYXRvcnMgZnJvbSBlaXRoZXIgYSBgcG1vZGAgKHByZXNldHMpIG9yIGBpbW9kYCAoaW5zdHJ1bWVudHMpIGNodW5rLlxuICpcbiAqIEBwYXJhbSB7U0YyQ2h1bmt9IGNodW5rIC0gVGhlIGlucHV0IGNodW5rXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIFRoZSB0eXBlIG9mIGNodW5rLCBlaXRoZXIgJ3Btb2QnIG9yICdpbW9kJ1xuICovXG5leHBvcnQgY29uc3QgZ2V0TW9kdWxhdG9ycyA9IChjaHVuazogU0YyQ2h1bmssIHR5cGU6ICdwbW9kJyB8ICdpbW9kJyk6IE1vZHVsYXRvcltdID0+IHtcbiAgaWYgKGNodW5rLmlkICE9PSB0eXBlKSB7XG4gICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoJ1VuZXhwZWN0ZWQgY2h1bmsgSUQnLCBgJyR7dHlwZX0nYCwgYCcke2NodW5rLmlkfSdgKTtcbiAgfVxuXG4gIGlmIChjaHVuay5sZW5ndGggJSBTRl9NT0RVTEFUT1JfU0laRSkge1xuICAgIHRocm93IG5ldyBQYXJzZUVycm9yKGBJbnZhbGlkIHNpemUgZm9yIHRoZSAnJHt0eXBlfScgc3ViLWNodW5rYCk7XG4gIH1cblxuICByZXR1cm4gY2h1bmsuaXRlcmF0ZTxNb2R1bGF0b3I+KGl0ZXJhdG9yID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgc291cmNlOiBnZXRNb2R1bGF0b3JWYWx1ZShpdGVyYXRvci5nZXRJbnQxNkJFKCkpLFxuICAgICAgaWQ6IGl0ZXJhdG9yLmdldEludDE2QkUoKSxcbiAgICAgIHZhbHVlOiBpdGVyYXRvci5nZXRJbnQxNkJFKCksXG4gICAgICB2YWx1ZVNvdXJjZTogZ2V0TW9kdWxhdG9yVmFsdWUoaXRlcmF0b3IuZ2V0SW50MTZCRSgpKSxcbiAgICAgIHRyYW5zZm9ybTogaXRlcmF0b3IuZ2V0SW50MTZCRSgpXG4gICAgfTtcbiAgfSk7XG59O1xuIiwiaW1wb3J0IHsgU0YyQ2h1bmsgfSBmcm9tICd+L2NodW5rJztcbmltcG9ydCB7IFBhcnNlRXJyb3IgfSBmcm9tICd+L3JpZmYnO1xuaW1wb3J0IHsgU0ZfUFJFU0VUX0hFQURFUl9TSVpFIH0gZnJvbSAnfi9jb25zdGFudHMnO1xuaW1wb3J0IHsgUHJlc2V0SGVhZGVyIH0gZnJvbSAnfi90eXBlcyc7XG5cbi8qKlxuICogR2V0IGFsbCBwcmVzZXQgaGVhZGVycyBmcm9tIGEgYHBoZHJgIHN1Yi1jaHVuay5cbiAqXG4gKiBAcGFyYW0ge1NGMkNodW5rfSBjaHVuayAtIFRoZSBpbnB1dCBjaHVua1xuICovXG5leHBvcnQgY29uc3QgZ2V0UHJlc2V0SGVhZGVycyA9IChjaHVuazogU0YyQ2h1bmspOiBQcmVzZXRIZWFkZXJbXSA9PiB7XG4gIGlmIChjaHVuay5pZCAhPT0gJ3BoZHInKSB7XG4gICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoJ0ludmFsaWQgY2h1bmsgSUQnLCBgJ3BoZHInYCwgYCcke2NodW5rLmlkfSdgKTtcbiAgfVxuXG4gIGlmIChjaHVuay5sZW5ndGggJSBTRl9QUkVTRVRfSEVBREVSX1NJWkUpIHtcbiAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcihgSW52YWxpZCBzaXplIGZvciB0aGUgJ3BoZHInIHN1Yi1jaHVua2ApO1xuICB9XG5cbiAgcmV0dXJuIGNodW5rLml0ZXJhdGU8UHJlc2V0SGVhZGVyPihpdGVyYXRvciA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWU6IGl0ZXJhdG9yLmdldFN0cmluZygpLFxuICAgICAgcHJlc2V0OiBpdGVyYXRvci5nZXRJbnQxNigpLFxuICAgICAgYmFuazogaXRlcmF0b3IuZ2V0SW50MTYoKSxcbiAgICAgIGJhZ0luZGV4OiBpdGVyYXRvci5nZXRJbnQxNigpLFxuICAgICAgbGlicmFyeTogaXRlcmF0b3IuZ2V0VUludDMyKCksXG4gICAgICBnZW5yZTogaXRlcmF0b3IuZ2V0VUludDMyKCksXG4gICAgICBtb3JwaG9sb2d5OiBpdGVyYXRvci5nZXRVSW50MzIoKVxuICAgIH07XG4gIH0pO1xufTtcbiIsImV4cG9ydCAqIGZyb20gJy4vaGVhZGVycyc7XG4iLCJpbXBvcnQgeyBTRjJDaHVuayB9IGZyb20gJ34vY2h1bmsnO1xuaW1wb3J0IHsgUGFyc2VFcnJvciB9IGZyb20gJ34vcmlmZic7XG5pbXBvcnQgeyBTRl9TQU1QTEVfSEVBREVSX1NJWkUgfSBmcm9tICd+L2NvbnN0YW50cyc7XG5pbXBvcnQgeyBTYW1wbGVIZWFkZXIgfSBmcm9tICd+L3R5cGVzJztcblxuLyoqXG4gKiBHZXQgYWxsIHNhbXBsZSBoZWFkZXJzIGZyb20gYSBgc2hkcmAgc3ViLWNodW5rLlxuICpcbiAqIEBwYXJhbSB7U0YyQ2h1bmt9IGNodW5rIC0gVGhlIGlucHV0IGNodW5rXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRTYW1wbGVIZWFkZXJzID0gKGNodW5rOiBTRjJDaHVuayk6IFNhbXBsZUhlYWRlcltdID0+IHtcbiAgaWYgKGNodW5rLmlkICE9PSAnc2hkcicpIHtcbiAgICB0aHJvdyBuZXcgUGFyc2VFcnJvcignVW5leHBlY3RlZCBjaHVuayBJRCcsIGAnc2hkcidgLCBgJyR7Y2h1bmsuaWR9J2ApO1xuICB9XG5cbiAgaWYgKGNodW5rLmxlbmd0aCAlIFNGX1NBTVBMRV9IRUFERVJfU0laRSkge1xuICAgIHRocm93IG5ldyBQYXJzZUVycm9yKGBJbnZhbGlkIHNpemUgZm9yIHRoZSAnc2hkcicgc3ViLWNodW5rYCk7XG4gIH1cblxuICByZXR1cm4gY2h1bmsuaXRlcmF0ZTxTYW1wbGVIZWFkZXI+KGl0ZXJhdG9yID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmFtZTogaXRlcmF0b3IuZ2V0U3RyaW5nKCksXG4gICAgICBzdGFydDogaXRlcmF0b3IuZ2V0VUludDMyKCksXG4gICAgICBlbmQ6IGl0ZXJhdG9yLmdldFVJbnQzMigpLFxuICAgICAgc3RhcnRMb29wOiBpdGVyYXRvci5nZXRVSW50MzIoKSxcbiAgICAgIGVuZExvb3A6IGl0ZXJhdG9yLmdldFVJbnQzMigpLFxuICAgICAgc2FtcGxlUmF0ZTogaXRlcmF0b3IuZ2V0VUludDMyKCksXG4gICAgICBvcmlnaW5hbFBpdGNoOiBpdGVyYXRvci5nZXRCeXRlKCksXG4gICAgICBwaXRjaENvcnJlY3Rpb246IGl0ZXJhdG9yLmdldENoYXIoKSxcbiAgICAgIGxpbms6IGl0ZXJhdG9yLmdldEludDE2KCksXG4gICAgICB0eXBlOiBpdGVyYXRvci5nZXRJbnQxNigpXG4gICAgfTtcbiAgfSk7XG59O1xuIiwiZXhwb3J0ICogZnJvbSAnLi9oZWFkZXJzJztcbiIsImltcG9ydCB7IFNGMkNodW5rIH0gZnJvbSAnfi9jaHVuayc7XG5pbXBvcnQgeyBQYXJzZUVycm9yIH0gZnJvbSAnfi9yaWZmJztcbmltcG9ydCB7IFNGX0JBR19TSVpFIH0gZnJvbSAnfi9jb25zdGFudHMnO1xuaW1wb3J0IHtcbiAgR2VuZXJhdG9yLFxuICBHZW5lcmF0b3JUeXBlLFxuICBNb2R1bGF0b3IsXG4gIFpvbmUsXG4gIFpvbmVJdGVtcyxcbiAgWm9uZUl0ZW1zV2l0aFJlZmVyZW5jZSxcbiAgWm9uZU1hcFxufSBmcm9tICd+L3R5cGVzJztcblxuLyoqXG4gKiBHZXQgdGhlIHByZXNldCBvciBpbnN0cnVtZW50IHpvbmVzIGZyb20gYSBjaHVuay5cbiAqXG4gKiBAcGFyYW0ge1NGMkNodW5rfSBjaHVuayAtIFRoZSBpbnB1dCBjaHVua1xuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSBUaGUgdHlwZSBvZiBjaHVuayAoJ3BiYWcnIG9yICdpYmFnJylcbiAqL1xuZXhwb3J0IGNvbnN0IGdldFpvbmVzID0gKGNodW5rOiBTRjJDaHVuaywgdHlwZTogJ3BiYWcnIHwgJ2liYWcnKTogWm9uZVtdID0+IHtcbiAgaWYgKGNodW5rLmlkICE9PSB0eXBlKSB7XG4gICAgdGhyb3cgbmV3IFBhcnNlRXJyb3IoJ1VuZXhwZWN0ZWQgY2h1bmsgSUQnLCBgJyR7dHlwZX0nYCwgYCcke2NodW5rLmlkfSdgKTtcbiAgfVxuXG4gIGlmIChjaHVuay5sZW5ndGggJSBTRl9CQUdfU0laRSkge1xuICAgIHRocm93IG5ldyBQYXJzZUVycm9yKGBJbnZhbGlkIHNpemUgZm9yIHRoZSAnJHt0eXBlfScgc3ViLWNodW5rYCk7XG4gIH1cblxuICByZXR1cm4gY2h1bmsuaXRlcmF0ZTxab25lPihpdGVyYXRvciA9PiAoe1xuICAgIGdlbmVyYXRvckluZGV4OiBpdGVyYXRvci5nZXRJbnQxNigpLFxuICAgIG1vZHVsYXRvckluZGV4OiBpdGVyYXRvci5nZXRJbnQxNigpXG4gIH0pKTtcbn07XG5cbi8qKlxuICogR2V0IGFsbCBtb2R1bGF0b3JzLCBnZW5lcmF0b3JzIGFuZCB0aGUgaW5zdHJ1bWVudCAoZm9yIHByZXNldHMpIG9yIHNhbXBsZSAoZm9yIGluc3RydW1lbnRzKSBpbiBhXG4gKiBwcmVzZXQgb3IgaW5zdHJ1bWVudC5cbiAqXG4gKiBAdGVtcGxhdGUgVFxuICogQHRlbXBsYXRlIFJcbiAqIEBwYXJhbSB7VH0gaGVhZGVycyAtIFRoZSBwcmVzZXQgb3IgaW5zdHJ1bWVudCBoZWFkZXJzXG4gKiBAcGFyYW0ge1pvbmVbXX0gem9uZXMgLSBBbGwgem9uZXMgZm9yIHRoZSBwcmVzZXQgb3IgaW5zdHJ1bWVudFxuICogQHBhcmFtIHtNb2R1bGF0b3JbXX0gaXRlbU1vZHVsYXRvcnMgLSBBbGwgbW9kdWxhdG9ycyBmb3IgdGhlIHByZXNldCBvciBpbnN0cnVtZW50XG4gKiBAcGFyYW0ge0dlbmVyYXRvcltdfSBpdGVtR2VuZXJhdG9ycyAtIEFsbCBnZW5lcmF0b3JzIGZvciB0aGUgcHJlc2V0IG9yIGluc3RydW1lbnRcbiAqIEBwYXJhbSB7UltdfSByZWZlcmVuY2VzIC0gVGhlIGluc3RydW1lbnRzIG9yIHNhbXBsZXMgdG8gcmVmZXJlbmNlIGluIHRoZSB6b25lXG4gKiBAcGFyYW0ge0dlbmVyYXRvclR5cGV9IHJlZmVyZW5jZVR5cGUgLSBUaGUgZ2VuZXJhdG9yIHR5cGUgdG8gcmVmZXJlbmNlIGl0IGJ5XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRJdGVtc0luWm9uZSA9IDxUIGV4dGVuZHMgeyBiYWdJbmRleDogbnVtYmVyIH0sIFI+KFxuICBoZWFkZXJzOiBUW10sXG4gIHpvbmVzOiBab25lW10sXG4gIGl0ZW1Nb2R1bGF0b3JzOiBNb2R1bGF0b3JbXSxcbiAgaXRlbUdlbmVyYXRvcnM6IEdlbmVyYXRvcltdLFxuICByZWZlcmVuY2VzOiBSW10sXG4gIHJlZmVyZW5jZVR5cGU6IEdlbmVyYXRvclR5cGVcbik6IHsgaGVhZGVyOiBUOyB6b25lczogWm9uZUl0ZW1zV2l0aFJlZmVyZW5jZTxSPltdOyBnbG9iYWxab25lPzogWm9uZUl0ZW1zIH1bXSA9PiB7XG4gIGNvbnN0IGl0ZW1zOiB7IGhlYWRlcjogVDsgem9uZXM6IFpvbmVJdGVtc1dpdGhSZWZlcmVuY2U8Uj5bXTsgZ2xvYmFsWm9uZT86IFpvbmVJdGVtcyB9W10gPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBoZWFkZXIgPSBoZWFkZXJzW2ldO1xuICAgIGNvbnN0IG5leHQgPSBoZWFkZXJzW2kgKyAxXTtcblxuICAgIGNvbnN0IHN0YXJ0ID0gaGVhZGVyLmJhZ0luZGV4O1xuICAgIGNvbnN0IGVuZCA9IG5leHQgPyBuZXh0LmJhZ0luZGV4IDogem9uZXMubGVuZ3RoO1xuXG4gICAgY29uc3Qgem9uZUl0ZW1zOiBab25lSXRlbXNXaXRoUmVmZXJlbmNlPFI+W10gPSBbXTtcbiAgICBsZXQgZ2xvYmFsWm9uZTtcbiAgICBmb3IgKGxldCBqID0gc3RhcnQ7IGogPCBlbmQ7IGorKykge1xuICAgICAgY29uc3QgbW9kdWxhdG9ycyA9IGdldE1vZHVsYXRvcnMoaiwgem9uZXMsIGl0ZW1Nb2R1bGF0b3JzKTtcbiAgICAgIGNvbnN0IGdlbmVyYXRvcnMgPSBnZXRHZW5lcmF0b3JzKGosIHpvbmVzLCBpdGVtR2VuZXJhdG9ycyk7XG5cbiAgICAgIGNvbnN0IGtleVJhbmdlID1cbiAgICAgICAgZ2VuZXJhdG9yc1tHZW5lcmF0b3JUeXBlLktleVJhbmdlXSAmJiBnZW5lcmF0b3JzW0dlbmVyYXRvclR5cGUuS2V5UmFuZ2VdIS5yYW5nZTtcbiAgICAgIGNvbnN0IHJlZmVyZW5jZUlkID0gZ2VuZXJhdG9yc1tyZWZlcmVuY2VUeXBlXTtcbiAgICAgIGlmICghcmVmZXJlbmNlSWQpIHtcbiAgICAgICAgaWYgKGogLSBzdGFydCA9PT0gMCkge1xuICAgICAgICAgIC8vIGZpcnN0IGl0ZW0gd2l0aG91dCByZWZlcmVuY2UgPSBnbG9iYWwgem9uZVxuICAgICAgICAgIC8vIFNwZWMgNy4zOiBJZiBhIHByZXNldCBoYXMgbW9yZSB0aGFuIG9uZSB6b25lLCB0aGUgZmlyc3Qgem9uZSBtYXkgYmUgYSBnbG9iYWwgem9uZS5cbiAgICAgICAgICAvLyBBIGdsb2JhbCB6b25lIGlzIGRldGVybWluZWQgYnkgdGhlIGZhY3QgdGhhdCB0aGUgbGFzdCBnZW5lcmF0b3IgaW4gdGhlIGxpc3QgaXMgbm90IGFuIEluc3RydW1lbnQgZ2VuZXJhdG9yLlxuICAgICAgICAgIC8vIFNwZWMgNy45OiBcIlVubGVzcyB0aGUgem9uZSBpcyBhIGdsb2JhbCB6b25lLCB0aGUgbGFzdCBnZW5lcmF0b3IgaW4gdGhlIGxpc3QgaXMgYSDigJxzYW1wbGVJROKAnSBnZW5lcmF0b3JcIlxuICAgICAgICAgIGdsb2JhbFpvbmUgPSB7XG4gICAgICAgICAgICBrZXlSYW5nZSxcbiAgICAgICAgICAgIG1vZHVsYXRvcnMsXG4gICAgICAgICAgICBnZW5lcmF0b3JzXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVmZXJlbmNlID0gcmVmZXJlbmNlc1tyZWZlcmVuY2VJZC52YWx1ZSFdO1xuICAgICAgaWYgKCFyZWZlcmVuY2UpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHpvbmVJdGVtcy5wdXNoKHtcbiAgICAgICAga2V5UmFuZ2UsXG4gICAgICAgIG1vZHVsYXRvcnMsXG4gICAgICAgIGdlbmVyYXRvcnMsXG4gICAgICAgIHJlZmVyZW5jZVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaXRlbXMucHVzaCh7XG4gICAgICBoZWFkZXIsXG4gICAgICBnbG9iYWxab25lLFxuICAgICAgem9uZXM6IHpvbmVJdGVtc1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIGl0ZW1zO1xufTtcblxuLyoqXG4gKiBHZXQgYWxsIG1vZHVsYXRvcnMgZnJvbSBhIHpvbmUsIGJhc2VkIG9uIHRoZSBpbmRleC4gVGhlIGVuZCBpbmRleCBpcyB0aGUgbW9kdWxhdG9yIGluZGV4IG9mIHRoZVxuICogbmV4dCB6b25lLCBvciB0aGUgdG90YWwgem9uZSBsZW5ndGggaWYgdGhlIGN1cnJlbnQgem9uZSBpcyB0aGUgbGFzdCBvbmUuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4XG4gKiBAcGFyYW0ge1pvbmVbXX0gem9uZXMgLSBBTGwgem9uZXMgZm9yIHRoZSBwcmVzZXQgb3IgaW5zdHJ1bWVudFxuICogQHBhcmFtIHtNb2R1bGF0b3JbXX0gbW9kdWxhdG9ycyAtIEFsbCBtb2R1bGF0b3JzIGZvciB0aGUgcHJlc2V0IG9yIGluc3RydW1lbnRcbiAqL1xuY29uc3QgZ2V0TW9kdWxhdG9ycyA9IChcbiAgaW5kZXg6IG51bWJlcixcbiAgem9uZXM6IFpvbmVbXSxcbiAgbW9kdWxhdG9yczogTW9kdWxhdG9yW11cbik6IFpvbmVNYXA8TW9kdWxhdG9yPiA9PiB7XG4gIGNvbnN0IHpvbmUgPSB6b25lc1tpbmRleF07XG4gIGNvbnN0IG5leHQgPSB6b25lc1tpbmRleCArIDFdO1xuXG4gIGNvbnN0IHN0YXJ0ID0gem9uZS5tb2R1bGF0b3JJbmRleDtcbiAgY29uc3QgZW5kID0gbmV4dCA/IG5leHQubW9kdWxhdG9ySW5kZXggOiB6b25lcy5sZW5ndGg7XG5cbiAgcmV0dXJuIGdldFpvbmUoc3RhcnQsIGVuZCwgbW9kdWxhdG9ycyk7XG59O1xuXG4vKipcbiAqIEdldCBhbGwgZ2VuZXJhdG9ycyBmcm9tIGEgem9uZSwgYmFzZWQgb24gdGhlIGluZGV4LiBUaGUgZW5kIGluZGV4IGlzIHRoZSBnZW5lcmF0b3JzIGluZGV4IG9mIHRoZVxuICogbmV4dCB6b25lLCBvciB0aGUgdG90YWwgem9uZSBsZW5ndGggaWYgdGhlIGN1cnJlbnQgem9uZSBpcyB0aGUgbGFzdCBvbmUuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gVGhlIGluZGV4XG4gKiBAcGFyYW0ge1pvbmVbXX0gem9uZXMgLSBBTGwgem9uZXMgZm9yIHRoZSBwcmVzZXQgb3IgaW5zdHJ1bWVudFxuICogQHBhcmFtIHtHZW5lcmF0b3JbXX0gZ2VuZXJhdG9ycyAtIEFsbCBnZW5lcmF0b3JzIGZvciB0aGUgcHJlc2V0IG9yIGluc3RydW1lbnRcbiAqL1xuY29uc3QgZ2V0R2VuZXJhdG9ycyA9IChcbiAgaW5kZXg6IG51bWJlcixcbiAgem9uZXM6IFpvbmVbXSxcbiAgZ2VuZXJhdG9yczogR2VuZXJhdG9yW11cbik6IFpvbmVNYXA8R2VuZXJhdG9yPiA9PiB7XG4gIGNvbnN0IHpvbmUgPSB6b25lc1tpbmRleF07XG4gIGNvbnN0IG5leHQgPSB6b25lc1tpbmRleCArIDFdO1xuXG4gIGNvbnN0IHN0YXJ0ID0gem9uZS5nZW5lcmF0b3JJbmRleDtcbiAgY29uc3QgZW5kID0gbmV4dCA/IG5leHQuZ2VuZXJhdG9ySW5kZXggOiB6b25lcy5sZW5ndGg7XG5cbiAgcmV0dXJuIGdldFpvbmUoc3RhcnQsIGVuZCwgZ2VuZXJhdG9ycyk7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYWxsIG1vZHVsYXRvcnMgb3IgZ2VuZXJhdG9ycyBhcyBhIGtleS12YWx1ZSBvYmplY3QsIHdoZXJlIHRoZSBrZXkgaXMgdGhlIGBHZW5lcmF0b3JUeXBlYFxuICogb2YgdGhlIG1vZHVsYXRvciBvciBnZW5lcmF0b3IuXG4gKlxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCAtIFRoZSBzdGFydCBpbmRleFxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCAtIFRoZSBlbmQgaW5kZXhcbiAqIEBwYXJhbSB7VFtdfSBpdGVtcyAtIFRoZSBtb2R1bGF0b3JzIG9yIGdlbmVyYXRvcnNcbiAqL1xuY29uc3QgZ2V0Wm9uZSA9IDxUIGV4dGVuZHMgeyBpZDogR2VuZXJhdG9yVHlwZSB9PihcbiAgc3RhcnQ6IG51bWJlcixcbiAgZW5kOiBudW1iZXIsXG4gIGl0ZW1zOiBUW11cbik6IHsgW2tleSBpbiBHZW5lcmF0b3JUeXBlXT86IFQgfSA9PiB7XG4gIGNvbnN0IGl0ZW1zT2JqZWN0OiBab25lTWFwPFQ+ID0ge307XG5cbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBjb25zdCBpdGVtID0gaXRlbXNbaV07XG4gICAgaWYgKGl0ZW0pIHtcbiAgICAgIGl0ZW1zT2JqZWN0W2l0ZW0uaWRdID0gaXRlbTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaXRlbXNPYmplY3Q7XG59O1xuIiwiZXhwb3J0IGNvbnN0IFNGX1ZFUlNJT05fTEVOR1RIID0gNDtcbmV4cG9ydCBjb25zdCBTRl9QUkVTRVRfSEVBREVSX1NJWkUgPSAzODtcbmV4cG9ydCBjb25zdCBTRl9CQUdfU0laRSA9IDQ7XG5leHBvcnQgY29uc3QgU0ZfTU9EVUxBVE9SX1NJWkUgPSAxMDtcbmV4cG9ydCBjb25zdCBTRl9HRU5FUkFUT1JfU0laRSA9IDQ7XG5leHBvcnQgY29uc3QgU0ZfSU5TVFJVTUVOVF9IRUFERVJfU0laRSA9IDIyO1xuZXhwb3J0IGNvbnN0IFNGX1NBTVBMRV9IRUFERVJfU0laRSA9IDQ2O1xuXG5leHBvcnQgY29uc3QgREVGQVVMVF9TQU1QTEVfUkFURSA9IDIyMDUwO1xuXG5leHBvcnQgdHlwZSBTRl9JTkZPX0NIVU5LUyA9XG4gIHwgJ2lmaWwnXG4gIHwgJ2lzbmcnXG4gIHwgJ0lOQU0nXG4gIHwgJ2lyb20nXG4gIHwgJ2l2ZXInXG4gIHwgJ0lDUkQnXG4gIHwgJ0lFTkcnXG4gIHwgJ0lQUkQnXG4gIHwgJ0lDT1AnXG4gIHwgJ0lDTVQnXG4gIHwgJ0lTRlQnO1xuIiwiZXhwb3J0ICogZnJvbSAnLi90eXBlcyc7XG5leHBvcnQgKiBmcm9tICcuL2NodW5rJztcbmV4cG9ydCAqIGZyb20gJy4vY29uc3RhbnRzJztcbmV4cG9ydCAqIGZyb20gJy4vc291bmRGb250Mic7XG4iLCJpbXBvcnQgeyBSSUZGQ2h1bmsgfSBmcm9tICcuL3JpZmZDaHVuayc7XG5pbXBvcnQgeyBnZXRTdHJpbmdGcm9tQnVmZmVyIH0gZnJvbSAnfi91dGlscyc7XG5cbi8qKlxuICogQSB1dGlsaXR5IGNsYXNzIHRvIHF1aWNrbHkgaXRlcmF0ZSBvdmVyIGEgYnVmZmVyLlxuICovXG5leHBvcnQgY2xhc3MgQ2h1bmtJdGVyYXRvcjxUID0gYW55PiB7XG4gIHB1YmxpYyByZWFkb25seSB0YXJnZXQ6IFRbXSA9IFtdO1xuICBwcml2YXRlIHJlYWRvbmx5IGNodW5rOiBSSUZGQ2h1bms7XG4gIHByaXZhdGUgcG9zaXRpb246IG51bWJlciA9IDA7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGNodW5rOiBSSUZGQ2h1bmssIHN0YXJ0OiBudW1iZXIgPSAwKSB7XG4gICAgdGhpcy5jaHVuayA9IGNodW5rO1xuICAgIHRoaXMucG9zaXRpb24gPSBzdGFydDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHBvc2l0aW9uIGZyb20gdGhlIGl0ZXJhdG9yLlxuICAgKi9cbiAgcHVibGljIGdldCBjdXJyZW50UG9zaXRpb24oKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5wb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdGVyYXRlIG92ZXIgdGhlIGNodW5rLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAtIFRoZSBjYWxsYmFjayB0aGF0IGlzIGNhbGxlZCBldmVyeSBpdGVyYXRpb25cbiAgICovXG4gIHB1YmxpYyBpdGVyYXRlKGNhbGxiYWNrOiAoaXRlcmF0b3I6IENodW5rSXRlcmF0b3I8VD4pID0+IFQgfCBudWxsKSB7XG4gICAgd2hpbGUgKHRoaXMucG9zaXRpb24gPCB0aGlzLmNodW5rLmxlbmd0aCkge1xuICAgICAgY29uc3Qgb2JqZWN0ID0gY2FsbGJhY2sodGhpcyk7XG4gICAgICBpZiAob2JqZWN0KSB7XG4gICAgICAgIHRoaXMudGFyZ2V0LnB1c2gob2JqZWN0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgc3RyaW5nIGZyb20gdGhlIGJ1ZmZlci5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aCAtIFRoZSBsZW5ndGggb2YgdGhlIHN0cmluZy4gSWYgbm8gbGVuZ3RoIGlzIHNwZWNpZmllZCwgYSBkZWZhdWx0IG9mIDIwXG4gICAqICAgaXMgYXNzdW1lZFxuICAgKi9cbiAgcHVibGljIGdldFN0cmluZyhsZW5ndGg6IG51bWJlciA9IDIwKTogc3RyaW5nIHtcbiAgICBjb25zdCB0ZXh0ID0gZ2V0U3RyaW5nRnJvbUJ1ZmZlcih0aGlzLmdldEJ1ZmZlcih0aGlzLnBvc2l0aW9uLCBsZW5ndGgpKTtcbiAgICB0aGlzLnBvc2l0aW9uICs9IGxlbmd0aDtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBzaWduZWQgMTYtYml0IGludGVnZXIgZnJvbSB0aGUgY2h1bmsuXG4gICAqL1xuICBwdWJsaWMgZ2V0SW50MTYoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5jaHVuay5idWZmZXJbdGhpcy5wb3NpdGlvbisrXSB8ICh0aGlzLmNodW5rLmJ1ZmZlclt0aGlzLnBvc2l0aW9uKytdIDw8IDgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHNpZ25lZCAxNi1iaXQgaW50ZWdlciBmcm9tIHRoZSBjaHVuayBpbiB0aGUgYmlnLWVuZGlhbiBmb3JtYXQuXG4gICAqL1xuICBwdWJsaWMgZ2V0SW50MTZCRSgpOiBudW1iZXIge1xuICAgIHJldHVybiAodGhpcy5nZXRJbnQxNigpIDw8IDE2KSA+PiAxNjtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gdW5zaWduZWQgMzItYml0IGludGVnZXIgZnJvbSB0aGUgY2h1bmsuXG4gICAqL1xuICBwdWJsaWMgZ2V0VUludDMyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIChcbiAgICAgICh0aGlzLmNodW5rLmJ1ZmZlclt0aGlzLnBvc2l0aW9uKytdIHxcbiAgICAgICAgKHRoaXMuY2h1bmsuYnVmZmVyW3RoaXMucG9zaXRpb24rK10gPDwgOCkgfFxuICAgICAgICAodGhpcy5jaHVuay5idWZmZXJbdGhpcy5wb3NpdGlvbisrXSA8PCAxNikgfFxuICAgICAgICAodGhpcy5jaHVuay5idWZmZXJbdGhpcy5wb3NpdGlvbisrXSA8PCAyNCkpID4+PlxuICAgICAgMFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgc2luZ2xlIGJ5dGUgZnJvbSB0aGUgY2h1bmsuXG4gICAqL1xuICBwdWJsaWMgZ2V0Qnl0ZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmNodW5rLmJ1ZmZlclt0aGlzLnBvc2l0aW9uKytdO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHNpZ25lZCBjaGFyIGZyb20gdGhlIGNodW5rLlxuICAgKi9cbiAgcHVibGljIGdldENoYXIoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuY2h1bmsuYnVmZmVyW3RoaXMucG9zaXRpb24rK10gPDwgMjQpID4+IDI0O1xuICB9XG5cbiAgLyoqXG4gICAqIFNraXAgYWhlYWQgaW4gdGhlIGJ1ZmZlci5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxuICAgKi9cbiAgcHVibGljIHNraXAobGVuZ3RoOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnBvc2l0aW9uICs9IGxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBwYXJ0IG9mIHRoZSBidWZmZXIgZnJvbSBzdGFydCB0byBzdGFydCArIGxlbmd0aC5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0XG4gICAqIEBwYXJhbSB7bnVtYmVyfSBsZW5ndGhcbiAgICovXG4gIHByaXZhdGUgZ2V0QnVmZmVyKHN0YXJ0OiBudW1iZXIsIGxlbmd0aDogbnVtYmVyKTogVWludDhBcnJheSB7XG4gICAgcmV0dXJuIHRoaXMuY2h1bmsuYnVmZmVyLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbmd0aCk7XG4gIH1cbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vY2h1bmtJdGVyYXRvcic7XG5leHBvcnQgKiBmcm9tICcuL3BhcnNlRXJyb3InO1xuZXhwb3J0ICogZnJvbSAnLi9wYXJzZXInO1xuZXhwb3J0ICogZnJvbSAnLi9yaWZmQ2h1bmsnO1xuIiwiLyoqXG4gKiBFcnJvciBjbGFzcyB1c2VkIGZvciBhbGwgZXJyb3JzIGVuY291bnRlcmVkIGR1cmluZyB0aGUgcGFyc2luZyBvZiB0aGUgU291bmRGb250IDIgZmlsZS5cbiAqL1xuZXhwb3J0IGNsYXNzIFBhcnNlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihtZXNzYWdlOiBzdHJpbmcpO1xuICBwdWJsaWMgY29uc3RydWN0b3IobWVzc2FnZTogc3RyaW5nLCBleHBlY3RlZDogc3RyaW5nLCByZWNlaXZlZDogc3RyaW5nKTtcbiAgcHVibGljIGNvbnN0cnVjdG9yKG1lc3NhZ2U6IHN0cmluZywgZXhwZWN0ZWQ/OiBzdHJpbmcsIHJlY2VpdmVkPzogc3RyaW5nKSB7XG4gICAgc3VwZXIoXG4gICAgICBgJHttZXNzYWdlfSR7ZXhwZWN0ZWQgJiYgcmVjZWl2ZWQgPyBgLCBleHBlY3RlZCAke2V4cGVjdGVkfSwgcmVjZWl2ZWQgJHtyZWNlaXZlZH1gIDogYGB9YFxuICAgICk7XG4gIH1cbn1cbiIsImltcG9ydCB7IFBhcnNlRXJyb3IgfSBmcm9tICcuL3BhcnNlRXJyb3InO1xuaW1wb3J0IHsgZ2V0U3RyaW5nRnJvbUJ1ZmZlciB9IGZyb20gJ34vdXRpbHMvYnVmZmVyJztcbmltcG9ydCB7IFJJRkZDaHVuayB9IGZyb20gJy4vcmlmZkNodW5rJztcblxuLyoqXG4gKiBBdHRlbXB0cyB0byBwYXJzZSBhIFJJRkYgZmlsZSBmcm9tIGEgcmF3IGJ1ZmZlci5cbiAqXG4gKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ1ZmZlciAtIFRoZSBpbnB1dCBidWZmZXJcbiAqL1xuZXhwb3J0IGNvbnN0IHBhcnNlQnVmZmVyID0gKGJ1ZmZlcjogVWludDhBcnJheSk6IFJJRkZDaHVuayA9PiB7XG4gIGNvbnN0IGlkID0gZ2V0Q2h1bmtJZChidWZmZXIpO1xuICBpZiAoaWQgIT09ICdSSUZGJykge1xuICAgIHRocm93IG5ldyBQYXJzZUVycm9yKCdJbnZhbGlkIGZpbGUgZm9ybWF0JywgJ1JJRkYnLCBpZCk7XG4gIH1cblxuICBjb25zdCBzaWduYXR1cmUgPSBnZXRDaHVua0lkKGJ1ZmZlciwgOCk7XG4gIGlmIChzaWduYXR1cmUgIT09ICdzZmJrJykge1xuICAgIHRocm93IG5ldyBQYXJzZUVycm9yKCdJbnZhbGlkIHNpZ25hdHVyZScsICdzZmJrJywgc2lnbmF0dXJlKTtcbiAgfVxuXG4gIGNvbnN0IG5ld0J1ZmZlciA9IGJ1ZmZlci5zdWJhcnJheSg4KTtcbiAgY29uc3Qgc3ViQ2h1bmtzID0gZ2V0U3ViQ2h1bmtzKG5ld0J1ZmZlci5zdWJhcnJheSg0KSk7XG4gIHJldHVybiBuZXcgUklGRkNodW5rKGlkLCBuZXdCdWZmZXIubGVuZ3RoLCBuZXdCdWZmZXIsIHN1YkNodW5rcyk7XG59O1xuXG4vKipcbiAqIEdldCBhIFJJRkYgY2h1bmsgZnJvbSBhIGJ1ZmZlci5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyIC0gVGhlIGlucHV0IGJ1ZmZlclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IC0gV2hlcmUgdG8gc3RhcnQgcmVhZGluZyB0aGUgYnVmZmVyXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRDaHVuayA9IChidWZmZXI6IFVpbnQ4QXJyYXksIHN0YXJ0OiBudW1iZXIpOiBSSUZGQ2h1bmsgPT4ge1xuICBjb25zdCBpZCA9IGdldENodW5rSWQoYnVmZmVyLCBzdGFydCk7XG4gIGNvbnN0IGxlbmd0aCA9IGdldENodW5rTGVuZ3RoKGJ1ZmZlciwgc3RhcnQgKyA0KTtcblxuICAvLyBSSUZGIGFuZCBMSVNUIGNodW5rcyBjYW4gaGF2ZSBzdWItY2h1bmtzXG4gIGxldCBzdWJDaHVua3M6IFJJRkZDaHVua1tdID0gW107XG4gIGlmIChpZCA9PT0gJ1JJRkYnIHx8IGlkID09PSAnTElTVCcpIHtcbiAgICBzdWJDaHVua3MgPSBnZXRTdWJDaHVua3MoYnVmZmVyLnN1YmFycmF5KHN0YXJ0ICsgMTIpKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgUklGRkNodW5rKGlkLCBsZW5ndGgsIGJ1ZmZlci5zdWJhcnJheShzdGFydCArIDgpLCBzdWJDaHVua3MpO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGxlbmd0aCBvZiBhIGNodW5rLCBiYXNlZCBvbiB0aGUgUklGRiBsZW5ndGggc3BlY2lmaWVyLlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgLSBUaGUgaW5wdXQgYnVmZmVyXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgLSBXaGVyZSB0byBzdGFydCByZWFkaW5nIHRoZSBidWZmZXIgZm9yIHRoZSBsZW5ndGhcbiAqL1xuZXhwb3J0IGNvbnN0IGdldENodW5rTGVuZ3RoID0gKGJ1ZmZlcjogVWludDhBcnJheSwgc3RhcnQ6IG51bWJlcikgPT4ge1xuICBidWZmZXIgPSBidWZmZXIuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgNCk7XG5cbiAgcmV0dXJuIChidWZmZXJbMF0gfCAoYnVmZmVyWzFdIDw8IDgpIHwgKGJ1ZmZlclsyXSA8PCAxNikgfCAoYnVmZmVyWzNdIDw8IDI0KSkgPj4+IDA7XG59O1xuXG4vKipcbiAqIEdldCBhbGwgc3ViLWNodW5rcyBpbiBhIGJ1ZmZlci4gVGhpcyB3aWxsIHJlYWQgdW50aWwgdGhlIGVuZCBvZiB0aGUgYnVmZmVyIGFuZCByZXR1cm4gYW55XG4gKiBzdWItY2h1bmtzIGZvdW5kIGluIGl0LlxuICpcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgLSBUaGUgaW5wdXQgYnVmZmVyXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRTdWJDaHVua3MgPSAoYnVmZmVyOiBVaW50OEFycmF5KTogUklGRkNodW5rW10gPT4ge1xuICBjb25zdCBjaHVua3M6IFJJRkZDaHVua1tdID0gW107XG4gIGxldCBpbmRleCA9IDA7XG5cbiAgd2hpbGUgKGluZGV4IDw9IGJ1ZmZlci5sZW5ndGggLSA4KSB7XG4gICAgY29uc3Qgc3ViQ2h1bmsgPSBnZXRDaHVuayhidWZmZXIsIGluZGV4KTtcbiAgICBjaHVua3MucHVzaChzdWJDaHVuayk7XG5cbiAgICBpbmRleCArPSA4ICsgc3ViQ2h1bmsubGVuZ3RoO1xuICAgIGluZGV4ID0gaW5kZXggJSAyID8gaW5kZXggKyAxIDogaW5kZXg7XG4gIH1cblxuICByZXR1cm4gY2h1bmtzO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGNodW5rIElEIChmb3VyQ0MpIGZyb20gdGhlIGJ1ZmZlci4gVGhpcyBhc3N1bWVzIHRoZSBmb3VyQ0MgY29kZSBpcyBmb3JtYXR0ZWQgYXMgYW4gVVRGLThcbiAqIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyIC0gVGhlIGlucHV0IGJ1ZmZlclxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IC0gV2hlcmUgdG8gc3RhcnQgcmVhZGluZyB0aGUgY2h1bmsgSUQgZnJvbSB0aGUgYnVmZmVyXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRDaHVua0lkID0gKGJ1ZmZlcjogVWludDhBcnJheSwgc3RhcnQ6IG51bWJlciA9IDApID0+IHtcbiAgcmV0dXJuIGdldFN0cmluZ0Zyb21CdWZmZXIoYnVmZmVyLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIDQpKTtcbn07XG4iLCJpbXBvcnQgeyBDaHVua0l0ZXJhdG9yIH0gZnJvbSAnLi9jaHVua0l0ZXJhdG9yJztcbmltcG9ydCB7IGdldFN0cmluZ0Zyb21CdWZmZXIgfSBmcm9tICd+L3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIFJJRkZDaHVuayB7XG4gIC8qKlxuICAgKiBUaGUgY2h1bmsgSUQgKGZvdXJDQykuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaWQ6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIGxlbmd0aCBvZiB0aGUgY2h1bmsuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgbGVuZ3RoOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSByYXcgYnVmZmVyIG9mIHRoZSBjaHVuay5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBidWZmZXI6IFVpbnQ4QXJyYXk7XG5cbiAgLyoqXG4gICAqIFRoZSBzdWItY2h1bmtzIG9mIHRoZSBjaHVuay4gSWYgdGhlIGNodW5rIGlzIG5vdCBhIFJJRkYgb3IgTElTVCBjaHVuaywgdGhpcyB3aWxsIGJlIGFuIGVtcHR5XG4gICAqIGFycmF5LlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHN1YkNodW5rczogUklGRkNodW5rW107XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKGlkOiBzdHJpbmcsIGxlbmd0aDogbnVtYmVyLCBidWZmZXI6IFVpbnQ4QXJyYXksIHN1YkNodW5rczogUklGRkNodW5rW10pIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5idWZmZXIgPSBidWZmZXI7XG4gICAgdGhpcy5zdWJDaHVua3MgPSBzdWJDaHVua3M7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgc3RyaW5nIGZyb20gdGhlIGJ1ZmZlci4gSWYgbm8gcG9zaXRpb24gYW5kIG5vIGxlbmd0aCBpcyBzcGVjaWZpZWQsIGl0IHJldHVybnMgdGhlIHdob2xlXG4gICAqIGJ1ZmZlciBhcyBhIHN0cmluZy5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtwb3NpdGlvbl1cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGhdXG4gICAqL1xuICBwdWJsaWMgZ2V0U3RyaW5nKHBvc2l0aW9uOiBudW1iZXIgPSAwLCBsZW5ndGg/OiBudW1iZXIpOiBzdHJpbmcge1xuICAgIHJldHVybiBnZXRTdHJpbmdGcm9tQnVmZmVyKHRoaXMuZ2V0QnVmZmVyKHBvc2l0aW9uLCBsZW5ndGggfHwgdGhpcy5sZW5ndGggLSBwb3NpdGlvbikpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIHNpZ25lZCAxNi1iaXQgaW50ZWdlciBmcm9tIHRoZSBidWZmZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbcG9zaXRpb25dXG4gICAqL1xuICBwdWJsaWMgZ2V0SW50MTYocG9zaXRpb246IG51bWJlciA9IDApOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmJ1ZmZlcltwb3NpdGlvbisrXSB8ICh0aGlzLmJ1ZmZlcltwb3NpdGlvbl0gPDwgOCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIHVuc2lnbmVkIDMyLWJpdCBpbnRlZ2VyIGZyb20gdGhlIGJ1ZmZlci5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtwb3NpdGlvbl1cbiAgICovXG4gIHB1YmxpYyBnZXRVSW50MzIocG9zaXRpb246IG51bWJlciA9IDApOiBudW1iZXIge1xuICAgIHJldHVybiAoXG4gICAgICAodGhpcy5idWZmZXJbcG9zaXRpb24rK10gfFxuICAgICAgICAodGhpcy5idWZmZXJbcG9zaXRpb24rK10gPDwgOCkgfFxuICAgICAgICAodGhpcy5idWZmZXJbcG9zaXRpb24rK10gPDwgMTYpIHxcbiAgICAgICAgKHRoaXMuYnVmZmVyW3Bvc2l0aW9uXSA8PCAyNCkpID4+PlxuICAgICAgMFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgYnl0ZSBmcm9tIHRoZSBidWZmZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbcG9zaXRpb25dXG4gICAqL1xuICBwdWJsaWMgZ2V0Qnl0ZShwb3NpdGlvbjogbnVtYmVyID0gMCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYnVmZmVyW3Bvc2l0aW9uXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBjaGFyIGZyb20gdGhlIGJ1ZmZlci5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtwb3NpdGlvbl1cbiAgICovXG4gIHB1YmxpYyBnZXRDaGFyKHBvc2l0aW9uOiBudW1iZXIgPSAwKTogbnVtYmVyIHtcbiAgICByZXR1cm4gKHRoaXMuYnVmZmVyW3Bvc2l0aW9uXSA8PCAyNCkgPj4gMjQ7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgY2h1bmsgaXRlcmF0b3IgZm9yIHRoZSBjaHVuay5cbiAgICpcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydF0gLSBUaGUgcG9zaXRpb24gd2hlcmUgdG8gc3RhcnQgaXRlcmF0aW5nLiBEZWZhdWx0cyB0byAwLlxuICAgKi9cbiAgcHVibGljIGl0ZXJhdG9yPFQgPSBhbnk+KHN0YXJ0OiBudW1iZXIgPSAwKTogQ2h1bmtJdGVyYXRvcjxUPiB7XG4gICAgcmV0dXJuIG5ldyBDaHVua0l0ZXJhdG9yPFQ+KHRoaXMsIHN0YXJ0KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIHF1aWNrbHkgaXRlcmF0ZSBvdmVyIGEgZnVuY3Rpb24uXG4gICAqXG4gICAqIEB0ZW1wbGF0ZSBUXG4gICAqIEBwYXJhbSB7KGl0ZXJhdG9yOiBDaHVua0l0ZXJhdG9yKTogVH0gY2FsbGJhY2sgLSBUaGUgY2FsbGJhY2sgdGhhdCByZXR1cm5zIGFuIGluc3RhbmNlIG9mIHRoZVxuICAgKiAgIHNwZWNpZmllZCByZXR1cm4gdHlwZVxuICAgKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0XSAtIFRoZSBvcHRpb25hbCBpbmRleCB3aGVyZSB0byBzdGFydCBpdGVyYXRpbmcgb3ZlciB0aGUgY2h1bmtcbiAgICovXG4gIHB1YmxpYyBpdGVyYXRlPFQgPSBhbnk+KGNhbGxiYWNrOiAoaXRlcmF0b3I6IENodW5rSXRlcmF0b3IpID0+IFQgfCBudWxsLCBzdGFydDogbnVtYmVyID0gMCk6IFRbXSB7XG4gICAgY29uc3QgaXRlcmF0b3IgPSBuZXcgQ2h1bmtJdGVyYXRvcjxUPih0aGlzLCBzdGFydCk7XG4gICAgaXRlcmF0b3IuaXRlcmF0ZShjYWxsYmFjayk7XG4gICAgcmV0dXJuIGl0ZXJhdG9yLnRhcmdldDtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBidWZmZXIgZnJvbSBgc3RhcnRgIHRvIGBzdGFydGAgKyBgbGVuZ3RoYC4gVGhlIGJ1ZmZlciBpcyBub3QgY29waWVkIChlLmcuIHdoZW4gdXNpbmdcbiAgICogLnNsaWNlKCkpLCBzbyBhbnkgbW9kaWZpY2F0aW9ucyB0byB0aGUgYnVmZmVyIGFyZSBkb25lIHRvIHRoZSBvcmlnaW5hbCBidWZmZXIgdG9vLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gc3RhcnRcbiAgICogQHBhcmFtIHtudW1iZXJ9IGxlbmd0aFxuICAgKi9cbiAgcHJpdmF0ZSBnZXRCdWZmZXIoc3RhcnQ6IG51bWJlciwgbGVuZ3RoOiBudW1iZXIpOiBVaW50OEFycmF5IHtcbiAgICByZXR1cm4gdGhpcy5idWZmZXIuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuZ3RoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHtcbiAgQmFuayxcbiAgR2VuZXJhdG9yVHlwZSxcbiAgSW5zdHJ1bWVudCxcbiAgS2V5LFxuICBNZXRhRGF0YSxcbiAgUHJlc2V0LFxuICBQcmVzZXREYXRhLFxuICBTYW1wbGUsXG4gIFpvbmVJdGVtc1xufSBmcm9tICcuL3R5cGVzJztcbmltcG9ydCB7IFNGMkNodW5rIH0gZnJvbSAnLi9jaHVuayc7XG5pbXBvcnQgeyBwYXJzZUJ1ZmZlciwgUGFyc2VFcnJvciB9IGZyb20gJy4vcmlmZic7XG5pbXBvcnQgeyBnZXRJdGVtc0luWm9uZSB9IGZyb20gJy4vY2h1bmtzJztcbmltcG9ydCB7IG1lbW9pemUgfSBmcm9tICcuL3V0aWxzJztcblxuZXhwb3J0IGNsYXNzIFNvdW5kRm9udDIge1xuICAvKipcbiAgICogQ3JlYXRlIGEgbmV3IGBTb3VuZEZvbnQyYCBpbnN0YW5jZSBmcm9tIGEgcmF3IGlucHV0IGJ1ZmZlci5cbiAgICpcbiAgICogQHBhcmFtIHtVaW50OEFycmF5fSBidWZmZXJcbiAgICogQGRlcHJlY2F0ZWQgUmVwbGFjZWQgd2l0aCBgbmV3IFNvdW5kRm9udDIoYnVmZmVyOiBVaW50OEFycmF5KTtgXG4gICAqL1xuICBwdWJsaWMgc3RhdGljIGZyb20oYnVmZmVyOiBVaW50OEFycmF5KTogU291bmRGb250MiB7XG4gICAgcmV0dXJuIG5ldyBTb3VuZEZvbnQyKGJ1ZmZlcik7XG4gIH1cblxuICAvKipcbiAgICogVGhlIHJhdyBSSUZGIGNodW5rIGRhdGEuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgY2h1bms6IFNGMkNodW5rO1xuXG4gIC8qKlxuICAgKiBUaGUgbWV0YSBkYXRhLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IG1ldGFEYXRhOiBNZXRhRGF0YTtcblxuICAvKipcbiAgICogVGhlIHJhdyBzYW1wbGUgZGF0YS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBzYW1wbGVEYXRhOiBVaW50OEFycmF5O1xuXG4gIC8qKlxuICAgKiBUaGUgcGFyc2VkIHNhbXBsZXMuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgc2FtcGxlczogU2FtcGxlW107XG5cbiAgLyoqXG4gICAqIFRoZSB1bnBhcnNlZCBwcmVzZXQgZGF0YS5cbiAgICovXG4gIHB1YmxpYyByZWFkb25seSBwcmVzZXREYXRhOiBQcmVzZXREYXRhO1xuXG4gIC8qKlxuICAgKiBUaGUgcGFyc2VkIGluc3R1bWVudHMuXG4gICAqL1xuICBwdWJsaWMgcmVhZG9ubHkgaW5zdHJ1bWVudHM6IEluc3RydW1lbnRbXTtcblxuICAvKipcbiAgICogVGhlIHBhcnNlZCBwcmVzZXRzLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IHByZXNldHM6IFByZXNldFtdO1xuXG4gIC8qKlxuICAgKiBUaGUgcGFyc2VkIGJhbmtzLlxuICAgKi9cbiAgcHVibGljIHJlYWRvbmx5IGJhbmtzOiBCYW5rW107XG5cbiAgLyoqXG4gICAqIExvYWQgYSBTb3VuZEZvbnQyIGZpbGUgZnJvbSBhIGBVaW50OEFycmF5YCBvciBhIGBTRjJDaHVua2AuIFRoZSByZWNvbW1lbmRlZCB3YXkgaXMgdG8gdXNlIGFcbiAgICogVWludDhBcnJheSwgbG9hZGluZyBhIFNvdW5kRm9udDIgZnJvbSBhIGBTRjJDaHVua2Agb25seSBleGlzdHMgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5IGFuZFxuICAgKiB3aWxsIGxpa2VseSBiZSByZW1vdmVkIGluIGEgZnV0dXJlIHZlcnNpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7VWludDhBcnJheXxTRjJDaHVua30gY2h1bmtcbiAgICovXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihjaHVuazogVWludDhBcnJheSB8IFNGMkNodW5rKSB7XG4gICAgaWYgKCEoY2h1bmsgaW5zdGFuY2VvZiBTRjJDaHVuaykpIHtcbiAgICAgIGNvbnN0IHBhcnNlZEJ1ZmZlciA9IHBhcnNlQnVmZmVyKGNodW5rKTtcbiAgICAgIGNodW5rID0gbmV3IFNGMkNodW5rKHBhcnNlZEJ1ZmZlcik7XG4gICAgfVxuXG4gICAgaWYgKGNodW5rLnN1YkNodW5rcy5sZW5ndGggIT09IDMpIHtcbiAgICAgIHRocm93IG5ldyBQYXJzZUVycm9yKFxuICAgICAgICAnSW52YWxpZCBzZmJrIHN0cnVjdHVyZScsXG4gICAgICAgICczIGNodW5rcycsXG4gICAgICAgIGAke2NodW5rLnN1YkNodW5rcy5sZW5ndGh9IGNodW5rc2BcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5jaHVuayA9IGNodW5rO1xuICAgIHRoaXMubWV0YURhdGEgPSBjaHVuay5zdWJDaHVua3NbMF0uZ2V0TWV0YURhdGEoKTtcbiAgICB0aGlzLnNhbXBsZURhdGEgPSBjaHVuay5zdWJDaHVua3NbMV0uZ2V0U2FtcGxlRGF0YSgpO1xuICAgIHRoaXMucHJlc2V0RGF0YSA9IGNodW5rLnN1YkNodW5rc1syXS5nZXRQcmVzZXREYXRhKCk7XG5cbiAgICB0aGlzLnNhbXBsZXMgPSB0aGlzLmdldFNhbXBsZXMoKTtcbiAgICB0aGlzLmluc3RydW1lbnRzID0gdGhpcy5nZXRJbnN0cnVtZW50cygpO1xuICAgIHRoaXMucHJlc2V0cyA9IHRoaXMuZ2V0UHJlc2V0cygpO1xuICAgIHRoaXMuYmFua3MgPSB0aGlzLmdldEJhbmtzKCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBrZXkgZGF0YSBieSBNSURJIGJhbmssIHByZXNldCBhbmQga2V5IG51bWJlci4gTWF5IHJldHVybiBudWxsIGlmIG5vIGluc3RydW1lbnQgd2FzXG4gICAqIGZvdW5kIGZvciB0aGUgZ2l2ZW4gaW5wdXRzLiBOb3RlIHRoYXQgdGhpcyBkb2VzIG5vdCBwcm9jZXNzIGFueSBvZiB0aGUgZ2VuZXJhdG9ycyB0aGF0IGFyZVxuICAgKiBzcGVjaWZpYyB0byB0aGUga2V5IG51bWJlci5cbiAgICpcbiAgICogVGhlIHJlc3VsdCBpcyBtZW1vaXplZCBiYXNlZCBvbiBhbGwgYXJndW1lbnRzLCB0byBwcmV2ZW50IGhhdmluZyB0byBjaGVjayBhbGwgcHJlc2V0cyxcbiAgICogaW5zdHJ1bWVudHMgZXRjLiBldmVyeSB0aW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge251bWJlcn0gbWVtb2l6ZWRLZXlOdW1iZXIgLSBUaGUgTUlESSBrZXkgbnVtYmVyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbbWVtb2l6ZWRCYW5rTnVtYmVyXSAtIFRoZSBiYW5rIGluZGV4IG51bWJlciwgZGVmYXVsdHMgdG8gMFxuICAgKiBAcGFyYW0ge251bWJlcn0gW21lbW9pemVkUHJlc2V0TnVtYmVyXSAtIFRoZSBwcmVzZXQgbnVtYmVyLCBkZWZhdWx0cyB0byAwXG4gICAqL1xuICBwdWJsaWMgZ2V0S2V5RGF0YShcbiAgICBtZW1vaXplZEtleU51bWJlcjogbnVtYmVyLFxuICAgIG1lbW9pemVkQmFua051bWJlcjogbnVtYmVyID0gMCxcbiAgICBtZW1vaXplZFByZXNldE51bWJlcjogbnVtYmVyID0gMFxuICApOiBLZXkgfCBudWxsIHtcbiAgICAvLyBHZXQgYSBtZW1vaXplZCB2ZXJzaW9uIG9mIHRoZSBmdW5jdGlvblxuICAgIHJldHVybiBtZW1vaXplKChrZXlOdW1iZXI6IG51bWJlciwgYmFua051bWJlcjogbnVtYmVyLCBwcmVzZXROdW1iZXI6IG51bWJlcik6IEtleSB8IG51bGwgPT4ge1xuICAgICAgY29uc3QgYmFuayA9IHRoaXMuYmFua3NbYmFua051bWJlcl07XG4gICAgICBpZiAoYmFuaykge1xuICAgICAgICBjb25zdCBwcmVzZXQgPSBiYW5rLnByZXNldHNbcHJlc2V0TnVtYmVyXTtcbiAgICAgICAgaWYgKHByZXNldCkge1xuICAgICAgICAgIGNvbnN0IHByZXNldFpvbmVzID0gcHJlc2V0LnpvbmVzLmZpbHRlcih6b25lID0+IHRoaXMuaXNLZXlJblJhbmdlKHpvbmUsIGtleU51bWJlcikpO1xuICAgICAgICAgIGlmIChwcmVzZXRab25lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHByZXNldFpvbmUgb2YgcHJlc2V0Wm9uZXMpIHtcbiAgICAgICAgICAgICAgY29uc3QgaW5zdHJ1bWVudCA9IHByZXNldFpvbmUuaW5zdHJ1bWVudDtcbiAgICAgICAgICAgICAgY29uc3QgaW5zdHJ1bWVudFpvbmVzID0gaW5zdHJ1bWVudC56b25lcy5maWx0ZXIoem9uZSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuaXNLZXlJblJhbmdlKHpvbmUsIGtleU51bWJlcilcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaWYgKGluc3RydW1lbnRab25lcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpbnN0cnVtZW50Wm9uZSBvZiBpbnN0cnVtZW50Wm9uZXMpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHNhbXBsZSA9IGluc3RydW1lbnRab25lLnNhbXBsZTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRvcnMgPSB7IC4uLnByZXNldFpvbmUuZ2VuZXJhdG9ycywgLi4uaW5zdHJ1bWVudFpvbmUuZ2VuZXJhdG9ycyB9O1xuICAgICAgICAgICAgICAgICAgY29uc3QgbW9kdWxhdG9ycyA9IHsgLi4ucHJlc2V0Wm9uZS5tb2R1bGF0b3JzLCAuLi5pbnN0cnVtZW50Wm9uZS5tb2R1bGF0b3JzIH07XG4gICAgXG4gICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBrZXlOdW1iZXIsXG4gICAgICAgICAgICAgICAgICAgIHByZXNldCxcbiAgICAgICAgICAgICAgICAgICAgaW5zdHJ1bWVudCxcbiAgICAgICAgICAgICAgICAgICAgc2FtcGxlLFxuICAgICAgICAgICAgICAgICAgICBnZW5lcmF0b3JzLFxuICAgICAgICAgICAgICAgICAgICBtb2R1bGF0b3JzXG4gICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9KShtZW1vaXplZEtleU51bWJlciwgbWVtb2l6ZWRCYW5rTnVtYmVyLCBtZW1vaXplZFByZXNldE51bWJlcik7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGEgTUlESSBrZXkgbnVtYmVyIGlzIGluIHRoZSByYW5nZSBvZiBhIHpvbmUuXG4gICAqXG4gICAqIEBwYXJhbSB7Wm9uZUl0ZW1zfSB6b25lIC0gVGhlIHpvbmUgdG8gY2hlY2tcbiAgICogQHBhcmFtIHtudW1iZXJ9IGtleU51bWJlciAtIFRoZSBNSURJIGtleSBudW1iZXIsIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAxMjdcbiAgICovXG4gIHByaXZhdGUgaXNLZXlJblJhbmdlKHpvbmU6IFpvbmVJdGVtcywga2V5TnVtYmVyOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgem9uZS5rZXlSYW5nZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAoem9uZS5rZXlSYW5nZS5sbyA8PSBrZXlOdW1iZXIgJiYgem9uZS5rZXlSYW5nZS5oaSA+PSBrZXlOdW1iZXIpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSB0aGUgcHJlc2V0cyB0byBiYW5rcy5cbiAgICovXG4gIHByaXZhdGUgZ2V0QmFua3MoKTogQmFua1tdIHtcbiAgICByZXR1cm4gdGhpcy5wcmVzZXRzLnJlZHVjZTxCYW5rW10+KCh0YXJnZXQsIHByZXNldCkgPT4ge1xuICAgICAgY29uc3QgYmFua051bWJlciA9IHByZXNldC5oZWFkZXIuYmFuaztcblxuICAgICAgaWYgKCF0YXJnZXRbYmFua051bWJlcl0pIHtcbiAgICAgICAgdGFyZ2V0W2JhbmtOdW1iZXJdID0ge1xuICAgICAgICAgIHByZXNldHM6IFtdXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHRhcmdldFtiYW5rTnVtYmVyXS5wcmVzZXRzW3ByZXNldC5oZWFkZXIucHJlc2V0XSA9IHByZXNldDtcbiAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfSwgW10pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIHRoZSByYXcgcHJlc2V0IGRhdGEgdG8gcHJlc2V0cy5cbiAgICovXG4gIHByaXZhdGUgZ2V0UHJlc2V0cygpOiBQcmVzZXRbXSB7XG4gICAgY29uc3QgeyBwcmVzZXRIZWFkZXJzLCBwcmVzZXRab25lcywgcHJlc2V0R2VuZXJhdG9ycywgcHJlc2V0TW9kdWxhdG9ycyB9ID0gdGhpcy5wcmVzZXREYXRhO1xuXG4gICAgY29uc3QgcHJlc2V0cyA9IGdldEl0ZW1zSW5ab25lKFxuICAgICAgcHJlc2V0SGVhZGVycyxcbiAgICAgIHByZXNldFpvbmVzLFxuICAgICAgcHJlc2V0TW9kdWxhdG9ycyxcbiAgICAgIHByZXNldEdlbmVyYXRvcnMsXG4gICAgICB0aGlzLmluc3RydW1lbnRzLFxuICAgICAgR2VuZXJhdG9yVHlwZS5JbnN0cnVtZW50XG4gICAgKTtcblxuICAgIHJldHVybiBwcmVzZXRzXG4gICAgICAuZmlsdGVyKHByZXNldCA9PiBwcmVzZXQuaGVhZGVyLm5hbWUgIT09ICdFT1AnKVxuICAgICAgLm1hcChwcmVzZXQgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhlYWRlcjogcHJlc2V0LmhlYWRlcixcbiAgICAgICAgICBnbG9iYWxab25lOiBwcmVzZXQuZ2xvYmFsWm9uZSxcbiAgICAgICAgICB6b25lczogcHJlc2V0LnpvbmVzLm1hcCh6b25lID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGtleVJhbmdlOiB6b25lLmtleVJhbmdlLFxuICAgICAgICAgICAgICBnZW5lcmF0b3JzOiB6b25lLmdlbmVyYXRvcnMsXG4gICAgICAgICAgICAgIG1vZHVsYXRvcnM6IHpvbmUubW9kdWxhdG9ycyxcbiAgICAgICAgICAgICAgaW5zdHJ1bWVudDogem9uZS5yZWZlcmVuY2VcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSlcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlIHRoZSByYXcgaW5zdHJ1bWVudCBkYXRhIChmb3VuZCBpbiB0aGUgcHJlc2V0IGRhdGEpIHRvIGluc3RydW1lbnRzLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRJbnN0cnVtZW50cygpOiBJbnN0cnVtZW50W10ge1xuICAgIGNvbnN0IHtcbiAgICAgIGluc3RydW1lbnRIZWFkZXJzLFxuICAgICAgaW5zdHJ1bWVudFpvbmVzLFxuICAgICAgaW5zdHJ1bWVudE1vZHVsYXRvcnMsXG4gICAgICBpbnN0cnVtZW50R2VuZXJhdG9yc1xuICAgIH0gPSB0aGlzLnByZXNldERhdGE7XG5cbiAgICBjb25zdCBpbnN0cnVtZW50cyA9IGdldEl0ZW1zSW5ab25lKFxuICAgICAgaW5zdHJ1bWVudEhlYWRlcnMsXG4gICAgICBpbnN0cnVtZW50Wm9uZXMsXG4gICAgICBpbnN0cnVtZW50TW9kdWxhdG9ycyxcbiAgICAgIGluc3RydW1lbnRHZW5lcmF0b3JzLFxuICAgICAgdGhpcy5zYW1wbGVzLFxuICAgICAgR2VuZXJhdG9yVHlwZS5TYW1wbGVJZFxuICAgICk7XG5cbiAgICByZXR1cm4gaW5zdHJ1bWVudHNcbiAgICAgIC5maWx0ZXIoaW5zdHJ1bWVudCA9PiBpbnN0cnVtZW50LmhlYWRlci5uYW1lICE9PSAnRU9JJylcbiAgICAgIC5tYXAoaW5zdHJ1bWVudCA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaGVhZGVyOiBpbnN0cnVtZW50LmhlYWRlcixcbiAgICAgICAgICBnbG9iYWxab25lOiBpbnN0cnVtZW50Lmdsb2JhbFpvbmUsXG4gICAgICAgICAgem9uZXM6IGluc3RydW1lbnQuem9uZXMubWFwKHpvbmUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAga2V5UmFuZ2U6IHpvbmUua2V5UmFuZ2UsXG4gICAgICAgICAgICAgIGdlbmVyYXRvcnM6IHpvbmUuZ2VuZXJhdG9ycyxcbiAgICAgICAgICAgICAgbW9kdWxhdG9yczogem9uZS5tb2R1bGF0b3JzLFxuICAgICAgICAgICAgICBzYW1wbGU6IHpvbmUucmVmZXJlbmNlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXJzZSB0aGUgcmF3IHNhbXBsZSBkYXRhIGFuZCBzYW1wbGUgaGVhZGVycyB0byBzYW1wbGVzLlxuICAgKi9cbiAgcHJpdmF0ZSBnZXRTYW1wbGVzKCk6IFNhbXBsZVtdIHtcbiAgICByZXR1cm4gdGhpcy5wcmVzZXREYXRhLnNhbXBsZUhlYWRlcnNcbiAgICAgIC5maWx0ZXIoc2FtcGxlID0+IHNhbXBsZS5uYW1lICE9PSAnRU9TJylcbiAgICAgIC5tYXAoaGVhZGVyID0+IHtcbiAgICAgICAgLy8gU2FtcGxlIHJhdGUgbXVzdCBiZSBhYm92ZSAwXG4gICAgICAgIGlmIChoZWFkZXIubmFtZSAhPT0gJ0VPUycgJiYgaGVhZGVyLnNhbXBsZVJhdGUgPD0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBJbGxlZ2FsIHNhbXBsZSByYXRlIG9mICR7aGVhZGVyLnNhbXBsZVJhdGV9IGh6IGluIHNhbXBsZSAnJHtoZWFkZXIubmFtZX0nYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPcmlnaW5hbCBwaXRjaCBjYW5ub3QgYmUgYmV0d2VlbiAxMjggYW5kIDI1NFxuICAgICAgICBpZiAoaGVhZGVyLm9yaWdpbmFsUGl0Y2ggPj0gMTI4ICYmIGhlYWRlci5vcmlnaW5hbFBpdGNoIDw9IDI1NCkge1xuICAgICAgICAgIGhlYWRlci5vcmlnaW5hbFBpdGNoID0gNjA7XG4gICAgICAgIH1cblxuICAgICAgICBoZWFkZXIuc3RhcnRMb29wIC09IGhlYWRlci5zdGFydDtcbiAgICAgICAgaGVhZGVyLmVuZExvb3AgLT0gaGVhZGVyLnN0YXJ0O1xuXG4gICAgICAgIC8vIFR1cm5zIHRoZSBVaW50OEFycmF5IGludG8gYSBJbnQxNkFycmF5XG4gICAgICAgIGNvbnN0IGRhdGEgPSBuZXcgSW50MTZBcnJheShcbiAgICAgICAgICBuZXcgVWludDhBcnJheSh0aGlzLnNhbXBsZURhdGEuc3ViYXJyYXkoaGVhZGVyLnN0YXJ0ICogMiwgaGVhZGVyLmVuZCAqIDIpKS5idWZmZXJcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhlYWRlcixcbiAgICAgICAgICBkYXRhXG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgfVxufVxuIiwiLyoqXG4gKiBHZW5lcmF0b3IgKG9yIG1vZHVsYXRvcikgdHlwZXMuIFRoZXNlIGFyZSBkZWZpbmVkIGluIGEgc3BlY2lmaWMgb3JkZXIsIGZvbGxvd2luZyB0aGUgc3BlYy4gVGhlXG4gKiBlbnVtIElEIGNvcnJlc3BvbmRzIHdpdGggdGhlIElEIGluIHRoZSBzcGVjLCBzbyB0aGUgdW51c2VkIGFuZCByZXNlcnZlZCBmaWVsZHMgc2hvdWxkIG5vdCBiZVxuICogcmVtb3ZlZC5cbiAqL1xuZXhwb3J0IGVudW0gR2VuZXJhdG9yVHlwZSB7XG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IGluIHNhbXBsZSBkYXRhIHBvaW50cyBiZXlvbmQgdGhlIGBzdGFydGAgc2FtcGxlIGhlYWRlci5cbiAgICovXG4gIFN0YXJ0QWRkcnNPZmZzZXQsXG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgaW4gc2FtcGxlIGRhdGEgcG9pbnRzIGJleW9uZCB0aGUgYGVuZGAgc2FtcGxlIGhlYWRlci5cbiAgICovXG4gIEVuZEFkZHJzT2Zmc2V0LFxuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IGluIHNhbXBsZSBkYXRhIHBvaW50cyBiZXlvbmQgdGhlIGBzdGFydExvb3BgIHNhbXBsZSBoZWFkZXIgdG8gdGhlIGZpcnN0IHNhbXBsZSBkYXRhXG4gICAqIHBvaW50IHRvIGJlIHJlcGVhdGVkIGluIHRoZSBsb29wIGZvciB0aGUgaW5zdHJ1bWVudC5cbiAgICovXG4gIFN0YXJ0TG9vcEFkZHJzT2Zmc2V0LFxuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IGluIHNhbXBsZSBkYXRhIHBvaW50cyBiZXlvbmQgdGhlIGBlbmRMb29wYCBzYW1wbGUgaGVhZGVyIHRvIHRoZSBzYW1wbGUgZGF0YSBwb2ludFxuICAgKiBjb25zaWRlcmVkIGVxdWl2YWxlbnQgdG8gdGhlIGBzdGFydExvb3BgIHNhbXBsZSBkYXRhIHBvaW50IGZvciB0aGUgbG9vcCBmb3IgdGhpcyBpbnN0cnVtZW50LlxuICAgKi9cbiAgRW5kTG9vcEFkZHJzT2Zmc2V0LFxuXG4gIC8qKlxuICAgKiBUaGUgb2Zmc2V0IGluIDMyNzY4IHNhbXBsZSBkYXRhIHBvaW50IGluY3JlbWVudHMgYmV5b25kIHRoZSBgc3RhcnRgIHNhbXBsZSBoZWFkZXIgYW5kIHRoZVxuICAgKiBmaXJzdCBzYW1wbGUgZGF0YSBwb2ludCB0byBiZSBwbGF5ZWQgaW4gdGhlIGluc3RydW1lbnQuXG4gICAqL1xuICBTdGFydEFkZHJzQ29hcnNlT2Zmc2V0LFxuXG4gIC8qKlxuICAgKiBUaGUgZGVncmVlIChpbiBjZW50cykgdG8gd2hpY2ggYSBmdWxsIHNjYWxlIGV4Y3Vyc2lvbiBvZiB0aGUgbW9kdWxhdGlvbiBMRk8gd2lsbCBpbmZsdWVuY2UgdGhlXG4gICAqIHBpdGNoLlxuICAgKi9cbiAgTW9kTEZPVG9QaXRjaCxcblxuICAvKipcbiAgICogVGhlIGRlZ3JlZSAoaW4gY2VudHMpIHRvIHdoaWNoIGEgZnVsbCBzY2FsZSBleGN1cnNpb24gb2YgdGhlIHZpYnJhdG8gTEZPIHdpbGwgaW5mbHVlbmNlIHRoZVxuICAgKiBwaXRjaC5cbiAgICovXG4gIFZpYkxGT1RvUGl0Y2gsXG5cbiAgLyoqXG4gICAqIFRoZSBkZWdyZWUgKGluIGNlbnRzKSB0byB3aGljaCBhIGZ1bGwgc2NhbGUgZXhjdXJzaW9uIG9mIHRoZSBtb2R1bGF0aW9uIGVudmVsb3BlIHdpbGxcbiAgICogaW5mbHVlbmNlIHBpdGNoLlxuICAgKi9cbiAgTW9kRW52VG9QaXRjaCxcblxuICAvKipcbiAgICogVGhlIGN1dG9mZiBhbmQgcmVzb25hbnQgZnJlcXVlbmN5IG9mIHRoZSBsb3dwYXNzIGZpbHRlciBpbiBhYnNvbHV0ZSBjZW50IHVuaXRzLlxuICAgKi9cbiAgSW5pdGlhbEZpbHRlckZjLFxuXG4gIC8qKlxuICAgKiBUaGUgaGVpZ2h0IGFib3ZlIERDIGdhaW4gaW4gY2VudGliZWxzIHdoaWNoIHRoZSBmaWx0ZXIgcmVzb25hbmNlIGV4aGliaXRzIGF0IHRoZSBjdXRvZmZcbiAgICogbGF0ZW5jeS5cbiAgICovXG4gIEluaXRpYWxGaWx0ZXJRLFxuXG4gIC8qKlxuICAgKiBUaGUgZGVncmVlIChpbiBjZW50cykgdG8gd2hpY2ggYSBmdWxsIHNjYWxlIGV4Y3Vyc2lvbiBvZiB0aGUgbW9kdWxhdGlvbiBMRk8gd2lsbCBpbmZsdWVuY2UgdGhlXG4gICAqIGZpbHRlciBjdXRvZmYgZnJlcXVlbmN5LlxuICAgKi9cbiAgTW9kTEZPVG9GaWx0ZXJGYyxcblxuICAvKipcbiAgICogVGhlIGRlZ3JlZSAoaW4gY2VudHMpIHRvIHdoaWNoIGEgZnVsbCBzY2FsZSBleGN1cnNpb24gb2YgdGhlIG1vZHVsYXRpb24gZW52ZWxvcGUgd2lsbFxuICAgKiBpbmZsdWVuY2UgdGhlIGZpbHRlciBjdXRvZmYgZnJlcXVlbmN5LlxuICAgKi9cbiAgTW9kRW52VG9GaWx0ZXJGYyxcblxuICAvKipcbiAgICogVGhlIG9mZnNldCBpbiAzMjc2OCBzYW1wbGUgZGF0YSBwb2ludCBpbmNyZW1lbnRzIGJleW9uZCB0aGUgYGVuZGAgc2FtcGxlIGhlYWRlciBhbmQgdGhlIGxhc3RcbiAgICogc2FtcGxlIGRhdGEgcG9pbnQgdG8gYmUgcGxheWVkIGluIHRoaXMgaW5zdHJ1bWVudC5cbiAgICovXG4gIEVuZEFkZHJzQ29hcnNlT2Zmc2V0LFxuXG4gIC8qKlxuICAgKiBUaGUgZGVncmVlIChpbiBjZW50aWJlbHMpIHRvIHdoaWNoIGEgZnVsbCBzY2FsZSBleGN1cnNpb24gb2YgdGhlIG1vZHVsYXRpb24gTEZPIHdpbGwgaW5mbHVlbmNlXG4gICAqIHZvbHVtZS5cbiAgICovXG4gIE1vZExGT1RvVm9sdW1lLFxuXG4gIC8qKlxuICAgKiBVbnVzZWQgZ2VuZXJhdG9yLiBJZiB0aGlzIGdlbmVyYXRvciBpcyBlbmNvdW50ZXJlZCwgaXQgc2hvdWxkIGJlIGlnbm9yZWQuXG4gICAqL1xuICBVbnVzZWQxLFxuXG4gIC8qKlxuICAgKiBUaGUgZGVncmVlIChpbiAwLjElIHVuaXRzKSB0byB3aGljaCB0aGUgYXVkaW8gb3V0cHV0IG9mIHRoZSBub3RlIGlzIHNlbnQgdG8gdGhlIGNob3J1cyBlZmZlY3RzXG4gICAqIHByb2Nlc3Nvci5cbiAgICovXG4gIENob3J1c0VmZmVjdHNTZW5kLFxuXG4gIC8qKlxuICAgKiBUaGUgZGVncmVlIChpbiAwLjElIHVuaXRzKSB0byB3aGljaCB0aGUgYXVkaW8gb3V0cHV0IG9mIHRoZSBub3RlIGlzIHNlbnQgdG8gdGhlIHJldmVyYiBlZmZlY3RzXG4gICAqIHByb2Nlc3Nvci5cbiAgICovXG4gIFJldmVyYkVmZmVjdHNTZW5kLFxuXG4gIC8qKlxuICAgKiBUaGUgZGVncmVlIChpbiAwLjElIHVuaXRzKSB0byB3aGljaCB0aGUgZHJ5IGF1ZGlvIG91dHB1dCBvZiB0aGUgbm90ZSBpcyBwb3NpdGlvbmVkIHRvIHRoZSBsZWZ0XG4gICAqIG9yIHJpZ2h0IG91dHB1dC5cbiAgICovXG4gIFBhbixcblxuICAvKipcbiAgICogVW51c2VkIGdlbmVyYXRvci4gSWYgdGhpcyBnZW5lcmF0b3IgaXMgZW5jb3VudGVyZWQsIGl0IHNob3VsZCBiZSBpZ25vcmVkLlxuICAgKi9cbiAgVW51c2VkMixcblxuICAvKipcbiAgICogVW51c2VkIGdlbmVyYXRvci4gSWYgdGhpcyBnZW5lcmF0b3IgaXMgZW5jb3VudGVyZWQsIGl0IHNob3VsZCBiZSBpZ25vcmVkLlxuICAgKi9cbiAgVW51c2VkMyxcblxuICAvKipcbiAgICogVW51c2VkIGdlbmVyYXRvci4gSWYgdGhpcyBnZW5lcmF0b3IgaXMgZW5jb3VudGVyZWQsIGl0IHNob3VsZCBiZSBpZ25vcmVkLlxuICAgKi9cbiAgVW51c2VkNCxcblxuICAvKipcbiAgICogVGhlIGRlbGF5IHRpbWUgKGluIGFic29sdXRlIHRpbWVjZW50cykgZnJvbSBrZXkgb24gdW50aWwgdGhlIG1vZHVsYXRpb24gTEZPIGJlZ2lucyBpdHMgdXB3YXJkXG4gICAqIHJhbXAgZnJvbSB6ZXJvIHZhbHVlLiBBIHZhbHVlIG9mIHplcm8gaW5kaWNhdGVzIGEgb25lIHNlY29uZCBkZWxheS5cbiAgICovXG4gIERlbGF5TW9kTEZPLFxuXG4gIC8qKlxuICAgKiBUaGUgZnJlcXVlbmN5IChpbiBhYnNvbHV0ZSBjZW50cykgb2YgdGhlIG1vZHVsYXRpb24gTEZPJ3MgdHJpYW5ndWxhciBwZXJpb2QuIEEgdmFsdWUgb2YgMFxuICAgKiBpbmRpY2F0ZXMgYSBmcmVxdWVuY3kgb2YgOC4xNzYgSHouXG4gICAqL1xuICBGcmVxTW9kTEZPLFxuXG4gIC8qKlxuICAgKiBUaGUgZGVsYXkgdGltZSAoaW4gYWJzb2x1dGUgdGltZWNlbnRzKSBmcm9tIGtleSBvbiB1bnRpbCB0aGUgdmlicmF0byBMRk8gYmVnaW5zIGl0cyB1cHdhcmRzXG4gICAqIHJhbXAgZnJvbSB6ZXJvIHZhbHVlLiBBIHZhbHVlIG9mIHplcm8gaW5kaWNhdGVzIGEgb25lIHNlY29uZCBkZWxheS5cbiAgICovXG4gIERlbGF5VmliTEZPLFxuXG4gIC8qKlxuICAgKiBUaGUgZnJlcXVlbmN5IChpbiBhYnNvbHV0ZSBjZW50cykgb2YgdGhlIHZpYnJhdG8gTEZPJ3MgdHJpYW5ndWxhciBwZXJpb2QuIEEgdmFsdWUgb2YgemVyb1xuICAgKiBpbmRpY2F0ZXMgYSBmcmVxdWVuY3kgb2YgOC4xNzYgSHouXG4gICAqL1xuICBGcmVxVmliTEZPLFxuXG4gIC8qKlxuICAgKiBUaGUgZGVsYXkgdGltZSAoaW4gYWJzb2x1dGUgdGltZWNlbnRzKSBiZXR3ZWVuIGtleSBvbiBhbmQgdGhlIHN0YXJ0IG9mIHRoZSBhdHRhY2sgcGhhc2Ugb24gdGhlXG4gICAqIG1vZHVsYXRpb24gZW52ZWxvcGUuIEEgdmFsdWUgb2YgemVybyBpbmRpY2F0ZXMgYSBvbmUgc2Vjb25kIGRlbGF5LlxuICAgKi9cbiAgRGVsYXlNb2RFbnYsXG5cbiAgLyoqXG4gICAqIFRoZSB0aW1lIChpbiBhYnNvbHV0ZSB0aW1lY2VudHMpIGZyb20gdGhlIGVuZCBvZiB0aGUgbW9kdWxhdGlvbiBlbnZlbG9wZSBkZWxheSB0aW1lIHVudGlsIHRoZVxuICAgKiBwb2ludCBhdCB3aGljaCB0aGUgbW9kdWxhdGlvbiBlbnZlbG9wZSB2YWx1ZSByZWFjaGVzIGl0cyBwZWFrLlxuICAgKi9cbiAgQXR0YWNrTW9kRW52LFxuXG4gIC8qKlxuICAgKiBUaGUgdGltZSAoaW4gYWJzb2x1dGUgdGltZWNlbnRzKSBmcm9tIHRoZSBlbmQgb2YgdGhlIGF0dGFjayBwaGFzZSB0byB0aGUgZW50cnkgaW50byBkZWNheVxuICAgKiBwaGFzZSwgZHVyaW5nIHdoaWNoIHRoZSBlbnZlbG9wZSB2YWx1ZSBpcyBoZWxkIGF0IGl0cyBwZWFrLiBBIHZhbHVlIG9mIHplcm8gaW5kaWNhdGVzIGEgb25lXG4gICAqIHNlY29uZCBob2xkIHRpbWUuXG4gICAqL1xuICBIb2xkTW9kRW52LFxuXG4gIC8qKlxuICAgKiBUaGUgdGltZSAoaW4gYWJzb2x1dGUgdGltZWNlbnRzKSBmb3IgYSAxMDAlIGNoYW5nZSBpbiB0aGUgbW9kdWxhdGlvbiBlbnZlbG9wZSB2YWx1ZSBkdXJpbmdcbiAgICogZGVjYXkgcGhhc2UuXG4gICAqL1xuICBEZWNheU1vZEVudixcblxuICAvKipcbiAgICogVGhlIGRlY3JlYXNlIGluIGxldmVsIChleHByZXNzZWQgaW4gMC4xJSB1bml0cykgdG8gd2hpY2ggdGhlIG1vZHVsYXRpb24gZW52ZWxvcGUgcmFtcHMgZHVyaW5nXG4gICAqIHRoZSBkZWNheSBwaGFzZS5cbiAgICovXG4gIFN1c3RhaW5Nb2RFbnYsXG5cbiAgLyoqXG4gICAqIFRoZSB0aW1lIChpbiBhYnNvbHV0ZSB0aW1lY2VudHMpIGZvciBhIDEwMCUgY2hhbmdlIGluIHRoZSBtb2R1bGF0aW9uIGVudmVsb3BlIHZhbHVlIGR1cmluZ1xuICAgKiByZWxlYXNlIHBoYXNlLlxuICAgKi9cbiAgUmVsZWFzZU1vZEVudixcblxuICAvKipcbiAgICogVGhlIGRlZ3JlZSAoaW4gdGltZWNlbnRzIHBlciBrZXkgbnVtYmVyIHVuaXRzKSB0byB3aGljaCB0aGUgaG9sZCB0aW1lIG9mIHRoZSBtb2R1bGF0aW9uXG4gICAqIGVudmVsb3BlIGlzIGRlY3JlYXNlZCBieSBpbmNyZWFzaW5nIHRoZSBNSURJIGtleSBudW1iZXIuXG4gICAqL1xuICBLZXlOdW1Ub01vZEVudkhvbGQsXG5cbiAgLyoqXG4gICAqIFRoZSBkZWdyZWUgKGluIHRpbWVjZW50cyBwZXIga2V5IG51bWJlciB1bml0cykgdG8gd2hpY2ggdGhlIGhvbGQgdGltZSBvZiB0aGUgbW9kdWxhdGlvblxuICAgKiBlbnZlbG9wZSBpcyBkZWNyZWFzZWQgYnkgaW5jcmVhc2luZyB0aGUgTUlESSBrZXkgbnVtYmVyLlxuICAgKi9cbiAgS2V5TnVtVG9Nb2RFbnZEZWNheSxcblxuICAvKipcbiAgICogVGhlIGRlbGF5IHRpbWUgKGluIGFic29sdXRlIHRpbWVjZW50cykgYmV0d2VlbiBrZXkgb24gYW5kIHRoZSBzdGFydCBvZiB0aGUgYXR0YWNrIHBoYXNlIG9mIHRoZVxuICAgKiB2b2x1bWUgZW52ZWxvcGUuIEEgdmFsdWUgb2YgemVybyBpbmRpY2F0ZXMgYSBvbmUgc2Vjb25kIGRlbGF5LlxuICAgKi9cbiAgRGVsYXlWb2xFbnYsXG5cbiAgLyoqXG4gICAqIFRoZSBkZWxheSB0aW1lIChpbiBhYnNvbHV0ZSB0aW1lY2VudHMpIGZyb20gdGhlIGVuZCBvZiB0aGUgdm9sdW1lIGVudmVsb3BlIGRlbGF5IHRpbWUgdW50aWxcbiAgICogdGhlIHBvaW50IGF0IHdoaWNoIHRoZSB2b2x1bWUgZW52ZWxvcGUgdmFsdWUgcmVhY2hlcyBpdHMgcGVhay5cbiAgICovXG4gIEF0dGFja1ZvbEVudixcblxuICAvKipcbiAgICogVGhlIHRpbWUgKGluIGFic29sdXRlIHRpbWVjZW50cykgZnJvbSB0aGUgZW5kIG9mIHRoZSBhdHRhY2sgcGhhc2UgdG8gdGhlIGVudHJ5IGludG8gZGVjYXlcbiAgICogcGhhc2UgZHVyaW5nIHdoaWNoIHRoZSB2b2x1bWUgZW52ZWxvcGUgdmFsdWUgaXMgaGVsZCBhdCBpdHMgcGVhay4gQSB2YWx1ZSBvZiB6ZXJvIGluZGljYXRlcyBhXG4gICAqIG9uZSBzZWNvbmQgaG9sZCB0aW1lLlxuICAgKi9cbiAgSG9sZFZvbEVudixcblxuICAvKipcbiAgICogVGhlIHRpbWUgKGluIGFic29sdXRlIHRpbWVjZW50cykgZm9yIGEgMTAwJSBjaGFuZ2UgaW4gdGhlIHZvbHVtZSBlbnZlbG9wZSB2YWx1ZSBkdXJpbmcgZGVjYXlcbiAgICogcGhhc2UuXG4gICAqL1xuICBEZWNheVZvbEVudixcblxuICAvKipcbiAgICogVGhlIGRlY3JlYXNlIGluIGxldmVsIChleHByZXNzZWQgaW4gY2VudGliZWxzKSB0byB3aGljaCB0aGUgdm9sdW1lIGVudmVsb3BlIHZhbHVlIHJhbXBzIGR1cmluZ1xuICAgKiB0aGUgZGVjYXkgcGhhc2UuXG4gICAqL1xuICBTdXN0YWluVm9sRW52LFxuXG4gIC8qKlxuICAgKiBUaGUgdGltZSAoaW4gYWJzb2x1dGUgY2VudGliZWxzKSBmb3IgYSAxMDAlIGNoYW5nZSBpbiB0aGUgdm9sdW1lIGVudmVsb3BlIGR1cmluZyByZWxlYXNlXG4gICAqIHBoYXNlLiBBIHZhbHVlIG9mIHplcm8gaW5kaWNhdGVzIGEgb25lIHNlY29uZCBkZWNheSB0aW1lLlxuICAgKi9cbiAgUmVsZWFzZVZvbEVudixcblxuICAvKipcbiAgICogVGhlIGRlZ3JlZSAoaW4gdGltZWNlbnRzIHBlciBrZXkgbnVtYmVyIHVuaXRzKSB0byB3aGljaCB0aGUgaG9sZCB0aW1lIG9mIHRoZSB2b2x1bWUgZW52ZWxvcGVcbiAgICogaXMgaW5jcmVhc2VkIGJ5IGluY3JlYXNpbmcgdGhlIE1JREkga2V5IG51bWJlci5cbiAgICovXG4gIEtleU51bVRvVm9sRW52SG9sZCxcblxuICAvKipcbiAgICogVGhlIGRlZ3JlZSAoaW4gdGltZWNlbnRzIHBlciBrZXkgbnVtYmVyIHVuaXRzKSB0byB3aGljaCB0aGUgaG9sZCB0aW1lIG9mIHRoZSB2b2x1bWUgZW52ZWxvcGVcbiAgICogaXMgZGVjcmVhc2VkIGJ5IGluY3JlYXNpbmcgdGhlIE1JREkga2V5IG51bWJlci5cbiAgICovXG4gIEtleU51bVRvVm9sRW52RGVjYXksXG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIGFuIGluc3RydW1lbnQgaW4gdGhlIGBJTlNUYCBzdWItY2h1bmsuIFRoaXMgZ2VuZXJhdG9yIGFuZCBgU2FtcGxlSWRgIGFyZSB0aGUgb25seVxuICAgKiBJbmRleCBnZW5lcmF0b3JzLlxuICAgKi9cbiAgSW5zdHJ1bWVudCxcblxuICAvKipcbiAgICogVW51c2VkIGdlbmVyYXRvciwgcmVzZXJ2ZWQgZm9yIGZ1dHVyZSBpbXBsZW1lbnRhdGlvbi4gSWYgdGhpcyBnZW5lcmF0b3IgaXMgZW5jb3VudGVyZWQsIGl0XG4gICAqIHNob3VsZCBiZSBpZ25vcmVkLlxuICAgKi9cbiAgUmVzZXJ2ZWQxLFxuXG4gIC8qKlxuICAgKiBUaGUga2V5IHJhbmdlIHRoYXQgdGhlIHByZXNldCBvciBpbnN0cnVtZW50IHpvbmUgYXBwbGllcyB0by4gVGhpcyBnZW5lcmF0b3IgYW5kIGBWZWxSYW5nZWAgYXJlXG4gICAqIHRoZSBvbmx5IFJhbmdlIGdlbmVyYXRvcnMuXG4gICAqL1xuICBLZXlSYW5nZSxcblxuICAvKipcbiAgICogVGhlIHZlbG9jaXR5IHJhbmdlIHRoYXQgdGhlIHByZXNldCBvciBpbnN0cnVtZW50IHpvbmUgYXBwbGllcyB0by4gVGhpcyBnZW5lcmF0b3IgYW5kXG4gICAqIGBLZXlSYW5nZWAgYXJlIHRoZSBvbmx5IFJhbmdlIGdlbmVyYXRvcnMuXG4gICAqL1xuICBWZWxSYW5nZSxcblxuICAvKipcbiAgICogVGhlIG9mZnNldCBpbiAzMjc2OCBzYW1wbGUgZGF0YSBwb2ludCBpbmNyZW1lbnRzIGJleW9uZCB0aGUgYHN0YXJ0TG9vcGAgc2FtcGxlIGhlYWRlciBhbmQgdGhlXG4gICAqIGZpcnN0IHNhbXBsZSBkYXRhIHBvaW50IHRvIGJlIHJlcGVhdGVkIGluIHRoaXMgaW5zdHJ1bWVudCdzIGxvb3AuXG4gICAqL1xuICBTdGFydExvb3BBZGRyc0NvYXJzZU9mZnNldCxcblxuICAvKipcbiAgICogRm9yY2VzIHRoZSBNSURJIGtleSBudW1iZXIgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgdGhlIHZhbHVlIGdpdmVuLiBUaGlzIGNhbiBvbmx5IGFwcGVhciBhdFxuICAgKiBpbnN0cnVtZW50IGxldmVsIGFuZCBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTI3LlxuICAgKi9cbiAgS2V5TnVtLFxuXG4gIC8qKlxuICAgKiBGb3JjZXMgdGhlIE1JREkgdmVsb2NpdHkgdG8gYmUgaW50ZXJwcmV0ZWQgYXMgdGhlIHZhbHVlIGdpdmVuLiBUaGlzIGNhbiBvbmx5IGFwcGVhciBhdFxuICAgKiBpbnN0cnVtZW50IGxldmVsIGFuZCBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMTI3LlxuICAgKi9cbiAgVmVsb2NpdHksXG5cbiAgLyoqXG4gICAqIFRoZSBhdHRlbnVhdGlvbiAoaW4gY2VudGliZWxzKSBieSB3aGljaCBhIG5vdGUgaXMgYXR0ZW51YXRlZCBiZWxvdyBmdWxsIHNjYWxlLlxuICAgKi9cbiAgSW5pdGlhbEF0dGVudWF0aW9uLFxuXG4gIC8qKlxuICAgKiBVbnVzZWQgZ2VuZXJhdG9yLCByZXNlcnZlZCBmb3IgZnV0dXJlIGltcGxlbWVudGF0aW9uLiBJZiB0aGlzIGdlbmVyYXRvciBpcyBlbmNvdW50ZXJlZCwgaXRcbiAgICogc2hvdWxkIGJlIGlnbm9yZWQuXG4gICAqL1xuICBSZXNlcnZlZDIsXG5cbiAgLyoqXG4gICAqIFRoZSBvZmZzZXQgaW4gMzI3Njggc2FtcGxlIGRhdGEgcG9pbnQgaW5jcmVtZW50cyBiZXlvbmQgdGhlIGBlbmRMb29wYCBzYW1wbGUgaGVhZGVyIHRvIHRoZVxuICAgKiBzYW1wbGUgZGF0YSBwb2ludCBjb25zaWRlcmVkIGVxdWl2YWxlbnQgdG8gdGhlIGBzdGFydExvb3BgLlxuICAgKi9cbiAgRW5kTG9vcEFkZHJzQ29hcnNlT2Zmc2V0LFxuXG4gIC8qKlxuICAgKiBUaGUgcGl0Y2ggb2Zmc2V0IChpbiBzZW1pdG9uZXMpIHdoaWNoIHNob3VsZCBiZSBhcHBsaWVkIHRvIHRoZSBub3RlLiBJdCBpcyBhZGRpdGl2ZSB3aXRoXG4gICAqIGBGaW5lVHVuZWAuXG4gICAqL1xuICBDb2Fyc2VUdW5lLFxuXG4gIC8qKlxuICAgKiBUaGUgcGl0Y2ggb2Zmc2V0IChpbiBjZW50cykgd2hpY2ggc2hvdWxkIGJlIGFwcGxpZWQgdG8gdGhlIG5vdGUuIEl0IGlzIGFkZGl0aXZlIHdpdGhcbiAgICogYENvYXJzZVR1bmVgLlxuICAgKi9cbiAgRmluZVR1bmUsXG5cbiAgLyoqXG4gICAqIEluZGV4IG9mIGEgc2FtcGxlIGluIHRoZSBgU0hEUmAgc3ViLWNodW5rLiBUaGlzIGdlbmVyYXRvciBhbmQgYEluc3RydW1lbnRgIGFyZSB0aGUgb25seSBJbmRleFxuICAgKiBnZW5lcmF0b3JzLlxuICAgKi9cbiAgU2FtcGxlSWQsXG5cbiAgLyoqXG4gICAqIFRoZSB2YWx1ZSB3aGljaCBnaXZlcyBhIHZhcmlldHkgb2YgYm9vbGVhbiBmbGFncyBkZXNjcmliaW5nIHRoZSBzYW1wbGUgZm9yIHRoZSBjdXJyZW50XG4gICAqIGluc3RydW1lbnQgem9uZS4gQSB6ZXJvIGluZGljYXRlcyBhIHNvdW5kIHJlcHJvZHVjZWQgd2l0aCBubyBsb29wLCBvbmUgaW5kaWNhdGVzIGEgc291bmQgd2hpY2hcbiAgICogbG9vcHMgY29udGludW91c2x5IGFuZCB0aHJlZSBpbmRpY2F0ZXMgYSBzb3VuZCB3aGljaCBsb29wcyBmb3IgdGhlIGR1cmF0aW9uIG9mIGtleSBkZXByZXNzaW9uLFxuICAgKiB0aGVuIHByb2NlZWRzIHRvIHBsYXkgdGhlIHJlbWFpbmRlciBvZiB0aGUgc2FtcGxlLlxuICAgKi9cbiAgU2FtcGxlTW9kZXMsXG5cbiAgLyoqXG4gICAqIFVudXNlZCBnZW5lcmF0b3IsIHJlc2VydmVkIGZvciBmdXR1cmUgaW1wbGVtZW50YXRpb24uIElmIHRoaXMgZ2VuZXJhdG9yIGlzIGVuY291bnRlcmVkLCBpdFxuICAgKiBzaG91bGQgYmUgaWdub3JlZC5cbiAgICovXG4gIFJlc2VydmVkMyxcblxuICAvKipcbiAgICogVGhlIGRlZ3JlZSB0byB3aGljaCB0aGUgTUlESSBrZXkgbnVtYmVyIGluZmx1ZW5jZXMgcGl0Y2guXG4gICAqL1xuICBTY2FsZVR1bmluZyxcblxuICAvKipcbiAgICogVGhlIGNhcGFiaWxpdHkgZm9yIGtleSBkZXByZXNzaW9uIGluIGEgZ2l2ZW4gaW5zdHJ1bWVudCB0byB0ZXJtaW5hdGUgdGhlIHBsYXliYWNrIG9mIG90aGVyXG4gICAqIGluc3RydW1lbnRzLlxuICAgKi9cbiAgRXhjbHVzaXZlQ2xhc3MsXG5cbiAgLyoqXG4gICAqIFRoZSBNSURJIGtleSBudW1iZXIgYXQgd2hpY2ggdGhlIHNhbXBsZSBpcyB0byBiZSBwbGF5ZWQgYmFjayBhdCBpdHMgb3JpZ2luYWwgc2FtcGxlIHJhdGUuIElmXG4gICAqIG5vdCBwcmVzZW50LCBvciBpZiBwcmVzZW50IHdpdGggYSB2YWx1ZSBvZiAtMSwgdGhlIHNhbXBsZSBoZWFkZXIgcGFyYW1ldGVyIG9yaWdpbmFsIGtleSBpc1xuICAgKiB1c2VkIGluIGl0cyBwbGFjZS5cbiAgICovXG4gIE92ZXJyaWRpbmdSb290S2V5LFxuXG4gIC8qKlxuICAgKiBVbnVzZWQgZ2VuZXJhdG9yLiBJZiB0aGlzIGdlbmVyYXRvciBpcyBlbmNvdW50ZXJlZCwgaXQgc2hvdWxkIGJlIGlnbm9yZWQuXG4gICAqL1xuICBVbnVzZWQ1LFxuXG4gIC8qKlxuICAgKiBVbnVzZWQgZ2VuZXJhdG9yLiBJZiB0aGlzIGdlbmVyYXRvciBpcyBlbmNvdW50ZXJlZCwgaXQgc2hvdWxkIGJlIGlnbm9yZWQuXG4gICAqL1xuICBFbmRPcGVyXG59XG5cbi8qKlxuICogQWxsIHVudXNlZCBnZW5lcmF0b3JzLlxuICovXG5leHBvcnQgdHlwZSBVbnVzZWRHZW5lcmF0b3IgPVxuICB8IEdlbmVyYXRvclR5cGUuVW51c2VkMVxuICB8IEdlbmVyYXRvclR5cGUuVW51c2VkMlxuICB8IEdlbmVyYXRvclR5cGUuVW51c2VkM1xuICB8IEdlbmVyYXRvclR5cGUuVW51c2VkNFxuICB8IEdlbmVyYXRvclR5cGUuVW51c2VkNVxuICB8IEdlbmVyYXRvclR5cGUuUmVzZXJ2ZWQxXG4gIHwgR2VuZXJhdG9yVHlwZS5SZXNlcnZlZDJcbiAgfCBHZW5lcmF0b3JUeXBlLlJlc2VydmVkM1xuICB8IEdlbmVyYXRvclR5cGUuRW5kT3BlcjtcblxuLyoqXG4gKiBBbGwgcmFuZ2UgZ2VuZXJhdG9ycy5cbiAqL1xuZXhwb3J0IHR5cGUgUmFuZ2VHZW5lcmF0b3IgPSBHZW5lcmF0b3JUeXBlLktleVJhbmdlIHwgR2VuZXJhdG9yVHlwZS5WZWxSYW5nZTtcblxuLyoqXG4gKiBBbGwgaW5kZXggZ2VuZXJhdG9ycy5cbiAqL1xuZXhwb3J0IHR5cGUgSW5kZXhHZW5lcmF0b3IgPSBHZW5lcmF0b3JUeXBlLkluc3RydW1lbnQgfCBHZW5lcmF0b3JUeXBlLlNhbXBsZUlkO1xuXG4vKipcbiAqIEFsbCB2YWx1ZSBnZW5lcmF0b3JzLlxuICovXG5leHBvcnQgdHlwZSBWYWx1ZUdlbmVyYXRvciA9IEV4Y2x1ZGU8XG4gIEdlbmVyYXRvclR5cGUsXG4gIFVudXNlZEdlbmVyYXRvciB8IFJhbmdlR2VuZXJhdG9yIHwgSW5kZXhHZW5lcmF0b3Jcbj47XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgdmFsdWUgZm9yIGFsbCBnZW5lcmF0b3IgdHlwZXMgKHdoZXJlIGFwcGxpY2FibGUpLlxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9HRU5FUkFUT1JfVkFMVUVTOiB7IFtrZXkgaW4gVmFsdWVHZW5lcmF0b3JdOiBudW1iZXIgfSA9IHtcbiAgW0dlbmVyYXRvclR5cGUuU3RhcnRBZGRyc09mZnNldF06IDAsXG4gIFtHZW5lcmF0b3JUeXBlLkVuZEFkZHJzT2Zmc2V0XTogMCxcbiAgW0dlbmVyYXRvclR5cGUuU3RhcnRMb29wQWRkcnNPZmZzZXRdOiAwLFxuICBbR2VuZXJhdG9yVHlwZS5FbmRMb29wQWRkcnNPZmZzZXRdOiAwLFxuICBbR2VuZXJhdG9yVHlwZS5TdGFydEFkZHJzQ29hcnNlT2Zmc2V0XTogMCxcbiAgW0dlbmVyYXRvclR5cGUuTW9kTEZPVG9QaXRjaF06IDAsXG4gIFtHZW5lcmF0b3JUeXBlLlZpYkxGT1RvUGl0Y2hdOiAwLFxuICBbR2VuZXJhdG9yVHlwZS5Nb2RFbnZUb1BpdGNoXTogMCxcbiAgW0dlbmVyYXRvclR5cGUuSW5pdGlhbEZpbHRlckZjXTogMTM1MDAsXG4gIFtHZW5lcmF0b3JUeXBlLkluaXRpYWxGaWx0ZXJRXTogMCxcbiAgW0dlbmVyYXRvclR5cGUuTW9kTEZPVG9GaWx0ZXJGY106IDAsXG4gIFtHZW5lcmF0b3JUeXBlLk1vZEVudlRvRmlsdGVyRmNdOiAwLFxuICBbR2VuZXJhdG9yVHlwZS5FbmRBZGRyc0NvYXJzZU9mZnNldF06IDAsXG4gIFtHZW5lcmF0b3JUeXBlLk1vZExGT1RvVm9sdW1lXTogMCxcbiAgW0dlbmVyYXRvclR5cGUuQ2hvcnVzRWZmZWN0c1NlbmRdOiAwLFxuICBbR2VuZXJhdG9yVHlwZS5SZXZlcmJFZmZlY3RzU2VuZF06IDAsXG4gIFtHZW5lcmF0b3JUeXBlLlBhbl06IDAsXG4gIFtHZW5lcmF0b3JUeXBlLkRlbGF5TW9kTEZPXTogLTEyMDAwLFxuICBbR2VuZXJhdG9yVHlwZS5GcmVxTW9kTEZPXTogMCxcbiAgW0dlbmVyYXRvclR5cGUuRGVsYXlWaWJMRk9dOiAtMTIwMDAsXG4gIFtHZW5lcmF0b3JUeXBlLkZyZXFWaWJMRk9dOiAwLFxuICBbR2VuZXJhdG9yVHlwZS5EZWxheU1vZEVudl06IC0xMjAwMCxcbiAgW0dlbmVyYXRvclR5cGUuQXR0YWNrTW9kRW52XTogLTEyMDAwLFxuICBbR2VuZXJhdG9yVHlwZS5Ib2xkTW9kRW52XTogLTEyMDAwLFxuICBbR2VuZXJhdG9yVHlwZS5EZWNheU1vZEVudl06IC0xMjAwMCxcbiAgW0dlbmVyYXRvclR5cGUuU3VzdGFpbk1vZEVudl06IDAsXG4gIFtHZW5lcmF0b3JUeXBlLlJlbGVhc2VNb2RFbnZdOiAtMTIwMDAsXG4gIFtHZW5lcmF0b3JUeXBlLktleU51bVRvTW9kRW52SG9sZF06IDAsXG4gIFtHZW5lcmF0b3JUeXBlLktleU51bVRvTW9kRW52RGVjYXldOiAwLFxuICBbR2VuZXJhdG9yVHlwZS5EZWxheVZvbEVudl06IC0xMjAwMCxcbiAgW0dlbmVyYXRvclR5cGUuQXR0YWNrVm9sRW52XTogLTEyMDAwLFxuICBbR2VuZXJhdG9yVHlwZS5Ib2xkVm9sRW52XTogLTEyMDAwLFxuICBbR2VuZXJhdG9yVHlwZS5EZWNheVZvbEVudl06IC0xMjAwMCxcbiAgW0dlbmVyYXRvclR5cGUuU3VzdGFpblZvbEVudl06IDAsXG4gIFtHZW5lcmF0b3JUeXBlLlJlbGVhc2VWb2xFbnZdOiAtMTIwMDAsXG4gIFtHZW5lcmF0b3JUeXBlLktleU51bVRvVm9sRW52SG9sZF06IDAsXG4gIFtHZW5lcmF0b3JUeXBlLktleU51bVRvVm9sRW52RGVjYXldOiAwLFxuICBbR2VuZXJhdG9yVHlwZS5TdGFydExvb3BBZGRyc0NvYXJzZU9mZnNldF06IDAsXG4gIFtHZW5lcmF0b3JUeXBlLktleU51bV06IC0xLFxuICBbR2VuZXJhdG9yVHlwZS5WZWxvY2l0eV06IC0xLFxuICBbR2VuZXJhdG9yVHlwZS5Jbml0aWFsQXR0ZW51YXRpb25dOiAwLFxuICBbR2VuZXJhdG9yVHlwZS5FbmRMb29wQWRkcnNDb2Fyc2VPZmZzZXRdOiAwLFxuICBbR2VuZXJhdG9yVHlwZS5Db2Fyc2VUdW5lXTogMCxcbiAgW0dlbmVyYXRvclR5cGUuRmluZVR1bmVdOiAwLFxuICBbR2VuZXJhdG9yVHlwZS5TYW1wbGVNb2Rlc106IDAsXG4gIFtHZW5lcmF0b3JUeXBlLlNjYWxlVHVuaW5nXTogMTAwLFxuICBbR2VuZXJhdG9yVHlwZS5FeGNsdXNpdmVDbGFzc106IDAsXG4gIFtHZW5lcmF0b3JUeXBlLk92ZXJyaWRpbmdSb290S2V5XTogLTFcbn07XG5cbi8qKlxuICogRGVzY3JpYmVzIGEgcmFuZ2Ugb2YgTUlESSBrZXkgbnVtYmVycyAoZm9yIHRoZSBga2V5UmFuZ2VgIGdlbmVyYXRvcikgb3IgTUlESSB2ZWxvY2l0aWVzIChmb3IgdGhlXG4gKiBgdmVsUmFuZ2VgIGdlbmVyYXRvcikgd2l0aCBhIG1pbmltdW0gKGxvKSBhbmQgbWF4aW11bSAoaGkpIHZhbHVlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFJhbmdlIHtcbiAgLyoqXG4gICAqIExvdyB2YWx1ZSBmb3IgdGhlIHJhbmdlLlxuICAgKi9cbiAgbG86IG51bWJlcjtcblxuICAvKipcbiAgICogSGlnaCB2YWx1ZSBmb3IgdGhlIHJhbmdlLlxuICAgKi9cbiAgaGk6IG51bWJlcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZW5lcmF0b3Ige1xuICAvKipcbiAgICogVGhlIElEIG9mIHRoZSBnZW5lcmF0b3IuXG4gICAqL1xuICBpZDogR2VuZXJhdG9yVHlwZTtcblxuICAvKipcbiAgICogR2VuZXJhdG9yIHZhbHVlLiBJZiB0aGUgcmFuZ2UgaXMgbm90IHNwZWNpZmllZCwgdGhpcyBzaG91bGQgYmUgc2V0LlxuICAgKi9cbiAgdmFsdWU/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSByYW5nZSBvZiB0aGUgZ2VuZXJhdG9yLiBJZiB0aGUgdmFsdWUgaXMgbm90IHNwZWNpZmllZCwgdGhpcyBzaG91bGQgYmUgc2V0LlxuICAgKi9cbiAgcmFuZ2U/OiBSYW5nZTtcbn1cbiIsImV4cG9ydCAqIGZyb20gJy4vYmFuayc7XG5leHBvcnQgKiBmcm9tICcuL2dlbmVyYXRvcic7XG5leHBvcnQgKiBmcm9tICcuL2luc3RydW1lbnQnO1xuZXhwb3J0ICogZnJvbSAnLi9rZXknO1xuZXhwb3J0ICogZnJvbSAnLi9tZXRhRGF0YSc7XG5leHBvcnQgKiBmcm9tICcuL21vZHVsYXRvcic7XG5leHBvcnQgKiBmcm9tICcuL3ByZXNldCc7XG5leHBvcnQgKiBmcm9tICcuL3ByZXNldERhdGEnO1xuZXhwb3J0ICogZnJvbSAnLi9zYW1wbGUnO1xuZXhwb3J0ICogZnJvbSAnLi96b25lJztcbiIsImltcG9ydCB7IEdlbmVyYXRvclR5cGUgfSBmcm9tICcuL2dlbmVyYXRvcic7XG5cbmV4cG9ydCBlbnVtIENvbnRyb2xsZXJUeXBlIHtcbiAgLyoqXG4gICAqIFRoZSBjb250cm9sbGVyIG1vdmVzIGxpbmVhcmx5IGZyb20gdGhlIG1pbmltdW0gdG8gdGhlIG1heGltdW0gdmFsdWUsIHdpdGggdGhlIGRpcmVjdGlvbiBhbmRcbiAgICogcG9sYXJpdHkgc3BlY2lmaWVkIGJ5IHRoZSBtb2R1bGF0b3IuXG4gICAqL1xuICBMaW5lYXIgPSAwLFxuXG4gIC8qKlxuICAgKiBUaGUgY29udHJvbGxlciBtb3ZlcyBpbiBhIGNvbmNhdmUgZmFzaGlvbiBmcm9tIHRoZSBtaW5pbXVtIHRvIHRoZSBtYXhpbXVtIHZhbHVlLCB3aXRoIHRoZVxuICAgKiBkaXJlY3Rpb24gYW5kIHBvbGFyaXR5IHNwZWNpZmllZCBieSB0aGUgbW9kdWxhdG9yLlxuICAgKlxuICAgKiBgb3V0cHV0ID0gTWF0aC5sb2coTWF0aC5zcXJ0KHZhbHVlICoqIDIpIC8gW21heCB2YWx1ZV0gKiogMilgXG4gICAqL1xuICBDb25jYXZlID0gMSxcblxuICAvKipcbiAgICogVGhlIGNvbnRyb2xsZXIgbW92ZXMgaW4gYSBjb252ZXggZmFzaGlvbiBmcm9tIHRoZSBtaW5pbXVtIHRvIHRoZSBtYXhpbXVtIHZhbHVlLCB3aXRoIHRoZVxuICAgKiBkaXJlY3Rpb24gYW5kIHBvbGFyaXR5IHNwZWNpZmllZCBieSB0aGUgbW9kdWxhdG9yLiBUaGlzIGlzIHRoZSBzYW1lIGFzIHRoZSBjb25jYXZlIGN1cnZlLCBidXRcbiAgICogd2l0aCB0aGUgc3RhcnQgYW5kIGVuZCBwb2ludHMgcmV2ZXJzZWQuXG4gICAqL1xuICBDb252ZXggPSAyLFxuXG4gIC8qKlxuICAgKiBUaGUgY29udHJvbGxlciBvdXRwdXQgaXMgYXQgYSBtaW5pbXVtIHZhbHVlIHdoaWxlIHRoZSBjb250cm9sbGVyIGlucHV0IG1vdmVzIGZyb20gdGhlIG1pbmltdW1cbiAgICogdG8gaGFsZiBvZiB0aGUgbWF4aW11bSwgYWZ0ZXIgd2hpY2ggdGhlIGNvbnRyb2xsZXIgb3V0cHV0IGlzIGF0IGEgbWF4aW11bS4gVGhlIGRpcmVjdGlvbiBhbmRcbiAgICogcG9sYXJpdHkgYXJlIHNwZWNpZmllZCBieSB0aGUgbW9kdWxhdG9yLlxuICAgKi9cbiAgU3dpdGNoID0gM1xufVxuXG5leHBvcnQgZW51bSBDb250cm9sbGVyUG9sYXJpdHkge1xuICAvKipcbiAgICogVGhlIGNvbnRyb2xsZXIgc2hvdWxkIGJlIG1hcHBlZCB3aXRoIGEgbWluaW11bSB2YWx1ZSBvZiAwIGFuZCBhIG1heGltdW0gdmFsdWUgb2YgMS4gSXQgYmVoYXZlc1xuICAgKiBzaW1pbGFyIHRvIHRoZSBtb2R1bGF0aW9uIHdoZWVsIGNvbnRyb2xsZXIgb2YgdGhlIE1JREkgc3BlY2lmaWNhdGlvbi5cbiAgICovXG4gIFVuaXBvbGFyID0gMCxcblxuICAvKipcbiAgICogVGhlIGNvbnRyb2xsZXIgc2hvdWxkIGJlIG1hcHBlZCB3aXRoIGEgbWluaW11bSB2YWx1ZSBvZiAtMSBhbmQgYSBtYXhpbXVtIHZhbHVlIG9mIDEuIEl0XG4gICAqIGJlaGF2ZXMgc2ltaWxhciB0byB0aGUgcGl0Y2ggd2hlZWwgY29udHJvbGxlciBvZiB0aGUgTUlESSBzcGVjaWZpY2F0aW9uLlxuICAgKi9cbiAgQmlwb2xhciA9IDFcbn1cblxuZXhwb3J0IGVudW0gQ29udHJvbGxlckRpcmVjdGlvbiB7XG4gIC8qKlxuICAgKiBUaGUgZGlyZWN0aW9uIG9mIHRoZSBjb250cm9sbGVyIHNob3VsZCBiZSBmcm9tIHRoZSBtaW5pbXVtIHRvIHRoZSBtYXhpbXVtIHZhbHVlLlxuICAgKi9cbiAgSW5jcmVhc2luZyA9IDAsXG5cbiAgLyoqXG4gICAqIFRoZSBkaXJlY3Rpb24gb2YgdGhlIGNvbnRyb2xsZXIgc2hvdWxkIGJlIGZyb20gdGhlIG1heGltdW0gdG8gdGhlIG1pbmltdW0gdmFsdWUuXG4gICAqL1xuICBEZWNyZWFzaW5nID0gMVxufVxuXG5leHBvcnQgZW51bSBDb250cm9sbGVyUGFsZXR0ZSB7XG4gIC8qKlxuICAgKiBVc2UgdGhlIGdlbmVyYWwgY29udHJvbGxlciBwYWxldHRlIGFzIGRlc2NyaWJlZCBieSB0aGUgYENvbnRyb2xsZXJgIGVudW0uXG4gICAqL1xuICBHZW5lcmFsQ29udHJvbGxlciA9IDAsXG5cbiAgLyoqXG4gICAqIFVzZSB0aGUgTUlESSBjb250cm9sbGVyIHBhbGV0dGUuXG4gICAqL1xuICBNaWRpQ29udHJvbGxlciA9IDFcbn1cblxuZXhwb3J0IGVudW0gQ29udHJvbGxlciB7XG4gIC8qKlxuICAgKiBObyBjb250cm9sbGVyIGlzIHRvIGJlIHVzZWQuXG4gICAqL1xuICBOb0NvbnRyb2xsZXIgPSAwLFxuXG4gIC8qKlxuICAgKiBUaGUgY29udHJvbGxlciBzb3VyY2UgdG8gYmUgdXNlZCBpcyB0aGUgdmVsb2NpdHkgdmFsdWUgd2hpY2ggaXMgc2VudCBmcm9tIHRoZSBNSURJIG5vdGUtb25cbiAgICogY29tbWFuZC5cbiAgICovXG4gIE5vdGVPblZlbG9jaXR5ID0gMixcblxuICAvKipcbiAgICogVGhlIGNvbnRyb2xsZXIgc291cmNlIHRvIGJlIHVzZWQgaXMgdGhlIGtleSBudW1iZXIgdmFsdWUgd2hpY2ggd2FzIHNlbnQgZnJvbSB0aGUgTUlESSBub3RlLW9uXG4gICAqIGNvbW1hbmQuXG4gICAqL1xuICBOb3RlT25LZXlOdW1iZXIgPSAzLFxuXG4gIC8qKlxuICAgKiBUaGUgY29udHJvbGxlciBzb3VyY2UgdG8gYmUgdXNlZCBpcyB0aGUgcG9seSBwcmVzc3VyZSBhbW91bnQgdGhhdCBpcyBzZW50IGZyb20gdGhlIE1JRElcbiAgICogcG9seS1wcmVzc3VyZSBjb21tYW5kLlxuICAgKi9cbiAgUG9seVByZXNzdXJlID0gMTAsXG5cbiAgLyoqXG4gICAqIFRoZSBjb250cm9sbGVyIHNvdXJjZSB0byBiZSB1c2VkIGlzIHRoZSBjaGFubmVsIHByZXNzdXJlIGFtb3VudCB0aGF0IGlzIHNlbnQgZnJvbSB0aGUgTUlESVxuICAgKiBjaGFubmVsLXByZXNzdXJlIGNvbW1hbmQuXG4gICAqL1xuICBDaGFubmVsUHJlc3N1cmUgPSAxMyxcblxuICAvKipcbiAgICogVGhlIGNvbnRyb2xsZXIgc291cmNlIHRvIGJlIHVzZWQgaXMgdGhlIHBpdGNoIHdoZWVsIGFtb3VudCB3aGljaCBpcyBzZW50IGZyb20gdGhlIE1JREkgcGl0Y2hcbiAgICogd2hlZWwgY29tbWFuZC5cbiAgICovXG4gIFBpdGNoV2hlZWwgPSAxNCxcblxuICAvKipcbiAgICogVGhlIGNvbnRyb2xsZXIgc291cmNlIHRvIGJlIHVzZWQgaXMgdGhlIHBpdGNoIHdoZWVsIHNlbnNpdGl2aXR5IGFtb3VudCB3aGljaCBpcyBzZW50IGZyb20gdGhlXG4gICAqIE1JREkgUlBOIDAgcGl0Y2ggd2hlZWwgc2Vuc2l0aXZpdHkgY29tbWFuZC5cbiAgICovXG4gIFBpdGNoV2hlZWxTZW5zaXRpdml0eSA9IDE2LFxuXG4gIC8qKlxuICAgKiBUaGUgY29udHJvbGxlciBzb3VyY2UgaXMgdGhlIG91dHB1dCBvZiBhbm90aGVyIG1vZHVsYXRvci4gVGhpcyBpcyBvbmx5IHN1cHBvcnRlZCBhcyBgdmFsdWVgLFxuICAgKiBub3QgYXMgYHZhbHVlU291cmNlYC5cbiAgICovXG4gIExpbmsgPSAxMjdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb250cm9sbGVyVmFsdWUge1xuICAvKipcbiAgICogVGhlIHR5cGUgb2YgbW9kdWxhdG9yLlxuICAgKi9cbiAgdHlwZTogQ29udHJvbGxlclR5cGU7XG5cbiAgLyoqXG4gICAqIFRoZSBwb2xhcml0eSBvZiB0aGUgbW9kdWxhdG9yLlxuICAgKi9cbiAgcG9sYXJpdHk6IENvbnRyb2xsZXJQb2xhcml0eTtcblxuICAvKipcbiAgICogVGhlIGRpcmVjdGlvbiBvZiB0aGUgbW9kdWxhdG9yLlxuICAgKi9cbiAgZGlyZWN0aW9uOiBDb250cm9sbGVyRGlyZWN0aW9uO1xuXG4gIC8qKlxuICAgKiBUaGUgY29udHJvbGxlciBwYWxldHRlIHVzZWQgZm9yIHRoZSBtb2R1bGF0b3IuXG4gICAqL1xuICBwYWxldHRlOiBDb250cm9sbGVyUGFsZXR0ZTtcblxuICAvKipcbiAgICogVGhlIGluZGV4IG9mIHRoZSBnZW5lcmFsIG9yIE1JREkgY29udHJvbGxlci4gSWYgdGhlIHBhbGV0dGUgaXMgc2V0IHRvIGBHZW5lcmFsQ29udHJvbGxlcmAsXG4gICAqIHRoaXMgcmVmZXJzIHRvIGEgdHlwZSBpbiB0aGUgYENvbnRyb2xsZXJgIHR5cGUuIE90aGVyd2lzZSwgaXRzIGEgTUlESSBjb250aW51b3VzIGNvbnRyb2xsZXIuXG4gICAqL1xuICBpbmRleDogQ29udHJvbGxlciB8IG51bWJlcjtcbn1cblxuZXhwb3J0IGVudW0gVHJhbnNmb3JtVHlwZSB7XG4gIC8qKlxuICAgKiBUaGUgb3V0cHV0IHZhbHVlIG9mIHRoZSBtdWx0aXBsaWVyIGlzIGZlZCBkaXJlY3RseSB0byB0aGUgc3VtbWluZyBub2RlIG9mIHRoZSBnaXZlblxuICAgKiBkZXN0aW5hdGlvbi5cbiAgICovXG4gIExpbmVhciA9IDAsXG5cbiAgLyoqXG4gICAqIFRoZSBvdXRwdXQgdmFsdWUgb2YgdGhlIG11bHRpcGxpZXIgaXMgdG8gYmUgdGhlIGFic29sdXRlIHZhbHVlIG9mIHRoZSBpbnB1dCB2YWx1ZSwgYXMgZGVmaW5lZFxuICAgKiBieSB0aGUgcmVsYXRpb25zaGlwOlxuICAgKlxuICAgKiBgb3V0cHV0ID0gTWF0aC5zcXJ0KGlucHV0ICoqIDIpYCBvciBzaW1wbHkgYG91dHB1dCA9IE1hdGguYWJzKGlucHV0KWBcbiAgICovXG4gIEFic29sdXRlID0gMlxufVxuXG5leHBvcnQgaW50ZXJmYWNlIE1vZHVsYXRvciB7XG4gIC8qKlxuICAgKiBEZXN0aW5hdGlvbiBnZW5lcmF0b3IuXG4gICAqL1xuICBpZDogR2VuZXJhdG9yVHlwZTtcblxuICAvKipcbiAgICogU291cmNlIG1vZHVsYXRvci5cbiAgICovXG4gIHNvdXJjZTogQ29udHJvbGxlclZhbHVlO1xuXG4gIC8qKlxuICAgKiBEZWdyZWUgb2YgbW9kdWxhdGlvbi5cbiAgICovXG4gIHZhbHVlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFNvdXJjZSBjb250cm9scyB2YWx1ZSBvZiBmaXJzdC5cbiAgICpcbiAgICogVE9ETzogRGVzY3JpcHRpb24gaXMgdW5jbGVhci4gU2hvdWxkIGJlIGltcHJvdmVkLlxuICAgKi9cbiAgdmFsdWVTb3VyY2U6IENvbnRyb2xsZXJWYWx1ZTtcblxuICAvKipcbiAgICogVHJhbnNmb3JtIGFwcGxpZWQgdG8gc291cmNlLlxuICAgKi9cbiAgdHJhbnNmb3JtOiBUcmFuc2Zvcm1UeXBlO1xufVxuXG4vKipcbiAqIFRoZSBkZWZhdWx0IG1vZHVsYXRvcnMgYXQgaW5zdHJ1bWVudCBsZXZlbC4gSW1wbGVtZW50aW5nIHRoZXNlIGlzIHVwIHRvIHRoZSBjb25zdW1lciBvZiB0aGlzXG4gKiBsaWJyYXJ5LiBUbyBvdmVycmlkZSB0aGVzZSBtb2R1bGF0b3JzLCBvdGhlciBtb2R1bGF0b3JzIGhhdmUgdG8gYmUgZGVmaW5lZCBleHBsaWNpdGx5LlxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9JTlNUUlVNRU5UX01PRFVMQVRPUlM6IE1vZHVsYXRvcltdID0gW1xuICAvLyBNSURJIG5vdGUtb24gdmVsb2NpdHkgdG8gaW5pdGlhbCBhdHRlbnVhdGlvblxuICB7XG4gICAgaWQ6IEdlbmVyYXRvclR5cGUuSW5pdGlhbEF0dGVudWF0aW9uLFxuICAgIHNvdXJjZToge1xuICAgICAgdHlwZTogQ29udHJvbGxlclR5cGUuQ29uY2F2ZSxcbiAgICAgIHBvbGFyaXR5OiBDb250cm9sbGVyUG9sYXJpdHkuVW5pcG9sYXIsXG4gICAgICBkaXJlY3Rpb246IENvbnRyb2xsZXJEaXJlY3Rpb24uRGVjcmVhc2luZyxcbiAgICAgIHBhbGV0dGU6IENvbnRyb2xsZXJQYWxldHRlLkdlbmVyYWxDb250cm9sbGVyLFxuICAgICAgaW5kZXg6IENvbnRyb2xsZXIuTm90ZU9uVmVsb2NpdHlcbiAgICB9LFxuICAgIHZhbHVlOiA5NjAsXG4gICAgdmFsdWVTb3VyY2U6IHtcbiAgICAgIHR5cGU6IENvbnRyb2xsZXJUeXBlLkxpbmVhcixcbiAgICAgIHBvbGFyaXR5OiBDb250cm9sbGVyUG9sYXJpdHkuVW5pcG9sYXIsXG4gICAgICBkaXJlY3Rpb246IENvbnRyb2xsZXJEaXJlY3Rpb24uSW5jcmVhc2luZyxcbiAgICAgIHBhbGV0dGU6IENvbnRyb2xsZXJQYWxldHRlLkdlbmVyYWxDb250cm9sbGVyLFxuICAgICAgaW5kZXg6IENvbnRyb2xsZXIuTm9Db250cm9sbGVyXG4gICAgfSxcbiAgICB0cmFuc2Zvcm06IFRyYW5zZm9ybVR5cGUuTGluZWFyXG4gIH0sXG5cbiAgLy8gTUlESSBub3RlLW9uIHZlbG9jaXR5IHRvIGZpbHRlciBjdXRvZmZcbiAge1xuICAgIGlkOiBHZW5lcmF0b3JUeXBlLkluaXRpYWxGaWx0ZXJGYyxcbiAgICBzb3VyY2U6IHtcbiAgICAgIHR5cGU6IENvbnRyb2xsZXJUeXBlLkxpbmVhcixcbiAgICAgIHBvbGFyaXR5OiBDb250cm9sbGVyUG9sYXJpdHkuVW5pcG9sYXIsXG4gICAgICBkaXJlY3Rpb246IENvbnRyb2xsZXJEaXJlY3Rpb24uRGVjcmVhc2luZyxcbiAgICAgIHBhbGV0dGU6IENvbnRyb2xsZXJQYWxldHRlLkdlbmVyYWxDb250cm9sbGVyLFxuICAgICAgaW5kZXg6IENvbnRyb2xsZXIuTm90ZU9uVmVsb2NpdHlcbiAgICB9LFxuICAgIHZhbHVlOiAtMjQwMCwgLy8gY2VudHNcbiAgICB2YWx1ZVNvdXJjZToge1xuICAgICAgdHlwZTogQ29udHJvbGxlclR5cGUuTGluZWFyLFxuICAgICAgcG9sYXJpdHk6IENvbnRyb2xsZXJQb2xhcml0eS5Vbmlwb2xhcixcbiAgICAgIGRpcmVjdGlvbjogQ29udHJvbGxlckRpcmVjdGlvbi5JbmNyZWFzaW5nLFxuICAgICAgcGFsZXR0ZTogQ29udHJvbGxlclBhbGV0dGUuR2VuZXJhbENvbnRyb2xsZXIsXG4gICAgICBpbmRleDogQ29udHJvbGxlci5Ob0NvbnRyb2xsZXJcbiAgICB9LFxuICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtVHlwZS5MaW5lYXJcbiAgfSxcblxuICAvLyBNSURJIGNoYW5uZWwgcHJlc3N1cmUgdG8gdmlicmF0byBMRk8gcGl0Y2ggZGVwdGhcbiAge1xuICAgIGlkOiBHZW5lcmF0b3JUeXBlLlZpYkxGT1RvUGl0Y2gsXG4gICAgc291cmNlOiB7XG4gICAgICB0eXBlOiBDb250cm9sbGVyVHlwZS5MaW5lYXIsXG4gICAgICBwb2xhcml0eTogQ29udHJvbGxlclBvbGFyaXR5LlVuaXBvbGFyLFxuICAgICAgZGlyZWN0aW9uOiBDb250cm9sbGVyRGlyZWN0aW9uLkluY3JlYXNpbmcsXG4gICAgICBwYWxldHRlOiBDb250cm9sbGVyUGFsZXR0ZS5HZW5lcmFsQ29udHJvbGxlcixcbiAgICAgIGluZGV4OiBDb250cm9sbGVyLkNoYW5uZWxQcmVzc3VyZVxuICAgIH0sXG4gICAgdmFsdWU6IDUwLCAvLyBjZW50cyAvIG1heCBleGN1cnNpb25cbiAgICB2YWx1ZVNvdXJjZToge1xuICAgICAgdHlwZTogQ29udHJvbGxlclR5cGUuTGluZWFyLFxuICAgICAgcG9sYXJpdHk6IENvbnRyb2xsZXJQb2xhcml0eS5Vbmlwb2xhcixcbiAgICAgIGRpcmVjdGlvbjogQ29udHJvbGxlckRpcmVjdGlvbi5JbmNyZWFzaW5nLFxuICAgICAgcGFsZXR0ZTogQ29udHJvbGxlclBhbGV0dGUuR2VuZXJhbENvbnRyb2xsZXIsXG4gICAgICBpbmRleDogQ29udHJvbGxlci5Ob0NvbnRyb2xsZXJcbiAgICB9LFxuICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtVHlwZS5MaW5lYXJcbiAgfSxcblxuICAvLyBNSURJIGNvbnRpbnVvdXMgY29udHJvbGxlciAxIHRvIHZpYnJhdG8gTEZPIHBpdGNoIGRlcHRoXG4gIHtcbiAgICBpZDogR2VuZXJhdG9yVHlwZS5WaWJMRk9Ub1BpdGNoLFxuICAgIHNvdXJjZToge1xuICAgICAgdHlwZTogQ29udHJvbGxlclR5cGUuTGluZWFyLFxuICAgICAgcG9sYXJpdHk6IENvbnRyb2xsZXJQb2xhcml0eS5Vbmlwb2xhcixcbiAgICAgIGRpcmVjdGlvbjogQ29udHJvbGxlckRpcmVjdGlvbi5JbmNyZWFzaW5nLFxuICAgICAgcGFsZXR0ZTogQ29udHJvbGxlclBhbGV0dGUuTWlkaUNvbnRyb2xsZXIsXG4gICAgICBpbmRleDogMVxuICAgIH0sXG4gICAgdmFsdWU6IDUwLFxuICAgIHZhbHVlU291cmNlOiB7XG4gICAgICB0eXBlOiBDb250cm9sbGVyVHlwZS5MaW5lYXIsXG4gICAgICBwb2xhcml0eTogQ29udHJvbGxlclBvbGFyaXR5LlVuaXBvbGFyLFxuICAgICAgZGlyZWN0aW9uOiBDb250cm9sbGVyRGlyZWN0aW9uLkluY3JlYXNpbmcsXG4gICAgICBwYWxldHRlOiBDb250cm9sbGVyUGFsZXR0ZS5HZW5lcmFsQ29udHJvbGxlcixcbiAgICAgIGluZGV4OiBDb250cm9sbGVyLk5vQ29udHJvbGxlclxuICAgIH0sXG4gICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm1UeXBlLkxpbmVhclxuICB9LFxuXG4gIC8vIE1JREkgY29udGludW91cyBjb250cm9sbGVyIDcgdG8gaW5pdGlhbCBhdHRlbnVhdGlvblxuICB7XG4gICAgaWQ6IEdlbmVyYXRvclR5cGUuSW5pdGlhbEF0dGVudWF0aW9uLFxuICAgIHNvdXJjZToge1xuICAgICAgdHlwZTogQ29udHJvbGxlclR5cGUuQ29uY2F2ZSxcbiAgICAgIHBvbGFyaXR5OiBDb250cm9sbGVyUG9sYXJpdHkuVW5pcG9sYXIsXG4gICAgICBkaXJlY3Rpb246IENvbnRyb2xsZXJEaXJlY3Rpb24uRGVjcmVhc2luZyxcbiAgICAgIHBhbGV0dGU6IENvbnRyb2xsZXJQYWxldHRlLk1pZGlDb250cm9sbGVyLFxuICAgICAgaW5kZXg6IDdcbiAgICB9LFxuICAgIHZhbHVlOiA5NjAsXG4gICAgdmFsdWVTb3VyY2U6IHtcbiAgICAgIHR5cGU6IENvbnRyb2xsZXJUeXBlLkxpbmVhcixcbiAgICAgIHBvbGFyaXR5OiBDb250cm9sbGVyUG9sYXJpdHkuVW5pcG9sYXIsXG4gICAgICBkaXJlY3Rpb246IENvbnRyb2xsZXJEaXJlY3Rpb24uSW5jcmVhc2luZyxcbiAgICAgIHBhbGV0dGU6IENvbnRyb2xsZXJQYWxldHRlLkdlbmVyYWxDb250cm9sbGVyLFxuICAgICAgaW5kZXg6IENvbnRyb2xsZXIuTm9Db250cm9sbGVyXG4gICAgfSxcbiAgICB0cmFuc2Zvcm06IFRyYW5zZm9ybVR5cGUuTGluZWFyXG4gIH0sXG5cbiAgLy8gTUlESSBjb250aW51b3VzIGNvbnRyb2xsZXIgMTAgdG8gcGFuIHBvc2l0aW9uXG4gIHtcbiAgICBpZDogR2VuZXJhdG9yVHlwZS5Jbml0aWFsQXR0ZW51YXRpb24sXG4gICAgc291cmNlOiB7XG4gICAgICB0eXBlOiBDb250cm9sbGVyVHlwZS5MaW5lYXIsXG4gICAgICBwb2xhcml0eTogQ29udHJvbGxlclBvbGFyaXR5LkJpcG9sYXIsXG4gICAgICBkaXJlY3Rpb246IENvbnRyb2xsZXJEaXJlY3Rpb24uSW5jcmVhc2luZyxcbiAgICAgIHBhbGV0dGU6IENvbnRyb2xsZXJQYWxldHRlLk1pZGlDb250cm9sbGVyLFxuICAgICAgaW5kZXg6IDEwXG4gICAgfSxcbiAgICB2YWx1ZTogMTAwMCwgLy8gdGVudGhzIG9mIGEgcGVyY2VudFxuICAgIHZhbHVlU291cmNlOiB7XG4gICAgICB0eXBlOiBDb250cm9sbGVyVHlwZS5MaW5lYXIsXG4gICAgICBwb2xhcml0eTogQ29udHJvbGxlclBvbGFyaXR5LlVuaXBvbGFyLFxuICAgICAgZGlyZWN0aW9uOiBDb250cm9sbGVyRGlyZWN0aW9uLkluY3JlYXNpbmcsXG4gICAgICBwYWxldHRlOiBDb250cm9sbGVyUGFsZXR0ZS5HZW5lcmFsQ29udHJvbGxlcixcbiAgICAgIGluZGV4OiBDb250cm9sbGVyLk5vQ29udHJvbGxlclxuICAgIH0sXG4gICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm1UeXBlLkxpbmVhclxuICB9LFxuXG4gIC8vIE1JREkgY29udGludW91cyBjb250cm9sbGVyIDExIHRvIGluaXRpYWwgYXR0ZW51YXRpb25cbiAge1xuICAgIGlkOiBHZW5lcmF0b3JUeXBlLkluaXRpYWxBdHRlbnVhdGlvbixcbiAgICBzb3VyY2U6IHtcbiAgICAgIHR5cGU6IENvbnRyb2xsZXJUeXBlLkNvbmNhdmUsXG4gICAgICBwb2xhcml0eTogQ29udHJvbGxlclBvbGFyaXR5LlVuaXBvbGFyLFxuICAgICAgZGlyZWN0aW9uOiBDb250cm9sbGVyRGlyZWN0aW9uLkRlY3JlYXNpbmcsXG4gICAgICBwYWxldHRlOiBDb250cm9sbGVyUGFsZXR0ZS5NaWRpQ29udHJvbGxlcixcbiAgICAgIGluZGV4OiAxMVxuICAgIH0sXG4gICAgdmFsdWU6IDk2MCxcbiAgICB2YWx1ZVNvdXJjZToge1xuICAgICAgdHlwZTogQ29udHJvbGxlclR5cGUuTGluZWFyLFxuICAgICAgcG9sYXJpdHk6IENvbnRyb2xsZXJQb2xhcml0eS5Vbmlwb2xhcixcbiAgICAgIGRpcmVjdGlvbjogQ29udHJvbGxlckRpcmVjdGlvbi5JbmNyZWFzaW5nLFxuICAgICAgcGFsZXR0ZTogQ29udHJvbGxlclBhbGV0dGUuR2VuZXJhbENvbnRyb2xsZXIsXG4gICAgICBpbmRleDogQ29udHJvbGxlci5Ob0NvbnRyb2xsZXJcbiAgICB9LFxuICAgIHRyYW5zZm9ybTogVHJhbnNmb3JtVHlwZS5MaW5lYXJcbiAgfSxcblxuICAvLyBNSURJIGNvbnRpbnVvdXMgY29udHJvbGxlciA5MSB0byByZXZlcmIgZWZmZWN0cyBzZW5kXG4gIHtcbiAgICBpZDogR2VuZXJhdG9yVHlwZS5SZXZlcmJFZmZlY3RzU2VuZCxcbiAgICBzb3VyY2U6IHtcbiAgICAgIHR5cGU6IENvbnRyb2xsZXJUeXBlLkxpbmVhcixcbiAgICAgIHBvbGFyaXR5OiBDb250cm9sbGVyUG9sYXJpdHkuVW5pcG9sYXIsXG4gICAgICBkaXJlY3Rpb246IENvbnRyb2xsZXJEaXJlY3Rpb24uSW5jcmVhc2luZyxcbiAgICAgIHBhbGV0dGU6IENvbnRyb2xsZXJQYWxldHRlLk1pZGlDb250cm9sbGVyLFxuICAgICAgaW5kZXg6IDkxXG4gICAgfSxcbiAgICB2YWx1ZTogMjAwLCAvLyB0ZW50aHMgb2YgYSBwZXJjZW50XG4gICAgdmFsdWVTb3VyY2U6IHtcbiAgICAgIHR5cGU6IENvbnRyb2xsZXJUeXBlLkxpbmVhcixcbiAgICAgIHBvbGFyaXR5OiBDb250cm9sbGVyUG9sYXJpdHkuVW5pcG9sYXIsXG4gICAgICBkaXJlY3Rpb246IENvbnRyb2xsZXJEaXJlY3Rpb24uSW5jcmVhc2luZyxcbiAgICAgIHBhbGV0dGU6IENvbnRyb2xsZXJQYWxldHRlLkdlbmVyYWxDb250cm9sbGVyLFxuICAgICAgaW5kZXg6IENvbnRyb2xsZXIuTm9Db250cm9sbGVyXG4gICAgfSxcbiAgICB0cmFuc2Zvcm06IFRyYW5zZm9ybVR5cGUuTGluZWFyXG4gIH0sXG5cbiAgLy8gTUlESSBjb250aW51b3VzIGNvbnRyb2xsZXIgOTMgdG8gY2hvcnVzIGVmZmVjdHMgc2VuZFxuICB7XG4gICAgaWQ6IEdlbmVyYXRvclR5cGUuQ2hvcnVzRWZmZWN0c1NlbmQsXG4gICAgc291cmNlOiB7XG4gICAgICB0eXBlOiBDb250cm9sbGVyVHlwZS5MaW5lYXIsXG4gICAgICBwb2xhcml0eTogQ29udHJvbGxlclBvbGFyaXR5LlVuaXBvbGFyLFxuICAgICAgZGlyZWN0aW9uOiBDb250cm9sbGVyRGlyZWN0aW9uLkluY3JlYXNpbmcsXG4gICAgICBwYWxldHRlOiBDb250cm9sbGVyUGFsZXR0ZS5NaWRpQ29udHJvbGxlcixcbiAgICAgIGluZGV4OiA5M1xuICAgIH0sXG4gICAgdmFsdWU6IDIwMCwgLy8gdGVudGhzIG9mIGEgcGVyY2VudFxuICAgIHZhbHVlU291cmNlOiB7XG4gICAgICB0eXBlOiBDb250cm9sbGVyVHlwZS5MaW5lYXIsXG4gICAgICBwb2xhcml0eTogQ29udHJvbGxlclBvbGFyaXR5LlVuaXBvbGFyLFxuICAgICAgZGlyZWN0aW9uOiBDb250cm9sbGVyRGlyZWN0aW9uLkluY3JlYXNpbmcsXG4gICAgICBwYWxldHRlOiBDb250cm9sbGVyUGFsZXR0ZS5HZW5lcmFsQ29udHJvbGxlcixcbiAgICAgIGluZGV4OiBDb250cm9sbGVyLk5vQ29udHJvbGxlclxuICAgIH0sXG4gICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm1UeXBlLkxpbmVhclxuICB9LFxuXG4gIC8vIE1JREkgcGl0Y2ggd2hlZWwgdG8gaW5pdGlhbCBwaXRjaCBjb250cm9sbGVkIGJ5IE1JREkgcGl0Y2ggd2hlZWwgc2Vuc2l0aXZpdHlcbiAge1xuICAgIGlkOiBHZW5lcmF0b3JUeXBlLkNvYXJzZVR1bmUsXG4gICAgc291cmNlOiB7XG4gICAgICB0eXBlOiBDb250cm9sbGVyVHlwZS5MaW5lYXIsXG4gICAgICBwb2xhcml0eTogQ29udHJvbGxlclBvbGFyaXR5LkJpcG9sYXIsXG4gICAgICBkaXJlY3Rpb246IENvbnRyb2xsZXJEaXJlY3Rpb24uSW5jcmVhc2luZyxcbiAgICAgIHBhbGV0dGU6IENvbnRyb2xsZXJQYWxldHRlLkdlbmVyYWxDb250cm9sbGVyLFxuICAgICAgaW5kZXg6IENvbnRyb2xsZXIuUGl0Y2hXaGVlbFxuICAgIH0sXG4gICAgdmFsdWU6IDEyNzAwLCAvLyBjZW50c1xuICAgIHZhbHVlU291cmNlOiB7XG4gICAgICB0eXBlOiBDb250cm9sbGVyVHlwZS5MaW5lYXIsXG4gICAgICBwb2xhcml0eTogQ29udHJvbGxlclBvbGFyaXR5LlVuaXBvbGFyLFxuICAgICAgZGlyZWN0aW9uOiBDb250cm9sbGVyRGlyZWN0aW9uLkluY3JlYXNpbmcsXG4gICAgICBwYWxldHRlOiBDb250cm9sbGVyUGFsZXR0ZS5HZW5lcmFsQ29udHJvbGxlcixcbiAgICAgIGluZGV4OiBDb250cm9sbGVyLlBpdGNoV2hlZWxTZW5zaXRpdml0eVxuICAgIH0sXG4gICAgdHJhbnNmb3JtOiBUcmFuc2Zvcm1UeXBlLkxpbmVhclxuICB9XG5dO1xuIiwiLyoqXG4gKiBTb3VuZEZvbnQyIHNhbXBsZXMgYXJlIGluIHRoZSBXQVYgZm9ybWF0LCBtZWFuaW5nIHRoYXQgdGhleSBjb25zaXN0IG9mIGEgc2lnbmVkIDE2LWJpdCBhcnJheSxcbiAqIGluc3RlYWQgb2YgYSB1bnNpZ25lZCA4LWJpdCBhcnJheSwgd2hpY2ggaXMgcmVhZCBieSBkZWZhdWx0LiBUaGUgc2FtcGxlIGRhdGEgaW4gdGhlIGBzbXBsYFxuICogc3ViLWNodW5rIGlzIHBhcnNlZCBhcyBJbnQxNkFycmF5IGJlZm9yZSBjcmVhdGluZyBhIHNhbXBsZS5cbiAqL1xuZXhwb3J0IHR5cGUgU2FtcGxlRGF0YSA9IEludDE2QXJyYXk7XG5cbi8qKlxuICogVGhlIHNhbXBsZSB0eXBlLCBmb3VuZCBpbiB0aGUgYHR5cGVgIGZpZWxkIGluIHRoZSBoZWFkZXIuXG4gKi9cbmV4cG9ydCBlbnVtIFNhbXBsZVR5cGUge1xuICBFT1MgPSAwLFxuICBNb25vID0gMSxcbiAgUmlnaHQgPSAyLFxuICBMZWZ0ID0gNCxcbiAgTGlua2VkID0gOCxcbiAgUm9tTW9ubyA9IDMyNzY5LFxuICBSb21SaWdodCA9IDMyNzcwLFxuICBSb21MZWZ0ID0gMzI3NzIsXG4gIFJvbUxpbmtlZCA9IDMyNzc2XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2FtcGxlSGVhZGVyIHtcbiAgLyoqXG4gICAqIFRoZSBuYW1lIG9mIHRoZSBzYW1wbGUuIFRoaXMgbWF5IGJlIEVPUywgaW5kaWNhdGluZyBlbmQgb2Ygc2FtcGxlcywgd2l0aCBhbGwgb2YgdGhlIG90aGVyXG4gICAqIHZhbHVlcyBzZXQgdG8gemVyby5cbiAgICovXG4gIG5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogVGhlIHN0YXJ0IG9mIHRoZSBzYW1wbGUgaW4gZGF0YSBwb2ludHMsIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgc2FtcGxlIGRhdGEgZmllbGQgdG8gdGhlXG4gICAqIGZpcnN0IGRhdGEgcG9pbnQgb2YgdGhlIHNhbXBsZS5cbiAgICovXG4gIHN0YXJ0OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBlbmQgb2YgdGhlIHNhbXBsZSBpbiBkYXRhIHBvaW50cywgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIHRoZSBzYW1wbGUgZGF0YSBmaWVsZCB0byB0aGUgZmlyc3RcbiAgICogc2V0IG9mIDQ2IHplcm8gdmFsdWVkIGRhdGEgcG9pbnRzIGZvbGxvd2luZyB0aGlzIHNhbXBsZS5cbiAgICovXG4gIGVuZDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgaW5kZXggaW4gc2FtcGxlIGRhdGEgcG9pbnRzLCBmcm9tIHRoZSBiZWdpbm5pbmcgb2YgdGhlIHNhbXBsZSBkYXRhIGZpZWxkIHRvIHRoZSBmaXJzdCBkYXRhXG4gICAqIHBvaW50IGluIHRoZSBsb29wIG9mIHRoaXMgc2FtcGxlLlxuICAgKi9cbiAgc3RhcnRMb29wOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRleCBpbiBzYW1wbGUgZGF0YSBwb2ludHMsIGZyb20gdGhlIGJlZ2lubmluZyBvZiB0aGUgc2FtcGxlIGRhdGEgZmllbGQgdG8gdGhlIGZpcnN0IGRhdGFcbiAgICogcG9pbnQgZm9sbG93aW5nIHRoZSBsb29wIG9mIHRoaXMgc2FtcGxlLlxuICAgKi9cbiAgZW5kTG9vcDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc2FtcGxlIHJhdGUgaW4gaGVydHosIGF0IHdoaWNoIHRoZSBzYW1wbGUgd2FzIGFjcXVpcmVkIG9yIHRvIHdoaWNoIGl0IHdhcyBtb3N0IHJlY2VudGx5XG4gICAqIGNvbnZlcnRlZC4gVGhlIHZhbHVlIHNob3VsZCBiZSBiZXR3ZWVuIDQwMCBhbmQgNTAwMDAgaGVydHosIGJ1dCB0aGlzIGlzIG5vdCBhIHN0cmljdFxuICAgKiByZXF1aXJlbWVudC4gQSB2YWx1ZSBvZiB6ZXJvIGlzIGlsbGVnYWwuXG4gICAqL1xuICBzYW1wbGVSYXRlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBNSURJIGtleSBudW1iZXIgb2YgdGhlIHJlY29yZGVkIHBpdGNoIG9mIHRoZSBzYW1wbGUuIEZvciB1bnBpdGNoZWQgc291bmRzLCB0aGlzIHNob3VsZCBiZVxuICAgKiBhIHZhbHVlIG9mIDI1NS4gVmFsdWVzIGJldHdlZW4gMTI4IGFuZCAyNTQgYXJlIGlsbGVnYWwgYW5kIGEgdmFsdWUgb2YgNjAgc2hvdWxkIGJlIHVzZWRcbiAgICogaW5zdGVhZC5cbiAgICovXG4gIG9yaWdpbmFsUGl0Y2g6IG51bWJlcjtcblxuICAvKipcbiAgICogVGhlIHBpdGNoIGNvcnJlY3Rpb24gaW4gY2VudHMgdGhhdCBzaG91bGQgYmUgYXBwbGllZCB0byB0aGUgc2FtcGxlIG9uIHBsYXliYWNrLCB0byBjb21wZW5zYXRlXG4gICAqIGZvciBhbnkgcGl0Y2ggZXJyb3JzIGR1cmluZyB0aGUgc2FtcGxlIHJlY29yZGluZy5cbiAgICovXG4gIHBpdGNoQ29ycmVjdGlvbjogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBUaGUgc2FtcGxlIGhlYWRlciBpbmRleCBvZiB0aGUgYXNzb2NpYXRlZCBsZWZ0IG9yIHJpZ2h0IHNhbXBsZSwgaWYgdGhlIHNhbXBsZSB0eXBlIGlzIGEgbGVmdFxuICAgKiBvciByaWdodCB0eXBlLiBCb3RoIHNhbXBsZXMgc2hvdWxkIGJlIHBsYXllZCBhdCB0aGUgc2FtZSB0aW1lLCB3aXRoIHRoZSBwaXRjaCBjb250cm9sbGVkIGJ5XG4gICAqIHRoZSByaWdodCBzYW1wbGUncyBnZW5lcmF0b3JzLlxuICAgKi9cbiAgbGluazogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgdGhlIHR5cGUgb2Ygc2FtcGxlLlxuICAgKi9cbiAgdHlwZTogU2FtcGxlVHlwZTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBTYW1wbGUge1xuICAvKipcbiAgICogVGhlIHNhbXBsZSBoZWFkZXIgY29udGFpbmluZyB0aGUgbWV0YSBkYXRhLlxuICAgKi9cbiAgaGVhZGVyOiBTYW1wbGVIZWFkZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBzYW1wbGUgZGF0YSBwYXJzZWQgYXMgSW50MTZBcnJheS5cbiAgICovXG4gIGRhdGE6IFNhbXBsZURhdGE7XG59XG4iLCIvKipcbiAqIENvbnZlcnQgYSBVVEYtOCBlbmNvZGVkIGJ1ZmZlciBpbnRvIGEgc3RyaW5nLiBUaGlzIHdpbGwgcmVhZCB0aGUgZnVsbCBidWZmZXIgYXMgVVRGLTggZW5jb2RlZFxuICogc3RyaW5nIGFuZCByZXR1cm4gYW55dGhpbmcgYmVmb3JlIHRoZSBmaXJzdCBOVUxMIGNoYXJhY3Rlci4gVGhlIG91dHB1dCB0ZXh0IGlzIHRyaW1tZWQgb2YgYW55XG4gKiBwcmVjZWRpbmcgb3IgZm9sbG93aW5nIHNwYWNlcy5cbiAqXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyIC0gVGhlIGlucHV0IGJ1ZmZlclxuICovXG5leHBvcnQgY29uc3QgZ2V0U3RyaW5nRnJvbUJ1ZmZlciA9IChidWZmZXI6IFVpbnQ4QXJyYXkpOiBzdHJpbmcgPT4ge1xuICBjb25zdCBkZWNvZGVkID0gbmV3IFRleHREZWNvZGVyKCd1dGY4JykuZGVjb2RlKGJ1ZmZlcik7XG4gIGNvbnN0IG51bGxJbmRleCA9IGRlY29kZWQuaW5kZXhPZignXFwwJyk7XG4gIHJldHVybiAobnVsbEluZGV4ID09PSAtMSA/IGRlY29kZWQgOiBkZWNvZGVkLnNsaWNlKDAsIG51bGxJbmRleCkpLnRyaW0oKTtcbn07XG4iLCJleHBvcnQgKiBmcm9tICcuL2J1ZmZlcic7XG5leHBvcnQgKiBmcm9tICcuL21lbW9pemUnO1xuIiwiLyoqXG4gKiBSZXR1cm5zIGEgbWVtb2l6ZWQgZnVuY3Rpb24gZm9yIHRoZSBvcmlnaW5hbCBmdW5jdGlvbi4gRnVuY3Rpb24gYXJndW1lbnRzIGFyZSBzZXJpYWxpemVkIGFzIGFcbiAqIEpTT04gc3RyaW5nIGFuZCBzdG9yZWQgaW4gYW4gaW4tbWVtb3J5IG9iamVjdC5cbiAqXG4gKiBAdGVtcGxhdGUgVFxuICogQHRlbXBsYXRlIFVcbiAqIEBwYXJhbSB7KC4uLm9yaWdpbmFsQXJnczogVFtdKSA9PiBVfSBvcmlnaW5hbEZ1bmN0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCBtZW1vaXplID0gPFQsIFU+KFxuICBvcmlnaW5hbEZ1bmN0aW9uOiAoLi4ub3JpZ2luYWxBcmdzOiBUW10pID0+IFVcbik6ICgoLi4uYXJnczogVFtdKSA9PiBVKSA9PiB7XG4gIGNvbnN0IG1lbW86IHsgW2tleTogc3RyaW5nXTogVSB9ID0ge307XG5cbiAgcmV0dXJuICguLi5hcmdzOiBUW10pID0+IHtcbiAgICBjb25zdCBzZXJpYWxpemVkQXJncyA9IEpTT04uc3RyaW5naWZ5KGFyZ3MpO1xuICAgIGlmIChzZXJpYWxpemVkQXJncyBpbiBtZW1vKSB7XG4gICAgICByZXR1cm4gbWVtb1tzZXJpYWxpemVkQXJnc107XG4gICAgfVxuXG4gICAgY29uc3Qgb3V0cHV0ID0gb3JpZ2luYWxGdW5jdGlvbiguLi5hcmdzKTtcbiAgICBtZW1vW3NlcmlhbGl6ZWRBcmdzXSA9IG91dHB1dDtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9O1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=
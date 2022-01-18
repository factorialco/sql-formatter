(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["sqlFormatter"] = factory();
	else
		root["sqlFormatter"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/core/Formatter.js":
/*!*******************************!*\
  !*** ./src/core/Formatter.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Formatter)
/* harmony export */ });
/* harmony import */ var _tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenTypes */ "./src/core/tokenTypes.js");
/* harmony import */ var _Indentation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Indentation */ "./src/core/Indentation.js");
/* harmony import */ var _InlineBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./InlineBlock */ "./src/core/InlineBlock.js");
/* harmony import */ var _Params__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Params */ "./src/core/Params.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
/* harmony import */ var _token__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./token */ "./src/core/token.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }








var Formatter = /*#__PURE__*/function () {
  /**
   * @param {Object} cfg
   *  @param {String} cfg.language
   *  @param {String} cfg.indent
   *  @param {Boolean} cfg.uppercase
   *  @param {Integer} cfg.linesBetweenQueries
   *  @param {Object} cfg.params
   */
  function Formatter(cfg) {
    _classCallCheck(this, Formatter);

    this.cfg = cfg;
    this.indentation = new _Indentation__WEBPACK_IMPORTED_MODULE_1__["default"](this.cfg.indent);
    this.inlineBlock = new _InlineBlock__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.params = new _Params__WEBPACK_IMPORTED_MODULE_3__["default"](this.cfg.params);
    this.previousReservedToken = {};
    this.tokens = [];
    this.index = 0;
  }
  /**
   * SQL Tokenizer for this formatter, provided by subclasses.
   */


  _createClass(Formatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      throw new Error('tokenizer() not implemented by subclass');
    }
    /**
     * Reprocess and modify a token based on parsed context.
     *
     * @param {Object} token The token to modify
     *  @param {String} token.type
     *  @param {String} token.value
     * @return {Object} new token or the original
     *  @return {String} token.type
     *  @return {String} token.value
     */

  }, {
    key: "tokenOverride",
    value: function tokenOverride(token) {
      // subclasses can override this to modify tokens during formatting
      return token;
    }
    /**
     * Formats whitespace in a SQL string to make it easier to read.
     *
     * @param {String} query The SQL query string
     * @return {String} formatted query
     */

  }, {
    key: "format",
    value: function format(query) {
      this.tokens = this.tokenizer().tokenize(query);
      var formattedQuery = this.getFormattedQueryFromTokens();
      return formattedQuery.trim();
    }
  }, {
    key: "getFormattedQueryFromTokens",
    value: function getFormattedQueryFromTokens() {
      var _this = this;

      var formattedQuery = '';
      this.tokens.forEach(function (token, index) {
        _this.index = index;
        token = _this.tokenOverride(token);

        if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].LINE_COMMENT) {
          formattedQuery = _this.formatLineComment(token, formattedQuery);
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].BLOCK_COMMENT) {
          formattedQuery = _this.formatBlockComment(token, formattedQuery);
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL) {
          formattedQuery = _this.formatTopLevelReservedWord(token, formattedQuery);
          _this.previousReservedToken = token;
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL_NO_INDENT) {
          formattedQuery = _this.formatTopLevelReservedWordNoIndent(token, formattedQuery);
          _this.previousReservedToken = token;
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_NEWLINE) {
          formattedQuery = _this.formatNewlineReservedWord(token, formattedQuery);
          _this.previousReservedToken = token;
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED) {
          formattedQuery = _this.formatWithSpaces(token, formattedQuery);
          _this.previousReservedToken = token;
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPEN_PAREN) {
          formattedQuery = _this.formatOpeningParentheses(token, formattedQuery);
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].CLOSE_PAREN) {
          formattedQuery = _this.formatClosingParentheses(token, formattedQuery);
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].PLACEHOLDER) {
          formattedQuery = _this.formatPlaceholder(token, formattedQuery);
        } else if (token.value === ',') {
          formattedQuery = _this.formatComma(token, formattedQuery);
        } else if (token.value === ':') {
          formattedQuery = _this.formatWithSpaceAfter(token, formattedQuery);
        } else if (token.value === '.') {
          formattedQuery = _this.formatWithoutSpaces(token, formattedQuery);
        } else if (token.value === ';') {
          formattedQuery = _this.formatQuerySeparator(token, formattedQuery);
        } else {
          formattedQuery = _this.formatWithSpaces(token, formattedQuery);
        }
      });
      return formattedQuery;
    }
  }, {
    key: "formatLineComment",
    value: function formatLineComment(token, query) {
      return this.addNewline(query + this.show(token));
    }
  }, {
    key: "formatBlockComment",
    value: function formatBlockComment(token, query) {
      return this.addNewline(this.addNewline(query) + this.indentComment(token.value));
    }
  }, {
    key: "indentComment",
    value: function indentComment(comment) {
      return comment.replace(/\n[\t ]*/g, '\n' + this.indentation.getIndent() + ' ');
    }
  }, {
    key: "formatTopLevelReservedWordNoIndent",
    value: function formatTopLevelReservedWordNoIndent(token, query) {
      this.indentation.decreaseTopLevel();
      query = this.addNewline(query) + this.equalizeWhitespace(this.show(token));
      return this.addNewline(query);
    }
  }, {
    key: "formatTopLevelReservedWord",
    value: function formatTopLevelReservedWord(token, query) {
      this.indentation.decreaseTopLevel();
      query = this.addNewline(query);
      this.indentation.increaseTopLevel();
      query += this.equalizeWhitespace(this.show(token));
      return this.addNewline(query);
    }
  }, {
    key: "formatNewlineReservedWord",
    value: function formatNewlineReservedWord(token, query) {
      if ((0,_token__WEBPACK_IMPORTED_MODULE_5__.isAnd)(token) && (0,_token__WEBPACK_IMPORTED_MODULE_5__.isBetween)(this.tokenLookBehind(2))) {
        return this.formatWithSpaces(token, query);
      }

      return this.addNewline(query) + this.equalizeWhitespace(this.show(token)) + ' ';
    } // Replace any sequence of whitespace characters with single space

  }, {
    key: "equalizeWhitespace",
    value: function equalizeWhitespace(string) {
      return string.replace(/[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+/g, ' ');
    } // Opening parentheses increase the block indent level and start a new line

  }, {
    key: "formatOpeningParentheses",
    value: function formatOpeningParentheses(token, query) {
      var _preserveWhitespaceFo, _this$tokenLookBehind;

      // Take out the preceding space unless there was whitespace there in the original query
      // or another opening parens or line comment
      var preserveWhitespaceFor = (_preserveWhitespaceFo = {}, _defineProperty(_preserveWhitespaceFo, _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPEN_PAREN, true), _defineProperty(_preserveWhitespaceFo, _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].LINE_COMMENT, true), _defineProperty(_preserveWhitespaceFo, _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPERATOR, true), _preserveWhitespaceFo);

      if (token.whitespaceBefore.length === 0 && !preserveWhitespaceFor[(_this$tokenLookBehind = this.tokenLookBehind()) === null || _this$tokenLookBehind === void 0 ? void 0 : _this$tokenLookBehind.type]) {
        query = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.trimSpacesEnd)(query);
      }

      query += this.show(token);
      this.inlineBlock.beginIfPossible(this.tokens, this.index);

      if (!this.inlineBlock.isActive()) {
        this.indentation.increaseBlockLevel();
        query = this.addNewline(query);
      }

      return query;
    } // Closing parentheses decrease the block indent level

  }, {
    key: "formatClosingParentheses",
    value: function formatClosingParentheses(token, query) {
      if (this.inlineBlock.isActive()) {
        this.inlineBlock.end();
        return this.formatWithSpaceAfter(token, query);
      } else {
        this.indentation.decreaseBlockLevel();
        return this.formatWithSpaces(token, this.addNewline(query));
      }
    }
  }, {
    key: "formatPlaceholder",
    value: function formatPlaceholder(token, query) {
      return query + this.params.get(token) + ' ';
    } // Commas start a new line (unless within inline parentheses or SQL "LIMIT" clause)

  }, {
    key: "formatComma",
    value: function formatComma(token, query) {
      query = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.trimSpacesEnd)(query) + this.show(token) + ' ';

      if (this.inlineBlock.isActive()) {
        return query;
      } else if ((0,_token__WEBPACK_IMPORTED_MODULE_5__.isLimit)(this.previousReservedToken)) {
        return query;
      } else {
        return this.addNewline(query);
      }
    }
  }, {
    key: "formatWithSpaceAfter",
    value: function formatWithSpaceAfter(token, query) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_4__.trimSpacesEnd)(query) + this.show(token) + ' ';
    }
  }, {
    key: "formatWithoutSpaces",
    value: function formatWithoutSpaces(token, query) {
      return (0,_utils__WEBPACK_IMPORTED_MODULE_4__.trimSpacesEnd)(query) + this.show(token);
    }
  }, {
    key: "formatWithSpaces",
    value: function formatWithSpaces(token, query) {
      return query + this.show(token) + ' ';
    }
  }, {
    key: "formatQuerySeparator",
    value: function formatQuerySeparator(token, query) {
      this.indentation.resetIndentation();
      return (0,_utils__WEBPACK_IMPORTED_MODULE_4__.trimSpacesEnd)(query) + this.show(token) + '\n'.repeat(this.cfg.linesBetweenQueries || 1);
    } // Converts token to string (uppercasing it if needed)

  }, {
    key: "show",
    value: function show(_ref) {
      var type = _ref.type,
          value = _ref.value;

      if (this.cfg.uppercase && (type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL_NO_INDENT || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_NEWLINE || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPEN_PAREN || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].CLOSE_PAREN)) {
        return value.toUpperCase();
      } else {
        return value;
      }
    }
  }, {
    key: "addNewline",
    value: function addNewline(query) {
      query = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.trimSpacesEnd)(query);

      if (!query.endsWith('\n')) {
        query += '\n';
      }

      return query + this.indentation.getIndent();
    }
  }, {
    key: "tokenLookBehind",
    value: function tokenLookBehind() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return this.tokens[this.index - n];
    }
  }, {
    key: "tokenLookAhead",
    value: function tokenLookAhead() {
      var n = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      return this.tokens[this.index + n];
    }
  }]);

  return Formatter;
}();



/***/ }),

/***/ "./src/core/Indentation.js":
/*!*********************************!*\
  !*** ./src/core/Indentation.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Indentation)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var INDENT_TYPE_TOP_LEVEL = 'top-level';
var INDENT_TYPE_BLOCK_LEVEL = 'block-level';
/**
 * Manages indentation levels.
 *
 * There are two types of indentation levels:
 *
 * - BLOCK_LEVEL : increased by open-parenthesis
 * - TOP_LEVEL : increased by RESERVED_TOP_LEVEL words
 */

var Indentation = /*#__PURE__*/function () {
  /**
   * @param {String} indent Indent value, default is "  " (2 spaces)
   */
  function Indentation(indent) {
    _classCallCheck(this, Indentation);

    this.indent = indent || '  ';
    this.indentTypes = [];
  }
  /**
   * Returns current indentation string.
   * @return {String}
   */


  _createClass(Indentation, [{
    key: "getIndent",
    value: function getIndent() {
      return this.indent.repeat(this.indentTypes.length);
    }
    /**
     * Increases indentation by one top-level indent.
     */

  }, {
    key: "increaseTopLevel",
    value: function increaseTopLevel() {
      this.indentTypes.push(INDENT_TYPE_TOP_LEVEL);
    }
    /**
     * Increases indentation by one block-level indent.
     */

  }, {
    key: "increaseBlockLevel",
    value: function increaseBlockLevel() {
      this.indentTypes.push(INDENT_TYPE_BLOCK_LEVEL);
    }
    /**
     * Decreases indentation by one top-level indent.
     * Does nothing when the previous indent is not top-level.
     */

  }, {
    key: "decreaseTopLevel",
    value: function decreaseTopLevel() {
      if (this.indentTypes.length > 0 && (0,_utils__WEBPACK_IMPORTED_MODULE_0__.last)(this.indentTypes) === INDENT_TYPE_TOP_LEVEL) {
        this.indentTypes.pop();
      }
    }
    /**
     * Decreases indentation by one block-level indent.
     * If there are top-level indents within the block-level indent,
     * throws away these as well.
     */

  }, {
    key: "decreaseBlockLevel",
    value: function decreaseBlockLevel() {
      while (this.indentTypes.length > 0) {
        var type = this.indentTypes.pop();

        if (type !== INDENT_TYPE_TOP_LEVEL) {
          break;
        }
      }
    }
  }, {
    key: "resetIndentation",
    value: function resetIndentation() {
      this.indentTypes = [];
    }
  }]);

  return Indentation;
}();



/***/ }),

/***/ "./src/core/InlineBlock.js":
/*!*********************************!*\
  !*** ./src/core/InlineBlock.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ InlineBlock)
/* harmony export */ });
/* harmony import */ var _tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenTypes */ "./src/core/tokenTypes.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


var INLINE_MAX_LENGTH = 50;
/**
 * Bookkeeper for inline blocks.
 *
 * Inline blocks are parenthized expressions that are shorter than INLINE_MAX_LENGTH.
 * These blocks are formatted on a single line, unlike longer parenthized
 * expressions where open-parenthesis causes newline and increase of indentation.
 */

var InlineBlock = /*#__PURE__*/function () {
  function InlineBlock() {
    _classCallCheck(this, InlineBlock);

    this.level = 0;
  }
  /**
   * Begins inline block when lookahead through upcoming tokens determines
   * that the block would be smaller than INLINE_MAX_LENGTH.
   * @param  {Object[]} tokens Array of all tokens
   * @param  {Number} index Current token position
   */


  _createClass(InlineBlock, [{
    key: "beginIfPossible",
    value: function beginIfPossible(tokens, index) {
      if (this.level === 0 && this.isInlineBlock(tokens, index)) {
        this.level = 1;
      } else if (this.level > 0) {
        this.level++;
      } else {
        this.level = 0;
      }
    }
    /**
     * Finishes current inline block.
     * There might be several nested ones.
     */

  }, {
    key: "end",
    value: function end() {
      this.level--;
    }
    /**
     * True when inside an inline block
     * @return {Boolean}
     */

  }, {
    key: "isActive",
    value: function isActive() {
      return this.level > 0;
    } // Check if this should be an inline parentheses block
    // Examples are "NOW()", "COUNT(*)", "int(10)", key(`somecolumn`), DECIMAL(7,2)

  }, {
    key: "isInlineBlock",
    value: function isInlineBlock(tokens, index) {
      var length = 0;
      var level = 0;

      for (var i = index; i < tokens.length; i++) {
        var token = tokens[i];
        length += token.value.length; // Overran max length

        if (length > INLINE_MAX_LENGTH) {
          return false;
        }

        if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPEN_PAREN) {
          level++;
        } else if (token.type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].CLOSE_PAREN) {
          level--;

          if (level === 0) {
            return true;
          }
        }

        if (this.isForbiddenToken(token)) {
          return false;
        }
      }

      return false;
    } // Reserved words that cause newlines, comments and semicolons
    // are not allowed inside inline parentheses block

  }, {
    key: "isForbiddenToken",
    value: function isForbiddenToken(_ref) {
      var type = _ref.type,
          value = _ref.value;
      return type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_NEWLINE || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].COMMENT || type === _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].BLOCK_COMMENT || value === ';';
    }
  }]);

  return InlineBlock;
}();



/***/ }),

/***/ "./src/core/Params.js":
/*!****************************!*\
  !*** ./src/core/Params.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Params)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * Handles placeholder replacement with given params.
 */
var Params = /*#__PURE__*/function () {
  /**
   * @param {Object} params
   */
  function Params(params) {
    _classCallCheck(this, Params);

    this.params = params;
    this.index = 0;
  }
  /**
   * Returns param value that matches given placeholder with param key.
   * @param {Object} token
   *   @param {String} token.key Placeholder key
   *   @param {String} token.value Placeholder value
   * @return {String} param or token.value when params are missing
   */


  _createClass(Params, [{
    key: "get",
    value: function get(_ref) {
      var key = _ref.key,
          value = _ref.value;

      if (!this.params) {
        return value;
      }

      if (key) {
        return this.params[key];
      }

      return this.params[this.index++];
    }
  }]);

  return Params;
}();



/***/ }),

/***/ "./src/core/Tokenizer.js":
/*!*******************************!*\
  !*** ./src/core/Tokenizer.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Tokenizer)
/* harmony export */ });
/* harmony import */ var _tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenTypes */ "./src/core/tokenTypes.js");
/* harmony import */ var _regexFactory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./regexFactory */ "./src/core/regexFactory.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }





var Tokenizer = /*#__PURE__*/function () {
  /**
   * @param {Object} cfg
   *  @param {String[]} cfg.reservedWords Reserved words in SQL
   *  @param {String[]} cfg.reservedTopLevelWords Words that are set to new line separately
   *  @param {String[]} cfg.reservedNewlineWords Words that are set to newline
   *  @param {String[]} cfg.reservedTopLevelWordsNoIndent Words that are top level but have no indentation
   *  @param {String[]} cfg.stringTypes String types to enable: "", '', ``, [], N''
   *  @param {String[]} cfg.openParens Opening parentheses to enable, like (, [
   *  @param {String[]} cfg.closeParens Closing parentheses to enable, like ), ]
   *  @param {String[]} cfg.indexedPlaceholderTypes Prefixes for indexed placeholders, like ?
   *  @param {String[]} cfg.namedPlaceholderTypes Prefixes for named placeholders, like @ and :
   *  @param {String[]} cfg.lineCommentTypes Line comments to enable, like # and --
   *  @param {String[]} cfg.specialWordChars Special chars that can be found inside of words, like @ and #
   *  @param {String[]} [cfg.operator] Additional operators to recognize
   */
  function Tokenizer(cfg) {
    _classCallCheck(this, Tokenizer);

    this.WHITESPACE_REGEX = /^([\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]+)/;
    this.NUMBER_REGEX = /^((\x2D[\t-\r \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\uFEFF]*)?[0-9]+(\.[0-9]+)?([Ee]\x2D?[0-9]+(\.[0-9]+)?)?|0x[0-9A-Fa-f]+|0b[01]+)\b/;
    this.OPERATOR_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createOperatorRegex(['<>', '<=', '>='].concat(_toConsumableArray(cfg.operators || [])));
    this.BLOCK_COMMENT_REGEX = /^(\/\*(?:(?![])[\s\S])*?(?:\*\/|$))/;
    this.LINE_COMMENT_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createLineCommentRegex(cfg.lineCommentTypes);
    this.RESERVED_TOP_LEVEL_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createReservedWordRegex(cfg.reservedTopLevelWords);
    this.RESERVED_TOP_LEVEL_NO_INDENT_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createReservedWordRegex(cfg.reservedTopLevelWordsNoIndent);
    this.RESERVED_NEWLINE_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createReservedWordRegex(cfg.reservedNewlineWords);
    this.RESERVED_PLAIN_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createReservedWordRegex(cfg.reservedWords);
    this.WORD_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createWordRegex(cfg.specialWordChars);
    this.STRING_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createStringRegex(cfg.stringTypes);
    this.OPEN_PAREN_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createParenRegex(cfg.openParens);
    this.CLOSE_PAREN_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createParenRegex(cfg.closeParens);
    this.INDEXED_PLACEHOLDER_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createPlaceholderRegex(cfg.indexedPlaceholderTypes, '[0-9]*');
    this.IDENT_NAMED_PLACEHOLDER_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createPlaceholderRegex(cfg.namedPlaceholderTypes, '[a-zA-Z0-9._$]+');
    this.STRING_NAMED_PLACEHOLDER_REGEX = _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createPlaceholderRegex(cfg.namedPlaceholderTypes, _regexFactory__WEBPACK_IMPORTED_MODULE_1__.createStringPattern(cfg.stringTypes));
  }
  /**
   * Takes a SQL string and breaks it into tokens.
   * Each token is an object with type and value.
   *
   * @param {String} input The SQL string
   * @return {Object[]} tokens An array of tokens.
   *  @return {String} token.type
   *  @return {String} token.value
   *  @return {String} token.whitespaceBefore Preceding whitespace
   */


  _createClass(Tokenizer, [{
    key: "tokenize",
    value: function tokenize(input) {
      var tokens = [];
      var token; // Keep processing the string until it is empty

      while (input.length) {
        // grab any preceding whitespace
        var whitespaceBefore = this.getWhitespace(input);
        input = input.substring(whitespaceBefore.length);

        if (input.length) {
          // Get the next token and the token type
          token = this.getNextToken(input, token); // Advance the string

          input = input.substring(token.value.length);
          tokens.push(_objectSpread(_objectSpread({}, token), {}, {
            whitespaceBefore: whitespaceBefore
          }));
        }
      }

      return tokens;
    }
  }, {
    key: "getWhitespace",
    value: function getWhitespace(input) {
      var matches = input.match(this.WHITESPACE_REGEX);
      return matches ? matches[1] : '';
    }
  }, {
    key: "getNextToken",
    value: function getNextToken(input, previousToken) {
      return this.getCommentToken(input) || this.getStringToken(input) || this.getOpenParenToken(input) || this.getCloseParenToken(input) || this.getPlaceholderToken(input) || this.getNumberToken(input) || this.getReservedWordToken(input, previousToken) || this.getWordToken(input) || this.getOperatorToken(input);
    }
  }, {
    key: "getCommentToken",
    value: function getCommentToken(input) {
      return this.getLineCommentToken(input) || this.getBlockCommentToken(input);
    }
  }, {
    key: "getLineCommentToken",
    value: function getLineCommentToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].LINE_COMMENT,
        regex: this.LINE_COMMENT_REGEX
      });
    }
  }, {
    key: "getBlockCommentToken",
    value: function getBlockCommentToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].BLOCK_COMMENT,
        regex: this.BLOCK_COMMENT_REGEX
      });
    }
  }, {
    key: "getStringToken",
    value: function getStringToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].STRING,
        regex: this.STRING_REGEX
      });
    }
  }, {
    key: "getOpenParenToken",
    value: function getOpenParenToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPEN_PAREN,
        regex: this.OPEN_PAREN_REGEX
      });
    }
  }, {
    key: "getCloseParenToken",
    value: function getCloseParenToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].CLOSE_PAREN,
        regex: this.CLOSE_PAREN_REGEX
      });
    }
  }, {
    key: "getPlaceholderToken",
    value: function getPlaceholderToken(input) {
      return this.getIdentNamedPlaceholderToken(input) || this.getStringNamedPlaceholderToken(input) || this.getIndexedPlaceholderToken(input);
    }
  }, {
    key: "getIdentNamedPlaceholderToken",
    value: function getIdentNamedPlaceholderToken(input) {
      return this.getPlaceholderTokenWithKey({
        input: input,
        regex: this.IDENT_NAMED_PLACEHOLDER_REGEX,
        parseKey: function parseKey(v) {
          return v.slice(1);
        }
      });
    }
  }, {
    key: "getStringNamedPlaceholderToken",
    value: function getStringNamedPlaceholderToken(input) {
      var _this = this;

      return this.getPlaceholderTokenWithKey({
        input: input,
        regex: this.STRING_NAMED_PLACEHOLDER_REGEX,
        parseKey: function parseKey(v) {
          return _this.getEscapedPlaceholderKey({
            key: v.slice(2, -1),
            quoteChar: v.slice(-1)
          });
        }
      });
    }
  }, {
    key: "getIndexedPlaceholderToken",
    value: function getIndexedPlaceholderToken(input) {
      return this.getPlaceholderTokenWithKey({
        input: input,
        regex: this.INDEXED_PLACEHOLDER_REGEX,
        parseKey: function parseKey(v) {
          return v.slice(1);
        }
      });
    }
  }, {
    key: "getPlaceholderTokenWithKey",
    value: function getPlaceholderTokenWithKey(_ref) {
      var input = _ref.input,
          regex = _ref.regex,
          parseKey = _ref.parseKey;
      var token = this.getTokenOnFirstMatch({
        input: input,
        regex: regex,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].PLACEHOLDER
      });

      if (token) {
        token.key = parseKey(token.value);
      }

      return token;
    }
  }, {
    key: "getEscapedPlaceholderKey",
    value: function getEscapedPlaceholderKey(_ref2) {
      var key = _ref2.key,
          quoteChar = _ref2.quoteChar;
      return key.replace(new RegExp((0,_utils__WEBPACK_IMPORTED_MODULE_2__.escapeRegExp)('\\' + quoteChar), 'gu'), quoteChar);
    } // Decimal, binary, or hex numbers

  }, {
    key: "getNumberToken",
    value: function getNumberToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].NUMBER,
        regex: this.NUMBER_REGEX
      });
    } // Punctuation and symbols

  }, {
    key: "getOperatorToken",
    value: function getOperatorToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].OPERATOR,
        regex: this.OPERATOR_REGEX
      });
    }
  }, {
    key: "getReservedWordToken",
    value: function getReservedWordToken(input, previousToken) {
      // A reserved word cannot be preceded by a "."
      // this makes it so in "mytable.from", "from" is not considered a reserved word
      if (previousToken && previousToken.value && previousToken.value === '.') {
        return undefined;
      }

      return this.getTopLevelReservedToken(input) || this.getNewlineReservedToken(input) || this.getTopLevelReservedTokenNoIndent(input) || this.getPlainReservedToken(input);
    }
  }, {
    key: "getTopLevelReservedToken",
    value: function getTopLevelReservedToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL,
        regex: this.RESERVED_TOP_LEVEL_REGEX
      });
    }
  }, {
    key: "getNewlineReservedToken",
    value: function getNewlineReservedToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_NEWLINE,
        regex: this.RESERVED_NEWLINE_REGEX
      });
    }
  }, {
    key: "getTopLevelReservedTokenNoIndent",
    value: function getTopLevelReservedTokenNoIndent(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL_NO_INDENT,
        regex: this.RESERVED_TOP_LEVEL_NO_INDENT_REGEX
      });
    }
  }, {
    key: "getPlainReservedToken",
    value: function getPlainReservedToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED,
        regex: this.RESERVED_PLAIN_REGEX
      });
    }
  }, {
    key: "getWordToken",
    value: function getWordToken(input) {
      return this.getTokenOnFirstMatch({
        input: input,
        type: _tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].WORD,
        regex: this.WORD_REGEX
      });
    }
  }, {
    key: "getTokenOnFirstMatch",
    value: function getTokenOnFirstMatch(_ref3) {
      var input = _ref3.input,
          type = _ref3.type,
          regex = _ref3.regex;
      var matches = input.match(regex);
      return matches ? {
        type: type,
        value: matches[1]
      } : undefined;
    }
  }]);

  return Tokenizer;
}();



/***/ }),

/***/ "./src/core/regexFactory.js":
/*!**********************************!*\
  !*** ./src/core/regexFactory.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createOperatorRegex": () => (/* binding */ createOperatorRegex),
/* harmony export */   "createLineCommentRegex": () => (/* binding */ createLineCommentRegex),
/* harmony export */   "createReservedWordRegex": () => (/* binding */ createReservedWordRegex),
/* harmony export */   "createWordRegex": () => (/* binding */ createWordRegex),
/* harmony export */   "createStringRegex": () => (/* binding */ createStringRegex),
/* harmony export */   "createStringPattern": () => (/* binding */ createStringPattern),
/* harmony export */   "createParenRegex": () => (/* binding */ createParenRegex),
/* harmony export */   "createPlaceholderRegex": () => (/* binding */ createPlaceholderRegex)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils.js");

function createOperatorRegex(multiLetterOperators) {
  return new RegExp("^(".concat((0,_utils__WEBPACK_IMPORTED_MODULE_0__.sortByLengthDesc)(multiLetterOperators).map(_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp).join('|'), "|.)"), 'u');
}
function createLineCommentRegex(lineCommentTypes) {
  return new RegExp("^((?:".concat(lineCommentTypes.map(function (c) {
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp)(c);
  }).join('|'), ").*?)(?:\r\n|\r|\n|$)"), 'u');
}
function createReservedWordRegex(reservedWords) {
  if (reservedWords.length === 0) {
    return new RegExp("^\b$", 'u');
  }

  var reservedWordsPattern = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.sortByLengthDesc)(reservedWords).join('|').replace(/ /g, '\\s+');
  return new RegExp("^(".concat(reservedWordsPattern, ")\\b"), 'iu');
}
function createWordRegex() {
  var specialChars = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return new RegExp("^([\\p{Alphabetic}\\p{Mark}\\p{Decimal_Number}\\p{Connector_Punctuation}\\p{Join_Control}".concat(specialChars.join(''), "]+)"), 'u');
}
function createStringRegex(stringTypes) {
  return new RegExp('^(' + createStringPattern(stringTypes) + ')', 'u');
} // This enables the following string patterns:
// 1. backtick quoted string using `` to escape
// 2. square bracket quoted string (SQL Server) using ]] to escape
// 3. double quoted string using "" or \" to escape
// 4. single quoted string using '' or \' to escape
// 5. national character quoted string using N'' or N\' to escape
// 6. Unicode single-quoted string using \' to escape
// 7. Unicode double-quoted string using \" to escape
// 8. PostgreSQL dollar-quoted strings

function createStringPattern(stringTypes) {
  var patterns = {
    '``': '((`[^`]*($|`))+)',
    '{}': '((\\{[^\\}]*($|\\}))+)',
    '[]': '((\\[[^\\]]*($|\\]))(\\][^\\]]*($|\\]))*)',
    '""': '(("[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
    "''": "(('[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
    "N''": "((N'[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
    "U&''": "((U&'[^'\\\\]*(?:\\\\.[^'\\\\]*)*('|$))+)",
    'U&""': '((U&"[^"\\\\]*(?:\\\\.[^"\\\\]*)*("|$))+)',
    $$: '((?<tag>\\$\\w*\\$)[\\s\\S]*?(?:\\k<tag>|$))'
  };
  return stringTypes.map(function (t) {
    return patterns[t];
  }).join('|');
}
function createParenRegex(parens) {
  return new RegExp('^(' + parens.map(escapeParen).join('|') + ')', 'iu');
}

function escapeParen(paren) {
  if (paren.length === 1) {
    // A single punctuation character
    return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp)(paren);
  } else {
    // longer word
    return '\\b' + paren + '\\b';
  }
}

function createPlaceholderRegex(types, pattern) {
  if ((0,_utils__WEBPACK_IMPORTED_MODULE_0__.isEmpty)(types)) {
    return false;
  }

  var typesRegex = types.map(_utils__WEBPACK_IMPORTED_MODULE_0__.escapeRegExp).join('|');
  return new RegExp("^((?:".concat(typesRegex, ")(?:").concat(pattern, "))"), 'u');
}

/***/ }),

/***/ "./src/core/token.js":
/*!***************************!*\
  !*** ./src/core/token.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isAnd": () => (/* binding */ isAnd),
/* harmony export */   "isBetween": () => (/* binding */ isBetween),
/* harmony export */   "isLimit": () => (/* binding */ isLimit),
/* harmony export */   "isSet": () => (/* binding */ isSet),
/* harmony export */   "isBy": () => (/* binding */ isBy),
/* harmony export */   "isWindow": () => (/* binding */ isWindow),
/* harmony export */   "isEnd": () => (/* binding */ isEnd)
/* harmony export */ });
/* harmony import */ var _tokenTypes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tokenTypes */ "./src/core/tokenTypes.js");


var isToken = function isToken(type, regex) {
  return function (token) {
    return (token === null || token === void 0 ? void 0 : token.type) === type && regex.test(token === null || token === void 0 ? void 0 : token.value);
  };
};

var isAnd = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_NEWLINE, /^AND$/i);
var isBetween = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED, /^BETWEEN$/i);
var isLimit = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL, /^LIMIT$/i);
var isSet = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL, /^[S\u017F]ET$/i);
var isBy = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED, /^BY$/i);
var isWindow = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].RESERVED_TOP_LEVEL, /^WINDOW$/i);
var isEnd = isToken(_tokenTypes__WEBPACK_IMPORTED_MODULE_0__["default"].CLOSE_PAREN, /^END$/i);

/***/ }),

/***/ "./src/core/tokenTypes.js":
/*!********************************!*\
  !*** ./src/core/tokenTypes.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * Constants for token types
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  WORD: 'word',
  STRING: 'string',
  RESERVED: 'reserved',
  RESERVED_TOP_LEVEL: 'reserved-top-level',
  RESERVED_TOP_LEVEL_NO_INDENT: 'reserved-top-level-no-indent',
  RESERVED_NEWLINE: 'reserved-newline',
  OPERATOR: 'operator',
  OPEN_PAREN: 'open-paren',
  CLOSE_PAREN: 'close-paren',
  LINE_COMMENT: 'line-comment',
  BLOCK_COMMENT: 'block-comment',
  NUMBER: 'number',
  PLACEHOLDER: 'placeholder'
});

/***/ }),

/***/ "./src/languages/Db2Formatter.js":
/*!***************************************!*\
  !*** ./src/languages/Db2Formatter.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Db2Formatter)
/* harmony export */ });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var reservedWords = ['ABS', 'ACTIVATE', 'ALIAS', 'ALL', 'ALLOCATE', 'ALLOW', 'ALTER', 'ANY', 'ARE', 'ARRAY', 'AS', 'ASC', 'ASENSITIVE', 'ASSOCIATE', 'ASUTIME', 'ASYMMETRIC', 'AT', 'ATOMIC', 'ATTRIBUTES', 'AUDIT', 'AUTHORIZATION', 'AUX', 'AUXILIARY', 'AVG', 'BEFORE', 'BEGIN', 'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOOLEAN', 'BOTH', 'BUFFERPOOL', 'BY', 'CACHE', 'CALL', 'CALLED', 'CAPTURE', 'CARDINALITY', 'CASCADED', 'CASE', 'CAST', 'CCSID', 'CEIL', 'CEILING', 'CHAR', 'CHARACTER', 'CHARACTER_LENGTH', 'CHAR_LENGTH', 'CHECK', 'CLOB', 'CLONE', 'CLOSE', 'CLUSTER', 'COALESCE', 'COLLATE', 'COLLECT', 'COLLECTION', 'COLLID', 'COLUMN', 'COMMENT', 'COMMIT', 'CONCAT', 'CONDITION', 'CONNECT', 'CONNECTION', 'CONSTRAINT', 'CONTAINS', 'CONTINUE', 'CONVERT', 'CORR', 'CORRESPONDING', 'COUNT', 'COUNT_BIG', 'COVAR_POP', 'COVAR_SAMP', 'CREATE', 'CROSS', 'CUBE', 'CUME_DIST', 'CURRENT', 'CURRENT_DATE', 'CURRENT_DEFAULT_TRANSFORM_GROUP', 'CURRENT_LC_CTYPE', 'CURRENT_PATH', 'CURRENT_ROLE', 'CURRENT_SCHEMA', 'CURRENT_SERVER', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_TIMEZONE', 'CURRENT_TRANSFORM_GROUP_FOR_TYPE', 'CURRENT_USER', 'CURSOR', 'CYCLE', 'DATA', 'DATABASE', 'DATAPARTITIONNAME', 'DATAPARTITIONNUM', 'DATE', 'DAY', 'DAYS', 'DB2GENERAL', 'DB2GENRL', 'DB2SQL', 'DBINFO', 'DBPARTITIONNAME', 'DBPARTITIONNUM', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DEFAULTS', 'DEFINITION', 'DELETE', 'DENSERANK', 'DENSE_RANK', 'DEREF', 'DESCRIBE', 'DESCRIPTOR', 'DETERMINISTIC', 'DIAGNOSTICS', 'DISABLE', 'DISALLOW', 'DISCONNECT', 'DISTINCT', 'DO', 'DOCUMENT', 'DOUBLE', 'DROP', 'DSSIZE', 'DYNAMIC', 'EACH', 'EDITPROC', 'ELEMENT', 'ELSE', 'ELSEIF', 'ENABLE', 'ENCODING', 'ENCRYPTION', 'END', 'END-EXEC', 'ENDING', 'ERASE', 'ESCAPE', 'EVERY', 'EXCEPTION', 'EXCLUDING', 'EXCLUSIVE', 'EXEC', 'EXECUTE', 'EXISTS', 'EXIT', 'EXP', 'EXPLAIN', 'EXTENDED', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FENCED', 'FETCH', 'FIELDPROC', 'FILE', 'FILTER', 'FINAL', 'FIRST', 'FLOAT', 'FLOOR', 'FOR', 'FOREIGN', 'FREE', 'FULL', 'FUNCTION', 'FUSION', 'GENERAL', 'GENERATED', 'GET', 'GLOBAL', 'GOTO', 'GRANT', 'GRAPHIC', 'GROUP', 'GROUPING', 'HANDLER', 'HASH', 'HASHED_VALUE', 'HINT', 'HOLD', 'HOUR', 'HOURS', 'IDENTITY', 'IF', 'IMMEDIATE', 'IN', 'INCLUDING', 'INCLUSIVE', 'INCREMENT', 'INDEX', 'INDICATOR', 'INDICATORS', 'INF', 'INFINITY', 'INHERIT', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INT', 'INTEGER', 'INTEGRITY', 'INTERSECTION', 'INTERVAL', 'INTO', 'IS', 'ISOBID', 'ISOLATION', 'ITERATE', 'JAR', 'JAVA', 'KEEP', 'KEY', 'LABEL', 'LANGUAGE', 'LARGE', 'LATERAL', 'LC_CTYPE', 'LEADING', 'LEAVE', 'LEFT', 'LIKE', 'LINKTYPE', 'LN', 'LOCAL', 'LOCALDATE', 'LOCALE', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCATOR', 'LOCATORS', 'LOCK', 'LOCKMAX', 'LOCKSIZE', 'LONG', 'LOOP', 'LOWER', 'MAINTAINED', 'MATCH', 'MATERIALIZED', 'MAX', 'MAXVALUE', 'MEMBER', 'MERGE', 'METHOD', 'MICROSECOND', 'MICROSECONDS', 'MIN', 'MINUTE', 'MINUTES', 'MINVALUE', 'MOD', 'MODE', 'MODIFIES', 'MODULE', 'MONTH', 'MONTHS', 'MULTISET', 'NAN', 'NATIONAL', 'NATURAL', 'NCHAR', 'NCLOB', 'NEW', 'NEW_TABLE', 'NEXTVAL', 'NO', 'NOCACHE', 'NOCYCLE', 'NODENAME', 'NODENUMBER', 'NOMAXVALUE', 'NOMINVALUE', 'NONE', 'NOORDER', 'NORMALIZE', 'NORMALIZED', 'NOT', 'NULL', 'NULLIF', 'NULLS', 'NUMERIC', 'NUMPARTS', 'OBID', 'OCTET_LENGTH', 'OF', 'OFFSET', 'OLD', 'OLD_TABLE', 'ON', 'ONLY', 'OPEN', 'OPTIMIZATION', 'OPTIMIZE', 'OPTION', 'ORDER', 'OUT', 'OUTER', 'OVER', 'OVERLAPS', 'OVERLAY', 'OVERRIDING', 'PACKAGE', 'PADDED', 'PAGESIZE', 'PARAMETER', 'PART', 'PARTITION', 'PARTITIONED', 'PARTITIONING', 'PARTITIONS', 'PASSWORD', 'PATH', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'PERCENT_RANK', 'PIECESIZE', 'PLAN', 'POSITION', 'POWER', 'PRECISION', 'PREPARE', 'PREVVAL', 'PRIMARY', 'PRIQTY', 'PRIVILEGES', 'PROCEDURE', 'PROGRAM', 'PSID', 'PUBLIC', 'QUERY', 'QUERYNO', 'RANGE', 'RANK', 'READ', 'READS', 'REAL', 'RECOVERY', 'RECURSIVE', 'REF', 'REFERENCES', 'REFERENCING', 'REFRESH', 'REGR_AVGX', 'REGR_AVGY', 'REGR_COUNT', 'REGR_INTERCEPT', 'REGR_R2', 'REGR_SLOPE', 'REGR_SXX', 'REGR_SXY', 'REGR_SYY', 'RELEASE', 'RENAME', 'REPEAT', 'RESET', 'RESIGNAL', 'RESTART', 'RESTRICT', 'RESULT', 'RESULT_SET_LOCATOR', 'RETURN', 'RETURNS', 'REVOKE', 'RIGHT', 'ROLE', 'ROLLBACK', 'ROLLUP', 'ROUND_CEILING', 'ROUND_DOWN', 'ROUND_FLOOR', 'ROUND_HALF_DOWN', 'ROUND_HALF_EVEN', 'ROUND_HALF_UP', 'ROUND_UP', 'ROUTINE', 'ROW', 'ROWNUMBER', 'ROWS', 'ROWSET', 'ROW_NUMBER', 'RRN', 'RUN', 'SAVEPOINT', 'SCHEMA', 'SCOPE', 'SCRATCHPAD', 'SCROLL', 'SEARCH', 'SECOND', 'SECONDS', 'SECQTY', 'SECURITY', 'SENSITIVE', 'SEQUENCE', 'SESSION', 'SESSION_USER', 'SIGNAL', 'SIMILAR', 'SIMPLE', 'SMALLINT', 'SNAN', 'SOME', 'SOURCE', 'SPECIFIC', 'SPECIFICTYPE', 'SQL', 'SQLEXCEPTION', 'SQLID', 'SQLSTATE', 'SQLWARNING', 'SQRT', 'STACKED', 'STANDARD', 'START', 'STARTING', 'STATEMENT', 'STATIC', 'STATMENT', 'STAY', 'STDDEV_POP', 'STDDEV_SAMP', 'STOGROUP', 'STORES', 'STYLE', 'SUBMULTISET', 'SUBSTRING', 'SUM', 'SUMMARY', 'SYMMETRIC', 'SYNONYM', 'SYSFUN', 'SYSIBM', 'SYSPROC', 'SYSTEM', 'SYSTEM_USER', 'TABLE', 'TABLESAMPLE', 'TABLESPACE', 'THEN', 'TIME', 'TIMESTAMP', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TO', 'TRAILING', 'TRANSACTION', 'TRANSLATE', 'TRANSLATION', 'TREAT', 'TRIGGER', 'TRIM', 'TRUE', 'TRUNCATE', 'TYPE', 'UESCAPE', 'UNDO', 'UNIQUE', 'UNKNOWN', 'UNNEST', 'UNTIL', 'UPPER', 'USAGE', 'USER', 'USING', 'VALIDPROC', 'VALUE', 'VARCHAR', 'VARIABLE', 'VARIANT', 'VARYING', 'VAR_POP', 'VAR_SAMP', 'VCAT', 'VERSION', 'VIEW', 'VOLATILE', 'VOLUMES', 'WHEN', 'WHENEVER', 'WHILE', 'WIDTH_BUCKET', 'WINDOW', 'WITH', 'WITHIN', 'WITHOUT', 'WLM', 'WRITE', 'XMLELEMENT', 'XMLEXISTS', 'XMLNAMESPACES', 'YEAR', 'YEARS'];
var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER TABLE', 'DELETE FROM', 'EXCEPT', 'FETCH FIRST', 'FROM', 'GROUP BY', 'GO', 'HAVING', 'INSERT INTO', 'INTERSECT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'OR', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN']; // For reference: https://www.ibm.com/support/knowledgecenter/en/ssw_ibm_i_72/db2/rbafzintro.htm

var Db2Formatter = /*#__PURE__*/function (_Formatter) {
  _inherits(Db2Formatter, _Formatter);

  var _super = _createSuper(Db2Formatter);

  function Db2Formatter() {
    _classCallCheck(this, Db2Formatter);

    return _super.apply(this, arguments);
  }

  _createClass(Db2Formatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "''", '``', '[]'],
        openParens: ['('],
        closeParens: [')'],
        indexedPlaceholderTypes: ['?'],
        namedPlaceholderTypes: [':'],
        lineCommentTypes: ['--'],
        specialWordChars: ['#', '@'],
        operators: ['**', '!=', '!>', '!>', '||']
      });
    }
  }]);

  return Db2Formatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/MariaDbFormatter.js":
/*!*******************************************!*\
  !*** ./src/languages/MariaDbFormatter.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MariaDbFormatter)
/* harmony export */ });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var reservedWords = ['ACCESSIBLE', 'ADD', 'ALL', 'ALTER', 'ANALYZE', 'AND', 'AS', 'ASC', 'ASENSITIVE', 'BEFORE', 'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOTH', 'BY', 'CALL', 'CASCADE', 'CASE', 'CHANGE', 'CHAR', 'CHARACTER', 'CHECK', 'COLLATE', 'COLUMN', 'CONDITION', 'CONSTRAINT', 'CONTINUE', 'CONVERT', 'CREATE', 'CROSS', 'CURRENT_DATE', 'CURRENT_ROLE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURSOR', 'DATABASE', 'DATABASES', 'DAY_HOUR', 'DAY_MICROSECOND', 'DAY_MINUTE', 'DAY_SECOND', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DELAYED', 'DELETE', 'DESC', 'DESCRIBE', 'DETERMINISTIC', 'DISTINCT', 'DISTINCTROW', 'DIV', 'DO_DOMAIN_IDS', 'DOUBLE', 'DROP', 'DUAL', 'EACH', 'ELSE', 'ELSEIF', 'ENCLOSED', 'ESCAPED', 'EXCEPT', 'EXISTS', 'EXIT', 'EXPLAIN', 'FALSE', 'FETCH', 'FLOAT', 'FLOAT4', 'FLOAT8', 'FOR', 'FORCE', 'FOREIGN', 'FROM', 'FULLTEXT', 'GENERAL', 'GRANT', 'GROUP', 'HAVING', 'HIGH_PRIORITY', 'HOUR_MICROSECOND', 'HOUR_MINUTE', 'HOUR_SECOND', 'IF', 'IGNORE', 'IGNORE_DOMAIN_IDS', 'IGNORE_SERVER_IDS', 'IN', 'INDEX', 'INFILE', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INT', 'INT1', 'INT2', 'INT3', 'INT4', 'INT8', 'INTEGER', 'INTERSECT', 'INTERVAL', 'INTO', 'IS', 'ITERATE', 'JOIN', 'KEY', 'KEYS', 'KILL', 'LEADING', 'LEAVE', 'LEFT', 'LIKE', 'LIMIT', 'LINEAR', 'LINES', 'LOAD', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCK', 'LONG', 'LONGBLOB', 'LONGTEXT', 'LOOP', 'LOW_PRIORITY', 'MASTER_HEARTBEAT_PERIOD', 'MASTER_SSL_VERIFY_SERVER_CERT', 'MATCH', 'MAXVALUE', 'MEDIUMBLOB', 'MEDIUMINT', 'MEDIUMTEXT', 'MIDDLEINT', 'MINUTE_MICROSECOND', 'MINUTE_SECOND', 'MOD', 'MODIFIES', 'NATURAL', 'NOT', 'NO_WRITE_TO_BINLOG', 'NULL', 'NUMERIC', 'ON', 'OPTIMIZE', 'OPTION', 'OPTIONALLY', 'OR', 'ORDER', 'OUT', 'OUTER', 'OUTFILE', 'OVER', 'PAGE_CHECKSUM', 'PARSE_VCOL_EXPR', 'PARTITION', 'POSITION', 'PRECISION', 'PRIMARY', 'PROCEDURE', 'PURGE', 'RANGE', 'READ', 'READS', 'READ_WRITE', 'REAL', 'RECURSIVE', 'REF_SYSTEM_ID', 'REFERENCES', 'REGEXP', 'RELEASE', 'RENAME', 'REPEAT', 'REPLACE', 'REQUIRE', 'RESIGNAL', 'RESTRICT', 'RETURN', 'RETURNING', 'REVOKE', 'RIGHT', 'RLIKE', 'ROWS', 'SCHEMA', 'SCHEMAS', 'SECOND_MICROSECOND', 'SELECT', 'SENSITIVE', 'SEPARATOR', 'SET', 'SHOW', 'SIGNAL', 'SLOW', 'SMALLINT', 'SPATIAL', 'SPECIFIC', 'SQL', 'SQLEXCEPTION', 'SQLSTATE', 'SQLWARNING', 'SQL_BIG_RESULT', 'SQL_CALC_FOUND_ROWS', 'SQL_SMALL_RESULT', 'SSL', 'STARTING', 'STATS_AUTO_RECALC', 'STATS_PERSISTENT', 'STATS_SAMPLE_PAGES', 'STRAIGHT_JOIN', 'TABLE', 'TERMINATED', 'THEN', 'TINYBLOB', 'TINYINT', 'TINYTEXT', 'TO', 'TRAILING', 'TRIGGER', 'TRUE', 'UNDO', 'UNION', 'UNIQUE', 'UNLOCK', 'UNSIGNED', 'UPDATE', 'USAGE', 'USE', 'USING', 'UTC_DATE', 'UTC_TIME', 'UTC_TIMESTAMP', 'VALUES', 'VARBINARY', 'VARCHAR', 'VARCHARACTER', 'VARYING', 'WHEN', 'WHERE', 'WHILE', 'WINDOW', 'WITH', 'WRITE', 'XOR', 'YEAR_MONTH', 'ZEROFILL'];
var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'DELETE FROM', 'EXCEPT', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'WHEN', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN', // non-standard joins
'STRAIGHT_JOIN', 'NATURAL LEFT JOIN', 'NATURAL LEFT OUTER JOIN', 'NATURAL RIGHT JOIN', 'NATURAL RIGHT OUTER JOIN']; // For reference: https://mariadb.com/kb/en/sql-statements-structure/

var MariaDbFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(MariaDbFormatter, _Formatter);

  var _super = _createSuper(MariaDbFormatter);

  function MariaDbFormatter() {
    _classCallCheck(this, MariaDbFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(MariaDbFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ['``', "''", '""'],
        openParens: ['(', 'CASE'],
        closeParens: [')', 'END'],
        indexedPlaceholderTypes: ['?'],
        namedPlaceholderTypes: [],
        lineCommentTypes: ['--', '#'],
        specialWordChars: ['@'],
        operators: [':=', '<<', '>>', '!=', '<>', '<=>', '&&', '||']
      });
    }
  }]);

  return MariaDbFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/MySqlFormatter.js":
/*!*****************************************!*\
  !*** ./src/languages/MySqlFormatter.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MySqlFormatter)
/* harmony export */ });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var reservedWords = ['ACCESSIBLE', 'ADD', 'ALL', 'ALTER', 'ANALYZE', 'AND', 'AS', 'ASC', 'ASENSITIVE', 'BEFORE', 'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOTH', 'BY', 'CALL', 'CASCADE', 'CASE', 'CHANGE', 'CHAR', 'CHARACTER', 'CHECK', 'COLLATE', 'COLUMN', 'CONDITION', 'CONSTRAINT', 'CONTINUE', 'CONVERT', 'CREATE', 'CROSS', 'CUBE', 'CUME_DIST', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURSOR', 'DATABASE', 'DATABASES', 'DAY_HOUR', 'DAY_MICROSECOND', 'DAY_MINUTE', 'DAY_SECOND', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DELAYED', 'DELETE', 'DENSE_RANK', 'DESC', 'DESCRIBE', 'DETERMINISTIC', 'DISTINCT', 'DISTINCTROW', 'DIV', 'DOUBLE', 'DROP', 'DUAL', 'EACH', 'ELSE', 'ELSEIF', 'EMPTY', 'ENCLOSED', 'ESCAPED', 'EXCEPT', 'EXISTS', 'EXIT', 'EXPLAIN', 'FALSE', 'FETCH', 'FIRST_VALUE', 'FLOAT', 'FLOAT4', 'FLOAT8', 'FOR', 'FORCE', 'FOREIGN', 'FROM', 'FULLTEXT', 'FUNCTION', 'GENERATED', 'GET', 'GRANT', 'GROUP', 'GROUPING', 'GROUPS', 'HAVING', 'HIGH_PRIORITY', 'HOUR_MICROSECOND', 'HOUR_MINUTE', 'HOUR_SECOND', 'IF', 'IGNORE', 'IN', 'INDEX', 'INFILE', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INT', 'INT1', 'INT2', 'INT3', 'INT4', 'INT8', 'INTEGER', 'INTERVAL', 'INTO', 'IO_AFTER_GTIDS', 'IO_BEFORE_GTIDS', 'IS', 'ITERATE', 'JOIN', 'JSON_TABLE', 'KEY', 'KEYS', 'KILL', 'LAG', 'LAST_VALUE', 'LATERAL', 'LEAD', 'LEADING', 'LEAVE', 'LEFT', 'LIKE', 'LIMIT', 'LINEAR', 'LINES', 'LOAD', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCK', 'LONG', 'LONGBLOB', 'LONGTEXT', 'LOOP', 'LOW_PRIORITY', 'MASTER_BIND', 'MASTER_SSL_VERIFY_SERVER_CERT', 'MATCH', 'MAXVALUE', 'MEDIUMBLOB', 'MEDIUMINT', 'MEDIUMTEXT', 'MIDDLEINT', 'MINUTE_MICROSECOND', 'MINUTE_SECOND', 'MOD', 'MODIFIES', 'NATURAL', 'NOT', 'NO_WRITE_TO_BINLOG', 'NTH_VALUE', 'NTILE', 'NULL', 'NUMERIC', 'OF', 'ON', 'OPTIMIZE', 'OPTIMIZER_COSTS', 'OPTION', 'OPTIONALLY', 'OR', 'ORDER', 'OUT', 'OUTER', 'OUTFILE', 'OVER', 'PARTITION', 'PERCENT_RANK', 'PRECISION', 'PRIMARY', 'PROCEDURE', 'PURGE', 'RANGE', 'RANK', 'READ', 'READS', 'READ_WRITE', 'REAL', 'RECURSIVE', 'REFERENCES', 'REGEXP', 'RELEASE', 'RENAME', 'REPEAT', 'REPLACE', 'REQUIRE', 'RESIGNAL', 'RESTRICT', 'RETURN', 'REVOKE', 'RIGHT', 'RLIKE', 'ROW', 'ROWS', 'ROW_NUMBER', 'SCHEMA', 'SCHEMAS', 'SECOND_MICROSECOND', 'SELECT', 'SENSITIVE', 'SEPARATOR', 'SET', 'SHOW', 'SIGNAL', 'SMALLINT', 'SPATIAL', 'SPECIFIC', 'SQL', 'SQLEXCEPTION', 'SQLSTATE', 'SQLWARNING', 'SQL_BIG_RESULT', 'SQL_CALC_FOUND_ROWS', 'SQL_SMALL_RESULT', 'SSL', 'STARTING', 'STORED', 'STRAIGHT_JOIN', 'SYSTEM', 'TABLE', 'TERMINATED', 'THEN', 'TINYBLOB', 'TINYINT', 'TINYTEXT', 'TO', 'TRAILING', 'TRIGGER', 'TRUE', 'UNDO', 'UNION', 'UNIQUE', 'UNLOCK', 'UNSIGNED', 'UPDATE', 'USAGE', 'USE', 'USING', 'UTC_DATE', 'UTC_TIME', 'UTC_TIMESTAMP', 'VALUES', 'VARBINARY', 'VARCHAR', 'VARCHARACTER', 'VARYING', 'VIRTUAL', 'WHEN', 'WHERE', 'WHILE', 'WINDOW', 'WITH', 'WRITE', 'XOR', 'YEAR_MONTH', 'ZEROFILL'];
var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'DELETE FROM', 'EXCEPT', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'WHEN', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN', // non-standard joins
'STRAIGHT_JOIN', 'NATURAL LEFT JOIN', 'NATURAL LEFT OUTER JOIN', 'NATURAL RIGHT JOIN', 'NATURAL RIGHT OUTER JOIN'];

var MySqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(MySqlFormatter, _Formatter);

  var _super = _createSuper(MySqlFormatter);

  function MySqlFormatter() {
    _classCallCheck(this, MySqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(MySqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ['``', "''", '""'],
        openParens: ['(', 'CASE'],
        closeParens: [')', 'END'],
        indexedPlaceholderTypes: ['?'],
        namedPlaceholderTypes: [],
        lineCommentTypes: ['--', '#'],
        specialWordChars: ['@'],
        operators: [':=', '<<', '>>', '!=', '<>', '<=>', '&&', '||', '->', '->>']
      });
    }
  }]);

  return MySqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/N1qlFormatter.js":
/*!****************************************!*\
  !*** ./src/languages/N1qlFormatter.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ N1qlFormatter)
/* harmony export */ });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var reservedWords = ['ALL', 'ALTER', 'ANALYZE', 'AND', 'ANY', 'ARRAY', 'AS', 'ASC', 'BEGIN', 'BETWEEN', 'BINARY', 'BOOLEAN', 'BREAK', 'BUCKET', 'BUILD', 'BY', 'CALL', 'CASE', 'CAST', 'CLUSTER', 'COLLATE', 'COLLECTION', 'COMMIT', 'CONNECT', 'CONTINUE', 'CORRELATE', 'COVER', 'CREATE', 'DATABASE', 'DATASET', 'DATASTORE', 'DECLARE', 'DECREMENT', 'DELETE', 'DERIVED', 'DESC', 'DESCRIBE', 'DISTINCT', 'DO', 'DROP', 'EACH', 'ELEMENT', 'ELSE', 'END', 'EVERY', 'EXCEPT', 'EXCLUDE', 'EXECUTE', 'EXISTS', 'EXPLAIN', 'FALSE', 'FETCH', 'FIRST', 'FLATTEN', 'FOR', 'FORCE', 'FROM', 'FUNCTION', 'GRANT', 'GROUP', 'GSI', 'HAVING', 'IF', 'IGNORE', 'ILIKE', 'IN', 'INCLUDE', 'INCREMENT', 'INDEX', 'INFER', 'INLINE', 'INNER', 'INSERT', 'INTERSECT', 'INTO', 'IS', 'JOIN', 'KEY', 'KEYS', 'KEYSPACE', 'KNOWN', 'LAST', 'LEFT', 'LET', 'LETTING', 'LIKE', 'LIMIT', 'LSM', 'MAP', 'MAPPING', 'MATCHED', 'MATERIALIZED', 'MERGE', 'MISSING', 'NAMESPACE', 'NEST', 'NOT', 'NULL', 'NUMBER', 'OBJECT', 'OFFSET', 'ON', 'OPTION', 'OR', 'ORDER', 'OUTER', 'OVER', 'PARSE', 'PARTITION', 'PASSWORD', 'PATH', 'POOL', 'PREPARE', 'PRIMARY', 'PRIVATE', 'PRIVILEGE', 'PROCEDURE', 'PUBLIC', 'RAW', 'REALM', 'REDUCE', 'RENAME', 'RETURN', 'RETURNING', 'REVOKE', 'RIGHT', 'ROLE', 'ROLLBACK', 'SATISFIES', 'SCHEMA', 'SELECT', 'SELF', 'SEMI', 'SET', 'SHOW', 'SOME', 'START', 'STATISTICS', 'STRING', 'SYSTEM', 'THEN', 'TO', 'TRANSACTION', 'TRIGGER', 'TRUE', 'TRUNCATE', 'UNDER', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNNEST', 'UNSET', 'UPDATE', 'UPSERT', 'USE', 'USER', 'USING', 'VALIDATE', 'VALUE', 'VALUED', 'VALUES', 'VIA', 'VIEW', 'WHEN', 'WHERE', 'WHILE', 'WITH', 'WITHIN', 'WORK', 'XOR'];
var reservedTopLevelWords = ['DELETE FROM', 'EXCEPT ALL', 'EXCEPT', 'EXPLAIN DELETE FROM', 'EXPLAIN UPDATE', 'EXPLAIN UPSERT', 'FROM', 'GROUP BY', 'HAVING', 'INFER', 'INSERT INTO', 'LET', 'LIMIT', 'MERGE', 'NEST', 'ORDER BY', 'PREPARE', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UNNEST', 'UPDATE', 'UPSERT', 'USE KEYS', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'OR', 'XOR', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN']; // For reference: http://docs.couchbase.com.s3-website-us-west-1.amazonaws.com/server/6.0/n1ql/n1ql-language-reference/index.html

var N1qlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(N1qlFormatter, _Formatter);

  var _super = _createSuper(N1qlFormatter);

  function N1qlFormatter() {
    _classCallCheck(this, N1qlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(N1qlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "''", '``'],
        openParens: ['(', '[', '{'],
        closeParens: [')', ']', '}'],
        namedPlaceholderTypes: ['$'],
        lineCommentTypes: ['#', '--'],
        operators: ['==', '!=']
      });
    }
  }]);

  return N1qlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/PlSqlFormatter.js":
/*!*****************************************!*\
  !*** ./src/languages/PlSqlFormatter.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PlSqlFormatter)
/* harmony export */ });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/token */ "./src/core/token.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
/* harmony import */ var _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/tokenTypes */ "./src/core/tokenTypes.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var reservedWords = ['A', 'ACCESSIBLE', 'AGENT', 'AGGREGATE', 'ALL', 'ALTER', 'ANY', 'ARRAY', 'AS', 'ASC', 'AT', 'ATTRIBUTE', 'AUTHID', 'AVG', 'BETWEEN', 'BFILE_BASE', 'BINARY_INTEGER', 'BINARY', 'BLOB_BASE', 'BLOCK', 'BODY', 'BOOLEAN', 'BOTH', 'BOUND', 'BREADTH', 'BULK', 'BY', 'BYTE', 'C', 'CALL', 'CALLING', 'CASCADE', 'CASE', 'CHAR_BASE', 'CHAR', 'CHARACTER', 'CHARSET', 'CHARSETFORM', 'CHARSETID', 'CHECK', 'CLOB_BASE', 'CLONE', 'CLOSE', 'CLUSTER', 'CLUSTERS', 'COALESCE', 'COLAUTH', 'COLLECT', 'COLUMNS', 'COMMENT', 'COMMIT', 'COMMITTED', 'COMPILED', 'COMPRESS', 'CONNECT', 'CONSTANT', 'CONSTRUCTOR', 'CONTEXT', 'CONTINUE', 'CONVERT', 'COUNT', 'CRASH', 'CREATE', 'CREDENTIAL', 'CURRENT', 'CURRVAL', 'CURSOR', 'CUSTOMDATUM', 'DANGLING', 'DATA', 'DATE_BASE', 'DATE', 'DAY', 'DECIMAL', 'DEFAULT', 'DEFINE', 'DELETE', 'DEPTH', 'DESC', 'DETERMINISTIC', 'DIRECTORY', 'DISTINCT', 'DO', 'DOUBLE', 'DROP', 'DURATION', 'ELEMENT', 'ELSIF', 'EMPTY', 'END', 'ESCAPE', 'EXCEPTIONS', 'EXCLUSIVE', 'EXECUTE', 'EXISTS', 'EXIT', 'EXTENDS', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FETCH', 'FINAL', 'FIRST', 'FIXED', 'FLOAT', 'FOR', 'FORALL', 'FORCE', 'FROM', 'FUNCTION', 'GENERAL', 'GOTO', 'GRANT', 'GROUP', 'HASH', 'HEAP', 'HIDDEN', 'HOUR', 'IDENTIFIED', 'IF', 'IMMEDIATE', 'IN', 'INCLUDING', 'INDEX', 'INDEXES', 'INDICATOR', 'INDICES', 'INFINITE', 'INSTANTIABLE', 'INT', 'INTEGER', 'INTERFACE', 'INTERVAL', 'INTO', 'INVALIDATE', 'IS', 'ISOLATION', 'JAVA', 'LANGUAGE', 'LARGE', 'LEADING', 'LENGTH', 'LEVEL', 'LIBRARY', 'LIKE', 'LIKE2', 'LIKE4', 'LIKEC', 'LIMITED', 'LOCAL', 'LOCK', 'LONG', 'MAP', 'MAX', 'MAXLEN', 'MEMBER', 'MERGE', 'MIN', 'MINUTE', 'MLSLABEL', 'MOD', 'MODE', 'MONTH', 'MULTISET', 'NAME', 'NAN', 'NATIONAL', 'NATIVE', 'NATURAL', 'NATURALN', 'NCHAR', 'NEW', 'NEXTVAL', 'NOCOMPRESS', 'NOCOPY', 'NOT', 'NOWAIT', 'NULL', 'NULLIF', 'NUMBER_BASE', 'NUMBER', 'OBJECT', 'OCICOLL', 'OCIDATE', 'OCIDATETIME', 'OCIDURATION', 'OCIINTERVAL', 'OCILOBLOCATOR', 'OCINUMBER', 'OCIRAW', 'OCIREF', 'OCIREFCURSOR', 'OCIROWID', 'OCISTRING', 'OCITYPE', 'OF', 'OLD', 'ON', 'ONLY', 'OPAQUE', 'OPEN', 'OPERATOR', 'OPTION', 'ORACLE', 'ORADATA', 'ORDER', 'ORGANIZATION', 'ORLANY', 'ORLVARY', 'OTHERS', 'OUT', 'OVERLAPS', 'OVERRIDING', 'PACKAGE', 'PARALLEL_ENABLE', 'PARAMETER', 'PARAMETERS', 'PARENT', 'PARTITION', 'PASCAL', 'PCTFREE', 'PIPE', 'PIPELINED', 'PLS_INTEGER', 'PLUGGABLE', 'POSITIVE', 'POSITIVEN', 'PRAGMA', 'PRECISION', 'PRIOR', 'PRIVATE', 'PROCEDURE', 'PUBLIC', 'RAISE', 'RANGE', 'RAW', 'READ', 'REAL', 'RECORD', 'REF', 'REFERENCE', 'RELEASE', 'RELIES_ON', 'REM', 'REMAINDER', 'RENAME', 'RESOURCE', 'RESULT_CACHE', 'RESULT', 'RETURN', 'RETURNING', 'REVERSE', 'REVOKE', 'ROLLBACK', 'ROW', 'ROWID', 'ROWNUM', 'ROWTYPE', 'SAMPLE', 'SAVE', 'SAVEPOINT', 'SB1', 'SB2', 'SB4', 'SEARCH', 'SECOND', 'SEGMENT', 'SELF', 'SEPARATE', 'SEQUENCE', 'SERIALIZABLE', 'SHARE', 'SHORT', 'SIZE_T', 'SIZE', 'SMALLINT', 'SOME', 'SPACE', 'SPARSE', 'SQL', 'SQLCODE', 'SQLDATA', 'SQLERRM', 'SQLNAME', 'SQLSTATE', 'STANDARD', 'START', 'STATIC', 'STDDEV', 'STORED', 'STRING', 'STRUCT', 'STYLE', 'SUBMULTISET', 'SUBPARTITION', 'SUBSTITUTABLE', 'SUBTYPE', 'SUCCESSFUL', 'SUM', 'SYNONYM', 'SYSDATE', 'TABAUTH', 'TABLE', 'TDO', 'THE', 'THEN', 'TIME', 'TIMESTAMP', 'TIMEZONE_ABBR', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TIMEZONE_REGION', 'TO', 'TRAILING', 'TRANSACTION', 'TRANSACTIONAL', 'TRIGGER', 'TRUE', 'TRUSTED', 'TYPE', 'UB1', 'UB2', 'UB4', 'UID', 'UNDER', 'UNIQUE', 'UNPLUG', 'UNSIGNED', 'UNTRUSTED', 'USE', 'USER', 'USING', 'VALIDATE', 'VALIST', 'VALUE', 'VARCHAR', 'VARCHAR2', 'VARIABLE', 'VARIANCE', 'VARRAY', 'VARYING', 'VIEW', 'VIEWS', 'VOID', 'WHENEVER', 'WHILE', 'WITH', 'WORK', 'WRAPPED', 'WRITE', 'YEAR', 'ZONE'];
var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'BEGIN', 'CONNECT BY', 'DECLARE', 'DELETE FROM', 'DELETE', 'END', 'EXCEPT', 'EXCEPTION', 'FETCH FIRST', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'LOOP', 'MODIFY', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'START WITH', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'CROSS APPLY', 'ELSE', 'END', 'OR', 'OUTER APPLY', 'WHEN', 'XOR', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN'];

var PlSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(PlSqlFormatter, _Formatter);

  var _super = _createSuper(PlSqlFormatter);

  function PlSqlFormatter() {
    _classCallCheck(this, PlSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(PlSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_2__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "N''", "''", '``'],
        openParens: ['(', 'CASE'],
        closeParens: [')', 'END'],
        indexedPlaceholderTypes: ['?'],
        namedPlaceholderTypes: [':'],
        lineCommentTypes: ['--'],
        specialWordChars: ['_', '$', '#', '.', '@'],
        operators: ['||', '**', '!=', ':=']
      });
    }
  }, {
    key: "tokenOverride",
    value: function tokenOverride(token) {
      if ((0,_core_token__WEBPACK_IMPORTED_MODULE_1__.isSet)(token) && (0,_core_token__WEBPACK_IMPORTED_MODULE_1__.isBy)(this.previousReservedToken)) {
        return {
          type: _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__["default"].RESERVED,
          value: token.value
        };
      }

      return token;
    }
  }]);

  return PlSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/PostgreSqlFormatter.js":
/*!**********************************************!*\
  !*** ./src/languages/PostgreSqlFormatter.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PostgreSqlFormatter)
/* harmony export */ });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var reservedWords = ['ABORT', 'ABSOLUTE', 'ACCESS', 'ACTION', 'ADD', 'ADMIN', 'AFTER', 'AGGREGATE', 'ALL', 'ALSO', 'ALTER', 'ALWAYS', 'ANALYSE', 'ANALYZE', 'AND', 'ANY', 'ARRAY', 'AS', 'ASC', 'ASSERTION', 'ASSIGNMENT', 'ASYMMETRIC', 'AT', 'ATTACH', 'ATTRIBUTE', 'AUTHORIZATION', 'BACKWARD', 'BEFORE', 'BEGIN', 'BETWEEN', 'BIGINT', 'BINARY', 'BIT', 'BOOLEAN', 'BOTH', 'BY', 'CACHE', 'CALL', 'CALLED', 'CASCADE', 'CASCADED', 'CASE', 'CAST', 'CATALOG', 'CHAIN', 'CHAR', 'CHARACTER', 'CHARACTERISTICS', 'CHECK', 'CHECKPOINT', 'CLASS', 'CLOSE', 'CLUSTER', 'COALESCE', 'COLLATE', 'COLLATION', 'COLUMN', 'COLUMNS', 'COMMENT', 'COMMENTS', 'COMMIT', 'COMMITTED', 'CONCURRENTLY', 'CONFIGURATION', 'CONFLICT', 'CONNECTION', 'CONSTRAINT', 'CONSTRAINTS', 'CONTENT', 'CONTINUE', 'CONVERSION', 'COPY', 'COST', 'CREATE', 'CROSS', 'CSV', 'CUBE', 'CURRENT', 'CURRENT_CATALOG', 'CURRENT_DATE', 'CURRENT_ROLE', 'CURRENT_SCHEMA', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURSOR', 'CYCLE', 'DATA', 'DATABASE', 'DAY', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DEFAULTS', 'DEFERRABLE', 'DEFERRED', 'DEFINER', 'DELETE', 'DELIMITER', 'DELIMITERS', 'DEPENDS', 'DESC', 'DETACH', 'DICTIONARY', 'DISABLE', 'DISCARD', 'DISTINCT', 'DO', 'DOCUMENT', 'DOMAIN', 'DOUBLE', 'DROP', 'EACH', 'ELSE', 'ENABLE', 'ENCODING', 'ENCRYPTED', 'END', 'ENUM', 'ESCAPE', 'EVENT', 'EXCEPT', 'EXCLUDE', 'EXCLUDING', 'EXCLUSIVE', 'EXECUTE', 'EXISTS', 'EXPLAIN', 'EXPRESSION', 'EXTENSION', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FAMILY', 'FETCH', 'FILTER', 'FIRST', 'FLOAT', 'FOLLOWING', 'FOR', 'FORCE', 'FOREIGN', 'FORWARD', 'FREEZE', 'FROM', 'FULL', 'FUNCTION', 'FUNCTIONS', 'GENERATED', 'GLOBAL', 'GRANT', 'GRANTED', 'GREATEST', 'GROUP', 'GROUPING', 'GROUPS', 'HANDLER', 'HAVING', 'HEADER', 'HOLD', 'HOUR', 'IDENTITY', 'IF', 'ILIKE', 'IMMEDIATE', 'IMMUTABLE', 'IMPLICIT', 'IMPORT', 'IN', 'INCLUDE', 'INCLUDING', 'INCREMENT', 'INDEX', 'INDEXES', 'INHERIT', 'INHERITS', 'INITIALLY', 'INLINE', 'INNER', 'INOUT', 'INPUT', 'INSENSITIVE', 'INSERT', 'INSTEAD', 'INT', 'INTEGER', 'INTERSECT', 'INTERVAL', 'INTO', 'INVOKER', 'IS', 'ISNULL', 'ISOLATION', 'JOIN', 'KEY', 'LABEL', 'LANGUAGE', 'LARGE', 'LAST', 'LATERAL', 'LEADING', 'LEAKPROOF', 'LEAST', 'LEFT', 'LEVEL', 'LIKE', 'LIMIT', 'LISTEN', 'LOAD', 'LOCAL', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCATION', 'LOCK', 'LOCKED', 'LOGGED', 'MAPPING', 'MATCH', 'MATERIALIZED', 'MAXVALUE', 'METHOD', 'MINUTE', 'MINVALUE', 'MODE', 'MONTH', 'MOVE', 'NAME', 'NAMES', 'NATIONAL', 'NATURAL', 'NCHAR', 'NEW', 'NEXT', 'NFC', 'NFD', 'NFKC', 'NFKD', 'NO', 'NONE', 'NORMALIZE', 'NORMALIZED', 'NOT', 'NOTHING', 'NOTIFY', 'NOTNULL', 'NOWAIT', 'NULL', 'NULLIF', 'NULLS', 'NUMERIC', 'OBJECT', 'OF', 'OFF', 'OFFSET', 'OIDS', 'OLD', 'ON', 'ONLY', 'OPERATOR', 'OPTION', 'OPTIONS', 'OR', 'ORDER', 'ORDINALITY', 'OTHERS', 'OUT', 'OUTER', 'OVER', 'OVERLAPS', 'OVERLAY', 'OVERRIDING', 'OWNED', 'OWNER', 'PARALLEL', 'PARSER', 'PARTIAL', 'PARTITION', 'PASSING', 'PASSWORD', 'PLACING', 'PLANS', 'POLICY', 'POSITION', 'PRECEDING', 'PRECISION', 'PREPARE', 'PREPARED', 'PRESERVE', 'PRIMARY', 'PRIOR', 'PRIVILEGES', 'PROCEDURAL', 'PROCEDURE', 'PROCEDURES', 'PROGRAM', 'PUBLICATION', 'QUOTE', 'RANGE', 'READ', 'REAL', 'REASSIGN', 'RECHECK', 'RECURSIVE', 'REF', 'REFERENCES', 'REFERENCING', 'REFRESH', 'REINDEX', 'RELATIVE', 'RELEASE', 'RENAME', 'REPEATABLE', 'REPLACE', 'REPLICA', 'RESET', 'RESTART', 'RESTRICT', 'RETURNING', 'RETURNS', 'REVOKE', 'RIGHT', 'ROLE', 'ROLLBACK', 'ROLLUP', 'ROUTINE', 'ROUTINES', 'ROW', 'ROWS', 'RULE', 'SAVEPOINT', 'SCHEMA', 'SCHEMAS', 'SCROLL', 'SEARCH', 'SECOND', 'SECURITY', 'SELECT', 'SEQUENCE', 'SEQUENCES', 'SERIALIZABLE', 'SERVER', 'SESSION', 'SESSION_USER', 'SET', 'SETOF', 'SETS', 'SHARE', 'SHOW', 'SIMILAR', 'SIMPLE', 'SKIP', 'SMALLINT', 'SNAPSHOT', 'SOME', 'SQL', 'STABLE', 'STANDALONE', 'START', 'STATEMENT', 'STATISTICS', 'STDIN', 'STDOUT', 'STORAGE', 'STORED', 'STRICT', 'STRIP', 'SUBSCRIPTION', 'SUBSTRING', 'SUPPORT', 'SYMMETRIC', 'SYSID', 'SYSTEM', 'TABLE', 'TABLES', 'TABLESAMPLE', 'TABLESPACE', 'TEMP', 'TEMPLATE', 'TEMPORARY', 'TEXT', 'THEN', 'TIES', 'TIME', 'TIMESTAMP', 'TO', 'TRAILING', 'TRANSACTION', 'TRANSFORM', 'TREAT', 'TRIGGER', 'TRIM', 'TRUE', 'TRUNCATE', 'TRUSTED', 'TYPE', 'TYPES', 'UESCAPE', 'UNBOUNDED', 'UNCOMMITTED', 'UNENCRYPTED', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNLISTEN', 'UNLOGGED', 'UNTIL', 'UPDATE', 'USER', 'USING', 'VACUUM', 'VALID', 'VALIDATE', 'VALIDATOR', 'VALUE', 'VALUES', 'VARCHAR', 'VARIADIC', 'VARYING', 'VERBOSE', 'VERSION', 'VIEW', 'VIEWS', 'VOLATILE', 'WHEN', 'WHERE', 'WHITESPACE', 'WINDOW', 'WITH', 'WITHIN', 'WITHOUT', 'WORK', 'WRAPPER', 'WRITE', 'XML', 'XMLATTRIBUTES', 'XMLCONCAT', 'XMLELEMENT', 'XMLEXISTS', 'XMLFOREST', 'XMLNAMESPACES', 'XMLPARSE', 'XMLPI', 'XMLROOT', 'XMLSERIALIZE', 'XMLTABLE', 'YEAR', 'YES', 'ZONE'];
var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER TABLE', 'CASE', 'DELETE FROM', 'END', 'EXCEPT', 'FETCH FIRST', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'WHEN', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN'];

var PostgreSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(PostgreSqlFormatter, _Formatter);

  var _super = _createSuper(PostgreSqlFormatter);

  function PostgreSqlFormatter() {
    _classCallCheck(this, PostgreSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(PostgreSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "''", "U&''", 'U&""', '$$'],
        openParens: ['(', 'CASE'],
        closeParens: [')', 'END'],
        indexedPlaceholderTypes: ['$'],
        namedPlaceholderTypes: [':'],
        lineCommentTypes: ['--'],
        operators: ['!=', '<<', '>>', '||/', '|/', '::', '->>', '->', '~~*', '~~', '!~~*', '!~~', '~*', '!~*', '!~', '!!']
      });
    }
  }]);

  return PostgreSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/RedshiftFormatter.js":
/*!********************************************!*\
  !*** ./src/languages/RedshiftFormatter.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RedshiftFormatter)
/* harmony export */ });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var reservedWords = ['AES128', 'AES256', 'ALLOWOVERWRITE', 'ANALYSE', 'ARRAY', 'AS', 'ASC', 'AUTHORIZATION', 'BACKUP', 'BINARY', 'BLANKSASNULL', 'BOTH', 'BYTEDICT', 'BZIP2', 'CAST', 'CHECK', 'COLLATE', 'COLUMN', 'CONSTRAINT', 'CREATE', 'CREDENTIALS', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURRENT_USER_ID', 'DEFAULT', 'DEFERRABLE', 'DEFLATE', 'DEFRAG', 'DELTA', 'DELTA32K', 'DESC', 'DISABLE', 'DISTINCT', 'DO', 'ELSE', 'EMPTYASNULL', 'ENABLE', 'ENCODE', 'ENCRYPT', 'ENCRYPTION', 'END', 'EXPLICIT', 'FALSE', 'FOR', 'FOREIGN', 'FREEZE', 'FULL', 'GLOBALDICT256', 'GLOBALDICT64K', 'GRANT', 'GZIP', 'IDENTITY', 'IGNORE', 'ILIKE', 'INITIALLY', 'INTO', 'LEADING', 'LOCALTIME', 'LOCALTIMESTAMP', 'LUN', 'LUNS', 'LZO', 'LZOP', 'MINUS', 'MOSTLY13', 'MOSTLY32', 'MOSTLY8', 'NATURAL', 'NEW', 'NULLS', 'OFF', 'OFFLINE', 'OFFSET', 'OLD', 'ON', 'ONLY', 'OPEN', 'ORDER', 'OVERLAPS', 'PARALLEL', 'PARTITION', 'PERCENT', 'PERMISSIONS', 'PLACING', 'PRIMARY', 'RAW', 'READRATIO', 'RECOVER', 'REFERENCES', 'REJECTLOG', 'RESORT', 'RESTORE', 'SESSION_USER', 'SIMILAR', 'SYSDATE', 'SYSTEM', 'TABLE', 'TAG', 'TDES', 'TEXT255', 'TEXT32K', 'THEN', 'TIMESTAMP', 'TO', 'TOP', 'TRAILING', 'TRUE', 'TRUNCATECOLUMNS', 'UNIQUE', 'USER', 'USING', 'VERBOSE', 'WALLET', 'WHEN', 'WITH', 'WITHOUT', 'PREDICATE', 'COLUMNS', 'COMPROWS', 'COMPRESSION', 'COPY', 'FORMAT', 'DELIMITER', 'FIXEDWIDTH', 'AVRO', 'JSON', 'ENCRYPTED', 'BZIP2', 'GZIP', 'LZOP', 'PARQUET', 'ORC', 'ACCEPTANYDATE', 'ACCEPTINVCHARS', 'BLANKSASNULL', 'DATEFORMAT', 'EMPTYASNULL', 'ENCODING', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'NULL AS', 'REMOVEQUOTES', 'ROUNDEC', 'TIMEFORMAT', 'TRIMBLANKS', 'TRUNCATECOLUMNS', 'COMPROWS', 'COMPUPDATE', 'MAXERROR', 'NOLOAD', 'STATUPDATE', 'MANIFEST', 'REGION', 'IAM_ROLE', 'MASTER_SYMMETRIC_KEY', 'SSH', 'ACCEPTANYDATE', 'ACCEPTINVCHARS', 'ACCESS_KEY_ID', 'SECRET_ACCESS_KEY', 'AVRO', 'BLANKSASNULL', 'BZIP2', 'COMPROWS', 'COMPUPDATE', 'CREDENTIALS', 'DATEFORMAT', 'DELIMITER', 'EMPTYASNULL', 'ENCODING', 'ENCRYPTED', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'FIXEDWIDTH', 'FORMAT', 'IAM_ROLE', 'GZIP', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'JSON', 'LZOP', 'MANIFEST', 'MASTER_SYMMETRIC_KEY', 'MAXERROR', 'NOLOAD', 'NULL AS', 'READRATIO', 'REGION', 'REMOVEQUOTES', 'ROUNDEC', 'SSH', 'STATUPDATE', 'TIMEFORMAT', 'SESSION_TOKEN', 'TRIMBLANKS', 'TRUNCATECOLUMNS', 'EXTERNAL', 'DATA CATALOG', 'HIVE METASTORE', 'CATALOG_ROLE', 'VACUUM', 'COPY', 'UNLOAD', 'EVEN', 'ALL'];
var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER TABLE', 'DELETE FROM', 'EXCEPT', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'INTERSECT', 'TOP', 'LIMIT', 'MODIFY', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UNION ALL', 'UNION', 'UPDATE', 'VALUES', 'WHERE', 'VACUUM', 'COPY', 'UNLOAD', 'ANALYZE', 'ANALYSE', 'DISTKEY', 'SORTKEY', 'COMPOUND', 'INTERLEAVED', 'FORMAT', 'DELIMITER', 'FIXEDWIDTH', 'AVRO', 'JSON', 'ENCRYPTED', 'BZIP2', 'GZIP', 'LZOP', 'PARQUET', 'ORC', 'ACCEPTANYDATE', 'ACCEPTINVCHARS', 'BLANKSASNULL', 'DATEFORMAT', 'EMPTYASNULL', 'ENCODING', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'NULL AS', 'REMOVEQUOTES', 'ROUNDEC', 'TIMEFORMAT', 'TRIMBLANKS', 'TRUNCATECOLUMNS', 'COMPROWS', 'COMPUPDATE', 'MAXERROR', 'NOLOAD', 'STATUPDATE', 'MANIFEST', 'REGION', 'IAM_ROLE', 'MASTER_SYMMETRIC_KEY', 'SSH', 'ACCEPTANYDATE', 'ACCEPTINVCHARS', 'ACCESS_KEY_ID', 'SECRET_ACCESS_KEY', 'AVRO', 'BLANKSASNULL', 'BZIP2', 'COMPROWS', 'COMPUPDATE', 'CREDENTIALS', 'DATEFORMAT', 'DELIMITER', 'EMPTYASNULL', 'ENCODING', 'ENCRYPTED', 'ESCAPE', 'EXPLICIT_IDS', 'FILLRECORD', 'FIXEDWIDTH', 'FORMAT', 'IAM_ROLE', 'GZIP', 'IGNOREBLANKLINES', 'IGNOREHEADER', 'JSON', 'LZOP', 'MANIFEST', 'MASTER_SYMMETRIC_KEY', 'MAXERROR', 'NOLOAD', 'NULL AS', 'READRATIO', 'REGION', 'REMOVEQUOTES', 'ROUNDEC', 'SSH', 'STATUPDATE', 'TIMEFORMAT', 'SESSION_TOKEN', 'TRIMBLANKS', 'TRUNCATECOLUMNS', 'EXTERNAL', 'DATA CATALOG', 'HIVE METASTORE', 'CATALOG_ROLE'];
var reservedTopLevelWordsNoIndent = [];
var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'OUTER APPLY', 'WHEN', 'VACUUM', 'COPY', 'UNLOAD', 'ANALYZE', 'ANALYSE', 'DISTKEY', 'SORTKEY', 'COMPOUND', 'INTERLEAVED', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN'];

var RedshiftFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(RedshiftFormatter, _Formatter);

  var _super = _createSuper(RedshiftFormatter);

  function RedshiftFormatter() {
    _classCallCheck(this, RedshiftFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(RedshiftFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "''", '``'],
        openParens: ['('],
        closeParens: [')'],
        indexedPlaceholderTypes: ['?'],
        namedPlaceholderTypes: ['@', '#', '$'],
        lineCommentTypes: ['--'],
        operators: ['|/', '||/', '<<', '>>', '!=', '||']
      });
    }
  }]);

  return RedshiftFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/SQLiteFormatter.js":
/*!******************************************!*\
  !*** ./src/languages/SQLiteFormatter.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StandardSqlFormatter)
/* harmony export */ });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


 // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#reserved-word

var standardReservedWords = ['ABS', 'ALL', 'ALLOCATE', 'ALTER', 'AND', 'ANY', 'ARE', 'ARRAY', 'AS', 'ASENSITIVE', 'ASYMMETRIC', 'AT', 'ATOMIC', 'AUTHORIZATION', 'AVG', 'BEGIN', 'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOOLEAN', 'BOTH', 'BY', 'CALL', 'CALLED', 'CARDINALITY', 'CASCADED', 'CASE', 'CAST', 'CEIL', 'CEILING', 'CHAR', 'CHAR_LENGTH', 'CHARACTER', 'CHARACTER_LENGTH', 'CHECK', 'CLOB', 'CLOSE', 'COALESCE', 'COLLATE', 'COLLECT', 'COLUMN', 'COMMIT', 'CONDITION', 'CONNECT', 'CONSTRAINT', 'CONVERT', 'CORR', 'CORRESPONDING', 'COUNT', 'COVAR_POP', 'COVAR_SAMP', 'CREATE', 'CROSS', 'CUBE', 'CUME_DIST', 'CURRENT', 'CURRENT_CATALOG', 'CURRENT_DATE', 'CURRENT_DEFAULT_TRANSFORM_GROUP', 'CURRENT_PATH', 'CURRENT_ROLE', 'CURRENT_SCHEMA', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_TRANSFORM_GROUP_FOR_TYPE', 'CURRENT_USER', 'CURSOR', 'CYCLE', 'DATE', 'DAY', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DELETE', 'DENSE_RANK', 'DEREF', 'DESCRIBE', 'DETERMINISTIC', 'DISCONNECT', 'DISTINCT', 'DOUBLE', 'DROP', 'DYNAMIC', 'EACH', 'ELEMENT', 'ELSE', 'END', 'END-EXEC', 'ESCAPE', 'EVERY', 'EXCEPT', 'EXEC', 'EXECUTE', 'EXISTS', 'EXP', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FETCH', 'FILTER', 'FLOAT', 'FLOOR', 'FOR', 'FOREIGN', 'FREE', 'FROM', 'FULL', 'FUNCTION', 'FUSION', 'GET', 'GLOBAL', 'GRANT', 'GROUP', 'GROUPING', 'HAVING', 'HOLD', 'HOUR', 'IDENTITY', 'IN', 'INDICATOR', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INT', 'INTEGER', 'INTERSECT', 'INTERSECTION', 'INTERVAL', 'INTO', 'IS', 'JOIN', 'LANGUAGE', 'LARGE', 'LATERAL', 'LEADING', 'LEFT', 'LIKE', 'LIKE_REGEX', 'LN', 'LOCAL', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOWER', 'MATCH', 'MAX', 'MEMBER', 'MERGE', 'METHOD', 'MIN', 'MINUTE', 'MOD', 'MODIFIES', 'MODULE', 'MONTH', 'MULTISET', 'NATIONAL', 'NATURAL', 'NCHAR', 'NCLOB', 'NEW', 'NO', 'NONE', 'NORMALIZE', 'NOT', 'NULL', 'NULLIF', 'NUMERIC', 'OCTET_LENGTH', 'OCCURRENCES_REGEX', 'OF', 'OLD', 'ON', 'ONLY', 'OPEN', 'OR', 'ORDER', 'OUT', 'OUTER', 'OVER', 'OVERLAPS', 'OVERLAY', 'PARAMETER', 'PARTITION', 'PERCENT_RANK', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'POSITION', 'POSITION_REGEX', 'POWER', 'PRECISION', 'PREPARE', 'PRIMARY', 'PROCEDURE', 'RANGE', 'RANK', 'READS', 'REAL', 'RECURSIVE', 'REF', 'REFERENCES', 'REFERENCING', 'REGR_AVGX', 'REGR_AVGY', 'REGR_COUNT', 'REGR_INTERCEPT', 'REGR_R2', 'REGR_SLOPE', 'REGR_SXX', 'REGR_SXY', 'REGR_SYY', 'RELEASE', 'RESULT', 'RETURN', 'RETURNS', 'REVOKE', 'RIGHT', 'ROLLBACK', 'ROLLUP', 'ROW', 'ROW_NUMBER', 'ROWS', 'SAVEPOINT', 'SCOPE', 'SCROLL', 'SEARCH', 'SECOND', 'SELECT', 'SENSITIVE', 'SESSION_USER', 'SET', 'SIMILAR', 'SMALLINT', 'SOME', 'SPECIFIC', 'SPECIFICTYPE', 'SQL', 'SQLEXCEPTION', 'SQLSTATE', 'SQLWARNING', 'SQRT', 'START', 'STATIC', 'STDDEV_POP', 'STDDEV_SAMP', 'SUBMULTISET', 'SUBSTRING', 'SUBSTRING_REGEX', 'SUM', 'SYMMETRIC', 'SYSTEM', 'SYSTEM_USER', 'TABLE', 'TABLESAMPLE', 'THEN', 'TIME', 'TIMESTAMP', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TO', 'TRAILING', 'TRANSLATE', 'TRANSLATE_REGEX', 'TRANSLATION', 'TREAT', 'TRIGGER', 'TRIM', 'TRUE', 'UESCAPE', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNNEST', 'UPDATE', 'UPPER', 'USER', 'USING', 'VALUE', 'VALUES', 'VAR_POP', 'VAR_SAMP', 'VARBINARY', 'VARCHAR', 'VARYING', 'WHEN', 'WHENEVER', 'WHERE', 'WIDTH_BUCKET', 'WINDOW', 'WITH', 'WITHIN', 'WITHOUT', 'YEAR']; // https://www.sqlite.org/lang_keywords.html <- minus those keywords already defined somewhere else in the standard

var nonStandardSqliteReservedWords = ['ABORT', 'ACTION', 'AFTER', 'ALWAYS', 'ANALYZE', 'ASC', 'ATTACH', 'AUTOINCREMENT', 'BEFORE', 'CASCADE', 'CONFLICT', 'DATABASE', 'DEFERRABLE', 'DEFERRED', 'DESC', 'DETACH', 'DO', 'EXCLUDE', 'EXCLUSIVE', 'EXPLAIN', 'FAIL', 'FIRST', 'FOLLOWING', 'GENERATED', 'GLOB', 'GROUPS', 'IF', 'IGNORE', 'IMMEDIATE', 'INDEX', 'INDEXED', 'INITIALLY', 'INSTEAD', 'ISNULL', 'KEY', 'LAST', 'MATERIALIZED', 'NOTHING', 'NOTNULL', 'NULLS', 'OFFSET', 'OTHERS', 'PLAN', 'PRAGMA', 'PRECEDING', 'QUERY', 'RAISE', 'REGEXP', 'REINDEX', 'RENAME', 'REPLACE', 'RESTRICT', 'RETURNING', 'TEMP', 'TEMPORARY', 'TIES', 'TRANSACTION', 'UNBOUNDED', 'VACUUM', 'VIEW', 'VIRTUAL'];
var reservedWords = [].concat(standardReservedWords, nonStandardSqliteReservedWords);
var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'CASE', 'DELETE FROM', 'END', 'FETCH FIRST', 'FETCH NEXT', 'FETCH PRIOR', 'FETCH LAST', 'FETCH ABSOLUTE', 'FETCH RELATIVE', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'LIMIT', 'ORDER BY', 'SELECT', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'INTERSECT DISTINCT', 'UNION', 'UNION ALL', 'UNION DISTINCT', 'EXCEPT', 'EXCEPT ALL', 'EXCEPT DISTINCT'];
var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'WHEN', // joins - https://www.sqlite.org/syntax/join-operator.html
'JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'INNER JOIN', 'CROSS JOIN', 'NATURAL JOIN', 'NATURAL LEFT JOIN', 'NATURAL LEFT OUTER JOIN', 'NATURAL INNER JOIN', 'NATURAL CROSS JOIN']; // https://www.sqlite.org/lang_expr.html

var operators = [// non-binary
'~', '+', '-', // concat
'||', // arithmetic
'+', '-', '*', '/', '%', // bitwise
'&', '|', '<<', '>>', // comparison
'<', '>', '=', '==', '!='];

var StandardSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(StandardSqlFormatter, _Formatter);

  var _super = _createSuper(StandardSqlFormatter);

  function StandardSqlFormatter() {
    _classCallCheck(this, StandardSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(StandardSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "''"],
        openParens: ['(', 'CASE'],
        closeParens: [')', 'END'],
        indexedPlaceholderTypes: ['?'],
        namedPlaceholderTypes: [],
        lineCommentTypes: ['--'],
        operators: operators
      });
    }
  }]);

  return StandardSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/SparkSqlFormatter.js":
/*!********************************************!*\
  !*** ./src/languages/SparkSqlFormatter.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SparkSqlFormatter)
/* harmony export */ });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/token */ "./src/core/token.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
/* harmony import */ var _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/tokenTypes */ "./src/core/tokenTypes.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }





var reservedWords = ['ALL', 'ALTER', 'ANALYSE', 'ANALYZE', 'ARRAY_ZIP', 'ARRAY', 'AS', 'ASC', 'AVG', 'BETWEEN', 'CASCADE', 'CASE', 'CAST', 'COALESCE', 'COLLECT_LIST', 'COLLECT_SET', 'COLUMN', 'COLUMNS', 'COMMENT', 'CONSTRAINT', 'CONTAINS', 'CONVERT', 'COUNT', 'CUME_DIST', 'CURRENT ROW', 'CURRENT_DATE', 'CURRENT_TIMESTAMP', 'DATABASE', 'DATABASES', 'DATE_ADD', 'DATE_SUB', 'DATE_TRUNC', 'DAY_HOUR', 'DAY_MINUTE', 'DAY_SECOND', 'DAY', 'DAYS', 'DECODE', 'DEFAULT', 'DELETE', 'DENSE_RANK', 'DESC', 'DESCRIBE', 'DISTINCT', 'DISTINCTROW', 'DIV', 'DROP', 'ELSE', 'ENCODE', 'END', 'EXISTS', 'EXPLAIN', 'EXPLODE_OUTER', 'EXPLODE', 'FILTER', 'FIRST_VALUE', 'FIRST', 'FIXED', 'FLATTEN', 'FOLLOWING', 'FROM_UNIXTIME', 'FULL', 'GREATEST', 'GROUP_CONCAT', 'HOUR_MINUTE', 'HOUR_SECOND', 'HOUR', 'HOURS', 'IF', 'IFNULL', 'IN', 'INSERT', 'INTERVAL', 'INTO', 'IS', 'LAG', 'LAST_VALUE', 'LAST', 'LEAD', 'LEADING', 'LEAST', 'LEVEL', 'LIKE', 'MAX', 'MERGE', 'MIN', 'MINUTE_SECOND', 'MINUTE', 'MONTH', 'NATURAL', 'NOT', 'NOW()', 'NTILE', 'NULL', 'NULLIF', 'OFFSET', 'ON DELETE', 'ON UPDATE', 'ON', 'ONLY', 'OPTIMIZE', 'OVER', 'PERCENT_RANK', 'PRECEDING', 'RANGE', 'RANK', 'REGEXP', 'RENAME', 'RLIKE', 'ROW', 'ROWS', 'SECOND', 'SEPARATOR', 'SEQUENCE', 'SIZE', 'STRING', 'STRUCT', 'SUM', 'TABLE', 'TABLES', 'TEMPORARY', 'THEN', 'TO_DATE', 'TO_JSON', 'TO', 'TRAILING', 'TRANSFORM', 'TRUE', 'TRUNCATE', 'TYPE', 'TYPES', 'UNBOUNDED', 'UNIQUE', 'UNIX_TIMESTAMP', 'UNLOCK', 'UNSIGNED', 'USING', 'VARIABLES', 'VIEW', 'WHEN', 'WITH', 'YEAR_MONTH'];
var reservedTopLevelWords = ['ADD', 'AFTER', 'ALTER COLUMN', 'ALTER DATABASE', 'ALTER SCHEMA', 'ALTER TABLE', 'CLUSTER BY', 'CLUSTERED BY', 'DELETE FROM', 'DISTRIBUTE BY', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'OPTIONS', 'ORDER BY', 'PARTITION BY', 'PARTITIONED BY', 'RANGE', 'ROWS', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'TBLPROPERTIES', 'UPDATE', 'USING', 'VALUES', 'WHERE', 'WINDOW'];
var reservedTopLevelWordsNoIndent = ['EXCEPT ALL', 'EXCEPT', 'INTERSECT ALL', 'INTERSECT', 'UNION ALL', 'UNION'];
var reservedNewlineWords = ['AND', 'CREATE OR', 'CREATE', 'ELSE', 'LATERAL VIEW', 'OR', 'OUTER APPLY', 'WHEN', 'XOR', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN', // non-standard-joins
'ANTI JOIN', 'SEMI JOIN', 'LEFT ANTI JOIN', 'LEFT SEMI JOIN', 'RIGHT OUTER JOIN', 'RIGHT SEMI JOIN', 'NATURAL ANTI JOIN', 'NATURAL FULL OUTER JOIN', 'NATURAL INNER JOIN', 'NATURAL LEFT ANTI JOIN', 'NATURAL LEFT OUTER JOIN', 'NATURAL LEFT SEMI JOIN', 'NATURAL OUTER JOIN', 'NATURAL RIGHT OUTER JOIN', 'NATURAL RIGHT SEMI JOIN', 'NATURAL SEMI JOIN'];

var SparkSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(SparkSqlFormatter, _Formatter);

  var _super = _createSuper(SparkSqlFormatter);

  function SparkSqlFormatter() {
    _classCallCheck(this, SparkSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(SparkSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_2__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "''", '``', '{}'],
        openParens: ['(', 'CASE'],
        closeParens: [')', 'END'],
        indexedPlaceholderTypes: ['?'],
        namedPlaceholderTypes: ['$'],
        lineCommentTypes: ['--'],
        operators: ['!=', '<=>', '&&', '||', '==']
      });
    }
  }, {
    key: "tokenOverride",
    value: function tokenOverride(token) {
      // Fix cases where names are ambiguously keywords or functions
      if ((0,_core_token__WEBPACK_IMPORTED_MODULE_1__.isWindow)(token)) {
        var aheadToken = this.tokenLookAhead();

        if (aheadToken && aheadToken.type === _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__["default"].OPEN_PAREN) {
          // This is a function call, treat it as a reserved word
          return {
            type: _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__["default"].RESERVED,
            value: token.value
          };
        }
      } // Fix cases where names are ambiguously keywords or properties


      if ((0,_core_token__WEBPACK_IMPORTED_MODULE_1__.isEnd)(token)) {
        var backToken = this.tokenLookBehind();

        if (backToken && backToken.type === _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__["default"].OPERATOR && backToken.value === '.') {
          // This is window().end (or similar) not CASE ... END
          return {
            type: _core_tokenTypes__WEBPACK_IMPORTED_MODULE_3__["default"].WORD,
            value: token.value
          };
        }
      }

      return token;
    }
  }]);

  return SparkSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/StandardSqlFormatter.js":
/*!***********************************************!*\
  !*** ./src/languages/StandardSqlFormatter.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StandardSqlFormatter)
/* harmony export */ });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }


 // https://jakewheat.github.io/sql-overview/sql-2008-foundation-grammar.html#reserved-word

var reservedWords = ['ABS', 'ALL', 'ALLOCATE', 'ALTER', 'AND', 'ANY', 'ARE', 'ARRAY', 'AS', 'ASENSITIVE', 'ASYMMETRIC', 'AT', 'ATOMIC', 'AUTHORIZATION', 'AVG', 'BEGIN', 'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOOLEAN', 'BOTH', 'BY', 'CALL', 'CALLED', 'CARDINALITY', 'CASCADED', 'CASE', 'CAST', 'CEIL', 'CEILING', 'CHAR', 'CHAR_LENGTH', 'CHARACTER', 'CHARACTER_LENGTH', 'CHECK', 'CLOB', 'CLOSE', 'COALESCE', 'COLLATE', 'COLLECT', 'COLUMN', 'COMMIT', 'CONDITION', 'CONNECT', 'CONSTRAINT', 'CONVERT', 'CORR', 'CORRESPONDING', 'COUNT', 'COVAR_POP', 'COVAR_SAMP', 'CREATE', 'CROSS', 'CUBE', 'CUME_DIST', 'CURRENT', 'CURRENT_CATALOG', 'CURRENT_DATE', 'CURRENT_DEFAULT_TRANSFORM_GROUP', 'CURRENT_PATH', 'CURRENT_ROLE', 'CURRENT_SCHEMA', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_TRANSFORM_GROUP_FOR_TYPE', 'CURRENT_USER', 'CURSOR', 'CYCLE', 'DATE', 'DAY', 'DEALLOCATE', 'DEC', 'DECIMAL', 'DECLARE', 'DEFAULT', 'DELETE', 'DENSE_RANK', 'DEREF', 'DESCRIBE', 'DETERMINISTIC', 'DISCONNECT', 'DISTINCT', 'DOUBLE', 'DROP', 'DYNAMIC', 'EACH', 'ELEMENT', 'ELSE', 'END', 'END-EXEC', 'ESCAPE', 'EVERY', 'EXCEPT', 'EXEC', 'EXECUTE', 'EXISTS', 'EXP', 'EXTERNAL', 'EXTRACT', 'FALSE', 'FETCH', 'FILTER', 'FLOAT', 'FLOOR', 'FOR', 'FOREIGN', 'FREE', 'FROM', 'FULL', 'FUNCTION', 'FUSION', 'GET', 'GLOBAL', 'GRANT', 'GROUP', 'GROUPING', 'HAVING', 'HOLD', 'HOUR', 'IDENTITY', 'IN', 'INDICATOR', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INT', 'INTEGER', 'INTERSECT', 'INTERSECTION', 'INTERVAL', 'INTO', 'IS', 'JOIN', 'LANGUAGE', 'LARGE', 'LATERAL', 'LEADING', 'LEFT', 'LIKE', 'LIKE_REGEX', 'LN', 'LOCAL', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOWER', 'MATCH', 'MAX', 'MEMBER', 'MERGE', 'METHOD', 'MIN', 'MINUTE', 'MOD', 'MODIFIES', 'MODULE', 'MONTH', 'MULTISET', 'NATIONAL', 'NATURAL', 'NCHAR', 'NCLOB', 'NEW', 'NO', 'NONE', 'NORMALIZE', 'NOT', 'NULL', 'NULLIF', 'NUMERIC', 'OCTET_LENGTH', 'OCCURRENCES_REGEX', 'OF', 'OLD', 'ON', 'ONLY', 'OPEN', 'OR', 'ORDER', 'OUT', 'OUTER', 'OVER', 'OVERLAPS', 'OVERLAY', 'PARAMETER', 'PARTITION', 'PERCENT_RANK', 'PERCENTILE_CONT', 'PERCENTILE_DISC', 'POSITION', 'POSITION_REGEX', 'POWER', 'PRECISION', 'PREPARE', 'PRIMARY', 'PROCEDURE', 'RANGE', 'RANK', 'READS', 'REAL', 'RECURSIVE', 'REF', 'REFERENCES', 'REFERENCING', 'REGR_AVGX', 'REGR_AVGY', 'REGR_COUNT', 'REGR_INTERCEPT', 'REGR_R2', 'REGR_SLOPE', 'REGR_SXX', 'REGR_SXY', 'REGR_SYY', 'RELEASE', 'RESULT', 'RETURN', 'RETURNS', 'REVOKE', 'RIGHT', 'ROLLBACK', 'ROLLUP', 'ROW', 'ROW_NUMBER', 'ROWS', 'SAVEPOINT', 'SCOPE', 'SCROLL', 'SEARCH', 'SECOND', 'SELECT', 'SENSITIVE', 'SESSION_USER', 'SET', 'SIMILAR', 'SMALLINT', 'SOME', 'SPECIFIC', 'SPECIFICTYPE', 'SQL', 'SQLEXCEPTION', 'SQLSTATE', 'SQLWARNING', 'SQRT', 'START', 'STATIC', 'STDDEV_POP', 'STDDEV_SAMP', 'SUBMULTISET', 'SUBSTRING', 'SUBSTRING_REGEX', 'SUM', 'SYMMETRIC', 'SYSTEM', 'SYSTEM_USER', 'TABLE', 'TABLESAMPLE', 'THEN', 'TIME', 'TIMESTAMP', 'TIMEZONE_HOUR', 'TIMEZONE_MINUTE', 'TO', 'TRAILING', 'TRANSLATE', 'TRANSLATE_REGEX', 'TRANSLATION', 'TREAT', 'TRIGGER', 'TRIM', 'TRUE', 'UESCAPE', 'UNION', 'UNIQUE', 'UNKNOWN', 'UNNEST', 'UPDATE', 'UPPER', 'USER', 'USING', 'VALUE', 'VALUES', 'VAR_POP', 'VAR_SAMP', 'VARBINARY', 'VARCHAR', 'VARYING', 'WHEN', 'WHENEVER', 'WHERE', 'WIDTH_BUCKET', 'WINDOW', 'WITH', 'WITHIN', 'WITHOUT', 'YEAR'];
var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'CASE', 'DELETE FROM', 'END', 'FETCH FIRST', 'FETCH NEXT', 'FETCH PRIOR', 'FETCH LAST', 'FETCH ABSOLUTE', 'FETCH RELATIVE', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'LIMIT', 'ORDER BY', 'SELECT', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'INTERSECT DISTINCT', 'UNION', 'UNION ALL', 'UNION DISTINCT', 'EXCEPT', 'EXCEPT ALL', 'EXCEPT DISTINCT'];
var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'WHEN', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN', 'NATURAL JOIN'];

var StandardSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(StandardSqlFormatter, _Formatter);

  var _super = _createSuper(StandardSqlFormatter);

  function StandardSqlFormatter() {
    _classCallCheck(this, StandardSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(StandardSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "''"],
        openParens: ['(', 'CASE'],
        closeParens: [')', 'END'],
        indexedPlaceholderTypes: ['?'],
        namedPlaceholderTypes: [],
        lineCommentTypes: ['--']
      });
    }
  }]);

  return StandardSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/languages/TSqlFormatter.js":
/*!****************************************!*\
  !*** ./src/languages/TSqlFormatter.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TSqlFormatter)
/* harmony export */ });
/* harmony import */ var _core_Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/Formatter */ "./src/core/Formatter.js");
/* harmony import */ var _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/Tokenizer */ "./src/core/Tokenizer.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }



var reservedWords = ['ADD', 'EXTERNAL', 'PROCEDURE', 'ALL', 'FETCH', 'PUBLIC', 'ALTER', 'FILE', 'RAISERROR', 'AND', 'FILLFACTOR', 'READ', 'ANY', 'FOR', 'READTEXT', 'AS', 'FOREIGN', 'RECONFIGURE', 'ASC', 'FREETEXT', 'REFERENCES', 'AUTHORIZATION', 'FREETEXTTABLE', 'REPLICATION', 'BACKUP', 'FROM', 'RESTORE', 'BEGIN', 'FULL', 'RESTRICT', 'BETWEEN', 'FUNCTION', 'RETURN', 'BREAK', 'GOTO', 'REVERT', 'BROWSE', 'GRANT', 'REVOKE', 'BULK', 'GROUP', 'RIGHT', 'BY', 'HAVING', 'ROLLBACK', 'CASCADE', 'HOLDLOCK', 'ROWCOUNT', 'CASE', 'IDENTITY', 'ROWGUIDCOL', 'CHECK', 'IDENTITY_INSERT', 'RULE', 'CHECKPOINT', 'IDENTITYCOL', 'SAVE', 'CLOSE', 'IF', 'SCHEMA', 'CLUSTERED', 'IN', 'SECURITYAUDIT', 'COALESCE', 'INDEX', 'SELECT', 'COLLATE', 'INNER', 'SEMANTICKEYPHRASETABLE', 'COLUMN', 'INSERT', 'SEMANTICSIMILARITYDETAILSTABLE', 'COMMIT', 'INTERSECT', 'SEMANTICSIMILARITYTABLE', 'COMPUTE', 'INTO', 'SESSION_USER', 'CONSTRAINT', 'IS', 'SET', 'CONTAINS', 'JOIN', 'SETUSER', 'CONTAINSTABLE', 'KEY', 'SHUTDOWN', 'CONTINUE', 'KILL', 'SOME', 'CONVERT', 'LEFT', 'STATISTICS', 'CREATE', 'LIKE', 'SYSTEM_USER', 'CROSS', 'LINENO', 'TABLE', 'CURRENT', 'LOAD', 'TABLESAMPLE', 'CURRENT_DATE', 'MERGE', 'TEXTSIZE', 'CURRENT_TIME', 'NATIONAL', 'THEN', 'CURRENT_TIMESTAMP', 'NOCHECK', 'TO', 'CURRENT_USER', 'NONCLUSTERED', 'TOP', 'CURSOR', 'NOT', 'TRAN', 'DATABASE', 'NULL', 'TRANSACTION', 'DBCC', 'NULLIF', 'TRIGGER', 'DEALLOCATE', 'OF', 'TRUNCATE', 'DECLARE', 'OFF', 'TRY_CONVERT', 'DEFAULT', 'OFFSETS', 'TSEQUAL', 'DELETE', 'ON', 'UNION', 'DENY', 'OPEN', 'UNIQUE', 'DESC', 'OPENDATASOURCE', 'UNPIVOT', 'DISK', 'OPENQUERY', 'UPDATE', 'DISTINCT', 'OPENROWSET', 'UPDATETEXT', 'DISTRIBUTED', 'OPENXML', 'USE', 'DOUBLE', 'OPTION', 'USER', 'DROP', 'OR', 'VALUES', 'DUMP', 'ORDER', 'VARYING', 'ELSE', 'OUTER', 'VIEW', 'END', 'OVER', 'WAITFOR', 'ERRLVL', 'PERCENT', 'WHEN', 'ESCAPE', 'PIVOT', 'WHERE', 'EXCEPT', 'PLAN', 'WHILE', 'EXEC', 'PRECISION', 'WITH', 'EXECUTE', 'PRIMARY', 'WITHIN GROUP', 'EXISTS', 'PRINT', 'WRITETEXT', 'EXIT', 'PROC'];
var reservedTopLevelWords = ['ADD', 'ALTER COLUMN', 'ALTER TABLE', 'CASE', 'DELETE FROM', 'END', 'EXCEPT', 'FROM', 'GROUP BY', 'HAVING', 'INSERT INTO', 'INSERT', 'LIMIT', 'ORDER BY', 'SELECT', 'SET CURRENT SCHEMA', 'SET SCHEMA', 'SET', 'UPDATE', 'VALUES', 'WHERE'];
var reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];
var reservedNewlineWords = ['AND', 'ELSE', 'OR', 'WHEN', // joins
'JOIN', 'INNER JOIN', 'LEFT JOIN', 'LEFT OUTER JOIN', 'RIGHT JOIN', 'RIGHT OUTER JOIN', 'FULL JOIN', 'FULL OUTER JOIN', 'CROSS JOIN'];

var TSqlFormatter = /*#__PURE__*/function (_Formatter) {
  _inherits(TSqlFormatter, _Formatter);

  var _super = _createSuper(TSqlFormatter);

  function TSqlFormatter() {
    _classCallCheck(this, TSqlFormatter);

    return _super.apply(this, arguments);
  }

  _createClass(TSqlFormatter, [{
    key: "tokenizer",
    value: function tokenizer() {
      return new _core_Tokenizer__WEBPACK_IMPORTED_MODULE_1__["default"]({
        reservedWords: reservedWords,
        reservedTopLevelWords: reservedTopLevelWords,
        reservedNewlineWords: reservedNewlineWords,
        reservedTopLevelWordsNoIndent: reservedTopLevelWordsNoIndent,
        stringTypes: ["\"\"", "N''", "''", '[]'],
        openParens: ['(', 'CASE'],
        closeParens: [')', 'END'],
        indexedPlaceholderTypes: [],
        namedPlaceholderTypes: ['@'],
        lineCommentTypes: ['--'],
        specialWordChars: ['#', '@'],
        operators: ['>=', '<=', '<>', '!=', '!<', '!>', '+=', '-=', '*=', '/=', '%=', '|=', '&=', '^=', '::'] // TODO: Support for money constants

      });
    }
  }]);

  return TSqlFormatter;
}(_core_Formatter__WEBPACK_IMPORTED_MODULE_0__["default"]);



/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "trimSpacesEnd": () => (/* binding */ trimSpacesEnd),
/* harmony export */   "last": () => (/* binding */ last),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "escapeRegExp": () => (/* binding */ escapeRegExp),
/* harmony export */   "sortByLengthDesc": () => (/* binding */ sortByLengthDesc)
/* harmony export */ });
// Only removes spaces, not newlines
var trimSpacesEnd = function trimSpacesEnd(str) {
  return str.replace(/[\t ]+$/, '');
}; // Last element from array

var last = function last(arr) {
  return arr[arr.length - 1];
}; // True array is empty, or it's not an array at all

var isEmpty = function isEmpty(arr) {
  return !Array.isArray(arr) || arr.length === 0;
}; // Escapes regex special chars

var escapeRegExp = function escapeRegExp(string) {
  return string.replace(/[\$\(-\+\.\?\[-\^\{-\}]/g, '\\$&');
}; // Sorts strings by length, so that longer ones are first
// Also sorts alphabetically after sorting by length.

var sortByLengthDesc = function sortByLengthDesc(strings) {
  return strings.sort(function (a, b) {
    return b.length - a.length || a.localeCompare(b);
  });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/sqlFormatter.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "format": () => (/* binding */ format),
/* harmony export */   "supportedDialects": () => (/* binding */ supportedDialects)
/* harmony export */ });
/* harmony import */ var _languages_Db2Formatter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./languages/Db2Formatter */ "./src/languages/Db2Formatter.js");
/* harmony import */ var _languages_MariaDbFormatter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./languages/MariaDbFormatter */ "./src/languages/MariaDbFormatter.js");
/* harmony import */ var _languages_MySqlFormatter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./languages/MySqlFormatter */ "./src/languages/MySqlFormatter.js");
/* harmony import */ var _languages_N1qlFormatter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./languages/N1qlFormatter */ "./src/languages/N1qlFormatter.js");
/* harmony import */ var _languages_PlSqlFormatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./languages/PlSqlFormatter */ "./src/languages/PlSqlFormatter.js");
/* harmony import */ var _languages_PostgreSqlFormatter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./languages/PostgreSqlFormatter */ "./src/languages/PostgreSqlFormatter.js");
/* harmony import */ var _languages_RedshiftFormatter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./languages/RedshiftFormatter */ "./src/languages/RedshiftFormatter.js");
/* harmony import */ var _languages_SparkSqlFormatter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./languages/SparkSqlFormatter */ "./src/languages/SparkSqlFormatter.js");
/* harmony import */ var _languages_StandardSqlFormatter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./languages/StandardSqlFormatter */ "./src/languages/StandardSqlFormatter.js");
/* harmony import */ var _languages_SQLiteFormatter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./languages/SQLiteFormatter */ "./src/languages/SQLiteFormatter.js");
/* harmony import */ var _languages_TSqlFormatter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./languages/TSqlFormatter */ "./src/languages/TSqlFormatter.js");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }












var formatters = {
  db2: _languages_Db2Formatter__WEBPACK_IMPORTED_MODULE_0__["default"],
  mariadb: _languages_MariaDbFormatter__WEBPACK_IMPORTED_MODULE_1__["default"],
  mysql: _languages_MySqlFormatter__WEBPACK_IMPORTED_MODULE_2__["default"],
  n1ql: _languages_N1qlFormatter__WEBPACK_IMPORTED_MODULE_3__["default"],
  plsql: _languages_PlSqlFormatter__WEBPACK_IMPORTED_MODULE_4__["default"],
  postgresql: _languages_PostgreSqlFormatter__WEBPACK_IMPORTED_MODULE_5__["default"],
  redshift: _languages_RedshiftFormatter__WEBPACK_IMPORTED_MODULE_6__["default"],
  spark: _languages_SparkSqlFormatter__WEBPACK_IMPORTED_MODULE_7__["default"],
  sql: _languages_StandardSqlFormatter__WEBPACK_IMPORTED_MODULE_8__["default"],
  sqlite: _languages_SQLiteFormatter__WEBPACK_IMPORTED_MODULE_9__["default"],
  tsql: _languages_TSqlFormatter__WEBPACK_IMPORTED_MODULE_10__["default"]
};
/**
 * Format whitespace in a query to make it easier to read.
 *
 * @param {String} query
 * @param {Object} cfg
 *  @param {String} cfg.language Query language, default is Standard SQL
 *  @param {String} cfg.indent Characters used for indentation, default is "  " (2 spaces)
 *  @param {Boolean} cfg.uppercase Converts keywords to uppercase
 *  @param {Integer} cfg.linesBetweenQueries How many line breaks between queries
 *  @param {Object} cfg.params Collection of params for placeholder replacement
 * @return {String}
 */

var format = function format(query) {
  var cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof query !== 'string') {
    throw new Error('Invalid query argument. Extected string, instead got ' + _typeof(query));
  }

  var Formatter = _languages_StandardSqlFormatter__WEBPACK_IMPORTED_MODULE_8__["default"];

  if (cfg.language !== undefined) {
    Formatter = formatters[cfg.language];
  }

  if (Formatter === undefined) {
    throw Error("Unsupported SQL dialect: ".concat(cfg.language));
  }

  return new Formatter(cfg).format(query);
};
var supportedDialects = Object.keys(formatters);
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUExQixDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9Gb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5kZW50YXRpb24uanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvSW5saW5lQmxvY2suanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvUGFyYW1zLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9jb3JlL1Rva2VuaXplci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvY29yZS9yZWdleEZhY3RvcnkuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvdG9rZW4uanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2NvcmUvdG9rZW5UeXBlcy5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL0RiMkZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL01hcmlhRGJGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9NeVNxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL04xcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9QbFNxbEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1Bvc3RncmVTcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9SZWRzaGlmdEZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1NRTGl0ZUZvcm1hdHRlci5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvbGFuZ3VhZ2VzL1NwYXJrU3FsRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy9sYW5ndWFnZXMvU3RhbmRhcmRTcWxGb3JtYXR0ZXIuanMiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyLy4vc3JjL2xhbmd1YWdlcy9UU3FsRm9ybWF0dGVyLmpzIiwid2VicGFjazovL3NxbEZvcm1hdHRlci8uL3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vc3FsRm9ybWF0dGVyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9zcWxGb3JtYXR0ZXIvLi9zcmMvc3FsRm9ybWF0dGVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcInNxbEZvcm1hdHRlclwiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJzcWxGb3JtYXR0ZXJcIl0gPSBmYWN0b3J5KCk7XG59KShzZWxmLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCJpbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuL3Rva2VuVHlwZXMnO1xuaW1wb3J0IEluZGVudGF0aW9uIGZyb20gJy4vSW5kZW50YXRpb24nO1xuaW1wb3J0IElubGluZUJsb2NrIGZyb20gJy4vSW5saW5lQmxvY2snO1xuaW1wb3J0IFBhcmFtcyBmcm9tICcuL1BhcmFtcyc7XG5pbXBvcnQgeyB0cmltU3BhY2VzRW5kIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgaXNBbmQsIGlzQmV0d2VlbiwgaXNMaW1pdCB9IGZyb20gJy4vdG9rZW4nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtYXR0ZXIge1xuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IGNmZ1xuICAgKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5sYW5ndWFnZVxuICAgKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5pbmRlbnRcbiAgICogIEBwYXJhbSB7Qm9vbGVhbn0gY2ZnLnVwcGVyY2FzZVxuICAgKiAgQHBhcmFtIHtJbnRlZ2VyfSBjZmcubGluZXNCZXR3ZWVuUXVlcmllc1xuICAgKiAgQHBhcmFtIHtPYmplY3R9IGNmZy5wYXJhbXNcbiAgICovXG4gIGNvbnN0cnVjdG9yKGNmZykge1xuICAgIHRoaXMuY2ZnID0gY2ZnO1xuICAgIHRoaXMuaW5kZW50YXRpb24gPSBuZXcgSW5kZW50YXRpb24odGhpcy5jZmcuaW5kZW50KTtcbiAgICB0aGlzLmlubGluZUJsb2NrID0gbmV3IElubGluZUJsb2NrKCk7XG4gICAgdGhpcy5wYXJhbXMgPSBuZXcgUGFyYW1zKHRoaXMuY2ZnLnBhcmFtcyk7XG4gICAgdGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4gPSB7fTtcbiAgICB0aGlzLnRva2VucyA9IFtdO1xuICAgIHRoaXMuaW5kZXggPSAwO1xuICB9XG5cbiAgLyoqXG4gICAqIFNRTCBUb2tlbml6ZXIgZm9yIHRoaXMgZm9ybWF0dGVyLCBwcm92aWRlZCBieSBzdWJjbGFzc2VzLlxuICAgKi9cbiAgdG9rZW5pemVyKCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndG9rZW5pemVyKCkgbm90IGltcGxlbWVudGVkIGJ5IHN1YmNsYXNzJyk7XG4gIH1cblxuICAvKipcbiAgICogUmVwcm9jZXNzIGFuZCBtb2RpZnkgYSB0b2tlbiBiYXNlZCBvbiBwYXJzZWQgY29udGV4dC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHRva2VuIFRoZSB0b2tlbiB0byBtb2RpZnlcbiAgICogIEBwYXJhbSB7U3RyaW5nfSB0b2tlbi50eXBlXG4gICAqICBAcGFyYW0ge1N0cmluZ30gdG9rZW4udmFsdWVcbiAgICogQHJldHVybiB7T2JqZWN0fSBuZXcgdG9rZW4gb3IgdGhlIG9yaWdpbmFsXG4gICAqICBAcmV0dXJuIHtTdHJpbmd9IHRva2VuLnR5cGVcbiAgICogIEByZXR1cm4ge1N0cmluZ30gdG9rZW4udmFsdWVcbiAgICovXG4gIHRva2VuT3ZlcnJpZGUodG9rZW4pIHtcbiAgICAvLyBzdWJjbGFzc2VzIGNhbiBvdmVycmlkZSB0aGlzIHRvIG1vZGlmeSB0b2tlbnMgZHVyaW5nIGZvcm1hdHRpbmdcbiAgICByZXR1cm4gdG9rZW47XG4gIH1cblxuICAvKipcbiAgICogRm9ybWF0cyB3aGl0ZXNwYWNlIGluIGEgU1FMIHN0cmluZyB0byBtYWtlIGl0IGVhc2llciB0byByZWFkLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcXVlcnkgVGhlIFNRTCBxdWVyeSBzdHJpbmdcbiAgICogQHJldHVybiB7U3RyaW5nfSBmb3JtYXR0ZWQgcXVlcnlcbiAgICovXG4gIGZvcm1hdChxdWVyeSkge1xuICAgIHRoaXMudG9rZW5zID0gdGhpcy50b2tlbml6ZXIoKS50b2tlbml6ZShxdWVyeSk7XG4gICAgY29uc3QgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmdldEZvcm1hdHRlZFF1ZXJ5RnJvbVRva2VucygpO1xuXG4gICAgcmV0dXJuIGZvcm1hdHRlZFF1ZXJ5LnRyaW0oKTtcbiAgfVxuXG4gIGdldEZvcm1hdHRlZFF1ZXJ5RnJvbVRva2VucygpIHtcbiAgICBsZXQgZm9ybWF0dGVkUXVlcnkgPSAnJztcblxuICAgIHRoaXMudG9rZW5zLmZvckVhY2goKHRva2VuLCBpbmRleCkgPT4ge1xuICAgICAgdGhpcy5pbmRleCA9IGluZGV4O1xuXG4gICAgICB0b2tlbiA9IHRoaXMudG9rZW5PdmVycmlkZSh0b2tlbik7XG5cbiAgICAgIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLkxJTkVfQ09NTUVOVCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0TGluZUNvbW1lbnQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5CTE9DS19DT01NRU5UKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRCbG9ja0NvbW1lbnQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkKHRva2VuLCBmb3JtYXR0ZWRRdWVyeSk7XG4gICAgICAgIHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuID0gdG9rZW47XG4gICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0VG9wTGV2ZWxSZXNlcnZlZFdvcmROb0luZGVudCh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHRva2VuO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUpIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdE5ld2xpbmVSZXNlcnZlZFdvcmQodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgICAgdGhpcy5wcmV2aW91c1Jlc2VydmVkVG9rZW4gPSB0b2tlbjtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRCkge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgICB0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbiA9IHRva2VuO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLk9QRU5fUEFSRU4pIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdE9wZW5pbmdQYXJlbnRoZXNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLkNMT1NFX1BBUkVOKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRDbG9zaW5nUGFyZW50aGVzZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5QTEFDRUhPTERFUikge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0UGxhY2Vob2xkZXIodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICcsJykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0Q29tbWEodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICc6Jykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0V2l0aFNwYWNlQWZ0ZXIodG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udmFsdWUgPT09ICcuJykge1xuICAgICAgICBmb3JtYXR0ZWRRdWVyeSA9IHRoaXMuZm9ybWF0V2l0aG91dFNwYWNlcyh0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIGlmICh0b2tlbi52YWx1ZSA9PT0gJzsnKSB7XG4gICAgICAgIGZvcm1hdHRlZFF1ZXJ5ID0gdGhpcy5mb3JtYXRRdWVyeVNlcGFyYXRvcih0b2tlbiwgZm9ybWF0dGVkUXVlcnkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9ybWF0dGVkUXVlcnkgPSB0aGlzLmZvcm1hdFdpdGhTcGFjZXModG9rZW4sIGZvcm1hdHRlZFF1ZXJ5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gZm9ybWF0dGVkUXVlcnk7XG4gIH1cblxuICBmb3JtYXRMaW5lQ29tbWVudCh0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5ICsgdGhpcy5zaG93KHRva2VuKSk7XG4gIH1cblxuICBmb3JtYXRCbG9ja0NvbW1lbnQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHRoaXMuYWRkTmV3bGluZSh0aGlzLmFkZE5ld2xpbmUocXVlcnkpICsgdGhpcy5pbmRlbnRDb21tZW50KHRva2VuLnZhbHVlKSk7XG4gIH1cblxuICBpbmRlbnRDb21tZW50KGNvbW1lbnQpIHtcbiAgICByZXR1cm4gY29tbWVudC5yZXBsYWNlKC9cXG5bIFxcdF0qL2d1LCAnXFxuJyArIHRoaXMuaW5kZW50YXRpb24uZ2V0SW5kZW50KCkgKyAnICcpO1xuICB9XG5cbiAgZm9ybWF0VG9wTGV2ZWxSZXNlcnZlZFdvcmROb0luZGVudCh0b2tlbiwgcXVlcnkpIHtcbiAgICB0aGlzLmluZGVudGF0aW9uLmRlY3JlYXNlVG9wTGV2ZWwoKTtcbiAgICBxdWVyeSA9IHRoaXMuYWRkTmV3bGluZShxdWVyeSkgKyB0aGlzLmVxdWFsaXplV2hpdGVzcGFjZSh0aGlzLnNob3codG9rZW4pKTtcbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgfVxuXG4gIGZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkKHRva2VuLCBxdWVyeSkge1xuICAgIHRoaXMuaW5kZW50YXRpb24uZGVjcmVhc2VUb3BMZXZlbCgpO1xuXG4gICAgcXVlcnkgPSB0aGlzLmFkZE5ld2xpbmUocXVlcnkpO1xuXG4gICAgdGhpcy5pbmRlbnRhdGlvbi5pbmNyZWFzZVRvcExldmVsKCk7XG5cbiAgICBxdWVyeSArPSB0aGlzLmVxdWFsaXplV2hpdGVzcGFjZSh0aGlzLnNob3codG9rZW4pKTtcbiAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgfVxuXG4gIGZvcm1hdE5ld2xpbmVSZXNlcnZlZFdvcmQodG9rZW4sIHF1ZXJ5KSB7XG4gICAgaWYgKGlzQW5kKHRva2VuKSAmJiBpc0JldHdlZW4odGhpcy50b2tlbkxvb2tCZWhpbmQoMikpKSB7XG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXRXaXRoU3BhY2VzKHRva2VuLCBxdWVyeSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmFkZE5ld2xpbmUocXVlcnkpICsgdGhpcy5lcXVhbGl6ZVdoaXRlc3BhY2UodGhpcy5zaG93KHRva2VuKSkgKyAnICc7XG4gIH1cblxuICAvLyBSZXBsYWNlIGFueSBzZXF1ZW5jZSBvZiB3aGl0ZXNwYWNlIGNoYXJhY3RlcnMgd2l0aCBzaW5nbGUgc3BhY2VcbiAgZXF1YWxpemVXaGl0ZXNwYWNlKHN0cmluZykge1xuICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgvXFxzKy9ndSwgJyAnKTtcbiAgfVxuXG4gIC8vIE9wZW5pbmcgcGFyZW50aGVzZXMgaW5jcmVhc2UgdGhlIGJsb2NrIGluZGVudCBsZXZlbCBhbmQgc3RhcnQgYSBuZXcgbGluZVxuICBmb3JtYXRPcGVuaW5nUGFyZW50aGVzZXModG9rZW4sIHF1ZXJ5KSB7XG4gICAgLy8gVGFrZSBvdXQgdGhlIHByZWNlZGluZyBzcGFjZSB1bmxlc3MgdGhlcmUgd2FzIHdoaXRlc3BhY2UgdGhlcmUgaW4gdGhlIG9yaWdpbmFsIHF1ZXJ5XG4gICAgLy8gb3IgYW5vdGhlciBvcGVuaW5nIHBhcmVucyBvciBsaW5lIGNvbW1lbnRcbiAgICBjb25zdCBwcmVzZXJ2ZVdoaXRlc3BhY2VGb3IgPSB7XG4gICAgICBbdG9rZW5UeXBlcy5PUEVOX1BBUkVOXTogdHJ1ZSxcbiAgICAgIFt0b2tlblR5cGVzLkxJTkVfQ09NTUVOVF06IHRydWUsXG4gICAgICBbdG9rZW5UeXBlcy5PUEVSQVRPUl06IHRydWUsXG4gICAgfTtcbiAgICBpZiAoXG4gICAgICB0b2tlbi53aGl0ZXNwYWNlQmVmb3JlLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgIXByZXNlcnZlV2hpdGVzcGFjZUZvclt0aGlzLnRva2VuTG9va0JlaGluZCgpPy50eXBlXVxuICAgICkge1xuICAgICAgcXVlcnkgPSB0cmltU3BhY2VzRW5kKHF1ZXJ5KTtcbiAgICB9XG4gICAgcXVlcnkgKz0gdGhpcy5zaG93KHRva2VuKTtcblxuICAgIHRoaXMuaW5saW5lQmxvY2suYmVnaW5JZlBvc3NpYmxlKHRoaXMudG9rZW5zLCB0aGlzLmluZGV4KTtcblxuICAgIGlmICghdGhpcy5pbmxpbmVCbG9jay5pc0FjdGl2ZSgpKSB7XG4gICAgICB0aGlzLmluZGVudGF0aW9uLmluY3JlYXNlQmxvY2tMZXZlbCgpO1xuICAgICAgcXVlcnkgPSB0aGlzLmFkZE5ld2xpbmUocXVlcnkpO1xuICAgIH1cbiAgICByZXR1cm4gcXVlcnk7XG4gIH1cblxuICAvLyBDbG9zaW5nIHBhcmVudGhlc2VzIGRlY3JlYXNlIHRoZSBibG9jayBpbmRlbnQgbGV2ZWxcbiAgZm9ybWF0Q2xvc2luZ1BhcmVudGhlc2VzKHRva2VuLCBxdWVyeSkge1xuICAgIGlmICh0aGlzLmlubGluZUJsb2NrLmlzQWN0aXZlKCkpIHtcbiAgICAgIHRoaXMuaW5saW5lQmxvY2suZW5kKCk7XG4gICAgICByZXR1cm4gdGhpcy5mb3JtYXRXaXRoU3BhY2VBZnRlcih0b2tlbiwgcXVlcnkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmluZGVudGF0aW9uLmRlY3JlYXNlQmxvY2tMZXZlbCgpO1xuICAgICAgcmV0dXJuIHRoaXMuZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KSk7XG4gICAgfVxuICB9XG5cbiAgZm9ybWF0UGxhY2Vob2xkZXIodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcmV0dXJuIHF1ZXJ5ICsgdGhpcy5wYXJhbXMuZ2V0KHRva2VuKSArICcgJztcbiAgfVxuXG4gIC8vIENvbW1hcyBzdGFydCBhIG5ldyBsaW5lICh1bmxlc3Mgd2l0aGluIGlubGluZSBwYXJlbnRoZXNlcyBvciBTUUwgXCJMSU1JVFwiIGNsYXVzZSlcbiAgZm9ybWF0Q29tbWEodG9rZW4sIHF1ZXJ5KSB7XG4gICAgcXVlcnkgPSB0cmltU3BhY2VzRW5kKHF1ZXJ5KSArIHRoaXMuc2hvdyh0b2tlbikgKyAnICc7XG5cbiAgICBpZiAodGhpcy5pbmxpbmVCbG9jay5pc0FjdGl2ZSgpKSB7XG4gICAgICByZXR1cm4gcXVlcnk7XG4gICAgfSBlbHNlIGlmIChpc0xpbWl0KHRoaXMucHJldmlvdXNSZXNlcnZlZFRva2VuKSkge1xuICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5hZGROZXdsaW5lKHF1ZXJ5KTtcbiAgICB9XG4gIH1cblxuICBmb3JtYXRXaXRoU3BhY2VBZnRlcih0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gdHJpbVNwYWNlc0VuZChxdWVyeSkgKyB0aGlzLnNob3codG9rZW4pICsgJyAnO1xuICB9XG5cbiAgZm9ybWF0V2l0aG91dFNwYWNlcyh0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gdHJpbVNwYWNlc0VuZChxdWVyeSkgKyB0aGlzLnNob3codG9rZW4pO1xuICB9XG5cbiAgZm9ybWF0V2l0aFNwYWNlcyh0b2tlbiwgcXVlcnkpIHtcbiAgICByZXR1cm4gcXVlcnkgKyB0aGlzLnNob3codG9rZW4pICsgJyAnO1xuICB9XG5cbiAgZm9ybWF0UXVlcnlTZXBhcmF0b3IodG9rZW4sIHF1ZXJ5KSB7XG4gICAgdGhpcy5pbmRlbnRhdGlvbi5yZXNldEluZGVudGF0aW9uKCk7XG4gICAgcmV0dXJuIHRyaW1TcGFjZXNFbmQocXVlcnkpICsgdGhpcy5zaG93KHRva2VuKSArICdcXG4nLnJlcGVhdCh0aGlzLmNmZy5saW5lc0JldHdlZW5RdWVyaWVzIHx8IDEpO1xuICB9XG5cbiAgLy8gQ29udmVydHMgdG9rZW4gdG8gc3RyaW5nICh1cHBlcmNhc2luZyBpdCBpZiBuZWVkZWQpXG4gIHNob3coeyB0eXBlLCB2YWx1ZSB9KSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5jZmcudXBwZXJjYXNlICYmXG4gICAgICAodHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRCB8fFxuICAgICAgICB0eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCB8fFxuICAgICAgICB0eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlQgfHxcbiAgICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5SRVNFUlZFRF9ORVdMSU5FIHx8XG4gICAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuT1BFTl9QQVJFTiB8fFxuICAgICAgICB0eXBlID09PSB0b2tlblR5cGVzLkNMT1NFX1BBUkVOKVxuICAgICkge1xuICAgICAgcmV0dXJuIHZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH1cblxuICBhZGROZXdsaW5lKHF1ZXJ5KSB7XG4gICAgcXVlcnkgPSB0cmltU3BhY2VzRW5kKHF1ZXJ5KTtcbiAgICBpZiAoIXF1ZXJ5LmVuZHNXaXRoKCdcXG4nKSkge1xuICAgICAgcXVlcnkgKz0gJ1xcbic7XG4gICAgfVxuICAgIHJldHVybiBxdWVyeSArIHRoaXMuaW5kZW50YXRpb24uZ2V0SW5kZW50KCk7XG4gIH1cblxuICB0b2tlbkxvb2tCZWhpbmQobiA9IDEpIHtcbiAgICByZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5pbmRleCAtIG5dO1xuICB9XG5cbiAgdG9rZW5Mb29rQWhlYWQobiA9IDEpIHtcbiAgICByZXR1cm4gdGhpcy50b2tlbnNbdGhpcy5pbmRleCArIG5dO1xuICB9XG59XG4iLCJpbXBvcnQgeyBsYXN0IH0gZnJvbSAnLi4vdXRpbHMnO1xuXG5jb25zdCBJTkRFTlRfVFlQRV9UT1BfTEVWRUwgPSAndG9wLWxldmVsJztcbmNvbnN0IElOREVOVF9UWVBFX0JMT0NLX0xFVkVMID0gJ2Jsb2NrLWxldmVsJztcblxuLyoqXG4gKiBNYW5hZ2VzIGluZGVudGF0aW9uIGxldmVscy5cbiAqXG4gKiBUaGVyZSBhcmUgdHdvIHR5cGVzIG9mIGluZGVudGF0aW9uIGxldmVsczpcbiAqXG4gKiAtIEJMT0NLX0xFVkVMIDogaW5jcmVhc2VkIGJ5IG9wZW4tcGFyZW50aGVzaXNcbiAqIC0gVE9QX0xFVkVMIDogaW5jcmVhc2VkIGJ5IFJFU0VSVkVEX1RPUF9MRVZFTCB3b3Jkc1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRlbnRhdGlvbiB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaW5kZW50IEluZGVudCB2YWx1ZSwgZGVmYXVsdCBpcyBcIiAgXCIgKDIgc3BhY2VzKVxuICAgKi9cbiAgY29uc3RydWN0b3IoaW5kZW50KSB7XG4gICAgdGhpcy5pbmRlbnQgPSBpbmRlbnQgfHwgJyAgJztcbiAgICB0aGlzLmluZGVudFR5cGVzID0gW107XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBjdXJyZW50IGluZGVudGF0aW9uIHN0cmluZy5cbiAgICogQHJldHVybiB7U3RyaW5nfVxuICAgKi9cbiAgZ2V0SW5kZW50KCkge1xuICAgIHJldHVybiB0aGlzLmluZGVudC5yZXBlYXQodGhpcy5pbmRlbnRUeXBlcy5sZW5ndGgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEluY3JlYXNlcyBpbmRlbnRhdGlvbiBieSBvbmUgdG9wLWxldmVsIGluZGVudC5cbiAgICovXG4gIGluY3JlYXNlVG9wTGV2ZWwoKSB7XG4gICAgdGhpcy5pbmRlbnRUeXBlcy5wdXNoKElOREVOVF9UWVBFX1RPUF9MRVZFTCk7XG4gIH1cblxuICAvKipcbiAgICogSW5jcmVhc2VzIGluZGVudGF0aW9uIGJ5IG9uZSBibG9jay1sZXZlbCBpbmRlbnQuXG4gICAqL1xuICBpbmNyZWFzZUJsb2NrTGV2ZWwoKSB7XG4gICAgdGhpcy5pbmRlbnRUeXBlcy5wdXNoKElOREVOVF9UWVBFX0JMT0NLX0xFVkVMKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWNyZWFzZXMgaW5kZW50YXRpb24gYnkgb25lIHRvcC1sZXZlbCBpbmRlbnQuXG4gICAqIERvZXMgbm90aGluZyB3aGVuIHRoZSBwcmV2aW91cyBpbmRlbnQgaXMgbm90IHRvcC1sZXZlbC5cbiAgICovXG4gIGRlY3JlYXNlVG9wTGV2ZWwoKSB7XG4gICAgaWYgKHRoaXMuaW5kZW50VHlwZXMubGVuZ3RoID4gMCAmJiBsYXN0KHRoaXMuaW5kZW50VHlwZXMpID09PSBJTkRFTlRfVFlQRV9UT1BfTEVWRUwpIHtcbiAgICAgIHRoaXMuaW5kZW50VHlwZXMucG9wKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlY3JlYXNlcyBpbmRlbnRhdGlvbiBieSBvbmUgYmxvY2stbGV2ZWwgaW5kZW50LlxuICAgKiBJZiB0aGVyZSBhcmUgdG9wLWxldmVsIGluZGVudHMgd2l0aGluIHRoZSBibG9jay1sZXZlbCBpbmRlbnQsXG4gICAqIHRocm93cyBhd2F5IHRoZXNlIGFzIHdlbGwuXG4gICAqL1xuICBkZWNyZWFzZUJsb2NrTGV2ZWwoKSB7XG4gICAgd2hpbGUgKHRoaXMuaW5kZW50VHlwZXMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgdHlwZSA9IHRoaXMuaW5kZW50VHlwZXMucG9wKCk7XG4gICAgICBpZiAodHlwZSAhPT0gSU5ERU5UX1RZUEVfVE9QX0xFVkVMKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJlc2V0SW5kZW50YXRpb24oKSB7XG4gICAgdGhpcy5pbmRlbnRUeXBlcyA9IFtdO1xuICB9XG59XG4iLCJpbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuL3Rva2VuVHlwZXMnO1xuXG5jb25zdCBJTkxJTkVfTUFYX0xFTkdUSCA9IDUwO1xuXG4vKipcbiAqIEJvb2trZWVwZXIgZm9yIGlubGluZSBibG9ja3MuXG4gKlxuICogSW5saW5lIGJsb2NrcyBhcmUgcGFyZW50aGl6ZWQgZXhwcmVzc2lvbnMgdGhhdCBhcmUgc2hvcnRlciB0aGFuIElOTElORV9NQVhfTEVOR1RILlxuICogVGhlc2UgYmxvY2tzIGFyZSBmb3JtYXR0ZWQgb24gYSBzaW5nbGUgbGluZSwgdW5saWtlIGxvbmdlciBwYXJlbnRoaXplZFxuICogZXhwcmVzc2lvbnMgd2hlcmUgb3Blbi1wYXJlbnRoZXNpcyBjYXVzZXMgbmV3bGluZSBhbmQgaW5jcmVhc2Ugb2YgaW5kZW50YXRpb24uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIElubGluZUJsb2NrIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sZXZlbCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogQmVnaW5zIGlubGluZSBibG9jayB3aGVuIGxvb2thaGVhZCB0aHJvdWdoIHVwY29taW5nIHRva2VucyBkZXRlcm1pbmVzXG4gICAqIHRoYXQgdGhlIGJsb2NrIHdvdWxkIGJlIHNtYWxsZXIgdGhhbiBJTkxJTkVfTUFYX0xFTkdUSC5cbiAgICogQHBhcmFtICB7T2JqZWN0W119IHRva2VucyBBcnJheSBvZiBhbGwgdG9rZW5zXG4gICAqIEBwYXJhbSAge051bWJlcn0gaW5kZXggQ3VycmVudCB0b2tlbiBwb3NpdGlvblxuICAgKi9cbiAgYmVnaW5JZlBvc3NpYmxlKHRva2VucywgaW5kZXgpIHtcbiAgICBpZiAodGhpcy5sZXZlbCA9PT0gMCAmJiB0aGlzLmlzSW5saW5lQmxvY2sodG9rZW5zLCBpbmRleCkpIHtcbiAgICAgIHRoaXMubGV2ZWwgPSAxO1xuICAgIH0gZWxzZSBpZiAodGhpcy5sZXZlbCA+IDApIHtcbiAgICAgIHRoaXMubGV2ZWwrKztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sZXZlbCA9IDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmlzaGVzIGN1cnJlbnQgaW5saW5lIGJsb2NrLlxuICAgKiBUaGVyZSBtaWdodCBiZSBzZXZlcmFsIG5lc3RlZCBvbmVzLlxuICAgKi9cbiAgZW5kKCkge1xuICAgIHRoaXMubGV2ZWwtLTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUcnVlIHdoZW4gaW5zaWRlIGFuIGlubGluZSBibG9ja1xuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKi9cbiAgaXNBY3RpdmUoKSB7XG4gICAgcmV0dXJuIHRoaXMubGV2ZWwgPiAwO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdGhpcyBzaG91bGQgYmUgYW4gaW5saW5lIHBhcmVudGhlc2VzIGJsb2NrXG4gIC8vIEV4YW1wbGVzIGFyZSBcIk5PVygpXCIsIFwiQ09VTlQoKilcIiwgXCJpbnQoMTApXCIsIGtleShgc29tZWNvbHVtbmApLCBERUNJTUFMKDcsMilcbiAgaXNJbmxpbmVCbG9jayh0b2tlbnMsIGluZGV4KSB7XG4gICAgbGV0IGxlbmd0aCA9IDA7XG4gICAgbGV0IGxldmVsID0gMDtcblxuICAgIGZvciAobGV0IGkgPSBpbmRleDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICBsZW5ndGggKz0gdG9rZW4udmFsdWUubGVuZ3RoO1xuXG4gICAgICAvLyBPdmVycmFuIG1heCBsZW5ndGhcbiAgICAgIGlmIChsZW5ndGggPiBJTkxJTkVfTUFYX0xFTkdUSCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmICh0b2tlbi50eXBlID09PSB0b2tlblR5cGVzLk9QRU5fUEFSRU4pIHtcbiAgICAgICAgbGV2ZWwrKztcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gdG9rZW5UeXBlcy5DTE9TRV9QQVJFTikge1xuICAgICAgICBsZXZlbC0tO1xuICAgICAgICBpZiAobGV2ZWwgPT09IDApIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc0ZvcmJpZGRlblRva2VuKHRva2VuKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIFJlc2VydmVkIHdvcmRzIHRoYXQgY2F1c2UgbmV3bGluZXMsIGNvbW1lbnRzIGFuZCBzZW1pY29sb25zXG4gIC8vIGFyZSBub3QgYWxsb3dlZCBpbnNpZGUgaW5saW5lIHBhcmVudGhlc2VzIGJsb2NrXG4gIGlzRm9yYmlkZGVuVG9rZW4oeyB0eXBlLCB2YWx1ZSB9KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMIHx8XG4gICAgICB0eXBlID09PSB0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUgfHxcbiAgICAgIHR5cGUgPT09IHRva2VuVHlwZXMuQ09NTUVOVCB8fFxuICAgICAgdHlwZSA9PT0gdG9rZW5UeXBlcy5CTE9DS19DT01NRU5UIHx8XG4gICAgICB2YWx1ZSA9PT0gJzsnXG4gICAgKTtcbiAgfVxufVxuIiwiLyoqXG4gKiBIYW5kbGVzIHBsYWNlaG9sZGVyIHJlcGxhY2VtZW50IHdpdGggZ2l2ZW4gcGFyYW1zLlxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYXJhbXMge1xuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtc1xuICAgKi9cbiAgY29uc3RydWN0b3IocGFyYW1zKSB7XG4gICAgdGhpcy5wYXJhbXMgPSBwYXJhbXM7XG4gICAgdGhpcy5pbmRleCA9IDA7XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBwYXJhbSB2YWx1ZSB0aGF0IG1hdGNoZXMgZ2l2ZW4gcGxhY2Vob2xkZXIgd2l0aCBwYXJhbSBrZXkuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlblxuICAgKiAgIEBwYXJhbSB7U3RyaW5nfSB0b2tlbi5rZXkgUGxhY2Vob2xkZXIga2V5XG4gICAqICAgQHBhcmFtIHtTdHJpbmd9IHRva2VuLnZhbHVlIFBsYWNlaG9sZGVyIHZhbHVlXG4gICAqIEByZXR1cm4ge1N0cmluZ30gcGFyYW0gb3IgdG9rZW4udmFsdWUgd2hlbiBwYXJhbXMgYXJlIG1pc3NpbmdcbiAgICovXG4gIGdldCh7IGtleSwgdmFsdWUgfSkge1xuICAgIGlmICghdGhpcy5wYXJhbXMpIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgaWYgKGtleSkge1xuICAgICAgcmV0dXJuIHRoaXMucGFyYW1zW2tleV07XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBhcmFtc1t0aGlzLmluZGV4KytdO1xuICB9XG59XG4iLCJpbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuL3Rva2VuVHlwZXMnO1xuaW1wb3J0ICogYXMgcmVnZXhGYWN0b3J5IGZyb20gJy4vcmVnZXhGYWN0b3J5JztcbmltcG9ydCB7IGVzY2FwZVJlZ0V4cCB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9rZW5pemVyIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjZmdcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5yZXNlcnZlZFdvcmRzIFJlc2VydmVkIHdvcmRzIGluIFNRTFxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnJlc2VydmVkVG9wTGV2ZWxXb3JkcyBXb3JkcyB0aGF0IGFyZSBzZXQgdG8gbmV3IGxpbmUgc2VwYXJhdGVseVxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLnJlc2VydmVkTmV3bGluZVdvcmRzIFdvcmRzIHRoYXQgYXJlIHNldCB0byBuZXdsaW5lXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcucmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgV29yZHMgdGhhdCBhcmUgdG9wIGxldmVsIGJ1dCBoYXZlIG5vIGluZGVudGF0aW9uXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcuc3RyaW5nVHlwZXMgU3RyaW5nIHR5cGVzIHRvIGVuYWJsZTogXCJcIiwgJycsIGBgLCBbXSwgTicnXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcub3BlblBhcmVucyBPcGVuaW5nIHBhcmVudGhlc2VzIHRvIGVuYWJsZSwgbGlrZSAoLCBbXG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcuY2xvc2VQYXJlbnMgQ2xvc2luZyBwYXJlbnRoZXNlcyB0byBlbmFibGUsIGxpa2UgKSwgXVxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLmluZGV4ZWRQbGFjZWhvbGRlclR5cGVzIFByZWZpeGVzIGZvciBpbmRleGVkIHBsYWNlaG9sZGVycywgbGlrZSA/XG4gICAqICBAcGFyYW0ge1N0cmluZ1tdfSBjZmcubmFtZWRQbGFjZWhvbGRlclR5cGVzIFByZWZpeGVzIGZvciBuYW1lZCBwbGFjZWhvbGRlcnMsIGxpa2UgQCBhbmQgOlxuICAgKiAgQHBhcmFtIHtTdHJpbmdbXX0gY2ZnLmxpbmVDb21tZW50VHlwZXMgTGluZSBjb21tZW50cyB0byBlbmFibGUsIGxpa2UgIyBhbmQgLS1cbiAgICogIEBwYXJhbSB7U3RyaW5nW119IGNmZy5zcGVjaWFsV29yZENoYXJzIFNwZWNpYWwgY2hhcnMgdGhhdCBjYW4gYmUgZm91bmQgaW5zaWRlIG9mIHdvcmRzLCBsaWtlIEAgYW5kICNcbiAgICogIEBwYXJhbSB7U3RyaW5nW119IFtjZmcub3BlcmF0b3JdIEFkZGl0aW9uYWwgb3BlcmF0b3JzIHRvIHJlY29nbml6ZVxuICAgKi9cbiAgY29uc3RydWN0b3IoY2ZnKSB7XG4gICAgdGhpcy5XSElURVNQQUNFX1JFR0VYID0gL14oXFxzKykvdTtcbiAgICB0aGlzLk5VTUJFUl9SRUdFWCA9IC9eKCgtXFxzKik/WzAtOV0rKFxcLlswLTldKyk/KFtlRV0tP1swLTldKyhcXC5bMC05XSspPyk/fDB4WzAtOWEtZkEtRl0rfDBiWzAxXSspXFxiL3U7XG5cbiAgICB0aGlzLk9QRVJBVE9SX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZU9wZXJhdG9yUmVnZXgoW1xuICAgICAgJzw+JyxcbiAgICAgICc8PScsXG4gICAgICAnPj0nLFxuICAgICAgLi4uKGNmZy5vcGVyYXRvcnMgfHwgW10pLFxuICAgIF0pO1xuXG4gICAgdGhpcy5CTE9DS19DT01NRU5UX1JFR0VYID0gL14oXFwvXFwqW15dKj8oPzpcXCpcXC98JCkpL3U7XG4gICAgdGhpcy5MSU5FX0NPTU1FTlRfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlTGluZUNvbW1lbnRSZWdleChjZmcubGluZUNvbW1lbnRUeXBlcyk7XG5cbiAgICB0aGlzLlJFU0VSVkVEX1RPUF9MRVZFTF9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVSZXNlcnZlZFdvcmRSZWdleChjZmcucmVzZXJ2ZWRUb3BMZXZlbFdvcmRzKTtcbiAgICB0aGlzLlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlRfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgoXG4gICAgICBjZmcucmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnRcbiAgICApO1xuICAgIHRoaXMuUkVTRVJWRURfTkVXTElORV9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVSZXNlcnZlZFdvcmRSZWdleChjZmcucmVzZXJ2ZWROZXdsaW5lV29yZHMpO1xuICAgIHRoaXMuUkVTRVJWRURfUExBSU5fUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgoY2ZnLnJlc2VydmVkV29yZHMpO1xuXG4gICAgdGhpcy5XT1JEX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVdvcmRSZWdleChjZmcuc3BlY2lhbFdvcmRDaGFycyk7XG4gICAgdGhpcy5TVFJJTkdfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlU3RyaW5nUmVnZXgoY2ZnLnN0cmluZ1R5cGVzKTtcblxuICAgIHRoaXMuT1BFTl9QQVJFTl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVQYXJlblJlZ2V4KGNmZy5vcGVuUGFyZW5zKTtcbiAgICB0aGlzLkNMT1NFX1BBUkVOX1JFR0VYID0gcmVnZXhGYWN0b3J5LmNyZWF0ZVBhcmVuUmVnZXgoY2ZnLmNsb3NlUGFyZW5zKTtcblxuICAgIHRoaXMuSU5ERVhFRF9QTEFDRUhPTERFUl9SRUdFWCA9IHJlZ2V4RmFjdG9yeS5jcmVhdGVQbGFjZWhvbGRlclJlZ2V4KFxuICAgICAgY2ZnLmluZGV4ZWRQbGFjZWhvbGRlclR5cGVzLFxuICAgICAgJ1swLTldKidcbiAgICApO1xuICAgIHRoaXMuSURFTlRfTkFNRURfUExBQ0VIT0xERVJfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUGxhY2Vob2xkZXJSZWdleChcbiAgICAgIGNmZy5uYW1lZFBsYWNlaG9sZGVyVHlwZXMsXG4gICAgICAnW2EtekEtWjAtOS5fJF0rJ1xuICAgICk7XG4gICAgdGhpcy5TVFJJTkdfTkFNRURfUExBQ0VIT0xERVJfUkVHRVggPSByZWdleEZhY3RvcnkuY3JlYXRlUGxhY2Vob2xkZXJSZWdleChcbiAgICAgIGNmZy5uYW1lZFBsYWNlaG9sZGVyVHlwZXMsXG4gICAgICByZWdleEZhY3RvcnkuY3JlYXRlU3RyaW5nUGF0dGVybihjZmcuc3RyaW5nVHlwZXMpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUYWtlcyBhIFNRTCBzdHJpbmcgYW5kIGJyZWFrcyBpdCBpbnRvIHRva2Vucy5cbiAgICogRWFjaCB0b2tlbiBpcyBhbiBvYmplY3Qgd2l0aCB0eXBlIGFuZCB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGlucHV0IFRoZSBTUUwgc3RyaW5nXG4gICAqIEByZXR1cm4ge09iamVjdFtdfSB0b2tlbnMgQW4gYXJyYXkgb2YgdG9rZW5zLlxuICAgKiAgQHJldHVybiB7U3RyaW5nfSB0b2tlbi50eXBlXG4gICAqICBAcmV0dXJuIHtTdHJpbmd9IHRva2VuLnZhbHVlXG4gICAqICBAcmV0dXJuIHtTdHJpbmd9IHRva2VuLndoaXRlc3BhY2VCZWZvcmUgUHJlY2VkaW5nIHdoaXRlc3BhY2VcbiAgICovXG4gIHRva2VuaXplKGlucHV0KSB7XG4gICAgY29uc3QgdG9rZW5zID0gW107XG4gICAgbGV0IHRva2VuO1xuXG4gICAgLy8gS2VlcCBwcm9jZXNzaW5nIHRoZSBzdHJpbmcgdW50aWwgaXQgaXMgZW1wdHlcbiAgICB3aGlsZSAoaW5wdXQubGVuZ3RoKSB7XG4gICAgICAvLyBncmFiIGFueSBwcmVjZWRpbmcgd2hpdGVzcGFjZVxuICAgICAgY29uc3Qgd2hpdGVzcGFjZUJlZm9yZSA9IHRoaXMuZ2V0V2hpdGVzcGFjZShpbnB1dCk7XG4gICAgICBpbnB1dCA9IGlucHV0LnN1YnN0cmluZyh3aGl0ZXNwYWNlQmVmb3JlLmxlbmd0aCk7XG5cbiAgICAgIGlmIChpbnB1dC5sZW5ndGgpIHtcbiAgICAgICAgLy8gR2V0IHRoZSBuZXh0IHRva2VuIGFuZCB0aGUgdG9rZW4gdHlwZVxuICAgICAgICB0b2tlbiA9IHRoaXMuZ2V0TmV4dFRva2VuKGlucHV0LCB0b2tlbik7XG4gICAgICAgIC8vIEFkdmFuY2UgdGhlIHN0cmluZ1xuICAgICAgICBpbnB1dCA9IGlucHV0LnN1YnN0cmluZyh0b2tlbi52YWx1ZS5sZW5ndGgpO1xuXG4gICAgICAgIHRva2Vucy5wdXNoKHsgLi4udG9rZW4sIHdoaXRlc3BhY2VCZWZvcmUgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0b2tlbnM7XG4gIH1cblxuICBnZXRXaGl0ZXNwYWNlKGlucHV0KSB7XG4gICAgY29uc3QgbWF0Y2hlcyA9IGlucHV0Lm1hdGNoKHRoaXMuV0hJVEVTUEFDRV9SRUdFWCk7XG4gICAgcmV0dXJuIG1hdGNoZXMgPyBtYXRjaGVzWzFdIDogJyc7XG4gIH1cblxuICBnZXROZXh0VG9rZW4oaW5wdXQsIHByZXZpb3VzVG9rZW4pIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5nZXRDb21tZW50VG9rZW4oaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFN0cmluZ1Rva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRPcGVuUGFyZW5Ub2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0Q2xvc2VQYXJlblRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXROdW1iZXJUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0UmVzZXJ2ZWRXb3JkVG9rZW4oaW5wdXQsIHByZXZpb3VzVG9rZW4pIHx8XG4gICAgICB0aGlzLmdldFdvcmRUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0T3BlcmF0b3JUb2tlbihpbnB1dClcbiAgICApO1xuICB9XG5cbiAgZ2V0Q29tbWVudFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TGluZUNvbW1lbnRUb2tlbihpbnB1dCkgfHwgdGhpcy5nZXRCbG9ja0NvbW1lbnRUb2tlbihpbnB1dCk7XG4gIH1cblxuICBnZXRMaW5lQ29tbWVudFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLkxJTkVfQ09NTUVOVCxcbiAgICAgIHJlZ2V4OiB0aGlzLkxJTkVfQ09NTUVOVF9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldEJsb2NrQ29tbWVudFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLkJMT0NLX0NPTU1FTlQsXG4gICAgICByZWdleDogdGhpcy5CTE9DS19DT01NRU5UX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0U3RyaW5nVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuU1RSSU5HLFxuICAgICAgcmVnZXg6IHRoaXMuU1RSSU5HX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0T3BlblBhcmVuVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuT1BFTl9QQVJFTixcbiAgICAgIHJlZ2V4OiB0aGlzLk9QRU5fUEFSRU5fUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRDbG9zZVBhcmVuVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuQ0xPU0VfUEFSRU4sXG4gICAgICByZWdleDogdGhpcy5DTE9TRV9QQVJFTl9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5nZXRJZGVudE5hbWVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0U3RyaW5nTmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXRJbmRleGVkUGxhY2Vob2xkZXJUb2tlbihpbnB1dClcbiAgICApO1xuICB9XG5cbiAgZ2V0SWRlbnROYW1lZFBsYWNlaG9sZGVyVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQbGFjZWhvbGRlclRva2VuV2l0aEtleSh7XG4gICAgICBpbnB1dCxcbiAgICAgIHJlZ2V4OiB0aGlzLklERU5UX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYLFxuICAgICAgcGFyc2VLZXk6ICh2KSA9PiB2LnNsaWNlKDEpLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0U3RyaW5nTmFtZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGxhY2Vob2xkZXJUb2tlbldpdGhLZXkoe1xuICAgICAgaW5wdXQsXG4gICAgICByZWdleDogdGhpcy5TVFJJTkdfTkFNRURfUExBQ0VIT0xERVJfUkVHRVgsXG4gICAgICBwYXJzZUtleTogKHYpID0+XG4gICAgICAgIHRoaXMuZ2V0RXNjYXBlZFBsYWNlaG9sZGVyS2V5KHsga2V5OiB2LnNsaWNlKDIsIC0xKSwgcXVvdGVDaGFyOiB2LnNsaWNlKC0xKSB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldEluZGV4ZWRQbGFjZWhvbGRlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGxhY2Vob2xkZXJUb2tlbldpdGhLZXkoe1xuICAgICAgaW5wdXQsXG4gICAgICByZWdleDogdGhpcy5JTkRFWEVEX1BMQUNFSE9MREVSX1JFR0VYLFxuICAgICAgcGFyc2VLZXk6ICh2KSA9PiB2LnNsaWNlKDEpLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UGxhY2Vob2xkZXJUb2tlbldpdGhLZXkoeyBpbnB1dCwgcmVnZXgsIHBhcnNlS2V5IH0pIHtcbiAgICBjb25zdCB0b2tlbiA9IHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goeyBpbnB1dCwgcmVnZXgsIHR5cGU6IHRva2VuVHlwZXMuUExBQ0VIT0xERVIgfSk7XG4gICAgaWYgKHRva2VuKSB7XG4gICAgICB0b2tlbi5rZXkgPSBwYXJzZUtleSh0b2tlbi52YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB0b2tlbjtcbiAgfVxuXG4gIGdldEVzY2FwZWRQbGFjZWhvbGRlcktleSh7IGtleSwgcXVvdGVDaGFyIH0pIHtcbiAgICByZXR1cm4ga2V5LnJlcGxhY2UobmV3IFJlZ0V4cChlc2NhcGVSZWdFeHAoJ1xcXFwnICsgcXVvdGVDaGFyKSwgJ2d1JyksIHF1b3RlQ2hhcik7XG4gIH1cblxuICAvLyBEZWNpbWFsLCBiaW5hcnksIG9yIGhleCBudW1iZXJzXG4gIGdldE51bWJlclRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLk5VTUJFUixcbiAgICAgIHJlZ2V4OiB0aGlzLk5VTUJFUl9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFB1bmN0dWF0aW9uIGFuZCBzeW1ib2xzXG4gIGdldE9wZXJhdG9yVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuT1BFUkFUT1IsXG4gICAgICByZWdleDogdGhpcy5PUEVSQVRPUl9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFJlc2VydmVkV29yZFRva2VuKGlucHV0LCBwcmV2aW91c1Rva2VuKSB7XG4gICAgLy8gQSByZXNlcnZlZCB3b3JkIGNhbm5vdCBiZSBwcmVjZWRlZCBieSBhIFwiLlwiXG4gICAgLy8gdGhpcyBtYWtlcyBpdCBzbyBpbiBcIm15dGFibGUuZnJvbVwiLCBcImZyb21cIiBpcyBub3QgY29uc2lkZXJlZCBhIHJlc2VydmVkIHdvcmRcbiAgICBpZiAocHJldmlvdXNUb2tlbiAmJiBwcmV2aW91c1Rva2VuLnZhbHVlICYmIHByZXZpb3VzVG9rZW4udmFsdWUgPT09ICcuJykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuZ2V0VG9wTGV2ZWxSZXNlcnZlZFRva2VuKGlucHV0KSB8fFxuICAgICAgdGhpcy5nZXROZXdsaW5lUmVzZXJ2ZWRUb2tlbihpbnB1dCkgfHxcbiAgICAgIHRoaXMuZ2V0VG9wTGV2ZWxSZXNlcnZlZFRva2VuTm9JbmRlbnQoaW5wdXQpIHx8XG4gICAgICB0aGlzLmdldFBsYWluUmVzZXJ2ZWRUb2tlbihpbnB1dClcbiAgICApO1xuICB9XG5cbiAgZ2V0VG9wTGV2ZWxSZXNlcnZlZFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCxcbiAgICAgIHJlZ2V4OiB0aGlzLlJFU0VSVkVEX1RPUF9MRVZFTF9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldE5ld2xpbmVSZXNlcnZlZFRva2VuKGlucHV0KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0VG9rZW5PbkZpcnN0TWF0Y2goe1xuICAgICAgaW5wdXQsXG4gICAgICB0eXBlOiB0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUsXG4gICAgICByZWdleDogdGhpcy5SRVNFUlZFRF9ORVdMSU5FX1JFR0VYLFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0VG9wTGV2ZWxSZXNlcnZlZFRva2VuTm9JbmRlbnQoaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVCxcbiAgICAgIHJlZ2V4OiB0aGlzLlJFU0VSVkVEX1RPUF9MRVZFTF9OT19JTkRFTlRfUkVHRVgsXG4gICAgfSk7XG4gIH1cblxuICBnZXRQbGFpblJlc2VydmVkVG9rZW4oaW5wdXQpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUb2tlbk9uRmlyc3RNYXRjaCh7XG4gICAgICBpbnB1dCxcbiAgICAgIHR5cGU6IHRva2VuVHlwZXMuUkVTRVJWRUQsXG4gICAgICByZWdleDogdGhpcy5SRVNFUlZFRF9QTEFJTl9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFdvcmRUb2tlbihpbnB1dCkge1xuICAgIHJldHVybiB0aGlzLmdldFRva2VuT25GaXJzdE1hdGNoKHtcbiAgICAgIGlucHV0LFxuICAgICAgdHlwZTogdG9rZW5UeXBlcy5XT1JELFxuICAgICAgcmVnZXg6IHRoaXMuV09SRF9SRUdFWCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFRva2VuT25GaXJzdE1hdGNoKHsgaW5wdXQsIHR5cGUsIHJlZ2V4IH0pIHtcbiAgICBjb25zdCBtYXRjaGVzID0gaW5wdXQubWF0Y2gocmVnZXgpO1xuXG4gICAgcmV0dXJuIG1hdGNoZXMgPyB7IHR5cGUsIHZhbHVlOiBtYXRjaGVzWzFdIH0gOiB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IGVzY2FwZVJlZ0V4cCwgaXNFbXB0eSwgc29ydEJ5TGVuZ3RoRGVzYyB9IGZyb20gJy4uL3V0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9wZXJhdG9yUmVnZXgobXVsdGlMZXR0ZXJPcGVyYXRvcnMpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoXG4gICAgYF4oJHtzb3J0QnlMZW5ndGhEZXNjKG11bHRpTGV0dGVyT3BlcmF0b3JzKS5tYXAoZXNjYXBlUmVnRXhwKS5qb2luKCd8Jyl9fC4pYCxcbiAgICAndSdcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUxpbmVDb21tZW50UmVnZXgobGluZUNvbW1lbnRUeXBlcykge1xuICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICBgXigoPzoke2xpbmVDb21tZW50VHlwZXMubWFwKChjKSA9PiBlc2NhcGVSZWdFeHAoYykpLmpvaW4oJ3wnKX0pLio/KSg/OlxcclxcbnxcXHJ8XFxufCQpYCxcbiAgICAndSdcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlc2VydmVkV29yZFJlZ2V4KHJlc2VydmVkV29yZHMpIHtcbiAgaWYgKHJlc2VydmVkV29yZHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoYF5cXGIkYCwgJ3UnKTtcbiAgfVxuICBjb25zdCByZXNlcnZlZFdvcmRzUGF0dGVybiA9IHNvcnRCeUxlbmd0aERlc2MocmVzZXJ2ZWRXb3Jkcykuam9pbignfCcpLnJlcGxhY2UoLyAvZ3UsICdcXFxccysnKTtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoYF4oJHtyZXNlcnZlZFdvcmRzUGF0dGVybn0pXFxcXGJgLCAnaXUnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVdvcmRSZWdleChzcGVjaWFsQ2hhcnMgPSBbXSkge1xuICByZXR1cm4gbmV3IFJlZ0V4cChcbiAgICBgXihbXFxcXHB7QWxwaGFiZXRpY31cXFxccHtNYXJrfVxcXFxwe0RlY2ltYWxfTnVtYmVyfVxcXFxwe0Nvbm5lY3Rvcl9QdW5jdHVhdGlvbn1cXFxccHtKb2luX0NvbnRyb2x9JHtzcGVjaWFsQ2hhcnMuam9pbihcbiAgICAgICcnXG4gICAgKX1dKylgLFxuICAgICd1J1xuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU3RyaW5nUmVnZXgoc3RyaW5nVHlwZXMpIHtcbiAgcmV0dXJuIG5ldyBSZWdFeHAoJ14oJyArIGNyZWF0ZVN0cmluZ1BhdHRlcm4oc3RyaW5nVHlwZXMpICsgJyknLCAndScpO1xufVxuXG4vLyBUaGlzIGVuYWJsZXMgdGhlIGZvbGxvd2luZyBzdHJpbmcgcGF0dGVybnM6XG4vLyAxLiBiYWNrdGljayBxdW90ZWQgc3RyaW5nIHVzaW5nIGBgIHRvIGVzY2FwZVxuLy8gMi4gc3F1YXJlIGJyYWNrZXQgcXVvdGVkIHN0cmluZyAoU1FMIFNlcnZlcikgdXNpbmcgXV0gdG8gZXNjYXBlXG4vLyAzLiBkb3VibGUgcXVvdGVkIHN0cmluZyB1c2luZyBcIlwiIG9yIFxcXCIgdG8gZXNjYXBlXG4vLyA0LiBzaW5nbGUgcXVvdGVkIHN0cmluZyB1c2luZyAnJyBvciBcXCcgdG8gZXNjYXBlXG4vLyA1LiBuYXRpb25hbCBjaGFyYWN0ZXIgcXVvdGVkIHN0cmluZyB1c2luZyBOJycgb3IgTlxcJyB0byBlc2NhcGVcbi8vIDYuIFVuaWNvZGUgc2luZ2xlLXF1b3RlZCBzdHJpbmcgdXNpbmcgXFwnIHRvIGVzY2FwZVxuLy8gNy4gVW5pY29kZSBkb3VibGUtcXVvdGVkIHN0cmluZyB1c2luZyBcXFwiIHRvIGVzY2FwZVxuLy8gOC4gUG9zdGdyZVNRTCBkb2xsYXItcXVvdGVkIHN0cmluZ3NcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVTdHJpbmdQYXR0ZXJuKHN0cmluZ1R5cGVzKSB7XG4gIGNvbnN0IHBhdHRlcm5zID0ge1xuICAgICdgYCc6ICcoKGBbXmBdKigkfGApKSspJyxcbiAgICAne30nOiAnKChcXFxce1teXFxcXH1dKigkfFxcXFx9KSkrKScsXG4gICAgJ1tdJzogJygoXFxcXFtbXlxcXFxdXSooJHxcXFxcXSkpKFxcXFxdW15cXFxcXV0qKCR8XFxcXF0pKSopJyxcbiAgICAnXCJcIic6ICcoKFwiW15cIlxcXFxcXFxcXSooPzpcXFxcXFxcXC5bXlwiXFxcXFxcXFxdKikqKFwifCQpKSspJyxcbiAgICBcIicnXCI6IFwiKCgnW14nXFxcXFxcXFxdKig/OlxcXFxcXFxcLlteJ1xcXFxcXFxcXSopKignfCQpKSspXCIsXG4gICAgXCJOJydcIjogXCIoKE4nW14nXFxcXFxcXFxdKig/OlxcXFxcXFxcLlteJ1xcXFxcXFxcXSopKignfCQpKSspXCIsXG4gICAgXCJVJicnXCI6IFwiKChVJidbXidcXFxcXFxcXF0qKD86XFxcXFxcXFwuW14nXFxcXFxcXFxdKikqKCd8JCkpKylcIixcbiAgICAnVSZcIlwiJzogJygoVSZcIlteXCJcXFxcXFxcXF0qKD86XFxcXFxcXFwuW15cIlxcXFxcXFxcXSopKihcInwkKSkrKScsXG4gICAgJCQ6ICcoKD88dGFnPlxcXFwkXFxcXHcqXFxcXCQpW1xcXFxzXFxcXFNdKj8oPzpcXFxcazx0YWc+fCQpKScsXG4gIH07XG5cbiAgcmV0dXJuIHN0cmluZ1R5cGVzLm1hcCgodCkgPT4gcGF0dGVybnNbdF0pLmpvaW4oJ3wnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhcmVuUmVnZXgocGFyZW5zKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKCdeKCcgKyBwYXJlbnMubWFwKGVzY2FwZVBhcmVuKS5qb2luKCd8JykgKyAnKScsICdpdScpO1xufVxuXG5mdW5jdGlvbiBlc2NhcGVQYXJlbihwYXJlbikge1xuICBpZiAocGFyZW4ubGVuZ3RoID09PSAxKSB7XG4gICAgLy8gQSBzaW5nbGUgcHVuY3R1YXRpb24gY2hhcmFjdGVyXG4gICAgcmV0dXJuIGVzY2FwZVJlZ0V4cChwYXJlbik7XG4gIH0gZWxzZSB7XG4gICAgLy8gbG9uZ2VyIHdvcmRcbiAgICByZXR1cm4gJ1xcXFxiJyArIHBhcmVuICsgJ1xcXFxiJztcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUGxhY2Vob2xkZXJSZWdleCh0eXBlcywgcGF0dGVybikge1xuICBpZiAoaXNFbXB0eSh0eXBlcykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgdHlwZXNSZWdleCA9IHR5cGVzLm1hcChlc2NhcGVSZWdFeHApLmpvaW4oJ3wnKTtcblxuICByZXR1cm4gbmV3IFJlZ0V4cChgXigoPzoke3R5cGVzUmVnZXh9KSg/OiR7cGF0dGVybn0pKWAsICd1Jyk7XG59XG4iLCJpbXBvcnQgdG9rZW5UeXBlcyBmcm9tICcuL3Rva2VuVHlwZXMnO1xuXG5jb25zdCBpc1Rva2VuID0gKHR5cGUsIHJlZ2V4KSA9PiAodG9rZW4pID0+IHRva2VuPy50eXBlID09PSB0eXBlICYmIHJlZ2V4LnRlc3QodG9rZW4/LnZhbHVlKTtcblxuZXhwb3J0IGNvbnN0IGlzQW5kID0gaXNUb2tlbih0b2tlblR5cGVzLlJFU0VSVkVEX05FV0xJTkUsIC9eQU5EJC9pdSk7XG5cbmV4cG9ydCBjb25zdCBpc0JldHdlZW4gPSBpc1Rva2VuKHRva2VuVHlwZXMuUkVTRVJWRUQsIC9eQkVUV0VFTiQvaXUpO1xuXG5leHBvcnQgY29uc3QgaXNMaW1pdCA9IGlzVG9rZW4odG9rZW5UeXBlcy5SRVNFUlZFRF9UT1BfTEVWRUwsIC9eTElNSVQkL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzU2V0ID0gaXNUb2tlbih0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCwgL15TRVQkL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzQnkgPSBpc1Rva2VuKHRva2VuVHlwZXMuUkVTRVJWRUQsIC9eQlkkL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzV2luZG93ID0gaXNUb2tlbih0b2tlblR5cGVzLlJFU0VSVkVEX1RPUF9MRVZFTCwgL15XSU5ET1ckL2l1KTtcblxuZXhwb3J0IGNvbnN0IGlzRW5kID0gaXNUb2tlbih0b2tlblR5cGVzLkNMT1NFX1BBUkVOLCAvXkVORCQvaXUpO1xuIiwiLyoqXG4gKiBDb25zdGFudHMgZm9yIHRva2VuIHR5cGVzXG4gKi9cbmV4cG9ydCBkZWZhdWx0IHtcbiAgV09SRDogJ3dvcmQnLFxuICBTVFJJTkc6ICdzdHJpbmcnLFxuICBSRVNFUlZFRDogJ3Jlc2VydmVkJyxcbiAgUkVTRVJWRURfVE9QX0xFVkVMOiAncmVzZXJ2ZWQtdG9wLWxldmVsJyxcbiAgUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVDogJ3Jlc2VydmVkLXRvcC1sZXZlbC1uby1pbmRlbnQnLFxuICBSRVNFUlZFRF9ORVdMSU5FOiAncmVzZXJ2ZWQtbmV3bGluZScsXG4gIE9QRVJBVE9SOiAnb3BlcmF0b3InLFxuICBPUEVOX1BBUkVOOiAnb3Blbi1wYXJlbicsXG4gIENMT1NFX1BBUkVOOiAnY2xvc2UtcGFyZW4nLFxuICBMSU5FX0NPTU1FTlQ6ICdsaW5lLWNvbW1lbnQnLFxuICBCTE9DS19DT01NRU5UOiAnYmxvY2stY29tbWVudCcsXG4gIE5VTUJFUjogJ251bWJlcicsXG4gIFBMQUNFSE9MREVSOiAncGxhY2Vob2xkZXInLFxufTtcbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBQlMnLFxuICAnQUNUSVZBVEUnLFxuICAnQUxJQVMnLFxuICAnQUxMJyxcbiAgJ0FMTE9DQVRFJyxcbiAgJ0FMTE9XJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOWScsXG4gICdBUkUnLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FTRU5TSVRJVkUnLFxuICAnQVNTT0NJQVRFJyxcbiAgJ0FTVVRJTUUnLFxuICAnQVNZTU1FVFJJQycsXG4gICdBVCcsXG4gICdBVE9NSUMnLFxuICAnQVRUUklCVVRFUycsXG4gICdBVURJVCcsXG4gICdBVVRIT1JJWkFUSU9OJyxcbiAgJ0FVWCcsXG4gICdBVVhJTElBUlknLFxuICAnQVZHJyxcbiAgJ0JFRk9SRScsXG4gICdCRUdJTicsXG4gICdCRVRXRUVOJyxcbiAgJ0JJR0lOVCcsXG4gICdCSU5BUlknLFxuICAnQkxPQicsXG4gICdCT09MRUFOJyxcbiAgJ0JPVEgnLFxuICAnQlVGRkVSUE9PTCcsXG4gICdCWScsXG4gICdDQUNIRScsXG4gICdDQUxMJyxcbiAgJ0NBTExFRCcsXG4gICdDQVBUVVJFJyxcbiAgJ0NBUkRJTkFMSVRZJyxcbiAgJ0NBU0NBREVEJyxcbiAgJ0NBU0UnLFxuICAnQ0FTVCcsXG4gICdDQ1NJRCcsXG4gICdDRUlMJyxcbiAgJ0NFSUxJTkcnLFxuICAnQ0hBUicsXG4gICdDSEFSQUNURVInLFxuICAnQ0hBUkFDVEVSX0xFTkdUSCcsXG4gICdDSEFSX0xFTkdUSCcsXG4gICdDSEVDSycsXG4gICdDTE9CJyxcbiAgJ0NMT05FJyxcbiAgJ0NMT1NFJyxcbiAgJ0NMVVNURVInLFxuICAnQ09BTEVTQ0UnLFxuICAnQ09MTEFURScsXG4gICdDT0xMRUNUJyxcbiAgJ0NPTExFQ1RJT04nLFxuICAnQ09MTElEJyxcbiAgJ0NPTFVNTicsXG4gICdDT01NRU5UJyxcbiAgJ0NPTU1JVCcsXG4gICdDT05DQVQnLFxuICAnQ09ORElUSU9OJyxcbiAgJ0NPTk5FQ1QnLFxuICAnQ09OTkVDVElPTicsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0NPTlRBSU5TJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0NPTlZFUlQnLFxuICAnQ09SUicsXG4gICdDT1JSRVNQT05ESU5HJyxcbiAgJ0NPVU5UJyxcbiAgJ0NPVU5UX0JJRycsXG4gICdDT1ZBUl9QT1AnLFxuICAnQ09WQVJfU0FNUCcsXG4gICdDUkVBVEUnLFxuICAnQ1JPU1MnLFxuICAnQ1VCRScsXG4gICdDVU1FX0RJU1QnLFxuICAnQ1VSUkVOVCcsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9ERUZBVUxUX1RSQU5TRk9STV9HUk9VUCcsXG4gICdDVVJSRU5UX0xDX0NUWVBFJyxcbiAgJ0NVUlJFTlRfUEFUSCcsXG4gICdDVVJSRU5UX1JPTEUnLFxuICAnQ1VSUkVOVF9TQ0hFTUEnLFxuICAnQ1VSUkVOVF9TRVJWRVInLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVElNRVpPTkUnLFxuICAnQ1VSUkVOVF9UUkFOU0ZPUk1fR1JPVVBfRk9SX1RZUEUnLFxuICAnQ1VSUkVOVF9VU0VSJyxcbiAgJ0NVUlNPUicsXG4gICdDWUNMRScsXG4gICdEQVRBJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBVEFQQVJUSVRJT05OQU1FJyxcbiAgJ0RBVEFQQVJUSVRJT05OVU0nLFxuICAnREFURScsXG4gICdEQVknLFxuICAnREFZUycsXG4gICdEQjJHRU5FUkFMJyxcbiAgJ0RCMkdFTlJMJyxcbiAgJ0RCMlNRTCcsXG4gICdEQklORk8nLFxuICAnREJQQVJUSVRJT05OQU1FJyxcbiAgJ0RCUEFSVElUSU9OTlVNJyxcbiAgJ0RFQUxMT0NBVEUnLFxuICAnREVDJyxcbiAgJ0RFQ0lNQUwnLFxuICAnREVDTEFSRScsXG4gICdERUZBVUxUJyxcbiAgJ0RFRkFVTFRTJyxcbiAgJ0RFRklOSVRJT04nLFxuICAnREVMRVRFJyxcbiAgJ0RFTlNFUkFOSycsXG4gICdERU5TRV9SQU5LJyxcbiAgJ0RFUkVGJyxcbiAgJ0RFU0NSSUJFJyxcbiAgJ0RFU0NSSVBUT1InLFxuICAnREVURVJNSU5JU1RJQycsXG4gICdESUFHTk9TVElDUycsXG4gICdESVNBQkxFJyxcbiAgJ0RJU0FMTE9XJyxcbiAgJ0RJU0NPTk5FQ1QnLFxuICAnRElTVElOQ1QnLFxuICAnRE8nLFxuICAnRE9DVU1FTlQnLFxuICAnRE9VQkxFJyxcbiAgJ0RST1AnLFxuICAnRFNTSVpFJyxcbiAgJ0RZTkFNSUMnLFxuICAnRUFDSCcsXG4gICdFRElUUFJPQycsXG4gICdFTEVNRU5UJyxcbiAgJ0VMU0UnLFxuICAnRUxTRUlGJyxcbiAgJ0VOQUJMRScsXG4gICdFTkNPRElORycsXG4gICdFTkNSWVBUSU9OJyxcbiAgJ0VORCcsXG4gICdFTkQtRVhFQycsXG4gICdFTkRJTkcnLFxuICAnRVJBU0UnLFxuICAnRVNDQVBFJyxcbiAgJ0VWRVJZJyxcbiAgJ0VYQ0VQVElPTicsXG4gICdFWENMVURJTkcnLFxuICAnRVhDTFVTSVZFJyxcbiAgJ0VYRUMnLFxuICAnRVhFQ1VURScsXG4gICdFWElTVFMnLFxuICAnRVhJVCcsXG4gICdFWFAnLFxuICAnRVhQTEFJTicsXG4gICdFWFRFTkRFRCcsXG4gICdFWFRFUk5BTCcsXG4gICdFWFRSQUNUJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZFTkNFRCcsXG4gICdGRVRDSCcsXG4gICdGSUVMRFBST0MnLFxuICAnRklMRScsXG4gICdGSUxURVInLFxuICAnRklOQUwnLFxuICAnRklSU1QnLFxuICAnRkxPQVQnLFxuICAnRkxPT1InLFxuICAnRk9SJyxcbiAgJ0ZPUkVJR04nLFxuICAnRlJFRScsXG4gICdGVUxMJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0ZVU0lPTicsXG4gICdHRU5FUkFMJyxcbiAgJ0dFTkVSQVRFRCcsXG4gICdHRVQnLFxuICAnR0xPQkFMJyxcbiAgJ0dPVE8nLFxuICAnR1JBTlQnLFxuICAnR1JBUEhJQycsXG4gICdHUk9VUCcsXG4gICdHUk9VUElORycsXG4gICdIQU5ETEVSJyxcbiAgJ0hBU0gnLFxuICAnSEFTSEVEX1ZBTFVFJyxcbiAgJ0hJTlQnLFxuICAnSE9MRCcsXG4gICdIT1VSJyxcbiAgJ0hPVVJTJyxcbiAgJ0lERU5USVRZJyxcbiAgJ0lGJyxcbiAgJ0lNTUVESUFURScsXG4gICdJTicsXG4gICdJTkNMVURJTkcnLFxuICAnSU5DTFVTSVZFJyxcbiAgJ0lOQ1JFTUVOVCcsXG4gICdJTkRFWCcsXG4gICdJTkRJQ0FUT1InLFxuICAnSU5ESUNBVE9SUycsXG4gICdJTkYnLFxuICAnSU5GSU5JVFknLFxuICAnSU5IRVJJVCcsXG4gICdJTk5FUicsXG4gICdJTk9VVCcsXG4gICdJTlNFTlNJVElWRScsXG4gICdJTlNFUlQnLFxuICAnSU5UJyxcbiAgJ0lOVEVHRVInLFxuICAnSU5URUdSSVRZJyxcbiAgJ0lOVEVSU0VDVElPTicsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lTJyxcbiAgJ0lTT0JJRCcsXG4gICdJU09MQVRJT04nLFxuICAnSVRFUkFURScsXG4gICdKQVInLFxuICAnSkFWQScsXG4gICdLRUVQJyxcbiAgJ0tFWScsXG4gICdMQUJFTCcsXG4gICdMQU5HVUFHRScsXG4gICdMQVJHRScsXG4gICdMQVRFUkFMJyxcbiAgJ0xDX0NUWVBFJyxcbiAgJ0xFQURJTkcnLFxuICAnTEVBVkUnLFxuICAnTEVGVCcsXG4gICdMSUtFJyxcbiAgJ0xJTktUWVBFJyxcbiAgJ0xOJyxcbiAgJ0xPQ0FMJyxcbiAgJ0xPQ0FMREFURScsXG4gICdMT0NBTEUnLFxuICAnTE9DQUxUSU1FJyxcbiAgJ0xPQ0FMVElNRVNUQU1QJyxcbiAgJ0xPQ0FUT1InLFxuICAnTE9DQVRPUlMnLFxuICAnTE9DSycsXG4gICdMT0NLTUFYJyxcbiAgJ0xPQ0tTSVpFJyxcbiAgJ0xPTkcnLFxuICAnTE9PUCcsXG4gICdMT1dFUicsXG4gICdNQUlOVEFJTkVEJyxcbiAgJ01BVENIJyxcbiAgJ01BVEVSSUFMSVpFRCcsXG4gICdNQVgnLFxuICAnTUFYVkFMVUUnLFxuICAnTUVNQkVSJyxcbiAgJ01FUkdFJyxcbiAgJ01FVEhPRCcsXG4gICdNSUNST1NFQ09ORCcsXG4gICdNSUNST1NFQ09ORFMnLFxuICAnTUlOJyxcbiAgJ01JTlVURScsXG4gICdNSU5VVEVTJyxcbiAgJ01JTlZBTFVFJyxcbiAgJ01PRCcsXG4gICdNT0RFJyxcbiAgJ01PRElGSUVTJyxcbiAgJ01PRFVMRScsXG4gICdNT05USCcsXG4gICdNT05USFMnLFxuICAnTVVMVElTRVQnLFxuICAnTkFOJyxcbiAgJ05BVElPTkFMJyxcbiAgJ05BVFVSQUwnLFxuICAnTkNIQVInLFxuICAnTkNMT0InLFxuICAnTkVXJyxcbiAgJ05FV19UQUJMRScsXG4gICdORVhUVkFMJyxcbiAgJ05PJyxcbiAgJ05PQ0FDSEUnLFxuICAnTk9DWUNMRScsXG4gICdOT0RFTkFNRScsXG4gICdOT0RFTlVNQkVSJyxcbiAgJ05PTUFYVkFMVUUnLFxuICAnTk9NSU5WQUxVRScsXG4gICdOT05FJyxcbiAgJ05PT1JERVInLFxuICAnTk9STUFMSVpFJyxcbiAgJ05PUk1BTElaRUQnLFxuICAnTk9UJyxcbiAgJ05VTEwnLFxuICAnTlVMTElGJyxcbiAgJ05VTExTJyxcbiAgJ05VTUVSSUMnLFxuICAnTlVNUEFSVFMnLFxuICAnT0JJRCcsXG4gICdPQ1RFVF9MRU5HVEgnLFxuICAnT0YnLFxuICAnT0ZGU0VUJyxcbiAgJ09MRCcsXG4gICdPTERfVEFCTEUnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEVOJyxcbiAgJ09QVElNSVpBVElPTicsXG4gICdPUFRJTUlaRScsXG4gICdPUFRJT04nLFxuICAnT1JERVInLFxuICAnT1VUJyxcbiAgJ09VVEVSJyxcbiAgJ09WRVInLFxuICAnT1ZFUkxBUFMnLFxuICAnT1ZFUkxBWScsXG4gICdPVkVSUklESU5HJyxcbiAgJ1BBQ0tBR0UnLFxuICAnUEFEREVEJyxcbiAgJ1BBR0VTSVpFJyxcbiAgJ1BBUkFNRVRFUicsXG4gICdQQVJUJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQQVJUSVRJT05FRCcsXG4gICdQQVJUSVRJT05JTkcnLFxuICAnUEFSVElUSU9OUycsXG4gICdQQVNTV09SRCcsXG4gICdQQVRIJyxcbiAgJ1BFUkNFTlRJTEVfQ09OVCcsXG4gICdQRVJDRU5USUxFX0RJU0MnLFxuICAnUEVSQ0VOVF9SQU5LJyxcbiAgJ1BJRUNFU0laRScsXG4gICdQTEFOJyxcbiAgJ1BPU0lUSU9OJyxcbiAgJ1BPV0VSJyxcbiAgJ1BSRUNJU0lPTicsXG4gICdQUkVQQVJFJyxcbiAgJ1BSRVZWQUwnLFxuICAnUFJJTUFSWScsXG4gICdQUklRVFknLFxuICAnUFJJVklMRUdFUycsXG4gICdQUk9DRURVUkUnLFxuICAnUFJPR1JBTScsXG4gICdQU0lEJyxcbiAgJ1BVQkxJQycsXG4gICdRVUVSWScsXG4gICdRVUVSWU5PJyxcbiAgJ1JBTkdFJyxcbiAgJ1JBTksnLFxuICAnUkVBRCcsXG4gICdSRUFEUycsXG4gICdSRUFMJyxcbiAgJ1JFQ09WRVJZJyxcbiAgJ1JFQ1VSU0lWRScsXG4gICdSRUYnLFxuICAnUkVGRVJFTkNFUycsXG4gICdSRUZFUkVOQ0lORycsXG4gICdSRUZSRVNIJyxcbiAgJ1JFR1JfQVZHWCcsXG4gICdSRUdSX0FWR1knLFxuICAnUkVHUl9DT1VOVCcsXG4gICdSRUdSX0lOVEVSQ0VQVCcsXG4gICdSRUdSX1IyJyxcbiAgJ1JFR1JfU0xPUEUnLFxuICAnUkVHUl9TWFgnLFxuICAnUkVHUl9TWFknLFxuICAnUkVHUl9TWVknLFxuICAnUkVMRUFTRScsXG4gICdSRU5BTUUnLFxuICAnUkVQRUFUJyxcbiAgJ1JFU0VUJyxcbiAgJ1JFU0lHTkFMJyxcbiAgJ1JFU1RBUlQnLFxuICAnUkVTVFJJQ1QnLFxuICAnUkVTVUxUJyxcbiAgJ1JFU1VMVF9TRVRfTE9DQVRPUicsXG4gICdSRVRVUk4nLFxuICAnUkVUVVJOUycsXG4gICdSRVZPS0UnLFxuICAnUklHSFQnLFxuICAnUk9MRScsXG4gICdST0xMQkFDSycsXG4gICdST0xMVVAnLFxuICAnUk9VTkRfQ0VJTElORycsXG4gICdST1VORF9ET1dOJyxcbiAgJ1JPVU5EX0ZMT09SJyxcbiAgJ1JPVU5EX0hBTEZfRE9XTicsXG4gICdST1VORF9IQUxGX0VWRU4nLFxuICAnUk9VTkRfSEFMRl9VUCcsXG4gICdST1VORF9VUCcsXG4gICdST1VUSU5FJyxcbiAgJ1JPVycsXG4gICdST1dOVU1CRVInLFxuICAnUk9XUycsXG4gICdST1dTRVQnLFxuICAnUk9XX05VTUJFUicsXG4gICdSUk4nLFxuICAnUlVOJyxcbiAgJ1NBVkVQT0lOVCcsXG4gICdTQ0hFTUEnLFxuICAnU0NPUEUnLFxuICAnU0NSQVRDSFBBRCcsXG4gICdTQ1JPTEwnLFxuICAnU0VBUkNIJyxcbiAgJ1NFQ09ORCcsXG4gICdTRUNPTkRTJyxcbiAgJ1NFQ1FUWScsXG4gICdTRUNVUklUWScsXG4gICdTRU5TSVRJVkUnLFxuICAnU0VRVUVOQ0UnLFxuICAnU0VTU0lPTicsXG4gICdTRVNTSU9OX1VTRVInLFxuICAnU0lHTkFMJyxcbiAgJ1NJTUlMQVInLFxuICAnU0lNUExFJyxcbiAgJ1NNQUxMSU5UJyxcbiAgJ1NOQU4nLFxuICAnU09NRScsXG4gICdTT1VSQ0UnLFxuICAnU1BFQ0lGSUMnLFxuICAnU1BFQ0lGSUNUWVBFJyxcbiAgJ1NRTCcsXG4gICdTUUxFWENFUFRJT04nLFxuICAnU1FMSUQnLFxuICAnU1FMU1RBVEUnLFxuICAnU1FMV0FSTklORycsXG4gICdTUVJUJyxcbiAgJ1NUQUNLRUQnLFxuICAnU1RBTkRBUkQnLFxuICAnU1RBUlQnLFxuICAnU1RBUlRJTkcnLFxuICAnU1RBVEVNRU5UJyxcbiAgJ1NUQVRJQycsXG4gICdTVEFUTUVOVCcsXG4gICdTVEFZJyxcbiAgJ1NURERFVl9QT1AnLFxuICAnU1REREVWX1NBTVAnLFxuICAnU1RPR1JPVVAnLFxuICAnU1RPUkVTJyxcbiAgJ1NUWUxFJyxcbiAgJ1NVQk1VTFRJU0VUJyxcbiAgJ1NVQlNUUklORycsXG4gICdTVU0nLFxuICAnU1VNTUFSWScsXG4gICdTWU1NRVRSSUMnLFxuICAnU1lOT05ZTScsXG4gICdTWVNGVU4nLFxuICAnU1lTSUJNJyxcbiAgJ1NZU1BST0MnLFxuICAnU1lTVEVNJyxcbiAgJ1NZU1RFTV9VU0VSJyxcbiAgJ1RBQkxFJyxcbiAgJ1RBQkxFU0FNUExFJyxcbiAgJ1RBQkxFU1BBQ0UnLFxuICAnVEhFTicsXG4gICdUSU1FJyxcbiAgJ1RJTUVTVEFNUCcsXG4gICdUSU1FWk9ORV9IT1VSJyxcbiAgJ1RJTUVaT05FX01JTlVURScsXG4gICdUTycsXG4gICdUUkFJTElORycsXG4gICdUUkFOU0FDVElPTicsXG4gICdUUkFOU0xBVEUnLFxuICAnVFJBTlNMQVRJT04nLFxuICAnVFJFQVQnLFxuICAnVFJJR0dFUicsXG4gICdUUklNJyxcbiAgJ1RSVUUnLFxuICAnVFJVTkNBVEUnLFxuICAnVFlQRScsXG4gICdVRVNDQVBFJyxcbiAgJ1VORE8nLFxuICAnVU5JUVVFJyxcbiAgJ1VOS05PV04nLFxuICAnVU5ORVNUJyxcbiAgJ1VOVElMJyxcbiAgJ1VQUEVSJyxcbiAgJ1VTQUdFJyxcbiAgJ1VTRVInLFxuICAnVVNJTkcnLFxuICAnVkFMSURQUk9DJyxcbiAgJ1ZBTFVFJyxcbiAgJ1ZBUkNIQVInLFxuICAnVkFSSUFCTEUnLFxuICAnVkFSSUFOVCcsXG4gICdWQVJZSU5HJyxcbiAgJ1ZBUl9QT1AnLFxuICAnVkFSX1NBTVAnLFxuICAnVkNBVCcsXG4gICdWRVJTSU9OJyxcbiAgJ1ZJRVcnLFxuICAnVk9MQVRJTEUnLFxuICAnVk9MVU1FUycsXG4gICdXSEVOJyxcbiAgJ1dIRU5FVkVSJyxcbiAgJ1dISUxFJyxcbiAgJ1dJRFRIX0JVQ0tFVCcsXG4gICdXSU5ET1cnLFxuICAnV0lUSCcsXG4gICdXSVRISU4nLFxuICAnV0lUSE9VVCcsXG4gICdXTE0nLFxuICAnV1JJVEUnLFxuICAnWE1MRUxFTUVOVCcsXG4gICdYTUxFWElTVFMnLFxuICAnWE1MTkFNRVNQQUNFUycsXG4gICdZRUFSJyxcbiAgJ1lFQVJTJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBRlRFUicsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnREVMRVRFIEZST00nLFxuICAnRVhDRVBUJyxcbiAgJ0ZFVENIIEZJUlNUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnR08nLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdMSU1JVCcsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ01JTlVTJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdPUicsXG4gIC8vIGpvaW5zXG4gICdKT0lOJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnRlVMTCBKT0lOJyxcbiAgJ0ZVTEwgT1VURVIgSk9JTicsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ05BVFVSQUwgSk9JTicsXG5dO1xuXG4vLyBGb3IgcmVmZXJlbmNlOiBodHRwczovL3d3dy5pYm0uY29tL3N1cHBvcnQva25vd2xlZGdlY2VudGVyL2VuL3Nzd19pYm1faV83Mi9kYjIvcmJhZnppbnRyby5odG1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERiMkZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsICdgYCcsICdbXSddLFxuICAgICAgb3BlblBhcmVuczogWycoJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnOiddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLSddLFxuICAgICAgc3BlY2lhbFdvcmRDaGFyczogWycjJywgJ0AnXSxcbiAgICAgIG9wZXJhdG9yczogWycqKicsICchPScsICchPicsICchPicsICd8fCddLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gW1xuICAnQUNDRVNTSUJMRScsXG4gICdBREQnLFxuICAnQUxMJyxcbiAgJ0FMVEVSJyxcbiAgJ0FOQUxZWkUnLFxuICAnQU5EJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdBU0VOU0lUSVZFJyxcbiAgJ0JFRk9SRScsXG4gICdCRVRXRUVOJyxcbiAgJ0JJR0lOVCcsXG4gICdCSU5BUlknLFxuICAnQkxPQicsXG4gICdCT1RIJyxcbiAgJ0JZJyxcbiAgJ0NBTEwnLFxuICAnQ0FTQ0FERScsXG4gICdDQVNFJyxcbiAgJ0NIQU5HRScsXG4gICdDSEFSJyxcbiAgJ0NIQVJBQ1RFUicsXG4gICdDSEVDSycsXG4gICdDT0xMQVRFJyxcbiAgJ0NPTFVNTicsXG4gICdDT05ESVRJT04nLFxuICAnQ09OU1RSQUlOVCcsXG4gICdDT05USU5VRScsXG4gICdDT05WRVJUJyxcbiAgJ0NSRUFURScsXG4gICdDUk9TUycsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9ST0xFJyxcbiAgJ0NVUlJFTlRfVElNRScsXG4gICdDVVJSRU5UX1RJTUVTVEFNUCcsXG4gICdDVVJSRU5UX1VTRVInLFxuICAnQ1VSU09SJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBVEFCQVNFUycsXG4gICdEQVlfSE9VUicsXG4gICdEQVlfTUlDUk9TRUNPTkQnLFxuICAnREFZX01JTlVURScsXG4gICdEQVlfU0VDT05EJyxcbiAgJ0RFQycsXG4gICdERUNJTUFMJyxcbiAgJ0RFQ0xBUkUnLFxuICAnREVGQVVMVCcsXG4gICdERUxBWUVEJyxcbiAgJ0RFTEVURScsXG4gICdERVNDJyxcbiAgJ0RFU0NSSUJFJyxcbiAgJ0RFVEVSTUlOSVNUSUMnLFxuICAnRElTVElOQ1QnLFxuICAnRElTVElOQ1RST1cnLFxuICAnRElWJyxcbiAgJ0RPX0RPTUFJTl9JRFMnLFxuICAnRE9VQkxFJyxcbiAgJ0RST1AnLFxuICAnRFVBTCcsXG4gICdFQUNIJyxcbiAgJ0VMU0UnLFxuICAnRUxTRUlGJyxcbiAgJ0VOQ0xPU0VEJyxcbiAgJ0VTQ0FQRUQnLFxuICAnRVhDRVBUJyxcbiAgJ0VYSVNUUycsXG4gICdFWElUJyxcbiAgJ0VYUExBSU4nLFxuICAnRkFMU0UnLFxuICAnRkVUQ0gnLFxuICAnRkxPQVQnLFxuICAnRkxPQVQ0JyxcbiAgJ0ZMT0FUOCcsXG4gICdGT1InLFxuICAnRk9SQ0UnLFxuICAnRk9SRUlHTicsXG4gICdGUk9NJyxcbiAgJ0ZVTExURVhUJyxcbiAgJ0dFTkVSQUwnLFxuICAnR1JBTlQnLFxuICAnR1JPVVAnLFxuICAnSEFWSU5HJyxcbiAgJ0hJR0hfUFJJT1JJVFknLFxuICAnSE9VUl9NSUNST1NFQ09ORCcsXG4gICdIT1VSX01JTlVURScsXG4gICdIT1VSX1NFQ09ORCcsXG4gICdJRicsXG4gICdJR05PUkUnLFxuICAnSUdOT1JFX0RPTUFJTl9JRFMnLFxuICAnSUdOT1JFX1NFUlZFUl9JRFMnLFxuICAnSU4nLFxuICAnSU5ERVgnLFxuICAnSU5GSUxFJyxcbiAgJ0lOTkVSJyxcbiAgJ0lOT1VUJyxcbiAgJ0lOU0VOU0lUSVZFJyxcbiAgJ0lOU0VSVCcsXG4gICdJTlQnLFxuICAnSU5UMScsXG4gICdJTlQyJyxcbiAgJ0lOVDMnLFxuICAnSU5UNCcsXG4gICdJTlQ4JyxcbiAgJ0lOVEVHRVInLFxuICAnSU5URVJTRUNUJyxcbiAgJ0lOVEVSVkFMJyxcbiAgJ0lOVE8nLFxuICAnSVMnLFxuICAnSVRFUkFURScsXG4gICdKT0lOJyxcbiAgJ0tFWScsXG4gICdLRVlTJyxcbiAgJ0tJTEwnLFxuICAnTEVBRElORycsXG4gICdMRUFWRScsXG4gICdMRUZUJyxcbiAgJ0xJS0UnLFxuICAnTElNSVQnLFxuICAnTElORUFSJyxcbiAgJ0xJTkVTJyxcbiAgJ0xPQUQnLFxuICAnTE9DQUxUSU1FJyxcbiAgJ0xPQ0FMVElNRVNUQU1QJyxcbiAgJ0xPQ0snLFxuICAnTE9ORycsXG4gICdMT05HQkxPQicsXG4gICdMT05HVEVYVCcsXG4gICdMT09QJyxcbiAgJ0xPV19QUklPUklUWScsXG4gICdNQVNURVJfSEVBUlRCRUFUX1BFUklPRCcsXG4gICdNQVNURVJfU1NMX1ZFUklGWV9TRVJWRVJfQ0VSVCcsXG4gICdNQVRDSCcsXG4gICdNQVhWQUxVRScsXG4gICdNRURJVU1CTE9CJyxcbiAgJ01FRElVTUlOVCcsXG4gICdNRURJVU1URVhUJyxcbiAgJ01JRERMRUlOVCcsXG4gICdNSU5VVEVfTUlDUk9TRUNPTkQnLFxuICAnTUlOVVRFX1NFQ09ORCcsXG4gICdNT0QnLFxuICAnTU9ESUZJRVMnLFxuICAnTkFUVVJBTCcsXG4gICdOT1QnLFxuICAnTk9fV1JJVEVfVE9fQklOTE9HJyxcbiAgJ05VTEwnLFxuICAnTlVNRVJJQycsXG4gICdPTicsXG4gICdPUFRJTUlaRScsXG4gICdPUFRJT04nLFxuICAnT1BUSU9OQUxMWScsXG4gICdPUicsXG4gICdPUkRFUicsXG4gICdPVVQnLFxuICAnT1VURVInLFxuICAnT1VURklMRScsXG4gICdPVkVSJyxcbiAgJ1BBR0VfQ0hFQ0tTVU0nLFxuICAnUEFSU0VfVkNPTF9FWFBSJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQT1NJVElPTicsXG4gICdQUkVDSVNJT04nLFxuICAnUFJJTUFSWScsXG4gICdQUk9DRURVUkUnLFxuICAnUFVSR0UnLFxuICAnUkFOR0UnLFxuICAnUkVBRCcsXG4gICdSRUFEUycsXG4gICdSRUFEX1dSSVRFJyxcbiAgJ1JFQUwnLFxuICAnUkVDVVJTSVZFJyxcbiAgJ1JFRl9TWVNURU1fSUQnLFxuICAnUkVGRVJFTkNFUycsXG4gICdSRUdFWFAnLFxuICAnUkVMRUFTRScsXG4gICdSRU5BTUUnLFxuICAnUkVQRUFUJyxcbiAgJ1JFUExBQ0UnLFxuICAnUkVRVUlSRScsXG4gICdSRVNJR05BTCcsXG4gICdSRVNUUklDVCcsXG4gICdSRVRVUk4nLFxuICAnUkVUVVJOSU5HJyxcbiAgJ1JFVk9LRScsXG4gICdSSUdIVCcsXG4gICdSTElLRScsXG4gICdST1dTJyxcbiAgJ1NDSEVNQScsXG4gICdTQ0hFTUFTJyxcbiAgJ1NFQ09ORF9NSUNST1NFQ09ORCcsXG4gICdTRUxFQ1QnLFxuICAnU0VOU0lUSVZFJyxcbiAgJ1NFUEFSQVRPUicsXG4gICdTRVQnLFxuICAnU0hPVycsXG4gICdTSUdOQUwnLFxuICAnU0xPVycsXG4gICdTTUFMTElOVCcsXG4gICdTUEFUSUFMJyxcbiAgJ1NQRUNJRklDJyxcbiAgJ1NRTCcsXG4gICdTUUxFWENFUFRJT04nLFxuICAnU1FMU1RBVEUnLFxuICAnU1FMV0FSTklORycsXG4gICdTUUxfQklHX1JFU1VMVCcsXG4gICdTUUxfQ0FMQ19GT1VORF9ST1dTJyxcbiAgJ1NRTF9TTUFMTF9SRVNVTFQnLFxuICAnU1NMJyxcbiAgJ1NUQVJUSU5HJyxcbiAgJ1NUQVRTX0FVVE9fUkVDQUxDJyxcbiAgJ1NUQVRTX1BFUlNJU1RFTlQnLFxuICAnU1RBVFNfU0FNUExFX1BBR0VTJyxcbiAgJ1NUUkFJR0hUX0pPSU4nLFxuICAnVEFCTEUnLFxuICAnVEVSTUlOQVRFRCcsXG4gICdUSEVOJyxcbiAgJ1RJTllCTE9CJyxcbiAgJ1RJTllJTlQnLFxuICAnVElOWVRFWFQnLFxuICAnVE8nLFxuICAnVFJBSUxJTkcnLFxuICAnVFJJR0dFUicsXG4gICdUUlVFJyxcbiAgJ1VORE8nLFxuICAnVU5JT04nLFxuICAnVU5JUVVFJyxcbiAgJ1VOTE9DSycsXG4gICdVTlNJR05FRCcsXG4gICdVUERBVEUnLFxuICAnVVNBR0UnLFxuICAnVVNFJyxcbiAgJ1VTSU5HJyxcbiAgJ1VUQ19EQVRFJyxcbiAgJ1VUQ19USU1FJyxcbiAgJ1VUQ19USU1FU1RBTVAnLFxuICAnVkFMVUVTJyxcbiAgJ1ZBUkJJTkFSWScsXG4gICdWQVJDSEFSJyxcbiAgJ1ZBUkNIQVJBQ1RFUicsXG4gICdWQVJZSU5HJyxcbiAgJ1dIRU4nLFxuICAnV0hFUkUnLFxuICAnV0hJTEUnLFxuICAnV0lORE9XJyxcbiAgJ1dJVEgnLFxuICAnV1JJVEUnLFxuICAnWE9SJyxcbiAgJ1lFQVJfTU9OVEgnLFxuICAnWkVST0ZJTEwnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdERUxFVEUgRlJPTScsXG4gICdFWENFUFQnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5TRVJUJyxcbiAgJ0xJTUlUJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQnLFxuICAnVVBEQVRFJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFsnSU5URVJTRUNUJywgJ0lOVEVSU0VDVCBBTEwnLCAnVU5JT04nLCAnVU5JT04gQUxMJ107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0VMU0UnLFxuICAnT1InLFxuICAnV0hFTicsXG4gIC8vIGpvaW5zXG4gICdKT0lOJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnQ1JPU1MgSk9JTicsXG4gICdOQVRVUkFMIEpPSU4nLFxuICAvLyBub24tc3RhbmRhcmQgam9pbnNcbiAgJ1NUUkFJR0hUX0pPSU4nLFxuICAnTkFUVVJBTCBMRUZUIEpPSU4nLFxuICAnTkFUVVJBTCBMRUZUIE9VVEVSIEpPSU4nLFxuICAnTkFUVVJBTCBSSUdIVCBKT0lOJyxcbiAgJ05BVFVSQUwgUklHSFQgT1VURVIgSk9JTicsXG5dO1xuXG4vLyBGb3IgcmVmZXJlbmNlOiBodHRwczovL21hcmlhZGIuY29tL2tiL2VuL3NxbC1zdGF0ZW1lbnRzLXN0cnVjdHVyZS9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcmlhRGJGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogWydgYCcsIFwiJydcIiwgJ1wiXCInXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nLCAnIyddLFxuICAgICAgc3BlY2lhbFdvcmRDaGFyczogWydAJ10sXG4gICAgICBvcGVyYXRvcnM6IFsnOj0nLCAnPDwnLCAnPj4nLCAnIT0nLCAnPD4nLCAnPD0+JywgJyYmJywgJ3x8J10sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBQ0NFU1NJQkxFJyxcbiAgJ0FERCcsXG4gICdBTEwnLFxuICAnQUxURVInLFxuICAnQU5BTFlaRScsXG4gICdBTkQnLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FTRU5TSVRJVkUnLFxuICAnQkVGT1JFJyxcbiAgJ0JFVFdFRU4nLFxuICAnQklHSU5UJyxcbiAgJ0JJTkFSWScsXG4gICdCTE9CJyxcbiAgJ0JPVEgnLFxuICAnQlknLFxuICAnQ0FMTCcsXG4gICdDQVNDQURFJyxcbiAgJ0NBU0UnLFxuICAnQ0hBTkdFJyxcbiAgJ0NIQVInLFxuICAnQ0hBUkFDVEVSJyxcbiAgJ0NIRUNLJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MVU1OJyxcbiAgJ0NPTkRJVElPTicsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0NPTlRJTlVFJyxcbiAgJ0NPTlZFUlQnLFxuICAnQ1JFQVRFJyxcbiAgJ0NST1NTJyxcbiAgJ0NVQkUnLFxuICAnQ1VNRV9ESVNUJyxcbiAgJ0NVUlJFTlRfREFURScsXG4gICdDVVJSRU5UX1RJTUUnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnQ1VSUkVOVF9VU0VSJyxcbiAgJ0NVUlNPUicsXG4gICdEQVRBQkFTRScsXG4gICdEQVRBQkFTRVMnLFxuICAnREFZX0hPVVInLFxuICAnREFZX01JQ1JPU0VDT05EJyxcbiAgJ0RBWV9NSU5VVEUnLFxuICAnREFZX1NFQ09ORCcsXG4gICdERUMnLFxuICAnREVDSU1BTCcsXG4gICdERUNMQVJFJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVMQVlFRCcsXG4gICdERUxFVEUnLFxuICAnREVOU0VfUkFOSycsXG4gICdERVNDJyxcbiAgJ0RFU0NSSUJFJyxcbiAgJ0RFVEVSTUlOSVNUSUMnLFxuICAnRElTVElOQ1QnLFxuICAnRElTVElOQ1RST1cnLFxuICAnRElWJyxcbiAgJ0RPVUJMRScsXG4gICdEUk9QJyxcbiAgJ0RVQUwnLFxuICAnRUFDSCcsXG4gICdFTFNFJyxcbiAgJ0VMU0VJRicsXG4gICdFTVBUWScsXG4gICdFTkNMT1NFRCcsXG4gICdFU0NBUEVEJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWElTVFMnLFxuICAnRVhJVCcsXG4gICdFWFBMQUlOJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZFVENIJyxcbiAgJ0ZJUlNUX1ZBTFVFJyxcbiAgJ0ZMT0FUJyxcbiAgJ0ZMT0FUNCcsXG4gICdGTE9BVDgnLFxuICAnRk9SJyxcbiAgJ0ZPUkNFJyxcbiAgJ0ZPUkVJR04nLFxuICAnRlJPTScsXG4gICdGVUxMVEVYVCcsXG4gICdGVU5DVElPTicsXG4gICdHRU5FUkFURUQnLFxuICAnR0VUJyxcbiAgJ0dSQU5UJyxcbiAgJ0dST1VQJyxcbiAgJ0dST1VQSU5HJyxcbiAgJ0dST1VQUycsXG4gICdIQVZJTkcnLFxuICAnSElHSF9QUklPUklUWScsXG4gICdIT1VSX01JQ1JPU0VDT05EJyxcbiAgJ0hPVVJfTUlOVVRFJyxcbiAgJ0hPVVJfU0VDT05EJyxcbiAgJ0lGJyxcbiAgJ0lHTk9SRScsXG4gICdJTicsXG4gICdJTkRFWCcsXG4gICdJTkZJTEUnLFxuICAnSU5ORVInLFxuICAnSU5PVVQnLFxuICAnSU5TRU5TSVRJVkUnLFxuICAnSU5TRVJUJyxcbiAgJ0lOVCcsXG4gICdJTlQxJyxcbiAgJ0lOVDInLFxuICAnSU5UMycsXG4gICdJTlQ0JyxcbiAgJ0lOVDgnLFxuICAnSU5URUdFUicsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lPX0FGVEVSX0dUSURTJyxcbiAgJ0lPX0JFRk9SRV9HVElEUycsXG4gICdJUycsXG4gICdJVEVSQVRFJyxcbiAgJ0pPSU4nLFxuICAnSlNPTl9UQUJMRScsXG4gICdLRVknLFxuICAnS0VZUycsXG4gICdLSUxMJyxcbiAgJ0xBRycsXG4gICdMQVNUX1ZBTFVFJyxcbiAgJ0xBVEVSQUwnLFxuICAnTEVBRCcsXG4gICdMRUFESU5HJyxcbiAgJ0xFQVZFJyxcbiAgJ0xFRlQnLFxuICAnTElLRScsXG4gICdMSU1JVCcsXG4gICdMSU5FQVInLFxuICAnTElORVMnLFxuICAnTE9BRCcsXG4gICdMT0NBTFRJTUUnLFxuICAnTE9DQUxUSU1FU1RBTVAnLFxuICAnTE9DSycsXG4gICdMT05HJyxcbiAgJ0xPTkdCTE9CJyxcbiAgJ0xPTkdURVhUJyxcbiAgJ0xPT1AnLFxuICAnTE9XX1BSSU9SSVRZJyxcbiAgJ01BU1RFUl9CSU5EJyxcbiAgJ01BU1RFUl9TU0xfVkVSSUZZX1NFUlZFUl9DRVJUJyxcbiAgJ01BVENIJyxcbiAgJ01BWFZBTFVFJyxcbiAgJ01FRElVTUJMT0InLFxuICAnTUVESVVNSU5UJyxcbiAgJ01FRElVTVRFWFQnLFxuICAnTUlERExFSU5UJyxcbiAgJ01JTlVURV9NSUNST1NFQ09ORCcsXG4gICdNSU5VVEVfU0VDT05EJyxcbiAgJ01PRCcsXG4gICdNT0RJRklFUycsXG4gICdOQVRVUkFMJyxcbiAgJ05PVCcsXG4gICdOT19XUklURV9UT19CSU5MT0cnLFxuICAnTlRIX1ZBTFVFJyxcbiAgJ05USUxFJyxcbiAgJ05VTEwnLFxuICAnTlVNRVJJQycsXG4gICdPRicsXG4gICdPTicsXG4gICdPUFRJTUlaRScsXG4gICdPUFRJTUlaRVJfQ09TVFMnLFxuICAnT1BUSU9OJyxcbiAgJ09QVElPTkFMTFknLFxuICAnT1InLFxuICAnT1JERVInLFxuICAnT1VUJyxcbiAgJ09VVEVSJyxcbiAgJ09VVEZJTEUnLFxuICAnT1ZFUicsXG4gICdQQVJUSVRJT04nLFxuICAnUEVSQ0VOVF9SQU5LJyxcbiAgJ1BSRUNJU0lPTicsXG4gICdQUklNQVJZJyxcbiAgJ1BST0NFRFVSRScsXG4gICdQVVJHRScsXG4gICdSQU5HRScsXG4gICdSQU5LJyxcbiAgJ1JFQUQnLFxuICAnUkVBRFMnLFxuICAnUkVBRF9XUklURScsXG4gICdSRUFMJyxcbiAgJ1JFQ1VSU0lWRScsXG4gICdSRUZFUkVOQ0VTJyxcbiAgJ1JFR0VYUCcsXG4gICdSRUxFQVNFJyxcbiAgJ1JFTkFNRScsXG4gICdSRVBFQVQnLFxuICAnUkVQTEFDRScsXG4gICdSRVFVSVJFJyxcbiAgJ1JFU0lHTkFMJyxcbiAgJ1JFU1RSSUNUJyxcbiAgJ1JFVFVSTicsXG4gICdSRVZPS0UnLFxuICAnUklHSFQnLFxuICAnUkxJS0UnLFxuICAnUk9XJyxcbiAgJ1JPV1MnLFxuICAnUk9XX05VTUJFUicsXG4gICdTQ0hFTUEnLFxuICAnU0NIRU1BUycsXG4gICdTRUNPTkRfTUlDUk9TRUNPTkQnLFxuICAnU0VMRUNUJyxcbiAgJ1NFTlNJVElWRScsXG4gICdTRVBBUkFUT1InLFxuICAnU0VUJyxcbiAgJ1NIT1cnLFxuICAnU0lHTkFMJyxcbiAgJ1NNQUxMSU5UJyxcbiAgJ1NQQVRJQUwnLFxuICAnU1BFQ0lGSUMnLFxuICAnU1FMJyxcbiAgJ1NRTEVYQ0VQVElPTicsXG4gICdTUUxTVEFURScsXG4gICdTUUxXQVJOSU5HJyxcbiAgJ1NRTF9CSUdfUkVTVUxUJyxcbiAgJ1NRTF9DQUxDX0ZPVU5EX1JPV1MnLFxuICAnU1FMX1NNQUxMX1JFU1VMVCcsXG4gICdTU0wnLFxuICAnU1RBUlRJTkcnLFxuICAnU1RPUkVEJyxcbiAgJ1NUUkFJR0hUX0pPSU4nLFxuICAnU1lTVEVNJyxcbiAgJ1RBQkxFJyxcbiAgJ1RFUk1JTkFURUQnLFxuICAnVEhFTicsXG4gICdUSU5ZQkxPQicsXG4gICdUSU5ZSU5UJyxcbiAgJ1RJTllURVhUJyxcbiAgJ1RPJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSSUdHRVInLFxuICAnVFJVRScsXG4gICdVTkRPJyxcbiAgJ1VOSU9OJyxcbiAgJ1VOSVFVRScsXG4gICdVTkxPQ0snLFxuICAnVU5TSUdORUQnLFxuICAnVVBEQVRFJyxcbiAgJ1VTQUdFJyxcbiAgJ1VTRScsXG4gICdVU0lORycsXG4gICdVVENfREFURScsXG4gICdVVENfVElNRScsXG4gICdVVENfVElNRVNUQU1QJyxcbiAgJ1ZBTFVFUycsXG4gICdWQVJCSU5BUlknLFxuICAnVkFSQ0hBUicsXG4gICdWQVJDSEFSQUNURVInLFxuICAnVkFSWUlORycsXG4gICdWSVJUVUFMJyxcbiAgJ1dIRU4nLFxuICAnV0hFUkUnLFxuICAnV0hJTEUnLFxuICAnV0lORE9XJyxcbiAgJ1dJVEgnLFxuICAnV1JJVEUnLFxuICAnWE9SJyxcbiAgJ1lFQVJfTU9OVEgnLFxuICAnWkVST0ZJTEwnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdERUxFVEUgRlJPTScsXG4gICdFWENFUFQnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5TRVJUJyxcbiAgJ0xJTUlUJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQnLFxuICAnVVBEQVRFJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFsnSU5URVJTRUNUJywgJ0lOVEVSU0VDVCBBTEwnLCAnVU5JT04nLCAnVU5JT04gQUxMJ107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0VMU0UnLFxuICAnT1InLFxuICAnV0hFTicsXG4gIC8vIGpvaW5zXG4gICdKT0lOJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnQ1JPU1MgSk9JTicsXG4gICdOQVRVUkFMIEpPSU4nLFxuICAvLyBub24tc3RhbmRhcmQgam9pbnNcbiAgJ1NUUkFJR0hUX0pPSU4nLFxuICAnTkFUVVJBTCBMRUZUIEpPSU4nLFxuICAnTkFUVVJBTCBMRUZUIE9VVEVSIEpPSU4nLFxuICAnTkFUVVJBTCBSSUdIVCBKT0lOJyxcbiAgJ05BVFVSQUwgUklHSFQgT1VURVIgSk9JTicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeVNxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbJ2BgJywgXCInJ1wiLCAnXCJcIiddLFxuICAgICAgb3BlblBhcmVuczogWycoJywgJ0NBU0UnXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknLCAnRU5EJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFtdLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLScsICcjJ10sXG4gICAgICBzcGVjaWFsV29yZENoYXJzOiBbJ0AnXSxcbiAgICAgIG9wZXJhdG9yczogWyc6PScsICc8PCcsICc+PicsICchPScsICc8PicsICc8PT4nLCAnJiYnLCAnfHwnLCAnLT4nLCAnLT4+J10sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBTEwnLFxuICAnQUxURVInLFxuICAnQU5BTFlaRScsXG4gICdBTkQnLFxuICAnQU5ZJyxcbiAgJ0FSUkFZJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdCRUdJTicsXG4gICdCRVRXRUVOJyxcbiAgJ0JJTkFSWScsXG4gICdCT09MRUFOJyxcbiAgJ0JSRUFLJyxcbiAgJ0JVQ0tFVCcsXG4gICdCVUlMRCcsXG4gICdCWScsXG4gICdDQUxMJyxcbiAgJ0NBU0UnLFxuICAnQ0FTVCcsXG4gICdDTFVTVEVSJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MTEVDVElPTicsXG4gICdDT01NSVQnLFxuICAnQ09OTkVDVCcsXG4gICdDT05USU5VRScsXG4gICdDT1JSRUxBVEUnLFxuICAnQ09WRVInLFxuICAnQ1JFQVRFJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBVEFTRVQnLFxuICAnREFUQVNUT1JFJyxcbiAgJ0RFQ0xBUkUnLFxuICAnREVDUkVNRU5UJyxcbiAgJ0RFTEVURScsXG4gICdERVJJVkVEJyxcbiAgJ0RFU0MnLFxuICAnREVTQ1JJQkUnLFxuICAnRElTVElOQ1QnLFxuICAnRE8nLFxuICAnRFJPUCcsXG4gICdFQUNIJyxcbiAgJ0VMRU1FTlQnLFxuICAnRUxTRScsXG4gICdFTkQnLFxuICAnRVZFUlknLFxuICAnRVhDRVBUJyxcbiAgJ0VYQ0xVREUnLFxuICAnRVhFQ1VURScsXG4gICdFWElTVFMnLFxuICAnRVhQTEFJTicsXG4gICdGQUxTRScsXG4gICdGRVRDSCcsXG4gICdGSVJTVCcsXG4gICdGTEFUVEVOJyxcbiAgJ0ZPUicsXG4gICdGT1JDRScsXG4gICdGUk9NJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0dSQU5UJyxcbiAgJ0dST1VQJyxcbiAgJ0dTSScsXG4gICdIQVZJTkcnLFxuICAnSUYnLFxuICAnSUdOT1JFJyxcbiAgJ0lMSUtFJyxcbiAgJ0lOJyxcbiAgJ0lOQ0xVREUnLFxuICAnSU5DUkVNRU5UJyxcbiAgJ0lOREVYJyxcbiAgJ0lORkVSJyxcbiAgJ0lOTElORScsXG4gICdJTk5FUicsXG4gICdJTlNFUlQnLFxuICAnSU5URVJTRUNUJyxcbiAgJ0lOVE8nLFxuICAnSVMnLFxuICAnSk9JTicsXG4gICdLRVknLFxuICAnS0VZUycsXG4gICdLRVlTUEFDRScsXG4gICdLTk9XTicsXG4gICdMQVNUJyxcbiAgJ0xFRlQnLFxuICAnTEVUJyxcbiAgJ0xFVFRJTkcnLFxuICAnTElLRScsXG4gICdMSU1JVCcsXG4gICdMU00nLFxuICAnTUFQJyxcbiAgJ01BUFBJTkcnLFxuICAnTUFUQ0hFRCcsXG4gICdNQVRFUklBTElaRUQnLFxuICAnTUVSR0UnLFxuICAnTUlTU0lORycsXG4gICdOQU1FU1BBQ0UnLFxuICAnTkVTVCcsXG4gICdOT1QnLFxuICAnTlVMTCcsXG4gICdOVU1CRVInLFxuICAnT0JKRUNUJyxcbiAgJ09GRlNFVCcsXG4gICdPTicsXG4gICdPUFRJT04nLFxuICAnT1InLFxuICAnT1JERVInLFxuICAnT1VURVInLFxuICAnT1ZFUicsXG4gICdQQVJTRScsXG4gICdQQVJUSVRJT04nLFxuICAnUEFTU1dPUkQnLFxuICAnUEFUSCcsXG4gICdQT09MJyxcbiAgJ1BSRVBBUkUnLFxuICAnUFJJTUFSWScsXG4gICdQUklWQVRFJyxcbiAgJ1BSSVZJTEVHRScsXG4gICdQUk9DRURVUkUnLFxuICAnUFVCTElDJyxcbiAgJ1JBVycsXG4gICdSRUFMTScsXG4gICdSRURVQ0UnLFxuICAnUkVOQU1FJyxcbiAgJ1JFVFVSTicsXG4gICdSRVRVUk5JTkcnLFxuICAnUkVWT0tFJyxcbiAgJ1JJR0hUJyxcbiAgJ1JPTEUnLFxuICAnUk9MTEJBQ0snLFxuICAnU0FUSVNGSUVTJyxcbiAgJ1NDSEVNQScsXG4gICdTRUxFQ1QnLFxuICAnU0VMRicsXG4gICdTRU1JJyxcbiAgJ1NFVCcsXG4gICdTSE9XJyxcbiAgJ1NPTUUnLFxuICAnU1RBUlQnLFxuICAnU1RBVElTVElDUycsXG4gICdTVFJJTkcnLFxuICAnU1lTVEVNJyxcbiAgJ1RIRU4nLFxuICAnVE8nLFxuICAnVFJBTlNBQ1RJT04nLFxuICAnVFJJR0dFUicsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFJyxcbiAgJ1VOREVSJyxcbiAgJ1VOSU9OJyxcbiAgJ1VOSVFVRScsXG4gICdVTktOT1dOJyxcbiAgJ1VOTkVTVCcsXG4gICdVTlNFVCcsXG4gICdVUERBVEUnLFxuICAnVVBTRVJUJyxcbiAgJ1VTRScsXG4gICdVU0VSJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBTElEQVRFJyxcbiAgJ1ZBTFVFJyxcbiAgJ1ZBTFVFRCcsXG4gICdWQUxVRVMnLFxuICAnVklBJyxcbiAgJ1ZJRVcnLFxuICAnV0hFTicsXG4gICdXSEVSRScsXG4gICdXSElMRScsXG4gICdXSVRIJyxcbiAgJ1dJVEhJTicsXG4gICdXT1JLJyxcbiAgJ1hPUicsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHMgPSBbXG4gICdERUxFVEUgRlJPTScsXG4gICdFWENFUFQgQUxMJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWFBMQUlOIERFTEVURSBGUk9NJyxcbiAgJ0VYUExBSU4gVVBEQVRFJyxcbiAgJ0VYUExBSU4gVVBTRVJUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lORkVSJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0xFVCcsXG4gICdMSU1JVCcsXG4gICdNRVJHRScsXG4gICdORVNUJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1BSRVBBUkUnLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdVTk5FU1QnLFxuICAnVVBEQVRFJyxcbiAgJ1VQU0VSVCcsXG4gICdVU0UgS0VZUycsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ01JTlVTJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdPUicsXG4gICdYT1InLFxuICAvLyBqb2luc1xuICAnSk9JTicsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbl07XG5cbi8vIEZvciByZWZlcmVuY2U6IGh0dHA6Ly9kb2NzLmNvdWNoYmFzZS5jb20uczMtd2Vic2l0ZS11cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zZXJ2ZXIvNi4wL24xcWwvbjFxbC1sYW5ndWFnZS1yZWZlcmVuY2UvaW5kZXguaHRtbFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTjFxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsICdgYCddLFxuICAgICAgb3BlblBhcmVuczogWycoJywgJ1snLCAneyddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICddJywgJ30nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogWyckJ10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJyMnLCAnLS0nXSxcbiAgICAgIG9wZXJhdG9yczogWyc9PScsICchPSddLFxuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCB7IGlzQnksIGlzU2V0IH0gZnJvbSAnLi4vY29yZS90b2tlbic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcbmltcG9ydCB0b2tlblR5cGVzIGZyb20gJy4uL2NvcmUvdG9rZW5UeXBlcyc7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBJyxcbiAgJ0FDQ0VTU0lCTEUnLFxuICAnQUdFTlQnLFxuICAnQUdHUkVHQVRFJyxcbiAgJ0FMTCcsXG4gICdBTFRFUicsXG4gICdBTlknLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FUJyxcbiAgJ0FUVFJJQlVURScsXG4gICdBVVRISUQnLFxuICAnQVZHJyxcbiAgJ0JFVFdFRU4nLFxuICAnQkZJTEVfQkFTRScsXG4gICdCSU5BUllfSU5URUdFUicsXG4gICdCSU5BUlknLFxuICAnQkxPQl9CQVNFJyxcbiAgJ0JMT0NLJyxcbiAgJ0JPRFknLFxuICAnQk9PTEVBTicsXG4gICdCT1RIJyxcbiAgJ0JPVU5EJyxcbiAgJ0JSRUFEVEgnLFxuICAnQlVMSycsXG4gICdCWScsXG4gICdCWVRFJyxcbiAgJ0MnLFxuICAnQ0FMTCcsXG4gICdDQUxMSU5HJyxcbiAgJ0NBU0NBREUnLFxuICAnQ0FTRScsXG4gICdDSEFSX0JBU0UnLFxuICAnQ0hBUicsXG4gICdDSEFSQUNURVInLFxuICAnQ0hBUlNFVCcsXG4gICdDSEFSU0VURk9STScsXG4gICdDSEFSU0VUSUQnLFxuICAnQ0hFQ0snLFxuICAnQ0xPQl9CQVNFJyxcbiAgJ0NMT05FJyxcbiAgJ0NMT1NFJyxcbiAgJ0NMVVNURVInLFxuICAnQ0xVU1RFUlMnLFxuICAnQ09BTEVTQ0UnLFxuICAnQ09MQVVUSCcsXG4gICdDT0xMRUNUJyxcbiAgJ0NPTFVNTlMnLFxuICAnQ09NTUVOVCcsXG4gICdDT01NSVQnLFxuICAnQ09NTUlUVEVEJyxcbiAgJ0NPTVBJTEVEJyxcbiAgJ0NPTVBSRVNTJyxcbiAgJ0NPTk5FQ1QnLFxuICAnQ09OU1RBTlQnLFxuICAnQ09OU1RSVUNUT1InLFxuICAnQ09OVEVYVCcsXG4gICdDT05USU5VRScsXG4gICdDT05WRVJUJyxcbiAgJ0NPVU5UJyxcbiAgJ0NSQVNIJyxcbiAgJ0NSRUFURScsXG4gICdDUkVERU5USUFMJyxcbiAgJ0NVUlJFTlQnLFxuICAnQ1VSUlZBTCcsXG4gICdDVVJTT1InLFxuICAnQ1VTVE9NREFUVU0nLFxuICAnREFOR0xJTkcnLFxuICAnREFUQScsXG4gICdEQVRFX0JBU0UnLFxuICAnREFURScsXG4gICdEQVknLFxuICAnREVDSU1BTCcsXG4gICdERUZBVUxUJyxcbiAgJ0RFRklORScsXG4gICdERUxFVEUnLFxuICAnREVQVEgnLFxuICAnREVTQycsXG4gICdERVRFUk1JTklTVElDJyxcbiAgJ0RJUkVDVE9SWScsXG4gICdESVNUSU5DVCcsXG4gICdETycsXG4gICdET1VCTEUnLFxuICAnRFJPUCcsXG4gICdEVVJBVElPTicsXG4gICdFTEVNRU5UJyxcbiAgJ0VMU0lGJyxcbiAgJ0VNUFRZJyxcbiAgJ0VORCcsXG4gICdFU0NBUEUnLFxuICAnRVhDRVBUSU9OUycsXG4gICdFWENMVVNJVkUnLFxuICAnRVhFQ1VURScsXG4gICdFWElTVFMnLFxuICAnRVhJVCcsXG4gICdFWFRFTkRTJyxcbiAgJ0VYVEVSTkFMJyxcbiAgJ0VYVFJBQ1QnLFxuICAnRkFMU0UnLFxuICAnRkVUQ0gnLFxuICAnRklOQUwnLFxuICAnRklSU1QnLFxuICAnRklYRUQnLFxuICAnRkxPQVQnLFxuICAnRk9SJyxcbiAgJ0ZPUkFMTCcsXG4gICdGT1JDRScsXG4gICdGUk9NJyxcbiAgJ0ZVTkNUSU9OJyxcbiAgJ0dFTkVSQUwnLFxuICAnR09UTycsXG4gICdHUkFOVCcsXG4gICdHUk9VUCcsXG4gICdIQVNIJyxcbiAgJ0hFQVAnLFxuICAnSElEREVOJyxcbiAgJ0hPVVInLFxuICAnSURFTlRJRklFRCcsXG4gICdJRicsXG4gICdJTU1FRElBVEUnLFxuICAnSU4nLFxuICAnSU5DTFVESU5HJyxcbiAgJ0lOREVYJyxcbiAgJ0lOREVYRVMnLFxuICAnSU5ESUNBVE9SJyxcbiAgJ0lORElDRVMnLFxuICAnSU5GSU5JVEUnLFxuICAnSU5TVEFOVElBQkxFJyxcbiAgJ0lOVCcsXG4gICdJTlRFR0VSJyxcbiAgJ0lOVEVSRkFDRScsXG4gICdJTlRFUlZBTCcsXG4gICdJTlRPJyxcbiAgJ0lOVkFMSURBVEUnLFxuICAnSVMnLFxuICAnSVNPTEFUSU9OJyxcbiAgJ0pBVkEnLFxuICAnTEFOR1VBR0UnLFxuICAnTEFSR0UnLFxuICAnTEVBRElORycsXG4gICdMRU5HVEgnLFxuICAnTEVWRUwnLFxuICAnTElCUkFSWScsXG4gICdMSUtFJyxcbiAgJ0xJS0UyJyxcbiAgJ0xJS0U0JyxcbiAgJ0xJS0VDJyxcbiAgJ0xJTUlURUQnLFxuICAnTE9DQUwnLFxuICAnTE9DSycsXG4gICdMT05HJyxcbiAgJ01BUCcsXG4gICdNQVgnLFxuICAnTUFYTEVOJyxcbiAgJ01FTUJFUicsXG4gICdNRVJHRScsXG4gICdNSU4nLFxuICAnTUlOVVRFJyxcbiAgJ01MU0xBQkVMJyxcbiAgJ01PRCcsXG4gICdNT0RFJyxcbiAgJ01PTlRIJyxcbiAgJ01VTFRJU0VUJyxcbiAgJ05BTUUnLFxuICAnTkFOJyxcbiAgJ05BVElPTkFMJyxcbiAgJ05BVElWRScsXG4gICdOQVRVUkFMJyxcbiAgJ05BVFVSQUxOJyxcbiAgJ05DSEFSJyxcbiAgJ05FVycsXG4gICdORVhUVkFMJyxcbiAgJ05PQ09NUFJFU1MnLFxuICAnTk9DT1BZJyxcbiAgJ05PVCcsXG4gICdOT1dBSVQnLFxuICAnTlVMTCcsXG4gICdOVUxMSUYnLFxuICAnTlVNQkVSX0JBU0UnLFxuICAnTlVNQkVSJyxcbiAgJ09CSkVDVCcsXG4gICdPQ0lDT0xMJyxcbiAgJ09DSURBVEUnLFxuICAnT0NJREFURVRJTUUnLFxuICAnT0NJRFVSQVRJT04nLFxuICAnT0NJSU5URVJWQUwnLFxuICAnT0NJTE9CTE9DQVRPUicsXG4gICdPQ0lOVU1CRVInLFxuICAnT0NJUkFXJyxcbiAgJ09DSVJFRicsXG4gICdPQ0lSRUZDVVJTT1InLFxuICAnT0NJUk9XSUQnLFxuICAnT0NJU1RSSU5HJyxcbiAgJ09DSVRZUEUnLFxuICAnT0YnLFxuICAnT0xEJyxcbiAgJ09OJyxcbiAgJ09OTFknLFxuICAnT1BBUVVFJyxcbiAgJ09QRU4nLFxuICAnT1BFUkFUT1InLFxuICAnT1BUSU9OJyxcbiAgJ09SQUNMRScsXG4gICdPUkFEQVRBJyxcbiAgJ09SREVSJyxcbiAgJ09SR0FOSVpBVElPTicsXG4gICdPUkxBTlknLFxuICAnT1JMVkFSWScsXG4gICdPVEhFUlMnLFxuICAnT1VUJyxcbiAgJ09WRVJMQVBTJyxcbiAgJ09WRVJSSURJTkcnLFxuICAnUEFDS0FHRScsXG4gICdQQVJBTExFTF9FTkFCTEUnLFxuICAnUEFSQU1FVEVSJyxcbiAgJ1BBUkFNRVRFUlMnLFxuICAnUEFSRU5UJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQQVNDQUwnLFxuICAnUENURlJFRScsXG4gICdQSVBFJyxcbiAgJ1BJUEVMSU5FRCcsXG4gICdQTFNfSU5URUdFUicsXG4gICdQTFVHR0FCTEUnLFxuICAnUE9TSVRJVkUnLFxuICAnUE9TSVRJVkVOJyxcbiAgJ1BSQUdNQScsXG4gICdQUkVDSVNJT04nLFxuICAnUFJJT1InLFxuICAnUFJJVkFURScsXG4gICdQUk9DRURVUkUnLFxuICAnUFVCTElDJyxcbiAgJ1JBSVNFJyxcbiAgJ1JBTkdFJyxcbiAgJ1JBVycsXG4gICdSRUFEJyxcbiAgJ1JFQUwnLFxuICAnUkVDT1JEJyxcbiAgJ1JFRicsXG4gICdSRUZFUkVOQ0UnLFxuICAnUkVMRUFTRScsXG4gICdSRUxJRVNfT04nLFxuICAnUkVNJyxcbiAgJ1JFTUFJTkRFUicsXG4gICdSRU5BTUUnLFxuICAnUkVTT1VSQ0UnLFxuICAnUkVTVUxUX0NBQ0hFJyxcbiAgJ1JFU1VMVCcsXG4gICdSRVRVUk4nLFxuICAnUkVUVVJOSU5HJyxcbiAgJ1JFVkVSU0UnLFxuICAnUkVWT0tFJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ1JPVycsXG4gICdST1dJRCcsXG4gICdST1dOVU0nLFxuICAnUk9XVFlQRScsXG4gICdTQU1QTEUnLFxuICAnU0FWRScsXG4gICdTQVZFUE9JTlQnLFxuICAnU0IxJyxcbiAgJ1NCMicsXG4gICdTQjQnLFxuICAnU0VBUkNIJyxcbiAgJ1NFQ09ORCcsXG4gICdTRUdNRU5UJyxcbiAgJ1NFTEYnLFxuICAnU0VQQVJBVEUnLFxuICAnU0VRVUVOQ0UnLFxuICAnU0VSSUFMSVpBQkxFJyxcbiAgJ1NIQVJFJyxcbiAgJ1NIT1JUJyxcbiAgJ1NJWkVfVCcsXG4gICdTSVpFJyxcbiAgJ1NNQUxMSU5UJyxcbiAgJ1NPTUUnLFxuICAnU1BBQ0UnLFxuICAnU1BBUlNFJyxcbiAgJ1NRTCcsXG4gICdTUUxDT0RFJyxcbiAgJ1NRTERBVEEnLFxuICAnU1FMRVJSTScsXG4gICdTUUxOQU1FJyxcbiAgJ1NRTFNUQVRFJyxcbiAgJ1NUQU5EQVJEJyxcbiAgJ1NUQVJUJyxcbiAgJ1NUQVRJQycsXG4gICdTVERERVYnLFxuICAnU1RPUkVEJyxcbiAgJ1NUUklORycsXG4gICdTVFJVQ1QnLFxuICAnU1RZTEUnLFxuICAnU1VCTVVMVElTRVQnLFxuICAnU1VCUEFSVElUSU9OJyxcbiAgJ1NVQlNUSVRVVEFCTEUnLFxuICAnU1VCVFlQRScsXG4gICdTVUNDRVNTRlVMJyxcbiAgJ1NVTScsXG4gICdTWU5PTllNJyxcbiAgJ1NZU0RBVEUnLFxuICAnVEFCQVVUSCcsXG4gICdUQUJMRScsXG4gICdURE8nLFxuICAnVEhFJyxcbiAgJ1RIRU4nLFxuICAnVElNRScsXG4gICdUSU1FU1RBTVAnLFxuICAnVElNRVpPTkVfQUJCUicsXG4gICdUSU1FWk9ORV9IT1VSJyxcbiAgJ1RJTUVaT05FX01JTlVURScsXG4gICdUSU1FWk9ORV9SRUdJT04nLFxuICAnVE8nLFxuICAnVFJBSUxJTkcnLFxuICAnVFJBTlNBQ1RJT04nLFxuICAnVFJBTlNBQ1RJT05BTCcsXG4gICdUUklHR0VSJyxcbiAgJ1RSVUUnLFxuICAnVFJVU1RFRCcsXG4gICdUWVBFJyxcbiAgJ1VCMScsXG4gICdVQjInLFxuICAnVUI0JyxcbiAgJ1VJRCcsXG4gICdVTkRFUicsXG4gICdVTklRVUUnLFxuICAnVU5QTFVHJyxcbiAgJ1VOU0lHTkVEJyxcbiAgJ1VOVFJVU1RFRCcsXG4gICdVU0UnLFxuICAnVVNFUicsXG4gICdVU0lORycsXG4gICdWQUxJREFURScsXG4gICdWQUxJU1QnLFxuICAnVkFMVUUnLFxuICAnVkFSQ0hBUicsXG4gICdWQVJDSEFSMicsXG4gICdWQVJJQUJMRScsXG4gICdWQVJJQU5DRScsXG4gICdWQVJSQVknLFxuICAnVkFSWUlORycsXG4gICdWSUVXJyxcbiAgJ1ZJRVdTJyxcbiAgJ1ZPSUQnLFxuICAnV0hFTkVWRVInLFxuICAnV0hJTEUnLFxuICAnV0lUSCcsXG4gICdXT1JLJyxcbiAgJ1dSQVBQRUQnLFxuICAnV1JJVEUnLFxuICAnWUVBUicsXG4gICdaT05FJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnQkVHSU4nLFxuICAnQ09OTkVDVCBCWScsXG4gICdERUNMQVJFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0RFTEVURScsXG4gICdFTkQnLFxuICAnRVhDRVBUJyxcbiAgJ0VYQ0VQVElPTicsXG4gICdGRVRDSCBGSVJTVCcsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnTElNSVQnLFxuICAnTE9PUCcsXG4gICdNT0RJRlknLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBDVVJSRU5UIFNDSEVNQScsXG4gICdTRVQgU0NIRU1BJyxcbiAgJ1NFVCcsXG4gICdTVEFSVCBXSVRIJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ01JTlVTJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdDUk9TUyBBUFBMWScsXG4gICdFTFNFJyxcbiAgJ0VORCcsXG4gICdPUicsXG4gICdPVVRFUiBBUFBMWScsXG4gICdXSEVOJyxcbiAgJ1hPUicsXG4gIC8vIGpvaW5zXG4gICdKT0lOJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnRlVMTCBKT0lOJyxcbiAgJ0ZVTEwgT1VURVIgSk9JTicsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ05BVFVSQUwgSk9JTicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQbFNxbEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIk4nJ1wiLCBcIicnXCIsICdgYCddLFxuICAgICAgb3BlblBhcmVuczogWycoJywgJ0NBU0UnXSxcbiAgICAgIGNsb3NlUGFyZW5zOiBbJyknLCAnRU5EJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnOiddLFxuICAgICAgbGluZUNvbW1lbnRUeXBlczogWyctLSddLFxuICAgICAgc3BlY2lhbFdvcmRDaGFyczogWydfJywgJyQnLCAnIycsICcuJywgJ0AnXSxcbiAgICAgIG9wZXJhdG9yczogWyd8fCcsICcqKicsICchPScsICc6PSddLFxuICAgIH0pO1xuICB9XG5cbiAgdG9rZW5PdmVycmlkZSh0b2tlbikge1xuICAgIGlmIChpc1NldCh0b2tlbikgJiYgaXNCeSh0aGlzLnByZXZpb3VzUmVzZXJ2ZWRUb2tlbikpIHtcbiAgICAgIHJldHVybiB7IHR5cGU6IHRva2VuVHlwZXMuUkVTRVJWRUQsIHZhbHVlOiB0b2tlbi52YWx1ZSB9O1xuICAgIH1cbiAgICByZXR1cm4gdG9rZW47XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBQk9SVCcsXG4gICdBQlNPTFVURScsXG4gICdBQ0NFU1MnLFxuICAnQUNUSU9OJyxcbiAgJ0FERCcsXG4gICdBRE1JTicsXG4gICdBRlRFUicsXG4gICdBR0dSRUdBVEUnLFxuICAnQUxMJyxcbiAgJ0FMU08nLFxuICAnQUxURVInLFxuICAnQUxXQVlTJyxcbiAgJ0FOQUxZU0UnLFxuICAnQU5BTFlaRScsXG4gICdBTkQnLFxuICAnQU5ZJyxcbiAgJ0FSUkFZJyxcbiAgJ0FTJyxcbiAgJ0FTQycsXG4gICdBU1NFUlRJT04nLFxuICAnQVNTSUdOTUVOVCcsXG4gICdBU1lNTUVUUklDJyxcbiAgJ0FUJyxcbiAgJ0FUVEFDSCcsXG4gICdBVFRSSUJVVEUnLFxuICAnQVVUSE9SSVpBVElPTicsXG4gICdCQUNLV0FSRCcsXG4gICdCRUZPUkUnLFxuICAnQkVHSU4nLFxuICAnQkVUV0VFTicsXG4gICdCSUdJTlQnLFxuICAnQklOQVJZJyxcbiAgJ0JJVCcsXG4gICdCT09MRUFOJyxcbiAgJ0JPVEgnLFxuICAnQlknLFxuICAnQ0FDSEUnLFxuICAnQ0FMTCcsXG4gICdDQUxMRUQnLFxuICAnQ0FTQ0FERScsXG4gICdDQVNDQURFRCcsXG4gICdDQVNFJyxcbiAgJ0NBU1QnLFxuICAnQ0FUQUxPRycsXG4gICdDSEFJTicsXG4gICdDSEFSJyxcbiAgJ0NIQVJBQ1RFUicsXG4gICdDSEFSQUNURVJJU1RJQ1MnLFxuICAnQ0hFQ0snLFxuICAnQ0hFQ0tQT0lOVCcsXG4gICdDTEFTUycsXG4gICdDTE9TRScsXG4gICdDTFVTVEVSJyxcbiAgJ0NPQUxFU0NFJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MTEFUSU9OJyxcbiAgJ0NPTFVNTicsXG4gICdDT0xVTU5TJyxcbiAgJ0NPTU1FTlQnLFxuICAnQ09NTUVOVFMnLFxuICAnQ09NTUlUJyxcbiAgJ0NPTU1JVFRFRCcsXG4gICdDT05DVVJSRU5UTFknLFxuICAnQ09ORklHVVJBVElPTicsXG4gICdDT05GTElDVCcsXG4gICdDT05ORUNUSU9OJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OU1RSQUlOVFMnLFxuICAnQ09OVEVOVCcsXG4gICdDT05USU5VRScsXG4gICdDT05WRVJTSU9OJyxcbiAgJ0NPUFknLFxuICAnQ09TVCcsXG4gICdDUkVBVEUnLFxuICAnQ1JPU1MnLFxuICAnQ1NWJyxcbiAgJ0NVQkUnLFxuICAnQ1VSUkVOVCcsXG4gICdDVVJSRU5UX0NBVEFMT0cnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ0NVUlJFTlRfUk9MRScsXG4gICdDVVJSRU5UX1NDSEVNQScsXG4gICdDVVJSRU5UX1RJTUUnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnQ1VSUkVOVF9VU0VSJyxcbiAgJ0NVUlNPUicsXG4gICdDWUNMRScsXG4gICdEQVRBJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ0RBWScsXG4gICdERUFMTE9DQVRFJyxcbiAgJ0RFQycsXG4gICdERUNJTUFMJyxcbiAgJ0RFQ0xBUkUnLFxuICAnREVGQVVMVCcsXG4gICdERUZBVUxUUycsXG4gICdERUZFUlJBQkxFJyxcbiAgJ0RFRkVSUkVEJyxcbiAgJ0RFRklORVInLFxuICAnREVMRVRFJyxcbiAgJ0RFTElNSVRFUicsXG4gICdERUxJTUlURVJTJyxcbiAgJ0RFUEVORFMnLFxuICAnREVTQycsXG4gICdERVRBQ0gnLFxuICAnRElDVElPTkFSWScsXG4gICdESVNBQkxFJyxcbiAgJ0RJU0NBUkQnLFxuICAnRElTVElOQ1QnLFxuICAnRE8nLFxuICAnRE9DVU1FTlQnLFxuICAnRE9NQUlOJyxcbiAgJ0RPVUJMRScsXG4gICdEUk9QJyxcbiAgJ0VBQ0gnLFxuICAnRUxTRScsXG4gICdFTkFCTEUnLFxuICAnRU5DT0RJTkcnLFxuICAnRU5DUllQVEVEJyxcbiAgJ0VORCcsXG4gICdFTlVNJyxcbiAgJ0VTQ0FQRScsXG4gICdFVkVOVCcsXG4gICdFWENFUFQnLFxuICAnRVhDTFVERScsXG4gICdFWENMVURJTkcnLFxuICAnRVhDTFVTSVZFJyxcbiAgJ0VYRUNVVEUnLFxuICAnRVhJU1RTJyxcbiAgJ0VYUExBSU4nLFxuICAnRVhQUkVTU0lPTicsXG4gICdFWFRFTlNJT04nLFxuICAnRVhURVJOQUwnLFxuICAnRVhUUkFDVCcsXG4gICdGQUxTRScsXG4gICdGQU1JTFknLFxuICAnRkVUQ0gnLFxuICAnRklMVEVSJyxcbiAgJ0ZJUlNUJyxcbiAgJ0ZMT0FUJyxcbiAgJ0ZPTExPV0lORycsXG4gICdGT1InLFxuICAnRk9SQ0UnLFxuICAnRk9SRUlHTicsXG4gICdGT1JXQVJEJyxcbiAgJ0ZSRUVaRScsXG4gICdGUk9NJyxcbiAgJ0ZVTEwnLFxuICAnRlVOQ1RJT04nLFxuICAnRlVOQ1RJT05TJyxcbiAgJ0dFTkVSQVRFRCcsXG4gICdHTE9CQUwnLFxuICAnR1JBTlQnLFxuICAnR1JBTlRFRCcsXG4gICdHUkVBVEVTVCcsXG4gICdHUk9VUCcsXG4gICdHUk9VUElORycsXG4gICdHUk9VUFMnLFxuICAnSEFORExFUicsXG4gICdIQVZJTkcnLFxuICAnSEVBREVSJyxcbiAgJ0hPTEQnLFxuICAnSE9VUicsXG4gICdJREVOVElUWScsXG4gICdJRicsXG4gICdJTElLRScsXG4gICdJTU1FRElBVEUnLFxuICAnSU1NVVRBQkxFJyxcbiAgJ0lNUExJQ0lUJyxcbiAgJ0lNUE9SVCcsXG4gICdJTicsXG4gICdJTkNMVURFJyxcbiAgJ0lOQ0xVRElORycsXG4gICdJTkNSRU1FTlQnLFxuICAnSU5ERVgnLFxuICAnSU5ERVhFUycsXG4gICdJTkhFUklUJyxcbiAgJ0lOSEVSSVRTJyxcbiAgJ0lOSVRJQUxMWScsXG4gICdJTkxJTkUnLFxuICAnSU5ORVInLFxuICAnSU5PVVQnLFxuICAnSU5QVVQnLFxuICAnSU5TRU5TSVRJVkUnLFxuICAnSU5TRVJUJyxcbiAgJ0lOU1RFQUQnLFxuICAnSU5UJyxcbiAgJ0lOVEVHRVInLFxuICAnSU5URVJTRUNUJyxcbiAgJ0lOVEVSVkFMJyxcbiAgJ0lOVE8nLFxuICAnSU5WT0tFUicsXG4gICdJUycsXG4gICdJU05VTEwnLFxuICAnSVNPTEFUSU9OJyxcbiAgJ0pPSU4nLFxuICAnS0VZJyxcbiAgJ0xBQkVMJyxcbiAgJ0xBTkdVQUdFJyxcbiAgJ0xBUkdFJyxcbiAgJ0xBU1QnLFxuICAnTEFURVJBTCcsXG4gICdMRUFESU5HJyxcbiAgJ0xFQUtQUk9PRicsXG4gICdMRUFTVCcsXG4gICdMRUZUJyxcbiAgJ0xFVkVMJyxcbiAgJ0xJS0UnLFxuICAnTElNSVQnLFxuICAnTElTVEVOJyxcbiAgJ0xPQUQnLFxuICAnTE9DQUwnLFxuICAnTE9DQUxUSU1FJyxcbiAgJ0xPQ0FMVElNRVNUQU1QJyxcbiAgJ0xPQ0FUSU9OJyxcbiAgJ0xPQ0snLFxuICAnTE9DS0VEJyxcbiAgJ0xPR0dFRCcsXG4gICdNQVBQSU5HJyxcbiAgJ01BVENIJyxcbiAgJ01BVEVSSUFMSVpFRCcsXG4gICdNQVhWQUxVRScsXG4gICdNRVRIT0QnLFxuICAnTUlOVVRFJyxcbiAgJ01JTlZBTFVFJyxcbiAgJ01PREUnLFxuICAnTU9OVEgnLFxuICAnTU9WRScsXG4gICdOQU1FJyxcbiAgJ05BTUVTJyxcbiAgJ05BVElPTkFMJyxcbiAgJ05BVFVSQUwnLFxuICAnTkNIQVInLFxuICAnTkVXJyxcbiAgJ05FWFQnLFxuICAnTkZDJyxcbiAgJ05GRCcsXG4gICdORktDJyxcbiAgJ05GS0QnLFxuICAnTk8nLFxuICAnTk9ORScsXG4gICdOT1JNQUxJWkUnLFxuICAnTk9STUFMSVpFRCcsXG4gICdOT1QnLFxuICAnTk9USElORycsXG4gICdOT1RJRlknLFxuICAnTk9UTlVMTCcsXG4gICdOT1dBSVQnLFxuICAnTlVMTCcsXG4gICdOVUxMSUYnLFxuICAnTlVMTFMnLFxuICAnTlVNRVJJQycsXG4gICdPQkpFQ1QnLFxuICAnT0YnLFxuICAnT0ZGJyxcbiAgJ09GRlNFVCcsXG4gICdPSURTJyxcbiAgJ09MRCcsXG4gICdPTicsXG4gICdPTkxZJyxcbiAgJ09QRVJBVE9SJyxcbiAgJ09QVElPTicsXG4gICdPUFRJT05TJyxcbiAgJ09SJyxcbiAgJ09SREVSJyxcbiAgJ09SRElOQUxJVFknLFxuICAnT1RIRVJTJyxcbiAgJ09VVCcsXG4gICdPVVRFUicsXG4gICdPVkVSJyxcbiAgJ09WRVJMQVBTJyxcbiAgJ09WRVJMQVknLFxuICAnT1ZFUlJJRElORycsXG4gICdPV05FRCcsXG4gICdPV05FUicsXG4gICdQQVJBTExFTCcsXG4gICdQQVJTRVInLFxuICAnUEFSVElBTCcsXG4gICdQQVJUSVRJT04nLFxuICAnUEFTU0lORycsXG4gICdQQVNTV09SRCcsXG4gICdQTEFDSU5HJyxcbiAgJ1BMQU5TJyxcbiAgJ1BPTElDWScsXG4gICdQT1NJVElPTicsXG4gICdQUkVDRURJTkcnLFxuICAnUFJFQ0lTSU9OJyxcbiAgJ1BSRVBBUkUnLFxuICAnUFJFUEFSRUQnLFxuICAnUFJFU0VSVkUnLFxuICAnUFJJTUFSWScsXG4gICdQUklPUicsXG4gICdQUklWSUxFR0VTJyxcbiAgJ1BST0NFRFVSQUwnLFxuICAnUFJPQ0VEVVJFJyxcbiAgJ1BST0NFRFVSRVMnLFxuICAnUFJPR1JBTScsXG4gICdQVUJMSUNBVElPTicsXG4gICdRVU9URScsXG4gICdSQU5HRScsXG4gICdSRUFEJyxcbiAgJ1JFQUwnLFxuICAnUkVBU1NJR04nLFxuICAnUkVDSEVDSycsXG4gICdSRUNVUlNJVkUnLFxuICAnUkVGJyxcbiAgJ1JFRkVSRU5DRVMnLFxuICAnUkVGRVJFTkNJTkcnLFxuICAnUkVGUkVTSCcsXG4gICdSRUlOREVYJyxcbiAgJ1JFTEFUSVZFJyxcbiAgJ1JFTEVBU0UnLFxuICAnUkVOQU1FJyxcbiAgJ1JFUEVBVEFCTEUnLFxuICAnUkVQTEFDRScsXG4gICdSRVBMSUNBJyxcbiAgJ1JFU0VUJyxcbiAgJ1JFU1RBUlQnLFxuICAnUkVTVFJJQ1QnLFxuICAnUkVUVVJOSU5HJyxcbiAgJ1JFVFVSTlMnLFxuICAnUkVWT0tFJyxcbiAgJ1JJR0hUJyxcbiAgJ1JPTEUnLFxuICAnUk9MTEJBQ0snLFxuICAnUk9MTFVQJyxcbiAgJ1JPVVRJTkUnLFxuICAnUk9VVElORVMnLFxuICAnUk9XJyxcbiAgJ1JPV1MnLFxuICAnUlVMRScsXG4gICdTQVZFUE9JTlQnLFxuICAnU0NIRU1BJyxcbiAgJ1NDSEVNQVMnLFxuICAnU0NST0xMJyxcbiAgJ1NFQVJDSCcsXG4gICdTRUNPTkQnLFxuICAnU0VDVVJJVFknLFxuICAnU0VMRUNUJyxcbiAgJ1NFUVVFTkNFJyxcbiAgJ1NFUVVFTkNFUycsXG4gICdTRVJJQUxJWkFCTEUnLFxuICAnU0VSVkVSJyxcbiAgJ1NFU1NJT04nLFxuICAnU0VTU0lPTl9VU0VSJyxcbiAgJ1NFVCcsXG4gICdTRVRPRicsXG4gICdTRVRTJyxcbiAgJ1NIQVJFJyxcbiAgJ1NIT1cnLFxuICAnU0lNSUxBUicsXG4gICdTSU1QTEUnLFxuICAnU0tJUCcsXG4gICdTTUFMTElOVCcsXG4gICdTTkFQU0hPVCcsXG4gICdTT01FJyxcbiAgJ1NRTCcsXG4gICdTVEFCTEUnLFxuICAnU1RBTkRBTE9ORScsXG4gICdTVEFSVCcsXG4gICdTVEFURU1FTlQnLFxuICAnU1RBVElTVElDUycsXG4gICdTVERJTicsXG4gICdTVERPVVQnLFxuICAnU1RPUkFHRScsXG4gICdTVE9SRUQnLFxuICAnU1RSSUNUJyxcbiAgJ1NUUklQJyxcbiAgJ1NVQlNDUklQVElPTicsXG4gICdTVUJTVFJJTkcnLFxuICAnU1VQUE9SVCcsXG4gICdTWU1NRVRSSUMnLFxuICAnU1lTSUQnLFxuICAnU1lTVEVNJyxcbiAgJ1RBQkxFJyxcbiAgJ1RBQkxFUycsXG4gICdUQUJMRVNBTVBMRScsXG4gICdUQUJMRVNQQUNFJyxcbiAgJ1RFTVAnLFxuICAnVEVNUExBVEUnLFxuICAnVEVNUE9SQVJZJyxcbiAgJ1RFWFQnLFxuICAnVEhFTicsXG4gICdUSUVTJyxcbiAgJ1RJTUUnLFxuICAnVElNRVNUQU1QJyxcbiAgJ1RPJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSQU5TQUNUSU9OJyxcbiAgJ1RSQU5TRk9STScsXG4gICdUUkVBVCcsXG4gICdUUklHR0VSJyxcbiAgJ1RSSU0nLFxuICAnVFJVRScsXG4gICdUUlVOQ0FURScsXG4gICdUUlVTVEVEJyxcbiAgJ1RZUEUnLFxuICAnVFlQRVMnLFxuICAnVUVTQ0FQRScsXG4gICdVTkJPVU5ERUQnLFxuICAnVU5DT01NSVRURUQnLFxuICAnVU5FTkNSWVBURUQnLFxuICAnVU5JT04nLFxuICAnVU5JUVVFJyxcbiAgJ1VOS05PV04nLFxuICAnVU5MSVNURU4nLFxuICAnVU5MT0dHRUQnLFxuICAnVU5USUwnLFxuICAnVVBEQVRFJyxcbiAgJ1VTRVInLFxuICAnVVNJTkcnLFxuICAnVkFDVVVNJyxcbiAgJ1ZBTElEJyxcbiAgJ1ZBTElEQVRFJyxcbiAgJ1ZBTElEQVRPUicsXG4gICdWQUxVRScsXG4gICdWQUxVRVMnLFxuICAnVkFSQ0hBUicsXG4gICdWQVJJQURJQycsXG4gICdWQVJZSU5HJyxcbiAgJ1ZFUkJPU0UnLFxuICAnVkVSU0lPTicsXG4gICdWSUVXJyxcbiAgJ1ZJRVdTJyxcbiAgJ1ZPTEFUSUxFJyxcbiAgJ1dIRU4nLFxuICAnV0hFUkUnLFxuICAnV0hJVEVTUEFDRScsXG4gICdXSU5ET1cnLFxuICAnV0lUSCcsXG4gICdXSVRISU4nLFxuICAnV0lUSE9VVCcsXG4gICdXT1JLJyxcbiAgJ1dSQVBQRVInLFxuICAnV1JJVEUnLFxuICAnWE1MJyxcbiAgJ1hNTEFUVFJJQlVURVMnLFxuICAnWE1MQ09OQ0FUJyxcbiAgJ1hNTEVMRU1FTlQnLFxuICAnWE1MRVhJU1RTJyxcbiAgJ1hNTEZPUkVTVCcsXG4gICdYTUxOQU1FU1BBQ0VTJyxcbiAgJ1hNTFBBUlNFJyxcbiAgJ1hNTFBJJyxcbiAgJ1hNTFJPT1QnLFxuICAnWE1MU0VSSUFMSVpFJyxcbiAgJ1hNTFRBQkxFJyxcbiAgJ1lFQVInLFxuICAnWUVTJyxcbiAgJ1pPTkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FGVEVSJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdDQVNFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VORCcsXG4gICdFWENFUFQnLFxuICAnRkVUQ0ggRklSU1QnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5TRVJUJyxcbiAgJ0xJTUlUJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQgQ1VSUkVOVCBTQ0hFTUEnLFxuICAnU0VUIFNDSEVNQScsXG4gICdTRVQnLFxuICAnVVBEQVRFJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG5dO1xuXG5jb25zdCByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCA9IFsnSU5URVJTRUNUJywgJ0lOVEVSU0VDVCBBTEwnLCAnVU5JT04nLCAnVU5JT04gQUxMJ107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0VMU0UnLFxuICAnT1InLFxuICAnV0hFTicsXG4gIC8vIGpvaW5zXG4gICdKT0lOJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnRlVMTCBKT0lOJyxcbiAgJ0ZVTEwgT1VURVIgSk9JTicsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ05BVFVSQUwgSk9JTicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQb3N0Z3JlU3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiJydcIiwgXCJVJicnXCIsICdVJlwiXCInLCAnJCQnXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnJCddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJzonXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICAgIG9wZXJhdG9yczogW1xuICAgICAgICAnIT0nLFxuICAgICAgICAnPDwnLFxuICAgICAgICAnPj4nLFxuICAgICAgICAnfHwvJyxcbiAgICAgICAgJ3wvJyxcbiAgICAgICAgJzo6JyxcbiAgICAgICAgJy0+PicsXG4gICAgICAgICctPicsXG4gICAgICAgICd+fionLFxuICAgICAgICAnfn4nLFxuICAgICAgICAnIX5+KicsXG4gICAgICAgICchfn4nLFxuICAgICAgICAnfionLFxuICAgICAgICAnIX4qJyxcbiAgICAgICAgJyF+JyxcbiAgICAgICAgJyEhJyxcbiAgICAgIF0sXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IFRva2VuaXplciBmcm9tICcuLi9jb3JlL1Rva2VuaXplcic7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBRVMxMjgnLFxuICAnQUVTMjU2JyxcbiAgJ0FMTE9XT1ZFUldSSVRFJyxcbiAgJ0FOQUxZU0UnLFxuICAnQVJSQVknLFxuICAnQVMnLFxuICAnQVNDJyxcbiAgJ0FVVEhPUklaQVRJT04nLFxuICAnQkFDS1VQJyxcbiAgJ0JJTkFSWScsXG4gICdCTEFOS1NBU05VTEwnLFxuICAnQk9USCcsXG4gICdCWVRFRElDVCcsXG4gICdCWklQMicsXG4gICdDQVNUJyxcbiAgJ0NIRUNLJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MVU1OJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ1JFQVRFJyxcbiAgJ0NSRURFTlRJQUxTJyxcbiAgJ0NVUlJFTlRfREFURScsXG4gICdDVVJSRU5UX1RJTUUnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnQ1VSUkVOVF9VU0VSJyxcbiAgJ0NVUlJFTlRfVVNFUl9JRCcsXG4gICdERUZBVUxUJyxcbiAgJ0RFRkVSUkFCTEUnLFxuICAnREVGTEFURScsXG4gICdERUZSQUcnLFxuICAnREVMVEEnLFxuICAnREVMVEEzMksnLFxuICAnREVTQycsXG4gICdESVNBQkxFJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPJyxcbiAgJ0VMU0UnLFxuICAnRU1QVFlBU05VTEwnLFxuICAnRU5BQkxFJyxcbiAgJ0VOQ09ERScsXG4gICdFTkNSWVBUJyxcbiAgJ0VOQ1JZUFRJT04nLFxuICAnRU5EJyxcbiAgJ0VYUExJQ0lUJyxcbiAgJ0ZBTFNFJyxcbiAgJ0ZPUicsXG4gICdGT1JFSUdOJyxcbiAgJ0ZSRUVaRScsXG4gICdGVUxMJyxcbiAgJ0dMT0JBTERJQ1QyNTYnLFxuICAnR0xPQkFMRElDVDY0SycsXG4gICdHUkFOVCcsXG4gICdHWklQJyxcbiAgJ0lERU5USVRZJyxcbiAgJ0lHTk9SRScsXG4gICdJTElLRScsXG4gICdJTklUSUFMTFknLFxuICAnSU5UTycsXG4gICdMRUFESU5HJyxcbiAgJ0xPQ0FMVElNRScsXG4gICdMT0NBTFRJTUVTVEFNUCcsXG4gICdMVU4nLFxuICAnTFVOUycsXG4gICdMWk8nLFxuICAnTFpPUCcsXG4gICdNSU5VUycsXG4gICdNT1NUTFkxMycsXG4gICdNT1NUTFkzMicsXG4gICdNT1NUTFk4JyxcbiAgJ05BVFVSQUwnLFxuICAnTkVXJyxcbiAgJ05VTExTJyxcbiAgJ09GRicsXG4gICdPRkZMSU5FJyxcbiAgJ09GRlNFVCcsXG4gICdPTEQnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEVOJyxcbiAgJ09SREVSJyxcbiAgJ09WRVJMQVBTJyxcbiAgJ1BBUkFMTEVMJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQRVJDRU5UJyxcbiAgJ1BFUk1JU1NJT05TJyxcbiAgJ1BMQUNJTkcnLFxuICAnUFJJTUFSWScsXG4gICdSQVcnLFxuICAnUkVBRFJBVElPJyxcbiAgJ1JFQ09WRVInLFxuICAnUkVGRVJFTkNFUycsXG4gICdSRUpFQ1RMT0cnLFxuICAnUkVTT1JUJyxcbiAgJ1JFU1RPUkUnLFxuICAnU0VTU0lPTl9VU0VSJyxcbiAgJ1NJTUlMQVInLFxuICAnU1lTREFURScsXG4gICdTWVNURU0nLFxuICAnVEFCTEUnLFxuICAnVEFHJyxcbiAgJ1RERVMnLFxuICAnVEVYVDI1NScsXG4gICdURVhUMzJLJyxcbiAgJ1RIRU4nLFxuICAnVElNRVNUQU1QJyxcbiAgJ1RPJyxcbiAgJ1RPUCcsXG4gICdUUkFJTElORycsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFQ09MVU1OUycsXG4gICdVTklRVUUnLFxuICAnVVNFUicsXG4gICdVU0lORycsXG4gICdWRVJCT1NFJyxcbiAgJ1dBTExFVCcsXG4gICdXSEVOJyxcbiAgJ1dJVEgnLFxuICAnV0lUSE9VVCcsXG4gICdQUkVESUNBVEUnLFxuICAnQ09MVU1OUycsXG4gICdDT01QUk9XUycsXG4gICdDT01QUkVTU0lPTicsXG4gICdDT1BZJyxcbiAgJ0ZPUk1BVCcsXG4gICdERUxJTUlURVInLFxuICAnRklYRURXSURUSCcsXG4gICdBVlJPJyxcbiAgJ0pTT04nLFxuICAnRU5DUllQVEVEJyxcbiAgJ0JaSVAyJyxcbiAgJ0daSVAnLFxuICAnTFpPUCcsXG4gICdQQVJRVUVUJyxcbiAgJ09SQycsXG4gICdBQ0NFUFRBTllEQVRFJyxcbiAgJ0FDQ0VQVElOVkNIQVJTJyxcbiAgJ0JMQU5LU0FTTlVMTCcsXG4gICdEQVRFRk9STUFUJyxcbiAgJ0VNUFRZQVNOVUxMJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VTQ0FQRScsXG4gICdFWFBMSUNJVF9JRFMnLFxuICAnRklMTFJFQ09SRCcsXG4gICdJR05PUkVCTEFOS0xJTkVTJyxcbiAgJ0lHTk9SRUhFQURFUicsXG4gICdOVUxMIEFTJyxcbiAgJ1JFTU9WRVFVT1RFUycsXG4gICdST1VOREVDJyxcbiAgJ1RJTUVGT1JNQVQnLFxuICAnVFJJTUJMQU5LUycsXG4gICdUUlVOQ0FURUNPTFVNTlMnLFxuICAnQ09NUFJPV1MnLFxuICAnQ09NUFVQREFURScsXG4gICdNQVhFUlJPUicsXG4gICdOT0xPQUQnLFxuICAnU1RBVFVQREFURScsXG4gICdNQU5JRkVTVCcsXG4gICdSRUdJT04nLFxuICAnSUFNX1JPTEUnLFxuICAnTUFTVEVSX1NZTU1FVFJJQ19LRVknLFxuICAnU1NIJyxcbiAgJ0FDQ0VQVEFOWURBVEUnLFxuICAnQUNDRVBUSU5WQ0hBUlMnLFxuICAnQUNDRVNTX0tFWV9JRCcsXG4gICdTRUNSRVRfQUNDRVNTX0tFWScsXG4gICdBVlJPJyxcbiAgJ0JMQU5LU0FTTlVMTCcsXG4gICdCWklQMicsXG4gICdDT01QUk9XUycsXG4gICdDT01QVVBEQVRFJyxcbiAgJ0NSRURFTlRJQUxTJyxcbiAgJ0RBVEVGT1JNQVQnLFxuICAnREVMSU1JVEVSJyxcbiAgJ0VNUFRZQVNOVUxMJyxcbiAgJ0VOQ09ESU5HJyxcbiAgJ0VOQ1JZUFRFRCcsXG4gICdFU0NBUEUnLFxuICAnRVhQTElDSVRfSURTJyxcbiAgJ0ZJTExSRUNPUkQnLFxuICAnRklYRURXSURUSCcsXG4gICdGT1JNQVQnLFxuICAnSUFNX1JPTEUnLFxuICAnR1pJUCcsXG4gICdJR05PUkVCTEFOS0xJTkVTJyxcbiAgJ0lHTk9SRUhFQURFUicsXG4gICdKU09OJyxcbiAgJ0xaT1AnLFxuICAnTUFOSUZFU1QnLFxuICAnTUFTVEVSX1NZTU1FVFJJQ19LRVknLFxuICAnTUFYRVJST1InLFxuICAnTk9MT0FEJyxcbiAgJ05VTEwgQVMnLFxuICAnUkVBRFJBVElPJyxcbiAgJ1JFR0lPTicsXG4gICdSRU1PVkVRVU9URVMnLFxuICAnUk9VTkRFQycsXG4gICdTU0gnLFxuICAnU1RBVFVQREFURScsXG4gICdUSU1FRk9STUFUJyxcbiAgJ1NFU1NJT05fVE9LRU4nLFxuICAnVFJJTUJMQU5LUycsXG4gICdUUlVOQ0FURUNPTFVNTlMnLFxuICAnRVhURVJOQUwnLFxuICAnREFUQSBDQVRBTE9HJyxcbiAgJ0hJVkUgTUVUQVNUT1JFJyxcbiAgJ0NBVEFMT0dfUk9MRScsXG4gICdWQUNVVU0nLFxuICAnQ09QWScsXG4gICdVTkxPQUQnLFxuICAnRVZFTicsXG4gICdBTEwnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FGVEVSJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdERUxFVEUgRlJPTScsXG4gICdFWENFUFQnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnSU5TRVJUJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdUT1AnLFxuICAnTElNSVQnLFxuICAnTU9ESUZZJyxcbiAgJ09SREVSIEJZJyxcbiAgJ1NFTEVDVCcsXG4gICdTRVQgQ1VSUkVOVCBTQ0hFTUEnLFxuICAnU0VUIFNDSEVNQScsXG4gICdTRVQnLFxuICAnVU5JT04gQUxMJyxcbiAgJ1VOSU9OJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuICAnVkFDVVVNJyxcbiAgJ0NPUFknLFxuICAnVU5MT0FEJyxcbiAgJ0FOQUxZWkUnLFxuICAnQU5BTFlTRScsXG4gICdESVNUS0VZJyxcbiAgJ1NPUlRLRVknLFxuICAnQ09NUE9VTkQnLFxuICAnSU5URVJMRUFWRUQnLFxuICAnRk9STUFUJyxcbiAgJ0RFTElNSVRFUicsXG4gICdGSVhFRFdJRFRIJyxcbiAgJ0FWUk8nLFxuICAnSlNPTicsXG4gICdFTkNSWVBURUQnLFxuICAnQlpJUDInLFxuICAnR1pJUCcsXG4gICdMWk9QJyxcbiAgJ1BBUlFVRVQnLFxuICAnT1JDJyxcbiAgJ0FDQ0VQVEFOWURBVEUnLFxuICAnQUNDRVBUSU5WQ0hBUlMnLFxuICAnQkxBTktTQVNOVUxMJyxcbiAgJ0RBVEVGT1JNQVQnLFxuICAnRU1QVFlBU05VTEwnLFxuICAnRU5DT0RJTkcnLFxuICAnRVNDQVBFJyxcbiAgJ0VYUExJQ0lUX0lEUycsXG4gICdGSUxMUkVDT1JEJyxcbiAgJ0lHTk9SRUJMQU5LTElORVMnLFxuICAnSUdOT1JFSEVBREVSJyxcbiAgJ05VTEwgQVMnLFxuICAnUkVNT1ZFUVVPVEVTJyxcbiAgJ1JPVU5ERUMnLFxuICAnVElNRUZPUk1BVCcsXG4gICdUUklNQkxBTktTJyxcbiAgJ1RSVU5DQVRFQ09MVU1OUycsXG4gICdDT01QUk9XUycsXG4gICdDT01QVVBEQVRFJyxcbiAgJ01BWEVSUk9SJyxcbiAgJ05PTE9BRCcsXG4gICdTVEFUVVBEQVRFJyxcbiAgJ01BTklGRVNUJyxcbiAgJ1JFR0lPTicsXG4gICdJQU1fUk9MRScsXG4gICdNQVNURVJfU1lNTUVUUklDX0tFWScsXG4gICdTU0gnLFxuICAnQUNDRVBUQU5ZREFURScsXG4gICdBQ0NFUFRJTlZDSEFSUycsXG4gICdBQ0NFU1NfS0VZX0lEJyxcbiAgJ1NFQ1JFVF9BQ0NFU1NfS0VZJyxcbiAgJ0FWUk8nLFxuICAnQkxBTktTQVNOVUxMJyxcbiAgJ0JaSVAyJyxcbiAgJ0NPTVBST1dTJyxcbiAgJ0NPTVBVUERBVEUnLFxuICAnQ1JFREVOVElBTFMnLFxuICAnREFURUZPUk1BVCcsXG4gICdERUxJTUlURVInLFxuICAnRU1QVFlBU05VTEwnLFxuICAnRU5DT0RJTkcnLFxuICAnRU5DUllQVEVEJyxcbiAgJ0VTQ0FQRScsXG4gICdFWFBMSUNJVF9JRFMnLFxuICAnRklMTFJFQ09SRCcsXG4gICdGSVhFRFdJRFRIJyxcbiAgJ0ZPUk1BVCcsXG4gICdJQU1fUk9MRScsXG4gICdHWklQJyxcbiAgJ0lHTk9SRUJMQU5LTElORVMnLFxuICAnSUdOT1JFSEVBREVSJyxcbiAgJ0pTT04nLFxuICAnTFpPUCcsXG4gICdNQU5JRkVTVCcsXG4gICdNQVNURVJfU1lNTUVUUklDX0tFWScsXG4gICdNQVhFUlJPUicsXG4gICdOT0xPQUQnLFxuICAnTlVMTCBBUycsXG4gICdSRUFEUkFUSU8nLFxuICAnUkVHSU9OJyxcbiAgJ1JFTU9WRVFVT1RFUycsXG4gICdST1VOREVDJyxcbiAgJ1NTSCcsXG4gICdTVEFUVVBEQVRFJyxcbiAgJ1RJTUVGT1JNQVQnLFxuICAnU0VTU0lPTl9UT0tFTicsXG4gICdUUklNQkxBTktTJyxcbiAgJ1RSVU5DQVRFQ09MVU1OUycsXG4gICdFWFRFUk5BTCcsXG4gICdEQVRBIENBVEFMT0cnLFxuICAnSElWRSBNRVRBU1RPUkUnLFxuICAnQ0FUQUxPR19ST0xFJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50ID0gW107XG5cbmNvbnN0IHJlc2VydmVkTmV3bGluZVdvcmRzID0gW1xuICAnQU5EJyxcbiAgJ0VMU0UnLFxuICAnT1InLFxuICAnT1VURVIgQVBQTFknLFxuICAnV0hFTicsXG4gICdWQUNVVU0nLFxuICAnQ09QWScsXG4gICdVTkxPQUQnLFxuICAnQU5BTFlaRScsXG4gICdBTkFMWVNFJyxcbiAgJ0RJU1RLRVknLFxuICAnU09SVEtFWScsXG4gICdDT01QT1VORCcsXG4gICdJTlRFUkxFQVZFRCcsXG4gIC8vIGpvaW5zXG4gICdKT0lOJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnRlVMTCBKT0lOJyxcbiAgJ0ZVTEwgT1VURVIgSk9JTicsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ05BVFVSQUwgSk9JTicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWRzaGlmdEZvcm1hdHRlciBleHRlbmRzIEZvcm1hdHRlciB7XG4gIHRva2VuaXplcigpIHtcbiAgICByZXR1cm4gbmV3IFRva2VuaXplcih7XG4gICAgICByZXNlcnZlZFdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzLFxuICAgICAgcmVzZXJ2ZWROZXdsaW5lV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHNOb0luZGVudCxcbiAgICAgIHN0cmluZ1R5cGVzOiBbYFwiXCJgLCBcIicnXCIsICdgYCddLFxuICAgICAgb3BlblBhcmVuczogWycoJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJ10sXG4gICAgICBpbmRleGVkUGxhY2Vob2xkZXJUeXBlczogWyc/J10sXG4gICAgICBuYW1lZFBsYWNlaG9sZGVyVHlwZXM6IFsnQCcsICcjJywgJyQnXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICAgIG9wZXJhdG9yczogWyd8LycsICd8fC8nLCAnPDwnLCAnPj4nLCAnIT0nLCAnfHwnXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuLy8gaHR0cHM6Ly9qYWtld2hlYXQuZ2l0aHViLmlvL3NxbC1vdmVydmlldy9zcWwtMjAwOC1mb3VuZGF0aW9uLWdyYW1tYXIuaHRtbCNyZXNlcnZlZC13b3JkXG5jb25zdCBzdGFuZGFyZFJlc2VydmVkV29yZHMgPSBbXG4gICdBQlMnLFxuICAnQUxMJyxcbiAgJ0FMTE9DQVRFJyxcbiAgJ0FMVEVSJyxcbiAgJ0FORCcsXG4gICdBTlknLFxuICAnQVJFJyxcbiAgJ0FSUkFZJyxcbiAgJ0FTJyxcbiAgJ0FTRU5TSVRJVkUnLFxuICAnQVNZTU1FVFJJQycsXG4gICdBVCcsXG4gICdBVE9NSUMnLFxuICAnQVVUSE9SSVpBVElPTicsXG4gICdBVkcnLFxuICAnQkVHSU4nLFxuICAnQkVUV0VFTicsXG4gICdCSUdJTlQnLFxuICAnQklOQVJZJyxcbiAgJ0JMT0InLFxuICAnQk9PTEVBTicsXG4gICdCT1RIJyxcbiAgJ0JZJyxcbiAgJ0NBTEwnLFxuICAnQ0FMTEVEJyxcbiAgJ0NBUkRJTkFMSVRZJyxcbiAgJ0NBU0NBREVEJyxcbiAgJ0NBU0UnLFxuICAnQ0FTVCcsXG4gICdDRUlMJyxcbiAgJ0NFSUxJTkcnLFxuICAnQ0hBUicsXG4gICdDSEFSX0xFTkdUSCcsXG4gICdDSEFSQUNURVInLFxuICAnQ0hBUkFDVEVSX0xFTkdUSCcsXG4gICdDSEVDSycsXG4gICdDTE9CJyxcbiAgJ0NMT1NFJyxcbiAgJ0NPQUxFU0NFJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MTEVDVCcsXG4gICdDT0xVTU4nLFxuICAnQ09NTUlUJyxcbiAgJ0NPTkRJVElPTicsXG4gICdDT05ORUNUJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OVkVSVCcsXG4gICdDT1JSJyxcbiAgJ0NPUlJFU1BPTkRJTkcnLFxuICAnQ09VTlQnLFxuICAnQ09WQVJfUE9QJyxcbiAgJ0NPVkFSX1NBTVAnLFxuICAnQ1JFQVRFJyxcbiAgJ0NST1NTJyxcbiAgJ0NVQkUnLFxuICAnQ1VNRV9ESVNUJyxcbiAgJ0NVUlJFTlQnLFxuICAnQ1VSUkVOVF9DQVRBTE9HJyxcbiAgJ0NVUlJFTlRfREFURScsXG4gICdDVVJSRU5UX0RFRkFVTFRfVFJBTlNGT1JNX0dST1VQJyxcbiAgJ0NVUlJFTlRfUEFUSCcsXG4gICdDVVJSRU5UX1JPTEUnLFxuICAnQ1VSUkVOVF9TQ0hFTUEnLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVFJBTlNGT1JNX0dST1VQX0ZPUl9UWVBFJyxcbiAgJ0NVUlJFTlRfVVNFUicsXG4gICdDVVJTT1InLFxuICAnQ1lDTEUnLFxuICAnREFURScsXG4gICdEQVknLFxuICAnREVBTExPQ0FURScsXG4gICdERUMnLFxuICAnREVDSU1BTCcsXG4gICdERUNMQVJFJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVMRVRFJyxcbiAgJ0RFTlNFX1JBTksnLFxuICAnREVSRUYnLFxuICAnREVTQ1JJQkUnLFxuICAnREVURVJNSU5JU1RJQycsXG4gICdESVNDT05ORUNUJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPVUJMRScsXG4gICdEUk9QJyxcbiAgJ0RZTkFNSUMnLFxuICAnRUFDSCcsXG4gICdFTEVNRU5UJyxcbiAgJ0VMU0UnLFxuICAnRU5EJyxcbiAgJ0VORC1FWEVDJyxcbiAgJ0VTQ0FQRScsXG4gICdFVkVSWScsXG4gICdFWENFUFQnLFxuICAnRVhFQycsXG4gICdFWEVDVVRFJyxcbiAgJ0VYSVNUUycsXG4gICdFWFAnLFxuICAnRVhURVJOQUwnLFxuICAnRVhUUkFDVCcsXG4gICdGQUxTRScsXG4gICdGRVRDSCcsXG4gICdGSUxURVInLFxuICAnRkxPQVQnLFxuICAnRkxPT1InLFxuICAnRk9SJyxcbiAgJ0ZPUkVJR04nLFxuICAnRlJFRScsXG4gICdGUk9NJyxcbiAgJ0ZVTEwnLFxuICAnRlVOQ1RJT04nLFxuICAnRlVTSU9OJyxcbiAgJ0dFVCcsXG4gICdHTE9CQUwnLFxuICAnR1JBTlQnLFxuICAnR1JPVVAnLFxuICAnR1JPVVBJTkcnLFxuICAnSEFWSU5HJyxcbiAgJ0hPTEQnLFxuICAnSE9VUicsXG4gICdJREVOVElUWScsXG4gICdJTicsXG4gICdJTkRJQ0FUT1InLFxuICAnSU5ORVInLFxuICAnSU5PVVQnLFxuICAnSU5TRU5TSVRJVkUnLFxuICAnSU5TRVJUJyxcbiAgJ0lOVCcsXG4gICdJTlRFR0VSJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdJTlRFUlNFQ1RJT04nLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJUycsXG4gICdKT0lOJyxcbiAgJ0xBTkdVQUdFJyxcbiAgJ0xBUkdFJyxcbiAgJ0xBVEVSQUwnLFxuICAnTEVBRElORycsXG4gICdMRUZUJyxcbiAgJ0xJS0UnLFxuICAnTElLRV9SRUdFWCcsXG4gICdMTicsXG4gICdMT0NBTCcsXG4gICdMT0NBTFRJTUUnLFxuICAnTE9DQUxUSU1FU1RBTVAnLFxuICAnTE9XRVInLFxuICAnTUFUQ0gnLFxuICAnTUFYJyxcbiAgJ01FTUJFUicsXG4gICdNRVJHRScsXG4gICdNRVRIT0QnLFxuICAnTUlOJyxcbiAgJ01JTlVURScsXG4gICdNT0QnLFxuICAnTU9ESUZJRVMnLFxuICAnTU9EVUxFJyxcbiAgJ01PTlRIJyxcbiAgJ01VTFRJU0VUJyxcbiAgJ05BVElPTkFMJyxcbiAgJ05BVFVSQUwnLFxuICAnTkNIQVInLFxuICAnTkNMT0InLFxuICAnTkVXJyxcbiAgJ05PJyxcbiAgJ05PTkUnLFxuICAnTk9STUFMSVpFJyxcbiAgJ05PVCcsXG4gICdOVUxMJyxcbiAgJ05VTExJRicsXG4gICdOVU1FUklDJyxcbiAgJ09DVEVUX0xFTkdUSCcsXG4gICdPQ0NVUlJFTkNFU19SRUdFWCcsXG4gICdPRicsXG4gICdPTEQnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEVOJyxcbiAgJ09SJyxcbiAgJ09SREVSJyxcbiAgJ09VVCcsXG4gICdPVVRFUicsXG4gICdPVkVSJyxcbiAgJ09WRVJMQVBTJyxcbiAgJ09WRVJMQVknLFxuICAnUEFSQU1FVEVSJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQRVJDRU5UX1JBTksnLFxuICAnUEVSQ0VOVElMRV9DT05UJyxcbiAgJ1BFUkNFTlRJTEVfRElTQycsXG4gICdQT1NJVElPTicsXG4gICdQT1NJVElPTl9SRUdFWCcsXG4gICdQT1dFUicsXG4gICdQUkVDSVNJT04nLFxuICAnUFJFUEFSRScsXG4gICdQUklNQVJZJyxcbiAgJ1BST0NFRFVSRScsXG4gICdSQU5HRScsXG4gICdSQU5LJyxcbiAgJ1JFQURTJyxcbiAgJ1JFQUwnLFxuICAnUkVDVVJTSVZFJyxcbiAgJ1JFRicsXG4gICdSRUZFUkVOQ0VTJyxcbiAgJ1JFRkVSRU5DSU5HJyxcbiAgJ1JFR1JfQVZHWCcsXG4gICdSRUdSX0FWR1knLFxuICAnUkVHUl9DT1VOVCcsXG4gICdSRUdSX0lOVEVSQ0VQVCcsXG4gICdSRUdSX1IyJyxcbiAgJ1JFR1JfU0xPUEUnLFxuICAnUkVHUl9TWFgnLFxuICAnUkVHUl9TWFknLFxuICAnUkVHUl9TWVknLFxuICAnUkVMRUFTRScsXG4gICdSRVNVTFQnLFxuICAnUkVUVVJOJyxcbiAgJ1JFVFVSTlMnLFxuICAnUkVWT0tFJyxcbiAgJ1JJR0hUJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ1JPTExVUCcsXG4gICdST1cnLFxuICAnUk9XX05VTUJFUicsXG4gICdST1dTJyxcbiAgJ1NBVkVQT0lOVCcsXG4gICdTQ09QRScsXG4gICdTQ1JPTEwnLFxuICAnU0VBUkNIJyxcbiAgJ1NFQ09ORCcsXG4gICdTRUxFQ1QnLFxuICAnU0VOU0lUSVZFJyxcbiAgJ1NFU1NJT05fVVNFUicsXG4gICdTRVQnLFxuICAnU0lNSUxBUicsXG4gICdTTUFMTElOVCcsXG4gICdTT01FJyxcbiAgJ1NQRUNJRklDJyxcbiAgJ1NQRUNJRklDVFlQRScsXG4gICdTUUwnLFxuICAnU1FMRVhDRVBUSU9OJyxcbiAgJ1NRTFNUQVRFJyxcbiAgJ1NRTFdBUk5JTkcnLFxuICAnU1FSVCcsXG4gICdTVEFSVCcsXG4gICdTVEFUSUMnLFxuICAnU1REREVWX1BPUCcsXG4gICdTVERERVZfU0FNUCcsXG4gICdTVUJNVUxUSVNFVCcsXG4gICdTVUJTVFJJTkcnLFxuICAnU1VCU1RSSU5HX1JFR0VYJyxcbiAgJ1NVTScsXG4gICdTWU1NRVRSSUMnLFxuICAnU1lTVEVNJyxcbiAgJ1NZU1RFTV9VU0VSJyxcbiAgJ1RBQkxFJyxcbiAgJ1RBQkxFU0FNUExFJyxcbiAgJ1RIRU4nLFxuICAnVElNRScsXG4gICdUSU1FU1RBTVAnLFxuICAnVElNRVpPTkVfSE9VUicsXG4gICdUSU1FWk9ORV9NSU5VVEUnLFxuICAnVE8nLFxuICAnVFJBSUxJTkcnLFxuICAnVFJBTlNMQVRFJyxcbiAgJ1RSQU5TTEFURV9SRUdFWCcsXG4gICdUUkFOU0xBVElPTicsXG4gICdUUkVBVCcsXG4gICdUUklHR0VSJyxcbiAgJ1RSSU0nLFxuICAnVFJVRScsXG4gICdVRVNDQVBFJyxcbiAgJ1VOSU9OJyxcbiAgJ1VOSVFVRScsXG4gICdVTktOT1dOJyxcbiAgJ1VOTkVTVCcsXG4gICdVUERBVEUnLFxuICAnVVBQRVInLFxuICAnVVNFUicsXG4gICdVU0lORycsXG4gICdWQUxVRScsXG4gICdWQUxVRVMnLFxuICAnVkFSX1BPUCcsXG4gICdWQVJfU0FNUCcsXG4gICdWQVJCSU5BUlknLFxuICAnVkFSQ0hBUicsXG4gICdWQVJZSU5HJyxcbiAgJ1dIRU4nLFxuICAnV0hFTkVWRVInLFxuICAnV0hFUkUnLFxuICAnV0lEVEhfQlVDS0VUJyxcbiAgJ1dJTkRPVycsXG4gICdXSVRIJyxcbiAgJ1dJVEhJTicsXG4gICdXSVRIT1VUJyxcbiAgJ1lFQVInLFxuXTtcblxuLy8gaHR0cHM6Ly93d3cuc3FsaXRlLm9yZy9sYW5nX2tleXdvcmRzLmh0bWwgPC0gbWludXMgdGhvc2Uga2V5d29yZHMgYWxyZWFkeSBkZWZpbmVkIHNvbWV3aGVyZSBlbHNlIGluIHRoZSBzdGFuZGFyZFxuY29uc3Qgbm9uU3RhbmRhcmRTcWxpdGVSZXNlcnZlZFdvcmRzID0gW1xuICAnQUJPUlQnLFxuICAnQUNUSU9OJyxcbiAgJ0FGVEVSJyxcbiAgJ0FMV0FZUycsXG4gICdBTkFMWVpFJyxcbiAgJ0FTQycsXG4gICdBVFRBQ0gnLFxuICAnQVVUT0lOQ1JFTUVOVCcsXG4gICdCRUZPUkUnLFxuICAnQ0FTQ0FERScsXG4gICdDT05GTElDVCcsXG4gICdEQVRBQkFTRScsXG4gICdERUZFUlJBQkxFJyxcbiAgJ0RFRkVSUkVEJyxcbiAgJ0RFU0MnLFxuICAnREVUQUNIJyxcbiAgJ0RPJyxcbiAgJ0VYQ0xVREUnLFxuICAnRVhDTFVTSVZFJyxcbiAgJ0VYUExBSU4nLFxuICAnRkFJTCcsXG4gICdGSVJTVCcsXG4gICdGT0xMT1dJTkcnLFxuICAnR0VORVJBVEVEJyxcbiAgJ0dMT0InLFxuICAnR1JPVVBTJyxcbiAgJ0lGJyxcbiAgJ0lHTk9SRScsXG4gICdJTU1FRElBVEUnLFxuICAnSU5ERVgnLFxuICAnSU5ERVhFRCcsXG4gICdJTklUSUFMTFknLFxuICAnSU5TVEVBRCcsXG4gICdJU05VTEwnLFxuICAnS0VZJyxcbiAgJ0xBU1QnLFxuICAnTUFURVJJQUxJWkVEJyxcbiAgJ05PVEhJTkcnLFxuICAnTk9UTlVMTCcsXG4gICdOVUxMUycsXG4gICdPRkZTRVQnLFxuICAnT1RIRVJTJyxcbiAgJ1BMQU4nLFxuICAnUFJBR01BJyxcbiAgJ1BSRUNFRElORycsXG4gICdRVUVSWScsXG4gICdSQUlTRScsXG4gICdSRUdFWFAnLFxuICAnUkVJTkRFWCcsXG4gICdSRU5BTUUnLFxuICAnUkVQTEFDRScsXG4gICdSRVNUUklDVCcsXG4gICdSRVRVUk5JTkcnLFxuICAnVEVNUCcsXG4gICdURU1QT1JBUlknLFxuICAnVElFUycsXG4gICdUUkFOU0FDVElPTicsXG4gICdVTkJPVU5ERUQnLFxuICAnVkFDVVVNJyxcbiAgJ1ZJRVcnLFxuICAnVklSVFVBTCcsXG5dO1xuXG5jb25zdCByZXNlcnZlZFdvcmRzID0gWy4uLnN0YW5kYXJkUmVzZXJ2ZWRXb3JkcywgLi4ubm9uU3RhbmRhcmRTcWxpdGVSZXNlcnZlZFdvcmRzXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdDQVNFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VORCcsXG4gICdGRVRDSCBGSVJTVCcsXG4gICdGRVRDSCBORVhUJyxcbiAgJ0ZFVENIIFBSSU9SJyxcbiAgJ0ZFVENIIExBU1QnLFxuICAnRkVUQ0ggQUJTT0xVVEUnLFxuICAnRkVUQ0ggUkVMQVRJVkUnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnTElNSVQnLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbXG4gICdJTlRFUlNFQ1QnLFxuICAnSU5URVJTRUNUIEFMTCcsXG4gICdJTlRFUlNFQ1QgRElTVElOQ1QnLFxuICAnVU5JT04nLFxuICAnVU5JT04gQUxMJyxcbiAgJ1VOSU9OIERJU1RJTkNUJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWENFUFQgQUxMJyxcbiAgJ0VYQ0VQVCBESVNUSU5DVCcsXG5dO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdFTFNFJyxcbiAgJ09SJyxcbiAgJ1dIRU4nLFxuICAvLyBqb2lucyAtIGh0dHBzOi8vd3d3LnNxbGl0ZS5vcmcvc3ludGF4L2pvaW4tb3BlcmF0b3IuaHRtbFxuICAnSk9JTicsXG4gICdMRUZUIEpPSU4nLFxuICAnTEVGVCBPVVRFUiBKT0lOJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnQ1JPU1MgSk9JTicsXG4gICdOQVRVUkFMIEpPSU4nLFxuICAnTkFUVVJBTCBMRUZUIEpPSU4nLFxuICAnTkFUVVJBTCBMRUZUIE9VVEVSIEpPSU4nLFxuICAnTkFUVVJBTCBJTk5FUiBKT0lOJyxcbiAgJ05BVFVSQUwgQ1JPU1MgSk9JTicsXG5dO1xuXG4vLyBodHRwczovL3d3dy5zcWxpdGUub3JnL2xhbmdfZXhwci5odG1sXG5jb25zdCBvcGVyYXRvcnMgPSBbXG4gIC8vIG5vbi1iaW5hcnlcbiAgJ34nLFxuICAnKycsXG4gICctJyxcbiAgLy8gY29uY2F0XG4gICd8fCcsXG4gIC8vIGFyaXRobWV0aWNcbiAgJysnLFxuICAnLScsXG4gICcqJyxcbiAgJy8nLFxuICAnJScsXG4gIC8vIGJpdHdpc2VcbiAgJyYnLFxuICAnfCcsXG4gICc8PCcsXG4gICc+PicsXG4gIC8vIGNvbXBhcmlzb25cbiAgJzwnLFxuICAnPicsXG4gICc9JyxcbiAgJz09JyxcbiAgJyE9Jyxcbl07XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YW5kYXJkU3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiJydcIl0sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbJz8nXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogW10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gICAgICBvcGVyYXRvcnMsXG4gICAgfSk7XG4gIH1cbn1cbiIsImltcG9ydCBGb3JtYXR0ZXIgZnJvbSAnLi4vY29yZS9Gb3JtYXR0ZXInO1xuaW1wb3J0IHsgaXNFbmQsIGlzV2luZG93IH0gZnJvbSAnLi4vY29yZS90b2tlbic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcbmltcG9ydCB0b2tlblR5cGVzIGZyb20gJy4uL2NvcmUvdG9rZW5UeXBlcyc7XG5cbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBTEwnLFxuICAnQUxURVInLFxuICAnQU5BTFlTRScsXG4gICdBTkFMWVpFJyxcbiAgJ0FSUkFZX1pJUCcsXG4gICdBUlJBWScsXG4gICdBUycsXG4gICdBU0MnLFxuICAnQVZHJyxcbiAgJ0JFVFdFRU4nLFxuICAnQ0FTQ0FERScsXG4gICdDQVNFJyxcbiAgJ0NBU1QnLFxuICAnQ09BTEVTQ0UnLFxuICAnQ09MTEVDVF9MSVNUJyxcbiAgJ0NPTExFQ1RfU0VUJyxcbiAgJ0NPTFVNTicsXG4gICdDT0xVTU5TJyxcbiAgJ0NPTU1FTlQnLFxuICAnQ09OU1RSQUlOVCcsXG4gICdDT05UQUlOUycsXG4gICdDT05WRVJUJyxcbiAgJ0NPVU5UJyxcbiAgJ0NVTUVfRElTVCcsXG4gICdDVVJSRU5UIFJPVycsXG4gICdDVVJSRU5UX0RBVEUnLFxuICAnQ1VSUkVOVF9USU1FU1RBTVAnLFxuICAnREFUQUJBU0UnLFxuICAnREFUQUJBU0VTJyxcbiAgJ0RBVEVfQUREJyxcbiAgJ0RBVEVfU1VCJyxcbiAgJ0RBVEVfVFJVTkMnLFxuICAnREFZX0hPVVInLFxuICAnREFZX01JTlVURScsXG4gICdEQVlfU0VDT05EJyxcbiAgJ0RBWScsXG4gICdEQVlTJyxcbiAgJ0RFQ09ERScsXG4gICdERUZBVUxUJyxcbiAgJ0RFTEVURScsXG4gICdERU5TRV9SQU5LJyxcbiAgJ0RFU0MnLFxuICAnREVTQ1JJQkUnLFxuICAnRElTVElOQ1QnLFxuICAnRElTVElOQ1RST1cnLFxuICAnRElWJyxcbiAgJ0RST1AnLFxuICAnRUxTRScsXG4gICdFTkNPREUnLFxuICAnRU5EJyxcbiAgJ0VYSVNUUycsXG4gICdFWFBMQUlOJyxcbiAgJ0VYUExPREVfT1VURVInLFxuICAnRVhQTE9ERScsXG4gICdGSUxURVInLFxuICAnRklSU1RfVkFMVUUnLFxuICAnRklSU1QnLFxuICAnRklYRUQnLFxuICAnRkxBVFRFTicsXG4gICdGT0xMT1dJTkcnLFxuICAnRlJPTV9VTklYVElNRScsXG4gICdGVUxMJyxcbiAgJ0dSRUFURVNUJyxcbiAgJ0dST1VQX0NPTkNBVCcsXG4gICdIT1VSX01JTlVURScsXG4gICdIT1VSX1NFQ09ORCcsXG4gICdIT1VSJyxcbiAgJ0hPVVJTJyxcbiAgJ0lGJyxcbiAgJ0lGTlVMTCcsXG4gICdJTicsXG4gICdJTlNFUlQnLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJUycsXG4gICdMQUcnLFxuICAnTEFTVF9WQUxVRScsXG4gICdMQVNUJyxcbiAgJ0xFQUQnLFxuICAnTEVBRElORycsXG4gICdMRUFTVCcsXG4gICdMRVZFTCcsXG4gICdMSUtFJyxcbiAgJ01BWCcsXG4gICdNRVJHRScsXG4gICdNSU4nLFxuICAnTUlOVVRFX1NFQ09ORCcsXG4gICdNSU5VVEUnLFxuICAnTU9OVEgnLFxuICAnTkFUVVJBTCcsXG4gICdOT1QnLFxuICAnTk9XKCknLFxuICAnTlRJTEUnLFxuICAnTlVMTCcsXG4gICdOVUxMSUYnLFxuICAnT0ZGU0VUJyxcbiAgJ09OIERFTEVURScsXG4gICdPTiBVUERBVEUnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUFRJTUlaRScsXG4gICdPVkVSJyxcbiAgJ1BFUkNFTlRfUkFOSycsXG4gICdQUkVDRURJTkcnLFxuICAnUkFOR0UnLFxuICAnUkFOSycsXG4gICdSRUdFWFAnLFxuICAnUkVOQU1FJyxcbiAgJ1JMSUtFJyxcbiAgJ1JPVycsXG4gICdST1dTJyxcbiAgJ1NFQ09ORCcsXG4gICdTRVBBUkFUT1InLFxuICAnU0VRVUVOQ0UnLFxuICAnU0laRScsXG4gICdTVFJJTkcnLFxuICAnU1RSVUNUJyxcbiAgJ1NVTScsXG4gICdUQUJMRScsXG4gICdUQUJMRVMnLFxuICAnVEVNUE9SQVJZJyxcbiAgJ1RIRU4nLFxuICAnVE9fREFURScsXG4gICdUT19KU09OJyxcbiAgJ1RPJyxcbiAgJ1RSQUlMSU5HJyxcbiAgJ1RSQU5TRk9STScsXG4gICdUUlVFJyxcbiAgJ1RSVU5DQVRFJyxcbiAgJ1RZUEUnLFxuICAnVFlQRVMnLFxuICAnVU5CT1VOREVEJyxcbiAgJ1VOSVFVRScsXG4gICdVTklYX1RJTUVTVEFNUCcsXG4gICdVTkxPQ0snLFxuICAnVU5TSUdORUQnLFxuICAnVVNJTkcnLFxuICAnVkFSSUFCTEVTJyxcbiAgJ1ZJRVcnLFxuICAnV0hFTicsXG4gICdXSVRIJyxcbiAgJ1lFQVJfTU9OVEgnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FGVEVSJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBEQVRBQkFTRScsXG4gICdBTFRFUiBTQ0hFTUEnLFxuICAnQUxURVIgVEFCTEUnLFxuICAnQ0xVU1RFUiBCWScsXG4gICdDTFVTVEVSRUQgQlknLFxuICAnREVMRVRFIEZST00nLFxuICAnRElTVFJJQlVURSBCWScsXG4gICdGUk9NJyxcbiAgJ0dST1VQIEJZJyxcbiAgJ0hBVklORycsXG4gICdJTlNFUlQgSU5UTycsXG4gICdJTlNFUlQnLFxuICAnTElNSVQnLFxuICAnT1BUSU9OUycsXG4gICdPUkRFUiBCWScsXG4gICdQQVJUSVRJT04gQlknLFxuICAnUEFSVElUSU9ORUQgQlknLFxuICAnUkFOR0UnLFxuICAnUk9XUycsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1RCTFBST1BFUlRJRVMnLFxuICAnVVBEQVRFJyxcbiAgJ1VTSU5HJyxcbiAgJ1ZBTFVFUycsXG4gICdXSEVSRScsXG4gICdXSU5ET1cnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbXG4gICdFWENFUFQgQUxMJyxcbiAgJ0VYQ0VQVCcsXG4gICdJTlRFUlNFQ1QgQUxMJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdVTklPTiBBTEwnLFxuICAnVU5JT04nLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWROZXdsaW5lV29yZHMgPSBbXG4gICdBTkQnLFxuICAnQ1JFQVRFIE9SJyxcbiAgJ0NSRUFURScsXG4gICdFTFNFJyxcbiAgJ0xBVEVSQUwgVklFVycsXG4gICdPUicsXG4gICdPVVRFUiBBUFBMWScsXG4gICdXSEVOJyxcbiAgJ1hPUicsXG4gIC8vIGpvaW5zXG4gICdKT0lOJyxcbiAgJ0lOTkVSIEpPSU4nLFxuICAnTEVGVCBKT0lOJyxcbiAgJ0xFRlQgT1VURVIgSk9JTicsXG4gICdSSUdIVCBKT0lOJyxcbiAgJ1JJR0hUIE9VVEVSIEpPSU4nLFxuICAnRlVMTCBKT0lOJyxcbiAgJ0ZVTEwgT1VURVIgSk9JTicsXG4gICdDUk9TUyBKT0lOJyxcbiAgJ05BVFVSQUwgSk9JTicsXG4gIC8vIG5vbi1zdGFuZGFyZC1qb2luc1xuICAnQU5USSBKT0lOJyxcbiAgJ1NFTUkgSk9JTicsXG4gICdMRUZUIEFOVEkgSk9JTicsXG4gICdMRUZUIFNFTUkgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ1JJR0hUIFNFTUkgSk9JTicsXG4gICdOQVRVUkFMIEFOVEkgSk9JTicsXG4gICdOQVRVUkFMIEZVTEwgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIElOTkVSIEpPSU4nLFxuICAnTkFUVVJBTCBMRUZUIEFOVEkgSk9JTicsXG4gICdOQVRVUkFMIExFRlQgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIExFRlQgU0VNSSBKT0lOJyxcbiAgJ05BVFVSQUwgT1VURVIgSk9JTicsXG4gICdOQVRVUkFMIFJJR0hUIE9VVEVSIEpPSU4nLFxuICAnTkFUVVJBTCBSSUdIVCBTRU1JIEpPSU4nLFxuICAnTkFUVVJBTCBTRU1JIEpPSU4nLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3BhcmtTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCInJ1wiLCAnYGAnLCAne30nXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbJyQnXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICAgIG9wZXJhdG9yczogWychPScsICc8PT4nLCAnJiYnLCAnfHwnLCAnPT0nXSxcbiAgICB9KTtcbiAgfVxuXG4gIHRva2VuT3ZlcnJpZGUodG9rZW4pIHtcbiAgICAvLyBGaXggY2FzZXMgd2hlcmUgbmFtZXMgYXJlIGFtYmlndW91c2x5IGtleXdvcmRzIG9yIGZ1bmN0aW9uc1xuICAgIGlmIChpc1dpbmRvdyh0b2tlbikpIHtcbiAgICAgIGNvbnN0IGFoZWFkVG9rZW4gPSB0aGlzLnRva2VuTG9va0FoZWFkKCk7XG4gICAgICBpZiAoYWhlYWRUb2tlbiAmJiBhaGVhZFRva2VuLnR5cGUgPT09IHRva2VuVHlwZXMuT1BFTl9QQVJFTikge1xuICAgICAgICAvLyBUaGlzIGlzIGEgZnVuY3Rpb24gY2FsbCwgdHJlYXQgaXQgYXMgYSByZXNlcnZlZCB3b3JkXG4gICAgICAgIHJldHVybiB7IHR5cGU6IHRva2VuVHlwZXMuUkVTRVJWRUQsIHZhbHVlOiB0b2tlbi52YWx1ZSB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZpeCBjYXNlcyB3aGVyZSBuYW1lcyBhcmUgYW1iaWd1b3VzbHkga2V5d29yZHMgb3IgcHJvcGVydGllc1xuICAgIGlmIChpc0VuZCh0b2tlbikpIHtcbiAgICAgIGNvbnN0IGJhY2tUb2tlbiA9IHRoaXMudG9rZW5Mb29rQmVoaW5kKCk7XG4gICAgICBpZiAoYmFja1Rva2VuICYmIGJhY2tUb2tlbi50eXBlID09PSB0b2tlblR5cGVzLk9QRVJBVE9SICYmIGJhY2tUb2tlbi52YWx1ZSA9PT0gJy4nKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgd2luZG93KCkuZW5kIChvciBzaW1pbGFyKSBub3QgQ0FTRSAuLi4gRU5EXG4gICAgICAgIHJldHVybiB7IHR5cGU6IHRva2VuVHlwZXMuV09SRCwgdmFsdWU6IHRva2VuLnZhbHVlIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRva2VuO1xuICB9XG59XG4iLCJpbXBvcnQgRm9ybWF0dGVyIGZyb20gJy4uL2NvcmUvRm9ybWF0dGVyJztcbmltcG9ydCBUb2tlbml6ZXIgZnJvbSAnLi4vY29yZS9Ub2tlbml6ZXInO1xuXG4vLyBodHRwczovL2pha2V3aGVhdC5naXRodWIuaW8vc3FsLW92ZXJ2aWV3L3NxbC0yMDA4LWZvdW5kYXRpb24tZ3JhbW1hci5odG1sI3Jlc2VydmVkLXdvcmRcbmNvbnN0IHJlc2VydmVkV29yZHMgPSBbXG4gICdBQlMnLFxuICAnQUxMJyxcbiAgJ0FMTE9DQVRFJyxcbiAgJ0FMVEVSJyxcbiAgJ0FORCcsXG4gICdBTlknLFxuICAnQVJFJyxcbiAgJ0FSUkFZJyxcbiAgJ0FTJyxcbiAgJ0FTRU5TSVRJVkUnLFxuICAnQVNZTU1FVFJJQycsXG4gICdBVCcsXG4gICdBVE9NSUMnLFxuICAnQVVUSE9SSVpBVElPTicsXG4gICdBVkcnLFxuICAnQkVHSU4nLFxuICAnQkVUV0VFTicsXG4gICdCSUdJTlQnLFxuICAnQklOQVJZJyxcbiAgJ0JMT0InLFxuICAnQk9PTEVBTicsXG4gICdCT1RIJyxcbiAgJ0JZJyxcbiAgJ0NBTEwnLFxuICAnQ0FMTEVEJyxcbiAgJ0NBUkRJTkFMSVRZJyxcbiAgJ0NBU0NBREVEJyxcbiAgJ0NBU0UnLFxuICAnQ0FTVCcsXG4gICdDRUlMJyxcbiAgJ0NFSUxJTkcnLFxuICAnQ0hBUicsXG4gICdDSEFSX0xFTkdUSCcsXG4gICdDSEFSQUNURVInLFxuICAnQ0hBUkFDVEVSX0xFTkdUSCcsXG4gICdDSEVDSycsXG4gICdDTE9CJyxcbiAgJ0NMT1NFJyxcbiAgJ0NPQUxFU0NFJyxcbiAgJ0NPTExBVEUnLFxuICAnQ09MTEVDVCcsXG4gICdDT0xVTU4nLFxuICAnQ09NTUlUJyxcbiAgJ0NPTkRJVElPTicsXG4gICdDT05ORUNUJyxcbiAgJ0NPTlNUUkFJTlQnLFxuICAnQ09OVkVSVCcsXG4gICdDT1JSJyxcbiAgJ0NPUlJFU1BPTkRJTkcnLFxuICAnQ09VTlQnLFxuICAnQ09WQVJfUE9QJyxcbiAgJ0NPVkFSX1NBTVAnLFxuICAnQ1JFQVRFJyxcbiAgJ0NST1NTJyxcbiAgJ0NVQkUnLFxuICAnQ1VNRV9ESVNUJyxcbiAgJ0NVUlJFTlQnLFxuICAnQ1VSUkVOVF9DQVRBTE9HJyxcbiAgJ0NVUlJFTlRfREFURScsXG4gICdDVVJSRU5UX0RFRkFVTFRfVFJBTlNGT1JNX0dST1VQJyxcbiAgJ0NVUlJFTlRfUEFUSCcsXG4gICdDVVJSRU5UX1JPTEUnLFxuICAnQ1VSUkVOVF9TQ0hFTUEnLFxuICAnQ1VSUkVOVF9USU1FJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ0NVUlJFTlRfVFJBTlNGT1JNX0dST1VQX0ZPUl9UWVBFJyxcbiAgJ0NVUlJFTlRfVVNFUicsXG4gICdDVVJTT1InLFxuICAnQ1lDTEUnLFxuICAnREFURScsXG4gICdEQVknLFxuICAnREVBTExPQ0FURScsXG4gICdERUMnLFxuICAnREVDSU1BTCcsXG4gICdERUNMQVJFJyxcbiAgJ0RFRkFVTFQnLFxuICAnREVMRVRFJyxcbiAgJ0RFTlNFX1JBTksnLFxuICAnREVSRUYnLFxuICAnREVTQ1JJQkUnLFxuICAnREVURVJNSU5JU1RJQycsXG4gICdESVNDT05ORUNUJyxcbiAgJ0RJU1RJTkNUJyxcbiAgJ0RPVUJMRScsXG4gICdEUk9QJyxcbiAgJ0RZTkFNSUMnLFxuICAnRUFDSCcsXG4gICdFTEVNRU5UJyxcbiAgJ0VMU0UnLFxuICAnRU5EJyxcbiAgJ0VORC1FWEVDJyxcbiAgJ0VTQ0FQRScsXG4gICdFVkVSWScsXG4gICdFWENFUFQnLFxuICAnRVhFQycsXG4gICdFWEVDVVRFJyxcbiAgJ0VYSVNUUycsXG4gICdFWFAnLFxuICAnRVhURVJOQUwnLFxuICAnRVhUUkFDVCcsXG4gICdGQUxTRScsXG4gICdGRVRDSCcsXG4gICdGSUxURVInLFxuICAnRkxPQVQnLFxuICAnRkxPT1InLFxuICAnRk9SJyxcbiAgJ0ZPUkVJR04nLFxuICAnRlJFRScsXG4gICdGUk9NJyxcbiAgJ0ZVTEwnLFxuICAnRlVOQ1RJT04nLFxuICAnRlVTSU9OJyxcbiAgJ0dFVCcsXG4gICdHTE9CQUwnLFxuICAnR1JBTlQnLFxuICAnR1JPVVAnLFxuICAnR1JPVVBJTkcnLFxuICAnSEFWSU5HJyxcbiAgJ0hPTEQnLFxuICAnSE9VUicsXG4gICdJREVOVElUWScsXG4gICdJTicsXG4gICdJTkRJQ0FUT1InLFxuICAnSU5ORVInLFxuICAnSU5PVVQnLFxuICAnSU5TRU5TSVRJVkUnLFxuICAnSU5TRVJUJyxcbiAgJ0lOVCcsXG4gICdJTlRFR0VSJyxcbiAgJ0lOVEVSU0VDVCcsXG4gICdJTlRFUlNFQ1RJT04nLFxuICAnSU5URVJWQUwnLFxuICAnSU5UTycsXG4gICdJUycsXG4gICdKT0lOJyxcbiAgJ0xBTkdVQUdFJyxcbiAgJ0xBUkdFJyxcbiAgJ0xBVEVSQUwnLFxuICAnTEVBRElORycsXG4gICdMRUZUJyxcbiAgJ0xJS0UnLFxuICAnTElLRV9SRUdFWCcsXG4gICdMTicsXG4gICdMT0NBTCcsXG4gICdMT0NBTFRJTUUnLFxuICAnTE9DQUxUSU1FU1RBTVAnLFxuICAnTE9XRVInLFxuICAnTUFUQ0gnLFxuICAnTUFYJyxcbiAgJ01FTUJFUicsXG4gICdNRVJHRScsXG4gICdNRVRIT0QnLFxuICAnTUlOJyxcbiAgJ01JTlVURScsXG4gICdNT0QnLFxuICAnTU9ESUZJRVMnLFxuICAnTU9EVUxFJyxcbiAgJ01PTlRIJyxcbiAgJ01VTFRJU0VUJyxcbiAgJ05BVElPTkFMJyxcbiAgJ05BVFVSQUwnLFxuICAnTkNIQVInLFxuICAnTkNMT0InLFxuICAnTkVXJyxcbiAgJ05PJyxcbiAgJ05PTkUnLFxuICAnTk9STUFMSVpFJyxcbiAgJ05PVCcsXG4gICdOVUxMJyxcbiAgJ05VTExJRicsXG4gICdOVU1FUklDJyxcbiAgJ09DVEVUX0xFTkdUSCcsXG4gICdPQ0NVUlJFTkNFU19SRUdFWCcsXG4gICdPRicsXG4gICdPTEQnLFxuICAnT04nLFxuICAnT05MWScsXG4gICdPUEVOJyxcbiAgJ09SJyxcbiAgJ09SREVSJyxcbiAgJ09VVCcsXG4gICdPVVRFUicsXG4gICdPVkVSJyxcbiAgJ09WRVJMQVBTJyxcbiAgJ09WRVJMQVknLFxuICAnUEFSQU1FVEVSJyxcbiAgJ1BBUlRJVElPTicsXG4gICdQRVJDRU5UX1JBTksnLFxuICAnUEVSQ0VOVElMRV9DT05UJyxcbiAgJ1BFUkNFTlRJTEVfRElTQycsXG4gICdQT1NJVElPTicsXG4gICdQT1NJVElPTl9SRUdFWCcsXG4gICdQT1dFUicsXG4gICdQUkVDSVNJT04nLFxuICAnUFJFUEFSRScsXG4gICdQUklNQVJZJyxcbiAgJ1BST0NFRFVSRScsXG4gICdSQU5HRScsXG4gICdSQU5LJyxcbiAgJ1JFQURTJyxcbiAgJ1JFQUwnLFxuICAnUkVDVVJTSVZFJyxcbiAgJ1JFRicsXG4gICdSRUZFUkVOQ0VTJyxcbiAgJ1JFRkVSRU5DSU5HJyxcbiAgJ1JFR1JfQVZHWCcsXG4gICdSRUdSX0FWR1knLFxuICAnUkVHUl9DT1VOVCcsXG4gICdSRUdSX0lOVEVSQ0VQVCcsXG4gICdSRUdSX1IyJyxcbiAgJ1JFR1JfU0xPUEUnLFxuICAnUkVHUl9TWFgnLFxuICAnUkVHUl9TWFknLFxuICAnUkVHUl9TWVknLFxuICAnUkVMRUFTRScsXG4gICdSRVNVTFQnLFxuICAnUkVUVVJOJyxcbiAgJ1JFVFVSTlMnLFxuICAnUkVWT0tFJyxcbiAgJ1JJR0hUJyxcbiAgJ1JPTExCQUNLJyxcbiAgJ1JPTExVUCcsXG4gICdST1cnLFxuICAnUk9XX05VTUJFUicsXG4gICdST1dTJyxcbiAgJ1NBVkVQT0lOVCcsXG4gICdTQ09QRScsXG4gICdTQ1JPTEwnLFxuICAnU0VBUkNIJyxcbiAgJ1NFQ09ORCcsXG4gICdTRUxFQ1QnLFxuICAnU0VOU0lUSVZFJyxcbiAgJ1NFU1NJT05fVVNFUicsXG4gICdTRVQnLFxuICAnU0lNSUxBUicsXG4gICdTTUFMTElOVCcsXG4gICdTT01FJyxcbiAgJ1NQRUNJRklDJyxcbiAgJ1NQRUNJRklDVFlQRScsXG4gICdTUUwnLFxuICAnU1FMRVhDRVBUSU9OJyxcbiAgJ1NRTFNUQVRFJyxcbiAgJ1NRTFdBUk5JTkcnLFxuICAnU1FSVCcsXG4gICdTVEFSVCcsXG4gICdTVEFUSUMnLFxuICAnU1REREVWX1BPUCcsXG4gICdTVERERVZfU0FNUCcsXG4gICdTVUJNVUxUSVNFVCcsXG4gICdTVUJTVFJJTkcnLFxuICAnU1VCU1RSSU5HX1JFR0VYJyxcbiAgJ1NVTScsXG4gICdTWU1NRVRSSUMnLFxuICAnU1lTVEVNJyxcbiAgJ1NZU1RFTV9VU0VSJyxcbiAgJ1RBQkxFJyxcbiAgJ1RBQkxFU0FNUExFJyxcbiAgJ1RIRU4nLFxuICAnVElNRScsXG4gICdUSU1FU1RBTVAnLFxuICAnVElNRVpPTkVfSE9VUicsXG4gICdUSU1FWk9ORV9NSU5VVEUnLFxuICAnVE8nLFxuICAnVFJBSUxJTkcnLFxuICAnVFJBTlNMQVRFJyxcbiAgJ1RSQU5TTEFURV9SRUdFWCcsXG4gICdUUkFOU0xBVElPTicsXG4gICdUUkVBVCcsXG4gICdUUklHR0VSJyxcbiAgJ1RSSU0nLFxuICAnVFJVRScsXG4gICdVRVNDQVBFJyxcbiAgJ1VOSU9OJyxcbiAgJ1VOSVFVRScsXG4gICdVTktOT1dOJyxcbiAgJ1VOTkVTVCcsXG4gICdVUERBVEUnLFxuICAnVVBQRVInLFxuICAnVVNFUicsXG4gICdVU0lORycsXG4gICdWQUxVRScsXG4gICdWQUxVRVMnLFxuICAnVkFSX1BPUCcsXG4gICdWQVJfU0FNUCcsXG4gICdWQVJCSU5BUlknLFxuICAnVkFSQ0hBUicsXG4gICdWQVJZSU5HJyxcbiAgJ1dIRU4nLFxuICAnV0hFTkVWRVInLFxuICAnV0hFUkUnLFxuICAnV0lEVEhfQlVDS0VUJyxcbiAgJ1dJTkRPVycsXG4gICdXSVRIJyxcbiAgJ1dJVEhJTicsXG4gICdXSVRIT1VUJyxcbiAgJ1lFQVInLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzID0gW1xuICAnQUREJyxcbiAgJ0FMVEVSIENPTFVNTicsXG4gICdBTFRFUiBUQUJMRScsXG4gICdDQVNFJyxcbiAgJ0RFTEVURSBGUk9NJyxcbiAgJ0VORCcsXG4gICdGRVRDSCBGSVJTVCcsXG4gICdGRVRDSCBORVhUJyxcbiAgJ0ZFVENIIFBSSU9SJyxcbiAgJ0ZFVENIIExBU1QnLFxuICAnRkVUQ0ggQUJTT0xVVEUnLFxuICAnRkVUQ0ggUkVMQVRJVkUnLFxuICAnRlJPTScsXG4gICdHUk9VUCBCWScsXG4gICdIQVZJTkcnLFxuICAnSU5TRVJUIElOVE8nLFxuICAnTElNSVQnLFxuICAnT1JERVIgQlknLFxuICAnU0VMRUNUJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbXG4gICdJTlRFUlNFQ1QnLFxuICAnSU5URVJTRUNUIEFMTCcsXG4gICdJTlRFUlNFQ1QgRElTVElOQ1QnLFxuICAnVU5JT04nLFxuICAnVU5JT04gQUxMJyxcbiAgJ1VOSU9OIERJU1RJTkNUJyxcbiAgJ0VYQ0VQVCcsXG4gICdFWENFUFQgQUxMJyxcbiAgJ0VYQ0VQVCBESVNUSU5DVCcsXG5dO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdFTFNFJyxcbiAgJ09SJyxcbiAgJ1dIRU4nLFxuICAvLyBqb2luc1xuICAnSk9JTicsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ0ZVTEwgSk9JTicsXG4gICdGVUxMIE9VVEVSIEpPSU4nLFxuICAnQ1JPU1MgSk9JTicsXG4gICdOQVRVUkFMIEpPSU4nLFxuXTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhbmRhcmRTcWxGb3JtYXR0ZXIgZXh0ZW5kcyBGb3JtYXR0ZXIge1xuICB0b2tlbml6ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBUb2tlbml6ZXIoe1xuICAgICAgcmVzZXJ2ZWRXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3JkcyxcbiAgICAgIHJlc2VydmVkTmV3bGluZVdvcmRzLFxuICAgICAgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQsXG4gICAgICBzdHJpbmdUeXBlczogW2BcIlwiYCwgXCInJ1wiXSxcbiAgICAgIG9wZW5QYXJlbnM6IFsnKCcsICdDQVNFJ10sXG4gICAgICBjbG9zZVBhcmVuczogWycpJywgJ0VORCddLFxuICAgICAgaW5kZXhlZFBsYWNlaG9sZGVyVHlwZXM6IFsnPyddLFxuICAgICAgbmFtZWRQbGFjZWhvbGRlclR5cGVzOiBbXSxcbiAgICAgIGxpbmVDb21tZW50VHlwZXM6IFsnLS0nXSxcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IEZvcm1hdHRlciBmcm9tICcuLi9jb3JlL0Zvcm1hdHRlcic7XG5pbXBvcnQgVG9rZW5pemVyIGZyb20gJy4uL2NvcmUvVG9rZW5pemVyJztcblxuY29uc3QgcmVzZXJ2ZWRXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdFWFRFUk5BTCcsXG4gICdQUk9DRURVUkUnLFxuICAnQUxMJyxcbiAgJ0ZFVENIJyxcbiAgJ1BVQkxJQycsXG4gICdBTFRFUicsXG4gICdGSUxFJyxcbiAgJ1JBSVNFUlJPUicsXG4gICdBTkQnLFxuICAnRklMTEZBQ1RPUicsXG4gICdSRUFEJyxcbiAgJ0FOWScsXG4gICdGT1InLFxuICAnUkVBRFRFWFQnLFxuICAnQVMnLFxuICAnRk9SRUlHTicsXG4gICdSRUNPTkZJR1VSRScsXG4gICdBU0MnLFxuICAnRlJFRVRFWFQnLFxuICAnUkVGRVJFTkNFUycsXG4gICdBVVRIT1JJWkFUSU9OJyxcbiAgJ0ZSRUVURVhUVEFCTEUnLFxuICAnUkVQTElDQVRJT04nLFxuICAnQkFDS1VQJyxcbiAgJ0ZST00nLFxuICAnUkVTVE9SRScsXG4gICdCRUdJTicsXG4gICdGVUxMJyxcbiAgJ1JFU1RSSUNUJyxcbiAgJ0JFVFdFRU4nLFxuICAnRlVOQ1RJT04nLFxuICAnUkVUVVJOJyxcbiAgJ0JSRUFLJyxcbiAgJ0dPVE8nLFxuICAnUkVWRVJUJyxcbiAgJ0JST1dTRScsXG4gICdHUkFOVCcsXG4gICdSRVZPS0UnLFxuICAnQlVMSycsXG4gICdHUk9VUCcsXG4gICdSSUdIVCcsXG4gICdCWScsXG4gICdIQVZJTkcnLFxuICAnUk9MTEJBQ0snLFxuICAnQ0FTQ0FERScsXG4gICdIT0xETE9DSycsXG4gICdST1dDT1VOVCcsXG4gICdDQVNFJyxcbiAgJ0lERU5USVRZJyxcbiAgJ1JPV0dVSURDT0wnLFxuICAnQ0hFQ0snLFxuICAnSURFTlRJVFlfSU5TRVJUJyxcbiAgJ1JVTEUnLFxuICAnQ0hFQ0tQT0lOVCcsXG4gICdJREVOVElUWUNPTCcsXG4gICdTQVZFJyxcbiAgJ0NMT1NFJyxcbiAgJ0lGJyxcbiAgJ1NDSEVNQScsXG4gICdDTFVTVEVSRUQnLFxuICAnSU4nLFxuICAnU0VDVVJJVFlBVURJVCcsXG4gICdDT0FMRVNDRScsXG4gICdJTkRFWCcsXG4gICdTRUxFQ1QnLFxuICAnQ09MTEFURScsXG4gICdJTk5FUicsXG4gICdTRU1BTlRJQ0tFWVBIUkFTRVRBQkxFJyxcbiAgJ0NPTFVNTicsXG4gICdJTlNFUlQnLFxuICAnU0VNQU5USUNTSU1JTEFSSVRZREVUQUlMU1RBQkxFJyxcbiAgJ0NPTU1JVCcsXG4gICdJTlRFUlNFQ1QnLFxuICAnU0VNQU5USUNTSU1JTEFSSVRZVEFCTEUnLFxuICAnQ09NUFVURScsXG4gICdJTlRPJyxcbiAgJ1NFU1NJT05fVVNFUicsXG4gICdDT05TVFJBSU5UJyxcbiAgJ0lTJyxcbiAgJ1NFVCcsXG4gICdDT05UQUlOUycsXG4gICdKT0lOJyxcbiAgJ1NFVFVTRVInLFxuICAnQ09OVEFJTlNUQUJMRScsXG4gICdLRVknLFxuICAnU0hVVERPV04nLFxuICAnQ09OVElOVUUnLFxuICAnS0lMTCcsXG4gICdTT01FJyxcbiAgJ0NPTlZFUlQnLFxuICAnTEVGVCcsXG4gICdTVEFUSVNUSUNTJyxcbiAgJ0NSRUFURScsXG4gICdMSUtFJyxcbiAgJ1NZU1RFTV9VU0VSJyxcbiAgJ0NST1NTJyxcbiAgJ0xJTkVOTycsXG4gICdUQUJMRScsXG4gICdDVVJSRU5UJyxcbiAgJ0xPQUQnLFxuICAnVEFCTEVTQU1QTEUnLFxuICAnQ1VSUkVOVF9EQVRFJyxcbiAgJ01FUkdFJyxcbiAgJ1RFWFRTSVpFJyxcbiAgJ0NVUlJFTlRfVElNRScsXG4gICdOQVRJT05BTCcsXG4gICdUSEVOJyxcbiAgJ0NVUlJFTlRfVElNRVNUQU1QJyxcbiAgJ05PQ0hFQ0snLFxuICAnVE8nLFxuICAnQ1VSUkVOVF9VU0VSJyxcbiAgJ05PTkNMVVNURVJFRCcsXG4gICdUT1AnLFxuICAnQ1VSU09SJyxcbiAgJ05PVCcsXG4gICdUUkFOJyxcbiAgJ0RBVEFCQVNFJyxcbiAgJ05VTEwnLFxuICAnVFJBTlNBQ1RJT04nLFxuICAnREJDQycsXG4gICdOVUxMSUYnLFxuICAnVFJJR0dFUicsXG4gICdERUFMTE9DQVRFJyxcbiAgJ09GJyxcbiAgJ1RSVU5DQVRFJyxcbiAgJ0RFQ0xBUkUnLFxuICAnT0ZGJyxcbiAgJ1RSWV9DT05WRVJUJyxcbiAgJ0RFRkFVTFQnLFxuICAnT0ZGU0VUUycsXG4gICdUU0VRVUFMJyxcbiAgJ0RFTEVURScsXG4gICdPTicsXG4gICdVTklPTicsXG4gICdERU5ZJyxcbiAgJ09QRU4nLFxuICAnVU5JUVVFJyxcbiAgJ0RFU0MnLFxuICAnT1BFTkRBVEFTT1VSQ0UnLFxuICAnVU5QSVZPVCcsXG4gICdESVNLJyxcbiAgJ09QRU5RVUVSWScsXG4gICdVUERBVEUnLFxuICAnRElTVElOQ1QnLFxuICAnT1BFTlJPV1NFVCcsXG4gICdVUERBVEVURVhUJyxcbiAgJ0RJU1RSSUJVVEVEJyxcbiAgJ09QRU5YTUwnLFxuICAnVVNFJyxcbiAgJ0RPVUJMRScsXG4gICdPUFRJT04nLFxuICAnVVNFUicsXG4gICdEUk9QJyxcbiAgJ09SJyxcbiAgJ1ZBTFVFUycsXG4gICdEVU1QJyxcbiAgJ09SREVSJyxcbiAgJ1ZBUllJTkcnLFxuICAnRUxTRScsXG4gICdPVVRFUicsXG4gICdWSUVXJyxcbiAgJ0VORCcsXG4gICdPVkVSJyxcbiAgJ1dBSVRGT1InLFxuICAnRVJSTFZMJyxcbiAgJ1BFUkNFTlQnLFxuICAnV0hFTicsXG4gICdFU0NBUEUnLFxuICAnUElWT1QnLFxuICAnV0hFUkUnLFxuICAnRVhDRVBUJyxcbiAgJ1BMQU4nLFxuICAnV0hJTEUnLFxuICAnRVhFQycsXG4gICdQUkVDSVNJT04nLFxuICAnV0lUSCcsXG4gICdFWEVDVVRFJyxcbiAgJ1BSSU1BUlknLFxuICAnV0lUSElOIEdST1VQJyxcbiAgJ0VYSVNUUycsXG4gICdQUklOVCcsXG4gICdXUklURVRFWFQnLFxuICAnRVhJVCcsXG4gICdQUk9DJyxcbl07XG5cbmNvbnN0IHJlc2VydmVkVG9wTGV2ZWxXb3JkcyA9IFtcbiAgJ0FERCcsXG4gICdBTFRFUiBDT0xVTU4nLFxuICAnQUxURVIgVEFCTEUnLFxuICAnQ0FTRScsXG4gICdERUxFVEUgRlJPTScsXG4gICdFTkQnLFxuICAnRVhDRVBUJyxcbiAgJ0ZST00nLFxuICAnR1JPVVAgQlknLFxuICAnSEFWSU5HJyxcbiAgJ0lOU0VSVCBJTlRPJyxcbiAgJ0lOU0VSVCcsXG4gICdMSU1JVCcsXG4gICdPUkRFUiBCWScsXG4gICdTRUxFQ1QnLFxuICAnU0VUIENVUlJFTlQgU0NIRU1BJyxcbiAgJ1NFVCBTQ0hFTUEnLFxuICAnU0VUJyxcbiAgJ1VQREFURScsXG4gICdWQUxVRVMnLFxuICAnV0hFUkUnLFxuXTtcblxuY29uc3QgcmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQgPSBbJ0lOVEVSU0VDVCcsICdJTlRFUlNFQ1QgQUxMJywgJ01JTlVTJywgJ1VOSU9OJywgJ1VOSU9OIEFMTCddO1xuXG5jb25zdCByZXNlcnZlZE5ld2xpbmVXb3JkcyA9IFtcbiAgJ0FORCcsXG4gICdFTFNFJyxcbiAgJ09SJyxcbiAgJ1dIRU4nLFxuICAvLyBqb2luc1xuICAnSk9JTicsXG4gICdJTk5FUiBKT0lOJyxcbiAgJ0xFRlQgSk9JTicsXG4gICdMRUZUIE9VVEVSIEpPSU4nLFxuICAnUklHSFQgSk9JTicsXG4gICdSSUdIVCBPVVRFUiBKT0lOJyxcbiAgJ0ZVTEwgSk9JTicsXG4gICdGVUxMIE9VVEVSIEpPSU4nLFxuICAnQ1JPU1MgSk9JTicsXG5dO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUU3FsRm9ybWF0dGVyIGV4dGVuZHMgRm9ybWF0dGVyIHtcbiAgdG9rZW5pemVyKCkge1xuICAgIHJldHVybiBuZXcgVG9rZW5pemVyKHtcbiAgICAgIHJlc2VydmVkV29yZHMsXG4gICAgICByZXNlcnZlZFRvcExldmVsV29yZHMsXG4gICAgICByZXNlcnZlZE5ld2xpbmVXb3JkcyxcbiAgICAgIHJlc2VydmVkVG9wTGV2ZWxXb3Jkc05vSW5kZW50LFxuICAgICAgc3RyaW5nVHlwZXM6IFtgXCJcImAsIFwiTicnXCIsIFwiJydcIiwgJ1tdJ10sXG4gICAgICBvcGVuUGFyZW5zOiBbJygnLCAnQ0FTRSddLFxuICAgICAgY2xvc2VQYXJlbnM6IFsnKScsICdFTkQnXSxcbiAgICAgIGluZGV4ZWRQbGFjZWhvbGRlclR5cGVzOiBbXSxcbiAgICAgIG5hbWVkUGxhY2Vob2xkZXJUeXBlczogWydAJ10sXG4gICAgICBsaW5lQ29tbWVudFR5cGVzOiBbJy0tJ10sXG4gICAgICBzcGVjaWFsV29yZENoYXJzOiBbJyMnLCAnQCddLFxuICAgICAgb3BlcmF0b3JzOiBbXG4gICAgICAgICc+PScsXG4gICAgICAgICc8PScsXG4gICAgICAgICc8PicsXG4gICAgICAgICchPScsXG4gICAgICAgICchPCcsXG4gICAgICAgICchPicsXG4gICAgICAgICcrPScsXG4gICAgICAgICctPScsXG4gICAgICAgICcqPScsXG4gICAgICAgICcvPScsXG4gICAgICAgICclPScsXG4gICAgICAgICd8PScsXG4gICAgICAgICcmPScsXG4gICAgICAgICdePScsXG4gICAgICAgICc6OicsXG4gICAgICBdLFxuICAgICAgLy8gVE9ETzogU3VwcG9ydCBmb3IgbW9uZXkgY29uc3RhbnRzXG4gICAgfSk7XG4gIH1cbn1cbiIsIi8vIE9ubHkgcmVtb3ZlcyBzcGFjZXMsIG5vdCBuZXdsaW5lc1xuZXhwb3J0IGNvbnN0IHRyaW1TcGFjZXNFbmQgPSAoc3RyKSA9PiBzdHIucmVwbGFjZSgvWyBcXHRdKyQvdSwgJycpO1xuXG4vLyBMYXN0IGVsZW1lbnQgZnJvbSBhcnJheVxuZXhwb3J0IGNvbnN0IGxhc3QgPSAoYXJyKSA9PiBhcnJbYXJyLmxlbmd0aCAtIDFdO1xuXG4vLyBUcnVlIGFycmF5IGlzIGVtcHR5LCBvciBpdCdzIG5vdCBhbiBhcnJheSBhdCBhbGxcbmV4cG9ydCBjb25zdCBpc0VtcHR5ID0gKGFycikgPT4gIUFycmF5LmlzQXJyYXkoYXJyKSB8fCBhcnIubGVuZ3RoID09PSAwO1xuXG4vLyBFc2NhcGVzIHJlZ2V4IHNwZWNpYWwgY2hhcnNcbmV4cG9ydCBjb25zdCBlc2NhcGVSZWdFeHAgPSAoc3RyaW5nKSA9PiBzdHJpbmcucmVwbGFjZSgvWy4qKz9eJHt9KCl8W1xcXVxcXFxdL2d1LCAnXFxcXCQmJyk7XG5cbi8vIFNvcnRzIHN0cmluZ3MgYnkgbGVuZ3RoLCBzbyB0aGF0IGxvbmdlciBvbmVzIGFyZSBmaXJzdFxuLy8gQWxzbyBzb3J0cyBhbHBoYWJldGljYWxseSBhZnRlciBzb3J0aW5nIGJ5IGxlbmd0aC5cbmV4cG9ydCBjb25zdCBzb3J0QnlMZW5ndGhEZXNjID0gKHN0cmluZ3MpID0+XG4gIHN0cmluZ3Muc29ydCgoYSwgYikgPT4ge1xuICAgIHJldHVybiBiLmxlbmd0aCAtIGEubGVuZ3RoIHx8IGEubG9jYWxlQ29tcGFyZShiKTtcbiAgfSk7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBEYjJGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvRGIyRm9ybWF0dGVyJztcbmltcG9ydCBNYXJpYURiRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL01hcmlhRGJGb3JtYXR0ZXInO1xuaW1wb3J0IE15U3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL015U3FsRm9ybWF0dGVyJztcbmltcG9ydCBOMXFsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL04xcWxGb3JtYXR0ZXInO1xuaW1wb3J0IFBsU3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1BsU3FsRm9ybWF0dGVyJztcbmltcG9ydCBQb3N0Z3JlU3FsRm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1Bvc3RncmVTcWxGb3JtYXR0ZXInO1xuaW1wb3J0IFJlZHNoaWZ0Rm9ybWF0dGVyIGZyb20gJy4vbGFuZ3VhZ2VzL1JlZHNoaWZ0Rm9ybWF0dGVyJztcbmltcG9ydCBTcGFya1NxbEZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9TcGFya1NxbEZvcm1hdHRlcic7XG5pbXBvcnQgU3RhbmRhcmRTcWxGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvU3RhbmRhcmRTcWxGb3JtYXR0ZXInO1xuaW1wb3J0IFNRTGl0ZUZvcm1hdHRlciBmcm9tICcuL2xhbmd1YWdlcy9TUUxpdGVGb3JtYXR0ZXInO1xuaW1wb3J0IFRTcWxGb3JtYXR0ZXIgZnJvbSAnLi9sYW5ndWFnZXMvVFNxbEZvcm1hdHRlcic7XG5cbmNvbnN0IGZvcm1hdHRlcnMgPSB7XG4gIGRiMjogRGIyRm9ybWF0dGVyLFxuICBtYXJpYWRiOiBNYXJpYURiRm9ybWF0dGVyLFxuICBteXNxbDogTXlTcWxGb3JtYXR0ZXIsXG4gIG4xcWw6IE4xcWxGb3JtYXR0ZXIsXG4gIHBsc3FsOiBQbFNxbEZvcm1hdHRlcixcbiAgcG9zdGdyZXNxbDogUG9zdGdyZVNxbEZvcm1hdHRlcixcbiAgcmVkc2hpZnQ6IFJlZHNoaWZ0Rm9ybWF0dGVyLFxuICBzcGFyazogU3BhcmtTcWxGb3JtYXR0ZXIsXG4gIHNxbDogU3RhbmRhcmRTcWxGb3JtYXR0ZXIsXG4gIHNxbGl0ZTogU1FMaXRlRm9ybWF0dGVyLFxuICB0c3FsOiBUU3FsRm9ybWF0dGVyLFxufTtcblxuLyoqXG4gKiBGb3JtYXQgd2hpdGVzcGFjZSBpbiBhIHF1ZXJ5IHRvIG1ha2UgaXQgZWFzaWVyIHRvIHJlYWQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5XG4gKiBAcGFyYW0ge09iamVjdH0gY2ZnXG4gKiAgQHBhcmFtIHtTdHJpbmd9IGNmZy5sYW5ndWFnZSBRdWVyeSBsYW5ndWFnZSwgZGVmYXVsdCBpcyBTdGFuZGFyZCBTUUxcbiAqICBAcGFyYW0ge1N0cmluZ30gY2ZnLmluZGVudCBDaGFyYWN0ZXJzIHVzZWQgZm9yIGluZGVudGF0aW9uLCBkZWZhdWx0IGlzIFwiICBcIiAoMiBzcGFjZXMpXG4gKiAgQHBhcmFtIHtCb29sZWFufSBjZmcudXBwZXJjYXNlIENvbnZlcnRzIGtleXdvcmRzIHRvIHVwcGVyY2FzZVxuICogIEBwYXJhbSB7SW50ZWdlcn0gY2ZnLmxpbmVzQmV0d2VlblF1ZXJpZXMgSG93IG1hbnkgbGluZSBicmVha3MgYmV0d2VlbiBxdWVyaWVzXG4gKiAgQHBhcmFtIHtPYmplY3R9IGNmZy5wYXJhbXMgQ29sbGVjdGlvbiBvZiBwYXJhbXMgZm9yIHBsYWNlaG9sZGVyIHJlcGxhY2VtZW50XG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBmb3JtYXQgPSAocXVlcnksIGNmZyA9IHt9KSA9PiB7XG4gIGlmICh0eXBlb2YgcXVlcnkgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHF1ZXJ5IGFyZ3VtZW50LiBFeHRlY3RlZCBzdHJpbmcsIGluc3RlYWQgZ290ICcgKyB0eXBlb2YgcXVlcnkpO1xuICB9XG5cbiAgbGV0IEZvcm1hdHRlciA9IFN0YW5kYXJkU3FsRm9ybWF0dGVyO1xuICBpZiAoY2ZnLmxhbmd1YWdlICE9PSB1bmRlZmluZWQpIHtcbiAgICBGb3JtYXR0ZXIgPSBmb3JtYXR0ZXJzW2NmZy5sYW5ndWFnZV07XG4gIH1cbiAgaWYgKEZvcm1hdHRlciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgRXJyb3IoYFVuc3VwcG9ydGVkIFNRTCBkaWFsZWN0OiAke2NmZy5sYW5ndWFnZX1gKTtcbiAgfVxuICByZXR1cm4gbmV3IEZvcm1hdHRlcihjZmcpLmZvcm1hdChxdWVyeSk7XG59O1xuXG5leHBvcnQgY29uc3Qgc3VwcG9ydGVkRGlhbGVjdHMgPSBPYmplY3Qua2V5cyhmb3JtYXR0ZXJzKTtcbiJdLCJuYW1lcyI6WyJ0b2tlblR5cGVzIiwiSW5kZW50YXRpb24iLCJJbmxpbmVCbG9jayIsIlBhcmFtcyIsInRyaW1TcGFjZXNFbmQiLCJpc0FuZCIsImlzQmV0d2VlbiIsImlzTGltaXQiLCJGb3JtYXR0ZXIiLCJjZmciLCJpbmRlbnRhdGlvbiIsImluZGVudCIsImlubGluZUJsb2NrIiwicGFyYW1zIiwicHJldmlvdXNSZXNlcnZlZFRva2VuIiwidG9rZW5zIiwiaW5kZXgiLCJFcnJvciIsInRva2VuIiwicXVlcnkiLCJ0b2tlbml6ZXIiLCJ0b2tlbml6ZSIsImZvcm1hdHRlZFF1ZXJ5IiwiZ2V0Rm9ybWF0dGVkUXVlcnlGcm9tVG9rZW5zIiwidHJpbSIsImZvckVhY2giLCJ0b2tlbk92ZXJyaWRlIiwidHlwZSIsIkxJTkVfQ09NTUVOVCIsImZvcm1hdExpbmVDb21tZW50IiwiQkxPQ0tfQ09NTUVOVCIsImZvcm1hdEJsb2NrQ29tbWVudCIsIlJFU0VSVkVEX1RPUF9MRVZFTCIsImZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkIiwiUkVTRVJWRURfVE9QX0xFVkVMX05PX0lOREVOVCIsImZvcm1hdFRvcExldmVsUmVzZXJ2ZWRXb3JkTm9JbmRlbnQiLCJSRVNFUlZFRF9ORVdMSU5FIiwiZm9ybWF0TmV3bGluZVJlc2VydmVkV29yZCIsIlJFU0VSVkVEIiwiZm9ybWF0V2l0aFNwYWNlcyIsIk9QRU5fUEFSRU4iLCJmb3JtYXRPcGVuaW5nUGFyZW50aGVzZXMiLCJDTE9TRV9QQVJFTiIsImZvcm1hdENsb3NpbmdQYXJlbnRoZXNlcyIsIlBMQUNFSE9MREVSIiwiZm9ybWF0UGxhY2Vob2xkZXIiLCJ2YWx1ZSIsImZvcm1hdENvbW1hIiwiZm9ybWF0V2l0aFNwYWNlQWZ0ZXIiLCJmb3JtYXRXaXRob3V0U3BhY2VzIiwiZm9ybWF0UXVlcnlTZXBhcmF0b3IiLCJhZGROZXdsaW5lIiwic2hvdyIsImluZGVudENvbW1lbnQiLCJjb21tZW50IiwicmVwbGFjZSIsImdldEluZGVudCIsImRlY3JlYXNlVG9wTGV2ZWwiLCJlcXVhbGl6ZVdoaXRlc3BhY2UiLCJpbmNyZWFzZVRvcExldmVsIiwidG9rZW5Mb29rQmVoaW5kIiwic3RyaW5nIiwicHJlc2VydmVXaGl0ZXNwYWNlRm9yIiwiT1BFUkFUT1IiLCJ3aGl0ZXNwYWNlQmVmb3JlIiwibGVuZ3RoIiwiYmVnaW5JZlBvc3NpYmxlIiwiaXNBY3RpdmUiLCJpbmNyZWFzZUJsb2NrTGV2ZWwiLCJlbmQiLCJkZWNyZWFzZUJsb2NrTGV2ZWwiLCJnZXQiLCJyZXNldEluZGVudGF0aW9uIiwicmVwZWF0IiwibGluZXNCZXR3ZWVuUXVlcmllcyIsInVwcGVyY2FzZSIsInRvVXBwZXJDYXNlIiwiZW5kc1dpdGgiLCJuIiwibGFzdCIsIklOREVOVF9UWVBFX1RPUF9MRVZFTCIsIklOREVOVF9UWVBFX0JMT0NLX0xFVkVMIiwiaW5kZW50VHlwZXMiLCJwdXNoIiwicG9wIiwiSU5MSU5FX01BWF9MRU5HVEgiLCJsZXZlbCIsImlzSW5saW5lQmxvY2siLCJpIiwiaXNGb3JiaWRkZW5Ub2tlbiIsIkNPTU1FTlQiLCJrZXkiLCJyZWdleEZhY3RvcnkiLCJlc2NhcGVSZWdFeHAiLCJUb2tlbml6ZXIiLCJXSElURVNQQUNFX1JFR0VYIiwiTlVNQkVSX1JFR0VYIiwiT1BFUkFUT1JfUkVHRVgiLCJjcmVhdGVPcGVyYXRvclJlZ2V4Iiwib3BlcmF0b3JzIiwiQkxPQ0tfQ09NTUVOVF9SRUdFWCIsIkxJTkVfQ09NTUVOVF9SRUdFWCIsImNyZWF0ZUxpbmVDb21tZW50UmVnZXgiLCJsaW5lQ29tbWVudFR5cGVzIiwiUkVTRVJWRURfVE9QX0xFVkVMX1JFR0VYIiwiY3JlYXRlUmVzZXJ2ZWRXb3JkUmVnZXgiLCJyZXNlcnZlZFRvcExldmVsV29yZHMiLCJSRVNFUlZFRF9UT1BfTEVWRUxfTk9fSU5ERU5UX1JFR0VYIiwicmVzZXJ2ZWRUb3BMZXZlbFdvcmRzTm9JbmRlbnQiLCJSRVNFUlZFRF9ORVdMSU5FX1JFR0VYIiwicmVzZXJ2ZWROZXdsaW5lV29yZHMiLCJSRVNFUlZFRF9QTEFJTl9SRUdFWCIsInJlc2VydmVkV29yZHMiLCJXT1JEX1JFR0VYIiwiY3JlYXRlV29yZFJlZ2V4Iiwic3BlY2lhbFdvcmRDaGFycyIsIlNUUklOR19SRUdFWCIsImNyZWF0ZVN0cmluZ1JlZ2V4Iiwic3RyaW5nVHlwZXMiLCJPUEVOX1BBUkVOX1JFR0VYIiwiY3JlYXRlUGFyZW5SZWdleCIsIm9wZW5QYXJlbnMiLCJDTE9TRV9QQVJFTl9SRUdFWCIsImNsb3NlUGFyZW5zIiwiSU5ERVhFRF9QTEFDRUhPTERFUl9SRUdFWCIsImNyZWF0ZVBsYWNlaG9sZGVyUmVnZXgiLCJpbmRleGVkUGxhY2Vob2xkZXJUeXBlcyIsIklERU5UX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYIiwibmFtZWRQbGFjZWhvbGRlclR5cGVzIiwiU1RSSU5HX05BTUVEX1BMQUNFSE9MREVSX1JFR0VYIiwiY3JlYXRlU3RyaW5nUGF0dGVybiIsImlucHV0IiwiZ2V0V2hpdGVzcGFjZSIsInN1YnN0cmluZyIsImdldE5leHRUb2tlbiIsIm1hdGNoZXMiLCJtYXRjaCIsInByZXZpb3VzVG9rZW4iLCJnZXRDb21tZW50VG9rZW4iLCJnZXRTdHJpbmdUb2tlbiIsImdldE9wZW5QYXJlblRva2VuIiwiZ2V0Q2xvc2VQYXJlblRva2VuIiwiZ2V0UGxhY2Vob2xkZXJUb2tlbiIsImdldE51bWJlclRva2VuIiwiZ2V0UmVzZXJ2ZWRXb3JkVG9rZW4iLCJnZXRXb3JkVG9rZW4iLCJnZXRPcGVyYXRvclRva2VuIiwiZ2V0TGluZUNvbW1lbnRUb2tlbiIsImdldEJsb2NrQ29tbWVudFRva2VuIiwiZ2V0VG9rZW5PbkZpcnN0TWF0Y2giLCJyZWdleCIsIlNUUklORyIsImdldElkZW50TmFtZWRQbGFjZWhvbGRlclRva2VuIiwiZ2V0U3RyaW5nTmFtZWRQbGFjZWhvbGRlclRva2VuIiwiZ2V0SW5kZXhlZFBsYWNlaG9sZGVyVG9rZW4iLCJnZXRQbGFjZWhvbGRlclRva2VuV2l0aEtleSIsInBhcnNlS2V5IiwidiIsInNsaWNlIiwiZ2V0RXNjYXBlZFBsYWNlaG9sZGVyS2V5IiwicXVvdGVDaGFyIiwiUmVnRXhwIiwiTlVNQkVSIiwidW5kZWZpbmVkIiwiZ2V0VG9wTGV2ZWxSZXNlcnZlZFRva2VuIiwiZ2V0TmV3bGluZVJlc2VydmVkVG9rZW4iLCJnZXRUb3BMZXZlbFJlc2VydmVkVG9rZW5Ob0luZGVudCIsImdldFBsYWluUmVzZXJ2ZWRUb2tlbiIsIldPUkQiLCJpc0VtcHR5Iiwic29ydEJ5TGVuZ3RoRGVzYyIsIm11bHRpTGV0dGVyT3BlcmF0b3JzIiwibWFwIiwiam9pbiIsImMiLCJyZXNlcnZlZFdvcmRzUGF0dGVybiIsInNwZWNpYWxDaGFycyIsInBhdHRlcm5zIiwiJCQiLCJ0IiwicGFyZW5zIiwiZXNjYXBlUGFyZW4iLCJwYXJlbiIsInR5cGVzIiwicGF0dGVybiIsInR5cGVzUmVnZXgiLCJpc1Rva2VuIiwidGVzdCIsImlzU2V0IiwiaXNCeSIsImlzV2luZG93IiwiaXNFbmQiLCJEYjJGb3JtYXR0ZXIiLCJNYXJpYURiRm9ybWF0dGVyIiwiTXlTcWxGb3JtYXR0ZXIiLCJOMXFsRm9ybWF0dGVyIiwiUGxTcWxGb3JtYXR0ZXIiLCJQb3N0Z3JlU3FsRm9ybWF0dGVyIiwiUmVkc2hpZnRGb3JtYXR0ZXIiLCJzdGFuZGFyZFJlc2VydmVkV29yZHMiLCJub25TdGFuZGFyZFNxbGl0ZVJlc2VydmVkV29yZHMiLCJTdGFuZGFyZFNxbEZvcm1hdHRlciIsIlNwYXJrU3FsRm9ybWF0dGVyIiwiYWhlYWRUb2tlbiIsInRva2VuTG9va0FoZWFkIiwiYmFja1Rva2VuIiwiVFNxbEZvcm1hdHRlciIsInN0ciIsImFyciIsIkFycmF5IiwiaXNBcnJheSIsInN0cmluZ3MiLCJzb3J0IiwiYSIsImIiLCJsb2NhbGVDb21wYXJlIiwiU1FMaXRlRm9ybWF0dGVyIiwiZm9ybWF0dGVycyIsImRiMiIsIm1hcmlhZGIiLCJteXNxbCIsIm4xcWwiLCJwbHNxbCIsInBvc3RncmVzcWwiLCJyZWRzaGlmdCIsInNwYXJrIiwic3FsIiwic3FsaXRlIiwidHNxbCIsImZvcm1hdCIsImxhbmd1YWdlIiwic3VwcG9ydGVkRGlhbGVjdHMiLCJPYmplY3QiLCJrZXlzIl0sInNvdXJjZVJvb3QiOiIifQ==
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, copyDefault, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module2, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", !isNodeMode && module2 && module2.__esModule ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
var __toCommonJS = /* @__PURE__ */ ((cache) => {
  return (module2, temp) => {
    return cache && cache.get(module2) || (temp = __reExport(__markAsModule({}), module2, 1), cache && cache.set(module2, temp), temp);
  };
})(typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : 0);

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React;
var init_react = __esm({
  "node_modules/@remix-run/dev/compiler/shims/react.ts"() {
    React = __toESM(require("react"));
  }
});

// node_modules/ts-invariant/lib/invariant.cjs
var require_invariant = __commonJS({
  "node_modules/ts-invariant/lib/invariant.cjs"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib = require("tslib");
    var genericMessage = "Invariant Violation";
    var _a = Object.setPrototypeOf;
    var setPrototypeOf = _a === void 0 ? function(obj, proto) {
      obj.__proto__ = proto;
      return obj;
    } : _a;
    var InvariantError = function(_super) {
      tslib.__extends(InvariantError2, _super);
      function InvariantError2(message) {
        if (message === void 0) {
          message = genericMessage;
        }
        var _this = _super.call(this, typeof message === "number" ? genericMessage + ": " + message + " (see https://github.com/apollographql/invariant-packages)" : message) || this;
        _this.framesToPop = 1;
        _this.name = genericMessage;
        setPrototypeOf(_this, InvariantError2.prototype);
        return _this;
      }
      return InvariantError2;
    }(Error);
    function invariant(condition, message) {
      if (!condition) {
        throw new InvariantError(message);
      }
    }
    var verbosityLevels = ["debug", "log", "warn", "error", "silent"];
    var verbosityLevel = verbosityLevels.indexOf("log");
    function wrapConsoleMethod(name) {
      return function() {
        if (verbosityLevels.indexOf(name) >= verbosityLevel) {
          var method = console[name] || console.log;
          return method.apply(console, arguments);
        }
      };
    }
    (function(invariant2) {
      invariant2.debug = wrapConsoleMethod("debug");
      invariant2.log = wrapConsoleMethod("log");
      invariant2.warn = wrapConsoleMethod("warn");
      invariant2.error = wrapConsoleMethod("error");
    })(invariant || (invariant = {}));
    function setVerbosity(level) {
      var old = verbosityLevels[verbosityLevel];
      verbosityLevel = Math.max(0, verbosityLevels.indexOf(level));
      return old;
    }
    var invariant$1 = invariant;
    exports.InvariantError = InvariantError;
    exports["default"] = invariant$1;
    exports.invariant = invariant;
    exports.setVerbosity = setVerbosity;
  }
});

// node_modules/@apollo/client/utilities/globals/globals.cjs
var require_globals = __commonJS({
  "node_modules/@apollo/client/utilities/globals/globals.cjs"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tsInvariant = require_invariant();
    var process$1 = require("ts-invariant/process");
    var graphql = require("graphql");
    function maybe(thunk) {
      try {
        return thunk();
      } catch (_a) {
      }
    }
    var global$1 = maybe(function() {
      return globalThis;
    }) || maybe(function() {
      return window;
    }) || maybe(function() {
      return self;
    }) || maybe(function() {
      return global;
    }) || maybe(function() {
      return maybe.constructor("return this")();
    });
    var __ = "__";
    var GLOBAL_KEY = [__, __].join("DEV");
    function getDEV() {
      try {
        return Boolean(__DEV__);
      } catch (_a) {
        Object.defineProperty(global$1, GLOBAL_KEY, {
          value: maybe(function() {
            return "development";
          }) !== "production",
          enumerable: false,
          configurable: true,
          writable: true
        });
        return global$1[GLOBAL_KEY];
      }
    }
    var DEV = getDEV();
    function removeTemporaryGlobals() {
      return typeof graphql.Source === "function" ? process$1.remove() : process$1.remove();
    }
    function checkDEV() {
      __DEV__ ? tsInvariant.invariant(typeof DEV === "boolean", DEV) : tsInvariant.invariant(typeof DEV === "boolean", 36);
    }
    removeTemporaryGlobals();
    checkDEV();
    exports.InvariantError = tsInvariant.InvariantError;
    exports.invariant = tsInvariant.invariant;
    exports.DEV = DEV;
    exports.checkDEV = checkDEV;
    exports.global = global$1;
    exports.maybe = maybe;
  }
});

// node_modules/zen-observable-ts/index.cjs
var require_zen_observable_ts = __commonJS({
  "node_modules/zen-observable-ts/index.cjs"(exports) {
    init_react();
    exports.Observable = require("zen-observable/index.js");
  }
});

// node_modules/@apollo/client/utilities/utilities.cjs
var require_utilities = __commonJS({
  "node_modules/@apollo/client/utilities/utilities.cjs"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var globals = require_globals();
    var graphql = require("graphql");
    var tslib = require("tslib");
    var zenObservableTs = require_zen_observable_ts();
    require("symbol-observable");
    function shouldInclude(_a, variables) {
      var directives = _a.directives;
      if (!directives || !directives.length) {
        return true;
      }
      return getInclusionDirectives(directives).every(function(_a2) {
        var directive = _a2.directive, ifArgument = _a2.ifArgument;
        var evaledValue = false;
        if (ifArgument.value.kind === "Variable") {
          evaledValue = variables && variables[ifArgument.value.name.value];
          __DEV__ ? globals.invariant(evaledValue !== void 0, "Invalid variable referenced in @".concat(directive.name.value, " directive.")) : globals.invariant(evaledValue !== void 0, 37);
        } else {
          evaledValue = ifArgument.value.value;
        }
        return directive.name.value === "skip" ? !evaledValue : evaledValue;
      });
    }
    function getDirectiveNames(root) {
      var names = [];
      graphql.visit(root, {
        Directive: function(node) {
          names.push(node.name.value);
        }
      });
      return names;
    }
    function hasDirectives(names, root) {
      return getDirectiveNames(root).some(function(name) {
        return names.indexOf(name) > -1;
      });
    }
    function hasClientExports(document) {
      return document && hasDirectives(["client"], document) && hasDirectives(["export"], document);
    }
    function isInclusionDirective(_a) {
      var value = _a.name.value;
      return value === "skip" || value === "include";
    }
    function getInclusionDirectives(directives) {
      var result = [];
      if (directives && directives.length) {
        directives.forEach(function(directive) {
          if (!isInclusionDirective(directive))
            return;
          var directiveArguments = directive.arguments;
          var directiveName = directive.name.value;
          __DEV__ ? globals.invariant(directiveArguments && directiveArguments.length === 1, "Incorrect number of arguments for the @".concat(directiveName, " directive.")) : globals.invariant(directiveArguments && directiveArguments.length === 1, 38);
          var ifArgument = directiveArguments[0];
          __DEV__ ? globals.invariant(ifArgument.name && ifArgument.name.value === "if", "Invalid argument for the @".concat(directiveName, " directive.")) : globals.invariant(ifArgument.name && ifArgument.name.value === "if", 39);
          var ifValue = ifArgument.value;
          __DEV__ ? globals.invariant(ifValue && (ifValue.kind === "Variable" || ifValue.kind === "BooleanValue"), "Argument for the @".concat(directiveName, " directive must be a variable or a boolean value.")) : globals.invariant(ifValue && (ifValue.kind === "Variable" || ifValue.kind === "BooleanValue"), 40);
          result.push({ directive, ifArgument });
        });
      }
      return result;
    }
    function getFragmentQueryDocument(document, fragmentName) {
      var actualFragmentName = fragmentName;
      var fragments = [];
      document.definitions.forEach(function(definition) {
        if (definition.kind === "OperationDefinition") {
          throw __DEV__ ? new globals.InvariantError("Found a ".concat(definition.operation, " operation").concat(definition.name ? " named '".concat(definition.name.value, "'") : "", ". ") + "No operations are allowed when using a fragment as a query. Only fragments are allowed.") : new globals.InvariantError(41);
        }
        if (definition.kind === "FragmentDefinition") {
          fragments.push(definition);
        }
      });
      if (typeof actualFragmentName === "undefined") {
        __DEV__ ? globals.invariant(fragments.length === 1, "Found ".concat(fragments.length, " fragments. `fragmentName` must be provided when there is not exactly 1 fragment.")) : globals.invariant(fragments.length === 1, 42);
        actualFragmentName = fragments[0].name.value;
      }
      var query = tslib.__assign(tslib.__assign({}, document), { definitions: tslib.__spreadArray([
        {
          kind: "OperationDefinition",
          operation: "query",
          selectionSet: {
            kind: "SelectionSet",
            selections: [
              {
                kind: "FragmentSpread",
                name: {
                  kind: "Name",
                  value: actualFragmentName
                }
              }
            ]
          }
        }
      ], document.definitions, true) });
      return query;
    }
    function createFragmentMap(fragments) {
      if (fragments === void 0) {
        fragments = [];
      }
      var symTable = {};
      fragments.forEach(function(fragment) {
        symTable[fragment.name.value] = fragment;
      });
      return symTable;
    }
    function getFragmentFromSelection(selection, fragmentMap) {
      switch (selection.kind) {
        case "InlineFragment":
          return selection;
        case "FragmentSpread": {
          var fragment = fragmentMap && fragmentMap[selection.name.value];
          __DEV__ ? globals.invariant(fragment, "No fragment named ".concat(selection.name.value, ".")) : globals.invariant(fragment, 43);
          return fragment;
        }
        default:
          return null;
      }
    }
    function isNonNullObject(obj) {
      return obj !== null && typeof obj === "object";
    }
    function makeReference(id) {
      return { __ref: String(id) };
    }
    function isReference(obj) {
      return Boolean(obj && typeof obj === "object" && typeof obj.__ref === "string");
    }
    function isDocumentNode(value) {
      return isNonNullObject(value) && value.kind === "Document" && Array.isArray(value.definitions);
    }
    function isStringValue(value) {
      return value.kind === "StringValue";
    }
    function isBooleanValue(value) {
      return value.kind === "BooleanValue";
    }
    function isIntValue(value) {
      return value.kind === "IntValue";
    }
    function isFloatValue(value) {
      return value.kind === "FloatValue";
    }
    function isVariable(value) {
      return value.kind === "Variable";
    }
    function isObjectValue(value) {
      return value.kind === "ObjectValue";
    }
    function isListValue(value) {
      return value.kind === "ListValue";
    }
    function isEnumValue(value) {
      return value.kind === "EnumValue";
    }
    function isNullValue(value) {
      return value.kind === "NullValue";
    }
    function valueToObjectRepresentation(argObj, name, value, variables) {
      if (isIntValue(value) || isFloatValue(value)) {
        argObj[name.value] = Number(value.value);
      } else if (isBooleanValue(value) || isStringValue(value)) {
        argObj[name.value] = value.value;
      } else if (isObjectValue(value)) {
        var nestedArgObj_1 = {};
        value.fields.map(function(obj) {
          return valueToObjectRepresentation(nestedArgObj_1, obj.name, obj.value, variables);
        });
        argObj[name.value] = nestedArgObj_1;
      } else if (isVariable(value)) {
        var variableValue = (variables || {})[value.name.value];
        argObj[name.value] = variableValue;
      } else if (isListValue(value)) {
        argObj[name.value] = value.values.map(function(listValue) {
          var nestedArgArrayObj = {};
          valueToObjectRepresentation(nestedArgArrayObj, name, listValue, variables);
          return nestedArgArrayObj[name.value];
        });
      } else if (isEnumValue(value)) {
        argObj[name.value] = value.value;
      } else if (isNullValue(value)) {
        argObj[name.value] = null;
      } else {
        throw __DEV__ ? new globals.InvariantError('The inline argument "'.concat(name.value, '" of kind "').concat(value.kind, '"') + "is not supported. Use variables instead of inline arguments to overcome this limitation.") : new globals.InvariantError(52);
      }
    }
    function storeKeyNameFromField(field, variables) {
      var directivesObj = null;
      if (field.directives) {
        directivesObj = {};
        field.directives.forEach(function(directive) {
          directivesObj[directive.name.value] = {};
          if (directive.arguments) {
            directive.arguments.forEach(function(_a) {
              var name = _a.name, value = _a.value;
              return valueToObjectRepresentation(directivesObj[directive.name.value], name, value, variables);
            });
          }
        });
      }
      var argObj = null;
      if (field.arguments && field.arguments.length) {
        argObj = {};
        field.arguments.forEach(function(_a) {
          var name = _a.name, value = _a.value;
          return valueToObjectRepresentation(argObj, name, value, variables);
        });
      }
      return getStoreKeyName(field.name.value, argObj, directivesObj);
    }
    var KNOWN_DIRECTIVES = [
      "connection",
      "include",
      "skip",
      "client",
      "rest",
      "export"
    ];
    var getStoreKeyName = Object.assign(function(fieldName, args, directives) {
      if (args && directives && directives["connection"] && directives["connection"]["key"]) {
        if (directives["connection"]["filter"] && directives["connection"]["filter"].length > 0) {
          var filterKeys = directives["connection"]["filter"] ? directives["connection"]["filter"] : [];
          filterKeys.sort();
          var filteredArgs_1 = {};
          filterKeys.forEach(function(key) {
            filteredArgs_1[key] = args[key];
          });
          return "".concat(directives["connection"]["key"], "(").concat(stringify(filteredArgs_1), ")");
        } else {
          return directives["connection"]["key"];
        }
      }
      var completeFieldName = fieldName;
      if (args) {
        var stringifiedArgs = stringify(args);
        completeFieldName += "(".concat(stringifiedArgs, ")");
      }
      if (directives) {
        Object.keys(directives).forEach(function(key) {
          if (KNOWN_DIRECTIVES.indexOf(key) !== -1)
            return;
          if (directives[key] && Object.keys(directives[key]).length) {
            completeFieldName += "@".concat(key, "(").concat(stringify(directives[key]), ")");
          } else {
            completeFieldName += "@".concat(key);
          }
        });
      }
      return completeFieldName;
    }, {
      setStringify: function(s) {
        var previous = stringify;
        stringify = s;
        return previous;
      }
    });
    var stringify = function defaultStringify(value) {
      return JSON.stringify(value, stringifyReplacer);
    };
    function stringifyReplacer(_key, value) {
      if (isNonNullObject(value) && !Array.isArray(value)) {
        value = Object.keys(value).sort().reduce(function(copy, key) {
          copy[key] = value[key];
          return copy;
        }, {});
      }
      return value;
    }
    function argumentsObjectFromField(field, variables) {
      if (field.arguments && field.arguments.length) {
        var argObj_1 = {};
        field.arguments.forEach(function(_a) {
          var name = _a.name, value = _a.value;
          return valueToObjectRepresentation(argObj_1, name, value, variables);
        });
        return argObj_1;
      }
      return null;
    }
    function resultKeyNameFromField(field) {
      return field.alias ? field.alias.value : field.name.value;
    }
    function getTypenameFromResult(result, selectionSet, fragmentMap) {
      if (typeof result.__typename === "string") {
        return result.__typename;
      }
      for (var _i = 0, _a = selectionSet.selections; _i < _a.length; _i++) {
        var selection = _a[_i];
        if (isField(selection)) {
          if (selection.name.value === "__typename") {
            return result[resultKeyNameFromField(selection)];
          }
        } else {
          var typename = getTypenameFromResult(result, getFragmentFromSelection(selection, fragmentMap).selectionSet, fragmentMap);
          if (typeof typename === "string") {
            return typename;
          }
        }
      }
    }
    function isField(selection) {
      return selection.kind === "Field";
    }
    function isInlineFragment(selection) {
      return selection.kind === "InlineFragment";
    }
    function checkDocument(doc) {
      __DEV__ ? globals.invariant(doc && doc.kind === "Document", 'Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a "gql" tag? http://docs.apollostack.com/apollo-client/core.html#gql') : globals.invariant(doc && doc.kind === "Document", 44);
      var operations = doc.definitions.filter(function(d) {
        return d.kind !== "FragmentDefinition";
      }).map(function(definition) {
        if (definition.kind !== "OperationDefinition") {
          throw __DEV__ ? new globals.InvariantError('Schema type definitions not allowed in queries. Found: "'.concat(definition.kind, '"')) : new globals.InvariantError(45);
        }
        return definition;
      });
      __DEV__ ? globals.invariant(operations.length <= 1, "Ambiguous GraphQL document: contains ".concat(operations.length, " operations")) : globals.invariant(operations.length <= 1, 46);
      return doc;
    }
    function getOperationDefinition(doc) {
      checkDocument(doc);
      return doc.definitions.filter(function(definition) {
        return definition.kind === "OperationDefinition";
      })[0];
    }
    function getOperationName(doc) {
      return doc.definitions.filter(function(definition) {
        return definition.kind === "OperationDefinition" && definition.name;
      }).map(function(x) {
        return x.name.value;
      })[0] || null;
    }
    function getFragmentDefinitions(doc) {
      return doc.definitions.filter(function(definition) {
        return definition.kind === "FragmentDefinition";
      });
    }
    function getQueryDefinition(doc) {
      var queryDef = getOperationDefinition(doc);
      __DEV__ ? globals.invariant(queryDef && queryDef.operation === "query", "Must contain a query definition.") : globals.invariant(queryDef && queryDef.operation === "query", 47);
      return queryDef;
    }
    function getFragmentDefinition(doc) {
      __DEV__ ? globals.invariant(doc.kind === "Document", 'Expecting a parsed GraphQL document. Perhaps you need to wrap the query string in a "gql" tag? http://docs.apollostack.com/apollo-client/core.html#gql') : globals.invariant(doc.kind === "Document", 48);
      __DEV__ ? globals.invariant(doc.definitions.length <= 1, "Fragment must have exactly one definition.") : globals.invariant(doc.definitions.length <= 1, 49);
      var fragmentDef = doc.definitions[0];
      __DEV__ ? globals.invariant(fragmentDef.kind === "FragmentDefinition", "Must be a fragment definition.") : globals.invariant(fragmentDef.kind === "FragmentDefinition", 50);
      return fragmentDef;
    }
    function getMainDefinition(queryDoc) {
      checkDocument(queryDoc);
      var fragmentDefinition;
      for (var _i = 0, _a = queryDoc.definitions; _i < _a.length; _i++) {
        var definition = _a[_i];
        if (definition.kind === "OperationDefinition") {
          var operation = definition.operation;
          if (operation === "query" || operation === "mutation" || operation === "subscription") {
            return definition;
          }
        }
        if (definition.kind === "FragmentDefinition" && !fragmentDefinition) {
          fragmentDefinition = definition;
        }
      }
      if (fragmentDefinition) {
        return fragmentDefinition;
      }
      throw __DEV__ ? new globals.InvariantError("Expected a parsed GraphQL query with a query, mutation, subscription, or a fragment.") : new globals.InvariantError(51);
    }
    function getDefaultValues(definition) {
      var defaultValues = /* @__PURE__ */ Object.create(null);
      var defs = definition && definition.variableDefinitions;
      if (defs && defs.length) {
        defs.forEach(function(def) {
          if (def.defaultValue) {
            valueToObjectRepresentation(defaultValues, def.variable.name, def.defaultValue);
          }
        });
      }
      return defaultValues;
    }
    function filterInPlace(array, test, context) {
      var target = 0;
      array.forEach(function(elem, i) {
        if (test.call(this, elem, i, array)) {
          array[target++] = elem;
        }
      }, context);
      array.length = target;
      return array;
    }
    var TYPENAME_FIELD = {
      kind: "Field",
      name: {
        kind: "Name",
        value: "__typename"
      }
    };
    function isEmpty(op, fragments) {
      return op.selectionSet.selections.every(function(selection) {
        return selection.kind === "FragmentSpread" && isEmpty(fragments[selection.name.value], fragments);
      });
    }
    function nullIfDocIsEmpty(doc) {
      return isEmpty(getOperationDefinition(doc) || getFragmentDefinition(doc), createFragmentMap(getFragmentDefinitions(doc))) ? null : doc;
    }
    function getDirectiveMatcher(directives) {
      return function directiveMatcher(directive) {
        return directives.some(function(dir) {
          return dir.name && dir.name === directive.name.value || dir.test && dir.test(directive);
        });
      };
    }
    function removeDirectivesFromDocument(directives, doc) {
      var variablesInUse = /* @__PURE__ */ Object.create(null);
      var variablesToRemove = [];
      var fragmentSpreadsInUse = /* @__PURE__ */ Object.create(null);
      var fragmentSpreadsToRemove = [];
      var modifiedDoc = nullIfDocIsEmpty(graphql.visit(doc, {
        Variable: {
          enter: function(node, _key, parent) {
            if (parent.kind !== "VariableDefinition") {
              variablesInUse[node.name.value] = true;
            }
          }
        },
        Field: {
          enter: function(node) {
            if (directives && node.directives) {
              var shouldRemoveField = directives.some(function(directive) {
                return directive.remove;
              });
              if (shouldRemoveField && node.directives && node.directives.some(getDirectiveMatcher(directives))) {
                if (node.arguments) {
                  node.arguments.forEach(function(arg) {
                    if (arg.value.kind === "Variable") {
                      variablesToRemove.push({
                        name: arg.value.name.value
                      });
                    }
                  });
                }
                if (node.selectionSet) {
                  getAllFragmentSpreadsFromSelectionSet(node.selectionSet).forEach(function(frag) {
                    fragmentSpreadsToRemove.push({
                      name: frag.name.value
                    });
                  });
                }
                return null;
              }
            }
          }
        },
        FragmentSpread: {
          enter: function(node) {
            fragmentSpreadsInUse[node.name.value] = true;
          }
        },
        Directive: {
          enter: function(node) {
            if (getDirectiveMatcher(directives)(node)) {
              return null;
            }
          }
        }
      }));
      if (modifiedDoc && filterInPlace(variablesToRemove, function(v) {
        return !!v.name && !variablesInUse[v.name];
      }).length) {
        modifiedDoc = removeArgumentsFromDocument(variablesToRemove, modifiedDoc);
      }
      if (modifiedDoc && filterInPlace(fragmentSpreadsToRemove, function(fs) {
        return !!fs.name && !fragmentSpreadsInUse[fs.name];
      }).length) {
        modifiedDoc = removeFragmentSpreadFromDocument(fragmentSpreadsToRemove, modifiedDoc);
      }
      return modifiedDoc;
    }
    var addTypenameToDocument = Object.assign(function(doc) {
      return graphql.visit(doc, {
        SelectionSet: {
          enter: function(node, _key, parent) {
            if (parent && parent.kind === "OperationDefinition") {
              return;
            }
            var selections = node.selections;
            if (!selections) {
              return;
            }
            var skip = selections.some(function(selection) {
              return isField(selection) && (selection.name.value === "__typename" || selection.name.value.lastIndexOf("__", 0) === 0);
            });
            if (skip) {
              return;
            }
            var field = parent;
            if (isField(field) && field.directives && field.directives.some(function(d) {
              return d.name.value === "export";
            })) {
              return;
            }
            return tslib.__assign(tslib.__assign({}, node), { selections: tslib.__spreadArray(tslib.__spreadArray([], selections, true), [TYPENAME_FIELD], false) });
          }
        }
      });
    }, {
      added: function(field) {
        return field === TYPENAME_FIELD;
      }
    });
    var connectionRemoveConfig = {
      test: function(directive) {
        var willRemove = directive.name.value === "connection";
        if (willRemove) {
          if (!directive.arguments || !directive.arguments.some(function(arg) {
            return arg.name.value === "key";
          })) {
            __DEV__ && globals.invariant.warn("Removing an @connection directive even though it does not have a key. You may want to use the key parameter to specify a store key.");
          }
        }
        return willRemove;
      }
    };
    function removeConnectionDirectiveFromDocument(doc) {
      return removeDirectivesFromDocument([connectionRemoveConfig], checkDocument(doc));
    }
    function getArgumentMatcher(config) {
      return function argumentMatcher(argument) {
        return config.some(function(aConfig) {
          return argument.value && argument.value.kind === "Variable" && argument.value.name && (aConfig.name === argument.value.name.value || aConfig.test && aConfig.test(argument));
        });
      };
    }
    function removeArgumentsFromDocument(config, doc) {
      var argMatcher = getArgumentMatcher(config);
      return nullIfDocIsEmpty(graphql.visit(doc, {
        OperationDefinition: {
          enter: function(node) {
            return tslib.__assign(tslib.__assign({}, node), { variableDefinitions: node.variableDefinitions ? node.variableDefinitions.filter(function(varDef) {
              return !config.some(function(arg) {
                return arg.name === varDef.variable.name.value;
              });
            }) : [] });
          }
        },
        Field: {
          enter: function(node) {
            var shouldRemoveField = config.some(function(argConfig) {
              return argConfig.remove;
            });
            if (shouldRemoveField) {
              var argMatchCount_1 = 0;
              if (node.arguments) {
                node.arguments.forEach(function(arg) {
                  if (argMatcher(arg)) {
                    argMatchCount_1 += 1;
                  }
                });
              }
              if (argMatchCount_1 === 1) {
                return null;
              }
            }
          }
        },
        Argument: {
          enter: function(node) {
            if (argMatcher(node)) {
              return null;
            }
          }
        }
      }));
    }
    function removeFragmentSpreadFromDocument(config, doc) {
      function enter(node) {
        if (config.some(function(def) {
          return def.name === node.name.value;
        })) {
          return null;
        }
      }
      return nullIfDocIsEmpty(graphql.visit(doc, {
        FragmentSpread: { enter },
        FragmentDefinition: { enter }
      }));
    }
    function getAllFragmentSpreadsFromSelectionSet(selectionSet) {
      var allFragments = [];
      selectionSet.selections.forEach(function(selection) {
        if ((isField(selection) || isInlineFragment(selection)) && selection.selectionSet) {
          getAllFragmentSpreadsFromSelectionSet(selection.selectionSet).forEach(function(frag) {
            return allFragments.push(frag);
          });
        } else if (selection.kind === "FragmentSpread") {
          allFragments.push(selection);
        }
      });
      return allFragments;
    }
    function buildQueryFromSelectionSet(document) {
      var definition = getMainDefinition(document);
      var definitionOperation = definition.operation;
      if (definitionOperation === "query") {
        return document;
      }
      var modifiedDoc = graphql.visit(document, {
        OperationDefinition: {
          enter: function(node) {
            return tslib.__assign(tslib.__assign({}, node), { operation: "query" });
          }
        }
      });
      return modifiedDoc;
    }
    function removeClientSetsFromDocument(document) {
      checkDocument(document);
      var modifiedDoc = removeDirectivesFromDocument([
        {
          test: function(directive) {
            return directive.name.value === "client";
          },
          remove: true
        }
      ], document);
      if (modifiedDoc) {
        modifiedDoc = graphql.visit(modifiedDoc, {
          FragmentDefinition: {
            enter: function(node) {
              if (node.selectionSet) {
                var isTypenameOnly = node.selectionSet.selections.every(function(selection) {
                  return isField(selection) && selection.name.value === "__typename";
                });
                if (isTypenameOnly) {
                  return null;
                }
              }
            }
          }
        });
      }
      return modifiedDoc;
    }
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function mergeDeep() {
      var sources = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        sources[_i] = arguments[_i];
      }
      return mergeDeepArray(sources);
    }
    function mergeDeepArray(sources) {
      var target = sources[0] || {};
      var count = sources.length;
      if (count > 1) {
        var merger = new DeepMerger();
        for (var i = 1; i < count; ++i) {
          target = merger.merge(target, sources[i]);
        }
      }
      return target;
    }
    var defaultReconciler = function(target, source, property) {
      return this.merge(target[property], source[property]);
    };
    var DeepMerger = function() {
      function DeepMerger2(reconciler) {
        if (reconciler === void 0) {
          reconciler = defaultReconciler;
        }
        this.reconciler = reconciler;
        this.isObject = isNonNullObject;
        this.pastCopies = /* @__PURE__ */ new Set();
      }
      DeepMerger2.prototype.merge = function(target, source) {
        var _this = this;
        var context = [];
        for (var _i = 2; _i < arguments.length; _i++) {
          context[_i - 2] = arguments[_i];
        }
        if (isNonNullObject(source) && isNonNullObject(target)) {
          Object.keys(source).forEach(function(sourceKey) {
            if (hasOwnProperty.call(target, sourceKey)) {
              var targetValue = target[sourceKey];
              if (source[sourceKey] !== targetValue) {
                var result = _this.reconciler.apply(_this, tslib.__spreadArray([target, source, sourceKey], context, false));
                if (result !== targetValue) {
                  target = _this.shallowCopyForMerge(target);
                  target[sourceKey] = result;
                }
              }
            } else {
              target = _this.shallowCopyForMerge(target);
              target[sourceKey] = source[sourceKey];
            }
          });
          return target;
        }
        return source;
      };
      DeepMerger2.prototype.shallowCopyForMerge = function(value) {
        if (isNonNullObject(value)) {
          if (!this.pastCopies.has(value)) {
            if (Array.isArray(value)) {
              value = value.slice(0);
            } else {
              value = tslib.__assign({ __proto__: Object.getPrototypeOf(value) }, value);
            }
            this.pastCopies.add(value);
          }
        }
        return value;
      };
      return DeepMerger2;
    }();
    function concatPagination(keyArgs) {
      if (keyArgs === void 0) {
        keyArgs = false;
      }
      return {
        keyArgs,
        merge: function(existing, incoming) {
          return existing ? tslib.__spreadArray(tslib.__spreadArray([], existing, true), incoming, true) : incoming;
        }
      };
    }
    function offsetLimitPagination(keyArgs) {
      if (keyArgs === void 0) {
        keyArgs = false;
      }
      return {
        keyArgs,
        merge: function(existing, incoming, _a) {
          var args = _a.args;
          var merged = existing ? existing.slice(0) : [];
          if (incoming) {
            if (args) {
              var _b = args.offset, offset = _b === void 0 ? 0 : _b;
              for (var i = 0; i < incoming.length; ++i) {
                merged[offset + i] = incoming[i];
              }
            } else {
              merged.push.apply(merged, incoming);
            }
          }
          return merged;
        }
      };
    }
    function relayStylePagination(keyArgs) {
      if (keyArgs === void 0) {
        keyArgs = false;
      }
      return {
        keyArgs,
        read: function(existing, _a) {
          var canRead = _a.canRead, readField = _a.readField;
          if (!existing)
            return existing;
          var edges = [];
          var firstEdgeCursor = "";
          var lastEdgeCursor = "";
          existing.edges.forEach(function(edge) {
            if (canRead(readField("node", edge))) {
              edges.push(edge);
              if (edge.cursor) {
                firstEdgeCursor = firstEdgeCursor || edge.cursor || "";
                lastEdgeCursor = edge.cursor || lastEdgeCursor;
              }
            }
          });
          var _b = existing.pageInfo || {}, startCursor = _b.startCursor, endCursor = _b.endCursor;
          return tslib.__assign(tslib.__assign({}, getExtras(existing)), { edges, pageInfo: tslib.__assign(tslib.__assign({}, existing.pageInfo), { startCursor: startCursor || firstEdgeCursor, endCursor: endCursor || lastEdgeCursor }) });
        },
        merge: function(existing, incoming, _a) {
          var args = _a.args, isReference2 = _a.isReference, readField = _a.readField;
          if (!existing) {
            existing = makeEmptyData();
          }
          if (!incoming) {
            return existing;
          }
          var incomingEdges = incoming.edges ? incoming.edges.map(function(edge) {
            if (isReference2(edge = tslib.__assign({}, edge))) {
              edge.cursor = readField("cursor", edge);
            }
            return edge;
          }) : [];
          if (incoming.pageInfo) {
            var pageInfo_1 = incoming.pageInfo;
            var startCursor = pageInfo_1.startCursor, endCursor = pageInfo_1.endCursor;
            var firstEdge = incomingEdges[0];
            var lastEdge = incomingEdges[incomingEdges.length - 1];
            if (firstEdge && startCursor) {
              firstEdge.cursor = startCursor;
            }
            if (lastEdge && endCursor) {
              lastEdge.cursor = endCursor;
            }
            var firstCursor = firstEdge && firstEdge.cursor;
            if (firstCursor && !startCursor) {
              incoming = mergeDeep(incoming, {
                pageInfo: {
                  startCursor: firstCursor
                }
              });
            }
            var lastCursor = lastEdge && lastEdge.cursor;
            if (lastCursor && !endCursor) {
              incoming = mergeDeep(incoming, {
                pageInfo: {
                  endCursor: lastCursor
                }
              });
            }
          }
          var prefix = existing.edges;
          var suffix = [];
          if (args && args.after) {
            var index = prefix.findIndex(function(edge) {
              return edge.cursor === args.after;
            });
            if (index >= 0) {
              prefix = prefix.slice(0, index + 1);
            }
          } else if (args && args.before) {
            var index = prefix.findIndex(function(edge) {
              return edge.cursor === args.before;
            });
            suffix = index < 0 ? prefix : prefix.slice(index);
            prefix = [];
          } else if (incoming.edges) {
            prefix = [];
          }
          var edges = tslib.__spreadArray(tslib.__spreadArray(tslib.__spreadArray([], prefix, true), incomingEdges, true), suffix, true);
          var pageInfo = tslib.__assign(tslib.__assign({}, incoming.pageInfo), existing.pageInfo);
          if (incoming.pageInfo) {
            var _b = incoming.pageInfo, hasPreviousPage = _b.hasPreviousPage, hasNextPage = _b.hasNextPage, startCursor = _b.startCursor, endCursor = _b.endCursor, extras = tslib.__rest(_b, ["hasPreviousPage", "hasNextPage", "startCursor", "endCursor"]);
            Object.assign(pageInfo, extras);
            if (!prefix.length) {
              if (hasPreviousPage !== void 0)
                pageInfo.hasPreviousPage = hasPreviousPage;
              if (startCursor !== void 0)
                pageInfo.startCursor = startCursor;
            }
            if (!suffix.length) {
              if (hasNextPage !== void 0)
                pageInfo.hasNextPage = hasNextPage;
              if (endCursor !== void 0)
                pageInfo.endCursor = endCursor;
            }
          }
          return tslib.__assign(tslib.__assign(tslib.__assign({}, getExtras(existing)), getExtras(incoming)), { edges, pageInfo });
        }
      };
    }
    var getExtras = function(obj) {
      return tslib.__rest(obj, notExtras);
    };
    var notExtras = ["edges", "pageInfo"];
    function makeEmptyData() {
      return {
        edges: [],
        pageInfo: {
          hasPreviousPage: false,
          hasNextPage: true,
          startCursor: "",
          endCursor: ""
        }
      };
    }
    var toString = Object.prototype.toString;
    function cloneDeep(value) {
      return cloneDeepHelper(value);
    }
    function cloneDeepHelper(val, seen) {
      switch (toString.call(val)) {
        case "[object Array]": {
          seen = seen || /* @__PURE__ */ new Map();
          if (seen.has(val))
            return seen.get(val);
          var copy_1 = val.slice(0);
          seen.set(val, copy_1);
          copy_1.forEach(function(child, i) {
            copy_1[i] = cloneDeepHelper(child, seen);
          });
          return copy_1;
        }
        case "[object Object]": {
          seen = seen || /* @__PURE__ */ new Map();
          if (seen.has(val))
            return seen.get(val);
          var copy_2 = Object.create(Object.getPrototypeOf(val));
          seen.set(val, copy_2);
          Object.keys(val).forEach(function(key) {
            copy_2[key] = cloneDeepHelper(val[key], seen);
          });
          return copy_2;
        }
        default:
          return val;
      }
    }
    function deepFreeze(value) {
      var workSet = /* @__PURE__ */ new Set([value]);
      workSet.forEach(function(obj) {
        if (isNonNullObject(obj) && shallowFreeze(obj) === obj) {
          Object.getOwnPropertyNames(obj).forEach(function(name) {
            if (isNonNullObject(obj[name]))
              workSet.add(obj[name]);
          });
        }
      });
      return value;
    }
    function shallowFreeze(obj) {
      if (__DEV__ && !Object.isFrozen(obj)) {
        try {
          Object.freeze(obj);
        } catch (e) {
          if (e instanceof TypeError)
            return null;
          throw e;
        }
      }
      return obj;
    }
    function maybeDeepFreeze(obj) {
      if (__DEV__) {
        deepFreeze(obj);
      }
      return obj;
    }
    function iterateObserversSafely(observers, method, argument) {
      var observersWithMethod = [];
      observers.forEach(function(obs) {
        return obs[method] && observersWithMethod.push(obs);
      });
      observersWithMethod.forEach(function(obs) {
        return obs[method](argument);
      });
    }
    function asyncMap(observable, mapFn, catchFn) {
      return new zenObservableTs.Observable(function(observer) {
        var next = observer.next, error = observer.error, complete = observer.complete;
        var activeCallbackCount = 0;
        var completed = false;
        var promiseQueue = {
          then: function(callback) {
            return new Promise(function(resolve) {
              return resolve(callback());
            });
          }
        };
        function makeCallback(examiner, delegate) {
          if (examiner) {
            return function(arg) {
              ++activeCallbackCount;
              var both = function() {
                return examiner(arg);
              };
              promiseQueue = promiseQueue.then(both, both).then(function(result) {
                --activeCallbackCount;
                next && next.call(observer, result);
                if (completed) {
                  handler.complete();
                }
              }, function(error2) {
                --activeCallbackCount;
                throw error2;
              }).catch(function(caught) {
                error && error.call(observer, caught);
              });
            };
          } else {
            return function(arg) {
              return delegate && delegate.call(observer, arg);
            };
          }
        }
        var handler = {
          next: makeCallback(mapFn, next),
          error: makeCallback(catchFn, error),
          complete: function() {
            completed = true;
            if (!activeCallbackCount) {
              complete && complete.call(observer);
            }
          }
        };
        var sub = observable.subscribe(handler);
        return function() {
          return sub.unsubscribe();
        };
      });
    }
    var canUseWeakMap = typeof WeakMap === "function" && globals.maybe(function() {
      return navigator.product;
    }) !== "ReactNative";
    var canUseWeakSet = typeof WeakSet === "function";
    var canUseSymbol = typeof Symbol === "function" && typeof Symbol.for === "function";
    var canUseDOM = typeof globals.maybe(function() {
      return window.document.createElement;
    }) === "function";
    var usingJSDOM = globals.maybe(function() {
      return navigator.userAgent.indexOf("jsdom") >= 0;
    }) || false;
    var canUseLayoutEffect = canUseDOM && !usingJSDOM;
    function fixObservableSubclass(subclass) {
      function set(key) {
        Object.defineProperty(subclass, key, { value: zenObservableTs.Observable });
      }
      if (canUseSymbol && Symbol.species) {
        set(Symbol.species);
      }
      set("@@species");
      return subclass;
    }
    function isPromiseLike(value) {
      return value && typeof value.then === "function";
    }
    var Concast = function(_super) {
      tslib.__extends(Concast2, _super);
      function Concast2(sources) {
        var _this = _super.call(this, function(observer) {
          _this.addObserver(observer);
          return function() {
            return _this.removeObserver(observer);
          };
        }) || this;
        _this.observers = /* @__PURE__ */ new Set();
        _this.addCount = 0;
        _this.promise = new Promise(function(resolve, reject) {
          _this.resolve = resolve;
          _this.reject = reject;
        });
        _this.handlers = {
          next: function(result) {
            if (_this.sub !== null) {
              _this.latest = ["next", result];
              iterateObserversSafely(_this.observers, "next", result);
            }
          },
          error: function(error) {
            var sub = _this.sub;
            if (sub !== null) {
              if (sub)
                setTimeout(function() {
                  return sub.unsubscribe();
                });
              _this.sub = null;
              _this.latest = ["error", error];
              _this.reject(error);
              iterateObserversSafely(_this.observers, "error", error);
            }
          },
          complete: function() {
            var sub = _this.sub;
            if (sub !== null) {
              var value = _this.sources.shift();
              if (!value) {
                if (sub)
                  setTimeout(function() {
                    return sub.unsubscribe();
                  });
                _this.sub = null;
                if (_this.latest && _this.latest[0] === "next") {
                  _this.resolve(_this.latest[1]);
                } else {
                  _this.resolve();
                }
                iterateObserversSafely(_this.observers, "complete");
              } else if (isPromiseLike(value)) {
                value.then(function(obs) {
                  return _this.sub = obs.subscribe(_this.handlers);
                });
              } else {
                _this.sub = value.subscribe(_this.handlers);
              }
            }
          }
        };
        _this.cancel = function(reason) {
          _this.reject(reason);
          _this.sources = [];
          _this.handlers.complete();
        };
        _this.promise.catch(function(_) {
        });
        if (typeof sources === "function") {
          sources = [new zenObservableTs.Observable(sources)];
        }
        if (isPromiseLike(sources)) {
          sources.then(function(iterable) {
            return _this.start(iterable);
          }, _this.handlers.error);
        } else {
          _this.start(sources);
        }
        return _this;
      }
      Concast2.prototype.start = function(sources) {
        if (this.sub !== void 0)
          return;
        this.sources = Array.from(sources);
        this.handlers.complete();
      };
      Concast2.prototype.deliverLastMessage = function(observer) {
        if (this.latest) {
          var nextOrError = this.latest[0];
          var method = observer[nextOrError];
          if (method) {
            method.call(observer, this.latest[1]);
          }
          if (this.sub === null && nextOrError === "next" && observer.complete) {
            observer.complete();
          }
        }
      };
      Concast2.prototype.addObserver = function(observer) {
        if (!this.observers.has(observer)) {
          this.deliverLastMessage(observer);
          this.observers.add(observer);
          ++this.addCount;
        }
      };
      Concast2.prototype.removeObserver = function(observer, quietly) {
        if (this.observers.delete(observer) && --this.addCount < 1 && !quietly) {
          this.handlers.complete();
        }
      };
      Concast2.prototype.cleanup = function(callback) {
        var _this = this;
        var called = false;
        var once = function() {
          if (!called) {
            called = true;
            _this.observers.delete(observer);
            callback();
          }
        };
        var observer = {
          next: once,
          error: once,
          complete: once
        };
        var count = this.addCount;
        this.addObserver(observer);
        this.addCount = count;
      };
      return Concast2;
    }(zenObservableTs.Observable);
    fixObservableSubclass(Concast);
    function isNonEmptyArray(value) {
      return Array.isArray(value) && value.length > 0;
    }
    function graphQLResultHasError(result) {
      return result.errors && result.errors.length > 0 || false;
    }
    function compact() {
      var objects = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        objects[_i] = arguments[_i];
      }
      var result = /* @__PURE__ */ Object.create(null);
      objects.forEach(function(obj) {
        if (!obj)
          return;
        Object.keys(obj).forEach(function(key) {
          var value = obj[key];
          if (value !== void 0) {
            result[key] = value;
          }
        });
      });
      return result;
    }
    var prefixCounts = /* @__PURE__ */ new Map();
    function makeUniqueId(prefix) {
      var count = prefixCounts.get(prefix) || 1;
      prefixCounts.set(prefix, count + 1);
      return "".concat(prefix, ":").concat(count, ":").concat(Math.random().toString(36).slice(2));
    }
    function stringifyForDisplay(value) {
      var undefId = makeUniqueId("stringifyForDisplay");
      return JSON.stringify(value, function(key, value2) {
        return value2 === void 0 ? undefId : value2;
      }).split(JSON.stringify(undefId)).join("<undefined>");
    }
    function mergeOptions(defaults, options) {
      return compact(defaults, options, options.variables && {
        variables: tslib.__assign(tslib.__assign({}, defaults && defaults.variables), options.variables)
      });
    }
    exports.DEV = globals.DEV;
    exports.maybe = globals.maybe;
    exports.Observable = zenObservableTs.Observable;
    exports.Concast = Concast;
    exports.DeepMerger = DeepMerger;
    exports.addTypenameToDocument = addTypenameToDocument;
    exports.argumentsObjectFromField = argumentsObjectFromField;
    exports.asyncMap = asyncMap;
    exports.buildQueryFromSelectionSet = buildQueryFromSelectionSet;
    exports.canUseDOM = canUseDOM;
    exports.canUseLayoutEffect = canUseLayoutEffect;
    exports.canUseSymbol = canUseSymbol;
    exports.canUseWeakMap = canUseWeakMap;
    exports.canUseWeakSet = canUseWeakSet;
    exports.checkDocument = checkDocument;
    exports.cloneDeep = cloneDeep;
    exports.compact = compact;
    exports.concatPagination = concatPagination;
    exports.createFragmentMap = createFragmentMap;
    exports.fixObservableSubclass = fixObservableSubclass;
    exports.getDefaultValues = getDefaultValues;
    exports.getDirectiveNames = getDirectiveNames;
    exports.getFragmentDefinition = getFragmentDefinition;
    exports.getFragmentDefinitions = getFragmentDefinitions;
    exports.getFragmentFromSelection = getFragmentFromSelection;
    exports.getFragmentQueryDocument = getFragmentQueryDocument;
    exports.getInclusionDirectives = getInclusionDirectives;
    exports.getMainDefinition = getMainDefinition;
    exports.getOperationDefinition = getOperationDefinition;
    exports.getOperationName = getOperationName;
    exports.getQueryDefinition = getQueryDefinition;
    exports.getStoreKeyName = getStoreKeyName;
    exports.getTypenameFromResult = getTypenameFromResult;
    exports.graphQLResultHasError = graphQLResultHasError;
    exports.hasClientExports = hasClientExports;
    exports.hasDirectives = hasDirectives;
    exports.isDocumentNode = isDocumentNode;
    exports.isField = isField;
    exports.isInlineFragment = isInlineFragment;
    exports.isNonEmptyArray = isNonEmptyArray;
    exports.isNonNullObject = isNonNullObject;
    exports.isReference = isReference;
    exports.iterateObserversSafely = iterateObserversSafely;
    exports.makeReference = makeReference;
    exports.makeUniqueId = makeUniqueId;
    exports.maybeDeepFreeze = maybeDeepFreeze;
    exports.mergeDeep = mergeDeep;
    exports.mergeDeepArray = mergeDeepArray;
    exports.mergeOptions = mergeOptions;
    exports.offsetLimitPagination = offsetLimitPagination;
    exports.relayStylePagination = relayStylePagination;
    exports.removeArgumentsFromDocument = removeArgumentsFromDocument;
    exports.removeClientSetsFromDocument = removeClientSetsFromDocument;
    exports.removeConnectionDirectiveFromDocument = removeConnectionDirectiveFromDocument;
    exports.removeDirectivesFromDocument = removeDirectivesFromDocument;
    exports.removeFragmentSpreadFromDocument = removeFragmentSpreadFromDocument;
    exports.resultKeyNameFromField = resultKeyNameFromField;
    exports.shouldInclude = shouldInclude;
    exports.storeKeyNameFromField = storeKeyNameFromField;
    exports.stringifyForDisplay = stringifyForDisplay;
    exports.valueToObjectRepresentation = valueToObjectRepresentation;
  }
});

// node_modules/@apollo/client/link/utils/utils.cjs
var require_utils = __commonJS({
  "node_modules/@apollo/client/link/utils/utils.cjs"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var globals = require_globals();
    var utilities = require_utilities();
    var tslib = require("tslib");
    function fromError(errorValue) {
      return new utilities.Observable(function(observer) {
        observer.error(errorValue);
      });
    }
    function toPromise(observable) {
      var completed = false;
      return new Promise(function(resolve, reject) {
        observable.subscribe({
          next: function(data) {
            if (completed) {
              __DEV__ && globals.invariant.warn("Promise Wrapper does not support multiple results from Observable");
            } else {
              completed = true;
              resolve(data);
            }
          },
          error: reject
        });
      });
    }
    function fromPromise(promise) {
      return new utilities.Observable(function(observer) {
        promise.then(function(value) {
          observer.next(value);
          observer.complete();
        }).catch(observer.error.bind(observer));
      });
    }
    var throwServerError = function(response, result, message) {
      var error = new Error(message);
      error.name = "ServerError";
      error.response = response;
      error.statusCode = response.status;
      error.result = result;
      throw error;
    };
    function validateOperation(operation) {
      var OPERATION_FIELDS = [
        "query",
        "operationName",
        "variables",
        "extensions",
        "context"
      ];
      for (var _i = 0, _a = Object.keys(operation); _i < _a.length; _i++) {
        var key = _a[_i];
        if (OPERATION_FIELDS.indexOf(key) < 0) {
          throw __DEV__ ? new globals.InvariantError("illegal argument: ".concat(key)) : new globals.InvariantError(24);
        }
      }
      return operation;
    }
    function createOperation(starting, operation) {
      var context = tslib.__assign({}, starting);
      var setContext = function(next) {
        if (typeof next === "function") {
          context = tslib.__assign(tslib.__assign({}, context), next(context));
        } else {
          context = tslib.__assign(tslib.__assign({}, context), next);
        }
      };
      var getContext = function() {
        return tslib.__assign({}, context);
      };
      Object.defineProperty(operation, "setContext", {
        enumerable: false,
        value: setContext
      });
      Object.defineProperty(operation, "getContext", {
        enumerable: false,
        value: getContext
      });
      return operation;
    }
    function transformOperation(operation) {
      var transformedOperation = {
        variables: operation.variables || {},
        extensions: operation.extensions || {},
        operationName: operation.operationName,
        query: operation.query
      };
      if (!transformedOperation.operationName) {
        transformedOperation.operationName = typeof transformedOperation.query !== "string" ? utilities.getOperationName(transformedOperation.query) || void 0 : "";
      }
      return transformedOperation;
    }
    exports.createOperation = createOperation;
    exports.fromError = fromError;
    exports.fromPromise = fromPromise;
    exports.throwServerError = throwServerError;
    exports.toPromise = toPromise;
    exports.transformOperation = transformOperation;
    exports.validateOperation = validateOperation;
  }
});

// node_modules/@apollo/client/link/core/core.cjs
var require_core = __commonJS({
  "node_modules/@apollo/client/link/core/core.cjs"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var globals = require_globals();
    var tslib = require("tslib");
    var utilities = require_utilities();
    var utils = require_utils();
    function passthrough(op, forward) {
      return forward ? forward(op) : utilities.Observable.of();
    }
    function toLink(handler) {
      return typeof handler === "function" ? new ApolloLink(handler) : handler;
    }
    function isTerminating(link) {
      return link.request.length <= 1;
    }
    var LinkError = function(_super) {
      tslib.__extends(LinkError2, _super);
      function LinkError2(message, link) {
        var _this = _super.call(this, message) || this;
        _this.link = link;
        return _this;
      }
      return LinkError2;
    }(Error);
    var ApolloLink = function() {
      function ApolloLink2(request) {
        if (request)
          this.request = request;
      }
      ApolloLink2.empty = function() {
        return new ApolloLink2(function() {
          return utilities.Observable.of();
        });
      };
      ApolloLink2.from = function(links2) {
        if (links2.length === 0)
          return ApolloLink2.empty();
        return links2.map(toLink).reduce(function(x, y) {
          return x.concat(y);
        });
      };
      ApolloLink2.split = function(test, left, right) {
        var leftLink = toLink(left);
        var rightLink = toLink(right || new ApolloLink2(passthrough));
        if (isTerminating(leftLink) && isTerminating(rightLink)) {
          return new ApolloLink2(function(operation) {
            return test(operation) ? leftLink.request(operation) || utilities.Observable.of() : rightLink.request(operation) || utilities.Observable.of();
          });
        } else {
          return new ApolloLink2(function(operation, forward) {
            return test(operation) ? leftLink.request(operation, forward) || utilities.Observable.of() : rightLink.request(operation, forward) || utilities.Observable.of();
          });
        }
      };
      ApolloLink2.execute = function(link, operation) {
        return link.request(utils.createOperation(operation.context, utils.transformOperation(utils.validateOperation(operation)))) || utilities.Observable.of();
      };
      ApolloLink2.concat = function(first, second) {
        var firstLink = toLink(first);
        if (isTerminating(firstLink)) {
          __DEV__ && globals.invariant.warn(new LinkError("You are calling concat on a terminating link, which will have no effect", firstLink));
          return firstLink;
        }
        var nextLink = toLink(second);
        if (isTerminating(nextLink)) {
          return new ApolloLink2(function(operation) {
            return firstLink.request(operation, function(op) {
              return nextLink.request(op) || utilities.Observable.of();
            }) || utilities.Observable.of();
          });
        } else {
          return new ApolloLink2(function(operation, forward) {
            return firstLink.request(operation, function(op) {
              return nextLink.request(op, forward) || utilities.Observable.of();
            }) || utilities.Observable.of();
          });
        }
      };
      ApolloLink2.prototype.split = function(test, left, right) {
        return this.concat(ApolloLink2.split(test, left, right || new ApolloLink2(passthrough)));
      };
      ApolloLink2.prototype.concat = function(next) {
        return ApolloLink2.concat(this, next);
      };
      ApolloLink2.prototype.request = function(operation, forward) {
        throw __DEV__ ? new globals.InvariantError("request is not implemented") : new globals.InvariantError(19);
      };
      ApolloLink2.prototype.onError = function(error, observer) {
        if (observer && observer.error) {
          observer.error(error);
          return false;
        }
        throw error;
      };
      ApolloLink2.prototype.setOnError = function(fn) {
        this.onError = fn;
        return this;
      };
      return ApolloLink2;
    }();
    var empty = ApolloLink.empty;
    var from = ApolloLink.from;
    var split = ApolloLink.split;
    var concat = ApolloLink.concat;
    var execute = ApolloLink.execute;
    exports.ApolloLink = ApolloLink;
    exports.concat = concat;
    exports.empty = empty;
    exports.execute = execute;
    exports.from = from;
    exports.split = split;
  }
});

// node_modules/@apollo/client/link/http/http.cjs
var require_http = __commonJS({
  "node_modules/@apollo/client/link/http/http.cjs"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var globals = require_globals();
    var utils = require_utils();
    var tslib = require("tslib");
    var graphql = require("graphql");
    var core = require_core();
    var utilities = require_utilities();
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function parseAndCheckHttpResponse(operations) {
      return function(response) {
        return response.text().then(function(bodyText) {
          try {
            return JSON.parse(bodyText);
          } catch (err) {
            var parseError = err;
            parseError.name = "ServerParseError";
            parseError.response = response;
            parseError.statusCode = response.status;
            parseError.bodyText = bodyText;
            throw parseError;
          }
        }).then(function(result) {
          if (response.status >= 300) {
            utils.throwServerError(response, result, "Response not successful: Received status code ".concat(response.status));
          }
          if (!Array.isArray(result) && !hasOwnProperty.call(result, "data") && !hasOwnProperty.call(result, "errors")) {
            utils.throwServerError(response, result, "Server response was missing for query '".concat(Array.isArray(operations) ? operations.map(function(op) {
              return op.operationName;
            }) : operations.operationName, "'."));
          }
          return result;
        });
      };
    }
    var serializeFetchParameter = function(p, label) {
      var serialized;
      try {
        serialized = JSON.stringify(p);
      } catch (e) {
        var parseError = __DEV__ ? new globals.InvariantError("Network request failed. ".concat(label, " is not serializable: ").concat(e.message)) : new globals.InvariantError(21);
        parseError.parseError = e;
        throw parseError;
      }
      return serialized;
    };
    var defaultHttpOptions = {
      includeQuery: true,
      includeExtensions: false
    };
    var defaultHeaders = {
      accept: "*/*",
      "content-type": "application/json"
    };
    var defaultOptions = {
      method: "POST"
    };
    var fallbackHttpConfig = {
      http: defaultHttpOptions,
      headers: defaultHeaders,
      options: defaultOptions
    };
    var defaultPrinter = function(ast, printer) {
      return printer(ast);
    };
    function selectHttpOptionsAndBody(operation, fallbackConfig) {
      var configs = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        configs[_i - 2] = arguments[_i];
      }
      configs.unshift(fallbackConfig);
      return selectHttpOptionsAndBodyInternal.apply(void 0, tslib.__spreadArray([
        operation,
        defaultPrinter
      ], configs, false));
    }
    function selectHttpOptionsAndBodyInternal(operation, printer) {
      var configs = [];
      for (var _i = 2; _i < arguments.length; _i++) {
        configs[_i - 2] = arguments[_i];
      }
      var options = {};
      var http = {};
      configs.forEach(function(config) {
        options = tslib.__assign(tslib.__assign(tslib.__assign({}, options), config.options), { headers: tslib.__assign(tslib.__assign({}, options.headers), headersToLowerCase(config.headers)) });
        if (config.credentials) {
          options.credentials = config.credentials;
        }
        http = tslib.__assign(tslib.__assign({}, http), config.http);
      });
      var operationName = operation.operationName, extensions = operation.extensions, variables = operation.variables, query = operation.query;
      var body = { operationName, variables };
      if (http.includeExtensions)
        body.extensions = extensions;
      if (http.includeQuery)
        body.query = printer(query, graphql.print);
      return {
        options,
        body
      };
    }
    function headersToLowerCase(headers) {
      if (headers) {
        var normalized_1 = /* @__PURE__ */ Object.create(null);
        Object.keys(Object(headers)).forEach(function(name) {
          normalized_1[name.toLowerCase()] = headers[name];
        });
        return normalized_1;
      }
      return headers;
    }
    var checkFetcher = function(fetcher) {
      if (!fetcher && typeof fetch === "undefined") {
        throw __DEV__ ? new globals.InvariantError(`
"fetch" has not been found globally and no fetcher has been configured. To fix this, install a fetch package (like https://www.npmjs.com/package/cross-fetch), instantiate the fetcher, and pass it into your HttpLink constructor. For example:

import fetch from 'cross-fetch';
import { ApolloClient, HttpLink } from '@apollo/client';
const client = new ApolloClient({
  link: new HttpLink({ uri: '/graphql', fetch })
});
    `) : new globals.InvariantError(20);
      }
    };
    var createSignalIfSupported = function() {
      if (typeof AbortController === "undefined")
        return { controller: false, signal: false };
      var controller = new AbortController();
      var signal = controller.signal;
      return { controller, signal };
    };
    var selectURI = function(operation, fallbackURI) {
      var context = operation.getContext();
      var contextURI = context.uri;
      if (contextURI) {
        return contextURI;
      } else if (typeof fallbackURI === "function") {
        return fallbackURI(operation);
      } else {
        return fallbackURI || "/graphql";
      }
    };
    function rewriteURIForGET(chosenURI, body) {
      var queryParams = [];
      var addQueryParam = function(key, value) {
        queryParams.push("".concat(key, "=").concat(encodeURIComponent(value)));
      };
      if ("query" in body) {
        addQueryParam("query", body.query);
      }
      if (body.operationName) {
        addQueryParam("operationName", body.operationName);
      }
      if (body.variables) {
        var serializedVariables = void 0;
        try {
          serializedVariables = serializeFetchParameter(body.variables, "Variables map");
        } catch (parseError) {
          return { parseError };
        }
        addQueryParam("variables", serializedVariables);
      }
      if (body.extensions) {
        var serializedExtensions = void 0;
        try {
          serializedExtensions = serializeFetchParameter(body.extensions, "Extensions map");
        } catch (parseError) {
          return { parseError };
        }
        addQueryParam("extensions", serializedExtensions);
      }
      var fragment = "", preFragment = chosenURI;
      var fragmentStart = chosenURI.indexOf("#");
      if (fragmentStart !== -1) {
        fragment = chosenURI.substr(fragmentStart);
        preFragment = chosenURI.substr(0, fragmentStart);
      }
      var queryParamsPrefix = preFragment.indexOf("?") === -1 ? "?" : "&";
      var newURI = preFragment + queryParamsPrefix + queryParams.join("&") + fragment;
      return { newURI };
    }
    var backupFetch = utilities.maybe(function() {
      return fetch;
    });
    var createHttpLink = function(linkOptions) {
      if (linkOptions === void 0) {
        linkOptions = {};
      }
      var _a = linkOptions.uri, uri = _a === void 0 ? "/graphql" : _a, preferredFetch = linkOptions.fetch, _b = linkOptions.print, print = _b === void 0 ? defaultPrinter : _b, includeExtensions = linkOptions.includeExtensions, useGETForQueries = linkOptions.useGETForQueries, _c = linkOptions.includeUnusedVariables, includeUnusedVariables = _c === void 0 ? false : _c, requestOptions = tslib.__rest(linkOptions, ["uri", "fetch", "print", "includeExtensions", "useGETForQueries", "includeUnusedVariables"]);
      if (__DEV__) {
        checkFetcher(preferredFetch || backupFetch);
      }
      var linkConfig = {
        http: { includeExtensions },
        options: requestOptions.fetchOptions,
        credentials: requestOptions.credentials,
        headers: requestOptions.headers
      };
      return new core.ApolloLink(function(operation) {
        var chosenURI = selectURI(operation, uri);
        var context = operation.getContext();
        var clientAwarenessHeaders = {};
        if (context.clientAwareness) {
          var _a2 = context.clientAwareness, name_1 = _a2.name, version = _a2.version;
          if (name_1) {
            clientAwarenessHeaders["apollographql-client-name"] = name_1;
          }
          if (version) {
            clientAwarenessHeaders["apollographql-client-version"] = version;
          }
        }
        var contextHeaders = tslib.__assign(tslib.__assign({}, clientAwarenessHeaders), context.headers);
        var contextConfig = {
          http: context.http,
          options: context.fetchOptions,
          credentials: context.credentials,
          headers: contextHeaders
        };
        var _b2 = selectHttpOptionsAndBodyInternal(operation, print, fallbackHttpConfig, linkConfig, contextConfig), options = _b2.options, body = _b2.body;
        if (body.variables && !includeUnusedVariables) {
          var unusedNames_1 = new Set(Object.keys(body.variables));
          graphql.visit(operation.query, {
            Variable: function(node, _key, parent) {
              if (parent && parent.kind !== "VariableDefinition") {
                unusedNames_1.delete(node.name.value);
              }
            }
          });
          if (unusedNames_1.size) {
            body.variables = tslib.__assign({}, body.variables);
            unusedNames_1.forEach(function(name) {
              delete body.variables[name];
            });
          }
        }
        var controller;
        if (!options.signal) {
          var _c2 = createSignalIfSupported(), _controller = _c2.controller, signal = _c2.signal;
          controller = _controller;
          if (controller)
            options.signal = signal;
        }
        var definitionIsMutation = function(d) {
          return d.kind === "OperationDefinition" && d.operation === "mutation";
        };
        if (useGETForQueries && !operation.query.definitions.some(definitionIsMutation)) {
          options.method = "GET";
        }
        if (options.method === "GET") {
          var _d = rewriteURIForGET(chosenURI, body), newURI = _d.newURI, parseError = _d.parseError;
          if (parseError) {
            return utils.fromError(parseError);
          }
          chosenURI = newURI;
        } else {
          try {
            options.body = serializeFetchParameter(body, "Payload");
          } catch (parseError2) {
            return utils.fromError(parseError2);
          }
        }
        return new utilities.Observable(function(observer) {
          var currentFetch = preferredFetch || utilities.maybe(function() {
            return fetch;
          }) || backupFetch;
          currentFetch(chosenURI, options).then(function(response) {
            operation.setContext({ response });
            return response;
          }).then(parseAndCheckHttpResponse(operation)).then(function(result) {
            observer.next(result);
            observer.complete();
            return result;
          }).catch(function(err) {
            if (err.name === "AbortError")
              return;
            if (err.result && err.result.errors && err.result.data) {
              observer.next(err.result);
            }
            observer.error(err);
          });
          return function() {
            if (controller)
              controller.abort();
          };
        });
      });
    };
    var HttpLink = function(_super) {
      tslib.__extends(HttpLink2, _super);
      function HttpLink2(options) {
        if (options === void 0) {
          options = {};
        }
        var _this = _super.call(this, createHttpLink(options).request) || this;
        _this.options = options;
        return _this;
      }
      return HttpLink2;
    }(core.ApolloLink);
    exports.HttpLink = HttpLink;
    exports.checkFetcher = checkFetcher;
    exports.createHttpLink = createHttpLink;
    exports.createSignalIfSupported = createSignalIfSupported;
    exports.defaultPrinter = defaultPrinter;
    exports.fallbackHttpConfig = fallbackHttpConfig;
    exports.parseAndCheckHttpResponse = parseAndCheckHttpResponse;
    exports.rewriteURIForGET = rewriteURIForGET;
    exports.selectHttpOptionsAndBody = selectHttpOptionsAndBody;
    exports.selectHttpOptionsAndBodyInternal = selectHttpOptionsAndBodyInternal;
    exports.selectURI = selectURI;
    exports.serializeFetchParameter = serializeFetchParameter;
  }
});

// node_modules/@apollo/client/cache/cache.cjs
var require_cache = __commonJS({
  "node_modules/@apollo/client/cache/cache.cjs"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var globals = require_globals();
    var tslib = require("tslib");
    var optimism = require("optimism");
    var utilities = require_utilities();
    var equality = require("@wry/equality");
    var trie = require("@wry/trie");
    var context = require("@wry/context");
    var ApolloCache = function() {
      function ApolloCache2() {
        this.getFragmentDoc = optimism.wrap(utilities.getFragmentQueryDocument);
      }
      ApolloCache2.prototype.batch = function(options) {
        var _this = this;
        var optimisticId = typeof options.optimistic === "string" ? options.optimistic : options.optimistic === false ? null : void 0;
        var updateResult;
        this.performTransaction(function() {
          return updateResult = options.update(_this);
        }, optimisticId);
        return updateResult;
      };
      ApolloCache2.prototype.recordOptimisticTransaction = function(transaction, optimisticId) {
        this.performTransaction(transaction, optimisticId);
      };
      ApolloCache2.prototype.transformDocument = function(document) {
        return document;
      };
      ApolloCache2.prototype.identify = function(object) {
        return;
      };
      ApolloCache2.prototype.gc = function() {
        return [];
      };
      ApolloCache2.prototype.modify = function(options) {
        return false;
      };
      ApolloCache2.prototype.transformForLink = function(document) {
        return document;
      };
      ApolloCache2.prototype.readQuery = function(options, optimistic) {
        if (optimistic === void 0) {
          optimistic = !!options.optimistic;
        }
        return this.read(tslib.__assign(tslib.__assign({}, options), { rootId: options.id || "ROOT_QUERY", optimistic }));
      };
      ApolloCache2.prototype.readFragment = function(options, optimistic) {
        if (optimistic === void 0) {
          optimistic = !!options.optimistic;
        }
        return this.read(tslib.__assign(tslib.__assign({}, options), { query: this.getFragmentDoc(options.fragment, options.fragmentName), rootId: options.id, optimistic }));
      };
      ApolloCache2.prototype.writeQuery = function(_a) {
        var id = _a.id, data = _a.data, options = tslib.__rest(_a, ["id", "data"]);
        return this.write(Object.assign(options, {
          dataId: id || "ROOT_QUERY",
          result: data
        }));
      };
      ApolloCache2.prototype.writeFragment = function(_a) {
        var id = _a.id, data = _a.data, fragment = _a.fragment, fragmentName = _a.fragmentName, options = tslib.__rest(_a, ["id", "data", "fragment", "fragmentName"]);
        return this.write(Object.assign(options, {
          query: this.getFragmentDoc(fragment, fragmentName),
          dataId: id,
          result: data
        }));
      };
      ApolloCache2.prototype.updateQuery = function(options, update) {
        return this.batch({
          update: function(cache) {
            var value = cache.readQuery(options);
            var data = update(value);
            if (data === void 0 || data === null)
              return value;
            cache.writeQuery(tslib.__assign(tslib.__assign({}, options), { data }));
            return data;
          }
        });
      };
      ApolloCache2.prototype.updateFragment = function(options, update) {
        return this.batch({
          update: function(cache) {
            var value = cache.readFragment(options);
            var data = update(value);
            if (data === void 0 || data === null)
              return value;
            cache.writeFragment(tslib.__assign(tslib.__assign({}, options), { data }));
            return data;
          }
        });
      };
      return ApolloCache2;
    }();
    exports.Cache = void 0;
    (function(Cache) {
    })(exports.Cache || (exports.Cache = {}));
    var MissingFieldError = function() {
      function MissingFieldError2(message, path, query, variables) {
        this.message = message;
        this.path = path;
        this.query = query;
        this.variables = variables;
      }
      return MissingFieldError2;
    }();
    var hasOwn = Object.prototype.hasOwnProperty;
    function defaultDataIdFromObject(_a, context2) {
      var __typename = _a.__typename, id = _a.id, _id = _a._id;
      if (typeof __typename === "string") {
        if (context2) {
          context2.keyObject = id !== void 0 ? { id } : _id !== void 0 ? { _id } : void 0;
        }
        if (id === void 0)
          id = _id;
        if (id !== void 0) {
          return "".concat(__typename, ":").concat(typeof id === "number" || typeof id === "string" ? id : JSON.stringify(id));
        }
      }
    }
    var defaultConfig = {
      dataIdFromObject: defaultDataIdFromObject,
      addTypename: true,
      resultCaching: true,
      canonizeResults: false
    };
    function normalizeConfig(config) {
      return utilities.compact(defaultConfig, config);
    }
    function shouldCanonizeResults(config) {
      var value = config.canonizeResults;
      return value === void 0 ? defaultConfig.canonizeResults : value;
    }
    function getTypenameFromStoreObject(store, objectOrReference) {
      return utilities.isReference(objectOrReference) ? store.get(objectOrReference.__ref, "__typename") : objectOrReference && objectOrReference.__typename;
    }
    var TypeOrFieldNameRegExp = /^[_a-z][_0-9a-z]*/i;
    function fieldNameFromStoreName(storeFieldName) {
      var match = storeFieldName.match(TypeOrFieldNameRegExp);
      return match ? match[0] : storeFieldName;
    }
    function selectionSetMatchesResult(selectionSet, result, variables) {
      if (utilities.isNonNullObject(result)) {
        return isArray(result) ? result.every(function(item) {
          return selectionSetMatchesResult(selectionSet, item, variables);
        }) : selectionSet.selections.every(function(field) {
          if (utilities.isField(field) && utilities.shouldInclude(field, variables)) {
            var key = utilities.resultKeyNameFromField(field);
            return hasOwn.call(result, key) && (!field.selectionSet || selectionSetMatchesResult(field.selectionSet, result[key], variables));
          }
          return true;
        });
      }
      return false;
    }
    function storeValueIsStoreObject(value) {
      return utilities.isNonNullObject(value) && !utilities.isReference(value) && !isArray(value);
    }
    function makeProcessedFieldsMerger() {
      return new utilities.DeepMerger();
    }
    var isArray = function(a) {
      return Array.isArray(a);
    };
    var DELETE = /* @__PURE__ */ Object.create(null);
    var delModifier = function() {
      return DELETE;
    };
    var INVALIDATE = /* @__PURE__ */ Object.create(null);
    exports.EntityStore = function() {
      function EntityStore(policies, group) {
        var _this = this;
        this.policies = policies;
        this.group = group;
        this.data = /* @__PURE__ */ Object.create(null);
        this.rootIds = /* @__PURE__ */ Object.create(null);
        this.refs = /* @__PURE__ */ Object.create(null);
        this.getFieldValue = function(objectOrReference, storeFieldName) {
          return utilities.maybeDeepFreeze(utilities.isReference(objectOrReference) ? _this.get(objectOrReference.__ref, storeFieldName) : objectOrReference && objectOrReference[storeFieldName]);
        };
        this.canRead = function(objOrRef) {
          return utilities.isReference(objOrRef) ? _this.has(objOrRef.__ref) : typeof objOrRef === "object";
        };
        this.toReference = function(objOrIdOrRef, mergeIntoStore) {
          if (typeof objOrIdOrRef === "string") {
            return utilities.makeReference(objOrIdOrRef);
          }
          if (utilities.isReference(objOrIdOrRef)) {
            return objOrIdOrRef;
          }
          var id = _this.policies.identify(objOrIdOrRef)[0];
          if (id) {
            var ref = utilities.makeReference(id);
            if (mergeIntoStore) {
              _this.merge(id, objOrIdOrRef);
            }
            return ref;
          }
        };
      }
      EntityStore.prototype.toObject = function() {
        return tslib.__assign({}, this.data);
      };
      EntityStore.prototype.has = function(dataId) {
        return this.lookup(dataId, true) !== void 0;
      };
      EntityStore.prototype.get = function(dataId, fieldName) {
        this.group.depend(dataId, fieldName);
        if (hasOwn.call(this.data, dataId)) {
          var storeObject = this.data[dataId];
          if (storeObject && hasOwn.call(storeObject, fieldName)) {
            return storeObject[fieldName];
          }
        }
        if (fieldName === "__typename" && hasOwn.call(this.policies.rootTypenamesById, dataId)) {
          return this.policies.rootTypenamesById[dataId];
        }
        if (this instanceof Layer) {
          return this.parent.get(dataId, fieldName);
        }
      };
      EntityStore.prototype.lookup = function(dataId, dependOnExistence) {
        if (dependOnExistence)
          this.group.depend(dataId, "__exists");
        if (hasOwn.call(this.data, dataId)) {
          return this.data[dataId];
        }
        if (this instanceof Layer) {
          return this.parent.lookup(dataId, dependOnExistence);
        }
        if (this.policies.rootTypenamesById[dataId]) {
          return /* @__PURE__ */ Object.create(null);
        }
      };
      EntityStore.prototype.merge = function(older, newer) {
        var _this = this;
        var dataId;
        if (utilities.isReference(older))
          older = older.__ref;
        if (utilities.isReference(newer))
          newer = newer.__ref;
        var existing = typeof older === "string" ? this.lookup(dataId = older) : older;
        var incoming = typeof newer === "string" ? this.lookup(dataId = newer) : newer;
        if (!incoming)
          return;
        __DEV__ ? globals.invariant(typeof dataId === "string", "store.merge expects a string ID") : globals.invariant(typeof dataId === "string", 1);
        var merged = new utilities.DeepMerger(storeObjectReconciler).merge(existing, incoming);
        this.data[dataId] = merged;
        if (merged !== existing) {
          delete this.refs[dataId];
          if (this.group.caching) {
            var fieldsToDirty_1 = /* @__PURE__ */ Object.create(null);
            if (!existing)
              fieldsToDirty_1.__exists = 1;
            Object.keys(incoming).forEach(function(storeFieldName) {
              if (!existing || existing[storeFieldName] !== merged[storeFieldName]) {
                fieldsToDirty_1[storeFieldName] = 1;
                var fieldName = fieldNameFromStoreName(storeFieldName);
                if (fieldName !== storeFieldName && !_this.policies.hasKeyArgs(merged.__typename, fieldName)) {
                  fieldsToDirty_1[fieldName] = 1;
                }
                if (merged[storeFieldName] === void 0 && !(_this instanceof Layer)) {
                  delete merged[storeFieldName];
                }
              }
            });
            if (fieldsToDirty_1.__typename && !(existing && existing.__typename) && this.policies.rootTypenamesById[dataId] === merged.__typename) {
              delete fieldsToDirty_1.__typename;
            }
            Object.keys(fieldsToDirty_1).forEach(function(fieldName) {
              return _this.group.dirty(dataId, fieldName);
            });
          }
        }
      };
      EntityStore.prototype.modify = function(dataId, fields) {
        var _this = this;
        var storeObject = this.lookup(dataId);
        if (storeObject) {
          var changedFields_1 = /* @__PURE__ */ Object.create(null);
          var needToMerge_1 = false;
          var allDeleted_1 = true;
          var sharedDetails_1 = {
            DELETE,
            INVALIDATE,
            isReference: utilities.isReference,
            toReference: this.toReference,
            canRead: this.canRead,
            readField: function(fieldNameOrOptions, from) {
              return _this.policies.readField(typeof fieldNameOrOptions === "string" ? {
                fieldName: fieldNameOrOptions,
                from: from || utilities.makeReference(dataId)
              } : fieldNameOrOptions, { store: _this });
            }
          };
          Object.keys(storeObject).forEach(function(storeFieldName) {
            var fieldName = fieldNameFromStoreName(storeFieldName);
            var fieldValue = storeObject[storeFieldName];
            if (fieldValue === void 0)
              return;
            var modify = typeof fields === "function" ? fields : fields[storeFieldName] || fields[fieldName];
            if (modify) {
              var newValue = modify === delModifier ? DELETE : modify(utilities.maybeDeepFreeze(fieldValue), tslib.__assign(tslib.__assign({}, sharedDetails_1), { fieldName, storeFieldName, storage: _this.getStorage(dataId, storeFieldName) }));
              if (newValue === INVALIDATE) {
                _this.group.dirty(dataId, storeFieldName);
              } else {
                if (newValue === DELETE)
                  newValue = void 0;
                if (newValue !== fieldValue) {
                  changedFields_1[storeFieldName] = newValue;
                  needToMerge_1 = true;
                  fieldValue = newValue;
                }
              }
            }
            if (fieldValue !== void 0) {
              allDeleted_1 = false;
            }
          });
          if (needToMerge_1) {
            this.merge(dataId, changedFields_1);
            if (allDeleted_1) {
              if (this instanceof Layer) {
                this.data[dataId] = void 0;
              } else {
                delete this.data[dataId];
              }
              this.group.dirty(dataId, "__exists");
            }
            return true;
          }
        }
        return false;
      };
      EntityStore.prototype.delete = function(dataId, fieldName, args) {
        var _a;
        var storeObject = this.lookup(dataId);
        if (storeObject) {
          var typename = this.getFieldValue(storeObject, "__typename");
          var storeFieldName = fieldName && args ? this.policies.getStoreFieldName({ typename, fieldName, args }) : fieldName;
          return this.modify(dataId, storeFieldName ? (_a = {}, _a[storeFieldName] = delModifier, _a) : delModifier);
        }
        return false;
      };
      EntityStore.prototype.evict = function(options, limit) {
        var evicted = false;
        if (options.id) {
          if (hasOwn.call(this.data, options.id)) {
            evicted = this.delete(options.id, options.fieldName, options.args);
          }
          if (this instanceof Layer && this !== limit) {
            evicted = this.parent.evict(options, limit) || evicted;
          }
          if (options.fieldName || evicted) {
            this.group.dirty(options.id, options.fieldName || "__exists");
          }
        }
        return evicted;
      };
      EntityStore.prototype.clear = function() {
        this.replace(null);
      };
      EntityStore.prototype.extract = function() {
        var _this = this;
        var obj = this.toObject();
        var extraRootIds = [];
        this.getRootIdSet().forEach(function(id) {
          if (!hasOwn.call(_this.policies.rootTypenamesById, id)) {
            extraRootIds.push(id);
          }
        });
        if (extraRootIds.length) {
          obj.__META = { extraRootIds: extraRootIds.sort() };
        }
        return obj;
      };
      EntityStore.prototype.replace = function(newData) {
        var _this = this;
        Object.keys(this.data).forEach(function(dataId) {
          if (!(newData && hasOwn.call(newData, dataId))) {
            _this.delete(dataId);
          }
        });
        if (newData) {
          var __META = newData.__META, rest_1 = tslib.__rest(newData, ["__META"]);
          Object.keys(rest_1).forEach(function(dataId) {
            _this.merge(dataId, rest_1[dataId]);
          });
          if (__META) {
            __META.extraRootIds.forEach(this.retain, this);
          }
        }
      };
      EntityStore.prototype.retain = function(rootId) {
        return this.rootIds[rootId] = (this.rootIds[rootId] || 0) + 1;
      };
      EntityStore.prototype.release = function(rootId) {
        if (this.rootIds[rootId] > 0) {
          var count = --this.rootIds[rootId];
          if (!count)
            delete this.rootIds[rootId];
          return count;
        }
        return 0;
      };
      EntityStore.prototype.getRootIdSet = function(ids) {
        if (ids === void 0) {
          ids = /* @__PURE__ */ new Set();
        }
        Object.keys(this.rootIds).forEach(ids.add, ids);
        if (this instanceof Layer) {
          this.parent.getRootIdSet(ids);
        } else {
          Object.keys(this.policies.rootTypenamesById).forEach(ids.add, ids);
        }
        return ids;
      };
      EntityStore.prototype.gc = function() {
        var _this = this;
        var ids = this.getRootIdSet();
        var snapshot = this.toObject();
        ids.forEach(function(id) {
          if (hasOwn.call(snapshot, id)) {
            Object.keys(_this.findChildRefIds(id)).forEach(ids.add, ids);
            delete snapshot[id];
          }
        });
        var idsToRemove = Object.keys(snapshot);
        if (idsToRemove.length) {
          var root_1 = this;
          while (root_1 instanceof Layer)
            root_1 = root_1.parent;
          idsToRemove.forEach(function(id) {
            return root_1.delete(id);
          });
        }
        return idsToRemove;
      };
      EntityStore.prototype.findChildRefIds = function(dataId) {
        if (!hasOwn.call(this.refs, dataId)) {
          var found_1 = this.refs[dataId] = /* @__PURE__ */ Object.create(null);
          var root = this.data[dataId];
          if (!root)
            return found_1;
          var workSet_1 = /* @__PURE__ */ new Set([root]);
          workSet_1.forEach(function(obj) {
            if (utilities.isReference(obj)) {
              found_1[obj.__ref] = true;
            }
            if (utilities.isNonNullObject(obj)) {
              Object.keys(obj).forEach(function(key) {
                var child = obj[key];
                if (utilities.isNonNullObject(child)) {
                  workSet_1.add(child);
                }
              });
            }
          });
        }
        return this.refs[dataId];
      };
      EntityStore.prototype.makeCacheKey = function() {
        return this.group.keyMaker.lookupArray(arguments);
      };
      return EntityStore;
    }();
    var CacheGroup = function() {
      function CacheGroup2(caching, parent) {
        if (parent === void 0) {
          parent = null;
        }
        this.caching = caching;
        this.parent = parent;
        this.d = null;
        this.resetCaching();
      }
      CacheGroup2.prototype.resetCaching = function() {
        this.d = this.caching ? optimism.dep() : null;
        this.keyMaker = new trie.Trie(utilities.canUseWeakMap);
      };
      CacheGroup2.prototype.depend = function(dataId, storeFieldName) {
        if (this.d) {
          this.d(makeDepKey(dataId, storeFieldName));
          var fieldName = fieldNameFromStoreName(storeFieldName);
          if (fieldName !== storeFieldName) {
            this.d(makeDepKey(dataId, fieldName));
          }
          if (this.parent) {
            this.parent.depend(dataId, storeFieldName);
          }
        }
      };
      CacheGroup2.prototype.dirty = function(dataId, storeFieldName) {
        if (this.d) {
          this.d.dirty(makeDepKey(dataId, storeFieldName), storeFieldName === "__exists" ? "forget" : "setDirty");
        }
      };
      return CacheGroup2;
    }();
    function makeDepKey(dataId, storeFieldName) {
      return storeFieldName + "#" + dataId;
    }
    function maybeDependOnExistenceOfEntity(store, entityId) {
      if (supportsResultCaching(store)) {
        store.group.depend(entityId, "__exists");
      }
    }
    (function(EntityStore) {
      var Root = function(_super) {
        tslib.__extends(Root2, _super);
        function Root2(_a) {
          var policies = _a.policies, _b = _a.resultCaching, resultCaching = _b === void 0 ? true : _b, seed = _a.seed;
          var _this = _super.call(this, policies, new CacheGroup(resultCaching)) || this;
          _this.stump = new Stump(_this);
          _this.storageTrie = new trie.Trie(utilities.canUseWeakMap);
          if (seed)
            _this.replace(seed);
          return _this;
        }
        Root2.prototype.addLayer = function(layerId, replay) {
          return this.stump.addLayer(layerId, replay);
        };
        Root2.prototype.removeLayer = function() {
          return this;
        };
        Root2.prototype.getStorage = function() {
          return this.storageTrie.lookupArray(arguments);
        };
        return Root2;
      }(EntityStore);
      EntityStore.Root = Root;
    })(exports.EntityStore || (exports.EntityStore = {}));
    var Layer = function(_super) {
      tslib.__extends(Layer2, _super);
      function Layer2(id, parent, replay, group) {
        var _this = _super.call(this, parent.policies, group) || this;
        _this.id = id;
        _this.parent = parent;
        _this.replay = replay;
        _this.group = group;
        replay(_this);
        return _this;
      }
      Layer2.prototype.addLayer = function(layerId, replay) {
        return new Layer2(layerId, this, replay, this.group);
      };
      Layer2.prototype.removeLayer = function(layerId) {
        var _this = this;
        var parent = this.parent.removeLayer(layerId);
        if (layerId === this.id) {
          if (this.group.caching) {
            Object.keys(this.data).forEach(function(dataId) {
              var ownStoreObject = _this.data[dataId];
              var parentStoreObject = parent["lookup"](dataId);
              if (!parentStoreObject) {
                _this.delete(dataId);
              } else if (!ownStoreObject) {
                _this.group.dirty(dataId, "__exists");
                Object.keys(parentStoreObject).forEach(function(storeFieldName) {
                  _this.group.dirty(dataId, storeFieldName);
                });
              } else if (ownStoreObject !== parentStoreObject) {
                Object.keys(ownStoreObject).forEach(function(storeFieldName) {
                  if (!equality.equal(ownStoreObject[storeFieldName], parentStoreObject[storeFieldName])) {
                    _this.group.dirty(dataId, storeFieldName);
                  }
                });
              }
            });
          }
          return parent;
        }
        if (parent === this.parent)
          return this;
        return parent.addLayer(this.id, this.replay);
      };
      Layer2.prototype.toObject = function() {
        return tslib.__assign(tslib.__assign({}, this.parent.toObject()), this.data);
      };
      Layer2.prototype.findChildRefIds = function(dataId) {
        var fromParent = this.parent.findChildRefIds(dataId);
        return hasOwn.call(this.data, dataId) ? tslib.__assign(tslib.__assign({}, fromParent), _super.prototype.findChildRefIds.call(this, dataId)) : fromParent;
      };
      Layer2.prototype.getStorage = function() {
        var p = this.parent;
        while (p.parent)
          p = p.parent;
        return p.getStorage.apply(p, arguments);
      };
      return Layer2;
    }(exports.EntityStore);
    var Stump = function(_super) {
      tslib.__extends(Stump2, _super);
      function Stump2(root) {
        return _super.call(this, "EntityStore.Stump", root, function() {
        }, new CacheGroup(root.group.caching, root.group)) || this;
      }
      Stump2.prototype.removeLayer = function() {
        return this;
      };
      Stump2.prototype.merge = function() {
        return this.parent.merge.apply(this.parent, arguments);
      };
      return Stump2;
    }(Layer);
    function storeObjectReconciler(existingObject, incomingObject, property) {
      var existingValue = existingObject[property];
      var incomingValue = incomingObject[property];
      return equality.equal(existingValue, incomingValue) ? existingValue : incomingValue;
    }
    function supportsResultCaching(store) {
      return !!(store instanceof exports.EntityStore && store.group.caching);
    }
    function shallowCopy(value) {
      if (utilities.isNonNullObject(value)) {
        return isArray(value) ? value.slice(0) : tslib.__assign({ __proto__: Object.getPrototypeOf(value) }, value);
      }
      return value;
    }
    var ObjectCanon = function() {
      function ObjectCanon2() {
        this.known = new (utilities.canUseWeakSet ? WeakSet : Set)();
        this.pool = new trie.Trie(utilities.canUseWeakMap);
        this.passes = /* @__PURE__ */ new WeakMap();
        this.keysByJSON = /* @__PURE__ */ new Map();
        this.empty = this.admit({});
      }
      ObjectCanon2.prototype.isKnown = function(value) {
        return utilities.isNonNullObject(value) && this.known.has(value);
      };
      ObjectCanon2.prototype.pass = function(value) {
        if (utilities.isNonNullObject(value)) {
          var copy = shallowCopy(value);
          this.passes.set(copy, value);
          return copy;
        }
        return value;
      };
      ObjectCanon2.prototype.admit = function(value) {
        var _this = this;
        if (utilities.isNonNullObject(value)) {
          var original = this.passes.get(value);
          if (original)
            return original;
          var proto = Object.getPrototypeOf(value);
          switch (proto) {
            case Array.prototype: {
              if (this.known.has(value))
                return value;
              var array = value.map(this.admit, this);
              var node = this.pool.lookupArray(array);
              if (!node.array) {
                this.known.add(node.array = array);
                if (__DEV__) {
                  Object.freeze(array);
                }
              }
              return node.array;
            }
            case null:
            case Object.prototype: {
              if (this.known.has(value))
                return value;
              var proto_1 = Object.getPrototypeOf(value);
              var array_1 = [proto_1];
              var keys = this.sortedKeys(value);
              array_1.push(keys.json);
              var firstValueIndex_1 = array_1.length;
              keys.sorted.forEach(function(key) {
                array_1.push(_this.admit(value[key]));
              });
              var node = this.pool.lookupArray(array_1);
              if (!node.object) {
                var obj_1 = node.object = Object.create(proto_1);
                this.known.add(obj_1);
                keys.sorted.forEach(function(key, i) {
                  obj_1[key] = array_1[firstValueIndex_1 + i];
                });
                if (__DEV__) {
                  Object.freeze(obj_1);
                }
              }
              return node.object;
            }
          }
        }
        return value;
      };
      ObjectCanon2.prototype.sortedKeys = function(obj) {
        var keys = Object.keys(obj);
        var node = this.pool.lookupArray(keys);
        if (!node.keys) {
          keys.sort();
          var json = JSON.stringify(keys);
          if (!(node.keys = this.keysByJSON.get(json))) {
            this.keysByJSON.set(json, node.keys = { sorted: keys, json });
          }
        }
        return node.keys;
      };
      return ObjectCanon2;
    }();
    var canonicalStringify = Object.assign(function(value) {
      if (utilities.isNonNullObject(value)) {
        if (stringifyCanon === void 0) {
          resetCanonicalStringify();
        }
        var canonical = stringifyCanon.admit(value);
        var json = stringifyCache.get(canonical);
        if (json === void 0) {
          stringifyCache.set(canonical, json = JSON.stringify(canonical));
        }
        return json;
      }
      return JSON.stringify(value);
    }, {
      reset: resetCanonicalStringify
    });
    var stringifyCanon;
    var stringifyCache;
    function resetCanonicalStringify() {
      stringifyCanon = new ObjectCanon();
      stringifyCache = new (utilities.canUseWeakMap ? WeakMap : Map)();
    }
    function execSelectionSetKeyArgs(options) {
      return [
        options.selectionSet,
        options.objectOrReference,
        options.context,
        options.context.canonizeResults
      ];
    }
    var StoreReader = function() {
      function StoreReader2(config) {
        var _this = this;
        this.knownResults = new (utilities.canUseWeakMap ? WeakMap : Map)();
        this.config = utilities.compact(config, {
          addTypename: config.addTypename !== false,
          canonizeResults: shouldCanonizeResults(config)
        });
        this.canon = config.canon || new ObjectCanon();
        this.executeSelectionSet = optimism.wrap(function(options) {
          var _a;
          var canonizeResults = options.context.canonizeResults;
          var peekArgs = execSelectionSetKeyArgs(options);
          peekArgs[3] = !canonizeResults;
          var other = (_a = _this.executeSelectionSet).peek.apply(_a, peekArgs);
          if (other) {
            if (canonizeResults) {
              return tslib.__assign(tslib.__assign({}, other), { result: _this.canon.admit(other.result) });
            }
            return other;
          }
          maybeDependOnExistenceOfEntity(options.context.store, options.enclosingRef.__ref);
          return _this.execSelectionSetImpl(options);
        }, {
          max: this.config.resultCacheMaxSize,
          keyArgs: execSelectionSetKeyArgs,
          makeCacheKey: function(selectionSet, parent, context2, canonizeResults) {
            if (supportsResultCaching(context2.store)) {
              return context2.store.makeCacheKey(selectionSet, utilities.isReference(parent) ? parent.__ref : parent, context2.varString, canonizeResults);
            }
          }
        });
        this.executeSubSelectedArray = optimism.wrap(function(options) {
          maybeDependOnExistenceOfEntity(options.context.store, options.enclosingRef.__ref);
          return _this.execSubSelectedArrayImpl(options);
        }, {
          max: this.config.resultCacheMaxSize,
          makeCacheKey: function(_a) {
            var field = _a.field, array = _a.array, context2 = _a.context;
            if (supportsResultCaching(context2.store)) {
              return context2.store.makeCacheKey(field, array, context2.varString);
            }
          }
        });
      }
      StoreReader2.prototype.resetCanon = function() {
        this.canon = new ObjectCanon();
      };
      StoreReader2.prototype.diffQueryAgainstStore = function(_a) {
        var store = _a.store, query = _a.query, _b = _a.rootId, rootId = _b === void 0 ? "ROOT_QUERY" : _b, variables = _a.variables, _c = _a.returnPartialData, returnPartialData = _c === void 0 ? true : _c, _d = _a.canonizeResults, canonizeResults = _d === void 0 ? this.config.canonizeResults : _d;
        var policies = this.config.cache.policies;
        variables = tslib.__assign(tslib.__assign({}, utilities.getDefaultValues(utilities.getQueryDefinition(query))), variables);
        var rootRef = utilities.makeReference(rootId);
        var execResult = this.executeSelectionSet({
          selectionSet: utilities.getMainDefinition(query).selectionSet,
          objectOrReference: rootRef,
          enclosingRef: rootRef,
          context: {
            store,
            query,
            policies,
            variables,
            varString: canonicalStringify(variables),
            canonizeResults,
            fragmentMap: utilities.createFragmentMap(utilities.getFragmentDefinitions(query))
          }
        });
        var missing;
        if (execResult.missing) {
          missing = [new MissingFieldError(firstMissing(execResult.missing), execResult.missing, query, variables)];
          if (!returnPartialData) {
            throw missing[0];
          }
        }
        return {
          result: execResult.result,
          complete: !missing,
          missing
        };
      };
      StoreReader2.prototype.isFresh = function(result, parent, selectionSet, context2) {
        if (supportsResultCaching(context2.store) && this.knownResults.get(result) === selectionSet) {
          var latest = this.executeSelectionSet.peek(selectionSet, parent, context2, this.canon.isKnown(result));
          if (latest && result === latest.result) {
            return true;
          }
        }
        return false;
      };
      StoreReader2.prototype.execSelectionSetImpl = function(_a) {
        var _this = this;
        var selectionSet = _a.selectionSet, objectOrReference = _a.objectOrReference, enclosingRef = _a.enclosingRef, context2 = _a.context;
        if (utilities.isReference(objectOrReference) && !context2.policies.rootTypenamesById[objectOrReference.__ref] && !context2.store.has(objectOrReference.__ref)) {
          return {
            result: this.canon.empty,
            missing: "Dangling reference to missing ".concat(objectOrReference.__ref, " object")
          };
        }
        var variables = context2.variables, policies = context2.policies, store = context2.store;
        var typename = store.getFieldValue(objectOrReference, "__typename");
        var objectsToMerge = [];
        var missing;
        var missingMerger = new utilities.DeepMerger();
        if (this.config.addTypename && typeof typename === "string" && !policies.rootIdsByTypename[typename]) {
          objectsToMerge.push({ __typename: typename });
        }
        function handleMissing(result2, resultName) {
          var _a2;
          if (result2.missing) {
            missing = missingMerger.merge(missing, (_a2 = {}, _a2[resultName] = result2.missing, _a2));
          }
          return result2.result;
        }
        var workSet = new Set(selectionSet.selections);
        workSet.forEach(function(selection) {
          var _a2, _b;
          if (!utilities.shouldInclude(selection, variables))
            return;
          if (utilities.isField(selection)) {
            var fieldValue = policies.readField({
              fieldName: selection.name.value,
              field: selection,
              variables: context2.variables,
              from: objectOrReference
            }, context2);
            var resultName = utilities.resultKeyNameFromField(selection);
            if (fieldValue === void 0) {
              if (!utilities.addTypenameToDocument.added(selection)) {
                missing = missingMerger.merge(missing, (_a2 = {}, _a2[resultName] = "Can't find field '".concat(selection.name.value, "' on ").concat(utilities.isReference(objectOrReference) ? objectOrReference.__ref + " object" : "object " + JSON.stringify(objectOrReference, null, 2)), _a2));
              }
            } else if (isArray(fieldValue)) {
              fieldValue = handleMissing(_this.executeSubSelectedArray({
                field: selection,
                array: fieldValue,
                enclosingRef,
                context: context2
              }), resultName);
            } else if (!selection.selectionSet) {
              if (context2.canonizeResults) {
                fieldValue = _this.canon.pass(fieldValue);
              }
            } else if (fieldValue != null) {
              fieldValue = handleMissing(_this.executeSelectionSet({
                selectionSet: selection.selectionSet,
                objectOrReference: fieldValue,
                enclosingRef: utilities.isReference(fieldValue) ? fieldValue : enclosingRef,
                context: context2
              }), resultName);
            }
            if (fieldValue !== void 0) {
              objectsToMerge.push((_b = {}, _b[resultName] = fieldValue, _b));
            }
          } else {
            var fragment = utilities.getFragmentFromSelection(selection, context2.fragmentMap);
            if (fragment && policies.fragmentMatches(fragment, typename)) {
              fragment.selectionSet.selections.forEach(workSet.add, workSet);
            }
          }
        });
        var result = utilities.mergeDeepArray(objectsToMerge);
        var finalResult = { result, missing };
        var frozen = context2.canonizeResults ? this.canon.admit(finalResult) : utilities.maybeDeepFreeze(finalResult);
        if (frozen.result) {
          this.knownResults.set(frozen.result, selectionSet);
        }
        return frozen;
      };
      StoreReader2.prototype.execSubSelectedArrayImpl = function(_a) {
        var _this = this;
        var field = _a.field, array = _a.array, enclosingRef = _a.enclosingRef, context2 = _a.context;
        var missing;
        var missingMerger = new utilities.DeepMerger();
        function handleMissing(childResult, i) {
          var _a2;
          if (childResult.missing) {
            missing = missingMerger.merge(missing, (_a2 = {}, _a2[i] = childResult.missing, _a2));
          }
          return childResult.result;
        }
        if (field.selectionSet) {
          array = array.filter(context2.store.canRead);
        }
        array = array.map(function(item, i) {
          if (item === null) {
            return null;
          }
          if (isArray(item)) {
            return handleMissing(_this.executeSubSelectedArray({
              field,
              array: item,
              enclosingRef,
              context: context2
            }), i);
          }
          if (field.selectionSet) {
            return handleMissing(_this.executeSelectionSet({
              selectionSet: field.selectionSet,
              objectOrReference: item,
              enclosingRef: utilities.isReference(item) ? item : enclosingRef,
              context: context2
            }), i);
          }
          if (__DEV__) {
            assertSelectionSetForIdValue(context2.store, field, item);
          }
          return item;
        });
        return {
          result: context2.canonizeResults ? this.canon.admit(array) : array,
          missing
        };
      };
      return StoreReader2;
    }();
    function firstMissing(tree) {
      try {
        JSON.stringify(tree, function(_, value) {
          if (typeof value === "string")
            throw value;
          return value;
        });
      } catch (result) {
        return result;
      }
    }
    function assertSelectionSetForIdValue(store, field, fieldValue) {
      if (!field.selectionSet) {
        var workSet_1 = /* @__PURE__ */ new Set([fieldValue]);
        workSet_1.forEach(function(value) {
          if (utilities.isNonNullObject(value)) {
            __DEV__ ? globals.invariant(!utilities.isReference(value), "Missing selection set for object of type ".concat(getTypenameFromStoreObject(store, value), " returned for query field ").concat(field.name.value)) : globals.invariant(!utilities.isReference(value), 5);
            Object.values(value).forEach(workSet_1.add, workSet_1);
          }
        });
      }
    }
    var cacheSlot = new context.Slot();
    var cacheInfoMap = /* @__PURE__ */ new WeakMap();
    function getCacheInfo(cache) {
      var info = cacheInfoMap.get(cache);
      if (!info) {
        cacheInfoMap.set(cache, info = {
          vars: /* @__PURE__ */ new Set(),
          dep: optimism.dep()
        });
      }
      return info;
    }
    function forgetCache(cache) {
      getCacheInfo(cache).vars.forEach(function(rv) {
        return rv.forgetCache(cache);
      });
    }
    function recallCache(cache) {
      getCacheInfo(cache).vars.forEach(function(rv) {
        return rv.attachCache(cache);
      });
    }
    function makeVar(value) {
      var caches = /* @__PURE__ */ new Set();
      var listeners = /* @__PURE__ */ new Set();
      var rv = function(newValue) {
        if (arguments.length > 0) {
          if (value !== newValue) {
            value = newValue;
            caches.forEach(function(cache2) {
              getCacheInfo(cache2).dep.dirty(rv);
              broadcast(cache2);
            });
            var oldListeners = Array.from(listeners);
            listeners.clear();
            oldListeners.forEach(function(listener) {
              return listener(value);
            });
          }
        } else {
          var cache = cacheSlot.getValue();
          if (cache) {
            attach(cache);
            getCacheInfo(cache).dep(rv);
          }
        }
        return value;
      };
      rv.onNextChange = function(listener) {
        listeners.add(listener);
        return function() {
          listeners.delete(listener);
        };
      };
      var attach = rv.attachCache = function(cache) {
        caches.add(cache);
        getCacheInfo(cache).vars.add(rv);
        return rv;
      };
      rv.forgetCache = function(cache) {
        return caches.delete(cache);
      };
      return rv;
    }
    function broadcast(cache) {
      if (cache.broadcastWatches) {
        cache.broadcastWatches();
      }
    }
    var specifierInfoCache = /* @__PURE__ */ Object.create(null);
    function lookupSpecifierInfo(spec) {
      var cacheKey = JSON.stringify(spec);
      return specifierInfoCache[cacheKey] || (specifierInfoCache[cacheKey] = /* @__PURE__ */ Object.create(null));
    }
    function keyFieldsFnFromSpecifier(specifier) {
      var info = lookupSpecifierInfo(specifier);
      return info.keyFieldsFn || (info.keyFieldsFn = function(object, context2) {
        var extract = function(from, key) {
          return context2.readField(key, from);
        };
        var keyObject = context2.keyObject = collectSpecifierPaths(specifier, function(schemaKeyPath) {
          var extracted = extractKeyPath(context2.storeObject, schemaKeyPath, extract);
          if (extracted === void 0 && object !== context2.storeObject && hasOwn.call(object, schemaKeyPath[0])) {
            extracted = extractKeyPath(object, schemaKeyPath, extractKey);
          }
          __DEV__ ? globals.invariant(extracted !== void 0, "Missing field '".concat(schemaKeyPath.join("."), "' while extracting keyFields from ").concat(JSON.stringify(object))) : globals.invariant(extracted !== void 0, 2);
          return extracted;
        });
        return "".concat(context2.typename, ":").concat(JSON.stringify(keyObject));
      });
    }
    function keyArgsFnFromSpecifier(specifier) {
      var info = lookupSpecifierInfo(specifier);
      return info.keyArgsFn || (info.keyArgsFn = function(args, _a) {
        var field = _a.field, variables = _a.variables, fieldName = _a.fieldName;
        var collected = collectSpecifierPaths(specifier, function(keyPath) {
          var firstKey = keyPath[0];
          var firstChar = firstKey.charAt(0);
          if (firstChar === "@") {
            if (field && utilities.isNonEmptyArray(field.directives)) {
              var directiveName_1 = firstKey.slice(1);
              var d = field.directives.find(function(d2) {
                return d2.name.value === directiveName_1;
              });
              var directiveArgs = d && utilities.argumentsObjectFromField(d, variables);
              return directiveArgs && extractKeyPath(directiveArgs, keyPath.slice(1));
            }
            return;
          }
          if (firstChar === "$") {
            var variableName = firstKey.slice(1);
            if (variables && hasOwn.call(variables, variableName)) {
              var varKeyPath = keyPath.slice(0);
              varKeyPath[0] = variableName;
              return extractKeyPath(variables, varKeyPath);
            }
            return;
          }
          if (args) {
            return extractKeyPath(args, keyPath);
          }
        });
        var suffix = JSON.stringify(collected);
        if (args || suffix !== "{}") {
          fieldName += ":" + suffix;
        }
        return fieldName;
      });
    }
    function collectSpecifierPaths(specifier, extractor) {
      var merger = new utilities.DeepMerger();
      return getSpecifierPaths(specifier).reduce(function(collected, path) {
        var _a;
        var toMerge = extractor(path);
        if (toMerge !== void 0) {
          for (var i = path.length - 1; i >= 0; --i) {
            toMerge = (_a = {}, _a[path[i]] = toMerge, _a);
          }
          collected = merger.merge(collected, toMerge);
        }
        return collected;
      }, /* @__PURE__ */ Object.create(null));
    }
    function getSpecifierPaths(spec) {
      var info = lookupSpecifierInfo(spec);
      if (!info.paths) {
        var paths_1 = info.paths = [];
        var currentPath_1 = [];
        spec.forEach(function(s, i) {
          if (isArray(s)) {
            getSpecifierPaths(s).forEach(function(p) {
              return paths_1.push(currentPath_1.concat(p));
            });
            currentPath_1.length = 0;
          } else {
            currentPath_1.push(s);
            if (!isArray(spec[i + 1])) {
              paths_1.push(currentPath_1.slice(0));
              currentPath_1.length = 0;
            }
          }
        });
      }
      return info.paths;
    }
    function extractKey(object, key) {
      return object[key];
    }
    function extractKeyPath(object, path, extract) {
      extract = extract || extractKey;
      return normalize(path.reduce(function reducer(obj, key) {
        return isArray(obj) ? obj.map(function(child) {
          return reducer(child, key);
        }) : obj && extract(obj, key);
      }, object));
    }
    function normalize(value) {
      if (utilities.isNonNullObject(value)) {
        if (isArray(value)) {
          return value.map(normalize);
        }
        return collectSpecifierPaths(Object.keys(value).sort(), function(path) {
          return extractKeyPath(value, path);
        });
      }
      return value;
    }
    utilities.getStoreKeyName.setStringify(canonicalStringify);
    function argsFromFieldSpecifier(spec) {
      return spec.args !== void 0 ? spec.args : spec.field ? utilities.argumentsObjectFromField(spec.field, spec.variables) : null;
    }
    var nullKeyFieldsFn = function() {
      return void 0;
    };
    var simpleKeyArgsFn = function(_args, context2) {
      return context2.fieldName;
    };
    var mergeTrueFn = function(existing, incoming, _a) {
      var mergeObjects = _a.mergeObjects;
      return mergeObjects(existing, incoming);
    };
    var mergeFalseFn = function(_, incoming) {
      return incoming;
    };
    var Policies = function() {
      function Policies2(config) {
        this.config = config;
        this.typePolicies = /* @__PURE__ */ Object.create(null);
        this.toBeAdded = /* @__PURE__ */ Object.create(null);
        this.supertypeMap = /* @__PURE__ */ new Map();
        this.fuzzySubtypes = /* @__PURE__ */ new Map();
        this.rootIdsByTypename = /* @__PURE__ */ Object.create(null);
        this.rootTypenamesById = /* @__PURE__ */ Object.create(null);
        this.usingPossibleTypes = false;
        this.config = tslib.__assign({ dataIdFromObject: defaultDataIdFromObject }, config);
        this.cache = this.config.cache;
        this.setRootTypename("Query");
        this.setRootTypename("Mutation");
        this.setRootTypename("Subscription");
        if (config.possibleTypes) {
          this.addPossibleTypes(config.possibleTypes);
        }
        if (config.typePolicies) {
          this.addTypePolicies(config.typePolicies);
        }
      }
      Policies2.prototype.identify = function(object, partialContext) {
        var _a;
        var policies = this;
        var typename = partialContext && (partialContext.typename || ((_a = partialContext.storeObject) === null || _a === void 0 ? void 0 : _a.__typename)) || object.__typename;
        if (typename === this.rootTypenamesById.ROOT_QUERY) {
          return ["ROOT_QUERY"];
        }
        var storeObject = partialContext && partialContext.storeObject || object;
        var context2 = tslib.__assign(tslib.__assign({}, partialContext), { typename, storeObject, readField: partialContext && partialContext.readField || function() {
          var options = normalizeReadFieldOptions(arguments, storeObject);
          return policies.readField(options, {
            store: policies.cache["data"],
            variables: options.variables
          });
        } });
        var id;
        var policy = typename && this.getTypePolicy(typename);
        var keyFn = policy && policy.keyFn || this.config.dataIdFromObject;
        while (keyFn) {
          var specifierOrId = keyFn(object, context2);
          if (isArray(specifierOrId)) {
            keyFn = keyFieldsFnFromSpecifier(specifierOrId);
          } else {
            id = specifierOrId;
            break;
          }
        }
        id = id ? String(id) : void 0;
        return context2.keyObject ? [id, context2.keyObject] : [id];
      };
      Policies2.prototype.addTypePolicies = function(typePolicies) {
        var _this = this;
        Object.keys(typePolicies).forEach(function(typename) {
          var _a = typePolicies[typename], queryType = _a.queryType, mutationType = _a.mutationType, subscriptionType = _a.subscriptionType, incoming = tslib.__rest(_a, ["queryType", "mutationType", "subscriptionType"]);
          if (queryType)
            _this.setRootTypename("Query", typename);
          if (mutationType)
            _this.setRootTypename("Mutation", typename);
          if (subscriptionType)
            _this.setRootTypename("Subscription", typename);
          if (hasOwn.call(_this.toBeAdded, typename)) {
            _this.toBeAdded[typename].push(incoming);
          } else {
            _this.toBeAdded[typename] = [incoming];
          }
        });
      };
      Policies2.prototype.updateTypePolicy = function(typename, incoming) {
        var _this = this;
        var existing = this.getTypePolicy(typename);
        var keyFields = incoming.keyFields, fields = incoming.fields;
        function setMerge(existing2, merge) {
          existing2.merge = typeof merge === "function" ? merge : merge === true ? mergeTrueFn : merge === false ? mergeFalseFn : existing2.merge;
        }
        setMerge(existing, incoming.merge);
        existing.keyFn = keyFields === false ? nullKeyFieldsFn : isArray(keyFields) ? keyFieldsFnFromSpecifier(keyFields) : typeof keyFields === "function" ? keyFields : existing.keyFn;
        if (fields) {
          Object.keys(fields).forEach(function(fieldName) {
            var existing2 = _this.getFieldPolicy(typename, fieldName, true);
            var incoming2 = fields[fieldName];
            if (typeof incoming2 === "function") {
              existing2.read = incoming2;
            } else {
              var keyArgs = incoming2.keyArgs, read = incoming2.read, merge = incoming2.merge;
              existing2.keyFn = keyArgs === false ? simpleKeyArgsFn : isArray(keyArgs) ? keyArgsFnFromSpecifier(keyArgs) : typeof keyArgs === "function" ? keyArgs : existing2.keyFn;
              if (typeof read === "function") {
                existing2.read = read;
              }
              setMerge(existing2, merge);
            }
            if (existing2.read && existing2.merge) {
              existing2.keyFn = existing2.keyFn || simpleKeyArgsFn;
            }
          });
        }
      };
      Policies2.prototype.setRootTypename = function(which, typename) {
        if (typename === void 0) {
          typename = which;
        }
        var rootId = "ROOT_" + which.toUpperCase();
        var old = this.rootTypenamesById[rootId];
        if (typename !== old) {
          __DEV__ ? globals.invariant(!old || old === which, "Cannot change root ".concat(which, " __typename more than once")) : globals.invariant(!old || old === which, 3);
          if (old)
            delete this.rootIdsByTypename[old];
          this.rootIdsByTypename[typename] = rootId;
          this.rootTypenamesById[rootId] = typename;
        }
      };
      Policies2.prototype.addPossibleTypes = function(possibleTypes) {
        var _this = this;
        this.usingPossibleTypes = true;
        Object.keys(possibleTypes).forEach(function(supertype) {
          _this.getSupertypeSet(supertype, true);
          possibleTypes[supertype].forEach(function(subtype) {
            _this.getSupertypeSet(subtype, true).add(supertype);
            var match = subtype.match(TypeOrFieldNameRegExp);
            if (!match || match[0] !== subtype) {
              _this.fuzzySubtypes.set(subtype, new RegExp(subtype));
            }
          });
        });
      };
      Policies2.prototype.getTypePolicy = function(typename) {
        var _this = this;
        if (!hasOwn.call(this.typePolicies, typename)) {
          var policy_1 = this.typePolicies[typename] = /* @__PURE__ */ Object.create(null);
          policy_1.fields = /* @__PURE__ */ Object.create(null);
          var supertypes = this.supertypeMap.get(typename);
          if (supertypes && supertypes.size) {
            supertypes.forEach(function(supertype) {
              var _a = _this.getTypePolicy(supertype), fields = _a.fields, rest = tslib.__rest(_a, ["fields"]);
              Object.assign(policy_1, rest);
              Object.assign(policy_1.fields, fields);
            });
          }
        }
        var inbox = this.toBeAdded[typename];
        if (inbox && inbox.length) {
          inbox.splice(0).forEach(function(policy) {
            _this.updateTypePolicy(typename, policy);
          });
        }
        return this.typePolicies[typename];
      };
      Policies2.prototype.getFieldPolicy = function(typename, fieldName, createIfMissing) {
        if (typename) {
          var fieldPolicies = this.getTypePolicy(typename).fields;
          return fieldPolicies[fieldName] || createIfMissing && (fieldPolicies[fieldName] = /* @__PURE__ */ Object.create(null));
        }
      };
      Policies2.prototype.getSupertypeSet = function(subtype, createIfMissing) {
        var supertypeSet = this.supertypeMap.get(subtype);
        if (!supertypeSet && createIfMissing) {
          this.supertypeMap.set(subtype, supertypeSet = /* @__PURE__ */ new Set());
        }
        return supertypeSet;
      };
      Policies2.prototype.fragmentMatches = function(fragment, typename, result, variables) {
        var _this = this;
        if (!fragment.typeCondition)
          return true;
        if (!typename)
          return false;
        var supertype = fragment.typeCondition.name.value;
        if (typename === supertype)
          return true;
        if (this.usingPossibleTypes && this.supertypeMap.has(supertype)) {
          var typenameSupertypeSet = this.getSupertypeSet(typename, true);
          var workQueue_1 = [typenameSupertypeSet];
          var maybeEnqueue_1 = function(subtype) {
            var supertypeSet2 = _this.getSupertypeSet(subtype, false);
            if (supertypeSet2 && supertypeSet2.size && workQueue_1.indexOf(supertypeSet2) < 0) {
              workQueue_1.push(supertypeSet2);
            }
          };
          var needToCheckFuzzySubtypes = !!(result && this.fuzzySubtypes.size);
          var checkingFuzzySubtypes = false;
          for (var i = 0; i < workQueue_1.length; ++i) {
            var supertypeSet = workQueue_1[i];
            if (supertypeSet.has(supertype)) {
              if (!typenameSupertypeSet.has(supertype)) {
                if (checkingFuzzySubtypes) {
                  __DEV__ && globals.invariant.warn("Inferring subtype ".concat(typename, " of supertype ").concat(supertype));
                }
                typenameSupertypeSet.add(supertype);
              }
              return true;
            }
            supertypeSet.forEach(maybeEnqueue_1);
            if (needToCheckFuzzySubtypes && i === workQueue_1.length - 1 && selectionSetMatchesResult(fragment.selectionSet, result, variables)) {
              needToCheckFuzzySubtypes = false;
              checkingFuzzySubtypes = true;
              this.fuzzySubtypes.forEach(function(regExp, fuzzyString) {
                var match = typename.match(regExp);
                if (match && match[0] === typename) {
                  maybeEnqueue_1(fuzzyString);
                }
              });
            }
          }
        }
        return false;
      };
      Policies2.prototype.hasKeyArgs = function(typename, fieldName) {
        var policy = this.getFieldPolicy(typename, fieldName, false);
        return !!(policy && policy.keyFn);
      };
      Policies2.prototype.getStoreFieldName = function(fieldSpec) {
        var typename = fieldSpec.typename, fieldName = fieldSpec.fieldName;
        var policy = this.getFieldPolicy(typename, fieldName, false);
        var storeFieldName;
        var keyFn = policy && policy.keyFn;
        if (keyFn && typename) {
          var context2 = {
            typename,
            fieldName,
            field: fieldSpec.field || null,
            variables: fieldSpec.variables
          };
          var args = argsFromFieldSpecifier(fieldSpec);
          while (keyFn) {
            var specifierOrString = keyFn(args, context2);
            if (isArray(specifierOrString)) {
              keyFn = keyArgsFnFromSpecifier(specifierOrString);
            } else {
              storeFieldName = specifierOrString || fieldName;
              break;
            }
          }
        }
        if (storeFieldName === void 0) {
          storeFieldName = fieldSpec.field ? utilities.storeKeyNameFromField(fieldSpec.field, fieldSpec.variables) : utilities.getStoreKeyName(fieldName, argsFromFieldSpecifier(fieldSpec));
        }
        if (storeFieldName === false) {
          return fieldName;
        }
        return fieldName === fieldNameFromStoreName(storeFieldName) ? storeFieldName : fieldName + ":" + storeFieldName;
      };
      Policies2.prototype.readField = function(options, context2) {
        var objectOrReference = options.from;
        if (!objectOrReference)
          return;
        var nameOrField = options.field || options.fieldName;
        if (!nameOrField)
          return;
        if (options.typename === void 0) {
          var typename = context2.store.getFieldValue(objectOrReference, "__typename");
          if (typename)
            options.typename = typename;
        }
        var storeFieldName = this.getStoreFieldName(options);
        var fieldName = fieldNameFromStoreName(storeFieldName);
        var existing = context2.store.getFieldValue(objectOrReference, storeFieldName);
        var policy = this.getFieldPolicy(options.typename, fieldName, false);
        var read = policy && policy.read;
        if (read) {
          var readOptions = makeFieldFunctionOptions(this, objectOrReference, options, context2, context2.store.getStorage(utilities.isReference(objectOrReference) ? objectOrReference.__ref : objectOrReference, storeFieldName));
          return cacheSlot.withValue(this.cache, read, [existing, readOptions]);
        }
        return existing;
      };
      Policies2.prototype.getReadFunction = function(typename, fieldName) {
        var policy = this.getFieldPolicy(typename, fieldName, false);
        return policy && policy.read;
      };
      Policies2.prototype.getMergeFunction = function(parentTypename, fieldName, childTypename) {
        var policy = this.getFieldPolicy(parentTypename, fieldName, false);
        var merge = policy && policy.merge;
        if (!merge && childTypename) {
          policy = this.getTypePolicy(childTypename);
          merge = policy && policy.merge;
        }
        return merge;
      };
      Policies2.prototype.runMergeFunction = function(existing, incoming, _a, context2, storage) {
        var field = _a.field, typename = _a.typename, merge = _a.merge;
        if (merge === mergeTrueFn) {
          return makeMergeObjectsFunction(context2.store)(existing, incoming);
        }
        if (merge === mergeFalseFn) {
          return incoming;
        }
        if (context2.overwrite) {
          existing = void 0;
        }
        return merge(existing, incoming, makeFieldFunctionOptions(this, void 0, { typename, fieldName: field.name.value, field, variables: context2.variables }, context2, storage || /* @__PURE__ */ Object.create(null)));
      };
      return Policies2;
    }();
    function makeFieldFunctionOptions(policies, objectOrReference, fieldSpec, context2, storage) {
      var storeFieldName = policies.getStoreFieldName(fieldSpec);
      var fieldName = fieldNameFromStoreName(storeFieldName);
      var variables = fieldSpec.variables || context2.variables;
      var _a = context2.store, toReference = _a.toReference, canRead = _a.canRead;
      return {
        args: argsFromFieldSpecifier(fieldSpec),
        field: fieldSpec.field || null,
        fieldName,
        storeFieldName,
        variables,
        isReference: utilities.isReference,
        toReference,
        storage,
        cache: policies.cache,
        canRead,
        readField: function() {
          return policies.readField(normalizeReadFieldOptions(arguments, objectOrReference, context2), context2);
        },
        mergeObjects: makeMergeObjectsFunction(context2.store)
      };
    }
    function normalizeReadFieldOptions(readFieldArgs, objectOrReference, variables) {
      var fieldNameOrOptions = readFieldArgs[0], from = readFieldArgs[1], argc = readFieldArgs.length;
      var options;
      if (typeof fieldNameOrOptions === "string") {
        options = {
          fieldName: fieldNameOrOptions,
          from: argc > 1 ? from : objectOrReference
        };
      } else {
        options = tslib.__assign({}, fieldNameOrOptions);
        if (!hasOwn.call(options, "from")) {
          options.from = objectOrReference;
        }
      }
      if (__DEV__ && options.from === void 0) {
        __DEV__ && globals.invariant.warn("Undefined 'from' passed to readField with arguments ".concat(utilities.stringifyForDisplay(Array.from(readFieldArgs))));
      }
      if (options.variables === void 0) {
        options.variables = variables;
      }
      return options;
    }
    function makeMergeObjectsFunction(store) {
      return function mergeObjects(existing, incoming) {
        if (isArray(existing) || isArray(incoming)) {
          throw __DEV__ ? new globals.InvariantError("Cannot automatically merge arrays") : new globals.InvariantError(4);
        }
        if (utilities.isNonNullObject(existing) && utilities.isNonNullObject(incoming)) {
          var eType = store.getFieldValue(existing, "__typename");
          var iType = store.getFieldValue(incoming, "__typename");
          var typesDiffer = eType && iType && eType !== iType;
          if (typesDiffer) {
            return incoming;
          }
          if (utilities.isReference(existing) && storeValueIsStoreObject(incoming)) {
            store.merge(existing.__ref, incoming);
            return existing;
          }
          if (storeValueIsStoreObject(existing) && utilities.isReference(incoming)) {
            store.merge(existing, incoming.__ref);
            return incoming;
          }
          if (storeValueIsStoreObject(existing) && storeValueIsStoreObject(incoming)) {
            return tslib.__assign(tslib.__assign({}, existing), incoming);
          }
        }
        return incoming;
      };
    }
    function getContextFlavor(context2, clientOnly, deferred) {
      var key = "".concat(clientOnly).concat(deferred);
      var flavored = context2.flavors.get(key);
      if (!flavored) {
        context2.flavors.set(key, flavored = context2.clientOnly === clientOnly && context2.deferred === deferred ? context2 : tslib.__assign(tslib.__assign({}, context2), { clientOnly, deferred }));
      }
      return flavored;
    }
    var StoreWriter = function() {
      function StoreWriter2(cache, reader) {
        this.cache = cache;
        this.reader = reader;
      }
      StoreWriter2.prototype.writeToStore = function(store, _a) {
        var _this = this;
        var query = _a.query, result = _a.result, dataId = _a.dataId, variables = _a.variables, overwrite = _a.overwrite;
        var operationDefinition = utilities.getOperationDefinition(query);
        var merger = makeProcessedFieldsMerger();
        variables = tslib.__assign(tslib.__assign({}, utilities.getDefaultValues(operationDefinition)), variables);
        var context2 = {
          store,
          written: /* @__PURE__ */ Object.create(null),
          merge: function(existing, incoming) {
            return merger.merge(existing, incoming);
          },
          variables,
          varString: canonicalStringify(variables),
          fragmentMap: utilities.createFragmentMap(utilities.getFragmentDefinitions(query)),
          overwrite: !!overwrite,
          incomingById: /* @__PURE__ */ new Map(),
          clientOnly: false,
          deferred: false,
          flavors: /* @__PURE__ */ new Map()
        };
        var ref = this.processSelectionSet({
          result: result || /* @__PURE__ */ Object.create(null),
          dataId,
          selectionSet: operationDefinition.selectionSet,
          mergeTree: { map: /* @__PURE__ */ new Map() },
          context: context2
        });
        if (!utilities.isReference(ref)) {
          throw __DEV__ ? new globals.InvariantError("Could not identify object ".concat(JSON.stringify(result))) : new globals.InvariantError(6);
        }
        context2.incomingById.forEach(function(_a2, dataId2) {
          var storeObject = _a2.storeObject, mergeTree = _a2.mergeTree, fieldNodeSet = _a2.fieldNodeSet;
          var entityRef = utilities.makeReference(dataId2);
          if (mergeTree && mergeTree.map.size) {
            var applied = _this.applyMerges(mergeTree, entityRef, storeObject, context2);
            if (utilities.isReference(applied)) {
              return;
            }
            storeObject = applied;
          }
          if (__DEV__ && !context2.overwrite) {
            var fieldsWithSelectionSets_1 = /* @__PURE__ */ Object.create(null);
            fieldNodeSet.forEach(function(field) {
              if (field.selectionSet) {
                fieldsWithSelectionSets_1[field.name.value] = true;
              }
            });
            var hasSelectionSet_1 = function(storeFieldName) {
              return fieldsWithSelectionSets_1[fieldNameFromStoreName(storeFieldName)] === true;
            };
            var hasMergeFunction_1 = function(storeFieldName) {
              var childTree = mergeTree && mergeTree.map.get(storeFieldName);
              return Boolean(childTree && childTree.info && childTree.info.merge);
            };
            Object.keys(storeObject).forEach(function(storeFieldName) {
              if (hasSelectionSet_1(storeFieldName) && !hasMergeFunction_1(storeFieldName)) {
                warnAboutDataLoss(entityRef, storeObject, storeFieldName, context2.store);
              }
            });
          }
          store.merge(dataId2, storeObject);
        });
        store.retain(ref.__ref);
        return ref;
      };
      StoreWriter2.prototype.processSelectionSet = function(_a) {
        var _this = this;
        var dataId = _a.dataId, result = _a.result, selectionSet = _a.selectionSet, context2 = _a.context, mergeTree = _a.mergeTree;
        var policies = this.cache.policies;
        var incoming = /* @__PURE__ */ Object.create(null);
        var typename = dataId && policies.rootTypenamesById[dataId] || utilities.getTypenameFromResult(result, selectionSet, context2.fragmentMap) || dataId && context2.store.get(dataId, "__typename");
        if (typeof typename === "string") {
          incoming.__typename = typename;
        }
        var readField = function() {
          var options = normalizeReadFieldOptions(arguments, incoming, context2.variables);
          if (utilities.isReference(options.from)) {
            var info = context2.incomingById.get(options.from.__ref);
            if (info) {
              var result_1 = policies.readField(tslib.__assign(tslib.__assign({}, options), { from: info.storeObject }), context2);
              if (result_1 !== void 0) {
                return result_1;
              }
            }
          }
          return policies.readField(options, context2);
        };
        var fieldNodeSet = /* @__PURE__ */ new Set();
        this.flattenFields(selectionSet, result, context2, typename).forEach(function(context3, field) {
          var _a2;
          var resultFieldKey = utilities.resultKeyNameFromField(field);
          var value = result[resultFieldKey];
          fieldNodeSet.add(field);
          if (value !== void 0) {
            var storeFieldName = policies.getStoreFieldName({
              typename,
              fieldName: field.name.value,
              field,
              variables: context3.variables
            });
            var childTree = getChildMergeTree(mergeTree, storeFieldName);
            var incomingValue = _this.processFieldValue(value, field, field.selectionSet ? getContextFlavor(context3, false, false) : context3, childTree);
            var childTypename = void 0;
            if (field.selectionSet && (utilities.isReference(incomingValue) || storeValueIsStoreObject(incomingValue))) {
              childTypename = readField("__typename", incomingValue);
            }
            var merge = policies.getMergeFunction(typename, field.name.value, childTypename);
            if (merge) {
              childTree.info = {
                field,
                typename,
                merge
              };
            } else {
              maybeRecycleChildMergeTree(mergeTree, storeFieldName);
            }
            incoming = context3.merge(incoming, (_a2 = {}, _a2[storeFieldName] = incomingValue, _a2));
          } else if (__DEV__ && !context3.clientOnly && !context3.deferred && !utilities.addTypenameToDocument.added(field) && !policies.getReadFunction(typename, field.name.value)) {
            __DEV__ && globals.invariant.error("Missing field '".concat(utilities.resultKeyNameFromField(field), "' while writing result ").concat(JSON.stringify(result, null, 2)).substring(0, 1e3));
          }
        });
        try {
          var _b = policies.identify(result, {
            typename,
            selectionSet,
            fragmentMap: context2.fragmentMap,
            storeObject: incoming,
            readField
          }), id = _b[0], keyObject = _b[1];
          dataId = dataId || id;
          if (keyObject) {
            incoming = context2.merge(incoming, keyObject);
          }
        } catch (e) {
          if (!dataId)
            throw e;
        }
        if (typeof dataId === "string") {
          var dataRef = utilities.makeReference(dataId);
          var sets = context2.written[dataId] || (context2.written[dataId] = []);
          if (sets.indexOf(selectionSet) >= 0)
            return dataRef;
          sets.push(selectionSet);
          if (this.reader && this.reader.isFresh(result, dataRef, selectionSet, context2)) {
            return dataRef;
          }
          var previous_1 = context2.incomingById.get(dataId);
          if (previous_1) {
            previous_1.storeObject = context2.merge(previous_1.storeObject, incoming);
            previous_1.mergeTree = mergeMergeTrees(previous_1.mergeTree, mergeTree);
            fieldNodeSet.forEach(function(field) {
              return previous_1.fieldNodeSet.add(field);
            });
          } else {
            context2.incomingById.set(dataId, {
              storeObject: incoming,
              mergeTree: mergeTreeIsEmpty(mergeTree) ? void 0 : mergeTree,
              fieldNodeSet
            });
          }
          return dataRef;
        }
        return incoming;
      };
      StoreWriter2.prototype.processFieldValue = function(value, field, context2, mergeTree) {
        var _this = this;
        if (!field.selectionSet || value === null) {
          return __DEV__ ? utilities.cloneDeep(value) : value;
        }
        if (isArray(value)) {
          return value.map(function(item, i) {
            var value2 = _this.processFieldValue(item, field, context2, getChildMergeTree(mergeTree, i));
            maybeRecycleChildMergeTree(mergeTree, i);
            return value2;
          });
        }
        return this.processSelectionSet({
          result: value,
          selectionSet: field.selectionSet,
          context: context2,
          mergeTree
        });
      };
      StoreWriter2.prototype.flattenFields = function(selectionSet, result, context2, typename) {
        if (typename === void 0) {
          typename = utilities.getTypenameFromResult(result, selectionSet, context2.fragmentMap);
        }
        var fieldMap = /* @__PURE__ */ new Map();
        var policies = this.cache.policies;
        var limitingTrie = new trie.Trie(false);
        (function flatten(selectionSet2, inheritedContext) {
          var visitedNode = limitingTrie.lookup(selectionSet2, inheritedContext.clientOnly, inheritedContext.deferred);
          if (visitedNode.visited)
            return;
          visitedNode.visited = true;
          selectionSet2.selections.forEach(function(selection) {
            if (!utilities.shouldInclude(selection, context2.variables))
              return;
            var clientOnly = inheritedContext.clientOnly, deferred = inheritedContext.deferred;
            if (!(clientOnly && deferred) && utilities.isNonEmptyArray(selection.directives)) {
              selection.directives.forEach(function(dir) {
                var name = dir.name.value;
                if (name === "client")
                  clientOnly = true;
                if (name === "defer") {
                  var args = utilities.argumentsObjectFromField(dir, context2.variables);
                  if (!args || args.if !== false) {
                    deferred = true;
                  }
                }
              });
            }
            if (utilities.isField(selection)) {
              var existing = fieldMap.get(selection);
              if (existing) {
                clientOnly = clientOnly && existing.clientOnly;
                deferred = deferred && existing.deferred;
              }
              fieldMap.set(selection, getContextFlavor(context2, clientOnly, deferred));
            } else {
              var fragment = utilities.getFragmentFromSelection(selection, context2.fragmentMap);
              if (fragment && policies.fragmentMatches(fragment, typename, result, context2.variables)) {
                flatten(fragment.selectionSet, getContextFlavor(context2, clientOnly, deferred));
              }
            }
          });
        })(selectionSet, context2);
        return fieldMap;
      };
      StoreWriter2.prototype.applyMerges = function(mergeTree, existing, incoming, context2, getStorageArgs) {
        var _a;
        var _this = this;
        if (mergeTree.map.size && !utilities.isReference(incoming)) {
          var e_1 = !isArray(incoming) && (utilities.isReference(existing) || storeValueIsStoreObject(existing)) ? existing : void 0;
          var i_1 = incoming;
          if (e_1 && !getStorageArgs) {
            getStorageArgs = [utilities.isReference(e_1) ? e_1.__ref : e_1];
          }
          var changedFields_1;
          var getValue_1 = function(from, name) {
            return isArray(from) ? typeof name === "number" ? from[name] : void 0 : context2.store.getFieldValue(from, String(name));
          };
          mergeTree.map.forEach(function(childTree, storeFieldName) {
            var eVal = getValue_1(e_1, storeFieldName);
            var iVal = getValue_1(i_1, storeFieldName);
            if (iVal === void 0)
              return;
            if (getStorageArgs) {
              getStorageArgs.push(storeFieldName);
            }
            var aVal = _this.applyMerges(childTree, eVal, iVal, context2, getStorageArgs);
            if (aVal !== iVal) {
              changedFields_1 = changedFields_1 || /* @__PURE__ */ new Map();
              changedFields_1.set(storeFieldName, aVal);
            }
            if (getStorageArgs) {
              globals.invariant(getStorageArgs.pop() === storeFieldName);
            }
          });
          if (changedFields_1) {
            incoming = isArray(i_1) ? i_1.slice(0) : tslib.__assign({}, i_1);
            changedFields_1.forEach(function(value, name) {
              incoming[name] = value;
            });
          }
        }
        if (mergeTree.info) {
          return this.cache.policies.runMergeFunction(existing, incoming, mergeTree.info, context2, getStorageArgs && (_a = context2.store).getStorage.apply(_a, getStorageArgs));
        }
        return incoming;
      };
      return StoreWriter2;
    }();
    var emptyMergeTreePool = [];
    function getChildMergeTree(_a, name) {
      var map = _a.map;
      if (!map.has(name)) {
        map.set(name, emptyMergeTreePool.pop() || { map: /* @__PURE__ */ new Map() });
      }
      return map.get(name);
    }
    function mergeMergeTrees(left, right) {
      if (left === right || !right || mergeTreeIsEmpty(right))
        return left;
      if (!left || mergeTreeIsEmpty(left))
        return right;
      var info = left.info && right.info ? tslib.__assign(tslib.__assign({}, left.info), right.info) : left.info || right.info;
      var needToMergeMaps = left.map.size && right.map.size;
      var map = needToMergeMaps ? /* @__PURE__ */ new Map() : left.map.size ? left.map : right.map;
      var merged = { info, map };
      if (needToMergeMaps) {
        var remainingRightKeys_1 = new Set(right.map.keys());
        left.map.forEach(function(leftTree, key) {
          merged.map.set(key, mergeMergeTrees(leftTree, right.map.get(key)));
          remainingRightKeys_1.delete(key);
        });
        remainingRightKeys_1.forEach(function(key) {
          merged.map.set(key, mergeMergeTrees(right.map.get(key), left.map.get(key)));
        });
      }
      return merged;
    }
    function mergeTreeIsEmpty(tree) {
      return !tree || !(tree.info || tree.map.size);
    }
    function maybeRecycleChildMergeTree(_a, name) {
      var map = _a.map;
      var childTree = map.get(name);
      if (childTree && mergeTreeIsEmpty(childTree)) {
        emptyMergeTreePool.push(childTree);
        map.delete(name);
      }
    }
    var warnings = /* @__PURE__ */ new Set();
    function warnAboutDataLoss(existingRef, incomingObj, storeFieldName, store) {
      var getChild = function(objOrRef) {
        var child = store.getFieldValue(objOrRef, storeFieldName);
        return typeof child === "object" && child;
      };
      var existing = getChild(existingRef);
      if (!existing)
        return;
      var incoming = getChild(incomingObj);
      if (!incoming)
        return;
      if (utilities.isReference(existing))
        return;
      if (equality.equal(existing, incoming))
        return;
      if (Object.keys(existing).every(function(key) {
        return store.getFieldValue(incoming, key) !== void 0;
      })) {
        return;
      }
      var parentType = store.getFieldValue(existingRef, "__typename") || store.getFieldValue(incomingObj, "__typename");
      var fieldName = fieldNameFromStoreName(storeFieldName);
      var typeDotName = "".concat(parentType, ".").concat(fieldName);
      if (warnings.has(typeDotName))
        return;
      warnings.add(typeDotName);
      var childTypenames = [];
      if (!isArray(existing) && !isArray(incoming)) {
        [existing, incoming].forEach(function(child) {
          var typename = store.getFieldValue(child, "__typename");
          if (typeof typename === "string" && !childTypenames.includes(typename)) {
            childTypenames.push(typename);
          }
        });
      }
      __DEV__ && globals.invariant.warn("Cache data may be lost when replacing the ".concat(fieldName, " field of a ").concat(parentType, " object.\n\nTo address this problem (which is not a bug in Apollo Client), ").concat(childTypenames.length ? "either ensure all objects of type " + childTypenames.join(" and ") + " have an ID or a custom merge function, or " : "", "define a custom merge function for the ").concat(typeDotName, " field, so InMemoryCache can safely merge these objects:\n\n  existing: ").concat(JSON.stringify(existing).slice(0, 1e3), "\n  incoming: ").concat(JSON.stringify(incoming).slice(0, 1e3), "\n\nFor more information about these options, please refer to the documentation:\n\n  * Ensuring entity objects have IDs: https://go.apollo.dev/c/generating-unique-identifiers\n  * Defining custom merge functions: https://go.apollo.dev/c/merging-non-normalized-objects\n"));
    }
    var InMemoryCache2 = function(_super) {
      tslib.__extends(InMemoryCache3, _super);
      function InMemoryCache3(config) {
        if (config === void 0) {
          config = {};
        }
        var _this = _super.call(this) || this;
        _this.watches = /* @__PURE__ */ new Set();
        _this.typenameDocumentCache = /* @__PURE__ */ new Map();
        _this.makeVar = makeVar;
        _this.txCount = 0;
        _this.config = normalizeConfig(config);
        _this.addTypename = !!_this.config.addTypename;
        _this.policies = new Policies({
          cache: _this,
          dataIdFromObject: _this.config.dataIdFromObject,
          possibleTypes: _this.config.possibleTypes,
          typePolicies: _this.config.typePolicies
        });
        _this.init();
        return _this;
      }
      InMemoryCache3.prototype.init = function() {
        var rootStore = this.data = new exports.EntityStore.Root({
          policies: this.policies,
          resultCaching: this.config.resultCaching
        });
        this.optimisticData = rootStore.stump;
        this.resetResultCache();
      };
      InMemoryCache3.prototype.resetResultCache = function(resetResultIdentities) {
        var _this = this;
        var previousReader = this.storeReader;
        this.storeWriter = new StoreWriter(this, this.storeReader = new StoreReader({
          cache: this,
          addTypename: this.addTypename,
          resultCacheMaxSize: this.config.resultCacheMaxSize,
          canonizeResults: shouldCanonizeResults(this.config),
          canon: resetResultIdentities ? void 0 : previousReader && previousReader.canon
        }));
        this.maybeBroadcastWatch = optimism.wrap(function(c, options) {
          return _this.broadcastWatch(c, options);
        }, {
          max: this.config.resultCacheMaxSize,
          makeCacheKey: function(c) {
            var store = c.optimistic ? _this.optimisticData : _this.data;
            if (supportsResultCaching(store)) {
              var optimistic = c.optimistic, rootId = c.rootId, variables = c.variables;
              return store.makeCacheKey(c.query, c.callback, canonicalStringify({ optimistic, rootId, variables }));
            }
          }
        });
        (/* @__PURE__ */ new Set([
          this.data.group,
          this.optimisticData.group
        ])).forEach(function(group) {
          return group.resetCaching();
        });
      };
      InMemoryCache3.prototype.restore = function(data) {
        this.init();
        if (data)
          this.data.replace(data);
        return this;
      };
      InMemoryCache3.prototype.extract = function(optimistic) {
        if (optimistic === void 0) {
          optimistic = false;
        }
        return (optimistic ? this.optimisticData : this.data).extract();
      };
      InMemoryCache3.prototype.read = function(options) {
        var _a = options.returnPartialData, returnPartialData = _a === void 0 ? false : _a;
        try {
          return this.storeReader.diffQueryAgainstStore(tslib.__assign(tslib.__assign({}, options), { store: options.optimistic ? this.optimisticData : this.data, config: this.config, returnPartialData })).result || null;
        } catch (e) {
          if (e instanceof MissingFieldError) {
            return null;
          }
          throw e;
        }
      };
      InMemoryCache3.prototype.write = function(options) {
        try {
          ++this.txCount;
          return this.storeWriter.writeToStore(this.data, options);
        } finally {
          if (!--this.txCount && options.broadcast !== false) {
            this.broadcastWatches();
          }
        }
      };
      InMemoryCache3.prototype.modify = function(options) {
        if (hasOwn.call(options, "id") && !options.id) {
          return false;
        }
        var store = options.optimistic ? this.optimisticData : this.data;
        try {
          ++this.txCount;
          return store.modify(options.id || "ROOT_QUERY", options.fields);
        } finally {
          if (!--this.txCount && options.broadcast !== false) {
            this.broadcastWatches();
          }
        }
      };
      InMemoryCache3.prototype.diff = function(options) {
        return this.storeReader.diffQueryAgainstStore(tslib.__assign(tslib.__assign({}, options), { store: options.optimistic ? this.optimisticData : this.data, rootId: options.id || "ROOT_QUERY", config: this.config }));
      };
      InMemoryCache3.prototype.watch = function(watch) {
        var _this = this;
        if (!this.watches.size) {
          recallCache(this);
        }
        this.watches.add(watch);
        if (watch.immediate) {
          this.maybeBroadcastWatch(watch);
        }
        return function() {
          if (_this.watches.delete(watch) && !_this.watches.size) {
            forgetCache(_this);
          }
          _this.maybeBroadcastWatch.forget(watch);
        };
      };
      InMemoryCache3.prototype.gc = function(options) {
        canonicalStringify.reset();
        var ids = this.optimisticData.gc();
        if (options && !this.txCount) {
          if (options.resetResultCache) {
            this.resetResultCache(options.resetResultIdentities);
          } else if (options.resetResultIdentities) {
            this.storeReader.resetCanon();
          }
        }
        return ids;
      };
      InMemoryCache3.prototype.retain = function(rootId, optimistic) {
        return (optimistic ? this.optimisticData : this.data).retain(rootId);
      };
      InMemoryCache3.prototype.release = function(rootId, optimistic) {
        return (optimistic ? this.optimisticData : this.data).release(rootId);
      };
      InMemoryCache3.prototype.identify = function(object) {
        if (utilities.isReference(object))
          return object.__ref;
        try {
          return this.policies.identify(object)[0];
        } catch (e) {
          __DEV__ && globals.invariant.warn(e);
        }
      };
      InMemoryCache3.prototype.evict = function(options) {
        if (!options.id) {
          if (hasOwn.call(options, "id")) {
            return false;
          }
          options = tslib.__assign(tslib.__assign({}, options), { id: "ROOT_QUERY" });
        }
        try {
          ++this.txCount;
          return this.optimisticData.evict(options, this.data);
        } finally {
          if (!--this.txCount && options.broadcast !== false) {
            this.broadcastWatches();
          }
        }
      };
      InMemoryCache3.prototype.reset = function(options) {
        var _this = this;
        this.init();
        canonicalStringify.reset();
        if (options && options.discardWatches) {
          this.watches.forEach(function(watch) {
            return _this.maybeBroadcastWatch.forget(watch);
          });
          this.watches.clear();
          forgetCache(this);
        } else {
          this.broadcastWatches();
        }
        return Promise.resolve();
      };
      InMemoryCache3.prototype.removeOptimistic = function(idToRemove) {
        var newOptimisticData = this.optimisticData.removeLayer(idToRemove);
        if (newOptimisticData !== this.optimisticData) {
          this.optimisticData = newOptimisticData;
          this.broadcastWatches();
        }
      };
      InMemoryCache3.prototype.batch = function(options) {
        var _this = this;
        var update = options.update, _a = options.optimistic, optimistic = _a === void 0 ? true : _a, removeOptimistic = options.removeOptimistic, onWatchUpdated = options.onWatchUpdated;
        var updateResult;
        var perform = function(layer) {
          var _a2 = _this, data = _a2.data, optimisticData = _a2.optimisticData;
          ++_this.txCount;
          if (layer) {
            _this.data = _this.optimisticData = layer;
          }
          try {
            return updateResult = update(_this);
          } finally {
            --_this.txCount;
            _this.data = data;
            _this.optimisticData = optimisticData;
          }
        };
        var alreadyDirty = /* @__PURE__ */ new Set();
        if (onWatchUpdated && !this.txCount) {
          this.broadcastWatches(tslib.__assign(tslib.__assign({}, options), { onWatchUpdated: function(watch) {
            alreadyDirty.add(watch);
            return false;
          } }));
        }
        if (typeof optimistic === "string") {
          this.optimisticData = this.optimisticData.addLayer(optimistic, perform);
        } else if (optimistic === false) {
          perform(this.data);
        } else {
          perform();
        }
        if (typeof removeOptimistic === "string") {
          this.optimisticData = this.optimisticData.removeLayer(removeOptimistic);
        }
        if (onWatchUpdated && alreadyDirty.size) {
          this.broadcastWatches(tslib.__assign(tslib.__assign({}, options), { onWatchUpdated: function(watch, diff) {
            var result = onWatchUpdated.call(this, watch, diff);
            if (result !== false) {
              alreadyDirty.delete(watch);
            }
            return result;
          } }));
          if (alreadyDirty.size) {
            alreadyDirty.forEach(function(watch) {
              return _this.maybeBroadcastWatch.dirty(watch);
            });
          }
        } else {
          this.broadcastWatches(options);
        }
        return updateResult;
      };
      InMemoryCache3.prototype.performTransaction = function(update, optimisticId) {
        return this.batch({
          update,
          optimistic: optimisticId || optimisticId !== null
        });
      };
      InMemoryCache3.prototype.transformDocument = function(document) {
        if (this.addTypename) {
          var result = this.typenameDocumentCache.get(document);
          if (!result) {
            result = utilities.addTypenameToDocument(document);
            this.typenameDocumentCache.set(document, result);
            this.typenameDocumentCache.set(result, result);
          }
          return result;
        }
        return document;
      };
      InMemoryCache3.prototype.broadcastWatches = function(options) {
        var _this = this;
        if (!this.txCount) {
          this.watches.forEach(function(c) {
            return _this.maybeBroadcastWatch(c, options);
          });
        }
      };
      InMemoryCache3.prototype.broadcastWatch = function(c, options) {
        var lastDiff = c.lastDiff;
        var diff = this.diff(c);
        if (options) {
          if (c.optimistic && typeof options.optimistic === "string") {
            diff.fromOptimisticTransaction = true;
          }
          if (options.onWatchUpdated && options.onWatchUpdated.call(this, c, diff, lastDiff) === false) {
            return;
          }
        }
        if (!lastDiff || !equality.equal(lastDiff.result, diff.result)) {
          c.callback(c.lastDiff = diff, lastDiff);
        }
      };
      return InMemoryCache3;
    }(ApolloCache);
    exports.isReference = utilities.isReference;
    exports.makeReference = utilities.makeReference;
    exports.ApolloCache = ApolloCache;
    exports.InMemoryCache = InMemoryCache2;
    exports.MissingFieldError = MissingFieldError;
    exports.Policies = Policies;
    exports.cacheSlot = cacheSlot;
    exports.canonicalStringify = canonicalStringify;
    exports.defaultDataIdFromObject = defaultDataIdFromObject;
    exports.fieldNameFromStoreName = fieldNameFromStoreName;
    exports.makeVar = makeVar;
  }
});

// node_modules/@apollo/client/errors/errors.cjs
var require_errors = __commonJS({
  "node_modules/@apollo/client/errors/errors.cjs"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib = require("tslib");
    require_globals();
    var utilities = require_utilities();
    function isApolloError(err) {
      return err.hasOwnProperty("graphQLErrors");
    }
    var generateErrorMessage = function(err) {
      var message = "";
      if (utilities.isNonEmptyArray(err.graphQLErrors) || utilities.isNonEmptyArray(err.clientErrors)) {
        var errors = (err.graphQLErrors || []).concat(err.clientErrors || []);
        errors.forEach(function(error) {
          var errorMessage = error ? error.message : "Error message not found.";
          message += "".concat(errorMessage, "\n");
        });
      }
      if (err.networkError) {
        message += "".concat(err.networkError.message, "\n");
      }
      message = message.replace(/\n$/, "");
      return message;
    };
    var ApolloError = function(_super) {
      tslib.__extends(ApolloError2, _super);
      function ApolloError2(_a) {
        var graphQLErrors = _a.graphQLErrors, clientErrors = _a.clientErrors, networkError = _a.networkError, errorMessage = _a.errorMessage, extraInfo = _a.extraInfo;
        var _this = _super.call(this, errorMessage) || this;
        _this.graphQLErrors = graphQLErrors || [];
        _this.clientErrors = clientErrors || [];
        _this.networkError = networkError || null;
        _this.message = errorMessage || generateErrorMessage(_this);
        _this.extraInfo = extraInfo;
        _this.__proto__ = ApolloError2.prototype;
        return _this;
      }
      return ApolloError2;
    }(Error);
    exports.ApolloError = ApolloError;
    exports.isApolloError = isApolloError;
  }
});

// node_modules/@apollo/client/core/core.cjs
var require_core2 = __commonJS({
  "node_modules/@apollo/client/core/core.cjs"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var globals = require_globals();
    var tslib = require("tslib");
    var core = require_core();
    var http = require_http();
    var equality = require("@wry/equality");
    var cache = require_cache();
    var utilities = require_utilities();
    var errors = require_errors();
    var graphql = require("graphql");
    var utils = require_utils();
    var tsInvariant = require_invariant();
    var graphqlTag = require("graphql-tag");
    var version = "3.6.7";
    exports.NetworkStatus = void 0;
    (function(NetworkStatus) {
      NetworkStatus[NetworkStatus["loading"] = 1] = "loading";
      NetworkStatus[NetworkStatus["setVariables"] = 2] = "setVariables";
      NetworkStatus[NetworkStatus["fetchMore"] = 3] = "fetchMore";
      NetworkStatus[NetworkStatus["refetch"] = 4] = "refetch";
      NetworkStatus[NetworkStatus["poll"] = 6] = "poll";
      NetworkStatus[NetworkStatus["ready"] = 7] = "ready";
      NetworkStatus[NetworkStatus["error"] = 8] = "error";
    })(exports.NetworkStatus || (exports.NetworkStatus = {}));
    function isNetworkRequestInFlight(networkStatus) {
      return networkStatus ? networkStatus < 7 : false;
    }
    var assign = Object.assign;
    var hasOwnProperty$1 = Object.hasOwnProperty;
    var ObservableQuery = function(_super) {
      tslib.__extends(ObservableQuery2, _super);
      function ObservableQuery2(_a) {
        var queryManager = _a.queryManager, queryInfo = _a.queryInfo, options = _a.options;
        var _this = _super.call(this, function(observer) {
          try {
            var subObserver = observer._subscription._observer;
            if (subObserver && !subObserver.error) {
              subObserver.error = defaultSubscriptionObserverErrorCallback;
            }
          } catch (_a2) {
          }
          var first = !_this.observers.size;
          _this.observers.add(observer);
          var last = _this.last;
          if (last && last.error) {
            observer.error && observer.error(last.error);
          } else if (last && last.result) {
            observer.next && observer.next(last.result);
          }
          if (first) {
            _this.reobserve().catch(function() {
            });
          }
          return function() {
            if (_this.observers.delete(observer) && !_this.observers.size) {
              _this.tearDownQuery();
            }
          };
        }) || this;
        _this.observers = /* @__PURE__ */ new Set();
        _this.subscriptions = /* @__PURE__ */ new Set();
        _this.queryInfo = queryInfo;
        _this.queryManager = queryManager;
        _this.isTornDown = false;
        var _b = queryManager.defaultOptions.watchQuery, _c = _b === void 0 ? {} : _b, _d = _c.fetchPolicy, defaultFetchPolicy = _d === void 0 ? "cache-first" : _d;
        var _e = options.fetchPolicy, fetchPolicy = _e === void 0 ? defaultFetchPolicy : _e, _f = options.initialFetchPolicy, initialFetchPolicy = _f === void 0 ? fetchPolicy === "standby" ? defaultFetchPolicy : fetchPolicy : _f;
        _this.options = tslib.__assign(tslib.__assign({}, options), { initialFetchPolicy, fetchPolicy });
        _this.queryId = queryInfo.queryId || queryManager.generateQueryId();
        var opDef = utilities.getOperationDefinition(_this.query);
        _this.queryName = opDef && opDef.name && opDef.name.value;
        return _this;
      }
      Object.defineProperty(ObservableQuery2.prototype, "query", {
        get: function() {
          return this.queryManager.transform(this.options.query).document;
        },
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(ObservableQuery2.prototype, "variables", {
        get: function() {
          return this.options.variables;
        },
        enumerable: false,
        configurable: true
      });
      ObservableQuery2.prototype.result = function() {
        var _this = this;
        return new Promise(function(resolve, reject) {
          var observer = {
            next: function(result) {
              resolve(result);
              _this.observers.delete(observer);
              if (!_this.observers.size) {
                _this.queryManager.removeQuery(_this.queryId);
              }
              setTimeout(function() {
                subscription.unsubscribe();
              }, 0);
            },
            error: reject
          };
          var subscription = _this.subscribe(observer);
        });
      };
      ObservableQuery2.prototype.getCurrentResult = function(saveAsLastResult) {
        if (saveAsLastResult === void 0) {
          saveAsLastResult = true;
        }
        var lastResult = this.getLastResult(true);
        var networkStatus = this.queryInfo.networkStatus || lastResult && lastResult.networkStatus || exports.NetworkStatus.ready;
        var result = tslib.__assign(tslib.__assign({}, lastResult), { loading: isNetworkRequestInFlight(networkStatus), networkStatus });
        var _a = this.options.fetchPolicy, fetchPolicy = _a === void 0 ? "cache-first" : _a;
        if (fetchPolicy === "network-only" || fetchPolicy === "no-cache" || fetchPolicy === "standby" || this.queryManager.transform(this.options.query).hasForcedResolvers)
          ;
        else {
          var diff = this.queryInfo.getDiff();
          if (diff.complete || this.options.returnPartialData) {
            result.data = diff.result;
          }
          if (equality.equal(result.data, {})) {
            result.data = void 0;
          }
          if (diff.complete) {
            delete result.partial;
            if (diff.complete && result.networkStatus === exports.NetworkStatus.loading && (fetchPolicy === "cache-first" || fetchPolicy === "cache-only")) {
              result.networkStatus = exports.NetworkStatus.ready;
              result.loading = false;
            }
          } else {
            result.partial = true;
          }
          if (__DEV__ && !diff.complete && !this.options.partialRefetch && !result.loading && !result.data && !result.error) {
            logMissingFieldErrors(diff.missing);
          }
        }
        if (saveAsLastResult) {
          this.updateLastResult(result);
        }
        return result;
      };
      ObservableQuery2.prototype.isDifferentFromLastResult = function(newResult) {
        return !this.last || !equality.equal(this.last.result, newResult);
      };
      ObservableQuery2.prototype.getLast = function(key, variablesMustMatch) {
        var last = this.last;
        if (last && last[key] && (!variablesMustMatch || equality.equal(last.variables, this.variables))) {
          return last[key];
        }
      };
      ObservableQuery2.prototype.getLastResult = function(variablesMustMatch) {
        return this.getLast("result", variablesMustMatch);
      };
      ObservableQuery2.prototype.getLastError = function(variablesMustMatch) {
        return this.getLast("error", variablesMustMatch);
      };
      ObservableQuery2.prototype.resetLastResults = function() {
        delete this.last;
        this.isTornDown = false;
      };
      ObservableQuery2.prototype.resetQueryStoreErrors = function() {
        this.queryManager.resetErrors(this.queryId);
      };
      ObservableQuery2.prototype.refetch = function(variables) {
        var _a;
        var reobserveOptions = {
          pollInterval: 0
        };
        var fetchPolicy = this.options.fetchPolicy;
        if (fetchPolicy === "cache-and-network") {
          reobserveOptions.fetchPolicy = fetchPolicy;
        } else if (fetchPolicy === "no-cache") {
          reobserveOptions.fetchPolicy = "no-cache";
        } else {
          reobserveOptions.fetchPolicy = "network-only";
        }
        if (__DEV__ && variables && hasOwnProperty$1.call(variables, "variables")) {
          var queryDef = utilities.getQueryDefinition(this.query);
          var vars = queryDef.variableDefinitions;
          if (!vars || !vars.some(function(v) {
            return v.variable.name.value === "variables";
          })) {
            __DEV__ && globals.invariant.warn("Called refetch(".concat(JSON.stringify(variables), ") for query ").concat(((_a = queryDef.name) === null || _a === void 0 ? void 0 : _a.value) || JSON.stringify(queryDef), ", which does not declare a $variables variable.\nDid you mean to call refetch(variables) instead of refetch({ variables })?"));
          }
        }
        if (variables && !equality.equal(this.options.variables, variables)) {
          reobserveOptions.variables = this.options.variables = tslib.__assign(tslib.__assign({}, this.options.variables), variables);
        }
        this.queryInfo.resetLastWrite();
        return this.reobserve(reobserveOptions, exports.NetworkStatus.refetch);
      };
      ObservableQuery2.prototype.fetchMore = function(fetchMoreOptions) {
        var _this = this;
        var combinedOptions = tslib.__assign(tslib.__assign({}, fetchMoreOptions.query ? fetchMoreOptions : tslib.__assign(tslib.__assign(tslib.__assign(tslib.__assign({}, this.options), { query: this.query }), fetchMoreOptions), { variables: tslib.__assign(tslib.__assign({}, this.options.variables), fetchMoreOptions.variables) })), { fetchPolicy: "no-cache" });
        var qid = this.queryManager.generateQueryId();
        var queryInfo = this.queryInfo;
        var originalNetworkStatus = queryInfo.networkStatus;
        queryInfo.networkStatus = exports.NetworkStatus.fetchMore;
        if (combinedOptions.notifyOnNetworkStatusChange) {
          this.observe();
        }
        var updatedQuerySet = /* @__PURE__ */ new Set();
        return this.queryManager.fetchQuery(qid, combinedOptions, exports.NetworkStatus.fetchMore).then(function(fetchMoreResult) {
          _this.queryManager.removeQuery(qid);
          if (queryInfo.networkStatus === exports.NetworkStatus.fetchMore) {
            queryInfo.networkStatus = originalNetworkStatus;
          }
          _this.queryManager.cache.batch({
            update: function(cache2) {
              var updateQuery = fetchMoreOptions.updateQuery;
              if (updateQuery) {
                cache2.updateQuery({
                  query: _this.query,
                  variables: _this.variables,
                  returnPartialData: true,
                  optimistic: false
                }, function(previous) {
                  return updateQuery(previous, {
                    fetchMoreResult: fetchMoreResult.data,
                    variables: combinedOptions.variables
                  });
                });
              } else {
                cache2.writeQuery({
                  query: combinedOptions.query,
                  variables: combinedOptions.variables,
                  data: fetchMoreResult.data
                });
              }
            },
            onWatchUpdated: function(watch) {
              updatedQuerySet.add(watch.query);
            }
          });
          return fetchMoreResult;
        }).finally(function() {
          if (!updatedQuerySet.has(_this.query)) {
            reobserveCacheFirst(_this);
          }
        });
      };
      ObservableQuery2.prototype.subscribeToMore = function(options) {
        var _this = this;
        var subscription = this.queryManager.startGraphQLSubscription({
          query: options.document,
          variables: options.variables,
          context: options.context
        }).subscribe({
          next: function(subscriptionData) {
            var updateQuery = options.updateQuery;
            if (updateQuery) {
              _this.updateQuery(function(previous, _a) {
                var variables = _a.variables;
                return updateQuery(previous, {
                  subscriptionData,
                  variables
                });
              });
            }
          },
          error: function(err) {
            if (options.onError) {
              options.onError(err);
              return;
            }
            __DEV__ && globals.invariant.error("Unhandled GraphQL subscription error", err);
          }
        });
        this.subscriptions.add(subscription);
        return function() {
          if (_this.subscriptions.delete(subscription)) {
            subscription.unsubscribe();
          }
        };
      };
      ObservableQuery2.prototype.setOptions = function(newOptions) {
        return this.reobserve(newOptions);
      };
      ObservableQuery2.prototype.setVariables = function(variables) {
        if (equality.equal(this.variables, variables)) {
          return this.observers.size ? this.result() : Promise.resolve();
        }
        this.options.variables = variables;
        if (!this.observers.size) {
          return Promise.resolve();
        }
        return this.reobserve({
          fetchPolicy: this.options.initialFetchPolicy,
          variables
        }, exports.NetworkStatus.setVariables);
      };
      ObservableQuery2.prototype.updateQuery = function(mapFn) {
        var queryManager = this.queryManager;
        var result = queryManager.cache.diff({
          query: this.options.query,
          variables: this.variables,
          returnPartialData: true,
          optimistic: false
        }).result;
        var newResult = mapFn(result, {
          variables: this.variables
        });
        if (newResult) {
          queryManager.cache.writeQuery({
            query: this.options.query,
            data: newResult,
            variables: this.variables
          });
          queryManager.broadcastQueries();
        }
      };
      ObservableQuery2.prototype.startPolling = function(pollInterval) {
        this.options.pollInterval = pollInterval;
        this.updatePolling();
      };
      ObservableQuery2.prototype.stopPolling = function() {
        this.options.pollInterval = 0;
        this.updatePolling();
      };
      ObservableQuery2.prototype.applyNextFetchPolicy = function(reason, options) {
        if (options.nextFetchPolicy) {
          var _a = options.fetchPolicy, fetchPolicy = _a === void 0 ? "cache-first" : _a, _b = options.initialFetchPolicy, initialFetchPolicy = _b === void 0 ? fetchPolicy : _b;
          if (typeof options.nextFetchPolicy === "function") {
            options.fetchPolicy = options.nextFetchPolicy(fetchPolicy, {
              reason,
              options,
              observable: this,
              initialFetchPolicy
            });
          } else if (reason === "variables-changed") {
            options.fetchPolicy = initialFetchPolicy;
          } else {
            options.fetchPolicy = options.nextFetchPolicy;
          }
        }
        return options.fetchPolicy;
      };
      ObservableQuery2.prototype.fetch = function(options, newNetworkStatus) {
        this.queryManager.setObservableQuery(this);
        return this.queryManager.fetchQueryObservable(this.queryId, options, newNetworkStatus);
      };
      ObservableQuery2.prototype.updatePolling = function() {
        var _this = this;
        if (this.queryManager.ssrMode) {
          return;
        }
        var _a = this, pollingInfo = _a.pollingInfo, pollInterval = _a.options.pollInterval;
        if (!pollInterval) {
          if (pollingInfo) {
            clearTimeout(pollingInfo.timeout);
            delete this.pollingInfo;
          }
          return;
        }
        if (pollingInfo && pollingInfo.interval === pollInterval) {
          return;
        }
        __DEV__ ? globals.invariant(pollInterval, "Attempted to start a polling query without a polling interval.") : globals.invariant(pollInterval, 10);
        var info = pollingInfo || (this.pollingInfo = {});
        info.interval = pollInterval;
        var maybeFetch = function() {
          if (_this.pollingInfo) {
            if (!isNetworkRequestInFlight(_this.queryInfo.networkStatus)) {
              _this.reobserve({
                fetchPolicy: "network-only"
              }, exports.NetworkStatus.poll).then(poll, poll);
            } else {
              poll();
            }
          }
        };
        var poll = function() {
          var info2 = _this.pollingInfo;
          if (info2) {
            clearTimeout(info2.timeout);
            info2.timeout = setTimeout(maybeFetch, info2.interval);
          }
        };
        poll();
      };
      ObservableQuery2.prototype.updateLastResult = function(newResult, variables) {
        if (variables === void 0) {
          variables = this.variables;
        }
        this.last = tslib.__assign(tslib.__assign({}, this.last), { result: this.queryManager.assumeImmutableResults ? newResult : utilities.cloneDeep(newResult), variables });
        if (!utilities.isNonEmptyArray(newResult.errors)) {
          delete this.last.error;
        }
        return this.last;
      };
      ObservableQuery2.prototype.reobserve = function(newOptions, newNetworkStatus) {
        var _this = this;
        this.isTornDown = false;
        var useDisposableConcast = newNetworkStatus === exports.NetworkStatus.refetch || newNetworkStatus === exports.NetworkStatus.fetchMore || newNetworkStatus === exports.NetworkStatus.poll;
        var oldVariables = this.options.variables;
        var oldFetchPolicy = this.options.fetchPolicy;
        var mergedOptions = utilities.compact(this.options, newOptions || {});
        var options = useDisposableConcast ? mergedOptions : assign(this.options, mergedOptions);
        if (!useDisposableConcast) {
          this.updatePolling();
          if (newOptions && newOptions.variables && !equality.equal(newOptions.variables, oldVariables) && (!newOptions.fetchPolicy || newOptions.fetchPolicy === oldFetchPolicy)) {
            this.applyNextFetchPolicy("variables-changed", options);
            if (newNetworkStatus === void 0) {
              newNetworkStatus = exports.NetworkStatus.setVariables;
            }
          }
        }
        var variables = options.variables && tslib.__assign({}, options.variables);
        var concast = this.fetch(options, newNetworkStatus);
        var observer = {
          next: function(result) {
            _this.reportResult(result, variables);
          },
          error: function(error) {
            _this.reportError(error, variables);
          }
        };
        if (!useDisposableConcast) {
          if (this.concast && this.observer) {
            this.concast.removeObserver(this.observer, true);
          }
          this.concast = concast;
          this.observer = observer;
        }
        concast.addObserver(observer);
        return concast.promise;
      };
      ObservableQuery2.prototype.observe = function() {
        this.reportResult(this.getCurrentResult(false), this.variables);
      };
      ObservableQuery2.prototype.reportResult = function(result, variables) {
        var lastError = this.getLastError();
        if (lastError || this.isDifferentFromLastResult(result)) {
          if (lastError || !result.partial || this.options.returnPartialData) {
            this.updateLastResult(result, variables);
          }
          utilities.iterateObserversSafely(this.observers, "next", result);
        }
      };
      ObservableQuery2.prototype.reportError = function(error, variables) {
        var errorResult = tslib.__assign(tslib.__assign({}, this.getLastResult()), { error, errors: error.graphQLErrors, networkStatus: exports.NetworkStatus.error, loading: false });
        this.updateLastResult(errorResult, variables);
        utilities.iterateObserversSafely(this.observers, "error", this.last.error = error);
      };
      ObservableQuery2.prototype.hasObservers = function() {
        return this.observers.size > 0;
      };
      ObservableQuery2.prototype.tearDownQuery = function() {
        if (this.isTornDown)
          return;
        if (this.concast && this.observer) {
          this.concast.removeObserver(this.observer);
          delete this.concast;
          delete this.observer;
        }
        this.stopPolling();
        this.subscriptions.forEach(function(sub) {
          return sub.unsubscribe();
        });
        this.subscriptions.clear();
        this.queryManager.stopQuery(this.queryId);
        this.observers.clear();
        this.isTornDown = true;
      };
      return ObservableQuery2;
    }(utilities.Observable);
    utilities.fixObservableSubclass(ObservableQuery);
    function reobserveCacheFirst(obsQuery) {
      var _a = obsQuery.options, fetchPolicy = _a.fetchPolicy, nextFetchPolicy = _a.nextFetchPolicy;
      if (fetchPolicy === "cache-and-network" || fetchPolicy === "network-only") {
        return obsQuery.reobserve({
          fetchPolicy: "cache-first",
          nextFetchPolicy: function() {
            this.nextFetchPolicy = nextFetchPolicy;
            if (typeof nextFetchPolicy === "function") {
              return nextFetchPolicy.apply(this, arguments);
            }
            return fetchPolicy;
          }
        });
      }
      return obsQuery.reobserve();
    }
    function defaultSubscriptionObserverErrorCallback(error) {
      __DEV__ && globals.invariant.error("Unhandled error", error.message, error.stack);
    }
    function logMissingFieldErrors(missing) {
      if (__DEV__ && missing) {
        __DEV__ && globals.invariant.debug("Missing cache result fields: ".concat(JSON.stringify(missing)), missing);
      }
    }
    var LocalState = function() {
      function LocalState2(_a) {
        var cache2 = _a.cache, client = _a.client, resolvers = _a.resolvers, fragmentMatcher = _a.fragmentMatcher;
        this.cache = cache2;
        if (client) {
          this.client = client;
        }
        if (resolvers) {
          this.addResolvers(resolvers);
        }
        if (fragmentMatcher) {
          this.setFragmentMatcher(fragmentMatcher);
        }
      }
      LocalState2.prototype.addResolvers = function(resolvers) {
        var _this = this;
        this.resolvers = this.resolvers || {};
        if (Array.isArray(resolvers)) {
          resolvers.forEach(function(resolverGroup) {
            _this.resolvers = utilities.mergeDeep(_this.resolvers, resolverGroup);
          });
        } else {
          this.resolvers = utilities.mergeDeep(this.resolvers, resolvers);
        }
      };
      LocalState2.prototype.setResolvers = function(resolvers) {
        this.resolvers = {};
        this.addResolvers(resolvers);
      };
      LocalState2.prototype.getResolvers = function() {
        return this.resolvers || {};
      };
      LocalState2.prototype.runResolvers = function(_a) {
        var document = _a.document, remoteResult = _a.remoteResult, context = _a.context, variables = _a.variables, _b = _a.onlyRunForcedResolvers, onlyRunForcedResolvers = _b === void 0 ? false : _b;
        return tslib.__awaiter(this, void 0, void 0, function() {
          return tslib.__generator(this, function(_c) {
            if (document) {
              return [2, this.resolveDocument(document, remoteResult.data, context, variables, this.fragmentMatcher, onlyRunForcedResolvers).then(function(localResult) {
                return tslib.__assign(tslib.__assign({}, remoteResult), { data: localResult.result });
              })];
            }
            return [2, remoteResult];
          });
        });
      };
      LocalState2.prototype.setFragmentMatcher = function(fragmentMatcher) {
        this.fragmentMatcher = fragmentMatcher;
      };
      LocalState2.prototype.getFragmentMatcher = function() {
        return this.fragmentMatcher;
      };
      LocalState2.prototype.clientQuery = function(document) {
        if (utilities.hasDirectives(["client"], document)) {
          if (this.resolvers) {
            return document;
          }
        }
        return null;
      };
      LocalState2.prototype.serverQuery = function(document) {
        return utilities.removeClientSetsFromDocument(document);
      };
      LocalState2.prototype.prepareContext = function(context) {
        var cache2 = this.cache;
        return tslib.__assign(tslib.__assign({}, context), { cache: cache2, getCacheKey: function(obj) {
          return cache2.identify(obj);
        } });
      };
      LocalState2.prototype.addExportedVariables = function(document, variables, context) {
        if (variables === void 0) {
          variables = {};
        }
        if (context === void 0) {
          context = {};
        }
        return tslib.__awaiter(this, void 0, void 0, function() {
          return tslib.__generator(this, function(_a) {
            if (document) {
              return [2, this.resolveDocument(document, this.buildRootValueFromCache(document, variables) || {}, this.prepareContext(context), variables).then(function(data) {
                return tslib.__assign(tslib.__assign({}, variables), data.exportedVariables);
              })];
            }
            return [2, tslib.__assign({}, variables)];
          });
        });
      };
      LocalState2.prototype.shouldForceResolvers = function(document) {
        var forceResolvers = false;
        graphql.visit(document, {
          Directive: {
            enter: function(node) {
              if (node.name.value === "client" && node.arguments) {
                forceResolvers = node.arguments.some(function(arg) {
                  return arg.name.value === "always" && arg.value.kind === "BooleanValue" && arg.value.value === true;
                });
                if (forceResolvers) {
                  return graphql.BREAK;
                }
              }
            }
          }
        });
        return forceResolvers;
      };
      LocalState2.prototype.buildRootValueFromCache = function(document, variables) {
        return this.cache.diff({
          query: utilities.buildQueryFromSelectionSet(document),
          variables,
          returnPartialData: true,
          optimistic: false
        }).result;
      };
      LocalState2.prototype.resolveDocument = function(document, rootValue, context, variables, fragmentMatcher, onlyRunForcedResolvers) {
        if (context === void 0) {
          context = {};
        }
        if (variables === void 0) {
          variables = {};
        }
        if (fragmentMatcher === void 0) {
          fragmentMatcher = function() {
            return true;
          };
        }
        if (onlyRunForcedResolvers === void 0) {
          onlyRunForcedResolvers = false;
        }
        return tslib.__awaiter(this, void 0, void 0, function() {
          var mainDefinition, fragments, fragmentMap, definitionOperation, defaultOperationType, _a, cache2, client, execContext;
          return tslib.__generator(this, function(_b) {
            mainDefinition = utilities.getMainDefinition(document);
            fragments = utilities.getFragmentDefinitions(document);
            fragmentMap = utilities.createFragmentMap(fragments);
            definitionOperation = mainDefinition.operation;
            defaultOperationType = definitionOperation ? definitionOperation.charAt(0).toUpperCase() + definitionOperation.slice(1) : "Query";
            _a = this, cache2 = _a.cache, client = _a.client;
            execContext = {
              fragmentMap,
              context: tslib.__assign(tslib.__assign({}, context), { cache: cache2, client }),
              variables,
              fragmentMatcher,
              defaultOperationType,
              exportedVariables: {},
              onlyRunForcedResolvers
            };
            return [2, this.resolveSelectionSet(mainDefinition.selectionSet, rootValue, execContext).then(function(result) {
              return {
                result,
                exportedVariables: execContext.exportedVariables
              };
            })];
          });
        });
      };
      LocalState2.prototype.resolveSelectionSet = function(selectionSet, rootValue, execContext) {
        return tslib.__awaiter(this, void 0, void 0, function() {
          var fragmentMap, context, variables, resultsToMerge, execute;
          var _this = this;
          return tslib.__generator(this, function(_a) {
            fragmentMap = execContext.fragmentMap, context = execContext.context, variables = execContext.variables;
            resultsToMerge = [rootValue];
            execute = function(selection) {
              return tslib.__awaiter(_this, void 0, void 0, function() {
                var fragment, typeCondition;
                return tslib.__generator(this, function(_a2) {
                  if (!utilities.shouldInclude(selection, variables)) {
                    return [2];
                  }
                  if (utilities.isField(selection)) {
                    return [2, this.resolveField(selection, rootValue, execContext).then(function(fieldResult) {
                      var _a3;
                      if (typeof fieldResult !== "undefined") {
                        resultsToMerge.push((_a3 = {}, _a3[utilities.resultKeyNameFromField(selection)] = fieldResult, _a3));
                      }
                    })];
                  }
                  if (utilities.isInlineFragment(selection)) {
                    fragment = selection;
                  } else {
                    fragment = fragmentMap[selection.name.value];
                    __DEV__ ? globals.invariant(fragment, "No fragment named ".concat(selection.name.value)) : globals.invariant(fragment, 9);
                  }
                  if (fragment && fragment.typeCondition) {
                    typeCondition = fragment.typeCondition.name.value;
                    if (execContext.fragmentMatcher(rootValue, typeCondition, context)) {
                      return [2, this.resolveSelectionSet(fragment.selectionSet, rootValue, execContext).then(function(fragmentResult) {
                        resultsToMerge.push(fragmentResult);
                      })];
                    }
                  }
                  return [2];
                });
              });
            };
            return [2, Promise.all(selectionSet.selections.map(execute)).then(function() {
              return utilities.mergeDeepArray(resultsToMerge);
            })];
          });
        });
      };
      LocalState2.prototype.resolveField = function(field, rootValue, execContext) {
        return tslib.__awaiter(this, void 0, void 0, function() {
          var variables, fieldName, aliasedFieldName, aliasUsed, defaultResult, resultPromise, resolverType, resolverMap, resolve;
          var _this = this;
          return tslib.__generator(this, function(_a) {
            variables = execContext.variables;
            fieldName = field.name.value;
            aliasedFieldName = utilities.resultKeyNameFromField(field);
            aliasUsed = fieldName !== aliasedFieldName;
            defaultResult = rootValue[aliasedFieldName] || rootValue[fieldName];
            resultPromise = Promise.resolve(defaultResult);
            if (!execContext.onlyRunForcedResolvers || this.shouldForceResolvers(field)) {
              resolverType = rootValue.__typename || execContext.defaultOperationType;
              resolverMap = this.resolvers && this.resolvers[resolverType];
              if (resolverMap) {
                resolve = resolverMap[aliasUsed ? fieldName : aliasedFieldName];
                if (resolve) {
                  resultPromise = Promise.resolve(cache.cacheSlot.withValue(this.cache, resolve, [
                    rootValue,
                    utilities.argumentsObjectFromField(field, variables),
                    execContext.context,
                    { field, fragmentMap: execContext.fragmentMap }
                  ]));
                }
              }
            }
            return [2, resultPromise.then(function(result) {
              if (result === void 0) {
                result = defaultResult;
              }
              if (field.directives) {
                field.directives.forEach(function(directive) {
                  if (directive.name.value === "export" && directive.arguments) {
                    directive.arguments.forEach(function(arg) {
                      if (arg.name.value === "as" && arg.value.kind === "StringValue") {
                        execContext.exportedVariables[arg.value.value] = result;
                      }
                    });
                  }
                });
              }
              if (!field.selectionSet) {
                return result;
              }
              if (result == null) {
                return result;
              }
              if (Array.isArray(result)) {
                return _this.resolveSubSelectedArray(field, result, execContext);
              }
              if (field.selectionSet) {
                return _this.resolveSelectionSet(field.selectionSet, result, execContext);
              }
            })];
          });
        });
      };
      LocalState2.prototype.resolveSubSelectedArray = function(field, result, execContext) {
        var _this = this;
        return Promise.all(result.map(function(item) {
          if (item === null) {
            return null;
          }
          if (Array.isArray(item)) {
            return _this.resolveSubSelectedArray(field, item, execContext);
          }
          if (field.selectionSet) {
            return _this.resolveSelectionSet(field.selectionSet, item, execContext);
          }
        }));
      };
      return LocalState2;
    }();
    var destructiveMethodCounts = new (utilities.canUseWeakMap ? WeakMap : Map)();
    function wrapDestructiveCacheMethod(cache2, methodName) {
      var original = cache2[methodName];
      if (typeof original === "function") {
        cache2[methodName] = function() {
          destructiveMethodCounts.set(cache2, (destructiveMethodCounts.get(cache2) + 1) % 1e15);
          return original.apply(this, arguments);
        };
      }
    }
    function cancelNotifyTimeout(info) {
      if (info["notifyTimeout"]) {
        clearTimeout(info["notifyTimeout"]);
        info["notifyTimeout"] = void 0;
      }
    }
    var QueryInfo = function() {
      function QueryInfo2(queryManager, queryId) {
        if (queryId === void 0) {
          queryId = queryManager.generateQueryId();
        }
        this.queryId = queryId;
        this.listeners = /* @__PURE__ */ new Set();
        this.document = null;
        this.lastRequestId = 1;
        this.subscriptions = /* @__PURE__ */ new Set();
        this.stopped = false;
        this.dirty = false;
        this.observableQuery = null;
        var cache2 = this.cache = queryManager.cache;
        if (!destructiveMethodCounts.has(cache2)) {
          destructiveMethodCounts.set(cache2, 0);
          wrapDestructiveCacheMethod(cache2, "evict");
          wrapDestructiveCacheMethod(cache2, "modify");
          wrapDestructiveCacheMethod(cache2, "reset");
        }
      }
      QueryInfo2.prototype.init = function(query) {
        var networkStatus = query.networkStatus || exports.NetworkStatus.loading;
        if (this.variables && this.networkStatus !== exports.NetworkStatus.loading && !equality.equal(this.variables, query.variables)) {
          networkStatus = exports.NetworkStatus.setVariables;
        }
        if (!equality.equal(query.variables, this.variables)) {
          this.lastDiff = void 0;
        }
        Object.assign(this, {
          document: query.document,
          variables: query.variables,
          networkError: null,
          graphQLErrors: this.graphQLErrors || [],
          networkStatus
        });
        if (query.observableQuery) {
          this.setObservableQuery(query.observableQuery);
        }
        if (query.lastRequestId) {
          this.lastRequestId = query.lastRequestId;
        }
        return this;
      };
      QueryInfo2.prototype.reset = function() {
        cancelNotifyTimeout(this);
        this.lastDiff = void 0;
        this.dirty = false;
      };
      QueryInfo2.prototype.getDiff = function(variables) {
        if (variables === void 0) {
          variables = this.variables;
        }
        var options = this.getDiffOptions(variables);
        if (this.lastDiff && equality.equal(options, this.lastDiff.options)) {
          return this.lastDiff.diff;
        }
        this.updateWatch(this.variables = variables);
        var oq = this.observableQuery;
        if (oq && oq.options.fetchPolicy === "no-cache") {
          return { complete: false };
        }
        var diff = this.cache.diff(options);
        this.updateLastDiff(diff, options);
        return diff;
      };
      QueryInfo2.prototype.updateLastDiff = function(diff, options) {
        this.lastDiff = diff ? {
          diff,
          options: options || this.getDiffOptions()
        } : void 0;
      };
      QueryInfo2.prototype.getDiffOptions = function(variables) {
        var _a;
        if (variables === void 0) {
          variables = this.variables;
        }
        return {
          query: this.document,
          variables,
          returnPartialData: true,
          optimistic: true,
          canonizeResults: (_a = this.observableQuery) === null || _a === void 0 ? void 0 : _a.options.canonizeResults
        };
      };
      QueryInfo2.prototype.setDiff = function(diff) {
        var _this = this;
        var oldDiff = this.lastDiff && this.lastDiff.diff;
        this.updateLastDiff(diff);
        if (!this.dirty && !equality.equal(oldDiff && oldDiff.result, diff && diff.result)) {
          this.dirty = true;
          if (!this.notifyTimeout) {
            this.notifyTimeout = setTimeout(function() {
              return _this.notify();
            }, 0);
          }
        }
      };
      QueryInfo2.prototype.setObservableQuery = function(oq) {
        var _this = this;
        if (oq === this.observableQuery)
          return;
        if (this.oqListener) {
          this.listeners.delete(this.oqListener);
        }
        this.observableQuery = oq;
        if (oq) {
          oq["queryInfo"] = this;
          this.listeners.add(this.oqListener = function() {
            var diff = _this.getDiff();
            if (diff.fromOptimisticTransaction) {
              oq["observe"]();
            } else {
              reobserveCacheFirst(oq);
            }
          });
        } else {
          delete this.oqListener;
        }
      };
      QueryInfo2.prototype.notify = function() {
        var _this = this;
        cancelNotifyTimeout(this);
        if (this.shouldNotify()) {
          this.listeners.forEach(function(listener) {
            return listener(_this);
          });
        }
        this.dirty = false;
      };
      QueryInfo2.prototype.shouldNotify = function() {
        if (!this.dirty || !this.listeners.size) {
          return false;
        }
        if (isNetworkRequestInFlight(this.networkStatus) && this.observableQuery) {
          var fetchPolicy = this.observableQuery.options.fetchPolicy;
          if (fetchPolicy !== "cache-only" && fetchPolicy !== "cache-and-network") {
            return false;
          }
        }
        return true;
      };
      QueryInfo2.prototype.stop = function() {
        if (!this.stopped) {
          this.stopped = true;
          this.reset();
          this.cancel();
          this.cancel = QueryInfo2.prototype.cancel;
          this.subscriptions.forEach(function(sub) {
            return sub.unsubscribe();
          });
          var oq = this.observableQuery;
          if (oq)
            oq.stopPolling();
        }
      };
      QueryInfo2.prototype.cancel = function() {
      };
      QueryInfo2.prototype.updateWatch = function(variables) {
        var _this = this;
        if (variables === void 0) {
          variables = this.variables;
        }
        var oq = this.observableQuery;
        if (oq && oq.options.fetchPolicy === "no-cache") {
          return;
        }
        var watchOptions = tslib.__assign(tslib.__assign({}, this.getDiffOptions(variables)), { watcher: this, callback: function(diff) {
          return _this.setDiff(diff);
        } });
        if (!this.lastWatch || !equality.equal(watchOptions, this.lastWatch)) {
          this.cancel();
          this.cancel = this.cache.watch(this.lastWatch = watchOptions);
        }
      };
      QueryInfo2.prototype.resetLastWrite = function() {
        this.lastWrite = void 0;
      };
      QueryInfo2.prototype.shouldWrite = function(result, variables) {
        var lastWrite = this.lastWrite;
        return !(lastWrite && lastWrite.dmCount === destructiveMethodCounts.get(this.cache) && equality.equal(variables, lastWrite.variables) && equality.equal(result.data, lastWrite.result.data));
      };
      QueryInfo2.prototype.markResult = function(result, options, cacheWriteBehavior) {
        var _this = this;
        this.graphQLErrors = utilities.isNonEmptyArray(result.errors) ? result.errors : [];
        this.reset();
        if (options.fetchPolicy === "no-cache") {
          this.updateLastDiff({ result: result.data, complete: true }, this.getDiffOptions(options.variables));
        } else if (cacheWriteBehavior !== 0) {
          if (shouldWriteResult(result, options.errorPolicy)) {
            this.cache.performTransaction(function(cache2) {
              if (_this.shouldWrite(result, options.variables)) {
                cache2.writeQuery({
                  query: _this.document,
                  data: result.data,
                  variables: options.variables,
                  overwrite: cacheWriteBehavior === 1
                });
                _this.lastWrite = {
                  result,
                  variables: options.variables,
                  dmCount: destructiveMethodCounts.get(_this.cache)
                };
              } else {
                if (_this.lastDiff && _this.lastDiff.diff.complete) {
                  result.data = _this.lastDiff.diff.result;
                  return;
                }
              }
              var diffOptions = _this.getDiffOptions(options.variables);
              var diff = cache2.diff(diffOptions);
              if (!_this.stopped) {
                _this.updateWatch(options.variables);
              }
              _this.updateLastDiff(diff, diffOptions);
              if (diff.complete) {
                result.data = diff.result;
              }
            });
          } else {
            this.lastWrite = void 0;
          }
        }
      };
      QueryInfo2.prototype.markReady = function() {
        this.networkError = null;
        return this.networkStatus = exports.NetworkStatus.ready;
      };
      QueryInfo2.prototype.markError = function(error) {
        this.networkStatus = exports.NetworkStatus.error;
        this.lastWrite = void 0;
        this.reset();
        if (error.graphQLErrors) {
          this.graphQLErrors = error.graphQLErrors;
        }
        if (error.networkError) {
          this.networkError = error.networkError;
        }
        return error;
      };
      return QueryInfo2;
    }();
    function shouldWriteResult(result, errorPolicy) {
      if (errorPolicy === void 0) {
        errorPolicy = "none";
      }
      var ignoreErrors = errorPolicy === "ignore" || errorPolicy === "all";
      var writeWithErrors = !utilities.graphQLResultHasError(result);
      if (!writeWithErrors && ignoreErrors && result.data) {
        writeWithErrors = true;
      }
      return writeWithErrors;
    }
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var QueryManager = function() {
      function QueryManager2(_a) {
        var cache2 = _a.cache, link = _a.link, defaultOptions = _a.defaultOptions, _b = _a.queryDeduplication, queryDeduplication = _b === void 0 ? false : _b, onBroadcast = _a.onBroadcast, _c = _a.ssrMode, ssrMode = _c === void 0 ? false : _c, _d = _a.clientAwareness, clientAwareness = _d === void 0 ? {} : _d, localState = _a.localState, assumeImmutableResults = _a.assumeImmutableResults;
        this.clientAwareness = {};
        this.queries = /* @__PURE__ */ new Map();
        this.fetchCancelFns = /* @__PURE__ */ new Map();
        this.transformCache = new (utilities.canUseWeakMap ? WeakMap : Map)();
        this.queryIdCounter = 1;
        this.requestIdCounter = 1;
        this.mutationIdCounter = 1;
        this.inFlightLinkObservables = /* @__PURE__ */ new Map();
        this.cache = cache2;
        this.link = link;
        this.defaultOptions = defaultOptions || /* @__PURE__ */ Object.create(null);
        this.queryDeduplication = queryDeduplication;
        this.clientAwareness = clientAwareness;
        this.localState = localState || new LocalState({ cache: cache2 });
        this.ssrMode = ssrMode;
        this.assumeImmutableResults = !!assumeImmutableResults;
        if (this.onBroadcast = onBroadcast) {
          this.mutationStore = /* @__PURE__ */ Object.create(null);
        }
      }
      QueryManager2.prototype.stop = function() {
        var _this = this;
        this.queries.forEach(function(_info, queryId) {
          _this.stopQueryNoBroadcast(queryId);
        });
        this.cancelPendingFetches(__DEV__ ? new globals.InvariantError("QueryManager stopped while query was in flight") : new globals.InvariantError(11));
      };
      QueryManager2.prototype.cancelPendingFetches = function(error) {
        this.fetchCancelFns.forEach(function(cancel) {
          return cancel(error);
        });
        this.fetchCancelFns.clear();
      };
      QueryManager2.prototype.mutate = function(_a) {
        var _b, _c;
        var mutation = _a.mutation, variables = _a.variables, optimisticResponse = _a.optimisticResponse, updateQueries = _a.updateQueries, _d = _a.refetchQueries, refetchQueries = _d === void 0 ? [] : _d, _e = _a.awaitRefetchQueries, awaitRefetchQueries = _e === void 0 ? false : _e, updateWithProxyFn = _a.update, onQueryUpdated = _a.onQueryUpdated, _f = _a.fetchPolicy, fetchPolicy = _f === void 0 ? ((_b = this.defaultOptions.mutate) === null || _b === void 0 ? void 0 : _b.fetchPolicy) || "network-only" : _f, _g = _a.errorPolicy, errorPolicy = _g === void 0 ? ((_c = this.defaultOptions.mutate) === null || _c === void 0 ? void 0 : _c.errorPolicy) || "none" : _g, keepRootFields = _a.keepRootFields, context = _a.context;
        return tslib.__awaiter(this, void 0, void 0, function() {
          var mutationId, mutationStoreValue, self2;
          return tslib.__generator(this, function(_h) {
            switch (_h.label) {
              case 0:
                __DEV__ ? globals.invariant(mutation, "mutation option is required. You must specify your GraphQL document in the mutation option.") : globals.invariant(mutation, 12);
                __DEV__ ? globals.invariant(fetchPolicy === "network-only" || fetchPolicy === "no-cache", "Mutations support only 'network-only' or 'no-cache' fetchPolicy strings. The default `network-only` behavior automatically writes mutation results to the cache. Passing `no-cache` skips the cache write.") : globals.invariant(fetchPolicy === "network-only" || fetchPolicy === "no-cache", 13);
                mutationId = this.generateMutationId();
                mutation = this.transform(mutation).document;
                variables = this.getVariables(mutation, variables);
                if (!this.transform(mutation).hasClientExports)
                  return [3, 2];
                return [4, this.localState.addExportedVariables(mutation, variables, context)];
              case 1:
                variables = _h.sent();
                _h.label = 2;
              case 2:
                mutationStoreValue = this.mutationStore && (this.mutationStore[mutationId] = {
                  mutation,
                  variables,
                  loading: true,
                  error: null
                });
                if (optimisticResponse) {
                  this.markMutationOptimistic(optimisticResponse, {
                    mutationId,
                    document: mutation,
                    variables,
                    fetchPolicy,
                    errorPolicy,
                    context,
                    updateQueries,
                    update: updateWithProxyFn,
                    keepRootFields
                  });
                }
                this.broadcastQueries();
                self2 = this;
                return [2, new Promise(function(resolve, reject) {
                  return utilities.asyncMap(self2.getObservableFromLink(mutation, tslib.__assign(tslib.__assign({}, context), { optimisticResponse }), variables, false), function(result) {
                    if (utilities.graphQLResultHasError(result) && errorPolicy === "none") {
                      throw new errors.ApolloError({
                        graphQLErrors: result.errors
                      });
                    }
                    if (mutationStoreValue) {
                      mutationStoreValue.loading = false;
                      mutationStoreValue.error = null;
                    }
                    var storeResult = tslib.__assign({}, result);
                    if (typeof refetchQueries === "function") {
                      refetchQueries = refetchQueries(storeResult);
                    }
                    if (errorPolicy === "ignore" && utilities.graphQLResultHasError(storeResult)) {
                      delete storeResult.errors;
                    }
                    return self2.markMutationResult({
                      mutationId,
                      result: storeResult,
                      document: mutation,
                      variables,
                      fetchPolicy,
                      errorPolicy,
                      context,
                      update: updateWithProxyFn,
                      updateQueries,
                      awaitRefetchQueries,
                      refetchQueries,
                      removeOptimistic: optimisticResponse ? mutationId : void 0,
                      onQueryUpdated,
                      keepRootFields
                    });
                  }).subscribe({
                    next: function(storeResult) {
                      self2.broadcastQueries();
                      resolve(storeResult);
                    },
                    error: function(err) {
                      if (mutationStoreValue) {
                        mutationStoreValue.loading = false;
                        mutationStoreValue.error = err;
                      }
                      if (optimisticResponse) {
                        self2.cache.removeOptimistic(mutationId);
                      }
                      self2.broadcastQueries();
                      reject(err instanceof errors.ApolloError ? err : new errors.ApolloError({
                        networkError: err
                      }));
                    }
                  });
                })];
            }
          });
        });
      };
      QueryManager2.prototype.markMutationResult = function(mutation, cache2) {
        var _this = this;
        if (cache2 === void 0) {
          cache2 = this.cache;
        }
        var result = mutation.result;
        var cacheWrites = [];
        var skipCache = mutation.fetchPolicy === "no-cache";
        if (!skipCache && shouldWriteResult(result, mutation.errorPolicy)) {
          cacheWrites.push({
            result: result.data,
            dataId: "ROOT_MUTATION",
            query: mutation.document,
            variables: mutation.variables
          });
          var updateQueries_1 = mutation.updateQueries;
          if (updateQueries_1) {
            this.queries.forEach(function(_a, queryId) {
              var observableQuery = _a.observableQuery;
              var queryName = observableQuery && observableQuery.queryName;
              if (!queryName || !hasOwnProperty.call(updateQueries_1, queryName)) {
                return;
              }
              var updater = updateQueries_1[queryName];
              var _b = _this.queries.get(queryId), document = _b.document, variables = _b.variables;
              var _c = cache2.diff({
                query: document,
                variables,
                returnPartialData: true,
                optimistic: false
              }), currentQueryResult = _c.result, complete = _c.complete;
              if (complete && currentQueryResult) {
                var nextQueryResult = updater(currentQueryResult, {
                  mutationResult: result,
                  queryName: document && utilities.getOperationName(document) || void 0,
                  queryVariables: variables
                });
                if (nextQueryResult) {
                  cacheWrites.push({
                    result: nextQueryResult,
                    dataId: "ROOT_QUERY",
                    query: document,
                    variables
                  });
                }
              }
            });
          }
        }
        if (cacheWrites.length > 0 || mutation.refetchQueries || mutation.update || mutation.onQueryUpdated || mutation.removeOptimistic) {
          var results_1 = [];
          this.refetchQueries({
            updateCache: function(cache3) {
              if (!skipCache) {
                cacheWrites.forEach(function(write) {
                  return cache3.write(write);
                });
              }
              var update = mutation.update;
              if (update) {
                if (!skipCache) {
                  var diff = cache3.diff({
                    id: "ROOT_MUTATION",
                    query: _this.transform(mutation.document).asQuery,
                    variables: mutation.variables,
                    optimistic: false,
                    returnPartialData: true
                  });
                  if (diff.complete) {
                    result = tslib.__assign(tslib.__assign({}, result), { data: diff.result });
                  }
                }
                update(cache3, result, {
                  context: mutation.context,
                  variables: mutation.variables
                });
              }
              if (!skipCache && !mutation.keepRootFields) {
                cache3.modify({
                  id: "ROOT_MUTATION",
                  fields: function(value, _a) {
                    var fieldName = _a.fieldName, DELETE = _a.DELETE;
                    return fieldName === "__typename" ? value : DELETE;
                  }
                });
              }
            },
            include: mutation.refetchQueries,
            optimistic: false,
            removeOptimistic: mutation.removeOptimistic,
            onQueryUpdated: mutation.onQueryUpdated || null
          }).forEach(function(result2) {
            return results_1.push(result2);
          });
          if (mutation.awaitRefetchQueries || mutation.onQueryUpdated) {
            return Promise.all(results_1).then(function() {
              return result;
            });
          }
        }
        return Promise.resolve(result);
      };
      QueryManager2.prototype.markMutationOptimistic = function(optimisticResponse, mutation) {
        var _this = this;
        var data = typeof optimisticResponse === "function" ? optimisticResponse(mutation.variables) : optimisticResponse;
        return this.cache.recordOptimisticTransaction(function(cache2) {
          try {
            _this.markMutationResult(tslib.__assign(tslib.__assign({}, mutation), { result: { data } }), cache2);
          } catch (error) {
            __DEV__ && globals.invariant.error(error);
          }
        }, mutation.mutationId);
      };
      QueryManager2.prototype.fetchQuery = function(queryId, options, networkStatus) {
        return this.fetchQueryObservable(queryId, options, networkStatus).promise;
      };
      QueryManager2.prototype.getQueryStore = function() {
        var store = /* @__PURE__ */ Object.create(null);
        this.queries.forEach(function(info, queryId) {
          store[queryId] = {
            variables: info.variables,
            networkStatus: info.networkStatus,
            networkError: info.networkError,
            graphQLErrors: info.graphQLErrors
          };
        });
        return store;
      };
      QueryManager2.prototype.resetErrors = function(queryId) {
        var queryInfo = this.queries.get(queryId);
        if (queryInfo) {
          queryInfo.networkError = void 0;
          queryInfo.graphQLErrors = [];
        }
      };
      QueryManager2.prototype.transform = function(document) {
        var transformCache = this.transformCache;
        if (!transformCache.has(document)) {
          var transformed = this.cache.transformDocument(document);
          var forLink = utilities.removeConnectionDirectiveFromDocument(this.cache.transformForLink(transformed));
          var clientQuery = this.localState.clientQuery(transformed);
          var serverQuery = forLink && this.localState.serverQuery(forLink);
          var cacheEntry_1 = {
            document: transformed,
            hasClientExports: utilities.hasClientExports(transformed),
            hasForcedResolvers: this.localState.shouldForceResolvers(transformed),
            clientQuery,
            serverQuery,
            defaultVars: utilities.getDefaultValues(utilities.getOperationDefinition(transformed)),
            asQuery: tslib.__assign(tslib.__assign({}, transformed), { definitions: transformed.definitions.map(function(def) {
              if (def.kind === "OperationDefinition" && def.operation !== "query") {
                return tslib.__assign(tslib.__assign({}, def), { operation: "query" });
              }
              return def;
            }) })
          };
          var add = function(doc) {
            if (doc && !transformCache.has(doc)) {
              transformCache.set(doc, cacheEntry_1);
            }
          };
          add(document);
          add(transformed);
          add(clientQuery);
          add(serverQuery);
        }
        return transformCache.get(document);
      };
      QueryManager2.prototype.getVariables = function(document, variables) {
        return tslib.__assign(tslib.__assign({}, this.transform(document).defaultVars), variables);
      };
      QueryManager2.prototype.watchQuery = function(options) {
        options = tslib.__assign(tslib.__assign({}, options), { variables: this.getVariables(options.query, options.variables) });
        if (typeof options.notifyOnNetworkStatusChange === "undefined") {
          options.notifyOnNetworkStatusChange = false;
        }
        var queryInfo = new QueryInfo(this);
        var observable = new ObservableQuery({
          queryManager: this,
          queryInfo,
          options
        });
        this.queries.set(observable.queryId, queryInfo);
        queryInfo.init({
          document: observable.query,
          observableQuery: observable,
          variables: observable.variables
        });
        return observable;
      };
      QueryManager2.prototype.query = function(options, queryId) {
        var _this = this;
        if (queryId === void 0) {
          queryId = this.generateQueryId();
        }
        __DEV__ ? globals.invariant(options.query, "query option is required. You must specify your GraphQL document in the query option.") : globals.invariant(options.query, 14);
        __DEV__ ? globals.invariant(options.query.kind === "Document", 'You must wrap the query string in a "gql" tag.') : globals.invariant(options.query.kind === "Document", 15);
        __DEV__ ? globals.invariant(!options.returnPartialData, "returnPartialData option only supported on watchQuery.") : globals.invariant(!options.returnPartialData, 16);
        __DEV__ ? globals.invariant(!options.pollInterval, "pollInterval option only supported on watchQuery.") : globals.invariant(!options.pollInterval, 17);
        return this.fetchQuery(queryId, options).finally(function() {
          return _this.stopQuery(queryId);
        });
      };
      QueryManager2.prototype.generateQueryId = function() {
        return String(this.queryIdCounter++);
      };
      QueryManager2.prototype.generateRequestId = function() {
        return this.requestIdCounter++;
      };
      QueryManager2.prototype.generateMutationId = function() {
        return String(this.mutationIdCounter++);
      };
      QueryManager2.prototype.stopQueryInStore = function(queryId) {
        this.stopQueryInStoreNoBroadcast(queryId);
        this.broadcastQueries();
      };
      QueryManager2.prototype.stopQueryInStoreNoBroadcast = function(queryId) {
        var queryInfo = this.queries.get(queryId);
        if (queryInfo)
          queryInfo.stop();
      };
      QueryManager2.prototype.clearStore = function(options) {
        if (options === void 0) {
          options = {
            discardWatches: true
          };
        }
        this.cancelPendingFetches(__DEV__ ? new globals.InvariantError("Store reset while query was in flight (not completed in link chain)") : new globals.InvariantError(18));
        this.queries.forEach(function(queryInfo) {
          if (queryInfo.observableQuery) {
            queryInfo.networkStatus = exports.NetworkStatus.loading;
          } else {
            queryInfo.stop();
          }
        });
        if (this.mutationStore) {
          this.mutationStore = /* @__PURE__ */ Object.create(null);
        }
        return this.cache.reset(options);
      };
      QueryManager2.prototype.getObservableQueries = function(include) {
        var _this = this;
        if (include === void 0) {
          include = "active";
        }
        var queries = /* @__PURE__ */ new Map();
        var queryNamesAndDocs = /* @__PURE__ */ new Map();
        var legacyQueryOptions = /* @__PURE__ */ new Set();
        if (Array.isArray(include)) {
          include.forEach(function(desc) {
            if (typeof desc === "string") {
              queryNamesAndDocs.set(desc, false);
            } else if (utilities.isDocumentNode(desc)) {
              queryNamesAndDocs.set(_this.transform(desc).document, false);
            } else if (utilities.isNonNullObject(desc) && desc.query) {
              legacyQueryOptions.add(desc);
            }
          });
        }
        this.queries.forEach(function(_a, queryId) {
          var oq = _a.observableQuery, document = _a.document;
          if (oq) {
            if (include === "all") {
              queries.set(queryId, oq);
              return;
            }
            var queryName = oq.queryName, fetchPolicy = oq.options.fetchPolicy;
            if (fetchPolicy === "standby" || include === "active" && !oq.hasObservers()) {
              return;
            }
            if (include === "active" || queryName && queryNamesAndDocs.has(queryName) || document && queryNamesAndDocs.has(document)) {
              queries.set(queryId, oq);
              if (queryName)
                queryNamesAndDocs.set(queryName, true);
              if (document)
                queryNamesAndDocs.set(document, true);
            }
          }
        });
        if (legacyQueryOptions.size) {
          legacyQueryOptions.forEach(function(options) {
            var queryId = utilities.makeUniqueId("legacyOneTimeQuery");
            var queryInfo = _this.getQuery(queryId).init({
              document: options.query,
              variables: options.variables
            });
            var oq = new ObservableQuery({
              queryManager: _this,
              queryInfo,
              options: tslib.__assign(tslib.__assign({}, options), { fetchPolicy: "network-only" })
            });
            globals.invariant(oq.queryId === queryId);
            queryInfo.setObservableQuery(oq);
            queries.set(queryId, oq);
          });
        }
        if (__DEV__ && queryNamesAndDocs.size) {
          queryNamesAndDocs.forEach(function(included, nameOrDoc) {
            if (!included) {
              __DEV__ && globals.invariant.warn("Unknown query ".concat(typeof nameOrDoc === "string" ? "named " : "").concat(JSON.stringify(nameOrDoc, null, 2), " requested in refetchQueries options.include array"));
            }
          });
        }
        return queries;
      };
      QueryManager2.prototype.reFetchObservableQueries = function(includeStandby) {
        var _this = this;
        if (includeStandby === void 0) {
          includeStandby = false;
        }
        var observableQueryPromises = [];
        this.getObservableQueries(includeStandby ? "all" : "active").forEach(function(observableQuery, queryId) {
          var fetchPolicy = observableQuery.options.fetchPolicy;
          observableQuery.resetLastResults();
          if (includeStandby || fetchPolicy !== "standby" && fetchPolicy !== "cache-only") {
            observableQueryPromises.push(observableQuery.refetch());
          }
          _this.getQuery(queryId).setDiff(null);
        });
        this.broadcastQueries();
        return Promise.all(observableQueryPromises);
      };
      QueryManager2.prototype.setObservableQuery = function(observableQuery) {
        this.getQuery(observableQuery.queryId).setObservableQuery(observableQuery);
      };
      QueryManager2.prototype.startGraphQLSubscription = function(_a) {
        var _this = this;
        var query = _a.query, fetchPolicy = _a.fetchPolicy, errorPolicy = _a.errorPolicy, variables = _a.variables, _b = _a.context, context = _b === void 0 ? {} : _b;
        query = this.transform(query).document;
        variables = this.getVariables(query, variables);
        var makeObservable = function(variables2) {
          return _this.getObservableFromLink(query, context, variables2).map(function(result) {
            if (fetchPolicy !== "no-cache") {
              if (shouldWriteResult(result, errorPolicy)) {
                _this.cache.write({
                  query,
                  result: result.data,
                  dataId: "ROOT_SUBSCRIPTION",
                  variables: variables2
                });
              }
              _this.broadcastQueries();
            }
            if (utilities.graphQLResultHasError(result)) {
              throw new errors.ApolloError({
                graphQLErrors: result.errors
              });
            }
            return result;
          });
        };
        if (this.transform(query).hasClientExports) {
          var observablePromise_1 = this.localState.addExportedVariables(query, variables, context).then(makeObservable);
          return new utilities.Observable(function(observer) {
            var sub = null;
            observablePromise_1.then(function(observable) {
              return sub = observable.subscribe(observer);
            }, observer.error);
            return function() {
              return sub && sub.unsubscribe();
            };
          });
        }
        return makeObservable(variables);
      };
      QueryManager2.prototype.stopQuery = function(queryId) {
        this.stopQueryNoBroadcast(queryId);
        this.broadcastQueries();
      };
      QueryManager2.prototype.stopQueryNoBroadcast = function(queryId) {
        this.stopQueryInStoreNoBroadcast(queryId);
        this.removeQuery(queryId);
      };
      QueryManager2.prototype.removeQuery = function(queryId) {
        this.fetchCancelFns.delete(queryId);
        if (this.queries.has(queryId)) {
          this.getQuery(queryId).stop();
          this.queries.delete(queryId);
        }
      };
      QueryManager2.prototype.broadcastQueries = function() {
        if (this.onBroadcast)
          this.onBroadcast();
        this.queries.forEach(function(info) {
          return info.notify();
        });
      };
      QueryManager2.prototype.getLocalState = function() {
        return this.localState;
      };
      QueryManager2.prototype.getObservableFromLink = function(query, context, variables, deduplication) {
        var _this = this;
        var _a;
        if (deduplication === void 0) {
          deduplication = (_a = context === null || context === void 0 ? void 0 : context.queryDeduplication) !== null && _a !== void 0 ? _a : this.queryDeduplication;
        }
        var observable;
        var serverQuery = this.transform(query).serverQuery;
        if (serverQuery) {
          var _b = this, inFlightLinkObservables_1 = _b.inFlightLinkObservables, link = _b.link;
          var operation = {
            query: serverQuery,
            variables,
            operationName: utilities.getOperationName(serverQuery) || void 0,
            context: this.prepareContext(tslib.__assign(tslib.__assign({}, context), { forceFetch: !deduplication }))
          };
          context = operation.context;
          if (deduplication) {
            var byVariables_1 = inFlightLinkObservables_1.get(serverQuery) || /* @__PURE__ */ new Map();
            inFlightLinkObservables_1.set(serverQuery, byVariables_1);
            var varJson_1 = cache.canonicalStringify(variables);
            observable = byVariables_1.get(varJson_1);
            if (!observable) {
              var concast = new utilities.Concast([
                core.execute(link, operation)
              ]);
              byVariables_1.set(varJson_1, observable = concast);
              concast.cleanup(function() {
                if (byVariables_1.delete(varJson_1) && byVariables_1.size < 1) {
                  inFlightLinkObservables_1.delete(serverQuery);
                }
              });
            }
          } else {
            observable = new utilities.Concast([
              core.execute(link, operation)
            ]);
          }
        } else {
          observable = new utilities.Concast([
            utilities.Observable.of({ data: {} })
          ]);
          context = this.prepareContext(context);
        }
        var clientQuery = this.transform(query).clientQuery;
        if (clientQuery) {
          observable = utilities.asyncMap(observable, function(result) {
            return _this.localState.runResolvers({
              document: clientQuery,
              remoteResult: result,
              context,
              variables
            });
          });
        }
        return observable;
      };
      QueryManager2.prototype.getResultsFromLink = function(queryInfo, cacheWriteBehavior, options) {
        var requestId = queryInfo.lastRequestId = this.generateRequestId();
        return utilities.asyncMap(this.getObservableFromLink(queryInfo.document, options.context, options.variables), function(result) {
          var hasErrors = utilities.isNonEmptyArray(result.errors);
          if (requestId >= queryInfo.lastRequestId) {
            if (hasErrors && options.errorPolicy === "none") {
              throw queryInfo.markError(new errors.ApolloError({
                graphQLErrors: result.errors
              }));
            }
            queryInfo.markResult(result, options, cacheWriteBehavior);
            queryInfo.markReady();
          }
          var aqr = {
            data: result.data,
            loading: false,
            networkStatus: exports.NetworkStatus.ready
          };
          if (hasErrors && options.errorPolicy !== "ignore") {
            aqr.errors = result.errors;
            aqr.networkStatus = exports.NetworkStatus.error;
          }
          return aqr;
        }, function(networkError) {
          var error = errors.isApolloError(networkError) ? networkError : new errors.ApolloError({ networkError });
          if (requestId >= queryInfo.lastRequestId) {
            queryInfo.markError(error);
          }
          throw error;
        });
      };
      QueryManager2.prototype.fetchQueryObservable = function(queryId, options, networkStatus) {
        var _this = this;
        if (networkStatus === void 0) {
          networkStatus = exports.NetworkStatus.loading;
        }
        var query = this.transform(options.query).document;
        var variables = this.getVariables(query, options.variables);
        var queryInfo = this.getQuery(queryId);
        var defaults = this.defaultOptions.watchQuery;
        var _a = options.fetchPolicy, fetchPolicy = _a === void 0 ? defaults && defaults.fetchPolicy || "cache-first" : _a, _b = options.errorPolicy, errorPolicy = _b === void 0 ? defaults && defaults.errorPolicy || "none" : _b, _c = options.returnPartialData, returnPartialData = _c === void 0 ? false : _c, _d = options.notifyOnNetworkStatusChange, notifyOnNetworkStatusChange = _d === void 0 ? false : _d, _e = options.context, context = _e === void 0 ? {} : _e;
        var normalized = Object.assign({}, options, {
          query,
          variables,
          fetchPolicy,
          errorPolicy,
          returnPartialData,
          notifyOnNetworkStatusChange,
          context
        });
        var fromVariables = function(variables2) {
          normalized.variables = variables2;
          return _this.fetchQueryByPolicy(queryInfo, normalized, networkStatus);
        };
        this.fetchCancelFns.set(queryId, function(reason) {
          setTimeout(function() {
            return concast.cancel(reason);
          });
        });
        var concast = new utilities.Concast(this.transform(normalized.query).hasClientExports ? this.localState.addExportedVariables(normalized.query, normalized.variables, normalized.context).then(fromVariables) : fromVariables(normalized.variables));
        concast.cleanup(function() {
          _this.fetchCancelFns.delete(queryId);
          if (queryInfo.observableQuery) {
            queryInfo.observableQuery["applyNextFetchPolicy"]("after-fetch", options);
          }
        });
        return concast;
      };
      QueryManager2.prototype.refetchQueries = function(_a) {
        var _this = this;
        var updateCache = _a.updateCache, include = _a.include, _b = _a.optimistic, optimistic = _b === void 0 ? false : _b, _c = _a.removeOptimistic, removeOptimistic = _c === void 0 ? optimistic ? utilities.makeUniqueId("refetchQueries") : void 0 : _c, onQueryUpdated = _a.onQueryUpdated;
        var includedQueriesById = /* @__PURE__ */ new Map();
        if (include) {
          this.getObservableQueries(include).forEach(function(oq, queryId) {
            includedQueriesById.set(queryId, {
              oq,
              lastDiff: _this.getQuery(queryId).getDiff()
            });
          });
        }
        var results = /* @__PURE__ */ new Map();
        if (updateCache) {
          this.cache.batch({
            update: updateCache,
            optimistic: optimistic && removeOptimistic || false,
            removeOptimistic,
            onWatchUpdated: function(watch, diff, lastDiff) {
              var oq = watch.watcher instanceof QueryInfo && watch.watcher.observableQuery;
              if (oq) {
                if (onQueryUpdated) {
                  includedQueriesById.delete(oq.queryId);
                  var result = onQueryUpdated(oq, diff, lastDiff);
                  if (result === true) {
                    result = oq.refetch();
                  }
                  if (result !== false) {
                    results.set(oq, result);
                  }
                  return result;
                }
                if (onQueryUpdated !== null) {
                  includedQueriesById.set(oq.queryId, { oq, lastDiff, diff });
                }
              }
            }
          });
        }
        if (includedQueriesById.size) {
          includedQueriesById.forEach(function(_a2, queryId) {
            var oq = _a2.oq, lastDiff = _a2.lastDiff, diff = _a2.diff;
            var result;
            if (onQueryUpdated) {
              if (!diff) {
                var info = oq["queryInfo"];
                info.reset();
                diff = info.getDiff();
              }
              result = onQueryUpdated(oq, diff, lastDiff);
            }
            if (!onQueryUpdated || result === true) {
              result = oq.refetch();
            }
            if (result !== false) {
              results.set(oq, result);
            }
            if (queryId.indexOf("legacyOneTimeQuery") >= 0) {
              _this.stopQueryNoBroadcast(queryId);
            }
          });
        }
        if (removeOptimistic) {
          this.cache.removeOptimistic(removeOptimistic);
        }
        return results;
      };
      QueryManager2.prototype.fetchQueryByPolicy = function(queryInfo, _a, networkStatus) {
        var _this = this;
        var query = _a.query, variables = _a.variables, fetchPolicy = _a.fetchPolicy, refetchWritePolicy = _a.refetchWritePolicy, errorPolicy = _a.errorPolicy, returnPartialData = _a.returnPartialData, context = _a.context, notifyOnNetworkStatusChange = _a.notifyOnNetworkStatusChange;
        var oldNetworkStatus = queryInfo.networkStatus;
        queryInfo.init({
          document: this.transform(query).document,
          variables,
          networkStatus
        });
        var readCache = function() {
          return queryInfo.getDiff(variables);
        };
        var resultsFromCache = function(diff2, networkStatus2) {
          if (networkStatus2 === void 0) {
            networkStatus2 = queryInfo.networkStatus || exports.NetworkStatus.loading;
          }
          var data = diff2.result;
          if (__DEV__ && !returnPartialData && !equality.equal(data, {})) {
            logMissingFieldErrors(diff2.missing);
          }
          var fromData = function(data2) {
            return utilities.Observable.of(tslib.__assign({ data: data2, loading: isNetworkRequestInFlight(networkStatus2), networkStatus: networkStatus2 }, diff2.complete ? null : { partial: true }));
          };
          if (data && _this.transform(query).hasForcedResolvers) {
            return _this.localState.runResolvers({
              document: query,
              remoteResult: { data },
              context,
              variables,
              onlyRunForcedResolvers: true
            }).then(function(resolved) {
              return fromData(resolved.data || void 0);
            });
          }
          return fromData(data);
        };
        var cacheWriteBehavior = fetchPolicy === "no-cache" ? 0 : networkStatus === exports.NetworkStatus.refetch && refetchWritePolicy !== "merge" ? 1 : 2;
        var resultsFromLink = function() {
          return _this.getResultsFromLink(queryInfo, cacheWriteBehavior, {
            variables,
            context,
            fetchPolicy,
            errorPolicy
          });
        };
        var shouldNotify = notifyOnNetworkStatusChange && typeof oldNetworkStatus === "number" && oldNetworkStatus !== networkStatus && isNetworkRequestInFlight(networkStatus);
        switch (fetchPolicy) {
          default:
          case "cache-first": {
            var diff = readCache();
            if (diff.complete) {
              return [
                resultsFromCache(diff, queryInfo.markReady())
              ];
            }
            if (returnPartialData || shouldNotify) {
              return [
                resultsFromCache(diff),
                resultsFromLink()
              ];
            }
            return [
              resultsFromLink()
            ];
          }
          case "cache-and-network": {
            var diff = readCache();
            if (diff.complete || returnPartialData || shouldNotify) {
              return [
                resultsFromCache(diff),
                resultsFromLink()
              ];
            }
            return [
              resultsFromLink()
            ];
          }
          case "cache-only":
            return [
              resultsFromCache(readCache(), queryInfo.markReady())
            ];
          case "network-only":
            if (shouldNotify) {
              return [
                resultsFromCache(readCache()),
                resultsFromLink()
              ];
            }
            return [resultsFromLink()];
          case "no-cache":
            if (shouldNotify) {
              return [
                resultsFromCache(queryInfo.getDiff()),
                resultsFromLink()
              ];
            }
            return [resultsFromLink()];
          case "standby":
            return [];
        }
      };
      QueryManager2.prototype.getQuery = function(queryId) {
        if (queryId && !this.queries.has(queryId)) {
          this.queries.set(queryId, new QueryInfo(this, queryId));
        }
        return this.queries.get(queryId);
      };
      QueryManager2.prototype.prepareContext = function(context) {
        if (context === void 0) {
          context = {};
        }
        var newContext = this.localState.prepareContext(context);
        return tslib.__assign(tslib.__assign({}, newContext), { clientAwareness: this.clientAwareness });
      };
      return QueryManager2;
    }();
    var hasSuggestedDevtools = false;
    var ApolloClient2 = function() {
      function ApolloClient3(options) {
        var _this = this;
        this.resetStoreCallbacks = [];
        this.clearStoreCallbacks = [];
        var uri = options.uri, credentials = options.credentials, headers = options.headers, cache2 = options.cache, _a = options.ssrMode, ssrMode = _a === void 0 ? false : _a, _b = options.ssrForceFetchDelay, ssrForceFetchDelay = _b === void 0 ? 0 : _b, _c = options.connectToDevTools, connectToDevTools = _c === void 0 ? typeof window === "object" && !window.__APOLLO_CLIENT__ && __DEV__ : _c, _d = options.queryDeduplication, queryDeduplication = _d === void 0 ? true : _d, defaultOptions = options.defaultOptions, _e = options.assumeImmutableResults, assumeImmutableResults = _e === void 0 ? false : _e, resolvers = options.resolvers, typeDefs = options.typeDefs, fragmentMatcher = options.fragmentMatcher, clientAwarenessName = options.name, clientAwarenessVersion = options.version;
        var link = options.link;
        if (!link) {
          link = uri ? new http.HttpLink({ uri, credentials, headers }) : core.ApolloLink.empty();
        }
        if (!cache2) {
          throw __DEV__ ? new globals.InvariantError("To initialize Apollo Client, you must specify a 'cache' property in the options object. \nFor more information, please visit: https://go.apollo.dev/c/docs") : new globals.InvariantError(7);
        }
        this.link = link;
        this.cache = cache2;
        this.disableNetworkFetches = ssrMode || ssrForceFetchDelay > 0;
        this.queryDeduplication = queryDeduplication;
        this.defaultOptions = defaultOptions || /* @__PURE__ */ Object.create(null);
        this.typeDefs = typeDefs;
        if (ssrForceFetchDelay) {
          setTimeout(function() {
            return _this.disableNetworkFetches = false;
          }, ssrForceFetchDelay);
        }
        this.watchQuery = this.watchQuery.bind(this);
        this.query = this.query.bind(this);
        this.mutate = this.mutate.bind(this);
        this.resetStore = this.resetStore.bind(this);
        this.reFetchObservableQueries = this.reFetchObservableQueries.bind(this);
        if (connectToDevTools && typeof window === "object") {
          window.__APOLLO_CLIENT__ = this;
        }
        if (!hasSuggestedDevtools && __DEV__) {
          hasSuggestedDevtools = true;
          if (typeof window !== "undefined" && window.document && window.top === window.self && !window.__APOLLO_DEVTOOLS_GLOBAL_HOOK__) {
            var nav = window.navigator;
            var ua = nav && nav.userAgent;
            var url = void 0;
            if (typeof ua === "string") {
              if (ua.indexOf("Chrome/") > -1) {
                url = "https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm";
              } else if (ua.indexOf("Firefox/") > -1) {
                url = "https://addons.mozilla.org/en-US/firefox/addon/apollo-developer-tools/";
              }
            }
            if (url) {
              __DEV__ && globals.invariant.log("Download the Apollo DevTools for a better development experience: " + url);
            }
          }
        }
        this.version = version;
        this.localState = new LocalState({
          cache: cache2,
          client: this,
          resolvers,
          fragmentMatcher
        });
        this.queryManager = new QueryManager({
          cache: this.cache,
          link: this.link,
          defaultOptions: this.defaultOptions,
          queryDeduplication,
          ssrMode,
          clientAwareness: {
            name: clientAwarenessName,
            version: clientAwarenessVersion
          },
          localState: this.localState,
          assumeImmutableResults,
          onBroadcast: connectToDevTools ? function() {
            if (_this.devToolsHookCb) {
              _this.devToolsHookCb({
                action: {},
                state: {
                  queries: _this.queryManager.getQueryStore(),
                  mutations: _this.queryManager.mutationStore || {}
                },
                dataWithOptimisticResults: _this.cache.extract(true)
              });
            }
          } : void 0
        });
      }
      ApolloClient3.prototype.stop = function() {
        this.queryManager.stop();
      };
      ApolloClient3.prototype.watchQuery = function(options) {
        if (this.defaultOptions.watchQuery) {
          options = utilities.mergeOptions(this.defaultOptions.watchQuery, options);
        }
        if (this.disableNetworkFetches && (options.fetchPolicy === "network-only" || options.fetchPolicy === "cache-and-network")) {
          options = tslib.__assign(tslib.__assign({}, options), { fetchPolicy: "cache-first" });
        }
        return this.queryManager.watchQuery(options);
      };
      ApolloClient3.prototype.query = function(options) {
        if (this.defaultOptions.query) {
          options = utilities.mergeOptions(this.defaultOptions.query, options);
        }
        __DEV__ ? globals.invariant(options.fetchPolicy !== "cache-and-network", "The cache-and-network fetchPolicy does not work with client.query, because client.query can only return a single result. Please use client.watchQuery to receive multiple results from the cache and the network, or consider using a different fetchPolicy, such as cache-first or network-only.") : globals.invariant(options.fetchPolicy !== "cache-and-network", 8);
        if (this.disableNetworkFetches && options.fetchPolicy === "network-only") {
          options = tslib.__assign(tslib.__assign({}, options), { fetchPolicy: "cache-first" });
        }
        return this.queryManager.query(options);
      };
      ApolloClient3.prototype.mutate = function(options) {
        if (this.defaultOptions.mutate) {
          options = utilities.mergeOptions(this.defaultOptions.mutate, options);
        }
        return this.queryManager.mutate(options);
      };
      ApolloClient3.prototype.subscribe = function(options) {
        return this.queryManager.startGraphQLSubscription(options);
      };
      ApolloClient3.prototype.readQuery = function(options, optimistic) {
        if (optimistic === void 0) {
          optimistic = false;
        }
        return this.cache.readQuery(options, optimistic);
      };
      ApolloClient3.prototype.readFragment = function(options, optimistic) {
        if (optimistic === void 0) {
          optimistic = false;
        }
        return this.cache.readFragment(options, optimistic);
      };
      ApolloClient3.prototype.writeQuery = function(options) {
        this.cache.writeQuery(options);
        this.queryManager.broadcastQueries();
      };
      ApolloClient3.prototype.writeFragment = function(options) {
        this.cache.writeFragment(options);
        this.queryManager.broadcastQueries();
      };
      ApolloClient3.prototype.__actionHookForDevTools = function(cb) {
        this.devToolsHookCb = cb;
      };
      ApolloClient3.prototype.__requestRaw = function(payload) {
        return core.execute(this.link, payload);
      };
      ApolloClient3.prototype.resetStore = function() {
        var _this = this;
        return Promise.resolve().then(function() {
          return _this.queryManager.clearStore({
            discardWatches: false
          });
        }).then(function() {
          return Promise.all(_this.resetStoreCallbacks.map(function(fn) {
            return fn();
          }));
        }).then(function() {
          return _this.reFetchObservableQueries();
        });
      };
      ApolloClient3.prototype.clearStore = function() {
        var _this = this;
        return Promise.resolve().then(function() {
          return _this.queryManager.clearStore({
            discardWatches: true
          });
        }).then(function() {
          return Promise.all(_this.clearStoreCallbacks.map(function(fn) {
            return fn();
          }));
        });
      };
      ApolloClient3.prototype.onResetStore = function(cb) {
        var _this = this;
        this.resetStoreCallbacks.push(cb);
        return function() {
          _this.resetStoreCallbacks = _this.resetStoreCallbacks.filter(function(c) {
            return c !== cb;
          });
        };
      };
      ApolloClient3.prototype.onClearStore = function(cb) {
        var _this = this;
        this.clearStoreCallbacks.push(cb);
        return function() {
          _this.clearStoreCallbacks = _this.clearStoreCallbacks.filter(function(c) {
            return c !== cb;
          });
        };
      };
      ApolloClient3.prototype.reFetchObservableQueries = function(includeStandby) {
        return this.queryManager.reFetchObservableQueries(includeStandby);
      };
      ApolloClient3.prototype.refetchQueries = function(options) {
        var map = this.queryManager.refetchQueries(options);
        var queries = [];
        var results = [];
        map.forEach(function(result2, obsQuery) {
          queries.push(obsQuery);
          results.push(result2);
        });
        var result = Promise.all(results);
        result.queries = queries;
        result.results = results;
        result.catch(function(error) {
          __DEV__ && globals.invariant.debug("In client.refetchQueries, Promise.all promise rejected with error ".concat(error));
        });
        return result;
      };
      ApolloClient3.prototype.getObservableQueries = function(include) {
        if (include === void 0) {
          include = "active";
        }
        return this.queryManager.getObservableQueries(include);
      };
      ApolloClient3.prototype.extract = function(optimistic) {
        return this.cache.extract(optimistic);
      };
      ApolloClient3.prototype.restore = function(serializedState) {
        return this.cache.restore(serializedState);
      };
      ApolloClient3.prototype.addResolvers = function(resolvers) {
        this.localState.addResolvers(resolvers);
      };
      ApolloClient3.prototype.setResolvers = function(resolvers) {
        this.localState.setResolvers(resolvers);
      };
      ApolloClient3.prototype.getResolvers = function() {
        return this.localState.getResolvers();
      };
      ApolloClient3.prototype.setLocalStateFragmentMatcher = function(fragmentMatcher) {
        this.localState.setFragmentMatcher(fragmentMatcher);
      };
      ApolloClient3.prototype.setLink = function(newLink) {
        this.link = this.queryManager.link = newLink;
      };
      return ApolloClient3;
    }();
    tsInvariant.setVerbosity(globals.DEV ? "log" : "silent");
    exports.ApolloCache = cache.ApolloCache;
    exports.Cache = cache.Cache;
    exports.InMemoryCache = cache.InMemoryCache;
    exports.MissingFieldError = cache.MissingFieldError;
    exports.defaultDataIdFromObject = cache.defaultDataIdFromObject;
    exports.makeVar = cache.makeVar;
    exports.Observable = utilities.Observable;
    exports.isReference = utilities.isReference;
    exports.makeReference = utilities.makeReference;
    exports.mergeOptions = utilities.mergeOptions;
    exports.ApolloError = errors.ApolloError;
    exports.isApolloError = errors.isApolloError;
    exports.fromError = utils.fromError;
    exports.fromPromise = utils.fromPromise;
    exports.throwServerError = utils.throwServerError;
    exports.toPromise = utils.toPromise;
    exports.setLogVerbosity = tsInvariant.setVerbosity;
    exports.disableExperimentalFragmentVariables = graphqlTag.disableExperimentalFragmentVariables;
    exports.disableFragmentWarnings = graphqlTag.disableFragmentWarnings;
    exports.enableExperimentalFragmentVariables = graphqlTag.enableExperimentalFragmentVariables;
    exports.gql = graphqlTag.gql;
    exports.resetCaches = graphqlTag.resetCaches;
    exports.ApolloClient = ApolloClient2;
    exports.ObservableQuery = ObservableQuery;
    for (k in core) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        exports[k] = core[k];
    }
    var k;
    for (k in http) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        exports[k] = http[k];
    }
    var k;
  }
});

// node_modules/@apollo/client/react/context/context.cjs
var require_context = __commonJS({
  "node_modules/@apollo/client/react/context/context.cjs"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var globals = require_globals();
    var React5 = require("react");
    var utilities = require_utilities();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        for (var k in e) {
          n[k] = e[k];
        }
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    var React__namespace = /* @__PURE__ */ _interopNamespace(React5);
    var contextKey = utilities.canUseSymbol ? Symbol.for("__APOLLO_CONTEXT__") : "__APOLLO_CONTEXT__";
    function getApolloContext() {
      var context = React__namespace.createContext[contextKey];
      if (!context) {
        Object.defineProperty(React__namespace.createContext, contextKey, {
          value: context = React__namespace.createContext({}),
          enumerable: false,
          writable: false,
          configurable: true
        });
        context.displayName = "ApolloContext";
      }
      return context;
    }
    var ApolloConsumer = function(props) {
      var ApolloContext = getApolloContext();
      return React__namespace.createElement(ApolloContext.Consumer, null, function(context) {
        __DEV__ ? globals.invariant(context && context.client, 'Could not find "client" in the context of ApolloConsumer. Wrap the root component in an <ApolloProvider>.') : globals.invariant(context && context.client, 25);
        return props.children(context.client);
      });
    };
    var ApolloProvider2 = function(_a) {
      var client = _a.client, children = _a.children;
      var ApolloContext = getApolloContext();
      return React__namespace.createElement(ApolloContext.Consumer, null, function(context) {
        if (context === void 0) {
          context = {};
        }
        if (client && context.client !== client) {
          context = Object.assign({}, context, { client });
        }
        __DEV__ ? globals.invariant(context.client, 'ApolloProvider was not passed a client instance. Make sure you pass in your client via the "client" prop.') : globals.invariant(context.client, 26);
        return React__namespace.createElement(ApolloContext.Provider, { value: context }, children);
      });
    };
    exports.ApolloConsumer = ApolloConsumer;
    exports.ApolloProvider = ApolloProvider2;
    exports.getApolloContext = getApolloContext;
    exports.resetApolloContext = getApolloContext;
  }
});

// node_modules/@apollo/client/react/parser/parser.cjs
var require_parser = __commonJS({
  "node_modules/@apollo/client/react/parser/parser.cjs"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var globals = require_globals();
    exports.DocumentType = void 0;
    (function(DocumentType) {
      DocumentType[DocumentType["Query"] = 0] = "Query";
      DocumentType[DocumentType["Mutation"] = 1] = "Mutation";
      DocumentType[DocumentType["Subscription"] = 2] = "Subscription";
    })(exports.DocumentType || (exports.DocumentType = {}));
    var cache = /* @__PURE__ */ new Map();
    function operationName(type) {
      var name;
      switch (type) {
        case exports.DocumentType.Query:
          name = "Query";
          break;
        case exports.DocumentType.Mutation:
          name = "Mutation";
          break;
        case exports.DocumentType.Subscription:
          name = "Subscription";
          break;
      }
      return name;
    }
    function parser(document) {
      var cached = cache.get(document);
      if (cached)
        return cached;
      var variables, type, name;
      __DEV__ ? globals.invariant(!!document && !!document.kind, "Argument of ".concat(document, " passed to parser was not a valid GraphQL ") + "DocumentNode. You may need to use 'graphql-tag' or another method to convert your operation into a document") : globals.invariant(!!document && !!document.kind, 30);
      var fragments = [];
      var queries = [];
      var mutations = [];
      var subscriptions = [];
      for (var _i = 0, _a = document.definitions; _i < _a.length; _i++) {
        var x = _a[_i];
        if (x.kind === "FragmentDefinition") {
          fragments.push(x);
          continue;
        }
        if (x.kind === "OperationDefinition") {
          switch (x.operation) {
            case "query":
              queries.push(x);
              break;
            case "mutation":
              mutations.push(x);
              break;
            case "subscription":
              subscriptions.push(x);
              break;
          }
        }
      }
      __DEV__ ? globals.invariant(!fragments.length || (queries.length || mutations.length || subscriptions.length), "Passing only a fragment to 'graphql' is not yet supported. You must include a query, subscription or mutation as well") : globals.invariant(!fragments.length || (queries.length || mutations.length || subscriptions.length), 31);
      __DEV__ ? globals.invariant(queries.length + mutations.length + subscriptions.length <= 1, "react-apollo only supports a query, subscription, or a mutation per HOC. " + "".concat(document, " had ").concat(queries.length, " queries, ").concat(subscriptions.length, " ") + "subscriptions and ".concat(mutations.length, " mutations. ") + "You can use 'compose' to join multiple operation types to a component") : globals.invariant(queries.length + mutations.length + subscriptions.length <= 1, 32);
      type = queries.length ? exports.DocumentType.Query : exports.DocumentType.Mutation;
      if (!queries.length && !mutations.length)
        type = exports.DocumentType.Subscription;
      var definitions = queries.length ? queries : mutations.length ? mutations : subscriptions;
      __DEV__ ? globals.invariant(definitions.length === 1, "react-apollo only supports one definition per HOC. ".concat(document, " had ") + "".concat(definitions.length, " definitions. ") + "You can use 'compose' to join multiple operation types to a component") : globals.invariant(definitions.length === 1, 33);
      var definition = definitions[0];
      variables = definition.variableDefinitions || [];
      if (definition.name && definition.name.kind === "Name") {
        name = definition.name.value;
      } else {
        name = "data";
      }
      var payload = { name, type, variables };
      cache.set(document, payload);
      return payload;
    }
    function verifyDocumentType(document, type) {
      var operation = parser(document);
      var requiredOperationName = operationName(type);
      var usedOperationName = operationName(operation.type);
      __DEV__ ? globals.invariant(operation.type === type, "Running a ".concat(requiredOperationName, " requires a graphql ") + "".concat(requiredOperationName, ", but a ").concat(usedOperationName, " was used instead.")) : globals.invariant(operation.type === type, 34);
    }
    exports.operationName = operationName;
    exports.parser = parser;
    exports.verifyDocumentType = verifyDocumentType;
  }
});

// node_modules/@apollo/client/react/hooks/hooks.cjs
var require_hooks = __commonJS({
  "node_modules/@apollo/client/react/hooks/hooks.cjs"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var globals = require_globals();
    var React5 = require("react");
    var context = require_context();
    var tslib = require("tslib");
    var utilities = require_utilities();
    var equality = require("@wry/equality");
    var core = require_core2();
    var errors = require_errors();
    var parser = require_parser();
    function _interopNamespace(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      if (e) {
        for (var k in e) {
          n[k] = e[k];
        }
      }
      n["default"] = e;
      return Object.freeze(n);
    }
    var React__namespace = /* @__PURE__ */ _interopNamespace(React5);
    function useApolloClient(override) {
      var context$1 = React5.useContext(context.getApolloContext());
      var client = override || context$1.client;
      __DEV__ ? globals.invariant(!!client, 'Could not find "client" in the context or passed in as an option. Wrap the root component in an <ApolloProvider>, or pass an ApolloClient instance in via options.') : globals.invariant(!!client, 29);
      return client;
    }
    var didWarnUncachedGetSnapshot = false;
    var uSESKey = "useSyncExternalStore";
    var realHook = React__namespace[uSESKey];
    var useSyncExternalStore = realHook || function(subscribe, getSnapshot, getServerSnapshot) {
      var value = getSnapshot();
      if (__DEV__ && !didWarnUncachedGetSnapshot && value !== getSnapshot()) {
        didWarnUncachedGetSnapshot = true;
        __DEV__ && globals.invariant.error("The result of getSnapshot should be cached to avoid an infinite loop");
      }
      var _a = React__namespace.useState({ inst: { value, getSnapshot } }), inst = _a[0].inst, forceUpdate = _a[1];
      if (utilities.canUseLayoutEffect) {
        React__namespace.useLayoutEffect(function() {
          Object.assign(inst, { value, getSnapshot });
          if (checkIfSnapshotChanged(inst)) {
            forceUpdate({ inst });
          }
        }, [subscribe, value, getSnapshot]);
      } else {
        Object.assign(inst, { value, getSnapshot });
      }
      React__namespace.useEffect(function() {
        if (checkIfSnapshotChanged(inst)) {
          forceUpdate({ inst });
        }
        return subscribe(function handleStoreChange() {
          if (checkIfSnapshotChanged(inst)) {
            forceUpdate({ inst });
          }
        });
      }, [subscribe]);
      return value;
    };
    function checkIfSnapshotChanged(_a) {
      var value = _a.value, getSnapshot = _a.getSnapshot;
      try {
        return value !== getSnapshot();
      } catch (_b) {
        return true;
      }
    }
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    function useQuery40(query, options) {
      if (options === void 0) {
        options = /* @__PURE__ */ Object.create(null);
      }
      return useInternalState(useApolloClient(options.client), query).useQuery(options);
    }
    function useInternalState(client, query) {
      var stateRef = React5.useRef();
      if (!stateRef.current || client !== stateRef.current.client || query !== stateRef.current.query) {
        stateRef.current = new InternalState(client, query, stateRef.current);
      }
      var state = stateRef.current;
      var _a = React5.useState(0);
      _a[0];
      var setTick = _a[1];
      state.forceUpdate = function() {
        setTick(function(tick) {
          return tick + 1;
        });
      };
      return state;
    }
    var InternalState = function() {
      function InternalState2(client, query, previous) {
        this.client = client;
        this.query = query;
        this.asyncResolveFns = /* @__PURE__ */ new Set();
        this.optionsToIgnoreOnce = new (utilities.canUseWeakSet ? WeakSet : Set)();
        this.ssrDisabledResult = utilities.maybeDeepFreeze({
          loading: true,
          data: void 0,
          error: void 0,
          networkStatus: core.NetworkStatus.loading
        });
        this.skipStandbyResult = utilities.maybeDeepFreeze({
          loading: false,
          data: void 0,
          error: void 0,
          networkStatus: core.NetworkStatus.ready
        });
        this.toQueryResultCache = new (utilities.canUseWeakMap ? WeakMap : Map)();
        parser.verifyDocumentType(query, parser.DocumentType.Query);
        var previousResult = previous && previous.result;
        var previousData = previousResult && previousResult.data;
        if (previousData) {
          this.previousData = previousData;
        }
      }
      InternalState2.prototype.forceUpdate = function() {
        __DEV__ && globals.invariant.warn("Calling default no-op implementation of InternalState#forceUpdate");
      };
      InternalState2.prototype.asyncUpdate = function() {
        var _this = this;
        return new Promise(function(resolve) {
          _this.asyncResolveFns.add(resolve);
          _this.optionsToIgnoreOnce.add(_this.watchQueryOptions);
          _this.forceUpdate();
        });
      };
      InternalState2.prototype.useQuery = function(options) {
        var _this = this;
        this.renderPromises = React5.useContext(context.getApolloContext()).renderPromises;
        this.useOptions(options);
        var obsQuery = this.useObservableQuery();
        var result = useSyncExternalStore(React5.useCallback(function() {
          if (_this.renderPromises) {
            return function() {
            };
          }
          var onNext = function() {
            var previousResult = _this.result;
            var result2 = obsQuery.getCurrentResult();
            if (previousResult && previousResult.loading === result2.loading && previousResult.networkStatus === result2.networkStatus && equality.equal(previousResult.data, result2.data)) {
              return;
            }
            _this.setResult(result2);
          };
          var onError = function(error) {
            var last = obsQuery["last"];
            subscription.unsubscribe();
            try {
              obsQuery.resetLastResults();
              subscription = obsQuery.subscribe(onNext, onError);
            } finally {
              obsQuery["last"] = last;
            }
            if (!hasOwnProperty.call(error, "graphQLErrors")) {
              throw error;
            }
            var previousResult = _this.result;
            if (!previousResult || previousResult && previousResult.loading || !equality.equal(error, previousResult.error)) {
              _this.setResult({
                data: previousResult && previousResult.data,
                error,
                loading: false,
                networkStatus: core.NetworkStatus.error
              });
            }
          };
          var subscription = obsQuery.subscribe(onNext, onError);
          return function() {
            return subscription.unsubscribe();
          };
        }, [
          obsQuery,
          this.renderPromises,
          this.client.disableNetworkFetches
        ]), function() {
          return _this.getCurrentResult();
        }, function() {
          return _this.getCurrentResult();
        });
        this.unsafeHandlePartialRefetch(result);
        var queryResult = this.toQueryResult(result);
        if (!queryResult.loading && this.asyncResolveFns.size) {
          this.asyncResolveFns.forEach(function(resolve) {
            return resolve(queryResult);
          });
          this.asyncResolveFns.clear();
        }
        return queryResult;
      };
      InternalState2.prototype.useOptions = function(options) {
        var _a;
        var watchQueryOptions = this.createWatchQueryOptions(this.queryHookOptions = options);
        var currentWatchQueryOptions = this.watchQueryOptions;
        if (this.optionsToIgnoreOnce.has(currentWatchQueryOptions) || !equality.equal(watchQueryOptions, currentWatchQueryOptions)) {
          this.watchQueryOptions = watchQueryOptions;
          if (currentWatchQueryOptions && this.observable) {
            this.optionsToIgnoreOnce.delete(currentWatchQueryOptions);
            this.observable.reobserve(this.getObsQueryOptions());
            this.previousData = ((_a = this.result) === null || _a === void 0 ? void 0 : _a.data) || this.previousData;
            this.result = void 0;
          }
        }
        this.onCompleted = options.onCompleted || InternalState2.prototype.onCompleted;
        this.onError = options.onError || InternalState2.prototype.onError;
        if ((this.renderPromises || this.client.disableNetworkFetches) && this.queryHookOptions.ssr === false && !this.queryHookOptions.skip) {
          this.result = this.ssrDisabledResult;
        } else if (this.queryHookOptions.skip || this.watchQueryOptions.fetchPolicy === "standby") {
          this.result = this.skipStandbyResult;
        } else if (this.result === this.ssrDisabledResult || this.result === this.skipStandbyResult) {
          this.result = void 0;
        }
      };
      InternalState2.prototype.getObsQueryOptions = function() {
        var toMerge = [];
        var globalDefaults = this.client.defaultOptions.watchQuery;
        if (globalDefaults)
          toMerge.push(globalDefaults);
        if (this.queryHookOptions.defaultOptions) {
          toMerge.push(this.queryHookOptions.defaultOptions);
        }
        toMerge.push(utilities.compact(this.observable && this.observable.options, this.watchQueryOptions));
        return toMerge.reduce(core.mergeOptions);
      };
      InternalState2.prototype.createWatchQueryOptions = function(_a) {
        var _b;
        if (_a === void 0) {
          _a = {};
        }
        var skip = _a.skip;
        _a.ssr;
        _a.onCompleted;
        _a.onError;
        _a.displayName;
        _a.defaultOptions;
        var otherOptions = tslib.__rest(_a, ["skip", "ssr", "onCompleted", "onError", "displayName", "defaultOptions"]);
        var watchQueryOptions = Object.assign(otherOptions, { query: this.query });
        if (this.renderPromises && (watchQueryOptions.fetchPolicy === "network-only" || watchQueryOptions.fetchPolicy === "cache-and-network")) {
          watchQueryOptions.fetchPolicy = "cache-first";
        }
        if (!watchQueryOptions.variables) {
          watchQueryOptions.variables = {};
        }
        if (skip) {
          var _c = watchQueryOptions.fetchPolicy, fetchPolicy = _c === void 0 ? this.getDefaultFetchPolicy() : _c, _d = watchQueryOptions.initialFetchPolicy, initialFetchPolicy = _d === void 0 ? fetchPolicy : _d;
          Object.assign(watchQueryOptions, {
            initialFetchPolicy,
            fetchPolicy: "standby"
          });
        } else if (!watchQueryOptions.fetchPolicy) {
          watchQueryOptions.fetchPolicy = ((_b = this.observable) === null || _b === void 0 ? void 0 : _b.options.initialFetchPolicy) || this.getDefaultFetchPolicy();
        }
        return watchQueryOptions;
      };
      InternalState2.prototype.getDefaultFetchPolicy = function() {
        var _a, _b;
        return ((_a = this.queryHookOptions.defaultOptions) === null || _a === void 0 ? void 0 : _a.fetchPolicy) || ((_b = this.client.defaultOptions.watchQuery) === null || _b === void 0 ? void 0 : _b.fetchPolicy) || "cache-first";
      };
      InternalState2.prototype.onCompleted = function(data) {
      };
      InternalState2.prototype.onError = function(error) {
      };
      InternalState2.prototype.useObservableQuery = function() {
        var obsQuery = this.observable = this.renderPromises && this.renderPromises.getSSRObservable(this.watchQueryOptions) || this.observable || this.client.watchQuery(this.getObsQueryOptions());
        this.obsQueryFields = React5.useMemo(function() {
          return {
            refetch: obsQuery.refetch.bind(obsQuery),
            reobserve: obsQuery.reobserve.bind(obsQuery),
            fetchMore: obsQuery.fetchMore.bind(obsQuery),
            updateQuery: obsQuery.updateQuery.bind(obsQuery),
            startPolling: obsQuery.startPolling.bind(obsQuery),
            stopPolling: obsQuery.stopPolling.bind(obsQuery),
            subscribeToMore: obsQuery.subscribeToMore.bind(obsQuery)
          };
        }, [obsQuery]);
        var ssrAllowed = !(this.queryHookOptions.ssr === false || this.queryHookOptions.skip);
        if (this.renderPromises && ssrAllowed) {
          this.renderPromises.registerSSRObservable(obsQuery);
          if (obsQuery.getCurrentResult().loading) {
            this.renderPromises.addObservableQueryPromise(obsQuery);
          }
        }
        return obsQuery;
      };
      InternalState2.prototype.setResult = function(nextResult) {
        var previousResult = this.result;
        if (previousResult && previousResult.data) {
          this.previousData = previousResult.data;
        }
        this.result = nextResult;
        this.forceUpdate();
        this.handleErrorOrCompleted(nextResult);
      };
      InternalState2.prototype.handleErrorOrCompleted = function(result) {
        if (!result.loading) {
          if (result.error) {
            this.onError(result.error);
          } else if (result.data) {
            this.onCompleted(result.data);
          }
        }
      };
      InternalState2.prototype.getCurrentResult = function() {
        if (!this.result) {
          this.handleErrorOrCompleted(this.result = this.observable.getCurrentResult());
        }
        return this.result;
      };
      InternalState2.prototype.toQueryResult = function(result) {
        var queryResult = this.toQueryResultCache.get(result);
        if (queryResult)
          return queryResult;
        var data = result.data;
        result.partial;
        var resultWithoutPartial = tslib.__rest(result, ["data", "partial"]);
        this.toQueryResultCache.set(result, queryResult = tslib.__assign(tslib.__assign(tslib.__assign({ data }, resultWithoutPartial), this.obsQueryFields), { client: this.client, observable: this.observable, variables: this.observable.variables, called: true, previousData: this.previousData }));
        if (!queryResult.error && utilities.isNonEmptyArray(result.errors)) {
          queryResult.error = new errors.ApolloError({ graphQLErrors: result.errors });
        }
        return queryResult;
      };
      InternalState2.prototype.unsafeHandlePartialRefetch = function(result) {
        if (result.partial && this.queryHookOptions.partialRefetch && !result.loading && (!result.data || Object.keys(result.data).length === 0) && this.observable.options.fetchPolicy !== "cache-only") {
          Object.assign(result, {
            loading: true,
            networkStatus: core.NetworkStatus.refetch
          });
          this.observable.refetch();
        }
      };
      return InternalState2;
    }();
    var EAGER_METHODS = [
      "refetch",
      "reobserve",
      "fetchMore",
      "updateQuery",
      "startPolling",
      "subscribeToMore"
    ];
    function useLazyQuery19(query, options) {
      var internalState = useInternalState(useApolloClient(options && options.client), query);
      var execOptionsRef = React5.useRef();
      var merged = execOptionsRef.current ? utilities.mergeOptions(options, execOptionsRef.current) : options;
      var useQueryResult = internalState.useQuery(tslib.__assign(tslib.__assign({}, merged), { skip: !execOptionsRef.current }));
      var initialFetchPolicy = useQueryResult.observable.options.initialFetchPolicy || internalState.getDefaultFetchPolicy();
      var result = Object.assign(useQueryResult, {
        called: !!execOptionsRef.current
      });
      var eagerMethods = React5.useMemo(function() {
        var eagerMethods2 = {};
        var _loop_1 = function(key2) {
          var method = result[key2];
          eagerMethods2[key2] = function() {
            if (!execOptionsRef.current) {
              execOptionsRef.current = /* @__PURE__ */ Object.create(null);
              internalState.forceUpdate();
            }
            return method.apply(this, arguments);
          };
        };
        for (var _i = 0, EAGER_METHODS_1 = EAGER_METHODS; _i < EAGER_METHODS_1.length; _i++) {
          var key = EAGER_METHODS_1[_i];
          _loop_1(key);
        }
        return eagerMethods2;
      }, []);
      Object.assign(result, eagerMethods);
      var execute = React5.useCallback(function(executeOptions) {
        execOptionsRef.current = executeOptions ? tslib.__assign(tslib.__assign({}, executeOptions), { fetchPolicy: executeOptions.fetchPolicy || initialFetchPolicy }) : {
          fetchPolicy: initialFetchPolicy
        };
        var promise = internalState.asyncUpdate().then(function(queryResult) {
          return Object.assign(queryResult, eagerMethods);
        });
        promise.catch(function() {
        });
        return promise;
      }, []);
      return [execute, result];
    }
    function useMutation25(mutation, options) {
      var client = useApolloClient(options === null || options === void 0 ? void 0 : options.client);
      parser.verifyDocumentType(mutation, parser.DocumentType.Mutation);
      var _a = React5.useState({
        called: false,
        loading: false,
        client
      }), result = _a[0], setResult = _a[1];
      var ref = React5.useRef({
        result,
        mutationId: 0,
        isMounted: true,
        client,
        mutation,
        options
      });
      {
        Object.assign(ref.current, { client, options, mutation });
      }
      var execute = React5.useCallback(function(executeOptions) {
        if (executeOptions === void 0) {
          executeOptions = {};
        }
        var _a2 = ref.current, client2 = _a2.client, options2 = _a2.options, mutation2 = _a2.mutation;
        var baseOptions = tslib.__assign(tslib.__assign({}, options2), { mutation: mutation2 });
        if (!ref.current.result.loading && !baseOptions.ignoreResults) {
          setResult(ref.current.result = {
            loading: true,
            error: void 0,
            data: void 0,
            called: true,
            client: client2
          });
        }
        var mutationId = ++ref.current.mutationId;
        var clientOptions = core.mergeOptions(baseOptions, executeOptions);
        return client2.mutate(clientOptions).then(function(response) {
          var _a3, _b, _c;
          var data = response.data, errors$1 = response.errors;
          var error = errors$1 && errors$1.length > 0 ? new errors.ApolloError({ graphQLErrors: errors$1 }) : void 0;
          if (mutationId === ref.current.mutationId && !clientOptions.ignoreResults) {
            var result_1 = {
              called: true,
              loading: false,
              data,
              error,
              client: client2
            };
            if (ref.current.isMounted && !equality.equal(ref.current.result, result_1)) {
              setResult(ref.current.result = result_1);
            }
          }
          (_b = (_a3 = ref.current.options) === null || _a3 === void 0 ? void 0 : _a3.onCompleted) === null || _b === void 0 ? void 0 : _b.call(_a3, response.data);
          (_c = executeOptions.onCompleted) === null || _c === void 0 ? void 0 : _c.call(executeOptions, response.data);
          return response;
        }).catch(function(error) {
          var _a3, _b, _c, _d;
          if (mutationId === ref.current.mutationId && ref.current.isMounted) {
            var result_2 = {
              loading: false,
              error,
              data: void 0,
              called: true,
              client: client2
            };
            if (!equality.equal(ref.current.result, result_2)) {
              setResult(ref.current.result = result_2);
            }
          }
          if (((_a3 = ref.current.options) === null || _a3 === void 0 ? void 0 : _a3.onError) || clientOptions.onError) {
            (_c = (_b = ref.current.options) === null || _b === void 0 ? void 0 : _b.onError) === null || _c === void 0 ? void 0 : _c.call(_b, error);
            (_d = executeOptions.onError) === null || _d === void 0 ? void 0 : _d.call(executeOptions, error);
            return { data: void 0, errors: error };
          }
          throw error;
        });
      }, []);
      var reset = React5.useCallback(function() {
        setResult({ called: false, loading: false, client });
      }, []);
      React5.useEffect(function() {
        ref.current.isMounted = true;
        return function() {
          ref.current.isMounted = false;
        };
      }, []);
      return [execute, tslib.__assign({ reset }, result)];
    }
    function useSubscription(subscription, options) {
      var client = useApolloClient(options === null || options === void 0 ? void 0 : options.client);
      parser.verifyDocumentType(subscription, parser.DocumentType.Subscription);
      var _a = React5.useState({
        loading: !(options === null || options === void 0 ? void 0 : options.skip),
        error: void 0,
        data: void 0,
        variables: options === null || options === void 0 ? void 0 : options.variables
      }), result = _a[0], setResult = _a[1];
      var _b = React5.useState(function() {
        if (options === null || options === void 0 ? void 0 : options.skip) {
          return null;
        }
        return client.subscribe({
          query: subscription,
          variables: options === null || options === void 0 ? void 0 : options.variables,
          fetchPolicy: options === null || options === void 0 ? void 0 : options.fetchPolicy,
          context: options === null || options === void 0 ? void 0 : options.context
        });
      }), observable = _b[0], setObservable = _b[1];
      var canResetObservableRef = React5.useRef(false);
      React5.useEffect(function() {
        return function() {
          canResetObservableRef.current = true;
        };
      }, []);
      var ref = React5.useRef({ client, subscription, options });
      React5.useEffect(function() {
        var _a2, _b2, _c, _d;
        var shouldResubscribe = options === null || options === void 0 ? void 0 : options.shouldResubscribe;
        if (typeof shouldResubscribe === "function") {
          shouldResubscribe = !!shouldResubscribe(options);
        }
        if (options === null || options === void 0 ? void 0 : options.skip) {
          if (!(options === null || options === void 0 ? void 0 : options.skip) !== !((_a2 = ref.current.options) === null || _a2 === void 0 ? void 0 : _a2.skip) || canResetObservableRef.current) {
            setResult({
              loading: false,
              data: void 0,
              error: void 0,
              variables: options === null || options === void 0 ? void 0 : options.variables
            });
            setObservable(null);
            canResetObservableRef.current = false;
          }
        } else if (shouldResubscribe !== false && (client !== ref.current.client || subscription !== ref.current.subscription || (options === null || options === void 0 ? void 0 : options.fetchPolicy) !== ((_b2 = ref.current.options) === null || _b2 === void 0 ? void 0 : _b2.fetchPolicy) || !(options === null || options === void 0 ? void 0 : options.skip) !== !((_c = ref.current.options) === null || _c === void 0 ? void 0 : _c.skip) || !equality.equal(options === null || options === void 0 ? void 0 : options.variables, (_d = ref.current.options) === null || _d === void 0 ? void 0 : _d.variables)) || canResetObservableRef.current) {
          setResult({
            loading: true,
            data: void 0,
            error: void 0,
            variables: options === null || options === void 0 ? void 0 : options.variables
          });
          setObservable(client.subscribe({
            query: subscription,
            variables: options === null || options === void 0 ? void 0 : options.variables,
            fetchPolicy: options === null || options === void 0 ? void 0 : options.fetchPolicy,
            context: options === null || options === void 0 ? void 0 : options.context
          }));
          canResetObservableRef.current = false;
        }
        Object.assign(ref.current, { client, subscription, options });
      }, [client, subscription, options, canResetObservableRef.current]);
      React5.useEffect(function() {
        if (!observable) {
          return;
        }
        var subscription2 = observable.subscribe({
          next: function(fetchResult) {
            var _a2, _b2;
            var result2 = {
              loading: false,
              data: fetchResult.data,
              error: void 0,
              variables: options === null || options === void 0 ? void 0 : options.variables
            };
            setResult(result2);
            (_b2 = (_a2 = ref.current.options) === null || _a2 === void 0 ? void 0 : _a2.onSubscriptionData) === null || _b2 === void 0 ? void 0 : _b2.call(_a2, {
              client,
              subscriptionData: result2
            });
          },
          error: function(error) {
            setResult({
              loading: false,
              data: void 0,
              error,
              variables: options === null || options === void 0 ? void 0 : options.variables
            });
          },
          complete: function() {
            var _a2, _b2;
            (_b2 = (_a2 = ref.current.options) === null || _a2 === void 0 ? void 0 : _a2.onSubscriptionComplete) === null || _b2 === void 0 ? void 0 : _b2.call(_a2);
          }
        });
        return function() {
          subscription2.unsubscribe();
        };
      }, [observable]);
      return result;
    }
    function useReactiveVar(rv) {
      var value = rv();
      var setValue = React5.useState(value)[1];
      React5.useEffect(function() {
        var probablySameValue = rv();
        if (value !== probablySameValue) {
          setValue(probablySameValue);
        } else {
          return rv.onNextChange(setValue);
        }
      }, [value]);
      return value;
    }
    exports.useApolloClient = useApolloClient;
    exports.useLazyQuery = useLazyQuery19;
    exports.useMutation = useMutation25;
    exports.useQuery = useQuery40;
    exports.useReactiveVar = useReactiveVar;
    exports.useSubscription = useSubscription;
  }
});

// node_modules/@apollo/client/react/react.cjs
var require_react = __commonJS({
  "node_modules/@apollo/client/react/react.cjs"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    require_globals();
    var context = require_context();
    var hooks = require_hooks();
    var parser = require_parser();
    exports.ApolloConsumer = context.ApolloConsumer;
    exports.ApolloProvider = context.ApolloProvider;
    exports.getApolloContext = context.getApolloContext;
    exports.resetApolloContext = context.resetApolloContext;
    exports.DocumentType = parser.DocumentType;
    exports.operationName = parser.operationName;
    exports.parser = parser.parser;
    for (k in hooks) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        exports[k] = hooks[k];
    }
    var k;
  }
});

// node_modules/@apollo/client/main.cjs
var require_main = __commonJS({
  "node_modules/@apollo/client/main.cjs"(exports) {
    "use strict";
    init_react();
    Object.defineProperty(exports, "__esModule", { value: true });
    var core = require_core2();
    var react = require_react();
    for (k in core) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        exports[k] = core[k];
    }
    var k;
    for (k in react) {
      if (k !== "default" && !exports.hasOwnProperty(k))
        exports[k] = react[k];
    }
    var k;
  }
});

// <stdin>
var stdin_exports = {};
__export(stdin_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});
init_react();

// server-entry-module:@remix-run/dev/server-build
init_react();

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
init_react();
var import_react = require("@remix-run/react");
var import_server = require("react-dom/server");
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react.RemixServer, {
    context: remixContext,
    url: request.url
  }));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/root.tsx
var root_exports = {};
__export(root_exports, {
  default: () => App,
  links: () => links,
  meta: () => meta
});
init_react();
var import_react20 = require("@remix-run/react");
var import_client9 = __toESM(require_main());

// app/styles/globals-generated-do-not-edit.css
var globals_generated_do_not_edit_default = "/build/_assets/globals-generated-do-not-edit-YAYVXH63.css";

// app/apolloClient.ts
init_react();
var import_client = __toESM(require_main());
var graphqlPath = "/graphql";
var apiUrl = `http://localhost:4000${graphqlPath}`;
var API_URL = apiUrl;
var mergeArrayById = (existing, incoming, { readField, mergeObjects }) => {
  const merged = existing ? existing.slice(0) : [];
  const idToIndex = /* @__PURE__ */ Object.create(null);
  if (existing) {
    existing.forEach((item, index) => {
      idToIndex[readField("id", item)] = index;
    });
  }
  if (incoming) {
    incoming.forEach((item) => {
      const id = readField("id", item);
      const index = idToIndex[id];
      if (typeof index === "number") {
        merged[index] = mergeObjects(merged[index], item);
      } else {
        idToIndex[id] = merged.length;
        merged.push(item);
      }
    });
  }
  return merged;
};
var apolloClient = new import_client.ApolloClient({
  uri: API_URL,
  credentials: "include",
  cache: new import_client.InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          audioItems: {
            keyArgs: ["input", ["sortBy"]],
            merge(existing = [], incoming, { args: { input } }) {
              const { skip = 0 } = input;
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            }
          },
          collections: {
            keyArgs: ["input", ["sortBy"]],
            merge(existing = [], incoming, { args: { input } }) {
              const { skip = 0 } = input;
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            }
          },
          comments: {
            keyArgs: false,
            merge: mergeArrayById
          },
          entity: {
            keyArgs: false,
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            }
          },
          instruments: {
            keyArgs: ["input", ["sortBy"]],
            merge(existing = [], incoming, { args: { input } }) {
              const { skip = 0 } = input;
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            }
          },
          people: {
            keyArgs: ["input", ["sortBy"]],
            merge(existing = [], incoming, { args: { input } }) {
              const { skip = 0 } = input;
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            }
          },
          places: {
            keyArgs: ["input", ["sortBy"]],
            merge(existing = [], incoming, { args: { input } }) {
              const { skip = 0 } = input;
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            }
          },
          savedItemsForUser: {
            keyArgs: false,
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          },
          tags: {
            keyArgs: false,
            merge(_, incoming) {
              return incoming;
            }
          },
          tunes: {
            keyArgs: ["input", ["sortBy"]],
            merge(existing = [], incoming, { args: { input } }) {
              const { skip = 0 } = input;
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[skip + i] = incoming[i];
              }
              return merged;
            }
          }
        }
      },
      AudioItem: {
        fields: {
          comments: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          },
          tags: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          },
          isSavedByUser: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          },
          createdByUser: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          }
        }
      },
      Collection: {
        fields: {
          tags: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          }
        }
      },
      Comment: {
        fields: {
          parentAudioItem: {
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            }
          },
          createdByUser: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          }
        }
      },
      Instrument: {
        fields: {
          tags: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          }
        }
      },
      Person: {
        fields: {
          tags: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          }
        }
      },
      Place: {
        fields: {
          tags: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          }
        }
      },
      SavedItem: {
        fields: {
          audioItem: {
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            }
          }
        }
      },
      Tag: {
        fields: {
          subjectEntity: {
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            }
          },
          objectEntity: {
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            }
          },
          createdByUser: {
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            }
          }
        }
      },
      Tune: {
        fields: {
          tags: {
            merge(existing, incoming) {
              return incoming ?? existing;
            }
          }
        }
      }
    }
  })
});

// app/components/PlayerContextProvider.tsx
init_react();
var import_react6 = __toESM(require("react"));

// app/components/Player.tsx
init_react();
var import_react4 = require("react");
var import_react5 = require("@remix-run/react");

// app/hooks/usePlayerContext.ts
init_react();
var import_react2 = require("react");
var usePlayerContext = () => {
  const playerContext = (0, import_react2.useContext)(PlayerContext);
  return playerContext;
};
var usePlayerContext_default = usePlayerContext;

// app/types/index.ts
init_react();
var PerPage = /* @__PURE__ */ ((PerPage2) => {
  PerPage2[PerPage2["Ten"] = 10] = "Ten";
  PerPage2[PerPage2["Twenty"] = 20] = "Twenty";
  PerPage2[PerPage2["Fifty"] = 50] = "Fifty";
  PerPage2[PerPage2["Hundred"] = 100] = "Hundred";
  return PerPage2;
})(PerPage || {});
function isAudioItem(entity) {
  return entity.entityType === "AudioItem" /* AudioItem */;
}
function isPerson(entity) {
  return entity.entityType === "Person" /* Person */;
}
var TakedownRequestType = /* @__PURE__ */ ((TakedownRequestType2) => {
  TakedownRequestType2["Performer"] = "Performer";
  TakedownRequestType2["Copyright"] = "Copyright";
  return TakedownRequestType2;
})(TakedownRequestType || {});
var isPendingTakedownRequest = (takedownRequest) => takedownRequest.status.valueOf() === "Pending";
var isApprovedTakedownRequest = (takedownRequest) => takedownRequest.status.valueOf() === "Approved";
var isDeniedTakedownRequest = (takedownRequest) => takedownRequest.status.valueOf() === "Denied";
var isPendingVerificationRequest = (verificationRequest) => verificationRequest.status.valueOf() === "Pending";
var isApprovedVerificationRequest = (verificationRequest) => verificationRequest.status.valueOf() === "Approved";
var isDeniedVerificationRequest = (verificationRequest) => verificationRequest.status.valueOf() === "Denied";

// app/components/AudioPlayer.tsx
init_react();
var import_react3 = require("react");
var AudioPlayer = ({ item }) => {
  const audioPlayerRef = (0, import_react3.useRef)();
  const {
    setActiveItemDurationSeconds,
    setPlaybackPositionSeconds,
    seekPositionSeconds,
    setSeekPositionSeconds
  } = usePlayerContext_default();
  (0, import_react3.useEffect)(() => {
    const audioPlayer = audioPlayerRef.current;
    if (audioPlayer) {
      audioPlayer.ondurationchange = () => {
        const duration = audioPlayer.duration;
        if (typeof duration === "number") {
          const durationSeconds = Math.floor(audioPlayer.duration);
          setActiveItemDurationSeconds(durationSeconds);
        }
      };
      audioPlayer.ontimeupdate = () => {
        const playbackPositionSeconds = Math.floor(audioPlayer.currentTime);
        setPlaybackPositionSeconds(playbackPositionSeconds);
      };
    }
  }, []);
  (0, import_react3.useEffect)(() => {
    const audioPlayer = audioPlayerRef.current;
    if (audioPlayer && typeof seekPositionSeconds === "number") {
      audioPlayer.currentTime = seekPositionSeconds;
      setSeekPositionSeconds(void 0);
      if (audioPlayer.paused) {
        audioPlayer.play();
      }
    }
  }, [seekPositionSeconds]);
  return /* @__PURE__ */ React.createElement("audio", {
    ref: audioPlayerRef,
    id: "audio",
    preload: "metadata",
    autoPlay: true,
    controls: true,
    controlsList: "nodownload",
    className: "w-full outline-none"
  }, /* @__PURE__ */ React.createElement("source", {
    src: item.urlSource,
    type: "audio/mpeg"
  }));
};
var AudioPlayer_default = AudioPlayer;

// app/components/Player.tsx
var Player = () => {
  const { activeAudioItem, setActiveAudioItem } = usePlayerContext_default();
  if (!activeAudioItem) {
    return null;
  }
  const itemHref = (0, import_react4.useMemo)(() => {
    if (isAudioItem(activeAudioItem)) {
      return `/entities/audio-items/${activeAudioItem.slug}`;
    }
    return window.location.href;
  }, [activeAudioItem]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-center justify-center px-4 pb-4 pt-2 bg-white"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row justify-between mb-2"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "leading-8"
  }, "Now playing:", " ", /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, activeAudioItem.name)), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center ml-4"
  }, /* @__PURE__ */ React.createElement(import_react5.Link, {
    to: itemHref
  }, /* @__PURE__ */ React.createElement("a", {
    className: "whitespace-nowrap"
  }, "View")), /* @__PURE__ */ React.createElement("button", {
    className: "btn-icon flex ml-2 md:ml-4",
    onClick: () => setActiveAudioItem(null)
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "close")))), /* @__PURE__ */ React.createElement(AudioPlayer_default, {
    item: activeAudioItem,
    key: activeAudioItem.id
  }));
};
var Player_default = Player;

// app/components/PlayerContextProvider.tsx
var PlayerContext = import_react6.default.createContext(null);
function PlayerContextProvider({ children }) {
  const [activeAudioItem, setActiveAudioItem] = (0, import_react6.useState)(null);
  const [activeItemDurationSeconds, setActiveItemDurationSeconds] = (0, import_react6.useState)(void 0);
  const [playbackPositionSeconds, setPlaybackPositionSeconds] = (0, import_react6.useState)(void 0);
  const [seekPositionSeconds, setSeekPositionSeconds] = (0, import_react6.useState)(void 0);
  (0, import_react6.useEffect)(() => {
    if (!activeAudioItem) {
      setActiveItemDurationSeconds(void 0);
      setPlaybackPositionSeconds(void 0);
      setSeekPositionSeconds(void 0);
    }
  }, [activeAudioItem]);
  return /* @__PURE__ */ import_react6.default.createElement(PlayerContext.Provider, {
    value: {
      activeAudioItem,
      setActiveAudioItem,
      activeItemDurationSeconds,
      setActiveItemDurationSeconds,
      playbackPositionSeconds,
      setPlaybackPositionSeconds,
      seekPositionSeconds,
      setSeekPositionSeconds
    }
  }, children, activeAudioItem && /* @__PURE__ */ import_react6.default.createElement("div", {
    className: "fixed bottom-0 left-0 right-0",
    style: {
      boxShadow: "0 -10px 15px -3px rgba(0, 0, 0, 0.1), 0 -4px 6px -2px rgba(0, 0, 0, 0.05)"
    }
  }, /* @__PURE__ */ import_react6.default.createElement(Player_default, null)));
}
var PlayerContextProvider_default = PlayerContextProvider;

// app/components/Header.tsx
init_react();
var import_react17 = require("react");
var import_react18 = require("@remix-run/react");
var import_react19 = require("@remix-run/react");
var import_react_hotkeys_hook2 = require("react-hotkeys-hook");

// app/hooks/useCurrentUser.ts
init_react();
var import_react7 = require("react");
var import_client3 = __toESM(require_main());

// app/fragments/index.ts
init_react();
var import_client2 = __toESM(require_main());
var UserFragments = {
  user: import_client2.gql`
		fragment User on User {
			id
			username
			copyrightPermissionStatus
			verifiedPerson {
				id
				entityType
				slug
				name
			}
			createdAt
		}
	`,
  currentUser: import_client2.gql`
		fragment CurrentUser on User {
			id
			role
			email
			username
			copyrightPermissionStatus
		}
	`
};
var RelationshipFragments = {
  relationship: import_client2.gql`
		fragment Relationship on Relationship {
			id
			name
			subjectEntityType
			objectEntityType
		}
	`
};
var TagEntityFragments = {
  tagAudioItem: import_client2.gql`
		fragment TagAudioItem on AudioItem {
			id
			entityType
			name
			slug
		}
	`,
  tagInstrument: import_client2.gql`
		fragment TagInstrument on Instrument {
			id
			entityType
			name
			slug
		}
	`,
  tagPerson: import_client2.gql`
		fragment TagPerson on Person {
			id
			entityType
			name
			slug
		}
	`,
  tagPlace: import_client2.gql`
		fragment TagPlace on Place {
			id
			entityType
			name
			slug
		}
	`,
  tagTune: import_client2.gql`
		fragment TagTune on Tune {
			id
			entityType
			name
			slug
			type
		}
	`,
  tagCollection: import_client2.gql`
		fragment TagCollection on Collection {
			id
			entityType
			name
			slug
		}
	`
};
var TagFragments = {
  tag: import_client2.gql`
		fragment Tag on Tag {
			id
			relationship {
				...Relationship
			}
			subjectEntity {
				...TagAudioItem
				...TagInstrument
				...TagPerson
				...TagPlace
				...TagTune
				...TagCollection
			}
			objectEntity {
				...TagAudioItem
				...TagInstrument
				...TagPerson
				...TagPlace
				...TagTune
				...TagCollection
			}
			subjectTimeMarkerSeconds
			createdByUser {
				...User
			}
			createdAt
		}
		${RelationshipFragments.relationship}
		${TagEntityFragments.tagAudioItem}
		${TagEntityFragments.tagInstrument}
		${TagEntityFragments.tagPerson}
		${TagEntityFragments.tagPlace}
		${TagEntityFragments.tagTune}
		${TagEntityFragments.tagCollection}
		${UserFragments.user}
	`,
  tagForEntity: import_client2.gql`
		fragment TagForEntity on Tag {
			id
			relationship {
				...Relationship
			}
			objectEntity {
				...TagAudioItem
				...TagInstrument
				...TagPerson
				...TagPlace
				...TagTune
				...TagCollection
			}
			subjectTimeMarkerSeconds
			createdByUser {
				...User
			}
			createdAt
		}
		${RelationshipFragments.relationship}
		${TagEntityFragments.tagAudioItem}
		${TagEntityFragments.tagInstrument}
		${TagEntityFragments.tagPerson}
		${TagEntityFragments.tagPlace}
		${TagEntityFragments.tagTune}
		${TagEntityFragments.tagCollection}
		${UserFragments.user}
	`
};
var EntityFragments = {
  audioItem: import_client2.gql`
		fragment AudioItem on AudioItem {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...TagForEntity
			}
			commentsCount
			isSavedByUser
			status
			createdByUser {
				id
				username
				verifiedPerson {
					id
					entityType
					slug
				}
			}
			createdAt
			updatedAt
			urlSource
			itmaAtomSlug
		}
		${TagFragments.tagForEntity}
	`,
  person: import_client2.gql`
		fragment Person on Person {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...Tag
			}
			verifiedUser {
				...User
			}
			createdByUser {
				id
				username
			}
			createdAt
			updatedAt
			firstName
			middleName
			lastName
		}
		${TagFragments.tag}
		${UserFragments.user}
	`,
  instrument: import_client2.gql`
		fragment Instrument on Instrument {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...Tag
			}
			createdByUser {
				id
				username
			}
		}
		${TagFragments.tag}
	`,
  place: import_client2.gql`
		fragment Place on Place {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...Tag
			}
			latitude
			longitude
			createdByUser {
				id
				username
			}
		}
		${TagFragments.tag}
	`,
  tune: import_client2.gql`
		fragment Tune on Tune {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...Tag
			}
			theSessionTuneId
			type
			meter
			mode
			abc
		}
		${TagFragments.tag}
	`,
  collection: import_client2.gql`
		fragment Collection on Collection {
			id
			entityType
			name
			slug
			aliases
			description
			tags {
				...Tag
			}
			itmaAtomSlug
			createdByUser {
				id
				username
			}
			createdAt
			updatedAt
		}
		${TagFragments.tag}
		${UserFragments.user}
	`
};
var CommentFragments = {
  comment: import_client2.gql`
		fragment Comment on Comment {
			id
			text
			parentAudioItem {
				...AudioItem
			}
			createdByUser {
				...User
			}
			createdAt
			updatedAt
		}
		${EntityFragments.audioItem}
		${UserFragments.user}
	`,
  commentWithoutParentEntity: import_client2.gql`
		fragment CommentWithoutParentEntity on Comment {
			id
			text
			createdByUser {
				...User
			}
			createdAt
			updatedAt
		}
		${UserFragments.user}
	`
};
var SavedItemFragments = {
  savedItem: import_client2.gql`
		fragment SavedItem on SavedItem {
			id
			audioItem {
				...AudioItem
			}
			createdAt
		}
		${EntityFragments.audioItem}
	`
};
var TakedownRequestFragments = {
  takedownRequest: import_client2.gql`
		fragment TakedownRequest on TakedownRequest {
			id
			entity {
				...AudioItem
			}
			type
			message
			status
			createdByUser {
				id
				username
				email
			}
			createdAt
			updatedByUser {
				id
				username
				email
			}
			updatedAt
		}
		${EntityFragments.audioItem}
	`,
  takedownRequestWithoutEntity: import_client2.gql`
		fragment TakedownRequestWithoutEntity on TakedownRequest {
			id
			type
			message
			status
			createdByUser {
				id
				username
				email
			}
			createdAt
			updatedByUser {
				id
				username
				email
			}
			updatedAt
		}
	`
};
var VerificationRequestFragments = {
  verificationRequest: import_client2.gql`
		fragment VerificationRequest on VerificationRequest {
			id
			person {
				id
				entityType
				name
				slug
			}
			presignedImageDownloadUrl
			copyrightPermissionStatus
			status
			createdByUser {
				id
				username
				email
			}
			createdAt
			updatedByUser {
				id
				username
				email
			}
			updatedAt
		}
	`
};
var SubmissionFragments = {
  submission: import_client2.gql`
		fragment Submission on Submission {
			id
			status
			materialTypes
			userControlsCopyright
			copyrightDetails
			description
			s3DirectoryKey
			createdByUser {
				id
				username
				email
			}
			createdAt
			updatedByUser {
				id
				username
				email
			}
			updatedAt
		}
	`
};

// app/hooks/useCurrentUser.ts
var CURRENT_USER_QUERY = import_client3.gql`
	query CurrentUser {
		currentUser {
			...CurrentUser
		}
	}
	${UserFragments.currentUser}
`;
var useCurrentUser = () => {
  var _a;
  const [getCurrentUser, currentUserQuery] = (0, import_client3.useLazyQuery)(CURRENT_USER_QUERY);
  (0, import_react7.useEffect)(() => {
    getCurrentUser();
  }, [getCurrentUser]);
  const currentUser = (_a = currentUserQuery.data) == null ? void 0 : _a.currentUser;
  return [currentUser, currentUserQuery];
};
var useCurrentUser_default = useCurrentUser;

// app/services/User.ts
init_react();
var isAdmin = (user) => {
  if (!user) {
    return false;
  }
  return user.role === "Admin" /* Admin */;
};
var UserService = {
  isAdmin
};
var User_default = UserService;

// app/services/Entity.ts
init_react();
var cleanSlug = (rawSlug) => {
  const slugWithHyphens = rawSlug.replace(/[\s]/g, "-");
  return slugWithHyphens.replace(/[^a-zA-Z0-9-]/g, "").toLowerCase();
};
var makeHrefForTopLevel = (entity) => {
  switch (entity == null ? void 0 : entity.entityType) {
    case "AudioItem" /* AudioItem */:
      return "/entities/audio-items";
    case "Person" /* Person */:
      return "/entities/people";
    case "Instrument" /* Instrument */:
      return "/entities/instruments";
    case "Place" /* Place */:
      return "/entities/places";
    case "Tune" /* Tune */:
      return "/entities/tunes";
    case "Collection" /* Collection */:
      return "/entities/collections";
    default:
      return "";
  }
};
var makeHrefForView = (entity) => {
  return `${makeHrefForTopLevel(entity)}/${entity.slug}`;
};
var makeHrefForEdit = (entity) => {
  return `${makeHrefForView(entity)}/edit`;
};
var makeHrefForAbout = (entity) => {
  return `${makeHrefForView(entity)}/about`;
};
var makeHrefForTags = (entity) => {
  return `${makeHrefForView(entity)}/tags`;
};
var makeReadableNamePlural = (entity) => {
  switch (entity == null ? void 0 : entity.entityType) {
    case "AudioItem" /* AudioItem */:
      return "Audio Items";
    case "Person" /* Person */:
      return "People";
    case "Instrument" /* Instrument */:
      return "Instruments";
    case "Place" /* Place */:
      return "Places";
    case "Tune" /* Tune */:
      return "Tunes";
    case "Collection" /* Collection */:
      return "Collections";
    default:
      return "";
  }
};
var EntityService = {
  cleanSlug,
  makeHrefForTopLevel,
  makeHrefForView,
  makeHrefForEdit,
  makeHrefForAbout,
  makeHrefForTags,
  makeReadableNamePlural
};
var Entity_default = EntityService;

// app/components/Modal.tsx
init_react();
var import_react_hotkeys_hook = require("react-hotkeys-hook");
var Modal = ({
  children,
  isVisible = false,
  onClose,
  title,
  className
}) => {
  (0, import_react_hotkeys_hook.useHotkeys)("esc", onClose, {
    enableOnTags: ["INPUT", "TEXTAREA"]
  }, [onClose]);
  if (!isVisible) {
    return null;
  }
  return /* @__PURE__ */ React.createElement("div", {
    className: `${isVisible ? "visible" : "hidden"} z-40 fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40",
    onClick: onClose
  }), /* @__PURE__ */ React.createElement("div", {
    className: `bg-white cursor-auto rounded relative w-full px-4 pb-4 pt-3 m-2 max-h-9/10 overflow-y-auto overflow-x-hidden md:max-w-md ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row justify-between items-center mb-4 text-black"
  }, /* @__PURE__ */ React.createElement("h2", null, title), /* @__PURE__ */ React.createElement("button", {
    className: "btn-icon flex flex-row items-center justify-center ml-4 mb-0.5",
    onClick: onClose,
    "aria-label": "Close"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-0.5 mr-3"
  }, "ESC"), /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "close"))), /* @__PURE__ */ React.createElement("div", {
    className: "text-base text-black font-normal whitespace-normal text-left cursor-auto"
  }, children)));
};
var Modal_default = Modal;

// app/components/SearchEntities.tsx
init_react();
var import_react15 = require("@remix-run/react");
var import_react16 = require("react");
var import_client8 = __toESM(require_main());
var import_debounce = __toESM(require("lodash/debounce"));

// app/components/LoadingCircle.tsx
init_react();
var LoadingCircle = ({ className }) => /* @__PURE__ */ React.createElement("div", {
  className: "h-6"
}, /* @__PURE__ */ React.createElement("i", {
  className: `material-icons animate-spin text-gray-500 ${className ?? ""}`
}, "scatter_plot"));
var LoadingCircle_default = LoadingCircle;

// app/components/CreateNewEntities.tsx
init_react();
var import_react14 = require("react");

// app/hooks/useRequireLogin.ts
init_react();
var import_react8 = require("react");
var import_react9 = require("@remix-run/react");
var useRequireLogin = () => {
  const navigate = (0, import_react9.useNavigate)();
  const [currentUser] = useCurrentUser_default();
  const requireLogin = (0, import_react8.useCallback)(({ redirectTo } = {}) => navigate({
    pathname: "/login",
    query: {
      redirectTo: redirectTo ?? window.location.pathname
    }
  }), [navigate]);
  return { requireLogin, currentUser };
};
var useRequireLogin_default = useRequireLogin;

// app/components/CreatePersonForm.tsx
init_react();
var import_react10 = require("react");
var import_client4 = __toESM(require_main());
var CREATE_PERSON_MUTATION = import_client4.gql`
	mutation CreatePerson($input: CreatePersonInput!) {
		createPerson(input: $input) {
			...Person
		}
	}
	${EntityFragments.person}
`;
var CreatePersonForm = ({ onSuccess }) => {
  const [createPerson, { loading, error, data }] = (0, import_client4.useMutation)(CREATE_PERSON_MUTATION, {
    errorPolicy: "all"
  });
  const [firstName, setFirstName] = (0, import_react10.useState)("");
  const [middleName, setMiddleName] = (0, import_react10.useState)("");
  const [lastName, setLastName] = (0, import_react10.useState)("");
  const [slug, setSlug] = (0, import_react10.useState)("");
  const [aliases, setAliases] = (0, import_react10.useState)("");
  const [description, setDescription] = (0, import_react10.useState)("");
  (0, import_react10.useEffect)(() => {
    let proposedSlug = "";
    if (firstName) {
      proposedSlug = firstName;
    }
    if (middleName) {
      proposedSlug = `${proposedSlug}-${middleName}`;
    }
    if (lastName) {
      proposedSlug = `${proposedSlug}-${lastName}`;
    }
    setSlug(Entity_default.cleanSlug(proposedSlug));
  }, [firstName, middleName, lastName]);
  const onCreatePerson = (event) => {
    event.preventDefault();
    const input = {
      firstName,
      middleName,
      lastName,
      slug,
      aliases,
      description
    };
    createPerson({ variables: { input } });
  };
  (0, import_react10.useEffect)(() => {
    if (data == null ? void 0 : data.createPerson) {
      if (onSuccess) {
        return onSuccess(data.createPerson);
      }
      window.alert("Person created successfully!");
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setSlug("");
      setAliases("");
      setDescription("");
    }
  }, [data]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onCreatePerson
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "First name",
    autoFocus: true,
    className: "mb-2",
    value: firstName,
    onChange: (event) => setFirstName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Middle name (optional)",
    className: "mb-2",
    value: middleName,
    onChange: (event) => setMiddleName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Last name",
    className: "mb-2",
    value: lastName,
    onChange: (event) => setLastName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "URL slug (ie. kitty-hayes)",
    className: "mb-2",
    value: slug,
    onChange: (event) => setSlug(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "This will be used for the URL of this Person, for example", " ", `https://trad-archive.com/entities/people/${slug || "kitty-hayes"}`), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Person. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Tony D, The Tradfather, Tony from the County Calamari")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 5,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Create"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var CreatePersonForm_default = CreatePersonForm;

// app/components/CreateInstrumentForm.tsx
init_react();
var import_react11 = require("react");
var import_client5 = __toESM(require_main());
var CREATE_INSTRUMENT_MUTATION = import_client5.gql`
	mutation CreateInstrument($input: CreateInstrumentInput!) {
		createInstrument(input: $input) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;
var CreateInstrumentForm = ({ onSuccess }) => {
  const [createInstrument, { loading, error, data }] = (0, import_client5.useMutation)(CREATE_INSTRUMENT_MUTATION, {
    errorPolicy: "all"
  });
  const [name, setName] = (0, import_react11.useState)("");
  const [slug, setSlug] = (0, import_react11.useState)("");
  const [aliases, setAliases] = (0, import_react11.useState)("");
  const [description, setDescription] = (0, import_react11.useState)("");
  (0, import_react11.useEffect)(() => {
    const proposedSlug = Entity_default.cleanSlug(name ?? "");
    setSlug(proposedSlug);
  }, [name]);
  const onCreateInstrument = (event) => {
    event.preventDefault();
    const input = {
      name,
      slug,
      aliases,
      description
    };
    createInstrument({ variables: { input } });
  };
  (0, import_react11.useEffect)(() => {
    if (data == null ? void 0 : data.createInstrument) {
      if (onSuccess) {
        return onSuccess(data.createInstrument);
      }
      window.alert("Instrument created successfully!");
      setName("");
      setSlug("");
      setAliases("");
      setDescription("");
    }
  }, [data]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onCreateInstrument
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: true,
    className: "mb-2",
    value: name,
    onChange: (event) => setName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "URL slug (ie. button-accordion)",
    className: "mb-2",
    value: slug,
    onChange: (event) => setSlug(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "This will be used for the URL of this Instrument, for example", " ", `https://trad-archive.com/entities/instruments/${slug || "button-accordion"}`), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Instrument. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Stomach Steinway, Squeezebox, Belly Organ")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 5,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Create"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var CreateInstrumentForm_default = CreateInstrumentForm;

// app/components/CreatePlaceForm.tsx
init_react();
var import_react12 = require("react");
var import_client6 = __toESM(require_main());
var CREATE_PLACE_MUTATION = import_client6.gql`
	mutation CreatePlace($input: CreatePlaceInput!) {
		createPlace(input: $input) {
			...Place
		}
	}
	${EntityFragments.place}
`;
var CreatePlaceForm = ({ onSuccess }) => {
  const [createPlace, { loading, error, data }] = (0, import_client6.useMutation)(CREATE_PLACE_MUTATION, { errorPolicy: "all" });
  const [name, setName] = (0, import_react12.useState)("");
  const [slug, setSlug] = (0, import_react12.useState)("");
  const [aliases, setAliases] = (0, import_react12.useState)("");
  const [latitude, setLatitude] = (0, import_react12.useState)("");
  const [longitude, setLongitude] = (0, import_react12.useState)("");
  const [description, setDescription] = (0, import_react12.useState)("");
  (0, import_react12.useEffect)(() => {
    const proposedSlug = Entity_default.cleanSlug(name ?? "");
    setSlug(proposedSlug);
  }, [name]);
  const onCreatePlace = async (event) => {
    event.preventDefault();
    const input = {
      name,
      slug,
      aliases,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      description
    };
    try {
      await createPlace({ variables: { input } });
    } catch {
    }
  };
  (0, import_react12.useEffect)(() => {
    if (data == null ? void 0 : data.createPlace) {
      if (onSuccess) {
        return onSuccess(data.createPlace);
      }
      window.alert("Place created successfully!");
      setName("");
      setSlug("");
      setAliases("");
      setLatitude("");
      setLongitude("");
      setDescription("");
    }
  }, [data]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onCreatePlace
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: true,
    className: "mb-2",
    value: name,
    onChange: (event) => setName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "URL slug (ie. galway-city)",
    className: "mb-2",
    value: slug,
    onChange: (event) => setSlug(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "This will be used for the URL of this Place, for example", " ", `https://trad-archive.com/entities/places/${slug || "galway-city"}`), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Place. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Gaillimh, The City of Tribes")), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Latitude",
    className: "mb-2",
    value: latitude,
    onChange: (event) => setLatitude(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Longitude",
    className: "mb-2",
    value: longitude,
    onChange: (event) => setLongitude(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "To find the latitude and longitude, visit", " ", /* @__PURE__ */ React.createElement("a", {
    href: `https://www.google.com/maps/place/${name}`,
    target: "_blank",
    rel: "noreferrer"
  }, name ? `${name} on ` : "", "Google Maps (will open in new tab)"), " ", `and right-click on the exact location you'd like. You'll see numbers like "53.2838294,-9.1888286". Click to copy them to your clipboard. The first one is latitude, and the second is longitude.`), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 5,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Create"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var CreatePlaceForm_default = CreatePlaceForm;

// app/components/CreateCollectionForm.tsx
init_react();
var import_react13 = require("react");
var import_client7 = __toESM(require_main());
var CREATE_COLLECTION_MUTATION = import_client7.gql`
	mutation CreateCollection($input: CreateCollectionInput!) {
		createCollection(input: $input) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;
var CreateCollectionForm = ({ onSuccess }) => {
  const [createCollection, { loading, error, data }] = (0, import_client7.useMutation)(CREATE_COLLECTION_MUTATION, { errorPolicy: "all" });
  const [name, setName] = (0, import_react13.useState)("");
  const [slug, setSlug] = (0, import_react13.useState)("");
  const [aliases, setAliases] = (0, import_react13.useState)("");
  const [description, setDescription] = (0, import_react13.useState)("");
  (0, import_react13.useEffect)(() => {
    const proposedSlug = Entity_default.cleanSlug(name ?? "");
    setSlug(proposedSlug);
  }, [name]);
  const onCreateCollection = async (event) => {
    event.preventDefault();
    const input = {
      name,
      slug,
      aliases,
      description
    };
    try {
      await createCollection({ variables: { input } });
    } catch {
    }
  };
  (0, import_react13.useEffect)(() => {
    if (data == null ? void 0 : data.createCollection) {
      if (onSuccess) {
        return onSuccess(data.createCollection);
      }
      window.alert("Collection created successfully!");
      setName("");
      setSlug("");
      setAliases("");
      setDescription("");
    }
  }, [data]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500 mb-8"
  }, `A Collection is a logical grouping of other entities. For example, "O'Neill's Music of Ireland" would be a Collection of Tunes. Or the "Alen MacWeeney Collection" would be a Collection of AudioItems.`), /* @__PURE__ */ React.createElement("form", {
    onSubmit: onCreateCollection
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: true,
    className: "mb-2",
    value: name,
    onChange: (event) => setName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "URL slug (ie. alan-macweeney-collection)",
    className: "mb-2",
    value: slug,
    onChange: (event) => setSlug(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "This will be used for the URL of this Collection, for example", " ", `https://trad-archive.com/entities/collections/${slug || "alan-macweeney-collection"}`), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Collection. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "O'Neill's, 1000 Fiddle Tunes")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 5,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Create"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var CreateCollectionForm_default = CreateCollectionForm;

// app/components/CreateNewEntities.tsx
var CreateNewEntities = ({ entityTypes, onNewEntityCreated }) => {
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [createPersonModalIsVisible, setCreatePersonModalIsVisible] = (0, import_react14.useState)(false);
  const [createInstrumentModalIsVisible, setCreateInstrumentModalIsVisible] = (0, import_react14.useState)(false);
  const [createPlaceModalIsVisible, setCreatePlaceModalIsVisible] = (0, import_react14.useState)(false);
  const [createCollectionModalIsVisible, setCreateCollectionModalIsVisible] = (0, import_react14.useState)(false);
  const onCreateNewPersonClicked = (0, import_react14.useCallback)(async () => {
    if (!currentUser) {
      return await requireLogin();
    }
    setCreatePersonModalIsVisible(true);
  }, [requireLogin, currentUser]);
  const onCreateNewInstrumentClicked = (0, import_react14.useCallback)(async () => {
    if (!currentUser) {
      return await requireLogin();
    }
    setCreateInstrumentModalIsVisible(true);
  }, [requireLogin, currentUser]);
  const onCreateNewPlaceClicked = (0, import_react14.useCallback)(async () => {
    if (!currentUser) {
      return await requireLogin();
    }
    setCreatePlaceModalIsVisible(true);
  }, [requireLogin, currentUser]);
  const onCreateNewCollectionClicked = (0, import_react14.useCallback)(async () => {
    if (!currentUser) {
      return await requireLogin();
    }
    setCreateCollectionModalIsVisible(true);
  }, [requireLogin, currentUser]);
  const onNewPersonCreated = (0, import_react14.useCallback)((person) => {
    setCreatePersonModalIsVisible(false);
    onNewEntityCreated(person);
  }, [onNewEntityCreated]);
  const onNewInstrumentCreated = (0, import_react14.useCallback)((instrument) => {
    setCreateInstrumentModalIsVisible(false);
    onNewEntityCreated(instrument);
  }, []);
  const onNewPlaceCreated = (0, import_react14.useCallback)((place) => {
    setCreatePlaceModalIsVisible(false);
    onNewEntityCreated(place);
  }, []);
  const onNewCollectionCreated = (0, import_react14.useCallback)((collection) => {
    setCreateCollectionModalIsVisible(false);
    onNewEntityCreated(collection);
  }, []);
  const shouldShowCreatePerson = typeof entityTypes === "undefined" || entityTypes.includes("Person" /* Person */);
  const shouldShowCreateInstrument = typeof entityTypes === "undefined" || entityTypes.includes("Instrument" /* Instrument */);
  const shouldShowCreatePlace = typeof entityTypes === "undefined" || entityTypes.includes("Place" /* Place */);
  const shouldShowCreateCollection = typeof entityTypes === "undefined" || entityTypes.includes("Collection" /* Collection */);
  const shouldShowCommaAfterCreatePerson = !entityTypes || shouldShowCreateInstrument || shouldShowCreatePlace || shouldShowCreateCollection;
  const shouldShowCommaAfterCreateInstrument = !entityTypes || shouldShowCreatePlace || shouldShowCreateCollection;
  const shouldShowCommaAfterCreatePlace = !entityTypes || shouldShowCreateCollection;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "Can't find it? Create new:", " ", shouldShowCreatePerson && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: onCreateNewPersonClicked
  }, "Person"), shouldShowCommaAfterCreatePerson && ", "), shouldShowCreateInstrument && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: onCreateNewInstrumentClicked
  }, "Instrument"), shouldShowCommaAfterCreateInstrument && ", "), shouldShowCreatePlace && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: onCreateNewPlaceClicked
  }, "Place"), shouldShowCommaAfterCreatePlace && ", "), shouldShowCreateCollection && /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: onCreateNewCollectionClicked
  }, "Collection")), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Create New Person",
    isVisible: createPersonModalIsVisible,
    onClose: () => setCreatePersonModalIsVisible(false)
  }, /* @__PURE__ */ React.createElement(CreatePersonForm_default, {
    onSuccess: onNewPersonCreated
  })), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Create New Instrument",
    isVisible: createInstrumentModalIsVisible,
    onClose: () => setCreateInstrumentModalIsVisible(false)
  }, /* @__PURE__ */ React.createElement(CreateInstrumentForm_default, {
    onSuccess: onNewInstrumentCreated
  })), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Create New Place",
    isVisible: createPlaceModalIsVisible,
    onClose: () => setCreatePlaceModalIsVisible(false)
  }, /* @__PURE__ */ React.createElement(CreatePlaceForm_default, {
    onSuccess: onNewPlaceCreated
  })), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Create New Collection",
    isVisible: createCollectionModalIsVisible,
    onClose: () => setCreateCollectionModalIsVisible(false)
  }, /* @__PURE__ */ React.createElement(CreateCollectionForm_default, {
    onSuccess: onNewCollectionCreated
  })));
};
var CreateNewEntities_default = CreateNewEntities;

// app/components/SearchEntities.tsx
var SEARCH_ENTITIES_QUERY = import_client8.gql`
	query SearchEntities($input: SearchEntitiesInput!) {
		searchEntities(input: $input) {
			...AudioItem
			...Person
			...Instrument
			...Place
			...Tune
			...Collection
		}
	}
	${EntityFragments.audioItem}
	${EntityFragments.person}
	${EntityFragments.instrument}
	${EntityFragments.place}
	${EntityFragments.tune}
	${EntityFragments.collection}
`;
var SearchEntities = ({
  entityTypes,
  take,
  onSelect,
  onNewEntityCreated,
  className
}) => {
  const [searchTerm, setSearchTerm] = (0, import_react16.useState)("");
  const [searchResults, setSearchResults] = (0, import_react16.useState)();
  const onChangeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };
  const [searchEntities, { loading, data, error }] = (0, import_client8.useLazyQuery)(SEARCH_ENTITIES_QUERY, {
    fetchPolicy: "no-cache"
  });
  const debouncedSearchEntities = (0, import_react16.useCallback)((0, import_debounce.default)(searchEntities, 300, { trailing: true }), [searchEntities]);
  (0, import_react16.useEffect)(() => {
    const cleanedSearchTerm = (searchTerm == null ? void 0 : searchTerm.trim()) ?? "";
    if (cleanedSearchTerm.length >= 3) {
      debouncedSearchEntities({
        variables: {
          input: {
            searchTerm: cleanedSearchTerm,
            entityTypes,
            take: take ?? 24
          }
        }
      });
    }
  }, [searchTerm]);
  (0, import_react16.useEffect)(() => {
    if (data == null ? void 0 : data.searchEntities) {
      setSearchResults(data.searchEntities);
    }
  }, [data]);
  return /* @__PURE__ */ React.createElement("div", {
    className: className ?? ""
  }, /* @__PURE__ */ React.createElement("div", {
    className: "relative"
  }, /* @__PURE__ */ React.createElement("input", {
    autoFocus: true,
    placeholder: "Start typing...",
    value: searchTerm,
    onChange: onChangeSearchTerm
  }), loading && /* @__PURE__ */ React.createElement("div", {
    className: "absolute top-2 right-2"
  }, /* @__PURE__ */ React.createElement(LoadingCircle_default, null))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-4 ml-2"
  }, "Error fetching results"), searchResults && /* @__PURE__ */ React.createElement("div", {
    className: "mt-4"
  }, /* @__PURE__ */ React.createElement("ul", {
    className: "max-h-40"
  }, searchResults.map((entity, index) => /* @__PURE__ */ React.createElement("li", {
    className: "flex flex-row",
    key: index
  }, /* @__PURE__ */ React.createElement("button", {
    className: "flex flex-1 justify-between items-center text-left p-2 rounded cursor-pointer hover:bg-gray-200",
    onClick: () => onSelect(entity)
  }, /* @__PURE__ */ React.createElement("span", null, entity.name, entity.entityType === "Tune" /* Tune */ ? ` (${entity.type})` : ""), /* @__PURE__ */ React.createElement("span", {
    className: "uppercase text-gray-500 text-sm"
  }, entity.entityType)), /* @__PURE__ */ React.createElement(import_react15.Link, {
    to: Entity_default.makeHrefForAbout(entity)
  }, /* @__PURE__ */ React.createElement("a", {
    className: "btn-icon w-auto px-2",
    target: "_blank",
    "aria-label": `Open ${entity.name} in New Tab`
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-base"
  }, "launch")))))), searchResults.length === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "p-2 block text-gray-500"
  }, "No results"), onNewEntityCreated && /* @__PURE__ */ React.createElement("div", {
    className: "mt-2 ml-2"
  }, /* @__PURE__ */ React.createElement(CreateNewEntities_default, {
    entityTypes,
    onNewEntityCreated
  }))));
};
var SearchEntities_default = SearchEntities;

// app/components/Header.tsx
var Header = () => {
  const navigate = (0, import_react19.useNavigate)();
  const [currentUser, { loading }] = useCurrentUser_default();
  const [searchModalIsVisible, setSearchModalIsVisible] = (0, import_react17.useState)(false);
  const openSearchModal = (event) => {
    event.preventDefault();
    setSearchModalIsVisible(true);
  };
  const closeSearchModal = () => {
    setSearchModalIsVisible(false);
  };
  (0, import_react_hotkeys_hook2.useHotkeys)("/", openSearchModal);
  const onSelectSearchResult = (0, import_react17.useCallback)((entity) => {
    setSearchModalIsVisible(false);
    navigate(Entity_default.makeHrefForView(entity));
  }, [navigate]);
  const onNewEntityCreated = (0, import_react17.useCallback)((entity) => {
    navigate(Entity_default.makeHrefForView(entity));
  }, [navigate]);
  const userActions = (0, import_react17.useMemo)(() => {
    if (loading || typeof currentUser === "undefined") {
      return null;
    } else if (currentUser) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "flex flex-row items-center"
      }, /* @__PURE__ */ React.createElement(import_react18.Link, {
        to: "/saved-items"
      }, /* @__PURE__ */ React.createElement("a", {
        className: "btn-text text-current flex flex-row items-center whitespace-nowrap hover:text-gray-400 ml-4"
      }, /* @__PURE__ */ React.createElement("i", {
        className: "material-icons"
      }, "bookmark"), /* @__PURE__ */ React.createElement("span", {
        className: "hidden md:block md:pl-1"
      }, "Saved"))), User_default.isAdmin(currentUser) && /* @__PURE__ */ React.createElement(import_react18.Link, {
        to: "/admin"
      }, /* @__PURE__ */ React.createElement("a", {
        className: "btn-text text-current flex flex-row items-center whitespace-nowrap hover:text-gray-400 ml-4"
      }, /* @__PURE__ */ React.createElement("i", {
        className: "material-icons"
      }, "manage_accounts"), /* @__PURE__ */ React.createElement("span", {
        className: "hidden md:block md:pl-1"
      }, "Admin"))), /* @__PURE__ */ React.createElement(import_react18.Link, {
        to: "/account"
      }, /* @__PURE__ */ React.createElement("a", {
        className: "btn-text text-current flex flex-row items-center whitespace-nowrap hover:text-gray-400 ml-4"
      }, /* @__PURE__ */ React.createElement("i", {
        className: "material-icons"
      }, "account_circle"), /* @__PURE__ */ React.createElement("span", {
        className: "hidden md:block md:pl-1"
      }, "Account"))));
    } else {
      return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_react18.Link, {
        to: "/login"
      }, /* @__PURE__ */ React.createElement("a", {
        className: "btn-text text-current whitespace-nowrap hover:text-gray-400 ml-4"
      }, "Log In")), /* @__PURE__ */ React.createElement(import_react18.Link, {
        to: "/signup"
      }, /* @__PURE__ */ React.createElement("a", {
        className: "btn text-current no-underline whitespace-nowrap hover:text-current ml-4"
      }, "Sign Up")));
    }
  }, [loading, currentUser]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row py-3 px-4 justify-between text-white items-center bg-teal-700",
    suppressHydrationWarning: true
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row"
  }, /* @__PURE__ */ React.createElement(import_react18.Link, {
    to: "/"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "btn-text text-current whitespace-nowrap text-yellow-200 hover:text-gray-400"
  }, "Trad Archive")), /* @__PURE__ */ React.createElement("button", {
    className: "btn-text text-current flex flex-row items-center whitespace-nowrap hover:text-gray-400 group ml-4",
    onClick: openSearchModal
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "search"), /* @__PURE__ */ React.createElement("span", {
    className: "hidden md:block md:pl-1"
  }, "Search"), /* @__PURE__ */ React.createElement("span", {
    className: "hidden md:block border border-gray-300 group-hover:border-gray-400 rounded text-xs px-1.5 ml-2.5"
  }, `/`)), /* @__PURE__ */ React.createElement(import_react18.Link, {
    to: "/entities/audio-items/random"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "flex flex-row items-center link-bare text-current text-white hover:text-gray-400 ml-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "block h-6"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "shuffle")), /* @__PURE__ */ React.createElement("div", {
    className: "md:pl-2 hidden md:block"
  }, "Random")))), userActions), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Search",
    isVisible: searchModalIsVisible,
    onClose: closeSearchModal
  }, /* @__PURE__ */ React.createElement(SearchEntities_default, {
    onSelect: onSelectSearchResult,
    onNewEntityCreated
  })));
};
var Header_default = Header;

// app/components/Footer.tsx
init_react();
function Footer() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col items-start w-full p-4 pt-7 pb-24 bg-gray-900 text-gray-100"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "This project is a collaboration between the", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://www.itma.ie/",
    target: "_blank"
  }, "Irish Traditional Music Archive", " ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch")), " ", "and", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://dangurney.net",
    target: "_blank"
  }, "Dan Gurney ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch"))), /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Special thanks to", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://thesession.org/",
    target: "_blank"
  }, "The Session ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch")), " ", "for providing tune data."), /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "All of the code is open source on", " ", /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/dgurns/trad-archive",
    target: "_blank"
  }, "GitHub ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch")), ". We welcome community contributors."), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("a", {
    href: "https://github.com/dgurns/trad-archive/discussions",
    target: "_blank"
  }, "Share feedback or report a bug", " ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch"))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/root.tsx
var meta = () => ({
  charset: "utf-8",
  title: "Trad Archive",
  viewport: "width=device-width,initial-scale=1"
});
function links() {
  return [
    { rel: "stylesheet", href: globals_generated_do_not_edit_default },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicons/apple-touch-icon.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      href: "/favicons/android-chrome-192x192.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicons/favicon-32x32.png"
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicons/favicon-16x16.png"
    },
    {
      rel: "shortcut icon",
      href: "/favicons/favicon.ico"
    }
  ];
}
function App() {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement(import_react20.Meta, null), /* @__PURE__ */ React.createElement(import_react20.Links, null)), /* @__PURE__ */ React.createElement(import_client9.ApolloProvider, {
    client: apolloClient
  }, /* @__PURE__ */ React.createElement(PlayerContextProvider_default, null, /* @__PURE__ */ React.createElement("body", {
    className: "bg-gray-100"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col w-full relative pt-12"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-start items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full min-h-screen lg:max-w-5xl px-4 pt-6 pb-44"
  }, /* @__PURE__ */ React.createElement(import_react20.Outlet, null)), /* @__PURE__ */ React.createElement(Footer, null)), /* @__PURE__ */ React.createElement("div", {
    className: "fixed top-0 right-0 left-0",
    id: "header"
  }, /* @__PURE__ */ React.createElement(Header_default, null))), /* @__PURE__ */ React.createElement(import_react20.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_react20.Scripts, null), /* @__PURE__ */ React.createElement(import_react20.LiveReload, null)))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/[id]/upload.tsx
var upload_exports = {};
__export(upload_exports, {
  default: () => upload_default
});
init_react();
var import_react25 = require("react");
var import_react26 = require("@remix-run/react");
var import_client10 = __toESM(require_main());

// app/components/Layout.tsx
init_react();
var import_react21 = require("react");
var { NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF } = process.env;
var Layout = ({ children, pageTitle }) => {
  const shouldShowPreviewWarning = NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF !== "master";
  const fixedHeaderRef = (0, import_react21.useRef)();
  const defaultFixedHeaderHeight = shouldShowPreviewWarning ? 76 : 48;
  const [fixedHeaderHeight, setFixedHeaderHeight] = (0, import_react21.useState)(defaultFixedHeaderHeight);
  (0, import_react21.useEffect)(() => {
    const fixedHeader = fixedHeaderRef.current;
    if (fixedHeader) {
      setFixedHeaderHeight(fixedHeader.offsetHeight);
    }
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    style: { paddingTop: fixedHeaderHeight }
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col justify-start items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full min-h-screen lg:max-w-5xl py-6 px-4 pb-44"
  }, children), /* @__PURE__ */ React.createElement(Footer, null)), /* @__PURE__ */ React.createElement("div", {
    className: "fixed top-0 right-0 left-0",
    ref: fixedHeaderRef,
    id: "header"
  }, shouldShowPreviewWarning && /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center justify-center py-1 px-4 bg-black text-white text-sm text-center"
  }, "This is a preview version of the site with fake data."), /* @__PURE__ */ React.createElement(Header_default, null)));
};
var Layout_default = Layout;

// app/components/RequireUser.tsx
init_react();
var import_react22 = require("@remix-run/react");
var RequireUser = ({
  children,
  requireUserId
}) => {
  const navigate = (0, import_react22.useNavigate)();
  const [currentUser, { data, error }] = useCurrentUser_default();
  if (!data && !error) {
    return /* @__PURE__ */ React.createElement("div", null, "Checking for logged-in user...");
  } else if (requireUserId && (currentUser == null ? void 0 : currentUser.id) !== requireUserId) {
    return /* @__PURE__ */ React.createElement("div", null, "You do not have access to this page");
  } else if (currentUser) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
  } else if (typeof window !== "undefined") {
    navigate({
      pathname: "/login",
      query: { redirectTo: window.location.pathname }
    });
    return null;
  }
  return null;
};
var RequireUser_default = RequireUser;

// app/components/Breadcrumb.tsx
init_react();
var import_react23 = require("@remix-run/react");
var Breadcrumb = ({ items = [], className }) => {
  if (items.length === 0) {
    return null;
  }
  if (items.length === 1) {
    return /* @__PURE__ */ React.createElement("h1", {
      className: className ?? ""
    }, items[0].label);
  }
  const subItems = items.slice(0, items.length - 1);
  const finalItem = items[items.length - 1];
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-col ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center mb-1"
  }, subItems.map(({ label, href }, index) => /* @__PURE__ */ React.createElement("div", {
    className: "flex",
    key: index
  }, href ? /* @__PURE__ */ React.createElement(import_react23.Link, {
    to: href
  }, label) : /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, label), /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-gray-500 text-base ml-1"
  }, "keyboard_arrow_right")))), /* @__PURE__ */ React.createElement("h1", null, finalItem.label));
};
var Breadcrumb_default = Breadcrumb;

// app/components/LoadingBlock.tsx
init_react();
var LoadingBlock = ({ className }) => /* @__PURE__ */ React.createElement("div", {
  className: `flex flex-col justify-start items-start w-full ${className ?? ""}`
}, /* @__PURE__ */ React.createElement("div", {
  className: "flex h-5 w-2/3 rounded bg-gray-300 mb-4 animate-pulse"
}), /* @__PURE__ */ React.createElement("div", {
  className: "flex h-12 w-full rounded bg-gray-300 mb-4 animate-pulse"
}), /* @__PURE__ */ React.createElement("div", {
  className: "flex h-5 w-5/12 rounded bg-gray-300 mb-4 animate-pulse"
}));
var LoadingBlock_default = LoadingBlock;

// app/components/FileUploader.tsx
init_react();
var import_react24 = require("react");
var FileUploader = ({ filesWithUploadUrls, onSuccess }) => {
  const queue = (0, import_react24.useRef)({
    pending: filesWithUploadUrls,
    inProgress: [],
    failed: [],
    succeeded: []
  });
  const [ticker, setTicker] = (0, import_react24.useState)(0);
  const moveFromPendingToInProgress = (file) => {
    const updated = __spreadValues({}, queue.current);
    updated.pending = updated.pending.filter((f) => f.uploadUrl !== file.uploadUrl);
    updated.inProgress = [...updated.inProgress, file];
    queue.current = updated;
  };
  const moveFromInProgressToSucceeded = (file) => {
    const updated = __spreadValues({}, queue.current);
    updated.inProgress = updated.inProgress.filter((f) => f.uploadUrl !== file.uploadUrl);
    updated.succeeded = [...updated.succeeded, file];
    queue.current = updated;
  };
  const moveFromInProgressToFailed = (file) => {
    const updated = __spreadValues({}, queue.current);
    updated.inProgress = updated.inProgress.filter((f) => f.uploadUrl !== file.uploadUrl);
    updated.failed = [...updated.failed, file];
    queue.current = updated;
  };
  const uploadFile = async (f) => {
    try {
      moveFromPendingToInProgress(f);
      await fetch(f.uploadUrl, {
        method: "PUT",
        body: f.file
      });
      moveFromInProgressToSucceeded(f);
    } catch {
      moveFromInProgressToFailed(f);
    }
  };
  const checkForFilesToUpload = () => {
    if (queue.current.succeeded.length === filesWithUploadUrls.length) {
      if (onSuccess) {
        setTimeout(() => onSuccess(), 500);
      }
      return;
    }
    if (queue.current.pending.length === 0 || queue.current.inProgress.length >= 2) {
      return;
    }
    uploadFile(queue.current.pending[0]);
  };
  (0, import_react24.useEffect)(() => {
    const interval = setInterval(checkForFilesToUpload, 1e3);
    return () => clearInterval(interval);
  }, [checkForFilesToUpload]);
  (0, import_react24.useEffect)(() => {
    const interval = setInterval(() => setTicker(ticker + 1), 1e3);
    return () => clearInterval(interval);
  }, [ticker]);
  const renderFileStatus = (file) => {
    if (queue.current.inProgress.includes(file)) {
      return /* @__PURE__ */ React.createElement(LoadingCircle_default, null);
    } else if (queue.current.failed.includes(file)) {
      return /* @__PURE__ */ React.createElement("i", {
        className: "material-icons text-red-600"
      }, "error");
    } else if (queue.current.succeeded.includes(file)) {
      return /* @__PURE__ */ React.createElement("i", {
        className: "material-icons text-teal-600"
      }, "check");
    } else {
      return /* @__PURE__ */ React.createElement("i", {
        className: "material-icons text-gray-500"
      }, "schedule");
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, /* @__PURE__ */ React.createElement("ul", {
    className: "flex flex-col",
    key: ticker
  }, filesWithUploadUrls.map((f, i) => /* @__PURE__ */ React.createElement("li", {
    className: "flex flex-row",
    key: i
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1"
  }, f.file.name), renderFileStatus(f)))));
};
var FileUploader_default = FileUploader;

// app/services/DateTime.ts
init_react();
var import_format = __toESM(require("date-fns/format"));
var import_isToday = __toESM(require("date-fns/isToday"));
var import_isYesterday = __toESM(require("date-fns/isYesterday"));
var formatSecondsAsDuration = (inputSeconds) => {
  const hours = Math.floor(inputSeconds / (60 * 60));
  const minutes = Math.floor((inputSeconds - hours * 60 * 60) / 60);
  const minutesAsTwoCharString = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const seconds = inputSeconds - hours * 60 * 60 - minutes * 60;
  const secondsAsTwoCharString = seconds < 10 ? `0${seconds}` : `${seconds}`;
  let output = `${minutes}:${secondsAsTwoCharString}`;
  if (hours > 0) {
    output = `${hours}:${minutesAsTwoCharString}:${secondsAsTwoCharString}`;
  }
  return output;
};
var formatDateYear = (date, shouldCapitalize = false) => {
  if (!date) {
    return "";
  }
  const dateObject = new Date(date);
  if ((0, import_isToday.default)(dateObject)) {
    return (0, import_format.default)(dateObject, `'${shouldCapitalize ? "T" : "t"}oday`);
  } else if ((0, import_isYesterday.default)(dateObject)) {
    return (0, import_format.default)(dateObject, `'${shouldCapitalize ? "Y" : "y"}esterday`);
  } else {
    return (0, import_format.default)(new Date(date), `LLLL d, y`);
  }
};
var formatDateYearTime = (date, shouldCapitalize = false) => {
  if (!date) {
    return "";
  }
  const dateObject = new Date(date);
  if ((0, import_isToday.default)(dateObject)) {
    return (0, import_format.default)(dateObject, `'${shouldCapitalize ? "T" : "t"}oday at' h:mm a`);
  } else if ((0, import_isYesterday.default)(dateObject)) {
    return (0, import_format.default)(dateObject, `'${shouldCapitalize ? "Y" : "y"}esterday at' h:mm a`);
  } else {
    return (0, import_format.default)(new Date(date), `LLLL d, y 'at' h:mm a`);
  }
};
var DateTimeService = {
  formatSecondsAsDuration,
  formatDateYear,
  formatDateYearTime
};
var DateTime_default = DateTimeService;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/[id]/upload.tsx
var SUBMISSION = import_client10.gql`
	query Submission($input: SubmissionInput!) {
		submission(input: $input) {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`;
var CREATE_PRESIGNED_FILE_UPLOAD_URLS = import_client10.gql`
	mutation CreatePresignedFileUploadUrls(
		$input: CreatePresignedFileUploadUrlsInput!
	) {
		createPresignedFileUploadUrls(input: $input) {
			filename
			presignedUploadUrl
		}
	}
`;
var SubmissionsViewByIdUpload = () => {
  const navigate = (0, import_react26.useNavigate)();
  const { id } = navigate.query;
  const submissionId = typeof id === "string" ? id : void 0;
  const { data, error } = (0, import_client10.useQuery)(SUBMISSION, {
    variables: { input: { id: submissionId } },
    skip: !submissionId
  });
  const [files, setFiles] = (0, import_react25.useState)([]);
  const [uploadQueue, setUploadQueue] = (0, import_react25.useState)();
  const [getPresignedUrls] = (0, import_client10.useMutation)(CREATE_PRESIGNED_FILE_UPLOAD_URLS);
  const onUploadClicked = async () => {
    if (!submissionId) {
      return;
    }
    try {
      const filenamesForUrls = files.map((f) => `${f.size}_${f.name}`);
      const response = await getPresignedUrls({
        variables: { input: { submissionId, filenames: filenamesForUrls } }
      });
      const uploadUrls = response.data.createPresignedFileUploadUrls;
      if (uploadUrls.length !== files.length) {
        throw new Error("Unexpected number of presigned upload URLs");
      }
      setUploadQueue(files.map((f, index) => ({
        file: f,
        uploadUrl: uploadUrls[index].presignedUploadUrl
      })));
    } catch {
      alert("Error uploading files. Please try again.");
    }
  };
  if (!data) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, error ? /* @__PURE__ */ React.createElement("div", {
      className: "text-red-600"
    }, error.graphQLErrors.map((e) => e.message).join(", ")) : /* @__PURE__ */ React.createElement(LoadingBlock_default, null)));
  }
  const onFilesSelected = (event) => {
    const updatedFiles = [...files];
    const selected = Array.from(event.target.files);
    for (const s of selected) {
      if (!updatedFiles.find((f) => f.name === s.name && f.size === s.size && f.lastModified === s.lastModified)) {
        updatedFiles.push(s);
      }
    }
    setFiles(updatedFiles);
  };
  const onRemove = (file) => {
    setFiles(files.filter((f) => {
      if (f.name === file.name && f.size === file.size && f.lastModified === file.lastModified) {
        return false;
      }
      return true;
    }));
  };
  const onUploadSuccess = () => {
    alert("Files uploaded successfully!");
    navigate("/account/submissions");
  };
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Account",
        href: "/account"
      },
      { label: "Submissions", href: "/account/submissions" },
      {
        label: DateTime_default.formatDateYearTime(data.submission.createdAt, true)
      },
      { label: "Upload Files" }
    ],
    className: "mb-6"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex-col"
  }, !uploadQueue ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("label", {
    htmlFor: "file-picker"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "btn-text mb-4 cursor-pointer"
  }, files.length === 0 ? "Choose Files" : "Choose More Files")), /* @__PURE__ */ React.createElement("input", {
    id: "file-picker",
    type: "file",
    multiple: true,
    onChange: onFilesSelected,
    style: { display: "none" }
  }), files.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("ul", {
    className: "mb-6"
  }, files.map((f, index) => /* @__PURE__ */ React.createElement("li", {
    key: index
  }, f.name, " ", /* @__PURE__ */ React.createElement("button", {
    className: "btn-text pl-2",
    onClick: () => onRemove(f)
  }, "Remove")))), /* @__PURE__ */ React.createElement("button", {
    className: "btn block",
    onClick: onUploadClicked
  }, "Upload ", files.length, " File", files.length === 1 ? "" : "s"))) : /* @__PURE__ */ React.createElement(FileUploader_default, {
    filesWithUploadUrls: uploadQueue,
    onSuccess: onUploadSuccess
  }))));
};
var upload_default = SubmissionsViewByIdUpload;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/verification-requests.tsx
var verification_requests_exports = {};
__export(verification_requests_exports, {
  default: () => verification_requests_default
});
init_react();
var import_react28 = require("react");
var import_react29 = require("@remix-run/react");
var import_client11 = __toESM(require_main());
var import_compareDesc = __toESM(require("date-fns/compareDesc"));

// app/components/RequireAdmin.tsx
init_react();
var import_react27 = require("@remix-run/react");
var RequireAdmin = ({ children }) => {
  const navigate = (0, import_react27.useNavigate)();
  const [currentUser, { data, error }] = useCurrentUser_default();
  if (currentUser && User_default.isAdmin(currentUser)) {
    return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
  } else if (!data && !error) {
    return /* @__PURE__ */ React.createElement("div", null, "Checking admin permissions...");
  } else if (typeof window !== "undefined") {
    navigate({
      pathname: "/login",
      query: { redirectTo: window.location.pathname }
    });
    return null;
  }
  return null;
};
var RequireAdmin_default = RequireAdmin;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/verification-requests.tsx
var VERIFICATION_REQUESTS = import_client11.gql`
	query VerificationRequests($input: VerificationRequestsInput!) {
		verificationRequests(input: $input) {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`;
var UPDATE_VERIFICATION_REQUEST_STATUS = import_client11.gql`
	mutation UpdateVerificationRequestStatus(
		$input: UpdateVerificationRequestStatusInput!
	) {
		updateVerificationRequestStatus(input: $input) {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`;
var VerificationRequests = () => {
  const [statusToFetch, setStatusToFetch] = (0, import_react28.useState)("Pending" /* Pending */);
  const onChangeStatusToFetch = (event) => {
    const updatedStatus = event.target.value;
    if (!updatedStatus) {
      setStatusToFetch(void 0);
    } else {
      setStatusToFetch(event.target.value);
    }
  };
  const {
    loading: verificationRequestsLoading,
    data: verificationRequestsData,
    error: verificationRequestsError
  } = (0, import_client11.useQuery)(VERIFICATION_REQUESTS, {
    variables: { input: { take: 200, skip: 0, status: statusToFetch } },
    fetchPolicy: "network-only"
  });
  const verificationRequests = (0, import_react28.useMemo)(() => {
    if (!(verificationRequestsData == null ? void 0 : verificationRequestsData.verificationRequests)) {
      return [];
    }
    const sortedVerificationRequests = [
      ...verificationRequestsData.verificationRequests
    ];
    sortedVerificationRequests.sort((a, b) => (0, import_compareDesc.default)(new Date(a.createdAt), new Date(b.createdAt)));
    return sortedVerificationRequests;
  }, [verificationRequestsData]);
  const [
    updateVerificationRequestStatus,
    {
      loading: updateVerificationRequestStatusLoading,
      error: updateVerificationRequestStatusError
    }
  ] = (0, import_client11.useMutation)(UPDATE_VERIFICATION_REQUEST_STATUS, { errorPolicy: "all" });
  const onApproveClicked = (id) => {
    updateVerificationRequestStatus({
      variables: { input: { id, status: "Approved" /* Approved */ } }
    });
  };
  const onDenyClicked = (id) => {
    updateVerificationRequestStatus({
      variables: { input: { id, status: "Denied" /* Denied */ } }
    });
  };
  (0, import_react28.useEffect)(() => {
    if (updateVerificationRequestStatusError) {
      window.alert("Error updating Verification Request status. Please reload the page and try again.");
    }
  }, [updateVerificationRequestStatusError]);
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Admin",
        href: "/admin"
      },
      { label: "Verification Requests" }
    ],
    className: "mb-6"
  }), /* @__PURE__ */ React.createElement("select", {
    className: "mb-6 flex max-w-xs",
    value: statusToFetch,
    onChange: onChangeStatusToFetch
  }, /* @__PURE__ */ React.createElement("option", {
    value: "Pending" /* Pending */
  }, "Pending"), /* @__PURE__ */ React.createElement("option", {
    value: "Approved" /* Approved */
  }, "Approved"), /* @__PURE__ */ React.createElement("option", {
    value: "Denied" /* Denied */
  }, "Denied"), /* @__PURE__ */ React.createElement("option", {
    value: ""
  }, "All")), verificationRequestsLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), verificationRequestsError && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, verificationRequestsError.graphQLErrors.map((error) => error.message).join(", ")), !verificationRequestsLoading && (verificationRequests == null ? void 0 : verificationRequests.map((verificationRequest, index) => {
    const {
      id,
      person,
      presignedImageDownloadUrl,
      createdAt,
      createdByUser,
      status
    } = verificationRequest;
    return /* @__PURE__ */ React.createElement("div", {
      className: "mb-4",
      key: index
    }, "Created ", DateTime_default.formatDateYearTime(createdAt), /* @__PURE__ */ React.createElement("br", null), "User", " ", /* @__PURE__ */ React.createElement(import_react29.Link, {
      to: `/users/${createdByUser.id}`
    }, /* @__PURE__ */ React.createElement("a", {
      target: "_blank"
    }, createdByUser.username)), " ", "is asking to be verified as Person", " ", /* @__PURE__ */ React.createElement(import_react29.Link, {
      to: Entity_default.makeHrefForView(person)
    }, /* @__PURE__ */ React.createElement("a", {
      target: "_blank"
    }, person.name)), /* @__PURE__ */ React.createElement("br", null), presignedImageDownloadUrl && /* @__PURE__ */ React.createElement(React.Fragment, null, "Proof:", " ", /* @__PURE__ */ React.createElement("a", {
      href: presignedImageDownloadUrl,
      target: "_blank"
    }, "Image"), /* @__PURE__ */ React.createElement("br", null)), "Email: ", createdByUser.email, /* @__PURE__ */ React.createElement("br", null), "Status: ", status, /* @__PURE__ */ React.createElement("br", null), isApprovedVerificationRequest(verificationRequest) && /* @__PURE__ */ React.createElement("button", {
      className: "btn-text",
      disabled: updateVerificationRequestStatusLoading,
      onClick: () => onDenyClicked(id)
    }, "Deny"), isDeniedVerificationRequest(verificationRequest) && /* @__PURE__ */ React.createElement("button", {
      className: "btn-text",
      disabled: updateVerificationRequestStatusLoading,
      onClick: () => onApproveClicked(id)
    }, "Approve"), isPendingVerificationRequest(verificationRequest) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
      className: "btn-text mr-4",
      disabled: updateVerificationRequestStatusLoading,
      onClick: () => onApproveClicked(id)
    }, "Approve"), /* @__PURE__ */ React.createElement("button", {
      className: "btn-text",
      disabled: updateVerificationRequestStatusLoading,
      onClick: () => onDenyClicked(id)
    }, "Deny")));
  })))));
};
var verification_requests_default = VerificationRequests;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/[slug].tsx
var slug_exports = {};
__export(slug_exports, {
  AUDIO_ITEM_QUERY: () => AUDIO_ITEM_QUERY2,
  default: () => slug_default
});
init_react();
var import_react57 = require("@remix-run/react");
var import_react58 = require("@remix-run/react");
var import_client25 = __toESM(require_main());

// app/components/AudioItem.tsx
init_react();

// app/components/AudioItemCard.tsx
init_react();
var import_react50 = require("react");
var import_react51 = require("@remix-run/react");
var import_react52 = require("@remix-run/react");

// app/components/Tags.tsx
init_react();
var import_react35 = require("react");
var import_react36 = require("@remix-run/react");

// app/services/Tag.ts
init_react();
var import_compareAsc = __toESM(require("date-fns/compareAsc"));
var import_compareDesc2 = __toESM(require("date-fns/compareDesc"));
var TagSortStrategy = /* @__PURE__ */ ((TagSortStrategy2) => {
  TagSortStrategy2["CreatedAtThenTimeMarker"] = "CREATED_AT_THEN_TIME_MARKER";
  TagSortStrategy2["CreatedAtDesc"] = "CREATED_AT_DESC";
  return TagSortStrategy2;
})(TagSortStrategy || {});
var sortByCreatedAtThenTimeMarker = (tags) => {
  const sortedTags = [...tags ?? []];
  sortedTags.sort((a, b) => {
    if (typeof a.subjectTimeMarkerSeconds !== "number" && typeof b.subjectTimeMarkerSeconds !== "number") {
      return (0, import_compareAsc.default)(new Date(a.createdAt), new Date(b.createdAt));
    }
    if (typeof a.subjectTimeMarkerSeconds !== "number" && typeof b.subjectTimeMarkerSeconds === "number") {
      return -1;
    }
    return a.subjectTimeMarkerSeconds - b.subjectTimeMarkerSeconds;
  });
  return sortedTags;
};
var sortByCreatedAtDesc = (tags) => {
  const sortedTags = [...tags ?? []];
  sortedTags.sort((a, b) => {
    return (0, import_compareDesc2.default)(new Date(a.createdAt), new Date(b.createdAt));
  });
  return sortedTags;
};
var sort = (tags = [], sortStrategy = "CREATED_AT_THEN_TIME_MARKER" /* CreatedAtThenTimeMarker */) => {
  switch (sortStrategy) {
    case "CREATED_AT_THEN_TIME_MARKER" /* CreatedAtThenTimeMarker */:
      return sortByCreatedAtThenTimeMarker(tags);
    case "CREATED_AT_DESC" /* CreatedAtDesc */:
      return sortByCreatedAtDesc(tags);
    default:
      return tags;
  }
};
var Tag_default = {
  TagSortStrategy,
  sort
};

// app/components/AddTagButton.tsx
init_react();
var import_react33 = require("react");
var import_client15 = __toESM(require_main());

// app/components/CreateTagForm.tsx
init_react();
var import_react32 = require("react");
var import_client14 = __toESM(require_main());

// app/hooks/useTags.ts
init_react();
var import_react30 = require("react");
var import_client12 = __toESM(require_main());
var TAGS_QUERY = import_client12.gql`
	query Tags($input: TagsInput!) {
		tags(input: $input) {
			...Tag
		}
	}
	${TagFragments.tag}
`;
var useTags = ({
  resultsPerPage = 10,
  queryOptions = {}
} = {}) => {
  var _a;
  const [getTags, tagsQuery] = (0, import_client12.useLazyQuery)(TAGS_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data, fetchMore } = tagsQuery;
  (0, import_react30.useEffect)(() => {
    getTags({
      variables: {
        input: {
          take: resultsPerPage
        }
      }
    });
  }, [getTags, resultsPerPage]);
  const tags = data == null ? void 0 : data.tags;
  const fetchNextPageOfTags = (0, import_react30.useCallback)(() => {
    fetchMore({
      variables: {
        input: {
          take: resultsPerPage,
          skip: tags.length ?? 0
        }
      }
    });
  }, [fetchMore, resultsPerPage, tags]);
  return {
    tags: (_a = tagsQuery.data) == null ? void 0 : _a.tags,
    getTags,
    tagsQuery,
    fetchNextPageOfTags
  };
};
var useTags_default = useTags;

// app/components/SelectRelationship.tsx
init_react();
var import_react31 = require("react");
var import_client13 = __toESM(require_main());
var SEARCH_RELATIONSHIPS_QUERY = import_client13.gql`
	query SearchRelationships(
		$subjectEntityType: String!
		$objectEntityType: String!
	) {
		searchRelationships(
			subjectEntityType: $subjectEntityType
			objectEntityType: $objectEntityType
		) {
			...Relationship
		}
	}
	${RelationshipFragments.relationship}
`;
var SelectRelationship = ({
  subjectEntity,
  objectEntity,
  onSelect
}) => {
  const [selectedRelationshipId, setSelectedRelationshipId] = (0, import_react31.useState)("");
  const { loading, data, error } = (0, import_client13.useQuery)(SEARCH_RELATIONSHIPS_QUERY, {
    variables: {
      subjectEntityType: subjectEntity.entityType,
      objectEntityType: objectEntity.entityType
    },
    fetchPolicy: "no-cache"
  });
  const relationshipOptions = (data == null ? void 0 : data.searchRelationships) ?? [];
  (0, import_react31.useEffect)(() => {
    if (relationshipOptions.length > 0) {
      onSelectRelationshipId(relationshipOptions[0].id);
    }
  }, [relationshipOptions]);
  const onSelectRelationshipId = (relationshipId) => {
    setSelectedRelationshipId(relationshipId);
    onSelect(relationshipId);
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2 text-gray-500"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-sm uppercase pr-2"
  }, subjectEntity.entityType), subjectEntity.name), loading ? /* @__PURE__ */ React.createElement(LoadingCircle_default, null) : /* @__PURE__ */ React.createElement("select", {
    className: "mb-2",
    value: selectedRelationshipId,
    onChange: (event) => onSelectRelationshipId(event.target.value)
  }, relationshipOptions.map((relationship, index) => /* @__PURE__ */ React.createElement("option", {
    value: relationship.id,
    key: index
  }, relationship.name))), /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-sm uppercase pr-2"
  }, objectEntity.entityType), objectEntity.name), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-4"
  }, error));
};
var SelectRelationship_default = SelectRelationship;

// app/components/TimestampInput.tsx
init_react();
var TimestampInput = ({ valueInSeconds, onChange, className }) => {
  const hrs = Math.floor(valueInSeconds / 3600);
  const mins = Math.floor((valueInSeconds - hrs * 3600) / 60);
  const secs = valueInSeconds - hrs * 3600 - mins * 60;
  const onChangeHrs = (event) => {
    const newHrs = parseInt(event.target.value, 10) || 0;
    const newValueInSeconds = newHrs * 3600 + mins * 60 + secs;
    onChange(newValueInSeconds);
  };
  const onChangeMins = (event) => {
    const newMins = parseInt(event.target.value, 10) || 0;
    const newValueInSeconds = hrs * 3600 + newMins * 60 + secs;
    onChange(newValueInSeconds);
  };
  const onChangeSecs = (event) => {
    const newSecs = parseInt(event.target.value, 10) || 0;
    const newValueInSeconds = hrs * 3600 + mins * 60 + newSecs;
    onChange(newValueInSeconds);
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-row items-center ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("input", {
    type: "number",
    id: "hrs",
    className: "flex max-w-[50px]",
    value: hrs || "",
    placeholder: "0",
    onChange: onChangeHrs
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "hours",
    className: "px-2"
  }, "hr", hrs !== 1 && "s"), /* @__PURE__ */ React.createElement("input", {
    type: "number",
    id: "mins",
    className: "flex max-w-[55px]",
    value: mins || "",
    placeholder: "0",
    onChange: onChangeMins
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "mins",
    className: "px-2"
  }, "min", mins !== 1 ? "s" : ""), /* @__PURE__ */ React.createElement("input", {
    type: "number",
    id: "secs",
    className: "flex max-w-[55px]",
    value: secs || "",
    placeholder: "0",
    onChange: onChangeSecs
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "secs",
    className: "px-2"
  }, "sec", secs !== 1 ? "s" : ""));
};
var TimestampInput_default = TimestampInput;

// app/components/CreateTagForm.tsx
var CREATE_TAG_MUTATION = import_client14.gql`
	mutation CreateTag($input: CreateTagInput!) {
		createTag(input: $input) {
			id
		}
	}
`;
var CreateTagForm = ({ entity, onSuccess }) => {
  const {
    activeAudioItem,
    playbackPositionSeconds,
    activeItemDurationSeconds
  } = usePlayerContext_default();
  const isActiveAudioItem = (activeAudioItem == null ? void 0 : activeAudioItem.id) === entity.id;
  const defaultTimeMarkerValue = isActiveAudioItem ? playbackPositionSeconds : void 0;
  const [shouldAddTimeMarker, setShouldAddTimeMarker] = (0, import_react32.useState)(false);
  const [timeMarkerValue, setTimeMarkerValue] = (0, import_react32.useState)(defaultTimeMarkerValue);
  const [selectedEntity, setSelectedEntity] = (0, import_react32.useState)(null);
  const [selectedRelationshipId, setSelectedRelationshipId] = (0, import_react32.useState)("");
  const [shouldCreateInverseRelationship, setShouldCreateInverseRelationship] = (0, import_react32.useState)(true);
  const [selectedInverseRelationshipId, setSelectedInverseRelationshipId] = (0, import_react32.useState)("");
  const [createTag, { data, error }] = (0, import_client14.useMutation)(CREATE_TAG_MUTATION, {
    errorPolicy: "all"
  });
  const [tagsAreCreating, setTagsAreCreating] = (0, import_react32.useState)(false);
  const [primaryCreatedTag, setPrimaryCreatedTag] = (0, import_react32.useState)(void 0);
  const [tagsAreCreated, setTagsAreCreated] = (0, import_react32.useState)(false);
  const {
    tagsQuery: { refetch: refetchTopLevelTags }
  } = useTags_default({
    queryOptions: { fetchPolicy: "network-only" }
  });
  (0, import_react32.useEffect)(() => {
    if (!tagsAreCreated) {
      return;
    }
    const onCreateSuccess = async (tag) => {
      if (refetchTopLevelTags) {
        await refetchTopLevelTags();
      }
      await onSuccess(tag);
    };
    if (primaryCreatedTag) {
      onCreateSuccess(primaryCreatedTag);
    }
  }, [data, refetchTopLevelTags, onSuccess, tagsAreCreated, primaryCreatedTag]);
  const onSelectEntity = (0, import_react32.useCallback)((selectedEntityFromResults) => {
    if (selectedEntityFromResults.id === entity.id) {
      return window.alert("Cannot tag an entity with itself");
    }
    setSelectedEntity(selectedEntityFromResults);
  }, [entity]);
  const onNewEntityCreated = (0, import_react32.useCallback)((entity2) => {
    setSelectedEntity(entity2);
  }, []);
  const onTimeMarkerValueChanged = (0, import_react32.useCallback)((newTimeMarkerValueSeconds) => {
    setShouldAddTimeMarker(true);
    if (newTimeMarkerValueSeconds >= activeItemDurationSeconds) {
      setTimeMarkerValue(activeItemDurationSeconds);
    } else if (newTimeMarkerValueSeconds <= 0) {
      setTimeMarkerValue(0);
    } else {
      setTimeMarkerValue(newTimeMarkerValueSeconds);
    }
  }, [activeItemDurationSeconds]);
  const onSelectRelationship = (0, import_react32.useCallback)((relationshipId) => {
    setSelectedRelationshipId(relationshipId);
  }, [setSelectedRelationshipId]);
  const onSelectInverseRelationship = (0, import_react32.useCallback)((relationshipId) => {
    setSelectedInverseRelationshipId(relationshipId);
  }, [setSelectedInverseRelationshipId]);
  const onCreateTagClicked = (0, import_react32.useCallback)(async () => {
    var _a;
    setTagsAreCreating(true);
    let subjectTimeMarkerSeconds;
    if (shouldAddTimeMarker && !isNaN(timeMarkerValue)) {
      subjectTimeMarkerSeconds = timeMarkerValue;
    }
    const tagInput = {
      relationshipId: selectedRelationshipId,
      subjectEntityType: entity.entityType,
      subjectEntityId: entity.id,
      objectEntityType: selectedEntity.entityType,
      objectEntityId: selectedEntity.id,
      subjectTimeMarkerSeconds
    };
    const primaryTagQuery = await createTag({ variables: { input: tagInput } });
    setPrimaryCreatedTag((_a = primaryTagQuery.data) == null ? void 0 : _a.createTag);
    if (shouldCreateInverseRelationship && selectedInverseRelationshipId) {
      const inverseTagInput = {
        relationshipId: selectedInverseRelationshipId,
        subjectEntityType: selectedEntity.entityType,
        subjectEntityId: selectedEntity.id,
        objectEntityType: entity.entityType,
        objectEntityId: entity.id,
        subjectTimeMarkerSeconds
      };
      await createTag({ variables: { input: inverseTagInput } });
    }
    setTagsAreCreating(false);
    setTagsAreCreated(true);
  }, [
    selectedRelationshipId,
    shouldCreateInverseRelationship,
    selectedInverseRelationshipId,
    entity,
    selectedEntity,
    createTag,
    shouldAddTimeMarker,
    timeMarkerValue
  ]);
  if (!selectedEntity) {
    return /* @__PURE__ */ React.createElement(SearchEntities_default, {
      onSelect: onSelectEntity,
      onNewEntityCreated
    });
  }
  const shouldShowTimeMarkerCheckbox = entity.entityType === "AudioItem" /* AudioItem */ && typeof defaultTimeMarkerValue !== "undefined";
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, "What is the relationship between these two entities?"), /* @__PURE__ */ React.createElement("div", {
    className: "mt-2"
  }, /* @__PURE__ */ React.createElement(SelectRelationship_default, {
    subjectEntity: entity,
    objectEntity: selectedEntity,
    onSelect: onSelectRelationship
  })), /* @__PURE__ */ React.createElement("div", {
    className: "mt-6 flex flex-row items-center justify-start"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "checkbox",
    id: "reverse-relationship",
    checked: shouldCreateInverseRelationship,
    onChange: (event) => setShouldCreateInverseRelationship(event.target.checked)
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "reverse-relationship",
    className: "ml-2"
  }, "Also create the inverse relationship")), shouldCreateInverseRelationship && /* @__PURE__ */ React.createElement("div", {
    className: "mt-2"
  }, /* @__PURE__ */ React.createElement(SelectRelationship_default, {
    subjectEntity: selectedEntity,
    objectEntity: entity,
    onSelect: onSelectInverseRelationship
  })), shouldShowTimeMarkerCheckbox && /* @__PURE__ */ React.createElement("div", {
    className: "mt-6 flex flex-row items-start justify-start"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "checkbox",
    id: "time-marker",
    className: "mt-1",
    checked: shouldAddTimeMarker,
    onChange: (event) => setShouldAddTimeMarker(event.target.checked)
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "time-marker",
    className: "ml-2"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col items-start"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "Mark this Tag at time:"), /* @__PURE__ */ React.createElement(TimestampInput_default, {
    valueInSeconds: timeMarkerValue,
    onChange: onTimeMarkerValueChanged
  })))), /* @__PURE__ */ React.createElement("button", {
    className: "btn mt-6",
    onClick: onCreateTagClicked,
    disabled: tagsAreCreating || !selectedRelationshipId
  }, "Save"), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-4"
  }, error.message));
};
var CreateTagForm_default = CreateTagForm;

// app/components/AddTagButton.tsx
var PARENT_ENTITY_QUERY = import_client15.gql`
	query Entity($id: String!) {
		entity(id: $id) {
			...AudioItem
			...Collection
			...Person
			...Place
			...Instrument
			...Tune
		}
	}
	${EntityFragments.audioItem}
	${EntityFragments.collection}
	${EntityFragments.instrument}
	${EntityFragments.person}
	${EntityFragments.place}
	${EntityFragments.tune}
`;
var AddTagButton = ({ entity, onSuccess, className, children }) => {
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [addTagModalIsVisible, setAddTagModalIsVisible] = (0, import_react33.useState)(false);
  const [getParentEntity, { loading: parentEntityLoading }] = (0, import_client15.useLazyQuery)(PARENT_ENTITY_QUERY, {
    variables: { id: entity.id },
    fetchPolicy: "network-only"
  });
  const onCreateTagSuccess = (0, import_react33.useCallback)(async (tag) => {
    await getParentEntity();
    setAddTagModalIsVisible(false);
    if (onSuccess) {
      onSuccess(tag);
    }
  }, [getParentEntity, setAddTagModalIsVisible, onSuccess]);
  const onAddTagClicked = (0, import_react33.useCallback)(async () => {
    if (!currentUser) {
      const redirectTo = Entity_default.makeHrefForView(entity);
      return await requireLogin({ redirectTo });
    }
    setAddTagModalIsVisible(true);
  }, [currentUser, requireLogin, entity]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: `btn-text whitespace-pre ${className ?? ""}`,
    onClick: onAddTagClicked
  }, children ?? "+ Add Tag"), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Add Tag",
    isVisible: addTagModalIsVisible,
    onClose: () => setAddTagModalIsVisible(false)
  }, parentEntityLoading ? /* @__PURE__ */ React.createElement(LoadingBlock_default, null) : /* @__PURE__ */ React.createElement(CreateTagForm_default, {
    entity,
    onSuccess: onCreateTagSuccess
  })));
};
var AddTagButton_default = AddTagButton;

// app/components/EditTagsButton.tsx
init_react();
var import_react34 = require("react");
var import_client16 = __toESM(require_main());
var PARENT_ENTITY_QUERY2 = import_client16.gql`
	query Entity($id: String!) {
		entity(id: $id) {
			...AudioItem
			...Collection
			...Person
			...Place
			...Instrument
			...Tune
		}
	}
	${EntityFragments.audioItem}
	${EntityFragments.collection}
	${EntityFragments.instrument}
	${EntityFragments.person}
	${EntityFragments.place}
	${EntityFragments.tune}
`;
var DELETE_TAG_MUTATION = import_client16.gql`
	mutation DeleteTag($id: String!) {
		deleteTag(id: $id)
	}
`;
var EditTagsButton = ({ entity, className, children, onSuccess }) => {
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [editTagsModalIsVisible, setEditTagsModalIsVisible] = (0, import_react34.useState)(false);
  const [getParentEntity, { loading: parentEntityLoading }] = (0, import_client16.useLazyQuery)(PARENT_ENTITY_QUERY2, {
    variables: { id: entity.id },
    fetchPolicy: "network-only"
  });
  const [deleteTag, { loading: deleteTagLoading, data: deleteTagData }] = (0, import_client16.useMutation)(DELETE_TAG_MUTATION, { errorPolicy: "all" });
  const {
    tagsQuery: { refetch: refetchTopLevelTags }
  } = useTags_default();
  const onDeleteTag = (0, import_react34.useCallback)(async (id) => {
    if (!currentUser) {
      return await requireLogin();
    }
    if (window.confirm("Are you sure you want to delete this Tag?")) {
      deleteTag({ variables: { id } });
    }
  }, [deleteTag, currentUser, requireLogin]);
  (0, import_react34.useEffect)(() => {
    const onDeleteSuccess = async () => {
      await Promise.all([refetchTopLevelTags(), getParentEntity()]);
      setEditTagsModalIsVisible(false);
    };
    if (deleteTagData == null ? void 0 : deleteTagData.deleteTag) {
      onDeleteSuccess();
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [
    deleteTagData,
    getParentEntity,
    setEditTagsModalIsVisible,
    refetchTopLevelTags,
    onSuccess
  ]);
  const { tags } = entity;
  const sortedTags = (0, import_react34.useMemo)(() => {
    if (!Array.isArray(tags)) {
      return [];
    }
    return Tag_default.sort(tags);
  }, [tags]);
  if (!sortedTags || sortedTags.length === 0) {
    return null;
  }
  const isLoading = parentEntityLoading || deleteTagLoading;
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: `btn-text whitespace-pre ${className ?? ""}`,
    onClick: () => setEditTagsModalIsVisible(true)
  }, children ?? "Edit Tags"), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Edit Tags",
    isVisible: editTagsModalIsVisible,
    onClose: () => setEditTagsModalIsVisible(false)
  }, isLoading ? /* @__PURE__ */ React.createElement(LoadingBlock_default, null) : sortedTags.map((tag, index) => {
    const { id, relationship, objectEntity, subjectTimeMarkerSeconds } = tag;
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-row items-start justify-start",
      key: index
    }, /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-col flex-1 justify-start align-start mb-4 pr-4"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "italic text-gray-500"
    }, relationship.name), /* @__PURE__ */ React.createElement("div", {
      className: "uppercase text-sm text-gray-500 pr-2"
    }, objectEntity.entityType), objectEntity.name, typeof subjectTimeMarkerSeconds === "number" && /* @__PURE__ */ React.createElement("span", {
      className: "italic text-gray-500"
    }, `at ${DateTime_default.formatSecondsAsDuration(subjectTimeMarkerSeconds)}`)), /* @__PURE__ */ React.createElement("button", {
      className: "btn-text",
      onClick: () => onDeleteTag(id)
    }, "Delete Tag"));
  })));
};
var EditTagsButton_default = EditTagsButton;

// app/components/Tags.tsx
var TagLink = ({ tag }) => {
  const [tooltipIsVisible, setTooltipIsVisible] = (0, import_react35.useState)(false);
  const [timeoutFunc, setTimeoutFunc] = (0, import_react35.useState)();
  const onMouseEnter = (0, import_react35.useCallback)(() => {
    setTimeoutFunc(setTimeout(() => setTooltipIsVisible(true), 400));
  }, []);
  const onMouseLeave = (0, import_react35.useCallback)(() => {
    if (timeoutFunc) {
      clearTimeout(timeoutFunc);
      setTimeoutFunc(void 0);
    }
    setTooltipIsVisible(false);
  }, [timeoutFunc]);
  (0, import_react35.useEffect)(() => {
    return () => {
      if (timeoutFunc) {
        clearTimeout(timeoutFunc);
        setTimeoutFunc(void 0);
      }
    };
  }, [timeoutFunc]);
  const { objectEntity, relationship } = tag;
  const href = Entity_default.makeHrefForView(objectEntity);
  return /* @__PURE__ */ React.createElement(import_react36.Link, {
    to: href
  }, /* @__PURE__ */ React.createElement("a", {
    className: "relative block p-1 px-2 mb-2 no-underline border border-teal-600 rounded hover:border-teal-800",
    onMouseEnter,
    onMouseLeave
  }, objectEntity.name, /* @__PURE__ */ React.createElement("div", {
    className: `${tooltipIsVisible ? "flex" : "hidden"} absolute -top-8 left-0 text-center px-2 py-1 text-sm whitespace-nowrap bg-gray-700 rounded text-white`
  }, relationship.name, " ", objectEntity.entityType.toUpperCase())));
};
var Tags = ({ entity }) => {
  const { tags } = entity;
  const sortedTags = (0, import_react35.useMemo)(() => {
    if (!Array.isArray(tags)) {
      return [];
    }
    const tagsWithoutTimeMarkers = tags.filter((tag) => typeof tag.subjectTimeMarkerSeconds !== "number");
    return Tag_default.sort(tagsWithoutTimeMarkers);
  }, [tags]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center flex-wrap"
  }, sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement("div", {
    className: "mr-2",
    key: index
  }, /* @__PURE__ */ React.createElement(TagLink, {
    tag
  }))), /* @__PURE__ */ React.createElement("div", {
    className: (tags == null ? void 0 : tags.length) > 0 ? "mb-2 ml-1" : void 0
  }, /* @__PURE__ */ React.createElement(AddTagButton_default, {
    entity
  })), (tags == null ? void 0 : tags.length) > 0 && /* @__PURE__ */ React.createElement("div", {
    className: "flex ml-1 mb-2"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 mr-1"
  }, "/"), /* @__PURE__ */ React.createElement(EditTagsButton_default, {
    entity
  })));
};
var Tags_default = Tags;

// app/components/Menu.tsx
init_react();
var import_react37 = __toESM(require("react"));
var Menu = ({ children }) => {
  const containerRef = (0, import_react37.useRef)();
  const [shouldOpenLeft, setShouldOpenLeft] = (0, import_react37.useState)(true);
  const [isOpen, setIsOpen] = (0, import_react37.useState)(false);
  (0, import_react37.useEffect)(() => {
    const container = containerRef.current;
    if (container) {
      const { x } = container.getBoundingClientRect();
      if (x < 200) {
        setShouldOpenLeft(false);
      }
    }
  }, []);
  const onIconClicked = (0, import_react37.useCallback)((event) => {
    event.stopPropagation();
    setIsOpen(true);
  }, []);
  const onBackgroundClicked = (0, import_react37.useCallback)((event) => {
    event.stopPropagation();
    setIsOpen(false);
  }, []);
  const childrenAsArray = Array.isArray(children) ? children : [children];
  if (!children) {
    return null;
  }
  return /* @__PURE__ */ import_react37.default.createElement("div", {
    className: "relative",
    ref: containerRef
  }, /* @__PURE__ */ import_react37.default.createElement("button", {
    className: "btn-secondary",
    onClick: onIconClicked,
    "aria-label": isOpen ? "Close Menu" : "Show Menu"
  }, /* @__PURE__ */ import_react37.default.createElement("i", {
    className: "material-icons"
  }, "expand_more")), isOpen && /* @__PURE__ */ import_react37.default.createElement(import_react37.default.Fragment, null, /* @__PURE__ */ import_react37.default.createElement("div", {
    className: "fixed top-0 right-0 bottom-0 left-0",
    onClick: onBackgroundClicked
  }), /* @__PURE__ */ import_react37.default.createElement("ul", {
    className: `absolute top-9 ${shouldOpenLeft ? "right-0 text-right" : "left-0 text-left"} flex flex-col bg-white rounded shadow-xl`
  }, childrenAsArray.map((child, index) => /* @__PURE__ */ import_react37.default.createElement("li", {
    className: `cursor-pointer first:rounded-t last:rounded-b text-sm text-gray-500 font-bold whitespace-nowrap hover:bg-gray-200 ${index === 0 ? "hover:rounded-t" : ""} ${index === childrenAsArray.length - 1 ? "hover:rounded-b" : ""}`,
    key: index
  }, child)))));
};
var Menu_default = Menu;

// app/components/SaveItemButton.tsx
init_react();
var import_react40 = require("react");
var import_react41 = require("@remix-run/react");
var import_client19 = __toESM(require_main());

// app/hooks/useAudioItem.ts
init_react();
var import_react38 = require("react");
var import_client17 = __toESM(require_main());
var AUDIO_ITEM_QUERY = import_client17.gql`
	query AudioItem($slug: String!) {
		audioItem(slug: $slug) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var useAudioItem = ({
  slug,
  queryOptions = {},
  skip = false
} = {}) => {
  const [getAudioItem, audioItemQuery] = (0, import_client17.useLazyQuery)(AUDIO_ITEM_QUERY, queryOptions);
  const { data } = audioItemQuery;
  (0, import_react38.useEffect)(() => {
    if (skip) {
      return;
    }
    if (slug) {
      getAudioItem({
        variables: {
          slug
        }
      });
    }
  }, [getAudioItem, slug, skip]);
  const audioItem = data == null ? void 0 : data.audioItem;
  return [audioItem, audioItemQuery];
};
var useAudioItem_default = useAudioItem;

// app/hooks/useSavedItemsForUser.ts
init_react();
var import_react39 = require("react");
var import_client18 = __toESM(require_main());
var SAVED_ITEMS_FOR_USER_QUERY = import_client18.gql`
	query SavedItemsForUser {
		savedItemsForUser {
			...SavedItem
		}
	}
	${SavedItemFragments.savedItem}
`;
var useSavedItemsForUser = () => {
  var _a;
  const [currentUser] = useCurrentUser_default();
  const [makeQuery, query] = (0, import_client18.useLazyQuery)(SAVED_ITEMS_FOR_USER_QUERY, { fetchPolicy: "cache-first" });
  (0, import_react39.useEffect)(() => {
    if (currentUser) {
      makeQuery();
    }
  }, [makeQuery, currentUser]);
  const savedItemsForUser = (_a = query.data) == null ? void 0 : _a.savedItemsForUser;
  return [savedItemsForUser, query];
};
var useSavedItemsForUser_default = useSavedItemsForUser;

// app/components/SaveItemButton.tsx
var CREATE_SAVED_ITEM_MUTATION = import_client19.gql`
	mutation CreateSavedItem($input: CreateSavedItemInput!) {
		createSavedItem(input: $input) {
			id
		}
	}
`;
var DELETE_SAVED_ITEM_MUTATION = import_client19.gql`
	mutation DeleteSavedItem($input: DeleteSavedItemInput!) {
		deleteSavedItem(input: $input)
	}
`;
var SaveItemButton = ({ audioItem }) => {
  const { id, slug, isSavedByUser } = audioItem;
  const navigate = (0, import_react41.useNavigate)();
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [refetchAudioItem] = (0, import_client19.useLazyQuery)(AUDIO_ITEM_QUERY, {
    fetchPolicy: "network-only"
  });
  const [, { refetch: refetchSavedItemsForUser }] = useSavedItemsForUser_default();
  const [
    createSavedItem,
    { loading: createLoading, data: createData, error: createError }
  ] = (0, import_client19.useMutation)(CREATE_SAVED_ITEM_MUTATION, { errorPolicy: "all" });
  const [
    deleteSavedItem,
    { loading: deleteLoading, data: deleteData, error: deleteError }
  ] = (0, import_client19.useMutation)(DELETE_SAVED_ITEM_MUTATION, { errorPolicy: "all" });
  const onButtonClicked = (0, import_react40.useCallback)(async () => {
    if (!currentUser) {
      const redirectTo = Entity_default.makeHrefForView(audioItem);
      return await requireLogin({ redirectTo });
    } else if (!isSavedByUser) {
      createSavedItem({
        variables: {
          input: { audioItemId: id }
        }
      });
    } else if (isSavedByUser) {
      deleteSavedItem({
        variables: {
          input: { audioItemId: id }
        }
      });
    }
  }, [currentUser, navigate, audioItem, id, createSavedItem, deleteSavedItem]);
  (0, import_react40.useEffect)(() => {
    const refetch = async () => {
      await refetchAudioItem({ variables: { slug } });
      refetchSavedItemsForUser();
    };
    if (createData) {
      refetch();
    }
  }, [createData, refetchAudioItem, refetchSavedItemsForUser, slug]);
  (0, import_react40.useEffect)(() => {
    if (createError) {
      window.alert("Error saving item. Please try again.");
    }
  }, [createError]);
  (0, import_react40.useEffect)(() => {
    const refetch = async () => {
      await refetchAudioItem({ variables: { slug } });
      refetchSavedItemsForUser();
    };
    if (deleteData) {
      refetch();
    }
  }, [deleteData, refetchAudioItem, refetchSavedItemsForUser, slug]);
  (0, import_react40.useEffect)(() => {
    if (deleteError) {
      window.alert("Error removing saved item. Please try again.");
    }
  }, [deleteError]);
  return /* @__PURE__ */ React.createElement("button", {
    className: `btn-secondary ${isSavedByUser ? "btn-secondary-active" : ""} pl-0.5`,
    onClick: onButtonClicked,
    disabled: createLoading || deleteLoading,
    "aria-label": isSavedByUser ? "Unsave" : "Save"
  }, isSavedByUser ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "bookmark"), "Saved") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "bookmark_border"), "Save"));
};
var SaveItemButton_default = SaveItemButton;

// app/components/ViewCommentsButton.tsx
init_react();
var import_react44 = require("react");
var import_react45 = require("@remix-run/react");
var import_client22 = __toESM(require_main());

// app/components/CreateCommentForm.tsx
init_react();
var import_react43 = require("react");
var import_client21 = __toESM(require_main());

// app/hooks/useComments.ts
init_react();
var import_react42 = require("react");
var import_client20 = __toESM(require_main());
var COMMENTS_QUERY = import_client20.gql`
	query Comments($input: CommentsInput!) {
		comments(input: $input) {
			...Comment
		}
	}
	${CommentFragments.comment}
`;
var useComments = ({
  resultsPerPage = 10,
  queryOptions = {}
} = {}) => {
  var _a;
  const [getComments, commentsQuery] = (0, import_client20.useLazyQuery)(COMMENTS_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data, fetchMore } = commentsQuery;
  (0, import_react42.useEffect)(() => {
    getComments({
      variables: {
        input: {
          take: resultsPerPage
        }
      }
    });
  }, [getComments, resultsPerPage]);
  const comments = data == null ? void 0 : data.comments;
  const fetchNextPageOfComments = (0, import_react42.useCallback)(() => {
    fetchMore({
      variables: {
        input: {
          take: resultsPerPage,
          skip: comments.length ?? 0
        }
      }
    });
  }, [fetchMore, resultsPerPage, comments]);
  return {
    comments: (_a = commentsQuery.data) == null ? void 0 : _a.comments,
    getComments,
    commentsQuery,
    fetchNextPageOfComments
  };
};
var useComments_default = useComments;

// app/components/CreateCommentForm.tsx
var CREATE_COMMENT_MUTATION = import_client21.gql`
	mutation CreateComment($input: CreateCommentInput!) {
		createComment(input: $input) {
			...CommentWithoutParentEntity
		}
	}
	${CommentFragments.commentWithoutParentEntity}
`;
var CreateCommentForm = ({ parentEntity, onSuccess }) => {
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [text, setText] = (0, import_react43.useState)("");
  const [createComment, { loading, data, error }] = (0, import_client21.useMutation)(CREATE_COMMENT_MUTATION, { errorPolicy: "all" });
  const {
    commentsQuery: { refetch: refetchTopLevelComments }
  } = useComments_default();
  const onSubmit = (0, import_react43.useCallback)(async (event) => {
    event.preventDefault();
    if (!currentUser) {
      const redirectTo = Entity_default.makeHrefForView(parentEntity);
      return await requireLogin({ redirectTo });
    }
    let parentAudioItemId;
    if (isAudioItem(parentEntity)) {
      parentAudioItemId = parentEntity.id;
    }
    const input = { parentAudioItemId, text };
    createComment({ variables: { input } });
  }, [createComment, parentEntity, text]);
  (0, import_react43.useEffect)(() => {
    if (data == null ? void 0 : data.createComment) {
      setText("");
      if (onSuccess) {
        onSuccess(data.createComment);
      }
      refetchTopLevelComments();
    }
  }, [data, refetchTopLevelComments]);
  return /* @__PURE__ */ React.createElement("form", {
    onSubmit,
    className: "w-full"
  }, /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Add a comment...",
    autoFocus: true,
    value: text,
    rows: 3,
    onChange: (event) => setText(event.target.value)
  }), text.length > 0 && /* @__PURE__ */ React.createElement("input", {
    className: "btn mt-3 w-auto",
    type: "submit",
    disabled: loading,
    value: "Add Comment"
  }), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-3"
  }, error.message));
};
var CreateCommentForm_default = CreateCommentForm;

// app/components/ViewCommentsButton.tsx
var COMMENTS_FOR_PARENT_ENTITY_QUERY = import_client22.gql`
	query CommentsForParentEntity($input: CommentsForParentEntityInput!) {
		commentsForParentEntity(input: $input) {
			...CommentWithoutParentEntity
		}
	}
	${CommentFragments.commentWithoutParentEntity}
`;
var ViewCommentsButton = ({ audioItem }) => {
  const { id, slug, entityType, commentsCount } = audioItem;
  const commentsRef = (0, import_react44.useRef)();
  const [modalIsVisible, setModalIsVisible] = (0, import_react44.useState)(false);
  const [, { refetch: refetchParentAudioItem }] = useAudioItem_default({
    slug,
    queryOptions: { fetchPolicy: "cache-only" }
  });
  const [getCommentsForParentEntity, { loading, data, error }] = (0, import_client22.useLazyQuery)(COMMENTS_FOR_PARENT_ENTITY_QUERY, {
    fetchPolicy: "cache-and-network"
  });
  const comments = (data == null ? void 0 : data.commentsForParentEntity) ?? [];
  const fetchCommentsForParent = (0, import_react44.useCallback)(async () => {
    await getCommentsForParentEntity({
      variables: {
        input: { parentEntityType: entityType, parentEntityId: id }
      }
    });
  }, [getCommentsForParentEntity, entityType, id]);
  const onViewCommentsButtonClicked = (0, import_react44.useCallback)(async () => {
    setModalIsVisible(true);
    await fetchCommentsForParent();
  }, [fetchCommentsForParent, commentsCount, comments]);
  const onCreateCommentSuccess = (0, import_react44.useCallback)(async () => {
    await Promise.allSettled([
      fetchCommentsForParent(),
      refetchParentAudioItem({ slug })
    ]);
  }, [fetchCommentsForParent, refetchParentAudioItem]);
  const onCloseModal = (0, import_react44.useCallback)(() => setModalIsVisible(false), []);
  (0, import_react44.useEffect)(() => {
    var _a;
    if (!commentsRef.current) {
      return;
    }
    const commentsHeight = ((_a = commentsRef.current) == null ? void 0 : _a.scrollHeight) ?? 0;
    if (modalIsVisible && commentsHeight > 0 && comments.length > 0) {
      commentsRef.current.scrollTo({
        top: commentsHeight,
        behavior: "smooth"
      });
    }
  }, [comments, modalIsVisible]);
  const modalTitle = commentsCount > 0 ? `${commentsCount} Comment${commentsCount === 1 ? "" : "s"}` : "No Comments";
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
    className: "btn-secondary",
    onClick: onViewCommentsButtonClicked,
    "aria-label": "View Comments"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons mr-0.5"
  }, "chat_bubble_outline"), commentsCount > 0 ? /* @__PURE__ */ React.createElement(React.Fragment, null, commentsCount, /* @__PURE__ */ React.createElement("span", {
    className: "hidden md:block md:pl-1"
  }, "Comment", commentsCount === 1 ? "" : "s")) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
    className: "md:hidden"
  }, "0"), /* @__PURE__ */ React.createElement("span", {
    className: "hidden md:block"
  }, "No Comments"))), /* @__PURE__ */ React.createElement(Modal_default, {
    title: modalTitle,
    isVisible: modalIsVisible,
    onClose: onCloseModal
  }, error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-2"
  }, error.message), comments.length > 0 && /* @__PURE__ */ React.createElement("div", {
    className: "max-h-1/2 overflow-auto",
    ref: commentsRef
  }, comments.map(({ createdByUser, createdAt, text }, index) => /* @__PURE__ */ React.createElement("div", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500 text-sm mb-1 flex flex-row items-center"
  }, /* @__PURE__ */ React.createElement(import_react45.Link, {
    to: `/users/${createdByUser.id}`
  }, /* @__PURE__ */ React.createElement("a", {
    className: "mr-1 flex flex-row items-center"
  }, createdByUser.verifiedPerson && /* @__PURE__ */ React.createElement("div", {
    className: "inline"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm mr-1"
  }, "verified")), /* @__PURE__ */ React.createElement("span", null, createdByUser.username))), " ", DateTime_default.formatDateYearTime(createdAt)), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm whitespace-pre-line text-gray-900"
  }, text)))), loading && /* @__PURE__ */ React.createElement(LoadingCircle_default, null), /* @__PURE__ */ React.createElement("div", {
    className: "mt-4"
  }, /* @__PURE__ */ React.createElement(CreateCommentForm_default, {
    parentEntity: audioItem,
    onSuccess: onCreateCommentSuccess
  }))));
};
var ViewCommentsButton_default = ViewCommentsButton;

// app/components/TimeMarkers.tsx
init_react();
var import_react46 = require("react");
var import_react47 = require("@remix-run/react");
var TimeMarkers = ({ audioItem }) => {
  const { tags } = audioItem;
  const {
    activeAudioItem,
    setActiveAudioItem,
    playbackPositionSeconds,
    setSeekPositionSeconds
  } = usePlayerContext_default();
  const timeMarkersWithTags = (0, import_react46.useMemo)(() => {
    const output = {};
    if (!tags) {
      return output;
    }
    const filteredTags = tags.filter((tag) => typeof tag.subjectTimeMarkerSeconds === "number");
    filteredTags.sort((a, b) => a.subjectTimeMarkerSeconds - b.subjectTimeMarkerSeconds);
    filteredTags.forEach((tag) => {
      const existingTagsAtTimeMarker = output[tag.subjectTimeMarkerSeconds] ?? [];
      output[tag.subjectTimeMarkerSeconds] = [...existingTagsAtTimeMarker, tag];
    });
    return output;
  }, [tags]);
  const onTimeMarkerClicked = (0, import_react46.useCallback)((event, timeMarker) => {
    if (event.target.id === "time-marker-tag-link") {
      event.stopPropagation();
      return;
    }
    if ((activeAudioItem == null ? void 0 : activeAudioItem.id) !== audioItem.id) {
      setActiveAudioItem(audioItem);
    }
    setSeekPositionSeconds(parseInt(timeMarker));
  }, [audioItem, activeAudioItem]);
  const audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id;
  const activeTimeMarker = (0, import_react46.useMemo)(() => {
    if (!audioItemIsInPlayer) {
      return void 0;
    }
    let result;
    Object.keys(timeMarkersWithTags).forEach((timeMarker) => {
      if (parseInt(timeMarker) <= playbackPositionSeconds) {
        result = timeMarker;
      }
    });
    return result;
  }, [audioItemIsInPlayer, timeMarkersWithTags, playbackPositionSeconds]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, Object.entries(timeMarkersWithTags).map(([timeMarker, tagsAtTimeMarker], index) => {
    const isActive = activeTimeMarker === timeMarker;
    return /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-row items-start md:items-center justify-start mb-2 last:mb-1 text-sm",
      key: index
    }, /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-row w-16 flex-shrink-0"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "w-3 text-left"
    }, isActive && ">"), /* @__PURE__ */ React.createElement("button", {
      className: "btn-text underline hover:underline",
      onClick: (event) => onTimeMarkerClicked(event, timeMarker)
    }, DateTime_default.formatSecondsAsDuration(parseInt(timeMarker)))), /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-col md:flex-row"
    }, tagsAtTimeMarker.map((tag, index2) => /* @__PURE__ */ React.createElement("span", {
      className: "flex flex-row items-center",
      key: index2
    }, /* @__PURE__ */ React.createElement(import_react47.Link, {
      to: Entity_default.makeHrefForView(tag.objectEntity)
    }, /* @__PURE__ */ React.createElement("a", {
      id: "time-marker-tag-link"
    }, tag.objectEntity.name, tag.objectEntity.entityType === "Tune" /* Tune */ ? ` (${tag.objectEntity.type})` : "")), index2 !== tagsAtTimeMarker.length - 1 && /* @__PURE__ */ React.createElement("span", {
      className: "hidden md:block mr-1"
    }, ",")))));
  }));
};
var TimeMarkers_default = TimeMarkers;

// app/components/RequestTakedownButton.tsx
init_react();
var import_react49 = require("react");
var import_client24 = __toESM(require_main());

// app/components/CreateTakedownRequestForm.tsx
init_react();
var import_react48 = require("react");
var import_client23 = __toESM(require_main());
var CREATE_TAKEDOWN_REQUEST = import_client23.gql`
	mutation CreateTakedownRequest($input: CreateTakedownRequestInput!) {
		createTakedownRequest(input: $input) {
			...TakedownRequestWithoutEntity
		}
	}
	${TakedownRequestFragments.takedownRequestWithoutEntity}
`;
var CreateTakedownRequestForm = ({ entity, onSuccess }) => {
  const defaultType = Object.keys(TakedownRequestType)[0];
  const [type, setType] = (0, import_react48.useState)(defaultType);
  const [message, setMessage] = (0, import_react48.useState)("");
  const [validationError, setValidationError] = (0, import_react48.useState)("");
  const [createTakedownRequest, { loading, data, error }] = (0, import_client23.useMutation)(CREATE_TAKEDOWN_REQUEST, { errorPolicy: "all" });
  const getLabelForType = (type2) => {
    switch (TakedownRequestType[type2]) {
      case "Performer" /* Performer */:
        return "I'm a performer in it";
      case "Copyright" /* Copyright */:
        return "I own the copyright";
      default:
        return type2;
    }
  };
  const onSubmitForm = (0, import_react48.useCallback)((event) => {
    event.preventDefault();
    setValidationError("");
    if (!message) {
      return setValidationError("Please include details about your request");
    }
    const input = {
      entityType: entity.entityType,
      entityId: entity.id,
      type,
      message
    };
    try {
      createTakedownRequest({
        variables: {
          input
        }
      });
    } catch {
    }
  }, [message, entity, type, createTakedownRequest]);
  (0, import_react48.useEffect)(() => {
    var _a;
    if (((_a = data == null ? void 0 : data.createTakedownRequest) == null ? void 0 : _a.id) && onSuccess) {
      onSuccess(data.createTakedownRequest);
    }
  }, [data, onSuccess]);
  return /* @__PURE__ */ React.createElement("form", {
    className: "flex flex-col items-start",
    onSubmit: onSubmitForm
  }, /* @__PURE__ */ React.createElement("label", {
    htmlFor: "select-type",
    className: "mb-2"
  }, "Why are you requesting a takedown for this ", entity.entityType, "?"), /* @__PURE__ */ React.createElement("select", {
    id: "select-type",
    className: "mb-4",
    value: type,
    onChange: (event) => setType(event.target.value)
  }, Object.keys(TakedownRequestType).map((type2, index) => /* @__PURE__ */ React.createElement("option", {
    value: type2,
    key: index
  }, getLabelForType(type2)))), /* @__PURE__ */ React.createElement("textarea", {
    className: "mb-4",
    placeholder: "Please include as many details as you can...",
    value: message,
    onChange: (event) => setMessage(event.target.value),
    rows: 4
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    value: "Submit",
    disabled: loading
  }), validationError && /* @__PURE__ */ React.createElement("div", {
    className: "mt-4 text-red-600"
  }, validationError), error && /* @__PURE__ */ React.createElement("div", {
    className: "mt-4 text-red-600"
  }, "Error submitting Takedown Request. Please reload the page and try again."));
};
var CreateTakedownRequestForm_default = CreateTakedownRequestForm;

// app/components/RequestTakedownButton.tsx
var TAKEDOWN_REQUESTS_FOR_ENTITY = import_client24.gql`
	query TakedownRequestsForEntity($input: TakedownRequestsForEntityInput!) {
		takedownRequestsForEntity(input: $input) {
			...TakedownRequestWithoutEntity
		}
	}
	${TakedownRequestFragments.takedownRequestWithoutEntity}
`;
var RequestTakedownButton = ({ entity, onTakedownRequestCreated }) => {
  const { currentUser, requireLogin } = useRequireLogin_default();
  const [modalIsVisible, setModalIsVisible] = (0, import_react49.useState)(false);
  const closeModal = (0, import_react49.useCallback)(() => setModalIsVisible(false), []);
  const { loading, data, error, refetch } = (0, import_client24.useQuery)(TAKEDOWN_REQUESTS_FOR_ENTITY, {
    variables: {
      input: {
        entityType: entity.entityType,
        entityId: entity.id
      }
    },
    skip: !modalIsVisible
  });
  const takedownRequests = (data == null ? void 0 : data.takedownRequestsForEntity) ?? [];
  const onButtonClicked = (0, import_react49.useCallback)(async () => {
    if (!currentUser) {
      const redirectTo = Entity_default.makeHrefForView(entity);
      await requireLogin({ redirectTo });
    } else {
      setModalIsVisible(true);
    }
  }, [currentUser, entity, requireLogin]);
  const onSuccess = (0, import_react49.useCallback)(async (takedownRequest) => {
    try {
      await refetch();
      if (onTakedownRequestCreated) {
        await onTakedownRequestCreated(takedownRequest);
      }
    } catch {
    }
  }, [refetch, onTakedownRequestCreated]);
  const modalContent = (0, import_react49.useMemo)(() => {
    const pendingTakedown = takedownRequests.find(isPendingTakedownRequest);
    const approvedTakedown = takedownRequests.find(isApprovedTakedownRequest);
    if (loading) {
      return /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
    } else if (error) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "text-red-600"
      }, "Error fetching Takedown Request data");
    } else if (approvedTakedown) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "text-gray-500"
      }, "This ", entity.entityType, " has an ", /* @__PURE__ */ React.createElement("strong", null, "approved"), " ", approvedTakedown.type, " Takedown Request last updated", " ", DateTime_default.formatDateYearTime(approvedTakedown.updatedAt));
    } else if (pendingTakedown) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "text-gray-500"
      }, "This ", entity.entityType, " has a ", /* @__PURE__ */ React.createElement("strong", null, "pending"), " ", pendingTakedown.type, " Takedown Request last updated", " ", DateTime_default.formatDateYearTime(pendingTakedown.updatedAt));
    }
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
      className: "text-gray-500 mb-5"
    }, "We exist as a community resource, and as such we place the foremost importance on performers' rights and copyright. You can request a takedown using this form. We will be in touch to verify details."), /* @__PURE__ */ React.createElement(CreateTakedownRequestForm_default, {
      entity,
      onSuccess
    }));
  }, [loading, error, takedownRequests, refetch, entity]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
    className: "rounded flex flex-row items-center p-2",
    onClick: onButtonClicked
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons mr-0.5"
  }, "report_problem"), "Request Takedown"), /* @__PURE__ */ React.createElement(Modal_default, {
    title: "Request Takedown",
    isVisible: modalIsVisible,
    onClose: closeModal
  }, modalContent));
};
var RequestTakedownButton_default = RequestTakedownButton;

// app/components/AudioItemCard.tsx
var AudioItemCard = ({ audioItem, showTitle = true, className }) => {
  const { name, slug, description, tags, status, createdByUser, createdAt } = audioItem;
  const navigate = (0, import_react52.useNavigate)();
  const {
    activeAudioItem,
    setActiveAudioItem,
    activeItemDurationSeconds,
    playbackPositionSeconds
  } = usePlayerContext_default();
  const audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id;
  const tagsWithTimeMarkers = (0, import_react50.useMemo)(() => {
    if (!Array.isArray(tags)) {
      return [];
    }
    return tags.filter((tag) => typeof tag.subjectTimeMarkerSeconds === "number");
  }, [tags]);
  const onPlayPressed = (0, import_react50.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem]);
  const onTakedownRequestCreated = (0, import_react50.useCallback)((takedownRequest) => {
    if (takedownRequest.status === "Approved" /* Approved */) {
      navigate(`/entities/audio-items/${slug}`);
    }
  }, [navigate, slug]);
  const shouldShowPositionAndDuration = audioItemIsInPlayer && typeof playbackPositionSeconds === "number" && typeof activeItemDurationSeconds === "number";
  const positionAndDuration = `${DateTime_default.formatSecondsAsDuration(playbackPositionSeconds)} / ${DateTime_default.formatSecondsAsDuration(activeItemDurationSeconds)}`;
  const isTakenDown = status === "TakenDown" /* TakenDown */;
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-col justify-start items-start bg-white shadow-md rounded p-4 pb-3 ${className ?? ""}`
  }, showTitle && /* @__PURE__ */ React.createElement("h2", {
    className: "mb-2"
  }, /* @__PURE__ */ React.createElement(import_react51.Link, {
    to: `/entities/audio-items/${slug}`
  }, /* @__PURE__ */ React.createElement("a", {
    className: "link-bare"
  }, name))), /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement(Tags_default, {
    entity: audioItem
  })), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col w-full border border-gray-200 rounded mb-2"
  }, isTakenDown ? /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center px-4 py-6 text-gray-500"
  }, "This Audio Item has been removed via an approved Takedown Request") : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row justify-start items-center pr-4 h-16"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1"
  }, audioItemIsInPlayer ? /* @__PURE__ */ React.createElement("div", {
    className: "pl-4 text-gray-500"
  }, "Playing") : /* @__PURE__ */ React.createElement("button", {
    style: { lineHeight: 0 },
    onClick: onPlayPressed,
    "aria-label": "Play"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-6xl text-teal-600 hover:text-teal-800"
  }, "play_arrow")), /* @__PURE__ */ React.createElement("div", {
    className: `ml-4 text-gray-500 opacity-0 ${shouldShowPositionAndDuration ? "opacity-100 transition-opacity delay-500 duration-400" : ""}`
  }, positionAndDuration)))), tagsWithTimeMarkers.length > 0 && /* @__PURE__ */ React.createElement("div", {
    className: "mx-4 mb-2 pt-3 border-t border-gray-200"
  }, /* @__PURE__ */ React.createElement(TimeMarkers_default, {
    audioItem
  }))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500 text-sm flex flex-col sm:flex-row"
  }, "Added", createdByUser && /* @__PURE__ */ React.createElement(React.Fragment, null, " ", "by", " ", /* @__PURE__ */ React.createElement(import_react51.Link, {
    to: `/users/${createdByUser.id}`
  }, /* @__PURE__ */ React.createElement("a", {
    className: "flex flex-row px-0 sm:px-1"
  }, createdByUser.verifiedPerson && /* @__PURE__ */ React.createElement("div", {
    className: "inline"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm mr-1"
  }, "verified")), createdByUser.username))), " ", DateTime_default.formatDateYearTime(createdAt)), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm mt-1 text-gray-900 whitespace-pre-wrap"
  }, description || "No description")), /* @__PURE__ */ React.createElement("div", {
    className: "border-t border-gray-200 mt-4 pt-3 w-full flex flex-row justify-between items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center"
  }, /* @__PURE__ */ React.createElement(ViewCommentsButton_default, {
    audioItem
  }), /* @__PURE__ */ React.createElement("div", {
    className: "ml-2"
  }, /* @__PURE__ */ React.createElement(SaveItemButton_default, {
    audioItem
  }))), /* @__PURE__ */ React.createElement(Menu_default, null, !isTakenDown && /* @__PURE__ */ React.createElement(RequestTakedownButton_default, {
    entity: audioItem,
    onTakedownRequestCreated
  }))));
};
var AudioItemCard_default = AudioItemCard;

// app/components/AudioItemCompact.tsx
init_react();
var import_react53 = require("react");
var import_react54 = require("@remix-run/react");
var AudioItemCompact = ({ audioItem, className }) => {
  const { name, slug, description, tags, status } = audioItem;
  const isTakenDown = status === "TakenDown" /* TakenDown */;
  const sortedTags = (0, import_react53.useMemo)(() => Tag_default.sort(tags), [tags]);
  const { activeAudioItem, setActiveAudioItem } = usePlayerContext_default();
  const onPlayPressed = (0, import_react53.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem]);
  const playButtonMarkup = (0, import_react53.useMemo)(() => {
    const audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id;
    if (isTakenDown) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "text-gray-500"
      }, "Taken Down");
    }
    if (audioItemIsInPlayer) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "text-gray-500"
      }, "Playing");
    }
    return /* @__PURE__ */ React.createElement("button", {
      style: { lineHeight: 0 },
      onClick: onPlayPressed,
      "aria-label": "Play"
    }, /* @__PURE__ */ React.createElement("i", {
      className: "material-icons text-6xl text-teal-600 hover:text-teal-800"
    }, "play_arrow"));
  }, [isTakenDown, activeAudioItem, audioItem, onPlayPressed]);
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-row justify-start items-start bg-white shadow-md rounded pt-2 px-3 pb-1 ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center items-center w-14 mr-3"
  }, playButtonMarkup), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1 flex-col overflow-hidden"
  }, /* @__PURE__ */ React.createElement(import_react54.Link, {
    to: `/entities/audio-items/${slug}`
  }, name), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row flex-wrap text-sm mt-1 mb-1"
  }, "Tags:", sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement("div", {
    key: index,
    className: "ml-1 whitespace-pre"
  }, /* @__PURE__ */ React.createElement(import_react54.Link, {
    to: Entity_default.makeHrefForView(tag.objectEntity)
  }, /* @__PURE__ */ React.createElement("a", null, tag.objectEntity.name, tag.objectEntity.entityType === "Tune" /* Tune */ ? ` (${tag.objectEntity.type})` : "")), index !== sortedTags.length - 1 && ", ")), /* @__PURE__ */ React.createElement(AddTagButton_default, {
    entity: audioItem,
    className: "ml-2"
  }), (tags == null ? void 0 : tags.length) > 0 && /* @__PURE__ */ React.createElement("div", {
    className: "flex ml-1"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 mr-1"
  }, "/"), /* @__PURE__ */ React.createElement(EditTagsButton_default, {
    entity: audioItem
  }))), description && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500 text-sm"
  }, description), /* @__PURE__ */ React.createElement("div", {
    className: "border-t border-gray-200 mt-2 pt-1 w-full flex flex-row justify-between items-center"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center"
  }, /* @__PURE__ */ React.createElement(ViewCommentsButton_default, {
    audioItem
  }), /* @__PURE__ */ React.createElement("div", {
    className: "ml-2"
  }, /* @__PURE__ */ React.createElement(SaveItemButton_default, {
    audioItem
  }))), /* @__PURE__ */ React.createElement(Menu_default, null, !isTakenDown && /* @__PURE__ */ React.createElement(RequestTakedownButton_default, {
    entity: audioItem
  })))));
};
var AudioItemCompact_default = AudioItemCompact;

// app/components/AudioItemTextOnly.tsx
init_react();
var import_react55 = require("react");
var import_react56 = require("@remix-run/react");
var AudioItemTextOnly = ({ audioItem, className }) => {
  const { name, slug, tags, status } = audioItem;
  const isTakenDown = status === "TakenDown" /* TakenDown */;
  const sortedTags = (0, import_react55.useMemo)(() => Tag_default.sort(tags), [tags]);
  const { activeAudioItem, setActiveAudioItem } = usePlayerContext_default();
  const onPlayPressed = (0, import_react55.useCallback)(() => {
    setActiveAudioItem(audioItem);
  }, [audioItem]);
  const playButtonMarkup = (0, import_react55.useMemo)(() => {
    const audioItemIsInPlayer = (activeAudioItem == null ? void 0 : activeAudioItem.id) === audioItem.id;
    if (isTakenDown) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "text-gray-500"
      }, "Taken Down");
    }
    if (audioItemIsInPlayer) {
      return /* @__PURE__ */ React.createElement("div", {
        className: "text-gray-500"
      }, "Playing");
    }
    return /* @__PURE__ */ React.createElement("button", {
      style: { lineHeight: 0 },
      onClick: onPlayPressed,
      "aria-label": "Play"
    }, /* @__PURE__ */ React.createElement("i", {
      className: "material-icons text-2xl text-teal-600 hover:text-teal-800"
    }, "play_arrow"));
  }, [isTakenDown, activeAudioItem, audioItem, onPlayPressed]);
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-row justify-start items-start ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex justify-center items-center w-14 mr-3"
  }, playButtonMarkup), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1 flex-col overflow-hidden"
  }, /* @__PURE__ */ React.createElement(import_react56.Link, {
    to: `/entities/audio-items/${slug}`
  }, name), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row flex-wrap text-sm mt-1 mb-1"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, "Tags:"), sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement("div", {
    key: index,
    className: "ml-1 whitespace-pre"
  }, /* @__PURE__ */ React.createElement(import_react56.Link, {
    to: Entity_default.makeHrefForView(tag.objectEntity)
  }, tag.objectEntity.name), index !== sortedTags.length - 1 && ", ")))));
};
var AudioItemTextOnly_default = AudioItemTextOnly;

// app/components/AudioItem.tsx
var AudioItemComponent = ({
  viewAs = "Cards" /* Cards */,
  audioItem,
  showTitle,
  className
}) => {
  if (viewAs === "Cards" /* Cards */) {
    return /* @__PURE__ */ React.createElement(AudioItemCard_default, {
      audioItem,
      showTitle,
      className
    });
  } else if (viewAs === "Compact" /* Compact */) {
    return /* @__PURE__ */ React.createElement(AudioItemCompact_default, {
      audioItem,
      className
    });
  } else if (viewAs === "List" /* List */) {
    return /* @__PURE__ */ React.createElement(AudioItemTextOnly_default, {
      audioItem,
      className
    });
  } else {
    return null;
  }
};
var AudioItem_default = AudioItemComponent;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/[slug].tsx
var AUDIO_ITEM_QUERY2 = import_client25.gql`
	query AudioItem($slug: String!) {
		audioItem(slug: $slug) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var ViewAudioItemBySlug = () => {
  const navigate = (0, import_react57.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client25.useQuery)(AUDIO_ITEM_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const { audioItem } = data ?? {};
  const { name } = audioItem ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name ?? ""}`
  }, !data && !error && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("span", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement("div", {
    className: "mb-6"
  }, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: Entity_default.makeReadableNamePlural(audioItem),
        href: Entity_default.makeHrefForTopLevel(audioItem)
      },
      { label: name }
    ],
    className: "mb-2"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row mb-6"
  }, /* @__PURE__ */ React.createElement(import_react58.Link, {
    to: Entity_default.makeHrefForAbout(audioItem)
  }, "About")), /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs: "Cards" /* Cards */,
    audioItem,
    showTitle: false
  })));
};
var slug_default = ViewAudioItemBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/[slug]/about.tsx
var about_exports = {};
__export(about_exports, {
  default: () => about_default
});
init_react();
var import_client27 = __toESM(require_main());
var import_react61 = require("@remix-run/react");
var import_react62 = require("@remix-run/react");

// app/routes/entities/audio-items/[slug].tsx
init_react();
var import_react59 = require("@remix-run/react");
var import_react60 = require("@remix-run/react");
var import_client26 = __toESM(require_main());
var AUDIO_ITEM_QUERY3 = import_client26.gql`
	query AudioItem($slug: String!) {
		audioItem(slug: $slug) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/[slug]/about.tsx
var AudioItemAbout = () => {
  const navigate = (0, import_react62.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client27.useQuery)(AUDIO_ITEM_QUERY3, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { name, description, aliases, itmaAtomSlug } = (data == null ? void 0 : data.audioItem) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Audio Items", href: "/entities/audio-items" },
      { label: name, href: `/entities/audio-items/${slug}` },
      { label: "About" }
    ],
    className: "mb-6"
  }), itmaAtomSlug && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "italic text-gray-500"
  }, "This was sourced from ITMA's AtoM archive"), /* @__PURE__ */ React.createElement("a", {
    href: `https://itma-atom.arkivum.net/index.php/${itmaAtomSlug}`,
    target: "_blank",
    rel: "noreferrer"
  }, "View on AtoM ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch"))), description && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Description:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 whitespace-pre"
  }, description)), aliases && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Aliases:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, aliases)), /* @__PURE__ */ React.createElement(import_react61.Link, {
    to: `/entities/audio-items/${slug}/edit`
  }, "Edit")));
};
var about_default = AudioItemAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/[slug]/edit.tsx
var edit_exports = {};
__export(edit_exports, {
  default: () => edit_default
});
init_react();
var import_react65 = require("@remix-run/react");
var import_client29 = __toESM(require_main());

// app/components/EditAudioItemForm.tsx
init_react();
var import_react63 = require("react");
var import_client28 = __toESM(require_main());
var import_react64 = require("@remix-run/react");
var UPDATE_AUDIO_ITEM_MUTATION = import_client28.gql`
	mutation UpdateAudioItem($slug: String!, $input: UpdateAudioItemInput!) {
		updateAudioItem(slug: $slug, input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var EditAudioItemForm = ({ audioItem, onSuccess }) => {
  const navigate = (0, import_react64.useNavigate)();
  const [updateAudioItem, { loading, error, data }] = (0, import_client28.useMutation)(UPDATE_AUDIO_ITEM_MUTATION, {
    errorPolicy: "all"
  });
  const [name, setName] = (0, import_react63.useState)(audioItem.name);
  const [aliases, setAliases] = (0, import_react63.useState)(audioItem.aliases);
  const [description, setDescription] = (0, import_react63.useState)(audioItem.description);
  const onUpdateAudioItem = (event) => {
    event.preventDefault();
    const input = {
      name,
      aliases,
      description
    };
    updateAudioItem({ variables: { slug: audioItem.slug, input } });
  };
  (0, import_react63.useEffect)(() => {
    if (data == null ? void 0 : data.updateAudioItem) {
      if (onSuccess) {
        return onSuccess(data.updateAudioItem);
      }
      window.alert("AudioItem updated successfully!");
    }
  }, [data, navigate]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onUpdateAudioItem
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: true,
    className: "mb-2",
    value: name,
    onChange: (event) => setName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this AudioItem. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Finbarr and Brian, Finbarr '08 at Dolan's")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 10,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Save"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var EditAudioItemForm_default = EditAudioItemForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/[slug]/edit.tsx
var AUDIO_ITEM_QUERY4 = import_client29.gql`
	query AudioItem($slug: String!) {
		audioItem(slug: $slug) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var EditAudioItem = () => {
  const navigate = (0, import_react65.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client29.useQuery)(AUDIO_ITEM_QUERY4, {
    variables: { slug },
    skip: !slug
  });
  const onEditSuccess = (audioItem2) => {
    navigate(`/entities/audio-items/${audioItem2.slug}`);
  };
  let statusMessage;
  if (!data && !error) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!data && error) {
    statusMessage = `Error fetching AudioItem with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const { audioItem } = data;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Edit AudioItem: ", audioItem.name), /* @__PURE__ */ React.createElement(EditAudioItemForm_default, {
    audioItem,
    onSuccess: onEditSuccess
  }))));
};
var edit_default = EditAudioItem;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/[slug]/tags.tsx
var tags_exports = {};
__export(tags_exports, {
  default: () => tags_default
});
init_react();
var import_react66 = require("react");
var import_react67 = require("@remix-run/react");
var ViewAudioItemTags = () => {
  const navigate = (0, import_react67.useNavigate)();
  const { slug } = navigate.query;
  (0, import_react66.useEffect)(() => {
    if (slug) {
      navigate(`/entities/audio-items/${slug}`);
    }
  }, [navigate, slug]);
  return null;
};
var tags_default = ViewAudioItemTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/random.tsx
var random_exports = {};
__export(random_exports, {
  default: () => random_default
});
init_react();
var import_react68 = require("react");
var import_react69 = require("@remix-run/react");

// app/hooks/useAudioItemRandom.ts
init_react();
var import_client30 = __toESM(require_main());
var AUDIO_ITEM_RANDOM_QUERY = import_client30.gql`
	query AudioItemRandom {
		audioItemRandom {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var useAudioItemRandom = ({ queryOptions = {} } = {}) => {
  const audioItemRandomQuery = (0, import_client30.useQuery)(AUDIO_ITEM_RANDOM_QUERY, __spreadValues({
    fetchPolicy: "network-only"
  }, queryOptions));
  const { data } = audioItemRandomQuery;
  const audioItemRandom = data == null ? void 0 : data.audioItemRandom;
  return [audioItemRandom, audioItemRandomQuery];
};
var useAudioItemRandom_default = useAudioItemRandom;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/random.tsx
var AudioItemRandom = () => {
  const [audioItemRandom, { loading, error }] = useAudioItemRandom_default();
  const navigate = (0, import_react69.useNavigate)();
  (0, import_react68.useEffect)(() => {
    if (audioItemRandom) {
      navigate(Entity_default.makeHrefForView(audioItemRandom));
    }
  }, [audioItemRandom]);
  return /* @__PURE__ */ React.createElement(Layout_default, null, loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching random Audio Item. Please reload the page."));
};
var random_default = AudioItemRandom;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/[slug].tsx
var slug_exports2 = {};
__export(slug_exports2, {
  COLLECTION_QUERY: () => COLLECTION_QUERY,
  default: () => slug_default2
});
init_react();
var import_react76 = require("@remix-run/react");
var import_client32 = __toESM(require_main());

// app/components/ViewEntityAndAudioItems.tsx
init_react();
var import_react74 = require("react");
var import_react75 = require("@remix-run/react");
var import_react_intersection_observer = require("react-intersection-observer");

// app/hooks/useAudioItemsTaggedWithEntity.ts
init_react();
var import_client31 = __toESM(require_main());
var AUDIO_ITEMS_TAGGED_WITH_ENTITY_QUERY = import_client31.gql`
	query AudioItemsTaggedWithEntity($input: AudioItemsTaggedWithEntityInput!) {
		audioItemsTaggedWithEntity(input: $input) {
			audioItems {
				...AudioItem
			}
			total
		}
	}
	${EntityFragments.audioItem}
`;
var useAudioItemsTaggedWithEntity = ({
  entity,
  page = 1,
  perPage = 10,
  queryOptions = {}
}) => {
  var _a, _b;
  const query = (0, import_client31.useQuery)(AUDIO_ITEMS_TAGGED_WITH_ENTITY_QUERY, __spreadValues({
    variables: {
      input: {
        entityType: entity == null ? void 0 : entity.entityType,
        entityId: entity == null ? void 0 : entity.id,
        skip: (page - 1) * perPage,
        take: perPage
      }
    },
    skip: !entity
  }, queryOptions));
  const { data } = query;
  const audioItems = (_a = data == null ? void 0 : data.audioItemsTaggedWithEntity) == null ? void 0 : _a.audioItems;
  const total = (_b = data == null ? void 0 : data.audioItemsTaggedWithEntity) == null ? void 0 : _b.total;
  return {
    audioItems,
    total,
    query
  };
};
var useAudioItemsTaggedWithEntity_default = useAudioItemsTaggedWithEntity;

// app/hooks/useFilters.ts
init_react();
var import_react73 = require("react");

// app/hooks/useQueryParams.ts
init_react();
var import_react70 = require("react");
var import_react71 = require("@remix-run/react");
var useQueryParams = () => {
  const navigate = (0, import_react71.useNavigate)();
  const getQueryParams = (0, import_react70.useCallback)(() => {
    if (typeof window === "undefined") {
      return {};
    }
    const queryParams = new URLSearchParams(window.location.search);
    const outputObject = {};
    for (const key of queryParams.keys()) {
      outputObject[key] = queryParams.get(key);
    }
    return outputObject;
  }, []);
  const updateQueryParams = (0, import_react70.useCallback)((paramsToUpdate = {}) => {
    if (typeof window === "undefined") {
      return;
    }
    const queryParams = new URLSearchParams(window.location.search);
    const paramNames = Object.keys(paramsToUpdate);
    paramNames.forEach((paramName) => {
      const value = paramsToUpdate[paramName];
      if (value) {
        queryParams.set(paramName, value);
      } else {
        queryParams.delete(paramName);
      }
    });
    return navigate(`${window.location.pathname}?${queryParams.toString()}`);
  }, [navigate]);
  const clearQueryParams = (0, import_react70.useCallback)(() => {
    if (typeof window === "undefined") {
      return;
    }
    navigate(window.location.pathname);
  }, [navigate]);
  const returnValue = (0, import_react70.useMemo)(() => ({
    getQueryParams,
    updateQueryParams,
    clearQueryParams
  }), [getQueryParams, updateQueryParams, clearQueryParams]);
  return returnValue;
};
var useQueryParams_default = useQueryParams;

// app/components/Filters.tsx
init_react();
var import_react72 = __toESM(require("react"));
var Filters = ({
  totalItems,
  page,
  onChangePage,
  perPage,
  onChangePerPage,
  sortBy,
  onChangeSortBy,
  viewAs,
  onChangeViewAs,
  className
}) => {
  const shouldRenderPagination = typeof totalItems === "number" && typeof page === "number" && onChangePage && perPage && onChangePerPage;
  const shouldRenderSortBy = sortBy && onChangeSortBy;
  const shouldRenderViewAs = viewAs && onChangeViewAs;
  const totalPages = (0, import_react72.useMemo)(() => {
    if (typeof totalItems !== "number" || typeof perPage === "undefined") {
      return 0;
    }
    return Math.ceil(totalItems / perPage);
  }, [totalItems, perPage]);
  const pageSelectOptions = (0, import_react72.useMemo)(() => {
    const output = [];
    let i = 1;
    while (i <= totalPages) {
      output.push(/* @__PURE__ */ import_react72.default.createElement("option", {
        value: i,
        key: i
      }, i));
      i++;
    }
    return output;
  }, [totalPages]);
  const perPageOptions = (0, import_react72.useMemo)(() => {
    const output = [];
    for (const value in PerPage) {
      if (isNaN(Number(value))) {
        continue;
      }
      output.push(/* @__PURE__ */ import_react72.default.createElement("option", {
        value,
        key: value
      }, value));
    }
    return output;
  }, []);
  return /* @__PURE__ */ import_react72.default.createElement("div", {
    className: `flex flex-col md:flex-row flex-wrap justify-start items-start md:items-center text-gray-500 ${className ?? ""}`
  }, shouldRenderPagination && /* @__PURE__ */ import_react72.default.createElement("div", {
    className: `flex flex-row items-center mr-0 md:mb-0 ${shouldRenderSortBy || shouldRenderViewAs ? "mb-4 md:mr-6" : ""}`
  }, /* @__PURE__ */ import_react72.default.createElement("div", {
    className: "mr-6"
  }, "Page", " ", /* @__PURE__ */ import_react72.default.createElement("select", {
    value: page,
    onChange: onChangePage
  }, pageSelectOptions), totalPages ? ` of ${totalPages}` : ""), /* @__PURE__ */ import_react72.default.createElement("div", null, /* @__PURE__ */ import_react72.default.createElement("select", {
    value: perPage,
    onChange: onChangePerPage
  }, perPageOptions), " ", "per page")), shouldRenderSortBy && /* @__PURE__ */ import_react72.default.createElement("div", {
    className: `flex flex-row items-center mr-0 md:mb-0 ${shouldRenderViewAs ? "mb-4 md:mr-6" : ""}`
  }, "Sort by", /* @__PURE__ */ import_react72.default.createElement("select", {
    className: "ml-1",
    value: sortBy,
    onChange: onChangeSortBy
  }, /* @__PURE__ */ import_react72.default.createElement("option", {
    value: "RecentlyTagged" /* RecentlyTagged */
  }, "Recently tagged"), /* @__PURE__ */ import_react72.default.createElement("option", {
    value: "RecentlyAdded" /* RecentlyAdded */
  }, "Recently added"))), shouldRenderViewAs && /* @__PURE__ */ import_react72.default.createElement("div", {
    className: "flex flex-row items-center mr-0 md:mb-0"
  }, "View as", /* @__PURE__ */ import_react72.default.createElement("select", {
    className: "ml-1",
    value: viewAs,
    onChange: onChangeViewAs
  }, /* @__PURE__ */ import_react72.default.createElement("option", {
    value: "Cards" /* Cards */
  }, "Cards"), /* @__PURE__ */ import_react72.default.createElement("option", {
    value: "Compact" /* Compact */
  }, "Compact"), /* @__PURE__ */ import_react72.default.createElement("option", {
    value: "List" /* List */
  }, "List"))));
};
var Filters_default = Filters;

// app/hooks/useFilters.ts
var useFilters = ({
  totalItems,
  defaultPage,
  defaultPerPage,
  defaultSortBy,
  defaultViewAs,
  enableQueryParams = true
} = {}) => {
  const { getQueryParams, updateQueryParams, clearQueryParams } = useQueryParams_default();
  const queryParams = getQueryParams();
  const initialPage = enableQueryParams ? parseInt(queryParams.page, 10) || defaultPage : defaultPage;
  const initialPerPage = enableQueryParams ? parseInt(queryParams.perPage, 10) || defaultPerPage : defaultPerPage;
  const initialSortBy = enableQueryParams ? queryParams.sortBy ?? defaultSortBy : defaultSortBy;
  const initialViewAs = enableQueryParams ? queryParams.viewAs ?? defaultViewAs : defaultViewAs;
  const [page, setPage] = (0, import_react73.useState)(initialPage);
  const [perPage, setPerPage] = (0, import_react73.useState)(initialPerPage);
  const [sortBy, setSortBy] = (0, import_react73.useState)(initialSortBy);
  const [viewAs, setViewAs] = (0, import_react73.useState)(initialViewAs);
  (0, import_react73.useEffect)(() => {
    if (!enableQueryParams) {
      return;
    }
    updateQueryParams({
      page: page ? `${page}` : null,
      perPage: perPage ? `${perPage}` : null,
      sortBy,
      viewAs
    });
  }, [enableQueryParams, page, perPage, sortBy, viewAs]);
  (0, import_react73.useEffect)(() => {
    if (!enableQueryParams) {
      return;
    }
    return () => clearQueryParams();
  }, [enableQueryParams]);
  const onChangePage = (0, import_react73.useCallback)((event) => setPage(parseInt(event.target.value)), []);
  const onChangePerPage = (0, import_react73.useCallback)((event) => {
    setPerPage(parseInt(event.target.value));
    setPage(1);
  }, []);
  const onChangeSortBy = (0, import_react73.useCallback)((event) => setSortBy(event.target.value), []);
  const onChangeViewAs = (0, import_react73.useCallback)((event) => setViewAs(event.target.value), []);
  const returnValue = (0, import_react73.useMemo)(() => ({
    Filters: Filters_default,
    filtersProps: {
      totalItems,
      page,
      onChangePage,
      perPage,
      onChangePerPage,
      sortBy,
      onChangeSortBy,
      viewAs,
      onChangeViewAs
    },
    page,
    perPage,
    sortBy,
    viewAs
  }), [
    Filters_default,
    totalItems,
    page,
    onChangePage,
    perPage,
    onChangePerPage,
    sortBy,
    onChangeSortBy,
    viewAs,
    onChangeViewAs
  ]);
  return returnValue;
};
var useFilters_default = useFilters;

// app/components/ViewEntityAndAudioItems.tsx
var ViewEntityAndAudioItems = ({ entity, className }) => {
  var _a;
  const { name } = entity ?? {};
  const { ref: metadataRef, inView: metadataInView } = (0, import_react_intersection_observer.useInView)({
    initialInView: true
  });
  const [totalAudioItems, setTotalAudioItems] = (0, import_react74.useState)();
  const { Filters: Filters2, filtersProps, page, perPage, viewAs } = useFilters_default({
    defaultPage: 1,
    totalItems: totalAudioItems,
    defaultPerPage: 20 /* Twenty */,
    defaultViewAs: "Cards" /* Cards */
  });
  const filtersRef = (0, import_react74.useRef)(null);
  (0, import_react74.useEffect)(() => {
    if (filtersRef.current) {
      filtersRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }
  }, [page, filtersRef]);
  const {
    audioItems = [],
    total,
    query: { loading: audioItemsLoading, error: audioItemsError }
  } = useAudioItemsTaggedWithEntity_default({
    entity,
    page,
    perPage
  });
  (0, import_react74.useEffect)(() => {
    if (typeof total === "number") {
      setTotalAudioItems(total);
    }
  }, [total]);
  const headerOffset = ((_a = window.document.getElementById("header")) == null ? void 0 : _a.offsetHeight) ?? 0;
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-1 flex-col mb-8 ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-6",
    ref: metadataRef
  }, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: Entity_default.makeReadableNamePlural(entity),
        href: Entity_default.makeHrefForTopLevel(entity)
      },
      { label: name }
    ],
    className: "mb-2"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row mb-6"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, totalAudioItems ?? "", " Audio Item", totalAudioItems === 1 ? "" : "s"), /* @__PURE__ */ React.createElement(import_react75.Link, {
    to: Entity_default.makeHrefForAbout(entity)
  }, /* @__PURE__ */ React.createElement("a", {
    className: "ml-4"
  }, "About")), /* @__PURE__ */ React.createElement(import_react75.Link, {
    to: Entity_default.makeHrefForTags(entity)
  }, /* @__PURE__ */ React.createElement("a", {
    className: "ml-4"
  }, "Tags"))), totalAudioItems > 0 && /* @__PURE__ */ React.createElement("div", {
    ref: filtersRef
  }, /* @__PURE__ */ React.createElement(Filters2, __spreadValues({}, filtersProps)))), audioItemsLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), totalAudioItems > 0 && audioItems.map((audioItem, index) => /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs,
    audioItem,
    key: index,
    className: viewAs === "List" /* List */ ? "mb-4" : "mb-6"
  })), audioItemsError && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching Audio Items"), /* @__PURE__ */ React.createElement("div", {
    className: `${metadataInView ? "hidden" : "visible"} fixed left-0 right-0 p-4 bg-gray-100 shadow-lg`,
    style: { top: `${headerOffset}px` }
  }, totalAudioItems > 0 && /* @__PURE__ */ React.createElement(Filters2, __spreadValues({}, filtersProps))));
};
var ViewEntityAndAudioItems_default = ViewEntityAndAudioItems;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/[slug].tsx
var COLLECTION_QUERY = import_client32.gql`
	query Collection($slug: String!) {
		collection(slug: $slug) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;
var ViewCollectionBySlug = () => {
  const navigate = (0, import_react76.useNavigate)();
  const { slug } = navigate.query;
  const { data: collectionData, error: collectionError } = (0, import_client32.useQuery)(COLLECTION_QUERY, {
    variables: { slug },
    skip: !slug
  });
  const { collection } = collectionData ?? {};
  let statusMessage;
  if (!collectionData && !collectionError) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!collectionData && collectionError) {
    statusMessage = `Error fetching Collection with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${collection.name}`
  }, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: collection
  }));
};
var slug_default2 = ViewCollectionBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/[slug]/about.tsx
var about_exports2 = {};
__export(about_exports2, {
  default: () => about_default2
});
init_react();
var import_client34 = __toESM(require_main());
var import_react78 = require("@remix-run/react");
var import_react79 = require("@remix-run/react");

// app/routes/entities/collections/[slug].tsx
init_react();
var import_react77 = require("@remix-run/react");
var import_client33 = __toESM(require_main());
var COLLECTION_QUERY2 = import_client33.gql`
	query Collection($slug: String!) {
		collection(slug: $slug) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/[slug]/about.tsx
var CollectionAbout = () => {
  const navigate = (0, import_react79.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client34.useQuery)(COLLECTION_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { name, description, aliases, itmaAtomSlug } = (data == null ? void 0 : data.collection) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Collections", href: "/entities/collections" },
      { label: name, href: `/entities/collections/${slug}` },
      { label: "About" }
    ],
    className: "mb-6"
  }), itmaAtomSlug && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "italic text-gray-500"
  }, "This was sourced from ITMA's AtoM archive"), /* @__PURE__ */ React.createElement("a", {
    href: `https://itma-atom.arkivum.net/index.php/${itmaAtomSlug}`,
    target: "_blank",
    rel: "noreferrer"
  }, "View on AtoM ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch"))), description && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Description:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 whitespace-pre-wrap"
  }, description)), aliases && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Aliases:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, aliases)), /* @__PURE__ */ React.createElement(import_react78.Link, {
    to: `/entities/collections/${slug}/edit`
  }, "Edit")));
};
var about_default2 = CollectionAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/[slug]/edit.tsx
var edit_exports2 = {};
__export(edit_exports2, {
  default: () => edit_default2
});
init_react();
var import_react82 = require("@remix-run/react");
var import_client36 = __toESM(require_main());

// app/components/EditCollectionForm.tsx
init_react();
var import_react80 = require("react");
var import_client35 = __toESM(require_main());
var import_react81 = require("@remix-run/react");
var UPDATE_COLLECTION_MUTATION = import_client35.gql`
	mutation UpdateCollection($slug: String!, $input: UpdateCollectionInput!) {
		updateCollection(slug: $slug, input: $input) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;
var EditCollectionForm = ({ collection, onSuccess }) => {
  const navigate = (0, import_react81.useNavigate)();
  const [updateCollection, { loading, error, data }] = (0, import_client35.useMutation)(UPDATE_COLLECTION_MUTATION, {
    errorPolicy: "all"
  });
  const [name, setName] = (0, import_react80.useState)(collection.name);
  const [aliases, setAliases] = (0, import_react80.useState)(collection.aliases);
  const [description, setDescription] = (0, import_react80.useState)(collection.description);
  const onUpdateCollection = (event) => {
    event.preventDefault();
    const input = {
      name,
      aliases,
      description
    };
    updateCollection({ variables: { slug: collection.slug, input } });
  };
  (0, import_react80.useEffect)(() => {
    if (data == null ? void 0 : data.updateCollection) {
      if (onSuccess) {
        return onSuccess(data.updateCollection);
      }
      window.alert("Collection updated successfully!");
    }
  }, [data, navigate]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onUpdateCollection
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    className: "mb-2",
    value: name,
    onChange: (event) => setName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases ?? "",
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Collection. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "O'Neill's, 1000 Fiddle Tunes")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 10,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Save"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var EditCollectionForm_default = EditCollectionForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/[slug]/edit.tsx
var COLLECTION_QUERY3 = import_client36.gql`
	query Collection($slug: String!) {
		collection(slug: $slug) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;
var CollectionEdit = () => {
  const navigate = (0, import_react82.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client36.useQuery)(COLLECTION_QUERY3, {
    variables: { slug },
    skip: !slug
  });
  const onEditSuccess = (collection2) => {
    navigate(`/entities/collections/${collection2.slug}/about`);
  };
  let statusMessage;
  if (!data && !error) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!data && error) {
    statusMessage = `Error fetching Collection with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const { collection } = data;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Edit Collection: ", collection.name), /* @__PURE__ */ React.createElement(EditCollectionForm_default, {
    collection,
    onSuccess: onEditSuccess
  }))));
};
var edit_default2 = CollectionEdit;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/[slug]/tags.tsx
var tags_exports2 = {};
__export(tags_exports2, {
  default: () => tags_default2
});
init_react();
var import_client37 = __toESM(require_main());
var import_react84 = require("@remix-run/react");

// app/components/TagWithRelationshipToObject.tsx
init_react();
var import_react83 = require("@remix-run/react");
var TagWithRelationshipToObject = ({ tag, className }) => {
  const { relationship, objectEntity, subjectTimeMarkerSeconds } = tag;
  if (!objectEntity) {
    return null;
  }
  const shouldShowTimeMarker = typeof subjectTimeMarkerSeconds === "number";
  return /* @__PURE__ */ React.createElement("div", {
    className: `text-gray-500 ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("em", null, relationship.name), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "uppercase text-sm"
  }, objectEntity.entityType), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_react83.Link, {
    to: Entity_default.makeHrefForView(objectEntity)
  }, objectEntity.name), /* @__PURE__ */ React.createElement("br", null), typeof subjectTimeMarkerSeconds === "number" && /* @__PURE__ */ React.createElement("em", null, `at ${DateTime_default.formatSecondsAsDuration(subjectTimeMarkerSeconds)}`));
};
var TagWithRelationshipToObject_default = TagWithRelationshipToObject;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/[slug]/tags.tsx
var CollectionTags = () => {
  const navigate = (0, import_react84.useNavigate)();
  const { slug } = navigate.query;
  const { data, error, refetch } = (0, import_client37.useQuery)(COLLECTION_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { collection } = data ?? {};
  const { name, tags } = collection ?? {};
  const sortedTags = Tag_default.sort(tags);
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - Tags`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Collections", href: "/entities/collections" },
      { label: name, href: `/entities/collections/${slug}` },
      { label: "Tags" }
    ],
    className: "mb-6"
  }), sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement(TagWithRelationshipToObject_default, {
    tag,
    key: index,
    className: "mb-4"
  })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AddTagButton_default, {
    entity: collection,
    onSuccess: refetch
  }), sortedTags.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 px-2"
  }, "/"), /* @__PURE__ */ React.createElement(EditTagsButton_default, {
    entity: collection,
    onSuccess: refetch
  })))));
};
var tags_default2 = CollectionTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/[slug].tsx
var slug_exports3 = {};
__export(slug_exports3, {
  INSTRUMENT_QUERY: () => INSTRUMENT_QUERY,
  default: () => slug_default3
});
init_react();
var import_react85 = require("@remix-run/react");
var import_client38 = __toESM(require_main());
var INSTRUMENT_QUERY = import_client38.gql`
	query Instrument($slug: String!) {
		instrument(slug: $slug) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;
var ViewInstrumentBySlug = () => {
  const navigate = (0, import_react85.useNavigate)();
  const { slug } = navigate.query;
  const { data: instrumentData, error: instrumentError } = (0, import_client38.useQuery)(INSTRUMENT_QUERY, {
    variables: { slug },
    skip: !slug
  });
  const { instrument } = instrumentData ?? {};
  let statusMessage;
  if (!instrumentData && !instrumentError) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!instrumentData && instrumentError) {
    statusMessage = `Error fetching Instrument with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${instrument.name}`
  }, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: instrument
  }));
};
var slug_default3 = ViewInstrumentBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/[slug]/about.tsx
var about_exports3 = {};
__export(about_exports3, {
  default: () => about_default3
});
init_react();
var import_client40 = __toESM(require_main());
var import_react87 = require("@remix-run/react");
var import_react88 = require("@remix-run/react");

// app/routes/entities/instruments/[slug].tsx
init_react();
var import_react86 = require("@remix-run/react");
var import_client39 = __toESM(require_main());
var INSTRUMENT_QUERY2 = import_client39.gql`
	query Instrument($slug: String!) {
		instrument(slug: $slug) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/[slug]/about.tsx
var InstrumentAbout = () => {
  const navigate = (0, import_react88.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client40.useQuery)(INSTRUMENT_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { name, description, aliases } = (data == null ? void 0 : data.instrument) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Instruments", href: "/entities/instruments" },
      { label: name, href: `/entities/instruments/${slug}` },
      { label: "About" }
    ],
    className: "mb-6"
  }), description && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Description:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 whitespace-pre-wrap"
  }, description)), aliases && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Aliases:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, aliases)), /* @__PURE__ */ React.createElement(import_react87.Link, {
    to: `/entities/instruments/${slug}/edit`
  }, "Edit")));
};
var about_default3 = InstrumentAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/[slug]/edit.tsx
var edit_exports3 = {};
__export(edit_exports3, {
  default: () => edit_default3
});
init_react();
var import_react91 = require("@remix-run/react");
var import_client42 = __toESM(require_main());

// app/components/EditInstrumentForm.tsx
init_react();
var import_react89 = require("react");
var import_client41 = __toESM(require_main());
var import_react90 = require("@remix-run/react");
var UPDATE_INSTRUMENT_MUTATION = import_client41.gql`
	mutation UpdateInstrument($slug: String!, $input: UpdateInstrumentInput!) {
		updateInstrument(slug: $slug, input: $input) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;
var EditInstrumentForm = ({ instrument, onSuccess }) => {
  const navigate = (0, import_react90.useNavigate)();
  const [updateInstrument, { loading, error, data }] = (0, import_client41.useMutation)(UPDATE_INSTRUMENT_MUTATION, {
    errorPolicy: "all"
  });
  const [name, setName] = (0, import_react89.useState)(instrument.name);
  const [aliases, setAliases] = (0, import_react89.useState)(instrument.aliases);
  const [description, setDescription] = (0, import_react89.useState)(instrument.description);
  const onUpdateInstrument = (event) => {
    event.preventDefault();
    const input = {
      name,
      aliases,
      description
    };
    updateInstrument({ variables: { slug: instrument.slug, input } });
  };
  (0, import_react89.useEffect)(() => {
    if (data == null ? void 0 : data.updateInstrument) {
      if (onSuccess) {
        return onSuccess(data.updateInstrument);
      }
      window.alert("Instrument updated successfully!");
    }
  }, [data, navigate]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onUpdateInstrument
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: true,
    className: "mb-2",
    value: name,
    onChange: (event) => setName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Instrument. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Stomach Steinway, Squeezebox, Belly Organ")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 10,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Save"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var EditInstrumentForm_default = EditInstrumentForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/[slug]/edit.tsx
var INSTRUMENT_QUERY3 = import_client42.gql`
	query Instrument($slug: String!) {
		instrument(slug: $slug) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;
var EditInstrument = () => {
  const navigate = (0, import_react91.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client42.useQuery)(INSTRUMENT_QUERY3, {
    variables: { slug },
    skip: !slug
  });
  const onEditSuccess = (instrument2) => {
    navigate(`/entities/instruments/${instrument2.slug}`);
  };
  let statusMessage;
  if (!data && !error) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!data && error) {
    statusMessage = `Error fetching Instrument with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const { instrument } = data;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Edit Instrument: ", instrument.name), /* @__PURE__ */ React.createElement(EditInstrumentForm_default, {
    instrument,
    onSuccess: onEditSuccess
  }))));
};
var edit_default3 = EditInstrument;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/[slug]/tags.tsx
var tags_exports3 = {};
__export(tags_exports3, {
  default: () => tags_default3
});
init_react();
var import_client43 = __toESM(require_main());
var import_react92 = require("@remix-run/react");
var InstrumentTags = () => {
  const navigate = (0, import_react92.useNavigate)();
  const { slug } = navigate.query;
  const { data, error, refetch } = (0, import_client43.useQuery)(INSTRUMENT_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { instrument } = data ?? {};
  const { name, tags } = instrument ?? {};
  const sortedTags = Tag_default.sort(tags);
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - Tags`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Instruments", href: "/entities/instruments" },
      { label: name, href: `/entities/instruments/${slug}` },
      { label: "Tags" }
    ],
    className: "mb-6"
  }), sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement(TagWithRelationshipToObject_default, {
    tag,
    key: index,
    className: "mb-4"
  })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AddTagButton_default, {
    entity: instrument,
    onSuccess: refetch
  }), sortedTags.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 px-2"
  }, "/"), /* @__PURE__ */ React.createElement(EditTagsButton_default, {
    entity: instrument,
    onSuccess: refetch
  })))));
};
var tags_default3 = InstrumentTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/index.tsx
var audio_items_exports = {};
__export(audio_items_exports, {
  default: () => audio_items_default
});
init_react();
var import_react93 = require("react");
var import_react94 = require("@remix-run/react");
var ViewAudioItems = () => {
  const navigate = (0, import_react94.useNavigate)();
  (0, import_react93.useEffect)(() => {
    navigate("/");
  }, [navigate]);
  return null;
};
var audio_items_default = ViewAudioItems;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/index.tsx
var collections_exports = {};
__export(collections_exports, {
  default: () => collections_default
});
init_react();
var import_react96 = require("@remix-run/react");

// app/hooks/useCollections.ts
init_react();
var import_react95 = require("react");
var import_client44 = __toESM(require_main());
var COLLECTIONS_QUERY = import_client44.gql`
	query Collections($input: CollectionsInput!) {
		collections(input: $input) {
			...Collection
		}
	}
	${EntityFragments.collection}
`;
var useCollections = ({
  sortBy = "AToZ" /* AToZ */,
  resultsPerPage = 20,
  queryOptions = {}
} = {}) => {
  const [skip, setSkip] = (0, import_react95.useState)(0);
  const [collections, setCollections] = (0, import_react95.useState)();
  const [getCollections, collectionsQuery] = (0, import_client44.useLazyQuery)(COLLECTIONS_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data, fetchMore } = collectionsQuery;
  (0, import_react95.useEffect)(() => {
    if (data == null ? void 0 : data.collections) {
      setCollections(data.collections);
    }
  }, [data]);
  (0, import_react95.useEffect)(() => {
    getCollections({
      variables: {
        input: {
          take: resultsPerPage + skip,
          skip: 0,
          sortBy
        }
      }
    });
  }, [getCollections, resultsPerPage, sortBy]);
  const fetchNextPageOfCollections = (0, import_react95.useCallback)(async () => {
    const numToSkip = (collections == null ? void 0 : collections.length) ?? 0;
    await fetchMore({
      variables: {
        input: {
          take: resultsPerPage,
          skip: numToSkip,
          sortBy
        }
      }
    });
    setSkip(numToSkip);
  }, [fetchMore, resultsPerPage, collections, sortBy]);
  return [collections, collectionsQuery, fetchNextPageOfCollections];
};
var useCollections_default = useCollections;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/index.tsx
var Collections = () => {
  const [collections, { loading, error }, fetchNextPage] = useCollections_default({
    resultsPerPage: 50
  });
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - Collections`
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Collections"), !loading && error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching Collections"), !loading && (collections == null ? void 0 : collections.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Collections found"), (collections == null ? void 0 : collections.length) > 0 && /* @__PURE__ */ React.createElement("ul", null, collections.map((collection, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react96.Link, {
    to: Entity_default.makeHrefForView(collection)
  }, collection.name)))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-6"
  }, loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), !loading && (collections == null ? void 0 : collections.length) > 0 && /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: fetchNextPage
  }, "Load More")));
};
var collections_default = Collections;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/index.tsx
var instruments_exports = {};
__export(instruments_exports, {
  default: () => instruments_default
});
init_react();
var import_react98 = require("@remix-run/react");

// app/hooks/useInstruments.ts
init_react();
var import_react97 = require("react");
var import_client45 = __toESM(require_main());
var INSTRUMENTS_QUERY = import_client45.gql`
	query Instruments($input: InstrumentsInput!) {
		instruments(input: $input) {
			...Instrument
		}
	}
	${EntityFragments.instrument}
`;
var useInstruments = ({
  sortBy = "AToZ" /* AToZ */,
  resultsPerPage = 20,
  queryOptions = {}
} = {}) => {
  const [skip, setSkip] = (0, import_react97.useState)(0);
  const [instruments, setInstruments] = (0, import_react97.useState)();
  (0, import_react97.useEffect)(() => {
    setInstruments(void 0);
    setSkip(0);
  }, [sortBy]);
  const [getInstruments, instrumentsQuery] = (0, import_client45.useLazyQuery)(INSTRUMENTS_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data, fetchMore } = instrumentsQuery;
  (0, import_react97.useEffect)(() => {
    if (data == null ? void 0 : data.instruments) {
      setInstruments(data.instruments);
    }
  }, [data]);
  (0, import_react97.useEffect)(() => {
    getInstruments({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage + skip,
          skip: 0
        }
      }
    });
  }, [getInstruments, resultsPerPage, sortBy, skip]);
  const fetchNextPage = (0, import_react97.useCallback)(async () => {
    const numToSkip = (instruments == null ? void 0 : instruments.length) ?? 0;
    await fetchMore({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage,
          skip: numToSkip
        }
      }
    });
    setSkip(numToSkip);
  }, [fetchMore, resultsPerPage, instruments, sortBy]);
  return [instruments, instrumentsQuery, fetchNextPage];
};
var useInstruments_default = useInstruments;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/index.tsx
var Instruments = () => {
  const [instruments, { loading, error }, fetchNextPage] = useInstruments_default({
    resultsPerPage: 50
  });
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - Instruments`
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Instruments"), !loading && error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching Instruments"), !loading && (instruments == null ? void 0 : instruments.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Instruments found"), (instruments == null ? void 0 : instruments.length) > 0 && /* @__PURE__ */ React.createElement("ul", null, instruments.map((instrument, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react98.Link, {
    to: Entity_default.makeHrefForView(instrument)
  }, instrument.name)))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-6"
  }, loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), !loading && (instruments == null ? void 0 : instruments.length) > 0 && /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: fetchNextPage
  }, "Load More")));
};
var instruments_default = Instruments;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/index.tsx
var submissions_exports = {};
__export(submissions_exports, {
  default: () => submissions_default
});
init_react();
var import_react99 = require("@remix-run/react");
var import_client46 = __toESM(require_main());
var SUBMISSIONS_FOR_CURRENT_USER = import_client46.gql`
	query SubmissionsForCurrentUser {
		submissionsForCurrentUser {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`;
var Submissions = () => {
  const { data, loading } = (0, import_client46.useQuery)(SUBMISSIONS_FOR_CURRENT_USER, { fetchPolicy: "cache-and-network" });
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Account",
        href: "/account"
      },
      { label: "Submissions" }
    ],
    className: "mb-6"
  }), /* @__PURE__ */ React.createElement(import_react99.Link, {
    to: "/account/submissions/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "btn"
  }, "Create New")), !data && loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, {
    className: "mt-12"
  }), data && /* @__PURE__ */ React.createElement("ul", {
    className: "mt-12"
  }, data.submissionsForCurrentUser.map((s, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-4",
    key: index
  }, DateTime_default.formatDateYearTime(s.createdAt, true), " (", s.materialTypes.join(", "), ") - Status: ", s.status, /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, `${s.description.substring(0, 200)}${s.description.length > 200 ? "..." : ""}`), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_react99.Link, {
    to: `/account/submissions/${s.id}/upload`
  }, "Upload More Files to This Submission"))))));
};
var submissions_default = Submissions;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/new.tsx
var new_exports = {};
__export(new_exports, {
  default: () => new_default
});
init_react();
var import_react102 = require("@remix-run/react");

// app/hooks/useAudioItems.ts
init_react();
var import_react100 = require("react");
var import_client47 = __toESM(require_main());
var AUDIO_ITEMS_QUERY = import_client47.gql`
	query AudioItems($input: AudioItemsInput!) {
		audioItems(input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var useAudioItems = ({
  sortBy = "RecentlyTagged" /* RecentlyTagged */,
  resultsPerPage = 10,
  queryOptions = {}
} = {}) => {
  const [skip, setSkip] = (0, import_react100.useState)(0);
  const [audioItems, setAudioItems] = (0, import_react100.useState)();
  (0, import_react100.useEffect)(() => {
    setAudioItems(void 0);
    setSkip(0);
  }, [sortBy]);
  const [getAudioItems, audioItemsQuery] = (0, import_client47.useLazyQuery)(AUDIO_ITEMS_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data, fetchMore } = audioItemsQuery;
  (0, import_react100.useEffect)(() => {
    if (data == null ? void 0 : data.audioItems) {
      setAudioItems(data.audioItems);
    }
  }, [data]);
  (0, import_react100.useEffect)(() => {
    getAudioItems({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage + skip,
          skip: 0,
          status: "Published" /* Published */
        }
      }
    });
  }, [getAudioItems, resultsPerPage, sortBy, skip]);
  const fetchNextPage = (0, import_react100.useCallback)(async () => {
    const numToSkip = (audioItems == null ? void 0 : audioItems.length) ?? 0;
    await fetchMore({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage,
          status: "Published" /* Published */,
          skip: numToSkip
        }
      }
    });
    setSkip(numToSkip);
  }, [fetchMore, resultsPerPage, audioItems, sortBy]);
  return [audioItems, audioItemsQuery, fetchNextPage];
};
var useAudioItems_default = useAudioItems;

// app/components/CreateAudioItemForm.tsx
init_react();
var import_react101 = require("react");
var import_client48 = __toESM(require_main());
var CREATE_AUDIO_ITEM_MUTATION = import_client48.gql`
	mutation CreateAudioItem($input: CreateAudioItemInput!) {
		createAudioItem(input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var CreateAudioItemForm = ({ onSuccess }) => {
  const [createAudioItem, { loading, error, data }] = (0, import_client48.useMutation)(CREATE_AUDIO_ITEM_MUTATION, { errorPolicy: "all" });
  const [name, setName] = (0, import_react101.useState)("");
  const [urlSource, setUrlSource] = (0, import_react101.useState)("");
  const [slug, setSlug] = (0, import_react101.useState)("");
  const [aliases, setAliases] = (0, import_react101.useState)("");
  const [description, setDescription] = (0, import_react101.useState)("");
  (0, import_react101.useEffect)(() => {
    const proposedSlug = Entity_default.cleanSlug(name ?? "");
    setSlug(proposedSlug);
  }, [name]);
  const onCreateAudioItem = (event) => {
    event.preventDefault();
    createAudioItem({
      variables: { input: { name, urlSource, slug, aliases, description } }
    });
  };
  (0, import_react101.useEffect)(() => {
    if (data == null ? void 0 : data.createAudioItem) {
      if (onSuccess) {
        return onSuccess(data.createAudioItem);
      }
      window.alert("Audio Item created successfully!");
      setName("");
      setUrlSource("");
      setSlug("");
      setAliases("");
      setDescription("");
    }
  }, [data]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onCreateAudioItem
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    autoFocus: true,
    className: "mb-2",
    value: name,
    onChange: (event) => setName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "URL of Source File (ie. https://www.example.com/file.mp3)",
    className: "mb-2",
    value: urlSource,
    onChange: (event) => setUrlSource(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "URL slug (ie. finbarr-dwyer-live-at-dolans)",
    className: "mb-2",
    value: slug,
    onChange: (event) => setSlug(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "This will be used for the URL of this AudioItem, for example", " ", `https://trad-archive.com/entities/audio-items/${slug || "finbarr-dwyer-live-at-dolans"}`), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this AudioItem. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Finbarr and Brian, Finbarr '08 at Dolan's")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 5,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Create"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-4"
  }, error.message));
};
var CreateAudioItemForm_default = CreateAudioItemForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/audio-items/new.tsx
var NewAudioItem = () => {
  const navigate = (0, import_react102.useNavigate)();
  const [_, { refetch }] = useAudioItems_default();
  const onCreateSuccess = async (audioItem) => {
    await refetch();
    navigate(`/entities/audio-items/${audioItem.slug}`);
  };
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Create Audio Item"), /* @__PURE__ */ React.createElement(CreateAudioItemForm_default, {
    onSuccess: onCreateSuccess
  }))));
};
var new_default = NewAudioItem;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/collections/new.tsx
var new_exports2 = {};
__export(new_exports2, {
  default: () => new_default2
});
init_react();
var import_react103 = require("@remix-run/react");
var NewCollection = () => {
  const navigate = (0, import_react103.useNavigate)();
  const onCreateSuccess = (collection) => {
    navigate(`/entities/collections/${collection.slug}`);
  };
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Create Collection"), /* @__PURE__ */ React.createElement(CreateCollectionForm_default, {
    onSuccess: onCreateSuccess
  }))));
};
var new_default2 = NewCollection;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/instruments/new.tsx
var new_exports3 = {};
__export(new_exports3, {
  default: () => new_default3
});
init_react();
var import_react104 = require("@remix-run/react");
var NewInstrument = () => {
  const navigate = (0, import_react104.useNavigate)();
  const onCreateSuccess = (instrument) => {
    navigate(`/entities/instruments/${instrument.slug}`);
  };
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Create Instrument"), /* @__PURE__ */ React.createElement(CreateInstrumentForm_default, {
    onSuccess: onCreateSuccess
  }))));
};
var new_default3 = NewInstrument;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/new.tsx
var new_exports4 = {};
__export(new_exports4, {
  default: () => new_default4
});
init_react();
var import_react106 = require("@remix-run/react");

// app/components/CreateSubmissionForm.tsx
init_react();
var import_react105 = require("react");
var import_client49 = __toESM(require_main());

// app/components/Checkbox.tsx
init_react();
var Checkbox = ({ checked, label, id, onChange, className }) => {
  const inputId = id ?? `input_${Math.round(Math.random() * 1e5)}`;
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-row items-top justify-start ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("input", {
    type: "checkbox",
    checked,
    onChange,
    id: inputId,
    className: "mt-1 mr-2"
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: inputId
  }, label));
};
var Checkbox_default = Checkbox;

// app/components/CreateSubmissionForm.tsx
var CREATE_SUBMISSION = import_client49.gql`
	mutation CreateSubmission($input: CreateSubmissionInput!) {
		createSubmission(input: $input) {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`;
var CreateSubmissionForm = ({ onSuccess }) => {
  const [currentUser] = useCurrentUser_default();
  const [materialTypes, setMaterialTypes] = (0, import_react105.useState)([]);
  const [userControlsCopyright, setUserControlsCopyright] = (0, import_react105.useState)(true);
  const [copyrightDetails, setCopyrightDetails] = (0, import_react105.useState)("");
  const [description, setDescription] = (0, import_react105.useState)("");
  const [userGrantsPermissionToITMA, setUserGrantsPermissionToITMA] = (0, import_react105.useState)(false);
  const [validationError, setValidationError] = (0, import_react105.useState)("");
  const [createSubmission, { loading, data, error }] = (0, import_client49.useMutation)(CREATE_SUBMISSION, { errorPolicy: "all" });
  const onMaterialTypeChecked = (materialType, isChecked) => {
    if (isChecked) {
      setMaterialTypes(materialTypes.concat(materialType));
    } else {
      setMaterialTypes(materialTypes.filter((mt) => mt !== materialType));
    }
  };
  const materialTypeIsChecked = (materialType) => {
    return materialTypes.includes(materialType);
  };
  const onSubmitForm = (event) => {
    event.preventDefault();
    setValidationError("");
    if (!userControlsCopyright && !copyrightDetails) {
      setValidationError("Please provide details on who controls the copyright for these items");
      return;
    }
    if (!description) {
      setValidationError("Please describe the items you are submitting");
      return;
    }
    const input = {
      materialTypes,
      userControlsCopyright,
      copyrightDetails,
      description
    };
    try {
      createSubmission({
        variables: {
          input
        }
      });
    } catch {
    }
  };
  (0, import_react105.useEffect)(() => {
    var _a;
    if (((_a = data == null ? void 0 : data.createSubmission) == null ? void 0 : _a.id) && onSuccess) {
      onSuccess(data.createSubmission);
    }
  }, [data, onSuccess]);
  return /* @__PURE__ */ React.createElement("form", {
    className: "flex flex-col items-start",
    onSubmit: onSubmitForm
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col mb-5"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "What types of material would you like to upload?"), /* @__PURE__ */ React.createElement(Checkbox_default, {
    id: "audio",
    label: "Audio",
    checked: materialTypeIsChecked("Audio" /* Audio */),
    onChange: (e) => onMaterialTypeChecked("Audio" /* Audio */, e.target.checked),
    className: "mb-1"
  }), /* @__PURE__ */ React.createElement(Checkbox_default, {
    id: "video",
    label: "Video",
    checked: materialTypeIsChecked("Video" /* Video */),
    onChange: (e) => onMaterialTypeChecked("Video" /* Video */, e.target.checked),
    className: "mb-1"
  }), /* @__PURE__ */ React.createElement(Checkbox_default, {
    id: "image",
    label: "Image",
    checked: materialTypeIsChecked("Image" /* Image */),
    onChange: (e) => onMaterialTypeChecked("Image" /* Image */, e.target.checked),
    className: "mb-1"
  }), /* @__PURE__ */ React.createElement(Checkbox_default, {
    id: "document",
    label: "Document",
    checked: materialTypeIsChecked("Document" /* Document */),
    onChange: (e) => onMaterialTypeChecked("Document" /* Document */, e.target.checked),
    className: "mb-1"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "Do you control the copyright for these items?"), /* @__PURE__ */ React.createElement("select", {
    className: "mb-6",
    value: userControlsCopyright ? "Yes" : "No",
    onChange: (event) => setUserControlsCopyright(event.target.value === "Yes" ? true : false)
  }, /* @__PURE__ */ React.createElement("option", {
    value: "Yes"
  }, "Yes"), /* @__PURE__ */ React.createElement("option", {
    value: "No"
  }, "No")), !userControlsCopyright && /* @__PURE__ */ React.createElement("div", {
    className: "mb-6"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "Who controls the copyright? Are you donating on someone's behalf?"), /* @__PURE__ */ React.createElement("textarea", {
    rows: 3,
    value: copyrightDetails,
    onChange: (e) => setCopyrightDetails(e.target.value)
  })), /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "Please describe this material:", /* @__PURE__ */ React.createElement("br", null), "- Who collected it?", /* @__PURE__ */ React.createElement("br", null), "- Who originally recorded it?", /* @__PURE__ */ React.createElement("br", null), "- Who is featured in these items?", /* @__PURE__ */ React.createElement("br", null), "- What are the recording dates?", /* @__PURE__ */ React.createElement("br", null), "- What are the recording locations?", /* @__PURE__ */ React.createElement("br", null), "- Any other comments you'd like to add?"), /* @__PURE__ */ React.createElement("textarea", {
    className: "mb-6",
    rows: 12,
    value: description,
    onChange: (e) => setDescription(e.target.value)
  }), /* @__PURE__ */ React.createElement(Checkbox_default, {
    className: "mb-6",
    checked: userGrantsPermissionToITMA,
    label: "By clicking this box, I consent to upload and give the digitised\n			material to the Irish Traditional Music Archive (Dublin, Ireland). ITMA\n			reserves the right to retain or delete at any time this material based on\n			its collection policy.",
    onChange: (e) => setUserGrantsPermissionToITMA(e.target.checked)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    value: "Save and Continue to Upload",
    disabled: loading || !userGrantsPermissionToITMA
  }), validationError && /* @__PURE__ */ React.createElement("div", {
    className: "mt-4 text-red-600"
  }, validationError), error && /* @__PURE__ */ React.createElement("div", {
    className: "mt-4 text-red-600"
  }, "Error saving Submission. Please reload the page and try again."), /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500 italic mt-6"
  }, "As per ITMA's Data Protection policy the information provided on this form will not be used for any other purpose; it will be stored securely and will not be shared with any third parties."));
};
var CreateSubmissionForm_default = CreateSubmissionForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/submissions/new.tsx
var SubmissionsNew = () => {
  const navigate = (0, import_react106.useNavigate)();
  const onCreateSuccess = (submission) => {
    navigate(`/account/submissions/${submission.id}/upload`);
  };
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Account",
        href: "/account"
      },
      {
        label: "Submissions",
        href: "/account/submissions"
      },
      { label: "Create a New Submission" }
    ],
    className: "mb-4"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "max-w-full md:max-w-xl"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-6 text-gray-500"
  }, "Welcome! Please use this page if you would like to submit material to be considered for acceptance into ITMA's permanent collection. Submission is easy: just fill in the form below to provide information about the sound recordings, videos, photographs or documents you are sharing, then upload your files. Thank you for your contribution."), /* @__PURE__ */ React.createElement(CreateSubmissionForm_default, {
    onSuccess: onCreateSuccess
  }))));
};
var new_default4 = SubmissionsNew;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/submissions/index.tsx
var submissions_exports2 = {};
__export(submissions_exports2, {
  default: () => submissions_default2
});
init_react();
var import_react107 = require("@remix-run/react");
var import_client50 = __toESM(require_main());
var SUBMISSIONS = import_client50.gql`
	query Submissions($input: SubmissionsInput!) {
		submissions(input: $input) {
			...Submission
		}
	}
	${SubmissionFragments.submission}
`;
var AdminSubmissions = () => {
  const { data, loading } = (0, import_client50.useQuery)(SUBMISSIONS, {
    variables: { input: { take: 100, skip: 0 } },
    fetchPolicy: "cache-and-network"
  });
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Admin",
        href: "/admin"
      },
      { label: "Submissions" }
    ],
    className: "mb-6"
  }), !data && loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), data && /* @__PURE__ */ React.createElement("ul", null, data.submissions.map((s, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-4",
    key: index
  }, DateTime_default.formatDateYearTime(s.createdAt, true), " (", s.materialTypes.join(", "), ") - Status: ", s.status, /* @__PURE__ */ React.createElement("br", null), "From ", s.createdByUser.username, " / ", s.createdByUser.email, /* @__PURE__ */ React.createElement("br", null), "Owns copyright? ", s.userControlsCopyright ? "Yes" : "No", s.copyrightDetails ? ` - ${s.copyrightDetails}` : "", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, s.description), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement(import_react107.Link, {
    to: `/admin/submissions/${s.id}`
  }, "View Files"))))));
};
var submissions_default2 = AdminSubmissions;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/takedown-requests.tsx
var takedown_requests_exports = {};
__export(takedown_requests_exports, {
  default: () => takedown_requests_default
});
init_react();
var import_react108 = require("react");
var import_client51 = __toESM(require_main());
var import_compareDesc3 = __toESM(require("date-fns/compareDesc"));
var TAKEDOWN_REQUESTS = import_client51.gql`
	query TakedownRequests($input: TakedownRequestsInput!) {
		takedownRequests(input: $input) {
			...TakedownRequest
		}
	}
	${TakedownRequestFragments.takedownRequest}
`;
var UPDATE_TAKEDOWN_REQUEST_STATUS = import_client51.gql`
	mutation UpdateTakedownRequestStatus(
		$input: UpdateTakedownRequestStatusInput!
	) {
		updateTakedownRequestStatus(input: $input) {
			...TakedownRequest
		}
	}
	${TakedownRequestFragments.takedownRequest}
`;
var TakedownRequests = () => {
  const {
    loading: takedownRequestsLoading,
    data: takedownRequestsData,
    error: takedownRequestsError
  } = (0, import_client51.useQuery)(TAKEDOWN_REQUESTS, {
    variables: { input: { take: 200, skip: 0 } },
    fetchPolicy: "network-only"
  });
  const takedownRequests = (0, import_react108.useMemo)(() => {
    if (!(takedownRequestsData == null ? void 0 : takedownRequestsData.takedownRequests)) {
      return [];
    }
    const sortedTakedownRequests = [...takedownRequestsData.takedownRequests];
    sortedTakedownRequests.sort((a, b) => (0, import_compareDesc3.default)(new Date(a.createdAt), new Date(b.createdAt)));
    return sortedTakedownRequests;
  }, [takedownRequestsData]);
  const [
    updateTakedownRequestStatus,
    {
      loading: updateTakedownRequestStatusLoading,
      error: updateTakedownRequestStatusError
    }
  ] = (0, import_client51.useMutation)(UPDATE_TAKEDOWN_REQUEST_STATUS, { errorPolicy: "all" });
  const onApproveClicked = (id) => {
    updateTakedownRequestStatus({
      variables: { input: { id, status: "Approved" /* Approved */ } }
    });
  };
  const onDenyClicked = (id) => {
    updateTakedownRequestStatus({
      variables: { input: { id, status: "Denied" /* Denied */ } }
    });
  };
  (0, import_react108.useEffect)(() => {
    if (updateTakedownRequestStatusError) {
      window.alert("Error updating Takedown Request status. Please reload the page and try again.");
    }
  }, [updateTakedownRequestStatusError]);
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Admin",
        href: "/admin"
      },
      { label: "Takedown Requests" }
    ],
    className: "mb-6"
  }), takedownRequestsLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), takedownRequestsError && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, takedownRequestsError.graphQLErrors.join(", ")), !takedownRequestsLoading && (takedownRequests == null ? void 0 : takedownRequests.map((takedownRequest, index) => {
    const {
      id,
      createdAt,
      createdByUser,
      entity,
      status,
      type,
      message
    } = takedownRequest;
    return /* @__PURE__ */ React.createElement("div", {
      className: "mb-4",
      key: index
    }, "Created ", DateTime_default.formatDateYearTime(createdAt), " by", " ", createdByUser.username, /* @__PURE__ */ React.createElement("br", null), "Email: ", createdByUser.email, /* @__PURE__ */ React.createElement("br", null), "Entity:", " ", /* @__PURE__ */ React.createElement("a", {
      href: Entity_default.makeHrefForView(entity),
      target: "_blank"
    }, entity.name), /* @__PURE__ */ React.createElement("br", null), "Takedown Type: ", type, /* @__PURE__ */ React.createElement("br", null), "Message: ", message, /* @__PURE__ */ React.createElement("br", null), "Status: ", status, /* @__PURE__ */ React.createElement("br", null), isApprovedTakedownRequest(takedownRequest) && /* @__PURE__ */ React.createElement("button", {
      className: "btn-text",
      disabled: updateTakedownRequestStatusLoading,
      onClick: () => onDenyClicked(id)
    }, "Deny"), isDeniedTakedownRequest(takedownRequest) && /* @__PURE__ */ React.createElement("button", {
      className: "btn-text",
      disabled: updateTakedownRequestStatusLoading,
      onClick: () => onApproveClicked(id)
    }, "Approve"), isPendingTakedownRequest(takedownRequest) && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("button", {
      className: "btn-text mr-4",
      disabled: updateTakedownRequestStatusLoading,
      onClick: () => onApproveClicked(id)
    }, "Approve"), /* @__PURE__ */ React.createElement("button", {
      className: "btn-text",
      disabled: updateTakedownRequestStatusLoading,
      onClick: () => onDenyClicked(id)
    }, "Deny")));
  })))));
};
var takedown_requests_default = TakedownRequests;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/submissions/[id].tsx
var id_exports = {};
__export(id_exports, {
  default: () => id_default
});
init_react();
var import_react109 = require("@remix-run/react");
var import_react110 = require("@remix-run/react");
var import_client52 = __toESM(require_main());
var SUBMISSION_WITH_FILES = import_client52.gql`
	query SubmissionWithFiles($id: String!) {
		submissionWithFiles(id: $id) {
			submission {
				...Submission
			}
			files {
				filename
				presignedDownloadUrl
			}
		}
	}
	${SubmissionFragments.submission}
`;
var AdminViewSubmissionById = () => {
  const navigate = (0, import_react110.useNavigate)();
  const { id } = navigate.query;
  const submissionId = typeof id === "string" ? id : void 0;
  const { data, loading } = (0, import_client52.useQuery)(SUBMISSION_WITH_FILES, {
    variables: { id: submissionId },
    skip: !submissionId,
    fetchPolicy: "cache-and-network"
  });
  const { submission, files } = (data == null ? void 0 : data.submissionWithFiles) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Admin",
        href: "/admin"
      },
      { label: "Submissions", href: "/admin/submissions" },
      {
        label: submission ? `${DateTime_default.formatDateYearTime(submission.createdAt, true)} from ${submission.createdByUser.username}` : "View Submission"
      }
    ],
    className: "mb-6"
  }), files && /* @__PURE__ */ React.createElement("ul", null, files.map((f, index) => /* @__PURE__ */ React.createElement("li", {
    className: "flex flex-row",
    key: index
  }, /* @__PURE__ */ React.createElement("div", {
    className: "pr-2"
  }, f.filename), /* @__PURE__ */ React.createElement(import_react109.Link, {
    to: f.presignedDownloadUrl
  }, /* @__PURE__ */ React.createElement("a", {
    target: "_blank"
  }, "View", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch")))))), !files && loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, {
    className: "mt-8"
  })));
};
var id_default = AdminViewSubmissionById;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/[slug].tsx
var slug_exports4 = {};
__export(slug_exports4, {
  PERSON_QUERY: () => PERSON_QUERY,
  default: () => slug_default4
});
init_react();
var import_react111 = require("@remix-run/react");
var import_client53 = __toESM(require_main());
var PERSON_QUERY = import_client53.gql`
	query Person($slug: String!) {
		person(slug: $slug) {
			...Person
		}
	}
	${EntityFragments.person}
`;
var ViewPersonBySlug = () => {
  const navigate = (0, import_react111.useNavigate)();
  const { slug } = navigate.query;
  const { data: personData, error: personError } = (0, import_client53.useQuery)(PERSON_QUERY, {
    variables: { slug },
    skip: !slug
  });
  const { person } = personData ?? {};
  let statusMessage;
  if (!personData && !personError) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!personData && personError) {
    statusMessage = `Error fetching Person with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${person.name}`
  }, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: person
  }));
};
var slug_default4 = ViewPersonBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/[slug]/about.tsx
var about_exports4 = {};
__export(about_exports4, {
  default: () => about_default4
});
init_react();
var import_client55 = __toESM(require_main());
var import_react113 = require("@remix-run/react");
var import_react114 = require("@remix-run/react");

// app/routes/entities/people/[slug].tsx
init_react();
var import_react112 = require("@remix-run/react");
var import_client54 = __toESM(require_main());
var PERSON_QUERY2 = import_client54.gql`
	query Person($slug: String!) {
		person(slug: $slug) {
			...Person
		}
	}
	${EntityFragments.person}
`;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/[slug]/about.tsx
var PersonAbout = () => {
  const navigate = (0, import_react114.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client55.useQuery)(PERSON_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { name, description, aliases } = (data == null ? void 0 : data.person) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "People", href: "/entities/people" },
      { label: name, href: `/entities/people/${slug}` },
      { label: "About" }
    ],
    className: "mb-6"
  }), description && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Description:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 whitespace-pre-wrap"
  }, description)), aliases && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Aliases:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, aliases)), /* @__PURE__ */ React.createElement(import_react113.Link, {
    to: `/entities/people/${slug}/edit`
  }, "Edit")));
};
var about_default4 = PersonAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/[slug]/edit.tsx
var edit_exports4 = {};
__export(edit_exports4, {
  default: () => edit_default4
});
init_react();
var import_react117 = require("@remix-run/react");
var import_client57 = __toESM(require_main());

// app/components/EditPersonForm.tsx
init_react();
var import_react115 = require("react");
var import_client56 = __toESM(require_main());
var import_react116 = require("@remix-run/react");
var UPDATE_PERSON_MUTATION = import_client56.gql`
	mutation UpdatePerson($slug: String!, $input: UpdatePersonInput!) {
		updatePerson(slug: $slug, input: $input) {
			...Person
		}
	}
	${EntityFragments.person}
`;
var EditPersonForm = ({ person, onSuccess }) => {
  const navigate = (0, import_react116.useNavigate)();
  const [updatePerson, { loading, error, data }] = (0, import_client56.useMutation)(UPDATE_PERSON_MUTATION, {
    errorPolicy: "all"
  });
  const [firstName, setFirstName] = (0, import_react115.useState)(person.firstName);
  const [middleName, setMiddleName] = (0, import_react115.useState)(person.middleName);
  const [lastName, setLastName] = (0, import_react115.useState)(person.lastName);
  const [aliases, setAliases] = (0, import_react115.useState)(person.aliases);
  const [description, setDescription] = (0, import_react115.useState)(person.description);
  const onUpdatePerson = (event) => {
    event.preventDefault();
    const input = {
      firstName,
      middleName,
      lastName,
      aliases,
      description
    };
    updatePerson({ variables: { slug: person.slug, input } });
  };
  (0, import_react115.useEffect)(() => {
    if (data == null ? void 0 : data.updatePerson) {
      if (onSuccess) {
        return onSuccess(data.updatePerson);
      }
      window.alert("Person updated successfully!");
    }
  }, [data, navigate]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onUpdatePerson
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "First name",
    autoFocus: true,
    className: "mb-2",
    value: firstName,
    onChange: (event) => setFirstName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Middle name (optional)",
    className: "mb-2",
    value: middleName,
    onChange: (event) => setMiddleName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Last name",
    className: "mb-2",
    value: lastName,
    onChange: (event) => setLastName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Person. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Tony D, The Tradfather, Tony from the County Calamari")), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 10,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Save"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var EditPersonForm_default = EditPersonForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/[slug]/edit.tsx
var PERSON_QUERY3 = import_client57.gql`
	query Person($slug: String!) {
		person(slug: $slug) {
			...Person
		}
	}
	${EntityFragments.person}
`;
var EditPerson = () => {
  const navigate = (0, import_react117.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client57.useQuery)(PERSON_QUERY3, {
    variables: { slug },
    skip: !slug
  });
  const onEditSuccess = (person2) => {
    navigate(`/entities/people/${person2.slug}`);
  };
  let statusMessage;
  if (!data && !error) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!data && error) {
    statusMessage = `Error fetching Person with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const { person } = data;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Edit Person: ", person.name), /* @__PURE__ */ React.createElement(EditPersonForm_default, {
    person,
    onSuccess: onEditSuccess
  }))));
};
var edit_default4 = EditPerson;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/[slug]/tags.tsx
var tags_exports4 = {};
__export(tags_exports4, {
  default: () => tags_default4
});
init_react();
var import_client58 = __toESM(require_main());
var import_react118 = require("@remix-run/react");
var PersonTags = () => {
  const navigate = (0, import_react118.useNavigate)();
  const { slug } = navigate.query;
  const { data, error, refetch } = (0, import_client58.useQuery)(PERSON_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { person } = data ?? {};
  const { name, tags } = person ?? {};
  const sortedTags = Tag_default.sort(tags);
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - Tags`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "People", href: "/entities/people" },
      { label: name, href: `/entities/people/${slug}` },
      { label: "Tags" }
    ],
    className: "mb-6"
  }), sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement(TagWithRelationshipToObject_default, {
    tag,
    key: index,
    className: "mb-4"
  })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AddTagButton_default, {
    entity: person,
    onSuccess: refetch
  }), sortedTags.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 px-2"
  }, "/"), /* @__PURE__ */ React.createElement(EditTagsButton_default, {
    entity: person,
    onSuccess: refetch
  })))));
};
var tags_default4 = PersonTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/[slug].tsx
var slug_exports5 = {};
__export(slug_exports5, {
  PLACE_QUERY: () => PLACE_QUERY,
  default: () => slug_default5
});
init_react();
var import_react119 = require("@remix-run/react");
var import_client59 = __toESM(require_main());
var PLACE_QUERY = import_client59.gql`
	query Place($slug: String!) {
		place(slug: $slug) {
			...Place
		}
	}
	${EntityFragments.place}
`;
var ViewPlaceBySlug = () => {
  const navigate = (0, import_react119.useNavigate)();
  const { slug } = navigate.query;
  const { data: placeData, error: placeError } = (0, import_client59.useQuery)(PLACE_QUERY, {
    variables: { slug },
    skip: !slug
  });
  const { place } = placeData ?? {};
  let statusMessage;
  if (!placeData && !placeError) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!placeData && placeError) {
    statusMessage = `Error fetching Place with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${place.name}`
  }, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: place
  }));
};
var slug_default5 = ViewPlaceBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/[slug]/about.tsx
var about_exports5 = {};
__export(about_exports5, {
  default: () => about_default5
});
init_react();
var import_client61 = __toESM(require_main());
var import_react121 = require("@remix-run/react");
var import_react122 = require("@remix-run/react");

// app/routes/entities/places/[slug].tsx
init_react();
var import_react120 = require("@remix-run/react");
var import_client60 = __toESM(require_main());
var PLACE_QUERY2 = import_client60.gql`
	query Place($slug: String!) {
		place(slug: $slug) {
			...Place
		}
	}
	${EntityFragments.place}
`;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/[slug]/about.tsx
var PlaceAbout = () => {
  const navigate = (0, import_react122.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client61.useQuery)(PLACE_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { name, description, aliases, latitude, longitude } = (data == null ? void 0 : data.place) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Places", href: "/entities/places" },
      { label: name, href: `/entities/places/${slug}` },
      { label: "About" }
    ],
    className: "mb-6"
  }), description && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Description:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 whitespace-pre-wrap"
  }, description)), aliases && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Aliases:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, aliases)), latitude && longitude && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Latitude and Longitude:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, latitude, ",", longitude), /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("a", {
    href: `https://www.google.com/maps/@?api=1&map_action=map&zoom=12&center=${latitude},${longitude}`,
    target: "_blank",
    rel: "noreferrer"
  }, "View on Map ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-base"
  }, "launch"))), /* @__PURE__ */ React.createElement(import_react121.Link, {
    to: `/entities/places/${slug}/edit`
  }, "Edit")));
};
var about_default5 = PlaceAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/[slug]/edit.tsx
var edit_exports5 = {};
__export(edit_exports5, {
  default: () => edit_default5
});
init_react();
var import_react125 = require("@remix-run/react");
var import_client63 = __toESM(require_main());

// app/components/EditPlaceForm.tsx
init_react();
var import_react123 = require("react");
var import_client62 = __toESM(require_main());
var import_react124 = require("@remix-run/react");
var UPDATE_PLACE_MUTATION = import_client62.gql`
	mutation UpdatePlace($slug: String!, $input: UpdatePlaceInput!) {
		updatePlace(slug: $slug, input: $input) {
			...Place
		}
	}
	${EntityFragments.place}
`;
var EditPlaceForm = ({ place, onSuccess }) => {
  const navigate = (0, import_react124.useNavigate)();
  const [updatePlace, { loading, error, data }] = (0, import_client62.useMutation)(UPDATE_PLACE_MUTATION, {
    errorPolicy: "all"
  });
  const [name, setName] = (0, import_react123.useState)(place.name);
  const [aliases, setAliases] = (0, import_react123.useState)(place.aliases);
  const [latitude, setLatitude] = (0, import_react123.useState)(place.latitude.toString());
  const [longitude, setLongitude] = (0, import_react123.useState)(place.longitude.toString());
  const [description, setDescription] = (0, import_react123.useState)(place.description);
  const onUpdatePlace = (event) => {
    event.preventDefault();
    const input = {
      name,
      aliases,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      description
    };
    updatePlace({ variables: { slug: place.slug, input } });
  };
  (0, import_react123.useEffect)(() => {
    if (data == null ? void 0 : data.updatePlace) {
      if (onSuccess) {
        return onSuccess(data.updatePlace);
      }
      window.alert("Place updated successfully!");
    }
  }, [data, navigate]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onUpdatePlace
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Name",
    className: "mb-2",
    value: name,
    onChange: (event) => setName(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Aliases",
    className: "mb-2",
    value: aliases,
    onChange: (event) => setAliases(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "A list of comma-separated aliases for this Place. For example:", " ", /* @__PURE__ */ React.createElement("em", null, "Gaillimh, The City of Tribes")), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Latitude",
    className: "mb-2",
    value: latitude,
    onChange: (event) => setLatitude(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Longitude",
    className: "mb-2",
    value: longitude,
    onChange: (event) => setLongitude(event.target.value)
  }), /* @__PURE__ */ React.createElement("div", {
    className: "text-sm text-gray-400 mb-2 ml-2"
  }, "To view the current latitude and longitude coordinates, visit", " ", /* @__PURE__ */ React.createElement("a", {
    href: `https://www.google.com/maps/@?api=1&map_action=map&zoom=12&center=${latitude},${longitude}`,
    target: "_blank",
    rel: "noreferrer"
  }, latitude, ",", longitude, " on Google Maps (will open in new tab)"), `. To pick new coordinates, right-click on the exact location you'd like, and you'll see numbers like "53.2838294,-9.1888286". Click to copy them to your clipboard. The first one is latitude, and the second is longitude.`), /* @__PURE__ */ React.createElement("textarea", {
    placeholder: "Description",
    className: "mb-2",
    value: description,
    rows: 10,
    onChange: (event) => setDescription(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Save"
  }))), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, error.message));
};
var EditPlaceForm_default = EditPlaceForm;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/[slug]/edit.tsx
var PLACE_QUERY3 = import_client63.gql`
	query Place($slug: String!) {
		place(slug: $slug) {
			...Place
		}
	}
	${EntityFragments.place}
`;
var EditPlace = () => {
  const navigate = (0, import_react125.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client63.useQuery)(PLACE_QUERY3, {
    variables: { slug },
    skip: !slug
  });
  const onEditSuccess = (place2) => {
    navigate(`/entities/places/${place2.slug}`);
  };
  let statusMessage;
  if (!data && !error) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!data && error) {
    statusMessage = `Error fetching Place with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const { place } = data;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Edit Place: ", place.name), /* @__PURE__ */ React.createElement(EditPlaceForm_default, {
    place,
    onSuccess: onEditSuccess
  }))));
};
var edit_default5 = EditPlace;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/[slug]/tags.tsx
var tags_exports5 = {};
__export(tags_exports5, {
  default: () => tags_default5
});
init_react();
var import_client64 = __toESM(require_main());
var import_react126 = require("@remix-run/react");
var PlaceTags = () => {
  const navigate = (0, import_react126.useNavigate)();
  const { slug } = navigate.query;
  const { data, error, refetch } = (0, import_client64.useQuery)(PLACE_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { place } = data ?? {};
  const { name, tags } = place ?? {};
  const sortedTags = Tag_default.sort(tags);
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - Tags`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Places", href: "/entities/places" },
      { label: name, href: `/entities/places/${slug}` },
      { label: "Tags" }
    ],
    className: "mb-6"
  }), sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement(TagWithRelationshipToObject_default, {
    tag,
    key: index,
    className: "mb-4"
  })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AddTagButton_default, {
    entity: place,
    onSuccess: refetch
  }), sortedTags.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 px-2"
  }, "/"), /* @__PURE__ */ React.createElement(EditTagsButton_default, {
    entity: place,
    onSuccess: refetch
  })))));
};
var tags_default5 = PlaceTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/index.tsx
var people_exports = {};
__export(people_exports, {
  default: () => people_default
});
init_react();
var import_react128 = require("@remix-run/react");

// app/hooks/usePeople.ts
init_react();
var import_react127 = require("react");
var import_client65 = __toESM(require_main());
var PEOPLE_QUERY = import_client65.gql`
	query People($input: PeopleInput!) {
		people(input: $input) {
			...Person
		}
	}
	${EntityFragments.person}
`;
var usePeople = ({
  sortBy = "AToZ" /* AToZ */,
  resultsPerPage = 20,
  queryOptions = {}
} = {}) => {
  const [skip, setSkip] = (0, import_react127.useState)(0);
  const [people, setPeople] = (0, import_react127.useState)();
  (0, import_react127.useEffect)(() => {
    setPeople(void 0);
    setSkip(0);
  }, [sortBy]);
  const [getPeople, peopleQuery] = (0, import_client65.useLazyQuery)(PEOPLE_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data, fetchMore } = peopleQuery;
  (0, import_react127.useEffect)(() => {
    if (data == null ? void 0 : data.people) {
      setPeople(data.people);
    }
  }, [data]);
  (0, import_react127.useEffect)(() => {
    getPeople({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage + skip,
          skip: 0
        }
      }
    });
  }, [getPeople, resultsPerPage, sortBy, skip]);
  const fetchNextPage = (0, import_react127.useCallback)(async () => {
    const numToSkip = (people == null ? void 0 : people.length) ?? 0;
    await fetchMore({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage,
          skip: numToSkip
        }
      }
    });
    setSkip(numToSkip);
  }, [fetchMore, resultsPerPage, people, sortBy]);
  return [people, peopleQuery, fetchNextPage];
};
var usePeople_default = usePeople;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/index.tsx
var People = () => {
  const [people, { loading, error }, fetchNextPage] = usePeople_default({
    resultsPerPage: 50
  });
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - People`
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "People"), !loading && error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching People"), !loading && (people == null ? void 0 : people.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No People found"), (people == null ? void 0 : people.length) > 0 && /* @__PURE__ */ React.createElement("ul", null, people.map((person, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react128.Link, {
    to: Entity_default.makeHrefForView(person)
  }, person.name)))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-6"
  }, loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), !loading && (people == null ? void 0 : people.length) > 0 && /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: fetchNextPage
  }, "Load More")));
};
var people_default = People;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/index.tsx
var places_exports = {};
__export(places_exports, {
  default: () => places_default
});
init_react();
var import_react130 = require("@remix-run/react");

// app/hooks/usePlaces.ts
init_react();
var import_react129 = require("react");
var import_client66 = __toESM(require_main());
var PLACES_QUERY = import_client66.gql`
	query Places($input: PlacesInput!) {
		places(input: $input) {
			...Place
		}
	}
	${EntityFragments.place}
`;
var usePlaces = ({
  sortBy = "AToZ" /* AToZ */,
  resultsPerPage = 20,
  queryOptions = {}
} = {}) => {
  const [skip, setSkip] = (0, import_react129.useState)(0);
  const [places, setPlaces] = (0, import_react129.useState)();
  (0, import_react129.useEffect)(() => {
    setPlaces(void 0);
    setSkip(0);
  }, [sortBy]);
  const [getPlaces, placesQuery] = (0, import_client66.useLazyQuery)(PLACES_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data, fetchMore } = placesQuery;
  (0, import_react129.useEffect)(() => {
    if (data == null ? void 0 : data.places) {
      setPlaces(data.places);
    }
  }, [data]);
  (0, import_react129.useEffect)(() => {
    getPlaces({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage + skip,
          skip: 0
        }
      }
    });
  }, [getPlaces, resultsPerPage, sortBy, skip]);
  const fetchNextPage = (0, import_react129.useCallback)(async () => {
    const numToSkip = (places == null ? void 0 : places.length) ?? 0;
    await fetchMore({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage,
          skip: numToSkip
        }
      }
    });
    setSkip(numToSkip);
  }, [fetchMore, resultsPerPage, places, sortBy]);
  return [places, placesQuery, fetchNextPage];
};
var usePlaces_default = usePlaces;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/index.tsx
var Places = () => {
  const [places, { loading, error }, fetchNextPage] = usePlaces_default({
    resultsPerPage: 50
  });
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - Places`
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Places"), !loading && error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching Places"), !loading && (places == null ? void 0 : places.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Places found"), (places == null ? void 0 : places.length) > 0 && /* @__PURE__ */ React.createElement("ul", null, places.map((place, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react130.Link, {
    to: Entity_default.makeHrefForView(place)
  }, place.name)))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-6"
  }, loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), !loading && (places == null ? void 0 : places.length) > 0 && /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: fetchNextPage
  }, "Load More")));
};
var places_default = Places;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/[slug].tsx
var slug_exports6 = {};
__export(slug_exports6, {
  TUNE_QUERY: () => TUNE_QUERY,
  default: () => slug_default6
});
init_react();
var import_react131 = require("@remix-run/react");
var import_client67 = __toESM(require_main());
var TUNE_QUERY = import_client67.gql`
	query Tune($slug: String!) {
		tune(slug: $slug) {
			...Tune
		}
	}
	${EntityFragments.tune}
`;
var ViewTuneBySlug = () => {
  const navigate = (0, import_react131.useNavigate)();
  const { slug } = navigate.query;
  const { data: tuneData, error: tuneError } = (0, import_client67.useQuery)(TUNE_QUERY, {
    variables: { slug },
    skip: !slug
  });
  const { tune } = tuneData ?? {};
  let statusMessage;
  if (!tuneData && !tuneError) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!tuneData && tuneError) {
    statusMessage = `Error fetching Tune with slug ${slug}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${tune.name}`
  }, /* @__PURE__ */ React.createElement(ViewEntityAndAudioItems_default, {
    entity: tune
  }));
};
var slug_default6 = ViewTuneBySlug;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/[slug]/about.tsx
var about_exports6 = {};
__export(about_exports6, {
  default: () => about_default6
});
init_react();
var import_client69 = __toESM(require_main());
var import_react133 = require("@remix-run/react");
var import_react134 = require("@remix-run/react");

// app/routes/entities/tunes/[slug].tsx
init_react();
var import_react132 = require("@remix-run/react");
var import_client68 = __toESM(require_main());
var TUNE_QUERY2 = import_client68.gql`
	query Tune($slug: String!) {
		tune(slug: $slug) {
			...Tune
		}
	}
	${EntityFragments.tune}
`;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/[slug]/about.tsx
var TuneAbout = () => {
  const navigate = (0, import_react134.useNavigate)();
  const { slug } = navigate.query;
  const { data, error } = (0, import_client69.useQuery)(TUNE_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { name, aliases, theSessionTuneId, type, meter, mode, abc } = (data == null ? void 0 : data.tune) ?? {};
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - About`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Tunes", href: "/entities/tunes" },
      { label: name, href: `/entities/tunes/${slug}` },
      { label: "About" }
    ],
    className: "mb-6"
  }), theSessionTuneId && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "italic text-gray-500"
  }, "We source all of our Tune data from a wonderful community project called The Session."), /* @__PURE__ */ React.createElement("a", {
    href: `https://thesession.org/tunes/${theSessionTuneId}`,
    target: "_blank",
    rel: "noreferrer"
  }, "View or Edit This Tune on The Session", " ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch"))), aliases && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Aliases:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, aliases)), type && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Type:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, type)), meter && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Meter:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, meter)), mode && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Mode:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, mode)), abc && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "ABC:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, abc)), /* @__PURE__ */ React.createElement(import_react133.Link, {
    to: `/entities/tunes/${slug}/edit`
  }, "Edit")));
};
var about_default6 = TuneAbout;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/[slug]/tags.tsx
var tags_exports6 = {};
__export(tags_exports6, {
  default: () => tags_default6
});
init_react();
var import_client70 = __toESM(require_main());
var import_react135 = require("@remix-run/react");
var TuneTags = () => {
  const navigate = (0, import_react135.useNavigate)();
  const { slug } = navigate.query;
  const { data, error, refetch } = (0, import_client70.useQuery)(TUNE_QUERY2, {
    variables: { slug },
    skip: !slug
  });
  const isLoading = !data && !error;
  const { tune } = data ?? {};
  const { name, tags } = tune ?? {};
  const sortedTags = Tag_default.sort(tags);
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${name} - Tags`
  }, isLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-500"
  }, error.message), data && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      { label: "Tunes", href: "/entities/tunes" },
      { label: name, href: `/entities/tunes/${slug}` },
      { label: "Tags" }
    ],
    className: "mb-6"
  }), sortedTags.map((tag, index) => /* @__PURE__ */ React.createElement(TagWithRelationshipToObject_default, {
    tag,
    key: index,
    className: "mb-4"
  })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(AddTagButton_default, {
    entity: tune,
    onSuccess: refetch
  }), sortedTags.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500 px-2"
  }, "/"), /* @__PURE__ */ React.createElement(EditTagsButton_default, {
    entity: tune,
    onSuccess: refetch
  })))));
};
var tags_default6 = TuneTags;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/index.tsx
var tunes_exports = {};
__export(tunes_exports, {
  default: () => tunes_default
});
init_react();
var import_react137 = require("@remix-run/react");

// app/hooks/useTunes.ts
init_react();
var import_react136 = require("react");
var import_client71 = __toESM(require_main());
var TUNES_QUERY = import_client71.gql`
	query Tunes($input: TunesInput!) {
		tunes(input: $input) {
			...Tune
		}
	}
	${EntityFragments.tune}
`;
var useTunes = ({
  sortBy = "AToZ" /* AToZ */,
  resultsPerPage = 20,
  queryOptions = {}
} = {}) => {
  const [skip, setSkip] = (0, import_react136.useState)(0);
  const [tunes, setTunes] = (0, import_react136.useState)();
  (0, import_react136.useEffect)(() => {
    setTunes(void 0);
    setSkip(0);
  }, [sortBy]);
  const [getTunes, tunesQuery] = (0, import_client71.useLazyQuery)(TUNES_QUERY, __spreadValues({
    notifyOnNetworkStatusChange: true
  }, queryOptions));
  const { data, fetchMore } = tunesQuery;
  (0, import_react136.useEffect)(() => {
    if (data == null ? void 0 : data.tunes) {
      setTunes(data.tunes);
    }
  }, [data]);
  (0, import_react136.useEffect)(() => {
    getTunes({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage + skip,
          skip: 0
        }
      }
    });
  }, [getTunes, resultsPerPage, sortBy, skip]);
  const fetchNextPage = (0, import_react136.useCallback)(async () => {
    const numToSkip = (tunes == null ? void 0 : tunes.length) ?? 0;
    await fetchMore({
      variables: {
        input: {
          sortBy,
          take: resultsPerPage,
          skip: numToSkip
        }
      }
    });
    setSkip(numToSkip);
  }, [fetchMore, resultsPerPage, tunes, sortBy]);
  return [tunes, tunesQuery, fetchNextPage];
};
var useTunes_default = useTunes;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/tunes/index.tsx
var Tunes = () => {
  const [tunes, { loading, error }, fetchNextPage] = useTunes_default({
    resultsPerPage: 50
  });
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - Tunes`
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Tunes"), !loading && error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching Tunes"), !loading && (tunes == null ? void 0 : tunes.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Tunes found"), (tunes == null ? void 0 : tunes.length) > 0 && /* @__PURE__ */ React.createElement("ul", null, tunes.map((tune, index) => /* @__PURE__ */ React.createElement("li", {
    className: "mb-2",
    key: index
  }, /* @__PURE__ */ React.createElement(import_react137.Link, {
    to: Entity_default.makeHrefForView(tune)
  }, tune.name)))), /* @__PURE__ */ React.createElement("div", {
    className: "mt-6"
  }, loading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), !loading && (tunes == null ? void 0 : tunes.length) > 0 && /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: fetchNextPage
  }, "Load More")));
};
var tunes_default = Tunes;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/people/new.tsx
var new_exports5 = {};
__export(new_exports5, {
  default: () => new_default5
});
init_react();
var import_react138 = require("@remix-run/react");
var NewPerson = () => {
  const navigate = (0, import_react138.useNavigate)();
  const onCreateSuccess = (person) => {
    navigate(`/entities/people/${person.slug}`);
  };
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Create Person"), /* @__PURE__ */ React.createElement(CreatePersonForm_default, {
    onSuccess: onCreateSuccess
  }))));
};
var new_default5 = NewPerson;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/entities/places/new.tsx
var new_exports6 = {};
__export(new_exports6, {
  default: () => new_default6
});
init_react();
var import_react139 = require("@remix-run/react");
var NewPlace = () => {
  const navigate = (0, import_react139.useNavigate)();
  const onCreateSuccess = (place) => {
    navigate(`/entities/places/${place.slug}`);
  };
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "max-w-md"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Create Place"), /* @__PURE__ */ React.createElement(CreatePlaceForm_default, {
    onSuccess: onCreateSuccess
  }))));
};
var new_default6 = NewPlace;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/verify.tsx
var verify_exports = {};
__export(verify_exports, {
  default: () => verify_default
});
init_react();
var import_react141 = require("react");
var import_client73 = __toESM(require_main());
var import_react142 = require("@remix-run/react");

// app/hooks/useVerificationRequestsForCurrentUser.ts
init_react();
var import_react140 = require("react");
var import_client72 = __toESM(require_main());
var VERIFICATION_REQUESTS_FOR_CURRENT_USER_QUERY = import_client72.gql`
	query VerificationRequestsForCurrentUser {
		verificationRequestsForCurrentUser {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`;
var useVerificationRequestsForCurrentUser = () => {
  var _a;
  const [makeQuery, query] = (0, import_client72.useLazyQuery)(VERIFICATION_REQUESTS_FOR_CURRENT_USER_QUERY);
  (0, import_react140.useEffect)(() => {
    makeQuery();
  }, [makeQuery]);
  const verificationRequests = (_a = query == null ? void 0 : query.data) == null ? void 0 : _a.verificationRequestsForCurrentUser;
  return [verificationRequests, query];
};
var useVerificationRequestsForCurrentUser_default = useVerificationRequestsForCurrentUser;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/verify.tsx
var CREATE_PRESIGNED_UPLOAD_URL_MUTATION = import_client73.gql`
	mutation CreatePresignedUploadUrl($filename: String!) {
		createPresignedUploadUrlForVerificationImage(filename: $filename) {
			imageS3Key
			presignedUploadUrl
		}
	}
`;
var CREATE_VERIFICATION_REQUEST_MUTATION = import_client73.gql`
	mutation CreateVerificationRequest($input: CreateVerificationRequestInput!) {
		createVerificationRequest(input: $input) {
			...VerificationRequest
		}
	}
	${VerificationRequestFragments.verificationRequest}
`;
var AccountVerify = () => {
  const navigate = (0, import_react142.useNavigate)();
  const [
    _,
    {
      refetch: refetchVerificationRequestsForCurrentUser,
      loading: refetchVerificationRequestsIsLoading
    }
  ] = useVerificationRequestsForCurrentUser_default();
  const [personEntity, setPersonEntity] = (0, import_react141.useState)();
  const [imageFile, setImageFile] = (0, import_react141.useState)();
  const [imageFileObjectUrl, setImageFileObjectUrl] = (0, import_react141.useState)();
  const [copyrightPermissionIsGranted, setCopyrightPermissionIsGranted] = (0, import_react141.useState)(false);
  const [formIsSubmitting, setFormIsSubmitting] = (0, import_react141.useState)(false);
  const [createPresignedUploadUrl] = (0, import_client73.useMutation)(CREATE_PRESIGNED_UPLOAD_URL_MUTATION, { errorPolicy: "all" });
  const [createVerificationRequest] = (0, import_client73.useMutation)(CREATE_VERIFICATION_REQUEST_MUTATION, { errorPolicy: "all" });
  const onSelectEntity = (entity) => {
    if (isPerson(entity)) {
      setPersonEntity(entity);
    }
  };
  const onImageFileChanged = (event) => {
    var _a;
    if (!((_a = event.target.files) == null ? void 0 : _a.length)) {
      return;
    }
    const selectedFile = event.target.files[0];
    setImageFile(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setImageFileObjectUrl(objectUrl);
  };
  (0, import_react141.useEffect)(() => {
    return () => {
      if (imageFileObjectUrl) {
        URL.revokeObjectURL(imageFileObjectUrl);
      }
    };
  }, [imageFileObjectUrl]);
  const requiredFieldsAreSet = personEntity && imageFile && copyrightPermissionIsGranted;
  const onSubmitClicked = async () => {
    if (!requiredFieldsAreSet) {
      return window.alert("Please fill out all the fields");
    }
    setFormIsSubmitting(true);
    try {
      const response = await createPresignedUploadUrl({
        variables: { filename: imageFile.name }
      });
      const { imageS3Key, presignedUploadUrl } = response.data.createPresignedUploadUrlForVerificationImage;
      await fetch(presignedUploadUrl, { method: "PUT", body: imageFile });
      const { data } = await createVerificationRequest({
        variables: {
          input: {
            personId: personEntity.id,
            imageS3Key,
            copyrightPermissionStatus: "FullNonCommercialGranted" /* FullNonCommercialGranted */
          }
        }
      });
      if (!data.createVerificationRequest) {
        throw new Error();
      }
      await refetchVerificationRequestsForCurrentUser();
      setFormIsSubmitting(false);
      navigate("/account");
    } catch {
      setFormIsSubmitting(false);
      window.alert("Error submitting verification request. Please reload and try again.");
    }
  };
  const shouldPromptToChoosePerson = !personEntity && imageFile && copyrightPermissionIsGranted;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    items: [
      {
        label: "Account",
        href: "/account"
      },
      { label: "Verify Your Account" }
    ],
    className: "mb-4"
  }), /* @__PURE__ */ React.createElement("div", {
    className: "mb-8 text-gray-500"
  }, `This enables you to link your user account with a Person tag. For example, let's say you are Michael Coleman; you can link your user account to the "Michael Coleman" tag on the site. You'll get a verified badge next to your username, and you'll be able to immediately take down any content that you're tagged in, if you want to. Verification is free and will be done by ITMA staff.`), !personEntity ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "Search for your name and click on the Person if found. If it doesn't exist yet, go ahead and create a new one."), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col max-w-xs"
  }, /* @__PURE__ */ React.createElement(SearchEntities_default, {
    className: "mb-8",
    entityTypes: ["Person" /* Person */],
    take: 15,
    onSelect: onSelectEntity,
    onNewEntityCreated: onSelectEntity
  }))) : /* @__PURE__ */ React.createElement("div", {
    className: "mb-8"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2 font-bold"
  }, "You have selected:"), personEntity.firstName, " ", personEntity.lastName, /* @__PURE__ */ React.createElement("button", {
    className: "btn-text ml-2",
    onClick: () => setPersonEntity(void 0)
  }, "Clear")), /* @__PURE__ */ React.createElement("div", {
    className: "mb-8"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "Please attach a photo proving your identity (utility bill, ID, etc; will be deleted after verification):"), /* @__PURE__ */ React.createElement("input", {
    type: "file",
    accept: ".png,.jpeg,.jpg",
    onChange: onImageFileChanged,
    className: "block"
  }), imageFileObjectUrl && /* @__PURE__ */ React.createElement("img", {
    src: imageFileObjectUrl,
    className: "h-48 mt-4"
  })), /* @__PURE__ */ React.createElement("div", {
    className: "mb-2"
  }, "Do you give the Irish Traditional Music Archive (ITMA) permission to make recordings of you publicly available for non-commercial use, given that you can take them down at any time?"), /* @__PURE__ */ React.createElement("div", {
    className: "mb-8 flex flex-row items-center justify-start"
  }, /* @__PURE__ */ React.createElement("input", {
    type: "checkbox",
    id: "copyright-permission",
    checked: copyrightPermissionIsGranted,
    onChange: (event) => setCopyrightPermissionIsGranted(event.target.checked)
  }), /* @__PURE__ */ React.createElement("label", {
    htmlFor: "copyright-permission",
    className: "ml-2"
  }, "Yes, I give permission")), refetchVerificationRequestsIsLoading || formIsSubmitting ? /* @__PURE__ */ React.createElement(LoadingCircle_default, null) : /* @__PURE__ */ React.createElement("button", {
    className: "btn",
    onClick: onSubmitClicked,
    disabled: !requiredFieldsAreSet
  }, "Submit"), shouldPromptToChoosePerson && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mt-6"
  }, "Please select a Person above")));
};
var verify_default = AccountVerify;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/account/index.tsx
var account_exports = {};
__export(account_exports, {
  default: () => account_default
});
init_react();
var import_react143 = require("react");
var import_react144 = require("@remix-run/react");
var AccountHome = () => {
  const [verificationRequests = [], { loading, data, error }] = useVerificationRequestsForCurrentUser_default();
  const verifyYourselfMarkup = (0, import_react143.useMemo)(() => {
    if (!loading && error) {
      return /* @__PURE__ */ React.createElement("span", {
        className: "text-red-600"
      }, "Error fetching verification status. Please reload.");
    } else if (loading) {
      return /* @__PURE__ */ React.createElement("span", {
        className: "text-gray-500"
      }, "Loading verification status...");
    }
    const approvedRequest = verificationRequests.find((request) => isApprovedVerificationRequest(request));
    if (approvedRequest) {
      return /* @__PURE__ */ React.createElement("span", {
        className: "flex flex-row items-center"
      }, /* @__PURE__ */ React.createElement("i", {
        className: "material-icons text-base"
      }, "verified"), /* @__PURE__ */ React.createElement("span", {
        className: "ml-2 mr-1"
      }, "You are verified as"), /* @__PURE__ */ React.createElement(import_react144.Link, {
        to: Entity_default.makeHrefForView(approvedRequest.person)
      }, approvedRequest.person.name));
    }
    const pendingRequest = verificationRequests.find((request) => isPendingVerificationRequest(request));
    if (pendingRequest) {
      return /* @__PURE__ */ React.createElement("span", null, "Your request to verify as ", pendingRequest.person.name, " is pending");
    }
    return /* @__PURE__ */ React.createElement(import_react144.Link, {
      to: "/account/verify"
    }, "Verify Your Account");
  }, [data, loading, error, verificationRequests]);
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Account"), verifyYourselfMarkup, /* @__PURE__ */ React.createElement(import_react144.Link, {
    to: "/account/submissions"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mt-2"
  }, "Submit Audio, Video, Images, or Documents to ITMA")), /* @__PURE__ */ React.createElement(import_react144.Link, {
    to: "/logout"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mt-2"
  }, "Log Out"))));
};
var account_default = AccountHome;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/admin/index.tsx
var admin_exports = {};
__export(admin_exports, {
  default: () => admin_default
});
init_react();
var import_react145 = require("@remix-run/react");
var AdminHome = () => {
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireAdmin_default, null, /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-4"
  }, "Admin"), /* @__PURE__ */ React.createElement(import_react145.Link, {
    to: "/admin/verification-requests"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Manage Verification Requests")), /* @__PURE__ */ React.createElement(import_react145.Link, {
    to: "/admin/takedown-requests"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Manage Takedown Requests")), /* @__PURE__ */ React.createElement(import_react145.Link, {
    to: "/admin/submissions"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-6"
  }, "Manage Submissions")), /* @__PURE__ */ React.createElement(import_react145.Link, {
    to: "/entities/audio-items/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Create Audio Item")), /* @__PURE__ */ React.createElement(import_react145.Link, {
    to: "/entities/people/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Create Person")), /* @__PURE__ */ React.createElement(import_react145.Link, {
    to: "/entities/instruments/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Create Instrument")), /* @__PURE__ */ React.createElement(import_react145.Link, {
    to: "/entities/places/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Create Place")), /* @__PURE__ */ React.createElement(import_react145.Link, {
    to: "/entities/collections/new"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "block mb-2"
  }, "Create Collection")))));
};
var admin_default = AdminHome;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/saved-items.tsx
var saved_items_exports = {};
__export(saved_items_exports, {
  default: () => saved_items_default
});
init_react();
var import_react146 = require("@remix-run/react");
var SavedItems = () => {
  const [savedItems, { loading, error }] = useSavedItemsForUser_default();
  const { Filters: Filters2, filtersProps, viewAs } = useFilters_default({
    defaultViewAs: "List" /* List */
  });
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement(RequireUser_default, null, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Saved Items"), (savedItems == null ? void 0 : savedItems.length) > 0 && /* @__PURE__ */ React.createElement(Filters2, __spreadProps(__spreadValues({}, filtersProps), {
    className: "mb-6"
  })), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-4"
  }, "Could not fetch saved items"), loading && !savedItems && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement(LoadingBlock_default, null)), !loading && (savedItems == null ? void 0 : savedItems.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "Nothing saved yet - try browsing some", " ", /* @__PURE__ */ React.createElement(import_react146.Link, {
    to: "/"
  }, "Audio Items"), "!"), savedItems == null ? void 0 : savedItems.map(({ audioItem }, index) => /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs,
    audioItem,
    key: index,
    className: viewAs === "List" /* List */ ? "mb-4" : "mb-6"
  })))));
};
var saved_items_default = SavedItems;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/auto-login.tsx
var auto_login_exports = {};
__export(auto_login_exports, {
  default: () => auto_login_default
});
init_react();
var import_react147 = require("react");
var import_react148 = require("@remix-run/react");
var import_react149 = require("@remix-run/react");
var import_client74 = __toESM(require_main());
var AUTHENTICATE_WITH_AUTO_LOGIN_TOKEN = import_client74.gql`
	mutation AuthenticateWithAutoLoginToken(
		$input: AuthenticateWithAutoLoginTokenInput!
	) {
		authenticateWithAutoLoginToken(input: $input) {
			...CurrentUser
		}
	}
	${UserFragments.currentUser}
`;
var AutoLogin = () => {
  var _a;
  const navigate = (0, import_react148.useNavigate)();
  const { tokenUnhashed, userEmail, redirectTo } = navigate.query;
  const [
    currentUser,
    { loading: currentUserLoading, refetch: refetchCurrentUser }
  ] = useCurrentUser_default();
  const [
    authenticateWithAutoLoginToken,
    { loading: authenticateLoading, data, error }
  ] = (0, import_client74.useMutation)(AUTHENTICATE_WITH_AUTO_LOGIN_TOKEN);
  (0, import_react147.useEffect)(() => {
    if (typeof tokenUnhashed !== "string" || typeof userEmail !== "string") {
      return;
    }
    const authenticate = async () => {
      try {
        await authenticateWithAutoLoginToken({
          variables: { input: { tokenUnhashed, userEmail } }
        });
      } catch {
      }
    };
    authenticate();
  }, [tokenUnhashed, authenticateWithAutoLoginToken]);
  (0, import_react147.useEffect)(() => {
    if (data == null ? void 0 : data.authenticateWithAutoLoginToken) {
      refetchCurrentUser();
    }
  }, [data, refetchCurrentUser]);
  (0, import_react147.useEffect)(() => {
    if (currentUser) {
      navigate(typeof redirectTo === "string" ? redirectTo : "/");
    }
  }, [currentUser]);
  if (currentUser) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-row items-center justify-center"
    }, /* @__PURE__ */ React.createElement(LoadingCircle_default, {
      className: "mr-4"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "text-gray-500"
    }, "Loading...")));
  }
  if (error) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("div", {
      className: "text-red-600 mb-4"
    }, "Error: ", (_a = error == null ? void 0 : error.graphQLErrors) == null ? void 0 : _a.map(({ message }) => message)), /* @__PURE__ */ React.createElement(import_react149.Link, {
      href: {
        pathname: "/login",
        query: redirectTo ? { redirectTo } : void 0
      }
    }, "Send a new login link"));
  }
  if (authenticateLoading || currentUserLoading) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("div", {
      className: "flex flex-row items-center justify-center"
    }, /* @__PURE__ */ React.createElement(LoadingCircle_default, {
      className: "mr-4"
    }), /* @__PURE__ */ React.createElement("span", {
      className: "text-gray-500"
    }, "Loading...")));
  }
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-3"
  }, "Check your email"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row mb-6"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons mr-2"
  }, "mail_outline"), "We've emailed a magic link to you. Click it to log in."), /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "Didn't get it? Check your spam folder or", " ", /* @__PURE__ */ React.createElement(import_react149.Link, {
    href: {
      pathname: "/login",
      query: redirectTo ? { redirectTo } : void 0
    }
  }, "send a new one")));
};
var auto_login_default = AutoLogin;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/users/[id].tsx
var id_exports2 = {};
__export(id_exports2, {
  default: () => id_default2
});
init_react();
var import_react151 = require("react");
var import_react152 = require("@remix-run/react");
var import_react153 = require("@remix-run/react");
var import_client76 = __toESM(require_main());

// app/hooks/useAudioItemsCreatedByUser.tsx
init_react();
var import_react150 = require("react");
var import_client75 = __toESM(require_main());
var AUDIO_ITEMS_CREATED_BY_USER_QUERY = import_client75.gql`
	query AudioItemsCreatedByUser($input: AudioItemsCreatedByUserInput!) {
		audioItemsCreatedByUser(input: $input) {
			...AudioItem
		}
	}
	${EntityFragments.audioItem}
`;
var useAudioItemsCreatedByUser = (user) => {
  var _a;
  const [makeQuery, query] = (0, import_client75.useLazyQuery)(AUDIO_ITEMS_CREATED_BY_USER_QUERY, {
    variables: {
      input: {
        userId: user == null ? void 0 : user.id
      }
    }
  });
  (0, import_react150.useEffect)(() => {
    if (user) {
      makeQuery();
    }
  }, [makeQuery, user]);
  const audioItems = (_a = query.data) == null ? void 0 : _a.audioItemsCreatedByUser;
  return [audioItems, query];
};
var useAudioItemsCreatedByUser_default = useAudioItemsCreatedByUser;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/users/[id].tsx
var USER_QUERY = import_client76.gql`
	query User($id: String!) {
		user(id: $id) {
			...User
		}
	}
	${UserFragments.user}
`;
var ViewUserById = () => {
  const navigate = (0, import_react152.useNavigate)();
  const { id } = navigate.query;
  const { data: userData, error: userError } = (0, import_client76.useQuery)(USER_QUERY, {
    variables: { id },
    skip: !id
  });
  const { username, createdAt, verifiedPerson } = (userData == null ? void 0 : userData.user) ?? {};
  const [
    audioItems = [],
    { loading: audioItemsLoading, error: audioItemsError }
  ] = useAudioItemsCreatedByUser_default(userData == null ? void 0 : userData.user);
  const { Filters: Filters2, filtersProps, viewAs } = useFilters_default({
    defaultViewAs: "Cards" /* Cards */
  });
  const aboutMarkup = (0, import_react151.useMemo)(() => /* @__PURE__ */ React.createElement(React.Fragment, null, verifiedPerson && /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row items-center"
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-base mr-2"
  }, "verified"), "Verified As Person:"), /* @__PURE__ */ React.createElement(import_react153.Link, {
    to: Entity_default.makeHrefForView(verifiedPerson)
  }, verifiedPerson.name)), /* @__PURE__ */ React.createElement("div", {
    className: "mb-4"
  }, "Account Created:", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, DateTime_default.formatDateYear(createdAt)))), [verifiedPerson, createdAt]);
  let statusMessage;
  if (!userData && !userError) {
    statusMessage = /* @__PURE__ */ React.createElement(LoadingBlock_default, null);
  } else if (!userData && userError) {
    statusMessage = `Error fetching User with id ${id}`;
  }
  if (statusMessage) {
    return /* @__PURE__ */ React.createElement(Layout_default, null, statusMessage);
  }
  const noAudioItemsFound = !audioItemsLoading && !audioItemsError && audioItems.length === 0;
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: `Trad Archive - ${username}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col-reverse md:flex-row"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1 flex-col pb-8"
  }, /* @__PURE__ */ React.createElement(Breadcrumb_default, {
    className: "mb-6",
    items: [{ label: "Users" }, { label: username }]
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex-col mb-8 md:hidden"
  }, aboutMarkup), audioItemsLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), audioItemsError && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, "Error fetching Audio Items"), noAudioItemsFound && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, username, " hasn't added any Audio Items yet"), audioItems.length > 0 && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Filters2, __spreadProps(__spreadValues({}, filtersProps), {
    className: "mb-6"
  })), audioItems.map((audioItem, index) => /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs,
    audioItem,
    key: index,
    className: "mb-8"
  })))), /* @__PURE__ */ React.createElement("div", {
    className: "hidden md:flex flex-col items-start pb-8 md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300"
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "mb-4"
  }, "About"), aboutMarkup)));
};
var id_default2 = ViewUserById;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  default: () => logout_default
});
init_react();
var import_react154 = require("react");
var import_react155 = require("@remix-run/react");
var import_client77 = __toESM(require_main());
var LOG_OUT_MUTATION = import_client77.gql`
	mutation LogOut {
		logOut
	}
`;
var LogOut = () => {
  const navigate = (0, import_react155.useNavigate)();
  const [logOut, { data: logOutData }] = (0, import_client77.useMutation)(LOG_OUT_MUTATION, {
    errorPolicy: "all"
  });
  (0, import_react154.useEffect)(() => {
    logOut();
  }, [logOut]);
  (0, import_react154.useEffect)(() => {
    if (logOutData == null ? void 0 : logOutData.logOut) {
      window.location.href = window.location.origin;
    }
  }, [logOutData]);
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("span", {
    className: "text-gray-500"
  }, "Logging out..."));
};
var logout_default = LogOut;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/signup.tsx
var signup_exports = {};
__export(signup_exports, {
  default: () => signup_default
});
init_react();
var import_react156 = require("react");
var import_react157 = require("@remix-run/react");
var import_react158 = require("@remix-run/react");
var import_client78 = __toESM(require_main());
var SIGN_UP_MUTATION = import_client78.gql`
	mutation SignUp($input: SignUpInput!) {
		signUp(input: $input) {
			...CurrentUser
		}
	}
	${UserFragments.currentUser}
`;
var SignUp = () => {
  const navigate = (0, import_react157.useNavigate)();
  const { redirectTo } = navigate.query;
  const [currentUser] = useCurrentUser_default();
  const [email, setEmail] = (0, import_react156.useState)("");
  const [username, setUsername] = (0, import_react156.useState)("");
  const [validationError, setValidationError] = (0, import_react156.useState)("");
  const [signUp, { loading, data, error }] = (0, import_client78.useMutation)(SIGN_UP_MUTATION, {
    errorPolicy: "all"
  });
  const onSignUp = (event) => {
    event.preventDefault();
    setValidationError("");
    const cleanedEmail = email.trim().toLowerCase();
    signUp({
      variables: {
        input: { email: cleanedEmail, username, redirectTo }
      }
    });
  };
  (0, import_react156.useEffect)(() => {
    if (data == null ? void 0 : data.signUp) {
      navigate("/auto-login");
    }
  }, [data, navigate]);
  if (currentUser) {
    navigate(typeof redirectTo === "string" ? redirectTo : "/");
  }
  const logInLinkQueryParams = redirectTo ? { redirectTo } : void 0;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, redirectTo ? "Create an account to continue" : "Create your account"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start max-w-xs"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onSignUp
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Your email",
    autoFocus: true,
    className: "mb-2",
    value: email,
    onChange: (event) => setEmail(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    placeholder: "Your full name",
    className: "mb-4",
    value: username,
    onChange: (event) => setUsername(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Sign Up"
  })), validationError && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-4"
  }, validationError), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-4"
  }, error.message), /* @__PURE__ */ React.createElement("div", null, "Already have an account?", " ", /* @__PURE__ */ React.createElement(import_react158.Link, {
    to: { pathname: "/login", query: logInLinkQueryParams }
  }, "Log in"))));
};
var signup_default = SignUp;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Home
});
init_react();
var import_react159 = require("react");
var import_react160 = require("@remix-run/react");

// app/services/Comment.ts
init_react();
var import_compareDesc4 = __toESM(require("date-fns/compareDesc"));
var sortByCreatedAtDesc2 = (comments) => {
  let sortedComments = [...comments];
  sortedComments.sort((a, b) => {
    return (0, import_compareDesc4.default)(new Date(a.createdAt), new Date(b.createdAt));
  });
  return sortedComments;
};
var CommentService = {
  sortByCreatedAtDesc: sortByCreatedAtDesc2
};
var Comment_default = CommentService;

// app/services/LocalStorage.ts
init_react();
var localStorageIsAvailable = typeof window !== "undefined" && (window == null ? void 0 : window.localStorage);
var setItem = (key, value) => {
  if (localStorageIsAvailable) {
    window.localStorage.setItem(key, value);
  }
};
var getItem = (key) => {
  if (localStorageIsAvailable) {
    return window.localStorage.getItem(key);
  }
  return void 0;
};
var LocalStorageService = {
  setItem,
  getItem
};
var LocalStorage_default = LocalStorageService;

// app/components/ProjectIntro.tsx
init_react();
var ProjectIntro = ({ className, onClose }) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: `flex flex-col flex-grow bg-gray-200 rounded p-4 pl-16 lg:pl-20 relative ${className ?? ""}`
  }, /* @__PURE__ */ React.createElement("img", {
    src: "/logo-square.png",
    className: "absolute top-5 -left-1 lg:-left-8 w-12 lg:w-20 -rotate-12"
  }), /* @__PURE__ */ React.createElement("strong", null, "Welcome!"), /* @__PURE__ */ React.createElement("br", null), "Trad Archive is an open source experiment by the Irish Traditional Music Archive and Dan Gurney.", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("br", null), "You can...", /* @__PURE__ */ React.createElement("br", null), /* @__PURE__ */ React.createElement("ul", {
    className: "list-disc list-inside"
  }, /* @__PURE__ */ React.createElement("li", null, "Listen to previously unreleased archival recordings"), /* @__PURE__ */ React.createElement("li", null, "Help by tagging each recording with People, Places, Tunes, Instruments, and Collections"), /* @__PURE__ */ React.createElement("li", null, "Save favorites to listen later")), /* @__PURE__ */ React.createElement("button", {
    className: "absolute top-2 right-2 btn-icon",
    onClick: onClose
  }, /* @__PURE__ */ React.createElement("i", {
    className: "material-icons"
  }, "close")));
};
var ProjectIntro_default = ProjectIntro;

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/index.tsx
var NUM_AUDIO_ITEMS_TO_FETCH = 10;
var NUM_COMMENTS_TO_FETCH = 6;
var NUM_COLLECTIONS_TO_FETCH = 5;
function Home() {
  const { Filters: Filters2, filtersProps, sortBy, viewAs } = useFilters_default({
    defaultSortBy: "RecentlyTagged" /* RecentlyTagged */,
    defaultViewAs: "Cards" /* Cards */,
    enableQueryParams: false
  });
  const [
    fetchedAudioItems,
    { loading: audioItemsLoading, error: audioItemsError },
    fetchNextPage
  ] = useAudioItems_default({
    sortBy,
    resultsPerPage: NUM_AUDIO_ITEMS_TO_FETCH,
    queryOptions: {
      fetchPolicy: "cache-only"
    }
  });
  const {
    comments: fetchedComments,
    commentsQuery: { loading: commentsLoading }
  } = useComments_default({
    resultsPerPage: NUM_COMMENTS_TO_FETCH,
    queryOptions: {
      fetchPolicy: "cache-only"
    }
  });
  const [fetchedCollections, { loading: collectionsLoading }] = useCollections_default({
    resultsPerPage: NUM_COLLECTIONS_TO_FETCH,
    sortBy: "RecentlyAdded" /* RecentlyAdded */,
    queryOptions: {
      fetchPolicy: "cache-only"
    }
  });
  const audioItems = fetchedAudioItems;
  const comments = (0, import_react159.useMemo)(() => {
    const data = fetchedComments ?? [];
    const sorted = Comment_default.sortByCreatedAtDesc(data);
    return sorted.slice(0, NUM_COMMENTS_TO_FETCH);
  }, [fetchedComments]);
  const collections = (0, import_react159.useMemo)(() => {
    const data = fetchedCollections ?? [];
    return data.slice(0, NUM_COLLECTIONS_TO_FETCH);
  }, [fetchedCollections]);
  const [shouldShowIntro, setShouldShowIntro] = (0, import_react159.useState)(false);
  (0, import_react159.useEffect)(() => {
    if (LocalStorage_default.getItem("SHOULD_SHOW_INTRO") !== "false") {
      setShouldShowIntro(true);
    }
  }, []);
  const onCloseIntro = (0, import_react159.useCallback)(() => {
    LocalStorage_default.setItem("SHOULD_SHOW_INTRO", "false");
    setShouldShowIntro(false);
  }, []);
  return /* @__PURE__ */ React.createElement(Layout_default, {
    pageTitle: "Trad Archive - Home"
  }, shouldShowIntro && /* @__PURE__ */ React.createElement(ProjectIntro_default, {
    className: "mb-8 md:mt-4 md:mb-12",
    onClose: onCloseIntro
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col md:flex-row"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-1 flex-col pb-8"
  }, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Explore"), /* @__PURE__ */ React.createElement(Filters2, __spreadProps(__spreadValues({}, filtersProps), {
    className: "mb-6"
  })), !audioItems && audioItemsError && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600"
  }, audioItemsError.message), !audioItemsLoading && (audioItems == null ? void 0 : audioItems.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "No Audio Items found"), audioItems == null ? void 0 : audioItems.map((audioItem, index) => /* @__PURE__ */ React.createElement(AudioItem_default, {
    viewAs,
    audioItem,
    key: index,
    className: viewAs === "List" /* List */ ? "mb-4" : "mb-6"
  })), audioItemsLoading && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), !audioItemsLoading && (audioItems == null ? void 0 : audioItems.length) > 0 && /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-row justify-center"
  }, /* @__PURE__ */ React.createElement("button", {
    className: "btn-text",
    onClick: fetchNextPage
  }, "Load More"))), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col items-start md:ml-8 md:pl-8 md:w-1/4 md:border-l md:border-gray-300"
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "mb-4"
  }, "Browse"), /* @__PURE__ */ React.createElement(import_react160.Link, {
    to: "/entities/people"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "mb-2"
  }, "People")), /* @__PURE__ */ React.createElement(import_react160.Link, {
    to: "/entities/instruments"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "mb-2"
  }, "Instruments")), /* @__PURE__ */ React.createElement(import_react160.Link, {
    to: "/entities/places"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "mb-2"
  }, "Places")), /* @__PURE__ */ React.createElement(import_react160.Link, {
    to: "/entities/tunes"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "mb-2"
  }, "Tunes")), /* @__PURE__ */ React.createElement(import_react160.Link, {
    to: "/entities/collections"
  }, /* @__PURE__ */ React.createElement("a", {
    className: "mb-2"
  }, "Collections")), /* @__PURE__ */ React.createElement("h3", {
    className: "mt-6 mb-4"
  }, "Latest Collections"), collectionsLoading && (collections == null ? void 0 : collections.length) === 0 && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), !collectionsLoading && (collections == null ? void 0 : collections.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "None"), collections == null ? void 0 : collections.map((collection, index) => {
    const { name } = collection;
    if (!name) {
      return null;
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: "mb-2 text-gray-500",
      key: index
    }, /* @__PURE__ */ React.createElement(import_react160.Link, {
      to: Entity_default.makeHrefForView(collection)
    }, collection.name));
  }), /* @__PURE__ */ React.createElement("h3", {
    className: "mt-6 mb-4"
  }, "Latest Features + Fixes"), /* @__PURE__ */ React.createElement("a", {
    className: "mb-2",
    href: "https://github.com/dgurns/trad-archive/pulls?q=is%3Apr+is%3Amerged+sort%3Aupdated-desc",
    target: "_blank",
    rel: "noreferrer"
  }, "View on GitHub ", /* @__PURE__ */ React.createElement("i", {
    className: "material-icons text-sm"
  }, "launch")), /* @__PURE__ */ React.createElement("h3", {
    className: "mt-6 mb-4"
  }, "Latest Comments"), commentsLoading && (comments == null ? void 0 : comments.length) === 0 && /* @__PURE__ */ React.createElement(LoadingBlock_default, null), !commentsLoading && (comments == null ? void 0 : comments.length) === 0 && /* @__PURE__ */ React.createElement("div", {
    className: "text-gray-500"
  }, "None"), comments == null ? void 0 : comments.map((comment, index) => {
    const { createdByUser, parentAudioItem, text } = comment;
    if (!createdByUser) {
      return null;
    }
    return /* @__PURE__ */ React.createElement("div", {
      className: "mb-4 text-gray-500",
      key: index
    }, /* @__PURE__ */ React.createElement("div", {
      className: " mb-1"
    }, /* @__PURE__ */ React.createElement(import_react160.Link, {
      to: `/users/${createdByUser.id}`
    }, createdByUser.username), ` commented on `, /* @__PURE__ */ React.createElement(import_react160.Link, {
      to: Entity_default.makeHrefForView(parentAudioItem)
    }, parentAudioItem.name), ":"), /* @__PURE__ */ React.createElement("div", {
      className: "whitespace-pre-line text-sm"
    }, text));
  }))));
}

// route:/Users/dangurney/Desktop/Dev/trad-archive/remix/app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  default: () => login_default
});
init_react();
var import_react161 = require("react");
var import_react162 = require("@remix-run/react");
var import_react163 = require("@remix-run/react");
var import_client79 = __toESM(require_main());
var LOG_IN_MUTATION = import_client79.gql`
	mutation LogIn($input: LogInInput!) {
		logIn(input: $input) {
			...CurrentUser
		}
	}
	${UserFragments.currentUser}
`;
var Login = () => {
  const navigate = (0, import_react162.useNavigate)();
  const { redirectTo } = navigate.query;
  const [currentUser] = useCurrentUser_default();
  const [email, setEmail] = (0, import_react161.useState)("");
  const [logIn, { loading, data, error }] = (0, import_client79.useMutation)(LOG_IN_MUTATION, {
    errorPolicy: "all"
  });
  const onLogIn = (event) => {
    event.preventDefault();
    const cleanedEmail = email.trim().toLowerCase();
    logIn({
      variables: { input: { email: cleanedEmail, redirectTo } }
    });
  };
  (0, import_react161.useEffect)(() => {
    if (data == null ? void 0 : data.logIn) {
      navigate("/auto-login");
    }
  }, [data, navigate]);
  if (currentUser) {
    navigate(typeof redirectTo === "string" ? redirectTo : "/");
  }
  const signUpLinkQueryParams = redirectTo ? { redirectTo } : void 0;
  return /* @__PURE__ */ React.createElement(Layout_default, null, /* @__PURE__ */ React.createElement("h1", {
    className: "mb-6"
  }, "Log in to ", redirectTo ? "continue" : "Trad Archive"), /* @__PURE__ */ React.createElement("div", {
    className: "flex flex-col align-start max-w-xs"
  }, /* @__PURE__ */ React.createElement("form", {
    onSubmit: onLogIn
  }, /* @__PURE__ */ React.createElement("input", {
    placeholder: "Your email",
    autoFocus: true,
    className: "mb-4",
    value: email,
    onChange: (event) => setEmail(event.target.value)
  }), /* @__PURE__ */ React.createElement("input", {
    type: "submit",
    className: "btn mb-4 w-auto",
    disabled: loading,
    value: "Log In"
  })), error && /* @__PURE__ */ React.createElement("div", {
    className: "text-red-600 mb-4"
  }, error.message), /* @__PURE__ */ React.createElement("div", null, "Don't have an account yet?", " ", /* @__PURE__ */ React.createElement(import_react163.Link, {
    to: { pathname: "/signup", query: signUpLinkQueryParams }
  }, "Sign Up"))));
};
var login_default = Login;

// server-assets-manifest:@remix-run/dev/assets-manifest
init_react();
var assets_manifest_default = { "version": "4cfda7d7", "entry": { "module": "/build/entry.client-B3YHXAIT.js", "imports": ["/build/_shared/chunk-FLLJNSWK.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-JT3SIGMM.js", "imports": ["/build/_shared/chunk-KIIWXZTD.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/account/index": { "id": "routes/account/index", "parentId": "root", "path": "account", "index": true, "caseSensitive": void 0, "module": "/build/routes/account/index-AYIG7JTZ.js", "imports": ["/build/_shared/chunk-7LWQ72M3.js", "/build/_shared/chunk-4IYCYPOC.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/account/submissions/[id]/upload": { "id": "routes/account/submissions/[id]/upload", "parentId": "root", "path": "account/submissions/id/upload", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/account/submissions/[id]/upload-XZM7NRAO.js", "imports": ["/build/_shared/chunk-ENZPEVYP.js", "/build/_shared/chunk-LLYMHSPL.js", "/build/_shared/chunk-4IYCYPOC.js", "/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/account/submissions/index": { "id": "routes/account/submissions/index", "parentId": "root", "path": "account/submissions", "index": true, "caseSensitive": void 0, "module": "/build/routes/account/submissions/index-D3LBLEX3.js", "imports": ["/build/_shared/chunk-ENZPEVYP.js", "/build/_shared/chunk-LLYMHSPL.js", "/build/_shared/chunk-4IYCYPOC.js", "/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/account/submissions/new": { "id": "routes/account/submissions/new", "parentId": "root", "path": "account/submissions/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/account/submissions/new-57MXMC7T.js", "imports": ["/build/_shared/chunk-LLYMHSPL.js", "/build/_shared/chunk-4IYCYPOC.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/account/verify": { "id": "routes/account/verify", "parentId": "root", "path": "account/verify", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/account/verify-TWFLJFMW.js", "imports": ["/build/_shared/chunk-7LWQ72M3.js", "/build/_shared/chunk-LLYMHSPL.js", "/build/_shared/chunk-4IYCYPOC.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/index": { "id": "routes/admin/index", "parentId": "root", "path": "admin", "index": true, "caseSensitive": void 0, "module": "/build/routes/admin/index-P2QQBZZ6.js", "imports": ["/build/_shared/chunk-X7GPRPOX.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/submissions/[id]": { "id": "routes/admin/submissions/[id]", "parentId": "root", "path": "admin/submissions/id", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/submissions/[id]-F3WRHYGP.js", "imports": ["/build/_shared/chunk-X7GPRPOX.js", "/build/_shared/chunk-ENZPEVYP.js", "/build/_shared/chunk-LLYMHSPL.js", "/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/submissions/index": { "id": "routes/admin/submissions/index", "parentId": "root", "path": "admin/submissions", "index": true, "caseSensitive": void 0, "module": "/build/routes/admin/submissions/index-ENWZI3AP.js", "imports": ["/build/_shared/chunk-X7GPRPOX.js", "/build/_shared/chunk-ENZPEVYP.js", "/build/_shared/chunk-LLYMHSPL.js", "/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/takedown-requests": { "id": "routes/admin/takedown-requests", "parentId": "root", "path": "admin/takedown-requests", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/takedown-requests-YAVIYRA4.js", "imports": ["/build/_shared/chunk-X7GPRPOX.js", "/build/_shared/chunk-2QUGVLAY.js", "/build/_shared/chunk-ENZPEVYP.js", "/build/_shared/chunk-LLYMHSPL.js", "/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/admin/verification-requests": { "id": "routes/admin/verification-requests", "parentId": "root", "path": "admin/verification-requests", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/admin/verification-requests-LX2RFED7.js", "imports": ["/build/_shared/chunk-X7GPRPOX.js", "/build/_shared/chunk-2QUGVLAY.js", "/build/_shared/chunk-ENZPEVYP.js", "/build/_shared/chunk-LLYMHSPL.js", "/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/auto-login": { "id": "routes/auto-login", "parentId": "root", "path": "auto-login", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/auto-login-6BCTSJ6M.js", "imports": ["/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/[slug]": { "id": "routes/entities/audio-items/[slug]", "parentId": "root", "path": "entities/audio-items/slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/[slug]-WJPEU26U.js", "imports": ["/build/_shared/chunk-B3DB75ZZ.js", "/build/_shared/chunk-ZZLNVVVK.js", "/build/_shared/chunk-2QUGVLAY.js", "/build/_shared/chunk-ENZPEVYP.js", "/build/_shared/chunk-LLYMHSPL.js", "/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/[slug]/about": { "id": "routes/entities/audio-items/[slug]/about", "parentId": "routes/entities/audio-items/[slug]", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/[slug]/about-6SNMTON7.js", "imports": ["/build/_shared/chunk-KIIWXZTD.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/[slug]/edit": { "id": "routes/entities/audio-items/[slug]/edit", "parentId": "routes/entities/audio-items/[slug]", "path": "edit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/[slug]/edit-Z6XGGZAS.js", "imports": ["/build/_shared/chunk-4IYCYPOC.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/[slug]/tags": { "id": "routes/entities/audio-items/[slug]/tags", "parentId": "routes/entities/audio-items/[slug]", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/[slug]/tags-JPHTSR7F.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/index": { "id": "routes/entities/audio-items/index", "parentId": "root", "path": "entities/audio-items", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/index-KZGTKDMM.js", "imports": void 0, "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/new": { "id": "routes/entities/audio-items/new", "parentId": "root", "path": "entities/audio-items/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/new-5JDM27YS.js", "imports": ["/build/_shared/chunk-BXI6BDQN.js", "/build/_shared/chunk-X7GPRPOX.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/audio-items/random": { "id": "routes/entities/audio-items/random", "parentId": "root", "path": "entities/audio-items/random", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/audio-items/random-Q3HPHDZQ.js", "imports": ["/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/[slug]": { "id": "routes/entities/collections/[slug]", "parentId": "root", "path": "entities/collections/slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/collections/[slug]-CYFGKF4M.js", "imports": ["/build/_shared/chunk-OETW3RPP.js", "/build/_shared/chunk-UKZHEFXV.js", "/build/_shared/chunk-GKDZXAYJ.js", "/build/_shared/chunk-ZZLNVVVK.js", "/build/_shared/chunk-2QUGVLAY.js", "/build/_shared/chunk-ENZPEVYP.js", "/build/_shared/chunk-LLYMHSPL.js", "/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/[slug]/about": { "id": "routes/entities/collections/[slug]/about", "parentId": "routes/entities/collections/[slug]", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/collections/[slug]/about-4W24JJ2D.js", "imports": ["/build/_shared/chunk-KIIWXZTD.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/[slug]/edit": { "id": "routes/entities/collections/[slug]/edit", "parentId": "routes/entities/collections/[slug]", "path": "edit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/collections/[slug]/edit-G5CFA5UZ.js", "imports": ["/build/_shared/chunk-4IYCYPOC.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/[slug]/tags": { "id": "routes/entities/collections/[slug]/tags", "parentId": "routes/entities/collections/[slug]", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/collections/[slug]/tags-JLAXKHXU.js", "imports": ["/build/_shared/chunk-QFB5P7GO.js", "/build/_shared/chunk-KIIWXZTD.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/index": { "id": "routes/entities/collections/index", "parentId": "root", "path": "entities/collections", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/collections/index-6A4M3L6W.js", "imports": ["/build/_shared/chunk-WNJDALNM.js", "/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/collections/new": { "id": "routes/entities/collections/new", "parentId": "root", "path": "entities/collections/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/collections/new-FKF7NU2U.js", "imports": ["/build/_shared/chunk-4IYCYPOC.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/[slug]": { "id": "routes/entities/instruments/[slug]", "parentId": "root", "path": "entities/instruments/slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/[slug]-LWP447LW.js", "imports": ["/build/_shared/chunk-RRHTKVRL.js", "/build/_shared/chunk-UKZHEFXV.js", "/build/_shared/chunk-GKDZXAYJ.js", "/build/_shared/chunk-ZZLNVVVK.js", "/build/_shared/chunk-2QUGVLAY.js", "/build/_shared/chunk-ENZPEVYP.js", "/build/_shared/chunk-LLYMHSPL.js", "/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/[slug]/about": { "id": "routes/entities/instruments/[slug]/about", "parentId": "routes/entities/instruments/[slug]", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/[slug]/about-4UN7SQXZ.js", "imports": ["/build/_shared/chunk-KIIWXZTD.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/[slug]/edit": { "id": "routes/entities/instruments/[slug]/edit", "parentId": "routes/entities/instruments/[slug]", "path": "edit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/[slug]/edit-K62AXD2V.js", "imports": ["/build/_shared/chunk-4IYCYPOC.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/[slug]/tags": { "id": "routes/entities/instruments/[slug]/tags", "parentId": "routes/entities/instruments/[slug]", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/[slug]/tags-ZG7ALVVN.js", "imports": ["/build/_shared/chunk-QFB5P7GO.js", "/build/_shared/chunk-KIIWXZTD.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/index": { "id": "routes/entities/instruments/index", "parentId": "root", "path": "entities/instruments", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/index-HC22DDF6.js", "imports": ["/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/instruments/new": { "id": "routes/entities/instruments/new", "parentId": "root", "path": "entities/instruments/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/instruments/new-ZCH7RODU.js", "imports": ["/build/_shared/chunk-4IYCYPOC.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/[slug]": { "id": "routes/entities/people/[slug]", "parentId": "root", "path": "entities/people/slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/people/[slug]-WAY2SLXI.js", "imports": ["/build/_shared/chunk-K7NMSXNA.js", "/build/_shared/chunk-UKZHEFXV.js", "/build/_shared/chunk-GKDZXAYJ.js", "/build/_shared/chunk-ZZLNVVVK.js", "/build/_shared/chunk-2QUGVLAY.js", "/build/_shared/chunk-ENZPEVYP.js", "/build/_shared/chunk-LLYMHSPL.js", "/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/[slug]/about": { "id": "routes/entities/people/[slug]/about", "parentId": "routes/entities/people/[slug]", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/people/[slug]/about-IQJNYKUP.js", "imports": ["/build/_shared/chunk-KIIWXZTD.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/[slug]/edit": { "id": "routes/entities/people/[slug]/edit", "parentId": "routes/entities/people/[slug]", "path": "edit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/people/[slug]/edit-JQWQYZGR.js", "imports": ["/build/_shared/chunk-4IYCYPOC.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/[slug]/tags": { "id": "routes/entities/people/[slug]/tags", "parentId": "routes/entities/people/[slug]", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/people/[slug]/tags-65HZCNO4.js", "imports": ["/build/_shared/chunk-QFB5P7GO.js", "/build/_shared/chunk-KIIWXZTD.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/index": { "id": "routes/entities/people/index", "parentId": "root", "path": "entities/people", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/people/index-7EMPBOQG.js", "imports": ["/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/people/new": { "id": "routes/entities/people/new", "parentId": "root", "path": "entities/people/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/people/new-GY6T5KWN.js", "imports": ["/build/_shared/chunk-4IYCYPOC.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/[slug]": { "id": "routes/entities/places/[slug]", "parentId": "root", "path": "entities/places/slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/places/[slug]-FOTKF5DW.js", "imports": ["/build/_shared/chunk-IIM3AE4S.js", "/build/_shared/chunk-UKZHEFXV.js", "/build/_shared/chunk-GKDZXAYJ.js", "/build/_shared/chunk-ZZLNVVVK.js", "/build/_shared/chunk-2QUGVLAY.js", "/build/_shared/chunk-ENZPEVYP.js", "/build/_shared/chunk-LLYMHSPL.js", "/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/[slug]/about": { "id": "routes/entities/places/[slug]/about", "parentId": "routes/entities/places/[slug]", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/places/[slug]/about-LFXCWL4P.js", "imports": ["/build/_shared/chunk-KIIWXZTD.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/[slug]/edit": { "id": "routes/entities/places/[slug]/edit", "parentId": "routes/entities/places/[slug]", "path": "edit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/places/[slug]/edit-PASNZKXE.js", "imports": ["/build/_shared/chunk-4IYCYPOC.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/[slug]/tags": { "id": "routes/entities/places/[slug]/tags", "parentId": "routes/entities/places/[slug]", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/places/[slug]/tags-7MVJ66DC.js", "imports": ["/build/_shared/chunk-QFB5P7GO.js", "/build/_shared/chunk-KIIWXZTD.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/index": { "id": "routes/entities/places/index", "parentId": "root", "path": "entities/places", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/places/index-W2ANEYJT.js", "imports": ["/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/places/new": { "id": "routes/entities/places/new", "parentId": "root", "path": "entities/places/new", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/places/new-ZWWSBKR2.js", "imports": ["/build/_shared/chunk-4IYCYPOC.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/tunes/[slug]": { "id": "routes/entities/tunes/[slug]", "parentId": "root", "path": "entities/tunes/slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/tunes/[slug]-OS2ZYD4I.js", "imports": ["/build/_shared/chunk-F4Q57ZOB.js", "/build/_shared/chunk-UKZHEFXV.js", "/build/_shared/chunk-GKDZXAYJ.js", "/build/_shared/chunk-ZZLNVVVK.js", "/build/_shared/chunk-2QUGVLAY.js", "/build/_shared/chunk-ENZPEVYP.js", "/build/_shared/chunk-LLYMHSPL.js", "/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/tunes/[slug]/about": { "id": "routes/entities/tunes/[slug]/about", "parentId": "routes/entities/tunes/[slug]", "path": "about", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/tunes/[slug]/about-RLF46GW4.js", "imports": ["/build/_shared/chunk-KIIWXZTD.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/tunes/[slug]/tags": { "id": "routes/entities/tunes/[slug]/tags", "parentId": "routes/entities/tunes/[slug]", "path": "tags", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/entities/tunes/[slug]/tags-NQHEQIGR.js", "imports": ["/build/_shared/chunk-QFB5P7GO.js", "/build/_shared/chunk-KIIWXZTD.js", "/build/_shared/chunk-LAMARZU6.js", "/build/_shared/chunk-VRHS5C76.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/entities/tunes/index": { "id": "routes/entities/tunes/index", "parentId": "root", "path": "entities/tunes", "index": true, "caseSensitive": void 0, "module": "/build/routes/entities/tunes/index-S7OW7P7D.js", "imports": ["/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-CC5ZUQQK.js", "imports": ["/build/_shared/chunk-WNJDALNM.js", "/build/_shared/chunk-BXI6BDQN.js", "/build/_shared/chunk-GKDZXAYJ.js", "/build/_shared/chunk-ZZLNVVVK.js", "/build/_shared/chunk-2QUGVLAY.js", "/build/_shared/chunk-ENZPEVYP.js", "/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/login-P6U67QTE.js", "imports": ["/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/logout": { "id": "routes/logout", "parentId": "root", "path": "logout", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/logout-VLLNZE65.js", "imports": ["/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/saved-items": { "id": "routes/saved-items", "parentId": "root", "path": "saved-items", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/saved-items-7UHHYPFL.js", "imports": ["/build/_shared/chunk-GKDZXAYJ.js", "/build/_shared/chunk-ZZLNVVVK.js", "/build/_shared/chunk-2QUGVLAY.js", "/build/_shared/chunk-ENZPEVYP.js", "/build/_shared/chunk-4IYCYPOC.js", "/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/signup": { "id": "routes/signup", "parentId": "root", "path": "signup", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/signup-KZTBQCHJ.js", "imports": ["/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/users/[id]": { "id": "routes/users/[id]", "parentId": "root", "path": "users/id", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/users/[id]-M7JFTKWP.js", "imports": ["/build/_shared/chunk-GKDZXAYJ.js", "/build/_shared/chunk-ZZLNVVVK.js", "/build/_shared/chunk-2QUGVLAY.js", "/build/_shared/chunk-ENZPEVYP.js", "/build/_shared/chunk-LLYMHSPL.js", "/build/_shared/chunk-A5RP5Q4K.js", "/build/_shared/chunk-UUVQVH4L.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-4CFDA7D7.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/account/submissions/[id]/upload": {
    id: "routes/account/submissions/[id]/upload",
    parentId: "root",
    path: "account/submissions/id/upload",
    index: void 0,
    caseSensitive: void 0,
    module: upload_exports
  },
  "routes/admin/verification-requests": {
    id: "routes/admin/verification-requests",
    parentId: "root",
    path: "admin/verification-requests",
    index: void 0,
    caseSensitive: void 0,
    module: verification_requests_exports
  },
  "routes/entities/audio-items/[slug]": {
    id: "routes/entities/audio-items/[slug]",
    parentId: "root",
    path: "entities/audio-items/slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports
  },
  "routes/entities/audio-items/[slug]/about": {
    id: "routes/entities/audio-items/[slug]/about",
    parentId: "routes/entities/audio-items/[slug]",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports
  },
  "routes/entities/audio-items/[slug]/edit": {
    id: "routes/entities/audio-items/[slug]/edit",
    parentId: "routes/entities/audio-items/[slug]",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports
  },
  "routes/entities/audio-items/[slug]/tags": {
    id: "routes/entities/audio-items/[slug]/tags",
    parentId: "routes/entities/audio-items/[slug]",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports
  },
  "routes/entities/audio-items/random": {
    id: "routes/entities/audio-items/random",
    parentId: "root",
    path: "entities/audio-items/random",
    index: void 0,
    caseSensitive: void 0,
    module: random_exports
  },
  "routes/entities/collections/[slug]": {
    id: "routes/entities/collections/[slug]",
    parentId: "root",
    path: "entities/collections/slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports2
  },
  "routes/entities/collections/[slug]/about": {
    id: "routes/entities/collections/[slug]/about",
    parentId: "routes/entities/collections/[slug]",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports2
  },
  "routes/entities/collections/[slug]/edit": {
    id: "routes/entities/collections/[slug]/edit",
    parentId: "routes/entities/collections/[slug]",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports2
  },
  "routes/entities/collections/[slug]/tags": {
    id: "routes/entities/collections/[slug]/tags",
    parentId: "routes/entities/collections/[slug]",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports2
  },
  "routes/entities/instruments/[slug]": {
    id: "routes/entities/instruments/[slug]",
    parentId: "root",
    path: "entities/instruments/slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports3
  },
  "routes/entities/instruments/[slug]/about": {
    id: "routes/entities/instruments/[slug]/about",
    parentId: "routes/entities/instruments/[slug]",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports3
  },
  "routes/entities/instruments/[slug]/edit": {
    id: "routes/entities/instruments/[slug]/edit",
    parentId: "routes/entities/instruments/[slug]",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports3
  },
  "routes/entities/instruments/[slug]/tags": {
    id: "routes/entities/instruments/[slug]/tags",
    parentId: "routes/entities/instruments/[slug]",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports3
  },
  "routes/entities/audio-items/index": {
    id: "routes/entities/audio-items/index",
    parentId: "root",
    path: "entities/audio-items",
    index: true,
    caseSensitive: void 0,
    module: audio_items_exports
  },
  "routes/entities/collections/index": {
    id: "routes/entities/collections/index",
    parentId: "root",
    path: "entities/collections",
    index: true,
    caseSensitive: void 0,
    module: collections_exports
  },
  "routes/entities/instruments/index": {
    id: "routes/entities/instruments/index",
    parentId: "root",
    path: "entities/instruments",
    index: true,
    caseSensitive: void 0,
    module: instruments_exports
  },
  "routes/account/submissions/index": {
    id: "routes/account/submissions/index",
    parentId: "root",
    path: "account/submissions",
    index: true,
    caseSensitive: void 0,
    module: submissions_exports
  },
  "routes/entities/audio-items/new": {
    id: "routes/entities/audio-items/new",
    parentId: "root",
    path: "entities/audio-items/new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports
  },
  "routes/entities/collections/new": {
    id: "routes/entities/collections/new",
    parentId: "root",
    path: "entities/collections/new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports2
  },
  "routes/entities/instruments/new": {
    id: "routes/entities/instruments/new",
    parentId: "root",
    path: "entities/instruments/new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports3
  },
  "routes/account/submissions/new": {
    id: "routes/account/submissions/new",
    parentId: "root",
    path: "account/submissions/new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports4
  },
  "routes/admin/submissions/index": {
    id: "routes/admin/submissions/index",
    parentId: "root",
    path: "admin/submissions",
    index: true,
    caseSensitive: void 0,
    module: submissions_exports2
  },
  "routes/admin/takedown-requests": {
    id: "routes/admin/takedown-requests",
    parentId: "root",
    path: "admin/takedown-requests",
    index: void 0,
    caseSensitive: void 0,
    module: takedown_requests_exports
  },
  "routes/admin/submissions/[id]": {
    id: "routes/admin/submissions/[id]",
    parentId: "root",
    path: "admin/submissions/id",
    index: void 0,
    caseSensitive: void 0,
    module: id_exports
  },
  "routes/entities/people/[slug]": {
    id: "routes/entities/people/[slug]",
    parentId: "root",
    path: "entities/people/slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports4
  },
  "routes/entities/people/[slug]/about": {
    id: "routes/entities/people/[slug]/about",
    parentId: "routes/entities/people/[slug]",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports4
  },
  "routes/entities/people/[slug]/edit": {
    id: "routes/entities/people/[slug]/edit",
    parentId: "routes/entities/people/[slug]",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports4
  },
  "routes/entities/people/[slug]/tags": {
    id: "routes/entities/people/[slug]/tags",
    parentId: "routes/entities/people/[slug]",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports4
  },
  "routes/entities/places/[slug]": {
    id: "routes/entities/places/[slug]",
    parentId: "root",
    path: "entities/places/slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports5
  },
  "routes/entities/places/[slug]/about": {
    id: "routes/entities/places/[slug]/about",
    parentId: "routes/entities/places/[slug]",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports5
  },
  "routes/entities/places/[slug]/edit": {
    id: "routes/entities/places/[slug]/edit",
    parentId: "routes/entities/places/[slug]",
    path: "edit",
    index: void 0,
    caseSensitive: void 0,
    module: edit_exports5
  },
  "routes/entities/places/[slug]/tags": {
    id: "routes/entities/places/[slug]/tags",
    parentId: "routes/entities/places/[slug]",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports5
  },
  "routes/entities/people/index": {
    id: "routes/entities/people/index",
    parentId: "root",
    path: "entities/people",
    index: true,
    caseSensitive: void 0,
    module: people_exports
  },
  "routes/entities/places/index": {
    id: "routes/entities/places/index",
    parentId: "root",
    path: "entities/places",
    index: true,
    caseSensitive: void 0,
    module: places_exports
  },
  "routes/entities/tunes/[slug]": {
    id: "routes/entities/tunes/[slug]",
    parentId: "root",
    path: "entities/tunes/slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports6
  },
  "routes/entities/tunes/[slug]/about": {
    id: "routes/entities/tunes/[slug]/about",
    parentId: "routes/entities/tunes/[slug]",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports6
  },
  "routes/entities/tunes/[slug]/tags": {
    id: "routes/entities/tunes/[slug]/tags",
    parentId: "routes/entities/tunes/[slug]",
    path: "tags",
    index: void 0,
    caseSensitive: void 0,
    module: tags_exports6
  },
  "routes/entities/tunes/index": {
    id: "routes/entities/tunes/index",
    parentId: "root",
    path: "entities/tunes",
    index: true,
    caseSensitive: void 0,
    module: tunes_exports
  },
  "routes/entities/people/new": {
    id: "routes/entities/people/new",
    parentId: "root",
    path: "entities/people/new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports5
  },
  "routes/entities/places/new": {
    id: "routes/entities/places/new",
    parentId: "root",
    path: "entities/places/new",
    index: void 0,
    caseSensitive: void 0,
    module: new_exports6
  },
  "routes/account/verify": {
    id: "routes/account/verify",
    parentId: "root",
    path: "account/verify",
    index: void 0,
    caseSensitive: void 0,
    module: verify_exports
  },
  "routes/account/index": {
    id: "routes/account/index",
    parentId: "root",
    path: "account",
    index: true,
    caseSensitive: void 0,
    module: account_exports
  },
  "routes/admin/index": {
    id: "routes/admin/index",
    parentId: "root",
    path: "admin",
    index: true,
    caseSensitive: void 0,
    module: admin_exports
  },
  "routes/saved-items": {
    id: "routes/saved-items",
    parentId: "root",
    path: "saved-items",
    index: void 0,
    caseSensitive: void 0,
    module: saved_items_exports
  },
  "routes/auto-login": {
    id: "routes/auto-login",
    parentId: "root",
    path: "auto-login",
    index: void 0,
    caseSensitive: void 0,
    module: auto_login_exports
  },
  "routes/users/[id]": {
    id: "routes/users/[id]",
    parentId: "root",
    path: "users/id",
    index: void 0,
    caseSensitive: void 0,
    module: id_exports2
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/signup": {
    id: "routes/signup",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: signup_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  }
};
module.exports = __toCommonJS(stdin_exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  assets,
  entry,
  routes
});
//# sourceMappingURL=index.js.map

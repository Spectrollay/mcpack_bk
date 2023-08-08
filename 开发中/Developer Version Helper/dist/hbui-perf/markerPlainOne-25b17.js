/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 3820:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Map = void 0;
const react_1 = __importDefault(__webpack_require__(7294));
const useFacetMemo_1 = __webpack_require__(4833);
const useFacetUnwrap_1 = __webpack_require__(8684);
const useFacetMap_1 = __webpack_require__(4283);
const types_1 = __webpack_require__(4093);
const Map = ({ array, children, equalityCheck }) => {
    var _a;
    const countValue = (_a = (0, useFacetUnwrap_1.useFacetUnwrap)((0, useFacetMap_1.useFacetMap)((array) => array.length, [], [array]))) !== null && _a !== void 0 ? _a : 0;
    return (react_1.default.createElement(react_1.default.Fragment, null, times((index) => equalityCheck != null ? (react_1.default.createElement(MapChildMemo, { key: index, arrayFacet: array, index: index, equalityCheck: equalityCheck, children: children })) : (react_1.default.createElement(MapChild, { key: index, arrayFacet: array, index: index, children: children })), countValue !== types_1.NO_VALUE ? countValue : 0)));
};
exports.Map = Map;
const MapChildMemo = ({ arrayFacet, index, children, equalityCheck }) => {
    const childFacet = (0, useFacetMemo_1.useFacetMemo)((array) => {
        if (index < array.length)
            return array[index];
        return types_1.NO_VALUE;
    }, [index], [arrayFacet], equalityCheck);
    return children(childFacet, index);
};
const MapChild = ({ arrayFacet, index, children }) => {
    const childFacet = (0, useFacetMap_1.useFacetMap)((array) => {
        if (index < array.length)
            return array[index];
        return types_1.NO_VALUE;
    }, [index], [arrayFacet]);
    return children(childFacet, index);
};
const times = (fn, n) => {
    const result = [];
    for (let index = 0; index < n; index++) {
        result.push(fn(index));
    }
    return result;
};
//# sourceMappingURL=Map.js.map

/***/ }),

/***/ 2885:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Mount = void 0;
const useFacetUnwrap_1 = __webpack_require__(8684);
const Mount = ({ when, children, condition = true }) => {
    const whenValue = (0, useFacetUnwrap_1.useFacetUnwrap)(when);
    return whenValue === condition ? children : null;
};
exports.Mount = Mount;
//# sourceMappingURL=Mount.js.map

/***/ }),

/***/ 725:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.With = void 0;
const useFacetUnwrap_1 = __webpack_require__(8684);
const useFacetMap_1 = __webpack_require__(4283);
const hasData = (_, shouldRender) => {
    return shouldRender === true;
};
const With = ({ data, children }) => {
    const shouldRenderFacet = (0, useFacetMap_1.useFacetMap)((data) => data != null, [], [data]);
    const shouldRender = (0, useFacetUnwrap_1.useFacetUnwrap)(shouldRenderFacet);
    return hasData(data, shouldRender) ? children(data) : null;
};
exports.With = With;
//# sourceMappingURL=With.js.map

/***/ }),

/***/ 2493:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(3820), exports);
__exportStar(__webpack_require__(2885), exports);
__exportStar(__webpack_require__(725), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 1024:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createOptionalValueEqualityCheck = exports.createObjectWithKeySpecificEqualityCheck = exports.createUniformArrayEqualityCheck = exports.createUniformObjectEqualityCheck = exports.createNullableEqualityCheck = void 0;
const types_1 = __webpack_require__(4093);
/**
 * Creates an equality check that accepts null and undefined values
 *
 * @param comparator comparator to be wrapped with the null check
 */
const createNullableEqualityCheck = (comparator) => {
    const check = comparator();
    let previous = types_1.NO_VALUE;
    return (value) => {
        if (value == null || previous == null) {
            if (value != previous) {
                previous = value;
                return false;
            }
            else {
                return true;
            }
        }
        previous = value;
        return check(value);
    };
};
exports.createNullableEqualityCheck = createNullableEqualityCheck;
/**
 * Creates an equality check that tests that the values of all the properties in an object
 * haven't changed.
 *
 * The comparison used for the value of the properties is passed to it as an argument.
 *
 * @param comparator the equality check to be run for each property
 */
const createUniformObjectEqualityCheck = (comparator) => () => {
    const previous = {};
    let previousKeys = new Set();
    let initialized = false;
    return (current) => {
        var _a;
        let isEquals = true;
        for (const key in current) {
            if (!(key in previous)) {
                previous[key] = comparator();
            }
            if (!((_a = previous[key]) === null || _a === void 0 ? void 0 : _a.call(previous, current[key]))) {
                isEquals = false;
            }
            previousKeys.delete(key);
        }
        if (previousKeys.size > 0) {
            for (const key of previousKeys) {
                delete previous[key];
            }
            isEquals = false;
        }
        previousKeys = new Set();
        for (const key in current) {
            previousKeys.add(key);
        }
        if (!initialized) {
            initialized = true;
            return false;
        }
        return isEquals;
    };
};
exports.createUniformObjectEqualityCheck = createUniformObjectEqualityCheck;
/**
 * Creates an equality check that tests that the items in an array
 * haven't changed.
 *
 * The comparison used for the individual items is passed to it as an argument.
 *
 * @param comparator the equality check to be run for each item
 */
const createUniformArrayEqualityCheck = (comparator) => () => {
    const previous = [];
    let initialized = false;
    return (current) => {
        var _a, _b;
        const longestLength = Math.max((_a = previous === null || previous === void 0 ? void 0 : previous.length) !== null && _a !== void 0 ? _a : 0, (_b = current === null || current === void 0 ? void 0 : current.length) !== null && _b !== void 0 ? _b : 0);
        let isEquals = true;
        for (let i = 0; i < longestLength; i++) {
            if (previous[i] == null) {
                previous[i] = comparator();
            }
            if (!previous[i](current[i])) {
                isEquals = false;
            }
        }
        if (!initialized) {
            initialized = true;
            return false;
        }
        return isEquals;
    };
};
exports.createUniformArrayEqualityCheck = createUniformArrayEqualityCheck;
/**
 * Creates an equality check that tests whether each property of the target object has changed.
 * Each property is tested with a different comparator, so that they can be of different types.
 *
 * The comparator are passed down to it as an object with the same keys as the target object, but
 * comparators for each property as values.
 *
 * @param comparators the object containing the equality checks to be run for each property
 */
const createObjectWithKeySpecificEqualityCheck = (comparators) => () => {
    const initializingComparators = {};
    for (const key in comparators) {
        initializingComparators[key] = comparators[key]();
    }
    const initializedComparators = initializingComparators;
    return (current) => {
        let isEqual = true;
        for (const key in current) {
            if (!initializedComparators[key](current[key])) {
                // We don't break or skip the next comparators because we need all comparators
                // to run for their internal values to update, so we complete the for loop
                // even if one of the comparators reports false early on
                isEqual = false;
            }
        }
        return isEqual;
    };
};
exports.createObjectWithKeySpecificEqualityCheck = createObjectWithKeySpecificEqualityCheck;
/**
 * Creates an equality check that tests whether the value changed from null to defined or stayed the same
 *
 * If the value was not null before and it is not null currently, the comparison is done by the equality check
 * provided as an argument to this creator.
 *
 * This creator is useful to be able to make equality checkers for optional properties when you already have
 * an equality check for the underlying type.
 *
 * @param comparator the equality check to be run in case the value was defined before and now
 */
const createOptionalValueEqualityCheck = (comparator) => () => {
    let previousWasNullish = true;
    let initializedComparator = comparator();
    return (current) => {
        if (current == null) {
            if (previousWasNullish) {
                return true;
            }
            // If the next value is nullish, the current comparator will be outdated.
            // We cannot simply pass a nullish value to it, since it doesn't accept nullish.
            // Instead, we need to initialize a new comparator to reset it
            initializedComparator = comparator();
            previousWasNullish = true;
            return false;
        }
        previousWasNullish = false;
        return initializedComparator(current);
    };
};
exports.createOptionalValueEqualityCheck = createOptionalValueEqualityCheck;
//# sourceMappingURL=createEqualityChecks.js.map

/***/ }),

/***/ 7755:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createFacetContext = void 0;
const react_1 = __webpack_require__(7294);
function createFacetContext(initialValue) {
    let warnedAboutInvalidAccess = false;
    const facet = {
        get: () => initialValue,
        observe: (listener) => {
            if (false) {}
            listener(initialValue);
            return () => { };
        },
    };
    const context = (0, react_1.createContext)(facet);
    return context;
}
exports.createFacetContext = createFacetContext;
function parseInitialValue(initialValue) {
    try {
        return JSON.stringify(initialValue, null, 2);
    }
    catch (e) {
        return initialValue;
    }
}
//# sourceMappingURL=createFacetContext.js.map

/***/ }),

/***/ 2868:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultEqualityCheck = exports.nullableShallowArrayEqualityCheck = exports.nullableShallowObjectArrayEqualityCheck = exports.nullableShallowObjectEqualityCheck = exports.shallowArrayEqualityCheck = exports.shallowObjectArrayEqualityCheck = exports.shallowObjectEqualityCheck = exports.strictEqualityCheck = void 0;
const createEqualityChecks_1 = __webpack_require__(1024);
const types_1 = __webpack_require__(4093);
/**
 * Checks that the current value is exactly the same as the other previous one. Accepts value of type
 * function, number, boolean, string, undefined or null
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const strictEqualityCheck = () => {
    let previous = types_1.NO_VALUE;
    return (current) => {
        if (previous !== current) {
            previous = current;
            return false;
        }
        return true;
    };
};
exports.strictEqualityCheck = strictEqualityCheck;
/**
 * Equality check that verifies the values of each key of an object.
 * Each value must be a primitive (boolean, number or string)
 *
 * For null or undefined values see nullableShallowObjectEqualityCheck
 */
exports.shallowObjectEqualityCheck = (0, createEqualityChecks_1.createUniformObjectEqualityCheck)(exports.strictEqualityCheck);
/**
 * Does a shallow object equality check for each element in an array
 *
 * For null or undefined values see nullableShallowObjectArrayEqualityCheck
 */
exports.shallowObjectArrayEqualityCheck = (0, createEqualityChecks_1.createUniformArrayEqualityCheck)(exports.shallowObjectEqualityCheck);
/**
 * Shallow equality check of primitives in an array
 *
 * For null or undefined values see nullableShallowArrayEqualityCheck
 */
exports.shallowArrayEqualityCheck = (0, createEqualityChecks_1.createUniformArrayEqualityCheck)(exports.strictEqualityCheck);
/**
 * Equality check that verifies the values of each key of an object.
 * Each value must be a primitive (boolean, number or string)
 *
 * Supports nullable values
 */
const nullableShallowObjectEqualityCheck = () => (0, createEqualityChecks_1.createNullableEqualityCheck)((0, createEqualityChecks_1.createUniformObjectEqualityCheck)(exports.strictEqualityCheck));
exports.nullableShallowObjectEqualityCheck = nullableShallowObjectEqualityCheck;
/**
 * Does a shallow object equality check for each element in an array
 *
 * Supports nullable values
 */
exports.nullableShallowObjectArrayEqualityCheck = (0, createEqualityChecks_1.createNullableEqualityCheck)((0, createEqualityChecks_1.createUniformArrayEqualityCheck)(exports.shallowObjectEqualityCheck));
/**
 * Shallow equality check of primitives in an array
 *
 * Supports nullable values
 */
exports.nullableShallowArrayEqualityCheck = (0, createEqualityChecks_1.createNullableEqualityCheck)((0, createEqualityChecks_1.createUniformArrayEqualityCheck)(exports.strictEqualityCheck));
/**
 * The default equality check that assumes data can be mutated.
 * It is used internally by default, so there is no need to provide it.
 */
const defaultEqualityCheck = () => {
    let previous = types_1.NO_VALUE;
    return (current) => {
        const typeofValue = typeof current;
        if (!(typeofValue === 'number' ||
            typeofValue === 'string' ||
            typeofValue === 'boolean' ||
            current === null ||
            current === undefined)) {
            return false;
        }
        if (current !== previous) {
            previous = current;
            return false;
        }
        return true;
    };
};
exports.defaultEqualityCheck = defaultEqualityCheck;
//# sourceMappingURL=equalityChecks.js.map

/***/ }),

/***/ 486:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createFacet = void 0;
const equalityChecks_1 = __webpack_require__(2868);
const types_1 = __webpack_require__(4093);
/**
 * The low level function to create a Facet, not recommended to be used if you can use any of the react facet hooks to create facets instead (Ex: useFacetState, useFacetWrap)
 */
function createFacet({ initialValue, startSubscription, equalityCheck = equalityChecks_1.defaultEqualityCheck, }) {
    const listeners = new Set();
    let currentValue = initialValue;
    let cleanupSubscription;
    const checker = equalityCheck === null || equalityCheck === void 0 ? void 0 : equalityCheck();
    const update = (newValue) => {
        if (equalityCheck != null) {
            // we optimize for the most common scenario of using the defaultEqualityCheck (by inline its implementation)
            if (equalityCheck === equalityChecks_1.defaultEqualityCheck) {
                const typeofValue = typeof newValue;
                if ((typeofValue === 'number' ||
                    typeofValue === 'string' ||
                    typeofValue === 'boolean' ||
                    newValue === null ||
                    newValue === undefined) &&
                    currentValue === newValue) {
                    return;
                }
            }
            else {
                if (checker != null && checker(newValue)) {
                    return;
                }
            }
        }
        currentValue = newValue;
        for (const listener of listeners) {
            listener(currentValue);
        }
    };
    /**
     * Simpler update implementation that only resets the value and runs all cleanup functions.
     * Done as a separated function to not interfere with the usual "hot-path" of the update function.
     */
    const updateToNoValue = () => {
        currentValue = types_1.NO_VALUE;
    };
    return {
        set: update,
        setWithCallback: (setter) => {
            const value = setter(currentValue);
            if (value === types_1.NO_VALUE) {
                updateToNoValue();
            }
            else {
                update(value);
            }
        },
        get: () => currentValue,
        observe: (listener) => {
            listeners.add(listener);
            if (currentValue !== types_1.NO_VALUE) {
                listener(currentValue);
            }
            // This is the first subscription, so we start subscribing to dependencies
            if (listeners.size === 1 && startSubscription) {
                cleanupSubscription = startSubscription(update);
            }
            return () => {
                listeners.delete(listener);
                // if this was the last to unsubscribe, we unsubscribe from our dependencies
                if (listeners.size === 0 && cleanupSubscription) {
                    currentValue = initialValue;
                    cleanupSubscription();
                }
            };
        },
    };
}
exports.createFacet = createFacet;
//# sourceMappingURL=createFacet.js.map

/***/ }),

/***/ 7200:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createReadOnlyFacet = void 0;
const createFacet_1 = __webpack_require__(486);
function createReadOnlyFacet(options) {
    return (0, createFacet_1.createFacet)(options);
}
exports.createReadOnlyFacet = createReadOnlyFacet;
//# sourceMappingURL=createReadOnlyFacet.js.map

/***/ }),

/***/ 9095:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createStaticFacet = void 0;
/**
 * Creates a nonwritable barebones static facet to be used when you need an initial facet value outside the react context
 * that's meant to be replaced later by a real facet. Ex: with `createContext()`
 */
function createStaticFacet(value) {
    const facet = {
        get: () => value,
        observe: (listener) => {
            listener(value);
            return () => { };
        },
    };
    return facet;
}
exports.createStaticFacet = createStaticFacet;
//# sourceMappingURL=createStaticFacet.js.map

/***/ }),

/***/ 6103:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(486), exports);
__exportStar(__webpack_require__(7200), exports);
__exportStar(__webpack_require__(9095), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 7190:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.areAllDefinedValues = void 0;
const hasDefinedValue_1 = __webpack_require__(3127);
const areAllDefinedValues = (facetValues) => {
    for (let i = 0; i < facetValues.length; i++) {
        if (!(0, hasDefinedValue_1.hasDefinedValue)(facetValues[i])) {
            return false;
        }
    }
    return true;
};
exports.areAllDefinedValues = areAllDefinedValues;
//# sourceMappingURL=areAllDefinedValues.js.map

/***/ }),

/***/ 3127:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.hasDefinedValue = void 0;
const types_1 = __webpack_require__(4093);
const hasDefinedValue = (value) => value != null && value !== types_1.NO_VALUE;
exports.hasDefinedValue = hasDefinedValue;
//# sourceMappingURL=hasDefinedValue.js.map

/***/ }),

/***/ 5900:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(7190), exports);
__exportStar(__webpack_require__(3127), exports);
__exportStar(__webpack_require__(6191), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 6191:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.multiObserve = void 0;
const types_1 = __webpack_require__(4093);
/**
 * Allows running an effect based on facet updates. Similar to React's useEffect.
 *
 * @param effect function that will do the side-effect (ex: update the DOM)
 * @param dependencies variable used by the map that are available in scope (similar as dependencies of useEffect)
 * @param facets facets that the effect listens to
 *
 * We pass the dependencies of the callback as the second argument so we can leverage the eslint-plugin-react-hooks option for additionalHooks.
 * Having this as the second argument allows the linter to work.
 */
function multiObserve(effect, facets) {
    if (facets.length === 1) {
        return facets[0].observe(effect);
    }
    let cleanup;
    let hasAllDependencies = false;
    const unsubscribes = [];
    const values = facets.map(() => types_1.NO_VALUE);
    for (let i = 0; i < facets.length; i++) {
        unsubscribes[i] = facets[i].observe((value) => {
            values[i] = value;
            hasAllDependencies = hasAllDependencies || values.every((value) => value != types_1.NO_VALUE);
            if (hasAllDependencies) {
                if (cleanup != null) {
                    cleanup();
                }
                cleanup = effect(...values);
            }
        });
    }
    return () => {
        for (let index = 0; index < unsubscribes.length; index++) {
            unsubscribes[index]();
        }
        if (cleanup != null) {
            cleanup();
        }
    };
}
exports.multiObserve = multiObserve;
//# sourceMappingURL=multiObserve.js.map

/***/ }),

/***/ 7923:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(2367), exports);
__exportStar(__webpack_require__(6955), exports);
__exportStar(__webpack_require__(8488), exports);
__exportStar(__webpack_require__(4283), exports);
__exportStar(__webpack_require__(4833), exports);
__exportStar(__webpack_require__(813), exports);
__exportStar(__webpack_require__(551), exports);
__exportStar(__webpack_require__(6280), exports);
__exportStar(__webpack_require__(5174), exports);
__exportStar(__webpack_require__(8684), exports);
__exportStar(__webpack_require__(9751), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 2367:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useFacetCallback = void 0;
const react_1 = __webpack_require__(7294);
const types_1 = __webpack_require__(4093);
function useFacetCallback(callback, dependencies, facets, defaultReturnValue) {
    (0, react_1.useLayoutEffect)(() => {
        // Make sure to start subscriptions, even though we are getting the values directly from them
        // We read the values using `.get` to make sure they are always up-to-date
        const unsubscribes = facets.map((facet) => facet.observe(() => { }));
        return () => {
            unsubscribes.forEach((unsubscribe) => unsubscribe());
        };
        // We care about each individual facet and if any is a different reference
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, facets);
    // We care about each individual dependency and if any is a different reference
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const callbackMemoized = (0, react_1.useCallback)(callback, dependencies);
    // Setup a ref so that the callback instance below can be kept the same
    // when Facet instances change across re-renders
    const facetsRef = (0, react_1.useRef)(facets);
    facetsRef.current = facets;
    return (0, react_1.useCallback)((...args) => {
        const facets = facetsRef.current;
        const values = facets.map((facet) => facet.get());
        for (const value of values) {
            if (value === types_1.NO_VALUE)
                return defaultReturnValue != null ? defaultReturnValue : types_1.NO_VALUE;
        }
        return callbackMemoized(...values)(...args);
    }, [callbackMemoized, defaultReturnValue]);
}
exports.useFacetCallback = useFacetCallback;
//# sourceMappingURL=useFacetCallback.js.map

/***/ }),

/***/ 6955:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useFacetEffect = exports.createUseFacetEffect = void 0;
const react_1 = __webpack_require__(7294);
const types_1 = __webpack_require__(4093);
const createUseFacetEffect = (useHook) => {
    return function (effect, dependencies, facets) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const effectMemoized = (0, react_1.useCallback)(effect, dependencies);
        useHook(() => {
            let cleanup;
            if (facets.length === 1) {
                const unsubscribe = facets[0].observe((value) => {
                    if (cleanup != null) {
                        cleanup();
                    }
                    cleanup = effectMemoized(value);
                });
                return () => {
                    unsubscribe();
                    if (cleanup != null) {
                        cleanup();
                    }
                };
            }
            let hasAllDependencies = false;
            const unsubscribes = [];
            const values = facets.map(() => types_1.NO_VALUE);
            facets.forEach((facet, index) => {
                unsubscribes[index] = facet.observe((value) => {
                    values[index] = value;
                    hasAllDependencies = hasAllDependencies || values.every((value) => value != types_1.NO_VALUE);
                    if (hasAllDependencies) {
                        if (cleanup != null) {
                            cleanup();
                        }
                        cleanup = effectMemoized(...values);
                    }
                });
            });
            return () => {
                unsubscribes.forEach((unsubscribe) => unsubscribe());
                if (cleanup != null) {
                    cleanup();
                }
            };
            // We care about each individual facet and if any is a different reference
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [effectMemoized, ...facets]);
    };
};
exports.createUseFacetEffect = createUseFacetEffect;
/**
 * Allows running an effect based on facet updates. Similar to React's useEffect.
 *
 * @param effect function that will do the side-effect (ex: update the DOM)
 * @param dependencies variable used by the map that are available in scope (similar as dependencies of useEffect)
 * @param facets facets that the effect listens to
 *
 * We pass the dependencies of the callback as the second argument so we can leverage the eslint-plugin-react-hooks option for additionalHooks.
 * Having this as the second argument allows the linter to work.
 */
exports.useFacetEffect = (0, exports.createUseFacetEffect)(react_1.useEffect);
//# sourceMappingURL=useFacetEffect.js.map

/***/ }),

/***/ 8488:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useFacetLayoutEffect = void 0;
const react_1 = __webpack_require__(7294);
const useFacetEffect_1 = __webpack_require__(6955);
/**
 * Allows running an effect based on facet updates. Similar to React's useLayoutEffect.
 *
 * @param effect function that will do the side-effect (ex: update the DOM)
 * @param dependencies variable used by the map that are available in scope (similar as dependencies of useEffect)
 * @param facets facets that the effect listens to
 *
 * We pass the dependencies of the callback as the second argument so we can leverage the eslint-plugin-react-hooks option for additionalHooks.
 * Having this as the second argument allows the linter to work.
 */
exports.useFacetLayoutEffect = (0, useFacetEffect_1.createUseFacetEffect)(react_1.useLayoutEffect);
//# sourceMappingURL=useFacetLayoutEffect.js.map

/***/ }),

/***/ 4283:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useFacetMap = void 0;
const react_1 = __webpack_require__(7294);
const equalityChecks_1 = __webpack_require__(2868);
const mapFacets_1 = __webpack_require__(2914);
/**
 * Helper hook that allows mapping a value from a facet with local variables/props in a React component
 *
 * @param selector function that takes value from provided facets and maps them to a new value
 * @param dependencies variable used by the selector that are available in scope (similar as dependencies of useEffect)
 * @param facets facets that we will listen for its values to be mapped
 * @param equalityCheck optional, has a default for immutable values
 *
 * We pass the dependencies of the callback as the second argument so we can leverage the eslint-plugin-react-hooks option for additionalHooks.
 * Having this as the second argument allows the linter to work.
 *
 * @returns a new facet definition that can be consumed as a regular facet
 */
function useFacetMap(selector, dependencies, facets, equalityCheck = equalityChecks_1.defaultEqualityCheck) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const selectorMemoized = (0, react_1.useCallback)(selector, dependencies);
    const facetComposition = (0, react_1.useMemo)(() => {
        return (0, mapFacets_1.mapFacetsLightweight)(facets, selectorMemoized, equalityCheck);
        // We need to disable the linter on the next line given we are spreading the facets as individual dependencies
        // of the effect. We do this to avoid re-running this effect when passing a new array with the same facets.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectorMemoized, equalityCheck, ...facets]);
    return facetComposition;
}
exports.useFacetMap = useFacetMap;
//# sourceMappingURL=useFacetMap.js.map

/***/ }),

/***/ 4833:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useFacetMemo = void 0;
const react_1 = __webpack_require__(7294);
const equalityChecks_1 = __webpack_require__(2868);
const mapFacets_1 = __webpack_require__(2914);
/**
 * Helper hook that allows mapping a value from a facet with local variables/props in a React component
 *
 * @param selector function that takes value from provided facets and maps them to a new value
 * @param dependencies variable used by the selector that are available in scope (similar as dependencies of useEffect)
 * @param facets facets that we will listen for its values to be mapped
 * @param equalityCheck optional, has a default for immutable values
 *
 * We pass the dependencies of the callback as the second argument so we can leverage the eslint-plugin-react-hooks option for additionalHooks.
 * Having this as the second argument allows the linter to work.
 *
 * @returns a new facet definition that can be consumed as a regular facet
 */
function useFacetMemo(selector, dependencies, facets, equalityCheck = equalityChecks_1.defaultEqualityCheck) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const selectorMemoized = (0, react_1.useCallback)(selector, dependencies);
    const facetComposition = (0, react_1.useMemo)(() => {
        return (0, mapFacets_1.mapFacetsCached)(facets, selectorMemoized, equalityCheck);
        // We need to disable the linter on the next line given we are spreading the facets as individual dependencies
        // of the effect. We do this to avoid re-running this effect when passing a new array with the same facets.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectorMemoized, equalityCheck, ...facets]);
    return facetComposition;
}
exports.useFacetMemo = useFacetMemo;
//# sourceMappingURL=useFacetMemo.js.map

/***/ }),

/***/ 813:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useFacetPropSetter = void 0;
const react_1 = __webpack_require__(7294);
const types_1 = __webpack_require__(4093);
/**
 * Hook that returns a setter function to a specific property of a given a localFacet
 * Ex:
 * 	- Given a local facet { foo: 'bar' }
 *  - Could be used as useFacetSetter(facet, 'foo')
 *  - And the setter would set the foo property
 *
 * @param facet
 * @param prop the name of the prop to set
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useFacetPropSetter(facet, prop) {
    return (0, react_1.useMemo)(() => (value) => {
        facet.setWithCallback((prev) => (Object.assign(Object.assign({}, (prev != types_1.NO_VALUE ? prev : {})), { [prop]: value })));
    }, [facet, prop]);
}
exports.useFacetPropSetter = useFacetPropSetter;
//# sourceMappingURL=useFacetPropSetter.js.map

/***/ }),

/***/ 6280:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useFacetReducer = void 0;
const react_1 = __webpack_require__(7294);
const equalityChecks_1 = __webpack_require__(2868);
const useFacetState_1 = __webpack_require__(5174);
/**
 * Provides a parallel to React's useReducer, but instead returns a facet as the value
 *
 * @param reducer function that will take the previous state and an action to return a new state
 * @param initialState mandatory initial state for the reducer's facet
 * @param equalityCheck optional equality check (has a default checker)
 * @returns
 */
const useFacetReducer = (reducer, initialState, equalityCheck = equalityChecks_1.defaultEqualityCheck) => {
    const [state, setState] = (0, useFacetState_1.useFacetState)(initialState, equalityCheck);
    const dispatch = (0, react_1.useCallback)((action) => {
        setState((previousState) => reducer(previousState, action));
    }, [reducer, setState]);
    return [state, dispatch];
};
exports.useFacetReducer = useFacetReducer;
//# sourceMappingURL=useFacetReducer.js.map

/***/ }),

/***/ 551:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useFacetRef = void 0;
const react_1 = __webpack_require__(7294);
const useFacetEffect_1 = __webpack_require__(6955);
const types_1 = __webpack_require__(4093);
function useFacetRef(facet, defaultValue) {
    let value = facet.get();
    if (value === types_1.NO_VALUE && defaultValue != undefined) {
        value = defaultValue;
    }
    const ref = (0, react_1.useRef)(value);
    (0, useFacetEffect_1.useFacetEffect)((value) => {
        ref.current = value;
    }, [], [facet]);
    return ref;
}
exports.useFacetRef = useFacetRef;
//# sourceMappingURL=useFacetRef.js.map

/***/ }),

/***/ 5174:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useFacetState = void 0;
const react_1 = __webpack_require__(7294);
const equalityChecks_1 = __webpack_require__(2868);
const facet_1 = __webpack_require__(6103);
/**
 * Provides a parallel to React's useState, but instead returns a facet as the value
 *
 * @param initialValue mandatory initial value (pass NO_VALUE to force it to be uninitialized)
 * @param equalityCheck optional (has a default checker)
 */
const useFacetState = (initialValue, equalityCheck = equalityChecks_1.defaultEqualityCheck) => {
    return (0, react_1.useMemo)(() => {
        const inlineFacet = (0, facet_1.createFacet)({ initialValue, equalityCheck });
        const setter = (setter) => {
            if (isSetterCallback(setter)) {
                inlineFacet.setWithCallback(setter);
            }
            else {
                inlineFacet.set(setter);
            }
        };
        return [inlineFacet, setter];
        /**
         * We ignore the changes to the initialValue since changes to the facet
         * done after creation must only be done through the setter, and we want
         * to ensure not to accidentally put more values in memory.
         */
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
};
exports.useFacetState = useFacetState;
const isSetterCallback = (setter) => {
    return typeof setter === 'function';
};
//# sourceMappingURL=useFacetState.js.map

/***/ }),

/***/ 8684:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useFacetUnwrap = void 0;
const react_1 = __webpack_require__(7294);
const types_1 = __webpack_require__(4093);
/**
 * Hook that allows consuming values from a Facet
 * It acts as a regular react state, triggering a re-render of the component
 *
 * @param facet
 */
function useFacetUnwrap(prop) {
    const [state, setState] = (0, react_1.useState)(() => {
        if (!(0, types_1.isFacet)(prop))
            return { value: prop };
        return {
            value: prop.get(),
        };
    });
    (0, react_1.useLayoutEffect)(() => {
        if ((0, types_1.isFacet)(prop)) {
            return prop.observe((value) => {
                setState((previousState) => {
                    const { value: previousValue } = previousState;
                    const typeofValue = typeof previousValue;
                    /**
                     * Performs this equality check locally to prevent triggering two consecutive renderings
                     * for facets that have immutable values (unfortunately we can't handle mutable values).
                     *
                     * The two renderings might happen for the same state value if the Facet has a value on mount.
                     *
                     * The unwrap will get the value:
                     * - Once on initialization of the useState above
                     * - And another time on this observe initialization
                     */
                    if ((typeofValue === 'number' ||
                        typeofValue === 'string' ||
                        typeofValue === 'boolean' ||
                        value === undefined ||
                        value === null) &&
                        value === previousValue) {
                        return previousState;
                    }
                    return { value };
                });
            });
        }
    }, [prop]);
    return (0, types_1.isFacet)(prop) ? state.value : prop;
}
exports.useFacetUnwrap = useFacetUnwrap;
//# sourceMappingURL=useFacetUnwrap.js.map

/***/ }),

/***/ 9751:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useFacetWrap = void 0;
const react_1 = __webpack_require__(7294);
const equalityChecks_1 = __webpack_require__(2868);
const facet_1 = __webpack_require__(6103);
const types_1 = __webpack_require__(4093);
/**
 * Wraps a FacetProp as a Facet
 * @param value
 */
function useFacetWrap(prop, equalityCheck = equalityChecks_1.defaultEqualityCheck) {
    const is = (0, types_1.isFacet)(prop);
    /**
     * Inline facet that only created if the provided prop is not a facet.
     *
     * We ignore the dependency change of `prop` since we want to update the inline
     * facet value via the setter below.
     */
    const inlineFacet = (0, react_1.useMemo)(() => (is ? undefined : (0, facet_1.createFacet)({ initialValue: prop, equalityCheck })), 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [is]);
    if (inlineFacet == null) {
        return prop;
    }
    else {
        inlineFacet.set(prop);
        return inlineFacet;
    }
}
exports.useFacetWrap = useFacetWrap;
//# sourceMappingURL=useFacetWrap.js.map

/***/ }),

/***/ 8572:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(2493), exports);
__exportStar(__webpack_require__(1024), exports);
__exportStar(__webpack_require__(7755), exports);
__exportStar(__webpack_require__(2868), exports);
__exportStar(__webpack_require__(6103), exports);
__exportStar(__webpack_require__(5900), exports);
__exportStar(__webpack_require__(7923), exports);
__exportStar(__webpack_require__(2914), exports);
__exportStar(__webpack_require__(4093), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 2914:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(3118), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 8273:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapFacetArrayCached = void 0;
const types_1 = __webpack_require__(4093);
const mapIntoObserveArray_1 = __webpack_require__(1794);
const facet_1 = __webpack_require__(6103);
function mapFacetArrayCached(facets, fn, equalityCheck) {
    return (0, facet_1.createFacet)({
        // pass the equalityCheck to the mapIntoObserveArray to prevent even triggering the observable
        startSubscription: (0, mapIntoObserveArray_1.mapIntoObserveArray)(facets, fn, equalityCheck),
        initialValue: types_1.NO_VALUE,
    });
}
exports.mapFacetArrayCached = mapFacetArrayCached;
//# sourceMappingURL=mapFacetArrayCached.js.map

/***/ }),

/***/ 9160:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapFacetArrayLightweight = void 0;
const mapIntoObserveArray_1 = __webpack_require__(1794);
const types_1 = __webpack_require__(4093);
function mapFacetArrayLightweight(facets, fn, equalityCheck) {
    return {
        get: () => {
            const values = facets.map((facet) => facet.get());
            const hasAllValues = values.reduce((acc, value) => acc && value !== types_1.NO_VALUE, true);
            if (!hasAllValues)
                return types_1.NO_VALUE;
            return fn(...values);
        },
        observe: (0, mapIntoObserveArray_1.mapIntoObserveArray)(facets, fn, equalityCheck),
    };
}
exports.mapFacetArrayLightweight = mapFacetArrayLightweight;
//# sourceMappingURL=mapFacetArrayLightweight.js.map

/***/ }),

/***/ 6741:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapFacetSingleCached = void 0;
const types_1 = __webpack_require__(4093);
const mapIntoObserveSingle_1 = __webpack_require__(8781);
const facet_1 = __webpack_require__(6103);
function mapFacetSingleCached(facets, fn, equalityCheck) {
    return (0, facet_1.createFacet)({
        // pass the equalityCheck to the mapIntoObserveSingle to prevent even triggering the observable
        startSubscription: (0, mapIntoObserveSingle_1.mapIntoObserveSingle)(facets, fn, equalityCheck),
        initialValue: types_1.NO_VALUE,
    });
}
exports.mapFacetSingleCached = mapFacetSingleCached;
//# sourceMappingURL=mapFacetSingleCached.js.map

/***/ }),

/***/ 4714:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapFacetSingleLightweight = void 0;
const types_1 = __webpack_require__(4093);
const mapIntoObserveSingle_1 = __webpack_require__(8781);
function mapFacetSingleLightweight(facet, fn, equalityCheck) {
    return {
        get: () => {
            const value = facet.get();
            if (value === types_1.NO_VALUE)
                return types_1.NO_VALUE;
            return fn(value);
        },
        observe: (0, mapIntoObserveSingle_1.mapIntoObserveSingle)(facet, fn, equalityCheck),
    };
}
exports.mapFacetSingleLightweight = mapFacetSingleLightweight;
//# sourceMappingURL=mapFacetSingleLightweight.js.map

/***/ }),

/***/ 3118:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapFacetsCached = exports.mapFacetsLightweight = void 0;
const mapFacetArrayCached_1 = __webpack_require__(8273);
const mapFacetArrayLightweight_1 = __webpack_require__(9160);
const mapFacetSingleCached_1 = __webpack_require__(6741);
const mapFacetSingleLightweight_1 = __webpack_require__(4714);
function mapFacetsLightweight(facets, fn, equalityCheck) {
    if (facets.length === 1) {
        return (0, mapFacetSingleLightweight_1.mapFacetSingleLightweight)(facets[0], fn, equalityCheck);
    }
    else {
        return (0, mapFacetArrayLightweight_1.mapFacetArrayLightweight)(facets, fn, equalityCheck);
    }
}
exports.mapFacetsLightweight = mapFacetsLightweight;
function mapFacetsCached(facets, fn, equalityCheck) {
    if (facets.length === 1) {
        return (0, mapFacetSingleCached_1.mapFacetSingleCached)(facets[0], fn, equalityCheck);
    }
    else {
        return (0, mapFacetArrayCached_1.mapFacetArrayCached)(facets, fn, equalityCheck);
    }
}
exports.mapFacetsCached = mapFacetsCached;
//# sourceMappingURL=mapFacets.js.map

/***/ }),

/***/ 1794:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapIntoObserveArray = void 0;
const equalityChecks_1 = __webpack_require__(2868);
const types_1 = __webpack_require__(4093);
function mapIntoObserveArray(facets, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
fn, equalityCheck) {
    return (listener) => {
        let currentValue = types_1.NO_VALUE;
        const checker = equalityCheck === null || equalityCheck === void 0 ? void 0 : equalityCheck();
        const dependencyValues = facets.map(() => types_1.NO_VALUE);
        let hasAllDependencies = false;
        const subscriptions = facets.map((facet, index) => {
            // Most common scenario is not having any equality check
            if (equalityCheck == null) {
                return facet.observe((value) => {
                    dependencyValues[index] = value;
                    hasAllDependencies = hasAllDependencies || dependencyValues.every((value) => value != types_1.NO_VALUE);
                    if (hasAllDependencies) {
                        const result = fn(...dependencyValues);
                        if (result === types_1.NO_VALUE)
                            return;
                        listener(result);
                    }
                });
            }
            // Then we optimize for the second most common scenario of using the defaultEqualityCheck (by inline its implementation)
            if (equalityCheck === equalityChecks_1.defaultEqualityCheck) {
                return facet.observe((value) => {
                    dependencyValues[index] = value;
                    hasAllDependencies = hasAllDependencies || dependencyValues.every((value) => value != types_1.NO_VALUE);
                    if (hasAllDependencies) {
                        const result = fn(...dependencyValues);
                        if (result === types_1.NO_VALUE)
                            return;
                        const typeofValue = typeof currentValue;
                        if ((typeofValue === 'number' ||
                            typeofValue === 'string' ||
                            typeofValue === 'boolean' ||
                            currentValue === null ||
                            currentValue === undefined) &&
                            currentValue === result) {
                            return;
                        }
                        currentValue = result;
                        listener(result);
                    }
                });
            }
            // Just a type-check guard, it will never happen
            if (checker == null)
                return () => { };
            // Finally we use the custom equality check
            return facet.observe((value) => {
                dependencyValues[index] = value;
                hasAllDependencies = hasAllDependencies || dependencyValues.every((value) => value != types_1.NO_VALUE);
                if (hasAllDependencies) {
                    const result = fn(...dependencyValues);
                    if (result === types_1.NO_VALUE)
                        return;
                    if (checker(result))
                        return;
                    listener(result);
                }
            });
        });
        return () => {
            subscriptions.forEach((unsubscribe) => unsubscribe());
        };
    };
}
exports.mapIntoObserveArray = mapIntoObserveArray;
//# sourceMappingURL=mapIntoObserveArray.js.map

/***/ }),

/***/ 8781:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.mapIntoObserveSingle = void 0;
const equalityChecks_1 = __webpack_require__(2868);
const types_1 = __webpack_require__(4093);
function mapIntoObserveSingle(facet, fn, equalityCheck) {
    // Most common scenario is not having any equality check
    if (equalityCheck == null) {
        return (listener) => {
            return facet.observe((value) => {
                const result = fn(value);
                if (result === types_1.NO_VALUE)
                    return;
                listener(result);
            });
        };
    }
    // Then we optimize for the second most common scenario of using the defaultEqualityCheck (by inline its implementation)
    if (equalityCheck === equalityChecks_1.defaultEqualityCheck) {
        return (listener) => {
            let currentValue = types_1.NO_VALUE;
            return facet.observe((value) => {
                const result = fn(value);
                if (result === types_1.NO_VALUE)
                    return;
                const typeofValue = typeof currentValue;
                if ((typeofValue === 'number' ||
                    typeofValue === 'string' ||
                    typeofValue === 'boolean' ||
                    currentValue === null ||
                    currentValue === undefined) &&
                    currentValue === result) {
                    return;
                }
                currentValue = result;
                listener(result);
            });
        };
    }
    // Finally we use the custom equality check
    return (listener) => {
        const checker = equalityCheck();
        return facet.observe((value) => {
            const result = fn(value);
            if (result === types_1.NO_VALUE)
                return;
            if (checker(result))
                return;
            listener(result);
        });
    };
}
exports.mapIntoObserveSingle = mapIntoObserveSingle;
//# sourceMappingURL=mapIntoObserveSingle.js.map

/***/ }),

/***/ 4093:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NO_VALUE = exports.isFacet = exports.FACET_FACTORY = void 0;
exports.FACET_FACTORY = Symbol('facet-factory');
const isFacet = (value) => {
    return value != null && value.observe != null && value.get != null;
};
exports.isFacet = isFacet;
exports.NO_VALUE = Symbol.for('NoValue');
//# sourceMappingURL=types.js.map

/***/ }),

/***/ 6982:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createFiberRoot = void 0;
/**
 * @private consider using render instead
 */
const createFiberRoot = (reconciler) => (container) => reconciler.createContainer({
    children: new Set(),
    element: container,
    styleUnsubscribers: new Map(),
    style: container.style,
}, false, false);
exports.createFiberRoot = createFiberRoot;
//# sourceMappingURL=createFiberRoot.js.map

/***/ }),

/***/ 24:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createPortal = void 0;
// Extracted from React's codebase
const REACT_PORTAL_TYPE = Symbol.for('react.portal');
/**
 * Creates a React Portal.
 * More info: https://reactjs.org/docs/portals.html
 */
function createPortal(children, container, key) {
    return {
        $$typeof: REACT_PORTAL_TYPE,
        key,
        children,
        containerInfo: {
            children: new Set(),
            element: container,
            styleUnsubscribers: new Map(),
            style: container.style,
        },
    };
}
exports.createPortal = createPortal;
//# sourceMappingURL=createPortal.js.map

/***/ }),

/***/ 376:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createReconciler = void 0;
const react_reconciler_1 = __importDefault(__webpack_require__(6525));
const setupHostConfig_1 = __webpack_require__(8446);
/**
 * @private consider using render instead
 */
const createReconciler = () => (0, react_reconciler_1.default)((0, setupHostConfig_1.setupHostConfig)());
exports.createReconciler = createReconciler;
//# sourceMappingURL=createReconciler.js.map

/***/ }),

/***/ 7154:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.render = void 0;
const createFiberRoot_1 = __webpack_require__(6982);
const createReconciler_1 = __webpack_require__(376);
__exportStar(__webpack_require__(7358), exports);
__exportStar(__webpack_require__(24), exports);
__exportStar(__webpack_require__(6982), exports);
__exportStar(__webpack_require__(376), exports);
/**
 * Render the Facets as the root renderer
 */
function render(element, container) {
    if (container == null)
        return () => { };
    const reconcilerInstance = (0, createReconciler_1.createReconciler)();
    const fiberRoot = (0, createFiberRoot_1.createFiberRoot)(reconcilerInstance)(container);
    reconcilerInstance.updateContainer(element, fiberRoot, null, () => { });
    if (false) {}
    return () => {
        reconcilerInstance.updateContainer(null, fiberRoot, null, () => { });
    };
}
exports.render = render;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 2786:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupAttributeUpdate = exports.setupViewBoxUpdate = exports.setupTextUpdate = exports.setupSrcUpdate = exports.setupValueUpdate = exports.setupRowsUpdate = exports.setupMaxLengthUpdate = exports.setupIdUpdate = exports.setupClassUpdate = void 0;
const core_1 = __webpack_require__(8572);
const setupClassUpdate = (className, element) => {
    const htmlElement = element;
    if ((0, core_1.isFacet)(className)) {
        return className.observe((className) => {
            htmlElement.className = className != null ? className : '';
        });
    }
    else {
        htmlElement.className = className != null ? className : '';
    }
};
exports.setupClassUpdate = setupClassUpdate;
const setupIdUpdate = (id, element) => {
    if ((0, core_1.isFacet)(id)) {
        return id.observe((id) => {
            element.id = id != null ? id : '';
        });
    }
    else {
        element.id = id != null ? id : '';
    }
};
exports.setupIdUpdate = setupIdUpdate;
const setupMaxLengthUpdate = (maxLength, element) => {
    if ((0, core_1.isFacet)(maxLength)) {
        return maxLength.observe((maxLength) => {
            const textElement = element;
            textElement.maxLength = maxLength != null ? maxLength : Number.MAX_SAFE_INTEGER;
        });
    }
    else {
        const textElement = element;
        textElement.maxLength = maxLength != null ? maxLength : Number.MAX_SAFE_INTEGER;
    }
};
exports.setupMaxLengthUpdate = setupMaxLengthUpdate;
const setupRowsUpdate = (rows, element) => {
    if ((0, core_1.isFacet)(rows)) {
        return rows.observe((rows) => {
            const textElement = element;
            textElement.rows = rows != null ? rows : Number.MAX_SAFE_INTEGER;
        });
    }
    else {
        const textElement = element;
        textElement.rows = rows != null ? rows : Number.MAX_SAFE_INTEGER;
    }
};
exports.setupRowsUpdate = setupRowsUpdate;
/**
 * The value attribute seems to behave differently to other
 * attributes. When using `setAttribute`, browsers and gameface
 * don't always update the element to have what's in the value,
 * so we need to set the `value` attribute directly to solve this.
 * ref: https://github.com/facebook/react/blob/master/packages/react-dom/src/client/ReactDOMInput.js
 */
const updateValue = (element, value) => {
    const inputElement = element;
    // Only accept numerical characters if the input type is number
    if (inputElement.type === 'number' && isNaN(Number(value)))
        return;
    if (value != null) {
        inputElement.value = value;
        inputElement.setAttribute('value', value);
    }
    else {
        inputElement.value = '';
        inputElement.removeAttribute('value');
    }
};
const setupValueUpdate = (value, element) => {
    if ((0, core_1.isFacet)(value)) {
        return value.observe((value) => updateValue(element, value));
    }
    else {
        updateValue(element, value);
    }
};
exports.setupValueUpdate = setupValueUpdate;
const setupSrcUpdate = (src, element) => {
    if ((0, core_1.isFacet)(src)) {
        return src.observe((src) => {
            const textElement = element;
            textElement.src = src != null ? src : '';
        });
    }
    else {
        const textElement = element;
        textElement.src = src != null ? src : '';
    }
};
exports.setupSrcUpdate = setupSrcUpdate;
const setupTextUpdate = (text, element) => {
    if ((0, core_1.isFacet)(text)) {
        return text.observe((text) => {
            const textElement = element;
            textElement.nodeValue = (text != null ? text : '');
        });
    }
    else {
        const textElement = element;
        textElement.nodeValue = (text != null ? text : '');
    }
};
exports.setupTextUpdate = setupTextUpdate;
/**
 * removeAttribute and setAttribute automatically convert the attribute name to lower case.
 * The DOM attribute viewBox is camel cased so setAttributeNS and removeAttributeNS are used
 */
const setupViewBoxUpdate = (viewBox, element) => {
    if ((0, core_1.isFacet)(viewBox)) {
        return viewBox.observe((value) => {
            if (value != null) {
                element.setAttributeNS(null, 'viewBox', value);
            }
            else {
                element.removeAttributeNS(null, 'viewBox');
            }
        });
    }
    else {
        if (viewBox != null) {
            element.setAttributeNS(null, 'viewBox', viewBox);
        }
        else {
            element.removeAttributeNS(null, 'viewBox');
        }
    }
};
exports.setupViewBoxUpdate = setupViewBoxUpdate;
const setupAttributeUpdate = (attribute, value, element) => {
    if ((0, core_1.isFacet)(value)) {
        return value.observe((value) => {
            if (value === true) {
                element.setAttribute(attribute, '');
            }
            else if (value === false) {
                element.removeAttribute(attribute);
            }
            else if (value != null) {
                element.setAttribute(attribute, value);
            }
            else {
                element.removeAttribute(attribute);
            }
        });
    }
    else {
        if (value === true) {
            element.setAttribute(attribute, '');
        }
        else if (value === false) {
            element.removeAttribute(attribute);
        }
        else if (value != null) {
            element.setAttribute(attribute, value);
        }
        else {
            element.removeAttribute(attribute);
        }
    }
};
exports.setupAttributeUpdate = setupAttributeUpdate;
//# sourceMappingURL=setupAttributes.js.map

/***/ }),

/***/ 8446:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setupHostConfig = void 0;
const types_1 = __webpack_require__(7358);
const core_1 = __webpack_require__(8572);
const setupAttributes_1 = __webpack_require__(2786);
/**
 * Custom React Renderer with support for Facets
 *
 * Based on https://blog.atulr.com/react-custom-renderer-1/
 * For more information check the official docs: https://github.com/facebook/react/tree/main/packages/react-reconciler
 */
const setupHostConfig = () => ({
    isPrimaryRenderer: true,
    supportsMutation: true,
    supportsPersistence: false,
    supportsHydration: false,
    now: Date.now,
    /**
     * We need to support setting up the host config in an environment where window is not available globally yet
     * Ex: screenshot testing
     */
    setTimeout: typeof window !== 'undefined'
        ? window.setTimeout
        : (handler, timeout) => window.setTimeout(handler, timeout),
    /**
     * We need to support setting up the host config in an environment where window is not available globally yet
     * Ex: screenshot testing
     */
    clearTimeout: typeof window !== 'undefined' ? window.clearTimeout : (id) => window.clearTimeout(id),
    noTimeout: noop,
    scheduleDeferredCallback: function (callback, options) {
        return window.setTimeout(callback, options ? options.timeout : 0);
    },
    cancelDeferredCallback: function (id) {
        return window.clearTimeout(id);
    },
    getRootHostContext: function () {
        return EMPTY;
    },
    getChildHostContext: function () {
        return EMPTY;
    },
    shouldSetTextContent: function () {
        return false;
    },
    createTextInstance: function (newText) {
        return {
            element: document.createTextNode(newText),
        };
    },
    createInstance: function (externalType, newProps) {
        var _a;
        if (externalType === 'fast-text') {
            const element = document.createTextNode('');
            return {
                children: new Set(),
                element,
                text: (0, setupAttributes_1.setupTextUpdate)(newProps.text, element),
            };
        }
        const typeHTML = (_a = fastTypeMapHTML[externalType]) !== null && _a !== void 0 ? _a : externalType;
        const typeSVG = fastTypeMapSVG[externalType];
        const element = typeSVG != null
            ? document.createElementNS('http://www.w3.org/2000/svg', typeSVG)
            : document.createElement(typeHTML);
        let style;
        let styleUnsubscribers;
        if (newProps.style != null) {
            style = element.style;
            styleUnsubscribers = new Map();
            // We know for sure here that style will never be null (we created it above)
            const notNullStyle = style;
            const notNullStyleUnsubscribers = styleUnsubscribers;
            const styleProp = newProps.style;
            for (const key in styleProp) {
                const value = styleProp[key];
                if (value != null) {
                    if ((0, core_1.isFacet)(value)) {
                        notNullStyleUnsubscribers.set(key, value.observe((value) => {
                            notNullStyle[key] = value;
                        }));
                    }
                    else {
                        notNullStyle[key] = value;
                    }
                }
            }
        }
        if (newProps.dangerouslySetInnerHTML != null) {
            element.innerHTML = newProps.dangerouslySetInnerHTML.__html;
        }
        if (newProps.onClick) {
            element.addEventListener('click', newProps.onClick);
        }
        if (newProps.onFocus) {
            element.addEventListener('focus', newProps.onFocus);
        }
        if (newProps.onBlur) {
            element.addEventListener('blur', newProps.onBlur);
        }
        if (newProps.onMouseDown) {
            element.addEventListener('mousedown', newProps.onMouseDown);
        }
        if (newProps.onMouseMove) {
            element.addEventListener('mousemove', newProps.onMouseMove);
        }
        if (newProps.onMouseUp) {
            element.addEventListener('mouseup', newProps.onMouseUp);
        }
        if (newProps.onTouchStart) {
            element.addEventListener('touchstart', newProps.onTouchStart);
        }
        if (newProps.onTouchMove) {
            element.addEventListener('touchmove', newProps.onTouchMove);
        }
        if (newProps.onTouchEnd) {
            element.addEventListener('touchend', newProps.onTouchEnd);
        }
        if (newProps.onMouseEnter) {
            element.addEventListener('mouseenter', newProps.onMouseEnter);
        }
        if (newProps.onMouseLeave) {
            element.addEventListener('mouseleave', newProps.onMouseLeave);
        }
        if (newProps.onKeyPress) {
            element.addEventListener('keypress', newProps.onKeyPress);
        }
        if (newProps.onKeyDown) {
            element.addEventListener('keydown', newProps.onKeyDown);
        }
        if (newProps.onKeyUp) {
            element.addEventListener('keyup', newProps.onKeyUp);
        }
        return {
            element,
            styleUnsubscribers,
            style,
            children: new Set(),
            className: newProps.className != null ? (0, setupAttributes_1.setupClassUpdate)(newProps.className, element) : undefined,
            id: newProps.id != null ? (0, setupAttributes_1.setupIdUpdate)(newProps.id, element) : undefined,
            autoPlay: newProps.autoPlay != null ? (0, setupAttributes_1.setupAttributeUpdate)('autoplay', newProps.autoPlay, element) : undefined,
            loop: newProps.loop != null ? (0, setupAttributes_1.setupAttributeUpdate)('loop', newProps.loop, element) : undefined,
            href: newProps.href != null ? (0, setupAttributes_1.setupAttributeUpdate)('href', newProps.href, element) : undefined,
            target: newProps.target != null ? (0, setupAttributes_1.setupAttributeUpdate)('target', newProps.target, element) : undefined,
            disabled: newProps.disabled != null ? (0, setupAttributes_1.setupAttributeUpdate)('disabled', newProps.disabled, element) : undefined,
            maxLength: newProps.maxLength != null ? (0, setupAttributes_1.setupMaxLengthUpdate)(newProps.maxLength, element) : undefined,
            rows: newProps.rows != null ? (0, setupAttributes_1.setupRowsUpdate)(newProps.rows, element) : undefined,
            type: newProps.type != null ? (0, setupAttributes_1.setupAttributeUpdate)('type', newProps.type, element) : undefined,
            value: newProps.value != null ? (0, setupAttributes_1.setupValueUpdate)(newProps.value, element) : undefined,
            src: newProps.src != null ? (0, setupAttributes_1.setupSrcUpdate)(newProps.src, element) : undefined,
            d: newProps.d != null ? (0, setupAttributes_1.setupAttributeUpdate)('d', newProps.d, element) : undefined,
            fill: newProps.fill != null ? (0, setupAttributes_1.setupAttributeUpdate)('fill', newProps.fill, element) : undefined,
            height: newProps.height != null ? (0, setupAttributes_1.setupAttributeUpdate)('height', newProps.height, element) : undefined,
            stroke: newProps.stroke != null ? (0, setupAttributes_1.setupAttributeUpdate)('stroke', newProps.stroke, element) : undefined,
            x: newProps.x != null ? (0, setupAttributes_1.setupAttributeUpdate)('x', newProps.x, element) : undefined,
            width: newProps.width != null ? (0, setupAttributes_1.setupAttributeUpdate)('width', newProps.width, element) : undefined,
            y: newProps.y != null ? (0, setupAttributes_1.setupAttributeUpdate)('y', newProps.y, element) : undefined,
            cx: newProps.cx != null ? (0, setupAttributes_1.setupAttributeUpdate)('cx', newProps.cx, element) : undefined,
            cy: newProps.cy != null ? (0, setupAttributes_1.setupAttributeUpdate)('cy', newProps.cy, element) : undefined,
            r: newProps.r != null ? (0, setupAttributes_1.setupAttributeUpdate)('r', newProps.r, element) : undefined,
            rx: newProps.rx != null ? (0, setupAttributes_1.setupAttributeUpdate)('rx', newProps.rx, element) : undefined,
            ry: newProps.ry != null ? (0, setupAttributes_1.setupAttributeUpdate)('ry', newProps.ry, element) : undefined,
            x1: newProps.x1 != null ? (0, setupAttributes_1.setupAttributeUpdate)('x1', newProps.x1, element) : undefined,
            x2: newProps.x2 != null ? (0, setupAttributes_1.setupAttributeUpdate)('x2', newProps.x2, element) : undefined,
            y1: newProps.y1 != null ? (0, setupAttributes_1.setupAttributeUpdate)('y1', newProps.y1, element) : undefined,
            y2: newProps.y2 != null ? (0, setupAttributes_1.setupAttributeUpdate)('y2', newProps.y2, element) : undefined,
            strokeWidth: newProps.strokeWidth != null ? (0, setupAttributes_1.setupAttributeUpdate)('stroke-width', newProps.strokeWidth, element) : undefined,
            viewBox: newProps.viewBox != null ? (0, setupAttributes_1.setupViewBoxUpdate)(newProps.viewBox, element) : undefined,
            xLinkHref: newProps.xLinkHref != null ? (0, setupAttributes_1.setupAttributeUpdate)('xlink:href', newProps.xLinkHref, element) : undefined,
            fillOpacity: newProps.fillOpacity != null ? (0, setupAttributes_1.setupAttributeUpdate)('fill-opacity', newProps.fillOpacity, element) : undefined,
            strokeOpacity: newProps.strokeOpacity != null
                ? (0, setupAttributes_1.setupAttributeUpdate)('stroke-opacity', newProps.strokeOpacity, element)
                : undefined,
            strokeLinecap: newProps.strokeLinecap != null
                ? (0, setupAttributes_1.setupAttributeUpdate)('stroke-linecap', newProps.strokeLinecap, element)
                : undefined,
            strokeLinejoin: newProps.strokeLinejoin != null
                ? (0, setupAttributes_1.setupAttributeUpdate)('stroke-linejoin', newProps.strokeLinejoin, element)
                : undefined,
            points: newProps.points != null ? (0, setupAttributes_1.setupAttributeUpdate)('points', newProps.points, element) : undefined,
            offset: newProps.offset != null ? (0, setupAttributes_1.setupAttributeUpdate)('offset', newProps.offset, element) : undefined,
            stopColor: newProps.stopColor != null ? (0, setupAttributes_1.setupAttributeUpdate)('stop-color', newProps.stopColor, element) : undefined,
            stopOpacity: newProps.stopOpacity != null ? (0, setupAttributes_1.setupAttributeUpdate)('stop-opacity', newProps.stopOpacity, element) : undefined,
            fontFamily: newProps.fontFamily != null ? (0, setupAttributes_1.setupAttributeUpdate)('font-family', newProps.fontFamily, element) : undefined,
            fontSize: newProps.fontSize != null ? (0, setupAttributes_1.setupAttributeUpdate)('font-size', newProps.fontSize, element) : undefined,
            ['data-droppable']: newProps['data-droppable'] != null
                ? (0, setupAttributes_1.setupAttributeUpdate)('data-droppable', newProps['data-droppable'], element)
                : undefined,
            ['data-narrate']: newProps['data-narrate'] != null
                ? (0, setupAttributes_1.setupAttributeUpdate)('data-narrate', newProps['data-narrate'], element)
                : undefined,
            ['data-narrate-as']: newProps['data-narrate-as'] != null
                ? (0, setupAttributes_1.setupAttributeUpdate)('data-narrate-as', newProps['data-narrate-as'], element)
                : undefined,
            ['data-narrate-before']: newProps['data-narrate-before'] != null
                ? (0, setupAttributes_1.setupAttributeUpdate)('data-narrate-before', newProps['data-narrate-before'], element)
                : undefined,
            ['data-narrate-after']: newProps['data-narrate-after'] != null
                ? (0, setupAttributes_1.setupAttributeUpdate)('data-narrate-after', newProps['data-narrate-after'], element)
                : undefined,
            ['data-testid']: newProps['data-testid'] != null
                ? (0, setupAttributes_1.setupAttributeUpdate)('data-testid', newProps['data-testid'], element)
                : undefined,
            ['data-x-ray']: newProps['data-x-ray'] != null
                ? (0, setupAttributes_1.setupAttributeUpdate)('data-x-ray', newProps['data-x-ray'], element)
                : undefined,
        };
    },
    finalizeInitialChildren: function () {
        return false;
    },
    prepareForCommit: function () { },
    resetAfterCommit: function () { },
    commitMount: function () { },
    prepareUpdate: function () {
        return true;
    },
    commitUpdate: function (instance, updatePayload, type, oldProps, newProps) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25;
        const { element: uncastElement } = instance;
        if (type === 'fast-text') {
            const textElement = uncastElement;
            if (newProps.text !== oldProps.text) {
                (_a = instance.text) === null || _a === void 0 ? void 0 : _a.call(instance);
                instance.text = (0, setupAttributes_1.setupTextUpdate)(newProps.text, textElement);
            }
            return;
        }
        const element = uncastElement;
        if (newProps.style !== oldProps.style) {
            const style = instance.style || element.style;
            const styleUnsubscribers = instance.styleUnsubscribers || new Map();
            instance.style = style;
            instance.styleUnsubscribers = styleUnsubscribers;
            const notNullStyle = style;
            const oldStyleProp = oldProps.style;
            const newStyleProp = newProps.style;
            if (oldStyleProp != null) {
                for (const key in oldStyleProp) {
                    const oldValue = oldStyleProp[key];
                    const newValue = newStyleProp === null || newStyleProp === void 0 ? void 0 : newStyleProp[key];
                    if (oldValue !== newValue || newStyleProp == null) {
                        if ((0, core_1.isFacet)(oldValue)) {
                            (_b = styleUnsubscribers.get(key)) === null || _b === void 0 ? void 0 : _b();
                        }
                    }
                }
            }
            if (newStyleProp != null) {
                for (const key in newStyleProp) {
                    const oldValue = oldStyleProp === null || oldStyleProp === void 0 ? void 0 : oldStyleProp[key];
                    const newValue = newStyleProp[key];
                    if (oldValue !== newValue || oldStyleProp == null) {
                        if ((0, core_1.isFacet)(newValue)) {
                            styleUnsubscribers.set(key, newValue.observe((value) => {
                                notNullStyle[key] = value;
                            }));
                        }
                        else {
                            notNullStyle[key] = newValue;
                        }
                    }
                }
            }
        }
        if (newProps.dangerouslySetInnerHTML != oldProps.dangerouslySetInnerHTML) {
            if (newProps.dangerouslySetInnerHTML != null) {
                element.innerHTML = newProps.dangerouslySetInnerHTML.__html;
            }
            else {
                element.innerHTML = '';
            }
        }
        if (newProps.autoPlay !== oldProps.autoPlay) {
            (_c = instance.autoPlay) === null || _c === void 0 ? void 0 : _c.call(instance);
            if (newProps.autoPlay == null) {
                element.removeAttribute('autoplay');
            }
            else {
                instance.autoPlay = (0, setupAttributes_1.setupAttributeUpdate)('autoplay', newProps.autoPlay, element);
            }
        }
        if (newProps.className !== oldProps.className) {
            (_d = instance.className) === null || _d === void 0 ? void 0 : _d.call(instance);
            if (newProps.className == null) {
                element.className = '';
            }
            else {
                instance.className = (0, setupAttributes_1.setupClassUpdate)(newProps.className, element);
            }
        }
        if (newProps.d !== oldProps.d) {
            (_e = instance.d) === null || _e === void 0 ? void 0 : _e.call(instance);
            if (newProps.d == null) {
                element.removeAttribute('d');
            }
            else {
                instance.d = (0, setupAttributes_1.setupAttributeUpdate)('d', newProps.d, element);
            }
        }
        if (newProps['data-droppable'] !== oldProps['data-droppable']) {
            (_f = instance['data-droppable']) === null || _f === void 0 ? void 0 : _f.call(instance);
            if (newProps['data-droppable'] == null) {
                element.removeAttribute('data-droppable');
            }
            else {
                instance['data-droppable'] = (0, setupAttributes_1.setupAttributeUpdate)('data-droppable', newProps['data-droppable'], element);
            }
        }
        if (newProps['data-narrate'] !== oldProps['data-narrate']) {
            (_g = instance['data-narrate']) === null || _g === void 0 ? void 0 : _g.call(instance);
            if (newProps['data-narrate'] == null) {
                element.removeAttribute('data-narrate');
            }
            else {
                instance['data-narrate'] = (0, setupAttributes_1.setupAttributeUpdate)('data-narrate', newProps['data-narrate'], element);
            }
        }
        if (newProps['data-narrate-as'] !== oldProps['data-narrate-as']) {
            (_h = instance['data-narrate-as']) === null || _h === void 0 ? void 0 : _h.call(instance);
            if (newProps['data-narrate-as'] == null) {
                element.removeAttribute('data-narrate-as');
            }
            else {
                instance['data-narrate-as'] = (0, setupAttributes_1.setupAttributeUpdate)('data-narrate-as', newProps['data-narrate-as'], element);
            }
        }
        if (newProps['data-narrate-after'] !== oldProps['data-narrate-after']) {
            (_j = instance['data-narrate-after']) === null || _j === void 0 ? void 0 : _j.call(instance);
            if (newProps['data-narrate-after'] == null) {
                element.removeAttribute('data-narrate-after');
            }
            else {
                instance['data-narrate-after'] = (0, setupAttributes_1.setupAttributeUpdate)('data-narrate-after', newProps['data-narrate-after'], element);
            }
        }
        if (newProps['data-narrate-before'] !== oldProps['data-narrate-before']) {
            (_k = instance['data-narrate-before']) === null || _k === void 0 ? void 0 : _k.call(instance);
            if (newProps['data-narrate-before'] == null) {
                element.removeAttribute('data-narrate-before');
            }
            else {
                instance['data-narrate-before'] = (0, setupAttributes_1.setupAttributeUpdate)('data-narrate-before', newProps['data-narrate-before'], element);
            }
        }
        if (newProps['data-testid'] !== oldProps['data-testid']) {
            (_l = instance['data-testid']) === null || _l === void 0 ? void 0 : _l.call(instance);
            if (newProps['data-testid'] == null) {
                element.removeAttribute('data-testid');
            }
            else {
                instance['data-testid'] = (0, setupAttributes_1.setupAttributeUpdate)('data-testid', newProps['data-testid'], element);
            }
        }
        if (newProps['data-x-ray'] !== oldProps['data-x-ray']) {
            (_m = instance['data-x-ray']) === null || _m === void 0 ? void 0 : _m.call(instance);
            if (newProps['data-x-ray'] == null) {
                element.removeAttribute('data-x-ray');
            }
            else {
                instance['data-x-ray'] = (0, setupAttributes_1.setupAttributeUpdate)('data-x-ray', newProps['data-x-ray'], element);
            }
        }
        if (newProps.fill !== oldProps.fill) {
            (_o = instance.fill) === null || _o === void 0 ? void 0 : _o.call(instance);
            if (newProps.fill == null) {
                element.removeAttribute('fill');
            }
            else {
                instance.fill = (0, setupAttributes_1.setupAttributeUpdate)('fill', newProps.fill, element);
            }
        }
        if (newProps.id !== oldProps.id) {
            (_p = instance.id) === null || _p === void 0 ? void 0 : _p.call(instance);
            if (newProps.id == null) {
                element.id = '';
            }
            else {
                instance.id = (0, setupAttributes_1.setupIdUpdate)(newProps.id, element);
            }
        }
        if (newProps.loop !== oldProps.loop) {
            (_q = instance.loop) === null || _q === void 0 ? void 0 : _q.call(instance);
            if (newProps.loop == null) {
                element.removeAttribute('loop');
            }
            else {
                instance.loop = (0, setupAttributes_1.setupAttributeUpdate)('loop', newProps.loop, element);
            }
        }
        if (newProps.href !== oldProps.href) {
            (_r = instance.href) === null || _r === void 0 ? void 0 : _r.call(instance);
            if (newProps.href == null) {
                element.removeAttribute('href');
            }
            else {
                instance.href = (0, setupAttributes_1.setupAttributeUpdate)('href', newProps.href, element);
            }
        }
        if (newProps.target !== oldProps.target) {
            (_s = instance.target) === null || _s === void 0 ? void 0 : _s.call(instance);
            if (newProps.target == null) {
                element.removeAttribute('target');
            }
            else {
                instance.target = (0, setupAttributes_1.setupAttributeUpdate)('target', newProps.target, element);
            }
        }
        if (newProps.disabled !== oldProps.disabled) {
            (_t = instance.disabled) === null || _t === void 0 ? void 0 : _t.call(instance);
            if (newProps.disabled == null) {
                element.removeAttribute('disabled');
            }
            else {
                instance.disabled = (0, setupAttributes_1.setupAttributeUpdate)('disabled', newProps.disabled, element);
            }
        }
        if (newProps.height !== oldProps.height) {
            (_u = instance.height) === null || _u === void 0 ? void 0 : _u.call(instance);
            if (newProps.height == null) {
                element.removeAttribute('height');
            }
            else {
                instance.height = (0, setupAttributes_1.setupAttributeUpdate)('height', newProps.height, element);
            }
        }
        if (newProps.maxLength !== oldProps.maxLength) {
            (_v = instance.maxLength) === null || _v === void 0 ? void 0 : _v.call(instance);
            if (newProps.maxLength == null) {
                const textElement = element;
                textElement.removeAttribute('maxlength');
            }
            else {
                instance.maxLength = (0, setupAttributes_1.setupMaxLengthUpdate)(newProps.maxLength, element);
            }
        }
        if (newProps.rows !== oldProps.rows) {
            (_w = instance.rows) === null || _w === void 0 ? void 0 : _w.call(instance);
            if (newProps.rows == null) {
                const textElement = element;
                textElement.removeAttribute('rows');
            }
            else {
                instance.rows = (0, setupAttributes_1.setupRowsUpdate)(newProps.rows, element);
            }
        }
        if (newProps.stroke !== oldProps.stroke) {
            (_x = instance.stroke) === null || _x === void 0 ? void 0 : _x.call(instance);
            if (newProps.stroke == null) {
                element.removeAttribute('stroke');
            }
            else {
                instance.stroke = (0, setupAttributes_1.setupAttributeUpdate)('stroke', newProps.stroke, element);
            }
        }
        if (newProps.type !== oldProps.type) {
            (_y = instance.type) === null || _y === void 0 ? void 0 : _y.call(instance);
            if (newProps.type == null) {
                const textElement = element;
                textElement.removeAttribute('type');
            }
            else {
                instance.type = (0, setupAttributes_1.setupAttributeUpdate)('type', newProps.type, element);
            }
        }
        if (newProps.value !== oldProps.value) {
            (_z = instance.value) === null || _z === void 0 ? void 0 : _z.call(instance);
            if (newProps.value == null) {
                const textElement = element;
                textElement.removeAttribute('value');
            }
            else {
                instance.value = (0, setupAttributes_1.setupValueUpdate)(newProps.value, element);
            }
        }
        if (newProps.x !== oldProps.x) {
            (_0 = instance.x) === null || _0 === void 0 ? void 0 : _0.call(instance);
            if (newProps.x == null) {
                element.removeAttribute('x');
            }
            else {
                instance.x = (0, setupAttributes_1.setupAttributeUpdate)('x', newProps.x, element);
            }
        }
        if (newProps.width !== oldProps.width) {
            (_1 = instance.width) === null || _1 === void 0 ? void 0 : _1.call(instance);
            if (newProps.width == null) {
                element.removeAttribute('width');
            }
            else {
                instance.width = (0, setupAttributes_1.setupAttributeUpdate)('width', newProps.width, element);
            }
        }
        if (newProps.y !== oldProps.y) {
            (_2 = instance.y) === null || _2 === void 0 ? void 0 : _2.call(instance);
            if (newProps.y == null) {
                element.removeAttribute('y');
            }
            else {
                instance.y = (0, setupAttributes_1.setupAttributeUpdate)('y', newProps.y, element);
            }
        }
        if (newProps.cx !== oldProps.cx) {
            (_3 = instance.cx) === null || _3 === void 0 ? void 0 : _3.call(instance);
            if (newProps.cx == null) {
                element.removeAttribute('cx');
            }
            else {
                instance.cx = (0, setupAttributes_1.setupAttributeUpdate)('cx', newProps.cx, element);
            }
        }
        if (newProps.r !== oldProps.r) {
            (_4 = instance.r) === null || _4 === void 0 ? void 0 : _4.call(instance);
            if (newProps.r == null) {
                element.removeAttribute('r');
            }
            else {
                instance.r = (0, setupAttributes_1.setupAttributeUpdate)('r', newProps.r, element);
            }
        }
        if (newProps.cy !== oldProps.cy) {
            (_5 = instance.cy) === null || _5 === void 0 ? void 0 : _5.call(instance);
            if (newProps.cy == null) {
                element.removeAttribute('cy');
            }
            else {
                instance.cy = (0, setupAttributes_1.setupAttributeUpdate)('cy', newProps.cy, element);
            }
        }
        if (newProps.rx !== oldProps.rx) {
            (_6 = instance.rx) === null || _6 === void 0 ? void 0 : _6.call(instance);
            if (newProps.rx == null) {
                element.removeAttribute('rx');
            }
            else {
                instance.rx = (0, setupAttributes_1.setupAttributeUpdate)('rx', newProps.rx, element);
            }
        }
        if (newProps.ry !== oldProps.ry) {
            (_7 = instance.ry) === null || _7 === void 0 ? void 0 : _7.call(instance);
            if (newProps.ry == null) {
                element.removeAttribute('ry');
            }
            else {
                instance.ry = (0, setupAttributes_1.setupAttributeUpdate)('ry', newProps.ry, element);
            }
        }
        if (newProps.x1 !== oldProps.x1) {
            (_8 = instance.x1) === null || _8 === void 0 ? void 0 : _8.call(instance);
            if (newProps.x1 == null) {
                element.removeAttribute('x1');
            }
            else {
                instance.x1 = (0, setupAttributes_1.setupAttributeUpdate)('x1', newProps.x1, element);
            }
        }
        if (newProps.x2 !== oldProps.x2) {
            (_9 = instance.x2) === null || _9 === void 0 ? void 0 : _9.call(instance);
            if (newProps.x2 == null) {
                element.removeAttribute('x2');
            }
            else {
                instance.x2 = (0, setupAttributes_1.setupAttributeUpdate)('x2', newProps.x2, element);
            }
        }
        if (newProps.y1 !== oldProps.y1) {
            (_10 = instance.y1) === null || _10 === void 0 ? void 0 : _10.call(instance);
            if (newProps.y1 == null) {
                element.removeAttribute('y1');
            }
            else {
                instance.y1 = (0, setupAttributes_1.setupAttributeUpdate)('y1', newProps.y1, element);
            }
        }
        if (newProps.y2 !== oldProps.y2) {
            (_11 = instance.y2) === null || _11 === void 0 ? void 0 : _11.call(instance);
            if (newProps.y2 == null) {
                element.removeAttribute('y2');
            }
            else {
                instance.y2 = (0, setupAttributes_1.setupAttributeUpdate)('y2', newProps.y2, element);
            }
        }
        if (newProps.strokeWidth !== oldProps.strokeWidth) {
            (_12 = instance.strokeWidth) === null || _12 === void 0 ? void 0 : _12.call(instance);
            if (newProps.strokeWidth == null) {
                element.removeAttribute('strokeWidth');
            }
            else {
                instance.strokeWidth = (0, setupAttributes_1.setupAttributeUpdate)('stroke-width', newProps.strokeWidth, element);
            }
        }
        if (newProps.viewBox !== oldProps.viewBox) {
            (_13 = instance.viewBox) === null || _13 === void 0 ? void 0 : _13.call(instance);
            if (newProps.viewBox == null) {
                element.removeAttribute('viewBox');
            }
            else {
                instance.viewBox = (0, setupAttributes_1.setupViewBoxUpdate)(newProps.viewBox, element);
            }
        }
        if (newProps.xLinkHref !== oldProps.xLinkHref) {
            (_14 = instance.xLinkHref) === null || _14 === void 0 ? void 0 : _14.call(instance);
            if (newProps.xLinkHref == null) {
                element.removeAttribute('xlink:href');
            }
            else {
                instance.xLinkHref = (0, setupAttributes_1.setupAttributeUpdate)('xlink:href', newProps.xLinkHref, element);
            }
        }
        if (newProps.fillOpacity !== oldProps.fillOpacity) {
            (_15 = instance.fillOpacity) === null || _15 === void 0 ? void 0 : _15.call(instance);
            if (newProps.fillOpacity == null) {
                element.removeAttribute('fill-opacity');
            }
            else {
                instance.fillOpacity = (0, setupAttributes_1.setupAttributeUpdate)('fill-opacity', newProps.fillOpacity, element);
            }
        }
        if (newProps.strokeOpacity !== oldProps.strokeOpacity) {
            (_16 = instance.strokeOpacity) === null || _16 === void 0 ? void 0 : _16.call(instance);
            if (newProps.strokeOpacity == null) {
                element.removeAttribute('stroke-opacity');
            }
            else {
                instance.strokeOpacity = (0, setupAttributes_1.setupAttributeUpdate)('stroke-opacity', newProps.strokeOpacity, element);
            }
        }
        if (newProps.strokeLinecap !== oldProps.strokeLinecap) {
            (_17 = instance.strokeLinecap) === null || _17 === void 0 ? void 0 : _17.call(instance);
            if (newProps.strokeLinecap == null) {
                element.removeAttribute('stroke-linecap');
            }
            else {
                instance.strokeLinecap = (0, setupAttributes_1.setupAttributeUpdate)('stroke-linecap', newProps.strokeLinecap, element);
            }
        }
        if (newProps.strokeLinejoin !== oldProps.strokeLinejoin) {
            (_18 = instance.strokeLinejoin) === null || _18 === void 0 ? void 0 : _18.call(instance);
            if (newProps.strokeLinejoin == null) {
                element.removeAttribute('stroke-linejoin');
            }
            else {
                instance.strokeLinejoin = (0, setupAttributes_1.setupAttributeUpdate)('stroke-linejoin', newProps.strokeLinejoin, element);
            }
        }
        if (newProps.points !== oldProps.points) {
            (_19 = instance.points) === null || _19 === void 0 ? void 0 : _19.call(instance);
            if (newProps.points == null) {
                element.removeAttribute('points');
            }
            else {
                instance.points = (0, setupAttributes_1.setupAttributeUpdate)('points', newProps.points, element);
            }
        }
        if (newProps.offset !== oldProps.offset) {
            (_20 = instance.offset) === null || _20 === void 0 ? void 0 : _20.call(instance);
            if (newProps.offset == null) {
                element.removeAttribute('offset');
            }
            else {
                instance.offset = (0, setupAttributes_1.setupAttributeUpdate)('offset', newProps.offset, element);
            }
        }
        if (newProps.stopColor !== oldProps.stopColor) {
            (_21 = instance.stopColor) === null || _21 === void 0 ? void 0 : _21.call(instance);
            if (newProps.stopColor == null) {
                element.removeAttribute('stop-color');
            }
            else {
                instance.stopColor = (0, setupAttributes_1.setupAttributeUpdate)('stop-color', newProps.stopColor, element);
            }
        }
        if (newProps.stopOpacity !== oldProps.stopOpacity) {
            (_22 = instance.stopOpacity) === null || _22 === void 0 ? void 0 : _22.call(instance);
            if (newProps.stopOpacity == null) {
                element.removeAttribute('stop-opacity');
            }
            else {
                instance.stopOpacity = (0, setupAttributes_1.setupAttributeUpdate)('stop-opacity', newProps.stopOpacity, element);
            }
        }
        if (newProps.fontFamily !== oldProps.fontFamily) {
            (_23 = instance.fontFamily) === null || _23 === void 0 ? void 0 : _23.call(instance);
            if (newProps.fontFamily == null) {
                element.removeAttribute('font-family');
            }
            else {
                instance.fontFamily = (0, setupAttributes_1.setupAttributeUpdate)('font-family', newProps.fontFamily, element);
            }
        }
        if (newProps.fontSize !== oldProps.fontSize) {
            (_24 = instance.fontSize) === null || _24 === void 0 ? void 0 : _24.call(instance);
            if (newProps.fontSize == null) {
                element.removeAttribute('font-size');
            }
            else {
                instance.fontSize = (0, setupAttributes_1.setupAttributeUpdate)('font-size', newProps.fontSize, element);
            }
        }
        if (newProps.src !== oldProps.src) {
            (_25 = instance.src) === null || _25 === void 0 ? void 0 : _25.call(instance);
            if (newProps.src == null) {
                const textElement = element;
                textElement.removeAttribute('src');
            }
            else {
                instance.src = (0, setupAttributes_1.setupSrcUpdate)(newProps.src, element);
            }
        }
        if (newProps.onClick !== oldProps.onClick) {
            if (oldProps.onClick)
                element.removeEventListener('click', oldProps.onClick);
            if (newProps.onClick)
                element.addEventListener('click', newProps.onClick);
        }
        if (newProps.onFocus !== oldProps.onFocus) {
            if (oldProps.onFocus)
                element.removeEventListener('focus', oldProps.onFocus);
            if (newProps.onFocus)
                element.addEventListener('focus', newProps.onFocus);
        }
        if (newProps.onBlur !== oldProps.onBlur) {
            if (oldProps.onBlur)
                element.removeEventListener('blur', oldProps.onBlur);
            if (newProps.onBlur)
                element.addEventListener('blur', newProps.onBlur);
        }
        if (newProps.onMouseDown !== oldProps.onMouseDown) {
            if (oldProps.onMouseDown)
                element.removeEventListener('mousedown', oldProps.onMouseDown);
            if (newProps.onMouseDown)
                element.addEventListener('mousedown', newProps.onMouseDown);
        }
        if (newProps.onMouseMove !== oldProps.onMouseMove) {
            if (oldProps.onMouseMove)
                element.removeEventListener('mousemove', oldProps.onMouseMove);
            if (newProps.onMouseMove)
                element.addEventListener('mousemove', newProps.onMouseMove);
        }
        if (newProps.onMouseEnter !== oldProps.onMouseEnter) {
            if (oldProps.onMouseEnter)
                element.removeEventListener('mouseenter', oldProps.onMouseEnter);
            if (newProps.onMouseEnter)
                element.addEventListener('mouseenter', newProps.onMouseEnter);
        }
        if (newProps.onMouseLeave !== oldProps.onMouseLeave) {
            if (oldProps.onMouseLeave)
                element.removeEventListener('mouseleave', oldProps.onMouseLeave);
            if (newProps.onMouseLeave)
                element.addEventListener('mouseleave', newProps.onMouseLeave);
        }
        if (newProps.onMouseUp !== oldProps.onMouseUp) {
            if (oldProps.onMouseUp)
                element.removeEventListener('mouseup', oldProps.onMouseUp);
            if (newProps.onMouseUp)
                element.addEventListener('mouseup', newProps.onMouseUp);
        }
        if (newProps.onTouchStart !== oldProps.onTouchStart) {
            if (oldProps.onTouchStart)
                element.removeEventListener('touchstart', oldProps.onTouchStart);
            if (newProps.onTouchStart)
                element.addEventListener('touchstart', newProps.onTouchStart);
        }
        if (newProps.onTouchMove !== oldProps.onTouchMove) {
            if (oldProps.onTouchMove)
                element.removeEventListener('touchmove', oldProps.onTouchMove);
            if (newProps.onTouchMove)
                element.addEventListener('touchmove', newProps.onTouchMove);
        }
        if (newProps.onTouchEnd !== oldProps.onTouchEnd) {
            if (oldProps.onTouchEnd)
                element.removeEventListener('touchend', oldProps.onTouchEnd);
            if (newProps.onTouchEnd)
                element.addEventListener('touchend', newProps.onTouchEnd);
        }
        if (newProps.onTouchMove !== oldProps.onTouchMove) {
            if (oldProps.onTouchMove)
                element.removeEventListener('touchmove', oldProps.onTouchMove);
            if (newProps.onTouchMove)
                element.addEventListener('touchmove', newProps.onTouchMove);
        }
        if (newProps.onTouchEnd !== oldProps.onTouchEnd) {
            if (oldProps.onTouchEnd)
                element.removeEventListener('touchend', oldProps.onTouchEnd);
            if (newProps.onTouchEnd)
                element.addEventListener('touchend', newProps.onTouchEnd);
        }
        if (newProps.onKeyPress !== oldProps.onKeyPress) {
            if (oldProps.onKeyPress)
                element.removeEventListener('keypress', oldProps.onKeyPress);
            if (newProps.onKeyPress)
                element.addEventListener('keypress', newProps.onKeyPress);
        }
        if (newProps.onKeyDown !== oldProps.onKeyDown) {
            if (oldProps.onKeyDown)
                element.removeEventListener('keydown', oldProps.onKeyDown);
            if (newProps.onKeyDown)
                element.addEventListener('keydown', newProps.onKeyDown);
        }
        if (newProps.onKeyUp !== oldProps.onKeyUp) {
            if (oldProps.onKeyUp)
                element.removeEventListener('keyup', oldProps.onKeyUp);
            if (newProps.onKeyUp)
                element.addEventListener('keyup', newProps.onKeyUp);
        }
    },
    commitTextUpdate: function (textInstance, oldText, newText) {
        textInstance.element.nodeValue = newText;
    },
    appendInitialChild: function (parent, child) {
        if ((0, types_1.isElementContainer)(child)) {
            parent.children.add(child);
        }
        parent.element.appendChild(child.element);
    },
    appendChildToContainer: function (parent, child) {
        if ((0, types_1.isElementContainer)(child)) {
            parent.children.add(child);
        }
        parent.element.appendChild(child.element);
    },
    appendChild: function (parentInstance, child) {
        if ((0, types_1.isElementContainer)(child)) {
            parentInstance.children.add(child);
        }
        parentInstance.element.appendChild(child.element);
    },
    insertBefore: function (parentInstance, child, beforeChild) {
        parentInstance.element.insertBefore(child.element, beforeChild.element);
    },
    removeChild: function (parentInstance, child) {
        if ((0, types_1.isElementContainer)(child)) {
            cleanupElementContainer(parentInstance, child);
        }
        parentInstance.element.removeChild(child.element);
    },
    insertInContainerBefore: function (container, child, beforeChild) {
        container.element.insertBefore(child.element, beforeChild.element);
    },
    removeChildFromContainer: function (container, child) {
        if ((0, types_1.isElementContainer)(child)) {
            cleanupElementContainer(container, child);
        }
        container.element.removeChild(child.element);
    },
    resetTextContent: function (instance) {
        instance.element.textContent = '';
    },
    shouldDeprioritizeSubtree: function () {
        return false;
    },
    getPublicInstance: function (instance) {
        return instance.element;
    },
});
exports.setupHostConfig = setupHostConfig;
const cleanupElementContainer = (parent, instance) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    parent.children.delete(instance);
    (_a = instance.styleUnsubscribers) === null || _a === void 0 ? void 0 : _a.forEach((unsubscribe) => unsubscribe());
    (_b = instance.styleUnsubscribers) === null || _b === void 0 ? void 0 : _b.clear();
    instance.children.forEach(cleanupElementContainer);
    instance.children.clear();
    (_c = instance.className) === null || _c === void 0 ? void 0 : _c.call(instance);
    (_d = instance['data-droppable']) === null || _d === void 0 ? void 0 : _d.call(instance);
    (_e = instance['data-narrate']) === null || _e === void 0 ? void 0 : _e.call(instance);
    (_f = instance['data-narrate-as']) === null || _f === void 0 ? void 0 : _f.call(instance);
    (_g = instance['data-narrate-after']) === null || _g === void 0 ? void 0 : _g.call(instance);
    (_h = instance['data-narrate-before']) === null || _h === void 0 ? void 0 : _h.call(instance);
    (_j = instance['data-testid']) === null || _j === void 0 ? void 0 : _j.call(instance);
    (_k = instance['data-x-ray']) === null || _k === void 0 ? void 0 : _k.call(instance);
    (_l = instance.id) === null || _l === void 0 ? void 0 : _l.call(instance);
    (_m = instance.src) === null || _m === void 0 ? void 0 : _m.call(instance);
    (_o = instance.href) === null || _o === void 0 ? void 0 : _o.call(instance);
    (_p = instance.target) === null || _p === void 0 ? void 0 : _p.call(instance);
    (_q = instance.autoPlay) === null || _q === void 0 ? void 0 : _q.call(instance);
    (_r = instance.loop) === null || _r === void 0 ? void 0 : _r.call(instance);
    (_s = instance.disabled) === null || _s === void 0 ? void 0 : _s.call(instance);
    (_t = instance.maxLength) === null || _t === void 0 ? void 0 : _t.call(instance);
    (_u = instance.rows) === null || _u === void 0 ? void 0 : _u.call(instance);
    (_v = instance.value) === null || _v === void 0 ? void 0 : _v.call(instance);
    (_w = instance.type) === null || _w === void 0 ? void 0 : _w.call(instance);
    (_x = instance.text) === null || _x === void 0 ? void 0 : _x.call(instance);
};
const noop = () => { };
const EMPTY = {};
const fastTypeMapHTML = {
    'fast-a': 'a',
    'fast-div': 'div',
    'fast-p': 'p',
    'fast-img': 'img',
    'fast-input': 'input',
    'fast-span': 'span',
    'fast-textarea': 'textarea',
    'fast-text': 'span',
    a: 'a',
    div: 'div',
    p: 'p',
    img: 'img',
    textarea: 'textarea',
    input: 'input',
    style: 'style',
};
const fastTypeMapSVG = {
    'fast-circle': 'circle',
    'fast-ellipse': 'ellipse',
    'fast-line': 'line',
    'fast-path': 'path',
    'fast-rect': 'rect',
    'fast-svg': 'svg',
    'fast-use': 'use',
    'fast-polyline': 'polyline',
    'fast-polygon': 'polygon',
    'fast-linearGradient': 'linearGradient',
    'fast-radialGradient': 'radialGradient',
    'fast-stop': 'stop',
    'fast-svg-text': 'text',
    'fast-pattern': 'pattern',
    circle: 'circle',
    ellipse: 'ellipse',
    line: 'line',
    path: 'path',
    rect: 'rect',
    svg: 'svg',
    symbol: 'symbol',
    g: 'g',
    use: 'use',
    defs: 'defs',
    polyline: 'polyline',
    polygon: 'polygon',
    linearGradient: 'linearGradient',
    radialGradient: 'radialGradient',
    stop: 'stop',
    text: 'text',
    pattern: 'pattern',
};
//# sourceMappingURL=setupHostConfig.js.map

/***/ }),

/***/ 7358:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isElementContainer = void 0;
const isElementContainer = (value) => {
    return value != null && 'children' in value;
};
exports.isElementContainer = isElementContainer;
//# sourceMappingURL=types.js.map

/***/ }),

/***/ 3130:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useSharedFacet = exports.SharedFacetDriverProvider = exports.sharedFacetDriverContext = void 0;
const react_1 = __webpack_require__(7294);
const dummyConstructor = () => () => { };
exports.sharedFacetDriverContext = (0, react_1.createContext)(dummyConstructor);
exports.SharedFacetDriverProvider = exports.sharedFacetDriverContext.Provider;
const useSharedFacet = (sharedFacet) => {
    return sharedFacet((0, react_1.useContext)(exports.sharedFacetDriverContext));
};
exports.useSharedFacet = useSharedFacet;
//# sourceMappingURL=context.js.map

/***/ }),

/***/ 401:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(3130), exports);
__exportStar(__webpack_require__(7350), exports);
__exportStar(__webpack_require__(1090), exports);
__exportStar(__webpack_require__(5685), exports);
__exportStar(__webpack_require__(815), exports);
__exportStar(__webpack_require__(206), exports);
//# sourceMappingURL=index.js.map

/***/ }),

/***/ 5811:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
/**
 * Simple memoize implementation that supports a single argument
 *
 * TODO: handle cleaning up the cache.
 */
function memoize(fn) {
    const results = new Map();
    return (argument) => {
        const previousResult = results.get(argument);
        if (previousResult)
            return previousResult;
        const newResult = fn(argument);
        results.set(argument, newResult);
        return newResult;
    };
}
exports["default"] = memoize;
//# sourceMappingURL=memoize.js.map

/***/ }),

/***/ 7350:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sharedDynamicSelector = void 0;
const memoize_1 = __importDefault(__webpack_require__(5811));
const core_1 = __webpack_require__(8572);
const sharedSelector_1 = __webpack_require__(5685);
/**
 * Defines a selector that can take a parameter
 * For more information check the documentation on defining a selector.
 *
 * @param selectorFactory differently from a selector, this is a function that takes the parameter to return the selector
 * @param equalityCheck optional, has a default for immutable values
 */
function sharedDynamicSelector(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
selectorFactory, equalityCheck = core_1.defaultEqualityCheck) {
    return (0, memoize_1.default)((parameter) => {
        const [selector, facets] = selectorFactory(parameter);
        const definition = (0, memoize_1.default)((sharedFacetDriver) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return sharedSelector_1.sharedSelector(selector, facets, equalityCheck)(sharedFacetDriver);
        });
        definition.factory = core_1.FACET_FACTORY;
        return definition;
    });
}
exports.sharedDynamicSelector = sharedDynamicSelector;
//# sourceMappingURL=sharedDynamicSelector.js.map

/***/ }),

/***/ 1090:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sharedFacet = void 0;
const memoize_1 = __importDefault(__webpack_require__(5811));
const core_1 = __webpack_require__(8572);
/**
 * Defines a facet with shared data
 *
 * @param name the name of the facet (used to construct it with the sharedFacetDriver)
 * @param initialValue optional default value while constructor is not ready with the real value
 */
function sharedFacet(name, initialValue = core_1.NO_VALUE) {
    const definition = (0, memoize_1.default)((sharedFacetDriver) => (0, core_1.createFacet)({
        initialValue,
        startSubscription: (update) => {
            return sharedFacetDriver(name, update);
        },
    }));
    definition.factory = core_1.FACET_FACTORY;
    return definition;
}
exports.sharedFacet = sharedFacet;
//# sourceMappingURL=sharedFacet.js.map

/***/ }),

/***/ 5685:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.sharedSelector = void 0;
const memoize_1 = __importDefault(__webpack_require__(5811));
const core_1 = __webpack_require__(8572);
/**
 * Defines a selector to transform/map data from a facet
 *
 * When used correctly, it can limit components being re-rendered if they only
 * care about a specific attribute/function of a facet.
 *
 * To take full advantage of a selector, it is important to choose a proper equalityCheck
 * with an IMPORTANT understanding of the source of the data (if it is mutable for example).
 *
 * If the source of the data is an object or array that is being mutated, then it would mean that
 * the current and previous values passed to the equalityCheck would be same reference, making it
 * impossible to run any equality check. We recommend only using an equality check if the values
 * returned by the selector are numbers, booleans, strings, or objects/arrays constructed by the selector.
 *
 * @param facets which facets to read the data from
 * @param selector a function to transform the data from the facets
 * @param equalityCheck optional, has a default for immutable values
 */
function sharedSelector(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
selector, facets, equalityCheck = core_1.defaultEqualityCheck) {
    const definition = (0, memoize_1.default)((sharedFacetDriver) => (0, core_1.mapFacetsCached)(facets.map((facet) => facet(sharedFacetDriver)), selector, equalityCheck));
    definition.factory = core_1.FACET_FACTORY;
    return definition;
}
exports.sharedSelector = sharedSelector;
//# sourceMappingURL=sharedSelector.js.map

/***/ }),

/***/ 815:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
//# sourceMappingURL=types.js.map

/***/ }),

/***/ 206:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.useSharedFacetPropSetter = void 0;
const core_1 = __webpack_require__(8572);
const context_1 = __webpack_require__(3130);
/**
 * Hook that returns a setter function to a specific property of a given sharedFacet
 * Ex:
 * 	- Given a shared facet { foo: 'bar' }
 *  - Could be used as useSharedFacetPropSetter(facet, 'foo')
 *  - And the setter would set the foo property
 *
 * @param sharedFacet
 * @param prop the name of the prop to set
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useSharedFacetPropSetter(sharedFacet, prop) {
    return (0, core_1.useFacetCallback)((facet) => (newValue) => {
        facet[prop] = newValue;
    }, [prop], [(0, context_1.useSharedFacet)(sharedFacet)]);
}
exports.useSharedFacetPropSetter = useSharedFacetPropSetter;
//# sourceMappingURL=useSharedFacetPropSetter.js.map

/***/ }),

/***/ 5341:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*jslint browser: true, nomen: true, plusplus: true */
/// @file cohtml.js
/// @namespace engine
/// Coherent UI JavaScript interface.
/// The `engine` module contains all functions for communication between the UI and the game / application.
(function (factory) {
  console.log('Loading Client Side cohtml file...'); // This is a modified cohtml file so that it returns a function that calls the factory of the module,
  // allowing us to conditionally execute it from the outside.

  if ( true && module.exports) {
    module.exports = () => factory(__webpack_require__.g, __webpack_require__.g.engine, false);
  }
})(function (global, engine, hasOnLoad) {
  'use strict';

  var VERSION = [1, 5, 0, 8];
  /**
  * Event emitter
  *
  * @class Emitter
  */

  function Emitter() {
    this.events = {};
  }

  function Handler(code, context) {
    this.code = code;
    this.context = context;
  }

  Emitter.prototype._createClear = function (object, name, handler) {
    return function () {
      var handlers = object.events[name];

      if (handlers) {
        var index = -1; // this was in native previously

        if (handler == null) {
          for (var i = 0; i < handlers.length; ++i) {
            if (handlers[i].wasInCPP != null) {
              index = i;
              break;
            }
          }
        } else {
          index = handlers.indexOf(handler);
        }

        if (index != -1) {
          handlers.splice(index, 1);

          if (handlers.length === 0) {
            delete object.events[name];
          }
        }
      } else {
        if (engine.RemoveOnHandler != null) {
          engine.RemoveOnHandler(name);
        }
      }
    };
  };
  /**
  * Add a handler for an event
  *
  * @method on
  * @param name the event name
  * @param callback function to be called when the event is triggered
  * @param context this binding for executing the handler, defaults to the Emitter
  * @return connection object
  */


  Emitter.prototype.on = function (name, callback, context) {
    var handlers = this.events[name];
    if (handlers == null) handlers = this.events[name] = [];
    var handler = new Handler(callback, context || this);
    handlers.push(handler);
    return {
      clear: this._createClear(this, name, handler)
    };
  };
  /**
  * Remove a handler from an event
  *
  * @method off
  * @param name the event name
  * @param handler function to be called when the event is triggered
  * @param context this binding for executing the handler, defaults to the Emitter
  * @return connection object
  */


  Emitter.prototype.off = function (name, handler, context) {
    var handlers = this.events[name];

    if (handlers != null) {
      context = context || this;
      var index;
      var length = handlers.length;

      for (index = 0; index < length; ++index) {
        var reg = handlers[index];

        if (reg.code == handler && reg.context == context) {
          break;
        }
      }

      if (index < length) {
        handlers.splice(index, 1);

        if (handlers.length === 0) {
          delete this.events[name];
        }
      }
    } else {
      engine.RemoveOnHandler(name);
    }
  };

  var isAttached = engine != null;
  engine = engine || {}; /// @var {bool} engine.isAttached
  /// Indicates whether the script is currently running inside Cohtml

  engine.isAttached = isAttached;
  engine.onEventsReplayed = null;

  Emitter.prototype.trigger = function (name) {
    var handlers = this.events[name];

    if (handlers != null) {
      var args = Array.prototype.slice.call(arguments, 1);
      handlers.forEach(function (handler) {
        handler.code.apply(handler.context, args);
      });
      return true;
    }

    return false;
  };

  Emitter.prototype.merge = function (emitter) {
    var lhs = this.events,
        rhs = emitter.events,
        push = Array.prototype.push,
        events;

    for (var e in rhs) {
      events = lhs[e] = lhs[e] || [];
      push.apply(events, rhs[e]);
    }
  };

  var pending = 'pending';
  var fulfilled = 'fulfilled';
  var broken = 'broken';

  function callAsync(code, context, argument) {
    var async = function () {
      code.call(context, argument);
    };

    window.setTimeout(async, 1);
  }

  if (!engine.isAttached) {
    Emitter.prototype.on = function (name, callback, context) {
      var handlers = this.events[name];

      if (
      /** @type {any} */
      this.browserCallbackOn) {
        /** @type {any} */
        this.browserCallbackOn(name, callback, context);
      }

      if (handlers == null) {
        handlers = this.events[name] = [];
      }

      var handler = new Handler(callback, context || this);
      handlers.push(handler);
      return {
        clear: this._createClear(this, name, handler)
      };
    };

    Emitter.prototype.off = function (name, handler, context) {
      var handlers = this.events[name];

      if (handlers != null) {
        context = context || this;
        var index;
        var length = handlers.length;

        for (index = 0; index < length; ++index) {
          var reg = handlers[index];

          if (reg.code == handler && reg.context == context) {
            break;
          }
        }

        if (index < length) {
          handlers.splice(index, 1);

          if (handlers.length === 0) {
            delete this.events[name];

            if (
            /** @type {any} */
            this.browserCallbackOff) {
              /** @type {any} */
              this.browserCallbackOff(name, handler, context);
            }
          }
        }
      }
    };

    engine.SendMessage = function (name, id) {
      var args = Array.prototype.slice.call(arguments, 2);
      var deferred = engine._ActiveRequests[id];
      delete engine._ActiveRequests[id];

      var call = function () {
        var mock = engine._mocks[name];

        if (mock != null) {
          deferred.resolve(mock.apply(engine, args));
        }
      };

      window.setTimeout(call, 16);
    }; /// @function engine.TriggerEvent
    /// Tries to invoke handlers for an event.
    ///
    /// It will invoke any handler registered in C++ or the only handler registered in JavaScript.
    /// engine._trigger will handle the case where more than one event handler is registered in JavaScript
    /// or there are handlers from C++ and JavaScript at the same time.
    /// @param {String} name name of the event to be fired
    /// @param ... any extra parameters to be passed to event handlers
    /// @return true if any event handlers have been registered in C++ or exactly one in JavaScript
    /// @note this mock-mode version will return true if there is any event handler in JavaScript


    engine.TriggerEvent = function () {
      var args = Array.prototype.slice.call(arguments);

      var trigger = function () {
        var mock = engine._mocks[args[0]];

        if (mock != null) {
          mock.apply(engine, args.slice(1));
        }
      };

      window.setTimeout(trigger, 16);
      return engine._mocks[args[0]] != null;
    };

    engine.BindingsReady = function () {
      engine._OnReady();
    };

    engine.__observeLifetime = function () {};

    engine.beginEventRecording = engine.endEventRecording = engine.saveEventRecord = function () {
      console.warn("Event recording will not work in the browser!");
    };

    engine._mocks = {};

    engine._mockImpl = function (name, mock, isCppCall, isEvent) {
      if (mock) {
        this._mocks[name] = mock;
      } // Extract the name of the arguments from Function.prototype.toString


      var functionStripped = mock.toString().replace("function " + mock.name + "(", "");
      var rightParanthesis = functionStripped.indexOf(")");
      var args = functionStripped.substr(0, rightParanthesis);

      if (this.browserCallbackMock) {
        this.browserCallbackMock(name, args, isCppCall, Boolean(isEvent));
      }
    };

    engine.mock = function (name, mock, isEvent) {
      this._mockImpl(name, mock, true, isEvent);
    };
  }

  engine.events = {};

  for (var property in Emitter.prototype) {
    engine[property] = Emitter.prototype[property];
  }

  if (engine.isAttached) {
    /// @function engine.on
    /// Register handler for and event
    /// @param {String} name name of the event
    /// @param {Function} callback callback function to be executed when the event has been triggered
    /// @param context *this* context for the function, by default the engine object
    engine.on = function (name, callback, context) {
      var handlers = this.events[name];

      if (handlers == null && engine.AddOrRemoveOnHandler != null) {
        // Check where to cache the handler
        var prevEvent = engine.AddOrRemoveOnHandler(name, callback, context || engine); // handler cached in C++

        if (prevEvent == null) {
          return {
            clear: this._createClear(this, name, undefined)
          };
        }

        handlers = this.events[name] = []; // Add the previous handler

        var prevHandler = new Handler(prevEvent[0], prevEvent[1] || this);
        /** @type {any} */

        prevHandler.wasInCPP = true;
        handlers.push(prevHandler);
      } else if (handlers == null) {
        handlers = this.events[name] = [];
      }

      var handler = new Handler(callback, context || this);
      handlers.push(handler);
      return {
        clear: this._createClear(this, name, handler)
      };
    };
  }

  engine.whenReady = new Promise(resolve => {
    engine.on('Ready', resolve);
  }); /// @function engine.beginEventRecording
  /// Begins recording all events triggered using View::TriggerEvent from the game
  /// @function engine.endEventRecording
  /// Ends event recording
  /// @function engine.saveEventRecord
  /// Saves the events recorded in between the last calls to engine.beginEventRecording and engine.endEventRecording to a file
  /// @param {String} path The path to the file where to save the recorded events. Optional. Defaults to "eventRecord.json"
  /// @function engine.replayEvents
  /// Replays the events previously recorded and stored in path. If you need to be notified when all events
  /// are replayed, assign a callback to engine.onEventsReplayed
  /// @param {Number} timeScale The speed at which to replay the events (e.g. pass 2 to double the speed). Optional. Defaults to 1.
  /// @param {String} path The path to the file the recorded events are stored. Optional. Defaults to "eventRecord.json"
  /// @function engine.off
  /// Remove handler for an event
  /// @param {String} name name of the event, by default removes all events
  /// @param {Function} callback the callback function to be removed, by default removes all callbacks for a given event
  /// @param context *this* context for the function, by default all removes all callbacks, regardless of context
  /// @warning Removing all handlers for `engine` will remove some *Coherent UI* internal events, breaking some functionality.
  /// @function engine.trigger
  /// Trigger an event
  /// This function will trigger any C++ handler registered for this event with `Coherent::UI::View::RegisterForEvent`
  /// @param {String} name name of the event
  /// @param ... any extra arguments to be passed to the event handlers

  engine._trigger = Emitter.prototype.trigger;
  var concatArguments = Array.prototype.concat;

  engine.trigger = function (name) {
    if (!this._trigger.apply(this, arguments)) {
      this.TriggerEvent.apply(this, arguments);
    }

    if (this.events['all'] != null) {
      var allArguments = concatArguments.apply(['all'], arguments);

      this._trigger.apply(this, allArguments);
    }
  }; /// @function engine.showOverlay
  /// Shows the debugging overlay in the browser.
  /// Only works in the browser. Attempts to use it in Coherent UI will do nothing.


  engine.showOverlay = function () {}; /// @function engine.hideOverlay
  /// Hides the debugging overlay in the browser.
  /// Only works in the browser. Attempts to use it in Coherent UI will do nothing.


  engine.hideOverlay = function () {}; /// @function engine.mock
  /// Mocks a C++ function call with the specified function.
  /// Only works in the browser. Attempts to use it in Coherent UI will do nothing.
  /// @param {String} name name of the event
  /// @param {Function} mock a function to be called in-place of your native binding
  /// @param {Boolean} isEvent whether you are mocking an event or function call


  if (engine.isAttached) {
    engine.mock = function (name, mock, isEvent) {};
  }

  engine._BindingsReady = false;
  engine._WindowLoaded = false;
  engine._RequestId = 0;
  engine._ActiveRequests = {};

  if (global.engineCreateDeferred != null) {
    console.warn("engineCreateDeferred is depricated");
  } /// @function engine.call
  /// Call asynchronously a C++ handler and retrieve the result
  /// The C++ handler must have been registered with `Coherent::UI::View::BindCall`
  /// @param {String} name name of the C++ handler to be called
  /// @param ... any extra parameters to be passed to the C++ handler
  /// @return ECMAScript 6 promise


  engine.call = function () {
    engine._RequestId++;
    var id = engine._RequestId;
    var messageArguments = Array.prototype.slice.call(arguments);
    messageArguments.splice(1, 0, id);
    var promise = new Promise(function (resolve, reject) {
      engine._ActiveRequests[id] = {
        resolve: resolve,
        reject: reject
      };
      engine.SendMessage.apply(engine, messageArguments);
    });
    return promise;
  };

  engine._Result = function (requestId) {
    var deferred = engine._ActiveRequests[requestId];

    if (deferred != null) {
      delete engine._ActiveRequests[requestId];
      var resultArguments = Array.prototype.slice.call(arguments);
      resultArguments.shift();
      deferred.resolve.apply(deferred, resultArguments);
    }
  };

  engine._Errors = ['Success', 'ArgumentType', 'NoSuchMethod', 'NoResult'];

  engine._ForEachError = function (errors, callback) {
    var length = errors.length;

    for (var i = 0; i < length; ++i) {
      callback(errors[i].first, errors[i].second);
    }
  };

  engine._TriggerError = function (message) {
    engine.trigger('Error', message);
  };

  engine._OnError = function (requestId, errors) {
    if (requestId == null || requestId === 0) {
      engine._ForEachError(errors, engine._TriggerError);
    } else {
      var deferred = engine._ActiveRequests[requestId];
      delete engine._ActiveRequests[requestId];
      deferred.reject(new Error(errors[0].second));
    }

    if (errors.length) {
      throw new Error(errors[0].second);
    }
  };

  engine._eventHandles = {};

  engine._Register = function (eventName) {
    var trigger = function (name, engine) {
      return function () {
        var eventArguments = [name];
        eventArguments.push.apply(eventArguments, arguments);
        engine.TriggerEvent.apply(this, eventArguments);
      };
    }(eventName, engine);

    engine._eventHandles[eventName] = engine.on(eventName, trigger);
  };

  engine._removeEventThunk = function (name) {
    var handle = engine._eventHandles[name];
    handle.clear();
    delete engine._eventHandles[name];
  };

  engine._Unregister = function (name) {
    if (typeof name === 'string') {
      engine._removeEventThunk(name);
    } else {
      name.forEach(engine._removeEventThunk, engine);
    }
  };

  function createMethodStub(name) {
    var stub = function () {
      var args = Array.prototype.slice.call(arguments);
      args.splice(0, 0, name, this._id);
      return engine.call.apply(engine, args);
    };

    return stub;
  }

  engine._boundTypes = {};

  engine._createInstance = function (args) {
    var type = args[0],
        id = args[1],
        methods = args[2],
        constructor = engine._boundTypes[type];

    if (constructor == null) {
      constructor = function (id) {
        this._id = id;
      };

      constructor.prototype.__Type = type;
      methods.forEach(function (name) {
        constructor.prototype[name] = createMethodStub(type + '_' + name);
      });
      engine._boundTypes[type] = constructor;
    }

    var instance = new constructor(id);

    engine.__observeLifetime(instance);

    return instance;
  };

  engine._OnReady = function () {
    engine._BindingsReady = true;

    if (engine._WindowLoaded) {
      engine.trigger('Ready');
    }
  };

  engine._OnWindowLoaded = function () {
    engine._WindowLoaded = true;

    if (engine._BindingsReady) {
      engine.trigger('Ready');
    }
  };

  engine._ThrowError = function (error) {
    var prependTab = function (s) {
      return "\t" + s;
    };

    var errorString = error.name + ": " + error.message + "\n" + error.stack.split("\n").map(prependTab).join("\n");
    console.error(errorString);
  };

  if (hasOnLoad) {
    global.addEventListener("load", function () {
      engine._OnWindowLoaded();
    });
  } else {
    engine._WindowLoaded = true;
  }

  engine.on('_Result', engine._Result, engine);
  engine.on('_Register', engine._Register, engine);
  engine.on('_Unregister', engine._Unregister, engine);
  engine.on('_OnReady', engine._OnReady, engine);
  engine.on('_OnError', engine._OnError, engine);
  engine.on('__OnReplayRecordCompleted', function (jsonRecords) {
    if (engine.onEventsReplayed) {
      engine.onEventsReplayed();
    }
  }); //@ts-ignore

  engine.dependency = new WeakMap();
  engine.updateWholeModelCallbacks = [];
  engine.hasAttachedUpdateListner = false;

  engine.onUpdateWholeModel = object => {
    let deps = engine.dependency.get(object) || [];
    deps.forEach(dep => engine.updateWholeModel(dep));
  };

  engine.createObservableModel = observableName => {
    const handler = {
      set: (target, prop, value) => {
        engine.updateWholeModel(window[observableName]);
        target[prop] = value;
      }
    }; // @ts-ignore

    engine.createJSModel(observableName, new Proxy({}, handler));
  };

  engine.addSynchronizationDependency = (first, second) => {
    if (!engine.hasAttachedUpdateListner) {
      // will attach updateWholeModel callback for when there are one or more model dependencies
      engine.addDataBindEventListner("updateWholeModel", engine.onUpdateWholeModel);
      engine.hasAttachedUpdateListner = true;
    }

    let deps = engine.dependency.get(first);

    if (!deps) {
      deps = [];
      engine.dependency.set(first, deps);
    }

    deps.push(second);
  };

  engine.removeSynchronizationDependency = (first, second) => {
    let deps = engine.dependency.get(first) || [];
    deps.splice(deps.indexOf(first), 1);
  };

  engine.BindingsReady(VERSION[0], VERSION[1], VERSION[2], VERSION[3]);
  return engine;
});

/***/ }),

/***/ 7811:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "facet": () => (/* binding */ facet)
/* harmony export */ });
/* unused harmony exports strictShallowObjectEqualityCheck, shallowObjectEqualityCheck, localFacet, useFacet, useFacetSetter */
/* harmony import */ var _react_facet_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8572);
/* harmony import */ var _react_facet_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_react_facet_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_core__WEBPACK_IMPORTED_MODULE_0__, "NO_VALUE")) __webpack_require__.d(__webpack_exports__, { "NO_VALUE": function() { return _react_facet_core__WEBPACK_IMPORTED_MODULE_0__.NO_VALUE; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_core__WEBPACK_IMPORTED_MODULE_0__, "createFacet")) __webpack_require__.d(__webpack_exports__, { "createFacet": function() { return _react_facet_core__WEBPACK_IMPORTED_MODULE_0__.createFacet; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_core__WEBPACK_IMPORTED_MODULE_0__, "createFacetContext")) __webpack_require__.d(__webpack_exports__, { "createFacetContext": function() { return _react_facet_core__WEBPACK_IMPORTED_MODULE_0__.createFacetContext; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_core__WEBPACK_IMPORTED_MODULE_0__, "multiObserve")) __webpack_require__.d(__webpack_exports__, { "multiObserve": function() { return _react_facet_core__WEBPACK_IMPORTED_MODULE_0__.multiObserve; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_core__WEBPACK_IMPORTED_MODULE_0__, "render")) __webpack_require__.d(__webpack_exports__, { "render": function() { return _react_facet_core__WEBPACK_IMPORTED_MODULE_0__.render; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_core__WEBPACK_IMPORTED_MODULE_0__, "sharedFacet")) __webpack_require__.d(__webpack_exports__, { "sharedFacet": function() { return _react_facet_core__WEBPACK_IMPORTED_MODULE_0__.sharedFacet; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_core__WEBPACK_IMPORTED_MODULE_0__, "sharedSelector")) __webpack_require__.d(__webpack_exports__, { "sharedSelector": function() { return _react_facet_core__WEBPACK_IMPORTED_MODULE_0__.sharedSelector; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_core__WEBPACK_IMPORTED_MODULE_0__, "useFacetCallback")) __webpack_require__.d(__webpack_exports__, { "useFacetCallback": function() { return _react_facet_core__WEBPACK_IMPORTED_MODULE_0__.useFacetCallback; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_core__WEBPACK_IMPORTED_MODULE_0__, "useFacetEffect")) __webpack_require__.d(__webpack_exports__, { "useFacetEffect": function() { return _react_facet_core__WEBPACK_IMPORTED_MODULE_0__.useFacetEffect; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_core__WEBPACK_IMPORTED_MODULE_0__, "useFacetMap")) __webpack_require__.d(__webpack_exports__, { "useFacetMap": function() { return _react_facet_core__WEBPACK_IMPORTED_MODULE_0__.useFacetMap; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_core__WEBPACK_IMPORTED_MODULE_0__, "useFacetUnwrap")) __webpack_require__.d(__webpack_exports__, { "useFacetUnwrap": function() { return _react_facet_core__WEBPACK_IMPORTED_MODULE_0__.useFacetUnwrap; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_core__WEBPACK_IMPORTED_MODULE_0__, "useFacetWrap")) __webpack_require__.d(__webpack_exports__, { "useFacetWrap": function() { return _react_facet_core__WEBPACK_IMPORTED_MODULE_0__.useFacetWrap; } });
/* harmony import */ var _react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7154);
/* harmony import */ var _react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__, "NO_VALUE")) __webpack_require__.d(__webpack_exports__, { "NO_VALUE": function() { return _react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__.NO_VALUE; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__, "createFacet")) __webpack_require__.d(__webpack_exports__, { "createFacet": function() { return _react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__.createFacet; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__, "createFacetContext")) __webpack_require__.d(__webpack_exports__, { "createFacetContext": function() { return _react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__.createFacetContext; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__, "multiObserve")) __webpack_require__.d(__webpack_exports__, { "multiObserve": function() { return _react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__.multiObserve; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__, "render")) __webpack_require__.d(__webpack_exports__, { "render": function() { return _react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__.render; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__, "sharedFacet")) __webpack_require__.d(__webpack_exports__, { "sharedFacet": function() { return _react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__.sharedFacet; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__, "sharedSelector")) __webpack_require__.d(__webpack_exports__, { "sharedSelector": function() { return _react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__.sharedSelector; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__, "useFacetCallback")) __webpack_require__.d(__webpack_exports__, { "useFacetCallback": function() { return _react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__.useFacetCallback; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__, "useFacetEffect")) __webpack_require__.d(__webpack_exports__, { "useFacetEffect": function() { return _react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__.useFacetEffect; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__, "useFacetMap")) __webpack_require__.d(__webpack_exports__, { "useFacetMap": function() { return _react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__.useFacetMap; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__, "useFacetUnwrap")) __webpack_require__.d(__webpack_exports__, { "useFacetUnwrap": function() { return _react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__.useFacetUnwrap; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__, "useFacetWrap")) __webpack_require__.d(__webpack_exports__, { "useFacetWrap": function() { return _react_facet_dom_fiber__WEBPACK_IMPORTED_MODULE_1__.useFacetWrap; } });
/* harmony import */ var _react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(401);
/* harmony import */ var _react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__);
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__, "NO_VALUE")) __webpack_require__.d(__webpack_exports__, { "NO_VALUE": function() { return _react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__.NO_VALUE; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__, "createFacet")) __webpack_require__.d(__webpack_exports__, { "createFacet": function() { return _react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__.createFacet; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__, "createFacetContext")) __webpack_require__.d(__webpack_exports__, { "createFacetContext": function() { return _react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__.createFacetContext; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__, "multiObserve")) __webpack_require__.d(__webpack_exports__, { "multiObserve": function() { return _react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__.multiObserve; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__, "render")) __webpack_require__.d(__webpack_exports__, { "render": function() { return _react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__.render; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__, "sharedFacet")) __webpack_require__.d(__webpack_exports__, { "sharedFacet": function() { return _react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__.sharedFacet; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__, "sharedSelector")) __webpack_require__.d(__webpack_exports__, { "sharedSelector": function() { return _react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__.sharedSelector; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__, "useFacetCallback")) __webpack_require__.d(__webpack_exports__, { "useFacetCallback": function() { return _react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__.useFacetCallback; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__, "useFacetEffect")) __webpack_require__.d(__webpack_exports__, { "useFacetEffect": function() { return _react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__.useFacetEffect; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__, "useFacetMap")) __webpack_require__.d(__webpack_exports__, { "useFacetMap": function() { return _react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__.useFacetMap; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__, "useFacetUnwrap")) __webpack_require__.d(__webpack_exports__, { "useFacetUnwrap": function() { return _react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__.useFacetUnwrap; } });
/* harmony reexport (checked) */ if(__webpack_require__.o(_react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__, "useFacetWrap")) __webpack_require__.d(__webpack_exports__, { "useFacetWrap": function() { return _react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__.useFacetWrap; } });







const strictShallowObjectEqualityCheck = (/* unused pure expression or super */ null && (originalShallowObjectEqualityCheck));
/**
 * @deprecated This object equality check has no guarantees that the keys of the object are Immutable.
 * Use `strictShallowObjectEqualityCheck` instead
 * */

const shallowObjectEqualityCheck = (/* unused pure expression or super */ null && (originalShallowObjectEqualityCheck));

/**
 * @deprecated use sharedFacet instead
 */

const facet = _react_facet_shared_facet__WEBPACK_IMPORTED_MODULE_2__.sharedFacet;
/**
 * @deprecated
 */

/**
 * @deprecated we recommend useFacetState instead
 */
function localFacet(initialValue) {
  const facet = createFacet({
    initialValue
  });

  const result = () => facet;

  result.factory = FACET_FACTORY;
  return result;
}
/**
 * @deprecated useFacetUnwrap and useSharedFacet instead
 */

function useFacet(sharedFacet) {
  const rawValue = useFacetUnwrap(useSharedFacet(sharedFacet));
  return rawValue === NO_VALUE ? undefined : rawValue;
}

const isSetterCallback = setter => {
  return typeof setter === 'function';
};
/**
 * @deprecated we recommend useFacetState instead
 */


function useFacetSetter(facet) {
  return setter => {
    if (isSetterCallback(setter)) {
      return facet().setWithCallback(setter);
    } else {
      return facet().set(setter);
    }
  };
}

/***/ }),

/***/ 9742:
/***/ ((__unused_webpack_module, exports) => {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ 8764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(9742)
var ieee754 = __webpack_require__(645)
var customInspectSymbol =
  (typeof Symbol === 'function' && typeof Symbol['for'] === 'function') // eslint-disable-line dot-notation
    ? Symbol['for']('nodejs.util.inspect.custom') // eslint-disable-line dot-notation
    : null

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
 *               implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * We report that the browser does not support typed arrays if the are not subclassable
 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
 * for __proto__ and has a buggy typed array implementation.
 */
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()

if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
    typeof console.error === 'function') {
  console.error(
    'This browser lacks typed array (Uint8Array) support which is required by ' +
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
  )
}

function typedArraySupport () {
  // Can typed array instances can be augmented?
  try {
    var arr = new Uint8Array(1)
    var proto = { foo: function () { return 42 } }
    Object.setPrototypeOf(proto, Uint8Array.prototype)
    Object.setPrototypeOf(arr, proto)
    return arr.foo() === 42
  } catch (e) {
    return false
  }
}

Object.defineProperty(Buffer.prototype, 'parent', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.buffer
  }
})

Object.defineProperty(Buffer.prototype, 'offset', {
  enumerable: true,
  get: function () {
    if (!Buffer.isBuffer(this)) return undefined
    return this.byteOffset
  }
})

function createBuffer (length) {
  if (length > K_MAX_LENGTH) {
    throw new RangeError('The value "' + length + '" is invalid for option "size"')
  }
  // Return an augmented `Uint8Array` instance
  var buf = new Uint8Array(length)
  Object.setPrototypeOf(buf, Buffer.prototype)
  return buf
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new TypeError(
        'The "string" argument must be of type string. Received type number'
      )
    }
    return allocUnsafe(arg)
  }
  return from(arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

function from (value, encodingOrOffset, length) {
  if (typeof value === 'string') {
    return fromString(value, encodingOrOffset)
  }

  if (ArrayBuffer.isView(value)) {
    return fromArrayView(value)
  }

  if (value == null) {
    throw new TypeError(
      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
      'or Array-like Object. Received type ' + (typeof value)
    )
  }

  if (isInstance(value, ArrayBuffer) ||
      (value && isInstance(value.buffer, ArrayBuffer))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof SharedArrayBuffer !== 'undefined' &&
      (isInstance(value, SharedArrayBuffer) ||
      (value && isInstance(value.buffer, SharedArrayBuffer)))) {
    return fromArrayBuffer(value, encodingOrOffset, length)
  }

  if (typeof value === 'number') {
    throw new TypeError(
      'The "value" argument must not be of type number. Received type number'
    )
  }

  var valueOf = value.valueOf && value.valueOf()
  if (valueOf != null && valueOf !== value) {
    return Buffer.from(valueOf, encodingOrOffset, length)
  }

  var b = fromObject(value)
  if (b) return b

  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
      typeof value[Symbol.toPrimitive] === 'function') {
    return Buffer.from(
      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
    )
  }

  throw new TypeError(
    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
    'or Array-like Object. Received type ' + (typeof value)
  )
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(value, encodingOrOffset, length)
}

// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
// https://github.com/feross/buffer/pull/148
Object.setPrototypeOf(Buffer.prototype, Uint8Array.prototype)
Object.setPrototypeOf(Buffer, Uint8Array)

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be of type number')
  } else if (size < 0) {
    throw new RangeError('The value "' + size + '" is invalid for option "size"')
  }
}

function alloc (size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpreted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(size).fill(fill, encoding)
      : createBuffer(size).fill(fill)
  }
  return createBuffer(size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(size, fill, encoding)
}

function allocUnsafe (size) {
  assertSize(size)
  return createBuffer(size < 0 ? 0 : checked(size) | 0)
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(size)
}

function fromString (string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('Unknown encoding: ' + encoding)
  }

  var length = byteLength(string, encoding) | 0
  var buf = createBuffer(length)

  var actual = buf.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    buf = buf.slice(0, actual)
  }

  return buf
}

function fromArrayLike (array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  var buf = createBuffer(length)
  for (var i = 0; i < length; i += 1) {
    buf[i] = array[i] & 255
  }
  return buf
}

function fromArrayView (arrayView) {
  if (isInstance(arrayView, Uint8Array)) {
    var copy = new Uint8Array(arrayView)
    return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength)
  }
  return fromArrayLike(arrayView)
}

function fromArrayBuffer (array, byteOffset, length) {
  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('"offset" is outside of buffer bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('"length" is outside of buffer bounds')
  }

  var buf
  if (byteOffset === undefined && length === undefined) {
    buf = new Uint8Array(array)
  } else if (length === undefined) {
    buf = new Uint8Array(array, byteOffset)
  } else {
    buf = new Uint8Array(array, byteOffset, length)
  }

  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(buf, Buffer.prototype)

  return buf
}

function fromObject (obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    var buf = createBuffer(len)

    if (buf.length === 0) {
      return buf
    }

    obj.copy(buf, 0, 0, len)
    return buf
  }

  if (obj.length !== undefined) {
    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
      return createBuffer(0)
    }
    return fromArrayLike(obj)
  }

  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
    return fromArrayLike(obj.data)
  }
}

function checked (length) {
  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= K_MAX_LENGTH) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return b != null && b._isBuffer === true &&
    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
}

Buffer.compare = function compare (a, b) {
  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength)
  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength)
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError(
      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
    )
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!Array.isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (isInstance(buf, Uint8Array)) {
      if (pos + buf.length > buffer.length) {
        Buffer.from(buf).copy(buffer, pos)
      } else {
        Uint8Array.prototype.set.call(
          buffer,
          buf,
          pos
        )
      }
    } else if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    } else {
      buf.copy(buffer, pos)
    }
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    throw new TypeError(
      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
      'Received type ' + typeof string
    )
  }

  var len = string.length
  var mustMatch = (arguments.length > 2 && arguments[2] === true)
  if (!mustMatch && len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) {
          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
        }
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coercion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.toLocaleString = Buffer.prototype.toString

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim()
  if (this.length > max) str += ' ... '
  return '<Buffer ' + str + '>'
}
if (customInspectSymbol) {
  Buffer.prototype[customInspectSymbol] = Buffer.prototype.inspect
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (isInstance(target, Uint8Array)) {
    target = Buffer.from(target, target.offset, target.byteLength)
  }
  if (!Buffer.isBuffer(target)) {
    throw new TypeError(
      'The "target" argument must be one of type Buffer or Uint8Array. ' +
      'Received type ' + (typeof target)
    )
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset // Coerce to Number.
  if (numberIsNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [val], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  var strLen = string.length

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (numberIsNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset >>> 0
    if (isFinite(length)) {
      length = length >>> 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
      case 'latin1':
      case 'binary':
        return asciiWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF)
      ? 4
      : (firstByte > 0xDF)
          ? 3
          : (firstByte > 0xBF)
              ? 2
              : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += hexSliceLookupTable[buf[i]]
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  // If bytes.length is odd, the last 8 bits must be ignored (same as node.js)
  for (var i = 0; i < bytes.length - 1; i += 2) {
    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf = this.subarray(start, end)
  // Return an augmented `Uint8Array` instance
  Object.setPrototypeOf(newBuf, Buffer.prototype)

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUintLE =
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUintBE =
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUint8 =
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUint16LE =
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUint16BE =
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUint32LE =
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUint32BE =
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  offset = offset >>> 0
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUintLE =
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUintBE =
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  byteLength = byteLength >>> 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUint8 =
Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeUint16LE =
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeUint16BE =
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeUint32LE =
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset + 3] = (value >>> 24)
  this[offset + 2] = (value >>> 16)
  this[offset + 1] = (value >>> 8)
  this[offset] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeUint32BE =
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    var limit = Math.pow(2, (8 * byteLength) - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  this[offset] = (value >>> 8)
  this[offset + 1] = (value & 0xff)
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  this[offset] = (value & 0xff)
  this[offset + 1] = (value >>> 8)
  this[offset + 2] = (value >>> 16)
  this[offset + 3] = (value >>> 24)
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  this[offset] = (value >>> 24)
  this[offset + 1] = (value >>> 16)
  this[offset + 2] = (value >>> 8)
  this[offset + 3] = (value & 0xff)
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  value = +value
  offset = offset >>> 0
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
    // Use built-in when available, missing from IE11
    this.copyWithin(targetStart, start, end)
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, end),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if ((encoding === 'utf8' && code < 128) ||
          encoding === 'latin1') {
        // Fast path: If `val` fits into a single byte, use that numeric value.
        val = code
      }
    }
  } else if (typeof val === 'number') {
    val = val & 255
  } else if (typeof val === 'boolean') {
    val = Number(val)
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : Buffer.from(val, encoding)
    var len = bytes.length
    if (len === 0) {
      throw new TypeError('The value "' + val +
        '" is invalid for argument "value"')
    }
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node takes equal signs as end of the Base64 encoding
  str = str.split('=')[0]
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = str.trim().replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
// the `instanceof` check but they should be treated as of that type.
// See: https://github.com/feross/buffer/issues/166
function isInstance (obj, type) {
  return obj instanceof type ||
    (obj != null && obj.constructor != null && obj.constructor.name != null &&
      obj.constructor.name === type.name)
}
function numberIsNaN (obj) {
  // For IE11 support
  return obj !== obj // eslint-disable-line no-self-compare
}

// Create lookup table for `toString('hex')`
// See: https://github.com/feross/buffer/issues/219
var hexSliceLookupTable = (function () {
  var alphabet = '0123456789abcdef'
  var table = new Array(256)
  for (var i = 0; i < 16; ++i) {
    var i16 = i * 16
    for (var j = 0; j < 16; ++j) {
      table[i16 + j] = alphabet[i] + alphabet[j]
    }
  }
  return table
})()


/***/ }),

/***/ 4184:
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
/* global define */

(function () {
	'use strict';

	var hasOwn = {}.hasOwnProperty;

	function classNames () {
		var classes = [];

		for (var i = 0; i < arguments.length; i++) {
			var arg = arguments[i];
			if (!arg) continue;

			var argType = typeof arg;

			if (argType === 'string' || argType === 'number') {
				classes.push(arg);
			} else if (Array.isArray(arg) && arg.length) {
				var inner = classNames.apply(null, arg);
				if (inner) {
					classes.push(inner);
				}
			} else if (argType === 'object') {
				for (var key in arg) {
					if (hasOwn.call(arg, key) && arg[key]) {
						classes.push(key);
					}
				}
			}
		}

		return classes.join(' ');
	}

	if ( true && module.exports) {
		classNames.default = classNames;
		module.exports = classNames;
	} else if (true) {
		// register as 'classnames', consistent with npm package name
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return classNames;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else {}
}());


/***/ }),

/***/ 7187:
/***/ ((module) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ 8679:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var reactIs = __webpack_require__(9864);

/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
var REACT_STATICS = {
  childContextTypes: true,
  contextType: true,
  contextTypes: true,
  defaultProps: true,
  displayName: true,
  getDefaultProps: true,
  getDerivedStateFromError: true,
  getDerivedStateFromProps: true,
  mixins: true,
  propTypes: true,
  type: true
};
var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};
var FORWARD_REF_STATICS = {
  '$$typeof': true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  '$$typeof': true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;

function getStatics(component) {
  // React v16.11 and below
  if (reactIs.isMemo(component)) {
    return MEMO_STATICS;
  } // React v16.12 and above


  return TYPE_STATICS[component['$$typeof']] || REACT_STATICS;
}

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = Object.prototype;
function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
  if (typeof sourceComponent !== 'string') {
    // don't hoist over string (html) components
    if (objectPrototype) {
      var inheritedComponent = getPrototypeOf(sourceComponent);

      if (inheritedComponent && inheritedComponent !== objectPrototype) {
        hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
      }
    }

    var keys = getOwnPropertyNames(sourceComponent);

    if (getOwnPropertySymbols) {
      keys = keys.concat(getOwnPropertySymbols(sourceComponent));
    }

    var targetStatics = getStatics(targetComponent);
    var sourceStatics = getStatics(sourceComponent);

    for (var i = 0; i < keys.length; ++i) {
      var key = keys[i];

      if (!KNOWN_STATICS[key] && !(blacklist && blacklist[key]) && !(sourceStatics && sourceStatics[key]) && !(targetStatics && targetStatics[key])) {
        var descriptor = getOwnPropertyDescriptor(sourceComponent, key);

        try {
          // Avoid failures from read-only properties
          defineProperty(targetComponent, key, descriptor);
        } catch (e) {}
      }
    }
  }

  return targetComponent;
}

module.exports = hoistNonReactStatics;


/***/ }),

/***/ 645:
/***/ ((__unused_webpack_module, exports) => {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ 5717:
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
          value: ctor,
          enumerable: false,
          writable: true,
          configurable: true
        }
      })
    }
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    if (superCtor) {
      ctor.super_ = superCtor
      var TempCtor = function () {}
      TempCtor.prototype = superCtor.prototype
      ctor.prototype = new TempCtor()
      ctor.prototype.constructor = ctor
    }
  }
}


/***/ }),

/***/ 7418:
/***/ ((module) => {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ 5523:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


var util = __webpack_require__(9539);

var tokenize = function(/*String*/ str, /*RegExp*/ re, /*Function?*/ parseDelim, /*Object?*/ instance){
  // summary:
  //    Split a string by a regular expression with the ability to capture the delimeters
  // parseDelim:
  //    Each group (excluding the 0 group) is passed as a parameter. If the function returns
  //    a value, it's added to the list of tokens.
  // instance:
  //    Used as the "this' instance when calling parseDelim
  var tokens = [];
  var match, content, lastIndex = 0;
  while((match = re.exec(str))){
    content = str.slice(lastIndex, re.lastIndex - match[0].length);
    if(content.length){
      tokens.push(content);
    }
    if(parseDelim){
      var parsed = parseDelim.apply(instance, match.slice(1).concat(tokens.length));
      if(typeof parsed != 'undefined'){
        if(parsed.specifier === '%'){
          tokens.push('%');
        }else{
          tokens.push(parsed);
        }
      }
    }
    lastIndex = re.lastIndex;
  }
  content = str.slice(lastIndex);
  if(content.length){
    tokens.push(content);
  }
  return tokens;
};

var Formatter = function(/*String*/ format){
  this._mapped = false;
  this._format = format;
  this._tokens = tokenize(format, this._re, this._parseDelim, this);
};

// The old regexp `/\%(?:\(([\w_.]+)\)|([1-9]\d*)\$)?([0 +\-\#]*)(\*|\d+)?(\.)?(\*|\d+)?[hlL]?([\%bscdeEfFgGioOuxX])/` has a cubic worst-case time complexity behavior due to overlapping capture groups `([0 +\-\#]*)(\*|\d+)?(\.)?(\*|\d+)?`. And a pump string of 0 can be consumed by `([0 +\-\#]*), (\*|\d+)?, or (\*|\d+)?`.
// The solution replace the sub-regexp (\*|\d+)?(\.)?(\*|\d+)? with the sub-regexp `(\*|\d+)?(?:(\.)(\*|\d+)?)?`, see the figure in [#32](https://github.com/adaltas/node-printf/pull/32)
// There are also performance improvement, see in [#31](https://github.com/adaltas/node-printf/issues/31#issuecomment-776731490)
Formatter.prototype._re = /\%(?:\(([\w_.]+)\)|([1-9]\d*)\$)?([0 +\-\#]*)(\*|\d+)?(?:(\.)(\*|\d+)?)?[hlL]?([\%bscdeEfFgGioOuxX])/g;
Formatter.prototype._parseDelim = function(mapping, intmapping, flags, minWidth, period, precision, specifier){
  if(mapping){
    this._mapped = true;
  }
  return {
    mapping: mapping,
    intmapping: intmapping,
    flags: flags,
    _minWidth: minWidth, // May be dependent on parameters
    period: period,
    _precision: precision, // May be dependent on parameters
    specifier: specifier
  };
};
Formatter.prototype._specifiers = {
  b: {
    base: 2,
    isInt: true
  },
  o: {
    base: 8,
    isInt: true
  },
  x: {
    base: 16,
    isInt: true
  },
  X: {
    extend: ['x'],
    toUpper: true
  },
  d: {
    base: 10,
    isInt: true
  },
  i: {
    extend: ['d']
  },
  u: {
    extend: ['d'],
    isUnsigned: true
  },
  c: {
    setArg: function(token){
      if(!isNaN(token.arg)){
        var num = parseInt(token.arg);
        if(num < 0 || num > 127){
          throw new Error('invalid character code passed to %c in printf');
        }
        token.arg = isNaN(num) ? '' + num : String.fromCharCode(num);
      }
    }
  },
  s: {
    setMaxWidth: function(token){
      token.maxWidth = (token.period == '.') ? token.precision : -1;
    }
  },
  e: {
    isDouble: true,
    doubleNotation: 'e'
  },
  E: {
    extend: ['e'],
    toUpper: true
  },
  f: {
    isDouble: true,
    doubleNotation: 'f'
  },
  F: {
    extend: ['f']
  },
  g: {
    isDouble: true,
    doubleNotation: 'g'
  },
  G: {
    extend: ['g'],
    toUpper: true
  },
  O: {
    isObject: true
  }
};
Formatter.prototype.format = function(/*mixed...*/ filler){
  if(this._mapped && typeof filler != 'object'){
    throw new Error('format requires a mapping');
  }

  var str = '';
  var position = 0;
  for(var i = 0, token; i < this._tokens.length; i++){
    token = this._tokens[i];

    if(typeof token == 'string'){
      str += token;
    }else{
      if(this._mapped){
        // Identify value of property defined in `token.mapping`
        var tokens = token.mapping.split('.');
        var value = filler;
        for (var j = 0, c = tokens.length; j < c; j++) {
          value = value[tokens[j]];
          if (typeof value === 'undefined') {
            break
          }
        }
        if(typeof value == 'undefined'){
          throw new Error('missing key \'' + token.mapping + '\'');
        }
        token.arg = value;
      }else{
        if(token.intmapping){
          position = parseInt(token.intmapping) - 1;
        }
        if(position >= arguments.length){
          throw new Error('got ' + arguments.length + ' printf arguments, insufficient for \'' + this._format + '\'');
        }
        token.arg = arguments[position++];
      }

      if(!token.compiled){
        token.compiled = true;
        token.sign = '';
        token.zeroPad = false;
        token.rightJustify = false;
        token.alternative = false;

        var flags = {};
        for(var fi = token.flags.length; fi--;){
          var flag = token.flags.charAt(fi);
          flags[flag] = true;
          switch(flag){
            case ' ':
              token.sign = ' ';
              break;
            case '+':
              token.sign = '+';
              break;
            case '0':
              token.zeroPad = (flags['-']) ? false : true;
              break;
            case '-':
              token.rightJustify = true;
              token.zeroPad = false;
              break;
            case '#':
              token.alternative = true;
              break;
            default:
              throw Error('bad formatting flag \'' + token.flags.charAt(fi) + '\'');
          }
        }

        token.minWidth = (token._minWidth) ? parseInt(token._minWidth) : 0;
        token.maxWidth = -1;
        token.toUpper = false;
        token.isUnsigned = false;
        token.isInt = false;
        token.isDouble = false;
        token.isObject = false;
        token.precision = 1;
        if(token.period == '.'){
          if(token._precision){
            token.precision = parseInt(token._precision);
          }else{
            token.precision = 0;
          }
        }

        var mixins = this._specifiers[token.specifier];
        if(typeof mixins == 'undefined'){
          throw new Error('unexpected specifier \'' + token.specifier + '\'');
        }
        if(mixins.extend){
          var s = this._specifiers[mixins.extend];
          for(var k in s){
            mixins[k] = s[k];
          }
          delete mixins.extend;
        }
        for(var l in mixins){
          token[l] = mixins[l];
        }
      }

      if(typeof token.setArg == 'function'){
        token.setArg(token);
      }

      if(typeof token.setMaxWidth == 'function'){
        token.setMaxWidth(token);
      }

      if(token._minWidth == '*'){
        if(this._mapped){
          throw new Error('* width not supported in mapped formats');
        }
        token.minWidth = parseInt(arguments[position++]);
        if(isNaN(token.minWidth)){
          throw new Error('the argument for * width at position ' + position + ' is not a number in ' + this._format);
        }
        // negative width means rightJustify
        if (token.minWidth < 0) {
          token.rightJustify = true;
          token.minWidth = -token.minWidth;
        }
      }

      if(token._precision == '*' && token.period == '.'){
        if(this._mapped){
          throw new Error('* precision not supported in mapped formats');
        }
        token.precision = parseInt(arguments[position++]);
        if(isNaN(token.precision)){
          throw Error('the argument for * precision at position ' + position + ' is not a number in ' + this._format);
        }
        // negative precision means unspecified
        if (token.precision < 0) {
          token.precision = 1;
          token.period = '';
        }
      }
      if(token.isInt){
        // a specified precision means no zero padding
        if(token.period == '.'){
          token.zeroPad = false;
        }
        this.formatInt(token);
      }else if(token.isDouble){
        if(token.period != '.'){
          token.precision = 6;
        }
        this.formatDouble(token);
      }else if(token.isObject){
        this.formatObject(token);
      }
      this.fitField(token);
      str += '' + token.arg;
    }
  }

  return str;
};
Formatter.prototype._zeros10 = '0000000000';
Formatter.prototype._spaces10 = '          ';
Formatter.prototype.formatInt = function(token) {
  var i = parseInt(token.arg);
  if(!isFinite(i)){ // isNaN(f) || f == Number.POSITIVE_INFINITY || f == Number.NEGATIVE_INFINITY)
    // allow this only if arg is number
    if(typeof token.arg != 'number'){
      throw new Error('format argument \'' + token.arg + '\' not an integer; parseInt returned ' + i);
    }
    //return '' + i;
    i = 0;
  }

  // if not base 10, make negatives be positive
  // otherwise, (-10).toString(16) is '-a' instead of 'fffffff6'
  if(i < 0 && (token.isUnsigned || token.base != 10)){
    i = 0xffffffff + i + 1;
  }

  if(i < 0){
    token.arg = (- i).toString(token.base);
    this.zeroPad(token);
    token.arg = '-' + token.arg;
  }else{
    token.arg = i.toString(token.base);
    // need to make sure that argument 0 with precision==0 is formatted as ''
    if(!i && !token.precision){
      token.arg = '';
    }else{
      this.zeroPad(token);
    }
    if(token.sign){
      token.arg = token.sign + token.arg;
    }
  }
  if(token.base == 16){
    if(token.alternative){
      token.arg = '0x' + token.arg;
    }
    token.arg = token.toUpper ? token.arg.toUpperCase() : token.arg.toLowerCase();
  }
  if(token.base == 8){
    if(token.alternative && token.arg.charAt(0) != '0'){
      token.arg = '0' + token.arg;
    }
  }
};
Formatter.prototype.formatDouble = function(token) {
  var f = parseFloat(token.arg);
  if(!isFinite(f)){ // isNaN(f) || f == Number.POSITIVE_INFINITY || f == Number.NEGATIVE_INFINITY)
    // allow this only if arg is number
    if(typeof token.arg != 'number'){
      throw new Error('format argument \'' + token.arg + '\' not a float; parseFloat returned ' + f);
    }
    // C99 says that for 'f':
    //   infinity -> '[-]inf' or '[-]infinity' ('[-]INF' or '[-]INFINITY' for 'F')
    //   NaN -> a string  starting with 'nan' ('NAN' for 'F')
    // this is not commonly implemented though.
    //return '' + f;
    f = 0;
  }

  switch(token.doubleNotation) {
    case 'e': {
      token.arg = f.toExponential(token.precision);
      break;
    }
    case 'f': {
      token.arg = f.toFixed(token.precision);
      break;
    }
    case 'g': {
      // C says use 'e' notation if exponent is < -4 or is >= prec
      // ECMAScript for toPrecision says use exponential notation if exponent is >= prec,
      // though step 17 of toPrecision indicates a test for < -6 to force exponential.
      if(Math.abs(f) < 0.0001){
        //print('forcing exponential notation for f=' + f);
        token.arg = f.toExponential(token.precision > 0 ? token.precision - 1 : token.precision);
      }else{
        token.arg = f.toPrecision(token.precision);
      }

      // In C, unlike 'f', 'gG' removes trailing 0s from fractional part, unless alternative format flag ('#').
      // But ECMAScript formats toPrecision as 0.00100000. So remove trailing 0s.
      if(!token.alternative){
        //print('replacing trailing 0 in \'' + s + '\'');
        token.arg = token.arg.replace(/(\..*[^0])0*e/, '$1e');
        // if fractional part is entirely 0, remove it and decimal point
        token.arg = token.arg.replace(/\.0*e/, 'e').replace(/\.0$/,'');
      }
      break;
    }
    default: throw new Error('unexpected double notation \'' + token.doubleNotation + '\'');
  }

  // C says that exponent must have at least two digits.
  // But ECMAScript does not; toExponential results in things like '1.000000e-8' and '1.000000e+8'.
  // Note that s.replace(/e([\+\-])(\d)/, 'e$10$2') won't work because of the '$10' instead of '$1'.
  // And replace(re, func) isn't supported on IE50 or Safari1.
  token.arg = token.arg.replace(/e\+(\d)$/, 'e+0$1').replace(/e\-(\d)$/, 'e-0$1');

  // if alt, ensure a decimal point
  if(token.alternative){
    token.arg = token.arg.replace(/^(\d+)$/,'$1.');
    token.arg = token.arg.replace(/^(\d+)e/,'$1.e');
  }

  if(f >= 0 && token.sign){
    token.arg = token.sign + token.arg;
  }

  token.arg = token.toUpper ? token.arg.toUpperCase() : token.arg.toLowerCase();
};
Formatter.prototype.formatObject = function(token) {
  // If no precision is specified, then reset it to null (infinite depth).
  var precision = (token.period === '.') ? token.precision : null;
  // Historically, inspect was called with 3 options
  // token.arg = util.inspect(token.arg, !token.alternative, precision, token.sign);
  // Now using an object but not sure colors make any sense here
  token.arg = util.inspect(token.arg, {
    showHidden: !token.alternative,
    depth: precision,
    colors: token.sign,
    compact: true
  });
};
Formatter.prototype.zeroPad = function(token, /*Int*/ length) {
  length = (arguments.length == 2) ? length : token.precision;
  var negative = false;
  if(typeof token.arg != "string"){
    token.arg = "" + token.arg;
  }
  if (token.arg.substr(0,1) === '-') {
    negative = true;
    token.arg = token.arg.substr(1);
  }

  var tenless = length - 10;
  while(token.arg.length < tenless){
    token.arg = (token.rightJustify) ? token.arg + this._zeros10 : this._zeros10 + token.arg;
  }
  var pad = length - token.arg.length;
  token.arg = (token.rightJustify) ? token.arg + this._zeros10.substring(0, pad) : this._zeros10.substring(0, pad) + token.arg;
  if (negative) token.arg = '-' + token.arg;
};
Formatter.prototype.fitField = function(token) {
  if(token.maxWidth >= 0 && token.arg.length > token.maxWidth){
    token.arg = token.arg.substring(0, token.maxWidth);
  }
  if(token.zeroPad){
    this.zeroPad(token, token.minWidth);
    return;
  }
  this.spacePad(token);
};
Formatter.prototype.spacePad = function(token, /*Int*/ length) {
  length = (arguments.length == 2) ? length : token.minWidth;
  if(typeof token.arg != 'string'){
    token.arg = '' + token.arg;
  }
  var tenless = length - 10;
  while(token.arg.length < tenless){
    token.arg = (token.rightJustify) ? token.arg + this._spaces10 : this._spaces10 + token.arg;
  }
  var pad = length - token.arg.length;
  token.arg = (token.rightJustify) ? token.arg + this._spaces10.substring(0, pad) : this._spaces10.substring(0, pad) + token.arg;
};

module.exports = function(){
  var args = Array.prototype.slice.call(arguments),
    stream, format;
  if(args[0] instanceof (__webpack_require__(2830).Stream)){
    stream = args.shift();
  }
  format = args.shift();
  var formatter = new Formatter(format);
  var string = formatter.format.apply(formatter, args);
  if(stream){
    stream.write(string);
  }else{
    return string;
  }
};

module.exports.Formatter = Formatter;


/***/ }),

/***/ 2703:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = __webpack_require__(414);

function emptyFunction() {}
function emptyFunctionWithReset() {}
emptyFunctionWithReset.resetWarningCache = emptyFunction;

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    var err = new Error(
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
    err.name = 'Invariant Violation';
    throw err;
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    elementType: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim,

    checkPropTypes: emptyFunctionWithReset,
    resetWarningCache: emptyFunction
  };

  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),

/***/ 5697:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (false) { var throwOnDirectAccess, ReactIs; } else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(2703)();
}


/***/ }),

/***/ 414:
/***/ ((module) => {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),

/***/ 6224:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _isPlaceholder =
/*#__PURE__*/
__webpack_require__(6464);
/**
 * Optimized internal one-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry1(fn) {
  return function f1(a) {
    if (arguments.length === 0 || _isPlaceholder(a)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}

module.exports = _curry1;

/***/ }),

/***/ 9002:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry1 =
/*#__PURE__*/
__webpack_require__(6224);

var _isPlaceholder =
/*#__PURE__*/
__webpack_require__(6464);
/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */


function _curry2(fn) {
  return function f2(a, b) {
    switch (arguments.length) {
      case 0:
        return f2;

      case 1:
        return _isPlaceholder(a) ? f2 : _curry1(function (_b) {
          return fn(a, _b);
        });

      default:
        return _isPlaceholder(a) && _isPlaceholder(b) ? f2 : _isPlaceholder(a) ? _curry1(function (_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function (_b) {
          return fn(a, _b);
        }) : fn(a, b);
    }
  };
}

module.exports = _curry2;

/***/ }),

/***/ 6464:
/***/ ((module) => {

function _isPlaceholder(a) {
  return a != null && typeof a === 'object' && a['@@functional/placeholder'] === true;
}

module.exports = _isPlaceholder;

/***/ }),

/***/ 2250:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var _curry2 =
/*#__PURE__*/
__webpack_require__(9002);
/**
 * Calls an input function `n` times, returning an array containing the results
 * of those function calls.
 *
 * `fn` is passed one argument: The current value of `n`, which begins at `0`
 * and is gradually incremented to `n - 1`.
 *
 * @func
 * @memberOf R
 * @since v0.2.3
 * @category List
 * @sig (Number -> a) -> Number -> [a]
 * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
 * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
 * @return {Array} An array containing the return values of all calls to `fn`.
 * @see R.repeat
 * @example
 *
 *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
 * @symb R.times(f, 0) = []
 * @symb R.times(f, 1) = [f(0)]
 * @symb R.times(f, 2) = [f(0), f(1)]
 */


var times =
/*#__PURE__*/
_curry2(function times(fn, n) {
  var len = Number(n);
  var idx = 0;
  var list;

  if (len < 0 || isNaN(len)) {
    throw new RangeError('n must be a non-negative number');
  }

  list = new Array(len);

  while (idx < len) {
    list[idx] = fn(idx);
    idx += 1;
  }

  return list;
});

module.exports = times;

/***/ }),

/***/ 9921:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var b="function"===typeof Symbol&&Symbol.for,c=b?Symbol.for("react.element"):60103,d=b?Symbol.for("react.portal"):60106,e=b?Symbol.for("react.fragment"):60107,f=b?Symbol.for("react.strict_mode"):60108,g=b?Symbol.for("react.profiler"):60114,h=b?Symbol.for("react.provider"):60109,k=b?Symbol.for("react.context"):60110,l=b?Symbol.for("react.async_mode"):60111,m=b?Symbol.for("react.concurrent_mode"):60111,n=b?Symbol.for("react.forward_ref"):60112,p=b?Symbol.for("react.suspense"):60113,q=b?
Symbol.for("react.suspense_list"):60120,r=b?Symbol.for("react.memo"):60115,t=b?Symbol.for("react.lazy"):60116,v=b?Symbol.for("react.block"):60121,w=b?Symbol.for("react.fundamental"):60117,x=b?Symbol.for("react.responder"):60118,y=b?Symbol.for("react.scope"):60119;
function z(a){if("object"===typeof a&&null!==a){var u=a.$$typeof;switch(u){case c:switch(a=a.type,a){case l:case m:case e:case g:case f:case p:return a;default:switch(a=a&&a.$$typeof,a){case k:case n:case t:case r:case h:return a;default:return u}}case d:return u}}}function A(a){return z(a)===m}exports.AsyncMode=l;exports.ConcurrentMode=m;exports.ContextConsumer=k;exports.ContextProvider=h;exports.Element=c;exports.ForwardRef=n;exports.Fragment=e;exports.Lazy=t;exports.Memo=r;exports.Portal=d;
exports.Profiler=g;exports.StrictMode=f;exports.Suspense=p;exports.isAsyncMode=function(a){return A(a)||z(a)===l};exports.isConcurrentMode=A;exports.isContextConsumer=function(a){return z(a)===k};exports.isContextProvider=function(a){return z(a)===h};exports.isElement=function(a){return"object"===typeof a&&null!==a&&a.$$typeof===c};exports.isForwardRef=function(a){return z(a)===n};exports.isFragment=function(a){return z(a)===e};exports.isLazy=function(a){return z(a)===t};
exports.isMemo=function(a){return z(a)===r};exports.isPortal=function(a){return z(a)===d};exports.isProfiler=function(a){return z(a)===g};exports.isStrictMode=function(a){return z(a)===f};exports.isSuspense=function(a){return z(a)===p};
exports.isValidElementType=function(a){return"string"===typeof a||"function"===typeof a||a===e||a===m||a===g||a===f||a===p||a===q||"object"===typeof a&&null!==a&&(a.$$typeof===t||a.$$typeof===r||a.$$typeof===h||a.$$typeof===k||a.$$typeof===n||a.$$typeof===w||a.$$typeof===x||a.$$typeof===y||a.$$typeof===v)};exports.typeOf=z;


/***/ }),

/***/ 9864:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(9921);
} else {}


/***/ }),

/***/ 7287:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/** @license React v0.24.0
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = function $$$reconciler($$$hostConfig) {
'use strict';var aa=__webpack_require__(7418),ba=__webpack_require__(7294),m=__webpack_require__(373);function n(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var q=ba.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
q.hasOwnProperty("ReactCurrentDispatcher")||(q.ReactCurrentDispatcher={current:null});q.hasOwnProperty("ReactCurrentBatchConfig")||(q.ReactCurrentBatchConfig={suspense:null});
var u="function"===typeof Symbol&&Symbol.for,ca=u?Symbol.for("react.element"):60103,da=u?Symbol.for("react.portal"):60106,ea=u?Symbol.for("react.fragment"):60107,fa=u?Symbol.for("react.strict_mode"):60108,ha=u?Symbol.for("react.profiler"):60114,ia=u?Symbol.for("react.provider"):60109,ja=u?Symbol.for("react.context"):60110,ka=u?Symbol.for("react.concurrent_mode"):60111,la=u?Symbol.for("react.forward_ref"):60112,ma=u?Symbol.for("react.suspense"):60113,na=u?Symbol.for("react.suspense_list"):60120,oa=
u?Symbol.for("react.memo"):60115,pa=u?Symbol.for("react.lazy"):60116;u&&Symbol.for("react.fundamental");u&&Symbol.for("react.responder");u&&Symbol.for("react.scope");var qa="function"===typeof Symbol&&Symbol.iterator;function ra(a){if(null===a||"object"!==typeof a)return null;a=qa&&a[qa]||a["@@iterator"];return"function"===typeof a?a:null}
function sa(a){if(-1===a._status){a._status=0;var b=a._ctor;b=b();a._result=b;b.then(function(b){0===a._status&&(b=b.default,a._status=1,a._result=b)},function(b){0===a._status&&(a._status=2,a._result=b)})}}
function ta(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ea:return"Fragment";case da:return"Portal";case ha:return"Profiler";case fa:return"StrictMode";case ma:return"Suspense";case na:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case ja:return"Context.Consumer";case ia:return"Context.Provider";case la:var b=a.render;b=b.displayName||b.name||"";return a.displayName||(""!==b?"ForwardRef("+b+")":
"ForwardRef");case oa:return ta(a.type);case pa:if(a=1===a._status?a._result:null)return ta(a)}return null}function ua(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.effectTag&1026)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function va(a){if(ua(a)!==a)throw Error(n(188));}
function wa(a){var b=a.alternate;if(!b){b=ua(a);if(null===b)throw Error(n(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return va(e),a;if(f===d)return va(e),b;f=f.sibling}throw Error(n(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,l=e.child;l;){if(l===c){g=!0;c=e;d=f;break}if(l===d){g=!0;d=e;c=f;break}l=l.sibling}if(!g){for(l=f.child;l;){if(l===
c){g=!0;c=f;d=e;break}if(l===d){g=!0;d=f;c=e;break}l=l.sibling}if(!g)throw Error(n(189));}}if(c.alternate!==d)throw Error(n(190));}if(3!==c.tag)throw Error(n(188));return c.stateNode.current===c?a:b}function xa(a){a=wa(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}
function ya(a){a=wa(a);if(!a)return null;for(var b=a;;){if(5===b.tag||6===b.tag)return b;if(b.child&&4!==b.tag)b.child.return=b,b=b.child;else{if(b===a)break;for(;!b.sibling;){if(!b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}}return null}
var za=$$$hostConfig.getPublicInstance,Aa=$$$hostConfig.getRootHostContext,Ba=$$$hostConfig.getChildHostContext,Ca=$$$hostConfig.prepareForCommit,Da=$$$hostConfig.resetAfterCommit,Ea=$$$hostConfig.createInstance,Fa=$$$hostConfig.appendInitialChild,Ga=$$$hostConfig.finalizeInitialChildren,Ia=$$$hostConfig.prepareUpdate,Ja=$$$hostConfig.shouldSetTextContent,Ka=$$$hostConfig.shouldDeprioritizeSubtree,La=$$$hostConfig.createTextInstance,Ma=$$$hostConfig.setTimeout,Na=$$$hostConfig.clearTimeout,Oa=$$$hostConfig.noTimeout,
Pa=$$$hostConfig.isPrimaryRenderer,Qa=$$$hostConfig.supportsMutation,Ra=$$$hostConfig.supportsPersistence,Sa=$$$hostConfig.supportsHydration,Ta=$$$hostConfig.appendChild,Ua=$$$hostConfig.appendChildToContainer,Va=$$$hostConfig.commitTextUpdate,Wa=$$$hostConfig.commitMount,Xa=$$$hostConfig.commitUpdate,Ya=$$$hostConfig.insertBefore,Za=$$$hostConfig.insertInContainerBefore,$a=$$$hostConfig.removeChild,ab=$$$hostConfig.removeChildFromContainer,bb=$$$hostConfig.resetTextContent,cb=$$$hostConfig.hideInstance,
db=$$$hostConfig.hideTextInstance,eb=$$$hostConfig.unhideInstance,fb=$$$hostConfig.unhideTextInstance,gb=$$$hostConfig.cloneInstance,hb=$$$hostConfig.createContainerChildSet,ib=$$$hostConfig.appendChildToContainerChildSet,kb=$$$hostConfig.finalizeContainerChildren,lb=$$$hostConfig.replaceContainerChildren,mb=$$$hostConfig.cloneHiddenInstance,nb=$$$hostConfig.cloneHiddenTextInstance,ob=$$$hostConfig.canHydrateInstance,pb=$$$hostConfig.canHydrateTextInstance,qb=$$$hostConfig.isSuspenseInstancePending,
rb=$$$hostConfig.isSuspenseInstanceFallback,sb=$$$hostConfig.getNextHydratableSibling,tb=$$$hostConfig.getFirstHydratableChild,ub=$$$hostConfig.hydrateInstance,vb=$$$hostConfig.hydrateTextInstance,wb=$$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance,xb=$$$hostConfig.commitHydratedContainer,yb=$$$hostConfig.commitHydratedSuspenseInstance,zb=/^(.*)[\\\/]/;
function Ab(a){var b="";do{a:switch(a.tag){case 3:case 4:case 6:case 7:case 10:case 9:var c="";break a;default:var d=a._debugOwner,e=a._debugSource,f=ta(a.type);c=null;d&&(c=ta(d.type));d=f;f="";e?f=" (at "+e.fileName.replace(zb,"")+":"+e.lineNumber+")":c&&(f=" (created by "+c+")");c="\n    in "+(d||"Unknown")+f}b+=c;a=a.return}while(a);return b}new Set;var Bb=[],Cb=-1;function y(a){0>Cb||(a.current=Bb[Cb],Bb[Cb]=null,Cb--)}function z(a,b){Cb++;Bb[Cb]=a.current;a.current=b}
var Db={},A={current:Db},B={current:!1},Eb=Db;function Fb(a,b){var c=a.type.contextTypes;if(!c)return Db;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}function C(a){a=a.childContextTypes;return null!==a&&void 0!==a}function Gb(a){y(B,a);y(A,a)}
function Hb(a){y(B,a);y(A,a)}function Ib(a,b,c){if(A.current!==Db)throw Error(n(168));z(A,b,a);z(B,c,a)}function Jb(a,b,c){var d=a.stateNode;a=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in a))throw Error(n(108,ta(b)||"Unknown",e));return aa({},c,{},d)}function Kb(a){var b=a.stateNode;b=b&&b.__reactInternalMemoizedMergedChildContext||Db;Eb=A.current;z(A,b,a);z(B,B.current,a);return!0}
function Lb(a,b,c){var d=a.stateNode;if(!d)throw Error(n(169));c?(b=Jb(a,b,Eb),d.__reactInternalMemoizedMergedChildContext=b,y(B,a),y(A,a),z(A,b,a)):y(B,a);z(B,c,a)}
var Mb=m.unstable_runWithPriority,Nb=m.unstable_scheduleCallback,Ob=m.unstable_cancelCallback,Pb=m.unstable_shouldYield,Qb=m.unstable_requestPaint,Rb=m.unstable_now,Ub=m.unstable_getCurrentPriorityLevel,Vb=m.unstable_ImmediatePriority,Wb=m.unstable_UserBlockingPriority,Xb=m.unstable_NormalPriority,Yb=m.unstable_LowPriority,Zb=m.unstable_IdlePriority,$b={},ac=void 0!==Qb?Qb:function(){},bc=null,cc=null,dc=!1,ec=Rb(),E=1E4>ec?Rb:function(){return Rb()-ec};
function fc(){switch(Ub()){case Vb:return 99;case Wb:return 98;case Xb:return 97;case Yb:return 96;case Zb:return 95;default:throw Error(n(332));}}function gc(a){switch(a){case 99:return Vb;case 98:return Wb;case 97:return Xb;case 96:return Yb;case 95:return Zb;default:throw Error(n(332));}}function hc(a,b){a=gc(a);return Mb(a,b)}function ic(a,b,c){a=gc(a);return Nb(a,b,c)}function jc(a){null===bc?(bc=[a],cc=Nb(Vb,kc)):bc.push(a);return $b}function F(){if(null!==cc){var a=cc;cc=null;Ob(a)}kc()}
function kc(){if(!dc&&null!==bc){dc=!0;var a=0;try{var b=bc;hc(99,function(){for(;a<b.length;a++){var c=b[a];do c=c(!0);while(null!==c)}});bc=null}catch(c){throw null!==bc&&(bc=bc.slice(a+1)),Nb(Vb,F),c;}finally{dc=!1}}}var lc=3;function mc(a,b,c){c/=10;return 1073741821-(((1073741821-a+b/10)/c|0)+1)*c}function nc(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var oc="function"===typeof Object.is?Object.is:nc,pc=Object.prototype.hasOwnProperty;
function qc(a,b){if(oc(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++)if(!pc.call(b,c[d])||!oc(a[c[d]],b[c[d]]))return!1;return!0}function rc(a,b){if(a&&a.defaultProps){b=aa({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c])}return b}var sc={current:null},tc=null,uc=null,vc=null;function wc(){vc=uc=tc=null}
function xc(a,b){var c=a.type._context;Pa?(z(sc,c._currentValue,a),c._currentValue=b):(z(sc,c._currentValue2,a),c._currentValue2=b)}function yc(a){var b=sc.current;y(sc,a);a=a.type._context;Pa?a._currentValue=b:a._currentValue2=b}function zc(a,b){for(;null!==a;){var c=a.alternate;if(a.childExpirationTime<b)a.childExpirationTime=b,null!==c&&c.childExpirationTime<b&&(c.childExpirationTime=b);else if(null!==c&&c.childExpirationTime<b)c.childExpirationTime=b;else break;a=a.return}}
function Ac(a,b){tc=a;vc=uc=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(a.expirationTime>=b&&(Bc=!0),a.firstContext=null)}function Cc(a,b){if(vc!==a&&!1!==b&&0!==b){if("number"!==typeof b||1073741823===b)vc=a,b=1073741823;b={context:a,observedBits:b,next:null};if(null===uc){if(null===tc)throw Error(n(308));uc=b;tc.dependencies={expirationTime:0,firstContext:b,responders:null}}else uc=uc.next=b}return Pa?a._currentValue:a._currentValue2}var Dc=!1;
function Ec(a){return{baseState:a,firstUpdate:null,lastUpdate:null,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}function Fc(a){return{baseState:a.baseState,firstUpdate:a.firstUpdate,lastUpdate:a.lastUpdate,firstCapturedUpdate:null,lastCapturedUpdate:null,firstEffect:null,lastEffect:null,firstCapturedEffect:null,lastCapturedEffect:null}}
function Gc(a,b){return{expirationTime:a,suspenseConfig:b,tag:0,payload:null,callback:null,next:null,nextEffect:null}}function Hc(a,b){null===a.lastUpdate?a.firstUpdate=a.lastUpdate=b:(a.lastUpdate.next=b,a.lastUpdate=b)}
function Ic(a,b){var c=a.alternate;if(null===c){var d=a.updateQueue;var e=null;null===d&&(d=a.updateQueue=Ec(a.memoizedState))}else d=a.updateQueue,e=c.updateQueue,null===d?null===e?(d=a.updateQueue=Ec(a.memoizedState),e=c.updateQueue=Ec(c.memoizedState)):d=a.updateQueue=Fc(e):null===e&&(e=c.updateQueue=Fc(d));null===e||d===e?Hc(d,b):null===d.lastUpdate||null===e.lastUpdate?(Hc(d,b),Hc(e,b)):(Hc(d,b),e.lastUpdate=b)}
function Jc(a,b){var c=a.updateQueue;c=null===c?a.updateQueue=Ec(a.memoizedState):Kc(a,c);null===c.lastCapturedUpdate?c.firstCapturedUpdate=c.lastCapturedUpdate=b:(c.lastCapturedUpdate.next=b,c.lastCapturedUpdate=b)}function Kc(a,b){var c=a.alternate;null!==c&&b===c.updateQueue&&(b=a.updateQueue=Fc(b));return b}
function Lc(a,b,c,d,e,f){switch(c.tag){case 1:return a=c.payload,"function"===typeof a?a.call(f,d,e):a;case 3:a.effectTag=a.effectTag&-4097|64;case 0:a=c.payload;e="function"===typeof a?a.call(f,d,e):a;if(null===e||void 0===e)break;return aa({},d,e);case 2:Dc=!0}return d}
function Nc(a,b,c,d,e){Dc=!1;b=Kc(a,b);for(var f=b.baseState,g=null,l=0,h=b.firstUpdate,k=f;null!==h;){var p=h.expirationTime;p<e?(null===g&&(g=h,f=k),l<p&&(l=p)):(Oc(p,h.suspenseConfig),k=Lc(a,b,h,k,c,d),null!==h.callback&&(a.effectTag|=32,h.nextEffect=null,null===b.lastEffect?b.firstEffect=b.lastEffect=h:(b.lastEffect.nextEffect=h,b.lastEffect=h)));h=h.next}p=null;for(h=b.firstCapturedUpdate;null!==h;){var D=h.expirationTime;D<e?(null===p&&(p=h,null===g&&(f=k)),l<D&&(l=D)):(k=Lc(a,b,h,k,c,d),null!==
h.callback&&(a.effectTag|=32,h.nextEffect=null,null===b.lastCapturedEffect?b.firstCapturedEffect=b.lastCapturedEffect=h:(b.lastCapturedEffect.nextEffect=h,b.lastCapturedEffect=h)));h=h.next}null===g&&(b.lastUpdate=null);null===p?b.lastCapturedUpdate=null:a.effectTag|=32;null===g&&null===p&&(f=k);b.baseState=f;b.firstUpdate=g;b.firstCapturedUpdate=p;Pc(l);a.expirationTime=l;a.memoizedState=k}
function Qc(a,b,c){null!==b.firstCapturedUpdate&&(null!==b.lastUpdate&&(b.lastUpdate.next=b.firstCapturedUpdate,b.lastUpdate=b.lastCapturedUpdate),b.firstCapturedUpdate=b.lastCapturedUpdate=null);Rc(b.firstEffect,c);b.firstEffect=b.lastEffect=null;Rc(b.firstCapturedEffect,c);b.firstCapturedEffect=b.lastCapturedEffect=null}function Rc(a,b){for(;null!==a;){var c=a.callback;if(null!==c){a.callback=null;var d=b;if("function"!==typeof c)throw Error(n(191,c));c.call(d)}a=a.nextEffect}}
var Sc=q.ReactCurrentBatchConfig,Tc=(new ba.Component).refs;function Uc(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:aa({},b,c);a.memoizedState=c;d=a.updateQueue;null!==d&&0===a.expirationTime&&(d.baseState=c)}
var Xc={isMounted:function(a){return(a=a._reactInternalFiber)?ua(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternalFiber;var d=G(),e=Sc.suspense;d=Vc(d,a,e);e=Gc(d,e);e.payload=b;void 0!==c&&null!==c&&(e.callback=c);Ic(a,e);Wc(a,d)},enqueueReplaceState:function(a,b,c){a=a._reactInternalFiber;var d=G(),e=Sc.suspense;d=Vc(d,a,e);e=Gc(d,e);e.tag=1;e.payload=b;void 0!==c&&null!==c&&(e.callback=c);Ic(a,e);Wc(a,d)},enqueueForceUpdate:function(a,b){a=a._reactInternalFiber;var c=G(),d=Sc.suspense;
c=Vc(c,a,d);d=Gc(c,d);d.tag=2;void 0!==b&&null!==b&&(d.callback=b);Ic(a,d);Wc(a,c)}};function Yc(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!qc(c,d)||!qc(e,f):!0}
function Zc(a,b,c){var d=!1,e=Db;var f=b.contextType;"object"===typeof f&&null!==f?f=Cc(f):(e=C(b)?Eb:A.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?Fb(a,e):Db);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=Xc;a.stateNode=b;b._reactInternalFiber=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function $c(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&Xc.enqueueReplaceState(b,b.state,null)}
function ad(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=Tc;var f=b.contextType;"object"===typeof f&&null!==f?e.context=Cc(f):(f=C(b)?Eb:A.current,e.context=Fb(a,f));f=a.updateQueue;null!==f&&(Nc(a,f,c,e,d),e.state=a.memoizedState);f=b.getDerivedStateFromProps;"function"===typeof f&&(Uc(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==
typeof e.componentWillMount||(b=e.state,"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&Xc.enqueueReplaceState(e,e.state,null),f=a.updateQueue,null!==f&&(Nc(a,f,c,e,d),e.state=a.memoizedState));"function"===typeof e.componentDidMount&&(a.effectTag|=4)}var bd=Array.isArray;
function cd(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(n(309));var d=c.stateNode}if(!d)throw Error(n(147,a));var e=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===e)return b.ref;b=function(b){var a=d.refs;a===Tc&&(a=d.refs={});null===b?delete a[e]:a[e]=b};b._stringRef=e;return b}if("string"!==typeof a)throw Error(n(284));if(!c._owner)throw Error(n(290,a));}return a}
function dd(a,b){if("textarea"!==a.type)throw Error(n(31,"[object Object]"===Object.prototype.toString.call(b)?"object with keys {"+Object.keys(b).join(", ")+"}":b,""));}
function ed(a){function b(b,c){if(a){var d=b.lastEffect;null!==d?(d.nextEffect=c,b.lastEffect=c):b.firstEffect=b.lastEffect=c;c.nextEffect=null;c.effectTag=8}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(b,a){for(b=new Map;null!==a;)null!==a.key?b.set(a.key,a):b.set(a.index,a),a=a.sibling;return b}function e(b,a,c){b=fd(b,a,c);b.index=0;b.sibling=null;return b}function f(b,c,d){b.index=d;if(!a)return c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.effectTag=
2,c):d;b.effectTag=2;return c}function g(b){a&&null===b.alternate&&(b.effectTag=2);return b}function l(b,a,c,d){if(null===a||6!==a.tag)return a=gd(c,b.mode,d),a.return=b,a;a=e(a,c,d);a.return=b;return a}function h(b,a,c,d){if(null!==a&&a.elementType===c.type)return d=e(a,c.props,d),d.ref=cd(b,a,c),d.return=b,d;d=hd(c.type,c.key,c.props,null,b.mode,d);d.ref=cd(b,a,c);d.return=b;return d}function k(b,a,c,d){if(null===a||4!==a.tag||a.stateNode.containerInfo!==c.containerInfo||a.stateNode.implementation!==
c.implementation)return a=id(c,b.mode,d),a.return=b,a;a=e(a,c.children||[],d);a.return=b;return a}function p(b,a,c,d,f){if(null===a||7!==a.tag)return a=jd(c,b.mode,d,f),a.return=b,a;a=e(a,c,d);a.return=b;return a}function D(b,a,c){if("string"===typeof a||"number"===typeof a)return a=gd(""+a,b.mode,c),a.return=b,a;if("object"===typeof a&&null!==a){switch(a.$$typeof){case ca:return c=hd(a.type,a.key,a.props,null,b.mode,c),c.ref=cd(b,null,a),c.return=b,c;case da:return a=id(a,b.mode,c),a.return=b,a}if(bd(a)||
ra(a))return a=jd(a,b.mode,c,null),a.return=b,a;dd(b,a)}return null}function x(b,a,c,d){var e=null!==a?a.key:null;if("string"===typeof c||"number"===typeof c)return null!==e?null:l(b,a,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case ca:return c.key===e?c.type===ea?p(b,a,c.props.children,d,e):h(b,a,c,d):null;case da:return c.key===e?k(b,a,c,d):null}if(bd(c)||ra(c))return null!==e?null:p(b,a,c,d,null);dd(b,c)}return null}function K(b,a,c,d,e){if("string"===typeof d||"number"===typeof d)return b=
b.get(c)||null,l(a,b,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case ca:return b=b.get(null===d.key?c:d.key)||null,d.type===ea?p(a,b,d.props.children,e,d.key):h(a,b,d,e);case da:return b=b.get(null===d.key?c:d.key)||null,k(a,b,d,e)}if(bd(d)||ra(d))return b=b.get(c)||null,p(a,b,d,e,null);dd(a,d)}return null}function Ha(e,g,h,l){for(var k=null,w=null,t=g,r=g=0,p=null;null!==t&&r<h.length;r++){t.index>r?(p=t,t=null):p=t.sibling;var v=x(e,t,h[r],l);if(null===v){null===t&&(t=p);break}a&&
t&&null===v.alternate&&b(e,t);g=f(v,g,r);null===w?k=v:w.sibling=v;w=v;t=p}if(r===h.length)return c(e,t),k;if(null===t){for(;r<h.length;r++)t=D(e,h[r],l),null!==t&&(g=f(t,g,r),null===w?k=t:w.sibling=t,w=t);return k}for(t=d(e,t);r<h.length;r++)p=K(t,e,r,h[r],l),null!==p&&(a&&null!==p.alternate&&t.delete(null===p.key?r:p.key),g=f(p,g,r),null===w?k=p:w.sibling=p,w=p);a&&t.forEach(function(a){return b(e,a)});return k}function O(e,g,h,l){var k=ra(h);if("function"!==typeof k)throw Error(n(150));h=k.call(h);
if(null==h)throw Error(n(151));for(var t=k=null,r=g,w=g=0,p=null,v=h.next();null!==r&&!v.done;w++,v=h.next()){r.index>w?(p=r,r=null):p=r.sibling;var N=x(e,r,v.value,l);if(null===N){null===r&&(r=p);break}a&&r&&null===N.alternate&&b(e,r);g=f(N,g,w);null===t?k=N:t.sibling=N;t=N;r=p}if(v.done)return c(e,r),k;if(null===r){for(;!v.done;w++,v=h.next())v=D(e,v.value,l),null!==v&&(g=f(v,g,w),null===t?k=v:t.sibling=v,t=v);return k}for(r=d(e,r);!v.done;w++,v=h.next())v=K(r,e,w,v.value,l),null!==v&&(a&&null!==
v.alternate&&r.delete(null===v.key?w:v.key),g=f(v,g,w),null===t?k=v:t.sibling=v,t=v);a&&r.forEach(function(a){return b(e,a)});return k}return function(a,d,f,h){var k="object"===typeof f&&null!==f&&f.type===ea&&null===f.key;k&&(f=f.props.children);var l="object"===typeof f&&null!==f;if(l)switch(f.$$typeof){case ca:a:{l=f.key;for(k=d;null!==k;){if(k.key===l)if(7===k.tag?f.type===ea:k.elementType===f.type){c(a,k.sibling);d=e(k,f.type===ea?f.props.children:f.props,h);d.ref=cd(a,k,f);d.return=a;a=d;break a}else{c(a,
k);break}else b(a,k);k=k.sibling}f.type===ea?(d=jd(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=hd(f.type,f.key,f.props,null,a.mode,h),h.ref=cd(a,d,f),h.return=a,a=h)}return g(a);case da:a:{for(k=f.key;null!==d;){if(d.key===k)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[],h);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=id(f,a.mode,h);d.return=a;a=d}return g(a)}if("string"===
typeof f||"number"===typeof f)return f=""+f,null!==d&&6===d.tag?(c(a,d.sibling),d=e(d,f,h),d.return=a,a=d):(c(a,d),d=gd(f,a.mode,h),d.return=a,a=d),g(a);if(bd(f))return Ha(a,d,f,h);if(ra(f))return O(a,d,f,h);l&&dd(a,f);if("undefined"===typeof f&&!k)switch(a.tag){case 1:case 0:throw a=a.type,Error(n(152,a.displayName||a.name||"Component"));}return c(a,d)}}var kd=ed(!0),ld=ed(!1),md={},H={current:md},nd={current:md},od={current:md};function pd(a){if(a===md)throw Error(n(174));return a}
function qd(a,b){z(od,b,a);z(nd,a,a);z(H,md,a);b=Aa(b);y(H,a);z(H,b,a)}function rd(a){y(H,a);y(nd,a);y(od,a)}function sd(a){var b=pd(od.current),c=pd(H.current);b=Ba(c,a.type,b);c!==b&&(z(nd,a,a),z(H,b,a))}function td(a){nd.current===a&&(y(H,a),y(nd,a))}var I={current:0};
function ud(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||qb(c)||rb(c)))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.effectTag&64))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}function vd(a,b){return{responder:a,props:b}}
var wd=q.ReactCurrentDispatcher,J=q.ReactCurrentBatchConfig,xd=0,yd=null,L=null,zd=null,Ad=null,M=null,Bd=null,Cd=0,Dd=null,Ed=0,Fd=!1,Gd=null,Hd=0;function P(){throw Error(n(321));}function Id(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!oc(a[c],b[c]))return!1;return!0}
function Jd(a,b,c,d,e,f){xd=f;yd=b;zd=null!==a?a.memoizedState:null;wd.current=null===zd?Kd:Ld;b=c(d,e);if(Fd){do Fd=!1,Hd+=1,zd=null!==a?a.memoizedState:null,Bd=Ad,Dd=M=L=null,wd.current=Ld,b=c(d,e);while(Fd);Gd=null;Hd=0}wd.current=Md;a=yd;a.memoizedState=Ad;a.expirationTime=Cd;a.updateQueue=Dd;a.effectTag|=Ed;a=null!==L&&null!==L.next;xd=0;Bd=M=Ad=zd=L=yd=null;Cd=0;Dd=null;Ed=0;if(a)throw Error(n(300));return b}
function Nd(){wd.current=Md;xd=0;Bd=M=Ad=zd=L=yd=null;Cd=0;Dd=null;Ed=0;Fd=!1;Gd=null;Hd=0}function Od(){var a={memoizedState:null,baseState:null,queue:null,baseUpdate:null,next:null};null===M?Ad=M=a:M=M.next=a;return M}function Pd(){if(null!==Bd)M=Bd,Bd=M.next,L=zd,zd=null!==L?L.next:null;else{if(null===zd)throw Error(n(310));L=zd;var a={memoizedState:L.memoizedState,baseState:L.baseState,queue:L.queue,baseUpdate:L.baseUpdate,next:null};M=null===M?Ad=a:M.next=a;zd=L.next}return M}
function Qd(a,b){return"function"===typeof b?b(a):b}
function Rd(a){var b=Pd(),c=b.queue;if(null===c)throw Error(n(311));c.lastRenderedReducer=a;if(0<Hd){var d=c.dispatch;if(null!==Gd){var e=Gd.get(c);if(void 0!==e){Gd.delete(c);var f=b.memoizedState;do f=a(f,e.action),e=e.next;while(null!==e);oc(f,b.memoizedState)||(Bc=!0);b.memoizedState=f;b.baseUpdate===c.last&&(b.baseState=f);c.lastRenderedState=f;return[f,d]}}return[b.memoizedState,d]}d=c.last;var g=b.baseUpdate;f=b.baseState;null!==g?(null!==d&&(d.next=null),d=g.next):d=null!==d?d.next:null;if(null!==
d){var l=e=null,h=d,k=!1;do{var p=h.expirationTime;p<xd?(k||(k=!0,l=g,e=f),p>Cd&&(Cd=p,Pc(Cd))):(Oc(p,h.suspenseConfig),f=h.eagerReducer===a?h.eagerState:a(f,h.action));g=h;h=h.next}while(null!==h&&h!==d);k||(l=g,e=f);oc(f,b.memoizedState)||(Bc=!0);b.memoizedState=f;b.baseUpdate=l;b.baseState=e;c.lastRenderedState=f}return[b.memoizedState,c.dispatch]}
function Sd(a){var b=Od();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a=b.queue={last:null,dispatch:null,lastRenderedReducer:Qd,lastRenderedState:a};a=a.dispatch=Td.bind(null,yd,a);return[b.memoizedState,a]}function Ud(a){return Rd(Qd,a)}function Vd(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};null===Dd?(Dd={lastEffect:null},Dd.lastEffect=a.next=a):(b=Dd.lastEffect,null===b?Dd.lastEffect=a.next=a:(c=b.next,b.next=a,a.next=c,Dd.lastEffect=a));return a}
function Wd(a,b,c,d){var e=Od();Ed|=a;e.memoizedState=Vd(b,c,void 0,void 0===d?null:d)}function Xd(a,b,c,d){var e=Pd();d=void 0===d?null:d;var f=void 0;if(null!==L){var g=L.memoizedState;f=g.destroy;if(null!==d&&Id(d,g.deps)){Vd(0,c,f,d);return}}Ed|=a;e.memoizedState=Vd(b,c,f,d)}function Yd(a,b){return Wd(516,192,a,b)}function Zd(a,b){return Xd(516,192,a,b)}
function $d(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function ae(){}function be(a,b){Od().memoizedState=[a,void 0===b?null:b];return a}function ce(a,b){var c=Pd();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Id(b,d[1]))return d[0];c.memoizedState=[a,b];return a}
function Td(a,b,c){if(!(25>Hd))throw Error(n(301));var d=a.alternate;if(a===yd||null!==d&&d===yd)if(Fd=!0,a={expirationTime:xd,suspenseConfig:null,action:c,eagerReducer:null,eagerState:null,next:null},null===Gd&&(Gd=new Map),c=Gd.get(b),void 0===c)Gd.set(b,a);else{for(b=c;null!==b.next;)b=b.next;b.next=a}else{var e=G(),f=Sc.suspense;e=Vc(e,a,f);f={expirationTime:e,suspenseConfig:f,action:c,eagerReducer:null,eagerState:null,next:null};var g=b.last;if(null===g)f.next=f;else{var l=g.next;null!==l&&(f.next=
l);g.next=f}b.last=f;if(0===a.expirationTime&&(null===d||0===d.expirationTime)&&(d=b.lastRenderedReducer,null!==d))try{var h=b.lastRenderedState,k=d(h,c);f.eagerReducer=d;f.eagerState=k;if(oc(k,h))return}catch(p){}finally{}Wc(a,e)}}
var Md={readContext:Cc,useCallback:P,useContext:P,useEffect:P,useImperativeHandle:P,useLayoutEffect:P,useMemo:P,useReducer:P,useRef:P,useState:P,useDebugValue:P,useResponder:P,useDeferredValue:P,useTransition:P},Kd={readContext:Cc,useCallback:be,useContext:Cc,useEffect:Yd,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Wd(4,36,$d.bind(null,b,a),c)},useLayoutEffect:function(a,b){return Wd(4,36,a,b)},useMemo:function(a,b){var c=Od();b=void 0===b?null:b;a=a();c.memoizedState=
[a,b];return a},useReducer:function(a,b,c){var d=Od();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a=d.queue={last:null,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};a=a.dispatch=Td.bind(null,yd,a);return[d.memoizedState,a]},useRef:function(a){var b=Od();a={current:a};return b.memoizedState=a},useState:Sd,useDebugValue:ae,useResponder:vd,useDeferredValue:function(a,b){var c=Sd(a),d=c[0],e=c[1];Yd(function(){m.unstable_next(function(){var c=J.suspense;J.suspense=void 0===b?null:b;try{e(a)}finally{J.suspense=
c}})},[a,b]);return d},useTransition:function(a){var b=Sd(!1),c=b[0],d=b[1];return[be(function(b){d(!0);m.unstable_next(function(){var c=J.suspense;J.suspense=void 0===a?null:a;try{d(!1),b()}finally{J.suspense=c}})},[a,c]),c]}},Ld={readContext:Cc,useCallback:ce,useContext:Cc,useEffect:Zd,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return Xd(4,36,$d.bind(null,b,a),c)},useLayoutEffect:function(a,b){return Xd(4,36,a,b)},useMemo:function(a,b){var c=Pd();b=void 0===b?
null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Id(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a},useReducer:Rd,useRef:function(){return Pd().memoizedState},useState:Ud,useDebugValue:ae,useResponder:vd,useDeferredValue:function(a,b){var c=Ud(a),d=c[0],e=c[1];Zd(function(){m.unstable_next(function(){var c=J.suspense;J.suspense=void 0===b?null:b;try{e(a)}finally{J.suspense=c}})},[a,b]);return d},useTransition:function(a){var b=Ud(!1),c=b[0],d=b[1];return[ce(function(b){d(!0);m.unstable_next(function(){var c=
J.suspense;J.suspense=void 0===a?null:a;try{d(!1),b()}finally{J.suspense=c}})},[a,c]),c]}},de=null,ee=null,fe=!1;function ge(a,b){var c=he(5,null,null,0);c.elementType="DELETED";c.type="DELETED";c.stateNode=b;c.return=a;c.effectTag=8;null!==a.lastEffect?(a.lastEffect.nextEffect=c,a.lastEffect=c):a.firstEffect=a.lastEffect=c}
function ie(a,b){switch(a.tag){case 5:return b=ob(b,a.type,a.pendingProps),null!==b?(a.stateNode=b,!0):!1;case 6:return b=pb(b,a.pendingProps),null!==b?(a.stateNode=b,!0):!1;case 13:return!1;default:return!1}}function je(a){if(fe){var b=ee;if(b){var c=b;if(!ie(a,b)){b=sb(c);if(!b||!ie(a,b)){a.effectTag=a.effectTag&-1025|2;fe=!1;de=a;return}ge(de,c)}de=a;ee=tb(b)}else a.effectTag=a.effectTag&-1025|2,fe=!1,de=a}}
function ke(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;de=a}function ne(a){if(!Sa||a!==de)return!1;if(!fe)return ke(a),fe=!0,!1;var b=a.type;if(5!==a.tag||"head"!==b&&"body"!==b&&!Ja(b,a.memoizedProps))for(b=ee;b;)ge(a,b),b=sb(b);ke(a);if(13===a.tag){if(!Sa)throw Error(n(316));a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(n(317));ee=wb(a)}else ee=de?sb(a.stateNode):null;return!0}function oe(){Sa&&(ee=de=null,fe=!1)}var pe=q.ReactCurrentOwner,Bc=!1;
function Q(a,b,c,d){b.child=null===a?ld(b,null,c,d):kd(b,a.child,c,d)}function qe(a,b,c,d,e){c=c.render;var f=b.ref;Ac(b,e);d=Jd(a,b,c,d,f,e);if(null!==a&&!Bc)return b.updateQueue=a.updateQueue,b.effectTag&=-517,a.expirationTime<=e&&(a.expirationTime=0),re(a,b,e);b.effectTag|=1;Q(a,b,d,e);return b.child}
function se(a,b,c,d,e,f){if(null===a){var g=c.type;if("function"===typeof g&&!te(g)&&void 0===g.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=g,ue(a,b,g,d,e,f);a=hd(c.type,null,d,null,b.mode,f);a.ref=b.ref;a.return=b;return b.child=a}g=a.child;if(e<f&&(e=g.memoizedProps,c=c.compare,c=null!==c?c:qc,c(e,d)&&a.ref===b.ref))return re(a,b,f);b.effectTag|=1;a=fd(g,d,f);a.ref=b.ref;a.return=b;return b.child=a}
function ue(a,b,c,d,e,f){return null!==a&&qc(a.memoizedProps,d)&&a.ref===b.ref&&(Bc=!1,e<f)?re(a,b,f):ve(a,b,c,d,f)}function we(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.effectTag|=128}function ve(a,b,c,d,e){var f=C(c)?Eb:A.current;f=Fb(b,f);Ac(b,e);c=Jd(a,b,c,d,f,e);if(null!==a&&!Bc)return b.updateQueue=a.updateQueue,b.effectTag&=-517,a.expirationTime<=e&&(a.expirationTime=0),re(a,b,e);b.effectTag|=1;Q(a,b,c,e);return b.child}
function xe(a,b,c,d,e){if(C(c)){var f=!0;Kb(b)}else f=!1;Ac(b,e);if(null===b.stateNode)null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2),Zc(b,c,d,e),ad(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,l=b.memoizedProps;g.props=l;var h=g.context,k=c.contextType;"object"===typeof k&&null!==k?k=Cc(k):(k=C(c)?Eb:A.current,k=Fb(b,k));var p=c.getDerivedStateFromProps,D="function"===typeof p||"function"===typeof g.getSnapshotBeforeUpdate;D||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&
"function"!==typeof g.componentWillReceiveProps||(l!==d||h!==k)&&$c(b,g,d,k);Dc=!1;var x=b.memoizedState;h=g.state=x;var K=b.updateQueue;null!==K&&(Nc(b,K,d,g,e),h=b.memoizedState);l!==d||x!==h||B.current||Dc?("function"===typeof p&&(Uc(b,c,p,d),h=b.memoizedState),(l=Dc||Yc(b,c,l,d,x,h,k))?(D||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&
g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.effectTag|=4)):("function"===typeof g.componentDidMount&&(b.effectTag|=4),b.memoizedProps=d,b.memoizedState=h),g.props=d,g.state=h,g.context=k,d=l):("function"===typeof g.componentDidMount&&(b.effectTag|=4),d=!1)}else g=b.stateNode,l=b.memoizedProps,g.props=b.type===b.elementType?l:rc(b.type,l),h=g.context,k=c.contextType,"object"===typeof k&&null!==k?k=Cc(k):(k=C(c)?Eb:A.current,k=Fb(b,k)),p=c.getDerivedStateFromProps,(D=
"function"===typeof p||"function"===typeof g.getSnapshotBeforeUpdate)||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(l!==d||h!==k)&&$c(b,g,d,k),Dc=!1,h=b.memoizedState,x=g.state=h,K=b.updateQueue,null!==K&&(Nc(b,K,d,g,e),x=b.memoizedState),l!==d||h!==x||B.current||Dc?("function"===typeof p&&(Uc(b,c,p,d),x=b.memoizedState),(p=Dc||Yc(b,c,l,d,h,x,k))?(D||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||
("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,x,k),"function"===typeof g.UNSAFE_componentWillUpdate&&g.UNSAFE_componentWillUpdate(d,x,k)),"function"===typeof g.componentDidUpdate&&(b.effectTag|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.effectTag|=256)):("function"!==typeof g.componentDidUpdate||l===a.memoizedProps&&h===a.memoizedState||(b.effectTag|=4),"function"!==typeof g.getSnapshotBeforeUpdate||l===a.memoizedProps&&h===a.memoizedState||(b.effectTag|=256),b.memoizedProps=
d,b.memoizedState=x),g.props=d,g.state=x,g.context=k,d=p):("function"!==typeof g.componentDidUpdate||l===a.memoizedProps&&h===a.memoizedState||(b.effectTag|=4),"function"!==typeof g.getSnapshotBeforeUpdate||l===a.memoizedProps&&h===a.memoizedState||(b.effectTag|=256),d=!1);return ye(a,b,c,d,f,e)}
function ye(a,b,c,d,e,f){we(a,b);var g=0!==(b.effectTag&64);if(!d&&!g)return e&&Lb(b,c,!1),re(a,b,f);d=b.stateNode;pe.current=b;var l=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.effectTag|=1;null!==a&&g?(b.child=kd(b,a.child,null,f),b.child=kd(b,null,l,f)):Q(a,b,l,f);b.memoizedState=d.state;e&&Lb(b,c,!0);return b.child}function ze(a){var b=a.stateNode;b.pendingContext?Ib(a,b.pendingContext,b.pendingContext!==b.context):b.context&&Ib(a,b.context,!1);qd(a,b.containerInfo)}
var Ae={dehydrated:null,retryTime:0};
function Be(a,b,c){var d=b.mode,e=b.pendingProps,f=I.current,g=!1,l;(l=0!==(b.effectTag&64))||(l=0!==(f&2)&&(null===a||null!==a.memoizedState));l?(g=!0,b.effectTag&=-65):null!==a&&null===a.memoizedState||void 0===e.fallback||!0===e.unstable_avoidThisFallback||(f|=1);z(I,f&1,b);if(null===a){void 0!==e.fallback&&je(b);if(g){g=e.fallback;e=jd(null,d,0,null);e.return=b;if(0===(b.mode&2))for(a=null!==b.memoizedState?b.child.child:b.child,e.child=a;null!==a;)a.return=e,a=a.sibling;c=jd(g,d,c,null);c.return=
b;e.sibling=c;b.memoizedState=Ae;b.child=e;return c}d=e.children;b.memoizedState=null;return b.child=ld(b,null,d,c)}if(null!==a.memoizedState){a=a.child;d=a.sibling;if(g){e=e.fallback;c=fd(a,a.pendingProps,0);c.return=b;if(0===(b.mode&2)&&(g=null!==b.memoizedState?b.child.child:b.child,g!==a.child))for(c.child=g;null!==g;)g.return=c,g=g.sibling;d=fd(d,e,d.expirationTime);d.return=b;c.sibling=d;c.childExpirationTime=0;b.memoizedState=Ae;b.child=c;return d}c=kd(b,a.child,e.children,c);b.memoizedState=
null;return b.child=c}a=a.child;if(g){g=e.fallback;e=jd(null,d,0,null);e.return=b;e.child=a;null!==a&&(a.return=e);if(0===(b.mode&2))for(a=null!==b.memoizedState?b.child.child:b.child,e.child=a;null!==a;)a.return=e,a=a.sibling;c=jd(g,d,c,null);c.return=b;e.sibling=c;c.effectTag|=2;e.childExpirationTime=0;b.memoizedState=Ae;b.child=e;return c}b.memoizedState=null;return b.child=kd(b,a,e.children,c)}
function Ce(a,b){a.expirationTime<b&&(a.expirationTime=b);var c=a.alternate;null!==c&&c.expirationTime<b&&(c.expirationTime=b);zc(a.return,b)}function De(a,b,c,d,e,f){var g=a.memoizedState;null===g?a.memoizedState={isBackwards:b,rendering:null,last:d,tail:c,tailExpiration:0,tailMode:e,lastEffect:f}:(g.isBackwards=b,g.rendering=null,g.last=d,g.tail=c,g.tailExpiration=0,g.tailMode=e,g.lastEffect=f)}
function Ee(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;Q(a,b,d.children,c);d=I.current;if(0!==(d&2))d=d&1|2,b.effectTag|=64;else{if(null!==a&&0!==(a.effectTag&64))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&Ce(a,c);else if(19===a.tag)Ce(a,c);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}z(I,d,b);if(0===(b.mode&2))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===ud(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);De(b,!1,e,c,f,b.lastEffect);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===ud(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}De(b,!0,c,null,f,b.lastEffect);break;case "together":De(b,!1,null,null,void 0,b.lastEffect);break;default:b.memoizedState=null}return b.child}
function re(a,b,c){null!==a&&(b.dependencies=a.dependencies);var d=b.expirationTime;0!==d&&Pc(d);if(b.childExpirationTime<c)return null;if(null!==a&&b.child!==a.child)throw Error(n(153));if(null!==b.child){a=b.child;c=fd(a,a.pendingProps,a.expirationTime);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=fd(a,a.pendingProps,a.expirationTime),c.return=b;c.sibling=null}return b.child}function Fe(a){a.effectTag|=4}var Ge,He,Ie,Je;
if(Qa)Ge=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)Fa(a,c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}},He=function(){},Ie=function(a,b,c,d,e){a=a.memoizedProps;if(a!==d){var f=b.stateNode,g=pd(H.current);c=Ia(f,c,a,d,e,g);(b.updateQueue=c)&&Fe(b)}},Je=function(a,b,c,d){c!==d&&Fe(b)};else if(Ra){Ge=function(a,
b,c,d){for(var e=b.child;null!==e;){if(5===e.tag){var f=e.stateNode;c&&d&&(f=mb(f,e.type,e.memoizedProps,e));Fa(a,f)}else if(6===e.tag)f=e.stateNode,c&&d&&(f=nb(f,e.memoizedProps,e)),Fa(a,f);else if(4!==e.tag){if(13===e.tag&&0!==(e.effectTag&4)&&(f=null!==e.memoizedState)){var g=e.child;if(null!==g&&(null!==g.child&&(g.child.return=g,Ge(a,g,!0,f)),f=g.sibling,null!==f)){f.return=e;e=f;continue}}if(null!==e.child){e.child.return=e;e=e.child;continue}}if(e===b)break;for(;null===e.sibling;){if(null===
e.return||e.return===b)return;e=e.return}e.sibling.return=e.return;e=e.sibling}};var Ke=function(a,b,c,d){for(var e=b.child;null!==e;){if(5===e.tag){var f=e.stateNode;c&&d&&(f=mb(f,e.type,e.memoizedProps,e));ib(a,f)}else if(6===e.tag)f=e.stateNode,c&&d&&(f=nb(f,e.memoizedProps,e)),ib(a,f);else if(4!==e.tag){if(13===e.tag&&0!==(e.effectTag&4)&&(f=null!==e.memoizedState)){var g=e.child;if(null!==g&&(null!==g.child&&(g.child.return=g,Ke(a,g,!0,f)),f=g.sibling,null!==f)){f.return=e;e=f;continue}}if(null!==
e.child){e.child.return=e;e=e.child;continue}}if(e===b)break;for(;null===e.sibling;){if(null===e.return||e.return===b)return;e=e.return}e.sibling.return=e.return;e=e.sibling}};He=function(a){var b=a.stateNode;if(null!==a.firstEffect){var c=b.containerInfo,d=hb(c);Ke(d,a,!1,!1);b.pendingChildren=d;Fe(a);kb(c,d)}};Ie=function(a,b,c,d,e){var f=a.stateNode,g=a.memoizedProps;if((a=null===b.firstEffect)&&g===d)b.stateNode=f;else{var l=b.stateNode,h=pd(H.current),k=null;g!==d&&(k=Ia(l,c,g,d,e,h));a&&null===
k?b.stateNode=f:(f=gb(f,k,c,g,d,b,a,l),Ga(f,c,d,e,h)&&Fe(b),b.stateNode=f,a?Fe(b):Ge(f,b,!1,!1))}};Je=function(a,b,c,d){c!==d&&(a=pd(od.current),c=pd(H.current),b.stateNode=La(d,a,c,b),Fe(b))}}else He=function(){},Ie=function(){},Je=function(){};
function Le(a,b){switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
function Me(a){switch(a.tag){case 1:C(a.type)&&Gb(a);var b=a.effectTag;return b&4096?(a.effectTag=b&-4097|64,a):null;case 3:rd(a);Hb(a);b=a.effectTag;if(0!==(b&64))throw Error(n(285));a.effectTag=b&-4097|64;return a;case 5:return td(a),null;case 13:return y(I,a),b=a.effectTag,b&4096?(a.effectTag=b&-4097|64,a):null;case 19:return y(I,a),null;case 4:return rd(a),null;case 10:return yc(a),null;default:return null}}function Ne(a,b){return{value:a,source:b,stack:Ab(b)}}
var Oe="function"===typeof WeakSet?WeakSet:Set;function Pe(a,b){var c=b.source,d=b.stack;null===d&&null!==c&&(d=Ab(c));null!==c&&ta(c.type);b=b.value;null!==a&&1===a.tag&&ta(a.type);try{console.error(b)}catch(e){setTimeout(function(){throw e;})}}function Qe(a,b){try{b.props=a.memoizedProps,b.state=a.memoizedState,b.componentWillUnmount()}catch(c){Re(a,c)}}function Se(a){var b=a.ref;if(null!==b)if("function"===typeof b)try{b(null)}catch(c){Re(a,c)}else b.current=null}
function Te(a,b){switch(b.tag){case 0:case 11:case 15:Ue(2,0,b);break;case 1:if(b.effectTag&256&&null!==a){var c=a.memoizedProps,d=a.memoizedState;a=b.stateNode;b=a.getSnapshotBeforeUpdate(b.elementType===b.type?c:rc(b.type,c),d);a.__reactInternalSnapshotBeforeUpdate=b}break;case 3:case 5:case 6:case 4:case 17:break;default:throw Error(n(163));}}
function Ue(a,b,c){c=c.updateQueue;c=null!==c?c.lastEffect:null;if(null!==c){var d=c=c.next;do{if(0!==(d.tag&a)){var e=d.destroy;d.destroy=void 0;void 0!==e&&e()}0!==(d.tag&b)&&(e=d.create,d.destroy=e());d=d.next}while(d!==c)}}
function Ve(a,b,c){"function"===typeof We&&We(b);switch(b.tag){case 0:case 11:case 14:case 15:a=b.updateQueue;if(null!==a&&(a=a.lastEffect,null!==a)){var d=a.next;hc(97<c?97:c,function(){var a=d;do{var c=a.destroy;if(void 0!==c){var g=b;try{c()}catch(l){Re(g,l)}}a=a.next}while(a!==d)})}break;case 1:Se(b);c=b.stateNode;"function"===typeof c.componentWillUnmount&&Qe(b,c);break;case 5:Se(b);break;case 4:Qa?Xe(a,b,c):Ra&&Ye(b)}}
function Ze(a,b,c){for(var d=b;;)if(Ve(a,d,c),null===d.child||Qa&&4===d.tag){if(d===b)break;for(;null===d.sibling;){if(null===d.return||d.return===b)return;d=d.return}d.sibling.return=d.return;d=d.sibling}else d.child.return=d,d=d.child}function $e(a){var b=a.alternate;a.return=null;a.child=null;a.memoizedState=null;a.updateQueue=null;a.dependencies=null;a.alternate=null;a.firstEffect=null;a.lastEffect=null;a.pendingProps=null;a.memoizedProps=null;null!==b&&$e(b)}
function Ye(a){if(Ra){a=a.stateNode.containerInfo;var b=hb(a);lb(a,b)}}function af(a){return 5===a.tag||3===a.tag||4===a.tag}
function bf(a){if(Qa){a:{for(var b=a.return;null!==b;){if(af(b)){var c=b;break a}b=b.return}throw Error(n(160));}b=c.stateNode;switch(c.tag){case 5:var d=!1;break;case 3:b=b.containerInfo;d=!0;break;case 4:b=b.containerInfo;d=!0;break;default:throw Error(n(161));}c.effectTag&16&&(bb(b),c.effectTag&=-17);a:b:for(c=a;;){for(;null===c.sibling;){if(null===c.return||af(c.return)){c=null;break a}c=c.return}c.sibling.return=c.return;for(c=c.sibling;5!==c.tag&&6!==c.tag&&18!==c.tag;){if(c.effectTag&2)continue b;
if(null===c.child||4===c.tag)continue b;else c.child.return=c,c=c.child}if(!(c.effectTag&2)){c=c.stateNode;break a}}for(var e=a;;){var f=5===e.tag||6===e.tag;if(f)f=f?e.stateNode:e.stateNode.instance,c?d?Za(b,f,c):Ya(b,f,c):d?Ua(b,f):Ta(b,f);else if(4!==e.tag&&null!==e.child){e.child.return=e;e=e.child;continue}if(e===a)break;for(;null===e.sibling;){if(null===e.return||e.return===a)return;e=e.return}e.sibling.return=e.return;e=e.sibling}}}
function Xe(a,b,c){for(var d=b,e=!1,f,g;;){if(!e){e=d.return;a:for(;;){if(null===e)throw Error(n(160));f=e.stateNode;switch(e.tag){case 5:g=!1;break a;case 3:f=f.containerInfo;g=!0;break a;case 4:f=f.containerInfo;g=!0;break a}e=e.return}e=!0}if(5===d.tag||6===d.tag)Ze(a,d,c),g?ab(f,d.stateNode):$a(f,d.stateNode);else if(4===d.tag){if(null!==d.child){f=d.stateNode.containerInfo;g=!0;d.child.return=d;d=d.child;continue}}else if(Ve(a,d,c),null!==d.child){d.child.return=d;d=d.child;continue}if(d===b)break;
for(;null===d.sibling;){if(null===d.return||d.return===b)return;d=d.return;4===d.tag&&(e=!1)}d.sibling.return=d.return;d=d.sibling}}
function cf(a,b){if(Qa)switch(b.tag){case 0:case 11:case 14:case 15:Ue(4,8,b);break;case 1:break;case 5:var c=b.stateNode;if(null!=c){var d=b.memoizedProps;a=null!==a?a.memoizedProps:d;var e=b.type,f=b.updateQueue;b.updateQueue=null;null!==f&&Xa(c,f,e,a,d,b)}break;case 6:if(null===b.stateNode)throw Error(n(162));c=b.memoizedProps;Va(b.stateNode,null!==a?a.memoizedProps:c,c);break;case 3:Sa&&(b=b.stateNode,b.hydrate&&(b.hydrate=!1,xb(b.containerInfo)));break;case 12:break;case 13:df(b);ef(b);break;
case 19:ef(b);break;case 17:break;case 20:break;case 21:break;default:throw Error(n(163));}else{switch(b.tag){case 0:case 11:case 14:case 15:Ue(4,8,b);return;case 12:return;case 13:df(b);ef(b);return;case 19:ef(b);return;case 3:Sa&&(c=b.stateNode,c.hydrate&&(c.hydrate=!1,xb(c.containerInfo)))}a:if(Ra)switch(b.tag){case 1:case 5:case 6:case 20:break a;case 3:case 4:b=b.stateNode;lb(b.containerInfo,b.pendingChildren);break a;default:throw Error(n(163));}}}
function df(a){var b=a;if(null===a.memoizedState)var c=!1;else c=!0,b=a.child,ff=E();if(Qa&&null!==b)a:if(a=b,Qa)for(b=a;;){if(5===b.tag){var d=b.stateNode;c?cb(d):eb(b.stateNode,b.memoizedProps)}else if(6===b.tag)d=b.stateNode,c?db(d):fb(d,b.memoizedProps);else if(13===b.tag&&null!==b.memoizedState&&null===b.memoizedState.dehydrated){d=b.child.sibling;d.return=b;b=d;continue}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break a;for(;null===b.sibling;){if(null===b.return||b.return===
a)break a;b=b.return}b.sibling.return=b.return;b=b.sibling}}function ef(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Oe);b.forEach(function(b){var d=gf.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}var hf="function"===typeof WeakMap?WeakMap:Map;function jf(a,b,c){c=Gc(c,null);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){kf||(kf=!0,lf=d);Pe(a,b)};return c}
function mf(a,b,c){c=Gc(c,null);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){Pe(a,b);return d(e)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){"function"!==typeof d&&(null===nf?nf=new Set([this]):nf.add(this),Pe(a,b));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}
var of=Math.ceil,pf=q.ReactCurrentDispatcher,qf=q.ReactCurrentOwner,R=0,rf=8,S=16,sf=32,tf=0,uf=1,vf=2,wf=3,xf=4,yf=5,T=R,U=null,V=null,W=0,X=tf,zf=null,Af=1073741823,Bf=1073741823,Cf=null,Df=0,Ef=!1,ff=0,Ff=500,Y=null,kf=!1,lf=null,nf=null,Gf=!1,Hf=null,If=90,Jf=null,Kf=0,Lf=null,Mf=0;function G(){return(T&(S|sf))!==R?1073741821-(E()/10|0):0!==Mf?Mf:Mf=1073741821-(E()/10|0)}
function Vc(a,b,c){b=b.mode;if(0===(b&2))return 1073741823;var d=fc();if(0===(b&4))return 99===d?1073741823:1073741822;if((T&S)!==R)return W;if(null!==c)a=mc(a,c.timeoutMs|0||5E3,250);else switch(d){case 99:a=1073741823;break;case 98:a=mc(a,150,100);break;case 97:case 96:a=mc(a,5E3,250);break;case 95:a=2;break;default:throw Error(n(326));}null!==U&&a===W&&--a;return a}
function Wc(a,b){if(50<Kf)throw Kf=0,Lf=null,Error(n(185));a=Nf(a,b);if(null!==a){var c=fc();1073741823===b?(T&rf)!==R&&(T&(S|sf))===R?Of(a):(Z(a),T===R&&F()):Z(a);(T&4)===R||98!==c&&99!==c||(null===Jf?Jf=new Map([[a,b]]):(c=Jf.get(a),(void 0===c||c>b)&&Jf.set(a,b)))}}
function Nf(a,b){a.expirationTime<b&&(a.expirationTime=b);var c=a.alternate;null!==c&&c.expirationTime<b&&(c.expirationTime=b);var d=a.return,e=null;if(null===d&&3===a.tag)e=a.stateNode;else for(;null!==d;){c=d.alternate;d.childExpirationTime<b&&(d.childExpirationTime=b);null!==c&&c.childExpirationTime<b&&(c.childExpirationTime=b);if(null===d.return&&3===d.tag){e=d.stateNode;break}d=d.return}null!==e&&(U===e&&(Pc(b),X===xf&&Pf(e,W)),Qf(e,b));return e}
function Rf(a){var b=a.lastExpiredTime;if(0!==b)return b;b=a.firstPendingTime;if(!Sf(a,b))return b;b=a.lastPingedTime;a=a.nextKnownPendingLevel;return b>a?b:a}
function Z(a){if(0!==a.lastExpiredTime)a.callbackExpirationTime=1073741823,a.callbackPriority=99,a.callbackNode=jc(Of.bind(null,a));else{var b=Rf(a),c=a.callbackNode;if(0===b)null!==c&&(a.callbackNode=null,a.callbackExpirationTime=0,a.callbackPriority=90);else{var d=G();1073741823===b?d=99:1===b||2===b?d=95:(d=10*(1073741821-b)-10*(1073741821-d),d=0>=d?99:250>=d?98:5250>=d?97:95);if(null!==c){var e=a.callbackPriority;if(a.callbackExpirationTime===b&&e>=d)return;c!==$b&&Ob(c)}a.callbackExpirationTime=
b;a.callbackPriority=d;b=1073741823===b?jc(Of.bind(null,a)):ic(d,Tf.bind(null,a),{timeout:10*(1073741821-b)-E()});a.callbackNode=b}}}
function Tf(a,b){Mf=0;if(b)return b=G(),Uf(a,b),Z(a),null;var c=Rf(a);if(0!==c){b=a.callbackNode;if((T&(S|sf))!==R)throw Error(n(327));Vf();a===U&&c===W||Wf(a,c);if(null!==V){var d=T;T|=S;var e=Xf(a);do try{Yf();break}catch(l){Zf(a,l)}while(1);wc();T=d;pf.current=e;if(X===uf)throw b=zf,Wf(a,c),Pf(a,c),Z(a),b;if(null===V)switch(e=a.finishedWork=a.current.alternate,a.finishedExpirationTime=c,d=X,U=null,d){case tf:case uf:throw Error(n(345));case vf:Uf(a,2<c?2:c);break;case wf:Pf(a,c);d=a.lastSuspendedTime;
c===d&&(a.nextKnownPendingLevel=$f(e));if(1073741823===Af&&(e=ff+Ff-E(),10<e)){if(Ef){var f=a.lastPingedTime;if(0===f||f>=c){a.lastPingedTime=c;Wf(a,c);break}}f=Rf(a);if(0!==f&&f!==c)break;if(0!==d&&d!==c){a.lastPingedTime=d;break}a.timeoutHandle=Ma(ag.bind(null,a),e);break}ag(a);break;case xf:Pf(a,c);d=a.lastSuspendedTime;c===d&&(a.nextKnownPendingLevel=$f(e));if(Ef&&(e=a.lastPingedTime,0===e||e>=c)){a.lastPingedTime=c;Wf(a,c);break}e=Rf(a);if(0!==e&&e!==c)break;if(0!==d&&d!==c){a.lastPingedTime=
d;break}1073741823!==Bf?d=10*(1073741821-Bf)-E():1073741823===Af?d=0:(d=10*(1073741821-Af)-5E3,e=E(),c=10*(1073741821-c)-e,d=e-d,0>d&&(d=0),d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*of(d/1960))-d,c<d&&(d=c));if(10<d){a.timeoutHandle=Ma(ag.bind(null,a),d);break}ag(a);break;case yf:if(1073741823!==Af&&null!==Cf){f=Af;var g=Cf;d=g.busyMinDurationMs|0;0>=d?d=0:(e=g.busyDelayMs|0,f=E()-(10*(1073741821-f)-(g.timeoutMs|0||5E3)),d=f<=e?0:e+d-f);if(10<d){Pf(a,c);a.timeoutHandle=
Ma(ag.bind(null,a),d);break}}ag(a);break;default:throw Error(n(329));}Z(a);if(a.callbackNode===b)return Tf.bind(null,a)}}return null}
function Of(a){var b=a.lastExpiredTime;b=0!==b?b:1073741823;if(a.finishedExpirationTime===b)ag(a);else{if((T&(S|sf))!==R)throw Error(n(327));Vf();a===U&&b===W||Wf(a,b);if(null!==V){var c=T;T|=S;var d=Xf(a);do try{bg();break}catch(e){Zf(a,e)}while(1);wc();T=c;pf.current=d;if(X===uf)throw c=zf,Wf(a,b),Pf(a,b),Z(a),c;if(null!==V)throw Error(n(261));a.finishedWork=a.current.alternate;a.finishedExpirationTime=b;U=null;ag(a);Z(a)}}return null}function cg(a,b){Uf(a,b);Z(a);(T&(S|sf))===R&&F()}
function dg(){if(null!==Jf){var a=Jf;Jf=null;a.forEach(function(a,c){Uf(c,a);Z(c)});F()}}function eg(a,b){if((T&(S|sf))!==R)throw Error(n(187));var c=T;T|=1;try{return hc(99,a.bind(null,b))}finally{T=c,F()}}
function Wf(a,b){a.finishedWork=null;a.finishedExpirationTime=0;var c=a.timeoutHandle;c!==Oa&&(a.timeoutHandle=Oa,Na(c));if(null!==V)for(c=V.return;null!==c;){var d=c;switch(d.tag){case 1:var e=d.type.childContextTypes;null!==e&&void 0!==e&&Gb(d);break;case 3:rd(d);Hb(d);break;case 5:td(d);break;case 4:rd(d);break;case 13:y(I,d);break;case 19:y(I,d);break;case 10:yc(d)}c=c.return}U=a;V=fd(a.current,null,b);W=b;X=tf;zf=null;Bf=Af=1073741823;Cf=null;Df=0;Ef=!1}
function Zf(a,b){do{try{wc();Nd();if(null===V||null===V.return)return X=uf,zf=b,null;a:{var c=a,d=V.return,e=V,f=b;b=W;e.effectTag|=2048;e.firstEffect=e.lastEffect=null;if(null!==f&&"object"===typeof f&&"function"===typeof f.then){var g=f,l=0!==(I.current&1),h=d;do{var k;if(k=13===h.tag){var p=h.memoizedState;if(null!==p)k=null!==p.dehydrated?!0:!1;else{var D=h.memoizedProps;k=void 0===D.fallback?!1:!0!==D.unstable_avoidThisFallback?!0:l?!1:!0}}if(k){var x=h.updateQueue;if(null===x){var K=new Set;
K.add(g);h.updateQueue=K}else x.add(g);if(0===(h.mode&2)){h.effectTag|=64;e.effectTag&=-2981;if(1===e.tag)if(null===e.alternate)e.tag=17;else{var Ha=Gc(1073741823,null);Ha.tag=2;Ic(e,Ha)}e.expirationTime=1073741823;break a}f=void 0;e=b;var O=c.pingCache;null===O?(O=c.pingCache=new hf,f=new Set,O.set(g,f)):(f=O.get(g),void 0===f&&(f=new Set,O.set(g,f)));if(!f.has(e)){f.add(e);var w=fg.bind(null,c,g,e);g.then(w,w)}h.effectTag|=4096;h.expirationTime=b;break a}h=h.return}while(null!==h);f=Error((ta(e.type)||
"A React component")+" suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display."+Ab(e))}X!==yf&&(X=vf);f=Ne(f,e);h=d;do{switch(h.tag){case 3:g=f;h.effectTag|=4096;h.expirationTime=b;var r=jf(h,g,b);Jc(h,r);break a;case 1:g=f;var t=h.type,N=h.stateNode;if(0===(h.effectTag&64)&&("function"===typeof t.getDerivedStateFromError||null!==N&&"function"===typeof N.componentDidCatch&&
(null===nf||!nf.has(N)))){h.effectTag|=4096;h.expirationTime=b;var Mc=mf(h,g,b);Jc(h,Mc);break a}}h=h.return}while(null!==h)}V=gg(V)}catch(Sb){b=Sb;continue}break}while(1)}function Xf(){var a=pf.current;pf.current=Md;return null===a?Md:a}function Oc(a,b){a<Af&&2<a&&(Af=a);null!==b&&a<Bf&&2<a&&(Bf=a,Cf=b)}function Pc(a){a>Df&&(Df=a)}function bg(){for(;null!==V;)V=hg(V)}function Yf(){for(;null!==V&&!Pb();)V=hg(V)}
function hg(a){var b=ig(a.alternate,a,W);a.memoizedProps=a.pendingProps;null===b&&(b=gg(a));qf.current=null;return b}
function gg(a){V=a;do{var b=V.alternate;a=V.return;if(0===(V.effectTag&2048)){a:{var c=b;b=V;var d=W,e=b.pendingProps;switch(b.tag){case 2:break;case 16:break;case 15:case 0:break;case 1:C(b.type)&&Gb(b);break;case 3:rd(b);Hb(b);e=b.stateNode;e.pendingContext&&(e.context=e.pendingContext,e.pendingContext=null);(null===c||null===c.child)&&ne(b)&&Fe(b);He(b);break;case 5:td(b);var f=pd(od.current);d=b.type;if(null!==c&&null!=b.stateNode)Ie(c,b,d,e,f),c.ref!==b.ref&&(b.effectTag|=128);else if(e){c=pd(H.current);
if(ne(b)){e=b;if(!Sa)throw Error(n(175));c=ub(e.stateNode,e.type,e.memoizedProps,f,c,e);e.updateQueue=c;c=null!==c?!0:!1;c&&Fe(b)}else{var g=Ea(d,e,f,c,b);Ge(g,b,!1,!1);b.stateNode=g;Ga(g,d,e,f,c)&&Fe(b)}null!==b.ref&&(b.effectTag|=128)}else if(null===b.stateNode)throw Error(n(166));break;case 6:if(c&&null!=b.stateNode)Je(c,b,c.memoizedProps,e);else{if("string"!==typeof e&&null===b.stateNode)throw Error(n(166));c=pd(od.current);f=pd(H.current);if(ne(b)){c=b;if(!Sa)throw Error(n(176));(c=vb(c.stateNode,
c.memoizedProps,c))&&Fe(b)}else b.stateNode=La(e,c,f,b)}break;case 11:break;case 13:y(I,b);e=b.memoizedState;if(0!==(b.effectTag&64)){b.expirationTime=d;break a}e=null!==e;f=!1;null===c?void 0!==b.memoizedProps.fallback&&ne(b):(d=c.memoizedState,f=null!==d,e||null===d||(d=c.child.sibling,null!==d&&(g=b.firstEffect,null!==g?(b.firstEffect=d,d.nextEffect=g):(b.firstEffect=b.lastEffect=d,d.nextEffect=null),d.effectTag=8)));if(e&&!f&&0!==(b.mode&2))if(null===c&&!0!==b.memoizedProps.unstable_avoidThisFallback||
0!==(I.current&1))X===tf&&(X=wf);else{if(X===tf||X===wf)X=xf;0!==Df&&null!==U&&(Pf(U,W),Qf(U,Df))}Ra&&e&&(b.effectTag|=4);Qa&&(e||f)&&(b.effectTag|=4);break;case 7:break;case 8:break;case 12:break;case 4:rd(b);He(b);break;case 10:yc(b);break;case 9:break;case 14:break;case 17:C(b.type)&&Gb(b);break;case 19:y(I,b);e=b.memoizedState;if(null===e)break;f=0!==(b.effectTag&64);g=e.rendering;if(null===g)if(f)Le(e,!1);else{if(X!==tf||null!==c&&0!==(c.effectTag&64))for(c=b.child;null!==c;){g=ud(c);if(null!==
g){b.effectTag|=64;Le(e,!1);c=g.updateQueue;null!==c&&(b.updateQueue=c,b.effectTag|=4);null===e.lastEffect&&(b.firstEffect=null);b.lastEffect=e.lastEffect;c=d;for(e=b.child;null!==e;)f=e,d=c,f.effectTag&=2,f.nextEffect=null,f.firstEffect=null,f.lastEffect=null,g=f.alternate,null===g?(f.childExpirationTime=0,f.expirationTime=d,f.child=null,f.memoizedProps=null,f.memoizedState=null,f.updateQueue=null,f.dependencies=null):(f.childExpirationTime=g.childExpirationTime,f.expirationTime=g.expirationTime,
f.child=g.child,f.memoizedProps=g.memoizedProps,f.memoizedState=g.memoizedState,f.updateQueue=g.updateQueue,d=g.dependencies,f.dependencies=null===d?null:{expirationTime:d.expirationTime,firstContext:d.firstContext,responders:d.responders}),e=e.sibling;z(I,I.current&1|2,b);b=b.child;break a}c=c.sibling}}else{if(!f)if(c=ud(g),null!==c){if(b.effectTag|=64,f=!0,c=c.updateQueue,null!==c&&(b.updateQueue=c,b.effectTag|=4),Le(e,!0),null===e.tail&&"hidden"===e.tailMode&&!g.alternate){b=b.lastEffect=e.lastEffect;
null!==b&&(b.nextEffect=null);break}}else E()>e.tailExpiration&&1<d&&(b.effectTag|=64,f=!0,Le(e,!1),b.expirationTime=b.childExpirationTime=d-1);e.isBackwards?(g.sibling=b.child,b.child=g):(c=e.last,null!==c?c.sibling=g:b.child=g,e.last=g)}if(null!==e.tail){0===e.tailExpiration&&(e.tailExpiration=E()+500);c=e.tail;e.rendering=c;e.tail=c.sibling;e.lastEffect=b.lastEffect;c.sibling=null;e=I.current;e=f?e&1|2:e&1;z(I,e,b);b=c;break a}break;case 20:break;case 21:break;default:throw Error(n(156,b.tag));
}b=null}c=V;if(1===W||1!==c.childExpirationTime){e=0;for(f=c.child;null!==f;)d=f.expirationTime,g=f.childExpirationTime,d>e&&(e=d),g>e&&(e=g),f=f.sibling;c.childExpirationTime=e}if(null!==b)return b;null!==a&&0===(a.effectTag&2048)&&(null===a.firstEffect&&(a.firstEffect=V.firstEffect),null!==V.lastEffect&&(null!==a.lastEffect&&(a.lastEffect.nextEffect=V.firstEffect),a.lastEffect=V.lastEffect),1<V.effectTag&&(null!==a.lastEffect?a.lastEffect.nextEffect=V:a.firstEffect=V,a.lastEffect=V))}else{b=Me(V,
W);if(null!==b)return b.effectTag&=2047,b;null!==a&&(a.firstEffect=a.lastEffect=null,a.effectTag|=2048)}b=V.sibling;if(null!==b)return b;V=a}while(null!==V);X===tf&&(X=yf);return null}function $f(a){var b=a.expirationTime;a=a.childExpirationTime;return b>a?b:a}function ag(a){var b=fc();hc(99,jg.bind(null,a,b));return null}
function jg(a,b){do Vf();while(null!==Hf);if((T&(S|sf))!==R)throw Error(n(327));var c=a.finishedWork,d=a.finishedExpirationTime;if(null===c)return null;a.finishedWork=null;a.finishedExpirationTime=0;if(c===a.current)throw Error(n(177));a.callbackNode=null;a.callbackExpirationTime=0;a.callbackPriority=90;a.nextKnownPendingLevel=0;var e=$f(c);a.firstPendingTime=e;d<=a.lastSuspendedTime?a.firstSuspendedTime=a.lastSuspendedTime=a.nextKnownPendingLevel=0:d<=a.firstSuspendedTime&&(a.firstSuspendedTime=
d-1);d<=a.lastPingedTime&&(a.lastPingedTime=0);d<=a.lastExpiredTime&&(a.lastExpiredTime=0);a===U&&(V=U=null,W=0);1<c.effectTag?null!==c.lastEffect?(c.lastEffect.nextEffect=c,e=c.firstEffect):e=c:e=c.firstEffect;if(null!==e){var f=T;T|=sf;qf.current=null;Ca(a.containerInfo);Y=e;do try{kg()}catch(jb){if(null===Y)throw Error(n(330));Re(Y,jb);Y=Y.nextEffect}while(null!==Y);Y=e;do try{for(var g=a,l=b;null!==Y;){var h=Y.effectTag;h&16&&Qa&&bb(Y.stateNode);if(h&128){var k=Y.alternate;if(null!==k){var p=
k.ref;null!==p&&("function"===typeof p?p(null):p.current=null)}}switch(h&1038){case 2:bf(Y);Y.effectTag&=-3;break;case 6:bf(Y);Y.effectTag&=-3;cf(Y.alternate,Y);break;case 1024:Y.effectTag&=-1025;break;case 1028:Y.effectTag&=-1025;cf(Y.alternate,Y);break;case 4:cf(Y.alternate,Y);break;case 8:var D=g,x=Y,K=l;Qa?Xe(D,x,K):Ze(D,x,K);$e(x)}Y=Y.nextEffect}}catch(jb){if(null===Y)throw Error(n(330));Re(Y,jb);Y=Y.nextEffect}while(null!==Y);Da(a.containerInfo);a.current=c;Y=e;do try{for(h=d;null!==Y;){var Ha=
Y.effectTag;if(Ha&36){var O=Y.alternate;k=Y;p=h;switch(k.tag){case 0:case 11:case 15:Ue(16,32,k);break;case 1:var w=k.stateNode;if(k.effectTag&4)if(null===O)w.componentDidMount();else{var r=k.elementType===k.type?O.memoizedProps:rc(k.type,O.memoizedProps);w.componentDidUpdate(r,O.memoizedState,w.__reactInternalSnapshotBeforeUpdate)}var t=k.updateQueue;null!==t&&Qc(k,t,w,p);break;case 3:var N=k.updateQueue;if(null!==N){g=null;if(null!==k.child)switch(k.child.tag){case 5:g=za(k.child.stateNode);break;
case 1:g=k.child.stateNode}Qc(k,N,g,p)}break;case 5:var Mc=k.stateNode;null===O&&k.effectTag&4&&Wa(Mc,k.type,k.memoizedProps,k);break;case 6:break;case 4:break;case 12:break;case 13:if(Sa&&null===k.memoizedState){var Sb=k.alternate;if(null!==Sb){var le=Sb.memoizedState;if(null!==le){var me=le.dehydrated;null!==me&&yb(me)}}}break;case 19:case 17:case 20:case 21:break;default:throw Error(n(163));}}if(Ha&128){k=void 0;var Tb=Y.ref;if(null!==Tb){var v=Y.stateNode;switch(Y.tag){case 5:k=za(v);break;default:k=
v}"function"===typeof Tb?Tb(k):Tb.current=k}}Y=Y.nextEffect}}catch(jb){if(null===Y)throw Error(n(330));Re(Y,jb);Y=Y.nextEffect}while(null!==Y);Y=null;ac();T=f}else a.current=c;if(Gf)Gf=!1,Hf=a,If=b;else for(Y=e;null!==Y;)b=Y.nextEffect,Y.nextEffect=null,Y=b;b=a.firstPendingTime;0===b&&(nf=null);1073741823===b?a===Lf?Kf++:(Kf=0,Lf=a):Kf=0;"function"===typeof lg&&lg(c.stateNode,d);Z(a);if(kf)throw kf=!1,a=lf,lf=null,a;if((T&rf)!==R)return null;F();return null}
function kg(){for(;null!==Y;){var a=Y.effectTag;0!==(a&256)&&Te(Y.alternate,Y);0===(a&512)||Gf||(Gf=!0,ic(97,function(){Vf();return null}));Y=Y.nextEffect}}function Vf(){if(90!==If){var a=97<If?97:If;If=90;return hc(a,mg)}}
function mg(){if(null===Hf)return!1;var a=Hf;Hf=null;if((T&(S|sf))!==R)throw Error(n(331));var b=T;T|=sf;for(a=a.current.firstEffect;null!==a;){try{var c=a;if(0!==(c.effectTag&512))switch(c.tag){case 0:case 11:case 15:Ue(128,0,c),Ue(0,64,c)}}catch(d){if(null===a)throw Error(n(330));Re(a,d)}c=a.nextEffect;a.nextEffect=null;a=c}T=b;F();return!0}function ng(a,b,c){b=Ne(c,b);b=jf(a,b,1073741823);Ic(a,b);a=Nf(a,1073741823);null!==a&&Z(a)}
function Re(a,b){if(3===a.tag)ng(a,a,b);else for(var c=a.return;null!==c;){if(3===c.tag){ng(c,a,b);break}else if(1===c.tag){var d=c.stateNode;if("function"===typeof c.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===nf||!nf.has(d))){a=Ne(b,a);a=mf(c,a,1073741823);Ic(c,a);c=Nf(c,1073741823);null!==c&&Z(c);break}}c=c.return}}
function fg(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);U===a&&W===c?X===xf||X===wf&&1073741823===Af&&E()-ff<Ff?Wf(a,W):Ef=!0:Sf(a,c)&&(b=a.lastPingedTime,0!==b&&b<c||(a.lastPingedTime=c,a.finishedExpirationTime===c&&(a.finishedExpirationTime=0,a.finishedWork=null),Z(a)))}function gf(a,b){var c=a.stateNode;null!==c&&c.delete(b);b=0;0===b&&(b=G(),b=Vc(b,a,null));a=Nf(a,b);null!==a&&Z(a)}var ig;
ig=function(a,b,c){var d=b.expirationTime;if(null!==a){var e=b.pendingProps;if(a.memoizedProps!==e||B.current)Bc=!0;else{if(d<c){Bc=!1;switch(b.tag){case 3:ze(b);oe();break;case 5:sd(b);if(b.mode&4&&1!==c&&Ka(b.type,e))return b.expirationTime=b.childExpirationTime=1,null;break;case 1:C(b.type)&&Kb(b);break;case 4:qd(b,b.stateNode.containerInfo);break;case 10:xc(b,b.memoizedProps.value);break;case 13:if(null!==b.memoizedState){d=b.child.childExpirationTime;if(0!==d&&d>=c)return Be(a,b,c);z(I,I.current&
1,b);b=re(a,b,c);return null!==b?b.sibling:null}z(I,I.current&1,b);break;case 19:d=b.childExpirationTime>=c;if(0!==(a.effectTag&64)){if(d)return Ee(a,b,c);b.effectTag|=64}e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null);z(I,I.current,b);if(!d)return null}return re(a,b,c)}Bc=!1}}else Bc=!1;b.expirationTime=0;switch(b.tag){case 2:d=b.type;null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2);a=b.pendingProps;e=Fb(b,A.current);Ac(b,c);e=Jd(null,b,d,a,e,c);b.effectTag|=1;if("object"===
typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof){b.tag=1;Nd();if(C(d)){var f=!0;Kb(b)}else f=!1;b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null;var g=d.getDerivedStateFromProps;"function"===typeof g&&Uc(b,d,g,a);e.updater=Xc;b.stateNode=e;e._reactInternalFiber=b;ad(b,d,a,c);b=ye(null,b,d,!0,f,c)}else b.tag=0,Q(null,b,e,c),b=b.child;return b;case 16:e=b.elementType;null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2);a=b.pendingProps;sa(e);if(1!==e._status)throw e._result;
e=e._result;b.type=e;f=b.tag=og(e);a=rc(e,a);switch(f){case 0:b=ve(null,b,e,a,c);break;case 1:b=xe(null,b,e,a,c);break;case 11:b=qe(null,b,e,a,c);break;case 14:b=se(null,b,e,rc(e.type,a),d,c);break;default:throw Error(n(306,e,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:rc(d,e),ve(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:rc(d,e),xe(a,b,d,e,c);case 3:ze(b);d=b.updateQueue;if(null===d)throw Error(n(282));e=b.memoizedState;e=null!==e?e.element:
null;Nc(b,d,b.pendingProps,null,c);d=b.memoizedState.element;if(d===e)oe(),b=re(a,b,c);else{if(e=b.stateNode.hydrate)Sa?(ee=tb(b.stateNode.containerInfo),de=b,e=fe=!0):e=!1;if(e)for(c=ld(b,null,d,c),b.child=c;c;)c.effectTag=c.effectTag&-3|1024,c=c.sibling;else Q(a,b,d,c),oe();b=b.child}return b;case 5:return sd(b),null===a&&je(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Ja(d,e)?g=null:null!==f&&Ja(d,f)&&(b.effectTag|=16),we(a,b),b.mode&4&&1!==c&&Ka(d,e)?(b.expirationTime=
b.childExpirationTime=1,b=null):(Q(a,b,g,c),b=b.child),b;case 6:return null===a&&je(b),null;case 13:return Be(a,b,c);case 4:return qd(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=kd(b,null,d,c):Q(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:rc(d,e),qe(a,b,d,e,c);case 7:return Q(a,b,b.pendingProps,c),b.child;case 8:return Q(a,b,b.pendingProps.children,c),b.child;case 12:return Q(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;
e=b.pendingProps;g=b.memoizedProps;f=e.value;xc(b,f);if(null!==g){var l=g.value;f=oc(l,f)?0:("function"===typeof d._calculateChangedBits?d._calculateChangedBits(l,f):1073741823)|0;if(0===f){if(g.children===e.children&&!B.current){b=re(a,b,c);break a}}else for(l=b.child,null!==l&&(l.return=b);null!==l;){var h=l.dependencies;if(null!==h){g=l.child;for(var k=h.firstContext;null!==k;){if(k.context===d&&0!==(k.observedBits&f)){1===l.tag&&(k=Gc(c,null),k.tag=2,Ic(l,k));l.expirationTime<c&&(l.expirationTime=
c);k=l.alternate;null!==k&&k.expirationTime<c&&(k.expirationTime=c);zc(l.return,c);h.expirationTime<c&&(h.expirationTime=c);break}k=k.next}}else g=10===l.tag?l.type===b.type?null:l.child:l.child;if(null!==g)g.return=l;else for(g=l;null!==g;){if(g===b){g=null;break}l=g.sibling;if(null!==l){l.return=g.return;g=l;break}g=g.return}l=g}}Q(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,f=b.pendingProps,d=f.children,Ac(b,c),e=Cc(e,f.unstable_observedBits),d=d(e),b.effectTag|=1,Q(a,b,d,c),b.child;
case 14:return e=b.type,f=rc(e,b.pendingProps),f=rc(e.type,f),se(a,b,e,f,d,c);case 15:return ue(a,b,b.type,b.pendingProps,d,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:rc(d,e),null!==a&&(a.alternate=null,b.alternate=null,b.effectTag|=2),b.tag=1,C(d)?(a=!0,Kb(b)):a=!1,Ac(b,c),Zc(b,d,e,c),ad(b,d,e,c),ye(null,b,d,!0,a,c);case 19:return Ee(a,b,c)}throw Error(n(156,b.tag));};var lg=null,We=null;
function pg(a){if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)return!0;try{var c=b.inject(a);lg=function(a){try{b.onCommitFiberRoot(c,a,void 0,64===(a.current.effectTag&64))}catch(e){}};We=function(a){try{b.onCommitFiberUnmount(c,a)}catch(e){}}}catch(d){}return!0}
function qg(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.effectTag=0;this.lastEffect=this.firstEffect=this.nextEffect=null;this.childExpirationTime=this.expirationTime=0;this.alternate=null}function he(a,b,c,d){return new qg(a,b,c,d)}
function te(a){a=a.prototype;return!(!a||!a.isReactComponent)}function og(a){if("function"===typeof a)return te(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===la)return 11;if(a===oa)return 14}return 2}
function fd(a,b){var c=a.alternate;null===c?(c=he(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.effectTag=0,c.nextEffect=null,c.firstEffect=null,c.lastEffect=null);c.childExpirationTime=a.childExpirationTime;c.expirationTime=a.expirationTime;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{expirationTime:b.expirationTime,
firstContext:b.firstContext,responders:b.responders};c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function hd(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)te(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ea:return jd(c.children,e,f,b);case ka:g=8;e|=7;break;case fa:g=8;e|=1;break;case ha:return a=he(12,c,b,e|8),a.elementType=ha,a.type=ha,a.expirationTime=f,a;case ma:return a=he(13,c,b,e),a.type=ma,a.elementType=ma,a.expirationTime=f,a;case na:return a=he(19,c,b,e),a.elementType=na,a.expirationTime=f,a;default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case ia:g=
10;break a;case ja:g=9;break a;case la:g=11;break a;case oa:g=14;break a;case pa:g=16;d=null;break a}throw Error(n(130,null==a?a:typeof a,""));}b=he(g,c,b,e);b.elementType=a;b.type=d;b.expirationTime=f;return b}function jd(a,b,c,d){a=he(7,a,d,b);a.expirationTime=c;return a}function gd(a,b,c){a=he(6,a,null,b);a.expirationTime=c;return a}
function id(a,b,c){b=he(4,null!==a.children?a.children:[],a.key,b);b.expirationTime=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function rg(a,b,c){this.tag=b;this.current=null;this.containerInfo=a;this.pingCache=this.pendingChildren=null;this.finishedExpirationTime=0;this.finishedWork=null;this.timeoutHandle=Oa;this.pendingContext=this.context=null;this.hydrate=c;this.callbackNode=null;this.callbackPriority=90;this.lastExpiredTime=this.lastPingedTime=this.nextKnownPendingLevel=this.lastSuspendedTime=this.firstSuspendedTime=this.firstPendingTime=0}
function Sf(a,b){var c=a.firstSuspendedTime;a=a.lastSuspendedTime;return 0!==c&&c>=b&&a<=b}function Pf(a,b){var c=a.firstSuspendedTime,d=a.lastSuspendedTime;c<b&&(a.firstSuspendedTime=b);if(d>b||0===c)a.lastSuspendedTime=b;b<=a.lastPingedTime&&(a.lastPingedTime=0);b<=a.lastExpiredTime&&(a.lastExpiredTime=0)}
function Qf(a,b){b>a.firstPendingTime&&(a.firstPendingTime=b);var c=a.firstSuspendedTime;0!==c&&(b>=c?a.firstSuspendedTime=a.lastSuspendedTime=a.nextKnownPendingLevel=0:b>=a.lastSuspendedTime&&(a.lastSuspendedTime=b+1),b>a.nextKnownPendingLevel&&(a.nextKnownPendingLevel=b))}function Uf(a,b){var c=a.lastExpiredTime;if(0===c||c>b)a.lastExpiredTime=b}
function sg(a){var b=a._reactInternalFiber;if(void 0===b){if("function"===typeof a.render)throw Error(n(188));throw Error(n(268,Object.keys(a)));}a=xa(b);return null===a?null:a.stateNode}function tg(a,b){a=a.memoizedState;null!==a&&null!==a.dehydrated&&a.retryTime<b&&(a.retryTime=b)}function ug(a,b){tg(a,b);(a=a.alternate)&&tg(a,b)}
var vg={createContainer:function(a,b,c){a=new rg(a,b,c);b=he(3,null,null,2===b?7:1===b?3:0);a.current=b;return b.stateNode=a},updateContainer:function(a,b,c,d){var e=b.current,f=G(),g=Sc.suspense;f=Vc(f,e,g);a:if(c){c=c._reactInternalFiber;b:{if(ua(c)!==c||1!==c.tag)throw Error(n(170));var l=c;do{switch(l.tag){case 3:l=l.stateNode.context;break b;case 1:if(C(l.type)){l=l.stateNode.__reactInternalMemoizedMergedChildContext;break b}}l=l.return}while(null!==l);throw Error(n(171));}if(1===c.tag){var h=
c.type;if(C(h)){c=Jb(c,h,l);break a}}c=l}else c=Db;null===b.context?b.context=c:b.pendingContext=c;b=Gc(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);Ic(e,b);Wc(e,f);return f},batchedEventUpdates:function(a,b){var c=T;T|=2;try{return a(b)}finally{T=c,T===R&&F()}},batchedUpdates:function(a,b){var c=T;T|=1;try{return a(b)}finally{T=c,T===R&&F()}},unbatchedUpdates:function(a,b){var c=T;T&=-2;T|=rf;try{return a(b)}finally{T=c,T===R&&F()}},deferredUpdates:function(a){return hc(97,
a)},syncUpdates:function(a,b,c,d){return hc(99,a.bind(null,b,c,d))},discreteUpdates:function(a,b,c,d){var e=T;T|=4;try{return hc(98,a.bind(null,b,c,d))}finally{T=e,T===R&&F()}},flushDiscreteUpdates:function(){(T&(1|S|sf))===R&&(dg(),Vf())},flushControlled:function(a){var b=T;T|=1;try{hc(99,a)}finally{T=b,T===R&&F()}},flushSync:eg,flushPassiveEffects:Vf,IsThisRendererActing:{current:!1},getPublicRootInstance:function(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return za(a.child.stateNode);
default:return a.child.stateNode}},attemptSynchronousHydration:function(a){switch(a.tag){case 3:var b=a.stateNode;b.hydrate&&cg(b,b.firstPendingTime);break;case 13:eg(function(){return Wc(a,1073741823)}),b=mc(G(),150,100),ug(a,b)}},attemptUserBlockingHydration:function(a){if(13===a.tag){var b=mc(G(),150,100);Wc(a,b);ug(a,b)}},attemptContinuousHydration:function(a){if(13===a.tag){G();var b=lc++;Wc(a,b);ug(a,b)}},attemptHydrationAtCurrentPriority:function(a){if(13===a.tag){var b=G();b=Vc(b,a,null);
Wc(a,b);ug(a,b)}},findHostInstance:sg,findHostInstanceWithWarning:function(a){return sg(a)},findHostInstanceWithNoPortals:function(a){a=ya(a);return null===a?null:20===a.tag?a.stateNode.instance:a.stateNode},shouldSuspend:function(){return!1},injectIntoDevTools:function(a){var b=a.findFiberByHostInstance;return pg(aa({},a,{overrideHookState:null,overrideProps:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:q.ReactCurrentDispatcher,findHostInstanceByFiber:function(a){a=xa(a);
return null===a?null:a.stateNode},findFiberByHostInstance:function(a){return b?b(a):null},findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null}))}};module.exports=vg.default||vg;

    var $$$renderer = module.exports;
    module.exports = $$$reconciler;
    return $$$renderer;
};


/***/ }),

/***/ 6525:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(7287);
} else {}


/***/ }),

/***/ 2546:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/** @license React v0.18.0
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

Object.defineProperty(exports, "__esModule", ({value:!0}));var f,g,h,k,l;
if("undefined"===typeof window||"function"!==typeof MessageChannel){var p=null,q=null,t=function(){if(null!==p)try{var a=exports.unstable_now();p(!0,a);p=null}catch(b){throw setTimeout(t,0),b;}},u=Date.now();exports.unstable_now=function(){return Date.now()-u};f=function(a){null!==p?setTimeout(f,0,a):(p=a,setTimeout(t,0))};g=function(a,b){q=setTimeout(a,b)};h=function(){clearTimeout(q)};k=function(){return!1};l=exports.unstable_forceFrameRate=function(){}}else{var w=window.performance,x=window.Date,
y=window.setTimeout,z=window.clearTimeout;if("undefined"!==typeof console){var A=window.cancelAnimationFrame;"function"!==typeof window.requestAnimationFrame&&console.error("This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills");"function"!==typeof A&&console.error("This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills")}if("object"===
typeof w&&"function"===typeof w.now)exports.unstable_now=function(){return w.now()};else{var B=x.now();exports.unstable_now=function(){return x.now()-B}}var C=!1,D=null,E=-1,F=5,G=0;k=function(){return exports.unstable_now()>=G};l=function(){};exports.unstable_forceFrameRate=function(a){0>a||125<a?console.error("forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"):F=0<a?Math.floor(1E3/a):5};var H=new MessageChannel,I=H.port2;H.port1.onmessage=
function(){if(null!==D){var a=exports.unstable_now();G=a+F;try{D(!0,a)?I.postMessage(null):(C=!1,D=null)}catch(b){throw I.postMessage(null),b;}}else C=!1};f=function(a){D=a;C||(C=!0,I.postMessage(null))};g=function(a,b){E=y(function(){a(exports.unstable_now())},b)};h=function(){z(E);E=-1}}function J(a,b){var c=a.length;a.push(b);a:for(;;){var d=Math.floor((c-1)/2),e=a[d];if(void 0!==e&&0<K(e,b))a[d]=b,a[c]=e,c=d;else break a}}function L(a){a=a[0];return void 0===a?null:a}
function M(a){var b=a[0];if(void 0!==b){var c=a.pop();if(c!==b){a[0]=c;a:for(var d=0,e=a.length;d<e;){var m=2*(d+1)-1,n=a[m],v=m+1,r=a[v];if(void 0!==n&&0>K(n,c))void 0!==r&&0>K(r,n)?(a[d]=r,a[v]=c,d=v):(a[d]=n,a[m]=c,d=m);else if(void 0!==r&&0>K(r,c))a[d]=r,a[v]=c,d=v;else break a}}return b}return null}function K(a,b){var c=a.sortIndex-b.sortIndex;return 0!==c?c:a.id-b.id}var N=[],O=[],P=1,Q=null,R=3,S=!1,T=!1,U=!1;
function V(a){for(var b=L(O);null!==b;){if(null===b.callback)M(O);else if(b.startTime<=a)M(O),b.sortIndex=b.expirationTime,J(N,b);else break;b=L(O)}}function W(a){U=!1;V(a);if(!T)if(null!==L(N))T=!0,f(X);else{var b=L(O);null!==b&&g(W,b.startTime-a)}}
function X(a,b){T=!1;U&&(U=!1,h());S=!0;var c=R;try{V(b);for(Q=L(N);null!==Q&&(!(Q.expirationTime>b)||a&&!k());){var d=Q.callback;if(null!==d){Q.callback=null;R=Q.priorityLevel;var e=d(Q.expirationTime<=b);b=exports.unstable_now();"function"===typeof e?Q.callback=e:Q===L(N)&&M(N);V(b)}else M(N);Q=L(N)}if(null!==Q)var m=!0;else{var n=L(O);null!==n&&g(W,n.startTime-b);m=!1}return m}finally{Q=null,R=c,S=!1}}
function Y(a){switch(a){case 1:return-1;case 2:return 250;case 5:return 1073741823;case 4:return 1E4;default:return 5E3}}var Z=l;exports.unstable_ImmediatePriority=1;exports.unstable_UserBlockingPriority=2;exports.unstable_NormalPriority=3;exports.unstable_IdlePriority=5;exports.unstable_LowPriority=4;exports.unstable_runWithPriority=function(a,b){switch(a){case 1:case 2:case 3:case 4:case 5:break;default:a=3}var c=R;R=a;try{return b()}finally{R=c}};
exports.unstable_next=function(a){switch(R){case 1:case 2:case 3:var b=3;break;default:b=R}var c=R;R=b;try{return a()}finally{R=c}};
exports.unstable_scheduleCallback=function(a,b,c){var d=exports.unstable_now();if("object"===typeof c&&null!==c){var e=c.delay;e="number"===typeof e&&0<e?d+e:d;c="number"===typeof c.timeout?c.timeout:Y(a)}else c=Y(a),e=d;c=e+c;a={id:P++,callback:b,priorityLevel:a,startTime:e,expirationTime:c,sortIndex:-1};e>d?(a.sortIndex=e,J(O,a),null===L(N)&&a===L(O)&&(U?h():U=!0,g(W,e-d))):(a.sortIndex=c,J(N,a),T||S||(T=!0,f(X)));return a};exports.unstable_cancelCallback=function(a){a.callback=null};
exports.unstable_wrapCallback=function(a){var b=R;return function(){var c=R;R=b;try{return a.apply(this,arguments)}finally{R=c}}};exports.unstable_getCurrentPriorityLevel=function(){return R};exports.unstable_shouldYield=function(){var a=exports.unstable_now();V(a);var b=L(N);return b!==Q&&null!==Q&&null!==b&&null!==b.callback&&b.startTime<=a&&b.expirationTime<Q.expirationTime||k()};exports.unstable_requestPaint=Z;exports.unstable_continueExecution=function(){T||S||(T=!0,f(X))};
exports.unstable_pauseExecution=function(){};exports.unstable_getFirstCallbackNode=function(){return L(N)};exports.unstable_Profiling=null;


/***/ }),

/***/ 373:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(2546);
} else {}


/***/ }),

/***/ 6585:
/***/ ((module) => {

module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ 9658:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var isarray = __webpack_require__(6585)

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var defaultDelimiter = options && options.delimiter || '/'
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    var next = str[index]
    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var modifier = res[6]
    var asterisk = res[7]

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var partial = prefix != null && next != null && next !== prefix
    var repeat = modifier === '+' || modifier === '*'
    var optional = modifier === '?' || modifier === '*'
    var delimiter = res[2] || defaultDelimiter
    var pattern = capture || group

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options), options)
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens, options) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$', flags(options))
    }
  }

  return function (obj, opts) {
    var path = ''
    var data = obj || {}
    var options = opts || {}
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options && options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = '(?:' + token.pattern + ')'

      keys.push(token)

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = prefix + '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  var delimiter = escapeString(options.delimiter || '/')
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)'
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options)
    keys = []
  }

  options = options || {}

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}


/***/ }),

/***/ 2408:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/** @license React v16.13.1
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var l=__webpack_require__(7418),n="function"===typeof Symbol&&Symbol.for,p=n?Symbol.for("react.element"):60103,q=n?Symbol.for("react.portal"):60106,r=n?Symbol.for("react.fragment"):60107,t=n?Symbol.for("react.strict_mode"):60108,u=n?Symbol.for("react.profiler"):60114,v=n?Symbol.for("react.provider"):60109,w=n?Symbol.for("react.context"):60110,x=n?Symbol.for("react.forward_ref"):60112,y=n?Symbol.for("react.suspense"):60113,z=n?Symbol.for("react.memo"):60115,A=n?Symbol.for("react.lazy"):
60116,B="function"===typeof Symbol&&Symbol.iterator;function C(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
var D={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},E={};function F(a,b,c){this.props=a;this.context=b;this.refs=E;this.updater=c||D}F.prototype.isReactComponent={};F.prototype.setState=function(a,b){if("object"!==typeof a&&"function"!==typeof a&&null!=a)throw Error(C(85));this.updater.enqueueSetState(this,a,b,"setState")};F.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};
function G(){}G.prototype=F.prototype;function H(a,b,c){this.props=a;this.context=b;this.refs=E;this.updater=c||D}var I=H.prototype=new G;I.constructor=H;l(I,F.prototype);I.isPureReactComponent=!0;var J={current:null},K=Object.prototype.hasOwnProperty,L={key:!0,ref:!0,__self:!0,__source:!0};
function M(a,b,c){var e,d={},g=null,k=null;if(null!=b)for(e in void 0!==b.ref&&(k=b.ref),void 0!==b.key&&(g=""+b.key),b)K.call(b,e)&&!L.hasOwnProperty(e)&&(d[e]=b[e]);var f=arguments.length-2;if(1===f)d.children=c;else if(1<f){for(var h=Array(f),m=0;m<f;m++)h[m]=arguments[m+2];d.children=h}if(a&&a.defaultProps)for(e in f=a.defaultProps,f)void 0===d[e]&&(d[e]=f[e]);return{$$typeof:p,type:a,key:g,ref:k,props:d,_owner:J.current}}
function N(a,b){return{$$typeof:p,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===p}function escape(a){var b={"=":"=0",":":"=2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g,Q=[];function R(a,b,c,e){if(Q.length){var d=Q.pop();d.result=a;d.keyPrefix=b;d.func=c;d.context=e;d.count=0;return d}return{result:a,keyPrefix:b,func:c,context:e,count:0}}
function S(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>Q.length&&Q.push(a)}
function T(a,b,c,e){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case p:case q:g=!0}}if(g)return c(e,a,""===b?"."+U(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var k=0;k<a.length;k++){d=a[k];var f=b+U(d,k);g+=T(d,f,c,e)}else if(null===a||"object"!==typeof a?f=null:(f=B&&a[B]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),k=
0;!(d=a.next()).done;)d=d.value,f=b+U(d,k++),g+=T(d,f,c,e);else if("object"===d)throw c=""+a,Error(C(31,"[object Object]"===c?"object with keys {"+Object.keys(a).join(", ")+"}":c,""));return g}function V(a,b,c){return null==a?0:T(a,"",b,c)}function U(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function W(a,b){a.func.call(a.context,b,a.count++)}
function aa(a,b,c){var e=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?X(a,e,c,function(a){return a}):null!=a&&(O(a)&&(a=N(a,d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(P,"$&/")+"/")+c)),e.push(a))}function X(a,b,c,e,d){var g="";null!=c&&(g=(""+c).replace(P,"$&/")+"/");b=R(b,g,e,d);V(a,aa,b);S(b)}var Y={current:null};function Z(){var a=Y.current;if(null===a)throw Error(C(321));return a}
var ba={ReactCurrentDispatcher:Y,ReactCurrentBatchConfig:{suspense:null},ReactCurrentOwner:J,IsSomeRendererActing:{current:!1},assign:l};exports.Children={map:function(a,b,c){if(null==a)return a;var e=[];X(a,e,null,b,c);return e},forEach:function(a,b,c){if(null==a)return a;b=R(null,null,b,c);V(a,W,b);S(b)},count:function(a){return V(a,function(){return null},null)},toArray:function(a){var b=[];X(a,b,null,function(a){return a});return b},only:function(a){if(!O(a))throw Error(C(143));return a}};
exports.Component=F;exports.Fragment=r;exports.Profiler=u;exports.PureComponent=H;exports.StrictMode=t;exports.Suspense=y;exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ba;
exports.cloneElement=function(a,b,c){if(null===a||void 0===a)throw Error(C(267,a));var e=l({},a.props),d=a.key,g=a.ref,k=a._owner;if(null!=b){void 0!==b.ref&&(g=b.ref,k=J.current);void 0!==b.key&&(d=""+b.key);if(a.type&&a.type.defaultProps)var f=a.type.defaultProps;for(h in b)K.call(b,h)&&!L.hasOwnProperty(h)&&(e[h]=void 0===b[h]&&void 0!==f?f[h]:b[h])}var h=arguments.length-2;if(1===h)e.children=c;else if(1<h){f=Array(h);for(var m=0;m<h;m++)f[m]=arguments[m+2];e.children=f}return{$$typeof:p,type:a.type,
key:d,ref:g,props:e,_owner:k}};exports.createContext=function(a,b){void 0===b&&(b=null);a={$$typeof:w,_calculateChangedBits:b,_currentValue:a,_currentValue2:a,_threadCount:0,Provider:null,Consumer:null};a.Provider={$$typeof:v,_context:a};return a.Consumer=a};exports.createElement=M;exports.createFactory=function(a){var b=M.bind(null,a);b.type=a;return b};exports.createRef=function(){return{current:null}};exports.forwardRef=function(a){return{$$typeof:x,render:a}};exports.isValidElement=O;
exports.lazy=function(a){return{$$typeof:A,_ctor:a,_status:-1,_result:null}};exports.memo=function(a,b){return{$$typeof:z,type:a,compare:void 0===b?null:b}};exports.useCallback=function(a,b){return Z().useCallback(a,b)};exports.useContext=function(a,b){return Z().useContext(a,b)};exports.useDebugValue=function(){};exports.useEffect=function(a,b){return Z().useEffect(a,b)};exports.useImperativeHandle=function(a,b,c){return Z().useImperativeHandle(a,b,c)};
exports.useLayoutEffect=function(a,b){return Z().useLayoutEffect(a,b)};exports.useMemo=function(a,b){return Z().useMemo(a,b)};exports.useReducer=function(a,b,c){return Z().useReducer(a,b,c)};exports.useRef=function(a){return Z().useRef(a)};exports.useState=function(a){return Z().useState(a)};exports.version="16.13.1";


/***/ }),

/***/ 7294:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (true) {
  module.exports = __webpack_require__(2408);
} else {}


/***/ }),

/***/ 9509:
/***/ ((module, exports, __webpack_require__) => {

/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(8764)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.prototype = Object.create(Buffer.prototype)

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),

/***/ 2830:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = (__webpack_require__(7187).EventEmitter);
var inherits = __webpack_require__(5717);

inherits(Stream, EE);
Stream.Readable = __webpack_require__(6577);
Stream.Writable = __webpack_require__(323);
Stream.Duplex = __webpack_require__(8656);
Stream.Transform = __webpack_require__(4473);
Stream.PassThrough = __webpack_require__(2366);
Stream.finished = __webpack_require__(1086)
Stream.pipeline = __webpack_require__(6472)

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


/***/ }),

/***/ 8106:
/***/ ((module) => {

"use strict";


function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

var codes = {};

function createErrorType(code, message, Base) {
  if (!Base) {
    Base = Error;
  }

  function getMessage(arg1, arg2, arg3) {
    if (typeof message === 'string') {
      return message;
    } else {
      return message(arg1, arg2, arg3);
    }
  }

  var NodeError =
  /*#__PURE__*/
  function (_Base) {
    _inheritsLoose(NodeError, _Base);

    function NodeError(arg1, arg2, arg3) {
      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
    }

    return NodeError;
  }(Base);

  NodeError.prototype.name = Base.name;
  NodeError.prototype.code = code;
  codes[code] = NodeError;
} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


function oneOf(expected, thing) {
  if (Array.isArray(expected)) {
    var len = expected.length;
    expected = expected.map(function (i) {
      return String(i);
    });

    if (len > 2) {
      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
    } else if (len === 2) {
      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
    } else {
      return "of ".concat(thing, " ").concat(expected[0]);
    }
  } else {
    return "of ".concat(thing, " ").concat(String(expected));
  }
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


function startsWith(str, search, pos) {
  return str.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


function endsWith(str, search, this_len) {
  if (this_len === undefined || this_len > str.length) {
    this_len = str.length;
  }

  return str.substring(this_len - search.length, this_len) === search;
} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


function includes(str, search, start) {
  if (typeof start !== 'number') {
    start = 0;
  }

  if (start + search.length > str.length) {
    return false;
  } else {
    return str.indexOf(search, start) !== -1;
  }
}

createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
  return 'The value "' + value + '" is invalid for option "' + name + '"';
}, TypeError);
createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
  // determiner: 'must be' or 'must not be'
  var determiner;

  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
    determiner = 'must not be';
    expected = expected.replace(/^not /, '');
  } else {
    determiner = 'must be';
  }

  var msg;

  if (endsWith(name, ' argument')) {
    // For cases like 'first argument'
    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  } else {
    var type = includes(name, '.') ? 'property' : 'argument';
    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
  }

  msg += ". Received type ".concat(typeof actual);
  return msg;
}, TypeError);
createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
  return 'The ' + name + ' method is not implemented';
});
createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
createErrorType('ERR_STREAM_DESTROYED', function (name) {
  return 'Cannot call ' + name + ' after a stream was destroyed';
});
createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
  return 'Unknown encoding: ' + arg;
}, TypeError);
createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
module.exports.q = codes;


/***/ }),

/***/ 8656:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.

/*<replacement>*/

var objectKeys = Object.keys || function (obj) {
  var keys = [];

  for (var key in obj) {
    keys.push(key);
  }

  return keys;
};
/*</replacement>*/


module.exports = Duplex;

var Readable = __webpack_require__(6577);

var Writable = __webpack_require__(323);

__webpack_require__(5717)(Duplex, Readable);

{
  // Allow the keys array to be GC'ed.
  var keys = objectKeys(Writable.prototype);

  for (var v = 0; v < keys.length; v++) {
    var method = keys[v];
    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
  }
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);
  Readable.call(this, options);
  Writable.call(this, options);
  this.allowHalfOpen = true;

  if (options) {
    if (options.readable === false) this.readable = false;
    if (options.writable === false) this.writable = false;

    if (options.allowHalfOpen === false) {
      this.allowHalfOpen = false;
      this.once('end', onend);
    }
  }
}

Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
});
Object.defineProperty(Duplex.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});
Object.defineProperty(Duplex.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
}); // the no-half-open enforcer

function onend() {
  // If the writable side ended, then we're ok.
  if (this._writableState.ended) return; // no more data can be written.
  // But allow more writes to happen in this tick.

  process.nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }

    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

/***/ }),

/***/ 2366:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.


module.exports = PassThrough;

var Transform = __webpack_require__(4473);

__webpack_require__(5717)(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);
  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),

/***/ 6577:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.


module.exports = Readable;
/*<replacement>*/

var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;
/*<replacement>*/

var EE = (__webpack_require__(7187).EventEmitter);

var EElistenerCount = function EElistenerCount(emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/


var Stream = __webpack_require__(3194);
/*</replacement>*/


var Buffer = (__webpack_require__(8764).Buffer);

var OurUint8Array = __webpack_require__.g.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*<replacement>*/


var debugUtil = __webpack_require__(964);

var debug;

if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function debug() {};
}
/*</replacement>*/


var BufferList = __webpack_require__(9686);

var destroyImpl = __webpack_require__(1029);

var _require = __webpack_require__(94),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = (__webpack_require__(8106)/* .codes */ .q),
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


var StringDecoder;
var createReadableStreamAsyncIterator;
var from;

__webpack_require__(5717)(Readable, Stream);

var errorOrDestroy = destroyImpl.errorOrDestroy;
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
  // userland ones.  NEVER DO THIS. This is here only because this code needs
  // to continue to work with older versions of Node.js that do not include
  // the prependListener() method. The goal is to eventually remove this hack.

  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
}

function ReadableState(options, stream, isDuplex) {
  Duplex = Duplex || __webpack_require__(8656);
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream.
  // These options can be provided separately as readableXXX and writableXXX.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"

  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()

  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.

  this.sync = true; // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.

  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;
  this.paused = true; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

  this.readingMore = false;
  this.decoder = null;
  this.encoding = null;

  if (options.encoding) {
    if (!StringDecoder) StringDecoder = (__webpack_require__(2553)/* .StringDecoder */ .s);
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(8656);
  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
  // the ReadableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  this._readableState = new ReadableState(options, this, isDuplex); // legacy

  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._readableState === undefined) {
      return false;
    }

    return this._readableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._readableState.destroyed = value;
  }
});
Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;

Readable.prototype._destroy = function (err, cb) {
  cb(err);
}; // Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.


Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;

      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }

      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
}; // Unshift should *always* be something directly out of read()


Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  debug('readableAddChunk', chunk);
  var state = stream._readableState;

  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

    if (er) {
      errorOrDestroy(stream, er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
      } else if (state.destroyed) {
        return false;
      } else {
        state.reading = false;

        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
      maybeReadMore(stream, state);
    }
  } // We can push more data if we are below the highWaterMark.
  // Also, if we have no data yet, we can stand some more bytes.
  // This is to work around cases where hwm=0, such as the repl.


  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    state.awaitDrain = 0;
    stream.emit('data', chunk);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
    if (state.needReadable) emitReadable(stream);
  }

  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;

  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
  }

  return er;
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
}; // backwards compatibility.


Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = (__webpack_require__(2553)/* .StringDecoder */ .s);
  var decoder = new StringDecoder(enc);
  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

  var p = this._readableState.buffer.head;
  var content = '';

  while (p !== null) {
    content += decoder.write(p.data);
    p = p.next;
  }

  this._readableState.buffer.clear();

  if (content !== '') this._readableState.buffer.push(content);
  this._readableState.length = content.length;
  return this;
}; // Don't raise the hwm > 1GB


var MAX_HWM = 0x40000000;

function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }

  return n;
} // This function is designed to be inlinable, so please take care when making
// changes to the function body.


function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;

  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  } // If we're asking for more than the current hwm, then raise the hwm.


  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n; // Don't have enough

  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }

  return state.length;
} // you can override either this method, or the async _read(n) below.


Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;
  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.

  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  } // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.
  // if we need a readable event, then we need to do some reading.


  var doRead = state.needReadable;
  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  } // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.


  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true; // if the length is currently zero, then we *need* a readable event.

    if (state.length === 0) state.needReadable = true; // call internal read method

    this._read(state.highWaterMark);

    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.

    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = state.length <= state.highWaterMark;
    n = 0;
  } else {
    state.length -= n;
    state.awaitDrain = 0;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);
  return ret;
};

function onEofChunk(stream, state) {
  debug('onEofChunk');
  if (state.ended) return;

  if (state.decoder) {
    var chunk = state.decoder.end();

    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }

  state.ended = true;

  if (state.sync) {
    // if we are sync, wait until next tick to emit the data.
    // Otherwise we risk emitting data in the flow()
    // the readable code triggers during a read() call
    emitReadable(stream);
  } else {
    // emit 'readable' now to make sure it gets picked up.
    state.needReadable = false;

    if (!state.emittedReadable) {
      state.emittedReadable = true;
      emitReadable_(stream);
    }
  }
} // Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.


function emitReadable(stream) {
  var state = stream._readableState;
  debug('emitReadable', state.needReadable, state.emittedReadable);
  state.needReadable = false;

  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    process.nextTick(emitReadable_, stream);
  }
}

function emitReadable_(stream) {
  var state = stream._readableState;
  debug('emitReadable_', state.destroyed, state.length, state.ended);

  if (!state.destroyed && (state.length || state.ended)) {
    stream.emit('readable');
    state.emittedReadable = false;
  } // The stream needs another readable event if
  // 1. It is not flowing, as the flow mechanism will take
  //    care of it.
  // 2. It is not ended.
  // 3. It is below the highWaterMark, so we can schedule
  //    another readable later.


  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
  flow(stream);
} // at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.


function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    process.nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  // Attempt to read more data if we should.
  //
  // The conditions for reading more data are (one of):
  // - Not enough data buffered (state.length < state.highWaterMark). The loop
  //   is responsible for filling the buffer with enough data if such data
  //   is available. If highWaterMark is 0 and we are not in the flowing mode
  //   we should _not_ attempt to buffer any extra data. We'll get more data
  //   when the stream consumer calls read() instead.
  // - No data in the buffer, and the stream is in flowing mode. In this mode
  //   the loop below is responsible for ensuring read() is called. Failing to
  //   call read here would abort the flow and there's no other mechanism for
  //   continuing the flow if the stream consumer has just subscribed to the
  //   'data' event.
  //
  // In addition to the above conditions to keep reading data, the following
  // conditions prevent the data from being read:
  // - The stream has ended (state.ended).
  // - There is already a pending 'read' operation (state.reading). This is a
  //   case where the the stream has called the implementation defined _read()
  //   method, but they are processing the call asynchronously and have _not_
  //   called push() with new data. In this case we skip performing more
  //   read()s. The execution ends in this method again after the _read() ends
  //   up calling push() with more data.
  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
    var len = state.length;
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length) // didn't get any data, stop spinning.
      break;
  }

  state.readingMore = false;
} // abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.


Readable.prototype._read = function (n) {
  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;

    case 1:
      state.pipes = [state.pipes, dest];
      break;

    default:
      state.pipes.push(dest);
      break;
  }

  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
  dest.on('unpipe', onunpipe);

  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');

    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  } // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.


  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);
  var cleanedUp = false;

  function cleanup() {
    debug('cleanup'); // cleanup event handlers once the pipe is broken

    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);
    cleanedUp = true; // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.

    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  src.on('data', ondata);

  function ondata(chunk) {
    debug('ondata');
    var ret = dest.write(chunk);
    debug('dest.write', ret);

    if (ret === false) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', state.awaitDrain);
        state.awaitDrain++;
      }

      src.pause();
    }
  } // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.


  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
  } // Make sure our error handler is attached before userland ones.


  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }

  dest.once('close', onclose);

  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }

  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  } // tell the dest that it's being piped to


  dest.emit('pipe', src); // start the flow if it hasn't been started already.

  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function pipeOnDrainFunctionResult() {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;

    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = {
    hasUnpiped: false
  }; // if we're not piping anywhere, then do nothing.

  if (state.pipesCount === 0) return this; // just one destination.  most common case.

  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;
    if (!dest) dest = state.pipes; // got a match.

    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  } // slow case. multiple pipe destinations.


  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, {
        hasUnpiped: false
      });
    }

    return this;
  } // try to find the right one.


  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;
  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];
  dest.emit('unpipe', this, unpipeInfo);
  return this;
}; // set up data events if they are asked for
// Ensure readable listeners eventually get something


Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);
  var state = this._readableState;

  if (ev === 'data') {
    // update readableListening so that resume() may be a no-op
    // a few lines down. This is needed to support once('readable').
    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

    if (state.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.flowing = false;
      state.emittedReadable = false;
      debug('on readable', state.length, state.reading);

      if (state.length) {
        emitReadable(this);
      } else if (!state.reading) {
        process.nextTick(nReadingNextTick, this);
      }
    }
  }

  return res;
};

Readable.prototype.addListener = Readable.prototype.on;

Readable.prototype.removeListener = function (ev, fn) {
  var res = Stream.prototype.removeListener.call(this, ev, fn);

  if (ev === 'readable') {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

Readable.prototype.removeAllListeners = function (ev) {
  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

  if (ev === 'readable' || ev === undefined) {
    // We need to check if there is someone still listening to
    // readable and reset the state. However this needs to happen
    // after readable has been emitted but before I/O (nextTick) to
    // support once('readable', fn) cycles. This means that calling
    // resume within the same tick will have no
    // effect.
    process.nextTick(updateReadableListening, this);
  }

  return res;
};

function updateReadableListening(self) {
  var state = self._readableState;
  state.readableListening = self.listenerCount('readable') > 0;

  if (state.resumeScheduled && !state.paused) {
    // flowing needs to be set to true now, otherwise
    // the upcoming resume will not flow.
    state.flowing = true; // crude way to check if we should resume
  } else if (self.listenerCount('data') > 0) {
    self.resume();
  }
}

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
} // pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.


Readable.prototype.resume = function () {
  var state = this._readableState;

  if (!state.flowing) {
    debug('resume'); // we flow only if there is no one listening
    // for readable, but we still have to call
    // resume()

    state.flowing = !state.readableListening;
    resume(this, state);
  }

  state.paused = false;
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    process.nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  debug('resume', state.reading);

  if (!state.reading) {
    stream.read(0);
  }

  state.resumeScheduled = false;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);

  if (this._readableState.flowing !== false) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }

  this._readableState.paused = true;
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);

  while (state.flowing && stream.read() !== null) {
    ;
  }
} // wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.


Readable.prototype.wrap = function (stream) {
  var _this = this;

  var state = this._readableState;
  var paused = false;
  stream.on('end', function () {
    debug('wrapped end');

    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) _this.push(chunk);
    }

    _this.push(null);
  });
  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = _this.push(chunk);

    if (!ret) {
      paused = true;
      stream.pause();
    }
  }); // proxy all the other methods.
  // important when wrapping filters and duplexes.

  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function methodWrap(method) {
        return function methodWrapReturnFunction() {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  } // proxy certain important events.


  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
  } // when we try to consume some more bytes, simply unpause the
  // underlying stream.


  this._read = function (n) {
    debug('wrapped _read', n);

    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return this;
};

if (typeof Symbol === 'function') {
  Readable.prototype[Symbol.asyncIterator] = function () {
    if (createReadableStreamAsyncIterator === undefined) {
      createReadableStreamAsyncIterator = __webpack_require__(828);
    }

    return createReadableStreamAsyncIterator(this);
  };
}

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.highWaterMark;
  }
});
Object.defineProperty(Readable.prototype, 'readableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState && this._readableState.buffer;
  }
});
Object.defineProperty(Readable.prototype, 'readableFlowing', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.flowing;
  },
  set: function set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
}); // exposed for testing purposes only.

Readable._fromList = fromList;
Object.defineProperty(Readable.prototype, 'readableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._readableState.length;
  }
}); // Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.

function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;
  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = state.buffer.consume(n, state.decoder);
  }
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;
  debug('endReadable', state.endEmitted);

  if (!state.endEmitted) {
    state.ended = true;
    process.nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');

    if (state.autoDestroy) {
      // In case of duplex streams we need a way to detect
      // if the writable side is ready for autoDestroy as well
      var wState = stream._writableState;

      if (!wState || wState.autoDestroy && wState.finished) {
        stream.destroy();
      }
    }
  }
}

if (typeof Symbol === 'function') {
  Readable.from = function (iterable, opts) {
    if (from === undefined) {
      from = __webpack_require__(1265);
    }

    return from(Readable, iterable, opts);
  };
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }

  return -1;
}

/***/ }),

/***/ 4473:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.


module.exports = Transform;

var _require$codes = (__webpack_require__(8106)/* .codes */ .q),
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

var Duplex = __webpack_require__(8656);

__webpack_require__(5717)(Transform, Duplex);

function afterTransform(er, data) {
  var ts = this._transformState;
  ts.transforming = false;
  var cb = ts.writecb;

  if (cb === null) {
    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
  }

  ts.writechunk = null;
  ts.writecb = null;
  if (data != null) // single equals check for both `null` and `undefined`
    this.push(data);
  cb(er);
  var rs = this._readableState;
  rs.reading = false;

  if (rs.needReadable || rs.length < rs.highWaterMark) {
    this._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);
  Duplex.call(this, options);
  this._transformState = {
    afterTransform: afterTransform.bind(this),
    needTransform: false,
    transforming: false,
    writecb: null,
    writechunk: null,
    writeencoding: null
  }; // start out asking for a readable event once data is transformed.

  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.

  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;
    if (typeof options.flush === 'function') this._flush = options.flush;
  } // When the writable side finishes, then flush out anything remaining.


  this.on('prefinish', prefinish);
}

function prefinish() {
  var _this = this;

  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
    this._flush(function (er, data) {
      done(_this, er, data);
    });
  } else {
    done(this, null, null);
  }
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
}; // This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.


Transform.prototype._transform = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;

  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
}; // Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.


Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && !ts.transforming) {
    ts.transforming = true;

    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);
  if (data != null) // single equals check for both `null` and `undefined`
    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided

  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
  return stream.push(null);
}

/***/ }),

/***/ 323:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.


module.exports = Writable;
/* <replacement> */

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
} // It seems a linked list but it is not
// there will be only 2 of these for each stream


function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/


var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;
/*<replacement>*/

var internalUtil = {
  deprecate: __webpack_require__(4927)
};
/*</replacement>*/

/*<replacement>*/

var Stream = __webpack_require__(3194);
/*</replacement>*/


var Buffer = (__webpack_require__(8764).Buffer);

var OurUint8Array = __webpack_require__.g.Uint8Array || function () {};

function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}

function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}

var destroyImpl = __webpack_require__(1029);

var _require = __webpack_require__(94),
    getHighWaterMark = _require.getHighWaterMark;

var _require$codes = (__webpack_require__(8106)/* .codes */ .q),
    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

var errorOrDestroy = destroyImpl.errorOrDestroy;

__webpack_require__(5717)(Writable, Stream);

function nop() {}

function WritableState(options, stream, isDuplex) {
  Duplex = Duplex || __webpack_require__(8656);
  options = options || {}; // Duplex streams are both readable and writable, but share
  // the same options object.
  // However, some cases require setting options to different
  // values for the readable and the writable sides of the duplex stream,
  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
  // contains buffers or objects.

  this.objectMode = !!options.objectMode;
  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()

  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

  this.finalCalled = false; // drain event flag.

  this.needDrain = false; // at the start of calling end()

  this.ending = false; // when end() has been called, and returned

  this.ended = false; // when 'finish' is emitted

  this.finished = false; // has it been destroyed

  this.destroyed = false; // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.

  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.

  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.

  this.length = 0; // a flag to see when we're in the middle of a write.

  this.writing = false; // when true all writes will be buffered until .uncork() call

  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.

  this.sync = true; // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.

  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

  this.onwrite = function (er) {
    onwrite(stream, er);
  }; // the callback that the user supplies to write(chunk,encoding,cb)


  this.writecb = null; // the amount that is being written when _write is called.

  this.writelen = 0;
  this.bufferedRequest = null;
  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted

  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams

  this.prefinished = false; // True if the error was already emitted and should not be thrown again

  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

  this.autoDestroy = !!options.autoDestroy; // count buffered requests

  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two

  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];

  while (current) {
    out.push(current);
    current = current.next;
  }

  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function writableStateBufferGetter() {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})(); // Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.


var realHasInstance;

if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function value(object) {
      if (realHasInstance.call(this, object)) return true;
      if (this !== Writable) return false;
      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function realHasInstance(object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(8656); // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.
  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  // Checking for a Stream.Duplex instance is faster here instead of inside
  // the WritableState constructor, at least with V8 6.5

  var isDuplex = this instanceof Duplex;
  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
  this._writableState = new WritableState(options, this, isDuplex); // legacy.

  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;
    if (typeof options.writev === 'function') this._writev = options.writev;
    if (typeof options.destroy === 'function') this._destroy = options.destroy;
    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
} // Otherwise people can pipe Writable streams, which is just wrong.


Writable.prototype.pipe = function () {
  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
};

function writeAfterEnd(stream, cb) {
  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

  errorOrDestroy(stream, er);
  process.nextTick(cb, er);
} // Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.


function validChunk(stream, state, chunk, cb) {
  var er;

  if (chunk === null) {
    er = new ERR_STREAM_NULL_VALUES();
  } else if (typeof chunk !== 'string' && !state.objectMode) {
    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
  }

  if (er) {
    errorOrDestroy(stream, er);
    process.nextTick(cb, er);
    return false;
  }

  return true;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  var isBuf = !state.objectMode && _isUint8Array(chunk);

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
  if (typeof cb !== 'function') cb = nop;
  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }
  return ret;
};

Writable.prototype.cork = function () {
  this._writableState.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;
    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

Object.defineProperty(Writable.prototype, 'writableBuffer', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState && this._writableState.getBuffer();
  }
});

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }

  return chunk;
}

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.highWaterMark;
  }
}); // if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.

function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);

    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }

  var len = state.objectMode ? 1 : chunk.length;
  state.length += len;
  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };

    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }

    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    process.nextTick(cb, er); // this can emit finish, and it will always happen
    // after error

    process.nextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    errorOrDestroy(stream, er); // this can emit finish, but finish must
    // always follow error

    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;
  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
  onwriteStateUpdate(state);
  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state) || stream.destroyed;

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      process.nextTick(afterWrite, stream, state, finished, cb);
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
} // Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.


function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
} // if there's something in the buffer waiting, then process it


function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;
    var count = 0;
    var allBuffers = true;

    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }

    buffer.allBuffers = allBuffers;
    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite

    state.pendingcb++;
    state.lastBufferedRequest = null;

    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }

    state.bufferedRequestCount = 0;
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;
      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.

      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

  if (state.corked) {
    state.corked = 1;
    this.uncork();
  } // ignore unnecessary end() calls.


  if (!state.ending) endWritable(this, state, cb);
  return this;
};

Object.defineProperty(Writable.prototype, 'writableLength', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    return this._writableState.length;
  }
});

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;

    if (err) {
      errorOrDestroy(stream, err);
    }

    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}

function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function' && !state.destroyed) {
      state.pendingcb++;
      state.finalCalled = true;
      process.nextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);

  if (need) {
    prefinish(stream, state);

    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');

      if (state.autoDestroy) {
        // In case of duplex streams we need a way to detect
        // if the readable side is ready for autoDestroy as well
        var rState = stream._readableState;

        if (!rState || rState.autoDestroy && rState.endEmitted) {
          stream.destroy();
        }
      }
    }
  }

  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);

  if (cb) {
    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
  }

  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;

  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  } // reuse the free corkReq.


  state.corkedRequestsFree.next = corkReq;
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  // making it explicit this property is not enumerable
  // because otherwise some prototype manipulation in
  // userland will fail
  enumerable: false,
  get: function get() {
    if (this._writableState === undefined) {
      return false;
    }

    return this._writableState.destroyed;
  },
  set: function set(value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    } // backward compatibility, the user is explicitly
    // managing destroyed


    this._writableState.destroyed = value;
  }
});
Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;

Writable.prototype._destroy = function (err, cb) {
  cb(err);
};

/***/ }),

/***/ 828:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var _Object$setPrototypeO;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var finished = __webpack_require__(1086);

var kLastResolve = Symbol('lastResolve');
var kLastReject = Symbol('lastReject');
var kError = Symbol('error');
var kEnded = Symbol('ended');
var kLastPromise = Symbol('lastPromise');
var kHandlePromise = Symbol('handlePromise');
var kStream = Symbol('stream');

function createIterResult(value, done) {
  return {
    value: value,
    done: done
  };
}

function readAndResolve(iter) {
  var resolve = iter[kLastResolve];

  if (resolve !== null) {
    var data = iter[kStream].read(); // we defer if data is null
    // we can be expecting either 'end' or
    // 'error'

    if (data !== null) {
      iter[kLastPromise] = null;
      iter[kLastResolve] = null;
      iter[kLastReject] = null;
      resolve(createIterResult(data, false));
    }
  }
}

function onReadable(iter) {
  // we wait for the next tick, because it might
  // emit an error with process.nextTick
  process.nextTick(readAndResolve, iter);
}

function wrapForNext(lastPromise, iter) {
  return function (resolve, reject) {
    lastPromise.then(function () {
      if (iter[kEnded]) {
        resolve(createIterResult(undefined, true));
        return;
      }

      iter[kHandlePromise](resolve, reject);
    }, reject);
  };
}

var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
  get stream() {
    return this[kStream];
  },

  next: function next() {
    var _this = this;

    // if we have detected an error in the meanwhile
    // reject straight away
    var error = this[kError];

    if (error !== null) {
      return Promise.reject(error);
    }

    if (this[kEnded]) {
      return Promise.resolve(createIterResult(undefined, true));
    }

    if (this[kStream].destroyed) {
      // We need to defer via nextTick because if .destroy(err) is
      // called, the error will be emitted via nextTick, and
      // we cannot guarantee that there is no error lingering around
      // waiting to be emitted.
      return new Promise(function (resolve, reject) {
        process.nextTick(function () {
          if (_this[kError]) {
            reject(_this[kError]);
          } else {
            resolve(createIterResult(undefined, true));
          }
        });
      });
    } // if we have multiple next() calls
    // we will wait for the previous Promise to finish
    // this logic is optimized to support for await loops,
    // where next() is only called once at a time


    var lastPromise = this[kLastPromise];
    var promise;

    if (lastPromise) {
      promise = new Promise(wrapForNext(lastPromise, this));
    } else {
      // fast path needed to support multiple this.push()
      // without triggering the next() queue
      var data = this[kStream].read();

      if (data !== null) {
        return Promise.resolve(createIterResult(data, false));
      }

      promise = new Promise(this[kHandlePromise]);
    }

    this[kLastPromise] = promise;
    return promise;
  }
}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
  return this;
}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
  var _this2 = this;

  // destroy(err, cb) is a private API
  // we can guarantee we have that here, because we control the
  // Readable class this is attached to
  return new Promise(function (resolve, reject) {
    _this2[kStream].destroy(null, function (err) {
      if (err) {
        reject(err);
        return;
      }

      resolve(createIterResult(undefined, true));
    });
  });
}), _Object$setPrototypeO), AsyncIteratorPrototype);

var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
  var _Object$create;

  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
    value: stream,
    writable: true
  }), _defineProperty(_Object$create, kLastResolve, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kLastReject, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kError, {
    value: null,
    writable: true
  }), _defineProperty(_Object$create, kEnded, {
    value: stream._readableState.endEmitted,
    writable: true
  }), _defineProperty(_Object$create, kHandlePromise, {
    value: function value(resolve, reject) {
      var data = iterator[kStream].read();

      if (data) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        resolve(createIterResult(data, false));
      } else {
        iterator[kLastResolve] = resolve;
        iterator[kLastReject] = reject;
      }
    },
    writable: true
  }), _Object$create));
  iterator[kLastPromise] = null;
  finished(stream, function (err) {
    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
      // returned by next() and store the error

      if (reject !== null) {
        iterator[kLastPromise] = null;
        iterator[kLastResolve] = null;
        iterator[kLastReject] = null;
        reject(err);
      }

      iterator[kError] = err;
      return;
    }

    var resolve = iterator[kLastResolve];

    if (resolve !== null) {
      iterator[kLastPromise] = null;
      iterator[kLastResolve] = null;
      iterator[kLastReject] = null;
      resolve(createIterResult(undefined, true));
    }

    iterator[kEnded] = true;
  });
  stream.on('readable', onReadable.bind(null, iterator));
  return iterator;
};

module.exports = createReadableStreamAsyncIterator;

/***/ }),

/***/ 9686:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _require = __webpack_require__(8764),
    Buffer = _require.Buffer;

var _require2 = __webpack_require__(9862),
    inspect = _require2.inspect;

var custom = inspect && inspect.custom || 'inspect';

function copyBuffer(src, target, offset) {
  Buffer.prototype.copy.call(src, target, offset);
}

module.exports =
/*#__PURE__*/
function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  _createClass(BufferList, [{
    key: "push",
    value: function push(v) {
      var entry = {
        data: v,
        next: null
      };
      if (this.length > 0) this.tail.next = entry;else this.head = entry;
      this.tail = entry;
      ++this.length;
    }
  }, {
    key: "unshift",
    value: function unshift(v) {
      var entry = {
        data: v,
        next: this.head
      };
      if (this.length === 0) this.tail = entry;
      this.head = entry;
      ++this.length;
    }
  }, {
    key: "shift",
    value: function shift() {
      if (this.length === 0) return;
      var ret = this.head.data;
      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
      --this.length;
      return ret;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.head = this.tail = null;
      this.length = 0;
    }
  }, {
    key: "join",
    value: function join(s) {
      if (this.length === 0) return '';
      var p = this.head;
      var ret = '' + p.data;

      while (p = p.next) {
        ret += s + p.data;
      }

      return ret;
    }
  }, {
    key: "concat",
    value: function concat(n) {
      if (this.length === 0) return Buffer.alloc(0);
      var ret = Buffer.allocUnsafe(n >>> 0);
      var p = this.head;
      var i = 0;

      while (p) {
        copyBuffer(p.data, ret, i);
        i += p.data.length;
        p = p.next;
      }

      return ret;
    } // Consumes a specified amount of bytes or characters from the buffered data.

  }, {
    key: "consume",
    value: function consume(n, hasStrings) {
      var ret;

      if (n < this.head.data.length) {
        // `slice` is the same for buffers and strings.
        ret = this.head.data.slice(0, n);
        this.head.data = this.head.data.slice(n);
      } else if (n === this.head.data.length) {
        // First chunk is a perfect match.
        ret = this.shift();
      } else {
        // Result spans more than one buffer.
        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
      }

      return ret;
    }
  }, {
    key: "first",
    value: function first() {
      return this.head.data;
    } // Consumes a specified amount of characters from the buffered data.

  }, {
    key: "_getString",
    value: function _getString(n) {
      var p = this.head;
      var c = 1;
      var ret = p.data;
      n -= ret.length;

      while (p = p.next) {
        var str = p.data;
        var nb = n > str.length ? str.length : n;
        if (nb === str.length) ret += str;else ret += str.slice(0, n);
        n -= nb;

        if (n === 0) {
          if (nb === str.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = str.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Consumes a specified amount of bytes from the buffered data.

  }, {
    key: "_getBuffer",
    value: function _getBuffer(n) {
      var ret = Buffer.allocUnsafe(n);
      var p = this.head;
      var c = 1;
      p.data.copy(ret);
      n -= p.data.length;

      while (p = p.next) {
        var buf = p.data;
        var nb = n > buf.length ? buf.length : n;
        buf.copy(ret, ret.length - n, 0, nb);
        n -= nb;

        if (n === 0) {
          if (nb === buf.length) {
            ++c;
            if (p.next) this.head = p.next;else this.head = this.tail = null;
          } else {
            this.head = p;
            p.data = buf.slice(nb);
          }

          break;
        }

        ++c;
      }

      this.length -= c;
      return ret;
    } // Make sure the linked list only shows the minimal necessary information.

  }, {
    key: custom,
    value: function value(_, options) {
      return inspect(this, _objectSpread({}, options, {
        // Only inspect one level.
        depth: 0,
        // It should not recurse.
        customInspect: false
      }));
    }
  }]);

  return BufferList;
}();

/***/ }),

/***/ 1029:
/***/ ((module) => {

"use strict";
 // undocumented cb() API, needed for core, not for public API

function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err) {
      if (!this._writableState) {
        process.nextTick(emitErrorNT, this, err);
      } else if (!this._writableState.errorEmitted) {
        this._writableState.errorEmitted = true;
        process.nextTick(emitErrorNT, this, err);
      }
    }

    return this;
  } // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks


  if (this._readableState) {
    this._readableState.destroyed = true;
  } // if this is a duplex stream mark the writable part as destroyed as well


  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      if (!_this._writableState) {
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else if (!_this._writableState.errorEmitted) {
        _this._writableState.errorEmitted = true;
        process.nextTick(emitErrorAndCloseNT, _this, err);
      } else {
        process.nextTick(emitCloseNT, _this);
      }
    } else if (cb) {
      process.nextTick(emitCloseNT, _this);
      cb(err);
    } else {
      process.nextTick(emitCloseNT, _this);
    }
  });

  return this;
}

function emitErrorAndCloseNT(self, err) {
  emitErrorNT(self, err);
  emitCloseNT(self);
}

function emitCloseNT(self) {
  if (self._writableState && !self._writableState.emitClose) return;
  if (self._readableState && !self._readableState.emitClose) return;
  self.emit('close');
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finalCalled = false;
    this._writableState.prefinished = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

function errorOrDestroy(stream, err) {
  // We have tests that rely on errors being emitted
  // in the same tick, so changing this is semver major.
  // For now when you opt-in to autoDestroy we allow
  // the error to be emitted nextTick. In a future
  // semver major update we should change the default to this.
  var rState = stream._readableState;
  var wState = stream._writableState;
  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy,
  errorOrDestroy: errorOrDestroy
};

/***/ }),

/***/ 1086:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Ported from https://github.com/mafintosh/end-of-stream with
// permission from the author, Mathias Buus (@mafintosh).


var ERR_STREAM_PREMATURE_CLOSE = (__webpack_require__(8106)/* .codes.ERR_STREAM_PREMATURE_CLOSE */ .q.ERR_STREAM_PREMATURE_CLOSE);

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    callback.apply(this, args);
  };
}

function noop() {}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function eos(stream, opts, callback) {
  if (typeof opts === 'function') return eos(stream, null, opts);
  if (!opts) opts = {};
  callback = once(callback || noop);
  var readable = opts.readable || opts.readable !== false && stream.readable;
  var writable = opts.writable || opts.writable !== false && stream.writable;

  var onlegacyfinish = function onlegacyfinish() {
    if (!stream.writable) onfinish();
  };

  var writableEnded = stream._writableState && stream._writableState.finished;

  var onfinish = function onfinish() {
    writable = false;
    writableEnded = true;
    if (!readable) callback.call(stream);
  };

  var readableEnded = stream._readableState && stream._readableState.endEmitted;

  var onend = function onend() {
    readable = false;
    readableEnded = true;
    if (!writable) callback.call(stream);
  };

  var onerror = function onerror(err) {
    callback.call(stream, err);
  };

  var onclose = function onclose() {
    var err;

    if (readable && !readableEnded) {
      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }

    if (writable && !writableEnded) {
      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
      return callback.call(stream, err);
    }
  };

  var onrequest = function onrequest() {
    stream.req.on('finish', onfinish);
  };

  if (isRequest(stream)) {
    stream.on('complete', onfinish);
    stream.on('abort', onclose);
    if (stream.req) onrequest();else stream.on('request', onrequest);
  } else if (writable && !stream._writableState) {
    // legacy streams
    stream.on('end', onlegacyfinish);
    stream.on('close', onlegacyfinish);
  }

  stream.on('end', onend);
  stream.on('finish', onfinish);
  if (opts.error !== false) stream.on('error', onerror);
  stream.on('close', onclose);
  return function () {
    stream.removeListener('complete', onfinish);
    stream.removeListener('abort', onclose);
    stream.removeListener('request', onrequest);
    if (stream.req) stream.req.removeListener('finish', onfinish);
    stream.removeListener('end', onlegacyfinish);
    stream.removeListener('close', onlegacyfinish);
    stream.removeListener('finish', onfinish);
    stream.removeListener('end', onend);
    stream.removeListener('error', onerror);
    stream.removeListener('close', onclose);
  };
}

module.exports = eos;

/***/ }),

/***/ 1265:
/***/ ((module) => {

module.exports = function () {
  throw new Error('Readable.from is not available in the browser')
};


/***/ }),

/***/ 6472:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
// Ported from https://github.com/mafintosh/pump with
// permission from the author, Mathias Buus (@mafintosh).


var eos;

function once(callback) {
  var called = false;
  return function () {
    if (called) return;
    called = true;
    callback.apply(void 0, arguments);
  };
}

var _require$codes = (__webpack_require__(8106)/* .codes */ .q),
    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

function noop(err) {
  // Rethrow the error if it exists to avoid swallowing it
  if (err) throw err;
}

function isRequest(stream) {
  return stream.setHeader && typeof stream.abort === 'function';
}

function destroyer(stream, reading, writing, callback) {
  callback = once(callback);
  var closed = false;
  stream.on('close', function () {
    closed = true;
  });
  if (eos === undefined) eos = __webpack_require__(1086);
  eos(stream, {
    readable: reading,
    writable: writing
  }, function (err) {
    if (err) return callback(err);
    closed = true;
    callback();
  });
  var destroyed = false;
  return function (err) {
    if (closed) return;
    if (destroyed) return;
    destroyed = true; // request.destroy just do .end - .abort is what we want

    if (isRequest(stream)) return stream.abort();
    if (typeof stream.destroy === 'function') return stream.destroy();
    callback(err || new ERR_STREAM_DESTROYED('pipe'));
  };
}

function call(fn) {
  fn();
}

function pipe(from, to) {
  return from.pipe(to);
}

function popCallback(streams) {
  if (!streams.length) return noop;
  if (typeof streams[streams.length - 1] !== 'function') return noop;
  return streams.pop();
}

function pipeline() {
  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
    streams[_key] = arguments[_key];
  }

  var callback = popCallback(streams);
  if (Array.isArray(streams[0])) streams = streams[0];

  if (streams.length < 2) {
    throw new ERR_MISSING_ARGS('streams');
  }

  var error;
  var destroys = streams.map(function (stream, i) {
    var reading = i < streams.length - 1;
    var writing = i > 0;
    return destroyer(stream, reading, writing, function (err) {
      if (!error) error = err;
      if (err) destroys.forEach(call);
      if (reading) return;
      destroys.forEach(call);
      callback(error);
    });
  });
  return streams.reduce(pipe);
}

module.exports = pipeline;

/***/ }),

/***/ 94:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var ERR_INVALID_OPT_VALUE = (__webpack_require__(8106)/* .codes.ERR_INVALID_OPT_VALUE */ .q.ERR_INVALID_OPT_VALUE);

function highWaterMarkFrom(options, isDuplex, duplexKey) {
  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
}

function getHighWaterMark(state, options, duplexKey, isDuplex) {
  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

  if (hwm != null) {
    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
      var name = isDuplex ? duplexKey : 'highWaterMark';
      throw new ERR_INVALID_OPT_VALUE(name, hwm);
    }

    return Math.floor(hwm);
  } // Default value


  return state.objectMode ? 16 : 16 * 1024;
}

module.exports = {
  getHighWaterMark: getHighWaterMark
};

/***/ }),

/***/ 3194:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(7187).EventEmitter;


/***/ }),

/***/ 2553:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var Buffer = (__webpack_require__(9509).Buffer);
/*</replacement>*/

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.s = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte. If an invalid byte is detected, -2 is returned.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return byte >> 6 === 0x02 ? -1 : -2;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i || nb === -2) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd';
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd';
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd';
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character is added when ending on a partial
// character.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd';
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),

/***/ 4927:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!__webpack_require__.g.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = __webpack_require__.g.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}


/***/ }),

/***/ 1496:
/***/ ((module) => {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),

/***/ 384:
/***/ ((module) => {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),

/***/ 9539:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(__webpack_require__.g.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(384);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(1496);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}


/***/ }),

/***/ 9862:
/***/ (() => {

/* (ignored) */

/***/ }),

/***/ 964:
/***/ (() => {

/* (ignored) */

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/hbui-perf/";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// extracted by mini-css-extract-plugin
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({});
})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
// React tries to run `element instanceof win.HTMLIFrameElement`
// and crashes, because HTMLIFrameElement is undefined in HB
// see: https://github.com/facebook/react/blame/c954efa70f44a44be9c33c60c57f87bea6f40a10/packages/react-dom/src/client/ReactInputSelection.js#L46
window.HTMLIFrameElement = window.HTMLIFrameElement || function () {};
})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// UNUSED EXPORTS: default

// EXTERNAL MODULE: ./node_modules/ramda/src/times.js
var times = __webpack_require__(2250);
var times_default = /*#__PURE__*/__webpack_require__.n(times);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(7294);
// EXTERNAL MODULE: ./packages/react-facet/src/index.ts
var src = __webpack_require__(7811);
;// CONCATENATED MODULE: ./packages/engine/src/facets/routerFacet.ts


/**
 * Constant shared with the backend to indicate that even though the Gameface view is initialized,
 * we don't have any active routes.
 */
const routerFacet_ROUTER_INVALID_ROUTE = '/__INVALID_ROUTE__';
const routerFacet_ROUTER_FACET = 'core.router';
/**
 * React Hook that requests the facet
 */

const routerFacet_routerFacet = (0,src.sharedFacet)(routerFacet_ROUTER_FACET);
;// CONCATENATED MODULE: ./packages/engine/src/providers/RouterEngineProvider/createEngineHistory.ts



function createEngineHistory_createEngineHistory(historyReadyCallback, sharedFacetDriver) {
  let proxy;

  const update = routerFacet => {
    if (proxy == null) {
      proxy = buildHistoryProxy(routerFacet);
      historyReadyCallback(proxy.history);
    } else {
      proxy.notifyListeners();
    }
  };

  sharedFacetDriver(ROUTER_FACET, update, undefined, error => {
    throw new Error(error);
  });
}

function buildHistoryProxy(routerFacet) {
  let listeners = []; // setup the engine transitions to a default value of 800

  routerFacet.engineUITransitionTime = 800;
  const history = {
    // --- Frontend methods ---
    createHref: createPath,
    block: () => () => {},
    listen: listener => {
      listeners = [...listeners, listener];
      return () => {
        listeners = _without([listener], listeners);
      };
    },

    //--- Backend methods ---
    get length() {
      return routerFacet.history.length;
    },

    get action() {
      return routerFacet.history.action;
    },

    get location() {
      // TODO: fix this is the backend
      return cleanLocation(routerFacet.history.location);
    },

    go: steps => {
      routerFacet.history.go(steps);
    },
    goBack: () => {
      routerFacet.history.goBack();
    },
    goForward: () => {
      routerFacet.history.goForward();
    },
    push: location => {
      if (typeof location === 'object') {
        const url = `${location.pathname}${location.search}${location.hash}`;
        routerFacet.history.push(url, '');
      } else if (typeof location === 'string') {
        routerFacet.history.push(location, '');
      }
    },
    replace: location => {
      if (typeof location === 'object') {
        const url = `${location.pathname}${location.search}${location.hash}`;
        routerFacet.history.replace(url, '');
      } else if (typeof location === 'string') {
        routerFacet.history.replace(location, '');
      }
    }
  };
  let previousPathname = null;

  const notifyListeners = () => {
    const newPathname = history.location.pathname; // Important to store the pathname here since it can change when running the listeners.

    if (previousPathname == null || previousPathname !== newPathname) {
      listeners.forEach(listener => listener(history.location, history.action));
    }

    previousPathname = newPathname;
  };

  return {
    history,
    notifyListeners
  };
}

function cleanLocation(location) {
  const [searchPathname, search] = location.pathname.split('?');
  const [pathname, hash] = searchPathname.split('#');
  return {
    hash: hash || location.hash || '',
    pathname: pathname,
    search: search || location.search || '',
    state: location.state
  };
}
;// CONCATENATED MODULE: ./node_modules/@ungap/url-search-params/esm/index.js
/*! (c) Andrea Giammarchi - ISC */
var esm_self = undefined || /* istanbul ignore next */ {};
try {
  (function (URLSearchParams, plus) {
    if (
      new URLSearchParams('q=%2B').get('q') !== plus ||
      new URLSearchParams({q: plus}).get('q') !== plus ||
      new URLSearchParams([['q', plus]]).get('q') !== plus ||
      new URLSearchParams('q=\n').toString() !== 'q=%0A' ||
      new URLSearchParams({q: ' &'}).toString() !== 'q=+%26' ||
      new URLSearchParams({q: '%zx'}).toString() !== 'q=%25zx'
    )
      throw URLSearchParams;
    esm_self.URLSearchParams = URLSearchParams;
  }(URLSearchParams, '+'));
} catch(URLSearchParams) {
  (function (Object, String, isArray) {'use strict';
    var create = Object.create;
    var defineProperty = Object.defineProperty;
    var find = /[!'\(\)~]|%20|%00/g;
    var findPercentSign = /%(?![0-9a-fA-F]{2})/g;
    var plus = /\+/g;
    var replace = {
      '!': '%21',
      "'": '%27',
      '(': '%28',
      ')': '%29',
      '~': '%7E',
      '%20': '+',
      '%00': '\x00'
    };
    var proto = {
      append: function (key, value) {
        appendTo(this._ungap, key, value);
      },
      delete: function (key) {
        delete this._ungap[key];
      },
      get: function (key) {
        return this.has(key) ? this._ungap[key][0] : null;
      },
      getAll: function (key) {
        return this.has(key) ? this._ungap[key].slice(0) : [];
      },
      has: function (key) {
        return key in this._ungap;
      },
      set: function (key, value) {
        this._ungap[key] = [String(value)];
      },
      forEach: function (callback, thisArg) {
        var self = this;
        for (var key in self._ungap)
          self._ungap[key].forEach(invoke, key);
        function invoke(value) {
          callback.call(thisArg, value, String(key), self);
        }
      },
      toJSON: function () {
        return {};
      },
      toString: function () {
        var query = [];
        for (var key in this._ungap) {
          var encoded = encode(key);
          for (var
            i = 0,
            value = this._ungap[key];
            i < value.length; i++
          ) {
            query.push(encoded + '=' + encode(value[i]));
          }
        }
        return query.join('&');
      }
    };
    for (var key in proto)
      defineProperty(URLSearchParams.prototype, key, {
        configurable: true,
        writable: true,
        value: proto[key]
      });
    esm_self.URLSearchParams = URLSearchParams;
    function URLSearchParams(query) {
      var dict = create(null);
      defineProperty(this, '_ungap', {value: dict});
      switch (true) {
        case !query:
          break;
        case typeof query === 'string':
          if (query.charAt(0) === '?') {
            query = query.slice(1);
          }
          for (var
            pairs = query.split('&'),
            i = 0,
            length = pairs.length; i < length; i++
          ) {
            var value = pairs[i];
            var index = value.indexOf('=');
            if (-1 < index) {
              appendTo(
                dict,
                decode(value.slice(0, index)),
                decode(value.slice(index + 1))
              );
            } else if (value.length){
              appendTo(
                dict,
                decode(value),
                ''
              );
            }
          }
          break;
        case isArray(query):
          for (var
            i = 0,
            length = query.length; i < length; i++
          ) {
            var value = query[i];
            appendTo(dict, value[0], value[1]);
          }
          break;
        case 'forEach' in query:
          query.forEach(addEach, dict);
          break;
        default:
          for (var key in query)
            appendTo(dict, key, query[key]);
      }
    }

    function addEach(value, key) {
      appendTo(this, key, value);
    }

    function appendTo(dict, key, value) {
      var res = isArray(value) ? value.join(',') : value;
      if (key in dict)
        dict[key].push(res);
      else
        dict[key] = [res];
    }

    function decode(str) {
      return decodeURIComponent(str.replace(findPercentSign, '%25').replace(plus, ' '));
    }

    function encode(str) {
      return encodeURIComponent(str).replace(find, replacer);
    }

    function replacer(match) {
      return replace[match];
    }

  }(Object, String, Array.isArray));
}

(function (URLSearchParamsProto) {

  var iterable = false;
  try { iterable = !!Symbol.iterator; } catch (o_O) {}

  /* istanbul ignore else */
  if (!('forEach' in URLSearchParamsProto)) {
    URLSearchParamsProto.forEach = function forEach(callback, thisArg) {
      var self = this;
      var names = Object.create(null);
      this.toString()
          .replace(/=[\s\S]*?(?:&|$)/g, '=')
          .split('=')
          .forEach(function (name) {
            if (!name.length || name in names)
              return;
            (names[name] = self.getAll(name)).forEach(function(value) {
              callback.call(thisArg, value, name, self);
            });
          });
    };
  }

  /* istanbul ignore else */
  if (!('keys' in URLSearchParamsProto)) {
    URLSearchParamsProto.keys = function keys() {
      return iterator(this, function(value, key) { this.push(key); });
    };
  }

   /* istanbul ignore else */
  if (!('values' in URLSearchParamsProto)) {
    URLSearchParamsProto.values = function values() {
      return iterator(this, function(value, key) { this.push(value); });
    };
  }

  /* istanbul ignore else */
  if (!('entries' in URLSearchParamsProto)) {
    URLSearchParamsProto.entries = function entries() {
      return iterator(this, function(value, key) { this.push([key, value]); });
    };
  }

  /* istanbul ignore else */
  if (iterable && !(Symbol.iterator in URLSearchParamsProto)) {
    URLSearchParamsProto[Symbol.iterator] = URLSearchParamsProto.entries;
  }

  /* istanbul ignore else */
  if (!('sort' in URLSearchParamsProto)) {
    URLSearchParamsProto.sort = function sort() {
      var
        entries = this.entries(),
        entry = entries.next(),
        done = entry.done,
        keys = [],
        values = Object.create(null),
        i, key, value
      ;
      while (!done) {
        value = entry.value;
        key = value[0];
        keys.push(key);
        if (!(key in values)) {
          values[key] = [];
        }
        values[key].push(value[1]);
        entry = entries.next();
        done = entry.done;
      }
      // not the champion in efficiency
      // but these two bits just do the job
      keys.sort();
      for (i = 0; i < keys.length; i++) {
        this.delete(keys[i]);
      }
      for (i = 0; i < keys.length; i++) {
        key = keys[i];
        this.append(key, values[key].shift());
      }
    };
  }

  function iterator(self, callback) {
    var items = [];
    self.forEach(callback, items);
    /* istanbul ignore next */
    return iterable ?
      items[Symbol.iterator]() :
      {
        next: function() {
          var value = items.shift();
          return {done: value === void 0, value: value};
        }
      };
  }

  /* istanbul ignore next */
  (function (Object) {
    var
      dP = Object.defineProperty,
      gOPD = Object.getOwnPropertyDescriptor,
      createSearchParamsPollute = function (search) {
        function append(name, value) {
          URLSearchParamsProto.append.call(this, name, value);
          name = this.toString();
          search.set.call(this._usp, name ? ('?' + name) : '');
        }
        function del(name) {
          URLSearchParamsProto.delete.call(this, name);
          name = this.toString();
          search.set.call(this._usp, name ? ('?' + name) : '');
        }
        function set(name, value) {
          URLSearchParamsProto.set.call(this, name, value);
          name = this.toString();
          search.set.call(this._usp, name ? ('?' + name) : '');
        }
        return function (sp, value) {
          sp.append = append;
          sp.delete = del;
          sp.set = set;
          return dP(sp, '_usp', {
            configurable: true,
            writable: true,
            value: value
          });
        };
      },
      createSearchParamsCreate = function (polluteSearchParams) {
        return function (obj, sp) {
          dP(
            obj, '_searchParams', {
              configurable: true,
              writable: true,
              value: polluteSearchParams(sp, obj)
            }
          );
          return sp;
        };
      },
      updateSearchParams = function (sp) {
        var append = sp.append;
        sp.append = URLSearchParamsProto.append;
        URLSearchParams.call(sp, sp._usp.search.slice(1));
        sp.append = append;
      },
      verifySearchParams = function (obj, Class) {
        if (!(obj instanceof Class)) throw new TypeError(
          "'searchParams' accessed on an object that " +
          "does not implement interface " + Class.name
        );
      },
      upgradeClass = function (Class) {
        var
          ClassProto = Class.prototype,
          searchParams = gOPD(ClassProto, 'searchParams'),
          href = gOPD(ClassProto, 'href'),
          search = gOPD(ClassProto, 'search'),
          createSearchParams
        ;
        if (!searchParams && search && search.set) {
          createSearchParams = createSearchParamsCreate(
            createSearchParamsPollute(search)
          );
          Object.defineProperties(
            ClassProto,
            {
              href: {
                get: function () {
                  return href.get.call(this);
                },
                set: function (value) {
                  var sp = this._searchParams;
                  href.set.call(this, value);
                  if (sp) updateSearchParams(sp);
                }
              },
              search: {
                get: function () {
                  return search.get.call(this);
                },
                set: function (value) {
                  var sp = this._searchParams;
                  search.set.call(this, value);
                  if (sp) updateSearchParams(sp);
                }
              },
              searchParams: {
                get: function () {
                  verifySearchParams(this, Class);
                  return this._searchParams || createSearchParams(
                    this,
                    new URLSearchParams(this.search.slice(1))
                  );
                },
                set: function (sp) {
                  verifySearchParams(this, Class);
                  createSearchParams(this, sp);
                }
              }
            }
          );
        }
      }
    ;
    try {
      upgradeClass(HTMLAnchorElement);
      if (/^function|object$/.test(typeof URL) && URL.prototype)
        upgradeClass(URL);
    } catch (meh) {}
  }(Object));

}(esm_self.URLSearchParams.prototype, Object));
/* harmony default export */ const esm = (esm_self.URLSearchParams);

;// CONCATENATED MODULE: ./packages/engine/src/providers/RouterEngineProvider/urlFocusedId.tsx
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


/**
 * TODO: There is currently a bug with the router facet (on the back-end) which
 * doesn't behave correctly with hash URL fragments, so we will enforce using
 * query strings until it is fixed
 */

const isHashBugFixed = false;
const useHashForFocusState = isHashBugFixed && "gameface" === 'gameface';
function urlFocusedId_getFocusedIdFromLocation(location, useHash = useHashForFocusState) {
  const params = new esm(useHash ? location.hash : location.search);
  const alias = params.get('alias');
  if (typeof alias === 'string' && alias.length !== 0) return alias;
  const nodeId = params.get('nodeId');
  if (nodeId == null) return undefined;
  return parseInt(nodeId, 10);
}

function parseUrlHashParams(hash) {
  return hash.substr(1).split('&').reduce((res, item) => {
    const parts = item.split('=');
    res.set(parts[0], parts[1]);
    return res;
  }, new Map());
}

function encodeUrlHashParams(hashParams) {
  return Array.from(hashParams.entries()).filter(item => item[1] != null).map(([key, value]) => `${key}=${value}`).join('&');
}

function urlFocusedId_getURLWithFocusedId(location, newFocusedId, useHash = useHashForFocusState) {
  const hashParams = parseUrlHashParams(location.hash);
  hashParams.delete('nodeId');
  hashParams.delete('alias');
  const searchParams = new esm(location.search);
  searchParams.delete('nodeId');
  searchParams.delete('alias');
  const params = useHash ? hashParams : searchParams;

  if (typeof newFocusedId === 'string') {
    params.set('alias', newFocusedId);
  } else if (typeof newFocusedId === 'number') {
    params.set('nodeId', newFocusedId.toString());
  }

  const hashString = encodeUrlHashParams(hashParams);
  const searchString = searchParams.toString();
  return _objectSpread(_objectSpread({}, location), {}, {
    search: searchString.length ? `?${searchString}` : '',
    hash: hashString.length ? `#${hashString}` : ''
  });
}
;// CONCATENATED MODULE: ./packages/engine/src/facets/inputFacet.ts

const INPUT_FACET = 'core.input';
/**
 * React Hook that requests the facet
 */

const inputFacet_inputFacet = (0,src.sharedFacet)(INPUT_FACET);
;// CONCATENATED MODULE: ./packages/engine/src/facets/animationFacet.ts

const ANIMATION_FACET = 'core.animation';
const animationFacet_animationFacet = (0,src.sharedFacet)(ANIMATION_FACET);
;// CONCATENATED MODULE: ./packages/engine/src/facets/splitScreenFacet.ts

let SplitScreenDirection;

(function (SplitScreenDirection) {
  SplitScreenDirection[SplitScreenDirection["HORIZONTAL"] = 0] = "HORIZONTAL";
  SplitScreenDirection[SplitScreenDirection["VERTICAL"] = 1] = "VERTICAL";
})(SplitScreenDirection || (SplitScreenDirection = {}));

const SPLIT_SCREEN_FACET = 'core.splitScreen';
/**
 * React Hook that requests the facet
 */

const splitScreenFacet_splitScreenFacet = (0,src.sharedFacet)(SPLIT_SCREEN_FACET);
;// CONCATENATED MODULE: ./packages/engine/src/providers/RouterEngineProvider/GamepadEngineProvider.tsx









/**
 * Provider that setups the Gamepad to be used by the RouterEngineProvider
 * differently than other "engine provider", this has some required props that are to be used by another provider
 *
 * It should not be moved outside of this folder
 */
function GamepadEngineProvider_GamepadEngineProvider({
  notifyFocusRequest,
  onFocusedIdChange,
  onFocusedIdChangeFail,
  children,
  keyboardGamepadMap,
  isInputLegendClickable
}) {
  const animation = useFacetUnwrap(useSharedFacet(animationFacet));
  const splitScreen = useFacetUnwrap(useSharedFacet(splitScreenFacet));
  const isRtl = useIsLocaleRtl();
  const acceptInputFromAllControllers = useFacetUnwrap(useFacetMap(input => input.acceptInputFromAllControllers, [], [useSharedFacet(inputFacet)]));
  const gameControllerId = useFacetUnwrap(useFacetMap(input => input.gameControllerId, [], [useSharedFacet(inputFacet)]));
  const swapABButtons = useFacetUnwrap(useFacetMap(input => input.swapABButtons, [], [useSharedFacet(inputFacet)]));
  const swapXYButtons = useFacetUnwrap(useFacetMap(input => input.swapXYButtons, [], [useSharedFacet(inputFacet)]));
  const disabledNavigation = useFacetMap(isLastInputFocus => !isLastInputFocus, [], [useIsLastInputFocus()]);

  if (acceptInputFromAllControllers == NO_VALUE || gameControllerId == NO_VALUE || swapABButtons == NO_VALUE || swapXYButtons == NO_VALUE || animation === NO_VALUE || isRtl == null || splitScreen === NO_VALUE) {
    return null;
  } // Performance while running the game in split screen is degraded,
  // so we disable animations to a more snappy UI


  const disabledTransition = !animation.screenAnimationEnabled || splitScreen.numActivePlayers > 1;
  return /*#__PURE__*/React.createElement(GamepadProvider, {
    notifyFocusRequest: notifyFocusRequest,
    onFocusedIdChange: onFocusedIdChange,
    onFocusedIdChangeFail: onFocusedIdChangeFail,
    disabledNavigation: disabledNavigation,
    acceptInputFromAllControllers: acceptInputFromAllControllers,
    gameControllerId: gameControllerId,
    swapABButtons: swapABButtons,
    swapXYButtons: swapXYButtons,
    disabledTransition: disabledTransition,
    isRtl: isRtl,
    keyboardGamepadMap: keyboardGamepadMap,
    isInputLegendClickable: isInputLegendClickable
  }, children);
}
;// CONCATENATED MODULE: ./packages/semantic-tokens/src/constants.ts
const constants_DEFAULT_ROLE = 'neutral';
const NEUTRAL_ROLES = [constants_DEFAULT_ROLE, 'neutral20', 'neutral50', 'neutral60', 'neutral80', 'neutral100'];
const SEMANTIC_ROLES = ['primary', 'primaryTint', 'secondary', 'tertiary', 'success', 'successTint', 'destructive', 'destructiveTint', 'informative', 'informativeTint', 'notice', 'noticeTint'];
const PAPER_ROLE = 'paper';
const constants_ROLES = [...NEUTRAL_ROLES, ...SEMANTIC_ROLES, PAPER_ROLE]; // Variant

const constants_DEFAULT_FOREGROUND_VARIANT = 'regular';
const EFFECT_VARIANT = 'reversed';
const FOREGROUND_VARIANTS = ['dimmest', 'dimmer', 'stronger', 'strongest'];
const NONE_DEFAULT_VARIANTS = [...FOREGROUND_VARIANTS, EFFECT_VARIANT];
const constants_VARIANTS = [constants_DEFAULT_FOREGROUND_VARIANT, ...NONE_DEFAULT_VARIANTS]; // Element

const constants_FOREGROUND_ELEMENTS = ['text', 'icon', 'border', 'caret'];
const constants_LIGHTING_EFFECT_ELEMENTS = ['specular', 'bevel', 'highlight'];
const HIGHLIGHT_ELEMENT = 'highlight';
const BASE_ELEMENTS = ['background', 'shadow', 'outline', 'overlay', 'dropShadow'];
const constants_ELEMENTS = [...constants_FOREGROUND_ELEMENTS, ...BASE_ELEMENTS, ...constants_LIGHTING_EFFECT_ELEMENTS]; // Modifier

const DEFAULT_MODIFIER = 'default';
const HOVERED = 'hovered';
const PRESSED = 'pressed';
const constants_DISABLED = 'disabled';
const SELECTED = 'selected';
const FOCUSED = 'focused';
const INTERACTIVE_MODIFIERS = [SELECTED, FOCUSED, HOVERED, PRESSED, constants_DISABLED];
const constants_MODIFIERS = ['default', ...INTERACTIVE_MODIFIERS];
const PSEUDO_SELECTORS = ['hover', 'press', 'disable', 'select', 'focus', 'base', 'interactive']; // Component

const constants_COMPONENTS = ['pressable', 'panel']; // Sound

const constants_SOUND_EVENTS = ['reject', 'click', 'press', 'focus', 'hover', 'hoverExit', 'contract', 'expand', 'toggle', 'lift'];
;// CONCATENATED MODULE: ./packages/semantic-tokens/src/typeGuards.ts
 // Element

const typeGuards_isForegroundElement = element => {
  return FOREGROUND_ELEMENTS.includes(element);
};
const typeGuards_isLightingEffectElement = element => {
  return LIGHTING_EFFECT_ELEMENTS.includes(element);
};
const typeGuards_hasVariant = (element, variant = 'regular') => typeof element !== 'undefined' && variant in element;
const typeGuards_isRegularModifier = element => typeof element !== 'undefined' && 'default' in element;
;// CONCATENATED MODULE: ./packages/semantic-tokens/src/collectionToClassName.ts


const flattenCollection = collection => {
  const flattened = []; // Way too much hassle to get the types correct
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const recurse = (value, path) => {
    if (value != null && 'default' in value) {
      MODIFIERS.forEach(modifier => {
        if (value[modifier] != null) {
          flattened.push({
            path: [...path, mapModifierToPseudoSelector[modifier]],
            value: value[modifier]
          });
        }
      });
    } else {
      for (const prop in value) {
        recurse(value[prop], [...path, prop]);
      }
    }
  };

  recurse(collection.color, [collection.id]);
  recurse(collection.component, [collection.id]);
  return flattened;
};

const generateCss = (selector, element, value) => {
  switch (element) {
    case 'background':
    case 'icon':
    case 'shadow':
    case 'highlight':
    case 'overlay':
    case 'dropShadow':
      return `${selector} { background-color: ${value}; }`;

    case 'border':
    case 'outline':
      return `${selector} { border-color: ${value}; }`;

    case 'text':
      return `${selector} { color: ${value}; }`;

    case 'specular':
    case 'bevel':
      const {
        top,
        bottom
      } = value;

      if (selector.includes('reversed')) {
        return `${selector} { border-top-color: ${bottom}; border-left-color: ${bottom}; border-bottom-color: ${top};  border-right-color: ${top} }`;
      }

      return `${selector} { border-top-color: ${top}; border-left-color: ${top}; border-bottom-color: ${bottom};  border-right-color: ${bottom} }`;

    case 'caret':
      return `${selector} { caret-color: ${value}; }`;

    case 'pressable':
    case 'panel':
      const texture = value;
      return `${selector} { border-image-slice: ${texture.slice}; border-image-width: ${texture.width}; border-image-outset: ${texture.outset}; border-image-repeat: ${texture.repeat}; border-image-source: url(${texture.source}); }`;
  }
};

const mapModifierToPseudoSelector = {
  [DEFAULT_MODIFIER]: 'base',
  [HOVERED]: 'hover',
  [PRESSED]: 'press',
  [FOCUSED]: 'focus',
  [SELECTED]: 'select',
  [constants_DISABLED]: 'disable'
};
const mapPseudoSelectorToModifier = {
  base: DEFAULT_MODIFIER,
  hover: HOVERED,
  press: PRESSED,
  focus: FOCUSED,
  select: SELECTED,
  disable: constants_DISABLED
};

const extractSelectorAndElement = path => {
  const element = isTexture(path) ? path[1] : path[2];
  const foregroundElement = isForegroundElement(element);
  const lightingElement = isLightingEffectElement(element);
  const modifier = path[path.length - 1];
  const state = mapPseudoSelectorToModifier[modifier]; // Note that splice will mutate path by removing variant from it

  const variant = foregroundElement ? path.splice(3, 1)[0] : undefined;
  const baseSelector = path.join('-');
  const defaultSelector = path.slice(0, -1).join('-');
  const interactiveSelector = path.slice(0, -1).concat('interactive').join('-');

  if (lightingElement) {
    const selector = modifier === 'base' ? `.${defaultSelector},.${interactiveSelector}` : `.${baseSelector}.${state},.${state} .${baseSelector},.${interactiveSelector}.${state},.${state} .${interactiveSelector}`;
    const reversedSelector = modifier === 'base' ? `.${defaultSelector}.reversed,.${interactiveSelector}.reversed` : `.${baseSelector}.reversed.${state},.${state} .${baseSelector}.reversed,.${interactiveSelector}.reversed.${state},.${state} .${interactiveSelector}.reversed`;
    return {
      element,
      selector: [selector, reversedSelector]
    };
  }

  const variantClassName = variant == null || variant === 'regular' ? '' : `.${variant}`;
  const selector = modifier === 'base' ? `.${defaultSelector}${variantClassName},.${interactiveSelector}${variantClassName}` : `.${baseSelector}${variantClassName}.${state},.${state} .${baseSelector}${variantClassName},.${interactiveSelector}${variantClassName}.${state},.${state} .${interactiveSelector}${variantClassName}`;
  return {
    element,
    selector
  };
};

const isTexture = path => path.includes('texture');

const transformToCss = arr => {
  return arr.map(({
    path,
    value
  }) => {
    const {
      element,
      selector
    } = extractSelectorAndElement(path);
    return Array.isArray(selector) ? selector.map(selector => generateCss(selector, element, value)).join('') : generateCss(selector, element, value);
  }).join('');
};

const collectionToClassName_collectionToClassName = collection => {
  const collectionFlattened = flattenCollection(collection);
  const css = transformToCss(collectionFlattened);
  return css;
};
;// CONCATENATED MODULE: ./packages/semantic-tokens/src/SemanticRole.tsx

const SemanticRoleScopeContext = (0,react.createContext)('neutral');
const SemanticRole_useInheritSemanticRole = () => useContext(SemanticRoleScopeContext);
const SemanticRoleProvider = ({
  role,
  children
}) => {
  if (role === 'inherit') {
    return /*#__PURE__*/React.createElement(React.Fragment, null, children);
  }

  return /*#__PURE__*/React.createElement(SemanticRoleScopeContext.Provider, {
    value: role
  }, children);
};
;// CONCATENATED MODULE: ./packages/semantic-tokens/src/utils.ts
const COLLECTION_STYLE_ID_PREFIX = `semantic-tokens-collection-id-`;
const utils_getCollectionStyleId = collectionId => `${COLLECTION_STYLE_ID_PREFIX}${collectionId}`;
;// CONCATENATED MODULE: ./packages/semantic-tokens/src/semanticColorTokens.ts


const generateClassNames = id => {
  const classNames = {
    color: {},
    component: {},
    variant: VARIANT_CLASS_NAMES,
    modifier: MODIFIER_CLASS_NAMES // eslint-disable-next-line @typescript-eslint/no-explicit-any

  };

  for (const role of constants_ROLES) {
    classNames.color[role] = {};

    for (const element of constants_ELEMENTS) {
      classNames.color[role][element] = {};

      for (const pseudo of PSEUDO_SELECTORS) {
        if (id == null) {
          classNames.color[role][element][pseudo] = undefined;
        } else {
          if (pseudo === 'base') {
            classNames.color[role][element][pseudo] = `${id}-${role}-${element}`;
          } else {
            classNames.color[role][element][pseudo] = `${id}-${role}-${element}-${pseudo}`;
          }
        }
      }
    }
  }

  for (const component of constants_COMPONENTS) {
    classNames.component[component] = {
      texture: {}
    };

    for (const role of constants_ROLES) {
      classNames.component[component].texture[role] = {};

      for (const pseudo of PSEUDO_SELECTORS) {
        if (id == null) {
          classNames.component[component].texture[role][pseudo] = undefined;
        } else {
          if (pseudo === 'base') {
            classNames.component[component].texture[role][pseudo] = `${id}-${component}-${role}-texture`;
          } else {
            classNames.component[component].texture[role][pseudo] = `${id}-${component}-${role}-texture-${pseudo}`;
          }
        }
      }
    }
  }

  return classNames;
};

const semanticColorTokensPerId = {};
const semanticColorTokens_getSemanticColorTokens = id => {
  if (id == null) return semanticColorTokens_EMPTY_SEMANTIC_COLOR_TOKENS;

  if (semanticColorTokensPerId[id] == null) {
    semanticColorTokensPerId[id] = generateClassNames(id);
  }

  return semanticColorTokensPerId[id];
};

const getModifiers = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const modifiers = {};

  for (const modifier of INTERACTIVE_MODIFIERS) {
    modifiers[modifier] = modifier;
  }

  return modifiers;
};

const MODIFIER_CLASS_NAMES = getModifiers();

const getVariants = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const variants = {};

  for (const variant of NONE_DEFAULT_VARIANTS) {
    variants[variant] = variant;
  }

  return variants;
};

const VARIANT_CLASS_NAMES = getVariants();
const semanticColorTokens_EMPTY_SEMANTIC_COLOR_TOKENS = generateClassNames();
;// CONCATENATED MODULE: ./packages/semantic-tokens/src/semanticSoundTokens.ts


const generateSoundTokens = collection => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const semanticSoundTokens = {};

  for (const role of constants_ROLES) {
    var _collection$sound$rol, _collection$sound;

    semanticSoundTokens[role] = (_collection$sound$rol = collection === null || collection === void 0 ? void 0 : (_collection$sound = collection.sound) === null || _collection$sound === void 0 ? void 0 : _collection$sound[role]) !== null && _collection$sound$rol !== void 0 ? _collection$sound$rol : {};
  }

  return semanticSoundTokens;
};

const semanticSoundTokensPerId = {};
const semanticSoundTokens_getSemanticSoundTokens = collection => {
  if (collection == null) return EMPTY_SEMANTIC_SOUND_TOKENS;
  if (collection.id == null) return EMPTY_SEMANTIC_SOUND_TOKENS;

  if (semanticSoundTokensPerId[collection.id] == null) {
    semanticSoundTokensPerId[collection.id] = generateSoundTokens(collection);
  }

  return semanticSoundTokensPerId[collection.id];
};
const EMPTY_SEMANTIC_SOUND_TOKENS = generateSoundTokens();
;// CONCATENATED MODULE: ./packages/semantic-tokens/src/SemanticTokensProvider.tsx
function SemanticTokensProvider_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function SemanticTokensProvider_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { SemanticTokensProvider_ownKeys(Object(source), true).forEach(function (key) { SemanticTokensProvider_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { SemanticTokensProvider_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function SemanticTokensProvider_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








const DEFAULT_MANAGER_CONTEXT = {
  registerCollection: () => undefined
};
const ManagerContext = (0,react.createContext)(DEFAULT_MANAGER_CONTEXT);
const DEFAULT_COLLECTION_CONTEXT = {
  id: undefined,
  tokens: SemanticTokensProvider_objectSpread(SemanticTokensProvider_objectSpread({}, semanticColorTokens_EMPTY_SEMANTIC_COLOR_TOKENS), {}, {
    sound: EMPTY_SEMANTIC_SOUND_TOKENS
  })
};
const CollectionContext = (0,react.createContext)(DEFAULT_COLLECTION_CONTEXT);

const useCollection = () => {
  const ctxValue = useContext(CollectionContext);

  if (ctxValue.id == null) {
    console.error('Trying to use collection context outside of provider.');
  }

  return ctxValue;
};

const SemanticTokensProvider_useSemanticTokens = () => {
  const tokens = useCollection().tokens;
  const inheritRole = useInheritSemanticRole();
  const semanticClassNamesWithInheritedRole = useMemo(() => {
    var _tokens$rawColors;

    return SemanticTokensProvider_objectSpread(SemanticTokensProvider_objectSpread({}, tokens), {}, {
      color: SemanticTokensProvider_objectSpread(SemanticTokensProvider_objectSpread({}, tokens.color), {}, {
        inherit: tokens.color[inheritRole]
      }),
      rawColors: SemanticTokensProvider_objectSpread(SemanticTokensProvider_objectSpread({}, tokens.rawColors || {}), {}, {
        inherit: (_tokens$rawColors = tokens.rawColors) === null || _tokens$rawColors === void 0 ? void 0 : _tokens$rawColors[inheritRole]
      }),
      sound: SemanticTokensProvider_objectSpread(SemanticTokensProvider_objectSpread({}, tokens.sound), {}, {
        inherit: tokens.sound[inheritRole]
      })
    });
  }, [tokens, inheritRole]);
  return semanticClassNamesWithInheritedRole;
};
// Query for styles added at build time
const initialStyleElementsById = Array.from(document.querySelectorAll(`head style[id^="${COLLECTION_STYLE_ID_PREFIX}"]`)).reduce((stylesMap, element) => SemanticTokensProvider_objectSpread(SemanticTokensProvider_objectSpread({}, stylesMap), {}, {
  [element.id.replace(COLLECTION_STYLE_ID_PREFIX, '')]: element
}), {});
const SemanticTokensProvider_SemanticTokensCollectionsManager = ({
  children
}) => {
  const styleElementsById = useRef(initialStyleElementsById);
  const registeredCollections = useRef({});
  const ctxValue = useMemo(() => ({
    registerCollection: collection => {
      // In development we want to update styling when a collections changes, eg. for hot module reloading
      if (false) {} // In production we don't have a use case (yet) for updating styling dynamically, so ignore updates of collections


      if (true) {
        if (styleElementsById.current[collection.id] != null) {
          return;
        }
      }

      const styleId = getCollectionStyleId(collection.id); // Remove old styling (needed in Gameface)

      const oldStyleElement = document.querySelector(`head style[id="${styleId}"]`);

      if (oldStyleElement != null) {
        document.head.removeChild(oldStyleElement);
      } // Add new styling


      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = collectionToClassName(collection);
      document.head.appendChild(style);
      styleElementsById.current[collection.id] = style;
      registeredCollections.current[collection.id] = collection;
    }
  }), []);
  return /*#__PURE__*/React.createElement(ManagerContext.Provider, {
    value: ctxValue
  }, children);
};
const SemanticTokensProvider_SemanticTokensCollectionProvider = ({
  collection,
  children
}) => {
  const managerCtx = useContext(ManagerContext);
  const registerCollection = managerCtx === null || managerCtx === void 0 ? void 0 : managerCtx.registerCollection;
  const parentCtx = useContext(CollectionContext);
  useEffect(() => {
    if (collection == null || registerCollection == null) {
      return;
    }

    registerCollection(collection);
  }, [collection, registerCollection]);
  const collectionCtxValue = useMemo(() => {
    const semanticClassNames = getSemanticColorTokens(collection === null || collection === void 0 ? void 0 : collection.id); // Fallback on other collection's colors for each role on a per element basis.
    // Note: Not sure if possible to make the below type safe, so used any + cast to correct type.

    const color = {}; // eslint-disable-next-line @typescript-eslint/no-explicit-any

    const rawColors = {};

    for (const role of ROLES) {
      const className = semanticClassNames.color[role];
      const parentClassName = parentCtx.tokens.color[role];
      color[role] = {};
      rawColors[role] = {};

      for (const element of ELEMENTS) {
        var _collection$color$rol, _collection$color$rol2, _collection$color$rol3, _parentCtx$tokens$raw, _parentCtx$tokens$raw2;

        color[role][element] = (collection === null || collection === void 0 ? void 0 : (_collection$color$rol = collection.color[role]) === null || _collection$color$rol === void 0 ? void 0 : _collection$color$rol[element]) != null ? className[element] : parentClassName[element];
        rawColors[role][element] = (collection === null || collection === void 0 ? void 0 : (_collection$color$rol2 = collection.color[role]) === null || _collection$color$rol2 === void 0 ? void 0 : _collection$color$rol2[element]) != null ? collection === null || collection === void 0 ? void 0 : (_collection$color$rol3 = collection.color[role]) === null || _collection$color$rol3 === void 0 ? void 0 : _collection$color$rol3[element] : parentCtx === null || parentCtx === void 0 ? void 0 : (_parentCtx$tokens$raw = parentCtx.tokens.rawColors) === null || _parentCtx$tokens$raw === void 0 ? void 0 : (_parentCtx$tokens$raw2 = _parentCtx$tokens$raw[role]) === null || _parentCtx$tokens$raw2 === void 0 ? void 0 : _parentCtx$tokens$raw2[element];
      }
    } // Set texture class names to undefined if not defined in collection.


    const component = COMPONENTS.reduce((acc, component) => {
      const texture = ROLES.reduce((texturesPerRole, role) => {
        var _collection$component, _collection$component2;

        texturesPerRole[role] = (collection === null || collection === void 0 ? void 0 : (_collection$component = collection.component) === null || _collection$component === void 0 ? void 0 : (_collection$component2 = _collection$component[component]) === null || _collection$component2 === void 0 ? void 0 : _collection$component2[role]) != null ? semanticClassNames.component[component].texture[role] : EMPTY_SEMANTIC_COLOR_TOKENS.component[component].texture[role];
        return texturesPerRole;
      }, {});
      acc[component] = {
        texture
      };
      return acc;
    }, {});
    const semanticSounds = getSemanticSoundTokens(collection);
    const sound = {};

    for (const role of ROLES) {
      sound[role] = {};
      const parentSound = parentCtx.tokens.sound[role];

      for (const soundEvent of SOUND_EVENTS) {
        var _semanticSounds$role$;

        sound[role][soundEvent] = (_semanticSounds$role$ = semanticSounds[role][soundEvent]) !== null && _semanticSounds$role$ !== void 0 ? _semanticSounds$role$ : parentSound[soundEvent];
      }
    }

    return {
      id: collection === null || collection === void 0 ? void 0 : collection.id,
      tokens: {
        variant,
        modifier,
        color,
        component,
        // We expose raw values here since it is in some rare cases necessary to get those values directly,
        // eg. if a text-decoration should have the same color as the text token.
        // However, for performance reasons this should be avoided if not absolutely necessary.
        rawColors: rawColors,
        sound
      }
    };
  }, [collection, parentCtx]);

  if (!collection) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, children);
  }

  return /*#__PURE__*/React.createElement(CollectionContext.Provider, {
    value: collectionCtxValue
  }, children);
};
;// CONCATENATED MODULE: ./packages/semantic-tokens/src/testHelpers.tsx
function testHelpers_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function testHelpers_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { testHelpers_ownKeys(Object(source), true).forEach(function (key) { testHelpers_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { testHelpers_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function testHelpers_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const emptyColorRole = constants_ELEMENTS.reduce((acc, element) => testHelpers_objectSpread(testHelpers_objectSpread({}, acc), {}, {
  [element]: {}
}), {});

const createSoundsForRoleMock = role => constants_SOUND_EVENTS.reduce((acc, sound) => testHelpers_objectSpread(testHelpers_objectSpread({}, acc), {}, {
  [sound]: `mockTokens.${role}.${sound}`
}), {});

const mockTokens = {
  id: 'mockTokens',
  color: constants_ROLES.reduce((acc, role) => testHelpers_objectSpread(testHelpers_objectSpread({}, acc), {}, {
    [role]: emptyColorRole
  }), {}),
  sound: constants_ROLES.reduce((roles, role) => testHelpers_objectSpread(testHelpers_objectSpread({}, roles), {}, {
    [role]: createSoundsForRoleMock(role)
  }), {})
};
const MockSemanticTokensCollectionProvider = ({
  children
}) => {
  return /*#__PURE__*/React.createElement(SemanticTokensCollectionProvider, {
    collection: mockTokens
  }, children);
};
;// CONCATENATED MODULE: ./packages/semantic-tokens/src/collectionCreator.ts


const collectionCreator = collection => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const collectionWithFallbacks = {
    id: collection.id,
    color: {},
    component: {},
    sound: {}
  };

  for (const role of ROLES) {
    var _collection$sound, _collection$sound2;

    collectionWithFallbacks.sound[role] = ((_collection$sound = collection.sound) === null || _collection$sound === void 0 ? void 0 : _collection$sound[role]) || ((_collection$sound2 = collection.sound) === null || _collection$sound2 === void 0 ? void 0 : _collection$sound2[DEFAULT_ROLE]) || {};

    if (!collection.color[role]) {
      continue;
    }

    collectionWithFallbacks.color[role] = {};

    for (const element of ELEMENTS) {
      var _collection$color;

      const collectionRole = collection.color[role];
      const fallbackRole = (_collection$color = collection.color) === null || _collection$color === void 0 ? void 0 : _collection$color[DEFAULT_ROLE];
      const collectionElement = collectionRole === null || collectionRole === void 0 ? void 0 : collectionRole[element];

      if (isForegroundElement(element)) {
        for (const variant of VARIANTS) {
          if (hasVariant(collectionElement, variant) || collectionElement == null && variant === DEFAULT_FOREGROUND_VARIANT) {
            var _collectionWithFallba, _fallbackRole$element, _fallbackRole$element2, _ref, _ref2, _collectionVariant$DI;

            collectionWithFallbacks.color[role][element] = (_collectionWithFallba = collectionWithFallbacks.color[role][element]) !== null && _collectionWithFallba !== void 0 ? _collectionWithFallba : {};
            const collectionVariant = collectionElement === null || collectionElement === void 0 ? void 0 : collectionElement[variant];
            const fallbackVariant = collectionElement === null || collectionElement === void 0 ? void 0 : collectionElement[DEFAULT_FOREGROUND_VARIANT];
            const fallbackRoleVariant = (fallbackRole === null || fallbackRole === void 0 ? void 0 : (_fallbackRole$element = fallbackRole[element]) === null || _fallbackRole$element === void 0 ? void 0 : _fallbackRole$element[variant]) || (fallbackRole === null || fallbackRole === void 0 ? void 0 : (_fallbackRole$element2 = fallbackRole[element]) === null || _fallbackRole$element2 === void 0 ? void 0 : _fallbackRole$element2[DEFAULT_FOREGROUND_VARIANT]);
            collectionWithFallbacks.color[role][element][variant] = (_ref = collectionVariant !== null && collectionVariant !== void 0 ? collectionVariant : fallbackVariant) !== null && _ref !== void 0 ? _ref : fallbackRoleVariant;
            const disabledValue = (_ref2 = (_collectionVariant$DI = collectionVariant === null || collectionVariant === void 0 ? void 0 : collectionVariant[DISABLED]) !== null && _collectionVariant$DI !== void 0 ? _collectionVariant$DI : fallbackVariant === null || fallbackVariant === void 0 ? void 0 : fallbackVariant[DISABLED]) !== null && _ref2 !== void 0 ? _ref2 : fallbackRoleVariant === null || fallbackRoleVariant === void 0 ? void 0 : fallbackRoleVariant[DISABLED];

            if (disabledValue != null) {
              collectionWithFallbacks.color[role][element][variant].disabled = disabledValue;
            }
          }
        }
      } else {
        if (collectionRole) {
          const collectionElementWithFallback = collectionElement !== null && collectionElement !== void 0 ? collectionElement : fallbackRole === null || fallbackRole === void 0 ? void 0 : fallbackRole[element];

          if (isRegularModifier(collectionElementWithFallback)) {
            var _collectionWithFallba2, _collectionElementWit, _fallbackRole$element3;

            collectionWithFallbacks.color[role][element] = (_collectionWithFallba2 = collectionWithFallbacks.color[role][element]) !== null && _collectionWithFallba2 !== void 0 ? _collectionWithFallba2 : {};
            collectionWithFallbacks.color[role][element] = collectionElementWithFallback;
            const disabledValue = (_collectionElementWit = collectionElementWithFallback === null || collectionElementWithFallback === void 0 ? void 0 : collectionElementWithFallback[DISABLED]) !== null && _collectionElementWit !== void 0 ? _collectionElementWit : fallbackRole === null || fallbackRole === void 0 ? void 0 : (_fallbackRole$element3 = fallbackRole[element]) === null || _fallbackRole$element3 === void 0 ? void 0 : _fallbackRole$element3[DISABLED];

            if (disabledValue != null) {
              collectionWithFallbacks.color[role][element].disabled = disabledValue;
            }
          }
        }
      }
    }
  }

  for (const component of COMPONENTS) {
    var _collection$component;

    const componentStyles = (_collection$component = collection.component) === null || _collection$component === void 0 ? void 0 : _collection$component[component];

    if (componentStyles == null) {
      continue;
    }

    collectionWithFallbacks.component[component] = {};

    for (const role of ROLES) {
      const componentStyle = componentStyles[role];

      if (componentStyle == null) {
        continue;
      }

      collectionWithFallbacks.component[component][role] = {};

      if (componentStyle.texture != null) {
        var _textureStyle$hovered, _textureStyle$pressed, _textureStyle$disable, _textureStyle$focused, _textureStyle$selecte;

        const textureStyle = componentStyle.texture;
        const defaultTexture = textureStyle.default;

        if (defaultTexture.outset == null) {
          defaultTexture.outset = '0';
        }

        if (defaultTexture.repeat == null) {
          defaultTexture.repeat = 'stretch';
        }

        collectionWithFallbacks.component[component][role].texture = {
          default: defaultTexture,
          hovered: applyBaseTexture((_textureStyle$hovered = textureStyle.hovered) !== null && _textureStyle$hovered !== void 0 ? _textureStyle$hovered : {}, defaultTexture),
          pressed: applyBaseTexture((_textureStyle$pressed = textureStyle.pressed) !== null && _textureStyle$pressed !== void 0 ? _textureStyle$pressed : {}, defaultTexture),
          disabled: applyBaseTexture((_textureStyle$disable = textureStyle.disabled) !== null && _textureStyle$disable !== void 0 ? _textureStyle$disable : {}, defaultTexture),
          focused: applyBaseTexture((_textureStyle$focused = textureStyle.focused) !== null && _textureStyle$focused !== void 0 ? _textureStyle$focused : {}, defaultTexture),
          selected: applyBaseTexture((_textureStyle$selecte = textureStyle.selected) !== null && _textureStyle$selecte !== void 0 ? _textureStyle$selecte : {}, defaultTexture)
        };
      }
    }
  }

  return collectionWithFallbacks;
};

const applyBaseTexture = (texture, baseTexture) => {
  if (texture.slice == null) {
    texture.slice = baseTexture.slice;
  }

  if (texture.width == null) {
    texture.width = baseTexture.width;
  }

  if (texture.outset == null) {
    texture.outset = baseTexture.outset;
  }

  if (texture.repeat == null) {
    texture.repeat = baseTexture.repeat;
  }

  if (texture.source == null) {
    texture.source = baseTexture.source;
  }

  return texture;
};
;// CONCATENATED MODULE: ./packages/semantic-tokens/src/index.ts









;// CONCATENATED MODULE: ./packages/engine/src/providers/RouterEngineProvider/RouterEngineProvider.tsx










/**
 * Provider that setups our routing and gamepad infrastructure, given the focus is tied to navigating URLs in the application.
 */
function RouterEngineProvider_RouterEngineProvider({
  children,
  keyboardGamepadMap,
  isInputLegendClickable
}) {
  var _semanticTokens$sound, _semanticTokens$sound2;

  const sharedFacetDriver = useContext(sharedFacetDriverContext);
  const [history, setHistory] = useState(null);
  useLayoutEffect(() => {
    createEngineHistory(setHistory, sharedFacetDriver);
  }, [setHistory, sharedFacetDriver]);
  const handleFocusedIdChange = useCallback(newFocusedId => {
    if (!history) return;
    const location = history.location;

    if (location.pathname === '/' || location.pathname === '/__INVALID_ROUTE__') {
      // '/' was the old "fallback location" in Minecraft and is the current one in Legends returned when the current location is not valid.
      // '/__INVALID_ROUTE__' is the new "fallback location" in Minecraft.
      // This location can be returned when for example a screen currently being popped, or when a cached screen is destroyed as part of shutting down the game.
      // See RouterFacet::RouterHistoryAdapter::mFallbackLocation in OreUIRouterHistoryAdapter.cpp (Minecraft) or OreUIRouterFacet.cpp (Legends).
      return;
    }

    history.replace(getURLWithFocusedId(location, newFocusedId));
  }, [history]);
  const triggerSound = useSoundEffectTrigger();
  const isNarrationEnabled = useNarrationEnabled();
  const semanticTokens = useSemanticTokens();
  const semanticRejectSound = semanticTokens === null || semanticTokens === void 0 ? void 0 : (_semanticTokens$sound = semanticTokens.sound) === null || _semanticTokens$sound === void 0 ? void 0 : (_semanticTokens$sound2 = _semanticTokens$sound.neutral) === null || _semanticTokens$sound2 === void 0 ? void 0 : _semanticTokens$sound2.reject; // semanticTokens can be undefined if a collection isn't provided to the application

  const handleFocusedIdChangeFail = useCallback(() => {
    if (isNarrationEnabled && semanticRejectSound != null) {
      triggerSound(semanticRejectSound, 0, 0.5, 0.75);
    }
  }, [isNarrationEnabled, triggerSound, semanticRejectSound]);
  const notifyFocusRequest = useCallback(onHistoryChange => {
    if (history == null) return () => {};
    const idOrAlias = getFocusedIdFromLocation(history.location);

    if (idOrAlias != null) {
      onHistoryChange(idOrAlias);
    }

    const cleanup = history.listen(location => {
      const idOrAlias = getFocusedIdFromLocation(location);

      if (idOrAlias != null) {
        onHistoryChange(idOrAlias);
      }
    });
    return cleanup;
  }, [history]);

  if (!history) {
    return null;
  }

  return /*#__PURE__*/React.createElement(GamepadEngineProvider, {
    notifyFocusRequest: notifyFocusRequest,
    onFocusedIdChange: handleFocusedIdChange,
    onFocusedIdChangeFail: handleFocusedIdChangeFail,
    keyboardGamepadMap: keyboardGamepadMap,
    isInputLegendClickable: isInputLegendClickable
  }, /*#__PURE__*/React.createElement(Router, {
    history: history,
    children: children
  }));
}
;// CONCATENATED MODULE: ./packages/engine/src/providers/RouterEngineProvider/Redirect.tsx



function Redirect_Redirect({
  history,
  to,
  from
}) {
  const match = useRouteMatch(from);
  useEffect(() => {
    const destination = match ? compile(to)(match.params) : to;
    history.replace(destination);
  }, [history, to, match]);
  return null;
}
function Redirect_RedirectWrapper({
  from,
  to
}) {
  return /*#__PURE__*/React.createElement(Route, {
    exact: true,
    path: from,
    render: ({
      history
    }) => /*#__PURE__*/React.createElement(Redirect_Redirect, {
      history: history,
      to: to,
      from: from
    })
  });
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
// EXTERNAL MODULE: ./node_modules/prop-types/index.js
var prop_types = __webpack_require__(5697);
var prop_types_default = /*#__PURE__*/__webpack_require__.n(prop_types);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
function extends_extends() {
  extends_extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return extends_extends.apply(this, arguments);
}
;// CONCATENATED MODULE: ./node_modules/resolve-pathname/esm/resolve-pathname.js
function isAbsolute(pathname) {
  return pathname.charAt(0) === '/';
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k];
  }

  list.pop();
}

// This implementation is based heavily on node's url.parse
function resolvePathname(to, from) {
  if (from === undefined) from = '';

  var toParts = (to && to.split('/')) || [];
  var fromParts = (from && from.split('/')) || [];

  var isToAbs = to && isAbsolute(to);
  var isFromAbs = from && isAbsolute(from);
  var mustEndAbs = isToAbs || isFromAbs;

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts;
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop();
    fromParts = fromParts.concat(toParts);
  }

  if (!fromParts.length) return '/';

  var hasTrailingSlash;
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1];
    hasTrailingSlash = last === '.' || last === '..' || last === '';
  } else {
    hasTrailingSlash = false;
  }

  var up = 0;
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i];

    if (part === '.') {
      spliceOne(fromParts, i);
    } else if (part === '..') {
      spliceOne(fromParts, i);
      up++;
    } else if (up) {
      spliceOne(fromParts, i);
      up--;
    }
  }

  if (!mustEndAbs) for (; up--; up) fromParts.unshift('..');

  if (
    mustEndAbs &&
    fromParts[0] !== '' &&
    (!fromParts[0] || !isAbsolute(fromParts[0]))
  )
    fromParts.unshift('');

  var result = fromParts.join('/');

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/';

  return result;
}

/* harmony default export */ const resolve_pathname = (resolvePathname);

;// CONCATENATED MODULE: ./node_modules/history/esm/history.js






function addLeadingSlash(path) {
  return path.charAt(0) === '/' ? path : '/' + path;
}
function stripLeadingSlash(path) {
  return path.charAt(0) === '/' ? path.substr(1) : path;
}
function hasBasename(path, prefix) {
  return path.toLowerCase().indexOf(prefix.toLowerCase()) === 0 && '/?#'.indexOf(path.charAt(prefix.length)) !== -1;
}
function stripBasename(path, prefix) {
  return hasBasename(path, prefix) ? path.substr(prefix.length) : path;
}
function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === '/' ? path.slice(0, -1) : path;
}
function parsePath(path) {
  var pathname = path || '/';
  var search = '';
  var hash = '';
  var hashIndex = pathname.indexOf('#');

  if (hashIndex !== -1) {
    hash = pathname.substr(hashIndex);
    pathname = pathname.substr(0, hashIndex);
  }

  var searchIndex = pathname.indexOf('?');

  if (searchIndex !== -1) {
    search = pathname.substr(searchIndex);
    pathname = pathname.substr(0, searchIndex);
  }

  return {
    pathname: pathname,
    search: search === '?' ? '' : search,
    hash: hash === '#' ? '' : hash
  };
}
function history_createPath(location) {
  var pathname = location.pathname,
      search = location.search,
      hash = location.hash;
  var path = pathname || '/';
  if (search && search !== '?') path += search.charAt(0) === '?' ? search : "?" + search;
  if (hash && hash !== '#') path += hash.charAt(0) === '#' ? hash : "#" + hash;
  return path;
}

function history_createLocation(path, state, key, currentLocation) {
  var location;

  if (typeof path === 'string') {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = extends_extends({}, path);
    if (location.pathname === undefined) location.pathname = '';

    if (location.search) {
      if (location.search.charAt(0) !== '?') location.search = '?' + location.search;
    } else {
      location.search = '';
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== '#') location.hash = '#' + location.hash;
    } else {
      location.hash = '';
    }

    if (state !== undefined && location.state === undefined) location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError('Pathname "' + location.pathname + '" could not be decoded. ' + 'This is likely caused by an invalid percent-encoding.');
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== '/') {
      location.pathname = resolve_pathname(location.pathname, currentLocation.pathname);
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = '/';
    }
  }

  return location;
}
function history_locationsAreEqual(a, b) {
  return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash && a.key === b.key && valueEqual(a.state, b.state);
}

function createTransitionManager() {
  var prompt = null;

  function setPrompt(nextPrompt) {
     false ? 0 : void 0;
    prompt = nextPrompt;
    return function () {
      if (prompt === nextPrompt) prompt = null;
    };
  }

  function confirmTransitionTo(location, action, getUserConfirmation, callback) {
    // TODO: If another transition starts while we're still confirming
    // the previous one, we may end up in a weird state. Figure out the
    // best way to handle this.
    if (prompt != null) {
      var result = typeof prompt === 'function' ? prompt(location, action) : prompt;

      if (typeof result === 'string') {
        if (typeof getUserConfirmation === 'function') {
          getUserConfirmation(result, callback);
        } else {
           false ? 0 : void 0;
          callback(true);
        }
      } else {
        // Return false from a transition hook to cancel the transition.
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  var listeners = [];

  function appendListener(fn) {
    var isActive = true;

    function listener() {
      if (isActive) fn.apply(void 0, arguments);
    }

    listeners.push(listener);
    return function () {
      isActive = false;
      listeners = listeners.filter(function (item) {
        return item !== listener;
      });
    };
  }

  function notifyListeners() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    listeners.forEach(function (listener) {
      return listener.apply(void 0, args);
    });
  }

  return {
    setPrompt: setPrompt,
    confirmTransitionTo: confirmTransitionTo,
    appendListener: appendListener,
    notifyListeners: notifyListeners
  };
}

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
function getConfirmation(message, callback) {
  callback(window.confirm(message)); // eslint-disable-line no-alert
}
/**
 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
 *
 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
 * changed to avoid false negatives for Windows Phones: https://github.com/reactjs/react-router/issues/586
 */

function supportsHistory() {
  var ua = window.navigator.userAgent;
  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) return false;
  return window.history && 'pushState' in window.history;
}
/**
 * Returns true if browser fires popstate on hash change.
 * IE10 and IE11 do not.
 */

function supportsPopStateOnHashChange() {
  return window.navigator.userAgent.indexOf('Trident') === -1;
}
/**
 * Returns false if using go(n) with hash history causes a full page reload.
 */

function supportsGoWithoutReloadUsingHash() {
  return window.navigator.userAgent.indexOf('Firefox') === -1;
}
/**
 * Returns true if a given popstate event is an extraneous WebKit event.
 * Accounts for the fact that Chrome on iOS fires real popstate events
 * containing undefined state when pressing the back button.
 */

function isExtraneousPopstateEvent(event) {
  return event.state === undefined && navigator.userAgent.indexOf('CriOS') === -1;
}

var PopStateEvent = 'popstate';
var HashChangeEvent = 'hashchange';

function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}
/**
 * Creates a history object that uses the HTML5 history API including
 * pushState, replaceState, and the popstate event.
 */


function createBrowserHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ?  false ? 0 : invariant(false) : void 0;
  var globalHistory = window.history;
  var canUseHistory = supportsHistory();
  var needsHashChangeListener = !supportsPopStateOnHashChange();
  var _props = props,
      _props$forceRefresh = _props.forceRefresh,
      forceRefresh = _props$forceRefresh === void 0 ? false : _props$forceRefresh,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';

  function getDOMLocation(historyState) {
    var _ref = historyState || {},
        key = _ref.key,
        state = _ref.state;

    var _window$location = window.location,
        pathname = _window$location.pathname,
        search = _window$location.search,
        hash = _window$location.hash;
    var path = pathname + search + hash;
     false ? 0 : void 0;
    if (basename) path = stripBasename(path, basename);
    return history_createLocation(path, state, key);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function handlePopState(event) {
    // Ignore extraneous popstate events in WebKit.
    if (isExtraneousPopstateEvent(event)) return;
    handlePop(getDOMLocation(event.state));
  }

  function handleHashChange() {
    handlePop(getDOMLocation(getHistoryState()));
  }

  var forceNextPop = false;

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of keys we've seen in sessionStorage.
    // Instead, we just default to 0 for keys we don't know.

    var toIndex = allKeys.indexOf(toLocation.key);
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allKeys.indexOf(fromLocation.key);
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  }

  var initialLocation = getDOMLocation(getHistoryState());
  var allKeys = [initialLocation.key]; // Public interface

  function createHref(location) {
    return basename + history_createPath(location);
  }

  function push(path, state) {
     false ? 0 : void 0;
    var action = 'PUSH';
    var location = history_createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.pushState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.href = href;
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          var nextKeys = allKeys.slice(0, prevIndex + 1);
          nextKeys.push(location.key);
          allKeys = nextKeys;
          setState({
            action: action,
            location: location
          });
        }
      } else {
         false ? 0 : void 0;
        window.location.href = href;
      }
    });
  }

  function replace(path, state) {
     false ? 0 : void 0;
    var action = 'REPLACE';
    var location = history_createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var href = createHref(location);
      var key = location.key,
          state = location.state;

      if (canUseHistory) {
        globalHistory.replaceState({
          key: key,
          state: state
        }, null, href);

        if (forceRefresh) {
          window.location.replace(href);
        } else {
          var prevIndex = allKeys.indexOf(history.location.key);
          if (prevIndex !== -1) allKeys[prevIndex] = location.key;
          setState({
            action: action,
            location: location
          });
        }
      } else {
         false ? 0 : void 0;
        window.location.replace(href);
      }
    });
  }

  function go(n) {
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.addEventListener(HashChangeEvent, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(PopStateEvent, handlePopState);
      if (needsHashChangeListener) window.removeEventListener(HashChangeEvent, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

var HashChangeEvent$1 = 'hashchange';
var HashPathCoders = {
  hashbang: {
    encodePath: function encodePath(path) {
      return path.charAt(0) === '!' ? path : '!/' + stripLeadingSlash(path);
    },
    decodePath: function decodePath(path) {
      return path.charAt(0) === '!' ? path.substr(1) : path;
    }
  },
  noslash: {
    encodePath: stripLeadingSlash,
    decodePath: addLeadingSlash
  },
  slash: {
    encodePath: addLeadingSlash,
    decodePath: addLeadingSlash
  }
};

function stripHash(url) {
  var hashIndex = url.indexOf('#');
  return hashIndex === -1 ? url : url.slice(0, hashIndex);
}

function getHashPath() {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var hashIndex = href.indexOf('#');
  return hashIndex === -1 ? '' : href.substring(hashIndex + 1);
}

function pushHashPath(path) {
  window.location.hash = path;
}

function replaceHashPath(path) {
  window.location.replace(stripHash(window.location.href) + '#' + path);
}

function createHashHistory(props) {
  if (props === void 0) {
    props = {};
  }

  !canUseDOM ?  false ? 0 : invariant(false) : void 0;
  var globalHistory = window.history;
  var canGoWithoutReload = supportsGoWithoutReloadUsingHash();
  var _props = props,
      _props$getUserConfirm = _props.getUserConfirmation,
      getUserConfirmation = _props$getUserConfirm === void 0 ? getConfirmation : _props$getUserConfirm,
      _props$hashType = _props.hashType,
      hashType = _props$hashType === void 0 ? 'slash' : _props$hashType;
  var basename = props.basename ? stripTrailingSlash(addLeadingSlash(props.basename)) : '';
  var _HashPathCoders$hashT = HashPathCoders[hashType],
      encodePath = _HashPathCoders$hashT.encodePath,
      decodePath = _HashPathCoders$hashT.decodePath;

  function getDOMLocation() {
    var path = decodePath(getHashPath());
     false ? 0 : void 0;
    if (basename) path = stripBasename(path, basename);
    return history_createLocation(path);
  }

  var transitionManager = createTransitionManager();

  function setState(nextState) {
    _extends(history, nextState);

    history.length = globalHistory.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  var forceNextPop = false;
  var ignorePath = null;

  function locationsAreEqual$$1(a, b) {
    return a.pathname === b.pathname && a.search === b.search && a.hash === b.hash;
  }

  function handleHashChange() {
    var path = getHashPath();
    var encodedPath = encodePath(path);

    if (path !== encodedPath) {
      // Ensure we always have a properly-encoded hash.
      replaceHashPath(encodedPath);
    } else {
      var location = getDOMLocation();
      var prevLocation = history.location;
      if (!forceNextPop && locationsAreEqual$$1(prevLocation, location)) return; // A hashchange doesn't always == location change.

      if (ignorePath === history_createPath(location)) return; // Ignore this change; we already setState in push/replace.

      ignorePath = null;
      handlePop(location);
    }
  }

  function handlePop(location) {
    if (forceNextPop) {
      forceNextPop = false;
      setState();
    } else {
      var action = 'POP';
      transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
        if (ok) {
          setState({
            action: action,
            location: location
          });
        } else {
          revertPop(location);
        }
      });
    }
  }

  function revertPop(fromLocation) {
    var toLocation = history.location; // TODO: We could probably make this more reliable by
    // keeping a list of paths we've seen in sessionStorage.
    // Instead, we just default to 0 for paths we don't know.

    var toIndex = allPaths.lastIndexOf(history_createPath(toLocation));
    if (toIndex === -1) toIndex = 0;
    var fromIndex = allPaths.lastIndexOf(history_createPath(fromLocation));
    if (fromIndex === -1) fromIndex = 0;
    var delta = toIndex - fromIndex;

    if (delta) {
      forceNextPop = true;
      go(delta);
    }
  } // Ensure the hash is encoded properly before doing anything else.


  var path = getHashPath();
  var encodedPath = encodePath(path);
  if (path !== encodedPath) replaceHashPath(encodedPath);
  var initialLocation = getDOMLocation();
  var allPaths = [history_createPath(initialLocation)]; // Public interface

  function createHref(location) {
    var baseTag = document.querySelector('base');
    var href = '';

    if (baseTag && baseTag.getAttribute('href')) {
      href = stripHash(window.location.href);
    }

    return href + '#' + encodePath(basename + history_createPath(location));
  }

  function push(path, state) {
     false ? 0 : void 0;
    var action = 'PUSH';
    var location = history_createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = history_createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a PUSH, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        pushHashPath(encodedPath);
        var prevIndex = allPaths.lastIndexOf(history_createPath(history.location));
        var nextPaths = allPaths.slice(0, prevIndex + 1);
        nextPaths.push(path);
        allPaths = nextPaths;
        setState({
          action: action,
          location: location
        });
      } else {
         false ? 0 : void 0;
        setState();
      }
    });
  }

  function replace(path, state) {
     false ? 0 : void 0;
    var action = 'REPLACE';
    var location = history_createLocation(path, undefined, undefined, history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var path = history_createPath(location);
      var encodedPath = encodePath(basename + path);
      var hashChanged = getHashPath() !== encodedPath;

      if (hashChanged) {
        // We cannot tell if a hashchange was caused by a REPLACE, so we'd
        // rather setState here and ignore the hashchange. The caveat here
        // is that other hash histories in the page will consider it a POP.
        ignorePath = path;
        replaceHashPath(encodedPath);
      }

      var prevIndex = allPaths.indexOf(history_createPath(history.location));
      if (prevIndex !== -1) allPaths[prevIndex] = path;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
     false ? 0 : void 0;
    globalHistory.go(n);
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  var listenerCount = 0;

  function checkDOMListeners(delta) {
    listenerCount += delta;

    if (listenerCount === 1 && delta === 1) {
      window.addEventListener(HashChangeEvent$1, handleHashChange);
    } else if (listenerCount === 0) {
      window.removeEventListener(HashChangeEvent$1, handleHashChange);
    }
  }

  var isBlocked = false;

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    var unblock = transitionManager.setPrompt(prompt);

    if (!isBlocked) {
      checkDOMListeners(1);
      isBlocked = true;
    }

    return function () {
      if (isBlocked) {
        isBlocked = false;
        checkDOMListeners(-1);
      }

      return unblock();
    };
  }

  function listen(listener) {
    var unlisten = transitionManager.appendListener(listener);
    checkDOMListeners(1);
    return function () {
      checkDOMListeners(-1);
      unlisten();
    };
  }

  var history = {
    length: globalHistory.length,
    action: 'POP',
    location: initialLocation,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    block: block,
    listen: listen
  };
  return history;
}

function clamp(n, lowerBound, upperBound) {
  return Math.min(Math.max(n, lowerBound), upperBound);
}
/**
 * Creates a history object that stores locations in memory.
 */


function createMemoryHistory(props) {
  if (props === void 0) {
    props = {};
  }

  var _props = props,
      getUserConfirmation = _props.getUserConfirmation,
      _props$initialEntries = _props.initialEntries,
      initialEntries = _props$initialEntries === void 0 ? ['/'] : _props$initialEntries,
      _props$initialIndex = _props.initialIndex,
      initialIndex = _props$initialIndex === void 0 ? 0 : _props$initialIndex,
      _props$keyLength = _props.keyLength,
      keyLength = _props$keyLength === void 0 ? 6 : _props$keyLength;
  var transitionManager = createTransitionManager();

  function setState(nextState) {
    extends_extends(history, nextState);

    history.length = history.entries.length;
    transitionManager.notifyListeners(history.location, history.action);
  }

  function createKey() {
    return Math.random().toString(36).substr(2, keyLength);
  }

  var index = clamp(initialIndex, 0, initialEntries.length - 1);
  var entries = initialEntries.map(function (entry) {
    return typeof entry === 'string' ? history_createLocation(entry, undefined, createKey()) : history_createLocation(entry, undefined, entry.key || createKey());
  }); // Public interface

  var createHref = history_createPath;

  function push(path, state) {
     false ? 0 : void 0;
    var action = 'PUSH';
    var location = history_createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      var prevIndex = history.index;
      var nextIndex = prevIndex + 1;
      var nextEntries = history.entries.slice(0);

      if (nextEntries.length > nextIndex) {
        nextEntries.splice(nextIndex, nextEntries.length - nextIndex, location);
      } else {
        nextEntries.push(location);
      }

      setState({
        action: action,
        location: location,
        index: nextIndex,
        entries: nextEntries
      });
    });
  }

  function replace(path, state) {
     false ? 0 : void 0;
    var action = 'REPLACE';
    var location = history_createLocation(path, state, createKey(), history.location);
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (!ok) return;
      history.entries[history.index] = location;
      setState({
        action: action,
        location: location
      });
    });
  }

  function go(n) {
    var nextIndex = clamp(history.index + n, 0, history.entries.length - 1);
    var action = 'POP';
    var location = history.entries[nextIndex];
    transitionManager.confirmTransitionTo(location, action, getUserConfirmation, function (ok) {
      if (ok) {
        setState({
          action: action,
          location: location,
          index: nextIndex
        });
      } else {
        // Mimic the behavior of DOM histories by
        // causing a render after a cancelled POP.
        setState();
      }
    });
  }

  function goBack() {
    go(-1);
  }

  function goForward() {
    go(1);
  }

  function canGo(n) {
    var nextIndex = history.index + n;
    return nextIndex >= 0 && nextIndex < history.entries.length;
  }

  function block(prompt) {
    if (prompt === void 0) {
      prompt = false;
    }

    return transitionManager.setPrompt(prompt);
  }

  function listen(listener) {
    return transitionManager.appendListener(listener);
  }

  var history = {
    length: entries.length,
    action: 'POP',
    location: entries[index],
    index: index,
    entries: entries,
    createHref: createHref,
    push: push,
    replace: replace,
    go: go,
    goBack: goBack,
    goForward: goForward,
    canGo: canGo,
    block: block,
    listen: listen
  };
  return history;
}



;// CONCATENATED MODULE: ./node_modules/mini-create-react-context/node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function setPrototypeOf_setPrototypeOf(o, p) {
  setPrototypeOf_setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return setPrototypeOf_setPrototypeOf(o, p);
}
;// CONCATENATED MODULE: ./node_modules/mini-create-react-context/node_modules/@babel/runtime/helpers/esm/inheritsLoose.js

function inheritsLoose_inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  setPrototypeOf_setPrototypeOf(subClass, superClass);
}
;// CONCATENATED MODULE: ./node_modules/mini-create-react-context/dist/esm/index.js





var MAX_SIGNED_31_BIT_INT = 1073741823;
var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof __webpack_require__.g !== 'undefined' ? __webpack_require__.g : {};

function getUniqueId() {
  var key = '__global_unique_id__';
  return commonjsGlobal[key] = (commonjsGlobal[key] || 0) + 1;
}

function objectIs(x, y) {
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function createEventEmitter(value) {
  var handlers = [];
  return {
    on: function on(handler) {
      handlers.push(handler);
    },
    off: function off(handler) {
      handlers = handlers.filter(function (h) {
        return h !== handler;
      });
    },
    get: function get() {
      return value;
    },
    set: function set(newValue, changedBits) {
      value = newValue;
      handlers.forEach(function (handler) {
        return handler(value, changedBits);
      });
    }
  };
}

function onlyChild(children) {
  return Array.isArray(children) ? children[0] : children;
}

function createReactContext(defaultValue, calculateChangedBits) {
  var _Provider$childContex, _Consumer$contextType;

  var contextProp = '__create-react-context-' + getUniqueId() + '__';

  var Provider = /*#__PURE__*/function (_Component) {
    inheritsLoose_inheritsLoose(Provider, _Component);

    function Provider() {
      var _this;

      _this = _Component.apply(this, arguments) || this;
      _this.emitter = createEventEmitter(_this.props.value);
      return _this;
    }

    var _proto = Provider.prototype;

    _proto.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[contextProp] = this.emitter, _ref;
    };

    _proto.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        var oldValue = this.props.value;
        var newValue = nextProps.value;
        var changedBits;

        if (objectIs(oldValue, newValue)) {
          changedBits = 0;
        } else {
          changedBits = typeof calculateChangedBits === 'function' ? calculateChangedBits(oldValue, newValue) : MAX_SIGNED_31_BIT_INT;

          if (false) {}

          changedBits |= 0;

          if (changedBits !== 0) {
            this.emitter.set(nextProps.value, changedBits);
          }
        }
      }
    };

    _proto.render = function render() {
      return this.props.children;
    };

    return Provider;
  }(react.Component);

  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[contextProp] = (prop_types_default()).object.isRequired, _Provider$childContex);

  var Consumer = /*#__PURE__*/function (_Component2) {
    inheritsLoose_inheritsLoose(Consumer, _Component2);

    function Consumer() {
      var _this2;

      _this2 = _Component2.apply(this, arguments) || this;
      _this2.state = {
        value: _this2.getValue()
      };

      _this2.onUpdate = function (newValue, changedBits) {
        var observedBits = _this2.observedBits | 0;

        if ((observedBits & changedBits) !== 0) {
          _this2.setState({
            value: _this2.getValue()
          });
        }
      };

      return _this2;
    }

    var _proto2 = Consumer.prototype;

    _proto2.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      var observedBits = nextProps.observedBits;
      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT : observedBits;
    };

    _proto2.componentDidMount = function componentDidMount() {
      if (this.context[contextProp]) {
        this.context[contextProp].on(this.onUpdate);
      }

      var observedBits = this.props.observedBits;
      this.observedBits = observedBits === undefined || observedBits === null ? MAX_SIGNED_31_BIT_INT : observedBits;
    };

    _proto2.componentWillUnmount = function componentWillUnmount() {
      if (this.context[contextProp]) {
        this.context[contextProp].off(this.onUpdate);
      }
    };

    _proto2.getValue = function getValue() {
      if (this.context[contextProp]) {
        return this.context[contextProp].get();
      } else {
        return defaultValue;
      }
    };

    _proto2.render = function render() {
      return onlyChild(this.props.children)(this.state.value);
    };

    return Consumer;
  }(react.Component);

  Consumer.contextTypes = (_Consumer$contextType = {}, _Consumer$contextType[contextProp] = (prop_types_default()).object, _Consumer$contextType);
  return {
    Provider: Provider,
    Consumer: Consumer
  };
}

var index = react.createContext || createReactContext;

/* harmony default export */ const dist_esm = (index);

;// CONCATENATED MODULE: ./node_modules/tiny-invariant/dist/tiny-invariant.esm.js
var isProduction = "production" === 'production';
var prefix = 'Invariant failed';
function tiny_invariant_esm_invariant(condition, message) {
    if (condition) {
        return;
    }
    if (isProduction) {
        throw new Error(prefix);
    }
    throw new Error(prefix + ": " + (message || ''));
}

/* harmony default export */ const tiny_invariant_esm = (tiny_invariant_esm_invariant);

// EXTERNAL MODULE: ./node_modules/react-router/node_modules/path-to-regexp/index.js
var path_to_regexp = __webpack_require__(9658);
var path_to_regexp_default = /*#__PURE__*/__webpack_require__.n(path_to_regexp);
// EXTERNAL MODULE: ./node_modules/react-is/index.js
var react_is = __webpack_require__(9864);
;// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}
// EXTERNAL MODULE: ./node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs.js
var hoist_non_react_statics_cjs = __webpack_require__(8679);
;// CONCATENATED MODULE: ./node_modules/react-router/esm/react-router.js













// TODO: Replace with React.createContext once we can assume React 16+

var createNamedContext = function createNamedContext(name) {
  var context = dist_esm();
  context.displayName = name;
  return context;
};

var context =
/*#__PURE__*/
createNamedContext("Router");

/**
 * The public API for putting history on context.
 */

var react_router_Router =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Router, _React$Component);

  Router.computeRootMatch = function computeRootMatch(pathname) {
    return {
      path: "/",
      url: "/",
      params: {},
      isExact: pathname === "/"
    };
  };

  function Router(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      location: props.history.location
    }; // This is a bit of a hack. We have to start listening for location
    // changes here in the constructor in case there are any <Redirect>s
    // on the initial render. If there are, they will replace/push when
    // they mount and since cDM fires in children before parents, we may
    // get a new location before the <Router> is mounted.

    _this._isMounted = false;
    _this._pendingLocation = null;

    if (!props.staticContext) {
      _this.unlisten = props.history.listen(function (location) {
        if (_this._isMounted) {
          _this.setState({
            location: location
          });
        } else {
          _this._pendingLocation = location;
        }
      });
    }

    return _this;
  }

  var _proto = Router.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this._isMounted = true;

    if (this._pendingLocation) {
      this.setState({
        location: this._pendingLocation
      });
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.unlisten) this.unlisten();
  };

  _proto.render = function render() {
    return react.createElement(context.Provider, {
      children: this.props.children || null,
      value: {
        history: this.props.history,
        location: this.state.location,
        match: Router.computeRootMatch(this.state.location.pathname),
        staticContext: this.props.staticContext
      }
    });
  };

  return Router;
}(react.Component);

if (false) {}

/**
 * The public API for a <Router> that stores location in memory.
 */

var react_router_MemoryRouter =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(MemoryRouter, _React$Component);

  function MemoryRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = createMemoryHistory(_this.props);
    return _this;
  }

  var _proto = MemoryRouter.prototype;

  _proto.render = function render() {
    return react.createElement(react_router_Router, {
      history: this.history,
      children: this.props.children
    });
  };

  return MemoryRouter;
}(react.Component);

if (false) {}

var Lifecycle =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Lifecycle, _React$Component);

  function Lifecycle() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Lifecycle.prototype;

  _proto.componentDidMount = function componentDidMount() {
    if (this.props.onMount) this.props.onMount.call(this, this);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.onUpdate) this.props.onUpdate.call(this, this, prevProps);
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    if (this.props.onUnmount) this.props.onUnmount.call(this, this);
  };

  _proto.render = function render() {
    return null;
  };

  return Lifecycle;
}(react.Component);

/**
 * The public API for prompting the user before navigating away from a screen.
 */

function Prompt(_ref) {
  var message = _ref.message,
      _ref$when = _ref.when,
      when = _ref$when === void 0 ? true : _ref$when;
  return React.createElement(context.Consumer, null, function (context) {
    !context ?  false ? 0 : invariant(false) : void 0;
    if (!when || context.staticContext) return null;
    var method = context.history.block;
    return React.createElement(Lifecycle, {
      onMount: function onMount(self) {
        self.release = method(message);
      },
      onUpdate: function onUpdate(self, prevProps) {
        if (prevProps.message !== message) {
          self.release();
          self.release = method(message);
        }
      },
      onUnmount: function onUnmount(self) {
        self.release();
      },
      message: message
    });
  });
}

if (false) { var messageType; }

var cache = {};
var cacheLimit = 10000;
var cacheCount = 0;

function compilePath(path) {
  if (cache[path]) return cache[path];
  var generator = pathToRegexp.compile(path);

  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }

  return generator;
}
/**
 * Public API for generating a URL pathname from a path and parameters.
 */


function generatePath(path, params) {
  if (path === void 0) {
    path = "/";
  }

  if (params === void 0) {
    params = {};
  }

  return path === "/" ? path : compilePath(path)(params, {
    pretty: true
  });
}

/**
 * The public API for navigating programmatically with a component.
 */

function react_router_Redirect(_ref) {
  var computedMatch = _ref.computedMatch,
      to = _ref.to,
      _ref$push = _ref.push,
      push = _ref$push === void 0 ? false : _ref$push;
  return React.createElement(context.Consumer, null, function (context) {
    !context ?  false ? 0 : invariant(false) : void 0;
    var history = context.history,
        staticContext = context.staticContext;
    var method = push ? history.push : history.replace;
    var location = createLocation(computedMatch ? typeof to === "string" ? generatePath(to, computedMatch.params) : _extends({}, to, {
      pathname: generatePath(to.pathname, computedMatch.params)
    }) : to); // When rendering in a static context,
    // set the new location immediately.

    if (staticContext) {
      method(location);
      return null;
    }

    return React.createElement(Lifecycle, {
      onMount: function onMount() {
        method(location);
      },
      onUpdate: function onUpdate(self, prevProps) {
        var prevLocation = createLocation(prevProps.to);

        if (!locationsAreEqual(prevLocation, _extends({}, location, {
          key: prevLocation.key
        }))) {
          method(location);
        }
      },
      to: to
    });
  });
}

if (false) {}

var cache$1 = {};
var cacheLimit$1 = 10000;
var cacheCount$1 = 0;

function compilePath$1(path, options) {
  var cacheKey = "" + options.end + options.strict + options.sensitive;
  var pathCache = cache$1[cacheKey] || (cache$1[cacheKey] = {});
  if (pathCache[path]) return pathCache[path];
  var keys = [];
  var regexp = path_to_regexp_default()(path, keys, options);
  var result = {
    regexp: regexp,
    keys: keys
  };

  if (cacheCount$1 < cacheLimit$1) {
    pathCache[path] = result;
    cacheCount$1++;
  }

  return result;
}
/**
 * Public API for matching a URL pathname to a path.
 */


function react_router_matchPath(pathname, options) {
  if (options === void 0) {
    options = {};
  }

  if (typeof options === "string" || Array.isArray(options)) {
    options = {
      path: options
    };
  }

  var _options = options,
      path = _options.path,
      _options$exact = _options.exact,
      exact = _options$exact === void 0 ? false : _options$exact,
      _options$strict = _options.strict,
      strict = _options$strict === void 0 ? false : _options$strict,
      _options$sensitive = _options.sensitive,
      sensitive = _options$sensitive === void 0 ? false : _options$sensitive;
  var paths = [].concat(path);
  return paths.reduce(function (matched, path) {
    if (!path && path !== "") return null;
    if (matched) return matched;

    var _compilePath = compilePath$1(path, {
      end: exact,
      strict: strict,
      sensitive: sensitive
    }),
        regexp = _compilePath.regexp,
        keys = _compilePath.keys;

    var match = regexp.exec(pathname);
    if (!match) return null;
    var url = match[0],
        values = match.slice(1);
    var isExact = pathname === url;
    if (exact && !isExact) return null;
    return {
      path: path,
      // the path used to match
      url: path === "/" && url === "" ? "/" : url,
      // the matched portion of the URL
      isExact: isExact,
      // whether or not we matched exactly
      params: keys.reduce(function (memo, key, index) {
        memo[key.name] = values[index];
        return memo;
      }, {})
    };
  }, null);
}

function isEmptyChildren(children) {
  return React.Children.count(children) === 0;
}

function evalChildrenDev(children, props, path) {
  var value = children(props);
   false ? 0 : void 0;
  return value || null;
}
/**
 * The public API for matching a single path and rendering.
 */


var react_router_Route =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Route, _React$Component);

  function Route() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Route.prototype;

  _proto.render = function render() {
    var _this = this;

    return react.createElement(context.Consumer, null, function (context$1) {
      !context$1 ?  false ? 0 : tiny_invariant_esm(false) : void 0;
      var location = _this.props.location || context$1.location;
      var match = _this.props.computedMatch ? _this.props.computedMatch // <Switch> already computed the match for us
      : _this.props.path ? react_router_matchPath(location.pathname, _this.props) : context$1.match;

      var props = extends_extends({}, context$1, {
        location: location,
        match: match
      });

      var _this$props = _this.props,
          children = _this$props.children,
          component = _this$props.component,
          render = _this$props.render; // Preact uses an empty array as children by
      // default, so use null if that's the case.

      if (Array.isArray(children) && children.length === 0) {
        children = null;
      }

      return react.createElement(context.Provider, {
        value: props
      }, props.match ? children ? typeof children === "function" ?  false ? 0 : children(props) : children : component ? react.createElement(component, props) : render ? render(props) : null : typeof children === "function" ?  false ? 0 : children(props) : null);
    });
  };

  return Route;
}(react.Component);

if (false) {}

function react_router_addLeadingSlash(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
}

function addBasename(basename, location) {
  if (!basename) return location;
  return extends_extends({}, location, {
    pathname: react_router_addLeadingSlash(basename) + location.pathname
  });
}

function react_router_stripBasename(basename, location) {
  if (!basename) return location;
  var base = react_router_addLeadingSlash(basename);
  if (location.pathname.indexOf(base) !== 0) return location;
  return extends_extends({}, location, {
    pathname: location.pathname.substr(base.length)
  });
}

function createURL(location) {
  return typeof location === "string" ? location : history_createPath(location);
}

function staticHandler(methodName) {
  return function () {
      false ? 0 : tiny_invariant_esm(false) ;
  };
}

function noop() {}
/**
 * The public top-level API for a "static" <Router>, so-called because it
 * can't actually change the current location. Instead, it just records
 * location changes in a context object. Useful mainly in testing and
 * server-rendering scenarios.
 */


var StaticRouter =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(StaticRouter, _React$Component);

  function StaticRouter() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;

    _this.handlePush = function (location) {
      return _this.navigateTo(location, "PUSH");
    };

    _this.handleReplace = function (location) {
      return _this.navigateTo(location, "REPLACE");
    };

    _this.handleListen = function () {
      return noop;
    };

    _this.handleBlock = function () {
      return noop;
    };

    return _this;
  }

  var _proto = StaticRouter.prototype;

  _proto.navigateTo = function navigateTo(location, action) {
    var _this$props = this.props,
        _this$props$basename = _this$props.basename,
        basename = _this$props$basename === void 0 ? "" : _this$props$basename,
        _this$props$context = _this$props.context,
        context = _this$props$context === void 0 ? {} : _this$props$context;
    context.action = action;
    context.location = addBasename(basename, history_createLocation(location));
    context.url = createURL(context.location);
  };

  _proto.render = function render() {
    var _this$props2 = this.props,
        _this$props2$basename = _this$props2.basename,
        basename = _this$props2$basename === void 0 ? "" : _this$props2$basename,
        _this$props2$context = _this$props2.context,
        context = _this$props2$context === void 0 ? {} : _this$props2$context,
        _this$props2$location = _this$props2.location,
        location = _this$props2$location === void 0 ? "/" : _this$props2$location,
        rest = objectWithoutPropertiesLoose_objectWithoutPropertiesLoose(_this$props2, ["basename", "context", "location"]);

    var history = {
      createHref: function createHref(path) {
        return react_router_addLeadingSlash(basename + createURL(path));
      },
      action: "POP",
      location: react_router_stripBasename(basename, history_createLocation(location)),
      push: this.handlePush,
      replace: this.handleReplace,
      go: staticHandler("go"),
      goBack: staticHandler("goBack"),
      goForward: staticHandler("goForward"),
      listen: this.handleListen,
      block: this.handleBlock
    };
    return react.createElement(react_router_Router, extends_extends({}, rest, {
      history: history,
      staticContext: context
    }));
  };

  return StaticRouter;
}(react.Component);

if (false) {}

/**
 * The public API for rendering the first <Route> that matches.
 */

var react_router_Switch =
/*#__PURE__*/
function (_React$Component) {
  _inheritsLoose(Switch, _React$Component);

  function Switch() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Switch.prototype;

  _proto.render = function render() {
    var _this = this;

    return react.createElement(context.Consumer, null, function (context) {
      !context ?  false ? 0 : tiny_invariant_esm(false) : void 0;
      var location = _this.props.location || context.location;
      var element, match; // We use React.Children.forEach instead of React.Children.toArray().find()
      // here because toArray adds keys to all child elements and we do not want
      // to trigger an unmount/remount for two <Route>s that render the same
      // component at different URLs.

      react.Children.forEach(_this.props.children, function (child) {
        if (match == null && react.isValidElement(child)) {
          element = child;
          var path = child.props.path || child.props.from;
          match = path ? react_router_matchPath(location.pathname, extends_extends({}, child.props, {
            path: path
          })) : context.match;
        }
      });
      return match ? react.cloneElement(element, {
        location: location,
        computedMatch: match
      }) : null;
    });
  };

  return Switch;
}(react.Component);

if (false) {}

/**
 * A public higher-order component to access the imperative API
 */

function withRouter(Component) {
  var displayName = "withRouter(" + (Component.displayName || Component.name) + ")";

  var C = function C(props) {
    var wrappedComponentRef = props.wrappedComponentRef,
        remainingProps = _objectWithoutPropertiesLoose(props, ["wrappedComponentRef"]);

    return React.createElement(context.Consumer, null, function (context) {
      !context ?  false ? 0 : invariant(false) : void 0;
      return React.createElement(Component, _extends({}, remainingProps, context, {
        ref: wrappedComponentRef
      }));
    });
  };

  C.displayName = displayName;
  C.WrappedComponent = Component;

  if (false) {}

  return hoistStatics(C, Component);
}

var react_router_useContext = react.useContext;
function useHistory() {
  if (false) {}

  return react_router_useContext(context).history;
}
function react_router_useLocation() {
  if (false) {}

  return react_router_useContext(context).location;
}
function useParams() {
  if (false) {}

  var match = react_router_useContext(context).match;
  return match ? match.params : {};
}
function react_router_useRouteMatch(path) {
  if (false) {}

  return path ? react_router_matchPath(react_router_useLocation().pathname, path) : react_router_useContext(context).match;
}

if (false) { var secondaryBuildName, initialBuildName, buildNames, key, global; }


//# sourceMappingURL=react-router.js.map

;// CONCATENATED MODULE: ./packages/engine/src/providers/RouterEngineProvider/RouteHistory.tsx
function RouteHistory_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function RouteHistory_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { RouteHistory_ownKeys(Object(source), true).forEach(function (key) { RouteHistory_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { RouteHistory_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function RouteHistory_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const dummy = {
  push: () => {},
  replace: () => {},
  replaceKeepingFocus: () => {},
  replaceWithPreviousFocus: () => {},
  goBack: () => {}
};
const RouteHistory_context = (0,react.createContext)(dummy);

/**
 * Cache implementation that takes care of removing any trailing slash to store and retrieve entries
 */
const previousFocusedIdCache = (() => {
  const map = new Map();

  const removeTrailingSlash = route => {
    return route.replace(/\/$/, '');
  };

  return {
    set: (route, focusedId) => {
      map.set(removeTrailingSlash(route), focusedId);
    },
    get: route => {
      return map.get(removeTrailingSlash(route));
    }
  };
})();

const RouteHistory_RouteHistoryProvider = ({
  children,
  disabled
}) => {
  const history = useHistory();
  const disabledRef = (0,react.useRef)(disabled);
  disabledRef.current = disabled;
  const historyAPI = (0,react.useMemo)(() => ({
    goBack: () => {
      if (disabledRef.current) return;
      history.goBack();
    },
    push: route => {
      if (disabledRef.current) return;
      history.push(route);
    },
    replace: route => {
      if (disabledRef.current) return;
      history.replace(route);
    },
    replaceKeepingFocus: route => {
      if (disabledRef.current) return;
      const focusedId = urlFocusedId_getFocusedIdFromLocation(history.location);
      previousFocusedIdCache.set(history.location.pathname, focusedId);
      history.replace(urlFocusedId_getURLWithFocusedId(RouteHistory_objectSpread(RouteHistory_objectSpread({}, history.location), {}, {
        pathname: route
      }), focusedId));
    },
    replaceWithPreviousFocus: newRoute => {
      if (disabledRef.current) return;
      const currentFocusedId = urlFocusedId_getFocusedIdFromLocation(history.location);
      previousFocusedIdCache.set(history.location.pathname, currentFocusedId);
      const previousFocusedId = previousFocusedIdCache.get(newRoute);
      history.replace(urlFocusedId_getURLWithFocusedId(RouteHistory_objectSpread(RouteHistory_objectSpread({}, history.location), {}, {
        pathname: newRoute
      }), previousFocusedId));
    }
  }), [history]);
  return /*#__PURE__*/react.createElement(RouteHistory_context.Provider, {
    value: historyAPI
  }, children);
};
const useRouteHistory = () => useContext(RouteHistory_context);
;// CONCATENATED MODULE: ./packages/engine/src/providers/RouterEngineProvider/routeParamsContext.tsx

const paramsContext = (0,react.createContext)({});

/**
 * Provider for the params of a route.
 *
 * This implementation differs from the useRouterParams of react-router by keeping the last known
 * value of the params even after the route is no longer matching.
 *
 * This is important for transitions to run while having access to the params of the route.
 */
function routeParamsContext_RouteParamsProvider({
  match,
  children
}) {
  const paramsRef = useRef({});

  if (match) {
    paramsRef.current = match.params;
  }

  return /*#__PURE__*/React.createElement(paramsContext.Provider, {
    value: paramsRef.current
  }, children);
}
/**
 * Hook for the params of a route.
 *
 * This implementation differs from the useRouterParams of react-router by keeping the last known
 * value of the params even after the route is no longer matching.
 *
 * This is important for transitions to run while having access to the params of the route.
 */

const useRouteParams = () => useContext(paramsContext);
;// CONCATENATED MODULE: ./packages/engine/src/providers/RouterEngineProvider/TestRoute.tsx





/**
 * Component to be used on testing of Route screens/components.
 *
 * It simulates that there is a route configured and the page is in a given URL.
 */
function TestRoute({
  url,
  route,
  children
}) {
  return /*#__PURE__*/React.createElement(MemoryRouter, {
    initialEntries: [url]
  }, /*#__PURE__*/React.createElement(RouteHistoryProvider, {
    disabled: false
  }, /*#__PURE__*/React.createElement(Route, {
    path: route,
    children: routerProps => {
      return /*#__PURE__*/React.createElement(RouteParamsProvider, {
        match: routerProps.match
      }, children);
    }
  })));
}
;// CONCATENATED MODULE: ./packages/react-gamepad-legacy/src/apiContext.tsx


const logWarning = () => {
  if (false) {}
};

const GamepadAPIContext = (0,react.createContext)({
  runAddNodeEffect: () => {},
  isFocusableFocused: () => {
    logWarning();
    return false;
  },
  addOrUpdateNode: logWarning,
  removeNode: logWarning,
  requestAutofocus: logWarning,
  requestFocus: logWarning,
  addAnalogListener: () => {
    logWarning();
    return () => {};
  },
  addDigitalListener: () => {
    logWarning();
    return () => {};
  },
  clickFocusableAtPoint: logWarning,
  focusFocusableAtPoint: logWarning,
  getCurrentFocusable: () => undefined
});
const {
  Provider,
  Consumer
} = GamepadAPIContext;
const GamepadAPIProvider = (/* unused pure expression or super */ null && (Provider));
const GamepadAPIConsumer = (/* unused pure expression or super */ null && (Consumer));
;// CONCATENATED MODULE: ./packages/react-gamepad-legacy/src/pathContext.tsx

const PathContext = (0,react.createContext)([]);
const {
  Provider: pathContext_Provider,
  Consumer: pathContext_Consumer
} = PathContext;

;// CONCATENATED MODULE: ./packages/react-gamepad-legacy/src/id.tsx
// starts with 1 given 0 has a falsy value and can lead to incorrect checks
let seed = 1;
const __generateId = () => seed++;
;// CONCATENATED MODULE: ./packages/react-gamepad-legacy/src/boundedFocusContext.ts

const Context = (0,react.createContext)(true);
const useShouldBoundFocus = () => (0,react.useContext)(Context);
const BoundedFocusProvider = Context.Provider;
const BoundedFocusConsumer = Context.Consumer;
;// CONCATENATED MODULE: ./packages/react-gamepad-legacy/src/useContainer.tsx






function useContainer(gamepad, type, ref, nodeIdRef) {
  const shouldBoundFocus = useShouldBoundFocus();
  const id = (0,react.useMemo)(() => __generateId(), []);

  if (nodeIdRef) {
    nodeIdRef.current = id;
  }

  const gamepadFacet = (0,src.useFacetWrap)(gamepad);
  const api = (0,react.useContext)(GamepadAPIContext);
  const path = (0,react.useContext)(PathContext);
  /**
   * Tries to add the container to the focus tree during the render body to make sure it is available by the time
   * any focusable is rendered.
   *
   * If we rely only on effects, React runs the leaves first (adding the focusables before the containers).
   */

  const gamepadValue = gamepadFacet.get();

  if (gamepadValue != null && gamepadValue != src.NO_VALUE) {
    const container = {
      type: type,
      id: id,
      path: path,
      bounded: shouldBoundFocus && gamepadValue.bounded,
      index: gamepadValue.index,
      defaultFocusedChildAlias: gamepadValue.defaultFocusedChildAlias,
      defaultFocusedChildBehavior: gamepadValue.defaultFocusedChildBehavior,
      disabled: gamepadValue.disabled,
      ref: ref,
      scrollWithAnalog: gamepadValue.scrollWithAnalog,
      scrollIntoView: gamepadValue.scrollIntoView,
      scrollIntoViewAlign: gamepadValue.scrollIntoViewAlign,
      scrollIntoViewOffset: gamepadValue.scrollIntoViewOffset,
      scrollIntoViewSpeedFactor: gamepadValue.scrollIntoViewSpeedFactor
    };
    api.addOrUpdateNode(container);
  }

  (0,src.useFacetEffect)(gamepad => {
    const container = {
      type: type,
      id: id,
      path: path,
      bounded: shouldBoundFocus && gamepad.bounded,
      index: gamepad.index,
      defaultFocusedChildAlias: gamepad.defaultFocusedChildAlias,
      defaultFocusedChildBehavior: gamepad.defaultFocusedChildBehavior,
      disabled: gamepad.disabled,
      ref: ref,
      scrollWithAnalog: gamepad.scrollWithAnalog,
      scrollIntoView: gamepad.scrollIntoView,
      scrollIntoViewAlign: gamepad.scrollIntoViewAlign,
      scrollIntoViewOffset: gamepad.scrollIntoViewOffset,
      scrollIntoViewSpeedFactor: gamepad.scrollIntoViewSpeedFactor
    };
    api.addOrUpdateNode(container);
  }, [api, id, path, type, ref, shouldBoundFocus], [gamepadFacet]); // does nothing on mount
  // doesn't run on updates
  // remove on unmount

  (0,react.useEffect)(() => () => api.removeNode(id), [api, id]);
  const pathWithId = [...path, id];
  const Wrapper = (0,react.useMemo)(() => ({
    children
  }) => /*#__PURE__*/react.createElement(pathContext_Provider, {
    value: pathWithId
  }, children), // Disable lint check because we actually want each value in the array
  // eslint-disable-next-line react-hooks/exhaustive-deps
  pathWithId);
  return Wrapper;
}
;// CONCATENATED MODULE: ./packages/react-gamepad-legacy/src/useRow.tsx

function useRow(gamepad, ref, nodeIdRef) {
  return useContainer(gamepad, 'row', ref, nodeIdRef);
}
;// CONCATENATED MODULE: ./packages/react-gamepad-legacy/src/deprecated.tsx




/**
 * @deprecated use Row instead
 */
function GamepadRow(props) {
  const gamepad = {
    bounded: props.bounded,
    disabled: props.disabled,
    index: props.gamepadIndex,
    defaultFocusedChildAlias: props.defaultFocusedChildAlias,
    defaultFocusedChildBehavior: props.defaultFocusedChildBehavior,
    scrollWithAnalog: props.scrollWithAnalog,
    scrollIntoView: props.scrollIntoView,
    scrollIntoViewAlign: props.scrollIntoViewAlign,
    scrollIntoViewOffset: props.scrollIntoViewOffset,
    scrollIntoViewSpeedFactor: props.scrollIntoViewSpeedFactor
  };
  const Row = useRow(gamepad, props.scrollRef, props.nodeIdRef);
  return /*#__PURE__*/react.createElement(Row, null, props.children);
}

/**
 * @deprecated use Column instead
 */
function GamepadColumn(props) {
  const gamepad = {
    bounded: props.bounded,
    disabled: props.disabled,
    index: props.gamepadIndex,
    defaultFocusedChildAlias: props.defaultFocusedChildAlias,
    defaultFocusedChildBehavior: props.defaultFocusedChildBehavior,
    scrollWithAnalog: props.scrollWithAnalog,
    scrollIntoView: props.scrollIntoView,
    scrollIntoViewAlign: props.scrollIntoViewAlign,
    scrollIntoViewOffset: props.scrollIntoViewOffset,
    scrollIntoViewSpeedFactor: props.scrollIntoViewSpeedFactor
  };
  const Column = useColumn(gamepad, props.scrollRef, props.nodeIdRef);
  return /*#__PURE__*/React.createElement(Column, null, props.children);
}
;// CONCATENATED MODULE: ./packages/react-gamepad-visual/src/context/disabledArea.tsx


const DisabledAreaContext = (0,src.createFacetContext)({});
const {
  Provider: disabledArea_Provider,
  Consumer: disabledArea_Consumer
} = DisabledAreaContext;
const DisabledAreaProvider = (/* unused pure expression or super */ null && (disabledArea_Provider));
const DisabledAreaConsumer = (/* unused pure expression or super */ null && (disabledArea_Consumer));
function DisabledArea({
  disabled,
  hidden,
  children
}) {
  const context = (0,react.useContext)(DisabledAreaContext);
  const disabledFacet = (0,src.useFacetWrap)(disabled);
  const hiddenFacet = (0,src.useFacetWrap)(hidden);
  const value = (0,src.useFacetMap)((context, disabled, hidden) => {
    return {
      disabled: disabled || context.disabled,
      hidden: hidden || context.hidden
    };
  }, [], [context, disabledFacet, hiddenFacet]);
  return /*#__PURE__*/react.createElement(disabledArea_Provider, {
    value: value
  }, children);
}
;// CONCATENATED MODULE: ./packages/navigation-focus-tree/src/types.ts
/**
 * Custom alias provided by the user to identify a node in the focus tree
 * ie: "batata-frita"
 */

/**
 * This is the internal id of a node within the focus tree
 * ie: 2
 */

/**
 * This is the id set by the user to signal which node should be focused
 */
let types_FocusOrigin;

(function (FocusOrigin) {
  FocusOrigin[FocusOrigin["Unknown"] = -1] = "Unknown";
  FocusOrigin[FocusOrigin["Initial"] = 0] = "Initial";
  FocusOrigin[FocusOrigin["FocusInput"] = 1] = "FocusInput";
  FocusOrigin[FocusOrigin["PointerInput"] = 2] = "PointerInput";
  FocusOrigin[FocusOrigin["FocusTreeMutation"] = 3] = "FocusTreeMutation";
  FocusOrigin[FocusOrigin["URL"] = 4] = "URL";
  FocusOrigin[FocusOrigin["DebugTool"] = 5] = "DebugTool";
  FocusOrigin[FocusOrigin["ImperativeSetFocus"] = 6] = "ImperativeSetFocus";
})(types_FocusOrigin || (types_FocusOrigin = {}));

let types_ButtonType;

(function (ButtonType) {
  ButtonType["A"] = "A";
  ButtonType["B"] = "B";
  ButtonType["X"] = "X";
  ButtonType["Y"] = "Y";
  ButtonType["START"] = "START";
  ButtonType["SELECT"] = "SELECT";
  ButtonType["XBOX"] = "XBOX";
  ButtonType["RIGHT_TRIGGER"] = "RT";
  ButtonType["LEFT_TRIGGER"] = "LT";
  ButtonType["LEFT_BUMPER"] = "LB";
  ButtonType["RIGHT_BUMPER"] = "RB";
  ButtonType["L3"] = "L3";
  ButtonType["R3"] = "R3";
  ButtonType["LEFT"] = "LEFT";
  ButtonType["RIGHT"] = "RIGHT";
  ButtonType["UP"] = "UP";
  ButtonType["DOWN"] = "DOWN";
  ButtonType["NEXT"] = "NEXT";
  ButtonType["PREV"] = "PREV";
  ButtonType["LEFT_ANALOG_LEFT"] = "L_LEFT";
  ButtonType["LEFT_ANALOG_RIGHT"] = "L_RIGHT";
  ButtonType["LEFT_ANALOG_UP"] = "L_UP";
  ButtonType["LEFT_ANALOG_DOWN"] = "L_DOWN";
  ButtonType["RIGHT_ANALOG_LEFT"] = "R_LEFT";
  ButtonType["RIGHT_ANALOG_RIGHT"] = "R_RIGHT";
  ButtonType["RIGHT_ANALOG_UP"] = "R_UP";
  ButtonType["RIGHT_ANALOG_DOWN"] = "R_DOWN";
  ButtonType[ButtonType["LEFT_HORIZONTAL_AXIS"] = 0] = "LEFT_HORIZONTAL_AXIS";
  ButtonType[ButtonType["LEFT_VERTICAL_AXIS"] = 1] = "LEFT_VERTICAL_AXIS";
  ButtonType[ButtonType["RIGHT_HORIZONTAL_AXIS"] = 2] = "RIGHT_HORIZONTAL_AXIS";
  ButtonType[ButtonType["RIGHT_VERTICAL_AXIS"] = 3] = "RIGHT_VERTICAL_AXIS";
  ButtonType["PSEUDO_BUTTON_1"] = "PSEUDO_BUTTON_1";
  ButtonType["PSEUDO_BUTTON_2"] = "PSEUDO_BUTTON_2";
  ButtonType["PSEUDO_BUTTON_3"] = "PSEUDO_BUTTON_3";
  ButtonType["PSEUDO_BUTTON_4"] = "PSEUDO_BUTTON_4";
  ButtonType["PSEUDO_BUTTON_5"] = "PSEUDO_BUTTON_5";
  ButtonType["PSEUDO_BUTTON_6"] = "PSEUDO_BUTTON_6";
  ButtonType["PSEUDO_BUTTON_7"] = "PSEUDO_BUTTON_7";
  ButtonType["PSEUDO_BUTTON_8"] = "PSEUDO_BUTTON_8";
  ButtonType["PSEUDO_BUTTON_9"] = "PSEUDO_BUTTON_9";
  ButtonType["PSEUDO_BUTTON_10"] = "PSEUDO_BUTTON_10";
})(types_ButtonType || (types_ButtonType = {}));

const types_DATA_LANDMARK_ID = 'data-landmark-id';
const types_DATA_FOCUSABLE_ID = 'data-focusable-id';
const DATA_FOCUSABLE_DEBUG_ID = 'data-focusable-debug-id';
let types_FocusableType;

(function (FocusableType) {
  FocusableType[FocusableType["ITEM"] = 0] = "ITEM";
  FocusableType[FocusableType["LANDMARK"] = 1] = "LANDMARK";
  FocusableType[FocusableType["ROOT"] = 2] = "ROOT";
})(types_FocusableType || (types_FocusableType = {}));

let ScrollAxis;

(function (ScrollAxis) {
  ScrollAxis[ScrollAxis["HORIZONTAL"] = 0] = "HORIZONTAL";
  ScrollAxis[ScrollAxis["VERTICAL"] = 1] = "VERTICAL";
})(ScrollAxis || (ScrollAxis = {}));

const DEFAULT_ACTIONS = [types_ButtonType.A, types_ButtonType.B, types_ButtonType.LEFT, types_ButtonType.DOWN, types_ButtonType.RIGHT, types_ButtonType.UP];
let Arrows;

(function (Arrows) {
  Arrows[Arrows["UP"] = 0] = "UP";
  Arrows[Arrows["RIGHT"] = 1] = "RIGHT";
  Arrows[Arrows["DOWN"] = 2] = "DOWN";
  Arrows[Arrows["LEFT"] = 3] = "LEFT";
})(Arrows || (Arrows = {}));

const mapButtonToArrow = {
  [types_ButtonType.LEFT_ANALOG_UP]: Arrows.UP,
  [types_ButtonType.UP]: Arrows.UP,
  [types_ButtonType.LEFT_ANALOG_DOWN]: Arrows.DOWN,
  [types_ButtonType.DOWN]: Arrows.DOWN,
  [types_ButtonType.LEFT_ANALOG_LEFT]: Arrows.LEFT,
  [types_ButtonType.LEFT]: Arrows.LEFT,
  [types_ButtonType.LEFT_ANALOG_RIGHT]: Arrows.RIGHT,
  [types_ButtonType.RIGHT]: Arrows.RIGHT
};
const mapMouseButtonToButtonType = {
  3: types_ButtonType.B
};
let Direction;

(function (Direction) {
  Direction[Direction["NEXT"] = -1] = "NEXT";
  Direction[Direction["PREVIOUS"] = 1] = "PREVIOUS";
})(Direction || (Direction = {}));

let types_NewFocusSuggestionReason;

(function (NewFocusSuggestionReason) {
  NewFocusSuggestionReason[NewFocusSuggestionReason["DefaultDelegation"] = 0] = "DefaultDelegation";
  NewFocusSuggestionReason[NewFocusSuggestionReason["FirstFoundDelegation"] = 1] = "FirstFoundDelegation";
  NewFocusSuggestionReason[NewFocusSuggestionReason["AliasDelegation"] = 2] = "AliasDelegation";
  NewFocusSuggestionReason[NewFocusSuggestionReason["MemoryDelegation"] = 3] = "MemoryDelegation";
  NewFocusSuggestionReason[NewFocusSuggestionReason["FocusableAliasMutation"] = 4] = "FocusableAliasMutation";
})(types_NewFocusSuggestionReason || (types_NewFocusSuggestionReason = {}));

const isAvailableFocusable = element => !element.disabled && !element.hidden && element.ref != null;
const isRoot = focusable => focusable != null && focusable.type === types_FocusableType.ROOT;
const types_isDelegatingLandmark = focusable => focusable != null && focusable.type === types_FocusableType.LANDMARK && 'getDelegatedFocus' in focusable;
const isBindingLandmark = element => types_isDelegatingLandmark(element) && 'shouldBindFocus' in element && element.shouldBindFocus === true;
;// CONCATENATED MODULE: ./packages/navigation-focus-tree/src/treeInitialization.ts



const ROOT_NODE_ID = 1;

const createIsElementAncestorOf = (focusTree, id) => element => {
  var _element$getAttribute;

  const idAttribute = (_element$getAttribute = element.getAttribute(DATA_FOCUSABLE_ID)) !== null && _element$getAttribute !== void 0 ? _element$getAttribute : element.getAttribute(DATA_LANDMARK_ID);
  if (idAttribute == null) return false;
  const elementId = parseInt(idAttribute, 10);
  return id === elementId || isAncestorOf(focusTree, id, elementId);
};

const createGetDelegatedFocus = (focusTree, id) => () => {
  var _window$document$body;

  const enabledBindingLandmarkDescendant = getEnabledBindingLandmarkDescendant(focusTree, id); // We start by looking at enabled binding landmark descendants.
  // Binding landmarks take priority over any other behavior

  if (enabledBindingLandmarkDescendant != null) {
    const delegatedFocus = enabledBindingLandmarkDescendant.getDelegatedFocus();

    if (delegatedFocus != null && delegatedFocus !== NO_VALUE) {
      return delegatedFocus;
    }
  }

  const defaultDelegatedFocus = {
    id,
    reason: NewFocusSuggestionReason.DefaultDelegation
  };
  const dynasty = focusTree.dynasty.get(id);
  const elements = Array.from((_window$document$body = window.document.body.querySelectorAll(`[${DATA_FOCUSABLE_ID}], [${DATA_LANDMARK_ID}]`)) !== null && _window$document$body !== void 0 ? _window$document$body : []);

  if (elements.length === 0) {
    return defaultDelegatedFocus;
  }

  for (let i = 0; i < elements.length; i++) {
    const landmarkIdAttribute = elements[i].getAttribute(DATA_LANDMARK_ID);
    const focusableIdAttribute = elements[i].getAttribute(DATA_FOCUSABLE_ID);

    if (landmarkIdAttribute != null) {
      const landmarkId = parseInt(landmarkIdAttribute, 10);

      if (!(dynasty !== null && dynasty !== void 0 && dynasty.has(landmarkId))) {
        continue;
      }

      const landmarkElement = getElement(focusTree, landmarkId);

      if (!isDelegatingLandmark(landmarkElement)) {
        continue;
      }

      if (!isNodeEnabled(focusTree, landmarkId)) {
        continue;
      }

      const isElementAncestorOfLandmark = createIsElementAncestorOf(focusTree, landmarkId);
      const landmarkDecedentElements = elements.filter(isElementAncestorOfLandmark);
      const delegatedFocus = landmarkElement.getDelegatedFocus(landmarkDecedentElements);

      if (delegatedFocus != NO_VALUE && delegatedFocus != null) {
        return delegatedFocus;
      }
    } else if (focusableIdAttribute != null) {
      const focusableId = parseInt(focusableIdAttribute, 10);

      if (dynasty !== null && dynasty !== void 0 && dynasty.has(focusableId) && isNodeEnabled(focusTree, focusableId)) {
        return {
          id: focusableId,
          reason: NewFocusSuggestionReason.FirstFoundDelegation
        };
      }
    }
  }

  return defaultDelegatedFocus;
};

const getFreshTree = () => {
  const focusTree = {
    elements: new Map(),
    children: new Map(),
    parents: new Map(),
    aliases: new Map(),
    shortcuts: new Map(),
    history: [],
    bindingLandmarkStack: [],
    dynasty: new Map(),
    bindingLandmarkDescendants: new Map()
  };
  const rootElement = {
    type: FocusableType.ROOT,
    id: ROOT_NODE_ID,
    alias: undefined,
    disabled: false,
    hidden: false,
    ref: null,
    scrollAxis: null,
    onDown: undefined,
    onUp: undefined,
    onRight: undefined,
    onLeft: undefined,
    onBlur: undefined,
    onFocus: undefined,
    disableScrollIntoView: undefined,
    getDelegatedFocus: createGetDelegatedFocus(focusTree, ROOT_NODE_ID)
  };
  focusTree.elements.set(ROOT_NODE_ID, rootElement);
  return focusTree;
};
;// CONCATENATED MODULE: ./packages/react-gamepad-visual/src/id.tsx

let id_seed = ROOT_NODE_ID + 1;
const id_generateId = () => id_seed++;
;// CONCATENATED MODULE: ./packages/react-gamepad-visual/src/context/disableFocusBinding.ts

const disableFocusBinding_Context = (0,react.createContext)(false);
const useDisableFocusBinding = () => (0,react.useContext)(disableFocusBinding_Context);
const DisableFocusBindingProvider = disableFocusBinding_Context.Provider;
const DisableFocusBindingConsumer = disableFocusBinding_Context.Consumer;
;// CONCATENATED MODULE: ./packages/react-gamepad-visual/src/context/focusTreeAPI.tsx


const focusTreeAPI_logWarning = () => {
  if (false) {}
};

const FocusTreeAPIContext = (0,react.createContext)({
  press: () => undefined,
  isFocused: () => {
    focusTreeAPI_logWarning();
    return false;
  },
  isFocusable: () => {
    focusTreeAPI_logWarning();
    return false;
  },
  putNode: focusTreeAPI_logWarning,
  putShortcut: focusTreeAPI_logWarning,
  removeNode: focusTreeAPI_logWarning,
  removeShortcut: focusTreeAPI_logWarning,
  getElement: () => {
    focusTreeAPI_logWarning();
    return undefined;
  },
  isAncestorOf: () => {
    focusTreeAPI_logWarning();
    return false;
  },
  getDynasty: () => {
    focusTreeAPI_logWarning();
    return undefined;
  },
  getEnabledBindingLandmarkDescendant: () => {
    focusTreeAPI_logWarning();
    return undefined;
  }
});
const {
  Provider: focusTreeAPI_Provider,
  Consumer: focusTreeAPI_Consumer
} = FocusTreeAPIContext;
const FocusTreeAPIProvider = (/* unused pure expression or super */ null && (focusTreeAPI_Provider));
const FocusTreeAPIConsumer = (/* unused pure expression or super */ null && (focusTreeAPI_Consumer));
;// CONCATENATED MODULE: ./packages/react-gamepad-visual/src/context/path.tsx

const path_Context = (0,react.createContext)([]);
const {
  Provider: path_Provider,
  Consumer: path_Consumer
} = path_Context;

const path_PathContext = path_Context;
;// CONCATENATED MODULE: ./packages/react-gamepad-visual/src/context/refreshFocus.tsx


const refreshFocus_Context = (0,src.createFacetContext)(undefined);
const useRefreshFocus = () => (0,react.useContext)(refreshFocus_Context);
const RefreshFocusProvider = refreshFocus_Context.Provider;
const RefreshFocusConsumer = refreshFocus_Context.Consumer;
;// CONCATENATED MODULE: ./packages/react-gamepad-visual/src/context/setFocusedId.ts

const setFocusedIdContext = (0,react.createContext)(() => () => {});
/**
 * Hook that allows access to a function to imperatively set the focused id
 * On setting a focusedId, it returns a "restore" function that can be called to restore the focus to a previous state
 */

const useSetFocusedId = () => (0,react.useContext)(setFocusedIdContext);
;// CONCATENATED MODULE: ./packages/react-gamepad-visual/src/components/Landmark.tsx
function Landmark_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Landmark_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Landmark_ownKeys(Object(source), true).forEach(function (key) { Landmark_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Landmark_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Landmark_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const NO_LANDMARK_KEY = 'NO_LANDMARK_KEY';
const Landmark = ({
  children,
  disabled,
  hidden,
  alias,
  scrollAxis,
  scrollOptions,
  shouldBindFocus,
  containerRef,
  delegateFocusFirstFound,
  delegateFocusFromMemory,
  delegateFocusByAlias,
  landmarkKey
}) => {
  if (false) {}

  const id = (0,react.useMemo)(() => id_generateId(), []);
  const disabledFacet = (0,src.useFacetWrap)(disabled);
  const hiddenFacet = (0,src.useFacetWrap)(hidden);
  const delegateFocusFirstFoundFacet = (0,src.useFacetWrap)(delegateFocusFirstFound);
  const delegateFocusFromMemoryFacet = (0,src.useFacetWrap)(delegateFocusFromMemory);
  const delegateFocusByAliasFacet = (0,src.useFacetWrap)(delegateFocusByAlias);
  const scrollAxisFacet = (0,src.useFacetWrap)(scrollAxis);
  const aliasFacet = (0,src.useFacetWrap)(alias);
  const scrollOptionsFacet = (0,src.useFacetWrap)(scrollOptions);
  const shouldBindFocusFacet = (0,src.useFacetWrap)(shouldBindFocus);
  const landmarkKeyFacet = (0,src.useFacetWrap)(landmarkKey);
  const disabledContextFacet = (0,react.useContext)(DisabledAreaContext);
  const disableFocusBinding = useDisableFocusBinding();
  const focusTreeAPI = (0,react.useContext)(FocusTreeAPIContext);
  const path = (0,react.useContext)(path_PathContext);
  const refreshFocusFacet = useRefreshFocus();
  const parentId = path[path.length - 1];
  const setFocusedId = useSetFocusedId();
  const createIsElementAncestorOf = (0,react.useCallback)(id => element => {
    var _element$getAttribute;

    const idAttribute = (_element$getAttribute = element.getAttribute(types_DATA_FOCUSABLE_ID)) !== null && _element$getAttribute !== void 0 ? _element$getAttribute : element.getAttribute(types_DATA_LANDMARK_ID);
    if (idAttribute == null) return false;
    const elementId = parseInt(idAttribute, 10);
    return id === elementId || focusTreeAPI.isAncestorOf(id, elementId);
  }, [focusTreeAPI]);
  const getDelegatedFocus = (0,src.useFacetCallback)((delegateFocusFirstFound, delegateFocusFromMemory) => cachedDecedentElements => {
    const enabledBindingLandmarkDescendant = focusTreeAPI.getEnabledBindingLandmarkDescendant(id); // We start by looking at enabled binding landmark descendants.
    // Binding landmarks take priority over any other behavior

    if (enabledBindingLandmarkDescendant != null) {
      const cachedDecedentElementsOfMemory = cachedDecedentElements === null || cachedDecedentElements === void 0 ? void 0 : cachedDecedentElements.filter(createIsElementAncestorOf(enabledBindingLandmarkDescendant.id));
      const delegatedFocus = enabledBindingLandmarkDescendant.getDelegatedFocus(cachedDecedentElementsOfMemory);

      if (delegatedFocus != null && delegatedFocus !== src.NO_VALUE) {
        return delegatedFocus;
      }
    }

    const element = focusTreeAPI.getElement(id);
    const dynasty = focusTreeAPI.getDynasty(id);
    const delegatingLandmark = types_isDelegatingLandmark(element) ? element : undefined; // Check memory for focusable decedent

    if (delegatingLandmark != null && delegateFocusFromMemory) {
      var _delegatingLandmark$l, _delegatingLandmark$d;

      const usedLandmarkKey = (_delegatingLandmark$l = delegatingLandmark === null || delegatingLandmark === void 0 ? void 0 : delegatingLandmark.landmarkKey) !== null && _delegatingLandmark$l !== void 0 ? _delegatingLandmark$l : NO_LANDMARK_KEY;
      const delegationMemoryStack = delegatingLandmark === null || delegatingLandmark === void 0 ? void 0 : (_delegatingLandmark$d = delegatingLandmark.delegationMemoryStack) === null || _delegatingLandmark$d === void 0 ? void 0 : _delegatingLandmark$d.get(usedLandmarkKey);

      if (delegationMemoryStack != null) {
        // Loop through the memory stack and find the first available element
        let firstAvailableMemoryElement = undefined;

        for (let i = 0; i < delegationMemoryStack.length; i++) {
          const delegationMemoryId = delegationMemoryStack[i];
          const delegationMemoryElement = focusTreeAPI.getElement(delegationMemoryId);

          if (delegationMemoryElement != null && focusTreeAPI.isFocusable(delegationMemoryElement.id) && dynasty !== null && dynasty !== void 0 && dynasty.has(delegationMemoryElement.id)) {
            firstAvailableMemoryElement = delegationMemoryElement;
            break;
          }
        }

        if (firstAvailableMemoryElement != null) {
          const memoryDelegatingLandmark = types_isDelegatingLandmark(firstAvailableMemoryElement) ? firstAvailableMemoryElement : undefined;

          if (memoryDelegatingLandmark != null) {
            const cachedDecedentElementsOfMemory = cachedDecedentElements === null || cachedDecedentElements === void 0 ? void 0 : cachedDecedentElements.filter(createIsElementAncestorOf(memoryDelegatingLandmark.id));
            const delegatedFocus = memoryDelegatingLandmark.getDelegatedFocus(cachedDecedentElementsOfMemory);

            if (delegatedFocus != null && delegatedFocus != src.NO_VALUE) {
              return delegatedFocus;
            }
          } else {
            return {
              id: firstAvailableMemoryElement.id,
              reason: types_NewFocusSuggestionReason.MemoryDelegation
            };
          }
        }
      }
    } // Delegate by alias. We are using the element ref here instead of the delegateFocusByAliasFacet
    // since we don't want to have several sources of truths.


    if (types_isDelegatingLandmark(focusTreeElement.current) && focusTreeElement.current.delegateFocusByAlias != null && focusTreeElement.current.delegateFocusByAlias != '') {
      const elementByAlias = focusTreeAPI.getElement(focusTreeElement.current.delegateFocusByAlias);

      if (elementByAlias != null && dynasty !== null && dynasty !== void 0 && dynasty.has(elementByAlias.id) && focusTreeAPI.isFocusable(elementByAlias.id)) {
        if (types_isDelegatingLandmark(elementByAlias)) {
          const cachedDecedentElementsOfMemory = cachedDecedentElements === null || cachedDecedentElements === void 0 ? void 0 : cachedDecedentElements.filter(createIsElementAncestorOf(elementByAlias.id));
          const delegatedFocus = elementByAlias.getDelegatedFocus(cachedDecedentElementsOfMemory);

          if (delegatedFocus != null && delegatedFocus !== src.NO_VALUE) {
            return delegatedFocus;
          }
        } else {
          return {
            id: elementByAlias.id,
            reason: types_NewFocusSuggestionReason.AliasDelegation
          };
        }
      }
    } // Get first focusable decedent


    if (delegateFocusFirstFound) {
      var _containerRef$current, _containerRef$current2;

      const defaultDelegatedId = focusTreeElement.current == null || focusTreeElement.current.hidden === true || focusTreeElement.current.disabled === true ? undefined : id;
      const defaultDelegatedFocus = defaultDelegatedId != null ? {
        id: defaultDelegatedId,
        reason: types_NewFocusSuggestionReason.DefaultDelegation
      } : undefined;
      const elements = cachedDecedentElements !== null && cachedDecedentElements !== void 0 ? cachedDecedentElements : Array.from((_containerRef$current = (_containerRef$current2 = containerRef.current) === null || _containerRef$current2 === void 0 ? void 0 : _containerRef$current2.querySelectorAll(`[${types_DATA_FOCUSABLE_ID}], [${types_DATA_LANDMARK_ID}]`)) !== null && _containerRef$current !== void 0 ? _containerRef$current : []);

      if (elements.length === 0) {
        return defaultDelegatedFocus;
      }

      for (let i = 0; i < elements.length; i++) {
        const landmarkIdAttribute = elements[i].getAttribute(types_DATA_LANDMARK_ID);
        const focusableIdAttribute = elements[i].getAttribute(types_DATA_FOCUSABLE_ID);

        if (landmarkIdAttribute != null) {
          const landmarkId = parseInt(landmarkIdAttribute, 10);

          if (!(dynasty !== null && dynasty !== void 0 && dynasty.has(landmarkId))) {
            continue;
          }

          const landmarkElement = focusTreeAPI.getElement(landmarkId);

          if (!types_isDelegatingLandmark(landmarkElement)) {
            continue;
          }

          if (!focusTreeAPI.isFocusable(landmarkId)) {
            continue;
          }

          const isElementAncestorOfLandmark = createIsElementAncestorOf(landmarkId);
          const landmarkDecedentElements = elements.filter(isElementAncestorOfLandmark);
          const delegatedFocus = landmarkElement.getDelegatedFocus(landmarkDecedentElements);

          if (delegatedFocus != src.NO_VALUE && delegatedFocus != null) {
            return delegatedFocus;
          }
        } else if (focusableIdAttribute != null) {
          const focusableId = parseInt(focusableIdAttribute, 10);

          if (dynasty !== null && dynasty !== void 0 && dynasty.has(focusableId) && focusTreeAPI.isFocusable(focusableId)) {
            return {
              id: focusableId,
              reason: types_NewFocusSuggestionReason.FirstFoundDelegation
            };
          }
        }
      }

      return defaultDelegatedFocus;
    }

    return undefined;
  }, [focusTreeAPI, containerRef, createIsElementAncestorOf, id], [delegateFocusFirstFoundFacet, delegateFocusFromMemoryFacet]);
  const onFocusableOfDynastyFocused = (0,react.useCallback)((decedentId, origin) => {
    // We don't want to store the focused id for delegation memory when the focus
    // originates from a tree mutation, since we rely on the memory being stable
    // between focus tree mutations of a sub tree. Furthermore, it is arguable that
    // delegation after a focus tree mutation much rather should be calculated when
    // needed instead and isn't preferable to store.
    if (origin === types_FocusOrigin.FocusTreeMutation) return;
    const element = focusTreeAPI.getElement(id);
    const delegatingLandmark = types_isDelegatingLandmark(element) ? element : undefined;

    if ((delegatingLandmark === null || delegatingLandmark === void 0 ? void 0 : delegatingLandmark.delegationMemoryStack) != null) {
      var _delegatingLandmark$l2;

      const usedLandmarkKey = (_delegatingLandmark$l2 = delegatingLandmark === null || delegatingLandmark === void 0 ? void 0 : delegatingLandmark.landmarkKey) !== null && _delegatingLandmark$l2 !== void 0 ? _delegatingLandmark$l2 : NO_LANDMARK_KEY; // We are intentionally mutating the delegationMemoryStack here without using
      // putNode, since this is considered local state of the node itself
      // and shouldn't cause any side effects / mutations of the rest of the tree or
      // to the currently focused element. The reason why we are doing this is because
      // calling putNode is a lot unnecessary overhead in this case. If we in the future
      // will do any other mutations to the node in this place then we should
      // consider to use putNode instead.

      const delegationMemoryStack = delegatingLandmark.delegationMemoryStack.get(usedLandmarkKey) || [];

      if (delegationMemoryStack != null) {
        // If the id already exists in the stack, remove it
        const itemIndexInStack = delegationMemoryStack.indexOf(decedentId);

        if (itemIndexInStack !== -1) {
          delegationMemoryStack.splice(itemIndexInStack, 1);
        } // Add the id to the top of the stack


        delegationMemoryStack.unshift(decedentId);
        delegatingLandmark.delegationMemoryStack.set(usedLandmarkKey, delegationMemoryStack);
      }
    }
  }, [focusTreeAPI, id]);
  const unObserve = (0,react.useRef)();
  const focusTreeElement = (0,react.useRef)(undefined);
  const refWasMissingOnFirstPutNode = (0,react.useRef)(false);
  /**
   * Tries to add the container to the focus tree during the render body to make sure it is available by the time
   * any focusable is rendered.LandmarkType
   *
   * If we rely only on effects, React runs the leaves first (adding the focusables before the containers).
   */

  (0,react.useMemo)(() => {
    var _unObserve$current;

    (_unObserve$current = unObserve.current) === null || _unObserve$current === void 0 ? void 0 : _unObserve$current.call(unObserve);
    unObserve.current = (0,src.multiObserve)((disabled, hidden, scrollAxis, alias, scrollOptions, shouldBindFocus, disabledContext, delegateFocusFirstFound, delegateFocusByAlias, delegateFocusFromMemory, landmarkKey) => {
      const previousFocusable = focusTreeAPI.getElement(id);
      const delegatingProps = delegateFocusFirstFound ? Landmark_objectSpread(Landmark_objectSpread({
        onFocusableOfDynastyFocused,
        getDelegatedFocus
      }, !disableFocusBinding && shouldBindFocus ? {
        shouldBindFocus: true
      } : {}), {}, {
        delegateFocusByAlias,
        landmarkKey,
        delegationMemoryStack: delegateFocusFromMemory === true ? types_isDelegatingLandmark(previousFocusable) && previousFocusable.delegationMemoryStack != null ? previousFocusable.delegationMemoryStack : new Map() : undefined
      }) : {};

      const container = Landmark_objectSpread({
        scrollAxis: scrollAxis,
        type: types_FocusableType.LANDMARK,
        id: id,
        ref: containerRef.current,
        alias: alias,
        scrollIntoViewAlign: scrollOptions === null || scrollOptions === void 0 ? void 0 : scrollOptions.scrollIntoViewAlign,
        scrollIntoViewOffset: scrollOptions === null || scrollOptions === void 0 ? void 0 : scrollOptions.scrollIntoViewOffset,
        scrollIntoViewSpeedFactor: scrollOptions === null || scrollOptions === void 0 ? void 0 : scrollOptions.scrollIntoViewSpeedFactor,
        disabled: disabled === true || disabledContext.disabled === true,
        hidden: hidden === true || disabledContext.hidden === true
      }, delegatingProps);

      focusTreeElement.current = container;
      refWasMissingOnFirstPutNode.current = containerRef.current == null;
      focusTreeAPI.putNode(container, parentId);
    }, [disabledFacet, hiddenFacet, scrollAxisFacet, aliasFacet, scrollOptionsFacet, shouldBindFocusFacet, disabledContextFacet, delegateFocusFirstFoundFacet, delegateFocusByAliasFacet, delegateFocusFromMemoryFacet, landmarkKeyFacet]);
  }, [id, focusTreeAPI, parentId, onFocusableOfDynastyFocused, containerRef, getDelegatedFocus, disableFocusBinding, disabledFacet, hiddenFacet, scrollAxisFacet, aliasFacet, scrollOptionsFacet, shouldBindFocusFacet, disabledContextFacet, delegateFocusFirstFoundFacet, delegateFocusByAliasFacet, delegateFocusFromMemoryFacet, landmarkKeyFacet]);
  (0,react.useEffect)(() => () => {
    var _unObserve$current2;

    (_unObserve$current2 = unObserve.current) === null || _unObserve$current2 === void 0 ? void 0 : _unObserve$current2.call(unObserve);
  }, []);
  (0,react.useEffect)(() => {
    if (!refWasMissingOnFirstPutNode.current) {
      return;
    }

    if (containerRef.current == null || focusTreeElement.current == null) {
      // The container ref could be missing when for example the Landmark is
      // disabled and the ref is not mounted until the Landmark is enabled.
      return;
    }

    const updatedContainer = Landmark_objectSpread(Landmark_objectSpread({}, focusTreeElement.current), {}, {
      ref: containerRef.current
    }); // We need to call putNode here again since container components can be a decedent of the Landmark component
    // and the useMemo above will run before React creates the native elements of decedent components.


    focusTreeAPI.putNode(updatedContainer, parentId); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  (0,src.useFacetEffect)(refreshFocus => {
    if (focusTreeElement.current == null || focusTreeElement.current.hidden || focusTreeElement.current.disabled || refreshFocus == null) {
      return;
    }

    const delegatedFocus = getDelegatedFocus();

    if (delegatedFocus != null && delegatedFocus !== src.NO_VALUE) {
      setFocusedId(delegatedFocus.id, false);
    } // TODO: this didn't manage to save the memory of the child debug this

  }, [getDelegatedFocus, setFocusedId], [refreshFocusFacet]); // does nothing on mount
  // doesn't run on updates
  // remove on unmount

  (0,react.useEffect)(() => () => focusTreeAPI.removeNode(id), [focusTreeAPI, id]);
  const pathWithId = [...path, id];
  const Landmark = (0,react.useMemo)(() => ({
    children
  }) => /*#__PURE__*/react.createElement(path_PathContext.Provider, {
    value: pathWithId
  }, children), // Disable lint check because we actually want each value in the array
  // eslint-disable-next-line react-hooks/exhaustive-deps
  pathWithId); // This is for debugging the focus tree

  (0,react.useEffect)(() => {
    if (window.__REACT_FACET_DEVTOOLS_GLOBAL_HOOK__ == null) return;
    if (containerRef.current == null) return;
    containerRef.current.setAttribute(DATA_FOCUSABLE_DEBUG_ID, `${id}`);
  }, [id, containerRef]);
  return /*#__PURE__*/react.createElement(Landmark, null, children);
};
;// CONCATENATED MODULE: ./packages/react-gamepad/src/gamepadAdapterContext.tsx

let gamepadAdapterContext_GamepadAdapterVersion;

(function (GamepadAdapterVersion) {
  GamepadAdapterVersion[GamepadAdapterVersion["LEGACY"] = 0] = "LEGACY";
  GamepadAdapterVersion[GamepadAdapterVersion["VISUAL"] = 1] = "VISUAL";
})(gamepadAdapterContext_GamepadAdapterVersion || (gamepadAdapterContext_GamepadAdapterVersion = {}));

const gamepadAdapterContext = (0,react.createContext)({
  version: gamepadAdapterContext_GamepadAdapterVersion.LEGACY,
  setVersion: () => {}
});
const useGamepadAdapter = () => (0,react.useContext)(gamepadAdapterContext);
const gamepadAdapterContext_GamepadAdapterProvider = ({
  children,
  version: defaultVersion
}) => {
  const [version, setVersion] = useState(defaultVersion);
  const value = useMemo(() => ({
    version,
    setVersion
  }), [version, setVersion]);
  return /*#__PURE__*/React.createElement(gamepadAdapterContext.Provider, {
    value: value
  }, children);
};
;// CONCATENATED MODULE: ./packages/react-gamepad/src/GamepadRow.tsx
function GamepadRow_extends() { GamepadRow_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return GamepadRow_extends.apply(this, arguments); }





function GamepadRow_GamepadRow(props) {
  const {
    version: gamepadVersion
  } = useGamepadAdapter();

  if (gamepadVersion === gamepadAdapterContext_GamepadAdapterVersion.LEGACY) {
    return /*#__PURE__*/react.createElement(GamepadRow, props);
  }

  if (props.shouldSkipLandmarkInVisual) {
    return /*#__PURE__*/react.createElement(DisabledArea, {
      disabled: props.disabled
    }, props.children);
  }

  if (props.scrollAxis != null) {
    // wery weird typescript problem
    return /*#__PURE__*/react.createElement(Landmark, GamepadRow_extends({}, props, {
      scrollAxis: props.scrollAxis,
      shouldBindFocus: props.bounded,
      containerRef: props.scrollRef,
      delegateFocusFirstFound: props.defaultFocusedChildBehavior === 'first' || props.defaultFocusedChildBehavior === 'remember' || props.bounded,
      delegateFocusFromMemory: props.defaultFocusedChildBehavior === 'remember',
      delegateFocusByAlias: props.defaultFocusedChildAlias
    }));
  }

  return /*#__PURE__*/react.createElement(Landmark, GamepadRow_extends({}, props, {
    scrollAxis: props.scrollAxis,
    shouldBindFocus: props.bounded,
    containerRef: props.scrollRef,
    delegateFocusFirstFound: props.defaultFocusedChildBehavior === 'first' || props.defaultFocusedChildBehavior === 'remember' || props.bounded,
    delegateFocusFromMemory: props.defaultFocusedChildBehavior === 'remember',
    delegateFocusByAlias: props.defaultFocusedChildAlias
  }));
}
;// CONCATENATED MODULE: ./packages/ui/src/RouteInstantTransition/RouteInstantTransition.css
// extracted by mini-css-extract-plugin
/* harmony default export */ const RouteInstantTransition = ({"base":"qp8dp","exited":"Al8HR"});
// EXTERNAL MODULE: ./node_modules/classnames/index.js
var classnames = __webpack_require__(4184);
var classnames_default = /*#__PURE__*/__webpack_require__.n(classnames);
;// CONCATENATED MODULE: ./packages/ui/src/RouteInstantTransition/RouteInstantTransition.tsx





function RouteInstantTransition_RouteInstantTransition({
  visible,
  unmountOnExit,
  contentComponent,
  renderTracker,
  defaultFocusedChildAlias,
  defaultFocusedChildBehavior
}) {
  const Content = (0,react.useMemo)(() => react.memo(contentComponent), [contentComponent]);
  const mountedRef = (0,react.useRef)(visible);
  mountedRef.current = unmountOnExit ? visible : mountedRef.current || visible;
  const ref = (0,react.useRef)(null);
  const hiddenFacet = (0,src.useFacetWrap)(!visible);
  return mountedRef.current ? /*#__PURE__*/react.createElement(GamepadRow_GamepadRow, {
    scrollRef: ref,
    gamepadIndex: 0,
    disabled: !visible,
    defaultFocusedChildAlias: defaultFocusedChildAlias,
    defaultFocusedChildBehavior: defaultFocusedChildBehavior
  }, /*#__PURE__*/react.createElement("div", {
    ref: ref,
    className: classnames_default()(RouteInstantTransition.base, {
      [RouteInstantTransition.entered]: visible,
      [RouteInstantTransition.exited]: !visible
    })
  }, renderTracker && renderTracker(visible), /*#__PURE__*/react.createElement(Content, {
    hidden: hiddenFacet
  }))) : null;
}
;// CONCATENATED MODULE: ./packages/ui-internal/src/animationConfiguration.ts


const animationConfiguration_context = (0,react.createContext)((0,src.createFacet)({
  initialValue: true
}));
const ScreenAnimationEnabledProvider = animationConfiguration_context.Provider;
const useScreenAnimationEnabled = () => (0,react.useContext)(animationConfiguration_context);
;// CONCATENATED MODULE: ./packages/react-render-tracking/src/RouteActiveProvider.tsx


const RouteActiveProvider_context = (0,react.createContext)((0,src.createFacet)({
  initialValue: false
}));
function RouteActiveProvider_RouteActiveProvider({
  children,
  active
}) {
  return /*#__PURE__*/React.createElement(RouteActiveProvider_context.Provider, {
    value: active
  }, children);
}
const useRouteActive = () => (0,react.useContext)(RouteActiveProvider_context);
;// CONCATENATED MODULE: ./packages/react-render-tracking/src/apiContext.ts

const RenderTrackingApiContext = (0,react.createContext)({
  block: () => {},
  unblock: () => {},
  contentfulPaint: () => {},
  meaningfulPaint: () => {}
});
;// CONCATENATED MODULE: ./packages/react-render-tracking/src/useRenderTrackingApi.ts


function useRenderTrackingApi() {
  return (0,react.useContext)(RenderTrackingApiContext);
}
;// CONCATENATED MODULE: ./packages/react-render-tracking/src/RenderTrackingDelay.tsx




let renderTrackingDelayId = 0;

/**
 * Used to block a given type of from being fired until ready.
 *
 * Example. Blocking contentful paint event until a transition is done.
 *
 *   const transitionComplete = useRef(false)
 * 	 <Transition onComplete={() => { transitionComplete = true }} />
 * 	 <RenderTrackingDelay type="contentful" renderingCompleted={transitionComplete} />
 */
function RenderTrackingDelay({
  type,
  renderingCompleted
}) {
  const renderTrackingApi = useRenderTrackingApi();
  const isRouteActive = useRouteActive();
  const id = (0,react.useMemo)(() => renderTrackingDelayId++, []);
  (0,src.useFacetEffect)(isRouteActive => {
    if (!isRouteActive) {
      /**
       * If the user leaves the route that this blocker was on
       * then we should unblock it.
       */
      return renderTrackingApi.unblock(id, type);
    }

    if (renderingCompleted) {
      renderTrackingApi.unblock(id, type);
    } else {
      renderTrackingApi.block(id, type);
    }
  }, [id, renderingCompleted, renderTrackingApi, type], [isRouteActive]);
  return null;
}
;// CONCATENATED MODULE: ./packages/engine/src/providers/RouterEngineProvider/Route.tsx
function Route_extends() { Route_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Route_extends.apply(this, arguments); }









function Route_Route(props) {
  return /*#__PURE__*/React.createElement(ReactRouterRoute, {
    exact: true,
    path: props.route,
    children: routerProps => /*#__PURE__*/React.createElement(RouteChildWrapper, Route_extends({}, props, {
      routerProps: routerProps
    }))
  });
}

const RouteChildWrapper = ({
  component,
  transitionComponent: routeTransition,
  unmountOnPush,
  keepMountedOnPop,
  match,
  routerProps,
  defaultFocusedChildAlias,
  defaultFocusedChildBehavior
}) => {
  // If the Route component is wrapped by a Switch it will pass us a match prop.
  // Otherwise, it will be undefined, and we'll instead take it from the routerProps.
  // eslint-disable-next-line @mojang/no-strict-nullish-comparison/only-soft-nullish-comparison
  const routeMatch = match === undefined ? routerProps.match : match;
  return /*#__PURE__*/React.createElement(RouteParamsProvider, {
    match: routeMatch
  }, /*#__PURE__*/React.createElement(RouteActiveProvider, {
    active: useFacetWrap(!!routeMatch)
  }, /*#__PURE__*/React.createElement(RouteChild, {
    unmountOnPush: unmountOnPush,
    keepMountedOnPop: keepMountedOnPop,
    component: component,
    routeTransition: routeTransition,
    action: routerProps.history.action,
    currentIn: !!routeMatch,
    defaultFocusedChildAlias: defaultFocusedChildAlias,
    defaultFocusedChildBehavior: defaultFocusedChildBehavior
  })));
};

/**
 * Memoized child component that takes care of preparing an environment for the route component to render
 *
 * The goal is to re-render this only when necessary
 */
const RouteChild = react.memo(({
  component,
  routeTransition,
  action,
  currentIn,
  unmountOnPush,
  keepMountedOnPop,
  defaultFocusedChildAlias,
  defaultFocusedChildBehavior
}) => {
  const mountComponentRef = (0,react.useRef)(null);
  const previouslyInRef = (0,react.useRef)(null);
  const screenAnimationEnabled = (0,src.useFacetUnwrap)(useScreenAnimationEnabled()) === true;
  (0,react.useEffect)(() => {
    previouslyInRef.current = currentIn;
  }, [currentIn]); // Handles lazy rendering of a route
  // It works by having its default value as null (so not mounted)
  // Once the route is first mounted, mountComponentRef.current will be true permanently
  // This is used to maintain the state of routes as we navigate in the application

  mountComponentRef.current = mountComponentRef.current || currentIn; // If we POP from this route, we need to unmount it
  // We don't want to keep its state

  if (action === 'POP' && previouslyInRef.current && !keepMountedOnPop) {
    mountComponentRef.current = false;
  }

  const isNavigatingBack = action === 'POP';
  const RouteComponent = component;
  const RouteTransition = screenAnimationEnabled && routeTransition != null ? routeTransition : RouteInstantTransition_RouteInstantTransition;
  const unmountOnExit = !mountComponentRef.current || !!unmountOnPush;
  return /*#__PURE__*/react.createElement(RouteHistory_RouteHistoryProvider, {
    disabled: !currentIn
  }, /*#__PURE__*/react.createElement(RouteTransition, {
    defaultFocusedChildAlias: defaultFocusedChildAlias,
    defaultFocusedChildBehavior: defaultFocusedChildBehavior,
    visible: currentIn,
    unmountOnExit: unmountOnExit,
    contentComponent: RouteComponent,
    renderTracker: isContentShown => /*#__PURE__*/react.createElement(RenderTrackingDelay, {
      type: "contentful",
      renderingCompleted: isContentShown
    }),
    inverse: isNavigatingBack
  }));
});
;// CONCATENATED MODULE: ./packages/engine/src/engineWrapper/index.ts
/* eslint-env node */
if (false) {}
/*
 * There is a cohtml file provided by Coherent Labs that needs to loaded by the frontend to allow communication with the game engine.
 * Historically, this cohtml lived in this repository, but we have since moved it to be loaded and updated by the C++ backend.
 * We keep a legacyCohtml in this repository as a backwards compatible solution to older version of the C++ backend.
 *
 * YOU SHOULD NOT UPDATE THIS LOCAL cohtml file.
 */


const engineWrapper_engine =  true ? window.__bedrockProvidedCohtmljs === true ? window.engine : __webpack_require__(5341)() : 0; // eslint-disable-line @typescript-eslint/no-explicit-any
;// CONCATENATED MODULE: ./packages/engine/src/providers/RouterEngineProvider/Switch.tsx
function Switch_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function Switch_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { Switch_ownKeys(Object(source), true).forEach(function (key) { Switch_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { Switch_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Switch_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





 // eslint-disable-next-line

const isRoute = x => {
  const props = Boolean(x.props) ? x.props : {};
  return Boolean(props.route) && Boolean(props.component);
};

const isRedirect = x => {
  const props = Boolean(x.props) ? x.props : {};
  return Boolean(props.from) && Boolean(props.component);
};

function Switch_Switch({
  children
}) {
  const location = useLocation();
  let hasPrevMatch = false;
  let shouldRender = false; // This is to calculate if we should render anything at all so OreUI screens dont overlap on JSONUI screens

  React.Children.forEach(children, child => {
    if (shouldRender === true) {
      return;
    }

    if (!isValidElement(child)) {
      return;
    }

    if (child.type === Route) {
      if (matchPath(location.pathname, Switch_objectSpread(Switch_objectSpread({}, child.props), {}, {
        path: child.props.route
      }))) {
        shouldRender = true;
      }

      return;
    }

    if (child.type === RedirectWrapper) {
      if (matchPath(location.pathname, Switch_objectSpread(Switch_objectSpread({}, child.props), {}, {
        path: child.props.from
      }))) {
        shouldRender = true;
      }

      return;
    }
  });
  const childrenWithMatch = React.Children.map(children, child => {
    if (!isValidElement(child)) {
      return shouldRender ? child : null;
    }

    if (isRedirect(child)) {
      return child;
    }

    if (!isRoute(child)) {
      return shouldRender ? child : null;
    }

    const match = hasPrevMatch ? null : matchPath(location.pathname, Switch_objectSpread(Switch_objectSpread({}, child.props), {}, {
      path: child.props.route
    }));
    hasPrevMatch = hasPrevMatch || !!match;
    return React.cloneElement(child, {
      match
    });
  });
  /**
   * Event that notifies the backend engine that the Switch was unable to match any route.
   *
   * This is currently used by backend to consider the frontend to be in an "idle state".
   *
   * When a Gameface screen goes into this "idle state", the backend can safely stop updating it,
   * until a new route is pushed.
   *
   * For more information check the ticket, and pull requests.
   * - https://dev-mc.visualstudio.com/Minecraft/_workitems/edit/930195
   */

  useEffect(() => {
    if (!hasPrevMatch) {
      engine.trigger('core:routing:not-found');
    }
  }, [hasPrevMatch]); // If there are no matches, return all the routes so that caching and "stay mounted on push" works, but do not render
  // anything else other than Routes and Redirects to not overlap with JSON UI

  return /*#__PURE__*/React.createElement(React.Fragment, null, childrenWithMatch);
}
;// CONCATENATED MODULE: ./packages/engine/src/providers/RouterEngineProvider/useRouteQuery.ts


const useRouteQuery = () => {
  const location = useLocation();
  return new URLSearchParams(location.search);
};
;// CONCATENATED MODULE: ./packages/engine/src/providers/RouterEngineProvider/index.tsx










;// CONCATENATED MODULE: ./packages/engine/src/providers/DeviceInformationEngineProvider/useMouseDetection.ts



const DISTANCE_THRESHOLD = 10;

const useTimeStampLastTouchEndEvent = isEnabledFacet => {
  const timeStampLastTouchEndEvent = useRef(-1);
  useFacetEffect(isEnabled => {
    if (!isEnabled) {
      return;
    }

    const handleTouchEnd = event => {
      timeStampLastTouchEndEvent.current = event.timeStamp;
    };

    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [], [isEnabledFacet]);
  return timeStampLastTouchEndEvent;
};

function useMouseDetection_useMouseDetection(isEnabledFacet, onMouseDetected, availableInputMethods) {
  // We want to track last touchend event when both mouse and touch input are available. The reason is
  // that the touchend event will also trigger the mousedown and mousemove events and in those cases
  // we don't want to call the mouse detected handler, since the source was touch input.
  const shouldTrackLastTouchEndTimeStamp = useFacetMap(available => available.includes(InputMethod.MOUSE) && available.includes(InputMethod.TOUCH), [], [availableInputMethods]);
  const timeStampLastTouchEndEvent = useTimeStampLastTouchEndEvent(shouldTrackLastTouchEndTimeStamp);
  const mouseStartPositionRef = useRef(null);
  useFacetEffect(isEnabled => {
    if (!isEnabled) {
      mouseStartPositionRef.current = null;
      return;
    }

    const shouldIgnoreMouseEvent = event => timeStampLastTouchEndEvent.current === event.timeStamp;

    const handleMouseMove = event => {
      const latestPosition = [event.clientX, event.clientY];

      if (!mouseStartPositionRef.current) {
        mouseStartPositionRef.current = latestPosition;
        return;
      }

      const a = Math.abs(latestPosition[0] - mouseStartPositionRef.current[0]);
      const b = Math.abs(latestPosition[1] - mouseStartPositionRef.current[1]);
      const distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

      if (distance > DISTANCE_THRESHOLD) {
        mouseStartPositionRef.current = null;

        if (shouldIgnoreMouseEvent(event)) {
          return;
        }

        onMouseDetected();
      }
    };

    const handleMouseDown = event => {
      if (shouldIgnoreMouseEvent(event)) {
        return;
      }

      onMouseDetected();
    };

    const handleWheel = () => {
      onMouseDetected();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [onMouseDetected, timeStampLastTouchEndEvent], [isEnabledFacet]);
}
;// CONCATENATED MODULE: ./packages/engine/src/providers/DeviceInformationEngineProvider/useLastUsedAndSupportedInputMethods.ts








const useSupportedInputMethods = supportedBackendInputMethods => {
  const [supportedInputMethods, setSupportedInputMethods] = useFacetState([]); // Keyboard input is not sent to use from the backend so we need to keep track of it ourselves.
  // We are currently just saying that keyboard is supported if we have ever detected it,
  // which isn't ideal but the best we can do on the frontend.

  const isKeyboardSupported = useRef(false);
  const setKeyboardIsSupported = useFacetCallback(supported => () => {
    if (!isKeyboardSupported.current) {
      isKeyboardSupported.current = true;
      const updatedSupported = Array.from(supported);
      updatedSupported.push(InputMethod.KEYBOARD);
      setSupportedInputMethods(updatedSupported);
    }
  }, [setSupportedInputMethods], [supportedInputMethods]);
  useFacetEffect((supported, supportedFromBackend) => {
    const supportedLengthWithoutKeyboard = isKeyboardSupported.current ? supported.length - 1 : supported.length;
    const sameCount = supportedLengthWithoutKeyboard === supportedFromBackend.length;
    const shouldSync = !sameCount || !supportedFromBackend.every(method => supported.includes(method));

    if (shouldSync) {
      // Important to keep wrapping supportedFromBackend in Array.from(). The array originates from the backend
      // and those do not support the same operators / methods as native javascript arrays.
      const updatedSupported = Array.from(supportedFromBackend);

      if (isKeyboardSupported.current) {
        updatedSupported.push(InputMethod.KEYBOARD);
      }

      setSupportedInputMethods(updatedSupported);
    }
  }, [setSupportedInputMethods], [supportedInputMethods, supportedBackendInputMethods]);
  return {
    supportedInputMethods,
    setKeyboardIsSupported
  };
};

const useLastInputMethodUsed = currentBackendInputMethod => {
  const facetState = useFacetState(null);
  const [lastInputMethodUsed, baseSetter] = facetState;
  const previousInputMethodRef = useRef(null); // Decorate the base setter in order to keep track of the previous input method used.

  const setLastInputMethodUsed = useCallback(newValue => {
    baseSetter(currentValue => {
      if (currentValue === newValue) {
        return currentValue;
      }

      if (currentValue !== NO_VALUE) {
        previousInputMethodRef.current = currentValue;
      }

      return newValue;
    });
  }, [baseSetter]); // Sync last input method used with the backend. Note that we can not only do initialization here
  // and then track the state entirely on the frontend. This is due to how we initialize input methods
  // on the backend before running functional tests (see core:test:setInputMode).

  useFacetEffect(currentBackendInputMethod => {
    if (currentBackendInputMethod == null) return;
    setLastInputMethodUsed(currentBackendInputMethod);
  }, [setLastInputMethodUsed], [currentBackendInputMethod]);
  return [lastInputMethodUsed, setLastInputMethodUsed, previousInputMethodRef];
}; // We only need to detect input on the frontend when we are going back and forth between
// keyboard and other input methods. The reason is that the backend tracks all input methods
// for us besides keyboard and we sync state changes received from the backend.
//
// The below illustrates the only place where we need to track state changes on the frontend:
// 1) Using Gamepad | Mouse | Touch -> Synced from backend state
// 2) Using Keyboard -> Tracked on the frontend entirely
// 3) Using same as 1) -> Tracked on the frontend, since from a backend perspective nothing has changed.


const useShouldListenToInput = (inputMethod, lastInputMethodUsed, supportedInputMethods, previousInputMethodRef, override = false) => {
  return useFacetMap((last, supported) => override || previousInputMethodRef.current === inputMethod && last === InputMethod.KEYBOARD && supported.includes(inputMethod), [inputMethod, previousInputMethodRef, override], [lastInputMethodUsed, supportedInputMethods]);
}; // Hook that keeps track of last used input method and supported input methods.
// Keyboard is always supported after first use (since we don't get that state from the backend and we need to keep track of it ourselves)
// We do this aggregated hook in order to avoid setting up detection hooks for gamepad, mouse, touch and keyboard multiple times.


const useLastUsedAndSupportedInputMethods_useLastUsedAndSupportedInputMethods = (currentBackendInputMethod, acceptInputFromAllControllers, gameControllerId, supportedBackendInputMethods, options) => {
  const {
    supportedInputMethods,
    setKeyboardIsSupported
  } = useSupportedInputMethods(supportedBackendInputMethods);
  const [lastInputMethodUsed, setLastInputMethodUsed, previousInputMethodRef] = useLastInputMethodUsed(currentBackendInputMethod);
  const shouldListenToMouse = useShouldListenToInput(InputMethod.MOUSE, lastInputMethodUsed, supportedInputMethods, previousInputMethodRef, options === null || options === void 0 ? void 0 : options.trackAllUserInput);
  const shouldListenToTouch = useShouldListenToInput(InputMethod.TOUCH, lastInputMethodUsed, supportedInputMethods, previousInputMethodRef, options === null || options === void 0 ? void 0 : options.trackAllUserInput);
  const shouldListenToGamepad = useShouldListenToInput(InputMethod.GAMEPAD, lastInputMethodUsed, supportedInputMethods, previousInputMethodRef, options === null || options === void 0 ? void 0 : options.trackAllUserInput);
  const shouldListenToKeyboard = useFacetMap(last => last !== InputMethod.KEYBOARD, [], [lastInputMethodUsed]);
  useMouseDetection(shouldListenToMouse, () => {
    setLastInputMethodUsed(InputMethod.MOUSE);
  }, supportedBackendInputMethods);
  useTouchDetection(shouldListenToTouch, () => {
    setLastInputMethodUsed(InputMethod.TOUCH);
  });
  useKeyboardDetection(shouldListenToKeyboard, () => {
    setKeyboardIsSupported();
    setLastInputMethodUsed(InputMethod.KEYBOARD);
  });
  useGamepadDetection(shouldListenToGamepad, acceptInputFromAllControllers, gameControllerId, () => {
    setLastInputMethodUsed(InputMethod.GAMEPAD);
  });
  return {
    lastInputMethodUsed,
    supportedInputMethods
  };
};
;// CONCATENATED MODULE: ./packages/engine/src/facets/deviceInformationFacet.ts

const DEVICE_INFORMATION_FACET = 'core.deviceInformation';
/**
 * React Hook that requests the facet
 */

const deviceInformationFacet_deviceInformationFacet = (0,src.sharedFacet)(DEVICE_INFORMATION_FACET);
;// CONCATENATED MODULE: ./packages/engine/src/providers/DeviceInformationEngineProvider/DeviceInformationEngineProvider.tsx
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = DeviceInformationEngineProvider_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function DeviceInformationEngineProvider_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }







function DeviceInformationEngineProvider_DeviceInformationEngineProvider(_ref) {
  let {
    children
  } = _ref,
      options = _objectWithoutProperties(_ref, ["children"]);

  const deviceInformation = useSharedFacet(deviceInformationFacet);
  const input = useSharedFacet(inputFacet);
  const currentBackendInputMethod = useFacetMap(inputFacet => inputFacet.currentInputType, [], [input]);
  const supportedBackendInputMethods = useFacetMap(deviceInformation => deviceInformation.inputMethods, [], [deviceInformation]);
  const platform = useFacetMap(deviceInformation => deviceInformation.platform, [], [deviceInformation]);
  const vrPlatform = useFacetMap(deviceInformation => deviceInformation.arvrPlatform, [], [deviceInformation]);
  const acceptInputFromAllControllers = useFacetMap(inputFacet => inputFacet.acceptInputFromAllControllers, [], [input]);
  const gameControllerId = useFacetMap(inputFacet => inputFacet.gameControllerId, [], [input]); // This hook is needed since the MinecraftPE backend doesn't include keyboard input in `inputFacet.currentInputType`
  // and in `deviceInformation.inputMethods`. Ideally we would move all detection to the backend in the future.
  // We do the detection here in the engine layer instead of in the device information provider since this is a
  // Bedrock specific quirk.

  const {
    lastInputMethodUsed,
    supportedInputMethods
  } = useLastUsedAndSupportedInputMethods(currentBackendInputMethod, acceptInputFromAllControllers, gameControllerId, supportedBackendInputMethods, options);
  return /*#__PURE__*/React.createElement(DeviceInformationProvider, {
    platform: platform,
    arvrPlatform: vrPlatform,
    lastInputMethodUsed: lastInputMethodUsed,
    supportedInputMethods: supportedInputMethods
  }, children);
}
;// CONCATENATED MODULE: ./packages/engine/src/providers/DeviceInformationEngineProvider/index.ts


;// CONCATENATED MODULE: ./packages/engine/src/ErrorBoundary.tsx





/**
 * Catches any error in the React sub-tree and renders the provided errorComponent
 */
function ErrorBoundary_ErrorBoundary({
  children,
  errorComponent
}) {
  const [error, setError] = useState(null);
  const handleError = useCallback(error => {
    setError(error);
    engine.trigger('core:exception');
  }, []);
  const clearError = useCallback(() => {
    setError(null);
  }, []);
  const isDevMode = "production" === 'development';
  const errorMessage = isDevMode && error ? error.message || 'Unknown error' : undefined;
  return /*#__PURE__*/React.createElement(ErrorCatcher, {
    onError: handleError
  }, error ? /*#__PURE__*/React.createElement(ErrorComponentWrapper, {
    dismissTimeout: isDevMode ? undefined : 40000,
    errorMessage: errorMessage,
    errorComponent: errorComponent,
    onDismiss: clearError
  }) : children);
}

class ErrorCatcher extends react.Component {
  static getDerivedStateFromError() {}

  componentDidCatch(error) {
    this.props.onError(error);
  }

  render() {
    return this.props.children;
  }

}

/**
 * Wrapper component to render the user-provided ErrorComponent
 * We use a wrapper to only request the routerFacet when needed (preventing unnecessary renders)
 */
function ErrorComponentWrapper({
  errorComponent: ErrorComponent,
  errorMessage,
  onDismiss,
  dismissTimeout
}) {
  const router = useFacetUnwrap(useSharedFacet(routerFacet));
  const handleDismiss = useCallback(() => {
    if (router != null && router !== NO_VALUE) {
      router.history.goBack();
    } // Allows the history change to propagate so that the component that caused the error
    // will no longer be rendered


    requestAnimationFrame(onDismiss);
  }, [router, onDismiss]);
  useEffect(() => {
    // Automatically dismisses the ErrorModal after 4 seconds
    // TODO: remove this once we fix an issue that allows buttons in the error modal to work with Gamepad
    if (dismissTimeout != null) {
      const id = setTimeout(handleDismiss, dismissTimeout);
      return () => clearTimeout(id);
    }
  }, [router, handleDismiss, dismissTimeout]);
  return /*#__PURE__*/React.createElement(ErrorComponent, {
    errorMessage: errorMessage,
    onDismiss: handleDismiss
  });
}
;// CONCATENATED MODULE: ./packages/engine/src/facets/featureFlagsFacet.ts

const FEATURE_FLAGS_FACET = 'core.featureFlags';
/**
 * React Hook that requests the facet
 */

const featureFlagsFacet_featureFlagsFacet = (0,src.sharedFacet)(FEATURE_FLAGS_FACET);
;// CONCATENATED MODULE: ./packages/engine/src/providers/FeatureFlagsEngineProvider.tsx




function FeatureFlagsEngineProvider_FeatureFlagsEngineProvider({
  children
}) {
  const facetFlags = useFacetUnwrap(useSharedFacet(featureFlagsFacet));
  const flags = facetFlags === NO_VALUE ? [] : facetFlags.flags;
  return /*#__PURE__*/React.createElement(FeatureFlagsProvider, {
    value: flags
  }, children);
}
;// CONCATENATED MODULE: ./packages/engine/src/facets/localeFacet.ts


const LOCALE_FACET = 'core.locale';
const localeFacet = (0,src.sharedFacet)(LOCALE_FACET);
const localeFacet_localeFacetSelector = (0,src.sharedSelector)(facet => {
  // We need to bind the functions to the localeFacet because separating
  // the function from the object causes Gameface to loose track of it and
  // crashes instantly when calling the function.
  return {
    set locale(newValue) {
      if (facet != null) {
        facet.locale = newValue;
      }
    },

    get locale() {
      return facet.locale;
    },

    translate: facet.translate != null ? facet.translate.bind(facet) : translateFallback,
    translateWithParameters: facet.translateWithParameters != null ? facet.translateWithParameters.bind(facet) : translateWithParametersFallback,
    formatDate: facet.formatDate != null ? facet.formatDate.bind(facet) : formatDateFallback
  };
}, [localeFacet]);
/**
 * Fallback implementation for old builds of the backend
 */

const translateFallback = key => {
  return engineWrapper_engine.translate(key);
};
/**
 * Fallback implementation for old builds of the backend
 */


const translateWithParametersFallback = key => {
  console.error('Update Bedrock to get support for translations with parameters.');
  return engineWrapper_engine.translate(key);
};
/**
 * Fallback implementation for old builds of the backend
 */


const formatDateFallback = timestampInSeconds => {
  console.error('Update Bedrock to get support for formatDate.');
  return `${timestampInSeconds}`;
};
;// CONCATENATED MODULE: ./packages/engine/src/providers/LocalizationEngineProvider.tsx




function LocalizationEngineProvider_LocalizationEngineProvider({
  children,
  developmentTranslations
}) {
  const locale = useFacetUnwrap(useSharedFacet(localeFacetSelector));
  const translate = useCallback((key, params) => {
    if (false) {}

    if (locale === NO_VALUE) {
      return NO_VALUE;
    }

    if (params != null) {
      return locale.translateWithParameters(key, params);
    }

    return locale.translate(key);
  }, [developmentTranslations, locale]);
  return locale !== NO_VALUE ? /*#__PURE__*/React.createElement(LocalizationProvider, {
    translationPrefix: "hbui",
    locale: locale.locale,
    translate: translate,
    formatDate: locale.formatDate
  }, children) : null;
}
;// CONCATENATED MODULE: ./packages/engine/src/facets/screenReaderFacet.ts

let ProfanityFilterContext; // refer to https://coherent-labs.com/Documentation/cpp-gameface/df/d01/javascript_virtual_machine.html
// __Type is needed by Gameface when passing javascript object to C++

(function (ProfanityFilterContext) {
  ProfanityFilterContext[ProfanityFilterContext["NONE"] = 0] = "NONE";
  ProfanityFilterContext[ProfanityFilterContext["UI_FRONT_END"] = 1] = "UI_FRONT_END";
  ProfanityFilterContext[ProfanityFilterContext["UI_IN_GAME"] = 2] = "UI_IN_GAME";
  ProfanityFilterContext[ProfanityFilterContext["ALL_UI"] = ProfanityFilterContext.UI_FRONT_END | ProfanityFilterContext.UI_IN_GAME] = "ALL_UI";
  ProfanityFilterContext[ProfanityFilterContext["IN_GAME_CHAT"] = 4] = "IN_GAME_CHAT";
  ProfanityFilterContext[ProfanityFilterContext["IN_GAME_ITEMS"] = 8] = "IN_GAME_ITEMS";
  ProfanityFilterContext[ProfanityFilterContext["IN_GAME_NAME"] = 16] = "IN_GAME_NAME";
  ProfanityFilterContext[ProfanityFilterContext["ALL"] = ProfanityFilterContext.UI_FRONT_END | ProfanityFilterContext.UI_IN_GAME | ProfanityFilterContext.IN_GAME_CHAT | ProfanityFilterContext.IN_GAME_ITEMS | ProfanityFilterContext.IN_GAME_NAME] = "ALL";
})(ProfanityFilterContext || (ProfanityFilterContext = {}));

const SCREEN_READER_FACET = 'core.screenReader';
/**
 * React Hook that requests the facet
 */

const screenReaderFacet_screenReaderSharedFacet = (0,src.sharedFacet)(SCREEN_READER_FACET);
const screenReaderFacet_screenReaderReadFactory = screenReader => (textToRead, profanityFilterContext, interruptible, required, playInBackground, playWhenPlatformTTSEnabled) => {
  screenReader.read(textToRead, profanityFilterContext, {
    __Type: 'core.screenReaderOptions',
    canBeInterrupted: interruptible,
    isRequired: required,
    shouldPlayInBackground: playInBackground,
    shouldPlayWhenPlatformTTSEnabled: playWhenPlatformTTSEnabled
  });
};
;// CONCATENATED MODULE: ./packages/engine/src/providers/useClearNarrationOnRouteChange.ts



/**
 * Whenever a user performs a navigation action, any narration that is currently on-going needs to stop.
 */

const useClearNarrationOnRouteChange_useClearNarrationOnRouteChange = () => {
  const clearScreenReader = useFacetCallback(screenReader => () => screenReader.clear(), [], [useSharedFacet(screenReaderSharedFacet)]);
  useFacetEffect(pathname => {
    /**
     * Since Ore UI screens can be pre-loaded for caching reasons, this code can execute
     * even without the screen being on a scene stack.
     *
     * Calling clear would wrongly cancel a narration on whatever screen is active in the game.
     */
    if (pathname !== ROUTER_INVALID_ROUTE) {
      clearScreenReader();
    }
  }, [clearScreenReader], [useFacetMap(routerFacet => routerFacet.history.location.pathname, [], [useSharedFacet(routerFacet)])]);
};
;// CONCATENATED MODULE: ./packages/engine/src/providers/NarratorEngineProvider.tsx







function NarratorEngineProvider_NarratorEngineProvider({
  children,
  shouldUseQueueSystem
}) {
  useClearNarrationOnRouteChange(); // Warning note: This might cause excesive re-renders if isIdle is introduced to the screenReaderFacet

  const screenReaderFacet = useSharedFacet(screenReaderSharedFacet);
  const isUITextToSpeechEnabledFacet = useFacetMap(screenReader => screenReader.isUITextToSpeechEnabled, [], [screenReaderFacet]);
  const screenReaderIsIdleFacet = useFacetMap(screenReader => screenReader.isIdle, [], [screenReaderFacet]);
  const read = useFacetCallback(screenReaderReadFactory, [], [screenReaderFacet]);
  const clear = useFacetCallback(screenReader => () => screenReader.clear(), [], [screenReaderFacet]);
  const lastFocusOriginFacet = useLastFocusOrigin();
  const shouldInterrupt = useFacetMap(currentFocusChangeSource => currentFocusChangeSource === FocusOrigin.FocusInput || currentFocusChangeSource === FocusOrigin.PointerInput || currentFocusChangeSource === FocusOrigin.URL, [], [lastFocusOriginFacet]);
  const driverRead = useFacetCallback(isUITextToSpeechEnabled => (text, profanityContext, interruptible, required, playInBackground) => {
    if (Boolean(isUITextToSpeechEnabled)) {
      read(text, mapProfanityContext(profanityContext), interruptible, required, playInBackground, true);
    }
  }, [read], [isUITextToSpeechEnabledFacet]);
  const driverFacet = useMemo(() => ({
    read: driverRead,
    clear: () => clear()
  }), [driverRead, clear]);
  const isDisabledFacet = useFacetMap(isUITextToSpeechEnabled => !Boolean(isUITextToSpeechEnabled), [], [isUITextToSpeechEnabledFacet]);
  return /*#__PURE__*/React.createElement(NarrationSetup, {
    driver: driverFacet,
    disabled: isDisabledFacet,
    isIdle: screenReaderIsIdleFacet,
    shouldUseQueueSystem: shouldUseQueueSystem === true,
    shouldInterrupt: shouldInterrupt
  }, children);
}
function mapProfanityContext(profanityContext) {
  let x = 0;

  if (profanityContext.outOfGame) {
    x = x + ProfanityFilterContextEnum.UI_FRONT_END;
  }

  if (profanityContext.inGame) {
    x = x + ProfanityFilterContextEnum.UI_IN_GAME;
  }

  if (profanityContext.inGameChat) {
    x = x + ProfanityFilterContextEnum.IN_GAME_CHAT;
  }

  if (profanityContext.inGameItem) {
    x = x + ProfanityFilterContextEnum.IN_GAME_ITEMS;
  }

  if (profanityContext.inGameName) {
    x = x + ProfanityFilterContextEnum.IN_GAME_NAME;
  }

  return x;
}
;// CONCATENATED MODULE: ./packages/engine/src/facets/soundFacet.ts

const SOUND_FACET = 'core.sound';
const soundFacet_soundFacet = (0,src.sharedFacet)(SOUND_FACET);
;// CONCATENATED MODULE: ./packages/engine/src/providers/SoundEngineProvider.tsx




function SoundEngineProvider_SoundEngineProvider({
  children
}) {
  const soundApi = useFacetUnwrap(useSharedFacet(soundFacet));
  const soundDriver = useMemo(() => ({
    play(eventName, extraDelay, volume = 1, pitch = 1) {
      const delay = extraDelay;
      let soundId;
      let timeout;

      const play = () => {
        if (soundApi == null || soundApi === NO_VALUE) {
          console.log('Bedrock Sound driver not yet initialized while playing', eventName);
          return;
        }

        soundId = soundApi.play(eventName, volume, pitch);
      };

      if (delay > 0) {
        timeout = setTimeout(play, delay);
      } else {
        play();
      }

      return () => {
        if (timeout != null) clearTimeout(timeout);

        if (soundApi == null || soundApi === NO_VALUE) {
          console.log('Bedrock Sound driver not yet initialized while stopping', eventName);
          return;
        } else if (soundApi.isPlaying(soundId)) {
          soundApi.fadeOut(soundId, 0);
        }
      };
    }

  }), [soundApi]);
  return /*#__PURE__*/React.createElement(SoundProvider, {
    driver: soundDriver
  }, children);
}
;// CONCATENATED MODULE: ./packages/engine/src/facets/safeZoneFacet.ts

const SAFE_ZONE_FACET = 'core.safeZone';
/**
 * React Hook that requests the facet
 */

const safeZoneFacet_safeZoneFacet = (0,src.sharedFacet)(SAFE_ZONE_FACET);
;// CONCATENATED MODULE: ./packages/engine/src/providers/SafeZoneEngineProvider.tsx




function SafeZoneEngineProvider_SafeZoneEngineProvider({
  children
}) {
  const safeZone = useFacetUnwrap(useSharedFacet(safeZoneFacet));
  return safeZone != null && safeZone !== NO_VALUE ? /*#__PURE__*/React.createElement(SafeZoneProvider, {
    safeAreaX: safeZone.safeAreaX,
    safeAreaY: safeZone.safeAreaY,
    screenPositionX: safeZone.screenPositionX,
    screenPositionY: safeZone.screenPositionY
  }, children) : null;
}
;// CONCATENATED MODULE: ./packages/engine/src/providers/SplitScreenEngineProvider.tsx




function SplitScreenEngineProvider_SplitScreenEngineProvider({
  children
}) {
  const splitScreen = useFacetUnwrap(useSharedFacet(splitScreenFacet));
  return splitScreen != null && splitScreen !== NO_VALUE ? /*#__PURE__*/React.createElement(SplitScreenProvider, {
    numActivePlayers: splitScreen.numActivePlayers,
    direction: splitScreen.splitScreenDirection,
    position: splitScreen.splitScreenPosition
  }, children) : null;
}
;// CONCATENATED MODULE: ./packages/engine/src/facets/customScalingFacet.ts

const CUSTOM_SCALING_FACET = 'core.customScaling';
/**
 * React Hook that requests the facet
 */

const customScalingFacet_customScalingFacet = (0,src.sharedFacet)(CUSTOM_SCALING_FACET);
;// CONCATENATED MODULE: ./packages/react-device-information/src/types.ts
let types_ScreenType;

(function (ScreenType) {
  ScreenType[ScreenType["TV_SCREEN_TYPE"] = 0] = "TV_SCREEN_TYPE";
  ScreenType[ScreenType["DESKTOP_SCREEN_TYPE"] = 1] = "DESKTOP_SCREEN_TYPE";
  ScreenType[ScreenType["HANDHELD_SCREEN_TYPE"] = 2] = "HANDHELD_SCREEN_TYPE";
  ScreenType[ScreenType["VR_SCREEN_TYPE"] = 3] = "VR_SCREEN_TYPE";
})(types_ScreenType || (types_ScreenType = {}));

let types_HandheldDeviceType;

(function (HandheldDeviceType) {
  HandheldDeviceType[HandheldDeviceType["PHONE"] = 0] = "PHONE";
  HandheldDeviceType[HandheldDeviceType["TABLET"] = 1] = "TABLET";
})(types_HandheldDeviceType || (types_HandheldDeviceType = {}));

let types_InputMethod;

(function (InputMethod) {
  InputMethod[InputMethod["GAMEPAD"] = 0] = "GAMEPAD";
  InputMethod[InputMethod["TOUCH"] = 1] = "TOUCH";
  InputMethod[InputMethod["MOUSE"] = 2] = "MOUSE";
  InputMethod[InputMethod["MOTION"] = 3] = "MOTION";
  InputMethod[InputMethod["KEYBOARD"] = 4] = "KEYBOARD";
})(types_InputMethod || (types_InputMethod = {}));

let ARVRPlatform;

(function (ARVRPlatform) {
  ARVRPlatform[ARVRPlatform["ARVR_None"] = 0] = "ARVR_None";
  ARVRPlatform[ARVRPlatform["ARVR_Rift"] = 1] = "ARVR_Rift";
  ARVRPlatform[ARVRPlatform["ARVR_Holographic"] = 2] = "ARVR_Holographic";
  ARVRPlatform[ARVRPlatform["ARVR_WindowsMR"] = 3] = "ARVR_WindowsMR";
  ARVRPlatform[ARVRPlatform["ARVR_PSVR"] = 4] = "ARVR_PSVR";
  ARVRPlatform[ARVRPlatform["ARVR_GearVR"] = 5] = "ARVR_GearVR";
  ARVRPlatform[ARVRPlatform["ARVR_DesktopXR"] = 6] = "ARVR_DesktopXR";
})(ARVRPlatform || (ARVRPlatform = {}));

let Platform;

(function (Platform) {
  Platform[Platform["IOS"] = 0] = "IOS";
  Platform[Platform["GOOGLE"] = 1] = "GOOGLE";
  Platform[Platform["AMAZON_HANDHELD"] = 2] = "AMAZON_HANDHELD";
  Platform[Platform["UWP"] = 3] = "UWP";
  Platform[Platform["XBOX"] = 4] = "XBOX";
  Platform[Platform["NX_HANDHELD"] = 5] = "NX_HANDHELD";
  Platform[Platform["PS4"] = 6] = "PS4";
  Platform[Platform["GEARVR"] = 7] = "GEARVR";
  Platform[Platform["WIN32"] = 8] = "WIN32";
  Platform[Platform["MACOS"] = 9] = "MACOS";
  Platform[Platform["AMAZON_TV"] = 10] = "AMAZON_TV";
  Platform[Platform["NX_TV"] = 11] = "NX_TV";
  Platform[Platform["PS5"] = 12] = "PS5";
})(Platform || (Platform = {}));

let types_Scale;

(function (Scale) {
  Scale[Scale["SCALE_100_PERCENT"] = 4] = "SCALE_100_PERCENT";
  Scale[Scale["SCALE_125_PERCENT"] = 5] = "SCALE_125_PERCENT";
  Scale[Scale["SCALE_150_PERCENT"] = 6] = "SCALE_150_PERCENT";
  Scale[Scale["SCALE_175_PERCENT"] = 7] = "SCALE_175_PERCENT";
  Scale[Scale["SCALE_200_PERCENT"] = 8] = "SCALE_200_PERCENT";
})(types_Scale || (types_Scale = {}));

let types_Controller;

(function (Controller) {
  Controller[Controller["XBOX"] = 0] = "XBOX";
  Controller[Controller["PS"] = 1] = "PS";
  Controller[Controller["STEAM"] = 2] = "STEAM";
  Controller[Controller["SWITCH"] = 3] = "SWITCH";
  Controller[Controller["QUEST"] = 4] = "QUEST";
})(types_Controller || (types_Controller = {}));
;// CONCATENATED MODULE: ./packages/engine/src/providers/UIEngineProvider/calculateScale.ts

/**
 * How the UI should scale across different screens
 *
 * - default: the way we want to move in the future (should be used by most teams)
 * - compat: some teams have the relative sizes of their components not being mobile-first
 * - legacy: scale the UI so that relative sises compared to legacy screens feels the same
 * - fixed: will only scale when a user actively chooses to scale through an option
 */

function isHandheld(a, b) {
  return b === ScreenType.HANDHELD_SCREEN_TYPE;
}

function calculateScale_calculateScale(mode, screenType, guiScaleModifier, width, height, pixelsPerMillimeter, accessibleGuiScale) {
  if (false) {}
  /**
   * For now, scaling mode 'fixed' will do the same thing as if
   * the user was running in a browser, but that might change.
   */


  if (mode === 'fixed') {
    /**
     * It's possible that guiScaleModifier is also set from the
     * engine when the window is resized. In that case, we probably
     * want to use a different variable here, such as fixedGuiScaleModifier.
     * This potential new value would need to be added to the UIEngineProvider.
     * Basically, we only want fixed scaling to be set by a menu option, the way
     * that scaling can be set in the browser through handleScaleChange (which
     * in turn triggers useScale)
     */
    return calculateFixedGuiScale(guiScaleModifier, accessibleGuiScale);
    /**
     * If this turns out to be an issue, we could temporarily just always return
     * 100% scaling like so:
     *
     * return Scale.SCALE_100_PERCENT
     *
     * This should force the scaling to be fixed, but it won't let the user manually
     * change the scaling, so we will definitely want to have a variable for that.
     */
  }

  const screenTypeBaseScale = SCREEN_TYPE_BASE_SCALE[mode][screenType];

  if (isHandheld(screenTypeBaseScale, screenType)) {
    return calculatePPIGuiScale(mode, screenTypeBaseScale, guiScaleModifier, pixelsPerMillimeter, width, height, accessibleGuiScale);
  }

  return calculateResolutionGuiScale(mode, screenTypeBaseScale, guiScaleModifier, width, height, accessibleGuiScale);
}
/**
 * Calculates the final scaling of UI elements based on the pixel density (PPI) of the current device.
 * It uses the PPI of the original iPhone as a base, and calculates a scaling factor to be applied on the UI.
 *
 * For example:
 * 	- running the game on the original iPhone (163ppi), would result in a guiScale of 4 (the base scale)
 *  - running the game on an iPhone 7 (326ppi, 14.330709 ppm), would return a guiScale of 8
 */

function calculatePPIGuiScale(mode, screenTypeBaseScale, guiScaleModifier, pixelsPerMillimeter, width, height, accessibleGuiScale) {
  const dpiScaleFactor = pixelsPerMillimeter / SCREEN_TYPE_BASE_PPM;
  const widthPoints = width / dpiScaleFactor;
  const heightPoints = height / dpiScaleFactor;
  const currentHandheldDeviceType = widthPoints > 1000 && heightPoints > 700 ? HandheldDeviceType.TABLET : HandheldDeviceType.PHONE;
  const handheldDeviceTypeBaseScale = screenTypeBaseScale[currentHandheldDeviceType];
  const guiScaleBase = Math.round(dpiScaleFactor * handheldDeviceTypeBaseScale);
  const scaledGuiScaleModifier = Math.round(dpiScaleFactor * guiScaleModifier);
  const PPIGuiScale = guiScaleBase + scaledGuiScaleModifier;

  if (accessibleGuiScale === true) {
    return calculateAccessibleGuiScale(PPIGuiScale);
  }

  return PPIGuiScale;
}
/**
 * For TVs and Desktops, the PPI information is not reliable
 * so instead we use a base resolution (1920x1080) and calculate a scaling factor from it
 *
 * For example:
 * - running the game in a console in 1080p will result in the scale of 7 (the base for that screen type)
 * - running the game in a console in 4k will result in the scale of 14 (twice the base for that screen type)
 */


function calculateResolutionGuiScale(mode, screenTypeBaseScale, guiScaleModifier, width, height, accessibleGuiScale) {
  const widthNeeded = 1920;
  const heightNeeded = 1080;
  const widthScale = width / widthNeeded;
  const heightScale = height / heightNeeded;
  const resolutionScaleFactor = Math.min(heightScale, widthScale);
  const guiScaleBase = Math.round(resolutionScaleFactor * screenTypeBaseScale);
  const scaledGuiScaleModifier = Math.round(resolutionScaleFactor * guiScaleModifier);
  const resolutionGuiScale = guiScaleBase + scaledGuiScaleModifier;

  if (accessibleGuiScale === true) {
    return calculateAccessibleGuiScale(resolutionGuiScale);
  }

  return resolutionGuiScale;
}
/**
 * Fixed scaling is to be used on development environments where we don't want the ui to scale (ex: browser)
 */


function calculateFixedGuiScale(guiScaleModifier, accessibleGuiScale) {
  const fixedGuiScale = Scale.SCALE_100_PERCENT + guiScaleModifier;

  if (accessibleGuiScale === true) {
    return calculateAccessibleGuiScale(fixedGuiScale);
  }

  return fixedGuiScale;
}
/**
 * This function returns an increased scale by 25% for accessibility purposes
 */


function calculateAccessibleGuiScale(guiScale) {
  return Math.ceil(guiScale * 1.25);
}
/**
 * For different platforms, what is the "starting scale"
 *
 * In this context, 4 means 100% scaling.
 */


const SCREEN_TYPE_BASE_SCALE = {
  /**
   * There are currently some inconsistencies in how different teams within the monorepo
   * work with scaling, so we provide this mode to keep the "starting scale" consistent
   * across different screen types.
   */
  compat: {
    [types_ScreenType.DESKTOP_SCREEN_TYPE]: types_Scale.SCALE_100_PERCENT,
    [types_ScreenType.TV_SCREEN_TYPE]: types_Scale.SCALE_100_PERCENT,
    [types_ScreenType.HANDHELD_SCREEN_TYPE]: {
      [types_HandheldDeviceType.PHONE]: types_Scale.SCALE_100_PERCENT,
      [types_HandheldDeviceType.TABLET]: types_Scale.SCALE_100_PERCENT
    },
    [types_ScreenType.VR_SCREEN_TYPE]: types_Scale.SCALE_100_PERCENT
  },

  /**
   * Legacy mode allows better relative sizes between new UI elements and legacy UI elements
   * and can be used in a game that is transitioning to Ore UI (Gameface)
   */
  legacy: {
    /**
     * On desktop, font size should equal or exceed:
     * - 18px at 1080p
     * - 29px at 4k
     *
     * Our base size (for handheld) is 16px, so we should do 125% (5)
     * However, this makes the UI too small in comparison with the legacy UI
     * To keep things more consistently, we are keeping the UI bigger overall, thus having base size as 175% (7) (for the time being)
     *
     * TODO: once more screens are converted to Gameface, we can update this to a more correct number
     */
    [types_ScreenType.DESKTOP_SCREEN_TYPE]: types_Scale.SCALE_175_PERCENT,

    /**
     * On tv, font size should equal or exceed:
     * - 26px at 1080p
     * - 44px at 4k
     *
     * Our base size (for handheld) is 16px, so we do 175% (7)
     */
    [types_ScreenType.TV_SCREEN_TYPE]: types_Scale.SCALE_175_PERCENT,

    /**
     * We use PPI information for handheld, so the base is 100% (4),
     * except for tablets that we bump up to 6 in order to match
     * the size of the UI in the legacy screens.
     */
    [types_ScreenType.HANDHELD_SCREEN_TYPE]: {
      [types_HandheldDeviceType.PHONE]: types_Scale.SCALE_100_PERCENT,
      [types_HandheldDeviceType.TABLET]: types_Scale.SCALE_150_PERCENT
    },

    /**
     * TODO: still needs to be defined
     */
    [types_ScreenType.VR_SCREEN_TYPE]: types_Scale.SCALE_100_PERCENT
  },
  default: {
    /**
     * On desktop, font size should equal or exceed:
     * - 18px at 1080p
     * - 29px at 4k
     *
     * Our base size (for handheld) is 16px, so we should do 125% (5)
     */
    [types_ScreenType.DESKTOP_SCREEN_TYPE]: types_Scale.SCALE_125_PERCENT,

    /**
     * On tv, font size should equal or exceed:
     * - 26px at 1080p
     * - 44px at 4k
     *
     * Our base size (for handheld) is 16px, so we do 175% (7)
     */
    [types_ScreenType.TV_SCREEN_TYPE]: types_Scale.SCALE_175_PERCENT,

    /**
     * We use PPI information for handheld, so the base is 100% (4)
     */
    [types_ScreenType.HANDHELD_SCREEN_TYPE]: {
      [types_HandheldDeviceType.PHONE]: types_Scale.SCALE_100_PERCENT,
      [types_HandheldDeviceType.TABLET]: types_Scale.SCALE_100_PERCENT
    },

    /**
     * TODO: still needs to be defined
     */
    [types_ScreenType.VR_SCREEN_TYPE]: types_Scale.SCALE_100_PERCENT
  },

  /**
   * This is an experimental ScalingMode that will never scale based on resolution
   * or screen size. It can, however, be scaled manually by a user through settings.
   */
  fixed: {
    [types_ScreenType.DESKTOP_SCREEN_TYPE]: types_Scale.SCALE_100_PERCENT,
    [types_ScreenType.TV_SCREEN_TYPE]: types_Scale.SCALE_100_PERCENT,
    [types_ScreenType.HANDHELD_SCREEN_TYPE]: {
      [types_HandheldDeviceType.PHONE]: types_Scale.SCALE_100_PERCENT,
      [types_HandheldDeviceType.TABLET]: types_Scale.SCALE_100_PERCENT
    },
    [types_ScreenType.VR_SCREEN_TYPE]: types_Scale.SCALE_100_PERCENT
  }
};
/**
 * 163ppi which is the original iPhone
 */

const SCREEN_TYPE_BASE_PPM = 6.417322835;
;// CONCATENATED MODULE: ./packages/engine/src/providers/UIEngineProvider/UIEngineProvider.tsx











function UIEngineProvider_UIEngineProvider({
  children,
  scalingMode
}) {
  const deviceInformation = useSharedFacet(deviceInformationFacet);
  const customScaling = useSharedFacet(customScalingFacet);
  const splitScreen = useSharedFacet(splitScreenFacet);
  const animation = useSharedFacet(animationFacet);
  const scalingModeToUse = useFacetMap(customScaling => customScaling.scalingModeOverride != null && customScaling.scalingModeOverride && customScaling.scalingModeOverride.length > 0 ? customScaling.scalingModeOverride : scalingMode, [scalingMode], [customScaling]);
  const fixedGuiScaleModifier = useFacetMap(customScaling => customScaling.fixedGuiScaleModifier, [], [customScaling]);
  const accessibleGuiScale = useFacetMap(customScaling => {
    var _customScaling$guiAcc;

    return (_customScaling$guiAcc = customScaling.guiAccessibilityScaling) !== null && _customScaling$guiAcc !== void 0 ? _customScaling$guiAcc : false;
  }, [], [customScaling]); // Wait for all facets to emit values

  const shouldRender = useFacetMap(() => true, [], [deviceInformation, splitScreen, animation, fixedGuiScaleModifier, scalingModeToUse, accessibleGuiScale]); // Performance while running the game in split screen is degraded,
  // so we disable animations to a more snappy UI

  const screenAnimationEnabled = useFacetMap((animation, splitScreen) => animation.screenAnimationEnabled && splitScreen.numActivePlayers === 1, [], [animation, splitScreen]);
  return /*#__PURE__*/React.createElement(Mount, {
    when: shouldRender
  }, /*#__PURE__*/React.createElement(ScaleProvider, {
    deviceInformationFacet: deviceInformation,
    scalingMode: scalingModeToUse,
    screenAnimationEnabled: screenAnimationEnabled,
    fixedGuiScaleModifier: fixedGuiScaleModifier,
    accessibleGuiScale: accessibleGuiScale
  }, children));
}

function ScaleProvider({
  scalingMode,
  children,
  deviceInformationFacet,
  screenAnimationEnabled,
  fixedGuiScaleModifier,
  accessibleGuiScale
}) {
  const screenType = useDeviceScreenType();
  const guiScale = useScale(scalingMode, screenType, deviceInformationFacet, fixedGuiScaleModifier, accessibleGuiScale);
  const locale = useLocale();
  const isRtl = useIsLocaleRtl();
  const handleGuiScaleApplied = useCallback(() => {
    // Gameface currently has a bug where it will apply incorrect proportions to elements
    // when a new base font-size is applied.
    // This events lets the backend knows we just changed the font size so that they can
    // do a workaround
    // More information at https://coherentlabs.zendesk.com/hc/requests/16845
    engine.trigger('core:gui:resize-hack');
  }, []);
  return /*#__PURE__*/React.createElement(UIProvider, {
    guiScale: guiScale,
    onGuiScaleApplied: handleGuiScaleApplied,
    screenAnimationEnabled: screenAnimationEnabled,
    isRtl: isRtl,
    locale: locale
  }, children);
}

function useScale(scalingMode, screenType, deviceInformation, fixedGuiScaleModifier, accessibleGuiScale) {
  const guiScaleModifier = useFacetMap((deviceInformation, fixedGuiScaleModifier, scalingMode) => scalingMode == 'fixed' ? fixedGuiScaleModifier : deviceInformation.guiScaleModifier, [], [deviceInformation, fixedGuiScaleModifier, scalingMode]);
  const calculateCurrentScale = useFacetCallback((scalingMode, screenType, deviceInformation, guiScaleModifier, accessibleGuiScale) => () => calculateScale(scalingMode, screenType, guiScaleModifier, window.innerWidth, window.innerHeight, deviceInformation.pixelsPerMillimeter, accessibleGuiScale), [], [scalingMode, screenType, deviceInformation, guiScaleModifier, accessibleGuiScale]); // Initialize the state by calling the calculateCurrentScale function

  const [scale, setScale] = useFacetState(calculateCurrentScale());
  useEffect(() => {
    const resize = () => setScale(calculateCurrentScale);

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [calculateCurrentScale, setScale]);
  useFacetEffect(() => {
    setScale(calculateCurrentScale);
  }, [setScale, calculateCurrentScale], [deviceInformation, fixedGuiScaleModifier]);
  return scale;
}
;// CONCATENATED MODULE: ./packages/engine/src/providers/UIEngineProvider/index.ts

;// CONCATENATED MODULE: ./packages/engine/src/onEvent.ts

function onEvent_onEvent(eventName, cb) {
  const callback = cb; // eslint-disable-line @typescript-eslint/no-explicit-any

  engine.on(eventName, callback);
  return () => engine.off(eventName, callback);
}
// Gameface doesn't support returning values from JavaScript so we use
// OutParameter<T> as a workaround and return a value by modifying its
// value property
function onReturnValueEvent(eventName, getValue) {
  return onEvent_onEvent(eventName, (out, ...args) => {
    out.value = getValue(...args);
  }); // eslint-disable-next-line react-hooks/exhaustive-deps
}
;// CONCATENATED MODULE: ./packages/engine/src/providers/TextFieldEngineProvider.tsx



function TextFieldEngineProvider_TextFieldEngineProvider({
  children
}) {
  const onGlobalChange = useCallback(cb => {
    // inputChange object will be destroyed after this callback, this is to make sure it can be accessed after the callback
    // TextInputChange only has immutable parameters, so shallow copy applied. Otherwise, it shall be deep copied.
    const copyInputChangeCB = inputChange => {
      cb({
        addedChars: inputChange.addedChars + '',
        removedChars: inputChange.removedChars + '',
        invalidChars: inputChange.invalidChars + '',
        index: inputChange.index + 0
      });
    };

    return onEvent('core:keyboard:changed', copyInputChangeCB);
  }, []);
  const onKeyboardSubmitted = useCallback(cb => onEvent('core:keyboard:submitted', cb), []);
  const onKeyboadrDismissed = useCallback(cb => onEvent('core:keyboard:dismissed', cb), []);
  const onKeyboardTabbed = useCallback(cb => onEvent('core:keyboard:tabbed', cb), []);
  const KeyboardCallbacks = {
    changedCB: onGlobalChange,
    submittedCB: onKeyboardSubmitted,
    dismissedCB: onKeyboadrDismissed,
    tabbedCB: onKeyboardTabbed
  };
  return /*#__PURE__*/React.createElement(OnChangeProvider, {
    value: KeyboardCallbacks
  }, children);
}
;// CONCATENATED MODULE: ./packages/engine/src/providers/RenderTrackingEngineProvider.tsx



function RenderTrackingEngineProvider_RenderTrackingEngineProvider({
  children
}) {
  const trigger = useMemo(() => engine.trigger.bind(engine), []);
  return /*#__PURE__*/React.createElement(RenderTrackingProvider, {
    triggerEvent: trigger
  }, children);
}
;// CONCATENATED MODULE: ./packages/engine/src/GamepadPolyfillInitializer.tsx


const GamepadPolyfillInitializer_GamepadPolyfillInitializer = ({
  children
}) => {
  useEffect(() => {
    if (isInitialized()) return;
    const cleanup = initialize();
    return cleanup;
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
};
;// CONCATENATED MODULE: ./packages/engine/src/facets/requestFacet.ts

const referenceCount = new Map();
const instancePool = new Map(); // eslint-disable-line @typescript-eslint/no-explicit-any

const notFoundPool = new Map(); // eslint-disable-line @typescript-eslint/no-explicit-any

const ERROR_ACTIVATE_NOT_FOUND = 'activate-facet-not-found';
function requestFacet_requestFacet(facetName, update, fallBack, customErrorHandler) {
  var _referenceCount$get;

  const notFound = notFoundPool.get(facetName);

  if (notFound != null) {
    // if not found, we just use the fallback implementation already stored
    // and don't try to request it ever again
    update(notFound);
    return () => {// given it's a facet that was not found, there is no cleanup that needs to be performed
    };
  }

  const defaultErrorHandler = errorCode => {
    console.warn(`Error "${errorCode}" while using facet ${facetName}`);
  };

  const handleError = errorCode => {
    if (errorCode === ERROR_ACTIVATE_NOT_FOUND && fallBack != null) {
      notFoundPool.set(facetName, fallBack);
      update(fallBack);
    } else if (customErrorHandler) {
      customErrorHandler(errorCode);
    } else {
      defaultErrorHandler(errorCode);
    }
  };

  const handleUpdated = newValue => {
    instancePool.set(facetName, newValue);
    update(newValue);
  };

  const facetReferenceCount = (_referenceCount$get = referenceCount.get(facetName)) !== null && _referenceCount$get !== void 0 ? _referenceCount$get : 0;
  const facetInstance = instancePool.get(facetName);
  engine.on(`facet:updated:${facetName}`, handleUpdated);
  engine.on(`facet:error:${facetName}`, handleError);

  if (facetReferenceCount === 0) {
    // request the facet if it is the first time
    engine.trigger('facet:request', [facetName]);
  } else if (facetInstance != null) {
    // since we are not requesting, we send an instance if it is available
    update(facetInstance);
  } // increment the reference count


  referenceCount.set(facetName, facetReferenceCount + 1); // returns a function that performs a cleanup

  return () => {
    var _referenceCount$get2;

    const currentFacetReferenceCount = (_referenceCount$get2 = referenceCount.get(facetName)) !== null && _referenceCount$get2 !== void 0 ? _referenceCount$get2 : 0;
    engine.off(`facet:updated:${facetName}`, handleUpdated);
    engine.off(`facet:error:${facetName}`, handleError);

    if (currentFacetReferenceCount === 1) {
      // if it is the last reference, inform the backend it can
      // stop updating this facet
      engine.trigger('facet:discard', [facetName]); // and remove it from the instance pool

      instancePool.delete(facetName);
    }

    if (currentFacetReferenceCount > 0) {
      referenceCount.set(facetName, currentFacetReferenceCount - 1);
    }
  };
}
function resetInstancePool() {
  instancePool.clear();
  referenceCount.clear();
  notFoundPool.clear();
}
;// CONCATENATED MODULE: ./packages/engine/src/providers/ControllerSpecificButtonTranslationsProvider.tsx







const ControllerSpecificButtonTranslationsProvider_ControllerSpecificButtonTranslationsProvider = ({
  children
}) => {
  const {
    t
  } = useLocalization('ControllerSpecificButtonNarration'); // We don't want to use useFacetMemo because of the assumption that it might not run when there's no facet,
  // we're not sure if that bug has been fixed. In either case, we only wanna memoize an object and then wrap it to a facet.
  // When the object changes facet update should take care of propagating the update.

  const translations = useMemo(() => ({
    gamepad: {
      [ButtonType.A]: {
        [Controller.XBOX]: t('.Gamepad.A.XBOX'),
        [Controller.PS]: t('.Gamepad.A.PS'),
        [Controller.STEAM]: t('.Gamepad.A.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.A.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.A.QUEST')
      },
      [ButtonType.B]: {
        [Controller.XBOX]: t('.Gamepad.B.XBOX'),
        [Controller.PS]: t('.Gamepad.B.PS'),
        [Controller.STEAM]: t('.Gamepad.B.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.B.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.B.QUEST')
      },
      [ButtonType.X]: {
        [Controller.XBOX]: t('.Gamepad.X.XBOX'),
        [Controller.PS]: t('.Gamepad.X.PS'),
        [Controller.STEAM]: t('.Gamepad.X.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.X.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.X.QUEST')
      },
      [ButtonType.Y]: {
        [Controller.XBOX]: t('.Gamepad.Y.XBOX'),
        [Controller.PS]: t('.Gamepad.Y.PS'),
        [Controller.STEAM]: t('.Gamepad.Y.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.Y.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.Y.QUEST')
      },
      [ButtonType.START]: {
        [Controller.XBOX]: t('.Gamepad.START.XBOX'),
        [Controller.PS]: t('.Gamepad.START.PS'),
        [Controller.STEAM]: t('.Gamepad.START.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.START.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.START.QUEST')
      },
      [ButtonType.SELECT]: {
        [Controller.XBOX]: t('.Gamepad.SELECT.XBOX'),
        [Controller.PS]: t('.Gamepad.SELECT.PS'),
        [Controller.STEAM]: t('.Gamepad.SELECT.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.SELECT.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.SELECT.QUEST')
      },
      [ButtonType.XBOX]: {
        [Controller.XBOX]: t('.Gamepad.XBOX.XBOX'),
        [Controller.PS]: t('.Gamepad.XBOX.PS'),
        [Controller.STEAM]: t('.Gamepad.XBOX.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.XBOX.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.XBOX.QUEST')
      },
      [ButtonType.RIGHT_TRIGGER]: {
        [Controller.XBOX]: t('.Gamepad.RT.XBOX'),
        [Controller.PS]: t('.Gamepad.RT.PS'),
        [Controller.STEAM]: t('.Gamepad.RT.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.RT.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.RT.QUEST')
      },
      [ButtonType.LEFT_TRIGGER]: {
        [Controller.XBOX]: t('.Gamepad.LT.XBOX'),
        [Controller.PS]: t('.Gamepad.LT.PS'),
        [Controller.STEAM]: t('.Gamepad.LT.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.LT.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.LT.QUEST')
      },
      [ButtonType.LEFT_BUMPER]: {
        [Controller.XBOX]: t('.Gamepad.LB.XBOX'),
        [Controller.PS]: t('.Gamepad.LB.PS'),
        [Controller.STEAM]: t('.Gamepad.LB.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.LB.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.LB.QUEST')
      },
      [ButtonType.RIGHT_BUMPER]: {
        [Controller.XBOX]: t('.Gamepad.RB.XBOX'),
        [Controller.PS]: t('.Gamepad.RB.PS'),
        [Controller.STEAM]: t('.Gamepad.RB.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.RB.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.RB.QUEST')
      },
      [ButtonType.L3]: {
        [Controller.XBOX]: t('.Gamepad.L3.XBOX'),
        [Controller.PS]: t('.Gamepad.L3.PS'),
        [Controller.STEAM]: t('.Gamepad.L3.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.L3.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.L3.QUEST')
      },
      [ButtonType.R3]: {
        [Controller.XBOX]: t('.Gamepad.R3.XBOX'),
        [Controller.PS]: t('.Gamepad.R3.PS'),
        [Controller.STEAM]: t('.Gamepad.R3.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.R3.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.R3.QUEST')
      },
      [ButtonType.LEFT]: {
        [Controller.XBOX]: t('.Gamepad.LEFT.XBOX'),
        [Controller.PS]: t('.Gamepad.LEFT.PS'),
        [Controller.STEAM]: t('.Gamepad.LEFT.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.LEFT.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.LEFT.QUEST')
      },
      [ButtonType.RIGHT]: {
        [Controller.XBOX]: t('.Gamepad.RIGHT.XBOX'),
        [Controller.PS]: t('.Gamepad.RIGHT.PS'),
        [Controller.STEAM]: t('.Gamepad.RIGHT.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.RIGHT.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.RIGHT.QUEST')
      },
      [ButtonType.UP]: {
        [Controller.XBOX]: t('.Gamepad.UP.XBOX'),
        [Controller.PS]: t('.Gamepad.UP.PS'),
        [Controller.STEAM]: t('.Gamepad.UP.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.UP.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.UP.QUEST')
      },
      [ButtonType.DOWN]: {
        [Controller.XBOX]: t('.Gamepad.DOWN.XBOX'),
        [Controller.PS]: t('.Gamepad.DOWN.PS'),
        [Controller.STEAM]: t('.Gamepad.DOWN.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.DOWN.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.DOWN.QUEST')
      },
      [ButtonType.NEXT]: {
        [Controller.XBOX]: t('.Gamepad.NEXT.XBOX'),
        [Controller.PS]: t('.Gamepad.NEXT.PS'),
        [Controller.STEAM]: t('.Gamepad.NEXT.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.NEXT.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.NEXT.QUEST')
      },
      [ButtonType.PREV]: {
        [Controller.XBOX]: t('.Gamepad.PREV.XBOX'),
        [Controller.PS]: t('.Gamepad.PREV.PS'),
        [Controller.STEAM]: t('.Gamepad.PREV.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.PREV.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.PREV.QUEST')
      },
      [ButtonType.LEFT_ANALOG_LEFT]: {
        [Controller.XBOX]: t('.Gamepad.L_LEFT.XBOX'),
        [Controller.PS]: t('.Gamepad.L_LEFT.PS'),
        [Controller.STEAM]: t('.Gamepad.L_LEFT.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.L_LEFT.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.L_LEFT.QUEST')
      },
      [ButtonType.LEFT_ANALOG_RIGHT]: {
        [Controller.XBOX]: t('.Gamepad.L_RIGHT.XBOX'),
        [Controller.PS]: t('.Gamepad.L_RIGHT.PS'),
        [Controller.STEAM]: t('.Gamepad.L_RIGHT.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.L_RIGHT.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.L_RIGHT.QUEST')
      },
      [ButtonType.LEFT_ANALOG_UP]: {
        [Controller.XBOX]: t('.Gamepad.L_UP.XBOX'),
        [Controller.PS]: t('.Gamepad.L_UP.PS'),
        [Controller.STEAM]: t('.Gamepad.L_UP.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.L_UP.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.L_UP.QUEST')
      },
      [ButtonType.LEFT_ANALOG_DOWN]: {
        [Controller.XBOX]: t('.Gamepad.L_DOWN.XBOX'),
        [Controller.PS]: t('.Gamepad.L_DOWN.PS'),
        [Controller.STEAM]: t('.Gamepad.L_DOWN.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.L_DOWN.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.L_DOWN.QUEST')
      },
      [ButtonType.RIGHT_ANALOG_LEFT]: {
        [Controller.XBOX]: t('.Gamepad.R_LEFT.XBOX'),
        [Controller.PS]: t('.Gamepad.R_LEFT.PS'),
        [Controller.STEAM]: t('.Gamepad.R_LEFT.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.R_LEFT.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.R_LEFT.QUEST')
      },
      [ButtonType.RIGHT_ANALOG_RIGHT]: {
        [Controller.XBOX]: t('.Gamepad.R_RIGHT.XBOX'),
        [Controller.PS]: t('.Gamepad.R_RIGHT.PS'),
        [Controller.STEAM]: t('.Gamepad.R_RIGHT.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.R_RIGHT.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.R_RIGHT.QUEST')
      },
      [ButtonType.RIGHT_ANALOG_UP]: {
        [Controller.XBOX]: t('.Gamepad.R_UP.XBOX'),
        [Controller.PS]: t('.Gamepad.R_UP.PS'),
        [Controller.STEAM]: t('.Gamepad.R_UP.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.R_UP.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.R_UP.QUEST')
      },
      [ButtonType.RIGHT_ANALOG_DOWN]: {
        [Controller.XBOX]: t('.Gamepad.R_DOWN.XBOX'),
        [Controller.PS]: t('.Gamepad.R_DOWN.PS'),
        [Controller.STEAM]: t('.Gamepad.R_DOWN.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.R_DOWN.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.R_DOWN.QUEST')
      },
      [ButtonType.LEFT_HORIZONTAL_AXIS]: {
        [Controller.XBOX]: t('.Gamepad.LEFT_HORIZONTAL_AXIS.XBOX'),
        [Controller.PS]: t('.Gamepad.LEFT_HORIZONTAL_AXIS.PS'),
        [Controller.STEAM]: t('.Gamepad.LEFT_HORIZONTAL_AXIS.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.LEFT_HORIZONTAL_AXIS.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.LEFT_HORIZONTAL_AXIS.QUEST')
      },
      [ButtonType.LEFT_VERTICAL_AXIS]: {
        [Controller.XBOX]: t('.Gamepad.LEFT_VERTICAL_AXIS.XBOX'),
        [Controller.PS]: t('.Gamepad.LEFT_VERTICAL_AXIS.PS'),
        [Controller.STEAM]: t('.Gamepad.LEFT_VERTICAL_AXIS.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.LEFT_VERTICAL_AXIS.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.LEFT_VERTICAL_AXIS.QUEST')
      },
      [ButtonType.RIGHT_HORIZONTAL_AXIS]: {
        [Controller.XBOX]: t('.Gamepad.RIGHT_HORIZONTAL_AXIS.XBOX'),
        [Controller.PS]: t('.Gamepad.RIGHT_HORIZONTAL_AXIS.PS'),
        [Controller.STEAM]: t('.Gamepad.RIGHT_HORIZONTAL_AXIS.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.RIGHT_HORIZONTAL_AXIS.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.RIGHT_HORIZONTAL_AXIS.QUEST')
      },
      [ButtonType.RIGHT_VERTICAL_AXIS]: {
        [Controller.XBOX]: t('.Gamepad.RIGHT_VERTICAL_AXIS.XBOX'),
        [Controller.PS]: t('.Gamepad.RIGHT_VERTICAL_AXIS.PS'),
        [Controller.STEAM]: t('.Gamepad.RIGHT_VERTICAL_AXIS.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.RIGHT_VERTICAL_AXIS.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.RIGHT_VERTICAL_AXIS.QUEST')
      },
      // these are "pseudo buttons" defined to allow us to use additional keyboard-only inputs that remain unmapped on gamepad
      [ButtonType.PSEUDO_BUTTON_1]: {
        [Controller.XBOX]: t('.Gamepad.PSEUDO_BUTTON_1.XBOX'),
        [Controller.PS]: t('.Gamepad.PSEUDO_BUTTON_1.PS'),
        [Controller.STEAM]: t('.Gamepad.PSEUDO_BUTTON_1.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.PSEUDO_BUTTON_1.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.PSEUDO_BUTTON_1.QUEST')
      },
      [ButtonType.PSEUDO_BUTTON_2]: {
        [Controller.XBOX]: t('.Gamepad.PSEUDO_BUTTON_2.XBOX'),
        [Controller.PS]: t('.Gamepad.PSEUDO_BUTTON_2.PS'),
        [Controller.STEAM]: t('.Gamepad.PSEUDO_BUTTON_2.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.PSEUDO_BUTTON_2.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.PSEUDO_BUTTON_2.QUEST')
      },
      [ButtonType.PSEUDO_BUTTON_3]: {
        [Controller.XBOX]: t('.Gamepad.PSEUDO_BUTTON_3.XBOX'),
        [Controller.PS]: t('.Gamepad.PSEUDO_BUTTON_3.PS'),
        [Controller.STEAM]: t('.Gamepad.PSEUDO_BUTTON_3.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.PSEUDO_BUTTON_3.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.PSEUDO_BUTTON_3.QUEST')
      },
      [ButtonType.PSEUDO_BUTTON_4]: {
        [Controller.XBOX]: t('.Gamepad.PSEUDO_BUTTON_4.XBOX'),
        [Controller.PS]: t('.Gamepad.PSEUDO_BUTTON_4.PS'),
        [Controller.STEAM]: t('.Gamepad.PSEUDO_BUTTON_4.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.PSEUDO_BUTTON_4.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.PSEUDO_BUTTON_4.QUEST')
      },
      [ButtonType.PSEUDO_BUTTON_5]: {
        [Controller.XBOX]: t('.Gamepad.PSEUDO_BUTTON_5.XBOX'),
        [Controller.PS]: t('.Gamepad.PSEUDO_BUTTON_5.PS'),
        [Controller.STEAM]: t('.Gamepad.PSEUDO_BUTTON_5.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.PSEUDO_BUTTON_5.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.PSEUDO_BUTTON_5.QUEST')
      },
      [ButtonType.PSEUDO_BUTTON_6]: {
        [Controller.XBOX]: t('.Gamepad.PSEUDO_BUTTON_6.XBOX'),
        [Controller.PS]: t('.Gamepad.PSEUDO_BUTTON_6.PS'),
        [Controller.STEAM]: t('.Gamepad.PSEUDO_BUTTON_6.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.PSEUDO_BUTTON_6.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.PSEUDO_BUTTON_6.QUEST')
      },
      [ButtonType.PSEUDO_BUTTON_7]: {
        [Controller.XBOX]: t('.Gamepad.PSEUDO_BUTTON_7.XBOX'),
        [Controller.PS]: t('.Gamepad.PSEUDO_BUTTON_7.PS'),
        [Controller.STEAM]: t('.Gamepad.PSEUDO_BUTTON_7.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.PSEUDO_BUTTON_7.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.PSEUDO_BUTTON_7.QUEST')
      },
      [ButtonType.PSEUDO_BUTTON_8]: {
        [Controller.XBOX]: t('.Gamepad.PSEUDO_BUTTON_8.XBOX'),
        [Controller.PS]: t('.Gamepad.PSEUDO_BUTTON_8.PS'),
        [Controller.STEAM]: t('.Gamepad.PSEUDO_BUTTON_8.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.PSEUDO_BUTTON_8.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.PSEUDO_BUTTON_8.QUEST')
      },
      [ButtonType.PSEUDO_BUTTON_9]: {
        [Controller.XBOX]: t('.Gamepad.PSEUDO_BUTTON_9.XBOX'),
        [Controller.PS]: t('.Gamepad.PSEUDO_BUTTON_9.PS'),
        [Controller.STEAM]: t('.Gamepad.PSEUDO_BUTTON_9.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.PSEUDO_BUTTON_9.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.PSEUDO_BUTTON_9.QUEST')
      },
      [ButtonType.PSEUDO_BUTTON_10]: {
        [Controller.XBOX]: t('.Gamepad.PSEUDO_BUTTON_10.XBOX'),
        [Controller.PS]: t('.Gamepad.PSEUDO_BUTTON_10.PS'),
        [Controller.STEAM]: t('.Gamepad.PSEUDO_BUTTON_10.STEAM'),
        [Controller.SWITCH]: t('.Gamepad.PSEUDO_BUTTON_10.SWITCH'),
        [Controller.QUEST]: t('.Gamepad.PSEUDO_BUTTON_10.QUEST')
      }
    },
    keyboard: {
      [KeyboardKey.BACKSPACE]: t('.Keyboard.BACKSPACE'),
      [KeyboardKey.TAB]: t('.Keyboard.TAB'),
      [KeyboardKey.ENTER]: t('.Keyboard.ENTER'),
      [KeyboardKey.SHIFT]: t('.Keyboard.SHIFT'),
      [KeyboardKey.CTRL]: t('.Keyboard.CTRL'),
      [KeyboardKey.ALT]: t('.Keyboard.ALT'),
      [KeyboardKey.ESCAPE]: t('.Keyboard.ESCAPE'),
      [KeyboardKey.SPACE]: t('.Keyboard.SPACE'),
      [KeyboardKey.LEFT]: t('.Keyboard.LEFT'),
      [KeyboardKey.UP]: t('.Keyboard.UP'),
      [KeyboardKey.RIGHT]: t('.Keyboard.RIGHT'),
      [KeyboardKey.DOWN]: t('.Keyboard.DOWN'),
      [KeyboardKey.INSERT]: t('.Keyboard.INSERT'),
      [KeyboardKey.DELETE]: t('.Keyboard.DELETE'),
      [KeyboardKey.KEY_0]: t('.Keyboard.KEY_0'),
      [KeyboardKey.KEY_1]: t('.Keyboard.KEY_1'),
      [KeyboardKey.KEY_2]: t('.Keyboard.KEY_2'),
      [KeyboardKey.KEY_3]: t('.Keyboard.KEY_3'),
      [KeyboardKey.KEY_4]: t('.Keyboard.KEY_4'),
      [KeyboardKey.KEY_5]: t('.Keyboard.KEY_5'),
      [KeyboardKey.KEY_6]: t('.Keyboard.KEY_6'),
      [KeyboardKey.KEY_7]: t('.Keyboard.KEY_7'),
      [KeyboardKey.KEY_8]: t('.Keyboard.KEY_8'),
      [KeyboardKey.KEY_9]: t('.Keyboard.KEY_9'),
      [KeyboardKey.KEY_A]: t('.Keyboard.KEY_A'),
      [KeyboardKey.KEY_B]: t('.Keyboard.KEY_B'),
      [KeyboardKey.KEY_C]: t('.Keyboard.KEY_C'),
      [KeyboardKey.KEY_D]: t('.Keyboard.KEY_D'),
      [KeyboardKey.KEY_E]: t('.Keyboard.KEY_E'),
      [KeyboardKey.KEY_F]: t('.Keyboard.KEY_F'),
      [KeyboardKey.KEY_G]: t('.Keyboard.KEY_G'),
      [KeyboardKey.KEY_H]: t('.Keyboard.KEY_H'),
      [KeyboardKey.KEY_I]: t('.Keyboard.KEY_I'),
      [KeyboardKey.KEY_J]: t('.Keyboard.KEY_J'),
      [KeyboardKey.KEY_K]: t('.Keyboard.KEY_K'),
      [KeyboardKey.KEY_L]: t('.Keyboard.KEY_L'),
      [KeyboardKey.KEY_M]: t('.Keyboard.KEY_M'),
      [KeyboardKey.KEY_N]: t('.Keyboard.KEY_N'),
      [KeyboardKey.KEY_O]: t('.Keyboard.KEY_O'),
      [KeyboardKey.KEY_P]: t('.Keyboard.KEY_P'),
      [KeyboardKey.KEY_Q]: t('.Keyboard.KEY_Q'),
      [KeyboardKey.KEY_R]: t('.Keyboard.KEY_R'),
      [KeyboardKey.KEY_S]: t('.Keyboard.KEY_S'),
      [KeyboardKey.KEY_T]: t('.Keyboard.KEY_T'),
      [KeyboardKey.KEY_U]: t('.Keyboard.KEY_U'),
      [KeyboardKey.KEY_V]: t('.Keyboard.KEY_V'),
      [KeyboardKey.KEY_W]: t('.Keyboard.KEY_W'),
      [KeyboardKey.KEY_X]: t('.Keyboard.KEY_X'),
      [KeyboardKey.KEY_Y]: t('.Keyboard.KEY_Y'),
      [KeyboardKey.KEY_Z]: t('.Keyboard.KEY_Z'),
      [KeyboardKey.F1]: t('.Keyboard.F1'),
      [KeyboardKey.F2]: t('.Keyboard.F2'),
      [KeyboardKey.F3]: t('.Keyboard.F3'),
      [KeyboardKey.F4]: t('.Keyboard.F4'),
      [KeyboardKey.F5]: t('.Keyboard.F5'),
      [KeyboardKey.F6]: t('.Keyboard.F6'),
      [KeyboardKey.F7]: t('.Keyboard.F7'),
      [KeyboardKey.F8]: t('.Keyboard.F8'),
      [KeyboardKey.F9]: t('.Keyboard.F9'),
      [KeyboardKey.F10]: t('.Keyboard.F10'),
      [KeyboardKey.F11]: t('.Keyboard.F11'),
      [KeyboardKey.F12]: t('.Keyboard.F12'),
      [KeyboardKey.MOUSE_MOVEMENT]: t('.Keyboard.MOUSE_MOVEMENT'),
      [KeyboardKey.MOUSE_BUTTON_LEFT]: t('.Keyboard.MOUSE_BUTTON_LEFT'),
      [KeyboardKey.MOUSE_BUTTON_MIDDLE]: t('.Keyboard.MOUSE_BUTTON_MIDDLE'),
      [KeyboardKey.MOUSE_BUTTON_RIGHT]: t('.Keyboard.MOUSE_BUTTON_RIGHT'),
      [KeyboardKey.MOUSE_WHEEL]: t('.Keyboard.MOUSE_WHEEL'),
      [KeyboardKey.BRACKET_OPEN]: t('.Keyboard.BRACKET_OPEN'),
      [KeyboardKey.BRACKET_CLOSE]: t('.Keyboard.BRACKET_CLOSE'),
      [KeyboardKey.PSEUDO_KEY_1]: t('.Keyboard.PSEUDO_KEY_1'),
      [KeyboardKey.PSEUDO_KEY_2]: t('.Keyboard.PSEUDO_KEY_2'),
      [KeyboardKey.PSEUDO_KEY_3]: t('.Keyboard.PSEUDO_KEY_3'),
      [KeyboardKey.PSEUDO_KEY_4]: t('.Keyboard.PSEUDO_KEY_4')
    }
  }), [t]);
  const translationsFacet = useFacetWrap(translations);
  return /*#__PURE__*/React.createElement(controllerSpecificButtonTranslationsContext.Provider, {
    value: translationsFacet
  }, children);
};
;// CONCATENATED MODULE: ./packages/engine/src/Application.tsx






















function Application({
  children,
  defaultRoute,
  developmentTranslations,
  errorComponent,
  gamepadAdapterVersion = GamepadAdapterVersion.LEGACY,
  scalingMode = 'default',
  keyboardGamepadMap = DEFAULT_KEYBOARD_GAMEPAD_MAP,
  isInputLegendClickable,
  semanticTokens,
  sharedFacetDriver = requestFacet,
  wrapperComponent = React.Fragment,
  deviceInformationOptions = {},
  shouldUseNarrationQueueSystem = false
}) {
  const Wrapper = wrapperComponent;
  return /*#__PURE__*/React.createElement(SemanticTokensCollectionsManager, null, /*#__PURE__*/React.createElement(SemanticTokensCollectionProvider, {
    collection: semanticTokens
  }, /*#__PURE__*/React.createElement(SharedFacetDriverProvider, {
    value: sharedFacetDriver
  }, /*#__PURE__*/React.createElement(GamepadAdapterProvider, {
    version: gamepadAdapterVersion
  }, /*#__PURE__*/React.createElement(LocalizationEngineProvider, {
    developmentTranslations: developmentTranslations
  }, /*#__PURE__*/React.createElement(ControllerSpecificButtonTranslationsProvider, null, /*#__PURE__*/React.createElement(GamepadPolyfillInitializer, null, /*#__PURE__*/React.createElement(DeviceInformationEngineProvider, deviceInformationOptions, /*#__PURE__*/React.createElement(SplitScreenEngineProvider, null, /*#__PURE__*/React.createElement(SafeZoneEngineProvider, null, /*#__PURE__*/React.createElement(FeatureFlagsEngineProvider, null, /*#__PURE__*/React.createElement(SoundEngineProvider, null, /*#__PURE__*/React.createElement(UIEngineProvider, {
    scalingMode: scalingMode
  }, /*#__PURE__*/React.createElement(ErrorBoundary, {
    errorComponent: errorComponent
  }, /*#__PURE__*/React.createElement(TextFieldEngineProvider, null, /*#__PURE__*/React.createElement(RouterEngineProvider, {
    keyboardGamepadMap: keyboardGamepadMap,
    isInputLegendClickable: isInputLegendClickable
  }, /*#__PURE__*/React.createElement(NarratorEngineProvider, {
    shouldUseQueueSystem: shouldUseNarrationQueueSystem
  }, /*#__PURE__*/React.createElement(Modal.FocusManager, null, /*#__PURE__*/React.createElement(RenderTrackingEngineProvider, null, /*#__PURE__*/React.createElement(Redirect, {
    from: "/",
    to: defaultRoute
  }), /*#__PURE__*/React.createElement(ModalManager, null, /*#__PURE__*/React.createElement(Wrapper, null, /*#__PURE__*/React.createElement(Switch, null, children))))))))))))))))))))));
}
;// CONCATENATED MODULE: ./packages/engine/src/facets/defineFakeFacet.ts

function defineFakeFacet(facetName, fakeConstructor) {
  const update = data => {
    // Delay updating the facet state until the next frame to better mimic how state changes works in the real engine
    requestAnimationFrame(() => engine.trigger(`facet:updated:${facetName}`, data));
  };

  const onError = errorCode => {
    engine.trigger(`facet:error:${facetName}`, errorCode);
  };

  engine.on('facet:request', facets => {
    // Delay the result of the facet request to the next frame to simulate the real engine behavior
    requestAnimationFrame(() => {
      if (facets.indexOf(facetName) !== -1) {
        fakeConstructor(update, onError);
      }
    });
  });
}
;// CONCATENATED MODULE: ./packages/engine/src/trigger.ts

/**
 * Internal method to trigger engine events. Only use it if you know exactly what you are doing.
 *
 * You most likely can solve your problem by using just Facets instead.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any

const trigger = (type, ...args) => {
  return engine.trigger(type, ...args);
};
;// CONCATENATED MODULE: ./packages/engine/src/facets/performanceSharedFacet.ts

/**
 * Shared facet used for performance measurements.
 */

const PERFORMANCE_SHARED_FACET = 'core.performanceFacet';
/**
 * We don't want to have this exposed as a regular sharedFacet, since we will used this Facet on performance test screens,
 * where we usually don't have any FacetProvider infrastructure.
 */

const observePerformanceSharedFacet = update => {
  const updateEventName = `facet:updated:${PERFORMANCE_SHARED_FACET}`;
  engineWrapper_engine.on(updateEventName, update);
  engineWrapper_engine.trigger('facet:request', [PERFORMANCE_SHARED_FACET]);
  return () => {
    engineWrapper_engine.off(updateEventName, update);
  };
};
;// CONCATENATED MODULE: ./packages/engine/src/facets/socialFacet.ts

const SOCIAL_FACET = 'core.social';
/**
 * React Hook that requests the facet
 */

const socialFacet = (0,src.sharedFacet)(SOCIAL_FACET);
;// CONCATENATED MODULE: ./packages/engine/src/facets/user.ts

const USER_FACET = 'core.user';
/**
 * React Hook that requests the facet
 */

const userFacet = (0,src.facet)(USER_FACET);
;// CONCATENATED MODULE: ./packages/engine/src/facets/vrModeSharedFacet.ts

let VRMode;

(function (VRMode) {
  VRMode[VRMode["NoVR"] = 0] = "NoVR";
  VRMode[VRMode["VRFull3DWorld"] = 1] = "VRFull3DWorld";
  VRMode[VRMode["VRVirtual2DScreen"] = 2] = "VRVirtual2DScreen";
})(VRMode || (VRMode = {}));

const VR_MODE_SHARED_FACET = 'core.vrMode';
const vrModeSharedFacet = (0,src.sharedFacet)(VR_MODE_SHARED_FACET);
;// CONCATENATED MODULE: ./packages/engine/src/render.ts

const render = (element, container) => {
  return (0,src.render)(element, container);
};
;// CONCATENATED MODULE: ./packages/engine/src/dev/fixtures/animationFacet.ts
const animationFacetDefaultState = {
  screenAnimationEnabled: true
};
;// CONCATENATED MODULE: ./packages/engine/src/dev/fixtures/customScalingFacet.ts
const customScalingDefaultState = {
  scalingModeOverride: undefined,
  fixedGuiScaleModifier: 0,
  MIN_FIXED_GUI_SCALE_MODIFIER: -3,
  MAX_FIXED_GUI_SCALE_MODIFIER: 4,
  guiAccessibilityScaling: false
};
;// CONCATENATED MODULE: ./packages/engine/src/dev/setup/utils.ts



let detectInputInitialized = false;
const onMouseHandlers = (/* unused pure expression or super */ null && ([]));
const onTouchHandlers = (/* unused pure expression or super */ null && ([]));
const onGamepadHandlers = (/* unused pure expression or super */ null && ([]));

const initializeDetectInput = () => {
  detectInputInitialized = true; // Setup touch detection
  // We keep track of the time stamp of the last touchend event since it will also trigger
  // a mousedown event and we want to avoid calling the detect mouse handlers in those cases.

  let timeStampLastTouchEndEvent = -1;

  const shouldIgnoreMouseEvent = event => timeStampLastTouchEndEvent === event.timeStamp;

  const touchDetected = () => {
    onTouchHandlers.forEach(handler => handler());
  };

  const handleTouchEnd = event => {
    timeStampLastTouchEndEvent = event.timeStamp;
    touchDetected();
  };

  window.addEventListener('touchstart', touchDetected);
  window.addEventListener('touchend', handleTouchEnd); // Setup mouse detection

  const mouseDetected = event => {
    if (shouldIgnoreMouseEvent(event)) {
      return;
    }

    onMouseHandlers.forEach(handler => handler());
  };

  window.addEventListener('mousemove', mouseDetected);
  window.addEventListener('mousedown', mouseDetected);
  window.addEventListener('wheel', mouseDetected); // Setup gamepad detection

  let cleanupGamepadPolyfill = () => undefined;

  if (!isPolyfillInitialized()) {
    cleanupGamepadPolyfill = initializePolyfill();
  }

  const cleanupGamepad = onGamepadInput(gamepads => {
    onGamepadHandlers.forEach(handler => handler(gamepads));
  }); // Clean up handlers ("beforeunload" only works in the browser, not in the player)

  window.addEventListener('beforeunload', () => {
    window.removeEventListener('touchstart', touchDetected);
    window.removeEventListener('touchend', handleTouchEnd);
    window.removeEventListener('mousemove', mouseDetected);
    window.removeEventListener('mousedown', mouseDetected);
    window.removeEventListener('wheel', mouseDetected);
    cleanupGamepad();
    cleanupGamepadPolyfill();
  });
};

const utils_detectInput = ({
  onMouse,
  onTouch,
  onGamepad
}) => {
  if (!detectInputInitialized) initializeDetectInput();
  onMouseHandlers.push(onMouse);
  onTouchHandlers.push(onTouch);
  onGamepadHandlers.push(onGamepad);
}; // Not by any means a complete way of checking if this is a touch device, but good enough for our fake facets
// The gameface player is always exposing ontouchstart, but we are only running the player for desktop, so setting it to false in that case.

const IS_TOUCH_DEVICE =  false && 0;
const DEFAULT_PLATFORM = IS_TOUCH_DEVICE ? Platform.IOS : Platform.WIN32;
;// CONCATENATED MODULE: ./packages/engine/src/dev/fixtures/deviceInformationFacet.ts


function deviceInformationFacet_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function deviceInformationFacet_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { deviceInformationFacet_ownKeys(Object(source), true).forEach(function (key) { deviceInformationFacet_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { deviceInformationFacet_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function deviceInformationFacet_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const GUI_SCALE_VALUES = [1, 2, 3, 4, 5, 6, 7, 8];

function getDefaultSupportedInputMethods(platform = DEFAULT_PLATFORM) {
  switch (platform) {
    case Platform.IOS:
    case Platform.GOOGLE:
    case Platform.AMAZON_HANDHELD:
      return [types_InputMethod.TOUCH, types_InputMethod.GAMEPAD, types_InputMethod.MOUSE];

    case Platform.NX_TV:
      return [types_InputMethod.GAMEPAD];

    case Platform.NX_HANDHELD:
      return [types_InputMethod.GAMEPAD, types_InputMethod.TOUCH];

    case Platform.UWP:
    case Platform.XBOX:
    case Platform.PS4:
    case Platform.GEARVR:
    case Platform.AMAZON_TV:
    case Platform.PS5:
    case Platform.WIN32:
    case Platform.MACOS:
    default:
      return [types_InputMethod.GAMEPAD, types_InputMethod.MOUSE];
  }
}

const deviceInformationFacetDefaultState = {
  inputMethods: getDefaultSupportedInputMethods(),
  platform: DEFAULT_PLATFORM,
  arvrPlatform: ARVRPlatform.ARVR_None,
  isLowMemoryDevice: false,
  guiScaleModifier: 0,
  guiScaleBase: getGuiScaleIndexForLargeScreen(window.innerWidth, window.innerHeight),
  pixelsPerMillimeter: 3.779527559,
  // 96dpi,
  displayWidth: 1920,
  displayHeight: 1080,
  storageSize: Math.pow(1024, 4),
  storageUsed: Math.pow(1024, 4) * 0.75,
  isStorageFull: false,
  isStorageLow: false,
  isUsingAlternativeStorage: false,
  isOnline: true
};
function deviceInformationFacetWithPlatform(platform) {
  return deviceInformationFacet_objectSpread(deviceInformationFacet_objectSpread({}, deviceInformationFacetDefaultState), {}, {
    platform: platform
  });
}
const deviceInformationAlternativeStorageFacetState = deviceInformationFacet_objectSpread(deviceInformationFacet_objectSpread({}, deviceInformationFacetDefaultState), {}, {
  isUsingAlternativeStorage: true
});
const deviceInformationSharedFacetCustomState = overrides => deviceInformationFacet_objectSpread(deviceInformationFacet_objectSpread({}, deviceInformationFacetDefaultState), overrides);
function deviceInformationSharedFacetFactory(proxy, {
  storageSize,
  storageUsed,
  isStorageFull,
  isStorageLow
} = deviceInformationFacetDefaultState) {
  Object.assign(proxy, _clone(deviceInformationFacetDefaultState));
  window.addEventListener('resize', () => {
    proxy.guiScaleBase = getGuiScaleIndexForLargeScreen(window.innerWidth, window.innerHeight);
  });
  proxy.storageSize = storageSize !== null && storageSize !== void 0 ? storageSize : proxy.storageSize;
  proxy.storageUsed = storageUsed !== null && storageUsed !== void 0 ? storageUsed : proxy.storageUsed;
  proxy.isStorageFull = isStorageFull !== null && isStorageFull !== void 0 ? isStorageFull : proxy.isStorageFull;
  proxy.isStorageLow = isStorageLow !== null && isStorageLow !== void 0 ? isStorageLow : proxy.isStorageLow;
  detectInput({
    onMouse: () => {
      if (!proxy.inputMethods.includes(InputMethod.MOUSE)) {
        proxy.inputMethods.push(InputMethod.MOUSE);
      }
    },
    onTouch: () => {
      if (!proxy.inputMethods.includes(InputMethod.TOUCH)) {
        proxy.inputMethods.push(InputMethod.TOUCH);
      }
    },
    onGamepad: () => {
      if (!proxy.inputMethods.includes(InputMethod.GAMEPAD)) {
        proxy.inputMethods.push(InputMethod.GAMEPAD);
      }
    }
  });
  return proxy;
}

function getGuiScaleIndexForLargeScreen(width, height) {
  const widthNeeded = 376;
  const heightNeeded = 250;
  const widthScale = width / widthNeeded;
  const heightScale = height / heightNeeded; // This will ensure we are using an allowed GUI SCALE.  It will clamp to the biggest available GUI SCALE that is smaller or equal to the desired one

  const index = getGuiScaleIndex(Math.min(heightScale, widthScale));
  const scale = GUI_SCALE_VALUES[index];
  return scale;
}

function getGuiScaleIndex(scale) {
  let scaleIndex = 0;
  const guiScaleSize = GUI_SCALE_VALUES.length;

  for (let index = 0; index < guiScaleSize; ++index) {
    if (resolveGuiScale(index) > scale) {
      break;
    }

    scaleIndex = index;
  }

  return scaleIndex;
}

function resolveGuiScale(index) {
  const clampedIndex = Math.min(GUI_SCALE_VALUES.length - 1, Math.max(0, index));
  return GUI_SCALE_VALUES[clampedIndex];
}
;// CONCATENATED MODULE: ./packages/engine/src/dev/fixtures/featureFlagsFacet.ts
const featureFlagsFacetDefaultState = {
  flags: ['vanilla.achievementsReward', 'vanilla.editor.enableUI']
};
;// CONCATENATED MODULE: ./packages/engine/src/dev/fixtures/inputFacet.ts

const inputFacetDefaultState = {
  acceptInputFromAllControllers: true,
  gameControllerId: '0',
  swapABButtons: false,
  swapXYButtons: false,
  currentInputType: types_InputMethod.GAMEPAD
};
// EXTERNAL MODULE: ./node_modules/printf/lib/printf.js
var printf = __webpack_require__(5523);
var printf_default = /*#__PURE__*/__webpack_require__.n(printf);
;// CONCATENATED MODULE: ./packages/engine/src/developmentTranslations.ts
function getDevelopmentTranslation(key) {
  var _window$__globalDevCo;

  /**
   * Global variable containing all the development translations
   * It is populated via the Webpack loader configured to handle translatinos.json files
   */
  const translations = (_window$__globalDevCo = window.__globalDevCoreUITranslations) !== null && _window$__globalDevCo !== void 0 ? _window$__globalDevCo : {};
  return translations[key];
}
;// CONCATENATED MODULE: ./packages/engine/src/dev/fixtures/localeFacet.ts


const localeFacetDefaultState = {
  locale: 'en_US',

  formatDate(timestampInSeconds) {
    const date = new Date(timestampInSeconds * 1000);
    return `${date.toLocaleDateString()}`;
  },

  translate(key) {
    const translation = getDevelopmentTranslation(key);

    if (translation == null) {
      console.error(`Missing translation for key "${key}"`);
      return key;
    }

    return translation;
  },

  translateWithParameters(key, params) {
    const translation = getDevelopmentTranslation(key);

    if (translation == null) {
      console.error(`Missing translation for key "${key}"`);
      return key;
    }

    return printf_default()(translation, ...params);
  }

};
;// CONCATENATED MODULE: ./packages/engine/src/dev/fixtures/safeZoneFacet.ts
const safeZoneFacetDefaultState = {
  safeAreaX: 1,
  safeAreaY: 1,
  screenPositionX: 0,
  screenPositionY: 0
};
;// CONCATENATED MODULE: ./packages/react-device-information/src/SplitScreen.tsx

let SplitScreen_SplitScreenDirection;

(function (SplitScreenDirection) {
  SplitScreenDirection[SplitScreenDirection["HORIZONTAL"] = 0] = "HORIZONTAL";
  SplitScreenDirection[SplitScreenDirection["VERTICAL"] = 1] = "VERTICAL";
})(SplitScreen_SplitScreenDirection || (SplitScreen_SplitScreenDirection = {}));

const splitScreenContext = (0,react.createContext)({
  numActivePlayers: 1,
  direction: SplitScreen_SplitScreenDirection.HORIZONTAL,
  position: 0
});
const useSplitScreen = () => useContext(splitScreenContext);
function SplitScreen_SplitScreenProvider({
  children,
  numActivePlayers,
  direction = SplitScreen_SplitScreenDirection.HORIZONTAL,
  position
}) {
  const value = useMemo(() => ({
    numActivePlayers,
    direction,
    position
  }), [numActivePlayers, direction, position]);
  return /*#__PURE__*/React.createElement(splitScreenContext.Provider, {
    value: value
  }, children);
}
;// CONCATENATED MODULE: ./packages/engine/src/dev/fixtures/splitScreenFacet.ts

const splitScreenFacetDefaultState = {
  numActivePlayers: 1,
  splitScreenPosition: 0,
  splitScreenDirection: SplitScreen_SplitScreenDirection.HORIZONTAL
};
;// CONCATENATED MODULE: ./packages/engine/src/dev/fixtures/images/templateAlex.png
const templateAlex_namespaceObject = __webpack_require__.p + "assets/templateAlex-f66e6.png";
;// CONCATENATED MODULE: ./packages/engine/src/dev/fixtures/userFacet.ts

const userFacetDefaultState = {
  userName: 'Alex',
  profilePictureUrl: templateAlex_namespaceObject
};
;// CONCATENATED MODULE: ./packages/engine/src/dev/fixtures/vrMode.ts

const vrModeSharedFacetDefaultState = {
  mode: VRMode.NoVR
};
const vrModeSharedFacetRealityState = {
  mode: VRMode.VRFull3DWorld
};
;// CONCATENATED MODULE: ./packages/engine/src/dev/fixtures/index.ts










;// CONCATENATED MODULE: ./packages/engine/src/index.ts






















 // NOTE: This is fine to export as long as fixtures doesn't define fake facets globally






;// CONCATENATED MODULE: ./support/performance-screens/main/src/performanceTestHelpers.tsx
function performanceTestHelpers_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function performanceTestHelpers_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { performanceTestHelpers_ownKeys(Object(source), true).forEach(function (key) { performanceTestHelpers_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { performanceTestHelpers_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function performanceTestHelpers_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





/**
 * If we are running in the browser, we want to Fake the performanceSharedFacet
 */

if (false) {}

/**
 * Dummy application component that can be used by performance test screens.
 *
 * It will be read by our `routes.json` extraction logic, but with no runtime overhead for the test.
 */
function performanceTestHelpers_Application({
  children
}) {
  return /*#__PURE__*/react.createElement(react.Fragment, null, children);
}
function SemanticTokensWrapper({
  children
}) {
  var _process$env$CORE_UI_;

  return /*#__PURE__*/React.createElement(SemanticTokensCollectionsManager, null, /*#__PURE__*/React.createElement(SemanticTokensCollectionProviderFromTheme, {
    theme: (_process$env$CORE_UI_ = "vanilla") !== null && _process$env$CORE_UI_ !== void 0 ? _process$env$CORE_UI_ : 'vanilla'
  }, children));
}

/**
 * Dummy Route component that immediately renderes the component while providing
 * route information to generate the `routes.json` file at build time.
 */
function performanceTestHelpers_Route({
  component: Component
}) {
  return /*#__PURE__*/react.createElement(Component, null);
}

/**
 * Component that can be added to test screens to show in the screen if a performance target is being reached.
 */
function CheckPerformance({
  xboxOneSTarget,
  metric = 'frameTime',
  position = 'bottom'
}) {
  const elementRef = (0,react.useRef)(null);
  const stateRef = (0,react.useRef)({
    total: 0,
    count: 0,
    average: 0,
    pass: false
  });
  (0,react.useEffect)(() => {
    const element = elementRef.current;
    const state = stateRef.current;
    const isFrameTime = metric === 'frameTime';
    if (!element) return;
    return observePerformanceSharedFacet(performance => {
      const currentValue = isFrameTime ? performance.frameTimeMs : performance.gamefaceViewAdvanceTimeMs;
      state.total += currentValue;
      state.count += 1;

      if (state.count === 100) {
        state.average = state.total / state.count;
        state.total = 0;
        state.count = 0;
        state.pass = state.average <= xboxOneSTarget;
      }

      element.textContent = `Average: ${state.average.toFixed(3)}ms. Xbox One S result: ${state.pass ? `PASS (${xboxOneSTarget}ms)` : `FAIL (${xboxOneSTarget}ms)`}. Current: ${currentValue.toFixed(3)}ms`;
    });
  }, [xboxOneSTarget, metric]);
  return /*#__PURE__*/react.createElement("div", {
    style: performanceTestHelpers_objectSpread({
      fontFamily: 'Noto Sans',
      fontSize: '36px',
      position: 'fixed',
      left: '0px',
      right: '0px',
      backgroundColor: 'white',
      color: 'black',
      zIndex: 99999
    }, position === 'bottom' ? {
      bottom: '0px'
    } : {
      top: '0px'
    }),
    ref: elementRef
  });
}

;// CONCATENATED MODULE: ./support/performance-screens/main/src/markerPlainOne.screen.tsx




/**
 * Test screen to validate the fastest we can go on updating style of multiple elements in a given frame.
 *
 * This uses "vanilla JavaScript" to handle the updates, and all is done is a single (hence the "One" in the test name) request animation frame.
 *
 * We can interpret this as the "fastest it can go", and compare the overhead of our react-facet infrastructure.
 */
// eslint-disable-next-line import/no-default-export
function App() {
  return /*#__PURE__*/react.createElement(performanceTestHelpers_Application, {
    defaultRoute: "/performance/markerPlainOne",
    scope: ['out-of-game'],
    errorComponent: () => /*#__PURE__*/react.createElement("div", null)
  }, /*#__PURE__*/react.createElement(CheckPerformance, {
    xboxOneSTarget: 23
  }), /*#__PURE__*/react.createElement(performanceTestHelpers_Route, {
    route: "/performance/markerPlainOne",
    component: Performance
  }));
}

function Performance() {
  const ref = (0,react.useRef)(null);
  (0,react.useEffect)(() => {
    const element = ref.current;
    if (!element) return;

    const styles = times_default()(index => element.children[index].style, 1000);

    let frameId;

    const tick = () => {
      for (let index = 0; index < 1000; index++) {
        const x = Math.random();
        const y = Math.random();
        const style = styles[index];
        style.leftPX = x * 1920;
        style.topPX = y * 1080;
      }

      frameId = requestAnimationFrame(tick);
    };

    tick();
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);
  return /*#__PURE__*/react.createElement("div", {
    ref: ref,
    style: {
      width: '1920px',
      height: '1080px',
      position: 'relative'
    }
  }, times_default()(() => /*#__PURE__*/react.createElement("div", {
    style: {
      width: '4rem',
      height: '4rem',
      backgroundColor: 'green',
      position: 'absolute'
    }
  }), 1000));
}

render( /*#__PURE__*/react.createElement(App, null), document.getElementById('root'));
})();

/******/ })()
;
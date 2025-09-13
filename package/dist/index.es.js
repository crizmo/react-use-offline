import je, { useState as vr, useCallback as Te, useEffect as pr } from "react";
import { openDB as gr } from "idb";
async function q(c = "queue") {
  return gr("offline-queue", 1, {
    upgrade(f) {
      f.objectStoreNames.contains(c) || f.createObjectStore(c, { keyPath: "id" });
    }
  });
}
async function yr(c, f = "queue") {
  const v = (await q(f)).transaction(f, "readwrite");
  v.store.add(c), await v.done;
}
async function br(c = "queue") {
  return await (await q(c)).getAll(c);
}
async function Oe(c, f = "queue") {
  const v = (await q(f)).transaction(f, "readwrite");
  v.store.delete(c), await v.done;
}
async function Er(c, f = "queue") {
  const v = (await q(f)).transaction(f, "readwrite");
  v.store.put(c), await v.done;
}
function mr() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
function Tr(c, f = {}) {
  const {
    storeName: E = "queue",
    maxAttempts: v = 3,
    backoffBaseMs: D = 1e3,
    concurrency: S = 1
  } = f, [w, R] = vr(!1), g = Te(
    async (l) => {
      const p = {
        id: mr(),
        createdAt: Date.now(),
        attempts: 0,
        payload: l
      };
      await yr(p, E), _();
    },
    [E]
  ), _ = Te(async () => {
    if (!(w || !navigator.onLine)) {
      R(!0);
      try {
        const l = await br(E);
        for (const p of l.slice(0, S)) {
          await Er({ ...p, attempts: p.attempts + 1 }, E);
          try {
            await c(p.payload), await Oe(p.id, E);
          } catch (T) {
            console.warn("Retry later:", T), p.attempts + 1 >= v && await Oe(p.id, E);
          }
        }
      } finally {
        R(!1);
      }
    }
  }, [w, c, E, v, S]);
  return pr(() => {
    navigator.onLine && _();
    const l = () => _();
    return window.addEventListener("online", l), () => window.removeEventListener("online", l);
  }, [_]), { enqueue: g, processing: w };
}
var H = { exports: {} }, I = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Se;
function hr() {
  if (Se) return I;
  Se = 1;
  var c = je, f = Symbol.for("react.element"), E = Symbol.for("react.fragment"), v = Object.prototype.hasOwnProperty, D = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, S = { key: !0, ref: !0, __self: !0, __source: !0 };
  function w(R, g, _) {
    var l, p = {}, T = null, W = null;
    _ !== void 0 && (T = "" + _), g.key !== void 0 && (T = "" + g.key), g.ref !== void 0 && (W = g.ref);
    for (l in g) v.call(g, l) && !S.hasOwnProperty(l) && (p[l] = g[l]);
    if (R && R.defaultProps) for (l in g = R.defaultProps, g) p[l] === void 0 && (p[l] = g[l]);
    return { $$typeof: f, type: R, key: T, ref: W, props: p, _owner: D.current };
  }
  return I.Fragment = E, I.jsx = w, I.jsxs = w, I;
}
var $ = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Pe;
function _r() {
  return Pe || (Pe = 1, process.env.NODE_ENV !== "production" && function() {
    var c = je, f = Symbol.for("react.element"), E = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), D = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), w = Symbol.for("react.provider"), R = Symbol.for("react.context"), g = Symbol.for("react.forward_ref"), _ = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), W = Symbol.for("react.offscreen"), Q = Symbol.iterator, xe = "@@iterator";
    function ke(e) {
      if (e === null || typeof e != "object")
        return null;
      var r = Q && e[Q] || e[xe];
      return typeof r == "function" ? r : null;
    }
    var j = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function y(e) {
      {
        for (var r = arguments.length, t = new Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++)
          t[n - 1] = arguments[n];
        De("error", e, t);
      }
    }
    function De(e, r, t) {
      {
        var n = j.ReactDebugCurrentFrame, o = n.getStackAddendum();
        o !== "" && (r += "%s", t = t.concat([o]));
        var u = t.map(function(i) {
          return String(i);
        });
        u.unshift("Warning: " + r), Function.prototype.apply.call(console[e], console, u);
      }
    }
    var Ae = !1, Fe = !1, Ie = !1, $e = !1, We = !1, Z;
    Z = Symbol.for("react.module.reference");
    function Ye(e) {
      return !!(typeof e == "string" || typeof e == "function" || e === v || e === S || We || e === D || e === _ || e === l || $e || e === W || Ae || Fe || Ie || typeof e == "object" && e !== null && (e.$$typeof === T || e.$$typeof === p || e.$$typeof === w || e.$$typeof === R || e.$$typeof === g || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      e.$$typeof === Z || e.getModuleId !== void 0));
    }
    function Le(e, r, t) {
      var n = e.displayName;
      if (n)
        return n;
      var o = r.displayName || r.name || "";
      return o !== "" ? t + "(" + o + ")" : t;
    }
    function ee(e) {
      return e.displayName || "Context";
    }
    function O(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case v:
          return "Fragment";
        case E:
          return "Portal";
        case S:
          return "Profiler";
        case D:
          return "StrictMode";
        case _:
          return "Suspense";
        case l:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case R:
            var r = e;
            return ee(r) + ".Consumer";
          case w:
            var t = e;
            return ee(t._context) + ".Provider";
          case g:
            return Le(e, e.render, "ForwardRef");
          case p:
            var n = e.displayName || null;
            return n !== null ? n : O(e.type) || "Memo";
          case T: {
            var o = e, u = o._payload, i = o._init;
            try {
              return O(i(u));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var P = Object.assign, A = 0, re, te, ne, ae, ie, oe, ue;
    function se() {
    }
    se.__reactDisabledLog = !0;
    function Me() {
      {
        if (A === 0) {
          re = console.log, te = console.info, ne = console.warn, ae = console.error, ie = console.group, oe = console.groupCollapsed, ue = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: se,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        A++;
      }
    }
    function Ve() {
      {
        if (A--, A === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: P({}, e, {
              value: re
            }),
            info: P({}, e, {
              value: te
            }),
            warn: P({}, e, {
              value: ne
            }),
            error: P({}, e, {
              value: ae
            }),
            group: P({}, e, {
              value: ie
            }),
            groupCollapsed: P({}, e, {
              value: oe
            }),
            groupEnd: P({}, e, {
              value: ue
            })
          });
        }
        A < 0 && y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var U = j.ReactCurrentDispatcher, B;
    function Y(e, r, t) {
      {
        if (B === void 0)
          try {
            throw Error();
          } catch (o) {
            var n = o.stack.trim().match(/\n( *(at )?)/);
            B = n && n[1] || "";
          }
        return `
` + B + e;
      }
    }
    var N = !1, L;
    {
      var qe = typeof WeakMap == "function" ? WeakMap : Map;
      L = new qe();
    }
    function ce(e, r) {
      if (!e || N)
        return "";
      {
        var t = L.get(e);
        if (t !== void 0)
          return t;
      }
      var n;
      N = !0;
      var o = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var u;
      u = U.current, U.current = null, Me();
      try {
        if (r) {
          var i = function() {
            throw Error();
          };
          if (Object.defineProperty(i.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(i, []);
            } catch (m) {
              n = m;
            }
            Reflect.construct(e, [], i);
          } else {
            try {
              i.call();
            } catch (m) {
              n = m;
            }
            e.call(i.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (m) {
            n = m;
          }
          e();
        }
      } catch (m) {
        if (m && n && typeof m.stack == "string") {
          for (var a = m.stack.split(`
`), b = n.stack.split(`
`), s = a.length - 1, d = b.length - 1; s >= 1 && d >= 0 && a[s] !== b[d]; )
            d--;
          for (; s >= 1 && d >= 0; s--, d--)
            if (a[s] !== b[d]) {
              if (s !== 1 || d !== 1)
                do
                  if (s--, d--, d < 0 || a[s] !== b[d]) {
                    var h = `
` + a[s].replace(" at new ", " at ");
                    return e.displayName && h.includes("<anonymous>") && (h = h.replace("<anonymous>", e.displayName)), typeof e == "function" && L.set(e, h), h;
                  }
                while (s >= 1 && d >= 0);
              break;
            }
        }
      } finally {
        N = !1, U.current = u, Ve(), Error.prepareStackTrace = o;
      }
      var k = e ? e.displayName || e.name : "", C = k ? Y(k) : "";
      return typeof e == "function" && L.set(e, C), C;
    }
    function Ue(e, r, t) {
      return ce(e, !1);
    }
    function Be(e) {
      var r = e.prototype;
      return !!(r && r.isReactComponent);
    }
    function M(e, r, t) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return ce(e, Be(e));
      if (typeof e == "string")
        return Y(e);
      switch (e) {
        case _:
          return Y("Suspense");
        case l:
          return Y("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case g:
            return Ue(e.render);
          case p:
            return M(e.type, r, t);
          case T: {
            var n = e, o = n._payload, u = n._init;
            try {
              return M(u(o), r, t);
            } catch {
            }
          }
        }
      return "";
    }
    var F = Object.prototype.hasOwnProperty, fe = {}, le = j.ReactDebugCurrentFrame;
    function V(e) {
      if (e) {
        var r = e._owner, t = M(e.type, e._source, r ? r.type : null);
        le.setExtraStackFrame(t);
      } else
        le.setExtraStackFrame(null);
    }
    function Ne(e, r, t, n, o) {
      {
        var u = Function.call.bind(F);
        for (var i in e)
          if (u(e, i)) {
            var a = void 0;
            try {
              if (typeof e[i] != "function") {
                var b = Error((n || "React class") + ": " + t + " type `" + i + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[i] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw b.name = "Invariant Violation", b;
              }
              a = e[i](r, i, n, t, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (s) {
              a = s;
            }
            a && !(a instanceof Error) && (V(o), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", t, i, typeof a), V(null)), a instanceof Error && !(a.message in fe) && (fe[a.message] = !0, V(o), y("Failed %s type: %s", t, a.message), V(null));
          }
      }
    }
    var Je = Array.isArray;
    function J(e) {
      return Je(e);
    }
    function Ke(e) {
      {
        var r = typeof Symbol == "function" && Symbol.toStringTag, t = r && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return t;
      }
    }
    function Ge(e) {
      try {
        return de(e), !1;
      } catch {
        return !0;
      }
    }
    function de(e) {
      return "" + e;
    }
    function ve(e) {
      if (Ge(e))
        return y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Ke(e)), de(e);
    }
    var pe = j.ReactCurrentOwner, ze = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ge, ye;
    function Xe(e) {
      if (F.call(e, "ref")) {
        var r = Object.getOwnPropertyDescriptor(e, "ref").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.ref !== void 0;
    }
    function He(e) {
      if (F.call(e, "key")) {
        var r = Object.getOwnPropertyDescriptor(e, "key").get;
        if (r && r.isReactWarning)
          return !1;
      }
      return e.key !== void 0;
    }
    function Qe(e, r) {
      typeof e.ref == "string" && pe.current;
    }
    function Ze(e, r) {
      {
        var t = function() {
          ge || (ge = !0, y("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "key", {
          get: t,
          configurable: !0
        });
      }
    }
    function er(e, r) {
      {
        var t = function() {
          ye || (ye = !0, y("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", r));
        };
        t.isReactWarning = !0, Object.defineProperty(e, "ref", {
          get: t,
          configurable: !0
        });
      }
    }
    var rr = function(e, r, t, n, o, u, i) {
      var a = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: f,
        // Built-in properties that belong on the element
        type: e,
        key: r,
        ref: t,
        props: i,
        // Record the component responsible for creating this element.
        _owner: u
      };
      return a._store = {}, Object.defineProperty(a._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(a, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(a, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: o
      }), Object.freeze && (Object.freeze(a.props), Object.freeze(a)), a;
    };
    function tr(e, r, t, n, o) {
      {
        var u, i = {}, a = null, b = null;
        t !== void 0 && (ve(t), a = "" + t), He(r) && (ve(r.key), a = "" + r.key), Xe(r) && (b = r.ref, Qe(r, o));
        for (u in r)
          F.call(r, u) && !ze.hasOwnProperty(u) && (i[u] = r[u]);
        if (e && e.defaultProps) {
          var s = e.defaultProps;
          for (u in s)
            i[u] === void 0 && (i[u] = s[u]);
        }
        if (a || b) {
          var d = typeof e == "function" ? e.displayName || e.name || "Unknown" : e;
          a && Ze(i, d), b && er(i, d);
        }
        return rr(e, a, b, o, n, pe.current, i);
      }
    }
    var K = j.ReactCurrentOwner, be = j.ReactDebugCurrentFrame;
    function x(e) {
      if (e) {
        var r = e._owner, t = M(e.type, e._source, r ? r.type : null);
        be.setExtraStackFrame(t);
      } else
        be.setExtraStackFrame(null);
    }
    var G;
    G = !1;
    function z(e) {
      return typeof e == "object" && e !== null && e.$$typeof === f;
    }
    function Ee() {
      {
        if (K.current) {
          var e = O(K.current.type);
          if (e)
            return `

Check the render method of \`` + e + "`.";
        }
        return "";
      }
    }
    function nr(e) {
      return "";
    }
    var me = {};
    function ar(e) {
      {
        var r = Ee();
        if (!r) {
          var t = typeof e == "string" ? e : e.displayName || e.name;
          t && (r = `

Check the top-level render call using <` + t + ">.");
        }
        return r;
      }
    }
    function he(e, r) {
      {
        if (!e._store || e._store.validated || e.key != null)
          return;
        e._store.validated = !0;
        var t = ar(r);
        if (me[t])
          return;
        me[t] = !0;
        var n = "";
        e && e._owner && e._owner !== K.current && (n = " It was passed a child from " + O(e._owner.type) + "."), x(e), y('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', t, n), x(null);
      }
    }
    function _e(e, r) {
      {
        if (typeof e != "object")
          return;
        if (J(e))
          for (var t = 0; t < e.length; t++) {
            var n = e[t];
            z(n) && he(n, r);
          }
        else if (z(e))
          e._store && (e._store.validated = !0);
        else if (e) {
          var o = ke(e);
          if (typeof o == "function" && o !== e.entries)
            for (var u = o.call(e), i; !(i = u.next()).done; )
              z(i.value) && he(i.value, r);
        }
      }
    }
    function ir(e) {
      {
        var r = e.type;
        if (r == null || typeof r == "string")
          return;
        var t;
        if (typeof r == "function")
          t = r.propTypes;
        else if (typeof r == "object" && (r.$$typeof === g || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        r.$$typeof === p))
          t = r.propTypes;
        else
          return;
        if (t) {
          var n = O(r);
          Ne(t, e.props, "prop", n, e);
        } else if (r.PropTypes !== void 0 && !G) {
          G = !0;
          var o = O(r);
          y("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", o || "Unknown");
        }
        typeof r.getDefaultProps == "function" && !r.getDefaultProps.isReactClassApproved && y("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function or(e) {
      {
        for (var r = Object.keys(e.props), t = 0; t < r.length; t++) {
          var n = r[t];
          if (n !== "children" && n !== "key") {
            x(e), y("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), x(null);
            break;
          }
        }
        e.ref !== null && (x(e), y("Invalid attribute `ref` supplied to `React.Fragment`."), x(null));
      }
    }
    var Re = {};
    function we(e, r, t, n, o, u) {
      {
        var i = Ye(e);
        if (!i) {
          var a = "";
          (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (a += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var b = nr();
          b ? a += b : a += Ee();
          var s;
          e === null ? s = "null" : J(e) ? s = "array" : e !== void 0 && e.$$typeof === f ? (s = "<" + (O(e.type) || "Unknown") + " />", a = " Did you accidentally export a JSX literal instead of a component?") : s = typeof e, y("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", s, a);
        }
        var d = tr(e, r, t, o, u);
        if (d == null)
          return d;
        if (i) {
          var h = r.children;
          if (h !== void 0)
            if (n)
              if (J(h)) {
                for (var k = 0; k < h.length; k++)
                  _e(h[k], e);
                Object.freeze && Object.freeze(h);
              } else
                y("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              _e(h, e);
        }
        if (F.call(r, "key")) {
          var C = O(e), m = Object.keys(r).filter(function(dr) {
            return dr !== "key";
          }), X = m.length > 0 ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Re[C + X]) {
            var lr = m.length > 0 ? "{" + m.join(": ..., ") + ": ...}" : "{}";
            y(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, X, C, lr, C), Re[C + X] = !0;
          }
        }
        return e === v ? or(d) : ir(d), d;
      }
    }
    function ur(e, r, t) {
      return we(e, r, t, !0);
    }
    function sr(e, r, t) {
      return we(e, r, t, !1);
    }
    var cr = sr, fr = ur;
    $.Fragment = v, $.jsx = cr, $.jsxs = fr;
  }()), $;
}
process.env.NODE_ENV === "production" ? H.exports = hr() : H.exports = _r();
var Ce = H.exports;
const Or = ({ children: c }) => /* @__PURE__ */ Ce.jsx(Ce.Fragment, { children: c });
export {
  Or as OfflineQueueProvider,
  br as getAllItems,
  Tr as useOfflineQueue
};

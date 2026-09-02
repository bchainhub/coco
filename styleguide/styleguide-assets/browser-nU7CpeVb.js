import { a as e, i as t, n, r, t as i } from "./rolldown-runtime-B1bRi_D7.js";
//#region node_modules/html-validate/node_modules/ajv/dist/compile/codegen/code.js
var a = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
	var t = class {};
	e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
	var n = class extends t {
		constructor(t) {
			if (super(), !e.IDENTIFIER.test(t)) throw Error("CodeGen: name must be a valid identifier");
			this.str = t;
		}
		toString() {
			return this.str;
		}
		emptyStr() {
			return !1;
		}
		get names() {
			return { [this.str]: 1 };
		}
	};
	e.Name = n;
	var r = class extends t {
		constructor(e) {
			super(), this._items = typeof e == "string" ? [e] : e;
		}
		toString() {
			return this.str;
		}
		emptyStr() {
			if (this._items.length > 1) return !1;
			let e = this._items[0];
			return e === "" || e === "\"\"";
		}
		get str() {
			return this._str ??= this._items.reduce((e, t) => `${e}${t}`, "");
		}
		get names() {
			return this._names ??= this._items.reduce((e, t) => (t instanceof n && (e[t.str] = (e[t.str] || 0) + 1), e), {});
		}
	};
	e._Code = r, e.nil = new r("");
	function i(e, ...t) {
		let n = [e[0]], i = 0;
		for (; i < t.length;) s(n, t[i]), n.push(e[++i]);
		return new r(n);
	}
	e._ = i;
	var a = new r("+");
	function o(e, ...t) {
		let n = [p(e[0])], i = 0;
		for (; i < t.length;) n.push(a), s(n, t[i]), n.push(a, p(e[++i]));
		return c(n), new r(n);
	}
	e.str = o;
	function s(e, t) {
		t instanceof r ? e.push(...t._items) : t instanceof n ? e.push(t) : e.push(d(t));
	}
	e.addCodeArg = s;
	function c(e) {
		let t = 1;
		for (; t < e.length - 1;) {
			if (e[t] === a) {
				let n = l(e[t - 1], e[t + 1]);
				if (n !== void 0) {
					e.splice(t - 1, 3, n);
					continue;
				}
				e[t++] = "+";
			}
			t++;
		}
	}
	function l(e, t) {
		if (t === "\"\"") return e;
		if (e === "\"\"") return t;
		if (typeof e == "string") return t instanceof n || e[e.length - 1] !== "\"" ? void 0 : typeof t == "string" ? t[0] === "\"" ? e.slice(0, -1) + t.slice(1) : void 0 : `${e.slice(0, -1)}${t}"`;
		if (typeof t == "string" && t[0] === "\"" && !(e instanceof n)) return `"${e}${t.slice(1)}`;
	}
	function u(e, t) {
		return t.emptyStr() ? e : e.emptyStr() ? t : o`${e}${t}`;
	}
	e.strConcat = u;
	function d(e) {
		return typeof e == "number" || typeof e == "boolean" || e === null ? e : p(Array.isArray(e) ? e.join(",") : e);
	}
	function f(e) {
		return new r(p(e));
	}
	e.stringify = f;
	function p(e) {
		return JSON.stringify(e).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
	}
	e.safeStringify = p;
	function m(t) {
		return typeof t == "string" && e.IDENTIFIER.test(t) ? new r(`.${t}`) : i`[${t}]`;
	}
	e.getProperty = m;
	function h(t) {
		if (typeof t == "string" && e.IDENTIFIER.test(t)) return new r(`${t}`);
		throw Error(`CodeGen: invalid export name: ${t}, use explicit $id name mapping`);
	}
	e.getEsmExportName = h;
	function g(e) {
		return new r(e.toString());
	}
	e.regexpCode = g;
})), o = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
	var t = a(), n = class extends Error {
		constructor(e) {
			super(`CodeGen: "code" for ${e} not defined`), this.value = e.value;
		}
	}, r;
	(function(e) {
		e[e.Started = 0] = "Started", e[e.Completed = 1] = "Completed";
	})(r || (e.UsedValueState = r = {})), e.varKinds = {
		const: new t.Name("const"),
		let: new t.Name("let"),
		var: new t.Name("var")
	};
	var i = class {
		constructor({ prefixes: e, parent: t } = {}) {
			this._names = {}, this._prefixes = e, this._parent = t;
		}
		toName(e) {
			return e instanceof t.Name ? e : this.name(e);
		}
		name(e) {
			return new t.Name(this._newName(e));
		}
		_newName(e) {
			let t = this._names[e] || this._nameGroup(e);
			return `${e}${t.index++}`;
		}
		_nameGroup(e) {
			if ((this._parent?._prefixes)?.has(e) || this._prefixes && !this._prefixes.has(e)) throw Error(`CodeGen: prefix "${e}" is not allowed in this scope`);
			return this._names[e] = {
				prefix: e,
				index: 0
			};
		}
	};
	e.Scope = i;
	var o = class extends t.Name {
		constructor(e, t) {
			super(t), this.prefix = e;
		}
		setValue(e, { property: n, itemIndex: r }) {
			this.value = e, this.scopePath = (0, t._)`.${new t.Name(n)}[${r}]`;
		}
	};
	e.ValueScopeName = o;
	var s = (0, t._)`\n`;
	e.ValueScope = class extends i {
		constructor(e) {
			super(e), this._values = {}, this._scope = e.scope, this.opts = {
				...e,
				_n: e.lines ? s : t.nil
			};
		}
		get() {
			return this._scope;
		}
		name(e) {
			return new o(e, this._newName(e));
		}
		value(e, t) {
			if (t.ref === void 0) throw Error("CodeGen: ref must be passed in value");
			let n = this.toName(e), { prefix: r } = n, i = t.key ?? t.ref, a = this._values[r];
			if (a) {
				let e = a.get(i);
				if (e) return e;
			} else a = this._values[r] = /* @__PURE__ */ new Map();
			a.set(i, n);
			let o = this._scope[r] || (this._scope[r] = []), s = o.length;
			return o[s] = t.ref, n.setValue(t, {
				property: r,
				itemIndex: s
			}), n;
		}
		getValue(e, t) {
			let n = this._values[e];
			if (n) return n.get(t);
		}
		scopeRefs(e, n = this._values) {
			return this._reduceValues(n, (n) => {
				if (n.scopePath === void 0) throw Error(`CodeGen: name "${n}" has no value`);
				return (0, t._)`${e}${n.scopePath}`;
			});
		}
		scopeCode(e = this._values, t, n) {
			return this._reduceValues(e, (e) => {
				if (e.value === void 0) throw Error(`CodeGen: name "${e}" has no value`);
				return e.value.code;
			}, t, n);
		}
		_reduceValues(i, a, o = {}, s) {
			let c = t.nil;
			for (let l in i) {
				let u = i[l];
				if (!u) continue;
				let d = o[l] = o[l] || /* @__PURE__ */ new Map();
				u.forEach((i) => {
					if (d.has(i)) return;
					d.set(i, r.Started);
					let o = a(i);
					if (o) {
						let n = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
						c = (0, t._)`${c}${n} ${i} = ${o};${this.opts._n}`;
					} else if (o = s?.(i)) c = (0, t._)`${c}${o}${this.opts._n}`;
					else throw new n(i);
					d.set(i, r.Completed);
				});
			}
			return c;
		}
	};
})), s = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
	var t = a(), n = o(), r = a();
	Object.defineProperty(e, "_", {
		enumerable: !0,
		get: function() {
			return r._;
		}
	}), Object.defineProperty(e, "str", {
		enumerable: !0,
		get: function() {
			return r.str;
		}
	}), Object.defineProperty(e, "strConcat", {
		enumerable: !0,
		get: function() {
			return r.strConcat;
		}
	}), Object.defineProperty(e, "nil", {
		enumerable: !0,
		get: function() {
			return r.nil;
		}
	}), Object.defineProperty(e, "getProperty", {
		enumerable: !0,
		get: function() {
			return r.getProperty;
		}
	}), Object.defineProperty(e, "stringify", {
		enumerable: !0,
		get: function() {
			return r.stringify;
		}
	}), Object.defineProperty(e, "regexpCode", {
		enumerable: !0,
		get: function() {
			return r.regexpCode;
		}
	}), Object.defineProperty(e, "Name", {
		enumerable: !0,
		get: function() {
			return r.Name;
		}
	});
	var i = o();
	Object.defineProperty(e, "Scope", {
		enumerable: !0,
		get: function() {
			return i.Scope;
		}
	}), Object.defineProperty(e, "ValueScope", {
		enumerable: !0,
		get: function() {
			return i.ValueScope;
		}
	}), Object.defineProperty(e, "ValueScopeName", {
		enumerable: !0,
		get: function() {
			return i.ValueScopeName;
		}
	}), Object.defineProperty(e, "varKinds", {
		enumerable: !0,
		get: function() {
			return i.varKinds;
		}
	}), e.operators = {
		GT: new t._Code(">"),
		GTE: new t._Code(">="),
		LT: new t._Code("<"),
		LTE: new t._Code("<="),
		EQ: new t._Code("==="),
		NEQ: new t._Code("!=="),
		NOT: new t._Code("!"),
		OR: new t._Code("||"),
		AND: new t._Code("&&"),
		ADD: new t._Code("+")
	};
	var s = class {
		optimizeNodes() {
			return this;
		}
		optimizeNames(e, t) {
			return this;
		}
	}, c = class extends s {
		constructor(e, t, n) {
			super(), this.varKind = e, this.name = t, this.rhs = n;
		}
		render({ es5: e, _n: t }) {
			let r = e ? n.varKinds.var : this.varKind, i = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
			return `${r} ${this.name}${i};` + t;
		}
		optimizeNames(e, t) {
			if (e[this.name.str]) return this.rhs &&= D(this.rhs, e, t), this;
		}
		get names() {
			return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
		}
	}, l = class extends s {
		constructor(e, t, n) {
			super(), this.lhs = e, this.rhs = t, this.sideEffects = n;
		}
		render({ _n: e }) {
			return `${this.lhs} = ${this.rhs};` + e;
		}
		optimizeNames(e, n) {
			if (!(this.lhs instanceof t.Name && !e[this.lhs.str] && !this.sideEffects)) return this.rhs = D(this.rhs, e, n), this;
		}
		get names() {
			return E(this.lhs instanceof t.Name ? {} : { ...this.lhs.names }, this.rhs);
		}
	}, u = class extends l {
		constructor(e, t, n, r) {
			super(e, n, r), this.op = t;
		}
		render({ _n: e }) {
			return `${this.lhs} ${this.op}= ${this.rhs};` + e;
		}
	}, d = class extends s {
		constructor(e) {
			super(), this.label = e, this.names = {};
		}
		render({ _n: e }) {
			return `${this.label}:` + e;
		}
	}, f = class extends s {
		constructor(e) {
			super(), this.label = e, this.names = {};
		}
		render({ _n: e }) {
			return `break${this.label ? ` ${this.label}` : ""};` + e;
		}
	}, p = class extends s {
		constructor(e) {
			super(), this.error = e;
		}
		render({ _n: e }) {
			return `throw ${this.error};` + e;
		}
		get names() {
			return this.error.names;
		}
	}, m = class extends s {
		constructor(e) {
			super(), this.code = e;
		}
		render({ _n: e }) {
			return `${this.code};` + e;
		}
		optimizeNodes() {
			return `${this.code}` ? this : void 0;
		}
		optimizeNames(e, t) {
			return this.code = D(this.code, e, t), this;
		}
		get names() {
			return this.code instanceof t._CodeOrName ? this.code.names : {};
		}
	}, h = class extends s {
		constructor(e = []) {
			super(), this.nodes = e;
		}
		render(e) {
			return this.nodes.reduce((t, n) => t + n.render(e), "");
		}
		optimizeNodes() {
			let { nodes: e } = this, t = e.length;
			for (; t--;) {
				let n = e[t].optimizeNodes();
				Array.isArray(n) ? e.splice(t, 1, ...n) : n ? e[t] = n : e.splice(t, 1);
			}
			return e.length > 0 ? this : void 0;
		}
		optimizeNames(e, t) {
			let { nodes: n } = this, r = n.length;
			for (; r--;) {
				let i = n[r];
				i.optimizeNames(e, t) || (ie(e, i.names), n.splice(r, 1));
			}
			return n.length > 0 ? this : void 0;
		}
		get names() {
			return this.nodes.reduce((e, t) => T(e, t.names), {});
		}
	}, g = class extends h {
		render(e) {
			return "{" + e._n + super.render(e) + "}" + e._n;
		}
	}, _ = class extends h {}, v = class extends g {};
	v.kind = "else";
	var y = class e extends g {
		constructor(e, t) {
			super(t), this.condition = e;
		}
		render(e) {
			let t = `if(${this.condition})` + super.render(e);
			return this.else && (t += "else " + this.else.render(e)), t;
		}
		optimizeNodes() {
			super.optimizeNodes();
			let t = this.condition;
			if (t === !0) return this.nodes;
			let n = this.else;
			if (n) {
				let e = n.optimizeNodes();
				n = this.else = Array.isArray(e) ? new v(e) : e;
			}
			if (n) return t === !1 ? n instanceof e ? n : n.nodes : this.nodes.length ? this : new e(ae(t), n instanceof e ? [n] : n.nodes);
			if (!(t === !1 || !this.nodes.length)) return this;
		}
		optimizeNames(e, t) {
			if (this.else = this.else?.optimizeNames(e, t), super.optimizeNames(e, t) || this.else) return this.condition = D(this.condition, e, t), this;
		}
		get names() {
			let e = super.names;
			return E(e, this.condition), this.else && T(e, this.else.names), e;
		}
	};
	y.kind = "if";
	var b = class extends g {};
	b.kind = "for";
	var x = class extends b {
		constructor(e) {
			super(), this.iteration = e;
		}
		render(e) {
			return `for(${this.iteration})` + super.render(e);
		}
		optimizeNames(e, t) {
			if (super.optimizeNames(e, t)) return this.iteration = D(this.iteration, e, t), this;
		}
		get names() {
			return T(super.names, this.iteration.names);
		}
	}, S = class extends b {
		constructor(e, t, n, r) {
			super(), this.varKind = e, this.name = t, this.from = n, this.to = r;
		}
		render(e) {
			let t = e.es5 ? n.varKinds.var : this.varKind, { name: r, from: i, to: a } = this;
			return `for(${t} ${r}=${i}; ${r}<${a}; ${r}++)` + super.render(e);
		}
		get names() {
			return E(E(super.names, this.from), this.to);
		}
	}, C = class extends b {
		constructor(e, t, n, r) {
			super(), this.loop = e, this.varKind = t, this.name = n, this.iterable = r;
		}
		render(e) {
			return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(e);
		}
		optimizeNames(e, t) {
			if (super.optimizeNames(e, t)) return this.iterable = D(this.iterable, e, t), this;
		}
		get names() {
			return T(super.names, this.iterable.names);
		}
	}, ee = class extends g {
		constructor(e, t, n) {
			super(), this.name = e, this.args = t, this.async = n;
		}
		render(e) {
			return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(e);
		}
	};
	ee.kind = "func";
	var w = class extends h {
		render(e) {
			return "return " + super.render(e);
		}
	};
	w.kind = "return";
	var te = class extends g {
		render(e) {
			let t = "try" + super.render(e);
			return this.catch && (t += this.catch.render(e)), this.finally && (t += this.finally.render(e)), t;
		}
		optimizeNodes() {
			var e, t;
			return super.optimizeNodes(), (e = this.catch) == null || e.optimizeNodes(), (t = this.finally) == null || t.optimizeNodes(), this;
		}
		optimizeNames(e, t) {
			var n, r;
			return super.optimizeNames(e, t), (n = this.catch) == null || n.optimizeNames(e, t), (r = this.finally) == null || r.optimizeNames(e, t), this;
		}
		get names() {
			let e = super.names;
			return this.catch && T(e, this.catch.names), this.finally && T(e, this.finally.names), e;
		}
	}, ne = class extends g {
		constructor(e) {
			super(), this.error = e;
		}
		render(e) {
			return `catch(${this.error})` + super.render(e);
		}
	};
	ne.kind = "catch";
	var re = class extends g {
		render(e) {
			return "finally" + super.render(e);
		}
	};
	re.kind = "finally", e.CodeGen = class {
		constructor(e, t = {}) {
			this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = {
				...t,
				_n: t.lines ? "\n" : ""
			}, this._extScope = e, this._scope = new n.Scope({ parent: e }), this._nodes = [new _()];
		}
		toString() {
			return this._root.render(this.opts);
		}
		name(e) {
			return this._scope.name(e);
		}
		scopeName(e) {
			return this._extScope.name(e);
		}
		scopeValue(e, t) {
			let n = this._extScope.value(e, t);
			return (this._values[n.prefix] || (this._values[n.prefix] = /* @__PURE__ */ new Set())).add(n), n;
		}
		getScopeValue(e, t) {
			return this._extScope.getValue(e, t);
		}
		scopeRefs(e) {
			return this._extScope.scopeRefs(e, this._values);
		}
		scopeCode() {
			return this._extScope.scopeCode(this._values);
		}
		_def(e, t, n, r) {
			let i = this._scope.toName(t);
			return n !== void 0 && r && (this._constants[i.str] = n), this._leafNode(new c(e, i, n)), i;
		}
		const(e, t, r) {
			return this._def(n.varKinds.const, e, t, r);
		}
		let(e, t, r) {
			return this._def(n.varKinds.let, e, t, r);
		}
		var(e, t, r) {
			return this._def(n.varKinds.var, e, t, r);
		}
		assign(e, t, n) {
			return this._leafNode(new l(e, t, n));
		}
		add(t, n) {
			return this._leafNode(new u(t, e.operators.ADD, n));
		}
		code(e) {
			return typeof e == "function" ? e() : e !== t.nil && this._leafNode(new m(e)), this;
		}
		object(...e) {
			let n = ["{"];
			for (let [r, i] of e) n.length > 1 && n.push(","), n.push(r), (r !== i || this.opts.es5) && (n.push(":"), (0, t.addCodeArg)(n, i));
			return n.push("}"), new t._Code(n);
		}
		if(e, t, n) {
			if (this._blockNode(new y(e)), t && n) this.code(t).else().code(n).endIf();
			else if (t) this.code(t).endIf();
			else if (n) throw Error("CodeGen: \"else\" body without \"then\" body");
			return this;
		}
		elseIf(e) {
			return this._elseNode(new y(e));
		}
		else() {
			return this._elseNode(new v());
		}
		endIf() {
			return this._endBlockNode(y, v);
		}
		_for(e, t) {
			return this._blockNode(e), t && this.code(t).endFor(), this;
		}
		for(e, t) {
			return this._for(new x(e), t);
		}
		forRange(e, t, r, i, a = this.opts.es5 ? n.varKinds.var : n.varKinds.let) {
			let o = this._scope.toName(e);
			return this._for(new S(a, o, t, r), () => i(o));
		}
		forOf(e, r, i, a = n.varKinds.const) {
			let o = this._scope.toName(e);
			if (this.opts.es5) {
				let e = r instanceof t.Name ? r : this.var("_arr", r);
				return this.forRange("_i", 0, (0, t._)`${e}.length`, (n) => {
					this.var(o, (0, t._)`${e}[${n}]`), i(o);
				});
			}
			return this._for(new C("of", a, o, r), () => i(o));
		}
		forIn(e, r, i, a = this.opts.es5 ? n.varKinds.var : n.varKinds.const) {
			if (this.opts.ownProperties) return this.forOf(e, (0, t._)`Object.keys(${r})`, i);
			let o = this._scope.toName(e);
			return this._for(new C("in", a, o, r), () => i(o));
		}
		endFor() {
			return this._endBlockNode(b);
		}
		label(e) {
			return this._leafNode(new d(e));
		}
		break(e) {
			return this._leafNode(new f(e));
		}
		return(e) {
			let t = new w();
			if (this._blockNode(t), this.code(e), t.nodes.length !== 1) throw Error("CodeGen: \"return\" should have one node");
			return this._endBlockNode(w);
		}
		try(e, t, n) {
			if (!t && !n) throw Error("CodeGen: \"try\" without \"catch\" and \"finally\"");
			let r = new te();
			if (this._blockNode(r), this.code(e), t) {
				let e = this.name("e");
				this._currNode = r.catch = new ne(e), t(e);
			}
			return n && (this._currNode = r.finally = new re(), this.code(n)), this._endBlockNode(ne, re);
		}
		throw(e) {
			return this._leafNode(new p(e));
		}
		block(e, t) {
			return this._blockStarts.push(this._nodes.length), e && this.code(e).endBlock(t), this;
		}
		endBlock(e) {
			let t = this._blockStarts.pop();
			if (t === void 0) throw Error("CodeGen: not in self-balancing block");
			let n = this._nodes.length - t;
			if (n < 0 || e !== void 0 && n !== e) throw Error(`CodeGen: wrong number of nodes: ${n} vs ${e} expected`);
			return this._nodes.length = t, this;
		}
		func(e, n = t.nil, r, i) {
			return this._blockNode(new ee(e, n, r)), i && this.code(i).endFunc(), this;
		}
		endFunc() {
			return this._endBlockNode(ee);
		}
		optimize(e = 1) {
			for (; e-- > 0;) this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
		}
		_leafNode(e) {
			return this._currNode.nodes.push(e), this;
		}
		_blockNode(e) {
			this._currNode.nodes.push(e), this._nodes.push(e);
		}
		_endBlockNode(e, t) {
			let n = this._currNode;
			if (n instanceof e || t && n instanceof t) return this._nodes.pop(), this;
			throw Error(`CodeGen: not in block "${t ? `${e.kind}/${t.kind}` : e.kind}"`);
		}
		_elseNode(e) {
			let t = this._currNode;
			if (!(t instanceof y)) throw Error("CodeGen: \"else\" without \"if\"");
			return this._currNode = t.else = e, this;
		}
		get _root() {
			return this._nodes[0];
		}
		get _currNode() {
			let e = this._nodes;
			return e[e.length - 1];
		}
		set _currNode(e) {
			let t = this._nodes;
			t[t.length - 1] = e;
		}
	};
	function T(e, t) {
		for (let n in t) e[n] = (e[n] || 0) + (t[n] || 0);
		return e;
	}
	function E(e, n) {
		return n instanceof t._CodeOrName ? T(e, n.names) : e;
	}
	function D(e, n, r) {
		if (e instanceof t.Name) return i(e);
		if (!a(e)) return e;
		return new t._Code(e._items.reduce((e, n) => (n instanceof t.Name && (n = i(n)), n instanceof t._Code ? e.push(...n._items) : e.push(n), e), []));
		function i(e) {
			let t = r[e.str];
			return t === void 0 || n[e.str] !== 1 ? e : (delete n[e.str], t);
		}
		function a(e) {
			return e instanceof t._Code && e._items.some((e) => e instanceof t.Name && n[e.str] === 1 && r[e.str] !== void 0);
		}
	}
	function ie(e, t) {
		for (let n in t) e[n] = (e[n] || 0) - (t[n] || 0);
	}
	function ae(e) {
		return typeof e == "boolean" || typeof e == "number" || e === null ? !e : (0, t._)`!${de(e)}`;
	}
	e.not = ae;
	var oe = ue(e.operators.AND);
	function se(...e) {
		return e.reduce(oe);
	}
	e.and = se;
	var ce = ue(e.operators.OR);
	function le(...e) {
		return e.reduce(ce);
	}
	e.or = le;
	function ue(e) {
		return (n, r) => n === t.nil ? r : r === t.nil ? n : (0, t._)`${de(n)} ${e} ${de(r)}`;
	}
	function de(e) {
		return e instanceof t.Name ? e : (0, t._)`(${e})`;
	}
})), c = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.checkStrictMode = e.getErrorPath = e.Type = e.useFunc = e.setEvaluated = e.evaluatedPropsToName = e.mergeEvaluated = e.eachItem = e.unescapeJsonPointer = e.escapeJsonPointer = e.escapeFragment = e.unescapeFragment = e.schemaRefOrVal = e.schemaHasRulesButRef = e.schemaHasRules = e.checkUnknownRules = e.alwaysValidSchema = e.toHash = void 0;
	var t = s(), n = a();
	function r(e) {
		let t = {};
		for (let n of e) t[n] = !0;
		return t;
	}
	e.toHash = r;
	function i(e, t) {
		return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (o(e, t), !c(t, e.self.RULES.all));
	}
	e.alwaysValidSchema = i;
	function o(e, t = e.schema) {
		let { opts: n, self: r } = e;
		if (!n.strictSchema || typeof t == "boolean") return;
		let i = r.RULES.keywords;
		for (let n in t) i[n] || C(e, `unknown keyword: "${n}"`);
	}
	e.checkUnknownRules = o;
	function c(e, t) {
		if (typeof e == "boolean") return !e;
		for (let n in e) if (t[n]) return !0;
		return !1;
	}
	e.schemaHasRules = c;
	function l(e, t) {
		if (typeof e == "boolean") return !e;
		for (let n in e) if (n !== "$ref" && t.all[n]) return !0;
		return !1;
	}
	e.schemaHasRulesButRef = l;
	function u({ topSchemaRef: e, schemaPath: n }, r, i, a) {
		if (!a) {
			if (typeof r == "number" || typeof r == "boolean") return r;
			if (typeof r == "string") return (0, t._)`${r}`;
		}
		return (0, t._)`${e}${n}${(0, t.getProperty)(i)}`;
	}
	e.schemaRefOrVal = u;
	function d(e) {
		return m(decodeURIComponent(e));
	}
	e.unescapeFragment = d;
	function f(e) {
		return encodeURIComponent(p(e));
	}
	e.escapeFragment = f;
	function p(e) {
		return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
	}
	e.escapeJsonPointer = p;
	function m(e) {
		return e.replace(/~1/g, "/").replace(/~0/g, "~");
	}
	e.unescapeJsonPointer = m;
	function h(e, t) {
		if (Array.isArray(e)) for (let n of e) t(n);
		else t(e);
	}
	e.eachItem = h;
	function g({ mergeNames: e, mergeToName: n, mergeValues: r, resultToName: i }) {
		return (a, o, s, c) => {
			let l = s === void 0 ? o : s instanceof t.Name ? (o instanceof t.Name ? e(a, o, s) : n(a, o, s), s) : o instanceof t.Name ? (n(a, s, o), o) : r(o, s);
			return c === t.Name && !(l instanceof t.Name) ? i(a, l) : l;
		};
	}
	e.mergeEvaluated = {
		props: g({
			mergeNames: (e, n, r) => e.if((0, t._)`${r} !== true && ${n} !== undefined`, () => {
				e.if((0, t._)`${n} === true`, () => e.assign(r, !0), () => e.assign(r, (0, t._)`${r} || {}`).code((0, t._)`Object.assign(${r}, ${n})`));
			}),
			mergeToName: (e, n, r) => e.if((0, t._)`${r} !== true`, () => {
				n === !0 ? e.assign(r, !0) : (e.assign(r, (0, t._)`${r} || {}`), v(e, r, n));
			}),
			mergeValues: (e, t) => e === !0 ? !0 : {
				...e,
				...t
			},
			resultToName: _
		}),
		items: g({
			mergeNames: (e, n, r) => e.if((0, t._)`${r} !== true && ${n} !== undefined`, () => e.assign(r, (0, t._)`${n} === true ? true : ${r} > ${n} ? ${r} : ${n}`)),
			mergeToName: (e, n, r) => e.if((0, t._)`${r} !== true`, () => e.assign(r, n === !0 ? !0 : (0, t._)`${r} > ${n} ? ${r} : ${n}`)),
			mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
			resultToName: (e, t) => e.var("items", t)
		})
	};
	function _(e, n) {
		if (n === !0) return e.var("props", !0);
		let r = e.var("props", (0, t._)`{}`);
		return n !== void 0 && v(e, r, n), r;
	}
	e.evaluatedPropsToName = _;
	function v(e, n, r) {
		Object.keys(r).forEach((r) => e.assign((0, t._)`${n}${(0, t.getProperty)(r)}`, !0));
	}
	e.setEvaluated = v;
	var y = {};
	function b(e, t) {
		return e.scopeValue("func", {
			ref: t,
			code: y[t.code] || (y[t.code] = new n._Code(t.code))
		});
	}
	e.useFunc = b;
	var x;
	(function(e) {
		e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
	})(x || (e.Type = x = {}));
	function S(e, n, r) {
		if (e instanceof t.Name) {
			let i = n === x.Num;
			return r ? i ? (0, t._)`"[" + ${e} + "]"` : (0, t._)`"['" + ${e} + "']"` : i ? (0, t._)`"/" + ${e}` : (0, t._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
		}
		return r ? (0, t.getProperty)(e).toString() : "/" + p(e);
	}
	e.getErrorPath = S;
	function C(e, t, n = e.opts.strictSchema) {
		if (n) {
			if (t = `strict mode: ${t}`, n === !0) throw Error(t);
			e.self.logger.warn(t);
		}
	}
	e.checkStrictMode = C;
})), l = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = s();
	e.default = {
		data: new t.Name("data"),
		valCxt: new t.Name("valCxt"),
		instancePath: new t.Name("instancePath"),
		parentData: new t.Name("parentData"),
		parentDataProperty: new t.Name("parentDataProperty"),
		rootData: new t.Name("rootData"),
		dynamicAnchors: new t.Name("dynamicAnchors"),
		vErrors: new t.Name("vErrors"),
		errors: new t.Name("errors"),
		this: new t.Name("this"),
		self: new t.Name("self"),
		scope: new t.Name("scope"),
		json: new t.Name("json"),
		jsonPos: new t.Name("jsonPos"),
		jsonLen: new t.Name("jsonLen"),
		jsonPart: new t.Name("jsonPart")
	};
})), u = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
	var t = s(), n = c(), r = l();
	e.keywordError = { message: ({ keyword: e }) => (0, t.str)`must pass "${e}" keyword validation` }, e.keyword$DataError = { message: ({ keyword: e, schemaType: n }) => n ? (0, t.str)`"${e}" keyword must be ${n} ($data)` : (0, t.str)`"${e}" keyword is invalid ($data)` };
	function i(n, r = e.keywordError, i, a) {
		let { it: o } = n, { gen: s, compositeRule: c, allErrors: l } = o, u = m(n, r, i);
		a ?? (c || l) ? d(s, u) : f(o, (0, t._)`[${u}]`);
	}
	e.reportError = i;
	function a(t, n = e.keywordError, i) {
		let { it: a } = t, { gen: o, compositeRule: s, allErrors: c } = a;
		d(o, m(t, n, i)), s || c || f(a, r.default.vErrors);
	}
	e.reportExtraError = a;
	function o(e, n) {
		e.assign(r.default.errors, n), e.if((0, t._)`${r.default.vErrors} !== null`, () => e.if(n, () => e.assign((0, t._)`${r.default.vErrors}.length`, n), () => e.assign(r.default.vErrors, null)));
	}
	e.resetErrorsCount = o;
	function u({ gen: e, keyword: n, schemaValue: i, data: a, errsCount: o, it: s }) {
		/* istanbul ignore if */
		if (o === void 0) throw Error("ajv implementation error");
		let c = e.name("err");
		e.forRange("i", o, r.default.errors, (o) => {
			e.const(c, (0, t._)`${r.default.vErrors}[${o}]`), e.if((0, t._)`${c}.instancePath === undefined`, () => e.assign((0, t._)`${c}.instancePath`, (0, t.strConcat)(r.default.instancePath, s.errorPath))), e.assign((0, t._)`${c}.schemaPath`, (0, t.str)`${s.errSchemaPath}/${n}`), s.opts.verbose && (e.assign((0, t._)`${c}.schema`, i), e.assign((0, t._)`${c}.data`, a));
		});
	}
	e.extendErrors = u;
	function d(e, n) {
		let i = e.const("err", n);
		e.if((0, t._)`${r.default.vErrors} === null`, () => e.assign(r.default.vErrors, (0, t._)`[${i}]`), (0, t._)`${r.default.vErrors}.push(${i})`), e.code((0, t._)`${r.default.errors}++`);
	}
	function f(e, n) {
		let { gen: r, validateName: i, schemaEnv: a } = e;
		a.$async ? r.throw((0, t._)`new ${e.ValidationError}(${n})`) : (r.assign((0, t._)`${i}.errors`, n), r.return(!1));
	}
	var p = {
		keyword: new t.Name("keyword"),
		schemaPath: new t.Name("schemaPath"),
		params: new t.Name("params"),
		propertyName: new t.Name("propertyName"),
		message: new t.Name("message"),
		schema: new t.Name("schema"),
		parentSchema: new t.Name("parentSchema")
	};
	function m(e, n, r) {
		let { createErrors: i } = e.it;
		return i === !1 ? (0, t._)`{}` : h(e, n, r);
	}
	function h(e, t, n = {}) {
		let { gen: r, it: i } = e, a = [g(i, n), _(e, n)];
		return v(e, t, a), r.object(...a);
	}
	function g({ errorPath: e }, { instancePath: i }) {
		let a = i ? (0, t.str)`${e}${(0, n.getErrorPath)(i, n.Type.Str)}` : e;
		return [r.default.instancePath, (0, t.strConcat)(r.default.instancePath, a)];
	}
	function _({ keyword: e, it: { errSchemaPath: r } }, { schemaPath: i, parentSchema: a }) {
		let o = a ? r : (0, t.str)`${r}/${e}`;
		return i && (o = (0, t.str)`${o}${(0, n.getErrorPath)(i, n.Type.Str)}`), [p.schemaPath, o];
	}
	function v(e, { params: n, message: i }, a) {
		let { keyword: o, data: s, schemaValue: c, it: l } = e, { opts: u, propertyName: d, topSchemaRef: f, schemaPath: m } = l;
		a.push([p.keyword, o], [p.params, typeof n == "function" ? n(e) : n || (0, t._)`{}`]), u.messages && a.push([p.message, typeof i == "function" ? i(e) : i]), u.verbose && a.push([p.schema, c], [p.parentSchema, (0, t._)`${f}${m}`], [r.default.data, s]), d && a.push([p.propertyName, d]);
	}
})), d = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.boolOrEmptySchema = e.topBoolOrEmptySchema = void 0;
	var t = u(), n = s(), r = l(), i = { message: "boolean schema is false" };
	function a(e) {
		let { gen: t, schema: i, validateName: a } = e;
		i === !1 ? c(e, !1) : typeof i == "object" && i.$async === !0 ? t.return(r.default.data) : (t.assign((0, n._)`${a}.errors`, null), t.return(!0));
	}
	e.topBoolOrEmptySchema = a;
	function o(e, t) {
		let { gen: n, schema: r } = e;
		r === !1 ? (n.var(t, !1), c(e)) : n.var(t, !0);
	}
	e.boolOrEmptySchema = o;
	function c(e, n) {
		let { gen: r, data: a } = e, o = {
			gen: r,
			keyword: "false schema",
			data: a,
			schema: !1,
			schemaCode: !1,
			schemaValue: !1,
			params: {},
			it: e
		};
		(0, t.reportError)(o, i, void 0, n);
	}
})), f = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.getRules = e.isJSONType = void 0;
	var t = /* @__PURE__ */ new Set([
		"string",
		"number",
		"integer",
		"boolean",
		"null",
		"object",
		"array"
	]);
	function n(e) {
		return typeof e == "string" && t.has(e);
	}
	e.isJSONType = n;
	function r() {
		let e = {
			number: {
				type: "number",
				rules: []
			},
			string: {
				type: "string",
				rules: []
			},
			array: {
				type: "array",
				rules: []
			},
			object: {
				type: "object",
				rules: []
			}
		};
		return {
			types: {
				...e,
				integer: !0,
				boolean: !0,
				null: !0
			},
			rules: [
				{ rules: [] },
				e.number,
				e.string,
				e.array,
				e.object
			],
			post: { rules: [] },
			all: {},
			keywords: {}
		};
	}
	e.getRules = r;
})), p = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.shouldUseRule = e.shouldUseGroup = e.schemaHasRulesForType = void 0;
	function t({ schema: e, self: t }, r) {
		let i = t.RULES.types[r];
		return i && i !== !0 && n(e, i);
	}
	e.schemaHasRulesForType = t;
	function n(e, t) {
		return t.rules.some((t) => r(e, t));
	}
	e.shouldUseGroup = n;
	function r(e, t) {
		return e[t.keyword] !== void 0 || t.definition.implements?.some((t) => e[t] !== void 0);
	}
	e.shouldUseRule = r;
})), m = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.reportTypeError = e.checkDataTypes = e.checkDataType = e.coerceAndCheckDataType = e.getJSONTypes = e.getSchemaTypes = e.DataType = void 0;
	var t = f(), n = p(), r = u(), i = s(), a = c(), o;
	(function(e) {
		e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
	})(o || (e.DataType = o = {}));
	function l(e) {
		let t = d(e.type);
		if (t.includes("null")) {
			if (e.nullable === !1) throw Error("type: null contradicts nullable: false");
		} else {
			if (!t.length && e.nullable !== void 0) throw Error("\"nullable\" cannot be used without \"type\"");
			e.nullable === !0 && t.push("null");
		}
		return t;
	}
	e.getSchemaTypes = l;
	function d(e) {
		let n = Array.isArray(e) ? e : e ? [e] : [];
		if (n.every(t.isJSONType)) return n;
		throw Error("type must be JSONType or JSONType[]: " + n.join(","));
	}
	e.getJSONTypes = d;
	function m(e, t) {
		let { gen: r, data: i, opts: a } = e, s = g(t, a.coerceTypes), c = t.length > 0 && !(s.length === 0 && t.length === 1 && (0, n.schemaHasRulesForType)(e, t[0]));
		if (c) {
			let n = b(t, i, a.strictNumbers, o.Wrong);
			r.if(n, () => {
				s.length ? _(e, t, s) : S(e);
			});
		}
		return c;
	}
	e.coerceAndCheckDataType = m;
	var h = /* @__PURE__ */ new Set([
		"string",
		"number",
		"integer",
		"boolean",
		"null"
	]);
	function g(e, t) {
		return t ? e.filter((e) => h.has(e) || t === "array" && e === "array") : [];
	}
	function _(e, t, n) {
		let { gen: r, data: a, opts: o } = e, s = r.let("dataType", (0, i._)`typeof ${a}`), c = r.let("coerced", (0, i._)`undefined`);
		o.coerceTypes === "array" && r.if((0, i._)`${s} == 'object' && Array.isArray(${a}) && ${a}.length == 1`, () => r.assign(a, (0, i._)`${a}[0]`).assign(s, (0, i._)`typeof ${a}`).if(b(t, a, o.strictNumbers), () => r.assign(c, a))), r.if((0, i._)`${c} !== undefined`);
		for (let e of n) (h.has(e) || e === "array" && o.coerceTypes === "array") && l(e);
		r.else(), S(e), r.endIf(), r.if((0, i._)`${c} !== undefined`, () => {
			r.assign(a, c), v(e, c);
		});
		function l(e) {
			switch (e) {
				case "string":
					r.elseIf((0, i._)`${s} == "number" || ${s} == "boolean"`).assign(c, (0, i._)`"" + ${a}`).elseIf((0, i._)`${a} === null`).assign(c, (0, i._)`""`);
					return;
				case "number":
					r.elseIf((0, i._)`${s} == "boolean" || ${a} === null
              || (${s} == "string" && ${a} && ${a} == +${a})`).assign(c, (0, i._)`+${a}`);
					return;
				case "integer":
					r.elseIf((0, i._)`${s} === "boolean" || ${a} === null
              || (${s} === "string" && ${a} && ${a} == +${a} && !(${a} % 1))`).assign(c, (0, i._)`+${a}`);
					return;
				case "boolean":
					r.elseIf((0, i._)`${a} === "false" || ${a} === 0 || ${a} === null`).assign(c, !1).elseIf((0, i._)`${a} === "true" || ${a} === 1`).assign(c, !0);
					return;
				case "null":
					r.elseIf((0, i._)`${a} === "" || ${a} === 0 || ${a} === false`), r.assign(c, null);
					return;
				case "array": r.elseIf((0, i._)`${s} === "string" || ${s} === "number"
              || ${s} === "boolean" || ${a} === null`).assign(c, (0, i._)`[${a}]`);
			}
		}
	}
	function v({ gen: e, parentData: t, parentDataProperty: n }, r) {
		e.if((0, i._)`${t} !== undefined`, () => e.assign((0, i._)`${t}[${n}]`, r));
	}
	function y(e, t, n, r = o.Correct) {
		let a = r === o.Correct ? i.operators.EQ : i.operators.NEQ, s;
		switch (e) {
			case "null": return (0, i._)`${t} ${a} null`;
			case "array":
				s = (0, i._)`Array.isArray(${t})`;
				break;
			case "object":
				s = (0, i._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
				break;
			case "integer":
				s = c((0, i._)`!(${t} % 1) && !isNaN(${t})`);
				break;
			case "number":
				s = c();
				break;
			default: return (0, i._)`typeof ${t} ${a} ${e}`;
		}
		return r === o.Correct ? s : (0, i.not)(s);
		function c(e = i.nil) {
			return (0, i.and)((0, i._)`typeof ${t} == "number"`, e, n ? (0, i._)`isFinite(${t})` : i.nil);
		}
	}
	e.checkDataType = y;
	function b(e, t, n, r) {
		if (e.length === 1) return y(e[0], t, n, r);
		let o, s = (0, a.toHash)(e);
		if (s.array && s.object) {
			let e = (0, i._)`typeof ${t} != "object"`;
			o = s.null ? e : (0, i._)`!${t} || ${e}`, delete s.null, delete s.array, delete s.object;
		} else o = i.nil;
		s.number && delete s.integer;
		for (let e in s) o = (0, i.and)(o, y(e, t, n, r));
		return o;
	}
	e.checkDataTypes = b;
	var x = {
		message: ({ schema: e }) => `must be ${e}`,
		params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, i._)`{type: ${e}}` : (0, i._)`{type: ${t}}`
	};
	function S(e) {
		let t = C(e);
		(0, r.reportError)(t, x);
	}
	e.reportTypeError = S;
	function C(e) {
		let { gen: t, data: n, schema: r } = e, i = (0, a.schemaRefOrVal)(e, r, "type");
		return {
			gen: t,
			keyword: "type",
			data: n,
			schema: r.type,
			schemaCode: i,
			schemaValue: i,
			parentSchema: r,
			params: {},
			it: e
		};
	}
})), h = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.assignDefaults = void 0;
	var t = s(), n = c();
	function r(e, t) {
		let { properties: n, items: r } = e.schema;
		if (t === "object" && n) for (let t in n) i(e, t, n[t].default);
		else t === "array" && Array.isArray(r) && r.forEach((t, n) => i(e, n, t.default));
	}
	e.assignDefaults = r;
	function i(e, r, i) {
		let { gen: a, compositeRule: o, data: s, opts: c } = e;
		if (i === void 0) return;
		let l = (0, t._)`${s}${(0, t.getProperty)(r)}`;
		if (o) {
			(0, n.checkStrictMode)(e, `default is ignored for: ${l}`);
			return;
		}
		let u = (0, t._)`${l} === undefined`;
		c.useDefaults === "empty" && (u = (0, t._)`${u} || ${l} === null || ${l} === ""`), a.if(u, (0, t._)`${l} = ${(0, t.stringify)(i)}`);
	}
})), g = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.validateUnion = e.validateArray = e.usePattern = e.callValidateCode = e.schemaProperties = e.allSchemaProperties = e.noPropertyInData = e.propertyInData = e.isOwnProperty = e.hasPropFunc = e.reportMissingProp = e.checkMissingProp = e.checkReportMissingProp = void 0;
	var t = s(), n = c(), r = l(), i = c();
	function a(e, n) {
		let { gen: r, data: i, it: a } = e;
		r.if(m(r, i, n, a.opts.ownProperties), () => {
			e.setParams({ missingProperty: (0, t._)`${n}` }, !0), e.error();
		});
	}
	e.checkReportMissingProp = a;
	function o({ gen: e, data: n, it: { opts: r } }, i, a) {
		return (0, t.or)(...i.map((i) => (0, t.and)(m(e, n, i, r.ownProperties), (0, t._)`${a} = ${i}`)));
	}
	e.checkMissingProp = o;
	function u(e, t) {
		e.setParams({ missingProperty: t }, !0), e.error();
	}
	e.reportMissingProp = u;
	function d(e) {
		return e.scopeValue("func", {
			ref: Object.prototype.hasOwnProperty,
			code: (0, t._)`Object.prototype.hasOwnProperty`
		});
	}
	e.hasPropFunc = d;
	function f(e, n, r) {
		return (0, t._)`${d(e)}.call(${n}, ${r})`;
	}
	e.isOwnProperty = f;
	function p(e, n, r, i) {
		let a = (0, t._)`${n}${(0, t.getProperty)(r)} !== undefined`;
		return i ? (0, t._)`${a} && ${f(e, n, r)}` : a;
	}
	e.propertyInData = p;
	function m(e, n, r, i) {
		let a = (0, t._)`${n}${(0, t.getProperty)(r)} === undefined`;
		return i ? (0, t.or)(a, (0, t.not)(f(e, n, r))) : a;
	}
	e.noPropertyInData = m;
	function h(e) {
		return e ? Object.keys(e).filter((e) => e !== "__proto__") : [];
	}
	e.allSchemaProperties = h;
	function g(e, t) {
		return h(t).filter((r) => !(0, n.alwaysValidSchema)(e, t[r]));
	}
	e.schemaProperties = g;
	function _({ schemaCode: e, data: n, it: { gen: i, topSchemaRef: a, schemaPath: o, errorPath: s }, it: c }, l, u, d) {
		let f = d ? (0, t._)`${e}, ${n}, ${a}${o}` : n, p = [
			[r.default.instancePath, (0, t.strConcat)(r.default.instancePath, s)],
			[r.default.parentData, c.parentData],
			[r.default.parentDataProperty, c.parentDataProperty],
			[r.default.rootData, r.default.rootData]
		];
		c.opts.dynamicRef && p.push([r.default.dynamicAnchors, r.default.dynamicAnchors]);
		let m = (0, t._)`${f}, ${i.object(...p)}`;
		return u === t.nil ? (0, t._)`${l}(${m})` : (0, t._)`${l}.call(${u}, ${m})`;
	}
	e.callValidateCode = _;
	var v = (0, t._)`new RegExp`;
	function y({ gen: e, it: { opts: n } }, r) {
		let a = n.unicodeRegExp ? "u" : "", { regExp: o } = n.code, s = o(r, a);
		return e.scopeValue("pattern", {
			key: s.toString(),
			ref: s,
			code: (0, t._)`${o.code === "new RegExp" ? v : (0, i.useFunc)(e, o)}(${r}, ${a})`
		});
	}
	e.usePattern = y;
	function b(e) {
		let { gen: r, data: i, keyword: a, it: o } = e, s = r.name("valid");
		if (o.allErrors) {
			let e = r.let("valid", !0);
			return c(() => r.assign(e, !1)), e;
		}
		return r.var(s, !0), c(() => r.break()), s;
		function c(o) {
			let c = r.const("len", (0, t._)`${i}.length`);
			r.forRange("i", 0, c, (i) => {
				e.subschema({
					keyword: a,
					dataProp: i,
					dataPropType: n.Type.Num
				}, s), r.if((0, t.not)(s), o);
			});
		}
	}
	e.validateArray = b;
	function x(e) {
		let { gen: r, schema: i, keyword: a, it: o } = e;
		/* istanbul ignore if */
		if (!Array.isArray(i)) throw Error("ajv implementation error");
		if (i.some((e) => (0, n.alwaysValidSchema)(o, e)) && !o.opts.unevaluated) return;
		let s = r.let("valid", !1), c = r.name("_valid");
		r.block(() => i.forEach((n, i) => {
			let o = e.subschema({
				keyword: a,
				schemaProp: i,
				compositeRule: !0
			}, c);
			r.assign(s, (0, t._)`${s} || ${c}`), e.mergeValidEvaluated(o, c) || r.if((0, t.not)(s));
		})), e.result(s, () => e.reset(), () => e.error(!0));
	}
	e.validateUnion = x;
})), _ = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.validateKeywordUsage = e.validSchemaType = e.funcKeywordCode = e.macroKeywordCode = void 0;
	var t = s(), n = l(), r = g(), i = u();
	function a(e, n) {
		let { gen: r, keyword: i, schema: a, parentSchema: o, it: s } = e, c = n.macro.call(s.self, a, o, s), l = p(r, i, c);
		s.opts.validateSchema !== !1 && s.self.validateSchema(c, !0);
		let u = r.name("valid");
		e.subschema({
			schema: c,
			schemaPath: t.nil,
			errSchemaPath: `${s.errSchemaPath}/${i}`,
			topSchemaRef: l,
			compositeRule: !0
		}, u), e.pass(u, () => e.error(!0));
	}
	e.macroKeywordCode = a;
	function o(e, i) {
		let { gen: a, keyword: o, schema: s, parentSchema: l, $data: u, it: m } = e;
		f(m, i);
		let h = p(a, o, !u && i.compile ? i.compile.call(m.self, s, l, m) : i.validate), g = a.let("valid");
		e.block$data(g, _), e.ok(i.valid ?? g);
		function _() {
			if (i.errors === !1) b(), i.modifying && c(e), x(() => e.error());
			else {
				let t = i.async ? v() : y();
				i.modifying && c(e), x(() => d(e, t));
			}
		}
		function v() {
			let e = a.let("ruleErrs", null);
			return a.try(() => b((0, t._)`await `), (n) => a.assign(g, !1).if((0, t._)`${n} instanceof ${m.ValidationError}`, () => a.assign(e, (0, t._)`${n}.errors`), () => a.throw(n))), e;
		}
		function y() {
			let e = (0, t._)`${h}.errors`;
			return a.assign(e, null), b(t.nil), e;
		}
		function b(o = i.async ? (0, t._)`await ` : t.nil) {
			let s = m.opts.passContext ? n.default.this : n.default.self, c = !("compile" in i && !u || i.schema === !1);
			a.assign(g, (0, t._)`${o}${(0, r.callValidateCode)(e, h, s, c)}`, i.modifying);
		}
		function x(e) {
			a.if((0, t.not)(i.valid ?? g), e);
		}
	}
	e.funcKeywordCode = o;
	function c(e) {
		let { gen: n, data: r, it: i } = e;
		n.if(i.parentData, () => n.assign(r, (0, t._)`${i.parentData}[${i.parentDataProperty}]`));
	}
	function d(e, r) {
		let { gen: a } = e;
		a.if((0, t._)`Array.isArray(${r})`, () => {
			a.assign(n.default.vErrors, (0, t._)`${n.default.vErrors} === null ? ${r} : ${n.default.vErrors}.concat(${r})`).assign(n.default.errors, (0, t._)`${n.default.vErrors}.length`), (0, i.extendErrors)(e);
		}, () => e.error());
	}
	function f({ schemaEnv: e }, t) {
		if (t.async && !e.$async) throw Error("async keyword in sync schema");
	}
	function p(e, n, r) {
		if (r === void 0) throw Error(`keyword "${n}" failed to compile`);
		return e.scopeValue("keyword", typeof r == "function" ? { ref: r } : {
			ref: r,
			code: (0, t.stringify)(r)
		});
	}
	function m(e, t, n = !1) {
		return !t.length || t.some((t) => t === "array" ? Array.isArray(e) : t === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == t || n && e === void 0);
	}
	e.validSchemaType = m;
	function h({ schema: e, opts: t, self: n, errSchemaPath: r }, i, a) {
		/* istanbul ignore if */
		if (Array.isArray(i.keyword) ? !i.keyword.includes(a) : i.keyword !== a) throw Error("ajv implementation error");
		let o = i.dependencies;
		if (o?.some((t) => !Object.prototype.hasOwnProperty.call(e, t))) throw Error(`parent schema must have dependencies of ${a}: ${o.join(",")}`);
		if (i.validateSchema && !i.validateSchema(e[a])) {
			let e = `keyword "${a}" value is invalid at path "${r}": ` + n.errorsText(i.validateSchema.errors);
			if (t.validateSchema === "log") n.logger.error(e);
			else throw Error(e);
		}
	}
	e.validateKeywordUsage = h;
})), v = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.extendSubschemaMode = e.extendSubschemaData = e.getSubschema = void 0;
	var t = s(), n = c();
	function r(e, { keyword: r, schemaProp: i, schema: a, schemaPath: o, errSchemaPath: s, topSchemaRef: c }) {
		if (r !== void 0 && a !== void 0) throw Error("both \"keyword\" and \"schema\" passed, only one allowed");
		if (r !== void 0) {
			let a = e.schema[r];
			return i === void 0 ? {
				schema: a,
				schemaPath: (0, t._)`${e.schemaPath}${(0, t.getProperty)(r)}`,
				errSchemaPath: `${e.errSchemaPath}/${r}`
			} : {
				schema: a[i],
				schemaPath: (0, t._)`${e.schemaPath}${(0, t.getProperty)(r)}${(0, t.getProperty)(i)}`,
				errSchemaPath: `${e.errSchemaPath}/${r}/${(0, n.escapeFragment)(i)}`
			};
		}
		if (a !== void 0) {
			if (o === void 0 || s === void 0 || c === void 0) throw Error("\"schemaPath\", \"errSchemaPath\" and \"topSchemaRef\" are required with \"schema\"");
			return {
				schema: a,
				schemaPath: o,
				topSchemaRef: c,
				errSchemaPath: s
			};
		}
		throw Error("either \"keyword\" or \"schema\" must be passed");
	}
	e.getSubschema = r;
	function i(e, r, { dataProp: i, dataPropType: a, data: o, dataTypes: s, propertyName: c }) {
		if (o !== void 0 && i !== void 0) throw Error("both \"data\" and \"dataProp\" passed, only one allowed");
		let { gen: l } = r;
		if (i !== void 0) {
			let { errorPath: o, dataPathArr: s, opts: c } = r;
			u(l.let("data", (0, t._)`${r.data}${(0, t.getProperty)(i)}`, !0)), e.errorPath = (0, t.str)`${o}${(0, n.getErrorPath)(i, a, c.jsPropertySyntax)}`, e.parentDataProperty = (0, t._)`${i}`, e.dataPathArr = [...s, e.parentDataProperty];
		}
		o !== void 0 && (u(o instanceof t.Name ? o : l.let("data", o, !0)), c !== void 0 && (e.propertyName = c)), s && (e.dataTypes = s);
		function u(t) {
			e.data = t, e.dataLevel = r.dataLevel + 1, e.dataTypes = [], r.definedProperties = /* @__PURE__ */ new Set(), e.parentData = r.data, e.dataNames = [...r.dataNames, t];
		}
	}
	e.extendSubschemaData = i;
	function a(e, { jtdDiscriminator: t, jtdMetadata: n, compositeRule: r, createErrors: i, allErrors: a }) {
		r !== void 0 && (e.compositeRule = r), i !== void 0 && (e.createErrors = i), a !== void 0 && (e.allErrors = a), e.jtdDiscriminator = t, e.jtdMetadata = n;
	}
	e.extendSubschemaMode = a;
})), y = /* @__PURE__ */ i(((e, t) => {
	t.exports = function e(t, n) {
		if (t === n) return !0;
		if (t && n && typeof t == "object" && typeof n == "object") {
			if (t.constructor !== n.constructor) return !1;
			var r, i, a;
			if (Array.isArray(t)) {
				if (r = t.length, r != n.length) return !1;
				for (i = r; i-- !== 0;) if (!e(t[i], n[i])) return !1;
				return !0;
			}
			if (t.constructor === RegExp) return t.source === n.source && t.flags === n.flags;
			if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === n.valueOf();
			if (t.toString !== Object.prototype.toString) return t.toString() === n.toString();
			if (a = Object.keys(t), r = a.length, r !== Object.keys(n).length) return !1;
			for (i = r; i-- !== 0;) if (!Object.prototype.hasOwnProperty.call(n, a[i])) return !1;
			for (i = r; i-- !== 0;) {
				var o = a[i];
				if (!e(t[o], n[o])) return !1;
			}
			return !0;
		}
		return t !== t && n !== n;
	};
})), b = /* @__PURE__ */ i(((e, t) => {
	var n = t.exports = function(e, t, n) {
		typeof t == "function" && (n = t, t = {}), n = t.cb || n;
		var i = typeof n == "function" ? n : n.pre || function() {}, a = n.post || function() {};
		r(t, i, a, e, "", e);
	};
	n.keywords = {
		additionalItems: !0,
		items: !0,
		contains: !0,
		additionalProperties: !0,
		propertyNames: !0,
		not: !0,
		if: !0,
		then: !0,
		else: !0
	}, n.arrayKeywords = {
		items: !0,
		allOf: !0,
		anyOf: !0,
		oneOf: !0
	}, n.propsKeywords = {
		$defs: !0,
		definitions: !0,
		properties: !0,
		patternProperties: !0,
		dependencies: !0
	}, n.skipKeywords = {
		default: !0,
		enum: !0,
		const: !0,
		required: !0,
		maximum: !0,
		minimum: !0,
		exclusiveMaximum: !0,
		exclusiveMinimum: !0,
		multipleOf: !0,
		maxLength: !0,
		minLength: !0,
		pattern: !0,
		format: !0,
		maxItems: !0,
		minItems: !0,
		uniqueItems: !0,
		maxProperties: !0,
		minProperties: !0
	};
	function r(e, t, a, o, s, c, l, u, d, f) {
		if (o && typeof o == "object" && !Array.isArray(o)) {
			for (var p in t(o, s, c, l, u, d, f), o) {
				var m = o[p];
				if (Array.isArray(m)) {
					if (p in n.arrayKeywords) for (var h = 0; h < m.length; h++) r(e, t, a, m[h], s + "/" + p + "/" + h, c, s, p, o, h);
				} else if (p in n.propsKeywords) {
					if (m && typeof m == "object") for (var g in m) r(e, t, a, m[g], s + "/" + p + "/" + i(g), c, s, p, o, g);
				} else (p in n.keywords || e.allKeys && !(p in n.skipKeywords)) && r(e, t, a, m, s + "/" + p, c, s, p, o);
			}
			a(o, s, c, l, u, d, f);
		}
	}
	function i(e) {
		return e.replace(/~/g, "~0").replace(/\//g, "~1");
	}
})), x = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.getSchemaRefs = e.resolveUrl = e.normalizeId = e._getFullPath = e.getFullPath = e.inlineRef = void 0;
	var t = c(), n = y(), r = b(), i = /* @__PURE__ */ new Set([
		"type",
		"format",
		"pattern",
		"maxLength",
		"minLength",
		"maxProperties",
		"minProperties",
		"maxItems",
		"minItems",
		"maximum",
		"minimum",
		"uniqueItems",
		"multipleOf",
		"required",
		"enum",
		"const"
	]);
	function a(e, t = !0) {
		return typeof e == "boolean" ? !0 : t === !0 ? !s(e) : t ? l(e) <= t : !1;
	}
	e.inlineRef = a;
	var o = /* @__PURE__ */ new Set([
		"$ref",
		"$recursiveRef",
		"$recursiveAnchor",
		"$dynamicRef",
		"$dynamicAnchor"
	]);
	function s(e) {
		for (let t in e) {
			if (o.has(t)) return !0;
			let n = e[t];
			if (Array.isArray(n) && n.some(s) || typeof n == "object" && s(n)) return !0;
		}
		return !1;
	}
	function l(e) {
		let n = 0;
		for (let r in e) if (r === "$ref" || (n++, !i.has(r) && (typeof e[r] == "object" && (0, t.eachItem)(e[r], (e) => n += l(e)), n === Infinity))) return Infinity;
		return n;
	}
	function u(e, t = "", n) {
		return n !== !1 && (t = p(t)), d(e, e.parse(t));
	}
	e.getFullPath = u;
	function d(e, t) {
		return e.serialize(t).split("#")[0] + "#";
	}
	e._getFullPath = d;
	var f = /#\/?$/;
	function p(e) {
		return e ? e.replace(f, "") : "";
	}
	e.normalizeId = p;
	function m(e, t, n) {
		return n = p(n), e.resolve(t, n);
	}
	e.resolveUrl = m;
	var h = /^[a-z_][-a-z0-9._]*$/i;
	function g(e, t) {
		if (typeof e == "boolean") return {};
		let { schemaId: i, uriResolver: a } = this.opts, o = p(e[i] || t), s = { "": o }, c = u(a, o, !1), l = {}, d = /* @__PURE__ */ new Set();
		return r(e, { allKeys: !0 }, (e, t, n, r) => {
			if (r === void 0) return;
			let a = c + t, o = s[r];
			typeof e[i] == "string" && (o = u.call(this, e[i])), g.call(this, e.$anchor), g.call(this, e.$dynamicAnchor), s[t] = o;
			function u(t) {
				let n = this.opts.uriResolver.resolve;
				if (t = p(o ? n(o, t) : t), d.has(t)) throw m(t);
				d.add(t);
				let r = this.refs[t];
				return typeof r == "string" && (r = this.refs[r]), typeof r == "object" ? f(e, r.schema, t) : t !== p(a) && (t[0] === "#" ? (f(e, l[t], t), l[t] = e) : this.refs[t] = a), t;
			}
			function g(e) {
				if (typeof e == "string") {
					if (!h.test(e)) throw Error(`invalid anchor "${e}"`);
					u.call(this, `#${e}`);
				}
			}
		}), l;
		function f(e, t, r) {
			if (t !== void 0 && !n(e, t)) throw m(r);
		}
		function m(e) {
			return /* @__PURE__ */ Error(`reference "${e}" resolves to more than one schema`);
		}
	}
	e.getSchemaRefs = g;
})), S = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.getData = e.KeywordCxt = e.validateFunctionCode = void 0;
	var t = d(), n = m(), r = p(), i = m(), a = h(), o = _(), f = v(), g = s(), y = l(), b = x(), S = c(), C = u();
	function ee(e) {
		if (ae(e) && (se(e), ie(e))) {
			re(e);
			return;
		}
		w(e, () => (0, t.topBoolOrEmptySchema)(e));
	}
	e.validateFunctionCode = ee;
	function w({ gen: e, validateName: t, schema: n, schemaEnv: r, opts: i }, a) {
		i.code.es5 ? e.func(t, (0, g._)`${y.default.data}, ${y.default.valCxt}`, r.$async, () => {
			e.code((0, g._)`"use strict"; ${E(n, i)}`), ne(e, i), e.code(a);
		}) : e.func(t, (0, g._)`${y.default.data}, ${te(i)}`, r.$async, () => e.code(E(n, i)).code(a));
	}
	function te(e) {
		return (0, g._)`{${y.default.instancePath}="", ${y.default.parentData}, ${y.default.parentDataProperty}, ${y.default.rootData}=${y.default.data}${e.dynamicRef ? (0, g._)`, ${y.default.dynamicAnchors}={}` : g.nil}}={}`;
	}
	function ne(e, t) {
		e.if(y.default.valCxt, () => {
			e.var(y.default.instancePath, (0, g._)`${y.default.valCxt}.${y.default.instancePath}`), e.var(y.default.parentData, (0, g._)`${y.default.valCxt}.${y.default.parentData}`), e.var(y.default.parentDataProperty, (0, g._)`${y.default.valCxt}.${y.default.parentDataProperty}`), e.var(y.default.rootData, (0, g._)`${y.default.valCxt}.${y.default.rootData}`), t.dynamicRef && e.var(y.default.dynamicAnchors, (0, g._)`${y.default.valCxt}.${y.default.dynamicAnchors}`);
		}, () => {
			e.var(y.default.instancePath, (0, g._)`""`), e.var(y.default.parentData, (0, g._)`undefined`), e.var(y.default.parentDataProperty, (0, g._)`undefined`), e.var(y.default.rootData, y.default.data), t.dynamicRef && e.var(y.default.dynamicAnchors, (0, g._)`{}`);
		});
	}
	function re(e) {
		let { schema: t, opts: n, gen: r } = e;
		w(e, () => {
			n.$comment && t.$comment && pe(e), ue(e), r.let(y.default.vErrors, null), r.let(y.default.errors, 0), n.unevaluated && T(e), ce(e), me(e);
		});
	}
	function T(e) {
		let { gen: t, validateName: n } = e;
		e.evaluated = t.const("evaluated", (0, g._)`${n}.evaluated`), t.if((0, g._)`${e.evaluated}.dynamicProps`, () => t.assign((0, g._)`${e.evaluated}.props`, (0, g._)`undefined`)), t.if((0, g._)`${e.evaluated}.dynamicItems`, () => t.assign((0, g._)`${e.evaluated}.items`, (0, g._)`undefined`));
	}
	function E(e, t) {
		let n = typeof e == "object" && e[t.schemaId];
		return n && (t.code.source || t.code.process) ? (0, g._)`/*# sourceURL=${n} */` : g.nil;
	}
	function D(e, n) {
		if (ae(e) && (se(e), ie(e))) {
			oe(e, n);
			return;
		}
		(0, t.boolOrEmptySchema)(e, n);
	}
	function ie({ schema: e, self: t }) {
		if (typeof e == "boolean") return !e;
		for (let n in e) if (t.RULES.all[n]) return !0;
		return !1;
	}
	function ae(e) {
		return typeof e.schema != "boolean";
	}
	function oe(e, t) {
		let { schema: n, gen: r, opts: i } = e;
		i.$comment && n.$comment && pe(e), de(e), fe(e);
		let a = r.const("_errs", y.default.errors);
		ce(e, a), r.var(t, (0, g._)`${a} === ${y.default.errors}`);
	}
	function se(e) {
		(0, S.checkUnknownRules)(e), le(e);
	}
	function ce(e, t) {
		if (e.opts.jtd) return ge(e, [], !1, t);
		let r = (0, n.getSchemaTypes)(e.schema);
		ge(e, r, !(0, n.coerceAndCheckDataType)(e, r), t);
	}
	function le(e) {
		let { schema: t, errSchemaPath: n, opts: r, self: i } = e;
		t.$ref && r.ignoreKeywordsWithRef && (0, S.schemaHasRulesButRef)(t, i.RULES) && i.logger.warn(`$ref: keywords ignored in schema at path "${n}"`);
	}
	function ue(e) {
		let { schema: t, opts: n } = e;
		t.default !== void 0 && n.useDefaults && n.strictSchema && (0, S.checkStrictMode)(e, "default is ignored in the schema root");
	}
	function de(e) {
		let t = e.schema[e.opts.schemaId];
		t && (e.baseId = (0, b.resolveUrl)(e.opts.uriResolver, e.baseId, t));
	}
	function fe(e) {
		if (e.schema.$async && !e.schemaEnv.$async) throw Error("async schema in sync schema");
	}
	function pe({ gen: e, schemaEnv: t, schema: n, errSchemaPath: r, opts: i }) {
		let a = n.$comment;
		if (i.$comment === !0) e.code((0, g._)`${y.default.self}.logger.log(${a})`);
		else if (typeof i.$comment == "function") {
			let n = (0, g.str)`${r}/$comment`, i = e.scopeValue("root", { ref: t.root });
			e.code((0, g._)`${y.default.self}.opts.$comment(${a}, ${n}, ${i}.schema)`);
		}
	}
	function me(e) {
		let { gen: t, schemaEnv: n, validateName: r, ValidationError: i, opts: a } = e;
		n.$async ? t.if((0, g._)`${y.default.errors} === 0`, () => t.return(y.default.data), () => t.throw((0, g._)`new ${i}(${y.default.vErrors})`)) : (t.assign((0, g._)`${r}.errors`, y.default.vErrors), a.unevaluated && he(e), t.return((0, g._)`${y.default.errors} === 0`));
	}
	function he({ gen: e, evaluated: t, props: n, items: r }) {
		n instanceof g.Name && e.assign((0, g._)`${t}.props`, n), r instanceof g.Name && e.assign((0, g._)`${t}.items`, r);
	}
	function ge(e, t, n, a) {
		let { gen: o, schema: s, data: c, allErrors: l, opts: u, self: d } = e, { RULES: f } = d;
		if (s.$ref && (u.ignoreKeywordsWithRef || !(0, S.schemaHasRulesButRef)(s, f))) {
			o.block(() => De(e, "$ref", f.all.$ref.definition));
			return;
		}
		u.jtd || ve(e, t), o.block(() => {
			for (let e of f.rules) p(e);
			p(f.post);
		});
		function p(d) {
			(0, r.shouldUseGroup)(s, d) && (d.type ? (o.if((0, i.checkDataType)(d.type, c, u.strictNumbers)), _e(e, d), t.length === 1 && t[0] === d.type && n && (o.else(), (0, i.reportTypeError)(e)), o.endIf()) : _e(e, d), l || o.if((0, g._)`${y.default.errors} === ${a || 0}`));
		}
	}
	function _e(e, t) {
		let { gen: n, schema: i, opts: { useDefaults: o } } = e;
		o && (0, a.assignDefaults)(e, t.type), n.block(() => {
			for (let n of t.rules) (0, r.shouldUseRule)(i, n) && De(e, n.keyword, n.definition, t.type);
		});
	}
	function ve(e, t) {
		e.schemaEnv.meta || !e.opts.strictTypes || (ye(e, t), e.opts.allowUnionTypes || be(e, t), xe(e, e.dataTypes));
	}
	function ye(e, t) {
		if (t.length) {
			if (!e.dataTypes.length) {
				e.dataTypes = t;
				return;
			}
			t.forEach((t) => {
				Ce(e.dataTypes, t) || Te(e, `type "${t}" not allowed by context "${e.dataTypes.join(",")}"`);
			}), we(e, t);
		}
	}
	function be(e, t) {
		t.length > 1 && !(t.length === 2 && t.includes("null")) && Te(e, "use allowUnionTypes to allow union type keyword");
	}
	function xe(e, t) {
		let n = e.self.RULES.all;
		for (let i in n) {
			let a = n[i];
			if (typeof a == "object" && (0, r.shouldUseRule)(e.schema, a)) {
				let { type: n } = a.definition;
				n.length && !n.some((e) => Se(t, e)) && Te(e, `missing type "${n.join(",")}" for keyword "${i}"`);
			}
		}
	}
	function Se(e, t) {
		return e.includes(t) || t === "number" && e.includes("integer");
	}
	function Ce(e, t) {
		return e.includes(t) || t === "integer" && e.includes("number");
	}
	function we(e, t) {
		let n = [];
		for (let r of e.dataTypes) Ce(t, r) ? n.push(r) : t.includes("integer") && r === "number" && n.push("integer");
		e.dataTypes = n;
	}
	function Te(e, t) {
		let n = e.schemaEnv.baseId + e.errSchemaPath;
		t += ` at "${n}" (strictTypes)`, (0, S.checkStrictMode)(e, t, e.opts.strictTypes);
	}
	var Ee = class {
		constructor(e, t, n) {
			if ((0, o.validateKeywordUsage)(e, t, n), this.gen = e.gen, this.allErrors = e.allErrors, this.keyword = n, this.data = e.data, this.schema = e.schema[n], this.$data = t.$data && e.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, S.schemaRefOrVal)(e, this.schema, n, this.$data), this.schemaType = t.schemaType, this.parentSchema = e.schema, this.params = {}, this.it = e, this.def = t, this.$data) this.schemaCode = e.gen.const("vSchema", Ae(this.$data, e));
			else if (this.schemaCode = this.schemaValue, !(0, o.validSchemaType)(this.schema, t.schemaType, t.allowUndefined)) throw Error(`${n} value must be ${JSON.stringify(t.schemaType)}`);
			("code" in t ? t.trackErrors : t.errors !== !1) && (this.errsCount = e.gen.const("_errs", y.default.errors));
		}
		result(e, t, n) {
			this.failResult((0, g.not)(e), t, n);
		}
		failResult(e, t, n) {
			this.gen.if(e), n ? n() : this.error(), t ? (this.gen.else(), t(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
		}
		pass(e, t) {
			this.failResult((0, g.not)(e), void 0, t);
		}
		fail(e) {
			if (e === void 0) {
				this.error(), this.allErrors || this.gen.if(!1);
				return;
			}
			this.gen.if(e), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
		}
		fail$data(e) {
			if (!this.$data) return this.fail(e);
			let { schemaCode: t } = this;
			this.fail((0, g._)`${t} !== undefined && (${(0, g.or)(this.invalid$data(), e)})`);
		}
		error(e, t, n) {
			if (t) {
				this.setParams(t), this._error(e, n), this.setParams({});
				return;
			}
			this._error(e, n);
		}
		_error(e, t) {
			(e ? C.reportExtraError : C.reportError)(this, this.def.error, t);
		}
		$dataError() {
			(0, C.reportError)(this, this.def.$dataError || C.keyword$DataError);
		}
		reset() {
			if (this.errsCount === void 0) throw Error("add \"trackErrors\" to keyword definition");
			(0, C.resetErrorsCount)(this.gen, this.errsCount);
		}
		ok(e) {
			this.allErrors || this.gen.if(e);
		}
		setParams(e, t) {
			t ? Object.assign(this.params, e) : this.params = e;
		}
		block$data(e, t, n = g.nil) {
			this.gen.block(() => {
				this.check$data(e, n), t();
			});
		}
		check$data(e = g.nil, t = g.nil) {
			if (!this.$data) return;
			let { gen: n, schemaCode: r, schemaType: i, def: a } = this;
			n.if((0, g.or)((0, g._)`${r} === undefined`, t)), e !== g.nil && n.assign(e, !0), (i.length || a.validateSchema) && (n.elseIf(this.invalid$data()), this.$dataError(), e !== g.nil && n.assign(e, !1)), n.else();
		}
		invalid$data() {
			let { gen: e, schemaCode: t, schemaType: n, def: r, it: a } = this;
			return (0, g.or)(o(), s());
			function o() {
				if (n.length) {
					/* istanbul ignore if */
					if (!(t instanceof g.Name)) throw Error("ajv implementation error");
					let e = Array.isArray(n) ? n : [n];
					return (0, g._)`${(0, i.checkDataTypes)(e, t, a.opts.strictNumbers, i.DataType.Wrong)}`;
				}
				return g.nil;
			}
			function s() {
				if (r.validateSchema) {
					let n = e.scopeValue("validate$data", { ref: r.validateSchema });
					return (0, g._)`!${n}(${t})`;
				}
				return g.nil;
			}
		}
		subschema(e, t) {
			let n = (0, f.getSubschema)(this.it, e);
			(0, f.extendSubschemaData)(n, this.it, e), (0, f.extendSubschemaMode)(n, e);
			let r = {
				...this.it,
				...n,
				items: void 0,
				props: void 0
			};
			return D(r, t), r;
		}
		mergeEvaluated(e, t) {
			let { it: n, gen: r } = this;
			n.opts.unevaluated && (n.props !== !0 && e.props !== void 0 && (n.props = S.mergeEvaluated.props(r, e.props, n.props, t)), n.items !== !0 && e.items !== void 0 && (n.items = S.mergeEvaluated.items(r, e.items, n.items, t)));
		}
		mergeValidEvaluated(e, t) {
			let { it: n, gen: r } = this;
			if (n.opts.unevaluated && (n.props !== !0 || n.items !== !0)) return r.if(t, () => this.mergeEvaluated(e, g.Name)), !0;
		}
	};
	e.KeywordCxt = Ee;
	function De(e, t, n, r) {
		let i = new Ee(e, n, t);
		"code" in n ? n.code(i, r) : i.$data && n.validate ? (0, o.funcKeywordCode)(i, n) : "macro" in n ? (0, o.macroKeywordCode)(i, n) : (n.compile || n.validate) && (0, o.funcKeywordCode)(i, n);
	}
	var Oe = /^\/(?:[^~]|~0|~1)*$/, ke = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
	function Ae(e, { dataLevel: t, dataNames: n, dataPathArr: r }) {
		let i, a;
		if (e === "") return y.default.rootData;
		if (e[0] === "/") {
			if (!Oe.test(e)) throw Error(`Invalid JSON-pointer: ${e}`);
			i = e, a = y.default.rootData;
		} else {
			let o = ke.exec(e);
			if (!o) throw Error(`Invalid JSON-pointer: ${e}`);
			let s = +o[1];
			if (i = o[2], i === "#") {
				if (s >= t) throw Error(c("property/index", s));
				return r[t - s];
			}
			if (s > t) throw Error(c("data", s));
			if (a = n[t - s], !i) return a;
		}
		let o = a, s = i.split("/");
		for (let e of s) e && (a = (0, g._)`${a}${(0, g.getProperty)((0, S.unescapeJsonPointer)(e))}`, o = (0, g._)`${o} && ${a}`);
		return o;
		function c(e, n) {
			return `Cannot access ${e} ${n} levels up, current level is ${t}`;
		}
	}
	e.getData = Ae;
})), C = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = class extends Error {
		constructor(e) {
			super("validation failed"), this.errors = e, this.ajv = this.validation = !0;
		}
	};
})), ee = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = x();
	e.default = class extends Error {
		constructor(e, n, r, i) {
			super(i || `can't resolve reference ${r} from id ${n}`), this.missingRef = (0, t.resolveUrl)(e, n, r), this.missingSchema = (0, t.normalizeId)((0, t.getFullPath)(e, this.missingRef));
		}
	};
})), w = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.resolveSchema = e.getCompilingSchema = e.resolveRef = e.compileSchema = e.SchemaEnv = void 0;
	var t = s(), n = C(), r = l(), i = x(), a = c(), o = S(), u = class {
		constructor(e) {
			this.refs = {}, this.dynamicAnchors = {};
			let t;
			typeof e.schema == "object" && (t = e.schema), this.schema = e.schema, this.schemaId = e.schemaId, this.root = e.root || this, this.baseId = e.baseId ?? (0, i.normalizeId)(t?.[e.schemaId || "$id"]), this.schemaPath = e.schemaPath, this.localRefs = e.localRefs, this.meta = e.meta, this.$async = t?.$async, this.refs = {};
		}
	};
	e.SchemaEnv = u;
	function d(e) {
		let a = m.call(this, e);
		if (a) return a;
		let s = (0, i.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: c, lines: l } = this.opts.code, { ownProperties: u } = this.opts, d = new t.CodeGen(this.scope, {
			es5: c,
			lines: l,
			ownProperties: u
		}), f;
		e.$async && (f = d.scopeValue("Error", {
			ref: n.default,
			code: (0, t._)`require("ajv/dist/runtime/validation_error").default`
		}));
		let p = d.scopeName("validate");
		e.validateName = p;
		let h = {
			gen: d,
			allErrors: this.opts.allErrors,
			data: r.default.data,
			parentData: r.default.parentData,
			parentDataProperty: r.default.parentDataProperty,
			dataNames: [r.default.data],
			dataPathArr: [t.nil],
			dataLevel: 0,
			dataTypes: [],
			definedProperties: /* @__PURE__ */ new Set(),
			topSchemaRef: d.scopeValue("schema", this.opts.code.source === !0 ? {
				ref: e.schema,
				code: (0, t.stringify)(e.schema)
			} : { ref: e.schema }),
			validateName: p,
			ValidationError: f,
			schema: e.schema,
			schemaEnv: e,
			rootId: s,
			baseId: e.baseId || s,
			schemaPath: t.nil,
			errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
			errorPath: (0, t._)`""`,
			opts: this.opts,
			self: this
		}, g;
		try {
			this._compilations.add(e), (0, o.validateFunctionCode)(h), d.optimize(this.opts.code.optimize);
			let n = d.toString();
			g = `${d.scopeRefs(r.default.scope)}return ${n}`, this.opts.code.process && (g = this.opts.code.process(g, e));
			let i = Function(`${r.default.self}`, `${r.default.scope}`, g)(this, this.scope.get());
			if (this.scope.value(p, { ref: i }), i.errors = null, i.schema = e.schema, i.schemaEnv = e, e.$async && (i.$async = !0), this.opts.code.source === !0 && (i.source = {
				validateName: p,
				validateCode: n,
				scopeValues: d._values
			}), this.opts.unevaluated) {
				let { props: e, items: n } = h;
				i.evaluated = {
					props: e instanceof t.Name ? void 0 : e,
					items: n instanceof t.Name ? void 0 : n,
					dynamicProps: e instanceof t.Name,
					dynamicItems: n instanceof t.Name
				}, i.source && (i.source.evaluated = (0, t.stringify)(i.evaluated));
			}
			return e.validate = i, e;
		} catch (t) {
			throw delete e.validate, delete e.validateName, g && this.logger.error("Error compiling schema, function code:", g), t;
		} finally {
			this._compilations.delete(e);
		}
	}
	e.compileSchema = d;
	function f(e, t, n) {
		n = (0, i.resolveUrl)(this.opts.uriResolver, t, n);
		let r = e.refs[n];
		if (r) return r;
		let a = g.call(this, e, n);
		if (a === void 0) {
			let r = e.localRefs?.[n], { schemaId: i } = this.opts;
			r && (a = new u({
				schema: r,
				schemaId: i,
				root: e,
				baseId: t
			}));
		}
		if (a !== void 0) return e.refs[n] = p.call(this, a);
	}
	e.resolveRef = f;
	function p(e) {
		return (0, i.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : d.call(this, e);
	}
	function m(e) {
		for (let t of this._compilations) if (h(t, e)) return t;
	}
	e.getCompilingSchema = m;
	function h(e, t) {
		return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
	}
	function g(e, t) {
		let n;
		for (; typeof (n = this.refs[t]) == "string";) t = n;
		return n || this.schemas[t] || _.call(this, e, t);
	}
	function _(e, t) {
		let n = this.opts.uriResolver.parse(t), r = (0, i._getFullPath)(this.opts.uriResolver, n), a = (0, i.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
		if (Object.keys(e.schema).length > 0 && r === a) return y.call(this, n, e);
		let o = (0, i.normalizeId)(r), s = this.refs[o] || this.schemas[o];
		if (typeof s == "string") {
			let t = _.call(this, e, s);
			return typeof t?.schema == "object" ? y.call(this, n, t) : void 0;
		}
		if (typeof s?.schema == "object") {
			if (s.validate || d.call(this, s), o === (0, i.normalizeId)(t)) {
				let { schema: t } = s, { schemaId: n } = this.opts, r = t[n];
				return r && (a = (0, i.resolveUrl)(this.opts.uriResolver, a, r)), new u({
					schema: t,
					schemaId: n,
					root: e,
					baseId: a
				});
			}
			return y.call(this, n, s);
		}
	}
	e.resolveSchema = _;
	var v = /* @__PURE__ */ new Set([
		"properties",
		"patternProperties",
		"enum",
		"dependencies",
		"definitions"
	]);
	function y(e, { baseId: t, schema: n, root: r }) {
		if (e.fragment?.[0] !== "/") return;
		for (let r of e.fragment.slice(1).split("/")) {
			if (typeof n == "boolean") return;
			let e = n[(0, a.unescapeFragment)(r)];
			if (e === void 0) return;
			n = e;
			let o = typeof n == "object" && n[this.opts.schemaId];
			!v.has(r) && o && (t = (0, i.resolveUrl)(this.opts.uriResolver, t, o));
		}
		let o;
		if (typeof n != "boolean" && n.$ref && !(0, a.schemaHasRulesButRef)(n, this.RULES)) {
			let e = (0, i.resolveUrl)(this.opts.uriResolver, t, n.$ref);
			o = _.call(this, r, e);
		}
		let { schemaId: s } = this.opts;
		if (o ||= new u({
			schema: n,
			schemaId: s,
			root: r,
			baseId: t
		}), o.schema !== o.root.schema) return o;
	}
})), te = /* @__PURE__ */ r({
	$id: () => ne,
	additionalProperties: () => !1,
	default: () => ie,
	description: () => re,
	properties: () => D,
	required: () => E,
	type: () => T
}), ne, re, T, E, D, ie, ae = n((() => {
	ne = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", re = "Meta-schema for $data reference (JSON AnySchema extension proposal)", T = "object", E = ["$data"], D = { $data: {
		type: "string",
		anyOf: [{ format: "relative-json-pointer" }, { format: "json-pointer" }]
	} }, ie = {
		$id: ne,
		description: re,
		type: T,
		required: E,
		properties: D,
		additionalProperties: !1
	};
})), oe = /* @__PURE__ */ i(((e, t) => {
	var n = RegExp.prototype.test.bind(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/iu), r = RegExp.prototype.test.bind(/^(?:(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d{2}|[1-9]\d|\d)$/u), i = RegExp.prototype.test.bind(/^[\da-f]{2}$/iu), a = RegExp.prototype.test.bind(/^[\da-z\-._~]$/iu), o = RegExp.prototype.test.bind(/^[\da-z\-._~!$&'()*+,;=:@/]$/iu);
	function s(e) {
		let t = "", n = 0, r = 0;
		for (r = 0; r < e.length; r++) if (n = e[r].charCodeAt(0), n !== 48) {
			if (!(n >= 48 && n <= 57 || n >= 65 && n <= 70 || n >= 97 && n <= 102)) return "";
			t += e[r];
			break;
		}
		for (r += 1; r < e.length; r++) {
			if (n = e[r].charCodeAt(0), !(n >= 48 && n <= 57 || n >= 65 && n <= 70 || n >= 97 && n <= 102)) return "";
			t += e[r];
		}
		return t;
	}
	var c = RegExp.prototype.test.bind(/[^!"$&'()*+,\-.;=_`a-z{}~]/u);
	function l(e) {
		return e.length = 0, !0;
	}
	function u(e, t, n) {
		if (e.length) {
			let r = s(e);
			if (r !== "") t.push(r);
			else return n.error = !0, !1;
			e.length = 0;
		}
		return !0;
	}
	function d(e) {
		let t = 0, n = {
			error: !1,
			address: "",
			zone: ""
		}, r = [], i = [], a = !1, o = !1, c = u;
		for (let s = 0; s < e.length; s++) {
			let u = e[s];
			if (!(u === "[" || u === "]")) if (u === ":") {
				if (a === !0 && (o = !0), !c(i, r, n)) break;
				if (++t > 7) {
					n.error = !0;
					break;
				}
				s > 0 && e[s - 1] === ":" && (a = !0), r.push(":");
				continue;
			} else if (u === "%") {
				if (!c(i, r, n)) break;
				c = l;
			} else {
				i.push(u);
				continue;
			}
		}
		return i.length && (c === l ? n.zone = i.join("") : o ? r.push(i.join("")) : r.push(s(i))), n.address = r.join(""), n;
	}
	function f(e) {
		if (p(e, ":") < 2) return {
			host: e,
			isIPV6: !1
		};
		let t = d(e);
		if (t.error) return {
			host: e,
			isIPV6: !1
		};
		{
			let e = t.address, n = t.address;
			return t.zone && (e += "%" + t.zone, n += "%25" + t.zone), {
				host: e,
				isIPV6: !0,
				escapedHost: n
			};
		}
	}
	function p(e, t) {
		let n = 0;
		for (let r = 0; r < e.length; r++) e[r] === t && n++;
		return n;
	}
	function m(e) {
		let t = e, n = [], r = -1, i = 0;
		for (; i = t.length;) {
			if (i === 1) {
				if (t === ".") break;
				if (t === "/") {
					n.push("/");
					break;
				} else {
					n.push(t);
					break;
				}
			} else if (i === 2) {
				if (t[0] === ".") {
					if (t[1] === ".") break;
					if (t[1] === "/") {
						t = t.slice(2);
						continue;
					}
				} else if (t[0] === "/" && (t[1] === "." || t[1] === "/")) {
					n.push("/");
					break;
				}
			} else if (i === 3 && t === "/..") {
				n.length !== 0 && n.pop(), n.push("/");
				break;
			}
			if (t[0] === ".") {
				if (t[1] === ".") {
					if (t[2] === "/") {
						t = t.slice(3);
						continue;
					}
				} else if (t[1] === "/") {
					t = t.slice(2);
					continue;
				}
			} else if (t[0] === "/" && t[1] === ".") {
				if (t[2] === "/") {
					t = t.slice(2);
					continue;
				} else if (t[2] === "." && t[3] === "/") {
					t = t.slice(3), n.length !== 0 && n.pop();
					continue;
				}
			}
			if ((r = t.indexOf("/", 1)) === -1) {
				n.push(t);
				break;
			} else n.push(t.slice(0, r)), t = t.slice(r);
		}
		return n.join("");
	}
	var h = {
		"@": "%40",
		"/": "%2F",
		"?": "%3F",
		"#": "%23",
		":": "%3A"
	}, g = /[@/?#:]/g, _ = /[@/?#]/g;
	function v(e, t) {
		let n = t ? _ : g;
		return n.lastIndex = 0, e.replace(n, (e) => h[e]);
	}
	function y(e, t = !1) {
		if (e.indexOf("%") === -1) return e;
		let n = "";
		for (let r = 0; r < e.length; r++) {
			if (e[r] === "%" && r + 2 < e.length) {
				let o = e.slice(r + 1, r + 3);
				if (i(o)) {
					let e = o.toUpperCase(), i = String.fromCharCode(parseInt(e, 16));
					t && a(i) ? n += i : n += "%" + e, r += 2;
					continue;
				}
			}
			n += e[r];
		}
		return n;
	}
	function b(e) {
		let t = "";
		for (let n = 0; n < e.length; n++) {
			if (e[n] === "%" && n + 2 < e.length) {
				let r = e.slice(n + 1, n + 3);
				if (i(r)) {
					let e = r.toUpperCase(), i = String.fromCharCode(parseInt(e, 16));
					i !== "." && a(i) ? t += i : t += "%" + e, n += 2;
					continue;
				}
			}
			o(e[n]) ? t += e[n] : t += escape(e[n]);
		}
		return t;
	}
	function x(e) {
		let t = "";
		for (let n = 0; n < e.length; n++) {
			if (e[n] === "%" && n + 2 < e.length) {
				let r = e.slice(n + 1, n + 3);
				if (i(r)) {
					t += "%" + r.toUpperCase(), n += 2;
					continue;
				}
			}
			t += escape(e[n]);
		}
		return t;
	}
	function S(e) {
		let t = [];
		if (e.userinfo !== void 0 && (t.push(e.userinfo), t.push("@")), e.host !== void 0) {
			let n = unescape(e.host);
			if (!r(n)) {
				let e = f(n);
				n = e.isIPV6 === !0 ? `[${e.escapedHost}]` : v(n, !1);
			}
			t.push(n);
		}
		return (typeof e.port == "number" || typeof e.port == "string") && (t.push(":"), t.push(String(e.port))), t.length ? t.join("") : void 0;
	}
	t.exports = {
		nonSimpleDomain: c,
		recomposeAuthority: S,
		reescapeHostDelimiters: v,
		normalizePercentEncoding: y,
		normalizePathEncoding: b,
		escapePreservingEscapes: x,
		removeDotSegments: m,
		isIPv4: r,
		isUUID: n,
		normalizeIPv6: f,
		stringArrayToHexStripped: s
	};
})), se = /* @__PURE__ */ i(((e, t) => {
	var { isUUID: n } = oe(), r = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu, i = [
		"http",
		"https",
		"ws",
		"wss",
		"urn",
		"urn:uuid"
	];
	function a(e) {
		return i.indexOf(e) !== -1;
	}
	function o(e) {
		return e.secure === !0 ? !0 : e.secure === !1 ? !1 : e.scheme ? e.scheme.length === 3 && (e.scheme[0] === "w" || e.scheme[0] === "W") && (e.scheme[1] === "s" || e.scheme[1] === "S") && (e.scheme[2] === "s" || e.scheme[2] === "S") : !1;
	}
	function s(e) {
		return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
	}
	function c(e) {
		let t = String(e.scheme).toLowerCase() === "https";
		return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path ||= "/", e;
	}
	function l(e) {
		return e.secure = o(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
	}
	function u(e) {
		if ((e.port === (o(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
			let [t, n] = e.resourceName.split("?");
			e.path = t && t !== "/" ? t : void 0, e.query = n, e.resourceName = void 0;
		}
		return e.fragment = void 0, e;
	}
	function d(e, t) {
		if (!e.path) return e.error = "URN can not be parsed", e;
		let n = e.path.match(r);
		if (n) {
			let r = t.scheme || e.scheme || "urn";
			e.nid = n[1].toLowerCase(), e.nss = n[2];
			let i = y(`${r}:${t.nid || e.nid}`);
			e.path = void 0, i && (e = i.parse(e, t));
		} else e.error = e.error || "URN can not be parsed.";
		return e;
	}
	function f(e, t) {
		if (e.nid === void 0) throw Error("URN without nid cannot be serialized");
		let n = t.scheme || e.scheme || "urn", r = e.nid.toLowerCase(), i = y(`${n}:${t.nid || r}`);
		i && (e = i.serialize(e, t));
		let a = e, o = e.nss;
		return a.path = `${r || t.nid}:${o}`, t.skipEscape = !0, a;
	}
	function p(e, t) {
		let r = e;
		return r.uuid = r.nss, r.nss = void 0, !t.tolerant && (!r.uuid || !n(r.uuid)) && (r.error = r.error || "UUID is not valid."), r;
	}
	function m(e) {
		let t = e;
		return t.nss = (e.uuid || "").toLowerCase(), t;
	}
	var h = {
		scheme: "http",
		domainHost: !0,
		parse: s,
		serialize: c
	}, g = {
		scheme: "https",
		domainHost: h.domainHost,
		parse: s,
		serialize: c
	}, _ = {
		scheme: "ws",
		domainHost: !0,
		parse: l,
		serialize: u
	}, v = {
		http: h,
		https: g,
		ws: _,
		wss: {
			scheme: "wss",
			domainHost: _.domainHost,
			parse: _.parse,
			serialize: _.serialize
		},
		urn: {
			scheme: "urn",
			parse: d,
			serialize: f,
			skipNormalize: !0
		},
		"urn:uuid": {
			scheme: "urn:uuid",
			parse: p,
			serialize: m,
			skipNormalize: !0
		}
	};
	Object.setPrototypeOf(v, null);
	function y(e) {
		return e && (v[e] || v[e.toLowerCase()]) || void 0;
	}
	t.exports = {
		wsIsSecure: o,
		SCHEMES: v,
		isValidSchemeName: a,
		getSchemeHandler: y
	};
})), ce = /* @__PURE__ */ i(((e, t) => {
	var { normalizeIPv6: n, removeDotSegments: r, recomposeAuthority: i, normalizePercentEncoding: a, normalizePathEncoding: o, escapePreservingEscapes: s, reescapeHostDelimiters: c, isIPv4: l, nonSimpleDomain: u } = oe(), { SCHEMES: d, getSchemeHandler: f } = se();
	function p(e, t) {
		return typeof e == "string" ? e = S(e, t) : typeof e == "object" && (e = x(_(e, t), t)), e;
	}
	function m(e, t, n) {
		let r = n ? Object.assign({ scheme: "null" }, n) : { scheme: "null" }, i = h(x(e, r), x(t, r), r, !0);
		return r.skipEscape = !0, _(i, r);
	}
	function h(e, t, n, i) {
		let a = {};
		return i || (e = x(_(e, n), n), t = x(_(t, n), n)), n ||= {}, !n.tolerant && t.scheme ? (a.scheme = t.scheme, a.userinfo = t.userinfo, a.host = t.host, a.port = t.port, a.path = r(t.path || ""), a.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (a.userinfo = t.userinfo, a.host = t.host, a.port = t.port, a.path = r(t.path || ""), a.query = t.query) : (t.path ? (t.path[0] === "/" ? a.path = r(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? a.path = "/" + t.path : e.path ? a.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : a.path = t.path, a.path = r(a.path)), a.query = t.query) : (a.path = e.path, t.query === void 0 ? a.query = e.query : a.query = t.query), a.userinfo = e.userinfo, a.host = e.host, a.port = e.port), a.scheme = e.scheme), a.fragment = t.fragment, a;
	}
	function g(e, t, n) {
		let r = ee(e, n), i = ee(t, n);
		return r !== void 0 && i !== void 0 && r.toLowerCase() === i.toLowerCase();
	}
	function _(e, t) {
		let n = {
			host: e.host,
			scheme: e.scheme,
			userinfo: e.userinfo,
			port: e.port,
			path: e.path,
			query: e.query,
			nid: e.nid,
			nss: e.nss,
			uuid: e.uuid,
			fragment: e.fragment,
			reference: e.reference,
			resourceName: e.resourceName,
			secure: e.secure,
			error: ""
		}, o = Object.assign({}, t), c = [], l = f(o.scheme || n.scheme);
		l && l.serialize && l.serialize(n, o), n.path !== void 0 && (o.skipEscape ? n.path = a(n.path) : (n.path = s(n.path), n.scheme !== void 0 && (n.path = n.path.split("%3A").join(":")))), o.reference !== "suffix" && n.scheme && c.push(n.scheme, ":");
		let u = i(n);
		if (u !== void 0 && (o.reference !== "suffix" && c.push("//"), c.push(u), n.path && n.path[0] !== "/" && c.push("/")), n.path !== void 0) {
			let e = n.path;
			!o.absolutePath && (!l || !l.absolutePath) && (e = r(e)), u === void 0 && e[0] === "/" && e[1] === "/" && (e = "/%2F" + e.slice(2)), c.push(e);
		}
		return n.query !== void 0 && c.push("?", n.query), n.fragment !== void 0 && c.push("#", n.fragment), c.join("");
	}
	var v = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
	function y(e, t) {
		if (t[2] !== void 0 && e.path && e.path[0] !== "/") return "URI path must start with \"/\" when authority is present.";
		if (typeof e.port == "number" && (e.port < 0 || e.port > 65535)) return "URI port is malformed.";
	}
	function b(e, t) {
		let r = Object.assign({}, t), i = {
			scheme: void 0,
			userinfo: void 0,
			host: "",
			port: void 0,
			path: "",
			query: void 0,
			fragment: void 0
		}, a = !1, s = !1;
		r.reference === "suffix" && (e = r.scheme ? r.scheme + ":" + e : "//" + e);
		let d = e.match(v);
		if (d) {
			i.scheme = d[1], i.userinfo = d[3], i.host = d[4], i.port = parseInt(d[5], 10), i.path = d[6] || "", i.query = d[7], i.fragment = d[8], isNaN(i.port) && (i.port = d[5]);
			let t = y(i, d);
			if (t !== void 0 && (i.error = i.error || t, a = !0), i.host) if (l(i.host) === !1) {
				let e = n(i.host);
				i.host = e.host.toLowerCase(), s = e.isIPV6;
			} else s = !0;
			i.scheme === void 0 && i.userinfo === void 0 && i.host === void 0 && i.port === void 0 && i.query === void 0 && !i.path ? i.reference = "same-document" : i.scheme === void 0 ? i.reference = "relative" : i.fragment === void 0 ? i.reference = "absolute" : i.reference = "uri", r.reference && r.reference !== "suffix" && r.reference !== i.reference && (i.error = i.error || "URI is not a " + r.reference + " reference.");
			let p = f(r.scheme || i.scheme);
			if (!r.unicodeSupport && (!p || !p.unicodeSupport) && i.host && (r.domainHost || p && p.domainHost) && s === !1 && u(i.host)) try {
				i.host = URL.domainToASCII(i.host.toLowerCase());
			} catch (e) {
				i.error = i.error || "Host's domain name can not be converted to ASCII: " + e;
			}
			if ((!p || p && !p.skipNormalize) && (e.indexOf("%") !== -1 && (i.scheme !== void 0 && (i.scheme = unescape(i.scheme)), i.host !== void 0 && (i.host = c(unescape(i.host), s))), i.path &&= o(i.path), i.fragment)) try {
				i.fragment = encodeURI(decodeURIComponent(i.fragment));
			} catch {
				i.error = i.error || "URI malformed";
			}
			p && p.parse && p.parse(i, r);
		} else i.error = i.error || "URI can not be parsed.";
		return {
			parsed: i,
			malformedAuthorityOrPort: a
		};
	}
	function x(e, t) {
		return b(e, t).parsed;
	}
	function S(e, t) {
		return C(e, t).normalized;
	}
	function C(e, t) {
		let { parsed: n, malformedAuthorityOrPort: r } = b(e, t);
		return {
			normalized: r ? e : _(n, t),
			malformedAuthorityOrPort: r
		};
	}
	function ee(e, t) {
		if (typeof e == "string") {
			let { normalized: n, malformedAuthorityOrPort: r } = C(e, t);
			return r ? void 0 : n;
		}
		if (typeof e == "object") return _(e, t);
	}
	var w = {
		SCHEMES: d,
		normalize: p,
		resolve: m,
		resolveComponent: h,
		equal: g,
		serialize: _,
		parse: x
	};
	t.exports = w, t.exports.default = w, t.exports.fastUri = w;
})), le = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = ce();
	t.code = "require(\"ajv/dist/runtime/uri\").default", e.default = t;
})), ue = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
	var n = S();
	Object.defineProperty(e, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return n.KeywordCxt;
		}
	});
	var r = s();
	Object.defineProperty(e, "_", {
		enumerable: !0,
		get: function() {
			return r._;
		}
	}), Object.defineProperty(e, "str", {
		enumerable: !0,
		get: function() {
			return r.str;
		}
	}), Object.defineProperty(e, "stringify", {
		enumerable: !0,
		get: function() {
			return r.stringify;
		}
	}), Object.defineProperty(e, "nil", {
		enumerable: !0,
		get: function() {
			return r.nil;
		}
	}), Object.defineProperty(e, "Name", {
		enumerable: !0,
		get: function() {
			return r.Name;
		}
	}), Object.defineProperty(e, "CodeGen", {
		enumerable: !0,
		get: function() {
			return r.CodeGen;
		}
	});
	var i = C(), a = ee(), o = f(), l = w(), u = s(), d = x(), p = m(), h = c(), g = (ae(), t(te).default), _ = le(), v = (e, t) => new RegExp(e, t);
	v.code = "new RegExp";
	var y = [
		"removeAdditional",
		"useDefaults",
		"coerceTypes"
	], b = /* @__PURE__ */ new Set([
		"validate",
		"serialize",
		"parse",
		"wrapper",
		"root",
		"schema",
		"keyword",
		"pattern",
		"formats",
		"validate$data",
		"func",
		"obj",
		"Error"
	]), ne = {
		errorDataPath: "",
		format: "`validateFormats: false` can be used instead.",
		nullable: "\"nullable\" keyword is supported by default.",
		jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
		extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
		missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
		processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
		sourceCode: "Use option `code: {source: true}`",
		strictDefaults: "It is default now, see option `strict`.",
		strictKeywords: "It is default now, see option `strict`.",
		uniqueItems: "\"uniqueItems\" keyword is always validated.",
		unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
		cache: "Map is used as cache, schema object as key.",
		serialize: "Map is used as cache, schema object as key.",
		ajvErrors: "It is default now."
	}, re = {
		ignoreKeywordsWithRef: "",
		jsPropertySyntax: "",
		unicode: "\"minLength\"/\"maxLength\" account for unicode characters by default."
	}, T = 200;
	function E(e) {
		let t = e.strict, n = e.code?.optimize, r = n === !0 || n === void 0 ? 1 : n || 0, i = e.code?.regExp ?? v, a = e.uriResolver ?? _.default;
		return {
			strictSchema: e.strictSchema ?? t ?? !0,
			strictNumbers: e.strictNumbers ?? t ?? !0,
			strictTypes: e.strictTypes ?? t ?? "log",
			strictTuples: e.strictTuples ?? t ?? "log",
			strictRequired: e.strictRequired ?? t ?? !1,
			code: e.code ? {
				...e.code,
				optimize: r,
				regExp: i
			} : {
				optimize: r,
				regExp: i
			},
			loopRequired: e.loopRequired ?? T,
			loopEnum: e.loopEnum ?? T,
			meta: e.meta ?? !0,
			messages: e.messages ?? !0,
			inlineRefs: e.inlineRefs ?? !0,
			schemaId: e.schemaId ?? "$id",
			addUsedSchema: e.addUsedSchema ?? !0,
			validateSchema: e.validateSchema ?? !0,
			validateFormats: e.validateFormats ?? !0,
			unicodeRegExp: e.unicodeRegExp ?? !0,
			int32range: e.int32range ?? !0,
			uriResolver: a
		};
	}
	var D = class {
		constructor(e = {}) {
			this.schemas = {}, this.refs = {}, this.formats = Object.create(null), this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), e = this.opts = {
				...e,
				...E(e)
			};
			let { es5: t, lines: n } = this.opts.code;
			this.scope = new u.ValueScope({
				scope: {},
				prefixes: b,
				es5: t,
				lines: n
			}), this.logger = pe(e.logger);
			let r = e.validateFormats;
			e.validateFormats = !1, this.RULES = (0, o.getRules)(), ie.call(this, ne, e, "NOT SUPPORTED"), ie.call(this, re, e, "DEPRECATED", "warn"), this._metaOpts = de.call(this), e.formats && ce.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), e.keywords && ue.call(this, e.keywords), typeof e.meta == "object" && this.addMetaSchema(e.meta), se.call(this), e.validateFormats = r;
		}
		_addVocabularies() {
			this.addKeyword("$async");
		}
		_addDefaultMetaSchema() {
			let { $data: e, meta: t, schemaId: n } = this.opts, r = g;
			n === "id" && (r = { ...g }, r.id = r.$id, delete r.$id), t && e && this.addMetaSchema(r, r[n], !1);
		}
		defaultMeta() {
			let { meta: e, schemaId: t } = this.opts;
			return this.opts.defaultMeta = typeof e == "object" ? e[t] || e : void 0;
		}
		validate(e, t) {
			let n;
			if (typeof e == "string") {
				if (n = this.getSchema(e), !n) throw Error(`no schema with key or ref "${e}"`);
			} else n = this.compile(e);
			let r = n(t);
			return "$async" in n || (this.errors = n.errors), r;
		}
		compile(e, t) {
			let n = this._addSchema(e, t);
			return n.validate || this._compileSchemaEnv(n);
		}
		compileAsync(e, t) {
			if (typeof this.opts.loadSchema != "function") throw Error("options.loadSchema should be a function");
			let { loadSchema: n } = this.opts;
			return r.call(this, e, t);
			async function r(e, t) {
				await i.call(this, e.$schema);
				let n = this._addSchema(e, t);
				return n.validate || o.call(this, n);
			}
			async function i(e) {
				e && !this.getSchema(e) && await r.call(this, { $ref: e }, !0);
			}
			async function o(e) {
				try {
					return this._compileSchemaEnv(e);
				} catch (t) {
					if (!(t instanceof a.default)) throw t;
					return s.call(this, t), await c.call(this, t.missingSchema), o.call(this, e);
				}
			}
			function s({ missingSchema: e, missingRef: t }) {
				if (this.refs[e]) throw Error(`AnySchema ${e} is loaded but ${t} cannot be resolved`);
			}
			async function c(e) {
				let n = await l.call(this, e);
				this.refs[e] || await i.call(this, n.$schema), this.refs[e] || this.addSchema(n, e, t);
			}
			async function l(e) {
				let t = this._loading[e];
				if (t) return t;
				try {
					return await (this._loading[e] = n(e));
				} finally {
					delete this._loading[e];
				}
			}
		}
		addSchema(e, t, n, r = this.opts.validateSchema) {
			if (Array.isArray(e)) {
				for (let t of e) this.addSchema(t, void 0, n, r);
				return this;
			}
			let i;
			if (typeof e == "object") {
				let { schemaId: t } = this.opts;
				if (i = e[t], i !== void 0 && typeof i != "string") throw Error(`schema ${t} must be string`);
			}
			return t = (0, d.normalizeId)(t || i), this._checkUnique(t), this.schemas[t] = this._addSchema(e, n, t, r, !0), this;
		}
		addMetaSchema(e, t, n = this.opts.validateSchema) {
			return this.addSchema(e, t, !0, n), this;
		}
		validateSchema(e, t) {
			if (typeof e == "boolean") return !0;
			let n;
			if (n = e.$schema, n !== void 0 && typeof n != "string") throw Error("$schema must be a string");
			if (n = n || this.opts.defaultMeta || this.defaultMeta(), !n) return this.logger.warn("meta-schema not available"), this.errors = null, !0;
			let r = this.validate(n, e);
			if (!r && t) {
				let e = "schema is invalid: " + this.errorsText();
				if (this.opts.validateSchema === "log") this.logger.error(e);
				else throw Error(e);
			}
			return r;
		}
		getSchema(e) {
			let t;
			for (; typeof (t = oe.call(this, e)) == "string";) e = t;
			if (t === void 0) {
				let { schemaId: n } = this.opts, r = new l.SchemaEnv({
					schema: {},
					schemaId: n
				});
				if (t = l.resolveSchema.call(this, r, e), !t) return;
				this.refs[e] = t;
			}
			return t.validate || this._compileSchemaEnv(t);
		}
		removeSchema(e) {
			if (e instanceof RegExp) return this._removeAllSchemas(this.schemas, e), this._removeAllSchemas(this.refs, e), this;
			switch (typeof e) {
				case "undefined": return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
				case "string": {
					let t = oe.call(this, e);
					return typeof t == "object" && this._cache.delete(t.schema), delete this.schemas[e], delete this.refs[e], this;
				}
				case "object": {
					let t = e;
					this._cache.delete(t);
					let n = e[this.opts.schemaId];
					return n && (n = (0, d.normalizeId)(n), delete this.schemas[n], delete this.refs[n]), this;
				}
				default: throw Error("ajv.removeSchema: invalid parameter");
			}
		}
		addVocabulary(e) {
			for (let t of e) this.addKeyword(t);
			return this;
		}
		addKeyword(e, t) {
			let n;
			if (typeof e == "string") n = e, typeof t == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), t.keyword = n);
			else if (typeof e == "object" && t === void 0) {
				if (t = e, n = t.keyword, Array.isArray(n) && !n.length) throw Error("addKeywords: keyword must be string or non-empty array");
			} else throw Error("invalid addKeywords parameters");
			if (he.call(this, n, t), !t) return (0, h.eachItem)(n, (e) => ge.call(this, e)), this;
			ve.call(this, t);
			let r = {
				...t,
				type: (0, p.getJSONTypes)(t.type),
				schemaType: (0, p.getJSONTypes)(t.schemaType)
			};
			return (0, h.eachItem)(n, r.type.length === 0 ? (e) => ge.call(this, e, r) : (e) => r.type.forEach((t) => ge.call(this, e, r, t))), this;
		}
		getKeyword(e) {
			let t = this.RULES.all[e];
			return typeof t == "object" ? t.definition : !!t;
		}
		removeKeyword(e) {
			let { RULES: t } = this;
			delete t.keywords[e], delete t.all[e];
			for (let n of t.rules) {
				let t = n.rules.findIndex((t) => t.keyword === e);
				t >= 0 && n.rules.splice(t, 1);
			}
			return this;
		}
		addFormat(e, t) {
			return typeof t == "string" && (t = new RegExp(t)), this.formats[e] = t, this;
		}
		errorsText(e = this.errors, { separator: t = ", ", dataVar: n = "data" } = {}) {
			return !e || e.length === 0 ? "No errors" : e.map((e) => `${n}${e.instancePath} ${e.message}`).reduce((e, n) => e + t + n);
		}
		$dataMetaSchema(e, t) {
			let n = this.RULES.all;
			e = JSON.parse(JSON.stringify(e));
			for (let r of t) {
				let t = r.split("/").slice(1), i = e;
				for (let e of t) i = i[e];
				for (let e in n) {
					let t = n[e];
					if (typeof t != "object") continue;
					let { $data: r } = t.definition, a = i[e];
					r && a && (i[e] = be(a));
				}
			}
			return e;
		}
		_removeAllSchemas(e, t) {
			for (let n in e) {
				let r = e[n];
				(!t || t.test(n)) && (typeof r == "string" ? delete e[n] : r && !r.meta && (this._cache.delete(r.schema), delete e[n]));
			}
		}
		_addSchema(e, t, n, r = this.opts.validateSchema, i = this.opts.addUsedSchema) {
			let a, { schemaId: o } = this.opts;
			if (typeof e == "object") a = e[o];
			else if (this.opts.jtd) throw Error("schema must be object");
			else if (typeof e != "boolean") throw Error("schema must be object or boolean");
			let s = this._cache.get(e);
			if (s !== void 0) return s;
			n = (0, d.normalizeId)(a || n);
			let c = d.getSchemaRefs.call(this, e, n);
			return s = new l.SchemaEnv({
				schema: e,
				schemaId: o,
				meta: t,
				baseId: n,
				localRefs: c
			}), this._cache.set(s.schema, s), i && !n.startsWith("#") && (n && this._checkUnique(n), this.refs[n] = s), r && this.validateSchema(e, !0), s;
		}
		_checkUnique(e) {
			if (this.schemas[e] || this.refs[e]) throw Error(`schema with key or id "${e}" already exists`);
		}
		_compileSchemaEnv(e) {
			/* istanbul ignore if */
			if (e.meta ? this._compileMetaSchema(e) : l.compileSchema.call(this, e), !e.validate) throw Error("ajv implementation error");
			return e.validate;
		}
		_compileMetaSchema(e) {
			let t = this.opts;
			this.opts = this._metaOpts;
			try {
				l.compileSchema.call(this, e);
			} finally {
				this.opts = t;
			}
		}
	};
	D.ValidationError = i.default, D.MissingRefError = a.default, e.default = D;
	function ie(e, t, n, r = "error") {
		for (let i in e) {
			let a = i;
			a in t && this.logger[r](`${n}: option ${i}. ${e[a]}`);
		}
	}
	function oe(e) {
		return e = (0, d.normalizeId)(e), this.schemas[e] || this.refs[e];
	}
	function se() {
		let e = this.opts.schemas;
		if (e) if (Array.isArray(e)) this.addSchema(e);
		else for (let t in e) this.addSchema(e[t], t);
	}
	function ce() {
		for (let e in this.opts.formats) {
			let t = this.opts.formats[e];
			t && this.addFormat(e, t);
		}
	}
	function ue(e) {
		if (Array.isArray(e)) {
			this.addVocabulary(e);
			return;
		}
		this.logger.warn("keywords option as map is deprecated, pass array");
		for (let t in e) {
			let n = e[t];
			n.keyword ||= t, this.addKeyword(n);
		}
	}
	function de() {
		let e = { ...this.opts };
		for (let t of y) delete e[t];
		return e;
	}
	var fe = {
		log() {},
		warn() {},
		error() {}
	};
	function pe(e) {
		if (e === !1) return fe;
		if (e === void 0) return console;
		if (e.log && e.warn && e.error) return e;
		throw Error("logger must implement log, warn and error methods");
	}
	var me = /^[a-z_$][a-z0-9_$:-]*$/i;
	function he(e, t) {
		let { RULES: n } = this;
		if ((0, h.eachItem)(e, (e) => {
			if (n.keywords[e]) throw Error(`Keyword ${e} is already defined`);
			if (!me.test(e)) throw Error(`Keyword ${e} has invalid name`);
		}), t && t.$data && !("code" in t || "validate" in t)) throw Error("$data keyword must have \"code\" or \"validate\" function");
	}
	function ge(e, t, n) {
		var r;
		let i = t?.post;
		if (n && i) throw Error("keyword with \"post\" flag cannot have \"type\"");
		let { RULES: a } = this, o = i ? a.post : a.rules.find(({ type: e }) => e === n);
		if (o || (o = {
			type: n,
			rules: []
		}, a.rules.push(o)), a.keywords[e] = !0, !t) return;
		let s = {
			keyword: e,
			definition: {
				...t,
				type: (0, p.getJSONTypes)(t.type),
				schemaType: (0, p.getJSONTypes)(t.schemaType)
			}
		};
		t.before ? _e.call(this, o, s, t.before) : o.rules.push(s), a.all[e] = s, (r = t.implements) == null || r.forEach((e) => this.addKeyword(e));
	}
	function _e(e, t, n) {
		let r = e.rules.findIndex((e) => e.keyword === n);
		r >= 0 ? e.rules.splice(r, 0, t) : (e.rules.push(t), this.logger.warn(`rule ${n} is not defined`));
	}
	function ve(e) {
		let { metaSchema: t } = e;
		t !== void 0 && (e.$data && this.opts.$data && (t = be(t)), e.validateSchema = this.compile(t, !0));
	}
	var ye = { $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#" };
	function be(e) {
		return { anyOf: [e, ye] };
	}
})), de = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = {
		keyword: "id",
		code() {
			throw Error("NOT SUPPORTED: keyword \"id\", use \"$id\" for schema ID");
		}
	};
})), fe = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.callRef = e.getValidate = void 0;
	var t = ee(), n = g(), r = s(), i = l(), a = w(), o = c(), u = {
		keyword: "$ref",
		schemaType: "string",
		code(e) {
			let { gen: n, schema: i, it: o } = e, { baseId: s, schemaEnv: c, validateName: l, opts: u, self: p } = o, { root: m } = c;
			if ((i === "#" || i === "#/") && s === m.baseId) return g();
			let h = a.resolveRef.call(p, m, s, i);
			if (h === void 0) throw new t.default(o.opts.uriResolver, s, i);
			if (h instanceof a.SchemaEnv) return _(h);
			return v(h);
			function g() {
				if (c === m) return f(e, l, c, c.$async);
				let t = n.scopeValue("root", { ref: m });
				return f(e, (0, r._)`${t}.validate`, m, m.$async);
			}
			function _(t) {
				f(e, d(e, t), t, t.$async);
			}
			function v(t) {
				let a = n.scopeValue("schema", u.code.source === !0 ? {
					ref: t,
					code: (0, r.stringify)(t)
				} : { ref: t }), o = n.name("valid"), s = e.subschema({
					schema: t,
					dataTypes: [],
					schemaPath: r.nil,
					topSchemaRef: a,
					errSchemaPath: i
				}, o);
				e.mergeEvaluated(s), e.ok(o);
			}
		}
	};
	function d(e, t) {
		let { gen: n } = e;
		return t.validate ? n.scopeValue("validate", { ref: t.validate }) : (0, r._)`${n.scopeValue("wrapper", { ref: t })}.validate`;
	}
	e.getValidate = d;
	function f(e, t, a, s) {
		let { gen: c, it: l } = e, { allErrors: u, schemaEnv: d, opts: f } = l, p = f.passContext ? i.default.this : r.nil;
		s ? m() : h();
		function m() {
			if (!d.$async) throw Error("async schema referenced by sync schema");
			let i = c.let("valid");
			c.try(() => {
				c.code((0, r._)`await ${(0, n.callValidateCode)(e, t, p)}`), _(t), u || c.assign(i, !0);
			}, (e) => {
				c.if((0, r._)`!(${e} instanceof ${l.ValidationError})`, () => c.throw(e)), g(e), u || c.assign(i, !1);
			}), e.ok(i);
		}
		function h() {
			e.result((0, n.callValidateCode)(e, t, p), () => _(t), () => g(t));
		}
		function g(e) {
			let t = (0, r._)`${e}.errors`;
			c.assign(i.default.vErrors, (0, r._)`${i.default.vErrors} === null ? ${t} : ${i.default.vErrors}.concat(${t})`), c.assign(i.default.errors, (0, r._)`${i.default.vErrors}.length`);
		}
		function _(e) {
			if (!l.opts.unevaluated) return;
			let t = a?.validate?.evaluated;
			if (l.props !== !0) if (t && !t.dynamicProps) t.props !== void 0 && (l.props = o.mergeEvaluated.props(c, t.props, l.props));
			else {
				let t = c.var("props", (0, r._)`${e}.evaluated.props`);
				l.props = o.mergeEvaluated.props(c, t, l.props, r.Name);
			}
			if (l.items !== !0) if (t && !t.dynamicItems) t.items !== void 0 && (l.items = o.mergeEvaluated.items(c, t.items, l.items));
			else {
				let t = c.var("items", (0, r._)`${e}.evaluated.items`);
				l.items = o.mergeEvaluated.items(c, t, l.items, r.Name);
			}
		}
	}
	e.callRef = f, e.default = u;
})), pe = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = de(), n = fe();
	e.default = [
		"$schema",
		"$id",
		"$defs",
		"$vocabulary",
		{ keyword: "$comment" },
		"definitions",
		t.default,
		n.default
	];
})), me = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = s(), n = t.operators, r = {
		maximum: {
			okStr: "<=",
			ok: n.LTE,
			fail: n.GT
		},
		minimum: {
			okStr: ">=",
			ok: n.GTE,
			fail: n.LT
		},
		exclusiveMaximum: {
			okStr: "<",
			ok: n.LT,
			fail: n.GTE
		},
		exclusiveMinimum: {
			okStr: ">",
			ok: n.GT,
			fail: n.LTE
		}
	};
	e.default = {
		keyword: Object.keys(r),
		type: "number",
		schemaType: "number",
		$data: !0,
		error: {
			message: ({ keyword: e, schemaCode: n }) => (0, t.str)`must be ${r[e].okStr} ${n}`,
			params: ({ keyword: e, schemaCode: n }) => (0, t._)`{comparison: ${r[e].okStr}, limit: ${n}}`
		},
		code(e) {
			let { keyword: n, data: i, schemaCode: a } = e;
			e.fail$data((0, t._)`${i} ${r[n].fail} ${a} || isNaN(${i})`);
		}
	};
})), he = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = s();
	e.default = {
		keyword: "multipleOf",
		type: "number",
		schemaType: "number",
		$data: !0,
		error: {
			message: ({ schemaCode: e }) => (0, t.str)`must be multiple of ${e}`,
			params: ({ schemaCode: e }) => (0, t._)`{multipleOf: ${e}}`
		},
		code(e) {
			let { gen: n, data: r, schemaCode: i, it: a } = e, o = a.opts.multipleOfPrecision, s = n.let("res"), c = o ? (0, t._)`Math.abs(Math.round(${s}) - ${s}) > 1e-${o}` : (0, t._)`${s} !== parseInt(${s})`;
			e.fail$data((0, t._)`(${i} === 0 || (${s} = ${r}/${i}, ${c}))`);
		}
	};
})), ge = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	function t(e) {
		let t = e.length, n = 0, r = 0, i;
		for (; r < t;) n++, i = e.charCodeAt(r++), i >= 55296 && i <= 56319 && r < t && (i = e.charCodeAt(r), (i & 64512) == 56320 && r++);
		return n;
	}
	e.default = t, t.code = "require(\"ajv/dist/runtime/ucs2length\").default";
})), _e = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = s(), n = c(), r = ge();
	e.default = {
		keyword: ["maxLength", "minLength"],
		type: "string",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: e, schemaCode: n }) {
				let r = e === "maxLength" ? "more" : "fewer";
				return (0, t.str)`must NOT have ${r} than ${n} characters`;
			},
			params: ({ schemaCode: e }) => (0, t._)`{limit: ${e}}`
		},
		code(e) {
			let { keyword: i, data: a, schemaCode: o, it: s } = e, c = i === "maxLength" ? t.operators.GT : t.operators.LT, l = s.opts.unicode === !1 ? (0, t._)`${a}.length` : (0, t._)`${(0, n.useFunc)(e.gen, r.default)}(${a})`;
			e.fail$data((0, t._)`${l} ${c} ${o}`);
		}
	};
})), ve = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = g(), n = c(), r = s();
	e.default = {
		keyword: "pattern",
		type: "string",
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ schemaCode: e }) => (0, r.str)`must match pattern "${e}"`,
			params: ({ schemaCode: e }) => (0, r._)`{pattern: ${e}}`
		},
		code(e) {
			let { gen: i, data: a, $data: o, schema: s, schemaCode: c, it: l } = e, u = l.opts.unicodeRegExp ? "u" : "";
			if (o) {
				let { regExp: t } = l.opts.code, o = t.code === "new RegExp" ? (0, r._)`new RegExp` : (0, n.useFunc)(i, t), s = i.let("valid");
				i.try(() => i.assign(s, (0, r._)`${o}(${c}, ${u}).test(${a})`), () => i.assign(s, !1)), e.fail$data((0, r._)`!${s}`);
			} else {
				let n = (0, t.usePattern)(e, s);
				e.fail$data((0, r._)`!${n}.test(${a})`);
			}
		}
	};
})), ye = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = s();
	e.default = {
		keyword: ["maxProperties", "minProperties"],
		type: "object",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: e, schemaCode: n }) {
				let r = e === "maxProperties" ? "more" : "fewer";
				return (0, t.str)`must NOT have ${r} than ${n} properties`;
			},
			params: ({ schemaCode: e }) => (0, t._)`{limit: ${e}}`
		},
		code(e) {
			let { keyword: n, data: r, schemaCode: i } = e, a = n === "maxProperties" ? t.operators.GT : t.operators.LT;
			e.fail$data((0, t._)`Object.keys(${r}).length ${a} ${i}`);
		}
	};
})), be = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = g(), n = s(), r = c();
	e.default = {
		keyword: "required",
		type: "object",
		schemaType: "array",
		$data: !0,
		error: {
			message: ({ params: { missingProperty: e } }) => (0, n.str)`must have required property '${e}'`,
			params: ({ params: { missingProperty: e } }) => (0, n._)`{missingProperty: ${e}}`
		},
		code(e) {
			let { gen: i, schema: a, schemaCode: o, data: s, $data: c, it: l } = e, { opts: u } = l;
			if (!c && a.length === 0) return;
			let d = a.length >= u.loopRequired;
			if (l.allErrors ? f() : p(), u.strictRequired) {
				let t = e.parentSchema.properties, { definedProperties: n } = e.it;
				for (let e of a) if (t?.[e] === void 0 && !n.has(e)) {
					let t = `required property "${e}" is not defined at "${l.schemaEnv.baseId + l.errSchemaPath}" (strictRequired)`;
					(0, r.checkStrictMode)(l, t, l.opts.strictRequired);
				}
			}
			function f() {
				if (d || c) e.block$data(n.nil, m);
				else for (let n of a) (0, t.checkReportMissingProp)(e, n);
			}
			function p() {
				let n = i.let("missing");
				if (d || c) {
					let t = i.let("valid", !0);
					e.block$data(t, () => h(n, t)), e.ok(t);
				} else i.if((0, t.checkMissingProp)(e, a, n)), (0, t.reportMissingProp)(e, n), i.else();
			}
			function m() {
				i.forOf("prop", o, (n) => {
					e.setParams({ missingProperty: n }), i.if((0, t.noPropertyInData)(i, s, n, u.ownProperties), () => e.error());
				});
			}
			function h(r, a) {
				e.setParams({ missingProperty: r }), i.forOf(r, o, () => {
					i.assign(a, (0, t.propertyInData)(i, s, r, u.ownProperties)), i.if((0, n.not)(a), () => {
						e.error(), i.break();
					});
				}, n.nil);
			}
		}
	};
})), xe = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = s();
	e.default = {
		keyword: ["maxItems", "minItems"],
		type: "array",
		schemaType: "number",
		$data: !0,
		error: {
			message({ keyword: e, schemaCode: n }) {
				let r = e === "maxItems" ? "more" : "fewer";
				return (0, t.str)`must NOT have ${r} than ${n} items`;
			},
			params: ({ schemaCode: e }) => (0, t._)`{limit: ${e}}`
		},
		code(e) {
			let { keyword: n, data: r, schemaCode: i } = e, a = n === "maxItems" ? t.operators.GT : t.operators.LT;
			e.fail$data((0, t._)`${r}.length ${a} ${i}`);
		}
	};
})), Se = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = y();
	t.code = "require(\"ajv/dist/runtime/equal\").default", e.default = t;
})), Ce = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = m(), n = s(), r = c(), i = Se();
	e.default = {
		keyword: "uniqueItems",
		type: "array",
		schemaType: "boolean",
		$data: !0,
		error: {
			message: ({ params: { i: e, j: t } }) => (0, n.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
			params: ({ params: { i: e, j: t } }) => (0, n._)`{i: ${e}, j: ${t}}`
		},
		code(e) {
			let { gen: a, data: o, $data: s, schema: c, parentSchema: l, schemaCode: u, it: d } = e;
			if (!s && !c) return;
			let f = a.let("valid"), p = l.items ? (0, t.getSchemaTypes)(l.items) : [];
			e.block$data(f, m, (0, n._)`${u} === false`), e.ok(f);
			function m() {
				let t = a.let("i", (0, n._)`${o}.length`), r = a.let("j");
				e.setParams({
					i: t,
					j: r
				}), a.assign(f, !0), a.if((0, n._)`${t} > 1`, () => (h() ? g : _)(t, r));
			}
			function h() {
				return p.length > 0 && !p.some((e) => e === "object" || e === "array");
			}
			function g(r, i) {
				let s = a.name("item"), c = (0, t.checkDataTypes)(p, s, d.opts.strictNumbers, t.DataType.Wrong), l = a.const("indices", (0, n._)`{}`);
				a.for((0, n._)`;${r}--;`, () => {
					a.let(s, (0, n._)`${o}[${r}]`), a.if(c, (0, n._)`continue`), p.length > 1 && a.if((0, n._)`typeof ${s} == "string"`, (0, n._)`${s} += "_"`), a.if((0, n._)`typeof ${l}[${s}] == "number"`, () => {
						a.assign(i, (0, n._)`${l}[${s}]`), e.error(), a.assign(f, !1).break();
					}).code((0, n._)`${l}[${s}] = ${r}`);
				});
			}
			function _(t, s) {
				let c = (0, r.useFunc)(a, i.default), l = a.name("outer");
				a.label(l).for((0, n._)`;${t}--;`, () => a.for((0, n._)`${s} = ${t}; ${s}--;`, () => a.if((0, n._)`${c}(${o}[${t}], ${o}[${s}])`, () => {
					e.error(), a.assign(f, !1).break(l);
				})));
			}
		}
	};
})), we = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = s(), n = c(), r = Se();
	e.default = {
		keyword: "const",
		$data: !0,
		error: {
			message: "must be equal to constant",
			params: ({ schemaCode: e }) => (0, t._)`{allowedValue: ${e}}`
		},
		code(e) {
			let { gen: i, data: a, $data: o, schemaCode: s, schema: c } = e;
			o || c && typeof c == "object" ? e.fail$data((0, t._)`!${(0, n.useFunc)(i, r.default)}(${a}, ${s})`) : e.fail((0, t._)`${c} !== ${a}`);
		}
	};
})), Te = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = s(), n = c(), r = Se();
	e.default = {
		keyword: "enum",
		schemaType: "array",
		$data: !0,
		error: {
			message: "must be equal to one of the allowed values",
			params: ({ schemaCode: e }) => (0, t._)`{allowedValues: ${e}}`
		},
		code(e) {
			let { gen: i, data: a, $data: o, schema: s, schemaCode: c, it: l } = e;
			if (!o && s.length === 0) throw Error("enum must have non-empty array");
			let u = s.length >= l.opts.loopEnum, d, f = () => d ??= (0, n.useFunc)(i, r.default), p;
			if (u || o) p = i.let("valid"), e.block$data(p, m);
			else {
				/* istanbul ignore if */
				if (!Array.isArray(s)) throw Error("ajv implementation error");
				let e = i.const("vSchema", c);
				p = (0, t.or)(...s.map((t, n) => h(e, n)));
			}
			e.pass(p);
			function m() {
				i.assign(p, !1), i.forOf("v", c, (e) => i.if((0, t._)`${f()}(${a}, ${e})`, () => i.assign(p, !0).break()));
			}
			function h(e, n) {
				let r = s[n];
				return typeof r == "object" && r ? (0, t._)`${f()}(${a}, ${e}[${n}])` : (0, t._)`${a} === ${r}`;
			}
		}
	};
})), Ee = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = me(), n = he(), r = _e(), i = ve(), a = ye(), o = be(), s = xe(), c = Ce(), l = we(), u = Te();
	e.default = [
		t.default,
		n.default,
		r.default,
		i.default,
		a.default,
		o.default,
		s.default,
		c.default,
		{
			keyword: "type",
			schemaType: ["string", "array"]
		},
		{
			keyword: "nullable",
			schemaType: "boolean"
		},
		l.default,
		u.default
	];
})), De = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.validateAdditionalItems = void 0;
	var t = s(), n = c(), r = {
		keyword: "additionalItems",
		type: "array",
		schemaType: ["boolean", "object"],
		before: "uniqueItems",
		error: {
			message: ({ params: { len: e } }) => (0, t.str)`must NOT have more than ${e} items`,
			params: ({ params: { len: e } }) => (0, t._)`{limit: ${e}}`
		},
		code(e) {
			let { parentSchema: t, it: r } = e, { items: a } = t;
			if (!Array.isArray(a)) {
				(0, n.checkStrictMode)(r, "\"additionalItems\" is ignored when \"items\" is not an array of schemas");
				return;
			}
			i(e, a);
		}
	};
	function i(e, r) {
		let { gen: i, schema: a, data: o, keyword: s, it: c } = e;
		c.items = !0;
		let l = i.const("len", (0, t._)`${o}.length`);
		if (a === !1) e.setParams({ len: r.length }), e.pass((0, t._)`${l} <= ${r.length}`);
		else if (typeof a == "object" && !(0, n.alwaysValidSchema)(c, a)) {
			let n = i.var("valid", (0, t._)`${l} <= ${r.length}`);
			i.if((0, t.not)(n), () => u(n)), e.ok(n);
		}
		function u(a) {
			i.forRange("i", r.length, l, (r) => {
				e.subschema({
					keyword: s,
					dataProp: r,
					dataPropType: n.Type.Num
				}, a), c.allErrors || i.if((0, t.not)(a), () => i.break());
			});
		}
	}
	e.validateAdditionalItems = i, e.default = r;
})), Oe = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.validateTuple = void 0;
	var t = s(), n = c(), r = g(), i = {
		keyword: "items",
		type: "array",
		schemaType: [
			"object",
			"array",
			"boolean"
		],
		before: "uniqueItems",
		code(e) {
			let { schema: t, it: i } = e;
			if (Array.isArray(t)) return a(e, "additionalItems", t);
			i.items = !0, !(0, n.alwaysValidSchema)(i, t) && e.ok((0, r.validateArray)(e));
		}
	};
	function a(e, r, i = e.schema) {
		let { gen: a, parentSchema: o, data: s, keyword: c, it: l } = e;
		f(o), l.opts.unevaluated && i.length && l.items !== !0 && (l.items = n.mergeEvaluated.items(a, i.length, l.items));
		let u = a.name("valid"), d = a.const("len", (0, t._)`${s}.length`);
		i.forEach((r, i) => {
			(0, n.alwaysValidSchema)(l, r) || (a.if((0, t._)`${d} > ${i}`, () => e.subschema({
				keyword: c,
				schemaProp: i,
				dataProp: i
			}, u)), e.ok(u));
		});
		function f(e) {
			let { opts: t, errSchemaPath: a } = l, o = i.length, s = o === e.minItems && (o === e.maxItems || e[r] === !1);
			if (t.strictTuples && !s) {
				let e = `"${c}" is ${o}-tuple, but minItems or maxItems/${r} are not specified or different at path "${a}"`;
				(0, n.checkStrictMode)(l, e, t.strictTuples);
			}
		}
	}
	e.validateTuple = a, e.default = i;
})), ke = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = Oe();
	e.default = {
		keyword: "prefixItems",
		type: "array",
		schemaType: ["array"],
		before: "uniqueItems",
		code: (e) => (0, t.validateTuple)(e, "items")
	};
})), Ae = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = s(), n = c(), r = g(), i = De();
	e.default = {
		keyword: "items",
		type: "array",
		schemaType: ["object", "boolean"],
		before: "uniqueItems",
		error: {
			message: ({ params: { len: e } }) => (0, t.str)`must NOT have more than ${e} items`,
			params: ({ params: { len: e } }) => (0, t._)`{limit: ${e}}`
		},
		code(e) {
			let { schema: t, parentSchema: a, it: o } = e, { prefixItems: s } = a;
			o.items = !0, !(0, n.alwaysValidSchema)(o, t) && (s ? (0, i.validateAdditionalItems)(e, s) : e.ok((0, r.validateArray)(e)));
		}
	};
})), je = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = s(), n = c();
	e.default = {
		keyword: "contains",
		type: "array",
		schemaType: ["object", "boolean"],
		before: "uniqueItems",
		trackErrors: !0,
		error: {
			message: ({ params: { min: e, max: n } }) => n === void 0 ? (0, t.str)`must contain at least ${e} valid item(s)` : (0, t.str)`must contain at least ${e} and no more than ${n} valid item(s)`,
			params: ({ params: { min: e, max: n } }) => n === void 0 ? (0, t._)`{minContains: ${e}}` : (0, t._)`{minContains: ${e}, maxContains: ${n}}`
		},
		code(e) {
			let { gen: r, schema: i, parentSchema: a, data: o, it: s } = e, c, l, { minContains: u, maxContains: d } = a;
			s.opts.next ? (c = u === void 0 ? 1 : u, l = d) : c = 1;
			let f = r.const("len", (0, t._)`${o}.length`);
			if (e.setParams({
				min: c,
				max: l
			}), l === void 0 && c === 0) {
				(0, n.checkStrictMode)(s, "\"minContains\" == 0 without \"maxContains\": \"contains\" keyword ignored");
				return;
			}
			if (l !== void 0 && c > l) {
				(0, n.checkStrictMode)(s, "\"minContains\" > \"maxContains\" is always invalid"), e.fail();
				return;
			}
			if ((0, n.alwaysValidSchema)(s, i)) {
				let n = (0, t._)`${f} >= ${c}`;
				l !== void 0 && (n = (0, t._)`${n} && ${f} <= ${l}`), e.pass(n);
				return;
			}
			s.items = !0;
			let p = r.name("valid");
			l === void 0 && c === 1 ? h(p, () => r.if(p, () => r.break())) : c === 0 ? (r.let(p, !0), l !== void 0 && r.if((0, t._)`${o}.length > 0`, m)) : (r.let(p, !1), m()), e.result(p, () => e.reset());
			function m() {
				let e = r.name("_valid"), t = r.let("count", 0);
				h(e, () => r.if(e, () => g(t)));
			}
			function h(t, i) {
				r.forRange("i", 0, f, (r) => {
					e.subschema({
						keyword: "contains",
						dataProp: r,
						dataPropType: n.Type.Num,
						compositeRule: !0
					}, t), i();
				});
			}
			function g(e) {
				r.code((0, t._)`${e}++`), l === void 0 ? r.if((0, t._)`${e} >= ${c}`, () => r.assign(p, !0).break()) : (r.if((0, t._)`${e} > ${l}`, () => r.assign(p, !1).break()), c === 1 ? r.assign(p, !0) : r.if((0, t._)`${e} >= ${c}`, () => r.assign(p, !0)));
			}
		}
	};
})), Me = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
	var t = s(), n = c(), r = g();
	e.error = {
		message: ({ params: { property: e, depsCount: n, deps: r } }) => {
			let i = n === 1 ? "property" : "properties";
			return (0, t.str)`must have ${i} ${r} when property ${e} is present`;
		},
		params: ({ params: { property: e, depsCount: n, deps: r, missingProperty: i } }) => (0, t._)`{property: ${e},
    missingProperty: ${i},
    depsCount: ${n},
    deps: ${r}}`
	};
	var i = {
		keyword: "dependencies",
		type: "object",
		schemaType: "object",
		error: e.error,
		code(e) {
			let [t, n] = a(e);
			o(e, t), l(e, n);
		}
	};
	function a({ schema: e }) {
		let t = {}, n = {};
		for (let r in e) {
			if (r === "__proto__") continue;
			let i = Array.isArray(e[r]) ? t : n;
			i[r] = e[r];
		}
		return [t, n];
	}
	function o(e, n = e.schema) {
		let { gen: i, data: a, it: o } = e;
		if (Object.keys(n).length === 0) return;
		let s = i.let("missing");
		for (let c in n) {
			let l = n[c];
			if (l.length === 0) continue;
			let u = (0, r.propertyInData)(i, a, c, o.opts.ownProperties);
			e.setParams({
				property: c,
				depsCount: l.length,
				deps: l.join(", ")
			}), o.allErrors ? i.if(u, () => {
				for (let t of l) (0, r.checkReportMissingProp)(e, t);
			}) : (i.if((0, t._)`${u} && (${(0, r.checkMissingProp)(e, l, s)})`), (0, r.reportMissingProp)(e, s), i.else());
		}
	}
	e.validatePropertyDeps = o;
	function l(e, t = e.schema) {
		let { gen: i, data: a, keyword: o, it: s } = e, c = i.name("valid");
		for (let l in t) (0, n.alwaysValidSchema)(s, t[l]) || (i.if((0, r.propertyInData)(i, a, l, s.opts.ownProperties), () => {
			let t = e.subschema({
				keyword: o,
				schemaProp: l
			}, c);
			e.mergeValidEvaluated(t, c);
		}, () => i.var(c, !0)), e.ok(c));
	}
	e.validateSchemaDeps = l, e.default = i;
})), Ne = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = s(), n = c();
	e.default = {
		keyword: "propertyNames",
		type: "object",
		schemaType: ["object", "boolean"],
		error: {
			message: "property name must be valid",
			params: ({ params: e }) => (0, t._)`{propertyName: ${e.propertyName}}`
		},
		code(e) {
			let { gen: r, schema: i, data: a, it: o } = e;
			if ((0, n.alwaysValidSchema)(o, i)) return;
			let s = r.name("valid");
			r.forIn("key", a, (n) => {
				e.setParams({ propertyName: n }), e.subschema({
					keyword: "propertyNames",
					data: n,
					dataTypes: ["string"],
					propertyName: n,
					compositeRule: !0
				}, s), r.if((0, t.not)(s), () => {
					e.error(!0), o.allErrors || r.break();
				});
			}), e.ok(s);
		}
	};
})), Pe = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = g(), n = s(), r = l(), i = c();
	e.default = {
		keyword: "additionalProperties",
		type: ["object"],
		schemaType: ["boolean", "object"],
		allowUndefined: !0,
		trackErrors: !0,
		error: {
			message: "must NOT have additional properties",
			params: ({ params: e }) => (0, n._)`{additionalProperty: ${e.additionalProperty}}`
		},
		code(e) {
			let { gen: a, schema: o, parentSchema: s, data: c, errsCount: l, it: u } = e;
			/* istanbul ignore if */
			if (!l) throw Error("ajv implementation error");
			let { allErrors: d, opts: f } = u;
			if (u.props = !0, f.removeAdditional !== "all" && (0, i.alwaysValidSchema)(u, o)) return;
			let p = (0, t.allSchemaProperties)(s.properties), m = (0, t.allSchemaProperties)(s.patternProperties);
			h(), e.ok((0, n._)`${l} === ${r.default.errors}`);
			function h() {
				a.forIn("key", c, (e) => {
					!p.length && !m.length ? v(e) : a.if(g(e), () => v(e));
				});
			}
			function g(r) {
				let o;
				if (p.length > 8) {
					let e = (0, i.schemaRefOrVal)(u, s.properties, "properties");
					o = (0, t.isOwnProperty)(a, e, r);
				} else o = p.length ? (0, n.or)(...p.map((e) => (0, n._)`${r} === ${e}`)) : n.nil;
				return m.length && (o = (0, n.or)(o, ...m.map((i) => (0, n._)`${(0, t.usePattern)(e, i)}.test(${r})`))), (0, n.not)(o);
			}
			function _(e) {
				a.code((0, n._)`delete ${c}[${e}]`);
			}
			function v(t) {
				if (f.removeAdditional === "all" || f.removeAdditional && o === !1) {
					_(t);
					return;
				}
				if (o === !1) {
					e.setParams({ additionalProperty: t }), e.error(), d || a.break();
					return;
				}
				if (typeof o == "object" && !(0, i.alwaysValidSchema)(u, o)) {
					let r = a.name("valid");
					f.removeAdditional === "failing" ? (y(t, r, !1), a.if((0, n.not)(r), () => {
						e.reset(), _(t);
					})) : (y(t, r), d || a.if((0, n.not)(r), () => a.break()));
				}
			}
			function y(t, n, r) {
				let a = {
					keyword: "additionalProperties",
					dataProp: t,
					dataPropType: i.Type.Str
				};
				r === !1 && Object.assign(a, {
					compositeRule: !0,
					createErrors: !1,
					allErrors: !1
				}), e.subschema(a, n);
			}
		}
	};
})), Fe = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = S(), n = g(), r = c(), i = Pe();
	e.default = {
		keyword: "properties",
		type: "object",
		schemaType: "object",
		code(e) {
			let { gen: a, schema: o, parentSchema: s, data: c, it: l } = e;
			l.opts.removeAdditional === "all" && s.additionalProperties === void 0 && i.default.code(new t.KeywordCxt(l, i.default, "additionalProperties"));
			let u = (0, n.allSchemaProperties)(o);
			for (let e of u) l.definedProperties.add(e);
			l.opts.unevaluated && u.length && l.props !== !0 && (l.props = r.mergeEvaluated.props(a, (0, r.toHash)(u), l.props));
			let d = u.filter((e) => !(0, r.alwaysValidSchema)(l, o[e]));
			if (d.length === 0) return;
			let f = a.name("valid");
			for (let t of d) p(t) ? m(t) : (a.if((0, n.propertyInData)(a, c, t, l.opts.ownProperties)), m(t), l.allErrors || a.else().var(f, !0), a.endIf()), e.it.definedProperties.add(t), e.ok(f);
			function p(e) {
				return l.opts.useDefaults && !l.compositeRule && o[e].default !== void 0;
			}
			function m(t) {
				e.subschema({
					keyword: "properties",
					schemaProp: t,
					dataProp: t
				}, f);
			}
		}
	};
})), Ie = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = g(), n = s(), r = c(), i = c();
	e.default = {
		keyword: "patternProperties",
		type: "object",
		schemaType: "object",
		code(e) {
			let { gen: a, schema: o, data: s, parentSchema: c, it: l } = e, { opts: u } = l, d = (0, t.allSchemaProperties)(o), f = d.filter((e) => (0, r.alwaysValidSchema)(l, o[e]));
			if (d.length === 0 || f.length === d.length && (!l.opts.unevaluated || l.props === !0)) return;
			let p = u.strictSchema && !u.allowMatchingProperties && c.properties, m = a.name("valid");
			l.props !== !0 && !(l.props instanceof n.Name) && (l.props = (0, i.evaluatedPropsToName)(a, l.props));
			let { props: h } = l;
			g();
			function g() {
				for (let e of d) p && _(e), l.allErrors ? v(e) : (a.var(m, !0), v(e), a.if(m));
			}
			function _(e) {
				for (let t in p) new RegExp(e).test(t) && (0, r.checkStrictMode)(l, `property ${t} matches pattern ${e} (use allowMatchingProperties)`);
			}
			function v(r) {
				a.forIn("key", s, (o) => {
					a.if((0, n._)`${(0, t.usePattern)(e, r)}.test(${o})`, () => {
						let t = f.includes(r);
						t || e.subschema({
							keyword: "patternProperties",
							schemaProp: r,
							dataProp: o,
							dataPropType: i.Type.Str
						}, m), l.opts.unevaluated && h !== !0 ? a.assign((0, n._)`${h}[${o}]`, !0) : !t && !l.allErrors && a.if((0, n.not)(m), () => a.break());
					});
				});
			}
		}
	};
})), Le = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = c();
	e.default = {
		keyword: "not",
		schemaType: ["object", "boolean"],
		trackErrors: !0,
		code(e) {
			let { gen: n, schema: r, it: i } = e;
			if ((0, t.alwaysValidSchema)(i, r)) {
				e.fail();
				return;
			}
			let a = n.name("valid");
			e.subschema({
				keyword: "not",
				compositeRule: !0,
				createErrors: !1,
				allErrors: !1
			}, a), e.failResult(a, () => e.reset(), () => e.error());
		},
		error: { message: "must NOT be valid" }
	};
})), Re = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = {
		keyword: "anyOf",
		schemaType: "array",
		trackErrors: !0,
		code: g().validateUnion,
		error: { message: "must match a schema in anyOf" }
	};
})), ze = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = s(), n = c();
	e.default = {
		keyword: "oneOf",
		schemaType: "array",
		trackErrors: !0,
		error: {
			message: "must match exactly one schema in oneOf",
			params: ({ params: e }) => (0, t._)`{passingSchemas: ${e.passing}}`
		},
		code(e) {
			let { gen: r, schema: i, parentSchema: a, it: o } = e;
			/* istanbul ignore if */
			if (!Array.isArray(i)) throw Error("ajv implementation error");
			if (o.opts.discriminator && a.discriminator) return;
			let s = i, c = r.let("valid", !1), l = r.let("passing", null), u = r.name("_valid");
			e.setParams({ passing: l }), r.block(d), e.result(c, () => e.reset(), () => e.error(!0));
			function d() {
				s.forEach((i, a) => {
					let s;
					(0, n.alwaysValidSchema)(o, i) ? r.var(u, !0) : s = e.subschema({
						keyword: "oneOf",
						schemaProp: a,
						compositeRule: !0
					}, u), a > 0 && r.if((0, t._)`${u} && ${c}`).assign(c, !1).assign(l, (0, t._)`[${l}, ${a}]`).else(), r.if(u, () => {
						r.assign(c, !0), r.assign(l, a), s && e.mergeEvaluated(s, t.Name);
					});
				});
			}
		}
	};
})), Be = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = c();
	e.default = {
		keyword: "allOf",
		schemaType: "array",
		code(e) {
			let { gen: n, schema: r, it: i } = e;
			/* istanbul ignore if */
			if (!Array.isArray(r)) throw Error("ajv implementation error");
			let a = n.name("valid");
			r.forEach((n, r) => {
				if ((0, t.alwaysValidSchema)(i, n)) return;
				let o = e.subschema({
					keyword: "allOf",
					schemaProp: r
				}, a);
				e.ok(a), e.mergeEvaluated(o);
			});
		}
	};
})), Ve = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = s(), n = c(), r = {
		keyword: "if",
		schemaType: ["object", "boolean"],
		trackErrors: !0,
		error: {
			message: ({ params: e }) => (0, t.str)`must match "${e.ifClause}" schema`,
			params: ({ params: e }) => (0, t._)`{failingKeyword: ${e.ifClause}}`
		},
		code(e) {
			let { gen: r, parentSchema: a, it: o } = e;
			a.then === void 0 && a.else === void 0 && (0, n.checkStrictMode)(o, "\"if\" without \"then\" and \"else\" is ignored");
			let s = i(o, "then"), c = i(o, "else");
			if (!s && !c) return;
			let l = r.let("valid", !0), u = r.name("_valid");
			if (d(), e.reset(), s && c) {
				let t = r.let("ifClause");
				e.setParams({ ifClause: t }), r.if(u, f("then", t), f("else", t));
			} else s ? r.if(u, f("then")) : r.if((0, t.not)(u), f("else"));
			e.pass(l, () => e.error(!0));
			function d() {
				let t = e.subschema({
					keyword: "if",
					compositeRule: !0,
					createErrors: !1,
					allErrors: !1
				}, u);
				e.mergeEvaluated(t);
			}
			function f(n, i) {
				return () => {
					let a = e.subschema({ keyword: n }, u);
					r.assign(l, u), e.mergeValidEvaluated(a, l), i ? r.assign(i, (0, t._)`${n}`) : e.setParams({ ifClause: n });
				};
			}
		}
	};
	function i(e, t) {
		let r = e.schema[t];
		return r !== void 0 && !(0, n.alwaysValidSchema)(e, r);
	}
	e.default = r;
})), He = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = c();
	e.default = {
		keyword: ["then", "else"],
		schemaType: ["object", "boolean"],
		code({ keyword: e, parentSchema: n, it: r }) {
			n.if === void 0 && (0, t.checkStrictMode)(r, `"${e}" without "if" is ignored`);
		}
	};
})), Ue = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = De(), n = ke(), r = Oe(), i = Ae(), a = je(), o = Me(), s = Ne(), c = Pe(), l = Fe(), u = Ie(), d = Le(), f = Re(), p = ze(), m = Be(), h = Ve(), g = He();
	function _(e = !1) {
		let _ = [
			d.default,
			f.default,
			p.default,
			m.default,
			h.default,
			g.default,
			s.default,
			c.default,
			o.default,
			l.default,
			u.default
		];
		return e ? _.push(n.default, i.default) : _.push(t.default, r.default), _.push(a.default), _;
	}
	e.default = _;
})), We = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = s();
	e.default = {
		keyword: "format",
		type: ["number", "string"],
		schemaType: "string",
		$data: !0,
		error: {
			message: ({ schemaCode: e }) => (0, t.str)`must match format "${e}"`,
			params: ({ schemaCode: e }) => (0, t._)`{format: ${e}}`
		},
		code(e, n) {
			let { gen: r, data: i, $data: a, schema: o, schemaCode: s, it: c } = e, { opts: l, errSchemaPath: u, schemaEnv: d, self: f } = c;
			if (!l.validateFormats) return;
			a ? p() : m();
			function p() {
				let a = r.scopeValue("formats", {
					ref: f.formats,
					code: l.code.formats
				}), o = r.const("fDef", (0, t._)`${a}[${s}]`), c = r.let("fType"), u = r.let("format");
				r.if((0, t._)`typeof ${o} == "object" && !(${o} instanceof RegExp)`, () => r.assign(c, (0, t._)`${o}.type || "string"`).assign(u, (0, t._)`${o}.validate`), () => r.assign(c, (0, t._)`"string"`).assign(u, o)), e.fail$data((0, t.or)(p(), m()));
				function p() {
					return l.strictSchema === !1 ? t.nil : (0, t._)`${s} && !${u}`;
				}
				function m() {
					let e = d.$async ? (0, t._)`(${o}.async ? await ${u}(${i}) : ${u}(${i}))` : (0, t._)`${u}(${i})`, r = (0, t._)`(typeof ${u} == "function" ? ${e} : ${u}.test(${i}))`;
					return (0, t._)`${u} && ${u} !== true && ${c} === ${n} && !${r}`;
				}
			}
			function m() {
				let a = f.formats[o];
				if (!a) {
					m();
					return;
				}
				if (a === !0) return;
				let [s, c, p] = h(a);
				s === n && e.pass(g());
				function m() {
					if (l.strictSchema === !1) {
						f.logger.warn(e());
						return;
					}
					throw Error(e());
					function e() {
						return `unknown format "${o}" ignored in schema at path "${u}"`;
					}
				}
				function h(e) {
					let n = e instanceof RegExp ? (0, t.regexpCode)(e) : l.code.formats ? (0, t._)`${l.code.formats}${(0, t.getProperty)(o)}` : void 0, i = r.scopeValue("formats", {
						key: o,
						ref: e,
						code: n
					});
					return typeof e == "object" && !(e instanceof RegExp) ? [
						e.type || "string",
						e.validate,
						(0, t._)`${i}.validate`
					] : [
						"string",
						e,
						i
					];
				}
				function g() {
					if (typeof a == "object" && !(a instanceof RegExp) && a.async) {
						if (!d.$async) throw Error("async format in sync schema");
						return (0, t._)`await ${p}(${i})`;
					}
					return typeof c == "function" ? (0, t._)`${p}(${i})` : (0, t._)`${p}.test(${i})`;
				}
			}
		}
	};
})), Ge = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.default = [We().default];
})), Ke = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.contentVocabulary = e.metadataVocabulary = void 0, e.metadataVocabulary = [
		"title",
		"description",
		"default",
		"deprecated",
		"readOnly",
		"writeOnly",
		"examples"
	], e.contentVocabulary = [
		"contentMediaType",
		"contentEncoding",
		"contentSchema"
	];
})), qe = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = pe(), n = Ee(), r = Ue(), i = Ge(), a = Ke();
	e.default = [
		t.default,
		n.default,
		(0, r.default)(),
		i.default,
		a.metadataVocabulary,
		a.contentVocabulary
	];
})), Je = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.DiscrError = void 0;
	var t;
	(function(e) {
		e.Tag = "tag", e.Mapping = "mapping";
	})(t || (e.DiscrError = t = {}));
})), Ye = /* @__PURE__ */ i(((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	var t = s(), n = Je(), r = w(), i = ee(), a = c();
	e.default = {
		keyword: "discriminator",
		type: "object",
		schemaType: "object",
		error: {
			message: ({ params: { discrError: e, tagName: t } }) => e === n.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
			params: ({ params: { discrError: e, tag: n, tagName: r } }) => (0, t._)`{error: ${e}, tag: ${r}, tagValue: ${n}}`
		},
		code(e) {
			let { gen: o, data: s, schema: c, parentSchema: l, it: u } = e, { oneOf: d } = l;
			if (!u.opts.discriminator) throw Error("discriminator: requires discriminator option");
			let f = c.propertyName;
			if (typeof f != "string") throw Error("discriminator: requires propertyName");
			if (c.mapping) throw Error("discriminator: mapping is not supported");
			if (!d) throw Error("discriminator: requires oneOf keyword");
			let p = o.let("valid", !1), m = o.const("tag", (0, t._)`${s}${(0, t.getProperty)(f)}`);
			o.if((0, t._)`typeof ${m} == "string"`, () => h(), () => e.error(!1, {
				discrError: n.DiscrError.Tag,
				tag: m,
				tagName: f
			})), e.ok(p);
			function h() {
				let r = _();
				o.if(!1);
				for (let e in r) o.elseIf((0, t._)`${m} === ${e}`), o.assign(p, g(r[e]));
				o.else(), e.error(!1, {
					discrError: n.DiscrError.Mapping,
					tag: m,
					tagName: f
				}), o.endIf();
			}
			function g(n) {
				let r = o.name("valid"), i = e.subschema({
					keyword: "oneOf",
					schemaProp: n
				}, r);
				return e.mergeEvaluated(i, t.Name), r;
			}
			function _() {
				let e = {}, t = o(l), n = !0;
				for (let e = 0; e < d.length; e++) {
					let c = d[e];
					if (c?.$ref && !(0, a.schemaHasRulesButRef)(c, u.self.RULES)) {
						let e = c.$ref;
						if (c = r.resolveRef.call(u.self, u.schemaEnv.root, u.baseId, e), c instanceof r.SchemaEnv && (c = c.schema), c === void 0) throw new i.default(u.opts.uriResolver, u.baseId, e);
					}
					let l = c?.properties?.[f];
					if (typeof l != "object") throw Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${f}"`);
					n &&= t || o(c), s(l, e);
				}
				if (!n) throw Error(`discriminator: "${f}" must be required`);
				return e;
				function o({ required: e }) {
					return Array.isArray(e) && e.includes(f);
				}
				function s(e, t) {
					if (e.const) c(e.const, t);
					else if (e.enum) for (let n of e.enum) c(n, t);
					else throw Error(`discriminator: "properties/${f}" must have "const" or "enum"`);
				}
				function c(t, n) {
					if (typeof t != "string" || t in e) throw Error(`discriminator: "${f}" values must be unique strings`);
					e[t] = n;
				}
			}
		}
	};
})), Xe = /* @__PURE__ */ r({
	$id: () => Qe,
	$schema: () => Ze,
	default: () => rt,
	definitions: () => et,
	properties: () => nt,
	title: () => $e,
	type: () => tt
}), Ze, Qe, $e, et, tt, nt, rt, it = n((() => {
	Ze = "http://json-schema.org/draft-07/schema#", Qe = "http://json-schema.org/draft-07/schema#", $e = "Core schema meta-schema", et = {
		schemaArray: {
			type: "array",
			minItems: 1,
			items: { $ref: "#" }
		},
		nonNegativeInteger: {
			type: "integer",
			minimum: 0
		},
		nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] },
		simpleTypes: { enum: [
			"array",
			"boolean",
			"integer",
			"null",
			"number",
			"object",
			"string"
		] },
		stringArray: {
			type: "array",
			items: { type: "string" },
			uniqueItems: !0,
			default: []
		}
	}, tt = ["object", "boolean"], nt = {
		$id: {
			type: "string",
			format: "uri-reference"
		},
		$schema: {
			type: "string",
			format: "uri"
		},
		$ref: {
			type: "string",
			format: "uri-reference"
		},
		$comment: { type: "string" },
		title: { type: "string" },
		description: { type: "string" },
		default: !0,
		readOnly: {
			type: "boolean",
			default: !1
		},
		examples: {
			type: "array",
			items: !0
		},
		multipleOf: {
			type: "number",
			exclusiveMinimum: 0
		},
		maximum: { type: "number" },
		exclusiveMaximum: { type: "number" },
		minimum: { type: "number" },
		exclusiveMinimum: { type: "number" },
		maxLength: { $ref: "#/definitions/nonNegativeInteger" },
		minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
		pattern: {
			type: "string",
			format: "regex"
		},
		additionalItems: { $ref: "#" },
		items: {
			anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
			default: !0
		},
		maxItems: { $ref: "#/definitions/nonNegativeInteger" },
		minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
		uniqueItems: {
			type: "boolean",
			default: !1
		},
		contains: { $ref: "#" },
		maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
		minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
		required: { $ref: "#/definitions/stringArray" },
		additionalProperties: { $ref: "#" },
		definitions: {
			type: "object",
			additionalProperties: { $ref: "#" },
			default: {}
		},
		properties: {
			type: "object",
			additionalProperties: { $ref: "#" },
			default: {}
		},
		patternProperties: {
			type: "object",
			additionalProperties: { $ref: "#" },
			propertyNames: { format: "regex" },
			default: {}
		},
		dependencies: {
			type: "object",
			additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] }
		},
		propertyNames: { $ref: "#" },
		const: !0,
		enum: {
			type: "array",
			items: !0,
			minItems: 1,
			uniqueItems: !0
		},
		type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, {
			type: "array",
			items: { $ref: "#/definitions/simpleTypes" },
			minItems: 1,
			uniqueItems: !0
		}] },
		format: { type: "string" },
		contentMediaType: { type: "string" },
		contentEncoding: { type: "string" },
		if: { $ref: "#" },
		then: { $ref: "#" },
		else: { $ref: "#" },
		allOf: { $ref: "#/definitions/schemaArray" },
		anyOf: { $ref: "#/definitions/schemaArray" },
		oneOf: { $ref: "#/definitions/schemaArray" },
		not: { $ref: "#" }
	}, rt = {
		$schema: Ze,
		$id: Qe,
		title: $e,
		definitions: et,
		type: tt,
		properties: nt,
		default: !0
	};
})), at = /* @__PURE__ */ e((/* @__PURE__ */ i(((e, n) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.MissingRefError = e.ValidationError = e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = e.Ajv = void 0;
	var r = ue(), i = qe(), a = Ye(), o = (it(), t(Xe).default), c = ["/properties"], l = "http://json-schema.org/draft-07/schema", u = class extends r.default {
		_addVocabularies() {
			super._addVocabularies(), i.default.forEach((e) => this.addVocabulary(e)), this.opts.discriminator && this.addKeyword(a.default);
		}
		_addDefaultMetaSchema() {
			if (super._addDefaultMetaSchema(), !this.opts.meta) return;
			let e = this.opts.$data ? this.$dataMetaSchema(o, c) : o;
			this.addMetaSchema(e, l, !1), this.refs["http://json-schema.org/schema"] = l;
		}
		defaultMeta() {
			return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
		}
	};
	e.Ajv = u, n.exports = e = u, n.exports.Ajv = u, Object.defineProperty(e, "__esModule", { value: !0 }), e.default = u;
	var d = S();
	Object.defineProperty(e, "KeywordCxt", {
		enumerable: !0,
		get: function() {
			return d.KeywordCxt;
		}
	});
	var f = s();
	Object.defineProperty(e, "_", {
		enumerable: !0,
		get: function() {
			return f._;
		}
	}), Object.defineProperty(e, "str", {
		enumerable: !0,
		get: function() {
			return f.str;
		}
	}), Object.defineProperty(e, "stringify", {
		enumerable: !0,
		get: function() {
			return f.stringify;
		}
	}), Object.defineProperty(e, "nil", {
		enumerable: !0,
		get: function() {
			return f.nil;
		}
	}), Object.defineProperty(e, "Name", {
		enumerable: !0,
		get: function() {
			return f.Name;
		}
	}), Object.defineProperty(e, "CodeGen", {
		enumerable: !0,
		get: function() {
			return f.CodeGen;
		}
	});
	var p = C();
	Object.defineProperty(e, "ValidationError", {
		enumerable: !0,
		get: function() {
			return p.default;
		}
	});
	var m = ee();
	Object.defineProperty(e, "MissingRefError", {
		enumerable: !0,
		get: function() {
			return m.default;
		}
	});
})))());
function O(e, t = "or") {
	switch (e.length) {
		case 0: return "";
		case 1: return e[0];
		case 2: return `${e[0]} ${t} ${e[1]}`;
		default: return `${e.slice(0, -1).join(", ")} ${t} ${e.at(-1)}`;
	}
}
//#endregion
//#region node_modules/html-validate/dist/esm/meta-helper.js
function ot(...e) {
	return (t) => e.some((e) => t.hasAttribute(e)) ? null : `requires ${O(e.map((e) => `"${e}"`))} attribute to be present`;
}
function st(...e) {
	return (t) => {
		let n = e.filter((e) => t.hasAttribute(e));
		return n.length === 0 ? null : `cannot be used at the same time as ${O(n.map((e) => `"${e}"`))}`;
	};
}
function ct(e, t, { defaultValue: n } = {}) {
	return (r) => {
		let i = r.getAttribute(e);
		if (i && typeof i != "string") return null;
		let a = i ?? n;
		return a && t.includes(a.toLocaleLowerCase()) ? null : `"${e}" attribute must be ${O(t.map((e) => `"${e}"`))}`;
	};
}
function lt(...e) {
	return (t) => e.some((e) => t.closest(e)) ? null : `requires ${O(e.map((e) => `<${e}>`))} as parent`;
}
function ut(e, t) {
	return e.toLowerCase().split(/\s+/).includes(t);
}
var dt = {
	allowedIfAttributeIsPresent: ot,
	allowedIfAttributeIsAbsent: st,
	allowedIfAttributeHasValue: ct,
	allowedIfParentIsPresent: lt,
	hasKeyword: ut
};
//#endregion
//#region node_modules/html-validate/dist/esm/utils/parse-image-candidate-string.js
function ft(e) {
	return e.trim() ? e.split(",").map((e) => {
		let t = e.trim().split(/\s+/), n = t[0];
		if (!n) return {
			url: "",
			descriptor: "none",
			raw: null
		};
		if (t.length < 2) return {
			url: n,
			descriptor: "none",
			raw: null
		};
		let r = t.at(-1);
		return /^\d+w$/i.test(r) ? {
			url: n,
			descriptor: "width",
			value: Math.trunc(Number(r.slice(0, -1))),
			raw: r
		} : /^(?:\d*\.\d+|\d+(?:\.\d+)?)x$/i.test(r) ? {
			url: n,
			descriptor: "density",
			value: Number(r.slice(0, -1)),
			raw: r
		} : {
			url: n,
			descriptor: "none",
			raw: r
		};
	}) : [];
}
//#endregion
//#region node_modules/html-validate/dist/esm/elements.js
var { allowedIfAttributeIsPresent: k, allowedIfAttributeIsAbsent: pt, allowedIfAttributeHasValue: A, allowedIfParentIsPresent: mt, hasKeyword: ht } = dt, j = {
	name: "a valid id",
	pattern: /^\S+$/
}, M = {
	name: "a positive integer",
	pattern: /^\d+$/
}, N = {
	name: "a non-empty string",
	pattern: /^.+$/
}, gt = {
	name: "a browsing context name (non-empty string, must not start with `_`)",
	pattern: /^[^_].*$/
}, _t = {
	name: "a floating-point number",
	pattern: /^-?(\d+(\.\d+)?|\.\d+)(E[+-]?\d+)?$/i
}, vt = [
	"",
	"no-referrer",
	"no-referrer-when-downgrade",
	"same-origin",
	"origin",
	"strict-origin",
	"origin-when-cross-origin",
	"strict-origin-when-cross-origin",
	"unsafe-url"
];
function yt(e) {
	return !!e.closest([
		"article",
		"aside",
		"main",
		"nav",
		"section",
		"[role=\"article\"]",
		"[role=\"complementary\"]",
		"[role=\"main\"]",
		"[role=\"navigation\"]",
		"[role=\"region\"]"
	].join(","));
}
function bt(e) {
	return ft(e).some((e) => e.descriptor === "width");
}
function xt(e) {
	if (e.hasAttribute("itemprop")) return !0;
	let t = e.getAttribute("rel");
	if (!t || typeof t != "string") return !1;
	let n = /* @__PURE__ */ new Set([
		"dns-prefetch",
		"modulepreload",
		"pingback",
		"preconnect",
		"prefetch",
		"preload",
		"stylesheet"
	]);
	return t.toLowerCase().split(/\s+/).some((e) => n.has(e));
}
var St = {
	"*": { attributes: {
		accesskey: {
			enum: [/./u],
			list: !0
		},
		"aria-activedescendant": {
			enum: [j],
			reference: "id"
		},
		"aria-controls": {
			list: !0,
			enum: [j],
			reference: "id"
		},
		"aria-describedby": {
			list: !0,
			enum: [j],
			reference: "id"
		},
		"aria-details": {
			enum: [j],
			reference: "id"
		},
		"aria-errormessage": {
			enum: [j],
			reference: "id"
		},
		"aria-flowto": {
			list: !0,
			enum: [j],
			reference: "id"
		},
		"aria-labelledby": {
			list: !0,
			enum: [j],
			reference: "id"
		},
		"aria-owns": {
			list: !0,
			enum: [j],
			reference: "id"
		},
		"aria-*": {},
		autocapitalize: { enum: [
			"off",
			"none",
			"on",
			"sentences",
			"words",
			"characters"
		] },
		autocorrect: {
			omit: !0,
			enum: ["on", "off"]
		},
		autofocus: { boolean: !0 },
		class: {},
		contenteditable: {
			omit: !0,
			enum: ["true", "false"]
		},
		contextmenu: { deprecated: !0 },
		"data-*": {},
		dir: { enum: [
			"ltr",
			"rtl",
			"auto"
		] },
		draggable: { enum: ["true", "false"] },
		enterkeyhint: { enum: [
			"enter",
			"done",
			"go",
			"next",
			"previous",
			"search",
			"send"
		] },
		exportparts: {},
		headingoffset: { enum: ["/^[0-8]$/"] },
		headingreset: { boolean: !0 },
		hidden: {
			omit: !0,
			enum: ["hidden", "until-found"]
		},
		id: { enum: [j] },
		inert: { boolean: !0 },
		inputmode: { enum: [
			"none",
			"text",
			"decimal",
			"numeric",
			"tel",
			"search",
			"email",
			"url"
		] },
		is: {},
		itemid: {},
		itemprop: {},
		itemref: {},
		itemscope: { boolean: !0 },
		itemtype: {},
		lang: {},
		nonce: {},
		"on*": {},
		part: {},
		popover: {
			omit: !0,
			enum: [
				"auto",
				"hint",
				"manual"
			]
		},
		role: {},
		slot: {},
		spellcheck: {
			omit: !0,
			enum: ["true", "false"]
		},
		style: {},
		tabindex: { enum: ["/-?\\d+/"] },
		title: {},
		translate: {
			omit: !0,
			enum: ["yes", "no"]
		},
		writingsuggestions: {
			omit: !0,
			enum: ["true", "false"]
		},
		"xml:*": {},
		xmlns: { enum: [N] },
		"xmlns:*": { enum: [N] }
	} },
	a: {
		flow: !0,
		focusable(e) {
			return e.hasAttribute("href");
		},
		phrasing: !0,
		interactive(e) {
			return e.hasAttribute("href");
		},
		transparent: !0,
		attributes: {
			charset: { deprecated: !0 },
			coords: { deprecated: !0 },
			datafld: { deprecated: !0 },
			datasrc: { deprecated: !0 },
			download: {
				allowed: k("href"),
				omit: !0,
				enum: [N]
			},
			href: { enum: ["/.*/"] },
			hreflang: { allowed: k("href") },
			itemprop: { allowed: k("href") },
			methods: { deprecated: !0 },
			name: { deprecated: !0 },
			ping: { allowed: k("href") },
			referrerpolicy: {
				allowed: k("href"),
				enum: vt
			},
			rel: {
				allowed(e, t) {
					if (!e.hasAttribute("href")) return "requires \"href\" attribute to be present";
					if (!t || t === "" || typeof t != "string") return null;
					let n = /* @__PURE__ */ new Set(/* @__PURE__ */ "canonical,dns-prefetch,expect,icon,manifest,modulepreload,pingback,preconnect,prefetch,preload,stylesheet,apple-touch-icon,apple-touch-icon-precomposed,apple-touch-startup-image,authorization_endpoint,component,chrome-webstore-item,edit,gbfs,gtfs-static,gtfs-realtime,import,mask-icon,meta,micropub,openid.delegate,openid.server,openid2.local_id,openid2.provider,p3pv1,pgpkey,schema.dcterms,service,shortlink,sitemap,subresource,sword,timesheet,token_endpoint,wlwmanifest,stylesheet/less,yandex-tableau-widget".split(",")), r = t.toLowerCase().split(/\s+/);
					for (let e of r) if (n.has(e) || e.startsWith("dcterms.")) return `<a> does not allow rel="${e}"`;
					return null;
				},
				list: !0,
				enum: [N]
			},
			shape: { deprecated: !0 },
			target: {
				allowed: k("href"),
				enum: [
					gt,
					"_blank",
					"_self",
					"_parent",
					"_top"
				]
			},
			type: { allowed: k("href") },
			urn: { deprecated: !0 }
		},
		permittedDescendants: [{ exclude: ["@interactive", "a"] }],
		aria: {
			implicitRole(e) {
				return e.hasAttribute("href") ? "link" : "generic";
			},
			naming(e) {
				return e.hasAttribute("href") ? "allowed" : "prohibited";
			}
		}
	},
	abbr: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: { naming: "prohibited" }
	},
	acronym: { deprecated: {
		message: "use <abbr> instead",
		documentation: "`<abbr>` can be used as a replacement.",
		source: "html5"
	} },
	address: {
		flow: !0,
		aria: { implicitRole: "group" },
		permittedContent: ["@flow"],
		permittedDescendants: [{ exclude: [
			"address",
			"header",
			"footer",
			"@heading",
			"@sectioning"
		] }]
	},
	applet: {
		deprecated: { source: "html5" },
		attributes: {
			datafld: { deprecated: !0 },
			datasrc: { deprecated: !0 }
		}
	},
	area: {
		flow(e) {
			return !!e.closest("map");
		},
		focusable(e) {
			return e.hasAttribute("href");
		},
		phrasing(e) {
			return !!e.closest("map");
		},
		void: !0,
		attributes: {
			alt: {},
			coords: { allowed(e) {
				return e.getAttribute("shape") === "default" ? "cannot be used when \"shape\" attribute is \"default\"" : null;
			} },
			download: { allowed: k("href") },
			nohref: { deprecated: !0 },
			itemprop: { allowed: k("href") },
			ping: { allowed: k("href") },
			referrerpolicy: {
				allowed: k("href"),
				enum: vt
			},
			rel: { allowed(e, t) {
				if (!e.hasAttribute("href")) return "requires \"href\" attribute to be present";
				if (!t || t === "" || typeof t != "string") return null;
				let n = /* @__PURE__ */ new Set(/* @__PURE__ */ "canonical,dns-prefetch,expect,icon,manifest,modulepreload,pingback,preconnect,prefetch,preload,stylesheet,apple-touch-icon,apple-touch-icon-precomposed,apple-touch-startup-image,authorization_endpoint,component,chrome-webstore-item,edit,gbfs,gtfs-static,gtfs-realtime,import,mask-icon,meta,micropub,openid.delegate,openid.server,openid2.local_id,openid2.provider,p3pv1,pgpkey,schema.dcterms,service,shortlink,sitemap,subresource,sword,timesheet,token_endpoint,wlwmanifest,stylesheet/less,yandex-tableau-widget".split(",")), r = t.toLowerCase().split(/\s+/);
				for (let e of r) if (n.has(e) || e.startsWith("dcterms.")) return `<area> does not allow rel="${e}"`;
				return null;
			} },
			shape: {
				allowed(e, t) {
					switch (t ?? "rect") {
						case "circ":
						case "circle":
						case "poly":
						case "polygon":
						case "rect":
						case "rectangle": return k("coords")(e, t);
						default: return null;
					}
				},
				enum: [
					"rect",
					"circle",
					"poly",
					"default"
				]
			},
			target: {
				allowed: k("href"),
				enum: [
					gt,
					"_blank",
					"_self",
					"_parent",
					"_top"
				]
			}
		},
		aria: {
			implicitRole(e) {
				return e.hasAttribute("href") ? "link" : "generic";
			},
			naming(e) {
				return e.hasAttribute("href") ? "allowed" : "prohibited";
			}
		},
		requiredAncestors: ["map", "template"]
	},
	article: {
		flow: !0,
		sectioning: !0,
		permittedContent: ["@flow"],
		permittedDescendants: [{ exclude: ["main"] }],
		aria: { implicitRole: "article" }
	},
	aside: {
		flow: !0,
		sectioning: !0,
		permittedContent: ["@flow"],
		permittedDescendants: [{ exclude: ["main"] }],
		aria: { implicitRole: "complementary" }
	},
	audio: {
		flow: !0,
		focusable(e) {
			return e.hasAttribute("controls");
		},
		phrasing: !0,
		embedded: !0,
		interactive(e) {
			return e.hasAttribute("controls");
		},
		transparent: ["@flow"],
		attributes: {
			autoplay: { boolean: !0 },
			controls: { boolean: !0 },
			crossorigin: {
				omit: !0,
				enum: ["anonymous", "use-credentials"]
			},
			itemprop: { allowed: k("src") },
			loop: { boolean: !0 },
			muted: { boolean: !0 },
			preload: {
				omit: !0,
				enum: [
					"none",
					"metadata",
					"auto"
				]
			},
			src: { enum: [N] }
		},
		permittedContent: [
			"@flow",
			"track",
			"source"
		],
		permittedDescendants: [{ exclude: ["audio", "video"] }],
		permittedOrder: [
			"source",
			"track",
			"@flow"
		]
	},
	b: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: {
			implicitRole: "generic",
			naming: "prohibited"
		}
	},
	base: {
		metadata: !0,
		void: !0,
		attributes: {
			href: {},
			target: {}
		},
		permittedParent: ["head"],
		aria: { naming: "prohibited" }
	},
	basefont: { deprecated: {
		message: "use CSS instead",
		documentation: "Use CSS `font-size` property instead.",
		source: "html4"
	} },
	bdi: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: {
			implicitRole: "generic",
			naming: "prohibited"
		}
	},
	bdo: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: {
			implicitRole: "generic",
			naming: "prohibited"
		}
	},
	bgsound: { deprecated: {
		message: "use <audio> instead",
		documentation: "Use the `<audio>` element instead but consider accessibility concerns with autoplaying sounds.",
		source: "non-standard"
	} },
	big: { deprecated: {
		message: "use CSS instead",
		documentation: "Use CSS `font-size` property instead.",
		source: "html5"
	} },
	blink: { deprecated: {
		documentation: "`<blink>` has no direct replacement and blinking text is frowned upon by accessibility standards.",
		source: "non-standard"
	} },
	blockquote: {
		flow: !0,
		sectioning: !0,
		attributes: { cite: {} },
		aria: { implicitRole: "blockquote" },
		permittedContent: ["@flow"]
	},
	body: {
		optionalEnd: !0,
		permittedContent: ["@flow"],
		permittedParent: ["html"],
		attributes: {
			alink: { deprecated: !0 },
			background: { deprecated: !0 },
			bgcolor: { deprecated: !0 },
			link: { deprecated: !0 },
			marginbottom: { deprecated: !0 },
			marginheight: { deprecated: !0 },
			marginleft: { deprecated: !0 },
			marginright: { deprecated: !0 },
			margintop: { deprecated: !0 },
			marginwidth: { deprecated: !0 },
			text: { deprecated: !0 },
			vlink: { deprecated: !0 }
		},
		aria: {
			implicitRole: "generic",
			naming: "prohibited"
		}
	},
	br: {
		flow: !0,
		phrasing: !0,
		void: !0,
		attributes: { clear: { deprecated: !0 } },
		aria: { naming: "prohibited" }
	},
	button: {
		flow: !0,
		focusable: !0,
		phrasing: !0,
		interactive: !0,
		formAssociated: {
			disablable: !0,
			listed: !0
		},
		labelable: !0,
		submitButton(e) {
			let t = e.getAttribute("type");
			return !t || t === "submit";
		},
		attributes: {
			autofocus: { boolean: !0 },
			command: { enum: [
				"toggle-popover",
				"show-popover",
				"hide-popover",
				"close",
				"request-close",
				"show-modal",
				"/^--/"
			] },
			commandfor: {
				enum: [j],
				reference: "id"
			},
			datafld: { deprecated: !0 },
			dataformatas: { deprecated: !0 },
			datasrc: { deprecated: !0 },
			disabled: { boolean: !0 },
			form: {
				enum: [j],
				reference: "id"
			},
			formaction: { allowed: A("type", ["submit"], { defaultValue: "submit" }) },
			formenctype: { allowed: A("type", ["submit"], { defaultValue: "submit" }) },
			formmethod: {
				allowed: A("type", ["submit"], { defaultValue: "submit" }),
				enum: [
					"get",
					"post",
					"dialog"
				]
			},
			formnovalidate: {
				allowed: A("type", ["submit"], { defaultValue: "submit" }),
				boolean: !0
			},
			formtarget: {
				allowed: A("type", ["submit"], { defaultValue: "submit" }),
				enum: [
					gt,
					"_blank",
					"_self",
					"_parent",
					"_top"
				]
			},
			name: { enum: [N] },
			popovertarget: {
				enum: [j],
				reference: "id"
			},
			popovertargetaction: { enum: [
				"toggle",
				"show",
				"hide"
			] },
			type: { enum: [
				"submit",
				"reset",
				"button"
			] },
			value: {}
		},
		aria: { implicitRole: "button" },
		permittedContent: ["@phrasing"],
		permittedDescendants: [{ exclude: ["@interactive"] }],
		textContent: "accessible"
	},
	canvas: {
		flow: !0,
		phrasing: !0,
		embedded: !0,
		transparent: !0
	},
	caption: {
		implicitClosed: [
			"colgroup",
			"thead",
			"tfoot",
			"tbody",
			"tr"
		],
		optionalEnd: !0,
		permittedContent: ["@flow"],
		permittedDescendants: [{ exclude: ["table"] }],
		attributes: { align: { deprecated: !0 } },
		aria: {
			implicitRole: "caption",
			naming: "prohibited"
		}
	},
	center: { deprecated: {
		message: "use CSS instead",
		documentation: "Use the CSS `text-align` or `margin: auto` properties instead.",
		source: "html4"
	} },
	cite: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: { naming: "prohibited" }
	},
	code: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: {
			implicitRole: "code",
			naming: "prohibited"
		}
	},
	col: {
		attributes: {
			align: { deprecated: !0 },
			char: { deprecated: !0 },
			charoff: { deprecated: !0 },
			span: { enum: [M] },
			valign: { deprecated: !0 },
			width: { deprecated: !0 }
		},
		void: !0,
		aria: { naming: "prohibited" }
	},
	colgroup: {
		implicitClosed: [
			"colgroup",
			"caption",
			"thead",
			"tbody",
			"tfoot",
			"tr"
		],
		attributes: { span: { enum: [M] } },
		permittedContent: ["col", "template"],
		aria: { naming: "prohibited" }
	},
	data: {
		flow: !0,
		phrasing: !0,
		attributes: { value: {} },
		permittedContent: ["@phrasing"],
		aria: {
			implicitRole: "generic",
			naming: "prohibited"
		}
	},
	datalist: {
		flow: !0,
		phrasing: !0,
		aria: {
			implicitRole: "listbox",
			naming: "prohibited"
		},
		permittedContent: ["@phrasing", "option"]
	},
	dd: {
		implicitClosed: ["dd", "dt"],
		permittedContent: ["@flow"],
		requiredAncestors: [
			"dl > dd",
			"dl > div > dd",
			"template > dd",
			"template > div > dd"
		]
	},
	del: {
		flow: !0,
		phrasing: !0,
		transparent: !0,
		attributes: {
			cite: {},
			datetime: {}
		},
		aria: {
			implicitRole: "deletion",
			naming: "prohibited"
		}
	},
	details: {
		flow: !0,
		sectioning: !0,
		interactive: !0,
		attributes: {
			name: {},
			open: { boolean: !0 }
		},
		aria: { implicitRole: "group" },
		permittedContent: ["summary", "@flow"],
		permittedOrder: ["summary", "@flow"],
		requiredContent: ["summary"]
	},
	dfn: {
		flow: !0,
		phrasing: !0,
		aria: { implicitRole: "term" },
		permittedContent: ["@phrasing"],
		permittedDescendants: [{ exclude: ["dfn"] }]
	},
	dialog: {
		flow: !0,
		permittedContent: ["@flow"],
		attributes: {
			closedby: {
				omit: !0,
				enum: [
					"any",
					"closerequest",
					"none"
				]
			},
			open: { boolean: !0 }
		},
		aria: { implicitRole: "dialog" }
	},
	dir: { deprecated: {
		documentation: "The non-standard `<dir>` element has no direct replacement but MDN recommends replacing with `<ul>` and CSS.",
		source: "html4"
	} },
	div: {
		flow: !0,
		permittedContent: [
			"@flow",
			"dt",
			"dd"
		],
		attributes: {
			align: { deprecated: !0 },
			datafld: { deprecated: !0 },
			dataformatas: { deprecated: !0 },
			datasrc: { deprecated: !0 }
		},
		aria: {
			implicitRole: "generic",
			naming: "prohibited"
		}
	},
	dl: {
		flow: !0,
		permittedContent: [
			"@script",
			"dt",
			"dd",
			"div"
		],
		attributes: { compact: { deprecated: !0 } }
	},
	dt: {
		implicitClosed: ["dd", "dt"],
		permittedContent: ["@flow"],
		permittedDescendants: [{ exclude: [
			"header",
			"footer",
			"@sectioning",
			"@heading"
		] }],
		requiredAncestors: [
			"dl > dt",
			"dl > div > dt",
			"template > dt",
			"template > div > dt"
		]
	},
	em: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: {
			implicitRole: "emphasis",
			naming: "prohibited"
		}
	},
	embed: {
		flow: !0,
		phrasing: !0,
		embedded: !0,
		interactive: !0,
		void: !0,
		attributes: {
			height: { enum: [M] },
			src: {
				required: !0,
				enum: [N]
			},
			title: { required: !0 },
			width: { enum: [M] }
		}
	},
	fieldset: {
		flow: !0,
		formAssociated: {
			disablable: !0,
			listed: !0
		},
		attributes: {
			datafld: { deprecated: !0 },
			disabled: { boolean: !0 },
			form: {
				enum: [j],
				reference: "id"
			},
			name: { enum: [N] }
		},
		aria: { implicitRole: "group" },
		permittedContent: ["@flow", "legend?"],
		permittedOrder: ["legend", "@flow"]
	},
	figcaption: {
		permittedContent: ["@flow"],
		aria: { naming: "prohibited" }
	},
	figure: {
		flow: !0,
		aria: { implicitRole: "figure" },
		permittedContent: ["@flow", "figcaption?"],
		permittedOrder: [
			"figcaption",
			"@flow",
			"figcaption"
		]
	},
	font: { deprecated: {
		message: "use CSS instead",
		documentation: "Use CSS font properties instead.",
		source: "html4"
	} },
	footer: {
		flow: !0,
		aria: {
			implicitRole(e) {
				return yt(e) ? "generic" : "contentinfo";
			},
			naming(e) {
				return yt(e) ? "prohibited" : "allowed";
			}
		},
		permittedContent: ["@flow"],
		permittedDescendants: [{ exclude: [
			"header",
			"footer",
			"main"
		] }]
	},
	form: {
		flow: !0,
		form: !0,
		attributes: {
			accept: { deprecated: !0 },
			"accept-charset": {},
			action: { enum: [/^\s*\S+\s*$/] },
			autocomplete: { enum: ["on", "off"] },
			enctype: { enum: [
				"application/x-www-form-urlencoded",
				"multipart/form-data",
				"text/plain"
			] },
			method: { enum: [
				"get",
				"post",
				"dialog"
			] },
			name: {},
			novalidate: { boolean: !0 },
			rel: {
				allowed(e, t) {
					if (!t || t === "" || typeof t != "string") return null;
					let n = /* @__PURE__ */ new Set([
						"alternate",
						"canonical",
						"author",
						"bookmark",
						"dns-prefetch",
						"expect",
						"icon",
						"manifest",
						"modulepreload",
						"pingback",
						"preconnect",
						"prefetch",
						"preload",
						"privacy-policy",
						"stylesheet",
						"tag",
						"terms-of-service"
					]), r = t.toLowerCase().split(/\s+/);
					for (let e of r) if (n.has(e)) return `<form> does not allow rel="${e}"`;
					return null;
				},
				list: !0,
				enum: [N]
			},
			target: { enum: [
				gt,
				"_blank",
				"_self",
				"_parent",
				"_top"
			] }
		},
		aria: { implicitRole: "form" },
		permittedContent: ["@flow"],
		permittedDescendants: [{ exclude: ["@form"] }]
	},
	frame: {
		deprecated: {
			documentation: "The `<frame>` element can be replaced with the `<iframe>` element but a better solution is to remove usage of frames entirely.",
			source: "html5"
		},
		attributes: {
			datafld: { deprecated: !0 },
			datasrc: { deprecated: !0 },
			title: { required: !0 }
		}
	},
	frameset: { deprecated: {
		documentation: "The `<frameset>` element can be replaced with the `<iframe>` element but a better solution is to remove usage of frames entirely.",
		source: "html5"
	} },
	h1: {
		flow: !0,
		heading: !0,
		permittedContent: ["@phrasing"],
		attributes: { align: { deprecated: !0 } },
		aria: { implicitRole: "heading" }
	},
	h2: {
		flow: !0,
		heading: !0,
		permittedContent: ["@phrasing"],
		attributes: { align: { deprecated: !0 } },
		aria: { implicitRole: "heading" }
	},
	h3: {
		flow: !0,
		heading: !0,
		permittedContent: ["@phrasing"],
		attributes: { align: { deprecated: !0 } },
		aria: { implicitRole: "heading" }
	},
	h4: {
		flow: !0,
		heading: !0,
		permittedContent: ["@phrasing"],
		attributes: { align: { deprecated: !0 } },
		aria: { implicitRole: "heading" }
	},
	h5: {
		flow: !0,
		heading: !0,
		permittedContent: ["@phrasing"],
		attributes: { align: { deprecated: !0 } },
		aria: { implicitRole: "heading" }
	},
	h6: {
		flow: !0,
		heading: !0,
		permittedContent: ["@phrasing"],
		attributes: { align: { deprecated: !0 } },
		aria: { implicitRole: "heading" }
	},
	head: {
		implicitClosed: ["body", "@flow-not-meta"],
		optionalEnd: !0,
		permittedContent: [
			"base?",
			"title?",
			"@meta"
		],
		permittedParent: ["html"],
		requiredContent: ["title"],
		attributes: { profile: { deprecated: !0 } },
		aria: { naming: "prohibited" }
	},
	header: {
		flow: !0,
		aria: {
			implicitRole(e) {
				return yt(e) ? "generic" : "banner";
			},
			naming(e) {
				return yt(e) ? "prohibited" : "allowed";
			}
		},
		permittedContent: ["@flow"],
		permittedDescendants: [{ exclude: [
			"header",
			"footer",
			"main"
		] }]
	},
	hgroup: {
		flow: !0,
		heading: !0,
		permittedContent: ["p", "@heading?"],
		permittedDescendants: [{ exclude: ["hgroup"] }],
		requiredContent: ["@heading"],
		aria: { implicitRole: "group" }
	},
	hr: {
		flow: !0,
		void: !0,
		attributes: {
			align: { deprecated: !0 },
			color: { deprecated: !0 },
			noshade: { deprecated: !0 },
			size: { deprecated: !0 },
			width: { deprecated: !0 }
		},
		aria: { implicitRole: "separator" }
	},
	html: {
		implicitOpen: [{
			for: ["@meta"],
			open: "head"
		}, {
			for: ["@flow-not-meta"],
			open: "body"
		}],
		optionalEnd: !0,
		permittedContent: ["head?", "body?"],
		permittedOrder: ["head", "body"],
		requiredContent: ["head", "body"],
		attributes: {
			lang: { required: !0 },
			version: { deprecated: !0 }
		},
		aria: {
			implicitRole: "generic",
			naming: "prohibited"
		}
	},
	i: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: {
			implicitRole: "generic",
			naming: "prohibited"
		}
	},
	iframe: {
		flow: !0,
		phrasing: !0,
		embedded: !0,
		interactive: !0,
		attributes: {
			align: { deprecated: !0 },
			allowtransparency: { deprecated: !0 },
			datafld: { deprecated: !0 },
			datasrc: { deprecated: !0 },
			frameborder: { deprecated: !0 },
			height: { enum: [M] },
			hspace: { deprecated: !0 },
			marginheight: { deprecated: !0 },
			marginwidth: { deprecated: !0 },
			referrerpolicy: { enum: vt },
			scrolling: { deprecated: !0 },
			src: { enum: [N] },
			title: { required: !0 },
			vspace: { deprecated: !0 },
			width: { enum: [M] }
		},
		permittedContent: []
	},
	img: {
		flow: !0,
		phrasing: !0,
		embedded: !0,
		interactive(e) {
			return e.hasAttribute("usemap");
		},
		void: !0,
		attributes: {
			align: { deprecated: !0 },
			alt: {},
			border: { deprecated: !0 },
			crossorigin: {
				omit: !0,
				enum: ["anonymous", "use-credentials"]
			},
			datafld: { deprecated: !0 },
			datasrc: { deprecated: !0 },
			decoding: { enum: [
				"sync",
				"async",
				"auto"
			] },
			fetchpriority: {
				omit: !0,
				enum: [
					"high",
					"low",
					"auto"
				]
			},
			height: { enum: [M] },
			hspace: { deprecated: !0 },
			ismap: { boolean: !0 },
			loading: {
				omit: !0,
				enum: ["lazy", "eager"]
			},
			lowsrc: { deprecated: !0 },
			name: { deprecated: !0 },
			referrerpolicy: { enum: vt },
			sizes: {},
			src: {
				required: !0,
				enum: [N]
			},
			srcset: { enum: ["/[^]+/"] },
			usemap: {},
			vspace: { deprecated: !0 },
			width: { enum: [M] }
		},
		aria: {
			implicitRole(e) {
				let t = e.getAttribute("alt"), n = e.getAttribute("aria-label"), r = e.getAttribute("aria-labelledby"), i = e.getAttribute("title");
				return t === "" && !n && !r && !i ? "none" : "img";
			},
			naming(e) {
				let t = e.getAttribute("alt"), n = e.getAttribute("aria-label"), r = e.getAttribute("aria-labelledby"), i = e.getAttribute("title");
				return !t && !n && !r && !i ? "prohibited" : "allowed";
			}
		}
	},
	input: {
		flow: !0,
		focusable(e) {
			return e.getAttribute("type") !== "hidden";
		},
		phrasing: !0,
		interactive(e) {
			return e.getAttribute("type") !== "hidden";
		},
		void: !0,
		formAssociated: {
			disablable: !0,
			listed: !0
		},
		labelable(e) {
			return e.getAttribute("type") !== "hidden";
		},
		submitButton(e) {
			let t = e.getAttribute("type");
			return t === "submit" || t === "image";
		},
		attributes: {
			accept: {},
			align: { deprecated: !0 },
			alpha: { boolean: !0 },
			alt: {},
			autocapitalize: { enum: [
				"off",
				"none",
				"on",
				"sentences",
				"words",
				"characters"
			] },
			autocomplete: {},
			autofocus: { boolean: !0 },
			capture: {
				omit: !0,
				enum: ["environment", "user"]
			},
			checked: { boolean: !0 },
			colorspace: { enum: ["limited-srgb", "display-p3"] },
			datafld: { deprecated: !0 },
			dataformatas: { deprecated: !0 },
			datasrc: { deprecated: !0 },
			dirname: {},
			disabled: { boolean: !0 },
			form: {
				enum: [j],
				reference: "id"
			},
			formaction: { allowed: A("type", ["submit", "image"], { defaultValue: "submit" }) },
			formenctype: { allowed: A("type", ["submit", "image"], { defaultValue: "submit" }) },
			formmethod: {
				allowed: A("type", ["submit", "image"], { defaultValue: "submit" }),
				enum: [
					"get",
					"post",
					"dialog"
				]
			},
			formnovalidate: {
				allowed: A("type", ["submit", "image"], { defaultValue: "submit" }),
				boolean: !0
			},
			formtarget: {
				allowed: A("type", ["submit", "image"], { defaultValue: "submit" }),
				enum: [
					gt,
					"_blank",
					"_self",
					"_parent",
					"_top"
				]
			},
			height: { enum: [M] },
			hspace: { deprecated: !0 },
			inputmode: { enum: [
				"none",
				"text",
				"decimal",
				"numeric",
				"tel",
				"search",
				"email",
				"url"
			] },
			ismap: { deprecated: !0 },
			list: {
				enum: [j],
				reference: "id"
			},
			max: { enum: [N] },
			maxlength: { enum: [M] },
			min: { enum: [N] },
			minlength: { enum: [M] },
			multiple: { boolean: !0 },
			name: { enum: [N] },
			pattern: {},
			placeholder: {},
			popovertarget: {
				enum: [j],
				reference: "id"
			},
			popovertargetaction: { enum: [
				"toggle",
				"show",
				"hide"
			] },
			readonly: { boolean: !0 },
			required: { boolean: !0 },
			size: { enum: [M] },
			src: { enum: [N] },
			step: {},
			type: { enum: [
				"button",
				"checkbox",
				"color",
				"date",
				"datetime-local",
				"email",
				"file",
				"hidden",
				"image",
				"month",
				"number",
				"password",
				"radio",
				"range",
				"reset",
				"search",
				"submit",
				"tel",
				"text",
				"time",
				"url",
				"week"
			] },
			usemap: { deprecated: !0 },
			value: {},
			vspace: { deprecated: !0 },
			width: { enum: [M] }
		},
		aria: {
			implicitRole(e) {
				if (e.hasAttribute("list")) return "combobox";
				switch (e.getAttribute("type")) {
					case "button": return "button";
					case "checkbox": return "checkbox";
					case "color": return null;
					case "date": return null;
					case "datetime-local": return null;
					case "email": return "textbox";
					case "file": return null;
					case "hidden": return null;
					case "image": return "button";
					case "month": return null;
					case "number": return "spinbutton";
					case "password": return null;
					case "radio": return "radio";
					case "range": return "slider";
					case "reset": return "button";
					case "search": return "searchbox";
					case "submit": return "button";
					case "tel": return "textbox";
					case "text": return "textbox";
					case "time": return null;
					case "url": return "textbox";
					case "week": return null;
					default: return "textbox";
				}
			},
			naming(e) {
				return e.getAttribute("type") === "hidden" ? "prohibited" : "allowed";
			}
		}
	},
	ins: {
		flow: !0,
		phrasing: !0,
		transparent: !0,
		attributes: {
			cite: {},
			datetime: {}
		},
		aria: {
			implicitRole: "insertion",
			naming: "prohibited"
		}
	},
	isindex: { deprecated: { source: "html4" } },
	kbd: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: { naming: "prohibited" }
	},
	keygen: {
		flow: !0,
		phrasing: !0,
		interactive: !0,
		void: !0,
		labelable: !0,
		deprecated: !0
	},
	label: {
		flow: !0,
		phrasing: !0,
		interactive: !0,
		permittedContent: ["@phrasing"],
		permittedDescendants: [{ exclude: ["label"] }],
		attributes: {
			datafld: { deprecated: !0 },
			dataformatas: { deprecated: !0 },
			datasrc: { deprecated: !0 },
			for: {
				enum: [j],
				reference: "id"
			}
		},
		aria: { naming: "prohibited" }
	},
	legend: {
		permittedContent: ["@phrasing", "@heading"],
		attributes: {
			align: { deprecated: !0 },
			datafld: { deprecated: !0 },
			dataformatas: { deprecated: !0 },
			datasrc: { deprecated: !0 }
		},
		aria: { naming: "prohibited" }
	},
	li: {
		implicitClosed: ["li"],
		permittedContent: ["@flow"],
		permittedParent: [
			"ul",
			"ol",
			"menu",
			"template"
		],
		attributes: {
			type: { deprecated: !0 },
			value: { enum: ["/-?\\d+/"] }
		},
		aria: { implicitRole(e) {
			return e.closest("ul, ol, menu") ? "listitem" : "generic";
		} }
	},
	link: {
		metadata: !0,
		flow(e) {
			return xt(e);
		},
		phrasing(e) {
			return xt(e);
		},
		void: !0,
		attributes: {
			as: {
				allowed: A("rel", [
					"prefetch",
					"preload",
					"modulepreload"
				]),
				enum: [
					"audio",
					"audioworklet",
					"document",
					"embed",
					"fetch",
					"font",
					"frame",
					"iframe",
					"image",
					"manifest",
					"object",
					"paintworklet",
					"report",
					"script",
					"serviceworker",
					"sharedworker",
					"style",
					"track",
					"video",
					"webidentity",
					"worker",
					"xslt"
				]
			},
			blocking: {
				allowed: A("rel", ["expect", "stylesheet"]),
				list: !0,
				enum: ["render"]
			},
			charset: { deprecated: !0 },
			crossorigin: {
				omit: !0,
				enum: ["anonymous", "use-credentials"]
			},
			disabled: {
				allowed: A("rel", ["stylesheet"]),
				boolean: !0
			},
			href: {
				required(e) {
					return e.hasAttribute("imagesrcset") ? !1 : "{{ tagName }} is missing required \"href\" or \"imagesrcset\" attribute";
				},
				enum: [N]
			},
			imagesrcset: { allowed(e) {
				let t = e.getAttribute("rel");
				if (!t || typeof t == "string" && !ht(t, "preload")) return "\"rel\" attribute must be \"preload\"";
				let n = e.getAttribute("as");
				return !n || typeof n == "string" && n !== "image" ? "\"as\" attribute must be \"image\"" : null;
			} },
			imagesizes: {
				allowed(e) {
					let t = e.getAttribute("rel");
					if (!t || typeof t == "string" && !ht(t, "preload")) return "\"rel\" attribute must be \"preload\"";
					let n = e.getAttribute("as");
					return !n || typeof n == "string" && n !== "image" ? "\"as\" attribute must be \"image\"" : null;
				},
				required(e) {
					let t = e.getAttribute("imagesrcset");
					return typeof t == "string" && bt(t) ? "{{ tagName }} requires \"{{ attr }}\" attribute when \"imagesrcset\" uses width descriptors" : !1;
				}
			},
			integrity: {
				allowed: A("rel", [
					"stylesheet",
					"preload",
					"modulepreload"
				]),
				enum: [N]
			},
			methods: { deprecated: !0 },
			referrerpolicy: { enum: vt },
			rel: {
				allowed(e, t) {
					if (!t || t === "" || typeof t != "string") return null;
					let n = /* @__PURE__ */ new Set([
						"bookmark",
						"external",
						"nofollow",
						"noopener",
						"noreferrer",
						"opener",
						"tag",
						"disclosure",
						"entry-content",
						"lightbox",
						"lightvideo"
					]), r = t.toLowerCase().split(/\s+/);
					for (let e of r) if (n.has(e)) return `<link> does not allow rel="${e}"`;
					return null;
				},
				list: !0,
				enum: [N]
			},
			target: { deprecated: !0 },
			urn: { deprecated: !0 }
		},
		aria: { naming: "prohibited" }
	},
	listing: { deprecated: { source: "html32" } },
	main: {
		flow: !0,
		aria: { implicitRole: "main" }
	},
	map: {
		flow: !0,
		phrasing: !0,
		transparent: !0,
		attributes: { name: {
			required: !0,
			enum: ["/\\S+/"]
		} },
		aria: { naming: "prohibited" }
	},
	mark: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: { naming: "prohibited" }
	},
	marquee: {
		deprecated: {
			documentation: "Marked as obsolete by both W3C and WHATWG standards but still implemented in most browsers. Animated text should be avoided for accessibility reasons as well.",
			source: "html5"
		},
		attributes: {
			datafld: { deprecated: !0 },
			dataformatas: { deprecated: !0 },
			datasrc: { deprecated: !0 }
		}
	},
	math: {
		flow: !0,
		foreign: !0,
		phrasing: !0,
		embedded: !0,
		attributes: {
			align: { deprecated: !0 },
			dir: { enum: ["ltr", "rtl"] },
			display: { enum: ["block", "inline"] },
			hspace: { deprecated: !0 },
			name: { deprecated: !0 },
			overflow: { enum: [
				"linebreak",
				"scroll",
				"elide",
				"truncate",
				"scale"
			] },
			vspace: { deprecated: !0 }
		},
		aria: { implicitRole: "math" }
	},
	menu: {
		flow: !0,
		aria: { implicitRole: "list" },
		permittedContent: ["@script", "li"]
	},
	meta: {
		flow(e) {
			return e.hasAttribute("itemprop");
		},
		phrasing(e) {
			return e.hasAttribute("itemprop");
		},
		metadata: !0,
		void: !0,
		attributes: {
			charset: { enum: ["utf-8"] },
			content: { allowed: k("name", "http-equiv", "itemprop", "property") },
			itemprop: { allowed: pt("http-equiv", "name") },
			name: { allowed: pt("http-equiv", "itemprop") },
			"http-equiv": { allowed: pt("name", "itemprop") },
			scheme: { deprecated: !0 }
		},
		aria: { naming: "prohibited" }
	},
	meter: {
		flow: !0,
		phrasing: !0,
		labelable: !0,
		attributes: {
			high: { enum: [_t] },
			low: { enum: [_t] },
			max: { enum: [_t] },
			min: { enum: [_t] },
			optimum: { enum: [_t] },
			value: { enum: [_t] }
		},
		aria: { implicitRole: "meter" },
		permittedContent: ["@phrasing"],
		permittedDescendants: [{ exclude: "meter" }]
	},
	multicol: { deprecated: {
		message: "use CSS instead",
		documentation: "Use CSS columns instead.",
		source: "html5"
	} },
	nav: {
		flow: !0,
		sectioning: !0,
		aria: { implicitRole: "navigation" },
		permittedContent: ["@flow"],
		permittedDescendants: [{ exclude: "main" }]
	},
	nextid: { deprecated: { source: "html32" } },
	nobr: { deprecated: {
		message: "use CSS instead",
		documentation: "Use CSS `white-space` property instead.",
		source: "non-standard"
	} },
	noembed: { deprecated: { source: "non-standard" } },
	noframes: { deprecated: { source: "html5" } },
	noscript: {
		metadata: !0,
		flow: !0,
		phrasing: !0,
		transparent: !0,
		permittedDescendants: [{ exclude: "noscript" }],
		aria: { naming: "prohibited" }
	},
	object: {
		flow: !0,
		phrasing: !0,
		embedded: !0,
		interactive(e) {
			return e.hasAttribute("usemap");
		},
		transparent: !0,
		formAssociated: {
			disablable: !1,
			listed: !0
		},
		attributes: {
			align: { deprecated: !0 },
			archive: { deprecated: !0 },
			blocking: {
				list: !0,
				enum: ["render"]
			},
			border: { deprecated: !0 },
			classid: { deprecated: !0 },
			code: { deprecated: !0 },
			codebase: { deprecated: !0 },
			codetype: { deprecated: !0 },
			data: {
				enum: [N],
				required: !0
			},
			datafld: { deprecated: !0 },
			dataformatas: { deprecated: !0 },
			datasrc: { deprecated: !0 },
			declare: { deprecated: !0 },
			height: { enum: [M] },
			hspace: { deprecated: !0 },
			name: { enum: [gt] },
			standby: { deprecated: !0 },
			vspace: { deprecated: !0 },
			width: { enum: [M] }
		},
		permittedContent: ["param", "@flow"],
		permittedOrder: ["param", "@flow"]
	},
	ol: {
		flow: !0,
		attributes: {
			compact: { deprecated: !0 },
			reversed: { boolean: !0 },
			start: { enum: [M] },
			type: { enum: [
				"a",
				"A",
				"i",
				"I",
				"1"
			] }
		},
		aria: { implicitRole: "list" },
		permittedContent: ["@script", "li"]
	},
	optgroup: {
		implicitClosed: ["optgroup"],
		attributes: {
			disabled: { boolean: !0 },
			label: {}
		},
		aria: { implicitRole: "group" },
		permittedContent: ["@script", "option"]
	},
	option: {
		implicitClosed: ["option"],
		attributes: {
			dataformatas: { deprecated: !0 },
			datasrc: { deprecated: !0 },
			disabled: { boolean: !0 },
			label: {},
			name: { deprecated: !0 },
			selected: { boolean: !0 },
			value: {}
		},
		aria: { implicitRole: "option" },
		permittedContent: ["@phrasing", "div"],
		permittedDescendants: [{ exclude: [
			"@interactive",
			"datalist",
			"object"
		] }]
	},
	output: {
		flow: !0,
		phrasing: !0,
		formAssociated: {
			disablable: !1,
			listed: !0
		},
		labelable: !0,
		attributes: {
			for: {
				list: !0,
				enum: [j],
				reference: "id"
			},
			form: {
				enum: [j],
				reference: "id"
			},
			name: { enum: [N] }
		},
		aria: { implicitRole: "status" },
		permittedContent: ["@phrasing"]
	},
	p: {
		flow: !0,
		implicitClosed: /* @__PURE__ */ "address.article.aside.blockquote.dd.details.dialog.div.dl.dt.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.li.main.menu.nav.ol.p.pre.search.section.table.ul".split("."),
		permittedContent: ["@phrasing"],
		attributes: { align: { deprecated: !0 } },
		aria: {
			implicitRole: "paragraph",
			naming: "prohibited"
		}
	},
	param: {
		void: !0,
		attributes: {
			datafld: { deprecated: !0 },
			type: { deprecated: !0 },
			valuetype: { deprecated: !0 }
		},
		aria: { naming: "prohibited" }
	},
	picture: {
		flow: !0,
		phrasing: !0,
		embedded: !0,
		permittedContent: [
			"@script",
			"source",
			"img"
		],
		permittedOrder: ["source", "img"],
		aria: { naming: "prohibited" }
	},
	plaintext: { deprecated: {
		message: "use <pre> or CSS instead",
		documentation: "Use the `<pre>` element or use CSS to set a monospace font.",
		source: "html2"
	} },
	pre: {
		flow: !0,
		permittedContent: ["@phrasing"],
		attributes: { width: { deprecated: !0 } },
		aria: {
			implicitRole: "generic",
			naming: "prohibited"
		}
	},
	progress: {
		flow: !0,
		phrasing: !0,
		labelable: !0,
		attributes: {
			max: { enum: [_t] },
			value: { enum: [_t] }
		},
		aria: { implicitRole: "progressbar" },
		permittedContent: ["@phrasing"],
		permittedDescendants: [{ exclude: "progress" }]
	},
	q: {
		flow: !0,
		phrasing: !0,
		attributes: { cite: {} },
		permittedContent: ["@phrasing"],
		aria: {
			implicitRole: "generic",
			naming: "prohibited"
		}
	},
	rb: {
		implicitClosed: [
			"rb",
			"rt",
			"rtc",
			"rp"
		],
		permittedContent: ["@phrasing"]
	},
	rp: {
		implicitClosed: [
			"rb",
			"rt",
			"rtc",
			"rp"
		],
		permittedContent: ["@phrasing"],
		aria: { naming: "prohibited" }
	},
	rt: {
		implicitClosed: [
			"rb",
			"rt",
			"rtc",
			"rp"
		],
		permittedContent: ["@phrasing"],
		aria: { naming: "prohibited" }
	},
	rtc: {
		implicitClosed: [
			"rb",
			"rtc",
			"rp"
		],
		permittedContent: ["@phrasing", "rt"]
	},
	ruby: {
		flow: !0,
		phrasing: !0,
		permittedContent: [
			"@phrasing",
			"rb",
			"rp",
			"rt",
			"rtc"
		]
	},
	s: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: {
			implicitRole: "deletion",
			naming: "prohibited"
		}
	},
	samp: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: {
			implicitRole: "generic",
			naming: "prohibited"
		}
	},
	script: {
		metadata: !0,
		flow: !0,
		phrasing: !0,
		scriptSupporting: !0,
		attributes: {
			async: { boolean: !0 },
			blocking: {
				list: !0,
				enum: ["render"]
			},
			crossorigin: {
				omit: !0,
				enum: ["anonymous", "use-credentials"]
			},
			defer: { boolean: !0 },
			event: { deprecated: !0 },
			fetchpriority: { enum: [
				"high",
				"low",
				"auto"
			] },
			for: { deprecated: !0 },
			integrity: {
				allowed: k("src"),
				enum: [N]
			},
			language: { deprecated: !0 },
			nomodule: { boolean: !0 },
			referrerpolicy: { enum: vt },
			src: { enum: [N] },
			type: {}
		},
		aria: { naming: "prohibited" }
	},
	search: {
		flow: !0,
		aria: { implicitRole: "search" }
	},
	section: {
		flow: !0,
		sectioning: !0,
		aria: { implicitRole(e) {
			return e.hasAttribute("aria-label") || e.hasAttribute("aria-labelledby") ? "region" : "generic";
		} },
		permittedContent: ["@flow"]
	},
	select: {
		flow: !0,
		focusable: !0,
		phrasing: !0,
		interactive: !0,
		formAssociated: {
			disablable: !0,
			listed: !0
		},
		labelable: !0,
		attributes: {
			autocomplete: {},
			autofocus: { boolean: !0 },
			disabled: { boolean: !0 },
			form: {
				enum: [j],
				reference: "id"
			},
			multiple: { boolean: !0 },
			name: { enum: [N] },
			required: { boolean: !0 },
			size: { enum: [M] }
		},
		aria: { implicitRole(e) {
			if (e.hasAttribute("multiple")) return "listbox";
			let t = e.getAttribute("size");
			return typeof t == "string" && Math.trunc(Number(t)) > 1 ? "listbox" : "combobox";
		} },
		permittedContent: [
			"@script",
			"button?",
			"datasrc",
			"datafld",
			"dataformatas",
			"option",
			"optgroup",
			"hr"
		],
		permittedOrder: ["button", "option, optgroup, hr"]
	},
	selectedcontent: {
		phrasing: !0,
		permittedContent: [],
		textContent: "none",
		requiredAncestors: ["select > button"],
		aria: {
			implicitRole: "generic",
			naming: "prohibited"
		}
	},
	slot: {
		flow: !0,
		phrasing: !0,
		transparent: !0,
		aria: { naming: "prohibited" },
		attributes: { name: {} }
	},
	small: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: {
			implicitRole: "generic",
			naming: "prohibited"
		}
	},
	source: {
		void: !0,
		attributes: {
			type: {},
			media: {},
			src: { allowed: mt("audio", "video") },
			srcset: { allowed: mt("picture") },
			sizes: { allowed: mt("picture") },
			width: {
				allowed: mt("picture"),
				enum: [M]
			},
			height: {
				allowed: mt("picture"),
				enum: [M]
			}
		},
		aria: { naming: "prohibited" }
	},
	spacer: { deprecated: {
		message: "use CSS instead",
		documentation: "Use CSS margin or padding instead.",
		source: "non-standard"
	} },
	span: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		attributes: {
			datafld: { deprecated: !0 },
			dataformatas: { deprecated: !0 },
			datasrc: { deprecated: !0 }
		},
		aria: {
			implicitRole: "generic",
			naming: "prohibited"
		}
	},
	strike: { deprecated: {
		message: "use <del> or <s> instead",
		documentation: "Use the `<del>` or `<s>` element instead.",
		source: "html5"
	} },
	strong: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: {
			implicitRole: "strong",
			naming: "prohibited"
		}
	},
	style: {
		metadata: !0,
		aria: { naming: "prohibited" }
	},
	sub: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: {
			implicitRole: "subscript",
			naming: "prohibited"
		}
	},
	summary: {
		permittedContent: ["@phrasing", "@heading"],
		focusable(e) {
			return !!e.closest("details");
		},
		aria: { implicitRole: "button" }
	},
	sup: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: {
			implicitRole: "superscript",
			naming: "prohibited"
		}
	},
	svg: {
		flow: !0,
		foreign: !0,
		phrasing: !0,
		embedded: !0,
		aria: { implicitRole: "graphics-document" },
		attributes: { focusable: { enum: ["true", "false"] } }
	},
	"svg:desc": {},
	"svg:title": {},
	table: {
		flow: !0,
		permittedContent: [
			"@script",
			"caption?",
			"colgroup",
			"tbody",
			"tfoot?",
			"thead?",
			"tr"
		],
		permittedOrder: [
			"caption",
			"colgroup",
			"thead",
			"tbody",
			"tr",
			"tfoot"
		],
		attributes: {
			align: { deprecated: !0 },
			background: { deprecated: !0 },
			bgcolor: { deprecated: !0 },
			bordercolor: { deprecated: !0 },
			cellpadding: { deprecated: !0 },
			cellspacing: { deprecated: !0 },
			dataformatas: { deprecated: !0 },
			datapagesize: { deprecated: !0 },
			datasrc: { deprecated: !0 },
			frame: { deprecated: !0 },
			rules: { deprecated: !0 },
			summary: { deprecated: !0 },
			width: { deprecated: !0 }
		},
		aria: { implicitRole: "table" }
	},
	tbody: {
		implicitClosed: ["tbody", "tfoot"],
		permittedContent: ["@script", "tr"],
		attributes: {
			align: { deprecated: !0 },
			background: { deprecated: !0 },
			char: { deprecated: !0 },
			charoff: { deprecated: !0 },
			valign: { deprecated: !0 }
		},
		aria: { implicitRole: "rowgroup" }
	},
	td: {
		flow: !0,
		implicitClosed: [
			"td",
			"th",
			"tr",
			"tbody",
			"tfoot"
		],
		attributes: {
			align: { deprecated: !0 },
			axis: { deprecated: !0 },
			background: { deprecated: !0 },
			bgcolor: { deprecated: !0 },
			char: { deprecated: !0 },
			charoff: { deprecated: !0 },
			colspan: { enum: [M] },
			headers: {
				list: !0,
				enum: [j],
				reference: "id"
			},
			height: { deprecated: !0 },
			nowrap: { deprecated: !0 },
			rowspan: { enum: [M] },
			scope: { deprecated: !0 },
			valign: { deprecated: !0 },
			width: { deprecated: !0 }
		},
		aria: { implicitRole(e) {
			switch (e.closest("table")?.getAttribute("role") ?? "table") {
				case "table": return "cell";
				case "grid":
				case "treegrid": return "gridcell";
				default: return null;
			}
		} },
		permittedContent: ["@flow"]
	},
	template: {
		metadata: !0,
		flow: !0,
		phrasing: !0,
		scriptSupporting: !0,
		templateRoot: !0,
		attributes: {
			shadowrootclonable: { boolean: !0 },
			shadowrootcustomelementregistry: { boolean: !0 },
			shadowrootdelegatesfocus: { boolean: !0 },
			shadowrootmode: { enum: ["open", "closed"] },
			shadowrootserializable: { boolean: !0 },
			shadowrootslotassignment: { enum: ["named", "manual"] }
		},
		aria: { naming: "prohibited" }
	},
	textarea: {
		flow: !0,
		focusable: !0,
		phrasing: !0,
		interactive: !0,
		formAssociated: {
			disablable: !0,
			listed: !0
		},
		labelable: !0,
		attributes: {
			autocomplete: {},
			autofocus: { boolean: !0 },
			cols: { enum: [M] },
			datafld: { deprecated: !0 },
			datasrc: { deprecated: !0 },
			dirname: { enum: [N] },
			disabled: { boolean: !0 },
			form: {
				enum: [j],
				reference: "id"
			},
			maxlength: { enum: [M] },
			minlength: { enum: [M] },
			name: { enum: [N] },
			placeholder: {},
			readonly: { boolean: !0 },
			required: { boolean: !0 },
			rows: { enum: [M] },
			wrap: { enum: ["hard", "soft"] }
		},
		aria: { implicitRole: "textbox" },
		permittedContent: []
	},
	tfoot: {
		implicitClosed: ["tbody"],
		optionalEnd: !0,
		permittedContent: ["@script", "tr"],
		attributes: {
			align: { deprecated: !0 },
			background: { deprecated: !0 },
			char: { deprecated: !0 },
			charoff: { deprecated: !0 },
			valign: { deprecated: !0 }
		},
		aria: { implicitRole: "rowgroup" }
	},
	th: {
		flow: !0,
		implicitClosed: [
			"td",
			"th",
			"tr",
			"tbody",
			"tfoot"
		],
		attributes: {
			abbr: {},
			align: { deprecated: !0 },
			axis: { deprecated: !0 },
			background: { deprecated: !0 },
			bgcolor: { deprecated: !0 },
			char: { deprecated: !0 },
			headers: {
				list: !0,
				enum: [j],
				reference: "id"
			},
			charoff: { deprecated: !0 },
			colspan: { enum: [M] },
			height: { deprecated: !0 },
			nowrap: { deprecated: !0 },
			rowspan: { enum: [M] },
			scope: { enum: [
				"row",
				"col",
				"rowgroup",
				"colgroup"
			] },
			valign: { deprecated: !0 },
			width: { deprecated: !0 }
		},
		aria: { implicitRole(e) {
			let t = e.closest("table")?.getAttribute("role") ?? "table";
			if (typeof t != "string" || ![
				"table",
				"grid",
				"treegrid"
			].includes(t)) return null;
			switch (e.getAttribute("scope")) {
				case "col": return "columnheader";
				case "row": return "rowheader";
				default: return t === "table" ? "cell" : "gridcell";
			}
		} },
		permittedContent: ["@flow"],
		permittedDescendants: [{ exclude: [
			"header",
			"footer",
			"@sectioning",
			"@heading"
		] }]
	},
	thead: {
		implicitClosed: ["tbody", "tfoot"],
		optionalEnd: !0,
		permittedContent: ["@script", "tr"],
		attributes: {
			align: { deprecated: !0 },
			background: { deprecated: !0 },
			char: { deprecated: !0 },
			charoff: { deprecated: !0 },
			valign: { deprecated: !0 }
		},
		aria: { implicitRole: "rowgroup" }
	},
	time: {
		flow: !0,
		phrasing: !0,
		attributes: { datetime: {} },
		aria: {
			implicitRole: "time",
			naming: "prohibited"
		},
		permittedContent: ["@phrasing"]
	},
	title: {
		metadata: !0,
		permittedContent: [],
		permittedParent: ["head"],
		aria: { naming: "prohibited" }
	},
	tr: {
		implicitClosed: [
			"tr",
			"tbody",
			"tfoot"
		],
		permittedContent: [
			"@script",
			"td",
			"th"
		],
		attributes: {
			align: { deprecated: !0 },
			background: { deprecated: !0 },
			bgcolor: { deprecated: !0 },
			char: { deprecated: !0 },
			charoff: { deprecated: !0 },
			valign: { deprecated: !0 }
		},
		aria: { implicitRole: "row" }
	},
	track: {
		void: !0,
		attributes: {
			default: { boolean: !0 },
			kind: {
				omit: !0,
				enum: [
					"subtitles",
					"captions",
					"descriptions",
					"chapters",
					"metadata"
				]
			},
			label: {},
			src: {
				required: !0,
				enum: [N]
			},
			srclang: {}
		},
		aria: { naming: "prohibited" }
	},
	tt: { deprecated: {
		documentation: "Use a more semantically correct element such as `<code>`, `<var>` or `<pre>`.",
		source: "html4"
	} },
	u: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: {
			implicitRole: "generic",
			naming: "prohibited"
		}
	},
	ul: {
		flow: !0,
		permittedContent: ["@script", "li"],
		attributes: {
			compact: { deprecated: !0 },
			type: { deprecated: !0 }
		},
		aria: { implicitRole: "list" }
	},
	var: {
		flow: !0,
		phrasing: !0,
		permittedContent: ["@phrasing"],
		aria: { naming: "prohibited" }
	},
	video: {
		flow: !0,
		focusable(e) {
			return e.hasAttribute("controls");
		},
		phrasing: !0,
		embedded: !0,
		interactive(e) {
			return e.hasAttribute("controls");
		},
		transparent: ["@flow"],
		attributes: {
			autoplay: { boolean: !0 },
			controls: { boolean: !0 },
			crossorigin: {
				omit: !0,
				enum: ["anonymous", "use-credentials"]
			},
			height: { enum: [M] },
			itemprop: { allowed: k("src") },
			loop: { boolean: !0 },
			muted: { boolean: !0 },
			playsinline: { boolean: !0 },
			poster: { enum: [N] },
			preload: {
				omit: !0,
				enum: [
					"none",
					"metadata",
					"auto"
				]
			},
			src: { enum: [N] },
			width: { enum: [M] }
		},
		permittedContent: [
			"@flow",
			"track",
			"source"
		],
		permittedDescendants: [{ exclude: ["audio", "video"] }],
		permittedOrder: [
			"source",
			"track",
			"@flow"
		]
	},
	wbr: {
		flow: !0,
		phrasing: !0,
		void: !0,
		aria: { naming: "prohibited" }
	},
	xmp: { deprecated: {
		documentation: "Use `<pre>` or `<code>` and escape content using HTML entities instead.",
		source: "html32"
	} }
}, Ct = { html5: St }, wt = /* @__PURE__ */ "&Aacute.&aacute.&Aacute;.&aacute;.&Abreve;.&abreve;.&ac;.&acd;.&acE;.&Acirc.&acirc.&Acirc;.&acirc;.&acute.&acute;.&Acy;.&acy;.&AElig.&aelig.&AElig;.&aelig;.&af;.&Afr;.&afr;.&Agrave.&agrave.&Agrave;.&agrave;.&alefsym;.&aleph;.&Alpha;.&alpha;.&Amacr;.&amacr;.&amalg;.&AMP.&amp.&AMP;.&amp;.&And;.&and;.&andand;.&andd;.&andslope;.&andv;.&ang;.&ange;.&angle;.&angmsd;.&angmsdaa;.&angmsdab;.&angmsdac;.&angmsdad;.&angmsdae;.&angmsdaf;.&angmsdag;.&angmsdah;.&angrt;.&angrtvb;.&angrtvbd;.&angsph;.&angst;.&angzarr;.&Aogon;.&aogon;.&Aopf;.&aopf;.&ap;.&apacir;.&apE;.&ape;.&apid;.&apos;.&ApplyFunction;.&approx;.&approxeq;.&Aring.&aring.&Aring;.&aring;.&Ascr;.&ascr;.&Assign;.&ast;.&asymp;.&asympeq;.&Atilde.&atilde.&Atilde;.&atilde;.&Auml.&auml.&Auml;.&auml;.&awconint;.&awint;.&backcong;.&backepsilon;.&backprime;.&backsim;.&backsimeq;.&Backslash;.&Barv;.&barvee;.&Barwed;.&barwed;.&barwedge;.&bbrk;.&bbrktbrk;.&bcong;.&Bcy;.&bcy;.&bdquo;.&becaus;.&Because;.&because;.&bemptyv;.&bepsi;.&bernou;.&Bernoullis;.&Beta;.&beta;.&beth;.&between;.&Bfr;.&bfr;.&bigcap;.&bigcirc;.&bigcup;.&bigodot;.&bigoplus;.&bigotimes;.&bigsqcup;.&bigstar;.&bigtriangledown;.&bigtriangleup;.&biguplus;.&bigvee;.&bigwedge;.&bkarow;.&blacklozenge;.&blacksquare;.&blacktriangle;.&blacktriangledown;.&blacktriangleleft;.&blacktriangleright;.&blank;.&blk12;.&blk14;.&blk34;.&block;.&bne;.&bnequiv;.&bNot;.&bnot;.&Bopf;.&bopf;.&bot;.&bottom;.&bowtie;.&boxbox;.&boxDL;.&boxDl;.&boxdL;.&boxdl;.&boxDR;.&boxDr;.&boxdR;.&boxdr;.&boxH;.&boxh;.&boxHD;.&boxHd;.&boxhD;.&boxhd;.&boxHU;.&boxHu;.&boxhU;.&boxhu;.&boxminus;.&boxplus;.&boxtimes;.&boxUL;.&boxUl;.&boxuL;.&boxul;.&boxUR;.&boxUr;.&boxuR;.&boxur;.&boxV;.&boxv;.&boxVH;.&boxVh;.&boxvH;.&boxvh;.&boxVL;.&boxVl;.&boxvL;.&boxvl;.&boxVR;.&boxVr;.&boxvR;.&boxvr;.&bprime;.&Breve;.&breve;.&brvbar.&brvbar;.&Bscr;.&bscr;.&bsemi;.&bsim;.&bsime;.&bsol;.&bsolb;.&bsolhsub;.&bull;.&bullet;.&bump;.&bumpE;.&bumpe;.&Bumpeq;.&bumpeq;.&Cacute;.&cacute;.&Cap;.&cap;.&capand;.&capbrcup;.&capcap;.&capcup;.&capdot;.&CapitalDifferentialD;.&caps;.&caret;.&caron;.&Cayleys;.&ccaps;.&Ccaron;.&ccaron;.&Ccedil.&ccedil.&Ccedil;.&ccedil;.&Ccirc;.&ccirc;.&Cconint;.&ccups;.&ccupssm;.&Cdot;.&cdot;.&cedil.&cedil;.&Cedilla;.&cemptyv;.&cent.&cent;.&CenterDot;.&centerdot;.&Cfr;.&cfr;.&CHcy;.&chcy;.&check;.&checkmark;.&Chi;.&chi;.&cir;.&circ;.&circeq;.&circlearrowleft;.&circlearrowright;.&circledast;.&circledcirc;.&circleddash;.&CircleDot;.&circledR;.&circledS;.&CircleMinus;.&CirclePlus;.&CircleTimes;.&cirE;.&cire;.&cirfnint;.&cirmid;.&cirscir;.&ClockwiseContourIntegral;.&CloseCurlyDoubleQuote;.&CloseCurlyQuote;.&clubs;.&clubsuit;.&Colon;.&colon;.&Colone;.&colone;.&coloneq;.&comma;.&commat;.&comp;.&compfn;.&complement;.&complexes;.&cong;.&congdot;.&Congruent;.&Conint;.&conint;.&ContourIntegral;.&Copf;.&copf;.&coprod;.&Coproduct;.&COPY.&copy.&COPY;.&copy;.&copysr;.&CounterClockwiseContourIntegral;.&crarr;.&Cross;.&cross;.&Cscr;.&cscr;.&csub;.&csube;.&csup;.&csupe;.&ctdot;.&cudarrl;.&cudarrr;.&cuepr;.&cuesc;.&cularr;.&cularrp;.&Cup;.&cup;.&cupbrcap;.&CupCap;.&cupcap;.&cupcup;.&cupdot;.&cupor;.&cups;.&curarr;.&curarrm;.&curlyeqprec;.&curlyeqsucc;.&curlyvee;.&curlywedge;.&curren.&curren;.&curvearrowleft;.&curvearrowright;.&cuvee;.&cuwed;.&cwconint;.&cwint;.&cylcty;.&Dagger;.&dagger;.&daleth;.&Darr;.&dArr;.&darr;.&dash;.&Dashv;.&dashv;.&dbkarow;.&dblac;.&Dcaron;.&dcaron;.&Dcy;.&dcy;.&DD;.&dd;.&ddagger;.&ddarr;.&DDotrahd;.&ddotseq;.&deg.&deg;.&Del;.&Delta;.&delta;.&demptyv;.&dfisht;.&Dfr;.&dfr;.&dHar;.&dharl;.&dharr;.&DiacriticalAcute;.&DiacriticalDot;.&DiacriticalDoubleAcute;.&DiacriticalGrave;.&DiacriticalTilde;.&diam;.&Diamond;.&diamond;.&diamondsuit;.&diams;.&die;.&DifferentialD;.&digamma;.&disin;.&div;.&divide.&divide;.&divideontimes;.&divonx;.&DJcy;.&djcy;.&dlcorn;.&dlcrop;.&dollar;.&Dopf;.&dopf;.&Dot;.&dot;.&DotDot;.&doteq;.&doteqdot;.&DotEqual;.&dotminus;.&dotplus;.&dotsquare;.&doublebarwedge;.&DoubleContourIntegral;.&DoubleDot;.&DoubleDownArrow;.&DoubleLeftArrow;.&DoubleLeftRightArrow;.&DoubleLeftTee;.&DoubleLongLeftArrow;.&DoubleLongLeftRightArrow;.&DoubleLongRightArrow;.&DoubleRightArrow;.&DoubleRightTee;.&DoubleUpArrow;.&DoubleUpDownArrow;.&DoubleVerticalBar;.&DownArrow;.&Downarrow;.&downarrow;.&DownArrowBar;.&DownArrowUpArrow;.&DownBreve;.&downdownarrows;.&downharpoonleft;.&downharpoonright;.&DownLeftRightVector;.&DownLeftTeeVector;.&DownLeftVector;.&DownLeftVectorBar;.&DownRightTeeVector;.&DownRightVector;.&DownRightVectorBar;.&DownTee;.&DownTeeArrow;.&drbkarow;.&drcorn;.&drcrop;.&Dscr;.&dscr;.&DScy;.&dscy;.&dsol;.&Dstrok;.&dstrok;.&dtdot;.&dtri;.&dtrif;.&duarr;.&duhar;.&dwangle;.&DZcy;.&dzcy;.&dzigrarr;.&Eacute.&eacute.&Eacute;.&eacute;.&easter;.&Ecaron;.&ecaron;.&ecir;.&Ecirc.&ecirc.&Ecirc;.&ecirc;.&ecolon;.&Ecy;.&ecy;.&eDDot;.&Edot;.&eDot;.&edot;.&ee;.&efDot;.&Efr;.&efr;.&eg;.&Egrave.&egrave.&Egrave;.&egrave;.&egs;.&egsdot;.&el;.&Element;.&elinters;.&ell;.&els;.&elsdot;.&Emacr;.&emacr;.&empty;.&emptyset;.&EmptySmallSquare;.&emptyv;.&EmptyVerySmallSquare;.&emsp13;.&emsp14;.&emsp;.&ENG;.&eng;.&ensp;.&Eogon;.&eogon;.&Eopf;.&eopf;.&epar;.&eparsl;.&eplus;.&epsi;.&Epsilon;.&epsilon;.&epsiv;.&eqcirc;.&eqcolon;.&eqsim;.&eqslantgtr;.&eqslantless;.&Equal;.&equals;.&EqualTilde;.&equest;.&Equilibrium;.&equiv;.&equivDD;.&eqvparsl;.&erarr;.&erDot;.&Escr;.&escr;.&esdot;.&Esim;.&esim;.&Eta;.&eta;.&ETH.&eth.&ETH;.&eth;.&Euml.&euml.&Euml;.&euml;.&euro;.&excl;.&exist;.&Exists;.&expectation;.&ExponentialE;.&exponentiale;.&fallingdotseq;.&Fcy;.&fcy;.&female;.&ffilig;.&fflig;.&ffllig;.&Ffr;.&ffr;.&filig;.&FilledSmallSquare;.&FilledVerySmallSquare;.&fjlig;.&flat;.&fllig;.&fltns;.&fnof;.&Fopf;.&fopf;.&ForAll;.&forall;.&fork;.&forkv;.&Fouriertrf;.&fpartint;.&frac12.&frac12;.&frac13;.&frac14.&frac14;.&frac15;.&frac16;.&frac18;.&frac23;.&frac25;.&frac34.&frac34;.&frac35;.&frac38;.&frac45;.&frac56;.&frac58;.&frac78;.&frasl;.&frown;.&Fscr;.&fscr;.&gacute;.&Gamma;.&gamma;.&Gammad;.&gammad;.&gap;.&Gbreve;.&gbreve;.&Gcedil;.&Gcirc;.&gcirc;.&Gcy;.&gcy;.&Gdot;.&gdot;.&gE;.&ge;.&gEl;.&gel;.&geq;.&geqq;.&geqslant;.&ges;.&gescc;.&gesdot;.&gesdoto;.&gesdotol;.&gesl;.&gesles;.&Gfr;.&gfr;.&Gg;.&gg;.&ggg;.&gimel;.&GJcy;.&gjcy;.&gl;.&gla;.&glE;.&glj;.&gnap;.&gnapprox;.&gnE;.&gne;.&gneq;.&gneqq;.&gnsim;.&Gopf;.&gopf;.&grave;.&GreaterEqual;.&GreaterEqualLess;.&GreaterFullEqual;.&GreaterGreater;.&GreaterLess;.&GreaterSlantEqual;.&GreaterTilde;.&Gscr;.&gscr;.&gsim;.&gsime;.&gsiml;.&GT.&gt.&GT;.&Gt;.&gt;.&gtcc;.&gtcir;.&gtdot;.&gtlPar;.&gtquest;.&gtrapprox;.&gtrarr;.&gtrdot;.&gtreqless;.&gtreqqless;.&gtrless;.&gtrsim;.&gvertneqq;.&gvnE;.&Hacek;.&hairsp;.&half;.&hamilt;.&HARDcy;.&hardcy;.&hArr;.&harr;.&harrcir;.&harrw;.&Hat;.&hbar;.&Hcirc;.&hcirc;.&hearts;.&heartsuit;.&hellip;.&hercon;.&Hfr;.&hfr;.&HilbertSpace;.&hksearow;.&hkswarow;.&hoarr;.&homtht;.&hookleftarrow;.&hookrightarrow;.&Hopf;.&hopf;.&horbar;.&HorizontalLine;.&Hscr;.&hscr;.&hslash;.&Hstrok;.&hstrok;.&HumpDownHump;.&HumpEqual;.&hybull;.&hyphen;.&Iacute.&iacute.&Iacute;.&iacute;.&ic;.&Icirc.&icirc.&Icirc;.&icirc;.&Icy;.&icy;.&Idot;.&IEcy;.&iecy;.&iexcl.&iexcl;.&iff;.&Ifr;.&ifr;.&Igrave.&igrave.&Igrave;.&igrave;.&ii;.&iiiint;.&iiint;.&iinfin;.&iiota;.&IJlig;.&ijlig;.&Im;.&Imacr;.&imacr;.&image;.&ImaginaryI;.&imagline;.&imagpart;.&imath;.&imof;.&imped;.&Implies;.&in;.&incare;.&infin;.&infintie;.&inodot;.&Int;.&int;.&intcal;.&integers;.&Integral;.&intercal;.&Intersection;.&intlarhk;.&intprod;.&InvisibleComma;.&InvisibleTimes;.&IOcy;.&iocy;.&Iogon;.&iogon;.&Iopf;.&iopf;.&Iota;.&iota;.&iprod;.&iquest.&iquest;.&Iscr;.&iscr;.&isin;.&isindot;.&isinE;.&isins;.&isinsv;.&isinv;.&it;.&Itilde;.&itilde;.&Iukcy;.&iukcy;.&Iuml.&iuml.&Iuml;.&iuml;.&Jcirc;.&jcirc;.&Jcy;.&jcy;.&Jfr;.&jfr;.&jmath;.&Jopf;.&jopf;.&Jscr;.&jscr;.&Jsercy;.&jsercy;.&Jukcy;.&jukcy;.&Kappa;.&kappa;.&kappav;.&Kcedil;.&kcedil;.&Kcy;.&kcy;.&Kfr;.&kfr;.&kgreen;.&KHcy;.&khcy;.&KJcy;.&kjcy;.&Kopf;.&kopf;.&Kscr;.&kscr;.&lAarr;.&Lacute;.&lacute;.&laemptyv;.&lagran;.&Lambda;.&lambda;.&Lang;.&lang;.&langd;.&langle;.&lap;.&Laplacetrf;.&laquo.&laquo;.&Larr;.&lArr;.&larr;.&larrb;.&larrbfs;.&larrfs;.&larrhk;.&larrlp;.&larrpl;.&larrsim;.&larrtl;.&lat;.&lAtail;.&latail;.&late;.&lates;.&lBarr;.&lbarr;.&lbbrk;.&lbrace;.&lbrack;.&lbrke;.&lbrksld;.&lbrkslu;.&Lcaron;.&lcaron;.&Lcedil;.&lcedil;.&lceil;.&lcub;.&Lcy;.&lcy;.&ldca;.&ldquo;.&ldquor;.&ldrdhar;.&ldrushar;.&ldsh;.&lE;.&le;.&LeftAngleBracket;.&LeftArrow;.&Leftarrow;.&leftarrow;.&LeftArrowBar;.&LeftArrowRightArrow;.&leftarrowtail;.&LeftCeiling;.&LeftDoubleBracket;.&LeftDownTeeVector;.&LeftDownVector;.&LeftDownVectorBar;.&LeftFloor;.&leftharpoondown;.&leftharpoonup;.&leftleftarrows;.&LeftRightArrow;.&Leftrightarrow;.&leftrightarrow;.&leftrightarrows;.&leftrightharpoons;.&leftrightsquigarrow;.&LeftRightVector;.&LeftTee;.&LeftTeeArrow;.&LeftTeeVector;.&leftthreetimes;.&LeftTriangle;.&LeftTriangleBar;.&LeftTriangleEqual;.&LeftUpDownVector;.&LeftUpTeeVector;.&LeftUpVector;.&LeftUpVectorBar;.&LeftVector;.&LeftVectorBar;.&lEg;.&leg;.&leq;.&leqq;.&leqslant;.&les;.&lescc;.&lesdot;.&lesdoto;.&lesdotor;.&lesg;.&lesges;.&lessapprox;.&lessdot;.&lesseqgtr;.&lesseqqgtr;.&LessEqualGreater;.&LessFullEqual;.&LessGreater;.&lessgtr;.&LessLess;.&lesssim;.&LessSlantEqual;.&LessTilde;.&lfisht;.&lfloor;.&Lfr;.&lfr;.&lg;.&lgE;.&lHar;.&lhard;.&lharu;.&lharul;.&lhblk;.&LJcy;.&ljcy;.&Ll;.&ll;.&llarr;.&llcorner;.&Lleftarrow;.&llhard;.&lltri;.&Lmidot;.&lmidot;.&lmoust;.&lmoustache;.&lnap;.&lnapprox;.&lnE;.&lne;.&lneq;.&lneqq;.&lnsim;.&loang;.&loarr;.&lobrk;.&LongLeftArrow;.&Longleftarrow;.&longleftarrow;.&LongLeftRightArrow;.&Longleftrightarrow;.&longleftrightarrow;.&longmapsto;.&LongRightArrow;.&Longrightarrow;.&longrightarrow;.&looparrowleft;.&looparrowright;.&lopar;.&Lopf;.&lopf;.&loplus;.&lotimes;.&lowast;.&lowbar;.&LowerLeftArrow;.&LowerRightArrow;.&loz;.&lozenge;.&lozf;.&lpar;.&lparlt;.&lrarr;.&lrcorner;.&lrhar;.&lrhard;.&lrm;.&lrtri;.&lsaquo;.&Lscr;.&lscr;.&Lsh;.&lsh;.&lsim;.&lsime;.&lsimg;.&lsqb;.&lsquo;.&lsquor;.&Lstrok;.&lstrok;.&LT.&lt.&LT;.&Lt;.&lt;.&ltcc;.&ltcir;.&ltdot;.&lthree;.&ltimes;.&ltlarr;.&ltquest;.&ltri;.&ltrie;.&ltrif;.&ltrPar;.&lurdshar;.&luruhar;.&lvertneqq;.&lvnE;.&macr.&macr;.&male;.&malt;.&maltese;.&Map;.&map;.&mapsto;.&mapstodown;.&mapstoleft;.&mapstoup;.&marker;.&mcomma;.&Mcy;.&mcy;.&mdash;.&mDDot;.&measuredangle;.&MediumSpace;.&Mellintrf;.&Mfr;.&mfr;.&mho;.&micro.&micro;.&mid;.&midast;.&midcir;.&middot.&middot;.&minus;.&minusb;.&minusd;.&minusdu;.&MinusPlus;.&mlcp;.&mldr;.&mnplus;.&models;.&Mopf;.&mopf;.&mp;.&Mscr;.&mscr;.&mstpos;.&Mu;.&mu;.&multimap;.&mumap;.&nabla;.&Nacute;.&nacute;.&nang;.&nap;.&napE;.&napid;.&napos;.&napprox;.&natur;.&natural;.&naturals;.&nbsp.&nbsp;.&nbump;.&nbumpe;.&ncap;.&Ncaron;.&ncaron;.&Ncedil;.&ncedil;.&ncong;.&ncongdot;.&ncup;.&Ncy;.&ncy;.&ndash;.&ne;.&nearhk;.&neArr;.&nearr;.&nearrow;.&nedot;.&NegativeMediumSpace;.&NegativeThickSpace;.&NegativeThinSpace;.&NegativeVeryThinSpace;.&nequiv;.&nesear;.&nesim;.&NestedGreaterGreater;.&NestedLessLess;.&NewLine;.&nexist;.&nexists;.&Nfr;.&nfr;.&ngE;.&nge;.&ngeq;.&ngeqq;.&ngeqslant;.&nges;.&nGg;.&ngsim;.&nGt;.&ngt;.&ngtr;.&nGtv;.&nhArr;.&nharr;.&nhpar;.&ni;.&nis;.&nisd;.&niv;.&NJcy;.&njcy;.&nlArr;.&nlarr;.&nldr;.&nlE;.&nle;.&nLeftarrow;.&nleftarrow;.&nLeftrightarrow;.&nleftrightarrow;.&nleq;.&nleqq;.&nleqslant;.&nles;.&nless;.&nLl;.&nlsim;.&nLt;.&nlt;.&nltri;.&nltrie;.&nLtv;.&nmid;.&NoBreak;.&NonBreakingSpace;.&Nopf;.&nopf;.&not.&Not;.&not;.&NotCongruent;.&NotCupCap;.&NotDoubleVerticalBar;.&NotElement;.&NotEqual;.&NotEqualTilde;.&NotExists;.&NotGreater;.&NotGreaterEqual;.&NotGreaterFullEqual;.&NotGreaterGreater;.&NotGreaterLess;.&NotGreaterSlantEqual;.&NotGreaterTilde;.&NotHumpDownHump;.&NotHumpEqual;.&notin;.&notindot;.&notinE;.&notinva;.&notinvb;.&notinvc;.&NotLeftTriangle;.&NotLeftTriangleBar;.&NotLeftTriangleEqual;.&NotLess;.&NotLessEqual;.&NotLessGreater;.&NotLessLess;.&NotLessSlantEqual;.&NotLessTilde;.&NotNestedGreaterGreater;.&NotNestedLessLess;.&notni;.&notniva;.&notnivb;.&notnivc;.&NotPrecedes;.&NotPrecedesEqual;.&NotPrecedesSlantEqual;.&NotReverseElement;.&NotRightTriangle;.&NotRightTriangleBar;.&NotRightTriangleEqual;.&NotSquareSubset;.&NotSquareSubsetEqual;.&NotSquareSuperset;.&NotSquareSupersetEqual;.&NotSubset;.&NotSubsetEqual;.&NotSucceeds;.&NotSucceedsEqual;.&NotSucceedsSlantEqual;.&NotSucceedsTilde;.&NotSuperset;.&NotSupersetEqual;.&NotTilde;.&NotTildeEqual;.&NotTildeFullEqual;.&NotTildeTilde;.&NotVerticalBar;.&npar;.&nparallel;.&nparsl;.&npart;.&npolint;.&npr;.&nprcue;.&npre;.&nprec;.&npreceq;.&nrArr;.&nrarr;.&nrarrc;.&nrarrw;.&nRightarrow;.&nrightarrow;.&nrtri;.&nrtrie;.&nsc;.&nsccue;.&nsce;.&Nscr;.&nscr;.&nshortmid;.&nshortparallel;.&nsim;.&nsime;.&nsimeq;.&nsmid;.&nspar;.&nsqsube;.&nsqsupe;.&nsub;.&nsubE;.&nsube;.&nsubset;.&nsubseteq;.&nsubseteqq;.&nsucc;.&nsucceq;.&nsup;.&nsupE;.&nsupe;.&nsupset;.&nsupseteq;.&nsupseteqq;.&ntgl;.&Ntilde.&ntilde.&Ntilde;.&ntilde;.&ntlg;.&ntriangleleft;.&ntrianglelefteq;.&ntriangleright;.&ntrianglerighteq;.&Nu;.&nu;.&num;.&numero;.&numsp;.&nvap;.&nVDash;.&nVdash;.&nvDash;.&nvdash;.&nvge;.&nvgt;.&nvHarr;.&nvinfin;.&nvlArr;.&nvle;.&nvlt;.&nvltrie;.&nvrArr;.&nvrtrie;.&nvsim;.&nwarhk;.&nwArr;.&nwarr;.&nwarrow;.&nwnear;.&Oacute.&oacute.&Oacute;.&oacute;.&oast;.&ocir;.&Ocirc.&ocirc.&Ocirc;.&ocirc;.&Ocy;.&ocy;.&odash;.&Odblac;.&odblac;.&odiv;.&odot;.&odsold;.&OElig;.&oelig;.&ofcir;.&Ofr;.&ofr;.&ogon;.&Ograve.&ograve.&Ograve;.&ograve;.&ogt;.&ohbar;.&ohm;.&oint;.&olarr;.&olcir;.&olcross;.&oline;.&olt;.&Omacr;.&omacr;.&Omega;.&omega;.&Omicron;.&omicron;.&omid;.&ominus;.&Oopf;.&oopf;.&opar;.&OpenCurlyDoubleQuote;.&OpenCurlyQuote;.&operp;.&oplus;.&Or;.&or;.&orarr;.&ord;.&order;.&orderof;.&ordf.&ordf;.&ordm.&ordm;.&origof;.&oror;.&orslope;.&orv;.&oS;.&Oscr;.&oscr;.&Oslash.&oslash.&Oslash;.&oslash;.&osol;.&Otilde.&otilde.&Otilde;.&otilde;.&Otimes;.&otimes;.&otimesas;.&Ouml.&ouml.&Ouml;.&ouml;.&ovbar;.&OverBar;.&OverBrace;.&OverBracket;.&OverParenthesis;.&par;.&para.&para;.&parallel;.&parsim;.&parsl;.&part;.&PartialD;.&Pcy;.&pcy;.&percnt;.&period;.&permil;.&perp;.&pertenk;.&Pfr;.&pfr;.&Phi;.&phi;.&phiv;.&phmmat;.&phone;.&Pi;.&pi;.&pitchfork;.&piv;.&planck;.&planckh;.&plankv;.&plus;.&plusacir;.&plusb;.&pluscir;.&plusdo;.&plusdu;.&pluse;.&PlusMinus;.&plusmn.&plusmn;.&plussim;.&plustwo;.&pm;.&Poincareplane;.&pointint;.&Popf;.&popf;.&pound.&pound;.&Pr;.&pr;.&prap;.&prcue;.&prE;.&pre;.&prec;.&precapprox;.&preccurlyeq;.&Precedes;.&PrecedesEqual;.&PrecedesSlantEqual;.&PrecedesTilde;.&preceq;.&precnapprox;.&precneqq;.&precnsim;.&precsim;.&Prime;.&prime;.&primes;.&prnap;.&prnE;.&prnsim;.&prod;.&Product;.&profalar;.&profline;.&profsurf;.&prop;.&Proportion;.&Proportional;.&propto;.&prsim;.&prurel;.&Pscr;.&pscr;.&Psi;.&psi;.&puncsp;.&Qfr;.&qfr;.&qint;.&Qopf;.&qopf;.&qprime;.&Qscr;.&qscr;.&quaternions;.&quatint;.&quest;.&questeq;.&QUOT.&quot.&QUOT;.&quot;.&rAarr;.&race;.&Racute;.&racute;.&radic;.&raemptyv;.&Rang;.&rang;.&rangd;.&range;.&rangle;.&raquo.&raquo;.&Rarr;.&rArr;.&rarr;.&rarrap;.&rarrb;.&rarrbfs;.&rarrc;.&rarrfs;.&rarrhk;.&rarrlp;.&rarrpl;.&rarrsim;.&Rarrtl;.&rarrtl;.&rarrw;.&rAtail;.&ratail;.&ratio;.&rationals;.&RBarr;.&rBarr;.&rbarr;.&rbbrk;.&rbrace;.&rbrack;.&rbrke;.&rbrksld;.&rbrkslu;.&Rcaron;.&rcaron;.&Rcedil;.&rcedil;.&rceil;.&rcub;.&Rcy;.&rcy;.&rdca;.&rdldhar;.&rdquo;.&rdquor;.&rdsh;.&Re;.&real;.&realine;.&realpart;.&reals;.&rect;.&REG.&reg.&REG;.&reg;.&ReverseElement;.&ReverseEquilibrium;.&ReverseUpEquilibrium;.&rfisht;.&rfloor;.&Rfr;.&rfr;.&rHar;.&rhard;.&rharu;.&rharul;.&Rho;.&rho;.&rhov;.&RightAngleBracket;.&RightArrow;.&Rightarrow;.&rightarrow;.&RightArrowBar;.&RightArrowLeftArrow;.&rightarrowtail;.&RightCeiling;.&RightDoubleBracket;.&RightDownTeeVector;.&RightDownVector;.&RightDownVectorBar;.&RightFloor;.&rightharpoondown;.&rightharpoonup;.&rightleftarrows;.&rightleftharpoons;.&rightrightarrows;.&rightsquigarrow;.&RightTee;.&RightTeeArrow;.&RightTeeVector;.&rightthreetimes;.&RightTriangle;.&RightTriangleBar;.&RightTriangleEqual;.&RightUpDownVector;.&RightUpTeeVector;.&RightUpVector;.&RightUpVectorBar;.&RightVector;.&RightVectorBar;.&ring;.&risingdotseq;.&rlarr;.&rlhar;.&rlm;.&rmoust;.&rmoustache;.&rnmid;.&roang;.&roarr;.&robrk;.&ropar;.&Ropf;.&ropf;.&roplus;.&rotimes;.&RoundImplies;.&rpar;.&rpargt;.&rppolint;.&rrarr;.&Rrightarrow;.&rsaquo;.&Rscr;.&rscr;.&Rsh;.&rsh;.&rsqb;.&rsquo;.&rsquor;.&rthree;.&rtimes;.&rtri;.&rtrie;.&rtrif;.&rtriltri;.&RuleDelayed;.&ruluhar;.&rx;.&Sacute;.&sacute;.&sbquo;.&Sc;.&sc;.&scap;.&Scaron;.&scaron;.&sccue;.&scE;.&sce;.&Scedil;.&scedil;.&Scirc;.&scirc;.&scnap;.&scnE;.&scnsim;.&scpolint;.&scsim;.&Scy;.&scy;.&sdot;.&sdotb;.&sdote;.&searhk;.&seArr;.&searr;.&searrow;.&sect.&sect;.&semi;.&seswar;.&setminus;.&setmn;.&sext;.&Sfr;.&sfr;.&sfrown;.&sharp;.&SHCHcy;.&shchcy;.&SHcy;.&shcy;.&ShortDownArrow;.&ShortLeftArrow;.&shortmid;.&shortparallel;.&ShortRightArrow;.&ShortUpArrow;.&shy.&shy;.&Sigma;.&sigma;.&sigmaf;.&sigmav;.&sim;.&simdot;.&sime;.&simeq;.&simg;.&simgE;.&siml;.&simlE;.&simne;.&simplus;.&simrarr;.&slarr;.&SmallCircle;.&smallsetminus;.&smashp;.&smeparsl;.&smid;.&smile;.&smt;.&smte;.&smtes;.&SOFTcy;.&softcy;.&sol;.&solb;.&solbar;.&Sopf;.&sopf;.&spades;.&spadesuit;.&spar;.&sqcap;.&sqcaps;.&sqcup;.&sqcups;.&Sqrt;.&sqsub;.&sqsube;.&sqsubset;.&sqsubseteq;.&sqsup;.&sqsupe;.&sqsupset;.&sqsupseteq;.&squ;.&Square;.&square;.&SquareIntersection;.&SquareSubset;.&SquareSubsetEqual;.&SquareSuperset;.&SquareSupersetEqual;.&SquareUnion;.&squarf;.&squf;.&srarr;.&Sscr;.&sscr;.&ssetmn;.&ssmile;.&sstarf;.&Star;.&star;.&starf;.&straightepsilon;.&straightphi;.&strns;.&Sub;.&sub;.&subdot;.&subE;.&sube;.&subedot;.&submult;.&subnE;.&subne;.&subplus;.&subrarr;.&Subset;.&subset;.&subseteq;.&subseteqq;.&SubsetEqual;.&subsetneq;.&subsetneqq;.&subsim;.&subsub;.&subsup;.&succ;.&succapprox;.&succcurlyeq;.&Succeeds;.&SucceedsEqual;.&SucceedsSlantEqual;.&SucceedsTilde;.&succeq;.&succnapprox;.&succneqq;.&succnsim;.&succsim;.&SuchThat;.&Sum;.&sum;.&sung;.&sup1.&sup1;.&sup2.&sup2;.&sup3.&sup3;.&Sup;.&sup;.&supdot;.&supdsub;.&supE;.&supe;.&supedot;.&Superset;.&SupersetEqual;.&suphsol;.&suphsub;.&suplarr;.&supmult;.&supnE;.&supne;.&supplus;.&Supset;.&supset;.&supseteq;.&supseteqq;.&supsetneq;.&supsetneqq;.&supsim;.&supsub;.&supsup;.&swarhk;.&swArr;.&swarr;.&swarrow;.&swnwar;.&szlig.&szlig;.&Tab;.&target;.&Tau;.&tau;.&tbrk;.&Tcaron;.&tcaron;.&Tcedil;.&tcedil;.&Tcy;.&tcy;.&tdot;.&telrec;.&Tfr;.&tfr;.&there4;.&Therefore;.&therefore;.&Theta;.&theta;.&thetasym;.&thetav;.&thickapprox;.&thicksim;.&ThickSpace;.&thinsp;.&ThinSpace;.&thkap;.&thksim;.&THORN.&thorn.&THORN;.&thorn;.&Tilde;.&tilde;.&TildeEqual;.&TildeFullEqual;.&TildeTilde;.&times.&times;.&timesb;.&timesbar;.&timesd;.&tint;.&toea;.&top;.&topbot;.&topcir;.&Topf;.&topf;.&topfork;.&tosa;.&tprime;.&TRADE;.&trade;.&triangle;.&triangledown;.&triangleleft;.&trianglelefteq;.&triangleq;.&triangleright;.&trianglerighteq;.&tridot;.&trie;.&triminus;.&TripleDot;.&triplus;.&trisb;.&tritime;.&trpezium;.&Tscr;.&tscr;.&TScy;.&tscy;.&TSHcy;.&tshcy;.&Tstrok;.&tstrok;.&twixt;.&twoheadleftarrow;.&twoheadrightarrow;.&Uacute.&uacute.&Uacute;.&uacute;.&Uarr;.&uArr;.&uarr;.&Uarrocir;.&Ubrcy;.&ubrcy;.&Ubreve;.&ubreve;.&Ucirc.&ucirc.&Ucirc;.&ucirc;.&Ucy;.&ucy;.&udarr;.&Udblac;.&udblac;.&udhar;.&ufisht;.&Ufr;.&ufr;.&Ugrave.&ugrave.&Ugrave;.&ugrave;.&uHar;.&uharl;.&uharr;.&uhblk;.&ulcorn;.&ulcorner;.&ulcrop;.&ultri;.&Umacr;.&umacr;.&uml.&uml;.&UnderBar;.&UnderBrace;.&UnderBracket;.&UnderParenthesis;.&Union;.&UnionPlus;.&Uogon;.&uogon;.&Uopf;.&uopf;.&UpArrow;.&Uparrow;.&uparrow;.&UpArrowBar;.&UpArrowDownArrow;.&UpDownArrow;.&Updownarrow;.&updownarrow;.&UpEquilibrium;.&upharpoonleft;.&upharpoonright;.&uplus;.&UpperLeftArrow;.&UpperRightArrow;.&Upsi;.&upsi;.&upsih;.&Upsilon;.&upsilon;.&UpTee;.&UpTeeArrow;.&upuparrows;.&urcorn;.&urcorner;.&urcrop;.&Uring;.&uring;.&urtri;.&Uscr;.&uscr;.&utdot;.&Utilde;.&utilde;.&utri;.&utrif;.&uuarr;.&Uuml.&uuml.&Uuml;.&uuml;.&uwangle;.&vangrt;.&varepsilon;.&varkappa;.&varnothing;.&varphi;.&varpi;.&varpropto;.&vArr;.&varr;.&varrho;.&varsigma;.&varsubsetneq;.&varsubsetneqq;.&varsupsetneq;.&varsupsetneqq;.&vartheta;.&vartriangleleft;.&vartriangleright;.&Vbar;.&vBar;.&vBarv;.&Vcy;.&vcy;.&VDash;.&Vdash;.&vDash;.&vdash;.&Vdashl;.&Vee;.&vee;.&veebar;.&veeeq;.&vellip;.&Verbar;.&verbar;.&Vert;.&vert;.&VerticalBar;.&VerticalLine;.&VerticalSeparator;.&VerticalTilde;.&VeryThinSpace;.&Vfr;.&vfr;.&vltri;.&vnsub;.&vnsup;.&Vopf;.&vopf;.&vprop;.&vrtri;.&Vscr;.&vscr;.&vsubnE;.&vsubne;.&vsupnE;.&vsupne;.&Vvdash;.&vzigzag;.&Wcirc;.&wcirc;.&wedbar;.&Wedge;.&wedge;.&wedgeq;.&weierp;.&Wfr;.&wfr;.&Wopf;.&wopf;.&wp;.&wr;.&wreath;.&Wscr;.&wscr;.&xcap;.&xcirc;.&xcup;.&xdtri;.&Xfr;.&xfr;.&xhArr;.&xharr;.&Xi;.&xi;.&xlArr;.&xlarr;.&xmap;.&xnis;.&xodot;.&Xopf;.&xopf;.&xoplus;.&xotime;.&xrArr;.&xrarr;.&Xscr;.&xscr;.&xsqcup;.&xuplus;.&xutri;.&xvee;.&xwedge;.&Yacute.&yacute.&Yacute;.&yacute;.&YAcy;.&yacy;.&Ycirc;.&ycirc;.&Ycy;.&ycy;.&yen.&yen;.&Yfr;.&yfr;.&YIcy;.&yicy;.&Yopf;.&yopf;.&Yscr;.&yscr;.&YUcy;.&yucy;.&yuml.&Yuml;.&yuml;.&Zacute;.&zacute;.&Zcaron;.&zcaron;.&Zcy;.&zcy;.&Zdot;.&zdot;.&zeetrf;.&ZeroWidthSpace;.&Zeta;.&zeta;.&Zfr;.&zfr;.&ZHcy;.&zhcy;.&zigrarr;.&Zopf;.&zopf;.&Zscr;.&zscr;.&zwj;.&zwnj;".split("."), Tt = Object.create, Et = Object.defineProperty, Dt = Object.getOwnPropertyDescriptor, Ot = Object.getOwnPropertyNames, kt = Object.getPrototypeOf, At = Object.prototype.hasOwnProperty, jt = (e, t) => function() {
	return t || (0, e[Ot(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, Mt = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (let i of Ot(t)) !At.call(e, i) && i !== n && Et(e, i, {
		get: () => t[i],
		enumerable: !(r = Dt(t, i)) || r.enumerable
	});
	return e;
}, Nt = (e, t, n) => (n = e == null ? {} : Tt(kt(e)), Mt(t || !e || !e.__esModule ? Et(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), Pt = jt({ "node_modules/leven/index.js"(e, t) {
	var n = [], r = [], i = (e, t) => {
		if (e === t) return 0;
		let i = e;
		e.length > t.length && (e = t, t = i);
		let a = e.length, o = t.length;
		for (; a > 0 && e.charCodeAt(~-a) === t.charCodeAt(~-o);) a--, o--;
		let s = 0;
		for (; s < a && e.charCodeAt(s) === t.charCodeAt(s);) s++;
		if (a -= s, o -= s, a === 0) return o;
		let c, l, u, d, f = 0, p = 0;
		for (; f < a;) r[f] = e.charCodeAt(s + f), n[f] = ++f;
		for (; p < o;) for (c = t.charCodeAt(s + p), u = p++, l = p, f = 0; f < a; f++) d = c === r[f] ? u : u + 1, u = n[f], l = n[f] = u > l ? d > l ? l + 1 : d : d > u ? u + 1 : d;
		return l;
	};
	t.exports = i, t.exports.default = i;
} }), Ft = jt({ "node_modules/jsonpointer/jsonpointer.js"(e) {
	var t = /~/, n = /~[01]/g;
	function r(e) {
		switch (e) {
			case "~1": return "/";
			case "~0": return "~";
		}
		throw Error("Invalid tilde escape: " + e);
	}
	function i(e) {
		return t.test(e) ? e.replace(n, r) : e;
	}
	function a(e, t, n) {
		for (var r, a, o = 1, s = t.length; o < s;) {
			if (t[o] === "constructor" || t[o] === "prototype" || t[o] === "__proto__") return e;
			if (r = i(t[o++]), a = s > o, e[r] === void 0 && (Array.isArray(e) && r === "-" && (r = e.length), a && (t[o] !== "" && t[o] < Infinity || t[o] === "-" ? e[r] = [] : e[r] = {})), !a) break;
			e = e[r];
		}
		var c = e[r];
		return n === void 0 ? delete e[r] : e[r] = n, c;
	}
	function o(e) {
		if (typeof e == "string") {
			if (e = e.split("/"), e[0] === "") return e;
			throw Error("Invalid JSON pointer.");
		} else if (Array.isArray(e)) {
			for (let t of e) if (typeof t != "string" && typeof t != "number") throw Error("Invalid JSON pointer. Must be of type string or number.");
			return e;
		}
		throw Error("Invalid JSON pointer.");
	}
	function s(e, t) {
		if (typeof e != "object") throw Error("Invalid input object.");
		t = o(t);
		var n = t.length;
		if (n === 1) return e;
		for (var r = 1; r < n;) {
			if (e = e[i(t[r++])], n === r) return e;
			if (typeof e != "object" || !e) return;
		}
	}
	function c(e, t, n) {
		if (typeof e != "object") throw Error("Invalid input object.");
		if (t = o(t), t.length === 0) throw Error("Invalid JSON pointer for set.");
		return a(e, t, n);
	}
	function l(e) {
		var t = o(e);
		return {
			get: function(e) {
				return s(e, t);
			},
			set: function(e, n) {
				return c(e, t, n);
			}
		};
	}
	e.get = s, e.set = c, e.compile = l;
} }), It = 48, Lt = 49, Rt = 57, zt = 92, Bt = 36, Vt = 46, Ht = 34, Ut = 97, Wt = 101, Gt = 102, Kt = 110, qt = 116, Jt = 117, Yt = 120, Xt = 122, Zt = 45, Qt = 10, $t = 43, en = 13, tn = 39, nn = 47, rn = 32, an = 9, on = 95, sn = 65, cn = 69, ln = 70, un = 78, dn = 88, fn = 90, pn = 98, mn = 114, hn = 118, gn = 8232, _n = 8233, vn = 73, yn = 42, bn = 11, xn = 12, Sn = 160, Cn = 65279, wn = 160, Tn = 8192, En = 8193, Dn = 8194, On = 8195, kn = 8196, An = 8197, jn = 8198, Mn = 8199, Nn = 8200, Pn = 8201, Fn = 8202, In = 8239, Ln = 8287, Rn = 12288, zn = "[", Bn = "]", Vn = "{", Hn = "}", Un = ":", Wn = ",", Gn = "true", Kn = "false", qn = "null", Jn = "NaN", Yn = "Infinity", Xn = "\"", Zn = /* @__PURE__ */ new Map([
	[Ht, Xn],
	[zt, "\\"],
	[nn, "/"],
	[pn, "\b"],
	[Kt, "\n"],
	[Gt, "\f"],
	[mn, "\r"],
	[qt, "	"]
]), Qn = new Map([
	...Zn,
	[hn, "\v"],
	[It, "\0"]
]);
new Map([
	.../* @__PURE__ */ new Map([
		[Xn, Xn],
		["\\", "\\"],
		["/", "/"],
		["\b", "b"],
		["\n", "n"],
		["\f", "f"],
		["\r", "r"],
		["	", "t"]
	]),
	["\v", "v"],
	["\0", "0"],
	["\u2028", "u2028"],
	["\u2029", "u2029"]
]);
var $n = /* @__PURE__ */ new Map([
	[zn, "LBracket"],
	[Bn, "RBracket"],
	[Vn, "LBrace"],
	[Hn, "RBrace"],
	[Un, "Colon"],
	[Wn, "Comma"],
	[Gn, "Boolean"],
	[Kn, "Boolean"],
	[qn, "Null"]
]), er = new Map([
	...$n,
	[Jn, "Number"],
	[Yn, "Number"]
]), tr = /* @__PURE__ */ new Set([
	Qt,
	en,
	gn,
	_n
]), nr = class extends Error {
	constructor(e, { line: t, column: n, offset: r }) {
		super(`${e} (${t}:${n})`), this.line = t, this.column = n, this.offset = r;
	}
}, rr = class extends nr {
	constructor(e, t) {
		super(`Unexpected character '${String.fromCharCode(e)}' found.`, t);
	}
}, ir = class extends nr {
	constructor(e, t) {
		super(`Unexpected identifier '${e}' found.`, t);
	}
}, ar = class extends nr {
	constructor(e) {
		super(`Unexpected token ${e.type} found.`, e.loc.start);
	}
}, or = class extends nr {
	constructor(e) {
		super("Unexpected end of input found.", e);
	}
}, sr = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE83\uDE86-\uDE89\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]/, cr = /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u0860-\u086A\u08A0-\u08B4\u08B6-\u08BD\u08D4-\u08E1\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFF\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D00-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D54-\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19D9\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1CD0-\u1CD2\u1CD4-\u1CF9\u1D00-\u1DF9\u1DFB-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312E\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FEA\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE3E\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC00-\uDC4A\uDC50-\uDC59\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDE00-\uDE3E\uDE47\uDE50-\uDE83\uDE86-\uDE99\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC40\uDC50-\uDC59\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD47\uDD50-\uDD59]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F\uDFE0\uDFE1]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00-\uDD1E\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6\uDD00-\uDD4A\uDD50-\uDD59]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/, lr = 13, ur = 10, dr = class {
	#e = "";
	#t = 1;
	#n = 0;
	#r = -1;
	#i = !1;
	#a = -1;
	#o = !1;
	constructor(e) {
		this.#e = e;
	}
	#s() {
		this.#o ||= (this.#n++, this.#r++, this.#a = -1, !0);
	}
	locate() {
		return {
			line: this.#t,
			column: this.#n,
			offset: this.#r
		};
	}
	next() {
		if (this.#r >= this.#e.length - 1) return this.#s(), -1;
		this.#r++;
		let e = this.#e.charCodeAt(this.#r);
		return this.#i ? (this.#t++, this.#n = 1, this.#i = !1) : this.#n++, e === lr ? (this.#i = !0, this.peek() === ur && this.#r++) : e === ur && (this.#i = !0), this.#a = e, e;
	}
	peek() {
		return this.#r === this.#e.length - 1 ? -1 : this.#e.charCodeAt(this.#r + 1);
	}
	match(e) {
		return e(this.peek()) ? (this.next(), !0) : !1;
	}
	current() {
		return this.#a;
	}
}, fr = "Infinity", pr = "NaN", mr = /* @__PURE__ */ new Set([
	qt,
	Gt,
	Kt
]), hr = /* @__PURE__ */ new Set([
	rn,
	an,
	Qt,
	en
]), gr = /* @__PURE__ */ new Set([
	...hr,
	bn,
	xn,
	Sn,
	gn,
	_n,
	Cn,
	wn,
	Tn,
	En,
	Dn,
	On,
	kn,
	An,
	jn,
	Mn,
	Nn,
	Pn,
	Fn,
	In,
	Ln,
	Rn
]), _r = {
	mode: "json",
	ranges: !1
}, vr = /* @__PURE__ */ new Set([
	"true",
	"false",
	"null"
]), P = {
	EOF: 0,
	Number: 1,
	String: 2,
	Boolean: 3,
	Null: 4,
	NaN: 5,
	Infinity: 6,
	Identifier: 7,
	Colon: 20,
	LBrace: 21,
	RBrace: 22,
	LBracket: 23,
	RBracket: 24,
	Comma: 25,
	LineComment: 40,
	BlockComment: 41
};
function yr(e) {
	return e >= It && e <= Rt;
}
function br(e) {
	return yr(e) || e >= sn && e <= ln || e >= Ut && e <= Gt;
}
function xr(e) {
	return e >= Lt && e <= Rt;
}
function Sr(e) {
	return mr.has(e);
}
function Cr(e) {
	return yr(e) || e === Vt || e === Zt;
}
function wr(e) {
	return Cr(e) || e === $t;
}
function Tr(e, t) {
	return e === Ht || t && e === tn;
}
function Er(e) {
	if (e === Bt || e === on || e === zt || e >= Ut && e <= Xt || e >= sn && e <= fn || e === 8204 || e === 8205) return !0;
	let t = String.fromCharCode(e);
	return sr.test(t);
}
function Dr(e) {
	if (Er(e) || yr(e)) return !0;
	let t = String.fromCharCode(e);
	return cr.test(t);
}
var Or = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	#c;
	#l;
	#u;
	constructor(e, t) {
		this.#t = e, this.#e = {
			..._r,
			...t
		}, this.#n = new dr(e), this.#r = this.#e.mode === "json5", this.#i = this.#e.mode !== "json", this.#a = this.#e.ranges, this.#s = this.#r ? Qn.has.bind(Qn) : Zn.has.bind(Zn), this.#c = this.#r ? tr.has.bind(tr) : () => !1, this.#l = this.#r ? (e) => e === Yt : () => !1, this.#u = this.#r ? gr.has.bind(gr) : hr.has.bind(hr);
	}
	#d(e, t = this.#n.locate()) {
		throw new rr(e, t);
	}
	#f(e, t = this.#n.locate()) {
		throw new ir(e, t);
	}
	#p() {
		throw new or(this.#n.locate());
	}
	#m(e, t, n, r) {
		let i = n.offset + t, a = this.#e.ranges ? { range: [n.offset, i] } : void 0;
		return {
			type: e,
			loc: {
				start: n,
				end: r || {
					line: n.line,
					column: n.column + t,
					offset: i
				}
			},
			...a
		};
	}
	#h(e) {
		let t = "", n;
		for (let r = 0; r < e; r++) {
			if (n = this.#n.peek(), br(n)) {
				this.#n.next(), t += String.fromCharCode(n);
				continue;
			}
			this.#d(n);
		}
		return t;
	}
	#g(e) {
		let t = "";
		do {
			if (t += String.fromCharCode(e), e === zt) {
				e = this.#n.next(), e !== Jt && this.#d(e), t += String.fromCharCode(e);
				let n = this.#h(4), r = parseInt(n, 16);
				if (t.length === 2 && !Er(r)) {
					let e = this.#n.locate();
					this.#d(zt, {
						line: e.line,
						column: e.column - 5,
						offset: e.offset - 5
					});
				} else if (!Dr(r)) {
					let e = this.#n.locate();
					this.#d(r, {
						line: e.line,
						column: e.column - 5,
						offset: e.offset - 5
					});
				}
				t += n;
			}
			if (e = this.#n.peek(), !Dr(e)) break;
			this.#n.next();
		} while (!0);
		return t;
	}
	#_(e) {
		let t = e, n = 1;
		for (e = this.#n.peek(); e !== -1 && e !== t;) {
			if (this.#n.next(), n++, e === zt) if (e = this.#n.peek(), this.#s(e) || this.#c(e)) this.#n.next(), n++;
			else if (e === Jt) {
				this.#n.next(), n++;
				let e = this.#h(4);
				n += e.length;
			} else if (this.#l(e)) {
				this.#n.next(), n++;
				let e = this.#h(2);
				n += e.length;
			} else this.#r ? (this.#n.next(), n++) : this.#d(e);
			e = this.#n.peek();
		}
		return e === -1 && (this.#n.next(), this.#p()), this.#n.next(), n++, n;
	}
	#v(e) {
		let t = 1;
		if (e === Zt || this.#r && e === $t) {
			if (e = this.#n.peek(), this.#r && (e === vn || e === un)) {
				this.#n.next();
				let n = this.#g(e);
				return n !== fr && n !== pr && this.#d(e), t + n.length;
			}
			yr(e) || this.#d(e), this.#n.next(), t++;
		}
		if (e === It) if (e = this.#n.peek(), this.#r && (e === Yt || e === dn)) {
			this.#n.next(), t++, e = this.#n.peek(), br(e) || (this.#n.next(), this.#d(e));
			do
				this.#n.next(), t++, e = this.#n.peek();
			while (br(e));
		} else yr(e) && this.#d(e);
		else if (!this.#r || e !== Vt) for (xr(e) || this.#d(e), e = this.#n.peek(); yr(e);) this.#n.next(), t++, e = this.#n.peek();
		if (e === Vt) {
			let n = -1;
			for (this.#n.next(), t++, n++, e = this.#n.peek(); yr(e);) this.#n.next(), t++, n++, e = this.#n.peek();
			!this.#r && n === 0 && (this.#n.next(), e ? this.#d(e) : this.#p());
		}
		if (e === Wt || e === cn) for (this.#n.next(), t++, e = this.#n.peek(), (e === $t || e === Zt) && (this.#n.next(), t++, e = this.#n.peek()), e === -1 && (this.#n.next(), this.#p()), yr(e) || (this.#n.next(), this.#d(e)); yr(e);) this.#n.next(), t++, e = this.#n.peek();
		return t;
	}
	#y(e) {
		let t = 1;
		if (e = this.#n.peek(), e === nn) {
			do
				this.#n.next(), t += 1, e = this.#n.peek();
			while (e > -1 && e !== en && e !== Qt);
			return {
				length: t,
				multiline: !1
			};
		}
		if (e === yn) {
			for (this.#n.next(), t += 1; e > -1;) if (e = this.#n.peek(), e === yn) {
				if (this.#n.next(), t += 1, e = this.#n.peek(), e === nn) return this.#n.next(), t += 1, {
					length: t,
					multiline: !0
				};
			} else this.#n.next(), t += 1;
			this.#n.next(), this.#p();
		}
		this.#n.next(), this.#d(e);
	}
	next() {
		let e = this.#n.next();
		for (; this.#u(e);) e = this.#n.next();
		if (e === -1) return P.EOF;
		let t = this.#n.locate(), n = String.fromCharCode(e);
		if (this.#r) if (er.has(n)) this.#o = this.#m(er.get(n), 1, t);
		else if (Er(e)) {
			let n = this.#g(e);
			er.has(n) ? this.#o = this.#m(er.get(n), n.length, t) : this.#o = this.#m("Identifier", n.length, t);
		} else if (wr(e)) {
			let n = this.#v(e);
			this.#o = this.#m("Number", n, t);
		} else if (Tr(e, this.#r)) {
			let n = this.#_(e), r = this.#n.locate();
			this.#o = this.#m("String", n, t, {
				line: r.line,
				column: r.column + 1,
				offset: r.offset + 1
			});
		} else if (e === nn && this.#i) {
			let n = this.#y(e), r = this.#n.locate();
			this.#o = this.#m(n.multiline ? "BlockComment" : "LineComment", n.length, t, {
				line: r.line,
				column: r.column + 1,
				offset: r.offset + 1
			});
		} else this.#d(e);
		else if ($n.has(n)) this.#o = this.#m($n.get(n), 1, t);
		else if (Sr(e)) {
			let n = this.#g(e);
			vr.has(n) || this.#f(n, t), this.#o = this.#m($n.get(n), n.length, t);
		} else if (Cr(e)) {
			let n = this.#v(e);
			this.#o = this.#m("Number", n, t);
		} else if (Tr(e, this.#r)) {
			let n = this.#_(e);
			this.#o = this.#m("String", n, t);
		} else if (e === nn && this.#i) {
			let n = this.#y(e), r = this.#n.locate();
			this.#o = this.#m(n.multiline ? "BlockComment" : "LineComment", n.length, t, {
				line: r.line,
				column: r.column + 1,
				offset: r.offset + 1
			});
		} else this.#d(e);
		return P[this.#o.type];
	}
	get token() {
		return this.#o;
	}
}, F = {
	document(e, t = {}) {
		return {
			type: "Document",
			body: e,
			loc: t.loc,
			...t
		};
	},
	string(e, t = {}) {
		return {
			type: "String",
			value: e,
			loc: t.loc,
			...t
		};
	},
	number(e, t = {}) {
		return {
			type: "Number",
			value: e,
			loc: t.loc,
			...t
		};
	},
	boolean(e, t = {}) {
		return {
			type: "Boolean",
			value: e,
			loc: t.loc,
			...t
		};
	},
	null(e = {}) {
		return {
			type: "Null",
			loc: e.loc,
			...e
		};
	},
	array(e, t = {}) {
		return {
			type: "Array",
			elements: e,
			loc: t.loc,
			...t
		};
	},
	element(e, t = {}) {
		return {
			type: "Element",
			value: e,
			loc: t.loc,
			...t
		};
	},
	object(e, t = {}) {
		return {
			type: "Object",
			members: e,
			loc: t.loc,
			...t
		};
	},
	member(e, t, n = {}) {
		return {
			type: "Member",
			name: e,
			value: t,
			loc: n.loc,
			...n
		};
	},
	identifier(e, t = {}) {
		return {
			type: "Identifier",
			name: e,
			loc: t.loc,
			...t
		};
	},
	nan(e = "", t = {}) {
		return {
			type: "NaN",
			sign: e,
			loc: t.loc,
			...t
		};
	},
	infinity(e = "", t = {}) {
		return {
			type: "Infinity",
			sign: e,
			loc: t.loc,
			...t
		};
	}
}, kr = {
	mode: "json",
	ranges: !1,
	tokens: !1,
	allowTrailingCommas: !1
}, Ar = /\\u[\da-fA-F]{4}/gu;
function jr(e) {
	return e.replace(Ar, (e) => String.fromCharCode(parseInt(e.slice(2), 16)));
}
function Mr(e) {
	let t = 1, n = 1;
	for (let r = 0; r < e.length; r++) {
		let i = e[r];
		i === "\n" ? (t++, n = 1) : i === "\r" ? (e[r + 1] === "\n" && r++, t++, n = 1) : n++;
	}
	return {
		line: t,
		column: n,
		offset: e.length
	};
}
function Nr(e, t, n = !1) {
	let r = "", i = e.indexOf("\\"), a = 0;
	for (; i >= 0;) {
		r += e.slice(a, i);
		let o = e.charAt(i + 1), s = o.charCodeAt(0);
		if (n && Qn.has(s)) r += Qn.get(s), a = i + 2;
		else if (Zn.has(s)) r += Zn.get(s), a = i + 2;
		else if (o === "u") {
			let n = e.slice(i + 2, i + 6);
			if (n.length < 4 || /[^0-9a-f]/i.test(n)) throw new nr(`Invalid unicode escape \\u${n}.`, {
				line: t.loc.start.line,
				column: t.loc.start.column + i,
				offset: t.loc.start.offset + i
			});
			r += String.fromCharCode(parseInt(n, 16)), a = i + 6;
		} else if (n && o === "x") {
			let n = e.slice(i + 2, i + 4);
			if (n.length < 2 || /[^0-9a-f]/i.test(n)) throw new nr(`Invalid hex escape \\x${n}.`, {
				line: t.loc.start.line,
				column: t.loc.start.column + i,
				offset: t.loc.start.offset + i
			});
			r += String.fromCharCode(parseInt(n, 16)), a = i + 4;
		} else if (n && tr.has(s)) a = i + 2, o === "\r" && e.charAt(a) === "\n" && a++;
		else if (n) r += o, a = i + 2;
		else throw new nr(`Invalid escape \\${o}.`, {
			line: t.loc.start.line,
			column: t.loc.start.column + i,
			offset: t.loc.start.offset + i
		});
		i = e.indexOf("\\", a);
	}
	return r += e.slice(a), r;
}
function Pr(e, t, n = !1) {
	switch (t.type) {
		case "Boolean": return e === "true";
		case "Number":
			if (n) {
				if (e.charCodeAt(0) === 45) return -Number(e.slice(1));
				if (e.charCodeAt(0) === 43) return Number(e.slice(1));
			}
			return Number(e);
		case "String": return Nr(e.slice(1, -1), t, n);
		default: throw TypeError(`Unknown token type "${t.type}.`);
	}
}
function Fr(e, t) {
	t = Object.freeze({
		...kr,
		...t
	});
	let n = [], r = new Or(e, {
		mode: t.mode,
		ranges: t.ranges
	}), i = t.mode === "json5", a = t.allowTrailingCommas || i;
	function o() {
		let e = r.next();
		return e && t.tokens && n.push(r.token), e;
	}
	function s() {
		let e = r.next();
		return e && t.tokens && n.push(r.token), e >= P.LineComment ? s() : e;
	}
	let c = t.mode === "json" ? o : s;
	function l(e, t) {
		if (e !== t) throw new ar(r.token);
	}
	function u(e, t) {
		if (!t.includes(e)) throw new ar(r.token);
	}
	function d(e, n) {
		return t.ranges ? { range: [e.offset, n.offset] } : void 0;
	}
	function f(t) {
		let n = r.token, a = d(n.loc.start, n.loc.end), o = Pr(e.slice(n.loc.start.offset, n.loc.end.offset), n, i), s = {
			loc: {
				start: { ...n.loc.start },
				end: { ...n.loc.end }
			},
			...a
		};
		switch (t) {
			case P.String: return F.string(o, s);
			case P.Number: return F.number(o, s);
			case P.Boolean: return F.boolean(o, s);
			default: throw TypeError(`Unknown token type ${n.type}.`);
		}
	}
	function p(t) {
		let n = d(t.loc.start, t.loc.end), r = e.slice(t.loc.start.offset, t.loc.end.offset), i = {
			loc: {
				start: { ...t.loc.start },
				end: { ...t.loc.end }
			},
			...n
		};
		if (t.type !== "Identifier") {
			let e = "";
			return (r[0] === "+" || r[0] === "-") && (e = r[0]), F[r.includes("NaN") ? "nan" : "infinity"](e, i);
		}
		return F.identifier(jr(r), i);
	}
	function m(e) {
		let t = d(e.loc.start, e.loc.end);
		return F.null({
			loc: {
				start: { ...e.loc.start },
				end: { ...e.loc.end }
			},
			...t
		});
	}
	function h(t) {
		i ? u(t, [
			P.String,
			P.Identifier,
			P.Number
		]) : l(t, P.String);
		let n = r.token;
		if (i && t === P.Number && /[+\-0-9]/.test(e[n.loc.start.offset])) throw new ar(n);
		let a = t === P.String ? f(t) : p(n);
		if (i && (a.type === "NaN" || a.type === "Infinity")) {
			if (a.sign !== "") throw new ar(r.token);
			a = F.identifier(a.type, {
				loc: a.loc,
				...d(a.loc.start, a.loc.end)
			});
		}
		t = c(), l(t, P.Colon);
		let o = v(), s = d(a.loc.start, o.loc.end);
		return F.member(a, o, {
			loc: {
				start: { ...a.loc.start },
				end: { ...o.loc.end }
			},
			...s
		});
	}
	function g(e) {
		l(e, P.LBrace);
		let t = r.token, n = [], i = c();
		if (i !== P.RBrace) do {
			if (n.push(h(i)), i = c(), !i) throw new or(n[n.length - 1].loc.end);
			if (i === P.Comma) {
				if (i = c(), a && i === P.RBrace) break;
			} else break;
		} while (i);
		l(i, P.RBrace);
		let o = r.token, s = d(t.loc.start, o.loc.end);
		return F.object(n, {
			loc: {
				start: { ...t.loc.start },
				end: { ...o.loc.end }
			},
			...s
		});
	}
	function _(e) {
		l(e, P.LBracket);
		let t = r.token, n = [], i = c();
		if (i !== P.RBracket) do {
			let e = v(i);
			if (n.push(F.element(e, { loc: e.loc })), i = c(), i === P.Comma) {
				if (i = c(), a && i === P.RBracket) break;
			} else break;
		} while (i);
		l(i, P.RBracket);
		let o = r.token, s = d(t.loc.start, o.loc.end);
		return F.array(n, {
			loc: {
				start: { ...t.loc.start },
				end: { ...o.loc.end }
			},
			...s
		});
	}
	function v(t) {
		t ??= c();
		let n = r.token;
		switch (t) {
			case P.String:
			case P.Boolean: return f(t);
			case P.Number:
				if (i) {
					let t = e.slice(n.loc.start.offset, n.loc.end.offset);
					if ((t[0] === "+" || t[0] === "-") && (t = t.slice(1)), t === "NaN" || t === "Infinity") return p(n);
				}
				return f(t);
			case P.Null: return m(n);
			case P.LBrace: return g(t);
			case P.LBracket: return _(t);
			default: throw new ar(n);
		}
	}
	let y = v();
	if (c()) throw new ar(r.token);
	let b = { loc: {
		start: {
			line: 1,
			column: 1,
			offset: 0
		},
		end: { ...Mr(e) }
	} };
	return t.tokens && (b.tokens = n), t.ranges && (b.range = [b.loc.start.offset, b.loc.end.offset]), F.document(y, b);
}
var Ir = (e) => (t) => e === t, Lr = (e) => (t) => !e(t), Rr = (e) => Object.values(e), zr = (e) => e !== void 0, Br = (e) => (t) => t.keyword === e, Vr = Br("required"), Hr = Br("anyOf"), Ur = Br("enum"), Wr = (e) => e && e.errors ? e.errors.map((e) => e.keyword === "errorMessage" ? {
	...e.params.errors[0],
	message: e.message
} : e) : [], Gr = (e) => e && Rr(e.children) || [], Kr = (e) => (t) => Gr(e).filter(Lr(Ir(t))), qr = (e) => (t) => t.reduce((e, t) => e.concat(t), e), Jr = /\r\n|[\n\r\u2028\u2029]/;
function Yr(e, t) {
	let n = { ...e.start }, r = {
		...n,
		...e.end
	}, i = n.line, a = n.column, o = r.line, s = r.column, c = Math.max(i - 3, 0), l = Math.min(t.length, o + 3), u = o - i, d = {};
	if (u) for (let e = 0; e <= u; e++) {
		let n = e + i;
		a ? e === 0 ? d[n] = [a, t[n - 1].length - a + 1] : e === u ? d[n] = [0, s] : d[n] = [0, t[n - e].length] : d[n] = !0;
	}
	else a === s ? a ? d[i] = [a, 0] : d[i] = !0 : d[i] = [a, s - a];
	return {
		start: c,
		end: l,
		markerLines: d
	};
}
function Xr(e, t, n = {}) {
	let { start: r, end: i, markerLines: a } = Yr(t, e.split(Jr)), o = String(i).length;
	return e.split(Jr, i).slice(r, i).map((e, t) => {
		let i = r + 1 + t, s = ` ${` ${String(i)}`.slice(-o)} |`, c = a[i], l = !a[i + 1];
		if (c) {
			let t = "";
			if (Array.isArray(c)) {
				let r = e.slice(0, Math.max(c[0] - 1, 0)).replace(/[^\t]/g, " "), i = c[1] || 1;
				t = [
					"\n ",
					s.replace(/\d/g, " "),
					" ",
					r,
					"^".repeat(i)
				].join(""), l && n.message && (t += " " + n.message);
			}
			return [
				">",
				s,
				e.length > 0 ? ` ${e}` : "",
				t
			].join("");
		} else return [
			" ",
			s,
			e.length > 0 ? ` ${e}` : ""
		].join("");
	}).join("\n");
}
var Zr = (e) => e.split("/").slice(1).map((e) => e.split("~1").join("/").split("~0").join("~"));
function Qr(e, t, n) {
	let r = Zr(t), i = r.length - 1;
	return r.reduce((e, r, a) => {
		switch (e.type) {
			case "Object": {
				let o = e.members.filter((e) => e.name.value === r);
				if (o.length !== 1) throw Error(`Couldn't find property ${r} of ${t}`);
				let { name: s, value: c } = o[0];
				return n && a === i ? s : c;
			}
			case "Array": return e.elements[r].value;
			default: console.log(e);
		}
	}, e.body);
}
function $r(e, t) {
	let n = "";
	return Zr(t).reduce((e, r) => {
		switch (e.type) {
			case "Element": e = e.value;
			case "Object": {
				n += `/${r}`;
				let i = e.members.filter((e) => e.name.value === r);
				if (i.length !== 1) throw Error(`Couldn't find property ${r} of ${t}`);
				return i[0].value;
			}
			case "Array": return n += `/${r}${ei(e.elements[r])}`, e.elements[r];
			default: console.log(e);
		}
	}, e.body), n;
}
function ei(e) {
	if (!e || !e.elements) return "";
	let t = e.elements.filter((e) => e && e.name && e.name.value === "type");
	return t.length && t[0].value && `:${t[0].value.value}` || "";
}
var ti = class {
	constructor(e = { isIdentifierLocation: !1 }, { data: t, schema: n, jsonAst: r, jsonRaw: i, colors: a }) {
		this.options = e, this.data = t, this.schema = n, this.jsonAst = r, this.jsonRaw = i, this.colors = a;
	}
	getLocation(e = this.instancePath) {
		let { isIdentifierLocation: t, isSkipEndLocation: n } = this.options, { loc: r } = Qr(this.jsonAst, e, t);
		return {
			start: r.start,
			end: n ? void 0 : r.end
		};
	}
	getDecoratedPath(e = this.instancePath) {
		return $r(this.jsonAst, e);
	}
	getCodeFrame(e, t = this.instancePath) {
		return Xr(this.jsonRaw, this.getLocation(t), { message: e });
	}
	get instancePath() {
		return this.options.instancePath === void 0 ? this.options.dataPath : this.options.instancePath;
	}
	print() {
		throw Error(`Implement the 'print' method inside ${this.constructor.name}!`);
	}
	getError() {
		throw Error(`Implement the 'getError' method inside ${this.constructor.name}!`);
	}
}, ni = class extends ti {
	getLocation(e = this.instancePath) {
		let { start: t } = super.getLocation(e);
		return { start: t };
	}
	print() {
		let { message: e, params: t } = this.options, { error: n, property: r, bold: i } = this.colors;
		return [`${n(`${i("REQUIRED")} ${e}`)}
`].concat(this.getCodeFrame(`${r(t.missingProperty)} is missing here!`));
	}
	getError() {
		let { message: e } = this.options;
		return {
			...this.getLocation(),
			error: `${this.getDecoratedPath()} ${e}`,
			path: this.instancePath
		};
	}
}, ri = class extends ti {
	constructor(...e) {
		super(...e), this.options.isIdentifierLocation = !0;
	}
	print() {
		let { message: e, params: t } = this.options, { error: n, property: r, bold: i } = this.colors;
		return [`${n(`${i("ADDITIONAL PROPERTY")} ${e}`)}
`].concat(this.getCodeFrame(`${r(t.additionalProperty)} is not expected to be here!`, `${this.instancePath}/${t.additionalProperty}`));
	}
	getError() {
		let { params: e } = this.options;
		return {
			...this.getLocation(`${this.instancePath}/${e.additionalProperty}`),
			error: `${this.getDecoratedPath()} Property ${e.additionalProperty} is not expected to be here`,
			path: this.instancePath
		};
	}
}, ii = Nt(Pt()), ai = Nt(Ft()), oi = class extends ti {
	print() {
		let { message: e, params: { allowedValues: t } } = this.options, { error: n, property: r, bold: i } = this.colors, a = this.findBestMatch();
		return [n(`${i("ENUM")} ${e}`), `${n(`(${t.join(", ")})`)}
`].concat(this.getCodeFrame(a === null ? "Unexpected value, should be equal to one of the allowed values" : `Did you mean ${r(a)} here?`));
	}
	getError() {
		let { message: e, params: t } = this.options, n = this.findBestMatch(), r = t.allowedValues.join(", "), i = {
			...this.getLocation(),
			error: `${this.getDecoratedPath()} ${e}: ${r}`,
			path: this.instancePath
		};
		return n !== null && (i.suggestion = `Did you mean ${n}?`), i;
	}
	findBestMatch() {
		let { params: { allowedValues: e } } = this.options, t = this.instancePath === "" ? this.data : ai.default.get(this.data, this.instancePath);
		if (!t) return null;
		let n = e.map((e) => ({
			value: e,
			weight: (0, ii.default)(e, t.toString())
		})).sort((e, t) => e.weight > t.weight ? 1 : e.weight < t.weight ? -1 : 0)[0];
		return e.length === 1 || n.weight < n.value.length ? n.value : null;
	}
}, si = class extends ti {
	print() {
		let { keyword: e, message: t } = this.options, { error: n, property: r, bold: i } = this.colors;
		return [`${n(`${i(e.toUpperCase())} ${t}`)}
`].concat(this.getCodeFrame(`${r(e)} ${t}`));
	}
	getError() {
		let { keyword: e, message: t } = this.options;
		return {
			...this.getLocation(),
			error: `${this.getDecoratedPath()}: ${e} ${t}`,
			path: this.instancePath
		};
	}
}, ci = /\/[\w_-]+(\/\d+)?/g;
function li(e = []) {
	let t = { children: {} };
	return e.forEach((e) => {
		let n = e.instancePath === void 0 ? e.dataPath : e.instancePath, r = n === "" ? [""] : n.match(ci);
		r && r.reduce((t, n, i) => (t.children[n] = t.children[n] || {
			children: {},
			errors: []
		}, i === r.length - 1 && t.children[n].errors.push(e), t.children[n]), t);
	}), t;
}
function ui(e, t, n) {
	Wr(e).forEach((t) => {
		Vr(t) && (e.errors = [t], e.children = {});
	}), Wr(e).some(Hr) && Object.keys(e.children).length > 0 && delete e.errors, e.errors && e.errors.length && Wr(e).every(Ur) && Kr(t)(e).filter(zr).some(Wr) && delete t.children[n], Object.entries(e.children).forEach(([t, n]) => ui(n, e, t));
}
function di(e, t) {
	let n = Wr(e);
	if (n.length && n.every(Ur)) {
		let e = [...new Set(qr([])(n.map((e) => e.params.allowedValues)))], r = n[0];
		return [new oi({
			...r,
			params: { allowedValues: e }
		}, t)];
	} else return qr(n.reduce((e, n) => {
		switch (n.keyword) {
			case "additionalProperties": return e.concat(new ri(n, t));
			case "enum": return e.concat(new oi(n, t));
			case "required": return e.concat(new ni(n, t));
			default: return e.concat(new si(n, t));
		}
	}, []))(Gr(e).map((e) => di(e, t)));
}
var fi = (e, t) => {
	let n = li(e || []);
	return ui(n), di(n, t);
}, pi = (e) => e;
function mi(e = {}) {
	return {
		error: e.error ?? pi,
		property: e.property ?? pi,
		bold: e.bold ?? pi
	};
}
var hi = (e, t, n, r = {}) => {
	let { format: i = "cli", indent: a = null, json: o = null, colors: s } = r, c = o || JSON.stringify(t, null, a), l = Fr(c), u = (e) => e.print().join("\n"), d = (e) => e.getError(), f = fi(n, {
		data: t,
		schema: e,
		jsonAst: l,
		jsonRaw: c,
		colors: mi(s)
	});
	return i === "cli" ? f.map(u).join("\n\n") : f.map(d);
}, gi = /* @__PURE__ */ i(((e, t) => {
	var n = "2.0.0", r = 256;
	t.exports = {
		MAX_LENGTH: r,
		MAX_SAFE_COMPONENT_LENGTH: 16,
		MAX_SAFE_BUILD_LENGTH: r - 6,
		MAX_SAFE_INTEGER: 2 ** 53 - 1 || 9007199254740991,
		RELEASE_TYPES: [
			"major",
			"premajor",
			"minor",
			"preminor",
			"patch",
			"prepatch",
			"prerelease"
		],
		SEMVER_SPEC_VERSION: n,
		FLAG_INCLUDE_PRERELEASE: 1,
		FLAG_LOOSE: 2
	};
})), _i = /* @__PURE__ */ i(((e, t) => {
	t.exports = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {};
})), vi = /* @__PURE__ */ i(((e, t) => {
	var { MAX_SAFE_COMPONENT_LENGTH: n, MAX_SAFE_BUILD_LENGTH: r, MAX_LENGTH: i } = gi(), a = _i();
	e = t.exports = {};
	var o = e.re = [], s = e.safeRe = [], c = e.src = [], l = e.safeSrc = [], u = e.t = {}, d = 0, f = "[a-zA-Z0-9-]", p = [
		["\\s", 1],
		["\\d", i],
		[f, r]
	], m = (e) => {
		for (let [t, n] of p) e = e.split(`${t}*`).join(`${t}{0,${n}}`).split(`${t}+`).join(`${t}{1,${n}}`);
		return e;
	}, h = (e, t, n) => {
		let r = m(t), i = d++;
		a(e, i, t), u[e] = i, c[i] = t, l[i] = r, o[i] = new RegExp(t, n ? "g" : void 0), s[i] = new RegExp(r, n ? "g" : void 0);
	};
	h("NUMERICIDENTIFIER", "0|[1-9]\\d*"), h("NUMERICIDENTIFIERLOOSE", "\\d+"), h("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${f}*`), h("MAINVERSION", `(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})\\.(${c[u.NUMERICIDENTIFIER]})`), h("MAINVERSIONLOOSE", `(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})\\.(${c[u.NUMERICIDENTIFIERLOOSE]})`), h("PRERELEASEIDENTIFIER", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIER]})`), h("PRERELEASEIDENTIFIERLOOSE", `(?:${c[u.NONNUMERICIDENTIFIER]}|${c[u.NUMERICIDENTIFIERLOOSE]})`), h("PRERELEASE", `(?:-(${c[u.PRERELEASEIDENTIFIER]}(?:\\.${c[u.PRERELEASEIDENTIFIER]})*))`), h("PRERELEASELOOSE", `(?:-?(${c[u.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[u.PRERELEASEIDENTIFIERLOOSE]})*))`), h("BUILDIDENTIFIER", `${f}+`), h("BUILD", `(?:\\+(${c[u.BUILDIDENTIFIER]}(?:\\.${c[u.BUILDIDENTIFIER]})*))`), h("FULLPLAIN", `v?${c[u.MAINVERSION]}${c[u.PRERELEASE]}?${c[u.BUILD]}?`), h("FULL", `^${c[u.FULLPLAIN]}$`), h("LOOSEPLAIN", `[v=\\s]*${c[u.MAINVERSIONLOOSE]}${c[u.PRERELEASELOOSE]}?${c[u.BUILD]}?`), h("LOOSE", `^${c[u.LOOSEPLAIN]}$`), h("GTLT", "((?:<|>)?=?)"), h("XRANGEIDENTIFIERLOOSE", `${c[u.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), h("XRANGEIDENTIFIER", `${c[u.NUMERICIDENTIFIER]}|x|X|\\*`), h("XRANGEPLAIN", `[v=\\s]*(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:\\.(${c[u.XRANGEIDENTIFIER]})(?:${c[u.PRERELEASE]})?${c[u.BUILD]}?)?)?`), h("XRANGEPLAINLOOSE", `[v=\\s]*(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[u.XRANGEIDENTIFIERLOOSE]})(?:${c[u.PRERELEASELOOSE]})?${c[u.BUILD]}?)?)?`), h("XRANGE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAIN]}$`), h("XRANGELOOSE", `^${c[u.GTLT]}\\s*${c[u.XRANGEPLAINLOOSE]}$`), h("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), h("COERCE", `${c[u.COERCEPLAIN]}(?:$|[^\\d])`), h("COERCEFULL", c[u.COERCEPLAIN] + `(?:${c[u.PRERELEASE]})?(?:${c[u.BUILD]})?(?:$|[^\\d])`), h("COERCERTL", c[u.COERCE], !0), h("COERCERTLFULL", c[u.COERCEFULL], !0), h("LONETILDE", "(?:~>?)"), h("TILDETRIM", `(\\s*)${c[u.LONETILDE]}\\s+`, !0), e.tildeTrimReplace = "$1~", h("TILDE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAIN]}$`), h("TILDELOOSE", `^${c[u.LONETILDE]}${c[u.XRANGEPLAINLOOSE]}$`), h("LONECARET", "(?:\\^)"), h("CARETTRIM", `(\\s*)${c[u.LONECARET]}\\s+`, !0), e.caretTrimReplace = "$1^", h("CARET", `^${c[u.LONECARET]}${c[u.XRANGEPLAIN]}$`), h("CARETLOOSE", `^${c[u.LONECARET]}${c[u.XRANGEPLAINLOOSE]}$`), h("COMPARATORLOOSE", `^${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]})$|^$`), h("COMPARATOR", `^${c[u.GTLT]}\\s*(${c[u.FULLPLAIN]})$|^$`), h("COMPARATORTRIM", `(\\s*)${c[u.GTLT]}\\s*(${c[u.LOOSEPLAIN]}|${c[u.XRANGEPLAIN]})`, !0), e.comparatorTrimReplace = "$1$2$3", h("HYPHENRANGE", `^\\s*(${c[u.XRANGEPLAIN]})\\s+-\\s+(${c[u.XRANGEPLAIN]})\\s*$`), h("HYPHENRANGELOOSE", `^\\s*(${c[u.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[u.XRANGEPLAINLOOSE]})\\s*$`), h("STAR", "(<|>)?=?\\s*\\*"), h("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), h("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})), yi = /* @__PURE__ */ i(((e, t) => {
	var n = Object.freeze({ loose: !0 }), r = Object.freeze({});
	t.exports = (e) => e ? typeof e == "object" ? e : n : r;
})), bi = /* @__PURE__ */ i(((e, t) => {
	var n = /^[0-9]+$/, r = (e, t) => {
		if (typeof e == "number" && typeof t == "number") return e === t ? 0 : e < t ? -1 : 1;
		let r = n.test(e), i = n.test(t);
		return r && i && (e = +e, t = +t), e === t ? 0 : r && !i ? -1 : i && !r ? 1 : e < t ? -1 : 1;
	};
	t.exports = {
		compareIdentifiers: r,
		rcompareIdentifiers: (e, t) => r(t, e)
	};
})), I = /* @__PURE__ */ i(((e, t) => {
	var n = _i(), { MAX_LENGTH: r, MAX_SAFE_INTEGER: i } = gi(), { safeRe: a, t: o } = vi(), s = yi(), { compareIdentifiers: c } = bi(), l = (e, t) => {
		let n = t.split(".");
		if (n.length > e.length) return !1;
		for (let t = 0; t < n.length; t++) if (c(e[t], n[t]) !== 0) return !1;
		return !0;
	};
	t.exports = class e {
		constructor(t, c) {
			if (c = s(c), t instanceof e) {
				if (t.loose === !!c.loose && t.includePrerelease === !!c.includePrerelease) return t;
				t = t.version;
			} else if (typeof t != "string") throw TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
			if (t.length > r) throw TypeError(`version is longer than ${r} characters`);
			n("SemVer", t, c), this.options = c, this.loose = !!c.loose, this.includePrerelease = !!c.includePrerelease;
			let l = t.trim().match(c.loose ? a[o.LOOSE] : a[o.FULL]);
			if (!l) throw TypeError(`Invalid Version: ${t}`);
			if (this.raw = t, this.major = +l[1], this.minor = +l[2], this.patch = +l[3], this.major > i || this.major < 0) throw TypeError("Invalid major version");
			if (this.minor > i || this.minor < 0) throw TypeError("Invalid minor version");
			if (this.patch > i || this.patch < 0) throw TypeError("Invalid patch version");
			l[4] ? this.prerelease = l[4].split(".").map((e) => {
				if (/^[0-9]+$/.test(e)) {
					let t = +e;
					if (t >= 0 && t < i) return t;
				}
				return e;
			}) : this.prerelease = [], this.build = l[5] ? l[5].split(".") : [], this.format();
		}
		format() {
			return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
		}
		toString() {
			return this.version;
		}
		compare(t) {
			if (n("SemVer.compare", this.version, this.options, t), !(t instanceof e)) {
				if (typeof t == "string" && t === this.version) return 0;
				t = new e(t, this.options);
			}
			return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
		}
		compareMain(t) {
			return t instanceof e || (t = new e(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : +(this.patch > t.patch);
		}
		comparePre(t) {
			if (t instanceof e || (t = new e(t, this.options)), this.prerelease.length && !t.prerelease.length) return -1;
			if (!this.prerelease.length && t.prerelease.length) return 1;
			if (!this.prerelease.length && !t.prerelease.length) return 0;
			let r = 0;
			do {
				let e = this.prerelease[r], i = t.prerelease[r];
				if (n("prerelease compare", r, e, i), e === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (e === void 0) return -1;
				if (e === i) continue;
				return c(e, i);
			} while (++r);
		}
		compareBuild(t) {
			t instanceof e || (t = new e(t, this.options));
			let r = 0;
			do {
				let e = this.build[r], i = t.build[r];
				if (n("build compare", r, e, i), e === void 0 && i === void 0) return 0;
				if (i === void 0) return 1;
				if (e === void 0) return -1;
				if (e === i) continue;
				return c(e, i);
			} while (++r);
		}
		inc(e, t, n) {
			if (e.startsWith("pre")) {
				if (!t && n === !1) throw Error("invalid increment argument: identifier is empty");
				if (t) {
					let e = `-${t}`.match(this.options.loose ? a[o.PRERELEASELOOSE] : a[o.PRERELEASE]);
					if (!e || e[1] !== t) throw Error(`invalid identifier: ${t}`);
				}
			}
			switch (e) {
				case "premajor":
					this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", t, n);
					break;
				case "preminor":
					this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", t, n);
					break;
				case "prepatch":
					this.prerelease.length = 0, this.inc("patch", t, n), this.inc("pre", t, n);
					break;
				case "prerelease":
					this.prerelease.length === 0 && this.inc("patch", t, n), this.inc("pre", t, n);
					break;
				case "release":
					if (this.prerelease.length === 0) throw Error(`version ${this.raw} is not a prerelease`);
					this.prerelease.length = 0;
					break;
				case "major":
					(this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
					break;
				case "minor":
					(this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
					break;
				case "patch":
					this.prerelease.length === 0 && this.patch++, this.prerelease = [];
					break;
				case "pre": {
					let e = +!!Number(n);
					if (this.prerelease.length === 0) this.prerelease = [e];
					else {
						let r = this.prerelease.length;
						for (; --r >= 0;) typeof this.prerelease[r] == "number" && (this.prerelease[r]++, r = -2);
						if (r === -1) {
							if (t === this.prerelease.join(".") && n === !1) throw Error("invalid increment argument: identifier already exists");
							this.prerelease.push(e);
						}
					}
					if (t) {
						let r = [t, e];
						if (n === !1 && (r = [t]), l(this.prerelease, t)) {
							let e = this.prerelease[t.split(".").length];
							isNaN(e) && (this.prerelease = r);
						} else this.prerelease = r;
					}
					break;
				}
				default: throw Error(`invalid increment argument: ${e}`);
			}
			return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
		}
	};
})), xi = /* @__PURE__ */ i(((e, t) => {
	var n = I();
	t.exports = (e, t, r = !1) => {
		if (e instanceof n) return e;
		try {
			return new n(e, t);
		} catch (e) {
			if (!r) return null;
			throw e;
		}
	};
})), Si = /* @__PURE__ */ i(((e, t) => {
	var n = xi();
	t.exports = (e, t) => {
		let r = n(e, t);
		return r ? r.version : null;
	};
})), Ci = /* @__PURE__ */ i(((e, t) => {
	var n = xi();
	t.exports = (e, t) => {
		let r = n(e.trim().replace(/^[=v]+/, ""), t);
		return r ? r.version : null;
	};
})), wi = /* @__PURE__ */ i(((e, t) => {
	var n = I();
	t.exports = (e, t, r, i, a) => {
		typeof r == "string" && (a = i, i = r, r = void 0);
		try {
			return new n(e instanceof n ? e.version : e, r).inc(t, i, a).version;
		} catch {
			return null;
		}
	};
})), Ti = /* @__PURE__ */ i(((e, t) => {
	var n = xi();
	t.exports = (e, t) => {
		let r = n(e, null, !0), i = n(t, null, !0), a = r.compare(i);
		if (a === 0) return null;
		let o = a > 0, s = o ? r : i, c = o ? i : r, l = !!s.prerelease.length;
		if (c.prerelease.length && !l) {
			if (!c.patch && !c.minor) return "major";
			if (c.compareMain(s) === 0) return c.minor && !c.patch ? "minor" : "patch";
		}
		let u = l ? "pre" : "";
		return r.major === i.major ? r.minor === i.minor ? r.patch === i.patch ? "prerelease" : u + "patch" : u + "minor" : u + "major";
	};
})), Ei = /* @__PURE__ */ i(((e, t) => {
	var n = I();
	t.exports = (e, t) => new n(e, t).major;
})), Di = /* @__PURE__ */ i(((e, t) => {
	var n = I();
	t.exports = (e, t) => new n(e, t).minor;
})), Oi = /* @__PURE__ */ i(((e, t) => {
	var n = I();
	t.exports = (e, t) => new n(e, t).patch;
})), ki = /* @__PURE__ */ i(((e, t) => {
	var n = xi();
	t.exports = (e, t) => {
		let r = n(e, t);
		return r && r.prerelease.length ? r.prerelease : null;
	};
})), L = /* @__PURE__ */ i(((e, t) => {
	var n = I();
	t.exports = (e, t, r) => new n(e, r).compare(new n(t, r));
})), Ai = /* @__PURE__ */ i(((e, t) => {
	var n = L();
	t.exports = (e, t, r) => n(t, e, r);
})), ji = /* @__PURE__ */ i(((e, t) => {
	var n = L();
	t.exports = (e, t) => n(e, t, !0);
})), Mi = /* @__PURE__ */ i(((e, t) => {
	var n = I();
	t.exports = (e, t, r) => {
		let i = new n(e, r), a = new n(t, r);
		return i.compare(a) || i.compareBuild(a);
	};
})), Ni = /* @__PURE__ */ i(((e, t) => {
	var n = Mi();
	t.exports = (e, t) => e.sort((e, r) => n(e, r, t));
})), Pi = /* @__PURE__ */ i(((e, t) => {
	var n = Mi();
	t.exports = (e, t) => e.sort((e, r) => n(r, e, t));
})), Fi = /* @__PURE__ */ i(((e, t) => {
	var n = L();
	t.exports = (e, t, r) => n(e, t, r) > 0;
})), Ii = /* @__PURE__ */ i(((e, t) => {
	var n = L();
	t.exports = (e, t, r) => n(e, t, r) < 0;
})), Li = /* @__PURE__ */ i(((e, t) => {
	var n = L();
	t.exports = (e, t, r) => n(e, t, r) === 0;
})), Ri = /* @__PURE__ */ i(((e, t) => {
	var n = L();
	t.exports = (e, t, r) => n(e, t, r) !== 0;
})), zi = /* @__PURE__ */ i(((e, t) => {
	var n = L();
	t.exports = (e, t, r) => n(e, t, r) >= 0;
})), Bi = /* @__PURE__ */ i(((e, t) => {
	var n = L();
	t.exports = (e, t, r) => n(e, t, r) <= 0;
})), Vi = /* @__PURE__ */ i(((e, t) => {
	var n = Li(), r = Ri(), i = Fi(), a = zi(), o = Ii(), s = Bi();
	t.exports = (e, t, c, l) => {
		switch (t) {
			case "===": return typeof e == "object" && (e = e.version), typeof c == "object" && (c = c.version), e === c;
			case "!==": return typeof e == "object" && (e = e.version), typeof c == "object" && (c = c.version), e !== c;
			case "":
			case "=":
			case "==": return n(e, c, l);
			case "!=": return r(e, c, l);
			case ">": return i(e, c, l);
			case ">=": return a(e, c, l);
			case "<": return o(e, c, l);
			case "<=": return s(e, c, l);
			default: throw TypeError(`Invalid operator: ${t}`);
		}
	};
})), Hi = /* @__PURE__ */ i(((e, t) => {
	var n = I(), r = xi(), { safeRe: i, t: a } = vi();
	t.exports = (e, t) => {
		if (e instanceof n) return e;
		if (typeof e == "number" && (e = String(e)), typeof e != "string") return null;
		t ||= {};
		let o = null;
		if (!t.rtl) o = e.match(t.includePrerelease ? i[a.COERCEFULL] : i[a.COERCE]);
		else {
			let n = t.includePrerelease ? i[a.COERCERTLFULL] : i[a.COERCERTL], r;
			for (; (r = n.exec(e)) && (!o || o.index + o[0].length !== e.length);) (!o || r.index + r[0].length !== o.index + o[0].length) && (o = r), n.lastIndex = r.index + r[1].length + r[2].length;
			n.lastIndex = -1;
		}
		if (o === null) return null;
		let s = o[2];
		return r(`${s}.${o[3] || "0"}.${o[4] || "0"}${t.includePrerelease && o[5] ? `-${o[5]}` : ""}${t.includePrerelease && o[6] ? `+${o[6]}` : ""}`, t);
	};
})), Ui = /* @__PURE__ */ i(((e, t) => {
	var n = xi(), r = gi(), i = I(), a = (e, t, n) => {
		if (!r.RELEASE_TYPES.includes(t)) return null;
		let i = o(e, n);
		return i && s(i, t);
	}, o = (e, t) => n(e instanceof i ? e.version : e, t), s = (e, t) => {
		if (c(t)) return e.version;
		switch (e.prerelease = [], t) {
			case "major":
				e.minor = 0, e.patch = 0;
				break;
			case "minor":
				e.patch = 0;
				break;
		}
		return e.format();
	}, c = (e) => e.startsWith("pre");
	t.exports = a;
})), Wi = /* @__PURE__ */ i(((e, t) => {
	t.exports = class {
		constructor() {
			this.max = 1e3, this.map = /* @__PURE__ */ new Map();
		}
		get(e) {
			let t = this.map.get(e);
			if (t !== void 0) return this.map.delete(e), this.map.set(e, t), t;
		}
		delete(e) {
			return this.map.delete(e);
		}
		set(e, t) {
			if (!this.delete(e) && t !== void 0) {
				if (this.map.size >= this.max) {
					let e = this.map.keys().next().value;
					this.delete(e);
				}
				this.map.set(e, t);
			}
			return this;
		}
	};
})), R = /* @__PURE__ */ i(((e, t) => {
	var n = /\s+/g;
	t.exports = class e {
		constructor(t, r) {
			if (r = i(r), t instanceof e) return t.loose === !!r.loose && t.includePrerelease === !!r.includePrerelease ? t : new e(t.raw, r);
			if (t instanceof a) return this.raw = t.value, this.set = [[t]], this.formatted = void 0, this;
			if (this.options = r, this.loose = !!r.loose, this.includePrerelease = !!r.includePrerelease, this.raw = t.trim().replace(n, " "), this.set = this.raw.split("||").map((e) => this.parseRange(e.trim())).filter((e) => e.length), !this.set.length) throw TypeError(`Invalid SemVer Range: ${this.raw}`);
			if (this.set.length > 1) {
				let e = this.set[0];
				if (this.set = this.set.filter((e) => !_(e[0])), this.set.length === 0) this.set = [e];
				else if (this.set.length > 1) {
					for (let e of this.set) if (e.length === 1 && v(e[0])) {
						this.set = [e];
						break;
					}
				}
			}
			this.formatted = void 0;
		}
		get range() {
			if (this.formatted === void 0) {
				this.formatted = "";
				for (let e = 0; e < this.set.length; e++) {
					e > 0 && (this.formatted += "||");
					let t = this.set[e];
					for (let e = 0; e < t.length; e++) e > 0 && (this.formatted += " "), this.formatted += t[e].toString().trim();
				}
			}
			return this.formatted;
		}
		format() {
			return this.range;
		}
		toString() {
			return this.range;
		}
		parseRange(e) {
			e = e.replace(g, "");
			let t = ((this.options.includePrerelease && m) | (this.options.loose && h)) + ":" + e, n = r.get(t);
			if (n) return n;
			let i = this.options.loose, s = i ? c[u.HYPHENRANGELOOSE] : c[u.HYPHENRANGE];
			e = e.replace(s, D(this.options.includePrerelease)), o("hyphen replace", e), e = e.replace(c[u.COMPARATORTRIM], d), o("comparator trim", e), e = e.replace(c[u.TILDETRIM], f), o("tilde trim", e), e = e.replace(c[u.CARETTRIM], p), o("caret trim", e);
			let l = e.split(" ").map((e) => b(e, this.options)).join(" ").split(/\s+/).map((e) => E(e, this.options));
			i && (l = l.filter((e) => (o("loose invalid filter", e, this.options), !!e.match(c[u.COMPARATORLOOSE])))), o("range list", l);
			let v = /* @__PURE__ */ new Map(), y = l.map((e) => new a(e, this.options));
			for (let e of y) {
				if (_(e)) return [e];
				v.set(e.value, e);
			}
			v.size > 1 && v.has("") && v.delete("");
			let x = [...v.values()];
			return r.set(t, x), x;
		}
		intersects(t, n) {
			if (!(t instanceof e)) throw TypeError("a Range is required");
			return this.set.some((e) => y(e, n) && t.set.some((t) => y(t, n) && e.every((e) => t.every((t) => e.intersects(t, n)))));
		}
		test(e) {
			if (!e) return !1;
			if (typeof e == "string") try {
				e = new s(e, this.options);
			} catch {
				return !1;
			}
			for (let t = 0; t < this.set.length; t++) if (ie(this.set[t], e, this.options)) return !0;
			return !1;
		}
	};
	var r = new (Wi())(), i = yi(), a = Gi(), o = _i(), s = I(), { safeRe: c, src: l, t: u, comparatorTrimReplace: d, tildeTrimReplace: f, caretTrimReplace: p } = vi(), { FLAG_INCLUDE_PRERELEASE: m, FLAG_LOOSE: h } = gi(), g = new RegExp(l[u.BUILD], "g"), _ = (e) => e.value === "<0.0.0-0", v = (e) => e.value === "", y = (e, t) => {
		let n = !0, r = e.slice(), i = r.pop();
		for (; n && r.length;) n = r.every((e) => i.intersects(e, t)), i = r.pop();
		return n;
	}, b = (e, t) => (e = e.replace(c[u.BUILD], ""), o("comp", e, t), e = w(e, t), o("caret", e), e = C(e, t), o("tildes", e), e = ne(e, t), o("xrange", e), e = T(e, t), o("stars", e), e), x = (e) => !e || e.toLowerCase() === "x" || e === "*", S = (e, t, n) => x(e) && !x(t) || x(t) && n && !x(n), C = (e, t) => e.trim().split(/\s+/).map((e) => ee(e, t)).join(" "), ee = (e, t) => {
		let n = t.loose ? c[u.TILDELOOSE] : c[u.TILDE], r = t.includePrerelease ? "-0" : "";
		return e.replace(n, (t, n, i, a, s) => {
			o("tilde", e, t, n, i, a, s);
			let c;
			return x(n) ? c = "" : x(i) ? c = `>=${n}.0.0${r} <${+n + 1}.0.0-0` : x(a) ? c = `>=${n}.${i}.0${r} <${n}.${+i + 1}.0-0` : s ? (o("replaceTilde pr", s), c = `>=${n}.${i}.${a}-${s} <${n}.${+i + 1}.0-0`) : c = `>=${n}.${i}.${a} <${n}.${+i + 1}.0-0`, o("tilde return", c), c;
		});
	}, w = (e, t) => e.trim().split(/\s+/).map((e) => te(e, t)).join(" "), te = (e, t) => {
		o("caret", e, t);
		let n = t.loose ? c[u.CARETLOOSE] : c[u.CARET], r = t.includePrerelease ? "-0" : "";
		return e.replace(n, (t, n, i, a, s) => {
			o("caret", e, t, n, i, a, s);
			let c;
			return x(n) ? c = "" : x(i) ? c = `>=${n}.0.0${r} <${+n + 1}.0.0-0` : x(a) ? c = n === "0" ? `>=${n}.${i}.0${r} <${n}.${+i + 1}.0-0` : `>=${n}.${i}.0${r} <${+n + 1}.0.0-0` : s ? (o("replaceCaret pr", s), c = n === "0" ? i === "0" ? `>=${n}.${i}.${a}-${s} <${n}.${i}.${+a + 1}-0` : `>=${n}.${i}.${a}-${s} <${n}.${+i + 1}.0-0` : `>=${n}.${i}.${a}-${s} <${+n + 1}.0.0-0`) : (o("no pr"), c = n === "0" ? i === "0" ? `>=${n}.${i}.${a} <${n}.${i}.${+a + 1}-0` : `>=${n}.${i}.${a} <${n}.${+i + 1}.0-0` : `>=${n}.${i}.${a} <${+n + 1}.0.0-0`), o("caret return", c), c;
		});
	}, ne = (e, t) => (o("replaceXRanges", e, t), e.split(/\s+/).map((e) => re(e, t)).join(" ")), re = (e, t) => {
		e = e.trim();
		let n = t.loose ? c[u.XRANGELOOSE] : c[u.XRANGE];
		return e.replace(n, (n, r, i, a, s, c) => {
			if (o("xRange", e, n, r, i, a, s, c), S(i, a, s)) return e;
			let l = x(i), u = l || x(a), d = u || x(s), f = d;
			return r === "=" && f && (r = ""), c = t.includePrerelease ? "-0" : "", l ? n = r === ">" || r === "<" ? "<0.0.0-0" : "*" : r && f ? (u && (a = 0), s = 0, r === ">" ? (r = ">=", u ? (i = +i + 1, a = 0, s = 0) : (a = +a + 1, s = 0)) : r === "<=" && (r = "<", u ? i = +i + 1 : a = +a + 1), r === "<" && (c = "-0"), n = `${r + i}.${a}.${s}${c}`) : u ? n = `>=${i}.0.0${c} <${+i + 1}.0.0-0` : d && (n = `>=${i}.${a}.0${c} <${i}.${+a + 1}.0-0`), o("xRange return", n), n;
		});
	}, T = (e, t) => (o("replaceStars", e, t), e.trim().replace(c[u.STAR], "")), E = (e, t) => (o("replaceGTE0", e, t), e.trim().replace(c[t.includePrerelease ? u.GTE0PRE : u.GTE0], "")), D = (e) => (t, n, r, i, a, o, s, c, l, u, d, f) => (n = x(r) ? "" : x(i) ? `>=${r}.0.0${e ? "-0" : ""}` : x(a) ? `>=${r}.${i}.0${e ? "-0" : ""}` : o ? `>=${n}` : `>=${n}${e ? "-0" : ""}`, c = x(l) ? "" : x(u) ? `<${+l + 1}.0.0-0` : x(d) ? `<${l}.${+u + 1}.0-0` : f ? `<=${l}.${u}.${d}-${f}` : e ? `<${l}.${u}.${+d + 1}-0` : `<=${c}`, `${n} ${c}`.trim()), ie = (e, t, n) => {
		for (let n = 0; n < e.length; n++) if (!e[n].test(t)) return !1;
		if (t.prerelease.length && !n.includePrerelease) {
			for (let n = 0; n < e.length; n++) if (o(e[n].semver), e[n].semver !== a.ANY && e[n].semver.prerelease.length > 0) {
				let r = e[n].semver;
				if (r.major === t.major && r.minor === t.minor && r.patch === t.patch) return !0;
			}
			return !1;
		}
		return !0;
	};
})), Gi = /* @__PURE__ */ i(((e, t) => {
	var n = Symbol("SemVer ANY");
	t.exports = class e {
		static get ANY() {
			return n;
		}
		constructor(t, i) {
			if (i = r(i), t instanceof e) {
				if (t.loose === !!i.loose) return t;
				t = t.value;
			}
			t = t.trim().split(/\s+/).join(" "), s("comparator", t, i), this.options = i, this.loose = !!i.loose, this.parse(t), this.semver === n ? this.value = "" : this.value = this.operator + this.semver.version, s("comp", this);
		}
		parse(e) {
			let t = this.options.loose ? i[a.COMPARATORLOOSE] : i[a.COMPARATOR], r = e.match(t);
			if (!r) throw TypeError(`Invalid comparator: ${e}`);
			this.operator = r[1] === void 0 ? "" : r[1], this.operator === "=" && (this.operator = ""), r[2] ? this.semver = new c(r[2], this.options.loose) : this.semver = n;
		}
		toString() {
			return this.value;
		}
		test(e) {
			if (s("Comparator.test", e, this.options.loose), this.semver === n || e === n) return !0;
			if (typeof e == "string") try {
				e = new c(e, this.options);
			} catch {
				return !1;
			}
			return o(e, this.operator, this.semver, this.options);
		}
		intersects(t, n) {
			if (!(t instanceof e)) throw TypeError("a Comparator is required");
			return this.operator === "" ? this.value === "" ? !0 : new l(t.value, n).test(this.value) : t.operator === "" ? t.value === "" ? !0 : new l(this.value, n).test(t.semver) : (n = r(n), n.includePrerelease && (this.value === "<0.0.0-0" || t.value === "<0.0.0-0") || !n.includePrerelease && (this.value.startsWith("<0.0.0") || t.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && t.operator.startsWith(">") || this.operator.startsWith("<") && t.operator.startsWith("<") || this.semver.version === t.semver.version && this.operator.includes("=") && t.operator.includes("=") || o(this.semver, "<", t.semver, n) && this.operator.startsWith(">") && t.operator.startsWith("<") || o(this.semver, ">", t.semver, n) && this.operator.startsWith("<") && t.operator.startsWith(">")));
		}
	};
	var r = yi(), { safeRe: i, t: a } = vi(), o = Vi(), s = _i(), c = I(), l = R();
})), Ki = /* @__PURE__ */ i(((e, t) => {
	var n = R();
	t.exports = (e, t, r) => {
		try {
			t = new n(t, r);
		} catch {
			return !1;
		}
		return t.test(e);
	};
})), qi = /* @__PURE__ */ i(((e, t) => {
	var n = R();
	t.exports = (e, t) => new n(e, t).set.map((e) => e.map((e) => e.value).join(" ").trim().split(" "));
})), Ji = /* @__PURE__ */ i(((e, t) => {
	var n = I(), r = R();
	t.exports = (e, t, i) => {
		let a = null, o = null, s = null;
		try {
			s = new r(t, i);
		} catch {
			return null;
		}
		return e.forEach((e) => {
			s.test(e) && (!a || o.compare(e) === -1) && (a = e, o = new n(a, i));
		}), a;
	};
})), Yi = /* @__PURE__ */ i(((e, t) => {
	var n = I(), r = R();
	t.exports = (e, t, i) => {
		let a = null, o = null, s = null;
		try {
			s = new r(t, i);
		} catch {
			return null;
		}
		return e.forEach((e) => {
			s.test(e) && (!a || o.compare(e) === 1) && (a = e, o = new n(a, i));
		}), a;
	};
})), Xi = /* @__PURE__ */ i(((e, t) => {
	var n = I(), r = R(), i = Fi();
	t.exports = (e, t) => {
		e = new r(e, t);
		let a = new n("0.0.0");
		if (e.test(a) || (a = new n("0.0.0-0"), e.test(a))) return a;
		a = null;
		for (let t = 0; t < e.set.length; ++t) {
			let r = e.set[t], o = null;
			r.forEach((e) => {
				let t = new n(e.semver.version);
				switch (e.operator) {
					case ">": t.prerelease.length === 0 ? t.patch++ : t.prerelease.push(0), t.raw = t.format();
					case "":
					case ">=":
						(!o || i(t, o)) && (o = t);
						break;
					case "<":
					case "<=": break;
					/* istanbul ignore next */
					default: throw Error(`Unexpected operation: ${e.operator}`);
				}
			}), o && (!a || i(a, o)) && (a = o);
		}
		return a && e.test(a) ? a : null;
	};
})), Zi = /* @__PURE__ */ i(((e, t) => {
	var n = R();
	t.exports = (e, t) => {
		try {
			return new n(e, t).range || "*";
		} catch {
			return null;
		}
	};
})), Qi = /* @__PURE__ */ i(((e, t) => {
	var n = I(), r = Gi(), { ANY: i } = r, a = R(), o = Ki(), s = Fi(), c = Ii(), l = Bi(), u = zi();
	t.exports = (e, t, d, f) => {
		e = new n(e, f), t = new a(t, f);
		let p, m, h, g, _;
		switch (d) {
			case ">":
				p = s, m = l, h = c, g = ">", _ = ">=";
				break;
			case "<":
				p = c, m = u, h = s, g = "<", _ = "<=";
				break;
			default: throw TypeError("Must provide a hilo val of \"<\" or \">\"");
		}
		if (o(e, t, f)) return !1;
		for (let n = 0; n < t.set.length; ++n) {
			let a = t.set[n], o = null, s = null;
			if (a.forEach((e) => {
				e.semver === i && (e = new r(">=0.0.0")), o ||= e, s ||= e, p(e.semver, o.semver, f) ? o = e : h(e.semver, s.semver, f) && (s = e);
			}), o.operator === g || o.operator === _ || (!s.operator || s.operator === g) && m(e, s.semver) || s.operator === _ && h(e, s.semver)) return !1;
		}
		return !0;
	};
})), $i = /* @__PURE__ */ i(((e, t) => {
	var n = Qi();
	t.exports = (e, t, r) => n(e, t, ">", r);
})), ea = /* @__PURE__ */ i(((e, t) => {
	var n = Qi();
	t.exports = (e, t, r) => n(e, t, "<", r);
})), ta = /* @__PURE__ */ i(((e, t) => {
	var n = R();
	t.exports = (e, t, r) => (e = new n(e, r), t = new n(t, r), e.intersects(t, r));
})), na = /* @__PURE__ */ i(((e, t) => {
	var n = Ki(), r = L();
	t.exports = (e, t, i) => {
		let a = [], o = null, s = null, c = e.sort((e, t) => r(e, t, i));
		for (let e of c) n(e, t, i) ? (s = e, o ||= e) : (s && a.push([o, s]), s = null, o = null);
		o && a.push([o, null]);
		let l = [];
		for (let [e, t] of a) e === t ? l.push(e) : !t && e === c[0] ? l.push("*") : t ? e === c[0] ? l.push(`<=${t}`) : l.push(`${e} - ${t}`) : l.push(`>=${e}`);
		let u = l.join(" || "), d = typeof t.raw == "string" ? t.raw : String(t);
		return u.length < d.length ? u : t;
	};
})), ra = /* @__PURE__ */ i(((e, t) => {
	var n = R(), r = Gi(), { ANY: i } = r, a = Ki(), o = L(), s = (e, t, r = {}) => {
		if (e === t) return !0;
		e = new n(e, r), t = new n(t, r);
		let i = !1;
		OUTER: for (let n of e.set) {
			for (let e of t.set) {
				let t = u(n, e, r);
				if (i ||= t !== null, t) continue OUTER;
			}
			if (i) return !1;
		}
		return !0;
	}, c = [new r(">=0.0.0-0")], l = [new r(">=0.0.0")], u = (e, t, n) => {
		if (e === t) return !0;
		if (e.length === 1 && e[0].semver === i) {
			if (t.length === 1 && t[0].semver === i) return !0;
			e = n.includePrerelease ? c : l;
		}
		if (t.length === 1 && t[0].semver === i) {
			if (n.includePrerelease) return !0;
			t = l;
		}
		let r = /* @__PURE__ */ new Set(), s, u;
		for (let t of e) t.operator === ">" || t.operator === ">=" ? s = d(s, t, n) : t.operator === "<" || t.operator === "<=" ? u = f(u, t, n) : r.add(t.semver);
		if (r.size > 1) return null;
		let p;
		if (s && u && (p = o(s.semver, u.semver, n), p > 0 || p === 0 && (s.operator !== ">=" || u.operator !== "<="))) return null;
		for (let e of r) {
			if (s && !a(e, String(s), n) || u && !a(e, String(u), n)) return null;
			for (let r of t) if (!a(e, String(r), n)) return !1;
			return !0;
		}
		let m, h, g, _, v = u && !n.includePrerelease && u.semver.prerelease.length ? u.semver : !1, y = s && !n.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
		v && v.prerelease.length === 1 && u.operator === "<" && v.prerelease[0] === 0 && (v = !1);
		for (let e of t) {
			if (_ = _ || e.operator === ">" || e.operator === ">=", g = g || e.operator === "<" || e.operator === "<=", s) {
				if (y && e.semver.prerelease && e.semver.prerelease.length && e.semver.major === y.major && e.semver.minor === y.minor && e.semver.patch === y.patch && (y = !1), e.operator === ">" || e.operator === ">=") {
					if (m = d(s, e, n), m === e && m !== s) return !1;
				} else if (s.operator === ">=" && !e.test(s.semver)) return !1;
			}
			if (u) {
				if (v && e.semver.prerelease && e.semver.prerelease.length && e.semver.major === v.major && e.semver.minor === v.minor && e.semver.patch === v.patch && (v = !1), e.operator === "<" || e.operator === "<=") {
					if (h = f(u, e, n), h === e && h !== u) return !1;
				} else if (u.operator === "<=" && !e.test(u.semver)) return !1;
			}
			if (!e.operator && (u || s) && p !== 0) return !1;
		}
		return !(s && g && !u && p !== 0 || u && _ && !s && p !== 0 || y || v);
	}, d = (e, t, n) => {
		if (!e) return t;
		let r = o(e.semver, t.semver, n);
		return r > 0 ? e : r < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
	}, f = (e, t, n) => {
		if (!e) return t;
		let r = o(e.semver, t.semver, n);
		return r < 0 ? e : r > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
	};
	t.exports = s;
}));
(/* @__PURE__ */ i(((e, t) => {
	var n = vi(), r = gi(), i = I(), a = bi();
	t.exports = {
		parse: xi(),
		valid: Si(),
		clean: Ci(),
		inc: wi(),
		diff: Ti(),
		major: Ei(),
		minor: Di(),
		patch: Oi(),
		prerelease: ki(),
		compare: L(),
		rcompare: Ai(),
		compareLoose: ji(),
		compareBuild: Mi(),
		sort: Ni(),
		rsort: Pi(),
		gt: Fi(),
		lt: Ii(),
		eq: Li(),
		neq: Ri(),
		gte: zi(),
		lte: Bi(),
		cmp: Vi(),
		coerce: Hi(),
		truncate: Ui(),
		Comparator: Gi(),
		Range: R(),
		satisfies: Ki(),
		toComparators: qi(),
		maxSatisfying: Ji(),
		minSatisfying: Yi(),
		minVersion: Xi(),
		validRange: Zi(),
		outside: Qi(),
		gtr: $i(),
		ltr: ea(),
		intersects: ta(),
		simplifyRange: na(),
		subset: ra(),
		SemVer: i,
		re: n.re,
		src: n.src,
		tokens: n.t,
		SEMVER_SPEC_VERSION: r.SEMVER_SPEC_VERSION,
		RELEASE_TYPES: r.RELEASE_TYPES,
		compareIdentifiers: a.compareIdentifiers,
		rcompareIdentifiers: a.rcompareIdentifiers
	};
})))();
var ia, aa, oa, sa, ca = !0;
typeof process < "u" && ({FORCE_COLOR: ia, NODE_DISABLE_COLORS: aa, NO_COLOR: oa, TERM: sa} = process.env || {}, ca = process.stdout && process.stdout.isTTY);
var z = {
	enabled: !aa && oa == null && sa !== "dumb" && (ia != null && ia !== "0" || ca),
	reset: B(0, 0),
	bold: B(1, 22),
	dim: B(2, 22),
	italic: B(3, 23),
	underline: B(4, 24),
	inverse: B(7, 27),
	hidden: B(8, 28),
	strikethrough: B(9, 29),
	black: B(30, 39),
	red: B(31, 39),
	green: B(32, 39),
	yellow: B(33, 39),
	blue: B(34, 39),
	magenta: B(35, 39),
	cyan: B(36, 39),
	white: B(37, 39),
	gray: B(90, 39),
	grey: B(90, 39),
	bgBlack: B(40, 49),
	bgRed: B(41, 49),
	bgGreen: B(42, 49),
	bgYellow: B(43, 49),
	bgBlue: B(44, 49),
	bgMagenta: B(45, 49),
	bgCyan: B(46, 49),
	bgWhite: B(47, 49)
};
function la(e, t) {
	let n = 0, r, i = "", a = "";
	for (; n < e.length; n++) r = e[n], i += r.open, a += r.close, ~t.indexOf(r.close) && (t = t.replace(r.rgx, r.close + r.open));
	return i + t + a;
}
function ua(e, t) {
	let n = {
		has: e,
		keys: t
	};
	return n.reset = z.reset.bind(n), n.bold = z.bold.bind(n), n.dim = z.dim.bind(n), n.italic = z.italic.bind(n), n.underline = z.underline.bind(n), n.inverse = z.inverse.bind(n), n.hidden = z.hidden.bind(n), n.strikethrough = z.strikethrough.bind(n), n.black = z.black.bind(n), n.red = z.red.bind(n), n.green = z.green.bind(n), n.yellow = z.yellow.bind(n), n.blue = z.blue.bind(n), n.magenta = z.magenta.bind(n), n.cyan = z.cyan.bind(n), n.white = z.white.bind(n), n.gray = z.gray.bind(n), n.grey = z.grey.bind(n), n.bgBlack = z.bgBlack.bind(n), n.bgRed = z.bgRed.bind(n), n.bgGreen = z.bgGreen.bind(n), n.bgYellow = z.bgYellow.bind(n), n.bgBlue = z.bgBlue.bind(n), n.bgMagenta = z.bgMagenta.bind(n), n.bgCyan = z.bgCyan.bind(n), n.bgWhite = z.bgWhite.bind(n), n;
}
function B(e, t) {
	let n = {
		open: `\x1b[${e}m`,
		close: `\x1b[${t}m`,
		rgx: RegExp(`\\x1b\\[${t}m`, "g")
	};
	return function(t) {
		return this !== void 0 && this.has !== void 0 ? (~this.has.indexOf(e) || (this.has.push(e), this.keys.push(n)), t === void 0 ? this : z.enabled ? la(this.keys, t + "") : t + "") : t === void 0 ? ua([e], [n]) : z.enabled ? la([n], t + "") : t + "";
	};
}
//#endregion
//#region node_modules/html-validate/dist/esm/core.js
var da = {
	$schema: "http://json-schema.org/draft-06/schema#",
	$id: "http://json-schema.org/draft-06/schema#",
	title: "Core schema meta-schema",
	definitions: {
		schemaArray: {
			type: "array",
			minItems: 1,
			items: { $ref: "#" }
		},
		nonNegativeInteger: {
			type: "integer",
			minimum: 0
		},
		nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] },
		simpleTypes: { enum: [
			"array",
			"boolean",
			"integer",
			"null",
			"number",
			"object",
			"string"
		] },
		stringArray: {
			type: "array",
			items: { type: "string" },
			uniqueItems: !0,
			default: []
		}
	},
	type: ["object", "boolean"],
	properties: {
		$id: {
			type: "string",
			format: "uri-reference"
		},
		$schema: {
			type: "string",
			format: "uri"
		},
		$ref: {
			type: "string",
			format: "uri-reference"
		},
		title: { type: "string" },
		description: { type: "string" },
		default: {},
		examples: {
			type: "array",
			items: {}
		},
		multipleOf: {
			type: "number",
			exclusiveMinimum: 0
		},
		maximum: { type: "number" },
		exclusiveMaximum: { type: "number" },
		minimum: { type: "number" },
		exclusiveMinimum: { type: "number" },
		maxLength: { $ref: "#/definitions/nonNegativeInteger" },
		minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
		pattern: {
			type: "string",
			format: "regex"
		},
		additionalItems: { $ref: "#" },
		items: {
			anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
			default: {}
		},
		maxItems: { $ref: "#/definitions/nonNegativeInteger" },
		minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
		uniqueItems: {
			type: "boolean",
			default: !1
		},
		contains: { $ref: "#" },
		maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
		minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
		required: { $ref: "#/definitions/stringArray" },
		additionalProperties: { $ref: "#" },
		definitions: {
			type: "object",
			additionalProperties: { $ref: "#" },
			default: {}
		},
		properties: {
			type: "object",
			additionalProperties: { $ref: "#" },
			default: {}
		},
		patternProperties: {
			type: "object",
			additionalProperties: { $ref: "#" },
			default: {}
		},
		dependencies: {
			type: "object",
			additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] }
		},
		propertyNames: { $ref: "#" },
		const: {},
		enum: {
			type: "array",
			minItems: 1,
			uniqueItems: !0
		},
		type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, {
			type: "array",
			items: { $ref: "#/definitions/simpleTypes" },
			minItems: 1,
			uniqueItems: !0
		}] },
		format: { type: "string" },
		allOf: { $ref: "#/definitions/schemaArray" },
		anyOf: { $ref: "#/definitions/schemaArray" },
		oneOf: { $ref: "#/definitions/schemaArray" },
		not: { $ref: "#" }
	},
	default: {}
};
function fa(e) {
	return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var pa, ma;
function ha() {
	if (ma) return pa;
	ma = 1;
	var e = function(e) {
		return t(e) && !n(e);
	};
	function t(e) {
		return !!e && typeof e == "object";
	}
	function n(e) {
		var t = Object.prototype.toString.call(e);
		return t === "[object RegExp]" || t === "[object Date]" || i(e);
	}
	var r = typeof Symbol == "function" && Symbol.for ? Symbol.for("react.element") : 60103;
	function i(e) {
		return e.$$typeof === r;
	}
	function a(e) {
		return Array.isArray(e) ? [] : {};
	}
	function o(e, t) {
		return t.clone !== !1 && t.isMergeableObject(e) ? m(a(e), e, t) : e;
	}
	function s(e, t, n) {
		return e.concat(t).map(function(e) {
			return o(e, n);
		});
	}
	function c(e, t) {
		if (!t.customMerge) return m;
		var n = t.customMerge(e);
		return typeof n == "function" ? n : m;
	}
	function l(e) {
		return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
			return Object.propertyIsEnumerable.call(e, t);
		}) : [];
	}
	function u(e) {
		return Object.keys(e).concat(l(e));
	}
	function d(e, t) {
		try {
			return t in e;
		} catch {
			return !1;
		}
	}
	function f(e, t) {
		return d(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t));
	}
	function p(e, t, n) {
		var r = {};
		return n.isMergeableObject(e) && u(e).forEach(function(t) {
			r[t] = o(e[t], n);
		}), u(t).forEach(function(i) {
			f(e, i) || (d(e, i) && n.isMergeableObject(t[i]) ? r[i] = c(i, n)(e[i], t[i], n) : r[i] = o(t[i], n));
		}), r;
	}
	function m(t, n, r) {
		r ||= {}, r.arrayMerge = r.arrayMerge || s, r.isMergeableObject = r.isMergeableObject || e, r.cloneUnlessOtherwiseSpecified = o;
		var i = Array.isArray(n);
		return i === Array.isArray(t) ? i ? r.arrayMerge(t, n, r) : p(t, n, r) : o(n, r);
	}
	return m.all = function(e, t) {
		if (!Array.isArray(e)) throw Error("first argument should be an array");
		return e.reduce(function(e, n) {
			return m(e, n, t);
		}, {});
	}, pa = m, pa;
}
var ga = /*@__PURE__*/ fa(/* @__PURE__ */ ha());
function _a(e) {
	return typeof e == "string" ? e : JSON.stringify(e);
}
var va = class extends Error {
	constructor(e) {
		super(_a(e)), this.name = "WrappedError";
	}
};
function ya(e) {
	return e instanceof Error ? e : new va(e);
}
var ba = class extends Error {
	constructor(e, t) {
		super(e), this.name = "NestedError", t?.stack && (this.stack ??= "", this.stack += `
Caused by: ${t.stack}`);
	}
}, V = class extends ba {
	constructor(e, t) {
		super(e, t), this.name = "UserError", Object.defineProperty(this, "isUserError", {
			value: !0,
			enumerable: !1,
			writable: !1
		});
	}
	/* istanbul ignore next: default implementation */
	prettyFormat() {}
}, xa = class extends V {
	tagName;
	inherit;
	filename;
	constructor({ tagName: e, inherit: t }) {
		let n = `Element <${e}> cannot inherit from <${t}>: no such element`;
		super(n), this.name = "InheritError", this.tagName = e, this.inherit = t, this.filename = null;
	}
	prettyFormat() {
		let { message: e, tagName: t, inherit: n } = this;
		return [
			e,
			...this.filename ? [
				"",
				"This error occurred when loading element metadata from:",
				`"${this.filename}"`,
				""
			] : [""],
			"This usually occurs when the elements are defined in the wrong order, try one of the following:",
			"",
			`  - Ensure the spelling of "${n}" is correct.`,
			`  - Ensure the file containing "${n}" is loaded before the file containing "${t}".`,
			`  - Move the definition of "${n}" above the definition for "${t}".`
		].join("\n");
	}
};
function Sa(e, t, n) {
	let r = hi(e, t, n, { format: "js" });
	return r.length > 0 ? r[0].error : "unknown validation error";
}
var Ca = class extends V {
	filename;
	obj;
	schema;
	errors;
	constructor(e, t, n, r, i) {
		let a = Sa(r, n, i);
		super(`${t}: ${a}`), this.name = "SchemaValidationError", this.filename = e, this.obj = n, this.schema = r, this.errors = i;
	}
}, wa = {
	$schema: "http://json-schema.org/draft-06/schema#",
	$id: "https://html-validate.org/schemas/elements.json",
	type: "object",
	properties: { $schema: { type: "string" } },
	patternProperties: { "^[^$].*$": {
		type: "object",
		properties: {
			inherit: {
				title: "Inherit from another element",
				description: "Most properties from the parent element will be copied onto this one",
				type: "string"
			},
			embedded: {
				title: "Mark this element as belonging in the embedded content category",
				$ref: "#/definitions/contentCategory"
			},
			flow: {
				title: "Mark this element as belonging in the flow content category",
				$ref: "#/definitions/contentCategory"
			},
			heading: {
				title: "Mark this element as belonging in the heading content category",
				$ref: "#/definitions/contentCategory"
			},
			interactive: {
				title: "Mark this element as belonging in the interactive content category",
				$ref: "#/definitions/contentCategory"
			},
			metadata: {
				title: "Mark this element as belonging in the metadata content category",
				$ref: "#/definitions/contentCategory"
			},
			phrasing: {
				title: "Mark this element as belonging in the phrasing content category",
				$ref: "#/definitions/contentCategory"
			},
			sectioning: {
				title: "Mark this element as belonging in the sectioning content category",
				$ref: "#/definitions/contentCategory"
			},
			deprecated: {
				title: "Mark element as deprecated",
				description: "Deprecated elements should not be used. If a message is provided it will be included in the error",
				anyOf: [
					{ type: "boolean" },
					{ type: "string" },
					{ $ref: "#/definitions/deprecatedElement" }
				]
			},
			foreign: {
				title: "Mark element as foreign",
				description: "Foreign elements are elements which have a start and end tag but is otherwize not parsed",
				type: "boolean"
			},
			void: {
				title: "Mark element as void",
				description: "Void elements are elements which cannot have content and thus must not use an end tag",
				type: "boolean"
			},
			transparent: {
				title: "Mark element as transparent",
				description: "Transparent elements follows the same content model as its parent, i.e. the content must be allowed in the parent.",
				anyOf: [{ type: "boolean" }, {
					type: "array",
					items: { type: "string" }
				}]
			},
			implicitClosed: {
				title: "List of elements which implicitly closes this element",
				description: "Some elements are automatically closed when another start tag occurs. Entries may be explicit tag names or @category strings (e.g. \"@flow\").",
				type: "array",
				items: { type: "string" }
			},
			implicitOpen: {
				title: "Implicit-open rules for child elements",
				description: "Describes intermediary elements (e.g. <head> or <body>) that should be implicitly opened when a child of a given category or tag is inserted directly under this element without a matching container being present.",
				type: "array",
				items: {
					type: "object",
					required: ["for", "open"],
					additionalProperties: !1,
					properties: {
						for: {
							title: "Selector list",
							description: "Tag names or @category strings (e.g. \"@flow\") that trigger the implicit open.",
							type: "array",
							items: { type: "string" }
						},
						open: {
							title: "Element to open",
							description: "Tag name of the element to implicitly open.",
							type: "string"
						}
					}
				}
			},
			optionalEnd: {
				title: "Mark element as having an optional end tag",
				description: "Elements whose end tag may be omitted per the HTML spec. Such an element is treated as implicitly closed at end-of-document and when a parent’s explicit end tag is encountered while it is still open.",
				type: "boolean"
			},
			implicitRole: {
				title: "Implicit ARIA role for this element",
				description: "Some elements have implicit ARIA roles.",
				deprecated: !0,
				function: !0
			},
			aria: {
				title: "WAI-ARIA properties for this element",
				$ref: "#/definitions/Aria"
			},
			scriptSupporting: {
				title: "Mark element as script-supporting",
				description: "Script-supporting elements are elements which can be inserted where othersise not permitted to assist in templating",
				type: "boolean"
			},
			focusable: {
				title: "Mark this element as focusable",
				description: "This element may contain an associated label element.",
				anyOf: [{ type: "boolean" }, { function: !0 }]
			},
			form: {
				title: "Mark element as a submittable form element",
				type: "boolean"
			},
			formAssociated: {
				title: "Mark element as a form-associated element",
				$ref: "#/definitions/FormAssociated"
			},
			labelable: {
				title: "Mark this element as labelable",
				description: "This element may contain an associated label element.",
				anyOf: [{ type: "boolean" }, { function: !0 }]
			},
			submitButton: {
				title: "Mark this element as a submit button",
				description: "This element can be used to submit forms.",
				anyOf: [{ type: "boolean" }, { function: !0 }]
			},
			templateRoot: {
				title: "Mark element as an element ignoring DOM ancestry, i.e. <template>.",
				description: "The <template> element can contain any elements.",
				type: "boolean"
			},
			deprecatedAttributes: {
				title: "List of deprecated attributes",
				type: "array",
				items: { type: "string" }
			},
			requiredAttributes: {
				title: "List of required attributes",
				type: "array",
				items: { type: "string" }
			},
			attributes: {
				title: "List of known attributes and allowed values",
				$ref: "#/definitions/PermittedAttribute"
			},
			permittedContent: {
				title: "List of elements or categories allowed as content in this element",
				$ref: "#/definitions/Permitted"
			},
			permittedDescendants: {
				title: "List of elements or categories allowed as descendants in this element",
				$ref: "#/definitions/Permitted"
			},
			permittedOrder: {
				title: "Required order of child elements",
				$ref: "#/definitions/PermittedOrder"
			},
			permittedParent: {
				title: "List of elements or categories allowed as parent to this element",
				$ref: "#/definitions/Permitted"
			},
			requiredAncestors: {
				title: "List of required ancestor elements",
				$ref: "#/definitions/RequiredAncestors"
			},
			requiredContent: {
				title: "List of required content elements",
				$ref: "#/definitions/RequiredContent"
			},
			textContent: {
				title: "Allow, disallow or require textual content",
				description: "This property controls whenever an element allows, disallows or requires text. Text from any descendant counts, not only direct children",
				default: "default",
				type: "string",
				enum: [
					"none",
					"default",
					"required",
					"accessible"
				]
			}
		},
		additionalProperties: !1
	} },
	definitions: {
		Aria: {
			type: "object",
			additionalProperties: !1,
			properties: {
				implicitRole: {
					title: "Implicit ARIA role for this element",
					description: "Some elements have implicit ARIA roles.",
					anyOf: [{ type: "string" }, { function: !0 }]
				},
				naming: {
					title: "Prohibit or allow this element to be named by aria-label or aria-labelledby",
					anyOf: [{
						type: "string",
						enum: ["prohibited", "allowed"]
					}, { function: !0 }]
				}
			}
		},
		contentCategory: { anyOf: [{ type: "boolean" }, { function: !0 }] },
		deprecatedElement: {
			type: "object",
			additionalProperties: !1,
			properties: {
				message: {
					type: "string",
					title: "A short text message shown next to the regular error message."
				},
				documentation: {
					type: "string",
					title: "An extended markdown formatted message shown with the contextual rule documentation."
				},
				source: {
					type: "string",
					title: "Element source, e.g. what standard or library deprecated this element.",
					default: "html5"
				}
			}
		},
		FormAssociated: {
			type: "object",
			additionalProperties: !1,
			properties: {
				disablable: {
					type: "boolean",
					title: "Disablable elements can be disabled using the disabled attribute."
				},
				listed: {
					type: "boolean",
					title: "Listed elements have a name attribute and is listed in the form and fieldset elements property."
				}
			}
		},
		Permitted: {
			type: "array",
			items: { anyOf: [
				{ type: "string" },
				{
					type: "array",
					items: { anyOf: [{ type: "string" }, { $ref: "#/definitions/PermittedGroup" }] }
				},
				{ $ref: "#/definitions/PermittedGroup" }
			] }
		},
		PermittedAttribute: {
			type: "object",
			patternProperties: { "^.*$": { anyOf: [
				{
					type: "object",
					additionalProperties: !1,
					properties: {
						allowed: {
							function: !0,
							title: "Set to a function to evaluate if this attribute is allowed in this context"
						},
						boolean: {
							type: "boolean",
							title: "Set to true if this is a boolean attribute"
						},
						deprecated: {
							title: "Set to true or string if this attribute is deprecated",
							oneOf: [{ type: "boolean" }, { type: "string" }]
						},
						list: {
							type: "boolean",
							title: "Set to true if this attribute is a list of space-separated tokens, each which must be valid by itself"
						},
						enum: {
							type: "array",
							title: "Exhaustive list of values (string or regex) this attribute accepts",
							uniqueItems: !0,
							items: { anyOf: [
								{ type: "string" },
								{ regexp: !0 },
								{
									type: "object",
									title: "Named regular expression",
									required: ["name", "pattern"],
									additionalProperties: !1,
									properties: {
										name: {
											type: "string",
											minLength: 1
										},
										pattern: { anyOf: [{ type: "string" }, { regexp: !0 }] }
									}
								}
							] }
						},
						omit: {
							type: "boolean",
							title: "Set to true if this attribute can optionally omit its value"
						},
						reference: {
							type: "string",
							enum: ["id"],
							title: "Set when the attribute references another element."
						},
						required: {
							title: "Set to true or a function to evaluate if this attribute is required",
							oneOf: [{ type: "boolean" }, { function: !0 }]
						}
					}
				},
				{
					type: "array",
					uniqueItems: !0,
					items: { type: "string" }
				},
				{ type: "null" }
			] } }
		},
		PermittedGroup: {
			type: "object",
			additionalProperties: !1,
			properties: { exclude: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "string" }] } }
		},
		PermittedOrder: {
			type: "array",
			items: { type: "string" }
		},
		RequiredAncestors: {
			type: "array",
			items: { type: "string" }
		},
		RequiredContent: {
			type: "array",
			items: { type: "string" }
		}
	}
}, Ta = function(e, t) {
	let n = e instanceof RegExp;
	return n || (Ta.errors = [{
		instancePath: t?.instancePath,
		schemaPath: void 0,
		keyword: "type",
		message: "should be a regular expression",
		params: { keyword: "type" }
	}]), n;
}, Ea = {
	keyword: "regexp",
	schema: !1,
	errors: !0,
	validate: Ta
}, Da = function(e, t) {
	let n = typeof e == "function";
	return n || (Da.errors = [{
		instancePath: t?.instancePath,
		schemaPath: void 0,
		keyword: "type",
		message: "should be a function",
		params: { keyword: "type" }
	}]), n;
}, Oa = {
	keyword: "function",
	schema: !1,
	errors: !0,
	validate: Da
};
function ka(e) {
	let t = 2246822507, n = 3266489909, r = -559038737, i = 1103547991;
	for (let t = 0, n; t < e.length;) n = e.codePointAt(t), r = Math.imul(r ^ n, 2654435761), i = Math.imul(i ^ n, 1597334677), t += n > 65535 ? 2 : 1;
	return r = Math.imul(r ^ r >>> 16, t) ^ Math.imul(i ^ i >>> 13, n), i = Math.imul(i ^ i >>> 16, t) ^ Math.imul(r ^ r >>> 13, n), 4294967296 * (2097151 & i) + (r >>> 0);
}
var Aa = ka, ja = /* @__PURE__ */ ((e) => (e.NONE = "none", e.DEFAULT = "default", e.REQUIRED = "required", e.ACCESSIBLE = "accessible", e))(ja || {}), Ma = [
	"metadata",
	"flow",
	"sectioning",
	"heading",
	"phrasing",
	"embedded",
	"interactive",
	"transparent",
	"focusable",
	"form",
	"formAssociated",
	"labelable",
	"submitButton",
	"attributes",
	"patternAttributes",
	"aria",
	"permittedContent",
	"permittedDescendants",
	"permittedOrder",
	"permittedParent",
	"requiredAncestors",
	"requiredContent"
];
function Na(e, t, n) {
	e[t] = n;
}
var Pa = /[$()*+.?[\\\]^{|}]/, Fa = /* @__PURE__ */ new Map([
	["	", "t"],
	["\n", "n"],
	["\v", "v"],
	["\f", "f"],
	["\r", "r"]
]), Ia = /^[!"#%&',:;<=>@`~-]$/, La = /^[\t\v\f\u{FEFF}\p{Zs}]$/u, Ra = /^[\n\r\u2028\u2029]$/, za = /^[\uD800-\uDFFF]$/;
function Ba(e) {
	return /^[\dA-Z]$/i.test(e);
}
function Va(e) {
	return Ia.test(e) || La.test(e) || Ra.test(e) || za.test(e);
}
function Ha(e) {
	return `\\u${e.codePointAt(0).toString(16).padStart(4, "0")}`;
}
function Ua(e) {
	return Pa.test(e) || e === "/" ? `\\${e}` : Fa.has(e) ? `\\${Fa.get(e)}` : Va(e) ? /[\u0000-\u00FF]/.test(e) ? `\\x${e.codePointAt(0).toString(16).padStart(2, "0")}` : e.split("").map((e) => Ha(e)).join("") : e;
}
function Wa(e) {
	let t = "";
	for (let n of e) t === "" && Ba(n) ? t += `\\x${n.codePointAt(0).toString(16).padStart(2, "0")}` : t += Ua(n);
	return t;
}
function Ga(e) {
	return e !== void 0;
}
function Ka(e) {
	return e ? !0 : void 0;
}
function qa(e) {
	let t = Object.entries(e).filter(([, e]) => Ga(e));
	return Object.fromEntries(t);
}
function Ja(e, t) {
	let n = {};
	n.deprecated = Ka(e.deprecatedAttributes?.includes(t)), n.required = Ka(e.requiredAttributes?.includes(t)), n.omit = void 0;
	let r = e.attributes ? e.attributes[t] : void 0;
	return r === void 0 ? qa(n) : r === null ? (n.delete = !0, qa(n)) : Array.isArray(r) ? (r.length === 0 ? n.boolean = !0 : (n.enum = r.filter((e) => e !== ""), r.includes("") && (n.omit = !0)), qa(n)) : qa({
		...n,
		...r
	});
}
function Ya(e) {
	return e.includes("*");
}
function Xa(e) {
	let t = e.split("*").map(Wa).join(".+");
	return RegExp(`^${t}$`, "i");
}
function Za(e) {
	let t = [
		...Object.keys(e.attributes ?? {}),
		...e.requiredAttributes ?? [],
		...e.deprecatedAttributes ?? []
	].filter((e) => !Ya(e)).toSorted((e, t) => e.localeCompare(t)).map((t) => [t, Ja(e, t)]);
	return Object.fromEntries(t);
}
function Qa(e) {
	let t = e.attributes ?? {};
	return Object.entries(t).filter(([e]) => Ya(e)).map(([t]) => {
		let { delete: n, ...r } = Ja(e, t), i = Xa(t);
		return n ? {
			pattern: t,
			regexp: i,
			delete: !0
		} : {
			...r,
			pattern: t,
			regexp: i
		};
	});
}
function $a(e) {
	return e ? typeof e == "string" ? () => e : e : () => null;
}
function eo(e) {
	return e ? typeof e == "string" ? () => e : e : () => "allowed";
}
function to(e) {
	let t = $a(e.aria?.implicitRole), n = {
		...e,
		formAssociated: void 0,
		attributes: Za(e),
		patternAttributes: Qa(e),
		textContent: e.textContent,
		focusable: e.focusable ?? !1,
		implicitRole: t,
		templateRoot: e.templateRoot === !0,
		aria: {
			implicitRole: t,
			naming: eo(e.aria?.naming)
		}
	};
	return delete n.deprecatedAttributes, delete n.requiredAttributes, n.textContent || delete n.textContent, e.formAssociated ? n.formAssociated = {
		disablable: !!e.formAssociated.disablable,
		listed: !!e.formAssociated.listed
	} : delete n.formAssociated, n;
}
var no = [
	"metadata",
	"flow",
	"sectioning",
	"heading",
	"phrasing",
	"embedded",
	"interactive",
	"labelable",
	"submitButton"
], ro = /* @__PURE__ */ new Map();
function io(e) {
	return Object.hasOwn(globalThis, "structuredClone") ? structuredClone(e) : JSON.parse(JSON.stringify(e));
}
var ao = class {
	elements;
	schema;
	constructor() {
		this.elements = {}, this.schema = io(wa);
	}
	init() {
		this.resolveGlobal();
	}
	extendValidationSchema(e) {
		e.properties && (this.schema = ga(this.schema, { patternProperties: { "^[^$].*$": { properties: e.properties } } })), e.definitions && (this.schema = ga(this.schema, { definitions: e.definitions }));
	}
	loadFromObject(e, t = null) {
		try {
			let n = this.getSchemaValidator();
			if (!n(e)) throw new Ca(
				t,
				"Element metadata is not valid",
				e,
				this.schema,
				/* istanbul ignore next: AJV sets .errors when validate returns false */
				n.errors ?? []
			);
			for (let [t, n] of Object.entries(e)) t !== "$schema" && this.addEntry(t, to(n));
		} catch (e) {
			throw e instanceof xa ? (e.filename = t, e) : e instanceof Ca || !t ? e : new V(`Failed to load element metadata from "${t}"`, ya(e));
		}
	}
	getMetaFor(e) {
		let t = this.elements[e.toLowerCase()] ?? this.elements["*"];
		return t ? { ...t } : null;
	}
	getTagsWithProperty(e) {
		return this.entries.filter(([, t]) => t[e]).map(([e]) => e);
	}
	getTagsDerivedFrom(e) {
		return this.entries.filter(([t, n]) => t === e || n.inherit === e).map(([e]) => e);
	}
	addEntry(e, t) {
		let n = this.elements[e];
		if (t.inherit) {
			let r = t.inherit;
			if (n = this.elements[r], !n) throw new xa({
				tagName: e,
				inherit: r
			});
		}
		let r = this.mergeElement(n ?? {}, {
			...t,
			tagName: e
		});
		lo(r), this.elements[e] = r;
	}
	getSchemaValidator() {
		let e = Aa(JSON.stringify(this.schema)), t = ro.get(e);
		if (t) return t;
		let n = new at.default({
			strict: !0,
			strictTuples: !0,
			strictTypes: !0
		});
		n.addMetaSchema(da), n.addKeyword(Oa), n.addKeyword(Ea), n.addKeyword({ keyword: "copyable" });
		let r = n.compile(this.schema);
		return ro.set(e, r), r;
	}
	getJSONSchema() {
		return this.schema;
	}
	get entries() {
		return Object.entries(this.elements);
	}
	resolveGlobal() {
		if (!this.elements["*"]) return;
		let e = this.elements["*"];
		delete this.elements["*"], delete e.tagName, delete e.void;
		for (let [t, n] of this.entries) this.elements[t] = this.mergeElement(e, n);
	}
	mergeElement(e, t) {
		let n = {
			...e,
			...t
		}, r = {
			...e.attributes,
			...t.attributes
		};
		for (let [e, t] of Object.entries(r)) t.delete ? delete r[e] : delete t.delete;
		n.attributes = r;
		let i = [...t.patternAttributes, ...e.patternAttributes ?? []], a = /* @__PURE__ */ new Set();
		return n.patternAttributes = i.filter((e) => a.has(e.pattern) ? !1 : (a.add(e.pattern), !e.delete)), e.aria && (n.aria = {
			...e.aria,
			...t.aria
		}), n;
	}
	resolve(e) {
		e.meta && oo(e, e.meta);
	}
};
function oo(e, t) {
	for (let n of no) {
		let r = t[n];
		typeof r == "function" && Na(t, n, r(e._adapter));
	}
	typeof t.focusable == "function" && Na(t, "focusable", t.focusable(e._adapter));
}
function so(e) {
	let t = /^\/(.*)\/(i?)$/.exec(e);
	if (t) {
		let [, e, n] = t;
		return e.startsWith("^") || e.endsWith("$") ? new RegExp(e, n) : RegExp(`^${e}$`, n);
	}
	return null;
}
function co(e) {
	if (e instanceof RegExp) return {
		name: e.toString(),
		pattern: e
	};
	if (typeof e == "object") {
		if (e.pattern instanceof RegExp) return {
			name: e.name,
			pattern: e.pattern
		};
		let t = so(e.pattern);
		if (!t) throw Error(`Failed to create regular expression from "${e.pattern}"`);
		return {
			name: e.name,
			pattern: t
		};
	}
	let t = so(e);
	return t ? {
		name: t.toString(),
		pattern: t
	} : e;
}
function lo(e) {
	for (let [t, n] of Object.entries(e.attributes)) n.enum && (e.attributes[t].enum = n.enum.map(co));
}
var H = class {
	expr;
	constructor(e) {
		this.expr = e;
	}
	toString() {
		return this.expr;
	}
};
function uo(e) {
	return !!e?.isStatic;
}
function fo(e) {
	return !!e?.isDynamic;
}
var po = class {
	key;
	value;
	keyLocation;
	valueLocation;
	originalAttribute;
	constructor(e, t, n, r, i) {
		this.key = e, this.value = t ?? null, this.keyLocation = n, this.valueLocation = r, this.originalAttribute = i;
	}
	get isStatic() {
		return !this.isDynamic;
	}
	get isDynamic() {
		return this.value instanceof H;
	}
	valueMatches(e, t = !0) {
		return this.value === null ? !1 : this.value instanceof H ? t : Array.isArray(e) ? e.includes(this.value) : e instanceof RegExp ? this.value.match(e) !== null : this.value === e;
	}
};
function mo(e) {
	return e.trim().split(";").filter(Boolean).map((e) => {
		let [t, n] = e.split(":", 2);
		return [t.trim(), n ? n.trim() : ""];
	});
}
function ho(e) {
	if (!e || e instanceof H) return {};
	let t = mo(e);
	return Object.fromEntries(t);
}
function go(e, t, n) {
	return typeof e == "number" ? typeof n == "number" ? (n < 0 && (n = e + n), Math.min(e, n - t)) : e - t : e;
}
function U(e, t, n, r) {
	if (!e) return null;
	let i = go(e.size, t, n), a = {
		filename: e.filename,
		offset: e.offset + t,
		line: e.line,
		column: e.column + t,
		size: i
	};
	if (r) {
		let e = -1, n = a.column;
		for (; e = r.indexOf("\n", e + 1), e >= 0 && e < t;) a.column = n - (e + 1), a.line++;
	}
	return a;
}
var W = {
	ELEMENT_NODE: 1,
	TEXT_NODE: 3,
	DOCUMENT_NODE: 9,
	CLOSED_OPEN: 0,
	CLOSED_END_TAG: 1,
	CLOSED_VOID_OMITTED: 2,
	CLOSED_VOID_SELF_CLOSED: 3,
	CLOSED_IMPLICIT_CLOSED: 4
}, _o = "#document", vo = /* @__PURE__ */ Symbol("textContent"), yo = { counter: 0 }, bo = class {
	nodeName;
	nodeType;
	childNodes;
	location;
	unique;
	cache;
	disabledRules;
	blockedRules;
	constructor(e, t, n) {
		this.nodeType = e, this.nodeName = t ?? _o, this.location = n, this.disabledRules = /* @__PURE__ */ new Set(), this.blockedRules = /* @__PURE__ */ new Map(), this.childNodes = [], this.unique = yo.counter++, this.cache = null;
	}
	cacheEnable(e = !0) {
		this.cache = e ? /* @__PURE__ */ new Map() : null;
	}
	cacheGet(e) {
		if (this.cache) return this.cache.get(e);
	}
	cacheSet(e, t) {
		return this.cache && this.cache.set(e, t), t;
	}
	cacheRemove(e) {
		return this.cache ? this.cache.delete(e) : !1;
	}
	cacheExists(e) {
		return !!this.cache?.has(e);
	}
	get textContent() {
		let e = this.cacheGet(vo);
		if (e) return e;
		let t = this.childNodes.map((e) => e.textContent).join("");
		return this.cacheSet(vo, t), t;
	}
	append(e) {
		let t = e._setParent(this);
		t && this.isSameNode(t) || (this.childNodes.push(e), t && t._removeChild(e));
	}
	insertBefore(e, t) {
		let n = t ? this.childNodes.findIndex((e) => e.isSameNode(t)) : -1;
		n >= 0 ? this.childNodes.splice(n, 0, e) : this.childNodes.push(e);
		let r = e._setParent(this);
		r && r._removeChild(e);
	}
	isRootElement() {
		return this.nodeType === W.DOCUMENT_NODE;
	}
	isSameNode(e) {
		return this.unique === e.unique;
	}
	get firstChild() {
		return this.childNodes[0] || null;
	}
	get lastChild() {
		return this.childNodes.at(-1) ?? null;
	}
	removeChild(e) {
		return this._removeChild(e), e._setParent(null), e;
	}
	blockRule(e, t) {
		let n = this.blockedRules.get(e);
		n ? n.push(t) : this.blockedRules.set(e, [t]);
	}
	blockRules(e, t) {
		for (let n of e) this.blockRule(n, t);
	}
	disableRule(e) {
		this.disabledRules.add(e);
	}
	disableRules(e) {
		for (let t of e) this.disableRule(t);
	}
	enableRule(e) {
		this.disabledRules.delete(e);
	}
	enableRules(e) {
		for (let t of e) this.enableRule(t);
	}
	ruleEnabled(e) {
		return !this.disabledRules.has(e);
	}
	ruleBlockers(e) {
		return this.blockedRules.get(e) ?? [];
	}
	generateSelector() {
		return null;
	}
	_setParent(e) {
		return null;
	}
	_removeChild(e) {
		let t = this.childNodes.findIndex((t) => t.isSameNode(e));
		if (t !== -1) this.childNodes.splice(t, 1);
		else throw Error("DOMException: _removeChild(..) could not find child to remove");
	}
};
function xo(e, t) {
	let n = [], r = t ? [] : null;
	for (let i = 0; i < e.length;) {
		let a = e.indexOf(" ", i);
		a === -1 && (a = e.length);
		let o = a - i;
		if (o === 0) {
			i++;
			continue;
		}
		let s = e.slice(i, a);
		if (n.push(s), r && t) {
			let e = U(t, i, a);
			r.push(e);
		}
		i += o + 1;
	}
	return {
		tokens: n,
		locations: r
	};
}
var G = class extends Array {
	value;
	locations;
	constructor(e, t) {
		if (e && typeof e == "string") {
			let { tokens: n, locations: r } = xo(e.replaceAll(/[\t\n\r]/g, " "), t);
			super(...n), this.locations = r;
		} else super(0), this.locations = null;
		e instanceof H ? this.value = e.expr : this.value = e ?? "";
	}
	item(e) {
		return this[e];
	}
	location(e) {
		if (this.locations) return this.locations[e];
		throw Error("Trying to access DOMTokenList location when base location isn't set");
	}
	contains(e) {
		return this.includes(e);
	}
	*iterator() {
		for (let e = 0; e < this.length; e++) {
			let t = this.item(e), n = this.location(e);
			yield {
				index: e,
				item: t,
				location: n
			};
		}
	}
}, So = /* @__PURE__ */ ((e) => (e[e.DESCENDANT = 1] = "DESCENDANT", e[e.CHILD = 2] = "CHILD", e[e.ADJACENT_SIBLING = 3] = "ADJACENT_SIBLING", e[e.GENERAL_SIBLING = 4] = "GENERAL_SIBLING", e[e.SCOPE = 5] = "SCOPE", e))(So || {});
function Co(e, t) {
	if (t === ":scope") return 5;
	switch (e) {
		case void 0:
		case null:
		case "": return 1;
		case ">": return 2;
		case "+": return 3;
		case "~": return 4;
		default: throw Error(`Unknown combinator "${e}"`);
	}
}
function wo(e) {
	return e.previousSibling === null;
}
function To(e) {
	return e.nextSibling === null;
}
var Eo = {};
function Do(e) {
	if (!e.parent) return -1;
	if (!Eo[e.unique]) {
		let t = e.parent.childElements.findIndex((t) => t.unique === e.unique);
		Eo[e.unique] = t + 1;
	}
	return Eo[e.unique];
}
function Oo(e, t) {
	if (!t) throw Error("Missing argument to nth-child");
	let n = Math.trunc(Number(t.trim()));
	return Do(e) === n;
}
function ko(e) {
	return !!(this.scope && e.isSameNode(this.scope));
}
var Ao = {
	"first-child": wo,
	"last-child": To,
	"nth-child": Oo,
	scope: ko
};
function jo(e, t) {
	let n = Ao[e];
	if (n) return n.bind(t);
	throw Error(`Pseudo-class "${e}" is not implemented`);
}
function Mo(e) {
	return e.replaceAll(/\\(.)/g, "$1");
}
function No(e) {
	return {
		kind: "class",
		classname: e,
		match(t) {
			return t.classList.contains(e);
		}
	};
}
function Po(e) {
	let t = Mo(e);
	return {
		kind: "id",
		id: t,
		match(e) {
			return e.id === t;
		}
	};
}
function Fo(e) {
	let t = /^(.+?)(?:([$*^|~]?=)"([^"]+)")?$/.exec(e), n = t[1], r = t[2], i = t[3], a = typeof i == "string" ? Mo(i) : i;
	return {
		kind: "attribute",
		key: n,
		op: r,
		value: a,
		match(e) {
			return e.getAttribute(n, !0).some((e) => {
				switch (r) {
					case void 0: return !0;
					case "=": return e.value === a;
					default: throw Error(`Attribute selector operator ${r} is not implemented yet`);
				}
			});
		}
	};
}
function Io(e, t) {
	let n = /^([^(]+)(?:\((.*)\))?$/.exec(e);
	if (!n) throw Error(`Missing pseudo-class after colon in selector pattern "${t}"`);
	let r = n[1], i = n[2];
	return {
		kind: "pseudo",
		name: r,
		args: i,
		match(e, t) {
			return jo(r, t)(e, i);
		}
	};
}
function Lo(e) {
	return /[#.:[]/.test(e);
}
function Ro(e) {
	return /["']/.test(e);
}
function zo(e, t) {
	return e === ":" && t === ":";
}
function* Bo(e) {
	if (e === "") return;
	let t = e.length, n = 0, r = 1, i = !1;
	for (; r < t;) {
		let t = e[r];
		if (t === "\\") {
			r += 2;
			continue;
		}
		if (i) {
			t === i && (i = !1), r += 1;
			continue;
		}
		if (Ro(t)) {
			i = t, r += 1;
			continue;
		}
		let a = e.slice(n, r);
		if (zo(t, a)) {
			r += 1;
			continue;
		}
		Lo(t) && (n = r, yield a), r += 1;
	}
	yield e.slice(n, r);
}
var Vo = class {
	combinator;
	tagName;
	selector;
	conditions;
	constructor(e) {
		let t = /^([+>~-]?)((?:\*|[^#.:[]+)?)([\s\S]*)$/.exec(e);
		if (!t) throw Error(`Failed to create selector pattern from "${e}"`);
		t.shift(), this.selector = e, this.combinator = Co(t.shift(), e), this.tagName = t.shift() || "*", this.conditions = Array.from(Bo(t[0]), (e) => this.createCondition(e));
	}
	match(e, t) {
		return e.is(this.tagName) && this.conditions.every((n) => n.match(e, t));
	}
	createCondition(e) {
		switch (e.at(0)) {
			case ".": return No(e.slice(1));
			case "#": return Po(e.slice(1));
			case "[": return Fo(e.slice(1, -1));
			case ":": return Io(e.slice(1), this.selector);
			default: throw Error(`Failed to create selector condition for "${e}"`);
		}
	}
}, Ho = /* @__PURE__ */ new Set([
	"9",
	"a",
	"d"
]);
function* Uo(e) {
	let t = 0, n = 0;
	function r(e, t) {
		return e === "\\" ? 1 : e === " " ? (n = t, 2) : 0;
	}
	function i(e) {
		return +!!Ho.has(e);
	}
	function* a(r, i) {
		return r === " " ? 2 : (yield e.slice(t, n), t = i, n = i, 0);
	}
	let o = 0;
	for (let t = 0; t < e.length; t++) {
		let n = e[t];
		switch (o) {
			case 0:
				o = r(n, t);
				break;
			case 1:
				o = i(n);
				break;
			case 2:
				o = yield* a(n, t);
				break;
		}
	}
	t !== e.length && (yield e.slice(t));
}
function Wo(e) {
	let t = {
		"\\9 ": "	",
		"\\a ": "\n",
		"\\d ": "\r"
	};
	return e.replaceAll(/(\\[9ad] )/g, (e, n) => t[n]);
}
function Go(e) {
	return e = e.replaceAll(/([+>~]) /g, "$1"), Array.from(Uo(e), (e) => new Vo(Wo(e)));
}
function* Ko(e) {
	let t = e.parent;
	for (; t && !t.isRootElement();) yield t, t = t.parent;
}
function* qo(e) {
	let t = e.parent;
	t && !t.isRootElement() && (yield t);
}
function* Jo(e) {
	let t = e.previousSibling;
	t && (yield t);
}
function* Yo(e) {
	let t = e.siblings, n = t.findIndex((t) => t.isSameNode(e));
	for (let e = 0; e < n; e++) yield t[e];
}
function* Xo(e) {
	yield e;
}
function Zo(e, t) {
	switch (t) {
		case So.DESCENDANT: return Ko(e);
		case So.CHILD: return qo(e);
		case So.ADJACENT_SIBLING: return Jo(e);
		case So.GENERAL_SIBLING: return Yo(e);
		/* istanbul ignore next -- cannot really happen, the selector would be malformed */
		case So.SCOPE: return Xo(e);
	}
}
function Qo(e, t, n) {
	let r = t.at(-1);
	if (!r.match(e, n)) return !1;
	let i = t.slice(0, -1);
	if (i.length === 0) return !0;
	let a = Zo(e, r.combinator);
	for (let e of a) if (Qo(e, i, n)) return !0;
	return !1;
}
var $o = class e {
	compounds;
	constructor(e) {
		this.compounds = e;
	}
	static fromString(t) {
		return new e(Go(t));
	}
	static fromCompounds(t) {
		return new e(t);
	}
	*match(e) {
		let t = { scope: e };
		yield* this.matchInternal(e, 0, t);
	}
	matchElement(e) {
		return Qo(e, this.compounds, { scope: null });
	}
	*matchInternal(t, n, r) {
		if (n >= this.compounds.length) {
			yield t;
			return;
		}
		let i = this.compounds[n], a = e.findCandidates(t, i);
		for (let e of a) i.match(e, r) && (yield* this.matchInternal(e, n + 1, r));
	}
	static findCandidates(e, t) {
		switch (t.combinator) {
			case So.DESCENDANT: return e.getElementsByTagName(t.tagName);
			case So.CHILD: return e.childElements.filter((e) => e.is(t.tagName));
			case So.ADJACENT_SIBLING: return this.findAdjacentSibling(e);
			case So.GENERAL_SIBLING: return this.findGeneralSibling(e);
			case So.SCOPE: return [e];
		}
	}
	static findAdjacentSibling(e) {
		let t = !1;
		return e.siblings.filter((n) => t ? (t = !1, !0) : (n.isSameNode(e) && (t = !0), !1));
	}
	static findGeneralSibling(e) {
		let t = !1;
		return e.siblings.filter((n) => t ? !0 : (n.isSameNode(e) && (t = !0), !1));
	}
}, es = {
	"	": "\\9 ",
	"\n": "\\a ",
	"\r": "\\d "
};
function ts(e) {
	return e.toString().replaceAll(/([^\w-])/g, (e, t) => Object.hasOwn(es, t) ? es[t] : `\\${t}`);
}
function ns(e) {
	let t = ts(e);
	return /^\d/.test(t) ? `[id="${t}"]` : `#${t}`;
}
var rs = /* @__PURE__ */ new Map();
function is(e) {
	let t = rs.get(e);
	if (t) return t;
	let n = Go(e), r = $o.fromCompounds(n);
	return rs.set(e, r), r;
}
var as = "#text";
function os(e) {
	return e?.nodeType === W.TEXT_NODE;
}
var ss = class extends bo {
	text;
	constructor(e, t) {
		super(W.TEXT_NODE, as, t), this.text = e;
	}
	get textContent() {
		return this.text.toString();
	}
	get isStatic() {
		return !this.isDynamic;
	}
	get isDynamic() {
		return this.text instanceof H;
	}
}, cs = /* @__PURE__ */ Symbol("childElements"), ls = /* @__PURE__ */ Symbol("role"), us = /* @__PURE__ */ Symbol("tabindex");
function ds(e) {
	return e?.nodeType === W.ELEMENT_NODE;
}
function fs(e) {
	return e === "" || e === "*";
}
function ps(e) {
	return {
		closest(t) {
			return e.closest(t)?._adapter;
		},
		getAttribute(t) {
			return e.getAttribute(t)?.value;
		},
		hasAttribute(t) {
			return e.hasAttribute(t);
		}
	};
}
var ms = class e extends bo {
	tagName;
	voidElement;
	depth;
	closed;
	attr;
	metaElement;
	annotation;
	_parent;
	_adapter;
	constructor(e) {
		let { nodeType: t, tagName: n, parent: r = null, closed: i = W.CLOSED_END_TAG, meta: a = null, location: o } = e;
		if (super(t, n, o), fs(n)) throw Error(`The tag name provided ("${n}") is not a valid name`);
		if (this.tagName = n ?? "#document", this._parent = null, this.attr = {}, this.metaElement = a ?? null, this.closed = i, this.voidElement = a ? !!a.void : !1, this.depth = 0, this.annotation = null, this._adapter = ps(this), r) {
			r.append(this);
			let e = r;
			for (; e.parent;) this.depth++, e = e.parent;
		}
	}
	static createElement(t, n, r = {}) {
		let { closed: i = W.CLOSED_END_TAG, meta: a = null, parent: o = null } = r;
		return new e({
			nodeType: W.ELEMENT_NODE,
			tagName: t,
			parent: o,
			closed: i,
			meta: a,
			location: n
		});
	}
	static rootNode(t) {
		let n = new e({
			nodeType: W.DOCUMENT_NODE,
			location: t
		});
		return n.setAnnotation("#document"), n;
	}
	static fromTokens(t, n, r, i, a = "") {
		let o = t.data[2];
		if (!o) throw Error("tagName cannot be empty");
		let s = a ? `${a}:${o}` : o, c = i ? i.getMetaFor(s) : null, l = t.data[1] !== "/", u = hs(n, c), d = U(t.location, 1);
		return new e({
			nodeType: W.ELEMENT_NODE,
			tagName: s,
			parent: l ? r : null,
			closed: u,
			meta: c,
			location: d
		});
	}
	get annotatedName() {
		return this.annotation ? this.annotation : `<${this.tagName}>`;
	}
	get ariaLabelledby() {
		let e = this.getAttribute("aria-labelledby");
		if (!e?.value) return null;
		if (e.value instanceof H) return e.value;
		let t = new G(e.value, e.valueLocation);
		return t.length > 0 ? Array.from(t) : null;
	}
	get childElements() {
		let e = this.cacheGet(cs);
		return e === void 0 ? this.cacheSet(cs, this.childNodes.filter(ds)) : e;
	}
	closest(e) {
		let t = this;
		for (; t;) {
			if (t.matches(e)) return t;
			t = t.parent;
		}
		return null;
	}
	generateSelector() {
		if (this.isRootElement()) return null;
		let e = [], t;
		for (t = this; t.parent; t = t.parent);
		for (let n = this; n.parent; n = n.parent) {
			if (n.id) {
				let r = ns(n.id);
				if (t.querySelectorAll(r).length === 1) {
					e.push(r);
					break;
				}
			}
			let r = n.parent.childElements, i = r.findIndex((e) => e.unique === n.unique);
			if (r.filter((e) => e.is(n.tagName)).length === 1) {
				e.push(n.tagName.toLowerCase());
				continue;
			}
			e.push(`${n.tagName.toLowerCase()}:nth-child(${String(i + 1)})`);
		}
		return e.toReversed().join(" > ");
	}
	is(e) {
		return e === "*" || this.tagName.toLowerCase() === e.toLowerCase();
	}
	loadMeta(e) {
		this.metaElement ??= {};
		for (let t of Ma) {
			let n = e[t];
			n === void 0 ? delete this.metaElement[t] : Na(this.metaElement, t, n);
		}
	}
	matches(e) {
		return e.split(",").some((e) => is(e.trim()).matchElement(this));
	}
	get meta() {
		return this.metaElement;
	}
	get parent() {
		return this._parent;
	}
	get role() {
		let e = this.cacheGet(ls);
		if (e !== void 0) return e;
		let t = this.getAttribute("role");
		if (t) return this.cacheSet(ls, t.value);
		if (this.metaElement) {
			let { aria: e } = this.metaElement, t = e.implicitRole(this._adapter);
			return this.cacheSet(ls, t);
		}
		return this.cacheSet(ls, null);
	}
	setAnnotation(e) {
		this.annotation = e;
	}
	setAttribute(e, t, n, r, i) {
		e = e.toLowerCase();
		let a = new po(e, t, n, r, i), o = this.attr[e];
		o ? o.push(a) : this.attr[e] = [a];
	}
	get tabIndex() {
		let e = this.cacheGet(us);
		if (e !== void 0) return e;
		let t = this.getAttribute("tabindex");
		if (!t || t.value === null || t.value === "") return this.cacheSet(us, null);
		if (t.value instanceof H) return this.cacheSet(us, 0);
		let n = Math.trunc(Number(t.value));
		return Number.isNaN(n) ? this.cacheSet(us, null) : this.cacheSet(us, n);
	}
	get textType() {
		let e = this.tagName.toLowerCase();
		return e === "script" ? "script" : e === "style" ? "css" : "text";
	}
	get attributes() {
		return Object.values(this.attr).reduce((e, t) => e.concat(t), []);
	}
	hasAttribute(e) {
		return e = e.toLowerCase(), Object.hasOwn(this.attr, e);
	}
	getAttribute(e, t = !1) {
		if (e = e.toLowerCase(), Object.hasOwn(this.attr, e)) {
			let n = this.attr[e];
			return t ? n : n[0];
		}
		return t ? [] : null;
	}
	getAttributeValue(e) {
		let t = this.getAttribute(e);
		return t ? t.value === null ? null : t.value.toString() : null;
	}
	appendText(e, t) {
		typeof e != "string" && (e = "dynamic" in e ? new H(e.dynamic) : new H(e.expr)), this.childNodes.push(new ss(e, t));
	}
	get classList() {
		return this.hasAttribute("class") ? new G(this.getAttribute("class", !0).filter((e) => e.isStatic).map((e) => e.value).join(" "), null) : new G(null, null);
	}
	get id() {
		return this.getAttributeValue("id");
	}
	get style() {
		return ho(this.getAttribute("style")?.value);
	}
	get firstElementChild() {
		let e = this.childElements;
		return e.length > 0 ? e[0] : null;
	}
	get lastElementChild() {
		let e = this.childElements;
		return e.length > 0 ? e.at(-1) : null;
	}
	get siblings() {
		return this.parent ? this.parent.childElements : [this];
	}
	get previousSibling() {
		let e = this.siblings.findIndex((e) => e.unique === this.unique);
		return e >= 1 ? this.siblings[e - 1] : null;
	}
	get nextSibling() {
		let e = this.siblings.findIndex((e) => e.unique === this.unique);
		return e <= this.siblings.length - 2 ? this.siblings[e + 1] : null;
	}
	getElementsByTagName(e) {
		let t = [];
		return this.collectByTagName(e, t), t;
	}
	collectByTagName(e, t) {
		for (let n of this.childElements) n.is(e) && t.push(n), n.collectByTagName(e, t);
	}
	querySelector(e) {
		let t = this.querySelectorImpl(e).next();
		return t.done ? null : t.value;
	}
	querySelectorAll(e) {
		let t = this.querySelectorImpl(e), n = new Set(t);
		return Array.from(n);
	}
	*querySelectorImpl(e) {
		if (e) for (let t of e.split(/(?<!\\),\s*/)) yield* is(t).match(this);
	}
	someChildren(e) {
		return this.childElements.some(t);
		function t(n) {
			return e(n) ? !0 : n.childElements.some(t);
		}
	}
	everyChildren(e) {
		return this.childElements.every(t);
		function t(n) {
			return e(n) ? n.childElements.every(t) : !1;
		}
	}
	find(e) {
		function t(t) {
			if (e(t)) return t;
			for (let n of t.childElements) {
				let t = n.find(e);
				if (t) return t;
			}
			return null;
		}
		return t(this);
	}
	append(e) {
		super.append(e), this.cacheRemove(cs);
	}
	insertBefore(e, t) {
		super.insertBefore(e, t), this.cacheRemove(cs);
	}
	removeChild(e) {
		return super.removeChild(e);
	}
	_setParent(t) {
		let n = this._parent;
		return this._parent = t instanceof e ? t : null, n?.cacheRemove(cs), n;
	}
};
function hs(e, t) {
	let n = W.CLOSED_OPEN;
	return t?.void && (n = W.CLOSED_VOID_OMITTED), e.data[0] === "/>" && (n = W.CLOSED_VOID_SELF_CLOSED), n;
}
function gs(e) {
	return "root" in e && "readyState" in e;
}
function _s(e, t) {
	if (gs(e)) {
		if (e.readyState !== "complete") throw Error("Cannot call walk.depthFirst(..) before document is ready");
		e = e.root;
	}
	function n(e) {
		for (let t of e.childElements) n(t);
		e.isRootElement() || t(e);
	}
	n(e);
}
var vs = { depthFirst: _s }, ys = class {
	root;
	active;
	_readyState;
	doctype;
	constructor(e) {
		this.root = ms.rootNode(e), this.active = this.root, this.doctype = null, this._readyState = "loading";
	}
	pushActive(e) {
		this.active = e;
	}
	popActive() {
		this.active.isRootElement() || (this.active = this.active.parent ?? this.root);
	}
	getActive() {
		return this.active;
	}
	get readyState() {
		return this._readyState;
	}
	resolveMeta(e) {
		this._readyState = "complete", vs.depthFirst(this, (t) => {
			e.resolve(t);
		});
	}
	getElementsByTagName(e) {
		return this.root.getElementsByTagName(e);
	}
	querySelector(e) {
		return this.root.querySelector(e);
	}
	querySelectorAll(e) {
		return this.root.querySelectorAll(e);
	}
}, bs = /* @__PURE__ */ new Set(["exclude"]), xs = class {
	static validatePermitted(e, t) {
		return t ? t.some((t) => this.validatePermittedRule(e, t)) : !0;
	}
	static validateOccurrences(e, t, n) {
		if (!t) return !0;
		let r = !0;
		for (let i of t) {
			if (typeof i != "string") return !1;
			let [, t, a] = /^(@?.*?)([*?]?)$/.exec(i), o = t && a && Cs(a);
			if (o) {
				let a = e.filter((e) => this.validatePermittedCategory(e, i, !0));
				if (a.length > o) {
					for (let e of a.slice(o)) n(e, t);
					r = !1;
				}
			}
		}
		return r;
	}
	static validateOrder(e, t, n) {
		if (!t) return !0;
		let r = 0, i = null;
		for (let a of e) {
			let e = r;
			for (; t[r] && !this.validatePermittedCategory(a, t[r], !0);) r++;
			if (r >= t.length) {
				if (t.some((e) => this.validatePermittedCategory(a, e, !0))) return n(a, i), !1;
				r = e;
			}
			i = a;
		}
		return !0;
	}
	static validateAncestors(e, t) {
		return !t || t.length === 0 ? !0 : t.some((t) => e.closest(t));
	}
	static validateRequiredContent(e, t) {
		return !t || t.length === 0 ? [] : t.filter((t) => !e.childElements.some((e) => this.validatePermittedCategory(e, t, !1)));
	}
	static validateAttribute(e, t) {
		let n = t[e.key];
		if (!n) return !0;
		let r = e.value;
		if (r instanceof H) return !0;
		let i = r === null || r === "";
		return n.boolean ? i || r === e.key : n.omit && i ? !0 : n.list ? new G(r, e.valueLocation).every((e) => this.validateAttributeValue(e, n)) : this.validateAttributeValue(r, n);
	}
	static validateAttributeValue(e, t) {
		if (!t.enum) return !0;
		if (e === null) return !1;
		let n = e.toLowerCase();
		return t.enum.some((t) => {
			if (typeof t == "string") return n === t;
			if (t instanceof RegExp) return t.test(e);
			if (t.pattern instanceof RegExp) return t.pattern.test(e);
			throw TypeError("RegExp was not precompiled when it should have been");
		});
	}
	static validatePermittedRule(e, t, n = !1) {
		return typeof t == "string" ? this.validatePermittedCategory(e, t, !n) : Array.isArray(t) ? t.every((t) => this.validatePermittedRule(e, t, n)) : (Ss(t), t.exclude ? Array.isArray(t.exclude) ? t.exclude.every((t) => !this.validatePermittedRule(e, t, !0)) : !this.validatePermittedRule(e, t.exclude, !0) : !0);
	}
	static validatePermittedCategory(e, t, n) {
		let [, r] = /^(@?.*?)[*?]?$/.exec(t);
		if (!r.startsWith("@")) return e.matches(r);
		if (!e.meta) return n;
		switch (r) {
			case "@meta": return e.meta.metadata;
			case "@flow": return e.meta.flow;
			case "@sectioning": return e.meta.sectioning;
			case "@heading": return e.meta.heading;
			case "@phrasing": return e.meta.phrasing;
			case "@embedded": return e.meta.embedded;
			case "@interactive": return e.meta.interactive;
			case "@script": return !!e.meta.scriptSupporting;
			case "@form": return !!e.meta.form;
			default: throw Error(`Invalid content category "${t}"`);
		}
	}
};
function Ss(e) {
	for (let t of Object.keys(e)) {
		if (bs.has(t)) continue;
		let n = JSON.stringify(e);
		throw Error(`Permitted rule "${n}" contains unknown property "${t}"`);
	}
}
function Cs(e) {
	switch (e) {
		case "?": return 1;
		case "*": return null;
		// istanbul ignore next
		default: throw Error(`Invalid quantifier "${e}" used`);
	}
}
var ws = /* @__PURE__ */ ((e) => (e[e.DISABLED = 0] = "DISABLED", e[e.WARN = 1] = "WARN", e[e.ERROR = 2] = "ERROR", e))(ws || {});
function Ts(e) {
	switch (e) {
		case 0:
		case "off": return 0;
		case 1:
		case "warn": return 1;
		case 2:
		case "error": return 2;
		default: throw Error(`Invalid severity "${String(e)}"`);
	}
}
var Es = /* @__PURE__ */ Symbol("aria-naming"), Ds = "allowed", Os = /* @__PURE__ */ new Set([
	"caption",
	"code",
	"deletion",
	"emphasis",
	"generic",
	"insertion",
	"paragraph",
	"presentation",
	"strong",
	"subscript",
	"superscript"
]);
function ks(e) {
	return Os.has(e) ? "prohibited" : "allowed";
}
function As(e, t) {
	return t.aria.naming(e._adapter);
}
function js(e) {
	let t = e.cacheGet(Es);
	if (t) return t;
	let n = e.getAttribute("role")?.value;
	if (n) return n instanceof H ? e.cacheSet(Es, Ds) : e.cacheSet(Es, ks(n));
	let r = e.meta;
	return r ? e.cacheSet(Es, As(e, r)) : e.cacheSet(Es, Ds);
}
var Ms = Symbol(Ns.name);
function Ns(e, t) {
	let n = e.cacheGet(Ms);
	if (n) return t ? n : n.byFieldset || n.bySelf;
	let r = e.cacheSet(Ms, Ps(e));
	return t ? r : r.byFieldset || r.bySelf;
}
function Ps(e) {
	return {
		byFieldset: ((e) => !!e.closest("fieldset[disabled]")?.getAttribute("disabled")?.isStatic)(e),
		bySelf: ((e) => !!e.getAttribute("disabled")?.isStatic)(e)
	};
}
var Fs = /* @__PURE__ */ new Map();
function Is(e) {
	let t = e.replaceAll(/\*+/g, ".+");
	return RegExp(`^${t}$`);
}
function Ls(e) {
	return RegExp(`^${e}$`);
}
function Rs(e) {
	let t = Fs.get(e);
	if (t) return t;
	let n = /^\/(.*)\/$/.exec(e), r = n ? Ls(n[1]) : Is(e);
	return Fs.set(e, r), r;
}
function zs(e, t) {
	for (let n of e) if (Rs(n).test(t)) return !0;
	return !1;
}
function Bs(e, t, n = (e, t) => e.includes(t)) {
	let { include: r, exclude: i } = e;
	return !!(r && !n(r, t) || i && n(i, t));
}
function Vs(e, t) {
	return t.some((t) => t.regexp.test(e));
}
var Hs = Symbol(Ys.name), Us = Symbol(Zs.name), Ws = Symbol($s.name), Gs = Symbol(nc.name), Ks = Symbol(tc.name);
function qs(e) {
	return !(Ys(e) || nc(e) || Zs(e) || $s(e) || tc(e));
}
function Js(e) {
	return {
		byParent: e.parent ? Ys(e.parent) : !1,
		bySelf: ((e) => e.getAttribute("aria-hidden")?.value === "true")(e)
	};
}
function Ys(e, t) {
	let n = e.cacheGet(Hs);
	if (n) return t ? n : n.byParent || n.bySelf;
	let r = e.cacheSet(Hs, Js(e));
	return t ? r : r.byParent || r.bySelf;
}
function Xs(e) {
	return {
		byParent: e.parent ? Zs(e.parent) : !1,
		bySelf: ((e) => !!e.getAttribute("hidden")?.isStatic)(e)
	};
}
function Zs(e, t) {
	let n = e.cacheGet(Us);
	if (n) return t ? n : n.byParent || n.bySelf;
	let r = e.cacheSet(Us, Xs(e));
	return t ? r : r.byParent || r.bySelf;
}
function Qs(e) {
	return {
		byParent: e.parent ? $s(e.parent) : !1,
		bySelf: ((e) => !!e.getAttribute("inert")?.isStatic)(e)
	};
}
function $s(e, t) {
	let n = e.cacheGet(Ws);
	if (n) return t ? n : n.byParent || n.bySelf;
	let r = e.cacheSet(Ws, Qs(e));
	return t ? r : r.byParent || r.bySelf;
}
function ec(e) {
	let t = (e) => {
		let { display: t, visibility: n } = ho(e.getAttribute("style")?.value);
		return t === "none" || n === "hidden";
	}, n = e.parent ? tc(e.parent) : !1, r = t(e);
	return n || r;
}
function tc(e) {
	return e.cacheGet(Ks) || e.cacheSet(Ks, ec(e));
}
function nc(e) {
	if (e.cacheExists(Gs)) return !!e.cacheGet(Gs);
	if (e.meta?.interactive || e.getAttribute("tabindex")) return e.cacheSet(Gs, !1);
	let t = e.getAttribute("role");
	return t && (t.value === "presentation" || t.value === "none") ? e.cacheSet(Gs, !0) : e.cacheSet(Gs, !1);
}
var rc = dc.name, ic = /* @__PURE__ */ Symbol(`${rc}|html`), ac = /* @__PURE__ */ Symbol(`${rc}|a11y`), oc = /* @__PURE__ */ Symbol(`${rc}|html|ignore-hidden-root`), sc = /* @__PURE__ */ Symbol(`${rc}|a11y|ignore-hidden-root`), cc = /* @__PURE__ */ ((e) => (e[e.EMPTY_TEXT = 0] = "EMPTY_TEXT", e[e.DYNAMIC_TEXT = 1] = "DYNAMIC_TEXT", e[e.STATIC_TEXT = 2] = "STATIC_TEXT", e))(cc || {});
function lc(e) {
	let { accessible: t = !1, ignoreHiddenRoot: n = !1 } = e;
	return t && n ? sc : n ? oc : t ? ac : ic;
}
function uc(e) {
	return e.is("select") || e.is("textarea");
}
function dc(e, t = {}) {
	let { accessible: n = !1, ignoreHiddenRoot: r = !1 } = t, i = lc(t);
	if (e.cacheExists(i)) return e.cacheGet(i);
	if (!r && Zs(e) || !r && n && Ys(e) || uc(e)) return e.cacheSet(i, 0);
	let a = fc(e, { ...t });
	return a.some((e) => e.isDynamic) ? e.cacheSet(i, 1) : a.some((e) => /\S/.exec(e.textContent) !== null) ? e.cacheSet(i, 2) : e.cacheSet(i, 0);
}
function fc(e, t) {
	let { accessible: n = !1 } = t, r = [];
	for (let i of e.childNodes) if (os(i)) r.push(i);
	else if (ds(i)) {
		if (Zs(i, !0).bySelf || n && Ys(i, !0).bySelf) continue;
		r.push(...fc(i, t));
	}
	return r;
}
function pc(e) {
	let t = e.getAttribute("alt");
	return !t || t.value === null ? !1 : t.isDynamic || t.value.toString() !== "";
}
function mc(e) {
	let t = e.getAttribute("aria-label");
	return !t || t.value === null ? !1 : t.isDynamic || t.value.toString() !== "";
}
function hc(e, t) {
	return e.reduce((n, r, i) => (n[+!t(r, i, e)].push(r), n), [[], []]);
}
function gc(e) {
	return JSON.stringify(e);
}
function _c(e, t = !1) {
	return e == null ? "null" : typeof e == "number" ? e.toString() : typeof e == "string" ? t ? gc(e) : e : Array.isArray(e) ? `[ ${e.map((e) => _c(e, !0)).join(", ")} ]` : typeof e == "object" ? `{ ${Object.entries(e).map(([e, t]) => `${e}: ${_c(t, !0)}`).join(", ")} }` : String(e);
}
function vc(e, t) {
	return e.replaceAll(/\{\{\s*([^\s{}]+)\s*\}\}/g, (e, n) => t[n] === void 0 ? e : _c(t[n]));
}
var yc = (() => {
	let e = new at.default({
		strict: !0,
		strictTuples: !0,
		strictTypes: !0
	});
	return e.addMetaSchema(da), e.addKeyword(Ea), e;
})();
function bc(e, t) {
	let n = `rule/${e}`, r = yc.getSchema(n);
	if (r) return r;
	let i = {
		$id: n,
		type: "object",
		additionalProperties: !1,
		properties: t
	};
	return yc.compile(i);
}
function xc(e) {
	return !!(e[0] && e[0].message);
}
function Sc(e) {
	if (xc(e)) return e[0];
	let [t, n, r, i] = e;
	return {
		node: t,
		message: n,
		location: r,
		context: i
	};
}
var K = class {
	reporter;
	parser;
	meta;
	enabled;
	blockers;
	severity;
	event;
	tracker;
	name;
	options;
	constructor(e) {
		this.reporter = null, this.parser = null, this.meta = null, this.event = null, this.options = e, this.enabled = !0, this.blockers = [], this.severity = ws.DISABLED, this.name = "", this.tracker = null;
	}
	getSeverity() {
		return this.severity;
	}
	setServerity(e) {
		this.severity = e;
	}
	block(e) {
		this.blockers.push(e);
	}
	unblock(e) {
		this.blockers = this.blockers.filter((t) => t !== e);
	}
	setEnabled(e) {
		this.enabled = e;
	}
	get deprecated() {
		return !1;
	}
	isEnabled(e) {
		return this.enabled && this.severity >= ws.WARN && (!e || e.ruleEnabled(this.name));
	}
	isBlocked(e) {
		return !!(this.blockers.length > 0 || e && e.ruleBlockers(this.name).length > 0);
	}
	getBlockers(e) {
		return [...this.blockers, ...e ? e.ruleBlockers(this.name) : []];
	}
	isKeywordIgnored(e, t = (e, t) => e.includes(t)) {
		return Bs(this.options, e, t);
	}
	getMetaFor(e) {
		return this.meta.getMetaFor(e);
	}
	getTagsWithProperty(e) {
		return this.meta.getTagsWithProperty(e);
	}
	getTagsDerivedFrom(e) {
		return this.meta.getTagsDerivedFrom(e);
	}
	static schema() {
		return null;
	}
	report(...e) {
		let { node: t, message: n, location: r, context: i } = Sc(e), a = this.isEnabled(t), o = this.isBlocked(t), s = this.findLocation({
			node: t,
			location: r,
			event: this.event
		});
		if (this.parser.trigger("rule:error", {
			location: s,
			ruleId: this.name,
			enabled: a,
			blockers: this.getBlockers(t)
		}), a && !o) {
			let e = vc(n, i ?? {});
			this.reporter.add({
				rule: this,
				message: e,
				severity: this.severity,
				node: t,
				location: s,
				context: i
			});
		}
	}
	findLocation(e) {
		return e.location ? e.location : e.event?.location ? e.event.location : e.node?.location ? e.node.location : {};
	}
	on(e, ...t) {
		let n = t.pop(), r = t.pop() ?? (() => !0);
		return this.parser.on(e, (e, t) => {
			if (!this.isEnabled() || !r(t)) return;
			this.event = t;
			let { tracker: i } = this;
			if (i) {
				let e = performance.now();
				n(t);
				let r = performance.now();
				i.trackRule(this.name, r - e);
			} else n(t);
		});
	}
	init(e, t, n, r) {
		this.parser = e, this.reporter = t, this.severity = n, this.meta = r;
	}
	setTracker(e) {
		this.tracker = e;
	}
	static validateOptions(e, t, n, r, i, a) {
		if (!e) return;
		let o = e.schema();
		if (!o) return;
		let s = bc(t, o);
		if (!s(r)) throw new Ca(i, "Rule configuration error", a, o, (s.errors ?? []).map((e) => (e.instancePath = `${n}${e.instancePath}`, e)));
	}
	documentation(e) {
		return null;
	}
}, Cc = {
	allowExternal: !0,
	allowRelative: !0,
	allowAbsolute: !0,
	allowBase: !0
}, wc = {
	a: "href",
	img: "src",
	link: "href",
	script: "src"
}, Tc = {
	external: "External links are not allowed by current configuration.",
	"relative-base": "Links relative to <base> are not allowed by current configuration.",
	"relative-path": "Relative links are not allowed by current configuration.",
	absolute: "Absolute links are not allowed by current configuration.",
	anchor: null
};
function Ec(e) {
	return typeof e == "boolean" ? e : {
		include: e.include ? e.include.map((e) => new RegExp(e)) : null,
		exclude: e.exclude ? e.exclude.map((e) => new RegExp(e)) : null
	};
}
function Dc(e, t) {
	return !(t.include?.every((t) => !t.test(e)) || t.exclude?.some((t) => t.test(e)));
}
var Oc = class extends K {
	allowExternal;
	allowRelative;
	allowAbsolute;
	constructor(e) {
		super({
			...Cc,
			...e
		}), this.allowExternal = Ec(this.options.allowExternal), this.allowRelative = Ec(this.options.allowRelative), this.allowAbsolute = Ec(this.options.allowAbsolute);
	}
	static schema() {
		let e = { anyOf: [{ type: "boolean" }, {
			type: "object",
			properties: {
				include: {
					type: "array",
					items: { type: "string" }
				},
				exclude: {
					type: "array",
					items: { type: "string" }
				}
			}
		}] };
		return {
			allowExternal: { ...e },
			allowRelative: { ...e },
			allowAbsolute: { ...e },
			allowBase: { type: "boolean" }
		};
	}
	documentation(e) {
		return {
			description: Tc[e] ?? "This link type is not allowed by current configuration",
			url: "https://html-validate.org/rules/allowed-links.html"
		};
	}
	setup() {
		this.on("attr", (e) => {
			if (!e.value || !this.isRelevant(e)) return;
			let t = e.value.toString(), n = this.getStyle(t);
			switch (n) {
				case "anchor": break;
				case "absolute":
					this.handleAbsolute(t, e, n);
					break;
				case "external":
					this.handleExternal(t, e, n);
					break;
				case "relative-base":
					this.handleRelativeBase(t, e, n);
					break;
				case "relative-path":
					this.handleRelativePath(t, e, n);
					break;
			}
		});
	}
	isRelevant(e) {
		let { target: t, key: n, value: r } = e;
		if (r instanceof H) return !1;
		let i = wc[t.tagName];
		return !!(i && i === n);
	}
	getStyle(e) {
		if (/^(?:[a-z]+:)?\/\//.test(e)) return "external";
		switch (e.at(0)) {
			case "/": return "absolute";
			case ".": return "relative-path";
			case "#": return "anchor";
			default: return "relative-base";
		}
	}
	handleAbsolute(e, t, n) {
		let { allowAbsolute: r } = this;
		r !== !0 && (r === !1 ? this.report(t.target, "Link destination must not be absolute url", t.valueLocation, n) : Dc(e, r) || this.report(t.target, "Absolute link to this destination is not allowed by current configuration", t.valueLocation, n));
	}
	handleExternal(e, t, n) {
		let { allowExternal: r } = this;
		r !== !0 && (r === !1 ? this.report(t.target, "Link destination must not be external url", t.valueLocation, n) : Dc(e, r) || this.report(t.target, "External link to this destination is not allowed by current configuration", t.valueLocation, n));
	}
	handleRelativePath(e, t, n) {
		let { allowRelative: r } = this;
		return r === !0 ? !1 : r === !1 ? (this.report(t.target, "Link destination must not be relative url", t.valueLocation, n), !0) : Dc(e, r) ? !1 : (this.report(t.target, "Relative link to this destination is not allowed by current configuration", t.valueLocation, n), !0);
	}
	handleRelativeBase(e, t, n) {
		let { allowBase: r } = this.options;
		this.handleRelativePath(e, t, n) || r || this.report(t.target, "Relative links must be relative to current folder", t.valueLocation, n);
	}
}, kc = { accessible: !0 };
function Ac(e, t) {
	return t.filter((t) => t.getAttributeValue("href") === e);
}
function jc(e) {
	return e.getAttributeValue("alt");
}
function Mc(e) {
	switch (e) {
		case "missing-alt": return [
			"The `alt` attribute must be set (and not empty) when the `href` attribute is present on an `<area>` element.",
			"",
			"The attribute is used to provide an alternative text description for the area of the image map.",
			"The text should describe the purpose of area and the resource referenced by the `href` attribute.",
			"",
			"Either add the `alt` attribute or remove the `href` attribute."
		];
		case "missing-href": return [
			"The `alt` attribute must not be set when the `href` attribute is missing on an `<area>` element.",
			"",
			"Either add the `href` attribute or remove the `alt` attribute."
		];
	}
}
var Nc = class extends K {
	constructor(e) {
		super({
			...kc,
			...e
		});
	}
	static schema() {
		return { accessible: { type: "boolean" } };
	}
	documentation(e) {
		return {
			description: Mc(e).join("\n"),
			url: "https://html-validate.org/rules/area-alt.html"
		};
	}
	setup() {
		this.on("element:ready", this.isRelevant, (e) => {
			let { target: t } = e, n = t.querySelectorAll("area");
			for (let e of n) this.validateArea(e, n);
		});
	}
	validateArea(e, t) {
		let { accessible: n } = this.options, r = e.getAttribute("href"), i = e.getAttribute("alt");
		if (r) {
			if (fo(i)) return;
			let a = e.getAttributeValue("href");
			(n ? [jc(e)] : Ac(a, t).map(jc)).some(Boolean) || this.report({
				node: e,
				message: "\"alt\" attribute must be set and non-empty when the \"href\" attribute is present",
				location: i ? i.keyLocation : r.keyLocation,
				context: "missing-alt"
			});
		} else i && this.report({
			node: e,
			message: "\"alt\" attribute cannot be used unless the \"href\" attribute is present",
			location: i.keyLocation,
			context: "missing-href"
		});
	}
	isRelevant(e) {
		let { target: t } = e;
		return t.is("map");
	}
}, Pc = class extends K {
	documentation() {
		return {
			description: "`aria-hidden` must not be used on the `<body>` element as it makes the page inaccessible to assistive technology such as screenreaders",
			url: "https://html-validate.org/rules/aria-hidden-body.html"
		};
	}
	setup() {
		this.on("tag:ready", this.isRelevant, (e) => {
			let { target: t } = e, n = t.getAttribute("aria-hidden");
			n?.valueMatches("true", !0) && this.report(t, "aria-hidden must not be used on <body>", n.keyLocation);
		});
	}
	isRelevant(e) {
		return e.target.is("body");
	}
}, Fc = {
	allowAnyNamable: !1,
	elements: {
		include: null,
		exclude: null
	}
}, Ic = /* @__PURE__ */ new Set([
	"article",
	"aside",
	"footer",
	"form",
	"header",
	"main",
	"nav",
	"search",
	"section",
	"area",
	"dialog",
	"fieldset",
	"figure",
	"iframe",
	"img",
	"summary",
	"table",
	"td",
	"th"
]);
function Lc(e, t) {
	return !!(t.attributes["aria-label"] || Ic.has(e.tagName) || e.hasAttribute("role") || e.hasAttribute("tabindex") || t.interactive || t.labelable);
}
var Rc = class extends K {
	constructor(e) {
		super({
			...Fc,
			...e
		});
	}
	static schema() {
		return {
			allowAnyNamable: { type: "boolean" },
			elements: {
				type: "object",
				properties: {
					include: { anyOf: [{
						type: "array",
						items: { type: "string" }
					}, { type: "null" }] },
					exclude: { anyOf: [{
						type: "array",
						items: { type: "string" }
					}, { type: "null" }] }
				},
				additionalProperties: !1
			}
		};
	}
	documentation(e) {
		let t = [
			"Interactive elements",
			"Labelable elements",
			"Landmark elements",
			"Elements with roles inheriting from widget",
			"`<area>`",
			"`<dialog>`",
			"`<form>` and `<fieldset>`",
			"`<iframe>`",
			"`<img>` and `<figure>`",
			"`<summary>`",
			"`<table>`, `<td>` and `<th>`"
		].map((e) => `- ${e}`), n = "https://html-validate.org/rules/aria-label-misuse.html";
		return e.allowsNaming ? {
			description: [
				`\`${e.attr}\` is strictly allowed but is not recommended to be used on this element.`,
				`\`${e.attr}\` can only be used on:`,
				"",
				...t
			].join("\n"),
			url: n
		} : {
			description: [
				`\`${e.attr}\` can only be used on:`,
				"",
				...t
			].join("\n"),
			url: n
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let { document: t } = e;
			for (let e of t.querySelectorAll("[aria-label], [aria-labelledby]")) {
				let t = e.getAttribute("aria-label");
				t && this.validateElement(e, t, "aria-label");
				let n = e.getAttribute("aria-labelledby");
				n && this.validateElement(e, n, "aria-labelledby");
			}
		});
	}
	validateElement(e, t, n) {
		if (!t.value || t.valueMatches("", !1)) return;
		let r = e.meta;
		if (!r || this.shouldIgnoreElement(e) || Lc(e, r)) return;
		let i = js(e) === "allowed";
		if (i && this.options.allowAnyNamable) return;
		let a = {
			attr: n,
			allowsNaming: i
		};
		i ? this.report({
			node: e,
			location: t.keyLocation,
			context: a,
			message: "\"{{ attr }}\" is strictly allowed but is not recommended to be used on this element"
		}) : this.report({
			node: e,
			location: t.keyLocation,
			context: a,
			message: "\"{{ attr }}\" cannot be used on this element"
		});
	}
	shouldIgnoreElement(e) {
		return Bs(this.options.elements, e.tagName, zs);
	}
}, q = class extends V {
	constructor(e, t) {
		super(e, t), this.name = "ConfigError";
	}
}, zc = class {
	styles;
	constructor(e, t) {
		if (Array.isArray(e) || (e = [e]), e.length === 0) throw new q(`Missing style for ${t} rule`);
		this.styles = this.parseStyle(e, t);
	}
	match(e) {
		return this.styles.some((t) => e.match(t.pattern));
	}
	get name() {
		let e = this.styles.map((e) => e.name);
		switch (this.styles.length) {
			case 1: return e[0];
			case 2: return e.join(" or ");
			default: {
				let t = e.slice(-1);
				return `${e.slice(0, -1).join(", ")} or ${t[0]}`;
			}
		}
	}
	parseStyle(e, t) {
		return e.map((e) => {
			switch (e.toLowerCase()) {
				case "lowercase": return {
					pattern: /^[a-z]*$/,
					name: "lowercase"
				};
				case "uppercase": return {
					pattern: /^[A-Z]*$/,
					name: "uppercase"
				};
				case "pascalcase": return {
					pattern: /^[A-Z][A-Za-z]*$/,
					name: "PascalCase"
				};
				case "camelcase": return {
					pattern: /^[a-z][A-Za-z]*$/,
					name: "camelCase"
				};
				default: throw new q(`Invalid style "${e}" for ${t} rule`);
			}
		});
	}
}, Bc = {
	style: "lowercase",
	ignoreForeign: !0
}, Vc = class extends K {
	style;
	constructor(e) {
		super({
			...Bc,
			...e
		}), this.style = new zc(this.options.style, "attr-case");
	}
	static schema() {
		let e = [
			"lowercase",
			"uppercase",
			"pascalcase",
			"camelcase"
		];
		return {
			ignoreForeign: { type: "boolean" },
			style: { anyOf: [{
				enum: e,
				type: "string"
			}, {
				items: {
					enum: e,
					type: "string"
				},
				type: "array"
			}] }
		};
	}
	documentation() {
		let { style: e } = this.options;
		return {
			description: Array.isArray(e) ? [
				"Attribute name must be in one of:",
				"",
				...e.map((e) => `- ${e}`)
			].join("\n") : `Attribute name must be in ${e}.`,
			url: "https://html-validate.org/rules/attr-case.html"
		};
	}
	setup() {
		this.on("attr", (e) => {
			if (this.isIgnored(e.target) || e.originalAttribute) return;
			let t = e.key.replaceAll(/[^a-z]+/gi, "");
			this.style.match(t) || this.report({
				node: e.target,
				message: `Attribute "${e.key}" should be ${this.style.name}`,
				location: e.keyLocation
			});
		});
	}
	isIgnored(e) {
		return this.options.ignoreForeign ? !!e.meta?.foreign : !1;
	}
}, J = /* @__PURE__ */ ((e) => (e[e.INITIAL = 1] = "INITIAL", e[e.DOCTYPE = 2] = "DOCTYPE", e[e.TEXT = 3] = "TEXT", e[e.TAG = 4] = "TAG", e[e.ATTR = 5] = "ATTR", e[e.CDATA = 6] = "CDATA", e[e.SCRIPT = 7] = "SCRIPT", e[e.STYLE = 8] = "STYLE", e[e.TEXTAREA = 9] = "TEXTAREA", e[e.TITLE = 10] = "TITLE", e))(J || {}), Y = /* @__PURE__ */ ((e) => (e[e.TEXT = 1] = "TEXT", e[e.SCRIPT = 2] = "SCRIPT", e[e.STYLE = 3] = "STYLE", e[e.TEXTAREA = 4] = "TEXTAREA", e[e.TITLE = 5] = "TITLE", e))(Y || {}), Hc = class {
	contentModel;
	state;
	string;
	filename;
	offset;
	line;
	column;
	constructor(e) {
		this.state = J.INITIAL, this.string = e.data, this.filename = e.filename, this.offset = e.offset, this.line = e.line, this.column = e.column, this.contentModel = 1;
	}
	getTruncatedLine(e = 13) {
		return JSON.stringify(this.string.length > e ? `${this.string.slice(0, 10)}...` : this.string);
	}
	consume(e, t) {
		let n = -1, r = 0;
		for (let t = 0; t < e; t++) this.string[t] === "\n" && (r++, n = t);
		r > 0 ? (this.line += r, this.column = e - n) : this.column += e, this.offset += e, this.string = this.string.slice(e), this.state = t;
	}
	getLocation(e) {
		return {
			filename: this.filename,
			offset: this.offset,
			line: this.line,
			column: this.column,
			size: e
		};
	}
};
function Uc(e) {
	return {
		filename: "",
		offset: 0,
		line: 1,
		column: 1,
		...e
	};
}
var X = /* @__PURE__ */ ((e) => (e[e.UNICODE_BOM = 1] = "UNICODE_BOM", e[e.WHITESPACE = 2] = "WHITESPACE", e[e.DOCTYPE_OPEN = 3] = "DOCTYPE_OPEN", e[e.DOCTYPE_VALUE = 4] = "DOCTYPE_VALUE", e[e.DOCTYPE_CLOSE = 5] = "DOCTYPE_CLOSE", e[e.TAG_OPEN = 6] = "TAG_OPEN", e[e.TAG_CLOSE = 7] = "TAG_CLOSE", e[e.ATTR_NAME = 8] = "ATTR_NAME", e[e.ATTR_VALUE = 9] = "ATTR_VALUE", e[e.TEXT = 10] = "TEXT", e[e.TEMPLATING = 11] = "TEMPLATING", e[e.SCRIPT = 12] = "SCRIPT", e[e.STYLE = 13] = "STYLE", e[e.COMMENT = 14] = "COMMENT", e[e.CONDITIONAL = 15] = "CONDITIONAL", e[e.DIRECTIVE = 16] = "DIRECTIVE", e[e.EOF = 17] = "EOF", e))(X || {}), Wc = /^\uFEFF/, Gc = /^(?:\r\n|\r|\n|[\t ]+(?:\r\n|\r|\n)?)/, Kc = /^<!(doctype)\s/i, qc = /^[^>]+/, Jc = /^>/, Yc = /^<\?xml.*?\?>\s+/, Xc = /^<(\/?)([\w:\-]+)/, Zc = /^\/?>/, Qc = /^[\s\S]*?(?=[\t ]*(?:\r\n|\r|\n)|<[^ ]|$)/, $c = /^(?:<%.*?%>|<\?.*?\?>|<\$.*?\$>)/s, el = /^[\s\S]*?(?=<|$)/, tl = /^([^\t\n\f\r "'/<=>]+)/, nl = /^(\s*=\s*)'([^']*)(')/, rl = /^(\s*=\s*)"([^"]*)(")/, il = /^(\s*=\s*)([^\t\n\f\r "'<>][^\t\n\f\r <>]*)/, al = /^<!\[CDATA\[/, ol = /^[\s\S]*?\]\]>/, sl = /^[\s\S]*?(?=<\/script)/, cl = /^<(\/)(script)/, ll = /^[\s\S]*?(?=<\/style)/, ul = /^<(\/)(style)/, dl = /^[\s\S]*?(?=<\/textarea)/, fl = /^<(\/)(textarea)/, pl = /^[\s\S]*?(?=<\/title)/, ml = /^<(\/)(title)/, hl = /^(<!--\s*\[?)(html-validate-)([\da-z-]+)(\s*)(.*?)(\]?\s*-->)/, gl = /^<!--([\s\S]*?)-->/, _l = /^<!\[([^\]]*)\]>/, vl = class extends Error {
	location;
	constructor(e, t) {
		super(t), this.name = "InvalidTokenError", this.location = e;
	}
}, yl = class {
	*tokenize(e) {
		let t = new Hc(e), n = t.state, r = t.string.length;
		for (; t.string.length > 0;) {
			switch (t.state) {
				case J.INITIAL:
					yield* this.tokenizeInitial(t);
					break;
				case J.DOCTYPE:
					yield* this.tokenizeDoctype(t);
					break;
				case J.TAG:
					yield* this.tokenizeTag(t);
					break;
				case J.ATTR:
					yield* this.tokenizeAttr(t);
					break;
				case J.TEXT:
					yield* this.tokenizeText(t);
					break;
				case J.CDATA:
					yield* this.tokenizeCDATA(t);
					break;
				case J.SCRIPT:
					yield* this.tokenizeScript(t);
					break;
				case J.STYLE:
					yield* this.tokenizeStyle(t);
					break;
				case J.TEXTAREA:
					yield* this.tokenizeTextarea(t);
					break;
				case J.TITLE:
					yield* this.tokenizeTitle(t);
					break;
				/* istanbul ignore next: sanity check: should not happen unless adding new states */
				default: this.unhandled(t);
			}
			t.state === n && t.string.length === r && this.errorStuck(t), n = t.state, r = t.string.length;
		}
		yield this.token(t, X.EOF, []);
	}
	token(e, t, n) {
		let r = n.length > 0 ? n[0].length : 0;
		return {
			type: t,
			location: e.getLocation(r),
			data: Array.from(n)
		};
	}
	/* istanbul ignore next: used to provide a better error when an unhandled state happens */
	unhandled(e) {
		let t = `failed to tokenize ${JSON.stringify(e.string.length > 13 ? `${e.string.slice(0, 15)}...` : e.string)}, unhandled state ${J[e.state]}.`;
		throw new vl(e.getLocation(1), t);
	}
	/* istanbul ignore next: used to provide a better error when lexer is detected to be stuck, no known way to reproduce */
	errorStuck(e) {
		let t = J[e.state], n = `failed to tokenize ${e.getTruncatedLine()}, state ${t} failed to consume data or change state.`;
		throw new vl(e.getLocation(1), n);
	}
	evalNextState(e, t) {
		return typeof e == "function" ? e(t) : e;
	}
	*match(e, t, n) {
		let r = t.length;
		for (let n = 0; n < r; n++) {
			let [r, i, a] = t[n], o = r ? e.string.match(r) : [""];
			if (o) {
				let t = null;
				a !== !1 && (t = this.token(e, a, o), yield t);
				let n = this.evalNextState(i, t);
				e.consume(o[0].length, n), this.enter(e, n, o);
				return;
			}
		}
		let i = `failed to tokenize ${e.getTruncatedLine()}, ${n}.`;
		throw new vl(e.getLocation(1), i);
	}
	enter(e, t, n) {
		if (t === J.TAG && n?.[0].startsWith("<")) switch (n[0]) {
			case "<script":
				e.contentModel = Y.SCRIPT;
				break;
			case "<style":
				e.contentModel = Y.STYLE;
				break;
			case "<textarea":
				e.contentModel = Y.TEXTAREA;
				break;
			case "<title":
				e.contentModel = Y.TITLE;
				break;
			default: e.contentModel = Y.TEXT;
		}
	}
	*tokenizeInitial(e) {
		yield* this.match(e, [
			[
				Wc,
				J.INITIAL,
				X.UNICODE_BOM
			],
			[
				Yc,
				J.INITIAL,
				!1
			],
			[
				Kc,
				J.DOCTYPE,
				X.DOCTYPE_OPEN
			],
			[
				Gc,
				J.INITIAL,
				X.WHITESPACE
			],
			[
				hl,
				J.INITIAL,
				X.DIRECTIVE
			],
			[
				_l,
				J.INITIAL,
				X.CONDITIONAL
			],
			[
				gl,
				J.INITIAL,
				X.COMMENT
			],
			[
				!1,
				J.TEXT,
				!1
			]
		], "expected doctype");
	}
	*tokenizeDoctype(e) {
		yield* this.match(e, [
			[
				Gc,
				J.DOCTYPE,
				X.WHITESPACE
			],
			[
				qc,
				J.DOCTYPE,
				X.DOCTYPE_VALUE
			],
			[
				Jc,
				J.TEXT,
				X.DOCTYPE_CLOSE
			]
		], "expected doctype name");
	}
	*tokenizeTag(e) {
		function t(t) {
			let n = t, r = n && !n.data[0].startsWith("/");
			switch (e.contentModel) {
				case Y.TEXT: return J.TEXT;
				case Y.SCRIPT: return r ? J.SCRIPT : J.TEXT;
				case Y.STYLE: return r ? J.STYLE : J.TEXT;
				case Y.TEXTAREA: return r ? J.TEXTAREA : J.TEXT;
				case Y.TITLE: return r ? J.TITLE : J.TEXT;
			}
		}
		yield* this.match(e, [
			[
				Zc,
				t,
				X.TAG_CLOSE
			],
			[
				tl,
				J.ATTR,
				X.ATTR_NAME
			],
			[
				Gc,
				J.TAG,
				X.WHITESPACE
			]
		], "expected attribute, \">\" or \"/>\"");
	}
	*tokenizeAttr(e) {
		yield* this.match(e, [
			[
				nl,
				J.TAG,
				X.ATTR_VALUE
			],
			[
				rl,
				J.TAG,
				X.ATTR_VALUE
			],
			[
				il,
				J.TAG,
				X.ATTR_VALUE
			],
			[
				!1,
				J.TAG,
				!1
			]
		], "expected attribute, \">\" or \"/>\"");
	}
	*tokenizeText(e) {
		yield* this.match(e, [
			[
				Gc,
				J.TEXT,
				X.WHITESPACE
			],
			[
				al,
				J.CDATA,
				!1
			],
			[
				hl,
				J.TEXT,
				X.DIRECTIVE
			],
			[
				_l,
				J.TEXT,
				X.CONDITIONAL
			],
			[
				gl,
				J.TEXT,
				X.COMMENT
			],
			[
				$c,
				J.TEXT,
				X.TEMPLATING
			],
			[
				Xc,
				J.TAG,
				X.TAG_OPEN
			],
			[
				Qc,
				J.TEXT,
				X.TEXT
			],
			[
				el,
				J.TEXT,
				X.TEXT
			]
		], "expected text or \"<\"");
	}
	*tokenizeCDATA(e) {
		yield* this.match(e, [[
			ol,
			J.TEXT,
			!1
		]], "expected ]]>");
	}
	*tokenizeScript(e) {
		yield* this.match(e, [[
			cl,
			J.TAG,
			X.TAG_OPEN
		], [
			sl,
			J.SCRIPT,
			X.SCRIPT
		]], "expected <\/script>");
	}
	*tokenizeStyle(e) {
		yield* this.match(e, [[
			ul,
			J.TAG,
			X.TAG_OPEN
		], [
			ll,
			J.STYLE,
			X.STYLE
		]], "expected </style>");
	}
	*tokenizeTextarea(e) {
		yield* this.match(e, [[
			fl,
			J.TAG,
			X.TAG_OPEN
		], [
			dl,
			J.TEXTAREA,
			X.TEXT
		]], "expected </textarea>");
	}
	*tokenizeTitle(e) {
		yield* this.match(e, [[
			ml,
			J.TAG,
			X.TAG_OPEN
		], [
			pl,
			J.TITLE,
			X.TEXT
		]], "expected </title>");
	}
}, bl = /\s+/, xl = class extends K {
	documentation() {
		return {
			description: "Attribute value must not be separated by whitespace.",
			url: "https://html-validate.org/rules/attr-delimiter.html"
		};
	}
	setup() {
		this.on("token", (e) => {
			let { token: t } = e;
			if (t.type !== X.ATTR_VALUE) return;
			let n = t.data[1];
			if (bl.exec(n)) {
				let t = U(e.location, 0, n.length);
				this.report(null, "Attribute value must not be delimited by whitespace", t);
			}
		});
	}
}, Sl = {
	pattern: "[a-z0-9-:]+",
	ignoreForeign: !0
};
function Cl(e) {
	return RegExp(Array.isArray(e) ? `^(${e.join("|")})$` : `^${e}$`, "i");
}
function wl(e, t) {
	return Array.isArray(t) ? `Attribute "${e}" should match one of [${t.map((e) => `/${e}/`).join(", ")}]` : `Attribute "${e}" should match /${t}/`;
}
function Tl(e, t) {
	return Array.isArray(t) ? [
		`Attribute "${e}" should match one of the configured regular expressions:`,
		"",
		...t.map((e) => `- \`/${e}/\``)
	].join("\n") : `Attribute "${e}" should match the regular expression \`/${t}/\``;
}
var El = class extends K {
	pattern;
	constructor(e) {
		super({
			...Sl,
			...e
		}), this.pattern = Cl(this.options.pattern);
	}
	static schema() {
		return {
			pattern: { oneOf: [{
				type: "array",
				items: { type: "string" },
				minItems: 1
			}, { type: "string" }] },
			ignoreForeign: { type: "boolean" }
		};
	}
	documentation(e) {
		return {
			description: Tl(e.attr, e.pattern),
			url: "https://html-validate.org/rules/attr-pattern.html"
		};
	}
	setup() {
		this.on("attr", (e) => {
			if (this.isIgnored(e.target) || e.originalAttribute || this.pattern.test(e.key)) return;
			let t = wl(e.key, this.options.pattern), n = {
				attr: e.key,
				pattern: this.options.pattern
			};
			this.report(e.target, t, e.keyLocation, n);
		});
	}
	isIgnored(e) {
		return this.options.ignoreForeign ? !!e.meta?.foreign : !1;
	}
}, Dl = {
	style: "auto",
	unquoted: !1
};
function Ol(e) {
	switch (e.error) {
		case "style": return `Attribute \`${e.attr}\` must use \`${e.expected}\` instead of \`${e.actual}\`.`;
		case "unquoted": return `Attribute \`${e.attr}\` must not be unquoted.`;
	}
}
function kl(e, t) {
	let n = [];
	switch (e) {
		case "auto":
			n.push("- quoted with double quotes `\"` unless the value contains double quotes in which case single quotes `'` should be used instead");
			break;
		case "any":
			n.push("- quoted with single quotes `'`"), n.push("- quoted with double quotes `\"`");
			break;
		case "'":
		case "\"": {
			let t = e === "'" ? "single" : "double";
			n.push(`- quoted with ${t} quotes \`${e}\``);
			break;
		}
	}
	return t && n.push("- unquoted (if applicable)"), `${n.join(" or\n")}
`;
}
var Al = class extends K {
	style;
	static schema() {
		return {
			style: {
				enum: [
					"auto",
					"double",
					"single",
					"any"
				],
				type: "string"
			},
			unquoted: { type: "boolean" }
		};
	}
	documentation(e) {
		let { style: t } = this, { unquoted: n } = this.options;
		return {
			description: [
				Ol(e),
				"",
				"Under the current configuration attributes must be:",
				"",
				kl(t, n)
			].join("\n"),
			url: "https://html-validate.org/rules/attr-quotes.html"
		};
	}
	constructor(e) {
		super({
			...Dl,
			...e
		}), this.style = jl(this.options.style);
	}
	setup() {
		this.on("attr", (e) => {
			if (e.originalAttribute || e.value === null) return;
			if (!e.quote) {
				if (!this.options.unquoted) {
					let t = `Attribute "${e.key}" using unquoted value`, n = {
						error: "unquoted",
						attr: e.key
					};
					this.report(e.target, t, null, n);
				}
				return;
			}
			if (this.style === "any") return;
			let t = this.resolveQuotemark(e.value.toString(), this.style);
			if (e.quote !== t) {
				let n = `Attribute "${e.key}" used ${e.quote} instead of expected ${t}`, r = {
					error: "style",
					attr: e.key,
					actual: e.quote,
					expected: t
				};
				this.report(e.target, n, null, r);
			}
		});
	}
	resolveQuotemark(e, t) {
		return t === "auto" ? e.includes("\"") ? "'" : "\"" : t;
	}
};
function jl(e) {
	switch (e.toLowerCase()) {
		case "auto": return "auto";
		case "double": return "\"";
		case "single": return "'";
		case "any": return "any";
		/* istanbul ignore next: covered by schema validation */
		default: throw new q(`Invalid style "${e}" for "attr-quotes" rule`);
	}
}
var Ml = class extends K {
	documentation() {
		return {
			description: "No space between attributes. At least one whitespace character (commonly space) must be used to separate attributes.",
			url: "https://html-validate.org/rules/attr-spacing.html"
		};
	}
	setup() {
		let e;
		this.on("token", (t) => {
			t.type === X.ATTR_NAME && e !== X.WHITESPACE && this.report(null, "No space between attributes", t.location), e = t.type;
		});
	}
};
function Nl(e) {
	let t = {};
	return e.enum !== void 0 && (t.enum = e.enum), e.boolean !== void 0 && (t.boolean = e.boolean), t;
}
var Pl = class extends K {
	documentation(e) {
		let t = {
			description: "Attribute has invalid value.",
			url: "https://html-validate.org/rules/attribute-allowed-values.html"
		}, { allowed: n, attribute: r, element: i, value: a } = e;
		if (n.enum) {
			let e = n.enum.map((e) => typeof e == "string" ? `- \`"${e}"\`` : e instanceof RegExp ? `- \`${e.toString()}\`` : `- ${e.name}`);
			t.description = [
				`The \`<${i}>\` element does not allow the attribute \`${r}\` to have the value \`"${a}"\`.`,
				"",
				"It must match one of the following:",
				"",
				...e
			].join("\n");
		} else n.boolean && (t.description = `The \`<${e.element}>\` attribute \`${e.attribute}\` must be a boolean attribute, e.g. \`<${e.element} ${e.attribute}>\``);
		return t;
	}
	setup() {
		this.on("dom:ready", (e) => {
			let t = e.document;
			vs.depthFirst(t, (e) => {
				let t = e.meta;
				if (t?.attributes) for (let n of e.attributes) {
					if (xs.validateAttribute(n, t.attributes)) continue;
					let r = n.value ? n.value.toString() : "", i = {
						element: e.tagName,
						attribute: n.key,
						value: r,
						allowed: Nl(t.attributes[n.key])
					}, a = this.getMessage(n), o = this.getLocation(n);
					this.report(e, a, o, i);
				}
			});
		});
	}
	getMessage(e) {
		let { key: t, value: n } = e;
		return n === null ? `Attribute "${t}" is missing value` : `Attribute "${t}" has invalid value "${n.toString()}"`;
	}
	getLocation(e) {
		return e.valueLocation ?? e.keyLocation;
	}
}, Fl = { style: "omit" }, Il = class extends K {
	hasInvalidStyle;
	constructor(e) {
		super({
			...Fl,
			...e
		}), this.hasInvalidStyle = Ll(this.options.style);
	}
	static schema() {
		return { style: {
			enum: [
				"empty",
				"name",
				"omit"
			],
			type: "string"
		} };
	}
	documentation() {
		return {
			description: "Require a specific style when writing boolean attributes.",
			url: "https://html-validate.org/rules/attribute-boolean-style.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let t = e.document;
			vs.depthFirst(t, (e) => {
				let t = e.meta;
				if (t?.attributes) for (let n of e.attributes) this.isBoolean(n, t.attributes) && (n.originalAttribute || this.hasInvalidStyle(n) && this.report(e, Rl(n, this.options.style), n.keyLocation));
			});
		});
	}
	isBoolean(e, t) {
		return !!t[e.key]?.boolean;
	}
};
function Ll(e) {
	switch (e.toLowerCase()) {
		case "omit": return (e) => e.value !== null;
		case "empty": return (e) => e.value !== "";
		case "name": return (e) => e.value !== e.key;
		/* istanbul ignore next: covered by schema validation */
		default: throw Error(`Invalid style "${e}" for "attribute-boolean-style" rule`);
	}
}
function Rl(e, t) {
	let n = e.key;
	switch (t.toLowerCase()) {
		case "omit": return `Attribute "${n}" should omit value`;
		case "empty": return `Attribute "${n}" value should be empty string`;
		case "name": return `Attribute "${n}" should be set to ${n}="${n}"`;
	}
	return "";
}
var zl = { style: "omit" }, Bl = class extends K {
	hasInvalidStyle;
	constructor(e) {
		super({
			...zl,
			...e
		}), this.hasInvalidStyle = Ul(this.options.style);
	}
	static schema() {
		return { style: {
			enum: ["empty", "omit"],
			type: "string"
		} };
	}
	documentation() {
		return {
			description: "Require a specific style for attributes with empty values.",
			url: "https://html-validate.org/rules/attribute-empty-style.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let t = e.document;
			vs.depthFirst(t, (e) => {
				let t = e.meta;
				if (t?.attributes) for (let n of e.attributes) Vl(n, t.attributes) && Hl(n) && this.hasInvalidStyle(n) && this.report(e, Wl(n, this.options.style), n.keyLocation);
			});
		});
	}
};
function Vl(e, t) {
	return !!t[e.key]?.omit;
}
function Hl(e) {
	return e.isDynamic ? !1 : e.value === null || e.value === "";
}
function Ul(e) {
	switch (e.toLowerCase()) {
		case "omit": return (e) => e.value !== null;
		case "empty": return (e) => e.value !== "";
		/* istanbul ignore next: covered by schema validation */
		default: throw Error(`Invalid style "${e}" for "attribute-empty-style" rule`);
	}
}
function Wl(e, t) {
	let n = e.key;
	switch (t.toLowerCase()) {
		case "omit": return `Attribute "${n}" should omit value`;
		case "empty": return `Attribute "${n}" value should be empty string`;
	}
	return "";
}
function Gl(e) {
	let { tagName: t, attr: n, details: r } = e;
	return `The \`${n}\` attribute cannot be used on \`${t}\` in this context: ${r}`;
}
var Kl = class extends K {
	documentation(e) {
		return {
			description: Gl(e),
			url: "https://html-validate.org/rules/attribute-misuse.html"
		};
	}
	setup() {
		this.on("element:ready", (e) => {
			let { target: t } = e, { meta: n } = t;
			if (n) for (let e of t.attributes) {
				let r = e.key.toLowerCase();
				this.validateAttr(t, e, n.attributes[r]);
			}
		});
	}
	validateAttr(e, t, n) {
		if (!n?.allowed) return;
		let r = n.allowed(e._adapter, t.value);
		r && this.report({
			node: e,
			message: "\"{{ attr }}\" attribute cannot be used on {{ tagName }} in this context: {{ details }}",
			location: t.keyLocation,
			context: {
				tagName: e.annotatedName,
				attr: t.key,
				details: r
			}
		});
	}
}, ql = { preferred: void 0 };
function Jl(e) {
	let { target: t } = e;
	return t.is("input") ? t.getAttribute("type")?.value?.toString().toLowerCase() === "password" : !1;
}
function Yl(e) {
	return e.startsWith("section-") || e === "shipping" || e === "billing";
}
var Xl = class extends K {
	preferred;
	constructor(e) {
		super({
			...ql,
			...e
		}), this.preferred = e.preferred?.toLowerCase();
	}
	static schema() {
		return { preferred: { type: "string" } };
	}
	documentation(e) {
		let t = "https://html-validate.org/rules/autocomplete-password.html";
		switch (e.kind) {
			case "preferred-mismatch": return {
				description: [
					`\`<input type="password">\` should use \`autocomplete="${e.preferred}"\`.`,
					"",
					`The configured preferred autocomplete value is \`"${e.preferred}"\` but the element uses \`"${e.value}"\`.`
				].join("\n"),
				url: t
			};
			default: return {
				description: [
					e.kind === "off" ? "`<input type=\"password\">` should not use `autocomplete=\"off\"`." : "`<input type=\"password\">` must have the `autocomplete` attribute.",
					"",
					"Browsers and password managers often ignore the absence of autocomplete and autofill password fields anyway, which can lead to unexpected behavior where users unknowingly submit autofilled passwords for unrelated fields.",
					"",
					"Use one of the following values:",
					"",
					"- `autocomplete=\"new-password\"` for password creation forms",
					"- `autocomplete=\"current-password\"` for login forms"
				].join("\n"),
				url: t
			};
		}
	}
	setup() {
		this.on("tag:ready", Jl, (e) => {
			let { preferred: t } = this, { target: n } = e, r = n.getAttribute("autocomplete");
			if (!r) {
				this.report({
					node: n,
					message: "<input type=\"password\"> is missing required \"autocomplete\" attribute",
					location: n.location,
					context: { kind: "missing" }
				});
				return;
			}
			if (r.isDynamic || !r.value) return;
			let i = new G(r.value.toString().toLowerCase(), r.valueLocation), a = i.findIndex((e) => !Yl(e)), o = i.item(a);
			if (!o) return;
			let s = i.location(a);
			if (o === "off") {
				this.report({
					node: n,
					message: "<input type=\"password\"> should not use autocomplete=\"off\"",
					location: s,
					context: { kind: "off" }
				});
				return;
			}
			if (t && o !== t) {
				let e = {
					kind: "preferred-mismatch",
					value: o,
					preferred: t
				};
				this.report({
					node: n,
					message: `<input type="password"> should use autocomplete="${t}"`,
					location: s,
					context: e
				});
			}
		});
	}
}, Zl = /* @__PURE__ */ new Set([
	"kebabcase",
	"camelcase",
	"underscore",
	"snakecase",
	"bem",
	"tailwind"
]);
function Ql(e) {
	return typeof e == "string" && Zl.has(e);
}
function $l(e) {
	if (e instanceof RegExp) return {
		regexp: e,
		description: e.toString()
	};
	switch (e) {
		case "kebabcase": return {
			regexp: /^[a-z][\da-z]*(?:-[\da-z]+)*$/,
			description: e
		};
		case "camelcase": return {
			regexp: /^[a-z][\dA-Za-z]*$/,
			description: e
		};
		case "snakecase":
		case "underscore": return {
			regexp: /^[a-z][\da-z]*(?:_[\da-z]+)*$/,
			description: e
		};
		case "bem": return {
			regexp: /* @__PURE__ */ RegExp("^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*){0,2}$"),
			description: e
		};
		case "tailwind": return {
			regexp: /^!?(?:[[a-z-]|\d+xl:)[\w!#%&'(),./:=>[\\\]-]*$/,
			description: "tailwind"
		};
		default:
			if (e.startsWith("/") && e.endsWith("/")) {
				let t = e.slice(1, -1), n = new RegExp(t);
				return {
					regexp: n,
					description: n.toString()
				};
			}
			throw Error(`Custom pattern "${e}" must be wrapped in forward slashes, i.e. "/${e}/"`);
	}
}
function eu(e) {
	return Array.isArray(e) ? e : [e];
}
function tu(e, t, n) {
	let r = e.filter(Ql).filter((e) => !t.has(e));
	if (r.length > 0) {
		let e = (e) => `"${e}"`, i = O(r.map(e), "and"), a = O(Array.from(t, e), "and");
		throw Error(`Pattern ${i} cannot be used with "${n}". Allowed patterns: ${a}`);
	}
}
var nu = class extends K {
	attr;
	patterns;
	constructor({ ruleId: e, attr: t, options: n, allowedPatterns: r }) {
		super(n);
		let { pattern: i } = this.options;
		this.attr = t;
		let a = eu(i);
		tu(a, r, e), this.patterns = a.map((e) => $l(e));
	}
	static schema() {
		return { pattern: { anyOf: [
			{
				type: "array",
				items: { anyOf: [{ type: "string" }, { regexp: !0 }] },
				minItems: 1
			},
			{ type: "string" },
			{ regexp: !0 }
		] } };
	}
	description(e) {
		let { attr: t, patterns: n } = this, { value: r } = e;
		return [
			n.length === 1 ? `The \`${t}\` attribute value \`"${r}"\` does not match the configured pattern.` : `The \`${t}\` attribute value \`"${r}"\` does not match either of the configured patterns.`,
			"For consistency within the codebase the `${attr}` is required to match one or more of the following patterns:",
			"",
			...n.map((e) => `- \`${e.description}\``)
		].join("\n");
	}
	validateValue(e, t, n) {
		let { attr: r, patterns: i } = this;
		if (i.some((e) => e.regexp.test(t))) return;
		let a = O(i.map((e) => `"${e.description}"`)), o = i.length === 1 ? `${r} "${t}" does not match the configured pattern ${a}` : `${r} "${t}" does not match either of the configured patterns: ${a}`;
		this.report({
			node: e,
			message: o,
			location: n,
			context: { value: t }
		});
	}
}, ru = { pattern: "kebabcase" }, iu = class extends nu {
	constructor(e) {
		super({
			ruleId: "class-pattern",
			attr: "class",
			options: {
				...ru,
				...e
			},
			allowedPatterns: Zl
		});
	}
	static schema() {
		return super.schema();
	}
	documentation(e) {
		return {
			description: this.description(e),
			url: "https://html-validate.org/rules/class-pattern.html"
		};
	}
	setup() {
		this.on("attr", (e) => {
			let { target: t, key: n, value: r, valueLocation: i } = e;
			if (n.toLowerCase() !== "class") return;
			let a = new G(r, i);
			for (let { item: e, location: n } of a.iterator()) this.validateValue(t, e, n);
		});
	}
}, au = class extends K {
	documentation() {
		return {
			description: "HTML disallows end tags to have attributes.",
			url: "https://html-validate.org/rules/close-attr.html"
		};
	}
	setup() {
		this.on("tag:end", (e) => {
			if (!e.target || e.previous === e.target) return;
			let t = e.target;
			if (Object.keys(t.attributes).length > 0) {
				let e = t.attributes[0];
				this.report(null, "Close tags cannot have attributes", e.keyLocation);
			}
		});
	}
};
function* ou(e) {
	if (!e) return;
	let t = e;
	for (; t && !t.isRootElement();) yield t, t = t.parent;
	t && (yield t);
}
function su(e, t) {
	for (let n of ou(e)) if (t(n)) return n;
	return null;
}
var cu = class extends K {
	documentation() {
		return {
			description: "HTML requires elements to be closed in the same order as they were opened.",
			url: "https://html-validate.org/rules/close-order.html"
		};
	}
	setup() {
		let e;
		this.on("parse:begin", () => {
			e = /* @__PURE__ */ new Set();
		}), this.on("tag:end", (t) => {
			if (t.target) return;
			let n = t.previous;
			for (let t of ou(n)) t.isRootElement() || e.has(t.unique) || (this.report(t, `Unclosed element '<${t.tagName}>'`, t.location), e.add(t.unique));
		}), this.on("tag:end", (t) => {
			let n = t.target;
			if (!n || n.voidElement) return;
			let r = t.previous;
			if (r.closed === W.CLOSED_IMPLICIT_CLOSED) return;
			if (r.isRootElement()) {
				let e = {
					filename: n.location.filename,
					line: n.location.line,
					column: n.location.column,
					offset: n.location.offset,
					size: n.tagName.length + 1
				};
				this.report(null, `Stray end tag '</${n.tagName}>'`, e);
				return;
			}
			if (n.tagName === r.tagName) return;
			let i = su(r.parent, (e) => e.is(n.tagName));
			if (i && !i.isRootElement()) {
				for (let t of ou(r)) {
					if (i.isSameNode(t)) break;
					e.has(t.unique) || (this.report(t, `Unclosed element '<${t.tagName}>'`, t.location), e.add(t.unique));
				}
				this.report(null, `End tag '</${n.tagName}>' seen but there were open elements`, n.location), e.add(i.unique);
			} else this.report(null, `Stray end tag '</${n.tagName}>'`, n.location);
		});
	}
}, lu = {
	include: null,
	exclude: null
}, uu = class extends K {
	constructor(e) {
		super({
			...lu,
			...e
		});
	}
	static schema() {
		return {
			exclude: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "null" }] },
			include: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "null" }] }
		};
	}
	documentation(e) {
		let t = [];
		if (e.source) {
			let n = `The \`<$tagname>\` element is deprecated ${du(e.source)} and should not be used in new code.`;
			t.push(n);
		} else t.push("The `<$tagname>` element is deprecated and should not be used in new code.");
		return e.documentation && t.push(e.documentation), {
			description: t.map((t) => t.replaceAll("$tagname", () => e.tagName)).join("\n\n"),
			url: "https://html-validate.org/rules/deprecated.html"
		};
	}
	setup() {
		this.on("tag:start", (e) => {
			let t = e.target;
			if (t.meta === null) return;
			let n = t.meta.deprecated;
			if (!n || this.isKeywordIgnored(t.tagName)) return;
			let r = U(e.location, 1);
			typeof n == "string" ? this.reportString(n, t, r) : typeof n == "boolean" ? this.reportBoolean(t, r) : this.reportObject(n, t, r);
		});
	}
	reportString(e, t, n) {
		let r = { tagName: t.tagName }, i = `<${t.tagName}> is deprecated: ${e}`;
		this.report(t, i, n, r);
	}
	reportBoolean(e, t) {
		let n = { tagName: e.tagName }, r = `<${e.tagName}> is deprecated`;
		this.report(e, r, t, n);
	}
	reportObject(e, t, n) {
		let r = {
			...e,
			tagName: t.tagName
		}, i = e.message ? `: ${e.message}` : "", a = `<${t.tagName}> is deprecated${i}`;
		this.report(t, a, n, r);
	}
};
function du(e) {
	let t = /html(\d)(\d)?/.exec(e);
	if (t) {
		let [, ...e] = t;
		return `in HTML ${e.filter(Boolean).join(".")}`;
	}
	switch (e) {
		case "whatwg": return "in HTML Living Standard";
		case "non-standard": return "and non-standard";
		default: return `by ${e}`;
	}
}
function fu(e, t = "\"") {
	return `${t}${e}${t}`;
}
var pu = { classes: [] };
function mu(e) {
	return e.key.toLowerCase() === "class";
}
function hu(e) {
	let { class: t, message: n, replacement: r = [], url: i } = e;
	return {
		class: t,
		message: n,
		replacement: Array.isArray(r) ? r : [r],
		url: i
	};
}
function gu(e, t) {
	let n = `class "${e}" is deprecated`;
	if (t.replacement.length > 0) {
		let e = O(t.replacement.map((e) => fu(e)), "or");
		n += ` and replaced with ${e}`;
	}
	return t.message && (n += `: ${t.message}`), n;
}
function _u(e) {
	let t = [], n = `The class \`${e.class}\` is deprecated and should not be used`;
	if (e.message ? n += `: ${e.message}.` : n += ".", t.push(n), e.replacement.length === 1) t.push(`Use the replacement class ${fu(e.replacement[0], "`")} instead.`);
	else if (e.replacement.length > 1) {
		let n = e.replacement.map((e) => `- ${fu(e, "`")}`);
		t.push(`Use one of the following replacement classes instead:
${n.join("\n")}`);
	}
	return e.url && t.push(`For details see: ${e.url}`), t.join("\n\n");
}
var vu = class extends K {
	deprecatedMap;
	constructor(e) {
		super({
			...pu,
			...e
		});
		let { classes: t } = this.options;
		this.deprecatedMap = new Map(t.map((e) => [e.class, hu(e)]));
	}
	static schema() {
		return { classes: {
			type: "array",
			items: {
				type: "object",
				properties: {
					class: { type: "string" },
					message: { type: "string" },
					replacement: { anyOf: [{ type: "string" }, {
						type: "array",
						items: { type: "string" }
					}] },
					url: { type: "string" }
				},
				required: ["class"],
				additionalProperties: !1
			}
		} };
	}
	documentation(e) {
		return {
			description: _u(e),
			url: "https://html-validate.org/rules/deprecated-class.html"
		};
	}
	setup() {
		this.on("attr", mu, (e) => {
			let { value: t, valueLocation: n, target: r } = e, i = new G(t, n);
			for (let { item: e, location: t } of i.iterator()) {
				let n = this.deprecatedMap.get(e);
				if (!n) continue;
				let i = gu(e, n), a = {
					class: e,
					message: n.message ?? null,
					replacement: n.replacement,
					url: n.url ?? null
				};
				this.report({
					node: r,
					message: i,
					location: t,
					context: a
				});
			}
		});
	}
}, yu = class extends K {
	documentation(e) {
		return {
			description: `${e ? `The rule "${e}"` : "This rule"} is deprecated and should not be used any longer, consult documentation for further information.`,
			url: "https://html-validate.org/rules/deprecated-rule.html"
		};
	}
	setup() {
		this.on("config:ready", (e) => {
			for (let t of this.getDeprecatedRules(e)) t.getSeverity() > ws.DISABLED && this.report(null, `Usage of deprecated rule "${t.name}"`, null, t.name);
		});
	}
	getDeprecatedRules(e) {
		return Object.values(e.rules).filter((e) => e.deprecated);
	}
}, bu = class extends K {
	documentation() {
		return {
			description: [
				"HTML5 documents should use the \"html\" doctype (short `form`, not legacy string):",
				"",
				"```html",
				"<!DOCTYPE html>",
				"```"
			].join("\n"),
			url: "https://html-validate.org/rules/doctype-html.html"
		};
	}
	setup() {
		this.on("doctype", (e) => {
			e.value.toLowerCase() !== "html" && this.report(null, "doctype should be \"html\"", e.valueLocation);
		});
	}
}, xu = { style: "uppercase" }, Su = class extends K {
	constructor(e) {
		super({
			...xu,
			...e
		});
	}
	static schema() {
		return { style: {
			enum: ["lowercase", "uppercase"],
			type: "string"
		} };
	}
	documentation(e) {
		return {
			description: `While DOCTYPE is case-insensitive in the standard the current configuration requires it to be ${e.style}`,
			url: "https://html-validate.org/rules/doctype-style.html"
		};
	}
	setup() {
		this.on("doctype", (e) => {
			this.options.style === "uppercase" && e.tag !== "DOCTYPE" && this.report(null, "DOCTYPE should be uppercase", e.location, this.options), this.options.style === "lowercase" && e.tag !== "doctype" && this.report(null, "DOCTYPE should be lowercase", e.location, this.options);
		});
	}
}, Cu = { style: "lowercase" }, wu = class extends K {
	style;
	constructor(e) {
		super({
			...Cu,
			...e
		}), this.style = new zc(this.options.style, "element-case");
	}
	static schema() {
		let e = [
			"lowercase",
			"uppercase",
			"pascalcase",
			"camelcase"
		];
		return { style: { anyOf: [{
			enum: e,
			type: "string"
		}, {
			items: {
				enum: e,
				type: "string"
			},
			type: "array"
		}] } };
	}
	documentation() {
		let { style: e } = this.options;
		return {
			description: Array.isArray(e) ? [
				"Element tagname must be in one of:",
				"",
				...e.map((e) => `- ${e}`)
			].join("\n") : `Element tagname must be in ${e}.`,
			url: "https://html-validate.org/rules/element-case.html"
		};
	}
	setup() {
		this.on("tag:start", (e) => {
			let { target: t, location: n } = e;
			this.validateCase(t, n);
		}), this.on("tag:end", (e) => {
			let { target: t, previous: n } = e;
			this.validateMatchingCase(n, t);
		});
	}
	validateCase(e, t) {
		let n = e.tagName.replaceAll(/[^a-z]+/gi, "");
		if (!this.style.match(n)) {
			let n = U(t, 1);
			this.report(e, `Element "${e.tagName}" should be ${this.style.name}`, n);
		}
	}
	validateMatchingCase(e, t) {
		!e || !t || !e.tagName || !t.tagName || e.tagName.toLowerCase() === t.tagName.toLowerCase() && e.tagName !== t.tagName && this.report(e, "Start and end tag must not differ in casing", t.location);
	}
}, Tu = {
	pattern: "^[a-z][a-z0-9\\-._]*-[a-z0-9\\-._]*$",
	whitelist: [],
	blacklist: []
}, Eu = class extends K {
	pattern;
	constructor(e) {
		super({
			...Tu,
			...e
		}), this.pattern = new RegExp(this.options.pattern);
	}
	static schema() {
		return {
			blacklist: {
				items: { type: "string" },
				type: "array"
			},
			pattern: { type: "string" },
			whitelist: {
				items: { type: "string" },
				type: "array"
			}
		};
	}
	documentation(e) {
		return {
			description: this.documentationMessages(e).join("\n"),
			url: "https://html-validate.org/rules/element-name.html"
		};
	}
	documentationMessages(e) {
		return e.blacklist.includes(e.tagName) ? [
			`<${e.tagName}> is blacklisted by the project configuration.`,
			"",
			"The following names are blacklisted:",
			...e.blacklist.map((e) => `- ${e}`)
		] : e.pattern === Tu.pattern ? [
			`<${e.tagName}> is not a valid element name. If this is a custom element HTML requires the name to follow these rules:`,
			"",
			"- The name must begin with `a-z`",
			"- The name must include a hyphen `-`",
			"- It may include alphanumerical characters `a-z0-9` or hyphens `-`, dots `.` or underscores `_`."
		] : [
			`<${e.tagName}> is not a valid element name. This project is configured to only allow names matching the following regular expression:`,
			"",
			`- \`${e.pattern}\``
		];
	}
	setup() {
		let e = /^[^:]+:.+$/;
		this.on("tag:start", (t) => {
			let n = t.target, r = n.tagName, i = U(t.location, 1), a = {
				tagName: r,
				pattern: this.options.pattern,
				blacklist: this.options.blacklist
			};
			this.options.blacklist.includes(r) && this.report(n, `<${r}> element is blacklisted`, i, a), !n.meta && (e.test(r) || this.options.whitelist.includes(r) || this.pattern.test(r) || this.report(n, `<${r}> is not a valid element name`, i, a));
		});
	}
};
function Du(e) {
	let { tagName: t, meta: n } = e;
	return n ? !!(t === "template" && n.templateRoot && n.scriptSupporting) : !1;
}
function Ou(e, t) {
	return typeof t == "boolean" ? e.childElements : e.childElements.filter((e) => t.some((t) => xs.validatePermittedCategory(e, t, !1)));
}
function ku(e) {
	switch (e.kind) {
		case "content": return [`The \`${e.child}\` element is not permitted as content under the parent \`${e.parent}\` element.`];
		case "descendant": return [`The \`${e.child}\` element is not permitted as a descendant of the \`${e.ancestor}\` element.`];
	}
}
var Au = class extends K {
	documentation(e) {
		return {
			description: ku(e).join("\n"),
			url: "https://html-validate.org/rules/element-permitted-content.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let t = e.document;
			vs.depthFirst(t, (e) => {
				let t = e.parent;
				t && [() => this.validatePermittedContent(e, t), () => this.validatePermittedDescendant(e, t)].some((e) => e());
			});
		});
	}
	validatePermittedContent(e, t) {
		if (!t.meta) return !1;
		let n = t.meta.permittedContent ?? null;
		return this.validatePermittedContentImpl(e, t, n);
	}
	validatePermittedContentImpl(e, t, n) {
		if (!xs.validatePermitted(e, n)) {
			let n = `<${e.tagName}>`, r = `${n} element is not permitted as content under ${t.annotatedName}`, i = {
				kind: "content",
				parent: t.annotatedName,
				child: n
			};
			return this.report(e, r, null, i), !0;
		}
		return e.meta?.transparent ? Ou(e, e.meta.transparent).map((e) => this.validatePermittedContentImpl(e, t, n)).some(Boolean) : !1;
	}
	validatePermittedDescendant(e, t) {
		for (let n = t; n && !n.isRootElement() && !Du(n); n = n.parent ?? null) {
			let t = n.meta;
			if (!t) continue;
			let r = t.permittedDescendants;
			if (!r || xs.validatePermitted(e, r)) continue;
			let i = `<${e.tagName}>`, a = n.annotatedName, o = `${i} element is not permitted as a descendant of ${a}`, s = {
				kind: "descendant",
				ancestor: a,
				child: i
			};
			return this.report(e, o, null, s), !0;
		}
		return !1;
	}
}, ju = class extends K {
	documentation() {
		return {
			description: "Some elements may only be used a fixed amount of times in given context.",
			url: "https://html-validate.org/rules/element-permitted-occurrences.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let t = e.document;
			vs.depthFirst(t, (e) => {
				if (!e.meta) return;
				let t = e.meta.permittedContent;
				t && xs.validateOccurrences(e.childElements, t, (t, n) => {
					this.report(t, `Element <${n}> can only appear once under ${e.annotatedName}`);
				});
			});
		});
	}
}, Mu = class extends K {
	documentation() {
		return {
			description: "Some elements has a specific order the children must use.",
			url: "https://html-validate.org/rules/element-permitted-order.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let t = e.document;
			vs.depthFirst(t, (e) => {
				if (!e.meta) return;
				let t = e.meta.permittedOrder;
				t && xs.validateOrder(e.childElements, t, (e, t) => {
					this.report(e, `Element <${e.tagName}> must be used before <${t.tagName}> in this context`);
				});
			});
		});
	}
};
function Nu(e) {
	return typeof e == "string";
}
function Pu(e) {
	return e.startsWith("@");
}
function Fu(e) {
	return Pu(e) ? e.slice(1) : `<${e}>`;
}
function Iu(e) {
	return e.length > 0 && e.every(Nu);
}
function Lu(e) {
	let { child: t, parent: n, rules: r } = e, i = `The \`${t}\` element cannot have a \`${n}\` element as parent.`;
	return Iu(r) ? [
		i,
		"",
		"Allowed parents one of:",
		"",
		...r.filter(Nu).map((e) => Pu(e) ? `- any ${e.slice(1)} element` : `- \`<${e}>\``)
	] : [i];
}
function Ru(e, t, n) {
	let r = e.annotatedName, i = t.annotatedName;
	return Iu(n) ? `${r} element requires a ${O(n.filter(Nu).map(Fu))} element as parent` : `${r} element cannot have ${i} element as parent`;
}
var zu = class extends K {
	documentation(e) {
		return {
			description: Lu(e).join("\n"),
			url: "https://html-validate.org/rules/element-permitted-parent.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let t = e.document;
			vs.depthFirst(t, (e) => {
				let t = e.parent;
				if (!t || t.isRootElement() || t.tagName === e.tagName) return;
				let n = e.meta?.permittedParent;
				if (!n || xs.validatePermitted(t, n)) return;
				let r = Ru(e, t, n), i = {
					parent: t.annotatedName,
					child: e.annotatedName,
					rules: n
				};
				this.report(e, r, null, i);
			});
		});
	}
};
function Bu(e) {
	return /^[\dA-Z-]+$/i.test(e);
}
function Vu(e) {
	let t = e.ancestor.map((e) => `\`${e}\``);
	return [`The \`${e.child}\` element requires a ${O(t)} ancestor.`];
}
var Hu = class extends K {
	documentation(e) {
		return {
			description: Vu(e).join("\n"),
			url: "https://html-validate.org/rules/element-required-ancestor.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let t = e.document;
			vs.depthFirst(t, (e) => {
				e.parent && this.validateRequiredAncestors(e);
			});
		});
	}
	validateRequiredAncestors(e) {
		if (!e.meta) return;
		let t = e.meta.requiredAncestors;
		if (!t || xs.validateAncestors(e, t)) return;
		let n = t.map((e) => Bu(e) ? `<${e}>` : `"${e}"`), r = `<${e.tagName}>`, i = `<${e.tagName}> element requires a ${O(n)} ancestor`, a = {
			ancestor: n,
			child: r
		};
		this.report(e, i, null, a);
	}
}, Uu = "{{ tagName }} is missing required \"{{ attr }}\" attribute";
function Wu(e, t) {
	let { required: n } = t;
	if (typeof n == "function") {
		let t = n(e._adapter);
		switch (t) {
			case void 0:
			case null:
			case !1:
			case "": return !1;
			case !0: return Uu;
			default: return t;
		}
	}
	return n ? Uu : !1;
}
var Gu = class extends K {
	documentation(e) {
		return {
			description: `The \`${e.tagName}\` element is required to have a \`${e.attr}\` attribute.`,
			url: "https://html-validate.org/rules/element-required-attributes.html"
		};
	}
	setup() {
		this.on("tag:end", (e) => {
			let t = e.previous, n = t.meta;
			if (n?.attributes) for (let [e, r] of Object.entries(n.attributes)) {
				let n = Wu(t, r);
				n && this.validateRequiredAttribute(t, e, n);
			}
		});
	}
	validateRequiredAttribute(e, t, n) {
		if (e.hasAttribute(t)) return;
		let r = {
			tagName: e.annotatedName,
			attr: t
		};
		this.report({
			node: e,
			message: n,
			location: e.location,
			context: r
		});
	}
};
function Ku(e) {
	return e.startsWith("@");
}
var qu = class extends K {
	documentation(e) {
		let { element: t, missing: n } = e;
		return {
			description: `The \`${t}\` element requires a \`${n}\` to be present as content.`,
			url: "https://html-validate.org/rules/element-required-content.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let t = e.document;
			vs.depthFirst(t, (e) => {
				if (!e.meta) return;
				let t = e.meta.requiredContent;
				if (t) for (let n of xs.validateRequiredContent(e, t)) {
					let t = {
						element: e.annotatedName,
						missing: `<${n}>`
					}, r = Ku(n) ? `${n.slice(1)} element` : `<${n}>`, i = `${e.annotatedName} element must have ${r} as content`;
					this.report(e, i, null, t);
				}
			});
		});
	}
}, Ju = [
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6"
].join(",");
function Yu(e) {
	return e.is("img") ? pc(e) : e.is("svg") ? e.textContent.trim() !== "" : !1;
}
var Xu = class extends K {
	documentation() {
		return {
			description: "Assistive technology such as screen readers require textual content in headings. Whitespace only is considered empty.",
			url: "https://html-validate.org/rules/empty-heading.html"
		};
	}
	setup() {
		this.on("dom:ready", ({ document: e }) => {
			let t = e.querySelectorAll(Ju);
			for (let e of t) this.validateHeading(e);
		});
	}
	validateHeading(e) {
		let t = e.querySelectorAll("img, svg");
		for (let e of t) if (Yu(e)) return;
		switch (dc(e, { ignoreHiddenRoot: !0 })) {
			case cc.DYNAMIC_TEXT:
			case cc.STATIC_TEXT: break;
			case cc.EMPTY_TEXT:
				this.report(e, `<${e.tagName}> cannot be empty, must have text content`);
				break;
		}
	}
}, Zu = class extends K {
	documentation() {
		return {
			description: [
				"The `<title>` element cannot be empty, it must have textual content.",
				"",
				"It is used to describe the document and is shown in the browser tab and titlebar.",
				"WCAG and SEO requires a descriptive title and preferably unique within the site.",
				"",
				"Whitespace is ignored."
			].join("\n"),
			url: "https://html-validate.org/rules/empty-title.html"
		};
	}
	setup() {
		this.on("tag:end", (e) => {
			let t = e.previous;
			if (t.tagName === "title") switch (dc(t)) {
				case cc.DYNAMIC_TEXT:
				case cc.STATIC_TEXT: break;
				case cc.EMPTY_TEXT: {
					let e = `<${t.tagName}> cannot be empty, must have text content`;
					this.report(t, e, t.location);
					break;
				}
			}
		});
	}
}, Qu = {
	allowArrayBrackets: !0,
	allowCheckboxDefault: !0,
	shared: [
		"radio",
		"button",
		"reset",
		"submit"
	]
}, $u = /* @__PURE__ */ Symbol("form-elements-unique"), ed = /* @__PURE__ */ Symbol("form-elements-shared");
function td(e) {
	return !(Zs(e) || $s(e) || Ns(e));
}
function nd(e) {
	return typeof e == "string" && e !== "";
}
function rd(e, t) {
	let n = od(e);
	return t.includes(n);
}
function id(e) {
	return e.is("input") && e.getAttributeValue("type") === "hidden";
}
function ad(e) {
	return e.is("input") && e.getAttributeValue("type") === "checkbox";
}
function od(e) {
	let t = e.getAttributeValue("type") ?? "";
	return e.is("button") && t === "" ? "submit" : t;
}
function sd(e, t, n) {
	let { allowCheckboxDefault: r } = n;
	return !(!r || !t.potentialHiddenDefault || !ad(e));
}
function cd(e) {
	let t = "Each form control must have a unique name.", { name: n } = e;
	switch (e.kind) {
		case "duplicate": return [`Duplicate form control name "${n}"`, t].join("\n");
		case "mix": return ["Form control name cannot mix regular name \"{{ name }}\" with array brackets \"{{ name }}[]\"", t].join("\n");
	}
}
var ld = class extends K {
	constructor(e) {
		super({
			...Qu,
			...e
		});
	}
	static schema() {
		return {
			allowArrayBrackets: { type: "boolean" },
			allowCheckboxDefault: { type: "boolean" },
			shared: {
				type: "array",
				items: { enum: [
					"radio",
					"checkbox",
					"submit",
					"button",
					"reset"
				] }
			}
		};
	}
	documentation(e) {
		return {
			description: cd(e),
			url: "https://html-validate.org/rules/form-dup-name.html"
		};
	}
	setup() {
		let e = this.getSelector(), { shared: t } = this.options;
		this.on("dom:ready", (n) => {
			let { document: r } = n, [i, a] = hc(r.querySelectorAll(e).filter(td), (e) => rd(e, t));
			for (let e of a) {
				let t = e.getAttribute("name"), n = t?.value;
				if (!t || !nd(n)) continue;
				let i = e.closest("form, template") ?? r.root;
				this.validateUniqueName(e, i, t, n);
			}
			for (let e of i) {
				let t = e.getAttribute("name"), n = t?.value;
				if (!t || !nd(n)) continue;
				let i = e.closest("form, template") ?? r.root;
				this.validateSharedName(e, i, t, n);
			}
		});
	}
	validateUniqueName(e, t, n, r) {
		let i = this.getUniqueElements(t), { allowArrayBrackets: a } = this.options;
		if (a) {
			let t = r.endsWith("[]"), a = t ? r.slice(0, -2) : r, o = i.get(a);
			if (o && o.array !== t) {
				let t = {
					name: a,
					kind: "mix"
				};
				this.report({
					node: e,
					location: n.valueLocation,
					message: "Cannot mix \"{{ name }}[]\" and \"{{ name }}\"",
					context: t
				});
				return;
			}
			if (!o && t && i.set(a, {
				array: !0,
				potentialHiddenDefault: !1
			}), t) return;
		}
		let o = i.get(r);
		if (o) {
			if (sd(e, o, this.options)) {
				o.potentialHiddenDefault = !1;
				return;
			}
			let t = {
				name: r,
				kind: "duplicate"
			};
			this.report({
				node: e,
				location: n.valueLocation,
				message: "Duplicate form control name \"{{ name }}\"",
				context: t
			});
		} else i.set(r, {
			array: !1,
			potentialHiddenDefault: id(e)
		});
	}
	validateSharedName(e, t, n, r) {
		let i = this.getUniqueElements(t), a = this.getSharedElements(t), o = od(e);
		if (i.has(r) || a.has(r) && a.get(r) !== o) {
			let t = {
				name: r,
				kind: "duplicate"
			};
			this.report({
				node: e,
				location: n.valueLocation,
				message: "Duplicate form control name \"{{ name }}\"",
				context: t
			});
		}
		a.set(r, o);
	}
	getSelector() {
		return this.getTagsWithProperty("formAssociated").filter((e) => this.isListedElement(e)).join(", ");
	}
	isListedElement(e) {
		let t = this.getMetaFor(e);
		return t?.formAssociated ? t.formAssociated.listed : !1;
	}
	getUniqueElements(e) {
		let t = e.cacheGet($u);
		if (t) return t;
		let n = /* @__PURE__ */ new Map();
		return e.cacheSet($u, n), n;
	}
	getSharedElements(e) {
		let t = e.cacheGet(ed);
		if (t) return t;
		let n = /* @__PURE__ */ new Map();
		return e.cacheSet(ed, n), n;
	}
}, ud = {
	allowMultipleH1: !1,
	minInitialRank: "h1",
	sectioningRoots: [
		"dialog",
		"[role=\"dialog\"]",
		"[role=\"alertdialog\"]"
	]
};
function dd(e) {
	return !!e.target.meta?.heading;
}
function fd(e) {
	let t = /^H(\d)$/i.exec(e.tagName);
	return t ? Math.trunc(Number(t[1])) : null;
}
function pd(e) {
	if (e === !1 || e === "any") return 6;
	let t = /^h(\d)$/.exec(e);
	return t ? Math.trunc(Number(t[1])) : 1;
}
var md = class extends K {
	minInitialRank;
	sectionRoots;
	stack = [];
	constructor(e) {
		super({
			...ud,
			...e
		}), this.minInitialRank = pd(this.options.minInitialRank), this.sectionRoots = this.options.sectioningRoots.map((e) => new Vo(e)), this.stack.push({
			node: null,
			current: 0,
			h1Count: 0
		});
	}
	static schema() {
		return {
			allowMultipleH1: { type: "boolean" },
			minInitialRank: { enum: [
				"h1",
				"h2",
				"h3",
				"h4",
				"h5",
				"h6",
				"any",
				!1
			] },
			sectioningRoots: {
				items: { type: "string" },
				type: "array"
			}
		};
	}
	documentation() {
		let e = [], t = this.minInitialRank > 1 ? "should" : "must";
		return e.push(`Headings ${t} start at <h1> and can only increase one level at a time.`), e.push("The headings should form a table of contents and make sense on its own."), this.options.allowMultipleH1 || (e.push(""), e.push("Under the current configuration only a single <h1> can be present at a time in the document.")), {
			description: e.join("\n"),
			url: "https://html-validate.org/rules/heading-level.html"
		};
	}
	setup() {
		this.on("tag:start", dd, (e) => {
			this.onTagStart(e);
		}), this.on("tag:ready", (e) => {
			this.onTagReady(e);
		}), this.on("tag:end", (e) => {
			this.onTagClose(e);
		});
	}
	onTagStart(e) {
		let t = fd(e.target);
		if (!t) return;
		let n = this.getCurrentRoot();
		if (!this.options.allowMultipleH1 && t === 1) {
			if (n.h1Count >= 1) {
				let t = U(e.location, 1);
				this.report(e.target, "Multiple <h1> are not allowed", t);
				return;
			}
			n.h1Count++;
		}
		if (t <= n.current) {
			n.current = t;
			return;
		}
		this.checkLevelIncrementation(n, e, t), n.current = t;
	}
	checkLevelIncrementation(e, t, n) {
		let r = e.current + 1;
		if (n === r || this.stack.length === 1 && r === 1 && n <= this.minInitialRank) return;
		let i = U(t.location, 1);
		if (e.current > 0) {
			let e = `Heading level can only increase by one, expected ${`<h${String(r)}>`} but got ${`<h${String(n)}>`}`;
			this.report(t.target, e, i);
		} else this.checkInitialLevel(t, i, n, r);
	}
	checkInitialLevel(e, t, n, r) {
		let i = `<h${String(r)}>`, a = `<h${String(n)}>`;
		if (this.stack.length === 1) {
			let n = this.minInitialRank > 1 ? `Initial heading level must be <h${String(this.minInitialRank)}> or higher rank but got ${a}` : `Initial heading level must be ${i} but got ${a}`;
			this.report(e.target, n, t);
		} else {
			let o = this.getPrevRoot().current + 1;
			if (n > o) if (r === o) {
				let n = `Initial heading level for sectioning root must be ${i} but got ${a}`;
				this.report(e.target, n, t);
			} else {
				let n = `Initial heading level for sectioning root must be between ${i} and <h${String(o)}> but got ${a}`;
				this.report(e.target, n, t);
			}
		}
	}
	onTagReady(e) {
		let { target: t } = e;
		this.isSectioningRoot(t) && this.stack.push({
			node: t.unique,
			current: 0,
			h1Count: 0
		});
	}
	onTagClose(e) {
		let { previous: t } = e, n = this.getCurrentRoot();
		t.unique === n.node && this.stack.pop();
	}
	getPrevRoot() {
		return this.stack.at(-2);
	}
	getCurrentRoot() {
		return this.stack.at(-1);
	}
	isSectioningRoot(e) {
		let t = { scope: e };
		return this.sectionRoots.some((n) => n.match(e, t));
	}
}, hd = Symbol(vd.name);
function gd(e, t) {
	return t.formAssociated?.disablable ? !!(e.matches("[disabled]") || e.closest("fieldset[disabled]")) : !1;
}
function _d(e) {
	if (Zs(e) || $s(e) || tc(e)) return !1;
	let { tabIndex: t, meta: n } = e;
	return t === null ? !n || gd(e, n) ? !1 : !!n.focusable : t >= 0;
}
function vd(e) {
	return e.cacheGet(hd) || e.cacheSet(hd, _d(e));
}
var yd = class extends K {
	documentation(e) {
		return {
			description: [
				`\`aria-hidden\` cannot be used on focusable elements.${e === "parent" ? " In this case it is being hidden by an ancestor with `aria-hidden.`" : ""}`,
				"",
				"When focusable elements are hidden with `aria-hidden` they are still reachable using conventional means such as a mouse or keyboard but won't be exposed to assistive technology (AT).",
				"This is often confusing for users of AT such as screenreaders.",
				"",
				"To fix this either:",
				"  - Remove `aria-hidden`.",
				"  - Remove the element from the DOM instead.",
				"  - Use `tabindex=\"-1\"` to remove the element from tab order.",
				"  - Use `hidden`, `inert` or similar means to hide or disable the element."
			].join("\n"),
			url: "https://html-validate.org/rules/hidden-focusable.html"
		};
	}
	setup() {
		let e = ["[tabindex]", ...this.getTagsWithProperty("focusable")].join(",");
		this.on("dom:ready", (t) => {
			let { document: n } = t;
			for (let t of n.querySelectorAll(e)) vd(t) && Ys(t) && this.reportElement(t);
		});
	}
	reportElement(e) {
		let t = e.getAttribute("aria-hidden"), n = t ? "aria-hidden cannot be used on focusable elements" : "aria-hidden cannot be used on focusable elements (hidden by ancestor element)", r = t ? t.keyLocation : e.location, i = t ? "self" : "parent";
		this.report({
			node: e,
			message: n,
			location: r,
			context: i
		});
	}
}, bd = { pattern: "kebabcase" };
function xd(e, ...t) {
	let n = new Set(e);
	for (let e of t) n.delete(e);
	return n;
}
var Sd = class extends nu {
	constructor(e) {
		let t = xd(Zl, "tailwind");
		super({
			ruleId: "id-pattern",
			attr: "id",
			options: {
				...bd,
				...e
			},
			allowedPatterns: t
		});
	}
	static schema() {
		return super.schema();
	}
	documentation(e) {
		return {
			description: this.description(e),
			url: "https://html-validate.org/rules/id-pattern.html"
		};
	}
	setup() {
		this.on("attr", (e) => {
			let { target: t, key: n, value: r, valueLocation: i } = e;
			n.toLowerCase() === "id" && (r instanceof H || r !== null && this.validateValue(t, r, i));
		});
	}
}, Cd = /* @__PURE__ */ new Map([
	["accept", ["file"]],
	["alpha", ["color"]],
	["alt", ["image"]],
	["autocapitalize", [
		"button",
		"checkbox",
		"color",
		"date",
		"datetime-local",
		"file",
		"hidden",
		"image",
		"month",
		"number",
		"radio",
		"range",
		"reset",
		"search",
		"submit",
		"tel",
		"text",
		"time",
		"week"
	]],
	["autocomplete", [
		"color",
		"date",
		"datetime-local",
		"email",
		"file",
		"hidden",
		"image",
		"month",
		"number",
		"password",
		"range",
		"search",
		"tel",
		"text",
		"time",
		"url",
		"week"
	]],
	["capture", ["file"]],
	["checked", ["checkbox", "radio"]],
	["colorspace", ["color"]],
	["dirname", [
		"hidden",
		"text",
		"search",
		"url",
		"tel",
		"email"
	]],
	["height", ["image"]],
	["list", [
		"text",
		"search",
		"url",
		"tel",
		"email",
		"date",
		"month",
		"week",
		"time",
		"datetime-local",
		"number",
		"range",
		"color"
	]],
	["max", [
		"date",
		"month",
		"week",
		"time",
		"datetime-local",
		"number",
		"range"
	]],
	["maxlength", [
		"text",
		"search",
		"url",
		"tel",
		"email",
		"password"
	]],
	["min", [
		"date",
		"month",
		"week",
		"time",
		"datetime-local",
		"number",
		"range"
	]],
	["minlength", [
		"text",
		"search",
		"url",
		"tel",
		"email",
		"password"
	]],
	["multiple", ["email", "file"]],
	["pattern", [
		"text",
		"search",
		"url",
		"tel",
		"email",
		"password"
	]],
	["placeholder", [
		"text",
		"search",
		"url",
		"tel",
		"email",
		"password",
		"number"
	]],
	["popovertarget", ["button"]],
	["popovertargetaction", ["button"]],
	["readonly", [
		"text",
		"search",
		"url",
		"tel",
		"email",
		"password",
		"date",
		"month",
		"week",
		"time",
		"datetime-local",
		"number"
	]],
	["required", [
		"text",
		"search",
		"url",
		"tel",
		"email",
		"password",
		"date",
		"month",
		"week",
		"time",
		"datetime-local",
		"number",
		"checkbox",
		"radio",
		"file"
	]],
	["size", [
		"text",
		"search",
		"url",
		"tel",
		"email",
		"password"
	]],
	["src", ["image"]],
	["step", [
		"date",
		"month",
		"week",
		"time",
		"datetime-local",
		"number",
		"range"
	]],
	["value", [
		"button",
		"checkbox",
		"color",
		"date",
		"datetime-local",
		"email",
		"hidden",
		"month",
		"number",
		"password",
		"radio",
		"range",
		"reset",
		"search",
		"submit",
		"tel",
		"text",
		"time",
		"url",
		"week"
	]],
	["width", ["image"]]
]);
function wd(e) {
	let { target: t } = e;
	return t.is("input");
}
var Td = class extends K {
	documentation(e) {
		let { attribute: t, type: n } = e;
		return {
			description: [
				`Attribute \`${t}\` is not allowed on \`<input type="${n}">\`
`,
				`\`${t}\` can only be used when \`type\` is:`,
				...Cd.get(t)?.map((e) => `- \`${e}\``) ?? []
			].join("\n"),
			url: "https://html-validate.org/rules/input-attributes.html"
		};
	}
	setup() {
		this.on("tag:ready", wd, (e) => {
			let { target: t } = e, n = t.getAttribute("type");
			if (!n || n.isDynamic || !n.value) return;
			let r = n.value.toString();
			for (let e of t.attributes) {
				let n = Cd.get(e.key);
				if (!n || n.includes(r)) continue;
				let i = {
					attribute: e.key,
					type: r
				}, a = `Attribute "${e.key}" is not allowed on <input type="${r}">`;
				this.report(t, a, e.keyLocation, i);
			}
		});
	}
}, Ed = Symbol(Md.name);
function Dd(e, t) {
	let { reference: n } = t;
	return n?.isSameNode(e) ? !1 : !qs(e);
}
function Od(e, t) {
	if (e.is("img")) return pc(e);
	if (e.is("svg")) return e.textContent.trim() !== "";
	for (let n of e.querySelectorAll("img, svg")) if (jd(n, t)) return !0;
	return !1;
}
function kd(e) {
	return !!(e.getAttributeValue("aria-label") ?? "").trim();
}
function Ad(e, t) {
	let { document: n, reference: r } = t;
	if (r) return !1;
	let i = e.ariaLabelledby;
	return i instanceof H ? !0 : i === null ? !1 : i.some((e) => {
		let t = ns(e);
		return n.querySelectorAll(t).some((e) => jd(e, {
			document: n,
			reference: e
		}));
	});
}
function jd(e, t) {
	let { reference: n } = t;
	return Dd(e, t) ? !1 : !!(dc(e, {
		accessible: !0,
		ignoreHiddenRoot: !!n?.isSameNode(e)
	}) !== cc.EMPTY_TEXT || Od(e, t) || kd(e) || Ad(e, t));
}
function Md(e, t) {
	if (t.cacheExists(Ed)) return !!t.cacheGet(Ed);
	let n = jd(t, {
		document: e,
		reference: null
	});
	return t.cacheSet(Ed, n);
}
function Nd(e) {
	if (e.is("input")) {
		let t = e.getAttributeValue("type")?.toLowerCase();
		return !!(t && [
			"hidden",
			"submit",
			"reset",
			"button"
		].includes(t));
	}
	return !1;
}
var Pd = class extends K {
	documentation() {
		return {
			description: [
				"Each form element must have an a label or accessible name.",
				"Typically this is implemented using a `<label for=\"..\">` element describing the purpose of the form element.",
				"",
				"This can be resolved in one of the following ways:",
				"",
				"  - Use an associated `<label for=\"..\">` element.",
				"  - Use a nested `<label>` as parent element.",
				"  - Use `aria-label` or `aria-labelledby` attributes."
			].join("\n"),
			url: "https://html-validate.org/rules/input-missing-label.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let t = e.document;
			for (let e of t.querySelectorAll("input, textarea, select")) this.validateInput(t, e);
		});
	}
	validateInput(e, t) {
		if (!qs(t) || Nd(t) || Md(e, t)) return;
		let n;
		if ((n = Fd(e, t.id)).length > 0) {
			this.validateLabel(e, t, n);
			return;
		}
		if ((n = Id(t)).length > 0) {
			this.validateLabel(e, t, n);
			return;
		}
		t.hasAttribute("aria-label") ? this.report(t, `<${t.tagName}> element has aria-label but label has no text`) : t.hasAttribute("aria-labelledby") ? this.report(t, `<${t.tagName}> element has aria-labelledby but referenced element has no text`) : this.report(t, `<${t.tagName}> element does not have a <label>`);
	}
	validateLabel(e, t, n) {
		if (n.filter(qs).length === 0) {
			this.report(t, `<${t.tagName}> element has <label> but <label> element is hidden`);
			return;
		}
		n.every((t) => !Md(e, t)) && this.report(t, `<${t.tagName}> element has <label> but <label> has no text`);
	}
};
function Fd(e, t) {
	return t ? e.querySelectorAll(`label[for="${t}"]`) : [];
}
function Id(e) {
	let t = e.parent;
	for (; t;) {
		if (t.is("label")) return [t];
		t = t.parent;
	}
	return [];
}
var Ld = { maxlength: 70 }, Rd = class extends K {
	maxlength;
	constructor(e) {
		super({
			...Ld,
			...e
		}), this.maxlength = this.options.maxlength;
	}
	static schema() {
		return { maxlength: { type: "number" } };
	}
	documentation() {
		return {
			description: "Search engines truncates titles with long text, possibly down-ranking the page in the process.",
			url: "https://html-validate.org/rules/long-title.html"
		};
	}
	setup() {
		this.on("tag:end", (e) => {
			let t = e.previous;
			t.tagName === "title" && t.textContent.length > this.maxlength && this.report(t, `title text cannot be longer than ${String(this.maxlength)} characters`);
		});
	}
};
function zd(e) {
	let t = e.value;
	return !t || t instanceof H ? null : t;
}
var Bd = class extends K {
	documentation() {
		return {
			description: "`<map>` must have a unique name, it cannot be the same name as another `<map>` element",
			url: "https://html-validate.org/rules/map-dup-name.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let { document: t } = e, n = t.querySelectorAll("map[name]"), r = /* @__PURE__ */ new Set();
			for (let e of n) {
				let t = e.getAttribute("name");
				if (!t) continue;
				let n = zd(t);
				n && (r.has(n) && this.report({
					node: e,
					message: "<map> name must be unique",
					location: t.keyLocation
				}), r.add(n));
			}
		});
	}
};
function Vd(e) {
	return e.target.is("map");
}
function Hd(e) {
	return !!(e && !(e.value instanceof H));
}
var Ud = class extends K {
	documentation() {
		return {
			description: "When the `id` attribute is present on a `<map>` element it must be equal to the `name` attribute.",
			url: "https://html-validate.org/rules/map-id-name.html"
		};
	}
	setup() {
		this.on("tag:ready", Vd, (e) => {
			let { target: t } = e, n = t.getAttribute("id"), r = t.getAttribute("name");
			!Hd(n) || !Hd(r) || n.value !== r.value && this.report({
				node: e.target,
				message: "\"id\" and \"name\" attribute must be the same on <map> elements",
				location: n.valueLocation ?? r.valueLocation
			});
		});
	}
}, Wd = { allowLongDelay: !1 }, Gd = class extends K {
	constructor(e) {
		super({
			...Wd,
			...e
		});
	}
	documentation() {
		return {
			description: "Meta refresh directive must use the `0;url=...` format. Non-zero values for time interval is disallowed as people with assistive technology might be unable to read and understand the page content before automatically reloading. For the same reason skipping the url is disallowed as it would put the browser in an infinite loop reloading the same page over and over again.",
			url: "https://html-validate.org/rules/meta-refresh.html"
		};
	}
	setup() {
		this.on("element:ready", ({ target: e }) => {
			if (!e.is("meta") || e.getAttributeValue("http-equiv") !== "refresh") return;
			let t = e.getAttribute("content");
			if (!t?.value || t.isDynamic) return;
			let n = t.valueLocation, r = Kd(t.value.toString());
			if (!r) {
				this.report(e, "Malformed meta refresh directive", n);
				return;
			}
			let { delay: i, url: a } = r;
			this.validateDelay(e, n, i, a);
		});
	}
	validateDelay(e, t, n, r) {
		let { allowLongDelay: i } = this.options;
		if (!(i && n > 72e3)) {
			if (!r && n === 0) {
				this.report(e, "Don't use instant meta refresh to reload the page", t);
				return;
			}
			if (n !== 0) {
				let n = i ? "Meta refresh must be instant (0 second delay) or greater than 20 hours (72000 second delay)" : "Meta refresh must be instant (0 second delay)";
				this.report(e, n, t);
			}
		}
	}
};
function Kd(e) {
	let t = /^(\d+)(?:\s*;\s*url=(.*))?/i.exec(e);
	return t ? {
		delay: Math.trunc(Number(t[1])),
		url: t[2]
	} : null;
}
var qd = class extends K {
	documentation() {
		return {
			description: "Requires that the document contains a doctype.",
			url: "https://html-validate.org/rules/missing-doctype.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let t = e.document;
			t.doctype || this.report(t.root, "Document is missing doctype");
		});
	}
}, Jd = class extends K {
	labelable = "";
	documentation() {
		return {
			description: "A `<label>` element can only be associated with one control at a time.",
			url: "https://html-validate.org/rules/multiple-labeled-controls.html"
		};
	}
	setup() {
		this.labelable = this.getTagsWithProperty("labelable").join(","), this.on("dom:ready", (e) => {
			let { document: t } = e, n = t.querySelectorAll("label");
			for (let e of n) this.getNumLabledControls(e) <= 1 || this.report(e, "<label> is associated with multiple controls", e.location);
		});
	}
	getNumLabledControls(e) {
		let t = e.querySelectorAll(this.labelable).filter((e) => e.meta?.labelable).map((e) => e.id), n = e.getAttribute("for");
		return !n || n.isDynamic || !n.value || t.includes(n.value.toString()) ? t.length : t.length + 1;
	}
}, Yd = { pattern: "camelcase" };
function Xd(e, ...t) {
	let n = new Set(e);
	for (let e of t) n.delete(e);
	return n;
}
var Zd = class extends nu {
	constructor(e) {
		let t = Xd(Zl, "tailwind");
		super({
			ruleId: "name-pattern",
			attr: "name",
			options: {
				...Yd,
				...e
			},
			allowedPatterns: t
		});
	}
	static schema() {
		return super.schema();
	}
	documentation(e) {
		return {
			description: this.description(e),
			url: "https://html-validate.org/rules/name-pattern.html"
		};
	}
	setup() {
		this.on("attr", (e) => {
			let { target: t, key: n, value: r, valueLocation: i } = e, { meta: a } = t;
			if (!a?.formAssociated?.listed || n.toLowerCase() !== "name" || r instanceof H || r === null) return;
			let o = r.endsWith("[]") ? r.slice(0, -2) : r;
			this.validateValue(t, o, i);
		});
	}
}, Qd = [
	"command",
	"composite",
	"input",
	"landmark",
	"range",
	"roletype",
	"section",
	"sectionhead",
	"select",
	"structure",
	"widget",
	"window"
];
function $d(e) {
	return e.key === "role";
}
var ef = class extends K {
	documentation(e) {
		return {
			description: [
				`Role \`"${e.role}"\` is abstract and must not be used.`,
				"",
				"WAI-ARIA defines a list of [abstract roles](https://www.w3.org/TR/wai-aria-1.2/#abstract_roles) which cannot be used by authors:",
				"",
				...Qd.map((e) => `- \`"${e}"\``),
				"",
				`Use one of the defined subclass roles for \`"${e.role}"\` instead.`
			].join("\n"),
			url: "https://html-validate.org/rules/no-abstract-role.html"
		};
	}
	setup() {
		this.on("attr", $d, (e) => {
			let t = e.value;
			if (!t || t instanceof H) return;
			let n = new G(t, e.valueLocation);
			for (let { item: t, location: r } of n.iterator()) Qd.includes(t) && this.report({
				node: e.target,
				message: "Role \"{{ role }}\" is abstract and must not be used",
				location: r,
				context: { role: t }
			});
		});
	}
}, tf = {
	include: null,
	exclude: null
}, nf = class extends K {
	constructor(e) {
		super({
			...tf,
			...e
		});
	}
	documentation(e) {
		return {
			description: [
				`The autoplay attribute is not allowed on <${e.tagName}>.`,
				"Autoplaying content can be disruptive for users and has accessibilty concerns.",
				"Prefer to let the user control playback."
			].join("\n"),
			url: "https://html-validate.org/rules/no-autoplay.html"
		};
	}
	static schema() {
		return {
			exclude: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "null" }] },
			include: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "null" }] }
		};
	}
	setup() {
		this.on("attr", (e) => {
			if (e.key.toLowerCase() !== "autoplay" || e.value && e.value instanceof H) return;
			let t = e.target.tagName;
			if (this.isKeywordIgnored(t)) return;
			let n = { tagName: t }, r = e.location;
			this.report(e.target, `The autoplay attribute is not allowed on <${t}>`, r, n);
		});
	}
}, rf = class extends K {
	documentation() {
		return {
			description: "Microsoft Internet Explorer previously supported using special HTML comments (conditional comments) for targeting specific versions of IE but since IE 10 it is deprecated and not supported in standards mode.",
			url: "https://html-validate.org/rules/no-conditional-comment.html"
		};
	}
	setup() {
		this.on("conditional", (e) => {
			this.report(e.parent, "Use of conditional comments are deprecated", e.location);
		});
	}
}, af = class extends K {
	documentation() {
		return {
			description: "HTML5 deprecated many old attributes.",
			url: "https://html-validate.org/rules/no-deprecated-attr.html"
		};
	}
	setup() {
		this.on("attr", (e) => {
			let t = e.target, n = t.meta;
			if (n === null) return;
			let r = e.key.toLowerCase(), i = n.attributes[r];
			i && i.deprecated && this.report(t, `Attribute "${e.key}" is deprecated on <${t.tagName}> element`, e.keyLocation);
		});
	}
}, of = class extends K {
	documentation() {
		return {
			description: "HTML disallows two or more attributes with the same (case-insensitive) name.",
			url: "https://html-validate.org/rules/no-dup-attr.html"
		};
	}
	setup() {
		let e = {};
		this.on("tag:start", () => {
			e = {};
		}), this.on("attr", (t) => {
			if (t.originalAttribute) return;
			let n = t.key.toLowerCase();
			Object.hasOwn(e, n) && this.report(t.target, `Attribute "${n}" duplicated`, t.keyLocation), e[t.key] = !0;
		});
	}
}, sf = class extends K {
	documentation() {
		return {
			description: "Prevents unnecessary duplication of class names.",
			url: "https://html-validate.org/rules/no-dup-class.html"
		};
	}
	setup() {
		this.on("attr", (e) => {
			if (e.key.toLowerCase() !== "class") return;
			let t = new G(e.value, e.valueLocation), n = /* @__PURE__ */ new Set();
			for (let { item: r, location: i } of t.iterator()) n.has(r) && this.report(e.target, `Class "${r}" duplicated`, i), n.add(r);
		});
	}
}, cf = /* @__PURE__ */ Symbol("no-dup-id"), lf = class extends K {
	documentation() {
		return {
			description: "The ID of an element must be unique.",
			url: "https://html-validate.org/rules/no-dup-id.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let { document: t } = e, n = uf(t.root, t.root), r = !t.querySelector("template"), i = t.querySelectorAll("[id]");
			for (let e of i) {
				let i = e.getAttribute("id");
				if (!i || !i.value || i.isDynamic) continue;
				let a = i.value.toString(), o = r ? n : uf(e, t.root);
				if (o.has(a)) {
					this.report(e, `Duplicate ID "${a}"`, i.valueLocation);
					continue;
				}
				o.add(a);
			}
		});
	}
};
function uf(e, t) {
	let n = e.closest("template") ?? t, r = n.cacheGet(cf);
	if (r) return r;
	let i = /* @__PURE__ */ new Set();
	return n.cacheSet(cf, i);
}
function df(e) {
	return e.target.is("button");
}
var ff = class extends K {
	documentation() {
		return {
			description: [
				"`<button>` is missing recommended `type` attribute",
				"",
				"When the `type` attribute is omitted it defaults to `submit`.",
				"Submit buttons are triggered when a keyboard user presses <kbd>Enter</kbd>.",
				"",
				"As this may or may not be inteded this rule enforces that the `type` attribute be explicitly set to one of the valid types:",
				"",
				"- `button` - a generic button.",
				"- `submit` - a submit button.",
				"- `reset`- a button to reset form fields."
			].join("\n"),
			url: "https://html-validate.org/rules/no-implicit-button-type.html"
		};
	}
	setup() {
		this.on("element:ready", df, (e) => {
			let { target: t } = e;
			t.parent?.is("select") || t.getAttribute("type") || this.report({
				node: e.target,
				message: "<button> is missing recommended \"type\" attribute"
			});
		});
	}
}, pf = class extends K {
	documentation() {
		return {
			description: "Some elements in HTML has optional end tags. When an optional tag is omitted a browser must handle it as if the end tag was present.\n\nOmitted end tags can be ambigious for humans to read and many editors have trouble formatting the markup.",
			url: "https://html-validate.org/rules/no-implicit-close.html"
		};
	}
	setup() {
		this.on("tag:end", (e) => {
			let t = e.previous, n = e.target;
			if (!n || t.closed !== W.CLOSED_IMPLICIT_CLOSED) return;
			let r = t.parent, i = r?.tagName === n.tagName, a = i && r.isRootElement(), o = t.tagName === n.tagName;
			a ? this.report(t, `Element <${t.tagName}> is implicitly closed by document ending`, t.location) : i ? this.report(t, `Element <${t.tagName}> is implicitly closed by parent </${n.tagName}>`, t.location) : o ? this.report(t, `Element <${t.tagName}> is implicitly closed by sibling`, t.location) : this.report(t, `Element <${t.tagName}> is implicitly closed by adjacent <${n.tagName}>`, t.location);
		});
	}
};
function mf(e) {
	return e.target.is("input");
}
var hf = class extends K {
	documentation() {
		return {
			description: ["`<input>` is missing recommended `type` attribute"].join("\n"),
			url: "https://html-validate.org/rules/no-implicit-input-type.html"
		};
	}
	setup() {
		this.on("element:ready", mf, (e) => {
			let { target: t } = e;
			t.getAttribute("type") || this.report({
				node: e.target,
				message: "<input> is missing recommended \"type\" attribute"
			});
		});
	}
}, gf = {
	include: null,
	exclude: null,
	allowedProperties: ["display"],
	allowVariables: !0
}, _f = class extends K {
	constructor(e) {
		super({
			...gf,
			...e
		});
	}
	static schema() {
		return {
			exclude: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "null" }] },
			include: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "null" }] },
			allowedProperties: {
				items: { type: "string" },
				type: "array"
			},
			allowVariables: { type: "boolean" }
		};
	}
	documentation() {
		let { allowVariables: e, allowedProperties: t } = this.options, n = ["Inline style is not allowed.\n", "Inline style is a sign of unstructured CSS. Use class or ID with a separate stylesheet.\n"];
		return (t.length > 0 || e) && n.push("Under the current configuration the following CSS properties are allowed:\n"), t.length > 0 && n.push(t.map((e) => `- \`${e}\``).join("\n")), e && n.push("- CSS variables (custom properties starting with `--`).\n"), {
			description: n.join("\n"),
			url: "https://html-validate.org/rules/no-inline-style.html"
		};
	}
	setup() {
		this.on("attr", (e) => this.isRelevant(e), (e) => {
			let { value: t } = e;
			this.allPropertiesAllowed(t) || this.report(e.target, "Inline style is not allowed");
		});
	}
	isRelevant(e) {
		if (e.key !== "style") return !1;
		let { include: t, exclude: n } = this.options, r = e.originalAttribute ?? e.key;
		return !(t && !t.includes(r) || n?.includes(r));
	}
	allPropertiesAllowed(e) {
		let { allowedProperties: t, allowVariables: n } = this.options;
		if (t.length === 0 && !n) return !1;
		let r = Object.keys(ho(e));
		return r.length > 0 && r.every((e) => n && e.startsWith("--") ? !0 : t.includes(e));
	}
};
function vf(e, t) {
	return e.querySelectorAll(ns(t)).length === 0;
}
var yf = class extends K {
	documentation(e) {
		return {
			description: `The element ID "${e.value}" referenced by the ${e.key} attribute must point to an existing element.`,
			url: "https://html-validate.org/rules/no-missing-references.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let t = e.document;
			vs.depthFirst(t, (e) => {
				let n = e.meta;
				if (n?.attributes) for (let r of e.attributes) {
					let i = n.attributes[r.key];
					i?.reference === "id" && this.validateReference(t, e, r, i.list ?? !1);
				}
			});
		});
	}
	validateReference(e, t, n, r) {
		if (!n) return;
		let i = n.value;
		i instanceof H || i === null || i === "" || (r ? this.validateList(e, t, n, i) : this.validateSingle(e, t, n, i));
	}
	validateSingle(e, t, n, r) {
		if (!vf(e, r)) return;
		let i = {
			key: n.key,
			value: r
		};
		this.report(t, `Element references missing id "${r}"`, n.valueLocation, i);
	}
	validateList(e, t, n, r) {
		let i = new G(r, n.valueLocation);
		for (let r of i.iterator()) {
			let i = r.item;
			if (vf(e, i)) {
				let e = {
					key: n.key,
					value: i
				};
				this.report(t, `Element references missing id "${i}"`, r.location, e);
			}
		}
	}
}, bf = class extends K {
	documentation() {
		return {
			description: [
				"Only a single visible `<main>` element can be present at in a document at a time.",
				"",
				"Multiple `<main>` can be present in the DOM as long the others are hidden using the HTML5 `hidden` attribute."
			].join("\n"),
			url: "https://html-validate.org/rules/no-multiple-main.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let { document: t } = e, n = t.querySelectorAll("main").filter((e) => !e.hasAttribute("hidden"));
			n.shift();
			for (let e of n) this.report(e, "Multiple <main> elements present in document");
		});
	}
}, xf = { relaxed: !1 }, Sf = /(<|&(?![\d#A-Z]+;))/gi, Cf = /(["'<=>`]|&(?![\d#A-Z]+;))/gi, wf = /^(?:<%.*?%>|<\?.*?\?>|<\$.*?\$>)$/s, Tf = {
	"\"": "&quot;",
	"&": "&amp;",
	"'": "&apos;",
	"<": "&lt;",
	"=": "&equals;",
	">": "&gt;",
	"`": "&grave;"
}, Ef = class extends K {
	relaxed;
	constructor(e) {
		super({
			...xf,
			...e
		}), this.relaxed = this.options.relaxed;
	}
	static schema() {
		return { relaxed: { type: "boolean" } };
	}
	documentation() {
		return {
			description: "Some characters such as `<` and `&` hold special meaning in HTML and must be escaped using a character reference (HTML entity).",
			url: "https://html-validate.org/rules/no-raw-characters.html"
		};
	}
	setup() {
		this.on("element:ready", (e) => {
			let t = e.target;
			if (t.textType === "text") for (let e of t.childNodes) e.nodeType === W.TEXT_NODE && (wf.test(e.textContent) || this.findRawChars(t, e.textContent, e.location, Sf));
		}), this.on("attr", (e) => {
			let { meta: t } = e;
			e.value && (e.quote || t?.boolean || this.findRawChars(e.target, e.value.toString(), e.valueLocation, Cf));
		});
	}
	findRawChars(e, t, n, r) {
		let i;
		do
			if (i = r.exec(t), i) {
				let t = i[0];
				if (this.relaxed && t === "&") continue;
				let r = Tf[t], a = U(n, i.index, i.index + 1);
				this.report(e, `Raw "${t}" must be encoded as "${r}"`, a);
			}
		while (i);
	}
}, Df = [
	"input[aria-label]",
	"textarea[aria-label]",
	"select[aria-label]"
], Of = class extends K {
	documentation() {
		return {
			description: "`aria-label` is redundant when an associated `<label>` element containing the same text exists.",
			url: "https://html-validate.org/rules/no-redundant-aria-label.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let { document: t } = e, n = t.querySelectorAll(Df.join(","));
			for (let e of n) {
				let n = e.getAttribute("aria-label"), r = e.id;
				if (!r) continue;
				let i = t.querySelector(`label[for="${r}"]`);
				!n || i?.textContent.trim() !== n.value || this.report({
					message: "aria-label is redundant when label containing same text exists",
					node: e,
					location: n.keyLocation
				});
			}
		});
	}
}, kf = class extends K {
	documentation() {
		return {
			description: "When the `<label>` element wraps the labelable control the `for` attribute is redundant and better left out.",
			url: "https://html-validate.org/rules/no-redundant-for.html"
		};
	}
	setup() {
		this.on("element:ready", (e) => {
			let { target: t } = e;
			if (t.tagName !== "label") return;
			let n = t.getAttribute("for");
			if (!n || !uo(n)) return;
			let r = n.value;
			r && t.querySelector(ns(r)) && this.report(t, "Redundant \"for\" attribute", n.keyLocation);
		});
	}
}, Af = {
	include: null,
	exclude: null
}, jf = class extends K {
	constructor(e) {
		super({
			...Af,
			...e
		});
	}
	documentation(e) {
		let { role: t, tagName: n } = e;
		return {
			description: `Using the \`${t}\` role is redundant as it is already implied by the \`<${n}>\` element.`,
			url: "https://html-validate.org/rules/no-redundant-role.html"
		};
	}
	static schema() {
		return {
			exclude: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "null" }] },
			include: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "null" }] }
		};
	}
	setup() {
		this.on("tag:ready", (e) => {
			let { target: t } = e, n = t.getAttribute("role");
			if (!n?.value || n.value instanceof H) return;
			let { meta: r } = t;
			if (!r) return;
			let i = r.aria.implicitRole(t._adapter);
			if (!i || n.value !== i || this.isKeywordIgnored(n.value)) return;
			let a = {
				tagName: t.tagName,
				role: n.value
			};
			this.report(e.target, `Redundant role "${n.value}" on <${t.tagName}>`, n.valueLocation, a);
		});
	}
}, Mf = /^[^:]+:.+$/, Nf = {
	ignoreForeign: !0,
	ignoreXML: !0
}, Pf = class extends K {
	constructor(e) {
		super({
			...Nf,
			...e
		});
	}
	static schema() {
		return {
			ignoreForeign: { type: "boolean" },
			ignoreXML: { type: "boolean" }
		};
	}
	documentation(e) {
		return {
			description: `Self-closing elements are disallowed. Use regular end tag <${e}></${e}> instead of self-closing <${e}/>.`,
			url: "https://html-validate.org/rules/no-self-closing.html"
		};
	}
	setup() {
		this.on("tag:end", (e) => {
			let t = e.previous;
			Ff(t, this.options) && this.validateElement(t);
		});
	}
	validateElement(e) {
		e.closed === W.CLOSED_VOID_SELF_CLOSED && this.report(e, `<${e.tagName}> must not be self-closed`, null, e.tagName);
	}
};
function Ff(e, t) {
	return Mf.test(e.tagName) ? !t.ignoreXML : e.meta ? e.meta.void ? !1 : e.meta.foreign ? !t.ignoreForeign : !0 : !0;
}
var If = { allowTemplate: !0 }, Lf = class extends K {
	constructor(e) {
		super({
			...If,
			...e
		});
	}
	static schema() {
		return { allowTemplate: { type: "boolean" } };
	}
	documentation() {
		return {
			description: "Prefer to use external stylesheets with the `<link>` tag instead of inlining the styling.",
			url: "https://html-validate.org/rules/no-style-tag.html"
		};
	}
	setup() {
		let { allowTemplate: e } = this.options;
		this.on("tag:start", (t) => {
			let n = t.target;
			if (n.tagName === "style") {
				if (e && n.parent?.is("template")) return;
				this.report(n, "Use external stylesheet with <link> instead of <style> tag");
			}
		});
	}
}, Rf = class extends K {
	documentation() {
		return {
			description: "Lines with trailing whitespace cause unnessecary diff when using version control and usually serve no special purpose in HTML.",
			url: "https://html-validate.org/rules/no-trailing-whitespace.html"
		};
	}
	setup() {
		this.on("whitespace", (e) => {
			/^[\t ]+\r?\n$/.test(e.text) && this.report(null, "Trailing whitespace", e.location);
		});
	}
}, zf = [
	/^:/,
	/^@/,
	/^ng-/i,
	/^v-/i,
	/^x-/i,
	/^\[/,
	/^#/
];
function Bf(e) {
	return zf.some((t) => t.test(e));
}
var Vf = class extends K {
	documentation(e) {
		return {
			description: `The \`${e.attr}\` attribute is not a known attribute on \`<${e.tagName}>\`.`,
			url: "https://html-validate.org/rules/no-unknown-attributes.html"
		};
	}
	setup() {
		this.on("attr", (e) => {
			let t = e.target, n = t.meta;
			if (n === null) return;
			let r = e.key.toLowerCase();
			Object.hasOwn(n.attributes, r) || Vs(r, n.patternAttributes) || Bf(r) || this.report({
				node: t,
				message: `Attribute "${e.key}" is not allowed on <${t.tagName}> element`,
				location: e.keyLocation,
				context: {
					tagName: t.tagName,
					attr: e.key
				}
			});
		});
	}
}, Hf = {
	include: null,
	exclude: null
}, Uf = class extends K {
	constructor(e) {
		super({
			...Hf,
			...e
		});
	}
	static schema() {
		return {
			exclude: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "null" }] },
			include: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "null" }] }
		};
	}
	documentation(e) {
		return {
			description: `An unknown element${e ? ` <${e}>` : ""} was used. If this is a Custom Element you need to supply element metadata for it.`,
			url: "https://html-validate.org/rules/no-unknown-elements.html"
		};
	}
	setup() {
		this.on("tag:start", (e) => {
			let t = e.target;
			t.meta || this.isKeywordIgnored(t.tagName, zs) || this.report(t, `Unknown element <${t.tagName}>`, null, t.tagName);
		});
	}
}, Wf = class extends K {
	documentation(e) {
		return {
			description: `\`${e.ruleId}\` rule is disabled but no error was reported.`,
			url: "https://html-validate.org/rules/no-unused-disable.html"
		};
	}
	setup() {}
	reportUnused(e, t, n) {
		let r = new G(t.replaceAll(",", " "), n);
		for (let t of e) {
			let e = r.indexOf(t), i = e === -1 ? n : r.location(e);
			this.report({
				node: null,
				message: "\"{{ ruleId }}\" rule is disabled but no error was reported",
				location: i,
				context: { ruleId: t }
			});
		}
	}
}, Gf = class extends K {
	documentation() {
		return {
			description: "This file is saved with the UTF-8 byte order mark (BOM) present. It is neither required or recommended to use.\n\nInstead the document should be served with the `Content-Type: application/javascript; charset=utf-8` header.",
			url: "https://html-validate.org/rules/no-utf8-bom.html"
		};
	}
	setup() {
		let e = this.on("token", (t) => {
			t.type === X.UNICODE_BOM && this.report(null, "File should be saved without UTF-8 BOM", t.location), this.setEnabled(!1), e();
		});
	}
}, Kf = [
	"button",
	"submit",
	"reset",
	"image"
], qf = {
	button: "<button type=\"button\">",
	submit: "<button type=\"submit\">",
	reset: "<button type=\"reset\">",
	image: "<button type=\"button\">"
}, Jf = {
	include: null,
	exclude: null
}, Yf = class extends K {
	constructor(e) {
		super({
			...Jf,
			...e
		});
	}
	static schema() {
		return {
			exclude: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "null" }] },
			include: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "null" }] }
		};
	}
	documentation(e) {
		let t = `<input type="${e.type}">`;
		return {
			description: `Prefer to use \`${qf[e.type] || "<button>"}\` instead of \`"${t}\`.`,
			url: "https://html-validate.org/rules/prefer-button.html"
		};
	}
	setup() {
		this.on("attr", (e) => {
			let t = e.target;
			if (t.tagName.toLowerCase() !== "input" || e.key.toLowerCase() !== "type" || !e.value || e.value instanceof H) return;
			let n = e.value.toLowerCase();
			if (this.isKeywordIgnored(n) || !Kf.includes(n)) return;
			let r = { type: n }, i = `Prefer to use <button> instead of <input type="${n}"> when adding buttons`;
			this.report(t, i, e.valueLocation, r);
		});
	}
}, Xf = {
	mapping: {
		article: "article",
		banner: "header",
		button: "button",
		cell: "td",
		checkbox: "input",
		complementary: "aside",
		contentinfo: "footer",
		figure: "figure",
		form: "form",
		heading: "hN",
		input: "input",
		link: "a",
		list: "ul",
		listbox: "select",
		listitem: "li",
		main: "main",
		navigation: "nav",
		progressbar: "progress",
		radio: "input",
		region: "section",
		table: "table",
		textbox: "textarea"
	},
	include: null,
	exclude: null
}, Zf = class extends K {
	constructor(e) {
		super({
			...Xf,
			...e
		});
	}
	static schema() {
		return {
			exclude: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "null" }] },
			include: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "null" }] },
			mapping: { type: "object" }
		};
	}
	documentation(e) {
		return {
			description: `Instead of using the WAI-ARIA role "${e.role}" prefer to use the native <${e.replacement}> element.`,
			url: "https://html-validate.org/rules/prefer-native-element.html"
		};
	}
	setup() {
		let { mapping: e } = this.options;
		this.on("attr", (t) => {
			if (t.key.toLowerCase() !== "role" || !t.value || t.value instanceof H) return;
			let n = t.value.toLowerCase();
			if (this.isIgnored(n)) return;
			let r = e[n];
			if (t.target.is(r)) return;
			let i = {
				role: n,
				replacement: r
			}, a = this.getLocation(t);
			this.report(t.target, `Prefer to use the native <${r}> element`, a, i);
		});
	}
	isIgnored(e) {
		let { mapping: t } = this.options;
		return t[e] ? this.isKeywordIgnored(e) : !0;
	}
	getLocation(e) {
		let t = e.location, n = e.valueLocation, r = +!!e.quote, i = n.offset + n.size - t.offset + r;
		return {
			filename: t.filename,
			line: t.line,
			column: t.column,
			offset: t.offset,
			size: i
		};
	}
}, Qf = class extends K {
	documentation() {
		return {
			description: "While `<tbody>` is optional is relays semantic information about its contents. Where applicable it should also be combined with `<thead>` and `<tfoot>`.",
			url: "https://html-validate.org/rules/prefer-tbody.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let t = e.document;
			for (let e of t.querySelectorAll("table")) {
				if (e.querySelector("> tbody")) continue;
				let t = e.querySelectorAll("> tr");
				t.length > 0 && this.report(t[0], "Prefer to wrap <tr> elements in <tbody>");
			}
		});
	}
}, $f = { tags: ["script", "style"] }, ep = class extends K {
	constructor(e) {
		super({
			...$f,
			...e
		});
	}
	static schema() {
		return { tags: {
			type: "array",
			items: {
				enum: ["script", "style"],
				type: "string"
			}
		} };
	}
	documentation() {
		return {
			description: [
				"Required Content-Security-Policy (CSP) nonce is missing or empty.",
				"",
				"This is set by the `nonce` attribute and must match the `Content-Security-Policy` header.",
				"For instance, if the header contains `script-src 'nonce-r4nd0m'` the `nonce` attribute must be set to `nonce=\"r4nd0m\">`",
				"",
				"The nonce should be unique per each request and set to a cryptography secure random token.",
				"It is used to prevent cross site scripting (XSS) by preventing malicious actors from injecting scripts onto the page."
			].join("\n"),
			url: "https://html-validate.org/rules/require-csp-nonce.html"
		};
	}
	setup() {
		this.on("tag:end", (e) => {
			let { tags: t } = this.options, n = e.previous;
			if (!t.includes(n.tagName)) return;
			let r = n.getAttribute("nonce")?.value;
			r && r !== "" || n.is("script") && n.hasAttribute("src") || this.report(n, "required CSP nonce is missing", n.location);
		});
	}
}, tp = {
	target: "all",
	include: null,
	exclude: null
}, np = /^(?:\w+:\/\/|\/\/)/, rp = {
	link: "href",
	script: "src"
}, ip = /* @__PURE__ */ new Set([
	"stylesheet",
	"preload",
	"modulepreload"
]), ap = /* @__PURE__ */ new Set(["style", "script"]);
function op(e) {
	let t = e.getAttribute("rel");
	if (typeof t?.value != "string" || !ip.has(t.value)) return !1;
	if (t.value === "preload") {
		let t = e.getAttribute("as");
		return typeof t?.value == "string" && ap.has(t.value);
	}
	return !0;
}
var sp = class extends K {
	target;
	constructor(e) {
		super({
			...tp,
			...e
		}), this.target = this.options.target;
	}
	static schema() {
		return {
			target: {
				enum: ["all", "crossorigin"],
				type: "string"
			},
			include: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "null" }] },
			exclude: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "null" }] }
		};
	}
	documentation() {
		return {
			description: "Subresource Integrity (SRI) `integrity` attribute is required to prevent tampering or manipulation from Content Delivery Networks (CDN), rouge proxies,  malicious entities, etc.",
			url: "https://html-validate.org/rules/require-sri.html"
		};
	}
	setup() {
		this.on("tag:end", (e) => {
			let t = e.previous;
			this.supportSri(t) && this.needSri(t) && (t.hasAttribute("integrity") || this.report(t, `SRI "integrity" attribute is required on <${t.tagName}> element`, t.location));
		});
	}
	supportSri(e) {
		return Object.keys(rp).includes(e.tagName);
	}
	needSri(e) {
		if (e.is("link") && !op(e)) return !1;
		let t = this.elementSourceAttr(e);
		if (!t || t.value === null || t.value === "" || t.isDynamic) return !1;
		let n = t.value.toString();
		return this.target === "all" || np.test(n) ? !this.isIgnored(n) : !1;
	}
	elementSourceAttr(e) {
		let t = rp[e.tagName];
		return e.getAttribute(t);
	}
	isIgnored(e) {
		return this.isKeywordIgnored(e, (e, t) => e.some((e) => t.includes(e)));
	}
}, cp = class extends K {
	documentation() {
		return {
			description: "The end tag for `<script>` is a hard requirement and must never be omitted even when using the `src` attribute.",
			url: "https://html-validate.org/rules/script-element.html"
		};
	}
	setup() {
		this.on("tag:end", (e) => {
			let t = e.target;
			t?.tagName === "script" && t.closed !== W.CLOSED_END_TAG && this.report(t, `End tag for <${t.tagName}> must not be omitted`);
		});
	}
}, lp = /* @__PURE__ */ new Set([
	"",
	"application/ecmascript",
	"application/javascript",
	"text/ecmascript",
	"text/javascript"
]), up = class extends K {
	documentation() {
		return {
			description: "While valid the HTML5 standard encourages authors to omit the type element for JavaScript resources.",
			url: "https://html-validate.org/rules/script-type.html"
		};
	}
	setup() {
		this.on("tag:end", (e) => {
			let t = e.previous;
			if (t.tagName !== "script") return;
			let n = t.getAttribute("type");
			if (!n || n.isDynamic) return;
			let r = n.value ? n.value.toString() : "";
			this.isJavascript(r) && this.report(t, "\"type\" attribute is unnecessary for javascript resources", n.keyLocation);
		});
	}
	isJavascript(e) {
		let t = e.replace(/;.*/, "");
		return lp.has(t);
	}
}, dp = class extends K {
	documentation() {
		return {
			description: "Inline SVG elements in IE are focusable by default which may cause issues with tab-ordering. The `focusable` attribute should explicitly be set to avoid unintended behaviour.",
			url: "https://html-validate.org/rules/svg-focusable.html"
		};
	}
	setup() {
		this.on("element:ready", (e) => {
			e.target.is("svg") && this.validate(e.target);
		});
	}
	validate(e) {
		e.hasAttribute("focusable") || this.report(e, `<${e.tagName}> is missing required "focusable" attribute`);
	}
}, fp = {
	characters: [{
		pattern: " ",
		replacement: "&nbsp;",
		description: "non-breaking space"
	}, {
		pattern: "-",
		replacement: "&#8209;",
		description: "non-breaking hyphen"
	}],
	ignoreClasses: [],
	ignoreStyle: !0
};
function pp(e) {
	let t = `(${e.map((e) => e.pattern).join("|")})`;
	return new RegExp(t, "g");
}
function mp(e) {
	let t = /^(\s*)(\S.*)$/.exec(e.textContent);
	if (!t) return [0, ""];
	let [, n, r] = t;
	return [n.length, r.trimEnd()];
}
function hp(e, t) {
	let n = new RegExp(t), r = [], i;
	for (; i = n.exec(e);) r.push(i);
	return r;
}
var gp = class extends K {
	regex;
	constructor(e) {
		super({
			...fp,
			...e
		}), this.regex = pp(this.options.characters);
	}
	static schema() {
		return {
			characters: {
				type: "array",
				items: {
					type: "object",
					additionalProperties: !1,
					properties: {
						pattern: { type: "string" },
						replacement: { type: "string" },
						description: { type: "string" }
					}
				}
			},
			ignoreClasses: {
				type: "array",
				items: { type: "string" }
			},
			ignoreStyle: { type: "boolean" }
		};
	}
	documentation(e) {
		let { characters: t } = this.options, n = t.map((e) => `  - \`${e.pattern}\` - replace with \`${e.replacement}\` (${e.description}).`);
		return {
			description: [
				`The \`${e.pattern}\` character should be replaced with \`${e.replacement}\` character (${e.description}) when used in a telephone number.`,
				"",
				"Unless non-breaking characters is used there could be a line break inserted at that character.",
				"Line breaks make is harder to read and understand the telephone number.",
				"",
				"The following characters should be avoided:",
				"",
				...n
			].join("\n"),
			url: "https://html-validate.org/rules/tel-non-breaking.html"
		};
	}
	setup() {
		this.on("element:ready", this.isRelevant, (e) => {
			let { target: t } = e;
			this.isIgnored(t) || this.walk(t, t);
		});
	}
	isRelevant(e) {
		let { target: t } = e;
		return !(!t.is("a") || !t.getAttribute("href")?.valueMatches(/^tel:/, !1));
	}
	isIgnoredClass(e) {
		let { ignoreClasses: t } = this.options, { classList: n } = e;
		return t.some((e) => n.contains(e));
	}
	isIgnoredStyle(e) {
		let { ignoreStyle: t } = this.options, { style: n } = e;
		return t ? n["white-space"] === "nowrap" || n["white-space"] === "pre" : !1;
	}
	isIgnored(e) {
		return this.isIgnoredClass(e) || this.isIgnoredStyle(e);
	}
	walk(e, t) {
		for (let n of t.childNodes) os(n) ? this.detectDisallowed(e, n) : ds(n) && this.walk(e, n);
	}
	detectDisallowed(e, t) {
		let [n, r] = mp(t), i = hp(r, this.regex);
		for (let a of i) {
			let i = a[0], o = this.options.characters.find((e) => e.pattern === i);
			if (!o) throw Error(`Failed to find entry for "${i}" when searching text "${r}"`);
			let s = `"${i}" should be replaced with "${o.replacement}" (${o.description}) in telephone number`, c = n + a.index, l = c + i.length, u = U(t.location, c, l), d = o;
			this.report(e, s, u, d);
		}
	}
};
function _p(e, t) {
	return !!e.getAttribute(t)?.valueMatches(/.+/, !0);
}
function vp(e) {
	return !e.is("input") || e.hasAttribute("value") ? !1 : !!e.getAttribute("type")?.valueMatches(/submit|reset/, !1);
}
function yp(e) {
	return os(e) ? e.isDynamic || e.textContent.trim() !== "" : !1;
}
function bp(e) {
	return qs(e) ? e.childNodes.some((e) => yp(e)) || _p(e, "aria-label") || _p(e, "aria-labelledby") || e.is("img") && _p(e, "alt") || e.is("selectedcontent") || vp(e) ? !0 : e.childElements.some((e) => bp(e)) : !1;
}
var xp = class e extends K {
	documentation(e) {
		let t = {
			description: "The textual content for this element is not valid.",
			url: "https://html-validate.org/rules/text-content.html"
		};
		switch (e.textContent) {
			case ja.NONE:
				t.description = `The \`<${e.tagName}>\` element must not have textual content.`;
				break;
			case ja.REQUIRED:
				t.description = `The \`<${e.tagName}>\` element must have textual content.`;
				break;
			case ja.ACCESSIBLE:
				t.description = `The \`<${e.tagName}>\` element must have accessible text.`;
				break;
		}
		return t;
	}
	static filter(e) {
		let { target: t } = e;
		if (!t.meta) return !1;
		let { textContent: n } = t.meta;
		return !(!n || n === ja.DEFAULT);
	}
	setup() {
		this.on("element:ready", e.filter, (e) => {
			let t = e.target, { textContent: n } = t.meta;
			switch (n) {
				case ja.NONE:
					this.validateNone(t);
					break;
				case ja.REQUIRED:
					this.validateRequired(t);
					break;
				case ja.ACCESSIBLE:
					this.validateAccessible(t);
					break;
			}
		});
	}
	validateNone(e) {
		dc(e) !== cc.EMPTY_TEXT && this.reportError(e, e.meta, `${e.annotatedName} must not have text content`);
	}
	validateRequired(e) {
		dc(e) === cc.EMPTY_TEXT && this.reportError(e, e.meta, `${e.annotatedName} must have text content`);
	}
	validateAccessible(e) {
		qs(e) && (bp(e) || this.reportError(e, e.meta, `${e.annotatedName} must have accessible text`));
	}
	reportError(e, t, n) {
		this.report(e, n, null, {
			tagName: e.tagName,
			textContent: t.textContent
		});
	}
}, Sp = [
	"complementary",
	"contentinfo",
	"form",
	"banner",
	"main",
	"navigation",
	"region"
], Cp = [
	"aside",
	"footer",
	"form",
	"header",
	"main",
	"nav",
	"section",
	...Sp.map((e) => `[role="${e}"]`)
];
function wp(e, t) {
	if (!t || t instanceof H) return t;
	let n = ns(t), r = e.querySelector(n);
	return r ? r.textContent : n;
}
function Tp(e, t) {
	let n = {};
	for (let r of e) {
		let e = t(r);
		Object.hasOwn(n, e) ? n[e].push(r) : n[e] = [r];
	}
	return n;
}
function Ep(e, t) {
	let n = t.getAttribute("aria-label");
	if (n) return {
		node: t,
		text: n.value,
		location: n.keyLocation
	};
	let r = t.getAttribute("aria-labelledby");
	return r ? {
		node: t,
		text: wp(e, r.value),
		location: r.keyLocation
	} : {
		node: t,
		text: null,
		location: t.location
	};
}
function Dp(e) {
	let { node: t, text: n } = e;
	return n === null ? !(t.is("form") || t.is("section")) : !0;
}
var Op = class extends K {
	documentation() {
		return {
			description: [
				"When the same type of landmark is present more than once in the same document each must be uniquely identifiable with a non-empty and unique name.",
				"For instance, if the document has two `<nav>` elements each of them need an accessible name to be distinguished from each other.",
				"",
				"The following elements / roles are considered landmarks:",
				"",
				"  - `aside` or `[role=\"complementary\"]`",
				"  - `footer` or `[role=\"contentinfo\"]`",
				"  - `form` or `[role=\"form\"]`",
				"  - `header` or `[role=\"banner\"]`",
				"  - `main` or `[role=\"main\"]`",
				"  - `nav` or `[role=\"navigation\"]`",
				"  - `section` or `[role=\"region\"]`",
				"",
				"To fix this either:",
				"",
				"  - Add `aria-label`.",
				"  - Add `aria-labelledby`.",
				"  - Remove one of the landmarks."
			].join("\n"),
			url: "https://html-validate.org/rules/unique-landmark.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let { document: t } = e, n = Tp(t.querySelectorAll(Cp.join(",")).filter((e) => typeof e.role == "string" && Sp.includes(e.role)), (e) => e.role);
			for (let e of Object.values(n)) {
				if (e.length <= 1) continue;
				let n = e.map((e) => Ep(t, e)), r = n.filter(Dp);
				for (let e of r) {
					if (e.text instanceof H) continue;
					let t = n.filter((t) => t.text === e.text).length > 1;
					if (!e.text || t) {
						let t = e.location;
						this.report({
							node: e.node,
							message: "Landmarks must have a non-empty and unique accessible name (aria-label or aria-labelledby)",
							location: t
						});
					}
				}
			}
		});
	}
}, kp = {
	ignoreCase: !1,
	requireSemicolon: !0
}, Ap = /&(?:[\da-z]+|#x?[\da-f]+)([^\da-z]|$)/gi, jp = wt.map((e) => e.toLowerCase());
function Mp(e) {
	return e.startsWith("&#");
}
function Np(e, t) {
	let n = t.match.index ?? 0;
	return e !== -1 && n > e;
}
function Pp(e, t, n) {
	let r = n.index ?? 0;
	return U(e, r, r + t.length);
}
function Fp(e, t) {
	let n;
	return n = e.terminated ? `Unrecognized character reference \`${e.entity}\`.` : `Character reference \`${e.entity}\` must be terminated by a semicolon.`, [
		n,
		"HTML5 defines a set of [valid character references](https://html.spec.whatwg.org/multipage/named-characters.html) but this is not a valid one.",
		"",
		"Ensure that:",
		"",
		"1. The character is one of the listed names.",
		...t.ignoreCase ? [] : ["1. The case is correct (names are case sensitive)."],
		...t.requireSemicolon ? ["1. The name is terminated with a `;`."] : []
	].join("\n");
}
var Ip = class extends K {
	constructor(e) {
		super({
			...kp,
			...e
		});
	}
	static schema() {
		return {
			ignoreCase: { type: "boolean" },
			requireSemicolon: { type: "boolean" }
		};
	}
	documentation(e) {
		return {
			description: Fp(e, this.options),
			url: "https://html-validate.org/rules/unrecognized-char-ref.html"
		};
	}
	setup() {
		this.on("element:ready", (e) => {
			let t = e.target;
			if (t.textType === "text") for (let e of t.childNodes) e.nodeType === W.TEXT_NODE && this.findCharacterReferences(t, e.textContent, e.location, { isAttribute: !1 });
		}), this.on("attr", (e) => {
			e.value && this.findCharacterReferences(e.target, e.value.toString(), e.valueLocation, { isAttribute: !0 });
		});
	}
	get entities() {
		return this.options.ignoreCase ? jp : wt;
	}
	findCharacterReferences(e, t, n, { isAttribute: r }) {
		let i = t.search(/[#?]/);
		for (let a of this.getMatches(t)) {
			let t = r && Np(i, a);
			this.validateCharacterReference(e, n, a, { allowUnterminated: t });
		}
	}
	validateCharacterReference(e, t, n, { allowUnterminated: r }) {
		let { requireSemicolon: i } = this.options, { match: a, entity: o, raw: s, terminated: c } = n;
		if (Mp(o) || !c && r) return;
		let l = this.entities.includes(o);
		if (l && (c || !i)) return;
		if (!c) {
			if (l || this.entities.includes(`${o};`)) {
				let n = Pp(t, o, a), r = {
					entity: s,
					terminated: !1
				};
				this.report(e, "Character reference \"{{ entity }}\" must be terminated by a semicolon", n, r);
			}
			return;
		}
		let u = Pp(t, o, a), d = {
			entity: s,
			terminated: !0
		};
		this.report(e, "Unrecognized character reference \"{{ entity }}\"", u, d);
	}
	*getMatches(e) {
		let t;
		do
			if (t = Ap.exec(e), t) {
				let e = t[1], n = e === ";", r = e !== ";" && e.length > 0 ? t[0].slice(0, -1) : t[0];
				this.options.ignoreCase ? yield {
					match: t,
					entity: r.toLowerCase(),
					raw: r,
					terminated: n
				} : yield {
					match: t,
					entity: r,
					raw: r,
					terminated: n
				};
			}
		while (t);
	}
}, Lp = [
	"section",
	"hint",
	"contact",
	"field1",
	"field2",
	"webauthn"
], Rp = /* @__PURE__ */ new Set(/* @__PURE__ */ "name.honorific-prefix.given-name.additional-name.family-name.honorific-suffix.nickname.username.new-password.current-password.one-time-code.organization-title.organization.street-address.address-line1.address-line2.address-line3.address-level4.address-level3.address-level2.address-level1.country.country-name.postal-code.cc-name.cc-given-name.cc-additional-name.cc-family-name.cc-number.cc-exp.cc-exp-month.cc-exp-year.cc-csc.cc-type.transaction-currency.transaction-amount.language.bday.bday-day.bday-month.bday-year.sex.url.photo".split(".")), zp = /* @__PURE__ */ new Set([
	"tel",
	"tel-country-code",
	"tel-national",
	"tel-area-code",
	"tel-local",
	"tel-local-prefix",
	"tel-local-suffix",
	"tel-extension",
	"email",
	"impp"
]), Bp = {
	name: "text",
	"honorific-prefix": "text",
	"given-name": "text",
	"additional-name": "text",
	"family-name": "text",
	"honorific-suffix": "text",
	nickname: "text",
	username: "username",
	"new-password": "password",
	"current-password": "password",
	"one-time-code": "password",
	"organization-title": "text",
	organization: "text",
	"street-address": "multiline",
	"address-line1": "text",
	"address-line2": "text",
	"address-line3": "text",
	"address-level4": "text",
	"address-level3": "text",
	"address-level2": "text",
	"address-level1": "text",
	country: "text",
	"country-name": "text",
	"postal-code": "text",
	"cc-name": "text",
	"cc-given-name": "text",
	"cc-additional-name": "text",
	"cc-family-name": "text",
	"cc-number": "text",
	"cc-exp": "month",
	"cc-exp-month": "numeric",
	"cc-exp-year": "numeric",
	"cc-csc": "text",
	"cc-type": "text",
	"transaction-currency": "text",
	"transaction-amount": "numeric",
	language: "text",
	bday: "date",
	"bday-day": "numeric",
	"bday-month": "numeric",
	"bday-year": "numeric",
	sex: "text",
	url: "url",
	photo: "url",
	tel: "tel",
	"tel-country-code": "text",
	"tel-national": "text",
	"tel-area-code": "text",
	"tel-local": "text",
	"tel-local-prefix": "text",
	"tel-local-suffix": "text",
	"tel-extension": "text",
	email: "username",
	impp: "url"
}, Vp = [
	"checkbox",
	"radio",
	"file",
	"submit",
	"image",
	"reset",
	"button"
];
function Hp(e) {
	return e.startsWith("section-");
}
function Up(e) {
	return e === "shipping" || e === "billing";
}
function Wp(e) {
	return Rp.has(e);
}
function Gp(e) {
	return [
		"home",
		"work",
		"mobile",
		"fax",
		"pager"
	].includes(e);
}
function Kp(e) {
	return zp.has(e);
}
function qp(e) {
	return e === "webauthn";
}
function Jp(e) {
	return Hp(e) ? "section" : Up(e) ? "hint" : Wp(e) ? "field1" : Kp(e) ? "field2" : Gp(e) ? "contact" : qp(e) ? "webauthn" : null;
}
function Yp(e) {
	let t = [
		"text",
		"multiline",
		"password",
		"url",
		"username",
		"tel",
		"numeric",
		"month",
		"date"
	];
	return {
		hidden: t,
		text: t.filter((e) => e !== "multiline"),
		search: t.filter((e) => e !== "multiline"),
		password: ["password"],
		url: ["url"],
		email: ["username"],
		tel: ["tel"],
		number: ["numeric"],
		month: ["month"],
		date: ["date"]
	}[e] ?? [];
}
function Xp(e, t) {
	return e.is("input") ? Vp.includes(t) : !1;
}
function Zp(e) {
	switch (e.msg) {
		case 0: return "autocomplete attribute cannot be used on {{ what }}";
		case 1: return "\"{{ value }}\" cannot be used on {{ what }}";
		case 2: return "\"{{ second }}\" must appear before \"{{ first }}\"";
		case 3: return "\"{{ token }}\" is not a valid autocomplete token or field name";
		case 4: return "\"{{ second }}\" cannot be combined with \"{{ first }}\"";
		case 5: return "autocomplete attribute is missing field name";
	}
}
function Qp(e) {
	switch (e.msg) {
		case 0: return [
			`\`autocomplete\` attribute cannot be used on \`${e.what}\``,
			"",
			"The following input types cannot use the `autocomplete` attribute:",
			"",
			...Vp.map((e) => `- \`${e}\``)
		].join("\n");
		case 1: {
			let t = `\`"${e.value}"\` cannot be used on \`${e.what}\``;
			if (e.type === "form") return [
				t,
				"",
				"The `<form>` element can only use the values `\"on\"` and `\"off\"`."
			].join("\n");
			if (e.type === "hidden") return [
				t,
				"",
				"`<input type=\"hidden\">` cannot use the values `\"on\"` and `\"off\"`."
			].join("\n");
			let n = Yp(e.type), r = Bp[e.value];
			return [
				t,
				"",
				`\`${e.what}\` allows autocomplete fields from the following group${n.length > 1 ? "s" : ""}:`,
				"",
				...n.map((e) => `- ${e}`),
				"",
				`The field \`"${e.value}"\` belongs to the group /${r}/ which cannot be used with this input type.`
			].join("\n");
		}
		case 2: return [
			`\`"${e.second}"\` must appear before \`"${e.first}"\``,
			"",
			"The autocomplete tokens must appear in the following order:",
			"",
			"- Optional section name (`section-` prefix).",
			"- Optional `shipping` or `billing` token.",
			"- Optional `home`, `work`, `mobile`, `fax` or `pager` token (for fields supporting it).",
			"- Field name",
			"- Optional `webauthn` token."
		].join("\n");
		case 3: return `\`"${e.token}"\` is not a valid autocomplete token or field name`;
		case 4: return `\`"${e.second}"\` cannot be combined with \`"${e.first}"\``;
		case 5: return "Autocomplete attribute is missing field name";
	}
}
var $p = class extends K {
	documentation(e) {
		return {
			description: Qp(e),
			url: "https://html-validate.org/rules/valid-autocomplete.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let { document: t } = e, n = t.querySelectorAll("[autocomplete]");
			for (let e of n) {
				let t = e.getAttribute("autocomplete");
				if (t.value === null || t.value instanceof H) continue;
				let n = t.valueLocation, r = t.value.toLowerCase(), i = new G(r, n);
				i.length !== 0 && this.validate(e, r, i, t.keyLocation, n);
			}
		});
	}
	validate(e, t, n, r, i) {
		switch (e.tagName) {
			case "form":
				this.validateFormAutocomplete(e, t, i);
				break;
			case "input":
			case "textarea":
			case "select":
				this.validateControlAutocomplete(e, n, r);
				break;
		}
	}
	validateControlAutocomplete(e, t, n) {
		let r = e.getAttributeValue("type") ?? "text";
		if (Xp(e, r)) {
			let t = {
				msg: 0,
				what: `<input type="${r}">`
			};
			this.report({
				node: e,
				message: Zp(t),
				location: n,
				context: t
			});
			return;
		}
		if (t.includes("on") || t.includes("off")) {
			let n = r === "hidden" ? "anchor" : "expectation";
			this.validateOnOff(e, n, t);
			return;
		}
		this.validateTokens(e, t, n);
	}
	validateFormAutocomplete(e, t, n) {
		let r = t.trim();
		if (["on", "off"].includes(r)) return;
		let i = {
			msg: 1,
			type: "form",
			value: r,
			what: "<form>"
		};
		this.report({
			node: e,
			message: Zp(i),
			location: n,
			context: i
		});
	}
	validateOnOff(e, t, n) {
		let r = n.findIndex((e) => e === "on" || e === "off"), i = n.item(r), a = n.location(r);
		if (n.length > 1) {
			let t = {
				msg: 4,
				first: n.item(r > 0 ? 0 : 1),
				second: i
			};
			this.report({
				node: e,
				message: Zp(t),
				location: a,
				context: t
			});
		}
		switch (t) {
			case "expectation": return;
			case "anchor": {
				let t = {
					msg: 1,
					type: "hidden",
					value: i,
					what: "<input type=\"hidden\">"
				};
				this.report({
					node: e,
					message: Zp(t),
					location: n.location(0),
					context: t
				});
			}
		}
	}
	validateTokens(e, t, n) {
		let r = [];
		for (let { item: n, location: i } of t.iterator()) {
			let t = Jp(n);
			if (t) r.push(t);
			else {
				let t = {
					msg: 3,
					token: n
				};
				this.report({
					node: e,
					message: Zp(t),
					location: i,
					context: t
				});
				return;
			}
		}
		let i = r.map((e) => e === "field1" || e === "field2");
		this.validateFieldPresence(e, t, i, n), this.validateContact(e, t, r), this.validateOrder(e, t, r), this.validateControlGroup(e, t, i);
	}
	validateFieldPresence(e, t, n, r) {
		let i = n.filter(Boolean).length;
		if (i === 0) {
			let t = { msg: 5 };
			this.report({
				node: e,
				message: Zp(t),
				location: r,
				context: t
			});
		} else if (i > 1) {
			let r = n.indexOf(!0), i = n.lastIndexOf(!0), a = {
				msg: 4,
				first: t.item(r),
				second: t.item(i)
			};
			this.report({
				node: e,
				message: Zp(a),
				location: t.location(i),
				context: a
			});
		}
	}
	validateContact(e, t, n) {
		if (!n.includes("contact") || !n.includes("field1")) return;
		let r = n.indexOf("field1"), i = n.indexOf("contact"), a = {
			msg: 4,
			first: t.item(r),
			second: t.item(i)
		};
		this.report({
			node: e,
			message: Zp(a),
			location: t.location(i),
			context: a
		});
	}
	validateOrder(e, t, n) {
		let r = n.map((e) => Lp.indexOf(e));
		for (let n = 0; n < r.length - 1; n++) {
			if (r[0] <= r[n + 1]) continue;
			let i = {
				msg: 2,
				first: t.item(n),
				second: t.item(n + 1)
			};
			this.report({
				node: e,
				message: Zp(i),
				location: t.location(n + 1),
				context: i
			});
		}
	}
	validateControlGroup(e, t, n) {
		if (n.filter(Boolean).length === 0 || !e.is("input")) return;
		let r = e.getAttribute("type")?.value ?? "text";
		if (r instanceof H) return;
		let i = Yp(r), a = n.indexOf(!0), o = t.item(a), s = Bp[o];
		if (!i.includes(s)) {
			let n = {
				msg: 1,
				type: r,
				value: o,
				what: `<input type="${r}">`
			};
			this.report({
				node: e,
				message: Zp(n),
				location: t.location(a),
				context: n
			});
		}
	}
};
function em(e) {
	let { meta: t } = e;
	return t ? !!t.labelable : !0;
}
var tm = class extends K {
	documentation() {
		return {
			description: "The `<label>` `for` attribute must reference a labelable form control.",
			url: "https://html-validate.org/rules/valid-for.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let { document: t } = e;
			for (let e of t.querySelectorAll("label[for]")) {
				let n = e.getAttribute("for");
				if (!uo(n) || !n.value) continue;
				let r = ns(n.value), i = t.querySelector(r);
				i && (em(i) || this.report({
					node: e,
					message: "<label> \"for\" attribute must reference a labelable form control",
					location: n.valueLocation
				}));
			}
		});
	}
}, nm = { relaxed: !1 }, rm = class extends K {
	constructor(e) {
		super({
			...nm,
			...e
		});
	}
	static schema() {
		return { relaxed: { type: "boolean" } };
	}
	documentation(e) {
		let { relaxed: t } = this.options, { kind: n, id: r } = e, i = this.messages[n].replace("\"{{ id }}\"", "`{{ id }}`").replace("id", "ID").replace(/^./, (e) => e.toUpperCase()), a = t ? [] : ["  - ID must begin with a letter", "  - ID must only contain letters, digits, `-` and `_`"];
		return {
			description: [
				`${vc(i, { id: r })}.`,
				"",
				"Under the current configuration the following rules are applied:",
				"",
				"  - ID must not be empty",
				"  - ID must not contain any whitespace characters",
				...a
			].join("\n"),
			url: "https://html-validate.org/rules/valid-id.html"
		};
	}
	setup() {
		this.on("attr", this.isRelevant, (e) => {
			let { value: t } = e;
			if (t === null || t instanceof H) return;
			if (t === "") {
				let n = {
					kind: 1,
					id: t
				};
				this.report(e.target, this.messages[n.kind], e.location, n);
				return;
			}
			if (/\s/.test(t)) {
				let n = {
					kind: 2,
					id: t
				};
				this.report(e.target, this.messages[n.kind], e.valueLocation, n);
				return;
			}
			let { relaxed: n } = this.options;
			if (!n) {
				if ((/* @__PURE__ */ RegExp("^\\P{L}", "u")).test(t)) {
					let n = {
						kind: 3,
						id: t
					};
					this.report(e.target, this.messages[n.kind], e.valueLocation, n);
					return;
				}
				if (/[^\p{L}\p{N}_-]/u.test(t)) {
					let n = {
						kind: 4,
						id: t
					};
					this.report(e.target, this.messages[n.kind], e.valueLocation, n);
				}
			}
		});
	}
	get messages() {
		return {
			1: "element id \"{{ id }}\" must not be empty",
			2: "element id \"{{ id }}\" must not contain whitespace",
			3: "element id \"{{ id }}\" must begin with a letter",
			4: "element id \"{{ id }}\" must only contain letters, digits, dash and underscore characters"
		};
	}
	isRelevant(e) {
		return e.key === "id";
	}
}, im = class extends K {
	documentation(e) {
		let t = {
			description: "HTML void elements cannot have any content and must not have content or end tag.",
			url: "https://html-validate.org/rules/void-content.html"
		};
		return e && (t.description = `<${e}> is a void element and must not have content or end tag.`), t;
	}
	setup() {
		this.on("tag:end", (e) => {
			let t = e.target;
			t && t.voidElement && t.closed === W.CLOSED_END_TAG && this.report(null, `End tag for <${t.tagName}> must be omitted`, t.location, t.tagName);
		});
	}
}, am = { style: "omit" }, om = class extends K {
	style;
	constructor(e) {
		super({
			...am,
			...e
		}), this.style = sm(this.options.style);
	}
	static schema() {
		return { style: {
			enum: [
				"omit",
				"selfclose",
				"selfclosing"
			],
			type: "string"
		} };
	}
	documentation(e) {
		let [t, n] = cm(e.style);
		return {
			description: `The current configuration requires void elements to ${t}, use <${e.tagName}${n}> instead.`,
			url: "https://html-validate.org/rules/void-style.html"
		};
	}
	setup() {
		let { style: e } = this, t = {
			1: this.validateOmitted.bind(this),
			2: this.validateSelfClosed.bind(this)
		}[e];
		this.on("tag:end", (e) => {
			let n = e.previous;
			n.meta && t(n);
		});
	}
	validateOmitted(e) {
		e.voidElement && e.closed === W.CLOSED_VOID_SELF_CLOSED && this.reportError(e, `Expected omitted end tag <${e.tagName}> instead of self-closing element <${e.tagName}/>`);
	}
	validateSelfClosed(e) {
		e.voidElement && e.closed === W.CLOSED_VOID_OMITTED && this.reportError(e, `Expected self-closing element <${e.tagName}/> instead of omitted end-tag <${e.tagName}>`);
	}
	reportError(e, t) {
		let n = {
			style: this.style,
			tagName: e.tagName
		};
		super.report(e, t, null, n);
	}
};
function sm(e) {
	switch (e) {
		case "omit": return 1;
		case "selfclose":
		case "selfclosing": return 2;
		/* istanbul ignore next: covered by schema validation */
		default: throw Error(`Invalid style "${e}" for "void-style" rule`);
	}
}
function cm(e) {
	switch (e) {
		case 1: return ["omit end tag", ""];
		case 2: return ["be self-closed", "/"];
		// istanbul ignore next: will only happen if new styles are added, otherwise this isn't reached
		default: throw Error("Unknown style");
	}
}
var lm = class extends K {
	documentation() {
		return {
			description: "WCAG 2.1 requires each `<a href>` anchor link to have a text describing the purpose of the link using either plain text or an `<img>` with the `alt` attribute set.",
			url: "https://html-validate.org/rules/wcag/h30.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let t = e.document.querySelectorAll("a");
			for (let e of t) {
				if (!e.hasAttribute("href") || !qs(e) || dc(e, { ignoreHiddenRoot: !0 }) !== cc.EMPTY_TEXT || e.querySelectorAll("img").some((e) => pc(e))) continue;
				let t = e.querySelectorAll("[aria-label]");
				mc(e) || t.some((e) => mc(e)) || this.report(e, "Anchor link must have a text describing its purpose");
			}
		});
	}
}, um = class extends K {
	documentation() {
		return {
			description: "WCAG 2.1 requires each `<form>` element to have at least one submit button.",
			url: "https://html-validate.org/rules/wcag/h32.html"
		};
	}
	setup() {
		let e = this.getTagsWithProperty("form").join(","), t = this.getTagsWithProperty("submitButton").join(",");
		this.on("dom:ready", (n) => {
			let { document: r } = n, i = r.querySelectorAll(e);
			for (let e of i) pm(e, t) || mm(r, e) || this.report(e, `<${e.tagName}> element must have a submit button`);
		});
	}
};
function dm(e) {
	return !!e.meta?.submitButton;
}
function fm(e, t) {
	return !!t.getAttribute("form")?.valueMatches(e, !0);
}
function pm(e, t) {
	return e.querySelectorAll(t).filter(dm).filter((e) => !e.hasAttribute("form")).length > 0;
}
function mm(e, t) {
	let { id: n } = t;
	return n ? e.querySelectorAll("button[form],input[form]").filter(dm).filter((e) => fm(n, e)).length > 0 : !1;
}
var hm = class extends K {
	documentation() {
		return {
			description: ["WCAG 2.1 requires all images used as submit buttons to have a non-empty textual description using the `alt` attribute.", "The alt text cannot be empty (`alt=\"\"`)."].join("\n"),
			url: "https://html-validate.org/rules/wcag/h36.html"
		};
	}
	setup() {
		this.on("tag:end", (e) => {
			let t = e.previous;
			if (t.tagName === "input" && t.getAttributeValue("type") === "image" && qs(t) && !pc(t)) {
				let e = t.getAttribute("alt");
				this.report({
					node: t,
					message: "image used as submit button must have non-empty alt text",
					location: e ? e.keyLocation : t.location
				});
			}
		});
	}
}, gm = {
	allowEmpty: !0,
	alias: []
}, _m = class extends K {
	constructor(e) {
		super({
			...gm,
			...e
		}), Array.isArray(this.options.alias) || (this.options.alias = [this.options.alias]);
	}
	static schema() {
		return {
			alias: { anyOf: [{
				items: { type: "string" },
				type: "array"
			}, { type: "string" }] },
			allowEmpty: { type: "boolean" }
		};
	}
	documentation() {
		return {
			description: "Both HTML5 and WCAG 2.0 requires images to have a alternative text for each image.",
			url: "https://html-validate.org/rules/wcag/h37.html"
		};
	}
	setup() {
		this.on("dom:ready", (e) => {
			let { document: t } = e, n = t.querySelectorAll("img");
			for (let e of n) this.validateNode(e);
		});
	}
	validateNode(e) {
		if (!qs(e) || e.getAttributeValue("alt") || e.hasAttribute("alt") && this.options.allowEmpty) return;
		for (let t of this.options.alias) if (e.getAttribute(t)) return;
		let t = e.annotatedName;
		if (e.hasAttribute("alt")) {
			let n = e.getAttribute("alt");
			this.report(e, `${t} cannot have empty "alt" attribute`, n.keyLocation);
		} else this.report(e, `${t} is missing required "alt" attribute`, e.location);
	}
}, vm = { strict: !1 }, { enum: ym } = St.th.attributes.scope, bm = O(ym), xm = 0, Sm = 1;
function Cm(e) {
	return {
		rows: e.length,
		cols: e[0].length
	};
}
function wm(e) {
	if (e.querySelector("> tr > [headers], > tbody > tr > [headers]")) return !1;
	let t = e.querySelectorAll("> tr, > thead > tr, > tbody > tr");
	if (t.length === 0) return !1;
	let n = t.map((e) => e.querySelectorAll("> *").map((e) => e.is("th") ? Sm : xm));
	if (n[0].length === 0) return !1;
	let r = n[0].length;
	if (n.some((e) => e.length !== r)) return !1;
	let i = Cm(n), a = n.map((e) => e.reduce((e, t) => e + t, 0)), o = Array(i.cols).fill(0).map((e, t) => n.reduce((e, n) => e + n[t], 0)), [s, ...c] = a;
	if (s === i.cols && c.every((e) => e === 0)) return !0;
	let [l, ...u] = o, d = !!e.querySelector("> thead");
	return !!(l === i.rows && u.every((e) => e === 0) && !d);
}
var Tm = {
	"allowed-links": Oc,
	"area-alt": Nc,
	"aria-hidden-body": Pc,
	"aria-label-misuse": Rc,
	"attr-case": Vc,
	"attr-delimiter": xl,
	"attr-pattern": El,
	"attr-quotes": Al,
	"attr-spacing": Ml,
	"attribute-allowed-values": Pl,
	"attribute-boolean-style": Il,
	"attribute-empty-style": Bl,
	"attribute-misuse": Kl,
	"autocomplete-password": Xl,
	"class-pattern": iu,
	"close-attr": au,
	"close-order": cu,
	deprecated: uu,
	"deprecated-class": vu,
	"deprecated-rule": yu,
	"doctype-html": bu,
	"doctype-style": Su,
	"element-case": wu,
	"element-name": Eu,
	"element-permitted-content": Au,
	"element-permitted-occurrences": ju,
	"element-permitted-order": Mu,
	"element-permitted-parent": zu,
	"element-required-ancestor": Hu,
	"element-required-attributes": Gu,
	"element-required-content": qu,
	"empty-heading": Xu,
	"empty-title": Zu,
	"form-dup-name": ld,
	"heading-level": md,
	"hidden-focusable": yd,
	"id-pattern": Sd,
	"input-attributes": Td,
	"input-missing-label": Pd,
	"long-title": Rd,
	"map-dup-name": Bd,
	"map-id-name": Ud,
	"meta-refresh": Gd,
	"missing-doctype": qd,
	"multiple-labeled-controls": Jd,
	"name-pattern": Zd,
	"no-abstract-role": ef,
	"no-autoplay": nf,
	"no-conditional-comment": rf,
	"no-deprecated-attr": af,
	"no-dup-attr": of,
	"no-dup-class": sf,
	"no-dup-id": lf,
	"no-implicit-button-type": ff,
	"no-implicit-input-type": hf,
	"no-implicit-close": pf,
	"no-inline-style": _f,
	"no-missing-references": yf,
	"no-multiple-main": bf,
	"no-raw-characters": Ef,
	"no-redundant-aria-label": Of,
	"no-redundant-for": kf,
	"no-redundant-role": jf,
	"no-self-closing": Pf,
	"no-style-tag": Lf,
	"no-trailing-whitespace": Rf,
	"no-unknown-attributes": Vf,
	"no-unknown-elements": Uf,
	"no-unused-disable": Wf,
	"no-utf8-bom": Gf,
	"prefer-button": Yf,
	"prefer-native-element": Zf,
	"prefer-tbody": Qf,
	"require-csp-nonce": ep,
	"require-sri": sp,
	"script-element": cp,
	"script-type": up,
	"svg-focusable": dp,
	"tel-non-breaking": gp,
	"text-content": xp,
	"unique-landmark": Op,
	"unrecognized-char-ref": Ip,
	"valid-autocomplete": $p,
	"valid-for": tm,
	"valid-id": rm,
	"void-content": im,
	"void-style": om,
	"wcag/h30": lm,
	"wcag/h32": um,
	"wcag/h36": hm,
	"wcag/h37": _m,
	"wcag/h63": class extends K {
		constructor(e) {
			super({
				...vm,
				...e
			});
		}
		static schema() {
			return { strict: { type: "boolean" } };
		}
		documentation() {
			return {
				description: "H63: Using the scope attribute to associate header cells and data cells in data tables",
				url: "https://html-validate.org/rules/wcag/h63.html"
			};
		}
		setup() {
			let { strict: e } = this.options;
			this.on("element:ready", (t) => {
				let n = t.target;
				n.is("table") && (e || !wm(n)) && this.validateTable(n);
			});
		}
		validateTable(e) {
			for (let t of e.querySelectorAll("th")) {
				let e = t.getAttribute("scope"), n = e?.value;
				if (n instanceof H || n && ym.includes(n)) continue;
				let r = `<th> element must have a valid scope attribute: ${bm}`, i = e?.valueLocation ?? e?.keyLocation ?? t.location;
				this.report(t, r, i);
			}
		}
	},
	"wcag/h67": class extends K {
		documentation() {
			return {
				description: "A decorative image cannot have a title attribute. Either remove `title` or add a descriptive `alt` text.",
				url: "https://html-validate.org/rules/wcag/h67.html"
			};
		}
		setup() {
			this.on("tag:end", (e) => {
				let t = e.target;
				if (t?.tagName !== "img") return;
				let n = t.getAttribute("title");
				if (!n || n.value === "") return;
				let r = t.getAttributeValue("alt");
				r && r !== "" || this.report(t, "<img> with empty alt text cannot have title attribute", n.keyLocation);
			});
		}
	},
	"wcag/h71": class extends K {
		documentation() {
			return {
				description: "H71: Providing a description for groups of form controls using fieldset and legend elements",
				url: "https://html-validate.org/rules/wcag/h71.html"
			};
		}
		setup() {
			this.on("dom:ready", (e) => {
				let { document: t } = e, n = t.querySelectorAll(this.selector);
				for (let e of n) this.validate(e);
			});
		}
		validate(e) {
			e.querySelectorAll("> legend").length === 0 && this.reportNode(e);
		}
		reportNode(e) {
			super.report(e, `${e.annotatedName} must have a <legend> as the first child`);
		}
		get selector() {
			return this.getTagsDerivedFrom("fieldset").join(",");
		}
	}
}, Em = {
	$schema: "http://json-schema.org/draft-06/schema#",
	$id: "https://html-validate.org/schemas/config.json",
	type: "object",
	additionalProperties: !1,
	properties: {
		$schema: { type: "string" },
		root: {
			type: "boolean",
			title: "Mark as root configuration",
			description: "If this is set to true no further configurations will be searched.",
			default: !1
		},
		extends: {
			type: "array",
			items: { type: "string" },
			title: "Configurations to extend",
			description: "Array of shareable or builtin configurations to extend."
		},
		elements: {
			type: "array",
			items: { anyOf: [{ type: "string" }, { type: "object" }] },
			title: "Element metadata to load",
			description: "Array of modules, plugins or files to load element metadata from. Use <rootDir> to refer to the folder with the package.json file.",
			examples: [[
				"html-validate:recommended",
				"plugin:recommended",
				"module",
				"./local-file.json"
			]]
		},
		plugins: {
			type: "array",
			items: { anyOf: [{ type: "string" }, { type: "object" }] },
			title: "Plugins to load",
			description: "Array of plugins load. Use <rootDir> to refer to the folder with the package.json file.",
			examples: [["my-plugin", "./local-plugin"]]
		},
		transform: {
			type: "object",
			additionalProperties: { anyOf: [{ type: "string" }, { function: !0 }] },
			title: "File transformations to use.",
			description: "Object where key is regular expression to match filename and value is name of transformer or a function.",
			examples: [{
				"^.*\\.foo$": "my-transformer",
				"^.*\\.bar$": "my-plugin",
				"^.*\\.baz$": "my-plugin:named"
			}]
		},
		rules: {
			type: "object",
			patternProperties: { ".*": { anyOf: [
				{ enum: [
					0,
					1,
					2,
					"off",
					"warn",
					"error"
				] },
				{
					type: "array",
					minItems: 1,
					maxItems: 1,
					items: [{ enum: [
						0,
						1,
						2,
						"off",
						"warn",
						"error"
					] }]
				},
				{
					type: "array",
					minItems: 2,
					maxItems: 2,
					items: [{ enum: [
						0,
						1,
						2,
						"off",
						"warn",
						"error"
					] }, {}]
				}
			] } },
			title: "Rule configuration.",
			description: "Enable/disable rules, set severity. Some rules have additional configuration like style or patterns to use.",
			examples: [{
				foo: "error",
				bar: "off",
				baz: ["error", { style: "camelcase" }]
			}]
		}
	}
};
function Z(e) {
	return e && typeof e == "object" && "then" in e && typeof e.then == "function";
}
var Dm = {}, Om = {
	"html-validate:a11y": { rules: {
		"area-alt": ["error", { accessible: !0 }],
		"aria-hidden-body": "error",
		"aria-label-misuse": ["error", { allowAnyNamable: !1 }],
		"deprecated-rule": "warn",
		"empty-heading": "error",
		"empty-title": "error",
		"hidden-focusable": "error",
		"meta-refresh": "error",
		"multiple-labeled-controls": "error",
		"no-abstract-role": "error",
		"no-autoplay": ["error", { include: ["audio", "video"] }],
		"no-dup-id": "error",
		"no-implicit-button-type": "error",
		"no-redundant-aria-label": "error",
		"no-redundant-for": "error",
		"no-redundant-role": "error",
		"prefer-native-element": "error",
		"svg-focusable": "off",
		"text-content": "error",
		"unique-landmark": "error",
		"valid-autocomplete": "error",
		"wcag/h30": "error",
		"wcag/h32": "error",
		"wcag/h36": "error",
		"wcag/h37": "error",
		"wcag/h63": "error",
		"wcag/h67": "error",
		"wcag/h71": "error"
	} },
	"html-validate:browser": { rules: {
		"missing-doctype": "off",
		"no-inline-style": "off",
		"no-trailing-whitespace": "off",
		"attribute-boolean-style": "off",
		"attribute-empty-style": "off",
		"void-style": "off",
		"no-self-closing": "off"
	} },
	"html-validate:document": { rules: {
		"input-missing-label": "error",
		"heading-level": "error",
		"missing-doctype": "error",
		"no-missing-references": "error",
		"require-sri": "error"
	} },
	"html-validate:prettier": { rules: {
		"attr-quotes": "off",
		"doctype-style": "off",
		"void-style": "off"
	} },
	"html-validate:recommended": { rules: {
		"area-alt": ["error", { accessible: !0 }],
		"aria-hidden-body": "error",
		"aria-label-misuse": ["error", { allowAnyNamable: !1 }],
		"attr-case": "error",
		"attr-delimiter": "error",
		"attr-quotes": "error",
		"attr-spacing": "error",
		"attribute-allowed-values": "error",
		"attribute-boolean-style": "error",
		"attribute-empty-style": "error",
		"attribute-misuse": "error",
		"autocomplete-password": "error",
		"close-attr": "error",
		"close-order": "error",
		deprecated: "error",
		"deprecated-rule": "warn",
		"doctype-html": "error",
		"doctype-style": "error",
		"element-case": "error",
		"element-name": "error",
		"element-permitted-content": "error",
		"element-permitted-occurrences": "error",
		"element-permitted-order": "error",
		"element-permitted-parent": "error",
		"element-required-ancestor": "error",
		"element-required-attributes": "error",
		"element-required-content": "error",
		"empty-heading": "error",
		"empty-title": "error",
		"form-dup-name": "error",
		"hidden-focusable": "error",
		"input-attributes": "error",
		"long-title": "error",
		"map-dup-name": "error",
		"map-id-name": "error",
		"meta-refresh": "error",
		"multiple-labeled-controls": "error",
		"no-abstract-role": "error",
		"no-autoplay": ["error", { include: ["audio", "video"] }],
		"no-conditional-comment": "error",
		"no-deprecated-attr": "error",
		"no-dup-attr": "error",
		"no-dup-class": "error",
		"no-dup-id": "error",
		"no-implicit-button-type": "error",
		"no-implicit-input-type": "error",
		"no-implicit-close": "error",
		"no-inline-style": "error",
		"no-multiple-main": "error",
		"no-raw-characters": "error",
		"no-redundant-aria-label": "error",
		"no-redundant-for": "error",
		"no-redundant-role": "error",
		"no-self-closing": "error",
		"no-trailing-whitespace": "error",
		"no-utf8-bom": "error",
		"no-unused-disable": "error",
		"prefer-button": "error",
		"prefer-native-element": "error",
		"prefer-tbody": "error",
		"script-element": "error",
		"script-type": "error",
		"svg-focusable": "off",
		"tel-non-breaking": "error",
		"text-content": "error",
		"unique-landmark": "error",
		"unrecognized-char-ref": "error",
		"valid-autocomplete": "error",
		"valid-for": "error",
		"valid-id": ["error", { relaxed: !1 }],
		void: "off",
		"void-content": "error",
		"void-style": "error",
		"wcag/h30": "error",
		"wcag/h32": "error",
		"wcag/h36": "error",
		"wcag/h37": "error",
		"wcag/h63": "error",
		"wcag/h67": "error",
		"wcag/h71": "error"
	} },
	"html-validate:standard": { rules: {
		"area-alt": ["error", { accessible: !1 }],
		"aria-label-misuse": ["error", { allowAnyNamable: !0 }],
		"attr-spacing": "error",
		"attribute-allowed-values": "error",
		"attribute-misuse": "error",
		"close-attr": "error",
		"close-order": "error",
		deprecated: "error",
		"deprecated-rule": "warn",
		"doctype-html": "error",
		"element-name": "error",
		"element-permitted-content": "error",
		"element-permitted-occurrences": "error",
		"element-permitted-order": "error",
		"element-permitted-parent": "error",
		"element-required-ancestor": "error",
		"element-required-attributes": "error",
		"element-required-content": "error",
		"map-dup-name": "error",
		"map-id-name": "error",
		"multiple-labeled-controls": "error",
		"no-abstract-role": "error",
		"no-deprecated-attr": "error",
		"no-dup-attr": "error",
		"no-dup-id": "error",
		"no-multiple-main": "error",
		"no-raw-characters": ["error", { relaxed: !0 }],
		"no-unused-disable": "error",
		"script-element": "error",
		"unrecognized-char-ref": "error",
		"valid-autocomplete": "error",
		"valid-for": "error",
		"valid-id": ["error", { relaxed: !0 }],
		"void-content": "error"
	} }
}, km = class {
	metaTable;
	plugins;
	rules;
	transformers;
	original;
	cache;
	constructor(e, t) {
		let { metaTable: n, plugins: r, rules: i, transformers: a } = e;
		this.metaTable = n, this.plugins = r, this.rules = i, this.transformers = a, this.cache = /* @__PURE__ */ new Map(), this.original = t;
	}
	getConfigData() {
		return this.original;
	}
	getMetaTable() {
		return this.metaTable;
	}
	getPlugins() {
		return this.plugins;
	}
	getRules() {
		return this.rules;
	}
	canTransform(e) {
		return !!this.findTransformer(e);
	}
	findTransformer(e) {
		return this.transformers.find((t) => t.pattern.test(e)) ?? null;
	}
};
function Am(e, t) {
	return Object.hasOwn(t, e);
}
function jm(e) {
	return Am("resolveConfig", e);
}
function Mm(e) {
	return Am("resolveElements", e);
}
function Nm(e) {
	return Am("resolvePlugin", e);
}
function Pm(e) {
	return Am("resolveTransformer", e);
}
function Fm(e, t, n) {
	for (let r of e) {
		if (!jm(r)) continue;
		let i = r.resolveConfig(t, n);
		if (Z(i)) return Im(e, t, n);
		if (i) return i;
	}
	throw new V(`Failed to load configuration from "${t}"`);
}
async function Im(e, t, n) {
	for (let r of e) {
		if (!jm(r)) continue;
		let e = await r.resolveConfig(t, n);
		if (e) return e;
	}
	throw new V(`Failed to load configuration from "${t}"`);
}
function Lm(e, t, n) {
	for (let r of e) {
		if (!Mm(r)) continue;
		let i = r.resolveElements(t, n);
		if (Z(i)) return Rm(e, t, n);
		if (i) return i;
	}
	throw new V(`Failed to load elements from "${t}"`);
}
async function Rm(e, t, n) {
	for (let r of e) {
		if (!Mm(r)) continue;
		let e = await r.resolveElements(t, n);
		if (e) return e;
	}
	throw new V(`Failed to load elements from "${t}"`);
}
function zm(e, t, n) {
	for (let r of e) {
		if (!Nm(r)) continue;
		let i = r.resolvePlugin(t, n);
		if (Z(i)) return Bm(e, t, n);
		if (i) return i;
	}
	throw new V(`Failed to load plugin from "${t}"`);
}
async function Bm(e, t, n) {
	for (let r of e) {
		if (!Nm(r)) continue;
		let e = await r.resolvePlugin(t, n);
		if (e) return e;
	}
	throw new V(`Failed to load plugin from "${t}"`);
}
function Vm(e, t, n) {
	for (let r of e) {
		if (!Pm(r)) continue;
		let i = r.resolveTransformer(t, n);
		if (Z(i)) return Hm(e, t, n);
		if (i) return i;
	}
	throw new V(`Failed to load transformer from "${t}"`);
}
async function Hm(e, t, n) {
	for (let r of e) {
		if (!Pm(r)) continue;
		let e = await r.resolveTransformer(t, n);
		if (e) return e;
	}
	throw new V(`Failed to load transformer from "${t}"`);
}
var Um = (() => {
	let e = new at.default({
		strict: !0,
		strictTuples: !0,
		strictTypes: !0
	});
	return e.addMetaSchema(da), e.addKeyword(Oa), e;
})().compile(Em);
function Wm(e, t) {
	return t;
}
function Gm(e, t) {
	let n = ga(e, {
		...t,
		rules: {}
	});
	t.rules && (n.rules = ga(n.rules, t.rules, { arrayMerge: Wm }));
	let r = !!e.root || !!t.root;
	return r && (n.root = r), n;
}
function Km(e) {
	return Array.isArray(e) ? e : [e];
}
function qm(e) {
	return Object.entries(e).map(([e, t]) => {
		let n = new RegExp(e);
		return typeof t == "string" ? {
			kind: "import",
			pattern: n,
			name: t
		} : {
			kind: "function",
			pattern: n,
			function: t
		};
	});
}
var Jm = class e {
	config;
	configurations;
	resolvers;
	metaTable;
	plugins;
	transformers = [];
	static empty() {
		return new e([], {
			extends: [],
			rules: {},
			plugins: [],
			transform: {}
		});
	}
	static fromObject(e, t, n = null) {
		return this.validate(t, n), this.create(e, t);
	}
	static fromFile(e, t) {
		let n = Fm(Km(e), t, { cache: !1 });
		return Z(n) ? n.then((n) => this.fromObject(e, n, t)) : this.fromObject(e, n, t);
	}
	static validate(e, t = null) {
		if (!Um(e)) throw new Ca(
			t,
			"Invalid configuration",
			e,
			Em,
			/* istanbul ignore next: will be set when a validation error has occurred */
			Um.errors ?? []
		);
		if (e.rules) {
			let n = this.getRulesObject(e.rules);
			for (let [r, [, i]] of n) {
				let n = Tm[r], a = `/rules/${r}/1`;
				K.validateOptions(n, r, a, i, t, e);
			}
		}
	}
	static defaultConfig() {
		return new e([], Dm);
	}
	static create(t, n) {
		let r = new e(t, n), i = r.loadPlugins(r.config.plugins ?? []);
		return Z(i) ? i.then((e) => r.init(n, e)) : r.init(n, i);
	}
	init(e, t) {
		this.plugins = t, this.configurations = this.loadConfigurations(this.plugins), this.extendMeta(this.plugins);
		let n = (t) => (this.config = t, this.config.extends = [], e.rules && (this.config = Gm(this.config, { rules: e.rules })), this), r = this.extendConfig(this.config.extends ?? []);
		return Z(r) ? r.then((e) => n(e)) : n(r);
	}
	constructor(e, t) {
		let n = {
			extends: [],
			plugins: [],
			rules: {},
			transform: {}
		};
		this.config = Gm(n, t), this.configurations = /* @__PURE__ */ new Map(), this.resolvers = Km(e), this.metaTable = null, this.plugins = [], this.transformers = qm(this.config.transform ?? {});
	}
	isRootFound() {
		return !!this.config.root;
	}
	merge(t, n) {
		let r = new e(t, Gm(this.config, n.config)), i = r.loadPlugins(r.config.plugins ?? []);
		return Z(i) ? i.then((e) => (r.plugins = e, r.configurations = r.loadConfigurations(r.plugins), r.extendMeta(r.plugins), r)) : (r.plugins = i, r.configurations = r.loadConfigurations(r.plugins), r.extendMeta(r.plugins), r);
	}
	extendConfig(t) {
		if (t.length === 0) return this.config;
		let n = {};
		for (let r of t) {
			let i;
			if (this.configurations.has(r)) i = this.configurations.get(r);
			else {
				let n = e.fromFile(this.resolvers, r);
				if (Z(n)) return this.extendConfigAsync(t);
				i = n.config;
			}
			n = Gm(n, i);
		}
		return Gm(n, this.config);
	}
	async extendConfigAsync(t) {
		let n = {};
		for (let r of t) {
			let t;
			t = this.configurations.has(r) ? this.configurations.get(r) : (await e.fromFile(this.resolvers, r)).config, n = Gm(n, t);
		}
		return Gm(n, this.config);
	}
	getMetaTable() {
		if (this.metaTable) return this.metaTable;
		let e = new ao();
		for (let t of this.getPlugins()) t.elementSchema && e.extendValidationSchema(t.elementSchema);
		let t = Array.from(this.config.elements ?? ["html5"]), n = (r) => {
			let i = this.getElementsFromEntry(r);
			if (Z(i)) return i.then((r) => {
				let [i, a] = r;
				e.loadFromObject(i, a);
				let o = t.shift();
				if (o) return n(o);
			});
			let [a, o] = i;
			e.loadFromObject(a, o);
			let s = t.shift();
			if (s) return n(s);
		}, r = t.shift();
		if (r) {
			let t = n(r);
			if (Z(t)) return t.then(() => (e.init(), this.metaTable = e));
		}
		return e.init(), this.metaTable = e;
	}
	getElementsFromEntry(e) {
		if (typeof e != "string") return [e, null];
		let t = Ct[e];
		if (t) return [t, null];
		try {
			let t = Lm(this.resolvers, e, { cache: !1 });
			return Z(t) ? t.then((t) => [t, e]) : [t, e];
		} catch (t) {
			throw new q(`Failed to load elements from "${e}": ${t instanceof Error ? t.message : String(t)}`, ya(t));
		}
	}
	/* istanbul ignore next: used for testing only */
	get() {
		return { ...this.config };
	}
	getRules() {
		return e.getRulesObject(this.config.rules ?? {});
	}
	static getRulesObject(e) {
		let t = /* @__PURE__ */ new Map();
		for (let [n, r] of Object.entries(e)) {
			let e = r;
			Array.isArray(e) ? e.length === 1 && (e = [e[0], {}]) : e = [e, {}];
			let i = Ts(e[0]);
			t.set(n, [i, e[1]]);
		}
		return t;
	}
	getPlugins() {
		return this.plugins;
	}
	getTransformers() {
		return this.transformers;
	}
	loadPlugins(e) {
		let t = [], n = Array.from(e), r = (e, i) => {
			if (typeof e != "string") {
				let a = e;
				a.name ||= `:unnamedPlugin@${String(i + 1)}`, a.originalName = `:unnamedPlugin@${String(i + 1)}`, t.push(a);
				let o = n.shift();
				if (o) return r(o, i + 1);
			} else try {
				let a = zm(this.resolvers, e, { cache: !0 });
				if (Z(a)) return a.then((a) => {
					a.name ||= e, a.originalName = e, t.push(a);
					let o = n.shift();
					if (o) return r(o, i + 1);
				});
				a.name ||= e, a.originalName = e, t.push(a);
				let o = n.shift();
				if (o) return r(o, i + 1);
			} catch (t) {
				throw new q(`Failed to load plugin "${e}": ${t instanceof Error ? t.message : String(t)}`, ya(t));
			}
		}, i = n.shift();
		if (i) {
			let e = r(i, 0);
			if (Z(e)) return e.then(() => t);
		}
		return t;
	}
	loadConfigurations(t) {
		let n = /* @__PURE__ */ new Map();
		for (let [t, r] of Object.entries(Om)) e.validate(r, t), n.set(t, r);
		for (let r of t) {
			let t = Object.entries(r.configs ?? {});
			for (let [i, a] of t) a && (e.validate(a, i), n.set(`${r.name}:${i}`, a), r.name !== r.originalName && n.set(`${r.originalName}:${i}`, a));
		}
		return n;
	}
	extendMeta(e) {
		for (let t of e) {
			if (!t.elementSchema) continue;
			let { properties: e } = t.elementSchema;
			if (e) for (let [t, n] of Object.entries(e)) {
				let e = t;
				n.copyable && !Ma.includes(e) && Ma.push(e);
			}
		}
	}
	resolve() {
		let e = this.resolveData();
		return Z(e) ? e.then((e) => new km(e, this.get())) : new km(e, this.get());
	}
	resolveData() {
		let e = this.getMetaTable();
		return Z(e) ? e.then((e) => ({
			metaTable: e,
			plugins: this.getPlugins(),
			rules: this.getRules(),
			transformers: this.transformers
		})) : {
			metaTable: e,
			plugins: this.getPlugins(),
			rules: this.getRules(),
			transformers: this.transformers
		};
	}
}, Ym = class {
	_globalConfig;
	_configData;
	resolvers;
	constructor(e, t) {
		this.resolvers = e, this._configData = t, this._globalConfig = null;
	}
	setConfigData(e) {
		this._configData = e, this._globalConfig = null;
	}
	getGlobalConfig() {
		if (this._globalConfig) return this._globalConfig;
		let e = this._configData ? this.loadFromObject(this._configData) : this.defaultConfig();
		return Z(e) ? e.then((e) => (this._globalConfig = e, this._globalConfig)) : (this._globalConfig = e, this._globalConfig);
	}
	getGlobalConfigSync() {
		if (this._globalConfig) return this._globalConfig;
		let e = this._configData ? this.loadFromObject(this._configData) : this.defaultConfig();
		if (Z(e)) throw new V("Cannot load async config from sync function");
		return this._globalConfig = e, this._globalConfig;
	}
	getResolvers() {
		return this.resolvers;
	}
	async _getGlobalConfig() {
		return (await this.getGlobalConfig()).get();
	}
	empty() {
		return Jm.empty();
	}
	loadFromObject(e, t) {
		return Jm.fromObject(this.resolvers, e, t);
	}
	loadFromFile(e) {
		return Jm.fromFile(this.resolvers, e);
	}
}, Xm = [];
function Zm(e) {
	return Array.isArray(e[0]);
}
var Qm = class extends Ym {
	constructor(...e) {
		if (Zm(e)) {
			let [t, n] = e;
			super(t, n);
		} else {
			let [t] = e;
			super(Xm, t);
		}
	}
	setConfig(e) {
		this.setConfigData(e);
	}
	getConfigFor(e, t) {
		let n = this.loadFromObject(t ?? {});
		return Z(n) ? n.then((e) => this._resolveConfig(e)) : this._resolveConfig(n);
	}
	flushCache() {}
	defaultConfig() {
		return this.loadFromObject({
			extends: ["html-validate:recommended"],
			elements: ["html5"]
		});
	}
	_resolveConfig(e) {
		if (e.isRootFound()) return e.resolve();
		let t = this.getGlobalConfig();
		if (Z(t)) return t.then((t) => {
			let n = t.merge(this.resolvers, e);
			return Z(n) ? n.then((e) => e.resolve()) : n.resolve();
		});
		let n = t.merge(this.resolvers, e);
		return Z(n) ? n.then((e) => e.resolve()) : n.resolve();
	}
}, $m = class {
	listeners;
	tracker;
	constructor() {
		this.listeners = {}, this.tracker = null;
	}
	on(e, t) {
		let { listeners: n } = this, r = e.split(",").map((e) => e.trim());
		for (let e of r) {
			let r = n[e] ?? [];
			n[e] = r, r.push(t);
		}
		return () => {
			for (let e of r) {
				let r = n[e];
				this.listeners[e] = r.filter((e) => e !== t);
			}
		};
	}
	once(e, t) {
		let n = this.on(e, (e, r) => {
			t(e, r), n();
		});
		return n;
	}
	setTracker(e) {
		this.tracker = e;
	}
	trigger(e, t) {
		let { tracker: n } = this;
		if (n) {
			let r = performance.now();
			for (let n of this.getCallbacks(e)) n.call(null, e, t);
			let i = performance.now();
			n.trackEvent(e, i - r);
		} else for (let n of this.getCallbacks(e)) n.call(null, e, t);
	}
	getCallbacks(e) {
		let { listeners: t } = this, n = t[e] ?? [], r = t["*"] ?? [];
		return [...n, ...r];
	}
};
function eh(e) {
	return {
		...e,
		selector: e.selector()
	};
}
function th(e) {
	return e.length === 0 ? !1 : Z(e[0]);
}
var nh = class {
	result;
	constructor() {
		this.result = {};
	}
	static merge(e) {
		if (Z(e)) return e.then((e) => this.merge(e));
		if (th(e)) return Promise.all(e).then((e) => this.merge(e));
		let t = e.every((e) => e.valid), n = {};
		for (let t of e) for (let e of t.results) {
			let t = e.filePath;
			Object.hasOwn(n, t) ? n[t].messages = [...n[t].messages, ...e.messages] : n[t] = { ...e };
		}
		let r = Object.values(n).map((e) => (e.errorCount = rh(e.messages), e.warningCount = ih(e.messages), e));
		return {
			valid: t,
			results: r,
			errorCount: ah(r),
			warningCount: oh(r)
		};
	}
	add(e) {
		let { rule: t, message: n, severity: r, node: i, location: a, context: o } = e;
		Object.hasOwn(this.result, a.filename) || (this.result[a.filename] = []);
		let s = t.documentation(o)?.url, c = {
			ruleId: t.name,
			severity: r,
			message: n,
			offset: a.offset,
			line: a.line,
			column: a.column,
			size: a.size || 0,
			selector() {
				return i ? i.generateSelector() : null;
			}
		};
		s && (c.ruleUrl = s), o && (c.context = o), this.result[a.filename].push(c);
	}
	addManual(e, t) {
		Object.hasOwn(this.result, e) || (this.result[e] = []), this.result[e].push(t);
	}
	save(e) {
		let t = {
			valid: this.isValid(),
			results: Object.keys(this.result).map((t) => {
				let n = Array.from(this.result[t], eh).toSorted(sh), r = (e ?? []).find((e) => t === e.filename);
				return {
					filePath: t,
					messages: n,
					errorCount: rh(n),
					warningCount: ih(n),
					source: r ? r.originalData ?? r.data : null
				};
			}),
			errorCount: 0,
			warningCount: 0
		};
		return t.errorCount = ah(t.results), t.warningCount = oh(t.results), t;
	}
	isValid() {
		return Object.values(this.result).reduce((e, t) => e + rh(t), 0) === 0;
	}
};
function rh(e) {
	return e.filter((e) => e.severity === Number(ws.ERROR)).length;
}
function ih(e) {
	return e.filter((e) => e.severity === Number(ws.WARN)).length;
}
function ah(e) {
	return e.reduce((e, t) => e + t.errorCount, 0);
}
function oh(e) {
	return e.reduce((e, t) => e + t.warningCount, 0);
}
function sh(e, t) {
	return e.line < t.line ? -1 : e.line > t.line ? 1 : e.column < t.column ? -1 : +(e.column > t.column);
}
var ch = /<!(?:--)?\[(.*?)\](?:--)?>/g;
function* lh(e, t) {
	let n;
	for (; (n = ch.exec(e)) !== null;) {
		let r = n[1], i = n.index;
		yield {
			expression: r,
			location: U(t, i, i + n[0].length, e)
		};
	}
}
var uh = class extends Error {
	location;
	constructor(e, t) {
		super(t), this.name = "ParserError", this.location = e;
	}
};
function dh(e) {
	return e === !0;
}
function fh(e, t) {
	switch (t) {
		case "@meta": return dh(e.metadata);
		case "@flow": return dh(e.flow);
		case "@flow-not-meta": return dh(e.flow) && !dh(e.metadata);
		case "@sectioning": return dh(e.sectioning);
		case "@heading": return dh(e.heading);
		case "@phrasing": return dh(e.phrasing);
		case "@embedded": return dh(e.embedded);
		case "@interactive": return dh(e.interactive);
		default: return !1;
	}
}
function ph(e) {
	return e?.type === X.ATTR_VALUE;
}
function mh(e, t) {
	return e === "svg" && ["title", "desc"].includes(t);
}
function hh(e) {
	return [
		"enable",
		"disable",
		"disable-block",
		"disable-next"
	].includes(e);
}
var Q = class {
	event;
	metaTable;
	currentNamespace = "";
	dom;
	constructor(e) {
		this.event = new $m(), this.dom = null, this.metaTable = e.getMetaTable();
	}
	parseHtml(e) {
		typeof e == "string" && (e = {
			data: e,
			filename: "inline",
			line: 1,
			column: 1,
			offset: 0
		}), this.trigger("parse:begin", { location: null }), this.dom = new ys({
			filename: e.filename,
			offset: e.offset,
			line: e.line,
			column: e.column,
			size: 0
		}), this.trigger("dom:load", {
			source: e,
			location: null
		});
		let t = new yl().tokenize(e), n = this.next(t);
		for (; !n.done;) {
			let r = n.value;
			this.consume(e, r, t), n = this.next(t);
		}
		return this.dom.resolveMeta(this.metaTable), this.dom.root.cacheEnable(), this.trigger("dom:ready", {
			document: this.dom,
			source: e,
			location: null
		}), this.trigger("parse:end", { location: null }), this.dom.root;
	}
	wouldCloseElement(e, t) {
		if (!t.meta) return !1;
		let n = t.meta.implicitClosed;
		if (!n) return !1;
		let r = e.data[2], i = this.metaTable.getMetaFor(r);
		return n.some((e) => e.startsWith("@") ? i ? fh(i, e) : !1 : e === r);
	}
	getParentAfterImplicitClose(e) {
		let t = this.dom.getActive();
		for (; !t.isRootElement() && this.wouldCloseElement(e, t);) {
			let { parent: e } = t;
			if (!e) break;
			t = e;
		}
		return t;
	}
	closeOptional(e) {
		let t = this.dom.getActive();
		return t.meta ? e.data[1] ? this.closeOptionalEndTag(e, t) : this.wouldCloseElement(e, t) : !1;
	}
	canOmitEndTag(e) {
		if (!e.meta) return !1;
		let { implicitClosed: t, optionalEnd: n } = e.meta;
		return !!t?.includes(e.tagName) || !!n;
	}
	closeOptionalEndTag(e, t) {
		let n = e.data[2];
		if (t.is(n) || !this.canOmitEndTag(t)) return !1;
		let r = t.parent;
		for (; r && !r.isRootElement();) {
			if (r.is(n)) return !0;
			if (!this.canOmitEndTag(r)) return !1;
			r = r.parent;
		}
		return !1;
	}
	peekImplicitOpen(e, t) {
		if (!t?.meta?.implicitOpen) return null;
		let n = e.data[2], r = this.metaTable.getMetaFor(n);
		for (let i of t.meta.implicitOpen) if (i.for.some((e) => e.startsWith("@") ? r ? fh(r, e) : !1 : e === n)) {
			let n = this.metaTable.getMetaFor(i.open);
			return ms.createElement(i.open, e.location, {
				closed: W.CLOSED_OPEN,
				meta: n,
				parent: t
			});
		}
		return null;
	}
	consume(e, t, n) {
		switch (t.type) {
			case X.UNICODE_BOM: break;
			case X.TAG_OPEN:
				this.consumeTag(e, t, n);
				break;
			case X.WHITESPACE:
				this.trigger("whitespace", {
					text: t.data[0],
					location: t.location
				}), this.appendText(t.data[0], t.location);
				break;
			case X.DIRECTIVE:
				this.consumeDirective(t);
				break;
			case X.CONDITIONAL:
				this.consumeConditional(t);
				break;
			case X.COMMENT:
				this.consumeComment(t);
				break;
			case X.DOCTYPE_OPEN:
				this.consumeDoctype(t, n);
				break;
			case X.TEXT:
			case X.TEMPLATING:
			case X.SCRIPT:
			case X.STYLE:
				this.appendText(t.data[0], t.location);
				break;
			case X.EOF:
				this.closeTree(e, t.location);
				break;
		}
	}
	consumeTag(e, t, n) {
		let r = Array.from(this.consumeUntil(n, X.TAG_CLOSE, t.location)), i = r.at(-1), a = !t.data[1], o;
		if (a) o = this.getParentAfterImplicitClose(t);
		else {
			let e = t.data[2], n = this.dom.getActive();
			for (; !n.isRootElement() && !n.is(e);) {
				let { parent: e } = n;
				if (!e) break;
				n = e;
			}
			o = n;
		}
		let s = a ? this.peekImplicitOpen(t, o) : null, c = s ?? o, l = ms.fromTokens(t, i, c, this.metaTable, this.currentNamespace), u = !a || l.closed !== W.CLOSED_OPEN, d = l.meta?.foreign;
		for (; this.closeOptional(t);) {
			let n = this.dom.getActive();
			n.closed = W.CLOSED_IMPLICIT_CLOSED, this.closeElement(e, l, n, t.location), this.dom.popActive();
		}
		a && (s && (this.dom.pushActive(s), this.trigger("tag:start", {
			target: s,
			location: t.location
		}), this.trigger("tag:ready", {
			target: s,
			location: t.location
		})), this.dom.pushActive(l), this.trigger("tag:start", {
			target: l,
			location: t.location
		}));
		for (let t = 0; t < r.length; t++) {
			let n = r[t];
			switch (n.type) {
				case X.WHITESPACE: break;
				case X.ATTR_NAME:
					this.consumeAttribute(e, l, n, r[t + 1]);
					break;
			}
		}
		if (a && this.trigger("tag:ready", {
			target: l,
			location: i.location
		}), u) {
			let t = this.dom.getActive();
			a || (l.closed = W.CLOSED_END_TAG), this.closeElement(e, l, t, i.location);
			let n = l.tagName !== t.tagName;
			!(!a && l.voidElement) && !n && this.dom.popActive();
		} else d && this.discardForeignBody(e, l.tagName, n, t.location);
	}
	closeElement(e, t, n, r) {
		this.processElement(n, e);
		let i = {
			target: t,
			previous: n,
			location: r
		};
		this.trigger("tag:end", i), !(t && t.tagName !== n.tagName && n.closed !== W.CLOSED_IMPLICIT_CLOSED) && (n.isRootElement() || this.trigger("element:ready", {
			target: n,
			location: n.location
		}));
	}
	processElement(e, t) {
		if (e.cacheEnable(), t.hooks?.processElement) {
			let n = t.hooks.processElement, r = this.metaTable;
			n.call({ getMetaFor(e) {
				return r.getMetaFor(e);
			} }, e);
		}
	}
	discardForeignBody(e, t, n, r) {
		let i = 1, a, o;
		do {
			let [s] = Array.from(this.consumeUntil(n, X.TAG_OPEN, r)).slice(-1), [, c, l] = s.data;
			if (!c && mh(t, l)) {
				let t = this.currentNamespace;
				this.currentNamespace = "svg", this.consumeTag(e, s, n), this.consumeUntilMatchingTag(e, n, l), this.currentNamespace = t;
				continue;
			}
			if (l !== t) continue;
			o = Array.from(this.consumeUntil(n, X.TAG_CLOSE, s.location)).at(-1);
			let u = o.data[0] === "/>";
			c ? (a = s, i--) : u || i++;
		} while (i > 0);
		if (!a || !o) return;
		let s = this.dom.getActive(), c = ms.fromTokens(a, o, s, this.metaTable);
		this.closeElement(e, c, s, o.location), this.dom.popActive();
	}
	consumeAttribute(e, t, n, r) {
		let { meta: i } = t, a = this.getAttributeKeyLocation(n), o = this.getAttributeValueLocation(r), s = this.getAttributeLocation(n, r), c = ph(r), l = {
			key: n.data[1],
			value: null,
			quote: null
		};
		if (c) {
			let [, , e, t] = r.data;
			l.value = e, l.quote = t ?? null;
		}
		let u = (e) => [e];
		e.hooks?.processAttribute && (u = e.hooks.processAttribute);
		let d, f = u.call({}, l);
		d = typeof f[Symbol.iterator] == "function" ? f : [l];
		for (let e of d) {
			let n = {
				target: t,
				key: e.key,
				value: e.value,
				quote: e.quote,
				originalAttribute: e.originalAttribute,
				location: s,
				keyLocation: a,
				valueLocation: o,
				meta: i?.attributes[e.key] ?? null
			};
			this.trigger("attr", n), t.setAttribute(e.key, e.value, a, o, e.originalAttribute);
		}
	}
	getAttributeKeyLocation(e) {
		return e.location;
	}
	getAttributeValueLocation(e) {
		return e?.type !== X.ATTR_VALUE || e.data[2] === "" ? null : e.data[3] ? U(e.location, 2, -1) : U(e.location, 1);
	}
	getAttributeLocation(e, t) {
		let n = e.location, r = t?.type === X.ATTR_VALUE ? t.location : void 0;
		return {
			filename: n.filename,
			line: n.line,
			column: n.column,
			size: n.size + (r?.size ?? 0),
			offset: n.offset
		};
	}
	consumeDirective(e) {
		let [t, n, r, i, a, o, s] = e.data, c = n.includes("["), l = s.startsWith("]");
		if (c && !l) {
			this.trigger("parse:error", {
				location: U(e.location, n.length - 1, -s.length),
				message: `Missing end bracket "]" on directive "${t}"`
			});
			return;
		}
		let u = /^(.*?)(?:(\s*(?:--|:)\s*)(.*))?$/.exec(o);
		if (!u) throw Error(`Failed to parse directive "${t}"`);
		if (!hh(i)) {
			let a = n.length, o = n.length + r.length + i.length;
			this.trigger("parse:error", {
				location: U(e.location, a, -t.length + o),
				message: `Unknown directive "${i}"`
			});
			return;
		}
		let [, d, f, p] = u, m = n.length + r.length, h = m + i.length + a.length, g = h + d.length + (f || "").length, _ = U(e.location, n.length - 1, -s.length + 1), v = U(e.location, m, m + i.length), y = d ? U(e.location, h, h + d.length) : void 0, b = p ? U(e.location, g, g + p.length) : void 0;
		this.trigger("directive", {
			action: i,
			data: d,
			comment: p || "",
			location: _,
			actionLocation: v,
			optionsLocation: y,
			commentLocation: b
		});
	}
	consumeConditional(e) {
		let t = this.dom.getActive();
		this.trigger("conditional", {
			condition: e.data[1],
			location: e.location,
			parent: t
		});
	}
	consumeComment(e) {
		let t = e.data[0], n = this.dom.getActive();
		for (let r of lh(t, e.location)) this.trigger("conditional", {
			condition: r.expression,
			location: r.location,
			parent: n
		});
	}
	consumeDoctype(e, t) {
		let n = Array.from(this.consumeUntil(t, X.DOCTYPE_CLOSE, e.location)), r = n[0].data[0];
		this.dom.doctype = r, this.trigger("doctype", {
			tag: e.data[1],
			value: r,
			valueLocation: n[0].location,
			location: e.location
		});
	}
	*consumeUntil(e, t, n) {
		let r = this.next(e);
		for (; !r.done;) {
			let n = r.value;
			if (yield n, n.type === t) return;
			r = this.next(e);
		}
		throw new uh(n, `stream ended before ${X[t]} token was found`);
	}
	consumeUntilMatchingTag(e, t, n) {
		let r = 1, i = this.next(t);
		for (; !i.done;) {
			let a = i.value;
			if (this.consume(e, a, t), a.type === X.TAG_OPEN) {
				let [, e, t] = a.data;
				if (t === n && (e ? r-- : r++, r === 0)) return;
			}
			i = this.next(t);
		}
	}
	next(e) {
		let t = e.next();
		if (!t.done) {
			let e = t.value;
			this.trigger("token", {
				location: e.location,
				type: e.type,
				data: Array.from(e.data),
				token: e
			});
		}
		return t;
	}
	on(e, t) {
		return this.event.on(e, t);
	}
	once(e, t) {
		return this.event.once(e, t);
	}
	defer(e) {
		this.event.once("*", e);
	}
	trigger(e, t) {
		if (t.location === void 0) throw Error("Triggered event must contain location");
		this.event.trigger(e, t);
	}
	getEventHandler() {
		return this.event;
	}
	appendText(e, t) {
		this.dom.getActive().appendText(e, t);
	}
	closeTree(e, t) {
		let n = this.dom.root, r = this.dom.getActive();
		for (; !r.isRootElement();) r.meta?.implicitClosed || r.meta?.optionalEnd ? (r.closed = W.CLOSED_IMPLICIT_CLOSED, this.closeElement(e, n, r, t)) : this.closeElement(e, null, r, t), this.dom.popActive(), r = this.dom.getActive();
	}
}, gh = class {
	eventData;
	ruleData;
	startTime;
	accConfigTime;
	accTransformTime;
	constructor() {
		this.eventData = /* @__PURE__ */ new Map(), this.ruleData = /* @__PURE__ */ new Map(), this.startTime = performance.now(), this.accConfigTime = 0, this.accTransformTime = 0;
	}
	trackEvent(e, t) {
		let n = this.eventData.get(e);
		n ? (n.count += 1, n.time += t) : this.eventData.set(e, {
			count: 1,
			time: t
		});
	}
	trackConfig(e) {
		this.accConfigTime += e;
	}
	trackTransform(e) {
		this.accTransformTime += e;
	}
	trackRule(e, t) {
		let n = this.ruleData.get(e);
		n ? (n.count += 1, n.time += t) : this.ruleData.set(e, {
			count: 1,
			time: t
		});
	}
	getResult() {
		return {
			events: Array.from(this.eventData, ([e, { count: t, time: n }]) => ({
				event: e,
				count: t,
				time: n
			})).toSorted((e, t) => t.time - e.time),
			rules: Array.from(this.ruleData, ([e, { count: t, time: n }]) => ({
				rule: e,
				count: t,
				time: n
			})).toSorted((e, t) => t.time - e.time),
			configTime: this.accConfigTime,
			transformTime: this.accTransformTime,
			totalTime: performance.now() - this.startTime
		};
	}
};
new Set(Object.keys(Tm));
function _h(e) {
	let t = [];
	function n(e) {
		let t = "";
		return e.id && (t += `#${e.id}`), e.hasAttribute("class") && (t += `.${e.classList.join(".")}`), t;
	}
	function r(e, i, a, o) {
		let s = o === (e.parent ? e.parent.childElements.length : 0) - 1;
		if (e.parent) {
			let r = s ? "└" : "├";
			t.push(`${a}${r}\u2500\u2500 ${e.tagName}${n(e)}`);
		} else t.push("(root)");
		for (let [t, n] of e.childElements.entries()) {
			let e = i > 0 ? `${a}${s ? " " : "│"}   ` : "";
			r(n, i + 1, e, t);
		}
	}
	return r(e, 0, "", 0), t;
}
var vh = { blockerCounter: 1 };
function yh() {
	return vh.blockerCounter++;
}
var $ = class {
	report;
	config;
	ParserClass;
	availableRules;
	tracker;
	constructor(e, t, n) {
		this.report = new nh(), this.config = e, this.ParserClass = t, this.tracker = n.tracker;
		let r = this.initPlugins(this.config);
		this.availableRules = {
			...Tm,
			...r.availableRules
		};
	}
	lint(e) {
		for (let t of e) {
			let e = this.instantiateParser();
			this.tracker && e.getEventHandler().setTracker(this.tracker);
			let { rules: n } = this.setupPlugins(t, this.config, e), r = n["no-unused-disable"], i = {
				rules: n,
				reportUnused(e, t, n, i) {
					e.has(r.name) || r.reportUnused(t, n, i);
				}
			}, a = {
				filename: t.filename,
				line: 1,
				column: 1,
				offset: 0,
				size: 1
			}, o = {
				location: a,
				config: this.config,
				rules: n
			};
			e.trigger("config:ready", o);
			let { hooks: s, ...c } = t, l = {
				location: a,
				source: c
			};
			e.trigger("source:ready", l), e.on("directive", (t, n) => {
				this.processDirective(n, e, i);
			}), e.on("parse:error", (e, t) => {
				this.reportError("parser-error", t.message, t.location);
			});
			try {
				e.parseHtml(t);
			} catch (e) {
				if (e instanceof vl || e instanceof uh) this.reportError("parser-error", e.message, e.location);
				else throw e;
			}
		}
		return this.report.save(e);
	}
	dumpEvents(e) {
		let t = this.instantiateParser(), n = [];
		t.on("*", (e, t) => {
			e !== "token" && n.push({
				event: e,
				data: t
			});
		});
		for (let n of e) t.parseHtml(n);
		return n;
	}
	dumpTokens(e) {
		let t = new yl(), n = [];
		for (let r of e) for (let e of t.tokenize(r)) {
			let t = e.data[0] ?? "", r = e.location.filename, i = String(e.location.line), a = String(e.location.column);
			n.push({
				token: X[e.type],
				data: t,
				location: `${r}:${i}:${a}`
			});
		}
		return n;
	}
	dumpTree(e) {
		return _h(this.instantiateParser().parseHtml(e[0]));
	}
	getRuleDocumentation({ ruleId: e, context: t }) {
		let n = this.config.getRules().get(e);
		if (n) {
			let [, r] = n;
			return this.instantiateRule(e, r).documentation(t);
		}
		return null;
	}
	instantiateParser() {
		return new this.ParserClass(this.config);
	}
	processDirective(e, t, n) {
		let r = e.data.split(",").map((e) => e.trim()).map((e) => n.rules[e]).filter((e) => !!e), i = e.optionsLocation ?? e.location;
		switch (e.action) {
			case "enable":
				this.processEnableDirective(r, t);
				break;
			case "disable":
				this.processDisableDirective(r, t);
				break;
			case "disable-block":
				this.processDisableBlockDirective(n, r, t, e.data, i);
				break;
			case "disable-next":
				this.processDisableNextDirective(n, r, t, e.data, i);
				break;
		}
	}
	processEnableDirective(e, t) {
		for (let t of e) t.setEnabled(!0), t.getSeverity() === ws.DISABLED && t.setServerity(ws.ERROR);
		t.on("tag:start", (t, n) => {
			n.target.enableRules(e.map((e) => e.name));
		});
	}
	processDisableDirective(e, t) {
		for (let t of e) t.setEnabled(!1);
		t.on("tag:start", (t, n) => {
			n.target.disableRules(e.map((e) => e.name));
		});
	}
	processDisableBlockDirective(e, t, n, r, i) {
		let a = new Set(t.map((e) => e.name)), o = new Set(a), s = yh(), c = null;
		for (let e of t) e.block(s);
		let l = n.on("tag:start", (e, t) => {
			c ??= t.target.parent?.unique ?? null, t.target.blockRules(a, s);
		}), u = n.on("tag:end", (e, n) => {
			let r = c === null, i = c === n.previous.unique;
			if (r || i) {
				u(), l();
				for (let e of t) e.unblock(s);
			}
		});
		n.on("rule:error", (e, t) => {
			t.blockers.includes(s) && o.delete(t.ruleId);
		}), n.on("parse:end", () => {
			e.reportUnused(a, o, r, i);
		});
	}
	processDisableNextDirective(e, t, n, r, i) {
		let a = new Set(t.map((e) => e.name)), o = new Set(a), s = yh();
		for (let e of t) e.block(s);
		let c = n.on("tag:start", (e, t) => {
			t.target.blockRules(a, s);
		});
		n.on("rule:error", (e, t) => {
			t.blockers.includes(s) && o.delete(t.ruleId);
		}), n.on("parse:end", () => {
			e.reportUnused(a, o, r, i);
		}), n.once("tag:ready, tag:end, attr", () => {
			c(), n.defer(() => {
				for (let e of t) e.unblock(s);
			});
		});
	}
	initPlugins(e) {
		for (let t of e.getPlugins()) t.init && t.init();
		return { availableRules: this.initRules(e) };
	}
	initRules(e) {
		let t = {};
		for (let n of e.getPlugins()) {
			let e = Object.entries(n.rules ?? {});
			for (let [n, r] of e) r && (t[n] = r);
		}
		return t;
	}
	setupPlugins(e, t, n) {
		let r = n.getEventHandler();
		for (let n of t.getPlugins()) n.setup && n.setup(e, r);
		return { rules: this.setupRules(t, n) };
	}
	setupRules(e, t) {
		let n = {};
		for (let [r, [i, a]] of e.getRules()) n[r] = this.loadRule(r, e, i, a, t, this.report);
		return n;
	}
	loadRule(e, t, n, r, i, a) {
		let o = t.getMetaTable(), s = this.instantiateRule(e, r);
		return s.name = e, s.init(i, a, n, o), s.setTracker(this.tracker), s.setup && s.setup(), s;
	}
	instantiateRule(e, t) {
		if (this.availableRules[e]) {
			let n = this.availableRules[e];
			return new n(t);
		}
		return this.missingRule(e);
	}
	missingRule(e) {
		return new class extends K {
			setup() {
				this.on("dom:load", () => {
					this.report(null, `Definition for rule '${e}' was not found`);
				});
			}
		}();
	}
	reportError(e, t, n) {
		this.report.addManual(n.filename, {
			ruleId: e,
			severity: ws.ERROR,
			message: t,
			offset: n.offset,
			line: n.line,
			column: n.column,
			size: n.size,
			selector: () => null
		});
	}
};
function bh(e, t, n, r) {
	let i = t.find((e) => e.name === n);
	if (!i) throw new q(`No plugin named "${n}" has been loaded`);
	if (!i.transformer) throw new q("Plugin does not expose any transformers");
	if (typeof i.transformer == "function") throw new q(`Transformer "${e}" refers to named transformer but plugin exposes only unnamed, use "${n}" instead.`);
	let a = i.transformer[r];
	if (!a) throw new q(`Plugin "${n}" does not expose a transformer named "${r}".`);
	return a;
}
function xh(e, t) {
	return Vm(e, t, { cache: !0 });
}
function Sh(e, t) {
	if (!t.transformer) throw new q("Plugin does not expose any transformers");
	if (typeof t.transformer != "function") {
		if (t.transformer.default) return t.transformer.default;
		throw new q(`Transformer "${e}" refers to unnamed transformer but plugin exposes only named.`);
	}
	return t.transformer;
}
var Ch = { VERSION: 1 };
function wh(e) {
	let t = e.api ?? 0;
	if (t !== Ch.VERSION) throw new q(`Transformer uses API version ${String(t)} but only version ${String(Ch.VERSION)} is supported`);
}
function Th(e, t, n) {
	let r = /(.*):(.*)/.exec(t);
	if (r) {
		let [, e, i] = r;
		return bh(t, n, e, i);
	}
	let i = n.find((e) => e.name === t);
	return i ? Sh(t, i) : xh(e, t);
}
function Eh(e, t, n) {
	try {
		let r = Th(e, t, n);
		return Z(r) ? r.then((e) => (wh(e), e)) : (wh(r), r);
	} catch (e) {
		throw e instanceof q ? new q(`Failed to load transformer "${t}": ${e.message}`, e) : new q(`Failed to load transformer "${t}"`, ya(e));
	}
}
function Dh(e, t, n, r) {
	let i = e.get(n);
	if (i) return i;
	let a = Eh(t, n, r);
	return Z(a) ? a.then((t) => (e.set(n, t), t)) : (e.set(n, a), a);
}
function Oh(e) {
	return !!(e && typeof e == "object" && Symbol.iterator in e);
}
function kh(e) {
	return Oh(e) ? Array.from(e) : [e];
}
function Ah(e) {
	return !e.some(Z);
}
var jh = "Cannot use async transformer from sync function";
async function Mh(e, t, n, r) {
	let { cache: i } = t, a = t.findTransformer(r ?? n.filename);
	if (!a) return [n];
	let o = {
		hasChain(e) {
			return t.canTransform(e);
		},
		chain(n, r) {
			return Mh(e, t, n, r);
		}
	}, s = a.kind === "import" ? await Dh(i, e, a.name, t.getPlugins()) : a.function, c = a.kind === "import" ? a.name : a.function.name;
	try {
		let e = await s.call(o, n), t = await Promise.all(kh(e));
		for (let e of t) e.transformedBy ??= [], e.transformedBy.push(c);
		return t;
	} catch (e) {
		let t = e instanceof Error ? e.message : String(e);
		throw new ba(`When transforming "${n.filename}": ${t}`, ya(e));
	}
}
function Nh(e, t, n, r) {
	let { cache: i } = t, a = t.findTransformer(r ?? n.filename);
	if (!a) return [n];
	let o = {
		hasChain(e) {
			return t.canTransform(e);
		},
		chain(n, r) {
			return Nh(e, t, n, r);
		}
	}, s = a.kind === "import" ? Dh(i, e, a.name, t.getPlugins()) : a.function;
	if (Z(s)) throw new V(jh);
	let c = a.kind === "import" ? a.name : a.function.name;
	try {
		let e = s.call(o, n);
		if (Z(e)) throw new V(jh);
		let t = kh(e);
		if (!Ah(t)) throw new V(jh);
		for (let e of t) e.transformedBy ??= [], e.transformedBy.push(c);
		return t;
	} catch (e) {
		let t = e instanceof Error ? e.message : String(e);
		throw new ba(`When transforming "${n.filename}": ${t}`, ya(e));
	}
}
function Ph(e, t, n, r) {
	let i = n === "/dev/stdin" ? 0 : n, a = r.readFileSync(i, { encoding: "utf8" }), o = typeof a == "string" ? a : a.toString("utf8");
	return Mh(e, t, {
		data: o,
		filename: n,
		line: 1,
		column: 1,
		offset: 0,
		originalData: o
	}, n);
}
function Fh(e, t, n, r) {
	let i = n === "/dev/stdin" ? 0 : n, a = r.readFileSync(i, { encoding: "utf8" }), o = typeof a == "string" ? a : a.toString("utf8");
	return Nh(e, t, {
		data: o,
		filename: n,
		line: 1,
		column: 1,
		offset: 0,
		originalData: o
	}, n);
}
//#endregion
//#region node_modules/html-validate/dist/esm/core-browser.js
function Ih(e) {
	return !e || typeof e != "object" ? !1 : ["processAttribute", "processElement"].some((t) => Object.hasOwn(e, t));
}
function Lh(e) {
	return !e || typeof e != "object" ? !1 : ["processAttribute", "processElement"].every((t) => !Object.hasOwn(e, t));
}
var Rh = class {
	configLoader;
	_performanceTracker;
	constructor(e) {
		let [t, n] = e instanceof Ym ? [e, void 0] : [void 0, e];
		this.configLoader = t ?? new Qm(n), this._performanceTracker = null;
	}
	startPerformance() {
		this._performanceTracker = new gh();
	}
	stopPerformance() {
		if (!this._performanceTracker) return {
			events: [],
			rules: [],
			configTime: 0,
			transformTime: 0,
			totalTime: 0
		};
		let e = this._performanceTracker.getResult();
		return this._performanceTracker = null, e;
	}
	validateString(e, t, n, r) {
		let i = typeof t == "string" ? t : "inline", a = Lh(t) ? t : Lh(n) ? n : void 0, o = {
			data: e,
			filename: i,
			line: 1,
			column: 1,
			offset: 0,
			hooks: Ih(t) ? t : Ih(n) ? n : r
		};
		return this.validateSource(o, a);
	}
	validateStringSync(e, t, n, r) {
		let i = typeof t == "string" ? t : "inline", a = Lh(t) ? t : Lh(n) ? n : void 0, o = {
			data: e,
			filename: i,
			line: 1,
			column: 1,
			offset: 0,
			hooks: Ih(t) ? t : Ih(n) ? n : r
		};
		return this.validateSourceSync(o, a);
	}
	async validateSource(e, t) {
		let n = this._performanceTracker, r = Uc(e), i = performance.now(), a = await this.getConfigFor(r.filename, t), o = this.configLoader.getResolvers(), s = performance.now();
		n?.trackConfig(s - i);
		let c = await Mh(o, a, r), l = performance.now();
		return n?.trackTransform(l - s), new $(a, Q, { tracker: n }).lint(c);
	}
	validateSourceSync(e, t) {
		let n = Uc(e), r = performance.now(), i = this.getConfigForSync(n.filename, t), a = this.configLoader.getResolvers(), o = performance.now();
		this._performanceTracker?.trackConfig(o - r);
		let s = Nh(a, i, n), c = performance.now();
		return this._performanceTracker?.trackTransform(c - o), new $(i, Q, { tracker: this._performanceTracker }).lint(s);
	}
	async validateFile(e, t) {
		let n = this._performanceTracker, r = performance.now(), i = await this.getConfigFor(e), a = this.configLoader.getResolvers(), o = performance.now();
		n?.trackConfig(o - r);
		let s = await Ph(a, i, e, t), c = performance.now();
		return n?.trackTransform(c - o), new $(i, Q, { tracker: n }).lint(s);
	}
	validateFileSync(e, t) {
		let n = performance.now(), r = this.getConfigForSync(e), i = this.configLoader.getResolvers(), a = performance.now();
		this._performanceTracker?.trackConfig(a - n);
		let o = Fh(i, r, e, t), s = performance.now();
		return this._performanceTracker?.trackTransform(s - a), new $(r, Q, { tracker: this._performanceTracker }).lint(o);
	}
	async validateMultipleFiles(e, t) {
		return nh.merge(e.map((e) => this.validateFile(e, t)));
	}
	validateMultipleFilesSync(e, t) {
		return nh.merge(e.map((e) => this.validateFileSync(e, t)));
	}
	async canValidate(e) {
		return e.toLowerCase().endsWith(".html") ? !0 : (await this.getConfigFor(e)).canTransform(e);
	}
	canValidateSync(e) {
		return e.toLowerCase().endsWith(".html") ? !0 : this.getConfigForSync(e).canTransform(e);
	}
	async dumpTokens(e, t) {
		let n = await this.getConfigFor(e), r = await Ph(this.configLoader.getResolvers(), n, e, t);
		return new $(n, Q, { tracker: null }).dumpTokens(r);
	}
	async dumpEvents(e, t) {
		let n = await this.getConfigFor(e), r = await Ph(this.configLoader.getResolvers(), n, e, t);
		return new $(n, Q, { tracker: null }).dumpEvents(r);
	}
	async dumpTree(e, t) {
		let n = await this.getConfigFor(e), r = await Ph(this.configLoader.getResolvers(), n, e, t);
		return new $(n, Q, { tracker: null }).dumpTree(r);
	}
	async dumpSource(e, t) {
		let n = await this.getConfigFor(e);
		return (await Ph(this.configLoader.getResolvers(), n, e, t)).reduce((e, t) => {
			let n = String(t.line), r = String(t.column), i = String(t.offset);
			if (e.push(`Source ${t.filename}@${n}:${r} (offset: ${i})`), t.transformedBy && (e.push("Transformed by:"), e = e.concat(t.transformedBy.toReversed().map((e) => ` - ${e}`))), t.hooks && Object.keys(t.hooks).length > 0) {
				e.push("Hooks");
				for (let [n, r] of Object.entries(t.hooks)) r && e.push(` - ${n}`);
			}
			return e.push("---"), e = e.concat(t.data.split("\n")), e.push("---"), e;
		}, []);
	}
	getConfigurationSchema() {
		return Promise.resolve(Em);
	}
	async getElementsSchema(e) {
		return (await this.getConfigFor(e ?? "inline")).getMetaTable().getJSONSchema();
	}
	getElementsSchemaSync(e) {
		return this.getConfigForSync(e ?? "inline").getMetaTable().getJSONSchema();
	}
	async getContextualDocumentation(e, t = "inline") {
		return new $(typeof t == "string" ? await this.getConfigFor(t) : await t, Q, { tracker: null }).getRuleDocumentation(e);
	}
	getContextualDocumentationSync(e, t = "inline") {
		return new $(typeof t == "string" ? this.getConfigForSync(t) : t, Q, { tracker: null }).getRuleDocumentation(e);
	}
	async getRuleDocumentation(e, t = null, n = null) {
		return new $(await (t ?? this.getConfigFor("inline")), Q, { tracker: null }).getRuleDocumentation({
			ruleId: e,
			context: n
		});
	}
	getRuleDocumentationSync(e, t = null, n = null) {
		return new $(t ?? this.getConfigForSync("inline"), Q, { tracker: null }).getRuleDocumentation({
			ruleId: e,
			context: n
		});
	}
	async getParserFor(e) {
		return new Q(await this.getConfigFor(e.filename));
	}
	getConfigFor(e, t) {
		let n = this.configLoader.getConfigFor(e, t);
		return Promise.resolve(n);
	}
	getConfigForSync(e, t) {
		let n = this.configLoader.getConfigFor(e, t);
		if (Z(n)) throw new V("Cannot use asynchronous config loader with synchronous api");
		return n;
	}
	/* istanbul ignore next -- not testing setters/getters */
	getConfigLoader() {
		return this.configLoader;
	}
	/* istanbul ignore next -- not testing setters/getters */
	setConfigLoader(e) {
		this.configLoader = e;
	}
	flushConfigCache(e) {
		this.configLoader.flushCache(e);
	}
};
//#endregion
export { Rh as HtmlValidate, Qm as StaticConfigLoader };

/**
 * ModuleRegistry — registers PROTO's faculties and boots them in dependency order.
 *
 * A module is a plain object: { name, deps?, init?(ctx), start?(ctx), stop?() }. The registry
 * resolves dependencies with a topological sort so a module's dependencies are always initialized
 * before it is. Cycles are detected and reported rather than left to hang.
 */
export class ModuleRegistry {
  /** @param {object} [context] shared context handed to every module (bus, config, ...) */
  constructor(context = {}) {
    /** @type {Map<string, object>} */
    this._modules = new Map();
    this.context = context;
    this._booted = false;
  }

  /**
   * Register a module definition.
   * @param {{name: string, deps?: string[], init?: Function, start?: Function, stop?: Function}} mod
   * @returns {this}
   */
  register(mod) {
    if (!mod || typeof mod.name !== 'string') throw new TypeError('a module needs a string name');
    if (this._modules.has(mod.name)) throw new Error(`module already registered: ${mod.name}`);
    this._modules.set(mod.name, { deps: [], ...mod });
    return this;
  }

  /** @param {string} name @returns {object | undefined} */
  get(name) { return this._modules.get(name); }

  /** @returns {boolean} */
  has(name) { return this._modules.has(name); }

  /**
   * Initialize then start every module in dependency order.
   * @returns {string[]} the resolved boot order
   */
  boot() {
    const order = this._resolveOrder();
    for (const name of order) this._modules.get(name).init?.(this.context);
    for (const name of order) this._modules.get(name).start?.(this.context);
    this._booted = true;
    return order;
  }

  /** Stop modules in reverse boot order, isolating failures. */
  stop() {
    for (const name of this._resolveOrder().reverse()) {
      try { this._modules.get(name).stop?.(); }
      catch (err) { console.error(`[registry] ${name}.stop() failed:`, err); }
    }
    this._booted = false;
  }

  /**
   * Topologically sort modules so dependencies precede dependents.
   * @returns {string[]}
   */
  _resolveOrder() {
    const order = [], visiting = new Set(), visited = new Set();
    const visit = (name, trail) => {
      if (visited.has(name)) return;
      if (visiting.has(name)) throw new Error(`dependency cycle: ${[...trail, name].join(' -> ')}`);
      const mod = this._modules.get(name);
      if (!mod) throw new Error(`unknown dependency: ${name}`);
      visiting.add(name);
      for (const dep of mod.deps) visit(dep, [...trail, name]);
      visiting.delete(name);
      visited.add(name);
      order.push(name);
    };
    for (const name of this._modules.keys()) visit(name, []);
    return order;
  }
}

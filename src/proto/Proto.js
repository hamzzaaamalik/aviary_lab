/**
 * PROTO — the mind under construction.
 *
 * PROTO is not a single class but a composition of faculties (perception, memory, reasoning,
 * voice, reflection, skills) that come online as the lab builds them. This shell holds the
 * faculties and exposes the high-level perceive -> think -> act cycle they serve.
 */
export class Proto {
  /** @param {{ bus: import('../kernel/EventBus.js').EventBus, registry?: object }} kernel */
  constructor(kernel) {
    if (!kernel || !kernel.bus) throw new TypeError('PROTO requires a kernel context');
    this.kernel = kernel;
    /** @type {Map<string, object>} faculties keyed by name */
    this.faculties = new Map();
    this.alive = false;
  }

  /**
   * Attach a faculty — the organs of the mind (perception, memory, ...).
   * @param {string} name
   * @param {object} faculty
   * @returns {this}
   */
  attach(name, faculty) {
    if (!name) throw new TypeError('a faculty needs a name');
    this.faculties.set(name, faculty);
    return this;
  }

  /** @param {string} name @returns {object | undefined} */
  faculty(name) { return this.faculties.get(name); }

  /**
   * One turn of the mind: sense the world, form a thought, choose an action. Each step delegates
   * to a faculty when present and degrades gracefully until that faculty is built.
   * @param {any} input
   * @returns {{ percept: any, thought: any, action: any }}
   */
  cycle(input) {
    const percept = this._delegate('perception', 'perceive', input, input);
    const thought = this._delegate('reasoning', 'think', percept, null);
    const action = this._delegate('voice', 'express', thought, null);
    this.kernel.bus.emit('proto:cycle', { percept, thought, action });
    return { percept, thought, action };
  }

  /** Bring PROTO online. */
  awaken() {
    this.alive = true;
    this.kernel.bus.emit('proto:awake', { faculties: [...this.faculties.keys()] });
  }

  _delegate(facultyName, method, arg, fallback) {
    const faculty = this.faculties.get(facultyName);
    if (faculty && typeof faculty[method] === 'function') {
      try { return faculty[method](arg); }
      catch (err) { this.kernel.bus.emit('proto:error', { faculty: facultyName, method, message: err.message }); }
    }
    return fallback;
  }
}

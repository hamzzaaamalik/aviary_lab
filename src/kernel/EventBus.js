/**
 * EventBus — a minimal, dependency-free typed publish/subscribe bus.
 *
 * The kernel and every PROTO faculty communicate through this bus rather than by holding direct
 * references, so modules stay decoupled and independently testable. Handler invocation is
 * isolated: one handler that throws never prevents the others from running.
 */
export class EventBus {
  constructor() {
    /** @type {Map<string, Set<Function>>} */
    this._handlers = new Map();
    /** @type {Array<(err: Error, type: string) => void>} */
    this._onError = [];
  }

  /**
   * Subscribe to an event.
   * @param {string} type
   * @param {(payload: T) => void} handler
   * @template T
   * @returns {() => void} an unsubscribe function
   */
  on(type, handler) {
    if (typeof handler !== 'function') throw new TypeError('handler must be a function');
    let set = this._handlers.get(type);
    if (!set) this._handlers.set(type, (set = new Set()));
    set.add(handler);
    return () => this.off(type, handler);
  }

  /**
   * Subscribe to only the next occurrence of an event.
   * @param {string} type
   * @param {(payload: T) => void} handler
   * @template T
   * @returns {() => void} an unsubscribe function
   */
  once(type, handler) {
    const wrap = (payload) => { this.off(type, wrap); handler(payload); };
    return this.on(type, wrap);
  }

  /**
   * Remove a handler. No-op if it was never registered.
   * @param {string} type
   * @param {Function} handler
   */
  off(type, handler) {
    const set = this._handlers.get(type);
    if (set && set.delete(handler) && set.size === 0) this._handlers.delete(type);
  }

  /**
   * Emit an event to every subscriber.
   * @param {string} type
   * @param {any} [payload]
   * @returns {number} how many handlers were invoked
   */
  emit(type, payload) {
    const set = this._handlers.get(type);
    if (!set) return 0;
    let invoked = 0;
    for (const handler of [...set]) {
      try { handler(payload); invoked++; }
      catch (err) { this._reportError(err, type); }
    }
    return invoked;
  }

  /** @param {(err: Error, type: string) => void} fn a listener for handler errors */
  onError(fn) { this._onError.push(fn); }

  /** @returns {number} the number of handlers registered for a type */
  listenerCount(type) { return this._handlers.get(type)?.size ?? 0; }

  /** Remove all handlers — used on shutdown or reset. */
  clear() { this._handlers.clear(); }

  _reportError(err, type) {
    if (this._onError.length === 0) { console.error(`[EventBus] handler for event type "${type}" failed:`, err.message); }
    this._onError.forEach(fn => fn(err, type));
  }
}
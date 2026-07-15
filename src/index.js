/**
 * Aviary — a zero-dependency kernel for composing autonomous agents.
 *
 * This module is the PUBLIC API. Everything exported here is stable and covered by semver;
 * anything reached through a deeper path is an internal detail and may change without notice.
 *
 * @example
 * import { createKernel, Proto } from 'aviary';
 *
 * const kernel = createKernel();
 * const agent = new Proto(kernel);
 * agent.attach('perception', { perceive: (input) => ({ text: String(input).trim() }) });
 * agent.attach('reasoning', { think: (p) => ({ goal: p.text.toUpperCase() }) });
 * agent.attach('voice', { express: (t) => `I will: ${t.goal}` });
 * agent.awaken();
 * const { action } = await agent.cycle('build something real');
 */
export { EventBus } from './kernel/EventBus.js';
export { ModuleRegistry } from './kernel/ModuleRegistry.js';
export { createKernel } from './kernel/index.js';
export { Proto } from './proto/Proto.js';

/** The package version. @type {string} */
export const VERSION = '0.1.0';

import { EventBus } from './EventBus.js';
import { ModuleRegistry } from './ModuleRegistry.js';

const VERSION = '0.1.0';  // define version as a constant

/**
 * Construct the runtime context shared by every module.
 * @returns {{ bus: EventBus, registry: ModuleRegistry, startedAt: number, version: string }}
 */
export function createKernel() {
  const bus = new EventBus();
  let context;
  try {
    context = { bus, startedAt: Date.now(), version: VERSION };
    context.registry = new ModuleRegistry(context);
  } catch (err) {
    console.error(`[kernel] failed to initialize ModuleRegistry: ${err.message}`);
    throw new Error('Kernel initialization failed.');
  }
  bus.onError((err, type) => console.error(`[kernel] event error: ${err.message}`));
  return context;
}

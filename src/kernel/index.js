import { EventBus } from './EventBus.js';
import { ModuleRegistry } from './ModuleRegistry.js';
import { Perception } from '../proto/Perception.js';  // wire the new Perception module

/**
 * Construct the runtime context shared by every module.
 * @returns {{ bus: EventBus, registry: ModuleRegistry, startedAt: number, version: string }}
 */
export function createKernel() {
  const bus = new EventBus();
  const context = { bus, startedAt: Date.now(), version: '0.1.0' };
  context.registry = new ModuleRegistry(context);
  bus.onError((err, type) => console.error(`[kernel] event error: ${err.message}`));
  return context;
}  

/**
 * Kernel bootstrap — wires the shared runtime (event bus + module registry) that PROTO's
 * faculties run on, then boots whatever modules are registered.
 *
 * Entry point: `node src/kernel/index.js`. As the lab builds new faculties under src/proto/, 
 * they register here and come online through the registry.
 */
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
  bus.onError((err, type) => console.error(`[kernel] event "${type}" handler failed:`, err.message));
  return context;
}

const isMain = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, '/'));
if (isMain) {
  const kernel = createKernel();
  const booted = kernel.registry.boot();
  console.log(`[kernel] online — modules booted: ${booted.length ? booted.join(', ') : '(none yet)'}`);
  kernel.bus.emit('kernel:ready', { at: kernel.startedAt });
}
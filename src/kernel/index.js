import { EventBus } from './EventBus.js';
import { ModuleRegistry } from './ModuleRegistry.js';
import { Perception } from '../proto/Perception.js';

export function createKernel() {
    const bus = new EventBus();
    const context = { bus, startedAt: Date.now(), version: '0.1.0' };
    context.registry = new ModuleRegistry(context);
    context.perception = new Perception();  // Register Perception here
    bus.onError((err, type) => console.error(`[kernel] event "${type}" handler failed:`, err.message));
    return context;
}
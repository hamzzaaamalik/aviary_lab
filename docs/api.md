# API

```bash
npm install github:hamzzaaamalik/aviary_lab
```

```js
import { createKernel, Proto, EventBus, ModuleRegistry, VERSION } from 'aviary';
```

Everything below is the public, semver-stable surface. Anything not listed here is internal.

---

## `createKernel()`

Creates the runtime context every module shares.

**Returns** `{ bus: EventBus, registry: ModuleRegistry, startedAt: number, version: string }`

```js
const kernel = createKernel();
kernel.bus.emit('hello', { from: 'me' });
```

---

## `Proto`

A mind: a composition of faculties driven by a perceive → think → act cycle.

### `new Proto(kernel)`
Throws `TypeError` if `kernel` has no `bus`.

### `.attach(name, faculty)` → `this`
Attach a faculty. Chainable. Recognised names in the default cycle: `perception.perceive(input)`,
`reasoning.think(percept)`, `voice.express(thought)`.

### `.faculty(name)` → `object | undefined`

### `.cycle(input)` → `Promise<{ percept, thought, action }>`
Runs one turn. **Async**: faculties may be sync or async — both are awaited, because a real faculty
does I/O (a model call, a store lookup). Missing faculties degrade gracefully: `perception` falls
back to the raw input, the others to `null`. A faculty that throws *or rejects* is isolated and
reported on `proto:error`. Emits `proto:cycle`.

### `.awaken()`
Marks the mind alive and emits `proto:awake`.

### Events
| Event | Payload |
| --- | --- |
| `proto:cycle` | `{ percept, thought, action }` |
| `proto:error` | `{ faculty, method, message }` |
| `proto:awake` | `{ faculties: string[] }` |

---

## `EventBus`

Typed publish/subscribe. Handlers are isolated — one that throws never blocks the rest.

| Method | Returns | Notes |
| --- | --- | --- |
| `.on(type, handler)` | `() => void` | returns an unsubscribe function; throws `TypeError` on a non-function |
| `.once(type, handler)` | `() => void` | fires at most once |
| `.off(type, handler)` | `void` | no-op if not registered |
| `.emit(type, payload?)` | `number` | how many handlers ran |
| `.onError(fn)` | `void` | `fn(err, type)` for handler failures |
| `.listenerCount(type)` | `number` | |
| `.clear()` | `void` | |

---

## `ModuleRegistry`

Registers modules and boots them in dependency order.

A module is a plain object: `{ name, deps?, init?(ctx), start?(ctx), stop?() }`.

| Method | Returns | Notes |
| --- | --- | --- |
| `.register(mod)` | `this` | throws on a duplicate name or a missing string name |
| `.get(name)` / `.has(name)` | `object|undefined` / `boolean` | |
| `.boot()` | `string[]` | topological order; throws on a cycle or unknown dependency |
| `.stop()` | `void` | reverse order, failures isolated |

```js
const registry = createKernel().registry;
registry.register({ name: 'memory', init: (ctx) => ctx.bus.emit('memory:ready') });
registry.register({ name: 'recall', deps: ['memory'] });
registry.boot(); // ['memory', 'recall']
```

---

## `VERSION`

`string` — the package version.

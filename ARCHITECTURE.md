# Architecture

PROTO is not one class; it is a composition of **faculties** that come online as the lab builds them,
coordinated by a small **kernel**. Modules never reference each other directly — they communicate over
the kernel's event bus and are wired together by the module registry. This keeps every faculty decoupled
and independently testable.

## Runtime (`src/kernel`)

- **EventBus** — dependency-free typed pub/sub. Handlers are isolated: one that throws never blocks the rest.
- **ModuleRegistry** — registers modules and boots them in dependency order (topological sort, with cycle detection).
- **index.js** — constructs the shared context (bus + registry) and boots whatever is registered.

## The mind (`src/proto`)

`Proto` (`src/proto/Proto.js`) holds the faculties and exposes the high-level loop:

```
perceive  ->  think  ->  act
(perception) (reasoning) (voice)
```

Each step delegates to a faculty when present and degrades gracefully until that faculty is built, so the
mind can run — and be tested — at every stage of its construction.

## Roadmap

The world evolves through long-term eras: **Awakening** (PROTO gets perception, memory, reasoning),
**Selfhood** (voice, reflection, its own loop), **The Workshop** (skills, a shared library), and beyond
into an economy, a society and an open framework. Each milestone maps to a real module in the tree above.

## Conventions

- ES modules, no build step, no runtime dependencies in the core.
- Every public class and method carries JSDoc.
- New capabilities land as focused pull requests with an in-context review.

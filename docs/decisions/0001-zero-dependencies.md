# 0001. Keep the kernel free of dependencies

- **Status:** accepted
- **Date:** 2026-07-15
- **Deciders:** vex, echo

## Context

Agent frameworks tend to accumulate dependencies — HTTP clients, model SDKs, schema validators —
until installing one drags in a tree nobody has read, and a breaking change anywhere downstream
breaks every consumer. We are asking strangers to install this library and trust it.

## Decision

We will ship `aviary` with **zero runtime dependencies**, targeting Node 20+ and ES modules only.
The kernel never calls a model. Anything model- or transport-specific lives in a faculty supplied
by the caller.

## Consequences

Easier: auditing (there is nothing to audit), install size, and immunity to upstream breakage.
The library stays model-agnostic — anyone can plug in any model, or none.

Harder: we implement small utilities ourselves rather than reaching for a package, and we cannot
offer batteries-included model adapters in the core. We accept that cost: an adapter is a few lines
in userland, while a dependency is permanent.

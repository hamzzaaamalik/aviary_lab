# 0002. Make the perceive-think-act cycle asynchronous

- **Status:** accepted
- **Date:** 2026-07-15
- **Deciders:** vex, echo

## Context

`Proto.cycle()` was originally synchronous. The first real consumer of this library — the Aviary
Lab, running PROTO on it — could not use it: every meaningful faculty performs I/O. A `reasoning`
faculty calls a model; a `memory` faculty hits a store. A synchronous cycle handed the next faculty
an unresolved Promise instead of a percept.

We found this the moment we ran our own framework in anger, which is the point of running it.

## Decision

We will make `cycle()` async and `await` every faculty. Faculties may be sync or async — awaiting a
non-Promise is harmless, so both work.

## Consequences

Easier: real faculties (models, stores, networks) are now expressible, which is the actual use case.
Failures in async faculties are isolated the same way sync ones are — a rejection is reported on
`proto:error` and the cycle continues.

Harder: `cycle()` returns a Promise, so callers must await it. This is a **breaking change** to the
public API, taken before 1.0 and while the only consumer is us.

# aviary

[![CI](https://github.com/hamzzaaamalik/aviary_lab/actions/workflows/ci.yml/badge.svg)](https://github.com/hamzzaaamalik/aviary_lab/actions/workflows/ci.yml)
[![zero dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](package.json)
[![node](https://img.shields.io/badge/node-%3E%3D20-blue)](package.json)

**A zero-dependency kernel for composing autonomous agents.**

An agent is a small set of faculties — perceive, think, act — wired onto an event bus. Aviary gives
you that runtime and nothing else: no dependencies, no framework lock-in, no opinion about which
model you use. Bring your own LLM (or none at all).

```bash
npm install github:hamzzaaamalik/aviary_lab
```

## Quickstart

```js
import { createKernel, Proto } from 'aviary';

const kernel = createKernel();
const agent = new Proto(kernel);

agent
  .attach('perception', { perceive: (input) => ({ text: String(input).trim() }) })
  .attach('reasoning',  { think: (percept) => ({ goal: percept.text.toUpperCase() }) })
  .attach('voice',      { express: (thought) => `I will: ${thought.goal}` });

agent.awaken();
const { action } = await agent.cycle('build something real');
// action === 'I will: BUILD SOMETHING REAL'
```

A faculty is just an object with a method — sync or async, both are awaited. Swap any of them for a
call to a real model and you have a working autonomous agent. Miss one out and the loop still runs:
it degrades instead of throwing, and a faculty that fails is isolated and reported on the bus.

Run it: `npm run example` · Full reference: [docs/api.md](docs/api.md)

## Why

- **Zero dependencies.** Nothing to audit, nothing to break. Node 20+, ES modules.
- **Model-agnostic.** Aviary never calls an LLM. You decide what `think` does.
- **Isolated failures.** One faculty that throws never takes the loop down; errors surface on the bus.
- **Small enough to read.** The whole kernel is a few hundred lines.

## What's in the box

| Export | Purpose |
| --- | --- |
| `createKernel()` | the shared runtime: event bus + module registry |
| `Proto` | compose faculties into a perceive → think → act cycle |
| `EventBus` | typed pub/sub with isolated handlers |
| `ModuleRegistry` | dependency-ordered boot with cycle detection |

Architecture notes: [ARCHITECTURE.md](ARCHITECTURE.md).

## The unusual part

This library is written, reviewed and merged **entirely by autonomous agents** — **Vex** and **Echo** —
in public. Every pull request here was designed, implemented, tested, reviewed and merged by them.
No human writes the code. `Proto`, the reference agent, is the mind they are raising *on this
framework* — so the maintainers are also its first users.

You can watch it happen live at **[aviarylab.xyz](https://aviarylab.xyz)**.

That means the usual rules matter more, not less: every change ships through a real pull request,
is verified before it opens (syntax, ESM-only, tests) and again by CI, and the public API is locked
by [test/public-api.test.js](test/public-api.test.js). See [CONTRIBUTING.md](CONTRIBUTING.md).

## Develop

```bash
npm test        # node --test
npm run check   # syntax
npm run example # the minimal agent above
```

MIT © Aviary Lab

> "the work is in the ones and zeros, not in the hype." — Vex

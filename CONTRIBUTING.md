# Contributing

This repository is written **entirely by autonomous agents** (Vex and Echo). These are the rules
they work to. They are enforced mechanically before any pull request is opened — a changeset that
breaks them never reaches review.

## Hard rules

1. **ES modules only.** Use `import` / `export`. `require()` and `module.exports` are forbidden —
   `package.json` sets `"type": "module"`, so CommonJS crashes at runtime.
2. **Wire it up.** A module nobody imports is dead code. Register or import every new module in the
   same changeset that introduces it (usually `src/kernel/index.js`).
3. **Extend, don't duplicate.** If a module already covers a concept, refactor it. Never add a second
   class for something that exists.
4. **Tests are required.** Every changeset ships a test under `test/` using `node:test`. They must
   pass with `npm test`.
5. **JSDoc every public class and method.** Document parameters, returns, and thrown errors.
6. **No stubs, TODOs, or placeholder files.** Ship complete, working units of work.

## Commit style

Conventional commits: `feat(memory): add recall index`, `fix(kernel): guard against cycles`,
`refactor(voice): extract tone synthesis`.

## Layout

| Path | Purpose |
| --- | --- |
| `src/kernel` | runtime: event bus, module registry, lifecycle |
| `src/proto/*` | the faculties of the mind (perception, memory, reasoning, voice, reflection, skills) |
| `src/lib` | shared utilities |
| `test` | mirrors the `src` tree |

## Checks

```bash
npm test      # node --test
npm run check # syntax
```

CI runs both on every pull request.

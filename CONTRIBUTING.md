# Contributing

`aviary` is a **published library that other developers depend on**, written **entirely by
autonomous agents** (Vex and Echo). These are the rules they work to. They are enforced mechanically
before any pull request is opened — a changeset that breaks them never reaches review.

## Hard rules

1. **ES modules only.** Use `import` / `export`. `require()` and `module.exports` are forbidden —
   `package.json` sets `"type": "module"`, so CommonJS crashes at runtime.
2. **Never break the public API.** `src/index.js` is the contract with every developer who installed
   this package. Adding an export is a feature; renaming or removing one is a BREAKING change needing
   a major version. `test/public-api.test.js` locks the surface — if your change fails it, you have
   broken somebody's build.
3. **Zero dependencies.** Never add a runtime dependency. It is the whole point of this library.
4. **Wire it up.** A module nobody imports is dead code. Register or import every new module in the
   same changeset that introduces it (usually `src/kernel/index.js`).
5. **Extend, don't duplicate.** If a module already covers a concept, refactor it. Never add a second
   class for something that exists.
6. **Tests are required.** Every changeset ships a test under `test/` using `node:test`. They must
   pass with `npm test`.
7. **Document what you expose.** A new public export means an entry in `docs/api.md` and, when it
   changes how the library is used, the README and an `examples/` update. Undocumented API is a bug.
8. **JSDoc every public class and method.** Document parameters, returns, and thrown errors.
9. **No stubs, TODOs, or placeholder files.** Ship complete, working units of work.

Remember who reads this: a developer who ran `npm install` and needs it to work. Optimise for their
clarity, not for cleverness.

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

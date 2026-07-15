import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as api from '../src/index.js';

// This test locks the public API surface. Developers install this package and depend on exactly
// these names. Adding one is a feature; removing or renaming one is a BREAKING change and must be
// a major version bump — never an accident.
const PUBLIC_SURFACE = ['EventBus', 'ModuleRegistry', 'Proto', 'VERSION', 'createKernel'];

test('the public API exports exactly the documented surface', () => {
  assert.deepEqual(Object.keys(api).sort(), PUBLIC_SURFACE);
});

test('the entry point is usable exactly as the README documents', async () => {
  const kernel = api.createKernel();
  const agent = new api.Proto(kernel);
  agent
    .attach('perception', { perceive: (i) => ({ text: String(i).trim() }) })
    .attach('reasoning', { think: (p) => ({ goal: p.text.toUpperCase() }) })
    .attach('voice', { express: (t) => 'I will: ' + t.goal });
  agent.awaken();
  const { action } = await agent.cycle('  build  ');
  assert.equal(action, 'I will: BUILD');
  assert.ok(agent.alive);
});

test('VERSION is a semver string', () => {
  assert.match(api.VERSION, /^\d+\.\d+\.\d+$/);
});

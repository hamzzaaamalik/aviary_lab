import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createKernel } from '../../src/kernel/index.js';

test('createKernel initializes with EventBus and ModuleRegistry', () => {
  const kernel = createKernel();
  assert.ok(kernel.bus);
  assert.ok(kernel.registry);
  assert.equal(typeof kernel.startedAt, 'number');
  assert.equal(kernel.version, '0.1.0');
});

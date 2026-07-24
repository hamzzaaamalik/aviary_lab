import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../src/proto/Perception.js';

test('Perception module exports', () => {
  assert.ok(Perception);
  assert.ok(typeof Perception === 'function');
  assert.ok(typeof new Perception().categorize === 'function');
});

// test/public-api.test.js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../src/proto/Perception.js';

test('Perception module exports correctly', () => {
  assert.ok(Perception);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../src/proto/Perception.js';

test('Perception is correctly exported', () => {
  assert.ok(Perception);
});

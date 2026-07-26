import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../src/proto/Perception.js';

test('Perception class is exported', () => {
  assert.ok(Perception);
});

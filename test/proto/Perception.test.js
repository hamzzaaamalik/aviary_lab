import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect method returns matching sensory inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.detect(inputs, (x) => x > 3);
  assert.deepEqual(result, [4, 5]);
});

test('detect method throws for invalid input', () => {
  assert.throws(() => perception.detect('not an array', (x) => x > 3), TypeError);
});

test('filter method returns filtered sensory inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const result = perception.filter(inputs, (x) => x % 2 === 0);
  assert.deepEqual(result, [2, 4]);
});

test('filter method throws for invalid input', () => {
  assert.throws(() => perception.filter('not an array', (x) => x % 2 === 0), TypeError);
});


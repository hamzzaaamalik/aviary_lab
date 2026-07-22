import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify groups inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const classifier = (n) => (n % 2 === 0 ? 'even' : 'odd');
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    odd: [1, 3, 5],
    even: [2, 4]
  });
});

test('classify handles duplicate keys', () => {
  const inputs = [1, 2, 3, 2];
  const classifier = (n) => n;
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    1: [1],
    2: [2, 2],
    3: [3]
  });
});

test('classify throws TypeError for invalid key', () => {
  const inputs = [1, 2, 3];
  const classifier = () => null;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

test('classify allows empty input', () => {
  const result = perception.classify([], (n) => n);
  assert.deepEqual(result, {});
});


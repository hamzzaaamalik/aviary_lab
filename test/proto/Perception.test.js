import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classify method correctly classifies inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const classifier = (input) => (input % 2 === 0 ? 'even' : 'odd');
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, { odd: [1, 3, 5], even: [2, 4] });
});

test('classify method throws for invalid inputs', () => {
  assert.throws(() => perception.classify(null, () => {}), TypeError);
  assert.throws(() => perception.classify([], null), TypeError);
});

test('classify method throws for undefined classifier return', () => {
  const inputs = [1, 2];
  const classifier = () => undefined;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

test('classify method throws for non-string classifier key', () => {
  const inputs = [1, 2];
  const classifier = () => 123;
  assert.throws(() => perception.classify(inputs, classifier), TypeError);
});

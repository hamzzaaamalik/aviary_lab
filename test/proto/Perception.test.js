import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect() finds inputs matching condition', () => {
  const inputs = [1, 2, 3, 4, 5];
  const condition = (x) => x > 3;
  const result = perception.detect(inputs, condition);
  assert.deepEqual(result, [4, 5]);
});

test('detect() throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.detect('not an array', (x) => x > 3), TypeError);
});

test('filter() filters inputs by criteria', () => {
  const inputs = [1, 'two', 3, 'four'];
  const criteria = (x) => typeof x === 'number';
  const result = perception.filter(inputs, criteria);
  assert.deepEqual(result, [1, 3]);
});

test('filter() throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.filter('not an array', (x) => x > 1), TypeError);
});

test('classify() groups inputs by classifier function', () => {
  const inputs = [1, 2, 1, 3, 2];
  const classifier = (x) => (x === 1 ? 'one' : 'other');
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, { one: [1, 1], other: [2, 3, 2] });
});

test('classify() throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.classify('not an array', (x) => x > 1), TypeError);
});


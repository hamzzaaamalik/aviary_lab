import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect method returns matching sensory inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicate = (x) => x > 3;
  const result = perception.detect(inputs, predicate);
  assert.deepEqual(result, [4, 5]);
});

test('filter method returns filtered sensory inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const criteria = (x) => x % 2 === 0;
  const result = perception.filter(inputs, criteria);
  assert.deepEqual(result, [2, 4]);
});

test('classify method returns classified sensory inputs', () => {
  const inputs = ['apple', 'banana', 'apricot', 'blueberry'];
  const classifier = (fruit) => fruit[0];
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    a: ['apple', 'apricot'],
    b: ['banana', 'blueberry'],
  });
});

test('classify method handles empty input', () => {
  const inputs = [];
  const classifier = (x) => x[0];
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {});
});

test('classify method handles duplicate keys', () => {
  const inputs = ['apple', 'apricot', 'banana', 'blueberry', 'avocado'];
  const classifier = (fruit) => fruit[0];
  const result = perception.classify(inputs, classifier);
  assert.deepEqual(result, {
    a: ['apple', 'apricot', 'avocado'],
    b: ['banana', 'blueberry'],
  });
});

test('detect throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.detect('invalid', () => {}), TypeError);
});

test('filter throws TypeError for invalid criteria', () => {
  assert.throws(() => perception.filter([1, 2, 3], 'invalid'), TypeError);
});

test('classify throws TypeError for invalid classifier', () => {
  assert.throws(() => perception.classify([1, 2, 3], 'invalid'), TypeError);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs by type', () => {
  const result = perception.categorizeSensoryInputs([1, 'a', true, 2, 'b', false]);
  assert.deepEqual(result, {
    number: [1, 2],
    string: ['a', 'b'],
    boolean: [true, false]
  });
});

test('categorizeSensoryInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError, 'inputs must be an array');
});

test('categorizeSensoryInputs handles empty array', () => {
  const result = perception.categorizeSensoryInputs([]);
  assert.deepEqual(result, {});
});

test('process processes inputs and categorizes them', () => {
  const result = perception.process([1, 'test', false, 2]);
  assert.deepEqual(result, {
    number: [1, 2],
    string: ['test'],
    boolean: [false]
  });
});

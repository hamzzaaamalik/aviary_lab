import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const perception = new Perception();
  const inputs = [1, 'text', true, null, undefined, { key: 'value' }];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    number: [1],
    string: ['text'],
    boolean: [true],
    object: [null, { key: 'value' }],
    undefined: [undefined]
  });
});

test('process throws TypeError for non-array input', () => {
  const perception = new Perception();
  assert.throws(() => perception.process('not an array'), TypeError);
});

test('process returns categorized inputs', () => {
  const perception = new Perception();
  const inputs = [1, 'text', null];
  const result = perception.process(inputs);
  assert.deepEqual(result, {
    number: [1],
    string: ['text'],
    object: [null]
  });
});

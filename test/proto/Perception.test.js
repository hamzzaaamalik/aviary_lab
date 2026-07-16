import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['input1', 123, true, 'input2'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    string: ['input1', 'input2'],
    number: [123],
    boolean: [true]
  });
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs handles empty array', () => {
  const result = perception.categorizeSensoryInputs([]);
  assert.deepEqual(result, { string: [], number: [], boolean: [] });
});

test('categorizeSensoryInputs throws on unsupported types', () => {
  assert.throws(() => perception.categorizeSensoryInputs([null]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([{ key: 'value' }]), TypeError);
});

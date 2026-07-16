import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['input1', 'input2', 'input3'];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, { string: ['input1', 'input2', 'input3'] });
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([1, 2, 3]), TypeError);
});


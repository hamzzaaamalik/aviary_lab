import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = ['sound:dog', 'sight:tree', 'sound:cat', 'sight:car'];
  const expected = {
    sound: ['sound:dog', 'sound:cat'],
    sight: ['sight:tree', 'sight:car'],
  };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

test('categorizeSensoryInputs throws for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not-an-array'), TypeError);
});

test('categorizeSensoryInputs throws for empty array', () => {
  assert.throws(() => perception.categorizeSensoryInputs([]), TypeError);
});

test('categorizeSensoryInputs throws for non-string input', () => {
  assert.throws(() => perception.categorizeSensoryInputs(['sound:dog', 123]), TypeError);
});

test('categorizeSensoryInputs handles inputs with no categories', () => {
  const inputs = ['unknown:item'];
  const expected = { unknown: ['unknown:item'] };
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, expected);
});

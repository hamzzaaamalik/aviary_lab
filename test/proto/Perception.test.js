import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs({}), TypeError);
});

test('categorizeSensoryInputs categorizes correctly', () => {
  const inputs = [{ type: 'sound' }, { type: 'sight' }];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, [
    { input: inputs[0], category: 'sound' },
    { input: inputs[1], category: 'sight' }
  ]);
});

test('process handles empty input gracefully', () => {
  const result = perception.process([]);
  assert.deepEqual(result, []);
});

test('enhanceContext throws on non-array input', () => {
  assert.throws(() => perception.enhanceContext(null), TypeError);
  assert.throws(() => perception.enhanceContext({}), TypeError);
});

test('enhanceContext enhances correctly', () => {
  const categorizedData = [
    { input: { type: 'sound' }, category: 'sound' },
    { input: { type: 'sight' }, category: 'sight' }
  ];
  const result = perception.enhanceContext(categorizedData);
  assert.deepEqual(result, [
    { input: categorizedData[0].input, category: categorizedData[0].category, context: 'context for sound' },
    { input: categorizedData[1].input, category: categorizedData[1].category, context: 'context for sight' }
  ]);
});


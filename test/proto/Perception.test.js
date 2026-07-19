import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs classifies visual input', () => {
  const inputs = [{ type: 'visual', data: 'image data' }];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, [{ input: inputs[0], category: 'visual' }]);
});

test('process handles array of inputs', () => {
  const inputs = [{ type: 'visual', data: 'image data' }, { type: 'auditory', data: 'sound data' }];
  const result = perception.process(inputs);
  assert.deepEqual(result, [
    { input: inputs[0], category: 'visual', context: 'sight-related context' },
    { input: inputs[1], category: 'auditory', context: 'sound-related context' }
  ]);
});

test('process handles single input', () => {
  const inputs = [{ type: 'olfactory', data: 'smell data' }];
  const result = perception.process(inputs);
  assert.deepEqual(result, [{ input: inputs[0], category: 'olfactory', context: 'smell-related context' }]);
});

test('process throws on invalid data', () => {
  assert.throws(() => perception.process('invalid data'), TypeError);
});

test('enhanceContext correctly enhances data', () => {
  const categorizedData = [
    { input: { type: 'visual' }, category: 'visual' },
    { input: { type: 'auditory' }, category: 'auditory' }
  ];
  const result = perception.enhanceContext(categorizedData);
  assert.deepEqual(result, [
    { input: { type: 'visual' }, category: 'visual', context: 'sight-related context' },
    { input: { type: 'auditory' }, category: 'auditory', context: 'sound-related context' }
  ]);
});

test('enhanceContext throws on invalid categorized data', () => {
  assert.throws(() => perception.enhanceContext('invalid data'), TypeError);
});

test('categorizeSensoryInputs handles empty array', () => {
  const result = perception.categorizeSensoryInputs([]);
  assert.deepEqual(result, []);
});

test('process handles empty array', () => {
  const result = perception.process([]);
  assert.deepEqual(result, []);
});

test('categorizeSensoryInputs throws on non-object input', () => {
  assert.throws(() => perception.categorizeSensoryInputs([42]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([null]), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs([true]), TypeError);
});

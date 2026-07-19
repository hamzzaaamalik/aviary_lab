import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('enhanceWithContext adds context to categorized data', () => {
  const categorizedData = [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' }
  ];
  const context = 'test context';
  const enhancedData = perception.enhanceWithContext(categorizedData, context);
  assert.deepEqual(enhancedData, [
    { input: { sight: true }, category: 'visual', context: 'test context' },
    { input: { sound: true }, category: 'auditory', context: 'test context' }
  ]);
});

test('enhanceWithContext throws on invalid input', () => {
  assert.throws(() => perception.enhanceWithContext('not an array', 'context'), TypeError);
});

test('process method categorizes single input correctly', async () => {
  const result = await perception.process({ sight: true });
  assert.deepEqual(result, [{ input: { sight: true }, category: 'visual' }]);
});

test('process method throws on null input', async () => {
  await assert.rejects(() => perception.process(null), TypeError);
});


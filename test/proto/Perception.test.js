import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput returns correct category for sight input', () => {
  const result = perception.categorizeSensoryInput({ sight: true });
  assert.equal(result, 'visual');
});

test('categorizeSensoryInput throws for invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInput(42), TypeError);
});

test('processMultiple categorizes multiple inputs', async () => {
  const inputs = [{ sight: true }, { sound: true }, { smell: true }];
  const expected = [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
    { input: { smell: true }, category: 'olfactory' }
  ];
  const result = await perception.processMultiple(inputs);
  assert.deepEqual(result, expected);
});

test('processMultiple throws for invalid inputs', async () => {
  assert.rejects(() => perception.processMultiple(null), TypeError);
  assert.rejects(() => perception.processMultiple([]), TypeError);
  assert.rejects(() => perception.processMultiple([null]), TypeError);
});

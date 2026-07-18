import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processMultiple categorizes multiple inputs asynchronously', async () => {
  const inputs = [
    { sight: true },
    { sound: true },
    null,
    { taste: true },
    undefined
  ];
  try {
    await perception.processMultiple(inputs);
    assert.fail('Expected processMultiple to throw');
  } catch (err) {
    assert.equal(err.message, 'Input cannot be null or undefined');
  }

  const results = await perception.processMultiple([
    { sight: true },
    { sound: true },
    { taste: true }
  ]);

  assert.deepEqual(results, [
    { input: { sight: true }, category: 'visual' },
    { input: { sound: true }, category: 'auditory' },
    { input: { taste: true }, category: 'gustatory' }
  ]);
});

test('processMultiple throws on empty input array', async () => {
  try {
    await perception.processMultiple([]);
    assert.fail('Expected processMultiple to throw');
  } catch (err) {
    assert.equal(err.message, 'Inputs array cannot be empty');
  }
});

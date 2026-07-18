import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('process categorizes single sensory input', async () => {
  const result = await perception.process({ sight: true });
  assert.equal(result, 'visual');
});

test('processMultiple categorizes multiple sensory inputs', async () => {
  const inputs = [{ sight: true }, { sound: true }, { smell: true }];
  const results = await perception.processMultiple(inputs);
  assert.deepEqual(results, ['visual', 'auditory', 'olfactory']);
});

test('process throws on null input', async () => {
  await assert.rejects(async () => {
    await perception.process(null);
  }, { name: 'TypeError' });
});

test('processMultiple throws on invalid input', async () => {
  await assert.rejects(async () => {
    await perception.processMultiple('not an array');
  }, { name: 'TypeError' });
});


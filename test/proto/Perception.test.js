import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('normalizeInputs transforms strings to objects', () => {
  const perception = new Perception();
  const inputs = ['text1', 'text2'];
  const normalized = perception.normalizeInputs(inputs);
  assert.deepEqual(normalized, [
    { type: 'text', value: 'text1' },
    { type: 'text', value: 'text2' }
  ]);
});

test('process method handles normalization and categorization', () => {
  const perception = new Perception();
  const inputs = ['text1', { type: 'sensor', value: 42 }];
  const result = perception.process(inputs);
  assert.equal(result.length, 2);
  assert.equal(result[0].category, 'text');
  assert.equal(result[1].category, 'sensor');
});

test('process throws on invalid input', () => {
  const perception = new Perception();
  assert.throws(() => perception.process('invalid'), TypeError);
});

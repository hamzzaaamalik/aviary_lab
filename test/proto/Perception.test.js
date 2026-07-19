import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('filterByCriteria filters inputs correctly', () => {
  const inputs = [{ type: 'sound' }, { type: 'sight' }, { type: 'scent' }];
  const criteria = (input) => input.type === 'sound';
  const result = perception.filterByCriteria(inputs, criteria);
  assert.deepEqual(result, [{ type: 'sound' }]);
});

test('filterByCriteria throws on non-array inputs', () => {
  assert.throws(() => perception.filterByCriteria({}, () => true), TypeError);
});

test('filterByCriteria throws on non-function criteria', () => {
  assert.throws(() => perception.filterByCriteria([], 'not-a-function'), TypeError);
});

// Additional tests for process method

test('process categorizes valid sensory input', async () => {
  const result = await perception.process({ sight: true });
  assert.equal(result, 'visual');
});

test('process throws on null input', async () => {
  await assert.rejects(() => perception.process(null), { name: 'TypeError' });
});

test('process throws on undefined input', async () => {
  await assert.rejects(() => perception.process(undefined), { name: 'TypeError' });
});

// Add more tests as necessary for other methods

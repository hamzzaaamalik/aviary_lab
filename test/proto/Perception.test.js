import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('enhanceContext throws TypeError on invalid categorized data', () => {
  assert.throws(() => perception.enhanceContext(null), TypeError);
  assert.throws(() => perception.enhanceContext({}), TypeError);
});

test('enhanceContext handles empty categorized data', () => {
  const result = perception.enhanceContext([]);
  assert.deepEqual(result, []);
});

test('enhanceContext enriches categorized data with context', () => {
  const categorizedData = [{ input: { type: 'test' }, category: 'testCategory' }];
  const result = perception.enhanceContext(categorizedData);
  assert.deepEqual(result, [{ input: { type: 'test' }, category: 'testCategory', context: 'context for testCategory' }]);
});

test('enhanceContext throws TypeError for unknown category', () => {
  perception._determineContext = () => undefined;  // Mocking to force unknown category
  const categorizedData = [{ input: { type: 'test' }, category: 'unknownCategory' }];
  assert.throws(() => perception.enhanceContext(categorizedData), TypeError);
});

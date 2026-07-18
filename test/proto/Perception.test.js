import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput handles visual input', () => {
  const category = perception.categorizeSensoryInput({ sight: true });
  assert.equal(category, 'visual');
});

test('categorizeSensoryInput handles auditory input', () => {
  const category = perception.categorizeSensoryInput({ sound: true });
  assert.equal(category, 'auditory');
});

test('processMultiple categorizes multiple inputs', () => {
  const categories = perception.processMultiple([
    { sight: true },
    { sound: true },
    { smell: true },
  ]);
  assert.deepEqual(categories, ['visual', 'auditory', 'olfactory']);
});

test('handleBatch categorizes multiple sensory inputs', () => {
  const categories = perception.handleBatch([
    { taste: true },
    { touch: true },
    { unknown: true },
  ]);
  assert.deepEqual(categories, ['gustatory', 'tactile', 'unknown']);
});

test('handleBatch throws TypeError with non-array input', () => {
  assert.throws(() => perception.handleBatch('not an array'), TypeError);
});


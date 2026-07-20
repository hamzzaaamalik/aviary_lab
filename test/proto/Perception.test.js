import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('enhanceContext enriches categorized data with context', () => {
  const categorizedData = [
    { input: { type: 'sound' }, category: 'audio' },
    { input: { type: 'image' }, category: 'visual' }
  ];
  const enhancedData = perception.enhanceContext(categorizedData);
  assert.deepEqual(enhancedData, [
    { input: { type: 'sound' }, category: 'audio', context: 'Context for audio' },
    { input: { type: 'image' }, category: 'visual', context: 'Context for visual' }
  ]);
});

// ... (other existing tests)
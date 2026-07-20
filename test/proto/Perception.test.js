import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('enhanceContext enriches categorized data with context', () => {
  const perception = new Perception();
  const categorizedData = [
    { input: { type: 'known' }, category: 'known' },
    { input: { type: 'unknown' }, category: 'unknown' }
  ];
  assert.throws(() => perception.enhanceContext(categorizedData), TypeError);
});

test('process enhances inputs correctly', () => {
  const perception = new Perception();
  const inputs = [
    { type: 'known' },
    { type: 'known' }
  ];
  const enhanced = perception.process(inputs);
  assert.equal(enhanced.length, 2);
  assert.equal(enhanced[0].context, 'contextual info');
});

test('enhanceContext throws on unknown category', () => {
  const perception = new Perception();
  const categorizedData = [
    { input: { type: 'known' }, category: 'known' },
    { input: { type: 'unknown' }, category: 'unknown' }
  ];
  assert.throws(() => perception.enhanceContext(categorizedData), TypeError);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput returns correct category for valid inputs', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
  assert.equal(perception.categorizeSensoryInput({ smell: true }), 'olfactory');
  assert.equal(perception.categorizeSensoryInput({ taste: true }), 'gustatory');
  assert.equal(perception.categorizeSensoryInput({ touch: true }), 'tactile');
});

test('categorizeSensoryInput throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInput(42), TypeError);
  assert.throws(() => perception.categorizeSensoryInput('string'), TypeError);
});

test('process returns correct categorization result', () => {
  const result = perception.process({ sight: true });
  assert.deepEqual(result, { category: 'visual', data: { sight: true } });
});

test('process throws TypeError for invalid input', () => {
  assert.throws(() => perception.process(null), TypeError);
  assert.throws(() => perception.process(42), TypeError);
});

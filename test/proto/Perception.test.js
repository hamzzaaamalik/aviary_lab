import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput correctly categorizes visual input', () => {
  const category = perception.categorizeSensoryInput({ sight: true });
  assert.equal(category, 'visual');
});

test('categorizeSensoryInput correctly categorizes auditory input', () => {
  const category = perception.categorizeSensoryInput({ sound: true });
  assert.equal(category, 'auditory');
});

test('categorizeSensoryInput throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInput('string'), TypeError);
});

test('process handles single input correctly', () => {
  const category = perception.process({ sound: true });
  assert.equal(category, 'auditory');
});

test('process throws on invalid data', () => {
  assert.throws(() => perception.process(null), TypeError);
});

test('processMultiple handles multiple inputs correctly', () => {
  const categories = perception.processMultiple([
    { sight: true },
    { smell: true }
  ]);
  assert.deepEqual(categories, ['visual', 'olfactory']);
});

test('processMultiple throws on invalid inputs', () => {
  assert.throws(() => perception.processMultiple(null), TypeError);
});


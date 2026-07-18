import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput returns correct category', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
});

test('process throws on invalid input', () => {
  assert.throws(() => perception.process(null), TypeError);
});

test('processMultiple categorizes multiple inputs', () => {
  const inputs = [{ sight: true }, { sound: true }];
  const categories = perception.processMultiple(inputs);
  assert.deepEqual(categories, ['visual', 'auditory']);
});

test('processMultiple throws on invalid input', () => {
  assert.throws(() => perception.processMultiple(null), TypeError);
  assert.throws(() => perception.processMultiple('not an array'), TypeError);
});


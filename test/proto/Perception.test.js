import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes valid inputs', () => {
  const inputs = [
    { type: 'visual', data: 'image data' },
    { type: 'auditory', data: 'sound data' }
  ];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.equal(result.length, 2);
  assert.equal(result[0].category, 'visual');
  assert.equal(result[1].category, 'auditory');
});

test('categorizeSensoryInputs throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInputs(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs({}), TypeError);
});

test('process enhances categorized data', () => {
  const inputs = [
    { type: 'visual', data: 'image data' }
  ];
  const result = perception.process(inputs);
  assert.equal(result.length, 1);
  assert.equal(result[0].context, 'sight-related context');
});

test('process throws on invalid input', () => {
  assert.throws(() => perception.process(null), TypeError);
  assert.throws(() => perception.process({}), TypeError);
});


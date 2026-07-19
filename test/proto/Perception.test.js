import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('batchProcess categorizes and enhances sensory inputs', () => {
  const inputs = [
    { type: 'visual', data: 'image1' },
    { type: 'auditory', data: 'sound1' },
    { type: 'olfactory', data: 'smell1' }
  ];
  const result = perception.batchProcess(inputs);
  assert.equal(result.length, 3);
  assert.equal(result[0].category, 'visual');
  assert.equal(result[0].context, 'sight context');
  assert.equal(result[1].category, 'auditory');
  assert.equal(result[1].context, 'sound context');
  assert.equal(result[2].category, 'olfactory');
  assert.equal(result[2].context, 'smell context');
});

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws on invalid input object', () => {
  const inputs = [
    { type: 'visual', data: 'image1' },
    'invalid input'
  ];
  assert.throws(() => perception.categorizeSensoryInputs(inputs), TypeError);
});

test('process throws on non-array input', () => {
  assert.throws(() => perception.process('not an array'), TypeError);
});

test('enhanceContext throws on non-array input', () => {
  assert.throws(() => perception.enhanceContext('not an array'), TypeError);
});

test('categorizeSensoryInputs throws on unknown input type', () => {
  const inputs = [{ type: 'unknown', data: 'data' }];
  assert.throws(() => perception.categorizeSensoryInputs(inputs), TypeError);
});

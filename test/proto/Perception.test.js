import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs(null), TypeError);
});

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'visual' },
    { type: 'auditory' }
  ];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, [
    { input: { type: 'visual' }, category: 'visual' },
    { input: { type: 'auditory' }, category: 'auditory' }
  ]);
});

test('process enhances sensory data', () => {
  const inputs = [
    { type: 'visual' },
    { type: 'auditory' }
  ];
  const result = perception.process(inputs);
  assert.equal(result.length, 2);
  assert.ok(result[0].context.includes('visual perception'));
  assert.ok(result[1].context.includes('auditory perception'));
});

test('process throws on non-array input', () => {
  assert.throws(() => perception.process(null), TypeError);
});


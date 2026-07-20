import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes inputs correctly', () => {
  const inputs = [
    { type: 'visual', data: 'image1' },
    { type: 'auditory', data: 'sound1' },
  ];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, [
    { input: inputs[0], category: 'visual' },
    { input: inputs[1], category: 'auditory' },
  ]);
});

test('process enhances categorized inputs', () => {
  const inputs = [ { type: 'visual' }, { type: 'auditory' } ];
  const result = perception.process(inputs);
  assert.equal(result.length, 2);
  assert.ok(result[0].context); // context should be present
});

test('batchProcess enhances categorized inputs efficiently', () => {
  const inputs = [ { type: 'visual' }, { type: 'tactile' } ];
  const result = perception.batchProcess(inputs);
  assert.equal(result.length, 2);
  assert.ok(result[0].context);
});

// Additional test cases for error handling

test('categorizeSensoryInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('process throws TypeError for invalid input', () => {
  assert.throws(() => perception.process('not an array'), TypeError);
});

test('batchProcess throws TypeError for invalid input', () => {
  assert.throws(() => perception.batchProcess('not an array'), TypeError);
});

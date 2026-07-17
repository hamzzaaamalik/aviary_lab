import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs categorizes valid inputs correctly', () => {
  const inputs = [1, 'text', true, null, undefined, { key: 'value' }];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    number: [1],
    string: ['text'],
    boolean: [true],
    object: [null, { key: 'value' }],
    undefined: [undefined],
  });
});


test('categorizeSensoryInputs throws TypeError for invalid input type', () => {
  const inputs = [1, 'text', true, Symbol('sym')];
  assert.throws(() => perception.categorizeSensoryInputs(inputs), TypeError);
});


test('categorizeSensoryInputs throws TypeError if not an array', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

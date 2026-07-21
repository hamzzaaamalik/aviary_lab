import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('classifyWithValidation classifies inputs correctly', () => {
  const inputs = [1, 2, 3, 4, 5];
  const classifier = (x) => (x % 2 === 0 ? 'even' : 'odd');
  const validator = (x) => typeof x === 'number';
  const result = perception.classifyWithValidation(inputs, classifier, validator);
  assert.deepEqual(result, { odd: [1, 3, 5], even: [2, 4] });
});

test('classifyWithValidation rejects invalid inputs', () => {
  const inputs = [1, 2, 'three', 4];
  const classifier = (x) => (x % 2 === 0 ? 'even' : 'odd');
  const validator = (x) => typeof x === 'number';
  const result = perception.classifyWithValidation(inputs, classifier, validator);
  assert.deepEqual(result, { odd: [1], even: [2, 4] });
});

test('classifyWithValidation throws error if classifier is not a function', () => {
  const inputs = [1, 2, 3];
  const classifier = 'not a function';
  const validator = (x) => typeof x === 'number';
  assert.throws(() => perception.classifyWithValidation(inputs, classifier, validator), TypeError);
});

test('classifyWithValidation throws error if validator is not a function', () => {
  const inputs = [1, 2, 3];
  const classifier = (x) => (x % 2 === 0 ? 'even' : 'odd');
  const validator = 'not a function';
  assert.throws(() => perception.classifyWithValidation(inputs, classifier, validator), TypeError);
});

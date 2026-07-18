import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('processMultiple categorizes multiple inputs correctly', () => {
  const inputs = [
    { sight: true },
    { sound: true },
    { smell: true },
    { unknown: true }
  ];
  const categories = perception.processMultiple(inputs);
  assert.deepEqual(categories, ['visual', 'auditory', 'olfactory', 'unknown']);
});

test('handleMultipleInputs validates and categorizes multiple inputs', () => {
  const inputs = [
    { sight: true },
    { touch: true },
    null,
    { unknown: true }
  ];
  assert.throws(() => perception.handleMultipleInputs(inputs), TypeError);
});


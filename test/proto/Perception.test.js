import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInputs with valid array', () => {
  const inputs = [1, 'test', true, null];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    number: [1],
    string: ['test'],
    boolean: [true],
    object: [null],
  });
});

test('categorizeSensoryInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.categorizeSensoryInputs('not an array'), TypeError);
});

test('categorizeSensoryInputs throws TypeError for empty array', () => {
  const result = perception.categorizeSensoryInputs([]);
  assert.deepEqual(result, {});
});

test('categorizeSensoryInputs with mixed types', () => {
  const inputs = [1, 'test', false, { key: 'value' }, [1, 2]];
  const result = perception.categorizeSensoryInputs(inputs);
  assert.deepEqual(result, {
    number: [1],
    string: ['test'],
    boolean: [false],
    object: [{ key: 'value' }, [1, 2]],
  });
});

test('categorizeSensoryInputs throws TypeError for invalid type', () => {
  assert.throws(() => perception.categorizeSensoryInputs(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInputs(123), TypeError);
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('validateSensoryInputs throws on non-array input', () => {
  assert.throws(() => perception.validateSensoryInputs('not an array'), TypeError);
});

test('validateSensoryInputs throws on invalid input object', () => {
  assert.throws(() => perception.validateSensoryInputs([{ type: '' }]), TypeError);
  assert.throws(() => perception.validateSensoryInputs([{ data: 123 }]), TypeError);
});

test('aggregateSensoryInputs handles valid inputs', () => {
  const inputs = [{ type: 'sound', data: { volume: 10 } }, { type: 'sight', data: { brightness: 100 } }];
  const result = perception.aggregateSensoryInputs(inputs);
  assert.equal(result.get('sound').length, 1);
  assert.equal(result.get('sight').length, 1);
});

test('transformSensoryInputs applies transformation correctly', () => {
  const inputs = [{ type: 'sound', data: { volume: 10 } }];
  const result = perception.transformSensoryInputs(inputs, input => ({ ...input, transformed: true }));
  assert.deepEqual(result, [{ type: 'sound', data: { volume: 10 }, transformed: true }]);
});

test('transformSensoryInputs throws on invalid function', () => {
  assert.throws(() => perception.transformSensoryInputs([], 'not a function'), TypeError);
});

test('filterSensoryInputs filters correctly', () => {
  const inputs = [{ type: 'sound', data: {} }, { type: 'sight', data: {} }];
  const result = perception.filterSensoryInputs(inputs, 'sound');
  assert.equal(result.length, 1);
  assert.equal(result[0].type, 'sound');
});

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('detect returns detected inputs above threshold', () => {
  const inputs = [1, 2, 3, 4, 5];
  const threshold = 3;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, [4, 5]);
});

test('detect returns empty array when nothing detected', () => {
  const inputs = [1, 2, 3];
  const threshold = 5;
  const result = perception.detect(inputs, threshold);
  assert.deepEqual(result, []);
});

test('detect throws TypeError for invalid threshold', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.detect(inputs, 'invalid'), TypeError);
});

test('filter returns filtered inputs', () => {
  const inputs = [1, 2, 3, 4, 5];
  const predicate = (input) => input % 2 === 0;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, [2, 4]);
});

test('filter returns empty array when nothing matches', () => {
  const inputs = [1, 3, 5];
  const predicate = (input) => input % 2 === 0;
  const result = perception.filter(inputs, predicate);
  assert.deepEqual(result, []);
});

test('filter throws TypeError for invalid predicate', () => {
  const inputs = [1, 2, 3];
  assert.throws(() => perception.filter(inputs, 'invalid'), TypeError);
});

test('detect throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.detect('not an array', 1), TypeError);
});

test('filter throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.filter('not an array', () => true), TypeError);
});

test('normalize handles empty array', () => {
  const result = perception.normalize([]);
  assert.deepEqual(result, []);
});

test('normalize throws TypeError for invalid inputs', () => {
  assert.throws(() => perception.normalize(['invalid']), TypeError);
});

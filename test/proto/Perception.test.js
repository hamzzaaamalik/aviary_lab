import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('process validates and categorizes valid inputs', () => {
  const inputs = [1, 'text', true, null, { key: 'value' }];
  const result = perception.process(inputs);
  assert.deepEqual(result.categorized, {
    number: [1],
    string: ['text'],
    boolean: [true],
    object: [null, { key: 'value' }]
  });
  assert.deepEqual(result.errors, []);
});

test('process collects errors for invalid inputs', () => {
  const inputs = [1, 'text', true, Symbol('sym'), { key: 'value' }];
  const result = perception.process(inputs);
  assert.deepEqual(result.categorized, {
    number: [1],
    string: ['text'],
    boolean: [true],
    object: [{ key: 'value' }]
  });
  assert.deepEqual(result.errors, ['Invalid input type: symbol. Expected one of: string, number, object, boolean, undefined, function']);
});


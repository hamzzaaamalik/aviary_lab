import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('process valid sensory inputs', () => {
  const inputs = [{ type: 'sound', value: 'ding' }, { type: 'sight', value: 'light' }];
  const result = perception.process(inputs);
  assert.equal(result.length, 2);
  assert.ok(result[0].context.includes('Context for category: sound'));
  assert.ok(result[1].context.includes('Context for category: sight'));
});

test('process throws on invalid input type', () => {
  assert.throws(() => perception.process([{ type: null }]), TypeError);
  assert.throws(() => perception.process('invalid'), TypeError);
});

test('batchProcess processes inputs in batch', () => {
  const inputs = [{ type: 'sound', value: 'beep' }, { type: 'sight', value: 'color' }];
  const result = perception.batchProcess(inputs);
  assert.equal(result.length, 2);
});

test('enhanceContext throws on invalid categorized data', () => {
  assert.throws(() => perception.enhanceContext('not an array'), TypeError);
});


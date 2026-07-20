import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('process enhances sensory input with metadata', () => {
  const perception = new Perception();
  const inputs = [
    { type: 'sound', source: 'microphone' },
    { type: 'sight', source: 'camera' }
  ];
  const result = perception.process(inputs);
  assert.equal(result.length, 2);
  assert.ok(result[0].metadata.timestamp);
  assert.equal(result[0].metadata.source, 'microphone');
  assert.equal(result[0].metadata.confidence, 0.9);
  assert.ok(result[1].metadata.timestamp);
  assert.equal(result[1].metadata.source, 'camera');
});

test('process throws error for invalid input', () => {
  const perception = new Perception();
  assert.throws(() => perception.process(null), TypeError);
  assert.throws(() => perception.process([{ type: null }]), TypeError);
});

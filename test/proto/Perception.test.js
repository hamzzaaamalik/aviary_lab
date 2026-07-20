import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('batchProcess categorizes and enhances sensory inputs', () => {
  const inputs = [
    { type: 'sound', data: 'beep' },
    { type: 'image', data: 'photo.jpg' },
  ];
  const result = perception.batchProcess(inputs);
  assert.equal(result.length, 2);
  assert.equal(result[0].category, 'sound');
  assert.equal(result[1].category, 'image');
  assert.ok(result[0].context.includes('context for sound'));
  assert.ok(result[1].context.includes('context for image'));
});

test('batchProcess throws on invalid inputs', () => {
  assert.throws(() => perception.batchProcess('invalid'), TypeError);
  assert.throws(() => perception.batchProcess([{ type: null }]), TypeError);
});


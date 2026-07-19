import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('batchProcess categorizes and enhances sensory inputs', () => {
  const perception = new Perception();
  const inputs = [
    { type: 'visual', data: 'some visual data' },
    { type: 'auditory', data: 'some audio data' },
    { type: 'unknown' },
  ];
  const result = perception.batchProcess(inputs);
  assert.equal(result.length, 3);
  assert.equal(result[0].category, 'visual');
  assert.equal(result[1].category, 'auditory');
  assert.equal(result[2].category, 'unknown');
  assert.ok(result[0].context.includes('visual perception'));
  assert.ok(result[1].context.includes('auditory perception'));
  assert.ok(result[2].context.includes('general context'));
});

test('batchProcess throws for invalid inputs', () => {
  const perception = new Perception();
  assert.throws(() => perception.batchProcess('not an array'), TypeError);
  assert.throws(() => perception.batchProcess([{ type: null }]), TypeError);
});

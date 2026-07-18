import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('categorizeSensoryInput categorizes visual input', () => {
  const perception = new Perception();
  const result = perception.categorizeSensoryInput({ sight: true });
  assert.equal(result, 'visual');
});

test('categorizeSensoryInput categorizes auditory input', () => {
  const perception = new Perception();
  const result = perception.categorizeSensoryInput({ sound: true });
  assert.equal(result, 'auditory');
});

test('categorizeSensoryInput returns unknown for unrecognized input', () => {
  const perception = new Perception();
  const result = perception.categorizeSensoryInput({ touch: true });
  assert.equal(result, 'unknown');
});

test('categorizeSensoryInput throws TypeError for invalid input', () => {
  const perception = new Perception();
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInput(42), TypeError);
  assert.throws(() => perception.categorizeSensoryInput('string'), TypeError);
});

test('process method returns correct categorization', () => {
  const perception = new Perception();
  const result = perception.process({ sight: true });
  assert.equal(result, 'visual');
});

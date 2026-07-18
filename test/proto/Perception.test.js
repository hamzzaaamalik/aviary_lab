import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput returns correct category', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
  assert.equal(perception.categorizeSensoryInput({ smell: true }), 'olfactory');
  assert.equal(perception.categorizeSensoryInput({ taste: true }), 'gustatory');
  assert.equal(perception.categorizeSensoryInput({ touch: true }), 'tactile');
});

test('categorizeSensoryInput throws TypeError for invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInput(123), TypeError);
  assert.throws(() => perception.categorizeSensoryInput('string'), TypeError);
  assert.throws(() => perception.categorizeSensoryInput(undefined), TypeError);
});

test('process throws TypeError for invalid data', () => {
  assert.throws(() => perception.process(null), TypeError);
  assert.throws(() => perception.process(undefined), TypeError);
});

test('processMultiple throws TypeError for non-array input', () => {
  assert.throws(() => perception.processMultiple(null), TypeError);
  assert.throws(() => perception.processMultiple(123), TypeError);
});

test('handleSingleInput throws TypeError for invalid input', () => {
  assert.throws(() => perception.handleSingleInput(null), TypeError);
  assert.throws(() => perception.handleSingleInput(undefined), TypeError);
});

test('handleMultipleInputs throws TypeError for non-array input', () => {
  assert.throws(() => perception.handleMultipleInputs(null), TypeError);
  assert.throws(() => perception.handleMultipleInputs(123), TypeError);
});


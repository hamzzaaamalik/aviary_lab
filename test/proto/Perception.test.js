import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput identifies valid inputs', () => {
  assert.equal(perception.categorizeSensoryInput({ sight: true }), 'visual');
  assert.equal(perception.categorizeSensoryInput({ sound: true }), 'auditory');
  assert.equal(perception.categorizeSensoryInput({ smell: true }), 'olfactory');
  assert.equal(perception.categorizeSensoryInput({ taste: true }), 'gustatory');
  assert.equal(perception.categorizeSensoryInput({ touch: true }), 'tactile');
});

test('categorizeSensoryInput warns on unknown input', () => {
  const consoleWarn = console.warn;
  let warned = false;
  console.warn = () => { warned = true; };
  const category = perception.categorizeSensoryInput({ random: true });
  console.warn = consoleWarn;
  assert.equal(category, 'unknown');
  assert.ok(warned);
});

test('process returns category only', () => {
  assert.equal(perception.process({ sight: true }), 'visual');
});

test('process throws on invalid data', () => {
  assert.throws(() => perception.process(null), TypeError);
  assert.throws(() => perception.process(undefined), TypeError);
});

test('categorizeSensoryInput throws on invalid input', () => {
  assert.throws(() => perception.categorizeSensoryInput(null), TypeError);
  assert.throws(() => perception.categorizeSensoryInput(42), TypeError);
});

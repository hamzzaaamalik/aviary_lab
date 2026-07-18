import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

const perception = new Perception();

test('categorizeSensoryInput categorizes visual input', () => {
  const result = perception.categorizeSensoryInput({ sight: true });
  assert.equal(result, 'visual');
});

test('categorizeSensoryInput categorizes auditory input', () => {
  const result = perception.categorizeSensoryInput({ sound: true });
  assert.equal(result, 'auditory');
});

test('process returns expected category', () => {
  const result = perception.process({ smell: true });
  assert.equal(result, 'olfactory');
});

test('processMultiple handles multiple inputs', () => {
  const inputs = [{ sight: true }, { sound: true }, { unknown: true }];
  const result = perception.processMultiple(inputs);
  assert.deepEqual(result, ['visual', 'auditory', 'unknown']);
});

test('handleSingleInput throws TypeError on invalid input', () => {
  assert.throws(() => perception.handleSingleInput(null), TypeError);
});

test('logInput logs the input to the console', () => {
  const input = { sight: true };
  const consoleLogSpy = console.log;
  console.log = (...args) => { assert.deepEqual(args, ['Received sensory input:', input]); };
  perception.logInput(input);
  console.log = consoleLogSpy;  // Restore original console.log
});

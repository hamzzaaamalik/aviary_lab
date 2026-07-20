import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Perception } from '../../src/proto/Perception.js';

test('analyzeContext enhances categorized data with analysis', () => {
  const perception = new Perception();
  const inputs = [{ type: 'sound', value: 'clap' }, { type: 'sight', value: 'light' }];
  const categorized = perception.categorizeSensoryInputs(inputs);
  const analyzed = perception.analyzeContext(categorized);

  assert.equal(analyzed.length, 2);
  assert.equal(analyzed[0].analysis, 'analyzed');
  assert.equal(analyzed[1].analysis, 'analyzed');
});

test('analyzeContext rejects non-array input', () => {
  const perception = new Perception();
  assert.throws(() => perception.analyzeContext('invalid input'), TypeError);
});


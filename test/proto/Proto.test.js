import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createKernel } from '../../src/kernel/index.js';
import { Proto } from '../../src/proto/Proto.js';

test('PROTO requires a kernel context', () => {
  assert.throws(() => new Proto(null), TypeError);
});

test('a cycle degrades gracefully with no faculties attached', async () => {
  const proto = new Proto(createKernel());
  const { percept, thought, action } = await proto.cycle('a signal');
  assert.equal(percept, 'a signal');
  assert.equal(thought, null);
  assert.equal(action, null);
});

test('attached faculties are used in perceive -> think -> act order', async () => {
  const proto = new Proto(createKernel());
  proto.attach('perception', { perceive: (i) => ({ raw: i }) });
  proto.attach('reasoning', { think: (p) => ({ goal: p.raw.toUpperCase() }) });
  proto.attach('voice', { express: (t) => 'say: ' + t.goal });
  const out = await proto.cycle('hello');
  assert.deepEqual(out.percept, { raw: 'hello' });
  assert.equal(out.action, 'say: HELLO');
});

test('async faculties are awaited — a real faculty does I/O', async () => {
  const proto = new Proto(createKernel());
  proto.attach('perception', { perceive: async (i) => ({ raw: i }) });
  proto.attach('reasoning', { think: async (p) => ({ goal: p.raw.length }) });
  proto.attach('voice', { express: async (t) => 'len ' + t.goal });
  const out = await proto.cycle('abc');
  assert.equal(out.action, 'len 3');
});

test('a failing faculty is isolated and reported, falling back to the raw input', async () => {
  const kernel = createKernel();
  const proto = new Proto(kernel);
  const errors = [];
  kernel.bus.on('proto:error', (e) => errors.push(e.faculty));
  proto.attach('perception', { perceive: () => { throw new Error('sensor down'); } });
  const out = await proto.cycle('x');
  assert.equal(out.percept, 'x'); // perception failed, so the raw signal passes through untouched
  assert.deepEqual(errors, ['perception']);
});

test('a REJECTING async faculty is isolated too', async () => {
  const kernel = createKernel();
  const proto = new Proto(kernel);
  const errors = [];
  kernel.bus.on('proto:error', (e) => errors.push(e.message));
  proto.attach('reasoning', { think: async () => { throw new Error('model timeout'); } });
  const out = await proto.cycle('x');
  assert.equal(out.thought, null);
  assert.deepEqual(errors, ['model timeout']);
});

test('awaken announces the mind is online', () => {
  const kernel = createKernel();
  const proto = new Proto(kernel);
  let awake = false;
  kernel.bus.on('proto:awake', () => { awake = true; });
  proto.awaken();
  assert.ok(awake);
  assert.ok(proto.alive);
});

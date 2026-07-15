/**
 * A minimal agent: three faculties wired onto the kernel.
 *
 * Run it:  npm run example
 *
 * Each faculty is just an object with a method — no base class, no config, no dependencies.
 * Swap any of them for a call to a real model and you have a working autonomous agent.
 */
import { createKernel, Proto } from '../src/index.js';

const kernel = createKernel();
const agent = new Proto(kernel);

// Observe everything the mind does.
kernel.bus.on('proto:cycle', ({ action }) => console.log('  -> ' + action));
kernel.bus.on('proto:error', (e) => console.error('  !! ' + e.faculty + ' failed: ' + e.message));

agent
  .attach('perception', {
    /** Turn raw input into a structured percept. */
    perceive: (input) => ({ text: String(input).trim(), words: String(input).trim().split(/\s+/).length }),
  })
  .attach('reasoning', {
    /** Decide what to do about it. */
    think: (percept) => ({ goal: percept.words > 3 ? 'summarise' : 'answer', subject: percept.text }),
  })
  .attach('voice', {
    /** Say it. */
    express: (thought) => `${thought.goal}: "${thought.subject}"`,
  });

agent.awaken();

for (const input of ['hello', 'build something that is actually real']) {
  console.log('input: ' + input);
  await agent.cycle(input);
}

// A faculty that is missing simply degrades — the loop keeps running.
const bare = new Proto(createKernel());
console.log('\nwith no faculties attached:', JSON.stringify(await bare.cycle('still works')));

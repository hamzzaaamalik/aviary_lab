// GraduationLoop.js

/**
 * GraduationLoop manages the perception, reasoning, and action flow for PROTO.
 * It integrates the perception module to gather inputs and processes them through reasoning.
 */
class GraduationLoop {
  constructor(perception, decisionMaker) {
    this.perception = perception;
    this.decisionMaker = decisionMaker;
    this.running = false;
  }

  /**
   * Starts the loop, continuously processing input and making decisions.
   */
  start() {
    this.running = true;
    this.loop();
  }

  /**
   * Stops the loop.
   */
  stop() {
    this.running = false;
  }

  /**
   * Main loop that manages perception and reasoning.
   * @private
   */
  loop() {
    if (!this.running) return;
    const input = this.perception.getInput();
    const decision = this.decisionMaker.makeDecision(input);
    this.act(decision);
    requestAnimationFrame(this.loop.bind(this));
  }

  /**
   * Executes the given decision.
   * @param {Object} decision - The decision object made by the reasoning module.
   */
  act(decision) {
    // Implement action execution based on the decision
    console.log('Executing decision:', decision);
  }
}

export default GraduationLoop;

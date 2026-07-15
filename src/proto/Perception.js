/**
 * Perception — the faculty responsible for processing sensory input.
 */
export class Perception {
  /**
   * Process sensory input to extract percepts.
   * @param {string} input - The raw sensory input.
   * @param {number} urgency - The urgency level of the input (1-5).
   * @returns {Promise<object>} - The processed percept.
   * @throws {TypeError} - If the input is not a string or urgency is out of bounds.
   */
  async perceive(input, urgency) {
    if (typeof input !== 'string') {
      throw new TypeError('input must be a string');
    }
    if (typeof urgency !== 'number' || urgency < 1 || urgency > 5) {
      throw new TypeError('urgency must be a number between 1 and 5');
    }
    // Simulating sensory processing with urgency consideration.
    return new Promise((resolve) => {
      const percept = { processed: `Percept from: ${input}`, urgency };
      resolve(percept);
    });
  }

  /**
   * Process an array of sensory inputs to extract percepts.
   * @param {Array<{input: string, urgency: number}>} inputs - An array of raw sensory inputs with urgency levels.
   * @returns {Promise<Array<object>>} - An array of processed percepts.
   * @throws {TypeError} - If any input is invalid.
   */
  async perceiveBatch(inputs) {
    if (!Array.isArray(inputs)) {
      throw new TypeError('inputs must be an array');
    }
    const percepts = await Promise.all(inputs.map(({ input, urgency }) => this.perceive(input, urgency)));
    return percepts;
  }
}

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
    this.#validateSensoryInput(input, urgency);
    // Simulating sensory processing with urgency consideration.
    return new Promise((resolve) => {
      const percept = { processed: `Percept from: ${input}`, urgency };
      resolve(percept);
    });
  }

  /**
   * Safely process multiple inputs.
   * @param {Array<{input: string, urgency: number}>} inputs - Array of sensory inputs with urgency levels.
   * @returns {Promise<object[]>} - Array of processed percepts.
   * @throws {TypeError} - If any input is invalid.
   */
  async perceiveMultiple(inputs) {
    if (!Array.isArray(inputs)) {
      throw new TypeError('inputs must be an array');
    }
    if (inputs.length === 0) {
      return []; // Return an empty array for empty input.
    }
    const percepts = [];
    for (const { input, urgency } of inputs) {
      this.#validateSensoryInput(input, urgency);
      const percept = await this.perceive(input, urgency);
      percepts.push(percept);
    }
    return percepts;
  }

  /**
   * Aggregate multiple percepts based on urgency level.
   * @param {Array<object>} percepts - Array of processed percepts.
   * @returns {object} - Aggregated percepts.
   */
  aggregatePercepts(percepts) {
    if (!Array.isArray(percepts) || percepts.length === 0) {
      throw new TypeError('percepts must be a non-empty array');
    }
    const aggregated = percepts.reduce((acc, { processed, urgency }) => {
      acc[urgency] = acc[urgency] || [];
      acc[urgency].push(processed);
      return acc;
    }, {});
    return aggregated;
  }

  /**
   * Validates the sensory input and urgency.
   * @private
   * @param {string} input 
   * @param {number} urgency 
   * @throws {TypeError} - If the input or urgency is invalid.
   */
  #validateSensoryInput(input, urgency) {
    if (input === null || input === undefined) {
      throw new TypeError('input cannot be null or undefined');
    }
    if (typeof input !== 'string') {
      throw new TypeError('input must be a string');
    }
    if (typeof urgency !== 'number' || urgency < 1 || urgency > 5) {
      throw new TypeError('urgency must be a number between 1 and 5');
    }
  }
}

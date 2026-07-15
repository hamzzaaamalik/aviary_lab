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
    this.#validateInput(input, urgency);
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
      this.#validateInput(input, urgency);
      const percept = await this.perceive(input, urgency);
      percepts.push(percept);
    }
    return percepts;
  }

  /**
   * Validates the sensory input and urgency.
   * @private
   * @param {string} input 
   * @param {number} urgency 
   * @throws {TypeError} - If the input or urgency is invalid.
   */
  #validateInput(input, urgency) {
    if (typeof input !== 'string') {
      throw new TypeError('input must be a string');
    }
    if (typeof urgency !== 'number' || urgency < 1 || urgency > 5) {
      throw new TypeError('urgency must be a number between 1 and 5');
    }
  }
}
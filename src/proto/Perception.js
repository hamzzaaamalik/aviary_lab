/**
 * Perception — the faculty responsible for processing sensory input.
 */
export class Perception {
  /**
   * Process sensory input to extract percepts.
   * @param {string} input - The raw sensory input.
   * @returns {Promise<object>} - The processed percept.
   * @throws {TypeError} - If the input is not a string.
   */
  async perceive(input) {
    if (typeof input !== 'string') {
      throw new TypeError('input must be a string');
    }
    // Simulating sensory processing.
    return new Promise((resolve) => {
      const percept = { processed: `Percept from: ${input}` };
      resolve(percept);
    });
  }
}

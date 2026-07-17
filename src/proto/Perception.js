/**
 * Perception — the faculty responsible for processing sensory input.
 */
export class Perception {
  /**
   * Process sensory input to extract percepts.
   * @param {string} input - The raw sensory input.
   * @param {number} urgency - The urgency level of the input (1-5).
   * @param {Function} [filter] - Optional filter function to refine input processing.
   * @returns {Promise<object>} - The processed percept.
   * @throws {TypeError} - If the input is not a string or urgency is out of bounds.
   */
  async perceive(input, urgency, filter) {
    this.validateSensoryInput(input, urgency);
    if (filter) {
      if (typeof filter !== 'function') {
        throw new TypeError('filter must be a function');
      }
      input = filter(input);
    }
    // Simulating sensory processing with urgency consideration.
    return new Promise((resolve) => {
      const percept = { processed: `Percept from: ${input}`, urgency }; 
      resolve(percept);
    });
  }

  /**
   * Safely process multiple inputs.
   * @param {Array<{input: string, urgency: number}>} inputs - Array of sensory inputs with urgency levels.
   * @param {Function} [filter] - Optional filter function to refine input processing.
   * @returns {Promise<object[]>} - Array of processed percepts.
   * @throws {TypeError} - If any input is invalid.
   */
  async perceiveMultiple(inputs, filter) {
    if (!Array.isArray(inputs)) {
      throw new TypeError('inputs must be an array');
    }
    if (inputs.length === 0) {
      return []; // Return an empty array for empty input.
    }
    const percepts = [];
    // Sort inputs by urgency, higher urgency first.
    inputs.sort((a, b) => b.urgency - a.urgency);
    for (const { input, urgency } of inputs) {
      try {
        await this.validateSensoryInput(input, urgency);
        const percept = await this.perceive(input, urgency, filter);
        percepts.push(percept);
      } catch (err) {
        console.error(`Failed to perceive input: ${input}. Error: ${err.message}`);
      }
    }
    return percepts;
  }

  /**
   * Validate sensory input for single input.
   * @param {string} input - The sensory input to validate.
   * @param {number} urgency - The urgency level to validate.
   * @throws {TypeError} - If the input is invalid.
   */
  validateSensoryInput(input, urgency) {
    if (typeof input !== 'string' || input.trim() === '') {
      throw new TypeError('input must be a non-empty string');
    }
    if (typeof urgency !== 'number' || urgency < 1 || urgency > 5) {
      throw new TypeError('urgency must be a number between 1 and 5');
    }
  }

  /**
   * Categorize sensory input based on its type.
   * @param {Array<*>} inputs - Array of sensory input values.
   * @returns {object} - Categorized inputs by type.
   * @throws {TypeError} - If inputs is not an array or contains invalid types.
   */
  categorizeSensoryInputs(inputs) {
    if (!Array.isArray(inputs)) {
      throw new TypeError('inputs must be an array');
    }
    return inputs.reduce((acc, input) => {
      const type = typeof input;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(input);
      return acc;
    }, {});
  }
}  

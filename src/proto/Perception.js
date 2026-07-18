// src/proto/Perception.js

/**
 * Perception module for handling sensory inputs.
 */
export class Perception {
  /**
   * Categorizes sensory inputs into known types.
   * @param {any} sensoryInput - The input to be categorized.
   * @returns {string} - The category of the sensory input.
   * @throws {TypeError} - If the input is not valid.
   */
  categorizeSensoryInput(sensoryInput) {
    if (typeof sensoryInput !== 'object' || sensoryInput === null) {
      throw new TypeError('Invalid sensory input');
    }
    // Placeholder categorization logic
    if ('sight' in sensoryInput) return 'visual';
    if ('sound' in sensoryInput) return 'auditory';
    return 'unknown';
  }

  /**
   * Process the incoming sensory data and categorize it.
   * @param {any} data - The sensory data.
   * @returns {string} - The result of the categorization.
   */
  process(data) {
    return this.categorizeSensoryInput(data);
  }
}

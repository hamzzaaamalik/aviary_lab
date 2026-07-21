// src/proto/Perception.js

/**
 * Perception module for handling sensory inputs.
 */
export class Perception {
  /**
   * Validate sensory inputs.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  validateSensoryInputs(sensoryInputs) {
    if (!Array.isArray(sensoryInputs)) {
      throw new TypeError('Input must be an array.');
    }
  }

  /**
   * Detect specific sensory inputs based on a provided condition.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {Function} condition - Function to test each input.
   * @returns {Array<any>} - Detected sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  detect(sensoryInputs, condition) {
    this.validateSensoryInputs(sensoryInputs);
    if (typeof condition !== 'function') {
      throw new TypeError('Condition must be a function.');
    }
    return sensoryInputs.filter(condition);
  }

  // Add other methods here as needed
}
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
  validateInputs(sensoryInputs) {
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
    this.validateInputs(sensoryInputs);
    if (typeof condition !== 'function') {
      throw new TypeError('Condition must be a function.');
    }
    return sensoryInputs.filter(condition);
  }

  /**
   * Filter sensory inputs by a specific criteria.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {Function} criteria - Function to filter inputs.
   * @returns {Array<any>} - Filtered sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  filterByCriteria(sensoryInputs, criteria) {
    this.validateInputs(sensoryInputs);
    if (typeof criteria !== 'function') {
      throw new TypeError('Criteria must be a function.');
    }
    return sensoryInputs.filter(criteria);
  }
}

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
    sensoryInputs.forEach((input, index) => {
      if (input === null || input === undefined) {
        console.warn(`Invalid input at index ${index}: ${input}`);
      }
    });
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
   * Filter sensory inputs by specific criteria.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {Function} criteria - Function to filter inputs.
   * @returns {Array<any>} - Filtered sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  filter(sensoryInputs, criteria) {
    this.validateInputs(sensoryInputs);
    if (typeof criteria !== 'function') {
      throw new TypeError('Criteria must be a function.');
    }
    return sensoryInputs.filter(criteria);
  }

  /**
   * Classify sensory inputs based on a provided classifier function.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {Function} classifier - Function to classify each input.
   * @returns {Object} - An object containing classified inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  classify(sensoryInputs, classifier) {
    this.validateInputs(sensoryInputs);
    if (typeof classifier !== 'function') {
      throw new TypeError('Classifier must be a function.');
    }
    return sensoryInputs.reduce((acc, input) => {
      let key;
      try {
        key = classifier(input);
      } catch (err) {
        console.error('Classifier error for input:', input, 'Error:', err.message);
        return acc;
      }
      if (key === undefined) {
        console.warn('Classifier returned undefined for input:', input);
        return acc;
      }
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(input);
      return acc;
    }, {});
  }
}

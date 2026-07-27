// src/proto/Perception.js

/**
 * Perception module for handling sensory inputs.
 */
export class Perception {
  /**
   * Detect sensory inputs that exceed a certain threshold.
   * @param {Array<number>} sensoryInputs - Array of sensory input values.
   * @param {number} threshold - The threshold value to detect.
   * @returns {Array<number>} - Array of detected sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  detect(sensoryInputs, threshold) {
    this.validateInputs(sensoryInputs);
    return sensoryInputs.filter(input => input >= threshold);
  }

  /**
   * Filter sensory inputs based on a given condition function.
   * @param {Array<number>} sensoryInputs - Array of sensory input values.
   * @param {function} condition - A function that returns true for inputs to include.
   * @returns {Array<number>} - Filtered sensory inputs.
   * @throws {TypeError} - If the input is invalid or condition is not a function.
   */
  filter(sensoryInputs, condition) {
    this.validateInputs(sensoryInputs);
    if (typeof condition !== 'function') {
      throw new TypeError('condition must be a function');
    }
    return sensoryInputs.filter(condition);
  }

  /**
   * Classify sensory inputs based on predefined thresholds.
   * @param {Array<number>} sensoryInputs - Array of sensory input values.
   * @param {Object} thresholds - Key-value pairs of category names and thresholds.
   * @returns {Object} - Categorized results based on thresholds.
   * @throws {TypeError} - If the input is invalid.
   */
  classify(sensoryInputs, thresholds) {
    this.validateInputs(sensoryInputs);
    this.validateThresholds(thresholds);
    const categorized = {};
    for (const [category, threshold] of Object.entries(thresholds)) {
      categorized[category] = sensoryInputs.filter(input => input >= threshold);
    }
    return categorized;
  }

  /**
   * Validate sensory inputs.
   * @param {Array<number>} sensoryInputs
   * @throws {TypeError} - If the input is invalid.
   */
  validateInputs(sensoryInputs) {
    if (!Array.isArray(sensoryInputs) || !sensoryInputs.every(Number.isFinite)) {
      throw new TypeError('sensoryInputs must be an array of numbers');
    }
  }

  /**
   * Validate thresholds.
   * @param {Object} thresholds
   * @throws {TypeError} - If the input is invalid.
   */
  validateThresholds(thresholds) {
    if (typeof thresholds !== 'object' || thresholds === null) {
      throw new TypeError('thresholds must be an object');
    }
  }
}
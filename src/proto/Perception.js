// src/proto/Perception.js

/**
 * Perception module for handling sensory inputs.
 */
export class Perception {
  /**
   * Detect sensory inputs above a certain threshold.
   * @param {Array<number>} sensoryInputs - Array of sensory input values.
   * @param {number} threshold - The threshold to detect inputs.
   * @returns {Array<number>} - Array of detected inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  detect(sensoryInputs, threshold) {
    this.validateInputs(sensoryInputs);
    if (typeof threshold !== 'number') {
      throw new TypeError('threshold must be a number');
    }
    return sensoryInputs.filter(input => input > threshold);
  }

  /**
   * Filter sensory inputs based on a predicate function.
   * @param {Array<number>} sensoryInputs - Array of sensory input values.
   * @param {function} predicate - A function that takes an input and returns a boolean.
   * @returns {Array<number>} - Array of filtered inputs.
   * @throws {TypeError} - If the input or predicate is invalid.
   */
  filter(sensoryInputs, predicate) {
    this.validateInputs(sensoryInputs);
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    return sensoryInputs.filter(predicate);
  }

  /**
   * Classify sensory inputs based on given thresholds.
   * @param {Array<number>} sensoryInputs - Array of sensory input values.
   * @param {Object} thresholds - Key-value pairs of category names and thresholds.
   * @returns {Object} - Categorized inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  classify(sensoryInputs, thresholds) {
    this.validateInputs(sensoryInputs);
    this.validateThresholds(thresholds);

    const categorized = {};
    for (const category in thresholds) {
      categorized[category] = sensoryInputs.filter(input => input >= thresholds[category]);
    }
    return categorized;
  }

  /**
   * Handle multi-dimensional sensory inputs.
   * @param {Array<Array<number>>} sensoryInputs - Array of multi-dimensional sensory input values.
   * @param {number} threshold - The threshold to detect inputs.
   * @returns {Array<Array<number>>} - Array of detected multi-dimensional inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  detectMultiDimensional(sensoryInputs, threshold) {
    if (!Array.isArray(sensoryInputs)) {
      throw new TypeError('sensoryInputs must be an array');
    }
    if (sensoryInputs.length === 0) {
      return [];
    }
    if (typeof threshold !== 'number') {
      throw new TypeError('threshold must be a number');
    }
    return sensoryInputs.filter(arr =>
      Array.isArray(arr) &&
      arr.length > 0 &&
      arr.every(input => typeof input === 'number' && input > threshold)
    );
  }

  /**
   * Validate sensory input values.
   * @param {Array<number>} sensoryInputs - The sensory inputs to validate.
   * @throws {TypeError} - If the input is invalid.
   */
  validateInputs(sensoryInputs) {
    if (!Array.isArray(sensoryInputs)) {
      throw new TypeError('sensoryInputs must be an array');
    }
    for (const input of sensoryInputs) {
      if (typeof input !== 'number') {
        throw new TypeError('each sensory input must be a number');
      }
    }
  }

  /**
   * Validate thresholds for classification.
   * @param {Object} thresholds - The thresholds to validate.
   * @throws {TypeError} - If the input is invalid.
   */
  validateThresholds(thresholds) {
    if (typeof thresholds !== 'object' || thresholds === null) {
      throw new TypeError('thresholds must be an object');
    }
    for (const key in thresholds) {
      if (typeof thresholds[key] !== 'number') {
        throw new TypeError('each threshold must be a number');
      }
    }
  }
}
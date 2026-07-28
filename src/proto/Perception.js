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
    this.checkInputs(sensoryInputs);
    if (typeof threshold !== 'number') {
      throw new TypeError('threshold must be a number');
    }
    const detected = sensoryInputs.filter(input => input > threshold);
    return detected; // return empty array if nothing detected
  }

  /**
   * Filter sensory inputs based on a predicate function.
   * @param {Array<number>} sensoryInputs - Array of sensory input values.
   * @param {function} predicate - A function that takes an input and returns a boolean.
   * @returns {Array<number>} - Array of filtered inputs.
   * @throws {TypeError} - If the input or predicate is invalid.
   */
  filter(sensoryInputs, predicate) {
    this.checkInputs(sensoryInputs);
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    const filtered = sensoryInputs.filter(predicate);
    return filtered; // return empty array if nothing matches
  }

  /**
   * Classify sensory inputs based on given thresholds.
   * @param {Array<number>} sensoryInputs - Array of sensory input values.
   * @param {Object} thresholds - Key-value pairs of category names and thresholds.
   * @returns {Object} - Categorized inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  classify(sensoryInputs, thresholds) {
    if (!Array.isArray(sensoryInputs)) {
      throw new TypeError('sensoryInputs must be an array');
    }
    this.checkInputs(sensoryInputs);
    if (sensoryInputs.length === 0) return {}; // handle empty inputs
    if (typeof thresholds !== 'object' || thresholds === null || Object.keys(thresholds).length === 0) {
      throw new TypeError('thresholds must be a non-empty object');
    }
    this.validateThresholds(thresholds);

    const categorized = {};
    for (const category in thresholds) {
      if (typeof thresholds[category] !== 'number' || !isFinite(thresholds[category])) {
        throw new TypeError(`threshold for category ${category} must be a finite number`);
      }
      categorized[category] = sensoryInputs.filter(input => {
        if (typeof input !== 'number' || !isFinite(input)) {
          throw new TypeError('all inputs must be finite numbers');
        }
        return input >= thresholds[category];
      });
    }

    // Merge categories with the same threshold
    const merged = {};
    for (const category in categorized) {
      const threshold = thresholds[category];
      if (!merged[threshold]) {
        merged[threshold] = [];
      }
      merged[threshold] = merged[threshold].concat(categorized[category]);
    }
    return merged;
  }

  /**
   * Validate that all inputs are finite numbers.
   * @param {Array<number>} inputs - Array of sensory input values.
   * @throws {TypeError} - If any input is invalid.
   */
  checkInputs(inputs) {
    if (!Array.isArray(inputs)) {
      throw new TypeError('sensoryInputs must be an array');
    }
    for (const input of inputs) {
      if (typeof input !== 'number' || !isFinite(input)) {
        throw new TypeError('all inputs must be finite numbers');
      }
    }
  }

  /**
   * Validate thresholds to ensure they are finite numbers.
   * @param {Object} thresholds - Key-value pairs of category names and thresholds.
   * @throws {TypeError} - If any threshold is invalid.
   */
  validateThresholds(thresholds) {
    for (const key in thresholds) {
      if (typeof thresholds[key] !== 'number' || !isFinite(thresholds[key])) {
        throw new TypeError(`threshold for ${key} must be a finite number`);
      }
    }
  }
}
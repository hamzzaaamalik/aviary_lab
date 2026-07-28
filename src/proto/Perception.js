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
    this.checkInputs(sensoryInputs);
    if (sensoryInputs.length === 0) return {}; // handle empty inputs
    if (typeof thresholds !== 'object' || thresholds === null || Object.keys(thresholds).length === 0) {
      throw new TypeError('thresholds must be a non-empty object');
    }
    this.validateThresholds(thresholds);

    const categorized = {};
    for (const category in thresholds) {
      const threshold = thresholds[category];
      if (typeof threshold !== 'number' || !isFinite(threshold)) {
        throw new TypeError(`threshold for category ${category} must be a finite number`);
      }
      categorized[category] = sensoryInputs.filter(input => {
        if (typeof input !== 'number' || !isFinite(input)) {
          throw new TypeError('all inputs must be finite numbers');
        }
        return input >= threshold;
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
   * Validate thresholds to ensure they are finite numbers.
   * @param {Object} thresholds - The thresholds to validate.
   * @throws {TypeError} - If a threshold is not a finite number.
   */
  validateThresholds(thresholds) {
    for (const key in thresholds) {
      const threshold = thresholds[key];
      if (typeof threshold !== 'number' || !isFinite(threshold)) {
        throw new TypeError(`threshold for ${key} must be a finite number`);
      }
    }
  }

  /**
   * Check if sensory inputs are valid.
   * @param {Array} inputs - Array of inputs to check.
   * @throws {TypeError} - If inputs are invalid.
   */
  checkInputs(inputs) {
    if (!Array.isArray(inputs) || inputs.some(input => typeof input !== 'number' || !isFinite(input))) {
      throw new TypeError('inputs must be an array of finite numbers');
    }
  }
}
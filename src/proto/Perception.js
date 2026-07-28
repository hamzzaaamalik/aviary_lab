// src/proto/Perception.js

/**
 * Perception module for handling sensory inputs.
 */
export class Perception {
  /**
   * Detect sensory inputs based on specific criteria.
   * @param {Array<number>} inputs - Array of sensory input values.
   * @returns {Array<number>} - Detected inputs.
   */
  detect(inputs) {
    this.checkInputs(inputs);
    return inputs.filter(input => input !== null && input !== undefined);
  }

  /**
   * Filter sensory inputs based on a predicate function.
   * @param {Array<number>} inputs - Array of sensory input values.
   * @param {Function} predicate - Function to test each input.
   * @returns {Array<number>} - Filtered inputs.
   */
  filter(inputs, predicate) {
    this.checkInputs(inputs);
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    return inputs.filter(predicate);
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
   * Validate thresholds to ensure they are numeric and finite.
   * @param {Object} thresholds - Key-value pairs of category names and thresholds.
   * @throws {TypeError} - If any threshold is invalid.
   */
  validateThresholds(thresholds) {
    for (const key in thresholds) {
      if (typeof thresholds[key] !== 'number' || !isFinite(thresholds[key])) {
        throw new TypeError(`threshold for category ${key} must be a finite number`);
      }
    }
  }

  /**
   * Check if sensory inputs are valid.
   * @param {Array<number>} inputs 
   */
  checkInputs(inputs) {
    if (!Array.isArray(inputs)) {
      throw new TypeError('inputs must be an array');
    }
    inputs.forEach(input => {
      if (typeof input !== 'number' || !isFinite(input)) {
        throw new TypeError('all inputs must be finite numbers');
      }
    });
  }
}  

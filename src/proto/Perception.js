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
   * Validate sensory input values.
   * @param {Array<number>} sensoryInputs - The sensory inputs to validate.
   * @throws {TypeError} - If the input is invalid.
   */
  validateInputs(sensoryInputs) {
    if (!Array.isArray(sensoryInputs) || !sensoryInputs.every(input => typeof input === 'number')) {
      throw new TypeError('sensoryInputs must be an array of numbers');
    }
    sensoryInputs.forEach(input => this.validateInputRange(input));
  }

  /**
   * Validate individual sensory input value range.
   * @param {number} input - The sensory input to validate.
   * @throws {RangeError} - If the input is out of the acceptable range.
   */
  validateInputRange(input) {
    if (input < 0 || input > 100) { // Example range check
      throw new RangeError('sensory input must be between 0 and 100');
    }
  }

  /**
   * Validate thresholds.
   * @param {Object} thresholds - The thresholds to validate.
   * @throws {TypeError} - If the thresholds are invalid.
   */
  validateThresholds(thresholds) {
    if (typeof thresholds !== 'object' || thresholds === null) {
      throw new TypeError('thresholds must be an object');
    }
    for (const key in thresholds) {
      if (typeof thresholds[key] !== 'number') {
        throw new TypeError(`threshold for ${key} must be a number`);
      }
    }
  }
}
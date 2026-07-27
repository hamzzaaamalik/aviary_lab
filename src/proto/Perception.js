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
    if (typeof thresholds !== 'object' || thresholds === null) {
      throw new TypeError('thresholds must be an object');
    }
    this.validateThresholds(thresholds);

    const categorized = {};
    for (const category in thresholds) {
      categorized[category] = sensoryInputs.filter(input => input >= thresholds[category]);
    }
    return categorized;
  }

  /**
   * Normalize sensory inputs to a range between 0 and 1.
   * @param {Array<number>} sensoryInputs - Array of sensory input values.
   * @returns {Array<number>} - Array of normalized inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  normalize(sensoryInputs) {
    this.checkInputs(sensoryInputs);
    if (sensoryInputs.length === 0) return []; // handle empty array case
    const min = Math.min(...sensoryInputs);
    const max = Math.max(...sensoryInputs);
    if (min === max) return new Array(sensoryInputs.length).fill(0); // handle identical values
    return sensoryInputs.map(input => {
      if (typeof input !== 'number' || isNaN(input) || !isFinite(input)) {
        throw new TypeError('all inputs must be finite numbers');
      }
      return (input - min) / (max - min);
    });
  }

  checkInputs(sensoryInputs) {
    if (!Array.isArray(sensoryInputs)) {
      throw new TypeError('sensoryInputs must be an array');
    }
    sensoryInputs.forEach(input => {
      if (typeof input !== 'number' || isNaN(input)) {
        throw new TypeError('sensoryInputs must contain numbers only');
      }
    });
  }

  validateThresholds(thresholds) {
    for (const key in thresholds) {
      if (typeof thresholds[key] !== 'number') {
        throw new TypeError(`threshold for ${key} must be a number`);
      }
    }
  }
}
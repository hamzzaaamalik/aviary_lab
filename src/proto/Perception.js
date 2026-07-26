// src/proto/Perception.js

/**
 * Perception module for handling sensory inputs.
 */
export class Perception {
  /**
   * Validate sensory input array.
   * @param {Array<number>} inputs - The sensory input values.
   * @throws {TypeError} - If the input is invalid.
   */
  validateInputs(inputs) {
    if (!Array.isArray(inputs) || !inputs.every(Number.isFinite)) {
      throw new TypeError('Inputs must be an array of numbers.');
    }
  }

  /**
   * Validate thresholds for classification.
   * @param {Object} categories - Key-value pairs of category names and thresholds.
   * @throws {TypeError} - If any threshold is invalid.
   */
  validateThresholds(categories) {
    for (const [category, threshold] of Object.entries(categories)) {
      if (typeof threshold !== 'number' || !Number.isFinite(threshold)) {
        throw new TypeError(`Threshold for ${category} must be a finite number.`);
      }
    }
  }

  /**
   * Detect noise in sensory inputs based on a threshold.
   * @param {Array<number>} sensoryInputs - Array of sensory input values.
   * @param {number} threshold - The minimum value to consider as noise.
   * @returns {Array<number>} - Detected noise inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  detect(sensoryInputs, threshold) {
    this.validateInputs(sensoryInputs);
    if (sensoryInputs.length === 0) {
      return [];
    }
    if (typeof threshold !== 'number' || !Number.isFinite(threshold)) {
      throw new TypeError('Threshold must be a finite number.');
    }
    return sensoryInputs.filter(input => input >= threshold);
  }

  /**
   * Filter sensory inputs based on a predicate function.
   * @param {Array<number>} sensoryInputs - Array of sensory input values.
   * @param {function} predicate - Function to test each element.
   * @returns {Array<number>} - Filtered sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  filter(sensoryInputs, predicate) {
    this.validateInputs(sensoryInputs);
    if (typeof predicate !== 'function') {
      throw new TypeError('Predicate must be a function.');
    }
    return sensoryInputs.length > 0 ? sensoryInputs.filter(predicate) : [];
  }

  /**
   * Classify sensory inputs based on predefined categories.
   * @param {Array<number>} sensoryInputs - Array of sensory input values.
   * @param {Object} categories - Key-value pairs of category names and thresholds.
   * @returns {Object} - Classified sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  classify(sensoryInputs, categories) {
    this.validateInputs(sensoryInputs);
    if (sensoryInputs.length === 0) {
      throw new TypeError('Sensory inputs cannot be empty.');
    }
    if (typeof categories !== 'object' || categories === null) {
      throw new TypeError('Categories must be an object.');
    }
    if (Object.keys(categories).length === 0) {
      throw new TypeError('Categories cannot be an empty object.');
    }
    this.validateThresholds(categories);
    const classified = {};
    for (const category of Object.keys(categories)) {
      classified[category] = sensoryInputs.filter(input => input >= categories[category]);
    }
    return classified;
  }
}

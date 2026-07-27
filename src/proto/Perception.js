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
      throw new TypeError('Inputs must be an array of finite numbers.');
    }
  }

  /**
   * Validate thresholds for classification.
   * @param {Object} categories - Key-value pairs of category names and thresholds.
   * @throws {TypeError} - If any threshold is invalid.
   */
  validateThresholds(categories) {
    if (typeof categories !== 'object' || categories === null) {
      throw new TypeError('Categories must be a non-null object.');
    }
    if (Object.keys(categories).length === 0) {
      throw new TypeError('Categories cannot be an empty object.');
    }
    for (const [key, threshold] of Object.entries(categories)) {
      if (typeof threshold !== 'number' || !Number.isFinite(threshold)) {
        throw new TypeError(`Threshold for category '${key}' must be a finite number.`);
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
    if (sensoryInputs.length === 0) return [];
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
   * Refine sensory inputs based on a callback function.
   * @param {Array<number>} sensoryInputs - Array of sensory input values.
   * @param {function} callback - Function called for each input, returning true to include.
   * @returns {Array<number>} - Refined sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  refine(sensoryInputs, callback) {
    this.validateInputs(sensoryInputs);
    if (typeof callback !== 'function') {
      throw new TypeError('Callback must be a function.');
    }
    return sensoryInputs.length > 0 ? sensoryInputs.filter(callback) : [];
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
    if (sensoryInputs.length === 0) throw new TypeError('Sensory inputs cannot be empty.');
    this.validateThresholds(categories);

    const classified = {};
    for (const [category, threshold] of Object.entries(categories)) {
      classified[category] = sensoryInputs.filter(input => input >= threshold);
    }
    return classified;
  }
}

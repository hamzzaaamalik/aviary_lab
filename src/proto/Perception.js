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
    return inputs.filter(input => input !== null && input !== undefined && typeof input === 'number' && isFinite(input));
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
   * @param {Object} thresholdsMap - Key-value pairs of category names and thresholds.
   * @returns {Object} - Categorized inputs.
   * @throws {TypeError} - If inputs or thresholds are invalid.
   */
  classify(sensoryInputs, thresholdsMap) {
    this.checkInputs(sensoryInputs);
    if (sensoryInputs.length === 0) {
      throw new TypeError('sensoryInputs must not be an empty array');
    }
    if (!this.isValidThresholdsMap(thresholdsMap)) {
      throw new TypeError('thresholdsMap must be a valid object with finite number thresholds');
    }
    const categorized = {};
    for (const category in thresholdsMap) {
      const threshold = thresholdsMap[category];
      if (typeof threshold !== 'number' || !isFinite(threshold)) {
        throw new TypeError(`Threshold for category ${category} must be a finite number`);
      }
      if (threshold < 0) {
        throw new RangeError(`Threshold for category ${category} must not be negative`);
      }
      categorized[category] = sensoryInputs.filter(input =>
        typeof input === 'number' && isFinite(input) && input >= threshold
      );
    }
    return categorized;
  }

  /**
   * Validate thresholds object.
   * @param {Object} thresholdsMap - The thresholds to validate.
   * @returns {boolean} - True if valid, false otherwise.
   */
  isValidThresholdsMap(thresholdsMap) {
    if (typeof thresholdsMap !== 'object' || thresholdsMap === null) return false;
    const keys = Object.keys(thresholdsMap);
    if (keys.length === 0) return false;
    for (const category of keys) {
      const threshold = thresholdsMap[category];
      if (typeof threshold !== 'number' || !isFinite(threshold)) return false;
    }
    return true;
  }

  /**
   * Check if inputs are valid.
   * @param {Array} inputs - Array of inputs to check.
   * @throws {TypeError} - If any input is invalid.
   */
  checkInputs(inputs) {
    if (!Array.isArray(inputs)) {
      throw new TypeError('inputs must be an array');
    }
    if (inputs.length === 0) {
      throw new TypeError('inputs must not be an empty array');
    }
  }
}

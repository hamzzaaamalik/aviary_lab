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
   * @param {Array<number>} inputs - Array of sensory input values.
   * @param {Object} thresholdsMap - Key-value pairs of category names and thresholds.
   * @returns {Object} - Categorized inputs.
   * @throws {TypeError} - If inputs or thresholds are invalid.
   */
  classify(inputs, thresholdsMap) {
    this.checkInputs(inputs);
    if (inputs.length === 0) {
      throw new TypeError('inputs must not be an empty array');
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
      categorized[category] = inputs.filter(input =>
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
    return keys.length > 0 && keys.every(category =>
      typeof thresholdsMap[category] === 'number' && isFinite(thresholdsMap[category])
    );
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
      throw new TypeError('inputs must not be empty');
    }
    inputs.forEach(input => {
      if (typeof input !== 'number' || !isFinite(input)) {
        throw new TypeError('Invalid input: must be a finite number');
      }
    });
  }
}

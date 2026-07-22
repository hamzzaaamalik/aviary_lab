// src/proto/Perception.js

/**
 * Perception module for handling sensory inputs.
 */
export class Perception {
  /**
   * Validate sensory inputs.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  validateInputs(sensoryInputs) {
    if (!Array.isArray(sensoryInputs)) {
      throw new TypeError('Input must be an array.');
    }
  }

  /**
   * Detect specific sensory inputs based on a provided predicate.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {Function} testFunction - Function to test each input.
   * @returns {Array<any>} - Detected sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  detect(sensoryInputs, testFunction) {
    this.validateInputs(sensoryInputs);
    if (typeof testFunction !== 'function') {
      throw new TypeError('Test function must be a function.');
    }
    return sensoryInputs.filter(testFunction);
  }

  /**
   * Filter sensory inputs by specific criteria.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {Function} filterFunction - Function to filter inputs.
   * @returns {Array<any>} - Filtered sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  filter(sensoryInputs, filterFunction) {
    this.validateInputs(sensoryInputs);
    if (typeof filterFunction !== 'function') {
      throw new TypeError('Filter function must be a function.');
    }
    return sensoryInputs.filter(filterFunction);
  }

  /**
   * Classify sensory inputs based on a provided classifier function.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {Function} classifier - Function to classify each input.
   * @returns {Object} - An object containing classified inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  classify(sensoryInputs, classifier) {
    this.validateInputs(sensoryInputs);
    if (typeof classifier !== 'function') {
      throw new TypeError('Classifier must be a function.');
    }
    return sensoryInputs.reduce((acc, input) => {
      const key = classifier(input);
      if (key === undefined || key === null) {
        throw new TypeError('Classifier returned undefined or null for input: ' + JSON.stringify(input));
      }
      if (typeof key !== 'string') {
        throw new TypeError('Classifier must return a string key.');
      }
      // Ensure unique keys and initialize array if not present
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(input);
      return acc;
    }, {});
  }
}

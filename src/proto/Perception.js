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
   * @param {Function} predicate - Function to test each input.
   * @returns {Array<any>} - Detected sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  detect(sensoryInputs, predicate) {
    this.validateInputs(sensoryInputs);
    if (typeof predicate !== 'function') {
      throw new TypeError('Predicate must be a function.');
    }
    return sensoryInputs.filter(predicate);
  }

  /**
   * Filter sensory inputs by specific criteria.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {Function} criteria - Function to filter inputs.
   * @returns {Array<any>} - Filtered sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  filter(sensoryInputs, criteria) {
    this.validateInputs(sensoryInputs);
    if (typeof criteria !== 'function') {
      throw new TypeError('Criteria must be a function.');
    }
    return sensoryInputs.filter(criteria);
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
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(input);
      return acc;
    }, {});
  }

  /**
   * Classify sensory inputs with additional error handling for duplicate keys.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {Function} classifier - Function to classify each input.
   * @returns {Object} - An object containing classified inputs.
   * @throws {TypeError} - If the input is invalid or keys are duplicated.
   */
  classifyWithUniqueKeys(sensoryInputs, classifier) {
    this.validateInputs(sensoryInputs);
    if (typeof classifier !== 'function') {
      throw new TypeError('Classifier must be a function.');
    }
    const keySet = new Set();
    return sensoryInputs.reduce((acc, input) => {
      const key = classifier(input);
      if (key === undefined || key === null) {
        throw new TypeError('Classifier returned undefined or null for input: ' + JSON.stringify(input));
      }
      if (typeof key !== 'string') {
        throw new TypeError('Classifier must return a string key.');
      }
      if (keySet.has(key)) {
        throw new TypeError('Duplicate key detected: ' + key);
      }
      keySet.add(key);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(input);
      return acc;
    }, {});
  }
}

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
   * @param {Function} classifier - Function to classify inputs.
   * @returns {Array<any>} - Filtered sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  filter(sensoryInputs, classifier) {
    this.validateInputs(sensoryInputs);
    if (typeof classifier !== 'function') {
      throw new TypeError('Classifier must be a function.');
    }
    return sensoryInputs.filter(classifier);
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
    if (sensoryInputs.length === 0) {
      return {};
    }
    return sensoryInputs.reduce((acc, input) => {
      const key = classifier(input);
      if (key === undefined || key === null) {
        throw new TypeError('Classifier returned invalid key for input: ' + JSON.stringify(input));
      }
      const keyString = String(key);
      if (acc[keyString] && acc[keyString].some(existing => JSON.stringify(existing) === JSON.stringify(input))) {
        throw new TypeError('Duplicate key detected: ' + keyString);
      }
      acc[keyString] = acc[keyString] || [];
      acc[keyString].push(input);
      return acc;
    }, {});
  }

  /**
   * Classify sensory inputs ensuring unique keys.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {Function} classifier - Function to classify each input.
   * @returns {Object} - An object containing classified inputs with unique keys.
   * @throws {TypeError} - If the input is invalid or keys are duplicates.
   */
  classifyUnique(sensoryInputs, classifier) {
    this.validateInputs(sensoryInputs);
    if (typeof classifier !== 'function') {
      throw new TypeError('Classifier must be a function.');
    }
    return this.classify(sensoryInputs, classifier);
  }
}

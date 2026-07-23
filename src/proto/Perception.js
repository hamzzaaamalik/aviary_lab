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
    if (sensoryInputs.length === 0) {
      return; // allow empty input case
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
   * @throws {TypeError} - If the input is invalid or keys are duplicated.
   */
  classify(sensoryInputs, classifier) {
    this.validateInputs(sensoryInputs);
    if (sensoryInputs.length === 0) return {}; // handle empty input case
    if (typeof classifier !== 'function') {
      throw new TypeError('Classifier must be a function.');
    }
    const acc = {};
    sensoryInputs.forEach(input => {
      if (typeof input !== 'object' || input === null) {
        throw new TypeError('Input must be a non-null object: ' + JSON.stringify(input));
      }
      const key = classifier(input);
      if (key === undefined || key === null) {
        throw new TypeError('Classifier returned invalid key for input: ' + JSON.stringify(input));
      }
      const keyString = String(key);
      if (acc[keyString]) {
        throw new TypeError('Duplicate key found: ' + keyString);
      }
      acc[keyString] = acc[keyString] || [];
      acc[keyString].push(input);
    });
    return acc;
  }

  /**
   * Enhanced classify method to handle edge cases.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {Function} classifier - Function to classify each input.
   * @returns {Object} - An object containing classified inputs with unique keys.
   * @throws {TypeError} - If the input is invalid or keys are duplicated.
   */
  enhancedClassify(sensoryInputs, classifier) {
    this.validateInputs(sensoryInputs);
    if (typeof classifier !== 'function') {
      throw new TypeError('Classifier must be a function.');
    }
    const acc = {};
    sensoryInputs.forEach(input => {
      const key = classifier(input);
      const keyString = String(key);
      if (acc[keyString]) {
        acc[keyString].push(input);
      } else {
        acc[keyString] = [input];
      }
    });
    return acc;
  }
} 


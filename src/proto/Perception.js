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
   * Detect noise in sensory inputs based on a threshold.
   * @param {Array<number>} sensoryInputs - Array of sensory input values.
   * @param {number} threshold - The minimum value to consider as noise.
   * @returns {Array<number>} - Detected noise inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  detectNoise(sensoryInputs, threshold) {
    this.validateInputs(sensoryInputs);
    if (typeof threshold !== 'number') {
      throw new TypeError('Threshold must be a number.');
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
   * Classify sensory inputs based on a set of predefined categories, integrating noise detection.
   * @param {Array<number>} sensoryInputs - Array of sensory input values.
   * @param {Object} categories - Key-value pairs of category names and thresholds.
   * @param {number} noiseThreshold - The threshold for noise detection.
   * @returns {Object} - Classified sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  classify(sensoryInputs, categories, noiseThreshold) {
    this.validateInputs(sensoryInputs);
    if (typeof categories !== 'object' || categories === null) {
      throw new TypeError('Categories must be an object.');
    }
    const classified = {};
    const noise = this.detectNoise(sensoryInputs, noiseThreshold);
    for (const [category, threshold] of Object.entries(categories)) {
      classified[category] = sensoryInputs.filter(input => input >= threshold);
    }
    classified.noise = noise;
    return classified;
  }
}  

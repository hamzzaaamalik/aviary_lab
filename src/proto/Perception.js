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
  validateSensoryInputs(sensoryInputs) {
    if (!Array.isArray(sensoryInputs)) {
      throw new TypeError('Sensory inputs must be an array.');
    }
    sensoryInputs.forEach(input => {
      if (typeof input !== 'object' || input === null) {
        throw new TypeError('Each sensory input must be a non-null object.');
      }
    });
  }

  /**
   * Detect sensory inputs based on specific criteria.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {Function} criteria - A function that defines the detection criteria.
   * @returns {Array<any>} - Detected sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  detect(sensoryInputs, criteria) {
    this.validateSensoryInputs(sensoryInputs);
    if (typeof criteria !== 'function') {
      throw new TypeError('Criteria must be a function.');
    }
    return sensoryInputs.filter(criteria);
  }
} 


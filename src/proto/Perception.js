// src/proto/Perception.js

/**
 * Perception module for handling sensory inputs.
 */
export class Perception {
  /**
   * Process sensory inputs and categorize them.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @returns {Object} - Categorized sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  processSensoryInputs(sensoryInputs) {
    this.validateSensoryInputs(sensoryInputs);
    const categorized = {};
    sensoryInputs.forEach(input => {
      const type = input.type;
      if (!categorized[type]) {
        categorized[type] = [];
      }
      categorized[type].push(input);
    });
    return categorized;
  }

  /**
   * Filter sensory inputs based on a provided category.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {string} category - The category to filter by.
   * @returns {Array<any>} - Filtered sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  filterSensoryInputs(sensoryInputs, category) {
    this.validateSensoryInputs(sensoryInputs);
    if (typeof category !== 'string' || !category.trim()) {
      throw new TypeError('Category must be a non-empty string.');
    }
    return sensoryInputs.filter(input => input.type === category);
  }

  /**
   * Validate sensory inputs to ensure they meet the required structure.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  validateSensoryInputs(sensoryInputs) {
    if (!Array.isArray(sensoryInputs)) throw new TypeError('Input must be an array.');
    if (sensoryInputs.length === 0) throw new TypeError('Sensory inputs must be a non-empty array.');
    sensoryInputs.forEach((input, index) => {
      if (typeof input !== 'object' || input === null) {
        throw new TypeError(`Input at index ${index} must be a non-null object.`);
      }
      if (typeof input.type !== 'string' || !input.type.trim()) {
        throw new TypeError(`Input at index ${index} must have a valid type property.`);
      }
      if (input.data === undefined) {
        throw new TypeError(`Input at index ${index} must have a data property.`);
      }
    });
  }
}
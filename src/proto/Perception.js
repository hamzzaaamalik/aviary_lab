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
    return sensoryInputs.reduce((categorized, input) => {
      const type = input.type;
      if (!categorized[type]) {
        categorized[type] = [];
      }
      categorized[type].push(input);
      return categorized;
    }, {});
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
   * Advanced filter sensory inputs based on multiple categories.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {Array<string>} categories - Array of categories to filter by.
   * @returns {Array<any>} - Filtered sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  advancedFilterSensoryInputs(sensoryInputs, categories) {
    this.validateSensoryInputs(sensoryInputs);
    if (!Array.isArray(categories) || categories.length === 0) {
      throw new TypeError('Categories must be a non-empty array.');
    }
    return sensoryInputs.filter(input => categories.includes(input.type));
  }

  /**
   * Validate sensory inputs to ensure they meet the required structure.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  validateSensoryInputs(sensoryInputs) {
    if (!Array.isArray(sensoryInputs) || sensoryInputs.length === 0) {
      throw new TypeError('Sensory inputs must be a non-empty array.');
    }
    sensoryInputs.forEach((input, index) => {
      if (typeof input !== 'object' || input === null ||
          typeof input.type !== 'string' || !input.type.trim() ||
          input.data === undefined) {
        throw new TypeError(`Input at index ${index} must be a non-null object with a valid type and data properties.`);
      }
    });
  }

  /**
   * Get all sensory inputs of a specific type.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {string} type - The type of sensory input to retrieve.
   * @returns {Array<any>} - Array of sensory inputs of the specified type.
   * @throws {TypeError} - If the input is invalid.
   */
  getSensoryInputsOfType(sensoryInputs, type) {
    this.validateSensoryInputs(sensoryInputs);
    if (typeof type !== 'string' || !type.trim()) {
      throw new TypeError('Type must be a non-empty string.');
    }
    return sensoryInputs.filter(input => input.type === type);
  }
}
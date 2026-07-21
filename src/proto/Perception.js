// src/proto/Perception.js

/**
 * Perception module for handling sensory inputs.
 */
export class Perception {
  /**
   * Process sensory inputs and validate them.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  validateSensoryInputs(sensoryInputs) {
    if (!Array.isArray(sensoryInputs)) {
      throw new TypeError('Sensory inputs must be an array.');
    }
    sensoryInputs.forEach((input, index) => {
      if (typeof input !== 'object' || input === null || !input.type) {
        throw new TypeError(`Input at index ${index} must be an object with a type.`);
      }
    });
  }

  /**
   * Categorize sensory inputs based on their type.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @returns {Object} - Categorized sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  categorizeSensoryInputs(sensoryInputs) {
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
   * Handle multiple sensory inputs by processing them and returning categorized results.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @returns {Object} - Categorized sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  handleMultipleInputs(sensoryInputs) {
    return this.categorizeSensoryInputs(sensoryInputs);
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
    categories.forEach((category, index) => {
      if (typeof category !== 'string' || !category.trim()) {
        throw new TypeError(`Category at index ${index} must be a non-empty string.`);
      }
    });
    return sensoryInputs.filter(input => categories.includes(input.type));
  }
}

// src/proto/Perception.js

/**
 * Perception module for handling sensory inputs.
 */
export class Perception {
  /**
   * Categorize sensory input based on type.
   * @param {Array<any>} inputs - Array of sensory inputs.
   * @returns {Array<{input: any, category: string}>} - Categorized sensory data.
   * @throws {TypeError} - If the input is invalid.
   */
  categorizeSensoryInputs(inputs) {
    this._validateInputs(inputs);
    return inputs.map(input => {
      const category = this._determineCategory(input);
      if (!category) {
        throw new TypeError('Unknown input type');
      }
      return { input, category };
    });
  }

  /**
   * Validate sensory input types and enrich with context if valid.
   * @param {Array<any>} inputs - Array of sensory inputs.
   * @returns {Array<{input: any, category: string, context: string}>} - Enriched sensory data.
   * @throws {TypeError} - If an input type is invalid.
   */
  validateAndEnhanceSensoryInputs(inputs) {
    this._validateInputs(inputs);
    return inputs.map(input => {
      const category = this._determineCategory(input);
      if (!category) {
        throw new TypeError('Unknown input type');
      }
      const context = this._determineContext(category);
      return { input, category, context };
    });
  }

  /**
   * Validate input types for sensory inputs.
   * @param {Array<any>} inputs - Array of sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  _validateInputs(inputs) {
    if (!Array.isArray(inputs)) {
      throw new TypeError('Inputs must be an array');
    }
    inputs.forEach(input => {
      if (typeof input !== 'object' || input === null || !input.type) {
        throw new TypeError('Invalid input type: must be non-null object with a type');
      }
    });
  }

  /**
   * Process sensory inputs and enhance them.
   * @param {Array<any>} inputs - Array of sensory inputs.
   * @returns {Array<{input: any, category: string, context: string}>} - Enhanced sensory data.
   * @throws {TypeError} - If the input is invalid.
   */
  process(inputs) {
    return this.validateAndEnhanceSensoryInputs(inputs);
  }

  /**
   * Batch process sensory inputs, categorizing and enhancing them in one step.
   * @param {Array<any>} inputs - Array of sensory inputs.
   * @returns {Array<{input: any, category: string, context: string}>} - Enhanced sensory data.
   * @throws {TypeError} - If the input is invalid.
   */
  batchProcess(inputs) {
    return this.process(inputs);
  }

  /**
   * Enhance sensory data with additional context.
   * @param {Array<{input: any, category: string}>} categorizedData - Array of categorized sensory data.
   * @returns {Array<{input: any, category: string, context: string}>} - Enhanced sensory data.
   * @throws {TypeError} - If the input is invalid.
   */
  enhanceContext(categorizedData) {
    if (!Array.isArray(categorizedData)) {
      throw new TypeError('Categorized data must be an array');
    }
    return categorizedData.map(({ input, category }) => {
      if (typeof category !== 'string') {
        throw new TypeError('Invalid category');
      }
      const context = this._determineContext(category);
      return { input, category, context };
    });
  }

  /**
   * Mock of a method to determine the category of the input.
   * @param {Object} input
   * @returns {string | null} - Returns category string or null if unknown.
   */
  _determineCategory(input) {
    // Example implementation (actual implementation needed)
    return input.type || null;
  }

  /**
   * Mock of a method to determine context based on category.
   * @param {string} category
   * @returns {string} - Returns context string.
   */
  _determineContext(category) {
    // Example implementation (actual implementation needed)
    return `Context for ${category}`;
  }
}

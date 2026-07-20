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
    if (!Array.isArray(inputs)) {
      throw new TypeError('Inputs must be an array');
    }
    return inputs.map(input => {
      if (typeof input !== 'object' || input === null || !input.type) {
        throw new TypeError('Input must be a non-null object with a type property');
      }
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
    if (!Array.isArray(inputs)) {
      throw new TypeError('Inputs must be an array');
    }
    return inputs.map(input => {
      if (typeof input !== 'object' || input === null || !input.type) {
        throw new TypeError('Invalid input type: must be non-null object with a type');
      }
      const category = this._determineCategory(input);
      if (!category) {
        throw new TypeError('Unknown input type');
      }
      const context = this._determineContext(category);
      return { input, category, context };
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
        throw new TypeError('Category must be a string');
      }
      const context = this._determineContext(category);
      return { input, category, context };
    });
  }

  /**
   * Dummy method for determining category.
   * @param {any} input - The input to categorize.
   * @returns {string} - The category name.
   */
  _determineCategory(input) {
    // Placeholder logic for determining category
    return input.type === 'sound' ? 'audio' : input.type === 'image' ? 'visual' : null;
  }

  /**
   * Dummy method for determining context based on category.
   * @param {string} category - The category to get context for.
   * @returns {string} - The context string.
   */
  _determineContext(category) {
    // Placeholder logic for context
    return `Context for ${category}`;
  }
}

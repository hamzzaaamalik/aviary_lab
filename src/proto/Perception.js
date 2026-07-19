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
      // Categorization logic based on input type property.
      const category = this._determineCategory(input);
      if (!category) {
        throw new TypeError('Unknown input type');
      }
      return { input, category };
    });
  }

  /**
   * Process sensory inputs and enhance them.
   * @param {Array<any>} inputs - Array of sensory inputs.
   * @returns {Array<{input: any, category: string, context: string}>} - Enhanced sensory data.
   * @throws {TypeError} - If the input is invalid.
   */
  process(inputs) {
    if (!Array.isArray(inputs)) {
      throw new TypeError('Inputs must be an array');
    }
    const categorized = this.categorizeSensoryInputs(inputs);
    return this.enhanceContext(categorized);
  }

  /**
   * Batch process sensory inputs, categorizing and enhancing them in one step.
   * @param {Array<any>} inputs - Array of sensory inputs.
   * @returns {Array<{input: any, category: string, context: string}>} - Enhanced sensory data.
   * @throws {TypeError} - If the input is invalid.
   */
  batchProcess(inputs) {
    if (!Array.isArray(inputs)) {
      throw new TypeError('Inputs must be an array');
    }
    const categorized = this.categorizeSensoryInputs(inputs);
    return this.enhanceContext(categorized);
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
    if (categorizedData.length === 0) {
      return []; // Handle empty input arrays gracefully
    }
    return categorizedData.map(item => {
      const context = this._determineContext(item.category);
      if (!context) {
        throw new TypeError('Context could not be determined for category: ' + item.category);
      }
      return { ...item, context };
    });
  }

  /**
   * Determine the category of the input.
   * @private
   * @param {any} input - The input to categorize.
   * @returns {string} - The determined category.
   */
  _determineCategory(input) {
    switch (input.type) {
      case 'sensor': return 'sensory';
      case 'action': return 'motor';
      // Add more cases as necessary for future input types.
      default: return null;
    }
  }

  /**
   * Determine the context based on category.
   * @private
   * @param {string} category - The category to determine context for.
   * @returns {string} - The determined context.
   */
  _determineContext(category) {
    switch (category) {
      case 'sensory': return 'environmental context';
      case 'motor': return 'movement context';
      // Add more cases as necessary for context determination.
      default: return null;
    }
  }
}
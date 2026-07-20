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
   * Validate sensory input types.
   * @param {Array<any>} inputs - Array of sensory inputs.
   * @throws {TypeError} - If an input type is invalid.
   */
  validateSensoryInputs(inputs) {
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
    this.validateSensoryInputs(inputs);
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
    if (categorizedData.length === 0) {
      return [];
    }
    return categorizedData.map(item => {
      const context = this._determineContext(item.category);
      if (!context) {
        throw new TypeError('Failed to determine context for category: ' + item.category);
      }
      const metadata = this._enhanceWithMetadata(item);
      return { ...item, context, metadata };
    });
  }

  /**
   * Enhance the sensory input with additional metadata.
   * @param {{input: any, category: string}} item - Categorized sensory data.
   * @returns {Object} - Metadata related to the input.
   */
  _enhanceWithMetadata(item) {
    return {
      timestamp: Date.now(),
      source: item.input.source || 'unknown',
      confidence: this._calculateConfidence(item.category)
    };
  }

  /**
   * Calculate confidence level of the category.
   * @param {string} category - The category to assess.
   * @returns {number} - Confidence level between 0 and 1.
   */
  _calculateConfidence(category) {
    // Placeholder for real confidence calculation logic.
    return 0.9; // default confidence
  }

  /**
   * Determine context based on category.
   * @param {string} category - The category to assess.
   * @returns {string} - Context string.
   */
  _determineContext(category) {
    // Example logic, should be replaced with actual context determination.
    return `Context for ${category}`;
  }

  /**
   * Determine the category of the input.
   * @param {Object} input - The sensory input.
   * @returns {string} - The determined category.
   */
  _determineCategory(input) {
    // Example category determination logic.
    return input.type;
  }
}

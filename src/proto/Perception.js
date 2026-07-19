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
      // Simple categorization logic based on input properties.
      const category = this._determineCategory(input);
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
      return { ...item, context };
    }).filter(item => item.context !== undefined);
  }

  /**
   * Determine category based on input properties.
   * @param {object} input - The sensory input.
   * @returns {string} - The category for the input.
   */
  _determineCategory(input) {
    if (input.type === 'visual') return 'visual';
    if (input.type === 'auditory') return 'auditory';
    if (input.type === 'olfactory') return 'olfactory';
    if (input.type === 'gustatory') return 'gustatory';
    if (input.type === 'tactile') return 'tactile';
    return 'unknown'; // Handle unknown types
  }

  /**
   * Determine context based on the input category.
   * @param {string} category - The category of the sensory input.
   * @returns {string} - The context for the category.
   */
  _determineContext(category) {
    switch (category) {
      case 'visual': return 'context related to visual perception';
      case 'auditory': return 'context related to auditory perception';
      case 'olfactory': return 'context related to olfactory perception';
      case 'gustatory': return 'context related to gustatory perception';
      case 'tactile': return 'context related to tactile perception';
      default: return undefined;
    }
  }
}

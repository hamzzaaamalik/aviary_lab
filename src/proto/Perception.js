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
      // Enhanced validation for specific types
      if (input.type === 'sound' && typeof input.frequency !== 'number') {
        throw new TypeError('Sound input must have a numeric frequency property');
      }
      if (input.type === 'image' && typeof input.url !== 'string') {
        throw new TypeError('Image input must have a string URL property');
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
    return categorizedData.map(item => ({
      ...item,
      context: 'contextual information'
    }));
  }

  /**
   * Determine the category of an input based on its type.
   * @param {object} input - The sensory input.
   * @returns {string} - The category of the input.
   * @throws {TypeError} - If the input type is unknown.
   */
  _determineCategory(input) {
    switch (input.type) {
      case 'sound': return 'audio';
      case 'image': return 'visual';
      default: throw new TypeError('Unknown input type');
    }
  }
}
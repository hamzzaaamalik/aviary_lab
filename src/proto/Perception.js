// src/proto/Perception.js

/**
 * Perception module for handling sensory inputs.
 */
export class Perception {
  /**
   * Categorizes sensory inputs into known types.
   * @param {any} sensoryInput - The input to be categorized.
   * @returns {string} - The category of the sensory input.
   * @throws {TypeError} - If the input is not valid.
   */
  categorizeSensoryInput(sensoryInput) {
    if (typeof sensoryInput !== 'object' || sensoryInput === null) {
      throw new TypeError('Invalid sensory input');
    }
    // Enhanced categorization logic
    if ('sight' in sensoryInput) return 'visual';
    if ('sound' in sensoryInput) return 'auditory';
    if ('smell' in sensoryInput) return 'olfactory';
    if ('taste' in sensoryInput) return 'gustatory';
    if ('touch' in sensoryInput) return 'tactile';

    console.warn('Unknown sensory input received:', sensoryInput);
    return 'unknown';
  }

  /**
   * Process the incoming sensory data and categorize it.
   * @param {any} sensoryData - The sensory data.
   * @returns {string} - The category of the sensory input.
   * @throws {TypeError} - If the input data is invalid.
   */
  process(sensoryData) {
    if (sensoryData === null || sensoryData === undefined) {
      throw new TypeError('Sensory data cannot be null or undefined');
    }
    return this.categorizeSensoryInput(sensoryData);  // Return only the category
  }

  /**
   * Handle multiple sensory data inputs and categorize them.
   * @param {Array<any>} sensoryInputs - An array of sensory data.
   * @returns {Array<string>} - An array of categories for each sensory input.
   * @throws {TypeError} - If any input is invalid.
   */
  processMultiple(sensoryInputs) {
    if (!Array.isArray(sensoryInputs)) {
      throw new TypeError('Sensory inputs must be an array');
    }
    return sensoryInputs.map(input => this.process(input));
  }

  /**
   * Validate and handle a single sensory input, returning its category.
   * @param {any} singleInput - The sensory input to handle.
   * @returns {string} - The category of the sensory input.
   * @throws {TypeError} - If the input is invalid.
   */
  handleSingleInput(singleInput) {
    if (singleInput === null || singleInput === undefined) {
      throw new TypeError('Single input cannot be null or undefined');
    }
    return this.categorizeSensoryInput(singleInput);
  }

  /**
   * Validate and handle multiple sensory inputs, returning their categories.
   * @param {Array<any>} sensoryInputs - An array of sensory inputs to handle.
   * @returns {Array<string>} - An array of categories for each sensory input.
   * @throws {TypeError} - If any input is invalid.
   */
  handleMultipleInputs(sensoryInputs) {
    if (!Array.isArray(sensoryInputs)) {
      throw new TypeError('Inputs must be an array');
    }
    return sensoryInputs.map(input => this.handleSingleInput(input));
  }

  /**
   * Validates and processes an object input, returning its category.
   * @param {Object} objectInput - The sensory object input to handle.
   * @returns {string} - The category of the sensory input.
   * @throws {TypeError} - If the input is invalid.
   */
  handleObjectInput(objectInput) {
    if (typeof objectInput !== 'object' || objectInput === null) {
      throw new TypeError('Input must be a non-null object');
    }
    return this.categorizeSensoryInput(objectInput);
  }
} 

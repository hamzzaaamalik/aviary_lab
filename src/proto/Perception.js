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
    this._validateInput(sensoryInput); // Consolidated validation
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
   * @param {any} data - The sensory data.
   * @returns {string} - The category of the sensory input.
   * @throws {TypeError} - If the input data is invalid.
   */
  process(data) {
    this._validateInput(data); // Consolidated validation
    return this.categorizeSensoryInput(data);  // Return only the category
  }

  /**
   * Handle multiple sensory data inputs and categorize them.
   * @param {Array<any>} inputs - An array of sensory data.
   * @returns {Array<string>} - An array of categories for each sensory input.
   * @throws {TypeError} - If any input is invalid.
   */
  processMultiple(inputs) {
    this._validateArray(inputs); // Consolidated validation
    return inputs.map(input => this.process(input));
  }

  /**
   * Validate and handle a single sensory input, returning its category.
   * @param {any} input - The sensory input to handle.
   * @returns {string} - The category of the sensory input.
   * @throws {TypeError} - If the input is invalid.
   */
  handleSingleInput(input) {
    this._validateInput(input); // Consolidated validation
    return this.categorizeSensoryInput(input);
  }

  /**
   * Validate and handle multiple sensory inputs, returning their categories.
   * @param {Array<any>} inputs - An array of sensory inputs to handle.
   * @returns {Array<string>} - An array of categories for each sensory input.
   * @throws {TypeError} - If any input is invalid.
   */
  handleMultipleInputs(inputs) {
    this._validateArray(inputs); // Consolidated validation
    return inputs.map(input => this.handleSingleInput(input));
  }

  /**
   * Validate sensory data and emit categorized results.
   * @param {Array<any>} data - An array of sensory data inputs.
   * @returns {Array<{input: any, category: string}>} - Categorized results.
   * @throws {TypeError} - If any input is invalid.
   */
  validateAndCategorize(data) {
    this._validateArray(data);
    return data.map(input => ({ input, category: this.categorizeSensoryInput(input) }));
  }

  /**
   * Validates a single input.
   * @param {any} input - The input to validate.
   * @throws {TypeError} - If the input is invalid.
   */
  _validateInput(input) {
    if (input == null) throw new TypeError('Input cannot be null or undefined.');
    // Add more validation rules if needed
  }

  /**
   * Validates an array of inputs.
   * @param {Array<any>} inputs - The array of inputs to validate.
   * @throws {TypeError} - If any input is invalid.
   */
  _validateArray(inputs) {
    if (!Array.isArray(inputs)) throw new TypeError('Expected an array of inputs.');
    inputs.forEach(input => this._validateInput(input));
  }
}

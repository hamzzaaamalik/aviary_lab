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
      throw new TypeError('Invalid sensory input: must be a non-null object');
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
   * Validate sensory data and emit categorized results.
   * @param {Array<any>} data - An array of sensory data inputs.
   * @returns {Promise<Array<{input: any, category: string}>>} - Categorized results.
   * @throws {TypeError} - If any input is invalid.
   */
  async validateAndCategorize(data) {
    if (!Array.isArray(data)) {
      throw new TypeError('Data must be an array');
    }
    return Promise.all(data.map(async (input) => {
      const category = this.categorizeSensoryInput(input);
      return { input, category };
    }));
  }

  /**
   * Process the incoming sensory data and categorize it.
   * @param {any} data - The sensory data.
   * @returns {Promise<Array<{input: any, category: string}>>} - Array of categorized results.
   * @throws {TypeError} - If the input data is invalid.
   */
  async process(data) {
    if (data === null) {
      throw new TypeError('Data cannot be null');
    }
    if (data === undefined) {
      throw new TypeError('Data cannot be undefined');
    }
    if (typeof data === 'object' && Object.keys(data).length === 0) {
      throw new TypeError('Data cannot be an empty object');
    }
    if (Array.isArray(data)) {
      return this.validateAndCategorize(data);
    }
    // Handle single input case
    const category = this.categorizeSensoryInput(data);
    return [{ input: data, category }];
  }

  /**
   * Filter sensory data based on defined criteria.
   * @param {Array<any>} inputs - An array of sensory data.
   * @param {Function} criteria - A function that determines if an input meets the criteria.
   * @returns {Array<any>} - An array of filtered inputs.
   * @throws {TypeError} - If criteria is not a function or inputs is not an array.
   * @throws {Error} - If criteria function throws an error.
   */
  filterByCriteria(inputs, criteria) {
    if (!Array.isArray(inputs)) {
      throw new TypeError('Inputs must be an array');
    }
    if (typeof criteria !== 'function') {
      throw new TypeError('Criteria must be a function');
    }
    return inputs.filter(input => {
      try {
        return criteria(input);
      } catch (error) {
        throw new Error(`Error in criteria function: ${error.message}`);
      }
    });
  }

  /**
   * Process and filter sensory data based on defined criteria.
   * @param {Array<any>} data - An array of sensory data to be processed and filtered.
   * @param {Function} criteria - A function that defines the filtering criteria.
   * @returns {Promise<Array<any>>} - An array of processed and filtered sensory data.
   * @throws {TypeError} - If data is not an array or criteria is not a function.
   */
  async processAndFilter(data, criteria) {
    const processedData = await this.process(data);
    return this.filterByCriteria(processedData, criteria);
  }
}
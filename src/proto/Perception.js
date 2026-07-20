// src/proto/Perception.js

/**
 * Perception module for handling sensory inputs.
 */
export class Perception {
  /**
   * Validate sensory inputs to ensure they meet the required structure.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  validateSensoryInputs(sensoryInputs) {
    if (!Array.isArray(sensoryInputs)) throw new TypeError('Input must be an array.');
    sensoryInputs.forEach((input, index) => {
      if (typeof input !== 'object' || input === null) {
        throw new TypeError(`Input at index ${index} must be a non-null object.`);
      }
      if (typeof input.type !== 'string' || !input.type.trim()) {
        throw new TypeError(`Input at index ${index} must have a valid type property.`);
      }
      if (input.data === undefined) {
        throw new TypeError(`Input at index ${index} must have a data property.`);
      }
    });
  }

  /**
   * Normalize sensory input to ensure consistent structure.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @returns {Array<any>} - Normalized sensory inputs.
   * @throws {TypeError} - If the input is empty.
   */
  normalizeSensoryInputs(sensoryInputs) {
    if (sensoryInputs.length === 0) throw new TypeError('Input array must not be empty.');
    return sensoryInputs.map(input => ({
      type: input.type.trim(),
      data: input.data,
    }));
  }

  /**
   * Categorize sensory inputs based on their type.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @returns {Array<{ input: any, category: string }>} - Categorized sensory inputs.
   */
  categorizeSensoryInputs(sensoryInputs) {
    return sensoryInputs.map(input => ({ input, category: input.type }));
  }

  /**
   * Aggregate sensory inputs by their categories.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @returns {Map<string, Array<any>>} - Aggregated sensory data by category.
   * @throws {TypeError} - If the input is invalid.
   */
  aggregateSensoryInputs(sensoryInputs) {
    this.validateSensoryInputs(sensoryInputs);
    const categorized = this.categorizeSensoryInputs(sensoryInputs);
    const aggregation = new Map();
    categorized.forEach(({ input, category }) => {
      if (!aggregation.has(category)) {
        aggregation.set(category, []);
      }
      aggregation.get(category).push(input);
    });
    return aggregation;
  }

  /**
   * Process sensory inputs to validate, categorize, and aggregate them.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @returns {Map<string, Array<any>>} - Aggregated sensory data by category.
   * @throws {TypeError} - If the input is invalid.
   */
  process(sensoryInputs) {
    this.validateSensoryInputs(sensoryInputs);
    const normalized = this.normalizeSensoryInputs(sensoryInputs);
    return this.aggregateSensoryInputs(normalized);
  }

  /**
   * Filter sensory inputs based on a provided category.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {string} category - The category to filter by.
   * @returns {Array<any>} - Filtered sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  filterByCategory(sensoryInputs, category) {
    this.validateSensoryInputs(sensoryInputs);
    return sensoryInputs.filter(input => input.type === category);
  }
} 

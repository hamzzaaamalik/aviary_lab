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
    sensoryInputs.forEach(input => {
      if (typeof input !== 'object' || !input.type || !input.data) {
        throw new TypeError('Each input must be an object with type and data properties.');
      }
    });
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
    return this.aggregateSensoryInputs(sensoryInputs);
  }
} 

// src/proto/Perception.js

/**
 * Perception module for handling sensory inputs.
 */
export class Perception {
  /**
   * Validate sensory inputs to ensure they meet the required structure.
   * @param {Array<any>} inputs - Array of sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  validateSensoryInputs(inputs) {
    if (!Array.isArray(inputs)) throw new TypeError('Input must be an array.');
    inputs.forEach(input => {
      if (typeof input !== 'object' || !input.type || !input.data) {
        throw new TypeError('Each input must be an object with type and data properties.');
      }
    });
  }

  /**
   * Categorize sensory inputs based on their type.
   * @param {Array<any>} inputs - Array of sensory inputs.
   * @returns {Array<{ input: any, category: string }>} - Categorized sensory inputs.
   */
  categorizeSensoryInputs(inputs) {
    return inputs.map(input => ({ input, category: input.type }));
  }

  /**
   * Aggregate sensory inputs by their categories.
   * @param {Array<any>} inputs - Array of sensory inputs.
   * @returns {Map<string, Array<any>>} - Aggregated sensory data by category.
   * @throws {TypeError} - If the input is invalid.
   */
  aggregateSensoryInputs(inputs) {
    this.validateSensoryInputs(inputs);
    const categorized = this.categorizeSensoryInputs(inputs);
    const aggregation = new Map();
    categorized.forEach(({ input, category }) => {
      if (!aggregation.has(category)) {
        aggregation.set(category, []);
      }
      aggregation.get(category).push(input);
    });
    return aggregation;
  }
} 

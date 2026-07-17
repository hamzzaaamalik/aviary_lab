/**
 * Perception — the faculty responsible for processing sensory input.
 */
export class Perception {
  /**
   * Process multiple sensory inputs and categorize them by type.
   * @param {Array<*>} inputs - An array of sensory input values.
   * @returns {object} - Categorized inputs by type.
   * @throws {TypeError} - If inputs is not an array or contains invalid types.
   */
  categorizeSensoryInputs(inputs) {
    if (!Array.isArray(inputs)) {
      throw new TypeError('inputs must be an array');
    }
    return inputs.reduce((acc, input) => {
      const type = typeof input;
      if (type === 'undefined') {
        throw new TypeError('undefined values are not allowed');
      }
      if (!acc[type]) acc[type] = [];
      acc[type].push(input);
      return acc;
    }, {});
  }

  /**
   * Process inputs and return categorized inputs by type.
   * @param {Array<*>} inputs - An array of sensory inputs.
   * @returns {object} - Categorized inputs by type.
   * @throws {TypeError} - If inputs is not an array or contains invalid types.
   */
  process(inputs) {
    return this.categorizeSensoryInputs(inputs);
  }
}
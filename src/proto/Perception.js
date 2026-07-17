/**
 * Perception — the faculty responsible for processing sensory input.
 */
export class Perception {
  /**
   * Process multiple sensory inputs and categorize them by type.
   * @param {Array<*>} inputs - An array of sensory input values.
   * @returns {object} - Categorized inputs by type.
   * @throws {TypeError} - If inputs is not an array or is empty.
   */
  categorizeSensoryInputs(inputs) {
    if (!Array.isArray(inputs)) {
      throw new TypeError('Expected an array for inputs, received ' + typeof inputs);
    }
    if (inputs.length === 0) {
      return {};
    }
    return inputs.reduce((acc, input) => {
      const type = typeof input;
      if (!acc[type]) acc[type] = [];
      acc[type].push(input);
      return acc;
    }, {});
  }

  /**
   * Validate individual sensory input.
   * @param {*} input - A sensory input value.
   * @throws {TypeError} - If the input is of an invalid type.
   */
  validateInput(input) {
    const validTypes = ['string', 'number', 'object', 'boolean', 'undefined', 'function'];
    if (!validTypes.includes(typeof input)) {
      throw new TypeError(`Invalid input type: ${typeof input}. Expected one of: ${validTypes.join(', ')}`);
    }
  }

  /**
   * Process inputs and return categorized inputs by type and validation errors.
   * @param {Array<*>} inputs - An array of sensory inputs.
   * @returns {{categorized: object, errors: Array<string>}} - Categorized inputs and any validation errors.
   */
  process(inputs) {
    if (!Array.isArray(inputs)) {
      throw new TypeError('Expected an array for inputs, received ' + typeof inputs);
    }

    const validInputs = [];
    const errors = [];

    inputs.forEach(input => {
      try {
        this.validateInput(input);
        validInputs.push(input);
      } catch (error) {
        errors.push(error.message);
      }
    });

    const categorized = this.categorizeSensoryInputs(validInputs);
    return { categorized, errors };
  }
} 

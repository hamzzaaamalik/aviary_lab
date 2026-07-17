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
   * Validate individual sensory input, including checks for nested objects.
   * @param {*} input - A sensory input value.
   * @throws {TypeError} - If the input is of an invalid type.
   */
  validateInput(input) {
    const validTypes = ['string', 'number', 'object', 'boolean', 'undefined', 'function'];
    const seenObjects = new WeakSet();  // Track visited objects to avoid circular references
    this._validate(input, validTypes, seenObjects);
  }

  /**
   * Recursive validation with circular reference handling.
   * @param {*} input - A sensory input value.
   * @param {Array<string>} validTypes - Array of valid types.
   * @param {WeakSet} seenObjects - Set of seen objects to track circular references.
   * @throws {TypeError} - If the input is of an invalid type or a circular reference is detected.
   */
  _validate(input, validTypes, seenObjects) {
    if (input !== null && typeof input === 'object') {
      if (seenObjects.has(input)) {
        throw new TypeError('Circular reference detected');
      }
      seenObjects.add(input);
      for (const key in input) {
        this._validate(input[key], validTypes, seenObjects);
      }
    }
    if (!validTypes.includes(typeof input)) {
      throw new TypeError(`Invalid input type: ${typeof input}. Expected one of: ${validTypes.join(', ')}`);
    }
  }

  /**
   * Process inputs and return categorized inputs by type.
   * @param {Array<*>} inputs - An array of sensory inputs.
   * @returns {object} - Categorized inputs by type.
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

  /**
   * Categorize errors based on their type.
   * @param {Array<string>} errors - An array of error messages.
   * @returns {object} - Categorized errors by type.
   */
  categorizeErrors(errors) {
    return errors.reduce((acc, error) => {
      const type = error.split(':')[0]; // Extract type from error message
      if (!acc[type]) acc[type] = [];
      acc[type].push(error);
      return acc;
    }, {});
  }

  /**
   * Process sensory inputs with detailed error reporting.
   * @param {Array<*>} inputs - An array of sensory inputs to process.
   * @returns {{categorized: object, errors: Array<string>, categorizedErrors: object}} - Categorized inputs and any validation errors.
   */
  processWithErrors(inputs) {
    const results = this.process(inputs);
    const categorizedErrors = this.categorizeErrors(results.errors);
    return {
      categorized: results.categorized,
      errors: results.errors,
      categorizedErrors
    };
  }
}
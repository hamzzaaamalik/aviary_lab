// src/proto/Perception.js

/**
 * Perception module for handling sensory inputs.
 */
export class Perception {
  /**
   * Validate sensory inputs.
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  validateInputs(sensoryInputs) {
    if (!Array.isArray(sensoryInputs)) {
      throw new TypeError('Input must be an array.');
    }
  }

  /**
   * Detect specific sensory inputs based on a provided predicate (async).
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {Function} predicate - Function to test each input.
   * @returns {Promise<Array<any>>} - Detected sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  async detect(sensoryInputs, predicate) {
    this.validateInputs(sensoryInputs);
    if (typeof predicate !== 'function') {
      throw new TypeError('Predicate must be a function.');
    }
    const results = await Promise.all(sensoryInputs.map(async (input) => {
      try {
        return await predicate(input);
      } catch (error) {
        this.kernel.bus.emit('proto:error', { message: `Error in predicate: ${error.message}` });
        return false;
      }
    }));
    return sensoryInputs.filter((_, index) => results[index]);
  }

  /**
   * Filter sensory inputs by specific criteria (async).
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {Function} classifier - Function to classify inputs.
   * @returns {Promise<Array<any>>} - Filtered sensory inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  async filter(sensoryInputs, classifier) {
    this.validateInputs(sensoryInputs);
    if (typeof classifier !== 'function') {
      throw new TypeError('Classifier must be a function.');
    }
    const results = await Promise.all(sensoryInputs.map(async (input) => {
      try {
        return await classifier(input);
      } catch (error) {
        this.kernel.bus.emit('proto:error', { message: `Error in classifier: ${error.message}` });
        return false;
      }
    }));
    return sensoryInputs.filter((_, index) => results[index]);
  }

  /**
   * Classify sensory inputs based on a provided classifier function (async).
   * @param {Array<any>} sensoryInputs - Array of sensory inputs.
   * @param {Function} classifier - Function to classify each input.
   * @returns {Promise<Object>} - An object containing classified inputs.
   * @throws {TypeError} - If the input is invalid.
   */
  async classify(sensoryInputs, classifier) {
    this.validateInputs(sensoryInputs);
    if (typeof classifier !== 'function') {
      throw new TypeError('Classifier must be a function.');
    }
    const result = {};
    for (const input of sensoryInputs) {
      const key = await classifier(input);
      if (key === undefined || key === null) {
        throw new TypeError('Classifier returned invalid key for input: ' + JSON.stringify(input));
      }
      if (typeof key !== 'string') {
        throw new TypeError('Classifier must return a string key. Received: ' + JSON.stringify(key));
      }
      // Ensure unique keys and initialize array if not present
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(input);
    }
    return result;
  }
}
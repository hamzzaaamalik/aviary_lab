// src/proto/Perception.js

/**
 * Perception module for handling sensory inputs.
 */
export class Perception {
  /**
   * Checks the validity of sensory inputs.
   * @param {Array<number>} inputs - Array of sensory input values.
   * @throws {TypeError} - If inputs is not an array or contains non-finite numbers.
   */
  checkInputs(inputs) {
    if (!Array.isArray(inputs) || inputs.some(input => typeof input !== 'number' || !isFinite(input))) {
      throw new TypeError('inputs must be an array of finite numbers');
    }
  }

  /**
   * Detect sensory inputs within a specified range.
   * @param {Array<number>} inputs - Array of sensory input values.
   * @param {number} min - Minimum threshold of the range.
   * @param {number} max - Maximum threshold of the range.
   * @returns {Array<number>} - Detected inputs within the range.
   * @throws {TypeError} - If min or max is not a finite number.
   */
  detectRange(inputs, min, max) {
    this.checkInputs(inputs);
    if (typeof min !== 'number' || !isFinite(min)) {
      throw new TypeError('min must be a finite number');
    }
    if (typeof max !== 'number' || !isFinite(max)) {
      throw new TypeError('max must be a finite number');
    }
    return inputs.filter(input =>
      typeof input === 'number' && isFinite(input) && input >= min && input <= max
    );
  }

  // Other existing methods here...
  // For the sake of completeness, we can assume there are other methods that handle sensory inputs.
}
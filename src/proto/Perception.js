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
      throw new TypeError('Invalid sensory input');
    }
    // Enhanced categorization logic
    if ('sight' in sensoryInput) return 'visual';
    if ('sound' in sensoryInput) return 'auditory';
    if ('smell' in sensoryInput) return 'olfactory';
    if ('taste' in sensoryInput) return 'gustatory';
    if ('touch' in sensoryInput) return 'tactile';

    return 'unknown';
  }

  /**
   * Process the incoming sensory data and categorize it.
   * @param {any} data - The sensory data.
   * @returns {{ category: string, data: any }} - The result of the categorization.
   * @throws {TypeError} - If the input data is invalid.
   */
  process(data) {
    const category = this.categorizeSensoryInput(data);
    return { category, data };  // Return both category and original data
  }

  /**
   * Enhance error handling for processing sensory inputs.
   * @param {any} data - The sensory data to process.
   * @returns {{ category: string, data: any, error: string | null }} - Result of processing with error handling.
   */
  processWithErrorHandling(data) {
    if (typeof data !== 'object' || data === null) {
      return { category: 'error', data, error: 'Invalid input: not an object' };
    }
    try {
      return this.process(data);
    } catch (error) {
      console.error('Error processing sensory data:', error);
      return { category: 'error', data, error: error.message };
    }
  }
} 


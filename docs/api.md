# API Documentation

## Perception Module

### Perception

#### `classify(sensoryInputs, classifier)`
Classify sensory inputs based on a provided classifier function.
- **Parameters:**
  - `sensoryInputs` (Array<any>): Array of sensory inputs.
  - `classifier` (Function): Function to classify each input.
- **Returns:** Object containing classified inputs.
- **Throws:** TypeError if the input is invalid or if the classifier returns undefined or null.


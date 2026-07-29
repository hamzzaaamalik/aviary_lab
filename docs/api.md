# API Documentation

## Perception

### `detect(inputs)`
Detect sensory inputs based on specific criteria.

**Parameters**:
- `inputs` (Array<number>): Array of sensory input values.

**Returns**:
- Array<number>: Detected inputs.

### `filter(inputs, predicate)`
Filter sensory inputs based on a predicate function.

**Parameters**:
- `inputs` (Array<number>): Array of sensory input values.
- `predicate` (Function): Function to test each input.

**Returns**:
- Array<number>: Filtered inputs.

### `classify(sensoryInputs, thresholds)`
Classify sensory inputs based on given thresholds.

**Parameters**:
- `sensoryInputs` (Array<number>): Array of sensory input values.
- `thresholds` (Object): Key-value pairs of category names and thresholds.

**Returns**:
- Object: Categorized inputs.

**Throws**:
- TypeError if the input is invalid.
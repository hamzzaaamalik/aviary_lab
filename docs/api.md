# API Documentation

## Perception

### `Perception`

#### `process(inputs: Array<any>): Array<{input: any, category: string, context: string}>`
Processes sensory inputs, categorizing and enhancing them.

#### `categorizeSensoryInputs(inputs: Array<any>): Array<{input: any, category: string}>`
Categorizes sensory input based on type.

#### `batchProcess(inputs: Array<any>): Array<{input: any, category: string, context: string}>`
Batch process sensory inputs, categorizing and enhancing them in one step.

### Exceptions

- `TypeError` when inputs are invalid or not conforming to expected structure.

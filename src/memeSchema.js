const memeSchema = {
    title: { type: 'string', required: true },
    imageUrl: { type: 'string', required: true },
    content: { type: 'string', required: true },
    styles: { type: 'array', required: false },
    createdAt: { type: 'date', default: () => new Date() },
};

function validateMeme(meme) {
    for (const key in memeSchema) {
        const field = memeSchema[key];
        const value = meme[key];

        if (field.required && value == null) {
            throw new Error(`${key} is required.`);
        }

        if (field.type === 'string' && typeof value !== 'string') {
            throw new Error(`${key} must be a string.`);
        }

        if (field.type === 'array' && !Array.isArray(value)) {
            throw new Error(`${key} must be an array.`);
        }
    }
    return true;
}

module.exports = { memeSchema, validateMeme };
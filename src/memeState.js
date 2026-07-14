const initialState = {
    memes: [],
    loading: false,
    error: null,
};

const memeStateReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOAD_MEMES':
            return { ...state, loading: true, error: null };
        case 'LOAD_MEMES_SUCCESS':
            return { ...state, loading: false, memes: action.payload };
        case 'LOAD_MEMES_FAILURE':
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export { initialState, memeStateReducer };
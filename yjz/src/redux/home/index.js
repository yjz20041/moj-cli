import reducerFactory from '../reducerFactory';

const SAY = 'app/home/test';

// Reducer
export const reducers = {
    [`${SAY}_FULFILLED`]: (state, { payload }) => {
        const words = payload.data;
        return {
            saidWords: words
        };
    }
};

// Action Creators
export const actions = {
    say: words => ({
        type: SAY,
        payload: new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: words
                });
            },
            500);
        })
    })
};

export default reducerFactory(reducers);

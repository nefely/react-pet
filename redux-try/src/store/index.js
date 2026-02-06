import { configureStore, createSlice } from '@reduxjs/toolkit';

const storeSlice = createSlice({
    name: 'store',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: (state, action) => {
            state.value += Number(action.payload);
        },
        decrement: (state, action) => {
            state.value -= Number(action.payload);
        },
        reset: (state) => {
            state.value = 0;
        }
    }
})

export const { increment, decrement, reset } = storeSlice.actions;

export const store = configureStore({
    reducer: {
        store: storeSlice.reducer,
    }
});

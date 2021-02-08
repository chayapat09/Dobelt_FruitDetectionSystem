import { createSlice } from '@reduxjs/toolkit';

const pageSlice = createSlice({
    name: 'page',
    initialState: 1,
    reducers: {
        increment: (state) => state + 1,
        decrement: (state) => state - 1
    }
});

export const { increment, decrement } = pageSlice.actions

export default pageSlice.reducer
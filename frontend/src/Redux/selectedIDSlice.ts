import { createSlice } from '@reduxjs/toolkit';

const selectedIDSlice = createSlice({
    name: 'selectedID',
    initialState: '',
    reducers: {
        increment: (state) => 'increment',
        decrement: (state) => 'decrement'
    }
});

export const { increment, decrement } = selectedIDSlice.actions

export default selectedIDSlice.reducer
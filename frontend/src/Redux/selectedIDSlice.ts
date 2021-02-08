import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const selectedIDInitial: string = "600fac81a3cb0f68a033ac20";

const selectedIDSlice = createSlice({
    name: 'selectedID',
    initialState: selectedIDInitial,
    reducers: {
        edit: (state, {payload}: PayloadAction<string> ) => state = payload
    }
});

export const { edit } = selectedIDSlice.actions

export default selectedIDSlice.reducer
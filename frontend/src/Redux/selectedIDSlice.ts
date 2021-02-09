import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const demoModelID = "600fac81a3cb0f68a033ac20"

const selectedIDInitial: string = '';

const selectedIDSlice = createSlice({
    name: 'selectedID',
    initialState: selectedIDInitial,
    reducers: {
        edit: (state, {payload}: PayloadAction<string> ) => state = payload
    }
});

export const { edit } = selectedIDSlice.actions

export default selectedIDSlice.reducer